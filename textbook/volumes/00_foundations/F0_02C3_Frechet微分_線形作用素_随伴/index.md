# F0-02C3 関数解析III：Fréchet微分・有界線形作用素・連鎖律

この講義の主題は「**微分とは、点の近くを一つの線形写像で近似すること**」です。

標準数学コア **RA6「多変数微分」** として読む場合は、まず **Section 1〜10** を読めば有限次元の核心が閉じます。ここでは一変数微分の理論（RA3）から、Fréchet微分、偏微分、全微分、Jacobian、連鎖律、高階微分までを構成します。Section 11以降はBanach/Hilbert空間への発展で、双対空間やRiesz表現を使います。

```text
一変数の一次近似
  ↓
Fréchet微分
  ↓
偏微分・全微分・Jacobian
  ↓
連続偏微分 ⇒ 微分可能
  ↓
chain rule
  ↓
高階微分・Hessian・多変数Taylor
```

---

## 1. 一変数微分を「一次近似」として読み直す

一変数関数 $f:\mathbb R\to\mathbb R$ が $x$ で微分可能なら

$$
f(x+h)=f(x)+f'(x)h+o(|h|).
$$

重要なのは、微分係数 $f'(x)$ そのものより

$$
\boxed{f(x+h)-f(x)\approx f'(x)h}
$$

という **線形な一次近似** があることです。

多変数では $h$ はベクトルなので、$f'(x)h$ に相当するものは「ベクトル $h$ を別のベクトルへ送る線形写像」になります。

---

## 2. 一次近似に使う線形写像

Fréchet微分の定義では、一次近似を連続な線形写像で表します。そこで必要な概念をここで局所的に準備します。

<a id="def-f0-02c3-bounded-linear-operator"></a>

<!-- formal-statement-start -->
> **定義（有界線形作用素）**  
> ノルム空間 $X,Y$ の間の線形写像 $T:X\to Y$ が、ある $M<\infty$ に対して $\|Tx\|_Y\le M\|x\|_X$ をすべての $x\in X$ で満たすとき、$T$ を **有界線形作用素** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-bounded-linear-operator -->
### 例：行列は有限次元の線形作用素

**定義の確認**

$A\in\mathbb R^{m\times n}$ に対し $T(h)=Ah$ と置きます。有限次元ではある定数 $M$ が存在して

$$
\|Ah\|\le M\|h\|
$$

となるため、行列が定める線形写像は有界です。したがって有限次元の多変数微分では、一次近似作用素を行列で表せます。
<!-- definition-example-end -->

線形写像について「有界」と「連続」は同値です。有限次元では線形写像は自動的に連続なので、RA6では「一次近似を一つの行列で表す」と読んでも構いません。

---

## 3. Fréchet微分

$f:X\to Y$ をノルム空間間の写像とします。

<a id="def-f0-02c3-frechet-derivative"></a>

<!-- formal-statement-start -->
> **定義（Fréchet微分）**  
> $f:X\to Y$ が点 $a$ で **Fréchet微分可能** であるとは、ある有界線形作用素 $A:X\to Y$ が存在して $\|f(a+h)-f(a)-Ah\|_Y/\|h\|_X\to0$（$h\to0$）となることです。この $A$ を $Df(a)$ と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-frechet-derivative -->
### 例：二次関数のFréchet微分

**定義の確認**

$\mathbb R^p$ 上で $f(x)=\frac12\|x\|^2$ とし

$$
Ah=x^{\mathsf T}h
$$

と置くと

$$
f(x+h)-f(x)-Ah=\frac12\|h\|^2.
$$

従って

$$
\frac{|f(x+h)-f(x)-Ah|}{\|h\|}
=\frac12\|h\|\to0.
$$

よって $Df(x)[h]=x^{\mathsf T}h$ です。
<!-- definition-example-end -->

定義は

$$
\boxed{f(a+h)=f(a)+Df(a)h+r(h),\qquad r(h)=o(\|h\|)}
$$

と同じです。ここで重要なのは、方向ごとに別の近似を選ぶのではなく、**すべての十分小さい $h$ を一つの線形写像 $Df(a)$ で同時に近似する**ことです。

<a id="thm-f0-02c3-frechet-uniqueness-continuity"></a>

<!-- formal-statement-start -->
> **定理（Fréchet微分の一意性と微分可能性からの連続性）**  
> $f$ が $a$ でFréchet微分可能なら、$Df(a)$ は一意であり、$f$ は $a$ で連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A,B$ がともに一次近似を与えるとします。固定した $v\ne0$ に対し $h=tv$ と置けば

$$
(A-B)tv
=\{f(a+tv)-f(a)-Btv\}-\{f(a+tv)-f(a)-Atv\}.
$$

両辺のノルムを $|t|\|v\|$ で割って $t\to0$ とすると、右辺は0へ収束します。一方、左辺は

$$
\frac{\|(A-B)tv\|}{|t|\|v\|}
=\frac{\|(A-B)v\|}{\|v\|}
$$

で $t$ に依らないため、$(A-B)v=0$ です。任意の $v$ で成り立つので $A=B$。

次に

$$
f(a+h)-f(a)=Df(a)h+r(h)
$$

より

$$
\|f(a+h)-f(a)\|
\le \|Df(a)\|\,\|h\|+\|r(h)\|.
$$

第1項は $h\to0$ で0へ、第2項も $r(h)=o(\|h\|)$ なので0へ収束します。従って $f(a+h)\to f(a)$。$\square$
<!-- proof-end -->

---

## 4. 方向微分とGâteaux微分

<a id="def-f0-02c3-directional-derivative"></a>

<!-- formal-statement-start -->
> **定義（方向微分）**  
> 点 $a$、方向 $v$ に対し $D_vf(a)=\lim_{t\to0}\{f(a+tv)-f(a)\}/t$ が存在するとき、これを方向 $v$ の **方向微分** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-directional-derivative -->
### 例：二次関数の方向微分

**定義の確認**

$f(x)=x^2$、$a=1$、$v=3$ なら

$$
D_3f(1)=\lim_{t\to0}\frac{(1+3t)^2-1}{t}=6.
$$
<!-- definition-example-end -->

<a id="def-f0-02c3-gateaux-derivative"></a>

<!-- formal-statement-start -->
> **定義（Gâteaux微分）**  
> すべての方向 $v$ について方向微分が存在し、$v\mapsto D_vf(a)$ が線形であるとき、その線形写像を $D_Gf(a)$ と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-gateaux-derivative -->
### 例：ノルム二乗のGâteaux微分

**定義の確認**

$\mathbb R^p$ 上で $f(x)=\|x\|^2$ とすると

$$
\frac{f(x+tv)-f(x)}{t}
=2x^{\mathsf T}v+t\|v\|^2
\to2x^{\mathsf T}v.
$$

従って $D_Gf(x)[v]=2x^{\mathsf T}v$ です。
<!-- definition-example-end -->

Fréchet微分可能なら

$$
f(a+tv)-f(a)=tDf(a)v+o(|t|\|v\|)
$$

なので、固定した $v$ について $t$ で割れば

$$
D_vf(a)=Df(a)v.
$$

従って

$$
\boxed{\text{Fréchet微分可能}\Longrightarrow\text{Gâteaux微分可能}}
$$

です。逆は一般には成り立ちません。方向ごとの収束情報だけでは、方向を変えながら $h\to0$ としたときの誤差を制御できないためです。

---

## 5. 偏微分・全微分・Jacobian

ここから有限次元 $f:\mathbb R^n\to\mathbb R^m$ を考えます。$e_j$ を第 $j$ 標準基底ベクトルとします。

$f$ が $a$ でFréchet微分可能なら、Section 4から

$$
\frac{\partial f}{\partial x_j}(a)
=D_{e_j}f(a)
=Df(a)e_j.
$$

つまり **偏微分は全微分を座標軸方向へ作用させたもの** です。

$Df(a)$ を標準基底で行列表示したものをJacobian行列といい、

$$
J_f(a)=
\begin{pmatrix}
\dfrac{\partial f_1}{\partial x_1}(a)&\cdots&\dfrac{\partial f_1}{\partial x_n}(a)\\
\vdots&&\vdots\\
\dfrac{\partial f_m}{\partial x_1}(a)&\cdots&\dfrac{\partial f_m}{\partial x_n}(a)
\end{pmatrix}.
$$

従って

$$
\boxed{Df(a)h=J_f(a)h}.
$$

実数値関数 $f:\mathbb R^n\to\mathbb R$ なら

$$
Df(a)h
=\sum_{j=1}^n\frac{\partial f}{\partial x_j}(a)h_j
=\nabla f(a)^{\mathsf T}h.
$$

「全微分 $df$」「Fréchet微分 $Df$」「Jacobian」「勾配」は別々の現象ではなく、同じ一次近似を異なる記法で表したものです。

---

## 6. 全偏微分が存在しても微分可能とは限らない

偏微分は座標軸という有限個の方向しか見ません。したがって全偏微分の存在だけでは、全方向を一様に制御するFréchet微分可能性は導けません。

<a id="ex-f0-02c3-partials-not-differentiable"></a>

### 例：原点で全偏微分は存在するが微分可能でない関数

$$
f(x,y)=
\begin{cases}
\dfrac{xy}{\sqrt{x^2+y^2}},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0).
\end{cases}
$$

