# SREL9 共変形式の総合演習と適用限界

<!-- definition-example-audit: strict -->

一つの運動を異なる慣性系から計算しても、出来事の可否や保存則の成否は変わりません。ただし、**座標を変えても成り立つ式**と、**物理的な模型の仮定を変えても成り立つ式**は別物です。例えば、四元運動量をLorentz変換することはできますが、孤立していない物体の四元運動量まで保存するとは限りません。また、真空のMaxwell方程式を使えることと、任意の物質中でも同じ構成則が成り立つことは違います。

これまでの[SREL1のLorentz変換](../SREL1/index.md#thm-srel1-lorentz)、[SREL3の質量殻](../SREL3/index.md#thm-srel3-mass-shell)、[SREL5のMaxwell共変形式](../SREL5/index.md#thm-srel5-covariance)、[SREL6の電磁場の収支](../SREL6/index.md#thm-srel6-field-balance)、[SREL7の完全流体](../SREL7/index.md#def-srel7-perfect-fluid)、[SREL8のRindler因果構造](../SREL8/index.md#thm-srel8-causal-domain)を、一連の問題として接続します。

四次元Minkowski時空で $x^\mu=(ct,x,y,z)$、$c>0$、計量 $g_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)$、$x^0=ct$、$\partial_0=c^{-1}\partial_t$ を固定します。ギリシャ添字は $0,1,2,3$ を走り、重複添字を縮約します。一次元boostの速さ $w$ は $|w|<c$ とし、$\beta=w/c$、$\Gamma=(1-\beta^2)^{-1/2}$ と書きます。流体、電磁場、粒子を同時に扱う場合にも、どの量が粒子単体のものか、どの量が系全体のものかを指定します。

## 1. 孤立系の四元運動量は何を保存するか

