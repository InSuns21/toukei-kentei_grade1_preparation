# Core 19 Beta–Binomial共役Bayes・事後予測

- 旧No.: 59
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$$
p\sim\operatorname{Beta}(2,2),
\qquad
X\mid p\sim\operatorname{Binomial}(10,p)
$$

とする。$X=7$を観測した。

1. 事後分布を求めよ。
2. 二乗損失の下でのBayes推定量を求めよ。
3. 次の1回が成功する事後予測確率を求めよ。
4. 今後2回がともに成功する事後予測確率を求めよ。

## 詳細解答

Beta事前分布とBinomial尤度は共役なので

$$
p\mid X=7\sim\operatorname{Beta}(2+7,2+3)
=\boxed{\operatorname{Beta}(9,5)}.
$$

二乗損失のBayes推定量は事後平均なので

$$
\boxed{E[p\mid X]=\frac9{14}}.
$$

次の1回の成功確率も

$$
P(Y=1\mid X)=E[p\mid X]=\frac9{14}.
$$

今後2回がともに成功する確率は

$$
E[p^2\mid X].
$$

Beta$(\alpha,\beta)$では

$$
E[p^2]=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}.
$$

従って

$$
\boxed{
\frac{9\cdot10}{14\cdot15}=\frac37
}.
$$

## 本番答案

共役性より

$$
p\mid X=7\sim\operatorname{Beta}(9,5).
$$

二乗損失Bayes推定量と次回成功確率はいずれも

$$
9/14.
$$

2回とも成功する確率は

$$
E[p^2\mid X]
=\frac{9\cdot10}{14\cdot15}=3/7.
$$

## 採点基準

- 事後分布: 6点
- Bayes推定量: 5点
- 1回予測: 4点
- 2回予測: 5点
