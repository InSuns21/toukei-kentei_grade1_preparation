# QMC5 準 Monte Carlo V：Walsh 解析とデジタルネットの双対理論

QMC4 では、有限体上の生成行列からデジタル点集合を作り、幾何学的な $(t,m,s)$-ネット条件を生成行列の先頭行の一次独立性へ変換しました。

しかし、QMC4 の見方だけではまだ「どの振動が点平均で消え、どの振動が残るか」が見えていません。

QMC3 の格子則では、Fourier モード

$$
e^{2\pi i\boldsymbol h\cdot\boldsymbol x}
$$

を点集合上で平均すると、双対格子に属する周波数だけが残りました。

デジタルネットにも、これとほぼ同じ構造があります。

ただし、デジタルネットは実数の通常の加法ではなく、**$b$ 進桁を有限体上で足す構造**から作られています。そのため、QMC3 の Fourier モードに対応する、$b$ 進桁へ適合した自然な基底を本章で定義します。

本章の中心は

$$
\boxed{
\text{生成行列}
\longrightarrow
\text{双対ネット}
\longrightarrow
\text{Walsh 周波数の厳密な消去}
}
$$

です。

さらに、Walsh 周波数の「粗さ」を最高位の非零桁から測る量を導入すると、QMC4 の $t$ 値が

$$
\boxed{
\text{双対ネットに残る最も低い Walsh 周波数}
}
$$

として読み替えられます。

この双対像が QMC6 の polynomial lattice、QMC7 のランダム化、QMC8 の高次 QMC の共通言語になります。

---

## 0. 本章で使う既出事項

QMC4 から次を使います。

