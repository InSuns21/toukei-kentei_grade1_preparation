# Core 22 Poisson 最尤推定量・Fisher情報・信頼区間

- 旧No.: 49
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Poisson}(\lambda)$、$\lambda\ge0$ とする。Fisher情報量・漸近分布・Wald区間については真値 $\lambda>0$ を仮定する。

1. $\lambda$の最尤推定量を求めよ。
2. Fisher情報量を求めよ。
3. 最尤推定量の漸近分布を求めよ。
4. $n=100,\sum X_i=400$のとき、$z_{0.975}=1.96$を用いた95% Wald信頼区間を求めよ。

## 詳細解答

### 1. 最尤推定量

対数尤度は $\lambda>0$ で、定数を除いて

$$
\ell(\lambda)
=\left(\sum X_i\right)\log\lambda-n\lambda.
$$

$$
\ell'(\lambda)=\frac{\sum X_i}{\lambda}-n,
\qquad
\ell''(\lambda)=-\frac{\sum X_i}{\lambda^2}\le0.
$$

$\sum X_i>0$ なら一意な内部最大点は

$$
\widehat\lambda=\bar X.
$$

一方、$\sum X_i=0$ なら尤度は

$$
L(\lambda)=e^{-n\lambda}
$$

で $\lambda$ の減少関数だから、閉じた母数空間 $[0,\infty)$ の境界 $\lambda=0$ で最大になる。従って全標本について

$$
\boxed{\widehat\lambda=\bar X}.
$$

ここで「最尤推定量では境界を含む母数空間 $\lambda\ge0$」と、「通常の正則漸近論では真値を内部点 $\lambda>0$ に置く」ことを区別する。

### 2. Fisher情報量

以下は真値 $\lambda>0$ で考える。1標本のスコアは

$$
U_1(\lambda)=\frac X\lambda-1.
$$

Poisson分布の支持 $\{0,1,2,\ldots\}$ は $\lambda$ に依存せず、真値は内部点、微分と無限和の交換が可能で、必要なモーメントも有限である。したがってFisher情報量の正則な恒等式を使え、

$$
\begin{aligned}
I_1(\lambda)
&=E[U_1(\lambda)^2]\\
&=\frac{\operatorname{Var}(X)}{\lambda^2}\\
&=\frac1\lambda,
\end{aligned}
$$

$$
I_n(\lambda)=\frac n\lambda.
$$

### 3. 漸近分布：中心極限定理とSlutsky

本問では $\hat\lambda=\bar X$ なので、一般の最尤推定量漸近定理を使わず **Lindeberg–Lévy の中心極限定理**を直接使える。必要条件は独立同分布で有限分散を持つこと。本問では真値 $\lambda>0$ の下で

$$
E[X_i]=\lambda,
\qquad
\operatorname{Var}(X_i)=\lambda<\infty
$$

だから条件を満たし、

$$
\boxed{
\sqrt n(\widehat\lambda-\lambda)
=\sqrt n(\bar X-\lambda)
\Rightarrow N(0,\lambda)
}.
$$

また大数の法則から $\widehat\lambda\to_p\lambda$。$\lambda>0$ なので連続写像定理により

$$
\sqrt{\widehat\lambda}\to_p\sqrt\lambda.
$$

従って **Slutskyの定理**により、標準誤差中の未知 $\lambda$ を $\widehat\lambda$ で置換できる。

真値が境界 $\lambda=0$ の場合は分布が退化し、この通常の正規漸近近似の設定ではない。

### 4. Wald信頼区間

数値例では

$$
\widehat\lambda=4,
\qquad
\widehat{SE}=\sqrt{\widehat\lambda/n}=0.2.
$$

したがって

$$
\boxed{4\pm1.96\cdot0.2=(3.608,4.392)}.
$$

これは漸近的なWald区間であり有限標本の正確区間ではない。特に標本が小さい、または $\lambda$ が小さいと対称Wald区間が0未満へはみ出すことがある。

## 本番答案

母数空間を $\lambda\ge0$ とする。$\sum X_i>0$ ではスコア方程式から $\hat\lambda=\bar X$、全観測0では尤度 $e^{-n\lambda}$ が境界0で最大なので、常に

$$
\hat\lambda=\bar X.
$$

真値 $\lambda>0$ では支持は母数非依存で正則、

$$
I_n(\lambda)=n/\lambda.
$$

また $X_i$ は独立同分布かつ $Var(X_i)=\lambda<\infty$ なので **Lindeberg–Lévy 中心極限定理**より

$$
\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda).
$$

大数の法則で $\hat\lambda\to_p\lambda>0$ だから **Slutskyの定理**により plug-in 標準誤差 $\sqrt{\hat\lambda/n}$ を使える。

$n=100,\bar x=4$ では $SE=0.2$、95% Wald 信頼区間 は

$$
4\pm1.96(0.2)=(3.608,4.392).
$$

## 採点基準

- 最尤推定量（内部点と境界の区別）: 5点
- Fisher情報と正則性: 5点
- 中心極限定理・Slutskyの条件確認: 5点
- Wald 信頼区間: 5点
