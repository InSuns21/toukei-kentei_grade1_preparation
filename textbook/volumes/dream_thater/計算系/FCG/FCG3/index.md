# FCG3 染料移流の数値拡散はどこから来るか

[FCG2の時刻別格子標本](../FCG2/index.md#def-fcg2-scalar-snapshot)では解析式を各時刻に評価し、GPUへ渡した。しかし染料を流れで運ぶには、**次の時刻の濃度**を計算しなければならない。[FCG1の軌道追跡](../FCG1/index.md#def-fcg1-tracer-samples)を逆向きに使えば、新しいセルへ来た染料が前の時刻にどこにいたか分かる。問題は、その出発位置が旧格子のセル中心と一致しないことである。

本講では速度場を指定し、**染料だけを移流**する。圧力・粘性・Navier–Stokes方程式の速度更新は扱わない。厳密な回転運動を使っているのに、格子の染料がぼやける理由を、補間・境界・時間刻み・表示誤差に分けて追う。

直接前提は[FCG2の格子・R8表示](../FCG2/index.md#def-fcg2-r8-snapshot)である。物理的な染料輸送、CPUの離散移流、GPUの量子化を同一視しない。

## 1. 物理式から逆追跡の必要性へ

領域を $D=[0,1]^2$ [m²]、位置の単位を m、時刻の単位を s、染料濃度 $q(x,y,t)\in[0,1]$ を無次元とする。既知の速度 $\boldsymbol u=(u_x,u_y)$ [m/s] によって移されるだけで、物理拡散・反応・生成がない濃度は

$$
\frac{\partial q}{\partial t}
+u_x\frac{\partial q}{\partial x}
+u_y\frac{\partial q}{\partial y}=0
$$

を満たす。物理的な拡散項は**最初から入っていない**。

速度に従う軌道 $\boldsymbol X(s)$ は $d\boldsymbol X/ds=\boldsymbol u(\boldsymbol X(s),s)$ で定まる。連鎖律を成分ごとに適用すると、

$$
\frac{d}{ds}q(\boldsymbol X(s),s)
=\partial_tq+\frac{dX_x}{ds}\partial_xq+\frac{dX_y}{ds}\partial_yq
=\partial_tq+\boldsymbol u\cdot\nabla q=0.
$$

だから、同じ軌道に沿う濃度は一定である。新時刻のセル中心に到着した染料を知るには**そこから旧時刻へ遡る**。

### 検算用の回転速度と初期値

中心 $\boldsymbol c=(1/2,1/2)$ [m] の反時計回りの角速度を $\omega=2\pi$ [rad/s] とし、

$$
\boldsymbol u(x,y)=\bigl(-\omega(y-\tfrac12),\ \omega(x-\tfrac12)\bigr).

$$

偏微分から $\partial_xu_x+\partial_yu_y=0$。初期染料は中心 $(0.7,0.5)$、半径 $R=0.14$ [m] の塊とし、

$$
r^2=(x-0.7)^2+(y-0.5)^2,\quad
q_0(x,y)=
\begin{cases}
(1-r^2/R^2)^2,&r<R,\\
0,&r\ge R.
\end{cases}

$$

この初期値は塊の縁で値も一階微分も0となるので連続微分可能である。回転中心から塊の全点までの距離は最大 $0.2+0.14=0.34$ m。厳密な回転はこの距離を変えず、全時刻で領域端から少なくとも0.16 m内側にある。したがって真の染料の領域外流出は起こらない。

セルは下原点の $N=32$ 分割、$h=1/32$ [m]。中心を $\boldsymbol x_{ij}=((i+1/2)h,(j+1/2)h)$、$i,j\in\{0,\ldots,31\}$ とする。物理刻みを $\Delta t=1/32$ [s]、$t_n=n\Delta t$、$n=0,\ldots,32$ と固定する。配列の位置は $k=i+32j$ である。

## 2. 新時刻から前時刻へ足点を戻す

**逆追跡足点**とは、新時刻の位置に届く軌道の一つ前の時刻での位置である。一般の速度では軌道の微分方程式を近似的に逆積分するが、この回転なら厳密に分かる。一般速度での単純な近似は、新時刻の到着点 $\boldsymbol x$ から $\Delta t\,\boldsymbol u(\boldsymbol x,t_{n+1})$ だけ引く**後退Euler足点**である。

<a id="def-fcg3-backtrace"></a>

<!-- formal-statement-start -->
### 定義（半Lagrange逆追跡足点）

時刻 $t_{n+1}$ の到着セル中心 $\boldsymbol x_{ij}$ に対し、時刻 $t_n$ に同じ特性曲線上にあった位置を $\boldsymbol x^\star_{ij}$ といい、**逆追跡足点**と呼ぶ。第1節の回転速度の場合、$\theta=\omega\Delta t=\pi/16$、$d_x=x_{ij}-1/2,d_y=y_{ij}-1/2$ として、

$$
\boldsymbol x^\star_{ij}=
\left(\frac12+d_x\cos\theta+d_y\sin\theta,\
\frac12-d_x\sin\theta+d_y\cos\theta\right).

$$

一般速度に対する後退Euler近似は

$
\widetilde{\boldsymbol x}^\star_{ij}=\boldsymbol x_{ij}-\Delta t\,\boldsymbol u(\boldsymbol x_{ij},t_{n+1})
$

であり、上で定めた厳密足点とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg3-backtrace -->
**定義の確認。** 到着点 $(3/4,1/2)$ の変位は $(1/4,0)$ なので、足点は

$$
\left(\frac12+\frac14\cos\frac\pi{16},\
\frac12-\frac14\sin\frac\pi{16}\right).
$$

右端の点から**逆向き**にたどると右下に戻るので、第2成分の負号と一致する。これは足点の式を示すための点であり、実装の格子中心そのものではない。
<!-- definition-example-end -->

## 3. 足点の濃度を4つのセルから再構成する

旧時刻の値を $Q^n_{ij}$ とする。足点 $(x^\star,y^\star)$ に旧セル中心がなければ、隣り合う4中心の値を補間する。左下中心の添字を

$$
i_0=\lfloor x^\star/h-1/2\rfloor,\quad
j_0=\lfloor y^\star/h-1/2\rfloor
$$

と置き、その中心からの相対距離を $a=x^\star/h-1/2-i_0$、$b=y^\star/h-1/2-j_0$ とする。常に $0\le a,b<1$ である。外側で $i_0=-1$ 等になるときは領域外の**仮想セル**を用いる。本講では領域外の旧値を0とする。これは**染料流入ゼロ**の補間境界条件であり、速度が壁を貫かない境界条件を解いたものではない。

<a id="def-fcg3-bilinear"></a>

<!-- formal-statement-start -->
### 定義（セル中心の双線形再構成）

有限格子 $Q^n_{ij}$（$0\le i,j<32$）を領域外では0と延長する。任意の有限な足点 $(x^\star,y^\star)$ に対し、

$$
\begin{aligned}
I_hQ^n(x^\star,y^\star)
={}&(1-a)(1-b)Q^n_{i_0,j_0}
+a(1-b)Q^n_{i_0+1,j_0}\\
&+(1-a)bQ^n_{i_0,j_0+1}
+abQ^n_{i_0+1,j_0+1}
\end{aligned}

$$

を**セル中心の双線形再構成**と呼ぶ。各係数は水平・鉛直方向の線形重みの積である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg3-bilinear -->
**定義の確認。** 左下・右下・左上・右上の旧値が $(1,0,0,0)$、$a=1/4$、$b=1/2$ の場合、係数は

$$
\bigl((1-a)(1-b),a(1-b),(1-a)b,ab\bigr)
=\left(\frac38,\frac18,\frac38,\frac18\right).
$$

すべて非負で合計1。補間値は $3/8$ となり、元の左下値1より小さい。補間による混合は物理拡散係数を与えた結果ではない。
<!-- definition-example-end -->

## 4. 半Lagrange更新とCFL数

足点を計算したら、旧濃度を双線形補間して新セルへ書く。同じ配列の旧値を上書きすると後のセルが更新済みの値を読むため、[FCG2で分けたCPU旧・新バッファ](../FCG2/index.md#def-fcg2-r8-snapshot)と同様に旧・新の別配列を使う。

<a id="def-fcg3-advection-step"></a>

<!-- formal-statement-start -->
### 定義（半Lagrange染料更新）

初期格子値を $Q^0_{ij}=q_0(\boldsymbol x_{ij})$ とし、[厳密逆追跡足点](#def-fcg3-backtrace)、[双線形再構成](#def-fcg3-bilinear)、外側0を用いて

$$
Q^{n+1}_{ij}=I_hQ^n(\boldsymbol x^\star_{ij}),
\quad n=0,\ldots,31,\quad i,j=0,\ldots,31

$$

と定める。この到着点から旧時刻を参照する更新を**半Lagrange染料移流法**という。新値の書込みは旧値と異なる配列で行い、全セル更新後に交換する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg3-advection-step -->
**定義の確認。** ある到着セルの足点が前節の $a=1/4,b=1/2$ の位置にあり、旧4セルが $(1,0,0,0)$ なら、[半Lagrange更新](#def-fcg3-advection-step)は新セルへ $3/8$ を書く。旧セルから染料質量を押し出す方式ではなく、**到着セルごとに旧濃度を読む方式**である。実験コードではこれを全1024セルで反復する。
<!-- definition-example-end -->

移動距離を格子幅で割る目安の無次元量を **Courant数（CFL数）** $C=\|\boldsymbol u\|\Delta t/h$ とする。塊中心 $(0.7,0.5)$ では

$$
C=\frac{(2\pi)(0.2)(1/32)}{1/32}=0.4\pi\approx1.257.
$$

陽的上流差分などの $C\le1$ といった安定性制約を、そのまま半Lagrange法へ適用しない。逆追跡は一セルを越える足点も参照できる。一方で大きな刻みは足点計算や形状再構成の**精度**を保証しない。

<a id="prop-fcg3-range"></a>

<!-- formal-statement-start -->
### 命題（双線形更新の値域不増大）

[半Lagrange更新](#def-fcg3-advection-step)の足点がすべて有限座標を持ち、外部仮想セル値は0とする。$M\ge0$ とし、初期値が

$
0\le Q^0_{ij}\le M\qquad(0\le i,j<32)
$

を満たすとき、任意の $n=0,\ldots,32$ で

$
0\le Q^n_{ij}\le M\qquad(0\le i,j<32)
$

が成り立つ。CFL数の上限は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

4つの重みが非負で合計1であることから一回の更新を挟んでも値域が保たれる。

<!-- proof-start -->
### 証明

$n=0$ では仮定より成立する。時刻 $n$ の旧格子値が区間 $[0,M]$ に入ると仮定する。仮想セルも0なので、任意の足点の周囲の4値 $z_1,\ldots,z_4$ は同じ区間内にある。[双線形再構成](#def-fcg3-bilinear)の4係数は $0\le a,b<1$ から非負で、

$$
(1-a)(1-b)+a(1-b)+(1-a)b+ab
=((1-a)+a)((1-b)+b)=1
$$

となる。よって $0\le \sum_{k=1}^4 w_kz_k\le\sum_{k=1}^4w_kM=M$。この和が新しい $Q^{n+1}_{ij}$ であり、全てのセルに当てはまる。帰納法で結論を得る。条件に $C$ は現れない。$\square$
<!-- proof-end -->

この性質は値が爆発しないことを保証するが、**質量・形状・位相の精度**を保証しない。

## 5. 正しい回転と離散更新の違い

中心 $\boldsymbol c$ の周りの角度 $\phi$ の回転行列を

$$
R(\phi)=\begin{pmatrix}\cos\phi&-\sin\phi\\ \sin\phi&\cos\phi\end{pmatrix}
$$

と定める。行列の積 $R(\phi)R(-\phi)$ の対角成分は $\cos^2\phi+\sin^2\phi=1$、非対角は $\cos\phi\sin\phi-\sin\phi\cos\phi=0$ なので、逆回転は $R(-\phi)$ である。

<a id="prop-fcg3-rotation"></a>

<!-- formal-statement-start -->
### 命題（回転の厳密な逆追跡と一周後の復元）

第1節の回転速度、第1節の初期値のもと、移流方程式の連続微分可能な解は

$$
q(\boldsymbol x,t)
=q_0\bigl(\boldsymbol c+R(-\omega t)(\boldsymbol x-\boldsymbol c)\bigr)

$$

であり、$\omega=2\pi$ [rad/s] のとき $q(\boldsymbol x,1)=q_0(\boldsymbol x)$ が全ての $\boldsymbol x\in D$ について成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

前向き回転が速度場の軌道であることを微分で確認し、濃度の特性曲線上での一定性を適用する。

<!-- proof-start -->
### 証明

初期位置を $\boldsymbol z$、$\boldsymbol z-\boldsymbol c=(a,b)$ とし、$\boldsymbol X(t)=\boldsymbol c+R(\omega t)(\boldsymbol z-\boldsymbol c)$ と置く。成分は

$$
X_x=\tfrac12+a\cos\omega t-b\sin\omega t,\quad
X_y=\tfrac12+a\sin\omega t+b\cos\omega t.
$$

微分すると、

$$
X'_x=-\omega(a\sin\omega t+b\cos\omega t)=-\omega(X_y-\tfrac12),
$$

$$
X'_y=\omega(a\cos\omega t-b\sin\omega t)=\omega(X_x-\tfrac12).
$$

第1節の回転速度と一致するので $\boldsymbol X$ は指定速度の軌道である。逆行列を掛けると $\boldsymbol z=\boldsymbol c+R(-\omega t)(\boldsymbol x-\boldsymbol c)$。第1節で示した連鎖律と移流方程式から軌道に沿う $q$ は一定だから、$q(\boldsymbol x,t)=q_0(\boldsymbol z)$ で上の解析解を得る。$t=1$ では $\omega t=2\pi$、$R(-2\pi)=I$ より $q(\boldsymbol x,1)=q_0(\boldsymbol x)$。$\square$
<!-- proof-end -->

この結論は**厳密解**の一回転復元であり、補間を32回繰り返した数値値の復元ではない。

比較用の解析値を $E^n_{ij}=q(\boldsymbol x_{ij},t_n)$ とする。数値的な格子面積積分および誤差を

$$
M_h^n=h^2\sum_{i,j}Q^n_{ij},\qquad
M_{\mathrm{exact},h}^n=h^2\sum_{i,j}E^n_{ij},\qquad
L_{1,h}^n=h^2\sum_{i,j}|Q^n_{ij}-E^n_{ij}|

$$

と定める。濃度は無次元なのでこれらの単位は m²。連続積分は回転で保存されるが、回転した関数を固定した格子中心で標本化した $M_{\mathrm{exact},h}^n$ は多少変わり得る。**数値場・解析標本の面積和を両方表示**する。

## 6. 値域が守られても総和は保存されない

<a id="prop-fcg3-nonconservation"></a>

<!-- formal-statement-start -->
### 命題（非保存性と数値拡散の区別）

[値域不増大](#prop-fcg3-range)は、一般の線形・双線形補間による逆追跡更新について $\sum Q^{n+1}_{ij}=\sum Q^n_{ij}$ を含意しない。各出力が非負で和1の重み付き平均でも、格子総和の増減は起こり得る。
<!-- formal-statement-end -->

### 証明の見取り図

補間する先の**行方向**の係数和が1であることは、元の値がいくつのセルから参照されたかという**列方向**の係数和が1であることとは違う。

<!-- proof-start -->
### 証明

2セルの旧値を $(Q_0,Q_1)=(1,0)$ とし、空間的に異なる足点から線形補間する操作

$$
\begin{pmatrix}Q'_0\\Q'_1\end{pmatrix}
=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}
\begin{pmatrix}1\\0\end{pmatrix}
=\begin{pmatrix}3/4\\1/2\end{pmatrix}
$$

を考える。各行の係数は非負で和1だから、出力も $[0,1]$ 内。しかし旧総和は1、新総和は $3/4+1/2=5/4$。入力側の第1列の係数和が $5/4$ であるためである。この1次元例は縦方向の補間割合を0とした2次元双線形の例にも埋め込める。よって各出力の値域保存だけでは総和保存は導けない。$\square$
<!-- proof-end -->

この反例は**本講の回転の数値質量が必ず増える**という意味ではない。符号も大きさも第5節の数値診断で測る。

旧格子の隣り合う値を何度も平均することで鋭い輪郭が鈍ることを**数値拡散**という。これは物理式に熱拡散係数を付け加えたこととは異なる。少なくとも次の誤差を分離する。

- **逆追跡誤差**：後退Euler足点では厳密[厳密逆追跡足点](#def-fcg3-backtrace)からずれる。$\theta$ が小さいとき、厳密足点とEuler足点の差の主項は $-\theta^2(\boldsymbol x-\boldsymbol c)/2$。本講の初期コードは厳密足点でこれを取り除く。
- **補間誤差**：厳密足点でも[双線形再構成](#def-fcg3-bilinear)の4値混合は元の連続濃度の真値に必ずしも一致せず、更新反復で輪郭が鈍り得る。
- **表示誤差**：[FCG2のR8正規化](../FCG2/index.md#def-fcg2-r8-snapshot)による $\widehat Q=\operatorname{round}(255Q)/255$ の誤差は、[WGL17の量子化誤差](../../WGL/WGL17/index.md#prop-wgl17-unorm-error)から最大 $1/510$。色だけでは実数の格子誤差を測れない。

## 7. JavaScript・GLSLの編集ラボで測る

初期コードは毎回step0から指定stepまで**実際に1024セルの濃度を更新**する。CPUの旧・新配列を交換し、結果をR8の数値テクスチャ、解析値を別のR8テクスチャへ転送する。GPUが行うのは描画だけであり、GPUでNavier–Stokes方程式を解いたわけではない。

左半分は数値濃度 $Q$ を青→赤で表示する。右半分は $|\widehat Q-\widehat E|$ を**5倍**して赤に表示し、差0の基準色はRGBA8の $(0,20,26,255)$ である。右側はR8後の誤差画像、診断ログに出す $L_{1,h}$ はFloat64の誤差と区別する。

<iframe src="simulation/wgl-lab.html?lesson=FCG3" title="FCG3 半Lagrange移流のJS・GLSLを編集し誤差を比較する共通3タブラボ" loading="lazy" style="width:100%;height:1050px;border:1px solid #64748b;border-radius:7px;" allow="fullscreen"></iframe>

**操作**：初期step1のCPU独立予測とGPU画素を比較する。1step、再生・一時停止、時刻0へ戻す、停止・破棄を試す。step32の1回転では、解析値が元に戻っても数値染料がどうなったか、格子質量 $M_h$、解析格子質量、$L_{1,h}$、最大誤差、ピークを診断する。クリックまたは矢印キー＋Enterで画素を検査できる。GPUが使えない場合はCPU独立数値だけを表示し、GPU照合は未達とする。

**改造**：編集欄のJSでは、[厳密逆追跡足点](#def-fcg3-backtrace)を後退Euler足点へ置換できる。頂点GLSLとフラグメントGLSLも独立編集し再コンパイルできる。右側の表示倍率を5から10へ変更すると、物理値でなく**誤差mapの見え方**が変わる。構文エラープリセットでシェーダのコンパイル失敗を観察できる。隔離された不透明originのiframeでのみ学習者JSを実行するが、GPUハングの完全防止は保証しない。初期ソースを変えた場合、初期CPU予測との差をそのまま誤答判定には使わない。

格子幅の影響は独立CPU実装の $N=16,32,64$ の結果を**同じ物理時刻**に揃えて第5節で定義した格子誤差で比較する。編集JSの $N$ だけ変更しても、シェーダの格子サイズやテクスチャ仕様が揃わないため、収束比較とはならない。

## 8. 演習と詳細解答

### Level A

<a id="ex-fcg3-a1"></a>
**A1. 逆追跡の方向。** $\omega=2\pi,\Delta t=1/32$ で到着点 $(3/4,1/2)$ の足点を求め、正負を説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\theta=\omega\Delta t=\pi/16$、中心からの変位は $(1/4,0)$。[逆追跡足点](#def-fcg3-backtrace)の式を代入して

$$
x^\star=\frac12+\frac14\cos(\pi/16),\qquad
y^\star=\frac12-\frac14\sin(\pi/16).
$$

右端の到着点へ向かう反時計回りの軌道を逆にたどると右下に戻る。$y$ を正号にすると前向き回転となり、逆追跡の目的に反する。
<!-- solution-end -->

<a id="ex-fcg3-a2"></a>
**A2. 双線形補間。** 四旧値が左下から $(1,0,0,0)$、$a=1/4,b=1/2$ のとき係数と補間値を計算し、符号と合計を検査せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 水平の重みは $(3/4,1/4)$、鉛直は $(1/2,1/2)$。積の4係数は $(3/8,1/8,3/8,1/8)$、すべて非負で和は $(3+1+3+1)/8=1$。補間値は $3/8\cdot1+0=3/8$。この混合が数値的に輪郭を鈍らせ得る。
<!-- solution-end -->

<a id="ex-fcg3-a3"></a>
**A3. CFLと安定性。** $(0.7,0.5)$ で速度と $C$ を求め、$C>1$ なら半Lagrange法が発散すると結論できるか。

- Level: A

<!-- solution-start -->
**詳細解答。** 第1節の回転速度から速度は $(0,2\pi\cdot0.2)=(0,0.4\pi)$ [m/s]。$h=\Delta t=1/32$ なので $C=0.4\pi\approx1.257$。しかし[値域不増大](#prop-fcg3-range)は $C$ を仮定せず、非負の重みだけから $0\le Q^n\le M$ を導いた。よって値域の意味での発散は結論できず、位相・形状・質量の精度は別途検査する。
<!-- solution-end -->

<a id="ex-fcg3-a4"></a>
**A4. 一回転と差画像の0。** $t_{32}$ と解析値 $E^{32}_{ij}$ を求めよ。R8で $Q=E$ のセルで右半分のRGBA8を予測せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $t_{32}=32/32=1$ s、角度は $2\pi$ なので[回転復元](#prop-fcg3-rotation)から $E^{32}_{ij}=q_0(\boldsymbol x_{ij})=Q^0_{ij}$。数値結果 $Q^{32}=Q^0$ とは限らない。R8値が等しければ $\widehat Q-\widehat E=0$ で右側のGLSL色は $(0,0.08,0.1,1)$。最終RGBA8は $(0,\operatorname{round}(255\cdot0.08),\operatorname{round}(255\cdot0.1),255)=(0,20,26,255)$。
<!-- solution-end -->

### Level B

<a id="ex-fcg3-b1"></a>
**B1. 領域外の補間。** $i_0=-1,j_0=5,a=3/4,b=1/4$、$Q_{0,5}=0.8,Q_{0,6}=0.4$、領域外0のとき補間値を計算し、区間 $[0,0.8]$ 内であることを確認せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 左側の二セルは仮想セルで値0。残る二項は

$$
I_hQ=a(1-b)Q_{0,5}+abQ_{0,6}
=\frac34\frac34(0.8)+\frac34\frac14(0.4)
=0.45+0.075=0.525.
$$

重みはすべて非負で和1、その他の値は0なので $0\le0.525\le0.8$。[値域不増大](#prop-fcg3-range)に一致する。境界値をコピーする設定とは別の数学的境界処理である。
<!-- solution-end -->

<a id="ex-fcg3-b2"></a>
**B2. 行和と列和。** 旧2セル $(1,0)$ へ、出力ごとの重み $(3/4,1/4)$、$(1/2,1/2)$ を適用し、値域と総和を比較せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 新値は $(3/4\cdot1+1/4\cdot0,\ 1/2\cdot1+1/2\cdot0)=(3/4,1/2)$。両者とも $[0,1]$ に入り、各出力の重み和は1。しかし旧総和は1、新総和は $3/4+1/2=5/4$。入力1を参照する列の係数和は $3/4+1/2=5/4$ で1ではない。空間的に変化する足点ならこのような重み配置があり得るので、値域保存だけから質量保存を宣言できない。
<!-- solution-end -->

<a id="ex-fcg3-b3"></a>
**B3. 足点誤差とR8誤差。** 到着点 $(3/4,1/2)$ の後退Euler足点と厳密足点の差を求め、さらに $5|\widehat Q-\widehat E|$ と $5|Q-E|$ の差の上界を導け。

- Level: B

<!-- solution-start -->
**詳細解答。** $\theta=\pi/16$ とする。Euler足点は $(3/4,1/2-\theta/4)$、厳密足点は $(1/2+\cos\theta/4,1/2-\sin\theta/4)$ である。厳密値からEuler値を引くと

$$
\delta x=\frac{\cos\theta-1}{4},\quad
\delta y=\frac{\theta-\sin\theta}{4}.
$$

$\cos\theta=1-\theta^2/2+O(\theta^4)$、$\sin\theta=\theta-\theta^3/6+O(\theta^5)$ より $\delta x=-\theta^2/8+O(\theta^4)$、$\delta y=\theta^3/24+O(\theta^5)$。表示の丸めは各値最大 $1/510$ なので、逆三角不等式と三角不等式を順に使い

$$
\left|5|\widehat Q-\widehat E|-5|Q-E|\right|
\le5\left(|\widehat Q-Q|+|\widehat E-E|\right)\le\frac5{255}.
$$

実shaderはさらに1で飽和し、RGBA8へ丸める。この赤画素だけではFloat64の誤差を復元できない。
<!-- solution-end -->

### Level C

<a id="ex-fcg3-c1"></a>
**C1. 一回転の検証・コード改造。** (a) [半Lagrange更新](#def-fcg3-advection-step)を旧値の上書きなしで32step実装する擬似コードを示せ。(b) 一回転で解析値がどうなるか示し、比較する質量・誤差を式で書け。(c) JSの逆追跡を後退Eulerに変えると新たに何が変わるか。(d) fragment shaderの右側の倍率5を10にすると、何が変わり何が不変か。

- Level: C

<!-- solution-start -->
**詳細解答。** (a) 二配列を旧・新で使い、各セルを旧値から計算してから交換する。

    for (let n=0; n<32; n++) {
      for (let j=0; j<N; j++) for (let i=0; i<N; i++) {
        const x=(i+0.5)/N, y=(j+0.5)/N;
        const dx=x-0.5, dy=y-0.5, a=2*Math.PI/32;
        const footX=0.5+Math.cos(a)*dx+Math.sin(a)*dy;
        const footY=0.5-Math.sin(a)*dx+Math.cos(a)*dy;
        next[i+N*j]=bilinear(old,footX,footY);
      }
      [old,next]=[next,old];
    }

二次元添字は $i+Nj$、外側の旧値は0とし、途中で旧配列を書き換えない。

(b) $\omega t_{32}=2\pi$ なので[回転復元](#prop-fcg3-rotation)から $E^{32}_{ij}=Q^0_{ij}$。したがって測る誤差は $h^2\sum_{ij}|Q^{32}_{ij}-Q^0_{ij}|$、最大誤差は $\max_{ij}|Q^{32}_{ij}-Q^0_{ij}|$、質量は $M_h^{32}=h^2\sum Q^{32}_{ij}$ と $M_h^0=h^2\sum Q^0_{ij}$ を別々に計算する。和が一致するとは最初から仮定しない。

(c) 到着点の速度 $(u_x,u_y)$ を第1節の回転速度から計算して、足点を $(x-\Delta t u_x,y-\Delta t u_y)$ へ変更する。B3の座標差のような**逆追跡誤差が補間誤差に加わる**。両者とも双線形補間を行い、Euler側だけが補間を使うのではない。

(d) 右の赤成分が $\min(1,10|\widehat Q-\widehat E|)$ になり、色が強調され飽和しやすくなる。物理step、CPU配列、二つのR8テクスチャ、Float64の $M_h$・$L_{1,h}$ は変化しない。GLSLを再コンパイルして描画の違いだけを確認する。初期色の独立CPU予測と異なること自体は数値更新の誤りではない。
<!-- solution-end -->

## 9. 次の講義

半Lagrange染料移流が値域を守っても質量や形状の精度を自動で守らないことを確認した。次のFCG4では、染料とは別に**速度場の発散**を計算し、圧力Poisson問題と射影で非圧縮性へ近づける。
