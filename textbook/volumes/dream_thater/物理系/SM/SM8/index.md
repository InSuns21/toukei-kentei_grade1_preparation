# SM8 相転移と臨界現象

[SM7のCurie–Weiss模型](../SM7/index.md#def-sm7-cw)では、スピンの個数を無限大にすると、零外場で典型的な磁化が一つから正負二つへ変わりました。しかし有限系の分配関数は有限個の指数関数の和です。滑らかな関数をいくら足しても突然折れ曲がりません。**それでも相転移が起こるのはなぜでしょうか。**

本章は、自由エネルギーの極限で微分可能性が失われる機構を具体的に計算し、磁化の揺らぎ、相関、臨界指数をつなぎます。最後に、平均場で証明した結果と、別の模型にも共通すると期待する「普遍性」の主張を区別します。

## 1. 有限系の実解析性は極限へ自動的に継承されない

まず同じ模型でも「有限の粒子数を固定して外場を変える操作」と「先に熱力学極限を取る操作」を分けます。以下では逆温度と結合をまとめて、無次元パラメータ

$$
a=\beta J>0,\qquad b=\beta h\in\mathbb R
$$

を使います。[磁化階級別のCurie–Weiss分配関数](../SM7/index.md#prop-sm7-multiplicity)から有限 $N$ の式を得ます。熱力学極限については[Curie–Weiss圧力の変分表示と磁化集中](../SM7/index.md#thm-sm7-pressure)を適用し、

$$
Z_N(a,b)=\sum_{k=0}^N\binom Nk
\exp\left[N\left(\frac a2m_k^2+bm_k\right)\right],
\qquad m_k=\frac{2k}N-1,
$$

$$
p_N(a,b)=\frac1N\log Z_N(a,b),\qquad
p(a,b)=\lim_{N\to\infty}p_N(a,b)
=\max_{-1\le m\le1}\left\{s(m)+\frac a2m^2+bm\right\}.
$$

ここで $s(m)$ は[SM7の二値エントロピー](../SM7/index.md#thm-sm7-pressure)に現れた連続関数です。

<a id="def-sm8-free-energy-transition"></a>

<!-- formal-statement-start -->
> **定義（自由エネルギーによる相転移の判定）**  
> $a>0$、$b\in\mathbb R$ のCurie–Weiss模型で、熱力学極限の無次元圧力 $p(a,b)$ と、逆温度 $\beta>0$ を固定した自由エネルギー密度

$$
f(\beta,J,h)=-\frac1\beta p(\beta J,\beta h)
$$

> を考える。制御パラメータのある点でこれらの極限関数が実解析関数として表せなくなるとき、その点をこの模型の**相転移点**という。特に一次導関数の不連続は一次転移を、一次導関数は連続で二次導関数が存在しないことは連続転移の一例を与える。有限 $N$ の $p_N$ と極限の $p$ は別の関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm8-free-energy-transition -->
### 直接例：一つのスピンには転移がない

$N=1$ では $m_0=-1,m_1=1$、いずれも $m_k^2=1$ なので

$$
Z_1(a,b)=e^{a/2-b}+e^{a/2+b}
=2e^{a/2}\cosh b,
$$

$$
p_1(a,b)=\frac a2+\log(2\cosh b).
$$

**定義の確認**：$\cosh b>0$ はすべての実数 $b$ で成り立ち、分配関数の対数はどの有限の $(a,b)$ でも実解析関数です。$b=0$ での微分も左右で一致し、$\partial_b p_1=\tanh b$ です。一スピンの磁化が $+1$ と $-1$ を取れるだけでは、非解析性を持つ相転移にはなりません。
<!-- definition-example-end -->

<a id="prop-sm8-finite-analytic"></a>

<!-- formal-statement-start -->
> **命題（有限Curie–Weiss模型の解析性と応答）**  
> 任意の整数 $N\ge1$ に対し、$p_N(a,b)$ は実数の全域で $a,b$ の実解析関数である。磁化 $m_N=M_N/N$ を正準分布で測ると

$$
\partial_b p_N=\mathbb E_{N,a,b}m_N,\qquad
\partial_b^2p_N=N\operatorname{Var}_{N,a,b}(m_N)\ge0.
$$

> また、$\partial_a p_N=\tfrac12\mathbb E_{N,a,b}(m_N^2)$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

有限和の各項は指数関数で、実数上で分配関数は正です。微分では指数の中の $Nm_k$ または $Nm_k^2/2$ が係数として現れます。

<!-- proof-start -->
### 証明

各項 $\binom Nk e^{N(am_k^2/2+bm_k)}$ は $(a,b)$ の実解析関数で、全て正です。有限和 $Z_N$ も実解析関数で $Z_N>0$。任意の実点の近傍で $Z_N$ は正の値から離れないため、その近傍で $\log Z_N$ との実解析関数の合成が許されます。

有限和を項別に微分すると

$$
\partial_bZ_N=\sum_k Nm_k w_k=N Z_N\mathbb Em_N,
$$

$$
\partial_b^2Z_N=\sum_k N^2m_k^2w_k=N^2Z_N\mathbb Em_N^2,
$$

ただし $w_k=\binom Nk e^{N(am_k^2/2+bm_k)}$ です。対数の商の微分を行うと

$$
\partial_b^2p_N
=\frac1N\left(\frac{\partial_b^2Z_N}{Z_N}
-\frac{(\partial_bZ_N)^2}{Z_N^2}\right)
=N\bigl(\mathbb Em_N^2-(\mathbb Em_N)^2\bigr).
$$

同様に $\partial_aZ_N=\sum_k(Nm_k^2/2)w_k$ を $NZ_N$ で割れば最後の式を得ます。
<!-- proof-end -->

実解析関数列の点ごとの極限が再び実解析関数になるとは限りません。したがって上の命題は、極限 $p$ にそのまま適用できません。有限 $N$ の微分と $N\to\infty$ の交換も、別の根拠が必要です。

## 2. 無限系の外場応答に角が生まれる

<a id="thm-sm8-field-cusp"></a>

<!-- formal-statement-start -->
> **定理（秩序相における圧力の非微分可能性）**  
> $a>1$ とし、[Curie–Weiss模型の零外場臨界点](../SM7/index.md#thm-sm7-critical)における正の最大点を $m_*(a)\in(0,1)$ とする。極限圧力 $p(a,b)$ は $b=0$ で連続だが、左右の導関数は異なり、

$$
\partial_b^+p(a,0)=m_*(a),\qquad
\partial_b^-p(a,0)=-m_*(a).
$$

> したがって $b=0$ では微分可能でない。$0<a\le1$ なら $b=0$ で微分可能で、導関数は $0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

圧力は連続関数の最大値であり、最大化前の関数には $bm$ が線形に加わります。正の微小外場は正の最大点を選ぶので、最大値の差を二つの容易な不等式で挟めます。

<!-- proof-start -->
### 証明

$\Phi_{a,b}(m)=s(m)+am^2/2+bm$ と書きます。$|m|\le1$ より任意の $b,c$ について

$$
|\Phi_{a,b}(m)-\Phi_{a,c}(m)|\le|b-c|.
$$

両辺の最大値を比較すると $|p(a,b)-p(a,c)|\le|b-c|$ であり、圧力の連続性が従います。

$a>1$、$b>0$ のとき、[SM7の自発磁化定理](../SM7/index.md#thm-sm7-spontaneous)によって $\Phi_{a,b}$ の最大点 $m(b)$ は正で唯一、$b\downarrow0$ で $m(b)\to m_*(a)$ です。$b=0$ の最大点 $m_*(a)$ を試験点に入れると

$$
p(a,b)\ge\Phi_{a,b}(m_*)=p(a,0)+bm_*.
$$

逆に $\Phi_{a,0}(m(b))\le p(a,0)$ なので

$$
p(a,b)=\Phi_{a,0}(m(b))+b\,m(b)
\le p(a,0)+b\,m(b).
$$

$b>0$ で割り、

$$
m_*(a)\le\frac{p(a,b)-p(a,0)}b\le m(b)
\longrightarrow m_*(a).
$$

よって右導関数は $m_*(a)$。$s(m)+am^2/2$ は偶関数なので、$m$ を $-m$ に置き換えると $p(a,-b)=p(a,b)$。左の差商は右の負になり、左導関数は $-m_*$ です。

$0<a\le1$ では[SM7の最大点分類](../SM7/index.md#thm-sm7-critical)で零外場最大点は $0$ だけです。$b>0$ の最大点 $m(b)\to0$ を同じ二側評価に代入すると右導関数は0となり、偶関数性で左も0になります。
<!-- proof-end -->

この結果は「有限系の対称性が突然壊れた」という意味ではありません。有限系の平均磁化は $b=0$ で常に0ですが、先に極限を取った圧力は、外場の正負で異なる秩序枝を選びます。ここでは圧力の**外場方向の尖り**を厳密に示しました。

## 3. a=1では温度方向の曲率も変わる

外場をゼロとしたまま温度を変えるとどうなるでしょうか。$a=\beta J$ が1に近いとき、磁化も小さくなります。エントロピーを $m=0$ の近くで展開すれば、[TH8の四次Landau模型](../../TH/TH8/index.md#def-th8-quartic)と同じ四次多項式が**微視的計算から**現れます。ただし以下の近似は $m$ が小さい範囲の式であり、最初から任意の磁化に適用しません。

<a id="lem-sm8-entropy-expansion"></a>

<!-- formal-statement-start -->
> **補題（二値エントロピーの臨界展開）**  
> $|m|<1$ における[二値エントロピー](../SM7/index.md#thm-sm7-pressure)は、$m\to0$ で

$$
s(m)=\log2-\frac{m^2}{2}-\frac{m^4}{12}+O(m^6),
$$

$$
\operatorname{arctanh}m=m+\frac{m^3}{3}+O(m^5)
$$

> を満たす。従って $t=a-1$ とおくと

$$
\Phi_{a,0}(m)=\log2+\frac t2m^2-\frac1{12}m^4+O(m^6).
$$
<!-- formal-statement-end -->

### 証明の見取り図

エントロピーの導関数を幾何級数から積分します。定数項 $s(0)$ を忘れると、圧力の絶対値を誤ります。

<!-- proof-start -->
### 証明

[SM7の停留条件の計算](../SM7/index.md#thm-sm7-critical)で得た $s'(m)=-\operatorname{arctanh}m$ を使います。$|u|<1$ では

$$
\frac1{1-u^2}=1+u^2+u^4+\frac{u^6}{1-u^2}.
$$

区間 $|u|\le r<1$ では最後の項の絶対値は $|u|^6/(1-r^2)$ 以下です。0から $m$ まで積分して

$$
\operatorname{arctanh}m=\int_0^m\frac{du}{1-u^2}
=m+\frac{m^3}3+\frac{m^5}5+O(m^7).
$$

さらに $s'(m)=-\operatorname{arctanh}m$、$s(0)=\log2$ を使ってもう一度積分すると

$$
s(m)=\log2-\frac{m^2}2-\frac{m^4}{12}
-\frac{m^6}{30}+O(m^8).
$$

必要な次数で打ち切り、$am^2/2$ を加えれば第三式を得ます。
<!-- proof-end -->

<a id="thm-sm8-temperature-singularity"></a>

<!-- formal-statement-start -->
> **定理（臨界磁化の平方根則と圧力の二次非解析性）**  
> $a>1$ の正の最大点 $m_*(a)$ について、$t=a-1\downarrow0$ のとき

$$
m_*(a)^2=3t+O(t^2),
\qquad m_*(a)\sim\sqrt{3t}.
$$

> さらに零外場の極限圧力は

$$
p(a,0)=
\begin{cases}
\log2,&0<a\le1,\\
\log2+\dfrac34(a-1)^2+O((a-1)^3),&a\downarrow1,\ a>1.
\end{cases}
$$

> よって $a=1$ で $p(a,0)$ は一階微分可能だが二階微分可能ではない。
<!-- formal-statement-end -->

### 証明の見取り図

最大点が満たす自己無撞着方程式を小磁化展開し、まず $m_*^2$ の大きさを確定します。その後に**最大点へ代入**して圧力を計算する必要があります。$m=0$ に先に固定すると、秩序相の寄与を失います。

<!-- proof-start -->
### 証明

[Curie–Weiss模型の零外場臨界点](../SM7/index.md#thm-sm7-critical)より、正の最大点は $\operatorname{arctanh}m_*=a m_*$ を満たします。$r(m)=\operatorname{arctanh}m/m$ は $m>0$ で狭義増加、$r(0+)=1$ です。従って $a\downarrow1$ なら $m_*(a)\to0$ です。

上の[エントロピー展開](#lem-sm8-entropy-expansion)で得た級数を $m_*>0$ で割ると

$$
1+t=\frac{\operatorname{arctanh}m_*}{m_*}
=1+\frac{m_*^2}{3}+\frac{m_*^4}{5}+O(m_*^6).
$$

$y=m_*^2$ とすると $t=y/3+O(y^2)$。右辺の $y/3+O(y^2)$ と $y/3$ の比は $y\to0$ で1へ近づくので、十分小さい $y$ では $y=O(t)$ です。これを戻すと

$$
t=\frac y3+O(t^2),\qquad y=3t+O(t^2).
$$

最大点において $p(a,0)=\Phi_{a,0}(m_*)$ です。補題の展開へ $m_*^2=3t+O(t^2)$ を代入すると

$$
p(a,0)-\log2
=\frac t2(3t+O(t^2))
-\frac1{12}(9t^2+O(t^3))+O(t^3)
=\frac34t^2+O(t^3).
$$

$a\le1$ では最大点は0のみなので $p(a,0)=\Phi_{a,0}(0)=\log2$ です。左右とも一次差商は0へ収束します。一方、一階微分の値0を引いた二階差商

$$
\frac{2\{p(1+t,0)-p(1,0)-0\cdot t\}}{t^2}
$$

は $t\uparrow0$ で0、$t\downarrow0$ で $3/2$ となります。従って $a=1$ で二階微分可能ではありません。
<!-- proof-end -->

$T$ で見れば $a=J/(k_{\mathrm B}T)$ なので $a=1$ は $T_{\mathrm c}=J/k_{\mathrm B}$ に対応します。$p$ の二次非解析性は、有限の $p_N$ がどれだけ滑らかでも、極限では二階微分の挙動が変わり得ることを示します。

## 4. 臨界指数：何を何のべきで測るのか

境界 $a=1$ へ近づくと、単なる「発散する」「ゼロになる」だけでなく、どれほど速いかを測れます。[SM7の磁化応答式](../SM7/index.md#prop-sm7-response)では、高温側の感受率が $\beta/(1-a)$ になりました。ここでは無次元場 $b$ で微分する感受率を使い、$h$ で微分する量との間に係数 $\beta$ があることを明示します。

<a id="def-sm8-critical-exponents"></a>

<!-- formal-statement-start -->
> **定義（本模型の臨界指数）**  
> 零外場で $a>1$ の正の秩序磁化を $m_*(a)$、$a<1$ の極限磁化応答を

$$
\widehat\chi_+(a)=\left.\frac{dm(a,b)}{db}\right|_{b=0}
$$

> とする。$a=1$ で $b\downarrow0$ の磁化を $m(1,b)$ とする。もし正の定数 $C_1,C_2,C_3$ に対し

$$
m_*(a)\sim C_1(a-1)^{\beta_{\mathrm{crit}}},
\quad
\widehat\chi_+(a)\sim C_2(1-a)^{-\gamma_{\mathrm{crit}}},
\quad
m(1,b)\sim C_3 b^{1/\delta_{\mathrm{crit}}}
$$

> が成立するなら、$\beta_{\mathrm{crit}},\gamma_{\mathrm{crit}},\delta_{\mathrm{crit}}$ をそれぞれ秩序変数・感受率・臨界等温線の指数という。逆温度 $\beta$ と指数 $\beta_{\mathrm{crit}}$ は別記号である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm8-critical-exponents -->
### 直接例：感受率の単位を揃える

$\beta J=a<1$ とします。[SM7の常磁性相の感受率](../SM7/index.md#prop-sm7-response)は $\partial_h m=\beta/(1-a)$ です。$b=\beta h$ だから $\partial_b m=(\partial_hm)/\beta=1/(1-a)$ です。係数が異なっても発散のべき指数は同じく1となります。

**定義の確認**：$C_2=1$、$\gamma_{\mathrm{crit}}=1$ を上の定義式へ代入すれば $(1-a)^{-1}$ を再現します。ここでの感受率は「有限 $N$ の微分を直接極限に入れたもの」ではなく、**熱力学極限後の枝**の導関数です。
<!-- definition-example-end -->

<a id="thm-sm8-mean-field-exponents"></a>

<!-- formal-statement-start -->
> **定理（Curie–Weiss模型の三つの臨界指数）**  
> $a>0$ とするCurie–Weiss模型の熱力学極限で、正の外場 $b>0$ の唯一最大点を $m(a,b)$ とする。[臨界指数の定義](#def-sm8-critical-exponents)に関して

$$
\beta_{\mathrm{crit}}=\frac12,\qquad
\gamma_{\mathrm{crit}}=1,\qquad
\delta_{\mathrm{crit}}=3.
$$

> より詳しく、$a\uparrow1$ の高温側では $\widehat\chi_+(a)=1/(1-a)$、$b\downarrow0$ かつ $a=1$ では

$$
m(1,b)\sim(3b)^{1/3}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

平方根則は既に証明しました。高温側は自己無撞着方程式を $b$ で微分します。$a=1$ では線形項が相殺するので、三次項が外場と釣り合います。

<!-- proof-start -->
### 証明

[平方根則](#thm-sm8-temperature-singularity)より $m_*(a)\sim\sqrt{3(a-1)}$ であり、$\beta_{\mathrm{crit}}=1/2$ です。

$0<a<1$ では、[SM7の一意最大点](../SM7/index.md#thm-sm7-spontaneous)は自己無撞着方程式

$$
\operatorname{arctanh}m(a,b)=a\,m(a,b)+b
$$

を満たします。$b=0$ の解は $m=0$ で、左辺と右辺の $m$ 微分の差は $1-a>0$。その近傍で解を $b$ で微分し、

$$
\left(\frac1{1-m^2}-a\right)\frac{dm}{db}=1,
\qquad
\left.\frac{dm}{db}\right|_{b=0}=\frac1{1-a}.
$$

従って $\gamma_{\mathrm{crit}}=1$ です。

$a=1$ の場合は $m(1,b)>0$ で、$b\downarrow0$ のとき $m(1,b)\to0$。[エントロピー展開](#lem-sm8-entropy-expansion)の導関数側を使うと

$$
b=\operatorname{arctanh}m-m
=\frac{m^3}3+O(m^5)
=\frac{m^3}3\{1+O(m^2)\}.
$$

両辺の比から $m^3/(3b)\to1$、正の三乗根を取れば $m(1,b)/(3b)^{1/3}\to1$ となり、$\delta_{\mathrm{crit}}=3$ です。
<!-- proof-end -->

これらは**平均場模型での証明済み指数**です。現実のすべての磁性体や低次元Ising模型で同じ値になると主張しているわけではありません。

## 5. 相関と揺らぎ：局所鎖と全結合の対照

圧力から巨視的な転移を読みましたが、微視的スピン同士がどれほど連動するかも知りたいところです。平均磁化がゼロでも二点の積の平均は非零になり得ます。平均を差し引き、連動の部分だけを測ります。

<a id="def-sm8-connected-correlation"></a>

<!-- formal-statement-start -->
> **定義（二点の連結相関と相関長）**  
> 有限Ising模型の異なる頂点 $i,j$ に対し、連結相関を

$$
C_{ij}=\mathbb E(\sigma_i\sigma_j)
-\mathbb E\sigma_i\,\mathbb E\sigma_j
$$

> とする。並進方向に距離 $r\ge1$ だけ離れた零外場スピンの連結相関が $C(r)=q^r$、$0<q<1$ の形に書ける場合、

$$
C(r)=e^{-r/\xi},\qquad \xi=-\frac1{\log q}
$$

> を満たす正の数 $\xi$ を、その模型・条件での相関長という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm8-connected-correlation -->
### 直接例：一次元開放鎖

$N\ge4$、零外場、$J,\beta>0$ の一次元開放鎖では[SM7の一次元鎖相関式](../SM7/index.md#prop-sm7-chain)により $\mathbb E(\sigma_i\sigma_{i+r})=\tanh(\beta J)^r$ です。[反転対称性](../SM7/index.md#prop-sm7-spin-flip)から各 $\mathbb E\sigma_i=0$ なので

$$
C(r)=\tanh(\beta J)^r,\qquad
\xi=-\frac1{\log\tanh(\beta J)}.
$$

**定義の確認**：$0<\tanh(\beta J)<1$ だから $\log\tanh(\beta J)<0$、$\xi$ は正です。例えば $\beta J=(\log3)/2$ では $q=1/2$、$C(1)=1/2$、$C(3)=1/8$、$\xi=1/\log2$ です。有限の正温度ではこの相関長は有限です。
<!-- definition-example-end -->

全結合のCurie–Weiss模型には、一次元格子のような距離がありません。そこで遠距離という言葉を、互いに異なるスピン間の相関が $N\to\infty$ でも消えないことに限定して用います。

<a id="prop-sm8-exchangeable-correlation"></a>

<!-- formal-statement-start -->
> **命題（全結合模型の共分散恒等式）**  
> $N\ge2$ のCurie–Weiss模型で $i\ne j$ とし、[共分散](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)を既習とし、対称性により共通となる値を $c_N=\operatorname{Cov}(\sigma_i,\sigma_j)$ とする。このとき

$$
\operatorname{Var}(M_N)=N\operatorname{Var}(\sigma_1)
+N(N-1)c_N.
$$

> 特に零外場では $\mathbb E\sigma_i=0$ であり、

$$
c_N=\frac{N\mathbb E(m_N^2)-1}{N-1},
\qquad
\partial_h\mathbb E m_N
=\beta\{1+(N-1)c_N\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

全結合Hamiltonianはスピン番号の入れ替えで変わりません。磁化を和として展開すると、対角項が $N$ 個、異なる二点の項が $N(N-1)$ 個出ます。

<!-- proof-start -->
### 証明

$M_N=\sum_i\sigma_i$ なので分散の双線形性から

$$
\operatorname{Var}(M_N)
=\sum_i\operatorname{Var}(\sigma_i)
+\sum_{i\ne j}\operatorname{Cov}(\sigma_i,\sigma_j).
$$

全ての配置の重みは $M_N$ だけに依存するため、添字の入れ替えで分布は不変です。従って各対角分散は $\operatorname{Var}(\sigma_1)$、異なる二点の共分散は共通値 $c_N$ です。

零外場では[SM7の反転対称性](../SM7/index.md#prop-sm7-spin-flip)より $\mathbb E\sigma_i=\mathbb EM_N=0$。$\sigma_i^2=1$ だから $\operatorname{Var}(\sigma_i)=1$、かつ $\operatorname{Var}(M_N)=\mathbb EM_N^2=N^2\mathbb Em_N^2$ です。最初の等式を $c_N$ について解くと

$$
N^2\mathbb Em_N^2=N+N(N-1)c_N,
\qquad
c_N=\frac{N\mathbb Em_N^2-1}{N-1}.
$$

最後は[SM7の磁化応答公式](../SM7/index.md#prop-sm7-response)に代入して

$$
\partial_h\mathbb Em_N=\frac\beta N\operatorname{Var}(M_N)
=\beta\{1+(N-1)c_N\}
$$

です。
<!-- proof-end -->

<a id="thm-sm8-long-range-order"></a>

<!-- formal-statement-start -->
> **定理（Curie–Weiss模型の長距離秩序と巨大揺らぎ）**  
> 零外場、$a=\beta J>0$ に固定し、任意の異なる二スピンの連結相関を $c_N$ とする。$N\to\infty$ で

$$
\lim_{N\to\infty}c_N=
\begin{cases}
0,&0<a\le1,\\
m_*(a)^2,&a>1.
\end{cases}
$$

> さらに $a>1$ では、有限系の零外場における外場応答が

$$
\frac1N\left.\partial_h\mathbb E_{\beta,h}m_N\right|_{h=0}
\longrightarrow\beta m_*(a)^2
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[SM7の磁化集中定理](../SM7/index.md#thm-sm7-pressure)の最大点集合が、常磁性側で $\{0\}$、秩序相で $\{-m_*,m_*\}$ であることを使います。$m_N^2$ は有界なので、典型値への集中から二乗平均へ移せます。

<!-- proof-start -->
### 証明

[最大点分類](../SM7/index.md#thm-sm7-critical)で $a\le1$ の最大点集合は $K=\{0\}$、$a>1$ では $K=\{-m_*,m_*\}$ です。[磁化集中](../SM7/index.md#thm-sm7-pressure)から、任意の $\varepsilon>0$ で

$$
\mathbb P\bigl(\operatorname{dist}(m_N,K)>\varepsilon\bigr)\to0.
$$

$K=\{0\}$ の場合、$|m_N|\le1$ を使えば

$$
0\le\mathbb Em_N^2
\le\varepsilon^2+\mathbb P(|m_N|>\varepsilon)
\longrightarrow\varepsilon^2.
$$

$\varepsilon\downarrow0$ により $\mathbb Em_N^2\to0$。$K=\{\pm m_*\}$ の場合、$||m_N|-m_*|\le\varepsilon$ の事象上で

$$
|m_N^2-m_*^2|
=||m_N|-m_*|(|m_N|+m_*)
\le2\varepsilon.
$$

補集合では $|m_N^2-m_*^2|\le2$ なので、期待値の差の絶対値は $2\varepsilon+2\mathbb P(\operatorname{dist}(m_N,K)>\varepsilon)$ 以下です。先に $N\to\infty$、次に $\varepsilon\downarrow0$ とすると $\mathbb Em_N^2\to m_*^2$ です。

[共分散恒等式](#prop-sm8-exchangeable-correlation)から

$$
c_N=\frac{N\mathbb Em_N^2-1}{N-1}
=\frac{N}{N-1}\mathbb Em_N^2-\frac1{N-1},
$$

従って前半の極限を得ます。後半について、同じ命題と $\mathbb Em_N=0$ を使えば

$$
\frac1N\left.\partial_h\mathbb Em_N\right|_{h=0}
=\frac\beta{N^2}\operatorname{Var}(M_N)
=\beta\mathbb Em_N^2\longrightarrow\beta m_*^2.
$$

これで零外場の有限系の感受率が秩序相で $N$ に比例して大きくなることが従います。
<!-- proof-end -->

重要なのは、最後の $N$ に比例する応答を、外場を正に保ったまま先に熱力学極限を取る**一つの秩序枝の感受率**と混同しないことです。前者は正負二つの状態の混合がわずかな外場で偏る効果を含みます。

## 6. スケーリングと普遍性：どこまで言えるか

今までに厳密に得た小さな尺度の法則を並べます。$a\downarrow1$ の秩序磁化は $(a-1)^{1/2}$、$a\uparrow1$ の常磁性応答は $(1-a)^{-1}$、臨界等温線は $b^{1/3}$ です。これは、制御変数の変化幅を小さくしても**べきの比率が一定に見える**というスケーリングの入口です。

<a id="def-sm8-scaling-universality"></a>

<!-- formal-statement-start -->
> **定義（臨界スケーリングと普遍性の意味）**  
> 相転移点への距離を表す正の量 $t$ に対し、観測量 $Q(t)$ が

$$
Q(t)\sim C t^\rho\qquad (t\downarrow0),\quad C>0
$$

> と振る舞うとき、指数 $\rho$ による臨界スケーリングがあるという。異なる模型でも、適切に規格化した観測量に**同じ臨界指数やスケーリング関数**が現れる現象を普遍性という。この定義だけでは、どの模型同士で普遍性が成立するかは決まらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm8-scaling-universality -->
### 直接例：臨界温度への近づき方

**定義の確認**：$Q(t)=m_*(1+t)$ とします。[平方根則](#thm-sm8-temperature-singularity)により $Q(t)/t^{1/2}\to\sqrt3$ です。よって $C=\sqrt3$、$\rho=1/2$ と具体的に確認できます。$a=1$ に近づく距離を $t$ から $4t$ にすれば、主要項の磁化は2倍になります。

別の模型でこの指数を示すには、その模型自身の相関・極限・変分構造を調べる必要があります。平均場という名称だけでは普遍性の証明になりません。
<!-- definition-example-end -->

同じ二値スピンでも、[一次元開放鎖の相関](../SM7/index.md#prop-sm7-chain)では有限 $\beta$ の相関長は有限です。一方、全結合Curie–Weiss模型では $a>1$ の二点相関が系の大きさを増やしても消えません。[TH8のLandau近似](../../TH/TH8/index.md#def-th8-quartic)も四次多項式から平方根則を示しますが、局所的に結合する有限次元系へ指数を移すには追加の理論が必要です。「普遍性」と「すべての模型が同じ指数」は同義ではありません。

## 7. 演習：非解析性から相関まで

### Level A：基礎の再構成

#### A1. 一スピンの解析性

$N=1$ のCurie–Weiss分配関数を計算し、$\partial_b p_1$ と $\partial_b^2p_1$ を求め、$b=0$ に非解析性がないことを確認せよ。

- Level: A
- ID: SM8-A1

<!-- solution-start -->
**詳細解答**

$m=\pm1$ なので[有限模型の式](#prop-sm8-finite-analytic)に代入すると

$$
Z_1=e^{a/2}(e^b+e^{-b})=2e^{a/2}\cosh b.
$$

よって $p_1=a/2+\log(2\cosh b)$ であり、商の微分で

$$
\partial_b p_1=\frac{\sinh b}{\cosh b}=\tanh b,\qquad
\partial_b^2p_1=\frac1{\cosh^2b}.
$$

$b=0$ ではそれぞれ $0,1$ です。$\cosh b$ は実数上正なので対数に特異点はなく、左右の微分も一致します。
<!-- solution-end -->

#### A2. a=1で四次項が残る理由

$a=1,b=0$ で $\Phi_{a,b}(m)-\log2$ の $m^2$ 項と $m^4$ 項を求めよ。$m=0$ が局所最大である理由を説明せよ。

- Level: A
- ID: SM8-A2

<!-- solution-start -->
**詳細解答**

[エントロピーの展開](#lem-sm8-entropy-expansion)に $a=1$ を入れると

$$
\Phi_{1,0}(m)=\left(\log2-\frac{m^2}2-\frac{m^4}{12}+O(m^6)\right)+\frac{m^2}2
=\log2-\frac{m^4}{12}+O(m^6).
$$

二次項はちょうど相殺します。小さく非零の $m$ に対し $O(m^6)/m^4\to0$ なので、負の $-m^4/12$ が符号を決め、$m=0$ は狭義局所最大です。[零外場の最大点分類](../SM7/index.md#thm-sm7-critical)により、実際には全区間の唯一の最大点でもあります。
<!-- solution-end -->

#### A3. 一次元鎖の相関長

零外場開放鎖で $\beta J=(\log3)/2$、$N\ge4$ とする。$C(1),C(3),\xi$ を求め、指数減衰式を確認せよ。

- Level: A
- ID: SM8-A3

<!-- solution-start -->
**詳細解答**

まず

$$
q=\tanh\left(\frac{\log3}2\right)
=\frac{e^{\log3}-1}{e^{\log3}+1}=\frac{3-1}{3+1}=\frac12.
$$

[連結相関の定義と一次元鎖の例](#def-sm8-connected-correlation)に代入すると

$$
C(1)=q=\frac12,\qquad C(3)=q^3=\frac18,\qquad
\xi=-\frac1{\log q}=\frac1{\log2}.
$$

この $\xi$ による指数表示は $e^{-r/\xi}=e^{-r\log2}=2^{-r}$ で、直接の $q^r$ と一致します。
<!-- solution-end -->

#### A4. 二スピンの共分散を数える

零外場Curie–Weiss模型の $N=2$ において、$\mathbb E(\sigma_1\sigma_2)$ と $\operatorname{Var}(M_2)$ を計算し、共分散恒等式を確かめよ。

- Level: A
- ID: SM8-A4

<!-- solution-start -->
**詳細解答**

$M_2=\pm2$ の二配置の無次元重みはそれぞれ $e^{a}$、$M_2=0$ の二配置はそれぞれ1です。従って

$$
Z_2=2e^a+2,\qquad
\mathbb E(\sigma_1\sigma_2)
=\frac{2e^a-2}{2e^a+2}=\frac{e^a-1}{e^a+1}.
$$

零外場の反転対称性から各スピンの平均は0であり、これが $c_2$ です。また $M_2^2=4$ となるのは同方向の二配置だけなので

$$
\operatorname{Var}(M_2)=\mathbb EM_2^2
=\frac{8e^a}{2e^a+2}=\frac{4e^a}{e^a+1}.
$$

[共分散恒等式](#prop-sm8-exchangeable-correlation)の右辺は

$$
2+2c_2=2+2\frac{e^a-1}{e^a+1}
=\frac{4e^a}{e^a+1},
$$

と一致します。
<!-- solution-end -->

### Level B：主要導出と仮定の使い方

#### B1. 有限と無限の外場微分

$a>1$ を固定し、有限 $N$ の $p_N(a,b)$ の $b=0$ における一次導関数を求めよ。一方、極限圧力 $p(a,b)$ の右・左導関数を導き、なぜ微分と極限を交換できないか説明せよ。

- Level: B
- ID: SM8-B1

<!-- solution-start -->
**詳細解答**

[有限Curie–Weiss模型の解析性と応答](#prop-sm8-finite-analytic)より $\partial_b p_N=\mathbb Em_N$ です。零外場で正負の配置は等しい重みを持つため[SM7の全反転対称性](../SM7/index.md#prop-sm7-spin-flip)から

$$
\partial_b p_N(a,0)=\mathbb E_{N,a,0}m_N=0
$$

が全ての $N$ で成立します。

一方、零外場の極限最大点は $\pm m_*$ です。[SM7の正外場最大点](../SM7/index.md#thm-sm7-spontaneous)を $m(b)>0$ とすれば $m(b)\to m_*$。正の $b$ に対して

$$
p(a,0)+bm_*\le p(a,b)\le p(a,0)+bm(b).
$$

$b$ で割って極限を取ると右導関数は $m_*$。偶関数性 $p(a,b)=p(a,-b)$ により左導関数は $-m_*$ です。$m_*>0$ なので極限圧力の微分は存在しません。

各 $N$ の導関数は0でも、極限関数の右導関数は正です。[外場の非解析性定理](#thm-sm8-field-cusp)は、この二つの操作が交換不能であることを具体的に示しています。
<!-- solution-end -->

#### B2. 平方根則から圧力の特異項へ

$a=1+t$、$t>0$ が小さい場合の零外場Curie–Weiss模型で、$m_*(a)^2=3t+O(t^2)$ を自己無撞着方程式から導き、$p(a,0)-\log2$ の二次係数を求めよ。

- Level: B
- ID: SM8-B2

<!-- solution-start -->
**詳細解答**

正の最大点は $\operatorname{arctanh}m_*=(1+t)m_*$ を満たします。$m_*\to0$ なので[エントロピー展開](#lem-sm8-entropy-expansion)の級数を使って

$$
t=\frac{m_*^2}3+\frac{m_*^4}5+O(m_*^6).
$$

$y=m_*^2$ と置けば $t=y/3+O(y^2)$ です。十分小さい $y>0$ では $O(y^2)$ の絶対値を $y/6$ 以下に抑えられるため、$t\ge y/6$、すなわち $y=O(t)$ です。これを元の式へ戻すと $t=y/3+O(t^2)$ なので、$y=3t+O(t^2)$ が得られます。変分関数へ代入すると

$$
p(a,0)-\log2
=\frac t2m_*^2-\frac{m_*^4}{12}+O(m_*^6).
$$

ここで $m_*^2=3t+O(t^2)$ より $m_*^4=9t^2+O(t^3)$、$m_*^6=O(t^3)$ です。したがって

$$
p(a,0)-\log2
=\frac t2(3t+O(t^2))
-\frac1{12}(9t^2+O(t^3))+O(t^3)
=\frac34t^2+O(t^3).
$$

係数は $3/4$ です。エントロピーの負の四次項を落とすと $3/2$ と誤計算するので、二つの寄与を両方保持します。
<!-- solution-end -->

#### B3. 相関の熱力学極限

零外場Curie–Weiss模型で、$a>1$ と $0<a<1$ のそれぞれについて二点の連結相関の極限を求めよ。さらに $a>1$ で $\partial_h\mathbb Em_N$ の増大率を示せ。

- Level: B
- ID: SM8-B3

<!-- solution-start -->
**詳細解答**

[SM7の磁化集中](../SM7/index.md#thm-sm7-pressure)と[最大点分類](../SM7/index.md#thm-sm7-critical)を組み合わせます。$0<a<1$ では $m_N\to0$ が確率的に成立し、$|m_N|\le1$ より $\mathbb Em_N^2\to0$。$a>1$ では $|m_N|\to m_*$ が確率的に成立し、同じ有界性から $\mathbb Em_N^2\to m_*^2$ です。

[共分散恒等式](#prop-sm8-exchangeable-correlation)で

$$
c_N=\frac{N\mathbb Em_N^2-1}{N-1}
$$

にそれぞれ代入すると、極限は高温側で0、低温側で $m_*^2$ です。また零外場で $\mathbb Em_N=0$ なので

$$
\frac{\partial_h\mathbb Em_N}{N}
=\frac{\beta}{N^2}\operatorname{Var}(M_N)
=\beta\mathbb Em_N^2\longrightarrow\beta m_*^2.
$$

従って $\partial_h\mathbb Em_N=\beta m_*^2N+o(N)$。これは無限系の正外場枝の微分ではなく、有限系の零外場微分の増大率です。
<!-- solution-end -->

### Level C：相転移の複数の顔を統合する

#### C1. 圧力・臨界指数・相関を一つの模型から読む

零外場Curie–Weiss模型について、(i) 有限系の外場解析性、(ii) $a>1$ での極限圧力の外場非微分可能性、(iii) $a=1$ 近傍での磁化指数および臨界等温線、(iv) 低温側の異なる二スピンの相関極限を導出せよ。最後に、これを一次元開放鎖の有限温度相関長と比較して、**どの部分はまだ普遍性の証明ではないか**説明せよ。

- Level: C
- ID: SM8-C1

<!-- solution-start -->
**詳細解答**

**(i) 有限系。** [磁化別分配関数](../SM7/index.md#prop-sm7-multiplicity)では $Z_N(a,b)$ は正の指数関数の有限和です。任意の実 $b$ で正なので $\log Z_N$ は実解析関数です。$\partial_b p_N=\mathbb Em_N$ と有限和から微分できます。零外場では全反転で $\mathbb Em_N=0$ です。

**(ii) 極限圧力。** [変分表示](../SM7/index.md#thm-sm7-pressure)から $p(a,b)=\max_m\Phi_{a,b}(m)$。$a>1$ の零外場最大点は $\pm m_*$ です。[正外場の最大点](../SM7/index.md#thm-sm7-spontaneous) $m(b)\to m_*$ によって

$$
m_*\le\frac{p(a,b)-p(a,0)}b\le m(b)\quad(b>0).
$$

従って右導関数は $m_*$、$p(a,-b)=p(a,b)$ から左導関数は $-m_*$。有限系とは異なり極限で角ができます。

**(iii) 臨界指数。** $\operatorname{arctanh}m_*=am_*$ を $a=1+t$ で展開すると

$$
t=\frac{m_*^2}3+O(m_*^4),\qquad
m_*\sim\sqrt{3t}.
$$

従って秩序磁化指数は $1/2$ です。$a=1$、正の場では

$$
b=\operatorname{arctanh}m-m=\frac{m^3}3+O(m^5),
\qquad m\sim(3b)^{1/3}.
$$

よって臨界等温線指数は3です。高温側 $0<a<1$ では自己無撞着方程式 $\operatorname{arctanh}m=am+b$ を $b$ で微分し、

$$
\left(\frac1{1-m^2}-a\right)\frac{dm}{db}=1.
$$

零外場の解 $m=0$ では係数が $1-a>0$ なので、$\widehat\chi_+=1/(1-a)$ です。従って感受率指数は1となります（[臨界指数の定理](#thm-sm8-mean-field-exponents)）。

**(iv) 二点相関。** 零外場で $\mathbb E\sigma_i=0$ かつ $\mathbb Em_N^2\to m_*^2$ です。$M_N^2=N+2\sum_{i<j}\sigma_i\sigma_j$ に番号入替対称性を使えば

$$
N^2\mathbb Em_N^2=N+N(N-1)\mathbb E(\sigma_1\sigma_2),
$$

$$
\mathbb E(\sigma_1\sigma_2)
=\frac{N\mathbb Em_N^2-1}{N-1}\longrightarrow m_*^2>0.
$$

一方、[一次元開放鎖の相関式](../SM7/index.md#prop-sm7-chain)は $C(r)=\tanh(\beta J)^r$ で、有限の $\beta,J>0$ に対し $\xi=-1/\log\tanh(\beta J)<\infty$ です。距離を持たない全結合と、隣接点だけを結ぶ一次元鎖とでは幾何と極限が異なります。求めた三つの指数は**Curie–Weiss模型での計算結果**であり、すべてのIsing型模型が同じ指数を持つことや、一般模型間での普遍性を証明したものではありません。
<!-- solution-end -->

## 8. まとめと次の学習への橋

有限系の解析性は、無限系での相転移を妨げません。[圧力の外場方向の尖り](#thm-sm8-field-cusp)、[温度方向の二次非解析性](#thm-sm8-temperature-singularity)、[平均場臨界指数](#thm-sm8-mean-field-exponents)は、一つの変分関数から別々に導出できました。また[二点相関の極限](#thm-sm8-long-range-order)は、磁化が正負対称に混ざって平均0でも秩序を含み得ることを教えます。

この先、格子次元・短距離相互作用・相関長の発散・臨界指数の模型間比較へ進むには、平均場以外の厳密な手法が必要です。ここで確立した「どの極限を取り、どの微分や相関を測っているか」を、その出発点にしてください。