衝突で物体がくっつくと、運動エネルギーの一部は内部エネルギーに変わります。「運動エネルギーが減ったからエネルギー保存が破れた」とは言えません。全エネルギーと全運動量をまとめるには、個々の粒子の[SREL3の四元運動量](../SREL3/index.md#def-srel3-four-momentum)を足します。

ここで、**系の総四元運動量**とは、相互作用前後の各段階で、同一慣性系の同一時刻で数えたすべての構成物の四元運動量の和です。孤立系とは、比較する期間に外部とのエネルギー・運動量交換がなく、放射などの流出分も系へ含めた模型を指します。各構成物の質量を単純に足した値は、系の不変質量とは一般に異なります。

<a id="def-srel9-system-momentum"></a>

<!-- formal-statement-start -->
> **定義（孤立系の総四元運動量と不変質量）**  
> 平坦時空で、ある衝突前後に全構成物を含む系を考える。各段階で同じ慣性系における全四元運動量を $P^\mu=(E_{\rm tot}/c,\boldsymbol p_{\rm tot})$ とする。$P^\mu$ が未来向き時間的なら、系の不変質量 $M>0$ を
>
> $$
> M^2c^2=P_\mu P^\mu
> =\frac{E_{\rm tot}^2}{c^2}-|\boldsymbol p_{\rm tot}|^2
> $$
>
> で定義する。未来向き光的なら $M=0$ とする。四元運動量保存は全構成物を含めた $P^\mu_{\rm before}=P^\mu_{\rm after}$ の意味で用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel9-system-momentum -->
### 直接例：向かい合う二光子

**定義の確認**：エネルギー $K>0$ の二つの光子が $+x$ と $-x$ に進むなら、それぞれの四元運動量は $(K/c,K/c,0,0)$、$(K/c,-K/c,0,0)$ です。和は $P=(2K/c,0,0,0)$ で未来向き時間的、したがって $M^2c^2=4K^2/c^2$ から $M=2K/c^2>0$ です。各光子は質量ゼロでも、二光子系の不変質量は正です。
<!-- definition-example-end -->

<a id="thm-srel9-composite-mass"></a>

<!-- formal-statement-start -->
> **定理（総四元運動量と不変質量の慣性系不変性）**  
> 四次元Minkowski時空で、有限個の構成物の四元運動量 $p_i^\mu$ が、同じ慣性系で $P^\mu=\sum_i p_i^\mu$ を与えるとする。すべての構成物に同じLorentz変換 $\Lambda$ を作用させると $P'^\mu=\Lambda^\mu{}_\nu P^\nu$ となり、$P'_\mu P'^\mu=P_\mu P^\mu$ が成り立つ。さらに衝突前後で総四元運動量が保存し、放出物を漏れなく含むなら、この等式はどの慣性系でも保存する。
<!-- formal-statement-end -->

### 証明の見取り図

和の線形性と[Minkowski計量のLorentz不変性](../SREL2/index.md#thm-srel2-interval-invariance)を別々に使います。**各粒子のエネルギーがそれぞれ保存する**という主張は必要ありません。

<!-- proof-start -->
### 証明

同じ変換を各 $p_i$ に適用するので、有限和を交換して

$$
P'^\mu=\sum_i p_i'{}^\mu
=\sum_i\Lambda^\mu{}_\nu p_i^\nu
=\Lambda^\mu{}_\nu\sum_i p_i^\nu
=\Lambda^\mu{}_\nu P^\nu.
$$

Lorentz行列の定義 $\Lambda^\rho{}_\mu g_{\rho\sigma}\Lambda^\sigma{}_\nu=g_{\mu\nu}$ から

$$
\begin{aligned}
g_{\rho\sigma}P'^\rho P'^\sigma
&=g_{\rho\sigma}\Lambda^\rho{}_\mu P^\mu
\Lambda^\sigma{}_\nu P^\nu\\
&=(\Lambda^\rho{}_\mu g_{\rho\sigma}\Lambda^\sigma{}_\nu)
P^\mu P^\nu
=g_{\mu\nu}P^\mu P^\nu.
\end{aligned}
$$

衝突前後の和を $P_{\rm b},P_{\rm a}$ とすると、孤立系で $P_{\rm b}=P_{\rm a}$。両辺へ同一の $\Lambda$ を作用させれば $\Lambda P_{\rm b}=\Lambda P_{\rm a}$ なので、変換後の系でも四元運動量が保存します。光や外力へ渡った四元運動量を和に入れなければ、最初の保存の仮定そのものが失われます。
<!-- proof-end -->

実際に質量 $m>0$ の二粒子が $x$ 方向へ速さ $v$ と $-v$ で衝突し、外へ何も放射せず結合した場合を考えます。$|v|<c$、$\gamma_v=(1-v^2/c^2)^{-1/2}$ とすると、

$$
p_1^\mu=(\gamma_v mc,\gamma_v mv,0,0),\qquad
p_2^\mu=(\gamma_v mc,-\gamma_v mv,0,0).
$$

よって $P=(2\gamma_v mc,0,0,0)$、結合体はこの系で静止し、静止質量は $M=2\gamma_v m$ です。$2m$ との差 $(M-2m)c^2=2(\gamma_v-1)mc^2$ が内部エネルギーとして残ります。「非弾性衝突だから結合後の静止質量は $2m$」と置くのは、保存される全エネルギーを消してしまう誤りです。

この系を $+x$ 方向へ速さ $w$ で動く別の慣性系から見れば、[Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)に対応して

$$
\begin{aligned}
P'^0&=\Gamma(P^0-\beta P^1)=2\Gamma\gamma_v mc,\\
P'^1&=\Gamma(P^1-\beta P^0)=-2\Gamma\gamma_v m w.
\end{aligned}
$$

この系での結合体の速度は $cP'^1/P'^0=-w$ であり、不変ノルムは $(P'^0)^2-(P'^1)^2=4\gamma_v^2m^2c^2$ と一致します。

## 2. 電磁波・Maxwell方程式・エネルギー流を一度につなぐ

場の共変性を確認するだけでは、場が本当に真空Maxwell方程式を解くかは決まりません。そこで $u=x-ct$ を進行波の変数とし、微分可能な実関数 $f(u)$ で電場と磁場を次のように作ります。$f$ の次元は電場の強さで、$f$ が定数なら進行波ではなく一様場になります。

<a id="prop-srel9-plane-wave"></a>

<!-- formal-statement-start -->
> **命題（真空平面波の方程式と局所エネルギー保存）**  
> SI単位系で $\epsilon_0,\mu_0>0$、$\epsilon_0\mu_0c^2=1$ とし、$f\in C^1(\mathbb R)$ とする。電荷と電流のないMinkowski時空で
>
> $$
> \boldsymbol E=(0,f(x-ct),0),\qquad
> \boldsymbol B=(0,0,f(x-ct)/c)
> $$
>
> と置けば、真空Maxwell方程式の四つの三次元表示を満たす。電磁場のエネルギー密度とPoynting流は
>
> $$
> u_{\rm em}=\epsilon_0 f(x-ct)^2,\qquad
> \boldsymbol S=(cu_{\rm em},0,0)
> $$
>
> となり、$\partial_tu_{\rm em}+\partial_xS_x=0$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

微分する変数 $u=x-ct$ の時間微分は $-c$、空間微分は $+1$ です。偏微分の符号を先に固定してから、Maxwell方程式の各成分とエネルギー流を個別に計算します。

<!-- proof-start -->
### 証明

$f'=df/du$ と書くと、連鎖律から

$$
\partial_xf(x-ct)=f'(u),\qquad
\partial_tf(x-ct)=-cf'(u).
$$

$\boldsymbol E$ の $y$ 成分は $y$ に依存せず、$\boldsymbol B$ の $z$ 成分も $z$ に依存しません。従って $\nabla\cdot\boldsymbol E=\nabla\cdot\boldsymbol B=0$。回転の非零候補は

$$
(\nabla\times\boldsymbol E)_z=\partial_x E_y=f'(u),
\qquad
(\nabla\times\boldsymbol B)_y=-\partial_x B_z=-\frac{f'(u)}c.
$$

一方で時間微分は

$$
-\partial_tB_z=-\frac1c(-cf'(u))=f'(u),\qquad
\frac1{c^2}\partial_tE_y=\frac1{c^2}(-cf'(u))=-\frac{f'(u)}c.
$$

よって[真空Maxwell方程式](../SREL5/index.md#principle-srel5-maxwell-si)のFaraday則とAmpère–Maxwell則も成立します。また $\boldsymbol E\cdot\boldsymbol B=0$、$E^2-c^2B^2=f^2-f^2=0$ なので[電磁場の不変量](../SREL6/index.md#prop-srel6-field-invariants)の両方が零です。

[SREL6のエネルギー密度・Poynting流の公式](../SREL6/index.md#thm-srel6-components)へ代入します。$\mu_0^{-1}=\epsilon_0c^2$ に注意して

$$
\begin{aligned}
u_{\rm em}
&=\frac12\epsilon_0|\boldsymbol E|^2+
\frac1{2\mu_0}|\boldsymbol B|^2\\
&=\frac12\epsilon_0f^2+
\frac12\epsilon_0c^2\frac{f^2}{c^2}
=\epsilon_0f^2,\\
S_x&=\frac{(\boldsymbol E\times\boldsymbol B)_x}{\mu_0}
=\frac{f^2}{\mu_0c}=c\epsilon_0f^2.
\end{aligned}
$$

最後に $f^2$ の微分を省略せず、

$$
\partial_tu_{\rm em}
=2\epsilon_0 f f'(-c),\qquad
\partial_xS_x=2c\epsilon_0 f f'(1),
$$

を足すと零です。これは[場の局所エネルギー運動量収支](../SREL6/index.md#thm-srel6-field-balance)の時間成分の具体的な確認です。
<!-- proof-end -->

ここで平面波 $f(x-ct)$ は $y,z$ に一様なので、無限空間全体の電磁エネルギー積分が有限とは限りません。局所微分方程式だけから「全空間エネルギーが有限で保存」と言うには、境界流束の消失と積分可能性がさらに必要です。一方、単位断面積当たりのエネルギーを有限な $x$ 区間で追うことはできます。

同じ波を $+x$ 方向へ速さ $w$ で動く慣性観測者が測ると、[電磁場のboost式](../SREL6/index.md#prop-srel6-boost-fields)により

$$
E'_y=\Gamma(E_y-wB_z)=D f(u),\quad
B'_z=\Gamma\left(B_z-\frac{w}{c^2}E_y\right)=\frac{D f(u)}c,
\quad D=\Gamma(1-\beta)>0.
$$

従って $u'_{\rm em}=\epsilon_0D^2 f(u)^2=D^2u_{\rm em}$ です。座標変換 $ct'=\Gamma(ct-\beta x)$、$x'=\Gamma(x-\beta ct)$ の逆式を使えば

$$
x-ct=\Gamma(1-\beta)(x'-ct')=D(x'-ct')
$$

なので、新しい系でも右向きに速さ $c$ で進む波の形です。ここでは $D$ が**場の振幅**に一回、**エネルギー密度**に二回かかることを区別します。

## 3. 保存則の「局所」と「全体」を取り違えない

[SREL5の局所電荷保存](../SREL5/index.md#thm-srel5-continuity)は、場の式と電流が十分滑らかで偏微分を交換できる場合に、四元表示から導かれます。しかし局所方程式を空間全体で積分するときは、無限遠または領域の境界を通る流出も数えなければなりません。

<a id="prop-srel9-flux-balance"></a>

<!-- formal-statement-start -->
> **命題（局所保存から有限領域の収支）**  
> 静止した有界領域 $\Omega\subset\mathbb R^3$ の境界が区分的に滑らかで、$\rho,\boldsymbol j$ が必要な空間・時間微分を持ち、$\partial_t\rho+\nabla\cdot\boldsymbol j=0$ を満たすとする。境界の外向き単位法線を $\boldsymbol n$ とすると、
>
> $$
> \frac{d}{dt}\int_\Omega\rho\,d^3x
> =-\int_{\partial\Omega}\boldsymbol j\cdot\boldsymbol n\,dA.
> $$
>
> 右辺が零なら領域内の総電荷は一定である。一般の開いた領域で右辺が非零なら、領域内電荷は変化する。
<!-- formal-statement-end -->

### 証明の見取り図

局所式を積分し、領域を時間とともに動かさない仮定の下で時間微分を積分の外へ出します。その後に発散定理を使います。

<!-- proof-start -->
### 証明

時刻を固定して局所保存式を $\Omega$ で積分すると

$$
\int_\Omega\partial_t\rho\,d^3x+
\int_\Omega\nabla\cdot\boldsymbol j\,d^3x=0.
$$

時間と無関係な有界領域上で仮定した正則性により第一項は $d(\int_\Omega\rho\,d^3x)/dt$。第二項に[発散定理](../../../../幾何系/VC/VC4/index.md#thm-vc4-divergence)を適用すると境界積分です。移項して所要の式を得ます。$\partial_t\rho+\nabla\cdot\boldsymbol j=0$ は局所の生成消滅がないことを表しますが、境界流出を禁止する式ではありません。
<!-- proof-end -->

例えば長さ $L>0$、断面積 $A>0$ の細長い箱を $+x$ 方向へ一様な流れが通過するとき、流入・流出が等しければ箱内電荷は一定です。片側の電流だけを零とするのは、箱を孤立系にしたのではなく、境界条件を変更したことです。

物質と電磁場が運動量を交換する場合も同じです。[電磁場側の収支](../SREL6/index.md#thm-srel6-field-balance)を $\partial_\mu T_{\rm em}^{\mu\nu}=-f^\nu$ と書けば、物質側の $\partial_\mu T_{\rm mat}^{\mu\nu}=f^\nu$ が成り立つ模型では

$$
\partial_\mu(T_{\rm em}^{\mu\nu}+T_{\rm mat}^{\mu\nu})
=-f^\nu+f^\nu=0.
$$

ここで $f^\nu$ は場が物質へ与える四元力密度です。場だけの運動量は外部に見える物質へ渡りうるため、一般には保存しません。完全流体の四元力への応答は[SREL7の局所収支](../SREL7/index.md#thm-srel7-fluid-balance)と結びつきます。

## 4. 適用限界を、失った仮定から診断する

数学的に正しい式でも、仮定を失うと同じ論証は使えません。次の四点を、単なる注意書きでなく式によって比較します。

### 4.1 低速近似は「光速度を無限にする操作」と同じではない

[SREL3の運動エネルギー](../SREL3/index.md#prop-srel3-kinetic-energy)について $q=v^2/c^2$ が小さければ、$\gamma_v=(1-q)^{-1/2}=1+q/2+3q^2/8+O(q^3)$。従って

$$
\begin{aligned}
E&=\gamma_v mc^2
=mc^2+\frac12mv^2+\frac{3mv^4}{8c^2}+O(mv^6/c^4),\\
p&=\gamma_v mv=mv+\frac{mv^3}{2c^2}+O(mv^5/c^4).
\end{aligned}
$$

近似は $|v|/c\ll1$ の質量を持つ粒子について有効です。光子では $v=c$、$\gamma_v$ は定義されず、この展開を使えません。また静止エネルギー $mc^2$ を一律に零とみなしたのではありません。差 $E-mc^2$ が古典的運動エネルギーの先頭項になります。

### 4.2 真空の場と物質中の場

先ほどの波の解は $\rho=0,\boldsymbol j=\boldsymbol0$、$\epsilon_0\mu_0c^2=1$ を使いました。誘電体の分極や導体内の電流があれば、$\nabla\times\boldsymbol B=\mu_0\boldsymbol j+c^{-2}\partial_t\boldsymbol E$ の右辺に電流が入り、真空波の計算で消えた項が残ります。Lorentz共変な書き方は保てても、**源と構成則を指定せず同じ解を主張できません**。

さらに四元電流 $J^\mu=(c\rho,\boldsymbol j)$ が保存式を満たさないなら、[Maxwell方程式からの電荷保存](../SREL5/index.md#thm-srel5-continuity)との整合性が失われます。任意の $\rho,\boldsymbol j$ を指定して、解が必ず存在すると言うこともできません。

### 4.3 加速座標の地平線と有限時間の加速

[Rindlerの通信可能条件](../SREL8/index.md#thm-srel8-causal-domain)では、世界線が全固有時にわたり $U_O=s_0e^{-a\tau/c}>0$ を保ち、$\tau\to\infty$ で $U_O\downarrow0$ となることが必要でした。未来のある時刻から慣性運動へ切り替えたロケットでは、この極限が変わります。

具体的に、$s_0=c^2/a$ として $\tau\le0$ は $ct=s_0\sinh(a\tau/c)$、$x=s_0\cosh(a\tau/c)$、$\tau\ge0$ は $ct=c\tau$、$x=s_0$ と続けます。接続点で位置と四元速度は一致し、加速度だけが不連続な理想化です。後半では $U_O=s_0-c\tau$ が零を通って負になります。$P=(ct,x)=(2s_0,0)$ は $U_P=-2s_0<0$ ですが、$R=(4s_0,s_0)$ という後半の世界線上の事象との差は

$$
\Delta(ct)=2s_0,\quad\Delta x=s_0,\quad
(\Delta ct)^2-(\Delta x)^2=3s_0^2>0.
$$

したがって $P$ は $R$ に未来向き時間的信号を送れます。**永遠に加速する世界線**の受信地平線を**有限時間で加速をやめる世界線**へそのまま移してはいけません。この例はRindler計量の計算を否定せず、観測者の世界線という仮定が違うことを示します。

### 4.4 平坦な計量の座標変換と曲率

[Rindler計量](../SREL8/index.md#thm-srel8-metric)には位置依存する係数 $h(\xi)$ が出ますが、元のMinkowski領域への滑らかな逆変換があるため、曲がった時空を新しく仮定したことにはなりません。一般相対論の一般の曲がった時空では、一つのLorentz行列で離れた全事象の計量をまとめてMinkowski形にすることはできません。ここでの平坦時空の大域的な式を、接続・曲率・重力場方程式の証明と取り違えません。

---

## 演習

以下はすべて $g=\operatorname{diag}(1,-1,-1,-1)$、$x^0=ct$ に従います。各問の計算では係数の次元と符号も検算してください。

### Level A

### A1. 二光子の不変質量

エネルギー $K>0$ の二光子が同一直線を逆向きに進む。系の四元運動量 $P$、不変質量 $M$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[系の定義](#def-srel9-system-momentum)に従い

$$
P^\mu=(K/c,K/c,0,0)+(K/c,-K/c,0,0)=(2K/c,0,0,0).
$$

$P_\mu P^\mu=(2K/c)^2$、$M^2c^2=4K^2/c^2$ なので $M=2K/c^2$ です。各光子単体には[SREL3の光的質量殻](../SREL3/index.md#def-srel3-mass-shell)を使いますが、合計は時間的四元ベクトルになります。
<!-- solution-end -->

### A2. boostした衝突系の速さ

総四元運動量 $P=(Mc,0,0,0)$、$M>0$ の系を、$+x$ に速さ $w$ で動く慣性系から見る。$P'^0,P'^1$ と系の速度 $v'$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)で $P'^0=\Gamma(P^0-\beta P^1)=\Gamma Mc$、$P'^1=\Gamma(P^1-\beta P^0)=-\Gamma Mw$。四元運動量の成分定義から $v'=cP'^1/P'^0=-w$ です。不変量は $(P'^0)^2-(P'^1)^2=\Gamma^2M^2(c^2-w^2)=M^2c^2$ と確かめられます。
<!-- solution-end -->

### A3. 進行波の磁場とエネルギー流

$\boldsymbol E=(0,E_0\cos k(x-ct),0)$、$E_0,k>0$ とする。真空の右向き進行波となる $\boldsymbol B$ と、エネルギー密度・Poynting流を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[平面波の命題](#prop-srel9-plane-wave)へ $f(u)=E_0\cos(ku)$ を代入して $\boldsymbol B=(0,0,E_0\cos k(x-ct)/c)$。$\epsilon_0\mu_0c^2=1$ によって

$$
u_{\rm em}=\epsilon_0E_0^2\cos^2k(x-ct),\qquad
S_x=c\epsilon_0E_0^2\cos^2k(x-ct).
$$

$E_y B_z>0$ だから $\boldsymbol E\times\boldsymbol B$ は $+x$ 向きです。単位は $u_{\rm em}$ が $\mathrm{J/m^3}$、$S_x$ が $\mathrm{W/m^2}$ です。
<!-- solution-end -->

### A4. 開いた箱の電荷

一定の電流密度 $\boldsymbol j=(j_0,0,0)$ が面積 $A$ の箱へ左端から入り、右端から同じ値で出るとする。$\partial_t\rho=0$ と整合するか、二つの端面の流束を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

左端の外向き法線は $(-1,0,0)$、右端は $(1,0,0)$。左端の外向き流束は $-j_0A$、右端は $+j_0A$、その他の面では零です。[有限領域の収支](#prop-srel9-flux-balance)より

$$
\frac{dQ}{dt}=-((-j_0A)+(j_0A))=0.
$$

従って $\partial_t\rho=0$ と整合します。$j_0$ 自体が零である必要はありません。
<!-- solution-end -->

### A5. Rindler地平線の前提

$s_0>0$ とし、後半の慣性運動を $ct=c\tau,x=s_0$、$\tau\ge0$ とする。事象 $P=(ct,x)=(2s_0,0)$ について、$U_P=x-ct$ と、$R=(4s_0,s_0)$ への分離の型を調べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$U_P=0-2s_0=-2s_0<0$。$P$ から $R$ への差は $\Delta(ct)=4s_0-2s_0=2s_0>0$、$\Delta x=s_0-0=s_0$ で、

$$
(\Delta ct)^2-(\Delta x)^2=4s_0^2-s_0^2=3s_0^2>0.
$$

[SREL2の因果分類](../SREL2/index.md#def-srel2-causal-types)では未来向き時間的なので $P$ から $R$ に信号が届きます。$U_P>0$ を必要条件とする[SREL8の定理](../SREL8/index.md#thm-srel8-causal-domain)と矛盾しないのは、観測者が永遠には加速しないためです。
<!-- solution-end -->

### Level B

### B1. 完全非弾性衝突後の静止質量

静止質量 $m$ の二粒子が実験室系で速度 $\pm v$、$0<v<c$ で向かい合い、放射を出さずに結合する。結合体の静止質量 $M$ と内部エネルギー増加量を求めよ。初期内部エネルギーは各 $mc^2$ に含める。

- Level: B

<!-- solution-start -->
#### 詳細解答

[SREL3の四元運動量](../SREL3/index.md#def-srel3-four-momentum)から $\gamma_v=(1-v^2/c^2)^{-1/2}$ を用い

$$
P^\mu=(\gamma_vmc,\gamma_vmv,0,0)+
(\gamma_vmc,-\gamma_vmv,0,0)
=(2\gamma_vmc,0,0,0).
$$

孤立して放射を出さないので、結合後の全四元運動量は同じです。[総四元運動量の不変量](#thm-srel9-composite-mass)から $M=2\gamma_v m$、結合体は静止します。粒子の元の静止エネルギーの和 $2mc^2$ を引いた内部エネルギーの増加は

$$
\Delta U=(M-2m)c^2=2(\gamma_v-1)mc^2>0.
$$

これは衝突前の全運動エネルギーと一致します。外へ放射した場合は放射の四元運動量も保存式へ含める必要があります。
<!-- solution-end -->

### B2. 光子吸収で静止質量はどう変わるか

静止質量 $m>0$ の物体が静止しているところへ、エネルギー $K>0$ の $+x$ 向き光子を吸収した。外力・放射がないとして、合体後の物体の静止質量 $M$ と速度 $V$ を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

物体の四元運動量は $(mc,0,0,0)$、光子は $(K/c,K/c,0,0)$。吸収前後の総和は

$$
P^\mu=(mc+K/c,K/c,0,0).
$$

[SREL3の質量殻](../SREL3/index.md#thm-srel3-mass-shell)を合体後の物体に使うと

$$
\begin{aligned}
M^2c^2&=(mc+K/c)^2-(K/c)^2\\
&=m^2c^2+2mK,\\
M&=\sqrt{m^2+\frac{2mK}{c^2}}.
\end{aligned}
$$

速度は $V=cP^1/P^0=Kc/(mc^2+K)$ で、$0<V<c$ です。$M=m+K/c^2$ とはなりません。光子が運動量も持ち、最終物体が運動しているからです。
<!-- solution-end -->

### B3. boostによる波の振幅とエネルギー密度

真空波 $\boldsymbol E=(0,E_0\cos k(x-ct),0)$、$\boldsymbol B=(0,0,E_0\cos k(x-ct)/c)$ に対して、$+x$ 方向の速度 $w$ でboostする。$\beta=w/c$、$\Gamma=(1-\beta^2)^{-1/2}$、$D=\Gamma(1-\beta)$ として、$E'_y$ と $u'_{\rm em}/u_{\rm em}$ を非零の場の点で求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[SREL6のboost式](../SREL6/index.md#prop-srel6-boost-fields)で

$$
\begin{aligned}
E'_y&=\Gamma(E_y-wB_z)
=\Gamma(1-w/c)E_y=DE_y,\\
B'_z&=\Gamma(B_z-wE_y/c^2)
=\frac D c E_y.
\end{aligned}
$$

したがって $u'_{\rm em}=\epsilon_0(E'_y)^2=D^2\epsilon_0E_y^2$、場が零でない点では $u'_{\rm em}/u_{\rm em}=D^2$ です。$w>0$ なら $0<D<1$ なので、波と同方向に動く観測者は小さい振幅と密度を測ります。零点では比は $0/0$ で未定義ですが $u'_{\rm em}=D^2u_{\rm em}$ の等式自体は成立します。
<!-- solution-end -->

### B4. 局所保存と流束境界の判断

区間 $0<x<L$、断面積 $A$ の箱で、左右の外向き電流密度の法線成分をそれぞれ $-j_{\rm in}$、$j_{\rm out}$（両者は時間のみの連続関数）とする。側面を通る流れはない。内部の総電荷 $Q(t)$ が満たす常微分方程式と、$Q$ が一定となる条件を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[局所から有限領域への収支](#prop-srel9-flux-balance)により左右の外向き流束は $-Aj_{\rm in}$、$Aj_{\rm out}$ です。総流束 $A(j_{\rm out}-j_{\rm in})$ を負にしたものが $dQ/dt$ なので

$$
\frac{dQ}{dt}=A(j_{\rm in}(t)-j_{\rm out}(t)).
$$

よって $Q$ が時間区間全体で一定となる必要十分条件は、その区間で $j_{\rm in}(t)=j_{\rm out}(t)$ が成立することです。積分すると

$$
Q(t)-Q(t_0)
=A\int_{t_0}^{t}(j_{\rm in}(s)-j_{\rm out}(s))\,ds.
$$

電流が存在することだけで電荷保存と矛盾するわけではなく、境界を横切る流入・流出の差が箱内の変化です。
<!-- solution-end -->

### Level C

### C1. 衝突・観測系・低速近似の整合性

質量 $m>0$ の二粒子が系 $S$ で $\pm v$（$0<v<c$）で衝突して一体となり、光も外へ出さない。別の慣性系 $S'$ は $S$ に対し $+x$ 方向に速さ $w$（$0<w<c$）で動く。(i) 結合体の不変質量を求め、(ii) $S'$ での結合体のエネルギーと運動量を示し、(iii) 質量殻条件を $S'$ でも検算し、(iv) $v/c\ll1$ で増加した静止エネルギーの先頭項を求めよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

$\gamma_v=(1-v^2/c^2)^{-1/2}$、$\Gamma=(1-w^2/c^2)^{-1/2}$ とします。[孤立系の総四元運動量](#def-srel9-system-momentum)と[質量殻](../SREL3/index.md#thm-srel3-mass-shell)から、衝突前の和は $P=(2\gamma_vmc,0,0,0)$。放出がないため結合後も同じで、(i) $M=2\gamma_vm$ です。

(ii) [Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)を全四元運動量に適用すると

$$
P'^0=\Gamma(P^0-\tfrac wcP^1)=2\Gamma\gamma_vmc,\qquad
P'^1=\Gamma(P^1-\tfrac wcP^0)=-2\Gamma\gamma_vmw.
$$

よって結合後の $S'$ における全エネルギーは $E'=cP'^0=2\Gamma\gamma_vmc^2$、運動量は $p_x'=P'^1=-2\Gamma\gamma_vmw$。$E'$ は静止エネルギー $Mc^2$ ではなく、観測系での全エネルギーです。

(iii) これらを代入して

$$
\begin{aligned}
(E')^2-c^2(p_x')^2
&=4\Gamma^2\gamma_v^2m^2c^4
-4\Gamma^2\gamma_v^2m^2w^2c^2\\
&=4\Gamma^2\gamma_v^2m^2c^4(1-w^2/c^2)\\
&=4\gamma_v^2m^2c^4=M^2c^4.
\end{aligned}
$$

(iv) $q=v^2/c^2\ll1$ と置き、$(1-q)^{-1/2}=1+q/2+3q^2/8+O(q^3)$ なので、結合後に新たに静止質量へ組み込まれたエネルギーは

$$
(M-2m)c^2
=2mc^2(\gamma_v-1)
=mv^2+\frac{3mv^4}{4c^2}+O(mv^6/c^4).
$$

先頭項 $mv^2$ は二粒子の古典的運動エネルギー $2\cdot mv^2/2$ です。低速展開の小さい量は $v/c$ であり、$w/c$ に制限はありません。
<!-- solution-end -->

### C2. 波束の局所収支と観測系

$f\in C^1(\mathbb R)$ はコンパクトな台を持つ実関数で、真空中の電磁場を $\boldsymbol E=(0,f(x-ct),0)$、$\boldsymbol B=(0,0,f(x-ct)/c)$ とする。単位 $yz$ 面積当たりの全エネルギー $\mathcal E(t)=\int_{-\infty}^{\infty}u_{\rm em}(t,x)\,dx$ を考える。(i) 有限で時間に依存しないことを直接示し、(ii) $+x$ 方向へ速さ $w$ でboostした系で $\mathcal E'$ を計算して $\mathcal E'/\mathcal E$ を求め、(iii) 波束が $y,z$ に無限に広い場合の解釈の限界を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[真空波と局所収支](#prop-srel9-plane-wave)から $u_{\rm em}(t,x)=\epsilon_0 f(x-ct)^2$ です。(i) $u=x-ct$ と変数変換すると $dx=du$、積分区間は全実数のままなので

$$
\mathcal E(t)=\epsilon_0\int_{\mathbb R}f(x-ct)^2\,dx
=\epsilon_0\int_{\mathbb R}f(u)^2\,du.
$$

$f$ の台がコンパクトで連続なので右辺は有限、$t$ に依存しません。局所収支で $S_x=cu_{\rm em}$ が境界で消えることとも一致します。

(ii) $D=\Gamma(1-w/c)>0$ と置きます。[波のboost式](../SREL6/index.md#prop-srel6-boost-fields)と座標変換から、$x-ct=D(x'-ct')$、$u'_{\rm em}(t',x')=\epsilon_0D^2 f(D(x'-ct'))^2$。新しい変数 $z=D(x'-ct')$ により $dx'=dz/D$ なので

$$
\begin{aligned}
\mathcal E'(t')
&=\epsilon_0D^2\int_{\mathbb R}f(D(x'-ct'))^2\,dx'\\
&=\epsilon_0D\int_{\mathbb R}f(z)^2\,dz
=D\mathcal E(t).
\end{aligned}
$$

振幅の二乗で密度は $D^2$ 倍ですが、同時刻切片での波束の幅が $1/D$ 倍になるため、積分エネルギーは $D$ 倍です。(iii) この $\mathcal E$ はあくまで**単位横断面積当たり**の量であり、無限の $yz$ 面積まで積分すれば全エネルギーは通常発散します。有限な三次元孤立波束の総四元運動量をこの一様平面波へ無条件に当てはめてはいけません。
<!-- solution-end -->

## 総合確認

共変性は「同じ物理状況を変換しても方程式の形が保たれる」という主張で、保存則は「系が交換しない量がある」という別の主張です。全四元運動量を保存するには、何を系へ含めたかを宣言する必要があります。真空波の計算には源の仮定、有限領域の電荷収支には境界流束、Rindler地平線には永遠の一様加速という世界線の仮定が働きます。どの仮定を外したのかを式の中で見つけられれば、一般相対論や物質中の電磁気学へ進むときにも、平坦時空の結論を誤って拡張せずに済みます。
