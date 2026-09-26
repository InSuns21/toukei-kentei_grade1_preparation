# RKHS1 再生核 Hilbert 空間・Moore--Aronszajn

<!-- definition-example-audit: strict -->

関数を Hilbert 空間の元として扱うだけなら、点での値を取り出せるとは限りません。たとえば $L^2([0,1])$ では、1点だけ値を変えた二つの関数は同じ元を表すため、点評価 $f\mapsto f(x)$ は元から一意に定まりません。

本章では、各点での評価を連続線形汎関数として扱える関数空間を考えます。すると [Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、点 $x$ での評価があるベクトル $K_x$ との内積として表されます。さらに $K_x$ を点ごとに並べると、二変数関数 $K(x,z)$ が現れます。

本章の中心は

$$
\boxed{
\text{点評価の連続性}
\Longleftrightarrow
\text{再生元 }K_x
\Longrightarrow
\text{正半定値な再生核}
}
$$

と、その逆向き

$$
\boxed{
\text{正半定値核 }K
\Longrightarrow
\text{その核を再生核とする RKHS}
}
$$

です。この逆向きを保証する構成定理が本章の中心です。

---

## 1. 点評価が使えることは Hilbert 空間の自動的な性質ではない

集合 $\mathcal X$ 上の実数値関数からなる Hilbert 空間 $\mathcal H$ を考えます。各 $x\in\mathcal X$ に対して、[評価汎関数](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#def-f0-02c2-evaluation-functional)

$$
\delta_x(f)=f(x)
$$

を考えます。

$L^2([0,1])$ では、ほとんど至る所等しい二つの関数は距離 0 になり、同じ元として扱われます。ある関数 $f$ の一点 $x_0$ だけを変更して得た $g$ も $L^2$ では同じ元ですが、

$$
f(x_0)\ne g(x_0)
$$

とできてしまいます。したがって $L^2$ の元に対する一点評価は一般には定義できません。

一方、連続関数空間のように各元が実際の関数であっても、選んだノルムに対して点評価が連続とは限りません。

RKHS は

> 関数空間であることに加えて、各点での値を Hilbert 空間の位相と整合的に読み出せる

という構造を持つ空間です。

---

## 2. 再生核 Hilbert 空間

<a id="def-rkhs1-rkhs"></a>
<!-- formal-statement-start -->
> **定義（再生核 Hilbert 空間）**  
> 集合 $\mathcal X$ 上の実数値関数からなる Hilbert 空間 $\mathcal H$ が **再生核 Hilbert 空間**であるとは、任意の $x\in\mathcal X$ に対して評価汎関数
>
$$
\delta_x:\mathcal H\to\mathbb R,
\qquad
\delta_x(f)=f(x)
$$
>
> が連続であることをいう。再生核 Hilbert 空間を RKHS と略記する。
<!-- formal-statement-end -->

連続線形汎関数の空間を $\mathcal H^*$ と書けば、

$$
\mathcal H\text{ が RKHS}
\iff
\delta_x\in\mathcal H^*
\quad(\forall x\in\mathcal X)
$$

です。

<!-- definition-example-start: def-rkhs1-rkhs -->
**定義の確認**：線形関数からなる有限次元 RKHS

$\mathcal X=\mathbb R^p$ とし、

$$
\mathcal H
=
\{f_w:f_w(x)=w^{\mathsf T}x,\ w\in\mathbb R^p\}
$$

に

$$
\langle f_w,f_v\rangle_{\mathcal H}
=
w^{\mathsf T}v
$$

を入れます。$\mathbb R^p$ と等長同型なので $\mathcal H$ は Hilbert 空間です。

固定した $x\in\mathbb R^p$ に対して [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|f_w(x)|
=
|w^{\mathsf T}x|
\le
\|w\|_2\|x\|_2
=
\|f_w\|_{\mathcal H}\|x\|_2.
$$

従って $\delta_x$ は有界、したがって連続です。よって $\mathcal H$ は RKHS です。
<!-- definition-example-end -->

この例は有限次元ですが、RKHS の本領は無限次元の関数空間でも一点評価を連続に保てることにあります。

---

## 3. Riesz 表現により点評価を空間内のベクトルへ戻す

RKHS $\mathcal H$ を固定します。定義により $\delta_x$ は連続線形汎関数なので、[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)を適用できます。

<a id="thm-rkhs1-evaluation-representer"></a>
<!-- formal-statement-start -->
> **命題（点評価の Riesz 表現）**  
> $\mathcal H$ を $\mathcal X$ 上の実 RKHS とする。各 $x\in\mathcal X$ に対して一意な $K_x\in\mathcal H$ が存在し、
>
$$
f(x)
=
\langle f,K_x\rangle_{\mathcal H}
\qquad(\forall f\in\mathcal H)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $x\in\mathcal X$ に対し、評価汎関数

$$
\delta_x(f)=f(x)
$$

は連続線形汎関数です。従って [Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、一意な $K_x\in\mathcal H$ が存在して

$$
\delta_x(f)
=
\langle f,K_x\rangle_{\mathcal H}
$$

となります。

左辺が $f(x)$ なので

$$
f(x)
=
\langle f,K_x\rangle_{\mathcal H}
$$

です。

$\square$
<!-- proof-end -->

この等式により、点での値が Hilbert 空間の内積から再現されます。

<a id="def-rkhs1-reproducing-property"></a>
<!-- formal-statement-start -->
> **定義（再生性）**  
> 関数からなる Hilbert 空間 $\mathcal H$ と各 $x\in\mathcal X$ に対応する $K_x\in\mathcal H$ が
>
$$
f(x)=\langle f,K_x\rangle_{\mathcal H}
\qquad(\forall f\in\mathcal H)
$$
>
> を満たすとき、この等式が表す性質を **再生性**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs1-reproducing-property -->
**定義の確認**：線形関数空間で再生性を直接確かめる

2節の空間
$$
\mathcal H=\{f_w:f_w(z)=w^{\mathsf T}z\}
$$
を使います。固定した $x$ に対して
$$
K_x(z)=x^{\mathsf T}z
$$
と置くと $K_x=f_x\in\mathcal H$ であり、
$$
\langle f_w,K_x\rangle_{\mathcal H}
=
w^{\mathsf T}x
=
f_w(x).
$$
従って、すべての $f_w\in\mathcal H$ について定義の等式が実際に成り立ちます。
<!-- definition-example-end -->

---

## 4. 再生核

<a id="def-rkhs1-reproducing-kernel"></a>
<!-- formal-statement-start -->
> **定義（再生核）**  
> RKHS $\mathcal H$ に対して、点評価の Riesz 表現元 $K_x$ を用い
>
$$
K(x,z)
=
K_z(x)
$$
>
> と定める二変数関数 $K:\mathcal X\times\mathcal X\to\mathbb R$ を $\mathcal H$ の **再生核**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs1-reproducing-kernel -->
**定義の確認**：線形関数空間の二変数関数

直前の例では $K_z(x)=z^{\mathsf T}x$ です。従って定義どおり
$$
K(x,z)=K_z(x)=x^{\mathsf T}z.
$$
この二変数関数は各 $z$ に対して核切片 $K_z(\cdot)$ を返し、直前に確認した再生性と整合します。
<!-- definition-example-end -->

再生性を $f=K_z$ に適用すると

$$
K(x,z)
=
K_z(x)
=
\langle K_z,K_x\rangle_{\mathcal H}.
$$

従って再生核は Hilbert 空間内の内積を点の組へ引き戻したものと見なせます。

<a id="prop-rkhs1-reproducing-properties"></a>
<!-- formal-statement-start -->
> **命題（再生核の基本公式）**  
> RKHS $\mathcal H$ の再生核 $K$ について、任意の $x,z\in\mathcal X$ と $f\in\mathcal H$ に対し
>
$$
f(x)=\langle f,K_x\rangle_{\mathcal H},
$$
>
$$
K(x,z)=\langle K_z,K_x\rangle_{\mathcal H},
$$
>
$$
\|K_x\|_{\mathcal H}^2=K(x,x)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

最後の式は $z=x$ とすれば直ちに従います。

---

## 5. 評価汎関数のノルムは核の対角成分で読める

Riesz 表現では連続線形汎関数のノルムとその表現ベクトルのノルムが一致します。従って

$$
\|\delta_x\|_{\mathcal H^*}
=
\|K_x\|_{\mathcal H}
=
\sqrt{K(x,x)}.
$$

これにより、任意の $f\in\mathcal H$ に対して

$$
|f(x)|
=
|\langle f,K_x\rangle|
\le
\|f\|_{\mathcal H}\sqrt{K(x,x)}.
$$

<a id="cor-rkhs1-evaluation-bound"></a>
<!-- formal-statement-start -->
> **系（点評価の基本評価）**  
> RKHS $\mathcal H$ の再生核を $K$ とすると
>
$$
|f(x)|
\le
\|f\|_{\mathcal H}\sqrt{K(x,x)}
$$
>
> がすべての $f\in\mathcal H$ と $x\in\mathcal X$ について成り立ち、
>
$$
\|\delta_x\|_{\mathcal H^*}
=
\sqrt{K(x,x)}
$$
>
> である。
<!-- formal-statement-end -->

この不等式は後で「Hilbert ノルムが小さい関数は各点でも暴れにくい」という制御に使われます。

---

## 6. RKHS から得られる核は正半定値である

まず、核側だけで定義できる性質を導入します。

<a id="def-rkhs1-psd-kernel"></a>
<!-- formal-statement-start -->
> **定義（正半定値核）**  
> 集合 $\mathcal X$ 上の対称関数
>
$$
K:\mathcal X\times\mathcal X\to\mathbb R
$$
>
> が **正半定値核**であるとは、任意の $n\ge1$、任意の点 $x_1,\ldots,x_n\in\mathcal X$、任意の係数 $c_1,\ldots,c_n\in\mathbb R$ に対して
>
$$
\sum_{i,j=1}^n c_i c_j K(x_i,x_j)\ge0
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs1-psd-kernel -->
**定義の確認**：線形核は正半定値である

$\mathcal X=\mathbb R^p$ 上で
$$
K(x,z)=x^{\mathsf T}z
$$
とします。任意の $x_1,\ldots,x_n$ と $c_1,\ldots,c_n$ に対して
$$
\begin{aligned}
\sum_{i,j=1}^n c_ic_jK(x_i,x_j)
&=
\sum_{i,j=1}^n c_ic_jx_i^{\mathsf T}x_j\\
&=
\left\|
\sum_{i=1}^n c_ix_i
\right\|_2^2\\
&\ge0.
\end{aligned}
$$
また $K(x,z)=K(z,x)$ なので、定義の対称性と非負条件をともに満たします。
<!-- definition-example-end -->

有限個の点を選んだときの行列

$$
G=
\bigl(K(x_i,x_j)\bigr)_{i,j=1}^n
$$

を Gram 行列と呼びます。正半定値核の条件は、すべての有限 Gram 行列が半正定値であることと同値です。

<a id="thm-rkhs1-kernel-psd"></a>
<!-- formal-statement-start -->
> **定理（RKHS の再生核は正半定値）**  
> 実 RKHS $\mathcal H$ の再生核 $K$ は対称な正半定値核である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[再生核の基本公式](#prop-rkhs1-reproducing-properties)より

$$
K(x_i,x_j)
=
\langle K_{x_j},K_{x_i}\rangle_{\mathcal H}.
$$

実 Hilbert 空間の内積は対称なので

$$
K(x_i,x_j)=K(x_j,x_i)
$$

です。

次に任意の実係数 $c_1,\ldots,c_n$ に対して

$$
\begin{aligned}
\sum_{i,j=1}^n c_i c_j K(x_i,x_j)
&=
\sum_{i,j=1}^n
c_i c_j
\langle K_{x_j},K_{x_i}\rangle_{\mathcal H}\\
&=
\left\langle
\sum_{j=1}^n c_jK_{x_j},
\sum_{i=1}^n c_iK_{x_i}
\right\rangle_{\mathcal H}\\
&=
\left\|
\sum_{i=1}^n c_iK_{x_i}
\right\|_{\mathcal H}^2\\
&\ge0.
\end{aligned}
$$

従って $K$ は正半定値核です。

$\square$
<!-- proof-end -->

この証明は後の逆構成をほとんど予告しています。正半定値性は、有限線形結合の「ノルム二乗」を非負にする条件です。

---

## 7. 標準特徴写像

<a id="def-rkhs1-canonical-feature-map"></a>
<!-- formal-statement-start -->
> **定義（標準特徴写像）**  
> RKHS $\mathcal H$ とその再生核 $K$ に対して
>
$$
\Phi:\mathcal X\to\mathcal H,
\qquad
\Phi(x)=K_x
$$
>
> と定める写像を **標準特徴写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs1-canonical-feature-map -->
**定義の確認**：線形核の標準特徴写像

線形関数 RKHS では
$$
\Phi(x)=K_x=f_x
$$
です。$f_x$ の係数ベクトルは $x$ 自身なので、
$$
\langle\Phi(x),\Phi(z)\rangle_{\mathcal H}
=
x^{\mathsf T}z
=
K(x,z).
$$
従って、点 $x$ を核切片 $K_x$ へ送るという定義が、線形核では通常のベクトル $x$ を特徴として使うことに対応します。
<!-- definition-example-end -->

[再生核の基本公式](#prop-rkhs1-reproducing-properties)から

$$
\boxed{
K(x,z)
=
\langle \Phi(z),\Phi(x)\rangle_{\mathcal H}
}
$$

です。実内積は対称なので、通常の順序で

$$
K(x,z)
=
\langle \Phi(x),\Phi(z)\rangle_{\mathcal H}
$$

と書いても同じです。

この式は「カーネルが特徴空間の内積を計算する」という説明の厳密な出発点です。

<a id="prop-rkhs1-feature-kernel"></a>
<!-- formal-statement-start -->
> **命題（特徴写像から作った核は正半定値）**  
> $\mathcal F$ を実 Hilbert 空間、$\Phi:\mathcal X\to\mathcal F$ を任意の写像とする。このとき
>
$$
K(x,z)
=
\langle\Phi(x),\Phi(z)\rangle_{\mathcal F}
$$
>
> は正半定値核である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

対称性は内積の対称性から従います。また

$$
\begin{aligned}
\sum_{i,j}c_ic_jK(x_i,x_j)
&=
\sum_{i,j}c_ic_j
\langle\Phi(x_i),\Phi(x_j)\rangle_{\mathcal F}\\
&=
\left\|
\sum_i c_i\Phi(x_i)
\right\|_{\mathcal F}^2\\
&\ge0.
\end{aligned}
$$

なので正半定値です。

$\square$
<!-- proof-end -->

---

## 8. 直接計算できる三つの核

### 8.1 線形核

$\mathcal X=\mathbb R^p$ として

$$
K(x,z)=x^{\mathsf T}z
$$

と置きます。特徴写像を $\Phi(x)=x\in\mathbb R^p$ と取れば

$$
K(x,z)
=
\langle\Phi(x),\Phi(z)\rangle
$$

なので正半定値です。

2節の線形関数 RKHS では、$K_x=f_x$ と対応し、この核が実際に再生核になります。

### 8.2 定数を加えた線形核

$\mathcal X=\mathbb R^p$、$a\ge0$ として

$$
K(x,z)=x^{\mathsf T}z+a
$$

を考えます。

$$
\Phi(x)
=
\begin{pmatrix}
x\\
\sqrt a
\end{pmatrix}
\in\mathbb R^{p+1}
$$

と置けば

$$
K(x,z)
=
\Phi(x)^{\mathsf T}\Phi(z)
$$

ですから正半定値です。

### 8.3 二次多項式核

$$
K(x,z)
=
(x^{\mathsf T}z)^2
$$

を考えます。$x=(x_1,\ldots,x_p)$ に対して、すべての積 $x_ix_j$ を並べた特徴を取れば、その内積が $(x^{\mathsf T}z)^2$ になります。

たとえば $p=2$ では

$$
\Phi(x_1,x_2)
=
\begin{pmatrix}
x_1^2\\
\sqrt2 x_1x_2\\
x_2^2
\end{pmatrix}
$$

とすると

$$
\Phi(x)^{\mathsf T}\Phi(z)
=
(x_1z_1+x_2z_2)^2.
$$

従ってこの核も正半定値です。

---

## 9. 正半定値でない対称関数は再生核になれない

正半定値性は飾りではありません。

$\mathcal X=\{1,2\}$ とし、

$$
K(1,1)=K(2,2)=1,
\qquad
K(1,2)=K(2,1)=2
$$

とします。Gram 行列は

$$
G=
\begin{pmatrix}
1&2\\
2&1
\end{pmatrix}.
$$

$c=(1,-1)^{\mathsf T}$ に対して

$$
c^{\mathsf T}Gc
=
-2<0.
$$

もしこれがある RKHS の再生核なら、6節の証明と同じ計算から

$$
c^{\mathsf T}Gc
=
\|K_1-K_2\|_{\mathcal H}^2
\ge0
$$

でなければなりません。矛盾です。

つまり正半定値性を失うと、逆構成で「ノルム二乗」にしたい量が負になり、Hilbert 空間を作る機構そのものが壊れます。

---

## 10. Moore--Aronszajn の定理

ここまで

$$
\text{RKHS}
\Longrightarrow
\text{正半定値な再生核}
$$

を示しました。逆向きが成り立つことが RKHS 理論の中心です。

<a id="thm-rkhs1-moore-aronszajn"></a>
<!-- formal-statement-start -->
> **定理（Moore--Aronszajn の定理）**  
> 集合 $\mathcal X$ 上の正半定値核
>
$$
K:\mathcal X\times\mathcal X\to\mathbb R
$$
>
> を与える。このとき $K$ を再生核とする実 RKHS $\mathcal H_K$ が存在する。さらに、$K$ を再生核とする RKHS は、関数値を保つ等長同型を除いて一意である。
<!-- formal-statement-end -->

証明は次の五段階です。

$$
\boxed{
\begin{array}{c}
K_x(\cdot)=K(\cdot,x)\text{ を作る}\\
\Downarrow\\
\operatorname{span}\{K_x\}\text{ に内積を入れる}\\
\Downarrow\\
\text{点評価が有界であることを示す}\\
\Downarrow\\
\text{完備化し、完備化後も関数として読む}\\
\Downarrow\\
\text{核切片の稠密性から一意性を示す}
\end{array}
}
$$

以下で各段階を閉じます。

---

## 11. 第1段階：核切片の有限線形結合

各 $x\in\mathcal X$ に対して

$$
K_x(\cdot)=K(\cdot,x)
$$

と置きます。

そして

<a id="def-rkhs1-prehilbert-space"></a>
<!-- formal-statement-start -->
> **定義（核切片の有限線形包）**  
> 正半定値核 $K$ に対して
>
$$
\mathcal H_0
=
\operatorname{span}\{K_x:x\in\mathcal X\}
$$
>
> と定める。すなわち $\mathcal H_0$ は
>
$$
f=\sum_{i=1}^n a_iK_{x_i}
$$
>
> と有限和で表される関数全体である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs1-prehilbert-space -->
**定義の確認**：2点上の核切片を実際に張る

$\mathcal X=\{1,2\}$ とし、
$$
K(i,j)=
\begin{cases}
1,& i=j,\\
0,& i\ne j
\end{cases}
$$
とします。このとき
$$
K_1=(1,0),
\qquad
K_2=(0,1)
$$
と値ベクトルで表せます。従って
$$
aK_1+bK_2=(a,b)
$$
であり、$\mathcal H_0=\operatorname{span}\{K_1,K_2\}$ はこの2点上のすべての実数値関数からなります。定義がいう「核切片の有限線形結合」を直接確認できました。
<!-- definition-example-end -->

ここでは $K_x$ は形式記号ではなく、実際の関数 $z\mapsto K(z,x)$ として扱っています。

---

## 12. 第2段階：核から内積を定義する

$f,g\in\mathcal H_0$ を

$$
f=\sum_{i=1}^n a_iK_{x_i},
\qquad
g=\sum_{j=1}^m b_jK_{z_j}
$$

と表します。

候補となる内積を

$$
\langle f,g\rangle_0
=
\sum_{i=1}^n\sum_{j=1}^m
a_ib_jK(x_i,z_j)
$$

と定めます。

ここで最初に確認すべきことは、同じ関数 $f$ が別の有限和表示を持っても値が変わらないことです。

<a id="lem-rkhs1-inner-product-well-defined"></a>
<!-- formal-statement-start -->
> **補題（核切片上の内積は表示によらない）**  
> $\mathcal H_0$ 上の式
>
$$
\left\langle
\sum_i a_iK_{x_i},
\sum_j b_jK_{z_j}
\right\rangle_0
=
\sum_{i,j}a_ib_jK(x_i,z_j)
$$
>
> は有限和表示の選び方によらず、$\mathcal H_0$ 上の内積を定める。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず、第1引数のある表示が零関数を表す場合を考えます。

$$
h
=
\sum_i a_iK_{x_i}
=0
$$

が関数として恒等的に 0 だとします。任意の $z\in\mathcal X$ に対して

$$
h(z)
=
\sum_i a_iK(z,x_i)
=
0.
$$

$K$ は対称なので

$$
\sum_i a_iK(x_i,z)=0.
$$

従って任意の

$$
g=\sum_j b_jK_{z_j}
$$

に対して

$$
\sum_{i,j}a_ib_jK(x_i,z_j)
=
\sum_j b_j
\left(
\sum_i a_iK(x_i,z_j)
\right)
=
0.
$$

よって第1引数の表示を変えても値は変わりません。対称性により第2引数についても同じです。従って上の式は有限和表示によらず一意に定まります。

次に

$$
\langle f,f\rangle_0
=
\sum_{i,j}a_ia_jK(x_i,x_j)
\ge0
$$

は正半定値性から従います。

さらに $\langle f,f\rangle_0=0$ とします。上の非負性から得られる [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から、任意の $x\in\mathcal X$ について

$$
|\langle f,K_x\rangle_0|^2
\le
\langle f,f\rangle_0
\langle K_x,K_x\rangle_0
=
0.
$$

従って

$$
\langle f,K_x\rangle_0=0.
$$

定義を展開すると

$$
\langle f,K_x\rangle_0=f(x)
$$

なので $f(x)=0$ がすべての $x$ で成り立ちます。従って $f$ は零関数です。

よって正定値性まで成り立ち、$\langle\cdot,\cdot\rangle_0$ は内積です。

$\square$
<!-- proof-end -->

ここでの [Cauchy--Schwarz](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) は、$\langle u+tv,u+tv\rangle_0\ge0$ を $t$ の二次式として判別式を調べれば得られます。従って Hilbert 空間の完備性はまだ使っていません。

---

## 13. 第3段階：再生性と点評価の有界性は完備化前から成立する

$g=K_x$ と置くと、$f=\sum_i a_iK_{x_i}$ に対して

$$
\begin{aligned}
\langle f,K_x\rangle_0
&=
\sum_i a_iK(x_i,x)\\
&=
\sum_i a_iK(x,x_i)\\
&=
f(x).
\end{aligned}
$$

従って $\mathcal H_0$ 上ですでに再生性があります。

さらに [Cauchy--Schwarz](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) より

$$
|f(x)|
=
|\langle f,K_x\rangle_0|
\le
\|f\|_0\|K_x\|_0.
$$

そして

$$
\|K_x\|_0^2
=
K(x,x)
$$

なので

$$
\boxed{
|f(x)|
\le
\sqrt{K(x,x)}\,\|f\|_0
}
$$

です。

この評価が重要です。完備化で新しく加わる極限元に対しても、点評価を連続に延長できます。

---

## 14. 第4段階：完備化した元を本当に関数として読む

$\mathcal H_0$ をノルム $\|\cdot\|_0$ で完備化し、その Hilbert 空間を $\mathcal H_K$ とします。

完備化の元 $f\in\mathcal H_K$ は、最初は $\mathcal H_0$ の Cauchy 列の極限として得られる抽象的な元です。ここで「完成したから関数空間になった」と飛ばしてはいけません。

固定した $x$ について、13節の評価

$$
|h(x)|
\le
\sqrt{K(x,x)}\,\|h\|_0
$$

から $\delta_x$ は $\mathcal H_0$ 上の有界線形汎関数です。従って完備化 $\mathcal H_K$ へ一意に連続延長できます。

完備化後の $f\in\mathcal H_K$ に対して

$$
f(x)
:=
\widetilde\delta_x(f)
$$

と定義します。これにより各抽象元へ $\mathcal X$ 上の関数が対応します。

残る問題は、異なる抽象元が同じ関数へ潰れないかです。

<a id="lem-rkhs1-completion-injective"></a>
<!-- formal-statement-start -->
> **補題（完備化後の関数表示は単射）**  
> $f\in\mathcal H_K$ が
>
$$
f(x)=0
\qquad(\forall x\in\mathcal X)
$$
>
> を満たすなら $f=0$ である。従って $\mathcal H_K$ の元は $\mathcal X$ 上の関数として一意に識別できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

完備化後も再生性は連続性により

$$
f(x)
=
\langle f,K_x\rangle_{\mathcal H_K}
$$

と延長されます。

$f(x)=0$ がすべての $x$ で成り立つなら

$$
\langle f,K_x\rangle_{\mathcal H_K}=0
\qquad(\forall x\in\mathcal X).
$$

従って $f$ は

$$
\operatorname{span}\{K_x:x\in\mathcal X\}
=
\mathcal H_0
$$

のすべての元と直交します。

$\mathcal H_0$ は $\mathcal H_K$ の中で稠密なので、$f$ は $\mathcal H_K$ 全体と直交します。特に自分自身とも直交し、

$$
\|f\|_{\mathcal H_K}^2
=
\langle f,f\rangle
=
0.
$$

従って $f=0$ です。

$\square$
<!-- proof-end -->

以上により $\mathcal H_K$ は本当に関数からなる Hilbert 空間として扱えます。

---

## 15. 第5段階：再生核が元の $K$ であることを確認する

$K_x$ はもともと $\mathcal H_0$ に属するので、完備化後も $K_x\in\mathcal H_K$ です。

14節の延長された再生性により

$$
f(x)
=
\langle f,K_x\rangle_{\mathcal H_K}
$$

がすべての $f\in\mathcal H_K$ に対して成り立ちます。

さらに

$$
K_x(z)=K(z,x)
$$

なので、$\mathcal H_K$ の再生核は与えられた $K$ そのものです。

従って存在部分が証明されました。

---

## 16. 一意性：核切片は RKHS の中で稠密である

$K$ を再生核とする別の RKHS $\mathcal G$ があるとします。

<a id="lem-rkhs1-kernel-sections-dense"></a>
<!-- formal-statement-start -->
> **補題（核切片の線形包は稠密）**  
> RKHS $\mathcal G$ の再生核を $K$ とする。このとき
>
$$
\operatorname{span}\{K_x:x\in\mathcal X\}
$$
>
> は $\mathcal G$ で稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\in\mathcal G$ がすべての $K_x$ と直交するとします。すると再生性より

$$
f(x)
=
\langle f,K_x\rangle_{\mathcal G}
=
0
$$

がすべての $x$ で成り立ちます。

$\mathcal G$ の元は関数なので、これは $f$ が零関数であることを意味し、$f=0$ です。

従って核切片の線形包の直交補空間は $\{0\}$ です。Hilbert 空間では部分空間の閉包の直交補空間が $\{0\}$ であることは、その閉包が全空間であることを意味します。

よって核切片の線形包は稠密です。

$\square$
<!-- proof-end -->

$\mathcal H_K$ と $\mathcal G$ の両方で、有限和

$$
f=\sum_i a_iK_{x_i},
\qquad
g=\sum_j b_jK_{z_j}
$$

の内積は再生性から

$$
\langle f,g\rangle
=
\sum_{i,j}a_ib_jK(x_i,z_j)
$$

に必ずなります。

従って核切片の有限線形包上では二つの空間の内積が一致します。この共通稠密部分空間上の恒等写像は等長写像なので、完備化へ一意に延長され、$\mathcal H_K$ と $\mathcal G$ の間の等長同型になります。

しかも各 $K_x$ を同じ $K_x$ に写すため、再生性から各点での関数値も保ちます。

これで Moore--Aronszajn の定理の一意性まで閉じました。

<!-- proof-start -->
### 証明

Moore--Aronszajn の定理について、11--15節により、正半定値核 $K$ から $K$ を再生核とする RKHS $\mathcal H_K$ を構成できました。

16節により、同じ $K$ を再生核とする任意の RKHS は、核切片の有限線形包上で同じ内積を持ち、その線形包は両空間で稠密です。従って恒等写像は一意な等長同型へ延長されます。

以上で存在と一意性が示されました。

$\square$
<!-- proof-end -->

---

## 17. 有限集合では Moore--Aronszajn が行列計算になる

$\mathcal X=\{x_1,\ldots,x_m\}$ とし、Gram 行列

$$
G=(K(x_i,x_j))_{i,j=1}^m
$$

が正定値、すなわち可逆だとします。

各関数 $f:\mathcal X\to\mathbb R$ を値ベクトル

$$
\boldsymbol f
=
(f(x_1),\ldots,f(x_m))^{\mathsf T}
$$

と同一視します。

このとき

<a id="prop-rkhs1-finite-set-formula"></a>
<!-- formal-statement-start -->
> **命題（有限集合上の RKHS の行列表現）**  
> $G$ が正定値なら、$\mathbb R^m$ 上の内積
>
$$
\langle f,g\rangle_{\mathcal H_K}
=
\boldsymbol f^{\mathsf T}G^{-1}\boldsymbol g
$$
>
> により $\mathcal X$ 上の全関数からなる RKHS が得られ、その再生核は $K$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x_j$ に対応する核切片 $K_{x_j}$ の値ベクトルは $G$ の第 $j$ 列

$$
G e_j
$$

です。

従って任意の $f$ に対して

$$
\begin{aligned}
\langle f,K_{x_j}\rangle_{\mathcal H_K}
&=
\boldsymbol f^{\mathsf T}G^{-1}(Ge_j)\\
&=
\boldsymbol f^{\mathsf T}e_j\\
&=
f(x_j).
\end{aligned}
$$

よって再生性が成り立ち、再生核は $K$ です。

$\square$
<!-- proof-end -->

有限集合では「核行列の逆行列が関数値ベクトルの内積を決める」と読めます。

---

## 18. 半正定値で特異な場合に何が起こるか

Gram 行列が半正定値でも特異なら、すべての値ベクトルが自由に取れるとは限りません。

たとえば

$$
G=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}
$$

なら

$$
K_1=K_2
$$

です。従って構成される RKHS の任意の関数は

$$
f(1)=f(2)
$$

を満たします。

これは欠陥ではありません。核が二つの点を同じ特徴ベクトルへ写しているため、RKHS から見れば二点を区別できないということです。

正半定値性は存在に十分であり、Gram 行列の正定値性までは要求しません。

---

## 19. Moore--Aronszajn と Mercer の定理は別の役割を持つ

Moore--Aronszajn の定理は、任意の集合 $\mathcal X$ 上の正半定値核から RKHS を構成し、その一意性まで与えます。ここでは入力集合に追加の構造を仮定していません。

一方、Mercer の定理は、入力集合・核・測度により強い条件を置いたうえで、核により具体的な表現を与える定理です。

したがって

$$
\boxed{
\text{核から RKHS を作る基本定理}
=
\text{Moore--Aronszajn}
}
$$

であり、RKHS の存在そのものに Mercer の定理は不要です。

---

## 20. 次章への接続

ここまでで

$$
\boxed{
K
\longleftrightarrow
\mathcal H_K
}
$$

という対応を作りました。

次章では、有限個の訓練点 $x_1,\ldots,x_n$ だけを通じて損失が関数 $f$ を観測するとき、

$$
f^*
\in
\operatorname{span}
\{K_{x_1},\ldots,K_{x_n}\}
$$

と最適解を有限次元部分空間へ落とせることを示します。これが representer theorem です。

---

# 21. 演習 Level A

<a id="ex-rkhs1-a01"></a>
## RKHS1-A01 線形関数空間が RKHS であることを直接確認する

- Level: A
- 目安時間: 15分

$\mathcal X=\mathbb R^p$ とし、

$$
\mathcal H
=
\{f_w(x)=w^{\mathsf T}x:w\in\mathbb R^p\},
\qquad
\langle f_w,f_v\rangle=w^{\mathsf T}v
$$

とする。

1. $\delta_x$ が連続であることを示せ。
2. 点評価の Riesz 表現元 $K_x$ を求めよ。
3. 再生核 $K(x,z)$ を求めよ。

<!-- solution-start -->
### 詳細解答

固定した $x\in\mathbb R^p$ を取ります。

1. [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
|\delta_x(f_w)|
=
|w^{\mathsf T}x|
\le
\|w\|_2\|x\|_2.
$$

この空間では $\|f_w\|_{\mathcal H}=\|w\|_2$ なので

$$
|\delta_x(f_w)|
\le
\|x\|_2\|f_w\|_{\mathcal H}.
$$

従って $\delta_x$ は有界線形汎関数であり、連続です。

2. $K_x=f_x$、すなわち係数ベクトルが $x$ の線形関数

$$
K_x(z)=x^{\mathsf T}z
$$

を考えます。このとき

$$
\langle f_w,K_x\rangle_{\mathcal H}
=
w^{\mathsf T}x
=
f_w(x).
$$

従って $K_x$ が点評価の Riesz 表現元です。

3. 定義より

$$
K(x,z)=K_z(x)=z^{\mathsf T}x=x^{\mathsf T}z.
$$

従って再生核は線形核です。
<!-- solution-end -->

<a id="ex-rkhs1-a02"></a>
## RKHS1-A02 評価汎関数のノルム

- Level: A
- 目安時間: 10分

RKHS $\mathcal H$ の再生核を $K$ とする。任意の $x\in\mathcal X$ について

$$
\|\delta_x\|_{\mathcal H^*}
=
\sqrt{K(x,x)}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

再生性より

$$
\delta_x(f)
=
f(x)
=
\langle f,K_x\rangle_{\mathcal H}.
$$

[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)では、連続線形汎関数の双対ノルムは表現ベクトルのノルムに等しいので

$$
\|\delta_x\|_{\mathcal H^*}
=
\|K_x\|_{\mathcal H}.
$$

さらに[再生核の基本公式](#prop-rkhs1-reproducing-properties)から

$$
\|K_x\|_{\mathcal H}^2
=
\langle K_x,K_x\rangle
=
K(x,x).
$$

両辺は非負なので平方根を取り

$$
\boxed{
\|\delta_x\|_{\mathcal H^*}
=
\sqrt{K(x,x)}
}.
$$
<!-- solution-end -->

<a id="ex-rkhs1-a03"></a>
## RKHS1-A03 特徴写像から正半定値核を作る

- Level: A
- 目安時間: 15分

実 Hilbert 空間 $\mathcal F$ と写像 $\Phi:\mathcal X\to\mathcal F$ に対して

$$
K(x,z)=\langle\Phi(x),\Phi(z)\rangle_{\mathcal F}
$$

と置く。$K$ が正半定値核であることを定義から示せ。

<!-- solution-start -->
### 詳細解答

内積の対称性から

$$
K(x,z)
=
\langle\Phi(x),\Phi(z)\rangle
=
\langle\Phi(z),\Phi(x)\rangle
=
K(z,x).
$$

次に任意の $x_1,\ldots,x_n\in\mathcal X$ と $c_1,\ldots,c_n\in\mathbb R$ を取ります。

$$
\begin{aligned}
\sum_{i,j}c_ic_jK(x_i,x_j)
&=
\sum_{i,j}c_ic_j
\langle\Phi(x_i),\Phi(x_j)\rangle\\
&=
\left\langle
\sum_i c_i\Phi(x_i),
\sum_j c_j\Phi(x_j)
\right\rangle\\
&=
\left\|
\sum_i c_i\Phi(x_i)
\right\|^2\\
&\ge0.
\end{aligned}
$$

従って定義の二条件を満たし、$K$ は正半定値核です。
<!-- solution-end -->

<a id="ex-rkhs1-a04"></a>
## RKHS1-A04 正半定値性を失った核候補

- Level: A
- 目安時間: 15分

$\mathcal X=\{1,2\}$ 上で

$$
G=
\begin{pmatrix}
1&2\\
2&1
\end{pmatrix}
$$

を Gram 行列とする対称関数 $K$ を考える。

1. $c=(1,-1)^{\mathsf T}$ に対して $c^{\mathsf T}Gc$ を計算せよ。
2. この $K$ が RKHS の再生核になれない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. まず

$$
Gc
=
\begin{pmatrix}
1&2\\
2&1
\end{pmatrix}
\begin{pmatrix}
1\\
-1
\end{pmatrix}
=
\begin{pmatrix}
-1\\
1
\end{pmatrix}.
$$

従って

$$
c^{\mathsf T}Gc
=
(1,-1)
\begin{pmatrix}
-1\\
1
\end{pmatrix}
=
-2.
$$

2. もし $K$ がある RKHS の再生核なら

$$
c^{\mathsf T}Gc
=
\sum_{i,j}c_ic_jK(i,j)
=
\left\|
K_1-K_2
\right\|^2
\ge0
$$

でなければなりません。しかし実際には $-2$ です。従って矛盾し、この $K$ は再生核にはなれません。

壊れているのは単なる行列条件ではなく、核から作るはずの「ノルム二乗」が負になってしまう点です。
<!-- solution-end -->

# 22. 演習 Level B

<a id="ex-rkhs1-b01"></a>
## RKHS1-B01 Moore--Aronszajn 構成の内積が表示によらないこと

- Level: B
- 目安時間: 25分

正半定値核 $K$ に対し

$$
\mathcal H_0
=
\operatorname{span}\{K_x:x\in\mathcal X\}
$$

とする。

$$
\left\langle
\sum_i a_iK_{x_i},
\sum_j b_jK_{z_j}
\right\rangle_0
=
\sum_{i,j}a_ib_jK(x_i,z_j)
$$

が有限和表示に依存しないことを示せ。

<!-- solution-start -->
### 詳細解答

表示の差が零関数になる場合に内積への寄与が 0 であることを示せば十分です。

$$
h
=
\sum_i a_iK_{x_i}
=0
$$

が関数として恒等的に 0 だとします。任意の $z\in\mathcal X$ について

$$
0=h(z)
=
\sum_i a_iK(z,x_i).
$$

$K$ は対称なので

$$
\sum_i a_iK(x_i,z)=0.
$$

任意の

$$
g=\sum_j b_jK_{z_j}
$$

に対して

$$
\begin{aligned}
\sum_{i,j}a_ib_jK(x_i,z_j)
&=
\sum_j b_j
\left(
\sum_i a_iK(x_i,z_j)
\right)\\
&=
\sum_j b_j\cdot0\\
&=
0.
\end{aligned}
$$

従って第1引数の表示を零関数だけ変更しても値は変わりません。

内積候補は対称なので、第2引数の表示についても同じです。よって式は $\mathcal H_0$ の元そのものだけで決まり、表示によらず定義されます。
<!-- solution-end -->

<a id="ex-rkhs1-b02"></a>
## RKHS1-B02 有限集合上の RKHS を行列から構成する

- Level: B
- 目安時間: 25分

$\mathcal X=\{1,2\}$ とし、

$$
G=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

1. $G^{-1}$ を求めよ。
2. 関数 $f$ を値ベクトル $\boldsymbol f=(f(1),f(2))^{\mathsf T}$ と同一視し、
   $$
   \langle f,g\rangle
   =
   \boldsymbol f^{\mathsf T}G^{-1}\boldsymbol g
   $$
   と定める。この空間で $K_1,K_2$ の値ベクトルを求め、再生性を確認せよ。
3. $f(1)=1,f(2)=0$ の関数のノルム二乗を求めよ。

<!-- solution-start -->
### 詳細解答

1. 直接計算すると

$$
G^{-1}
=
\frac13
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
$$

2. $K_j(i)=K(i,j)$ なので、$K_1,K_2$ の値ベクトルはそれぞれ $G$ の第1列、第2列です。

$$
\boldsymbol K_1
=
\begin{pmatrix}
2\\
1
\end{pmatrix}
=
Ge_1,
\qquad
\boldsymbol K_2
=
\begin{pmatrix}
1\\
2
\end{pmatrix}
=
Ge_2.
$$

任意の $f$ について

$$
\begin{aligned}
\langle f,K_j\rangle
&=
\boldsymbol f^{\mathsf T}G^{-1}(Ge_j)\\
&=
\boldsymbol f^{\mathsf T}e_j\\
&=
f(j).
\end{aligned}
$$

従って再生性が成り立ちます。

3. $\boldsymbol f=(1,0)^{\mathsf T}$ なので

$$
\begin{aligned}
\|f\|^2
&=
\boldsymbol f^{\mathsf T}G^{-1}\boldsymbol f\\
&=
(1,0)
\frac13
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}
\begin{pmatrix}
1\\
0
\end{pmatrix}\\
&=
\frac23.
\end{aligned}
$$

従って

$$
\boxed{\|f\|^2=\frac23}.
$$
<!-- solution-end -->

<a id="ex-rkhs1-b03"></a>
## RKHS1-B03 核の和

- Level: B
- 目安時間: 25分

$K_1,K_2$ を $\mathcal X$ 上の正半定値核とし、$a,b\ge0$ とする。

$$
K=aK_1+bK_2
$$

が正半定値核であることを示せ。また、$K_1,K_2$ がそれぞれ Hilbert 空間 $\mathcal F_1,\mathcal F_2$ の特徴写像 $\Phi_1,\Phi_2$ で表されるとき、$K$ の特徴写像を一つ構成せよ。

<!-- solution-start -->
### 詳細解答

まず対称性は $K_1,K_2$ の対称性から従います。

任意の有限点 $x_1,\ldots,x_n$ と係数 $c_1,\ldots,c_n$ に対して

$$
\begin{aligned}
\sum_{i,j}c_ic_jK(x_i,x_j)
&=
a\sum_{i,j}c_ic_jK_1(x_i,x_j)
+
b\sum_{i,j}c_ic_jK_2(x_i,x_j).
\end{aligned}
$$

$K_1,K_2$ は正半定値核なので二つの和はそれぞれ非負です。さらに $a,b\ge0$ なので右辺全体も非負です。従って $K$ は正半定値核です。

次に直和 Hilbert 空間

$$
\mathcal F
=
\mathcal F_1\oplus\mathcal F_2
$$

を取り、

$$
\Phi(x)
=
\left(
\sqrt a\,\Phi_1(x),
\sqrt b\,\Phi_2(x)
\right)
$$

と置きます。

直和内積より

$$
\begin{aligned}
\langle\Phi(x),\Phi(z)\rangle_{\mathcal F}
&=
a\langle\Phi_1(x),\Phi_1(z)\rangle_{\mathcal F_1}
+
b\langle\Phi_2(x),\Phi_2(z)\rangle_{\mathcal F_2}\\
&=
aK_1(x,z)+bK_2(x,z)\\
&=
K(x,z).
\end{aligned}
$$

従ってこの $\Phi$ が求める特徴写像です。
<!-- solution-end -->

# 23. 演習 Level C

<a id="ex-rkhs1-c01"></a>
## RKHS1-C01 Moore--Aronszajn の構成を再構成する

- Level: C
- 目安時間: 50分

集合 $\mathcal X$ 上の正半定値核 $K$ が与えられているとする。以下を順に示し、$K$ を再生核とする RKHS の存在と一意性を証明せよ。

1. $\mathcal H_0=\operatorname{span}\{K_x:x\in\mathcal X\}$ 上に
   $$
   \left\langle
   \sum_i a_iK_{x_i},
   \sum_j b_jK_{z_j}
   \right\rangle_0
   =
   \sum_{i,j}a_ib_jK(x_i,z_j)
   $$
   で内積を定められること。
2. $f(x)=\langle f,K_x\rangle_0$ と
   $$
   |f(x)|\le\sqrt{K(x,x)}\,\|f\|_0
   $$
   を示すこと。
3. $\mathcal H_0$ の完備化 $\mathcal H_K$ で点評価を連続延長し、各元を関数として一意に識別できること。
4. $K$ が $\mathcal H_K$ の再生核になること。
5. 同じ $K$ を再生核とする任意の RKHS では $\operatorname{span}\{K_x\}$ が稠密であり、そこから一意性が従うこと。

<!-- solution-start -->
### 詳細解答

**1. 内積の構成**

まず有限和表示によらないことを確認します。

$$
h=\sum_i a_iK_{x_i}=0
$$

が零関数なら、任意の $z$ に対して

$$
0=h(z)=\sum_i a_iK(z,x_i)
=\sum_i a_iK(x_i,z)
$$

です。従って任意の $g=\sum_j b_jK_{z_j}$ に対して

$$
\sum_{i,j}a_ib_jK(x_i,z_j)
=
\sum_j b_j
\left(
\sum_i a_iK(x_i,z_j)
\right)
=
0.
$$

よって表示の差が零関数である限り内積値は変わりません。

双線形性と対称性は式から直ちに従います。正半定値性により

$$
\langle f,f\rangle_0\ge0.
$$

さらに $\langle f,f\rangle_0=0$ なら、上の非負性から得られる [Cauchy--Schwarz](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) により

$$
|\langle f,K_x\rangle_0|^2
\le
\langle f,f\rangle_0
\langle K_x,K_x\rangle_0
=
0
$$

です。従って $\langle f,K_x\rangle_0=0$ がすべての $x$ で成り立ちます。次の計算からこれは $f(x)=0$ を意味するので $f$ は零関数です。

よって $\langle\cdot,\cdot\rangle_0$ は内積です。

**2. 再生性と点評価の有界性**

$f=\sum_i a_iK_{x_i}$ に対して

$$
\begin{aligned}
\langle f,K_x\rangle_0
&=
\sum_i a_iK(x_i,x)\\
&=
\sum_i a_iK(x,x_i)\\
&=
f(x).
\end{aligned}
$$

従って [Cauchy--Schwarz](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) より

$$
|f(x)|
=
|\langle f,K_x\rangle_0|
\le
\|f\|_0\|K_x\|_0.
$$

また

$$
\|K_x\|_0^2
=
K(x,x)
$$

なので

$$
|f(x)|
\le
\sqrt{K(x,x)}\,\|f\|_0.
$$

**3. 完備化後の関数表示**

$\mathcal H_0$ を完備化して $\mathcal H_K$ を得ます。

固定した $x$ について、上の評価から $\delta_x:f\mapsto f(x)$ は $\mathcal H_0$ 上の有界線形汎関数です。従って $\mathcal H_K$ へ一意に連続延長できます。その延長を $\widetilde\delta_x$ と書き、

$$
f(x)
=
\widetilde\delta_x(f)
$$

と定義します。

この対応が単射であることを示します。$f(x)=0$ がすべての $x$ で成り立つなら、連続延長された再生性から

$$
\langle f,K_x\rangle_{\mathcal H_K}=0
$$

がすべての $x$ で成り立ちます。

従って $f$ は $\mathcal H_0=\operatorname{span}\{K_x\}$ と直交します。$\mathcal H_0$ は完備化 $\mathcal H_K$ で稠密なので、$f$ は $\mathcal H_K$ 全体と直交します。特に

$$
\|f\|^2=\langle f,f\rangle=0
$$

なので $f=0$ です。

従って完備化後の元は関数として一意に識別できます。

**4. 再生核の確認**

$K_x\in\mathcal H_0\subset\mathcal H_K$ です。$\mathcal H_0$ 上の恒等式

$$
f(x)=\langle f,K_x\rangle_0
$$

は両辺が $f$ に関して連続なので $\mathcal H_K$ 全体へ延長され、

$$
f(x)=\langle f,K_x\rangle_{\mathcal H_K}
$$

となります。

さらに $K_x(z)=K(z,x)$ なので、$K$ は $\mathcal H_K$ の再生核です。

**5. 一意性**

$K$ を再生核とする別の RKHS $\mathcal G$ を考えます。

$f\in\mathcal G$ がすべての $K_x$ と直交するなら、再生性から

$$
f(x)=\langle f,K_x\rangle_{\mathcal G}=0
$$

がすべての $x$ で成り立つため $f=0$ です。

従って

$$
\operatorname{span}\{K_x:x\in\mathcal X\}
$$

の直交補空間は $\{0\}$ であり、その線形包は $\mathcal G$ で稠密です。

有限線形結合 $f=\sum_i a_iK_{x_i}$、$g=\sum_j b_jK_{z_j}$ に対して、どの RKHS でも再生性から

$$
\langle f,g\rangle
=
\sum_{i,j}a_ib_jK(x_i,z_j)
$$

です。従って $\mathcal H_K$ と $\mathcal G$ は共通稠密部分空間上で同じ内積を持ちます。

その部分空間上の恒等写像は等長写像なので、完備化により一意な等長同型へ延長されます。各 $K_x$ を保つため、再生性から関数値も保ちます。

以上により、$K$ を再生核とする RKHS は存在し、関数値を保つ等長同型を除いて一意です。
<!-- solution-end -->

---

## 章末チェック

- RKHS を「関数からなる Hilbert 空間」だけでなく、全ての点評価が連続である空間として定義できる。
- [Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)から点評価の表現元 $K_x$ を得て、再生性を導ける。
- 再生核が対称かつ正半定値になることをノルム二乗へ変形して証明できる。
- 正半定値核と特徴写像の内積表示の関係を説明できる。
- Moore--Aronszajn の構成で、内積が表示によらず定まること、点評価の有界性、完備化後の関数同定、一意性を順に説明できる。
- 正半定値性を失うと「ノルム二乗」が負になり、構成が壊れることを反例で説明できる。
