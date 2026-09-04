# Core 19 Beta–Binomial共役Bayes・事後予測

- 旧No.: 59
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

事前分布を

$$
p\sim\operatorname{Beta}(2,2),
\qquad 0<p<1
$$

とし、条件付きで

$$
X\mid p\sim\operatorname{Binomial}(10,p)
$$

とする。$X=7$ を観測した。

必要なら、Beta分布の確率密度関数

$$
f(p;\alpha,\beta)
=\frac{1}{B(\alpha,\beta)}
 p^{\alpha-1}(1-p)^{\beta-1},
\qquad 0<p<1
$$

を使ってよい。

1. 事後分布を求めよ。
2. 二乗損失の下でのBayes推定量を求めよ。
3. 次の1回が成功する事後予測確率を求めよ。
4. 今後2回がともに成功する事後予測確率を求めよ。

## 詳細解答

### 1. 事後分布

事前分布の確率密度関数は

$$
\pi(p)
=\frac1{B(2,2)}p^{2-1}(1-p)^{2-1}.
$$

一方、$X=7$ を観測したときの尤度は、二項分布の確率質量関数から

$$
L(p)
=P_p(X=7)
=\binom{10}{7}p^7(1-p)^3.
$$

Bayesの公式では、事後密度は

$$
\pi(p\mid X=7)
\propto L(p)\pi(p).
$$

したがって

$$
\begin{aligned}
L(p)\pi(p)
&\propto p^7(1-p)^3\,p^1(1-p)^1\\
&=p^8(1-p)^4.
\end{aligned}
$$

Beta分布の密度

$$
p^{\alpha-1}(1-p)^{\beta-1}
$$

と指数を比較すると

$$
\alpha-1=8,
\qquad
\beta-1=4,
$$

すなわち $\alpha=9,\beta=5$ である。正規化すると

$$
\boxed{
p\mid X=7
\sim\operatorname{Beta}(9,5)
}.
$$

「共役だから $9,5$」と暗記する代わりに、**事前密度の指数と尤度の成功・失敗回数の指数が足される**ことを押さえる。

### 2. 二乗損失のBayes推定量

作用を $a$ とすると、観測後の事後期待損失は

$$
R(a\mid x)
=E[(a-p)^2\mid X=7].
$$

事後平均を

$$
m=E[p\mid X=7]
$$

とおくと

$$
\begin{aligned}
E[(a-p)^2\mid X=7]
&=E[(a-m+m-p)^2\mid X=7]\\
&=(a-m)^2
+E[(p-m)^2\mid X=7],
\end{aligned}
$$

となる。交差項は $E[p-m\mid X=7]=0$ なので消える。第2項は $a$ に依存しないため、事後期待損失を最小にするのは

$$
a=m=E[p\mid X=7].
$$

Beta$(\alpha,\beta)$ の平均は $\alpha/(\alpha+\beta)$ なので

$$
\boxed{
\widehat p_{\mathrm{Bayes}}
=E[p\mid X=7]
=\frac9{14}
}.
$$

### 3. 次の1回が成功する事後予測確率

次のベルヌーイ試行を $Y$ とする。$p$ が与えられれば

$$
P(Y=1\mid p,X=7)=p.
$$

$p$ 自体は事後分布に従うので、全確率の考え方で平均を取ると

$$
\begin{aligned}
P(Y=1\mid X=7)
&=E[P(Y=1\mid p,X=7)\mid X=7]\\
&=E[p\mid X=7]\\
&=\boxed{\frac9{14}}.
\end{aligned}
$$

「次回成功確率=事後平均」は、上の条件付き確率を事後分布で平均した結果である。

### 4. 今後2回がともに成功する事後予測確率

今後2回を $Y_1,Y_2$ とする。$p$ が与えられれば2試行は独立なので

$$
P(Y_1=1,Y_2=1\mid p,X=7)=p^2.
$$

したがって

$$
P(Y_1=1,Y_2=1\mid X=7)
=E[p^2\mid X=7].
$$

ここで $p\mid X=7\sim\operatorname{Beta}(9,5)$ だから

$$
\begin{aligned}
E[p^2\mid X=7]
&=\frac{1}{B(9,5)}
\int_0^1p^{10}(1-p)^4\,dp\\
&=\frac{B(11,5)}{B(9,5)}.
\end{aligned}
$$

Beta関数とGamma関数の関係

$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

を使うと

$$
\begin{aligned}
\frac{B(11,5)}{B(9,5)}
&=\frac{\Gamma(11)}{\Gamma(9)}
\frac{\Gamma(14)}{\Gamma(16)}\\
&=\frac{9\cdot10}{14\cdot15}\\
&=\boxed{\frac37}.
\end{aligned}
$$

一般に Beta$(\alpha,\beta)$ なら

$$
E[p^2]
=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}
$$

となるが、本問では上の積分からその式がどこから来るかまで確認した。

## 本番答案

事前密度と尤度は

$$
\pi(p)\propto p^1(1-p)^1,
\qquad
L(p)\propto p^7(1-p)^3.
$$

したがって

$$
\pi(p\mid X=7)
\propto p^8(1-p)^4,
$$

より

$$
p\mid X=7\sim\operatorname{Beta}(9,5).
$$

二乗損失の事後期待損失は

$$
E[(a-p)^2\mid X]
=(a-E[p\mid X])^2+\operatorname{Var}(p\mid X)
$$

なのでBayes推定量は事後平均

$$
\frac9{14}.
$$

次の1回の成功確率も

$$
E[p\mid X]=\frac9{14}.
$$

今後2回がともに成功する確率は、$p$ を条件にした独立性から

$$
E[p^2\mid X]
=\frac{B(11,5)}{B(9,5)}
=\frac{9\cdot10}{14\cdot15}
=\frac37.
$$

## 採点基準

- 事後分布（事前密度×尤度から指数を導出）: 6点
- 二乗損失のBayes推定量（事後期待損失の最小化）: 5点
- 1回の事後予測（条件付き確率の平均）: 4点
- 2回の事後予測（条件付き独立と2次モーメントの導出）: 5点
