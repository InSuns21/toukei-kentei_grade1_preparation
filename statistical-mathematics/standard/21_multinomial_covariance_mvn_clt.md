# Standard 09 多項分布・共分散行列・多変量CLT

- 旧No.: 21
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$(N_1,\ldots,N_k)\sim\operatorname{Multinomial}(n;p_1,\ldots,p_k)$, $\hat p_i=N_i/n$ とする。

1. $\hat p$ の共分散行列を求めよ。
2. 多変量CLTを書け。
3. 共分散行列が特異になる理由を説明せよ。
4. $k=3$, $p=(1/2,1/3,1/6)$ のとき $\sqrt n(\hat p_1-\hat p_2-(p_1-p_2))$ の漸近分散を求めよ。

## 詳細解答

1試行のone-hotベクトルの共分散は

$$
\Sigma=\operatorname{diag}(p)-pp^T.
$$

従って

$$
\operatorname{Cov}(\hat p)=\frac1n\Sigma,
\qquad
\sqrt n(\hat p-p)\Rightarrow N_k(0,\Sigma).
$$

$\sum\hat p_i=1$ が恒等的に成り立つため $\Sigma\mathbf 1=0$、ランクは高々 $k-1$。

$a=(1,-1,0)^T$ とすると漸近分散は

$$
a^T\Sigma a=p_1+p_2-(p_1-p_2)^2
=\frac56-\frac1{36}=\frac{29}{36}.
$$

## 本番答案

$$
\Sigma=\operatorname{diag}(p)-pp^T,
\qquad
\sqrt n(\hat p-p)\Rightarrow N(0,\Sigma).
$$

確率和が1なので $\Sigma\mathbf1=0$ で特異。指定コントラストの分散は $29/36$。

## 採点基準

- 共分散行列: 6点
- 多変量CLT: 5点
- 特異性: 4点
- コントラスト分散: 5点