- [$(t,m,s)$-ネット](../QMC4/index.md#def-qmc4-tms-net)
- [素数底のデジタル点集合](../QMC4/index.md#def-qmc4-digital-net)
- [生成行列の一次独立性による $(t,m,s)$-ネット判定](../QMC4/index.md#thm-qmc4-digital-net-rank-criterion)

位相因子 $e^{i\theta}$ の記法については FOU1 の [複素指数係数](../FOU1/index.md#def-fou1-complex-exponential-coefficient) で使った記法を使います。

本章では底 $b$ を **素数**とし、

$$
\mathbb F_b
=
\mathbb Z/b\mathbb Z
$$

と同一視します。

QMC4 と同じく、生成行列は

$$
C_1,\ldots,C_s
\in
\mathbb F_b^{m\times m}
$$

とし、点数は

$$
N=b^m
$$

です。

> **停止線**  
> 本章では有限の $m\times m$ 生成行列から作るデジタル点集合を扱います。無限生成行列によるデジタル点列、polynomial lattice、高次 Walsh 重みは後続章へ送ります。

---

## 1. 桁ごとの有限 Fourier 解析を作る

通常の Fourier 解析では、実数の加法に適合する指標として

$$
x\longmapsto e^{2\pi i h x}
$$

を使います。

一方、デジタルネットでは各桁が $\mathbb F_b$ 上で線形に作られます。

そこで、各桁に対して $b$ 乗根

$$
\omega_b
=
e^{2\pi i/b}
$$

を使い、桁ごとの位相を掛け合わせます。

### 1.1 $b$ 進展開の約束

整数 $k\ge0$ を

$$
k
=
\kappa_0+\kappa_1b+\kappa_2b^2+\cdots
$$

と書きます。

各桁は

$$
\kappa_r\in\{0,1,\ldots,b-1\}
$$

で、非零桁は有限個です。

一方、$x\in[0,1)$ は

$$
x
=
\frac{x_1}{b}
+
\frac{x_2}{b^2}
+
\frac{x_3}{b^3}
+\cdots,
\qquad
x_r\in\{0,\ldots,b-1\}
$$

と表します。

$b$ 進有理数には

$$
0.1000\cdots
=
0.0(b-1)(b-1)(b-1)\cdots
$$

型の二重表現があります。本章では **末尾が永久に $b-1$ にならない展開**を採用します。

デジタルネットの点は有限桁で作られるので、この約束では末尾を0で埋める展開を使います。

<a id="def-qmc5-walsh-function"></a>
<!-- formal-statement-start -->
### 定義（Walsh 関数）

素数 $b$ を固定する。

$$
k
=
\sum_{r=0}^\infty \kappa_r b^r
$$

および

$$
x
=
\sum_{r=1}^\infty x_r b^{-r}
$$

を上の約束で $b$ 進展開する。

このとき

$$
\boxed{
\operatorname{wal}_k(x)
=
\omega_b^{\sum_{r=0}^\infty \kappa_r x_{r+1}}
}
$$

を底 $b$ の **Walsh 関数** とする。

$s$ 次元では

$$
\boldsymbol k
=
(k_1,\ldots,k_s),
\qquad
\boldsymbol x
=
(x_1,\ldots,x_s)
$$

に対し

$$
\boxed{
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
\prod_{j=1}^s
\operatorname{wal}_{k_j}(x_j)
}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc5-walsh-function -->
**定義の確認**：底2の最小例

底2では

$$
\omega_2
=
e^{\pi i}
=
-1.
$$

$k=1$ は二進桁

$$
(\kappa_0,\kappa_1,\ldots)
=
(1,0,\ldots)
$$

を持つので

$$
\operatorname{wal}_1(x)
=
(-1)^{x_1}.
$$

従って

$$
\operatorname{wal}_1(x)
=
\begin{cases}
1,&0\le x<1/2,\\
-1,&1/2\le x<1.
\end{cases}
$$

です。

一方、$k=2$ は

$$
(\kappa_0,\kappa_1,\ldots)
=
(0,1,0,\ldots)
$$

なので

$$
\operatorname{wal}_2(x)
=
(-1)^{x_2}.
$$

こちらは長さ $1/4$ ごとに

$$
1,-1,1,-1
$$

と振動します。

つまり通常の Fourier 周波数が「波長」で振動を測るのに対し、Walsh 周波数は **何桁目まで見るか**で振動の細かさを測ります。
<!-- definition-example-end -->

---

## 2. 非零モードの積分はなぜ 0 になるか

Walsh 関数で最初に必要なのは、非零周波数の積分が0になることです。

これは複雑な調和解析を使わず、$b$ 乗根の有限和だけで示せます。

### 2.1 $b$ 乗根の和

整数 $a$ に対して

$$
\sum_{c=0}^{b-1}\omega_b^{ac}
=
\begin{cases}
b,&a\equiv0\pmod b,\\
0,&a\not\equiv0\pmod b.
\end{cases}
$$

です。

$a\not\equiv0$ なら $\omega_b^a\ne1$ であり、有限等比級数から

$$
\sum_{c=0}^{b-1}(\omega_b^a)^c
=
\frac{1-(\omega_b^a)^b}{1-\omega_b^a}
=
0
$$

となります。

<a id="thm-qmc5-walsh-integral-orthogonality"></a>
<!-- formal-statement-start -->
### 定理（Walsh 関数の積分直交性）

任意の $\boldsymbol k\in\mathbb N_0^s$ に対し

$$
\boxed{
\int_{[0,1)^s}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
\,d\boldsymbol x
=
\begin{cases}
1,&\boldsymbol k=\boldsymbol0,\\
0,&\boldsymbol k\ne\boldsymbol0.
\end{cases}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず一次元を示します。

$k\ne0$ なら最高位の非零桁までを見れば Walsh 関数は有限個の $b$ 進区間上で定数です。

最後に現れる非零係数に対応する桁を一周させると、$b$ 乗根の和が0になります。

多次元では積の積分へ分離します。

<!-- proof-start -->
### 証明

まず $s=1$ とします。

$k=0$ なら

$$
\operatorname{wal}_0(x)=1
$$

なので積分は1です。

次に $k\ne0$ とし、最高位の非零桁の位置を $a-1$ とします。すなわち

$$
\kappa_{a-1}\ne0,
\qquad
\kappa_r=0
\quad(r\ge a).
$$

このとき $\operatorname{wal}_k(x)$ は $x_1,\ldots,x_a$ だけで決まるため、各

$$
I_{c_1,\ldots,c_a}
=
\left[
\sum_{r=1}^a c_r b^{-r},
\,
\sum_{r=1}^a c_r b^{-r}+b^{-a}
\right)
$$

上で一定です。

従って

$$
\int_0^1\operatorname{wal}_k(x)\,dx
=
b^{-a}
\sum_{c_1,\ldots,c_a=0}^{b-1}
\omega_b^{
\kappa_0c_1+\cdots+\kappa_{a-1}c_a
}.
$$

有限和を積に分けると

$$
=
b^{-a}
\prod_{r=1}^a
\left(
\sum_{c_r=0}^{b-1}
\omega_b^{\kappa_{r-1}c_r}
\right).
$$

最後の因子は $\kappa_{a-1}\ne0$ なので

$$
\sum_{c_a=0}^{b-1}
\omega_b^{\kappa_{a-1}c_a}
=
0.
$$

よって

$$
\int_0^1\operatorname{wal}_k(x)\,dx
=
0.
$$

次に多次元では Fubini の有限積の場合として

$$
\int_{[0,1)^s}
\prod_{j=1}^s
\operatorname{wal}_{k_j}(x_j)
\,d\boldsymbol x
=
\prod_{j=1}^s
\int_0^1
\operatorname{wal}_{k_j}(x_j)\,dx_j.
$$

$\boldsymbol k=\boldsymbol0$ なら全因子が1です。

$\boldsymbol k\ne\boldsymbol0$ なら少なくとも一つの $k_j$ が非零なので、その因子の積分が0です。

以上で示されました。
<!-- proof-end -->

この定理は、通常の Fourier 解析で

$$
\int_0^1 e^{2\pi i h x}\,dx
=
0
\qquad(h\ne0)
$$

となることのデジタル版です。

---

## 3. 有限和から周波数係数へ

本章では Walsh 系の完全性そのものを証明する必要はありません。

積分誤差を導くために、まず有限和から始めます。

<a id="def-qmc5-walsh-polynomial"></a>
<!-- formal-statement-start -->
### 定義（Walsh 多項式と Walsh 係数）

有限集合

$$
K\subset\mathbb N_0^s
$$

と係数

$$
a_{\boldsymbol k}\in\mathbb C
$$

に対し

$$
\boxed{
f(\boldsymbol x)
=
\sum_{\boldsymbol k\in K}
a_{\boldsymbol k}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
}
$$

を **Walsh 多項式** と呼ぶ。

可積分関数 $f$ に対し

$$
\boxed{
\widehat f_{\mathrm{wal}}(\boldsymbol k)
=
\int_{[0,1)^s}
f(\boldsymbol x)
\overline{
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
}
\,d\boldsymbol x
}
$$

を $\boldsymbol k$ 番目の **Walsh 係数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc5-walsh-polynomial -->
**定義の確認**：底2で

$$
f(x)=2+3\operatorname{wal}_1(x)
$$

を考えます。これは周波数集合

$$
K=\{0,1\}
$$

だけを使う有限和なので Walsh 多項式です。

さらに

$$
\widehat f_{\mathrm{wal}}(0)
=
\int_0^1 f(x)\,dx
=
2
$$

です。ここでは $\operatorname{wal}_1$ の積分が0であることを使いました。

また底2では $\operatorname{wal}_1(x)^2=1$ なので

$$
\widehat f_{\mathrm{wal}}(1)
=
\int_0^1
f(x)\operatorname{wal}_1(x)\,dx
$$

$$
=
2\int_0^1\operatorname{wal}_1(x)\,dx
+
3\int_0^1\operatorname{wal}_1(x)^2\,dx
=
3.
$$

したがって、有限和の係数 $2,3$ が Walsh 係数として実際に回収されます。
<!-- definition-example-end -->

Walsh 多項式では積分直交性から

$$
I(f)
=
\int_{[0,1)^s}f
=
a_{\boldsymbol0}.
$$

つまり積分は零周波数成分だけを取り出します。

残る問題は、デジタル点集合上の平均がどの Walsh 周波数を零へ落とすかです。

---

## 4. 双対ネット：消えずに残る周波数を生成行列から読む

QMC4 の生成行列

$$
C_j\in\mathbb F_b^{m\times m}
$$

を固定します。

$k\in\mathbb N_0$ の下位 $m$ 桁を

$$
k
=
\kappa_0+\kappa_1b+\cdots+\kappa_{m-1}b^{m-1}
+\text{それより上の桁}
$$

と書き、

$$
\boxed{
\nu_m(k)
=
(\kappa_0,\ldots,\kappa_{m-1})^{\mathsf T}
\in\mathbb F_b^m
}
$$

とします。

高い桁は $m\times m$ 生成行列から作られた点には見えないため、双対条件では下位 $m$ 桁だけが現れます。

<a id="def-qmc5-dual-net"></a>
<!-- formal-statement-start -->
### 定義（デジタル点集合の双対ネット）

素数底 $b$、生成行列

$$
C_1,\ldots,C_s
\in
\mathbb F_b^{m\times m}
$$

から作るデジタル点集合を $P$ とする。

その **双対ネット** を

$$
\boxed{
P^\perp
=
\left\{
\boldsymbol k=(k_1,\ldots,k_s)\in\mathbb N_0^s:
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
=
\boldsymbol0
\text{ in }\mathbb F_b^m
\right\}
}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc5-dual-net -->
**定義の確認**：QMC4 の底2・4点例

$$
C_1
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
C_2
=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}.
$$

$k_1,k_2$ の下位2桁を

$$
\nu_2(k_1)
=
\begin{pmatrix}
a_0\\a_1
\end{pmatrix},
\qquad
\nu_2(k_2)
=
\begin{pmatrix}
c_0\\c_1
\end{pmatrix}
$$

とします。

双対条件は $\mathbb F_2$ 上で

$$
C_1^{\mathsf T}\nu_2(k_1)
+
C_2^{\mathsf T}\nu_2(k_2)
=
\begin{pmatrix}
a_1+c_0\\
a_0+c_1
\end{pmatrix}
=
\begin{pmatrix}
0\\0
\end{pmatrix}.
$$

従って

$$
c_0=a_1,
\qquad
c_1=a_0.
$$

たとえば

$$
(k_1,k_2)=(1,2)
$$

では

$$
\nu_2(1)=
\begin{pmatrix}1\\0\end{pmatrix},
\qquad
\nu_2(2)=
\begin{pmatrix}0\\1\end{pmatrix}
$$

なので双対条件を満たします。

一方

$$
(k_1,k_2)=(1,1)
$$

は満たしません。

双対ネットは「どの Walsh 周波数が点集合と共鳴するか」を生成行列から直接記述しています。
<!-- definition-example-end -->

---

## 5. デジタルネット上の Walsh 周波数消去則

これが本章の中心定理です。

<a id="thm-qmc5-digital-character-property"></a>
<!-- formal-statement-start -->
### 定理（デジタルネット上の Walsh 関数の離散直交性）

$P=\{\boldsymbol x_n:n=0,\ldots,b^m-1\}$ を、素数底 $b$ の生成行列

$$
C_1,\ldots,C_s\in\mathbb F_b^{m\times m}
$$

から作るデジタル点集合とする。

任意の $\boldsymbol k\in\mathbb N_0^s$ に対し

$$
\boxed{
\frac1{b^m}
\sum_{n=0}^{b^m-1}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x_n)
=
\begin{cases}
1,&\boldsymbol k\in P^\perp,\\
0,&\boldsymbol k\notin P^\perp.
\end{cases}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### なぜ生成行列の転置が出るのか

QMC4 では、$n$ の $b$ 進桁ベクトルを

$$
\boldsymbol n
=
(n_0,\ldots,n_{m-1})^{\mathsf T}
$$

とし、

$$
\boldsymbol y_j
=
C_j\boldsymbol n
$$

で第 $j$ 座標の小数桁を作りました。

Walsh 関数の指数は

$$
\nu_m(k_j)^{\mathsf T}\boldsymbol y_j
$$

です。

ここへ

$$
\boldsymbol y_j=C_j\boldsymbol n
$$

を代入すると

$$
\nu_m(k_j)^{\mathsf T}C_j\boldsymbol n
=
(C_j^{\mathsf T}\nu_m(k_j))^{\mathsf T}\boldsymbol n
$$

となります。

つまり「周波数側へ生成行列を移す」と転置が現れます。

<!-- proof-start -->
### 証明

$n$ の $b$ 進表示を

$$
n
=
n_0+n_1b+\cdots+n_{m-1}b^{m-1},
\qquad
n_r\in\mathbb F_b
$$

とします。

QMC4 のデジタル構成により、第 $j$ 座標の最初の $m$ 桁は

$$
\boldsymbol y_j
=
C_j\boldsymbol n
$$

です。

従って Walsh 関数の定義から

$$
\operatorname{wal}_{k_j}(x_{n,j})
=
\omega_b^{
\nu_m(k_j)^{\mathsf T}\boldsymbol y_j
}.
$$

ここで高位 $m$ 桁より上の $k_j$ の桁は、$x_{n,j}$ の対応する桁が0なので寄与しません。

よって多次元 Walsh 関数は

$$
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x_n)
=
\omega_b^{
\sum_{j=1}^s
\nu_m(k_j)^{\mathsf T}C_j\boldsymbol n
}.
$$

転置を使って

$$
=
\omega_b^{
\left(
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
\right)^{\mathsf T}
\boldsymbol n
}.
$$

ここで

$$
\boldsymbol a
=
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
=
(a_0,\ldots,a_{m-1})^{\mathsf T}
$$

と置きます。

$n=0,\ldots,b^m-1$ を走らせることは、

$$
(n_0,\ldots,n_{m-1})
\in
\mathbb F_b^m
$$

をすべて一度ずつ走らせることと同じです。

従って

$$
\frac1{b^m}
\sum_{n=0}^{b^m-1}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x_n)
=
\frac1{b^m}
\sum_{n_0,\ldots,n_{m-1}=0}^{b-1}
\omega_b^{a_0n_0+\cdots+a_{m-1}n_{m-1}}.
$$

有限和を積へ分けると

$$
=
\prod_{r=0}^{m-1}
\left(
\frac1b
\sum_{n_r=0}^{b-1}
\omega_b^{a_rn_r}
\right).
$$

各因子は

$$
\frac1b
\sum_{n_r=0}^{b-1}
\omega_b^{a_rn_r}
=
\begin{cases}
1,&a_r=0,\\
0,&a_r\ne0.
\end{cases}
$$

です。

従って積全体が1になるのは

$$
a_0=\cdots=a_{m-1}=0
$$

のときだけです。

これは

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
=
0
$$

すなわち

$$
\boldsymbol k\in P^\perp
$$

と同値です。

以上で示されました。
<!-- proof-end -->

この定理により、

$$
\boxed{
\text{デジタルネットは双対ネットの外側の Walsh 周波数を厳密に消す}
}
$$

と分かります。

---

## 6. Walsh 多項式の積分誤差

QMC3 で Fourier 係数と双対格子から積分誤差を書いたのと同じことを、Walsh 系で行います。

<a id="thm-qmc5-walsh-polynomial-error"></a>
<!-- formal-statement-start -->
### 定理（Walsh 多項式に対するデジタルネットの積分誤差公式）

$P$ を $b^m$ 点のデジタル点集合とし、

$$
Q_P(f)
=
\frac1{b^m}
\sum_{\boldsymbol x\in P}
f(\boldsymbol x)
$$

とする。

Walsh 多項式

$$
f(\boldsymbol x)
=
\sum_{\boldsymbol k\in K}
a_{\boldsymbol k}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
$$

に対して

$$
\boxed{
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in K\cap P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
a_{\boldsymbol k}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限和なので、点平均と和をそのまま交換できます。

$$
Q_P(f)
=
\sum_{\boldsymbol k\in K}
a_{\boldsymbol k}
\left(
\frac1{b^m}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
\right).
$$

前定理より括弧内は

$$
\begin{cases}
1,&\boldsymbol k\in P^\perp,\\
0,&\boldsymbol k\notin P^\perp.
\end{cases}
$$

なので

$$
Q_P(f)
=
\sum_{\boldsymbol k\in K\cap P^\perp}
a_{\boldsymbol k}.
$$

一方、積分直交性より

$$
I(f)
=
a_{\boldsymbol0}.
$$

また

$$
\boldsymbol0\in P^\perp
$$

は常に成り立ちます。

従って零周波数項を引けば

$$
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in K\cap P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
a_{\boldsymbol k}.
$$
<!-- proof-end -->

### 6.1 失敗例：双対周波数を一つ入れるだけで誤差が残る

もし

$$
\boldsymbol k^\star
\in
P^\perp\setminus\{\boldsymbol0\}
$$

なら

$$
f(\boldsymbol x)
=
\operatorname{wal}_{\boldsymbol k^\star}(\boldsymbol x)
$$

に対して

$$
I(f)=0
$$

ですが

$$
Q_P(f)=1.
$$

したがって誤差は

$$
Q_P(f)-I(f)=1.
$$

点集合が見落とす双対周波数へ関数の成分が集中すると、積分誤差は大きくなります。

逆に、重要な低い Walsh 周波数を双対ネットから追い出せば、それらは厳密に積分されます。

---

## 7. 無限和へ安全に拡張する

有限和だけでは関数クラスとして狭すぎます。

そこで Fourier 章と同様に、係数が絶対可算和なら和と点評価を安全に交換できます。

<a id="def-qmc5-absolute-walsh-series"></a>
<!-- formal-statement-start -->
### 定義（絶対収束 Walsh 級数）

関数 $f:[0,1)^s\to\mathbb C$ が

$$
f(\boldsymbol x)
=
\sum_{\boldsymbol k\in\mathbb N_0^s}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
$$

と表され、

$$
\boxed{
\sum_{\boldsymbol k\in\mathbb N_0^s}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|
<
\infty
}
$$

を満たすとき、本章では **絶対収束 Walsh 級数を持つ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc5-absolute-walsh-series -->
**定義の確認**：定数関数 $f(x)=1$

積分直交性から

$$
\widehat f_{\mathrm{wal}}(0)=1
$$

であり、$k\ne0$ なら

$$
\widehat f_{\mathrm{wal}}(k)
=
\int_0^1
\overline{\operatorname{wal}_k(x)}\,dx
=
0.
$$

したがって

$$
\sum_{k=0}^{\infty}
|\widehat f_{\mathrm{wal}}(k)|
=
1
<
\infty.
$$

よって定数関数は絶対収束 Walsh 級数を持ちます。有限和だけでなく無限級数を許す定義ですが、有限個しか非零係数を持たない関数も当然その中に含まれます。
<!-- definition-example-end -->

$|\operatorname{wal}_{\boldsymbol k}|=1$ なので、絶対可算和性から級数は一様に Cauchy です。

したがって有限点平均との交換も積分との交換も正当化できます。

<a id="thm-qmc5-absolute-walsh-error"></a>
<!-- formal-statement-start -->
### 定理（絶対収束 Walsh 級数に対する積分誤差公式）

$f$ が絶対収束 Walsh 級数を持つなら

$$
\boxed{
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
}
$$

が成り立つ。

特に

$$
\boxed{
|Q_P(f)-I(f)|
\le
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

部分和

$$
S_M(\boldsymbol x)
=
\sum_{\boldsymbol k\in K_M}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
$$

を、有限集合 $K_M$ が全周波数を増大列として尽くすように取ります。

絶対可算和性と

$$
|\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)|=1
$$

から

$$
\sup_{\boldsymbol x}
|f(\boldsymbol x)-S_M(\boldsymbol x)|
\le
\sum_{\boldsymbol k\notin K_M}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
\to0.
$$

従って

$$
Q_P(S_M)\to Q_P(f)
$$

です。

同様に

$$
|I(f)-I(S_M)|
\le
\sup_{\boldsymbol x}|f(\boldsymbol x)-S_M(\boldsymbol x)|
\to0.
$$

有限和 $S_M$ には前定理を適用できるので

$$
Q_P(S_M)-I(S_M)
=
\sum_{\substack{
\boldsymbol k\in K_M\cap P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k).
$$

右辺も絶対収束するため、$M\to\infty$ として

$$
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
$$

を得ます。

最後に両辺の絶対値を取り、絶対収束する右辺を各項の絶対値の和で上から抑えれば、表示した絶対値上界が従います。
<!-- proof-end -->

---

## 8. 最高位の非零桁で周波数の粗さを測る

双対ネットに非零周波数が存在すること自体は避けられません。

有限個の点では、すべての Walsh 周波数を消すことはできないからです。

そこで次に問うのは

$$
\boxed{
\text{最も低い双対周波数はどこにあるか}
}
$$

です。

Walsh 関数では「何桁目までを見るか」を測る量が自然です。

<a id="def-qmc5-nrt-weight"></a>
<!-- formal-statement-start -->
### 定義（NRT 重み）

整数 $k\ge0$ に対し

$$
\mu_1(0)=0
$$

とする。

$k>0$ の $b$ 進展開で最高位の非零桁が $b^{a-1}$ の位にあるとき、

$$
\boxed{
\mu_1(k)=a
}
$$

と定める。

すなわち

$$
b^{a-1}\le k<b^a
$$

なら $\mu_1(k)=a$ である。

多次元では

$$
\boxed{
\mu_1(\boldsymbol k)
=
\sum_{j=1}^s
\mu_1(k_j)
}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc5-nrt-weight -->
**定義の確認**：底2

$$
\mu_1(0)=0,
\qquad
\mu_1(1)=1,
\qquad
\mu_1(2)=\mu_1(3)=2,
$$

$$
\mu_1(4)=\mu_1(5)=\mu_1(6)=\mu_1(7)=3.
$$

たとえば

$$
\boldsymbol k=(1,2,0)
$$

なら

$$
\mu_1(\boldsymbol k)
=
1+2+0
=
3.
$$

NRT 重みは非零桁の個数ではありません。

たとえば底2で

$$
3=(11)_2,
\qquad
2=(10)_2
$$

は非零桁数が違いますが、どちらも最高位が2桁目なので

$$
\mu_1(3)=\mu_1(2)=2.
$$
<!-- definition-example-end -->

### 8.1 なぜ「和」にするのか

$\mu_1(k_j)=d_j$ なら、$k_j$ の係数は生成行列 $C_j$ の **先頭 $d_j$ 行**だけを使います。

したがって

$$
\mu_1(\boldsymbol k)
=
d_1+\cdots+d_s
$$

は、双対関係を作るために何本の先頭行を使ったかを測っています。

ここで QMC4 の一次独立条件と完全につながります。

---

## 9. $t$ 値の双対特徴付け

<a id="def-qmc5-minimum-dual-nrt-weight"></a>
<!-- formal-statement-start -->
### 定義（最小双対 NRT 重み）

デジタル点集合 $P$ に対し

$$
\boxed{
\rho_1(P)
=
\min\left\{
\mu_1(\boldsymbol k):
\boldsymbol k\in P^\perp\setminus\{\boldsymbol0\}
\right\}
}
$$

を **最小双対 NRT 重み** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc5-minimum-dual-nrt-weight -->
**定義の確認**：底2、$m=2$、一次元で $C=I_2$

このとき双対条件は

$$
\nu_2(k)=0
$$

です。

従って非零双対周波数のうち最小のものは

$$
k=4=(100)_2
$$

であり、

$$
\mu_1(4)=3.
$$

$k=1,2,3$ は下位2桁のどこかが非零なので双対には入りません。

したがって

$$
\boxed{
\rho_1(P)=3
}
$$

です。
<!-- definition-example-end -->

この最小値は必ず有限です。

実際、たとえば

$$
\boldsymbol k=(b^m,0,\ldots,0)
$$

なら

$$
\nu_m(b^m)=0
$$

なので

$$
\boldsymbol k\in P^\perp
$$

であり、

$$
\mu_1(\boldsymbol k)=m+1.
$$

従って

$$
1\le \rho_1(P)\le m+1.
$$

<a id="thm-qmc5-t-value-duality"></a>
<!-- formal-statement-start -->
### 定理（t 値と最小双対 NRT 重みの双対関係）

$P$ を素数底 $b$ の $b^m$ 点デジタル点集合とする。

整数 $0\le t\le m$ に対して、次は同値である。

1. $P$ は底 $b$ の $(t,m,s)$-ネットである。
2. 任意の非零双対周波数 $\boldsymbol k\in P^\perp\setminus\{\boldsymbol0\}$ に対し
   $$
   \mu_1(\boldsymbol k)>m-t
   $$
   が成り立つ。
3. 
   $$
   \boxed{
   \rho_1(P)>m-t
   }
   $$

   が成り立つ。

特に、$P$ の最小の $t$ 値を $t_{\min}$ とすると

$$
\boxed{
t_{\min}
=
m-\rho_1(P)+1
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

QMC4 の判定定理では、すべての

$$
d_1+\cdots+d_s=m-t
$$

に対し、各 $C_j$ の先頭 $d_j$ 行を集めたものが一次独立であることが $(t,m,s)$-ネット条件と同値でした。

一方、双対条件

$$
\sum_j C_j^{\mathsf T}\nu_m(k_j)=0
$$

は、生成行列の行ベクトルの線形結合が0になることそのものです。

しかも $\mu_1(k_j)=d_j$ なら、その線形結合は $C_j$ の先頭 $d_j$ 行しか使いません。

従って

$$
\text{小さい NRT 重みの双対周波数がある}
$$

ことと

$$
\text{少数の先頭行の間に一次従属がある}
$$

ことが同じになります。

<!-- proof-start -->
### 証明

QMC4 の [生成行列の一次独立性による $(t,m,s)$-ネット判定](../QMC4/index.md#thm-qmc4-digital-net-rank-criterion) を使います。

まず $P$ が $(t,m,s)$-ネットであると仮定します。

反対に、非零

$$
\boldsymbol k
=
(k_1,\ldots,k_s)
\in P^\perp
$$

で

$$
\mu_1(\boldsymbol k)
\le
m-t
$$

を満たすものがあるとします。

各 $j$ について

$$
d_j=\mu_1(k_j)
$$

と置きます。

$k_j=0$ なら $d_j=0$ です。

$k_j\ne0$ なら、$\nu_m(k_j)$ の非零成分は最初の $d_j$ 個の位置にしかなく、しかも第 $d_j$ 成分は非零です。ただし $d_j>m$ の場合は

$$
\mu_1(\boldsymbol k)>m
$$

となり

$$
\mu_1(\boldsymbol k)\le m-t\le m
$$

に反するので、ここでは必ず $d_j\le m$ です。

双対条件を成分で書くと

$$
\sum_{j=1}^s
\sum_{r=1}^{d_j}
\kappa_{j,r-1}
\boldsymbol c_{j,r}
=
\boldsymbol0,
$$

ここで $\boldsymbol c_{j,r}$ は $C_j$ の第 $r$ 行です。

$\boldsymbol k\ne0$ なので係数はすべて0ではありません。

従って、各 $C_j$ の先頭 $d_j$ 行を集めた集合は一次従属です。

また

$$
d_1+\cdots+d_s
=
\mu_1(\boldsymbol k)
\le
m-t.
$$

もし不等号が厳しければ、いずれかの $d_j$ を増やして

$$
d'_1+\cdots+d'_s=m-t
$$

となるようにできます。元の一次従属関係は、追加した行の係数を0と置けばそのまま残ります。

したがって先頭 $d'_j$ 行を集めた集合も一次従属です。

これは QMC4 の [生成行列の一次独立性による $(t,m,s)$-ネット判定](../QMC4/index.md#thm-qmc4-digital-net-rank-criterion) に反します。

よって

$$
\mu_1(\boldsymbol k)>m-t
$$

がすべての非零双対周波数で成り立ちます。

逆に

$$
\rho_1(P)>m-t
$$

を仮定します。

もし $P$ が $(t,m,s)$-ネットでなければ、QMC4 の判定定理より、ある非負整数

$$
d_1,\ldots,d_s,
\qquad
d_1+\cdots+d_s=m-t
$$

について、各 $C_j$ の先頭 $d_j$ 行を集めた集合が一次従属です。

従って、すべて0ではない係数

$$
\kappa_{j,r-1}\in\mathbb F_b
$$

が存在して

$$
\sum_{j=1}^s
\sum_{r=1}^{d_j}
\kappa_{j,r-1}\boldsymbol c_{j,r}
=
0
$$

となります。

各 $j$ について、これらを下位桁とする整数

$$
k_j
=
\sum_{r=1}^{d_j}
\kappa_{j,r-1}b^{r-1}
$$

を作ります。

少なくとも一つの係数が非零なので

$$
\boldsymbol k\ne\boldsymbol0.
$$

また上の線形関係はまさに

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
=
0
$$

なので

$$
\boldsymbol k\in P^\perp.
$$

各 $j$ について最高位の非零係数は第 $d_j$ 行より上にはないため

$$
\mu_1(k_j)\le d_j.
$$

従って

$$
\mu_1(\boldsymbol k)
=
\sum_{j=1}^s\mu_1(k_j)
\le
\sum_{j=1}^sd_j
=
m-t.
$$

これは

$$
\rho_1(P)>m-t
$$

に反します。

よって $P$ は $(t,m,s)$-ネットです。

1, 2, 3 の同値性が示されました。

最後に最小の $t$ 値 $t_{\min}$ は

$$
\rho_1(P)>m-t
$$

を満たす最小の非負整数 $t$ です。

$\rho_1(P)$ は整数なので

$$
m-t<\rho_1(P)
$$

は

$$
t>m-\rho_1(P)
$$

と同値です。

従って最小整数は

$$
t_{\min}
=
m-\rho_1(P)+1.
$$
<!-- proof-end -->

---

## 10. QMC4 の例を双対側から読み直す

再び

$$
C_1
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
C_2
=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}
$$

を考えます。

先ほど見たように、双対条件は

$$
c_0=a_1,
\qquad
c_1=a_0.
$$

非零双対周波数として

$$
(1,2),
\qquad
(2,1)
$$

があります。

それぞれ

$$
\mu_1(1,2)
=
1+2
=
3,
$$

$$
\mu_1(2,1)
=
2+1
=
3.
$$

一方、NRT 重み1または2の非零双対周波数は存在しません。

従って

$$
\rho_1(P)=3.
$$

ここで $m=2$ なので

$$
t_{\min}
=
m-\rho_1(P)+1
=
2-3+1
=
0.
$$

QMC4 では先頭行の一次独立性から $(0,2,2)$-ネットと判定しました。

QMC5 では同じ事実を

$$
\boxed{
\text{NRT 重み2以下の Walsh 周波数を全部消している}
}
$$

と読み替えます。

### 10.1 行を重複させると何が起きるか

QMC4 の失敗例では

$$
C_2=C_1
$$

とすると最小の $t$ が1へ悪化しました。

この場合、第一行同士が同じなので

$$
(k_1,k_2)=(1,1)
$$

が双対ネットに入ります。

実際

$$
\mu_1(1,1)=1+1=2.
$$

よって

$$
\rho_1(P)=2
$$

となり、

$$
t_{\min}
=
2-2+1
=
1.
$$

幾何学側の「粗い $1/2\times1/2$ 区間で偏る」という現象と、周波数側の「重み2の低い Walsh 周波数が生き残る」という現象は同じ欠陥を見ています。

---

## 11. Fourier 双対格子との対応

QMC3 と QMC5 の構造を並べると次のようになります。

| 格子則 | デジタルネット |
|---|---|
| 複素指数モード $e^{2\pi i\boldsymbol h\cdot\boldsymbol x}$ | Walsh モード $\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)$ |
| 生成ベクトル $\boldsymbol z$ | 生成行列 $C_1,\ldots,C_s$ |
| 双対格子 $\boldsymbol h\cdot\boldsymbol z\equiv0\pmod N$ | 双対ネット $\sum_j C_j^{\mathsf T}\nu_m(k_j)=0$ |
| 双対格子外のモードが消える | 双対ネット外のモードが消える |
| 小さい周波数を双対格子から追い出す | 小さい NRT 重みを双対ネットから追い出す |

ただし、二つを同一視してはいけません。

格子則の Fourier 周波数は整数ベクトルの通常の加法構造に適合しています。

デジタルネットの Walsh 周波数は $b$ 進桁の有限体線形構造に適合しています。

したがって、同じ「双対」という言葉を使っても、その背後にある群構造は異なります。

---

## 12. 何を設計すべきか：双対ネットの低重み領域を空ける

$t$ 値の双対特徴付けから、

$$
t
$$

を小さくすることは

$$
\rho_1(P)
$$

を大きくすることと同じです。

つまりデジタルネットの設計原理は

$$
\boxed{
\text{NRT 重みの小さい非零周波数を双対ネットへ入れない}
}
$$

です。

これは QMC3 の

$$
\boxed{
\text{小さい Fourier 周波数を双対格子から追い出す}
}
$$

の完全なデジタル版です。

ただし NRT 重みは「最高位の非零桁」しか見ません。

より高い滑らかさを利用するには、複数の非零桁位置を評価するより細かな重みが必要です。

その役割を QMC8 の higher-order digital net で扱います。

QMC6 ではまず、有限体多項式を用いて双対ネットを構造的に設計する polynomial lattice へ進みます。

---

## 13. 演習

### 演習 QMC5-A1

- Level: A
- 主題: 底2 Walsh 関数
- 使用技術: 二進桁と符号
- 計算量: 小

底2について、$x$ の先頭3二進小数桁を

$$
x_1x_2x_3
$$

と書く。

1. $\operatorname{wal}_1(x)$、$\operatorname{wal}_2(x)$、$\operatorname{wal}_3(x)$ を $x_1,x_2$ で表せ。
2. $x\in[0,1)$ を長さ $1/4$ の4区間に分け、それぞれで $\operatorname{wal}_3(x)$ の値を求めよ。
3. $\int_0^1\operatorname{wal}_3(x)\,dx=0$ を直接確認せよ。

<!-- solution-start -->
### 詳細解答

底2では

$$
\omega_2=-1.
$$

まず

$$
1=(1)_2
$$

なので

$$
\operatorname{wal}_1(x)
=
(-1)^{x_1}.
$$

次に

$$
2=(10)_2
$$

なので下位桁は

$$
(\kappa_0,\kappa_1)=(0,1)
$$

であり、

$$
\operatorname{wal}_2(x)
=
(-1)^{x_2}.
$$

さらに

$$
3=(11)_2
$$

なので

$$
\operatorname{wal}_3(x)
=
(-1)^{x_1+x_2}.
$$

長さ $1/4$ の区間ごとの先頭2桁は

$$
00,\quad01,\quad10,\quad11
$$

です。

従って値は順に

$$
(-1)^0=1,
$$

$$
(-1)^1=-1,
$$

$$
(-1)^1=-1,
$$

$$
(-1)^2=1.
$$

よって

$$
\operatorname{wal}_3(x)
=
\begin{cases}
1,&0\le x<1/4,\\
-1,&1/4\le x<1/2,\\
-1,&1/2\le x<3/4,\\
1,&3/4\le x<1.
\end{cases}
$$

各区間の長さは $1/4$ なので

$$
\int_0^1\operatorname{wal}_3(x)\,dx
=
\frac14(1-1-1+1)
=
0.
$$
<!-- solution-end -->

---

### 演習 QMC5-A2

- Level: A
- 主題: $b$ 乗根の消去
- 使用技術: 有限等比級数
- 計算量: 小

底 $b=3$ とし

$$
\omega_3=e^{2\pi i/3}
$$

とする。

1. $1+\omega_3+\omega_3^2=0$ を示せ。
2. $\sum_{c=0}^2\omega_3^{2c}=0$ を示せ。
3. これを使い、$\int_0^1\operatorname{wal}_2(x)\,dx=0$ を直接示せ。

<!-- solution-start -->
### 詳細解答

$\omega_3^3=1$ かつ $\omega_3\ne1$ なので

$$
1+\omega_3+\omega_3^2
=
\frac{1-\omega_3^3}{1-\omega_3}
=
0.
$$

次に

$$
\omega_3^2
$$

も1ではない3乗根なので

$$
1+\omega_3^2+\omega_3^4
=
1+\omega_3^2+\omega_3
=
0.
$$

従って

$$
\sum_{c=0}^2\omega_3^{2c}=0.
$$

底3で $k=2$ は一桁数なので

$$
\operatorname{wal}_2(x)
=
\omega_3^{2x_1}.
$$

$x_1=0,1,2$ はそれぞれ

$$
[0,1/3),\quad[1/3,2/3),\quad[2/3,1)
$$

で一定です。

従って

$$
\int_0^1\operatorname{wal}_2(x)\,dx
=
\frac13
\left(
1+\omega_3^2+\omega_3^4
\right)
=
0.
$$
<!-- solution-end -->

---

### 演習 QMC5-A3

- Level: A
- 主題: 双対ネットの直接判定
- 使用技術: $\mathbb F_2$ 上の行列計算
- 計算量: 中

底2、$m=2$ とし

$$
C_1
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
C_2
=
I_2
$$

とする。

次の周波数が双対ネット $P^\perp$ に属するか判定せよ。

$$
(1,1),\qquad
(1,2),\qquad
(2,1),\qquad
(3,3).
$$

<!-- solution-start -->
### 詳細解答

双対条件は

$$
C_1^{\mathsf T}\nu_2(k_1)
+
C_2^{\mathsf T}\nu_2(k_2)
=
0
$$

です。

$C_1$ は対称なので

$$
C_1^{\mathsf T}=C_1.
$$

まず

$$
\nu_2(1)=
\begin{pmatrix}1\\0\end{pmatrix},
\qquad
\nu_2(2)=
\begin{pmatrix}0\\1\end{pmatrix},
\qquad
\nu_2(3)=
\begin{pmatrix}1\\1\end{pmatrix}.
$$

$(1,1)$ では

$$
C_1
\begin{pmatrix}1\\0\end{pmatrix}
+
I_2
\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}0\\1\end{pmatrix}
+
\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}1\\1\end{pmatrix}
\ne0.
$$

従って双対には入りません。

$(1,2)$ では

$$
\begin{pmatrix}0\\1\end{pmatrix}
+
\begin{pmatrix}0\\1\end{pmatrix}
=
0
$$

なので双対に入ります。

$(2,1)$ では

$$
C_1
\begin{pmatrix}0\\1\end{pmatrix}
+
\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}1\\0\end{pmatrix}
+
\begin{pmatrix}1\\0\end{pmatrix}
=
0
$$

なので双対に入ります。

$(3,3)$ では

$$
C_1
\begin{pmatrix}1\\1\end{pmatrix}
+
\begin{pmatrix}1\\1\end{pmatrix}
=
\begin{pmatrix}1\\1\end{pmatrix}
+
\begin{pmatrix}1\\1\end{pmatrix}
=
0.
$$

従って双対に入ります。
<!-- solution-end -->

---

### 演習 QMC5-A4

- Level: A
- 主題: NRT 重み
- 使用技術: 最高位非零桁
- 計算量: 小

底2で次を求めよ。

1. $\mu_1(0),\mu_1(1),\mu_1(3),\mu_1(4),\mu_1(7),\mu_1(8)$
2. $\mu_1(1,2)$
3. $\mu_1(3,1)$
4. $\mu_1(0,8,2)$

<!-- solution-start -->
### 詳細解答

底2では

$$
\mu_1(k)
=
1+\lfloor\log_2k\rfloor
\qquad(k>0)
$$

です。

従って

$$
\mu_1(0)=0,
$$

$$
\mu_1(1)=1,
$$

$$
\mu_1(3)=2
$$

です。$3=(11)_2$ の最高位は $2^1$ だからです。

同様に

$$
\mu_1(4)=3,
\qquad
\mu_1(7)=3,
\qquad
\mu_1(8)=4.
$$

多次元では座標ごとに足すので

$$
\mu_1(1,2)
=
1+2
=
3,
$$

$$
\mu_1(3,1)
=
2+1
=
3,
$$

$$
\mu_1(0,8,2)
=
0+4+2
=
6.
$$
<!-- solution-end -->

---

### 演習 QMC5-B1

- Level: B
- 主題: 離散直交性の再構成
- 使用技術: 桁ベクトル・有限積
- 計算量: 中

底2、$m=2$、$s=1$ とし

$$
C=I_2
$$

から4点のデジタル点集合を作る。

1. 4点を具体的に求めよ。
2. $k=1,2,3,4$ について
   $$
   \frac14\sum_{x\in P}\operatorname{wal}_k(x)
   $$
   を計算せよ。
3. 双対条件
   $$
   C^{\mathsf T}\nu_2(k)=0
   $$
   と結果を照合せよ。

<!-- solution-start -->
### 詳細解答

$n=0,1,2,3$ の二進桁ベクトルを

$$
(n_0,n_1)^{\mathsf T}
$$

とします。

$C=I_2$ なので出力桁はそのまま

$$
(y_1,y_2)=(n_0,n_1).
$$

したがって点は

$$
x_n
=
\frac{n_0}{2}
+
\frac{n_1}{4}.
$$

各 $n$ について

$$
n=0:(0,0)\mapsto0,
$$

$$
n=1:(1,0)\mapsto1/2,
$$

$$
n=2:(0,1)\mapsto1/4,
$$

$$
n=3:(1,1)\mapsto3/4.
$$

従って

$$
P=\{0,1/2,1/4,3/4\}.
$$

順序は求積平均には影響しません。

$k=1$ では $\operatorname{wal}_1(x)=(-1)^{x_1}$ です。

先頭桁は $0,1,0,1$ を二回ずつ取るので

$$
\frac14(1-1+1-1)=0.
$$

$k=2$ は第二桁を見るので、第二桁も0と1を二回ずつ取り、

$$
\frac14\sum\operatorname{wal}_2=0.
$$

$k=3$ は

$$
\operatorname{wal}_3=(-1)^{x_1+x_2}
$$

です。

4種類の二桁

$$
00,10,01,11
$$

を一度ずつ取るため

$$
\frac14(1-1-1+1)=0.
$$

一方

$$
k=4=(100)_2
$$

は第三小数桁を見ます。

この点集合は $m=2$ 桁しか生成しておらず、第三桁はすべて0です。

従って

$$
\operatorname{wal}_4(x)=1
$$

が全点で成り立ち、

$$
\frac14\sum\operatorname{wal}_4=1.
$$

双対条件は

$$
\nu_2(k)=0
$$

です。

$k=1,2,3$ は下位2桁が非零なので双対外です。

$k=4$ は

$$
\nu_2(4)=
\begin{pmatrix}0\\0\end{pmatrix}
$$

なので双対に入ります。

離散平均の結果と完全に一致します。
<!-- solution-end -->

---

### 演習 QMC5-B2

- Level: B
- 主題: Walsh 誤差公式
- 使用技術: 双対周波数の抽出
- 計算量: 中

あるデジタル点集合 $P$ について

$$
(1,2),(3,3)\in P^\perp,
$$

$$
(1,1),(2,1)\notin P^\perp
$$

であるとする。

Walsh 多項式

$$
f(\boldsymbol x)
=
5
+
2\operatorname{wal}_{(1,1)}(\boldsymbol x)
-
3\operatorname{wal}_{(1,2)}(\boldsymbol x)
+
4\operatorname{wal}_{(2,1)}(\boldsymbol x)
+
\operatorname{wal}_{(3,3)}(\boldsymbol x)
$$

について

1. $I(f)$
2. $Q_P(f)$
3. $Q_P(f)-I(f)$

を求めよ。

<!-- solution-start -->
### 詳細解答

積分では非零 Walsh 周波数はすべて消えます。

したがって零周波数係数だけが残り、

$$
I(f)=5.
$$

点平均では双対ネットに属する周波数だけが残ります。

問題文より

$$
(1,2),(3,3)
$$

が双対に属し、

$$
(1,1),(2,1)
$$

は属しません。

従って

$$
Q_P(f)
=
5-3+1
=
3.
$$

よって誤差は

$$
Q_P(f)-I(f)
=
3-5
=
-2.
$$

誤差公式から直接計算しても

$$
-3+1=-2
$$

となり一致します。
<!-- solution-end -->

---

### 演習 QMC5-B3

- Level: B
- 主題: $t$ 値と双対 NRT 重み
- 使用技術: 双対条件・最小重み
- 計算量: 中

底2、$m=2$ とし

$$
C_1=C_2
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

とする。

1. $(1,1)\in P^\perp$ を示せ。
2. NRT 重み1の非零双対周波数が存在しないことを示せ。
3. $\rho_1(P)$ を求めよ。
4. 最小の $t$ 値を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\nu_2(1)
=
\begin{pmatrix}1\\0\end{pmatrix}.
$$

$\mathbb F_2$ 上では同じベクトルを二回足すと0なので

$$
C_1^{\mathsf T}\nu_2(1)
+
C_2^{\mathsf T}\nu_2(1)
=
2C_1^{\mathsf T}\nu_2(1)
=
0.
$$

従って

$$
(1,1)\in P^\perp.
$$

その NRT 重みは

$$
\mu_1(1,1)
=
1+1
=
2.
$$

次に NRT 重み1の非零ベクトルは

$$
(1,0)
$$

または

$$
(0,1)
$$

だけです。

$(1,0)$ に対する双対条件の左辺は

$$
C_1^{\mathsf T}
\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}0\\1\end{pmatrix}
\ne0.
$$

$(0,1)$ も同じ理由で双対には入りません。

従って非零双対周波数の最小重みは2です。

$$
\boxed{
\rho_1(P)=2
}
$$

です。

双対関係から

$$
t_{\min}
=
m-\rho_1(P)+1
=
2-2+1
=
1.
$$

したがって

$$
\boxed{
t_{\min}=1
}
$$

です。

QMC4 の行一次独立性による判定と同じ結論ですが、本問では低い Walsh 周波数が生き残ることから $t$ の悪化を読み取りました。
<!-- solution-end -->

---

### 演習 QMC5-C1

- Level: C
- 主題: 生成行列・双対ネット・NRT 重み・積分誤差の統合
- 使用技術: $\mathbb F_2$ 線形代数、Walsh 消去則
- 計算量: 大

底2、$m=3$、$s=2$ とし

$$
C_1
=
\begin{pmatrix}
0&0&1\\
0&1&0\\
1&0&0
\end{pmatrix},
\qquad
C_2
=
I_3
$$

を考える。

1. $k_1,k_2$ の下位3桁を
   $$
   \nu_3(k_1)
   =
   \begin{pmatrix}
   a_0\\a_1\\a_2
   \end{pmatrix},
   \qquad
   \nu_3(k_2)
   =
   \begin{pmatrix}
   c_0\\c_1\\c_2
   \end{pmatrix}
   $$
   としたとき、双対条件を成分表示せよ。
2. $(1,4),(2,2),(4,1)$ が双対ネットに属することを示せ。
3. NRT 重み3以下の非零双対周波数が存在しないことを示し、$\rho_1(P)$ と最小の $t$ 値を求めよ。
4. 
   $$
   f(\boldsymbol x)
   =
   7
   +
   2\operatorname{wal}_{(1,1)}(\boldsymbol x)
   -
   3\operatorname{wal}_{(1,4)}(\boldsymbol x)
   +
   5\operatorname{wal}_{(2,2)}(\boldsymbol x)
   $$
   に対する $I(f)$、$Q_P(f)$、積分誤差を求めよ。
5. この例から「$t=0$」を周波数側の言葉で説明せよ。

<!-- solution-start -->
### 詳細解答

### 1. 双対条件

$C_1$ は反転行列で対称なので

$$
C_1^{\mathsf T}=C_1.
$$

従って

$$
C_1^{\mathsf T}\nu_3(k_1)
=
\begin{pmatrix}
a_2\\a_1\\a_0
\end{pmatrix}.
$$

また

$$
C_2^{\mathsf T}\nu_3(k_2)
=
\begin{pmatrix}
c_0\\c_1\\c_2
\end{pmatrix}.
$$

よって双対条件は

$$
\begin{pmatrix}
a_2+c_0\\
a_1+c_1\\
a_0+c_2
\end{pmatrix}
=
0
$$

です。

すなわち

$$
\boxed{
c_0=a_2,\qquad
c_1=a_1,\qquad
c_2=a_0
}
$$

です。

### 2. 三つの双対周波数

まず

$$
1=(001)_2
$$

なので下位桁ベクトルは

$$
\nu_3(1)
=
\begin{pmatrix}1\\0\\0\end{pmatrix}.
$$

また

$$
4=(100)_2
$$

なので

$$
\nu_3(4)
=
\begin{pmatrix}0\\0\\1\end{pmatrix}.
$$

$k_1=1$ では

$$
(a_0,a_1,a_2)=(1,0,0)
$$

なので双対条件は

$$
(c_0,c_1,c_2)=(0,0,1),
$$

すなわち $k_2=4$ です。

従って

$$
(1,4)\in P^\perp.
$$

同様に

$$
2=(010)_2
$$

は反転しても $(010)_2$ のままなので

$$
(2,2)\in P^\perp.
$$

さらに

$$
4=(100)_2
$$

は反転すると $(001)_2$ なので

$$
(4,1)\in P^\perp.
$$

### 3. 最小双対 NRT 重み

上で得た三つは

$$
\mu_1(1,4)=1+3=4,
$$

$$
\mu_1(2,2)=2+2=4,
$$

$$
\mu_1(4,1)=3+1=4.
$$

したがって

$$
\rho_1(P)\le4.
$$

次に重み3以下の非零双対周波数がないことを示します。

双対条件では、$k_2$ の下位3桁は $k_1$ の下位3桁を逆順にしたものです。

$k_1$ の最高位非零桁位置を $r$ とし、最低位側から数えた対応する最初の非零桁が反転後に位置 $4-r$ へ移ると考えます。

より直接には、$k_1$ の下位3桁で非零成分がある位置を

$$
r\in\{1,2,3\}
$$

とします。

そのうち最も大きい位置を $r_{\max}$、最も小さい位置を $r_{\min}$ とします。

すると

$$
\mu_1(k_1)=r_{\max},
$$

反転した $k_2$ の最高位非零位置は

$$
4-r_{\min}
$$

なので

$$
\mu_1(k_2)=4-r_{\min}.
$$

従って

$$
\mu_1(k_1,k_2)
=
r_{\max}+4-r_{\min}
\ge4.
$$

等号は一つの桁だけが非零の場合などに実現します。

また、$k_1$ の下位3桁が全部0なら、双対条件により $k_2$ の下位3桁も0です。この場合に非零ベクトルを作るには少なくとも一方に第4桁以上が必要なので、その NRT 重みは少なくとも4です。

したがって

$$
\boxed{
\rho_1(P)=4
}
$$

です。

$m=3$ なので

$$
t_{\min}
=
m-\rho_1(P)+1
=
3-4+1
=
0.
$$

よって

$$
\boxed{
t_{\min}=0
}
$$

です。

### 4. 積分誤差

積分では非零 Walsh 周波数は消えるので

$$
I(f)=7.
$$

次に各周波数の双対所属を見ます。

$(1,4)$ と $(2,2)$ は2で双対に入ることを示しました。

一方 $(1,1)$ は双対条件

$$
c_2=a_0
$$

を満たしません。

実際 $k_1=1$ なら必要な $k_2$ の下位桁は $100$、すなわち4であり、1ではありません。

したがって

$$
Q_P(f)
=
7-3+5
=
9.
$$

よって

$$
\boxed{
Q_P(f)-I(f)=2
}
$$

です。

### 5. $t=0$ の周波数側の意味

$t=0$ と

$$
\rho_1(P)=m+1=4
$$

は同値です。

したがってこの点集合は

$$
\boxed{
\mu_1(\boldsymbol k)\le3
}
$$

を満たすすべての非零 Walsh 周波数を厳密に消します。

つまり3桁の解像度までで作れる「低い」Walsh 振動には共鳴せず、最初に生き残る周波数の NRT 重みが4まで押し上げられています。

これが $(0,3,2)$-ネットという幾何学的均等性の双対表現です。
<!-- solution-end -->

---

## 14. まとめ

本章では、デジタルネットを周波数側から読む道具を作りました。

まず $b$ 進桁に適合する Walsh 関数

$$
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
$$

を導入し、非零 Walsh 周波数の積分が0になることを $b$ 乗根の有限和から証明しました。

次に、生成行列

$$
C_1,\ldots,C_s
$$

に対して双対ネット

$$
P^\perp
=
\left\{
\boldsymbol k:
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)=0
\right\}
$$

を定義しました。

そして

$$
\boxed{
\frac1{b^m}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
1_{\{\boldsymbol k\in P^\perp\}}
}
$$

という離散直交性を完全に証明しました。

その結果、絶対収束 Walsh 級数に対する積分誤差は

$$
\boxed{
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
}
$$

となり、双対ネットに入った非零周波数だけが誤差を作ると分かります。

さらに NRT 重み

$$
\mu_1(\boldsymbol k)
$$

を導入し、最小双対 NRT 重み

$$
\rho_1(P)
$$

と $t$ 値の関係

$$
\boxed{
P\text{ が }(t,m,s)\text{-ネット}
\Longleftrightarrow
\rho_1(P)>m-t
}
$$

を証明しました。

最小の $t$ 値は

$$
\boxed{
t_{\min}=m-\rho_1(P)+1
}
$$

です。

したがってデジタルネットの設計は

$$
\boxed{
\text{低い NRT 重みの Walsh 周波数を双対ネットから追い出す}
}
$$

という周波数設計問題として捉えられます。

次の QMC6 では、有限体上の多項式を使ってこの双対構造を組織的に作る **polynomial lattice** へ進みます。
