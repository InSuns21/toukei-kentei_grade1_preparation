# Core 06 Cramér–Rao下限・効率性

- 旧No.: 42
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ とし、$\sigma^2$は既知とする。

1. $\mu$に関するFisher情報量を求めよ。
2. $\mu$の不偏推定量に対するCramér–Rao下限を求め、$\bar X$が効率的であることを示せ。
3. $\mu^2$を推定する不偏推定量

$$
T=\bar X^2-\frac{\sigma^2}{n}
$$

について、$\operatorname{Var}(T)$を求めよ。
4. $\mu^2$を推定する場合のCramér–Rao下限と比較せよ。

## 詳細解答

1標本のスコアは

$$
U(\mu)=\frac{X-\mu}{\sigma^2}.
$$

したがって

$$
I_1(\mu)=\frac1{\sigma^2},
\qquad
I_n(\mu)=\frac n{\sigma^2}.
$$

$g(\mu)=\mu$なら不偏推定量の分散は

$$
\operatorname{Var}(\widehat\mu)
\ge\frac{(g'(\mu))^2}{I_n(\mu)}
=\frac{\sigma^2}{n}.
$$

$\operatorname{Var}(\bar X)=\sigma^2/n$なので等号を達成。

次に$\bar X\sim N(\mu,v)$、$v=\sigma^2/n$。正規変数$Y\sim N(\mu,v)$について

$$
\operatorname{Var}(Y^2)=4\mu^2v+2v^2.
$$

定数を引いても分散は変わらないので

$$
\boxed{
\operatorname{Var}(T)
=\frac{4\mu^2\sigma^2}{n}
+\frac{2\sigma^4}{n^2}
}.
$$

$g(\mu)=\mu^2$なら$g'(\mu)=2\mu$。CR下限は

$$
\boxed{
\frac{4\mu^2\sigma^2}{n}
}.
$$

$T$の分散はこれより$2\sigma^4/n^2$だけ大きい。有限標本では等号でないが、差は$n^{-2}$なので漸近的には下限へ近づく。

## 本番答案

$$
I_n(\mu)=n/\sigma^2.
$$

したがって$\mu$のCR下限は$\sigma^2/n$で、$\bar X$はこれを達成。

$T=\bar X^2-\sigma^2/n$について

$$
\operatorname{Var}(T)
=4\mu^2\frac{\sigma^2}{n}
+2\left(\frac{\sigma^2}{n}\right)^2.
$$

一方、$g(\mu)=\mu^2$のCR下限は

$$
(g'(\mu))^2/I_n(\mu)=4\mu^2\sigma^2/n.
$$

よって有限標本では下限より大きい。

## 採点基準

- Fisher情報量: 4点
- $\bar X$の効率性: 5点
- $T$の分散: 7点
- CR下限との比較: 4点
