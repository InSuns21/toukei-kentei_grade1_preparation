# Standard 18 超幾何分布・有限母集団補正

- 旧No.: 56
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

大きさ $N$ の有限母集団に成功個体が $K$ 個ある。復元なしに $n$ 個抽出し、成功数を $X$ とする。

1. $E[X]$, $\operatorname{Var}(X)$ を求めよ。
2. 母集団成功数 $K$ の不偏推定量を作れ。
3. 復元抽出の二項分布と比べ、有限母集団補正の意味を説明せよ。

## 詳細解答

### 1. 指示変数から平均と分散を導く

抽出順を $1,\ldots,n$ とし、$j$ 回目に成功個体を引けば1、そうでなければ0となる指示変数を $I_j$ とする。

$$
X=\sum_{j=1}^n I_j.
$$

各回の周辺成功確率は対称性から

$$
P(I_j=1)=\frac KN=:p
$$

なので

$$
E[I_j]=p.
$$

従って

$$
\boxed{E[X]=np=n\frac KN}.
$$

分散では復元なし抽出による負の共分散を入れる必要がある。

$j\ne k$ について

$$
P(I_j=1,I_k=1)
=\frac KN\frac{K-1}{N-1}.
$$

したがって

$$
\begin{aligned}
\operatorname{Cov}(I_j,I_k)
&=\frac{K(K-1)}{N(N-1)}-\left(\frac KN\right)^2\\
&=-\frac{K(N-K)}{N^2(N-1)}\\
&=-\frac{p(1-p)}{N-1}.
\end{aligned}
$$

また

$$
\operatorname{Var}(I_j)=p(1-p).
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=\sum_{j=1}^n\operatorname{Var}(I_j)
+2\sum_{j<k}\operatorname{Cov}(I_j,I_k)\\
&=np(1-p)
+n(n-1)\left(-\frac{p(1-p)}{N-1}\right)\\
&=np(1-p)
\left(1-\frac{n-1}{N-1}\right)\\
&=\boxed{
np(1-p)\frac{N-n}{N-1}
}.
\end{aligned}
$$

$p=K/N$ を戻せば

$$
\boxed{
\operatorname{Var}(X)
=n\frac KN\left(1-\frac KN\right)
\frac{N-n}{N-1}
}.
$$

### 2. $K$ の不偏推定量

第1問より

$$
E[X]=n\frac KN.
$$

両辺を $N/n$ 倍すれば

$$
E\left[\frac NnX\right]=K.
$$

したがって

$$
\boxed{\widehat K=\frac NnX}
$$

は $K$ の不偏推定量である。

### 3. 有限母集団補正の意味

復元抽出なら各回は独立で、成功確率 $p=K/N$ の二項分布に近いので

$$
\operatorname{Var}_{\mathrm{with}}(X)=np(1-p).
$$

復元なし抽出では

$$
\operatorname{Var}_{\mathrm{without}}(X)
=np(1-p)\frac{N-n}{N-1}.
$$

したがって

$$
\boxed{
\frac{N-n}{N-1}<1
}
$$

が有限母集団補正である。

なぜ小さくなるかは共分散を見ると明確である。成功個体を1個引くと母集団に残る成功個体の割合が少し下がるので、次の成功確率も下がる。よって抽出結果同士には負の相関が生じ、独立な復元抽出より合計成功数の変動が小さくなる。

$n/N$ が非常に小さいと

$$
\frac{N-n}{N-1}\approx1
$$

となり、有限母集団補正を無視した二項近似がよくなる。

一方 $n=N$ なら

$$
\frac{N-n}{N-1}=0
$$

であり、母集団全体を調べるので $X=K$ が確定し、分散0になる。

## 本番答案

$I_j$ を $j$ 回目の成功指示変数とすると

$$
X=\sum_{j=1}^nI_j,
\qquad
E[I_j]=p=\frac KN.
$$

また $j\ne k$ で

$$
\operatorname{Cov}(I_j,I_k)
=-\frac{p(1-p)}{N-1}.
$$

したがって

$$
E[X]=np,
$$

$$
\operatorname{Var}(X)
=np(1-p)+n(n-1)\left(-\frac{p(1-p)}{N-1}\right)
=np(1-p)\frac{N-n}{N-1}.
$$

よって

$$
\widehat K=\frac NnX
$$

は不偏。因子 $(N-n)/(N-1)$ は復元なし抽出で生じる負の相関により分散が減ることを表す。

## 採点基準

- 指示変数による平均: 4点
- 2抽出の同時成功確率・負の共分散: 5点
- 分散と有限母集団補正: 5点
- $K$ の不偏推定量: 3点
- 補正の解釈: 3点
