# U2-08 測距・方位・ランドマークの観測モデル

[前講の運動模型](../U2-07/index.md#def-u2-07-velocity-motion)は、車輪の情報から「次はどこにいるか」を予測しました。しかし、滑りや初期姿勢の誤差は走行だけでは消えません。地図に位置が記録された目印（**ランドマーク**）をセンサーで見たとき、予測姿勢と実測を比べるための式が必要です。

例えば、世界座標で目印が $(2,1)$ m、ロボットが $(1,1)$ m にいて北（$\theta=\pi/2$）を向いているなら、目印は **1 m 先ではなく、車体の右90度、距離1 m** にあります。世界座標の東向きと車体からの右向きを区別することが出発点です。ここでは既知の地図にある目印一つの番号が分かっている状況をまず扱い、見えない配置や誤った対応付けで何が壊れるかも検証します。

<!-- definition-example-audit: strict -->

## 1. 世界の目印を車体から見る

[平面姿勢](../U2-06/index.md#def-u2-06-planar-pose)を $g=(x,y,\theta)$ とし、世界座標の $x$ 軸を右、$y$ 軸を上、向きの正を反時計回りに取ります。位置成分は m、角度は rad です。既知の目印の世界座標を $m=(a,b)$ m とし、その番号も正しく分かっているものとします。センサーの原点は車体の姿勢原点と一致し、車体前方が方位角 $0$、左側が正角です。センサーを車体からずらして設置した場合は、先に[剛体座標変換](../U2-06/index.md#def-u2-06-rigid-transform)でセンサー自身の姿勢を求めます。

世界での目印への変位を $d=(d_x,d_y)=(a-x,b-y)$ m、二乗距離を $q=d_x^2+d_y^2$ m² と置きます。$q>0$ のとき、世界での目印の向きは $\alpha=\operatorname{atan2}(d_y,d_x)$ で、車体で見た角度は $\alpha-\theta$ です。$\operatorname{atan2}(y,x)$ は象限を含む方向角（$x^2+y^2>0$ で定義）です。角度は同じ向きを $2\pi$ ごとに繰り返すため、[角度の正規化](../U2-06/index.md#def-u2-06-angle-wrap)を用いて $[-\pi,\pi)$ に収めます。

<a id="def-u2-08-range-bearing"></a>

<!-- formal-statement-start -->
> **定義（既知ランドマークの測距・方位予測）**  
> 世界座標の姿勢 $g=(x,y,\theta)\in\mathbb R^2\times\mathbb R$ と、既知のランドマーク $m=(a,b)\in\mathbb R^2$ を与える。センサー原点は車体原点、方位角は車体前方から反時計回りとする。$d_x=a-x$、$d_y=b-y$、$q=d_x^2+d_y^2>0$ に対し、予測測距 $r$ と予測方位 $\beta$ を次で定める。

$$
r(g,m)=\sqrt q,\qquad
\beta(g,m)=\operatorname{wrap}\!\left(\operatorname{atan2}(d_y,d_x)-\theta\right).
$$

> 二つを並べた $h(g,m)=(r(g,m),\beta(g,m))^T$ と書く。これは既知目印の測距・方位を予測する関数である。$q=0$ では方向が定まらないため、この関数の定義域から除く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-08-range-bearing -->
**定義の確認**：$g=(1,1,\pi/2)$、$m=(2,1)$ では、$d=(1,0)$、$q=1>0$、$\operatorname{atan2}(0,1)=0$。したがって $r=1$ m、$\beta=\operatorname{wrap}(-\pi/2)=-\pi/2$ rad となります。前方（北）から右90度に目印が見えることと一致します。別の姿勢 $g=(0,0,0)$、$m=(3,4)$ では $q=25>0$、$r=5$ m、$\beta=\operatorname{atan2}(4,3)$（約 $0.9273$ rad）です。どちらも目印番号・原点・角度規約を固定したうえで、定義の距離条件と方位条件を直接確認しました。
<!-- definition-example-end -->

**センサー値をそのまま世界の $x,y$ と見なすことはできません。** 距離 $r$ と車体方位 $\beta$ から復元した相対点は車体座標で $(r\cos\beta,r\sin\beta)$ です。[車体から世界への平面剛体変換](../U2-06/index.md#def-u2-06-rigid-transform)を使えば世界点は

$$
m=\begin{pmatrix}x\\y\end{pmatrix}
+R(\theta)\begin{pmatrix}r\cos\beta\\r\sin\beta\end{pmatrix}
=\begin{pmatrix}x+r\cos(\theta+\beta)\\y+r\sin(\theta+\beta)\end{pmatrix}.
$$

例えば北向きの先ほどの例で $\theta+\beta=0$、$(x+r,y)=(2,1)$ が元の目印になります。ただし $r,\beta$ だけから姿勢の三成分が一意に求まる、という意味ではありません。

## 2. 実測には誤差がある

予測関数 $h$ は理想的な値です。実際のセンサーでは距離と方角が少しずれます。距離誤差を $\varepsilon_r$（m）、角度誤差を $\varepsilon_\beta$（rad）とし、まずは状態とは独立で平均0、有限な二次モーメントをもつ雑音を考えます。独立という条件は**状態と雑音の独立**であって、距離誤差と角度誤差の間まで常に独立とする意味ではありません。二成分の共分散を $R$（$2\times2$）と書き、相関がなければ対角行列になります。

<a id="def-u2-08-noisy-observation"></a>

<!-- formal-statement-start -->
> **定義（測距・方位の加法雑音模型）**  
> $q>0$ を満たす姿勢 $g$ と既知ランドマーク $m$ に対し、[測距・方位観測関数](#def-u2-08-range-bearing)を $h(g,m)=(r,\beta)^T$ とする。雑音ベクトル $\varepsilon=(\varepsilon_r,\varepsilon_\beta)^T$ は $E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=R$（対称半正定値な $2\times2$ 行列）を満たし、真の姿勢と独立とする。観測値は

$$
Z_r=r+\varepsilon_r,\qquad
Z_\beta=\operatorname{wrap}(\beta+\varepsilon_\beta)
$$

> で与える。必要に応じ $R\succ0$ を仮定する。これは位置を測る模型ではなく、**姿勢と既知地図を条件とした観測の生成模型**である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-08-noisy-observation -->
**定義の確認**：前節の $r=1$ m、$\beta=-\pi/2$ に対し、誤差を $(0.2,0.1)$（m, rad）とすれば、測定は $Z_r=1.2$ m、$Z_\beta=-\pi/2+0.1$ rad です。平均0というのは多数回の誤差の期待値であり、**一回の実現値が0という意味ではありません**。距離・角度が無相関で標準偏差が $0.2$ m と $0.1$ rad の場合、$R=\operatorname{diag}(0.04,0.01)$ は正定値で、各成分の単位はそれぞれ m²、rad² です。非対角成分をもつ場合は m·rad の単位になります。
<!-- definition-example-end -->

この単純な模型では数学上 $Z_r<0$ も起こり得ます。非負距離しか返さないセンサーを厳密に表すには、測定値の打切り・棄却や非負な別の雑音分布の仕様を明示しなければなりません。本講の加法模型は**距離が0から十分離れ、雑音が小さい場合の局所模型**です。また角度に通常の正規分布を仮定しても、報告される角度は円周上なので、厳密な尤度は $2\pi$ 周期の確率密度として扱います。

**実測と予測との差**を「観測 innovation」と呼びます。線形観測では[Kalman 更新の innovation](../U2-05/index.md#def-u2-05-innovation)がそのまま引き算でしたが、ここでは方位に周期性があります。

<a id="def-u2-08-innovation"></a>

<!-- formal-statement-start -->
> **定義（距離・方位の観測 innovation）**  
> $q(g,m)>0$ で、実測 $z=(z_r,z_\beta)^T$（距離 m、角度 rad）、予測 $h(g,m)=(r,\beta)^T$ に対し、角度を補正した観測残差 $\nu=(\nu_r,\nu_\beta)^T$ を

$$
\nu_r=z_r-r,\qquad
\nu_\beta=\operatorname{wrap}(z_\beta-\beta)
$$

> と定める。角度成分は $[-\pi,\pi)$ に入る。境界 $\pm\pi$ で代表値が切り替わるため、通常の実数値差との区別が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-08-innovation -->
**定義の確認**：予測方位 $179^\circ$、実測 $-179^\circ$ のとき、生の差は $-358^\circ$ ですが、$\operatorname{wrap}(-358^\circ)=+2^\circ$ です。予測 $-179^\circ$、実測 $179^\circ$ なら $+358^\circ$ の wrap は $-2^\circ$ です。いずれも実際に短い角度差を返し、距離残差だけは通常の引き算をするという二条件を確かめられます。度数は説明用で、計算では rad に直します。
<!-- definition-example-end -->

雑音が小さく、真の角度との差が $\pm\pi$ の切替点に近くなければ、局所的には角度も実数として微分できます。しかし誤差が大きいと、wrap 前後で単純な Gaussian 近似は不適切になります。角度の観測が $z_\beta\in[-\pi,\pi)$ にあるとき、たとえば wrap 前の誤差が分散 $\sigma_\beta^2>0$ の正規分布なら、角度の厳密な条件付き密度は

$$
p(z_\beta\mid g,m)
=\sum_{k\in\mathbb Z}\frac{1}{\sqrt{2\pi\sigma_\beta^2}}
\exp\!\left[-\frac{(z_\beta-\beta+2\pi k)^2}{2\sigma_\beta^2}\right].
$$

互いに $2\pi$ 異なる実数値は同じ観測角を表すため、密度を全て足しています。距離誤差と角度誤差が独立なら両者の条件付き密度を掛けられますが、相関していればこの積には分解できません。

## 3. 姿勢を少し変えると観測はどう動くか

ロボットの姿勢を少しずらしたとき、予測観測がどれだけ変わるかを知りたい場面があります。これは次講で予測共分散を観測空間へ運ぶための準備です。姿勢三成分 $(x,y,\theta)$ に関する **Jacobi 行列**（成分ごとの偏微分を行に並べた $2\times3$ 行列）を導きます。角度の wrap を除いた滑らかな局所枝で計算し、切替点は後で区別します。

距離について $r=\sqrt q$、$q=(a-x)^2+(b-y)^2$ より

$$
\frac{\partial q}{\partial x}=-2d_x,\quad
\frac{\partial q}{\partial y}=-2d_y,\quad
\frac{\partial r}{\partial x}=\frac{-2d_x}{2\sqrt q}=-\frac{d_x}{r},\quad
\frac{\partial r}{\partial y}=-\frac{d_y}{r}.
$$

方位の計算では $\alpha=\operatorname{atan2}(d_y,d_x)$ の微小変化が $d\alpha=(d_x\,d(d_y)-d_y\,d(d_x))/q$ であることを確かめます。実際、$d_x=r\cos\alpha$、$d_y=r\sin\alpha$ を微分すると $d_x\,d(d_y)-d_y\,d(d_x)=r^2d\alpha$ です。姿勢の変化では $d(d_x)=-dx$、$d(d_y)=-dy$ なので

$$
d\alpha=\frac{d_y}{q}dx-\frac{d_x}{q}dy,\qquad
d\beta=d\alpha-d\theta.
$$

<a id="prop-u2-08-observation-jacobian"></a>

<!-- formal-statement-start -->
> **命題（測距・方位観測の姿勢 Jacobi 行列）**  
> 既知ランドマーク $m=(a,b)$、姿勢 $g=(x,y,\theta)$、$d=(a-x,b-y)$、$q=d_x^2+d_y^2>0$、$r=\sqrt q$ とする。[観測関数](#def-u2-08-range-bearing)の $g$ に関する局所 Jacobi 行列は、方位の代表値が切り替わらない領域で

$$
H(g,m)=\frac{\partial(r,\beta)}{\partial(x,y,\theta)}
=\begin{pmatrix}
-d_x/r&-d_y/r&0\\
d_y/q&-d_x/q&-1
\end{pmatrix}.
$$

> 行数2、列数3であり、これは真の非線形模型を**指定した姿勢の周囲で**一次近似する行列である。$q=0$ や wrap の切替面で通常の Jacobi 行列があると主張しない。
<!-- formal-statement-end -->

**証明の見取り図**：距離を平方根の連鎖律、方位を方向角の全微分で計算します。$d_x,d_y$ が $x,y$ の負符号をもつことと、車体方位から $\theta$ を引くことが主要な符号チェックです。

<!-- proof-start -->
### 証明

$q>0$ により $r>0$ なので平方根は微分可能です。上の $q$ の偏微分から $\partial_x r=-d_x/r$、$\partial_y r=-d_y/r$、$\partial_\theta r=0$ を得ます。一方 $\alpha=\operatorname{atan2}(d_y,d_x)$ は、選んだ角度の滑らかな局所枝で

$$
\frac{\partial\alpha}{\partial d_x}=-\frac{d_y}{q},
\qquad
\frac{\partial\alpha}{\partial d_y}=\frac{d_x}{q}
$$

を満たします。$\partial_x d_x=-1$、$\partial_y d_y=-1$、残りの交差偏微分は0です。したがって連鎖律から

$$
\partial_x\beta=(-d_y/q)(-1)=d_y/q,\quad
\partial_y\beta=(d_x/q)(-1)=-d_x/q,\quad
\partial_\theta\beta=-1.
$$

距離と方位の行を順に重ねて $H$ を得ます。wrap は切替面以外では整数倍の $2\pi$ を足す操作なので、その領域で微分係数は変わりません。
<!-- proof-end -->

**直接検算**：$g=(0,0,0)$、$m=(3,4)$ に対し $q=25$、$r=5$ です。

$$
H=\begin{pmatrix}-3/5&-4/5&0\\4/25&-3/25&-1\end{pmatrix}
=\begin{pmatrix}-0.6&-0.8&0\\0.16&-0.12&-1\end{pmatrix}.
$$

ここでロボットが世界の $x$ 正方向へ $0.01$ m 動けば距離は約 $0.006$ m 減り、方位は約 $0.0016$ rad 増えます。$y$ 正方向の移動なら距離が約 $0.008$ m 減り、方位が約 $0.0012$ rad 減ります。向きを $0.01$ rad 増やすと見かけの方位は約 $0.01$ rad 減ります。$\theta$ 列の $-1$ は特に重要です。

## 4. どんな姿勢の違いは観測から見えないか

未知数が $(x,y,\theta)$ の3個なのに、一つの目印から得る値は距離と方位の2個です。Jacobi 行列の**零方向**とは、その方向に姿勢を微小変化させても一次の観測変化が0になるベクトルです。逆に Jacobi 行列の列が独立なら、その点の周辺では小さい姿勢誤差を観測から区別できます（**局所可観測性**）。これは大域的に唯一の姿勢を求められることまで意味しません。

<a id="def-u2-08-local-observability"></a>

<!-- formal-statement-start -->
> **定義（観測関数の局所一次可観測性）**  
> 状態を $g\in\mathbb R^n$、観測関数を $h$、着目点を $g_0$ とし、$h$ はその近傍で微分可能とする。Jacobi 行列が次の階数条件を満たすとき、その点で**局所一次可観測**と呼ぶ。

$$
H=D_gh(g_0),\qquad \operatorname{rank}H=n.
$$

> また、次の条件を満たす非零の状態変化を、観測の**一次の零方向**と呼ぶ。

$$
H\delta g=0,\qquad \delta g\ne0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-08-local-observability -->
**定義の確認**：前節の一個の目印による $H$ は $2\times3$ で、列階数は最大2です。したがって状態3成分は局所一次可観測ではありません。直接計算でも $H(4,-3,1)^T=(-2.4+2.4,0.64+0.36-1)^T=(0,0)^T$ です。この非零ベクトルは、位置を $(4,-3)$ m/rad の方向へ動かし向きを同時に1 rad/rad 変える微小運動が見えないことを表します。
<!-- definition-example-end -->

<a id="prop-u2-08-one-landmark-null"></a>

<!-- formal-statement-start -->
> **命題（一つのランドマークの零方向）**  
> 既知ランドマーク $m$ と姿勢 $g$ が $q>0$ を満たすとする。[観測 Jacobi 行列](#prop-u2-08-observation-jacobian)は階数2で、零空間は次のベクトルで張られる一次元部分空間である。

$$
\ker H=\operatorname{span}\left\{
\begin{pmatrix}d_y\\-d_x\\1\end{pmatrix}\right\}.
$$

> すなわち一つの目印の測距・方位だけでは、平面姿勢三成分の局所的な違いをすべて区別できない。
<!-- formal-statement-end -->

**証明の見取り図**：距離の行は位置の目印方向成分、方位の行は位置の横方向成分と向きを読みます。位置を目印の周りに回し、ロボットの向きも同じ角度だけ回すと、目印への相対距離と相対方位が不変になります。

<!-- proof-start -->
### 証明

$q>0$ より $(d_x,d_y)\ne(0,0)$ です。[Jacobi 行列](#prop-u2-08-observation-jacobian)の第一行は零でなく、第二行の第三成分が $-1$、第一行の第三成分が0なので二行は独立です。ゆえに階数は2です。

$v=(d_y,-d_x,1)^T$ と置くと、第一行との積は $-d_xd_y/r+d_yd_x/r=0$、第二行との積は $(d_y^2+d_x^2)/q-1=0$。したがって $Hv=0$ です。階数2の $2\times3$ 行列の零空間は一次元であり、$v\ne0$ なのでこれが全零空間を張ります。

幾何的にも、任意の小角 $\gamma$ で位置を目印の周りに回し、向きへ $\gamma$ を足す変換

$$
p'=m+R(\gamma)(p-m),\qquad\theta'=\theta+\gamma
$$

を考えると、目印へのベクトルは $d'=R(\gamma)d$、距離は同じ、世界方位と車体向きはともに $\gamma$ だけ増えるので相対方位も同じです。$\gamma=0$ での微分は $(d_y,-d_x,1)^T$ となり、零方向の意味と一致します。
<!-- proof-end -->

**二つの異なる目印ならどうなるか。** 同時に観測した目印 $m_1\ne m_2$ の観測値を縦に並べれば、$4\times3$ の行列になります。両目印に重なっていないとき、二つの「目印の周りに回る」零方向は同時には成立しません。

<a id="prop-u2-08-two-landmarks-rank"></a>

<!-- formal-statement-start -->
> **命題（相異なる二つの既知ランドマーク）**  
> 平面姿勢 $g$ と、互いに異なる既知位置の目印 $m_1\ne m_2$ があり、双方への二乗距離 $q_1,q_2>0$ とする。二つの測距・方位観測の局所 Jacobi 行列 $H_1,H_2$ を縦に積んだ行列

$$
H_{\rm all}=\begin{pmatrix}H_1\\H_2\end{pmatrix}\in\mathbb R^{4\times3}
$$

> は列階数3をもつ。したがって、二つの既知目印は平面姿勢を局所一次可観測にする。
<!-- formal-statement-end -->

**証明の見取り図**：共通の零方向があれば、第一の目印の周りの微小回転と第二の目印の周りの微小回転を同時に実現する必要があります。目印が異なればそのような非零変化はありません。

<!-- proof-start -->
### 証明

$H_{\rm all}u=0$ とする。[一つの目印の零方向](#prop-u2-08-one-landmark-null)より、$u=(\delta x,\delta y,\delta\theta)^T$ は各 $i=1,2$ について

$$
u=t_i(d_{iy},-d_{ix},1)^T
$$

と書けます。第三成分の比較から $t_1=t_2=\delta\theta$。従って

$$
\delta\theta(d_{1y}-d_{2y})=0,\qquad
\delta\theta(d_{1x}-d_{2x})=0.
$$

$d_i=m_i-p$ で $m_1\ne m_2$ ですから $(d_{1x},d_{1y})\ne(d_{2x},d_{2y})$。よって $\delta\theta=0$ であり、$\delta x=\delta y=0$ も従います。零空間が $\{0\}$ なので列階数は3です。
<!-- proof-end -->

これは目印が遠すぎると測定誤差に対して推定が不安定になる可能性を否定しません。**列階数が十分**でも、数値的な条件の良さは別問題です。また見える目印が一つだけ、$q=0$、目印の位置自体が未知、誤対応がある、といった場合にはこの命題の仮定を満たしません。

## 5. 観測の不確かさと診断

姿勢の事前予測を平均 $\bar g=(\bar x,\bar y,\bar\theta)$、その局所座標の誤差を $\delta g=g-\bar g$、共分散を $P^-\in\mathbb R^{3\times3}$（対称半正定値）で表します。角度成分の差は $\bar\theta$ の近傍で一つの連続枝を選んだ微小角とし、wrap 境界を跨ぐ大誤差にはこの線形近似を使いません。

予測点 $\bar g$ で $H=H(\bar g,m)$ を評価すると、Taylor 一次近似は

$$
h(g,m)\simeq h(\bar g,m)+H\delta g.
$$

誤差 $\varepsilon$ と状態誤差 $\delta g$ を独立と仮定すれば、局所的な観測残差の一次近似は $\mathcal V\simeq H\delta g+\varepsilon$ です。

<a id="prop-u2-08-innovation-covariance"></a>

<!-- formal-statement-start -->
> **命題（局所一次 innovation 共分散）**  
> 姿勢誤差 $\delta g$ が平均0で $\operatorname{Cov}(\delta g)=P^-$、観測雑音 $\varepsilon$ が平均0で $\operatorname{Cov}(\varepsilon)=R$ とし、両者が独立であるとする。既知目印 $m$ と予測姿勢 $\bar g$ は $q(\bar g,m)>0$ を満たし、角度の同じ連続枝で一次近似できるものとする。観測関数の [Jacobi 行列](#prop-u2-08-observation-jacobian)を予測点で評価した $H$ に対し、局所一次 innovation の共分散は

$$
S=HP^-H^T+R\in\mathbb R^{2\times2}.
$$

> $R\succ0$ なら $S\succ0$ である。この式は一般の非線形観測の**厳密な** innovation 共分散を主張しない。
<!-- formal-statement-end -->

**証明の見取り図**：線形化した二つの誤差を足し、共分散を四項へ展開します。交差項が消えるのは独立性を使った箇所だけです。

<!-- proof-start -->
### 証明

$E[\delta g]=E[\varepsilon]=0$ なので $E[\mathcal V]\simeq0$。一次部分 $\widetilde{\mathcal V}=H\delta g+\varepsilon$ の共分散は

$$
\begin{aligned}
E[\widetilde{\mathcal V}\widetilde{\mathcal V}^T]
&=H E[\delta g\,\delta g^T]H^T
 +H E[\delta g\,\varepsilon^T]\\
&\quad+E[\varepsilon\,\delta g^T]H^T+E[\varepsilon\varepsilon^T]\\
&=HP^-H^T+R
\end{aligned}
$$

です。交差期待値は独立性と各平均0により零です。$P^-\succeq0$ なら任意の $u\in\mathbb R^2$ について $u^THP^-H^Tu=(H^Tu)^TP^-(H^Tu)\ge0$。$R\succ0$ の場合 $u\ne0$ に対して $u^TRu>0$ なので $u^TSu>0$ です。
<!-- proof-end -->

**数値例**：$\bar g=(0,0,0)$、$m=(3,4)$、$P^-=\operatorname{diag}(0.04,0.04,0.01)$、$R=\operatorname{diag}(0.01,0.0025)$ としましょう。前節で求めた

$$
H=\begin{pmatrix}-0.6&-0.8&0\\0.16&-0.12&-1\end{pmatrix}
$$

について、$P^-$ の位置部分が等方的なので距離と方位の交差項は $0.04(-0.6\cdot0.16-0.8\cdot(-0.12))=0$ です。成分ごとには

$$
\begin{aligned}
(HP^-H^T)_{11}&=0.04(0.36+0.64)=0.04,\\
(HP^-H^T)_{22}&=0.04(0.0256+0.0144)+0.01=0.0116.
\end{aligned}
$$

従って $S=\operatorname{diag}(0.05,0.0141)$ です。距離側の分散だけで方位側の異常を判定することはできません。$S$ が正定値なら、観測された $\nu$ の規模を調べる量として $\nu^TS^{-1}\nu$ を計算できます。ただし、その閾値の確率的な意味には模型と分布の仮定が必要です。

**外れ値・誤対応・相関の区別**：

- **外れ値**は同じ目印を見ていても雑音が仮定した分布から大幅に外れる現象です。単一 Gaussian 尤度を鵜呑みにすると、観測が姿勢推定を誤った方向へ強く引っ張ります。
- **誤対応**は別の目印の測定を $m$ の測定と思い込む現象です。これは $h(g,m)$ の入力 $m$ 自体が違うので、単に $R$ を小さく・大きくすれば直るとは限りません。
- **相関**は同時刻の観測雑音の距離・角度成分や、複数の目印の観測間に共通誤差があることです。独立な2観測として共分散を積み上げれば情報を二重に数えることがあります。

単純な外れ値模型には、通常の小誤差の密度と広い範囲の密度を重み付きで混ぜる方法があります。ただし混合係数・密度の台・正規化を指定して初めて確率模型になります。本講では観測の生成・微分・失敗条件までを確定し、**非線形な事後分布への更新は次講**で扱います。

## 6. Python で幾何・偏微分・零方向を照合する

以下の同じ Python ファイルで予測観測、中心差分での Jacobi 行列、角度 wrap、零方向および二つの目印の列階数を確認できます。中心差分は各状態成分に $h=10^{-6}$（位置は m、角度は rad）の正負変化を与えて計算します。$q=0$ を拒否すること、wrap の切替点をまたいだ通常の差分を用いないことも自己検査に入れています。外部パッケージと乱数は使用しません。

~~~python-file-lab
# lab-id: U2-08-LANDMARK
# lab-title: 測距・方位・Jacobi 行列と観測不能方向
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-08/assets/landmark_observation.py
# timeout-ms: 30000
# lab-preset: 距離と方位の幾何 | --scenario geometry
# lab-preset: Jacobi 行列の差分照合 | --scenario jacobian
# lab-preset: 角度の境界を跨ぐ残差 | --scenario wrap
# lab-preset: 見えない方向と2目印 | --scenario rank
# lab-preset: すべての自己検査 | --self-test
~~~

## 7. 演習・詳細解答

### Level A：距離、角度、定義域

<a id="ex-u2-08-a01"></a>

**A1. 車体から見た目印**

- Level: A

世界姿勢 $g=(1,1,\pi/2)$、既知目印 $m=(2,1)$（位置の単位は m）とする。測距・方位を求め、車体前方と左右のどちらにあるかを説明せよ。

<!-- solution-start -->
**詳細解答**：[観測関数の定義](#def-u2-08-range-bearing)により $d=(2-1,1-1)=(1,0)$、$q=1^2+0^2=1>0$、$r=\sqrt1=1$ m です。世界方位は $\operatorname{atan2}(0,1)=0$、車体向きが $\pi/2$ なので $\beta=\operatorname{wrap}(0-\pi/2)=-\pi/2$ rad。負の方位は右側であり、右90度の位置に見えます。
<!-- solution-end -->

<a id="ex-u2-08-a02"></a>

**A2. 角度差は短い方を取る**

- Level: A

予測方位 $179^\circ$、実測 $-179^\circ$、予測距離 $5$ m、実測距離 $5.4$ m とする。観測残差の距離成分と角度成分を求めよ。

<!-- solution-start -->
**詳細解答**：[距離・方位の観測 innovation](#def-u2-08-innovation)から $\nu_r=5.4-5=0.4$ m。角度の生の差は $-179^\circ-179^\circ=-358^\circ$ ですが、$-358^\circ+360^\circ=2^\circ$ は $[-180^\circ,180^\circ)$ 内です。ゆえに $\nu_\beta=2^\circ=\pi/90$ rad。$-358^\circ$ をそのまま使うと真の方向差を誤ります。
<!-- solution-end -->

<a id="ex-u2-08-a03"></a>

**A3. 観測関数が定義されない姿勢**

- Level: A

ロボット位置 $(2,3)$ m と目印位置 $(2,3)$ m に対して、$r$ と $\beta$ がどうなるか述べよ。$q=0$ のまま第3節の Jacobi 行列を使ってよいか。

<!-- solution-start -->
**詳細解答**：$d=(0,0)$、$q=0$、距離そのものは $r=0$ m です。しかし $\operatorname{atan2}(0,0)$ では目印への方向が決まらず、[観測関数](#def-u2-08-range-bearing)の組 $h=(r,\beta)$ は定義されません。[Jacobi 行列](#prop-u2-08-observation-jacobian)の式でも $d_x/r$、$d_y/q$ などで0除算が起こります。従ってこの模型をそのまま適用できません。
<!-- solution-end -->

<a id="ex-u2-08-a04"></a>

**A4. 観測行列の符号と次元**

- Level: A

予測姿勢 $g=(0,0,0)$、目印 $m=(3,4)$ m で、観測の姿勢 Jacobi 行列を求めよ。位置を $x$ 正方向へ動かすと予測方位が増えるか減るか述べよ。

<!-- solution-start -->
**詳細解答**：$d=(3,4)$、$q=25$、$r=5$ なので[Jacobi 行列の命題](#prop-u2-08-observation-jacobian)の各成分は $-3/5,-4/5,0$ および $4/25,-3/25,-1$ です。

$$
H=\begin{pmatrix}-3/5&-4/5&0\\4/25&-3/25&-1\end{pmatrix}.
$$

これは観測2成分・姿勢3成分に対応した $2\times3$ 行列です。$\partial_x\beta=4/25>0$ なので $x$ を増やせば予測方位は局所的に増加します。
<!-- solution-end -->

<a id="ex-u2-08-a05"></a>

**A5. 雑音共分散の単位**

- Level: A

距離誤差の標準偏差を $0.3$ m、方位誤差の標準偏差を $0.2$ rad とし、二成分の相関が0であるとする。$R$ を書き、対角成分の単位を述べよ。

<!-- solution-start -->
**詳細解答**：[雑音模型](#def-u2-08-noisy-observation)では分散は標準偏差の二乗です。$0.3^2=0.09$ m²、$0.2^2=0.04$ rad² です。相関が0なので共分散は0、ゆえに $R=\operatorname{diag}(0.09,0.04)$ です。両分散が正なので $R\succ0$ です。距離と角度の次元を無視して同じ単位とは書きません。
<!-- solution-end -->

### Level B：微分、観測不能性、誤差の波及

<a id="ex-u2-08-b01"></a>

**B1. 位置と向きの微分を導く**

- Level: B

目印 $m=(a,b)$、姿勢 $(x,y,\theta)$ に対し $q=(a-x)^2+(b-y)^2>0$ とする。$r=\sqrt q$、$\beta=\operatorname{atan2}(b-y,a-x)-\theta$ の局所枝から、$H$ の六成分を微分で導け。

<!-- solution-start -->
**詳細解答**：$d_x=a-x,d_y=b-y$ と置きます。$dq/dx=-2d_x$、$dq/dy=-2d_y$ より $\partial_xr=(1/(2\sqrt q))(-2d_x)=-d_x/r$、$\partial_yr=-d_y/r$、$\partial_\theta r=0$。一方 $\alpha=\operatorname{atan2}(d_y,d_x)$ の全微分は $d\alpha=(d_x\,dd_y-d_y\,dd_x)/q$ です。$dd_x=-dx,dd_y=-dy$ を代入すると $d\beta=(d_y/q)dx-(d_x/q)dy-d\theta$。よって $\partial_x\beta=d_y/q$、$\partial_y\beta=-d_x/q$、$\partial_\theta\beta=-1$ を得ます。六成分を順に並べた結果は[観測 Jacobi 行列](#prop-u2-08-observation-jacobian)と一致します。wrap の切替点は除外した導出です。
<!-- solution-end -->

<a id="ex-u2-08-b02"></a>

**B2. 一つの目印だけで区別できない運動**

- Level: B

姿勢 $(0,0,0)$、目印 $m=(3,4)$ m で $v=(4,-3,1)^T$ が一次零方向であることを行列積から確かめよ。また姿勢を目印の周りに微小回転させる説明と結び付けよ。

<!-- solution-start -->
**詳細解答**：[Jacobi 行列](#prop-u2-08-observation-jacobian)は $H=\left(\begin{smallmatrix}-3/5&-4/5&0\\4/25&-3/25&-1\end{smallmatrix}\right)$ です。第一行との積は $(-3/5)4+(-4/5)(-3)=-12/5+12/5=0$、第二行との積は $(4/25)4+(-3/25)(-3)-1=16/25+9/25-1=0$。よって $Hv=0$。[一つの目印の零方向](#prop-u2-08-one-landmark-null)の一般式 $(d_y,-d_x,1)$ に $(d_x,d_y)=(3,4)$ を入れたものです。ロボットを目印中心に角度 $\gamma$ だけ回して、車体向きにも $\gamma$ を加えると、目印までの距離と相対方位は変わりません。その $\gamma=0$ で微分して得る変化ベクトルが $v$ です。
<!-- solution-end -->

<a id="ex-u2-08-b03"></a>

**B3. 二つの目印は何を増やすか**

- Level: B

同じ姿勢から異なる二つの既知目印 $m_1,m_2$（ともに距離が正）を観測した。$u=(\delta x,\delta y,\delta\theta)$ が両方の Jacobi 行列の零方向に属するなら $u=0$ を証明せよ。二つが同じ位置だった場合も論ぜよ。

<!-- solution-start -->
**詳細解答**：[一つのランドマークの零方向](#prop-u2-08-one-landmark-null)より各 $i$ について $u=t_i(d_{iy},-d_{ix},1)$ です。第三成分が共通なので $t_1=t_2=\delta\theta$。従って $\delta\theta(d_{1y}-d_{2y})=0$ と $\delta\theta(d_{1x}-d_{2x})=0$ が必要です。二つの目印が異なれば変位ベクトル $d_1,d_2$ が異なるので $\delta\theta=0$、さらに $\delta x=\delta y=0$。よって[相異なる二つの既知ランドマーク](#prop-u2-08-two-landmarks-rank)どおり階数3です。同位置なら $d_1=d_2$、二つの $H$ は同一となり、零方向が残ります。測定を二度数えたことは新しい幾何情報とは異なります。
<!-- solution-end -->

<a id="ex-u2-08-b04"></a>

**B4. innovation 共分散を展開する**

- Level: B

$\bar g=(0,0,0)$、$m=(3,4)$ m、姿勢誤差共分散 $P^-=\operatorname{diag}(0.04,0.04,0.01)$、独立な観測雑音共分散 $R=\operatorname{diag}(0.01,0.0025)$ とする。予測点での局所 $S$ を計算し、交差項が0になる理由を述べよ。

<!-- solution-start -->
**詳細解答**：予測点の[Jacobi 行列](#prop-u2-08-observation-jacobian)は $H=\left(\begin{smallmatrix}-0.6&-0.8&0\\0.16&-0.12&-1\end{smallmatrix}\right)$。行ごとに $P^-$ を掛けて

$$
HP^-=\begin{pmatrix}-0.024&-0.032&0\\0.0064&-0.0048&-0.01\end{pmatrix}
$$

を得ます。これと $H^T$ の積では $(1,1)$ 成分が $0.0144+0.0256=0.04$、$(2,2)$ 成分が $0.001024+0.000576+0.01=0.0116$。$(1,2)$ は $-0.024(0.16)+(-0.032)(-0.12)=-0.00384+0.00384=0$ です。[局所一次共分散](#prop-u2-08-innovation-covariance)により $R$ を加えて

$$
S=\begin{pmatrix}0.04+0.01&0\\0&0.0116+0.0025\end{pmatrix}
=\begin{pmatrix}0.05&0\\0&0.0141\end{pmatrix}.
$$

交差項の相殺は位置の事前分散が等しく、距離方向と接線方向の微分が直交するためです。相関のない観測誤差を足しただけでは交差項は増えません。
<!-- solution-end -->

### Level C：一つの目印と二つの目印、観測の限界

<a id="ex-u2-08-c01"></a>

**C1. 既知地図のランドマークを観測する**

- Level: C

世界姿勢の予測平均を $\bar g=(0,0,0)$、既知目印を $m_1=(3,4)$ m とする。事前の局所誤差共分散は $P^-=\operatorname{diag}(0.04,0.04,0.01)$、距離・方位雑音は状態と独立で $R=\operatorname{diag}(0.01,0.0025)$ とする。角度誤差は小さく、連続した局所枝を使えるとする。観測値は $z=(5.2,\operatorname{atan2}(4,3)+0.1)$（m, rad）であった。

1. $h(\bar g,m_1)$ と innovation を求めよ。
2. 予測点の $H$ と局所一次 $S$ を求めよ。
3. $S$ を使い $\nu^TS^{-1}\nu$ を計算せよ。ただし、この値だけから確率的な外れ値判定を断言しないこと。
4. 一つの目印では不可観測な非零方向を求めよ。
5. $m_2=(5,4)$ m を独立に区別できる既知目印として追加すると、局所一次の零方向がなくなることを説明せよ。逆に $m_2=m_1$ だった場合と、誤対応が発生した場合の違いも述べよ。

<!-- solution-start -->
**詳細解答**：

**(1)** [予測観測](#def-u2-08-range-bearing)では $d_1=(3,4)$、$q_1=25$、予測距離 $r=5$ m、方位 $\beta=\operatorname{atan2}(4,3)$ です。観測距離との差は $5.2-5=0.2$ m、観測方位との差は $0.1$ rad で $[-\pi,\pi)$ にあります。よって[innovation](#def-u2-08-innovation)は $\nu=(0.2,0.1)^T$ です。

**(2)** $r=5,q=25$ を[Jacobi 行列](#prop-u2-08-observation-jacobian)に代入して

$$
H=\begin{pmatrix}-3/5&-4/5&0\\4/25&-3/25&-1\end{pmatrix}.
$$

まず $HP^-=\left(\begin{smallmatrix}-0.024&-0.032&0\\0.0064&-0.0048&-0.01\end{smallmatrix}\right)$。これに $H^T$ を掛けると、距離分散 $0.04$、距離・方位の交差分散 $0$、方位分散 $0.0016+0.01=0.0116$。状態誤差と観測雑音の独立性を用い、[局所一次 innovation 共分散](#prop-u2-08-innovation-covariance)より

$$
S=HP^-H^T+R=\operatorname{diag}(0.05,0.0141).
$$

**(3)** $S$ は正定値なので逆行列は $S^{-1}=\operatorname{diag}(20,1/0.0141)$。従って

$$
\nu^TS^{-1}\nu
=\frac{0.2^2}{0.05}+\frac{0.1^2}{0.0141}
=0.8+\frac{100}{141}
\approx1.50922.
$$

この数値は残差の局所的な大きさを示しますが、外れ値である確率や採否は分布・閾値・データ対応の仮定なしには決まりません。

**(4)** [零方向命題](#prop-u2-08-one-landmark-null)から $(d_{1y},-d_{1x},1)=(4,-3,1)$ は非零の零方向です。実際 $H(4,-3,1)^T=0$ です。姿勢三成分の微小差を一目印の二値だけでは特定できません。

**(5)** 二つ目の目印は $d_2=(5,4)\ne d_1$、$q_2=41>0$ です。各目印の零方向はそれぞれ $(4,-3,1)$ と $(4,-5,1)$ が張ります。共通ベクトルが $t(4,-3,1)=s(4,-5,1)$ なら第三成分から $t=s$、第二成分から $-3t=-5t$、ゆえに $t=s=0$。従って[二目印の階数命題](#prop-u2-08-two-landmarks-rank)の条件を満たします。同じ位置なら二つの零方向が重なり、列階数は2のままです。異なる位置でも誤って $m_2$ の観測を $m_1$ に対応させれば、そもそも $H$ と予測値の対応が違うため、正しい姿勢を示す観測とは限らず、この階数の議論だけでは更新の信頼性は保証されません。
<!-- solution-end -->

## 8. この講義で身につけたこと

既知の目印 $m$ に対する相対測距・方位は、姿勢と世界座標の差から計算します。姿勢に対する局所 Jacobi 行列は $2\times3$ であり、向きの偏微分 $-1$ と位置差の符号が重要です。一つの既知目印には一つの見えない姿勢方向が残りますが、異なる二つの既知目印を見れば局所的には区別できます。角度残差は必ず wrap し、$q=0$、切替点、大雑音、外れ値、誤対応、観測相関を公式の適用条件と照合します。

次講 **U2-09** では、この非線形観測を予測姿勢の周りで一次近似し、拡張 Kalman フィルタの更新へ結び付けます。
