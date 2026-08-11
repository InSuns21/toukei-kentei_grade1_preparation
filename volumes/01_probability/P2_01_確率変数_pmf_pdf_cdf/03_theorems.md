# 基本命題と主要定理

## P2-THM-01 累積分布関数の基本性質

任意の累積分布関数$F$は次を満たします。

1. $x\leq y$ なら $F(x)\leq F(y)$。
2. $\lim_{x\to-\infty}F(x)=0$, $\lim_{x\to\infty}F(x)=1$。
3. $F$ は右連続、すなわち $x_n\downarrow x$ なら $F(x_n)\to F(x)$。

### 証明

$\{X\leq x\}\subset\{X\leq y\}$ なので単調性が従います。$\{X\leq-n\}\downarrow\varnothing$、$\{X\leq n\}\uparrow\Omega$ に確率の上下からの連続性を使えば $F(-n)\to0$, $F(n)\to1$ です。単調性により整数点間の値もそれぞれ0と1へ挟まれるため、実数としての端点極限を得ます。$x_n\downarrow x$ なら $\{X\leq x_n\}\downarrow\{X\leq x\}$ なので右連続性を得ます。

## P2-THM-02 CDFによる区間確率と跳躍

$a<b$ に対し

$$
P(a<X\leq b)=F_X(b)-F_X(a).
$$

また左極限 $F_X(x-)=\lim_{t\uparrow x}F_X(t)$ を用いると

$$
P(X=x)=F_X(x)-F_X(x-).
$$

### 証明

$\{X\leq b\}=\{X\leq a\}\sqcup\{a<X\leq b\}$ へ有限加法性を使います。次に $t_n=x-1/n$ とおくと $t_n\uparrow x$ であり、事象列は

$$
\{X\leq t_n\}\uparrow\bigcup_{n=1}^{\infty}\{X\leq x-1/n\}=\{X<x\}.
$$

下からの連続性より $F_X(x-)=\lim_nF_X(t_n)=P(X<x)$ です。最後に $\{X\leq x\}=\{X<x\}\sqcup\{X=x\}$ へ有限加法性を使えば跳躍公式を得ます。

## P2-THM-03 確率密度関数と累積分布関数の対応

$X$が確率密度関数$f_X$をもつなら

$$
F_X(x)=\int_{-\infty}^x f_X(t)\,dt.
$$

逆に、ある非負関数$f_X$により
$$
F_X(x)=\int_{-\infty}^xf_X(t)\,dt
$$
と表せるなら、長さ0の例外集合を除いて$F_X'(x)=f_X(x)$です。さらに$f_X$が点$x$で連続なら、その点では微積分の基本定理により$F_X'(x)=f_X(x)$です。密度は長さ0の集合上で値を変更しても区間確率が変わらないため、全ての点での等式を要求してはいけません。「累積分布関数が連続」という条件だけでも密度の存在を保証しません。

## P2-THM-04 周辺化公式

離散型では

$$
p_X(x)=\sum_y p_{X,Y}(x,y),
\qquad
p_Y(y)=\sum_x p_{X,Y}(x,y).
$$

連続型では、長さ0の例外を除く各点で

$$
f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy,
\qquad
f_Y(y)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dx.
$$

### 根拠

離散型は排反事象$\{X=x,Y=y\}$を全ての$y$について足します。連続型では同時密度が非負なので、二重積分を$y$から先に計算できます。領域$\{(x,y):a<x\leq b,\ y\in\mathbb R\}$で積分し、$P(a<X\leq b)=\int_a^bf_X(x)\,dx$と照合すれば周辺化公式を得ます。
