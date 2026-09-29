# RA6 標準実解析 VI：多変数微分・Jacobian 行列・連鎖律

一変数では、微分可能性を

$$
f(a+h)=f(a)+f'(a)h+o(|h|)
$$

と書けました。多変数でも考え方は同じです。違うのは、増分 $h$ がベクトルになり、一次近似を担うものが数ではなく **線形写像** になることです。

この章では最初から最後まで有限次元

$$
f:U\subset\mathbb R^n\to\mathbb R^m
$$

を扱います。必要な大きさの評価は Euclid 距離と行列で完結させます。ここで定義する微分可能性は、関数解析で後に学ぶ Fréchet 微分の有限次元版です。

中心線は

~~~text
一変数の一次近似
  ↓
線形写像による多変数の一次近似
  ↓
偏微分・微分の行列表現
  ↓
連続な偏微分 ⇒ 微分可能
  ↓
連鎖律
  ↓
二階微分・混合偏微分・多変数 Taylor 展開
~~~

です。

---

## 1. 一変数微分を一次近似として読む

$f:\mathbb R\to\mathbb R$ が $a$ で微分可能なら、

$$
f(a+h)-f(a)=f'(a)h+r(h),
\qquad
\frac{r(h)}{|h|}\to0.
$$

したがって、微分係数 $f'(a)$ は単なる傾きではなく、

$$
h\longmapsto f'(a)h
$$

という線形写像として、$f$ の局所的な変化を一次まで表しています。

多変数では、同じ役割を

$$
A:\mathbb R^n\to\mathbb R^m
$$

という線形写像に持たせます。

---

## 2. 有限次元では線形写像は行列で制御できる

線形写像 $A:\mathbb R^n\to\mathbb R^m$ は、標準基底を選べば行列として表せます。

