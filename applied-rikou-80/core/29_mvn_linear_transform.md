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

の同時分布を求め、$Q=Z_1^2+Z_2^2+Z_3^2$ の分布を求めよ。
5. 多変量正規で「無相関なら独立」が成立する範囲を説明せよ。

## 詳細解答

### 1. 平均ベクトルと共分散行列

$$
Y=\begin{pmatrix}U\\V\\W\end{pmatrix}=AX,
\qquad
A=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}.
$$

平均は

$$
E[Y]=AE[X]=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}
\begin{pmatrix}1\\2\\0\end{pmatrix}
=\boxed{\begin{pmatrix}3\\-1\\0\end{pmatrix}}.
$$

共分散は $\operatorname{Cov}(Y)=A\Sigma A^T$。まず

$$
A\Sigma
=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}
\begin{pmatrix}2&1&0\\1&2&0\\0&0&1\end{pmatrix}
=\begin{pmatrix}3&3&0\\1&-1&0\\0&0&1\end{pmatrix}.
$$

従って

$$
A\Sigma A^T
=\begin{pmatrix}3&3&0\\1&-1&0\\0&0&1\end{pmatrix}
\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}
=\boxed{\begin{pmatrix}6&0&0\\0&2&0\\0&0&1\end{pmatrix}}.
$$

### 2. 独立性

多変量正規ベクトルの線形変換は再び多変量正規なので $Y$ は同時正規である。第1問で共分散行列が対角行列と分かったので成分は互いに無相関。同時正規ベクトルでは交差共分散が0なら対応する成分は独立だから

$$
\boxed{U,V,W\text{ は相互に独立}}.
$$

### 3. 一般の線形変換

一般に $X\sim N_p(\mu,\Sigma)$ なら、多変量正規分布の線形変換閉性から

$$
E[AX+b]=A\mu+b,
\qquad
\operatorname{Cov}(AX+b)=A\Sigma A^T.
$$

したがって

$$
\boxed{AX+b\sim N(A\mu+b,A\Sigma A^T)}.
$$

### 4. 標準化とカイ二乗分布

第1問と第2問から

$$
U\sim N(3,6),\qquad V\sim N(-1,2),\qquad W\sim N(0,1)
$$

で互いに独立。従って

$$
\boxed{(Z_1,Z_2,Z_3)^T\sim N_3(0,I_3)}.
$$

カイ二乗分布の定義より、独立な標準正規変数3個の二乗和は

$$
\boxed{Q=Z_1^2+Z_2^2+Z_3^2\sim\chi^2_3}.
$$

### 5. 「無相関なら独立」の適用範囲

同時多変量正規ベクトルを2つの成分ブロックに分けたとき、両ブロック間の共分散行列が0なら2ブロックは独立である。特にスカラー成分同士なら共分散0で独立になる。

しかし「各変数の周辺分布が正規」であることだけでは同時正規性は保証されない。その場合、無相関でも依存している例があり得る。

## 本番答案

$$
Y=(U,V,W)^T=AX,
\quad
A=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}.
$$

$$
AE[X]=(3,-1,0)^T,
\qquad
A\Sigma=\begin{pmatrix}3&3&0\\1&-1&0\\0&0&1\end{pmatrix},
$$

$$
A\Sigma A^T=\operatorname{diag}(6,2,1).
$$

線形変換後も同時正規で交差共分散0だから $U,V,W$ は相互独立。一般に

$$
AX+b\sim N(A\mu+b,A\Sigma A^T).
$$

従って標準化後は $Z\sim N_3(0,I_3)$ で $Q\sim\chi^2_3$。

## 採点基準

- (1) 平均・共分散の行列計算: 6点
- (2) 同時正規性を確認した独立性: 3点
- (3) 一般公式: 3点
- (4) 標準化・カイ二乗: 5点
- (5) 適用範囲の注意: 3点

20分経過時も $A\Sigma A^T$ の中間積を1段残し、対角共分散→独立→標準化→カイ二乗の流れを確保する。
