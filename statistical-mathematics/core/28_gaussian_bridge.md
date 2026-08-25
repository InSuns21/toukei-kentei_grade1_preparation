# Core 35 正規部分和・条件付き分布・Gaussian bridge

- 旧No.: 28
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_i$ は独立同分布で

$$
X_i\sim N(\mu,\sigma^2)
$$

とし

$$
S_k=\sum_{i=1}^kX_i,
\qquad
S_n=\sum_{i=1}^nX_i,
\qquad k<n
$$

とする。

1. $(S_k,S_n)$ の平均・分散・共分散を求めよ。
2. $S_k\mid S_n=s$ の分布を求めよ。
3. 条件付き平均に $\mu$ が現れない理由を式から確認せよ。
4. $k=n/2$ のとき条件付き分散を簡単化せよ。

## 詳細解答

### 1. 同時モーメント

部分和は正規変数の線形結合なので $(S_k,S_n)$ は2変量正規分布に従う。

期待値は

$$
E[S_k]=k\mu,
\qquad
E[S_n]=n\mu.
$$

独立性より

$$
\operatorname{Var}(S_k)
=\sum_{i=1}^k\operatorname{Var}(X_i)
=k\sigma^2,
$$

$$
\operatorname{Var}(S_n)=n\sigma^2.
$$

また

$$
S_n=S_k+(S_n-S_k)
$$

で、$S_k$ と後半和 $S_n-S_k$ は独立である。従って

$$
\begin{aligned}
\operatorname{Cov}(S_k,S_n)
&=\operatorname{Cov}(S_k,S_k+S_n-S_k)\\
&=\operatorname{Var}(S_k)\\
&=k\sigma^2.
\end{aligned}
$$

よって

$$
\boxed{
E\begin{pmatrix}S_k\\S_n\end{pmatrix}
=\begin{pmatrix}k\mu\\n\mu\end{pmatrix},
\quad
\operatorname{Cov}\begin{pmatrix}S_k\\S_n\end{pmatrix}
=\sigma^2
\begin{pmatrix}k&k\\k&n\end{pmatrix}
}.
$$

### 2. $S_k\mid S_n=s$ の分布

$S_k$ から $S_n$ と相関する線形成分を引く。

$$
R=S_k-aS_n
$$

と置くと

$$
\begin{aligned}
\operatorname{Cov}(R,S_n)
&=\operatorname{Cov}(S_k,S_n)
-a\operatorname{Var}(S_n)\\
&=k\sigma^2-an\sigma^2.
\end{aligned}
$$

これを0にする係数は

$$
a=\frac kn.
$$

従って

$$
R=S_k-\frac knS_n.
$$

$(R,S_n)$ は正規ベクトルの線形変換で同時正規、かつ無相関なので独立である。

残差平均は

$$
\begin{aligned}
E[R]
&=k\mu-\frac kn n\mu\\
&=0.
\end{aligned}
$$

残差分散は

$$
\begin{aligned}
\operatorname{Var}(R)
&=\operatorname{Var}\left(S_k-\frac knS_n\right)\\
&=k\sigma^2
+\frac{k^2}{n^2}n\sigma^2
-2\frac kn k\sigma^2\\
&=k\sigma^2+\frac{k^2}{n}\sigma^2-\frac{2k^2}{n}\sigma^2\\
&=\frac{k(n-k)}n\sigma^2.
\end{aligned}
$$

従って

$$
R\sim N\left(0,\frac{k(n-k)}n\sigma^2\right),
\qquad R\perp S_n.
$$

$$
S_k=\frac knS_n+R
$$

だから $S_n=s$ と条件付けると

$$
\boxed{
S_k\mid S_n=s
\sim N\left(
\frac kns,
\frac{k(n-k)}n\sigma^2
\right)
}.
$$

### 3. 条件付き平均から $\mu$ が消える理由

通常の条件付き正規分布の平均公式で書けば

$$
\begin{aligned}
E[S_k\mid S_n=s]
&=E[S_k]
+\frac{\operatorname{Cov}(S_k,S_n)}{\operatorname{Var}(S_n)}
\{s-E[S_n]\}\\
&=k\mu
+\frac{k\sigma^2}{n\sigma^2}(s-n\mu)\\
&=k\mu+\frac kns-k\mu\\
&=\boxed{\frac kns}.
\end{aligned}
$$

$k\mu$ と $-(k/n)n\mu=-k\mu$ が正確に打ち消し合う。

これは $S_n=s$ という総和を固定した後では、その総和 $s$ が $n$ 個の交換可能な正規増分へ平均的に $k/n$ の割合で配分されるためである。共通の位置母数 $\mu$ は、総和を条件付けた時点で相対的な分配には残らない。

### 4. $k=n/2$ の場合

$n$ が偶数で $k=n/2$ とする。条件付き分散へ代入すると

$$
\begin{aligned}
\frac{k(n-k)}n\sigma^2
&=\frac{(n/2)(n-n/2)}n\sigma^2\\
&=\frac{(n/2)^2}{n}\sigma^2\\
&=\boxed{\frac n4\sigma^2}.
\end{aligned}
$$

条件付き平均は

$$
E[S_{n/2}\mid S_n=s]=\frac s2.
$$

従って

$$
S_{n/2}\mid S_n=s
\sim N\left(\frac s2,\frac n4\sigma^2\right).
$$

## 本番答案

$(S_k,S_n)$ は2変量正規で

$$
E[S_k]=k\mu,
\quad E[S_n]=n\mu,
$$

$$
\operatorname{Var}(S_k)=k\sigma^2,
\quad
\operatorname{Var}(S_n)=n\sigma^2,
\quad
\operatorname{Cov}(S_k,S_n)=k\sigma^2.
$$

$$
R=S_k-\frac knS_n
$$

と置くと

$$
\operatorname{Cov}(R,S_n)=0.
$$

同時正規なので $R\perp S_n$。また

$$
E[R]=0,
\qquad
\operatorname{Var}(R)=\frac{k(n-k)}n\sigma^2.
$$

従って

$$
S_k\mid S_n=s
\sim N\left(
\frac kns,
\frac{k(n-k)}n\sigma^2
\right).
$$

条件付き平均では

$$
k\mu+\frac kn(s-n\mu)=\frac kns
$$

となり $\mu$ が相殺される。

$k=n/2$ なら条件付き分散は $n\sigma^2/4$。

## 採点基準

- 部分和の平均・分散・共分散: 6点
- 残差化・同時正規性から条件付き分布を導出: 6点
- $\mu$ が消える代数と解釈: 4点
- $k=n/2$ の代入: 4点
