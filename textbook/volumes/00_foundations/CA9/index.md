# CA9 標準複素解析 IX：楕円関数・Weierstrass $\wp$ 関数

> **複素解析 II の二周期関数編**。CA8 で構成した複素トーラス $\mathbb C/\Lambda$ 上では、正則関数は定数しかない。しかし有理型関数まで許せば、格子の幾何を反映した豊かな関数が現れる。本章では楕円関数を「二重周期を持つ有理型関数」として定義し、Weierstrass の $\wp$ 関数を級数から構成する。収束、周期性、Laurent 展開、微分方程式、半周期、加法公式までを一続きに証明し、最後に複素トーラスと非特異三次曲線の対応の入口へ進む。

<!-- definition-example-audit: strict -->

## 0. この章の主線

本章で使う格子 $\Lambda$ と複素トーラスは、[CA8 の複素格子](../CA8/index.md#def-ca8-complex-lattice)と[複素トーラス](../CA8/index.md#thm-ca8-complex-torus)を正本とする。正規収束は [CA7 の定義](../CA7/index.md#def-ca7-normal-convergence)、留数定理は [CA4](../CA4/index.md#thm-ca4-residue-theorem)、偏角原理は [CA5](../CA5/index.md#thm-ca5-argument-principle)を使う。

~~~text
格子 Λ と基本平行四辺形
  ↓
Λ-周期な有理型関数 = 楕円関数
  ↓ 基本平行四辺形の対辺積分が相殺
留数和 0・零点数 = 極数・非定数なら極を持つ
  ↓
格子点個数 O(R^2)
  ↓
Σ |ω|^{-3} < ∞
  ↓
Weierstrass wp 級数の正規収束
  ↓
偶性・Λ周期性・二重極
  ↓ Laurent 展開
g2, g3
  ↓
(wp')^2 = 4wp^3 - g2 wp - g3
  ↓
半周期・三つの分岐値・Δ ≠ 0
  ↓
加法公式
  ↓
C/Λ と三次曲線の対応の入口
~~~

Jacobi の楕円関数、モジュラー形式、モジュラー群、複素乗法、楕円曲線の算術は本章の主線には入れない。

---

## 1. 基本平行四辺形と楕円関数

CA8 と同じく、$\omega_1,\omega_2\in\mathbb C$ を実線形独立とし、

$$
\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2
$$

を格子とする。

<a id="def-ca9-fundamental-parallelogram"></a>
<!-- formal-statement-start -->
### 定義（基本平行四辺形）

$a\in\mathbb C$ に対して

$$
P(a)=
\left\{
a+s\omega_1+t\omega_2:
0\le s<1,\ 0\le t<1
\right\}
$$

を $\Lambda$ の **半開基本平行四辺形**という。閉包を $\overline{P(a)}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca9-fundamental-parallelogram -->
**定義の確認**。正方格子 $\Lambda=\mathbb Z+i\mathbb Z$ なら

$$
P(0)=\{x+iy:0\le x<1,\ 0\le y<1\}.
$$

任意の $z=x+iy$ は整数 $m,n$ を適当に選べば $z-(m+in)\in P(0)$ となる。従って各格子同値類はこの半開正方形にちょうど一つ代表元を持つ。
<!-- definition-example-end -->

<a id="def-ca9-elliptic-function"></a>
<!-- formal-statement-start -->
### 定義（楕円関数）

格子 $\Lambda\subset\mathbb C$ に対し、有理型関数 $f:\mathbb C\to\widehat{\mathbb C}$ が

$$
f(z+\lambda)=f(z)
\qquad
(z\in\mathbb C,\ \lambda\in\Lambda)
$$

を満たすとき、$f$ を **$\Lambda$ に関する楕円関数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca9-elliptic-function -->
**定義の確認**。任意の定数関数 $f(z)=c$ は全ての $\lambda\in\Lambda$ に対して $f(z+\lambda)=c=f(z)$ なので楕円関数である。非定数の例は §4 で構成する $\wp$ 関数である。
<!-- definition-example-end -->

楕円関数は商写像 $q:\mathbb C\to\mathbb C/\Lambda$ の各ファイバー上で一定だから、CA8 の複素トーラス上の有理型関数と同じものだと考えられる。一方、[コンパクト Riemann 面上の正則関数の剛性](../CA8/index.md#thm-ca8-compact-holomorphic-constant)から、極を一つも持たない楕円関数は定数に限られる。したがって非定数楕円関数では「極を許す」ことが本質である。

---

## 2. 基本平行四辺形の境界では何が相殺するか

楕円関数の零点・極は格子平行移動で繰り返す。従って全平面で数える代わりに、基本平行四辺形一枚だけを調べればよい。

境界上に極があると留数定理をそのまま使えないので、必要なら $a$ をわずかに動かし、境界が零点・極を通らない基本平行四辺形を取る。零点・極は離散集合なので、そのような平行移動は常に可能である。

<a id="lem-ca9-opposite-side-cancellation"></a>
<!-- formal-statement-start -->
### 補題（対辺積分の相殺）

$f$ を $\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2$ に関する楕円関数とする。閉基本平行四辺形 $\overline{P(a)}$ の境界上に $f$ の極がないとする。このとき

$$
\int_{\partial P(a)} f(z)\,dz=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

下辺を $a\to a+\omega_1$、上辺を $a+\omega_2\to a+\omega_1+\omega_2$ と書く。上辺は境界の正向きでは逆向きに通るので、

$$
\int_{a}^{a+\omega_1}f(z)\,dz
-
\int_{a+\omega_2}^{a+\omega_1+\omega_2}f(z)\,dz
$$

が両辺の寄与である。二つ目で $z=w+\omega_2$ と置くと、周期性から

$$
f(w+\omega_2)=f(w)
$$

なので両者は打ち消し合う。残りの二辺も $\omega_1$-周期性で同様に相殺する。よって境界積分全体は0である。$\square$
<!-- proof-end -->

<a id="thm-ca9-residue-sum-zero"></a>
<!-- formal-statement-start -->
### 定理（楕円関数の留数和）

$f$ を $\Lambda$ に関する楕円関数とし、$\overline{P(a)}$ の境界上に極がないとする。このとき $P(a)$ 内の全ての極における留数の和は0である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[留数定理](../CA4/index.md#thm-ca4-residue-theorem)と対辺積分の相殺から

$$
2\pi i
\sum_{p\in P(a)}
\operatorname{Res}(f,p)
=
\int_{\partial P(a)}f(z)\,dz
=
0.
$$

従って留数和は0である。$\square$
<!-- proof-end -->

この定理から、基本平行四辺形内に単純極をただ一つだけ持つ楕円関数は存在しない。単純極一個ならその留数は非零であり、留数和0に反するからである。

<a id="thm-ca9-zero-pole-balance"></a>
<!-- formal-statement-start -->
### 定理（楕円関数の零点数と極数）

非零楕円関数 $f$ を取り、$\overline{P(a)}$ の境界上に $f$ の零点も極もないとする。$P(a)$ 内の零点の重複度総和を $N_0$、極の重複度総和を $N_\infty$ とすると

$$
N_0=N_\infty.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f'/f$ も $\Lambda$-周期である。境界上に零点・極がないので対辺積分の相殺を適用でき、

$$
\int_{\partial P(a)}
\frac{f'(z)}{f(z)}\,dz=0.
$$

一方、[偏角原理](../CA5/index.md#thm-ca5-argument-principle)により

$$
\frac{1}{2\pi i}
\int_{\partial P(a)}
\frac{f'(z)}{f(z)}\,dz
=
N_0-N_\infty.
$$

左辺が0だから $N_0=N_\infty$ である。$\square$
<!-- proof-end -->

<a id="cor-ca9-nonconstant-has-pole"></a>
<!-- formal-statement-start -->
### 系（非定数楕円関数は極を持つ）

楕円関数 $f$ が非定数なら、任意の基本平行四辺形には重複を適切に数えて少なくとも一つ極がある。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

もし極がなければ $f$ は全平面で正則である。閉基本平行四辺形上で $|f|$ は有界であり、周期性によりその上界が全平面の上界になる。[Liouville の定理](../CA3/index.md#thm-ca3-liouville)から $f$ は定数となり、仮定に反する。$\square$
<!-- proof-end -->

---

## 3. 格子上の級数を支える個数評価

$\wp$ の定義では格子点全体にわたる級数が現れる。二次元格子では半径 $R$ 内の点数が $R^2$ 程度に増えるため、$|\omega|^{-s}$ の和には $s>2$ が必要になる。

<a id="lem-ca9-lattice-point-count"></a>
<!-- formal-statement-start -->
### 補題（格子点個数の二次評価）

格子 $\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2$ に対し、ある定数 $C>0$ が存在して、全ての $R\ge1$ について

$$
\#\{\omega\in\Lambda:|\omega|\le R\}
\le CR^2
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

実線形写像

$$
T:\mathbb R^2\to\mathbb C,
\qquad
T(x,y)=x\omega_1+y\omega_2
$$

は $\omega_1,\omega_2$ の実線形独立性により可逆である。有限次元では逆写像も連続だから、ある $c>0$ が存在して

$$
|T(x,y)|
\ge
c\sqrt{x^2+y^2}
$$

が全ての $(x,y)\in\mathbb R^2$ で成り立つ。

$\omega=m\omega_1+n\omega_2$ が $|\omega|\le R$ を満たすなら

$$
\sqrt{m^2+n^2}\le R/c.
$$

従って候補となる整数対は正方形

$$
|m|,|n|\le R/c
$$

に含まれる。その個数は $(2R/c+3)^2$ 以下で、これは $CR^2$ で上から抑えられる。$\square$
<!-- proof-end -->

<a id="cor-ca9-lattice-summability"></a>
<!-- formal-statement-start -->
### 系（格子冪和の収束）

任意の実数 $s>2$ に対し

$$
\sum_{\omega\in\Lambda\setminus\{0\}}
\frac{1}{|\omega|^s}
<\infty.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

十分大きい $k$ について二進殻

$$
A_k=
\{\omega\in\Lambda:2^k\le|\omega|<2^{k+1}\}
$$

を考える。格子点個数評価から

$$
\#A_k\le C2^{2k+2}.
$$

従って

$$
\sum_{\omega\in A_k}
|\omega|^{-s}
\le
C2^{2k+2}2^{-ks}
=
4C\,2^{-k(s-2)}.
$$

$s>2$ なので右辺の幾何級数は収束する。有限個の内側格子点を加えても収束性は変わらない。$\square$
<!-- proof-end -->

ここで $s=3$ が使えることが、$\wp$ の補正項の設計理由である。単純に $\sum (z-\omega)^{-2}$ と書くと尾部は $|\omega|^{-2}$ 程度で二次元格子には足りない。$1/\omega^2$ を差し引くと一次の消去が起こり、尾部が $|\omega|^{-3}$ へ改善する。

---

## 4. Weierstrass $\wp$ 関数を級数から作る

<a id="def-ca9-weierstrass-p"></a>
<!-- formal-statement-start -->
### 定義（Weierstrass $\wp$ 関数）

格子 $\Lambda\subset\mathbb C$ に対し、$z\notin\Lambda$ で

$$
\wp_\Lambda(z)
=
\frac{1}{z^2}
+
\sum_{\omega\in\Lambda\setminus\{0\}}
\left(
\frac{1}{(z-\omega)^2}
-
\frac{1}{\omega^2}
\right)
$$

と定める。文脈で格子が固定されているときは $\wp(z)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca9-weierstrass-p -->
**定義の確認**。$\omega$ と $-\omega$ の二項を組にすると、

$$
\left(
\frac{1}{(z-\omega)^2}-\frac{1}{\omega^2}
\right)
+
\left(
\frac{1}{(z+\omega)^2}-\frac{1}{\omega^2}
\right)
$$

となる。$z=0$ では補正部分が0であり、原点の主要部 $1/z^2$ だけが残る。この「各格子点に二重極を置きつつ、遠方では低次項を消す」構造が定義の核心である。
<!-- definition-example-end -->

<a id="thm-ca9-weierstrass-normal-convergence"></a>
<!-- formal-statement-start -->
### 定理（$\wp$ 級数の正規収束）

上の級数は $\mathbb C\setminus\Lambda$ 上で正規収束する。従って $\wp_\Lambda$ は $\mathbb C\setminus\Lambda$ 上正則であり、各格子点に二重極を持つ有理型関数へ延長される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意のコンパクト集合

$$
K\subset\mathbb C\setminus\Lambda
$$

を固定し、

$$
M=\max_{z\in K}|z|
$$

とする。$|\omega|\ge2M+1$ なら $z\in K$ に対し

$$
|z-\omega|
\ge
|\omega|-|z|
\ge
\frac{|\omega|}{2}.
$$

また

$$
\frac{1}{(z-\omega)^2}-\frac{1}{\omega^2}
=
\frac{2\omega z-z^2}
{\omega^2(z-\omega)^2}.
$$

従って

$$
\left|
\frac{1}{(z-\omega)^2}-\frac{1}{\omega^2}
\right|
\le
\frac{2|\omega|M+M^2}
{|\omega|^2(|\omega|/2)^2}
\le
\frac{C_K}{|\omega|^3}
$$

となる定数 $C_K$ が取れる。

格子冪和の収束から

$$
\sum_{\omega\ne0}|\omega|^{-3}<\infty,
$$

よって [CA7 の正規収束の定義](../CA7/index.md#def-ca7-normal-convergence)に従って尾部は $K$ 上正規収束する。有限個の残りの項は問題ないので全級数が正規収束する。

従って [正規収束する正則関数級数の項別微分](../CA7/index.md#cor-ca7-normal-series-termwise-differentiation)を適用でき、$\mathbb C\setminus\Lambda$ 上正則である。

原点近傍では $\omega\ne0$ の各項は正則で、補正級数も局所一様収束するため

$$
\wp(z)=\frac1{z^2}+h(z)
$$

と書ける。ここで $h$ は0近傍で正則なので、0は二重極である。各格子点で二重極になることは §5 の周期性から従う。$\square$
<!-- proof-end -->

項別微分により

$$
\wp'(z)
=
-\frac{2}{z^3}
-
2\sum_{\omega\in\Lambda\setminus\{0\}}
\frac{1}{(z-\omega)^3}.
$$

微分後は補正定数が消え、$|\omega|^{-3}$ の絶対収束がそのまま見える。

---

## 5. 偶性・周期性・極

<a id="thm-ca9-weierstrass-symmetry-periodicity"></a>
<!-- formal-statement-start -->
### 定理（$\wp$ の偶性と周期性）

Weierstrass $\wp$ 関数は

$$
\wp(-z)=\wp(z),
\qquad
\wp(z+\lambda)=\wp(z)
\quad(\lambda\in\Lambda)
$$

を満たす。従って $\wp$ は $\Lambda$ に関する偶な楕円関数であり、$\wp'$ は奇な楕円関数である。$\wp$ は各格子点に二重極を持ち、$\wp'$ は各格子点に三重極を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず偶性を示す。定義式で $z$ を $-z$ に置き換え、格子が $\omega\mapsto-\omega$ で不変であることを使って添字を付け替えると

$$
\wp(-z)=\wp(z).
$$

従って $\wp'$ は奇関数である。

次に微分表示

$$
\wp'(z)
=
-2
\sum_{\omega\in\Lambda}
\frac1{(z-\omega)^3}
$$

を使う。ここでは $\omega=0$ の項も和へ含めた。絶対収束するので $\lambda\in\Lambda$ に対し添字を $\eta=\omega-\lambda$ とずらせて

$$
\wp'(z+\lambda)
=
-2
\sum_{\omega\in\Lambda}
\frac1{(z+\lambda-\omega)^3}
=
-2
\sum_{\eta\in\Lambda}
\frac1{(z-\eta)^3}
=
\wp'(z).
$$

よって

$$
H_\lambda(z)=\wp(z+\lambda)-\wp(z)
$$

は $\mathbb C\setminus\Lambda$ 上で導関数0、したがって定数 $c_\lambda$ である。偶性を使うと

$$
\wp(-z-\lambda)-\wp(-z)
=
c_\lambda.
$$

左辺は

$$
\wp(z+\lambda)-\wp(z)=c_\lambda
$$

ではなく、元の関係を $w=-z-\lambda$ に適用して

$$
\wp(-z)-\wp(-z-\lambda)=c_\lambda.
$$

偶性から

$$
\wp(z)-\wp(z+\lambda)=c_\lambda.
$$

一方、元の関係は $\wp(z+\lambda)-\wp(z)=c_\lambda$ だから $c_\lambda=-c_\lambda$、従って $c_\lambda=0$ である。よって $\wp$ は $\Lambda$-周期である。

原点に二重極を持つことは前節で確認した。周期性で任意の格子点へ移せば全格子点で二重極となり、微分 $\wp'$ は三重極を持つ。$\square$
<!-- proof-end -->

この証明で重要なのは、$\wp$ 自身の定義級数を無理に添字移動しないことである。$\wp$ の各項には $-1/\omega^2$ という基準点依存の補正がある。一方、$\wp'$ の級数は絶対収束する純粋な格子和なので安全に添字をずらせる。

---

## 6. Laurent 展開と不変量 $g_2,g_3$

<a id="def-ca9-eisenstein-invariants"></a>
<!-- formal-statement-start -->
### 定義（Eisenstein 級数と Weierstrass 不変量）

整数 $k\ge2$ に対して

$$
G_{2k}(\Lambda)
=
\sum_{\omega\in\Lambda\setminus\{0\}}
\frac1{\omega^{2k}}
$$

と定める。特に

$$
g_2(\Lambda)=60G_4(\Lambda),
\qquad
g_3(\Lambda)=140G_6(\Lambda)
$$

を **Weierstrass 不変量**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca9-eisenstein-invariants -->
**定義の確認**。$2k\ge4>2$ なので格子冪和の絶対収束から $G_{2k}$ は絶対収束する。また $\omega$ と $-\omega$ が同時に格子へ入るため、奇数冪の格子和は対ごとに相殺する。
<!-- definition-example-end -->

<a id="prop-ca9-laurent-expansion"></a>
<!-- formal-statement-start -->
### 命題（$\wp$ の原点での Laurent 展開）

原点の十分小さい近傍で

$$
\wp(z)
=
\frac1{z^2}
+
\sum_{k=1}^{\infty}
(2k+1)G_{2k+2}(\Lambda)z^{2k}.
$$

特に

$$
\wp(z)
=
\frac1{z^2}
+
\frac{g_2}{20}z^2
+
\frac{g_3}{28}z^4
+
O(z^6).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

0に最も近い非零格子点までの距離を $d>0$ とする。$|z|<d$ なら各 $\omega\ne0$ について $|z/\omega|<1$ であり、

$$
\frac1{(z-\omega)^2}
=
\frac1{\omega^2}
\frac1{(1-z/\omega)^2}
=
\frac1{\omega^2}
\sum_{n=0}^{\infty}
(n+1)\left(\frac z\omega\right)^n.
$$

従って

$$
\frac1{(z-\omega)^2}
-
\frac1{\omega^2}
=
\sum_{n=1}^{\infty}
(n+1)\frac{z^n}{\omega^{n+2}}.
$$

$|z|\le r<d$ に制限すれば絶対一様収束するため和の順序を交換できる。$n$ が奇数なら $\omega$ と $-\omega$ の寄与が相殺する。$n=2k$ の項だけが残り、

$$
\wp(z)
=
\frac1{z^2}
+
\sum_{k=1}^{\infty}
(2k+1)
G_{2k+2}z^{2k}.
$$

最初の二係数は

$$
3G_4=\frac{g_2}{20},
\qquad
5G_6=\frac{g_3}{28}.
$$

これで表示を得る。$\square$
<!-- proof-end -->

---

## 7. Weierstrass の微分方程式

<a id="thm-ca9-weierstrass-differential-equation"></a>
<!-- formal-statement-start -->
### 定理（Weierstrass の微分方程式）

格子 $\Lambda$ に付随する $\wp$ と不変量 $g_2,g_3$ は

$$
\boxed{
(\wp'(z))^2
=
4\wp(z)^3
-
g_2\wp(z)
-
g_3
}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

関数

$$
F(z)
=
(\wp'(z))^2
-
4\wp(z)^3
+
g_2\wp(z)
+
g_3
$$

を考える。$\wp,\wp'$ は楕円関数なので $F$ も楕円関数である。

格子点以外では正則である。格子点での極が消えることを原点で確認すれば、周期性により全格子点で同じである。

前節の展開で

$$
a=\frac{g_2}{20},
\qquad
b=\frac{g_3}{28}
$$

と置けば

$$
\wp(z)=z^{-2}+az^2+bz^4+O(z^6),
$$

$$
\wp'(z)=-2z^{-3}+2az+4bz^3+O(z^5).
$$

従って

$$
(\wp')^2
=
4z^{-6}
-
8az^{-2}
-
16b
+
O(z^2),
$$

一方

$$
4\wp^3-g_2\wp-g_3
=
4z^{-6}
+
(12a-g_2)z^{-2}
+
(12b-g_3)
+
O(z^2).
$$

係数を代入すると

$$
12a-g_2
=
-\frac{2}{5}g_2
=
-8a,
$$

$$
12b-g_3
=
-\frac{4}{7}g_3
=
-16b.
$$

よって $F(z)=O(z^2)$ で、原点の特異点は可除、しかも $F(0)=0$ と延長できる。

したがって $F$ は全平面で正則な楕円関数である。[CA8 のコンパクトトーラス上の正則関数の剛性](../CA8/index.md#thm-ca8-compact-holomorphic-constant)または Liouville の定理により $F$ は定数であり、原点での延長値が0なので

$$
F\equiv0.
$$

これが求める微分方程式である。$\square$
<!-- proof-end -->

<a id="cor-ca9-second-derivative"></a>
<!-- formal-statement-start -->
### 系（$\wp''$ の表示）

全ての $z\notin\Lambda$ で

$$
\wp''(z)
=
6\wp(z)^2
-
\frac{g_2}{2}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

微分方程式を微分すると

$$
2\wp'\wp''
=
(12\wp^2-g_2)\wp'.
$$

$\wp'\ne0$ の点では割り算して

$$
\wp''=6\wp^2-\frac{g_2}{2}.
$$

両辺は有理型関数であり、$\wp'\ne0$ の点は開集合を含む。恒等定理により等式は全域へ延長される。$\square$
<!-- proof-end -->

この微分方程式は「二周期関数の具体公式」以上の意味を持つ。$x=\wp(z),y=\wp'(z)$ と置けば

$$
y^2=4x^3-g_2x-g_3
$$

という三次曲線が自然に現れる。

---

## 8. 半周期点と三つの分岐値

<a id="def-ca9-half-periods"></a>
<!-- formal-statement-start -->
### 定義（三つの非零半周期点）

格子 $\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2$ に対し、複素トーラス $\mathbb C/\Lambda$ 上の三点

$$
h_1=\frac{\omega_1}{2},
\qquad
h_2=\frac{\omega_2}{2},
\qquad
h_3=\frac{\omega_1+\omega_2}{2}
\pmod{\Lambda}
$$

を **非零半周期点**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca9-half-periods -->
**定義の確認**。正方格子 $\mathbb Z+i\mathbb Z$ では

$$
\frac12,\qquad \frac i2,\qquad \frac{1+i}{2}
$$

が三つの非零半周期点である。各点を2倍すると格子点に入るが、それ自身は格子点ではない。
<!-- definition-example-end -->

<a id="thm-ca9-half-period-critical-points"></a>
<!-- formal-statement-start -->
### 定理（$\wp'$ の零点と半周期）

$\wp'$ は基本平行四辺形内で重複度込みにちょうど3個の零点を持ち、それらは三つの非零半周期点 $h_1,h_2,h_3$ である。各零点は単純である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$2h_j\in\Lambda$ なので $-h_j\equiv h_j\pmod\Lambda$ である。$\wp'$ は奇かつ周期的だから

$$
\wp'(h_j)
=
\wp'(-h_j)
=
-\wp'(h_j),
$$

従って $\wp'(h_j)=0$。

一方、$\wp'$ は各格子点に三重極を持つ。基本平行四辺形には格子点を一つだけ代表として含めるので、極の総重複度は3である。零点数と極数の一致から零点の総重複度も3である。

三つの半周期点は互いに異なる商点で、それぞれ少なくとも1重の零点だから、他の零点は存在せず、各零点はちょうど1重である。$\square$
<!-- proof-end -->

<a id="def-ca9-half-period-values"></a>
<!-- formal-statement-start -->
### 定義（半周期値）

三つの半周期点での値を

$$
e_1=\wp(h_1),
\qquad
e_2=\wp(h_2),
\qquad
e_3=\wp(h_3)
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca9-half-period-values -->
**定義の確認**。各 $h_j$ では $\wp'(h_j)=0$ なので微分方程式へ代入すると

$$
4e_j^3-g_2e_j-g_3=0.
$$

従って $e_1,e_2,e_3$ は同じ三次多項式の根である。
<!-- definition-example-end -->

<a id="prop-ca9-degree-two-weierstrass"></a>
<!-- formal-statement-start -->
### 命題（$\wp$ は符号を除いて点を分離する）

$w\notin\Lambda$ を固定する。方程式

$$
\wp(z)=\wp(w)
$$

の複素トーラス $\mathbb C/\Lambda$ 上の解は

$$
z\equiv w
\quad\text{または}\quad
z\equiv -w
\pmod\Lambda
$$

で尽くされる。$w$ が半周期でないとき二つは異なる点であり、半周期なら一つの点が重複度2で現れる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

楕円関数

$$
f(z)=\wp(z)-\wp(w)
$$

は格子点に二重極を持つ。従って基本平行四辺形内の極の総重複度は2であり、零点数と極数の一致から零点の総重複度も2である。

偶性により

$$
f(w)=f(-w)=0.
$$

$w\not\equiv -w$ ならこの二点で零点数を使い切る。$w\equiv-w$ なら $2w\in\Lambda$、すなわち半周期であり、$f'(w)=\wp'(w)=0$ なので $w$ は少なくとも二重零点である。総重複度が2だからちょうど二重である。$\square$
<!-- proof-end -->

<a id="thm-ca9-discriminant-nonzero"></a>
<!-- formal-statement-start -->
### 定理（三次多項式の非退化）

三つの半周期値 $e_1,e_2,e_3$ は相異なり、

$$
4x^3-g_2x-g_3
=
4(x-e_1)(x-e_2)(x-e_3).
$$

従って判別式

$$
\Delta
=
g_2^3-27g_3^2
$$

は0ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

もし $e_i=e_j$ なら

$$
\wp(h_i)=\wp(h_j).
$$

前命題から $h_i\equiv\pm h_j\pmod\Lambda$ である。半周期では $-h_j\equiv h_j$ なので $h_i\equiv h_j$ となるが、三つの非零半周期点は互いに異なる。矛盾である。よって $e_1,e_2,e_3$ は相異なる。

各 $e_j$ は微分方程式から $4x^3-g_2x-g_3$ の根であり、三次多項式に相異なる三根がそろったので因数分解が従う。

三次式 $4x^3-g_2x-g_3$ が重根を持たないことと $g_2^3-27g_3^2\ne0$ は同値なので $\Delta\ne0$ である。$\square$
<!-- proof-end -->

---

## 9. 格子を拡大・回転すると何が起こるか

<a id="prop-ca9-scaling"></a>
<!-- formal-statement-start -->
### 命題（格子のスケーリング則）

$a\in\mathbb C\setminus\{0\}$ とする。このとき

$$
\wp_{a\Lambda}(az)
=
a^{-2}\wp_\Lambda(z),
$$

$$
g_2(a\Lambda)=a^{-4}g_2(\Lambda),
\qquad
g_3(a\Lambda)=a^{-6}g_3(\Lambda).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a\Lambda\setminus\{0\}$ の元を $a\omega$ と書けば、定義式から

$$
\begin{aligned}
\wp_{a\Lambda}(az)
&=
\frac1{a^2z^2}
+
\sum_{\omega\ne0}
\left(
\frac1{(az-a\omega)^2}
-
\frac1{(a\omega)^2}
\right)\\
&=
a^{-2}\wp_\Lambda(z).
\end{aligned}
$$

また

$$
G_{2k}(a\Lambda)
=
\sum_{\omega\ne0}(a\omega)^{-2k}
=
a^{-2k}G_{2k}(\Lambda).
$$

$k=2,3$ を使えば $g_2,g_3$ の式が従う。$\square$
<!-- proof-end -->

### 直接例：正方格子

$\Lambda_\square=\mathbb Z+i\mathbb Z$ は $i\Lambda_\square=\Lambda_\square$ を満たす。従って

$$
G_6(\Lambda_\square)
=
G_6(i\Lambda_\square)
=
i^{-6}G_6(\Lambda_\square)
=
-G_6(\Lambda_\square),
$$

ゆえに

$$
g_3(\Lambda_\square)=0.
$$

またスケーリング則から

$$
\wp_{\Lambda_\square}(iz)
=
-\wp_{\Lambda_\square}(z).
$$

### 直接例：正三角形格子

$$
\rho=e^{\pi i/3},
\qquad
\Lambda_\triangle=\mathbb Z+\rho\mathbb Z
$$

とする。$\rho\Lambda_\triangle=\Lambda_\triangle$ なので

$$
G_4(\Lambda_\triangle)
=
\rho^{-4}G_4(\Lambda_\triangle).
$$

ここで $\rho^{-4}\ne1$ だから

$$
g_2(\Lambda_\triangle)=0.
$$

格子の回転対称性が三次曲線の係数を実際に消している。

---

## 10. Weierstrass の加法公式

一周期関数 $\sin,\cos$ に加法定理があるように、$\wp$ にも加法公式がある。ただし $\wp$ は偶関数なので、$\wp$ だけでなく $\wp'$ が必要になる。

<a id="thm-ca9-addition-formula"></a>
<!-- formal-statement-start -->
### 定理（Weierstrass の加法公式）

$u,v,u+v\notin\Lambda$ かつ $\wp(u)\ne\wp(v)$ とする。このとき

$$
\boxed{
\wp(u+v)
=
-\wp(u)-\wp(v)
+
\frac14
\left(
\frac{\wp'(u)-\wp'(v)}
{\wp(u)-\wp(v)}
\right)^2
}.
$$

両辺を有理型関数として解釈すれば、退化する場合にも極限で延長される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $v$ が格子点でも半周期でもない一般の場合を固定し、$z$ の関数

$$
F_v(z)
=
-\wp(z)-\wp(v)
+
\frac14
\left(
\frac{\wp'(z)-\wp'(v)}
{\wp(z)-\wp(v)}
\right)^2
$$

を考える。

[$\wp$ の二対一性](#prop-ca9-degree-two-weierstrass)から、分母 $\wp(z)-\wp(v)$ の零点は商上で $z\equiv\pm v$ に限られる。

$z=v$ では $\wp'(v)\ne0$ なので分子・分母はともに一次で消え、商は正則に延長される。$z=-v$ では $t=z+v$ と置くと

$$
\wp(z)-\wp(v)
=
-\wp'(v)t+O(t^2),
$$

$$
\wp'(z)-\wp'(v)
=
-2\wp'(v)+O(t),
$$

だから比は $2/t+O(t)$ となり、その二乗の4分の1は

$$
\frac1{t^2}+O(1).
$$

したがって $F_v$ は $z=-v$ に二重極を持ち、単純極項はない。これは $\wp(z+v)=\wp(t)$ の主要部と一致する。

格子点 $z=0$ 近傍も確認する。$A=\wp(v),B=\wp'(v)$ と書けば

$$
\wp(z)=z^{-2}+O(z^2),
\qquad
\wp'(z)=-2z^{-3}+O(z).
$$

従って

$$
\frac{\wp'(z)-B}{\wp(z)-A}
=
-\frac2z-2Az-Bz^2+O(z^3),
$$

よって

$$
\frac14
\left(
\frac{\wp'(z)-B}{\wp(z)-A}
\right)^2
=
\frac1{z^2}+2A+Bz+O(z^2).
$$

したがって

$$
F_v(z)
=
A+Bz+O(z^2).
$$

一方 Taylor 展開から

$$
\wp(z+v)
=
A+Bz+O(z^2).
$$

以上から

$$
D_v(z)=F_v(z)-\wp(z+v)
$$

は全ての候補極が可除となる楕円関数である。従って正則楕円関数なので定数である。さらに $z\to0$ で $D_v(z)\to0$ だから

$$
D_v\equiv0.
$$

よって一般の $v$ について

$$
F_v(z)=\wp(z+v).
$$

$z=u$ と置けば加法公式を得る。半周期などの退化場合は、両辺を $u,v$ の有理型関数として見て一般位置から極限を取れば延長される。$\square$
<!-- proof-end -->

加法公式の分数は、三次曲線

$$
y^2=4x^3-g_2x-g_3
$$

上の二点 $(\wp(u),\wp'(u))$, $(\wp(v),\wp'(v))$ を結ぶ直線の傾きそのものである。楕円関数の加法と三次曲線上の幾何学的加法が一致する入口がここにある。

---

## 11. 複素トーラスから三次曲線へ

<a id="thm-ca9-torus-cubic-parametrization"></a>
<!-- formal-statement-start -->
### 定理（複素トーラスの三次曲線表示の入口）

格子 $\Lambda$ に対し

$$
E_\Lambda:
y^2=4x^3-g_2x-g_3
$$

とする。$\Delta=g_2^3-27g_3^2\ne0$ なのでこの三次曲線は非特異である。

写像

$$
\Phi:
(\mathbb C/\Lambda)\setminus\{0\}
\to E_\Lambda,
\qquad
[z]\mapsto
(\wp(z),\wp'(z))
$$

は良定義で単射である。また任意のアフィン点 $(x,y)\in E_\Lambda$ はある $[z]\ne0$ の像である。格子類 $[0]$ を射影閉包の無限遠点に対応させると、複素トーラスと非特異射影三次曲線の一対一対応が得られる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

周期性により $\Phi$ は商上で良定義であり、微分方程式により像は $E_\Lambda$ 上にある。

単射性を示す。$\Phi([z])=\Phi([w])$ なら

$$
\wp(z)=\wp(w).
$$

二対一性から $z\equiv w$ または $z\equiv-w$ である。後者なら奇性から

$$
\wp'(z)=\wp'(-w)=-\wp'(w).
$$

一方 $\Phi([z])=\Phi([w])$ なので $\wp'(w)=0$。このとき $w$ は半周期で $-w\equiv w$。結局どちらの場合も $[z]=[w]$ である。

次にアフィン点 $(x,y)\in E_\Lambda$ を取る。楕円関数

$$
\wp(z)-x
$$

は基本平行四辺形に二重極を持つので、零点数と極数の一致から少なくとも一つ零点 $z$ を持つ。従って $\wp(z)=x$。微分方程式から

$$
(\wp'(z))^2=y^2.
$$

よって $\wp'(z)=y$ または $-y$ である。後者なら $-z$ に替えれば $\wp(-z)=x$, $\wp'(-z)=y$ となる。従って全てのアフィン点が像に入る。

最後に $z\to0$ では

$$
\wp(z)\sim z^{-2},
\qquad
\wp'(z)\sim-2z^{-3},
$$

なのでアフィン座標から逃げる唯一の点として射影閉包の無限遠点へ対応する。

ここで示したのは対応の解析的入口までである。射影代数曲線の一般理論、因子、Riemann--Roch、楕円曲線の群法則の代数的定式化は本章の停止線より先へ送る。$\square$
<!-- proof-end -->

---

## 12. 何が仮定として効いていたか

### 二周期が実線形独立であること

もし二つの「周期」が実線形従属なら、商 $\mathbb C/\Lambda$ はコンパクトな二次元トーラスにならない。基本領域のコンパクト性を使った「正則楕円関数は定数」という議論も、そのままでは成立しない。

### $\wp$ の補正項 $-1/\omega^2$

これを落とすと各項の大きさは遠方で $|\omega|^{-2}$ 程度であり、二次元格子では絶対収束を保証できない。補正により

$$
\frac1{(z-\omega)^2}-\frac1{\omega^2}
=
O(|\omega|^{-3})
$$

となり、格子点個数 $O(R^2)$ と両立する。

### コンパクト性と周期性

「極を消した楕円関数は定数」という仕組みは、微分方程式の証明でも加法公式の証明でも繰り返し使った。局所 Laurent 展開で極を消し、大域周期性でコンパクトなトーラスへ降ろす。この **局所の極消去 + 大域の剛性** が本章の中心技法である。

---

## 13. まとめ

- 楕円関数は格子 $\Lambda$ に関して二重周期を持つ有理型関数であり、複素トーラス $\mathbb C/\Lambda$ 上の有理型関数と同じ対象である。
- 基本平行四辺形の対辺積分は周期性で相殺し、留数和0、零点総数と極総数の一致が従う。
- 二次元格子の点数は半径 $R$ までで $O(R^2)$。従って $\sum|\omega|^{-s}$ は $s>2$ で収束する。
- $\wp$ は補正項を入れることで尾部を $|\omega|^{-3}$ にし、格子点を除いて正規収束する。
- $\wp$ は偶な楕円関数で、各格子点に二重極を持つ。$\wp'$ は奇で三重極を持つ。
- Laurent 展開から $g_2,g_3$ が現れ、
  $$
  (\wp')^2=4\wp^3-g_2\wp-g_3
  $$
  が導かれる。
- 三つの非零半周期点は $\wp'$ の全零点であり、その像 $e_1,e_2,e_3$ は三次式の相異なる根である。従って $\Delta\ne0$。
- 加法公式は、候補式と $\wp(z+v)$ の極を比較し、差が正則楕円関数になることから導ける。
- $(\wp,\wp')$ は複素トーラスを非特異三次曲線へ結び付ける。

---

## 14. 演習

### Level A

<a id="ex-ca9-a01"></a>
#### CA9-A01 格子冪和を二進殻で評価する
- Level: A

格子 $\Lambda$ について

$$
N(R)=\#\{\omega\in\Lambda:|\omega|\le R\}
\le CR^2
$$

が成り立つとする。$s>2$ に対し

$$
\sum_{\omega\ne0}|\omega|^{-s}
$$

が収束することを二進殻 $2^k\le|\omega|<2^{k+1}$ で示せ。

<!-- solution-start -->
**解答**：

殻

$$
A_k=
\{\omega\in\Lambda:2^k\le|\omega|<2^{k+1}\}
$$

では

$$
\#A_k
\le
N(2^{k+1})
\le
C2^{2k+2}.
$$

また $\omega\in A_k$ なら $|\omega|^{-s}\le2^{-ks}$ だから

$$
\sum_{\omega\in A_k}|\omega|^{-s}
\le
C2^{2k+2}2^{-ks}
=
4C\,2^{-k(s-2)}.
$$

$s-2>0$ なので

$$
\sum_k2^{-k(s-2)}
$$

は収束する。内側の有限個の格子点は収束性に影響しないため

$$
\boxed{
\sum_{\omega\ne0}|\omega|^{-s}<\infty
}.
$$

二次元で点数が $R^2$ 個程度増えるため、指数2が臨界になることが見える。
<!-- solution-end -->

<a id="ex-ca9-a02"></a>
#### CA9-A02 楕円関数の単純極は一個だけでは存在できない
- Level: A

楕円関数 $f$ が基本平行四辺形内に単純極をちょうど一つだけ持つと仮定する。その留数を $r$ とする。

1. 留数和の定理から $r=0$ が必要であることを示せ。
2. 単純極の留数が0にはならないことを説明し、矛盾を導け。

<!-- solution-start -->
**解答**：

1. 基本平行四辺形の境界を極が通らないように選べば、[楕円関数の留数和](#thm-ca9-residue-sum-zero)から内部の留数和は0である。極が一つだけなら
   $$
   r=0
   $$
   でなければならない。

2. $p$ が単純極なら Laurent 展開は
   $$
   f(z)
   =
   \frac{a_{-1}}{z-p}
   +
   a_0+a_1(z-p)+\cdots
   $$
   であり、単純極であるためには
   $$
   a_{-1}\ne0
   $$
   が必要である。留数は $r=a_{-1}$ なので $r\ne0$。

従って $r=0$ と $r\ne0$ が矛盾する。ゆえに

$$
\boxed{\text{基本平行四辺形内に単純極を一個だけ持つ楕円関数は存在しない。}}
$$
<!-- solution-end -->

<a id="ex-ca9-a03"></a>
#### CA9-A03 半周期で $\wp'$ が消える理由
- Level: A

$h\notin\Lambda$ が $2h\in\Lambda$ を満たすとする。$\wp'$ の奇性と周期性だけを使って $\wp'(h)=0$ を示せ。

<!-- solution-start -->
**解答**：

$2h\in\Lambda$ なので

$$
-h=h-2h\equiv h\pmod\Lambda.
$$

周期性から

$$
\wp'(-h)=\wp'(h).
$$

一方、$\wp'$ は奇関数なので

$$
\wp'(-h)=-\wp'(h).
$$

従って

$$
\wp'(h)=-\wp'(h),
$$

よって

$$
\boxed{\wp'(h)=0}.
$$

「半周期点では自分自身と符号反転点がトーラス上で同一になる」ことが零点を強制している。
<!-- solution-end -->

<a id="ex-ca9-a04"></a>
#### CA9-A04 正方格子と正三角形格子の対称性
- Level: A

1. $\Lambda_\square=\mathbb Z+i\mathbb Z$ に対し $g_3(\Lambda_\square)=0$ を示せ。
2. $\rho=e^{\pi i/3}$, $\Lambda_\triangle=\mathbb Z+\rho\mathbb Z$ に対し $g_2(\Lambda_\triangle)=0$ を示せ。

<!-- solution-start -->
**解答**：

1. $i\Lambda_\square=\Lambda_\square$ だから、格子の元を $i\omega$ と付け替えて
   $$
   G_6(\Lambda_\square)
   =
   \sum_{\omega\ne0}(i\omega)^{-6}
   =
   i^{-6}G_6(\Lambda_\square)
   =
   -G_6(\Lambda_\square).
   $$
   よって $G_6=0$、従って
   $$
   \boxed{g_3=140G_6=0}.
   $$

2. $\rho\Lambda_\triangle=\Lambda_\triangle$ なので
   $$
   G_4(\Lambda_\triangle)
   =
   \rho^{-4}G_4(\Lambda_\triangle).
   $$
   ところが $\rho^{-4}=e^{-4\pi i/3}\ne1$ だから
   $$
   G_4=0.
   $$
   よって
   $$
   \boxed{g_2=60G_4=0}.
   $$

回転対称性が高い格子では、対応する Eisenstein 級数が対称性によって強制的に消える。
<!-- solution-end -->

### Level B

<a id="ex-ca9-b01"></a>
#### CA9-B01 $\wp$ 級数の正規収束を自力で閉じる
- Level: B

コンパクト集合 $K\subset\mathbb C\setminus\Lambda$ を固定し、$M=\max_{z\in K}|z|$ とする。

1. $|\omega|\ge2M+1$ なら $|z-\omega|\ge|\omega|/2$ を示せ。
2. 
   $$
   \left|
   \frac1{(z-\omega)^2}-\frac1{\omega^2}
   \right|
   \le
   C_K|\omega|^{-3}
   $$
   を導け。
3. 格子冪和の収束から正規収束を結論せよ。

<!-- solution-start -->
**解答**：

1. 三角不等式から
   $$
   |z-\omega|
   \ge
   ||\omega|-|z||
   \ge
   |\omega|-M.
   $$
   $|\omega|\ge2M+1$ なら $M<|\omega|/2$ なので
   $$
   |z-\omega|\ge|\omega|/2.
   $$

2. 差を通分すると
   $$
   \frac1{(z-\omega)^2}-\frac1{\omega^2}
   =
   \frac{2\omega z-z^2}
   {\omega^2(z-\omega)^2}.
   $$
   よって $|z|\le M$ を使い
   $$
   \left|
   \frac1{(z-\omega)^2}-\frac1{\omega^2}
   \right|
   \le
   \frac{2|\omega|M+M^2}
   {|\omega|^2(|\omega|/2)^2}.
   $$
   右辺は $|\omega|\ge1$ で
   $$
   \frac{8M+4M^2}{|\omega|^3}
   $$
   以下だから、$C_K=8M+4M^2$ などと取れる。

3. [格子冪和](#cor-ca9-lattice-summability)から
   $$
   \sum_{\omega\ne0}|\omega|^{-3}<\infty.
   $$
   従って Weierstrass の M-test により尾部は $K$ 上一様絶対収束し、
   $$
   \sum_{\omega\ne0}
   \sup_{z\in K}
   \left|
   \frac1{(z-\omega)^2}-\frac1{\omega^2}
   \right|
   <\infty.
   $$
   これは [正規収束](../CA7/index.md#def-ca7-normal-convergence)そのものである。

したがって $\wp$ 級数は $\mathbb C\setminus\Lambda$ 上正規収束する。
<!-- solution-end -->

<a id="ex-ca9-b02"></a>
#### CA9-B02 $\wp$ が二対一になることを零点数で示す
- Level: B

$w\notin\Lambda$ を固定し

$$
f(z)=\wp(z)-\wp(w)
$$

とする。

1. 基本平行四辺形内で $f$ の極の総重複度が2であることを示せ。
2. $z=w,-w$ が零点であることを示せ。
3. 零点と極の総重複度の一致から、これ以外の解がないことを示せ。
4. $w$ が半周期なら $w\equiv-w$ であり、その一点が二重零点になることを示せ。

<!-- solution-start -->
**解答**：

1. $\wp$ は格子点に二重極を持ち、定数 $\wp(w)$ を引いても主要部は変わらない。基本平行四辺形には格子点の代表が一つなので、極の総重複度は2。

2. 偶性から
   $$
   \wp(-w)=\wp(w),
   $$
   よって
   $$
   f(w)=f(-w)=0.
   $$

3. [零点数と極数の一致](#thm-ca9-zero-pole-balance)から零点の総重複度も2である。$w\not\equiv-w$ なら二つの異なる零点 $w,-w$ で既に2個を使い切るため、他の零点はない。

4. 半周期なら $2w\in\Lambda$ なので $w\equiv-w$。また [半周期での零点](#thm-ca9-half-period-critical-points)から
   $$
   f'(w)=\wp'(w)=0.
   $$
   従って $w$ は少なくとも二重零点である。総重複度が2だからちょうど二重である。

従って

$$
\boxed{
\wp(z)=\wp(w)
\iff
z\equiv\pm w\pmod\Lambda
}.
$$
<!-- solution-end -->

<a id="ex-ca9-b03"></a>
#### CA9-B03 Laurent 展開から微分方程式を再構成する
- Level: B

$$
\wp(z)=z^{-2}+az^2+bz^4+O(z^6)
$$

とする。

1. $a=g_2/20$, $b=g_3/28$ を確認せよ。
2. $(\wp')^2$ と $4\wp^3-g_2\wp-g_3$ を定数項まで展開し、極部分と定数項が一致することを示せ。
3. 差が正則楕円関数で0になることを説明せよ。

<!-- solution-start -->
**解答**：

1. Laurent 展開の一般式
   $$
   \wp(z)
   =
   z^{-2}
   +
   3G_4z^2
   +
   5G_6z^4
   +O(z^6)
   $$
   と
   $$
   g_2=60G_4,
   \qquad
   g_3=140G_6
   $$
   から
   $$
   a=3G_4=\frac{g_2}{20},
   \qquad
   b=5G_6=\frac{g_3}{28}.
   $$

2. 微分すると
   $$
   \wp'
   =
   -2z^{-3}+2az+4bz^3+O(z^5),
   $$
   したがって
   $$
   (\wp')^2
   =
   4z^{-6}-8az^{-2}-16b+O(z^2).
   $$
   一方
   $$
   \wp^3
   =
   z^{-6}+3az^{-2}+3b+O(z^2),
   $$
   よって
   $$
   4\wp^3-g_2\wp-g_3
   =
   4z^{-6}
   +(12a-g_2)z^{-2}
   +(12b-g_3)
   +O(z^2).
   $$
   $a=g_2/20$, $b=g_3/28$ を代入すると
   $$
   12a-g_2=-8a,
   \qquad
   12b-g_3=-16b.
   $$
   したがって両展開は定数項まで一致する。

3. 差
   $$
   F=(\wp')^2-4\wp^3+g_2\wp+g_3
   $$
   は楕円関数で、原点で極が消えて $F(0)=0$ と延長できる。周期性により全格子点で極が消える。従って $F$ は全平面で正則な楕円関数であり定数。しかも0で値0だから
   $$
   \boxed{F\equiv0}.
   $$

ゆえに

$$
\boxed{
(\wp')^2=4\wp^3-g_2\wp-g_3
}.
$$
<!-- solution-end -->

### Level C

<a id="ex-ca9-c01"></a>
#### CA9-C01 加法公式から倍角公式を導く
- Level: C

Weierstrass の加法公式を $v\to u$ と極限して、$\wp'(u)\ne0$ の点で

$$
\wp(2u)
=
-2\wp(u)
+
\frac14
\left(
\frac{\wp''(u)}{\wp'(u)}
\right)^2
$$

を示せ。さらに

$$
\wp''=6\wp^2-\frac{g_2}{2},
\qquad
(\wp')^2=4\wp^3-g_2\wp-g_3
$$

を使い、右辺を $x=\wp(u)$ の有理式として表せ。

<!-- solution-start -->
**解答**：

加法公式は

$$
\wp(u+v)
=
-\wp(u)-\wp(v)
+
\frac14
\left(
\frac{\wp'(u)-\wp'(v)}
{\wp(u)-\wp(v)}
\right)^2.
$$

$v\to u$ とする。分子・分母はともに0へ行くので差商を使う。

$$
\wp'(u)-\wp'(v)
=
-\wp''(u)(v-u)+o(v-u),
$$

$$
\wp(u)-\wp(v)
=
-\wp'(u)(v-u)+o(v-u).
$$

$\wp'(u)\ne0$ だから

$$
\frac{\wp'(u)-\wp'(v)}
{\wp(u)-\wp(v)}
\longrightarrow
\frac{\wp''(u)}{\wp'(u)}.
$$

また $\wp(v)\to\wp(u)$, $\wp(u+v)\to\wp(2u)$ なので

$$
\boxed{
\wp(2u)
=
-2\wp(u)
+
\frac14
\left(
\frac{\wp''(u)}{\wp'(u)}
\right)^2
}.
$$

ここで

$$
x=\wp(u)
$$

と置く。二階微分の式から

$$
\wp''(u)=6x^2-\frac{g_2}{2},
$$

微分方程式から

$$
(\wp'(u))^2
=
4x^3-g_2x-g_3.
$$

従って

$$
\wp(2u)
=
-2x
+
\frac14
\frac{
\left(6x^2-g_2/2\right)^2
}{
4x^3-g_2x-g_3
}.
$$

分子を整理すると

$$
\left(6x^2-\frac{g_2}{2}\right)^2
=
36x^4-6g_2x^2+\frac{g_2^2}{4}.
$$

よって

$$
\boxed{
\wp(2u)
=
-2x
+
\frac{
36x^4-6g_2x^2+g_2^2/4
}{
4(4x^3-g_2x-g_3)
}
}.
$$

必要なら一つの分数にまとめられる。重要なのは、$2u$ の $\wp$ 値が $u$ の $\wp$ 値だけの有理式になったことである。これはトーラス上の「2倍写像」が三次曲線上で有理写像として表されることの解析的な影である。

半周期など $\wp'(u)=0$ の点では途中の商が使えないが、最終式は有理型恒等式として極限延長できる。
<!-- solution-end -->

---

## 15. 次章への接続

CA9 では、格子という離散データから正規収束する有理型関数を構成した。次の CA10 ではこの発想を全平面へ広げ、

- 零点集合を指定して整関数を作る Weierstrass 因数分解
- 極の主要部を指定して有理型関数を作る Mittag--Leffler の定理

へ進む。

ただし章間依存として CA10 は CA9 を prerequisite にしない。CA9 は **Riemann 面・楕円関数 branch** の終点、CA10 は **整関数・特殊関数 branch** の入口である。
