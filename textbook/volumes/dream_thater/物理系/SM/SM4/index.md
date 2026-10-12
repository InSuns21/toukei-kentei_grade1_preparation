# SM4 大正準アンサンブルと粒子数揺らぎ

[SM3の正準アンサンブル](../SM3/index.md#def-sm3-canonical)では温度を固定し、試料のエネルギーを揺らがせました。しかし外部と粒子も出入りする容器では、状態空間そのものが粒子数によって変わります。「粒子数を固定した正準分布」を一つだけ使っても、流入・流出の確率は計算できません。

そこで試料の状態を「粒子数 $n$ とそのときの微視的配置 $\omega$」という対で指定し、熱浴・粒子浴との接触を一つの指数重みで表します。浴側の条件は温度 $T$ と[化学ポテンシャル](../../TH/TH7/index.md#def-th7-component-mu) $\mu$ です。$T$ はエネルギー移動、$\mu$ は粒子移動の重みを決めます。有限系の確率恒等式と、巨視系の熱力学的解釈を区別しながら進みます。

## 1. 粒子数の異なる状態を一つの集合にする

ここでは粒子を区別するラベルではなく、系の**物理的に異なる微視的配置**を数えます。$n!$ のような数え方の補正が必要な模型では、各 $\Omega_n$ と $H_n$ の指定に織り込む必要があります。本章の有限和の証明は、どの模型でもこの指定が済んでいることを前提とします。

粒子数の許容集合を空でない有限集合 $J\subset\{0,1,2,\ldots\}$ とし、各 $n\in J$ について空でない有限配置集合 $\Omega_n$ とエネルギー $H_n:\Omega_n\to\mathbb R$ を取ります。異なる $n$ の配置は対 $(n,\omega)$ として区別します。全状態集合を

$$
\mathcal X=\coprod_{n\in J}\{n\}\times\Omega_n
$$

と置き、$N(n,\omega)=n$、$H(n,\omega)=H_n(\omega)$ と書きます。共通のエネルギー単位を使い、$k_{\mathrm B}>0$ と $T>0$ を固定します。

ここでは整数 $n$ を**粒子の個数**として数え、化学ポテンシャル $\mu$ は一粒子当たりのエネルギー（J/粒子）で表します。[TH7の多成分化学ポテンシャル](../../TH/TH7/index.md#def-th7-component-mu)を物質量（mol）で扱い、$\mu_{\mathrm{mol}}$ を J/mol で表す場合、Avogadro定数 $N_{\mathrm A}$ を使って $\mu=\mu_{\mathrm{mol}}/N_{\mathrm A}$ と換算します。$R=N_{\mathrm A}k_{\mathrm B}$ なので、$\mu/(k_{\mathrm B}T)=\mu_{\mathrm{mol}}/(RT)$ です。二種類の単位で定義された化学ポテンシャルを、そのまま同じ数値として代入してはいけません。

粒子を一個入れることが常に許されるとは限りません。たとえば一サイト占有模型なら $J=\{0,1\}$ です。有限 $J$ を採用することで、以下の微分や確率の規格化をすべて有限和から厳密に示せます。

<a id="def-sm4-grand-ensemble"></a>

<!-- formal-statement-start -->
> **定義（有限大正準アンサンブルと大分配関数）**  
> 上記の有限非空集合 $\mathcal X$ と温度に依存しない $H$、$N$ を取り、$T>0$ と $\mu\in\mathbb R$ を外部パラメータとして固定する。$\beta=1/(k_{\mathrm B}T)$ とし、各粒子数の正準分配関数 $Z_n(\beta)$ と全系の**大分配関数** $\Xi(\beta,\mu)$ を

$$
Z_n(\beta)=\sum_{\omega\in\Omega_n}e^{-\beta H_n(\omega)},
\qquad
\Xi(\beta,\mu)=\sum_{n\in J}e^{\beta\mu n}Z_n(\beta)
$$

> と定める。各対 $(n,\omega)$ の確率を

$$
p_{\beta,\mu}(n,\omega)
=\frac{\exp[-\beta(H_n(\omega)-\mu n)]}{\Xi(\beta,\mu)}
$$

> とする確率模型を**大正準アンサンブル**という。$\mu$ は一粒子当たりのエネルギー次元を持ち、指数 $\beta(H-\mu N)$ は無次元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm4-grand-ensemble -->
### 直接例：空か一粒子か

**定義の確認**：$\Omega_0=\{\varnothing\}$、$\Omega_1=\{\bullet\}$、$H_0=0$、$H_1=\varepsilon>0$ とします。$r=e^{-\beta(\varepsilon-\mu)}>0$ と置くと、$Z_0=1$、$Z_1=e^{-\beta\varepsilon}$、

$$
\Xi=1+r,\qquad
p(0,\varnothing)=\frac1{1+r},\qquad
p(1,\bullet)=\frac r{1+r}.
$$

分母は正で、和は $(1+r)/(1+r)=1$。$\mu=\varepsilon$ なら双方 $1/2$、$\mu$ を大きくすると一粒子状態の確率が増えます。ここでは「一粒子のエネルギーが $\mu$ になる」のではなく、確率の重みに $-\mu N$ が加わります。
<!-- definition-example-end -->

<a id="prop-sm4-normalization"></a>

<!-- formal-statement-start -->
> **命題（規格化・粒子数の周辺分布・条件付き正準分布）**  
> [有限大正準アンサンブル](#def-sm4-grand-ensemble)で、$\Xi>0$、$p_{\beta,\mu}(n,\omega)>0$、$\sum_{(n,\omega)\in\mathcal X}p_{\beta,\mu}(n,\omega)=1$ が成り立つ。粒子数分布は

$$
P_{\beta,\mu}(N=n)
=\frac{e^{\beta\mu n}Z_n(\beta)}{\Xi(\beta,\mu)}
$$

> であり、$N=n$ を条件とする配置の分布は、粒子数 $n$ を固定した[正準分布](../SM3/index.md#def-sm3-canonical)に等しい：

$$
P_{\beta,\mu}(\omega\mid N=n)
=\frac{e^{-\beta H_n(\omega)}}{Z_n(\beta)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず対 $(n,\omega)$ について和を取り、次に $n$ を固定した部分和を抜き出します。条件付き分布では同じ $\mu$ に依存する因子が分子分母から消えます。

<!-- proof-start -->
### 証明

指数関数は正で $\mathcal X$ は有限非空なので $\Xi>0$ です。[正準分配関数](../SM3/index.md#def-sm3-canonical)を粒子数ごとに使うと、

$$
\begin{aligned}
\sum_{(n,\omega)\in\mathcal X}
 e^{-\beta(H_n(\omega)-\mu n)}
&=\sum_{n\in J}e^{\beta\mu n}
  \sum_{\omega\in\Omega_n}e^{-\beta H_n(\omega)}\\
&=\sum_{n\in J}e^{\beta\mu n}Z_n(\beta)
=\Xi.
\end{aligned}
$$

この等式を $\Xi$ で割れば規格化されます。$N=n$ を表す互いに素な全事象を足すと

$$
P(N=n)=\sum_{\omega\in\Omega_n}p(n,\omega)
=\frac{e^{\beta\mu n}Z_n}{\Xi}>0.
$$

条件付き確率の定義を適用し、分子と分母へ実際に上の式を代入すると

$$
\begin{aligned}
P(\omega\mid N=n)
&=\frac{p(n,\omega)}{P(N=n)}\\
&=\frac{e^{\beta\mu n}e^{-\beta H_n(\omega)}/\Xi}
 {e^{\beta\mu n}Z_n/\Xi}
=\frac{e^{-\beta H_n(\omega)}}{Z_n}.
\end{aligned}
$$

$\mu$ の因子が消えるのは粒子数を条件として固定した場合だけです。
<!-- proof-end -->

この二段階の読み方が便利です。最初に粒子数 $n$ を $P(N=n)$ に従って選び、そのあと粒子数 $n$ の正準配置を選べば、元の大正準確率を再現できます。

## 2. 粒子浴から指数重みが現れる理由

有限模型を定義しただけなら $\mu$ はパラメータです。浴との接触によりこの重みが生じることを、条件付きで示します。[SM3の有限熱浴の厳密な周辺分布](../SM3/index.md#prop-sm3-bath-exact)では熱浴の状態数に重みが付きました。今回は浴に残る粒子数も数えます。

試料のエネルギー $H_n(\omega)$ と粒子数 $n$ に対して、エネルギー・粒子数が加法的で、全エネルギー $U$、全粒子数 $M$ の孤立複合系を考えます。浴の許容配置数 $W_B(u,m)$ は非負整数で、許されない組で0とします。

<a id="prop-sm4-reservoir-marginal"></a>

<!-- formal-statement-start -->
> **命題（エネルギー・粒子保存下の厳密な周辺確率）**  
> 試料の有限状態集合 $\mathcal X$ と有限浴に対し、全エネルギー $U$ と全粒子数 $M$ を持つ複合状態が少なくとも一つ存在し、その全状態へ一様確率を置くとき、試料の周辺確率は

$$
P_S(n,\omega)
=\frac{W_B(U-H_n(\omega),M-n)}
{\displaystyle\sum_{(m,\eta)\in\mathcal X}
 W_B(U-H_m(\eta),M-m)}
$$

> である。さらに全組で分子の浴状態数が正で、ある $a,\beta,\mu\in\mathbb R$ と $\delta\ge0$ について

$$
\left|\log W_B(U-H_n(\omega),M-n)
-a+\beta(H_n(\omega)-\mu n)\right|\le\delta
$$

> が成立すれば、大正準確率との比は各 $(n,\omega)$ で

$$
e^{-2\delta}\le
\frac{P_S(n,\omega)}{p_{\beta,\mu}(n,\omega)}
\le e^{2\delta}
$$

> を満たす。物理的な温度の解釈には $\beta>0$ を要する。
<!-- formal-statement-end -->

### 証明の見取り図

粒子数とエネルギーをともに引いた残量で浴の配置を数えます。指数近似の誤差は、分子の重みと規格化定数にそれぞれ一回ずつ現れます。

<!-- proof-start -->
### 証明

試料を $(n,\omega)$ に固定すると浴に残るエネルギーと粒子数は $(U-H_n(\omega),M-n)$ に限られ、その配置数は $W_B(U-H_n(\omega),M-n)$ です。異なる試料配置の複合状態は重ならないので全数は分母の和であり、正です。これで一様確率の和による第一式を得ます。

誤差を $r_{n,\omega}$ と置けば $|r_{n,\omega}|\le\delta$ であり、

$$
W_B(U-H_n(\omega),M-n)
=e^a e^{-\beta(H_n(\omega)-\mu n)}e^{r_{n,\omega}}.
$$

正の有限和の各項に $e^{-\delta}\le e^{r_{n,\omega}}\le e^\delta$ を掛けて足すと、

$$
e^{-\delta}\Xi
\le\sum_{(n,\omega)}e^{-\beta(H_n(\omega)-\mu n)}
 e^{r_{n,\omega}}
\le e^\delta\Xi.
$$

共通因子 $e^a$ を分子分母から消し、$p_{\beta,\mu}$ と割り算を行うと、残る倍率は $e^{r_{n,\omega}}$ を上記の和と $\Xi$ の比で割ったものです。上下限はそれぞれ $e^{-\delta}/e^\delta$ と $e^\delta/e^{-\delta}$ になります。
<!-- proof-end -->

### $\mu$ の符号はなぜ正になるのか

浴の離散状態数に直接微分はできません。正の滑らかな状態数近似 $W_{\mathrm{sm}}(u,m)$ があり、$L(u,m)=\log W_{\mathrm{sm}}(u,m)$ が $C^2$ 級であると仮定してみます。点 $(U,M)$ で二変数Taylorの一次項を取ると、

$$
\begin{aligned}
L(U-E,M-n)
&=L(U,M)-L_u(U,M)E-L_m(U,M)n+R(E,n),\\
L_u&=\frac1{k_{\mathrm B}T}=\beta,\qquad
L_m=-\frac{\mu}{k_{\mathrm B}T}=-\beta\mu.
\end{aligned}
$$

二番目の関係は[化学ポテンシャルを含む熱力学の基本関係](../../TH/TH7/index.md#def-th7-component-mu)を $dS=(dU-\mu\,dN)/T$ と解いたものです。従って一次項は $-\beta E+\beta\mu n$。粒子を浴から取り出したときの浴の粒子数変化が $-n$ であることが、指数の符号を決めます。

たとえばTaylor展開の線分上で Hessian の二次形式が $|v^{\mathsf T}D^2L\,v|\le K\|v\|_2^2$ を満たせば、積分剰余から $|R(E,n)|\le K(E^2+n^2)/2$ と評価できます（エネルギーと粒子数を一つの同じ座標尺度へ換算した場合）。さらに離散状態数を $W_{\mathrm{sm}}$ に近似する誤差を別に評価して初めて、前の命題の $\delta$ が確定します。**単に浴が大きいという理由だけで、誤差を0としてはいけません。**

## 3. 対数微分が粒子数の揺らぎを測る

大分配関数の中で $\mu$ は粒子数 $N$ に掛かっています。微分時の混乱を避けるため、まず $\alpha=\beta\mu$ と置き、$\beta$ と $\alpha$ を独立変数として考えます。

<a id="thm-sm4-number-cumulants"></a>

<!-- formal-statement-start -->
> **定理（大分配関数の対数微分と粒子数揺らぎ）**  
> [有限大正準アンサンブル](#def-sm4-grand-ensemble)の $H,N$ がパラメータに依存しないとし、

$$
\widehat\Xi(\beta,\alpha)
=\sum_{(n,\omega)\in\mathcal X}
 e^{-\beta H_n(\omega)+\alpha n},
\qquad \alpha=\beta\mu
$$

> と置く。$\beta,\alpha\in\mathbb R$ において

$$
\partial_\alpha\log\widehat\Xi=\langle N\rangle,
\quad
\partial_\alpha^2\log\widehat\Xi
=\operatorname{Var}(N),
\quad
\partial_\beta\log\widehat\Xi\big|_\alpha=-\langle H\rangle,
$$

$$
\partial_\beta\partial_\alpha\log\widehat\Xi
=-\operatorname{Cov}(H,N)
$$

> が成立する。従って $T>0$ を固定した $\mu$ 微分では

$$
\frac{\partial\langle N\rangle}{\partial\mu}\bigg|_T
=\beta\operatorname{Var}(N)\ge0.
$$

> 等号は $N$ が全配置で一定のときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

一回微分すると粒子数 $n$ が係数として現れます。二回微分では分子の微分と分母の微分を分け、その差を分散に読み替えます。混合微分では[共分散](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)が現れます。

<!-- proof-start -->
### 証明

有限和なので項別微分でき、$X_{n,\omega}=e^{-\beta H_n(\omega)+\alpha n}$ と略すと、

$$
\partial_\alpha\widehat\Xi=\sum nX_{n,\omega},
\quad
\partial_\alpha^2\widehat\Xi=\sum n^2X_{n,\omega},
\quad
\partial_\beta\widehat\Xi=-\sum H_n(\omega)X_{n,\omega}.
$$

[規格化された大正準確率](#prop-sm4-normalization)を用い、各和を $\widehat\Xi$ で割ると順に $\langle N\rangle$、$\langle N^2\rangle$、$-\langle H\rangle$ です。商の微分より

$$
\begin{aligned}
\partial_\alpha^2\log\widehat\Xi
&=\frac{\partial_\alpha^2\widehat\Xi}{\widehat\Xi}
-\left(\frac{\partial_\alpha\widehat\Xi}{\widehat\Xi}\right)^2\\
&=\langle N^2\rangle-\langle N\rangle^2
=\operatorname{Var}(N).
\end{aligned}
$$

一方 $\partial_\beta\partial_\alpha\widehat\Xi=-\sum H_n(\omega)nX_{n,\omega}$ ですから

$$
\begin{aligned}
\partial_\beta\partial_\alpha\log\widehat\Xi
&=\frac{\partial_\beta\partial_\alpha\widehat\Xi}{\widehat\Xi}
-\frac{(\partial_\beta\widehat\Xi)(\partial_\alpha\widehat\Xi)}
{\widehat\Xi^2}\\
&=-\langle HN\rangle+\langle H\rangle\langle N\rangle
=-\operatorname{Cov}(H,N).
\end{aligned}
$$

$T$ 固定なら $\beta$ は定数、$\partial_\mu\alpha=\beta$ なので連鎖律で

$$
\partial_\mu\langle N\rangle\big|_T
=\partial_\alpha\langle N\rangle\,\partial_\mu\alpha
=\operatorname{Var}(N)\,\beta.
$$

最後に分散を $\sum_{(n,\omega)}p(n,\omega)(n-\langle N\rangle)^2$ と展開します。すべての配置の確率は正なので、0ならすべての $n$ が同じ値です。逆向きも成立します。
<!-- proof-end -->

**次元確認**：$\partial_\mu\langle N\rangle$ は粒子数をエネルギーで割った単位、$\beta\operatorname{Var}(N)$ も同じ単位です。$\partial_\mu^2\log\Xi=\beta^2\operatorname{Var}(N)$ なので、$\partial_\mu\langle N\rangle$ と混同して $\beta^2$ を付けないようにします。

<a id="prop-sm4-fixed-mu-energy"></a>

<!-- formal-statement-start -->
> **命題（化学ポテンシャル固定でのエネルギー交換量）**  
> 同じ有限模型で $K=H-\mu N$ とし、$\mu$ を固定したまま $\beta$ で微分すると

$$
-\partial_\beta\log\Xi\big|_\mu=\langle K\rangle,
\qquad
\partial_\beta^2\log\Xi\big|_\mu=\operatorname{Var}(K).
$$

> ここで現れるのは一般に $\operatorname{Var}(H)$ ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$-\beta(H-\mu N)$ 全体を一つの指数の引数として扱います。$\alpha=\beta\mu$ を固定した微分とは別の操作です。

<!-- proof-start -->
### 証明

$\mu$ 固定なら $K(n,\omega)$ は $\beta$ に依存しないので、

$$
\Xi'(\beta)=-\sum K(n,\omega)e^{-\beta K(n,\omega)},
\quad
\Xi''(\beta)=\sum K(n,\omega)^2e^{-\beta K(n,\omega)}.
$$

それぞれ $\Xi$ で割ると $-\langle K\rangle$、$\langle K^2\rangle$。従って

$$
\partial_\beta^2\log\Xi
=\frac{\Xi''}{\Xi}-\left(\frac{\Xi'}{\Xi}\right)^2
=\langle K^2\rangle-\langle K\rangle^2.
$$

たとえば $\mu\ne0$ で $N$ が揺らぐとき、$K=H-\mu N$ の分散には $\mu^2\operatorname{Var}(N)-2\mu\operatorname{Cov}(H,N)$ が加わります。
<!-- proof-end -->

## 4. 大熱力学ポテンシャルと変分原理

[SM3のHelmholtz自由エネルギー](../SM3/index.md#def-sm3-free-energy)は $F=U-TS$ でした。粒子数まで交換する系では、さらに粒子の「受け渡しに伴う寄与」を差し引きます。ただし有限模型のこの恒等式は統計的な構成であり、容積・粒子数の熱力学極限を取った後の状態関数の全ての性質を自動的に保証するものではありません。

<a id="def-sm4-grand-potential"></a>

<!-- formal-statement-start -->
> **定義（有限大熱力学ポテンシャル）**  
> [有限大正準分布](#def-sm4-grand-ensemble)の $T>0$、$\mu\in\mathbb R$ に対して、**大熱力学ポテンシャル**を

$$
\mathcal G(T,\mu)=-k_{\mathrm B}T\log\Xi(\beta,\mu)
$$

> と置く。ここで $\beta=1/(k_{\mathrm B}T)$ であり、$\mathcal G$ は本章では有限確率模型の関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm4-grand-potential -->
### 直接例：二状態の大熱力学ポテンシャル

**定義の確認**：冒頭の零粒子・一粒子模型では

$$
\mathcal G=-k_{\mathrm B}T\log(1+e^{-\beta(\varepsilon-\mu)}).
$$

$1+r>1$ なので $\mathcal G<0$。これはエネルギー $H$ が非負でも $\mathcal G$ が負になり得る具体例です。$T$ と $\mu$ を指定すれば数値が一意に定まります。
<!-- definition-example-end -->

<a id="thm-sm4-grand-identity"></a>

<!-- formal-statement-start -->
> **定理（大正準エントロピーと大熱力学ポテンシャル）**  
> 温度・化学ポテンシャルに依存しない有限 $H,N$ について、[Gibbsエントロピー](../SM3/index.md#def-sm3-gibbs-entropy)を $\mathcal X$ 上の大正準分布 $p$ に適用し、$U=\langle H\rangle$、$\bar N=\langle N\rangle$ とする。このとき

$$
\mathcal G=U-TS_{\mathrm G}(p)-\mu\bar N,
$$

$$
\left(\frac{\partial\mathcal G}{\partial\mu}\right)_T=-\bar N,
\qquad
\left(\frac{\partial\mathcal G}{\partial T}\right)_\mu=-S_{\mathrm G}(p).
$$

> $H,N$ に隠れた温度・化学ポテンシャル依存があれば、後二式には追加項が生じる。
<!-- formal-statement-end -->

### 証明の見取り図

大正準確率の対数を取って、エントロピーへ代入します。微分の際は $\beta$ が $T$ に依存するので、$\mu$ 固定の微分を明示します。

<!-- proof-start -->
### 証明

$\log p(n,\omega)=-\beta(H_n(\omega)-\mu n)-\log\Xi$ です。有限和の規格化と[Gibbsエントロピーの定義](../SM3/index.md#def-sm3-gibbs-entropy)から

$$
\begin{aligned}
S_{\mathrm G}(p)
&=-k_{\mathrm B}\sum p\log p\\
&=k_{\mathrm B}\beta\sum p(H-\mu N)
  +k_{\mathrm B}\log\Xi\sum p\\
&=\frac{U-\mu\bar N}{T}+k_{\mathrm B}\log\Xi.
\end{aligned}
$$

両辺へ $T$ を掛け、$\mathcal G=-k_{\mathrm B}T\log\Xi$ を代入すると $\mathcal G=U-\mu\bar N-TS_{\mathrm G}(p)$ です。

$\mu$ 微分では $T,\beta$ が一定なので、[粒子数の対数微分](#thm-sm4-number-cumulants)より

$$
\partial_\mu\mathcal G|_T
=-k_{\mathrm B}T\,\partial_\mu\log\Xi
=-k_{\mathrm B}T\,\beta\bar N=-\bar N.
$$

$T$ 微分では $\mu$ を固定し、$\partial_T\beta=-1/(k_{\mathrm B}T^2)$。[固定 $\mu$ での対数微分](#prop-sm4-fixed-mu-energy)に連鎖律を使うと

$$
\begin{aligned}
\partial_T\mathcal G|_\mu
&=-k_{\mathrm B}\log\Xi
 -k_{\mathrm B}T(\partial_\beta\log\Xi|_\mu)
     \frac{-1}{k_{\mathrm B}T^2}\\
&=-k_{\mathrm B}\log\Xi-\frac{U-\mu\bar N}{T}
=-S_{\mathrm G}(p).
\end{aligned}
$$

これは有限和についての厳密な等式です。
<!-- proof-end -->

[TH5の熱力学ポテンシャルの自然変数](../../TH/TH5/index.md#prop-th5-natural-variables)との対応から、容積も含む巨視的模型では大熱力学ポテンシャルの物理的な意味が得られます。しかし本章は容積固定の有限確率模型なので、$\mathcal G=-pV$ のような巨視的な関係を**一般の有限模型へ無条件に代入しません**。

確率の選び方を自由にしたら、どの分布が自然でしょうか。[SM3の自由エネルギー変分原理](../SM3/index.md#thm-sm3-variational)は粒子数固定の状態空間で扱いましたが、同じ対数不等式を全状態集合 $\mathcal X$ へ適用できます。

<a id="thm-sm4-variational"></a>

<!-- formal-statement-start -->
> **定理（有限大正準分布の変分原理）**  
> [有限模型](#def-sm4-grand-ensemble)の任意の確率分布 $q$ に対し、$0\log0=0$ と定め、

$$
\mathcal A_{T,\mu}(q)
=\sum_{x\in\mathcal X}q(x)(H(x)-\mu N(x))
+k_{\mathrm B}T\sum_{x\in\mathcal X}q(x)\log q(x)
$$

> と置く。このとき

$$
\mathcal A_{T,\mu}(q)\ge\mathcal G(T,\mu)
$$

> であり、等号が成立するのは $q=p_{\beta,\mu}$ の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

大正準分布の対数を用いて $\mathcal A-\mathcal G$ を対数比からなる和に変形します。対数不等式と規格化で非負性を証明し、等号条件も確定します。

<!-- proof-start -->
### 証明

$p(x)>0$ であることは[規格化命題](#prop-sm4-normalization)で示しました。$\log p(x)=-\beta(H(x)-\mu N(x))-\log\Xi$ から

$$
\begin{aligned}
k_{\mathrm B}T\sum_xq(x)\log\frac{q(x)}{p(x)}
&=k_{\mathrm B}T\sum_xq(x)\log q(x)\\
&\quad+\sum_xq(x)(H(x)-\mu N(x))
  +k_{\mathrm B}T\log\Xi\\
&=\mathcal A_{T,\mu}(q)-\mathcal G(T,\mu).
\end{aligned}
$$

ここで $q(x)=0$ の項は0と定義します。正の $q(x)$ の項で $-\log y\ge1-y$（$y>0$、等号は $y=1$ のみ）を $y=p(x)/q(x)$ に適用すると

$$
q(x)\log\frac{q(x)}{p(x)}\ge q(x)-p(x).
$$

$q(x)=0$ の項についても左辺0、右辺 $-p(x)<0$ なので不等式は成立します。全項を足すと

$$
\sum_xq(x)\log\frac{q(x)}{p(x)}
\ge\sum_xq(x)-\sum_xp(x)=1-1=0.
$$

すべて $q(x)=p(x)$ なら各項は0です。逆に和が0なら各項の上記不等式の差は非負で総和0だから、$q(x)=0$ となる点は存在せず（その点では差が $p(x)>0$）、正の全点で $p(x)/q(x)=1$ です。従って $q=p$ が唯一の最小点です。
<!-- proof-end -->

## 5. 独立な占有サイト：粒子数揺らぎを手で見る

実際に粒子数の分布を計算しましょう。$M\ge1$ 個の区別できるサイトがあり、各サイトは空（0）か一粒子が入る（1）かの二状態です。粒子同士の相互作用はなく、占有一箇所につきエネルギー $\varepsilon$ を持ちます。ここで区別できるのは**サイト**であり、粒子のラベルではありません。

<a id="prop-sm4-independent-sites"></a>

<!-- formal-statement-start -->
> **命題（非相互作用の二値サイト模型）**  
> $M\ge1$、$J=\{0,\dots,M\}$ とし、$\Omega_n$ を $M$ サイトのうち $n$ 個を選んだ配置集合、$H_n(\omega)=\varepsilon n$ とする。$\beta>0$、$\mu\in\mathbb R$ とし、

$$
r=e^{-\beta(\varepsilon-\mu)},\qquad
\theta=\frac{r}{1+r}
$$

> と置くと、

$$
\Xi=(1+r)^M,\quad
P(N=n)=\binom Mn\theta^n(1-\theta)^{M-n},
$$

$$
\langle N\rangle=M\theta,\qquad
\operatorname{Var}(N)=M\theta(1-\theta).
$$

> $0<\theta<1$ を固定して $M\to\infty$ とすると、

$$
\frac{\operatorname{Var}(N)}{\langle N\rangle^2}
=\frac{1-\theta}{M\theta}\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

粒子数 $n$ に対する配置数は二項係数です。サイトごとの指数重みが掛け算になるため大分配関数は二項展開そのものです。平均と分散は各サイトの0-1変数から直接再計算します。

<!-- proof-start -->
### 証明

$M$ 個のサイトから $n$ 個を選ぶ方法は $\binom Mn$ 通りなので、$Z_n=\binom Mn e^{-\beta\varepsilon n}$ です。これを[大分配関数](#def-sm4-grand-ensemble)へ代入して

$$
\Xi=\sum_{n=0}^M\binom Mn e^{-\beta(\varepsilon-\mu)n}
=\sum_{n=0}^M\binom Mn r^n=(1+r)^M.
$$

[粒子数周辺分布](#prop-sm4-normalization)により

$$
P(N=n)=\binom Mn\frac{r^n}{(1+r)^M}
=\binom Mn\left(\frac r{1+r}\right)^n
\left(\frac1{1+r}\right)^{M-n}.
$$

占有指示変数 $I_i\in\{0,1\}$ をサイトごとに定義すれば、各配置 $\boldsymbol i$ の確率は

$$
p(\boldsymbol i)=\frac{r^{i_1+\cdots+i_M}}{(1+r)^M}
=\prod_{j=1}^M\frac{r^{i_j}}{1+r}.
$$

従って $I_i$ は独立で $P(I_i=1)=\theta$。$I_i^2=I_i$ だから

$$
\mathbb E[I_i]=\theta,\qquad
\operatorname{Var}(I_i)=\mathbb E[I_i^2]-\theta^2
=\theta(1-\theta).
$$

$N=\sum_{i=1}^MI_i$、相異なる指示変数の共分散は0なので

$$
\langle N\rangle=\sum_i\theta=M\theta,\qquad
\operatorname{Var}(N)=\sum_i\theta(1-\theta)=M\theta(1-\theta).
$$

$\langle N\rangle=M\theta>0$ で割った比を計算すれば最後の式です。
<!-- proof-end -->

### 揺らぐのに安定して見える理由

$M$ が大きいと、標準偏差は $\sqrt{M\theta(1-\theta)}$ と $M$ の平方根の程度ですが、平均粒子数は $M\theta$ と $M$ に比例します。したがって相対標準偏差は $\sqrt{(1-\theta)/(M\theta)}$ へ縮みます。ただしこれは**特定の独立サイト模型**での結果で、相転移近傍を含めた全系の揺らぎが必ず同じように小さくなるという定理ではありません。

### 反例：粒子数を固定すれば揺らぎは消える

同じサイト模型でも「常にちょうど $n_0$ 個」と制約すれば、許容集合を $N=n_0$ の配置だけに替えることになり、$\operatorname{Var}(N)=0$ です。$\mu$ を変えても $e^{\beta\mu n_0}$ は全配置に共通の因子として約分され、確率分布は変わりません。[粒子数揺らぎの定理](#thm-sm4-number-cumulants)の等号条件と一致します。失われたのは、異なる粒子数を行き来する状態空間そのものです。

## 6. 演習：定義・微分・確率を接続する

### Level A：大分配関数と基本確率

#### A1. 零粒子・一粒子模型の規格化

$\Omega_0,\Omega_1$ が各一配置、エネルギーがそれぞれ $0,\varepsilon$（$\varepsilon>0$）である。$T>0$、$\mu\in\mathbb R$ とする。$\Xi$、$P(N=1)$、$P(N=0)$ を求め、和が1であることを確かめよ。

- Level: A
- ID: SM4-A1

<!-- solution-start -->
**詳細解答**　$\beta=1/(k_{\mathrm B}T)$、$r=e^{-\beta(\varepsilon-\mu)}$ とおきます。[大分配関数の定義](#def-sm4-grand-ensemble)から $Z_0=1$、$Z_1=e^{-\beta\varepsilon}$ なので

$$
\Xi=e^{\beta\mu\cdot0}Z_0+e^{\beta\mu}Z_1
=1+e^{-\beta(\varepsilon-\mu)}=1+r.
$$

[粒子数周辺分布](#prop-sm4-normalization)により $P(N=0)=1/(1+r)$、$P(N=1)=r/(1+r)$。どちらも正で、分子を足すと $1+r$ です。
<!-- solution-end -->

#### A2. 三つの粒子数と多重度

$J=\{0,1,2\}$ とし、粒子数ごとの配置数が $1,2,1$、エネルギーはどの配置でも0とする。$z=e^{\beta\mu}>0$ とおき、$\Xi$ と各粒子数確率を求めよ。

- Level: A
- ID: SM4-A2

<!-- solution-start -->
**詳細解答**　エネルギー0の指数重みは1なので $Z_0=1$、$Z_1=2$、$Z_2=1$。よって

$$
\Xi=Z_0+zZ_1+z^2Z_2=1+2z+z^2=(1+z)^2.
$$

各粒子数の周辺確率は順に $1/(1+z)^2$、$2z/(1+z)^2$、$z^2/(1+z)^2$ です。分子の和は $\Xi$ に一致します。粒子数1に二配置があるので、その準位の確率には係数2が必要です。
<!-- solution-end -->

#### A3. エネルギー原点と粒子数原点

各配置のエネルギーを $H'_n(\omega)=H_n(\omega)+c$ と一律にずらす（$c\in\mathbb R$）。粒子数は変えない。新しい $\Xi'$ と $p'$、$\mathcal G'$ を求めよ。

- Level: A
- ID: SM4-A3

<!-- solution-start -->
**詳細解答**　全配置の重みが $e^{-\beta c}$ 倍になるため、

$$
\Xi'=\sum_{n,\omega}e^{-\beta(H_n+c-\mu n)}
=e^{-\beta c}\Xi.
$$

従って $p'=e^{-\beta c}e^{-\beta(H-\mu N)}/(e^{-\beta c}\Xi)=p$ で、確率は不変です。[大熱力学ポテンシャル](#def-sm4-grand-potential)から

$$
\mathcal G'=-k_{\mathrm B}T\log(e^{-\beta c}\Xi)
=c-k_{\mathrm B}T\log\Xi=\mathcal G+c.
$$

エネルギーの一律の原点移動と、粒子数に比例する移動は異なる操作です。
<!-- solution-end -->

#### A4. 感受率の単位と係数

二状態模型で $r=e^{-\beta(\varepsilon-\mu)}$ とする。$T$ 固定で $\partial_\mu\langle N\rangle$ を直接計算し、$\beta\operatorname{Var}(N)$ に一致することを示せ。

- Level: A
- ID: SM4-A4

<!-- solution-start -->
**詳細解答**　$\langle N\rangle=r/(1+r)$、$dr/d\mu=\beta r$ です。商の微分で

$$
\frac{\partial\langle N\rangle}{\partial\mu}
=\frac{\beta r(1+r)-r\beta r}{(1+r)^2}
=\frac{\beta r}{(1+r)^2}.
$$

$N$ は0か1なので $\mathbb E[N^2]=\langle N\rangle=r/(1+r)$ です。従って

$$
\operatorname{Var}(N)
=\frac r{1+r}-\frac{r^2}{(1+r)^2}
=\frac r{(1+r)^2}.
$$

よって微分は $\beta\operatorname{Var}(N)$ です。[粒子数揺らぎの定理](#thm-sm4-number-cumulants)の $\beta$ は一乗であり、単位はエネルギーの逆数です。
<!-- solution-end -->

#### A5. 化学ポテンシャルの符号

浴の対数状態数近似が $L(u,m)=a+\beta u-\beta\mu m$（$\beta>0$）で、試料がエネルギー $E$ と粒子数 $n$ を得たとする。浴の状態数比 $W_B(U-E,M-n)/W_B(U,M)$ を求めよ。

- Level: A
- ID: SM4-A5

<!-- solution-start -->
**詳細解答**　滑らかな模型 $W_B=e^L$ を仮定し、浴へ残った値を代入します。

$$
\begin{aligned}
L(U-E,M-n)-L(U,M)
&=\beta(U-E)-\beta\mu(M-n)
  -\beta U+\beta\mu M\\
&=-\beta E+\beta\mu n.
\end{aligned}
$$

両辺を指数化すると求める比は $e^{-\beta(E-\mu n)}$ です。[浴からの周辺確率](#prop-sm4-reservoir-marginal)と同じ符号で、浴の粒子数が $M-n$ へ減ることを使います。
<!-- solution-end -->

### Level B：定理の再構成と仮定の確認

#### B1. 粒子数固定という境界事例

許容粒子数が $J=\{n_0\}$ の有限模型を考える。$\mu$ に依存しない確率分布となることを直接示し、$\operatorname{Var}(N)$ と $\partial_\mu\mathcal G$ を求めよ。

- Level: B
- ID: SM4-B1

<!-- solution-start -->
**詳細解答**　[大分配関数](#def-sm4-grand-ensemble)は $\Xi=e^{\beta\mu n_0}Z_{n_0}$ です。従って配置 $\omega$ の確率は

$$
p(n_0,\omega)
=\frac{e^{\beta\mu n_0}e^{-\beta H_{n_0}(\omega)}}
 {e^{\beta\mu n_0}Z_{n_0}}
=\frac{e^{-\beta H_{n_0}(\omega)}}{Z_{n_0}},
$$

と $\mu$ に依存しません。全確率が粒子数 $n_0$ に集中するため $\langle N\rangle=n_0$、$\operatorname{Var}(N)=n_0^2-n_0^2=0$。さらに

$$
\mathcal G=-k_{\mathrm B}T\log Z_{n_0}-\mu n_0,
\qquad \partial_\mu\mathcal G=-n_0=-\langle N\rangle.
$$

$\partial_\mu\langle N\rangle=0$ であり、[揺らぎの等号条件](#thm-sm4-number-cumulants)を満たします。
<!-- solution-end -->

#### B2. 二つの独立サイトの大分配関数

二つの区別できるサイトのエネルギーが占有時にそれぞれ $\varepsilon_1,\varepsilon_2$、非占有時に0である。相互作用なしで粒子数は占有サイト数とする。大分配関数と $\langle N\rangle$、$\operatorname{Var}(N)$ を求め、独立性が使われる箇所を示せ。

- Level: B
- ID: SM4-B2

<!-- solution-start -->
**詳細解答**　サイト $i$ の占有重みを $r_i=e^{-\beta(\varepsilon_i-\mu)}$ と置きます。四配置 $(0,0),(1,0),(0,1),(1,1)$ は順に $1,r_1,r_2,r_1r_2$ の重みです。従って

$$
\Xi=1+r_1+r_2+r_1r_2=(1+r_1)(1+r_2).
$$

占有変数 $I_i$ は独立で、$\theta_i=r_i/(1+r_i)$ を用いれば $P(I_i=1)=\theta_i$。$N=I_1+I_2$ なので

$$
\langle N\rangle=\theta_1+\theta_2,\qquad
\operatorname{Var}(N)=\theta_1(1-\theta_1)+\theta_2(1-\theta_2).
$$

実際、$\mathbb E[I_1I_2]=r_1r_2/\Xi=\theta_1\theta_2$ で共分散は0です。相互作用 $J$ が同時占有に加われば四つ目の重みは $r_1r_2e^{-\beta J}$ となって積表示と独立性が崩れます。
<!-- solution-end -->

#### B3. 大熱力学ポテンシャルの温度微分

$T,\mu$ に依存しない有限 $H,N$ から定まる $\mathcal G=-k_{\mathrm B}T\log\Xi$ について、$\mu$ 固定で $\partial_T\mathcal G=-S_{\mathrm G}$ を最初から示せ。

- Level: B
- ID: SM4-B3

<!-- solution-start -->
**詳細解答**　$\beta=1/(k_{\mathrm B}T)$ で $d\beta/dT=-1/(k_{\mathrm B}T^2)$。[固定 $\mu$ の対数微分](#prop-sm4-fixed-mu-energy)により $\partial_\beta\log\Xi|_\mu=-(U-\mu\bar N)$ です。積と連鎖律で

$$
\begin{aligned}
\partial_T\mathcal G|_\mu
&=-k_{\mathrm B}\log\Xi
 -k_{\mathrm B}T\,[-(U-\mu\bar N)]
    \left[-\frac1{k_{\mathrm B}T^2}\right]\\
&=-k_{\mathrm B}\log\Xi-\frac{U-\mu\bar N}{T}.
\end{aligned}
$$

他方 $-\sum p\log p=\beta(U-\mu\bar N)+\log\Xi$ は $\log p=-\beta(H-\mu N)-\log\Xi$ と $\sum p=1$ から得られるので、[Gibbsエントロピー](../SM3/index.md#def-sm3-gibbs-entropy)は $S_{\mathrm G}=k_{\mathrm B}\log\Xi+(U-\mu\bar N)/T$ です。従って表示式は $-S_{\mathrm G}$ に等しくなります。
<!-- solution-end -->

#### B4. 化学ポテンシャルのシフトと分布不変性

$H'_n(\omega)=H_n(\omega)+an$、$\mu'=\mu+a$（$a\in\mathbb R$）と同時に変更する。温度は固定する。大分配関数、確率、平均エネルギー、大熱力学ポテンシャルへの影響を求めよ。

- Level: B
- ID: SM4-B4

<!-- solution-start -->
**詳細解答**　どの配置でも

$$
H'_n(\omega)-\mu'n
=H_n(\omega)+an-(\mu+a)n=H_n(\omega)-\mu n.
$$

従って一つ一つの重みが等しく $\Xi'=\Xi$、$p'=p$ です。確率が変わらないため $\bar N'=\bar N$、一方 $U'=\sum p(H+aN)=U+a\bar N$。[大熱力学ポテンシャル](#def-sm4-grand-potential)の定義から $\mathcal G'=\mathcal G$。恒等式でも

$$
U'-\mu'\bar N'
=(U+a\bar N)-(\mu+a)\bar N
=U-\mu\bar N
$$

で整合します。A3の**全配置に共通なエネルギー移動**とは異なり、ここでは粒子数に比例した移動を $\mu$ で打ち消しています。
<!-- solution-end -->

### Level C：複合模型の総合演習

#### C1. $M$ サイトを使う総合問題

$M\ge2$ 個の独立二値サイトに一サイト当たり占有エネルギー $\varepsilon>0$ を与える。$T>0$、$\mu\in\mathbb R$ は固定、$r=e^{-\beta(\varepsilon-\mu)}$、$\theta=r/(1+r)$ とする。

1. 各 $n$ の配置数と $\Xi$、$P(N=n)$ を求めよ。
2. $\bar N$ と $\operatorname{Var}(N)$ を求め、$\partial_\mu\bar N=\beta\operatorname{Var}(N)$ を直接確かめよ。
3. $\mathcal G$、$U$、$S_{\mathrm G}$ を求め、$\mathcal G=U-TS_{\mathrm G}-\mu\bar N$ を検算せよ。
4. 一サイトが占有される確率を任意の $x\in[0,1]$ とした積分布 $q_x$ の変分関数を計算し、最小化される $x$ を求めよ。
5. 相対標準偏差を求め、その減衰に必要な $\theta$ の条件を述べよ。また二つの占有が同時に起きたときだけ相互作用が $J\ne0$ 加わる $M=2$ の場合に、積表示が破れることを示せ。

- Level: C
- ID: SM4-C1

<!-- solution-start -->
**詳細解答**

**(1)**　粒子数 $n$ の配置は $M$ 箇所から $n$ 箇所を選ぶ $\binom Mn$ 通りです。粒子数 $n$ でエネルギー $\varepsilon n$ なので $Z_n=\binom Mn e^{-\beta\varepsilon n}$。従って[大分配関数](#def-sm4-grand-ensemble)は

$$
\Xi=\sum_{n=0}^M\binom Mn r^n=(1+r)^M.
$$

[粒子数周辺分布](#prop-sm4-normalization)から

$$
P(N=n)=\frac{\binom Mn r^n}{(1+r)^M}
=\binom Mn\theta^n(1-\theta)^{M-n}.
$$

**(2)**　サイト占有変数 $I_i$ は独立な0-1変数で、$\mathbb E[I_i]=\theta$、$\mathbb E[I_i^2]=\theta$ なので $\operatorname{Var}(I_i)=\theta-\theta^2$。[独立サイト模型](#prop-sm4-independent-sites)の計算を再現すると

$$
\bar N=M\theta,\qquad \operatorname{Var}(N)=M\theta(1-\theta).
$$

$dr/d\mu=\beta r$ と商の微分から

$$
\frac{d\theta}{d\mu}
=\frac{\beta r(1+r)-\beta r^2}{(1+r)^2}
=\frac{\beta r}{(1+r)^2}
=\beta\theta(1-\theta).
$$

従って $\partial_\mu\bar N=M\beta\theta(1-\theta)=\beta\operatorname{Var}(N)$。

**(3)**　全配置の確率は $M$ 個のBernoulli分布の積なので、$\log p(\boldsymbol i)=\sum_i[i_i\log\theta+(1-i_i)\log(1-\theta)]$ です。[Gibbsエントロピー](../SM3/index.md#def-sm3-gibbs-entropy)を取り、各 $i$ の期待値を足すと

$$
S_{\mathrm G}=-Mk_{\mathrm B}
[\theta\log\theta+(1-\theta)\log(1-\theta)].
$$

$\log\theta=\log r-\log(1+r)$、$\log(1-\theta)=-\log(1+r)$ を代入して

$$
S_{\mathrm G}=Mk_{\mathrm B}[\log(1+r)-\theta\log r]
=Mk_{\mathrm B}\log(1+r)
+\frac{M(\varepsilon-\mu)\theta}{T}.
$$

$H=\varepsilon N$ なので $U=\varepsilon M\theta$、また

$$
\mathcal G=-Mk_{\mathrm B}T\log(1+r).
$$

以上より

$$
\begin{aligned}
U-TS_{\mathrm G}-\mu\bar N
&=M(\varepsilon-\mu)\theta
 -Mk_{\mathrm B}T\log(1+r)
 -M(\varepsilon-\mu)\theta\\
&=-Mk_{\mathrm B}T\log(1+r)=\mathcal G.
\end{aligned}
$$

**(4)**　$q_x$ は各サイトを独立に確率 $x$ で占有する分布です。$0\log0=0$ の約束の下で $q_x$ の平均粒子数は $Mx$、エネルギー平均は $M\varepsilon x$、エントロピーは $-Mk_{\mathrm B}[x\log x+(1-x)\log(1-x)]$ です。従って

$$
\mathcal A_{T,\mu}(q_x)
=M\{(\varepsilon-\mu)x
+k_{\mathrm B}T[x\log x+(1-x)\log(1-x)]\}.
$$

$0<x<1$ では

$$
\mathcal A'(x)=M\left[\varepsilon-\mu+k_{\mathrm B}T\log\frac{x}{1-x}\right],
$$

$$
\mathcal A''(x)
=Mk_{\mathrm B}T\left(\frac1x+\frac1{1-x}\right)>0.
$$

停留条件は $x/(1-x)=e^{-\beta(\varepsilon-\mu)}=r$ で、唯一の解は $x=\theta$。$\mathcal A'(x)\to-\infty$（$x\to0+$）、$\mathcal A'(x)\to+\infty$（$x\to1-$）であるため、端点より内部で小さく、閉区間全体の唯一の最小です。さらに $q_\theta$ は実際の大正準分布と一致するので、[変分原理](#thm-sm4-variational)によって積分布以外も含む全分布上の唯一の最小になります。

**(5)**　$\bar N=M\theta>0$ なので

$$
\frac{\sqrt{\operatorname{Var}(N)}}{\bar N}
=\frac{\sqrt{M\theta(1-\theta)}}{M\theta}
=\sqrt{\frac{1-\theta}{M\theta}}.
$$

$\theta$ を固定して $0<\theta<1$ とすると $M^{-1/2}$ で減衰します。$\theta=\theta_M$ と変わるなら、減衰には $(1-\theta_M)/(M\theta_M)\to0$ が必要十分です。特に $M\theta_M$ が有界で $\theta_M\to0$ なら減衰しません。

$M=2$ で両サイト占有のみに追加エネルギー $J$ があると、状態の重みは $1,r,r,r^2e^{-\beta J}$ なので

$$
\Xi_J=1+2r+r^2e^{-\beta J}.
$$

$\beta>0$、$J\ne0$ なら $e^{-\beta J}\ne1$ であり $(1+r)^2$ と一致しません。分配関数をサイトごとの積に分ける論証は、二サイトのエネルギーがそれぞれの和であるという仮定に依存します。
<!-- solution-end -->

## 7. 何を得たか、次に必要なこと

大正準分布では、粒子数 $n$ に関する周辺確率と、その条件下の正準分布を分けて計算できます。粒子浴の状態数から $\exp[-\beta(H-\mu N)]$ の符号と適用条件を確認し、大分配関数の微分から平均粒子数・分散・共分散を、対数から大熱力学ポテンシャルを導出しました。

ただし、有限系の数式だけで**異なるアンサンブルが熱力学極限で同値になる**とは証明されません。SM5では古典理想気体の数え上げと、極限を取る際の追加条件を扱います。
