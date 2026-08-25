# Standard 67 Mahalanobis距離・相関幾何

- 安定ID: `RIKOU-STANDARD-67`
- 80大問 No.: 67
- 演習価値: A
- 難度: B
- 目安時間: 20〜25分

## 問題

平均0、共分散

$$
\Sigma=\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

の2変量データを考える。

1. $\Sigma^{-1}$ を求めよ。
2. 点 $x=(2,0)^\top$ のMahalanobis距離二乗を求めよ。
3. Euclid距離との違いを説明せよ。
4. 固有ベクトル方向 $(1,1)^\top,(1,-1)^\top$ の分散を比較せよ。
5. 多変量正規なら距離二乗がどの分布に従うか。

## 詳細解答

### 1. 共分散行列の逆行列

2次正方行列

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$

について、$ad-bc\neq0$ なら

$$
A^{-1}=\frac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
$$

である。本問では

$$
\det\Sigma=4\cdot4-2\cdot2=12>0
$$

なので逆行列が存在し、

$$
\begin{aligned}
\Sigma^{-1}
&=\frac1{12}
\begin{pmatrix}
4&-2\\
-2&4
\end{pmatrix}.
\end{aligned}
$$

従って

$$
\boxed{
\Sigma^{-1}=\frac1{12}
\begin{pmatrix}4&-2\\-2&4\end{pmatrix}
}.
$$

### 2. Mahalanobis距離二乗

平均0なので、点 $x$ のMahalanobis距離二乗は定義から

$$
d_M^2(x)=x^\top\Sigma^{-1}x.
$$

$x=(2,0)^\top$ を代入すると、まず

$$
\Sigma^{-1}x
=\frac1{12}
\begin{pmatrix}4&-2\\-2&4\end{pmatrix}
\begin{pmatrix}2\\0\end{pmatrix}
=\frac1{12}
\begin{pmatrix}8\\-4\end{pmatrix}
=\begin{pmatrix}2/3\\-1/3\end{pmatrix}.
$$

従って

$$
\begin{aligned}
d_M^2(x)
&=(2,0)
\begin{pmatrix}2/3\\-1/3\end{pmatrix}\\
&=\boxed{\frac43}.
\end{aligned}
$$

途中の行列積まで書けば、逆行列の符号や係数の取り違えを防げる。

### 3. Euclid距離との違い

Euclid距離二乗は

$$
d_E^2(x)=x^\top x
$$

であり、各座標を同じ尺度として扱い、座標間の相関も使わない。

一方、Mahalanobis距離は

$$
d_M^2(x)=x^\top\Sigma^{-1}x
$$

で、分散が大きい方向のずれは軽く、分散が小さい方向のずれは重く評価する。また非対角成分を通じて相関も補正する。

したがって「原点から同じEuclid距離」にある点でも、データがよく広がる方向にある点はMahalanobis距離が小さく、広がりにくい方向にある点は大きくなる。

### 4. 固有方向の分散

方向 $v_+=(1,1)^\top$ について

$$
\Sigma v_+
=\begin{pmatrix}4&2\\2&4\end{pmatrix}
\begin{pmatrix}1\\1\end{pmatrix}
=\begin{pmatrix}6\\6\end{pmatrix}
=6v_+.
$$

従って固有値は6。

同様に $v_-=(1,-1)^\top$ について

$$
\Sigma v_-
=\begin{pmatrix}4&2\\2&4\end{pmatrix}
\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}2\\-2\end{pmatrix}
=2v_-.
$$

従って固有値は2である。

単位ベクトル $u=v/\|v\|$ 方向への射影 $u^\top X$ の分散は

$$
\operatorname{Var}(u^\top X)=u^\top\Sigma u
$$

であり、$u$ が固有ベクトルならその値は対応する固有値になる。よって

$$
\boxed{
(1,1)^\top\text{方向の分散}=6,
\qquad
(1,-1)^\top\text{方向の分散}=2
}.
$$

正の相関があるため、2変数が同方向に動く $(1,1)$ 方向へ共分散楕円が長く伸びる。

### 5. 多変量正規での距離二乗の分布

$X\sim N_2(0,\Sigma)$ とする。$\Sigma$ は正定値なので、平方根行列 $\Sigma^{1/2}$ を用いて

$$
Z=\Sigma^{-1/2}X
$$

と標準化できる。このとき線形変換された $Z$ は

$$
Z\sim N_2(0,I_2).
$$

また

$$
X^\top\Sigma^{-1}X
=(\Sigma^{-1/2}X)^\top(\Sigma^{-1/2}X)
=Z_1^2+Z_2^2.
$$

$Z_1,Z_2$ は独立な標準正規変数なので、その二乗和は自由度2のカイ二乗分布に従う。従って

$$
\boxed{X^\top\Sigma^{-1}X\sim\chi_2^2}.
$$

## 本番答案

$$
\det\Sigma=16-4=12
$$

より

$$
\Sigma^{-1}=\frac1{12}
\begin{pmatrix}4&-2\\-2&4\end{pmatrix}.
$$

$x=(2,0)^\top$ なら

$$
\Sigma^{-1}x=(2/3,-1/3)^\top
$$

なので

$$
d_M^2=x^\top\Sigma^{-1}x=4/3.
$$

固有方向は

$$
\Sigma(1,1)^\top=6(1,1)^\top,
\qquad
\Sigma(1,-1)^\top=2(1,-1)^\top,
$$

よって分散は順に6,2。Mahalanobis距離は共分散で標準化するため、尺度と相関を補正する。

さらに $X\sim N_2(0,\Sigma)$ なら $Z=\Sigma^{-1/2}X\sim N_2(0,I_2)$ で

$$
X^\top\Sigma^{-1}X=Z_1^2+Z_2^2\sim\chi_2^2.
$$

## 採点基準

- 行列式から逆行列を計算: 5点
- Mahalanobis距離を行列積まで示して計算: 5点
- Euclid距離との違いを尺度・相関の両面から説明: 3点
- 固有方向と分散の対応: 4点
- 標準化からカイ二乗分布を導く: 3点

20分経過時は逆行列→距離→固有方向→標準化の順に処理する。
