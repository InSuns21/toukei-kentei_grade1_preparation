# Core 01 Fisher情報量・Delta法・最尤推定量の漸近効率

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
5. $\widehat\lambda$ が漸近効率的であることを情報量と比較して説明せよ。

## 詳細解答

### 1. 最尤推定量

対数尤度は

$$
\ell(\lambda)=n\log\lambda-\lambda\sum_{i=1}^nX_i.
$$

$$
\ell'(\lambda)=\frac n\lambda-\sum X_i,
\qquad
\ell''(\lambda)=-\frac n{\lambda^2}<0.
$$

従って

$$
\boxed{\widehat\lambda=\frac1{\overline X}}.
$$

### 2. Fisher情報量

1標本のスコアは

$$
U_1(\lambda)=\frac1\lambda-X,
$$

また

$$
-\frac{\partial^2}{\partial\lambda^2}\log f(X;\lambda)=\frac1{\lambda^2}.
$$

指数分布の支持 $x>0$ は $\lambda$ に依存せず、対数密度は $\lambda>0$ の内部で2回微分可能で、必要な期待値も有限である。したがって微分と積分の交換を含むFisher情報量の正則性条件を満たし、

$$
I_1(\lambda)
=-E_\lambda\left[\frac{\partial^2}{\partial\lambda^2}\log f(X;\lambda)\right]
=\frac1{\lambda^2},
$$

$$
I_n(\lambda)=\frac n{\lambda^2}.
$$

### 3. 最尤推定量の漸近正規性

ここで使うのは **正則最尤推定量の漸近正規性定理**である。必要な条件のうち本問で重要なのは、

- 真の $\lambda$ が開区間 $(0,\infty)$ の内部点である。
- 独立同分布モデルで識別可能である。
- 支持 $x>0$ が $\lambda$ に依存しない。
- 対数尤度が真値近傍で十分滑らかである。
- $0<I_1(\lambda)<\infty$ である。

ことである。上で全て確認できるので定理を適用でき、

$$
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}
N\left(0,I_1(\lambda)^{-1}\right)
=N(0,\lambda^2).
$$

### 4. Delta法

**Delta法**は、

$$
\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d} N(0,V)
$$

かつ $g$ が $\lambda$ で微分可能なら

$$
\sqrt n\{g(\widehat\lambda)-g(\lambda)\}
\xrightarrow{d} N(0,g'(\lambda)^2V)
$$

とする結果である。本問では $g(\lambda)=\log\lambda$ は $\lambda>0$ で微分可能で

$$
g'(\lambda)=\frac1\lambda.
$$

したがって

$$
\sqrt n(\widehat\eta-\eta)
\xrightarrow{d}N(0,1),
$$

すなわち

$$
\widehat\eta\approx N\left(\log\lambda,\frac1n\right).
$$

### 5. 漸近効率性

正則1母数モデルでは、漸近情報下限は

$$
\frac1{nI_1(\lambda)}=\frac{\lambda^2}{n}.
$$

上の最尤推定量漸近正規性から $\widehat\lambda$ の漸近分散も $\lambda^2/n$ なので、この下限に一致し、最尤推定量は漸近効率的である。

注意として、$\widehat\lambda=1/\bar X$ は有限標本では一般に不偏ではない。したがってここで比較しているのは「不偏推定量に対する有限標本Cramér–Rao不等式をそのまま最尤推定量へ適用した」という意味ではなく、**正則最尤推定量の漸近情報下限**との比較である。

## 本番答案

$$
\ell(\lambda)=n\log\lambda-\lambda\sum X_i,
\quad
\ell''(\lambda)<0
$$

より

$$
\widehat\lambda=1/\bar X.
$$

支持 $x>0$ は母数に依存せず、真値 $\lambda>0$ は内部点、対数尤度は滑らかで $I_1(\lambda)=\lambda^{-2}\in(0,\infty)$。よって **正則最尤推定量の漸近正規性定理**から

$$
\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d} N(0,\lambda^2).
$$

$g(\lambda)=\log\lambda$ は真値で微分可能なので **Delta法**より

$$
\sqrt n(\log\widehat\lambda-\log\lambda)\xrightarrow{d} N(0,1).
$$

漸近分散 $\lambda^2/n$ は $1/[nI_1(\lambda)]$ に一致するので漸近効率的。

## 採点基準

- 最尤推定量: 4点
- Fisher情報量と正則性: 4点
- 最尤推定量漸近正規性（定理名・条件確認）: 5点
- Delta法（条件確認）: 4点
- 漸近効率性の意味: 3点
