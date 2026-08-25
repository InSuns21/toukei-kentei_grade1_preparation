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

### 1. Fisher情報量

1標本の対数密度は定数を除いて

$$
\ell_1(\mu)=-\frac{(X-\mu)^2}{2\sigma^2}.
$$

スコアは

$$
U(\mu)=\frac{X-\mu}{\sigma^2},
$$

したがって

$$
I_1(\mu)=E[U(\mu)^2]=\frac1{\sigma^2},
\qquad
I_n(\mu)=\frac n{\sigma^2}.
$$

### 2. Cramér–Rao不等式の条件確認

使うのは **Cramér–Rao 不等式**である。$E_\mu[W]=g(\mu)$ を満たす不偏推定量 $W$ に対し、正則条件の下で

$$
\operatorname{Var}_\mu(W)
\ge\frac{g'(\mu)^2}{I_n(\mu)}.
$$

本問では

- 支持は $\mathbb R^n$ で $\mu$ に依存しない。
- 正規密度は $\mu$ について滑らかである。
- 微分と積分を交換でき、$E_\mu[U_n(\mu)]=0$ が成り立つ。
- $I_n(\mu)=n/\sigma^2$ は有限かつ正である。

ので適用条件を満たす。

$g(\mu)=\mu$ なら $g'(\mu)=1$ なので

$$
\operatorname{Var}(\widehat\mu)
\ge\frac{\sigma^2}{n}.
$$

$\bar X$ は不偏で

$$
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}
$$

だから等号を達成し、有限標本で効率的である。

### 3. $\mu^2$ の不偏推定量

$\bar X\sim N(\mu,v)$、$v=\sigma^2/n$ なので

$$
E[\bar X^2]=\mu^2+v,
$$

従って $T=\bar X^2-v$ は確かに $\mu^2$ の不偏推定量である。

正規変数 $Y\sim N(\mu,v)$ について

$$
E[Y^4]=\mu^4+6\mu^2v+3v^2.
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(Y^2)
&=E[Y^4]-E[Y^2]^2\\
&=\mu^4+6\mu^2v+3v^2-(\mu^2+v)^2\\
&=4\mu^2v+2v^2.
\end{aligned}
$$

定数を引いても分散は変わらないので

$$
\boxed{
\operatorname{Var}(T)
=\frac{4\mu^2\sigma^2}{n}
+\frac{2\sigma^4}{n^2}
}.
$$

### 4. $g(\mu)=\mu^2$ のCramér–Rao下限

同じ正則性条件はそのまま成立し、$g'(\mu)=2\mu$ なので

$$
\boxed{
\operatorname{Var}(W)
\ge\frac{4\mu^2\sigma^2}{n}
}
$$

である。$T$ はこの下限より $2\sigma^4/n^2$ だけ大きい。

ただし $\mu=0$ では $g'(0)=0$ のためCramér–Rao下限は0となり情報を与えない。この点も「公式を機械的に使う」のではなく、下限が退化していることを確認する必要がある。

## 本番答案

$$
I_n(\mu)=n/\sigma^2.
$$

支持は $\mathbb R^n$ で母数非依存、正規密度は滑らか、情報量は有限正なので **Cramér–Rao 不等式**を適用できる。$g(\mu)=\mu$ では

$$
Var(\widehat\mu)\ge\sigma^2/n,
$$

$\bar X$ が等号を達成する。

$T=\bar X^2-\sigma^2/n$ は

$$
E[\bar X^2]=\mu^2+\sigma^2/n
$$

より不偏で、

$$
Var(T)=4\mu^2\frac{\sigma^2}{n}
+2\left(\frac{\sigma^2}{n}\right)^2.
$$

$g(\mu)=\mu^2$ のCR下限は $4\mu^2\sigma^2/n$。$\mu=0$ では下限0で退化する。

## 採点基準

- Fisher情報量: 4点
- Cramér–Raoの定理名・条件確認・$\bar X$の効率性: 5点
- $T$の不偏性と分散: 7点
- CR下限との比較・退化点: 4点
