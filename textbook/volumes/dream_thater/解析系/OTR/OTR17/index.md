# OTR17 密度を時間発展させる保存則は

[OTR15の変位補間](../OTR15/index.md#def-otr15-displacement-interpolation)では粒子の位置を時刻で動かし、[OTR16の内部エネルギー](../OTR16/index.md#def-otr16-internal-energy)ではその結果として変わる密度を評価しました。しかし「ある時刻の密度」と「次の時刻の密度」が、どのような**局所的な質量保存則**で結ばれているかはまだ書いていません。

粒子が移動しても消えたり生まれたりしないなら、ある領域から減った質量は境界を通って出たはずです。[VC9の古典的な質量保存則](../../../幾何系/VC/VC9/index.md#prop-vc9-continuity)を出発点に、密度を持たない Dirac 測度にも使える積分形へ拡張します。ここで扱うのは質量の運動学であり、速度を決める力学方程式や最適な速度の選択はまだ仮定しません。

## 1. 質量と流束を区別する

時間区間を $[0,T]$（$T>0$）、空間を $\mathbb R^d$（$d\ge1$）とします。$\rho(t,x)\ge0$ を単位体積当たりの質量、$v(t,x)\in\mathbb R^d$ を位置 $x$ での速度とします。

小さい面を単位時間に通る質量は密度だけでなく「密度×速度」に比例します。これは[VC9で定義した質量流束](../../../幾何系/VC/VC9/index.md#def-vc9-mass-flux)です。VC9 の速度 $u$ を本章では $v$ と書き、$j=\rho v$ と置きます。

$j$ の発散は空間方向の和

$$
\nabla\cdot j=\sum_{i=1}^{d}\frac{\partial j_i}{\partial x_i}
$$

です。質量生成がない場合の[VC9の連続の方程式](../../../幾何系/VC/VC9/index.md#prop-vc9-continuity)は

$$
\partial_t\rho+\nabla\cdot(\rho v)=0.
$$

となります。ここでは $\rho,v$ が $C^1$ として、既習の古典形を直接検算します。一次元で一定速度 $v=c$、$\rho(t,x)=g(x-ct)$ とします。ただし $g\in C_c^1(\mathbb R)$、$g\ge0$、$\int g=1$ です。流束は $j=cg(x-ct)$ で、

$$
\partial_t\rho=-c g'(x-ct),\qquad
\partial_xj=c g'(x-ct).
$$

和は各点で $0$ です。[PDE1の定係数輸送の表示](../../PDE/PDE1/index.md#thm-pde1-constant-transport)とも一致します。ただし一般の非定数速度では $v\cdot\nabla\rho$ だけを書いては保存則になりません。

積の微分を各成分で実行すると

$$
\nabla\cdot(\rho v)
=\sum_i\left(v_i\partial_{x_i}\rho+\rho\,\partial_{x_i}v_i\right)
=v\cdot\nabla\rho+\rho\,\nabla\cdot v.
$$

従って $\partial_t\rho+v\cdot\nabla\rho=0$ は $\nabla\cdot v=0$ の場合などに限って同じ式です。例えば一次元で $v=x$、$\rho(t,x)=e^{-t}g(e^{-t}x)$ なら、$\partial_t\rho+v\partial_x\rho=-\rho$ ですが $\partial_t\rho+\partial_x(\rho v)=0$ です。流れが広がると密度は下がります。

## 2. 小領域の収支から境界流束を導く

$\Omega\subset\mathbb R^d$ を有界な $C^1$ 境界を持つ領域、$n$ をその外向き単位法線とします。まず任意の次元で使う発散公式を確認します。

<a id="der-otr17-divergence-d"></a>

$$
\int_\Omega\nabla\cdot F\,dx
=\int_{\partial\Omega}F\cdot n\,dS
\qquad(F\in C^1(\overline\Omega;\mathbb R^d)).
$$

$d=1$ は微積分の基本定理、$d=2$ は[VC4のGreenの流束形](../../../幾何系/VC/VC4/index.md#cor-vc4-green-flux)です。$d=3$ は[VC4のGauss--Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)で証明しました。

VC4の後者の定理文は3次元なので、$d>3$ では座標ごとの計算で拡張します。境界を局所的に $x_d=h(x')$、領域側を $x_d<h(x')$ と書き、このグラフ表示が成り立つ範囲にコンパクト支持を持つ $F$ を考えます。ここで

$$
x'=(x_1,\ldots,x_{d-1}).
$$

微積分の基本定理と上端の連鎖律から

$$
\begin{aligned}
\int_\Omega\partial_{x_d}F_d\,dx
&=\int F_d(x',h(x'))\,dx',\\
\int_\Omega\partial_{x_i}F_i\,dx
&=-\int F_i(x',h(x'))\,\partial_{x_i}h(x')\,dx'
\quad(1\le i<d).
\end{aligned}
$$

第二式では $\partial_{x_i}\int_{-\infty}^{h(x')}F_i(x',z)\,dz$ を $x'$ 全体で積分した項が、コンパクト支持により $0$ になります。

このグラフの外向き法線と面積要素は

$$
n\,dS=(-\nabla h,1)\,dx'
$$

です。成分を足すと境界流束に一致します。$C^1$ 境界を有限個のグラフ表示で覆い、内部と各近傍へ滑らかに分割して足せば一般の公式を得ます。

$\rho,j$ が閉領域まで $C^1$ なら、この公式を[VC4の局所保存則から積分保存則](../../../幾何系/VC/VC4/index.md#thm-vc4-local-to-integral)と同様に適用できます。質量の場合に $M_\Omega(t)=\int_\Omega\rho(t,x)\,dx$ と置くと

$$
\frac{dM_\Omega}{dt}(t)
=-\int_{\partial\Omega}j(t,x)\cdot n(x)\,dS(x).
$$

です。ここで「外向きの流束が正なら内部の質量は減る」という符号を一度計算で確かめます。$M_\Omega$ を微分し、連続の方程式と[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を順に適用すると

$$
\begin{aligned}
M_\Omega'(t)
&=\int_\Omega\partial_t\rho(t,x)\,dx\\
&=-\int_\Omega\nabla\cdot j(t,x)\,dx\\
&=-\int_{\partial\Omega}j(t,x)\cdot n(x)\,dS(x).
\end{aligned}
$$

境界で $j\cdot n=0$ なら $M_\Omega'(t)=0$ なので $M_\Omega(t)=M_\Omega(0)$ です。これを後で no-flux の弱条件として拡張します。

一次元 $\Omega=(a,b)$ では外向き法線が左端 $-1$、右端 $+1$ ですから、公式は

$$
\frac d{dt}\int_a^b\rho(t,x)\,dx=j(t,a)-j(t,b)
$$

です。右へ流れ出る $j(t,b)>0$ が内部の質量を減らすので符号を確認できます。**総質量が偶然一定でも no-flux とは限りません**。両端から同じ量が出入りすれば右辺は $0$ だからです。

## 3. なぜ微分形だけでは足りないか

一点に質量 $1$ が集中する [Dirac 測度](../../F0/F0-00D2/index.md#def-f0-00d2-04) $\delta_a$ は原子的対象で、Lebesgue 密度を持ちません。$\mu_t=\delta_{ct}$ は質量を失わず動きますが、$\partial_t\rho$ と書くべき関数 $\rho$ は存在しません。

代わりに、時刻 $t$ の測度 $\mu_t$ を滑らかな関数 $\varphi(t,x)$ に対して積分します。時間と空間の微分をこの関数へ移せば、密度自体を微分せずに済みます。そこで、その観測用の関数が満たすべき滑らかさと台の条件を先に定義します。

<a id="def-otr17-test-function"></a>

<!-- formal-statement-start -->
> **定義（連続の方程式の試験関数）**  
> $T>0$、$d\ge1$ に対し、$\varphi\in C^1([0,T]\times\mathbb R^d)$ で、あるコンパクト集合 $K\subset\mathbb R^d$ が存在して全時刻 $t\in[0,T]$ と $x\notin K$ で $\varphi(t,x)=0$ となる関数を**試験関数**とする。全体を $C_c^1([0,T]\times\mathbb R^d)$ と書く。$\nabla\varphi$ は空間変数だけの勾配であり、時間端点ではゼロを要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr17-test-function -->
**定義の確認**。$d=1$ で、区間の外で消える関数を

$$
h(x)=
\begin{cases}
(1-x^2)^2,& |x|<1,\\
0,& |x|\ge1
\end{cases}
$$

と置き、$\varphi(t,x)=(1+t)h(x)$ とします。内部の導関数は $h'(x)=-4x(1-x^2)$ で、$x=\pm1$ へ近づくと $0$ になります。外部の導関数も $0$ なので、$h$ と $h'$ は両境界で一致し $\varphi\in C^1$ です。

すべての時刻で $[-1,1]$ の外では $0$ です。また微分する変数を区別すると

$$
\partial_x\varphi=(1+t)h'(x),\qquad
\partial_t\varphi=h(x).
$$

時間端点 $t=0,T$ でも値が定義されているので、試験関数の全条件を確認できました。
<!-- definition-example-end -->

**狭義連続**とは、各有界連続関数 $f(x)$ に対し $t\mapsto\int f\,d\mu_t$ が連続なことです。有限測度の曲線では、$f\equiv1$ も含むため総質量が時刻について連続です。「ほとんど至る所の時刻で密度がある」ことは仮定しません。

ここで有限で非負の Borel 測度とは、既習の[Borel $\sigma$ 代数](../../F0/F0-00D2/index.md#def-f0-00d2-03)上の[測度](../../F0/F0-00D2/index.md#def-f0-00d2-04)で全空間の質量が有限なものです。速度場が **Borel可測**とは、各成分が[Borel可測関数の条件](../../F0/F0-00D2/index.md#def-f0-00d2-07)を満たすことです。これらを確認してから弱解の積分恒等式を課します。

<a id="def-otr17-measure-weak"></a>

<!-- formal-statement-start -->
> **定義（測度に対する連続の方程式の弱解）**  
> $T>0$、$d\ge1$ とする。$t\mapsto\mu_t$ は $[0,T]$ 上の狭義連続な有限非負Borel測度の曲線、$v:[0,T]\times\mathbb R^d\to\mathbb R^d$ はBorel可測な速度場とし、

$$
\int_0^T\int_{\mathbb R^d}|v(t,x)|\,d\mu_t(x)\,dt<\infty
$$

> を仮定する。与えられた初期測度 $\mu_0$ に対し、任意の $\varphi\in C_c^1([0,T]\times\mathbb R^d)$ で

$$
\begin{aligned}
\int\varphi(T,x)\,d\mu_T(x)
-\int\varphi(0,x)\,d\mu_0(x)
=\int_0^T\int\left(\partial_t\varphi+
v\cdot\nabla\varphi\right)d\mu_t\,dt
\end{aligned}
$$

> が成立するとき、$(\mu_t,v)$ は**連続の方程式の測度弱解**であるという。流束はベクトル値測度 $J_t=v(t,\cdot)\mu_t$（成分ごとに $dJ_{t,i}=v_i\,d\mu_t$）として読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr17-measure-weak -->
**定義の確認**。$d=1$、$\mu_t=\delta_{ct}$、$v(t,x)=c$ とします。各 $\mu_t$ は有限非負で、$\int f\,d\mu_t=f(ct)$ は任意の有界連続 $f$ で連続です。積分条件は $\int_0^T|c|\,dt=T|c|<\infty$ です。[曲線に沿う連鎖律](../../PDE/PDE1/index.md#prop-pde1-curve-composition)を $t\mapsto(t,ct)$ に適用すると

$$
\frac d{dt}\varphi(t,ct)=\partial_t\varphi(t,ct)
+c\,\partial_x\varphi(t,ct).
$$

この式を $0$ から $T$ まで積分すると、弱形式の左辺は $\varphi(T,cT)-\varphi(0,0)$、右辺もその値になります。密度がなくても定義の**全条件**を満たします。
<!-- definition-example-end -->

弱形式の各項には意味があります。左辺は時刻 $0,T$ における観測量の差、右辺の $\partial_t\varphi$ は観測関数自体の時間変化、$v\cdot\nabla\varphi$ は質量が動くことで観測値が変わる効果です。初期条件は左辺の $\mu_0$ の項で組み込まれています。

## 4. $C^1$ 密度では元のPDEに戻る

弱形式の符号が恣意的でないことを、微分可能な密度から直接導きます。境界項が無限遠で残らないよう、ここでは質量と流束が時間に依らない一つのコンパクト集合に支持を持つ場合を先に扱います。

<a id="thm-otr17-classical-weak"></a>

<!-- formal-statement-start -->
> **定理（古典形と弱形式の一致）**  
> $T>0$、$d\ge1$ とし、非負関数 $\rho\in C^1([0,T]\times\mathbb R^d)$ を取る。
> 速度場 $v\in C^1([0,T]\times\mathbb R^d;\mathbb R^d)$ を取る。
> あるコンパクト集合 $K$ の外で $\rho(t,\cdot)=0$ が全時刻で成り立つとする。
> $\mu_t=\rho(t,x)\,dx$ と置き、速度の積分可能性

$$
\int_0^T\int_{\mathbb R^d}\rho(t,x)|v(t,x)|\,dxdt<\infty
$$

> を仮定する。このとき次は同値である。
>
> 1. $\partial_t\rho+\nabla\cdot(\rho v)=0$ が $[0,T]\times\mathbb R^d$ の各点で成り立つ。
> 2. $(\mu_t,v)$ が[測度弱解の定義](#def-otr17-measure-weak)を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

試験関数を掛けて時間・空間の積分を一回ずつ部分積分すると、時間端点だけが残ります。逆向きには時間・空間の内部に支持を持つ試験関数を選んで、積分の中の連続関数が $0$ でなければ矛盾することを示します。

<!-- proof-start -->
### 証明

狭義連続性をまず確認します。有界連続な $f$ に対し、$\rho$ は $[0,T]\times K$ 上で一様有界・一様連続なので、$t_n\to t$ なら

$$
\left|\int f(x)(\rho(t_n,x)-\rho(t,x))\,dx\right|
\le\|f\|_\infty |K|\sup_{x\in K}|\rho(t_n,x)-\rho(t,x)|\to0.
$$

まず (1) を仮定します。$\varphi\in C_c^1$ について $\partial_t(\rho\varphi)$ と各成分 $\partial_{x_i}(\rho v_i\varphi)$ を実際に展開すると

$$
\begin{aligned}
\partial_t(\rho\varphi)+\nabla\cdot(\rho v\varphi)
&=\varphi\bigl(\partial_t\rho+\nabla\cdot(\rho v)\bigr)\\
&\quad+\rho\bigl(\partial_t\varphi+v\cdot\nabla\varphi\bigr)\\
&=\rho\bigl(\partial_t\varphi+v\cdot\nabla\varphi\bigr).
\end{aligned}
$$

$[0,T]\times\mathbb R^d$ で積分します。$\rho v\varphi$ は空間方向に一つの有限範囲の外で $0$ なので、その発散の全空間積分は $0$。時間微分は端点の差です。従って

$$
\int\rho(T,x)\varphi(T,x)\,dx-\int\rho(0,x)\varphi(0,x)\,dx
=\int_0^T\int\rho(\partial_t\varphi+v\cdot\nabla\varphi)\,dxdt.
$$

これは (2) です。逆に (2) を仮定し、端点で消える $\varphi\in C_c^1((0,T)\times\mathbb R^d)$ へ制限します。時間・空間をそれぞれ部分積分し直すと

$$
\int_0^T\int\varphi\bigl(\partial_t\rho+\nabla\cdot(\rho v)\bigr)\,dxdt=0.
$$

括弧を $F(t,x)$ とします。$F$ は連続です。もし $F(t_0,x_0)>0$ なら、近傍で $F>0$ なのでその近傍に支持を持つ非負で非零の滑らかな $\varphi$ を選べば積分は正になって矛盾します。$F<0$ でも同じです。よって内部で $F=0$、連続性により $t=0,T$ でも $F=0$ です。$\square$
<!-- proof-end -->

この同値は**滑らかなコンパクト支持の場合**の結論です。一般の弱解から古典微分が存在するとは主張していません。弱形式は微分できない密度や原子測度を捨てずに使うための定義です。

## 5. 弱形式だけからも総質量は保存される

試験関数 $\varphi\equiv1$ は空間方向で $0$ にならないので、$\mathbb R^d$ の[測度弱解の定義](#def-otr17-measure-weak)へそのまま代入できません。しかし速度の積分可能性は、遠方の境界へ質量が一気に消えることを防ぎます。

<a id="thm-otr17-mass"></a>

<!-- formal-statement-start -->
> **定理（可積分速度の下での総質量保存）**  
> $[0,T]\times\mathbb R^d$ 上の[測度弱解](#def-otr17-measure-weak) $(\mu_t,v)$ について、すべての $t\in[0,T]$ で

$$
\mu_t(\mathbb R^d)=\mu_0(\mathbb R^d).
$$

> 特に $\mu_0$ が確率測度なら、全時刻の $\mu_t$ も確率測度である。
<!-- formal-statement-end -->

### 証明の見取り図

半径 $R$ の球内で $1$、半径 $2R$ の球外で $0$ となる滑らかな cutoff を試験関数にします。空間勾配の大きさは $O(1/R)$ なので、速度の絶対積分可能性が境界寄与を消します。

<!-- proof-start -->
### 証明

$\chi\in C_c^1(\mathbb R^d)$ を $0\le\chi\le1$、$\chi=1$ on $B_1$、$\chi=0$ outside $B_2$、$|\nabla\chi|\le C$ を満たすように取り、$\chi_R(x)=\chi(x/R)$ とします。まず任意の $s\in[0,T]$ に弱式を制限できることを示します。$m_R(t)=\int\chi_R\,d\mu_t$ は狭義連続性により連続で、$q_R(t)=\int v\cdot\nabla\chi_R\,d\mu_t$ は $L^1(0,T)$ に属します。

$0<s<T$ に対し、$\eta_\varepsilon\in C^1([0,T])$ を $[0,s]$ で $1$、$[s+\varepsilon,T]$ で $0$、その間で単調に減少するように取ります。$\varphi(t,x)=\eta_\varepsilon(t)\chi_R(x)$ を元の弱式へ入れると、時間端点の差は $-m_R(0)$ であり、

$$
-m_R(0)=\int_0^T\eta_\varepsilon'(t)m_R(t)\,dt
+\int_0^T\eta_\varepsilon(t)q_R(t)\,dt.
$$

$\int_s^{s+\varepsilon}\eta_\varepsilon'\,dt=-1$ と $m_R$ の連続性から第一項は $-m_R(s)$ に収束します。第二項は $q_R\in L^1$ による支配収束で $\int_0^s q_R(t)\,dt$ に収束します。$s=T$ は $\eta\equiv1$ を直接使い、$s=0$ は自明です。こうして区間 $[0,s]$ の弱式を得て、空間側の試験関数 $\chi_R$ を代入すると

$$
\int\chi_R\,d\mu_s-\int\chi_R\,d\mu_0
=\int_0^s\int v\cdot\nabla\chi_R\,d\mu_tdt.
$$

従って

$$
\left|\int\chi_R\,d\mu_s-\int\chi_R\,d\mu_0\right|
\le\frac{C}{R}\int_0^T\int|v|\,d\mu_tdt\longrightarrow0.
$$

各 $\mu_s$ は有限測度で、$\chi_R(x)\to1$、$0\le\chi_R\le1$ なので支配収束から $\int\chi_Rd\mu_s\to\mu_s(\mathbb R^d)$。$s=0$ も同様です。結論を得ます。$\square$
<!-- proof-end -->

**限界**。速度の可積分性を外すと無限遠への逸走を排除できません。逆に確率測度という条件を先に課せば質量保存を定義へ埋め込めますが、上の定理はその結論が弱式と速度条件から導けることを示しています。

## 6. 壁を通り抜けないことを弱形式で表す

有界領域では全空間と違い境界から質量が出入りできます。[VC4の質量収支の基になる結果](../../../幾何系/VC/VC4/index.md#thm-vc4-local-to-integral)から、滑らかな場合には壁を通る流束の法線成分 $j\cdot n$ を $0$ と置けばよいと分かります。ただし測度が原子的な場合、境界上で $\rho v\cdot n$ という通常の関数の値は定義できません。そこで初めから**境界項なしの積分恒等式**で no-flux を定義します。以下の $C^1([0,T]\times\overline\Omega)$ は、閉領域の近傍まで $C^1$ に延長できる関数の制限とし、$\nabla\varphi$ は空間方向の勾配です。

<a id="def-otr17-no-flux"></a>

<!-- formal-statement-start -->
> **定義（有界領域の no-flux 弱条件）**  
> $\Omega\subset\mathbb R^d$ を有界 $C^1$ 領域、$T>0$ とする。
> $t\mapsto\mu_t$ は $\overline\Omega$ 上の狭義連続な有限非負測度の曲線とする。
> $v$ は $[0,T]\times\overline\Omega$ 上のBorel速度場とし、

$$
\int_0^T\int_{\overline\Omega}|v|\,d\mu_tdt<\infty
$$

> を仮定する。任意の $\varphi\in C^1([0,T]\times\overline\Omega)$ で

$$
\begin{aligned}
\int_{\overline\Omega}\varphi(T,x)\,d\mu_T
-\int_{\overline\Omega}\varphi(0,x)\,d\mu_0
=\int_0^T\int_{\overline\Omega}
(\partial_t\varphi+v\cdot\nabla\varphi)\,d\mu_tdt
\end{aligned}
$$

> が成立することを**no-flux 境界条件を伴う連続の方程式の弱形式**とする。境界上の流束が通常の関数として評価できるとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr17-no-flux -->
**定義の確認**。$\Omega=(0,1)$、$\mu_t=\boldsymbol1_{(0,1)}(x)\,dx$、$v=0$ とします。任意の $\varphi\in C^1([0,T]\times[0,1])$ で右辺は

$$
\int_0^T\int_0^1\partial_t\varphi\,dxdt
=\int_0^1(\varphi(T,x)-\varphi(0,x))\,dx,
$$

すなわち左辺に一致します。質量 $1$、速度積分 $0$、狭義連続性も満たします。古典流束は $j=0$ なので両端で $j\cdot n=0$ です。
<!-- definition-example-end -->

<a id="prop-otr17-no-flux-classical"></a>

<!-- formal-statement-start -->
> **命題（滑らかな場合の no-flux と法線流束）**  
> $\Omega\subset\mathbb R^d$ を有界 $C^1$ 領域、$T>0$ とする。
> $\rho,v$ は $[0,T]\times\overline\Omega$ 上 $C^1$、$\rho\ge0$ とする。
> $\mu_t=\rho(t,x)\,dx$ と置く。このとき[no-flux 弱条件](#def-otr17-no-flux)と、
> 内部の連続の方程式および境界上の次の条件は同値である。

$$
\rho(t,x)v(t,x)\cdot n(x)=0
\qquad (t\in[0,T],\ x\in\partial\Omega).
$$
<!-- formal-statement-end -->

### 証明の見取り図

内部では前節と同じ部分積分をします。境界に残る項が任意の試験関数に対して $0$ であることが法線流束 $0$ に対応します。

<!-- proof-start -->
### 証明

時間の部分積分と[第2節で導いた $d$ 次元の発散公式](#der-otr17-divergence-d)を使うと、任意の $\varphi\in C^1([0,T]\times\overline\Omega)$ について

$$
\begin{aligned}
&\int\varphi(T)\rho(T)\,dx-\int\varphi(0)\rho(0)\,dx\\
&\quad-\int_0^T\int_\Omega\rho(\partial_t\varphi+v\cdot\nabla\varphi)\,dxdt\\
&=\int_0^T\int_\Omega
\varphi(\partial_t\rho+\nabla\cdot(\rho v))\,dxdt
-\int_0^T\int_{\partial\Omega}\varphi\rho v\cdot n\,dSdt.
\end{aligned}
$$

内部PDEと境界条件が成り立てば右辺が $0$ なので弱条件になります。逆に弱条件を仮定し、内部でコンパクト支持の試験関数を選ぶと、[古典形と弱形式の定理](#thm-otr17-classical-weak)と同じ連続関数の反証法により内部PDEが成り立ちます。これを差し引くと、任意の境界まで滑らかな試験関数に対し境界積分が $0$ です。局所的に境界座標を取り、時間と境界上の小領域に支持を持つ非負の試験関数の境界値を延長して選べます。もし連続関数 $\rho v\cdot n$ がある境界点で非零なら、符号を一定に保つ小領域でその試験関数を選び、積分が非零となって矛盾します。よって境界流束は $0$ です。$\square$
<!-- proof-end -->

特に $\varphi\equiv1$ は有界領域で許されます。すると弱条件の右辺は $0$ で、$\mu_T(\overline\Omega)=\mu_0(\overline\Omega)$。任意の途中時刻にも同じ議論を適用できるので、no-flux の下では全時刻で質量が保存されます。

**境界の反例**。$\Omega=(0,1)$、$\rho\equiv1$、$v\equiv1$ とします。内部では $\partial_t\rho+\partial_x(\rho v)=0$、質量も常に $1$ です。しかし左右端で $j\cdot n=-1,+1$ と非零です。$\varphi(t,x)=x$ を no-flux 弱式へ代入すると左辺 $0$、右辺 $\int_0^T\int_0^1 1\,dxdt=T$ で矛盾します。**内部PDEと総質量一定だけでは壁の条件を保証しません**。

## 7. 粒子の流れから測度解を作る

速度場から出発して粒子の軌道 $X_t(a)$ を与えると、初期測度を押し出して時間発展を作れます。これは [OTR1の押し出し](../OTR1/index.md#def-otr1-transport-map) を時刻ごとに行う操作です。以下では流れの存在を無条件に主張せず、必要な滑らかさを**仮定**した上で保存則を検算します。

<a id="thm-otr17-flow"></a>

<!-- formal-statement-start -->
> **定理（滑らかな流れの押し出しは弱解）**  
> $v\in C^1([0,T]\times\mathbb R^d;\mathbb R^d)$ とする。
> $X\in C^1([0,T]\times\mathbb R^d;\mathbb R^d)$ がすべての $a\in\mathbb R^d$ で

$$
X_0(a)=a,\qquad \partial_tX_t(a)=v(t,X_t(a))
$$

> を満たすとする。$\mu_0$ をコンパクト支持の有限非負Borel測度とし、
> $\mu_t=(X_t)_{\#}\mu_0$ と置く。このとき $(\mu_t,v)$ は[測度弱解](#def-otr17-measure-weak)である。
<!-- formal-statement-end -->

### 証明の見取り図

押し出しによって観測関数の積分を初期点 $a$ の積分へ戻し、[曲線に沿う連鎖律](../../PDE/PDE1/index.md#prop-pde1-curve-composition)を $t\mapsto X_t(a)$ に適用します。コンパクト支持が時間全体で有界に動くので時間積分と測度積分を交換できます。

<!-- proof-start -->
### 証明

$\mu_0$ の支持をコンパクト集合 $K$ に含めます。$X$ の連続性から $\{X_t(a):t\in[0,T],a\in K\}$ はコンパクトです。そこで $v$ と $\partial_tX$ は有界であり、$\int_0^T\int|v|\,d\mu_tdt<\infty$ です。

任意の有界連続 $f$ に対し [押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration) から

$$
\int f(x)\,d\mu_t(x)=\int_K f(X_t(a))\,d\mu_0(a).
$$

$t_n\to t$ のとき各 $a$ で被積分関数が収束し、$|f(X_{t_n}(a))|\le\|f\|_\infty$ です。よって支配収束から狭義連続です。

$\varphi\in C_c^1$ に対しては、初期点 $a$ を固定して **時刻 $t$ で全微分**します。[PDE1の曲線に沿う連鎖律](../../PDE/PDE1/index.md#prop-pde1-curve-composition)は空間1次元の場合です。ここでは $X_t(a)=(X_t^1(a),\ldots,X_t^d(a))$ と各成分に拡張し、$\partial_tX_t^i(a)=v_i(t,X_t(a))$ を代入します。

$$
\begin{aligned}
\frac d{dt}\varphi(t,X_t(a))
&=\partial_t\varphi(t,X_t(a))
+\sum_{i=1}^d\partial_{x_i}\varphi(t,X_t(a))
  \frac d{dt}X_t^i(a)\\
&=\partial_t\varphi(t,X_t(a))
+\nabla\varphi(t,X_t(a))\cdot v(t,X_t(a)).
\end{aligned}
$$

これを $0$ から $T$ まで積分し、$a$ について $\mu_0$ で積分します。連続な被積分関数は $[0,T]\times K$ 上で有界なので積分順序を交換できます。

時間端点の二項には[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を適用して $\mu_T,\mu_0$ に戻します。時間積分の項にも、各時刻 $t$ に同じ[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を適用して $\mu_t$ に戻します。これで弱形式そのものを得ます。$\square$
<!-- proof-end -->

密度がある場合は、さらに $X_t$ の微分行列が体積をどう拡大するかを追えます。時刻 $t$ を**固定し、初期座標 $a$ で偏微分**した行列を

$$
D_aX_t(a)=\left(\frac{\partial X_t^i(a)}{\partial a_j}\right)_{1\le i,j\le d}
$$

と書きます。これは時間微分 $\partial_tX_t(a)=v(t,X_t(a))$ とは別のものです。

次の命題では $X_t$ が $C^1$ 級微分同相と仮定します。[OTR16で説明した体積倍率と密度の関係](../OTR16/index.md#def-otr16-internal-energy)と同じく、Jacobian

$$
J_t(a)=\det D_aX_t(a)>0
$$

が体積倍率を与えます。多変数の変数変換では $dy=|\det D_aX_t(a)|\,da$ であり、正値性によって絶対値を外せます。

<a id="prop-otr17-jacobian"></a>

<!-- formal-statement-start -->
> **命題（流れのJacobianによる密度保存）**  
> [滑らかな流れの定理](#thm-otr17-flow)の仮定に加え、$X_t:\mathbb R^d\to\mathbb R^d$ は各時刻 $C^1$ 微分同相、$D_aX_t$ は $(t,a)$ について $C^1$、$J_t=\det D_aX_t>0$ とする。$\mu_0=\rho_0(a)\,da$ なら $\mu_t$ は密度を持ち、ほとんど至る所の $a$ で

$$
\rho(t,X_t(a))J_t(a)=\rho_0(a).
$$

> さらに各 $a$ で

$$
\partial_tJ_t(a)=J_t(a)\,\nabla\cdot v(t,X_t(a)).
$$
<!-- formal-statement-end -->

### 証明の見取り図

第一式は押し出し積分を変数変換した質量保存です。第二式は軌道の微分方程式を初期点 $a$ で微分し、行列式の微分公式を適用します。

<!-- proof-start -->
### 証明

任意のコンパクト支持連続関数 $f$ に対して[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)から

$$
\int f(y)\,d\mu_t(y)=\int f(X_t(a))\rho_0(a)\,da.
$$

$y=X_t(a)$ と変数変換すると $dy=J_t(a)\,da$ です。従って右辺は

$$
\int f(y)\,
\frac{\rho_0(X_t^{-1}(y))}{J_t(X_t^{-1}(y))}\,dy
$$

に等しくなります。任意の $f$ に対して積分が一致するため、$\rho(t,y)=\rho_0(X_t^{-1}(y))/J_t(X_t^{-1}(y))$ が密度であり、$y=X_t(a)$ に戻せば第一式を得ます。

$A_t=D_aX_t(a)$ と置きます。軌道の方程式を $a$ で微分して連鎖律を使うと

$$
\partial_tA_t=D_xv(t,X_t(a))A_t.
$$

ここで $\operatorname{tr}B=\sum_iB_{ii}$ は正方行列の対角成分の和です。可逆行列 $A_t$ に対しては

$$
\det(A_t+h\,\partial_tA_t)
=\det A_t\det(I_d+hA_t^{-1}\partial_tA_t),
$$

また行列式の置換展開と $A_t$ の微分可能性から

$$
\det(I_d+hB)=1+h\operatorname{tr}B+O(h^2),
\qquad A_{t+h}=A_t+h\,\partial_tA_t+o(h)
$$

を得ます。これらを合わせて $h\to0$ とすると、Jacobi の微分公式は

$$
\partial_t\det A_t
=\det A_t\operatorname{tr}(A_t^{-1}\partial_tA_t)
$$

となります。これを適用すると、

$$
\begin{aligned}
\partial_tJ_t
&=J_t\operatorname{tr}(A_t^{-1}D_xv(t,X_t)A_t)\\
&=J_t\operatorname{tr}(D_xv(t,X_t))
=J_t\,\nabla\cdot v(t,X_t).
\end{aligned}
$$

中央の等号は $\operatorname{tr}(PQ)=\operatorname{tr}(QP)$（行列の積の成分和）により、

$$
\operatorname{tr}(A^{-1}BA)
=\operatorname{tr}(BAA^{-1})
=\operatorname{tr}B
$$

となるためです。$X_0(a)=a$ だから $D_aX_0=I_d$、$J_0=1$ です。よって軌道上の密度は体積倍率の逆数で変わります。$\square$
<!-- proof-end -->

この公式は [OTR16の滑らかな内部エネルギーの定理](../OTR16/index.md#thm-otr16-internal)で用いた密度と Jacobian の関係を、**任意の滑らかな時間発展**へ読み替えたものです。最適輸送写像であることは、この保存則の証明には必要ありません。

### 二つの例を並べて確かめる

- **移動する原子**：$\mu_0=\delta_0$、$X_t(a)=a+ct$ なら $\mu_t=\delta_{ct}$。密度の公式は使えませんが[滑らかな流れの押し出しは弱解](#thm-otr17-flow)を適用できます。
- **一様分布の拡大**：$d=1$、$\mu_0=\boldsymbol1_{[0,1]}da$、$X_t(a)=(1+t)a$（$0\le t\le T$）なら $v(t,x)=x/(1+t)$、$J_t=1+t$、$\rho(t,x)=(1+t)^{-1}\boldsymbol1_{[0,1+t]}(x)$。台の端では密度が不連続なので古典形の定理は直接適用できませんが、[滑らかな流れの押し出しは弱解](#thm-otr17-flow)で正当化できます。台の内部では

$$
\partial_t\rho=-\frac1{(1+t)^2},\qquad
\partial_x(\rho v)=\partial_x\frac{x}{(1+t)^2}
=\frac1{(1+t)^2},
$$

  となって打ち消します。端点が動くことも流れの押し出しに含まれ、質量は $\int_0^{1+t}(1+t)^{-1}dx=1$ です。

## 8. ここで分かったことと次への接続

- 局所保存の未知量は密度 $\rho$ だけでなく、**流束 $\rho v$** です。$\nabla\cdot v$ の項を落とすと一般には保存できません。
- 弱形式は速度の可積分性と測度の狭義連続性を指定し、初期測度と時刻端点を含めます。Dirac 測度にも適用できます。
- 全空間の総質量保存と、有界領域の no-flux は異なる主張です。後者は境界項が消えることを要求します。
- 滑らかな流れの押し出しは弱解を作り、密度があれば Jacobian が膨張と希薄化を結び付けます。ただし流れの存在・最適性・速度場の一意性は本章の結論に含めません。

次の OTR18 では、こうして得られる**測度曲線の速さ**を $W_2$ によって測ります。OTR19 で初めて、静的な最適輸送費用と速度場の作用の関係を比較します。

## 9. 演習：弱形式で保存則を検算する

### OTR17-A01 流束と積の微分
- Level: A

$d=1$、$g\in C_c^1(\mathbb R)$、$g\ge0$、$\int g=1$、$c\in\mathbb R$ とする。$\rho(t,x)=g(x-ct)$、$v=c$ に対して $j$、$\partial_t\rho$、$\partial_xj$ を求め、連続の方程式と全質量保存を確かめよ。

<!-- solution-start -->
**詳細解答**。定義から $j=\rho v=cg(x-ct)$ です。連鎖律で

$$
\partial_t\rho=-cg'(x-ct),\qquad
\partial_xj=cg'(x-ct).
$$

両者の和は $0$。全質量は $y=x-ct$ の置換で

$$
\int_{\mathbb R}\rho(t,x)\,dx
=\int_{\mathbb R}g(y)\,dy=1.
$$

したがって局所保存と全質量保存をそれぞれ検証できました。
<!-- solution-end -->

### OTR17-A02 変数速度で欠けやすい項
- Level: A

$g\in C_c^1(\mathbb R)$、$\int g=1$、$g\ge0$ とする。$\rho(t,x)=e^{-t}g(e^{-t}x)$、$v(t,x)=x$（$t\in[0,T]$）について $\partial_t\rho+v\partial_x\rho$ と $\partial_t\rho+\partial_x(\rho v)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$z=e^{-t}x$ と置くと $\partial_tz=-z$、$\partial_xz=e^{-t}$ なので

$$
\partial_t\rho=-e^{-t}g(z)-e^{-t}zg'(z),\qquad
\partial_x\rho=e^{-2t}g'(z).
$$

従って

$$
\partial_t\rho+x\partial_x\rho
=-e^{-t}g(z)-e^{-t}zg'(z)+xe^{-2t}g'(z)
=-\rho.
$$

一方 $\partial_x(\rho x)=x\partial_x\rho+\rho$ なので $\partial_t\rho+\partial_x(\rho v)=0$。$\partial_xv=1$ が落としやすい項です。
<!-- solution-end -->

### OTR17-A03 移動する原子の全条件
- Level: A

$c\in\mathbb R$、$\mu_t=\delta_{2+ct}$、$v(t,x)=c$ とする。$[0,T]$ 上の [測度弱解の定義](#def-otr17-measure-weak)の狭義連続性、速度積分、試験関数恒等式をすべて検証せよ。

<!-- solution-start -->
**詳細解答**。有界連続 $f$ について $\int f\,d\mu_t=f(2+ct)$ は連続で、各 $\mu_t$ は質量 $1$ の有限非負測度です。速度積分は $T|c|$ で有限です。任意の試験関数 $\varphi$ に [曲線に沿う連鎖律](../../PDE/PDE1/index.md#prop-pde1-curve-composition)を適用すると

$$
\frac d{dt}\varphi(t,2+ct)
=\partial_t\varphi(t,2+ct)+c\partial_x\varphi(t,2+ct).
$$

両辺を $0$ から $T$ まで積分すれば

$$
\varphi(T,2+cT)-\varphi(0,2)
=\int_0^T(\partial_t\varphi+c\partial_x\varphi)(t,2+ct)\,dt,
$$

これは測度弱形式です。Lebesgue密度は不要です。
<!-- solution-end -->

### OTR17-A04 区間の左右の符号
- Level: A

$\Omega=(0,1)$、$\rho(t,x)=1$、$v(t,x)=1$ とする。内部PDEと総質量はどうなるか。左右端の外向き流束を計算し、$\varphi(t,x)=x$ が [no-flux 弱条件](#def-otr17-no-flux)に反することを示せ。

<!-- solution-start -->
**詳細解答**。$\partial_t\rho=0$、$\partial_x(\rho v)=\partial_x1=0$ で内部PDEは成立し、$\int_0^1\rho dx=1$ です。左法線は $-1$、右法線は $+1$ だから外向き流束はそれぞれ $-1,+1$ です。試験関数 $\varphi=x$ は $C^1$ で、弱式左辺は $\int_0^1x\,dx-\int_0^1x\,dx=0$。右辺は

$$
\int_0^T\int_0^1(0+1\cdot1)\,dxdt=T>0.
$$

従って no-flux は不成立です。正味の境界流束 $-1+1=0$ と、各境界での流束 $0$ を混同してはいけません。
<!-- solution-end -->

### OTR17-A05 弱式で保存される総質量
- Level: A

$[0,T]\times\mathbb R^d$ 上の測度弱解が $\int_0^T\int|v|d\mu_tdt=M<\infty$ を満たすとする。$0\le\chi_R\le1$、$\chi_R=1$ on $B_R$、$\chi_R=0$ outside $B_{2R}$、$|\nabla\chi_R|\le C/R$ を使い、任意の $s\in[0,T]$ で総質量保存を導け。

<!-- solution-start -->
**詳細解答**。弱式を $[0,s]$ に制限して時間に依らない $\chi_R$ を代入すると

$$
\int\chi_Rd\mu_s-\int\chi_Rd\mu_0
=\int_0^s\int v\cdot\nabla\chi_R\,d\mu_tdt.
$$

右辺の絶対値は $(C/R)M\to0$。各 $\mu_s$ は有限で $\chi_R\to1$、$0\le\chi_R\le1$ なので支配収束により左辺は $\mu_s(\mathbb R^d)-\mu_0(\mathbb R^d)$ に収束します。ゆえに差は $0$ です。空間全体の試験関数 $1$ を直接使わず cutoff を使った理由もこれで確認できます。
<!-- solution-end -->

### OTR17-B01 回転流は壁を通らない
- Level: B

$d=2$、$\Omega=\{(x,y):x^2+y^2<1\}$、$\rho=1/\pi$、$v(x,y)=(-y,x)$ とする。内部PDE、境界上の $\rho v\cdot n$、総質量を計算し、[no-flux の古典命題](#prop-otr17-no-flux-classical)を適用せよ。

<!-- solution-start -->
**詳細解答**。$\partial_t\rho=0$ で、$\nabla\cdot v=\partial_x(-y)+\partial_yx=0$。よって

$$
\partial_t\rho+\nabla\cdot(\rho v)
=0+\frac1\pi\nabla\cdot v=0.
$$

境界の外向き単位法線は $n=(x,y)$（$x^2+y^2=1$）です。従って

$$
\rho v\cdot n=\frac1\pi(-yx+xy)=0.
$$

面積が $\pi$ なので質量は $\int_\Omega(1/\pi)dxdy=1$。$\rho,v$ は閉円板上滑らかで領域は $C^1$、[no-flux の古典命題](#prop-otr17-no-flux-classical)の仮定を満たすため、全ての $C^1$ 試験関数で no-flux 弱式が成立します。回転運動は非零の速度でも壁への法線輸送を持ちません。
<!-- solution-end -->

### OTR17-B02 $d$ 次元の一様な膨張
- Level: B

$d\ge1$、$\mu_0$ を $[0,1]^d$ 上の一様確率測度とし、$X_t(a)=(1+t)a$ とする。速度 $v(t,x)$、Jacobian、$\rho_t$、全質量を求め、[滑らかな流れの押し出しは弱解](#thm-otr17-flow)を使って弱式を証明せよ。台の境界での古典微分についても注意を述べよ。

<!-- solution-start -->
**詳細解答**。$\partial_tX_t(a)=a=X_t(a)/(1+t)$ なので $v(t,x)=x/(1+t)$。微分行列は $D_aX_t=(1+t)I_d$、従って $J_t=(1+t)^d>0$ です。[Jacobianの密度保存](#prop-otr17-jacobian)から

$$
\rho(t,x)=(1+t)^{-d}\boldsymbol1_{[0,1+t]^d}(x).
$$

台の体積は $(1+t)^d$ なので積分は $1$。$X_t$ は $C^1$ 微分同相で初期支持はコンパクト、$v$ は $[0,T]$ と移動する支持上で有界です。[滑らかな流れの押し出しは弱解](#thm-otr17-flow)を直接適用でき、任意の試験関数で弱式が成立します。密度は移動する立方体の境界で一般に不連続なので[古典形と弱形式の一致](#thm-otr17-classical-weak)の $C^1$ 仮定は満たしません。この定理を無条件に流用しないことが要点です。
<!-- solution-end -->

### OTR17-B03 一次モーメントの移動速度
- Level: B

$d=1$ の測度弱解 $(\mu_t,v)$ が全時刻で共通のコンパクト集合 $[-R,R]$ に支持を持ち、速度の積分が有限とする。$m(t)=\int x\,d\mu_t(x)$ について

$$
m(s)-m(0)=\int_0^s\int v(t,x)\,d\mu_t(x)dt
$$

を証明し、$\mu_t=\frac12(\delta_{t}+\delta_{2+t})$、$v=1$ で検算せよ。

<!-- solution-start -->
**詳細解答**。$[-R,R]$ 上で $\chi(x)=1$ となるコンパクト支持 $C^1$ 関数を取り、試験関数 $\varphi(t,x)=x\chi(x)$ とします。支持上は $\varphi=x$、$\partial_x\varphi=1$、$\partial_t\varphi=0$ です。[総質量保存の証明で示した時間cutoff](#thm-otr17-mass)と同じ操作で弱式を $[0,s]$ に制限すると

$$
\int x\,d\mu_s-\int x\,d\mu_0
=\int_0^s\int v\,d\mu_tdt.
$$

例では $m(t)=\frac12(t+2+t)=1+t$、従って $m(s)-m(0)=s$。右辺は $\int_0^s(\frac12+\frac12)dt=s$ で一致します。$x$ 自体は空間方向に有限範囲の外で消えないため cutoff が必要です。
<!-- solution-end -->

### OTR17-B04 速度場は測度の外で決まらない
- Level: B

$d=1$、$\mu_t=\delta_0$ とする。$v_1(t,x)=0$ と $v_2(t,x)=x$ の両方が同じ測度曲線について弱解を与えることを示せ。なぜこの例は速度場の一意性を意味しないか。

<!-- solution-start -->
**詳細解答**。どちらも Borel 可測で、測度が集中する $x=0$ では $v_1(t,0)=v_2(t,0)=0$ です。したがって速度積分は両者とも $0$。任意の試験関数について両者の弱式右辺は

$$
\int_0^T\partial_t\varphi(t,0)dt
=\varphi(T,0)-\varphi(0,0),
$$

であり、左辺と一致します。狭義連続性も明白です。$x\ne0$ では両速度場は異なりますが、$d\mu_t$ がそこに質量を置かないので $v\mu_t$ という流束は同じです。弱形式が検出するのは主に**測度が載る場所での速度**であり、周囲全域の速度場を一意に復元するものではありません。
<!-- solution-end -->

### OTR17-C01 伸びながら平行移動する密度
- Level: C

$0\le t\le1$ とし、$\mu_0$ を $[0,1]$ 上の一様確率測度とする。粒子を $X_t(a)=(1+t)a+t^2$ で移動させる。次を順に示せ。

1. Euler表示の速度場 $v(t,x)$、中間密度 $\rho_t$、質量保存を求める。
2. 弱解であることを証明し、台の内部の $\partial_t\rho+\partial_x(\rho v)=0$ を直接検算する。
3. 二乗速度の時間積分 $A=\int_0^1\int|v|^2\,d\mu_tdt$ を計算する。また [一次元最適輸送公式](../OTR11/index.md#thm-otr11-quantile-formula)による端点間 $W_2^2(\mu_0,\mu_1)$ と比較せよ。一般の最小作用の定理は使わず、この経路の値を計算すること。

<!-- solution-start -->
**詳細解答**。第一に $x=X_t(a)$ を $a$ について解くと $a=(x-t^2)/(1+t)$ です。$\partial_tX_t(a)=a+2t$ を代入して

$$
v(t,x)=\frac{x-t^2}{1+t}+2t.
$$

$D_aX_t=1+t>0$ なので [Jacobianの密度保存](#prop-otr17-jacobian)から

$$
\rho(t,x)=\frac1{1+t}\boldsymbol1_{[t^2,\,1+t+t^2]}(x).
$$

区間の長さは $1+t$ なので質量は $(1+t)^{-1}(1+t)=1$。第二に $X_t$ は $C^1$ 微分同相、初期支持は $[0,1]$ でコンパクト、速度は移動する支持上で有界です。[滑らかな流れの押し出しは弱解](#thm-otr17-flow)で弱形式が成立します。台の内部では $\rho=(1+t)^{-1}$ なので

$$
\partial_t\rho=-\frac1{(1+t)^2},\quad
\partial_x(\rho v)
=\frac1{1+t}\cdot\frac1{1+t}
=\frac1{(1+t)^2},
$$

で和は $0$。移動境界の不連続性は押し出しによる弱式が処理しています。

第三に押し出し積分で初期点 $a$ に戻すと $v(t,X_t(a))=a+2t$ だから

$$
\begin{aligned}
A&=\int_0^1\int_0^1(a+2t)^2\,da\,dt\\
&=\int_0^1\left(\frac13+2t+4t^2\right)dt\\
&=\frac13+1+\frac43=\frac83.
\end{aligned}
$$

端点は $X_1(a)=2a+1$ で単調増加です。従って [一次元の単調最適結合の公式](../OTR11/index.md#thm-otr11-quantile-formula)の条件を満たし、端点距離は

$$
\begin{aligned}
W_2^2(\mu_0,\mu_1)
&=\int_0^1|X_1(a)-a|^2da\\
&=\int_0^1(a+1)^2da
=\frac13+1+1=\frac73.
\end{aligned}
$$

よってこの経路の $A=8/3$ は端点距離の二乗 $7/3$ より $1/3$ 大きいと**計算上**分かります。時間中に平行移動を加速する経路は定速測地線とは限りません。一般の最小作用原理を証明したことにはならず、それは後続で扱います。
<!-- solution-end -->
