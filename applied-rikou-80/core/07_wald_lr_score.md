# Core 07 MLEの漸近正規性・Wald/LR/Score検定

- 安定ID: `RIKOU-CORE-07`
- 80大問 No.: 74
- 演習価値: S
- 難度: S
- 目安時間: 30分

## 問題

$X_1,\dots,X_n$ は独立に Bernoulli$(p)$ に従う。$H_0:p=p_0$ を両側検定する。

1. MLE $\hat p$ と1標本当たりの Fisher 情報量 $I_1(p)$ を求めよ。
2. MLEの漸近正規性から Wald 統計量を構成せよ。
3. Score 統計量と尤度比統計量を構成し、$H_0$ の下での漸近分布を述べよ。
4. $n=100$, $\sum X_i=50$, $p_0=0.4$ のとき3統計量を計算せよ。
5. なぜ有限標本では3統計量が一致せず、漸近的には一致するのか説明せよ。

## 詳細解答

### 1. MLEと情報量

対数尤度は

$$
\ell(p)=S\log p+(n-S)\log(1-p),\qquad S=\sum X_i.
$$

よって $\hat p=S/n$。スコアは

$$
U(p)=\frac{S}{p}-\frac{n-S}{1-p}=\frac{S-np}{p(1-p)}.
$$

1標本当たりの Fisher 情報量は

$$
I_1(p)=\frac1{p(1-p)}.
$$

### 2. Wald

$$
\sqrt n(\hat p-p)\xrightarrow{d}N(0,p(1-p)).
$$

推定標準誤差を $\hat p$ で評価すると

$$
W=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)}\xrightarrow{d}\chi^2_1.
$$

### 3. ScoreとLR

Score統計量は帰無値で情報量を評価して

$$
S_c=\frac{(S-np_0)^2}{np_0(1-p_0)}\xrightarrow{d}\chi^2_1.
$$

尤度比統計量は

$$
\Lambda=2\{\ell(\hat p)-\ell(p_0)\}\xrightarrow{d}\chi^2_1.
$$

### 4. 数値

$\hat p=0.5$。

Wald:

$$
W=\frac{100(0.1)^2}{0.5\cdot0.5}=4.000.
$$

Score:

$$
S_c=\frac{(50-40)^2}{100\cdot0.4\cdot0.6}=\frac{100}{24}\approx4.167.
$$

LR:

$$
\Lambda
=2\left[50\log\frac{0.5}{0.4}+50\log\frac{0.5}{0.6}\right]
=100\log\frac{25}{24}
\approx4.082.
$$

### 5. 一致の理由

Wald は $\hat p$ 周りの曲率、Score は $p_0$ での傾き、LR は尤度差を使う。有限標本では評価点が違うため値も違う。一方、$H_0$ 近傍で対数尤度を2次の Taylor 展開すると3者は同じ二次形式へ帰着し、差は $o_p(1)$ となる。

## 本番答案

$\hat p=S/n$, $I_1(p)=1/[p(1-p)]$。したがって

$$
W=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)},\qquad
S_c=\frac{(S-np_0)^2}{np_0(1-p_0)},
$$

$$
\Lambda=2\{\ell(\hat p)-\ell(p_0)\}.
$$

いずれも $H_0$ の下で漸近的に $\chi^2_1$。数値は

$$
W=4.000,\qquad S_c\approx4.167,\qquad \Lambda\approx4.082.
$$

対数尤度の局所2次近似により3者は漸近同値である。

## 採点基準

- (1) MLE・情報量: 4点
- (2) Wald: 4点
- (3) Score・LR・漸近分布: 6点
- (4) 数値: 4点
- (5) 漸近同値の説明: 2点

25分経過時は Taylor 展開の詳細を省略し、「局所2次近似で差が $o_p(1)$」まで書く。
