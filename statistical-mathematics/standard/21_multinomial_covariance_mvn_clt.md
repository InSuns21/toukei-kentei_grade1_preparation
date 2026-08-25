# Standard 09 多項分布・共分散行列・多変量中心極限定理

- 旧No.: 21
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$(N_1,\ldots,N_k)\sim\operatorname{Multinomial}(n;p_1,\ldots,p_k)$, $\hat p_i=N_i/n$ とする。

1. $\hat p$ の共分散行列を求めよ。
2. 多変量中心極限定理を書け。
3. 共分散行列が特異になる理由を説明せよ。
4. $k=3$, $p=(1/2,1/3,1/6)$ のとき $\sqrt n(\hat p_1-\hat p_2-(p_1-p_2))$ の漸近分散を求めよ。

## 詳細解答

### 1. 共分散行列

第 $r$ 試行のone-hotベクトルを

$$
Z_r=(Z_{r1},\ldots,Z_{rk})^T,
$$

$Z_{ri}=1$ を「第 $r$ 試行がカテゴリ $i$」の指標とする。すると

$$
N=\sum_{r=1}^nZ_r,
\qquad
\hat p=\frac1n\sum_{r=1}^nZ_r.
$$

1試行について

$$
E[Z_{ri}]=p_i,
\qquad
\operatorname{Var}(Z_{ri})=p_i(1-p_i).
$$

$i\ne j$ では同じ試行で2カテゴリを同時に取れないので $Z_{ri}Z_{rj}=0$。したがって

$$
\operatorname{Cov}(Z_{ri},Z_{rj})
=0-p_ip_j=-p_ip_j.
$$

よって1試行の共分散行列は

$$
\Sigma=\operatorname{diag}(p)-pp^T.
$$

試行間は独立だから

$$
\boxed{\operatorname{Cov}(\hat p)=\frac1n\Sigma}.
$$

### 2. 多変量中心極限定理

$Z_1,\ldots,Z_n$ は独立同分布で平均 $p$、共分散 $\Sigma$ なので多変量中心極限定理から

$$
\boxed{\sqrt n(\hat p-p)\Rightarrow N_k(0,\Sigma)}.
$$

### 3. 特異性

各試行で成分和が1なので

$$
\mathbf1^TZ_r=1,
\qquad
\mathbf1^T\hat p=1
$$

が恒等的に成り立つ。実際

$$
\Sigma\mathbf1
=\operatorname{diag}(p)\mathbf1-p(p^T\mathbf1)
=p-p=0.
$$

したがって $\mathbf1$ が零固有ベクトルで、$\Sigma$ は特異である。全ての $p_i>0$ ならランクは $k-1$。

### 4. コントラスト

$a=(1,-1,0)^T$ と置くと、漸近分散は

$$
\begin{aligned}
a^T\Sigma a
&=a^T\operatorname{diag}(p)a-(a^Tp)^2\\
&=p_1+p_2-(p_1-p_2)^2\\
&=\frac12+\frac13-\left(\frac12-\frac13\right)^2\\
&=\boxed{\frac{29}{36}}.
\end{aligned}
$$

## 本番答案

one-hotベクトル $Z_r$ を用いると $\hat p=n^{-1}\sum_rZ_r$。1試行では

$$
Var(Z_{ri})=p_i(1-p_i),\qquad Cov(Z_{ri},Z_{rj})=-p_ip_j
$$

だから

$$
\Sigma=diag(p)-pp^T,\qquad Cov(\hat p)=\Sigma/n.
$$

多変量中心極限定理より $\sqrt n(\hat p-p)\Rightarrow N_k(0,\Sigma)$。また $\Sigma\mathbf1=0$ なので特異。$a=(1,-1,0)^T$ では

$$
a^T\Sigma a=p_1+p_2-(p_1-p_2)^2=29/36.
$$

## 採点基準

- 共分散行列: 6点
- 多変量中心極限定理: 5点
- 特異性: 4点
- コントラスト分散: 5点
