# MQFC11 粒子質量とスペクトル測度

[MQFC10](../MQFC10/index.md) では自由場の二点相関を実時間へ移すと、運動量が一枚の質量殻に載ることを確かめました。相互作用がある場合、真空に場を一度作用させただけでも、質量の異なる成分が重なり得ます。本講では二点相関からその重みを正の測度として取り出します。次講で Hilbert 空間全体の質量ギャップを議論する準備です。

直接の前提は [MQFC3](../MQFC3/index.md)、[MQFC9](../MQFC9/index.md)、[MQFC10](../MQFC10/index.md)、[LREP22](../../../代数系/LREP/LREP22/index.md) です。四次元時空、自然単位系、計量 $(-,+,+,+)$、内積は第2引数線形とします。本講でいう Lorentz 変換は固有時向き Lorentz 群の元、すなわち計量・向き・未来方向を保存する変換です。MQFC3の内積式は引数を交換して用います。

## 1. エネルギーと質量を分ける

四元運動量を $p=(E,k)$、時空点を $x=(t,\boldsymbol x)$ とし、$b(p,x)=Et-k\cdot\boldsymbol x$ と置きます。エネルギーは観測者に依存しますが、[質量二乗の不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-mass-casimir) によって

$$
s(p)=-\eta(p,p)=E^2-|k|^2
$$

