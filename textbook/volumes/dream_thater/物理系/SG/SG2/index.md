# SG2 Gaussian concentration・Gaussian部分積分・補間法

[SG1のREM圧力極限](../SG1/index.md#thm-sg1-pressure)では、配置ごとに独立な正規エネルギーを数え上げました。しかし、相互作用係数を共有する模型では配置ごとのエネルギーが相関し、帯の個数を独立な指示変数として扱う方法が使えません。次の問いは、**独立でない正規エネルギーから圧力をどう制御するか**です。

ここでは有限個の配置に付けた正規ベクトルを共分散行列で表し、三つの道具を構成します。Gaussian部分積分は「無秩序を一つ掛けた期待値」を微分へ置き換えます。Gaussian集中不等式は「試料ごとの圧力が平均からどれだけ外れるか」を評価します。補間法は「二つの共分散構造の圧力の差」を計算します。いずれも有限次元で証明し、後続のSK模型でそのまま使える式へ仕上げます。

## 1. 独立なエネルギーから共分散を持つ場へ

有限な空でない配置集合を $\Omega$、その要素数を $M$ とします。$X=(X_\sigma)_{\sigma\in\Omega}$ を平均0の同時正規ベクトルとし、共分散を

$$
C_{\sigma\tau}=\mathbb E[X_\sigma X_\tau]
$$

とします。$C$ は対称かつ半正定値です。実際、任意の実数列 $a_\sigma$ に対して

$$
\sum_{\sigma,\tau}a_\sigma C_{\sigma\tau}a_\tau
=\mathbb E\left(\sum_\sigma a_\sigma X_\sigma\right)^2\ge0
$$

です。一般の共分散は対角行列とは限りません。たとえば共通の無秩序 $G$ を二配置に加えれば、二つのエネルギーは同じ向きに動きます。

<a id="def-sg2-gaussian-field"></a>

<!-- formal-statement-start -->
> **定義（有限Gaussian場と共分散）**  
> 有限集合 $\Omega$ 上の実数値ランダムベクトル $X=(X_\sigma)$ が有限Gaussian場であるとは、任意の実数係数 $a_\sigma$ に対して $\sum_\sigma a_\sigma X_\sigma$ が（退化した場合を含め）正規分布に従うことをいう。平均0の場合の共分散行列を $C=(\mathbb EX_\sigma X_\tau)_{\sigma,\tau\in\Omega}$ とする。$N\ge1$、$\beta\ge0$、固定された $h_\sigma\in\mathbb R$ に対し、分配関数とランダム圧力を

$$
Z_X=\sum_{\sigma\in\Omega}e^{\beta X_\sigma+h_\sigma},
\qquad F_X=\frac1N\log Z_X
$$

> とする。$\mathbb EF_X$ をquenched圧力とする。Gibbs重みは

$$
w_X(\sigma)=\frac{e^{\beta X_\sigma+h_\sigma}}{Z_X},
\qquad \sum_\sigma w_X(\sigma)=1
$$

> である。$X=-H$ と置けば、[SG1のBoltzmann重み](../SG1/index.md#def-sg1-quenched)と同じ符号規約になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg2-gaussian-field -->
### 二配置で共分散を直接確かめる

**定義の確認**：独立な標準正規変数 $G_0,G_1,G_2$ と $a,b\ge0$ に対し、$X_1=aG_0+bG_1$、$X_2=aG_0+bG_2$ と置きます。任意の線形結合は正規変数の線形結合なので同時正規です。また

$$
\mathbb EX_1^2=\mathbb EX_2^2=a^2+b^2,
\qquad \mathbb EX_1X_2=a^2.
$$

$b=0$ なら二配置は同じ変数、$a=0$ なら互いに独立です。共分散を指定することは、この中間も扱うことを意味します。
<!-- definition-example-end -->

$\log Z_X$ は常に有限で、$X$ の絶対値に高々線形に依存するため期待値も有限です。以下の主要結果では $\Omega$ と $N$ は有限・固定とし、最後に必要な場合だけ $N\to\infty$ を考えます。

## 2. Gaussian部分積分：無秩序を微分に変える

正規変数の平均を含む式に $X_\sigma$ が掛かっていると、直接積分するより関数の導関数に置き換えた方が簡単です。正規密度 $\varphi(x)=(2\pi)^{-1/2}e^{-x^2/2}$ は $\varphi'(x)=-x\varphi(x)$ を満たします。この微分恒等式が出発点です。

[HDP5のGaussian部分積分](../../../解析系/HDP/HDP5/index.md#lem-hdp5-gaussian-ibp)は、標準正規入力 $G$ に対して $\mathbb E[G_k f(G)]=\mathbb E[\partial_k f(G)]$ を与え、その証明も正規密度の微分から完成しています。ここでは**配置間に共分散がある場合**へこの公式を移し替えます。

<a id="prop-sg2-correlated-ibp"></a>

<!-- formal-statement-start -->
> **命題（共分散付きGaussian部分積分）**  
> 平均 $\mu\in\mathbb R^m$、半正定値共分散行列 $C$ を持つGaussianベクトル $X$ を考える。$F:\mathbb R^m\to\mathbb R$ が連続微分可能で、$F$ と一階導関数が高々多項式増大するとき、各 $i=1,\ldots,m$ について

$$
\mathbb E[(X_i-\mu_i)F(X)]
=\sum_{j=1}^m C_{ij}\mathbb E[\partial_jF(X)]
$$

> が成立する。$C$ は特異でもよい。
<!-- formal-statement-end -->

### 証明の見取り図

相関を取り扱うため、$X=\mu+AG$、$AA^\mathsf T=C$ と置きます。入力 $G$ のどの成分が $X$ のどの成分を動かすかを連鎖律で数え、最後に行列積を共分散へ戻します。

<!-- proof-start -->
### 証明

半正定値な $C$ には実行列 $A$ で $AA^\mathsf T=C$ を満たすものがあり、$G\sim N(0,I_m)$ とすると $X$ は $\mu+AG$ と同じ分布です。$\widetilde F(g)=F(\mu+Ag)$ と置くと、連鎖律より

$$
\partial_{g_k}\widetilde F(g)
=\sum_{j=1}^m A_{jk}\partial_jF(\mu+Ag).
$$

[HDP5のGaussian部分積分](../../../解析系/HDP/HDP5/index.md#lem-hdp5-gaussian-ibp)を $G_k$ と $\widetilde F$ に適用します。多項式増大により絶対可積分性と境界項の消失が成立し、

$$
\begin{aligned}
\mathbb E[(X_i-\mu_i)F(X)]
&=\sum_k A_{ik}\mathbb E[G_k\widetilde F(G)]\\
&=\sum_{k,j}A_{ik}A_{jk}\mathbb E[\partial_jF(X)]\\
&=\sum_j(AA^\mathsf T)_{ij}\mathbb E[\partial_jF(X)]
=\sum_jC_{ij}\mathbb E[\partial_jF(X)].
\end{aligned}
$$

可逆行列 $A^{-1}$ を使っていないので、$C$ が特異でも証明は変わりません。以降に用いるGibbs重みは有界で、各一階導関数も有界ですから、この部分積分を適用するための可積分性条件を満たします。
<!-- proof-end -->

**簡単な検算（指数関数への拡張）**：$v>0$、$t\in\mathbb R$、$X\sim N(0,v)$ とします。$F(x)=e^{tx}$ は $t\ne0$ で命題の多項式増大条件を満たさないため、その命題を直接適用したとは言えません。ここでは正規密度

$$
\varphi_v(x)=\frac1{\sqrt{2\pi v}}e^{-x^2/(2v)},
\qquad
\varphi_v'(x)=-\frac{x}{v}\varphi_v(x)
$$

から部分積分を直接確かめます。平方完成により $\mathbb E[|X|e^{tX}]<\infty$ であり、$e^{tx}\varphi_v(x)\to0$ は $x\to\pm\infty$ で成立します。よって境界項は消え、

$$
\begin{aligned}
\mathbb E[Xe^{tX}]
&=-v\int_{\mathbb R}e^{tx}\varphi_v'(x)\,dx\\
&=vt\int_{\mathbb R}e^{tx}\varphi_v(x)\,dx\\
&=vt\,e^{vt^2/2}
\end{aligned}
$$

を得ます。すなわち指数関数についても、可積分性と境界項を別途確認すれば同じ部分積分恒等式が成立します。

最後の式は[SG1の正規指数モーメントの計算](../SG1/index.md#prop-sg1-annealed-rem)からも得られます。

<a id="prop-sg2-gibbs-derivatives"></a>

<!-- formal-statement-start -->
> **命題（Gibbs重みの微分）**  
> [有限Gaussian場の設定](#def-sg2-gaussian-field)で $x=(x_\sigma)$ を確定した実数ベクトルとする。Gibbs重みを

$$
w_x(\sigma)=\frac{e^{\beta x_\sigma+h_\sigma}}{\sum_\rho e^{\beta x_\rho+h_\rho}}
$$

> と置く。任意の $\sigma,\tau\in\Omega$ に対して

$$
\partial_{x_\tau}\log Z_x=\beta w_x(\tau),
$$

$$
\partial_{x_\tau}w_x(\sigma)
=\beta w_x(\sigma)
 \bigl(\mathbf1_{\{\sigma=\tau\}}-w_x(\tau)\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

分子の微分と分母の微分を別々に行うと、$\sigma=\tau$ にだけ現れる項と、どの配置にも現れる規格化項に分かれます。この二項構造が補間公式の「対角−二レプリカ」になります。

<!-- proof-start -->
### 証明

有限和なので $\partial_{x_\tau}Z_x=\beta e^{\beta x_\tau+h_\tau}$ です。連鎖律により

$$
\partial_{x_\tau}\log Z_x
=\frac{\partial_{x_\tau}Z_x}{Z_x}
=\beta w_x(\tau).
$$

次に商の微分法を分子・分母へ適用すると

$$
\begin{aligned}
\partial_{x_\tau}w_x(\sigma)
&=\frac{\beta\mathbf1_{\{\sigma=\tau\}}
 e^{\beta x_\sigma+h_\sigma}}{Z_x}
-\frac{e^{\beta x_\sigma+h_\sigma}}{Z_x^2}
  \beta e^{\beta x_\tau+h_\tau}\\
&=\beta w_x(\sigma)\mathbf1_{\{\sigma=\tau\}}
-\beta w_x(\sigma)w_x(\tau).
\end{aligned}
$$

二項をまとめて結論です。
<!-- proof-end -->

同じ無秩序を固定して、Gibbs分布から配置 $\sigma,\tau$ を**独立に二回**取り出す操作を二レプリカ平均と呼びます。関数 $A(\sigma,\tau)$ に対して

<a id="def-sg2-replica"></a>

<!-- formal-statement-start -->
> **定義（二レプリカGibbs平均）**  
> 有限集合 $\Omega$、正のGibbs重み $w_X$、関数 $A:\Omega^2\to\mathbb R$ について

$$
\langle A(\sigma,\tau)\rangle_{X}^{\otimes2}
=\sum_{\sigma,\tau\in\Omega}
w_X(\sigma)w_X(\tau)A(\sigma,\tau)
$$

> とする。無秩序 $X$ に関する期待値 $\mathbb E\langle A\rangle_X^{\otimes2}$ は、このGibbs平均の後で取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg2-replica -->
### 二配置でのレプリカ平均

**定義の確認**：$w_X(1)=p$、$w_X(2)=1-p$ と固定すると、二回引いた配置が等しい確率は

$$
\langle\mathbf1_{\{\sigma=\tau\}}\rangle_X^{\otimes2}
=p^2+(1-p)^2,
$$

異なる確率は $2p(1-p)$ です。$p$ が無秩序で変わるなら、これらを求めた後に $\mathbb E$ を取ります。先に $p$ を平均してから二乗する操作とは異なります。
<!-- definition-example-end -->

## 3. Gaussian集中：quenched圧力が自己平均化する

[SG1のquenched圧力](../SG1/index.md#def-sg1-quenched)は期待値ですが、一つの実験試料の圧力が期待値に近いかは別問題です。有限個の正規変数の関数が、入力を大きく変えない限り出力も大きく変わらないなら、正規分布の集中を使えます。その「出力の変化しにくさ」はEuclid距離でのLipschitz定数として測ります。

[HDP5のEuclid距離のLipschitz定義](../../../解析系/HDP/HDP5/index.md#def-hdp5-lipschitz)では、すべての $x,y$ で $|f(x)-f(y)|\le L\|x-y\|_2$ を要求します。微分可能な関数なら、線分上の積分とCauchy–Schwarzから $\|\nabla f\|_2\le L$ が十分条件です。

具体的に $f(x_1,x_2)=(x_1+x_2)/2$ は $\nabla f=(1/2,1/2)$ なので最良Lipschitz定数は $1/\sqrt2$。実際、

$$
|f(x)-f(y)|
=\left|\int_0^1\nabla f(y+r(x-y))\cdot(x-y)\,dr\right|
\le\frac{\|x-y\|_2}{\sqrt2}.
$$

$x-y=(1,1)$ で等号を達成するため、これより小さくできません。

### 集中の既知定理をここで使う

[HDP5のGaussian集中定理](../../../解析系/HDP/HDP5/index.md#thm-hdp5-gaussian-concentration)は、$G\sim N(0,I_d)$ と $L$-Lipschitz関数 $f$ に対し、$L>0$、$u>0$ のとき

$$
\mathbb P(|f(G)-\mathbb Ef(G)|\ge u)
\le2e^{-u^2/(2L^2)}
$$

を与えます。HDP5では、[Gaussian平均の半群性・不変性・微分交換](../../../解析系/HDP/HDP5/index.md#lem-hdp5-ou-identities)から対数Sobolev不等式とHerbst法へ進み、係数 $1/2$ まで証明しています。この結果をここで再証明する代わりに、**圧力が正規入力のLipschitz関数になること**を直接計算します。

特に配置エネルギー $X_\sigma$ 同士の独立性は不要です。必要なのは一つの標準正規ベクトル $G$ からの線形表示 $X=AG$ と、圧力関数の勾配上界です。

ここで必要なのは独立な標準正規変数 $G$ であって、**各配置のエネルギー $X_\sigma$ 同士の独立性ではありません**。これがREMから先へ進む際の決定的な利点です。

<a id="cor-sg2-pressure-concentration"></a>

<!-- formal-statement-start -->
> **系（正規無秩序圧力の集中）**  
> 整数 $N\ge1$、有限集合 $\Omega_N$、平均0のGaussian場 $X$ に対し、$C_{\sigma\sigma}\le vN$ が全配置で成立するとする（$v>0$）。固定された $h_\sigma\in\mathbb R$ と $\beta>0$ について、[有限Gaussian場の圧力](#def-sg2-gaussian-field)は任意の $u>0$ に対して

$$
\mathbb P\!\left(|F_X-\mathbb EF_X|\ge u\right)
\le2\exp\!\left(-\frac{Nu^2}{2\beta^2v}\right).
$$

> 特に $\beta,v$ を固定すれば $F_X-\mathbb EF_X\to0$ が確率収束する。$\beta=0$ のとき圧力は非ランダムである。
<!-- formal-statement-end -->

### 証明の見取り図

場を $X=AG$ と表示し、Gibbs重みが非負で和1であることから勾配ノルムを制御します。相関があっても、全共分散は各分散の上限だけで押さえられます。

<!-- proof-start -->
### 証明

$C=AA^\mathsf T$、$X=AG$ とします。[Gibbs重みの微分](#prop-sg2-gibbs-derivatives)と連鎖律から、$G$ の座標 $k$ に関して

$$
\partial_{G_k}F_X
=\frac\beta N\sum_\sigma w_X(\sigma)A_{\sigma k}.
$$

従って勾配の二乗は

$$
\begin{aligned}
\|\nabla_GF_X\|_2^2
&=\frac{\beta^2}{N^2}
 \sum_{k,\sigma,\tau}w_X(\sigma)w_X(\tau)
 A_{\sigma k}A_{\tau k}\\
&=\frac{\beta^2}{N^2}
 \sum_{\sigma,\tau}w_X(\sigma)w_X(\tau)C_{\sigma\tau}.
\end{aligned}
$$

共分散に対する[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)より $|C_{\sigma\tau}|\le\sqrt{C_{\sigma\sigma}C_{\tau\tau}}\le vN$。Gibbs重みの総和は1なので

$$
0\le\|\nabla_GF_X\|_2^2
\le\frac{\beta^2}{N^2}vN
=\frac{\beta^2v}{N}.
$$

線分に沿う積分により $F_X$ は $G$ の関数として $L=\beta\sqrt{v/N}$-Lipschitzです。[Gaussian集中定理](../../../解析系/HDP/HDP5/index.md#thm-hdp5-gaussian-concentration)へ代入して結論を得ます。右辺は固定した $u>0$ で $N\to\infty$ のとき0となります。
<!-- proof-end -->

この系は各 $N$ のquenched圧力 $\mathbb EF_X$ の**極限の存在を証明しません**。極限値の存在と、そこへの試料ごとの集中は別々に示す必要があります。さらに [quenchedとannealedの比較](../SG1/index.md#prop-sg1-jensen)の差が消えるとも主張していません。

## 4. Gaussian補間：共分散が圧力をどう変えるか

二つの模型 $X,Y$ をそれぞれ直接計算しなくても、両者を連続的につなぎ、その途中でquenched圧力を微分できれば差を積分できます。これがGaussian補間の中心です。$X,Y$ は互いに独立で、それぞれ同じ配置集合 $\Omega$ 上の平均0のGaussian場とします。

<a id="def-sg2-interpolation"></a>

<!-- formal-statement-start -->
> **定義（Gaussian平方根補間）**  
> 平均0で互いに独立な二つの有限Gaussian場 $X,Y$ に対して、$0\le t\le1$ で

$$
H_t(\sigma)=\sqrt t\,X_\sigma+\sqrt{1-t}\,Y_\sigma
$$

> と置く。共分散は $C_t=tC^X+(1-t)C^Y$ である。固定された $N,\beta,h_\sigma$ に対して、補間圧力を

$$
\Phi(t)=\frac1N\mathbb E\log
 \sum_{\sigma\in\Omega}e^{\beta H_t(\sigma)+h_\sigma}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg2-interpolation -->
### 一配置と二配置の違い

**定義の確認**：一配置なら $\Phi(t)=N^{-1}(\beta\mathbb EH_t+h)=h/N$ で、共分散が変わっても平均圧力は変わりません。二配置で $X_1,X_2$ は独立で分散 $v$、$Y_1=Y_2$ は同じ正規変数で分散 $v$ とすると、対角分散は両端で等しいのに非対角共分散は異なります。この違いこそ次の公式が検出します。
<!-- definition-example-end -->

<a id="thm-sg2-interpolation"></a>

<!-- formal-statement-start -->
> **定理（Gaussian補間の微分公式）**  
> [平方根補間](#def-sg2-interpolation)の条件で $0<t<1$ とし、$D_{\sigma\tau}=C^X_{\sigma\tau}-C^Y_{\sigma\tau}$ と置く。各 $t$ でのGibbs重み $w_t$ を用いると

$$
\Phi'(t)=\frac{\beta^2}{2N}
\mathbb E\left[
\sum_\sigma w_t(\sigma)D_{\sigma\sigma}
-\sum_{\sigma,\tau}w_t(\sigma)w_t(\tau)D_{\sigma\tau}
\right].
$$

> 従って $\Phi(1)-\Phi(0)=\int_0^1\Phi'(t)\,dt$ が成立する（端点の導関数は片側極限で扱う）。
<!-- formal-statement-end -->

### 証明の見取り図

$\sqrt t$ を微分した $1/(2\sqrt t)$ は一見特異ですが、[Gaussian部分積分](#prop-sg2-correlated-ibp)で $X_\sigma$ に対する期待値を微分へ変えると、もう一つの $\sqrt t$ が現れ打ち消し合います。Gibbs重みの微分には[対角項と二レプリカ項](#prop-sg2-gibbs-derivatives)があるため、共分散差の二種類の平均が残ります。

<!-- proof-start -->
### 証明

任意の $0<\delta<1/2$ と $t\in[\delta,1-\delta]$ に対して、Gibbs重みの非負性と総和1から

$$
\begin{aligned}
\left|\partial_t\left(\frac1N\log Z_t\right)\right|
&=\left|\frac{\beta}{2N}\sum_\sigma w_t(\sigma)
\left(\frac{X_\sigma}{\sqrt t}-\frac{Y_\sigma}{\sqrt{1-t}}\right)\right|\\
&\le\frac{\beta}{2N\sqrt\delta}
\left(\max_\sigma|X_\sigma|+\max_\sigma|Y_\sigma|\right)
\end{aligned}
$$

です。配置集合は有限でGaussianの一次絶対モーメントは有限なので、右辺は可積分です。この上界による優収束から $0<t<1$ で期待値と微分を交換できます。$w_t(\sigma)=e^{\beta H_t(\sigma)+h_\sigma}/Z_t$ として連鎖律を使うと

$$
\begin{aligned}
\Phi'(t)
&=\frac\beta N\mathbb E\sum_\sigma
 w_t(\sigma)\partial_tH_t(\sigma)\\
&=\frac\beta{2N}\sum_\sigma\left[
 \frac{\mathbb E[X_\sigma w_t(\sigma)]}{\sqrt t}
-\frac{\mathbb E[Y_\sigma w_t(\sigma)]}{\sqrt{1-t}}
\right].
\end{aligned}
$$

$Y$ を固定して $X$ に[Gaussian部分積分](#prop-sg2-correlated-ibp)を適用します。連鎖律では $\partial_{X_\tau}H_t(\rho)=\sqrt t\,\mathbf1_{\{\tau=\rho\}}$ です。従って

$$
\begin{aligned}
\mathbb E[X_\sigma w_t(\sigma)]
&=\sum_\tau C^X_{\sigma\tau}
 \mathbb E[\partial_{X_\tau}w_t(\sigma)]\\
&=\beta\sqrt t\sum_\tau C^X_{\sigma\tau}
 \mathbb E[w_t(\sigma)(\mathbf1_{\{\sigma=\tau\}}-w_t(\tau))].
\end{aligned}
$$

同じ操作を $X$ を固定した $Y$ に行うと

$$
\mathbb E[Y_\sigma w_t(\sigma)]
=\beta\sqrt{1-t}\sum_\tau C^Y_{\sigma\tau}
\mathbb E[w_t(\sigma)(\mathbf1_{\{\sigma=\tau\}}-w_t(\tau))].
$$

両式を最初の $\Phi'(t)$ に代入すると平方根が消え、

$$
\Phi'(t)
=\frac{\beta^2}{2N}\sum_{\sigma,\tau}
 D_{\sigma\tau}\,
 \mathbb E[w_t(\sigma)(\mathbf1_{\{\sigma=\tau\}}-w_t(\tau))].
$$

$\tau=\sigma$ の指示変数項を一度和から取り出すと定理の式です。$\Phi(t)$ は共分散 $C_t$ に連続に依存し、導関数の絶対値は

$$
|\Phi'(t)|\le\frac{\beta^2}{2N}
\left(\max_\sigma|D_{\sigma\sigma}|+
\max_{\sigma,\tau}|D_{\sigma\tau}|\right)
$$

で一様に有界です。さらに任意の有限個の実数列 $(a_\sigma),(b_\sigma)$ に対して

$$
\left|\log\sum_\sigma e^{a_\sigma}
-\log\sum_\sigma e^{b_\sigma}\right|
\le\max_\sigma|a_\sigma-b_\sigma|
$$

が成立します。実際、次の値を置きます。

$$
d=\max_\sigma|a_\sigma-b_\sigma|.
$$

各 $\sigma$ で $|a_\sigma-b_\sigma|\le d$ だから、

$$
e^{-d}e^{b_\sigma}\le e^{a_\sigma}\le e^d e^{b_\sigma}
$$

が成り立ちます。両側で和を取り、対数を使えば上の不等式が従います。

これを $a_\sigma=\beta H_t(\sigma)+h_\sigma$、$b_\sigma=\beta H_{t_0}(\sigma)+h_\sigma$ に適用します。平方根の連続性とGaussian場の有限な一次絶対モーメントから、$\Phi(t)$ は端点を含め連続です。

また各 $w_t(\sigma)$ は $t$ で連続かつ $0\le w_t(\sigma)\le1$ なので、補間公式の右辺に優収束を適用すれば $\Phi'$ も $0<t<1$ で連続です。

従って区間 $[\varepsilon,1-\varepsilon]$ で [微積分学の基本定理II](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2) を適用します。導関数の一様有界性と端点連続性により、$\varepsilon\downarrow0$ として $\Phi(1)-\Phi(0)=\int_0^1\Phi'(t)\,dt$ を得ます。
<!-- proof-end -->

<a id="cor-sg2-comparison"></a>

<!-- formal-statement-start -->
> **系（等分散Gaussian場の圧力比較）**  
> [補間定理](#thm-sg2-interpolation)の条件に加え、全配置で $C^X_{\sigma\sigma}=C^Y_{\sigma\sigma}$、全配置対で $C^X_{\sigma\tau}\ge C^Y_{\sigma\tau}$ とする。このとき

$$
\frac1N\mathbb E\log Z_X
\le\frac1N\mathbb E\log Z_Y.
$$

> 不等式の向きは、**同じ分散で配置間の相関を増やすとquenched圧力が下がる**ことを表す。対角分散が等しいという仮定は省略できない。
<!-- formal-statement-end -->

### 証明の見取り図

対角項が消え、残るのは符号を判定できる二レプリカ平均だけです。共分散の大小を対角成分まで無条件に比較しても、この符号は得られません。

<!-- proof-start -->
### 証明

対角一致から $D_{\sigma\sigma}=0$。非対角も含めて $D_{\sigma\tau}\ge0$ なので、[補間微分公式](#thm-sg2-interpolation)より

$$
\Phi'(t)=-\frac{\beta^2}{2N}
\sum_{\sigma,\tau}D_{\sigma\tau}\,
 \mathbb E[w_t(\sigma)w_t(\tau)]\le0.
$$

$w_t(\sigma)w_t(\tau)\ge0$ を使いました。$t=0$ が $Y$、$t=1$ が $X$ ですから、積分して $\Phi(1)\le\Phi(0)$ です。
<!-- proof-end -->

この系の具体例として、二配置の独立な正規場 $U_1,U_2\sim N(0,v)$ と、共通場 $V_1=V_2=G\sim N(0,v)$ を比べます。$X=V$、$Y=U$ とすれば対角は共に $v$、非対角は $v\ge0$ で、$\mathbb E\log(e^{\beta V_1}+e^{\beta V_2})=\log2$。一方、独立場では

$$
\begin{aligned}
\log(e^{\beta U_1}+e^{\beta U_2})
&=\log2+\frac{\beta(U_1+U_2)}2
+\log\cosh\frac{\beta(U_1-U_2)}2,\\
\mathbb E\log(e^{\beta U_1}+e^{\beta U_2})
&=\log2+\mathbb E\log\cosh
\frac{\beta(U_1-U_2)}2>\log2
\end{aligned}
$$

となります。最後の厳密不等号には $\beta,v>0$ と、$U_1-U_2$ が非退化正規変数であることを使いました。相関の向きと圧力の向きが一致します。

## 5. 道具を接続する：相関するREM型の補間

$M=2^N$ 個の独立な $N(0,N)$ の無秩序を $U_\sigma$、さらに独立な $G\sim N(0,N)$ を一つ取ります。$0\le s\le1$ で

$$
X_\sigma^{(s)}=\sqrt{1-s}\,U_\sigma+\sqrt s\,G
$$

とします。各配置の分散はすべて $N$ ですが、異なる二配置の共分散は $Ns$ です。$s=0$ は[SG1のREM](../SG1/index.md#def-sg1-rem)と同じ共分散構造、$s=1$ は全配置が同じ無秩序で動く端点です。

<a id="prop-sg2-common-noise"></a>

<!-- formal-statement-start -->
> **命題（共通Gaussian無秩序による圧力低下）**  
> 上の場で $h_\sigma=0$、$\beta\ge0$ とし

$$
p_N(s)=\frac1N\mathbb E\log
 \sum_{\sigma\in\{-1,1\}^N}e^{\beta X_\sigma^{(s)}}
$$

> と置く。$0<s<1$ では

$$
p_N'(s)=-\frac{\beta^2}{2}\,
\mathbb E\left[
1-\sum_\sigma w_s(\sigma)^2\right]\le0.
$$

> さらに任意の $s\in[0,1]$ で

$$
p_N(s)=p_N(0;\beta\sqrt{1-s}),
\qquad
p_N(1)=\log2,
$$

> ここで $p_N(0;\gamma)$ は独立なREM型場 $U_\sigma$ の逆温度 $\gamma$ におけるquenched圧力である。
<!-- formal-statement-end -->

### 証明の見取り図

補間公式に代入する共分散差は $N(1-\mathbf1_{\{\sigma=\tau\}})$ です。他方、同じGaussian変数 $G$ に由来する項は全Boltzmann重みに共通の因子なので、対数の外へ取り出せます。この二通りの計算が一致することを確かめます。

<!-- proof-start -->
### 証明

[Gaussian補間の定義](#def-sg2-interpolation)で $X_\sigma=G$（全配置共通）、$Y_\sigma=U_\sigma$ とします。差の共分散は $D_{\sigma\sigma}=0$、$\sigma\ne\tau$ なら $D_{\sigma\tau}=N$。よって[微分公式](#thm-sg2-interpolation)から

$$
\begin{aligned}
p_N'(s)
&=-\frac{\beta^2}{2N}\mathbb E
 \sum_{\sigma,\tau}w_s(\sigma)w_s(\tau)
 N(1-\mathbf1_{\{\sigma=\tau\}})\\
&=-\frac{\beta^2}{2}\mathbb E
 \left[\left(\sum_\sigma w_s(\sigma)\right)^2-
 \sum_\sigma w_s(\sigma)^2\right].
\end{aligned}
$$

括弧の最初の和は1なので、微分公式を得ます。

一方、分配関数の各項から $e^{\beta\sqrt s\,G}$ をくくると

$$
\begin{aligned}
\log Z_s
&=\log\left(e^{\beta\sqrt s\,G}
 \sum_\sigma e^{\beta\sqrt{1-s}\,U_\sigma}\right)\\
&=\beta\sqrt s\,G+
 \log\sum_\sigma e^{\beta\sqrt{1-s}\,U_\sigma}.
\end{aligned}
$$

$\mathbb EG=0$ なので期待値を取れば $p_N(s)=p_N(0;\beta\sqrt{1-s})$ です。$s=1$ では残った和が $2^N$ となり、$p_N(1)=N^{-1}\log 2^N=\log2$ です。
<!-- proof-end -->

[SG1のREM圧力極限定理](../SG1/index.md#thm-sg1-pressure)を $\gamma=\beta\sqrt{1-s}$ に適用すると、$s$ を固定したとき

$$
\lim_{N\to\infty}p_N(s)
=\begin{cases}
\log2+\frac{\beta^2(1-s)}2,
&\beta\sqrt{1-s}\le\sqrt{2\log2},\\
\beta\sqrt{(1-s)\,2\log2},
&\beta\sqrt{1-s}\ge\sqrt{2\log2}.
\end{cases}
$$

この式は有限 $N$ の微分を極限と交換して得たものではなく、先に有限 $N$ の恒等式を証明してからSG1の極限定理を適用した結果です。

**SG3への準備**：SK模型では典型的に $C_{\sigma\tau}$ を配置の重なりの関数として書きます。そのとき[二レプリカ平均](#def-sg2-replica)が「二つの配置の重なりを平均する」操作へ変わります。相関のあるエネルギー帯を独立な帯として数える代わりに、[この章で導いたGaussian補間微分公式](#thm-sg2-interpolation)と共分散を使います。

## 演習問題

### Level A：式を自分で動かす

**SG2-A1（共分散行列の構成）**
- Level: A

独立な標準正規変数 $G_0,G_1,G_2$ と $a,b>0$ に対して $X_1=aG_0+bG_1$、$X_2=aG_0+bG_2$ と置く。共分散行列を求め、非負定値性を直接示せ。$b=0$ の場合も説明せよ。

<!-- solution-start -->
**詳細解答**

$\mathbb EG_iG_j=\mathbf1_{\{i=j\}}$ なので

$$
C=\begin{pmatrix}a^2+b^2&a^2\\a^2&a^2+b^2\end{pmatrix}.
$$

任意の $(u,v)\in\mathbb R^2$ について

$$
(u,v)C(u,v)^\mathsf T
=a^2(u+v)^2+b^2(u^2+v^2)\ge0.
$$

$b=0$ では $(1,-1)C(1,-1)^\mathsf T=0$ となり、行列は特異です。それでも $X_1=X_2=aG_0$ は正規ベクトルで、[部分積分補題](#prop-sg2-correlated-ibp)は特異共分散にも適用できます。
<!-- solution-end -->

**SG2-A2（Gaussian部分積分で二次モーメント）**
- Level: A

$X\sim N(0,v)$（$v>0$）について[部分積分](#prop-sg2-correlated-ibp)を $F(x)=x^3$ に適用し、$\mathbb EX^4$ を求めよ。

<!-- solution-start -->
**詳細解答**

$F'(x)=3x^2$ であり、多項式増大条件を満たします。よって

$$
\mathbb EX^4=v\mathbb E[3X^2]
=3v\mathbb EX^2=3v^2.
$$

最後に $\mathbb EX^2=v$ は分散の定義を使いました。正規密度の四重積分を直接計算する必要はありません。
<!-- solution-end -->

**SG2-A3（Gibbs重みの導関数）**
- Level: A

二配置の $Z=e^{\beta x_1}+e^{\beta x_2}$（$\beta>0$）で $w_1=e^{\beta x_1}/Z$ とする。$\partial_{x_1}w_1$ と $\partial_{x_2}w_1$ を求め、和が0であることを確認せよ。

<!-- solution-start -->
**詳細解答**

[重みの微分公式](#prop-sg2-gibbs-derivatives)に $\sigma=1$ を代入します。$w_1+w_2=1$ なので

$$
\partial_{x_1}w_1=\beta w_1(1-w_1)=\beta w_1w_2,
\qquad
\partial_{x_2}w_1=-\beta w_1w_2.
$$

和は0です。二つの $x_i$ を同時に同量だけ増やしても共通因子が分母分子で消え、重みが不変になることと一致します。
<!-- solution-end -->

**SG2-A4（Lipschitz定数と尾確率）**
- Level: A

独立な標準正規 $G_1,G_2$ に対し $f(g_1,g_2)=(g_1+g_2)/2$ とする。最良Lipschitz定数を求め、Gaussian集中定理で $\mathbb P(|f(G)|\ge u)$ の上界を示せ。

<!-- solution-start -->
**詳細解答**

$\nabla f=(1/2,1/2)$ より勾配ノルムは $1/\sqrt2$ です。$(1,1)$ 方向の増分でこの比が実現するため最良値です。$\mathbb Ef(G)=0$ であり、[集中定理](../../../解析系/HDP/HDP5/index.md#thm-hdp5-gaussian-concentration)に $L^2=1/2$ を代入すると

$$
\mathbb P(|f(G)|\ge u)
\le2\exp\left(-\frac{u^2}{2(1/2)}\right)
=2e^{-u^2}.
$$

実際の分散も $1/2$ です。ただし集中定理は密度を直接計算しなくても適用できます。
<!-- solution-end -->

### Level B：仮定の意味と比較

**SG2-B1（相関を強めた二配置）**
- Level: B

$U_1,U_2$ は独立な $N(0,v)$、$V_1=V_2=G\sim N(0,v)$ とし、$v,\beta>0$。$\mathbb E\log(e^{\beta U_1}+e^{\beta U_2})>\mathbb E\log(e^{\beta V_1}+e^{\beta V_2})$ を、(i)補間の符号、(ii)直接計算の二通りで示せ。

<!-- solution-start -->
**詳細解答**

(i) $X=V,Y=U$ と置くと対角の差は0、非対角の差は $v>0$。[比較系](#cor-sg2-comparison)で共通場側が以下です。さらに各 $t\in(0,1)$ で $w_t(1)w_t(2)>0$ なので、[微分公式](#thm-sg2-interpolation)の非対角和は正、従って $\Phi'(t)<0$ です。よって端点でも厳密不等式となります。

(ii) 共通場では $\log Z_V=\log2+\beta G$ なので期待値は $\log2$。独立場では恒等式

$$
e^{\beta U_1}+e^{\beta U_2}
=2e^{\beta(U_1+U_2)/2}
 \cosh\frac{\beta(U_1-U_2)}2
$$

に対数を取って期待値を取ると、平均0の線形項が消えて

$$
\mathbb E\log Z_U
=\log2+\mathbb E\log\cosh\frac{\beta(U_1-U_2)}2.
$$

非退化正規変数 $U_1-U_2$ は0でない確率が1で、$\log\cosh z>0$ は $z\ne0$ で成り立つため差は正です。
<!-- solution-end -->

**SG2-B2（相関Gaussian場の自己平均化）**
- Level: B

$\Omega_N$ は任意の有限集合とし、$X$ は平均0のGaussian場で $C_{\sigma\sigma}\le3N$ とする。固定した $h_\sigma$ と $\beta=2$ の圧力 $F_X=N^{-1}\log\sum_\sigma e^{2X_\sigma+h_\sigma}$ について、$|F_X-\mathbb EF_X|\ge\varepsilon$ の確率上界を求めよ。$\mathbb EF_X$ の収束も示したことになるか。

<!-- solution-start -->
**詳細解答**

[圧力集中の系](#cor-sg2-pressure-concentration)で $v=3$、$\beta=2$ と置きます。$2\beta^2v=2\cdot4\cdot3=24$ なので

$$
\mathbb P(|F_X-\mathbb EF_X|\ge\varepsilon)
\le2\exp(-N\varepsilon^2/24).
$$

固定した $\varepsilon>0$ なら右辺は0に収束します。しかし平均値 $\mathbb EF_X$ 自体が $N$ ごとに振動する可能性は、この不等式から排除できません。従って極限の存在は別の論証が必要です。
<!-- solution-end -->

**SG2-B3（等分散条件を落とすと）**
- Level: B

(a) 一配置 $\Omega=\{1\}$、$N=1$、$h_1=0$、$\beta>0$ で $X\sim N(0,4)$、$Y\sim N(0,1)$ とする。共分散は $C^X>C^Y$ だがquenched圧力が等しい理由を、補間微分公式の対角項と二レプリカ項から説明せよ。

(b) 次に二配置 $\Omega=\{1,2\}$、$N=1$、$h_1=h_2=0$、$\beta>0$ とする。

$X_1,X_2$ を互いに独立な $N(0,4)$、$Y_1,Y_2$ を互いに独立な $N(0,1)$ とし、$X$ と $Y$ も独立に取る。

全配置対で $C^X_{\sigma\tau}\ge C^Y_{\sigma\tau}$ が成立するにもかかわらず、[等分散場の比較系](#cor-sg2-comparison)の結論とは逆に $\mathbb E\log Z_X>\mathbb E\log Z_Y$ となることを、補間微分公式から示せ。どの仮定が失われ、どの項の符号判定が壊れたか説明せよ。

<!-- solution-start -->
**詳細解答**

(a) 一配置では $Z_X=e^{\beta X}$ なので $\mathbb E\log Z_X=\beta\mathbb EX=0$ です。$Y$ でも同様に期待値は $0$ です。差は $D_{11}=4-1=3$、Gibbs重みは恒等的に $w_t(1)=1$ であり、[補間微分公式](#thm-sg2-interpolation)の括弧内は

$$
w_t(1)D_{11}-w_t(1)^2D_{11}
=3-3=0.
$$

つまり、対角共分散が違っても対角項と二レプリカ項が正確に打ち消し合う場合があります。この一配置例だけでは、比較系の不等式が逆転するとは結論できません。

(b) 独立性から共分散行列と差は

$$
C^X=4I_2,\qquad C^Y=I_2,\qquad
D=C^X-C^Y=3I_2
$$

です。対角では $D_{11}=D_{22}=3>0$、非対角では $D_{12}=D_{21}=0$ なので、すべての成分で $C^X_{\sigma\tau}\ge C^Y_{\sigma\tau}$ が成立します。

[平方根補間](#def-sg2-interpolation)では $t=1$ が $X$、$t=0$ が $Y$ です。[補間微分公式](#thm-sg2-interpolation)へ $D=3I_2$、$N=1$ を代入すると

$$
\begin{aligned}
\Phi'(t)
&=\frac{\beta^2}{2}\mathbb E\left[
3\bigl(w_t(1)+w_t(2)\bigr)
-3\bigl(w_t(1)^2+w_t(2)^2\bigr)\right]\\
&=\frac{3\beta^2}{2}\mathbb E\left[
1-\bigl(w_t(1)^2+w_t(2)^2\bigr)\right]\\
&=3\beta^2\mathbb E[w_t(1)w_t(2)]>0.
\end{aligned}
$$

最後から二番目の等号には $w_t(1)+w_t(2)=1$ と

$$
1-\bigl(w_t(1)^2+w_t(2)^2\bigr)
=2w_t(1)w_t(2)
$$

を使いました。$\beta>0$、配置は二つで各指数重みは正なので、すべての有限なGaussian入力で $w_t(1)w_t(2)>0$ です。従って $0<t<1$ で $\Phi'(t)>0$ となり、

$$
\mathbb E\log Z_X-\mathbb E\log Z_Y
=\Phi(1)-\Phi(0)
=\int_0^1\Phi'(t)\,dt>0.
$$

比較系では**等分散**によって $D_{\sigma\sigma}=0$ とし、対角項を消す必要がありました。ここでは対角差 $3$ が残り、対角項が二レプリカ項を上回るため、比較不等式の向きが逆転します。
<!-- solution-end -->

### Level C：三つの道具を統合する

**SG2-C1（共通ノイズでREMを補間する）**
- Level: C

$N\ge1$、$\beta>0$ とする。$2^N$ 個の独立な $U_\sigma\sim N(0,N)$ と、それらと独立な $G\sim N(0,N)$ を取り、$X_\sigma^{(s)}=\sqrt{1-s}\,U_\sigma+\sqrt s\,G$（$0\le s\le1$）とする。(a)共分散、(b)有限 $N$ の $p_N'(s)$ の符号と端点、(c)固定した $s$ での極限圧力、(d)試料圧力の集中を導け。最後に、(c)の導出では微分と極限を交換したかどうか述べよ。

<!-- solution-start -->
**詳細解答**

(a) 独立性と中心化から

$$
\mathbb E[X_\sigma^{(s)}X_\tau^{(s)}]
=(1-s)N\mathbf1_{\{\sigma=\tau\}}+sN.
$$

特に対角は $N$、非対角は $Ns$ です。

(b) $X=G$（全配置で同じ）、$Y=U$ として[補間微分公式](#thm-sg2-interpolation)に代入します。差は $D_{\sigma\tau}=N(1-\mathbf1_{\{\sigma=\tau\}})$ なので、対角項0から

$$
p_N'(s)=-\frac{\beta^2}2\mathbb E
\sum_{\sigma,\tau}w_s(\sigma)w_s(\tau)
 (1-\mathbf1_{\{\sigma=\tau\}})
=-\frac{\beta^2}2\mathbb E\left(1-\sum_\sigma w_s(\sigma)^2\right).
$$

有限温度では全 $2^N\ge2$ 個の重みが正なので $\sum_\sigma w_s(\sigma)^2<1$。従って $0<s<1$ で $p_N'(s)<0$ です。$s=1$ では全配置の重みが共通で $Z_1=2^N e^{\beta G}$ となり $p_N(1)=\log2$。$s=0$ はREMのquenched圧力です。

(c) 共通因子をくくる計算は

$$
\frac1N\mathbb E\log Z_s
=\frac1N\mathbb E\left[
\beta\sqrt s\,G+\log\sum_\sigma
 e^{\beta\sqrt{1-s}\,U_\sigma}\right]
=p_N(0;\beta\sqrt{1-s}).
$$

ここで $\mathbb EG=0$ を使いました。[SG1の極限定理](../SG1/index.md#thm-sg1-pressure)に $\gamma=\beta\sqrt{1-s}$ を代入し、$a=\sqrt{2\log2}$ と書くと

$$
\lim_{N\to\infty}p_N(s)
=\begin{cases}
\log2+\gamma^2/2,&0\le\gamma\le a,\\
a\gamma,&\gamma\ge a.
\end{cases}
$$

(b)の補間微分式は、(c)の有限 $N$ の恒等式からも独立に検算できます。$\gamma=\beta\sqrt{1-s}$ と置き、独立な $U_\sigma$ だけを使う圧力を $q_N(\gamma)=p_N(0;\gamma)$、対応するGibbs重みを $v_\gamma(\sigma)$ と書きます。このとき

$$
\left|\partial_\gamma\log\sum_\sigma e^{\gamma U_\sigma}\right|
=\left|\sum_\sigma v_\gamma(\sigma)U_\sigma\right|
\le\max_\sigma|U_\sigma|
$$

であり、右辺は有限個のGaussian変数の最大値として可積分です。従って期待値と $\gamma$ による微分を交換できます。[共分散付きGaussian部分積分](#prop-sg2-correlated-ibp)と[Gibbs重みの微分](#prop-sg2-gibbs-derivatives)から

$$
\begin{aligned}
q_N'(\gamma)
&=\frac1N\sum_\sigma\mathbb E[U_\sigma v_\gamma(\sigma)]\\
&=\frac1N\sum_\sigma N\gamma\,
 \mathbb E[v_\gamma(\sigma)(1-v_\gamma(\sigma))]\\
&=\gamma\,\mathbb E\left[1-\sum_\sigma v_\gamma(\sigma)^2\right].
\end{aligned}
$$

共通因子 $e^{\beta\sqrt s\,G}$ がGibbs重みから消えるため $v_\gamma(\sigma)=w_s(\sigma)$ です。また $d\gamma/ds=-\beta/(2\sqrt{1-s})$ なので、連鎖律から

$$
p_N'(s)=q_N'(\gamma)\frac{d\gamma}{ds}
=-\frac{\beta^2}{2}\mathbb E\left[1-\sum_\sigma w_s(\sigma)^2\right].
$$

これは共分散差を使った(b)の導出と一致します。

(d) (a)により全配置で $C_{\sigma\sigma}=N$ です。[圧力集中の系](#cor-sg2-pressure-concentration)に $v=1$ を代入すると

$$
\mathbb P\left(
\left|\frac1N\log Z_s-p_N(s)\right|\ge u
\right)\le2e^{-Nu^2/(2\beta^2)}.
$$

したがって固定 $s$ の試料圧力は (c) の極限値へ確率収束します。証明したのは「有限 $N$ の恒等式 → 既知のREM極限 → 集中」の順序であり、$p_N'(s)$ の極限と $p_N(s)$ の極限の微分の交換は使っていません。
<!-- solution-end -->
