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

1. $P(X_i=k)$ を積分し、Gamma関数で表せ。（20点）
2. $E[X_i]$ と $\operatorname{Var}(X_i)$ を全期待値・全分散で求めよ。（20点）
3. $\widehat\alpha=\beta\bar X$ を定義し、$E[\widehat\alpha]$ と $\operatorname{Var}(\widehat\alpha)$ を求めよ。（20点）
4. Chebyshev不等式 $P(|W-E[W]|\geq\varepsilon)\leq\operatorname{Var}(W)/\varepsilon^2$ を用いて $\widehat\alpha\xrightarrow{p}\alpha$ を示せ。（20点）
5. $X_1=x$ を観測した後の共有潜在率による $Y\mid\Lambda_1=\lambda\sim\operatorname{Poisson}(\lambda)$ について、$P(Y=0\mid X_1=x)$ を求めよ。（20点）

## 25分時点の判断

1の積分が止まったら、被積分関数を $\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}$ にまとめた式を残す。3まで到達すれば不偏性と分散で部分点を確保できる。5は事後Gamma分布の形を先に書き、$E[e^{-\Lambda_1}\mid X_1=x]$ を計算する。

## 完成形答案

$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
$$E[X_i]=\frac\alpha\beta,\; \operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2}.$$
$$E[\widehat\alpha]=\alpha,\; \operatorname{Var}(\widehat\alpha)=\frac{\alpha(\beta+1)}n.$$
よってChebyshev不等式の右辺は $\alpha(\beta+1)/(n\varepsilon^2)\to0$ であり $\widehat\alpha\xrightarrow{p}\alpha$。さらに共有潜在率 $\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1)$ なので
$$P(Y=0\mid X_1=x)=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.$$

## 詳細解答と採点基準

1. 尤度とGamma密度を掛けると $\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}$ となる。Gamma積分を適用して
$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
積分10点、整理10点。
2. $E[X_i]=E[\Lambda_i]=\alpha/\beta$。全分散より
$$\operatorname{Var}(X_i)=E[\Lambda_i]+\operatorname{Var}(\Lambda_i)=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.$$
全期待値10点、全分散10点。
3. $E[\widehat\alpha]=\beta E[\bar X]=\alpha$、独立性から
$$\operatorname{Var}(\widehat\alpha)=\beta^2\frac{\operatorname{Var}(X_i)}n=\frac{\alpha(\beta+1)}n.$$
不偏10点、分散10点。
4. Chebyshevにより
$$P(|\widehat\alpha-\alpha|\geq\varepsilon)\leq\frac{\alpha(\beta+1)}{n\varepsilon^2}\to0,$$
従って $\widehat\alpha\xrightarrow{p}\alpha$。不等式10点、極限10点。
5. 尤度と事前密度の積は $\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}$ に比例するため、共有潜在率の事後は $\operatorname{Gamma}(\alpha+x,\beta+1)$。よって
$$E[e^{-\Lambda_1}\mid X_1=x]=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.$$
事後分布10点、予測10点。

3分で階層確認、15分で2、25分で4までを目標とする。1の積分が止まった場合は整理後の被積分関数を残し、3までの不偏性・分散で部分点を確保する。
