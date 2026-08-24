# Core 17 台が母数に依存する非正則MLE・不偏化

- 旧No.: 44
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim U(0,\theta)$、$\theta>0$とし、$M=X_{(n)}$とする。

1. $\theta$のMLEを求めよ。
2. $E[M]$と$\operatorname{Var}(M)$を求めよ。
3. MLEを不偏化し、その分散を求めよ。
4. このモデルに通常のCramér–Rao議論を機械的に適用できない理由を説明せよ。

## 詳細解答

尤度は

$$
L(\theta)=\theta^{-n}\boldsymbol1\{M\le\theta\}.
$$

$\theta\ge M$の範囲では$\theta^{-n}$は減少するので

$$
\boxed{\widehat\theta_{MLE}=M}.
$$

$M/\theta\sim\operatorname{Beta}(n,1)$なので

$$
E[M]=\frac n{n+1}\theta,
$$

$$
\operatorname{Var}(M)
=\theta^2\frac{n}{(n+1)^2(n+2)}.
$$

従って不偏化した

$$
\widetilde\theta=\frac{n+1}{n}M
$$

について

$$
\boxed{
\operatorname{Var}(\widetilde\theta)
=\frac{\theta^2}{n(n+2)}
}.
$$

通常のCR不等式では、密度の台が母数に依存しないことや微分と積分の交換などの正則条件が必要。しかし本モデルでは台$(0,\theta)$自体が$\theta$に依存する。内部だけを微分するとスコアは$-n/\theta$となり、その期待値は0にならない。この時点で通常の正則理論の仮定が壊れている。

## 本番答案

$$
L(\theta)=\theta^{-n}1\{M\le\theta\}
$$

より$\hat\theta_{MLE}=M$。

$$
E[M]=\frac n{n+1}\theta,
\quad
Var(M)=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

したがって

$$
\tilde\theta=\frac{n+1}{n}M,
\quad
Var(\tilde\theta)=\frac{\theta^2}{n(n+2)}.
$$

台$(0,\theta)$が母数依存なので通常のCR正則条件が成立しない。

## 採点基準

- MLE: 5点
- $M$の平均・分散: 6点
- 不偏化・分散: 5点
- 非正則性: 4点
