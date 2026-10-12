# NT5 Möbius反転・約数和・総和関数

[NT4 の Dirichlet 畳み込み](../NT4/index.md#def-nt4-dirichlet)では、約数に沿って二つの算術関数を組み合わせました。例えば定数 $1$ 関数を使うと、$f$ の情報は $(1*f)(n)=\sum_{d\mid n}f(d)$ という約数和にまとまります。ところが、この和だけを渡されたとき、元の $f(n)$ を取り戻せるでしょうか。

$n=6$ に対する和には $f(1),f(2),f(3),f(6)$ が混ざっています。しかし、$n=1,2,3$ での約数和も知っていれば、既に分かった項を引けそうです。この「重複を引き戻す」操作を一つの算術関数で書き、次に多くの整数について一度に和を取る問題へ進みます。特に床関数が現れる理由を、整数格子点の数え上げによって説明します。

以下では $\mathbb N=\{1,2,\ldots\}$、$d\mid n$ は正の約数、算術関数の値域は $\mathbb C$ とします。$1$ は[定数1関数](../NT4/index.md#def-nt4-constant-one)、$\varepsilon$ は[畳み込みの単位元](../NT4/index.md#def-nt4-epsilon)です。実数 $x$ に対する $\lfloor x\rfloor$ は $x$ 以下の最大の整数です。

## 1. 約数和の「余分な項」を消す

前章で定義した [Möbius 関数](../NT4/index.md#def-nt4-mobius) は、素数が一回だけ現れるごとに符号を反転し、平方因子があれば $0$ となる関数 $\mu$ です。この符号を各約数に沿って足すと、驚くほど強い消去が起こります。

$n=6$ では約数が $1,2,3,6$ であり、その値は順に $1,-1,-1,1$ です。したがって合計は $0$ です。$n=12$ では平方因子を持つ $4,12$ の寄与が消え、残る $1,2,3,6$ も合計 $0$ です。この現象をすべての $n$ について証明します。

<a id="thm-nt5-mobius-unit"></a>

<!-- formal-statement-start -->
> **定理（Möbius 関数と定数1関数の逆元関係）**  
> 任意の正整数 $n$ に対して

$$
\sum_{d\mid n}\mu(d)=
\begin{cases}
1 &(n=1),\\
0 &(n>1).
\end{cases}
$$

> すなわち、Dirichlet 畳み込みについて $\mu*1=1*\mu=\varepsilon$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$n>1$ の異なる素因数を $p_1,\ldots,p_r$ とします。$\mu(d)\ne0$ となる約数は、各素数を「入れる・入れない」の二択で作られます。$k$ 個選べば符号は $(-1)^k$ です。各選択は、選んだ一つの素数の有無を反転すると逆符号の選択へ対応します。

<!-- proof-start -->
### 証明

$n=1$ の正の約数は $1$ だけで、$\mu(1)=1$ です。次に $n>1$ とし、その異なる素因数を $p_1,\ldots,p_r$（$r\ge1$）と書きます。

平方因子を持つ約数 $d$ は $\mu(d)=0$ なので和に寄与しません。寄与し得る約数は、集合 $S\subseteq\{1,\ldots,r\}$ を用いて一意に

$$
d_S=\prod_{i\in S}p_i
$$

と書けます。空集合では $d_\varnothing=1$ とします。[Möbius 関数の定義](../NT4/index.md#def-nt4-mobius)から $\mu(d_S)=(-1)^{|S|}$ なので、

$$
\sum_{d\mid n}\mu(d)
=\sum_{S\subseteq\{1,\ldots,r\}}(-1)^{|S|}
=\sum_{k=0}^{r}\binom rk(-1)^k
=(1-1)^r=0.
$$

最後の等式には $r\ge1$ を使いました。ここで二項係数は、$r$ 個の素数から $k$ 個を選ぶ方法の数です。したがってすべての $n$ について和は $\varepsilon(n)$ と一致します。

さらに [Dirichlet 畳み込みの定義](../NT4/index.md#def-nt4-dirichlet)より $(\mu*1)(n)=\sum_{d\mid n}\mu(d)$ であり、[畳み込みの可換性](../NT4/index.md#thm-nt4-convolution-laws)から $1*\mu=\mu*1$ です。
<!-- proof-end -->

ここで $n>1$ の仮定を外すと $r=0$ となり、同じ式の値は $(1-1)^0=1$ です。つまり例外の $n=1$ まで定理の一部であり、単なる書き忘れではありません。

また [Dirichlet 逆元の存在と一意性](../NT4/index.md#thm-nt4-inverse)から、これは $1$ の逆元の具体的な閉じた表示でもあります。

## 2. 約数和を元へ戻す Möbius 反転

新しい関数 $F$ を $f$ の約数和から作ると考えます。$F(6)$ だけでは $f(6)$ が定まりませんが、すべての正整数について $F(n)$ が分かれば、前節の符号付きの和で正確に回収できます。

<a id="def-nt5-divisor-sum-transform"></a>

<!-- formal-statement-start -->
> **定義（約数和変換）**  
> 算術関数 $f$ に対し、約数和変換 $F$ を

$$
F(n)=\sum_{d\mid n}f(d)\qquad(n\ge1)
$$

> で定める。すなわち $F=1*f$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt5-divisor-sum-transform -->
### 例：$n=6$ に現れる情報

**定義の確認**：$f(n)=n$ を選ぶと、$F(6)=f(1)+f(2)+f(3)+f(6)=1+2+3+6=12$ です。$F(3)=1+3=4$、$F(2)=1+2=3$、$F(1)=1$ も合わせて使うと、

$$
F(6)-F(3)-F(2)+F(1)=12-4-3+1=6=f(6)
$$

となります。この符号 $+,-,-,+$ は $\mu(1),\mu(2),\mu(3),\mu(6)$ そのものです。
<!-- definition-example-end -->

<a id="thm-nt5-mobius-inversion"></a>

<!-- formal-statement-start -->
> **定理（Möbius 反転公式）**  
> 任意の算術関数 $f,F:\mathbb N\to\mathbb C$ について、次の二条件は同値である。
>
> (i) すべての $n\ge1$ で $F(n)=\sum_{d\mid n}f(d)$。
>
> (ii) すべての $n\ge1$ で

$$
f(n)=\sum_{d\mid n}\mu(d)F(n/d)
=\sum_{d\mid n}\mu(n/d)F(d).
$$

<!-- formal-statement-end -->

### 証明の見取り図

(i) は $F=1*f$、(ii) は $f=\mu*F$ という畳み込みの等式です。前節で $1$ と $\mu$ が互いに逆元と分かったので、両辺を畳み込んで元に戻します。和の添字交換だけでなく、実際にどの法則を使うかを追います。

<!-- proof-start -->
### 証明

まず (i) を仮定します。[約数和変換の定義](#def-nt5-divisor-sum-transform)で $F=1*f$ なので、[畳み込みの結合則](../NT4/index.md#thm-nt4-convolution-laws)、[逆元関係](#thm-nt5-mobius-unit)、[単位元の性質](../NT4/index.md#thm-nt4-convolution-laws)の順に使うと

$$
\mu*F
=\mu*(1*f)
=(\mu*1)*f
=\varepsilon*f
=f.
$$

[Dirichlet 畳み込みの定義](../NT4/index.md#def-nt4-dirichlet)を左辺の $n$ での値に代入すれば、

$$
f(n)=(\mu*F)(n)=\sum_{d\mid n}\mu(d)F(n/d).
$$

さらに $e=n/d$ と置けば、$d\mapsto e$ は $n$ の正の約数集合の全単射であり、$\sum_{d\mid n}\mu(d)F(n/d)=\sum_{e\mid n}\mu(n/e)F(e)$ です。

逆に (ii) を仮定します。この場合 $f=\mu*F$ なので、

$$
1*f
=1*(\mu*F)
=(1*\mu)*F
=\varepsilon*F
=F.
$$

両辺を $n$ で評価すると $F(n)=\sum_{d\mid n}f(d)$ となり (i) が従います。複素数値の算術関数であればどれでもよく、収束条件は必要ありません。各 $n$ に対する和が有限だからです。
<!-- proof-end -->

この公式は「$n$ の約数上で混ざった情報を、同じ約数集合上の符号付き和で分離する」道具です。反転しているのは無限個の項を足したものではなく、**各 $n$ ごとの有限約数和**です。

### 約数和恒等式：Euler の $\varphi$ 関数を戻す

[Euler の $\varphi$ 関数](../NT2/index.md#def-nt2-euler-phi)は、$1\le a\le n$ で $\gcd(a,n)=1$ となる整数の個数です。約数 $d$ ごとの $\varphi(d)$ を加えると $n$ になることを、まず数え上げで導きます。

<a id="prop-nt5-totient-divisor-sum"></a>

<!-- formal-statement-start -->
> **命題（Euler 関数の約数和と反転）**  
> すべての正整数 $n$ で

$$
\sum_{d\mid n}\varphi(d)=n,
\qquad
\varphi(n)=\sum_{d\mid n}\mu(d)\frac{n}{d}.
$$

> すなわち $1*\varphi=\operatorname{id}$、$\varphi=\mu*\operatorname{id}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$1,\ldots,n$ を $\gcd(a,n)$ の値で分類します。$d=n/\gcd(a,n)$ と置けば、その群の中で $a/\gcd(a,n)$ と $d$ は互いに素です。群の大きさは $\varphi(d)$ です。

<!-- proof-start -->
### 証明

$n\ge1$ を固定し、各 $a\in\{1,\ldots,n\}$ に対して $g=\gcd(a,n)$、$d=n/g$、$b=a/g$ と置きます。すると $d\mid n$、$1\le b\le d$ です。もし $b,d$ に共通の約数 $c>1$ があれば、$cg$ は $a,n$ の共通の約数となって $g$ が最大公約数であることに反します。従って $\gcd(b,d)=1$ です。

逆に、任意の $d\mid n$ と $1\le b\le d$、$\gcd(b,d)=1$ に対して、$g=n/d$、$a=gb$ と置くと $1\le a\le n$ で、$\gcd(a,n)=g\gcd(b,d)=g$ です。以上の対応は互いに逆です。

従って整数 $a=1,\ldots,n$ は、$d\mid n$ ごとにちょうど $\varphi(d)$ 個ずつ分類され、

$$
n=\sum_{d\mid n}\varphi(d).
$$

ここで [Möbius 反転公式](#thm-nt5-mobius-inversion)へ $F(n)=n$、$f(n)=\varphi(n)$ を代入します。仮定 $F(n)=\sum_{d\mid n}f(d)$ は今証明した式ですから、

$$
\varphi(n)=\sum_{d\mid n}\mu(d)F(n/d)
=\sum_{d\mid n}\mu(d)\frac nd
$$

を得ます。
<!-- proof-end -->

例えば $n=12$ では $\varphi(1),\varphi(2),\varphi(3),\varphi(4),\varphi(6),\varphi(12)$ が $1,1,2,2,2,4$ なので和は $12$ です。反転式では $\mu(d)\ne0$ の約数 $1,2,3,6$ だけが残り、$12-6-4+2=4=\varphi(12)$ となります。

## 3. 一つの整数から、$x$ 以下の整数全体へ

約数和変換は $n$ を固定した有限和です。今度は $n\le x$ のすべての値を足すことを考えます。計算を二重和に直すと「整数対 $(d,e)$ で $de\le x$」という図形的な条件が浮かびます。

<a id="def-nt5-summatory-function"></a>

<!-- formal-statement-start -->
> **定義（総和関数）**  
> 算術関数 $f:\mathbb N\to\mathbb C$ と実数 $x\ge0$ に対し、総和関数 $A_f$ を

$$
A_f(x)=\sum_{1\le n\le x}f(n)
=\sum_{n=1}^{\lfloor x\rfloor}f(n)
$$

> と定める。$0\le x<1$ では空和として $A_f(x)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt5-summatory-function -->
### 例：階段状に増える関数

**定義の確認**：$f(n)=1$ なら $A_1(5.8)=1+1+1+1+1=5=\lfloor5.8\rfloor$ です。$f(n)=n$ なら $A_{\operatorname{id}}(3.2)=1+2+3=6$ です。$x$ は実数ですが、和に入る $n$ は正整数だけなので、非整数の区間では値が変わりません。
<!-- definition-example-end -->

最初の非自明な総和関数として、[約数個数関数 $\tau$](../NT4/index.md#def-nt4-divisor-functions)の和を調べます。

<a id="thm-nt5-summatory-convolution"></a>

<!-- formal-statement-start -->
> **定理（畳み込みの総和と二重和）**  
> 任意の算術関数 $f,g$ と実数 $x\ge1$ に対し、

$$
A_{f*g}(x)
=\sum_{d\le x}f(d)A_g(x/d)
=\sum_{\substack{d,e\ge1\\de\le x}}f(d)g(e)
$$

> が成立する。特に $D(x)=A_\tau(x)$ と置くと、

$$
D(x)=\sum_{d\le x}\left\lfloor\frac xd\right\rfloor.
$$

<!-- formal-statement-end -->

### 証明の見取り図

$de\le x$ を満たす正整数の順序付き組を、積 $n=de$ ごとに数えるか、最初の因子 $d$ ごとに数えるかを交換します。後者で $e$ の範囲は $1\le e\le x/d$ となり、床関数が生じます。

<!-- proof-start -->
### 証明

[Dirichlet 畳み込みの定義](../NT4/index.md#def-nt4-dirichlet)に従って

$$
\begin{aligned}
A_{f*g}(x)
&=\sum_{1\le n\le x}(f*g)(n)\\
&=\sum_{1\le n\le x}\sum_{d\mid n}f(d)g(n/d)\\
&=\sum_{\substack{d,e\ge1\\de\le x}}f(d)g(e).
\end{aligned}
$$

第二行から第三行では各 $n$ の約数 $d$ に対して $e=n/d$ を置き、逆に任意の $d,e\ge1$ から $n=de$ が一意に定まることを使いました。$de\le x$ なら $d\le x$ であり、$d$ を固定したとき $1\le e\le x/d$ なので、

$$
\sum_{\substack{d,e\ge1\\de\le x}}f(d)g(e)
=\sum_{d\le x}f(d)\sum_{e\le x/d}g(e)
=\sum_{d\le x}f(d)A_g(x/d).
$$

すべて有限和です。[約数個数の畳み込み表示](../NT4/index.md#prop-nt4-divisor-convolutions) $\tau=1*1$ を代入すると、

$$
D(x)=\sum_{d\le x}A_1(x/d)
=\sum_{d\le x}\left\lfloor x/d\right\rfloor
$$

です。最後は $A_1(y)=\lfloor y\rfloor$（$y\ge1$）という定義例を使いました。
<!-- proof-end -->

### 例：$x=10$ で二通りに数える

$D(10)=\sum_{n=1}^{10}\tau(n)$ の各項を列挙すると

$$
1+2+2+3+2+4+2+4+3+4=27.
$$

一方、床関数の和にすると

$$
\left\lfloor\frac{10}{1}\right\rfloor+
\left\lfloor\frac{10}{2}\right\rfloor+\cdots+
\left\lfloor\frac{10}{10}\right\rfloor
=10+5+3+2+2+1+1+1+1+1=27.
$$

前者は積 $de$ を固定して因子対を数え、後者は $d$ を固定して許される $e$ の数を数えています。**$d,e$ は順序付き**です。例えば $n=6$ の $(2,3)$ と $(3,2)$ は別々の組です。

### Möbius 関数を総和すると床関数の恒等式ができる

[逆元関係](#thm-nt5-mobius-unit)を総和すると $A_\varepsilon(x)=1$（$x\ge1$）です。[畳み込みの総和公式](#thm-nt5-summatory-convolution)に $f=\mu,g=1$ を代入すれば

$$
\sum_{d\le x}\mu(d)\left\lfloor\frac xd\right\rfloor=1
\qquad(x\ge1).
$$

例えば $x=6$ では $6-3-2+1=2$ ではありません。実際には $\mu(5)=-1$ に対応するもう一項 $-1$ を忘れているため、

$$
6-3-2-1+1=1
$$

です。**約数 $d\mid6$ だけではなく $d\le6$ の全整数が対象**になる点が、個々の整数の反転公式との大きな違いです。

## 4. Dirichlet の双曲線法への入口

$D(x)$ の床関数和には $\lfloor x\rfloor$ 個もの項があります。しかし $de\le x$ という範囲は、片方の因子が大きいともう片方は小さいという性質を持ちます。境界 $d=e=\sqrt{x}$ で整数対を切り分けると、約 $\sqrt{x}$ 個の和だけで同じ答えを出せます。

<a id="thm-nt5-hyperbola"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet の双曲線分割）**  
> 算術関数 $f,g$、実数 $x\ge1$ に対して $m=\lfloor\sqrt{x}\rfloor$ と置くと、

$$
A_{f*g}(x)
=\sum_{d=1}^{m}f(d)A_g(x/d)
+\sum_{e=1}^{m}g(e)A_f(x/e)
-A_f(m)A_g(m).
$$

> 特に約数個数関数の総和 $D(x)=A_\tau(x)$ は

$$
D(x)=2\sum_{d=1}^{m}\left\lfloor\frac xd\right\rfloor-m^2
$$

> と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

[畳み込みの総和公式](#thm-nt5-summatory-convolution)の整数対 $(d,e)$ を、$d\le m$ の帯と $e\le m$ の帯に分けます。$d,e>m$ は $de>(\sqrt{x})^2=x$ となって存在しません。重なって二度数えた $d,e\le m$ の正方形を一回引きます。

<!-- proof-start -->
### 証明

$m=\lfloor\sqrt{x}\rfloor$ から

$$
m^2\le x<(m+1)^2
$$

です。集合 $H=\{(d,e)\in\mathbb N^2:de\le x\}$ を考えます。$d>m$ かつ $e>m$ なら $d,e\ge m+1$ なので $de\ge(m+1)^2>x$ となり、$H$ に属しません。従って $H$ の各組は $d\le m$ または $e\le m$ を満たします。

さらに $d,e\le m$ なら $de\le m^2\le x$ なので、二つの帯が重なる部分は正確に $\{1,\ldots,m\}^2$ です。そこで [二重和表示](#thm-nt5-summatory-convolution)を二つの帯で足し、重複する正方形を一回引くと

$$
\begin{aligned}
A_{f*g}(x)
&=\sum_{d=1}^{m}\sum_{e\le x/d}f(d)g(e)
+\sum_{e=1}^{m}\sum_{d\le x/e}f(d)g(e)\\
&\quad-\sum_{d=1}^{m}\sum_{e=1}^{m}f(d)g(e)\\
&=\sum_{d=1}^{m}f(d)A_g(x/d)
+\sum_{e=1}^{m}g(e)A_f(x/e)\\
&\quad-A_f(m)A_g(m).
\end{aligned}
$$

最後の項では $f(d)$ と $g(e)$ が別々の添字に依存するため、二重和が積へ分かれます。

$f=g=1$ を代入すると、[約数個数の畳み込み表示](../NT4/index.md#prop-nt4-divisor-convolutions)から $f*g=\tau$、また $A_1(y)=\lfloor y\rfloor$、$A_1(m)=m$ です。よって最初の二和は等しくなり、差し引く正方形には $m^2$ 組あるため、

$$
D(x)=2\sum_{d=1}^{m}\left\lfloor x/d\right\rfloor-m^2
$$

を得ます。
<!-- proof-end -->

### 例：$x=12$ の数え落としと二重計数

$m=\lfloor\sqrt{12}\rfloor=3$ なので、$d\le3$ の各列には $12,6,4$ 個の点があります。行側にも同じ数だけあり、重なった $3\times3$ の正方形を引くと

$$
D(12)=2(12+6+4)-3^2=44-9=35.
$$

これに対して元の式をすべて足しても $12+6+4+3+2+2+1+1+1+1+1+1=35$ です。もし正方形を引かなければ $44$ となり、左下の $9$ 点が二回数えられます。

この分割だけで高度な素数分布定理が証明されたわけではありません。重要なのは、**長い約数和を短い和に置き換える具体的な方法**が手に入ったことです。次に各項の大きさを見積もれば、総和関数の増え方を調べる出発点になります。

## 5. 演習と詳細解答

### Level A：一つの整数で反転と総和を確かめる

#### A1. Möbius 関数を約数に沿って足す

$n=30$ と $n=36$ について $\sum_{d\mid n}\mu(d)$ を、値が非零の約数をすべて挙げて計算せよ。

- Level: A
- ID: NT5-A1

<!-- solution-start -->
**詳細解答**　[定義](../NT4/index.md#def-nt4-mobius)から、$30=2\cdot3\cdot5$ の八つの約数はすべて平方因子を持ちません。各値は $1$ で $1$、一素数 $2,3,5$ で各 $-1$、二素数 $6,10,15$ で各 $1$、三素数 $30$ で $-1$ です。従って $1-3+3-1=0$ です。$36=2^2\cdot3^2$ の約数で $\mu(d)\ne0$ なのは $1,2,3,6$ だけで、値は順に $1,-1,-1,1$ です。他の約数 $4,9,12,18,36$ は平方因子を持つので寄与が $0$ です。よって $1-1-1+1=0$ です。いずれも $n>1$ なので [逆元関係](#thm-nt5-mobius-unit)と一致します。
<!-- solution-end -->

#### A2. 約数和 $\sigma$ を反転する

$f(n)=n$、$F(n)=\sigma(n)$ とする。$n=6$ の反転公式を、$F(1),F(2),F(3),F(6)$ を求めて検算せよ。

- Level: A
- ID: NT5-A2

<!-- solution-start -->
**詳細解答**　[約数個数関数と約数和関数](../NT4/index.md#def-nt4-divisor-functions)から $F(1)=1$、$F(2)=1+2=3$、$F(3)=1+3=4$、$F(6)=1+2+3+6=12$ です。$6$ の約数は $1,2,3,6$ であり、$\mu$ の値は順に $1,-1,-1,1$ です。[反転公式](#thm-nt5-mobius-inversion)に代入すると

$$
\begin{aligned}
f(6)
&=\mu(1)F(6)+\mu(2)F(3)+\mu(3)F(2)+\mu(6)F(1)\\
&=12-4-3+1=6.
\end{aligned}
$$

最初に指定した $f(6)=6$ に戻りました。
<!-- solution-end -->

#### A3. $\varphi$ の約数和を数える

$n=12$ の各正の約数 $d$ に対して $\varphi(d)$ を求め、和が $12$ であることを確かめよ。

- Level: A
- ID: NT5-A3

<!-- solution-start -->
**詳細解答**　$12$ の正の約数は $1,2,3,4,6,12$ です。[Euler の $\varphi$ 関数](../NT2/index.md#def-nt2-euler-phi)は $1\le a\le d$ で互いに素な数の個数なので、順に $\varphi(1)=1$、$\varphi(2)=1$、$\varphi(3)=2$、$\varphi(4)=2$、$\varphi(6)=2$、$\varphi(12)=4$ です。従って $1+1+2+2+2+4=12$ となり、[約数和恒等式](#prop-nt5-totient-divisor-sum)を検算できました。
<!-- solution-end -->

#### A4. 総和関数を二通りに計算する

$D(10)=\sum_{n\le10}\tau(n)$ を、$\tau(n)$ の列挙と床関数の和の二通りで求めよ。

- Level: A
- ID: NT5-A4

<!-- solution-start -->
**詳細解答**　[約数個数関数と約数和関数](../NT4/index.md#def-nt4-divisor-functions)により $n=1,\ldots,10$ での値は $1,2,2,3,2,4,2,4,3,4$ です。和は $27$ です。別法では [畳み込みの総和と二重和](#thm-nt5-summatory-convolution)を使い、

$$
\sum_{d=1}^{10}\left\lfloor10/d\right\rfloor
=10+5+3+2+2+1+1+1+1+1=27.
$$

前者は積 $de=n$ の値ごと、後者は第一因子 $d$ ごとに同じ整数対を数えています。
<!-- solution-end -->

#### A5. 約数和と総和の添字を区別する

$\sum_{d\mid8}\mu(d)$ と $\sum_{1\le d\le8}\mu(d)$ を別々に計算し、両者を同じ和と考えられない理由を説明せよ。

- Level: A
- ID: NT5-A5

<!-- solution-start -->
**詳細解答**　$8$ の約数は $1,2,4,8$ です。[Möbius 関数の定義](../NT4/index.md#def-nt4-mobius)から値は $1,-1,0,0$ で、約数和は $0$ です。一方 $1$ から $8$ までの値は $1,-1,-1,0,-1,1,-1,0$ で、順に足すと $1-1-1-1+1-1=-2$ です。$3,5,6,7$ は $8$ の約数ではないのに第二の和には入ります。[逆元関係](#thm-nt5-mobius-unit)で $0$ になるのは前者の約数和であって、後者の総和ではありません。
<!-- solution-end -->

### Level B：有限和を組み替え、仮定を追う

#### B1. 二乗関数の約数和を反転する

$f(n)=n^2$、$F(n)=\sum_{d\mid n}d^2$ とする。$n=6$ に [Möbius 反転公式](#thm-nt5-mobius-inversion)を適用し、$f(6)$ を求めよ。

- Level: B
- ID: NT5-B1

<!-- solution-start -->
**詳細解答**　$F$ の定義は [約数和変換](#def-nt5-divisor-sum-transform)の仮定を満たします。$F(1)=1$、$F(2)=1+4=5$、$F(3)=1+9=10$、$F(6)=1+4+9+36=50$ です。$\mu(1)=1,\mu(2)=\mu(3)=-1,\mu(6)=1$ なので

$$
(\mu*F)(6)
=\mu(1)F(6)+\mu(2)F(3)+\mu(3)F(2)+\mu(6)F(1)
=50-10-5+1=36.
$$

実際 $f(6)=6^2=36$ です。$F(6)$ から差し引くのは $F(3),F(2)$ であり、単に $\mu(d)F(d)$ を足すのではありません。
<!-- solution-end -->

#### B2. 床関数を使った Möbius の恒等式を証明する

任意の整数 $N\ge1$ に対し、次の恒等式を証明し、$N=10$ で各非零項を計算せよ。

$$
\sum_{d=1}^{N}\mu(d)\left\lfloor\frac Nd\right\rfloor=1.
$$

- Level: B
- ID: NT5-B2

<!-- solution-start -->
**詳細解答**　[逆元関係](#thm-nt5-mobius-unit)より $(\mu*1)(n)=\varepsilon(n)$ です。この等式を $n=1,\ldots,N$ で足し、[総和の二重和表示](#thm-nt5-summatory-convolution)で $f=\mu$、$g=1$ と置くと

$$
\sum_{n=1}^N\varepsilon(n)
=\sum_{d=1}^N\mu(d)A_1(N/d)
=\sum_{d=1}^N\mu(d)\lfloor N/d\rfloor.
$$

左辺は $n=1$ の値 $1$ 以外が $0$ なので $1$ です。$N=10$ では $\mu(d)\ne0$ の $d$ は $1,2,3,5,6,7,10$ です。各項は $10,-5,-3,-2,+1,-1,+1$ で、その和は $10-5-3-2+1-1+1=1$ です。添字は約数 $d\mid10$ ではなく全ての $d\le10$ です。
<!-- solution-end -->

#### B3. 最大公約数で分類して $\varphi$ を復元する

すべての $n\ge1$ に対し $\sum_{d\mid n}\varphi(d)=n$ を、$1\le a\le n$ の最大公約数による分類で証明せよ。さらに反転して $\varphi(12)$ を求めよ。

- Level: B
- ID: NT5-B3

<!-- solution-start -->
**詳細解答**　$a$ ごとに $g=\gcd(a,n)$、$d=n/g$、$b=a/g$ と置くと $d\mid n$ かつ $\gcd(b,d)=1$ です。逆に $d\mid n$ と $1\le b\le d$、$\gcd(b,d)=1$ から $a=(n/d)b$ を復元でき、その最大公約数は $n/d$ です。したがって各 $d$ の組は $\varphi(d)$ 個で、合計が $n$ 個となります。[反転公式](#thm-nt5-mobius-inversion)で $F(n)=n$ と置けば

$$
\varphi(12)=\sum_{d\mid12}\mu(d)\frac{12}{d}.
$$

$\mu(d)$ が非零の約数は $1,2,3,6$ だけなので、$12-6-4+2=4$ です。[Euler の $\varphi$ 関数の定義](../NT2/index.md#def-nt2-euler-phi)でも $1,5,7,11$ の四数が $12$ と互いに素です。
<!-- solution-end -->

#### B4. 約数和の総和を重み付き床関数へ変える

$\sigma= \operatorname{id}*1$ を使い、実数 $x\ge1$ について次を証明せよ。さらに $x=8$ の値を計算せよ。

$$
\sum_{n\le x}\sigma(n)=\sum_{d\le x}d\left\lfloor\frac xd\right\rfloor.
$$

- Level: B
- ID: NT5-B4

<!-- solution-start -->
**詳細解答**　[約数和関数の畳み込み表示](../NT4/index.md#prop-nt4-divisor-convolutions)から $\sigma=\operatorname{id}*1$ です。[畳み込みの総和公式](#thm-nt5-summatory-convolution)へ $f(d)=d$、$g(e)=1$ を代入すると

$$
\begin{aligned}
\sum_{n\le x}\sigma(n)
&=A_{\operatorname{id}*1}(x)
=\sum_{d\le x}\operatorname{id}(d)A_1(x/d)\\
&=\sum_{d\le x}d\lfloor x/d\rfloor.
\end{aligned}
$$

$x=8$ では $d=1,\ldots,8$ に対して右辺は $8+8+6+8+5+6+7+8=56$ です。左辺では $\sigma(1),\ldots,\sigma(8)=1,3,4,7,6,12,8,15$ なので、$1+3+4+7+6+12+8+15=56$ です。
<!-- solution-end -->

### Level C：反転・総和・整数対を接続する

#### C1. 双曲線分割を数え上げから導く

$D(x)=\sum_{n\le x}\tau(n)$ とする。(1) $D(x)$ が $de\le x$ の正整数対 $(d,e)$ の個数に等しいことを示せ。(2) $m=\lfloor\sqrt{x}\rfloor$ の境界で分割公式を証明せよ。(3) $D(30)$ を求めよ。

- Level: C
- ID: NT5-C1

<!-- solution-start -->
**詳細解答**　(1) 各 $n$ に対し $\tau(n)$ は正の約数 $d$ の個数で、選んだ $d$ に対応する $e=n/d$ は一意です。従って $n\le x$ での約数の全体は、$de\le x$ を満たす順序付き組の全体と一対一に対応します。[総和公式](#thm-nt5-summatory-convolution)の $f=g=1$ でも同じことを表します。

(2) $m^2\le x<(m+1)^2$ です。$d,e>m$ なら積は $x$ より大きくなり、数える範囲の外です。従って $d\le m$ または $e\le m$ の少なくとも一方が成立します。前者の組数は $\sum_{d=1}^m\lfloor x/d\rfloor$、後者も対称性で同じ数です。両方を満たす組は $m^2$ 個で、いずれも $de\le m^2\le x$ です。重複分を一度引いて

$$
D(x)=2\sum_{d=1}^m\lfloor x/d\rfloor-m^2
$$

となります。これは [双曲線分割](#thm-nt5-hyperbola)の具体的証明です。

(3) $x=30$ では $m=\lfloor\sqrt{30}\rfloor=5$ で、床関数値は $30,15,10,7,6$ です。その和は $68$ なので $D(30)=2\cdot68-25=111$ です。正方形の $25$ 点を引かないと過大計数になります。
<!-- solution-end -->

#### C2. $\varphi$ の総和を Möbius の床関数和に書き換える

正整数 $N$ に対し $\Phi(N)=\sum_{n=1}^{N}\varphi(n)$ とする。(1) [Möbius 反転公式](#thm-nt5-mobius-inversion)と[畳み込みの総和と二重和](#thm-nt5-summatory-convolution)を使って

$$
\Phi(N)=\frac12\sum_{d=1}^{N}\mu(d)
\left\lfloor\frac Nd\right\rfloor
\left(\left\lfloor\frac Nd\right\rfloor+1\right)
$$

を証明せよ。(2) さらに $\sum_{d=1}^{N}\mu(d)\lfloor N/d\rfloor=1$ を使い、$\Phi(N)$ を床関数の二乗だけの和と定数で表せ。(3) $N=6$ で両辺を検算せよ。

- Level: C
- ID: NT5-C2

<!-- solution-start -->
**詳細解答**　(1) [Euler 関数の反転表示](#prop-nt5-totient-divisor-sum)から $\varphi=\mu*\operatorname{id}$ です。[畳み込みの総和公式](#thm-nt5-summatory-convolution)を $f=\mu$、$g=\operatorname{id}$ に適用し、$q_d=\lfloor N/d\rfloor$ と置くと

$$
\begin{aligned}
\Phi(N)
&=\sum_{d=1}^{N}\mu(d)A_{\operatorname{id}}(N/d)\\
&=\sum_{d=1}^{N}\mu(d)\sum_{k=1}^{q_d}k\\
&=\frac12\sum_{d=1}^{N}\mu(d)q_d(q_d+1).
\end{aligned}
$$

最後は整数 $q\ge1$ に対する $\sum_{k=1}^{q}k=q(q+1)/2$ を用いています。

(2) 展開すると $\Phi(N)=\frac12\sum_{d\le N}\mu(d)q_d^2+\frac12\sum_{d\le N}\mu(d)q_d$ です。[畳み込みの総和と二重和](#thm-nt5-summatory-convolution)に $f=\mu$、$g=1$ を入れ、[逆元関係](#thm-nt5-mobius-unit)を使うと第二の和は $1$ なので

$$
\Phi(N)=\frac12\left(1+\sum_{d=1}^{N}\mu(d)\left\lfloor\frac Nd\right\rfloor^2\right).
$$

(3) $N=6$ では $q_1,\ldots,q_6=6,3,2,1,1,1$、$\mu(1),\ldots,\mu(6)=1,-1,-1,0,-1,1$ です。二乗に付けた符号付き和は $36-9-4-1+1=23$ なので右辺は $(1+23)/2=12$ です。左辺は $\varphi(1),\ldots,\varphi(6)=1,1,2,2,4,2$ の和で $12$ となります。
<!-- solution-end -->

## 6. 次に考える問い

この章では三種類の「和」を区別しました。固定した $n$ の約数和 $F(n)=\sum_{d\mid n}f(d)$、その和を逆に解く Möbius 反転、そして $n\le x$ に渡る総和関数 $A_f(x)$ です。

Dirichlet の双曲線法で和の項数を減らせても、それだけで各床関数を精密に評価できるわけではありません。後続の素数分布を調べる際には、この正確な有限和の恒等式を出発点に、評価の誤差を制御する新しい道具を学びます。
