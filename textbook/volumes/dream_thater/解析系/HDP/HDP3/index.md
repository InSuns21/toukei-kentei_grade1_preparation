# HDP3 sub-Gaussianとsub-exponentialの同値評価

[HDP1のHoeffding不等式](../HDP1/index.md#thm-hdp1-hoeffding)は値域の幅を、[HDP2のBernstein不等式](../HDP2/index.md#thm-hdp2-bernstein)は分散と片側上限を使っていました。しかし正規分布も指数分布も値域は無限です。これらを「有界でないから集中しない」と判定するのは不適切です。そこで、**大きな値の起こりにくさ**そのものを測る量へ移ります。

同じ性質を、尾部確率、全次数のモーメント、指数型積分の三通りで表せると、分布が与えられた場面では計算しやすい条件を、独立和を評価するときには指数モーメントを選べます。ただし「中心化した確率変数か」と「指数モーメントの評価が全実数で成立するか」は別の条件です。以下では定数を隠さずに往復し、その差が独立和の二種類の尾部にどう現れるか確かめます。

## 1. 確率変数の大きさを指数積分で測る

実数値確率変数 $X$ の絶対値が大きくなる頻度を測ります。指数関数を使うのは、大きな値を強く罰し、しかも[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)と結び付くからです。

まず二乗を指数に入れる尺度を導入します。$X$ が零に近いほど、この尺度は小さくなります。

<a id="def-hdp3-psi2"></a>

<!-- formal-statement-start -->
> **定義（sub-GaussianのOrliczノルム）**  
> 実数値確率変数 $X$ に対し、次の値を $\psi_2$ ノルムとする。条件を満たす $s>0$ がなければ値は $\infty$ とする。

$$
\|X\|_{\psi_2}
=\inf\left\{s>0:E\exp\left(\frac{X^2}{s^2}\right)\le2\right\}.
$$

> $\|X\|_{\psi_2}<\infty$ のとき $X$ をsub-Gaussian確率変数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp3-psi2 -->
**定義の確認**（Rademacher変数） $P(R=-1)=P(R=1)=1/2$ とすると、$R^2=1$ なので

$$
E e^{R^2/s^2}=e^{1/s^2}\le2
\quad\Longleftrightarrow\quad
s\ge(\log2)^{-1/2}.
$$

従って $\|R\|_{\psi_2}=1/\sqrt{\log2}$ です。単に有限と述べるのではなく、定義の積分条件と最小の尺度まで確かめられました。
<!-- definition-example-end -->

指数に絶対値の一次を入れると、二乗の場合より緩い条件になります。指数的に減衰する尾部を測るための尺度です。

<a id="def-hdp3-psi1"></a>

<!-- formal-statement-start -->
> **定義（sub-exponentialのOrliczノルム）**  
> 実数値確率変数 $X$ に対し、次の値を $\psi_1$ ノルムとする。条件を満たす $s>0$ がなければ $\infty$ とする。

$$
\|X\|_{\psi_1}
=\inf\left\{s>0:E\exp\left(\frac{|X|}{s}\right)\le2\right\}.
$$

> $\|X\|_{\psi_1}<\infty$ のとき $X$ をsub-exponential確率変数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp3-psi1 -->
**定義の確認**（両符号を取る指数変数） $Z$ は密度 $e^{-z}$（$z\ge0$）を持ち、$R$ は独立なRademacher変数とし、$X=RZ$ とします。$|X|=Z$ だから $s>1$ では

$$
E e^{|X|/s}
=\int_0^\infty e^{z/s}e^{-z}\,dz
=\frac{1}{1-1/s}=\frac{s}{s-1}.
$$

この値が $2$ 以下となるのは $s\ge2$ のときです。$s\le1$ では積分が発散するので $\|X\|_{\psi_1}=2$ です。さらに、$E|RZ|=E[Z]=1<\infty$ なので積は可積分であり、$R$ と $Z$ の独立性と[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)から $E[RZ]=E[R]E[Z]=0$ です。
<!-- definition-example-end -->

両者は、同じ確率空間上のほとんど確実に等しい変数を区別しません。また $\|cX\|_{\psi_\alpha}=|c|\|X\|_{\psi_\alpha}$（$\alpha=1,2$）です。これは上の定義で $s=|c|u$ と置換して確認できます。三角不等式についても、$a,b>0$ に対して期待値条件を満たす場合、$\Phi_\alpha(u)=e^{u^\alpha}-1$ の単調増加性と凸性から

$$
\begin{aligned}
\Phi_\alpha\left(\frac{|X+Y|}{a+b}\right)
&\le\Phi_\alpha\left(
\frac a{a+b}\frac{|X|}{a}
+\frac b{a+b}\frac{|Y|}{b}\right)\\
&\le\frac a{a+b}\Phi_\alpha(|X|/a)
+\frac b{a+b}\Phi_\alpha(|Y|/b).
\end{aligned}
$$

$a,b$ はそれぞれの指数積分条件を満たす正数として選んでいます。$E\Phi_\alpha(|X|/a)\le1$、$E\Phi_\alpha(|Y|/b)\le1$ なので、上の不等式で期待値を取ると

$$
E\Phi_\alpha\left(\frac{|X+Y|}{a+b}\right)
\le\frac{a}{a+b}+\frac{b}{a+b}=1.
$$

従って $E\exp((|X+Y|/(a+b))^\alpha)\le2$ となり、$\|X+Y\|_{\psi_\alpha}\le a+b$ です。適格な $a,b$ をそれぞれのinfimumへ近付けると三角不等式が従います。

零ノルムの検証では、適格な尺度の集合が上に閉じていることから、$\|X\|_{\psi_\alpha}=0$ なら全ての $s>0$ で積分条件が成立します。任意の $t>0$ について非負変数 $e^{(|X|/s)^\alpha}$ に[Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用して

$$
P(|X|>t)\le2\exp\left(-\frac{t^\alpha}{s^\alpha}\right)\longrightarrow0
\qquad(s\downarrow0)
$$

を得ます。従って $X=0$ がほとんど確実です。以上により、有限ノルムの確率変数をほとんど確実な等しさで同一視した空間上で、本当にノルムになっています。

## 2. sub-Gaussian：尾部・モーメント・指数積分

$\psi_2$ ノルムは、そのままでは分布の積分を計算する必要があります。実際には尾部を知っている場合も、モーメントを知っている場合もあります。以下の三条件が**定数倍の尺度の違いを除いて同値**であることを示します。

<a id="thm-hdp3-subgaussian-equivalence"></a>

<!-- formal-statement-start -->
> **定理（sub-Gaussianの三つの同値な評価）**  
> $X$ を実数値確率変数とする。次の三条件は、ある有限な正定数 $K$ をそれぞれ選び直してよいという意味で同値である。
>
> (I) $E e^{X^2/K^2}\le2$。
>
> (II) 全ての $t\ge0$ で次の尾部評価が成立する。

$$
P(|X|\ge t)\le2e^{-t^2/K^2}.
$$

> (III) 全ての実数 $p\ge1$ で次のモーメント評価が成立する。

$$
(E|X|^p)^{1/p}\le K\sqrt p.
$$

> 具体的には、(I) の定数 $K$ から (II) と (III) は同じ $K$ で従う。(II) の $K$ から (I) は $\sqrt3K$ で従い、(III) の $K$ から (I) は $2\sqrt e\,K$ で従う。
<!-- formal-statement-end -->

### 証明の見取り図

(I) から尾部にはMarkovの不等式、モーメントには $u^{p/2}e^{-u}$ の最大値を使います。尾部から積分へ戻すときは非負変数の尾部積分公式を指数関数に適用します。モーメントからは指数関数を級数展開して戻します。

<!-- proof-start -->
### 証明

**(I) $\Rightarrow$ (II)。** $t>0$ とし、非負変数 $e^{X^2/K^2}$ に[Markovの不等式](../HDP1/index.md#prop-hdp1-exponential-markov)の指数形を使います。事象 $\{|X|\ge t\}$ は $\{e^{X^2/K^2}\ge e^{t^2/K^2}\}$ だから

$$
P(|X|\ge t)\le e^{-t^2/K^2}E e^{X^2/K^2}
\le2e^{-t^2/K^2}.
$$

$t=0$ の場合は左辺 $1$、右辺 $2$ なので成立します。

**(I) $\Rightarrow$ (III)。** 任意の $u\ge0$ について、$u^{p/2}e^{-u}$ は $u=p/2$ で最大になります。実際、$u>0$ での導関数は $u^{p/2}e^{-u}(p/(2u)-1)$ なので、増加・減少が切り替わる点は $u=p/2$ です。従って

$$
u^{p/2}\le\left(\frac p{2e}\right)^{p/2}e^u.
$$

$u=X^2/K^2$ として期待値を取ると

$$
E|X|^p\le2K^p\left(\frac p{2e}\right)^{p/2}.
$$

$p$ 乗根を取ると $2^{1/p}/\sqrt{2e}\le2/\sqrt{2e}<1$（$p\ge1$）なので (III) です。

**(II) $\Rightarrow$ (I)。** $W=X^2\ge0$ に対して、非負変数の尾部積分公式を非負積分の順序交換から導きます。

$$
\begin{aligned}
E e^{W/(3K^2)}
&=1+E\int_0^W\frac1{3K^2}e^{u/(3K^2)}\,du\\
&=1+\int_0^\infty\frac1{3K^2}e^{u/(3K^2)}
P(W>u)\,du.
\end{aligned}
$$

(II) を $t=\sqrt u$ に使うと $P(W>u)\le2e^{-u/K^2}$ です。従って

$$
\begin{aligned}
E e^{W/(3K^2)}
&\le1+\frac2{3K^2}\int_0^\infty
e^{-2u/(3K^2)}\,du\\
&=1+\frac2{3K^2}\frac{3K^2}{2}=2.
\end{aligned}
$$

**(III) $\Rightarrow$ (I)。** 非負項の級数について期待値と和を交換すると、$a>0$ に対して

$$
E e^{X^2/(aK^2)}
=1+\sum_{m=1}^\infty\frac{E|X|^{2m}}{a^mK^{2m}m!}.
$$

(III) に $p=2m$ を代入し、$m!\ge(m/e)^m$ を使います。後者は $\log(m!)=\sum_{j=1}^m\log j\ge\int_1^m\log x\,dx\ge m\log m-m$ から確認できます。よって

$$
\frac{E|X|^{2m}}{a^mK^{2m}m!}
\le\frac{(2m)^m}{a^m m!}
\le\left(\frac{2e}{a}\right)^m.
$$

$a=4e$ なら級数和は $1+\sum_{m\ge1}2^{-m}=2$ です。従って $E e^{X^2/(4eK^2)}\le2$ が得られます。
<!-- proof-end -->

**定数について。** 定理の $K$ は一つの条件で与えられた数値を、他の条件でも絶対にそのまま使えるという意味ではありません。たとえばモーメントから積分へ戻るとき、上の証明では $2\sqrt e$ 倍が必要でした。正確な最良定数より、すべての次数に同じ構造の評価があることが重要です。

## 3. 中心化と全実数での指数モーメント

独立和を扱うには、$E e^{\lambda X}$ を制御したくなります。しかし $X=c\ne0$ は有界なのでsub-Gaussianでも、$e^{\lambda c}\le e^{C\lambda^2}$ はすべての $\lambda$ については成立しません。$\lambda$ を零へ近付けると、左辺に一次の項が残るからです。従ってここからは **$E[X]=0$** を必ず明記します。

<a id="thm-hdp3-subgaussian-mgf"></a>

<!-- formal-statement-start -->
> **定理（中心化sub-Gaussianと全実数の指数モーメント）**  
> $X$ は $E[X]=0$ の実数値確率変数とする。
>
> (a) $E e^{X^2/K^2}\le2$ を満たす $K>0$ があれば、全ての $\lambda\in\mathbb R$ で

$$
E e^{\lambda X}\le e^{2\lambda^2K^2}
$$

> が成立する。
>
> (b) ある $\sigma>0$ について全ての $\lambda\in\mathbb R$ で次が成立すれば、$\|X\|_{\psi_2}\le\sqrt6\,\sigma$ である。

$$
E e^{\lambda X}\le e^{\sigma^2\lambda^2/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

(a) は $|\lambda|K\le1$ では平均零を使って一次項を消し、$|\lambda|K\ge1$ では平方完成型の評価を使います。(b) は $\lambda$ を最適化して両側の尾部を得て、前節の同値定理に戻ります。

<!-- proof-start -->
### 証明

**(a) 小さいパラメータ。** まず任意の $u\in\mathbb R$ に対して $h(v)=e^{vu}$（$0\le v\le1$）と置きます。$h(0)=1$、$h'(0)=u$、$h''(v)=u^2e^{vu}$ なので、微分積分の基本定理を二回適用すると

$$
\begin{aligned}
e^u
&=1+u+u^2\int_0^1(1-v)e^{vu}\,dv\\
&\le1+u+u^2e^{|u|}\int_0^1(1-v)\,dv\\
&=1+u+\frac12u^2e^{|u|}.
\end{aligned}
$$

ここで $|\lambda|K\le1$ とし、$2ab\le a^2+b^2$ を $a=|\lambda|K$、$b=|X|/K$ に使うと

$$
|\lambda X|\le\frac{\lambda^2K^2}{2}
+\frac{X^2}{2K^2}
\le\frac12+\frac{X^2}{2K^2}.
$$

先ほどの指数関数の上界に $u=\lambda X$ を代入し、$E[X]=0$ で一次項を消すと

$$
E e^{\lambda X}
\le1+\frac{\lambda^2}2 E[X^2e^{|\lambda X|}]
\le1+\frac{\lambda^2e^{1/2}}2
E[X^2e^{X^2/(2K^2)}].
$$

$z\ge0$ で $ze^{-z/2}\le2/e$（最大点は $z=2$）であることから

$$
z e^{z/2}\le\frac2e e^z.
$$

$z=X^2/K^2$ を代入し、積分条件を使うと

$$
E[X^2e^{X^2/(2K^2)}]
\le\frac{2K^2}{e}E e^{X^2/K^2}
\le\frac{4K^2}{e}.
$$

従って $E e^{\lambda X}\le1+(2/\sqrt e)\lambda^2K^2\le e^{2\lambda^2K^2}$ です。

**(a) 大きいパラメータ。** $|\lambda|K\ge1$ の場合には平方の非負性から

$$
\lambda X\le\frac{X^2}{2K^2}+\frac{\lambda^2K^2}2.
$$

$z\ge0$ では $(e^{z/2}-1)^2\ge0$ から $e^{z/2}\le(1+e^z)/2$ です。指数を取ってこの評価を使うと

$$
\begin{aligned}
E e^{\lambda X}
&\le e^{\lambda^2K^2/2}E e^{X^2/(2K^2)}\\
&\le e^{\lambda^2K^2/2}
\frac{1+E e^{X^2/K^2}}2\\
&\le\frac32 e^{\lambda^2K^2/2}
\le e^{2\lambda^2K^2}.
\end{aligned}
$$

最後は $\lambda^2K^2\ge1$ と $\log(3/2)<3/2$ によります。(a) は全ての実数 $\lambda$ で成立しました。

**(b)。** $t>0$、$\lambda>0$ とすると、[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)により

$$
P(X\ge t)\le e^{-\lambda t}E e^{\lambda X}
\le e^{-\lambda t+\sigma^2\lambda^2/2}.
$$

指数は $\lambda=t/\sigma^2$ で最小になり、右辺は $e^{-t^2/(2\sigma^2)}$ です。$-X$ に同じ議論を使って

$$
P(|X|\ge t)\le2e^{-t^2/(2\sigma^2)}.
$$

[前節の三条件の同値定理](#thm-hdp3-subgaussian-equivalence)の (II) $\Rightarrow$ (I) に $K=\sqrt2\,\sigma$ を代入すると $\|X\|_{\psi_2}\le\sqrt3\sqrt2\,\sigma$ です。
<!-- proof-end -->

正規分布はsub-Gaussianの典型例です。$X\sim N(0,\sigma^2)$（$\sigma>0$）の密度は $(\sqrt{2\pi}\sigma)^{-1}e^{-x^2/(2\sigma^2)}$ です。指数モーメントの被積分関数について、平方完成すると

$$
\lambda x-\frac{x^2}{2\sigma^2}
=-\frac{(x-\sigma^2\lambda)^2}{2\sigma^2}
+\frac{\sigma^2\lambda^2}{2}.
$$

従って、全ての $\lambda\in\mathbb R$ について

$$
\begin{aligned}
E e^{\lambda X}
&=\frac1{\sqrt{2\pi}\sigma}\int_{-\infty}^{\infty}
e^{\lambda x-x^2/(2\sigma^2)}\,dx\\
&=e^{\sigma^2\lambda^2/2}
\frac1{\sqrt{2\pi}\sigma}\int_{-\infty}^{\infty}
e^{-(x-\sigma^2\lambda)^2/(2\sigma^2)}\,dx\\
&=e^{\sigma^2\lambda^2/2}.
\end{aligned}
$$

最後の積分は $y=(x-\sigma^2\lambda)/\sigma$ への変数変換で標準正規密度の全積分 $1$ に戻ります。この式は[中心化sub-Gaussianと全実数の指数モーメント](#thm-hdp3-subgaussian-mgf)の (b) に同じ $\sigma$ を代入できる条件を与えます。従って、値域を有界と仮定せずとも $\psi_2$ ノルムが有限と分かります。

## 4. 独立なsub-Gaussian和

中心化と全実数での指数モーメントがそろうと、[HDP1で用いた独立な指数モーメントの積](../HDP1/index.md#thm-hdp1-hoeffding)を再び使えます。違いは、各変数に確実な上限を置かないことです。

<a id="thm-hdp3-subgaussian-sum"></a>

<!-- formal-statement-start -->
> **定理（独立sub-Gaussian和の集中）**  
> $X_1,\ldots,X_n$ は相互に独立な実数値確率変数で、各 $E[X_i]=0$ とし、正数 $K_i$ に対して $E e^{X_i^2/K_i^2}\le2$ を満たすとする。$V=\sum_{i=1}^nK_i^2>0$ とすると、全ての $t>0$ で

$$
P\left(\left|\sum_{i=1}^nX_i\right|\ge t\right)
\le2\exp\left(-\frac{t^2}{8V}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

各変数の[中心化指数モーメント評価](#thm-hdp3-subgaussian-mgf)を独立性で積にし、最後に指数パラメータを最適化します。負の裾には $-X_i$ を使います。

<!-- proof-start -->
### 証明

相互独立性と[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)を用いると、全ての $\lambda\in\mathbb R$ に対し

$$
\begin{aligned}
E e^{\lambda\sum_iX_i}
&=\prod_{i=1}^n E e^{\lambda X_i}\\
&\le\prod_{i=1}^n e^{2\lambda^2K_i^2}
=e^{2\lambda^2V}.
\end{aligned}
$$

$t>0$、$\lambda>0$ に対し[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)から

$$
P\left(\sum_iX_i\ge t\right)
\le e^{-\lambda t+2\lambda^2V}.
$$

指数関数は単調増加なので、指数の二次式 $q(\lambda)=-\lambda t+2\lambda^2V$ を $\lambda>0$ で最小化します。$V>0$ から

$$
q'(\lambda)=-t+4V\lambda=0
\quad\Longleftrightarrow\quad
\lambda_*=\frac{t}{4V}>0
$$

となり、$q''(\lambda)=4V>0$ です。実際に代入すると

$$
q(\lambda_*)
=-\frac{t^2}{4V}+\frac{2Vt^2}{16V^2}
=-\frac{t^2}{8V}.
$$

$-X_i$ も平均零で同じ積分条件を満たすので、左裾に同じ評価が成り立ちます。[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)で足せば結論です。
<!-- proof-end -->

**重み付き和への使い方。** 定義から $\|a_iX_i\|_{\psi_2}=|a_i|\|X_i\|_{\psi_2}$ なので、上の定理の $K_i$ を $|a_i|K_i$ に取り換えれば $\sum_i a_iX_i$ を扱えます。零の重みの項は和から除けばよいです。

## 5. sub-exponential：一次型の尾部とモーメント

sub-exponentialでは、$p$ 次モーメントは $\sqrt p$ ではなく $p$ に比例します。その違いは大きい偏差で効きます。

<a id="thm-hdp3-subexponential-equivalence"></a>

<!-- formal-statement-start -->
> **定理（sub-exponentialの三つの同値な評価）**  
> $X$ を実数値確率変数とする。次の三条件は、各条件で正定数 $K$ を選び直してよいという意味で同値である。
>
> (I) $E e^{|X|/K}\le2$。
>
> (II) 全ての $t\ge0$ で次が成立する。

$$
P(|X|\ge t)\le2e^{-t/K}.
$$

> (III) 全ての整数 $m\ge1$ で次が成立する。

$$
(E|X|^m)^{1/m}\le K m.
$$

> 具体的には、(I) の $K$ から (II) は同じ $K$、(III) は $2K$ で従う。(II) の $K$ から (I) は $3K$、(III) の $K$ から (I) は $3eK$ で従う。
<!-- formal-statement-end -->

### 証明の見取り図

(I) から指数Markov法と階乗のモーメント評価を取り出します。(II) からの逆向きは尾部積分、(III) からの逆向きは指数関数の級数に戻る方法です。

<!-- proof-start -->
### 証明

**(I) $\Rightarrow$ (II)。** $t>0$ に対して、非負確率変数 $e^{|X|/K}$ に[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を適用すると

$$
P(|X|\ge t)
=P(e^{|X|/K}\ge e^{t/K})
\le e^{-t/K}E e^{|X|/K}
\le2e^{-t/K}.
$$

$t=0$ も成立します。

**(I) $\Rightarrow$ (III)。** $u\ge0$ なら $e^u\ge u^m/m!$ です。$u=|X|/K$ と置いて期待値を取ると

$$
E|X|^m\le m!K^mE e^{|X|/K}
\le2m!K^m\le2m^mK^m.
$$

$m$ 乗根を取って $2^{1/m}\le2$ を使えば $(E|X|^m)^{1/m}\le2Km$ です。

**(II) $\Rightarrow$ (I)。** $W=|X|$ とし、$s>K$ を選びます。先ほどと同じ非負積分の順序交換により

$$
\begin{aligned}
E e^{W/s}
&=1+\int_0^\infty\frac1s e^{t/s}P(W>t)\,dt\\
&\le1+\frac2s\int_0^\infty e^{-t(1/K-1/s)}\,dt\\
&=1+\frac{2K}{s-K}.
\end{aligned}
$$

$s=3K$ と置けば $E e^{|X|/(3K)}\le2$ です。

**(III) $\Rightarrow$ (I)。** $a>e$ とし、指数の級数と非負項の期待値の交換から

$$
\begin{aligned}
E e^{|X|/(aK)}
&=1+\sum_{m=1}^\infty
\frac{E|X|^m}{(aK)^m m!}\\
&\le1+\sum_{m=1}^\infty\frac{m^m}{a^m m!}\\
&\le1+\sum_{m=1}^\infty(e/a)^m.
\end{aligned}
$$

最後は前節と同じ $m!\ge(m/e)^m$ を使いました。$a=3e$ なら右辺は $1+1/2<2$ なので (I) を満たします。
<!-- proof-end -->

### 一方通行の包含と反例

sub-Gaussianならsub-exponentialです。実際、$E e^{X^2/K^2}\le2$ のとき

$$
\frac{|X|}{2K}\le\frac{X^2}{4K^2}+\frac14
$$

です。さらに $z\ge0$ で指数関数の凸性から $e^{z/4}\le(3+e^z)/4$ が成り立ちます。これを $z=X^2/K^2$ に適用してから期待値を取ると

$$
\begin{aligned}
E e^{|X|/(2K)}
&\le e^{1/4}\left(\frac34+\frac14 E e^{X^2/K^2}\right)\\
&\le\frac54 e^{1/4}<2.
\end{aligned}
$$

従って $\|X\|_{\psi_1}\le2\|X\|_{\psi_2}$ です。逆は偽です。第1節の $X=RZ$ は $\|X\|_{\psi_1}=2$ でしたが、どの $s>0$ についても

$$
E e^{X^2/s^2}=\int_0^\infty e^{z^2/s^2-z}\,dz=\infty.
$$

たとえば $z\ge2s^2$ なら $z^2/s^2-z\ge z$ なので積分が発散します。失われているのは**二次指数の可積分性**であり、平均零も満たしているため中心化の問題ではありません。

## 6. sub-exponentialの局所指数モーメントと独立和

$\psi_1$ 条件からは、sub-Gaussianのような全ての $\lambda$ での二次指数上界は得られません。$E e^{\lambda X}$ が有限である範囲自体が制限されるからです。そこで、零の近くでだけ二次型の評価を示します。

<a id="lem-hdp3-subexponential-local-mgf"></a>

<!-- formal-statement-start -->
> **補題（中心化sub-exponentialの局所指数モーメント）**  
> $Y$ は $E[Y]=0$ の実数値確率変数とし、$K>0$ で $E e^{|Y|/K}\le2$ を満たすとする。このとき $|\lambda|\le1/(2K)$ なら

$$
E e^{\lambda Y}\le e^{4\lambda^2K^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[sub-exponentialのモーメント評価](#thm-hdp3-subexponential-equivalence)によって $m$ 次モーメントを階乗で抑えます。指数の級数から平均零で一次を取り去り、残った等比級数を評価します。

<!-- proof-start -->
### 証明

$\psi_1$ の積分条件から、任意の整数 $m\ge1$ について

$$
E|Y|^m\le2m!K^m.
$$

$|\lambda|\le1/(2K)$ なら $E e^{|\lambda||Y|}\le E e^{|Y|/K}\le2$ です。従って指数級数の期待値と総和を絶対収束により交換できます。$E[Y]=0$ なので

$$
\begin{aligned}
E e^{\lambda Y}
&=1+\sum_{m=2}^\infty\frac{\lambda^mE[Y^m]}{m!}\\
&\le1+\sum_{m=2}^\infty\frac{|\lambda|^mE|Y|^m}{m!}\\
&\le1+2\sum_{m=2}^\infty(|\lambda|K)^m\\
&=1+\frac{2(|\lambda|K)^2}{1-|\lambda|K}.
\end{aligned}
$$

分母は $1-|\lambda|K\ge1/2$ なので右辺は $1+4\lambda^2K^2$ 以下です。$1+u\le e^u$ を使って結論が従います。
<!-- proof-end -->

<a id="thm-hdp3-subexponential-sum"></a>

<!-- formal-statement-start -->
> **定理（独立sub-exponential和の二領域集中）**  
> $Y_1,\ldots,Y_n$ は相互に独立な実数値確率変数で、$E[Y_i]=0$ とし、正数 $K_i$ に対して $E e^{|Y_i|/K_i}\le2$ を満たすとする。$V=\sum_iK_i^2>0$、$L=\max_iK_i>0$ とすれば、全ての $t>0$ に対して

$$
P\left(\left|\sum_{i=1}^nY_i\right|\ge t\right)
\le2\exp\left\{-\min\left(
\frac{t^2}{16V},\frac{t}{4L}
\right)\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[局所指数モーメントの補題](#lem-hdp3-subexponential-local-mgf)を積にすると、$\lambda\le1/(2L)$ だけに許される二次関数の評価が得られます。二次関数の最小点が許容範囲内なら二次尾部、外なら境界点を使って一次尾部になります。

<!-- proof-start -->
### 証明

相互独立性と[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)より、$0<\lambda\le1/(2L)$ では $\lambda\le1/(2K_i)$ が全 $i$ に成り立つので

$$
\begin{aligned}
E e^{\lambda\sum_iY_i}
&=\prod_i E e^{\lambda Y_i}\\
&\le\prod_i e^{4\lambda^2K_i^2}
=e^{4\lambda^2V}.
\end{aligned}
$$

[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)で

$$
P\left(\sum_iY_i\ge t\right)\le e^{-\lambda t+4\lambda^2V}.
$$

**$0<t\le4V/L$ の場合。** $\lambda=t/(8V)$ と置けば $0<\lambda\le1/(2L)$ であり、

$$
-\lambda t+4\lambda^2V
=-\frac{t^2}{8V}+\frac{t^2}{16V}
=-\frac{t^2}{16V}.
$$

**$t>4V/L$ の場合。** 許容範囲の端 $\lambda=1/(2L)$ を選びます。$V/L^2<t/(4L)$ なので

$$
-\lambda t+4\lambda^2V
=-\frac{t}{2L}+\frac{V}{L^2}
<-\frac{t}{4L}.
$$

同じ二つの評価を $-Y_i$ に適用できます。最後に[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)で上下の裾を足します。境界 $t=4V/L$ では二つの指数は一致します。
<!-- proof-end -->

**標本平均。** 独立同分布な平均零の $Y_i$ が $E e^{|Y_i|/K}\le2$ を満たすなら $V=nK^2$、$L=K$ です。$\overline Y=n^{-1}\sum_iY_i$ に $t=n\varepsilon$ を代入すると

$$
P(|\overline Y|\ge\varepsilon)
\le2\exp\left\{-n\min\left(
\frac{\varepsilon^2}{16K^2},\frac{\varepsilon}{4K}
\right)\right\}.
$$

$\varepsilon\le4K$ では二次の指数、$\varepsilon>4K$ では一次の指数が有効です。これは[HDP2のBernstein不等式](../HDP2/index.md#thm-hdp2-bernstein)に似ていますが、ここでの $K$ は確実な上限ではなく指数型の尾部尺度です。

## 7. 仮定を外したときの失敗機構

**中心化を外す場合。** $X\equiv1$ はsub-Gaussianですが、$E e^{\lambda X}=e^\lambda$ です。もし全 $\lambda$ で $e^\lambda\le e^{C\lambda^2}$ と置けば、$0<\lambda<1/C$ で $\lambda>C\lambda^2$ となり矛盾します。中心化して $X-E[X]=0$ とすれば一次項の障害は消えます。

**独立性を外す場合。** 一つのRademacher変数 $R$ を $n$ 回使って $X_i=R$ とします。各 $X_i$ はsub-Gaussianですが、$\sum_iX_i=nR$ で

$$
P\left(\left|\sum_iX_i\right|\ge n\right)=1.
$$

$n$ 個の指数モーメントを積にする箇所は、同じ $R$ の複製には使えません。ノルムが有限である事実だけから $n$ に比例した指数減衰を結論するのは誤りです。

**指数モーメントの適用範囲。** 第1節の $X=RZ$ は平均零でsub-exponentialですが、$E e^{\lambda X}$ は $|\lambda|\ge1$ で発散します。従って[局所指数モーメントの補題](#lem-hdp3-subexponential-local-mgf)にある $\lambda$ の制限を、最適化の途中で忘れてはいけません。

## 8. 演習：尾部・積分・独立和を往復する

**Level A：定義と最小の検算**

### A1. 二点分布の二つのノルム

$P(R=1)=P(R=-1)=1/2$ のとき $\|R\|_{\psi_2}$ と $\|R\|_{\psi_1}$ を定義から求めよ。

- Level: A
- ID: HDP3-A1

<!-- solution-start -->
**詳細解答**　$|R|=R^2=1$ が確率一なので、$s>0$ に対して

$$
E e^{R^2/s^2}=e^{1/s^2},\qquad
E e^{|R|/s}=e^{1/s}.
$$

前者が $2$ 以下の条件は $1/s^2\le\log2$、すなわち $s\ge1/\sqrt{\log2}$ です。後者では $1/s\le\log2$、すなわち $s\ge1/\log2$ です。従って

$$
\|R\|_{\psi_2}=\frac1{\sqrt{\log2}},
\qquad
\|R\|_{\psi_1}=\frac1{\log2}.
$$
<!-- solution-end -->

### A2. 尾部と二次モーメント

$E e^{X^2/K^2}\le2$ を満たす $K>0$ と実数値確率変数 $X$ について、$P(|X|\ge2K)$ を抑え、さらに $E[X^2]\le K^2\log2$ を示せ。

- Level: A
- ID: HDP3-A2

<!-- solution-start -->
**詳細解答**　非負変数 $e^{X^2/K^2}$ に[Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると

$$
P(|X|\ge2K)
=P(e^{X^2/K^2}\ge e^4)
\le e^{-4}E e^{X^2/K^2}
\le2e^{-4}.
$$

さらに $z\le e^z$（$z\ge0$）なので $E X^2<\infty$ です。$a=E[X^2]/K^2$ と置くと、$e^v\ge1+v$ に $v=z-a$ を代入して $e^z\ge e^a(1+z-a)$ が得られます。ここで $z=X^2/K^2$ として期待値を取れば

$$
e^{E[X^2]/K^2}
\le E e^{X^2/K^2}\le2.
$$

対数を取れば $E[X^2]/K^2\le\log2$ です。前半と後半は別の不等式であり、一方だけを証明して終わりにはできません。
<!-- solution-end -->

### A3. 指数分布を符号付きにする

$Z$ は密度 $e^{-z}$（$z\ge0$）、$R$ は独立なRademacher変数とし、$X=RZ$ とする。$E[X]=0$、$\|X\|_{\psi_1}=2$、$\|X\|_{\psi_2}=\infty$ を示せ。

- Level: A
- ID: HDP3-A3

<!-- solution-start -->
**詳細解答**　$E|RZ|=E[Z]=1$ で積は可積分です。独立性と[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)から $E[X]=E[R]E[Z]=0$ です。$|X|=Z$ なので $s>1$ では

$$
E e^{|X|/s}
=\int_0^\infty e^{-(1-1/s)z}\,dz
=\frac{s}{s-1}.
$$

$s\le1$ では積分が発散します。$s/(s-1)\le2$ は $s\ge2$ と同値なので $\psi_1$ ノルムは $2$ です。一方、任意の $s>0$ について $z\ge2s^2$ では $z^2/s^2-z\ge z$ です。従って

$$
E e^{X^2/s^2}
\ge\int_{2s^2}^\infty e^z\,dz=\infty.
$$

二乗指数積分を有限にできないので $\psi_2$ ノルムは無限大です。
<!-- solution-end -->

### A4. 階乗のモーメント

$E e^{|Y|/K}\le2$（$K>0$）とするとき、整数 $m\ge1$ に対して $E|Y|^m\le2m!K^m$ を導け。特に $E Y^2\le4K^2$ を示せ。

- Level: A
- ID: HDP3-A4

<!-- solution-start -->
**詳細解答**　$u\ge0$ なら指数関数の級数 $e^u=\sum_{j\ge0}u^j/j!$ は全項非負なので $e^u\ge u^m/m!$ です。$u=|Y|/K$ として

$$
|Y|^m\le m!K^m e^{|Y|/K}.
$$

期待値を取って $E|Y|^m\le m!K^m E e^{|Y|/K}\le2m!K^m$ を得ます。$m=2$ なら $2\cdot2!K^2=4K^2$ です。
<!-- solution-end -->

### A5. 中心化が必要な理由

$X$ が $P(X=1)=p$、$P(X=0)=1-p$（$0<p<1$）に従うとき、$X$ はsub-Gaussianであることを示し、$E e^{\lambda X}\le e^{C\lambda^2}$ がすべての $\lambda>0$ で成立する $C<\infty$ は存在しないと示せ。

- Level: A
- ID: HDP3-A5

<!-- solution-start -->
**詳細解答**　$X^2\le1$ なので $K=1/\sqrt{\log2}$ を使えば

$$
E e^{X^2/K^2}\le e^{1/K^2}=2.
$$

従ってsub-Gaussianです。一方、$e^\lambda\ge1+\lambda$ より

$$
E e^{\lambda X}=1-p+pe^\lambda\ge1+p\lambda.
$$

仮に $E e^{\lambda X}\le e^{C\lambda^2}$ が全 $\lambda>0$ で成立する有限な $C$ があれば、両辺から $1$ を引き $\lambda$ で割ることで

$$
p\le\frac{E e^{\lambda X}-1}{\lambda}
\le\frac{e^{C\lambda^2}-1}{\lambda}\longrightarrow0
\qquad(\lambda\downarrow0)
$$

となります。しかし $p>0$ なので矛盾します。$X-p$ に中心化すれば、一次項の問題は解消します。
<!-- solution-end -->

**Level B：同値条件と和の使い分け**

### B1. モーメントから指数積分への復元

実数値 $X$ が全ての $p\ge1$ で $(E|X|^p)^{1/p}\le K\sqrt p$ を満たすとする。$E e^{X^2/(4eK^2)}\le2$ を、級数と階乗評価を明示して導け。

- Level: B
- ID: HDP3-B1

<!-- solution-start -->
**詳細解答**　$p=2m$ とすれば $E|X|^{2m}\le K^{2m}(2m)^m$ です。指数級数の部分和は各標本点で増加するので、有限和の期待値を取ってから単調収束で極限を通すと

$$
\begin{aligned}
E e^{X^2/(4eK^2)}
&=1+\sum_{m=1}^\infty
\frac{E|X|^{2m}}{(4eK^2)^m m!}\\
&\le1+\sum_{m=1}^\infty\frac{(2m)^m}{(4e)^m m!}.
\end{aligned}
$$

$\log(m!)\ge m\log m-m$ より $m!\ge(m/e)^m$ なので、各項は

$$
\frac{(2m)^m}{(4e)^m m!}
\le\frac{(2m)^m}{(4e)^m(m/e)^m}
=2^{-m}.
$$

従って全体は $1+\sum_{m\ge1}2^{-m}=2$ 以下です。
<!-- solution-end -->

### B2. 重み付きsub-Gaussian和

独立で平均零の $X_i$ が $E e^{X_i^2/K_i^2}\le2$ を満たすとする。実数の重み $a_i$ に対して $W=\sum_i a_iX_i$ と置き、$V_a=\sum_i a_i^2K_i^2>0$ のとき $P(|W|\ge t)$ の上界を導け。零の重みの扱いも述べよ。

- Level: B
- ID: HDP3-B2

<!-- solution-start -->
**詳細解答**　$a_i\ne0$ なら

$$
E\exp\left(\frac{(a_iX_i)^2}{(|a_i|K_i)^2}\right)
=E e^{X_i^2/K_i^2}\le2.
$$

各 $a_iX_i$ は平均零で、相互独立性も保たれます。[独立sub-Gaussian和の定理](#thm-hdp3-subgaussian-sum)へ尺度 $|a_i|K_i$ を代入すると、その二乗和は $V_a$ なので

$$
P(|W|\ge t)\le2e^{-t^2/(8V_a)},\qquad t>0.
$$

$a_i=0$ の項は確率一で零なので除いてから定理を使えます。もし $V_a=0$ なら $W=0$ が確率一で、$t>0$ の確率は零です。
<!-- solution-end -->

### B3. 指数変数の標本平均

独立な $R_i$（Rademacher）と $Z_i$（密度 $e^{-z}$、$z\ge0$）の組を $i=1,\ldots,n$ にわたり相互独立に取り、$Y_i=R_iZ_i$ とする。$P(|n^{-1}\sum_iY_i|\ge\varepsilon)$ の十分な上界を導き、二次尾部から一次尾部へ切り替わる $\varepsilon$ を求めよ。

- Level: B
- ID: HDP3-B3

<!-- solution-start -->
**詳細解答**　各 $Y_i=R_iZ_i$ は可積分です。$R_i$ と $Z_i$ の独立性および[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)から

$$
E Y_i=E R_i\, E Z_i=0.
$$

また $|Y_i|=Z_i$ と指数分布の密度を使うと

$$
E e^{|Y_i|/2}=E e^{Z_i/2}
=\int_0^\infty e^{z/2}e^{-z}\,dz
=\int_0^\infty e^{-z/2}\,dz=2.
$$

従って[独立sub-exponential和の定理](#thm-hdp3-subexponential-sum)に $K_i=2$ を選べて

$$
V=\sum_iK_i^2=4n,\qquad L=2.
$$

$\overline Y=n^{-1}\sum_iY_i$ の偏差 $|\overline Y|\ge\varepsilon$ は $|\sum_iY_i|\ge n\varepsilon$ と同じ事象です。$t=n\varepsilon$ を代入して

$$
\begin{aligned}
P(|\overline Y|\ge\varepsilon)
&\le2\exp\left\{-\min\left(
\frac{n^2\varepsilon^2}{16\cdot4n},
\frac{n\varepsilon}{4\cdot2}\right)\right\}\\
&=2\exp\left\{-n\min\left(\frac{\varepsilon^2}{64},
\frac{\varepsilon}{8}\right)\right\}.
\end{aligned}
$$

二つの指数が等しい点は $\varepsilon^2/64=\varepsilon/8$、すなわち $\varepsilon=8$（$\varepsilon>0$）です。$\varepsilon\le8$ では二次の項、$\varepsilon\ge8$ では一次の項が最小になります。
<!-- solution-end -->

### B4. 完全従属では和の評価が破綻する

一つのRademacher変数 $R$ に対し $X_1=\cdots=X_{64}=R$ とする。各 $X_i$ は $K_i=2$ でsub-Gaussianの積分条件を満たすことを確認し、独立性を誤って仮定した場合の $t=64$ の上界が実確率と矛盾することを示せ。

- Level: B
- ID: HDP3-B4

<!-- solution-start -->
**詳細解答**　各 $X_i^2=1$ なので

$$
E e^{X_i^2/2^2}=e^{1/4}<2.
$$

従って各変数単独では定理の積分条件を満たします。形式上の二乗尺度の和は $V=\sum_{i=1}^{64}4=256$ なので、独立と誤認すると

$$
P\left(\left|\sum_{i=1}^{64}X_i\right|\ge64\right)
\le2\exp\left(-\frac{64^2}{8\cdot256}\right)
=2e^{-2}<1
$$

となります。しかし $\sum_iX_i=64R$ なので真の確率は $1$ です。誤りは分布の尾部条件ではなく、[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)に必要な相互独立性を欠くことです。
<!-- solution-end -->

**Level C：多座標の同時保証を設計する**

### C1. sub-exponentialな高次元標本平均

整数 $n,d\ge1$、$K,\varepsilon>0$、$0<\delta<1$ とする。実数値確率変数 $Y_{ij}$（$1\le i\le n,\ 1\le j\le d$）は、各 $j$ を固定すると $i=1,\ldots,n$ に関して相互独立で、$E Y_{ij}=0$、$E e^{|Y_{ij}|/K}\le2$ を満たす。異なる $j$ の間の独立性は仮定しない。$\overline Y_j=n^{-1}\sum_iY_{ij}$ とする。

1. $P(\max_j|\overline Y_j|<\varepsilon)\ge1-\delta$ とする十分な $n$ を求めよ。
2. さらに各変数が $E e^{Y_{ij}^2/K^2}\le2$ を満たす場合、対応するsub-Gaussian版の十分な $n$ を導け。
3. 列内の独立性まで外すと失敗する例を $d=1$ で示せ。

- Level: C
- ID: HDP3-C1

<!-- solution-start -->
**詳細解答**

**(1)** 固定した列 $j$ について[独立sub-exponential和の定理](#thm-hdp3-subexponential-sum)を使います。$V=nK^2$、$L=K$、$t=n\varepsilon$ であり、

$$
\begin{aligned}
P(|\overline Y_j|\ge\varepsilon)
&\le2\exp\left\{-\min\left(
\frac{n^2\varepsilon^2}{16nK^2},
\frac{n\varepsilon}{4K}\right)\right\}\\
&=2\exp\left\{-n\min\left(
\frac{\varepsilon^2}{16K^2},\frac{\varepsilon}{4K}\right)\right\}.
\end{aligned}
$$

$G=\{\max_{1\le j\le d}|\overline Y_j|<\varepsilon\}$ とすると、補集合は $\{|\overline Y_j|\ge\varepsilon\}$ の和集合です。[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)から

$$
P(G^c)\le2d\exp\left\{-n\min\left(
\frac{\varepsilon^2}{16K^2},\frac{\varepsilon}{4K}\right)\right\}.
$$

この右辺を $\delta$ 以下にするには、対数を取って

$$
n\ge\max\left\{
\frac{16K^2}{\varepsilon^2},\frac{4K}{\varepsilon}
\right\}\log\frac{2d}{\delta}
$$

とすれば十分です。$n$ は整数なので実際には右辺を切り上げます。列間の独立性は使っていません。

**(2)** 新しい条件から各 $Y_{ij}$ はsub-Gaussianです。固定した列に[独立sub-Gaussian和の定理](#thm-hdp3-subgaussian-sum)を $V=nK^2$、$t=n\varepsilon$ として使うと

$$
P(|\overline Y_j|\ge\varepsilon)
\le2e^{-n\varepsilon^2/(8K^2)}.
$$

再び和集合の劣加法性から $P(G^c)\le2d e^{-n\varepsilon^2/(8K^2)}$ です。従って

$$
n\ge\frac{8K^2}{\varepsilon^2}\log\frac{2d}{\delta}
$$

が十分です。同じ $K$ という表記でも、(1) と (2) は異なる指数積分条件を課している点に注意します。

**(3)** $d=1$ とし、一つのRademacher変数 $R$ を全ての $i$ に複製して $Y_{i1}=R$ とします。$K=2$ なら

$$
E e^{|R|/K}=e^{1/2}<2,
\qquad
E e^{R^2/K^2}=e^{1/4}<2
$$

です。各変数は平均零であり、(1) のsub-exponential条件だけでなく、(2) のより強いsub-Gaussian条件も満たします。しかし $\overline Y_1=R$ なので $0<\varepsilon<1$ では

$$
P(|\overline Y_1|\ge\varepsilon)=1
$$

がどれほど $n$ を増やしても変わりません。列内の独立性を失うと指数モーメントを積にできず、(1) と (2) の標本数保証は使えません。
<!-- solution-end -->

## 9. 次章への接続

sub-Gaussianは全実数での二次指数モーメント、sub-exponentialは零近くでの二次指数モーメントを介して、独立和の集中を導けました。次は独立な入力の関数 $f(X_1,\ldots,X_n)$ を考えます。和でない関数の変動は各変数の入れ替えが及ぼす差として測り、Doob差分と有界差分不等式へ進みます。
