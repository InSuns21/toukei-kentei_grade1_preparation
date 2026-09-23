# QMC6 準 Monte Carlo VI：多項式格子

QMC5 では、デジタル点集合を Walsh 周波数側から読み、

$$
\frac1{b^m}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
1_{\{\boldsymbol k\in P^\perp\}}
$$

という離散直交性を得ました。

ここまでで「良いデジタル点集合を作る」とは、

$$
\boxed{
\text{重要な低い Walsh 周波数を双対ネットから追い出す}
}
$$

ことだと分かっています。

では、生成行列

$$
C_1,\ldots,C_s
$$

を一枚ずつ直接探す代わりに、もっと構造化された生成法はないでしょうか。

本章では、整数格子則で生成ベクトルを法 $N$ の剰余類として扱った QMC3 の発想を、有限体多項式へ移します。

整数

$$
0,1,\ldots,b^m-1
$$

を次数 $m$ 未満の多項式へ読み替え、法多項式 $p(x)$ と生成多項式ベクトル

$$
\boldsymbol q(x)
=
(q_1(x),\ldots,q_s(x))
$$

を使って点を作ります。

これが **多項式格子** です。

本章の中心は

$$
\boxed{
\text{有限体多項式}
\longrightarrow
\text{多項式格子}
\longrightarrow
\text{デジタルネット}
\longrightarrow
\text{双対合同式}
\longrightarrow
\text{CBC 構成}
}
$$

です。

---

## 0. 本章で使う既出事項

QMC5 から次を使います。

