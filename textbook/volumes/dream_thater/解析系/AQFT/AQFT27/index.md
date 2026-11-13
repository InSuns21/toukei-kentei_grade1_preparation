# AQFT27 Bisognano–Wichmann（自由スカラー場）

[AQFT26の二点関数の解析帯](../AQFT26/index.md#thm-aqft26-strip-analyticity)では、右wedgeを保つboostの複素rapidityに幅 $2\pi$ の帯が現れました。しかし、**二点関数がKMS型の境界値を持つ**ことと、**wedgeの有界可観測量全体のモジュラー群がboostである**ことは別問題です。ここでは、点場の形式的な解析接続を、閉じた一粒子作用素の等式へ持ち上げ、さらにFock空間の有界Weyl作用素を使って後者まで証明します。

計量は $(-,+,+,+)$、$c=\hbar=1$ とし、$m>0$ の**実・中性Klein–Gordon自由場のMinkowski真空Fock表現**に限ります。

[右wedgeの定義](../AQFT1/index.md#def-aqft1-wedges)と[boostの定義](../AQFT26/index.md#def-aqft26-boost)を採用します。具体的には

$
W_R=\{x:x^1>|x^0|\},\qquad
\Lambda(s)|_{01}=
\begin{pmatrix}
\cosh s&\sinh s\\
\sinh s&\cosh s
\end{pmatrix}
$

です。$U(s)$ はこのboostの真空表現、$\Omega$ は真空とします。**到達目標**は

$$
\boxed{\Delta_{W_R}^{it}=U(-2\pi t),\qquad
\sigma_t^{W_R}(A)=U(-2\pi t)AU(2\pi t)}
$$

を $A\in\mathcal M(W_R)$ について証明し、$\Delta$ の半べきの**定義域**と、$-2\pi$ の**符号**まで確認することです。

## 1. 場の位置を実線形部分空間として記録する

[AQFT8の正周波数写像](../AQFT8/index.md#def-aqft8-positive-frequency)は、実試験関数 $f$ を一粒子波束 $K[f]$ に送ります。複素係数を掛けた波束はもはや一般に実試験関数からは出ません。したがって、局所性を記録するには複素線形空間だけでなく**実線形部分空間**が必要です。

<a id="def-aqft27-wedge-standard-subspace"></a>

<!-- formal-statement-start -->
> **定義（自由場のwedge実部分空間）**  
> $\mathfrak h=L^2(\mathbb R^3,d^3p)$ に第2変数線形の内積を入れ、$m>0$ とする。実試験関数からなる集合とその実線形閉包を

$
K_0(W_R)=\{K[f]:f\in C_c^\infty(W_R,\mathbb R)\},
\qquad H(W_R)=\overline{K_0(W_R)}^{\,\mathbb R}
$

> と定める。
<!-- formal-statement-end -->

この実部分空間がどれだけ大きいか、そして虚数倍との重なりがあるかを分けて判定したいので、次の定義を用います。

<a id="def-aqft27-standard-real-subspace"></a>

<!-- formal-statement-start -->
> **定義（標準実部分空間）**  
> 複素Hilbert空間 $\mathfrak h$ の閉じた実線形部分空間 $H$ を**標準**というのは、次の二条件を満たす場合である。

$
\overline{H+iH}=\mathfrak h,\qquad H\cap iH=\{0\}.
$
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft27-standard-real-subspace -->
### 直接例：複素平面の実軸

$\mathfrak h=\mathbb C$ に通常の複素内積を入れ、$H=\mathbb R\subset\mathbb C$ とします。$H$ は実線形で閉じており、$H+iH=\{a+ib:a,b\in\mathbb R\}=\mathbb C$ です。また、実数かつ純虚数の数は $0$ だけなので $H\cap iH=\{0\}$。従ってこの $H$ は標準です。対照的に $H=\mathbb C$ を実線形部分空間とみなすと、$H\cap iH=\mathbb C$ となり標準ではありません。
<!-- definition-example-end -->

試験関数の有限実線形結合も実試験関数なので $K_0(W_R)$ は実線形です。記号 $H(W_R)$ は一粒子空間に属し、[局所von Neumann環](../AQFT9/index.md#def-aqft9-fock-local-vn) $\mathcal M(W_R)$ とは異なります。後者は

$$
\mathcal M(W_R)=
\{W(h):h\in H(W_R)\}'',\qquad W(h)=e^{i(a(h)+a^\dagger(h))}
$$

です。$h\mapsto W(h)$ は強連続なので、$K_0$ で生成しても同じ環になります（[Fock Weyl表現](../AQFT8/index.md#def-aqft8-fock-weyl)）。

<!-- definition-example-start: def-aqft27-wedge-standard-subspace -->
### 直接例：非零の実波束とその虚数倍

$0<a<b$ とし、非負の実滑らかな関数 $f$ を点 $(x^0,x^1,x_\perp)=(0,a,0)$ の十分小さい近傍に支持させます。その近傍を $W_R$ に含め、$f$ を非零とし、$|x^0|$ を十分小さく選べば

$$
\widetilde f(m,0)=\int f(x)e^{imx^0}\,d^4x\ne0
$$

です。従って $h=K[f]\ne0$ であり、$h\in K_0(W_R)\subset H(W_R)$ です。一方、$ih$ が $H(W_R)$ にも属するかは、複素空間であるという理由だけでは決められません。第3節で $h$ と $ih$ に対する反線形作用素の符号を直接調べ、$ih\notin H(W_R)$ と示します。
<!-- definition-example-end -->

## 2. rapidityの解析帯から作用素の定義域へ

前講では**二点核**を解析接続しました。今回は一粒子**波束そのもの**を解析します。質量殻の縦運動量を

$$
p^0=\mu_\perp\cosh\theta,\quad
p^1=\mu_\perp\sinh\theta,\quad
\mu_\perp=\sqrt{m^2+|p_\perp|^2}
$$

と書きます。$dp^1=\mu_\perp\cosh\theta\,d\theta$ なので、$h(p)\mapsto\psi(\theta,p_\perp)=\sqrt{p^0}\,h(p)$ は $\mathfrak h$ から $L^2(\mathbb R_\theta\times\mathbb R^2_{p_\perp})$ へのユニタリ写像です。[AQFT8の質量殻Fourier式](../AQFT8/index.md#thm-aqft8-wightman-match)に現れる位相 $i$ を残すと

$$
\psi_f(\theta,p_\perp)=
\frac{i}{\sqrt2(2\pi)^{3/2}}
\int f(x)\exp\!\left(
i\mu_\perp\cosh\theta\,x^0
-i\mu_\perp\sinh\theta\,x^1-ip_\perp\cdot x_\perp
\right)d^4x.
$$

boostの一粒子表現は質量殻測度を保ち、

$$
(u(s)\psi)(\theta,p_\perp)=\psi(\theta-s,p_\perp),
\qquad U(s)=\Gamma(u(s))
$$

となります。実際、$f_s(x)=f(\Lambda(-s)x)$ と変数変換すると $\psi_{f_s}(\theta)=\psi_f(\theta-s)$ です（[共変性](../AQFT9/index.md#prop-aqft9-vn-covariance)）。

先に**候補の**モジュラー作用素を定義します。実際のTomita作用素との一致は、あとで証明するので循環しません。

<a id="def-aqft27-geometric-tomita"></a>

<!-- formal-statement-start -->
> **定義（boostから作る一粒子Tomita候補）**  
> $\mathfrak h\simeq L^2(d\theta\,d^2p_\perp)$ で

$$
(\delta^{it}\psi)(\theta,p_\perp)=\psi(\theta+2\pi t,p_\perp),
\qquad
(j\psi)(\theta,p_\perp)=-\overline{\psi(\theta,-p_\perp)}
$$

> と置く。$\delta$ は $\delta^{it}=u(-2\pi t)$ を満たす正の自己共役作用素、$j$ は反ユニタリ作用素である。$\delta^{1/2}$ のスペクトル定理による定義域上で、閉反線形作用素

$$
T=j\delta^{1/2}
$$

> を**幾何学的Tomita候補**と呼ぶ。ここでの $\delta,j,T$ は、まだ $H(W_R)$ のモジュラー対象と同定していない。
<!-- formal-statement-end -->

$Q=\log\delta$ とすれば $u(s)=e^{isG}$、$G=i\partial_\theta$ であり、$Q=-2\pi G=-2\pi i\partial_\theta$ です。従って解析可能な波束での $\delta^{1/2}$ は、形式的には $\theta\mapsto\theta-i\pi$ に対応します。この形式的な置換が**真に作用素の定義域を与える**ことを示すのが次の補題です。

<!-- definition-example-start: def-aqft27-geometric-tomita -->
### 直接例：符号と反線形性を検査する

$\psi(\theta,p_\perp)=e^{-\theta^2-|p_\perp|^2}$ とすると $j\psi=-\psi$、$j(i\psi)=i\psi$ です。すなわち $j$ は線形でなく $j(i\psi)=-ij\psi$ を満たします。また $j^2=1$ で、横運動量の反転は二回で元へ戻ります。$j$ が負号を持つ理由は、波束 $K[f]$ に**位相 $i$** が含まれるためです。この負号を消すと、wedgeに支持された実 $f$ の波束で $T\psi_f=\psi_f$ が成立しなくなります。
<!-- definition-example-end -->

<a id="lem-aqft27-strip-boundary"></a>

<!-- formal-statement-start -->
> **補題（wedge試験関数の半周境界値）**  
> $m>0$、$f\in C_c^\infty(W_R,\mathbb R)$ とする。上の $\psi_f$ は $\theta$ について $-\pi<\operatorname{Im}\theta<0$ へ正則に延長され、閉帯の各高さで $L^2(d\theta\,d^2p_\perp)$ に属し、特に

$$
\psi_f(\theta-i\pi,p_\perp)
=-\overline{\psi_f(\theta,-p_\perp)}
=(j\psi_f)(\theta,p_\perp).
$$

> この境界値はスペクトル定理で定義した $\delta^{1/2}\psi_f$ と一致する。従って $\psi_f\in\operatorname{Dom}\delta^{1/2}$ であり、$T\psi_f=\psi_f$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

右wedgeにある点では $x^1\cosh\theta-x^0\sinh\theta>0$ です。$\theta\mapsto\theta-iv$（$0<v<\pi$）としたときの減衰因子がこの正量で決まり、半周の端で $(p^0,p^1)\mapsto(-p^0,-p^1)$ となります。残る横運動量の符号と正周波数写像の $i$ を一段ずつ確認します。

<!-- proof-start -->
### 証明

$f$ の支持は右wedgeのコンパクト集合に含まれるので、ある $c>0$ が存在し、支持上の各 $x$ と実 $\theta$ に対し

$$
x^1\cosh\theta-x^0\sinh\theta
=\cosh\theta(x^1-x^0\tanh\theta)\ge c\cosh\theta.
$$

$\theta$ を $\theta-iv$ に置いた指数の絶対値は

$$
\left|\exp\bigl(i\mu_\perp\cosh(\theta-iv)x^0
-i\mu_\perp\sinh(\theta-iv)x^1\bigr)\right|
=e^{-\mu_\perp\sin v(x^1\cosh\theta-x^0\sinh\theta)}
\le1.
$$

ここで $0\le v\le\pi$ です。コンパクトな $x$ 領域上で微分と積分を交換できるため正則性が従います。端点を含む $L^2$ 制御も省略できません。$\theta$ が大きい領域では、$x^0,x^1$ に関する積分を部分積分して、位相の係数 $p^0\pm p^1=\mu_\perp e^{\pm(\theta-iv)}$ のうち大きい方を分母に移します。例えば $|\theta|\ge1$ なら適切な光円錐変数の微分を $N$ 回移し、$f$ の有限個の微分の $L^1$ ノルムから

$$
|\psi_f(\theta-iv,p_\perp)|
\le C_N(1+|p_\perp|)^{-N}(1+e^{|\theta|})^{-N}
$$

を、$0\le v\le\pi$ で一様に得ます。横方向の減衰は $x_\perp$ の部分積分で得られ、$m>0$ が分母の一様な正の下限を与えます。従って $N$ を大きく取れば閉帯各高さの $L^2$ ノルムは一様有界で、境界極限も $L^2$ です。

$\cosh(\theta-i\pi)=-\cosh\theta$、$\sinh(\theta-i\pi)=-\sinh\theta$ を波束の式へ代入すると

$$
\psi_f(\theta-i\pi,p_\perp)
=\frac{i}{\sqrt2(2\pi)^{3/2}}
\int f(x)e^{-ip^0x^0+ip^1x^1-ip_\perp\cdot x_\perp}\,d^4x.
$$

$f$ が実数値なので、$-\overline{\psi_f(\theta,-p_\perp)}$ もこの式です。最後に $\theta$ のFourier変換を $\widehat\psi(k)=\int e^{-ik\theta}\psi(\theta)d\theta$ とすると、$\partial_\theta$ は $ik$ 倍、$Q=-2\pi i\partial_\theta$ は $2\pi k$ 倍であり、$\delta^{1/2}=e^{Q/2}$ は $e^{\pi k}$ 倍です。解析接続 $\psi(\theta-i\pi)$ もFourier側で $e^{\pi k}\widehat\psi(k)$ に当たります。閉帯の $L^2$ 制御によりこの乗算が許され、両者は一致します。ゆえに

$$
T\psi_f=j\delta^{1/2}\psi_f
=j(j\psi_f)=\psi_f.
$$

<!-- proof-end -->

## 3. 定義域を埋める：稠密性とグラフcore

局所波束上で $T\psi_f=\psi_f$ と分かっただけでは、閉作用素の等式はまだ出ません。必要なのは、局所波束の複素線形包が $\delta^{1/2}$ の**グラフノルム**についても稠密であることです。これは次の一般補題から導けます。

<a id="lem-aqft27-invariant-core"></a>

<!-- formal-statement-start -->
> **補題（不変稠密部分空間の指数作用素core）**  
> $Q$ を複素Hilbert空間上の自己共役作用素、$B=e^{Q/2}$ を正の自己共役作用素とする。$D\subset\operatorname{Dom}B$ をHilbertノルムで稠密な複素線形部分空間とし、全ての実数 $t$ について
>
$$
e^{itQ}D=D
$$
>
> と仮定する。このとき $D$ は次のグラフノルムについて稠密である。

$$
\|v\|_B^2=\|v\|^2+\|Bv\|^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

グラフ空間で $D$ の直交補を取り、スペクトルを有界区間へ切ります。切断したベクトルには $1+B^2$ を通常のHilbert空間内で作用させられるので、$D$ の元とのグラフ内積をHilbert内積へ戻せます。

<!-- proof-start -->
### 証明

$\mathcal G=\operatorname{Dom}B$ をグラフ内積でHilbert空間とします。$e^{itQ}$ は $B$ と可換であり $\mathcal G$ 上でもユニタリです。$D$ のグラフ閉包 $L\subset\mathcal G$ は、$e^{itQ}D=D$ により全ての $e^{itQ}$ とその逆で不変です。従って $L$ と $L^{\perp_{\mathcal G}}$ は $Q$ のスペクトル射影でも不変です。

$z\in L^{\perp_{\mathcal G}}$ を取り、$E_R=1_{[-R,R]}(Q)$、$z_R=E_Rz$ と置きます。$z_R\in L^{\perp_{\mathcal G}}$ であり、スペクトルが有界なので $(1+B^2)z_R\in\mathcal H$ です。任意の $d\in D$ について

$$
0=(z_R,d)_B
=(z_R,d)+(Bz_R,Bd)
=((1+B^2)z_R,d).
$$

最後の等式では $z_R\in\operatorname{Dom}B^2$ と $B$ の自己共役性を使いました。$D$ は元のHilbert空間で稠密なので $(1+B^2)z_R=0$。$1+B^2$ は下から $1$ で抑えられるから $z_R=0$ です。$R\to\infty$ で $E_Rz\to z$ がグラフノルムでも成り立ち、$z=0$。よって $L^{\perp_{\mathcal G}}=0$、すなわち $L=\mathcal G$ です。
<!-- proof-end -->

この補題で大事なのは「Hilbertノルムで稠密」だけでは不十分で、**同じ強連続ユニタリ一パラメータ作用に不変**という条件を使った点です。

<a id="thm-aqft27-one-particle-bw"></a>

<!-- formal-statement-start -->
> **定理（一粒子Bisognano–Wichmann定理）**  
> 四次元Minkowski時空の質量 $m>0$ の実自由スカラー場を取る。$H(W_R)$ を[第1節の実線形閉包](#def-aqft27-wedge-standard-subspace)とする。この部分空間は標準であり、そのTomita作用素 $S_H$ と極分解 $S_H=j_H\delta_H^{1/2}$ は

$$
S_H=j\delta^{1/2},\qquad
j_H=j,\qquad
\delta_H^{it}=u(-2\pi t)
$$

> を満たす。$j,\delta$ は[第2節の候補](#def-aqft27-geometric-tomita)であり、等式は閉作用素の定義域も含めて成立する。
<!-- formal-statement-end -->

### 証明の見取り図

局所波束の複素線形包が稠密であることは、自由場の[Reeh–Schlieder性](../AQFT12/index.md#thm-aqft12-reeh-schlieder)から確認します。boostがwedgeを保存するので、この稠密集合は補題の不変性条件も満たします。最後に反線形作用素の閉グラフを比較します。

<!-- proof-start -->
### 証明

**1. 一粒子稠密性。** $D_0=K_0(W_R)+iK_0(W_R)$ とします。[自由真空のスペクトル条件](../AQFT8/index.md#thm-aqft8-vacuum-spectrum)と自由場の弱加法性の下で、[Reeh–Schlieder：弱加法性による局所巡回性](../AQFT12/index.md#thm-aqft12-reeh-schlieder)は $\overline{\mathcal M(W_R)\Omega}=\mathcal F_s(\mathfrak h)$ を与えます。自由場の弱加法性は、$W_R$ 内の非空double coneを平行移動させると試験関数支持が全時空を覆い、有限個の分割単位から全域Weyl元を生成できることによります。

一粒子への直交射影を $P_1$ とすると、[Weyl真空ベクトルの指数表示](../AQFT8/index.md#prop-aqft8-fock-weyl)から

$$
P_1W(h)\Omega=i\,e^{-\|h\|^2/2}h,\qquad h\in K_0(W_R).
$$

Weyl元の有限線形包がwedgeのvon Neumann環を強く生成するので、その真空作用の線形包は稠密です。一粒子射影を取れば、その像の複素線形包 $D_0$ は $\mathfrak h$ に稠密です。

**2. グラフcore。** [wedge試験関数の半周境界値](#lem-aqft27-strip-boundary)より、$D_0\subset\operatorname{Dom}\delta^{1/2}$ であり、$T$ は $K_0$ で恒等、$iK_0$ で符号反転します。また、[boostのwedge保存](../AQFT26/index.md#prop-aqft26-boost-wedge)により

$$
u(s)K_0(W_R)=K_0(W_R),\qquad u(s)D_0=D_0.
$$

$\delta^{it}=u(-2\pi t)$ と[不変稠密部分空間の指数作用素core](#lem-aqft27-invariant-core)を適用すると、$D_0$ は $\delta^{1/2}$、従って $T=j\delta^{1/2}$ のグラフcoreです。

**3. 標準性と閉作用素の一致。** $T$ は閉作用素なので、$K_0$ をHilbertノルムで閉じた $H(W_R)$ の全ての $h$ について $Th=h$ が成り立ちます。ここで閉性の使用は $(h_n,Th_n)=(h_n,h_n)\to(h,h)$ から分かります。$ih\in H(W_R)$ でもあれば、反線形性により $T(ih)=-ih$、一方 $H(W_R)$ の固定性により $T(ih)=ih$。よって $h=0$ です。

既に $D_0$ が稠密なので $H(W_R)+iH(W_R)$ は稠密です。従って $H(W_R)$ は標準です。標準実部分空間のTomita作用素は

$$
S_H(h_1+ih_2)=h_1-ih_2,\qquad h_1,h_2\in H(W_R)
$$

と定義します。この作用素は閉じています。実際 $z_n=h_{1,n}+ih_{2,n}\to z$、$S_Hz_n\to w$ なら、$h_{1,n}=(z_n+S_Hz_n)/2$ と $ih_{2,n}=(z_n-S_Hz_n)/2$ が収束し、実閉性から極限も $H$ と $iH$ に属します。$T$ は $H$ で恒等かつ反線形なので $S_H\subset T$ です。他方 $D_0$ 上で $S_H=T$ であり、$D_0$ は $T$ のグラフcoreですから $T\subset S_H$。従って両者は一致します。

最後に $j\delta j=\delta^{-1}$ は、$j$ の複素共役が $\theta$ のFourier変数 $k$ を $-k$ に変えるため $jQj=-Q$ であることから従います。$T^*T=\delta$（$j$ は反ユニタリ）なので、反線形極分解の一意性から $j_H=j$、$\delta_H=\delta$ です。
<!-- proof-end -->

**半周と全周の違い。** $-i\pi$ は $\delta^{1/2}$ を通じて実局所波束の反線形反転へつながり、$-2\pi i$ は二点関数のKMS境界につながります。複素rapidityを実時間のユニタリとして解釈しているわけではありません。

## 4. 一粒子の等式を有界Weyl環のTomita作用素へ運ぶ

一粒子での一致だけでは、まだwedgeのvon Neumann環のモジュラー流を証明したことになりません。次に、各粒子数成分へ作用素を運び、**Weyl真空ベクトル上のTomita作用**と一致させます。

<a id="def-aqft27-second-quantized-modular"></a>

<!-- formal-statement-start -->
> **定義（Fock空間上のモジュラー候補）**  
> $\mathcal F_s(\mathfrak h)=\bigoplus_{n=0}^\infty\mathfrak h^{\otimes_s n}$ 上で、一粒子の $\delta,j$ から

$$
D^{it}=\Gamma(\delta^{it})
=\bigoplus_{n=0}^\infty(\delta^{it})^{\otimes_s n},
\qquad
J=\Gamma(j)=\bigoplus_{n=0}^\infty j^{\otimes_s n}
$$

> と置く。ただし零粒子成分では $D^{it}\Omega=\Omega$、$J(c\Omega)=\overline c\,\Omega$ とする。$D$ はこのユニタリ群から得る正の自己共役作用素であり、$T_{\mathcal F}=JD^{1/2}$ はその定義域上の閉反線形作用素とする。
<!-- formal-statement-end -->

$D$ は一般に有界でなく、$D^{1/2}$ を単に有限粒子空間のどこにでも作用させてよいわけではありません。特に、各 $n$ 粒子成分での半べきの定義域と、そのノルムの平方和の有限性が必要です。

<!-- definition-example-start: def-aqft27-second-quantized-modular -->
### 直接例：真空と一粒子・二粒子成分

$h\in K_0(W_R)$ を取ると $h\in\operatorname{Dom}\delta^{1/2}$ で、$\delta^{1/2}h=jh$ です。従って

$$
D^{1/2}(0,h,0,\ldots)=(0,\delta^{1/2}h,0,\ldots),
$$

$$
D^{1/2}(0,0,h\otimes_s h,0,\ldots)
=(0,0,(\delta^{1/2}h)\otimes_s(\delta^{1/2}h),0,\ldots).
$$

$J$ を続けて作用させれば、それぞれ $h$ と $h\otimes_s h$ に戻ります。真空では $T_{\mathcal F}\Omega=\Omega$。すべての粒子数で同じ反線形対称性を満たす一方、係数 $i^n$ は $J$ によって $(-i)^n$ に変わることに注意します。
<!-- definition-example-end -->

<a id="prop-aqft27-fock-tomita"></a>

<!-- formal-statement-start -->
> **命題（Weyl環のTomita作用素と第二量子化）**  
> $m>0$ の自由スカラー場の $\mathcal M(W_R)=\{W(h):h\in H(W_R)\}''$ と真空 $\Omega$ を取る。この標準対の閉Tomita作用素を $S_{W_R}$ とすると

$$
S_{W_R}=JD^{1/2},\qquad
\Delta_{W_R}^{it}=\Gamma(\delta^{it}),\qquad J_{W_R}=\Gamma(j).
$$

<!-- formal-statement-end -->

### 証明の見取り図

有界Weyl元の真空作用を指数ベクトルで計算し、その線形包がFock空間で稠密かつboost不変であることを利用します。**一粒子の場合と同じグラフcore補題**をFock空間にもう一度適用する点が核心です。

<!-- proof-start -->
### 証明

まず真空が標準ベクトルであることを確かめます。[Reeh–Schlieder：弱加法性による局所巡回性](../AQFT12/index.md#thm-aqft12-reeh-schlieder)から $\Omega$ は $\mathcal M(W_R)$ に対して巡回的です。左wedgeにも非空の開領域があり、[局所性からの分離性](../AQFT13/index.md#thm-aqft13-complement-cyclicity-separating)から分離的でもあります。従って[AQFT18のTomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial) $S_0(A\Omega)=A^*\Omega$ は良定義で可閉です。

$h\in K_0(W_R)$ に対し、[Fock Weyl計算](../AQFT8/index.md#prop-aqft8-fock-weyl)から

$$
W(h)\Omega=e^{-\|h\|^2/2}\varepsilon(ih),\qquad
\varepsilon(v)=\bigoplus_{n\ge0}\frac{v^{\otimes n}}{\sqrt{n!}}.
$$

$h\in\operatorname{Dom}\delta^{1/2}$ で $j\delta^{1/2}h=h$ です。指数ベクトルが $D^{1/2}$ の定義域に入るのは

$$
\sum_{n=0}^\infty
\frac{\|(\delta^{1/2}h)^{\otimes n}\|^2}{n!}
=e^{\|\delta^{1/2}h\|^2}<\infty
$$

によります。従って

$$
\begin{aligned}
JD^{1/2}W(h)\Omega
&=e^{-\|h\|^2/2}\varepsilon(j\delta^{1/2}(ih))\\
&=e^{-\|h\|^2/2}\varepsilon(-ih)
=W(-h)\Omega=W(h)^*\Omega.
\end{aligned}
$$

$E_0=\operatorname{span}_{\mathbb C}\{W(h)\Omega:h\in K_0(W_R)\}$ と置きます。局所Weyl元が $\mathcal M(W_R)$ を生成し、$\Omega$ が巡回的なので $E_0$ はFock空間で稠密です。また $D^{it}=\Gamma(u(-2\pi t))$ であり、boostが$K_0(W_R)$を保つので $D^{it}E_0=E_0$ です。

[不変稠密部分空間の指数作用素core](#lem-aqft27-invariant-core)を $Q_{\mathcal F}=\log D$ と $E_0$ に適用すると、$E_0$ は $D^{1/2}$、従って $JD^{1/2}$ のグラフcoreとなります。上の計算により、$S_0$ と $JD^{1/2}$ はこのcoreで一致します。

最後に一般の $A\in\mathcal M(W_R)$ へ拡張する理由を確認します。Weyl元の有限線形包は単位元を含む *-代数で、Weyl関係により積について閉じています。その二重可換子が $\mathcal M(W_R)$ なので、von Neumann代数の強-* 密度（Kaplanskyの有界近似）により、$\|A_\lambda\|\le\|A\|$ を満たす有限Weyl線形結合のネットを取り

$$
A_\lambda\Omega\longrightarrow A\Omega,\qquad
A_\lambda^*\Omega\longrightarrow A^*\Omega
$$

とできます。$JD^{1/2}(A_\lambda\Omega)=A_\lambda^*\Omega$ と閉性から、$A\Omega\in\operatorname{Dom}JD^{1/2}$ かつ $JD^{1/2}(A\Omega)=A^*\Omega$ です。よって $S_0\subset JD^{1/2}$。一方 $E_0$ が後者のcoreであるため $\overline{S_0}=JD^{1/2}$ です。反線形極分解の一意性から命題の等式が従います。
<!-- proof-end -->

## 5. Bisognano–Wichmannの等式と、その適用範囲

<a id="thm-aqft27-bisognano-wichmann"></a>

<!-- formal-statement-start -->
> **定理（自由実スカラー場のBisognano–Wichmann定理）**  
> 四次元Minkowski時空の質量 $m>0$ の実自由Klein–Gordon場を、そのPoincaré不変真空Fock表現に置く。$W_R$ を右wedge、$\mathcal M(W_R)$ を実局所Weyl元の弱閉包、$\Omega$ を真空とする。この標準対のモジュラー群は

$$
\Delta_{W_R}^{it}=U(\Lambda(-2\pi t)),
\qquad
\sigma_t^{W_R}(A)
=U(\Lambda(-2\pi t))\,A\,U(\Lambda(2\pi t))
$$

> である。$U$ は自由Fock空間のPoincaré表現であり、$A\in\mathcal M(W_R)$、$t\in\mathbb R$ とする。ここでの $-2\pi$ は[AQFT24–25の上側帯KMS規約](../AQFT25/index.md#def-aqft25-wstar-kms)と整合する。
<!-- formal-statement-end -->

### 証明の見取り図

前命題で全Fock空間の閉作用素まで同定できました。残りは一粒子での $\delta^{it}=u(-2\pi t)$ を粒子数ごとに持ち上げることだけです。

<!-- proof-start -->
### 証明

[一粒子Bisognano–Wichmann定理](#thm-aqft27-one-particle-bw)の $\delta^{it}=u(-2\pi t)$ と、[Fock Tomita命題](#prop-aqft27-fock-tomita)の $\Delta_{W_R}^{it}=\Gamma(\delta^{it})$ を合わせると

$$
\Delta_{W_R}^{it}
=\Gamma(u(-2\pi t))=U(\Lambda(-2\pi t)).
$$

ここで最後の $U$ は[AQFT8のFock Poincaré表現](../AQFT8/index.md#thm-aqft8-vacuum-spectrum)です。さらに[モジュラー流の定義](../AQFT23/index.md#def-aqft23-modular-flow)へ代入して

$$
\sigma_t^{W_R}(A)=\Delta_{W_R}^{it}A\Delta_{W_R}^{-it}
=U(\Lambda(-2\pi t))A\,U(\Lambda(2\pi t)).
$$

boostは[右wedgeを保存](../AQFT26/index.md#prop-aqft26-boost-wedge)するため、各作用は実際に $\mathcal M(W_R)$ の自己同型であり、一パラメータ群をなします。
<!-- proof-end -->

### 直接例：固有加速度と熱の係数

[AQFT26のRindler固有時](../AQFT26/index.md#prop-aqft26-metric-acceleration)によれば、$\rho=\rho_0$ の軌道では $\tau=\rho_0\eta$、$a=1/\rho_0$ です。モジュラー時間 $t$ に対し $\eta=-2\pi t$ なので

$$
\tau=-2\pi\rho_0t=-\frac{2\pi}{a}t.
$$

従って**固有時の向きを適切に取った力学**に対するKMS逆温度の大きさは $\beta_{\rm proper}=2\pi/a$ です。これはwedgeの真空制限についての平衡性であり、特定の検出器の励起確率まで計算したわけではありません。

<a id="cor-aqft27-wedge-duality"></a>

<!-- formal-statement-start -->
> **系（自由スカラー場のwedge双対性）**  
> 上の自由場Fock模型で、$W_L=W_R'$ を左wedgeとすると

$$
\mathcal M(W_R)'=\mathcal M(W_L).
$$

<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Tomitaの可換子定理](../AQFT22/index.md#thm-aqft22-commutant)より $J_{W_R}\mathcal M(W_R)J_{W_R}=\mathcal M(W_R)'$。本講の $J_{W_R}=\Gamma(j)$ を使います。反射 $r(x^0,x^1,x_\perp)=(-x^0,-x^1,x_\perp)$ は $rW_R=W_L$ を満たします。実試験関数について、Fourier積分を $x\mapsto rx$ と変数変換し、正周波数写像の位相 $i$ を保つと

$$
jK[f]=K[f\circ r],\qquad
jH(W_R)=H(W_L)
$$

を得ます。$J$ は反ユニタリなので $JiJ=-i$。従って $JW(h)J=W(-jh)$ であり、$-jH(W_R)=H(W_L)$ から

$$
J\mathcal M(W_R)J
=\{W(-jh):h\in H(W_R)\}''
=\mathcal M(W_L).
$$

両式を合わせて結論が従います。
<!-- proof-end -->

<a id="cor-aqft27-wedge-kms"></a>

<!-- formal-statement-start -->
> **系（wedge真空のboost–KMS性）**  
> 同じ自由場模型で $\omega(A)=\langle\Omega,A\Omega\rangle$ を $\mathcal M(W_R)$ に制限する。$A,B\in\mathcal M(W_R)$ に対し、

$$
F_{A,B}(t)=\omega(\sigma_t^{W_R}(A)B),\qquad
F_{A,B}(t+i)=\omega(B\sigma_t^{W_R}(A))
$$

> を境界値とする有界な閉上帯 $0\le\operatorname{Im}z\le1$ のKMS解析関数が存在する。ここで $\sigma_t^{W_R}=\operatorname{Ad}U(\Lambda(-2\pi t))$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[一般モジュラーKMS定理](../AQFT25/index.md#thm-aqft25-modular-kms)を標準対 $(\mathcal M(W_R),\Omega)$ に適用します。標準性は第4節で確認済みであり、[Bisognano–Wichmann定理](#thm-aqft27-bisognano-wichmann)がモジュラー群を幾何学的boostと同定するので、既習定理の解析帯と二つの境界値をそのままこの群に適用できます。これは[AQFT26の二点だけの境界式](../AQFT26/index.md#cor-aqft26-two-point-kms)より強く、**有界な局所演算子全体**について成立します。
<!-- proof-end -->

**適用の境界。** この証明は質量 $m>0$ の実自由スカラーのFock模型、Minkowski真空、鋭い右wedgeに依存します。一般の相互作用Wightman場へのBisognano–Wichmann定理もありますが、追加の場の公理・領域・解析性に関する原論文の仮定の確認が必要です。本講のFock計算を任意のnetの証明として使ってはいけません。また、wedgeの双対性・モジュラー群から、任意のdouble coneがType III$_1$因子だとは結論できません。

## 6. 演習と詳細解答

### Level A：位相、半周、粒子数、符号を確認する

<a id="ex-aqft27-a01"></a>
#### AQFT27-A01 質量殻測度の変換

- Level: A
- 問題：$p^0=\mu_\perp\cosh\theta,\ p^1=\mu_\perp\sinh\theta$ とするとき、$h\mapsto\sqrt{p^0}h$ が $L^2(d^3p)$ から $L^2(d\theta\,d^2p_\perp)$ へのユニタリ写像であることを示せ。また[AQFT8の $K$](../AQFT8/index.md#def-aqft8-positive-frequency)の係数を求めよ。

<!-- solution-start -->
**詳細解答。** $dp^1=\mu_\perp\cosh\theta\,d\theta=p^0d\theta$ より

$$
\int_{\mathbb R^3}|h(p)|^2\,dp^1d^2p_\perp
=\int_{\mathbb R\times\mathbb R^2}
|\sqrt{p^0}\,h(p)|^2\,d\theta d^2p_\perp.
$$

逆写像は $\psi\mapsto\psi/\sqrt{p^0}$ なので全射です。また[AQFT8の質量殻式](../AQFT8/index.md#thm-aqft8-wightman-match)により $K[f]=i(2\pi)^{-3/2}\widetilde f/\sqrt{2p^0}$。従って変換後の係数は $i/(\sqrt2(2\pi)^{3/2})$ となり、位相 $i$ を省けません。
<!-- solution-end -->

<a id="ex-aqft27-a02"></a>
#### AQFT27-A02 半周と横運動量の符号

- Level: A
- 問題：$\psi_f$ の指数へ $\theta-i\pi$ を代入し、実 $f$ に対して $\psi_f(\theta-i\pi,p_\perp)=-\overline{\psi_f(\theta,-p_\perp)}$ を示せ。$-p_\perp$ を $p_\perp$ と置き換えると何が破綻するか。

<!-- solution-start -->
**詳細解答。** $\cosh(\theta-i\pi)=-\cosh\theta$、$\sinh(\theta-i\pi)=-\sinh\theta$ なので指数は $-ip^0x^0+ip^1x^1-ip_\perp\cdot x_\perp$ となります。一方 $\psi_f(\theta,-p_\perp)$ の指数は $ip^0x^0-ip^1x^1+ip_\perp\cdot x_\perp$ です。これを複素共役すれば前者と等しく、係数 $i$ の共役による $-i$ を外側の負号で相殺します。$p_\perp$ を反転しない場合は共役の横方向の指数が $+ip_\perp\cdot x_\perp$ のままなので、一般の $f$ について等号は成り立ちません。
<!-- solution-end -->

<a id="ex-aqft27-a03"></a>
#### AQFT27-A03 反線形Tomita候補の検算

- Level: A
- 問題：実局所波束 $h\ne0$ で $Th=h$ が分かったとする。$T(ih)$ を求め、$h$ と $ih$ の両方が $H(W_R)$ に属するという仮定が矛盾することを示せ。

<!-- solution-start -->
**詳細解答。** $T$ は反線形なので $T(ih)=\overline i\,Th=-ih$ です。もし $ih\in H(W_R)$ なら、実局所波束の閉包上で $T$ は恒等となるため $T(ih)=ih$ も成り立ちます。よって $ih=-ih$、すなわち $h=0$ となり仮定に反します。この計算は標準性の $H\cap iH=\{0\}$ を示す重要な段階です。
<!-- solution-end -->

<a id="ex-aqft27-a04"></a>
#### AQFT27-A04 Fockの半べきと真空

- Level: A
- 問題：$h\in\operatorname{Dom}\delta^{1/2}$ に対して $\varepsilon(ih)$ が $D^{1/2}$ の定義域に入り、$D^{1/2}\varepsilon(ih)=\varepsilon(i\delta^{1/2}h)$ を満たすことを、各粒子数のノルムの和から示せ。

<!-- solution-start -->
**詳細解答。** $n$ 粒子成分は $(ih)^{\otimes n}/\sqrt{n!}$ です。半べきを作用させると $(i\delta^{1/2}h)^{\otimes n}/\sqrt{n!}$ となり、ノルムの平方和は

$$
\sum_{n\ge0}\frac{\|\delta^{1/2}h\|^{2n}}{n!}
=\exp(\|\delta^{1/2}h\|^2)<\infty.
$$

従ってFock直和上の $D^{1/2}$ の定義域条件を満たし、各成分が指定の指数ベクトルへ一致します。真空は $n=0$ 成分なので $D^{1/2}\Omega=\Omega$ です。
<!-- solution-end -->

### Level B：閉作用素の等式を再構成する

<a id="ex-aqft27-b01"></a>
#### AQFT27-B01 グラフcore補題の一番重要な一行

- Level: B
- 問題：自己共役 $Q$、$B=e^{Q/2}$ とし、補題の $D$ の仮定を置く。$z$ をグラフ直交補に取り $z_R=1_{[-R,R]}(Q)z$ としたとき、なぜ $((1+B^2)z_R,d)=0$ が全 $d\in D$ に成立し、$z_R=0$ が従うか説明せよ。

<!-- solution-start -->
**詳細解答。** $D$ が $e^{itQ}$ で双方向不変なので、そのグラフ閉包と直交補は $Q$ のスペクトル射影に不変です。従って $z_R$ もグラフ直交補です。$Q$ のスペクトルが $[-R,R]$ に切られた $z_R$ は $\operatorname{Dom}B^2$ に属し、任意の $d\in D\subset\operatorname{Dom}B$ に対して

$$
0=(z_R,d)_B=(z_R,d)+(Bz_R,Bd)
=((1+B^2)z_R,d).
$$

$D$ のHilbert稠密性により $(1+B^2)z_R=0$、さらに $1+B^2\ge I$ から $z_R=0$ です。$R\to\infty$ で $z=0$、従ってグラフ直交補が消えます。
<!-- solution-end -->

<a id="ex-aqft27-b02"></a>
#### AQFT27-B02 一粒子標準性と二つの包含

- Level: B
- 問題：$D_0=K_0+iK_0$ が $T$ のcoreであり、$T$ が $K_0$ 上で恒等とする。$S_H=T$ を示す際、$S_H\subset T$ と $T\subset S_H$ の根拠を別々に書け。

<!-- solution-start -->
**詳細解答。** $K_0$ のノルム閉包 $H$ でも、$T$ の閉性により $Th=h$ が成立します。よって $h_1+ih_2\in H+iH$ には $T(h_1+ih_2)=h_1-ih_2$ が成立し、これは $S_H$ の定義なので $S_H\subset T$。逆向きには $D_0\subset\operatorname{Dom}S_H$ 上で $S_H=T$、かつ $D_0$ は $T$ のグラフcoreです。$S_H$ は閉じているから、$D_0$ 上のグラフの閉包である $T$ のグラフ全体を含み、$T\subset S_H$ となります。
<!-- solution-end -->

<a id="ex-aqft27-b03"></a>
#### AQFT27-B03 Weyl真空ベクトルのTomita作用

- Level: B
- 問題：$h\in K_0(W_R)$ について $S_0W(h)\Omega=W(-h)\Omega$ を、Fockの指数ベクトルと $T_{\mathcal F}=JD^{1/2}$ から再構成せよ。$J$ の反線形性が $i$ にどう作用するか明記せよ。

<!-- solution-start -->
**詳細解答。** $W(h)\Omega=e^{-\|h\|^2/2}\varepsilon(ih)$ です。$D^{1/2}$ は各粒子数に $\delta^{1/2}$ を作用させ、$J$ は各テンソル因子に反線形な $j$ を作用させます。$j\delta^{1/2}h=h$ と $j(iq)=-ijq$ より

$$
JD^{1/2}\varepsilon(ih)
=\varepsilon(j(i\delta^{1/2}h))
=\varepsilon(-i\,j\delta^{1/2}h)
=\varepsilon(-ih).
$$

従って $JD^{1/2}W(h)\Omega=W(-h)\Omega$。これは $W(h)^*=W(-h)$ と[AQFT18のTomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)に一致します。
<!-- solution-end -->

<a id="ex-aqft27-b04"></a>
#### AQFT27-B04 反ユニタリによるwedge反射

- Level: B
- 問題：$r(t,x^1,x_\perp)=(-t,-x^1,x_\perp)$ とする。$jK[f]=K[f\circ r]$ をFourier表示から示し、$JW(h)J=W(-jh)$ の負号を導け。

<!-- solution-start -->
**詳細解答。** $K[f]$ のrapidity表示は $i c\int f(x)e^{ip^0t-ip^1x^1-ip_\perp x_\perp}dx$（$c>0$）です。$K[f\circ r]$ に $x=ry$ を代入すると $ic\int f(y)e^{-ip^0y^0+ip^1y^1-ip_\perp y_\perp}dy$。他方、$j$ の式 $j\psi(\theta,p_\perp)=-\overline{\psi(\theta,-p_\perp)}$ により同じ積分を得ます。Fock空間では $J\Phi(h)J=\Phi(jh)$ ですが、$JiJ=-i$ なので

$$
JW(h)J=J e^{i\Phi(h)}J
=e^{-i\Phi(jh)}=W(-jh).
$$

従って $J$ は右wedgeのWeyl元を左wedgeのWeyl元へ写します。
<!-- solution-end -->

### Level C：全ての論理を一度に使う

<a id="ex-aqft27-c01"></a>
#### AQFT27-C01 一粒子からFockモジュラー流まで

- Level: C
- 問題：$m>0$ の実自由場の右wedgeを取る。(i) $T\psi_f=\psi_f$ の半周境界値、(ii) $D_0$ の稠密性とboost不変性、(iii) グラフcore、(iv) Fock Weyl元、の四段階を明示し、$\Delta_{W_R}^{it}=U(-2\pi t)$ までの論証を再構成せよ。二点関数のKMS性だけで済ませてはならない。

<!-- solution-start -->
**詳細解答。** **(i)** $f$ の支持上の $x^1\cosh\theta-x^0\sinh\theta$ が正なので、$\psi_f(\theta-iv)$ は $0<v<\pi$ で減衰し、$L^2$ 境界値を持ちます。$\theta-i\pi$ の代入は、正周波数写像の位相 $i$ を含めて $\delta^{1/2}\psi_f=j\psi_f$ となり $T\psi_f=\psi_f$ を与えます。

**(ii)** [Reeh–Schlieder：弱加法性による局所巡回性](../AQFT12/index.md#thm-aqft12-reeh-schlieder)と $P_1W(h)\Omega=ie^{-\|h\|^2/2}h$ から $D_0=K_0+iK_0$ が一粒子空間で稠密です。また $\Lambda(s)W_R=W_R$ から $u(s)D_0=D_0$ です。

**(iii)** $Q=\log\delta$、$\delta^{it}=u(-2\pi t)$ とし、[不変稠密部分空間の指数作用素core](#lem-aqft27-invariant-core)を適用すると $D_0$ は $\delta^{1/2}$ のcoreです。閉反線形作用素 $T$ の固定部分空間として $H(W_R)$ は標準になり、$S_H=T$ です。従って $\delta_H^{it}=u(-2\pi t)$。

**(iv)** $W(h)\Omega=e^{-\|h\|^2/2}\varepsilon(ih)$ と $j\delta^{1/2}h=h$ から $JD^{1/2}W(h)\Omega=W(-h)\Omega$。このWeyl真空ベクトルの線形包はFock空間で稠密・boost不変なので再びcore補題を適用できます。強-* の有界近似でTomita作用を局所環全体へ拡張し、$\Delta_{W_R}^{it}=\Gamma(\delta^{it})=\Gamma(u(-2\pi t))=U(-2\pi t)$ を得ます。二点KMSから直ちに最後の等式を推論したわけではありません。
<!-- solution-end -->

<a id="ex-aqft27-c02"></a>
#### AQFT27-C02 幾何学的KMSと一般局所環への誤った拡張

- Level: C
- 問題：本講の定理に対し、(i) $\rho_0=2$ のRindler軌道の固有加速度と固有時のKMS逆温度、(ii) bounded wedge可観測量に対するKMS境界、(iii) 一般のdouble coneのType III$_1$性が従うか、をそれぞれ判定し、理由を示せ。

<!-- solution-start -->
**詳細解答。** **(i)** [Rindler固有加速度の計算](../AQFT26/index.md#prop-aqft26-metric-acceleration)から $a=1/\rho_0=1/2$、$\tau=\rho_0\eta=2\eta$ です。$\eta=-2\pi t$ なので $\tau=-4\pi t$ となり、逆温度の大きさは $\beta_{\rm proper}=4\pi=2\pi/a$ です。

**(ii)** [一般モジュラーKMS定理](../AQFT25/index.md#thm-aqft25-modular-kms)を標準対 $(\mathcal M(W_R),\Omega)$ に適用します。本講の $\sigma_t=\operatorname{Ad}U(-2\pi t)$ を代入すると、任意の有界 $A,B$ について、下端が $\omega(\sigma_t(A)B)$、上端が $\omega(B\sigma_t(A))$ の解析関数が得られます。非有界な点場をそのまま $A,B$ に代入してはいけません。

**(iii)** 従いません。本講で得たのは特定の自由場の**wedge環**のモジュラー群と双対性です。double coneはboostで不変でなく、そのモジュラー流が同じboostだとはいえません。Type III$_1$性には別の型判定と仮定が必要であり、wedgeでの結果だけではその証明に使った機構が欠けています。
<!-- solution-end -->

## 7. 次講へ：wedgeから局所環の型をどこまで知れるか

本講で証明したのは、自由スカラー場のwedgeでは**モジュラー時間が幾何学的boostに一致する**という厳密な等式です。次のAQFT28「局所Type III$_1$性の適用境界」では、wedgeの計算から分かることと、より小さな局所領域の型を決めるのに別途必要な仮定を区別します。

### 参考資料

- [Daniele Guido, *Modular Theory for the von Neumann Algebras of Local Quantum Physics*](https://arxiv.org/abs/0812.1511)：一粒子標準実部分空間、自由場の第二量子化、Bisognano–Wichmannの証明。
- [J. J. Bisognano and E. H. Wichmann, *On the Duality Condition for a Hermitian Scalar Field*](https://doi.org/10.1063/1.522605)：実スカラー場のwedge双対性とモジュラー作用の原論文。
- [J. J. Bisognano and E. H. Wichmann, *On the Duality Condition for Quantum Fields*](https://doi.org/10.1063/1.522898)：より一般の場の適用条件の原論文。
