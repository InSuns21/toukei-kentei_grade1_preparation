# GR42 Friedmann方程式と流体保存

<!-- definition-example-audit: strict -->

[GR41のFLRW計量](../GR41/index.md#def-gr41-flrw)は、時刻面が均一・等方という幾何学的条件から、空間の曲率符号 $k$ と一つの尺度因子 $a(\tau)$ に時空計量を絞りました。しかし対称性だけでは、$a$ が増えるのか減るのか、その速ささえ決まりません。物質を入れると時間発展はどう変わるのでしょうか。

本章では計量から接続、Ricci、Einsteinテンソルを成分ごとに計算してから場の方程式を適用します。さらに流体の保存則を導き、塵・放射・宇宙項がそれぞれ異なる膨張を生む仕組みを、解への代入まで確かめます。**制約式が一時刻で成立することと、その後の時間発展が解であることは別**という点も最後まで追います。

符号規約は $(-,+,+,+)$、曲率の符号と第二基本形式はGR41と同じです。$c=G=1$ とし、宇宙項 $\Lambda$ は時空で一定とします。時間区間 $I$ 上で $a\in C^3(I)$ は正、流体の密度と圧力は $C^1$ と仮定します。点を上に付けた $\dot a$ は宇宙時間 $\tau$ による微分です。次元のある定数を戻す場合の注意は第3節で述べます。

## 1. 観測者と物質をFLRW時空へ載せる

[GR41の共動観測者](../GR41/index.md#def-gr41-comoving)は空間座標 $x^i$ を固定して動く時計であり、その固有時を $\tau$ とします。空間計量 $\gamma_{ij}(x)$ の断面曲率は規格化された $k\in\{-1,0,1\}$ で、$h_{ij}=a^2\gamma_{ij}$ は時刻面の計量です。前章の幾何計算で、共動距離は $a$ 倍、共動体積は $a^3$ 倍、膨張率 $\nabla_\mu u^\mu$ は $3\dot a/a$ と分かっています。

そこで一単位の時間に距離の対数がどれだけ変わるかを $H=\dot a/a$ で測り、物質は空間対称性を壊さない共動完全流体として置きます。[GR8の完全流体](../GR8/index.md#def-gr8-perfect-fluid-stress)では、静止観測者が測るエネルギー密度 $\rho$ と等方圧力 $p$ がエネルギー運動量テンソルを決めます。$c=1$ なので本章の $\rho$ は質量密度と同じ次元を持つ**エネルギー密度**です。

<a id="def-gr42-hubble-fluid"></a>

<!-- formal-statement-start -->
> **定義（Hubble率と共動完全流体）**
> $I\times\Sigma$ のFLRW時空で、$a(\tau)>0$、$g=-d\tau^2+a(\tau)^2\gamma_k$ とする。**Hubble率**と未来向き共動単位速度を

$$
H(\tau)=\frac{\dot a(\tau)}{a(\tau)},\qquad u=\partial_\tau
$$

> と定める。共動観測者の局所静止枠で全方向の圧力が等しい流体について、$\rho=\rho(\tau)$、$p=p(\tau)$ とし、**共動完全流体**のテンソルを

$$
T_{\mu\nu}=(\rho+p)u_\mu u_\nu+pg_{\mu\nu}
$$

> とする。$\rho\ge0$ を仮定するが、圧力の符号は限定しない。この場合 $T_{00}=\rho$, $T_{0i}=0$, $T_{ij}=p h_{ij}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr42-hubble-fluid -->
**定義の確認**：平坦なCartesian空間座標を選び、$\gamma_{ij}=\delta_{ij}$、$a(\tau)=1+\tau^2$、$\rho(\tau)=3$、$p(\tau)=2$ と置きます。$a>0$ で $\rho\ge0$、$\rho,p$ は滑らかです。$g_{00}=-1$ だから $u=\partial_\tau$ は未来向き単位速度で、$g(u,u)=-1$、$u_0=-1,u_i=0$ です。テンソルの定義へ代入すると

$$
T_{00}=(3+2)(-1)^2+2(-1)=3,\qquad
T_{0i}=0,\qquad T_{ij}=2(1+\tau^2)^2\delta_{ij}.
$$

最後の座標成分が等方圧力を表す理由も確かめます。空間計量は $h_{ij}=a^2\delta_{ij}$ なので、空間の単位直交基底を $e_{(i)}=a^{-1}\partial_i$ と取れます。二階共変テンソル $T$ の両引数をそれぞれ $a^{-1}$ 倍した接ベクトルで評価すると

$$
T(e_{(i)},e_{(j)})=a^{-2}T_{ij}=2\delta_{ij}=p\delta_{ij},
\qquad T(u,e_{(i)})=0.
$$

従ってどの単位空間方向でも応力は同じ $p=2$ で、熱流束もありません。$H=\dot a/a=2\tau/(1+\tau^2)$ です。これは**テンソルの定義の例**であり、$\rho,p$ を定数に選んだこの組がEinstein方程式を満たすとは主張していません。
<!-- definition-example-end -->

密度や圧力が場所に依存していたら空間並進のもとでテンソルが変化し、方向ごとの応力が異なれば回転のもとで変化します。ここで一様性・等方性を課しているのは**流体の静止系**です。宇宙全体の厳密な模型としての仮定であり、星や銀河などの小尺度の不均一を否定するものではありません。

## 2. 接続から時空Ricci曲率まで手で出す

必要な成分は思いのほか少数です。以下、座標添字 $0$ は宇宙時間 $\tau$、$i,j,\ell$ は空間座標を表します。$\partial_0=\partial/\partial\tau$ は空間座標 $x^i$ を固定する偏微分です。尺度因子・Hubble率・密度・圧力は時間だけの関数なので、例えば

$$
\partial_0a=\frac{da}{d\tau}=\dot a,\qquad \partial_i a=0.
$$

点記法と偏微分はこの意味で使い分けます。[Levi-Civita接続の座標公式](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)を $g_{00}=-1,g_{0i}=0,g_{ij}=h_{ij}$ に代入します。空間のChristoffel係数は、$a$ が空間座標に依存しないため $\gamma$ のものと一致します。Ricciを出すときには、**3次元空間の曲率**と**時間変化による曲率**を足します。

<a id="prop-gr42-flrw-curvature"></a>

<!-- formal-statement-start -->
> **命題（FLRWの接続とRicci曲率）**
> $a\in C^3(I)$ が正で、$\gamma_k$ が定断面曲率 $k$ の3次元計量であるFLRW時空を考える。添字 $0$ を宇宙時間 $\tau$ とし、$h_{ij}=a^2\gamma_{ij}$、$H=\dot a/a$ とすると、空間のChristoffel係数 $\widehat\Gamma^i{}_{jk}$ 以外に非零となり得る接続係数は

$$
\Gamma^0{}_{ij}=Hh_{ij},\qquad
\Gamma^i{}_{0j}=\Gamma^i{}_{j0}=H\delta^i_j.
$$

> $\Gamma^i{}_{jk}=\widehat\Gamma^i{}_{jk}$ とし、時空Ricciとスカラー曲率の独立成分は次である。

$$
\begin{aligned}
R_{00}&=-3(\dot H+H^2)=-3\frac{\ddot a}{a},\\
R_{0i}&=0,\\
R_{ij}&=\left(\dot H+3H^2+\frac{2k}{a^2}\right)h_{ij},\\
R&=6\left(\dot H+2H^2+\frac{k}{a^2}\right).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

時間を含むChristoffel係数は $g_{ij}$ の時間微分から二組だけ生じます。Ricciの $00$ 成分は膨張の時間変化、$ij$ 成分には空間Ricci $2k\gamma_{ij}$ が加わります。最後に $g^{00}=-1$ と $g^{ij}=h^{ij}$ で縮約すればスカラー曲率となります。

<!-- proof-start -->
### 証明

$\partial_0h_{ij}=2a\dot a\gamma_{ij}=2Hh_{ij}$ と $g^{00}=-1,g^{0i}=0,g^{ij}=h^{ij}$ から

$$
\begin{aligned}
\Gamma^0{}_{ij}
&=\frac12g^{00}(-\partial_0g_{ij})
=\frac12\partial_0h_{ij}=Hh_{ij},\\
\Gamma^i{}_{0j}
&=\frac12g^{i\ell}\partial_0g_{\ell j}
=\frac12h^{i\ell}(2Hh_{\ell j})=H\delta^i_j.
\end{aligned}
$$

空間微分では $h^{i\ell}=a^{-2}\gamma^{i\ell}$ と $\partial_jh_{\ell k}=a^2\partial_j\gamma_{\ell k}$ が相殺し、$\Gamma^i{}_{jk}=\widehat\Gamma^i{}_{jk}$ です。$g_{00}=-1,g_{0i}=0$ は定数なので $\Gamma^0{}_{00},\Gamma^i{}_{00},\Gamma^0{}_{0i}$ は零です。

[GR6のRicci・スカラー曲率の定義](../GR6/index.md#def-gr6-ricci-scalar)と同じ符号規約で、座標表示

$$
R_{\mu\nu}=\partial_\alpha\Gamma^\alpha{}_{\mu\nu}
-\partial_\nu\Gamma^\alpha{}_{\mu\alpha}
+\Gamma^\alpha{}_{\mu\nu}\Gamma^\beta{}_{\alpha\beta}
-\Gamma^\alpha{}_{\mu\beta}\Gamma^\beta{}_{\nu\alpha}
$$

を用います。$\Gamma^\alpha{}_{0\alpha}=3H$ と
$\Gamma^i{}_{0j}\Gamma^j{}_{0i}=H^2\delta^i_j\delta^j_i=3H^2$ から

$$
R_{00}=-\partial_0(3H)-3H^2=-3(\dot H+H^2).
$$

$R_{ij}$ では空間添字だけを含む項の総和が $\widehat R_{ij}=2k\gamma_{ij}=2k h_{ij}/a^2$ です。これは[GR41の空間Ricci計算](../GR41/index.md#prop-gr41-flrw-kinematics)で3次元定曲率を用いた結果です。時間添字を含む残りの項を個別に書くと

$$
\begin{aligned}
\partial_0\Gamma^0{}_{ij}&=(\dot H+2H^2)h_{ij},\\
\Gamma^0{}_{ij}\Gamma^\beta{}_{0\beta}&=3H^2h_{ij},\\
-\Gamma^0{}_{i\ell}\Gamma^\ell{}_{j0}
-\Gamma^\ell{}_{i0}\Gamma^0{}_{j\ell}&=-2H^2h_{ij}.
\end{aligned}
$$

ゆえに $R_{ij}=(\dot H+3H^2)h_{ij}+2k h_{ij}/a^2$。$R_{0i}$ は空間Ricciの混合成分を持たず、$\partial_iH=0$ なので零になります（実際 $\partial_j\Gamma^j{}_{0i}=\partial_iH=0$、$\partial_i\Gamma^\alpha{}_{0\alpha}=3\partial_iH=0$ で、空間接続の残りの対は相殺します）。最後に

$$
\begin{aligned}
R&=g^{00}R_{00}+h^{ij}R_{ij}\\
&=3(\dot H+H^2)+3\left(\dot H+3H^2+\frac{2k}{a^2}\right)\\
&=6\left(\dot H+2H^2+\frac{k}{a^2}\right).
\end{aligned}
$$

ここで $\dot H=(\ddot a/a)-H^2$ です。$\square$
<!-- proof-end -->

例えば $k=0,a\equiv a_0>0$ なら $H=\dot H=0$ で時空Ricciは零です。他方 $k=-1,a(\tau)=\tau$（$\tau>0$）なら $H=1/\tau$、$\dot H=-1/\tau^2$ だから $R_{00}=0$ かつ $R_{ij}=(2/\tau^2-2/\tau^2)h_{ij}=0$。これは[GR41のMilne表示](../GR41/index.md#ex-gr41-c01)がMinkowski時空であることと一致します。**空間曲率だけをRicciと読み違えない**ための有効な検算です。

## 3. Einstein方程式から制約式と加速式を分けて導く

[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)を、共動流体の $T_{00}=\rho,T_{ij}=ph_{ij}$ へ適用します。$G_{\mu\nu}=R_{\mu\nu}-\tfrac12Rg_{\mu\nu}$ の時間・空間成分を先に算出すれば、物質方程式の役割が見えます。

<a id="thm-gr42-friedmann"></a>

<!-- formal-statement-start -->
> **定理（Friedmann方程式）**
> $a>0$ のFLRW計量と時間だけに依存する共動完全流体 $(\rho,p)$ に対し、定数 $\Lambda$ を含む4次元Einstein方程式 $G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi T_{\mu\nu}$ は、次の**Friedmann制約式**と**加速方程式**を同時に満たすことと同値である。

$$
\boxed{H^2+\frac{k}{a^2}=\frac{8\pi}{3}\rho+\frac{\Lambda}{3}}
$$

$$
\boxed{\frac{\ddot a}{a}=-\frac{4\pi}{3}(\rho+3p)+\frac{\Lambda}{3}.}
$$

> 同値な独立の時間発展表示として、次も成立する。

$$
\boxed{\dot H-\frac{k}{a^2}=-4\pi(\rho+p).}
$$
<!-- formal-statement-end -->

### 証明の見取り図

第2節のRicciを $G_{00},G_{ij}$ に変換します。時間成分は $\dot H$ が相殺して $H^2$ だけの式になり、これは[GR40のHamiltonian制約](../GR40/index.md#def-gr40-constraints)と一致します。空間成分は $\dot H$ を含む進化式であり、両者を組み合わせて加速式にします。$H$ で割る操作は一切不要です。

<!-- proof-start -->
### 証明

[FLRWのRicci命題](#prop-gr42-flrw-curvature)で $g_{00}=-1$ を用いると

$$
\begin{aligned}
G_{00}&=R_{00}+\tfrac12R\\
&=-3(\dot H+H^2)+3\left(\dot H+2H^2+\frac{k}{a^2}\right)\\
&=3\left(H^2+\frac{k}{a^2}\right).
\end{aligned}
$$

一方 $g_{ij}=h_{ij}$ を用いると

$$
\begin{aligned}
G_{ij}&=R_{ij}-\tfrac12Rh_{ij}\\
&=\left(\dot H+3H^2+\frac{2k}{a^2}
-3\dot H-6H^2-\frac{3k}{a^2}\right)h_{ij}\\
&=-\left(2\dot H+3H^2+\frac{k}{a^2}\right)h_{ij}.
\end{aligned}
$$

時間成分の場の方程式は $3(H^2+k/a^2)-\Lambda=8\pi\rho$ です。これを3で割って最初の式を得ます。空間成分では $h_{ij}$ が非退化なので、その係数を比較でき、

$$
2\dot H+3H^2+\frac{k}{a^2}=\Lambda-8\pi p.
$$

ここから制約式の3倍 $3H^2+3k/a^2=8\pi\rho+\Lambda$ を引き、

$$
2\dot H-\frac{2k}{a^2}=-8\pi(\rho+p)
$$

を得ます。さらに $\ddot a/a=\dot H+H^2$ へ

$$
\dot H=-4\pi(\rho+p)+\frac{k}{a^2},\qquad
H^2=\frac{8\pi}{3}\rho+\frac{\Lambda}{3}-\frac{k}{a^2}
$$

を代入すると、曲率項が相殺し

$$
\frac{\ddot a}{a}
=-4\pi(\rho+p)+\frac{8\pi}{3}\rho+\frac\Lambda3
=-\frac{4\pi}{3}(\rho+3p)+\frac\Lambda3.
$$

逆に制約式と加速式から $\dot H=\ddot a/a-H^2$ を組み立てれば空間成分へ戻り、混合成分は対称性により $G_{0i}=T_{0i}=g_{0i}=0$ です。従って全Einstein方程式と同値です。$\square$
<!-- proof-end -->

制約式を前章の幾何からも検算します。[GR41の $\mathcal R^{(3)}=6k/a^2$ と $K_{ij}=Hh_{ij}$](../GR41/index.md#prop-gr41-flrw-kinematics)から

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
=\frac{6k}{a^2}+9H^2-3H^2
=6\left(H^2+\frac{k}{a^2}\right).
$$

[GR40の制約](../GR40/index.md#thm-gr40-einstein-constraints)の右辺は $16\pi\rho+2\Lambda$ なので6で割れば同じ第一式です。**制約は一時刻の初期データを絞る式**、空間成分は $\ddot a$ を決める時間発展の式です。制約だけから加速度は出ません。

宇宙項を流体の一部に移して書くこともできます。その場合の真空エネルギー密度と圧力は $\rho_\Lambda=\Lambda/(8\pi)$、$p_\Lambda=-\rho_\Lambda$ です。**右辺に $\rho_\Lambda$ を加えるなら左辺の $\Lambda g_{\mu\nu}$ は取り除く**必要があります。本章の式は幾何側に $\Lambda$ を残す規約です。物理単位に戻す場合、$H^2+kc^2/a^2=(8\pi G/3)\rho_{\mathrm{mass}}+\Lambda c^2/3$ で、$\rho_{\mathrm{mass}}$ は質量密度、エネルギー密度は $\rho_{\mathrm{energy}}=\rho_{\mathrm{mass}}c^2$ と区別します。

## 4. 共動体積の増大と流体保存

空間が膨張すると、同じ共動領域の体積は $a^3$ に比例します。粒子が保存する塵なら粒子数密度が $a^{-3}$ に下がるのは自然ですが、**放射では一粒子のエネルギーも変わる**ので同じ式でよいとは限りません。ここで必要なのは[GR8の流体エネルギー方程式](../GR8/index.md#thm-gr8-fluid-projections)であり、そのFLRWでの具体形を座標から再確認します。

流体を閉じる追加の物理条件として、圧力と密度を比例させる模型を考えます。その比例定数を $w$ とし、これを時間に依存しないと仮定する場合を先に明確にします。後で $w=0$（塵）、$w=1/3$（放射）、$w=-1$（真空型）の違いを解き分けます。

<a id="def-gr42-barotropic-w"></a>

<!-- formal-statement-start -->
> **定義（一定状態方程式パラメータ）**
> 時間区間 $I$ における共動完全流体の密度 $\rho\ge0$ と圧力 $p$ が、固定した実数 $w$ によって

$$
p(\tau)=w\rho(\tau)\qquad(\tau\in I)
$$

> を満たすとき、$p=w\rho$ を**一定状態方程式**、$w$ をその**状態方程式パラメータ**という。$w$ は時刻に依らない数であり、$\rho=0$ でも式そのものは定義できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr42-barotropic-w -->
**定義の確認**：任意の正関数 $a(\tau)$ に対して $\rho(\tau)=\rho_0(a/a_0)^{-4}$ と $p(\tau)=\rho(\tau)/3$ を設定すると、同じ定数 $w=1/3$ によって全時刻で $p=w\rho$ が成立します。$\rho_0>0,a_0>0$ なら $\rho>0$ です。この代数的関係を仮定することと、Einstein方程式・保存則まで満たすことは別です。次の命題で保存則を確認します。
<!-- definition-example-end -->

<a id="prop-gr42-fluid-continuity"></a>

<!-- formal-statement-start -->
> **命題（FLRWの流体保存と密度スケーリング）**
> $a>0$ のFLRW時空に、$C^1$ 級の共動完全流体 $\rho(\tau),p(\tau)$ があるとする。この流体の局所保存 $\nabla_\mu T^{\mu\nu}=0$ は、次の**流体保存式**と同値である。

$$
\boxed{\dot\rho+3H(\rho+p)=0.}
$$

> さらに $p=w\rho$ で $w$ が一定なら、任意の基準時刻 $\tau_0\in I$ で $a_0=a(\tau_0)>0$、$\rho_0=\rho(\tau_0)$ として

$$
\boxed{\rho(\tau)=\rho_0\left(\frac{a(\tau)}{a_0}\right)^{-3(1+w)}.}
$$

> 特に $w=-1$ なら $\rho$ は一定である。$\rho_0=0$ の場合も零解として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$T^{00}=\rho,T^{0i}=0,T^{ij}=ph^{ij}$ を共変発散へ代入します。空間成分は一様な圧力の勾配が零なので自動的に満たされ、時間成分だけが残ります。一定 $w$ では $\rho$ を係数とする一階線形方程式になり、$a$ の対数微分で積分できます。

<!-- proof-start -->
### 証明

共動流体では $u^\mu=\delta^\mu_0$ です。[完全流体テンソル](../GR8/index.md#def-gr8-perfect-fluid-stress)に代入すると $T^{00}=\rho$、$T^{0i}=0$、$T^{ij}=ph^{ij}$。共変発散の座標成分を展開して

$$
\nabla_\mu T^{\mu\nu}
=\partial_\mu T^{\mu\nu}
+\Gamma^\mu{}_{\mu\lambda}T^{\lambda\nu}
+\Gamma^\nu{}_{\mu\lambda}T^{\mu\lambda}
$$

です。時間成分に[本章で求めたFLRWの接続成分](#prop-gr42-flrw-curvature)を代入すると

$$
\begin{aligned}
\nabla_\mu T^{\mu0}
&=\dot\rho+(\Gamma^i{}_{i0})\rho
+\Gamma^0{}_{ij}ph^{ij}\\
&=\dot\rho+3H\rho+Hh_{ij}ph^{ij}\\
&=\dot\rho+3H(\rho+p).
\end{aligned}
$$

空間成分では $\partial_i p=0$、$\Gamma^i{}_{00}=0$ です。$\widehat\nabla$ を時刻面の空間計量 $h$ のLevi-Civita接続とすると、上の接続係数から残りの項は

$$
\begin{aligned}
\nabla_\mu T^{\mu i}
&=\partial_j(ph^{ji})+\widehat\Gamma^j{}_{j\ell}ph^{\ell i}
+\widehat\Gamma^i{}_{j\ell}ph^{j\ell}\\
&=h^{ji}\partial_jp+p\widehat\nabla_jh^{ji}=0.
\end{aligned}
$$

最後の等号には $p$ の一様性と[Levi-Civita接続の計量両立性](../../../幾何系/GEO/GEO13/index.md#def-geo13-metric-compatibility)を使いました。よって時間成分の式が全四成分の局所保存と同値です。

次に一定 $w$ の場合は

$$
\dot\rho+3(1+w)\frac{\dot a}{a}\rho=0.
$$

$a^{3(1+w)}$ を積分因子に取り、積の微分を展開すると

$$
\frac{d}{d\tau}\left(\rho a^{3(1+w)}\right)
=a^{3(1+w)}\left(\dot\rho+3(1+w)\frac{\dot a}{a}\rho\right)=0.
$$

したがって $\rho a^{3(1+w)}=\rho_0a_0^{3(1+w)}$ です。$a>0$ なので実数 $w$ に対して全ての冪が定義でき、$\rho_0=0$ も含めて主張が従います。$\square$
<!-- proof-end -->

物理的には固定した共動領域の体積を $V=V_0(a/a_0)^3$ とすると $\dot V=3HV$ です。保存式に $V$ を掛け、$\frac{d}{d\tau}(\rho V)=V\dot\rho+\rho\dot V$ を使えば

$$
\boxed{\frac{d}{d\tau}(\rho V)=-p\dot V.}
$$

圧力が正なら膨張中に流体は仕事をし、共動領域内のエネルギーが減ります。ただしこれは**局所的な保存則の積分表現**であり、時間並進Killing場を仮定しない宇宙全体の「一定な全エネルギー」を保証する主張ではありません。

具体的に $w=0$ なら $\rho\propto a^{-3}$ で $\rho V$ は一定、$w=1/3$ なら $\rho\propto a^{-4}$ で $\rho V\propto a^{-1}$ です。$w=-1$ なら $p=-\rho$、保存式は $\dot\rho=0$ となり、膨張しても密度は一定です。宇宙項を右辺の流体として扱うときは、この最後の型と同じ時間発展になります。

## 5. 一時刻の制約はどう維持されるか

制約式だけが偶然成立した尺度因子を「宇宙の解」と誤認しないため、制約が発展方程式と保存則によって保たれる仕組みを計算します。ここでは $H=0$ となる転回点や静的模型でも式が意味を持つよう、**$H$ で除算しません**。

<a id="prop-gr42-constraint-propagation"></a>

<!-- formal-statement-start -->
> **命題（Friedmann制約の伝播と逆推論の限界）**
> $a>0$、$\rho,p$ が滑らかで $k,\Lambda$ が定数のFLRW模型において、流体保存式と発展方程式

$$
\dot\rho+3H(\rho+p)=0,
\qquad \dot H-\frac{k}{a^2}=-4\pi(\rho+p)
$$

> が成立するとする。このとき

$$
F(\tau)=H^2+\frac{k}{a^2}-\frac{8\pi}{3}\rho-\frac\Lambda3
$$

> は定数である。従ってある時刻に $F=0$ なら区間全体でFriedmann制約が成立する。一方、**制約式と保存式だけ**から発展方程式を結論することは、$H=0$ の区間では一般にできない。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ を微分すると、流体の項は保存式から、幾何の項は発展方程式から同じ $H(\rho+p)$ を生み、相殺します。逆方向に制約を微分したときは、最後に $H$ が掛かって残るので、$H=0$ で割って結論してはいけません。

<!-- proof-start -->
### 証明

$\frac{d}{d\tau}(k/a^2)=-2kH/a^2$ を用い、[Friedmann方程式](#thm-gr42-friedmann)の発展形と[流体保存命題](#prop-gr42-fluid-continuity)を代入すると

$$
\begin{aligned}
\dot F&=2H\dot H-\frac{2kH}{a^2}-\frac{8\pi}{3}\dot\rho\\
&=2H\left(\dot H-\frac{k}{a^2}\right)+8\pi H(\rho+p)\\
&=2H[-4\pi(\rho+p)]+8\pi H(\rho+p)=0.
\end{aligned}
$$

逆に $F\equiv0$ と保存式だけを仮定して微分すると

$$
2H\left[\dot H-\frac{k}{a^2}+4\pi(\rho+p)\right]=0
$$

しか出ません。$H\ne0$ なら括弧が零ですが、$H=0$ の開区間では括弧について何も言えません。

反例として $a\equiv a_0>0,k=+1,\Lambda=0,\rho\equiv3/(8\pi a_0^2),p\equiv0$ を置きます。$H=0$ で制約 $1/a_0^2=(8\pi/3)\rho$ と保存式 $\dot\rho=0$ は成立します。しかし発展式左辺は $-1/a_0^2$、右辺は $-4\pi\rho=-3/(2a_0^2)$ で一致しません。したがってこの静的模型はEinstein方程式の解ではありません。$\square$
<!-- proof-end -->

定理の発展形は、時間成分の制約と空間成分を組み合わせて得た**独立な幾何方程式**です。一般に $H$ が孤立点で零になるだけなら、近傍からの連続性によって発展式をその点へ延長できる場合がありますが、保存と制約の微分だけから無条件に主張してはなりません。

## 6. 塵・放射・真空の膨張を解く

まず空間が平坦な $k=0$、宇宙項なしの $\Lambda=0$ を考えます。$p=w\rho$ を選ぶと保存命題から $\rho(a)$ が決まり、Friedmann制約式が $a$ の一階方程式になります。**膨張枝 $H>0$ を選ぶこと**も解の選択の一部です。縮小枝は時間を反転して得られます。

<a id="prop-gr42-elementary-solutions"></a>

<!-- formal-statement-start -->
> **命題（平坦な一定状態方程式宇宙と真空解）**
> $k=\Lambda=0$、$\rho>0$、$p=w\rho$ で $w>-1$ は定数とする。ある時間区間で $H>0$ なら、積分定数 $A>0$ と $\tau_B$ を用い、$\tau>\tau_B$ の範囲で

$$
a(\tau)=A(\tau-\tau_B)^{\frac{2}{3(1+w)}},
\qquad \rho(\tau)=\frac{1}{6\pi(1+w)^2(\tau-\tau_B)^2}
$$

> となる。特に塵 $w=0$ は $a\propto(\tau-\tau_B)^{2/3}$、放射 $w=1/3$ は $a\propto(\tau-\tau_B)^{1/2}$ である。別に $k=0$、$\rho=p=0$、$\Lambda>0$ の真空には、$H_\Lambda=\sqrt{\Lambda/3}$ として

$$
a(\tau)=A e^{H_\Lambda(\tau-\tau_0)}
$$

> という膨張解が存在する。宇宙項を零にして $w=-1,\rho>0$ とする場合も $H_\Lambda$ を $\sqrt{8\pi\rho/3}$ に置き換えた指数解になる。
<!-- formal-statement-end -->

### 証明の見取り図

保存式で得た密度冪を第一Friedmann式へ入れます。膨張枝の平方根を選び、$a$ の冪を片側に集めれば積分できます。最後に $\rho$ と加速式へ**再代入**して、一階の制約しか使っていないことによる見落としを防ぎます。

<!-- proof-start -->
### 証明

[密度スケーリング](#prop-gr42-fluid-continuity)から $\rho=C a^{-n}$、$n=3(1+w)>0$、$C>0$ です。$k=\Lambda=0$ の[Friedmann制約](#thm-gr42-friedmann)は

$$
\left(\frac{\dot a}{a}\right)^2=\frac{8\pi C}{3}a^{-n}.
$$

膨張枝 $\dot a>0$ では $D=\sqrt{8\pi C/3}>0$ と置いて $\dot a=D a^{1-n/2}$ です。$a>0,n>0$ なので $a^{n/2}$ は微分でき、連鎖律から

$$
\frac{d}{d\tau}\left(a^{n/2}\right)
=\frac n2 a^{n/2-1}\dot a=\frac{nD}{2}.
$$

両辺を宇宙時間 $\tau$ で積分して $a^{n/2}=(nD/2)(\tau-\tau_B)$ を得ます。しばしば書く $a^{n/2-1}\,da=D\,d\tau$ はこの連鎖律と積分の省略記法であり、微分記号を分数として勝手に割ったものではありません。$a>0,nD>0$ より $\tau>\tau_B$、従って $a=[(nD/2)(\tau-\tau_B)]^{2/n}=A(\tau-\tau_B)^{2/n}$ です。対数微分すると

$$
H=\frac{2}{n(\tau-\tau_B)},\qquad
\dot H=-\frac{2}{n(\tau-\tau_B)^2},\qquad
\rho=\frac{3H^2}{8\pi}=\frac{3}{2\pi n^2(\tau-\tau_B)^2}.
$$

$n=3(1+w)$ を戻せば記載の密度です。加速式の左辺は

$$
\frac{\ddot a}{a}=\dot H+H^2
=\frac{4-2n}{n^2(\tau-\tau_B)^2},
$$

右辺は $-\frac{4\pi}{3}\rho(1+3w)=-\frac{2(1+3w)}{n^2(\tau-\tau_B)^2}$ です。$4-2n=4-6(1+w)=-2(1+3w)$ で一致します。

真空 $\rho=p=0$、$k=0$、$\Lambda>0$ なら制約から $H^2=\Lambda/3$ です。膨張枝を選んで $\dot a=H_\Lambda a$ を積分すると指数関数を得ます。$\ddot a/a=H_\Lambda^2=\Lambda/3$ で加速式も成立します。$\Lambda=0,w=-1$ の流体の場合、保存から $\dot\rho=0$ で $\rho>0$ は一定なので同じ計算です。$\square$
<!-- proof-end -->

指数膨張の平坦な模型はde Sitter時空の一つの座標域を与えます。$\Lambda>0$ で物質のない場合、**非平坦なFLRW葉**も可能です。$b=\sqrt{\Lambda/3}>0$ と置くと、閉じた空間断面 $k=+1$ では全実数時刻で

$$
a=b^{-1}\cosh(b\tau),\qquad
H=b\tanh(b\tau),\qquad
\frac1{a^2}=b^2\operatorname{sech}^2(b\tau).
$$

恒等式 $\tanh^2z+\operatorname{sech}^2z=1$ から $H^2+1/a^2=b^2$ です。他方、負曲率の $k=-1$ では $\tau>0$ に対して

$$
a=b^{-1}\sinh(b\tau),\qquad
H=b\coth(b\tau),\qquad
\frac1{a^2}=b^2\operatorname{csch}^2(b\tau).
$$

恒等式 $\coth^2z-\operatorname{csch}^2z=1$ より $H^2-1/a^2=b^2$ です。いずれも直接二階微分すれば $\ddot a/a=b^2$ を満たします。空間の曲率符号が違うからといって、直ちに異なる宇宙項の理論を意味するわけではありません。

一方で[Milne時空](../GR41/index.md#ex-gr41-c01)の $k=-1,a=\tau,\rho=p=\Lambda=0$ なら $H^2+k/a^2=\tau^{-2}-\tau^{-2}=0$、$\ddot a=0$ で両式が成立します。**空間が負曲率でも物質が必須とは限らない**という対照例です。

次章では、ここで得た尺度因子を光の伝播へ接続し、宇宙赤方偏移と膨張の測定を扱います。

## 7. 演習

### Level A：一つの係数・仮定を取り出して確かめる

<a id="ex-gr42-a01"></a>

### GR42-A01 時間と空間を混ぜる接続
- Level: A

$g_{00}=-1,g_{0i}=0,g_{ij}=a(\tau)^2\delta_{ij}$、$a>0$ とする。$\Gamma^0{}_{ij},\Gamma^i{}_{0j},\Gamma^0{}_{00},\Gamma^i{}_{jk}$ を[Levi-Civita接続の成分表示](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)から求め、$a=e^{b\tau}$（$b$ は定数）へ代入せよ。

<!-- solution-start -->
**詳細解答。** $h_{ij}=a^2\delta_{ij}$、$h^{ij}=a^{-2}\delta^{ij}$、$\partial_0h_{ij}=2a\dot a\delta_{ij}$、$\partial_kh_{ij}=0$ です。[接続の座標公式](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)へ代入すると

$$
\Gamma^0{}_{ij}=\frac12(-1)(-2a\dot a\delta_{ij})
=a\dot a\delta_{ij},
\quad \Gamma^i{}_{0j}=\frac12a^{-2}\delta^{i\ell}(2a\dot a\delta_{\ell j})
=\frac{\dot a}{a}\delta^i_j.
$$

$g_{00}$ は定数、$g_{0i}$ は零なので $\Gamma^0{}_{00}=0$。$\Gamma^i{}_{jk}$ は $\partial_jg_{\ell k}$ 等の空間微分だけからなり零です。$a=e^{b\tau}$ では $\dot a=be^{b\tau}$ より $\Gamma^0{}_{ij}=be^{2b\tau}\delta_{ij}$、$\Gamma^i{}_{0j}=b\delta^i_j$ です。$b=0$ のとき全成分が零になることも確認できます。
<!-- solution-end -->

<a id="ex-gr42-a02"></a>

### GR42-A02 Ricciの時間成分とスカラー曲率
- Level: A

$a(\tau)=A\tau^q$（$A>0,\tau>0,q\in\mathbb R$）、$k=0$ とする。$H,\dot H,R_{00},R$ を求め、$q=1/2$ でスカラー曲率が零になるがRicciテンソルは零でないことを確認せよ。

<!-- solution-start -->
**詳細解答。** $\dot a=Aq\tau^{q-1}$ なので $H=q/\tau$、$\dot H=-q/\tau^2$ です。[Ricciの命題](#prop-gr42-flrw-curvature)へ $k=0$ を代入すると

$$
R_{00}=-3\frac{q^2-q}{\tau^2},\qquad
R=6\frac{-q+2q^2}{\tau^2}=\frac{6q(2q-1)}{\tau^2}.
$$

$q=1/2$ の場合 $R=0$ ですが $R_{00}=-3(1/4-1/2)/\tau^2=3/(4\tau^2)\ne0$ です。スカラー曲率はRicciの縮約であり、一つの成分が零とは限りません。さらに空間成分は $R_{ij}=(\dot H+3H^2)h_{ij}=[-1/2+3/4]h_{ij}/\tau^2=h_{ij}/(4\tau^2)$ で非零です。
<!-- solution-end -->

<a id="ex-gr42-a03"></a>

### GR42-A03 時間成分を初期値制約と照合する
- Level: A

$k=+1$、$a=2$、$H=1/4$ とする一時刻のFLRWデータについて、$G_{00}$ と $\mathcal R^{(3)}+K^2-K_{ij}K^{ij}$ を求めよ。$\Lambda=0$ とすると制約を満たす密度 $\rho$ はいくつか。$\ddot a$ まで決定できるか説明せよ。

<!-- solution-start -->
**詳細解答。** $H^2=1/16$、$k/a^2=1/4$ です。[FLRWのRicciから得たEinsteinテンソル](#thm-gr42-friedmann)より

$$
G_{00}=3\left(\frac1{16}+\frac14\right)=\frac{15}{16}.
$$

[GR41の空間幾何](../GR41/index.md#prop-gr41-flrw-kinematics)から $\mathcal R^{(3)}=6/4=3/2$、$K=3/4$、$K_{ij}K^{ij}=3/16$ です。よって

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
=\frac32+\frac9{16}-\frac3{16}=\frac{30}{16}=2G_{00}.
$$

$\Lambda=0$ のFriedmann制約は $8\pi\rho=G_{00}=15/16$ より $\rho=15/(128\pi)$ です。初期データだけでは圧力 $p$ が指定されておらず、加速式の $\ddot a/a=-4\pi(\rho+3p)/3$ は決まりません。制約を満たすことと時間発展を決めることは別です。
<!-- solution-end -->

<a id="ex-gr42-a04"></a>

### GR42-A04 共動体積と放射密度
- Level: A

$a(\tau)$ が正で、$V=V_0(a/a_0)^3$ の共動領域に $p=\rho/3$ の流体を入れる。保存式から $\rho(a)$ と $\rho V$ を求め、$a$ が2倍になったとき体積、密度、領域内エネルギーが何倍になるか答えよ。

<!-- solution-start -->
**詳細解答。** [FLRW流体保存](#prop-gr42-fluid-continuity)は $\dot\rho+3H(\rho+\rho/3)=\dot\rho+4H\rho=0$ です。$H=\dot a/a$ を代入すると

$$
\frac{d}{d\tau}(\rho a^4)=a^4(\dot\rho+4H\rho)=0.
$$

従って $\rho=\rho_0(a/a_0)^{-4}$、$\rho V=\rho_0V_0(a/a_0)^{-1}$ です。$a/a_0=2$ のとき $V/V_0=2^3=8$、$\rho/\rho_0=2^{-4}=1/16$、$(\rho V)/(\rho_0V_0)=8/16=1/2$。体積の増大だけでなく圧力仕事によるエネルギー変化を含んでいます。
<!-- solution-end -->

<a id="ex-gr42-a05"></a>

### GR42-A05 加速条件と宇宙項の符号
- Level: A

$\Lambda=0,\rho>0$ で $p=w\rho$ とする。$\ddot a$ の符号を $w=0,1/3,-1/3,-1$ で判定し、$\Lambda>0$ では加速の条件がどう変わるかを示せ。$a>0$ とする。

<!-- solution-start -->
**詳細解答。** [Friedmann加速式](#thm-gr42-friedmann)から

$$
\frac{\ddot a}{a}=-\frac{4\pi\rho}{3}(1+3w)+\frac\Lambda3.
$$

$a,\rho>0$ より $\Lambda=0$ では $1+3w$ の符号を反転して読めます。$w=0$ は $1>0$ で減速、$w=1/3$ は $2>0$ で減速、$w=-1/3$ は零で等速（$\ddot a=0$）、$w=-1$ は $-2<0$ で加速です。$\Lambda>0$ では $\ddot a>0$ と $\Lambda>4\pi\rho(1+3w)$ が同値です。$w=-1$ の真空型流体と幾何側の $\Lambda$ を両方置くなら、それぞれ別の成分として数えているか確認する必要があります。
<!-- solution-end -->

### Level B：複数の方程式を結び、偽の逆推論を見抜く

<a id="ex-gr42-b01"></a>

### GR42-B01 空間Einstein成分を再導出する
- Level: B

$R_{00}=-3(\dot H+H^2)$、$R_{ij}=(\dot H+3H^2+2k/a^2)h_{ij}$ から、(1) $R$、(2) $G_{ij}$、(3) $G_{ij}+\Lambda h_{ij}=8\pi p h_{ij}$ と時間制約を用いた $\dot H$ の式、(4) 加速式の順に導け。$a>0$、$h$ は正定値とする。

<!-- solution-start -->
**詳細解答。** $h^{ij}h_{ij}=3$ と $g^{00}=-1$ なので

$$
\begin{aligned}
R&=-R_{00}+h^{ij}R_{ij}\\
&=3(\dot H+H^2)+3(\dot H+3H^2+2k/a^2)\\
&=6(\dot H+2H^2+k/a^2).
\end{aligned}
$$

$G_{ij}=R_{ij}-Rh_{ij}/2$ に代入すると

$$
G_{ij}=[\dot H+3H^2+2k/a^2-3\dot H-6H^2-3k/a^2]h_{ij}
=-(2\dot H+3H^2+k/a^2)h_{ij}.
$$

従って空間方程式から $2\dot H+3H^2+k/a^2=\Lambda-8\pi p$。時間制約の3倍 $3H^2+3k/a^2=8\pi\rho+\Lambda$ を差し引くと $2\dot H-2k/a^2=-8\pi(\rho+p)$、従って $\dot H=k/a^2-4\pi(\rho+p)$ です。最後に

$$
\begin{aligned}
\ddot a/a&=\dot H+H^2\\
&=k/a^2-4\pi(\rho+p)+8\pi\rho/3+\Lambda/3-k/a^2\\
&=-4\pi(\rho+3p)/3+\Lambda/3.
\end{aligned}
$$

$h_{ij}$ の係数比較は $h$ が非退化であることを使い、$H$ では割っていません。
<!-- solution-end -->

<a id="ex-gr42-b02"></a>

### GR42-B02 塵・放射の解を二度検算する
- Level: B

$k=\Lambda=0$、$\rho>0$、一定 $w>-1$ の膨張解を考える。保存式と制約式を積分して $a,\rho$ を求め、$w=0,1/3$ の二例で $\ddot a/a$ と $-4\pi(\rho+3p)/3$ を数値係数まで比較せよ。時間原点は $\tau_B$ とする。

<!-- solution-start -->
**詳細解答。** [密度スケーリング](#prop-gr42-fluid-continuity)から $\rho=Ca^{-n}$、$n=3(1+w)>0$、$C>0$。[Friedmann制約](#thm-gr42-friedmann)は $(\dot a/a)^2=(8\pi C/3)a^{-n}$ です。膨張枝では $D=\sqrt{8\pi C/3}>0$ とすると $\dot a=Da^{1-n/2}$。$a>0$ なので連鎖律を適用でき、

$$
\frac{d}{d\tau}\left(a^{n/2}\right)
=\frac n2 a^{n/2-1}\dot a=\frac{nD}{2}.
$$

従って $a^{n/2}=nD(\tau-\tau_B)/2$、$a=A(\tau-\tau_B)^{2/n}$、$H=2/[n(\tau-\tau_B)]$、$\rho=3H^2/(8\pi)$ です。$\tau>\tau_B$ は $a>0$ と $nD>0$ から従います。

$s=\tau-\tau_B>0$ と書きます。塵 $n=3,w=0$ では $a=As^{2/3}$、$\rho=1/(6\pi s^2)$ です。二階微分と加速式の右辺を別々に計算すると

$$
\frac{\ddot a}{a}=\frac23\left(-\frac13\right)s^{-2}
=-\frac2{9s^2},\qquad
-\frac{4\pi}{3}\rho=-\frac{4\pi}{3}\frac{1}{6\pi s^2}
=-\frac2{9s^2}.
$$

放射 $n=4,w=1/3$ では $a=As^{1/2}$、$\rho=3/(32\pi s^2)$、$p=\rho/3$ です。したがって

$$
\frac{\ddot a}{a}=\frac12\left(-\frac12\right)s^{-2}
=-\frac1{4s^2},\qquad
-\frac{4\pi}{3}(\rho+3p)=-\frac{8\pi}{3}\rho
=-\frac{8\pi}{3}\frac3{32\pi s^2}=-\frac1{4s^2}.
$$

両解は制約と発展式の両方を満たします。
<!-- solution-end -->

<a id="ex-gr42-b03"></a>

### GR42-B03 制約の伝播と静的な偽解
- Level: B

$F=H^2+k/a^2-8\pi\rho/3-\Lambda/3$ とする。次の問いに答えよ。

1. 保存式と $\dot H-k/a^2=-4\pi(\rho+p)$ から $\dot F=0$ を示せ。
2. $a=a_0,k=+1,\rho=3/(8\pi a_0^2),p=0,\Lambda=0$ を代入し、制約・保存式と発展式の合否を別々に判定せよ。
3. なぜ「制約と保存から発展式が従う」という証明に穴があるのか述べよ。

<!-- solution-start -->
**詳細解答。** $d(k/a^2)/d\tau=-2kH/a^2$ なので

$$
\begin{aligned}
\dot F&=2H\dot H-2kH/a^2-8\pi\dot\rho/3\\
&=2H[-4\pi(\rho+p)]-8\pi[-3H(\rho+p)]/3=0.
\end{aligned}
$$

静的な候補では $H=\dot H=0$ です。制約左辺 $H^2+k/a^2=1/a_0^2$、右辺 $8\pi\rho/3=1/a_0^2$ で一致します。保存は $\dot\rho+3H(\rho+p)=0$ です。しかし発展式左辺は $\dot H-k/a^2=-1/a_0^2$、右辺は $-4\pi\rho=-3/(2a_0^2)$ で不一致です。制約を微分して得られるのは $2H[\dot H-k/a^2+4\pi(\rho+p)]=0$ のみで、ここで $H=0$ による零積を $H$ で割る操作は不正です。
<!-- solution-end -->

<a id="ex-gr42-b04"></a>

### GR42-B04 非平坦な真空宇宙とMilneとの対照
- Level: B

$\rho=p=0$、$\Lambda=3b^2$、$b>0$ とする。$k=+1$ で $a=b^{-1}\cosh(b\tau)$、$k=-1$ で $a=b^{-1}\sinh(b\tau)$（$\tau>0$）をそれぞれ制約式・加速式へ代入せよ。さらに $\Lambda=0,k=-1,a=\tau$ との違いを述べよ。

<!-- solution-start -->
**詳細解答。** $k=+1$ の場合 $\dot a=\sinh(b\tau)$、$H=b\tanh(b\tau)$、$1/a^2=b^2/\cosh^2(b\tau)$ なので

$$
H^2+\frac1{a^2}=b^2\left(\tanh^2(b\tau)+\frac1{\cosh^2(b\tau)}\right)=b^2=\Lambda/3.
$$

$\ddot a=b\cosh(b\tau)$、$\ddot a/a=b^2$ で加速式も成立します。$k=-1$ なら $\dot a=\cosh(b\tau)$、$H=b\coth(b\tau)$、$1/a^2=b^2/\sinh^2(b\tau)$ なので

$$
H^2-\frac1{a^2}=b^2\left(\coth^2(b\tau)-\frac1{\sinh^2(b\tau)}\right)=b^2.
$$

$\ddot a=b\sinh(b\tau)$ より再び $\ddot a/a=b^2$ です。Milneは $\Lambda=0,k=-1,a=\tau$ で $H^2-1/a^2=\tau^{-2}-\tau^{-2}=0$、$\ddot a/a=0$。前二例は正の宇宙項が加速を作るのに対し、MilneはMinkowski時空を負曲率の空間面で切っただけです。
<!-- solution-end -->

### Level C：異なる物質成分の歴史を一つにつなぐ

<a id="ex-gr42-c01"></a>

### GR42-C01 塵・放射・宇宙項の共存と加速への転換
- Level: C

$k=0$、$a(\tau_0)=1$ の膨張FLRW宇宙を考える。相互にエネルギーを交換しない塵と放射の密度を $\rho_m,\rho_r$、圧力をそれぞれ $0,\rho_r/3$ とし、一定の正の宇宙項 $\Lambda$ を幾何側へ置く。基準時刻で $M=(8\pi/3)\rho_m(\tau_0)>0$、$Q=(8\pi/3)\rho_r(\tau_0)>0$、$L=\Lambda/3>0$ とする。

1. 二成分が個別に流体保存式を満たすとき、$\rho_m(a),\rho_r(a)$ と $H^2(a)$ を求めよ。
2. $\ddot a/a$ を $M,Q,L,a$ で表し、$q=-\ddot a/(aH^2)$（$H\ne0$ で定義する減速パラメータ）の式を導け。
3. 両密度が等しい尺度因子を求め、加速への転換を決める方程式を示せ。転換が正の尺度因子でちょうど一度起こることを証明せよ。
4. $M=Q=L=1$ とした模型で $a=1$ の $H^2,q$ を求め、$a=2$ では加速しているか判定せよ。
5. 真空密度 $\rho_\Lambda=\Lambda/(8\pi)$ を右辺へ移した場合、何を変更すべきか説明せよ。

<!-- solution-start -->
**詳細解答。**

**（1）** [個々の流体保存命題](#prop-gr42-fluid-continuity)に塵の $w=0$、放射の $w=1/3$ を適用すると、相互作用がない仮定から

$$
\rho_m(a)=\rho_m(\tau_0)a^{-3},\qquad
\rho_r(a)=\rho_r(\tau_0)a^{-4}.
$$

$a(\tau_0)=1$ を用いました。全密度は $\rho=\rho_m+\rho_r$、全圧力は $p=\rho_r/3$ です。$k=0$ なので[Friedmann制約](#thm-gr42-friedmann)から

$$
\boxed{H^2(a)=\frac{M}{a^3}+\frac{Q}{a^4}+L.}
$$

各項が正なので $H^2>0$、膨張枝なら $H=+\sqrt{M/a^3+Q/a^4+L}$ と選び、全時刻で $H\ne0$ です。

**（2）** 加速式に $\rho+3p=\rho_m+\rho_r+\rho_r=\rho_m+2\rho_r$ を代入すると

$$
\boxed{\frac{\ddot a}{a}=-\frac{M}{2a^3}-\frac{Q}{a^4}+L.}
$$

実際 $-4\pi\rho_m/3=-(M/2)a^{-3}$、$-8\pi\rho_r/3=-Qa^{-4}$ です。$q=-\ddot a/(aH^2)$ の定義と上の $H^2$ を用い

$$
q(a)=\frac{M/(2a^3)+Q/a^4-L}{M/a^3+Q/a^4+L}.
$$

**（3）** 密度比 $\rho_m/\rho_r=(M/Q)a$ なので等密度は $a_{\mathrm{eq}}=Q/M>0$ です。加速への転換は $\ddot a=0$ と同値で、$a^4>0$ を掛けて

$$
f(a):=La^4-\frac M2a-Q=0.
$$

$f(0)=-Q<0$、$a\to\infty$ で $f(a)\to\infty$ なので正の根が少なくとも一つあります。導関数は

$$
f'(a)=4La^3-\frac M2,\qquad a_*=\left(\frac{M}{8L}\right)^{1/3}>0.
$$

$0<a<a_*$ で導関数は負、$a>a_*$ では正です。従って $f$ はまず減少して負の最小値に達し、以後単調増加して一度だけ零を横切ります。加速転換は一意です。この転換尺度は、一般には等密度尺度 $Q/M$ と一致しません。

**（4）** $M=Q=L=1,a=1$ では $H^2=1+1+1=3$、$\ddot a/a=-1/2-1+1=-1/2$ なので $q=(-\ddot a/a)/H^2=(1/2)/3=1/6$。$a=2$ では $\ddot a/a=-1/(2\cdot8)-1/16+1=1-1/16-1/16=7/8>0$ で加速しています。

**（5）** 幾何側の $\Lambda$ を消して、全密度を $\rho_m+\rho_r+\rho_\Lambda$、全圧力を $\rho_r/3-\rho_\Lambda$ と書き換えます。$8\pi\rho_\Lambda/3=\Lambda/3=L$ となるので、制約式・加速式の $L$ 項をそれぞれ同じ形で再現できます。**$\Lambda$ と $\rho_\Lambda$ を両方足すと二重計上**になります。
<!-- solution-end -->
