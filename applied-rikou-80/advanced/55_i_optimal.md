# Advanced 55 I最適計画・平均予測分散

- 安定ID: `RIKOU-ADVANCED-55`
- 80大問 No.: 55
- 演習価値: C
- 難度: S
- 目安時間: 25〜30分

## 前提とこの問題の狙い

- **既知としてよい**: 線形回帰、最小二乗推定量、$\operatorname{Cov}(\widehat\beta)=\sigma^2(X^\top X)^{-1}$。
- **この問題で導入**: I最適基準を「設計領域全体の平均予測分散を小さくする基準」として導入する。
- **1級での扱い**: $f(x)^\top M^{-1}f(x)$ を完成公式として置かず、平均応答の推定量 $f(x)^\top\widehat\beta$ の分散から確認する。
- **関連Core**: [Core 01 最小二乗・射影](../core/01_ols_projection.md)、[Core 20 D最適計画](../core/20_d_optimal.md)。

## 問題

単回帰

$$
y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\mathrm{iid}}\sim N(0,\sigma^2),
\qquad
x_i\in[-1,1]
$$

を考える。設計行列を $X$、情報行列を

$$
M=X^\top X
$$

とし、

$$
f(x)=\begin{pmatrix}1\\x\end{pmatrix}
$$

とする。

1. 点 $x$ における平均応答

$$
m(x)=\beta_0+\beta_1x=f(x)^\top\beta
$$

の推定量 $\widehat m(x)=f(x)^\top\widehat\beta$ について

$$
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2f(x)^\top M^{-1}f(x)
$$

を導け。
2. I最適基準を説明せよ。
3. 対称設計で $\sum_i x_i=0$ のとき $M$ を書け。
4. このとき点 $x$ の平均応答予測分散を表せ。
5. $[-1,1]$ 上を一様に重視するとし、$E[x^2]=1/3$ を用いて平均予測分散を表せ。
6. D最適とI最適の目的の違いを説明せよ。

## 詳細解答

### 1. 点予測分散を回帰係数の共分散から導く

平均応答は

$$
m(x)=f(x)^\top\beta
$$

であり、その自然な推定量は

$$
\widehat m(x)=f(x)^\top\widehat\beta
$$

である。

通常の線形回帰で

$$
\widehat\beta=(X^\top X)^{-1}X^\top y
$$

だから

$$
\operatorname{Cov}(\widehat\beta)
=\sigma^2(X^\top X)^{-1}
=\sigma^2M^{-1}.
$$

$f(x)$ は固定ベクトルなので、線形結合の分散公式から

$$
\begin{aligned}
\operatorname{Var}\{\widehat m(x)\}
&=\operatorname{Var}\{f(x)^\top\widehat\beta\}\\
&=f(x)^\top\operatorname{Cov}(\widehat\beta)f(x)\\
&=\boxed{\sigma^2f(x)^\top M^{-1}f(x)}.
\end{aligned}
$$

したがって

$$
f(x)^\top M^{-1}f(x)
$$

は、$\sigma^2$ を除いた**点 $x$ における平均応答推定の不確実性**を表す。

なお、これは新しい1観測 $Y_{\mathrm{new}}(x)$ 自体を予測する分散とは異なる。新しい観測にはさらに新規誤差 $\varepsilon_{\mathrm{new}}$ が加わるので

$$
\operatorname{Var}\{Y_{\mathrm{new}}(x)-\widehat m(x)\}
=\sigma^2
+\sigma^2f(x)^\top M^{-1}f(x)
$$

となる。本問のI最適基準は前者、すなわち**平均応答の推定精度**を対象にする。

---

### 2. I最適基準とは何か

回帰実験では、係数 $\beta$ を精度よく推定すること自体が目的の場合もあれば、設計領域全体で応答曲面

$$
m(x)=f(x)^\top\beta
$$

を精度よく推定することが目的の場合もある。

第1問より、点 $x$ の平均応答推定分散は

$$
\sigma^2f(x)^\top M^{-1}f(x).
$$

そこで、設計領域のどこを重視するかを表す重み分布を $\nu$ とし、

$$
\boxed{
\Phi_I(M)
=E_\nu\left[f(x)^\top M^{-1}f(x)\right]
}
$$

を最小にする設計を考える。

連続領域なら同じ量を

$$
\Phi_I(M)
=\int f(x)^\top M^{-1}f(x)\,d\nu(x)
$$

と書けるが、本問で重要なのは積分記号そのものではなく、**領域全体の点予測分散を重み付き平均している**という意味である。

この平均予測分散を最小にする基準をI最適基準と呼ぶ。

---

### 3. 対称設計の情報行列

観測点を $x_1,\ldots,x_n$ とすると

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

とおけば

$$
\boxed{
M=
\begin{pmatrix}
n&0\\
0&S_{xx}
\end{pmatrix}
}.
$$

切片列と傾き列が直交しているため、情報行列が対角になる。

---

