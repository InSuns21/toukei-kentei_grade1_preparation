# FCG8 動く自由表面をどう追跡するか

[前講：FCG7 格子と粒子のどちらで水を動かすか](../FCG7/index.md)

## 0. 粒子が動くことと「水の形」が分かることは同じか

FCG7では、[PIC/FLIPの速度・位置更新](../FCG7/index.md#def-fcg7-mixing)により粒子の位置を時間発展させた。しかし、粒子がどこにあるかだけでは、水が占める**連続的な領域**と空気との境界を直接得られない。そこで、液体の内側を負、外側を正、境界を0とする関数を格子に保存し、値0の曲線を動かす。これがLevel Set法である。

本講は2次元断面の**運動学的な界面追跡**を扱う。液体の圧力、表面張力、空気側の運動方程式は解かない。既知の速度場があれば界面がどう動くかを、解析解、格子、粒子の3つの方法で比較する。

**設定と単位。** 一辺1 mの正方形領域 $\Omega=(0,1)^2$、時刻 $t$ [s]、初期円盤の中心 $\boldsymbol c=(0.5,0.5)$ [m]、半径 $r=0.18$ m。速度場は

$$
\boldsymbol u(x,y)=(\sigma(y-0.5),0),\qquad \sigma=0.6\ \mathrm{s}^{-1}.
$$

$x$ 方向速度は高さにより変わる（せん断流）。$\partial_xu_x+\partial_yu_y=0$ なのでこの流れは非圧縮である。計算は $0\le t\le0.96$ sに限り、初期円盤と移動後の液滴は領域内に収まる。

## 1. 液体の内外を符号で定める

**零等位集合**とは、関数値がちょうど0の点の集合である。連続関数の値が液体内部で負、外部で正なら、零等位集合を液面として表すことができる。

<a id="def-fcg8-level-set"></a>

<!-- formal-statement-start -->
> **定義（液体領域と零等位集合）**  
> $\phi(\cdot,t):\Omega\to\mathbb R$ を連続関数とし、液体領域と界面を

$$
L(t)=\{\boldsymbol x\in\Omega:\phi(\boldsymbol x,t)<0\},
\quad
\Gamma(t)=\{\boldsymbol x\in\Omega:\phi(\boldsymbol x,t)=0\}
$$

> と定める。$\phi>0$ は液体の外側とする。$\Gamma(t)$ が液体と外側を分ける境界を表しているかは、扱う関数ごとに確かめる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg8-level-set -->
**直接例。** $\phi_0(x,y)=\sqrt{(x-0.5)^2+(y-0.5)^2}-0.18$ と置く。中心では $-0.18<0$、$(0.68,0.5)$ では0、$(0.8,0.5)$ では $0.3-0.18=0.12>0$。従って半径0.18 m未満が内部、半径0.18 mの円周が界面、外側が正という3条件が確かめられた。
<!-- definition-example-end -->

$\phi$ を $3\phi$ にしても負・0・正の領域は同じ。しかし勾配は3倍になる。すなわち**界面の位置**と**距離としての意味**は異なる。

### 1.1 符号付き距離

曲線 $\Gamma$ までの距離は、点 $\boldsymbol x$ と曲線上の任意点 $\boldsymbol z$ の距離 $\|\boldsymbol x-\boldsymbol z\|$ の下限である。内側に負符号を付けたものを**符号付き距離**という。滑らかな界面の近傍ではその勾配の長さが1となるが、最近接の境界点が複数ある位置では微分できないこともある。

<a id="def-fcg8-signed-distance"></a>

<!-- formal-statement-start -->
> **定義（符号付き距離関数）**  
> 非空の閉じた界面 $\Gamma\subset\mathbb R^2$ が内外を分けるとする。$\operatorname{dist}(\boldsymbol x,\Gamma)=\inf_{\boldsymbol z\in\Gamma}\|\boldsymbol x-\boldsymbol z\|$ とし、

$$
d_\Gamma(\boldsymbol x)=
\begin{cases}
-\operatorname{dist}(\boldsymbol x,\Gamma),&\boldsymbol x\text{ が内部},\\
0,&\boldsymbol x\in\Gamma,\\
+\operatorname{dist}(\boldsymbol x,\Gamma),&\boldsymbol x\text{ が外部}.
\end{cases}
$$

> これを符号付き距離関数と呼ぶ。最近接点が一意で距離が微分可能な滑らかな界面近傍では $|\nabla d_\Gamma|=1$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg8-signed-distance -->
**直接例。** 中心 $\boldsymbol c$、半径 $r$ の円周から、中心以外の点 $\boldsymbol x$ までの距離は $|\rho-r|$、ただし $\rho=\|\boldsymbol x-\boldsymbol c\|$ である。内側に負符号を付ければ $d_\Gamma=\rho-r$。$\rho>0$ では

$$
\nabla d_\Gamma=\left(\frac{x-0.5}{\rho},\frac{y-0.5}{\rho}\right),
\quad |\nabla d_\Gamma|^2=\frac{(x-0.5)^2+(y-0.5)^2}{\rho^2}=1.
$$

点 $(0.68,0.5)$ なら $d_\Gamma=0$、勾配 $(1,0)$。**距離・符号・勾配**を検証した。中心では方向ごとの最近接点が無数にあり、$\rho$ は微分不能なので勾配1を要求しない。
<!-- definition-example-end -->

## 2. 速度場に沿って界面を運ぶ

前講の[粒子位置更新](../FCG7/index.md#def-fcg7-mixing)を連続時間へ移すと、粒子軌道 $\boldsymbol X(t)$ は $\boldsymbol X'(t)=\boldsymbol u(\boldsymbol X(t),t)$ を満たす。この軌道を**特性曲線**と呼ぶ。界面上の粒子に $\phi=0$ を保たせるため、粒子軌道上の関数値を一定にする。

<a id="prop-fcg8-characteristics"></a>

<!-- formal-statement-start -->
> **命題（Level Set移流と特性曲線）**  
> $\phi$ と $\boldsymbol u$ が時間と空間について連続微分可能で、$\boldsymbol X'(t)=\boldsymbol u(\boldsymbol X(t),t)$ の特性曲線が対象領域内にあるとする。方程式

$$
\partial_t\phi+\boldsymbol u\cdot\nabla\phi=0
$$

> が成り立つことと、すべての特性曲線に沿って $\phi(\boldsymbol X(t),t)$ が一定であることは同値である（逆向きは各時空点を通る特性曲線が存在すると仮定する）。
<!-- formal-statement-end -->

**証明の見取り図。** 合成関数 $\phi(\boldsymbol X(t),t)$ の連鎖律で、粒子速度を代入する。

<!-- proof-start -->
### 証明

時間微分を空間微分と分けて書けば

$$
\frac{d}{dt}\phi(\boldsymbol X(t),t)
=\partial_t\phi+\partial_x\phi\,X'_x(t)+\partial_y\phi\,X'_y(t)
$$

となる。右辺の偏微分はすべて $(\boldsymbol X(t),t)$ で評価する。$X'_x=u_x$、$X'_y=u_y$ を代入すると

$$
\frac{d}{dt}\phi(\boldsymbol X(t),t)
=(\partial_t\phi+\boldsymbol u\cdot\nabla\phi)(\boldsymbol X(t),t).
$$

輸送方程式が0なら左辺が0なので値は一定。逆にすべての特性曲線で値が一定なら、各時空点を通る軌道で右辺が0である。特に $\phi(\boldsymbol X(0),0)=0$ なら、その軌道はすべての時刻で零等位集合上にある。
<!-- proof-end -->

### 2.1 せん断流の厳密な液面と面積

<a id="prop-fcg8-shear-area"></a>

<!-- formal-statement-start -->
> **命題（非圧縮せん断による液滴面積の保存）**  
> 実数 $\sigma$、初期円盤 $L(0)=\{(x_0,y_0):(x_0-0.5)^2+(y_0-0.5)^2<r^2\}$、$r>0$ を考える。速度場 $\boldsymbol u=(\sigma(y-0.5),0)$ の特性曲線は

$$
X(t)=x_0+\sigma t(y_0-0.5),\quad Y(t)=y_0
$$

> である。変形後の界面は

$$
[x-0.5-\sigma t(y-0.5)]^2+(y-0.5)^2=r^2
$$

> で、面積は $\pi r^2$ のままである。円盤が領域内に収まる時刻で比較する。
<!-- formal-statement-end -->

**証明の見取り図。** 粒子ODEを解き、逆変換で界面を出す。面積は座標変換のJacobianを検算する。

<!-- proof-start -->
### 証明

$Y'=0$ と $Y(0)=y_0$ より $Y(t)=y_0$。従って $X'=\sigma(y_0-0.5)$ は定数で、

$$
X(t)=x_0+\int_0^t\sigma(y_0-0.5)\,ds=x_0+\sigma t(y_0-0.5).
$$

逆変換は $y_0=y$、$x_0=x-\sigma t(y-0.5)$。初期円の式へ代入して変形後の界面式を得る。写像 $\boldsymbol F_t(x_0,y_0)=(X,Y)$ のJacobian行列は

$$
D\boldsymbol F_t=\begin{pmatrix}1&\sigma t\\0&1\end{pmatrix},
\qquad \det D\boldsymbol F_t=1.
$$

逆変換が明示でき、面積要素は $dx\,dy=|\det D\boldsymbol F_t|dx_0\,dy_0$。ゆえに

$$
|L(t)|=\iint_{L(0)}1\,dx_0\,dy_0=\pi r^2.
$$

この結論は**連続体の厳密な変換**についてであり、格子の負値セル数の不変性ではない。
<!-- proof-end -->

**直接例。** $\sigma=0.6$ [1/s]、$t=0.8$ sのとき円上の点 $(0.5,0.68)$ は $(0.5864,0.68)$ に、$(0.68,0.5)$ は同じ場所へ移る。厳密面積は $\pi(0.18)^2\approx0.10178760$ m$^2$。

### 2.2 正しい界面でも距離勾配は1でなくなる

せん断流の厳密な輸送解は

$$
\Phi(x,y,t)=\sqrt{A^2+B^2}-r,\quad
A=x-0.5-\sigma t(y-0.5),\quad B=y-0.5.
$$

値0の場所は上の厳密界面に一致するが、距離関数の条件は別問題である。

<a id="prop-fcg8-distance-loss"></a>

<!-- formal-statement-start -->
> **命題（正確な移流後も符号付き距離は一般に維持されない）**  
> 上の $\Phi$ で $r>0,\sigma t\ne0$ とする。点 $(0.5+r,0.5)$ では

$$
|\nabla\Phi|=\sqrt{1+(\sigma t)^2}>1.
$$

> 従って $\Phi$ は、同点近傍の[符号付き距離関数](#def-fcg8-signed-distance)とは異なる。
<!-- formal-statement-end -->

**証明の見取り図。** 変形前座標の偏差 $A,B$ を微分し、円の距離の勾配と比較する。

<!-- proof-start -->
### 証明

$\rho=\sqrt{A^2+B^2}>0$ とすると $\partial_xA=1,\partial_yA=-\sigma t,\partial_xB=0,\partial_yB=1$ だから、

$$
\partial_x\Phi=\frac A\rho,\qquad
\partial_y\Phi=\frac{B-\sigma t A}{\rho}.
$$

よって

$$
|\nabla\Phi|^2=\frac{A^2+(B-\sigma t A)^2}{A^2+B^2}.
$$

$(0.5+r,0.5)$ は $A=r,B=0,\rho=r$ なので

$$
|\nabla\Phi|^2=\frac{r^2+(\sigma t r)^2}{r^2}=1+(\sigma t)^2.
$$

値0の曲線は正しくても、微分可能な符号付き距離の勾配は1であるという条件に反する。
<!-- proof-end -->

ここでは**界面の移流や厳密面積**は壊れていない。失われたのは関数を距離として解釈できる性質である。

## 3. 半Lagrange法で格子に移す

到着格子点から旧時刻の位置へ戻る点を**足点**と呼ぶ。半Lagrange法は足点の旧場値を補間して到着点の新値にする。今の流れは $y$ が一定なので、足点は**厳密に**

$$
(x^-,y^-)=(x-\sigma\Delta t(y-0.5),y).
$$

<a id="def-fcg8-semilag"></a>

<!-- formal-statement-start -->
> **定義（半Lagrange Level Set更新）**  
> $N\ge2$、$h=1/N$ [m] のセル中心 $(x_i,y_j)=((i+\frac12)h,(j+\frac12)h)$（$i,j=0,\dots,N-1$）に値 $\phi^n_{ij}$ を保存する。時間刻み $\Delta t>0$ で上式の足点 $(x_i^-,y_j^-)$ を求め、双線形補間演算 $I_h$ を用いて

$$
\phi^{n+1}_{ij}=(I_h\phi^n)(x_i^-,y_j^-)
$$

> と更新する。足点がセル中心の範囲を超えた場合は、各軸で一番近い端の中心値へ切り詰める端値延長とする。本講は $N=48,\Delta t=0.04$ sを使用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg8-semilag -->
**直接例。** 隣接する旧格子中心の値が左下 $-0.2$、右下 $0.2$、左上0、右上 $0.4$ [m] で、足点が4中心の中央なら横・縦の比は $a=b=1/2$。4重みはいずれも1/4であり、

$$
(I_h\phi)(x^-,y^-)=\tfrac14(-0.2)+\tfrac14(0.2)+\tfrac14(0)+\tfrac14(0.4)=0.1\ \mathrm m.
$$

非負重み・和1・値域 $[-0.2,0.4]$ 内という条件を確認した。重みの式は[FCG7の双線形重み](../FCG7/index.md#def-fcg7-weights)と代数的に同じだが、こちらは**非周期のセル中心格子**で境界処理が異なる。
<!-- definition-example-end -->

<a id="prop-fcg8-interpolation-bound"></a>

<!-- formal-statement-start -->
> **命題（双線形移流の最大値原理と非保存性）**  
> 半Lagrange補間が非負・和1の双線形重みまたは端値延長を使うとき、新格子値は旧格子値の最小 $m$ と最大 $M$ の間にある。一方、この性質だけから負値セル数やその面積が保存するとは結論できない。
<!-- formal-statement-end -->

**証明の見取り図。** 最大最小は凸結合で示す。面積保存でないことは符号が反転する補間例で示す。

<!-- proof-start -->
### 証明

旧値 $v_k$ が $m\le v_k\le M$、重みが $w_k\ge0,\sum_kw_k=1$ なら

$$
m\sum_kw_k\le\sum_kw_kv_k\le M\sum_kw_k,
\quad\text{従って}\quad m\le\sum_kw_kv_k\le M.
$$

端値延長は値を複製するだけなので同様である。しかし $v_0=-1,v_1=+3$ の平均は $\tfrac12(-1)+\tfrac12(3)=+1$ であり、負だった値が正へ変わる。縦方向に同じ値を複製すれば双線形でも起きる。よって値域の保全は、負の符号で判定するセル数の保存を含まない。
<!-- proof-end -->

## 4. 距離の意味を戻す再初期化

厳密移流ですら[距離勾配を保たない](#prop-fcg8-distance-loss)。そこで**再初期化**では物理時刻と別の擬似時間 $\tau$ で $\phi$ を修正する。移流直後の場 $\phi_0$ を固定し、正規化した符号 $s=\phi_0/\sqrt{\phi_0^2+h^2}$ を用いて

$$
\partial_\tau\psi+s(|\nabla\psi|-1)=0
$$

を解く考え方である。$s$ の正負で差分の向きを変える**Godunov上流差分**を導入する。$D_x^-\psi=(\psi_{ij}-\psi_{i-1,j})/h$、$D_x^+\psi=(\psi_{i+1,j}-\psi_{ij})/h$（$y$ も同様）とする。

<a id="def-fcg8-godunov"></a>

<!-- formal-statement-start -->
> **定義（Godunov再初期化）**  
> $N\ge3$ の格子で移流直後の $\phi_0$ を固定する。内点で $s_{ij}=\phi_{0,ij}/\sqrt{\phi_{0,ij}^2+h^2}$ とする。$s_{ij}\ge0$ なら

$$
G_+^2=\max\{(\max(D_x^-\psi,0))^2,(\min(D_x^+\psi,0))^2\}
+\max\{(\max(D_y^-\psi,0))^2,(\min(D_y^+\psi,0))^2\},
$$

> $s_{ij}<0$ なら

$$
G_-^2=\max\{(\min(D_x^-\psi,0))^2,(\max(D_x^+\psi,0))^2\}
+\max\{(\min(D_y^-\psi,0))^2,(\max(D_y^+\psi,0))^2\}
$$

> と置く。適切な $G=G_+$ または $G_-$ を使い、擬似時間刻み $0<\Delta\tau\le h/2$ で

$$
\psi_{ij}^{k+1}=\psi_{ij}^k-\Delta\tau\,s_{ij}(G_{ij}-1)
$$

> と更新する。本講は $\Delta\tau=0.30h$、物理ステップごと6反復、最外周の値は反復中固定とする。距離勾配の改善は期待できるが、零等位集合や面積の厳密な不変は主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg8-godunov -->
**直接例。** 水平に垂直な平面界面の距離 $\psi=x-x_*$ に対して、全内点で $D_x^-\psi=D_x^+\psi=1$、$D_y^-\psi=D_y^+\psi=0$。正の側なら $G_+^2=\max(1,0)=1$、負の側なら $G_-^2=\max(0,1)=1$。従って $G=1$ で擬似時間増分は0。符号による選択、勾配、更新の条件を直接確かめた。
<!-- definition-example-end -->

<a id="prop-fcg8-redistance-stationary"></a>

<!-- formal-statement-start -->
> **命題（Godunov再初期化の一次関数に対する定常性）**  
> 初期 $\psi_{ij}=(i+\tfrac12)h-x_*$ が全格子点に与えられ、外周をその値に固定して[Godunov再初期化](#def-fcg8-godunov)を行うとき、すべての擬似時間反復で $\psi_{ij}$ は変わらない。
<!-- formal-statement-end -->

**証明の見取り図。** 各内点の左右差分を計算し、反復回数で帰納する。

<!-- proof-start -->
### 証明

初期の全内点では

$$
D_x^-\psi=\frac{[(i+\tfrac12)-(i-\tfrac12)]h}{h}=1,\quad
D_x^+\psi=\frac{[(i+\tfrac32)-(i+\tfrac12)]h}{h}=1,\quad
D_y^-\psi=D_y^+\psi=0.
$$

$s$ が正でも負でも $G=1$ なので、$\psi_{ij}^{k+1}-\psi_{ij}^k=-\Delta\tau s_{ij}(1-1)=0$。境界も固定され、次の反復で同じ差分を得る。反復数による帰納法で全点が不変である。
<!-- proof-end -->

**使えない推論。** 円を移流したときは差分が場所ごとに異なるため $G-1$ は一般に0ではない。再初期化をすれば必ず**面積保存**というのは、この証明の仮定（正確な一次距離）を失った誤用である。

## 5. 面積・勾配・粒子を別々に測る

連続液滴は[せん断面積保存](#prop-fcg8-shear-area)で面積 $\pi r^2$ を保つ。しかし格子上では「セル中心が負」のセル数に依存する面積近似を使う。距離の意味は界面近くの中央差分勾配の大きさで検査する。いずれも近似的な**診断値**である。

<a id="def-fcg8-metrics"></a>

<!-- formal-statement-start -->
> **定義（離散面積と距離勾配の診断）**  
> 格子幅 $h=1/N$ のLevel Set格子値 $\phi_{ij}$ に対して、

$$
A_h(\phi)=h^2\sum_{i,j}\boldsymbol1\{\phi_{ij}<0\},
\qquad
\epsilon_A=\frac{A_h(\phi)}{\pi r^2}-1
$$

> とする。内部格子点で $B_h=\{(i,j):1\le i,j\le N-2,\ |\phi_{ij}|<3h\}$ を定め、非空なら中央差分勾配 $\boldsymbol D^0\phi$ を使って

$$
E_\nabla(\phi)=\frac1{\#B_h}
\sum_{(i,j)\in B_h}\left||\boldsymbol D^0\phi_{ij}|-1\right|
$$

> を平均距離勾配誤差と呼ぶ。$\epsilon_A$ と $E_\nabla$ はどちらも観測・評価のための指標であり、厳密保存則ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg8-metrics -->
**直接例。** $N=48$ の初期円盤では、セル中心の負値を数えると240個。$h^2=1/2304$ [m$^2$] なので

$$
A_h=240/2304=5/48\approx0.10416667\ \mathrm{m}^2,
$$

$$
\epsilon_A=\frac{5/48}{\pi(0.18)^2}-1\approx0.0233728.
$$

負値セルのカウント、格子面積、正の相対誤差（初期から約2.34%過大）を検算した。$E_\nabla$ は帯域内で中央差分を算出して得る。初期に面積誤差があることと、連続の物理流れで面積が保存することは矛盾しない。
<!-- definition-example-end -->

64個の輪郭**目印粒子**は、[前講の粒子位置の考え方](../FCG7/index.md#def-fcg7-mixing)で厳密せん断流に沿って更新する。粒子数が64のままでも粒子の間の面積は保証されない。格子の符号、粒子位置、GPU画素、解析面積をそれぞれ検算する。

## 6. JS・GLSL編集ラボ：三つの界面を動かす

<iframe src="simulation/wgl-lab.html?lesson=FCG8" title="FCG8 Level Set移流・再初期化・厳密粒子比較ラボ" loading="lazy" style="width:100%;height:1050px;border:1px solid #64748b;border-radius:7px;" allow="fullscreen"></iframe>

既存の3タブ型ラボ（**1. 実験条件・課題／2. コード編集／3. 実行結果**）に接続する。[物理更新JavaScript](levelset.js)、[頂点GLSL](levelset.vert)、[断片GLSL](levelset.frag)を編集・再実行できる。

**左**は半Lagrange移流した値、**中央**は移流後に再初期化した値、**右**は厳密な円周の移流解と64個の粒子である。青は液滴内部、暗色は外側、黄色は零等位面に近い有限幅の表示帯、橙は粒子点。左と中央のR8 textureは**描画の量子化**だけに使い、物理更新はFloat64で行う。3パネルの絵の一致を、連続体の質量保存の証明とみなさない。

step0/1/8/24の結果、**物理時間 $t=0.04n$** [s]、負値セル面積、解析面積、距離勾配誤差、粒子位置、独立CPUの予測画素とGPU実画素を比較する。再生・一時停止・1step・step0復帰を操作し、画面のフレーム更新間隔と物理時刻を分けて考える。

**変更課題。** JavaScriptの redistanceIterations を6から0へ変え、距離勾配診断がどう変わるか検査する。次に shear を0にして円が変形しないことを確認する。GLSLの色帯閾値 0.014 を変え、GPUの表示だけが変わり物理面積が変わらないことを確かめる。GLSLの構文を壊してコンパイルエラーを観察する。GPU非対応時は独立CPU値を参照できても、GPU実画素検証は未達成とする。

**モデルの限界。** この運動学実験では圧力Poisson問題、表面張力、2相流、移動固体との接触を解かない。数値再初期化は距離勾配を調整する操作であり、面積や液体質量を強制的に保存する機構ではない。

## 7. 演習

### Level A

<a id="ex-fcg8-a1"></a>
**A1. 円盤の内外判定。** 半径 $r=0.2$ m、中心 $(0.5,0.5)$ の $\phi_0=\sqrt{(x-0.5)^2+(y-0.5)^2}-r$ について、$P=(0.5,0.5)$、$Q=(0.7,0.5)$、$R=(0.9,0.5)$ の符号を計算して内・界面・外を判定せよ。また中心で $\nabla\phi_0$ は存在するか。

- Level: A

<!-- solution-start -->
**詳細解答。** [零等位集合の定義](#def-fcg8-level-set)で、中心との距離を $\rho$ として $\phi_0=\rho-0.2$ を評価する。$P$ では $\rho=0$ なので $\phi_0(P)=-0.2<0$、液体内部。$Q$ では $\rho=0.2$、$\phi_0(Q)=0$ なので界面。$R$ では $\rho=0.4$、$\phi_0(R)=0.4-0.2=0.2>0$ なので外側。中心での差分商は $x$ の左右で符号が異なるため、$\rho$ の偏微分は定まらない。[符号付き距離関数の直接例](#def-fcg8-signed-distance)で確認したように、中心では最近接境界点も一意でなく、勾配の大きさ1という条件は適用できない。
<!-- solution-end -->

<a id="ex-fcg8-a2"></a>
**A2. 特性曲線の計算。** $\sigma=0.5$ [1/s]、初期位置 $(x_0,y_0)=(0.4,0.7)$ [m] の粒子を $t=0.6$ s動かす。速度と移動後の位置を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** この流れの $y$ は不変なので、水平速度は $u_x=\sigma(y_0-0.5)=0.5(0.7-0.5)=0.1$ m/s、垂直速度は0。[せん断流の特性曲線](#prop-fcg8-shear-area)へ $t=0.6$ を代入すると

$$
X=0.4+0.5(0.6)(0.7-0.5)=0.4+0.06=0.46,\qquad Y=0.7.
$$

答えは $(0.46,0.70)$ [m]。移動量0.06 mは $0.1$ m/s と0.6 sの積で、次元も合っている。
<!-- solution-end -->

<a id="ex-fcg8-a3"></a>
**A3. 双線形補間の符号。** 旧格子の4中心の値が、左下 $-0.3$、右下 $0.1$、左上 $-0.1$、右上 $0.3$ [m] である。足点の横比 $a=1/4$、縦比 $b=1/2$ のとき、4つの補間重みと新値を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [半Lagrange法](#def-fcg8-semilag)と[双線形重み](../FCG7/index.md#def-fcg7-weights)の式をこのセル中心配置に用いれば、4重みは

$$
(1-a)(1-b)=\tfrac34\tfrac12=\tfrac38,\qquad
a(1-b)=\tfrac14\tfrac12=\tfrac18,
$$

$$
(1-a)b=\tfrac38,\qquad ab=\tfrac18.
$$

非負で総和 $3/8+1/8+3/8+1/8=1$。補間値は

$$
\frac38(-0.3)+\frac18(0.1)+\frac38(-0.1)+\frac18(0.3)
=-0.1125+0.0125-0.0375+0.0375=-0.1\ \mathrm m.
$$

最小値 $-0.3$ と最大値 $0.3$ の間に収まり、[最大値原理](#prop-fcg8-interpolation-bound)と整合する。
<!-- solution-end -->

<a id="ex-fcg8-a4"></a>
**A4. 平面界面の再初期化。** $\psi(x,y)=x-0.5$ を格子幅 $h>0$ で標本化したとき、内点の $D_x^\pm\psi,D_y^\pm\psi$ と $G_+,G_-$、擬似時間更新の増分を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 格子の位置を $x_i=(i+\tfrac12)h$ とすると、

$$
D_x^-\psi=\frac{(x_i-0.5)-(x_i-h-0.5)}h=1,\qquad
D_x^+\psi=\frac{(x_i+h-0.5)-(x_i-0.5)}h=1.
$$

$y$ には依存しないので $D_y^-\psi=D_y^+\psi=0$。[Godunov再初期化](#def-fcg8-godunov)に代入すると正符号側で $G_+^2=\max\{1,0\}+0=1$、負符号側でも $G_-^2=\max\{0,1\}+0=1$。従っていずれも $G=1$、更新量 $-\Delta\tau s(G-1)=0$。ここでは水平に沿って値が一定な**直線界面**を使ったのであって、一般の曲線でも増分0だとはいえない。
<!-- solution-end -->

<a id="ex-fcg8-a5"></a>
**A5. 負値セル数から面積へ。** 一辺1 m、$N=20$ の格子で負のセル中心が50個ある。離散面積を求め、半径 $r=0.2$ mの円盤の真の面積との差および相対誤差を求めよ。この50個は問題で与えた観測値とする。

- Level: A

<!-- solution-start -->
**詳細解答。** 格子幅は $h=1/20$ m、セル面積は $h^2=1/400$ m$^2$。[離散面積の定義](#def-fcg8-metrics)より

$$
A_h=50(1/400)=1/8=0.125\ \mathrm{m}^2.
$$

真の円盤面積は $A_*=\pi(0.2)^2=0.04\pi\approx0.125663706$ m$^2$ だから

$$
A_h-A_*=0.125-0.04\pi\approx-0.000663706\ \mathrm{m}^2,
$$

$$
\epsilon_A=0.125/(0.04\pi)-1\approx-0.0052829.
$$

約 $-0.528\%$ の過小評価である。これは仮定された50セルについての計算であり、実際の半径0.2 mの円の負値セル数が50であると主張していない。
<!-- solution-end -->

### Level B

<a id="ex-fcg8-b1"></a>
**B1. 移流後の「距離ではない」度合い。** $\sigma t=0.48$、$r=0.18$ とする。厳密Level Set解 $\Phi$ の点 $(0.5+r,0.5)$ における偏微分2成分と勾配ノルムを求め、零等位集合が正確でも再初期化したくなる理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [距離勾配が保たれない命題](#prop-fcg8-distance-loss)の記法では $A=r,B=0,\rho=r>0$。したがって

$$
\partial_x\Phi=A/\rho=1,\qquad
\partial_y\Phi=(B-\sigma t A)/\rho=-0.48,
$$

$$
|\nabla\Phi|=\sqrt{1^2+(-0.48)^2}=\sqrt{1.2304}\approx1.10923.
$$

[符号付き距離の定義](#def-fcg8-signed-distance)の勾配条件は1だから、関数値をそのまま「界面までの距離[m]」と読めない。厳密な移流後もこの差が生じるのは、せん断によって距離が測られる方向が変わるためである。再初期化は距離の勾配を1へ近づけようとするが、再初期化による離散面積の保存は自動的には保証されない。
<!-- solution-end -->

<a id="ex-fcg8-b2"></a>
**B2. 最大値原理と負値面積。** 旧値 $(v_0,v_1)=(-1,+3)$ を持つ1行2列の離散場を考える。2つの到着点がどちらも旧値を等重み補間すると仮定すると、新しい負値セル数はいくつか。最大値原理と面積の保存は同値か。

- Level: B

<!-- solution-start -->
**詳細解答。** 更新前は $-1$ の1セルだけが負である。各到着点の補間値は

$$
\tfrac12(-1)+\tfrac12(3)=-\tfrac12+\tfrac32=+1.
$$

更新後の2セルはいずれも正なので負値セル数は0。[双線形補間の最大値原理](#prop-fcg8-interpolation-bound)は $-1\le+1\le+3$ なので満たす。破れたのは**符号で数えた面積が保存する**という性質であり、補間の値域制約ではない。この例は一般の補間写像への反例で、FCG8の特定のせん断流が2セルを同じ足点へ移すという意味ではない。
<!-- solution-end -->

<a id="ex-fcg8-b3"></a>
**B3. 粒子数と面積の違い。** 初期半径 $r=0.18$ mの円周上の2点 $(0.5,0.5+r)$ と $(0.5+r,0.5)$ を、$\sigma=0.6$ [1/s]、$t=1$ sで動かした位置を求めよ。液滴全体の面積と、それを保証する条件を求めよ。粒子数64が保持されるだけで十分か。

- Level: B

<!-- solution-start -->
**詳細解答。** [せん断流の軌道](#prop-fcg8-shear-area)より、上端の点は

$$
X=0.5+0.6(1)(0.18)=0.608,\qquad Y=0.68
$$

へ移る。右端の点は $y_0=0.5$ なので $(0.68,0.5)$ から動かない。写像 $\boldsymbol F_t$ のJacobian行列は

$$
D\boldsymbol F_t=\begin{pmatrix}1&0.6\\0&1\end{pmatrix},\qquad \det D\boldsymbol F_t=1.
$$

この**領域全体の可逆変換**の面積倍率が1であることから、面積は $\pi(0.18)^2=0.0324\pi\approx0.10178760$ m$^2$ を保持する。しかし、輪郭上の64目印粒子が消えないだけでは、粒子間の間隔や囲まれた面積を規定できない。面積保存の根拠は点の個数ではなくJacobianである。
<!-- solution-end -->

<a id="ex-fcg8-b4"></a>
**B4. GLSLの色幅を変える実験。** FCG8ラボで断片GLSLの黄色い輪郭帯の閾値 $0.014$ だけを $0.030$ に変更した。どの量が変わりうるか：黄色画素、JSの負値セル数、JSの距離勾配誤差、輪郭粒子の座標。変更の効果を計算の流れで説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** GPUの表示では $|\phi|\le0.014$ 付近だった輪郭記号の帯域を $|\phi|\le0.030$ 付近へ拡大するため、その範囲に入る画素が黄色に変わりうる。対してJavaScriptの半Lagrange移流・Godunov反復で得たFloat64格子値はshaderを参照しない。[負値セル面積と距離勾配](#def-fcg8-metrics)はJavaScriptの格子値から計算されるので変化しない。64粒子も速度場の解析軌道だけを参照するので変わらない。独立CPU基準の画素とGPU画素の差は生じうるが、それは**描画を変更した結果**であり、流体の質量が変わった証拠ではない。
<!-- solution-end -->

### Level C

<a id="ex-fcg8-c1"></a>
**C1. 液滴の移流・距離回復・検算を一貫して設計する。** 初期 $\phi_0(x,y)=\sqrt{(x-0.5)^2+(y-0.5)^2}-r$、$r=0.18$ m、$\boldsymbol u=(\sigma(y-0.5),0)$、$\sigma=0.6$ [1/s]、$t=0.8$ s、$h=1/48$ m、$\Delta t=0.04$ sとする。

1. 特性曲線を求め、逆写像から厳密なLevel Set関数と変形後の界面方程式を導出せよ。
2. 厳密面積と、界面点 $(0.68,0.5)$ における移流後の勾配の大きさを求めよ。なぜ両者を混同してはならないか。
3. 1stepの足点を示し、旧格子値から新格子値を作る4重みの条件を説明せよ。
4. 再初期化を $\Delta\tau=0.30h$、6回繰り返す意味を述べ、直線界面で変化が0となる根拠を示せ。
5. 連続の面積保存、離散面積、距離勾配、GPU画素、粒子軌跡をそれぞれ何に使って判定するか述べよ。

- Level: C

<!-- solution-start -->
**詳細解答。** **（1）厳密移流。** 特性曲線は $Y'=0,\ X'=\sigma(Y-0.5)$、初期値 $(x_0,y_0)$ から

$$
Y(t)=y_0,\qquad X(t)=x_0+\sigma t(y_0-0.5).
$$

逆写像は $x_0=x-\sigma t(y-0.5),y_0=y$。[特性曲線とLevel Setの命題](#prop-fcg8-characteristics)により $\phi$ は軌道上で一定だから

$$
\Phi(x,y,t)=
\sqrt{[x-0.5-\sigma t(y-0.5)]^2+(y-0.5)^2}-r.
$$

零等位集合では右の平方根が $r>0$ に等しい。両辺を二乗して

$$
[x-0.5-\sigma t(y-0.5)]^2+(y-0.5)^2=r^2
$$

を得る。

**（2）面積と勾配の違い。** 変換のJacobian行列と行列式は

$$
D\boldsymbol F_t=\begin{pmatrix}1&\sigma t\\0&1\end{pmatrix},
\quad \det D\boldsymbol F_t=1.
$$

面積の倍率が1なので[せん断面積保存](#prop-fcg8-shear-area)より

$$
A_*=\pi(0.18)^2=0.0324\pi\approx0.10178760\ \mathrm{m}^2.
$$

$t=0.8$ では $\sigma t=0.48$。$(x,y)=(0.68,0.5)$ で $A=x-0.5-\sigma t(y-0.5)=0.18,B=0,\rho=0.18$ を[勾配の導出](#prop-fcg8-distance-loss)へ代入して

$$
\partial_x\Phi=1,\qquad \partial_y\Phi=-0.48,\qquad
|\nabla\Phi|=\sqrt{1+0.48^2}=\sqrt{1.2304}\approx1.10923.
$$

**面積保存は可逆な領域変換の行列式**、**距離勾配は関数の空間微分**についての主張であり、別々に検証する。

**（3）半Lagrange更新。** 到着セル中心 $(x_i,y_j)$ の旧時刻足点は

$$
x_i^-=x_i-0.6(0.04)(y_j-0.5)
=x_i-0.024(y_j-0.5),\qquad y_j^-=y_j.
$$

隣り合う旧格子中心を選び、足点の局所座標を $a,b\in[0,1]$ とすれば、[双線形補間](#def-fcg8-semilag)の重みは

$$
(1-a)(1-b),\quad a(1-b),\quad (1-a)b,\quad ab.
$$

各重みは非負で和1。セル中心の外側の足点は指定の端値延長で処理する。ただしこの更新は符号の面積保存を保証しない。

**（4）再初期化。** $\Delta\tau=0.30/48=0.00625$（擬似時間としての格子幅に合わせた尺度）で、6回の反復分は0.0375である。[Godunov法の定義](#def-fcg8-godunov)では移流後の $\phi_0$ を固定して符号係数 $s$ を決め、反復中の $\psi$ の片側差分から $G$ を計算する。もし $\phi_0=0$ の格子点があれば $s=0$ でその格子点の増分は0。また $\psi=x-x_*$ が全点で成立する直線界面なら、内点の差分は $D_x^-=D_x^+=1,D_y^-=D_y^+=0$、正負どちらでも $G=1$ なので更新量は0。この結論は一般の曲面界面に自動で拡張できない。

**（5）独立した評価。** 連続体では[面積の厳密値](#prop-fcg8-shear-area)を参照し、数値格子では[離散面積と勾配診断](#def-fcg8-metrics)を

$$
A_h=h^2\#\{(i,j):\phi_{ij}<0\},\qquad
\epsilon_A=A_h/A_*-1
$$

および帯域上の $E_\nabla$ として、生の移流場と再初期化後の場の双方で測る。初期格子でも $A_h=240/2304\approx0.10416667$ m$^2$ で、厳密面積から約2.34%ずれる。64個の粒子は[特性曲線](#prop-fcg8-characteristics)で計算した位置が解析解に一致するかを見るが、粒子数の保存だけでは面積の証拠にならない。WebGL2の色・画素は**表示の正しさ**を確認するもので、Float64の計算と独立に比較する。再初期化で $E_\nabla$ が改善しても、$\epsilon_A=0$ や物理的な質量保存の保証ではない。
<!-- solution-end -->

## 8. 次の講義

FCG8では、零等位集合で表した液滴を**運動学的に追跡**し、厳密面積・距離勾配・格子の符号を別々に検算した。次のFCG9「数値的な液面をどうメッシュにするか」では、この格子の零等位集合から線分・頂点・法線を持つ幾何を構成する。
