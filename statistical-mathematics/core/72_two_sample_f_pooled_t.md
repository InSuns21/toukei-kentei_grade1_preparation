# Core 15 正規2標本のF検定・pooled t

- 旧No.: 72
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表・○

## 問題

独立な2群について

$$
X_i\overset{\mathrm{iid}}\sim N(\mu_1,\sigma_1^2),
\qquad
Y_j\overset{\mathrm{iid}}\sim N(\mu_2,\sigma_2^2)
$$

とする。2群は相互に独立で、$n_1=n_2=10$、

$$
\bar x=5,\quad\bar y=3,\quad s_1^2=s_2^2=4
$$

であった。

1. $H_0:\sigma_1^2=\sigma_2^2$のF統計量と自由度を、分布を使える条件とともに求めよ。
2. 等分散 $\sigma_1^2=\sigma_2^2=\sigma^2$ を仮定したpooled varianceを求めよ。
3. その等分散仮定の下で $H_0:\mu_1=\mu_2$ のpooled t統計量と自由度を求めよ。
4. なぜ分散検定と平均検定でF分布・t分布が現れるか説明せよ。

## 詳細解答

### 1. 分散比のF検定

正規標本について **Cochranの定理**を用いる。各群で

$$
\frac{(n_1-1)S_1^2}{\sigma_1^2}\sim\chi^2_{n_1-1},
\qquad
\frac{(n_2-1)S_2^2}{\sigma_2^2}\sim\chi^2_{n_2-1}.
$$

この正確なカイ二乗分布には各群の正規性が必要である。また2群は相互独立なので、二つの標本分散も独立。

$H_0:\sigma_1^2=\sigma_2^2=\sigma^2$ の下では

$$
\frac{S_1^2}{S_2^2}
=\frac{\{(n_1-1)S_1^2/\sigma^2\}/(n_1-1)}
{\{(n_2-1)S_2^2/\sigma^2\}/(n_2-1)}.
$$

したがって、独立なカイ二乗を自由度で割った比という **F分布の定義**から

$$
\boxed{F=\frac{S_1^2}{S_2^2}\sim F_{9,9}}.
$$

観測値は

$$
\boxed{F=4/4=1}.
$$

### 2. pooled variance

等分散を仮定すると、二群の残差平方和を足して

$$
\begin{aligned}
S_p^2
&=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}\\
&=\frac{9\cdot4+9\cdot4}{18}\\
&=\boxed{4}.
\end{aligned}
$$

従って $S_p=2$。

### 3. pooled t

等分散仮定の下で

$$
\bar X-\bar Y
\sim N\left(\mu_1-\mu_2,
\sigma^2\left(\frac1{n_1}+\frac1{n_2}\right)\right).
$$

一方、Cochranの定理と2群独立性から

$$
\frac{(n_1+n_2-2)S_p^2}{\sigma^2}
=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{\sigma^2}
\sim\chi^2_{18}.
$$

正規標本では各群の標本平均と標本分散が独立で、さらに2群も独立だから、平均差と $S_p^2$ は独立。この独立性がt分布を使う重要条件である。

$H_0:\mu_1=\mu_2$ の下で

$$
Z=\frac{\bar X-\bar Y}
{\sigma\sqrt{1/n_1+1/n_2}}
\sim N(0,1)
$$

であり、上の独立なカイ二乗で $\sigma$ をStudent化する。**Studentのt分布の定義**から

$$
\boxed{
t=\frac{\bar X-\bar Y}
{S_p\sqrt{1/n_1+1/n_2}}
\sim t_{18}
}.
$$

数値は

$$
\begin{aligned}
t
&=\frac{5-3}{2\sqrt{1/10+1/10}}\\
&=\boxed{\sqrt5}.
\end{aligned}
$$

### 4. 分布が現れる理由

Fは「正規標本から得る独立なカイ二乗平方和の比」、tは「標準正規を、それと独立なカイ二乗由来の分散推定量でStudent化した比」である。したがって正規性・群間独立性、pooled t ではさらに等分散仮定が正確分布の条件になる。

## 本番答案

各群が正規かつ相互独立なので **Cochranの定理**から

$$
9S_1^2/\sigma_1^2,\ 9S_2^2/\sigma_2^2
$$

は独立な $\chi^2_9$。$H_0:\sigma_1^2=\sigma_2^2$ なら

$$
F=S_1^2/S_2^2=1\sim F_{9,9}.
$$

等分散を仮定すると

$$
S_p^2=\frac{9\cdot4+9\cdot4}{18}=4.
$$

平均差は正規、$18S_p^2/\sigma^2\sim\chi^2_{18}$ で両者は独立なので **t分布の定義**から

$$
t=\frac{5-3}{2\sqrt{1/10+1/10}}=\sqrt5\sim t_{18}
$$

（平均帰無下）。

## 採点基準

- F統計量・Cochran条件・自由度: 5点
- pooled variance: 5点
- t統計量・独立性・自由度: 6点
- F/tが現れる理由と適用条件: 4点
