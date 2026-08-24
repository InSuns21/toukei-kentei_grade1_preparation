# Core 20 D最適計画・情報行列

- 安定ID: `RIKOU-CORE-20`
- 80大問 No.: 54
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

単回帰

$$
y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\qquad \varepsilon_i\sim(0,\sigma^2),
\qquad -1\le x_i\le1
$$

で4点を選ぶ。候補計画を

- 計画A: $x=(-1,-1,1,1)$
- 計画B: $x=(-1,-1,0,1)$

とする。

1. 各計画の $X^\top X$ とその行列式を求めよ。
2. D最適基準が $\det(X^\top X)$ を最大化する理由を推定量の共分散から説明せよ。
3. AとBのどちらがD基準で優れるか。
4. 一般に $n$ 点を $[-1,1]$ から選ぶとき、$\det(X^\top X)$ の上界を示し、どのような配置で達成されるか述べよ。

## 詳細解答

### 1. 情報行列

切片と傾きの設計行列では

$$
X^\top X=
\begin{pmatrix}
n&\sum x_i\\
\sum x_i&\sum x_i^2
\end{pmatrix}.
$$

計画Aでは $\sum x_i=0$, $\sum x_i^2=4$ だから

$$
X_A^\top X_A=\begin{pmatrix}4&0\\0&4\end{pmatrix},
\qquad \det=16.
$$

計画Bでは $\sum x_i=-1$, $\sum x_i^2=3$ だから

$$
X_B^\top X_B=\begin{pmatrix}4&-1\\-1&3\end{pmatrix},
\qquad \det=12-1=11.
$$

### 2. D基準

OLSの共分散は

$$
\operatorname{Var}(\hat\beta)=\sigma^2(X^\top X)^{-1}.
$$

その信頼楕円体の体積は $\det\{(X^\top X)^{-1}\}^{1/2}$ に比例する。したがって $\det(X^\top X)$ を最大にすることは、パラメータの同時不確実性の体積を最小にすることに対応する。

### 3. 比較

$$
16>11
$$

なので計画Aが優れる。

### 4. 上界

$$
\det(X^\top X)
=n\sum x_i^2-\left(\sum x_i\right)^2
=n\sum (x_i-\bar x)^2.
$$

$|x_i|\le1$ だから $\sum x_i^2\le n$。よって

$$
\det(X^\top X)\le n^2.
$$

等号には $|x_i|=1$ が全点で成り立ち、さらに $\sum x_i=0$ が必要。したがって $-1$ と $+1$ に均等配分する設計がD最適である。

## 本番答案

$$
X^\top X=\begin{pmatrix}n&\sum x_i\\\sum x_i&\sum x_i^2\end{pmatrix}.
$$

Aでは $\det=16$、Bでは $\det=11$ なのでAが優れる。OLS共分散は $\sigma^2(X^\top X)^{-1}$ であり、D基準は信頼楕円体体積を最小化する。

また

$$
\det(X^\top X)=n\sum x_i^2-(\sum x_i)^2\le n^2.
$$

$-1,+1$ へ均等配置すると $\sum x_i=0$, $\sum x_i^2=n$ となり上界を達成する。

## 採点基準

- 情報行列と行列式: 6点
- D基準の意味: 5点
- 計画比較: 2点
- 一般上界と最適配置: 7点

25分経過時は楕円体の厳密導出を省略し、「共分散行列式の逆数最大化」と書いて(4)へ進む。
