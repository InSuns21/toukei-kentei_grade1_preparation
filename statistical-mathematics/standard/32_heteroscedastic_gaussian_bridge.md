# Standard 12 不均一分散Gaussian bridge

- 旧No.: 32
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

独立に $X_i\sim N(\mu_i,\sigma_i^2)$, $i=1,\ldots,n$ とし $T=\sum_iX_i$ とする。$M=\sum_i\mu_i$, $V=\sum_i\sigma_i^2$ と置く。

1. $X_i\mid T=t$ の平均と分散を求めよ。
2. $i\ne j$ の条件付き共分散を求めよ。
3. 等分散の場合に通常のGaussian bridge公式へ戻ることを確認せよ。

## 詳細解答

### 1. $X_i\mid T=t$ の平均と分散

$X_1,\ldots,X_n$ は独立な正規変数なので、ベクトル $(X_1,\ldots,X_n)^T$ は多変量正規分布に従う。$T=\sum_rX_r$ はその線形結合だから、$(X_i,T)$ も2変量正規である。

独立性から $r\ne i$ では $\operatorname{Cov}(X_i,X_r)=0$。従って

$$
\begin{aligned}
\operatorname{Cov}(X_i,T)
&=\operatorname{Cov}\left(X_i,\sum_{r=1}^nX_r\right)\\
&=\operatorname{Var}(X_i)+\sum_{r\ne i}\operatorname{Cov}(X_i,X_r)\\
&=\sigma_i^2.
\end{aligned}
$$

また独立性から和の分散は加法的なので

$$
\operatorname{Var}(T)=\sum_{r=1}^n\sigma_r^2=V.
$$

$V>0$ とする。2変量正規の条件付き分布公式を適用すると

$$
\begin{aligned}
E[X_i\mid T=t]
&=\mu_i+\frac{\operatorname{Cov}(X_i,T)}{\operatorname{Var}(T)}(t-M)\\
&=\boxed{\mu_i+\frac{\sigma_i^2}{V}(t-M)},
\end{aligned}
$$

$$
\begin{aligned}
\operatorname{Var}(X_i\mid T)
&=\operatorname{Var}(X_i)-
\frac{\operatorname{Cov}(X_i,T)^2}{\operatorname{Var}(T)}\\
&=\boxed{\sigma_i^2-\frac{\sigma_i^4}{V}}.
\end{aligned}
$$

### 2. $i\ne j$ の条件付き共分散

$(X_i,X_j,T)$ も元の多変量正規ベクトルの線形変換なので同時正規である。多変量正規の条件付き共分散公式から

$$
\begin{aligned}
\operatorname{Cov}(X_i,X_j\mid T)
&=\operatorname{Cov}(X_i,X_j)
-\operatorname{Cov}(X_i,T)
\operatorname{Var}(T)^{-1}
\operatorname{Cov}(T,X_j).
\end{aligned}
$$

$i\ne j$ では独立性から $\operatorname{Cov}(X_i,X_j)=0$ であり、

$$
\operatorname{Cov}(X_i,T)=\sigma_i^2,
\qquad
\operatorname{Cov}(T,X_j)=\sigma_j^2.
$$

従って

$$
\boxed{
\operatorname{Cov}(X_i,X_j\mid T)
=-\frac{\sigma_i^2\sigma_j^2}{V}
}.
$$

和 $T$ を固定すると、ある成分が上振れした分を他の成分が下げて補う必要があるため、条件付きでは負の共分散が生じる。

### 3. 等分散の場合

すべて $\sigma_i^2=\sigma^2$ なら

$$
V=n\sigma^2,
\qquad
\frac{\sigma_i^2}{V}=\frac1n.
$$

したがって条件付き平均は

$$
\boxed{
E[X_i\mid T=t]
=\mu_i+\frac{t-M}{n}
}.
$$

条件付き分散は

$$
\operatorname{Var}(X_i\mid T)
=\sigma^2-\frac{\sigma^4}{n\sigma^2}
=\boxed{\sigma^2\left(1-\frac1n\right)},
$$

$i\ne j$ の条件付き共分散は

$$
\operatorname{Cov}(X_i,X_j\mid T)
=-\frac{\sigma^4}{n\sigma^2}
=\boxed{-\frac{\sigma^2}{n}}.
$$

特に全ての平均も等しい場合には、固定した総和を各成分が対称に分担する通常のGaussian bridgeの形に戻る。

## 本番答案

独立正規ベクトルの線形変換なので $(X_i,T)$ は同時正規。独立性から

$$
\operatorname{Cov}(X_i,T)=\sigma_i^2,
\qquad
\operatorname{Var}(T)=V.
$$

従って条件付き正規公式から

$$
E[X_i\mid T=t]
=\mu_i+\frac{\sigma_i^2}{V}(t-M),
$$

$$
\operatorname{Var}(X_i\mid T)
=\sigma_i^2-\frac{\sigma_i^4}{V}.
$$

また $i\ne j$ では

$$
\operatorname{Cov}(X_i,X_j\mid T)
=0-\frac{\sigma_i^2\sigma_j^2}{V}.
$$

等分散なら重みは $1/n$、分散は $\sigma^2(1-1/n)$、異なる成分間の共分散は $-\sigma^2/n$ となる。

## 採点基準

- 同時正規性と共分散構造の確認: 5点
- 条件付き平均・分散: 7点
- 条件付き共分散: 5点
- 等分散への帰着: 3点
