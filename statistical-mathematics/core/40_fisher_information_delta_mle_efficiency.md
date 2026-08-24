# Core 01 Fisher情報量・Delta法・MLEの漸近効率

- 旧No.: 40
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立に指数分布

$$
f(x;\lambda)=\lambda e^{-\lambda x},\qquad x>0,\ \lambda>0
$$

に従う。

1. $\lambda$ の最尤推定量 $\widehat\lambda$ を求めよ。
2. 1標本および$n$標本のFisher情報量を求めよ。
3. $\sqrt n(\widehat\lambda-\lambda)$ の漸近分布を求めよ。
4. $\eta=\log\lambda$ とし、$\widehat\eta=\log\widehat\lambda$ の漸近分布をDelta法で求めよ。
5. $\widehat\lambda$ が漸近的にCramér–Rao下限を達成することを説明せよ。

## 詳細解答

対数尤度は

$$
\ell(\lambda)=n\log\lambda-\lambda\sum_{i=1}^nX_i.
$$

したがって

$$
\ell'(\lambda)=\frac n\lambda-\sum X_i=0
$$

より

$$
\boxed{\widehat\lambda=\frac1{\overline X}}.
$$

1標本のスコアは

$$
U_1(\lambda)=\frac1\lambda-X,
$$

また

$$
-\frac{\partial^2}{\partial\lambda^2}\log f(X;\lambda)=\frac1{\lambda^2}.
$$

よって

$$
I_1(\lambda)=\frac1{\lambda^2},\qquad
I_n(\lambda)=\frac n{\lambda^2}.
$$

正則性の下でMLEの漸近正規性から

$$
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda^2).
$$

次に $g(\lambda)=\log\lambda$ とすると $g'(\lambda)=1/\lambda$。Delta法より

$$
\sqrt n(\widehat\eta-\eta)
\xrightarrow{d}
N\left(0,\frac1{\lambda^2}\lambda^2\right)
=N(0,1).
$$

したがって

$$
\widehat\eta\approx N\left(\log\lambda,\frac1n\right).
$$

また $I_n(\lambda)^{-1}=\lambda^2/n$ であり、MLEの漸近分散も $\lambda^2/n$。よってMLEは漸近効率的である。

## 本番答案

$$
\ell(\lambda)=n\log\lambda-\lambda\sum X_i
$$

より

$$
\widehat\lambda=1/\bar X.
$$

Fisher情報量は

$$
I_1(\lambda)=\lambda^{-2},\qquad I_n(\lambda)=n\lambda^{-2}.
$$

したがって

$$
\sqrt n(\widehat\lambda-\lambda)\Rightarrow N(0,\lambda^2).
$$

$g(\lambda)=\log\lambda$ にDelta法を使うと

$$
\sqrt n(\log\widehat\lambda-\log\lambda)\Rightarrow N(0,1).
$$

MLEの漸近分散 $\lambda^2/n$ は $I_n(\lambda)^{-1}$ に一致するので漸近効率的。

## 採点基準

- MLE: 4点
- Fisher情報量: 4点
- MLEの漸近分布: 5点
- Delta法: 4点
- 漸近効率性: 3点
