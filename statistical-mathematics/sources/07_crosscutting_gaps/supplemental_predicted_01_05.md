# 統計数理 横断補完予想問題 1〜5

既存95題を独立した統計数理問題集として再編した後に、旧章の一般ドリルへ依存せずにシラバスを横断できるかを再点検し、相対的に薄かった5論点を補うための独自問題集である。

- 公式過去問の復元ではない。
- 100題に合わせるための水増しではなく、既存問題を残したまま不足分を追加した結果である。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 一覧

| No. | 安定ID | 主題 | 演習価値 | 難度 | 目安 |
| ---: | --- | --- | :---: | :---: | ---: |
| 96 | `PRED-MATHSTAT-096-WEIBULL` | Weibull分布・生存関数・ハザード | A | A | 25分 |
| 97 | `PRED-MATHSTAT-097-NEGBIN` | 幾何分布・負の二項分布・待ち時間 | A | A | 25分 |
| 98 | `PRED-MATHSTAT-098-BAYES-LOSS` | Bayes意思決定と損失関数 | S | A | 25分 |
| 99 | `PRED-MATHSTAT-099-COMPOSITE-PVALUE` | 複合帰無仮説の妥当なP値 | S | A | 25分 |
| 100 | `PRED-MATHSTAT-100-LOCAL-POWER` | 一致検定・局所対立・漸近検出力 | S | S | 30分 |

---

# 96. Weibull寿命モデルを生存関数・ハザードから読む

$T>0$ の分布関数を

$$
F(t)=1-\exp\left[-\left(\frac{t}{\lambda}\right)^k\right],
\qquad k>0,\ \lambda>0
$$

とする。

## 問題

1. 生存関数 $S(t)$、密度 $f(t)$、ハザード $h(t)=f(t)/S(t)$、累積ハザード $H(t)$ を求めよ。
2. $k<1,k=1,k>1$ でハザードがどう変化するか述べよ。
3. $Y=(T/\lambda)^k$ の分布を求めよ。
4. $T$ の中央値を求めよ。
5. 独立標本 $T_1,\ldots,T_n$ が同分布に従い、$k$ は既知とする。$\lambda$ のMLEを求めよ。

## 解答

$$
S(t)=\exp[-(t/\lambda)^k],
$$

$$
f(t)=\frac{k}{\lambda}\left(\frac{t}{\lambda}\right)^{k-1}e^{-(t/\lambda)^k}.
$$

したがって

$$
\boxed{h(t)=\frac{k}{\lambda}(t/\lambda)^{k-1}},
\qquad
\boxed{H(t)=(t/\lambda)^k}.
$$

よって $k<1$ では減少、$k=1$ では一定、$k>1$ では増加ハザードである。さらに

$$
P(Y\le y)=1-e^{-y}
$$

より

$$
\boxed{Y\sim\operatorname{Exp}(1)}.
$$

中央値 $m$ は $S(m)=1/2$ から

$$
\boxed{m=\lambda(\log2)^{1/k}}.
$$

$k$ 既知の対数尤度の $\lambda$ 依存部分は

$$
\ell(\lambda)=-nk\log\lambda-\lambda^{-k}\sum_{i=1}^nT_i^k+C.
$$

微分して0とおけば

$$
\boxed{\widehat\lambda_{\mathrm{ML}}=\left(\frac1n\sum_{i=1}^nT_i^k\right)^{1/k}}.
$$

---

# 97. 幾何分布から負の二項分布へ待ち時間でつなぐ

独立なBernoulli試行を繰り返し、成功確率を $p\in(0,1)$ とする。最初の成功までの試行回数を $G$ とする。

## 問題

1. $G$ の確率質量関数とPGF $P_G(s)=E[s^G]$ を求めよ。
2. $E[G]$ と $\operatorname{Var}(G)$ を求めよ。
3. 無記憶性 $P(G>m+n\mid G>m)=P(G>n)$ を示せ。
4. 独立な $G_1,\ldots,G_r$ に対し $N=\sum_{j=1}^rG_j$ とする。$N$ のPGFと確率質量関数を求めよ。
5. $E[N]$ と $\operatorname{Var}(N)$ を求めよ。

## 解答

$$
\boxed{P(G=k)=(1-p)^{k-1}p},
\qquad k=1,2,\ldots
$$

であり、等比級数から

$$
\boxed{P_G(s)=\frac{ps}{1-(1-p)s}}.
$$

したがって

$$
\boxed{E[G]=1/p},
\qquad
\boxed{\operatorname{Var}(G)=(1-p)/p^2}.
$$

また $P(G>m)=(1-p)^m$ なので無記憶性が直ちに従う。独立性から

$$
P_N(s)=\left[\frac{ps}{1-(1-p)s}\right]^r.
$$

$r$ 回目の成功が $n$ 回目に起こる確率は

$$
\boxed{P(N=n)={n-1\choose r-1}p^r(1-p)^{n-r}},
\qquad n=r,r+1,\ldots
$$

であり、試行回数型の負の二項分布である。よって

$$
\boxed{E[N]=r/p},
\qquad
\boxed{\operatorname{Var}(N)=r(1-p)/p^2}.
$$

---

# 98. Bayes推定量は損失関数で変わる

データ $x$ の後の事後密度を $\pi(\theta\mid x)$ とする。

## 問題