$x$ 軸上・$y$ 軸上では常に $f=0$ なので

$$
\frac{\partial f}{\partial x}(0,0)
=\frac{\partial f}{\partial y}(0,0)=0.
$$

もし原点でFréchet微分可能なら、偏微分から候補となる微分は $Df(0,0)=0$ しかありません。ところが $h=(t,t)$ とすると

$$
f(t,t)=\frac{t^2}{\sqrt{2t^2}}=\frac{|t|}{\sqrt2},
\qquad
\|(t,t)\|=\sqrt2|t|,
$$

従って

$$
\frac{|f(t,t)-f(0,0)-0|}{\|(t,t)\|}=\frac12.
$$

比は0へ行かないので、原点ではFréchet微分可能ではありません。

なお

$$
|xy|\le\frac{x^2+y^2}{2}
$$

より

$$
|f(x,y)|\le\frac12\sqrt{x^2+y^2}\to0
$$

だから、この関数は原点で連続です。従って破綻点は「連続性」ではなく、**一つの線形写像で誤差を $o(\|h\|)$ にできないこと**です。

---

## 7. 微分可能性を偏微分から判定する

全偏微分の存在だけでは不足しました。そこで偏微分の **近傍での連続性** を加えます。

<a id="thm-f0-02c3-continuous-partials"></a>

