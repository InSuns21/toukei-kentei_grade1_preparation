# QMC7 準 Monte Carlo VII：ランダム化準 Monte Carlo 法

QMC1 から QMC6 までは、点集合を決めたら求積値も決まる **決定論的な準 Monte Carlo 法**を扱ってきました。

決定論的であることには大きな利点があります。QMC5 ではデジタル点集合 $P$ に対し、

$$
\frac1{|P|}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
1_{\{\boldsymbol k\in P^\perp\}}
$$

という厳密な周波数消去則を得ました。QMC6 ではこの双対集合を多項式合同式で設計できるところまで進みました。

一方で、決定論的な一回の求積値だけを見ても、

- 今回の誤差がどれくらい揺れ得るのか
- 同じ計算資源で誤差の統計的な尺度をどう作るのか
- MC1 の標準誤差のような診断をどう取り戻すのか

は、そのままでは分かりません。

ここで単純に各点へ独立な乱数を足してしまうと、せっかく作った低ディスクレパンシー構造を壊して通常の Monte Carlo 法へ戻ってしまいます。

本章では逆に、

$$
\boxed{
\text{各点は一様にランダム化する}
\quad\text{が}\quad
\text{点集合全体のデジタル構造は保つ}
}
$$

ように乱数を入れます。

これが **ランダム化準 Monte Carlo 法（randomized quasi-Monte Carlo; RQMC）** です。

中心となる二つの乱数化は、

1. 全点へ同じ桁シフトを施す **デジタルシフト**
2. 桁木を prefix ごとのランダム置換で組み替えるスクランブル（正式な定義は第7節）

です。

さらに、独立な乱数化を複数回繰り返すことで、QMC の構造を残したまま標準誤差を推定できます。

最後に関数的分散分析分解を導入し、

$$
\boxed{
\text{どの座標相互作用に分散があるか}
\quad\longleftrightarrow\quad
\text{どの Walsh 周波数が双対ネットに残るか}
}
$$

という対応まで進みます。

---

## 0. 本章で使う既出事項

QMC5 から次を使います。

