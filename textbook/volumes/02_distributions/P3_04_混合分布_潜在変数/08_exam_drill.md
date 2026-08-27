# 30分ドリル

- level: C
- minutes: 30
- total: 100点
- model: 一つのPoisson--Gamma階層モデル

## 過去問傾向との対応

MATH-2022-Q3の「PoissonとGammaの混合を周辺化し、得られた分布のモーメントへ進む」連鎖を参考にした独自問題である。問題文・数値の転載はしない。3分で階層を図示し、15分で周辺分布とモーメント、25分で推定・予測まで到達する。

## P3L-DRILL-01

$X_i\mid\Lambda_i=\lambda_i\sim\operatorname{Poisson}(\lambda_i)$、$\Lambda_i\overset{\mathrm{i.i.d.}}{\sim}\operatorname{Gamma}(\alpha,\beta)$、$\alpha,\beta>0$、$i=1,\ldots,n$ とし、各 $X_i$ は対応する $\Lambda_i$ を条件に独立とする。5では $Y\mid\Lambda_1=\lambda\sim\operatorname{Poisson}(\lambda)$ とし、$X_1$ と $Y$ は共有潜在率 $\Lambda_1$ を条件に独立とする。Gamma密度は
$$f(\lambda)=\frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda},\quad \lambda>0,$$
Poisson質量関数は
$$P(X_i=k\mid\lambda)=e^{-\lambda}\frac{\lambda^k}{k!},\quad k\in\mathbb N_0.$$

1. 周辺確率質量関数（probability mass function; PMF）$P(X_i=k)$ を積分し、Gamma関数で表せ。（20点）
2. $E[X_i]$ と $\operatorname{Var}(X_i)$ を全期待値・全分散で求めよ。（20点）
3. $\widehat\alpha=\beta\bar X$ を定義し、$E[\widehat\alpha]$ と $\operatorname{Var}(\widehat\alpha)$ を求めよ。（20点）
4. チェビシェフの不等式 $P(|W-E[W]|\geq\varepsilon)\leq\operatorname{Var}(W)/\varepsilon^2$ を用いて $\widehat\alpha\xrightarrow{p}\alpha$ を示せ。（20点）
5. $X_1=x$ を観測した後の共有潜在率による $Y\mid\Lambda_1=\lambda\sim\operatorname{Poisson}(\lambda)$ について、$P(Y=0\mid X_1=x)$ を求めよ。（20点）

第2問を得られない場合、第3・4問では $E[X_i]=\alpha/\beta$、$\operatorname{Var}(X_i)=\alpha/\beta+\alpha/\beta^2$ を用いてよい。第1問を得られなくても、第5問は事前密度と $X_1=x$ の尤度から独立に開始してよい。

## 25分時点の判断

1の積分が止まったら、被積分関数を $\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}$ にまとめた式を残す。3まで到達すれば不偏性と分散で部分点を確保できる。5は事後Gamma分布の形を先に書き、$E[e^{-\Lambda_1}\mid X_1=x]$ を計算する。

## 完成形答案

$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
$$E[X_i]=\frac\alpha\beta,\; \operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2}.$$
$$E[\widehat\alpha]=\alpha,\; \operatorname{Var}(\widehat\alpha)=\frac{\alpha(\beta+1)}n.$$
よってチェビシェフの不等式の右辺は $\alpha(\beta+1)/(n\varepsilon^2)\to0$ であり $\widehat\alpha\xrightarrow{p}\alpha$。さらに共有潜在率 $\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1)$ なので
$$P(Y=0\mid X_1=x)=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.$$

## 詳細解答と採点基準

1. **方針。** 潜在率を積分して消去する。条件付き質量と事前密度を掛けると
$$
\begin{aligned}
P(X_i=k)
&=\int_0^\infty
e^{-\lambda}\frac{\lambda^k}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty\lambda^{k+\alpha-1}
e^{-(\beta+1)\lambda}\,d\lambda.
\end{aligned}
$$
$t=(\beta+1)\lambda$ と置けば $d\lambda=dt/(\beta+1)$ なので
$$
\int_0^\infty\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}d\lambda
=\frac{\Gamma(k+\alpha)}{(\beta+1)^{k+\alpha}}.
$$
従って
$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
積分10点、整理10点。
2. **方針。** 周辺PMFから和を計算せず、階層表現へ全期待値・全分散を使う。
$$
E[X_i]
=E\{E[X_i\mid\Lambda_i]\}
=E[\Lambda_i]=\frac{\alpha}{\beta}.
$$
またPoisson分布では条件付き分散も $\Lambda_i$ なので
$$
\begin{aligned}
\operatorname{Var}(X_i)
&=E\{\operatorname{Var}(X_i\mid\Lambda_i)\}
+\operatorname{Var}\{E[X_i\mid\Lambda_i]\}\\
&=E[\Lambda_i]+\operatorname{Var}(\Lambda_i)
=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
\end{aligned}
$$
全期待値10点、全分散10点。
3. **方針。** 期待値には線形性、分散には $X_i$ の独立性を使う。
$$E[\widehat\alpha]=\beta E[\bar X]=\beta\frac{\alpha}{\beta}=\alpha.$$
さらに
$$\operatorname{Var}(\widehat\alpha)=\beta^2\frac{\operatorname{Var}(X_i)}n=\frac{\alpha(\beta+1)}n.$$
不偏10点、分散10点。
4. **方針。** 第3問の平均と分散をチェビシェフの不等式へそのまま代入する。
任意の $\varepsilon>0$ に対し
$$P(|\widehat\alpha-\alpha|\geq\varepsilon)\leq\frac{\alpha(\beta+1)}{n\varepsilon^2}\to0,$$
従って $\widehat\alpha\xrightarrow{p}\alpha$。不等式10点、極限10点。
5. **方針。** まず共有潜在率の事後分布を求め、次に $Y=0$ の条件付き確率を事後平均する。

尤度と事前密度の積は
$$
\lambda^xe^{-\lambda}
\lambda^{\alpha-1}e^{-\beta\lambda}
=\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}
$$
に比例する。従って
$$\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1).$$
$a=\alpha+x,b=\beta+1$ とおくと
$$
\begin{aligned}
P(Y=0\mid X_1=x)
&=E[e^{-\Lambda_1}\mid X_1=x]\\
&=\int_0^\infty e^{-\lambda}
\frac{b^a}{\Gamma(a)}\lambda^{a-1}e^{-b\lambda}\,d\lambda\\
&=\frac{b^a}{(b+1)^a}
=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
\end{aligned}
$$
事後分布10点、予測10点。

**検算。** 周辺PMFは非負で、予測確率は0と1の間にある。$\operatorname{Var}(X_i)-E[X_i]=\alpha/\beta^2>0$ は混合による過分散と一致する。

3分で階層確認、15分で2、25分で4までを目標とする。1の積分が止まった場合は整理後の被積分関数を残し、問題文で与えた $E[X_i]$ と $\operatorname{Var}(X_i)$ を使って3・4へ復帰する。
