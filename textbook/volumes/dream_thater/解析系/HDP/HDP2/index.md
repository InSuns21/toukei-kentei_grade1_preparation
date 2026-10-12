# HDP2 Bennett・Bernstein不等式と分散依存の集中

[Hoeffdingの不等式](../HDP1/index.md#thm-hdp1-hoeffding)は、独立な変数の値域の幅だけで平均の偏差を抑えます。ところが、ほとんど常に零で、ごく稀にだけ一を取る観測と、半分の確率で零・一を取る観測とでは、同じ幅でも変動の大きさが違います。幅だけに着目した評価では、その違いが消えます。

そこで今度は、**個々の変数の上方の限界**と**分散の和**を同時に残します。まず指数関数の余りを二乗項で評価し、次に独立和の指数モーメントから分散を残した精密な右裾評価を得ます。最後に計算しやすい二次・一次型の右裾評価へ進みます。大きな偏差と小さな偏差で、確率の減り方が切り替わる理由も途中の式から確認しましょう。

## 1. 幅だけでは見えない稀な変動

$X$ が確率 $p$ で $1$、確率 $1-p$ で $0$ を取るとします。$0<p<1$ のとき、値域は $[0,1]$ ですが、平均と分散は

$$
E[X]=p,\qquad \operatorname{Var}(X)=p(1-p)
$$

です。$p=1/2$ と $p=1/100$ では幅は同じなのに、後者の分散は大幅に小さくなります。独立な $n$ 回の観測で右側へずれる確率を、分散 $np(1-p)$ を残したまま評価できれば、稀な出来事に適した標本数を設計できます。

以下、$Y_i=X_i-E[X_i]$、$S=\sum_{i=1}^nY_i$ と置きます。主に用いる量は

$$
E[Y_i]=0,\qquad v=\sum_{i=1}^nE[Y_i^2]
$$

です。ここで $v$ は和 $S$ の分散と一致します。ただしその同一視には独立性が必要です。個別の $Y_i$ が非対称であることは許されます。

## 2. 指数関数の余りを制御する

指数関数を二次まで取り出すと、期待値を取ったとき一次項が消え、残る二次項を分散で扱えます。ただし単なるTaylor近似では不等式になりません。余りの係数が、変数の上限に対して単調になることを示します。

<a id="lem-hdp2-exponential-remainder"></a>

<!-- formal-statement-start -->
> **補題（指数関数の二次余剰）**  
> $b>0$、$\lambda\ge0$ とし、実数 $y\le b$ とする。このとき

$$
e^{\lambda y}
\le 1+\lambda y+
\frac{e^{\lambda b}-1-\lambda b}{b^2}\,y^2
$$

> が成り立つ。$y$ は下から有界でなくてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

余りを $y^2$ と積分係数の積で表します。$y=0$ の場合も除算を使わないので、そのまま扱えます。指数関数の単調性だけで、$y\le b$ のとき係数が $b$ における値以下と分かります。

<!-- proof-start -->
### 証明

関数 $f(t)=e^{\lambda t y}$ を $0\le t\le1$ で考えます。導関数と初期値は

$$
f(0)=1,\qquad f'(0)=\lambda y,\qquad
f''(t)=\lambda^2y^2e^{\lambda ty}
$$

です。微分積分の基本定理を二回適用すると

$$
\begin{aligned}
e^{\lambda y}-1-\lambda y
&=\int_0^1(f'(t)-f'(0))\,dt\\
&=\int_0^1\int_0^t f''(s)\,ds\,dt\\
&=\lambda^2y^2\int_0^1(1-s)e^{\lambda sy}\,ds.
\end{aligned}
$$

二重積分の領域は $0\le s\le t\le1$ であり、順序を入れ替えると固定した $s$ に対する $t$ の長さは $1-s$ です。$\lambda s\ge0$、$y\le b$ なので

$$
e^{\lambda s y}\le e^{\lambda s b}.
$$

これを積分表示へ代入して

$$
e^{\lambda y}-1-\lambda y
\le \lambda^2y^2\int_0^1(1-s)e^{\lambda sb}\,ds.
$$

先ほどの等式を $y=b$ に適用すると

$$
\lambda^2\int_0^1(1-s)e^{\lambda sb}\,ds
=\frac{e^{\lambda b}-1-\lambda b}{b^2}.
$$

この係数を戻せば主張を得ます。$y=0$ と $\lambda=0$ でも積分表示はそのまま成立します。
<!-- proof-end -->

ここで扱ったのは **$y\le b$ という片側条件**です。下側の限界を要しないのは、右裾だけを抑えたいからです。二次の余りは期待値を取ると分散へ変わります。

<a id="lem-hdp2-variance-mgf"></a>

<!-- formal-statement-start -->
> **補題（片側有界変数の分散依存指数モーメント）**  
> $Y$ は実数値確率変数で、$E[Y]=0$、$E[Y^2]=\sigma^2<\infty$、$Y\le b$ がほとんど確実に成立するものとする。ただし $b>0$ とする。任意の $\lambda\ge0$ に対して

$$
E[e^{\lambda Y}]
\le\exp\left\{
\frac{\sigma^2}{b^2}(e^{\lambda b}-1-\lambda b)
\right\}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

二次余剰の補題を各標本値に使い、一次項の期待値を零にします。得られた $1+z$ を $e^z$ で抑えれば完成です。

<!-- proof-start -->
### 証明

$Y\le b$ により $0<e^{\lambda Y}\le e^{\lambda b}$ なので指数モーメントは有限です。[二次余剰の補題](#lem-hdp2-exponential-remainder)を $y=Y$ に適用し、期待値を取ります。

$$
\begin{aligned}
E[e^{\lambda Y}]
&\le 1+\lambda E[Y]
+\frac{e^{\lambda b}-1-\lambda b}{b^2}E[Y^2]\\
&=1+\frac{\sigma^2}{b^2}
(e^{\lambda b}-1-\lambda b).
\end{aligned}
$$

$\lambda b\ge0$ に対して $e^{\lambda b}-1-\lambda b\ge0$ です。また実数 $z$ について $1+z\le e^z$ なので、この式の最後の非負項を $z$ とすれば

$$
E[e^{\lambda Y}]
\le \exp\left\{
\frac{\sigma^2}{b^2}(e^{\lambda b}-1-\lambda b)
\right\}.
$$
<!-- proof-end -->

**直接計算例。** $X$ がBernoulli$(p)$ で $0<p<1$ なら、$Y=X-p$ は値 $-p,1-p$ を取り、$Y\le1-p$、$E[Y^2]=p(1-p)$ です。従って

$$
E[e^{\lambda Y}]
=(1-p)e^{-\lambda p}+pe^{\lambda(1-p)}
$$

であり、補題の上界には $b=1-p$ と $\sigma^2=p(1-p)$ を代入します。この例では上界の $b$ を元の $X$ の上限 $1$ と混同しないことが重要です。

## 3. Bennettの不等式を導く

ここから独立な和へ進みます。$Y_i$ の上限が一様に $b$ 以下でも、$i$ ごとに分布や分散は違ってかまいません。正規化した偏差 $u=bt/v$ を使うと、指数パラメータの最適値が簡潔に表せます。

Bennettの評価で現れる関数を、先に形として捉えます。$u\ge0$ に対し

$$
h(u)=(1+u)\log(1+u)-u
$$

を考えます。$h(0)=0$ で、$h'(u)=\log(1+u)\ge0$ です。また $h(1)=2\log2-1>0$ です。この関数は分散に比べた偏差の大きさを指数へ変換します。

<a id="def-hdp2-bennett-rate"></a>

<!-- formal-statement-start -->
> **定義（Bennettの率関数）**  
> $u\ge0$ に対し、次で定まる実数値関数 $h:[0,\infty)\to[0,\infty)$ をBennettの率関数という。

$$
h(u)=(1+u)\log(1+u)-u.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp2-bennett-rate -->
**定義の確認**： $u=0$ を代入すると $h(0)=0$ です。$u=1$ では $h(1)=2\log2-1$ です。$\log2>1/2$ は $\log2=\int_1^2 dx/x>\int_1^2(1/2)\,dx$ から従うため、$h(1)>0$ も実際に確認できます。
<!-- definition-example-end -->

<a id="thm-hdp2-bennett"></a>

<!-- formal-statement-start -->
> **定理（Bennettの不等式：独立・非同分布版）**  
> $Y_1,\ldots,Y_n$ は相互に独立な実数値確率変数で、各 $E[Y_i]=0$、$E[Y_i^2]<\infty$、$Y_i\le b$ をほとんど確実に満たすとする。ただし共通上限 $b>0$ とし、

$$
v=\sum_{i=1}^nE[Y_i^2]>0,\qquad
S=\sum_{i=1}^nY_i
$$

> と置く。任意の $t>0$ について

$$
P(S\ge t)
\le\exp\left\{-\frac{v}{b^2}
h\left(\frac{bt}{v}\right)\right\}
$$

> が成立する。ここで $h(u)=(1+u)\log(1+u)-u$、$u\ge0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

各変数へ[分散依存指数モーメントの補題](#lem-hdp2-variance-mgf)を適用し、独立性で積に変えます。続いて[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を和 $S$ に適用します。最後に $\lambda$ を微分によって最適化します。

<!-- proof-start -->
### 証明

各 $Y_i$ に[分散依存指数モーメントの補題](#lem-hdp2-variance-mgf)を $\sigma_i^2=E[Y_i^2]$ として適用できます。$\lambda\ge0$ について、相互独立性と[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)から

$$
\begin{aligned}
E[e^{\lambda S}]
&=E\left[\prod_{i=1}^n e^{\lambda Y_i}\right]\\
&=\prod_{i=1}^nE[e^{\lambda Y_i}]\\
&\le\prod_{i=1}^n
\exp\left\{\frac{\sigma_i^2}{b^2}
(e^{\lambda b}-1-\lambda b)\right\}\\
&=\exp\left\{\frac{v}{b^2}
(e^{\lambda b}-1-\lambda b)\right\}.
\end{aligned}
$$

$\lambda>0$、$t>0$ に対し[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を $S$ に適用すると

$$
P(S\ge t)
\le \exp\left\{-\lambda t+
\frac{v}{b^2}(e^{\lambda b}-1-\lambda b)\right\}.
$$

指数部分を $F(\lambda)$ とすると

$$
F'(\lambda)=-t+\frac vb(e^{\lambda b}-1),
\qquad
F''(\lambda)=ve^{\lambda b}>0.
$$

$F'(0)=-t<0$ であり、$\lambda\to\infty$ のとき $F'(\lambda)\to\infty$ です。さらに $F''(\lambda)>0$ だから $F'$ は単調増加です。従って非負の範囲で最小値を与える点は $F'(\lambda)=0$ を満たす一意の正の $\lambda$ です。

$$
e^{\lambda_*b}=1+\frac{bt}{v},
\qquad
\lambda_*=\frac1b\log\left(1+\frac{bt}{v}\right)>0.
$$

$u=bt/v$ と置いて代入すると

$$
\begin{aligned}
F(\lambda_*)
&=-\frac{t}{b}\log(1+u)
 +\frac{v}{b^2}\{(1+u)-1-\log(1+u)\}\\
&=-\frac{v}{b^2}
\{u\log(1+u)+\log(1+u)-u\}\\
&=-\frac{v}{b^2}h(u).
\end{aligned}
$$

これを確率上界へ戻せば結論です。
<!-- proof-end -->

**退化の場合を忘れない。** 分散の和が零なら、個々の非負の二乗平均も全て零です。

$$
v=0\ \Longrightarrow\ E[Y_i^2]=0
\ \Longrightarrow\ Y_i=0\quad\text{ほとんど確実}.
$$

したがって $t>0$ では $P(S\ge t)=0$ です。また上限を $b=0$ とした場合も、$Y_i\le0$ と平均零から $Y_i=0$ がほとんど確実に成立します。上の定理では零割りを避けるため、$v,b>0$ を仮定しました。

### 非同分布の例

$Y_1$ は $-1,1$ を等確率で取り、$Y_2$ は $-2,2$ を等確率で取り、両者は独立とします。$b=2$、$v=1+4=5$ とでき、

$$
P(Y_1+Y_2\ge t)
\le\exp\left\{-\frac54 h\left(\frac{2t}{5}\right)\right\}
$$

です。実際、片側の上限はそれぞれ $1,2$ で、共通の $b=2$ にまとめています。二つの分布が等しい必要はありません。

## 4. Bernsteinの不等式：使いやすい分散・幅の形

Bennettの率関数は正確ですが、対数を含むため標本数の設計には少し不便です。そこで指数関数の余りをさらに単純化します。条件 $0\le x<3$ のもとで

$$
e^x-1-x\le\frac{x^2}{2(1-x/3)}
$$

が成り立ちます。これは展開の各係数を比較すれば証明できます。

<!-- proof-start -->
### 補助不等式の証明

$0\le x<3$ とします。指数関数の級数は絶対収束し、

$$
e^x-1-x=\sum_{k=2}^\infty\frac{x^k}{k!}.
$$

$k\ge2$ で $k!\ge2\cdot3^{k-2}$ を帰納法で確かめます。$k=2$ で等号、$k=3$ でも等号です。$k\ge3$ から $k+1$ へは $k+1\ge4>3$ を掛ければよいので、主張は全ての $k\ge2$ に成立します。従って

$$
\begin{aligned}
\sum_{k=2}^\infty\frac{x^k}{k!}
&\le\sum_{k=2}^\infty\frac{x^k}{2\cdot3^{k-2}}\\
&=\frac{x^2}{2}\sum_{j=0}^\infty(x/3)^j\\
&=\frac{x^2}{2(1-x/3)}.
\end{aligned}
$$

最後の等式は $x/3<1$ による等比級数の和です。
<!-- proof-end -->

<a id="thm-hdp2-bernstein"></a>

<!-- formal-statement-start -->
> **定理（Bernsteinの不等式：分散依存の右裾）**  
> $Y_1,\ldots,Y_n$ は相互に独立な実数値確率変数で、各 $E[Y_i]=0$、$E[Y_i^2]<\infty$、$Y_i\le b$ をほとんど確実に満たすとする。ただし $b>0$ とし、

$$
v=\sum_{i=1}^n E[Y_i^2],\qquad
S=\sum_{i=1}^nY_i
$$

> と置く。$v\ge0$、$t>0$ に対して

$$
P(S\ge t)\le
\exp\left\{-\frac{t^2}{2(v+bt/3)}\right\}
$$

> が成立する。$v=0$ の場合は左辺が零である。
<!-- formal-statement-end -->

### 証明の見取り図

[Bennettの証明で得た指数モーメントの制御](#thm-hdp2-bennett)に $e^x$ の二次余剰の上界を代入し、選んだ $\lambda$ で指数を具体的に計算します。

<!-- proof-start -->
### 証明

まず $v>0$ とします。[分散依存指数モーメントの補題](#lem-hdp2-variance-mgf)と[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)から、$0<\lambda<3/b$ に対し

$$
\begin{aligned}
\log E[e^{\lambda S}]
&\le\frac{v}{b^2}
(e^{\lambda b}-1-\lambda b)\\
&\le\frac{v}{b^2}\,
\frac{(\lambda b)^2}{2(1-\lambda b/3)}\\
&=\frac{\lambda^2v}{2(1-\lambda b/3)}.
\end{aligned}
$$

[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)から

$$
P(S\ge t)\le\exp\left\{-\lambda t+
\frac{\lambda^2v}{2(1-\lambda b/3)}\right\}
$$

です。確率が零の場合もこの式はそのまま成立します。ここで

$$
\lambda=\frac{t}{v+bt/3}
$$

を選ぶと、$v>0$ より $0<\lambda<3/b$ です。さらに

$$
1-\frac{\lambda b}{3}
=1-\frac{bt/3}{v+bt/3}
=\frac{v}{v+bt/3}
$$

なので、

$$
\begin{aligned}
-\lambda t+
\frac{\lambda^2v}{2(1-\lambda b/3)}
&=-\frac{t^2}{v+bt/3}
+\frac{t^2v}{2(v+bt/3)^2}
\frac{v+bt/3}{v}\\
&=-\frac{t^2}{v+bt/3}
+\frac{t^2}{2(v+bt/3)}\\
&=-\frac{t^2}{2(v+bt/3)}.
\end{aligned}
$$

指数部分が $-t^2/[2(v+bt/3)]$ になったので結論を得ます。$v=0$ なら全ての $Y_i=0$ がほとんど確実に成立するため、$P(S\ge t)=0$ で、右辺の値より小さくなります。
<!-- proof-end -->

この評価は二つの尺度で読めます。$t\le 3v/b$ なら $bt/3\le v$ だから

$$
\frac{t^2}{2(v+bt/3)}\ge\frac{t^2}{4v}
$$

であり、二次型の指数減衰になります。一方、$t\ge3v/b$ なら $v\le bt/3$ だから

$$
\frac{t^2}{2(v+bt/3)}
\ge\frac{3t}{4b}
$$

となり、一次型の指数減衰になります。つまり小さな偏差は分散 $v$、大きな偏差は上限 $b$ が主に効きます。ここでは $v>0$ としています。

## 5. 両側偏差と標本数の逆算

片側の仮定 $Y_i\le b$ だけでは下裾を同じ $b$ で評価できません。$-Y_i\le b$ も必要です。元の $X_i$ が $[a_i,c_i]$ に収まる場合、中心化した $Y_i$ は $|Y_i|\le c_i-a_i$ を満たします。

<a id="cor-hdp2-bernstein-two-sided"></a>

<!-- formal-statement-start -->
> **系（Bernsteinの両側不等式）**  
> $Y_1,\ldots,Y_n$ は相互に独立で、$E[Y_i]=0$、$|Y_i|\le b$ をほとんど確実に満たすとする。ただし $b>0$ とし、$v=\sum_iE[Y_i^2]$ と置く。全ての $t>0$ に対して

$$
P\left(\left|\sum_{i=1}^nY_i\right|\ge t\right)
\le 2\exp\left\{-\frac{t^2}{2(v+bt/3)}\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[右裾のBernstein不等式](#thm-hdp2-bernstein)を $Y_i$ と $-Y_i$ に使い、二つの事象の和集合を取ります。符号を反転しても分散は変わりません。

<!-- proof-start -->
### 証明

$|Y_i|\le b$ なら $Y_i\le b$ と $-Y_i\le b$ が同時に成立します。また

$$
E[-Y_i]=0,\qquad E[(-Y_i)^2]=E[Y_i^2].
$$

[右裾のBernstein不等式](#thm-hdp2-bernstein)をそれぞれの和に適用すると

$$
P(S\ge t)\le e^{-t^2/[2(v+bt/3)]},
\quad
P(-S\ge t)\le e^{-t^2/[2(v+bt/3)]}.
$$

$\{|S|\ge t\}=\{S\ge t\}\cup\{-S\ge t\}$ なので、[可算劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)から二つの上界を加えれば結論を得ます。
<!-- proof-end -->

**分散を残した標本平均。** 独立なBernoulli$(p)$ 変数 $X_1,\ldots,X_n$ について、$\overline X=n^{-1}\sum_iX_i$ とすると、$Y_i=X_i-p$、$v=np(1-p)$、$b=1$ として

$$
P(|\overline X-p|\ge\varepsilon)
\le 2\exp\left\{
-\frac{n\varepsilon^2}
{2(p(1-p)+\varepsilon/3)}
\right\}.
$$

$0<\delta<1$ の失敗確率を望むなら、右辺が $\delta$ 以下となる十分条件は

$$
n\ge\frac{2(p(1-p)+\varepsilon/3)}{\varepsilon^2}
\log\frac{2}{\delta}.
$$

標本数の条件は、指数上界の右辺を $\delta$ 以下にする不等式

$$
2\exp\left\{-\frac{n\varepsilon^2}{2(p(1-p)+\varepsilon/3)}\right\}
\le\delta
$$

の両辺の対数を取り、

$$
-\frac{n\varepsilon^2}{2(p(1-p)+\varepsilon/3)}
\le-\log\frac{2}{\delta}
$$

を得てから、$\varepsilon>0$ と $p(1-p)+\varepsilon/3>0$ を使って整理したものです。この両側上界が $1$ を超える場合は、確率が $1$ 以下であることも併用し、上界を $1$ と小さい方へ切り詰めます。ただし $p=0$ または $1$ では変数が定数で、そもそも偏差確率は零です。

## 6. 仮定を落とすと何が壊れるか

**独立性が欠ける場合。** 同一のRademacher変数 $Z$（$P(Z=\pm1)=1/2$）を二度使い、$Y_1=Y_2=Z$ とします。個々の中心化変数は $b=1$、$E[Y_i^2]=1$ を満たし、形式的な分散の和は $v=2$ です。しかし $S=2Z$ なので実際には $P(S\ge2)=1/2$ です。独立だと誤って仮定して[右裾のBernstein不等式](#thm-hdp2-bernstein)に $t=2$、$v=2$、$b=1$ を代入すると、

$$
\exp\left\{-\frac{2^2}{2(2+2/3)}\right\}
=e^{-3/4}\approx0.4724
<\frac12=P(S\ge2).
$$

誤った上界が真の確率を下回ります。破綻するのは[期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)です。独立性がないので、次の等式を使えません。

$$
E[e^{\lambda(Y_1+Y_2)}]
=E[e^{\lambda Y_1}]E[e^{\lambda Y_2}].
$$

**片側の上限しかない場合。** $Y=-9$ を確率 $1/10$、$Y=1$ を確率 $9/10$ で取ると $E[Y]=0$、$Y\le1$、$E[Y^2]=9$ です。右裾には $b=1$ を使用できますが、下裾で $-Y\le1$ は成り立ちません。事実

$$
P(Y\le-9)=\frac1{10}
> \exp\left\{-\frac{9^2}{2(9+9/3)}\right\}
=e^{-27/8}.
$$

このように両側評価へ片側上限を流用すると誤ります。左右の裾で必要な上限を取り直すか、絶対値の上限を使わなければなりません。

## 7. 演習：式と仮定を自力で復元する

**Level A：定義・余剰・境界を確かめる**

### A1. Bernoulli変数の中心化

$0<p<1$、$P(X=1)=p$、$P(X=0)=1-p$ とする。$Y=X-E[X]$ の値、上限、分散、指数モーメントを全て計算せよ。

- Level: A
- ID: HDP2-A1

<!-- solution-start -->
**詳細解答**　$E[X]=0(1-p)+1p=p$ です。従って $Y$ は確率 $1-p$ で $-p$、確率 $p$ で $1-p$ を取ります。最大値は $1-p$ です。平均が零であることは

$$
E[Y]=(1-p)(-p)+p(1-p)=0
$$

で確認できます。二乗平均は

$$
\begin{aligned}
E[Y^2]
&=(1-p)p^2+p(1-p)^2\\
&=p(1-p)\{p+(1-p)\}=p(1-p).
\end{aligned}
$$

指数モーメントは各値に指数関数を適用して

$$
E[e^{\lambda Y}]
=(1-p)e^{-\lambda p}+pe^{\lambda(1-p)}.
$$

片側上限に $b=1$ を使うこともできますが、最も小さい自然な選択は $b=1-p$ です。
<!-- solution-end -->

### A2. 二次余剰の単調性

$b>0$、$\lambda\ge0$ とし、$y\le b$ とする。積分表示を使って $e^{\lambda y}-1-\lambda y$ を $y^2(e^{\lambda b}-1-\lambda b)/b^2$ で抑えよ。

- Level: A
- ID: HDP2-A2

<!-- solution-start -->
**詳細解答**　$g(t)=e^{\lambda t y}$ の二階微分は $\lambda^2y^2e^{\lambda t y}$ です。二度の積分により

$$
e^{\lambda y}-1-\lambda y
=\lambda^2y^2\int_0^1(1-s)e^{\lambda sy}\,ds.
$$

$\lambda s\ge0$ と $y\le b$ から $e^{\lambda sy}\le e^{\lambda sb}$ です。従って

$$
e^{\lambda y}-1-\lambda y
\le \lambda^2y^2\int_0^1(1-s)e^{\lambda sb}\,ds.
$$

最後の積分へ同じ恒等式を $y=b$ として適用すると、係数は $(e^{\lambda b}-1-\lambda b)/b^2$ です。$y=0$ でも両辺は零です。
<!-- solution-end -->

### A3. 分散が零のとき

$Y_1,\ldots,Y_n$ は平均零、有限分散を持つとする。$\sum_iE[Y_i^2]=0$ なら、独立性を使わずに任意の $t>0$ で $P(\sum_iY_i\ge t)=0$ を示せ。

- Level: A
- ID: HDP2-A3

<!-- solution-start -->
**詳細解答**　各 $E[Y_i^2]\ge0$ なので、その和が零なら全ての $i$ で $E[Y_i^2]=0$ です。もし $P(Y_i^2>0)>0$ なら、

$$
\{Y_i^2>0\}=\bigcup_{m=1}^{\infty}\{Y_i^2\ge1/m\}
$$

です。右辺の全ての事象が確率零なら[可算劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)で左辺も確率零になるので、ある整数 $m\ge1$ について $P(Y_i^2\ge1/m)>0$ となり、

$$
E[Y_i^2]\ge\frac1mP(Y_i^2\ge1/m)>0
$$

と矛盾します。従って $Y_i=0$ が各 $i$ でほとんど確実です。有限個の確率一事象の共通部分も確率一なので $\sum_iY_i=0$、よって右裾確率は零です。独立性は使っていません。
<!-- solution-end -->

### A4. Bennett指数の最適化

$v,b,t>0$ に対し

$$
F(\lambda)=-\lambda t+\frac{v}{b^2}
(e^{\lambda b}-1-\lambda b),\qquad \lambda\ge0
$$

の最小値を与える点と最小値を求めよ。

- Level: A
- ID: HDP2-A4

<!-- solution-start -->
**詳細解答**　まず

$$
F'(\lambda)=-t+\frac vb(e^{\lambda b}-1),
\qquad F''(\lambda)=ve^{\lambda b}>0
$$

です。$F'(0)=-t<0$、かつ $F'(\lambda)\to\infty$ なので一意の最小値を与える点があり、

$$
\lambda_*=\frac1b\log(1+bt/v)
$$

です。$u=bt/v$ と置くと、$t/b=vu/b^2$ を使って

$$
\begin{aligned}
F(\lambda_*)
&=-\frac{vu}{b^2}\log(1+u)
+\frac{v}{b^2}(u-\log(1+u))\\
&=-\frac{v}{b^2}\{(1+u)\log(1+u)-u\}\\
&=-\frac v{b^2}h(u).
\end{aligned}
$$
<!-- solution-end -->

### A5. 対称二点分布と両側評価

独立な $Y_i$ がそれぞれ $-1,1$ を等確率で取るとする。$S=\sum_{i=1}^nY_i$ の $v,b$ を求め、$P(|S|\ge t)$ のBernstein上界を書け。

- Level: A
- ID: HDP2-A5

<!-- solution-start -->
**詳細解答**　各 $E[Y_i]=0$、$E[Y_i^2]=1$、$|Y_i|\le1$ です。従って $v=n$、$b=1$ であり、独立性と[両側Bernstein不等式](#cor-hdp2-bernstein-two-sided)の全仮定が成立します。$t>0$ に対して

$$
P(|S|\ge t)
\le 2\exp\left\{-\frac{t^2}{2(n+t/3)}\right\}.
$$

値域から $|S|\le n$ が確実に成立するので、$t>n$ の実確率は零です。上界が零でないことは不等式の誤りを意味しません。
<!-- solution-end -->

**Level B：評価の読み替え・逆算・仮定の失敗**

### B1. 希少事象ではどちらが有利か

独立なBernoulli$(0.01)$ 変数 $100$ 個の平均について、右裾 $P(\overline X-0.01\ge0.05)$ の[Hoeffding上界](../HDP1/index.md#thm-hdp1-hoeffding)とBernstein上界の指数を比較せよ。両側確率ではなく右裾を評価すること。

- Level: B
- ID: HDP2-B1

<!-- solution-start -->
**詳細解答**　$n=100$、$p=0.01$、$\varepsilon=0.05$ です。幅は各 $1$ なので、[Hoeffdingの不等式](../HDP1/index.md#thm-hdp1-hoeffding)を和の偏差 $t=n\varepsilon=5$ に適用すると

$$
P(\overline X-p\ge\varepsilon)
\le e^{-2n\varepsilon^2}
=e^{-0.5}.
$$

[右裾Bernstein不等式](#thm-hdp2-bernstein)には各変数の中心化 $Y_i=X_i-p$ を用います。これらは独立、平均零、$Y_i\le1-p\le1$ であり、$v=np(1-p)=100\cdot0.0099=0.99$、$b=1$、$t=5$ です。指数は

$$
\begin{aligned}
\frac{t^2}{2(v+bt/3)}
&=\frac{25}{2(0.99+5/3)}\\
&=\frac{25}{5.313333\ldots}
\approx4.705.
\end{aligned}
$$

従って上界は $e^{-4.705\ldots}$ です。$e^{-4.705\ldots}<e^{-0.5}$ なのでこの例ではBernsteinの方が小さい上界を与えます。実確率を計算したわけではありません。
<!-- solution-end -->

### B2. 信頼水準から偏差幅を逆算する

整数 $n\ge1$ とし、$Y_1,\ldots,Y_n$ を相互に独立な実数値確率変数とする。各 $i$ について $E[Y_i]=0$、$E[Y_i^2]<\infty$、$Y_i\le b$ がほとんど確実に成り立つとする。ただし共通上限 $b>0$ とし、

$$
S=\sum_{i=1}^nY_i,\qquad v=\sum_{i=1}^nE[Y_i^2]
$$

と置く。$0<\delta<1$、$x=\log(1/\delta)$ とし、[右裾Bernstein不等式](#thm-hdp2-bernstein)を用いて

$$
t=\sqrt{2vx}+\frac{2bx}{3}
$$

なら $P(S\ge t)\le\delta$ を示せ。

- Level: B
- ID: HDP2-B2

<!-- solution-start -->
**詳細解答**　$v=0$ なら $S=0$ がほとんど確実で、$x>0$ のとき $t>0$ なので確率は零です。$v>0$ とし、$a=\sqrt{2vx}$、$c=2bx/3$ と置きます。すると $t=a+c$ で、

$$
\begin{aligned}
t^2-2x(v+bt/3)
&=(a+c)^2-2vx-\frac{2bx}{3}(a+c)\\
&=a^2+2ac+c^2-a^2-c(a+c)\\
&=ac\ge0.
\end{aligned}
$$

従って $t^2/[2(v+bt/3)]\ge x$ です。[右裾Bernstein不等式](#thm-hdp2-bernstein)へ代入すれば

$$
P(S\ge t)\le e^{-x}
=e^{-\log(1/\delta)}=\delta.
$$
<!-- solution-end -->

### B3. 独立性のない二回観測

$Z$ は $-1,1$ を等確率で取る。$Y_1=Y_2=Z$ と置いたとき、$t=2$ における右裾Bernsteinの形式的な数値を求め、真の確率と比較し、何が壊れたか説明せよ。

- Level: B
- ID: HDP2-B3

<!-- solution-start -->
**詳細解答**　$Y_1,Y_2$ の平均は零、各二乗平均は $1$ なので形式的には $v=2$、$b=1$ です。独立だと誤って仮定して[右裾Bernstein不等式](#thm-hdp2-bernstein)を適用した場合、形式的な指数は

$$
\frac{t^2}{2(v+bt/3)}
=\frac{4}{2(2+2/3)}=\frac34.
$$

従って偽の上界は $e^{-3/4}\approx0.4724$ です。一方、$S=2Z$ なので

$$
P(S\ge2)=P(Z=1)=\frac12>e^{-3/4}.
$$

$\lambda>0$ について真の指数モーメントは $E[e^{2\lambda Z}]=\cosh(2\lambda)$ で、積にしてしまうと $(\cosh\lambda)^2$ となり一致しません。破綻したのは[独立な期待値の因数分解](../../F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)です。
<!-- solution-end -->

### B4. 下裾に片側上限を使ってはいけない

$P(Y=-9)=1/10$、$P(Y=1)=9/10$ とする。$Y\le1$、$E[Y]=0$ を確認し、$P(Y\le-9)$ へ $b=1$ の右裾Bernstein式を誤用すると失敗することを示せ。正しく下裾を扱うならどの $b$ を使うか。

- Level: B
- ID: HDP2-B4

<!-- solution-start -->
**詳細解答**　$Y$ の取り得る値は $-9,1$ なので $Y\le1$ です。平均と二乗平均は

$$
E[Y]=-9\cdot0.1+1\cdot0.9=0,
\qquad
E[Y^2]=81\cdot0.1+1\cdot0.9=9.
$$

真の下裾確率は $0.1$ です。しかし $b=1$、$v=9$、$t=9$ を[右裾Bernstein不等式](#thm-hdp2-bernstein)の下裾へ誤って流用すると

$$
e^{-81/[2(9+9/3)]}=e^{-27/8}\approx0.0342
$$

となり、真の $0.1$ を下回ります。$-Y$ は最大値が $9$ なので、下裾には $-Y\le9$、すなわち $b=9$ を用いるのが正しい適用です。右裾の定理を $-Y$ に適用すると、

$$
P(-Y\ge9)
\le\exp\left\{-\frac{9^2}{2(9+9\cdot9/3)}\right\}
=e^{-9/8}\approx0.3247
$$

となり、真の確率 $0.1$ より大きいので矛盾しません。
<!-- solution-end -->

**Level C：高次元の同時集中を設計する**

### C1. 稀なBernoulli観測の多数座標

$0<p<1$、$0<\varepsilon<1$、$0<\delta<1$、整数 $n,d\ge1$ とする。$X_{ij}$（$1\le i\le n$、$1\le j\le d$）は各々Bernoulli$(p)$ に従い、各固定 $j$ における $X_{1j},\ldots,X_{nj}$ は相互独立とする。異なる列間の独立性は仮定しない。$\overline X_j=n^{-1}\sum_iX_{ij}$ と置く。

1. 全座標で $|\overline X_j-p|<\varepsilon$ となる確率を $1-\delta$ 以上にする十分標本数を求めよ。
2. 同じ目的に使うHoeffdingの十分標本数と比較して、Bernsteinの方が小さくなる条件を求めよ。
3. 各列内の独立性を失うとどうなるか、$d=1$ の反例を示せ。

- Level: C
- ID: HDP2-C1

<!-- solution-start -->
**詳細解答**

**(1)** 固定した列 $j$ について中心化変数 $Y_{ij}=X_{ij}-p$ を考えます。列内の独立性は保たれ、必要な量は

$$
E[Y_{ij}]=0,\qquad |Y_{ij}|\le1,
\qquad E[Y_{ij}^2]=p(1-p)
$$

です。従って分散の和は $v=np(1-p)$ です。[両側Bernstein不等式](#cor-hdp2-bernstein-two-sided)に $b=1$、$t=n\varepsilon$ を代入すると

$$
\begin{aligned}
P(|\overline X_j-p|\ge\varepsilon)
&\le 2\exp\left\{
-\frac{(n\varepsilon)^2}{2(np(1-p)+n\varepsilon/3)}
\right\}\\
&=2\exp\left\{
-\frac{n\varepsilon^2}{2(p(1-p)+\varepsilon/3)}
\right\}.
\end{aligned}
$$

$G=\{\max_{1\le j\le d}|\overline X_j-p|<\varepsilon\}$ とします。補集合は列ごとの失敗事象の和集合なので、[可算劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)より

$$
P(G^c)
\le2d\exp\left\{
-\frac{n\varepsilon^2}{2(p(1-p)+\varepsilon/3)}
\right\}.
$$

右辺が $\delta$ 以下となるには、対数を取り正の係数で割って

$$
n\ge
\frac{2(p(1-p)+\varepsilon/3)}{\varepsilon^2}
\log\frac{2d}{\delta}
$$

とすれば十分です。必要なのは列内の独立性であり、列間の独立性は使いません。

**(2)** [Hoeffdingの両側不等式](../HDP1/index.md#cor-hdp1-two-sided)で同じ議論をすると

$$
n\ge\frac1{2\varepsilon^2}\log\frac{2d}{\delta}
$$

が十分です。右辺の $\log(2d/\delta)/\varepsilon^2$ は共通です。Bernsteinの係数 $2(p(1-p)+\varepsilon/3)$ が $1/2$ より小さいとき、つまり

$$
p(1-p)+\frac{\varepsilon}{3}<\frac14
$$

のとき、Bernsteinから得た実数の標本数下界が小さくなります。整数へ切り上げると同じ標本数になる場合もあります。

**(3)** $d=1$ として、一つのBernoulli$(p)$ 変数 $Z$ を全 $i$ に複製し、$X_{i1}=Z$ と置きます。すると $\overline X_1=Z$ です。$0<\varepsilon<\min(p,1-p)$ なら $Z=0$ でも $Z=1$ でも $|Z-p|\ge\varepsilon$ で、

$$
P(|\overline X_1-p|\ge\varepsilon)=1
$$

が全ての $n$ で続きます。独立性がないので指数モーメントを $n$ 個の因子へ分けられず、標本数を増やす効果がありません。
<!-- solution-end -->

## 8. 次章への接続

ここまでは上方の確実な限界 $Y_i\le b$ があれば、分散を使った強い評価を得られました。次はそのような有界性を仮定できないときにも集中する変数を扱います。sub-Gaussian・sub-exponentialの条件を、尾部・モーメント・指数モーメントの関係として整理します。
