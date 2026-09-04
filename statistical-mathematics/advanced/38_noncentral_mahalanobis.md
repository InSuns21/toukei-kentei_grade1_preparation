# Advanced 09 非心Mahalanobis二次形式

- 旧No.: 38
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## この問題の前提と到達点

- **既知としてよい**：多変量正規分布の線形変換、実対称行列の直交対角化、独立標準正規の平方和がカイ二乗分布になること
- **この問題で導入**：$\Sigma^{-1/2}$ による白色化、Mahalanobis型二次形式、非心カイ二乗分布との対応
- **1級での扱い**：行列平方根 $\Sigma^{1/2}$ を無説明で既知扱いしない。本問で必要な $\Sigma^{-1/2}$ は固有値分解から定義する。一般の行列関数論は不要
- **関連Core**：[非心カイ二乗分布：正規変数の二乗和・モーメント母関数・ポアソン混合](../core/04_chisq_mgf_beta.md)
- **関連共通解説**：[正規標本の直交射影・Cochranの定理](../common/normal_sample_projection_cochran.md)

## 問題

$X\sim N_p(\mu,\Sigma)$ とし、$\Sigma$ は正定値とする。固定ベクトル $a$ に対し

$$
Q=(X-a)^T\Sigma^{-1}(X-a)
$$

とする。

1. 正定値対称行列 $\Sigma$ を固有値分解し、$\Sigma^{-1/2}$ を定義せよ。その上で $Z=\Sigma^{-1/2}(X-a)$ の平均と共分散を求めよ。
2. $Q$ を $Z_1,\ldots,Z_p$ の平方和に直し、分布と非心度を求めよ。
3. $E[Q]$, $\operatorname{Var}(Q)$ を求めよ。
4. $a=\mu$ の場合を説明せよ。

## 詳細解答

### 1. 行列平方根と白色化

$\Sigma$ は実対称かつ正定値なので、スペクトル定理により、ある直交行列 $U$ と正の固有値 $\lambda_1,\ldots,\lambda_p$ を使って

$$
\Sigma
=U\Lambda U^T,
\qquad
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p),
\qquad
\lambda_j>0
$$

と書ける。

そこで

$$
\Lambda^{-1/2}
=\operatorname{diag}
(\lambda_1^{-1/2},\ldots,\lambda_p^{-1/2})
$$

とし、

$$
\boxed{
\Sigma^{-1/2}=U\Lambda^{-1/2}U^T
}
$$

と定義する。

すると

$$
\begin{aligned}
\Sigma^{-1/2}\Sigma\Sigma^{-1/2}
&=U\Lambda^{-1/2}U^T
U\Lambda U^T
U\Lambda^{-1/2}U^T\\
&=U I U^T\\
&=I.
\end{aligned}
$$

これが本問で必要な行列平方根の意味である。一般の「行列関数」を知っている必要はない。

ここで

$$
Z=\Sigma^{-1/2}(X-a)
$$

と置く。正規ベクトルの線形変換なので $Z$ も多変量正規であり、

$$
E[Z]
=\Sigma^{-1/2}(\mu-a)
=:\delta.
$$

共分散は

$$
\begin{aligned}
\operatorname{Cov}(Z)
&=\Sigma^{-1/2}\Sigma\Sigma^{-1/2}\\
&=I.
\end{aligned}
$$

したがって

$$
\boxed{Z\sim N_p(\delta,I)},
\qquad
\boxed{\delta=\Sigma^{-1/2}(\mu-a)}.
$$

分散共分散行列を $I$ に変えるこの操作を**白色化（whitening）**という。名称よりも「相関と尺度を取り除いて標準的な座標へ移す」という意味を押さえる。

### 2. 二次形式と非心カイ二乗分布

上の定義から

$$
\begin{aligned}
Z^TZ
&=(X-a)^T(\Sigma^{-1/2})^T\Sigma^{-1/2}(X-a)\\
&=(X-a)^T\Sigma^{-1}(X-a)\\
&=Q,
\end{aligned}
$$

ここで $\Sigma^{-1/2}$ は対称であることを使った。

よって

$$
Q=Z^TZ=\sum_{j=1}^pZ_j^2.
$$

$Z\sim N_p(\delta,I)$ だから、成分は独立で

$$
Z_j\sim N(\delta_j,1).
$$

独立な $N(\delta_j,1)$ の平方和

$$
\sum_{j=1}^p Z_j^2
$$

の分布を、自由度 $p$、非心度

$$
\lambda=\sum_{j=1}^p\delta_j^2
$$

