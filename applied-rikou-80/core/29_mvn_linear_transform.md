# Core 29 多変量正規・線形変換・独立性

- 安定ID: `RIKOU-CORE-29`
- 80大問 No.: 65
- 演習価値: A
- 難度: B
- 目安時間: 20〜25分
- 電卓: 四則演算・平方根までで完結

## 問題

$$
X=\begin{pmatrix}X_1\\X_2\\X_3\end{pmatrix}
\sim N_3\left(
\begin{pmatrix}1\\2\\0\end{pmatrix},
\begin{pmatrix}2&1&0\\1&2&0\\0&0&1\end{pmatrix}
\right).
$$

$$
U=X_1+X_2,\qquad V=X_1-X_2,\qquad W=X_3
$$

とする。

1. $(U,V,W)^\top$ の平均ベクトルと共分散行列を求めよ。
2. $U,V,W$ は互いに独立か。
3. 一般に $AX+b$ の分布を述べよ。
4. 標準化した

$$
Z_1=\frac{U-3}{\sqrt6},\qquad
Z_2=\frac{V+1}{\sqrt2},\qquad
Z_3=W
$$

の同時分布を求め、

$$
Q=Z_1^2+Z_2^2+Z_3^2
$$

の分布を求めよ。
5. 多変量正規で「無相関なら独立」が成立する範囲を説明せよ。

## 詳細解答

### 1. 線形変換

$$
A=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}.
$$

平均は

$$
A\mu=\begin{pmatrix}3\\-1\\0\end{pmatrix}.
$$

分散・共分散は

$$
\operatorname{Var}(U)=6,
\qquad
\operatorname{Var}(V)=2,
\qquad
\operatorname{Cov}(U,V)=0.
$$

また $W=X_3$ は前2変数と無相関なので

$$
\boxed{\operatorname{Cov}(U,V,W)=\operatorname{diag}(6,2,1)}.
$$

### 2. 独立性

線形変換後も多変量正規で、共分散行列が対角だから

$$
\boxed{U,V,W\text{ は相互独立}}.
$$

### 3. 一般形

$$
X\sim N_p(\mu,\Sigma)
$$

なら

$$
\boxed{AX+b\sim N(A\mu+b,A\Sigma A^\top)}.
$$

### 4. 白色化とカイ二乗

各成分をその標準偏差で割っているので

$$
(Z_1,Z_2,Z_3)^\top\sim N_3(0,I_3).
$$

しかも3成分は独立標準正規。したがって独立な標準正規の二乗和として

$$
\boxed{Q\sim\chi^2_3}.
$$

これは多変量正規の Mahalanobis 距離がカイ二乗分布につながる最小例である。

### 5. 無相関と独立

同時正規ベクトルの成分ブロック同士では交差共分散0なら独立。各変数が個別に正規というだけでは不十分で、「同時に多変量正規」である必要がある。

## 本番答案

$$
E(U,V,W)^\top=(3,-1,0)^\top,
\qquad
\operatorname{Var}(U,V,W)^\top=\operatorname{diag}(6,2,1).
$$

線形変換後も同時正規で交差共分散が0なので $U,V,W$ は相互独立。一般に

$$
AX+b\sim N(A\mu+b,A\Sigma A^\top).
$$

標準化後は $Z\sim N_3(0,I)$ だから

$$
Q=Z_1^2+Z_2^2+Z_3^2\sim\chi^2_3.
$$

## 採点基準

- (1) 平均・共分散: 6点
- (2) 独立性: 3点
- (3) 一般公式: 3点
- (4) 標準化・カイ二乗: 5点
- (5) 注意点: 3点

20分経過時は行列積を全部書かず、対角共分散→独立→標準化→$\chi^2$ の流れを確保する。
