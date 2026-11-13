# AQFT25 一般モジュラーKMS定理

[AQFT24の有限次元Gibbs計算](../AQFT24/index.md#thm-aqft24-gibbs-kms)では、密度行列 $\rho$ をトレースの中で巡回させると、複素時間の上端で演算子の順序が反転しました。しかし局所量子場理論のType III環には、すべての状態を $\operatorname{Tr}(\rho\,\cdot)$ と書く仕組みがありません。何を使えば「熱平衡の時間」を定義できるのでしょうか。

[Tomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)は、巡回・分離ベクトルから定まります。さらに[標準対に対するTomita–Takesaki定理](../AQFT23/index.md#thm-aqft23-tomita-takesaki)から、トレースを使わずにモジュラー流 $\sigma_t$ が得られます。本講では、**スペクトル定理で帯上の相関関数を作り、反線形なTomita関係でその上端の順序を反転**させます。これがType III環にも通用するKMS定理の核心です。

先に二つの注意があります。第一に、一般のモジュラー群は作用素ノルムでは連続とは限りません。第二に、モジュラー生成子 $-\log\Delta$ は有限次元の密度行列の $-\log\rho$ と同じ作用素ではありません。

## 1. どの環でKMSを述べるか

$\mathcal H$ を複素Hilbert空間、$\mathcal M\subset B(\mathcal H)$ を単位元を持つvon Neumann環とし、$\|\Omega\|=1$ で $\Omega$ が $\mathcal M$ に対して巡回的かつ分離的であるとします。この組を[AQFT18の標準対](../AQFT18/index.md#def-aqft18-standard-pair)と呼びます。内積は**第二変数線形**と固定し、

$$
\omega(A)=\langle\Omega,A\Omega\rangle,\qquad
S_0(A\Omega)=A^*\Omega
\quad(A\in\mathcal M)
$$

と置きます。$S_0$ の閉包を $S=J\Delta^{1/2}$ とするのは[AQFT19の反線形極分解](../AQFT19/index.md#thm-aqft19-polar)です。$\Delta$ は核を持たない正の自己共役作用素で、$\Delta\Omega=\Omega$ です。[AQFT23のモジュラー自己同型群](../AQFT23/index.md#def-aqft23-modular-flow)は

$$
\sigma_t(A)=\Delta^{it}A\Delta^{-it},\qquad
\sigma_t(\mathcal M)=\mathcal M
$$

で与えられ、$\omega\circ\sigma_t=\omega$ です。

[AQFT24の上側帯KMS条件](../AQFT24/index.md#def-aqft24-kms)は、**ノルム連続**なC*力学系で定義されました。一方、一般標準対の $\sigma_t$ についてAQFT23が保証するのは、各ベクトルへの作用の強連続性です。ここでは、同じ帯の境界条件を **von Neumann環の全元** について直接要求する形を用います。以下で「閉帯で連続」は複素数値関数の通常の連続性を意味します。「正規」な状態・自己同型とは、それぞれ超弱位相に関して連続な状態・自己同型を指します。[AQFT23の群と状態保存の定理](../AQFT23/index.md#thm-aqft23-group-state)はモジュラー流とベクトル状態の正規性を保証します。

<a id="def-aqft25-wstar-kms"></a>

<!-- formal-statement-start -->
> **定義（von Neumann環上のKMS条件）**  
> $\mathcal M$ を単位的von Neumann環、$(\alpha_t)_{t\in\mathbb R}$ を各元について強作用素連続な、正規 $*$-自己同型からなる一パラメータ群、$\omega$ を正規状態とする。任意の $A,B\in\mathcal M$ に対し、閉帯 $0\le\operatorname{Im}z\le1$ で有界・連続、開帯 $0<\operatorname{Im}z<1$ で正則な複素数値関数 $F_{A,B}$ が存在し、
$$
F_{A,B}(t)=\omega(\alpha_t(A)B),
\qquad
F_{A,B}(t+i)=\omega(B\alpha_t(A))
$$
> がすべての $t\in\mathbb R$ で成り立つとき、$\omega$ は $\alpha$ に関して **von Neumann環上のKMS条件** を満たすという。$\alpha$ の作用素ノルム連続性は定義の仮定に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft25-wstar-kms -->
### 直接例：二準位模型で定義の全条件を確認

$\mathcal M=M_2(\mathbb C)$ とし、標準基底 $e_1,e_2$ に関して $\rho e_1=\tfrac34e_1$、$\rho e_2=\tfrac14e_2$ と定めます。つまり $\rho=\operatorname{diag}(3/4,1/4)$ であり、固有値はどちらも正、和は1です。よって $\rho$ は忠実で正規化された密度行列です。[AQFT20の忠実密度行列の定義](../AQFT20/index.md#def-aqft20-faithful-density)をこの固有基底で確認できます。

状態と時間発展を

$$
\omega(C)=\operatorname{Tr}(\rho C),\qquad
\alpha_t(C)=\rho^{it}C\rho^{-it}
$$

とします。有限次元では $\alpha_t$ がノルム連続なので強作用素連続・正規であり、$\omega$ も正規状態です。さらに次のようにHamiltonianを選びます。

$
H_0=-\log\rho,\qquad
H_0=H_0^*,\qquad
e^{-H_0}=\rho,\qquad
\operatorname{Tr}(e^{-H_0})=1.
$

したがって逆温度1、分配関数1として次のGibbs定理の仮定を満たします。

任意の $A,B$ について[AQFT24の有限次元KMS定理](../AQFT24/index.md#thm-aqft24-gibbs-kms)が与える

$$
F_{A,B}(z)=\operatorname{Tr}(\rho\,\rho^{iz}A\rho^{-iz}B)
$$

は整関数で、閉帯で $|F_{A,B}(z)|\le\|A\|\|B\|$、下端は $\omega(\alpha_t(A)B)$、上端は $\omega(B\alpha_t(A))$ です。**定義の確認**：全ての元の組に対する関数の存在、帯全体の有界性、二つの境界値、流と状態の正規性を確認できました。次にこのトレース表示なしで同じ結論を導きます。
<!-- definition-example-end -->

## 2. 解析的元はどこまで稠密か

すべての $A\in\mathcal M$ について $\Delta^{iz}A\Delta^{-iz}$ が有界に定義できるとは限りません。そこで[AQFT23の全解析的元](../AQFT23/index.md#def-aqft23-entire-element)を利用します。また、実時間の軌道が作用素ノルム連続である元だけを集めれば、AQFT24で用いたC*力学系に戻れます。

<a id="def-aqft25-continuous-part"></a>

<!-- formal-statement-start -->
> **定義（モジュラー流のノルム連続部分代数）**  
> 標準対 $(\mathcal M,\Omega)$ のモジュラー自己同型群 $\sigma_t$ に対し
$$
\mathcal M_{\mathrm c}
=\{A\in\mathcal M:
\lim_{t\to0}\|\sigma_t(A)-A\|=0\}
$$
> をモジュラー流の**ノルム連続部分代数**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft25-continuous-part -->
### 直接例：二準位では全体、無限次元では真部分になり得る

有限次元Hilbert–Schmidt標準表現では[行列単位のモジュラー位相](../AQFT20/index.md#thm-aqft20-finite-flow)が有限個の指数関数で表され、任意の行列で $\|\sigma_t(A)-A\|\to0$ です。したがって $\mathcal M_{\mathrm c}=\mathcal M$ です。

反対に、[AQFT23の無限次元シフト計算](../AQFT23/index.md#thm-aqft23-gaussian-analytic)の設定 $p_n=ce^{-n^2}$、$Ve_n=e_{n+1}$ を使います。密度行列 $\rho e_n=p_ne_n$ の固有基底で $L_V$ のノルム連続性を判定すると、

$$
\rho^{it}V\rho^{-it}e_n
=\left(\frac{p_{n+1}}{p_n}\right)^{it}e_{n+1}
=e^{-it(2n+1)}e_{n+1}.
$$

$t_n=\pi/(2n+1)\to0$ ならこの係数は $-1$ です。左乗算作用素には $\|L_T(X)\|_2\le\|T\|\|X\|_2$ が成立します。逆に単位ベクトル $v,w$ に対する階数1作用素 $X=|v\rangle\langle w|$ を取ると $\|X\|_2=1$、$\|L_T(X)\|_2=\|Tv\|$ なので、$v$ を動かして $\|L_T\|=\|T\|$ です。基底ベクトル $e_n$ における差のノルム2と作用素ノルムの上界2を照合すると

$$
\|\sigma_{t_n}(L_V)-L_V\|
=\|\rho^{it_n}V\rho^{-it_n}-V\|=2
$$

を得ます。よって $L_V\notin\mathcal M_{\mathrm c}$。**定義の確認**：ノルム差の極限が0になる例と、ならない例を、その判定に用いる作用素ノルムまで追跡しました。
<!-- definition-example-end -->

<a id="thm-aqft25-analytic-density"></a>

<!-- formal-statement-start -->
> **定理（解析的元の二つの稠密性）**  
> 標準対 $(\mathcal M,\Omega)$ のモジュラー流に対するノルム連続部分代数 $\mathcal M_{\mathrm c}$ は、流で不変な単位的C*部分環である。制限された流は、その上で作用素ノルム連続な $*$-自己同型の一パラメータ群をなす。
>
> [AQFT23のGaussian平滑化](../AQFT23/index.md#thm-aqft23-gaussian-analytic)で作った全解析的元 $A_\varepsilon$ は $\mathcal M_{\mathrm c}$ に属する。これらは元の環 $\mathcal M$ に強*作用素位相で稠密であり、$\mathcal M_{\mathrm c}$ に作用素ノルムで稠密である。
<!-- formal-statement-end -->

### 証明の見取り図

「強い位相での稠密性」と「ノルム稠密性」の到達先は異なります。Gaussian平均は全 $\mathcal M$ を強い位相で近似しますが、ノルム近似するのは最初からノルム連続な軌道を持つ部分代数の元だけです。

<!-- proof-start -->
### 証明

$\sigma_t$ は等長な $*$-自己同型なので、$A,B\in\mathcal M_{\mathrm c}$ に対し

$$
\begin{aligned}
\|\sigma_t(AB)-AB\|
&\le\|A\|\|\sigma_t(B)-B\|
 +\|\sigma_t(A)-A\|\|B\|,\\
\|\sigma_t(A^*)-A^*\|
&=\|\sigma_t(A)-A\|
\end{aligned}
$$

が成立し、和・積・随伴と単位元で閉じています。$A_n\to A$ がノルム収束する場合は

$$
\|\sigma_t(A)-A\|
\le2\|A-A_n\|+\|\sigma_t(A_n)-A_n\|
$$

より $\mathcal M_{\mathrm c}$ はノルム閉です。群性から $\sigma_s(\mathcal M_{\mathrm c})=\mathcal M_{\mathrm c}$ も従います。

[AQFT23の平滑化定理](../AQFT23/index.md#thm-aqft23-gaussian-analytic)の

$$
A_\varepsilon
=\int_{\mathbb R}g_\varepsilon(s)\sigma_s(A)\,ds,
\qquad
g_\varepsilon(s)=\frac{e^{-s^2/\varepsilon}}{\sqrt{\pi\varepsilon}}
$$

を使います。これは初めは強作用素積分です。実数 $h$ について、積分変数を移すと

$$
\sigma_h(A_\varepsilon)-A_\varepsilon
=\int_{\mathbb R}
\bigl(g_\varepsilon(s-h)-g_\varepsilon(s)\bigr)\sigma_s(A)\,ds.
$$

右辺の作用素ノルムは高々 $\|A\|\|g_\varepsilon(\,\cdot-h)-g_\varepsilon\|_{L^1}$ で、$h\to0$ で0になります。従って $A_\varepsilon\in\mathcal M_{\mathrm c}$。元の定理が示す $A_\varepsilon\to A$ と $A_\varepsilon^*\to A^*$ の強作用素収束から、全 $\mathcal M$ への強*稠密性が得られます。

さらに $A\in\mathcal M_{\mathrm c}$ なら

$$
\|A_\varepsilon-A\|
\le\int_{\mathbb R}g_\varepsilon(s)
\|\sigma_s(A)-A\|\,ds\longrightarrow0.
$$

実際、$|s|<\delta$ ではノルム連続性で被積分項を任意に小さくでき、$|s|\ge\delta$ では $2\|A\|$ を掛けたGaussian尾部が $\varepsilon\downarrow0$ で0になります。よって $\mathcal M_{\mathrm c}$ 内ではノルム稠密です。
<!-- proof-end -->

**使いどころ。** 一般のKMS証明では、全元を複素時間で直接進化させる必要はありません。ただし $\mathcal M_{\mathrm c}$ に制限すれば、後で[AQFT24のC*力学系としての定義](../AQFT24/index.md#def-aqft24-kms)を文字どおり適用できます。

## 3. モジュラー作用素から帯を直接構成する

この節が本講の核心です。$\Delta$ は非有界でもよいため、複素時間に $\sigma_z(A)$ を代入する代わりに、**二つのベクトルのスペクトル測度の積分**を考えます。

[QM6のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)を核を持たない正作用素 $\Delta$ に適用し、自己共役作用素 $H=\log\Delta$ を定めます。$H$ の射影値測度を $P$ と書くと、$\Delta=e^H$、$\Delta^{-it}=e^{-itH}$ です。

任意の $A,B\in\mathcal M$ に対して

$$
x=A^*\Omega,\qquad y=B\Omega,\qquad
\mu_{A,B}(E)=\langle x,P(E)y\rangle
$$

と置きます。$\mu_{A,B}$ は複素測度で、実時刻には

$$
\langle x,\Delta^{-it}y\rangle
=\int_{\mathbb R}e^{-it\lambda}\,d\mu_{A,B}(\lambda)
$$

です。右辺に $t+i v$ を代入した積分の収束が次の問題です。

<a id="lem-aqft25-spectral-strip"></a>

<!-- formal-statement-start -->
> **補題（半べきの定義域から帯正則性へ）**  
> 正で核を持たない自己共役作用素 $\Delta=e^H$ と、その $H$ のスペクトル測度 $P$ を考える。$x,y\in\operatorname{Dom}\Delta^{1/2}$ なら、複素測度 $\mu(E)=\langle x,P(E)y\rangle$ に対して
$$
F(z)=\int_{\mathbb R}e^{-iz\lambda}\,d\mu(\lambda)
\qquad(0\le\operatorname{Im}z\le1)
$$
> は絶対収束し、閉帯で有界・連続、開帯で正則である。$z=t+iv$ とすると
$$
F(t+iv)=
\langle\Delta^{v/2}x,\Delta^{v/2-it}y\rangle,
\qquad
|F(t+iv)|
\le\|\Delta^{v/2}x\|\,\|\Delta^{v/2}y\|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

半べきの定義域があるため、スペクトル測度の重み $e^\lambda$ まで積分できます。$0\le v\le1$ で $e^{v\lambda}\le1+e^\lambda$ が使え、開帯ではさらに少しだけ上下に余裕を取って積分を微分できます。

<!-- proof-start -->
### 証明

有限個の互いに素なBorel集合 $E_j$ に対し、射影の直交性とCauchy–Schwarzより

$$
\begin{aligned}
\sum_j|\langle x,P(E_j)y\rangle|
&\le
\left(\sum_j\|P(E_j)x\|^2\right)^{1/2}
\left(\sum_j\|P(E_j)y\|^2\right)^{1/2}
\le\|x\|\|y\|.
\end{aligned}
$$

同じ議論を $\Delta^{1/2}x,\Delta^{1/2}y$ に適用し、$\Delta^{1/2}$ と $P(E_j)$ が可換なことを使うと

$$
\int_{\mathbb R}(1+e^\lambda)\,d|\mu|(\lambda)
\le\|x\|\|y\|
+\|\Delta^{1/2}x\|\|\Delta^{1/2}y\|<\infty.
$$

$0\le v\le1$ なら $e^{v\lambda}\le1+e^\lambda$。従って積分は絶対収束し、閉帯内の点列の収束について被積分項は $(1+e^\lambda)$ で支配されるので連続です。

スペクトル定理で左右に $e^{vH/2}$ を分配すれば

$$
\int e^{v\lambda-it\lambda}\,d\mu
=\langle e^{vH/2}x,e^{vH/2-itH}y\rangle
$$

となります。ここで $0\le v\le1$ は $\operatorname{Dom}\Delta^{1/2}\subset\operatorname{Dom}\Delta^{v/2}$ も保証します。Cauchy–Schwarzを適用すれば表示された評価が従います。

正則性を確認します。開帯内の $z_0$ で $v_0=\operatorname{Im}z_0$ とし、$0<\delta<\min(v_0,1-v_0)$ を取ります。$v_0-\delta/2\le v\le v_0+\delta/2$ では

$$
|\lambda|e^{v\lambda}
\le C_\delta\bigl(e^{(v_0-\delta)\lambda}
+e^{(v_0+\delta)\lambda}\bigr)
\le C_\delta'(1+e^\lambda).
$$

最初の不等式は $\lambda\ge0$ と $\lambda<0$ に分け、指数関数が多項式を抑えることから得られます。従って積分内で複素微分でき、

$$
F'(z)=-i\int_{\mathbb R}
\lambda e^{-iz\lambda}\,d\mu(\lambda)
$$

が近傍で成立します。開帯の各点でこの議論ができるため、$F$ は正則です。全閉帯での有界性も、上の評価と $e^{v\lambda}\le1+e^\lambda$ から従います。
<!-- proof-end -->

<a id="thm-aqft25-modular-kms"></a>

<!-- formal-statement-start -->
> **定理（一般モジュラーKMS定理）**  
> $\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環とし、単位ベクトル $\Omega$ が $\mathcal M$ に対して巡回的かつ分離的であるとする。$S=\overline{S_0}=J\Delta^{1/2}$、$\sigma_t(A)=\Delta^{it}A\Delta^{-it}$、$\omega(A)=\langle\Omega,A\Omega\rangle$ と置く。$H=\log\Delta$ の射影値測度を $P_H$ とし、Borel集合 $E\subset\mathbb R$ に対して
$$
\mu_{A,B}(E)=\langle A^*\Omega,P_H(E)B\Omega\rangle
$$
> と定める。このとき、すべての $A,B\in\mathcal M$ に対し
$$
F_{A,B}(z)=\int_{\mathbb R}e^{-iz\lambda}\,d\mu_{A,B}(\lambda)
$$
> は閉帯 $0\le\operatorname{Im}z\le1$ で有界・連続、開帯で正則であり、
$$
F_{A,B}(t)=\omega(\sigma_t(A)B),\qquad
F_{A,B}(t+i)=\omega(B\sigma_t(A))
$$
> をすべての実 $t$ で満たす。さらに全閉帯で
$$
|F_{A,B}(z)|\le\|A\|\|B\|
$$
> が成立する。従って $\omega$ は $\sigma$ に関してvon Neumann環上のKMS条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

1. $A^*\Omega$ と $B\Omega$ は $\Delta^{1/2}$ の定義域に属します。これで補題から帯内の解析性と有界性を得ます。
2. 下端では $\Delta^{-it}$ を $\Omega$ に固定されるユニタリとして動かし、通常の相関に戻します。
3. 上端では $J$ が内積の順を逆転させ、$S(C\Omega)=C^*\Omega$ が演算子の積の順を逆転させます。この段階でトレースは一切使いません。

<!-- proof-start -->
### 証明

**(i) 定義域と帯内の評価。** [Tomita初期作用素の閉包](../AQFT18/index.md#prop-aqft18-initial-properties)から、$C\in\mathcal M$ について $C\Omega\in\operatorname{Dom}S$ と $S(C\Omega)=C^*\Omega$ です。また $S=J\Delta^{1/2}$ で $J$ は反ユニタリだから

$$
\|\Delta^{1/2}C\Omega\|
=\|C^*\Omega\|.
$$

特に $x=A^*\Omega$、$y=B\Omega$ はいずれも半べきの定義域にあり、

$$
\begin{array}{ll}
\|x\|=\|A^*\Omega\|\le\|A\|,&
\|\Delta^{1/2}x\|=\|A\Omega\|\le\|A\|,\\
\|y\|=\|B\Omega\|\le\|B\|,&
\|\Delta^{1/2}y\|=\|B^*\Omega\|\le\|B\|.
\end{array}
$$

[半べきの定義域から帯正則性へ](#lem-aqft25-spectral-strip)の補題を適用します。この補題により $F_{A,B}$ は閉帯で連続、内部で正則です。さらに $0\le v\le1$、$q>0$ に対する加重相加相乗平均 $q^v\le(1-v)+vq$ をスペクトル関数計算に適用すると

$$
\begin{aligned}
\|\Delta^{v/2}x\|^2
&=\int e^{v\lambda}\,d\langle x,P_H(\lambda)x\rangle\\
&\le(1-v)\|x\|^2+v\|\Delta^{1/2}x\|^2
\le\|A\|^2.
\end{aligned}
$$

$y$ に対しても $\|\Delta^{v/2}y\|\le\|B\|$。従って

$$
|F_{A,B}(t+iv)|
\le\|\Delta^{v/2}x\|\|\Delta^{v/2}y\|
\le\|A\|\|B\|.
$$

**(ii) 下端。** $\Delta^{it}\Omega=\Omega$、$\Delta^{-it}B\Omega=\sigma_{-t}(B)\Omega$ です。したがって

$$
\begin{aligned}
F_{A,B}(t)
&=\langle A^*\Omega,\Delta^{-it}B\Omega\rangle\\
&=\langle\Omega,A\Delta^{-it}B\Omega\rangle\\
&=\langle\Omega,\Delta^{it}A\Delta^{-it}B\Omega\rangle\\
&=\omega(\sigma_t(A)B).
\end{aligned}
$$

**(iii) 上端。** $\Delta^{-it}B\Omega=\sigma_{-t}(B)\Omega$ を使い、半べきを両ベクトルへ分けます。

$$
F_{A,B}(t+i)=
\langle\Delta^{1/2}A^*\Omega,
\Delta^{1/2}\sigma_{-t}(B)\Omega\rangle.
$$

ここで $J$ は反ユニタリなので $\langle Ju,Jv\rangle=\langle v,u\rangle$。$J\Delta^{1/2}=S$ と $S(C\Omega)=C^*\Omega$ を、左側で $C=A^*$、右側で $C=\sigma_{-t}(B)$ として適用すれば

$$
\begin{aligned}
F_{A,B}(t+i)
&=\langle S(\sigma_{-t}(B)\Omega),S(A^*\Omega)\rangle\\
&=\langle\sigma_{-t}(B)^*\Omega,A\Omega\rangle\\
&=\omega(\sigma_{-t}(B)A)\\
&=\omega\bigl(\sigma_t(\sigma_{-t}(B)A)\bigr)\\
&=\omega(B\sigma_t(A)).
\end{aligned}
$$

最後から二行目で使ったのは[AQFT23の状態不変性](../AQFT23/index.md#thm-aqft23-group-state)です。これで全元に対する二境界式が成立し、[定義](#def-aqft25-wstar-kms)の全条件が証明されました。
<!-- proof-end -->

**核心の違い。** 有限行列では $\rho^{-1}$ とトレースの巡回性で境界を交換しました。一般環では、$S(C\Omega)=C^*\Omega$ と反ユニタリ $J$ による内積の順序反転が、その役割を果たします。計算中の $\Delta$ が非有界でも、各元を半べきの定義域へ置いているため操作は正当化されています。

<a id="cor-aqft25-cstar-kms"></a>

<!-- formal-statement-start -->
> **系（ノルム連続部分環でのC*–KMS条件）**  
> 上記の標準対について $\mathcal M_{\mathrm c}$ へ $\sigma_t$ と $\omega$ を制限すると、$(\mathcal M_{\mathrm c},\sigma_t)$ はノルム連続なC*力学系となり、$\omega|_{\mathcal M_{\mathrm c}}$ は[AQFT24の逆温度1のKMS状態](../AQFT24/index.md#def-aqft24-kms)である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[解析的元の二つの稠密性](#thm-aqft25-analytic-density)により $\mathcal M_{\mathrm c}$ は単位的で $\sigma$ 不変なC*環、群はノルム連続です。$\omega$ の制限は正値性と $\omega(I)=1$ を保ちます。[一般モジュラーKMS定理](#thm-aqft25-modular-kms)の $F_{A,B}$ を $A,B\in\mathcal M_{\mathrm c}$ に限定すれば、有界性・連続性・正則性・上下境界式がそのまま成立します。従ってAQFT24の定義のすべてを満たします。
<!-- proof-end -->

## 4. 具体模型で帯と符号を再確認する

### 無限次元Hilbert–Schmidt模型でもトレースを前提にしない

$\mathcal K=\ell^2(\mathbb N)$ の標準正規直交基底を $e_n$ とし、$p_n=2^{-n}$（$n\ge1$）、$\rho e_n=p_ne_n$ を取ります。$\sum_np_n=1$ かつ各 $p_n>0$ なので、$\Omega=\rho^{1/2}$ はHilbert–Schmidt空間内の単位ベクトルです。左乗算環 $\mathcal M=L(B(\mathcal K))$ を考え、[Hilbert–Schmidt標準表現の構成](../AQFT20/index.md#def-aqft20-standard-representation)に従って $L_C(X)=CX$ と書きます。

行列単位は $E_{ij}e_k=\delta_{jk}e_i$ を満たします。$E_{ij}=L_{E_{ij}/\sqrt{p_j}}\Omega$ であり、行列単位の有限線形結合がHilbert–Schmidt空間に稠密なので $\Omega$ は巡回的です。一方、$L_C\Omega=0$ なら各 $j$ について $\sqrt{p_j}Ce_j=0$、従って $C=0$ で分離的です。

[Tomita初期作用素の定義](../AQFT18/index.md#def-aqft18-tomita-initial)を行列単位に適用すると

$$
S(E_{ij})
=\frac{1}{\sqrt{p_j}}E_{ji}\rho^{1/2}
=\sqrt{\frac{p_i}{p_j}}E_{ji}.
$$

[AQFT23の無限次元グラフ計算](../AQFT23/index.md#thm-aqft23-gaussian-analytic)では有限行列が $S$ のグラフcoreであることと、反線形随伴 $S^\sharp(E_{ji})=\sqrt{p_i/p_j}E_{ij}$ を示しています。この計算と $\Delta=S^\sharp S$ から、

$$
\Delta(E_{ij})=\frac{p_i}{p_j}E_{ij},
\qquad
\sigma_t(L_{E_{ij}})
=\left(\frac{p_i}{p_j}\right)^{it}L_{E_{ij}}
$$

となります。$A=L_{E_{12}}$、$B=L_{E_{21}}$ に対して

$$
F_{A,B}(z)=p_1\left(\frac{p_1}{p_2}\right)^{iz}
=\frac12\,2^{iz}.
$$

下端 $F(t)=\frac12\,2^{it}$ と上端 $F(t+i)=\frac14\,2^{it}$ は、$\omega(B\sigma_t(A))=p_2\,2^{it}$ と一致します。ここで使ったトレースは密度行列の成分を**検算するため**のものです。一般定理の証明には、$B(\mathcal K)$ のすべての元に有限なトレースが存在することを要求していません。

### 局所Type III環で何が言えるか

局所観測量のvon Neumann環 $\mathcal A(O)''$ と、そこで巡回・分離的な真空ベクトル $\Omega$ を仮定します。例えば[AQFT13の巡回性・分離性の議論](../AQFT13/index.md#thm-aqft13-complement-cyclicity-separating)により、適切な領域・局所性・補集合側の巡回性から標準対が得られる場合があります。その**標準対が得られた場合**、環の型にかかわらず本講のKMS定理が成立します。

ただし、$\sigma_t$ が幾何学的なLorentz boostになるかは別問題です。一般の局所観測量環についてそう結論できるわけではありません。自由場の特別なwedgeでこの同一視に必要な解析性を調べるのが次講以降です。

## 5. $-\log\Delta$ と $-\log\rho$ を同一視しない

$H=\log\Delta$ は標準表現のHilbert空間 $\mathcal H$ 上の自己共役作用素で、モジュラー流を実装するユニタリは $\Delta^{it}=e^{itH}$ です。物理で $K_{\mathrm{mod}}=-\log\Delta$ をモジュラーHamiltonianと呼ぶ流儀もあり、そのとき $\sigma_t=\operatorname{Ad}e^{-itK_{\mathrm{mod}}}$ になります。

有限次元の[AQFT20のHilbert–Schmidt模型](../AQFT20/index.md#thm-aqft20-modular-formulas)では、元のHilbert空間 $\mathbb C^n$ 上の $\rho$ と、Hilbert–Schmidt空間上の $\Delta=L_\rho R_{\rho^{-1}}$ の作用先が違います。行列単位ごとに

$$
\begin{aligned}
(\log\Delta)E_{ij}
&=(\log p_i-\log p_j)E_{ij},\\
(-\log\Delta)E_{ij}
&=(\log p_j-\log p_i)E_{ij}.
\end{aligned}
$$

一方、$-\log\rho$ は $\mathbb C^n$ 上で $e_i\mapsto-\log p_i\,e_i$ と働きます。**行列の左右の差**と**一方だけの作用**は異なります。Type III環ではそもそも一般の局所密度行列 $\rho$ を用意できませんが、標準対の $\Delta$ は存在します。

## 6. 仮定を外すと証明のどこが壊れるか

- **分離性を失う場合。** $\rho=\operatorname{diag}(1,0)$ と $\Omega=\rho^{1/2}$ では、$E_{12}\Omega=0$ なのに $E_{12}^*\Omega=E_{21}\ne0$ です。よって $S_0(A\Omega)=A^*\Omega$ はwell-definedでなく、最初の半べきの定義域計算へ進めません。
- **ノルム連続性を無条件に仮定する場合。** 前述のシフト例では $\|\sigma_{t_n}(L_V)-L_V\|=2$ です。したがって全 $\mathcal M$ をAQFT24の「ノルム連続なC*力学系」と扱うことはできません。ただし本講のvon Neumann環上の帯条件は依然として成立します。
- **上側帯の符号を反転する場合。** $F(z)$ は $\Delta^{-iz}$ から作ったので、上端は $\Delta^{1-it}$ です。ここを $\Delta^{-1-it}$ にすると半べきの定義域保証を失い、順序の反転も導けません。
- **KMSから幾何学的作用を推論する場合。** KMSは状態と時間発展の相関の性質です。その時間発展がどの時空変換かは、共変性・領域・模型に関する追加の解析を要します。

## 7. 演習と詳細解答

### Level A：定義域・符号・行列単位

<a id="ex-aqft25-a01"></a>
#### AQFT25-A01 半べきの二つのノルム

- Level: A
- 問題：一般標準対の $C\in\mathcal M$ について、$C\Omega,C^*\Omega\in\operatorname{Dom}\Delta^{1/2}$ を示し、その二つの半べきのノルムを計算せよ。

<!-- solution-start -->
**詳細解答。** [Tomita初期作用素](../AQFT18/index.md#prop-aqft18-initial-properties)の定義域は $\mathcal M\Omega$ を含むので、$C\Omega$ と $C^*\Omega$ はともに $\operatorname{Dom}S$ に属します。[反線形極分解](../AQFT19/index.md#thm-aqft19-polar)によって $\operatorname{Dom}S=\operatorname{Dom}\Delta^{1/2}$、$S=J\Delta^{1/2}$ です。$J$ の等長性から

$$
\|\Delta^{1/2}C\Omega\|
=\|S(C\Omega)\|
=\|C^*\Omega\|,\qquad
\|\Delta^{1/2}C^*\Omega\|
=\|S(C^*\Omega)\|
=\|C\Omega\|.
$$

いずれも高々 $\|C\|$ です。$\Delta$ が有界である必要はありません。
<!-- solution-end -->

<a id="ex-aqft25-a02"></a>
#### AQFT25-A02 二準位の上端

- Level: A
- 問題：$\rho=\operatorname{diag}(3/4,1/4)$、$A=E_{12}$、$B=E_{21}$ とする。[AQFT24の有限次元複素時間延長](../AQFT24/index.md#thm-aqft24-gibbs-kms)に従い、この問題に限り

$
\sigma_z(C)=\rho^{iz}C\rho^{-iz}\qquad(z\in\mathbb C)
$

と置く。$F(z)=\omega(\sigma_z(A)B)$ の $t$ と $t+i$ における値を求め、上端の順序を照合せよ。

<!-- solution-start -->
**詳細解答。** [有限次元モジュラー流](../AQFT20/index.md#thm-aqft20-finite-flow)で $p_1/p_2=3$ より $\sigma_z(E_{12})=3^{iz}E_{12}$。$E_{12}E_{21}=E_{11}$ なので

$$
F(z)=\tfrac34\,3^{iz},\qquad
F(t)=\tfrac34\,3^{it},\qquad
F(t+i)=\tfrac34\,3^{it-1}=\tfrac14\,3^{it}.
$$

他方、$E_{21}\sigma_t(E_{12})=3^{it}E_{22}$ より $\omega(B\sigma_t(A))=\frac14\,3^{it}$ です。上端の虚数は $i(t+i)=it-1$ となるのが決め手です。
<!-- solution-end -->

<a id="ex-aqft25-a03"></a>
#### AQFT25-A03 解析的元とノルム連続な軌道

- Level: A
- 問題：$g_\varepsilon(s)=(\pi\varepsilon)^{-1/2}e^{-s^2/\varepsilon}$ とし、$\sigma_h(A_\varepsilon)=\int g_\varepsilon(s-h)\sigma_s(A)\,ds$ を用いて、$A_\varepsilon\in\mathcal M_{\mathrm c}$ を示せ。

<!-- solution-start -->
**詳細解答。** 積分の差を同じ変数で表すと

$$
\sigma_h(A_\varepsilon)-A_\varepsilon
=\int\bigl(g_\varepsilon(s-h)-g_\varepsilon(s)\bigr)\sigma_s(A)\,ds.
$$

$\|\sigma_s(A)\|=\|A\|$ よりノルムは $\|A\|\int|g_\varepsilon(s-h)-g_\varepsilon(s)|ds$ 以下です。Gaussianの平行移動は $L^1$ 連続なのでこの上界は $h\to0$ で0。従って[モジュラー流のノルム連続部分代数](#def-aqft25-continuous-part)の定義を満たします。$A$ 自体のノルム連続性は仮定しません。
<!-- solution-end -->

<a id="ex-aqft25-a04"></a>
#### AQFT25-A04 モジュラー生成子の固有値

- Level: A
- 問題：$\rho=\operatorname{diag}(3/4,1/4)$ のHilbert–Schmidt表現で、$-\log\Delta$ の $E_{12},E_{21},E_{11}$ への作用を求めよ。

<!-- solution-start -->
**詳細解答。** [AQFT20のモジュラー作用素](../AQFT20/index.md#thm-aqft20-modular-formulas)から $\Delta E_{ij}=(p_i/p_j)E_{ij}$ です。関数計算で $(-\log\Delta)E_{ij}=-\log(p_i/p_j)E_{ij}$。したがって

$$
(-\log\Delta)E_{12}=-(\log3)E_{12},\quad
(-\log\Delta)E_{21}=(\log3)E_{21},\quad
(-\log\Delta)E_{11}=0.
$$

これは元の $\mathbb C^2$ 上の $-\log\rho$ の固有値 $-\log(3/4),-\log(1/4)$ とは別の作用です。
<!-- solution-end -->

### Level B：解析帯と稠密性を導く

<a id="ex-aqft25-b01"></a>
#### AQFT25-B01 開帯での積分微分

- Level: B
- 問題：$\mu$ が $\int(1+e^\lambda)\,d|\mu|<\infty$ を満たすとき、$F(z)=\int e^{-iz\lambda}\,d\mu$ が $0<\operatorname{Im}z<1$ で正則であることを、導関数の積分表示とともに示せ。

<!-- solution-start -->
**詳細解答。** $z_0=t_0+iv_0$、$0<v_0<1$ とする。$0<\delta<\min(v_0,1-v_0)$ を選ぶと、$|v-v_0|\le\delta/2$ の範囲で正の $\lambda$ には $|\lambda|e^{v\lambda}\le C e^{(v_0+\delta)\lambda}$、負の $\lambda$ には $|\lambda|e^{v\lambda}\le C e^{(v_0-\delta)\lambda}$ が成立します。両指数の指数率が0と1の間なので、どちらも $C'(1+e^\lambda)$ 以下です。差商についても小さな複素線分上で同じ支配を用いられるため、被積分関数を微分して

$$
F'(z)=-i\int_{\mathbb R}\lambda e^{-iz\lambda}\,d\mu(\lambda)
$$

を得ます。積分は絶対収束し、この議論は開帯の任意の点に適用できます。境界 $v=0,1$ での微分可能性までは主張していません。
<!-- solution-end -->

<a id="ex-aqft25-b02"></a>
#### AQFT25-B02 上端の反線形計算

- Level: B
- 問題：一般標準対の $A,B$ に対し
$$
\langle\Delta^{1/2}A^*\Omega,
\Delta^{1/2-it}B\Omega\rangle
=\omega(B\sigma_t(A))
$$
を、$J$ と $S$ の定義を使い順序を省略せず示せ。

<!-- solution-start -->
**詳細解答。** [モジュラー流](../AQFT23/index.md#def-aqft23-modular-flow)で $\Delta^{-it}B\Omega=\sigma_{-t}(B)\Omega$。また $S=J\Delta^{1/2}$ と $S(C\Omega)=C^*\Omega$ より

$$
\begin{aligned}
\langle\Delta^{1/2}A^*\Omega,
\Delta^{1/2-it}B\Omega\rangle
&=\langle J S(A^*\Omega),J S(\sigma_{-t}(B)\Omega)\rangle\\
&=\langle S(\sigma_{-t}(B)\Omega),S(A^*\Omega)\rangle\\
&=\langle\sigma_{-t}(B)^*\Omega,A\Omega\rangle\\
&=\omega(\sigma_{-t}(B)A).
\end{aligned}
$$

[状態保存](../AQFT23/index.md#thm-aqft23-group-state)を積 $\sigma_{-t}(B)A$ に適用すれば $\omega(\sigma_{-t}(B)A)=\omega(B\sigma_t(A))$。第2行が反ユニタリによる内積順序の反転であり、そこを省くと誤ったKMS符号になり得ます。
<!-- solution-end -->

<a id="ex-aqft25-b03"></a>
#### AQFT25-B03 ノルム稠密性の正しい範囲

- Level: B
- 問題：$A\in\mathcal M_{\mathrm c}$ ならGaussian平均 $A_\varepsilon\to A$ がノルム収束することを示せ。また $\mathcal M$ 全体に同じ結論を拡張できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [モジュラー流のノルム連続部分代数](#def-aqft25-continuous-part)の定義により、任意の $\eta>0$ に対し $|s|<\delta$ なら $\|\sigma_s(A)-A\|<\eta$ とできる。$\int g_\varepsilon(s)\,ds=1$ なので積分を分割して

$$
\begin{aligned}
\|A_\varepsilon-A\|
&\le\int g_\varepsilon(s)\|\sigma_s(A)-A\|\,ds\\
&\le\eta+2\|A\|
\int_{|s|\ge\delta}g_\varepsilon(s)\,ds.
\end{aligned}
$$

$\varepsilon\downarrow0$ で第二項は0になり、$\eta$ は任意だからノルム収束する。全 $\mathcal M$ では軌道のノルム連続性がないことがあり、[AQFT23のシフト反例](../AQFT23/index.md#thm-aqft23-gaussian-analytic)の $L_V$ はその例です。もし全解析的元が $\mathcal M$ 全体にノルム稠密なら、ノルム連続関数の一様極限として $L_V$ の軌道もノルム連続となって矛盾します。
<!-- solution-end -->

<a id="ex-aqft25-b04"></a>
#### AQFT25-B04 無限次元行列の上下端

- Level: B
- 問題：$\mathcal K=\ell^2(\mathbb N)$、$p_n=2^{-n}$、$\rho=\operatorname{diag}(p_n)$ の標準表現で $A=L_{E_{21}},B=L_{E_{12}}$ と置く。$F_{A,B}(t)$ と $F_{A,B}(t+i)$ を計算し、上端が $\omega(B\sigma_t(A))$ と一致することを確かめよ。

<!-- solution-start -->
**詳細解答。** $p_2/p_1=1/2$ なので、行列単位の作用を[AQFT20のモジュラー流の計算](../AQFT20/index.md#thm-aqft20-finite-flow)と同じ方法で拡張すると $\sigma_z(A)=2^{-iz}A$。$E_{21}E_{12}=E_{22}$ から

$$
F_{A,B}(z)=p_2\,2^{-iz}
=\tfrac14\,2^{-iz}.
$$

従って

$$
F_{A,B}(t)=\tfrac14\,2^{-it},\qquad
F_{A,B}(t+i)=\tfrac14\,2^{-it+1}=\tfrac12\,2^{-it}.
$$

逆順では $E_{12}E_{21}=E_{11}$ ですから $\omega(B\sigma_t(A))=p_1\,2^{-it}=\frac12\,2^{-it}$ となり一致します。無限次元でもこの有限階数の検算は可能ですが、一般KMS定理の証明を代用するものではありません。
<!-- solution-end -->

### Level C：一般定理の証明を再構成する

<a id="ex-aqft25-c01"></a>
#### AQFT25-C01 トレースなしのKMS定理を再構成

- Level: C
- 問題：標準対 $(\mathcal M,\Omega)$ と $A,B\in\mathcal M$ に対し、$x=A^*\Omega,y=B\Omega$ と置く。$H=\log\Delta$ の射影値測度 $P_H$ から $\mu(E)=\langle x,P_H(E)y\rangle$（$E$ はBorel集合）を定め、$F(z)=\int e^{-iz\lambda}\,d\mu(\lambda)$ の存在、閉帯一様有界性、二つの境界式を順番に証明せよ。$\Delta$ が有界であると仮定してはならない。

<!-- solution-start -->
**詳細解答。** [Tomita初期作用素](../AQFT18/index.md#prop-aqft18-initial-properties)の定義で $S(A^*\Omega)=A\Omega$、$S(B\Omega)=B^*\Omega$。よって $x,y\in\operatorname{Dom}\Delta^{1/2}$ で、$\|\Delta^{1/2}x\|\le\|A\|$、$\|\Delta^{1/2}y\|\le\|B\|$。ここが非有界 $\Delta$ を扱うための出発点です。

[半べきの定義域から帯正則性へ](#lem-aqft25-spectral-strip)という補題の証明で、スペクトル測度 $\mu$ は $\int(1+e^\lambda)d|\mu|<\infty$ を満たします。従って $e^{v\lambda}$（$0\le v\le1$）の支配収束から閉帯連続、開帯内部での局所微分から正則性が従います。また

$$
\begin{aligned}
|F(t+iv)|
&\le\|\Delta^{v/2}x\|\|\Delta^{v/2}y\|,\\
\|\Delta^{v/2}x\|^2
&\le(1-v)\|x\|^2+v\|\Delta^{1/2}x\|^2
\le\|A\|^2
\end{aligned}
$$

で、$y$ にも同じ評価を施すから $|F|\le\|A\|\|B\|$。実軸では $\Delta^{it}\Omega=\Omega$ と $\sigma_t(A)=\Delta^{it}A\Delta^{-it}$ を用い、

$$
F(t)=\langle A^*\Omega,\Delta^{-it}B\Omega\rangle
=\langle\Omega,\sigma_t(A)B\Omega\rangle.
$$

上端では $\Delta^{-it}B\Omega=\sigma_{-t}(B)\Omega$ と $S=J\Delta^{1/2}$ から

$$
\begin{aligned}
F(t+i)
&=\langle\Delta^{1/2}A^*\Omega,
\Delta^{1/2}\sigma_{-t}(B)\Omega\rangle\\
&=\langle S(\sigma_{-t}(B)\Omega),S(A^*\Omega)\rangle\\
&=\omega(\sigma_{-t}(B)A)
=\omega(B\sigma_t(A)).
\end{aligned}
$$

最後の等号は[モジュラー状態保存](../AQFT23/index.md#thm-aqft23-group-state)を使っています。非有界作用素の積 $\Delta^{-1}A\Delta$ を全 $\mathcal H$ 上で定義した箇所はありません。これが一般定理の証明です。
<!-- solution-end -->

<a id="ex-aqft25-c02"></a>
#### AQFT25-C02 二つの時間と二つの作用素空間を区別

- Level: C
- 問題：$H_0=H_0^*$ を有限次元Hamiltonian、$\beta>0$ とし、$\rho=Z_\beta^{-1}e^{-\beta H_0}>0$ を密度行列、$\tau_s(A)=e^{isH_0}Ae^{-isH_0}$ を物理時間 $s$ の発展とする。次の三点を示せ。

  1. モジュラー時間 $t$ と物理時間 $s$ の関係。
  2. $\log\Delta$ の $E_{ij}$ に対する固有値。
  3. Type IIIの一般標準対に $\rho$ を要求する論法が誤りである理由。

<!-- solution-start -->
**詳細解答。**

**1. モジュラー時間と物理時間。** $H_0=H_0^*$ と $\rho=Z_\beta^{-1}e^{-\beta H_0}$ から $\log\rho=-\beta H_0-(\log Z_\beta)I$。スカラー項は共役で消えるので[AQFT24の時間対応](../AQFT24/index.md#thm-aqft24-physical-kms)を計算し直すと

$$
\sigma_t(A)=\rho^{it}A\rho^{-it}
=e^{-i\beta tH_0}Ae^{i\beta tH_0}
=\tau_{-\beta t}(A).
$$

**2. モジュラー生成子の固有値。** $\rho$ の固有値を $p_i>0$ とする。[AQFT20のHilbert–Schmidt空間上のモジュラー作用素の全計算](../AQFT20/index.md#thm-aqft20-modular-formulas)では $\Delta E_{ij}=(p_i/p_j)E_{ij}$。よって

$$
(\log\Delta)E_{ij}=(\log p_i-\log p_j)E_{ij}.
$$

元のHilbert空間上の $\log\rho$ が持つ固有値は $\log p_i$ であり、作用空間と添字が違います。

**3. Type III環との違い。** Type III環では有限の忠実正規トレースや局所密度行列を一般には持たないため、$\rho$ に基づく有限次元のトレース証明は直接移せません。しかし**巡回・分離的ベクトルがあるという仮定**の下では $S,J,\Delta$ を構成でき、[一般モジュラーKMS定理](#thm-aqft25-modular-kms)から相関の帯条件が従います。KMSはこの標準対の性質であって、密度行列の存在条件ではありません。
<!-- solution-end -->

## 8. 次講へ：熱的時間はいつ幾何学的時間か

この講義で示したことは、**任意の標準対のモジュラー自己同型群が、トレースに依存せず逆温度1の上側帯KMS条件を満たす**という主張です。一方でその時間が具体的な時空対称性に対応するかどうかは未確定です。次の AQFT26「Rindler wedgeとboostの解析性」 では、右wedgeのLorentz boostと複素時間の向き、および $2\pi$ の係数を自由スカラー場で直接検算します。

### 参考資料

- [Stephen J. Summers, *Tomita–Takesaki Modular Theory*](https://arxiv.org/abs/math-ph/0511034)：標準対、モジュラー自己同型、KMS性の一般的整理。
- [M. Takesaki, *Theory of Operator Algebras II*](https://link.springer.com/book/10.1007/978-3-662-10451-4)：非有界作用素とモジュラーKMSの一般的枠組み。
- [Bratteli–Robinson, *Operator Algebras and Quantum Statistical Mechanics II*](https://link.springer.com/book/10.1007/978-3-662-03444-6)：C*力学系のKMS条件と解析的元。