の**非心カイ二乗分布** $\chi_p^2(\lambda)$ と定義する。

したがって

$$
\boxed{Q\sim\chi_p^2(\lambda)}.
$$

非心度は

$$
\begin{aligned}
\lambda
&=\delta^T\delta\\
&=(\mu-a)^T\Sigma^{-1/2}\Sigma^{-1/2}(\mu-a)\\
&=\boxed{(\mu-a)^T\Sigma^{-1}(\mu-a)}.
\end{aligned}
$$

この量は、$\mu$ と $a$ の差を共分散 $\Sigma$ の尺度で測った二乗距離である。これがMahalanobis距離の二乗に相当する。

### 3. 平均と分散

Core 04で非心カイ二乗分布の一般公式を導出しているが、ここでも平方和から直接確認する。

$Z_j=Y_j+\delta_j$、$Y_j\sim N(0,1)$ と書く。

まず

$$
E[Z_j^2]
=E[Y_j^2]+2\delta_jE[Y_j]+\delta_j^2
=1+\delta_j^2.
$$

次に

$$
Z_j^2=Y_j^2+2\delta_jY_j+\delta_j^2.
$$

定数項は分散に影響しないので

$$
\begin{aligned}
\operatorname{Var}(Z_j^2)
&=\operatorname{Var}(Y_j^2+2\delta_jY_j)\\
&=\operatorname{Var}(Y_j^2)
+4\delta_j^2\operatorname{Var}(Y_j)
+4\delta_j\operatorname{Cov}(Y_j^2,Y_j).
\end{aligned}
$$

標準正規の対称性から

$$
E[Y_j^3]=0,
$$

したがって

$$
\operatorname{Cov}(Y_j^2,Y_j)
=E[Y_j^3]-E[Y_j^2]E[Y_j]=0.
$$

また標準正規について

$$
E[Y_j^4]=3
$$

なので

$$
\operatorname{Var}(Y_j^2)=3-1^2=2.
$$

従って

$$
\boxed{
\operatorname{Var}(Z_j^2)=2+4\delta_j^2
}.
$$

$Z_1,\ldots,Z_p$ は独立なので、その平方も独立である。よって

$$
\begin{aligned}
E[Q]
&=\sum_{j=1}^p(1+\delta_j^2)\\
&=\boxed{p+\lambda},
\end{aligned}
$$

$$
\begin{aligned}
\operatorname{Var}(Q)
&=\sum_{j=1}^p(2+4\delta_j^2)\\
&=\boxed{2(p+2\lambda)}.
\end{aligned}
$$

### 4. 中心ケース

$a=\mu$ なら

$$
\delta=\Sigma^{-1/2}(\mu-a)=0,
\qquad
\lambda=0.
$$

従って

$$
\boxed{Q\sim\chi_p^2}.
$$

つまり、真の平均 $\mu$ を中心にMahalanobis距離を測れば中心カイ二乗分布になり、中心を $a\ne\mu$ にずらすと、そのずれのMahalanobis距離の二乗が非心度になる。

## 本番答案

$\Sigma=U\Lambda U^T$ と直交対角化し、

$$
\Sigma^{-1/2}=U\Lambda^{-1/2}U^T
$$

と定義する。すると

$$
\Sigma^{-1/2}\Sigma\Sigma^{-1/2}=I.
$$

$Z=\Sigma^{-1/2}(X-a)$ と置けば

$$
Z\sim N_p(\delta,I),
\qquad
\delta=\Sigma^{-1/2}(\mu-a),
$$

かつ

$$
Q=Z^TZ=\sum_jZ_j^2.
$$

従って定義から

$$
Q\sim\chi_p^2(\lambda),
$$

$$
\lambda=\delta^T\delta
=(\mu-a)^T\Sigma^{-1}(\mu-a).
$$

各 $Z_j\sim N(\delta_j,1)$ について

$$
E[Z_j^2]=1+\delta_j^2,
\qquad
\operatorname{Var}(Z_j^2)=2+4\delta_j^2,
$$

だから

$$
E[Q]=p+\lambda,
\qquad
\operatorname{Var}(Q)=2(p+2\lambda).
$$

$a=\mu$ なら $\lambda=0$ なので $Q\sim\chi_p^2$。

## 採点基準

- 固有値分解から $\Sigma^{-1/2}$ を定義し白色化を確認: 5点
- 二次形式を平方和へ変換し非心カイ二乗分布を同定: 5点
- 非心度をMahalanobis距離として導出: 4点
- 平均・分散を平方和から導出: 4点
- 中心化特例の説明: 2点
