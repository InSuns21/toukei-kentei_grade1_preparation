# Core 29 多変量正規・線形変換・独立性

- 安定ID: `RIKOU-CORE-29`
- 80大問 No.: 65
- 演習価値: A
- 難度: B
- 目安時間: 25分

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
4. 多変量正規で「無相関なら独立」が成立する範囲を説明せよ。

## 詳細解答

### 1. 線形変換

$$
A=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}.
$$

平均は

$$
A\mu=\begin{pmatrix}3\\-1\\0\end{pmatrix}.
$$

分散は

$$
\operatorname{Var}(U)=2+2+2\cdot1=6,
$$

$$
\operatorname{Var}(V)=2+2-2\cdot1=2,
$$

$$
\operatorname{Cov}(U,V)=\operatorname{Var}(X_1)-\operatorname{Var}(X_2)=0.
$$

$X_3$ は前2成分と無相関なので

$$
A\Sigma A^\top=\operatorname{diag}(6,2,1).
$$

### 2. 独立性

線形変換後も多変量正規であり、共分散行列が対角だから

$$
\boxed{U,V,W\text{ は相互に独立}}.
$$

### 3. 一般形

$$
X\sim N_p(\mu,\Sigma)
$$

なら任意の行列 $A$ とベクトル $b$ に対して

$$
\boxed{AX+b\sim N(A\mu+b,A\Sigma A^\top)}.
$$

### 4. 無相関と独立

同時正規ベクトルの成分ブロック同士では、交差共分散が0なら独立である。各変数が個別に正規というだけでは不十分で、「同時に多変量正規」であることが重要。

## 本番答案

$$
(U,V,W)^\top=AX,
\quad
A=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}.
$$

したがって

$$
E=\begin{pmatrix}3\\-1\\0\end{pmatrix},
\qquad
\operatorname{Var}=\operatorname{diag}(6,2,1).
$$

線形変換後も同時正規で交差共分散が0なので $U,V,W$ は相互独立。一般に $AX+b\sim N(A\mu+b,A\Sigma A^\top)$。

## 採点基準

- 平均: 4点
- 共分散: 7点
- 独立性: 4点
- 一般公式・注意: 5点

25分経過時は行列積を全部書かず、分散・共分散を成分計算して対角性を示す。