1. 二乗損失 $L(\theta,a)=(\theta-a)^2$ のBayes推定量を求めよ。
2. 絶対損失 $L(\theta,a)=|\theta-a|$ のBayes推定量を求めよ。
3. 離散母数に0–1損失 $L(\theta,a)=\boldsymbol{1}_{\{\theta\ne a\}}$ を用いるときのBayes推定量を求めよ。
4. $X\mid p\sim\operatorname{Bin}(n,p)$、$p\sim\operatorname{Beta}(\alpha,\beta)$ のとき、$X=x$ 後の事後分布と二乗損失Bayes推定量を求めよ。
5. 事後Beta分布の両パラメータが1より大きいときMAPを求め、事後平均と比較せよ。

## 解答

事後平均を $m=E[\theta\mid x]$ とすると

$$
E[(\theta-a)^2\mid x]=\operatorname{Var}(\theta\mid x)+(m-a)^2
$$

なので、二乗損失では

$$
\boxed{a_B=E[\theta\mid x]}.
$$

絶対損失の事後期待損失を微分すると $2F(a\mid x)-1$ となるため

$$
\boxed{a_B=\operatorname{median}(\theta\mid x)}.
$$

離散母数の0–1損失では $1-P(\theta=a\mid x)$ を最小化するから

$$
\boxed{a_B=\mathop{\arg\max}_aP(\theta=a\mid x)}.
$$

Beta–Binomialでは

$$
\boxed{p\mid X=x\sim\operatorname{Beta}(\alpha+x,\beta+n-x)}.
$$

したがって二乗損失では

$$
\boxed{\widehat p_B=\frac{\alpha+x}{\alpha+\beta+n}}.
$$

一方、両パラメータが1より大きければMAPは

$$
\boxed{\widehat p_{\mathrm{MAP}}=\frac{\alpha+x-1}{\alpha+\beta+n-2}}.
$$

同じ事後分布でも損失関数により最適な点推定値が変わることが核心である。

---

# 99. 複合帰無仮説のP値を上限確率で作る

$$
H_0:\theta\in\Theta_0
$$

を複合帰無仮説とし、統計量 $T$ は大きいほど帰無仮説に不利とする。

## 問題

1. 
   $$
   p(x)=\sup_{\theta\in\Theta_0}P_\theta\{T(X)\ge T(x)\}
   $$
   と定める。各固定 $\theta$ の上側P値が連続とし、任意の $\theta\in\Theta_0$ に対して $P_\theta\{p(X)\le\alpha\}\le\alpha$ を示せ。
2. 帰無母数を推定して単純代入するplug-in P値では一般に有意水準が保証されない理由を述べよ。
3. $X\sim N(\mu,1)$、$H_0:\mu\le0$ 対 $H_1:\mu>0$、$T=X$ のときのP値と棄却域を求めよ。

## 解答

任意の固定 $\theta_0\in\Theta_0$ に対し

$$
p(x)\ge p_{\theta_0}(x)
=P_{\theta_0}\{T(X)\ge T(x)\}.
$$

したがって

$$
\{p(X)\le\alpha\}\subseteq\{p_{\theta_0}(X)\le\alpha\}.
$$

固定母数での連続P値は一様分布に従うので

$$
\boxed{P_{\theta_0}\{p(X)\le\alpha\}\le\alpha}.
$$

plug-inでは帰無母数の推定量自体がデータの関数であり、帰無領域全体で第一種過誤を抑える保証が失われる。

正規片側問題では

$$
P_\mu(X\ge x)=1-\Phi(x-\mu)
$$

は $\mu\le0$ の中で境界 $\mu=0$ で最大になる。よって

$$
\boxed{p(x)=1-\Phi(x)}
$$

であり、有意水準 $\alpha$ の棄却域は

$$
\boxed{x\ge z_{1-\alpha}}.
$$

---

# 100. 一致検定と局所対立を漸近検出力で区別する

$X_1,\ldots,X_n$ は独立に $N(\mu,\sigma^2)$ に従い、$\sigma>0$ は既知とする。

$$
H_0:\mu=0,
\qquad
H_1:\mu>0
$$

を有意水準 $\alpha$ で検定する。

## 問題

1. 標本平均を用いる棄却域を求めよ。
2. 真の母数が $\mu>0$ のときの検出力 $\pi_n(\mu)$ を求めよ。
3. 固定した任意の $\mu>0$ で $\pi_n(\mu)\to1$ を示せ。
4. 局所対立 $\mu_n=h/\sqrt n$ の下での検出力極限を求めよ。
5. 固定対立 $\mu=\delta>0$ に対して目標検出力 $1-\beta$ を得るための標本サイズ条件を求めよ。

## 解答

$H_0$ の下で

$$
Z_n=\frac{\sqrt n\,\overline X}{\sigma}\sim N(0,1)
$$

だから棄却域は

$$
\boxed{Z_n>z_{1-\alpha}}.
$$

検出力は

$$
\boxed{\pi_n(\mu)=1-\Phi\left(z_{1-\alpha}-\frac{\sqrt n\mu}{\sigma}\right)}.
$$

固定 $\mu>0$ なら $\sqrt n\mu/\sigma\to\infty$ なので

$$
\boxed{\pi_n(\mu)\to1},
$$

すなわち一致検定である。一方、$\mu_n=h/\sqrt n$ では

$$
\boxed{\pi_n(\mu_n)=1-\Phi\left(z_{1-\alpha}-\frac h\sigma\right)},
$$

となり1には収束しない。局所対立では標本数の増加と同じ $1/\sqrt n$ の速さで帰無仮説へ近づくためである。

目標検出力 $1-\beta$ に対しては

$$
\boxed{n\ge\left[\frac{\sigma\{z_{1-\alpha}+z_{1-\beta}\}}{\delta}\right]^2}.
$$
