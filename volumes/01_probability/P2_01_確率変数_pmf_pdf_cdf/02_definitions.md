# 定義と記法

## P2-DEF-01 確率変数と分布

確率空間 $(\Omega,\mathcal F,P)$ 上の実確率変数 $X$ は、全ての $x\in\mathbb R$ について $\{\omega:X(\omega)\leq x\}\in\mathcal F$ を満たす写像 $X:\Omega\to\mathbb R$ です。$X$ の分布は、実数上のBorel集合 $A$ に $P(X\in A)$ を割り当てる確率測度です。

## P2-DEF-02 確率質量関数

高々可算な台 $S\subset\mathbb R$ に対し

$$
p_X(x)=P(X=x),\qquad x\in S
$$

をPMFと呼びます。$p_X(x)\geq0$ かつ $\sum_{x\in S}p_X(x)=1$ が必要です。台の外では $p_X(x)=0$ とします。

## P2-DEF-03 確率密度関数

可測関数 $f_X:\mathbb R\to[0,\infty)$ が

$$
P(X\in A)=\int_Af_X(x)\,dx,\qquad
\int_{-\infty}^{\infty}f_X(x)\,dx=1
$$

が全てのBorel集合 $A$ で成り立つときPDFと呼びます。密度の値 $f_X(x)$ 自体は確率ではなく、1を超えることもあります。連続型では $P(X=x)=\int_x^x f_X(t)\,dt=0$ です。

## P2-DEF-04 累積分布関数

$$
F_X(x)=P(X\leq x),\qquad x\in\mathbb R
$$

をCDFと呼びます。離散型では $F_X(x)=\sum_{t\in S:t\leq x}p_X(t)$、連続型では $F_X(x)=\int_{-\infty}^x f_X(t)\,dt$ です。

## P2-DEF-05 同時分布と周辺分布

離散二変量 $(X,Y)$ の同時PMFは $p_{X,Y}(x,y)=P(X=x,Y=y)$ です。連続二変量の同時PDFは

$$
P((X,Y)\in A)=\iint_A f_{X,Y}(x,y)\,dx\,dy
$$

を満たす非負関数です。周辺分布は、他方の変数を全て足す、または積分して得ます。

$X,Y$ が独立であるとは、全てのBorel集合 $A,B$ について $P(X\in A,Y\in B)=P(X\in A)P(Y\in B)$ となることです。離散型では、これは全ての $(x,y)$ について

$$
p_{X,Y}(x,y)=p_X(x)p_Y(y)
$$

となることと同値です。連続型で同時密度と周辺密度をもつ場合は、Lebesgue測度に関してほとんど至る所で

$$
f_{X,Y}(x,y)=f_X(x)f_Y(y)
$$

となることと同値です。密度は零集合上で値を変更しても同じ分布を表すため、連続型では「全ての点」としてはいけません。
