# Core 33 モーメント推定・一致性・デルタ法・漸近分散比較

- 旧No.: 46
- 演習価値: A
- 難度: A
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$\theta>-1$とし

$$
f(x;\theta)=(\theta+1)x^\theta,
\qquad0<x<1
$$

からの独立同分布標本を考える。

1. $E[X]$を求め、1次モーメント法推定量$\widetilde\theta$を$\bar X$で表せ。
2. $\widetilde\theta$が一致推定量であることを示せ。
3. デルタ法で$\sqrt n(\widetilde\theta-\theta)$の漸近分散を求めよ。
4. 最尤推定量の漸近分散を求め、モーメント法と比較せよ。

## 詳細解答

### 1. 母モーメントとモーメント推定量

定義から

$$
\begin{aligned}
E[X]
&=\int_0^1x(\theta+1)x^\theta\,dx\\
&=(\theta+1)\int_0^1x^{\theta+1}\,dx\\
&=\frac{\theta+1}{\theta+2}=:m.
\end{aligned}
$$

$m$について解くと

$$
\theta=\frac{2m-1}{1-m}.
$$

従って

$$
\boxed{
\widetilde\theta
=g(\bar X)=\frac{2\bar X-1}{1-\bar X}
}.
$$

### 2. 一致性：大数の法則と連続写像定理を使う

**弱大数の法則**を使う。必要条件として本問で確認すべきなのは、$X_i$ が独立同分布で $E|X_i|<\infty$ であること。本問では $0<X_i<1$ だから

$$
E|X_i|\le 1<\infty,
$$

よって

$$
\bar X\to_p m.
$$

次に **連続写像定理**を使う。$g(x)=(2x-1)/(1-x)$ は $x=1$ 以外で連続であり、

$$
m=\frac{\theta+1}{\theta+2}<1
$$

だから真値 $m$ で連続。従って

$$
\widetilde\theta=g(\bar X)\to_p g(m)=\theta.
$$

### 3. 中心極限定理とデルタ法

まず二次モーメントを定義から計算する。

$$
E[X^2]
=(\theta+1)\int_0^1x^{\theta+2}\,dx
=\frac{\theta+1}{\theta+3}.
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(X)
&=\frac{\theta+1}{\theta+3}
-\left(\frac{\theta+1}{\theta+2}\right)^2\\
&=\frac{\theta+1}{(\theta+2)^2(\theta+3)}.
\end{aligned}
$$

$X_i$ は独立同分布で有限分散を持つので **Lindeberg–Lévyの中心極限定理**から

$$
\sqrt n(\bar X-m)
\Rightarrow N\left(0,\operatorname{Var}(X)\right).
$$

ここで **デルタ法**を使う。必要条件は $g$ が真値 $m$ で微分可能であること。本問では $m<1$ なので成立し、

$$
g'(x)=\frac1{(1-x)^2},
\qquad
g'(m)=(\theta+2)^2.
$$

従って

$$
\boxed{
\sqrt n(\widetilde\theta-\theta)
\Rightarrow
N\left(0,
\frac{(\theta+1)(\theta+2)^2}{\theta+3}
\right)
}.
$$

### 4. 最尤推定量の漸近正規性

対数尤度は

$$
\ell(\theta)
=n\log(\theta+1)+\theta\sum_i\log X_i.
$$

$$
\ell'(\theta)=\frac n{\theta+1}+\sum_i\log X_i,
\qquad
\ell''(\theta)=-\frac n{(\theta+1)^2}<0.
$$

したがって

$$
\widehat\theta_{MLE}
=-\frac{n}{\sum_i\log X_i}-1.
$$

1標本フィッシャー情報量は

$$
I_1(\theta)
=-E\left[\frac{\partial^2}{\partial\theta^2}\log f(X;\theta)\right]
=\frac1{(\theta+1)^2}.
$$

**正則最尤推定量の漸近正規性定理**を使う条件を確認する。真値 $\theta>-1$ は開母数空間 $(-1,\infty)$ の内部点、支持 $(0,1)$ は母数非依存、モデルは識別可能、対数密度は真値近傍で滑らか、情報量は有限正である。従って

$$
\sqrt n(\widehat\theta_{MLE}-\theta)
\Rightarrow N\left(0,(\theta+1)^2\right).
$$

モーメント法との漸近分散比は

$$
\frac{(\theta+1)(\theta+2)^2/(\theta+3)}{(\theta+1)^2}
=\frac{(\theta+2)^2}{(\theta+1)(\theta+3)}
=1+\frac1{(\theta+1)(\theta+3)}>1.
$$

よって最尤推定量の方が漸近的に効率的。

## 本番答案

$$
E[X]=\frac{\theta+1}{\theta+2}
$$

より

$$
\tilde\theta=\frac{2\bar X-1}{1-\bar X}.
$$

$0<X<1$ なので $E|X|\le1<\infty$。独立同分布標本だから **大数の法則**で $\bar X\to_p m$、$g$ は $m<1$ で連続なので **連続写像定理**から一致。

さらに有限分散なので **中心極限定理**、$g$ は $m$ で微分可能なので **デルタ法**を使え、

$$
Avar\{\sqrt n(\tilde\theta-\theta)\}
=\frac{(\theta+1)(\theta+2)^2}{\theta+3}.
$$

最尤推定量は支持母数非依存、真値内部、滑らか、$I_1(\theta)=1/(\theta+1)^2>0$ なので **正則最尤推定量漸近正規性定理**から漸近分散 $(\theta+1)^2$。こちらが小さい。

## 採点基準

- モーメント推定量: 5点
- 一致性（大数の法則・連続写像の条件）: 4点
- 中心極限定理・デルタ法と条件確認: 7点
- 最尤推定量正則性・漸近分散比較: 4点