- [Walsh 関数](../QMC5/index.md#def-qmc5-walsh-function)
- [Walsh 関数の積分直交性](../QMC5/index.md#thm-qmc5-walsh-integral-orthogonality)
- [デジタル点集合の双対ネット](../QMC5/index.md#def-qmc5-dual-net)
- [デジタルネット上の Walsh 関数の離散直交性](../QMC5/index.md#thm-qmc5-digital-character-property)
- [絶対収束 Walsh 級数](../QMC5/index.md#def-qmc5-absolute-walsh-series)
- [絶対収束 Walsh 級数に対する積分誤差公式](../QMC5/index.md#thm-qmc5-absolute-walsh-error)

QMC4 からは [$(t,m,s)$-ネット](../QMC4/index.md#def-qmc4-tms-net) と [$b$ 進基本区間](../QMC4/index.md#def-qmc4-b-adic-elementary-interval) を使います。QMC5 の prerequisite に QMC4 が含まれているため、ここでは再定義しません。

統計的誤差の言葉として MC1 の

- [Monte Carlo 推定量](../MC1/index.md#def-mc1-monte-carlo-estimator)
- [Monte Carlo 標準誤差](../MC1/index.md#def-mc1-standard-error)

を使います。

本章では QMC5 と同じく底 $b$ を素数とし、桁を

$$
\mathbb F_b
=
\mathbb Z/b\mathbb Z
$$

の元として計算します。

QMC6 の多項式格子は QMC5 型デジタル点集合として表されるため、本章のデジタルシフトとスクランブルをそのまま適用できます。ただし本章の定理自体は一般のデジタル点集合に対して述べるので、QMC6 を direct prerequisite にはしません。

> **停止線**
>
> 本章では一次のデジタルネットをランダム化し、不偏性・分散・反復標準誤差・分散分析との接続までを扱います。滑らかさを複数の非零桁位置で測る高次 Walsh 重みと higher-order digital net は QMC8 へ送ります。

---

## 1. 乱数を足す前に「桁ごとの足し算」を作る

通常の実数加法では桁上がりがあります。

たとえば十進法なら

$$
0.7+0.6=1.3
$$

です。

デジタルネットでは、生成行列も Walsh 関数も各桁を有限体上で扱いました。したがって乱数化も、通常の加法ではなく **各桁を独立に有限体上で加える演算**を使うのが自然です。

$x\in[0,1)$ を QMC5 と同じ約束で

$$
x
=
\sum_{r=1}^\infty x_r b^{-r},
\qquad
x_r\in\{0,\ldots,b-1\}
$$

と書きます。

$b$ 進有理数の二重表現については、入力には「末尾が永久に $b-1$ にならない表現」を使います。桁ごとの演算結果から実数へ戻すとき、二重表現が生じる点は零測度なので、本章の積分・確率の結論には影響しません。

<a id="def-qmc7-digital-addition"></a>
<!-- formal-statement-start -->
### 定義（b 進デジタル加法）

$$
x
=
\sum_{r=1}^{\infty}x_rb^{-r},
\qquad
\delta
=
\sum_{r=1}^{\infty}\delta_rb^{-r}
$$

とする。

各桁について

$$
z_r
=
x_r+\delta_r
\quad\text{in }\mathbb F_b
$$

と置き、

$$
\boxed{
x\oplus\delta
=
\sum_{r=1}^{\infty}z_rb^{-r}
}
$$

を **$b$ 進デジタル加法** と呼ぶ。

多次元では座標ごとに

$$
\boxed{
\boldsymbol x\oplus\boldsymbol\delta
=
(x_1\oplus\delta_1,\ldots,x_s\oplus\delta_s)
}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc7-digital-addition -->
**定義の確認**：底2では XOR になる

$$
x=\frac14=(0.0100\ldots)_2,
\qquad
\delta=\frac34=(0.1100\ldots)_2
$$

とします。

各桁を $\mathbb F_2$ 上で足すと

$$
0+1=1,
\qquad
1+1=0,
\qquad
0+0=0
$$

なので、

$$
x\oplus\delta
=
(0.1000\ldots)_2
=
\boxed{\frac12}.
$$

一方、通常の加法を mod $1$ で見れば

$$
\frac14+\frac34
\equiv0
\pmod1.
$$

したがって

$$
\boxed{
x\oplus\delta
\ne
(x+\delta)\bmod1
}
$$

です。

デジタル加法には桁上がりがありません。
<!-- definition-example-end -->

この違いは単なる記法ではありません。

Walsh 関数は各桁との内積で位相を作るため、デジタル加法に対してきれいな乗法則を持ちます。これが第4節の分散公式につながります。

---

## 2. デジタルシフトで QMC 点集合をランダム化する

決定論的な点集合を

$$
P
=
\{
\boldsymbol x_0,\ldots,\boldsymbol x_{N-1}
\}
\subset[0,1)^s
$$

とします。

一つのランダムなシフト

$$
\boldsymbol\Delta
\sim
\operatorname{Unif}([0,1)^s)
$$

を生成し、**すべての点へ同じ $\boldsymbol\Delta$ をデジタル加法する**のが基本です。

点ごとに別々の乱数を入れないことが重要です。

<a id="def-qmc7-digital-shift-estimator"></a>
<!-- formal-statement-start -->
### 定義（デジタルシフト QMC 推定量）

点集合

$$
P
=
\{
\boldsymbol x_0,\ldots,\boldsymbol x_{N-1}
\}
$$

と一様乱数

$$
\boldsymbol\Delta
\sim
\operatorname{Unif}([0,1)^s)
$$

を取る。

ランダム化点集合を

$$
\boxed{
P\oplus\boldsymbol\Delta
=
\{
\boldsymbol x_n\oplus\boldsymbol\Delta:
0\le n<N
\}
}
$$

とし、可積分関数 $f$ に対し

$$
\boxed{
Q_{\boldsymbol\Delta}(f)
=
\frac1N
\sum_{n=0}^{N-1}
f(
\boldsymbol x_n\oplus\boldsymbol\Delta
)
}
$$

を **デジタルシフト QMC 推定量** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc7-digital-shift-estimator -->
**定義の確認**：底2の2点

一次元の点集合

$$
P
=
\left\{
0,\frac12
\right\}
=
\{
0.000\ldots_2,\,
0.100\ldots_2
\}
$$

を考えます。

たとえばシフトの先頭3桁が

$$
\Delta
=
0.011\ldots_2
$$

なら、

$$
0.000\ldots_2
\oplus
0.011\ldots_2
=
0.011\ldots_2,
$$

$$
0.100\ldots_2
\oplus
0.011\ldots_2
=
0.111\ldots_2.
$$

第一桁は一方が0、他方が1のままです。

つまり各点の位置はランダムになりますが、2点のデジタルな相対配置は壊していません。
<!-- definition-example-end -->

### 2.1 一つ一つの点は一様になる

デジタルシフトで最初に確認すべきことは、

$$
\boldsymbol x_n\oplus\boldsymbol\Delta
$$

が各 $n$ について一様分布になることです。

<a id="thm-qmc7-shift-uniform-unbiased"></a>
<!-- formal-statement-start -->
### 定理（一様デジタルシフトによる各点の一様化と不偏性）

固定した

$$
\boldsymbol x\in[0,1)^s
$$

と

$$
\boldsymbol\Delta
\sim
\operatorname{Unif}([0,1)^s)
$$

に対し、

$$
\boxed{
\boldsymbol x\oplus\boldsymbol\Delta
\sim
\operatorname{Unif}([0,1)^s)
}
$$

が成り立つ。

したがって $f\in L^1([0,1)^s)$ なら、任意の有限点集合 $P$ に対して

$$
\boxed{
E[
Q_{\boldsymbol\Delta}(f)
]
=
\int_{[0,1)^s}
f(\boldsymbol u)\,d\boldsymbol u
}
$$

であり、デジタルシフト QMC 推定量は不偏である。
<!-- formal-statement-end -->

### 証明の見取り図

一様乱数の $b$ 進桁は、有限個だけ見ればすべての桁列が等確率です。

固定した桁 $x_r$ を有限体上で足すことは、

$$
\delta_r
\longmapsto
x_r+\delta_r
$$

という桁集合の置換にすぎません。

したがって任意の有限 prefix の確率が変わらず、一様分布が保たれます。

<!-- proof-start -->
### 証明

まず一次元で示します。

固定した

$$
x
=
0.x_1x_2\cdots
$$

を取ります。

$\Delta$ の最初の $d$ 桁を

$$
(\Delta_1,\ldots,\Delta_d)
$$

とします。

$\Delta\sim\operatorname{Unif}(0,1)$ なので、任意の

$$
(a_1,\ldots,a_d)
\in
\mathbb F_b^d
$$

について

$$
P(
\Delta_1=a_1,\ldots,\Delta_d=a_d
)
=
b^{-d}.
$$

一方、

$$
x\oplus\Delta
$$

の最初の $d$ 桁は

$$
(x_1+\Delta_1,\ldots,x_d+\Delta_d)
$$

です。

写像

$$
(a_1,\ldots,a_d)
\longmapsto
(x_1+a_1,\ldots,x_d+a_d)
$$

は $\mathbb F_b^d$ 上の全単射です。

したがって $x\oplus\Delta$ の任意の長さ $d$ の prefix も確率 $b^{-d}$ で現れます。

これは任意の $b$ 進基本区間

$$
\left[
\frac{a}{b^d},
\frac{a+1}{b^d}
\right)
$$

へ入る確率が長さ $b^{-d}$ に一致することを意味します。

よって

$$
x\oplus\Delta
\sim
\operatorname{Unif}(0,1).
$$

多次元では $\boldsymbol\Delta$ の各座標が独立一様なので、座標ごとの同じ議論から

$$
\boldsymbol x\oplus\boldsymbol\Delta
\sim
\operatorname{Unif}([0,1)^s).
$$

最後に期待値の線形性から

$$
\begin{aligned}
E[
Q_{\boldsymbol\Delta}(f)
]
&=
\frac1N
\sum_{n=0}^{N-1}
E[
f(
\boldsymbol x_n\oplus\boldsymbol\Delta
)
]
\\
&=
\frac1N
\sum_{n=0}^{N-1}
\int_{[0,1)^s}
f(\boldsymbol u)\,d\boldsymbol u
\\
&=
\int_{[0,1)^s}
f(\boldsymbol u)\,d\boldsymbol u.
\end{aligned}
$$
<!-- proof-end -->

ここで **ランダム化された $N$ 点が互いに独立である必要はありません**。

むしろ同じシフトを共有するので、強く依存しています。

不偏性に必要なのは各点の周辺分布が一様であることと期待値の線形性だけです。

---

## 3. デジタルシフトはネット性を壊さない

RQMC で欲しいのは不偏性だけではありません。

各点を独立一様乱数へ置き換えれば、それだけでも不偏です。しかしそれでは QMC4 の $b$ 進箱に対する正確な点数構造が失われます。

デジタルシフトでは、その構造も残ります。

<a id="thm-qmc7-shift-tms-preservation"></a>
<!-- formal-statement-start -->
### 定理（デジタルシフトによる (t,m,s)-ネット性の保存）

底 $b$ の $(t,m,s)$-ネット

$$
P\subset[0,1)^s
$$

を取る。

任意の固定したデジタルシフト

$$
\boldsymbol\delta\in[0,1)^s
$$

に対し、

$$
\boxed{
P\oplus\boldsymbol\delta
}
$$

も底 $b$ の $(t,m,s)$-ネットである。
<!-- formal-statement-end -->

### 証明の見取り図

$(t,m,s)$-ネットの条件は、体積 $b^{t-m}$ の $b$ 進基本区間に正確に $b^t$ 点入ることでした。

デジタルシフトは、各座標の先頭 $d_j$ 桁に同じ桁列を加えるだけです。

したがって一つの $b$ 進基本区間は、同じ形・同じ体積の別の $b$ 進基本区間へ一対一に移ります。

<!-- proof-start -->
### 証明

体積

$$
b^{t-m}
$$

の $b$ 進基本区間

$$
J
=
\prod_{j=1}^s
\left[
\frac{a_j}{b^{d_j}},
\frac{a_j+1}{b^{d_j}}
\right)
$$

を取ります。

ここで

$$
d_1+\cdots+d_s
=
m-t.
$$

$J$ への所属は、第 $j$ 座標の最初の $d_j$ 桁がある固定された桁列

$$
\boldsymbol a_j
\in
\mathbb F_b^{d_j}
$$

に一致することと同値です。

$\boldsymbol x\oplus\boldsymbol\delta\in J$ であるためには、$\boldsymbol x$ の第 $j$ 座標の先頭 $d_j$ 桁が

$$
\boldsymbol a_j
-
\boldsymbol\delta_{j,1:d_j}
$$

に一致すればよいです。

したがって

$$
\boldsymbol x\oplus\boldsymbol\delta\in J
$$

となる $\boldsymbol x$ の集合は、同じ $d_1,\ldots,d_s$ を持つ別の $b$ 進基本区間 $J'$ です。

従って

$$
\#\{
\boldsymbol y\in
P\oplus\boldsymbol\delta:
\boldsymbol y\in J
\}
=
\#\{
\boldsymbol x\in P:
\boldsymbol x\in J'
\}.
$$

$P$ は $(t,m,s)$-ネットなので右辺は

$$
b^t.
$$

よって任意の対象基本区間 $J$ に $b^t$ 点入ります。

したがって

$$
P\oplus\boldsymbol\delta
$$

も $(t,m,s)$-ネットです。
<!-- proof-end -->

### 最小例：2点の $(0,1,1)$-ネット

$$
P
=
\left\{
0,\frac12
\right\}
$$

は底2の $(0,1,1)$-ネットです。

どんなデジタルシフトをしても、二つの点の第一桁は互いに異なります。

したがって

$$
[0,1/2),
\qquad
[1/2,1)
$$

には常に1点ずつ入ります。

**ランダム化したのに、粗い箱の均衡は完全に残っている**わけです。

---

## 4. Walsh 関数はデジタルシフトを掛け算へ変える

デジタル加法を使う最大の理由がここにあります。

通常の Fourier 指数関数が通常加法に対して

$$
e^{2\pi i h(x+\delta)}
=
e^{2\pi i hx}
e^{2\pi i h\delta}
$$

を満たすように、Walsh 関数はデジタル加法に対して同じ役割を果たします。

<a id="thm-qmc7-shift-walsh-character"></a>
<!-- formal-statement-start -->
### 定理（デジタルシフトの Walsh 乗法則）

QMC5 と同じ底 $b$ の Walsh 関数を用いる。

$b$ 進表現の零測度の例外を除き、

$$
\boxed{
\operatorname{wal}_{\boldsymbol k}
(
\boldsymbol x\oplus\boldsymbol\delta
)
=
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\delta)
}
$$

が成り立つ。

特にデジタル点集合 $P$ とその双対ネット $P^\perp$ に対し、

$$
\boxed{
\frac1{|P|}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}
(
\boldsymbol x\oplus\boldsymbol\delta
)
=
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\delta)
1_{\{\boldsymbol k\in P^\perp\}}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

Walsh 関数の指数は

$$
\sum_r \kappa_r x_{r+1}
$$

でした。

デジタル加法では各 $x_{r+1}$ を $x_{r+1}+\delta_{r+1}$ へ置き換えるので、指数が二つの和へ分かれます。

後半は QMC5 の離散直交性を掛けるだけです。

<!-- proof-start -->
### 証明

一次元で

$$
k
=
\sum_{r=0}^{\infty}\kappa_rb^r
$$

とします。

Walsh 関数の定義から

$$
\operatorname{wal}_k(x\oplus\delta)
=
\omega_b^{
\sum_{r=0}^{\infty}
\kappa_r(x_{r+1}+\delta_{r+1})
}.
$$

指数の加法を分けると

$$
=
\omega_b^{
\sum_r\kappa_rx_{r+1}
}
\omega_b^{
\sum_r\kappa_r\delta_{r+1}
}.
$$

従って

$$
\operatorname{wal}_k(x\oplus\delta)
=
\operatorname{wal}_k(x)
\operatorname{wal}_k(\delta).
$$

多次元では座標ごとの積を取ればよいので、

$$
\operatorname{wal}_{\boldsymbol k}
(
\boldsymbol x\oplus\boldsymbol\delta
)
=
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\delta).
$$

よって

$$
\begin{aligned}
\frac1{|P|}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}
(
\boldsymbol x\oplus\boldsymbol\delta
)
&=
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\delta)
\frac1{|P|}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
\\
&=
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\delta)
1_{\{\boldsymbol k\in P^\perp\}},
\end{aligned}
$$

最後に QMC5 の [デジタルネット上の Walsh 関数の離散直交性](../QMC5/index.md#thm-qmc5-digital-character-property) を使いました。
<!-- proof-end -->

この式は重要です。

決定論的 QMC では双対周波数は値 $1$ のまま残りました。

デジタルシフト後は、

$$
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta)
$$

という平均0のランダム位相を伴って残ります。

これにより決定論的誤差が、平均0のランダム誤差へ変わります。

---

## 5. ランダム化誤差の分散を双対ネットから厳密に読む

$f$ が QMC5 の意味で絶対収束 Walsh 級数

$$
f(\boldsymbol x)
=
\sum_{\boldsymbol k\in\mathbb N_0^s}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x),
$$

