# Core 33 吸収Markov連鎖・基本行列

- 安定ID: `RIKOU-CORE-33`
- 80大問 No.: 18
- 演習価値: A
- 難度: A
- 目安時間: 30分

## 問題

状態0,1を一時状態、状態2,3を吸収状態とする Markov 連鎖の推移行列が

$$
P=
\begin{pmatrix}
0.5&0.4&0.1&0\\
0.2&0.5&0.1&0.2\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}
$$

である。

1. 一時状態部分 $Q$ と吸収状態への部分 $R$ を書け。
2. 基本行列 $N=(I-Q)^{-1}$ を求めよ。
3. 各一時状態から吸収までの平均ステップ数を求めよ。
4. 各一時状態から状態2,3へ最終的に吸収される確率を求めよ。

## 詳細解答

### 1. ブロック

$$
Q=\begin{pmatrix}0.5&0.4\\0.2&0.5\end{pmatrix},
\qquad
R=\begin{pmatrix}0.1&0\\0.1&0.2\end{pmatrix}.
$$

### 2. 基本行列

$$
I-Q=\begin{pmatrix}0.5&-0.4\\-0.2&0.5\end{pmatrix}
$$

で行列式は $0.25-0.08=0.17$。したがって

$$
N=\frac1{0.17}
\begin{pmatrix}0.5&0.4\\0.2&0.5\end{pmatrix}
=\frac1{17}
\begin{pmatrix}50&40\\20&50\end{pmatrix}.
$$

### 3. 平均吸収時間

$\mathbf1=(1,1)^\top$ として

$$
t=N\mathbf1
=\frac1{17}\begin{pmatrix}90\\70\end{pmatrix}.
$$

よって

$$
\boxed{t_0=90/17\approx5.294,
\qquad t_1=70/17\approx4.118}.
$$

### 4. 吸収確率

吸収確率行列は

$$
B=NR.
$$

計算すると

$$
B=rac1{17}
\begin{pmatrix}9&8\\7&10\end{pmatrix}.
$$

したがって状態0から $(2,3)$ への吸収確率は $(9/17,8/17)$、状態1からは $(7/17,10/17)$。

## 本番答案

$$
Q=\begin{pmatrix}0.5&0.4\\0.2&0.5\end{pmatrix},
\quad
R=\begin{pmatrix}0.1&0\\0.1&0.2\end{pmatrix}.
$$

$$
N=(I-Q)^{-1}=\frac1{17}\begin{pmatrix}50&40\\20&50\end{pmatrix}.
$$

したがって平均吸収時間は

$$
N\mathbf1=(90/17,70/17)^\top.
$$

吸収確率は

$$
NR=\frac1{17}\begin{pmatrix}9&8\\7&10\end{pmatrix}.
$$

## 採点基準

- $Q,R$: 4点
- 基本行列: 6点
- 平均吸収時間: 5点
- 吸収確率: 5点

25分経過時は $N$ を出したら、平均時間は $N\mathbf1$、吸収確率は $NR$ と機械的に処理する。
