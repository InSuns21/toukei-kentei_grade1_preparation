# 基本命題と主要定理

## P1-THM-01 補集合・差・単調性

任意の事象 $A,B$ について

$$
P(A^c)=1-P(A),
\qquad
P(A\setminus B)=P(A)-P(A\cap B)
$$

です。また $A\subset B$ なら $P(A)\leq P(B)$ です。

### 証明

まず $\Omega=\Omega\sqcup\varnothing\sqcup\varnothing\sqcup\cdots$ に可算加法性を使うと

$$
1=1+P(\varnothing)+P(\varnothing)+\cdots
$$

なので $P(\varnothing)=0$ です。排反な $A,B$ に対し、列 $A,B,\varnothing,\ldots$ へ可算加法性を使えば有限加法性 $P(A\cup B)=P(A)+P(B)$ を得ます。ここで $\sqcup$ は排反和を表します。

$\Omega=A\sqcup A^c$ だから $1=P(A)+P(A^c)$ です。また

$$
A=(A\setminus B)\sqcup(A\cap B)
$$

より $P(A\setminus B)=P(A)-P(A\cap B)$ です。$A\subset B$ なら $B=A\sqcup(B\setminus A)$ なので、非負性から $P(B)=P(A)+P(B\setminus A)\geq P(A)$ を得ます。

## P1-THM-02 加法公式と包除原理

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

三事象では

$$
\begin{aligned}
P(A\cup B\cup C)
&=P(A)+P(B)+P(C)\\
&\quad-P(A\cap B)-P(B\cap C)-P(C\cap A)\\
&\quad+P(A\cap B\cap C).
\end{aligned}
$$

二事象では $A\cup B=A\sqcup(B\setminus A)$ なので

$$
P(A\cup B)=P(A)+P(B\setminus A)
=P(A)+P(B)-P(A\cap B).
$$

三事象では二事象の式を $A\cup B$ と $C$ に適用して

$$
P(A\cup B\cup C)=P(A\cup B)+P(C)-P((A\cup B)\cap C).
$$

分配法則より $(A\cup B)\cap C=(A\cap C)\cup(B\cap C)$ です。さらに二事象の式を使うと

$$
P((A\cup B)\cap C)=P(A\cap C)+P(B\cap C)-P(A\cap B\cap C).
$$

この式と $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ を一つ前の式へ代入すれば、表示した三事象の公式を得ます。

## P1-THM-03 下からの連続性

$A_1\subset A_2\subset\cdots$ なら

$$
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=\lim_{n\to\infty}P(A_n).
$$

$B_1=A_1$、$B_n=A_n\setminus A_{n-1}$（$n\geq2$）とおくと $B_n$ は互いに排反で、

$$
A_n=\bigsqcup_{k=1}^nB_k,
\qquad
\bigcup_{n=1}^{\infty}A_n=\bigsqcup_{k=1}^{\infty}B_k
$$

です。有限加法性と可算加法性から

$$
P(A_n)=\sum_{k=1}^nP(B_k),
\qquad
P\left(\bigcup_{n=1}^{\infty}A_n\right)=\sum_{k=1}^{\infty}P(B_k).
$$

右辺の級数は部分和の極限なので結論を得ます。

## P1-THM-04 上からの連続性

$A_1\supset A_2\supset\cdots$ なら

$$
P\left(\bigcap_{n=1}^{\infty}A_n\right)
=\lim_{n\to\infty}P(A_n).
$$

$A_n^c\uparrow$ であり、De Morganの法則から

$$
\bigcup_{n=1}^{\infty}A_n^c
=\left(\bigcap_{n=1}^{\infty}A_n\right)^c.
$$

下からの連続性と補集合公式を順に使うと

$$
1-P\left(\bigcap_{n=1}^{\infty}A_n\right)
=\lim_{n\to\infty}P(A_n^c)
=\lim_{n\to\infty}\{1-P(A_n)\}.
$$

両辺を1から引けば結論を得ます。
