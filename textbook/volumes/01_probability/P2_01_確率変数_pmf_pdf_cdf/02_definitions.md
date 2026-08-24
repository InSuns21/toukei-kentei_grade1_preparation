# 定義と記法

## P2-DEF-01 確率変数と分布

確率空間$(\Omega,\mathcal F,P)$上の実確率変数$X$は、全ての$x\in\mathbb R$について事象$\{\omega:X(\omega)\leq x\}$の確率を考えられる写像$X:\Omega\to\mathbb R$です。$X$の分布は、区間$(-\infty,x]$など通常扱う実数の集合$A$に$P(X\in A)$を割り当てる規則です。本章では測度論の集合構成を前提にせず、区間・有限集合・平面領域で必要な確率を扱います。

## P2-DEF-02 確率質量関数

高々可算な台 $S\subset\mathbb R$ に対し

$$
p_X(x)=P(X=x),\qquad x\in S
$$

を確率質量関数（probability mass function; PMF）と呼びます。$p_X(x)\geq0$かつ$\sum_{x\in S}p_X(x)=1$が必要です。台の外では$p_X(x)=0$とします。

## P2-DEF-03 確率密度関数

積分できる非負関数$f_X:\mathbb R\to[0,\infty)$が

$$
P(a<X\leq b)=\int_a^bf_X(x)\,dx,\qquad
\int_{-\infty}^{\infty}f_X(x)\,dx=1
$$

が全ての$a<b$で成り立つとき、$f_X$を確率密度関数（probability density function; PDF）と呼びます。密度の値$f_X(x)$自体は確率ではなく、1を超えることもあります。連続型では$P(X=x)=\int_x^x f_X(t)\,dt=0$です。

## P2-DEF-04 累積分布関数

$$
F_X(x)=P(X\leq x),\qquad x\in\mathbb R
$$

を累積分布関数（cumulative distribution function; CDF）と呼びます。離散型では$F_X(x)=\sum_{t\in S:t\leq x}p_X(t)$、連続型では$F_X(x)=\int_{-\infty}^x f_X(t)\,dt$です。

## P2-DEF-05 同時分布と周辺分布

離散二変量 $(X,Y)$ の同時PMFは $p_{X,Y}(x,y)=P(X=x,Y=y)$ です。連続二変量の同時PDFは

$$
P((X,Y)\in A)=\iint_A f_{X,Y}(x,y)\,dx\,dy
$$

を満たす非負関数です。周辺分布は、他方の変数を全て足す、または積分して得ます。

$X,Y$が独立であるとは、任意の区間$A,B$について$P(X\in A,Y\in B)=P(X\in A)P(Y\in B)$となることです。離散型では、これは全ての$(x,y)$について

$$
p_{X,Y}(x,y)=p_X(x)p_Y(y)
$$

となることと同値です。連続型で同時密度と周辺密度をもつ場合は、面積0の例外集合を除く全ての点で

$$
f_{X,Y}(x,y)=f_X(x)f_Y(y)
$$

となることと同値です。密度は面積0の集合上で値を変更しても積分値が変わらないため、連続型では一点だけの不一致を反証に使えません。
