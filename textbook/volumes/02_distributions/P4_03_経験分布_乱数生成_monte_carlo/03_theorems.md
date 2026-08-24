# 定理

本節では、一様分布 $\operatorname{Unif}(0,1)$ は密度1（$0<u<1$、台外で0）、指数分布 $\operatorname{Exp}(\lambda)$ は $\lambda>0$、密度 $\lambda e^{-\lambda x}$（$x\ge0$、台外で0）をもつものとする。また標準正規分布 $N(0,1)$ は台 $\mathbb R$、密度 $(2\pi)^{-1/2}e^{-z^2/2}$ をもつ。

## P4R-THM-01 経験CDF

固定した $x$ で $I_i(x)=\boldsymbol 1_{\{X_i\le x\}}$ とおく。これは $P(I_i(x)=1)=F(x)$、$P(I_i(x)=0)=1-F(x)$ のベルヌーイ分布（Bernoulli distribution）に従う。従って
$$E[F_n(x)]=F(x),\qquad \operatorname{Var}(F_n(x))=\frac{F(x)(1-F(x))}{n},$$
大数の法則で $F_n(x)\xrightarrow{p}F(x)$。

## P4R-THM-02 逆関数法

$X=F^{-1}(U)$ とする。$U\le F(x)$ なら一般化逆関数の定義から $F^{-1}(U)\le x$ である。逆に $U>F(x)$ なら、CDFの右連続性より、ある $\delta>0$ が存在して $F(x+\delta)<U$ となる。単調性と合わせると $F^{-1}(U)>x$ である。従って $\{F^{-1}(U)\le x\}=\{U\le F(x)\}$ であり、
$$P(X\le x)=P(U\le F(x))=F(x).$$
指数分布Exp$(\lambda)$では $F(x)=1-e^{-\lambda x}$ より $X=-\log(1-U)/\lambda$。

## P4R-THM-03 棄却法

受理確率を $a(y)=f(y)/(Mg(y))$（$g(y)>0$）、$a(y)=0$（$g(y)=0$）と定める。$f>0$ なら $g>0$ という仮定より、$g=0$ の点では $f=0$ でもある。目的分布の台に含まれる区間 $A=(a,b]$ について、受理して $Y\in A$ となる確率は
$$\int_Ag(y)a(y)dy=\frac1M\int_Af(y)dy.$$
全受理確率は $1/M$ なので、
$$P(Y\in A\mid\text{受理})=\int_Af(y)dy.$$
従って受理後の条件付き密度は $f$ である。同じ手順を反復するときは、各回の $(Y,U)$ を他の回と独立に生成する。

## P4R-THM-04 Monte Carlo誤差

$E[h(U)^2]<\infty$ なら $\widehat I_N$ は不偏、分散は $\operatorname{Var}(h(U))/N$。さらに $0<\operatorname{Var}(h(U))<\infty$ なら、中心極限定理により
$$\frac{\sqrt N(\widehat I_N-I)}{\sqrt{\operatorname{Var}(h(U))}}\xrightarrow{d}N(0,1).$$
分散が0なら $h(U)=I$ が確率1で成り立ち、推定誤差は常に0である。
