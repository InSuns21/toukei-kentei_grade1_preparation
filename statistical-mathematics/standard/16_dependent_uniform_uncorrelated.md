# Standard 06 依存する一様分布・無相関

- 旧No.: 16
- 層: Standard
- 演習価値: B
- 難度: B
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$U$ は区間 $(-1,1)$ 上の一様分布に従い、その確率密度関数を

$$
f_U(u)=
\begin{cases}
\dfrac12,&-1<u<1,\\
0,&\text{otherwise}
\end{cases}
$$

とする。さらに

$$
V=2|U|-1
$$

と定める。

1. $V$ の分布を求めよ。
2. $\operatorname{Corr}(U,V)$ を求めよ。
3. $U,V$ が独立でないことを示せ。

## 詳細解答

### 1. $V$ の分布

まず $W=|U|$ と置く。$0\le w\le1$ に対して

$$
\begin{aligned}
P(W\le w)
&=P(|U|\le w)\\
&=P(-w\le U\le w).
\end{aligned}
$$

問題文の密度 $f_U(u)=1/2$ を使えば

$$
P(-w\le U\le w)
=\int_{-w}^{w}\frac12\,du
=w.
$$

よって

$$
P(W\le w)=w,
\qquad 0\le w\le1,
$$

すなわち

$$
W=|U|\sim U(0,1).
$$

次に

$$
V=2W-1.
$$

$-1\le v\le1$ に対して

$$
\begin{aligned}
P(V\le v)
&=P(2W-1\le v)\\
&=P\left(W\le\frac{v+1}{2}\right)\\
&=\frac{v+1}{2}.
\end{aligned}
$$

これは区間 $(-1,1)$ 上の一様分布の累積分布関数である。したがって

$$
\boxed{V\sim U(-1,1)}.
$$

### 2. 相関係数

相関係数は

$$
\operatorname{Corr}(U,V)
=\frac{\operatorname{Cov}(U,V)}
{\sqrt{\operatorname{Var}(U)\operatorname{Var}(V)}}
$$

だから、まず共分散を求める。

$U$ の分布は0について対称なので

$$
E[U]=0.
$$

また第1問で $W=|U|\sim U(0,1)$ と分かったから

$$
E[|U|]=E[W]=\frac12.
$$

したがって

$$
E[V]
=E[2|U|-1]
=2\cdot\frac12-1
=0.
$$

さらに

$$
UV
=U(2|U|-1)
=2U|U|-U.
$$

$u|u|$ も $u$ も奇関数であり、$U$ の密度は0について対称なので

$$
E[U|U|]=0,
\qquad
E[U]=0.
$$

従って

$$
E[UV]
=2E[U|U|]-E[U]
=0.
$$

よって

$$
\operatorname{Cov}(U,V)
=E[UV]-E[U]E[V]
=0.
$$

一方 $U,V$ はどちらも $U(-1,1)$ なので

$$
\operatorname{Var}(U)=\operatorname{Var}(V)=\frac13>0.
$$

したがって

$$
\boxed{\operatorname{Corr}(U,V)=0}.
$$

### 3. 独立でないこと

「$V$ が $U$ の関数だから独立でない」とだけ書くのではなく、独立性の定義に反する事象を具体的に作る。

$$
A=\{|U|\le1/2\},
\qquad
B=\{V\le0\}
$$

と置く。$V=2|U|-1$ なので

$$
V\le0
\iff |U|\le\frac12.
$$

従って $A=B$ である。

$|U|\sim U(0,1)$ だから

$$
P(A)=P(B)=\frac12.
$$

また $A=B$ なので

$$
P(A\cap B)=P(A)=\frac12.
$$

もし $U$ と $V$ が独立なら、$U$ だけで決まる事象 $A$ と $V$ だけで決まる事象 $B$ について

$$
P(A\cap B)=P(A)P(B)=\frac14
$$

でなければならない。しかし実際には $1/2\ne1/4$ である。したがって

$$
\boxed{U,V\text{ は独立でない}}.
$$

この例は「相関係数0」から一般には独立性を結論できないことを示している。

## 本番答案

$W=|U|$ と置くと、$0\le w\le1$ で

$$
P(W\le w)
=P(-w\le U\le w)
=\int_{-w}^{w}\frac12\,du
=w,
$$

より $W\sim U(0,1)$。したがって $V=2W-1\sim U(-1,1)$。

対称性から

$$
E[U]=E[V]=0,
\qquad
E[U|U|]=0.
$$

よって

$$
E[UV]
=2E[U|U|]-E[U]
=0,
$$

したがって

$$
\operatorname{Corr}(U,V)=0.
$$

一方

$$
A=\{|U|\le1/2\},
\qquad
B=\{V\le0\}
$$

とすると $A=B$ で、

$$
P(A\cap B)=\frac12
\ne
\frac14=P(A)P(B).
$$

従って $U,V$ は独立でない。

## 採点基準

- $|U|$ の累積分布関数から $V$ の分布を導出: 6点
- 共分散・相関係数0の導出: 6点
- 独立性の定義に反する事象による証明: 6点
- 「無相関は独立を意味しない」という解釈: 2点
