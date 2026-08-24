# Advanced 05 射影行列・二次形式・Cochran分解

- 旧No.: 33
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X=(X_1,\ldots,X_n)^T\sim N_n(\mu\mathbf1,\sigma^2I)$。$P=\mathbf1\mathbf1^T/n$, $Q=I-P$ とする。

1. $P,Q$ が直交射影であることを示し、ランクを求めよ。
2. $PX$ と $QX$ が独立であることを示せ。
3. $\bar X$ と標本分散 $S^2=(n-1)^{-1}\sum(X_i-\bar X)^2$ の分布を導け。
4. $\bar X$ と $S^2$ の独立性を示せ。

## 詳細解答

### 1. 射影とランク

$$
P^T=P,
\qquad
P^2=\frac{\mathbf1\mathbf1^T\mathbf1\mathbf1^T}{n^2}
=\frac{n\mathbf1\mathbf1^T}{n^2}=P.
$$

したがって $P$ は対称冪等で直交射影。像は $\operatorname{span}(\mathbf1)$ なので $\operatorname{rank}(P)=1$。

$Q=I-P$ について

$$
Q^T=Q,
\qquad
Q^2=I-2P+P^2=Q,
\qquad
PQ=P-P^2=0.
$$

よって $Q$ は $\mathbf1^\perp$ への直交射影で

$$
\operatorname{rank}(Q)=n-1.
$$

### 2. $PX$ と $QX$ の独立性

どちらも正規ベクトル $X$ の線形変換なので $(PX,QX)$ は同時正規。共分散は

$$
\operatorname{Cov}(PX,QX)
=P(\sigma^2I)Q^T
=\sigma^2PQ=0.
$$

同時正規かつ無相関なので

$$
\boxed{PX\perp QX}.
$$

### 3. 平均と標本分散の分布

$PX=\bar X\mathbf1$ であり、$\bar X=n^{-1}\mathbf1^TX$ は正規線形結合だから

$$
E[\bar X]=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{1}{n^2}\mathbf1^T(\sigma^2I)\mathbf1=\frac{\sigma^2}{n}.
$$

従って

$$
\boxed{\bar X\sim N(\mu,\sigma^2/n)}.
$$

次に

$$
Z=\frac{X-\mu\mathbf1}{\sigma}\sim N_n(0,I)
$$

と置く。$Q\mathbf1=0$ だから

$$
\frac{X^TQX}{\sigma^2}=Z^TQZ.
$$

$Q$ は対称冪等でランク $n-1$ なので、ある直交行列 $U$ により

$$
U^TQU=\operatorname{diag}(1,\ldots,1,0)
$$

と対角化できる。$W=U^TZ$ とすれば直交変換のため $W\sim N_n(0,I)$。したがって

$$
Z^TQZ
=W^T(U^TQU)W
=\sum_{j=1}^{n-1}W_j^2
\sim\chi^2_{n-1}.
$$

一方

$$
X^TQX=\sum_{i=1}^n(X_i-\bar X)^2=(n-1)S^2.
$$

よって

$$
\boxed{\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}}.
$$

### 4. 独立性

$\bar X$ は $PX$ だけの関数、$S^2$ は $QX$ だけの関数である。2で $PX\perp QX$ を示したので

$$
\boxed{\bar X\perp S^2}.
$$

## 本番答案

$P^T=P$, $P^2=P$、$Q^T=Q$, $Q^2=Q$, $PQ=0$。ランクは $1,n-1$。また

$$
Cov(PX,QX)=\sigma^2PQ=0
$$

で同時正規だから独立。

$\bar X=n^{-1}\mathbf1^TX$ より $\bar X\sim N(\mu,\sigma^2/n)$。さらに $Z=(X-\mu\mathbf1)/\sigma$ とすると

$$
\frac{(n-1)S^2}{\sigma^2}=Z^TQZ.
$$

$Q$ を直交対角化すると右辺は独立標準正規の平方和 $n-1$ 個となるので $\chi^2_{n-1}$。$\bar X$ は $PX$、$S^2$ は $QX$ の関数なので独立。

## 採点基準

- 射影・ランク: 5点
- 独立性: 5点
- 平均の分布: 3点
- 二次形式のカイ二乗導出: 5点
- 平均と分散の独立: 2点