<!-- formal-statement-start -->
> **定理（連続な偏微分による微分可能性）**  
> $U\subset\mathbb R^n$ を開集合、$f:U\to\mathbb R$ とする。点 $a\in U$ の近傍で全偏微分 $\partial_jf$ が存在し、各 $\partial_jf$ が $a$ で連続なら、$f$ は $a$ でFréchet微分可能で $Df(a)h=\sum_{j=1}^n\partial_jf(a)h_j$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$h=(h_1,\ldots,h_n)$ を十分小さく取り、

$$
a^{(0)}=a,
\qquad
a^{(j)}=a+(h_1,\ldots,h_j,0,\ldots,0)
$$

と置きます。差を座標ごとに分解すると

$$
f(a+h)-f(a)
=\sum_{j=1}^n\{f(a^{(j)})-f(a^{(j-1)})\}.
$$

第 $j$ 項は第 $j$ 座標だけを動かす一変数関数なので、$h_j\ne0$ なら [一変数平均値定理](../RA3/index.md#thm-ra3-mvt) により、$a^{(j-1)}$ と $a^{(j)}$ の間の点 $\xi_j$ が存在して

$$
f(a^{(j)})-f(a^{(j-1)})
=\partial_jf(\xi_j)h_j.
$$

$h_j=0$ のときも両辺を0と読めばよいので

$$
f(a+h)-f(a)-\sum_{j=1}^n\partial_jf(a)h_j
=\sum_{j=1}^n\{\partial_jf(\xi_j)-\partial_jf(a)\}h_j.
$$

ここで $\|\xi_j-a\|\le\|h\|$ なので、$h\to0$ なら全ての $\xi_j\to a$。各偏微分の $a$ での連続性から

$$
\varepsilon(h):=
\max_{1\le j\le n}
|\partial_jf(\xi_j)-\partial_jf(a)|\to0.
$$

従って有限次元のノルム比較 $\sum_{j=1}^n|h_j|\le\sqrt n\,\|h\|$ より

$$
\begin{aligned}
\left|f(a+h)-f(a)-\sum_{j=1}^n\partial_jf(a)h_j\right|
&\le \varepsilon(h)\sum_{j=1}^n|h_j|\\
&\le \sqrt n\,\varepsilon(h)\|h\|
=o(\|h\|).
\end{aligned}
$$

よってFréchet微分可能です。$\square$
<!-- proof-end -->

$f:U\to\mathbb R^m$ の場合も各成分 $f_i$ にこの定理を適用すれば、全ての一階偏微分が近傍で存在して $a$ で連続なら

$$
Df(a)h=J_f(a)h
$$

となります。

---

## 8. 連鎖律

Fréchet微分では一次近似を作用素として持っているため、合成写像の微分は作用素の合成になります。

<a id="thm-f0-02c3-frechet-composition"></a>

<!-- formal-statement-start -->
> **定理（Fréchet連鎖律）**  
> $f:X\to Y$ が $a$ でFréchet微分可能、$g:Y\to Z$ が $f(a)$ でFréchet微分可能なら、$g\circ f$ は $a$ でFréchet微分可能で $D(g\circ f)(a)=Dg(f(a))\circ Df(a)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A=Df(a)$、$B=Dg(f(a))$ と置き、

$$
f(a+h)=f(a)+Ah+r_f(h),
\qquad r_f(h)=o(\|h\|)
$$

と書きます。また

$$
g(f(a)+k)=g(f(a))+Bk+r_g(k),
\qquad r_g(k)=o(\|k\|).
$$

ここで

$$
k(h):=Ah+r_f(h)=f(a+h)-f(a).
$$

$A$ の有界性と $r_f(h)=o(\|h\|)$ から

$$
\|k(h)\|=O(\|h\|),
\qquad k(h)\to0.
$$

従って

$$
\begin{aligned}
g(f(a+h))-g(f(a))
&=Bk(h)+r_g(k(h))\\
&=BAh+Br_f(h)+r_g(k(h)).
\end{aligned}
$$

第1残差は

$$
\frac{\|Br_f(h)\|}{\|h\|}
\le\|B\|\frac{\|r_f(h)\|}{\|h\|}\to0.
$$

また $k(h)\ne0$ なら

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}.
$$

