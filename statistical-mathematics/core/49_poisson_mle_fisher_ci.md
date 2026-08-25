# Core 22 Poisson MLE・Fisher情報・信頼区間

- 旧No.: 49
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Poisson}(\lambda)$、$\lambda>0$ とする。

1. $\lambda$のMLEを求めよ。
2. Fisher情報量を求めよ。
3. MLEの漸近分布を求めよ。
4. $n=100,\sum X_i=400$のとき、$z_{0.975}=1.96$を用いた95% Wald信頼区間を求めよ。

## 詳細解答

### 1. MLE

対数尤度は定数を除いて

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
\boxed{\widehat\lambda=\bar X}.
$$

全観測が0なら尤度は $e^{-n\lambda}$ で $\lambda\downarrow0$ 側へ最大化される。通常の $\lambda\ge0$ の閉じた母数空間なら $\hat\lambda=0$ であり、やはり $\bar X$ と一致する。

### 2. Fisher情報量

1標本のスコアは

$$
U_1(\lambda)=\frac X\lambda-1.
$$

Poisson分布の支持 $\{0,1,2,\ldots\}$ は $\lambda$ に依存せず、微分と無限和の交換が可能で、情報量は有限である。したがってFisher情報の正則な恒等式を使え、

$$
I_1(\lambda)=E[U_1(\lambda)^2]
=\frac{\operatorname{Var}(X)}{\lambda^2}
=\frac1\lambda,
$$

$$
I_n(\lambda)=\frac n\lambda.
$$

### 3. 漸近分布：中心極限定理を使う

本問では $\hat\lambda=\bar X$ なので、一般のMLE漸近定理を使わなくても **Lindeberg–Lévy の中心極限定理**を直接使える。条件は i.i.d. かつ有限分散であること。本問では

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

また大数の法則から $\hat\lambda\to_p\lambda$ なので、連続写像定理により

$$
\sqrt{\widehat\lambda}\to_p\sqrt\lambda.
$$

従って **Slutskyの定理**により標準誤差中の未知 $\lambda$ を $\hat\lambda$ で置換できる。

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

これは漸近的なWald区間であり、有限標本での正確区間ではない。特に標本が小さい、または $\lambda$ が小さいと対称Wald区間は0未満へはみ出すことがある。

## 本番答案

$$
\hat\lambda=\bar X,
\qquad
I_n(\lambda)=n/\lambda.
$$

$X_i$ はi.i.d.で $Var(X_i)=\lambda<\infty$ だから **Lindeberg–Lévy CLT**より

$$
\sqrt n(\hat\lambda-\lambda)\Rightarrow N(0,\lambda).
$$

さらにLLNで $\hat\lambda\to_p\lambda$ なので **Slutskyの定理**により plug-in SE $\sqrt{\hat\lambda/n}$ を使える。

$n=100,\bar x=4$ では $SE=0.2$、95% Wald CI は

$$
4\pm1.96(0.2)=(3.608,4.392).
$$

## 採点基準

- MLE: 5点
- Fisher情報と正則性: 5点
- CLT・Slutskyの条件確認: 5点
- Wald CI: 5点
