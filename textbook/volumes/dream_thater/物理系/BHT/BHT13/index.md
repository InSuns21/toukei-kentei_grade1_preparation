# BHT13 重力作用と境界値問題

<!-- definition-example-audit: strict -->

[BHT12のEuclid正則周期](../BHT12/index.md#thm-bht12-nonextremal-period)により、非極限の静的地平線を滑らかな円板の中心にするには、Euclid時間の周期が決まると分かりました。では、この滑らかな幾何を**熱力学的な重力の状態**として比較するとき、何を固定して作用を変分するのでしょうか。

[GR11のGHY境界項](../../GR/GR11/index.md#def-gr11-ghy-action)はLorentz領域で計量の法線微分を相殺しました。しかし、Euclid化した作用はLorentzの作用をそのまま符号だけ読み替える記号操作では済みません。時間円周の**固有長**、壁の誘導計量、外向き法線、参照背景の境界をそろえなければ、作用の差に熱力学的な意味を与えられないからです。

本章ではEuclid重力の境界値問題を、具体的な球対称壁で最後まで確かめます。次のBHT14では、ここで固定した作用をSchwarzschildの滑らかなサドル上で評価し、自由エネルギーへ進みます。

以下は原則として4次元、Lorentz計量符号 $(-,+,+,+)$、$c=\hbar=k_B=1$ とし、重力定数 $G>0$ は係数の検算のため残します。Euclid計量 $g$ は正定値、体積要素を $\sqrt g\,d^4x$、境界上の計量を $h$、体積要素を $\sqrt h\,d^3y$ と書きます。曲率は[GR6の曲率規約](../../GR/GR6/index.md#def-gr6-ricci-scalar)を引き継ぎます。

## 1. 作用の積分だけでは、境界で停留しない

### 1.1 Euclid化の符号と必要な境界項

まず時間に依存しないSchwarzschild型計量

$$
ds_L^2=-f(r)dt^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2
$$

を考えます。$f>0$ の静的領域で $t=-i\tau$ と置いた計量は $ds_E^2=f\,d\tau^2+f^{-1}dr^2+r^2d\Omega_2^2$ です。これは正定値の**実計量を指定する例**であって、任意の時間依存Lorentz計量に実のEuclid解が存在するという主張ではありません。

Euclid作用を熱的重み $e^{-I_E}$ に使う符号規約で定めます。滑らかなコンパクトEuclid領域 $U$ の境界 $B=\partial U$ は滑らかで角がなく、外向き単位法線 $n$ を持つとします。法線の長さは $g(n,n)=+1$ です。境界への接ベクトル $e_i$ を使い、[GR11の誘導計量と第二基本形式](../../GR/GR11/index.md#def-gr11-extrinsic-curvature)のEuclid版を

$$
h_{ij}=g(e_i,e_j),\qquad
K_{ij}=e_i{}^ae_j{}^b\nabla_an_b,
\qquad K=h^{ij}K_{ij}
$$

とします。$i,j=1,2,3$ で、$K$ は第二基本形式の**跡**です。外向き法線を逆転すると $K$ の符号も変わるため、以下では常に領域から外向きとします。

<a id="def-bht13-euclidean-action"></a>

<!-- formal-statement-start -->
> **定義（Euclid Einstein–Hilbert–GHY作用）**  
> 4次元の向き付け可能な滑らかなコンパクトRiemann領域 $(U,g)$ に滑らかな角のない境界 $B$ があるとする。外向き単位法線、誘導計量 $h$ と第二基本形式の跡 $K$ は上記の規約で定める。宇宙定数 $\Lambda\in\mathbb R$、$G>0$ に対して、重力のEuclid Dirichlet作用を

$$
\boxed{I_E^{\mathrm{grav}}[g]
=-\frac1{16\pi G}\int_U(R[g]-2\Lambda)\sqrt g\,d^4x
-\frac1{8\pi G}\int_BK\sqrt h\,d^3y}
$$

> と定義する。第一積分をEinstein–Hilbert（EH）項、第二積分をGibbons–Hawking–York（GHY）項とする。非コンパクト領域では外側を有限位置で切ってから極限を扱い、必要な背景差引きまたは境界反項を別に指定する。物質場があれば、その作用と必要な境界項を追加する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht13-euclidean-action -->
**定義の確認**（平坦な4次元球）：半径 $L>0$ のEuclid球 $U=\{r\le L\}\subset\mathbb R^4$ に

$$
ds_E^2=dr^2+r^2d\Omega_3^2,\qquad\Lambda=0
$$

を与えます。平坦なので $R[g]=0$ です。境界は半径 $L$ の3球で、外向き単位法線は $n=\partial_r$ です。

球面の接座標を $y^i$ とし、$\bar h_{ij}$ を単位3球の計量成分とします。この座標では

$$
g_{rr}=1,\qquad g_{ri}=0,\qquad n_r=1
$$

なので、[第二基本形式](../../GR/GR11/index.md#def-gr11-extrinsic-curvature)の定義と接続係数から

$$
\Gamma^r_{ij}=-\frac12\partial_rh_{ij},\qquad
K_{ij}=\nabla_i n_j=-\Gamma^r_{ij}n_r
=\frac12\partial_rh_{ij}
$$

が従います。境界上で $h_{ij}=L^2\bar h_{ij}$ として評価すると

$$
K_{ij}=\frac12\partial_r(r^2\bar h_{ij})\big|_{r=L}
=L\bar h_{ij}=\frac1Lh_{ij},\quad K=\frac3L.
$$

境界面積が $2\pi^2L^3$ だから、GHY項を含めると

$$
I_E^{\mathrm{grav}}=-\frac1{8\pi G}\frac3L(2\pi^2L^3)
=-\frac{3\pi L^2}{4G}.
$$

平坦だから作用が零とは限りません。**境界を指定するかどうか**で作用の値が変わることを直接確認できました。この球は熱的なSchwarzschildサドルの例ではなく、係数と向きを検算する幾何例です。
<!-- definition-example-end -->

### 1.2 固定するのは境界の距離である

GHY項が必要になる理由は、EH作用が曲率を含み、曲率が計量の**二階微分**を含むことです。[GR11の境界流束の命題](../../GR/GR11/index.md#prop-gr11-boundary-flux)が示したように、境界上で計量の値を固定しても、法線方向の一階微分の変分は残り得ます。

「何を固定するか」を明示するため、境界の位置と微分可能構造を同一視し、そこで測る距離をすべて固定する条件を導入します。

<a id="def-bht13-dirichlet-data"></a>

<!-- formal-statement-start -->
> **定義（境界計量のDirichlet条件）**  
> 滑らかな固定境界 $B=\partial U$ 上に正定値計量 $h^{(0)}$ を与える。境界に接するすべてのベクトルに対して誘導計量が $h^{(0)}$ に一致する計量 $g$ の集合を境界値問題の候補とする。許される滑らかな変分 $g_s$ は

$$
h_{ij}[g_s]|_B=h^{(0)}_{ij},\qquad
\delta h_{ij}|_B=\left.\frac d{ds}h_{ij}[g_s]\right|_{s=0}=0
$$

> を満たす。$K_{ij}$ や $\nabla_nh_{ij}$ は別途固定しない。境界の位相・同一視、付加する物質場の境界データは別に指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht13-dirichlet-data -->
**定義の確認**（値が零でも微分は零とは限らない）：境界近傍に外向き固有法線座標 $z$ を取り、$B$ を $z=0$ とします。正定値の一定行列 $c_{ij}$ を用い、十分小さい $s,z$ で

$$
ds_s^2=dz^2+(1+sz)c_{ij}\,dy^i dy^j
$$

とします。境界では $h_{ij}(0,s)=c_{ij}$ なので $\delta h_{ij}|_{z=0}=0$ ですが、

$$
K_{ij}(0,s)=\frac12\partial_zh_{ij}(0,s)=\frac s2c_{ij},\qquad
\delta K_{ij}=\frac12c_{ij}\ne0.
$$

正定値性は $|sz|<1$ で保証されます。よって固定境界計量は、法線微分を固定する条件ではありません。
<!-- definition-example-end -->

## 2. GHY項が法線微分をどう消すか

<a id="thm-bht13-euclidean-dirichlet"></a>

<!-- formal-statement-start -->
> **定理（Euclid GHY項を含むDirichlet変分）**  
> $(U,g)$ は滑らかなコンパクト4次元Riemann領域、$B=\partial U$ は滑らかで角がなく、$n$ は外向き単位法線とする。計量変分は十分滑らかで境界を固定し、$q_{ij}=\delta h_{ij}$ と書く。宇宙定数 $\Lambda$ と $G>0$ を固定した[Euclid重力作用](#def-bht13-euclidean-action)について

$$
\boxed{\begin{aligned}
\delta I_E^{\mathrm{grav}}
={}&-\frac1{16\pi G}\int_U
(G_{ab}+\Lambda g_{ab})\,\delta g^{ab}\sqrt g\,d^4x\\
&+\frac1{16\pi G}\int_B(K^{ij}-Kh^{ij})q_{ij}\sqrt h\,d^3y.
\end{aligned}}
$$

> 従って[境界Dirichlet条件](#def-bht13-dirichlet-data) $q_{ij}=0$ のもとで、内部の任意の変分に対する停留条件は真空Einstein方程式 $G_{ab}+\Lambda g_{ab}=0$ である。境界の法線微分 $\partial_n q_{ij}$ を零にする仮定は不要である。角・稜線、光的なLorentz境界、物質場、非コンパクト極限をこの式だけで処理したことにはならない。
<!-- formal-statement-end -->

### 証明の見取り図

Euclid領域では法線は常に空間的です。[GR11のLorentz版のDirichlet変分](../../GR/GR11/index.md#thm-gr11-dirichlet-variation)と同じ局所幾何の計算を正定値計量で行います。ただし作用全体をEuclidの負符号で定めたので、最終的な境界係数の符号を取り違えないよう、独立変数を $h_{ij}$ に統一して確かめます。

<!-- proof-start -->
### 証明

境界近傍に $z=0$ を境界、$z$ を外向き固有法線距離とする局所座標を取り、$g=dz^2+h_{ij}(z,y)dy^i dy^j$ とします。ここで $n=\partial_z$、$K_{ij}=\frac12\partial_zh_{ij}$ です。変分時には境界を固定する微分同相でGaussian法線形にそろえられ、その境界上の $q_{ij}$ を変えません。

まず[GR10のEH変分公式](../../GR/GR10/index.md#thm-gr10-eh-variation)の正定値版は、内部のEinsteinテンソルと境界流束を分離します。全作用の負符号のため、内部項は上式の負号です。境界の**法線微分の係数**を直接見るため、$\delta K$ を展開します。$K=h^{ij}K_{ij}$ と $\delta h^{ij}=-h^{ik}h^{j\ell}q_{k\ell}$ より

$$
\begin{aligned}
\delta K&=\delta h^{ij}K_{ij}+h^{ij}\delta K_{ij}
=-K^{ij}q_{ij}+\frac12h^{ij}\partial_zq_{ij},\\
\delta\sqrt h&=\frac12\sqrt h\,h^{ij}q_{ij},\\
\delta(\sqrt h K)&=\sqrt h\left[
\left(\frac12Kh^{ij}-K^{ij}\right)q_{ij}
+\frac12h^{ij}\partial_zq_{ij}\right].
\end{aligned}
$$

したがってGHY項の法線微分部分は

$$
\delta I_{\mathrm{GHY}}\big|_{\partial_zq}
=-\frac1{16\pi G}\int_B\sqrt h\,h^{ij}\partial_zq_{ij}\,d^3y.
$$

一方、[GR10のEH変分公式](../../GR/GR10/index.md#thm-gr10-eh-variation)で使う逆計量変分を $v^{ab}=\delta g^{ab}$、その跡を $v=g_{ab}v^{ab}$ と書きます。このときEH項の境界流束は

$$
V^a=\nabla^av-\nabla_bv^{ab}
$$

です。$q^{ij}:=h^{ik}h^{j\ell}q_{k\ell}$ と添字を上げ、$q:=h^{ij}q_{ij}$ と略記します。Gaussian法線形を保つ変分では

$$
v^{zz}=v^{zi}=0,\qquad v^{ij}=-q^{ij},\qquad v=-q
$$

です。さらに $\Gamma^z_{ij}=-K_{ij}$ と $\partial_zh^{ij}=-2K^{ij}$ を使い、法線成分を一段ずつ計算すると

$$
\begin{aligned}
\nabla_bv^{zb}&=\Gamma^z_{ij}v^{ij}=K^{ij}q_{ij},\\
\partial_zq&=\partial_z(h^{ij}q_{ij})
=-2K^{ij}q_{ij}+h^{ij}\partial_zq_{ij},\\
V^z&=-\partial_zq-K^{ij}q_{ij}
=-h^{ij}\partial_zq_{ij}+K^{ij}q_{ij}.
\end{aligned}
$$

Euclid EH項の係数は $-1/(16\pi G)$ なので、境界流束全体は

$$
\delta I_{\mathrm{EH}}\big|_B
=\frac1{16\pi G}\int_B\sqrt h\,
\left(h^{ij}\partial_zq_{ij}-K^{ij}q_{ij}\right)d^3y
$$

です。このうち $h^{ij}\partial_zq_{ij}$ はGHY項の法線微分部分と正負が反対で相殺します。残る $q_{ij}$ の係数も、先ほど求めたGHY変分の係数と合わせれば

$$
\begin{aligned}
&-K^{ij}q_{ij}
-\left(Kh^{ij}-2K^{ij}\right)q_{ij}\\
&=\left(K^{ij}-Kh^{ij}\right)q_{ij}
\end{aligned}
$$

と得られます。境界の接方向の全微分は角のない閉じた境界上で積分すると消え、この計算は[GR11のDirichlet変分](../../GR/GR11/index.md#thm-gr11-dirichlet-variation)の正定値版とも一致します。逆計量 $u^{ij}=\delta h^{ij}$ を独立に取れば境界項は $-(K_{ij}-Kh_{ij})u^{ij}/(16\pi G)$ です。$q_{ij}$ と $u^{ij}$ の符号が反対であることも確認できました。

以上で主張した式を得ます。$q_{ij}=0$ なら境界積分は零です。内部に台を持つ任意の $\delta g^{ab}$ に対する停留性から、基本補題により $G_{ab}+\Lambda g_{ab}=0$ です。
<!-- proof-end -->

**別の係数検算。** 第1節の平坦4球の半径を $L\mapsto L+\delta L$ と動かすと、作用から $\delta I_E=-3\pi L\delta L/(2G)$ です。他方、境界で $K^{ij}-Kh^{ij}=-2h^{ij}/L$、$q_{ij}=(2\delta L/L)h_{ij}$ なので

$$
\frac1{16\pi G}\int_{S_L^3}\sqrt h\left(-\frac2Lh^{ij}\right)
\left(\frac{2\delta L}Lh_{ij}\right)
=-\frac{12\delta L}{16\pi GL^2}(2\pi^2L^3)
=-\frac{3\pi L\delta L}{2G}.
$$

この計算では**境界計量を動かしている**のでDirichlet条件そのものは満たしません。だからこそ、定理の境界係数を独立に検算できます。

## 3. 熱的な壁を置くと、固定する周期はどれか

### 3.1 球対称境界の法線を具体的に作る

静的な計量を形式的にEuclid化し、$r_h<r\le R$ の領域と滑らかな非極限の地平線端を考えます。地平線端は[BHT12の正則周期](../BHT12/index.md#thm-bht12-nonextremal-period)が成り立つなら、座標上の $r=r_h$ を通常の**内側の境界**として別にGHY積分する必要はありません。そこは滑らかな内部の円板中心です。外側の壁 $B_R$ だけが境界として残ります。

$$
ds_E^2=f(r)d\tau^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2,
\qquad f(R)>0,\quad\tau\sim\tau+\beta.
$$

壁の座標 $(\tau,\theta,\phi)$ で $h_{\tau\tau}=f(R)$、$h_{\theta\theta}=R^2$、$h_{\phi\phi}=R^2\sin^2\theta$ です。$g_{rr}=f^{-1}$ なので、$n=\sqrt{f(R)}\,\partial_r$ は外向きかつ単位長です。このデータを第二基本形式へ代入します。

<a id="prop-bht13-static-wall"></a>

<!-- formal-statement-start -->
> **命題（静的球対称壁の誘導計量と外部曲率）**  
> 次の滑らかな正定値計量を、$r_h<r\le R$、$f(R)>0$、周期 $\beta>0$ の領域に与える。

$$
ds_E^2=f(r)d\tau^2+f(r)^{-1}dr^2+r^2d\Omega_2^2.
$$

> 外側境界 $r=R$ の外向き法線、誘導計量、平均曲率の跡と固有Euclid周期は

$$
\boxed{\begin{gathered}
n=\sqrt{f(R)}\,\partial_r,\qquad
h=f(R)d\tau^2+R^2d\Omega_2^2,\\
K=\frac{f'(R)}{2\sqrt{f(R)}}+\frac{2\sqrt{f(R)}}R,\qquad
\beta_{\mathrm{wall}}=\beta\sqrt{f(R)}.
\end{gathered}}
$$

> $β_{\mathrm{wall}}$ は壁の時間円周の固有長であり、$\tau$ の座標周期 $\beta$ と一般に異なる。内側の地平線まで含む滑らかな正則計量を考えるなら、その内側で別に[BHT12の条件](../BHT12/index.md#thm-bht12-nonextremal-period)を満たす必要がある。
<!-- formal-statement-end -->

### 証明の見取り図

[GR11の第二基本形式の定義](../../GR/GR11/index.md#def-gr11-extrinsic-curvature)を壁の接方向へ制限します。座標を分けて三つの固有値を出すと、$K$ の二つの寄与がどこから来るか分かります。

<!-- proof-start -->
### 証明

$n=\sqrt f\,\partial_r$ なので、$g(n,n)=f^{-1}(\sqrt f)^2=1$ です。壁の接成分には $g_{ri}=0$ があり、Lie微分による第二基本形式の表示 $K_{ij}=\frac12\mathcal L_n h_{ij}$ は

$$
K_{\tau\tau}=\frac{\sqrt f}{2}f',\quad
K_{\theta\theta}=R\sqrt f,\quad
K_{\phi\phi}=R\sqrt f\sin^2\theta
$$

を与えます。右辺の $f,f'$ は $R$ で評価します。$h^{ij}=\operatorname{diag}(1/f,1/R^2,1/(R^2\sin^2\theta))$ で縮約すると

$$
\begin{aligned}
K&=h^{\tau\tau}K_{\tau\tau}
+h^{\theta\theta}K_{\theta\theta}
+h^{\phi\phi}K_{\phi\phi}\\
&=\frac{f'}{2\sqrt f}+\frac{\sqrt f}R+\frac{\sqrt f}R.
\end{aligned}
$$

時間方向で $d\theta=d\phi=0$ として一周すると

$$
\beta_{\mathrm{wall}}=\int_0^\beta\sqrt{h_{\tau\tau}}\,d\tau
=\beta\sqrt{f(R)}.
$$

以上で式を得ます。
<!-- proof-end -->

**直接例：$R=4M$ のSchwarzschild。** $G=1$、$M>0$、$f(r)=1-2M/r$ とすると、$f(4M)=1/2$、$f'(4M)=1/(8M)$ です。[Schwarzschildの正則周期](../BHT12/index.md#prop-bht12-static-examples)は $\beta=8\pi M$。従って

$$
\begin{aligned}
\beta_{\mathrm{wall}}&=4\sqrt2\pi M,\\
K(4M)&=\frac{1/(8M)}{2/\sqrt2}
+\frac{2/\sqrt2}{4M}
=\frac{5}{8\sqrt2M},\\
\sqrt h&=\frac1{\sqrt2}(4M)^2\sin\theta
=8\sqrt2M^2\sin\theta.
\end{aligned}
$$

$K$ の第1項を落とすと時間方向の曲率を失います。壁の座標周期を同じ $8\pi M$ に設定した別の背景でも、$f(R)$ が異なれば境界計量は一致しません。

## 4. 無限遠で発散する作用をどう比較するか

### 4.1 同じ境界計量をもつ参照背景

有限の壁を外へ動かすと、GHY積分は面積に比例して発散することがあります。絶対値を引き算するには、「同じ入れ物で異なる幾何を比較する」という条件が必要です。比較する二つの幾何の壁の計量が等長でなければ、同じ境界値問題の作用差にはなりません。

<a id="def-bht13-matched-subtraction"></a>

<!-- formal-statement-start -->
> **定義（一致境界での背景差引き）**  
> 同じ指定された境界計量 $h^{(0)}$ を誘導する二つの滑らかなEuclid幾何 $(U,g)$ と $(U_0,g_0)$ を比較する。両者の境界は固定された等長写像で同一視し、外向きGHY項とバルク作用をそれぞれ含めた相対作用を

$$
I_E^{\mathrm{rel}}[g;g_0]
=I_E^{\mathrm{grav}}[g]-I_E^{\mathrm{grav}}[g_0]
$$

> とする。切断面 $B_R$ を用いる非コンパクト領域では、各有限 $R$ で誘導計量を合わせてから差を取り、存在するなら $R\to\infty$ 極限を取る。参照幾何・境界データの選択は相対作用の定義の一部であり、異なる境界条件の作用を無条件に引かない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht13-matched-subtraction -->
**定義の確認**（時間円周を合わせる）：壁のSchwarzschild側で $h=f(R)d\tau^2+R^2d\Omega_2^2$、$\tau\sim\tau+\beta$ とします。参照する平坦幾何は

$$
ds_0^2=d\tau_0^2+dr^2+r^2d\Omega_2^2,
\qquad \tau_0\sim\tau_0+\beta_0.
$$

同じ周期1の角座標 $u=\tau/\beta=\tau_0/\beta_0$ で境界を表すと、二つの計量はそれぞれ

$$
h=\beta^2f(R)du^2+R^2d\Omega_2^2,\qquad
h_0=\beta_0^2du^2+R^2d\Omega_2^2.
$$

したがって境界計量が一致する条件は $\beta_0=\beta\sqrt{f(R)}$（正の周期）です。単に $\beta_0=\beta$ とするのは $f(R)\ne1$ で誤りです。
<!-- definition-example-end -->

### 4.2 背景差引きの具体的な式

<a id="prop-bht13-schwarzschild-reference"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild壁と平坦参照背景の整合）**  
> $G>0,M>0,R>2GM$ とし、4次元Euclid Schwarzschildの $f(r)=1-2GM/r$、正則な時間周期 $\beta=8\pi GM$ を採る。$B_R$ の誘導計量に等長な平坦参照壁を、時間周期 $\beta_0=\beta\sqrt{f(R)}$ で与える。参照壁の外向き第二基本形式の跡は $K_0=2/R$ である。両者の境界GHY項の差は

$$
\boxed{\begin{aligned}
\int_{B_R}\sqrt h\,(K-K_0)\,d^3y
&=4\pi\beta\left[\frac{R^2f'(R)}2+2Rf(R)-2R\sqrt{f(R)}\right]\\
&=-4\pi\beta GM+O(R^{-1})\quad(R\to\infty).
\end{aligned}}
$$

> ここでは両者の壁を同一視して $\sqrt h$ を共通に取っている。$R\to\infty$ の差は有限だが、有限な作用差の絶対的な零点は参照背景の選択に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

[壁の外部曲率の公式](#prop-bht13-static-wall)をそれぞれの計量に適用します。平坦参照側でも**時間円周の長さを一致**させているため、二つの別々の境界積分を同じ $\sqrt h$ で引けます。

<!-- proof-start -->
### 証明

Schwarzschild側では[静的球対称壁の誘導計量と外部曲率](#prop-bht13-static-wall)より

$$
K=\frac{f'}{2\sqrt f}+\frac{2\sqrt f}R,
\qquad\sqrt h=\sqrt f\,R^2\sin\theta.
$$

参照平坦側は $f_0=1$ なので $K_0=0+2/R$ です。$\tau$ の周期を $\beta$、$\tau_0$ の周期を $\beta_0=\beta\sqrt f$ として積分すると

$$
\begin{aligned}
\int_{B_R}K\sqrt h\,d^3y
&=4\pi\beta\left(\frac{R^2f'}2+2Rf\right),\\
\int_{B_R}^{(0)}K_0\sqrt{h_0}\,d^3y
&=4\pi\beta_0\frac2R R^2
=4\pi\beta(2R\sqrt f).
\end{aligned}
$$

差を取れば第一式です。$x=GM/R\to0$ として $\sqrt{1-2x}=1-x-x^2/2+O(x^3)$ を代入すると

$$
\begin{aligned}
\frac{R^2f'}2&=GM,\\
2Rf&=2R-4GM,\\
2R\sqrt f&=2R-2GM-\frac{G^2M^2}R+O(R^{-2}).
\end{aligned}
$$

よって角括弧は $-GM+G^2M^2/R+O(R^{-2})$ で、主張した有限極限を得ます。
<!-- proof-end -->

この例では $\Lambda=0$ でバルクのスカラー曲率は零ですから、滑らかな計量の作用は外側GHY差で評価できます。**どの境界でどの熱力学ポテンシャルになるか**は次講で、作用の温度依存性を含めて考えます。ここでの背景差引きはすべての重力解に適用できる万能な繰り込みではありません。

### 4.3 参照背景と局所反項は違う

漸近AdSのように負の宇宙定数を持つ非コンパクト時空では、適切な参照幾何が同じ境界データ・位相で用意できるとは限りません。また純粋な差引きだけでは、一般の境界計量の族について有限な変分が得られるとも限りません。

この場合は境界の誘導計量・その内在曲率などから作る局所的な**反項** $I_{\mathrm{ct}}[h]$ を作用へ加える方法があります。固定 $h$ での変分は $\delta I_{\mathrm{ct}}[h]=0$ なので、Dirichlet停留条件を壊しません。一方、境界計量を動かすとその変分は境界応力テンソルに寄与します。係数は時空次元、宇宙定数、境界条件で変わり、すべての背景へ同じ反項を置くことはできません。BHT16でAdSの具体的な作用差を扱います。

**反例となる操作**：Schwarzschildの $f(R)<1$ に対し平坦背景の座標周期を $\beta_0=\beta$ として直接GHY値を引くと、参照壁の時間円周の固有長は $\beta$、元の壁では $\beta\sqrt{f(R)}$ です。二つの境界は等長でないため、[背景差引きの定義](#def-bht13-matched-subtraction)の仮定が破れています。両者の数値の差を取れても、同じDirichlet問題の比較ではありません。

## 5. 固定電位と固定電荷は同じ境界問題ではない

重力計量に加え、電磁場を結合する場合を見ます。熱的な重力境界条件を指定しても、電磁場について境界の**電位**を与えるか**流束（電荷に対応）**を与えるかは別の選択です。この区別が電荷・回転のアンサンブルを考えるBHT17への入口になります。

Euclid領域での実の $U(1)$ ゲージ場を $A=A_a dx^a$、曲率を $F_{ab}=\partial_aA_b-\partial_bA_a$ とします。まず電気的Lorentz解の解析接続とは切り離し、正定値計量上の実のMaxwell汎関数として考えます。定数 $g_{\mathrm{em}}^2>0$ は結合の規格化です。

<a id="def-bht13-maxwell-boundary"></a>

<!-- formal-statement-start -->
> **定義（Maxwell境界データとLegendre項）**  
> 滑らかなコンパクト4次元Euclid領域 $(U,g)$ と滑らかな境界 $B$ において、実の1形式 $A$ の作用、境界接成分 $A_i$ に共役な電束密度 $\Pi^i$ を

$$
I_M[A]=\frac1{4g_{\mathrm{em}}^2}\int_UF_{ab}F^{ab}\sqrt g\,d^4x,
\qquad
\Pi^i=\frac{\sqrt h}{g_{\mathrm{em}}^2}\,n_aF^{ai}
$$

> と定める。$A_i$ 固定をDirichlet（境界電位型）、$\Pi^i$ 固定を流束型の変分問題とする。後者で用いる境界Legendre項を

$$
I_{\mathrm{Leg}}=-\int_BA_i\Pi^i\,d^3y
$$

> とする。$\Pi^i$ は座標密度を含むため、積分でさらに $\sqrt h$ を掛けない。ゲージ条件・境界の大域的性質・電荷規格化は別途指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht13-maxwell-boundary -->
**定義の確認**（平坦な壁の一定電場）：境界近くで $ds^2=dz^2+d\tau^2+dy^2+dw^2$、境界 $z=0$、外向き法線 $n=\partial_z$ とし、$A_\tau=Ez$、他は零とします。$F_{z\tau}=E$、$\sqrt h=1$、$F^{z\tau}=E$ だから、$\Pi^\tau=E/g_{\mathrm{em}}^2$、残りは零です。$A_\tau|_B=0$ でも電束は零とは限らず、固定する対象が違うことを確認できます。この例は境界局所模型で、平坦コンパクト全域の電荷保存問題まで解いたものではありません。
<!-- definition-example-end -->

<a id="prop-bht13-maxwell-legendre"></a>

<!-- formal-statement-start -->
> **命題（Maxwell境界Legendre変換）**  
> 上記の滑らかなEuclid Maxwell場を固定した境界計量上で変分する。$I_M$ の変分は

$$
\delta I_M=-\frac1{g_{\mathrm{em}}^2}\int_U
(\nabla_aF^{ab})\delta A_b\sqrt g\,d^4x
+\int_B\Pi^i\delta A_i\,d^3y.
$$

> 従って $I_M$ は $\delta A_i=0$ に、$I_M+I_{\mathrm{Leg}}$ は $\delta\Pi^i=0$ に対する停留条件を与える。どちらも内部のMaxwell方程式 $\nabla_aF^{ab}=0$ をもたらすが、境界で固定するデータが異なる。
<!-- formal-statement-end -->

### 証明の見取り図

反対称性で $F_{ab}\delta F^{ab}$ を1階の微分へ集め、部分積分します。Legendre項の変分では、$\Pi\delta A$ が打ち消されて $-A\delta\Pi$ だけが残ります。

<!-- proof-start -->
### 証明

計量を固定しているので $\delta F_{ab}=\nabla_a\delta A_b-\nabla_b\delta A_a$、$\delta(F_{ab}F^{ab})=2F^{ab}\delta F_{ab}$ です。反対称性 $F^{ab}=-F^{ba}$ で二項をまとめると

$$
\begin{aligned}
\delta I_M
&=\frac1{2g_{\mathrm{em}}^2}\int_UF^{ab}
(\nabla_a\delta A_b-\nabla_b\delta A_a)\sqrt g\,d^4x\\
&=\frac1{g_{\mathrm{em}}^2}\int_UF^{ab}\nabla_a\delta A_b\sqrt g\,d^4x\\
&=-\frac1{g_{\mathrm{em}}^2}\int_U(\nabla_aF^{ab})\delta A_b\sqrt g\,d^4x
+\frac1{g_{\mathrm{em}}^2}\int_Bn_aF^{ai}\delta A_i\sqrt h\,d^3y.
\end{aligned}
$$

境界項は $\Pi^i\delta A_i$ です。一方

$$
\delta I_{\mathrm{Leg}}=-\int_B\left(\Pi^i\delta A_i+A_i\delta\Pi^i\right)d^3y.
$$

両式を加えると、$\Pi^i\delta A_i$ は打ち消され、$-\int_BA_i\delta\Pi^i d^3y$ のみが残ります。指定した境界変分でそれぞれ停留します。
<!-- proof-end -->

Lorentzの電場をEuclidへ解析接続すると、実の電位・実の電場という上記の仮定を保てず、Euclidの $A_\tau$ が純虚数となる規約もあります。したがってこの命題を、正則なRN電気解のEuclid作用の符号まで無条件に確定する公式として使いません。また円板中心で縮む時間円周に沿うゲージポテンシャルは、ゲージと正則性を検討する必要があります。電位差を物理量として読む段階はBHT17で整理します。

## 6. 境界条件から熱的アンサンブルへ

まとめると、同じバルク方程式を満たす幾何でも、作用を選ぶときには次の情報が必要です。

| 選ぶもの | 数学的な境界データ | 何を混同しないか |
| --- | --- | --- |
| 重力のDirichlet問題 | 境界の誘導計量 $h_{ij}$ | 時間座標周期だけの指定は固有周期・壁半径の指定ではない |
| 非極限地平線の正則性 | [円板中心の周期](../BHT12/index.md#thm-bht12-nonextremal-period) | 任意周期の円錐を滑らかなサドルと同一視しない |
| 漸近平坦な相対作用 | 同じ $h$ を持つ参照背景と外側の境界 | 別々の境界計量の作用値を引かない |
| AdSなどの漸近領域 | 指定した漸近境界データと適切な反項 | 平坦参照差引きの普遍性を仮定しない |
| Maxwellの電位型 | $A_i$ 固定 | 電束を勝手に同時固定しない |
| Maxwellの電荷型 | $\Pi^i$ 固定・Legendre項 | 同じ作用のままで境界条件だけを呼び替えない |

形式的なEuclid重力経路積分は、適切に境界条件を選んだ場の族について $Z\sim\int e^{-I_E}$ と記します。しかしこれは**定義された有限次元の確率積分ではありません**。計量上の測度、ゲージ固定、負モード、実のEuclid切断の存在、無限遠での収束、複数の位相の寄与などが別問題です。固定境界温度から正準アンサンブルを読むにも、少なくとも適切なサドルと重みの扱いが必要です。

特に次の三点は区別します。

1. **非極限の滑らかな円板**：時間円周の周期は正則性で選ばれ、$r=r_h$ は境界ではありません。
2. **誤った周期の円錐**：中心で曲率が分布的に寄与し得るため、滑らかな真空サドルの作用をそのまま代入できません。
3. **厳密な極限RNの無限のど**：[BHT11の極限順序](../BHT11/index.md#prop-bht11-euclidean-order)で示したように、有限距離の円板中心が失われます。非極限族の極限と、厳密な極限解の境界値問題を同一視しません。

さらに有限領域に角や稜線があるならGHY項だけでは角に局在する寄与が不足し得ます。今回は滑らかな外側境界と滑らかな円板中心に限定しました。次講では、このように**境界条件を固定した後**でSchwarzschildのon-shell作用と熱力学量を実際に計算します。

## 7. 演習――変分・壁・参照背景を紙上で確かめる

### Level A：境界データと基本係数

<a id="ex-bht13-a01"></a>

#### BHT13-A01 平坦な円筒壁とGHY項

- Level: A
- 問題: $G>0$、$\Lambda=0$、$U=S^1_\beta\times B_R^3$ の平坦計量 $ds^2=d\tau^2+dr^2+r^2d\Omega_2^2$ を考える。外側境界 $r=R$ の単位法線、$K$、面積密度とEuclid重力作用を求めよ。$r=0$ を境界として数えるべきかも説明せよ。

<!-- solution-start -->
**詳細解答**：$g_{rr}=1$ より外向き単位法線は $n=\partial_r$ です。境界計量は $h=d\tau^2+R^2d\Omega_2^2$。$K_{\tau\tau}=0$、$K_{\theta\theta}=R$、$K_{\phi\phi}=R\sin^2\theta$ なので

$$
K=0+\frac R{R^2}+\frac{R\sin^2\theta}{R^2\sin^2\theta}=\frac2R,
\qquad\sqrt h=R^2\sin\theta.
$$

平坦だから $R[g]=0$、$\Lambda=0$ でEH項は零です。したがって

$$
I_E=-\frac1{8\pi G}\int_0^\beta d\tau\int_{S^2}\frac2R R^2d\Omega_2
=-\frac1{8\pi G}\beta\frac2R(4\pi R^2)
=-\frac{\beta R}G.
$$

$r=0$ は3球の内部の滑らかな中心であり、新しい境界成分ではありません。
<!-- solution-end -->

<a id="ex-bht13-a02"></a>

#### BHT13-A02 境界計量固定と外部曲率の変分

- Level: A
- 問題: $ds_s^2=dz^2+(1+sz)c_{ij}dy^i dy^j$、$B=\{z=0\}$、$n=\partial_z$、$c$ は正定値の定数3次行列とする。$s=0$ で $q_{ij}=\delta h_{ij}$、$\delta K_{ij}$、$\delta K$ を求め、Dirichlet条件が $\delta K=0$ を意味しないことを示せ。

<!-- solution-start -->
**詳細解答**：$h_{ij}(0,s)=c_{ij}$ は $s$ に依存せず、$q_{ij}=\partial_sh_{ij}|_{s=0,z=0}=0$。一方、法線座標なので $K_{ij}=\frac12\partial_zh_{ij}=s c_{ij}/2$、従って $\delta K_{ij}=c_{ij}/2$ です。$s=0$ では $K_{ij}=0$ なので逆計量の変分による項は零で、

$$
\delta K=c^{ij}\delta K_{ij}=\frac12c^{ij}c_{ij}=\frac32.
$$

これは法線微分を固定しない[Dirichlet条件](#def-bht13-dirichlet-data)と整合します。GHY項が必要になる具体例です。
<!-- solution-end -->

<a id="ex-bht13-a03"></a>

#### BHT13-A03 Schwarzschild壁で測る時間円周

- Level: A
- 問題: $G=1$、$f(r)=1-2M/r$、$M>0$、$R=4M$ のEuclid Schwarzschildで、正則周期 $\beta=8\pi M$ とする。壁の誘導計量と $\beta_{\mathrm{wall}}$ を求め、$\beta_{\mathrm{wall}}=\beta$ か判定せよ。

<!-- solution-start -->
**詳細解答**：$f(4M)=1-2M/(4M)=1/2$ より

$$
h=\frac12d\tau^2+(4M)^2d\Omega_2^2.
$$

時間円周の線素は $ds=\sqrt{1/2}\,d\tau$ であり、

$$
\beta_{\mathrm{wall}}=\int_0^{8\pi M}\frac{d\tau}{\sqrt2}
=\frac{8\pi M}{\sqrt2}=4\sqrt2\pi M.
$$

$4\sqrt2\ne8$ なので $\beta_{\mathrm{wall}}\ne\beta$。座標周期と固有長を混同してはいけません。
<!-- solution-end -->

<a id="ex-bht13-a04"></a>

#### BHT13-A04 平坦参照側の周期を合わせる

- Level: A
- 問題: $h=f(R)d\tau^2+R^2d\Omega_2^2$（$\tau$ 周期 $\beta$、$f(R)>0$）と、$h_0=d\tau_0^2+R^2d\Omega_2^2$（$\tau_0$ 周期 $\beta_0$）を同じ境界計量にする $\beta_0$ を求めよ。また $f(R)=1/4$ で $\beta_0=\beta$ とすると何が破綻するか示せ。

<!-- solution-start -->
**詳細解答**：どちらも周期1の $u$ を使い $\tau=\beta u$、$\tau_0=\beta_0u$ とすると、時間成分は $\beta^2f(R)$ と $\beta_0^2$ です。正の周期なので

$$
\beta_0^2=\beta^2f(R)\quad\Longrightarrow\quad
\beta_0=\beta\sqrt{f(R)}.
$$

$f(R)=1/4$ なら必要なのは $\beta_0=\beta/2$ です。誤って $\beta_0=\beta$ とすると時間円周の固有長は参照側 $\beta$、元側 $\beta/2$ となり、境界の等長性が失われます。
<!-- solution-end -->

<a id="ex-bht13-a05"></a>

#### BHT13-A05 壁の平均曲率の跡

- Level: A
- 問題: $G=1$ のSchwarzschildで $R=4M$ とし、壁の外向き $n$、$K_{\tau\tau}$、$K_{\theta\theta}$、$K$ を計算せよ。参照する平坦な壁の $K_0$ と比較せよ。

<!-- solution-start -->
**詳細解答**：$f=1/2$、$f'=1/(8M)$ であり、[壁の公式](#prop-bht13-static-wall)を適用できます。まず

$$
n=\frac1{\sqrt2}\partial_r,\quad
K_{\tau\tau}=\frac{\sqrt f}2f'=\frac1{16\sqrt2M},\quad
K_{\theta\theta}=R\sqrt f=\frac{4M}{\sqrt2}.
$$

$K_{\phi\phi}=K_{\theta\theta}\sin^2\theta$ で、逆境界計量は $h^{\tau\tau}=2$、$h^{\theta\theta}=1/(16M^2)$ です。よって

$$
\begin{aligned}
K&=2\frac1{16\sqrt2M}
+2\frac1{16M^2}\frac{4M}{\sqrt2}
=\frac1{8\sqrt2M}+\frac1{2\sqrt2M}
=\frac5{8\sqrt2M},\\
K_0&=\frac2{4M}=\frac1{2M}.
\end{aligned}
$$

$K_0$ は同じ**誘導計量の参照壁**でも外部への埋め込みが異なるため、$K$ と等しい必要はありません。
<!-- solution-end -->

### Level B：変分と差引きの機構を組み合わせる

<a id="ex-bht13-b01"></a>

#### BHT13-B01 GHY項の法線微分相殺と符号

- Level: B
- 問題: Euclid Gaussian法線座標 $ds^2=dz^2+h_{ij}(z,y)dy^i dy^j$ と $q_{ij}=\delta h_{ij}$ の下で、$\delta K$ と $\delta(\sqrt h K)$ を計算し、EH項の法線微分流束 $+\int_B\sqrt h h^{ij}\partial_zq_{ij}/(16\pi G)$ とGHY項が相殺することを示せ。$q=0$ と $\partial_zq=0$ のどちらが必要か述べよ。

<!-- solution-start -->
**詳細解答**：[第二基本形式](../../GR/GR11/index.md#def-gr11-extrinsic-curvature)を法線座標で表示すると $K_{ij}=\frac12\partial_zh_{ij}$。逆行列の微分 $\delta h^{ij}=-h^{ik}h^{j\ell}q_{k\ell}$ から

$$
\delta K=\delta(h^{ij}K_{ij})
=-K^{ij}q_{ij}+\frac12h^{ij}\partial_zq_{ij}.
$$

行列式の微分 $\delta\sqrt h=\frac12\sqrt h h^{ij}q_{ij}$ を掛け算の微分に代入して

$$
\delta(\sqrt h K)=\sqrt h\left[
\left(\frac K2h^{ij}-K^{ij}\right)q_{ij}
+\frac12h^{ij}\partial_zq_{ij}\right].
$$

作用のGHY係数は $-1/(8\pi G)$ なので、法線微分部分は $-\int_B\sqrt h h^{ij}\partial_zq_{ij}/(16\pi G)$。問題文のEH流束と加えると厳密に零です。残りの境界項は[Dirichlet変分定理](#thm-bht13-euclidean-dirichlet)により $q_{ij}$ のみに比例します。したがって必要なのは $q_{ij}=0$ で、$\partial_zq_{ij}=0$ は課していません。
<!-- solution-end -->

<a id="ex-bht13-b02"></a>

#### BHT13-B02 Schwarzschild背景差引きの発散相殺

- Level: B
- 問題: $f=1-2GM/R$、$R>2GM$ とする。壁の $\int K\sqrt h$ と、同じ誘導計量に合わせた平坦参照壁の $\int K_0\sqrt{h_0}$ を別々に計算し、$R\to\infty$ で差が有限になることを $\sqrt{1-2x}$ の二次までの展開から示せ。

<!-- solution-start -->
**詳細解答**：壁の[曲率公式](#prop-bht13-static-wall)から

$$
\int K\sqrt h=4\pi\beta\left(\frac{R^2f'}2+2Rf\right)
=4\pi\beta(GM+2R-4GM)
=4\pi\beta(2R-3GM).
$$

平坦参照では一致境界条件から $\beta_0=\beta\sqrt f$、$K_0=2/R$ だから

$$
\int K_0\sqrt{h_0}
=\beta_0(4\pi R^2)\frac2R
=8\pi\beta R\sqrt{1-2GM/R}.
$$

$x=GM/R$ とおくと $\sqrt{1-2x}=1-x-x^2/2+O(x^3)$ であり、

$$
8\pi\beta R\sqrt f
=8\pi\beta R-8\pi\beta GM
-\frac{4\pi\beta G^2M^2}R+O(R^{-2}).
$$

最初の積分 $8\pi\beta R-12\pi\beta GM$ から引けば

$$
\int\sqrt h(K-K_0)
=-4\pi\beta GM+\frac{4\pi\beta G^2M^2}R+O(R^{-2}),
$$

と有限値へ収束します。**同じ $\beta$ の平坦円周を誤って引くと**先頭発散は消えても定数項が変わり、固定境界データの比較でなくなります。
<!-- solution-end -->

<a id="ex-bht13-b03"></a>

#### BHT13-B03 Maxwell流束固定の境界項

- Level: B
- 問題: $I_M=(4g_{\mathrm{em}}^2)^{-1}\int F_{ab}F^{ab}\sqrt g$ とする。計量固定で部分積分して境界項を導出し、$I_{\mathrm{Leg}}=-\int A_i\Pi^i$ を加えたとき、何を固定すべきか式で示せ。また $\Pi^i$ を密度と定義した場合に $\sqrt h$ をさらに掛ける誤りを説明せよ。

<!-- solution-start -->
**詳細解答**：$\delta F_{ab}=\nabla_a\delta A_b-\nabla_b\delta A_a$ と反対称性から

$$
\delta I_M=\frac1{g_{\mathrm{em}}^2}\int_UF^{ab}\nabla_a\delta A_b\sqrt g
=-\frac1{g_{\mathrm{em}}^2}\int_U(\nabla_aF^{ab})\delta A_b\sqrt g
+\frac1{g_{\mathrm{em}}^2}\int_Bn_aF^{ai}\delta A_i\sqrt h.
$$

したがって $\Pi^i=\sqrt h n_aF^{ai}/g_{\mathrm{em}}^2$ と置くと境界項は $\int\Pi^i\delta A_i d^3y$。Legendre項を変分して

$$
\delta(I_M+I_{\mathrm{Leg}})|_B
=\int_B\Pi^i\delta A_i-\int_B(\Pi^i\delta A_i+A_i\delta\Pi^i)
=-\int_BA_i\delta\Pi^i.
$$

ゆえに $\delta\Pi^i=0$ が流束型の条件です。$\Pi^i$ に含まれる $\sqrt h$ を再度掛けると、表面要素を二重に数え、座標の変換則と一致しません。
<!-- solution-end -->

<a id="ex-bht13-b04"></a>

#### BHT13-B04 どの構成が滑らかなサドルか

- Level: B
- 問題: 非極限Schwarzschildに対して (a) $\beta=8\pi GM$ で円板中心を補完、(b) $\beta=4\pi GM$ で同じ計量の時間を同一視、(c) 厳密な極限RNで任意周期の時間円周を付ける、の三つを比較せよ。それぞれBHT12の局所正則性定理が適用されるか、使えない場合は失われる仮定または結論の違いを説明せよ。

<!-- solution-start -->
**詳細解答**：（a）$f'(2GM)=1/(2GM)>0$ なので[BHT12の正則周期定理](../BHT12/index.md#thm-bht12-nonextremal-period)が適用でき、$\kappa=1/(4GM)$、$\kappa\beta=2\pi$ です。時間・動径断面は滑らかな円板へ補完できます。ただし局所正則性だけで経路積分が収束すると結論しません。

（b）同じ非極限の条件は満たしても、$\kappa\beta=\pi$、欠損角 $\delta=2\pi-\pi=\pi$ です。円板中心の滑らかさという結論が失われ、滑らかな真空重力の作用へそのまま代入することはできません。

（c）厳密な極限RNは $f(r)=(1-G|Q|/r)^2$ という二重零点を持ち、$f'(r_h)=0$ です。単純零点という定理の仮定が壊れ、[BHT11の極限Euclid幾何](../BHT11/index.md#prop-bht11-euclidean-order)の通り地平線までの固有距離は無限大です。円錐中心の滑らかさで周期を選ぶ論拠はなくなりますが、任意の周期が同じ物理的温度を与えるという意味ではありません。
<!-- solution-end -->

### Level C：境界値問題から有限作用へ

<a id="ex-bht13-c01"></a>

#### BHT13-C01 同じ壁で比較したSchwarzschildの相対作用

- Level: C
- 問題: 自然単位 $G=1$、質量 $M>0$ の滑らかなEuclid Schwarzschild解を考える。計量関数と正則周期は

  $$
  f(r)=1-\frac{2M}r,\qquad \beta=8\pi M.
  $$

  半径 $R>2M$ に壁を置き、平坦な $S^1\times B_R^3$ を参照背景に取って、次を解け。

  1. 壁の誘導計量と固有周期を求め、参照背景の周期を合わせよ。
  2. 外向き $K,K_0$ を計算して境界GHY差を求めよ。
  3. 二つのバルクが $R[g]=0$、$\Lambda=0$ を満たし、地平線は円板中心として滑らかで内側境界を持たないことから、有限 $R$ の相対作用と $R\to\infty$ 極限を導け。
  4. なぜこの計算だけでは、任意の境界温度に対する収束する正準分配関数が完成したと言えないか説明せよ。

<!-- solution-start -->
**詳細解答**：（i）[静的壁の命題](#prop-bht13-static-wall)を $f=1-2M/R$ へ適用すると

$$
h=f(R)d\tau^2+R^2d\Omega_2^2,\qquad
\beta_{\mathrm{wall}}=8\pi M\sqrt{f(R)}.
$$

平坦参照の時間を周期 $\beta_0$ で同一視し、両側の周期1の座標を用いると $h_{uu}=\beta^2f(R)$、$h^{(0)}_{uu}=\beta_0^2$ です。したがって $\beta_0=\beta\sqrt{f(R)}$ が必要です。

（ii）$f'(R)=2M/R^2$ と外向き法線 $n=\sqrt f\partial_r$ を用いると

$$
K=\frac{M}{R^2\sqrt f}+\frac{2\sqrt f}R,
\qquad K_0=\frac2R.
$$

面積密度は $\sqrt h=\sqrt f R^2\sin\theta$ です。壁の積分では必ず周期の違いを考慮して

$$
\begin{aligned}
\int_BK\sqrt h&=4\pi\beta(M+2Rf),\\
\int_{B_0}K_0\sqrt{h_0}&=4\pi\beta_0(2R)
=8\pi\beta R\sqrt f.
\end{aligned}
$$

（iii）バルクのスカラー曲率は零で、地平線は[正則円板](../BHT12/index.md#thm-bht12-nonextremal-period)の滑らかな中心なので、外側のGHY項だけが寄与します。[Euclid Einstein–Hilbert–GHY作用](#def-bht13-euclidean-action)より

$$
\begin{aligned}
I_E^{\mathrm{rel}}(R)
&=-\frac1{8\pi}\left[4\pi\beta
\left(M+2Rf-2R\sqrt f\right)\right]\\
&=-\frac\beta2\left[M+2R\left(1-\frac{2M}R\right)-2R\sqrt{1-\frac{2M}R}\right]\\
&=\beta\left[R\left(\sqrt{1-\frac{2M}R}-1\right)+\frac{3M}2\right].
\end{aligned}
$$

ここで $\sqrt{1-2M/R}=1-M/R-M^2/(2R^2)+O(R^{-3})$ なので

$$
I_E^{\mathrm{rel}}(R)
=\beta\left[\frac M2-\frac{M^2}{2R}+O(R^{-2})\right]
\longrightarrow\frac{\beta M}2.
$$

（iv）この計算は**与えた滑らかな一つの解のon-shell作用**です。同じ境界に適合する他の幾何、負モード、ゲージ固定、量子揺らぎの測度、非コンパクト極限の正則化や他の位相を積分したわけではありません。したがって $Z\sim e^{-I_E}$ という半古典サドルの解釈には、追加の支配条件が必要です。有限壁ではさらに壁の固有温度 $1/\beta_{\mathrm{wall}}$ を保持してアンサンブルを比較します。
<!-- solution-end -->

---

次講BHT14「Euclidサドルから自由エネルギーへ」では、作用の境界条件を固定した上で、温度微分・エネルギー・エントロピーを同じアンサンブル内で導きます。