$$
\sum_{\boldsymbol k}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|
<
\infty
$$

を持つとします。

絶対収束により、有限点平均と級数の交換ができます。

<a id="thm-qmc7-shift-exact-variance"></a>
<!-- formal-statement-start -->
### 定理（デジタルシフト QMC の厳密分散公式）

$P$ をデジタル点集合、$P^\perp$ をその双対ネットとする。

$f$ を実数値関数とし、絶対収束 Walsh 級数を持つとする。

一様デジタルシフト

$$
\boldsymbol\Delta
\sim
\operatorname{Unif}([0,1)^s)
$$

に対して

$$
I(f)
=
\int_{[0,1)^s}
f(\boldsymbol x)\,d\boldsymbol x
$$

と書くと、

$$
\boxed{
Q_{\boldsymbol\Delta}(f)-I(f)
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta)
}
$$

が成り立つ。

さらに

$$
\boxed{
\operatorname{Var}
(
Q_{\boldsymbol\Delta}(f)
)
=
E\left[
\left|
Q_{\boldsymbol\Delta}(f)-I(f)
\right|^2
\right]
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

第4節の Walsh 乗法則と QMC5 の双対ネット消去則を使えば、点平均で残るのは $P^\perp$ の周波数だけです。

その各係数に

$$
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta)
$$

が掛かります。

異なる Walsh 周波数は一様な $\boldsymbol\Delta$ に関して直交するため、二乗平均を取ると交差項がすべて消えます。

<!-- proof-start -->
### 証明

絶対収束から

$$
Q_{\boldsymbol\Delta}(f)
=
\sum_{\boldsymbol k}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\frac1{|P|}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}
(
\boldsymbol x\oplus\boldsymbol\Delta
)
$$

と交換できます。

第4節の定理より

$$
=
\sum_{\boldsymbol k\in P^\perp}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta).
$$

一方、QMC5 の Walsh 積分直交性より

$$
I(f)
=
\widehat f_{\mathrm{wal}}(\boldsymbol0).
$$

従って

$$
Q_{\boldsymbol\Delta}(f)-I(f)
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta).
$$

次に二乗絶対値の期待値を取ります。

絶対収束から係数列は二乗可算和可能でもあるので、有限部分和で計算して極限を取れます。

異なる $\boldsymbol k,\boldsymbol\ell$ に対して

$$
E\left[
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta)
\overline{
\operatorname{wal}_{\boldsymbol\ell}(\boldsymbol\Delta)
}
\right]
=
\begin{cases}
1,&\boldsymbol k=\boldsymbol\ell,\\
0,&\boldsymbol k\ne\boldsymbol\ell.
\end{cases}
$$

です。

