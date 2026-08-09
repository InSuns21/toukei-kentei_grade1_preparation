# 記号規約

## 確率空間と確率変数

| 対象 | 記号 | 規約 |
|---|---|---|
| 確率空間 | $(\Omega,\mathcal{F},P)$ | 確率測度は $P$ |
| 期待値 | $E[X]$ | 存在条件を確認する |
| 分散・共分散 | $\operatorname{Var}(X)$, $\operatorname{Cov}(X,Y)$ | `$V[X]` と混在させない |
| 指示関数 | $\boldsymbol{1}_A$ | 添字は事象 |
| 分布収束 | $X_n \xrightarrow{d} X$ | 概収束は $\xrightarrow{\mathrm{a.s.}}$、確率収束は $\xrightarrow{p}$ |
| 同分布 | $X \overset{d}{=} Y$ | 通常の等号と区別する |

## 分布と標本

- 確率質量関数は $p_X(x)$、確率密度関数は $f_X(x)$、累積分布関数は $F_X(x)$ とする。
- 独立同分布標本は $X_1,\ldots,X_n \overset{\mathrm{i.i.d.}}{\sim} P_\theta$ とする。
- 観測値は小文字 $x_1,\ldots,x_n$、確率変数は大文字で区別する。
- 標本平均は $\overline{X}=n^{-1}\sum_{i=1}^n X_i$、不偏標本分散は $S^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\overline{X})^2$ とする。
- 正規分布は $N(\mu,\sigma^2)$（第2引数は分散）、多変量正規分布は $N_p(\boldsymbol{\mu},\boldsymbol{\Sigma})$ とする。
- Gamma分布は shape-rate 表示 $\operatorname{Gamma}(\alpha,\beta)$ を既定とし、密度を初出時に明記する。
- 幾何分布は初成功までの試行回数を台 $\{1,2,\ldots\}$ とする。別規約を使う場合は必ず宣言する。

## 推測

- パラメータ空間は $\Theta$、真値は $\theta_0$、推定量は $\widehat{\theta}$ とする。
- 尤度は $L(\theta;x)$、対数尤度は $\ell(\theta;x)$、スコアは $U(\theta)=\partial\ell(\theta)/\partial\theta$ とする。
- Fisher情報量は1観測当たりを $I_1(\theta)$、標本全体を $I_n(\theta)$ として区別する。
- 帰無仮説は $H_0$、対立仮説は $H_1$、有意水準は $\alpha$、検出力関数は $\pi(\theta)$ とする。
- $p$ 値は小文字斜体 $p$ とし、確率測度 $P$ と区別する。

## 線形モデル・時系列

- ベクトルは太字小文字 $\boldsymbol{x}$、行列は太字大文字 $\boldsymbol{X}$ を基本とする。
- 転置は $\boldsymbol{X}^{\mathsf T}$、逆行列は $\boldsymbol{X}^{-1}$、単位行列は $\boldsymbol{I}_n$ とする。
- 線形モデルは $\boldsymbol{Y}=\boldsymbol{X}\boldsymbol{\beta}+\boldsymbol{\varepsilon}$ とし、各行列の次元を初出時に示す。
- 自己共分散は $\gamma(h)$、自己相関は $\rho(h)$、後退作用素は $B$ とする。

## 一般

- 自然数は $\mathbb{N}=\{1,2,\ldots\}$、非負整数は $\mathbb{N}_0$ とする。
- 定義としての等号は必要に応じて $\coloneqq$ を使う。
- 同じ章内で記号の意味を変更しない。教科書・過去問と規約が異なる場合は対応を明記する。

