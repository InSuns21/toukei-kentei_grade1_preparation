# Advanced 70 共分散固有構造・白色化変換

- 安定ID: `RIKOU-ADVANCED-70`
- 80大問 No.: 70
- 演習価値: B
- 難度: A
- 目安時間: 25〜30分

## 問題

平均0、共分散

$$
\Sigma=\begin{pmatrix}3&1\\1&3\end{pmatrix}
$$

のベクトル $X$ を考える。

1. 固有値と単位固有ベクトルを求めよ。
2. $\Sigma=Q\Lambda Q^T$ と書け。
3. $Z=\Lambda^{-1/2}Q^T X$ の共分散を求めよ。
4. $X$ が多変量正規なら $Z$ の成分について何が言えるか。
5. 主成分分析標準化と白色化の違いを説明せよ。

## 詳細解答

### 1. 固有値・固有ベクトル

$$
\begin{aligned}
0&=\det(\Sigma-\lambda I)\\
&=(3-\lambda)^2-1\\
&=(\lambda-4)(\lambda-2).
\end{aligned}
$$

従って固有値は4,2。

$\lambda=4$ では

$$
-a_1+a_2=0
$$

だから方向は $(1,1)^T$、$\lambda=2$ では $a_1+a_2=0$ だから方向は $(1,-1)^T$。正規化して

$$
q_1=\frac1{\sqrt2}(1,1)^T,
\qquad
q_2=\frac1{\sqrt2}(1,-1)^T.
$$

### 2. 固有分解

列に固有ベクトルを並べて

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad
\Lambda=\begin{pmatrix}4&0\\0&2\end{pmatrix}.
$$

$Q^TQ=I$ で

$$
\boxed{\Sigma=Q\Lambda Q^T}.
$$

### 3. 白色化後の共分散

$E[X]=0$ なので $E[Z]=0$。共分散は線形変換の公式をそのまま計算して

$$
\begin{aligned}
Cov(Z)
&=\Lambda^{-1/2}Q^TCov(X)Q\Lambda^{-1/2}\\
&=\Lambda^{-1/2}Q^T(Q\Lambda Q^T)Q\Lambda^{-1/2}\\
&=\Lambda^{-1/2}\Lambda\Lambda^{-1/2}\\
&=\boxed{I_2}.
\end{aligned}
$$

### 4. 正規の場合

$X$ が多変量正規なら線形変換 $Z$ も多変量正規。平均0・共分散 $I_2$ なので

$$
\boxed{Z\sim N_2(0,I_2)}.
$$

多変量正規では無相関成分は独立だから、$Z_1,Z_2$ は独立な標準正規である。

### 5. 主成分分析との違い

主成分分析の回転 $Y=Q^TX$ だけなら

$$
Cov(Y)=\Lambda,
$$

つまり主成分は無相関だが分散4,2を保つ。白色化はさらに

$$
Z=\Lambda^{-1/2}Y
$$

として各主成分を標準偏差で割り、分散を全て1にする。

## 本番答案

$$
\det(\Sigma-\lambda I)=(3-\lambda)^2-1=(\lambda-4)(\lambda-2)
$$

より固有値4,2、単位固有ベクトルは $(1,1)^T/\sqrt2$, $(1,-1)^T/\sqrt2$。従って

$$
\Sigma=Q\Lambda Q^T,
\quad
Q=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\quad
\Lambda=diag(4,2).
$$

$$
Cov(Z)=\Lambda^{-1/2}Q^T\Sigma Q\Lambda^{-1/2}=I.
$$

正規なら $Z\sim N_2(0,I)$ で成分独立。主成分分析回転は分散を固有値のまま残し、白色化はさらに単位分散へ尺度調整する。

## 採点基準

- 固有分解: 7点
- 白色化共分散: 6点
- 正規時独立: 3点
- 主成分分析との差: 4点

25分経過時は $Q^T\Sigma Q=\Lambda$ を使う。
