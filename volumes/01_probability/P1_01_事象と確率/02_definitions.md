# 定義と記法

## P1-DEF-01 標本空間と事象

まず本章の計算問題では、試行で起こり得る結果全体を有限集合$\Omega$とし、その任意の部分集合$A\subset\Omega$を事象とします。各結果$\omega$に重み$p(\omega)\geq0$を与え、$\sum_{\omega\in\Omega}p(\omega)=1$なら
$$
P(A)=\sum_{\omega\in A}p(\omega)
$$
で確率を計算できます。

無限個の結果も一つの記法で扱うため、一般には確率を割り当てる部分集合だけを集め、その全体を$\mathcal F$と書きます。$\mathcal F$は次の閉性を満たすものとし、これを$\sigma$-加法族と呼びます。有限標本空間では、特に断らない限り$\mathcal F=2^\Omega$とします。この抽象化は定理の厳密な記述に使いますが、本章の有限計算では上の和の式だけで十分です。

1. $\Omega\in\mathcal F$。
2. $A\in\mathcal F$ なら $A^c\in\mathcal F$。
3. $A_1,A_2,\ldots\in\mathcal F$ なら $\bigcup_{n=1}^{\infty}A_n\in\mathcal F$。

## 事象の演算

- $A\cup B$: 少なくとも一方が起こる。
- $A\cap B$: ともに起こる。
- $A^c$: $A$ が起こらない。
- $A\setminus B=A\cap B^c$: $A$ だけが起こる。
- $A\triangle B=(A\setminus B)\cup(B\setminus A)$: ちょうど一方が起こる。

## P1-DEF-02 確率測度

$P:\mathcal F\to[0,1]$ が確率測度であるとは、$P(\Omega)=1$、非負性、可算加法性を満たすことです。可算加法性とは、互いに排反な $A_1,A_2,\ldots$ に対して

$$
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=\sum_{n=1}^{\infty}P(A_n)
$$

が成り立つことです。

## P1-DEF-03 排反と分割

$A\cap B=\varnothing$ のとき $A,B$ は排反です。互いに排反な事象列の和が $A$ なら、その列を $A$ の分割と呼びます。排反と独立は別概念です。

## P1-DEF-03A 有限等確率モデルと一様無作為抽出

有限集合 $\Omega$ の各標本点が同じ確率 $1/|\Omega|$ をもつとき、任意の事象 $A$ について

$$
P(A)=\frac{|A|}{|\Omega|}
$$

です。有限集団から1個体を一様無作為抽出するとは、各個体が選ばれる確率が等しい抽出をいいます。この仮定があるときに限り、該当人数の比を抽出個体が該当する確率として使えます。

## P1-DEF-04 limsup事象とliminf事象

$$
\limsup_{n\to\infty}A_n
=\bigcap_{m=1}^{\infty}\bigcup_{n=m}^{\infty}A_n
$$

は無限に多くの $n$ で $A_n$ が起こる事象です。

$$
\liminf_{n\to\infty}A_n
=\bigcup_{m=1}^{\infty}\bigcap_{n=m}^{\infty}A_n
$$

は、ある時点以降ずっと $A_n$ が起こる事象です。常に $\liminf A_n\subset\limsup A_n$ です。
