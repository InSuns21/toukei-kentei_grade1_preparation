# 演習問題

## 問題で使う分布の定義

$N(\mu,\sigma^2)$ は $\mu\in\mathbb R,\sigma^2>0$、台 $\mathbb R$、密度
$$f(x)=\frac1{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$$
をもつ。$\nu,\nu_1,\nu_2\in\mathbb N$ とし、$\chi^2_\nu$ は独立標準正規 $\nu$ 個の平方和、$t_\nu$ は独立な $Z\sim N(0,1),Q\sim\chi^2_\nu$ による $Z/\sqrt{Q/\nu}$、$F_{\nu_1,\nu_2}$ は独立な $Q_j\sim\chi^2_{\nu_j}$ による $(Q_1/\nu_1)/(Q_2/\nu_2)$ とする。台は順に正の実数、実数全体、正の実数である。標本分散は
$$S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2$$
とする。

各密度は
$$
f_{\chi^2_\nu}(q)=\frac{q^{\nu/2-1}e^{-q/2}}{2^{\nu/2}\Gamma(\nu/2)},
$$
$$
f_{t_\nu}(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2},
$$
$$
f_{F_{\nu_1,\nu_2}}(w)=
\frac{\Gamma((\nu_1+\nu_2)/2)}{\Gamma(\nu_1/2)\Gamma(\nu_2/2)}
\left(\frac{\nu_1}{\nu_2}\right)^{\nu_1/2}w^{\nu_1/2-1}
\left(1+\frac{\nu_1w}{\nu_2}\right)^{-(\nu_1+\nu_2)/2}
$$
であり、各台外では0である。

## Level A

### S1-A01 カイ二乗の平均分散
- level: A
- minutes: 7
- techniques: CHI-SQUARE-1

$Q\sim\chi^2_6$ の平均と分散を求めよ。

### S1-A02 正規標本平均
- level: A
- minutes: 8
- techniques: NORMAL-SAMPLE-1

$X_i\overset{\mathrm{i.i.d.}}{\sim}N(3,4)$、$n=16$ のとき $\overline X$ の分布を求めよ。

### S1-A03 t統計量
- level: A
- minutes: 8
- techniques: T-PIVOT-1

$N(\mu,\sigma^2)$ からの大きさ9の標本について、$\sqrt9(\overline X-\mu)/S$ の分布を答えよ。

### S1-A04 F分布の逆数
- level: A
- minutes: 8
- techniques: F-RATIO-1

$W\sim F_{5,12}$ のとき $1/W$ の分布を答えよ。

## Level B

### S1-B01 平方和分解
- level: B
- minutes: 13
- techniques: NORMAL-SAMPLE-1

$\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2$ を展開して示せ。

### S1-B02 標本分散の区間確率
- level: B
- minutes: 14
- techniques: CHI-SQUARE-1

$X_i\overset{\mathrm{i.i.d.}}{\sim}N(\mu,9)$、$n=12$ とする。$P(6\leq S^2\leq12)$ を $\chi^2_{11}$ の確率で表せ。

### S1-B03 t統計量の観測値
- level: B
- minutes: 14
- techniques: T-PIVOT-1

正規標本で $n=25,\overline x=52,s=10$ を得た。$\mu=50$ に対するt統計量と自由度を求めよ。

### S1-B04 分散比
- level: B
- minutes: 15
- techniques: F-RATIO-1

独立な二つの正規標本で $n_1=10,n_2=16$ とする。$\sigma_1^2=\sigma_2^2$ の下で $S_1^2/S_2^2$ の分布を求め、$s_1^2=8,s_2^2=5$ の比を計算せよ。

## Level C

### S1-C01 正規標本の標本分布
- level: C
- minutes: 25
- subproblem_minutes: 3, 5, 5, 6, 6
- calculation: medium
- finishability: 25分で平方和分解・独立性・分布まで完答可能
- techniques: NORMAL-SAMPLE-1, CHI-SQUARE-1

$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}N(\mu,\sigma^2)$、$n\geq2$ とする。
1. $\overline X$ の分布を求めよ。
2. 全平方和を平均成分と残差成分に分解せよ。
3. 残差の自由度が $n-1$ となる理由を述べよ。
4. $(n-1)S^2/\sigma^2$ の分布を求めよ。
5. $\overline X$ と $S^2$ の独立性を説明せよ。

### S1-C02 標本分散の確率と不偏性
- level: C
- minutes: 25
- subproblem_minutes: 4, 5, 4, 5, 7
- calculation: medium
- finishability: 25分で確率変形・平均分散・不偏性まで完答可能
- techniques: CHI-SQUARE-1

