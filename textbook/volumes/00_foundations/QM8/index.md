# QM8 CCR・Weyl 関係と作用素環への入口

<!-- definition-example-audit: strict -->

> **既出概念**：[QM4 の交換子](../QM4/index.md#def-qm4-commutator)、[QM5 の位置作用素](../QM5/index.md#thm-qm5-position-self-adjoint)と[運動量作用素](../QM5/index.md#thm-qm5-momentum-fourier)、[QM7 の Stone の定理](../QM7/index.md#thm-qm7-stone)を使います。

QM7 では、自己共役作用素を指数関数に入れることで、全 Hilbert 空間上に作用するユニタリ群

$$
U(t)=e^{-itH/\hbar}
$$

を得ました。ここで重要なのは、非有界な生成作用素そのものより、指数化したユニタリ作用素の方が扱いやすい場面があることです。

量子力学で最も典型的な例が位置 $Q$ と運動量 $P$ です。形式的には

$$
[Q,P]=QP-PQ=i\hbar I
$$

と書きます。しかし $Q$ と $P$ は非有界です。したがって $QP$ と $PQ$ がどのベクトルにも作用するわけではなく、この一行を有界行列の交換子と同じ気分で扱うと定義域を失います。

本章ではこの問題を、次の順に解きます。

$$
\boxed{
\text{非有界な CCR}
\longrightarrow
\text{指数化}
\longrightarrow
\text{Weyl 関係}
\longrightarrow
\text{ユニタリ作用素が生成する代数}
}
$$

最後の矢印が、次の OA1「Banach 環とスペクトル」への入口です。一個の観測量ではなく、複数の観測量と、それらの和・積・随伴・極限をまとめて扱う必要が出てきます。

---

## 1. CCR は「式」だけでは定義にならない

QM5 の Schrödinger 表現では

$$
H=L^2(\mathbb R),
$$

$$
(Q\psi)(x)=x\psi(x),
\qquad
(P\psi)(x)=-i\hbar\psi'(x)
$$

でした。

位置作用素の最大定義域は

$$
D(Q)=
\left\{
\psi\in L^2(\mathbb R):
x\psi(x)\in L^2(\mathbb R)
\right\},
$$

運動量作用素の自己共役な定義域は、QM5 の Fourier 表現では

$
D(P)
=
\left\{
\psi\in L^2(\mathbb R):
\xi(\mathcal F\psi)(\xi)\in L^2(\mathbb R)
\right\}
$

です。

ここで

$$
QP\psi
$$

を書くには $\psi\in D(P)$ だけでなく $P\psi\in D(Q)$ が必要です。同様に $PQ\psi$ には $Q\psi\in D(P)$ が必要です。

つまり交換子の自然な定義域は少なくとも

$$
D(QP)\cap D(PQ)
$$

であり、$D(Q)\cap D(P)$ とすら同じとは限りません。

そこで、まず共通の安全な領域を固定します。

<a id="def-qm8-ccr-common-domain"></a>

<!-- formal-statement-start -->
### 定義（共通不変領域上の正準交換関係）

$\hbar>0$ とする。Hilbert 空間 $H$ 上の稠密定義作用素 $Q,P$ と稠密線形部分空間 $\mathcal D\subset H$ が次を満たすとする。

$$
\mathcal D\subset D(Q)\cap D(P),
$$

$$
Q\mathcal D\subset\mathcal D,
\qquad
P\mathcal D\subset\mathcal D.
$$

さらに全ての $\psi\in\mathcal D$ に対して

$$
\boxed{
(QP-PQ)\psi=i\hbar\psi
}
$$

が成り立つとき、$Q,P$ は $\mathcal D$ 上で **正準交換関係**、略して CCR を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm8-ccr-common-domain -->

**定義の確認**

### 直接例：Schwartz 空間上の位置と運動量

$$
\mathcal D=\mathcal S(\mathbb R)
$$

とします。Schwartz 関数は何回微分しても、また $x$ を何回掛けても Schwartz 関数のままなので

$$
Q\mathcal S(\mathbb R)\subset\mathcal S(\mathbb R),
\qquad
P\mathcal S(\mathbb R)\subset\mathcal S(\mathbb R)
$$

です。

$\psi\in\mathcal S(\mathbb R)$ に対して

$$
(QP\psi)(x)
=
-i\hbar x\psi'(x),
$$

一方

$$
\begin{aligned}
(PQ\psi)(x)
&=
-i\hbar\frac{d}{dx}\{x\psi(x)\}\\
&=
-i\hbar\psi(x)-i\hbar x\psi'(x).
\end{aligned}
$$

従って

$$
\begin{aligned}
((QP-PQ)\psi)(x)
&=
-i\hbar x\psi'(x)
+i\hbar\psi(x)
+i\hbar x\psi'(x)\\
&=
i\hbar\psi(x).
\end{aligned}
$$

よって $Q,P$ は $\mathcal S(\mathbb R)$ 上で CCR を満たします。

<!-- definition-example-end -->

### 最大定義域どうしを交差させれば十分、ではない

定義域問題は飾りではありません。例えば

$$
f=\mathbf 1_{[0,1]}
$$

は $xf\in L^2(\mathbb R)$ なので $f\in D(Q)$ ですが、跳びを持つため $f\notin H^1(\mathbb R)=D(P)$ です。

逆向きには

$
g(x)=\frac1{(1+x^2)^{2/3}}
$

を取れます。$g,g'\in L^1(\mathbb R)\cap L^2(\mathbb R)$ なので、FOU3 の Fourier 微分公式と FOU4 の Plancherel により

$
\xi\widehat g(\xi)
=
\frac1i\widehat{g'}(\xi)
\in L^2(\mathbb R).
$

従って $g\in D(P)$ です。

一方、

$
|xg(x)|^2
=
\frac{x^2}{(1+x^2)^{4/3}}
\sim
|x|^{-2/3}
$

であり、右辺は無限遠で積分できません。従って $g\notin D(Q)$ です。

したがって $Q$ と $P$ の「自己共役な最大定義域」が分かっても、交換子を全空間上の作用素のように書いてよいわけではありません。

---

## 2. CCR を有界作用素だけで実現することはできない

「定義域が面倒なら、$Q$ と $P$ を有界作用素で置き換えればよい」と考えたくなります。しかし正準交換関係そのものが、それを禁止します。

<a id="prop-qm8-bounded-ccr-impossible"></a>

<!-- formal-statement-start -->
### 命題（有界作用素では正準交換関係を満たせない）

Banach 空間 $X\ne\{0\}$ 上の有界作用素 $A,B\in B(X)$ が

$$
AB-BA=I
$$

を満たすことはない。

従って Hilbert 空間上の有界作用素 $Q,P$ が

$$
[Q,P]=i\hbar I
$$

を満たすこともない。
<!-- formal-statement-end -->

### 証明の見取り図

交換子を $B^n$ まで広げると、右辺に係数 $n$ が出ます。一方、有界作用素のノルム評価では右辺を $n$ に依存しない定数で押さえられます。この二つが $n\to\infty$ で衝突します。

<!-- proof-start -->
### 証明

まず帰納法で

$$
[A,B^n]=nB^{n-1}
$$

を示します。

$n=1$ では仮定そのものです。$n$ で成り立つとすると

$$
\begin{aligned}
[A,B^{n+1}]
&=
AB^{n+1}-B^{n+1}A\\
&=
(AB^n-B^nA)B
+
B^n(AB-BA)\\
&=
nB^{n-1}B+B^n\\
&=
(n+1)B^n.
\end{aligned}
$$

従って全ての $n\ge1$ で成り立ちます。

ここで $B$ は冪零ではありません。もし最小の $m\ge1$ について $B^m=0$ なら

$$
0=[A,B^m]=mB^{m-1},
$$

となり $B^{m-1}=0$ で、$m$ の最小性に反します。

したがって全ての $n$ について

$$
\|B^{n-1}\|>0.
$$

交換子のノルムを評価すると

$$
\begin{aligned}
n\|B^{n-1}\|
&=
\|AB^n-B^nA\|\\
&\le
\|AB^n\|+\|B^nA\|\\
&\le
2\|A\|\,\|B^n\|\\
&\le
2\|A\|\,\|B\|\,\|B^{n-1}\|.
\end{aligned}
$$

正の $\|B^{n-1}\|$ で割れば

$$
n\le2\|A\|\,\|B\|
$$

を全ての $n$ で満たさなければなりません。これは不可能です。

最後に、もし有界な $Q,P$ が

$$
[Q,P]=i\hbar I
$$

を満たすなら

$$
A=\frac1{i\hbar}Q,
\qquad
B=P
$$

と置けば $AB-BA=I$ となるので矛盾します。$\square$
<!-- proof-end -->

この命題は重要です。位置と運動量が非有界になるのは、たまたま Schrödinger 表現を選んだからではありません。**CCR を正確に実現しようとすると、非有界性から逃げられない**のです。

そこで発想を変えます。$Q,P$ 自体を有界にするのではなく、自己共役性を使って指数化します。

---

## 3. 非有界作用素を指数化する

QM7 の Stone の定理を使い、

$$
U(a)=e^{-iaP/\hbar},
\qquad
V(b)=e^{-ibQ/\hbar}
$$

と置きます。

$Q,P$ は非有界でも、指数関数

$$
\lambda\longmapsto e^{-ia\lambda/\hbar}
$$

は絶対値1なので、$U(a),V(b)$ は全空間 $H$ 上のユニタリ作用素です。

Schrödinger 表現では、この二つは非常に具体的です。

<a id="prop-qm8-schrodinger-weyl-unitaries"></a>

<!-- formal-statement-start -->
### 命題（Schrödinger 表現の平行移動と位相変調）

$H=L^2(\mathbb R)$ とし、QM5 の自己共役な位置作用素 $Q$ と運動量作用素 $P$ を取る。

$$
U(a)=e^{-iaP/\hbar},
\qquad
V(b)=e^{-ibQ/\hbar}
$$

と置くと、全ての $\psi\in L^2(\mathbb R)$ に対して

$$
\boxed{
(U(a)\psi)(x)=\psi(x-a)
}
$$

および

$$
\boxed{
(V(b)\psi)(x)=e^{-ibx/\hbar}\psi(x)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V(b)$ については、$Q$ が「$x$ を掛ける作用素」なので、QM6 の Borel 関数計算から直接

$$
(V(b)\psi)(x)
=
e^{-ibx/\hbar}\psi(x)
$$

です。

$U(a)$ については、まず

$$
(T(a)\psi)(x)=\psi(x-a)
$$

と置きます。変数変換 $y=x-a$ により

$$
\|T(a)\psi\|_2^2
=
\int_{\mathbb R}|\psi(x-a)|^2\,dx
=
\|\psi\|_2^2
$$

なので $T(a)$ はユニタリです。

また

$$
T(a+c)=T(a)T(c)
$$

です。$C_c^\infty(\mathbb R)$ 上では一様連続性から $a\to0$ で $T(a)\psi\to\psi$ が $L^2$ 収束し、一般の $L^2$ 関数には $C_c^\infty$ の稠密性と $\|T(a)\|=1$ を使って拡張できます。従って $(T(a))$ は強連続1パラメータユニタリ群です。

さらに $\psi\in\mathcal S(\mathbb R)$ なら

$$
\frac{T(a)\psi-\psi}{a}
=
\frac{\psi(\,\cdot-a)-\psi}{a}
\longrightarrow
-\psi'
$$

が $L^2$ で成り立ちます。一方

$$
-\frac{i}{\hbar}P\psi
=
-\frac{i}{\hbar}(-i\hbar\psi')
=
-\psi'.
$$

したがって $T(a)$ の生成作用素は $-iP/\hbar$ です。[Stone の定理](../QM7/index.md#thm-qm7-stone)の一意性から

$$
T(a)=e^{-iaP/\hbar}=U(a).
$$

$\square$
<!-- proof-end -->

この表示を見ると、$U(a)$ は位置を $a$ だけ平行移動し、$V(b)$ は位置 $x$ に比例する位相を掛ける作用素だと分かります。

---

## 4. Weyl 関係：CCR の有界な姿

平行移動してから位相を掛ける場合と、位相を掛けてから平行移動する場合を比較します。

$\psi\in L^2(\mathbb R)$ に対して

$$
\begin{aligned}
(U(a)V(b)\psi)(x)
&=
(V(b)\psi)(x-a)\\
&=
e^{-ib(x-a)/\hbar}\psi(x-a)\\
&=
e^{iab/\hbar}
e^{-ibx/\hbar}\psi(x-a).
\end{aligned}
$$

一方

$$
(V(b)U(a)\psi)(x)
=
e^{-ibx/\hbar}\psi(x-a).
$$

従って

$$
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a).
$$

ここでは両辺が有界作用素なので、定義域を気にせず全ての $\psi\in H$ に作用させられます。

<a id="def-qm8-weyl-relations"></a>

<!-- formal-statement-start -->
### 定義（Weyl 関係）

$\hbar>0$ とする。Hilbert 空間 $H$ 上の二つの強連続1パラメータユニタリ群

$$
(U(a))_{a\in\mathbb R},
\qquad
(V(b))_{b\in\mathbb R}
$$

が全ての $a,b\in\mathbb R$ について

$$
\boxed{
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a)
}
$$

を満たすとき、$U,V$ はパラメータ $\hbar$ の **Weyl 関係**を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm8-weyl-relations -->

**定義の確認**

### 直接例：Schrödinger の Weyl 対

前節の

$$
(U(a)\psi)(x)=\psi(x-a),
\qquad
(V(b)\psi)(x)=e^{-ibx/\hbar}\psi(x)
$$

では、上で直接計算した通り

$$
U(a)V(b)\psi
=
e^{iab/\hbar}V(b)U(a)\psi
$$

が全ての $\psi\in L^2(\mathbb R)$ で成り立ちます。

従って Schrödinger 表現の $(U,V)$ は Weyl 関係を満たします。

<!-- definition-example-end -->

CCR と Weyl 関係の違いを整理すると、

- CCR は $Q,P$ という**非有界生成作用素**の微分的な関係、
- Weyl 関係は $U(a),V(b)$ という**有界ユニタリ作用素**の有限変換の関係、

です。

この「微分式を有限変換へ持ち上げる」という操作が、定義域問題を避ける鍵です。

---

## 5. Weyl 関係を微分すると CCR に戻る

Weyl 関係は CCR と無関係な別物ではありません。十分よい共通領域上では、Weyl 関係を微分すると CCR が戻ります。

<a id="prop-qm8-weyl-implies-ccr"></a>

<!-- formal-statement-start -->
### 命題（Weyl 関係の微分から CCR を得る）

$U(a),V(b)$ が Weyl 関係を満たし、Stone の定理による自己共役生成作用素を $P,Q$ として

$$
U(a)=e^{-iaP/\hbar},
\qquad
V(b)=e^{-ibQ/\hbar}
$$

と書く。

稠密線形部分空間 $\mathcal D$ が $U(a),V(b)$ で不変であり、

$$
\mathcal D\subset D(QP)\cap D(PQ)
$$

を満たすとする。

このとき全ての $\psi\in\mathcal D$ に対して

$$
\boxed{
(QP-PQ)\psi=i\hbar\psi
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず Weyl 関係を $a$ で微分して、$V(b)$ が $P$ を $b$ だけずらす共役公式を得ます。次にその公式を $b$ で微分すると、交換子が現れます。

<!-- proof-start -->
### 証明

Weyl 関係

$$
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a)
$$

を固定した $b$ と $\psi\in\mathcal D$ に作用させ、$a=0$ で強微分します。

Stone の定理から

$$
\left.\frac{d}{da}U(a)\phi\right|_{a=0}
=
-\frac{i}{\hbar}P\phi
$$

です。$\mathcal D$ の不変性により必要なベクトルは全て $D(P)$ に入ります。従って

$$
-\frac{i}{\hbar}PV(b)\psi
=
\frac{ib}{\hbar}V(b)\psi
-
\frac{i}{\hbar}V(b)P\psi.
$$

両辺に $i\hbar$ を掛けると

$$
PV(b)\psi
=
V(b)P\psi-bV(b)\psi.
$$

左から $V(b)^*$ を作用させて

$$
\boxed{
V(b)^*PV(b)\psi
=
(P-bI)\psi
}
$$

を得ます。

次にこの式を $b=0$ で微分します。$V(b)=e^{-ibQ/\hbar}$ なので

$$
\left.\frac{d}{db}V(b)\phi\right|_{b=0}
=
-\frac{i}{\hbar}Q\phi,
$$

$$
\left.\frac{d}{db}V(b)^*\phi\right|_{b=0}
=
\frac{i}{\hbar}Q\phi.
$$

従って左辺の微分は

$$
\begin{aligned}
\left.
\frac{d}{db}
V(b)^*PV(b)\psi
\right|_{b=0}
&=
\frac{i}{\hbar}QP\psi
-
\frac{i}{\hbar}PQ\psi\\
&=
\frac{i}{\hbar}(QP-PQ)\psi.
\end{aligned}
$$

右辺の微分は $-\psi$ です。よって

$$
\frac{i}{\hbar}(QP-PQ)\psi=-\psi.
$$

両辺に $\hbar/i=-i\hbar$ を掛けると

$$
(QP-PQ)\psi=i\hbar\psi.
$$

$\square$
<!-- proof-end -->

ここで $\mathcal D$ を置いた理由が本質です。Weyl 関係自体は全空間上で意味を持ちますが、微分して $Q,P,QP,PQ$ を出した瞬間に、再び定義域条件が必要になります。

---

## 6. 共役すると位置と運動量が平行移動する

Schrödinger 表現では Weyl 関係の意味をさらに具体化できます。

$\psi\in\mathcal S(\mathbb R)$ に対して

$$
\begin{aligned}
(U(a)^*QU(a)\psi)(x)
&=
(U(-a)Q U(a)\psi)(x)\\
&=
(Q U(a)\psi)(x+a)\\
&=
(x+a)\psi(x).
\end{aligned}
$$

従って

$$
\boxed{
U(a)^*QU(a)=Q+aI
}
$$

が $\mathcal S(\mathbb R)$ 上で成り立ちます。

同様に

$$
\boxed{
V(b)^*PV(b)=P-bI
}
$$

です。

つまり $U(a)$ は位置原点を $a$ だけずらし、$V(b)$ は運動量を $-b$ だけずらします。

さらに四つの操作を一周させると

$$
U(a)V(b)U(-a)V(-b)
=
e^{iab/\hbar}I.
$$

位置方向へ $a$、運動量方向へ $b$ だけ動き、逆向きに戻って出発点へ帰っても、状態ベクトルには位相

$$
e^{iab/\hbar}
$$

が残ります。

量子状態の ray だけ見れば全体位相は同じ状態を表しますが、この中心位相は Weyl 関係の非可換性そのものを記録しています。

---

## 7. 既約性：同じ量子系を二重に重ねていないか

Weyl 関係だけなら、同じ表現を二つ直和したものもまた Weyl 関係を満たします。

例えば

$$
H=L^2(\mathbb R)\oplus L^2(\mathbb R)
$$

上で

$$
\widetilde U(a)=U(a)\oplus U(a),
\qquad
\widetilde V(b)=V(b)\oplus V(b)
$$

とすれば Weyl 関係は成り立ちます。しかし

$$
L^2(\mathbb R)\oplus\{0\}
$$

は全ての $\widetilde U(a),\widetilde V(b)$ で保たれます。これは一つの量子系を二重に並べただけです。

この重複を除く条件が既約性です。

<a id="def-qm8-irreducible-weyl-pair"></a>

<!-- formal-statement-start -->
### 定義（既約な Weyl 対）

Weyl 関係を満たす強連続ユニタリ群 $U,V$ が **既約**であるとは、全ての $U(a)$ と $V(b)$ で不変な閉部分空間が

$$
\{0\}
\quad\text{と}\quad
H
$$

しか存在しないことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm8-irreducible-weyl-pair -->

**定義の確認**

### 非例：Schrödinger 表現の二重直和

上の

$$
\widetilde U(a)=U(a)\oplus U(a),
\qquad
\widetilde V(b)=V(b)\oplus V(b)
$$

を考えます。

閉部分空間

$$
M=L^2(\mathbb R)\oplus\{0\}
$$

に対して

$$
\widetilde U(a)M\subset M,
\qquad
\widetilde V(b)M\subset M
$$

が全ての $a,b$ で成り立ちます。

$M$ は $\{0\}$ でも全空間でもないので、この直和表現は既約ではありません。

一方、標準 Schrödinger 表現そのものは既約です。この事実も Stone--von Neumann の定理に含まれる標準的構造の一部です。

<!-- definition-example-end -->

---

## 8. Stone--von Neumann の定理が言うこと

ここまでで、一つの疑問が残ります。

> CCR や Weyl 関係を満たす量子力学の表現は、Schrödinger 表現以外にも本質的に違うものが大量にあるのか。

有限自由度では、強連続性と既約性を課すと答えは驚くほど剛直です。

<a id="thm-qm8-stone-von-neumann"></a>

<!-- formal-statement-start -->
### 定理（Stone--von Neumann の定理：1自由度 Weyl 形式）

$\hbar>0$ を固定する。可分複素 Hilbert 空間 $H$ 上の強連続1パラメータユニタリ群 $U(a),V(b)$ が Weyl 関係

$$
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a)
$$

を満たし、さらに既約であるとする。

このときユニタリ作用素

$$
W:H\to L^2(\mathbb R)
$$

が存在して、全ての $a,b\in\mathbb R$ について

$$
WU(a)W^{-1}\psi(x)=\psi(x-a),
$$

$$
WV(b)W^{-1}\psi(x)=e^{-ibx/\hbar}\psi(x)
$$

となる。

すなわち、固定した $\hbar$ を持つ強連続・既約 Weyl 表現は、ユニタリ同値を除いて Schrödinger 表現一つである。
<!-- formal-statement-end -->

### この章では何を黒箱にするか

この定理の完全証明には、Weyl 表現の構造を Fourier 解析・表現論の道具で解体する議論が必要です。本章の中心は **CCR の定義域問題を Weyl 関係でどう解消し、なぜ作用素全体を見る必要が出るか** にあります。

したがって Stone--von Neumann の定理は、この章では主張と意味を正確に使うところまでを扱い、完全証明は意図的に黒箱とします。後続の OA1 以降もこの定理の証明を prerequisite にはしません。

重要なのは仮定です。

- **強連続性**がなければ Stone の定理で自己共役生成作用素へ戻れません。
- **既約性**がなければ、Schrödinger 表現の直和のような重複表現がいくらでも作れます。
- **有限自由度**の Weyl 関係だから一意性が成り立ちます。無限自由度、特に量子場では互いにユニタリ同値でない表現が現れます。

最後の点は、有限自由度量子力学と量子場理論の数学が大きく分かれる場所の一つです。

---

## 9. 一個の作用素から「作用素の代数」へ

Weyl 関係を使うと、$U(a)$ と $V(b)$ の積は順序を入れ替えても中心位相が付くだけです。

例えば

$$
\begin{aligned}
U(a)V(b)U(a')V(b')
&=
e^{-ia'b/\hbar}
U(a+a')V(b+b').
\end{aligned}
$$

また

$$
\begin{aligned}
(U(a)V(b))^*
&=
V(-b)U(-a)\\
&=
e^{-iab/\hbar}U(-a)V(-b).
\end{aligned}
$$

したがって

$$
\mathcal A_0
=
\operatorname{span}
\left\{
U(a)V(b):
a,b\in\mathbb R
\right\}
$$

を考えると、$\mathcal A_0$ は

- 和
- スカラー倍
- 積
- 随伴

で閉じています。

さらに作用素ノルムで極限を取って閉じれば、単なる「$Q$ と $P$ の二個の観測量」ではなく、それらの有限変換から生成される**作用素の体系**が得られます。

ここで次の問いが自然に出ます。

> 作用素を一個ずつ調べるのではなく、加法・積・ノルム極限を同時に扱える器は何か。

それが次章 OA1 の Banach 環です。その先では随伴まで含めた $C^*$-環へ進みます。

量子力学基礎 I では「観測量は自己共役作用素」と学びました。量子力学基礎 II の最後では、見方を一段上げます。

$$
\boxed{
\text{観測量一個のスペクトル}
\quad\longrightarrow\quad
\text{観測量たちが生成する非可換代数}
}
$$

この視点の切替が、作用素環論の出発点です。

---

## 10. 演習

### 問1　Schwartz 空間上の CCR

- Level: A

$\psi\in\mathcal S(\mathbb R)$ に対して

$$
(Q\psi)(x)=x\psi(x),
\qquad
(P\psi)(x)=-i\hbar\psi'(x)
$$

とする。

1. $Q\psi,P\psi\in\mathcal S(\mathbb R)$ を説明せよ。
2. $(QP-PQ)\psi=i\hbar\psi$ を直接計算せよ。

<!-- solution-start -->
### 詳細解答

Schwartz 関数では任意の非負整数 $m,n$ に対して

$$
\sup_{x\in\mathbb R}
|x^m\psi^{(n)}(x)|<\infty
$$

です。

$Q\psi=x\psi$ の微分は Leibniz 則により $\psi$ と $x\psi'$ の線形結合になり、さらに $x^m$ を掛けても Schwartz 条件で有界です。従って $Q\psi\in\mathcal S(\mathbb R)$ です。

また $P\psi=-i\hbar\psi'$ なので、微分で閉じていることから $P\psi\in\mathcal S(\mathbb R)$ です。

次に

$$
(QP\psi)(x)
=
-i\hbar x\psi'(x),
$$

$$
(PQ\psi)(x)
=
-i\hbar(\psi(x)+x\psi'(x)).
$$

従って

$$
\begin{aligned}
((QP-PQ)\psi)(x)
&=
-i\hbar x\psi'(x)
+i\hbar\psi(x)
+i\hbar x\psi'(x)\\
&=
i\hbar\psi(x).
\end{aligned}
$$

よって $\mathcal S(\mathbb R)$ は $Q,P$ の共通不変領域で、CCR が成り立ちます。
<!-- solution-end -->

### 問2　定義域は一致しない

- Level: A

$$
f=\mathbf 1_{[0,1]},
\qquad
g(x)=\frac1{1+|x|}
$$

とする。

1. Fourier 変換を使って $f\in D(Q)$ だが $f\notin D(P)$ を示せ。
2. 
   $
   g(x)=\frac1{(1+x^2)^{2/3}}
   $
   と取り、FOU3 の微分公式と Plancherel を使って $g\in D(P)$ だが $g\notin D(Q)$ を示せ。

<!-- solution-start -->
### 詳細解答

$f$ は有限区間に台を持つので

$
\int_{\mathbb R}|x f(x)|^2\,dx
=
\int_0^1x^2\,dx
=
\frac13<\infty.
$

従って $f\in D(Q)$ です。

また FOU3 の定義から、$\xi\ne0$ では

$
\widehat f(\xi)
=
\int_0^1e^{-i\xi x}\,dx
=
\frac{1-e^{-i\xi}}{i\xi}.
$

従って

$
\xi\widehat f(\xi)
=
\frac{1-e^{-i\xi}}i.
$

その絶対値二乗は

$
|1-e^{-i\xi}|^2
=
2-2\cos\xi
$

です。この関数は周期 $2\pi$ で、各周期上の積分は正の一定値です。従って

$
\int_{\mathbb R}
|\xi\widehat f(\xi)|^2\,d\xi
=
\infty.
$

QM5 の定義域表示から $f\notin D(P)$ です。

次に

$
g(x)=\frac1{(1+x^2)^{2/3}}
$

とします。無限遠では $g(x)\sim |x|^{-4/3}$ なので $g\in L^1\cap L^2$ です。

微分すると

$
g'(x)
=
-\frac{4x}{3(1+x^2)^{5/3}}.
$

これは無限遠で $|x|^{-7/3}$ のオーダーなので $g'\in L^1\cap L^2$ です。従って FOU3 の微分公式

$
\widehat{g'}(\xi)
=
i\xi\widehat g(\xi)
$

を使えます。

Plancherel により $\widehat{g'}\in L^2$ なので

$
\xi\widehat g(\xi)
=
\frac1i\widehat{g'}(\xi)
\in L^2.
$

よって QM5 の定義域表示から $g\in D(P)$ です。

一方

$
|xg(x)|^2
=
\frac{x^2}{(1+x^2)^{4/3}}
\sim
|x|^{-2/3}.
$

$\int_1^\infty x^{-2/3}\,dx$ は発散するので $xg\notin L^2$、従って $g\notin D(Q)$ です。

この二例から、$D(Q)$ と $D(P)$ は互いに包含しないことが分かります。
<!-- solution-end -->

### 問3　Schrödinger 表現の Weyl 関係

- Level: A

$$
(U(a)\psi)(x)=\psi(x-a),
\qquad
(V(b)\psi)(x)=e^{-ibx/\hbar}\psi(x)
$$

とする。全ての $\psi\in L^2(\mathbb R)$ に対して

$$
U(a)V(b)\psi
=
e^{iab/\hbar}V(b)U(a)\psi
$$

を示せ。

<!-- solution-start -->
### 詳細解答

左辺を直接計算します。

$$
\begin{aligned}
(U(a)V(b)\psi)(x)
&=
(V(b)\psi)(x-a)\\
&=
e^{-ib(x-a)/\hbar}\psi(x-a)\\
&=
e^{iab/\hbar}
e^{-ibx/\hbar}\psi(x-a).
\end{aligned}
$$

一方

$$
(V(b)U(a)\psi)(x)
=
e^{-ibx/\hbar}\psi(x-a).
$$

従って各 $x$ で

$$
(U(a)V(b)\psi)(x)
=
e^{iab/\hbar}
(V(b)U(a)\psi)(x).
$$

両辺は $L^2$ 関数として一致するので

$$
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a)
$$

です。
<!-- solution-end -->

### 問4　長方形を一周したときの中心位相

- Level: A

Weyl 関係から

$$
U(a)V(b)U(-a)V(-b)
=
e^{iab/\hbar}I
$$

を示せ。

<!-- solution-start -->
### 詳細解答

Weyl 関係

$$
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a)
$$

の右から $U(-a)V(-b)$ を掛けます。

$$
\begin{aligned}
U(a)V(b)U(-a)V(-b)
&=
e^{iab/\hbar}
V(b)U(a)U(-a)V(-b)\\
&=
e^{iab/\hbar}
V(b)IV(-b)\\
&=
e^{iab/\hbar}I.
\end{aligned}
$$

位置方向へ $a$、運動量方向へ $b$ 進み、逆向きに戻る操作は幾何学的には出発点へ戻ります。それでも作用素としては恒等作用素ではなく中心位相が残ります。この位相が非可換性を記録しています。
<!-- solution-end -->

### 問5　有界 CCR が不可能であることを再構成する

- Level: B

有界作用素 $A,B$ が $AB-BA=I$ を満たすと仮定する。

1. $[A,B^n]=nB^{n-1}$ を示せ。
2. $B$ が冪零ではないことを示せ。
3. ノルム評価から矛盾を導け。

<!-- solution-start -->
### 詳細解答

積の交換子公式

$$
[A,CD]=[A,C]D+C[A,D]
$$

を使います。

$n=1$ では仮定から

$$
[A,B]=I
$$

です。

$n$ で

$$
[A,B^n]=nB^{n-1}
$$

と仮定すると

$$
\begin{aligned}
[A,B^{n+1}]
&=
[A,B^nB]\\
&=
[A,B^n]B+B^n[A,B]\\
&=
nB^n+B^n\\
&=
(n+1)B^n.
\end{aligned}
$$

よって帰納法で

$$
[A,B^n]=nB^{n-1}
$$

です。

もし $B^m=0$ となる最小の $m$ が存在すれば

$$
0=[A,B^m]=mB^{m-1}
$$

となり $B^{m-1}=0$ です。これは最小性に反します。従って $B$ は冪零ではなく、全ての $n$ で $\|B^{n-1}\|>0$ です。

最後に

$$
\begin{aligned}
n\|B^{n-1}\|
&=
\|AB^n-B^nA\|\\
&\le
2\|A\|\,\|B^n\|\\
&\le
2\|A\|\,\|B\|\,\|B^{n-1}\|.
\end{aligned}
$$

正の $\|B^{n-1}\|$ で割ると

$$
n\le2\|A\|\,\|B\|
$$

です。しかし左辺は任意に大きくできます。矛盾です。

従って有界作用素では $AB-BA=I$ は実現できません。
<!-- solution-end -->

### 問6　Weyl 関係を微分する

- Level: B

Weyl 関係

$$
U(a)V(b)
=
e^{iab/\hbar}V(b)U(a)
$$

を満たし、

$$
U(a)=e^{-iaP/\hbar},
\qquad
V(b)=e^{-ibQ/\hbar}
$$

とする。必要な積と微分が定義される共通不変領域 $\mathcal D$ 上で

$$
[Q,P]\psi=i\hbar\psi
$$

を導け。

<!-- solution-start -->
### 詳細解答

まず $a=0$ で微分します。

$$
\left.\frac{d}{da}U(a)\phi\right|_{a=0}
=
-\frac{i}{\hbar}P\phi
$$

なので、

$$
-\frac{i}{\hbar}PV(b)\psi
=
\frac{ib}{\hbar}V(b)\psi
-
\frac{i}{\hbar}V(b)P\psi.
$$

$i\hbar$ を掛けると

$$
PV(b)\psi
=
V(b)P\psi-bV(b)\psi.
$$

従って

$$
V(b)^*PV(b)\psi
=
(P-bI)\psi.
$$

次に $b=0$ で微分します。

$$
\left.\frac{d}{db}V(b)\phi\right|_{b=0}
=
-\frac{i}{\hbar}Q\phi,
$$

$$
\left.\frac{d}{db}V(b)^*\phi\right|_{b=0}
=
\frac{i}{\hbar}Q\phi.
$$

積の微分から

$$
\begin{aligned}
\left.
\frac{d}{db}
V(b)^*PV(b)\psi
\right|_{b=0}
&=
\frac{i}{\hbar}QP\psi
-
\frac{i}{\hbar}PQ\psi\\
&=
\frac{i}{\hbar}[Q,P]\psi.
\end{aligned}
$$

右辺 $(P-bI)\psi$ の微分は $-\psi$ です。従って

$$
\frac{i}{\hbar}[Q,P]\psi=-\psi.
$$

よって

$$
[Q,P]\psi=i\hbar\psi.
$$

微分を行うために共通不変領域が必要だったことが、CCR の定義域問題そのものです。
<!-- solution-end -->

### 問7　Weyl 作用素の有限線形結合は代数を作る

- Level: B

$$
\mathcal A_0
=
\operatorname{span}
\{U(a)V(b):a,b\in\mathbb R\}
$$

とする。

1. 二つの Weyl 作用素の積を一つの Weyl 作用素と位相因子の積に直せ。
2. $(U(a)V(b))^*$ も同じ形に直せ。
3. $\mathcal A_0$ が積と随伴で閉じることを示せ。

<!-- solution-start -->
### 詳細解答

Weyl 関係から

$$
V(b)U(a')
=
e^{-ia'b/\hbar}U(a')V(b)
$$

です。従って

$$
\begin{aligned}
U(a)V(b)U(a')V(b')
&=
e^{-ia'b/\hbar}
U(a)U(a')V(b)V(b')\\
&=
e^{-ia'b/\hbar}
U(a+a')V(b+b').
\end{aligned}
$$

よって二つの生成元の積は、位相因子を除けば再び同じ形です。

随伴については

$$
(U(a)V(b))^*
=
V(-b)U(-a).
$$

Weyl 関係を使って順序を戻すと

$$
V(-b)U(-a)
=
e^{-iab/\hbar}U(-a)V(-b).
$$

従って生成元の随伴も位相因子を除けば同じ形です。

$\mathcal A_0$ の一般元は有限線形結合なので、分配法則を使えば積も有限線形結合になります。また随伴は係数を複素共役し、各生成元を上の式で同じ形へ戻せます。

従って $\mathcal A_0$ は積と随伴で閉じています。これが「二つの観測量」から「それらが生成する作用素代数」へ視点を上げる最初の具体例です。
<!-- solution-end -->

### 問8　位相空間上の平行移動と cocycle

- Level: C

Weyl 関係を満たす $U,V$ に対して

$$
W(a,b)
=
e^{-iab/(2\hbar)}U(a)V(b)
$$

と置く。

1. 次の積公式を示せ。
   $$
   W(a,b)W(a',b')
   =
   e^{i(ab'-a'b)/(2\hbar)}
   W(a+a',b+b').
   $$
2. 係数
   $$
   ab'-a'b
   $$
   が二つのベクトル $(a,b),(a',b')$ の向き付き面積を表すことを説明せよ。
3. なぜ $(a,b)\mapsto W(a,b)$ が通常の可換群 $\mathbb R^2$ の素直なユニタリ表現ではなく、中心位相を伴う表現になるのか説明せよ。

<!-- solution-start -->
### 詳細解答

定義から

$$
\begin{aligned}
W(a,b)W(a',b')
&=
e^{-i(ab+a'b')/(2\hbar)}
U(a)V(b)U(a')V(b').
\end{aligned}
$$

Weyl 関係を

$$
V(b)U(a')
=
e^{-ia'b/\hbar}U(a')V(b)
$$

の形で使うと

$$
\begin{aligned}
W(a,b)W(a',b')
&=
e^{-i(ab+a'b')/(2\hbar)}
e^{-ia'b/\hbar}\\
&\qquad\cdot
U(a+a')V(b+b').
\end{aligned}
$$

一方

$$
W(a+a',b+b')
=
e^{-i(a+a')(b+b')/(2\hbar)}
U(a+a')V(b+b').
$$

従って両者の位相差は

$$
\begin{aligned}
&-\frac{ab+a'b'}{2}
-a'b
+\frac{(a+a')(b+b')}{2}\\
&=
\frac{ab'-a'b}{2}.
\end{aligned}
$$

よって

$$
W(a,b)W(a',b')
=
e^{i(ab'-a'b)/(2\hbar)}
W(a+a',b+b').
$$

次に

$$
ab'-a'b
=
\det
\begin{pmatrix}
a&a'\\
b&b'
\end{pmatrix}
$$

です。これは平面内の二つのベクトルが張る平行四辺形の向き付き面積です。

もし $W$ が $\mathbb R^2$ の通常のユニタリ表現なら

$$
W(a,b)W(a',b')
=
W(a+a',b+b')
$$

でなければなりません。しかし実際には一般に

$$
e^{i(ab'-a'b)/(2\hbar)}
$$

という位相が残ります。

この位相はスカラー倍なので全ての作用素と可換です。したがって非可換性は「中心にある位相」として現れます。Weyl 関係は、位置と運動量の非可換性を、定義域を持つ微分作用素ではなく、全空間上のユニタリ作用素と中心位相で表現しているのです。
<!-- solution-end -->

---

## 11. 量子力学基礎 II の到達点

QM5 から本章までで、次の流れが閉じました。

$$
\text{非有界観測量}
\to
\text{自己共役性}
\to
\text{スペクトル定理}
\to
\text{Stone の定理}
\to
\text{Weyl 関係}
$$

ここで重要なのは、非有界作用素を捨てたわけではないことです。

- $Q,P,H$ は物理量の生成作用素として必要です。
- しかし積や交換子では定義域が本質になります。
- 指数化したユニタリ群なら全空間上で作用します。
- Weyl 関係は CCR を有限変換として安全に保持します。
- 複数の Weyl 作用素を扱うと、自然に「それらが生成する代数」を考える必要が出ます。

次の OA1 では、この最後の一歩を抽象化し、Banach 環・可逆元・スペクトルを一つの言葉で扱います。