### 4. 点 $x$ での平均応答予測分散

第3問より

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

したがって

$$
\boxed{
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2\left(
\frac1n+\frac{x^2}{S_{xx}}
\right)
}.
$$

この式は2つの不確実性を分けて見せている。

- $1/n$: 切片、つまり全体水準の推定不確実性。
- $x^2/S_{xx}$: 傾き推定の不確実性。中心 $x=0$ では消え、端へ行くほど大きくなる。

さらに $S_{xx}$ が大きいほど傾きの情報が増え、領域端での予測分散が小さくなる。

---

### 5. 設計領域全体で平均する

$[-1,1]$ 上を一様に重視する。つまり $x$ を $[-1,1]$ の一様分布に従うものとして平均を取る。

$$
E[x^2]
=\frac12\int_{-1}^1x^2\,dx
=\frac13.
$$

従って

$$
\begin{aligned}
E\left[
\operatorname{Var}\{\widehat m(x)\}
\right]
&=\sigma^2E\left[
\frac1n+\frac{x^2}{S_{xx}}
\right]\\
&=\sigma^2\left(
\frac1n+\frac{E[x^2]}{S_{xx}}
\right)\\
&=\boxed{
\sigma^2\left(
\frac1n+\frac1{3S_{xx}}
\right)
}.
\end{aligned}
$$

$n$ が固定なら第1項は変えられない。したがってこの単回帰・対称設計では

$$
S_{xx}=\sum_i x_i^2
$$

を大きくするほど平均予測分散が小さくなる。

$x_i\in[-1,1]$ なので、$S_{xx}$ を大きくするには観測点を $|x|$ の大きい場所へ置くことが有利である。ただしより高次の回帰モデルでは、設計点を単純に端だけへ置けばよいとは限らない。

---

### 6. D最適とI最適の目的の違い

D最適計画は

$$
\det(M)
$$

を最大化する。

係数推定量の分散共分散行列は

$$
\sigma^2M^{-1}
$$

なので、D最適化は回帰係数ベクトル $\beta$ の同時推定精度を全体として高める基準と解釈できる。

一方、I最適計画は

$$
E_\nu\left[f(x)^\top M^{-1}f(x)\right]
$$

を最小化し、設計領域全体での**平均応答の予測・推定精度**を直接改善する。

したがって

- D最適: パラメータ $\beta$ を全体として精度よく推定したい。
- I最適: 領域内の応答曲面 $m(x)$ を平均的に精度よく推定したい。

という目的の違いがある。

同じ設計が両方で最適になる場合もあるが、目的関数が異なるので一般には一致するとは限らない。

## 何を覚えるか

I最適基準を単独の公式として覚えず、

$$
\boxed{
\operatorname{Cov}(\widehat\beta)
=\sigma^2M^{-1}
\Longrightarrow
\operatorname{Var}\{f(x)^\top\widehat\beta\}
=\sigma^2f(x)^\top M^{-1}f(x)
\Longrightarrow
\text{領域平均を最小化}
}
$$

という流れで理解する。

## 本番答案

$$
\widehat m(x)=f(x)^\top\widehat\beta,
\qquad
\operatorname{Cov}(\widehat\beta)=\sigma^2M^{-1}
$$

より

$$
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2f(x)^\top M^{-1}f(x).
$$

従ってI最適基準は、この量を設計領域上で重み付き平均した

$$
E_\nu\left[f(x)^\top M^{-1}f(x)\right]
$$

を最小化する基準である。

$$
M=X^\top X
=
\begin{pmatrix}
n&\sum x_i\\
\sum x_i&\sum x_i^2
\end{pmatrix}.
$$

対称設計では

$$
M=
\begin{pmatrix}
n&0\\
0&S_{xx}
\end{pmatrix},
\qquad
M^{-1}=
\begin{pmatrix}
1/n&0\\
0&1/S_{xx}
\end{pmatrix}.
$$

したがって

$$
\operatorname{Var}\{\widehat m(x)\}
=\sigma^2\left(\frac1n+\frac{x^2}{S_{xx}}\right).
$$

$[-1,1]$ を一様に重視すると $E[x^2]=1/3$ なので

$$
\boxed{
E\left[\operatorname{Var}\{\widehat m(x)\}\right]
=\sigma^2\left(\frac1n+\frac1{3S_{xx}}\right)
}.
$$

D最適は係数推定全体の精度、I最適は領域平均の応答推定精度を主目的とする。

## 採点基準

- 回帰係数の共分散から点予測分散を導出: 4点
- I最適基準の定義と目的: 4点
- $X^\top X$ を成分から構成: 3点
- 逆行列から点予測分散を計算: 4点
- 一様平均を用いた平均予測分散: 3点
- D最適とI最適の目的比較: 2点

25分経過時は

$$
\operatorname{Cov}(\widehat\beta)
\to
\operatorname{Var}\{f(x)^\top\widehat\beta\}
\to
\text{領域平均}
$$

の流れを残す。