は Lorentz 変換で変わりません。[未来質量殻](../../../代数系/LREP/LREP22/index.md#def-lrep22-mass-shell) は $s=m^2$、$E>0$ を満たす点の集合です。質量零でも原点を含めないことに注意します。

例えば $p=(5,3,0,0)$ と静止点 $(4,0,0,0)$ の質量は共に4ですが、エネルギーは5と4です。自由質量4の粒子の波束では、エネルギーが連続的に変わっても質量二乗は16に固定されます。逆に質量二乗そのものが連続的な場合もあります。

[質量殻測度](../../../代数系/LREP/LREP22/index.md#def-lrep22-shell-measure) に合わせ、以下では Fourier の規格化としてさらに $(2\pi)^{-3}$ を掛けます。$s\ge0$ に対し

$$
E_s(k)=\sqrt{s+|k|^2},\qquad
d\eta_s(k)=\frac{d^3k}{(2\pi)^3\,2E_s(k)}.
$$

$s=0$ では $k=0$ を除いて積分します。半径 $r$ の球で密度の動径部分は $r\,dr$ の定数倍なので、零の近くで可積分です。この測度を座標写像 $k\mapsto(E_s(k),k)$ で運動量空間へ移した像測度を $\sigma_s$ と書きます。すなわち Borel 集合 $B$ に対して

$$
\sigma_s(B)=\int \mathbf1_B(E_s(k),k)\,d\eta_s(k)
$$

です。$\mathbf1_B$ は $B$ の指示関数です。座標写像は連続で、逆写像は空間運動量への射影なので、この積分は殻上の集合の測度を与えます。[質量殻測度のLorentz不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-measure-invariance) により $\sigma_s$ は不変です。

## 2. 真空二点相関から正の運動量測度を取り出す

[実スカラー場のWightman公理](../MQFC3/index.md#def-mqfc3-wightman-axioms) を満たす場 $\Phi$ を考えます。真空期待値は並進不変なので定数 $c$ です。分布としては任意の偏導関数が零となるため定数分布であり、実場の随伴条件から $c$ は実数です。場を

$$
A(f)=\Phi(f)-c\left(\int f(x)d^4x\right)I
$$

と中心化すれば $\langle\Omega,A(f)\Omega\rangle=0$ です。二点分布は並進不変なので点の差だけに依存します。中心化した二点分布を $W(x-y)$ と書き、[Schwartz空間](../MQFC1/index.md#def-mqfc1-schwartz) 上の [緩増加分布](../MQFC1/index.md#def-mqfc1-tempered) であることを仮定します（Wightman 分布階層の設定）。点での場の作用を仮定する記号ではありません。

$\mathcal F_+ f(p)=\int e^{ib(p,x)}f(x)d^4x$ とします。運動量側の分布 $L$ は

$$
W(g)=L\left(p\mapsto\int e^{-ib(p,x)}g(x)d^4x\right)
$$

となるように [Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) の逆写像で定めます。中心化した二点量を真空から作るベクトルの内積として読むと、運動量の重みの正値性が現れます。ここでいう局所有限とは任意のコンパクト集合の測度が有限であること、多項式増大とはある定数 $C,N$ に対して半径 $R\ge1$ の Euclid 球の測度が $C(1+R)^N$ 以下となることです。未来閉光円錐は $E\ge |k|$ を満たす運動量の集合です。

<a id="thm-mqfc11-positive-measure"></a>

<!-- formal-statement-start -->
> **定理（中心化二点分布の正運動量測度）**
> 真空一意性を含む実スカラー場の Wightman 公理を仮定し、中心化した並進不変の二点分布 $W$ は緩増加分布とする。
> このとき一意な局所有限非負 Borel 測度 $\nu$ が存在し、分布の意味で
>
$$
W(x)=\int e^{-ib(p,x)}d\nu(p)
$$
>
> と表される。$\nu$ は多項式増大、Lorentz 不変、未来閉光円錐に支持され、$\nu(\{0\})=0$ を満たす。任意の Schwartz 試験関数 $f$ について
>
$$
\|A(f)\Omega\|^2=\int|\mathcal F_+f(p)|^2d\nu(p)
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

場の正値性は、まず Fourier 側で絶対値二乗の試験関数に対する非負性を与えます。これを任意の非負試験関数へ広げれば測度になります。並進の射影値測度を使うと、台と真空成分も判定できます。

<!-- proof-start -->
### 証明

$g(z)=\int\overline{f(y+z)}f(y)d^4y$ と置きます。これは Schwartz 関数で、$x=y+z$ の変数変換から

$$
\begin{aligned}
\int e^{-ib(p,z)}g(z)d^4z
&=\left(\int e^{-ib(p,x)}\overline{f(x)}d^4x\right)
  \left(\int e^{ib(p,y)}f(y)d^4y\right)\\
&=|\mathcal F_+ f(p)|^2.
\end{aligned}
$$

Wightman 公理の随伴条件と並進不変性から、二点分布核を試験関数で評価すると

$$
W(g)=\int W(x-y)\overline{f(x)}f(y)\,d^4x\,d^4y
=\langle A(f)\Omega,A(f)\Omega\rangle
$$

です。左の二重積分は分布の作用を表す記法です。従って [Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) の全射性により、任意の Schwartz 関数 $h$ に対して $L(|h|^2)\ge0$ です。

非負のコンパクト台滑らかな関数 $u$ を取り、$u$ の台の近傍で1、非負でコンパクト台の滑らかな関数 $\chi$ を選びます。$\epsilon>0$ について $h_\epsilon=\sqrt{u+\epsilon\chi^2}$ は滑らかです。$u$ の台の近傍では平方根の中が正で、その外では $\sqrt\epsilon\chi$ だからです。

$$
0\le L(|h_\epsilon|^2)=L(u)+\epsilon L(\chi^2).
$$

$\epsilon\downarrow0$ とすると $L(u)\ge0$。固定コンパクト集合 $K$ 上に台を持つ実試験関数 $v$ に対して $-\|v\|_\infty\chi\le v\le\|v\|_\infty\chi$ となるよう $\chi=1$ を $K$ の近傍に取れば、

$$
|L(v)|\le L(\chi)\|v\|_\infty.
$$

従って台を共通のコンパクト集合に保つ滑らかな近似（非負関数には非負の平滑化核を使う）により、正の実線形汎関数はコンパクト台連続関数へ一意に延長します。$\mathbb R^4$ は局所コンパクト Hausdorff 空間なので、[Riesz–Markov表現定理の正汎関数版](../../../解析系/MT/MT5/index.md#thm-mt5-riesz-markov-positive) が適用でき、局所有限の非負 Borel 測度 $\nu$ による表示 $L(u)=\int u\,d\nu$ が得られます。複素関数は実部と虚部に分けます。

[緩増加分布の定義](../MQFC1/index.md#def-mqfc1-tempered) により、$L$ はある有限次数の Schwartz 半ノルムで上から抑えられます。単位球で1となる非負の滑らかな cutoff を $\chi_1$ とし、$\chi_R(p)=\chi_1(p/R)$、$R\ge1$ と置けば各微分は $R^{-|\alpha|}$ 倍、台は半径の定数倍の球です。従ってある $C,N$ により

$$
\nu(\{|p|\le R\})\le L(\chi_R)\le C(1+R)^N.
$$

ここで $|p|$ は4成分の Euclid ノルムです。この増大評価により Schwartz 関数は $\nu$ に関して絶対可積分です（半径 $2^j$ の球殻ごとに急減少と増大を比較する）。cutoff を無限遠へ移すと Schwartz 位相で元の関数に収束するので、表現は全 Schwartz 空間に成立します。一意性はコンパクト台試験関数が局所有限測度を決定することから従います。

Lorentz 共変性と真空不変性により $W$ は Lorentz 不変です。変数変換の Jacobian の絶対値は1で、$b(\Lambda p,\Lambda x)=b(p,x)$ だから Fourier 側でも不変となり、測度表現の一意性から $\nu(\Lambda B)=\nu(B)$ です。

$v=A(f)\Omega$ とします。[真空二点量の並進スペクトル](../MQFC3/index.md#prop-mqfc3-positive-frequency) で使った共同射影値測度を $E_U$ とすれば、中心化した場にも共変性が成立し、

$$
\langle v,U(a)v\rangle
=\int e^{ib(p,a)}d\langle v,E_U(p)v\rangle.
$$

一方 $U(a)v=A(f(\cdot-a))\Omega$ を二点分布へ代入すると、移動した試験関数の Fourier 変換は $e^{ib(p,a)}\mathcal F_+f(p)$ なので同じ行列要素は

$$
\int e^{ib(p,a)}|\mathcal F_+f(p)|^2d\nu(p)
$$

です。両測度は有限であり Fourier 変換の一意性（Schwartz 試験関数を積分すれば分布として一致）から

$$
\langle v,E_U(B)v\rangle=\int_B|\mathcal F_+f(p)|^2d\nu(p).
$$

$\mathcal F_+ f$ が全点で正となる Gaussian を選びます。円錐外では $E_U$ が零であり、原点では $E_U(\{0\})$ が真空への射影です。後者は [零運動量射影と不変ベクトル](../../../解析系/AQFT/AQFT3/index.md#prop-aqft3-zero-momentum) と真空一意性から従います。$v$ は真空に直交するため両集合で積分が零です。重みが全点で正だから $\nu$ 自体も両集合で零となります。
<!-- proof-end -->

中心化をしなければ定数 $c^2$ が二点分布に加わり、運動量測度には $c^2\delta_0$ が加わります。この原点の原子と、質量零の非零運動量の殻は異なります。

## 3. 質量二乗ごとに測度を分ける

円錐上の Lorentz 変換は質量二乗 $s$ を変えません。従って運動量測度を、殻ごとの不変測度と、その殻に掛ける重みに分けたいと考えます。Lebesgue 測度に対する密度だけでは、一点に全ての重みが載る自由場を表せません。そこで $s$ の測度を使います。

<a id="def-mqfc11-mass-measure"></a>

<!-- formal-statement-start -->
> **定義（質量二乗スペクトル測度）**
> 原点を除いた未来閉光円錐上の局所有限非負運動量測度 $\nu$ に対し、$[0,\infty)$ 上の局所有限非負測度 $\rho$ が、全ての非負 Borel 関数 $u$ について
>
$$
\int u(p)d\nu(p)=
\int_{[0,\infty)}\int u(E_s(k),k)d\eta_s(k)\,d\rho(s)
$$
>
> を満たすとき、$\rho$ をこの規格化での質量二乗スペクトル測度という。内側の殻測度は前節の規格化 $d^3k/((2\pi)^3 2E_s(k))$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc11-mass-measure -->
### 直接例：自由場の一点質量

**定義の確認**。[自由二点相関の実時間境界値](../MQFC10/index.md#thm-mqfc10-free-boundary) の質量 $m>0$ の場では、運動量測度は $\nu=\sigma_{m^2}$ です。

$\delta_{m^2}$ は質量二乗の点 $m^2$ に重み1を置く Dirac 測度です。任意のコンパクト集合への重みは0または1なので、$\rho=\delta_{m^2}$ は非負で局所有限です。

$\nu=\sigma_{m^2}$ も、コンパクト集合上では空間運動量が有界かつ $E_{m^2}(k)\ge m>0$ なので局所有限であり、未来質量殻に載ります。外側積分は $s=m^2$ の値を選ぶので

$$
\int u(E_{m^2}(k),k)
\frac{d^3k}{(2\pi)^3\,2E_{m^2}(k)}
=\int u(p)d\sigma_{m^2}(p).
$$

任意の非負 $u$ について定義の等式が成立します。空間運動量は連続でも質量二乗の測度は一点に集中しています。
<!-- definition-example-end -->

単純に $\nu$ を写像 $p\mapsto s(p)$ で移した測度は一般には使えません。例えば自由殻の全測度は無限大です。各殻の運動量積分の無限な体積を分離してから質量の重みを取り出す必要があります。

<a id="thm-mqfc11-kl"></a>

<!-- formal-statement-start -->
> **定理（Källén–Lehmann表示）**
> 実スカラー場が真空一意性を含む Wightman 公理を満たし、その中心化二点分布 $W$ が緩増加分布であるとする。
> 一意な多項式増大の質量二乗スペクトル測度 $\rho\ge0$ が存在して、分布の意味で
>
$$
W(t,\boldsymbol x)=\int_{[0,\infty)}
\Delta_+(t,\boldsymbol x;s)\,d\rho(s),
$$
$$
\Delta_+(t,\boldsymbol x;s)=
\int e^{-it E_s(k)+ik\cdot\boldsymbol x}d\eta_s(k)
$$
>
> と表される。
<!-- formal-statement-end -->

### 証明の見取り図

前節の正運動量測度を $(s,k)$ 座標に移します。Lorentz boost は $s$ を固定したまま $k$ を動かします。不変性を微分すると、運動量方向の重み $E_s(k)$ を掛けた測度が Lebesgue 測度に比例することが分かります。残った比例係数が $\rho$ です。

<!-- proof-start -->
### 証明

[中心化二点分布の正運動量測度](#thm-mqfc11-positive-measure) により $\nu$ を得ます。円錐の原点以外は $s\ge0$、$k\in\mathbb R^3$、$(s,k)\ne(0,0)$ で一意に表示でき、両方向の座標写像は連続です。座標へ移した測度を $M$ と書き、まず $k\ne0$ に制限して

$$
dN(s,k)=2(2\pi)^3 E_s(k)dM(s,k)
$$

と置きます。$s$ のコンパクト集合と $k$ の原点を避けたコンパクト集合上で $N$ は有限です。

$i\in\{1,2,3\}$ 方向の boost（[質量殻測度のLorentz不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-measure-invariance) の座標変換）を実数パラメータ $a$ で表すと、

$$
k'_i=k_i\cosh a+E_s(k)\sinh a,\qquad
k'_j=k_j\ (j\ne i).
$$

$s$ のコンパクト台連続関数 $h$ と、$k\ne0$ に台を持つ滑らかなコンパクト台関数 $\psi$ を取ります。ここでは $s,k$ を固定して boost パラメータ $a$ だけを動かします。$s$ は不変であり、

$$
\left.\frac{dk'_i}{da}\right|_{a=0}=E_s(k),
\qquad
\left.\frac{d}{da}\psi(k'(a))\right|_{a=0}
=E_s(k)\partial_i\psi(k)
$$

です。$\partial_i$ は空間運動量 $k_i$ での偏微分であり、2番目の式は連鎖律です。Lorentz 不変性による等式

$$
\int h(s)\psi(k')dM=\int h(s)\psi(k)dM
$$

を $a=0$ で微分します。小さい $|a|$ の範囲では逆 boost で移した台が原点を避けた共通コンパクト集合に含まれ、導関数が有界なので微分と積分を交換できます。

$$
\int h(s)\partial_i\psi(k)dN(s,k)=0.
$$

$h\ge0$ を固定すると、$N_h(B)=\int h(s)\mathbf1_B(k)dN$ は $\mathbb R^3\setminus\{0\}$ 上の局所有限測度で、分布として全偏導関数が零です。これが Lebesgue 測度の定数倍である理由を確認します。滑らかな非負関数 $\omega_\epsilon$ を半径 $\epsilon$ の球内に台を持ち積分1となるよう選びます。原点から距離 $\epsilon$ より遠い領域で

$$
n_\epsilon(k)=\int\omega_\epsilon(k-y)dN_h(y)
$$

を定めると、$k$ 微分は $y$ 微分の符号反転です。固定した $k$ に対し $y\mapsto\omega_\epsilon(k-y)$ は原点を避ける台を持つので、直前に得た分布の微分の等式を使うと

$$
\partial_{k_i}n_\epsilon(k)
=-\int\partial_{y_i}\omega_\epsilon(k-y)dN_h(y)=0.
$$

ここでは局所有限測度上の共通コンパクト台と滑らかな核の有界導関数により微分と積分を交換できます。この領域は連結だから $n_\epsilon$ は定数 $c_\epsilon$。コンパクト台の滑らかな関数に対する積分は $\epsilon\downarrow0$ で $N_h$ による積分に収束します。実際、畳み込みによる一様近似と、台の共通コンパクト集合での有限性を使えます。積分1の固定試験関数 $\psi_0\ge0$ を原点から離して取ると

$$
c_\epsilon\longrightarrow c_h=\int\psi_0(k)dN_h(k).
$$

よって $N_h=c_h\,d^3k$ です。符号付きの $h$ についても正負部分の差で成立します。

$\rho$ を $\psi_0(k)dN(s,k)$ の $s$ 座標への像測度とすれば、非負かつ局所有限です。積分1であることと上の式により

$$
\int h(s)\psi(k)dN(s,k)
=\int h(s)d\rho(s)\int\psi(k)d^3k.
$$

積の試験関数の有限和はコンパクトな直積上の連続関数を一様近似できます（例えば細かい格子と連続な分割関数で各格子の値を補間する）。コンパクト台を保った近似により、局所有限測度として $N=\rho\otimes d^3k$ が従います。

まだ $k=0$ かつ $s>0$ の点に測度が残る可能性があります。静止点の集合を

$$
B=\{(\sqrt{s},0):0<a_0\le s\le b_0<\infty\}
$$

とします。異なる正の boost パラメータ $a_n\in(0,1)$ で移すと、各像では

$$
\frac{k_i}{E}=\tanh a_n
$$

となるため、像は互いに素です。しかも全て一つのコンパクト集合に入り、Lorentz 不変性から各像の測度は $\nu(B)$ に等しくなります。局所有限性から $\nu(B)=0$ です。

このような区間で正の質量二乗の全範囲を可算被覆すれば静止点全体の測度は零です。原点は既に除かれました。従って上の [積測度](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-01) から $2(2\pi)^3 E_s(k)$ で割り戻した式が全円錐で成立します。これが [質量二乗スペクトル測度](#def-mqfc11-mass-measure) の等式です。

一意性は同じ $\psi_0$ による重み付き積分から $\rho$ が復元されることで従います。$\psi_0$ の台が $|k|\le K$ に含まれるとすると、$s\le R$ では $E_s(k)\le\sqrt{R+K^2}$、$|p|\le\sqrt{R+2K^2}$ です。復元式と $\nu$ の増大評価から、適当な正定数 $C_1,C_2,C_3$ に対し

$$
\begin{aligned}
\rho([0,R])
&=\int_{s(p)\le R}2(2\pi)^3E\psi_0(k)d\nu(p)\\
&\le C_1(1+\sqrt R)\nu(\{|p|\le C_2(1+\sqrt R)\})\\
&\le C_3(1+R)^{N+1}
\qquad(R\ge1)
\end{aligned}
$$

となります。従って $\rho$ も多項式増大です。

最後に、任意の Schwartz 試験関数 $g$ に対し、$u(p)=\int e^{-ib(p,x)}g(x)d^4x$ は Schwartz 関数であり $\int |u|d\nu$ は有限です。測度の分解を $|u|$ に適用すると殻ごとの積分と外側積分の絶対収束が従い、実部・虚部に分けて分解を $u$ に適用できます。これを二点分布の Fourier 表示へ戻せば定理の式になります。
<!-- proof-end -->

Lorentz 不変性を外すと、正の運動量測度であってもこの分解は保証されません。例えば $(E,k)=(2,0)$ に単独の Dirac 測度を置けば円錐内で正ですが、boost で別の点へ移るため不変ではありません。第3節の微分による Lebesgue 測度への帰着が壊れます。

## 4. 質量の原子と連続部分

[Källén–Lehmann表示](#thm-mqfc11-kl) の $\rho$ において $\rho(\{m^2\})=Z>0$ なら、二点分布のその成分は $Z\Delta_+(\cdot;m^2)$ です。

この原子が場から作ったベクトルの質量成分にどう対応するかを確認します。[質量二乗の不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-mass-casimir) で構成した質量二乗作用素の射影値測度を $P_s$ と書きます。Borel 集合 $B\subset[0,\infty)$ について

$$
P_s(B)=E_U(s^{-1}(B))
$$

です。第2節の [中心化二点分布の正運動量測度](#thm-mqfc11-positive-measure) の証明と第3節の分解を組み合わせると、$v=A(f)\Omega$ に対し

$$
\begin{aligned}
\|P_s(B)v\|^2
&=\int_{s(p)\in B}|\mathcal F_+ f(p)|^2d\nu(p)\\
&=\int_B\int|\mathcal F_+ f(E_s(k),k)|^2d\eta_s(k)d\rho(s).
\end{aligned}
$$

$B=\{m^2\}$ では右辺が $Z$ 倍の殻積分になります。Fourier 変換が全点で正の Gaussian 試験関数を選べば殻積分は正なので、非零の質量 $m$ 成分が存在します。任意の $f$ がこの成分を検出するとは限りません。

原子が他の台から離れている場合、その殻を近傍の質量と区別できます。これが安定な一粒子成分を識別する出発点です。ただし原子だけでは粒子の多重度や散乱理論の成立までは決まりません。

例えば二つの独立な自由場 $\phi_1,\phi_2$（質量1, 2）をテンソル積 Hilbert 空間に置き、$\Phi=2\phi_1+\phi_2$ とします。各場の真空平均は零であるため、混合二点量は平均の積で零です。

$$
W=4\Delta_+(\cdot;1)+\Delta_+(\cdot;4),
\qquad \rho=4\delta_1+\delta_4.
$$

一方 $\rho$ の一部が $w(s)ds$（$w\ge0$）であれば、質量二乗が区間に分布します。特に二粒子の全運動量 $p_1+p_2$ は同じ質量の粒子から作っても、相対運動量に応じて不変質量が変わります。正質量 $m$ の粒子の四元速度は $p/m$ です。次の命題ではこれが一致するときに全不変質量が最小になります。

<a id="prop-mqfc11-two-particle-threshold"></a>

<!-- formal-statement-start -->
> **命題（二粒子の不変質量の下限）**
> 質量 $m_1,m_2>0$ の未来質量殻上の運動量 $p_1,p_2$ に対して
>
$$
s(p_1+p_2)\ge(m_1+m_2)^2
$$
>
> が成立する。等号は両者が同じ四元速度を持つとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

一方の粒子を静止させる Lorentz 変換を使えば、内積の評価は他方のエネルギーと質量の比較になります。

<!-- proof-start -->
### 証明

[未来円錐のLorentz軌道](../../../代数系/LREP/LREP22/index.md#thm-lrep22-orbits) により $p_1$ を $(m_1,0)$ に移せます。$p_2$ は同じ変換で $(\sqrt{m_2^2+|q|^2},q)$ となります。Lorentz 不変な二次形式をこの座標で展開すると

$$
\begin{aligned}
s(p_1+p_2)
&=(m_1+\sqrt{m_2^2+|q|^2})^2-|q|^2\\
&=m_1^2+m_2^2+2m_1\sqrt{m_2^2+|q|^2}\\
&\ge (m_1+m_2)^2.
\end{aligned}
$$

等号は $q=0$ のときだけで、この座標では両運動量をそれぞれの質量で割った四元速度が $(1,0)$ になります。逆変換も線形なので等号条件は元の座標で $p_1/m_1=p_2/m_2$ です。
<!-- proof-end -->

これは運動学上の下限です。特定の場が全ての二粒子ベクトルに結合することや、実際の二点測度がその下限から連続密度を持つことを証明したわけではありません。多粒子の連続成分が現れる理由と、その成分が実際に非零となる証明責務を分けます。

## 5. Euclid 時間から見える重み

[自己共役縮小半群の非負生成作用素](../MQFC9/index.md#thm-mqfc9-hamiltonian) と [非負生成作用素の複素時間境界値](../MQFC10/index.md#thm-mqfc10-complex-semigroup) により、実時間の位相を正の Euclid 時間での指数減衰に置き換えられます。

ここでは任意の空間 Schwartz 関数（波束）$g$ を用います。その Fourier 変換と空間差 $x$ に対する自己相関を

$$
\hat g(k)=\int e^{-ik\cdot x}g(x)d^3x,\qquad
h(x)=\int\overline{g(y+x)}g(y)d^3y
$$

とします。自己相関を二点分布の空間差に対する試験関数として用います。時刻0の場の存在を仮定せず、$\tau>0$ の二点分布を空間で平滑化した量を考えます。

<a id="prop-mqfc11-euclidean-spectrum"></a>

<!-- formal-statement-start -->
> **命題（質量測度からのEuclid二点量）**
> 非負で多項式増大の質量二乗スペクトル測度 $\rho$ を持つ中心化実スカラー場の二点分布に対し、任意の空間 Schwartz 関数 $g$、$\tau>0$ について、正時間の二点量を空間差で波束の自己相関と組み合わせると
>
$$
C_g(\tau)=\int_{[0,\infty)}\int
e^{-\tau E_s(k)}|\hat g(k)|^2d\eta_s(k)d\rho(s)
$$
>
> となる。この積分は有限非負である。
<!-- formal-statement-end -->

### 証明の見取り図

[自由二点相関の実時間境界値](../MQFC10/index.md#thm-mqfc10-free-boundary) の解析接続を、質量測度による積分へ広げます。大きな質量は指数減衰が抑え、質量零の原点近傍では三次元の体積要素が分母を補います。

<!-- proof-start -->
### 証明

[Källén–Lehmann表示](#thm-mqfc11-kl) の実時間の位相を $z=\tau+it$ へ移して $e^{-zE_s(k)}$ とします。空間差の試験関数を $h(x)=\int\overline{g(y+x)}g(y)d^3y$ とします。$u=y+x$ の変数変換と絶対可積分性から [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) を使うと、

$$
\begin{aligned}
\int e^{ik\cdot x}h(x)d^3x
&=\left(\int e^{ik\cdot u}\overline{g(u)}d^3u\right)
  \left(\int e^{-ik\cdot y}g(y)d^3y\right)\\
&=\overline{\hat g(k)}\hat g(k)=|\hat g(k)|^2.
\end{aligned}
$$

従って $C_g(\tau)$ はこの自己相関で平滑化した正時間の量です。

$E_s(k)\ge\sqrt s$ かつ $E_s(k)\ge|k|$ です。$\operatorname{Re}z\ge\delta>0$ なら

$$
\frac{|e^{-zE_s(k)}|}{2E_s(k)}
\le\frac{e^{-\delta\sqrt s/2}e^{-\delta|k|/2}}{2|k|}
\quad(k\ne0).
$$

右辺の $k$ 積分は原点近傍で $\int_0^1 r\,dr$ によって有限、無限遠では指数減衰によって有限です。$|\hat g|^2$ は有界です。

$s$ 積分も、$\rho([0,R])$ の多項式増大を整数区間ごとに評価して $e^{-\delta\sqrt s/2}$ の減衰と比較すれば有限です。従って [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) により積分を交換できます。

正則性も差商を評価すると $E_s(k)$ が一つ増えますが、正の実部の半分を使って $E_s(k)e^{-\delta E_s(k)/2}$ を有界にできるので従います。

実時間境界値は全時空の Schwartz 試験関数で評価すると、運動量側の Schwartz 関数に $e^{-\epsilon E_s(k)}$ を掛けた積分になります。絶対値は元の Schwartz 関数で抑えられ、$\nu$ に関して可積分なので [優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) で $W$ に戻ります。正の実軸 $z=\tau$ を取れば主張の積分であり、全因子が非負です。
<!-- proof-end -->

空間 Fourier 表示では、$d^3k/(2\pi)^3$ に対する核を

$$
K(\tau,k)=\int_{[0,\infty)}\frac{e^{-\tau E_s(k)}}{2E_s(k)}\,d\rho(s)
$$

と書きます。質量零の原子がある場合など $k=0$ で値が有限とは限りませんが、波束との積分は命題の評価により有限です。例えば $\rho=4\delta_1+\delta_4$ のとき空間 Fourier 表示の時間因子は

$$
\frac{4e^{-\tau\sqrt{1+|k|^2}}}{2\sqrt{1+|k|^2}}
+\frac{e^{-\tau\sqrt{4+|k|^2}}}{2\sqrt{4+|k|^2}}.
$$

$k=0$ では $2e^{-\tau}+\tfrac14e^{-2\tau}$。これは運動量核の値で、正規化された静止運動量固有ベクトルの内積ではありません。大きい時間では軽い成分が優勢になります。

ただし二点量に見える質量は、場を真空に一度作用させたベクトルが持つ質量に限られます。

例えば $\mathbb C^3$ の正規直交基底 $e_0,e_1,e_2$ に対し、真空を $e_0$、ハミルトニアンを $H=\operatorname{diag}(0,1,3)$ とします。この対角表示は

$$
He_j=\lambda_j e_j,\qquad
\lambda_0=0,\quad\lambda_1=1,\quad\lambda_2=3
$$

を表します。[非負生成作用素の複素時間境界値](../MQFC10/index.md#thm-mqfc10-complex-semigroup) のスペクトル積分では $e^{-\tau H}e_j=e^{-\tau\lambda_j}e_j$ です。観測後のベクトル $v=e_2$ に対して

$$
\langle v,e^{-\tau H}v\rangle=e^{-3\tau}
$$

ですが、エネルギー1の固有ベクトルは存在します。これは半群の有限次元模型であり相対論的場ではありません。一つの観測量では全スペクトルの下端は決まりません。次講では真空直交補空間全体を調べるための条件を扱います。

## 6. 演習

### 演習 MQFC11-A1：質量とエネルギー

- Level: A

$p=(13,5,0,0)$ と $q=(12,0,0,0)$ の質量二乗を求め、同じ質量でもエネルギーが異なることを確認せよ。

<!-- solution-start -->
[未来質量殻](../../../代数系/LREP/LREP22/index.md#def-lrep22-mass-shell) の条件を使います。$p$ の質量二乗は $13^2-5^2=169-25=144$、$q$ では $12^2-0=144$ です。両者とも時間成分は正で、質量は $\sqrt{144}=12$ です。エネルギーはそれぞれ13と12なので同じ質量殻上でも異なります。
<!-- solution-end -->

### 演習 MQFC11-A2：真空原子と中心化

- Level: A

$\Phi(f)=2\int f\,I+\phi(f)$ で、$\phi$ は平均零の質量3の自由場とする。二点分布の運動量測度と中心化後の質量二乗スペクトル測度を求めよ。

<!-- solution-start -->
混合項は $\langle\Omega,\phi(f)\Omega\rangle=0$ のため消えます。定数項は $2^2=4$ で、Fourier 表示では $4\delta_0$（四元運動量原点）です。[自由二点相関の実時間境界値](../MQFC10/index.md#thm-mqfc10-free-boundary) より残りは $\sigma_9$。従って運動量測度は $4\delta_0+\sigma_9$ です。中心化で $4\delta_0$ が消え、[質量二乗スペクトル測度](#def-mqfc11-mass-measure) の定義により $\rho=\delta_9$ となります。
<!-- solution-end -->

### 演習 MQFC11-A3：質量零の殻測度

- Level: A

$s=0$ に対し $0<|k|<R$ の $\eta_0$ 測度を計算せよ。$R>0$ とする。

<!-- solution-start -->
$E_0(k)=|k|=r$ で、球座標の角度積分は $4\pi$ です。

$$
\int_{0<|k|<R}d\eta_0
=\frac{4\pi}{2(2\pi)^3}\int_0^R r\,dr
=\frac{R^2}{8\pi^2}.
$$

有限であり、$R\downarrow0$ で零になります。分母が原点で零でも近傍で可積分であること、殻測度に原点の原子がないことを確認できました。
<!-- solution-end -->

### 演習 MQFC11-A4：二つの質量の時間因子

- Level: A

$\rho=2\delta_4+6\delta_9$ とする。正の Euclid 時間 $\tau$ の空間運動量核を $k=0$ で求め、$\tau\to\infty$ での軽い成分と重い成分の比を調べよ。

<!-- solution-start -->
質量は2と3です。[質量測度からのEuclid二点量](#prop-mqfc11-euclidean-spectrum) の内側の核を固定運動量で評価すると

$$
K(\tau,0)=\frac{2}{2\cdot2}e^{-2\tau}
+\frac{6}{2\cdot3}e^{-3\tau}
=\tfrac12 e^{-2\tau}+e^{-3\tau}.
$$

重い成分を軽い成分で割ると $2e^{-\tau}$ で零へ収束します。軽い成分を重い成分で割った比は $\tfrac12 e^\tau$ で発散します。
<!-- solution-end -->

### 演習 MQFC11-B1：負の重みは許されるか

- Level: B

運動量分布 $\nu=\sigma_1-\sigma_4$ を考える。未来円錐のみに支持され Lorentz 不変であるが、実スカラー場の真空二点分布の測度にはなれないことを、試験関数を構成して示せ。

<!-- solution-start -->
各殻は未来円錐内であり、[質量殻測度のLorentz不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-measure-invariance) によりその差も不変です。しかし二つの殻は互いに素です。点 $(2,0)$ の小さい近傍 $U$ を $s(p)>3$ となるよう選び、その中に台を持ち点の近くで正の滑らかな関数 $h$ を選びます。殻1では $h=0$、殻4の点 $(2,0)$ の近くでは $|h|^2>0$ で、その近傍の殻測度は正です。

$$
\int|h|^2d\nu=-\int|h|^2d\sigma_4<0.
$$

[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) の全射性から $\mathcal F_+f=h$ となる Schwartz 関数 $f$ が存在します。[中心化二点分布の正運動量測度](#thm-mqfc11-positive-measure) のノルム二乗の式なら左辺は非負でなければなりません。従って正値性が失敗します。
<!-- solution-end -->

### 演習 MQFC11-B2：殻の体積と質量の重み

- Level: B

$\nu=7\sigma_4$ とする。$s$ への単純な像測度が局所有限ではないことを示し、原点から離れた積分1の非負コンパクト台関数 $\psi_0(k)$ を用いて質量の重みを復元せよ。

<!-- solution-start -->
殻4では $s=4$ です。球座標の動径積分は

$$
\sigma_4(\mathbb R^4)=
\frac{4\pi}{2(2\pi)^3}\int_0^\infty
\frac{r^2}{\sqrt{4+r^2}}\,dr.
$$

$r\ge2$ なら $\sqrt{4+r^2}\le\sqrt2\,r$ なので被積分関数は $r/\sqrt2$ 以上で、積分は発散します。単純な像測度はコンパクト集合 $\{4\}$ に無限大を割り当てます。

[Källén–Lehmann表示](#thm-mqfc11-kl) の証明で用いた復元式を使うと、任意の Borel 集合 $B\subset[0,\infty)$ に対し

$$
\begin{aligned}
\rho(B)
&=\int \mathbf1_B(s(p))\,2(2\pi)^3 E\psi_0(k)d\nu(p)\\
&=7\mathbf1_B(4)\int\psi_0(k)d^3k\\
&=7\mathbf1_B(4).
\end{aligned}
$$

従って $\rho=7\delta_4$。殻の体積を分離した有限の重みが得られます。
<!-- solution-end -->

### 演習 MQFC11-B3：相対運動と連続質量

- Level: B

質量2と3の二粒子の全空間運動量が零である系で、運動量を $k,-k$ とする。全不変質量の取り得る範囲を求めよ。

<!-- solution-start -->
全四元運動量は $(\sqrt{4+|k|^2}+\sqrt{9+|k|^2},0)$ です。$r=|k|$ と置くと全不変質量は

$$
M(r)=\sqrt{4+r^2}+\sqrt{9+r^2}.
$$

$M(0)=5$、$r>0$ で

$$
M'(r)=\frac{dM}{dr}
=\frac{2r}{2\sqrt{4+r^2}}+\frac{2r}{2\sqrt{9+r^2}}
=\frac r{\sqrt{4+r^2}}+\frac r{\sqrt{9+r^2}}>0.
$$

連続で、$M(r)\ge2r$ だから無限遠で発散します。中間値の性質と単調性から範囲は $[5,\infty)$、質量二乗の範囲は $[25,\infty)$ です。下端は [二粒子の不変質量の下限](#prop-mqfc11-two-particle-threshold) と一致します。この範囲の全てに実際の場の重みがあるという主張ではありません。
<!-- solution-end -->

### 演習 MQFC11-B4：連続な質量測度

- Level: B

$\rho(ds)=\mathbf1_{[1,4]}(s)ds$ とする。正の Euclid 時間 $\tau$ の空間運動量核を $k=0$ で計算せよ。さらに、正定数 $A,m$ に対してこの核を $Ae^{-m\tau}$ と表せないことを示せ。

<!-- solution-start -->
[質量測度からのEuclid二点量](#prop-mqfc11-euclidean-spectrum) の核を $k=0$ で評価します。$u=\sqrt s$ と置きます。$s=u^2$ は $1\le u\le2$ で狭義増加し、

$$
\frac{ds}{du}=2u>0
$$

です。置換積分で $ds=2u\,du$ と書けるので、分母 $2\sqrt s=2u$ と打ち消し合い、積分端点は1と2です。

$$
\begin{aligned}
K(\tau,0)&=\int_1^4\frac{e^{-\tau\sqrt s}}{2\sqrt s}ds\\
&=\int_1^2 e^{-\tau u}du
=\frac{e^{-\tau}-e^{-2\tau}}{\tau}.
\end{aligned}
$$

$\tau\downarrow0$ では $0\le e^{-\tau u}\le1$ なので、[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) から極限は1です。$\tau\to\infty$ では

$$
e^\tau K(\tau,0)=\frac{1-e^{-\tau}}{\tau}\longrightarrow0,
\qquad
-\frac{\log K(\tau,0)}{\tau}
=1+\frac{\log\tau-\log(1-e^{-\tau})}{\tau}
\longrightarrow1.
$$

ここで $\log\tau/\tau\to0$、$\log(1-e^{-\tau})\to0$ を使いました。一定係数の単一指数ならこの対数の極限から指数率は1となり、$e^\tau K$ は正の一定値のはずです。従って単一指数では表せません。
<!-- solution-end -->

### 演習 MQFC11-C1：一つの観測量が見落とす固有空間

- Level: C

$\mathcal H=\mathbb C^4$、真空 $\Omega=e_0$、ハミルトニアン $H=\operatorname{diag}(0,1,2,5)$ とし、$v=e_2+2e_3$、$w=e_1+e_3$ とする。各ベクトルのエネルギー測度、正時間相関、全真空直交空間の最小エネルギーを求めよ。さらに $v$ だけから最小エネルギーが決まらない理由を説明せよ。

<!-- solution-start -->
[非有界自己共役作用素のスペクトル定理](../../../解析系/QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) を有限次元対角作用素に適用します。射影 $E_H(B)$ は固有値が $B$ に入る座標だけを残します。従って各測度は固有座標の係数の絶対値二乗を重みとするので

$$
\mu_v=\delta_2+4\delta_5,\qquad
\mu_w=\delta_1+\delta_5.
$$

[非負生成作用素の複素時間境界値](../MQFC10/index.md#thm-mqfc10-complex-semigroup) のスペクトル積分を正実軸で使えば、

$$
\begin{aligned}
\langle v,e^{-\tau H}v\rangle&=e^{-2\tau}+4e^{-5\tau},\\
\langle w,e^{-\tau H}w\rangle&=e^{-\tau}+e^{-5\tau}.
\end{aligned}
$$

$\Omega^\perp$ の基底は $e_1,e_2,e_3$ であり、対応する固有値は $1,2,5$ です。最小値は1です。しかし $E_H(\{1\})v=0$ なので、$v$ の測度にはエネルギー1の原子がありません。

$H$ の $e_1$ に対する固有値を任意の $0<\epsilon<2$ に変更しても $v$ の相関式は不変ですが、全真空直交空間の最小エネルギーは $\epsilon$ になります。

従って $v$ の相関だけから全空間の下端を同定できません。$w$ はこの模型では最小固有空間に非零の成分を持つため下端を検出します。一般には観測で得るベクトルの族が真空直交補空間を近似できるかどうかを別途確かめる必要があります。
<!-- solution-end -->

## 7. まとめ

自由場では質量二乗の重みが一点に集中します。一般の実スカラー場の二点分布でも、Hilbert 空間の正値性と Lorentz 不変性から非負の質量二乗スペクトル測度が得られます。その測度は孤立した原子と連続的な重みを区別し、正の Euclid 時間では指数核の混合として現れます。

ここで得たのは特定の場の二点量の情報です。次講 MQFC12 では、真空直交補空間における全スペクトルの下限と相関減衰を結び付け、逆向きの推論に必要な条件を明確にします。

参考：R. F. Streater and A. S. Wightman, *PCT, Spin and Statistics, and All That*（Wightman 公理とスペクトル表示）；G. Källén, *On the definition of the renormalization constants in quantum electrodynamics* (1952)；H. Lehmann, *Über Eigenschaften von Ausbreitungsfunktionen und Renormierungskonstanten quantisierter Felder* (1954)。
