# CELEV6 n体舞踏解・組み紐と軌道分類

<!-- definition-example-audit: strict -->

[CELEV5の8の字解](../CELEV5/index.md#thm-celev5-eight-shape)では、等質量三体が同じ曲線を時間差で走るという、円運動以外の驚くべき解を得ました。しかし「同じ道を追う」という条件はNewton方程式そのものではありません。どのように時間差を定め、**本当にNewton解となる例を作り**、平面上で粒子が入れ替わる軌道の違いを記録するのでしょうか。

まず任意個数の等質量粒子に対する舞踏解の定義を整え、正多角形が剛体回転する周期解を力の和から構成します。その後、衝突のない全粒子の軌道を時空間の組み紐として読み、対ごとの巻き数を自力で計算します。組み紐型の分類は**軌道の位相的な分類**であり、その型にNewton解が存在するかという変分問題とは別だと理解することが目標です。

## 1. 粒子番号と時間シフトを固定する

$n\ge2$、重力定数 $G>0$、共通質量 $m>0$ とします。平面を複素平面 $\mathbb C$ と同一視し、全粒子の位置を $q(t)=(q_1(t),\ldots,q_n(t))$ と書きます。[CELE2のNewton方程式](../../CELE/CELE2/index.md#prop-cele2-nbody-equations)をこの場合に具体化すると、衝突のない解は

$$
\ddot q_i(t)=Gm\sum_{j\ne i}\frac{q_j(t)-q_i(t)}{|q_j(t)-q_i(t)|^3}
\qquad (i=1,\ldots,n)
$$

を満たします。すべての粒子が同じ曲線を辿るというだけでは、各時刻の粒子間距離も力も定まりません。そこで周期 $T>0$ に対し、各粒子の時刻をちょうど $T/n$ ずつずらすことを要求します。

<a id="def-celev6-choreography"></a>
<!-- formal-statement-start -->
> **定義（等質量平面n体の単純舞踏解）**  
> $n\ge2$、$G,m,T>0$ とする。衝突のない $T$ 周期の $C^2$ 級平面Newton解 $q=(q_1,\ldots,q_n)$ が、ある $T$ 周期曲線 $\gamma:\mathbb R\to\mathbb C$ により

$$
q_i(t)=\gamma\left(t+\frac{(i-1)T}{n}\right)
\qquad (i=1,\ldots,n)
$$

> と表せるとき、指定した粒子番号の順の**単純舞踏解**と呼ぶ。添字は $n$ を法として巡回的に読み、$q_{n+1}=q_1$ とする。$T$ は必ずしも最小周期とは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev6-choreography -->
### 例：時間差の向きを直接確かめる

**定義の確認**。$n=3$、$\tau=T/3$ とすれば $q_1=\gamma(t)$、$q_2=\gamma(t+\tau)$、$q_3=\gamma(t+2\tau)$ です。したがって

$$
q_2(t)=q_1(t+\tau),\quad
q_3(t)=q_2(t+\tau),\quad
q_1(t)=q_3(t+\tau)
$$

です。最後の式には $\gamma(t+3\tau)=\gamma(t+T)=\gamma(t)$ を使いました。[CELEV5の舞踏解の定義](../CELEV5/index.md#def-celev5-choreography)は粒子番号を逆向きに付けた同値な規約です。等質量なら番号を反転して本章の規約に合わせられます。**時間シフトの符号は勝手に変えず、番号と一緒に変更する**必要があります。

ここではまだ任意の $\gamma$ が解になるとは述べていません。たとえば $\gamma(t)\equiv0$ なら表示上の等式は満たすものの、全粒子が衝突しているため定義から外れます。
<!-- definition-example-end -->

時間シフト条件から粒子配置がどのように入れ替わるかを、まず純粋な代数で取り出します。

<a id="prop-celev6-cyclic-shift"></a>
<!-- formal-statement-start -->
> **命題（単純舞踏解の巡回位相と重心）**  
> 第1節の単純舞踏解に対し $\tau=T/n$ とおくと、すべての $t\in\mathbb R$ と $k\in\mathbb Z$ について

$$
q_i(t+k\tau)=q_{i+k}(t)
$$

> が成立する。全粒子の重心が零の慣性座標系を採れば、生成曲線 $\gamma$ は各 $t$ で

$$
\sum_{j=0}^{n-1}\gamma(t+j\tau)=0
$$

> を満たす。後者は**時刻ごとの和**であって、単なる時間平均の零という条件より強い。
<!-- formal-statement-end -->

### 証明の見取り図

定義の $q_i$ に $k\tau$ を代入します。$n\tau=T$ のため、添字を一巡させても周期性で元に戻ります。重心条件にはこの表示をそのまま代入します。

<!-- proof-start -->
### 証明

まず定義から

$$
q_i(t+k\tau)
=\gamma(t+(i-1+k)\tau)
=q_{i+k}(t)
$$

です。$i+k$ が $1,\ldots,n$ の外にあっても、$\gamma(t+n\tau)=\gamma(t)$ により右辺の巡回添字は矛盾なく定まります。重心は共通質量だから

$$
q_{\mathrm{cm}}(t)=\frac{\sum_{i=1}^n m q_i(t)}{nm}
=\frac1n\sum_{j=0}^{n-1}\gamma(t+j\tau).
$$

重心零を仮定すれば右辺は零となります。逆にこの時刻ごとの和が零なら重心も零です。$\square$
<!-- proof-end -->

この命題はNewton方程式を使いません。**巡回位相を満たすこと**と、**その軌道が力学方程式を解くこと**を切り分けるための準備です。

## 2. 任意のnで実際に存在する円形舞踏解

最も単純な候補は、正 $n$ 角形の頂点を互いの間隔を保ったまま回す軌道です。各頂点の位置が一定角速度 $\omega>0$ で回るなら、力の接線方向成分は左右対称に打ち消し合います。残る半径方向の力の大きさを求めれば、$\omega$ を**推測ではなく方程式で決定**できます。

<a id="thm-celev6-regular-polygon"></a>
<!-- formal-statement-start -->
> **定理（等質量正多角形の円形舞踏解）**  
> $n\ge2$、$G,m,R>0$ とし、

$$
S_n=\sum_{k=1}^{n-1}\frac1{\sin(\pi k/n)},\qquad
\omega=\sqrt{\frac{GmS_n}{4R^3}},\qquad
T=\frac{2\pi}{\omega}
$$

> と定める。このとき平面Newton方程式は、全時刻で衝突しない $T$ 周期解

$$
q_j(t)=R\exp\left(i\omega t+\frac{2\pi i(j-1)}n\right)
\qquad (j=1,\ldots,n)
$$

> を持つ。これは[単純舞踏解の定義](#def-celev6-choreography)を満たし、重心は零、全角運動量は $nmR^2\omega>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

1番の頂点へ働く力を調べます。$k$ 個先の頂点との弦長は $2R\sin(\pi k/n)$。複素数表示の実部を取って半径方向の成分を計算すると、各頂点の寄与は $-Gm/(4R^2\sin(\pi k/n))$ となります。接線方向は $k$ 番目と $n-k$ 番目が打ち消し合います。この和と $-\omega^2q_1$ を一致させます。

<!-- proof-start -->
### 証明

$\zeta_k=e^{2\pi ik/n}$ とおき、まず $t=0$ の1番の粒子 $q_1(0)=R$ を調べます。相手の頂点は $R\zeta_k$（$k=1,\ldots,n-1$）です。相対位置とその絶対値は

$$
q_{k+1}(0)-q_1(0)=R(\zeta_k-1),\qquad
|q_{k+1}(0)-q_1(0)|=2R\sin(\pi k/n).
$$

ここで $0<\pi k/n<\pi$ だから正弦は正であり、分母は零ではありません。Newton加速度の$x$成分に相当する実部を一項ずつ計算すると

$$
\operatorname{Re}\frac{R(\zeta_k-1)}
{|R(\zeta_k-1)|^3}
=\frac{R(\cos(2\pi k/n)-1)}
{8R^3\sin^3(\pi k/n)}
=\frac{-2R\sin^2(\pi k/n)}
{8R^3\sin^3(\pi k/n)}
=-\frac1{4R^2\sin(\pi k/n)}.
$$

虚部は $k$ と $n-k$ で符号が反対で、絶対値は等しいので全項を足すと零です。$n$ が偶数のとき $k=n/2$ は単独ですが、その項の虚部はもともと零です。ゆえに1番の加速度は

$$
Gm\sum_{k=1}^{n-1}
\frac{R(\zeta_k-1)}{|R(\zeta_k-1)|^3}
=-\frac{GmS_n}{4R^2}.
$$

正多角形全体を回転しても粒子間距離とNewton力の形は変わりません。したがって一般の時刻・粒子番号では、この右辺を $q_j(t)/R$ 倍したものが加速度です。

一方、明示した曲線を二度微分すれば

$$
\dot q_j=i\omega q_j,\qquad
\ddot q_j=-\omega^2q_j
=-\frac{GmS_n}{4R^3}q_j.
$$

これが直前に求めたNewton加速度と一致します。粒子間距離は $2R\sin(\pi |j-k|/n)>0$ で一定なので全時刻で衝突しません。$\omega T=2\pi$ により $T$ 周期です。さらに

$$
q_j(t)=Re^{i\omega(t+(j-1)T/n)}
=q_1(t+(j-1)T/n),
$$

ゆえに[舞踏解の定義](#def-celev6-choreography)を満たします。$n\ge2$ の単位根の和は

$$
\sum_{j=1}^ne^{2\pi i(j-1)/n}
=\frac{1-e^{2\pi i}}{1-e^{2\pi i/n}}=0
$$

なので重心は零です。各粒子の角運動量は $m(q_j\wedge\dot q_j)=mR^2\omega$ であり、和は $nmR^2\omega$ となります。$\square$
<!-- proof-end -->

### 例：2体・3体で公式を点検する

**条件の確認**。$n=2$ では $S_2=1/\sin(\pi/2)=1$ だから $\omega^2=Gm/(4R^3)$。二つの質点は距離 $2R$ にあり、他方からの加速度の大きさは $Gm/(2R)^2$、円運動の加速度の大きさは $\omega^2R=Gm/(4R^2)$。一致します。

$n=3$ では $S_3=2/\sin(\pi/3)=4/\sqrt3$ であり、

$$
\omega^2=\frac{Gm}{\sqrt3 R^3}.
$$

頂点間の距離は $\sqrt3R$ です。1番に働く2本の力の半径方向成分の和は $2(Gm/(3R^2))\cos(\pi/6)=Gm/(\sqrt3R^2)$ となり、$\omega^2R$ と一致します。

この円形解は**全角運動量が正**です。[CELEV5の8の字解のゼロ角運動量](../CELEV5/index.md#prop-celev5-zero-angular)とは異なります。つまり「舞踏解」という共通名だけでは軌道の形も保存量も決まりません。

## 3. 平面内の衝突回避を配置空間として見る

周期軌道を絵で眺めるだけでは「どの粒子がどの粒子の周囲を回ったか」を安定して比較できません。配置全体を一つの点とし、同時刻に二粒子が重なる場所だけを除いた空間を考えます。その空間の中で、軌道が連続的に変形できるかどうかを調べるのが組み紐型への入口です。

<a id="def-celev6-configuration-braid"></a>
<!-- formal-statement-start -->
> **定義（ラベル付き配置空間と周期組み紐）**  
> $n\ge2$ とする。ラベル付きの非衝突配置空間を

$$
F_n(\mathbb C)=\{(z_1,\ldots,z_n)\in\mathbb C^n:
z_i\ne z_j\ (i\ne j)\}
$$

> と定める。連続な $T$ 周期非衝突軌道 $q:[0,T]\to F_n(\mathbb C)$ の各粒子の時空間内の線

$$
\mathcal S_i=\{(t,q_i(t)):0\le t\le T\}
$$

> を、その軌道の**周期組み紐**と呼ぶ。各線が交わらないまま端点を保って連続変形できる場合、二つの周期組み紐は同じ組み紐型に属するとする。
<!-- formal-statement-end -->

時空間の線が交わるとは、**同じ時刻 $t$ に** $q_i(t)=q_j(t)$ となることです。平面に投影した一体の軌跡が自分自身と異なる時刻で交差することとは別です。[8の字舞踏解](../CELEV5/index.md#thm-celev5-eight-shape)の曲線には自己交差がありますが、異時刻に通過するため非衝突と両立します。

<!-- definition-example-start: def-celev6-configuration-braid -->
### 例：2体の円運動を「2本の線」で確認する

**定義の確認**。$q_1(t)=Re^{i\omega t}$、$q_2(t)=-Re^{i\omega t}$、$T=2\pi/\omega$（$R,\omega>0$）とします。両者の差は $2Re^{i\omega t}\ne0$ で、したがって $q(t)\in F_2(\mathbb C)$ が全時刻で成立します。$q(T)=q(0)$ だから線の両端も粒子ごとに対応します。時空間内で二本は交わらず、平面上では互いを一周します。

一方、定数配置 $q_1=R$、$q_2=-R$ も衝突しない周期的な閉曲線ですが、両粒子の相対位置は動きません。どちらも同じ $F_2(\mathbb C)$ 内の閉曲線なのに、巻き方が異なることを次節で整数として識別します。なお定数配置はNewton方程式の解ではなく、**位相的比較のための曲線**です。
<!-- definition-example-end -->

粒子ラベルを保った $T$ 周期の閉曲線は純組み紐に対応します。対して舞踏解は $\tau=T/n$ 進むと粒子番号が巡回します。[巡回位相の命題](#prop-celev6-cyclic-shift)より

$$
q(\tau)=(q_2(0),q_3(0),\ldots,q_n(0),q_1(0)).
$$

したがって $[0,\tau]$ だけを見ると**ラベル付き配置では始点に戻りません**が、粒子の名前を忘れた配置では始点に戻ります。名前を忘れた配置の閉曲線は通常の組み紐を与え、その粒子置換が $n$ 巡回です。一周全体 $[0,T]$ ではラベル付きの閉曲線に戻り、純組み紐になります。「時間 $T$ の閉合」と「$\tau$ での置換閉合」を区別してください。

## 4. 相対巻き数で組み紐の一部を数値化する

[CA5のwinding number](../../../解析系/CA/CA5/index.md#def-ca5-winding-number)は、原点を避ける閉曲線の回転を数えます。これを各粒子対の相対位置へ適用すると、粒子 $i,j$ の相対位置が原点を何周するかを数えます。これは**衝突がなければ定義できる整数**で、単純な連続変形では変わりません。ただし巻き数だけですべての組み紐型を区別できるわけではありません。

<a id="def-celev6-pair-winding"></a>
<!-- formal-statement-start -->
> **定義（周期軌道の対ごとの相対巻き数）**  
> $T>0$、$n\ge2$ とし、$q:[0,T]\to F_n(\mathbb C)$ は $C^1$ 級で $q(T)=q(0)$ とする。粒子対 $i<j$ について

$$
W_{ij}(q)=\frac1{2\pi}\int_0^T
\frac{(q_i-q_j)\wedge(\dot q_i-\dot q_j)}
{|q_i-q_j|^2}\,dt
$$

> を**相対巻き数**と呼ぶ。ここで $(a,b)\wedge(c,d)=ad-bc$ は平面の符号付き面積である。
<!-- formal-statement-end -->

この式がなぜ巻き数になるのでしょうか。非零の相対ベクトル $z=q_i-q_j$ を極形式 $z=r(\cos\theta,\sin\theta)$ と書くと、微分して

$$
\dot z=\dot r(\cos\theta,\sin\theta)
+r\dot\theta(-\sin\theta,\cos\theta),\quad
z\wedge\dot z=r^2\dot\theta.
$$

したがって積分の被積分関数は角度の増加率 $\dot\theta$ そのものであり、半径の変化には依存しません。

<a id="prop-celev6-winding-invariant"></a>
<!-- formal-statement-start -->
> **命題（巻き数の整数性と非衝突変形不変性）**  
> $C^1$ 級の $T$ 周期非衝突曲線 $q:[0,T]\to F_n(\mathbb C)$ に対し、各 $W_{ij}(q)$ は整数である。二つの曲線を周期端点を保つ連続な非衝突変形で結べるなら、各 $W_{ij}$ は一致する。従って巻き数が異なれば同じ周期組み紐型ではない。
<!-- formal-statement-end -->

### 証明の見取り図

相対位置を原点を避けて動く閉曲線に直します。角度を連続的に「ほどいて」追うと、終点で元の向きに戻るため角度差は $2\pi$ の整数倍になります。変形の途中に衝突がなければ、この整数が飛び移ることはできません。

<!-- proof-start -->
### 証明

$i<j$ を固定し、$z(t)=q_i(t)-q_j(t)$ と置きます。$z$ は零を取らない連続な閉曲線です。$[0,T]$ は区間なので、偏角の連続な実数値表示 $\theta(t)$ を選べます（小区間ごとに連続な角度を選び、重なりで $2\pi$ の整数倍を調整して貼り合わせます）。$C^1$ 性の下では各小区間で

$$
\frac{z\wedge\dot z}{|z|^2}=\dot\theta
$$

です。小区間に分けて積分し、中間端点の角度を相殺すると

$$
2\pi W_{ij}(q)=\theta(T)-\theta(0).
$$

$z(T)=z(0)$ から二つの角度は同じ向きを表すので、差は $2\pi k$（$k\in\mathbb Z$）。従って $W_{ij}=k$ です。

次に変形パラメータ $s\in[0,1]$ を取り、$z(s,t)\ne0$ かつ $z(s,0)=z(s,T)$ と仮定します。コンパクトな長方形上で $z$ は一様連続で、長方形全体に零を取らないため $|z|$ には正の下限があります。近い二つの $s$ の相対曲線は、同じ局所的な偏角を使って連続に比較でき、巻き数の差は連続的に変化します。ところがそれぞれ整数なので、その差は近い $s$ では零です。$[0,1]$ は連結だから巻き数は全区間で一定です。従って巻き数の異なる組み紐を非衝突のまま変形することはできません。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-celev6-pair-winding -->
### 例：円形舞踏解の全粒子対で計算する

**定義の確認**。第2節の円形舞踏解で $\zeta_j=e^{2\pi i(j-1)/n}$ と置くと

$$
q_i(t)-q_j(t)=Re^{i\omega t}(\zeta_i-\zeta_j).
$$

$i\ne j$ なら $\zeta_i-\zeta_j\ne0$。相対位置は半径 $R|\zeta_i-\zeta_j|$ の円を、周期 $T$ の間に正方向へちょうど一回転します。直接微分しても $\dot z=i\omega z$ なので、

$$
\frac{z\wedge\dot z}{|z|^2}=\omega,\qquad
W_{ij}=\frac1{2\pi}\int_0^T\omega\,dt
=\frac{\omega T}{2\pi}=1.
$$

全ての $i<j$ について $W_{ij}=1$ です。一方、位置を固定した非衝突配置では $\dot z=0$ なので $W_{ij}=0$。従って両者を非衝突周期曲線のまま連続変形することはできません。[巻き数の不変性](#prop-celev6-winding-invariant)が具体的な分類に働く例です。
<!-- definition-example-end -->

組み紐型の違いを判定する**必要な手掛かり**を得ましたが、同じ巻き数の組でも、粒子が三体以上あると異なる組み紐型になり得ます。組み紐全体の代数的分類と、Newton解の存在を同一視してはいけません。整数値性・ホモトピー不変性は[CA5の巻き数の不変性](../../../解析系/CA/CA5/index.md#cor-ca5-winding-homotopy)の特別な場合でもありますが、上では力学の記法で改めて中間計算を示しました。

## 5. 対称性、軌道の形、存在の範囲

ここで解を三つの観点から比べます。

| 軌道 | 力学上の性質 | 舞踏条件・組み紐の観点 |
| --- | --- | --- |
| 第2節の正多角形円運動 | 任意の $n\ge2$ に対し本章で完全に構成したNewton周期解 | 単純舞踏解、全対の巻き数が $1$ |
| [CELEV5の等質量三体8の字](../CELEV5/index.md#thm-celev5-eight-shape) | 既習の外部結果による非衝突Newton周期解 | 粒子番号を整えれば単純舞踏解。曲線は円ではなく自己交差を持ち、全角運動量が零 |
| Hip-Hop型の四体空間軌道 | 平面外の上下振動や相対称性を持つ非平面の例がある | **三次元の対称周期軌道**という性質だけでは本章の「平面単純舞踏解」にはならない |

Hip-Hopを「舞踏解ではない」と一括して否定するのも適切ではありません。空間型の舞踏解を別途定義することは可能ですが、本章の平面配置空間 $F_n(\mathbb C)$ に入らない軌道には平面組み紐の巻き数を無条件に適用できません。

また[CELEV4の有限群平均と対称作用](../CELEV4/index.md#prop-celev4-reynolds)によって、あるループが置換・時間シフト対称性を持つことは確認できます。しかし**対称なループが存在すること**から**作用最小点の衝突排除**や**非定数のNewton周期解の存在**を結論することはできません。第2節では具体的な加速度を計算したからこそ解と分かり、8の字では[CELEV5の衝突排除結果](../CELEV5/index.md#thm-celev5-collision-bound)と[復元定理](../CELEV5/index.md#thm-celev5-reconstruction)が必要でした。

一般の $n$ と一般の組み紐型に対して非円形舞踏解の存在を保証する定理は、ここでは主張しません。数値的に描画された候補を確かなNewton周期解へ昇格させるには、**力学方程式の残差、端点閉合、衝突回避**の厳密な保証が別に要ります。これは次のCELEV8で扱う数値検証と存在証明の境界にもなります。

## 6. 演習

### Level A

<a id="ex-celev6-a01"></a>
**A1. 時間シフトの向き。** $n=4$ の単純舞踏表示を書き下し、$q_4(t+T/4)=q_1(t)$ を示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\tau=T/4$ とすると、[舞踏解の定義](#def-celev6-choreography)より $q_1=\gamma(t),q_2=\gamma(t+\tau),q_3=\gamma(t+2\tau),q_4=\gamma(t+3\tau)$。従って $q_4(t+\tau)=\gamma(t+4\tau)=\gamma(t+T)=\gamma(t)=q_1(t)$ です。逆向き $q_1(t+\tau)=q_4(t)$ は一般には成立しません。
<!-- solution-end -->

<a id="ex-celev6-a02"></a>
**A2. 正二角形のNewton加速度。** $n=2$、半径 $R$ の直径の両端に質量 $m$ を置く。必要な角速度の二乗をNewtonの力から求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

粒子間距離は $2R$ なので一方の粒子が他方から受ける加速度の大きさは $Gm/(2R)^2=Gm/(4R^2)$。加速度の向きは円の中心方向です。角速度を $\omega$ とすると等速円運動の加速度の大きさは $\omega^2R$。両者を等置して $\omega^2R=Gm/(4R^2)$、従って $\omega^2=Gm/(4R^3)$ です。[正多角形存在定理](#thm-celev6-regular-polygon)の $S_2=1$ と一致します。
<!-- solution-end -->

<a id="ex-celev6-a03"></a>
**A3. 相対位置の巻き数。** $z(t)=2e^{4\pi it/T}$（$0\le t\le T$）の巻き数を求めよ。これはNewton解と仮定しなくてよい。

- Level: A

<!-- solution-start -->
### 詳細解答

$\dot z=(4\pi i/T)z$ なので $z\wedge\dot z=(4\pi/T)|z|^2$。$z$ は零を取らず、$z(T)=z(0)$ を満たします。[相対巻き数の定義](#def-celev6-pair-winding)と同じ積分で

$$
W=\frac1{2\pi}\int_0^T\frac{4\pi}{T}\,dt=2.
$$

相対ベクトルが周期中に二回原点を回ったことを意味します。
<!-- solution-end -->

<a id="ex-celev6-a04"></a>
**A4. 交差と衝突。** 1本の生成曲線 $\gamma$ が $\gamma(t_0)=\gamma(s_0)$（$t_0\ne s_0$）を満たすだけで、舞踏解に衝突があると言えるか。衝突の正確な条件を書け。

- Level: A

<!-- solution-start -->
### 詳細解答

言えません。異なる時刻に同じ位置を通過しても、同時刻に別粒子と重なるとは限りません。[舞踏解の定義](#def-celev6-choreography)より粒子 $i,j$ の衝突条件は、ある $t$ で

$$
\gamma(t+(i-1)\tau)=\gamma(t+(j-1)\tau)
$$

となることです。左の二つの時刻の差は $(j-i)\tau$ で固定されています。任意の自己交差時刻差 $s_0-t_0$ がこれに等しいわけではありません。**同時刻の二粒子の一致**が衝突です。
<!-- solution-end -->

<a id="ex-celev6-a05"></a>
**A5. 位相差のない状態の判定。** $n=3$ で $\gamma(t)=Re^{i\omega t}$、$T=2\pi/\omega$ とする。$\gamma(t)$ と $\gamma(t+T/3)$ の距離を求め、衝突の有無を判定せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

差は $Re^{i\omega t}(1-e^{2\pi i/3})$。複素数の絶対値を取れば

$$
|\gamma(t)-\gamma(t+T/3)|=R|1-e^{2\pi i/3}|
=2R\sin(\pi/3)=\sqrt3R>0.
$$

他の二組の時刻差も $T/3$ または $2T/3$ で同じ距離です。従って3粒子は全時刻で異なる位置にいます。距離の正値性は確認できましたが、Newton解であることは[円形存在定理](#thm-celev6-regular-polygon)の加速度計算で別に確認します。
<!-- solution-end -->

### Level B

<a id="ex-celev6-b01"></a>
**B1. 正三角形の力の検算。** 質量 $m$ の3粒子を半径 $R$ の正三角形の頂点に置く。一粒子の二つの重力加速度の半径方向成分を足し、$\omega^2=Gm/(\sqrt3R^3)$ を導け。

- Level: B

<!-- solution-start -->
### 詳細解答

辺長は $a=2R\sin(\pi/3)=\sqrt3R$。それぞれの重力加速度の大きさは $Gm/a^2=Gm/(3R^2)$ です。頂点から中心を向く半径と各辺の内向き方向のなす角は $\pi/6$。左右の接線方向成分は打ち消し合い、半径方向の和は

$$
2\frac{Gm}{3R^2}\cos(\pi/6)
=2\frac{Gm}{3R^2}\cdot\frac{\sqrt3}{2}
=\frac{Gm}{\sqrt3R^2}.
$$

これを等速円運動の $\omega^2R$ と一致させ、$\omega^2=Gm/(\sqrt3R^3)$ を得ます。[定理の一般公式](#thm-celev6-regular-polygon)で $S_3=4/\sqrt3$ を代入しても同じ値です。
<!-- solution-end -->

<a id="ex-celev6-b02"></a>
**B2. 巻き数の違いは連続変形で消せない。** 2粒子の周期的な相対位置 $z_0(t)=Re^{2\pi it/T}$ と $z_1(t)=R$ を、相対位置が零にならない周期曲線のまま変形できないことを示せ。零を通ると何が壊れるかも述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$z_0$ は $\dot z_0=(2\pi i/T)z_0$ なので、巻き数は

$$
\frac1{2\pi}\int_0^T
\frac{z_0\wedge\dot z_0}{|z_0|^2}\,dt
=\frac1{2\pi}\int_0^T\frac{2\pi}{T}\,dt=1.
$$

$z_1$ は定数だから $\dot z_1=0$ で巻き数は零です。[巻き数の変形不変性](#prop-celev6-winding-invariant)から、零を避ける連続変形では整数 $1$ を $0$ に変えられません。途中で $z=0$ を許すと被積分関数の分母 $|z|^2$ が消えて定義不能になり、粒子の衝突を表すため、命題の前提が失われます。
<!-- solution-end -->

<a id="ex-celev6-b03"></a>
**B3. 巡回閉合と完全周期の違い。** $n=4$ の単純舞踏解 $q(t)$ について、時刻 $T/4$ の位置ベクトルを $q(0)$ から表せ。完全周期 $T$ のときと何が違うか説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$\tau=T/4$ とし、[巡回位相命題](#prop-celev6-cyclic-shift)で $k=1$、$t=0$ とすれば

$$
q(\tau)=(q_2(0),q_3(0),q_4(0),q_1(0)).
$$

衝突のない配置だから $q_1(0),\ldots,q_4(0)$ は相異なり、このベクトルはラベル付きでは $q(0)$ と一致しません。しかしラベルを忘れた点集合は同じです。$k=4$ にすれば $q(T)=(q_1(0),q_2(0),q_3(0),q_4(0))$ となり、ラベル付きでも閉じます。したがって $T/4$ では通常の組み紐の巡回置換を、$T$ では純組み紐を見ています。
<!-- solution-end -->

<a id="ex-celev6-b04"></a>
**B4. 同じ対称性でもNewton解とは限らない。** $n=3$、$\gamma(t)=R e^{2\pi it/T}$ と定めた同じ舞踏表示を考える。$T$ を任意に指定してよいだろうか。Newton方程式が要請する条件を導け。

- Level: B

<!-- solution-start -->
### 詳細解答

$\omega=2\pi/T$ と置けば $\gamma$ は $T$ 周期であり、$q_i(t)=\gamma(t+(i-1)T/3)$ は時間シフト等式を満たします。粒子間距離は $\sqrt3R>0$ なので衝突もしません。しかし加速度は $\ddot q_i=-\omega^2q_i$ であり、[正三角形のNewton加速度の計算](#thm-celev6-regular-polygon)は右辺を $-(Gm/(\sqrt3R^3))q_i$ と与えます。従って

$$
\left(\frac{2\pi}{T}\right)^2=\frac{Gm}{\sqrt3R^3},
\qquad
T=2\pi\sqrt{\frac{\sqrt3R^3}{Gm}}
$$

でなければNewton解ではありません。対称性と非衝突だけでは力学的な周期 $T$ を決定できない、という失敗機構です。
<!-- solution-end -->

### Level C

<a id="ex-celev6-c01"></a>
**C1. 存在・位相・検証を切り分ける。** $n\ge3$、$G,m,R>0$ とする。(i) 正多角形円形解の $T$ とNewton方程式への適合を、力の対称性から示せ。(ii) $[0,T/n]$ と $[0,T]$ の端点の違いを述べよ。(iii) 各粒子対の巻き数を計算せよ。(iv) 別の組み紐型を満たす連続ループが見つかったとして、それだけではNewton周期解の存在を主張できない理由を説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(i) 半径 $R$ の正 $n$ 角形で、頂点1から $k$ 個先への弦長は $d_k=2R\sin(\pi k/n)$ です。1個の重力加速度の半径方向成分は

$$
Gm\frac{R(\cos(2\pi k/n)-1)}{d_k^3}
=-\frac{Gm}{4R^2\sin(\pi k/n)}.
$$

接線方向成分は $k$ と $n-k$ の対で相殺されます。従って合力の加速度は

$$
-\frac{Gm}{4R^3}
\left(\sum_{k=1}^{n-1}\frac1{\sin(\pi k/n)}\right)q_i.
$$

$q_i=R e^{i(\omega t+2\pi(i-1)/n)}$ の二階微分は $-\omega^2q_i$ なので、$\omega^2=GmS_n/(4R^3)$、$T=2\pi/\omega$ を選べば[正多角形円形舞踏解定理](#thm-celev6-regular-polygon)が成立します。粒子間距離は正の定数なので衝突はありません。

(ii) $\tau=T/n$ とおくと、[巡回位相命題](#prop-celev6-cyclic-shift)により $q(\tau)=(q_2(0),\ldots,q_n(0),q_1(0))$ です。従ってラベル付きではまだ閉じません。$q(T)=q(0)$ では全ラベルが戻るので純組み紐になります。

(iii) 相対位置は $z_{ij}(t)=Re^{i\omega t}(\zeta_i-\zeta_j)$ で $z_{ij}\ne0$、$\dot z_{ij}=i\omega z_{ij}$ です。[巻き数の定義](#def-celev6-pair-winding)に代入すると

$$
W_{ij}=\frac1{2\pi}\int_0^T\omega\,dt=1
\quad (i<j).
$$

(iv) 組み紐型は $F_n(\mathbb C)$ 上の衝突しない連続曲線を分類しますが、Newton方程式への適合、第一変分の停留性、極小点の衝突排除は含んでいません。[CELEV4の対称極小点の解への昇格定理](../CELEV4/index.md#thm-celev4-symmetric-criticality)にも非衝突等の追加条件があります。異なる組み紐型の候補ループを作ったというだけで存在証明は完了せず、数値計算による残差の小ささも厳密な存在定理とは区別します。
<!-- solution-end -->

## 7. 出典と次の問い

本章で証明したのは、任意の $n\ge2$ に対する**等質量・正多角形円形舞踏解の存在**と、巻き数の初歩的な不変性です。円形以外の舞踏解を一般の $n$、任意の組み紐型で保証したわけではありません。8の字については [Chenciner–Montgomery (2000)](https://annals.math.princeton.edu/articles/12364) の外部定理を[CELEV5](../CELEV5/index.md#thm-celev5-eight-shape)から援用しています。

発展例の調査には [Calleja–Doedel–García-Azpeitiaらの舞踏解資料](https://mym.iimas.unam.mx/renato/choreographies/index.html) が役立ちます。ただしその数値的・計算機援用の例をすべて手計算の存在定理とは扱いません。空間Hip-Hop四体周期解の存在結果は、平面舞踏解とは別の対象です。次のCELEV7では周期解のまわりの線形化と第二変分を通じて、**存在することと安定であること**を区別します。
