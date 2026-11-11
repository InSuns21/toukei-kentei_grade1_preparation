# INV6 正則化の収束速度をどう求めるか

<!-- definition-example-audit: strict -->

[INV5のフィルタ収束定理](../INV5/index.md#thm-inv5-filter-convergence)では、ノイズ水準 $\delta$ と正則化パラメータ $\alpha$ をともに小さくすれば、Tikhonov解が最小ノルム解へ近づくことを示しました。しかし、その証明は「いつか近づく」ことしか教えません。誤差を半分にするにはノイズをどれだけ減らす必要があるのでしょうか。

この問いには、真の解が不安定な特異方向へどれだけ成分を持つかという追加情報が必要です。本章では、**観測ノイズの増幅**と**正則化が真の信号を削る量**を別々に計算し、追加仮定から収束の速さを取り出します。次講で扱う、観測データからパラメータを選ぶ方法とは区別して、ここではノイズ水準と解についての事前情報を使います。

以下では実 Hilbert 空間 $X,Y$ とコンパクト線形作用素 $A:X\to Y$ を固定します。

[完全特異系](../INV3/index.md#def-inv3-singular-system)を $(\sigma_j,u_j,v_j)_{j\in J}$ とします。添字集合 $J$ は有限または可算で、各特異値は $\sigma_j>0$ です。

正確なデータ $y\in\mathcal D(A^\dagger)$ に対し、[最小ノルム解](../INV4/index.md#def-inv4-pseudoinverse-domain)を $x^\dagger=A^\dagger y$ とします。この解は $(\ker A)^\perp$ に属します。ノイズを含むデータ $y^\delta\in Y$ は、次の誤差条件を満たすとします。

$$
\|y^\delta-y\|_Y\le\delta
$$

$T=A^*A:X\to X$ は、[Hilbert随伴](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)により有界・自己共役・非負で、$Tv_j=\sigma_j^2v_j$、$\ker T=\ker A$ です。ここでは特異値の**二乗** $\lambda_j=\sigma_j^2$ を使うと計算が短くなります。

## 1. 誤差を二つの原因へ分ける

観測値を正確な $y$ から $y^\delta$ に替えたために生じる違いと、正確な $y$ を使っても生じる違いを区別します。$R_\alpha^{\mathrm K}=(T+\alpha I)^{-1}A^*$ は[INV5のTikhonov正則化作用素](../INV5/index.md#thm-inv5-tikhonov-minimizer)です。

<a id="def-inv6-noise-bias"></a>

<!-- formal-statement-start -->
> **定義（正則化のノイズ誤差とバイアス）**
> 実 Hilbert 空間間の有界線形作用素 $A:X\to Y$、$y\in\mathcal D(A^\dagger)$、$x^\dagger=A^\dagger y$、$\alpha>0$ および $y^\delta\in Y$ に対し、Tikhonov正則化の**ノイズ誤差**と**バイアス**をそれぞれ

$$
E_{\mathrm{noise}}(\alpha,\delta;y^\delta,y)
=\|R_\alpha^{\mathrm K}(y^\delta-y)\|_X,
\qquad
E_{\mathrm{bias}}(\alpha;y)
=\|R_\alpha^{\mathrm K}y-x^\dagger\|_X
$$

> とする。ノイズ誤差は実際の摂動に依存する量であり、$\delta$ はその上界の情報である。
<!-- formal-statement-end -->

復元誤差の**ベクトル**を足し算に分けると、

$$
R_\alpha^{\mathrm K}y^\delta-x^\dagger
=R_\alpha^{\mathrm K}(y^\delta-y)
+(R_\alpha^{\mathrm K}y-x^\dagger).
$$

したがって[INV4の誤差分解](../INV4/index.md#thm-inv4-error-splitting)と[INV5の作用素ノルム評価](../INV5/index.md#thm-inv5-spectral-filters)から

$$
\|R_\alpha^{\mathrm K}y^\delta-x^\dagger\|_X
\le E_{\mathrm{noise}}+E_{\mathrm{bias}}
\le \frac{\delta}{2\sqrt{\alpha}}+E_{\mathrm{bias}}.
$$

ここで二項の**和は上界**であり、誤差ノルムが常に二項の和に等しいという主張ではありません。二つの誤差ベクトルが逆向きなら打ち消しも起こります。

<!-- definition-example-start: def-inv6-noise-bias -->
### 例：二方向のノイズと削られる信号

**定義の確認**：ノイズを復元する成分と、正確な観測からも残る成分をそれぞれ計算し、二項の意味を確かめます。

$X=Y=\mathbb R^2$、$A=\operatorname{diag}(1,1/2)$、$x^\dagger=(2,2)$、$y=Ax^\dagger=(2,1)$ とします。$A$ は可逆で $y\in\mathcal D(A^\dagger)$、$x^\dagger=A^\dagger y$ です。$\alpha=1/4$、$y^\delta=(2,1+\varepsilon)$ なら $\|y^\delta-y\|=|\varepsilon|$ です。

[Tikhonovの特異値フィルタ](../INV5/index.md#thm-inv5-spectral-filters)は $s/(s^2+\alpha)$ を各データ成分へ掛けます。二つの倍率は $4/5$ と $1$ なので、

$$
\begin{aligned}
R_{1/4}^{\mathrm K}y&=(8/5,1),\\
R_{1/4}^{\mathrm K}(y^\delta-y)&=(0,\varepsilon),\\
R_{1/4}^{\mathrm K}y-x^\dagger&=(-2/5,-1).
\end{aligned}
$$

定義の二項は $E_{\mathrm{noise}}=|\varepsilon|$、$E_{\mathrm{bias}}=\sqrt{29}/5$ です。実際の誤差は $(-2/5,-1+\varepsilon)$ であり、そのノルムは一般に二項の和とは異なります。**ノイズがないときにも復元が完全ではない**という点がバイアスの意味です。
<!-- definition-example-end -->

## 2. 真の解の「滑らかさ」を特異方向で表す

バイアスは[INV5の級数表示](../INV5/index.md#thm-inv5-filter-convergence)から

$$
E_{\mathrm{bias}}^2
=\sum_{j\in J}
\left(\frac{\alpha}{\lambda_j+\alpha}\right)^2
|\langle x^\dagger,v_j\rangle_X|^2.
$$

$\lambda_j$ が極めて小さい方向では、係数 $\alpha/(\lambda_j+\alpha)$ は $1$ に近くなります。そこで小さい $\lambda_j$ に対応する真の解の成分自体が小さい、という条件を加えます。

まず、作用素 $T=A^*A$ の**分数冪**を特異方向ごとに定めます。$\nu>0$ に対し、$w\in X$ を $w=w_0+\sum_jw_jv_j$（$w_0\in\ker A$、$w_j=\langle w,v_j\rangle_X$）と展開し、

$$
T^\nu w=\sum_{j\in J}\lambda_j^\nu w_jv_j,
\qquad T^\nu w_0=0
$$

とします。$\lambda_j\le\|A\|^2$ なので

$$
\|T^\nu w\|_X^2
=\sum_j\lambda_j^{2\nu}|w_j|^2
\le\|A\|^{4\nu}\sum_j|w_j|^2
\le\|A\|^{4\nu}\|w\|_X^2.
$$

従って級数は収束し、$T^\nu$ は $X$ 全体で定義される有界作用素です。$\nu=1$ なら通常の $T$ と一致します。$A=0$ の場合、和は空で $T^\nu=0$ です。

<a id="def-inv6-source-condition"></a>

<!-- formal-statement-start -->
> **定義（分数冪によるsource condition）**
> 実 Hilbert 空間間のコンパクト線形作用素 $A:X\to Y$ と、その最小ノルム解 $x^\dagger\in(\ker A)^\perp$ に対し、$\nu>0$ を固定する。$T=A^*A$ の上記の分数冪を用い、ある $w\in X$ が存在して

$$
x^\dagger=T^\nu w
$$

> と表せるとき、$x^\dagger$ は**指数 $\nu$ のsource condition（源泉条件）**を満たすという。以下では、その表現に用いた $w$ のノルムを $M=\|w\|_X$ と書く。
<!-- formal-statement-end -->

この条件は「$x^\dagger$ は $A$ がほとんど観測できない方向へ強く偏らない」という意味です。実際、各 $j$ で

$$
x_j^\dagger=\langle x^\dagger,v_j\rangle_X
=\lambda_j^\nu w_j,
\qquad
\sum_j|w_j|^2\le\|w\|_X^2.
$$

$\ker A$ 方向の $w_0$ は $T^\nu$ で消えるため、表現する $w$ は一般には一意でありません。必要なら $w_0=0$ として最小ノルムの表現を選べます。条件が成立するかどうかは、$x^\dagger$ の成分を $\lambda_j^\nu$ で割った列が二乗総和可能かで判定できます。

<!-- definition-example-start: def-inv6-source-condition -->
### 例：二次元の非零特異方向と核方向を分ける

**定義の確認**：作用素の正固有方向では $\lambda^\nu$ を掛け、核方向は零になることを直接確かめます。

$A=\operatorname{diag}(1,1/2,0):\mathbb R^3\to\mathbb R^3$ とすると、標準基底が特異方向で $T=A^*A=\operatorname{diag}(1,1/4,0)$ です。各標準基底への作用を分数冪の定義に代入するため、

$$
T^{1/2}=\operatorname{diag}(1,1/2,0).
$$

$w=(2,4,7)$ を選べば $T^{1/2}w=(2,2,0)=x^\dagger$ で、$\nu=1/2$ の条件を確認できました。$Ax^\dagger=(2,1,0)$ は値域に属し、$x^\dagger\perp\ker A=\operatorname{span}\{e_3\}$ なので最小ノルム解でもあります。第三成分を $7$ から $0$ に替えた $w=(2,4,0)$ も同じ $x^\dagger$ を表し、その方がノルムが小さくなります。

逆に $(2,2,1)$ は核方向に成分を持つため、どんな $\nu>0$、$w$ を選んでも $T^\nu w$ にはなりません。最小ノルム解という仮定を外した一般の厳密解へ条件を無条件に適用できない理由です。
<!-- definition-example-end -->

### 例：無限次元では本当に制限が生まれる

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$ のとき、$T=D^*D$ は各座標に $1/n^2$ を掛けます。$w_n=1/n$ は $\ell^2$ に属し、

$$
x_n^\dagger=(T^\nu w)_n=\frac{1}{n^{2\nu+1}}
$$

は任意の $\nu>0$ でその指数の条件を満たします。一方、$x_n^\dagger=1/n$ に対し $w_n=n^{2\nu-1}$ が必要です。この $w$ が $\ell^2$ に属するのは $\nu<1/4$ の場合だけです（境界 $\nu=1/4$ では $\sum 1/n$ が発散します）。同じ逆問題でも真の解の特異方向の減衰によって利用できる指数が変わるのです。

## 3. Tikhonovのバイアスを $\alpha^\nu$ で抑える

真の解の各特異成分が $\lambda_j^\nu w_j$ であることを、バイアスの級数へ代入します。ここで **$0<\nu\le1$** が決定的な条件です。

<a id="thm-inv6-tikhonov-error"></a>

<!-- formal-statement-start -->
> **定理（Tikhonovのsource condition下での誤差上界）**
> 実 Hilbert 空間 $X,Y$、コンパクト線形作用素 $A:X\to Y$、$T=A^*A$、$\nu\in(0,1]$ を取る。$y\in\mathcal D(A^\dagger)$ の最小ノルム解が $x^\dagger=A^\dagger y=T^\nu w$（$w\in X$）を満たし、$\|y^\delta-y\|_Y\le\delta$ とする。このとき全ての $\alpha>0$ で

$$
\boxed{\;
\|R_\alpha^{\mathrm K}y^\delta-x^\dagger\|_X
\le \frac{\delta}{2\sqrt{\alpha}}+\alpha^\nu\|w\|_X.
\;}
$$

> 特に無雑音のバイアスは $\alpha^\nu\|w\|_X$ 以下である。
<!-- formal-statement-end -->

### 証明の見取り図

ノイズ項はINV5で既に評価しました。新しい部分は、各 $\lambda>0$ に対し

$$
\frac{\alpha\lambda^\nu}{\lambda+\alpha}
\le\alpha^\nu
\qquad(0<\nu\le1)
$$

を確かめ、特異系の二乗和へ適用するところです。$\lambda$ が $\alpha$ より小さいか大きいかを分けると、なぜ $\nu\le1$ かも見えます。

<!-- proof-start -->
### 証明

[Tikhonovフィルタ](../INV5/index.md#thm-inv5-spectral-filters)と $y_j=\sigma_jx_j^\dagger$ を使い、まず厳密データの復元値を計算します。各正の特異値方向で

$$
\begin{aligned}
\langle R_\alpha^{\mathrm K}y,v_j\rangle_X
&=\frac{\sigma_j}{\sigma_j^2+\alpha}\langle y,u_j\rangle_Y\\
&=\frac{\lambda_j}{\lambda_j+\alpha}x_j^\dagger.
\end{aligned}
$$

両辺を $x_j^\dagger=\lambda_j^\nu w_j$ と比較し、$x^\dagger$ と復元値がともに $(\ker A)^\perp$ に属することを使うと

$$
R_\alpha^{\mathrm K}y-x^\dagger
=-\sum_j\frac{\alpha\lambda_j^\nu}{\lambda_j+\alpha}w_jv_j.
$$

次に $\lambda>0$ を固定します。$0<\lambda\le\alpha$ なら分母が $\alpha$ 以上なので

$$
\frac{\alpha\lambda^\nu}{\lambda+\alpha}
\le\lambda^\nu\le\alpha^\nu.
$$

$\lambda\ge\alpha$ なら分母が $\lambda$ 以上なので

$$
\frac{\alpha\lambda^\nu}{\lambda+\alpha}
\le\alpha\lambda^{\nu-1}
\le\alpha\alpha^{\nu-1}
=\alpha^\nu.
$$

最後の不等式で $\nu-1\le0$ を用いました。$\lambda=0$ の核方向の係数は $T^\nu$ によって零です。従って正規直交系の二乗和から

$$
\begin{aligned}
\|R_\alpha^{\mathrm K}y-x^\dagger\|_X^2
&=\sum_j\left(\frac{\alpha\lambda_j^\nu}{\lambda_j+\alpha}\right)^2|w_j|^2\\
&\le\alpha^{2\nu}\sum_j|w_j|^2
\le\alpha^{2\nu}\|w\|_X^2.
\end{aligned}
$$

平方根を取り、[正則化のノイズ誤差とバイアス](#def-inv6-noise-bias)の分解と[作用素ノルム評価](../INV5/index.md#thm-inv5-spectral-filters)の $\|R_\alpha^{\mathrm K}\|\le1/(2\sqrt{\alpha})$ を適用して結論を得ます。$\square$
<!-- proof-end -->

ここでsource conditionは、ノイズ項には一切使われていません。$\delta/\sqrt\alpha$ は観測側の問題であり、$\alpha^\nu\|w\|$ は真の解についての情報です。二項を別々に抑えたことが、次の選択則を作ります。

## 4. 二つの誤差が釣り合うように選ぶ

上界の第一項は $\alpha$ を大きくすると下がり、第二項は逆に増えます。$M=\|w\|_X>0$ が既知の上界として利用できる場合（実際の $\|w\|$ でなく $M\ge\|w\|$ でもよい）、両項を同じ**次数**にできます。ここでは $\delta>0$ を仮定します。

<a id="thm-inv6-apriori-rate"></a>

<!-- formal-statement-start -->
> **定理（Tikhonovの事前パラメータと収束率）**
> 実 Hilbert 空間 $X,Y$、コンパクト線形作用素 $A:X\to Y$、$0<\nu\le1$、$x^\dagger=A^\dagger y=(A^*A)^\nu w$、$\|w\|_X\le M$（$M>0$）を仮定する。$\delta>0$、$\|y^\delta-y\|_Y\le\delta$ に対し

$$
\alpha(\delta)=\left(\frac{\delta}{M}\right)^{\frac{2}{2\nu+1}}
$$

> と選ぶと、全ての許容ノイズに一様に

$$
\boxed{\;
\|R_{\alpha(\delta)}^{\mathrm K}y^\delta-x^\dagger\|_X
\le\frac32 M^{\frac{1}{2\nu+1}}
\delta^{\frac{2\nu}{2\nu+1}}.
\;}
$$

> 従って $M,\nu$ を固定して $\delta\downarrow0$ とすれば、誤差は $O(\delta^{2\nu/(2\nu+1)})$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta/\sqrt{\alpha}$ と $M\alpha^\nu$ に同じ指数が現れるように $\sqrt\alpha$ の冪を合わせます。誤差上界の厳密な最小点を求める必要はなく、両項の釣り合う選択で収束率が分かります。

<!-- proof-start -->
### 証明

[source condition下の上界](#thm-inv6-tikhonov-error)で $\|w\|\le M$ とし、二項をそれぞれ計算します。まず

$$
\sqrt{\alpha(\delta)}
=\left(\frac\delta M\right)^{\frac1{2\nu+1}}
$$

なので

$$
\begin{aligned}
\frac{\delta}{2\sqrt{\alpha(\delta)}}
&=\frac12\,\delta^{1-\frac1{2\nu+1}}M^{\frac1{2\nu+1}}\\
&=\frac12\,M^{\frac1{2\nu+1}}\delta^{\frac{2\nu}{2\nu+1}}.
\end{aligned}
$$

一方、

$$
\begin{aligned}
M\alpha(\delta)^\nu
&=M\left(\frac\delta M\right)^{\frac{2\nu}{2\nu+1}}\\
&=M^{1-\frac{2\nu}{2\nu+1}}\delta^{\frac{2\nu}{2\nu+1}}\\
&=M^{\frac1{2\nu+1}}\delta^{\frac{2\nu}{2\nu+1}}.
\end{aligned}
$$

係数を足せば $1/2+1=3/2$ です。$\nu>0$ なので選択した $\alpha(\delta)\to0$ かつ $\delta/\sqrt{\alpha(\delta)}\to0$ で、[INV5の収束条件](../INV5/index.md#thm-inv5-filter-convergence)とも整合します。$\square$
<!-- proof-end -->

たとえば $\nu=1/2$ なら $\alpha=\delta/M$、誤差次数は $\delta^{1/2}$ です。$\nu=1$ なら $\alpha=(\delta/M)^{2/3}$、誤差次数は $\delta^{2/3}$ になります。$M$ を真の解から正確に求める必要はありませんが、上界を実際に利用するには $\nu$ と有効な $M$ の情報が必要です。これが**事前（a priori）選択**の意味です。

$w=0$ の場合は $x^\dagger=0$ なので、この比 $\delta/M$ を使いません。真のデータの復元値は零であり、$\alpha>0$ を固定するだけでも誤差は $\delta/(2\sqrt\alpha)$ 以下になります。$M=0$ を上の公式に形式的に代入してはいけません。

## 5. なぜ滑らかさ指数をいくらでも上げられないか

これまでの証明で $\nu\le1$ を使った場所は、$\lambda\ge\alpha$ に対する $\lambda^{\nu-1}\le\alpha^{\nu-1}$ でした。$\nu>1$ では不等号が逆になります。これは技術的な証明の限界だけではなく、Tikhonovフィルタそのものの性質です。

正の特異値の二乗 $\lambda$ に対する復元の係数は $\lambda/(\lambda+\alpha)$ でした。元の係数 $1$ から、その復元係数を引いて不足分を数えます。

<a id="def-inv6-residual-filter"></a>

<!-- formal-statement-start -->
> **定義（Tikhonovの残差フィルタ）**
> 正則化パラメータ $\alpha>0$、正の特異値の二乗 $\lambda>0$ に対し、Tikhonovフィルタ因子 $\lambda/(\lambda+\alpha)$ の不足分である**残差フィルタ**を

$$
r_\alpha^{\mathrm K}(\lambda)
=1-\frac{\lambda}{\lambda+\alpha}
=\frac{\alpha}{\lambda+\alpha}
$$

> と定める。
<!-- formal-statement-end -->

この残差は、$\lambda^\nu$ 倍の滑らかな成分を一様にどれだけ小さくできるか測るのに役立ちます。$\lambda$ を固定して $\alpha\to0$ とすると、残差はおおむね $\alpha/\lambda$ でしか減りません。

<!-- definition-example-start: def-inv6-residual-filter -->
### 例：一方向の失われた割合

**定義の確認**：残差フィルタが「$1-$復元割合」であり、明示式 $\alpha/(\lambda+\alpha)$ に一致することを計算します。

$A=I:\mathbb R\to\mathbb R$ では $\lambda=1$ です。$\alpha=1$ とするとTikhonovフィルタ因子は $1/2$、残差フィルタも $1-1/2=1/2$ です。$\alpha=1/3$ に下げると復元の割合は $3/4$、失われた割合は $1/4$ になります。いずれも定義の $r_\alpha^{\mathrm K}(\lambda)=\alpha/(\lambda+\alpha)$ を直接満たします。
<!-- definition-example-end -->

<a id="def-inv6-qualification"></a>

<!-- formal-statement-start -->
> **定義（フィルタのqualification）**
> $L>0$ を固定し、正則化パラメータ $\alpha>0$ を持つフィルタの残差係数 $r_\alpha(\lambda)$（$0<\lambda\le L$）を考える。指数 $q>0$ まで**qualificationを持つ**とは、各 $0<\mu\le q$ に対し $C_\mu>0$ が存在し、すべての $\alpha>0$ と $0<\lambda\le L$ について

$$
|r_\alpha(\lambda)|\,\lambda^\mu
\le C_\mu\alpha^\mu
$$

> が成り立つことをいう。持ち得る指数の上限をそのフィルタのqualificationの上限と呼ぶ。
<!-- formal-statement-end -->

$L$ は $A^*A$ の非負固有値を含む固定区間の上端、例えば $\|A\|^2$ です。ここでは $A\ne0$ とし、区間に正の値がある場合を考えます。$0$ の核方向はsource conditionの分数冪で零になるため、上の不等式の対象から外しています。

<!-- definition-example-start: def-inv6-qualification -->
### 例：一つの正の特異方向で試す

**定義の確認**：指数 $\mu=1$ の一様定数は存在し、$\mu=2$ では存在しないことを同じ例で検査します。

$A=I:\mathbb R\to\mathbb R$ なら $L=1$ とでき、$\lambda=1$ です。Tikhonovの残差は $\alpha/(1+\alpha)$。$\mu=1$ なら $\alpha/(1+\alpha)\le\alpha$ なので $C_1=1$ が使えます。しかし $\mu=2$ の場合、もし $C_2\alpha^2$ で抑えられれば

$$
\frac{\alpha/(1+\alpha)}{\alpha^2}
=\frac1{\alpha(1+\alpha)}
\le C_2
$$

がすべての小さい $\alpha>0$ で必要です。左辺は発散するので不可能です。**有限次元で逆が安定でも、Tikhonovのバイアスの次数には限界がある**と確認できます。
<!-- definition-example-end -->

<a id="thm-inv6-qualification-one"></a>

<!-- formal-statement-start -->
> **定理（Tikhonovのqualificationが1であること）**
> $L>0$、$\alpha>0$、$0<\lambda\le L$ とし、残差フィルタを $r_\alpha^{\mathrm K}(\lambda)=\alpha/(\lambda+\alpha)$ とする。このフィルタは全ての $0<\mu\le1$ に対して

$$
|r_\alpha^{\mathrm K}(\lambda)|\,\lambda^\mu
\le\alpha^\mu
$$

> を満たすが、どの $\mu>1$ に対しても $C_\mu$ を $\alpha,\lambda$ に独立に取ることはできない。従ってqualificationの上限は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$0<\mu\le1$ は第3節の二場合分けです。$\mu>1$ は一つの固定した $\lambda_0>0$ を選び、$\alpha\to0$ で左辺が $\alpha$ に比例してしか減らないことを示します。

<!-- proof-start -->
### 証明

$0<\mu\le1$ の上界は[バイアス定理の証明](#thm-inv6-tikhonov-error)で $\nu=\mu$ と置いた不等式そのものです。逆に $\mu>1$ とし、$\lambda_0=L/2>0$ を固定します。もし一定の $C_\mu$ で抑えられるなら

$$
\frac{\alpha\lambda_0^\mu}{\lambda_0+\alpha}
\le C_\mu\alpha^\mu
$$

でなければなりません。$\alpha^\mu>0$ で割ると

$$
\frac{\lambda_0^\mu\alpha^{1-\mu}}{\lambda_0+\alpha}
\le C_\mu.
$$

ところが $\alpha\downarrow0$ で分母は $\lambda_0>0$ に近づき、$\alpha^{1-\mu}\to\infty$ となるので矛盾です。$\square$
<!-- proof-end -->

たとえば $A=I$、$x^\dagger=1$ は任意の $\nu>0$ について $x^\dagger=(A^*A)^\nu 1$ と書けます。それでも無雑音Tikhonov解は $1/(1+\alpha)$ で、バイアスは $\alpha/(1+\alpha)$ です。$\nu=2$ だからといって $O(\alpha^2)$ にはなりません。これはTikhonovの**飽和（saturation）**を示す具体例です。

これは「どんな復元方法でも $\delta^{2/3}$ より速くならない」という主張ではありません。示したのは、**このTikhonovフィルタのバイアスに、$\nu>1$ の冪評価をそのまま適用できない**ということです。

## 6. TSVDはどこまで滑らかさを使えるか

[TSVD](../INV5/index.md#def-inv5-tsvd)では特異値 $\sigma_j\ge\tau$ の方向をそのまま復元し、それより小さい方向を捨てます。従って無雑音バイアスは $\sigma_j<\tau$ の尾部だけで、source conditionを使うと

$$
\begin{aligned}
\|R_\tau^{\mathrm T}y-x^\dagger\|_X^2
&=\sum_{\sigma_j<\tau}\sigma_j^{4\nu}|w_j|^2\\
&\le\tau^{4\nu}\sum_{\sigma_j<\tau}|w_j|^2
\le\tau^{4\nu}\|w\|_X^2.
\end{aligned}
$$

ここでは $\nu\le1$ という制限が出ません。切り捨てた方向だけを評価しているからです。

<a id="prop-inv6-tsvd-rate"></a>

<!-- formal-statement-start -->
> **命題（TSVDのsource condition下での収束率）**
> $X,Y$ を実 Hilbert 空間、$A:X\to Y$ をコンパクト線形作用素、$y\in\mathcal D(A^\dagger)$、$x^\dagger=A^\dagger y=(A^*A)^\nu w$（$\nu>0$、$\|w\|_X\le M$、$M>0$）とする。$\delta>0$、$\|y^\delta-y\|_Y\le\delta$ のとき、任意の $\tau>0$ で

$$
\|R_\tau^{\mathrm T}y^\delta-x^\dagger\|_X
\le\frac\delta\tau+M\tau^{2\nu}.
$$

> 特に $\tau(\delta)=(\delta/M)^{1/(2\nu+1)}$ なら

$$
\|R_{\tau(\delta)}^{\mathrm T}y^\delta-x^\dagger\|_X
\le2M^{\frac1{2\nu+1}}\delta^{\frac{2\nu}{2\nu+1}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

特異値の閾値 $\tau$ はTikhonovの $\alpha$ と単位が異なります。TSVDではバイアスが $\tau^{2\nu}$、ノイズが $\delta/\tau$ なので、その二項を釣り合わせます。

<!-- proof-start -->
### 証明

上の尾部評価でバイアスは $\tau^{2\nu}\|w\|\le M\tau^{2\nu}$ です。[TSVDの作用素ノルム](../INV5/index.md#thm-inv5-spectral-filters)は $\|R_\tau^{\mathrm T}\|\le1/\tau$ なので、[誤差分解](../INV4/index.md#thm-inv4-error-splitting)から第一の上界が従います。

$\tau=(\delta/M)^{1/(2\nu+1)}$ では

$$
\begin{aligned}
\frac\delta\tau
&=\delta^{1-\frac1{2\nu+1}}M^{\frac1{2\nu+1}},\\
M\tau^{2\nu}
&=M^{1-\frac{2\nu}{2\nu+1}}\delta^{\frac{2\nu}{2\nu+1}}.
\end{aligned}
$$

両方とも $M^{1/(2\nu+1)}\delta^{2\nu/(2\nu+1)}$ なので足せば主張の係数 $2$ です。$\nu>0$ より $\tau\to0$、$\delta/\tau\to0$ も成り立ちます。$\square$
<!-- proof-end -->

TSVDでは $\nu>1$ にも同じ計算が成立します。ただし特異値に閾値が直接作用するため、データに小さな変化があって採用される方向が入れ替われば、復元値が不連続に変化することがあります。この「硬い切断」とTikhonovの滑らかな減衰の違いは[前講のフィルタ比較](../INV5/index.md#thm-inv5-spectral-filters)で確かめられます。

## 7. 演習：誤差率を計算と反例から確かめる

### Level A：二項分解と指数を確かめる

<a id="ex-inv6-a01"></a>

### INV6-A01 二つの誤差は同じものか
- Level: A

$A=I:\mathbb R\to\mathbb R$、真の解 $x^\dagger=y=2$、観測 $y^\delta=2+\varepsilon$、$\alpha=1$ とする。ノイズ誤差、バイアス、実際の復元誤差をそれぞれ求め、両誤差ノルムの和と比較せよ。

<!-- solution-start -->
#### 詳細解答

[Tikhonov正規方程式](../INV5/index.md#thm-inv5-tikhonov-minimizer)は $(1+\alpha)x=z$ なので $R_1^{\mathrm K}z=z/2$ です。[正則化のノイズ誤差とバイアス](#def-inv6-noise-bias)の定義から

$$
E_{\mathrm{noise}}=|R_1^{\mathrm K}\varepsilon|=\frac{|\varepsilon|}{2},
\qquad
E_{\mathrm{bias}}=|R_1^{\mathrm K}2-2|=1.
$$

実際の復元値は $(2+\varepsilon)/2=1+\varepsilon/2$ ですから、実誤差は $|-1+\varepsilon/2|$。たとえば $\varepsilon=1$ なら実誤差 $1/2$、二項の和は $3/2$ です。符号の異なるベクトルが打ち消すので、[三角不等式による誤差上界](#def-inv6-noise-bias)は一般に等号ではありません。
<!-- solution-end -->

<a id="ex-inv6-a02"></a>

### INV6-A02 source conditionを座標で確認する
- Level: A

$A=\operatorname{diag}(2,1/2,0):\mathbb R^3\to\mathbb R^3$、$w=(1,4,3)$、$\nu=1/2$ とする。$T=A^*A$、$T^\nu w$ を求め、得られた $x^\dagger$ が $Ax=y$ の最小ノルム解である $y$ を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

$A$ は実対角行列なので $A^*=A$、$T=\operatorname{diag}(4,1/4,0)$ です。標準基底の固有値を $\nu=1/2$ 乗して

$$
T^{1/2}=\operatorname{diag}(2,1/2,0),
\qquad x^\dagger=T^{1/2}w=(2,2,0).
$$

ここで $y=Ax^\dagger=(4,1,0)$ とします。$Ax=y$ の全解は $(2,2,t)$（$t\in\mathbb R$）で、ノルム二乗は $8+t^2$。唯一の最小点は $t=0$ なので、得られた $x^\dagger$ が[最小ノルム解](../INV4/index.md#def-inv4-pseudoinverse-domain)です。
<!-- solution-end -->

<a id="ex-inv6-a03"></a>

### INV6-A03 バイアス評価の二場合分け
- Level: A

$\alpha>0$、$\lambda>0$、$0<\nu\le1$ とする。$\lambda\le\alpha$ と $\lambda\ge\alpha$ に分け、$\alpha\lambda^\nu/(\lambda+\alpha)\le\alpha^\nu$ を自力で導け。

<!-- solution-start -->
#### 詳細解答

$\lambda\le\alpha$ なら $\lambda+\alpha\ge\alpha$ なので左辺は $\lambda^\nu$ 以下、さらに $\lambda^\nu\le\alpha^\nu$ です。$\lambda\ge\alpha$ なら $\lambda+\alpha\ge\lambda$ なので左辺は $\alpha\lambda^{\nu-1}$ 以下です。$\nu-1\le0$ のため $\lambda^{\nu-1}\le\alpha^{\nu-1}$、従って $\alpha^\nu$ 以下です。後半の冪の不等号は $\nu>1$ では逆向きになり、この証明を外挿できません。
<!-- solution-end -->

<a id="ex-inv6-a04"></a>

### INV6-A04 収束指数の計算
- Level: A

$\nu=1/2$、$M=4$、$0<\delta<1$ とし、Tikhonovの上界 $\delta/(2\sqrt\alpha)+M\alpha^\nu$ を使う。第4節の事前選択 $\alpha=(\delta/M)^{2/(2\nu+1)}$ を代入し、二項をそれぞれ計算せよ。

<!-- solution-start -->
#### 詳細解答

$2\nu+1=2$ なので $\alpha=\delta/4$ です。$\sqrt\alpha=\sqrt\delta/2$ より

$$
\frac\delta{2\sqrt\alpha}
=\frac\delta{\sqrt\delta}=\sqrt\delta,
\qquad
M\alpha^\nu
=4\sqrt{\frac\delta4}=2\sqrt\delta.
$$

上界は $3\sqrt\delta$、指数は $2\nu/(2\nu+1)=1/2$ です。[事前選択定理](#thm-inv6-apriori-rate)の右辺も $(3/2)\sqrt4\,\delta^{1/2}=3\sqrt\delta$ となり一致します。
<!-- solution-end -->

<a id="ex-inv6-a05"></a>

### INV6-A05 滑らかな解でも飽和する
- Level: A

$A=I:\mathbb R\to\mathbb R$、$x^\dagger=y=1$ とする。任意の $\nu>0$ でsource conditionが成立することと、Tikhonovの無雑音バイアスが $\nu=2$ に対して $O(\alpha^2)$ にならないことを示せ。

<!-- solution-start -->
#### 詳細解答

$T=A^*A=I$ で、全ての $\nu>0$ に対し $T^\nu=I$ です。$w=1$ を選べば $x^\dagger=T^\nu w$ を満たします。しかし $R_\alpha^{\mathrm K}y=1/(1+\alpha)$ なので、バイアスは

$$
\left|\frac1{1+\alpha}-1\right|
=\frac{\alpha}{1+\alpha}.
$$

これを $\alpha^2$ で割ると $1/[\alpha(1+\alpha)]\to\infty$ です。従って $\alpha$ に独立な $C$ を用いた $C\alpha^2$ 上界はありません。[qualificationの限界](#thm-inv6-qualification-one)を一方向だけで確かめました。
<!-- solution-end -->

### Level B：無限次元と上界の意味を調べる

<a id="ex-inv6-b01"></a>

### INV6-B01 $\ell^2$ のsource conditionを判定する
- Level: B

$D:\ell^2\to\ell^2$ を $(Dx)_n=x_n/n$ とする。$x_n^\dagger=1/n^p$（$p>1/2$）について、指数 $\nu>0$ のsource conditionが成立するための $p,\nu$ の条件を求めよ。最小ノルム解となる正確なデータも示せ。

<!-- solution-start -->
#### 詳細解答

$D^*D$ は第 $n$ 座標に $n^{-2}$ を掛けます。[分数冪の定義](#def-inv6-source-condition)から

$$
x_n^\dagger=n^{-2\nu}w_n
\quad\Longleftrightarrow\quad
w_n=n^{2\nu-p}.
$$

$w\in\ell^2$ であるための必要十分条件は

$$
\sum_{n=1}^\infty n^{4\nu-2p}<\infty
\quad\Longleftrightarrow\quad
4\nu-2p<-1
\quad\Longleftrightarrow\quad
p>2\nu+\frac12.
$$

等号では調和級数となり発散します。$y=Dx^\dagger$ とすれば $y_n=n^{-(p+1)}\in\ell^2$ で $Dx^\dagger=y$ です。$D$ は単射なので $x^\dagger$ が唯一の、従って最小ノルム解です。
<!-- solution-end -->

<a id="ex-inv6-b02"></a>

### INV6-B02 ノイズ増幅上界が鋭い例
- Level: B

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$ とする。$m\ge1$、$\alpha_m=m^{-2}$、真のデータ $y=0$、観測 $y^{\delta_m}=\delta_m e_m$（$\delta_m>0$）に対し、Tikhonov復元値を計算し、ノイズ上界 $\delta_m/(2\sqrt{\alpha_m})$ が等号で達成されることを示せ。

<!-- solution-start -->
#### 詳細解答

$e_m$ の特異値は $\sigma_m=1/m=\sqrt{\alpha_m}$ です。[Tikhonovフィルタ](../INV5/index.md#thm-inv5-spectral-filters)の倍率を代入すると

$$
\frac{\sigma_m}{\sigma_m^2+\alpha_m}
=\frac{1/m}{1/m^2+1/m^2}
=\frac m2.
$$

従って $R_{\alpha_m}^{\mathrm K}y^{\delta_m}=(m\delta_m/2)e_m$ で、真の最小ノルム解は零です。実誤差は $m\delta_m/2=\delta_m/(2\sqrt{\alpha_m})$。これは単なる緩い定数評価ではなく、作用素に特異値 $\sqrt\alpha$ があるとき実現される最大ノイズ倍率です。
<!-- solution-end -->

<a id="ex-inv6-b03"></a>

### INV6-B03 釣り合い選択と厳密な最小化
- Level: B

$M,\delta>0$、$0<\nu\le1$ とする。$F(\alpha)=\delta/(2\sqrt\alpha)+M\alpha^\nu$（$\alpha>0$）の微分から唯一の最小点を求め、第4節の釣り合い選択と定数は違っても $\delta$ の指数が同じになることを示せ。

<!-- solution-start -->
#### 詳細解答

各項を $\alpha$ の冪として微分すると

$$
F'(\alpha)
=-\frac\delta4\alpha^{-3/2}
+M\nu\alpha^{\nu-1}.
$$

$F'(\alpha)=0$ に $\alpha^{3/2}>0$ を掛けて整理すれば

$$
M\nu\alpha^{\nu+1/2}=\frac\delta4,
\qquad
\alpha_*=\left(\frac{\delta}{4M\nu}\right)^{\frac2{2\nu+1}}.
$$

$\alpha^{\nu+1/2}$ は $\alpha>0$ で狭義増加し、$F'$ は $\alpha<\alpha_*$ で負、$\alpha>\alpha_*$ で正なので唯一の最小点です。$\alpha_*$ は $\delta^{2/(2\nu+1)}$ に比例し、両項とも $\delta^{2\nu/(2\nu+1)}$ に比例します。第4節の選択 $\alpha=(\delta/M)^{2/(2\nu+1)}$ は厳密な最小点とは限りませんが、**同じ収束指数**を実現します。
<!-- solution-end -->

<a id="ex-inv6-b04"></a>

### INV6-B04 TSVDはより大きな指数を利用できる
- Level: B

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$ とする。$w_n=1/n$、$\nu=2$、$x^\dagger=(D^*D)^2w$ とおき、$x_n^\dagger$ と正確なデータ $y_n$ を求めよ。TSVDのバイアスを $\tau^4\|w\|$ で抑え、$\tau=(\delta/\|w\|)^{1/5}$ なら収束指数が $4/5$ となることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$D^*D$ の第 $n$ 固有値は $1/n^2$ であり、二乗すれば $1/n^4$ です。従って

$$
x_n^\dagger=\frac1{n^4}\frac1n=\frac1{n^5},
\qquad
y_n=(Dx^\dagger)_n=\frac1{n^6}.
$$

$\|w\|_2^2=\sum_n1/n^2<\infty$、$D$ は単射なのでこれは正確なデータの最小ノルム解です。TSVDが捨てる $1/n<\tau$ の方向では、各係数が $(1/n)^4w_n$ ですから

$$
\|R_\tau^{\mathrm T}y-x^\dagger\|_2^2
=\sum_{1/n<\tau}\frac1{n^8}|w_n|^2
\le\tau^8\|w\|_2^2.
$$

平方根を取るとバイアスは $\tau^4\|w\|_2$ 以下です。[TSVD収束率の命題](#prop-inv6-tsvd-rate)で $\nu=2$ とすれば、$\delta/\tau$ と $\|w\|\tau^4$ を釣り合わせた $\tau=(\delta/\|w\|)^{1/5}$ により誤差は $2\|w\|^{1/5}\delta^{4/5}$ 以下です。同じ指数をTikhonovの $\alpha^\nu$ バイアス上界へ無条件に代入することは[飽和定理](#thm-inv6-qualification-one)に反します。
<!-- solution-end -->

### Level C：条件・rate・失敗を一つのモデルで結ぶ

<a id="ex-inv6-c01"></a>

### INV6-C01 無限次元対角観測の事前選択と誤選択
- Level: C

$D:\ell^2\to\ell^2$ を $(Dx)_n=x_n/n$ とする。$w_n=1/n$、$x^\dagger=(D^*D)w$、$y=Dx^\dagger$ とおく。$m\ge2$ ごとにノイズ水準 $\delta_m=m^{-3}$、観測 $y^{\delta_m}=y+\delta_m e_{m^3}$ を考える。

1. $x_n^\dagger$、$y_n$、$M=\|w\|_2$ が有限であることを示し、指数 $\nu=1$ のsource conditionを確認せよ。
2. $\alpha_m=(\delta_m/M)^{2/3}$ と選ぶとき、全復元誤差がどの次数で抑えられるか計算せよ。
3. 代わりに $\widetilde\alpha_m=m^{-6}$ と選ぶとノイズ誤差が $1/2$ に等しくなり、復元値が $x^\dagger$ へ収束しないことを示せ。バイアスが零へ向かうことも確認し、失敗の原因を特定せよ。

<!-- solution-start -->
#### 詳細解答

**1. 条件の確認。** $D^*D$ は第 $n$ 座標を $n^{-2}$ 倍するので

$$
x_n^\dagger=\frac1{n^2}\frac1n=\frac1{n^3},
\qquad
y_n=\frac1n x_n^\dagger=\frac1{n^4}.
$$

$\sum_n1/n^2<\infty$ なので $w\in\ell^2$、$M=(\sum_n n^{-2})^{1/2}<\infty$ かつ $M>0$ です。$x^\dagger=(D^*D)^1w$ と既に表され、$D$ が単射だから $x^\dagger$ は $y$ の最小ノルム解です。さらに $\|y^{\delta_m}-y\|_2=\delta_m$ で、指定のノイズ制約が成り立ちます。

**2. 正しい事前選択。** [事前選択定理](#thm-inv6-apriori-rate)へ $\nu=1$、$\delta_m=m^{-3}$ を代入すると

$$
\alpha_m=\left(\frac{m^{-3}}M\right)^{2/3}
=M^{-2/3}m^{-2}.
$$

ノイズ項とバイアス項はそれぞれ

$$
\begin{aligned}
\frac{\delta_m}{2\sqrt{\alpha_m}}
&=\frac{m^{-3}}{2M^{-1/3}m^{-1}}
=\frac12M^{1/3}m^{-2},\\
M\alpha_m
&=M\cdot M^{-2/3}m^{-2}
=M^{1/3}m^{-2}.
\end{aligned}
$$

ゆえに実誤差は $(3/2)M^{1/3}m^{-2}=(3/2)M^{1/3}\delta_m^{2/3}$ 以下で零に収束します。

**3. ノイズを通してしまう誤選択。** $\widetilde\alpha_m=m^{-6}$、ノイズ方向 $n=m^3$ の特異値は $\sigma_n=m^{-3}=\sqrt{\widetilde\alpha_m}$ です。従って[フィルタ倍率](../INV5/index.md#thm-inv5-spectral-filters)は

$$
\frac{\sigma_n}{\sigma_n^2+\widetilde\alpha_m}
=\frac{m^{-3}}{m^{-6}+m^{-6}}
=\frac{m^3}{2}.
$$

ノイズベクトルを復元すると

$$
R_{\widetilde\alpha_m}^{\mathrm K}(y^{\delta_m}-y)
=\frac{m^{-3}m^3}{2}e_{m^3}
=\frac12 e_{m^3}.
$$

このノルムは常に $1/2$ です。一方、source conditionの[バイアス上界](#thm-inv6-tikhonov-error)で $\nu=1$ なので

$$
\|R_{\widetilde\alpha_m}^{\mathrm K}y-x^\dagger\|_2
\le M\widetilde\alpha_m
=Mm^{-6}\longrightarrow0.
$$

逆三角不等式を二つの誤差ベクトルへ適用すると

$$
\|R_{\widetilde\alpha_m}^{\mathrm K}y^{\delta_m}-x^\dagger\|_2
\ge\frac12-Mm^{-6}\longrightarrow\frac12.
$$

同時に上からも $1/2+Mm^{-6}$ で挟まれるので実誤差は $1/2$ に収束し、零にはなりません。$\delta_m/\sqrt{\widetilde\alpha_m}=1$ であり、[INV5のノイズ下収束条件](../INV5/index.md#thm-inv5-filter-convergence)を満たしていないことが失敗の機構です。バイアスが十分小さくても、ノイズ増幅だけで収束が壊れます。
<!-- solution-end -->

## 8. 次に必要な情報

source conditionがあれば、**解の滑らかさ $\nu$ とその大きさの上界 $M$** を使って収束率を計算できます。しかし実際には未知の $x^\dagger$ から $w$ や $\nu$ を直接読むことはできません。さらに離散化の誤差を観測ノイズと混同してもいけません。次講 **INV7** では、観測残差を使うパラメータ選択則と、データ・モデル・離散化の誤差を区別する条件を調べます。