これは積を一つの Walsh 指標へまとめ、QMC5 の [Walsh 関数の積分直交性](../QMC5/index.md#thm-qmc5-walsh-integral-orthogonality) を適用したものです。

したがって交差項は消え、

$$
E\left[
\left|
Q_{\boldsymbol\Delta}(f)-I(f)
\right|^2
\right]
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2.
$$

第2節で不偏性を既に示しているので、実数値 $f$ ではこの二乗平均が分散そのものです。
<!-- proof-end -->

### 5.1 最小例：2点が消す周波数と残す周波数

底2で

$$
P
=
\left\{
0,\frac12
\right\}
$$

を取ります。

これは生成行列 $C=(1)$ の1次元デジタル点集合です。

双対条件は周波数 $k$ の最下位ビットが0であることなので、

$$
P^\perp
=
\{0,2,4,6,\ldots\}.
$$

関数

$$
f(x)
=
2
+
3\operatorname{wal}_1(x)
-
2\operatorname{wal}_2(x)
$$

を考えます。

積分値は

$$
I(f)=2.
$$

決定論的点平均では $1\notin P^\perp$、$2\in P^\perp$ なので

$$
Q_P(f)
=
2-2
=
0.
$$

誤差は $-2$ です。

一方、デジタルシフト後は

$$
Q_\Delta(f)-2
=
-2\operatorname{wal}_2(\Delta).
$$

従って

$$
E[Q_\Delta(f)]
=
2,
$$

$$
\operatorname{Var}(Q_\Delta(f))
=
\boxed{4}.
$$

$3\operatorname{wal}_1$ は点集合そのものが完全に消し、$-2\operatorname{wal}_2$ はランダム符号付きで残ります。

つまり RQMC の分散は、

$$
\boxed{
\text{関数全体の分散}
\text{ではなく}
\text{双対ネットに漏れた周波数のエネルギー}
}
$$

を測っています。

### 5.2 「ランダム化したから常に MC より良い」ではない

上の分散公式から分かるのは、双対ネットに入らない周波数が消えることです。

しかし独立一様な $N$ 点による Monte Carlo 推定量の分散は

$$
\frac{\operatorname{Var}(f(U))}{N}
$$

です。

デジタルシフト QMC の分散には単純な $1/N$ が前に付くわけではありません。

したがって、**任意の関数・任意の点集合で RQMC が MC より小分散になる**という主張はしません。

良いデジタル点集合と、Walsh 係数が高周波で減衰する関数が組み合わさると、双対集合に残るエネルギーが小さくなる、というのが正しい機構です。

---

## 6. 一回の乱数化だけでは標準誤差を観測できない

一回のランダム化で

$$
Q_{\boldsymbol\Delta}(f)
$$

を得ても、そこから分散を推定する独立標本はまだありません。

同じランダム化の中にある $N$ 点は独立ではないからです。

そこで **点集合全体のランダム化を独立に複数回行う**という考え方を使います。

<a id="def-qmc7-independent-replicates"></a>
<!-- formal-statement-start -->
### 定義（独立ランダム化反復）

同じ決定論的点集合 $P$ に対し、独立なランダム化

$$
\mathcal R_1,\ldots,\mathcal R_R
$$

を施す。

各反復の QMC 推定値を

$$
Z_r
=
Q_{\mathcal R_r}(f),
\qquad
r=1,\ldots,R
$$

とする。

$$
\boxed{
\overline Z_R
=
\frac1R
\sum_{r=1}^R Z_r
}
$$

を **独立ランダム化反復の平均推定量** と呼ぶ。

さらに $R\ge2$ に対し

$$
\boxed{
S_R^2
=
\frac1{R-1}
\sum_{r=1}^R
(Z_r-\overline Z_R)^2
}
$$

を反復間標本分散とし、

$$
\boxed{
\widehat{\sigma}_{\overline Z}
=
\frac{S_R}{\sqrt R}
}
$$

を反復平均の標準誤差推定値とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc7-independent-replicates -->
**定義の確認**：4回の QMC 反復

4回の独立ランダム化で

$$
Z_1=0.9,\qquad
Z_2=1.1,\qquad
Z_3=1.0,\qquad
Z_4=1.2
$$

を得たとします。

平均は

$$
\overline Z_4
=
\frac{0.9+1.1+1.0+1.2}{4}
=
1.05.
$$

偏差平方和は

$$
(-0.15)^2
+
(0.05)^2
+
(-0.05)^2
+
(0.15)^2
=
0.05.
$$

従って

$$
S_4^2
=
\frac{0.05}{3}
=
\frac1{60},
$$

$$
\widehat{\sigma}_{\overline Z}
=
\sqrt{\frac1{60\cdot4}}
=
\boxed{
\frac1{\sqrt{240}}
}
\approx0.0645.
$$

ここで標本数は「各反復の点数 $N$」ではなく「独立反復数 $R$」です。
<!-- definition-example-end -->

<a id="prop-qmc7-replicate-variance"></a>
<!-- formal-statement-start -->
### 命題（独立ランダム化反復の分散と標本分散）

$Z_1,\ldots,Z_R$ を独立同分布とし、

$$
E[Z_r]=I,
\qquad
\operatorname{Var}(Z_r)=\tau^2<\infty
$$

とする。

このとき

$$
\boxed{
E[\overline Z_R]=I
}
$$

および

$$
\boxed{
\operatorname{Var}(\overline Z_R)
=
\frac{\tau^2}{R}
}
$$

が成り立つ。

さらに

$$
\boxed{
E[S_R^2]
=
\tau^2
}
$$

である。

したがって

$$
\boxed{
\frac{S_R}{\sqrt R}
}
$$

は $\overline Z_R$ の標準誤差

$$
\frac{\tau}{\sqrt R}
$$

を推定する自然な量である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の二式は MC1 の標本平均と同じ計算です。

標本分散については

$$
\sum_r(Z_r-\overline Z_R)^2
=
\sum_r(Z_r-I)^2
-
R(\overline Z_R-I)^2
$$

を使えば、期待値だけで閉じます。

<!-- proof-start -->
### 証明

期待値の線形性から

$$
E[\overline Z_R]
=
\frac1R
\sum_{r=1}^R E[Z_r]
=
I.
$$

独立性から

$$
\operatorname{Var}(\overline Z_R)
=
\frac1{R^2}
\sum_{r=1}^R
\operatorname{Var}(Z_r)
=
\frac{\tau^2}{R}.
$$

次に恒等式

$$
\sum_{r=1}^R
(Z_r-\overline Z_R)^2
=
\sum_{r=1}^R
(Z_r-I)^2
-
R(\overline Z_R-I)^2
$$

を使います。

期待値を取ると

$$
E\left[
\sum_{r=1}^R
(Z_r-I)^2
\right]
=
R\tau^2.
$$

また不偏性より

$$
E[
(\overline Z_R-I)^2
]
=
\operatorname{Var}(\overline Z_R)
=
\frac{\tau^2}{R}.
$$

従って

$$
E\left[
\sum_{r=1}^R
(Z_r-\overline Z_R)^2
\right]
=
R\tau^2-\tau^2
=
(R-1)\tau^2.
$$

両辺を $R-1$ で割れば

$$
E[S_R^2]
=
\tau^2.
$$
<!-- proof-end -->

### 6.1 独立なのは反復どうし

ここは実装時に最も間違えやすいところです。

一つの反復内では

$$
\boldsymbol x_0\oplus\boldsymbol\Delta,
\ldots,
\boldsymbol x_{N-1}\oplus\boldsymbol\Delta
$$

が同じ $\boldsymbol\Delta$ を共有します。

したがって

$$
f(\boldsymbol x_n\oplus\boldsymbol\Delta)
$$

を $N$ 個の独立標本として MC1 の標本分散へ入れてはいけません。

独立標本として扱うのは

$$
Z_1,\ldots,Z_R
$$

という **QMC 点集合全体から得た $R$ 個の推定値**です。

---

## 7. デジタルシフトより細かく桁木を混ぜる

デジタルシフトはすべての点へ同じ桁列を加えます。

したがって元の点どうしのデジタル差はかなり強く保存されます。

より柔軟に乱数化しながら $(t,m,s)$-ネット性を保つ代表的方法が **入れ子一様スクランブル**です。

考え方は、各座標の $b$ 進桁を木として見ることです。

第一桁では $b$ 個の枝を一様ランダムに並べ替えます。

第二桁では、元の第一桁 prefix ごとに別々のランダム置換を使います。

第三桁では、元の最初の2桁 prefix ごとにさらに別々の置換を使います。

<a id="def-qmc7-nested-uniform-scrambling"></a>
<!-- formal-statement-start -->
### 定義（入れ子一様スクランブル）

座標 $j$ の点

$$
x_j
=
0.x_{j,1}x_{j,2}x_{j,3}\cdots
\quad\text{(base $b$)}
$$

を考える。

各

- 座標 $j$
- 桁位置 $r\ge1$
- 元の prefix
  $$
  (a_1,\ldots,a_{r-1})
  \in
  \mathbb F_b^{r-1}
  $$

に対し、$\mathbb F_b$ のランダム置換

$$
\pi_{j,r,a_1,\ldots,a_{r-1}}
$$

を独立に一様選択する。

スクランブル後の桁を

$$
\boxed{
y_{j,r}
=
\pi_{j,r,x_{j,1},\ldots,x_{j,r-1}}
(x_{j,r})
}
$$

とし、

$$
\boxed{
y_j
=
\sum_{r=1}^{\infty}
y_{j,r}b^{-r}
}
$$

と定める。

各座標ごとに用意したランダム置換族を、点集合中のすべての点で共有して変換する操作を **入れ子一様スクランブル** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc7-nested-uniform-scrambling -->
**定義の確認**：底2の一つの桁経路

$$
x
=
0.01000\ldots_2
$$

を考えます。

仮に

- 根で使う置換が $0\leftrightarrow1$
- 元の prefix $0$ の下で使う第二桁の置換が恒等置換
- 元の prefix $01$ の下で使う第三桁の置換が $0\leftrightarrow1$

だったとします。

すると

$$
x_1=0
\longmapsto
y_1=1,
$$

$$
x_2=1
\longmapsto
y_2=1,
$$

$$
x_3=0
\longmapsto
y_3=1.
$$

したがってスクランブル後の先頭3桁は

$$
0.111\ldots_2
$$

です。

重要なのは、第二桁以降の置換が「何桁目か」だけでなく **それ以前の元の prefix** に依存することです。
<!-- definition-example-end -->

### 7.1 各点は一様になる

<a id="thm-qmc7-scramble-uniform-unbiased"></a>
<!-- formal-statement-start -->
### 定理（入れ子一様スクランブルによる各点の一様化と不偏性）

固定した点

$$
\boldsymbol x\in[0,1)^s
$$

へ入れ子一様スクランブルを施した点を

$$
\widetilde{\boldsymbol x}
$$

とする。

このとき

$$
\boxed{
\widetilde{\boldsymbol x}
\sim
\operatorname{Unif}([0,1)^s)
}
$$

である。

したがって可積分関数 $f$ と有限点集合 $P$ に対し、スクランブル後の等重み平均を

$$
Q_{\mathrm{scr}}(f)
$$

と書けば

$$
\boxed{
E[
Q_{\mathrm{scr}}(f)
]
=
I(f)
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

固定点の元の prefix は決まっています。

したがって第 $r$ 桁で実際に使われる置換も、その prefix に対応する一個に決まります。

その置換自体が独立一様に選ばれているので、固定された入力桁の像は $\mathbb F_b$ 上で一様です。

異なる桁位置では異なる独立置換を使うため、出力桁は独立一様になります。

<!-- proof-start -->
### 証明

一次元の固定点

$$
x
=
0.x_1x_2\cdots
$$

を取ります。

第1桁は

$$
Y_1
=
\pi_{1,\varnothing}(x_1)
$$

です。

一様ランダム置換により固定元 $x_1$ の像は $\mathbb F_b$ 上で一様なので、

$$
P(Y_1=a_1)=\frac1b.
$$

第2桁は

$$
Y_2
=
\pi_{2,x_1}(x_2).
$$

ここで使う置換は第1桁で使った置換と独立です。

従って任意の $a_1,a_2$ に対し

$$
P(Y_1=a_1,Y_2=a_2)
=
b^{-2}.
$$

同様に第 $d$ 桁まで進めると、各段階で新しい独立一様置換を使うので

$$
P(
Y_1=a_1,\ldots,Y_d=a_d
)
=
b^{-d}.
$$

よってスクランブル後の点は一次元一様分布です。

多次元では座標ごとの置換族も独立に選ぶため、直方体 cylinder の確率が体積に一致し、

$$
\widetilde{\boldsymbol x}
\sim
\operatorname{Unif}([0,1)^s).
$$

最後に点ごとの一様性と期待値の線形性から

$$
E[
Q_{\mathrm{scr}}(f)
]
=
I(f).
$$
<!-- proof-end -->

### 7.2 ネット性も保存する

<a id="thm-qmc7-scramble-tms-preservation"></a>
<!-- formal-statement-start -->
### 定理（入れ子一様スクランブルによる (t,m,s)-ネット性の保存）

$P$ を底 $b$ の $(t,m,s)$-ネットとする。

入れ子一様スクランブルの任意の実現に対して、スクランブル後の点集合

$$
\widetilde P
$$

も

$$
\boxed{
(t,m,s)\text{-ネット}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

各座標で、長さ $d$ の元の prefix から長さ $d$ の出力 prefix への写像を考えます。

第一桁の置換は全単射です。

同じ第一桁を持つ枝の中では第二桁の置換も全単射です。

これを繰り返すため、長さ $d$ の桁語全体に対しても全単射になります。

したがって一つの出力 $b$ 進基本区間の逆像は、同じ桁深さを持つ一つの入力基本区間です。

<!-- proof-start -->
### 証明

まず一つの座標を固定し、長さ $d$ の桁語

$$
(a_1,\ldots,a_d)
\in
\mathbb F_b^d
$$

がスクランブルによってどの出力語へ写るかを考えます。

$d=1$ では一個の置換なので全単射です。

長さ $d-1$ まで全単射だとします。

ある入力 prefix

$$
(a_1,\ldots,a_{d-1})
$$

の下では、第 $d$ 桁に使う

$$
\pi_{d,a_1,\ldots,a_{d-1}}
$$

が $\mathbb F_b$ の置換です。

したがって、その親 prefix の $b$ 個の子は、対応する出力親 prefix の $b$ 個の子へ全単射に写ります。

親 prefix 自体も帰納法で全単射に対応しているため、長さ $d$ の桁語全体でも全単射です。

よって各座標 $j$ について、先頭 $d_j$ 桁で指定される出力区間の逆像は、先頭 $d_j$ 桁で指定される一つの入力区間です。

したがって

$$
J
=
\prod_{j=1}^s
\left[
\frac{c_j}{b^{d_j}},
\frac{c_j+1}{b^{d_j}}
\right)
$$

という出力基本区間の逆像は、同じ $d_1,\ldots,d_s$ を持つ入力基本区間 $J'$ です。

体積 $b^{t-m}$ なら

$$
d_1+\cdots+d_s=m-t.
$$

$P$ が $(t,m,s)$-ネットなので

$$
\#(P\cap J')
=
b^t.
$$

スクランブルは点を一対一に $J'$ から $J$ へ送るので

$$
\#(\widetilde P\cap J)
=
b^t.
$$

従って $\widetilde P$ も $(t,m,s)$-ネットです。
<!-- proof-end -->

### デジタルシフトとの関係

デジタルシフトは、各桁で

$$
c
\longmapsto
c+\delta_r
$$

という置換を使い、しかもその置換が prefix に依存しない特別な場合だと見なせます。

入れ子一様スクランブルでは prefix ごとに異なる置換を許すため、点集合の細部をより強く混ぜます。

ただし、

$$
\boxed{
\text{scrambling が任意の関数で digital shift より必ず小分散}
}
$$

とは本章では主張しません。

比較には関数の滑らかさと点集合の構造が必要です。

---

## 8. ランダム化の設計で何を保つべきか

ここまでの二つの方法を並べます。

| 方法 | 各点の周辺分布 | $(t,m,s)$-ネット性 | 点間独立性 | Walsh 解析 |
|---|---|---|---|---|
| デジタルシフト | 一様 | 保存 | ない | 厳密分散公式が非常に直接的 |
| 入れ子一様スクランブル | 一様 | 保存 | ない | より細かな桁混合を行う |
| 各点を独立一様に置換 | 一様 | 通常は失う | ある | 元の双対構造を失う |

RQMC の本質は「乱数を使うこと」ではありません。

$$
\boxed{
\text{一様な周辺分布}
+
\text{QMC の点集合構造}
}
$$

を同時に保つよう、**依存構造を設計すること**です。

この見方は、確率的数値法でも独立性そのものを目的にするのではなく、推定量に有利な依存構造を設計する場面があることともつながっています。

---

## 9. 関数を「どの座標が効いているか」で分解する

高次元積分では、変数が $s$ 個あること自体より、

- 一変数の主効果が大きいのか
- 二変数相互作用が大きいのか
- 多数の変数が同時に絡む成分が大きいのか

が QMC の効き方に重要です。

これを整理するのが **関数的分散分析分解**です。

$S=\{1,\ldots,s\}$ とします。

$u\subseteq S$ に対して、$x_u$ は $u$ に属する座標だけを集めたものとします。

また

$$
P_uf(x_u)
=
\int_{[0,1)^{S\setminus u}}
f(\boldsymbol x)\,
d\boldsymbol x_{S\setminus u}
$$

と置きます。

<a id="def-qmc7-functional-anova"></a>
<!-- formal-statement-start -->
### 定義（関数的分散分析成分）

$f\in L^2([0,1)^s)$ とする。

空集合成分を

$$
\boxed{
f_\varnothing
=
I(f)
}
$$

と定める。

非空集合

$$
u\subseteq S
$$

に対して帰納的に

$$
\boxed{
f_u(x_u)
=
P_uf(x_u)
-
\sum_{v\subsetneq u}
f_v(x_v)
}
$$

と定める。

この $f_u$ を $u$ に対応する **関数的分散分析成分** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc7-functional-anova -->
**定義の確認**：二変数の主効果と相互作用

$$
a=x_1-\frac12,
\qquad
b=x_2-\frac12
$$

と置き、

$$
f(x_1,x_2)
=
1+a+2b+3ab
$$

を考えます。

$$
\int_0^1 a\,dx_1=0,
\qquad
\int_0^1 b\,dx_2=0
$$

なので

$$
f_\varnothing
=
1.
$$

$x_2$ を積分すると

$$
P_{\{1\}}f
=
1+a
$$

だから

$$
f_{\{1\}}
=
a.
$$

同様に

$$
f_{\{2\}}
=
2b.
$$

最後に

$$
f_{\{1,2\}}
=
f-f_\varnothing-f_{\{1\}}-f_{\{2\}}
=
3ab.
$$

従って

$$
\boxed{
f
=
1
+
\left(x_1-\frac12\right)
+
2\left(x_2-\frac12\right)
+
3\left(x_1-\frac12\right)
\left(x_2-\frac12\right)
}
$$

がそのまま 分散分析 分解になっています。
<!-- definition-example-end -->

<a id="thm-qmc7-functional-anova-orthogonality"></a>
<!-- formal-statement-start -->
### 定理（関数的分散分析分解の直交性と分散分解）

$f\in L^2([0,1)^s)$ とし、上の 分散分析成分 $f_u$ を取る。

このとき

$$
\boxed{
f
=
\sum_{u\subseteq S}
f_u
}
$$

が $L^2$ で成り立つ。

さらに非空 $u$ と $j\in u$ に対し

$$
\boxed{
\int_0^1
f_u(x_u)\,dx_j
=
0
}
$$

がほとんど至る所で成り立つ。

したがって $u\ne v$ なら

$$
\boxed{
\langle f_u,f_v\rangle_{L^2}
=
0
}
$$

である。

特に

$$
\sigma_u^2
:=
\|f_u\|_{L^2}^2
\qquad
(u\ne\varnothing)
$$

と置けば、

$$
\boxed{
\operatorname{Var}(f(U))
=
\sum_{\varnothing\ne u\subseteq S}
\sigma_u^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

定義は部分集合上の Möbius 反転になっています。

$u=S$ の式を整理すれば全成分の和が $f$ になります。

各 $f_u$ を active coordinate の一つで積分すると、その座標を含まない低次成分との差がちょうど打ち消し合います。

直交性では $u\ne v$ から $j\in u\setminus v$ を一つ取り、$f_v$ が $x_j$ に依存しないことを使います。

<!-- proof-start -->
### 証明

まず定義を

$$
P_uf
=
\sum_{v\subseteq u}
f_v
$$

と書き直します。

$u=S$ なら

$$
P_Sf=f
$$

なので

$$
f
=
\sum_{v\subseteq S}
f_v.
$$

次に非空 $u$ と $j\in u$ を取ります。

定義から

$$
f_u
=
P_uf
-
\sum_{v\subsetneq u}f_v.
$$

$x_j$ で積分します。

$P_uf$ を $x_j$ でさらに積分すると

$$
P_{u\setminus\{j\}}f
$$

になります。

一方、$v\subsetneq u$ の成分を分けます。

$j\notin v$ なら $f_v$ は $x_j$ に依存しないので、そのまま $f_v$ が残ります。

$j\in v$ なら、$|v|<|u|$ に関する帰納法により

$$
\int_0^1f_v\,dx_j=0.
$$

従って

$$
\int_0^1f_u\,dx_j
=
P_{u\setminus\{j\}}f
-
\sum_{v\subseteq u\setminus\{j\}}
f_v.
$$

しかし

$$
P_{u\setminus\{j\}}f
=
\sum_{v\subseteq u\setminus\{j\}}
f_v
$$

なので差は0です。

基底 $|u|=1$ では

$$
f_{\{j\}}
=
P_{\{j\}}f-I(f)
$$

であり、$x_j$ を積分すると0なので帰納法が始まります。

次に $u\ne v$ とします。

どちらか一方にだけ属する座標があるので、一般性を失わず

$$
j\in u\setminus v
$$

とします。

$f_v$ は $x_j$ に依存しません。

Fubini の定理で $x_j$ を先に積分すると

$$
\langle f_u,f_v\rangle
=
\int
f_v(x_v)
\left[
\int_0^1f_u(x_u)\,dx_j
\right]
d\boldsymbol x_{-j}
=
0.
$$

従って異なる 分散分析成分は直交します。

最後に

$$
f-I(f)
=
\sum_{u\ne\varnothing}f_u
$$

なので Pythagoras の定理から

$$
\|f-I(f)\|_2^2
=
\sum_{u\ne\varnothing}
\|f_u\|_2^2.
$$

左辺は

$$
\operatorname{Var}(f(U))
$$

です。
<!-- proof-end -->

### 9.1 二変数例の分散成分

先ほどの

$$
f
=
1+a+2b+3ab
$$

では

$$
E[a^2]
=
E[b^2]
=
\frac1{12}.
$$

従って

$$
\sigma_{\{1\}}^2
=
\frac1{12},
$$

$$
\sigma_{\{2\}}^2
=
4\cdot\frac1{12}
=
\frac13,
$$

$$
\sigma_{\{1,2\}}^2
=
9\cdot
\frac1{12^2}
=
\frac1{16}.
$$

合計は

$$
\boxed{
\operatorname{Var}(f(U))
=
\frac1{12}
+
\frac13
+
\frac1{16}
=
\frac{23}{48}
}.
$$

「二次元関数だから二変数相互作用が支配的」とは限りません。

この例では第二座標の主効果が最も大きいことが、分散分析 分解から直接見えます。

---

## 10. 分散分析と Walsh 周波数の支持を対応させる

Walsh 周波数

$$
\boldsymbol k
=
(k_1,\ldots,k_s)
$$

に対し、

$$
\boxed{
\operatorname{supp}(\boldsymbol k)
=
\{
j:
k_j\ne0
\}
}
$$

と定めます。

分散分析成分 $f_u$ は $x_u$ だけに依存し、さらに各 active coordinate $j\in u$ について平均0です。

したがって Walsh 係数も、ちょうど同じ座標集合を active にする周波数にしか現れません。

具体的には、

- $j\notin u$ なのに $k_j\ne0$ なら、$f_u$ は $x_j$ に依存しないので Walsh 関数の積分が0になる
- $j\in u$ なのに $k_j=0$ なら、$f_u$ を $x_j$ で積分した値が0になる

ためです。

従って $f_u$ の Walsh 周波数は

$$
\operatorname{supp}(\boldsymbol k)=u
$$

に限られます。

<a id="cor-qmc7-digital-shift-anova-variance"></a>
<!-- formal-statement-start -->
### 系（デジタルシフト分散の座標支持分解）

QMC7 の [デジタルシフト QMC の厳密分散公式](#thm-qmc7-shift-exact-variance) の仮定を満たす $f$ を取り、その 分散分析成分を $f_u$ とする。

このとき

$$
\boxed{
\operatorname{Var}
(
Q_{\boldsymbol\Delta}(f)
)
=
\sum_{\varnothing\ne u\subseteq S}
\;
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\operatorname{supp}(\boldsymbol k)=u
}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2
}
$$

である。

また

$$
\boxed{
\sigma_u^2
=
\sum_{\operatorname{supp}(\boldsymbol k)=u}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2
}
$$

なので、各 $u$ について RQMC 分散へ寄与するのは、その 分散分析成分の Walsh エネルギーのうち双対ネットに残った部分だけである。
<!-- formal-statement-end -->

### 証明の見取り図

第5節の分散公式を周波数の支持 $u$ ごとに単に分割します。

分散分析成分と Walsh 支持の対応により、そのグループ全体のエネルギーが $\sigma_u^2$ です。

<!-- proof-start -->
### 証明

第5節から

$$
\operatorname{Var}
(
Q_{\boldsymbol\Delta}(f)
)
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2.
$$

任意の非零 $\boldsymbol k$ は一意な非空支持

$$
u
=
\operatorname{supp}(\boldsymbol k)
$$

を持つので、和を支持ごとに分割すれば第一式を得ます。

次に 分散分析の直交分解から $f_u$ の Walsh 係数は

$$
\operatorname{supp}(\boldsymbol k)=u
$$

の場合にしか非零になりません。

絶対収束 Walsh 級数は $L^2$ でも収束し、Walsh 関数の直交性により有限部分和のノルム平方は係数絶対値平方和です。

極限を取れば

$$
\|f_u\|_2^2
=
\sum_{\operatorname{supp}(\boldsymbol k)=u}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2.
$$

左辺が $\sigma_u^2$ なので第二式が得られます。
<!-- proof-end -->

この系は高次元 QMC の見方を変えます。

大事なのは単に

$$
s=100
$$

のような名目上の次元ではありません。

もし大部分の分散が

- 小さい座標集合 $u$
- 低次数の相互作用

に集中しており、点集合がそれらの重要な Walsh 周波数を双対ネットから追い出していれば、ランダム化分散は小さくなります。

これが QMC2 の重み付き空間・実効次元の考え方とも接続します。

---

## 11. 実際の RQMC 誤差評価の手順

一回の計算で使う点数を $N$、独立ランダム化反復数を $R$ とします。

実務的な最小手順は次です。

1. 一つの決定論的デジタル点集合 $P_N$ を作る。
2. 独立な乱数化 $\mathcal R_1,\ldots,\mathcal R_R$ を作る。
3. 各反復で
   $$
   Z_r
   =
   \frac1N
   \sum_{\boldsymbol x\in\mathcal R_r(P_N)}
   f(\boldsymbol x)
   $$
   を計算する。
4. 最終推定値を
   $$
   \overline Z_R
   =
   \frac1R\sum_rZ_r
   $$
   とする。
5. 反復間標本分散
   $$
   S_R^2
   =
   \frac1{R-1}
   \sum_r
   (Z_r-\overline Z_R)^2
   $$
   を計算する。
6. 標準誤差推定値を
   $$
   S_R/\sqrt R
   $$
   とする。

総関数評価回数は

$$
RN
$$

です。

同じ総費用でも $N$ と $R$ の配分には役割の違いがあります。

- $N$ を増やす：一つの QMC 点集合の近似構造を細かくする
- $R$ を増やす：分散推定と反復平均を安定させる

本章では最適配分の一般論までは扱いません。

### 11.1 近似信頼区間について

$Z_r$ が独立同分布・有限分散なら、$R\to\infty$ に対して MC1 と同じ中心極限定理を反復値 $Z_r$ に適用できます。

したがって十分大きな $R$ では

$$
\overline Z_R
\pm
z_{1-\alpha/2}
\frac{S_R}{\sqrt R}
$$

型の区間が漸近的な目安になります。

ただし $R$ が非常に小さいとき、正規近似を機械的に信用してはいけません。

RQMC で統計的誤差評価を取り戻せることと、少数反復でも正確な信頼区間が自動的に得られることは別です。

---

## 12. 失敗例：乱数を入れれば何でも RQMC ではない

### 12.1 各点を独立に置き換える

元のデジタルネットの各点を無視し、

$$
U_1,\ldots,U_N
\stackrel{\mathrm{iid}}{\sim}
\operatorname{Unif}([0,1)^s)
$$

へ置き換えれば不偏推定量は作れます。

しかしこれは通常の Monte Carlo 法です。

$(t,m,s)$-ネットの各 $b$ 進箱の点数はランダムに揺れ、双対ネットの厳密な周波数消去も失われます。

失ったものは「不偏性」ではなく **点集合全体の構造**です。

### 12.2 シフトを有限 $m$ 桁だけにする

$m$ 桁のデジタルネットだからといって、シフトも最初の $m$ 桁だけランダム化し、その後を0で固定すると、各点は有限格子上にしか動きません。

その周辺分布は連続一様分布ではありません。

したがって一般の $f$ に対して

$$
E[
f(\boldsymbol x\oplus\boldsymbol\Delta)
]
=
I(f)
$$

は保証されません。

**連続積分に対する厳密な不偏性には、無限桁の一様シフト、またはそれと同値な連続一様化が必要**です。

### 12.3 同じシフトを「複数反復」と数える

同じ $\boldsymbol\Delta$ で何度計算しても

$$
Z_1=\cdots=Z_R
$$

です。

反復間標本分散は0になりますが、真のランダム化分散が0になったわけではありません。

誤差推定には **独立な乱数化**が必要です。

### 12.4 各点を別々にスクランブルする

入れ子一様スクランブルの置換族は、点集合全体で共有します。

各点ごとに別の置換族を使うと各点は一様ですが、同じ prefix を持つ点どうしが同じ桁木変換を受けなくなります。

その結果、$(t,m,s)$-ネット性を保つ証明の「prefix 写像が一つの全単射になる」という機構が壊れます。

---

## 13. 演習

### 演習 QMC7-A1

- Level: A
- 主題: $b$ 進デジタル加法
- 使用技術: 桁ごとの有限体加法
- 計算量: 小

底2で

$$
x=(0.10110\ldots)_2,
\qquad
\delta=(0.01101\ldots)_2
$$

とする。

1. $x\oplus\delta$ の先頭5桁を求めよ。
2. 通常の加法 $x+\delta$ の先頭部分と異なる理由を説明せよ。
3. $(x\oplus\delta)\oplus\delta=x$ が成り立つことを、この例と $\mathbb F_2$ の性質から説明せよ。

<!-- solution-start -->
### 詳細解答

各桁を $\mathbb F_2$ 上で足します。

先頭5桁は

$$
\begin{array}{c|ccccc}
&1&2&3&4&5\\
\hline
x&1&0&1&1&0\\
\delta&0&1&1&0&1\\
x+\delta\text{ in }\mathbb F_2
&1&1&0&1&1
\end{array}
$$

です。

従って

$$
\boxed{
x\oplus\delta
=
(0.11011\ldots)_2
}.
$$

通常の実数加法では、ある桁で

$$
1+1=10_2
$$

となると次の桁へ繰上がりが発生します。

デジタル加法では

$$
1+1=0
\quad\text{in }\mathbb F_2
$$

として、その桁だけで計算を閉じます。

したがって二つの演算は一般に一致しません。

最後に $\mathbb F_2$ では任意の桁 $a$ に対し

$$
a+\delta+\delta
=
a
$$

です。

なぜなら

$$
\delta+\delta=0
$$

だからです。

従って各桁で二回同じシフトを加えると元へ戻り、

$$
\boxed{
(x\oplus\delta)\oplus\delta=x
}
$$

となります。
<!-- solution-end -->

### 演習 QMC7-A2

- Level: A
- 主題: デジタルシフトの不偏性
- 使用技術: 各点の一様性・期待値の線形性
- 計算量: 小

一次元で

$$
P
=
\left\{
0,\frac12
\right\}
$$

とし、

$$
f(x)=x
$$

とする。

一様デジタルシフト $\Delta$ に対し

$$
Q_\Delta(f)
=
\frac12
\left[
f(0\oplus\Delta)
+
f\left(\frac12\oplus\Delta\right)
\right]
$$

とする。

1. 各項の期待値を求めよ。
2. $E[Q_\Delta(f)]$ を求めよ。
3. 二つの項が独立でなくても不偏性に問題がない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

定理より、固定点 $x$ に対して

$$
x\oplus\Delta
\sim
\operatorname{Unif}(0,1)
$$

です。

従って

$$
E[f(0\oplus\Delta)]
=
\int_0^1x\,dx
=
\frac12.
$$

同様に

$$
E\left[
f\left(
\frac12\oplus\Delta
\right)
\right]
=
\frac12.
$$

期待値の線形性から

$$
\begin{aligned}
E[Q_\Delta(f)]
&=
\frac12
\left(
\frac12+\frac12
\right)
\\
&=
\boxed{\frac12}.
\end{aligned}
$$

これは真の積分

$$
I(f)
=
\int_0^1x\,dx
=
\frac12
$$

と一致します。

二つの点は同じ $\Delta$ を共有するので独立ではありません。

しかし不偏性の計算では

$$
E[X+Y]=E[X]+E[Y]
$$

だけを使っており、独立性を使っていません。

従って点間依存は不偏性を壊しません。
<!-- solution-end -->

### 演習 QMC7-A3

- Level: A
- 主題: Walsh 周波数から分散を読む
- 使用技術: 双対ネット・デジタルシフト分散公式
- 計算量: 小

底2で

$$
P
=
\left\{
0,\frac12
\right\}
$$

とする。

この点集合の双対ネットは

$$
P^\perp
=
\{0,2,4,\ldots\}
$$

である。

$$
f(x)
=
2
+
3\operatorname{wal}_1(x)
-
2\operatorname{wal}_2(x)
$$

について、

1. $I(f)$ を求めよ。
2. 決定論的点平均 $Q_P(f)$ を求めよ。
3. $Q_\Delta(f)-I(f)$ を求めよ。
4. $\operatorname{Var}(Q_\Delta(f))$ を求めよ。

<!-- solution-start -->
### 詳細解答

非零 Walsh 周波数の積分は0なので

$$
\boxed{
I(f)=2
}.
$$

決定論的点平均では、双対に属する周波数だけが残ります。

$$
1\notin P^\perp,
\qquad
2\in P^\perp
$$

なので

$$
Q_P(f)
=
2+0-2
=
\boxed{0}.
$$

デジタルシフト後は双対周波数 $2$ にランダム位相が掛かるため

$$
Q_\Delta(f)
=
2
-
2\operatorname{wal}_2(\Delta).
$$

従って

$$
\boxed{
Q_\Delta(f)-I(f)
=
-2\operatorname{wal}_2(\Delta)
}.
$$

$|\operatorname{wal}_2|=1$ で平均0なので

$$
\operatorname{Var}(Q_\Delta(f))
=
|-2|^2
=
\boxed{4}.
$$

係数 $3$ の周波数1は大きいですが、点集合が完全に消しているため RQMC 分散へ寄与しません。
<!-- solution-end -->

### 演習 QMC7-A4

- Level: A
- 主題: 独立ランダム化反復
- 使用技術: 標本平均・標本分散・標準誤差
- 計算量: 小

4回の独立 RQMC 反復から

$$
Z_1=9,\qquad
Z_2=11,\qquad
Z_3=10,\qquad
Z_4=14
$$

を得た。

1. $\overline Z_4$ を求めよ。
2. 反復間標本分散 $S_4^2$ を求めよ。
3. $\widehat{\sigma}_{\overline Z}$ を求めよ。
4. 各反復が $N=1024$ 点を使っていたとしても、標準誤差の分母に直接 $\sqrt{1024}$ を使わない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

平均は

$$
\overline Z_4
=
\frac{9+11+10+14}{4}
=
\boxed{11}.
$$

偏差は

$$
-2,\quad0,\quad-1,\quad3
$$

なので偏差平方和は

$$
4+0+1+9
=
14.
$$

従って

$$
\boxed{
S_4^2
=
\frac{14}{3}
}.
$$

標準誤差推定値は

$$
\widehat{\sigma}_{\overline Z}
=
\frac{S_4}{2}
=
\boxed{
\sqrt{\frac7{6}}
}.
$$

各反復内の1024点は、同じデジタルシフトや同じスクランブル置換族を共有しています。

したがって1024個の関数値は独立同分布標本ではありません。

この標準誤差計算で独立なのは

$$
Z_1,\ldots,Z_4
$$

という4個の **反復値**です。

よって MC1 の標本平均公式を適用する標本数は $R=4$ です。
<!-- solution-end -->

### 演習 QMC7-B1

- Level: B
- 主題: デジタルシフトによるネット性保存
- 使用技術: 2進 prefix・$(0,2,2)$-ネット
- 計算量: 中

QMC6 の4点

$$
P
=
\left\{
(0,0),
\left(\frac14,\frac34\right),
\left(\frac34,\frac12\right),
\left(\frac12,\frac14\right)
\right\}
$$

を考える。

各座標の先頭2桁で書けば

$$
(00,00),\quad
(01,11),\quad
(11,10),\quad
(10,01)
$$

である。

デジタルシフトの先頭2桁を

$$
\boldsymbol\delta
=
(01,10)
$$

とする。

1. シフト後4点の先頭2桁を求めよ。
2. 第一座標だけを4等分した各幅 $1/4$ 区間に1点ずつ入ることを確認せよ。
3. 第二座標についても同様に確認せよ。
4. 四つの $1/2\times1/2$ 象限にも1点ずつ入ることを確認し、$(0,2,2)$-ネット条件との関係を説明せよ。

<!-- solution-start -->
### 詳細解答

各座標で XOR を取ります。

$$
(00,00)\oplus(01,10)
=
(01,10),
$$

$$
(01,11)\oplus(01,10)
=
(00,01),
$$

$$
(11,10)\oplus(01,10)
=
(10,00),
$$

$$
(10,01)\oplus(01,10)
=
(11,11).
$$

従ってシフト後は

$$
\boxed{
(01,10),\quad
(00,01),\quad
(10,00),\quad
(11,11)
}.
$$

第一座標の2桁は

$$
01,\quad00,\quad10,\quad11
$$

であり、4種類が一度ずつ現れます。

したがって

$$
[0,1/4),\ 
[1/4,1/2),\ 
[1/2,3/4),\ 
[3/4,1)
$$

に1点ずつ入ります。

第二座標も

$$
10,\quad01,\quad00,\quad11
$$

で4種類が一度ずつ現れるため、幅 $1/4$ の各区間に1点ずつ入ります。

最後に第一桁だけを見ると、

$$
(0,1),\quad
(0,0),\quad
(1,0),\quad
(1,1)
$$

です。

従って四つの $1/2\times1/2$ 象限に1点ずつ入ります。

底2、$m=2$、$t=0$、$s=2$ では対象となる基本区間は

$$
d_1+d_2=2
$$

を満たします。

可能性は

$$
(d_1,d_2)
=
(2,0),(1,1),(0,2)
$$

です。

上の三つの確認がそれぞれこの3型を覆っているので、シフト後も $(0,2,2)$-ネットであることが直接確認できました。
<!-- solution-end -->

### 演習 QMC7-B2

- Level: B
- 主題: 入れ子一様スクランブルの prefix 全単射
- 使用技術: 帰納法・桁木
- 計算量: 中

底 $b$ の入れ子一様スクランブルについて、固定した一つの座標を考える。

1. 長さ1の入力桁語から出力桁語への写像が全単射であることを示せ。
2. 長さ $d-1$ で全単射だと仮定し、長さ $d$ でも全単射であることを示せ。
3. この結果から、深さ $d$ の任意の $b$ 進区間の逆像が深さ $d$ の一つの $b$ 進区間になることを説明せよ。
4. 各点を別々の独立置換族でスクランブルすると、この議論のどこが使えなくなるか説明せよ。

<!-- solution-start -->
### 詳細解答

長さ1では

$$
a_1
\longmapsto
\pi_{1,\varnothing}(a_1)
$$

です。

$\pi_{1,\varnothing}$ は $\mathbb F_b$ の置換なので全単射です。

次に長さ $d-1$ の桁語が出力 prefix へ全単射に対応すると仮定します。

一つの入力親 prefix

$$
(a_1,\ldots,a_{d-1})
$$

を固定します。

その下の $b$ 個の子

$$
(a_1,\ldots,a_{d-1},c),
\qquad
c\in\mathbb F_b
$$

は、第 $d$ 桁の置換

$$
\pi_{d,a_1,\ldots,a_{d-1}}
$$

によって、対応する出力親 prefix の $b$ 個の子へ全単射に写ります。

異なる入力親 prefix は帰納法の仮定により異なる出力親 prefix へ写るので、子集合どうしも混同されません。

従って長さ $d$ 全体でも全単射です。

深さ $d$ の $b$ 進区間は、先頭 $d$ 桁を一つ固定した集合です。

出力桁語への写像が全単射なので、一つの出力桁語には一つの入力桁語だけが対応します。

したがって出力区間の逆像は一つの入力区間です。

最後に各点ごとに別の置換族を使うと、同じ入力 prefix でも点によって別の出力 prefix へ写ります。

すると「区間 $J$ の逆像は点集合全体に対して一つの共通区間 $J'$ である」と言えません。

$(t,m,s)$-ネットの点数条件を一つの入力区間へ戻す証明が壊れます。
<!-- solution-end -->

### 演習 QMC7-B3

- Level: B
- 主題: 関数的分散分析分解
- 使用技術: 座標積分・直交分散分解
- 計算量: 中

$$
f(x_1,x_2)
=
x_1x_2,
\qquad
(x_1,x_2)\in[0,1)^2
$$

とする。

1. $f_\varnothing$ を求めよ。
2. $f_{\{1\}}$、$f_{\{2\}}$ を求めよ。
3. $f_{\{1,2\}}$ を求めよ。
4. 各非定数成分の分散 $\sigma_u^2$ を求めよ。
5. 和が $\operatorname{Var}(X_1X_2)$ と一致することを直接確認せよ。ただし $X_1,X_2$ は独立な $\operatorname{Unif}(0,1)$ とする。

<!-- solution-start -->
### 詳細解答

まず

$$
f_\varnothing
=
\int_0^1\int_0^1x_1x_2\,dx_1dx_2
=
\frac14.
$$

次に $x_2$ を積分すると

$$
P_{\{1\}}f
=
x_1\int_0^1x_2\,dx_2
=
\frac{x_1}{2}.
$$

従って

$$
f_{\{1\}}
=
\frac{x_1}{2}
-
\frac14
=
\boxed{
\frac12
\left(
x_1-\frac12
\right)
}.
$$

同様に

$$
\boxed{
f_{\{2\}}
=
\frac12
\left(
x_2-\frac12
\right)
}.
$$

相互作用成分は

$$
f_{\{1,2\}}
=
x_1x_2
-
\frac14
-
\frac12\left(x_1-\frac12\right)
-
\frac12\left(x_2-\frac12\right).
$$

整理すると

$$
\boxed{
f_{\{1,2\}}
=
\left(x_1-\frac12\right)
\left(x_2-\frac12\right)
}.
$$

一様分布について

$$
E\left[
\left(X-\frac12\right)^2
\right]
=
\frac1{12}.
$$

したがって

$$
\sigma_{\{1\}}^2
=
\frac14\cdot\frac1{12}
=
\boxed{\frac1{48}},
$$

$$
\sigma_{\{2\}}^2
=
\boxed{\frac1{48}},
$$

独立性から

$$
\sigma_{\{1,2\}}^2
=
\frac1{12}\cdot\frac1{12}
=
\boxed{\frac1{144}}.
$$

合計は

$$
\frac1{48}
+
\frac1{48}
+
\frac1{144}
=
\frac3{144}
+
\frac3{144}
+
\frac1{144}
=
\boxed{\frac7{144}}.
$$

直接計算すると

$$
E[X_1X_2]
=
\frac14,
$$

$$
E[X_1^2X_2^2]
=
E[X_1^2]E[X_2^2]
=
\frac13\cdot\frac13
=
\frac19.
$$

従って

$$
\operatorname{Var}(X_1X_2)
=
\frac19-\frac1{16}
=
\frac{16-9}{144}
=
\boxed{\frac7{144}}.
$$

分散分析の分散成分の和と一致しました。
<!-- solution-end -->

### 演習 QMC7-C1

- Level: C
- 主題: RQMC の周波数誤差と反復標準誤差の統合
- 使用技術: 双対ネット・Walsh 分散・独立反復
- 計算量: 大

底2の

$$
P
=
\left\{
0,\frac12
\right\}
$$

を用い、

$$
f(x)
=
5
+
4\operatorname{wal}_1(x)
+
2\operatorname{wal}_2(x)
+
3\operatorname{wal}_4(x)
$$

を積分する。

この点集合では

$$
P^\perp
=
\{0,2,4,6,\ldots\}
$$

である。

1. 真の積分値 $I(f)$ と決定論的 QMC 値 $Q_P(f)$ を求めよ。
2. 一回の一様デジタルシフトに対する誤差を
   $$
   Q_\Delta(f)-I(f)
   $$
   の形で書け。
3. 一回の RQMC 推定値の理論分散を求めよ。
4. 4回の独立シフトで、誤差に関係する第2・第3桁がそれぞれ
   $$
   (0,0),\quad
   (1,0),\quad
   (0,1),\quad
   (1,1)
   $$
   だったとする。4個の推定値 $Z_1,\ldots,Z_4$ を求めよ。
5. $\overline Z_4$、$S_4^2$、$\widehat{\sigma}_{\overline Z}$ を求めよ。
6. 理論上の $\sigma_{\overline Z_4}$ と標本からの推定値を比較せよ。
7. 周波数1の係数4が最も大きいにもかかわらず RQMC 分散へ寄与しない理由を説明せよ。
8. この4回の反復内にある合計8点を 独立同分布8標本として標本分散を作ってはいけない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

非零 Walsh 関数の積分は0なので

$$
\boxed{
I(f)=5
}.
$$

決定論的点平均では双対周波数だけが残ります。

$$
1\notin P^\perp,
\qquad
2,4\in P^\perp
$$

なので

$$
Q_P(f)
=
5+2+3
=
\boxed{10}.
$$

従って決定論的誤差は5です。

デジタルシフト後は

$$
\boxed{
Q_\Delta(f)-5
=
2\operatorname{wal}_2(\Delta)
+
3\operatorname{wal}_4(\Delta)
}.
$$

異なる Walsh 周波数は一様シフトに対して直交するので、分散は係数平方和です。

$$
\boxed{
\operatorname{Var}(Q_\Delta(f))
=
2^2+3^2
=
13
}.
$$

底2では

$$
\operatorname{wal}_2(\Delta)
=
(-1)^{\Delta_2},
$$

$$
\operatorname{wal}_4(\Delta)
=
(-1)^{\Delta_3}.
$$

したがって指定された4通りでは、

#### 反復1：$(\Delta_2,\Delta_3)=(0,0)$

$$
Z_1
=
5+2+3
=
10.
$$

#### 反復2：$(1,0)$

$$
Z_2
=
5-2+3
=
6.
$$

#### 反復3：$(0,1)$

$$
Z_3
=
5+2-3
=
4.
$$

#### 反復4：$(1,1)$

$$
Z_4
=
5-2-3
=
0.
$$

従って

$$
\overline Z_4
=
\frac{10+6+4+0}{4}
=
\boxed{5}.
$$

この実現では偶然、真値と一致しました。

偏差は

$$
5,\quad1,\quad-1,\quad-5
$$

なので偏差平方和は

$$
25+1+1+25
=
52.
$$

従って

$$
\boxed{
S_4^2
=
\frac{52}{3}
}.
$$

標準誤差推定値は

$$
\boxed{
\widehat{\sigma}_{\overline Z}
=
\sqrt{
\frac{S_4^2}{4}
}
=
\sqrt{\frac{13}{3}}
}.
$$

一方、一反復の理論分散は13なので、4独立反復の平均の理論分散は

$$
\frac{13}{4}.
$$

したがって理論標準誤差は

$$
\boxed{
\sigma_{\overline Z_4}
=
\frac{\sqrt{13}}{2}
}.
$$

数値的には

$$
\sqrt{\frac{13}{3}}
\approx2.082,
$$

$$
\frac{\sqrt{13}}2
\approx1.803.
$$

標本分散は一回の有限標本なので理論値と一致する必要はありません。

命題が保証するのは

$$
E[S_4^2]=13
$$

であって、各実現で $S_4^2=13$ になることではありません。

周波数1の係数4は最大ですが、

$$
1\notin P^\perp
$$

です。

したがって点集合上でこの Walsh モードは各反復で厳密に平均0になります。

一方、周波数2と4は双対ネットに属するためランダム位相付きで残ります。

つまり分散を決めるのは係数の大きさだけではなく、

$$
\boxed{
\text{係数の大きさ}
+
\text{その周波数が双対に入るか}
}
$$

です。

最後に各反復の2点は同じシフトを共有します。

従って一反復内の2個の関数値は独立ではありません。

合計8個の点値を 独立同分布標本として扱うと、QMC が意図的に作った依存構造を無視することになります。

独立なのは4個の反復値

$$
Z_1,\ldots,Z_4
$$

なので、誤差推定はこの4個を標本として行います。
<!-- solution-end -->

---

## 14. まとめ

本章では、決定論的なデジタル QMC 点集合へ乱数を入れながら、その構造を壊さない方法を作りました。

まず桁上がりのない

$$
x\oplus\delta
$$

を定義し、一様なデジタルシフトを固定点へ作用させると

$$
\boxed{
x\oplus\Delta
\sim
\operatorname{Unif}(0,1)
}
$$

になることを桁 prefix の確率から証明しました。

これにより

$$
\boxed{
E[
Q_\Delta(f)
]
=
I(f)
}
$$

という不偏性が得られます。

しかもデジタルシフトは $b$ 進基本区間のラベルを置換するだけなので、

$$
\boxed{
(t,m,s)\text{-ネット性を保存する}
}
$$

ことも示しました。

Walsh 周波数側では

$$
\operatorname{wal}_{\boldsymbol k}
(
\boldsymbol x\oplus\boldsymbol\Delta
)
=
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta)
$$

から、

$$
\boxed{
Q_{\boldsymbol\Delta}(f)-I(f)
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol\Delta)
}
$$

を得ました。

さらに一様シフト上の Walsh 直交性により、

$$
\boxed{
\operatorname{Var}
(
Q_{\boldsymbol\Delta}(f)
)
=
\sum_{\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|^2
}
$$

です。

決定論的 QMC の

$$
\text{双対に残る周波数が誤差を作る}
$$

という構造が、そのまま

$$
\text{双対に残る Walsh エネルギーが RQMC 分散を作る}
$$

へ変わりました。

次に独立なランダム化反復

$$
Z_1,\ldots,Z_R
$$

を導入し、

$$
\operatorname{Var}(\overline Z_R)
=
\frac{\tau^2}{R}
$$

および

$$
E[S_R^2]
=
\tau^2
$$

を証明しました。

ここで独立なのは **点ではなく反復**です。

さらに入れ子一様スクランブルを、prefix ごとの独立ランダム置換として定義しました。

桁木上の prefix 写像が全単射になることから、

$$
\boxed{
\text{各点は一様}
\qquad\text{かつ}\qquad
(t,m,s)\text{-ネット性は保存}
}
$$

を同時に得ました。

最後に関数的分散分析分解

$$
f
=
\sum_{u\subseteq S}f_u
$$

を構成し、

$$
\operatorname{Var}(f(U))
=
\sum_{u\ne\varnothing}\sigma_u^2
$$

を証明しました。

Walsh 周波数の支持

$$
\operatorname{supp}(\boldsymbol k)
$$

と 座標支持 $u$ を対応させると、

$$
\boxed{
\operatorname{Var}
(
Q_{\boldsymbol\Delta}(f)
)
=
\sum_{u\ne\varnothing}
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\operatorname{supp}(\boldsymbol k)=u
}}
|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
|^2
}
$$

となります。

本章の要点は、

$$
\boxed{
\text{RQMC}
=
\text{一様なランダム性}
+
\text{壊さない点集合構造}
+
\text{独立反復による誤差評価}
}
$$

です。

次の QMC8 では、一次の NRT 重みだけでは捉えきれない滑らかさを複数の非零桁位置で測り、**高次 Walsh 係数減衰と higher-order digital net による高次収束**へ進みます。
