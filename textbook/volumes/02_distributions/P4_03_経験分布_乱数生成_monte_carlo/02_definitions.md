# 定義

母集団の累積分布関数（cumulative distribution function; CDF）は $F(x)=P(X\le x)$ と定義する。独立同分布標本 $X_1,\ldots,X_n$ の経験分布関数（empirical distribution function; EDF）は
$$F_n(x)=\frac1n\sum_{i=1}^n\boldsymbol 1_{\{X_i\le x\}}.$$
$0<p<1$ に対し、標本 $p$ 分位点は $F_n(x)\ge p$ となる最小の $x$ とする。昇順に並べた順序統計量を $X_{(1)}\le\cdots\le X_{(n)}$ と書けば、この規約では $X_{(\lceil np\rceil)}$ である。同順位の観測値があってもこの定義を使う。

$U\sim\operatorname{Unif}(0,1)$ とする。任意のCDF $F$ に対する一般化逆関数を
$$F^{-1}(u)=\inf\{x\in\mathbb R:F(x)\ge u\}\quad(0<u<1)$$
と定義する。$X=F^{-1}(U)$ と置く方法を逆関数法という。$F$ が連続で狭義増加なら、これは通常の逆関数と一致する。

棄却法では目的密度 $f$、提案密度 $g$、定数 $M\ge1$ が、$f(x)>0$ となるすべての $x$ で $g(x)>0$ かつ $f(x)\le Mg(x)$ を満たすとする。$Y\sim g$ と独立な $U\sim\operatorname{Unif}(0,1)$ を生成し、$g(Y)>0$ かつ $U\le f(Y)/(Mg(Y))$ のとき $Y$ を受理する。$g(Y)=0$ なら受理しない。

$U_i$ を独立一様乱数とし、$I=\int_0^1h(u)du=E[h(U)]$ を
$$\widehat I_N=\frac1N\sum_{i=1}^Nh(U_i)$$
で推定する。$E[h(U)^2]<\infty$ なら標準誤差は $\sqrt{\operatorname{Var}(h(U))/N}$。