- [Walsh 関数](../QMC5/index.md#def-qmc5-walsh-function)
- [デジタル点集合の双対ネット](../QMC5/index.md#def-qmc5-digital-dual-net)
- [デジタルネット上の Walsh 関数の離散直交性](../QMC5/index.md#thm-qmc5-digital-character-property)
- [絶対収束 Walsh 級数に対する積分誤差公式](../QMC5/index.md#thm-qmc5-absolute-walsh-error)
- [NRT 重み](../QMC5/index.md#def-qmc5-nrt-weight)
- [t 値と最小双対 NRT 重みの双対関係](../QMC5/index.md#thm-qmc5-t-value-duality)

また FLD1 の [既約多項式による単純拡大の構成](../FLD1/index.md#prop-fld1-irreducible-quotient-construction) を使います。

本章では底 $b$ を素数とし、

$$
\mathbb F_b
=
\mathbb Z/b\mathbb Z
$$

とします。

法多項式は

$$
p(x)\in\mathbb F_b[x]
$$

のモニック既約多項式で、

$$
\deg p=m
$$

とします。

従って FLD1 の命題により

$$
\mathbb F_b[x]/(p)
$$

は $b^m$ 元の体です。

> **停止線**  
> 本章では通常の polynomial lattice と、その一次の Walsh 双対構造を扱います。digital shift・scrambling は QMC7、複数の非零桁位置を使う高次 Walsh 重みと higher-order digital net は QMC8 へ送ります。

---

## 1. 整数を有限体多項式へ読み替える

QMC4、QMC5 では整数 $n$ や周波数 $k$ の $b$ 進桁をベクトルとして使いました。

本章では同じ桁列を、多項式の係数とみなします。

<a id="def-qmc6-digit-polynomial"></a>
<!-- formal-statement-start -->
### 定義（桁多項式）

整数

$$
0\le n<b^m
$$

を

$$
n
=
n_0+n_1b+\cdots+n_{m-1}b^{m-1},
\qquad
n_r\in\{0,\ldots,b-1\}
$$

と書く。

各桁を $\mathbb F_b$ の元とみなし、

$$
\boxed{
n(x)
=
n_0+n_1x+\cdots+n_{m-1}x^{m-1}
\in
\mathbb F_b[x]
}
$$

を $n$ の **桁多項式** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-digit-polynomial -->
**定義の確認**：底2、$m=3$

整数 $5$ は

$$
5=(101)_2
=
1+0\cdot2+1\cdot2^2
$$

なので、

$$
\boxed{
5(x)=1+x^2
}
$$

です。

整数の通常の積と多項式の積は同じではありません。ここで保存しているのは **桁列** です。

たとえば底2で

$$
3=(11)_2
$$

から

$$
3(x)=1+x
$$

ですが、

$$
3^2=9=(1001)_2
$$

である一方、

$$
(1+x)^2
=
1+x^2
$$

です。

多項式側では係数を $\mathbb F_2$ で計算するため、中間係数 $2x$ が消えます。
<!-- definition-example-end -->

この読み替えにより、

$$
n=0,\ldots,b^m-1
$$

を走らせることは、

$$
\deg n(x)<m
$$

を満たすすべての多項式を一度ずつ走らせることと同じです。

---

## 2. 有理関数から $b$ 進小数桁を取り出す

多項式格子では

$$
\frac{n(x)q(x)}{p(x)}
$$

の「無限遠点まわりの負べき係数」から小数桁を作ります。

ここだけ見ると急に形式的に見えますが、必要なのは通常の長除法と同じ再帰計算です。

### 2.1 $x^{-1}$ を小さい量とみなす

$p(x)$ はモニックで $\deg p=m$ なので、

$$
p(x)
=
x^m
\left(
1+a_1x^{-1}+\cdots+a_mx^{-m}
\right)
$$

と書けます。

従って

$$
\frac1{p(x)}
=
x^{-m}
\frac1{
1+a_1x^{-1}+\cdots+a_mx^{-m}
}
$$

です。

右辺の逆数部分を

$$
1+c_1x^{-1}+c_2x^{-2}+\cdots
$$

と置き、積が1になるよう係数を順に決めればよいので、必要な有限個の係数は有限回の計算で求まります。

<a id="def-qmc6-vm-map"></a>
<!-- formal-statement-start -->
### 定義（負べき係数からの桁写像）

$\mathbb F_b$ の係数を標準代表

$$
0,1,\ldots,b-1
$$

へ読み替える。

形式的な負べき展開

$$
L(x)
=
\sum_{\ell=w}^{\infty}
t_\ell x^{-\ell},
\qquad
t_\ell\in\mathbb F_b
$$

に対し、

$$
\boxed{
v_m(L)
=
\sum_{\ell=1}^{m}
t_\ell b^{-\ell}
}
$$

と定める。

すなわち $x^{-1},\ldots,x^{-m}$ の係数だけを、先頭 $m$ 個の $b$ 進小数桁として読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-vm-map -->
**定義の確認**：底2、$p(x)=x^2+x+1$

$y=x^{-1}$ と置くと

$$
p(x)
=
x^2(1+y+y^2).
$$

$\mathbb F_2$ 上で

$$
(1+y+y^2)(1+y^2+y^3+y^5+\cdots)=1
$$

なので、

$$
\frac1{p(x)}
=
x^{-2}+x^{-4}+x^{-5}+\cdots.
$$

従って $m=2$ なら

$$
v_2\left(\frac1p\right)
=
0\cdot2^{-1}+1\cdot2^{-2}
=
\boxed{\frac14}.
$$

また

$$
\frac{x}{p(x)}
=
x^{-1}+x^{-2}+x^{-4}+\cdots
$$

なので

$$
v_2\left(\frac{x}{p}\right)
=
\frac12+\frac14
=
\boxed{\frac34}.
$$

ここで本当に使ったのは最初の2桁だけです。
<!-- definition-example-end -->

---

## 3. 多項式格子点集合

<a id="def-qmc6-polynomial-lattice"></a>
<!-- formal-statement-start -->
### 定義（多項式格子点集合）

素数 $b$、モニック既約多項式

$$
p(x)\in\mathbb F_b[x],
\qquad
\deg p=m
$$

を固定する。

生成多項式ベクトルを

$$
\boldsymbol q
=
(q_1,\ldots,q_s),
\qquad
q_j\in\mathbb F_b[x],
\qquad
\deg q_j<m
$$

とする。

各

$$
n=0,\ldots,b^m-1
$$

に対し、

$$
\boxed{
\boldsymbol x_n
=
\left(
v_m\left(\frac{n(x)q_1(x)}{p(x)}\right),
\ldots,
v_m\left(\frac{n(x)q_s(x)}{p(x)}\right)
\right)
}
$$

と定める。

点集合

$$
\boxed{
P(p,\boldsymbol q)
=
\{\boldsymbol x_n:n=0,\ldots,b^m-1\}
}
$$

を、法多項式 $p$、生成多項式ベクトル $\boldsymbol q$ の **多項式格子点集合** と呼ぶ。

この点集合を等重み求積に使うとき、対応する求積則を **多項式格子則** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-polynomial-lattice -->
**定義の確認**：4点の二次元例

$$
b=2,
\qquad
m=2,
\qquad
p(x)=x^2+x+1,
\qquad
\boldsymbol q=(1,x)
$$

とします。

前節から

$$
\frac1p
=
x^{-2}+x^{-4}+x^{-5}+\cdots,
$$

$$
\frac{x}{p}
=
x^{-1}+x^{-2}+x^{-4}+\cdots
$$

です。

$n=0,1,2,3$ に対する桁多項式は

$$
0,\quad
1,\quad
x,\quad
1+x.
$$

まず $n=0$ では

$$
\boldsymbol x_0=(0,0).
$$

$n=1$ では

$$
x_{1,1}
=
v_2(1/p)
=
\frac14,
$$

$$
x_{1,2}
=
v_2(x/p)
=
\frac34,
$$

よって

$$
\boldsymbol x_1
=
\left(\frac14,\frac34\right).
$$

$n=2$ では $n(x)=x$ なので、

$$
x_{2,1}
=
v_2(x/p)
=
\frac34.
$$

また

$$
\frac{x^2}{p}
=
1+\frac{x+1}{p}.
$$

多項式部分 $1$ は負べき係数に寄与しません。

計算すると先頭2小数桁は $10$ なので

$$
x_{2,2}
=
\frac12.
$$

従って

$$
\boldsymbol x_2
=
\left(\frac34,\frac12\right).
$$

最後に $n=3$ では線形性から

$$
\boldsymbol x_3
=
\left(\frac12,\frac14\right).
$$

したがって

$$
\boxed{
P(p,(1,x))
=
\left\{
(0,0),
\left(\frac14,\frac34\right),
\left(\frac34,\frac12\right),
\left(\frac12,\frac14\right)
\right\}.
}
$$
<!-- definition-example-end -->

---

## 4. 多項式格子はデジタル点集合である

多項式格子は QMC4 のデジタル点集合と別物ではありません。

法多項式と生成多項式から、生成行列が自動的に作られる特殊なデジタル点集合です。

各 $j$ について

$$
\frac{q_j(x)}{p(x)}
=
\sum_{\ell=1}^{\infty}
t_{j,\ell}x^{-\ell}
$$

と展開します。

$n(x)$ の係数 $n_r$ を掛けると、

$$
\frac{n(x)q_j(x)}{p(x)}
=
\sum_{r=0}^{m-1}
n_r x^r
\sum_{\ell=1}^{\infty}
t_{j,\ell}x^{-\ell}.
$$

$x^{-a}$ の係数は

$$
\sum_{r=0}^{m-1}
t_{j,a+r}n_r
$$

です。

従って生成行列の $(a,r+1)$ 成分は自然に

$$
t_{j,a+r}
$$

となります。

<a id="thm-qmc6-digital-representation"></a>
<!-- formal-statement-start -->
### 定理（多項式格子のデジタルネット表示）

$P(p,\boldsymbol q)$ を上の多項式格子点集合とする。

各 $j$ について

$$
\frac{q_j(x)}{p(x)}
=
\sum_{\ell=1}^{\infty}
t_{j,\ell}x^{-\ell}
$$

とし、

$$
\boxed{
(C_j)_{a,r+1}
=
t_{j,a+r},
\qquad
1\le a\le m,
\quad
0\le r\le m-1
}
$$

で

$$
C_j\in\mathbb F_b^{m\times m}
$$

を定める。

このとき $P(p,\boldsymbol q)$ は、生成行列

$$
C_1,\ldots,C_s
$$

から QMC4 の方法で作る $b^m$ 点のデジタル点集合と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$n(x)$ の係数ベクトル

$$
(n_0,\ldots,n_{m-1})^{\mathsf T}
$$

を生成行列へ掛けると、ちょうど

$$
n(x)q_j(x)/p(x)
$$

の $x^{-1},\ldots,x^{-m}$ の係数が出ることを確認します。

<!-- proof-start -->
### 証明

$n(x)$ を

$$
n(x)
=
\sum_{r=0}^{m-1}
n_rx^r
$$

と書きます。

第 $j$ 座標について

$$
\frac{n(x)q_j(x)}{p(x)}
=
\sum_{r=0}^{m-1}
n_r
\sum_{\ell=1}^{\infty}
t_{j,\ell}x^{r-\ell}.
$$

$x^{-a}$ が現れるのは

$$
r-\ell=-a
$$

すなわち

$$
\ell=a+r
$$

のときです。

従って $x^{-a}$ の係数 $y_{j,a}$ は

$$
y_{j,a}
=
\sum_{r=0}^{m-1}
t_{j,a+r}n_r.
$$

一方、定義した $C_j$ に対し

$$
\begin{pmatrix}
y_{j,1}\\
\vdots\\
y_{j,m}
\end{pmatrix}
=
C_j
\begin{pmatrix}
n_0\\
\vdots\\
n_{m-1}
\end{pmatrix}.
$$

これは QMC4 のデジタル点集合の桁生成式そのものです。

さらに $v_m$ は

$$
y_{j,1},\ldots,y_{j,m}
$$

を

$$
\sum_{a=1}^{m}y_{j,a}b^{-a}
$$

へ読み替えるので、多項式格子の第 $j$ 座標と QMC4 のデジタル構成の第 $j$ 座標は一致します。

全座標について一致するため、点集合全体が一致します。
<!-- proof-end -->

### 4.1 4点例の生成行列

前の例では

$$
\frac1p
=
0x^{-1}+1x^{-2}+1x^{-3}+\cdots
$$

なので、

$$
C_1
=
\begin{pmatrix}
0&1\\
1&1
\end{pmatrix}.
$$

また

$$
\frac{x}{p}
=
1x^{-1}+1x^{-2}+0x^{-3}+\cdots
$$

なので、

$$
C_2
=
\begin{pmatrix}
1&1\\
1&0
\end{pmatrix}.
$$

$n=1$ の桁ベクトルは $(1,0)^{\mathsf T}$ ですから、

$$
C_1
\begin{pmatrix}
1\\0
\end{pmatrix}
=
\begin{pmatrix}
0\\1
\end{pmatrix},
$$

$$
C_2
\begin{pmatrix}
1\\0
\end{pmatrix}
=
\begin{pmatrix}
1\\1
\end{pmatrix}.
$$

従って座標は

$$
(0.01_2,0.11_2)
=
\left(\frac14,\frac34\right),
$$

確かに前節の点と一致します。

---

## 5. 周波数も多項式へ読み替える

QMC5 の双対ネットは、周波数 $k_j$ の下位 $m$ 桁ベクトル

$$
\nu_m(k_j)
$$

だけを見ていました。

多項式格子では、これも多項式へ戻します。

<a id="def-qmc6-frequency-truncation"></a>
<!-- formal-statement-start -->
### 定義（周波数の切断多項式）

整数

$$
k
=
\kappa_0+\kappa_1b+\kappa_2b^2+\cdots
$$

に対し、

$$
\boxed{
\operatorname{tr}_m(k)
=
\kappa_0+\kappa_1x+\cdots+\kappa_{m-1}x^{m-1}
\in
\mathbb F_b[x]
}
$$

と定める。

すなわち $k$ の下位 $m$ 個の $b$ 進桁を、多項式の係数として読む。

ベクトル

$$
\boldsymbol k=(k_1,\ldots,k_s)
$$

には成分ごとに $\operatorname{tr}_m$ を適用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-frequency-truncation -->
**定義の確認**：底2、$m=3$

$$
k=13=(1101)_2
$$

では、下位3桁は

$$
101
$$

なので

$$
\boxed{
\operatorname{tr}_3(13)=1+x^2.
}
$$

第4桁以上は切り捨てられます。

これは QMC5 の双対ネットが $\nu_m(k)$ だけを使うことの多項式版です。
<!-- definition-example-end -->

---

## 6. 双対多項式格子

多項式格子の強みは、QMC5 の行列方程式

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
=
0
$$

を、一つの多項式合同式に圧縮できることです。

<a id="def-qmc6-dual-polynomial-lattice"></a>
<!-- formal-statement-start -->
### 定義（双対多項式格子）

多項式格子

$$
P(p,\boldsymbol q)
$$

に対し、

$$
\boxed{
P^\perp(p,\boldsymbol q)
=
\left\{
\boldsymbol k\in\mathbb N_0^s:
\sum_{j=1}^s
\operatorname{tr}_m(k_j)q_j
\equiv0
\pmod p
\right\}
}
$$

を **双対多項式格子** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-dual-polynomial-lattice -->
**定義の確認**：$p=x^2+x+1$、$\boldsymbol q=(1,x)$

底2、$m=2$ とします。

$\boldsymbol k=(1,3)$ なら

$$
\operatorname{tr}_2(1)=1,
$$

$$
\operatorname{tr}_2(3)=1+x.
$$

従って

$$
\operatorname{tr}_2(1)\cdot1
+
\operatorname{tr}_2(3)\cdot x
=
1+(1+x)x.
$$

$\mathbb F_2[x]$ で計算すると

$$
1+x+x^2.
$$

これは

$$
p(x)=x^2+x+1
$$

そのものなので、

$$
\boxed{
(1,3)\in P^\perp(p,(1,x)).
}
$$

一方 $\boldsymbol k=(1,1)$ では

$$
1+x
$$

となり $p$ で割り切れないため、

$$
\boxed{
(1,1)\notin P^\perp(p,(1,x)).
}
$$
<!-- definition-example-end -->

---

## 7. 多項式合同式と QMC5 の双対ネットは同じ条件である

この同値性が本章の核心です。

<a id="thm-qmc6-dual-equivalence"></a>
<!-- formal-statement-start -->
### 定理（双対多項式格子とデジタル双対ネットの一致）

$P(p,\boldsymbol q)$ に第4節の生成行列

$$
C_1,\ldots,C_s
$$

を対応させる。

任意の

$$
\boldsymbol k\in\mathbb N_0^s
$$

について、次は同値である。

1.

$$
\sum_{j=1}^s
\operatorname{tr}_m(k_j)q_j
\equiv0
\pmod p.
$$

2.

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
=
0
\quad\text{in }\mathbb F_b^m.
$$

従って、双対多項式格子は QMC5 のデジタル双対ネットと集合として一致する。
<!-- formal-statement-end -->

### 証明の見取り図

多項式

$$
A(x)
=
\sum_j
\operatorname{tr}_m(k_j)q_j
$$

を $p$ で割り、

$$
A=hp+r,
\qquad
\deg r<m
$$

とします。

$A/p$ の負べき部分は $r/p$ と同じです。

QMC5 のベクトル

$$
\sum_jC_j^{\mathsf T}\nu_m(k_j)
$$

は、ちょうど $A/p$ の

$$
x^{-1},\ldots,x^{-m}
$$

の係数を並べたものです。

最後に、

$$
r\ne0
$$

なら $r/p$ の最初の非零負べき項は必ず $x^{-1}$ から $x^{-m}$ のどこかへ現れることを使います。

<!-- proof-start -->
### 証明

各 $k_j$ を

$$
k_j
=
\kappa_{j,0}
+
\kappa_{j,1}b
+\cdots
$$

とし、

$$
a_j(x)
=
\operatorname{tr}_m(k_j)
=
\sum_{\ell=0}^{m-1}
\kappa_{j,\ell}x^\ell
$$

と置きます。

また

$$
\frac{q_j(x)}{p(x)}
=
\sum_{u=1}^{\infty}
t_{j,u}x^{-u}.
$$

すると

$$
\frac{a_j(x)q_j(x)}{p(x)}
=
\sum_{\ell=0}^{m-1}
\kappa_{j,\ell}x^\ell
\sum_{u=1}^{\infty}
t_{j,u}x^{-u}.
$$

$x^{-(r+1)}$ の係数は

$$
\sum_{\ell=0}^{m-1}
\kappa_{j,\ell}
t_{j,r+1+\ell}.
$$

一方、

$$
(C_j)_{a,r+1}=t_{j,a+r}
$$

なので、

$$
\left(
C_j^{\mathsf T}\nu_m(k_j)
\right)_{r+1}
=
\sum_{a=1}^{m}
t_{j,a+r}\kappa_{j,a-1}.
$$

添字を

$$
\ell=a-1
$$

と変えれば、これは上で求めた

$$
x^{-(r+1)}
$$

の係数そのものです。

従って

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_m(k_j)
$$

は、

$$
\frac{A(x)}{p(x)},
\qquad
A(x)
=
\sum_{j=1}^s
a_j(x)q_j(x)
$$

の

$$
x^{-1},\ldots,x^{-m}
$$

の係数を並べたベクトルです。

次に多項式除法で

$$
A(x)
=
h(x)p(x)+r(x),
\qquad
\deg r<m
$$

と書きます。

すると

$$
\frac{A}{p}
=
h+\frac rp.
$$

$h$ は多項式なので負べき係数を持ちません。

よって $A/p$ の負べき係数は $r/p$ の負べき係数と一致します。

もし

$$
r=0
$$

なら当然すべての負べき係数は0です。

逆に

$$
r\ne0
$$

とします。

$$
\deg r=d<m
$$

とし、先頭係数を $c\ne0$ とします。

$p$ はモニックで次数 $m$ なので、無限遠点で

$$
\frac{r(x)}{p(x)}
=
c x^{d-m}
+
\text{より低い次数の負べき項}.
$$

ここで

$$
1\le m-d\le m
$$

なので、先頭の非零負べき項は

$$
x^{-(m-d)}
$$

であり、

$$
x^{-1},\ldots,x^{-m}
$$

の範囲内に必ず現れます。

従って最初の $m$ 個の負べき係数が全部0なら

$$
r=0
$$

でなければなりません。

以上から

$$
\sum_jC_j^{\mathsf T}\nu_m(k_j)=0
$$

と

$$
r=0
$$

は同値です。

$r=0$ は

$$
p\mid A
$$

すなわち

$$
A\equiv0\pmod p
$$

と同値なので、主張が従います。
<!-- proof-end -->

この定理により、QMC5 の Walsh 双対理論をそのまま多項式合同式へ移せます。

---

## 8. Walsh 周波数消去則と積分誤差

<a id="cor-qmc6-character-property"></a>
<!-- formal-statement-start -->
### 系（多項式格子の Walsh 周波数消去則）

任意の

$$
\boldsymbol k\in\mathbb N_0^s
$$

に対し、

$$
\boxed{
\frac1{b^m}
\sum_{\boldsymbol x\in P(p,\boldsymbol q)}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
\begin{cases}
1,
&
\displaystyle
\sum_{j=1}^s
\operatorname{tr}_m(k_j)q_j
\equiv0\pmod p,
\\
0,
&
\text{otherwise}.
\end{cases}
}
$$
<!-- formal-statement-end -->

### 導出

第4節で $P(p,\boldsymbol q)$ はデジタル点集合であることを示しました。

第7節で、そのデジタル双対ネットが双対多項式格子と一致することを示しました。

従って QMC5 の [デジタルネット上の Walsh 関数の離散直交性](../QMC5/index.md#thm-qmc5-digital-character-property) をそのまま適用できます。

新しい証明を重複して作る必要はありません。

<a id="cor-qmc6-walsh-error"></a>
<!-- formal-statement-start -->
### 系（多項式格子の Walsh 積分誤差公式）

$f$ が絶対収束 Walsh 級数

$$
f(\boldsymbol x)
=
\sum_{\boldsymbol k\in\mathbb N_0^s}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
$$

を持つとする。

このとき

$$
\boxed{
Q_{p,\boldsymbol q}(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\ne\boldsymbol0\\
\sum_j\operatorname{tr}_m(k_j)q_j\equiv0\pmod p
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 導出

QMC5 の [絶対収束 Walsh 級数に対する積分誤差公式](../QMC5/index.md#thm-qmc5-absolute-walsh-error) で、

$$
P^\perp
$$

を第7節の双対多項式格子へ読み替えるだけです。

この式は polynomial lattice の設計原理を非常に直接的に示します。

$$
\boxed{
\text{生成多項式 }\boldsymbol q
\text{ を選ぶ}
\Longleftrightarrow
\text{合同式を満たす Walsh 周波数を選別する}
}
$$

ということです。

---

## 9. $t$ 値も合同式から読める

QMC5 では、デジタル点集合の最小双対 NRT 重み

$$
\rho_1(P)
$$

から最小 $t$ 値を計算しました。

多項式格子では双対所属を合同式で判定できるので、

$$
\rho_1
$$

も多項式合同式から調べられます。

<a id="cor-qmc6-t-value"></a>
<!-- formal-statement-start -->
### 系（多項式格子の $t$ 値判定）

多項式格子

$$
P(p,\boldsymbol q)
$$

に対し、

$$
\boxed{
\rho_1(p,\boldsymbol q)
=
\min\left\{
\mu_1(\boldsymbol k):
\boldsymbol k\ne\boldsymbol0,\ 
\sum_{j=1}^s
\operatorname{tr}_m(k_j)q_j
\equiv0\pmod p
\right\}
}
$$

と置く。

このとき QMC5 の双対定理により、

$$
P(p,\boldsymbol q)
\text{ が }(t,m,s)\text{-ネット}
$$

であることと

$$
\boxed{
\rho_1(p,\boldsymbol q)>m-t
}
$$

は同値である。

特に最小 $t$ 値は

$$
\boxed{
t_{\min}
=
m-\rho_1(p,\boldsymbol q)+1
}
$$

である。
<!-- formal-statement-end -->

### 9.1 4点例は $(0,2,2)$-ネット

再び

$$
p=x^2+x+1,
\qquad
\boldsymbol q=(1,x)
$$

を考えます。

$(1,3)$ は双対に入り、

$$
\mu_1(1,3)
=
1+2
=
3.
$$

また

$$
(2,1)
$$

も双対に入り、

$$
\mu_1(2,1)
=
2+1
=
3.
$$

従って

$$
\rho_1\le3.
$$

一方、NRT 重みが1または2の非零ベクトルは、下位2桁を直接調べれば双対合同式を満たしません。

したがって

$$
\boxed{
\rho_1=3.
}
$$

$m=2$ なので

$$
t_{\min}
=
2-3+1
=
0.
$$

従ってこの4点集合は

$$
\boxed{
(0,2,2)\text{-ネット}
}
$$

です。

---

## 10. 共通の単元倍は点集合を変えない

QMC3 のランク1格子では、生成ベクトル全体を法 $N$ の単元倍しても点集合は同じでした。

多項式格子にも全く同じ対称性があります。

$p$ が既約なので、

$$
\mathbb F_b[x]/(p)
$$

の非零元はすべて単元です。

<a id="thm-qmc6-unit-scaling"></a>
<!-- formal-statement-start -->
### 定理（生成多項式ベクトルの共通単元倍不変性）

$a(x)\in\mathbb F_b[x]$ が

$$
0<\deg a<m
$$

または定数非零多項式で、

$$
a\not\equiv0\pmod p
$$

とする。

$\boldsymbol q=(q_1,\ldots,q_s)$ に対し、各成分を法 $p$ で還元して

$$
a\boldsymbol q
=
(aq_1,\ldots,aq_s)
\pmod p
$$

とする。

このとき点集合として

$$
\boxed{
P(p,a\boldsymbol q)
=
P(p,\boldsymbol q).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$a$ は剰余体

$$
\mathbb F_b[x]/(p)
$$

の非零元なので、掛け算

$$
[n]\longmapsto[na]
$$

は剰余類全体の置換です。

添字 $n$ が並べ替わるだけで、点集合は変わりません。

<!-- proof-start -->
### 証明

FLD1 の既約多項式による商体構成から、

$$
K
=
\mathbb F_b[x]/(p)
$$

は体です。

$a\not\equiv0\pmod p$ なので、

$$
[a]\in K^\times.
$$

従って写像

$$
T_a:K\to K,
\qquad
[z]\mapsto[az]
$$

は逆写像

$$
T_{a^{-1}}
$$

を持つ全単射です。

次数 $m$ 未満の多項式は $K$ の各剰余類をちょうど一つずつ代表するので、

$$
n(x),
\qquad
0\le n<b^m
$$

を走らせた集合と、

$$
n(x)a(x)\pmod p
$$

を走らせた集合は同じです。

一方、

$$
n(x)a(x)q_j(x)
$$

を $p$ で割ったとき、$p$ の倍数を加減しても商に多項式が増減するだけで、負べき係数は変わりません。

従って各 $n$ に対する点は、別の添字 $n'$ に対する元の点と一致します。

よって点の順序は変わり得ますが、集合として

$$
P(p,a\boldsymbol q)
=
P(p,\boldsymbol q)
$$

です。
<!-- proof-end -->

### 10.1 第一成分を1へ正規化できる

もし

$$
q_1\not\equiv0\pmod p
$$

なら、

$$
a\equiv q_1^{-1}\pmod p
$$

を取れます。

従って

$$
a q_1\equiv1\pmod p.
$$

よって点集合を変えずに

$$
\boxed{
q_1=1
}
$$

と正規化できます。

これは CBC 構成で第一成分を固定して探索量を減らす理由です。

### 10.2 4点例の確認

$$
\boldsymbol q=(1,x)
$$

へ $a=x$ を掛けます。

法

$$
p=x^2+x+1
$$

では

$$
x^2\equiv x+1
\pmod p
$$

なので、

$$
x\boldsymbol q
\equiv
(x,x+1)
\pmod p.
$$

定理により

$$
\boxed{
P(p,(1,x))
=
P(p,(x,x+1)).
}
$$

生成ベクトルは違って見えても、同じ点集合です。

---

## 11. 何を最小化して生成ベクトルを選ぶか

「双対ネットから低周波を追い出す」を数値化するため、Walsh 係数に対する単純な減衰モデルを置きます。

ここでは QMC8 の高次理論へ踏み込まず、NRT 重みだけを使います。

$\alpha>1$ と正の座標重み

$$
\gamma_1,\ldots,\gamma_s>0
$$

を固定します。

整数 $k\ge0$ に対し

$$
r_{\alpha,\gamma_j}(k)
=
\begin{cases}
1,&k=0,\\
\gamma_j b^{-\alpha\mu_1(k)},&k>0
\end{cases}
$$

と置き、

$$
r_{\alpha,\boldsymbol\gamma}(\boldsymbol k)
=
\prod_{j=1}^s
r_{\alpha,\gamma_j}(k_j)
$$

とします。

$\alpha>1$ ならこの重みは全周波数上で可算和可能です。

実際、一変数で

$$
\mu_1(k)=a
$$

となる正整数は

$$
(b-1)b^{a-1}
$$

個なので、

$$
\sum_{k=1}^{\infty}
b^{-\alpha\mu_1(k)}
=
\sum_{a=1}^{\infty}
(b-1)b^{a-1}b^{-\alpha a}.
$$

従って

$$
=
\frac{b-1}{b}
\sum_{a=1}^{\infty}
b^{(1-\alpha)a}
$$

で、$\alpha>1$ なら収束します。

<a id="def-qmc6-walsh-merit"></a>
<!-- formal-statement-start -->
### 定義（NRT 減衰型 Walsh 評価関数）

$\alpha>1$、$\gamma_j>0$ とする。

多項式格子

$$
P(p,\boldsymbol q)
$$

に対し、

$$
\boxed{
B_{\alpha,\boldsymbol\gamma}(p,\boldsymbol q)
=
\sum_{\substack{
\boldsymbol k\in P^\perp(p,\boldsymbol q)\\
\boldsymbol k\ne\boldsymbol0
}}
r_{\alpha,\boldsymbol\gamma}(\boldsymbol k)
}
$$

を本章の **NRT 減衰型 Walsh 評価関数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-walsh-merit -->
**定義の確認**：低い双対周波数ほど強く効く

二つの双対周波数

$$
\boldsymbol k^{(1)},
\qquad
\boldsymbol k^{(2)}
$$

があり、

$$
\mu_1(\boldsymbol k^{(1)})<
\mu_1(\boldsymbol k^{(2)})
$$

とします。

座標重みが同程度なら、

$$
r_{\alpha,\boldsymbol\gamma}(\boldsymbol k^{(1)})
$$

の方が大きくなります。

したがって評価関数を小さくすることは、特に **NRT 重みの小さい双対周波数を避ける**ことへ強い罰則をかけます。

QMC5 の $t$ 値の解釈と整合しています。
<!-- definition-example-end -->

<a id="thm-qmc6-merit-error-bound"></a>
<!-- formal-statement-start -->
### 定理（Walsh 係数の減衰と評価関数による誤差上界）

$f$ が絶対収束 Walsh 級数を持ち、ある $M\ge0$ に対して

$$
\boxed{
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|
\le
M
r_{\alpha,\boldsymbol\gamma}(\boldsymbol k)
\qquad
(\boldsymbol k\ne\boldsymbol0)
}
$$

を満たすとする。

このとき

$$
\boxed{
|Q_{p,\boldsymbol q}(f)-I(f)|
\le
M
B_{\alpha,\boldsymbol\gamma}(p,\boldsymbol q).
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第8節の積分誤差公式から

$$
Q_{p,\boldsymbol q}(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in P^\perp(p,\boldsymbol q)\\
\boldsymbol k\ne\boldsymbol0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k).
$$

従って三角不等式より

$$
|Q_{p,\boldsymbol q}(f)-I(f)|
\le
\sum_{\substack{
\boldsymbol k\in P^\perp(p,\boldsymbol q)\\
\boldsymbol k\ne\boldsymbol0
}}
\left|
\widehat f_{\mathrm{wal}}(\boldsymbol k)
\right|.
$$

仮定を代入すると

$$
\le
M
\sum_{\substack{
\boldsymbol k\in P^\perp(p,\boldsymbol q)\\
\boldsymbol k\ne\boldsymbol0
}}
r_{\alpha,\boldsymbol\gamma}(\boldsymbol k).
$$

右辺の和は定義により

$$
M
B_{\alpha,\boldsymbol\gamma}(p,\boldsymbol q)
$$

です。
<!-- proof-end -->

> **重要**  
> ここで $\alpha$ を「関数の微分階数」と同一視していません。本章では Walsh 係数の減衰を仮定した評価関数として使っています。滑らかさからどのような Walsh 係数減衰が従うか、複数の非零桁をどう数えるかは QMC8 で扱います。

---

## 12. 成分逐次構成

生成ベクトル

$$
(q_1,\ldots,q_s)
$$

を全候補から一度に探すと、候補数は次元とともに指数的に増えます。

そこで QMC3 の格子則と同じく、座標を一つずつ追加します。

既約 $p$ に対し、

$$
G_{b,m}
=
\{
q\in\mathbb F_b[x]:
0\le\deg q<m
\}
$$

と置き、

$$
G_{b,m}^{\times}
=
G_{b,m}\setminus\{0\}
$$

とします。

$p$ が既約なので、$G_{b,m}^{\times}$ の各元は法 $p$ で単元を表します。

<a id="def-qmc6-cbc"></a>
<!-- formal-statement-start -->
### 定義（多項式格子の成分逐次構成）

法多項式 $p$、パラメータ $\alpha>1$、座標重み $\gamma_j>0$ を固定する。

第一成分を

$$
q_1=1
$$

とする。

$d=2,\ldots,s$ について、すでに

$$
q_1,\ldots,q_{d-1}
$$

が決まっているとき、

$$
\boxed{
q_d
\in
\operatorname*{arg\,min}_{q\in G_{b,m}^{\times}}
B_{\alpha,(\gamma_1,\ldots,\gamma_d)}
\left(
p,
(q_1,\ldots,q_{d-1},q)
\right)
}
$$

となる $q_d$ を一つ選ぶ。

この手順を **成分逐次構成** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc6-cbc -->
**定義の確認**：候補集合は有限

$$
|G_{b,m}|=b^m
$$

なので、

$$
|G_{b,m}^{\times}|=b^m-1.
$$

従って各段階で比較する候補は有限個です。

最小値は必ず達成されます。

一方、全 $s$ 成分を一括探索すると候補は概ね

$$
(b^m-1)^{s-1}
$$

個です。

CBC はこれを

$$
(s-1)(b^m-1)
$$

回の候補評価へ分解する考え方です。

評価関数そのものの高速計算法は実装上の別問題ですが、「生成ベクトル探索を座標方向へ分解する」という組合せ爆発回避の骨格がここにあります。
<!-- definition-example-end -->

<a id="prop-qmc6-cbc-step"></a>
<!-- formal-statement-start -->
### 命題（各 CBC 段階の最小化は well-defined）

各 $d$ において、

$$
q\longmapsto
B_{\alpha,(\gamma_1,\ldots,\gamma_d)}
\left(
p,
(q_1,\ldots,q_{d-1},q)
\right)
$$

は有限集合

$$
G_{b,m}^{\times}
$$

上の実数値関数である。

従って最小化子は少なくとも一つ存在する。

また選ばれた $q_d$ の評価値は候補平均以下である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節で $\alpha>1$ のとき

$$
r_{\alpha,\boldsymbol\gamma}
$$

は全周波数上で可算和可能であることを確認しました。

従って双対集合という部分集合上の和

$$
B_{\alpha,\boldsymbol\gamma}
$$

も有限です。

候補集合

$$
G_{b,m}^{\times}
$$

は

$$
b^m-1
$$

個の元しか持ちません。

有限個の実数には最小値が存在するため、最小化子が存在します。

候補値を

$$
B(q),
\qquad
q\in G_{b,m}^{\times}
$$

と書けば、

$$
\min_qB(q)
\le
\frac1{|G_{b,m}^{\times}|}
\sum_{q\in G_{b,m}^{\times}}B(q)
$$

は「最小値は平均以下」という有限集合上の基本事実です。
<!-- proof-end -->

### 12.1 CBC は何を保証し、何をまだ保証しないか

CBC は各段階で局所的に最良の成分を選びます。

しかし、

$$
\boxed{
\text{各段階の貪欲最適}
\ne
\text{全成分同時の大域最適}
}
$$

です。

それでも CBC が有用なのは、

- 候補探索を成分ごとに分割できる
- 双対合同式を使って評価できる
- 座標重み $\gamma_j$ を直接組み込める
- 次元を増やすたびに前の成分を固定して再利用できる

からです。

QMC の構成理論では、さらに候補平均を評価して CBC の誤差率を証明します。本章では **構成法の代数的骨格と誤差評価との接続**までを閉じます。

### 12.2 低周波切断で候補を手計算する

実際の $B_{\alpha,\boldsymbol\gamma}$ は無限和ですが、小さな例では有限個の低周波だけを調べても CBC の考え方を確認できます。

底2、$m=2$、

$$
p=x^2+x+1,
\qquad
q_1=1
$$

とします。

第二成分候補は

$$
1,\quad x,\quad x+1
$$

です。

たとえば「NRT 重み3以下の非零双対周波数の個数」を簡易評価値とします。

$q_2=x$ では前に見たように

$$
(1,3),\quad(2,1)
$$

などが最小重み3で現れ、重み2以下には現れません。

候補ごとに同じ合同式判定を行えば、生成多項式の良し悪しを **行列を作り直さず**比較できます。

これが polynomial lattice の実用上の大きな利点です。

---

## 13. 演習

### 演習 QMC6-A1

- Level: A
- 主題: 桁多項式と周波数切断
- 使用技術: $b$ 進展開
- 計算量: 小

底2、$m=3$ とする。

1. $n=6$ の桁多項式 $n(x)$ を求めよ。
2. $k=13$ の $\operatorname{tr}_3(k)$ を求めよ。
3. $k=21$ の $\operatorname{tr}_3(k)$ を求めよ。
4. $\operatorname{tr}_3(k)$ が同じになる異なる正整数を一組挙げよ。

<!-- solution-start -->
### 詳細解答

$6$ は

$$
6=(110)_2
=
0+1\cdot2+1\cdot2^2
$$

です。

従って係数をそのまま多項式へ移すと

$$
\boxed{
6(x)=x+x^2.
}
$$

次に

$$
13=(1101)_2.
$$

下位3桁は

$$
101
$$

なので

$$
\boxed{
\operatorname{tr}_3(13)=1+x^2.
}
$$

また

$$
21=(10101)_2.
$$

下位3桁も

$$
101
$$

なので

$$
\boxed{
\operatorname{tr}_3(21)=1+x^2.
}
$$

従って、たとえば

$$
13\ne21
$$

ですが

$$
\operatorname{tr}_3(13)
=
\operatorname{tr}_3(21).
$$

双対条件が下位 $m$ 桁だけを見ることが具体的に確認できます。
<!-- solution-end -->

### 演習 QMC6-A2

- Level: A
- 主題: 負べき係数からの座標生成
- 使用技術: 形式級数の係数比較
- 計算量: 小

底2で

$$
p(x)=x^2+x+1
$$

とする。

1.

$$
\frac1p
=
x^{-2}+x^{-4}+x^{-5}+\cdots
$$

の最初の2桁から $v_2(1/p)$ を求めよ。
2. $x/p$ の先頭2個の負べき係数を求め、$v_2(x/p)$ を計算せよ。
3. $x^2/p=1+(x+1)/p$ を用いて $v_2(x^2/p)$ を求めよ。

<!-- solution-start -->
### 詳細解答

与えられた展開から

$$
\frac1p
=
0x^{-1}+1x^{-2}+\cdots.
$$

従って

$$
v_2(1/p)
=
0\cdot2^{-1}+1\cdot2^{-2}
=
\boxed{\frac14}.
$$

次に全体へ $x$ を掛けると

$$
\frac{x}{p}
=
x^{-1}+x^{-3}+x^{-4}+\cdots
$$

ではなく、元の級数のさらに先の係数も確認する必要があります。

$p=x^2+x+1$ に対する正しい展開は

$$
\frac1p
=
x^{-2}+x^{-3}+x^{-5}+x^{-6}+\cdots
$$

と係数再帰から得られます。

従って

$$
\frac{x}{p}
=
x^{-1}+x^{-2}+x^{-4}+x^{-5}+\cdots
$$

であり、

$$
\boxed{
v_2(x/p)=\frac12+\frac14=\frac34.
}
$$

最後に

$$
\frac{x^2}{p}
=
1+\frac{x+1}{p}.
$$

多項式部分 $1$ は $v_2$ に寄与しません。

また

$$
\frac{x+1}{p}
=
\frac{x}{p}+\frac1p.
$$

先頭2桁は

$$
11+01=10
\quad\text{in }\mathbb F_2.
$$

従って

$$
\boxed{
v_2(x^2/p)=\frac12.
}
$$
<!-- solution-end -->

### 演習 QMC6-A3

- Level: A
- 主題: 双対多項式格子
- 使用技術: 多項式合同式
- 計算量: 小

底2、$m=2$、

$$
p=x^2+x+1,
\qquad
\boldsymbol q=(1,x)
$$

とする。

次の周波数が双対多項式格子へ入るか判定せよ。

1. $(1,1)$
2. $(1,3)$
3. $(2,1)$
4. $(2,2)$

<!-- solution-start -->
### 詳細解答

$m=2$ なので

$$
\operatorname{tr}_2(1)=1,
$$

$$
\operatorname{tr}_2(2)=x,
$$

$$
\operatorname{tr}_2(3)=1+x.
$$

双対条件は

$$
\operatorname{tr}_2(k_1)
+
x\operatorname{tr}_2(k_2)
\equiv0
\pmod p
$$

です。

まず $(1,1)$ では

$$
1+x
$$

となります。

次数が2未満で非零なので $p$ の倍数ではありません。

従って

$$
\boxed{
(1,1)\notin P^\perp.
}
$$

$(1,3)$ では

$$
1+x(1+x)
=
1+x+x^2
=
p.
$$

よって

$$
\boxed{
(1,3)\in P^\perp.
}
$$

$(2,1)$ では

$$
x+x
=
0.
$$

従って

$$
\boxed{
(2,1)\in P^\perp.
}
$$

$(2,2)$ では

$$
x+x^2.
$$

法 $p$ で

$$
x^2\equiv x+1
$$

なので

$$
x+x^2
\equiv
x+x+1
=
1.
$$

従って

$$
\boxed{
(2,2)\notin P^\perp.
}
$$
<!-- solution-end -->

### 演習 QMC6-A4

- Level: A
- 主題: 共通単元倍不変性
- 使用技術: 剰余体
- 計算量: 小

底2、

$$
p=x^2+x+1,
\qquad
\boldsymbol q=(1,x)
$$

とする。

1. $\boldsymbol q$ 全体へ $x$ を掛け、法 $p$ で還元した生成ベクトルを求めよ。
2. さらに $x$ を掛けた結果を求めよ。
3. 3回目に $x$ を掛けると元へ戻ることを確認せよ。
4. これが点集合の3通りの生成ベクトル表示を与える理由を説明せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
x\boldsymbol q
=
(x,x^2).
$$

法

$$
p=x^2+x+1
$$

では

$$
x^2\equiv x+1
$$

なので

$$
\boxed{
x\boldsymbol q
\equiv
(x,x+1).
}
$$

もう一度 $x$ を掛けると

$$
(x^2,x^2+x).
$$

第一成分は

$$
x^2\equiv x+1.
$$

第二成分は

$$
x^2+x
\equiv
(x+1)+x
=
1.
$$

従って

$$
\boxed{
x^2\boldsymbol q
\equiv
(x+1,1).
}
$$

さらに $x$ を掛けると

$$
(x^2+x,x).
$$

第一成分は

$$
x^2+x
\equiv1
$$

なので

$$
\boxed{
x^3\boldsymbol q
\equiv
(1,x)
=
\boldsymbol q.
}
$$

実際、

$$
x^3\equiv1\pmod p
$$

です。

$x$ は剰余体の非零元なので、添字多項式 $n(x)$ を掛け算で置換します。

従ってこれら3つの生成ベクトルは点の順序を変えるだけで、同じ点集合を与えます。
<!-- solution-end -->

### 演習 QMC6-B1

- Level: B
- 主題: デジタル生成行列の導出
- 使用技術: Laurent 係数と行列
- 計算量: 中

底2、

$$
p=x^2+x+1,
\qquad
\boldsymbol q=(1,x)
$$

について、次を行え。

1. $q_1/p$ と $q_2/p$ の $x^{-3}$ までの係数を求めよ。
2. 定理4の公式から $C_1,C_2$ を構成せよ。
3. $n=0,1,2,3$ の4点を生成行列から求めよ。
4. 第3節の多項式格子の点と一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\frac1p
=
x^{-2}+x^{-3}+O(x^{-5})
$$

なので、必要な係数は

$$
t_{1,1}=0,
\qquad
t_{1,2}=1,
\qquad
t_{1,3}=1.
$$

従って

$$
C_1
=
\begin{pmatrix}
t_{1,1}&t_{1,2}\\
t_{1,2}&t_{1,3}
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
0&1\\
1&1
\end{pmatrix}
}.
$$

次に

$$
\frac{x}{p}
=
x^{-1}+x^{-2}+O(x^{-4})
$$

なので

$$
t_{2,1}=1,
\qquad
t_{2,2}=1,
\qquad
t_{2,3}=0.
$$

従って

$$
C_2
=
\boxed{
\begin{pmatrix}
1&1\\
1&0
\end{pmatrix}
}.
$$

$n$ の桁ベクトルは順に

$$
\begin{pmatrix}0\\0\end{pmatrix},
\quad
\begin{pmatrix}1\\0\end{pmatrix},
\quad
\begin{pmatrix}0\\1\end{pmatrix},
\quad
\begin{pmatrix}1\\1\end{pmatrix}.
$$

$n=0$ では両座標とも

$$
00
$$

なので

$$
\boldsymbol x_0=(0,0).
$$

$n=1$ では

$$
C_1
\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}0\\1\end{pmatrix},
$$

$$
C_2
\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}1\\1\end{pmatrix}.
$$

よって

$$
\boldsymbol x_1
=
(0.01_2,0.11_2)
=
\left(\frac14,\frac34\right).
$$

$n=2$ では

$$
C_1
\begin{pmatrix}0\\1\end{pmatrix}
=
\begin{pmatrix}1\\1\end{pmatrix},
$$

$$
C_2
\begin{pmatrix}0\\1\end{pmatrix}
=
\begin{pmatrix}1\\0\end{pmatrix}.
$$

従って

$$
\boldsymbol x_2
=
\left(\frac34,\frac12\right).
$$

$n=3$ では

$$
C_1
\begin{pmatrix}1\\1\end{pmatrix}
=
\begin{pmatrix}1\\0\end{pmatrix},
$$

$$
C_2
\begin{pmatrix}1\\1\end{pmatrix}
=
\begin{pmatrix}0\\1\end{pmatrix}.
$$

よって

$$
\boldsymbol x_3
=
\left(\frac12,\frac14\right).
$$

以上から

$$
\boxed{
P
=
\left\{
(0,0),
\left(\frac14,\frac34\right),
\left(\frac34,\frac12\right),
\left(\frac12,\frac14\right)
\right\},
}
$$

第3節と一致します。
<!-- solution-end -->

### 演習 QMC6-B2

- Level: B
- 主題: 双対合同式と行列双対の一致
- 使用技術: 係数比較
- 計算量: 中

一般の $b,m,p,\boldsymbol q$ を考える。

$$
A(x)
=
\sum_{j=1}^s
\operatorname{tr}_m(k_j)q_j
$$

とし、

$$
A=hp+r,
\qquad
\deg r<m
$$

とする。

1. $\sum_jC_j^{\mathsf T}\nu_m(k_j)$ が $A/p$ の最初の $m$ 個の負べき係数であることを示せ。
2. $r\ne0$ なら $r/p$ の最初の $m$ 個の負べき係数の少なくとも一つが非零であることを示せ。
3. 以上から双対合同式と行列双対条件の同値性を導け。

<!-- solution-start -->
### 詳細解答

各

$$
\operatorname{tr}_m(k_j)
=
\sum_{\ell=0}^{m-1}
\kappa_{j,\ell}x^\ell
$$

および

$$
\frac{q_j}{p}
=
\sum_{u=1}^{\infty}
t_{j,u}x^{-u}
$$

と書きます。

すると

$$
\frac{\operatorname{tr}_m(k_j)q_j}{p}
=
\sum_{\ell=0}^{m-1}
\sum_{u=1}^{\infty}
\kappa_{j,\ell}t_{j,u}x^{\ell-u}.
$$

$x^{-(r+1)}$ の係数は

$$
\sum_{\ell=0}^{m-1}
\kappa_{j,\ell}
t_{j,r+1+\ell}.
$$

一方、

$$
(C_j)_{a,r+1}=t_{j,a+r}
$$

なので

$$
\left(
C_j^{\mathsf T}\nu_m(k_j)
\right)_{r+1}
=
\sum_{a=1}^m
t_{j,a+r}\kappa_{j,a-1}.
$$

$a-1=\ell$ とすれば両者は一致します。

従って

$$
\sum_jC_j^{\mathsf T}\nu_m(k_j)
$$

は $A/p$ の $x^{-1},\ldots,x^{-m}$ 係数ベクトルです。

次に

$$
A/p=h+r/p
$$

で、$h$ は負べき係数を持ちません。

$r\ne0$ とし

$$
\deg r=d<m
$$

とします。

$r$ の先頭係数を $c\ne0$ とすれば、$p$ はモニック次数 $m$ なので

$$
\frac rp
=
cx^{d-m}
+
\text{より低い負べき項}.
$$

指数は

$$
d-m=-(m-d).
$$

しかも

$$
1\le m-d\le m.
$$

従って最初の非零項は

$$
x^{-1},\ldots,x^{-m}
$$

の範囲へ必ず現れます。

よって最初の $m$ 個の負べき係数が全部0であることと

$$
r=0
$$

は同値です。

$r=0$ は

$$
p\mid A
$$

と同値なので、

$$
\sum_jC_j^{\mathsf T}\nu_m(k_j)=0
$$

と

$$
\sum_j\operatorname{tr}_m(k_j)q_j\equiv0\pmod p
$$

が同値です。
<!-- solution-end -->

### 演習 QMC6-B3

- Level: B
- 主題: 最小双対 NRT 重みと $t$ 値
- 使用技術: 双対合同式・NRT 重み
- 計算量: 中

底2、$m=2$、

$$
p=x^2+x+1,
\qquad
\boldsymbol q=(1,x)
$$

とする。

1. NRT 重み2以下の非零 $\boldsymbol k=(k_1,k_2)$ は双対に入らないことを示せ。
2. $(1,3)$ が双対に入り、NRT 重み3を持つことを示せ。
3. $\rho_1$ を求めよ。
4. 最小 $t$ 値を求めよ。

<!-- solution-start -->
### 詳細解答

二次元で

$$
\mu_1(k_1,k_2)\le2
$$

となる非零周波数は、各成分の最高位非零桁位置の和が2以下です。

代表的には

$$
(1,0),
\quad
(0,1),
\quad
(1,1),
\quad
(2,0),
\quad
(0,2)
$$

などです。

双対条件は

$$
\operatorname{tr}_2(k_1)
+
x\operatorname{tr}_2(k_2)
\equiv0\pmod p.
$$

左辺の次数は高くても2です。

各候補を調べると、

$$
1,
\quad
x,
\quad
1+x,
\quad
x,
\quad
x^2
$$

型の非零剰余が残り、$p$ の倍数にはなりません。

従って

$$
\rho_1\ge3.
$$

一方、

$$
(1,3)
$$

では

$$
1+x(1+x)
=
1+x+x^2
=
p,
$$

なので双対に入ります。

その NRT 重みは

$$
\mu_1(1,3)
=
1+2
=
3.
$$

従って

$$
\boxed{
\rho_1=3.
}
$$

最小 $t$ 値は

$$
t_{\min}
=
m-\rho_1+1
=
2-3+1
=
\boxed{0}.
$$
<!-- solution-end -->

### 演習 QMC6-C1

- Level: C
- 主題: 多項式格子の構成と誤差の統合
- 使用技術: 双対条件・Walsh 誤差・CBC の発想
- 計算量: 大

底2、$m=2$、

$$
p=x^2+x+1
$$

とし、第一成分を

$$
q_1=1
$$

に固定する。

第二成分候補

$$
q_2\in\{1,x,x+1\}
$$

を比較する。

周波数集合

$$
\mathcal K
=
\{
(k_1,k_2):
0\le k_1,k_2\le3,\ 
(k_1,k_2)\ne(0,0)
\}
$$

を考え、簡易評価値

$$
B_{\mathrm{low}}(q_2)
=
\sum_{\substack{
\boldsymbol k\in\mathcal K\\
\operatorname{tr}_2(k_1)
+
q_2\operatorname{tr}_2(k_2)
\equiv0\pmod p
}}
2^{-\mu_1(\boldsymbol k)}
$$

を定める。

1. 各 $q_2$ について $\mathcal K$ 内の非零双対周波数を列挙せよ。
2. $B_{\mathrm{low}}(q_2)$ を計算せよ。
3. この有限切断評価だけを使った CBC ならどの $q_2$ を選ぶか述べよ。
4. 選ばれた生成ベクトルに対して

$$
f(\boldsymbol x)
=
4
+
2\operatorname{wal}_{(1,3)}(\boldsymbol x)
-
\operatorname{wal}_{(1,1)}(\boldsymbol x)
$$

の積分値と多項式格子則の値を求めよ。
5. この例から「双対集合を設計する」ことが積分誤差を設計することになる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$\operatorname{tr}_2$ は $0,1,2,3$ 上では単に二進2桁を多項式へ写すので、

$$
0\mapsto0,
\qquad
1\mapsto1,
\qquad
2\mapsto x,
\qquad
3\mapsto1+x.
$$

です。

#### 1. 候補 $q_2=1$

双対条件は

$$
\operatorname{tr}_2(k_1)
+
\operatorname{tr}_2(k_2)
=
0.
$$

標数2なので

$$
\operatorname{tr}_2(k_1)
=
\operatorname{tr}_2(k_2)
$$

と同値です。

$\mathcal K$ 内では

$$
(1,1),
\quad
(2,2),
\quad
(3,3)
$$

が非零双対周波数です。

重みは

$$
\mu_1(1,1)=2,
$$

$$
\mu_1(2,2)=4,
$$

$$
\mu_1(3,3)=4.
$$

従って

$$
B_{\mathrm{low}}(1)
=
2^{-2}+2^{-4}+2^{-4}
=
\frac14+\frac1{16}+\frac1{16}
=
\boxed{\frac38}.
$$

#### 2. 候補 $q_2=x$

双対条件は

$$
a(x)+xb(x)\equiv0\pmod p.
$$

直接列挙すると

$$
(1,3),
\quad
(2,1),
\quad
(3,2)
$$

が入ります。

実際、

$$
1+x(1+x)
=
p,
$$

$$
x+x=0,
$$

$$
(1+x)+x\cdot x
=
1+x+x^2
=
p.
$$

重みは

$$
\mu_1(1,3)=3,
$$

$$
\mu_1(2,1)=3,
$$

$$
\mu_1(3,2)=4.
$$

従って

$$
B_{\mathrm{low}}(x)
=
2^{-3}+2^{-3}+2^{-4}
=
\frac18+\frac18+\frac1{16}
=
\boxed{\frac5{16}}.
$$

#### 3. 候補 $q_2=x+1$

双対条件は

$$
a(x)+(x+1)b(x)\equiv0\pmod p.
$$

列挙すると

$$
(1,2),
\quad
(2,3),
\quad
(3,1)
$$

が入ります。

重みは

$$
\mu_1(1,2)=3,
$$

$$
\mu_1(2,3)=4,
$$

$$
\mu_1(3,1)=3.
$$

従って

$$
B_{\mathrm{low}}(x+1)
=
2^{-3}+2^{-4}+2^{-3}
=
\boxed{\frac5{16}}.
$$

したがって簡易評価では

$$
\frac5{16}<\frac38
$$

なので、

$$
q_2=x
$$

と

$$
q_2=x+1
$$

が同率最小です。

CBC はこのどちらかを選べます。

ここでは

$$
\boxed{
q_2=x
}
$$

を選びます。

#### 4. Walsh 多項式の積分

被積分関数は

$$
f
=
4
+
2\operatorname{wal}_{(1,3)}
-
\operatorname{wal}_{(1,1)}.
$$

非零 Walsh 周波数の積分は0なので、

$$
\boxed{
I(f)=4.
}
$$

$q_2=x$ では

$$
(1,3)\in P^\perp,
$$

$$
(1,1)\notin P^\perp.
$$

従って点平均では

$$
\operatorname{wal}_{(1,3)}
$$

は平均1で残り、

$$
\operatorname{wal}_{(1,1)}
$$

は平均0で消えます。

よって

$$
Q_{p,(1,x)}(f)
=
4+2
=
\boxed{6}.
$$

積分誤差は

$$
\boxed{
Q-I=2.
}
$$

#### 5. 何を設計しているのか

積分誤差公式は

$$
Q-I
=
\sum_{\boldsymbol k\in P^\perp\setminus\{0\}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
$$

です。

したがって生成ベクトルを変えると、

$$
P^\perp
$$

すなわち「点平均で消えずに残る Walsh 周波数」が変わります。

関数側で大きな Walsh 係数を持つ周波数を双対集合から外せば、その成分の誤差寄与は0になります。

よって

$$
\boxed{
\text{生成ベクトルの設計}
=
\text{双対周波数集合の設計}
=
\text{積分誤差の設計}
}
$$

という構造が得られます。
<!-- solution-end -->

---

## 14. まとめ

本章では、QMC5 のデジタル双対理論を有限体多項式で構成する方法を作りました。

整数の $b$ 進桁を

$$
n(x)
=
n_0+n_1x+\cdots+n_{m-1}x^{m-1}
$$

へ読み替え、法多項式

$$
p(x)
$$

と生成多項式ベクトル

$$
\boldsymbol q
$$

から

$$
\boxed{
\boldsymbol x_n
=
\left(
v_m\left(\frac{nq_1}{p}\right),
\ldots,
v_m\left(\frac{nq_s}{p}\right)
\right)
}
$$

を作りました。

次に

$$
\frac{q_j}{p}
=
\sum_{\ell\ge1}
t_{j,\ell}x^{-\ell}
$$

の係数から

$$
(C_j)_{a,r+1}=t_{j,a+r}
$$

と置くと、多項式格子が QMC4 のデジタル点集合そのものになることを証明しました。

周波数側では

$$
\operatorname{tr}_m(k)
$$

を導入し、双対条件を

$$
\boxed{
\sum_{j=1}^s
\operatorname{tr}_m(k_j)q_j
\equiv0
\pmod p
}
$$

という一つの合同式で書きました。

そしてこの合同式が QMC5 の行列双対条件

$$
\sum_jC_j^{\mathsf T}\nu_m(k_j)=0
$$

と同値であることを、$A/p$ の最初の $m$ 個の負べき係数から完全に証明しました。

従って多項式格子でも

$$
\boxed{
Q(f)-I(f)
=
\sum_{\boldsymbol k\in P^\perp\setminus\{0\}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
}
$$

がそのまま成り立ちます。

さらに、法 $p$ が既約なら共通単元倍

$$
\boldsymbol q\mapsto a\boldsymbol q
$$

は点集合を変えないので、第一成分を

$$
q_1=1
$$

へ正規化できます。

最後に NRT 減衰型の Walsh 評価関数を導入し、

$$
\boxed{
q_d
\in
\operatorname*{arg\,min}_{q\in G_{b,m}^{\times}}
B_{\alpha,\boldsymbol\gamma}
(
p,(q_1,\ldots,q_{d-1},q)
)
}
$$

と一成分ずつ選ぶ CBC 構成へ接続しました。

本章の要点は、

$$
\boxed{
\text{多項式合同式を選ぶことで、消え残る Walsh 周波数を設計できる}
}
$$

ことです。

次の QMC7 では、同じデジタル構造へ乱数を入れ、**digital shift と scrambling による randomized QMC** へ進みます。
