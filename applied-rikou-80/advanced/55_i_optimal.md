# Advanced 55 I最適計画・平均予測分散

- 安定ID: `RIKOU-ADVANCED-55`
- 80大問 No.: 55
- 演習価値: C
- 難度: S
- 目安時間: 25〜30分

## 問題

単回帰

$$
y=\beta_0+\beta_1x+\varepsilon,
\qquad x\in[-1,1]
$$

を考える。設計行列情報を

$$
M=X^\top X
$$

とし、点 $x$ の平均応答予測分散は

$$
\sigma^2 f(x)^\top M^{-1}f(x),
\qquad
f(x)=\begin{pmatrix}1\\x\end{pmatrix}
$$

とする。

1. I最適基準を説明せよ。
2. 対称設計で $\sum_i x_i=0$ のとき $M$ を書け。
3. このとき予測分散を表せ。
4. 領域一様平均で $E[x^2]=1/3$ を用い、平均予測分散を表せ。
5. D最適とI最適の目的の違いを説明せよ。

## 詳細解答

### 1. I最適基準

回帰モデルでは、係数推定の精度だけでなく、設計領域全体で平均応答をどれだけ精度よく予測できるかが重要な場合がある。

点 $x$ での平均応答予測分散は

$$
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2 f(x)^\top M^{-1}f(x)
$$

である。

I最適計画では、この予測分散を設計領域上で平均した

$$
\boxed{
\Phi_I(M)
=\int f(x)^\top M^{-1}f(x)\,d\nu(x)
}
$$

を最小化する。$\nu$ は「領域のどこをどれだけ重視して予測するか」を表す測度である。

本問では後で $[-1,1]$ 上の一様平均を使う。

### 2. 対称設計の情報行列

観測点を $x_1,\ldots,x_n$ とする。設計行列は

$$
X=
\begin{pmatrix}
1&x_1\\
\vdots&\vdots\\
1&x_n
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
M=X^\top X
&=
\begin{pmatrix}
1&\cdots&1\\
x_1&\cdots&x_n
\end{pmatrix}
\begin{pmatrix}
1&x_1\\
\vdots&\vdots\\
1&x_n
\end{pmatrix}\\
&=
\begin{pmatrix}
n&\sum_i x_i\\
\sum_i x_i&\sum_i x_i^2
\end{pmatrix}.
\end{aligned}
$$

対称設計では

$$
\sum_i x_i=0.
$$

また

$$
S_{xx}=\sum_i x_i^2
$$

と置けば

$$
\boxed{
M=
\begin{pmatrix}
n&0\\
0&S_{xx}
\end{pmatrix}
}.
$$

### 3. 点 $x$ での予測分散

対角行列なので逆行列は

$$
M^{-1}
=
\begin{pmatrix}
1/n&0\\
0&1/S_{xx}
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
f(x)^\top M^{-1}f(x)
&=
\begin{pmatrix}1&x\end{pmatrix}
\begin{pmatrix}
1/n&0\\
0&1/S_{xx}
\end{pmatrix}
\begin{pmatrix}1\\x\end{pmatrix}\\
&=\frac1n+\frac{x^2}{S_{xx}}.
\end{aligned}
$$

したがって平均応答予測分散は

$$
\boxed{
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2\left(
\frac1n+\frac{x^2}{S_{xx}}
\right)
}.
$$

中心 $x=0$ では切片推定の不確実性だけが残り、端に近いほど傾き推定の不確実性が加わることが分かる。

### 4. 領域平均の予測分散

$[-1,1]$ 上で一様に平均する。確率密度関数は $1/2$ なので

$$
E_\nu[x^2]
=\frac12\int_{-1}^1x^2\,dx
=\frac13.
$$

従って

$$
\begin{aligned}
E_\nu\left[
\operatorname{Var}\{\widehat m(x)\}
\right]
&=\sigma^2E_\nu\left[
\frac1n+\frac{x^2}{S_{xx}}
\right]\\
&=\sigma^2\left(
\frac1n+\frac{E_\nu[x^2]}{S_{xx}}
\right)\\
&=\boxed{
\sigma^2\left(
\frac1n+\frac1{3S_{xx}}
\right)
}.
\end{aligned}
$$

$n$ が固定なら、この単回帰・対称設計では $S_{xx}$ を大きくするほど平均予測分散は小さくなる。

### 5. D最適とI最適の違い

D最適計画は

$$
\det(M)
$$

を最大化する。係数推定量の共分散行列は

$$
\sigma^2M^{-1}
$$

なので、D最適化は係数の同時信頼楕円体の体積を小さくすることに対応する。

一方、I最適計画は

$$
\int f(x)^\top M^{-1}f(x)\,d\nu(x)
$$

を最小化し、設計領域全体での**平均予測精度**を直接改善する。

したがって

- D最適: パラメータ $\beta$ を全体として精度よく推定したい。
- I最適: 領域内の応答曲面を平均的に精度よく予測したい。

という目的の違いがある。

同じ設計が両方で最適になる場合もあるが、一般には目的関数が異なるため必ず一致するとは限らない。

## 本番答案

I最適基準は

$$
\Phi_I(M)
=\int f(x)^\top M^{-1}f(x)\,d\nu(x)
$$

という領域平均予測分散を最小化する。

$$
M=X^\top X
=
\begin{pmatrix}
n&\sum x_i\\
\sum x_i&\sum x_i^2
\end{pmatrix}.
$$

対称設計では $\sum x_i=0$ なので

$$
M=
\begin{pmatrix}n&0\\0&S_{xx}\end{pmatrix},
\qquad
M^{-1}=
\begin{pmatrix}1/n&0\\0&1/S_{xx}\end{pmatrix}.
$$

従って

$$
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2\left(\frac1n+\frac{x^2}{S_{xx}}\right).
$$

$[-1,1]$ の一様平均では $E[x^2]=1/3$ だから

$$
\boxed{
\sigma^2\left(\frac1n+\frac1{3S_{xx}}\right)
}.
$$

D最適は $\det(M)$ を最大化して係数推定の信頼楕円体を小さくするのに対し、I最適は領域平均の予測分散を小さくする。

## 採点基準

- I最適基準の定義と目的: 4点
- $X^\top X$ を成分から構成: 4点
- 逆行列から点予測分散を導出: 5点
- 一様平均を用いた平均予測分散: 4点
- D最適とI最適の目的比較: 3点

25分経過時は、$M$ を対角化して $f(x)^\top M^{-1}f(x)$ を確保する。