線形代数で学んだ[行列の $2$-作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md#def-f0-00f2-operator-norm)を用いると、

$$
\|Ah\|_2\le \|A\|_{\mathrm{op}}\|h\|_2
$$

が成り立ちます。

この評価の意味は単純です。$h\to0$ なら必ず $Ah\to0$ であり、有限次元の線形写像は自動的に連続です。

この章では以後、ベクトルのノルムを Euclid ノルム $\|\cdot\|_2$ とし、添字 $2$ は文脈上明らかなとき省略します。

---

## 3. 多変数での微分可能性

<a id="def-ra6-multivariable-differentiability"></a>

<!-- formal-statement-start -->
> **定義（多変数での微分可能性）**  
> $U\subset\mathbb R^n$ を開集合、$f:U\to\mathbb R^m$、$a\in U$ とする。ある線形写像 $A:\mathbb R^n\to\mathbb R^m$ が存在して

$$
\frac{\|f(a+h)-f(a)-Ah\|}{\|h\|}\to0
\qquad(h\to0)
$$

> となるとき、$f$ は $a$ で **微分可能** であるという。この $A$ を $f$ の $a$ における **微分** といい、$Df(a)$ と書く。
<!-- formal-statement-end -->

この線形写像 $Df(a)$ は、有限次元の多変数解析では **全微分（total derivative）** と呼ばれることもあります。本章では以後、単に「微分」と呼びます。

関数解析の言葉では、これは有限次元 Euclid 空間における Fréchet 微分可能性です。しかしこの章では、有限次元の距離と行列だけで多変数微分として扱います。

<!-- definition-example-start: def-ra6-multivariable-differentiability -->
### 例：二次関数を定義から微分する

**定義の確認**：線形写像 $A$ を具体的に置き、残差を $\|h\|$ で割った量が0へ収束することを確かめます。

$f:\mathbb R^p\to\mathbb R$ を

$$
f(x)=\frac12\|x\|^2
$$

とします。点 $x$ で

$$
Ah=x^{\mathsf T}h
$$

と置くと、

$$
f(x+h)-f(x)-Ah
=\frac12\|h\|^2.
$$

したがって

$$
\frac{|f(x+h)-f(x)-Ah|}{\|h\|}
=\frac12\|h\|\to0.
$$

よって

$$
Df(x)[h]=x^{\mathsf T}h.
$$
<!-- definition-example-end -->

定義を

$$
f(a+h)=f(a)+Df(a)h+o(\|h\|)
$$

と読むと、**十分小さいすべての増分 $h$ を一つの線形写像で同時に近似する**ことが本質だと分かります。

<a id="thm-ra6-uniqueness-continuity"></a>

<!-- formal-statement-start -->
> **定理（微分の一意性と微分可能性からの連続性）**  
> $f:U\subset\mathbb R^n\to\mathbb R^m$ が $a$ で微分可能なら、$Df(a)$ は一意であり、$f$ は $a$ で連続である。
<!-- formal-statement-end -->

### 証明の見取り図

一意性は同じ一次近似を与える二つの線形写像を直線 $h=tv$ 上で比較します。連続性は、線形項が $O(\|h\|)$、残差が $o(\|h\|)$ であることから従います。

<!-- proof-start -->
### 証明

$A,B$ がともに微分の候補だとします。固定した $v\ne0$ に対し $h=tv$ と置くと、

$$
(A-B)tv
=
\{f(a+tv)-f(a)-Btv\}
-
\{f(a+tv)-f(a)-Atv\}.
$$

両辺のノルムを $|t|\|v\|$ で割り、$t\to0$ とすると右辺は0へ収束します。一方、左辺は

$$
\frac{\|(A-B)v\|}{\|v\|}
$$

なので $(A-B)v=0$。任意の $v$ について成り立つため $A=B$ です。

次に

$$
f(a+h)-f(a)=Df(a)h+r(h),
\qquad
r(h)=o(\|h\|)
$$

と書きます。行列の作用素ノルムを使えば

$$
\|f(a+h)-f(a)\|
\le
\|Df(a)\|_{\mathrm{op}}\|h\|+\|r(h)\|.
$$

右辺は $h\to0$ で0へ収束するので、$f(a+h)\to f(a)$ です。$\square$
<!-- proof-end -->

---

## 4. 微分・偏微分・Jacobian 行列の関係

偏微分は座標軸方向の変化だけを取り出します。$f$ が微分可能なとき、それらは一つの線形写像 $Df(a)$ の標準基底方向への値として同時に現れます。

<a id="def-ra6-jacobian"></a>

<!-- formal-statement-start -->
> **定義（Jacobian 行列）**  
> $f=(f_1,\ldots,f_m):U\subset\mathbb R^n\to\mathbb R^m$ の各一階偏微分が $a$ で存在するとき、

$$
J_f(a)
=
\left(
\frac{\partial f_i}{\partial x_j}(a)
\right)_{\substack{1\le i\le m\\1\le j\le n}}
$$

> を $f$ の $a$ における **Jacobian 行列** という。
<!-- formal-statement-end -->

<a id="prop-ra6-derivative-jacobian"></a>

<!-- formal-statement-start -->
> **命題（微分と Jacobian 行列の対応）**  
> $U\subset\mathbb R^n$ を開集合、$f:U\to\mathbb R^m$、$a\in U$ とし、$f$ が $a$ で微分可能であるとする。$e_j$ を $\mathbb R^n$ の第 $j$ 標準基底ベクトルとすると、各 $j=1,\ldots,n$ について

$$
Df(a)e_j
=
\frac{\partial f}{\partial x_j}(a)
$$

> が成り立つ。したがって、標準基底に関する $Df(a)$ の[表現行列](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#def-f0-00f-representation-matrix)は Jacobian 行列であり、

$$
[Df(a)]_{\mathcal E_m\leftarrow\mathcal E_n}
=
J_f(a)
$$

> である。特に任意の $h\in\mathbb R^n$ に対して

$$
Df(a)h=J_f(a)h
$$

> が成り立つ。
<!-- formal-statement-end -->

[多変数での微分可能性](#def-ra6-multivariable-differentiability)より、ある残差 $r(h)$ が存在して

$$
f(a+h)-f(a)
=
Df(a)h+r(h),
\qquad
\frac{\|r(h)\|}{\|h\|}\to0
$$

と書けます。

<!-- proof-start -->
### 証明

$h=te_j$ と置きます。$\|e_j\|=1$ なので $\|te_j\|=|t|$ であり、

$$
f(a+te_j)-f(a)
=
tDf(a)e_j+r(te_j)
$$

です。$t\ne0$ で両辺を $t$ で割ると、

$$
\frac{f(a+te_j)-f(a)}{t}
=
Df(a)e_j
+
\frac{r(te_j)}{t}.
$$

残差について

$$
\left\|
\frac{r(te_j)}{t}
\right\|
=
\frac{\|r(te_j)\|}{|t|}
=
\frac{\|r(te_j)\|}{\|te_j\|}
\to0
$$

なので、$t\to0$ とすれば

$$
\frac{\partial f}{\partial x_j}(a)
=
Df(a)e_j
$$

を得ます。したがって各一階偏微分は存在します。

一方、表現行列の第 $j$ 列は、線形写像を第 $j$ 標準基底ベクトルへ作用させた値の座標です。よって $Df(a)$ の表現行列の第 $j$ 列は

$$
Df(a)e_j
=
\frac{\partial f}{\partial x_j}(a)
=
\begin{pmatrix}
\dfrac{\partial f_1}{\partial x_j}(a)\\
\vdots\\
\dfrac{\partial f_m}{\partial x_j}(a)
\end{pmatrix}.
$$

これは Jacobian 行列 $J_f(a)$ の第 $j$ 列そのものです。すべての列が一致するので

$$
[Df(a)]_{\mathcal E_m\leftarrow\mathcal E_n}
=
J_f(a).
$$

したがって任意の $h\in\mathbb R^n$ に対して

$$
Df(a)h=J_f(a)h
$$

です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ra6-jacobian -->
### 例：2変数から2変数への写像

**定義の確認**：各成分の偏微分を計算し、定義どおり行と列へ並べて Jacobian 行列を作ります。

$$
F(x,y)=(x^2y,e^x\sin y)
$$

とすると、

$$
J_F(x,y)
=
\begin{pmatrix}
2xy & x^2\\
e^x\sin y & e^x\cos y
\end{pmatrix}.
$$

第1列は $x$ 方向、第2列は $y$ 方向の偏微分を並べたものです。
<!-- definition-example-end -->

この命題により、微分 $Df(a)$ という座標に依らない線形写像と、Jacobian 行列という標準基底での座標表示が結び付きます。

実数値関数 $f:\mathbb R^n\to\mathbb R$ では、

$$
Df(a)h
=
\nabla f(a)^{\mathsf T}h.
$$

実数値関数では、偏微分を並べた列ベクトルを $\nabla f(a)$ と書きます。これは $Df(a)$ を標準基底で行列表現した行ベクトルの転置です。


---

## 5. 方向微分

多変数関数を一つの方向に沿ってだけ見ると、一変数関数へ戻せます。

<a id="def-ra6-directional-derivative"></a>

<!-- formal-statement-start -->
> **定義（方向微分）**  
> $f:U\subset\mathbb R^n\to\mathbb R^m$、$a\in U$、$v\in\mathbb R^n$ とする。

$$
D_vf(a)
=
\lim_{t\to0}
\frac{f(a+tv)-f(a)}{t}
$$

> が存在するとき、これを $a$ における方向 $v$ の **方向微分** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra6-directional-derivative -->
### 例：二次関数の方向微分

**定義の確認**：方向 $v$ を固定して差商を作り、$t\to0$ の極限が存在することを確かめます。

$$
f(x,y)=x^2+y^2
$$

とし、$a=(1,2)$、$v=(v_1,v_2)$ とします。すると

$$
\frac{f(a+tv)-f(a)}{t}
=
2v_1+4v_2+t(v_1^2+v_2^2),
$$

なので

$$
D_vf(1,2)=2v_1+4v_2.
$$
<!-- definition-example-end -->

$f$ が $a$ で微分可能なら、

$$
f(a+tv)-f(a)
=
tDf(a)v+o(|t|),
$$

したがって

$$
\boxed{D_vf(a)=Df(a)v}.
$$

方向微分は一方向ずつの変化率であり、微分可能性は全方向を一つの線形写像で同時に近似できるという、より強い条件です。


---

## 6. 全偏微分が存在しても微分可能とは限らない

偏微分は座標軸方向しか調べません。したがって、全偏微分が存在しても、一つの線形写像で全方向を同時に近似できるとは限りません。

### 例：連続で全偏微分もあるが微分可能でない

$$
f(x,y)
=
\begin{cases}
\dfrac{xy}{\sqrt{x^2+y^2}},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0).
\end{cases}
$$

まず、原点での偏微分を定義から計算します。$x$ 方向では $y=0$ に固定するので、任意の $h\ne0$ に対して

$$
f(h,0)=0,
\qquad
f(0,0)=0
$$

です。したがって差商は

$$
\frac{f(h,0)-f(0,0)}{h}
=
0
$$

であり、

$$
\frac{\partial f}{\partial x}(0,0)
=
\lim_{h\to0}
\frac{f(h,0)-f(0,0)}{h}
=
0.
$$

同様に、$y$ 方向では $x=0$ に固定するので $f(0,h)=0$ です。よって

$$
\frac{\partial f}{\partial y}(0,0)
=
\lim_{h\to0}
\frac{f(0,h)-f(0,0)}{h}
=
0.
$$

つまり、二つの座標軸方向ではどちらも変化率が0です。

一方、

$$
|xy|\le\frac{x^2+y^2}{2}
$$

より、

$$
|f(x,y)|
\le
\frac12\sqrt{x^2+y^2}\to0,
$$

なので原点で連続です。

もし原点で微分可能なら、[微分と Jacobian 行列の対応](#prop-ra6-derivative-jacobian)により

$$
Df(0,0)e_1=0,
\qquad
Df(0,0)e_2=0.
$$

$e_1,e_2$ は $\mathbb R^2$ の基底なので、線形写像 $Df(0,0)$ は零写像でなければなりません。ところが $h=(t,t)$ とすると、

$$
\frac{|f(t,t)|}{\|(t,t)\|}
=
\frac{|t|/\sqrt2}{\sqrt2|t|}
=
\frac12.
$$

0へ収束しないので微分可能ではありません。

ここで壊れているのは連続性ではなく、**誤差を $o(\|h\|)$ にできる一つの線形近似が存在しないこと**です。

---

## 7. 連続な偏微分があれば微分可能である

<a id="thm-ra6-continuous-partials"></a>

<!-- formal-statement-start -->
> **定理（連続な偏微分による微分可能性）**  
> $U\subset\mathbb R^n$ を開集合、$f:U\to\mathbb R$ とする。点 $a\in U$ の近傍で全偏微分 $\partial_jf$ が存在し、各 $\partial_jf$ が $a$ で連続なら、$f$ は $a$ で微分可能で

$$
Df(a)h
=
\sum_{j=1}^n\partial_jf(a)h_j
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$a$ から $a+h$ へ一気に動かず、座標を一つずつ動かします。それぞれの差分に一変数の [平均値定理](../RA3/index.md#thm-ra3-mvt)を使い、偏微分の値を $a$ での値へ近づけます。

<!-- proof-start -->
### 証明

$h=(h_1,\ldots,h_n)$ とし、

$$
a^{(0)}=a,
\qquad
a^{(j)}
=
a+(h_1,\ldots,h_j,0,\ldots,0)
$$

と置きます。すると

$$
f(a+h)-f(a)
=
\sum_{j=1}^n
\{f(a^{(j)})-f(a^{(j-1)})\}.
$$

第 $j$ 項に一変数の [平均値定理](../RA3/index.md#thm-ra3-mvt)を適用すると、座標線分上の点 $\xi_j$ が存在して

$$
f(a^{(j)})-f(a^{(j-1)})
=
\partial_jf(\xi_j)h_j.
$$

したがって

$$
f(a+h)-f(a)
-
\sum_{j=1}^n\partial_jf(a)h_j
=
\sum_{j=1}^n
\{\partial_jf(\xi_j)-\partial_jf(a)\}h_j.
$$

$\|\xi_j-a\|\le\|h\|$ なので、$h\to0$ なら全ての $\xi_j\to a$ です。よって

$$
\varepsilon(h)
=
\max_j
|\partial_jf(\xi_j)-\partial_jf(a)|
\to0.
$$

さらに

$$
\sum_{j=1}^n|h_j|
\le
\sqrt n\,\|h\|
$$

だから、

$$
\left|
f(a+h)-f(a)
-
\sum_{j=1}^n\partial_jf(a)h_j
\right|
\le
\sqrt n\,\varepsilon(h)\|h\|
=
o(\|h\|).
$$

したがって $f$ は $a$ で微分可能です。$\square$
<!-- proof-end -->

$f:U\to\mathbb R^m$ の場合も各成分へ適用すれば、

$$
Df(a)h=J_f(a)h
$$

を得ます。

---

## 8. 連鎖律

<a id="thm-ra6-chain-rule"></a>

<!-- formal-statement-start -->
> **定理（多変数の連鎖律）**  
> $U\subset\mathbb R^n$、$V\subset\mathbb R^m$ を開集合とし、$f:U\to V$ が $a$ で微分可能、$g:V\to\mathbb R^k$ が $f(a)$ で微分可能とする。このとき $g\circ f$ は $a$ で微分可能で

$$
D(g\circ f)(a)
=
Dg(f(a))\circ Df(a)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ と $g$ をそれぞれ「線形項 + 小さい残差」に分けます。$f(a+h)-f(a)=O(\|h\|)$ を確認すれば、$g$ 側の残差も最終的に $o(\|h\|)$ へ落とせます。

<!-- proof-start -->
### 証明

$A=Df(a)$、$B=Dg(f(a))$ と置き、

$$
f(a+h)
=
f(a)+Ah+r_f(h),
\qquad
r_f(h)=o(\|h\|)
$$

と書きます。

また

$$
g(f(a)+k)
=
g(f(a))+Bk+r_g(k),
\qquad
r_g(k)=o(\|k\|)
$$

です。

$$
k(h)=Ah+r_f(h)
$$

と置くと、行列ノルム評価から

$$
\|k(h)\|
\le
\|A\|_{\mathrm{op}}\|h\|+\|r_f(h)\|
=
O(\|h\|),
$$

従って $k(h)\to0$ です。

そこで

$$
\begin{aligned}
g(f(a+h))-g(f(a))
&=
Bk(h)+r_g(k(h))\\
&=
BAh+Br_f(h)+r_g(k(h)).
\end{aligned}
$$

第1残差は

$$
\frac{\|Br_f(h)\|}{\|h\|}
\le
\|B\|_{\mathrm{op}}
\frac{\|r_f(h)\|}{\|h\|}
\to0.
$$

$k(h)\ne0$ のとき第2残差は

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}.
$$

第1因子は0へ、第2因子は有界です。従って積は0へ収束します。$k(h)=0$ の場合も同じ結論です。

よって残差全体が $o(\|h\|)$ となり、

$$
D(g\circ f)(a)=BA.
$$

$\square$
<!-- proof-end -->

行列表示では、

$$
\boxed{
J_{g\circ f}(a)
=
J_g(f(a))J_f(a)
}.
$$

---

## 9. 二階微分と Hessian

実数値関数 $f:U\subset\mathbb R^n\to\mathbb R$ を考えます。一階偏微分がさらに微分可能なら、二階偏微分を並べた行列

<a id="def-ra6-hessian"></a>

<!-- formal-statement-start -->
> **定義（Hessian）**  
> $f$ の二階偏微分が $a$ で存在するとき、

$$
H_f(a)
=
\left(
\frac{\partial^2 f}{\partial x_i\partial x_j}(a)
\right)_{i,j=1}^n
$$

> を $f$ の $a$ における **Hessian** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra6-hessian -->
### 例：二次関数のHessian

**定義の確認**：すべての二階偏微分を計算し、定義どおり Hessian 行列へ並べます。

$$
f(x,y)=x^2+xy+3y^2
$$

では、

$$
H_f(x,y)
=
\begin{pmatrix}
2&1\\
1&6
\end{pmatrix}.
$$

二次関数では Hessian が点によらず一定になります。
<!-- definition-example-end -->

二次形式としては

$$
h^{\mathsf T}H_f(a)h
$$

が二次の変化を表します。

<a id="thm-ra6-mixed-partials"></a>

<!-- formal-statement-start -->
> **定理（混合偏微分の交換）**  
> $f$ が $a$ の近傍で二階偏微分を持ち、それらが連続なら、

$$
\partial_i\partial_j f(a)
=
\partial_j\partial_i f(a)
$$

> が成り立つ。従って $H_f(a)$ は対称行列である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ矩形増分を、$i$ 方向から先に見る場合と $j$ 方向から先に見る場合の二通りで[平均値定理](../RA3/index.md#thm-ra3-mvt)へ還元します。

<!-- proof-start -->
### 証明

$i\ne j$ とし、

$$
\Delta(h,k)
=
f(a+he_i+ke_j)
-f(a+he_i)
-f(a+ke_j)
+f(a)
$$

を考えます。

$i$ 方向、次に $j$ 方向の順で一変数の [平均値定理](../RA3/index.md#thm-ra3-mvt)を二回適用すると、ある $\theta,\eta\in(0,1)$ が存在して

$$
\Delta(h,k)
=
hk\,
\partial_j\partial_i f
(a+\theta he_i+\eta ke_j).
$$

逆の順で適用すると、ある $\theta',\eta'\in(0,1)$ が存在して

$$
\Delta(h,k)
=
hk\,
\partial_i\partial_j f
(a+\theta'he_i+\eta'ke_j).
$$

$hk\ne0$ で割り、$(h,k)\to(0,0)$ とします。二階偏微分の連続性から両評価点は $a$ へ近づくので、

$$
\partial_j\partial_i f(a)
=
\partial_i\partial_j f(a).
$$

$\square$
<!-- proof-end -->

---

## 10. 多変数 Taylor 展開

$a$ と $a+h$ を結ぶ線分が定義域に含まれるとします。多変数関数をこの直線上だけで見るため、

$$
\phi(t)=f(a+th),
\qquad 0\le t\le1
$$

と置きます。ここで $a=(a_1,\ldots,a_n)$ と $h=(h_1,\ldots,h_n)$ は固定し、動くのは実数 $t$ だけです。したがって

$$
\phi(t)
=
f(a_1+th_1,\ldots,a_n+th_n)
$$

は一変数関数です。

まず $\phi'(t)$ を計算します。[多変数の連鎖律](#thm-ra6-chain-rule)より、

$$
\phi'(t)
=
\sum_{i=1}^n
\frac{\partial f}{\partial x_i}(a+th)\,h_i.
$$

これは勾配を使えば

$$
\boxed{
\phi'(t)
=
\nabla f(a+th)^{\mathsf T}h
}
$$

です。つまり $\phi'(t)$ は、点 $a+th$ で方向 $h$ へ進んだときの変化率です。

次に、$f$ が二階微分可能であるとして $\phi'(t)$ をもう一度 $t$ で微分します。$h_i$ は $t$ に依らない定数なので、

$$
\phi''(t)
=
\sum_{i=1}^n
h_i
\frac{d}{dt}
\left[
\frac{\partial f}{\partial x_i}(a+th)
\right].
$$

各 $\partial_i f$ にもう一度連鎖律を使うと、

$$
\frac{d}{dt}
\left[
\frac{\partial f}{\partial x_i}(a+th)
\right]
=
\sum_{j=1}^n
\frac{\partial^2 f}{\partial x_j\partial x_i}(a+th)\,h_j.
$$

したがって

$$
\phi''(t)
=
\sum_{i=1}^n\sum_{j=1}^n
h_i
\frac{\partial^2 f}{\partial x_j\partial x_i}(a+th)
h_j.
$$

二階偏微分が連続なら、前節の[混合偏微分の交換](#thm-ra6-mixed-partials)により添字の順序を交換できます。よって Hessian の二次形式として

$$
\boxed{
\phi''(t)
=
h^{\mathsf T}H_f(a+th)h
}
$$

と書けます。

<a id="thm-ra6-second-order-taylor"></a>

<!-- formal-statement-start -->
> **定理（二階の多変数 Taylor 展開）**  
> $f:U\subset\mathbb R^n\to\mathbb R$ が $a$ の近傍で二階連続微分可能なら、

$$
f(a+h)
=
f(a)
+
\nabla f(a)^{\mathsf T}h
+
\frac12h^{\mathsf T}H_f(a)h
+
o(\|h\|^2)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

直線 $t\mapsto a+th$ 上へ制限して、一変数の [Taylor の定理](../RA3/index.md#thm-ra3-taylor)を使います。剰余は Hessian の連続性で評価します。

<!-- proof-start -->
### 証明

一変数の [Taylor の定理](../RA3/index.md#thm-ra3-taylor)より、ある $\theta\in(0,1)$ が存在して

$$
f(a+h)
=
f(a)
+
\nabla f(a)^{\mathsf T}h
+
\frac12
h^{\mathsf T}H_f(a+\theta h)h.
$$

したがって剰余は

$$
R(h)
=
\frac12
h^{\mathsf T}
\{H_f(a+\theta h)-H_f(a)\}
h.
$$

行列の $2$-ノルムを使うと、

$$
|R(h)|
\le
\frac12
\|H_f(a+\theta h)-H_f(a)\|_{\mathrm{op}}
\|h\|^2.
$$

$H_f$ の連続性により係数は0へ収束するので、

$$
R(h)=o(\|h\|^2).
$$

$\square$
<!-- proof-end -->

---

## 11. ここから何につながるか

この章の有限次元の微分は、次の二方向へ進みます。

- [RA6A 逆関数定理・陰関数定理](../RA6A/index.md)：$Df(a)$ が可逆なとき、非線形写像を局所的に逆に解く。
- [F0-02C3 Banach 空間の Fréchet 微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md)：$\mathbb R^n$ を一般のノルム付き線形空間へ広げ、有界線形写像を一次近似として使う。

実解析の通読では前者へ進めばよく、後者は関数解析の科目で扱います。

---

## 演習

### RA6-A01 二次関数の微分

- Level: A

$f(x)=\frac12\|x\|^2$ について $Df(x)$ を求め、定義から確認せよ。

<!-- solution-start -->
### 詳細解答

$$
f(x+h)-f(x)
=
x^{\mathsf T}h+\frac12\|h\|^2.
$$

従って候補は

$$
Df(x)[h]=x^{\mathsf T}h.
$$

残差は $\frac12\|h\|^2$ なので、

$$
\frac{|f(x+h)-f(x)-Df(x)[h]|}{\|h\|}
=
\frac12\|h\|\to0.
$$

よって定義を満たします。
<!-- solution-end -->

### RA6-A02 Jacobian 行列

- Level: A

$$
F(x,y)=(x^2y,e^x\sin y)
$$

の $J_F(x,y)$ と $DF(x,y)[h_1,h_2]$ を求めよ。

<!-- solution-start -->
### 詳細解答

各成分を偏微分すると、

$$
J_F(x,y)
=
\begin{pmatrix}
2xy & x^2\\
e^x\sin y & e^x\cos y
\end{pmatrix}.
$$

したがって

$$
DF(x,y)
\binom{h_1}{h_2}
=
\binom{
2xyh_1+x^2h_2
}{
e^x\sin y\,h_1+e^x\cos y\,h_2
}.
$$
<!-- solution-end -->

### RA6-A03 微分から偏微分へ

- Level: A

$f:\mathbb R^n\to\mathbb R^m$ が $a$ で微分可能なら、

$$
\partial_jf(a)=Df(a)e_j
$$

となることを示せ。

<!-- solution-start -->
### 詳細解答

微分可能性から

$$
f(a+h)-f(a)
=
Df(a)h+r(h),
\qquad
\frac{\|r(h)\|}{\|h\|}\to0.
$$

$h=te_j$ と置くと、

$$
\frac{f(a+te_j)-f(a)}{t}
=
Df(a)e_j+\frac{r(te_j)}{t}.
$$

最後の項のノルムは

$$
\frac{\|r(te_j)\|}{|t|}
\to0
$$

なので、$t\to0$ として結論を得ます。
<!-- solution-end -->

### RA6-A04 Hessian と二次近似

- Level: A

$$
f(x,y)=x^2+xy+3y^2
$$

について $\nabla f$、$H_f$ を求め、$a=(1,-1)$ まわりの二次 Taylor 展開を書け。

<!-- solution-start -->
### 詳細解答

$$
\nabla f(x,y)
=
(2x+y,x+6y),
$$

$$
H_f
=
\begin{pmatrix}
2&1\\
1&6
\end{pmatrix}.
$$

$a=(1,-1)$ では

$$
f(a)=3,
\qquad
\nabla f(a)=(1,-5).
$$

よって $h=(h_1,h_2)$ に対して

$$
f(a+h)
=
3+h_1-5h_2
+
\frac12
\begin{pmatrix}h_1&h_2\end{pmatrix}
\begin{pmatrix}2&1\\1&6\end{pmatrix}
\binom{h_1}{h_2}.
$$

$f$ は二次多項式なので剰余は0です。
<!-- solution-end -->

### RA6-B01 行列が Lipschitz 写像になる理由

- Level: B

$A\in\mathbb R^{m\times n}$ に対し、

$$
\|Ax-Ay\|_2
\le
\|A\|_{\mathrm{op}}\|x-y\|_2
$$

を示し、線形写像 $x\mapsto Ax$ が連続であることを結論せよ。

<!-- solution-start -->
### 詳細解答

線形性から

$$
Ax-Ay=A(x-y).
$$

[行列の2-作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md#def-f0-00f2-operator-norm)の定義より、

$$
\|A(x-y)\|_2
\le
\|A\|_{\mathrm{op}}\|x-y\|_2.
$$

従って $x\mapsto Ax$ は Lipschitz 連続です。
<!-- solution-end -->

### RA6-B02 全偏微分だけでは足りない

- Level: B

$$
f(x,y)
=
\begin{cases}
\dfrac{xy}{\sqrt{x^2+y^2}},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0)
\end{cases}
$$

について、原点で連続かつ全偏微分が存在するが、微分可能ではないことを示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
|xy|\le\frac{x^2+y^2}{2}
$$

から

$$
|f(x,y)|
\le
\frac12\sqrt{x^2+y^2}\to0,
$$

従って原点で連続です。

座標軸上では $f=0$ なので、

$$
\partial_xf(0,0)=\partial_yf(0,0)=0.
$$

もし微分可能なら、微分の候補は零写像です。しかし $h=(t,t)$ とすると、

$$
\frac{|f(t,t)|}{\|(t,t)\|}
=
\frac12
$$

であり0へ収束しません。従って原点では微分可能ではありません。
<!-- solution-end -->

### RA6-B03 連鎖律を二通りで確認する

- Level: B

$$
F(x,y)=(x+y,xy),
\qquad
g(u,v)=u^2+e^v
$$

とする。$g\circ F$ の偏微分ベクトルを直接微分と連鎖律の二通りで求め、一致を確認せよ。

<!-- solution-start -->
### 詳細解答

直接計算すると、

$$
(g\circ F)(x,y)
=
(x+y)^2+e^{xy},
$$

なので

$$
\nabla(g\circ F)
=
\binom{
2(x+y)+ye^{xy}
}{
2(x+y)+xe^{xy}
}.
$$

一方、

$$
J_F
=
\begin{pmatrix}
1&1\\
y&x
\end{pmatrix},
\qquad
\nabla g(u,v)
=
\binom{2u}{e^v}.
$$

実数値合成では

$$
\nabla(g\circ F)
=
J_F^{\mathsf T}\nabla g(F(x,y)).
$$

したがって

$$
J_F^{\mathsf T}
\binom{2(x+y)}{e^{xy}}
=
\binom{
2(x+y)+ye^{xy}
}{
2(x+y)+xe^{xy}
},
$$

となり、直接微分と一致します。
<!-- solution-end -->

### RA6-C01 連続偏微分から微分可能性を再構成する

- Level: C

$f:U\subset\mathbb R^n\to\mathbb R$ の全偏微分が $a$ の近傍で存在し、各偏微分が $a$ で連続するとする。座標ごとの差分分解と一変数の [平均値定理](../RA3/index.md#thm-ra3-mvt)から、$f$ が $a$ で微分可能であることを証明せよ。

<!-- solution-start -->
### 詳細解答

$h=(h_1,\ldots,h_n)$ に対し、

$$
a^{(j)}
=
a+(h_1,\ldots,h_j,0,\ldots,0)
$$

と置きます。すると

$$
f(a+h)-f(a)
=
\sum_{j=1}^n
\{f(a^{(j)})-f(a^{(j-1)})\}.
$$

各項へ一変数の [平均値定理](../RA3/index.md#thm-ra3-mvt)を使うと、座標線分上の点 $\xi_j$ が存在して

$$
f(a+h)-f(a)
=
\sum_{j=1}^n
\partial_jf(\xi_j)h_j.
$$

線形写像

$$
Ah
=
\sum_{j=1}^n
\partial_jf(a)h_j
$$

を候補とすると、

$$
|f(a+h)-f(a)-Ah|
\le
\max_j
|\partial_jf(\xi_j)-\partial_jf(a)|
\sum_j|h_j|.
$$

$\|\xi_j-a\|\le\|h\|$ と偏微分の連続性から最大値因子は $o(1)$ です。また

$$
\sum_j|h_j|
\le
\sqrt n\,\|h\|.
$$

従って右辺は $o(\|h\|)$ となり、$f$ は $a$ で微分可能です。
<!-- solution-end -->

---

## 章末チェック

- 多変数の微分を「一つの線形写像による一次近似」として説明できる。
- 微分可能性から偏微分と Jacobian 行列を取り出せる。
- 全偏微分の存在だけでは微分可能性に足りない反例を計算できる。
- 連続な偏微分から微分可能性を証明できる。
- 連鎖律を残差評価から証明できる。
- 混合偏微分の交換と Hessian の対称性を説明できる。
- 多変数 Taylor 展開を直線上の一変数の [Taylor の定理](../RA3/index.md#thm-ra3-taylor)へ還元できる。