第1因子は $k(h)\to0$ から0へ、第2因子は $k(h)=O(\|h\|)$ から有界です。$k(h)=0$ の場合は $r_g(0)=0$。従って全残差は $o(\|h\|)$ であり、微分は $BA$ です。$\square$
<!-- proof-end -->

有限次元では

$$
\boxed{J_{g\circ f}(a)=J_g(f(a))J_f(a)}.
$$

ここで行列積の順序は、まず $Df(a)$ で $h$ を送ってから $Dg(f(a))$ を作用させるという写像の合成順序そのものです。

---

## 9. 高階微分とHessian

$f:U\subset\mathbb R^n\to\mathbb R^m$ が各点で微分可能なら

$$
Df:U\to\mathcal L(\mathbb R^n,\mathbb R^m)
$$

という新しい写像が得られます。この $Df$ 自身が $a$ でFréchet微分可能なら、その微分を

$$
D^2f(a)
$$

と書きます。

$D^2f(a)$ は二つの増分 $u,v$ を受け取る双線形写像として読めます。実数値関数 $f:\mathbb R^n\to\mathbb R$ では、標準基底に関する行列表示がHessian

$$
H_f(a)=
\left(\frac{\partial^2f}{\partial x_i\partial x_j}(a)\right)_{i,j}
$$

