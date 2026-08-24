# Core 33 モーメント推定・一致性・Delta法・漸近分散比較

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

からのi.i.d.標本を考える。

1. $E[X]$を求め、1次モーメント法推定量$\widetilde\theta$を$\bar X$で表せ。
2. $\widetilde\theta$が一致推定量であることを示せ。
3. Delta法で$\sqrt n(\widetilde\theta-\theta)$の漸近分散を求めよ。
4. MLEの漸近分散を求め、モーメント法と比較せよ。

## 詳細解答

この分布は$\operatorname{Beta}(\theta+1,1)$なので

$$
E[X]=\frac{\theta+1}{\theta+2}=:m.
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

大数の法則で$\bar X\to_p m$、$g$は$m<1$で連続なので連続写像定理より$\widetilde\theta\to_p\theta$。

分散はBeta分布公式から

$$
Var(X)=\frac{\theta+1}{(\theta+2)^2(\theta+3)}.
$$

また

$$
g'(m)=\frac1{(1-m)^2}=(\theta+2)^2.
$$

Delta法より

$$
\boxed{
\sqrt n(\widetilde\theta-\theta)
\Rightarrow
N\left(0,
\frac{(\theta+1)(\theta+2)^2}{\theta+3}
\right)
}.
$$

対数尤度は

$$
\ell(\theta)
=n\log(\theta+1)+\theta\sum\log X_i.
$$

1標本Fisher情報は

$$
I_1(\theta)=\frac1{(\theta+1)^2}.
$$

従ってMLEの$\sqrt n$スケールの漸近分散は

$$
(\theta+1)^2.
$$

分散比は

$$
\frac{(\theta+1)(\theta+2)^2/(\theta+3)}{(\theta+1)^2}
=\frac{(\theta+2)^2}{(\theta+1)(\theta+3)}
>1.
$$

よってMLEの方が漸近的に効率的。

## 本番答案

$$
E[X]=(\theta+1)/(\theta+2)
$$

より

$$
\tilde\theta=\frac{2\bar X-1}{1-\bar X}.
$$

LLNと連続写像定理で一致。

$$
Var(X)=\frac{\theta+1}{(\theta+2)^2(\theta+3)},
\quad
g'(m)=(\theta+2)^2
$$

なので

$$
Avar\{\sqrt n(\tilde\theta-\theta)\}
=\frac{(\theta+1)(\theta+2)^2}{\theta+3}.
$$

MLEは$I_1(\theta)=1/(\theta+1)^2$より漸近分散$(\theta+1)^2$で、こちらの方が小さい。

## 採点基準

- モーメント推定量: 5点
- 一致性: 4点
- Delta法: 7点
- MLEとの比較: 4点
