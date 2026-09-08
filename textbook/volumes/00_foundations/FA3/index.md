# FA3 標準関数解析 III：弱位相・弱*位相・標準埋め込み

<!-- definition-example-audit: strict -->

ノルム収束は

$$
\|x_\alpha-x\|\to0
$$

によってベクトル全体の差を一度に測ります。これに対し弱収束では、各連続線形汎関数を「観測器」として

$$
f(x_\alpha)\to f(x)
$$

がすべての $f\in X^*$ について成り立つかを見ます。

本章の主題は、単に収束記号を増やすことではありません。

```text
有限個の連続線形汎関数で近傍を作る
  ↓
弱位相 σ(X,X*)
  ↓
全ての f∈X* で値が収束 ⇔ 弱収束
  ↓ Hahn--Banach
異なる点を双対が検出するので Hausdorff

X* 側では有限個の x∈X で値を観測する
  ↓
弱*位相 σ(X*,X)
  ↓
X → X** の標準埋め込み J
  ↓
弱収束 in X ⇔ 弱*収束 of Jx in X**
```

と進みます。

[双対空間](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#def-f0-02c2-dual-space)と [Hahn--Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)は既知とします。本章では Banach--Alaoglu のコンパクト性や反射性を先取りしません。それらは次章 FA4 で扱います。

スカラー体は $\mathbb K=\mathbb R$ または $\mathbb C$ とします。

---

## 1. 弱位相は「有限個の観測量だけを同時に近づける」位相

$x_0\in X$、$f_1,\dots,f_m\in X^*$、$\varepsilon>0$ に対して

$$
U(x_0;f_1,\dots,f_m;\varepsilon)
:=
\left\{
 x\in X:
 |f_j(x-x_0)|<\varepsilon\quad(j=1,\dots,m)
\right\}
$$

と置きます。

一つの近傍では有限個の汎関数しか見ません。ただし、どの有限族を選んでもよい、ということが重要です。

<a id="def-fa3-weak-topology"></a>
<!-- formal-statement-start -->
### 定義（弱位相）

ノルム空間 $X$ 上で、上の集合

$$
U(x_0;f_1,\dots,f_m;\varepsilon)
$$

を $x_0$ の基本近傍とする位相を **弱位相** といい

$$
\boxed{\sigma(X,X^*)}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa3-weak-topology -->
**定義の確認**：$\mathbb R^2$ で一つの観測量だけを見る

$X=\mathbb R^2$、$f(x_1,x_2)=x_1$ とします。この $f$ 一つだけから作る

$$
U(0;f;\varepsilon)
=
\{(x_1,x_2):|x_1|<\varepsilon\}
$$

は縦方向には無制限な帯です。弱位相の基本近傍は一般にノルム球とは形が違い、「選んだ有限個の観測量が小さい」ことだけを要求します。
<!-- definition-example-end -->

### 1.1 この族が本当に近傍基底になることを確認する

各 $x_0$ は明らかに

$$
x_0\in U(x_0;f_1,\dots,f_m;\varepsilon)
$$

を満たします。

次に

$$
z\in U(x_0;f_1,\dots,f_m;\varepsilon)
\cap
U(y_0;g_1,\dots,g_n;\eta)
$$

とします。有限個の正数

$$
\varepsilon-|f_j(z-x_0)|,
\qquad
\eta-|g_k(z-y_0)|
$$

はすべて正なので、その最小値より小さい $\delta>0$ を取れます。

すると

$$
W
=
U(z;f_1,\dots,f_m,g_1,\dots,g_n;\delta)
$$

について $W$ は上の交わりに含まれます。実際 $x\in W$ なら

$$
|f_j(x-x_0)|
\le
|f_j(x-z)|+|f_j(z-x_0)|
<\delta+|f_j(z-x_0)|
<\varepsilon,
$$

同様に

$$
|g_k(x-y_0)|<\eta.
$$

従って、この基本近傍族は位相の基底公理を満たします。

### 1.2 「最も粗い位相」という読み方

弱位相では各 $f\in X^*$ が連続です。実際、$f(x_0)$ のまわりの区間または円板

$$
\{a\in\mathbb K:|a-f(x_0)|<\varepsilon\}
$$

の逆像は

$$
U(x_0;f;\varepsilon)
$$

です。

逆に、ある位相 $\tau$ について全ての $f\in X^*$ が連続だとします。このとき各

$$
\{x:|f_j(x-x_0)|<\varepsilon\}
$$

は $\tau$-開であり、その有限交叉である基本近傍も $\tau$-開です。従って

$$
\boxed{
\sigma(X,X^*)
\text{ は }X^*\text{ の全要素を連続にする最も粗い位相}
}
$$

です。

ここでは一般の initial topology を定理として呼び出していません。有限交叉の計算から直接構成しました。

---

## 2. 弱収束：全ての連続線形汎関数で見て収束する

<a id="def-fa3-weak-convergence"></a>
<!-- formal-statement-start -->
### 定義（Banach空間の弱収束）

ネット $(x_\alpha)$ が $x\in X$ に **弱収束** するとは、弱位相 $\sigma(X,X^*)$ で $x_\alpha\to x$ となることをいう。記号では

$$
\boxed{x_\alpha\rightharpoonup x}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa3-weak-convergence -->
**定義の確認**：$\ell^2$ の標準基底

$e_n=(0,\dots,0,1,0,\dots)\in\ell^2$ とします。Hilbert 空間の Riesz 表現により任意の $f\in(\ell^2)^*$ はある $y\in\ell^2$ を使って

$$
f(x)=\langle x,y\rangle
$$

と書けます。従って

$$
f(e_n)=\overline{y_n}\to0
$$

です。よって $e_n\rightharpoonup0$ ですが

$$
\|e_n\|_2=1
$$

なのでノルム収束はしません。
<!-- definition-example-end -->

<a id="thm-fa3-weak-convergence-criterion"></a>
<!-- formal-statement-start -->
### 定理（弱収束の汎関数判定）

ネット $(x_\alpha)$ と $x\in X$ について次は同値である。

1. $x_\alpha\rightharpoonup x$。
2. 任意の $f\in X^*$ について $f(x_\alpha)\to f(x)$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$1\Rightarrow2$：弱位相の構成により各 $f\in X^*$ は連続です。従って位相的収束を $f$ で写せば

$$
f(x_\alpha)\to f(x)
$$

です。

$2\Rightarrow1$：$x$ の任意の基本近傍

$$
U
=
U(x;f_1,\dots,f_m;\varepsilon)
$$

を取ります。各 $j$ について

$$
f_j(x_\alpha)\to f_j(x)
$$

なので、ある添字 $\alpha_j$ 以後で

$$
|f_j(x_\alpha-x)|<\varepsilon
$$

となります。

添字集合は有向なので、有限個の $\alpha_1,\dots,\alpha_m$ を同時に上から押さえる添字 $\alpha_0$ が存在します。$\alpha\ge\alpha_0$ なら全ての $j$ について上の不等式が成り立ち、

$$
x_\alpha\in U.
$$

任意の基本近傍へ最終的に入るので $x_\alpha\rightharpoonup x$ です。$\square$
<!-- proof-end -->

有限個の条件しか同時に課さないことと、有向集合が有限個の添字を同時に追い越せることが、ちょうど噛み合っています。

---

## 3. ノルム収束は弱収束を含意する

<a id="prop-fa3-norm-implies-weak"></a>
<!-- formal-statement-start -->
### 命題（ノルム収束なら弱収束）

$$
x_\alpha\to x\quad\text{in norm}
$$

なら

$$
x_\alpha\rightharpoonup x.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $f\in X^*$ について

$$
|f(x_\alpha)-f(x)|
=|f(x_\alpha-x)|
\le
\|f\|\,\|x_\alpha-x\|.
$$

右辺は 0 に収束するので

$$
f(x_\alpha)\to f(x).
$$

[弱収束の汎関数判定](#thm-fa3-weak-convergence-criterion)から $x_\alpha\rightharpoonup x$ です。$\square$
<!-- proof-end -->

逆は一般には偽で、前節の $e_n\in\ell^2$ が反例です。

位相の包含としては

$$
\boxed{
\sigma(X,X^*)\subseteq \tau_{\|\cdot\|}
}
$$

です。弱位相の方が粗いので、弱収束の方が要求が弱くなります。

---

## 4. Hahn--Banach が弱位相を Hausdorff にする

弱位相が異なる点を本当に区別できるには、$X^*$ が十分多く存在しなければなりません。ここで Hahn--Banach が働きます。

<a id="thm-fa3-weak-hausdorff"></a>
<!-- formal-statement-start -->
### 定理（弱位相は Hausdorff）

ノルム空間 $X$ の弱位相 $\sigma(X,X^*)$ は Hausdorff である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\ne y$ とし

$$
h=x-y\ne0
$$

と置きます。一次元部分空間 $M=\operatorname{span}\{h\}$ 上で

$$
f_0(th)=t\|h\|
$$

と定めると $\|f_0\|=1$ です。[Hahn--Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)により、$f\in X^*$ で

$$
\|f\|=1,
\qquad
f(h)=\|h\|>0
$$

となるものが存在します。

$$
0<\varepsilon<\frac{|f(x)-f(y)|}{2}
$$

を取り

$$
U=U(x;f;\varepsilon),
\qquad
V=U(y;f;\varepsilon)
$$

とします。もし $z\in U\cap V$ なら

$$
|f(x)-f(y)|
\le
|f(x)-f(z)|+|f(z)-f(y)|
<2\varepsilon,
$$

これは $\varepsilon$ の選び方に反します。従って $U\cap V=\varnothing$ です。$\square$
<!-- proof-end -->

**Hahn--Banach を使った箇所は「非零ベクトルを検出する連続線形汎関数を作る」ところです。** 基本近傍の構成自体には使っていません。

---

## 5. 有限次元と無限次元で弱位相はどう違うか

<a id="thm-fa3-weak-equals-norm-finite-dimensional"></a>
<!-- formal-statement-start -->
### 定理（弱位相とノルム位相が一致するのは有限次元の場合）

ノルム空間 $X$ について

$$
\sigma(X,X^*)=\tau_{\|\cdot\|}
$$

が成り立つことと、$X$ が有限次元であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\dim X=n<\infty$ とします。[Hahn--Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)により $X^*$ は $X$ の点を分離します。

$X^*$ を代数的双対 $X^\#$ の部分空間と見ます。もし $\dim X^*<n$ なら、有限次元線形代数から

$$
\bigcap_{f\in X^*}\ker f
$$

に非零ベクトルが残り、点分離に反します。従って $\dim X^*=n$ であり、$X^*=X^\#$ です。

$X^*$ の基底を $f_1,\dots,f_n$ とし、それに双対な $X$ の基底を $e_1,\dots,e_n$、すなわち

$$
f_i(e_j)=\delta_{ij}
$$

となるように取ります。任意の $x\in X$ は

$$
x=\sum_{i=1}^n f_i(x)e_i
$$

と書けるので

$$
\|x\|
\le
\sum_{i=1}^n |f_i(x)|\,\|e_i\|.
$$

$C=\sum_i\|e_i\|$ と置けば、$C=0$ の零空間は自明で、それ以外では

$$
U\left(0;f_1,\dots,f_n;\frac{r}{C}\right)
\subset B_X(0,r).
$$

従って各ノルム開球は弱近傍を含みます。既に弱位相はノルム位相より粗いことを示しているので、両者は一致します。

逆に $X$ を無限次元とします。もしノルム単位球 $B_X(0,1)$ が弱開なら、0 のある基本弱近傍

$$
U(0;f_1,\dots,f_m;\varepsilon)
\subset B_X(0,1)
$$

が存在します。

線形写像

$$
F:X\to\mathbb K^m,
\qquad
F(x)=(f_1(x),\dots,f_m(x))
$$

を考えます。$X$ は無限次元なので $F$ は単射になれず、ある $0\ne z\in\ker F$ が存在します。すると任意のスカラー $t$ について

$$
f_j(tz)=0
$$

だから $tz\in U(0;f_1,\dots,f_m;\varepsilon)$ です。しかし $|t|$ を十分大きくすれば

$$
\|tz\|>1,
$$

となり単位球への包含に反します。

従って無限次元では弱位相はノルム位相より真に粗いです。$\square$
<!-- proof-end -->

この証明は「有限個の汎関数では無限次元の全方向を同時に拘束できない」という弱位相の幾何をそのまま表しています。

---

## 6. 弱位相に関して連続な線形汎関数は何か

弱位相を粗くした結果、もともとの $X^*$ より多くの線形汎関数が連続になるのでしょうか。答えは **増えません**。

<a id="thm-fa3-weak-continuous-dual"></a>
<!-- formal-statement-start -->
### 定理（弱位相の連続双対は $X^*$ そのもの）

線形汎関数 $L:X\to\mathbb K$ が弱位相 $\sigma(X,X^*)$ に関して連続であることと

$$
L\in X^*
$$

であることは同値である。

さらに弱連続な $L$ は、ある有限個の $f_1,\dots,f_m\in X^*$ とスカラー $a_1,\dots,a_m$ を用いて

$$
L=\sum_{j=1}^m a_jf_j
$$

と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$L\in X^*$ なら、弱位相は $X^*$ の全要素を連続にするよう定義したので $L$ は弱連続です。

逆に $L$ が弱連続とします。0 での連続性から、ある基本近傍

$$
U=U(0;f_1,\dots,f_m;\varepsilon)
$$

が存在して

$$
x\in U\Longrightarrow |L(x)|<1
$$

となります。

$$
M=\bigcap_{j=1}^m\ker f_j
$$

と置きます。$x\in M$ なら任意の $t\in\mathbb K$ について $tx\in U$ なので

$$
|t|\,|L(x)|=|L(tx)|<1
$$

が全ての $t$ で成り立ちます。従って $L(x)=0$ であり

$$
M\subset\ker L.
$$

次に

$$
F:X\to\mathbb K^m,
\qquad
F(x)=(f_1(x),\dots,f_m(x))
$$

とします。$F(x)=F(y)$ なら $x-y\in M\subset\ker L$ なので $L(x)=L(y)$ です。従って

$$
\lambda(F(x)):=L(x)
$$

により $\operatorname{im}F$ 上の線形汎関数 $\lambda$ が well-defined に定まります。

有限次元空間 $\operatorname{im}F\subset\mathbb K^m$ 上の線形汎関数は座標線形結合で書けるので、ある $a_1,\dots,a_m$ が存在して

$$
\lambda(z_1,\dots,z_m)=\sum_{j=1}^m a_jz_j
$$

が $\operatorname{im}F$ 上で成り立ちます。従って

$$
L(x)
=\lambda(F(x))
=\sum_{j=1}^m a_jf_j(x).
$$

右辺は $X^*$ の元なので $L\in X^*$ です。$\square$
<!-- proof-end -->

弱位相はノルム位相より粗いにもかかわらず、連続線形汎関数の集合をちょうど $X^*$ に保つ最小の位相です。

---

## 7. 弱*位相：今度は $X^*$ を $X$ の点で観測する

弱位相では $x\in X$ を $f\in X^*$ で観測しました。弱*位相では立場を反転し、$f\in X^*$ を $x\in X$ で観測します。

$f_0\in X^*$、$x_1,\dots,x_m\in X$、$\varepsilon>0$ に対し

$$
V(f_0;x_1,\dots,x_m;\varepsilon)
:=
\left\{
 f\in X^*:
 |(f-f_0)(x_j)|<\varepsilon\quad(j=1,\dots,m)
\right\}
$$

と置きます。

<a id="def-fa3-weak-star-topology"></a>
<!-- formal-statement-start -->
### 定義（弱*位相）

上の集合

$$
V(f_0;x_1,\dots,x_m;\varepsilon)
$$

を $f_0$ の基本近傍とする $X^*$ 上の位相を **弱*位相** といい

$$
\boxed{\sigma(X^*,X)}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa3-weak-star-topology -->
**定義の確認**：一つのベクトルで汎関数を観測する

$x_0\in X$ を固定すると

$$
V(0;x_0;\varepsilon)
=
\{f\in X^*:|f(x_0)|<\varepsilon\}
$$

です。これは汎関数の作用素ノルム全体を小さくする条件ではなく、指定した $x_0$ での値だけを小さくする条件です。
<!-- definition-example-end -->

弱位相と同じ有限交叉の計算により、この族は近傍基底を成します。また各評価写像

$$
\operatorname{ev}_x:X^*\to\mathbb K,
\qquad
\operatorname{ev}_x(f)=f(x)
$$

を連続にする最も粗い位相が $\sigma(X^*,X)$ です。

弱*位相が Hausdorff であることには Hahn--Banach は不要です。$f\ne g$ なら写像として異なるので、ある $x\in X$ が

$$
f(x)\ne g(x)
$$

を満たします。その評価一つで互いに交わらない基本近傍を作れます。

---

## 8. 弱*収束は点ごとの収束そのもの

<a id="def-fa3-weak-star-convergence"></a>
<!-- formal-statement-start -->
### 定義（弱*収束）

ネット $(f_\alpha)\subset X^*$ が $f\in X^*$ に **弱*収束** するとは、弱*位相 $\sigma(X^*,X)$ で $f_\alpha\to f$ となることをいう。記号では

$$
\boxed{f_\alpha\overset{*}{\rightharpoonup}f}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa3-weak-star-convergence -->
**定義の確認**：$\ell^1$ 上の座標汎関数

$X=\ell^1$ とし

$$
f_n(x)=x_n
$$

と置きます。各 $f_n\in X^*$ で

$$
\|f_n\|=1.
$$

一方、任意の $x=(x_k)\in\ell^1$ について $x_n\to0$ なので

$$
f_n(x)\to0.
$$

従って $f_n\overset{*}{\rightharpoonup}0$ ですが、作用素ノルムでは 0 に収束しません。
<!-- definition-example-end -->

<a id="thm-fa3-weak-star-convergence-criterion"></a>
<!-- formal-statement-start -->
### 定理（弱*収束の評価判定）

ネット $(f_\alpha)\subset X^*$ と $f\in X^*$ について次は同値である。

1. $f_\alpha\overset{*}{\rightharpoonup}f$。
2. 任意の $x\in X$ について $f_\alpha(x)\to f(x)$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$1\Rightarrow2$：各 $x\in X$ に対する評価写像 $\operatorname{ev}_x$ は弱*連続なので、収束を写せば

$$
f_\alpha(x)\to f(x)
$$

です。

$2\Rightarrow1$：$f$ の基本近傍

$$
V=V(f;x_1,\dots,x_m;\varepsilon)
$$

を取ります。各 $j$ について $f_\alpha(x_j)\to f(x_j)$ なので、それぞれの条件が成り立つ添字以後を選べます。有向性により有限個の開始添字を同時に上から押さえる $\alpha_0$ が存在します。$\alpha\ge\alpha_0$ なら

$$
|(f_\alpha-f)(x_j)|<\varepsilon
\qquad(j=1,\dots,m),
$$

従って $f_\alpha\in V$ です。$\square$
<!-- proof-end -->

ノルム収束なら

$$
|(f_\alpha-f)(x)|
\le
\|f_\alpha-f\|\,\|x\|
$$

なので弱*収束します。逆が偽なのは上の座標汎関数が示しています。

---

## 9. 双対の双対と標準埋め込み

<a id="def-fa3-canonical-bidual-embedding"></a>
<!-- formal-statement-start -->
### 定義（双対の双対と標準埋め込み）

$X^*$ の双対

$$
X^{**}:=(X^*)^*
$$

を **双対の双対** または **第二双対** という。

各 $x\in X$ に対し

$$
(Jx)(f):=f(x)
\qquad(f\in X^*)
$$

と定める写像

$$
\boxed{J:X\to X^{**}}
$$

を **標準埋め込み** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa3-canonical-bidual-embedding -->
**定義の確認**：$Jx$ は「$f$ を $x$ で評価する」汎関数

$x\in X$ を固定すると、$Jx$ の入力は $f\in X^*$、出力はスカラー $f(x)$ です。また

$$
|(Jx)(f)|=|f(x)|\le\|x\|\,\|f\|,
$$

なので $Jx$ は $X^*$ 上の連続線形汎関数、すなわち $Jx\in X^{**}$ です。
<!-- definition-example-end -->

<a id="thm-fa3-canonical-embedding-isometry"></a>
<!-- formal-statement-start -->
### 定理（標準埋め込みは等長）

任意のノルム空間 $X$ について標準埋め込み $J:X\to X^{**}$ は線形かつ

$$
\boxed{\|Jx\|=\|x\|}
$$

を満たす。特に $J$ は単射である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形性は

$$
(J(ax+by))(f)
=f(ax+by)
=a(Jx)(f)+b(Jy)(f)
$$

から従います。

任意の $\|f\|\le1$ について

$$
|(Jx)(f)|=|f(x)|\le\|x\|
$$

なので

$$
\|Jx\|\le\|x\|.
$$

$x=0$ なら等号は自明です。$x\ne0$ とし、$M=\operatorname{span}\{x\}$ 上で

$$
f_0(tx)=t\|x\|
$$

と置きます。$\|f_0\|=1$ なので、[Hahn--Banach のノルム保存拡張](../F0_02C6_Hahn_Banach_分離定理/index.md#ref-hahn-banach-norm-preserving-extension)により $f\in X^*$ で

$$
\|f\|=1,
\qquad
f(x)=\|x\|
$$

となるものがあります。従って

$$
\|Jx\|
\ge |(Jx)(f)|
=|f(x)|
=\|x\|.
$$

両向きの不等式から等号です。$Jx=0$ なら $\|x\|=0$ なので $x=0$、従って単射です。$\square$
<!-- proof-end -->

Hahn--Banach はここで「上からの評価 $\|Jx\|\le\|x\|$」を等号へ引き上げています。

---

## 10. 弱収束は第二双対の弱*収束として読める

<a id="prop-fa3-weak-via-bidual"></a>
<!-- formal-statement-start -->
### 命題（弱収束と標準埋め込み後の弱*収束）

ネット $(x_\alpha)\subset X$ と $x\in X$ について

$$
\boxed{
x_\alpha\rightharpoonup x
\iff
Jx_\alpha\overset{*}{\rightharpoonup}Jx
\quad\text{in }X^{**}= (X^*)^*
}
$$

が成り立つ。右辺の弱*位相は $\sigma(X^{**},X^*)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[弱*収束の評価判定](#thm-fa3-weak-star-convergence-criterion)を $X^*$ の双対 $X^{**}$ に適用すると、右辺は任意の $f\in X^*$ に対して

$$
(Jx_\alpha)(f)\to(Jx)(f)
$$

となることと同値です。標準埋め込みの定義からこれは

$$
f(x_\alpha)\to f(x)
$$

です。[弱収束の汎関数判定](#thm-fa3-weak-convergence-criterion)により左辺と同値です。$\square$
<!-- proof-end -->

この命題により、$X$ の弱位相と $X^{**}$ の弱*位相は標準埋め込み $J$ を介して直接つながります。

---

## 11. 弱*位相の連続双対は「元の空間から来る評価」だけ

<a id="thm-fa3-weak-star-continuous-dual"></a>
<!-- formal-statement-start -->
### 定理（弱*位相の連続双対は $J(X)$）

線形汎関数

$$
\Phi:X^*\to\mathbb K
$$

が弱*位相 $\sigma(X^*,X)$ に関して連続であることと、ある $x\in X$ が存在して

$$
\boxed{\Phi(f)=f(x)\qquad(f\in X^*)}
$$

となることは同値である。すなわち弱*連続な線形汎関数全体は $J(X)\subset X^{**}$ と一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in X$ を固定した評価 $\Phi(f)=f(x)$ は、弱*位相の定義により連続です。

逆に $\Phi$ を弱*連続とします。0 での連続性から、ある

$$
V=V(0;x_1,\dots,x_m;\varepsilon)
$$

が存在して

$$
f\in V\Longrightarrow|\Phi(f)|<1
$$

となります。

$$
N=\{f\in X^*:f(x_j)=0\ (j=1,\dots,m)\}
$$

と置きます。$f\in N$ なら任意の $t\in\mathbb K$ について $tf\in V$ なので

$$
|t|\,|\Phi(f)|<1
$$

が全ての $t$ で成り立ち、従って $\Phi(f)=0$ です。よって $N\subset\ker\Phi$。

$$
E:X^*\to\mathbb K^m,
\qquad
E(f)=(f(x_1),\dots,f(x_m))
$$

と置くと、$E(f)=E(g)$ なら $f-g\in N$ なので $\Phi(f)=\Phi(g)$ です。従って $\Phi$ は $\operatorname{im}E$ 上の線形汎関数へ因子化し、ある $a_1,\dots,a_m$ が存在して

$$
\Phi(f)
=\sum_{j=1}^m a_jf(x_j)
=f\left(\sum_{j=1}^m a_jx_j\right).
$$

$$
x=\sum_{j=1}^m a_jx_j
$$

と置けば $\Phi=Jx$ です。$\square$
<!-- proof-end -->

弱位相の場合の定理と並べると

$$
(X,\sigma(X,X^*))'
=X^*,
$$

$$
(X^*,\sigma(X^*,X))'
=J(X)
$$

です。ここで $'$ はその位相に関して連続な線形汎関数全体を表します。

---

## 12. $X^*$ 上の weak と weak* を混同しない

$X^*$ 自身もノルム空間なので、その弱位相は

$$
\sigma(X^*,X^{**})
$$

です。一方、$X$ の双対として見る弱*位相は

$$
\sigma(X^*,X)
$$

です。

厳密には後者の「$X$」は標準埋め込み $J(X)\subset X^{**}$ を通して評価汎関数を表しています。

したがって、弱位相では **全ての $\Phi\in X^{**}$** を観測に使うのに対し、弱*位相では **$Jx$ という形の評価だけ**を使います。よって

$$
\boxed{
\sigma(X^*,X)
\subseteq
\sigma(X^*,X^{**})
}
$$

です。

この包含がいつ等号になるかは、標準埋め込み $J$ の像が $X^{**}$ をどこまで埋めるかという問題です。次章 FA4 では、この点と弱・弱*コンパクト性を扱います。

ここでは **Banach--Alaoglu をまだ使っていない**ことに注意してください。弱*位相の定義・収束判定・連続双対の同定までは、コンパクト性定理なしで閉じています。

---

## 13. 有界線形作用素は弱位相でも連続

<a id="prop-fa3-bounded-map-weak-continuous"></a>
<!-- formal-statement-start -->
### 命題（有界線形作用素の弱連続性）

ノルム空間 $X,Y$ と有界線形作用素

$$
T:X\to Y
$$

に対し、$T$ は

$$
(X,\sigma(X,X^*))\to(Y,\sigma(Y,Y^*))
$$

として連続である。従って

$$
x_\alpha\rightharpoonup x
\Longrightarrow
Tx_\alpha\rightharpoonup Tx.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $g\in Y^*$ を取ります。合成

$$
g\circ T:X\to\mathbb K
$$

は線形で、

$$
|(g\circ T)(x)|
\le
\|g\|\,\|T\|\,\|x\|
$$

だから $g\circ T\in X^*$ です。

$x_\alpha\rightharpoonup x$ なら[弱収束の汎関数判定](#thm-fa3-weak-convergence-criterion)から

$$
(g\circ T)(x_\alpha)
\to
(g\circ T)(x).
$$

すなわち

$$
g(Tx_\alpha)\to g(Tx)
$$

が任意の $g\in Y^*$ について成り立つので、再び判定定理から

$$
Tx_\alpha\rightharpoonup Tx.
$$

です。$\square$
<!-- proof-end -->

---

# 演習

## A問題

### FA3-A01 基本弱近傍の交叉

- Level: A
- 目安時間: 10分

$$
z\in U(x;f_1,\dots,f_m;\varepsilon)
\cap U(y;g_1,\dots,g_n;\eta)
$$

とする。ある $\delta>0$ を具体的に選び

$$
U(z;f_1,\dots,f_m,g_1,\dots,g_n;\delta)
$$

が上の交叉に含まれることを示せ。

<!-- solution-start -->
#### 詳細解答

有限個の正数

$$
\varepsilon-|f_j(z-x)|,
\qquad
\eta-|g_k(z-y)|
$$

の最小値を $d>0$ とし、例えば $\delta=d/2$ とする。$w$ が $z$ 中心の新しい基本近傍に入れば

$$
|f_j(w-x)|
\le |f_j(w-z)|+|f_j(z-x)|
<\delta+|f_j(z-x)|
<\varepsilon.
$$

$g_k$ についても同様に $|g_k(w-y)|<\eta$。従って所望の包含が成り立つ。
<!-- solution-end -->

### FA3-A02 $\ell^2$ の標準基底は弱収束する

- Level: A
- 目安時間: 10分

$e_n\in\ell^2$ について

$$
e_n\rightharpoonup0,
\qquad
e_n\not\to0\text{ in norm}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

任意の $f\in(\ell^2)^*$ は Riesz 表現により $f(x)=\langle x,y\rangle$ と書ける。$y\in\ell^2$ なら $y_n\to0$ なので

$$
f(e_n)=\overline{y_n}\to0.
$$

従って汎関数判定から $e_n\rightharpoonup0$。一方 $\|e_n\|_2=1$ なのでノルム収束はしない。
<!-- solution-end -->

### FA3-A03 $\ell^1$ 上の座標汎関数は弱*収束する

- Level: A
- 目安時間: 10分

$$
f_n:\ell^1\to\mathbb K,
\qquad
f_n(x)=x_n
$$

とする。$\|f_n\|=1$ と $f_n\overset{*}{\rightharpoonup}0$ を示せ。

<!-- solution-start -->
#### 詳細解答

$|x_n|\le\|x\|_1$ なので $\|f_n\|\le1$。$x=e_n$ を入れれば $|f_n(e_n)|=1$ だから $\|f_n\|=1$。任意の固定した $x\in\ell^1$ では $x_n\to0$ なので

$$
f_n(x)=x_n\to0.
$$

弱*収束の評価判定から $f_n\overset{*}{\rightharpoonup}0$。
<!-- solution-end -->

### FA3-A04 標準埋め込みの等長性

- Level: A
- 目安時間: 15分

$J:X\to X^{**}$、$(Jx)(f)=f(x)$ について

$$
\|Jx\|=\|x\|
$$

を示せ。どちら向きの不等式で Hahn--Banach が必要かも明記せよ。

<!-- solution-start -->
#### 詳細解答

$\|f\|\le1$ なら $|f(x)|\le\|x\|$ なので $\|Jx\|\le\|x\|$。逆向きでは $x\ne0$ に対して $\operatorname{span}\{x\}$ 上の $f_0(tx)=t\|x\|$ をノルム1のまま Hahn--Banach で延長し、$\|f\|=1$, $f(x)=\|x\|$ を得る。従って

$$
\|Jx\|\ge|(Jx)(f)|=\|x\|.
$$

Hahn--Banach が必要なのは下からの評価である。
<!-- solution-end -->

## B問題

### FA3-B01 net の弱収束判定で有向性を使う箇所

- Level: B
- 目安時間: 20分

全ての $f\in X^*$ について $f(x_\alpha)\to f(x)$ とする。基本近傍

$$
U(x;f_1,\dots,f_m;\varepsilon)
$$

を用いて $x_\alpha\rightharpoonup x$ を示し、有向性が必要な箇所を特定せよ。

<!-- solution-start -->
#### 詳細解答

各 $j$ について、ある $\alpha_j$ 以後で

$$
|f_j(x_\alpha-x)|<\varepsilon
$$

となる。添字集合が有向であるため、有限個の $\alpha_j$ 全て以上の $\alpha_0$ が取れる。$\alpha\ge\alpha_0$ なら全ての不等式が同時成立し $x_\alpha\in U$。任意の基本近傍でこれが成り立つので弱収束する。有向性は「有限個の最終条件を一つの尾部へまとめる」箇所で使う。
<!-- solution-end -->

### FA3-B02 弱連続な線形汎関数は有限個の観測量の線形結合

- Level: B
- 目安時間: 25分

$L:X\to\mathbb K$ が $\sigma(X,X^*)$ に関して連続とする。ある $f_1,\dots,f_m\in X^*$ と $a_1,\dots,a_m\in\mathbb K$ が存在して

$$
L=\sum_{j=1}^m a_jf_j
$$

となることを示せ。

<!-- solution-start -->
#### 詳細解答

0 のある基本近傍 $U(0;f_1,\dots,f_m;\varepsilon)$ 上で $|L|<1$ とできる。$M=\cap_j\ker f_j$ と置く。$x\in M$ なら全ての $t$ について $tx\in U$ なので $|tL(x)|<1$、従って $L(x)=0$。よって $M\subset\ker L$。

$F(x)=(f_1(x),\dots,f_m(x))$ と置けば、$F(x)=F(y)$ から $L(x)=L(y)$ が従うので $L$ は $\operatorname{im}F$ 上へ因子化する。有限次元部分空間上の線形汎関数は座標の線形結合だから

$$
L(x)=\sum_j a_jf_j(x).
$$
<!-- solution-end -->

### FA3-B03 弱*連続双対を同定する

- Level: B
- 目安時間: 25分

$\Phi:X^*\to\mathbb K$ が $\sigma(X^*,X)$ に関して連続とする。ある $x\in X$ が存在して

$$
\Phi(f)=f(x)
$$

となることを証明せよ。

<!-- solution-start -->
#### 詳細解答

弱*連続性から、ある $x_1,\dots,x_m$ と $\varepsilon>0$ について

$$
V(0;x_1,\dots,x_m;\varepsilon)
$$

上で $|\Phi|<1$ とできる。全ての $x_j$ を消す $f$ に対しては任意のスカラー倍もこの近傍に入るため $\Phi(f)=0$。

従って $E(f)=(f(x_1),\dots,f(x_m))$ の核は $\ker\Phi$ に含まれ、$\Phi$ は $\operatorname{im}E$ 上へ因子化する。有限次元線形代数から

$$
\Phi(f)=\sum_{j=1}^m a_jf(x_j)
=f\left(\sum_{j=1}^m a_jx_j\right).
$$

$x=\sum_j a_jx_j$ とすればよい。
<!-- solution-end -->

## C問題

### FA3-C01 弱位相とノルム位相の一致条件

- Level: C
- 目安時間: 40分

ノルム空間 $X$ について

$$
\sigma(X,X^*)=\tau_{\|\cdot\|}
$$

であることと $X$ が有限次元であることが同値であることを証明せよ。無限次元側では、有限個の汎関数

$$
f_1,\dots,f_m
$$

の共通核が非零であることを使ってよい。

<!-- solution-start -->
#### 詳細解答

有限次元なら Hahn--Banach の点分離性から連続双対 $X^*$ は代数的双対全体になる。$X^*$ の基底 $f_1,\dots,f_n$ と対応する $X$ の双対基底 $e_1,\dots,e_n$ を取ると

$$
x=\sum_i f_i(x)e_i,
\qquad
\|x\|\le\sum_i|f_i(x)|\|e_i\|.
$$

従って有限個の $f_i$ を十分小さくする弱近傍を任意のノルム球に入れられる。逆包含は常に成り立つので位相は一致する。

無限次元で単位ノルム球が弱開と仮定すると、ある

$$
U(0;f_1,\dots,f_m;\varepsilon)\subset B(0,1)
$$

が存在する。しかし $F(x)=(f_1(x),\dots,f_m(x))$ は無限次元空間から有限次元空間への線形写像なので非零の核を持つ。$0\ne z\in\ker F$ なら全ての $tz$ が上の弱近傍に入る一方、$|t|$ を大きくすれば $\|tz\|>1$。矛盾。
<!-- solution-end -->

---

## まとめ

- 弱位相 $\sigma(X,X^*)$ は、有限個の連続線形汎関数の値だけを同時に制御する基本近傍から作る。
- $x_\alpha\rightharpoonup x$ は、全ての $f\in X^*$ について $f(x_\alpha)\to f(x)$ と同値。
- Hahn--Banach は $X^*$ が点を分離することを保証し、弱位相を Hausdorff にする。
- 有限次元では弱位相とノルム位相は一致し、無限次元では弱位相が真に粗い。
- 弱位相に関する連続線形汎関数は新たに増えず、ちょうど $X^*$ である。
- 弱*位相 $\sigma(X^*,X)$ は、有限個の $x\in X$ での評価だけを制御する。
- $f_\alpha\overset{*}{\rightharpoonup}f$ は、全ての $x\in X$ について $f_\alpha(x)\to f(x)$ と同値。
- 標準埋め込み $J:X\to X^{**}$ は Hahn--Banach により等長で、弱収束を $X^{**}$ の弱*収束へ移す。
- 弱*連続な $X^*$ 上の線形汎関数はちょうど $J(X)$ から来る評価である。
- $X^*$ 上では弱*位相は弱位相以下であり、その差を理解することが次章の出発点になる。