$X_i\overset{\mathrm{i.i.d.}}{\sim}N(\mu,16)$、$n=10$ とする。
1. $Q=9S^2/16$ の分布を求めよ。
2. $P(S^2\leq24)$ をカイ二乗確率で表せ。
3. $E[S^2]$ を求めよ。
4. $\operatorname{Var}(S^2)$ を求めよ。
5. 上側5%点を $\chi^2_{9;0.05}=16.92$ とする。$P\{S^2>16\chi^2_{9;0.05}/9\}$ を求め、この閾値の意味を述べよ。

### S1-C03 t分布の導出
- level: C
- minutes: 26
- subproblem_minutes: 4, 4, 5, 6, 7
- calculation: medium
- finishability: 25分で標準化・独立性・t分布まで完答可能
- techniques: NORMAL-SAMPLE-1, T-PIVOT-1

正規標本について、$Z=\sqrt n(\overline X-\mu)/\sigma$、$Q=(n-1)S^2/\sigma^2$ とする。
1. $Z$ の分布を求めよ。
2. $Q$ の分布を求めよ。
3. $Z,Q$ が独立である理由を述べよ。
4. $T=\sqrt n(\overline X-\mu)/S$ の分布を導け。
5. $n=16,\overline x=12,s=4,\mu=10$ の観測t値を求めよ。さらに $t_{15}$ の両側5%境界を $\pm2.131$ として、この値が境界の内側か外側かを判定せよ（検定の正式な定義はI3-01で扱う）。

### S1-C04 F分布と二標本分散
- level: C
- minutes: 25
- subproblem_minutes: 4, 4, 6, 5, 6
- calculation: medium
- finishability: 25分で二標本のカイ二乗化・F比・逆数まで完答可能
- techniques: CHI-SQUARE-1, F-RATIO-1

独立な正規標本の大きさを $n_1,n_2\geq2$、母分散を $\sigma_1^2,\sigma_2^2$ とする。
1. 各標本分散からカイ二乗変数 $Q_1,Q_2$ を作れ。
2. $Q_1,Q_2$ が独立である理由を述べよ。
3. $(S_1^2/\sigma_1^2)/(S_2^2/\sigma_2^2)$ の分布を求めよ。
4. $\sigma_1^2=\sigma_2^2$ のとき簡約せよ。
5. $n_1=10,n_2=16$、等分散、$s_1^2/s_2^2=3$ とする。上側5%点 $F_{9,15;0.05}=2.59$ と比較し、上側5%領域に入るか判定せよ（検定の正式な定義はI3-03で扱う）。

### S1-C05 分位点と確率の読み替え
- level: C
- minutes: 25
- subproblem_minutes: 4, 5, 6, 5, 5
- calculation: medium
- finishability: 25分で上側分位点・逆数関係・標本分散へ接続可能
- techniques: CHI-SQUARE-1, F-RATIO-1

上側分位点を $P(\chi^2_\nu>\chi^2_{\nu;\alpha})=\alpha$、$P(F_{\nu_1,\nu_2}>F_{\nu_1,\nu_2;\alpha})=\alpha$ と定める。
1. 各上側分位点以下となる確率を求めよ。
2. $W\sim F_{\nu_1,\nu_2}$ のとき $P(W<c)$ を $1/W$ で表せ。
3. F分布の下側確率を自由度を逆にした上側確率へ直せ。
4. $Q=(n-1)S^2/\sigma^2$ に適用し、$S^2$ の上側確率を式で表せ。
5. 自由度と上側・下側を取り違えない答案確認法を述べよ。

## Level D

### S1-D01 正規標本総合
- level: D
- minutes: 40
- subproblem_minutes: 7, 9, 7, 7, 10
- calculation: high
- finishability: 25分で平方和・カイ二乗・tまで、40分で二標本Fまで完答
- techniques: NORMAL-SAMPLE-1, CHI-SQUARE-1, T-PIVOT-1, F-RATIO-1, ANSWER-1

正規標本の平方和分解を出発点として、
1. 標本平均方向と残差方向をベクトルで表せ。
2. 残差平方和が $\chi^2_{n-1}$ となることを示せ。
3. 標本平均と標本分散の独立性を示せ。
4. t統計量を導け。
5. 独立な第二標本を導入し、標準化した標本分散比がF分布に従うことを導け。

2で止まった場合は「平均成分と残差成分は独立」と、5で止まった場合は
$$Q_j=(n_j-1)S_j^2/\sigma_j^2\sim\chi^2_{n_j-1}$$
を使って後半へ進んでよい。
