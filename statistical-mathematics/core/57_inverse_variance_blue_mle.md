# Core 18 逆分散重み付き推定・BLUE・MLE・CRLB

- 旧No.: 57
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ○

## 問題

独立な

$$
X_i\sim N(\mu,\sigma_i^2)
$$

を観測し、各 $\sigma_i^2>0$ は既知とする。

1. $\sum_iw_iX_i$が不偏となる条件を述べよ。
2. その条件下で分散を最小にする重みを求めよ。
3. この推定量がMLEでもあることを示せ。
4. $(\sigma_1^2,\sigma_2^2,\sigma_3^2)=(1,4,9)$のとき重みと分散を求め、Cramér–Rao下限と一致することを、定理の適用条件も含めて確認せよ。

## 詳細解答

### 1・2. 線形不偏推定量の分散最小化

独立性から

$$
E\left[\sum_iw_iX_i\right]=\mu\sum_iw_i,
$$

したがって全ての $\mu$ で不偏となる必要十分条件は

$$
\boxed{\sum_iw_i=1}.
$$

分散は

$$
Var\left(\sum_iw_iX_i\right)=\sum_iw_i^2\sigma_i^2.
$$

制約 $\sum_iw_i=1$ の下でLagrange乗数法を使うと

$$
2w_i\sigma_i^2-\lambda=0,
$$

よって $w_i\propto\sigma_i^{-2}$。正規化して

$$
\boxed{
w_i=\frac{\sigma_i^{-2}}{\sum_j\sigma_j^{-2}}
}.
$$

この導出自体が線形不偏推定量の中で分散最小、すなわちBLUEであることを直接示しており、Gauss–Markov定理を別途引用する必要はない。

### 3. MLE

独立正規なので、定数を除く対数尤度は

$$
\ell(\mu)
=-\frac12\sum_i\frac{(X_i-\mu)^2}{\sigma_i^2}.
$$

$$
\ell'(\mu)=\sum_i\frac{X_i-\mu}{\sigma_i^2},
\qquad
\ell''(\mu)=-\sum_i\sigma_i^{-2}<0.
$$

従って唯一の最大点は

$$
\boxed{
\widehat\mu
=\frac{\sum_iX_i/\sigma_i^2}{\sum_i1/\sigma_i^2}
},
$$

であり、上のBLUEと一致する。

### 4. Cramér–Rao下限

1観測 $X_i$ のスコアは

$$
U_i(\mu)=\frac{X_i-\mu}{\sigma_i^2},
$$

独立性から情報量は加法的で

$$
I(\mu)=\sum_iE[U_i(\mu)^2]
=\sum_i\frac1{\sigma_i^2}.
$$

ここで **Cramér–Rao不等式**を使う。必要条件を確認すると、

- 全ての密度の支持は $\mathbb R$ で $\mu$ に依存しない。
- 正規密度は $\mu$ について滑らかで、微分と積分の交換が可能。
- $\mu\in\mathbb R$ は開母数空間の内部点。
- 各 $\sigma_i^2>0$ なので $0<I(\mu)<\infty$。
- $\widehat\mu$ は上で不偏と確認済み。

である。したがって

$$
Var(\widehat\mu)\ge\frac1{I(\mu)}.
$$

実際、最適重みを代入すると

$$
Var(\widehat\mu)
=\left(\sum_i\sigma_i^{-2}\right)^{-1},
$$

で下限を達成する。

数値例では

$$
1+\frac14+\frac19=\frac{49}{36},
$$

$$
(w_1,w_2,w_3)=\left(\frac{36}{49},\frac9{49},\frac4{49}\right),
$$

$$
\boxed{Var(\widehat\mu)=\frac{36}{49}}.
$$

情報量は $49/36$ なので、その逆数と一致する。

## 本番答案

不偏条件は $\sum w_i=1$。この制約下で $\sum w_i^2\sigma_i^2$ を最小化すると

$$
w_i=\frac{1/\sigma_i^2}{\sum_j1/\sigma_j^2}.
$$

正規対数尤度を微分しても同じ推定量を得る。

Cramér–Raoについては、支持 $\mathbb R$ は母数非依存、密度は滑らか、$\mu$ は内部点、情報量は有限正なので **Cramér–Rao不等式**を適用でき、

$$
Var(\hat\mu)\ge1/I(\mu),
\quad
I(\mu)=\sum_i\sigma_i^{-2}.
$$

本推定量の分散はちょうどその逆数。$(1,4,9)$ なら重み $(36,9,4)/49$、分散 $36/49$。

## 採点基準

- 不偏条件: 3点
- 最適重み: 7点
- MLEとの一致: 5点
- Cramér–Rao定理名・条件確認・数値例: 5点
