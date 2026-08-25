# Advanced 16 重点サンプリング

- 旧No.: 93
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$$
I=\int_0^1x^4\,dx
$$

を Monte Carlo 法で推定する。

1. $U\sim U(0,1)$ を用いる単純な Monte Carlo 推定量を作り、その1標本分散を求めよ。
2. 提案密度

$$
g(x)=2x,
\qquad 0<x<1
$$

から $X$ を生成する重点サンプリング推定量を導け。
3. 重点サンプリングで用いる1標本変数の分散を求め、単純法と比較せよ。

## 詳細解答

### 1. 単純な Monte Carlo 推定

まず積分そのものは

$$
I
=\int_0^1x^4\,dx
=\left[\frac{x^5}{5}\right]_0^1
=\frac15.
$$

$U\sim U(0,1)$ の確率密度関数は区間 $(0,1)$ 上で1だから

$$
E[U^4]
=\int_0^1u^4\,du
=I.
$$

したがって独立な $U_1,\ldots,U_n\sim U(0,1)$ に対して

$$
\widehat I_{\mathrm{simple}}
=\frac1n\sum_{i=1}^nU_i^4
$$

は $I$ の不偏推定量である。

1標本変数 $Z=U^4$ の分散を求める。まず

$$
E[Z^2]
=E[U^8]
=\int_0^1u^8\,du
=\frac19.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(Z)
&=E[Z^2]-E[Z]^2\\
&=\frac19-\left(\frac15\right)^2\\
&=\frac{25-9}{225}\\
&=\boxed{\frac{16}{225}}.
\end{aligned}
$$

$n$ 標本平均の分散はこの値の $1/n$ だが、本問は1標本分散を比較する。

### 2. 重点サンプリング推定量

重点サンプリングの基本は、積分に提案密度 $g$ を掛けて割ることで期待値へ変形することにある。

一般に $g(x)>0$ である領域では

$$
\begin{aligned}
I
&=\int_0^1x^4\,dx\\
&=\int_0^1\frac{x^4}{g(x)}g(x)\,dx\\
&=E_g\left[\frac{X^4}{g(X)}\right].
\end{aligned}
$$

ここで添字 $g$ は、$X$ が確率密度関数 $g$ に従うことを表す。

本問では

$$
g(x)=2x
$$

なので

$$
\frac{x^4}{g(x)}
=\frac{x^4}{2x}
=\frac{x^3}{2},
\qquad 0<x<1.
$$

従って1標本変数を

$$
W=\frac{X^3}{2}
$$

とすれば

$$
E_g[W]=I.
$$

独立な $X_1,\ldots,X_n\sim g$ を用いる重点サンプリング推定量は

$$
\boxed{
\widehat I_{\mathrm{IS}}
=\frac1n\sum_{i=1}^n\frac{X_i^3}{2}
}.
$$

$x=0$ では $g(0)=0$ だが、連続分布では一点の確率は0であり、$x^4/g(x)=x^3/2$ の連続延長を0とすれば問題はない。

### 3. 分散の比較

重点サンプリングの1標本変数は

$$
W=\frac{X^3}{2}.
$$

その平均は $E_g[W]=I=1/5$。二次モーメントは

$$
\begin{aligned}
E_g[W^2]
&=\int_0^1\left(\frac{x^3}{2}\right)^2g(x)\,dx\\
&=\int_0^1\frac{x^6}{4}(2x)\,dx\\
&=\frac12\int_0^1x^7\,dx\\
&=\frac12\cdot\frac18\\
&=\frac1{16}.
\end{aligned}
$$

従って

$$
\begin{aligned}
\operatorname{Var}_g(W)
&=E_g[W^2]-E_g[W]^2\\
&=\frac1{16}-\frac1{25}\\
&=\frac{25-16}{400}\\
&=\boxed{\frac9{400}}.
\end{aligned}
$$

単純法との比較は

$$
\frac9{400}
<
\frac{16}{225}.
$$

したがって本問の提案密度を使う重点サンプリングは、単純な一様サンプリングより1標本分散が小さい。

理由は、被積分関数 $x^4$ が大きくなる $x$ の大きい領域に対して、$g(x)=2x$ が一様分布より多く標本を割り当てるからである。重要な領域を多く観測し、その偏りを重み $1/g(X)$ で補正している。

## 本番答案

$U\sim U(0,1)$ なら

$$
I=E[U^4]=\frac15.
$$

1標本変数 $Z=U^4$ について

$$
E[Z^2]=E[U^8]=\frac19
$$

だから

$$
\operatorname{Var}(Z)
=\frac19-\frac1{25}
=\frac{16}{225}.
$$

重点サンプリングでは

$$
I
=\int_0^1\frac{x^4}{g(x)}g(x)\,dx
=E_g\left[\frac{X^4}{g(X)}\right].
$$

$g(x)=2x$ より

$$
W=\frac{X^4}{2X}=\frac{X^3}{2},
$$

したがって

$$
\widehat I_{\mathrm{IS}}
=\frac1n\sum_{i=1}^n\frac{X_i^3}{2}.
$$

さらに

$$
E_g[W^2]
=\int_0^1\frac{x^6}{4}(2x)\,dx
=\frac1{16},
$$

よって

$$
\operatorname{Var}_g(W)
=\frac1{16}-\frac1{25}
=\frac9{400}
<\frac{16}{225}.
$$

従って重点サンプリングの方が分散が小さい。

## 採点基準

- 単純法（期待値表示・二次モーメント・分散）: 5点
- 重点サンプリング恒等式から重みを導出: 6点
- 重点法の二次モーメント・分散: 6点
- 分散比較と提案密度の役割の解釈: 3点