です。

二階偏微分が近傍で連続なら、混合偏微分は交換できるためHessianは対称になります。このとき

$$
D^2f(a)[u,v]=u^{\mathsf T}H_f(a)v.
$$

高階も同様に、$D^{k-1}f$ を作用素値写像とみなし、そのFréchet微分として $D^kf$ を定義します。

---

## 10. 多変数Taylorは直線上の一変数Taylorに帰着する

$a$ と $a+h$ を結ぶ線分が定義域に含まれるとします。実数値関数 $f$ に対し

$$
\phi(t)=f(a+th)
\qquad(0\le t\le1)
$$

と置けば、連鎖律により

$$
\phi'(t)=Df(a+th)h,
$$

二階微分可能なら

$$
\phi''(t)=D^2f(a+th)[h,h].
$$

<a id="thm-f0-02c3-second-order-taylor"></a>

<!-- formal-statement-start -->
> **定理（二階の多変数Taylor展開）**  
> $f$ が $a$ の近傍で二階連続微分可能なら $f(a+h)=f(a)+Df(a)h+\frac12D^2f(a)[h,h]+o(\|h\|^2)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\phi(t)=f(a+th)$ に [RA3の一変数Taylor定理](../RA3/index.md#thm-ra3-taylor) を適用すると、ある $\theta\in(0,1)$ が存在して

$$
\phi(1)=\phi(0)+\phi'(0)+\frac12\phi''(\theta).
$$

従って

$$
f(a+h)
=f(a)+Df(a)h+\frac12D^2f(a+\theta h)[h,h].
$$

ここから $\frac12D^2f(a)[h,h]$ を分離すると、剰余は

$$
R(h)=\frac12\{D^2f(a+\theta h)-D^2f(a)\}[h,h].
$$

双線形作用素のノルム評価により

$$
|R(h)|
\le
\frac12\|D^2f(a+\theta h)-D^2f(a)\|\,\|h\|^2.
$$

$0<\theta<1$ だから $a+\theta h\to a$。$D^2f$ の $a$ での連続性により右辺の係数は0へ収束するので

$$
R(h)=o(\|h\|^2).
$$

これで主張が従います。$\square$
<!-- proof-end -->

実数値関数なら

$$
D^2f(a)[h,h]=h^{\mathsf T}H_f(a)h
$$

なので

$$
f(a+h)
=f(a)+\nabla f(a)^{\mathsf T}h
+\frac12h^{\mathsf T}H_f(a)h
+o(\|h\|^2).
$$

これが多変数の二次近似です。

---

## 11. 発展：実数値関数の微分と双対空間

ここからは関数解析への接続です。$f:X\to\mathbb R$ なら

$$
Df(x):X\to\mathbb R
$$

は連続線形汎関数なので

$$
Df(x)\in X^*.
$$

Hilbert空間 $H$ では [Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation) により一意な $g\in H$ が存在して

$$
Df(x)[h]=\langle g,h\rangle_H.
$$

この $g$ をHilbert空間での勾配 $\nabla_Hf(x)$ とみなします。有限次元で

$$
Df(x)[h]=\nabla f(x)^{\mathsf T}h
$$

と書けたことの無限次元版です。

---

## 12. 発展例：Hilbert空間の二乗ノルムと二乗誤差

Hilbert空間 $H$ 上で

$$
f(x)=\frac12\|x\|^2
$$

とすると

$$
f(x+h)
=f(x)+\langle x,h\rangle+\frac12\|h\|^2.
$$

従って

$$
Df(x)[h]=\langle x,h\rangle,
\qquad
\nabla_Hf(x)=x.
$$

同様に、固定した $g\in L^2([0,1])$ に対する

$$
J(f)=\frac12\|f-g\|_2^2
$$

では

$$
DJ(f)[h]=\langle f-g,h\rangle,
\qquad
\nabla_HJ(f)=f-g.
$$

---

## 13. 発展：作用素ノルム

<a id="def-f0-02c3-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（作用素ノルム）**  
> 有界線形作用素 $T:X\to Y$ に対し $\|T\|=\sup_{\|x\|_X\le1}\|Tx\|_Y$ を $T$ の **作用素ノルム** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-operator-norm -->
### 例：2倍写像

**定義の確認**

$T:\mathbb R\to\mathbb R$、$T(x)=2x$ なら

$$
\|T\|=\sup_{|x|\le1}|2x|=2.
$$
<!-- definition-example-end -->

同値に

$$
\|T\|=\sup_{x\ne0}\frac{\|Tx\|_Y}{\|x\|_X},
$$

従って

$$
\|Tx\|_Y\le\|T\|\|x\|_X.
$$

この評価がSection 8の連鎖律で残差を制御した仕組みです。

---

## 14. この章の位置づけ

RA6としての核心は次の論理関係です。

$$
\boxed{
C^1
\Longrightarrow
\text{Fréchet微分可能}
\Longrightarrow
\text{全偏微分が存在}
}
$$

右向きの逆は一般には偽で、Section 6がその反例です。連鎖律はFréchet微分の残差表示から直接導け、高階微分は微分写像をさらに微分することで得られます。

関数解析として先へ進む場合は [F0-02C3A 随伴作用素](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md) と [F0-02C3B Fréchet連鎖律・Hilbert随伴の証明](../F0_02C3B_Frechet_chain_adjoint_proofs/index.md) へ進みます。

---

## 演習A

### F0-02C3-A01 ノルム二乗のFréchet微分

- Level: A
- 目安時間: 10分

$\mathbb R^n$ 上の $f(x)=\frac12\|x\|^2$ について $Df(x)$ を求め、定義から確認せよ。

<!-- solution-start -->
**詳細解答**

$$
f(x+h)-f(x)=x^{\mathsf T}h+\frac12\|h\|^2.
$$

従って候補は $Df(x)[h]=x^{\mathsf T}h$。残差を $\|h\|$ で割ると $\frac12\|h\|\to0$ なのでFréchet微分の定義を満たす。

**本番答案**

$Df(x)[h]=x^{\mathsf T}h$。実際、残差は $\frac12\|h\|^2=o(\|h\|)$。

**採点基準（20点）**：候補設定6点、残差計算10点、結論4点。
<!-- solution-end -->

### F0-02C3-A02 Jacobianの計算

- Level: A
- 目安時間: 10分

$$
F(x,y)=(x^2y,\ e^x\sin y)
$$

のJacobian $J_F(x,y)$ と $DF(x,y)[h_1,h_2]$ を求めよ。

<!-- solution-start -->
**詳細解答**

成分ごとに偏微分して

$$
J_F(x,y)=
\begin{pmatrix}
2xy & x^2\\
e^x\sin y & e^x\cos y
\end{pmatrix}.
$$

従って

$$
DF(x,y)\binom{h_1}{h_2}
=
\binom{2xyh_1+x^2h_2}{e^x\sin y\,h_1+e^x\cos y\,h_2}.
$$

**本番答案**

上のJacobianを計算し、$DF(x,y)h=J_F(x,y)h$ と書けばよい。

**採点基準（20点）**：各偏微分8点、行列4点、作用8点。
<!-- solution-end -->

### F0-02C3-A03 Fréchet微分から偏微分へ

- Level: A
- 目安時間: 10分

$f:\mathbb R^n\to\mathbb R^m$ が $a$ でFréchet微分可能なら、各偏微分が存在し

$$
\partial_jf(a)=Df(a)e_j
$$

となることを示せ。

<!-- solution-start -->
**詳細解答**

Fréchet微分の残差表示に $h=te_j$ を代入すると

$$
f(a+te_j)-f(a)=tDf(a)e_j+r(te_j),
\qquad
\frac{\|r(te_j)\|}{|t|}\to0.
$$

$t$ で割って $t\to0$ とすれば

$$
\lim_{t\to0}\frac{f(a+te_j)-f(a)}{t}=Df(a)e_j.
$$

左辺が第 $j$ 偏微分なので結論を得る。

**本番答案**

Fréchet展開に $h=te_j$ を代入して $t$ で割り、残差が0へ行くことを使う。

**採点基準（20点）**：方向選択6点、残差評価8点、極限と結論6点。
<!-- solution-end -->

### F0-02C3-A04 Hessianと二次近似

- Level: A
- 目安時間: 15分

$$
f(x,y)=x^2+xy+3y^2
$$

について $\nabla f$、$H_f$ を求め、点 $a=(1,-1)$ まわりの二次Taylor展開を書け。

<!-- solution-start -->
**詳細解答**

$$
\nabla f(x,y)=(2x+y,\ x+6y),
\qquad
H_f=
\begin{pmatrix}
2&1\\1&6
\end{pmatrix}.
$$

$a=(1,-1)$ では $f(a)=3$、$\nabla f(a)=(1,-5)$。$h=(h_1,h_2)$ とすれば

$$
f(a+h)=3+h_1-5h_2+
\frac12
\begin{pmatrix}h_1&h_2\end{pmatrix}
\begin{pmatrix}2&1\\1&6\end{pmatrix}
\binom{h_1}{h_2}.
$$

二次多項式なので剰余は0。

**本番答案**

$\nabla f(a)=(1,-5)$、$H_f=\begin{pmatrix}2&1\\1&6\end{pmatrix}$ をTaylor公式へ代入する。

**採点基準（20点）**：勾配6点、Hessian6点、展開8点。
<!-- solution-end -->

---

## 演習B

### F0-02C3-B01 有界線形作用素はLipschitz

- Level: B
- 目安時間: 10分

有界線形作用素 $T:X\to Y$ に対し

$$
\|Tx-Ty\|\le\|T\|\|x-y\|
$$

を示し、連続性を結論せよ。

<!-- solution-start -->
**詳細解答**

線形性から $Tx-Ty=T(x-y)$。作用素ノルムの定義より

$$
\|T(x-y)\|\le\|T\|\|x-y\|.
$$

従って $T$ はLipschitz連続である。

**本番答案**

$Tx-Ty=T(x-y)$ に作用素ノルム評価を適用する。

**採点基準（20点）**：線形性6点、ノルム評価8点、連続性6点。
<!-- solution-end -->

### F0-02C3-B02 全偏微分存在と微分可能性

- Level: B
- 目安時間: 20分

Section 6の関数

$$
f(x,y)=\frac{xy}{\sqrt{x^2+y^2}}
$$

（原点では0と定義）について、原点で連続であり全偏微分も存在するがFréchet微分可能でないことを自力で示せ。

<!-- solution-start -->
**詳細解答**

$|xy|\le(x^2+y^2)/2$ より

$$
|f(x,y)|\le\frac12\sqrt{x^2+y^2}\to0,
$$

従って連続。座標軸上では $f=0$ なので両偏微分は0。Fréchet微分が存在するなら、その行列は偏微分から零写像でなければならない。しかし $h=(t,t)$ では

$$
\frac{|f(t,t)|}{\|(t,t)\|}=\frac12
$$

となり0へ収束しない。従って微分可能でない。

**本番答案**

連続性、偏微分0、対角線方向でFréchet残差比が $1/2$ の三段階を書く。

**採点基準（20点）**：連続性5点、偏微分5点、微分候補の特定4点、反証6点。
<!-- solution-end -->

### F0-02C3-B03 連鎖律の行列計算

- Level: B
- 目安時間: 20分

$$
F(x,y)=(x+y,xy),
\qquad
g(u,v)=u^2+e^v
$$

とする。$g\circ F$ の勾配を、(i) 直接微分、(ii) Jacobianによる連鎖律、の二通りで求めて一致を確認せよ。

<!-- solution-start -->
**詳細解答**

直接には

$$
(g\circ F)(x,y)=(x+y)^2+e^{xy},
$$

従って

$$
\nabla(g\circ F)
=(2(x+y)+ye^{xy},\ 2(x+y)+xe^{xy}).
$$

一方

$$
J_F=
\begin{pmatrix}1&1\\y&x\end{pmatrix},
\qquad
\nabla g(u,v)=\binom{2u}{e^v}.
$$

実数値合成では

$$
\nabla(g\circ F)=J_F^{\mathsf T}\nabla g(F(x,y)),
$$

だから同じ式を得る。

**本番答案**

$J_F^{\mathsf T}(2(x+y),e^{xy})^{\mathsf T}$ を計算し、直接微分と照合する。

**採点基準（20点）**：直接微分6点、各Jacobian6点、連鎖律と一致8点。
<!-- solution-end -->

---

## 演習C

### F0-02C3-C01 連続偏微分からFréchet微分可能性を再構成する

- Level: C
- 目安時間: 30分

$f:U\subset\mathbb R^n\to\mathbb R$ の全偏微分が $a$ の近傍で存在し、各偏微分が $a$ で連続するとする。Section 7の証明を参照せず、座標ごとの差分分解と [一変数平均値定理](../RA3/index.md#thm-ra3-mvt) だけから $f$ が $a$ でFréchet微分可能であることを証明せよ。

<!-- solution-start -->
**詳細解答**

$h=(h_1,\ldots,h_n)$ に対し

$$
a^{(j)}=a+(h_1,\ldots,h_j,0,\ldots,0)
$$

と置く。すると

$$
f(a+h)-f(a)=\sum_{j=1}^n\{f(a^{(j)})-f(a^{(j-1)})\}.
$$

各項へ [一変数平均値定理](../RA3/index.md#thm-ra3-mvt) を使い、線分上の点 $\xi_j$ を取れば

$$
f(a+h)-f(a)=\sum_{j=1}^n\partial_jf(\xi_j)h_j.
$$

候補

$$
Ah=\sum_{j=1}^n\partial_jf(a)h_j
$$

を引くと

$$
|f(a+h)-f(a)-Ah|
\le
\max_j|\partial_jf(\xi_j)-\partial_jf(a)|\sum_j|h_j|.
$$

$\|\xi_j-a\|\le\|h\|$ かつ偏微分は $a$ で連続だから最大値因子は $o(1)$。さらに $\sum_j|h_j|\le\sqrt n\|h\|$ なので、右辺は $o(\|h\|)$。従ってFréchet微分可能で $Df(a)=A$。

**本番答案**

座標増分へ望遠和分解し、各項に [一変数平均値定理](../RA3/index.md#thm-ra3-mvt) を適用する。偏微分の連続性で係数差を $o(1)$、有限次元のノルム比較で残差を $o(\|h\|)$ と評価する。

**採点基準（30点）**：望遠和6点、平均値定理6点、線形候補4点、連続性による一様な係数評価8点、$o(\|h\|)$ 結論6点。
<!-- solution-end -->

---

## 章末チェック

- Fréchet微分を「一つの線形写像による一次近似」として定義から説明できる。
- Fréchet微分から偏微分とJacobianを取り出せる。
- 全偏微分の存在だけでは不十分な反例を、破綻する残差比まで計算できる。
- 連続な偏微分から微分可能性を座標増分と一変数平均値定理で証明できる。
- Fréchet連鎖律を二つの残差項の評価から証明できる。
- 高階微分・Hessian・二階Taylor展開を一次近似の反復として説明できる。
