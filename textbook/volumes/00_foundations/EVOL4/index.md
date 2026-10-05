# EVOL4 抽象 Cauchy 問題・mild 解・Duhamel 公式

<!-- definition-example-audit: strict -->

EVOL2 では、生成作用素

$$
A:D(A)\subset X\to X
$$

から強連続半群

$$
(T(t))_{t\ge0}
$$

が生まれる条件を学びました。EVOL3 では、散逸性と range condition から縮小半群の生成性を判定しました。

ここまでで

$$
A
\longrightarrow
T(t)
$$

という「同次の時間発展」は作れるようになりました。

しかし実際の時間発展問題では、初期状態だけでなく外力も入ります。扱いたいのは

$$
u'(t)=Au(t)+f(t),
\qquad
u(0)=u_0.
$$

有限次元の線形方程式では

$$
u(t)
=
e^{tA}u_0
+
\int_0^t
e^{(t-s)A}f(s)\,ds
$$

と書けます。

無限次元でも同じ形を期待したくなりますが、一つ大きな違いがあります。生成作用素 $A$ は一般に非有界なので、

$$
u_0\in X
$$

であっても

$$
u_0\in D(A)
$$

とは限りません。

その場合、

$$
Au_0
$$

はそもそも定義できず、時刻 $0$ で微分方程式を classical な意味で読めません。

一方、半群は各時刻で有界作用素なので

$$
T(t)u_0
$$

は $u_0\in X$ だけで意味を持ちます。

本章の中心問いは

$$
\boxed{
\text{微分方程式としては読めない初期値を}
\quad
\text{半群の積分表示でどこまで扱えるか}
}
$$

です。

そのために

$$
\text{classical 解}
\to
\text{strong 解}
\to
\text{mild 解}
$$

という三段階を区別し、

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
$$

を「公式として置く」のではなく、

1. classical 解からどう導くか
2. $u_0\notin D(A)$ でもなぜ意味を持つか
3. どの条件を足せば微分方程式へ戻れるか

まで追います。

---

## 1. 符号規約を最初に固定する

GPDE10 では

$$
u_t+Bu=f
$$

に対して、形式的に

$$
S(t)=e^{-tB}
$$

と書き、

[GPDE10 の mild 解](../GPDE10/index.md#def-gpde10-mild-solution)

$$
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)f(s)\,ds
$$

を導入しました。

本系列 EVOL2 以降では、半群の生成作用素そのものを $A$ と書き、

$$
u'(t)=Au(t)+f(t)
$$

とします。

したがって GPDE10 の記号との対応は

$$
A=-B,
\qquad
T(t)=S(t)=e^{-tB}.
$$

です。

この符号の違いを曖昧にすると、拡散型方程式で散逸性の向きを逆にしてしまいます。

本章では一貫して

$$
\boxed{
u'=Au+f,
\qquad
A=\text{半群 }T(t)\text{ の生成作用素}
}
$$

を使います。

---

## 2. classical 解では $D(A)$ まで連続に追う

微分方程式を各時刻でそのまま読むには、

$$
Au(t)
$$

が各時刻で定義されなければなりません。

EVOL1 で学んだように、非有界作用素では $D(A)$ が作用素の一部です。したがって「$u$ が $X$ 値で連続」というだけでは足りません。

$D(A)$ にはグラフノルム

$$
\|x\|_{D(A)}
=
\|x\|_X+\|Ax\|_X
$$

を入れます。

<a id="def-evol4-classical-solution"></a>
<!-- formal-statement-start -->
### 定義（抽象 Cauchy 問題の classical 解）

$X$ を Banach 空間、$A:D(A)\subset X\to X$ を強連続半群の生成作用素、$T>0$ とする。

$$
u_0\in D(A),
\qquad
f\in C([0,T];X)
$$

とする。

関数

$$
u:[0,T]\to X
$$

が

$$
u\in C([0,T];D(A)),
\qquad
u\in C^1([0,T];X)
$$

を満たし、すべての $t\in[0,T]$ について

$$
u'(t)=Au(t)+f(t),
$$

$$
u(0)=u_0
$$

が $X$ の等式として成り立つとき、$u$ を抽象 Cauchy 問題の **classical 解**という。
<!-- formal-statement-end -->

ここで

$$
u\in C([0,T];D(A))
$$

はグラフノルムについての連続性です。

したがって

$$
u(t)
$$

だけでなく

$$
Au(t)
$$

も $X$ で連続です。

<!-- definition-example-start: def-evol4-classical-solution -->
### **定義の確認**：一次元の $u'=-2u+1$

$X=\mathbb R$ とし、

$$
Ax=-2x,
\qquad
D(A)=\mathbb R,
$$

$$
u_0=3,
\qquad
f(t)=1
$$

とします。

候補

$$
u(t)
=
\frac12
+
\frac52e^{-2t}
$$

を取ります。

まず

$$
u(0)
=
\frac12+\frac52
=
3
=
u_0.
$$

次に

$$
u'(t)
=
-5e^{-2t}.
$$

一方、

$$
Au(t)+f(t)
=
-2
\left(
\frac12+\frac52e^{-2t}
\right)
+1
=
-5e^{-2t}.
$$

従って

$$
u'(t)=Au(t)+f(t).
$$

有限次元では $D(A)=X$ なので定義域の問題が見えません。無限次元では、この条件が最初の障壁になります。
<!-- definition-example-end -->

---

## 3. strong 解では微分方程式を時間積分した形で読む

classical 解は使いやすい反面、時間方向の $C^1$ 正則性を要求します。

外力が $L^1$ にしか入らない場合、解は絶対連続でも $C^1$ とは限りません。

そこで微分方程式を

$$
u(t)-u_0
=
\int_0^t
\left(
Au(s)+f(s)
\right)\,ds
$$

という積分形で読みます。

この式なら、右辺が Bochner 積分として意味を持てばよいことになります。

<a id="def-evol4-strong-solution"></a>
<!-- formal-statement-start -->
### 定義（抽象 Cauchy 問題の strong 解）

$X$ を Banach 空間、$A:D(A)\subset X\to X$ を強連続半群の生成作用素とする。

$$
u_0\in X,
\qquad
f\in L^1(0,T;X)
$$

とする。

関数

$$
u\in C([0,T];X)
$$

が strong 解であるとは、

- ほとんどすべての $t\in(0,T)$ で $u(t)\in D(A)$
- $Au\in L^1(0,T;X)$
- すべての $t\in[0,T]$ について

$$
u(t)
=
u_0
+
\int_0^t
\left(
Au(s)+f(s)
\right)\,ds
$$

が成り立つ

ことをいう。
<!-- formal-statement-end -->

この定義では右辺が Bochner 積分なので、$u$ は $X$ 値絶対連続関数になります。

classical 解では $Au$ と $f$ が連続なので、時間積分すれば直ちに strong 解の条件を満たします。

したがって

$$
\boxed{
\text{classical}
\Longrightarrow
\text{strong}
}
$$

です。

<!-- definition-example-start: def-evol4-strong-solution -->
### **定義の確認**：strong だが classical でない最小例

$X=\mathbb R$、

$$
A=0,
\qquad
T(t)=I
$$

とします。

外力を

$$
f(t)
=
\begin{cases}
0,&0\le t<1/2,\\
1,&1/2\le t\le1
\end{cases}
$$

とし、

$$
u_0=0
$$

とします。

すると

$$
u(t)
=
\int_0^t f(s)\,ds
=
\begin{cases}
0,&0\le t\le1/2,\\
t-\frac12,&1/2<t\le1.
\end{cases}
$$

$u$ は連続で、

$$
Au=0\in L^1(0,1),
$$

さらに定義そのものから

$$
u(t)
=
u_0+\int_0^t(Au(s)+f(s))\,ds
$$

を満たします。

したがって $u$ は strong 解です。

しかし $t=1/2$ で左右の微分が一致しないので

$$
u\notin C^1([0,1]).
$$

従って classical 解ではありません。

この例で

$$
\text{classical}
\subsetneq
\text{strong}
$$

が実際に起こることが分かります。
<!-- definition-example-end -->

---

## 4. mild 解では $Au(t)$ を最初から要求しない

strong 解でも

$$
u(t)\in D(A)
$$

をほとんどすべての時刻で要求しました。

ところが、生成作用素の定義域に入らない初期値からでも半群軌道

$$
T(t)u_0
$$

は作れます。

GPDE10 の [mild 解](../GPDE10/index.md#def-gpde10-mild-solution)を本章の符号規約へ移すと、

$$
\boxed{
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
}
$$

です。

この式の重要な点は、右辺に

$$
Au_0
$$

も

$$
Au(t)
$$

も現れないことです。

必要なのは

- $T(t)$ が $X$ 上の有界作用素
- $u_0\in X$
- $f$ が時間積分できる

という条件です。

### 粗い初期値でも半群軌道は存在する

EVOL2 の対角半群

$$
T(t)x
=
(e^{-nt}x_n)_{n\ge1}
$$

を $X=\ell^2(\mathbb N)$ 上で考えます。

生成作用素は

$$
Ax=(-nx_n),
$$

$$
D(A)
=
\left\{
x\in\ell^2:
(nx_n)\in\ell^2
\right\}.
$$

ここで

$$
u_0
=
\left(
\frac1n
\right)_{n\ge1}
$$

とします。

まず

$$
\sum_{n=1}^{\infty}
\frac1{n^2}
<
\infty
$$

なので

$$
u_0\in\ell^2.
$$

しかし

$$
(nu_{0,n})_{n\ge1}
=
(1,1,1,\ldots)
\notin\ell^2.
$$

従って

$$
u_0\notin D(A).
$$

外力を $f=0$ とすると mild 解は

$$
u(t)
=
T(t)u_0
=
\left(
\frac{e^{-nt}}n
\right)_{n\ge1}.
$$

これは $t=0$ を含めて $\ell^2$ で連続です。

一方、任意の $t>0$ では

$$
\sum_{n=1}^{\infty}
n^2
\left|
\frac{e^{-nt}}n
\right|^2
=
\sum_{n=1}^{\infty}e^{-2nt}
<
\infty.
$$

したがって

$$
u(t)\in D(A)
\qquad(t>0).
$$

この具体例では正の時刻で定義域へ入ります。

しかし

$$
u(0)=u_0\notin D(A)
$$

なので、本章の定義では $[0,T]$ 上の classical 解ではありません。

ここで起きた正の時刻での平滑化は、この対角半群の固有の性質です。一般の $C_0$ 半群が必ず同じ正則化を持つわけではありません。EVOL5 では analytic semigroup を導入し、この現象を一般の作用素評価として扱います。

---

## 5. Duhamel 公式は classical 解から導ける

mild 解の積分表示は、有限次元 ODE の公式を単に真似したものではありません。

classical 解が存在すると仮定すれば、半群則と生成作用素上の軌道微分から導けます。

<a id="thm-evol4-variation-of-constants"></a>
<!-- formal-statement-start -->
### 定理（classical 解の Duhamel 公式）

$X$ を Banach 空間、$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素とする。

$$
u_0\in D(A),
\qquad
f\in C([0,T];X)
$$

とし、$u$ を

$$
u'(t)=Au(t)+f(t),
\qquad
u(0)=u_0
$$

の classical 解とする。

このとき任意の $t\in[0,T]$ について

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

固定した $t$ に対し、

$$
s\longmapsto T(t-s)u(s)
$$

を考えます。

この式は「時刻 $s$ の状態 $u(s)$ を、残り時間 $t-s$ だけ同次発展させて時刻 $t$ へ運ぶ」量です。

これを $s$ で微分すると、

- $T(t-s)$ の微分から $-A$
- $u(s)$ の微分から $+A$

が現れ、二つが打ち消し合います。

残るのが外力だけです。

<!-- proof-start -->
### 証明

$t\in(0,T]$ を固定し、

$$
g(s)
=
T(t-s)u(s)
\qquad
(0\le s\le t)
$$

と置きます。

classical 解なので

$$
u(s)\in D(A)
$$

であり、

[EVOL2 の生成作用素上の軌道微分](../EVOL2/index.md#prop-evol2-orbit-differentiation)から

$$
\frac{d}{dr}T(r)u(s)
=
AT(r)u(s)
=
T(r)Au(s)
$$

です。

$r=t-s$ と置くので、

$$
\frac{d}{ds}T(t-s)u(s)
=
-AT(t-s)u(s)
+
T(t-s)u'(s).
$$

また

$$
AT(t-s)u(s)
=
T(t-s)Au(s).
$$

従って

$$
\begin{aligned}
g'(s)
&=
-T(t-s)Au(s)
+
T(t-s)u'(s)
\\
&=
T(t-s)
\left(
u'(s)-Au(s)
\right)
\\
&=
T(t-s)f(s).
\end{aligned}
$$

ここで $s=0$ と $s=t$ では

$$
g(0)=T(t)u_0,
$$

$$
g(t)=T(0)u(t)=u(t).
$$

したがって基本定理から

$$
g(t)-g(0)
=
\int_0^t g'(s)\,ds,
$$

すなわち

$$
u(t)-T(t)u_0
=
\int_0^t
T(t-s)f(s)\,ds.
$$

移項して

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds.
$$

これが本章でいう Duhamel 公式です。$\square$
<!-- proof-end -->

この証明で重要なのは、

$$
T(t-s)u(s)
$$

を選ぶことです。

単に $u$ を時間積分しても

$$
Au
$$

が残ります。

半群を掛けて「残り時間分だけ戻す」ことで $A$ の項が相殺され、外力だけを積分できる形になります。

---

## 6. $L^1$ 外力でも mild 解は連続に作れる

classical 解から Duhamel 公式を導くときは $f$ を連続としました。

mild 解ではもっと弱い

$$
f\in L^1(0,T;X)
$$

まで許せます。

強連続半群は有限時間区間で作用素ノルムが一様有界です。EVOL2 の閉性証明でも使った一様有界性原理から

$$
M_T
=
\sup_{0\le t\le T}
\|T(t)\|
<
\infty.
$$

これが Duhamel 積分を支えます。

<a id="prop-evol4-mild-continuity-stability"></a>
<!-- formal-statement-start -->
### 命題（mild 解の存在・連続性・安定性）

$X$ を Banach 空間、$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素とする。

$$
u_0\in X,
\qquad
f\in L^1(0,T;X)
$$

とする。

このとき

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
$$

で定めた $u$ は

$$
u\in C([0,T];X)
$$

である。

さらに、データ $(u_0,f)$ と $(v_0,g)$ から得られる mild 解をそれぞれ $u,v$ とすると、

$$
\sup_{0\le t\le T}
\|u(t)-v(t)\|
\le
M_T
\left(
\|u_0-v_0\|
+
\|f-g\|_{L^1(0,T;X)}
\right)
$$

が成り立つ。

特に同じ初期値と外力に対する mild 解は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

安定性は mild 解の積分表示から直接ノルム評価します。

連続性は

$$
F(t)
=
\int_0^tT(t-s)f(s)\,ds
$$

について、$F(t+h)-F(t)$ を

1. 既存区間 $[0,t]$ での半群の変化
2. 新しく増えた短い区間 $[t,t+h]$

に分けます。

<!-- proof-start -->
### 証明

まず安定性を示します。

任意の $t\in[0,T]$ について

$$
\begin{aligned}
u(t)-v(t)
&=
T(t)(u_0-v_0)
\\
&\quad
+
\int_0^t
T(t-s)
\left(
f(s)-g(s)
\right)\,ds.
\end{aligned}
$$

従って

$$
\begin{aligned}
\|u(t)-v(t)\|
&\le
M_T\|u_0-v_0\|
\\
&\quad
+
M_T
\int_0^t
\|f(s)-g(s)\|\,ds
\\
&\le
M_T
\left(
\|u_0-v_0\|
+
\|f-g\|_{L^1(0,T;X)}
\right).
\end{aligned}
$$

$t$ の上限を取れば主張の評価を得ます。

同じデータなら右辺が 0 なので

$$
u=v.
$$

次に連続性を示します。

同次項

$$
T(t)u_0
$$

は強連続性から連続です。

従って

$$
F(t)
=
\int_0^t
T(t-s)f(s)\,ds
$$

だけを見ればよいです。

$h>0$ とし、$t+h\le T$ とします。

半群則から $0\le s\le t$ では

$$
T(t+h-s)
=
T(h)T(t-s).
$$

従って

$$
\begin{aligned}
F(t+h)-F(t)
&=
\int_0^t
\left(
T(h)-I
\right)
T(t-s)f(s)\,ds
\\
&\quad
+
\int_t^{t+h}
T(t+h-s)f(s)\,ds.
\end{aligned}
$$

第二項は

$$
\left\|
\int_t^{t+h}
T(t+h-s)f(s)\,ds
\right\|
\le
M_T
\int_t^{t+h}\|f(s)\|\,ds.
$$

$f\in L^1$ なので右辺は $h\downarrow0$ で 0 へ行きます。

第一項では、固定した $s$ に対し

$$
\left(
T(h)-I
\right)
T(t-s)f(s)
\to0
$$

です。

また $0<h\le T-t$ の範囲で

$$
\begin{aligned}
\|
(T(h)-I)T(t-s)f(s)
\|
&\le
\left(
\|T(h)\|+1
\right)
\|T(t-s)\|
\|f(s)\|
\\
&\le
(M_T+1)M_T\|f(s)\|.
\end{aligned}
$$

右辺は $s$ について可積分です。

従って Bochner 積分の優収束により第一項も 0 へ行きます。

左側からの連続性も同じ分解で示せるため

$$
F\in C([0,T];X).
$$

よって

$$
u\in C([0,T];X).
$$

$\square$
<!-- proof-end -->

この命題により、mild 解では

$$
u_0\in D(A)
$$

を要求せずに、初期値・外力に対する安定な時間発展を作れます。

---

## 7. strong 解は Duhamel 公式へ落ちる

strong 解は微分方程式を積分形で満たしますが、半群表示を仮定していません。

それでも生成作用素が同じなら、strong 解は自動的に mild 解になります。

<a id="prop-evol4-strong-implies-mild"></a>
<!-- formal-statement-start -->
### 命題（strong 解は mild 解）

$X$ を Banach 空間、$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素とする。

$$
u_0\in X,
\qquad
f\in L^1(0,T;X)
$$

とし、$u$ を

$$
u'=Au+f,
\qquad
u(0)=u_0
$$

の strong 解とする。

このとき任意の $t\in[0,T]$ について

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
$$

が成り立つ。

従って strong 解は mild 解である。
<!-- formal-statement-end -->

### 証明の見取り図

classical 解の証明と同じ

$$
T(t-s)u(s)
$$

を直接微分したくなりますが、strong 解では $u(s)$ が $D(A)$ に入るのはほとんどすべての時刻だけです。

そこで EVOL2 の「生成作用素の定義域を稠密化する短時間平均」を使います。

$$
J_hx
=
\frac1h
\int_0^h
T(r)x\,dr
\qquad(h>0)
$$

と置くと、任意の $x\in X$ について

$$
J_hx\in D(A),
$$

$$
AJ_hx
=
\frac{T(h)x-x}{h},
$$

さらに

$$
J_hx\to x
\qquad(h\downarrow0)
$$

です。

strong 解 $u$ を一度 $J_h$ で平滑化すると、軌道はすべての時刻で $D(A)$ に入り、生成作用素を安全に動かせます。その平滑化した問題で Duhamel 公式を導き、最後に $h\downarrow0$ とします。

<!-- proof-start -->
### 証明

EVOL2 の [生成作用素は閉かつ稠密定義](../EVOL2/index.md#thm-evol2-generator-closed-dense) の証明で使った短時間平均

$$
J_hx
=
\frac1h
\int_0^h
T(r)x\,dr
$$

を用います。

任意の $x\in X$ に対して

$$
J_hx\in D(A),
$$

$$
AJ_hx
=
\frac{T(h)x-x}{h},
$$

また強連続性から

$$
J_hx\to x
\qquad(h\downarrow0).
$$

さらに半群則から

$$
J_hT(t)=T(t)J_h.
$$

$x\in D(A)$ なら EVOL2 の軌道微分を積分して

$$
T(h)x-x
=
\int_0^hT(r)Ax\,dr
$$

なので

$$
AJ_hx
=
\frac1h
\int_0^hT(r)Ax\,dr
=
J_hAx.
$$

strong 解の積分等式

$$
u(t)
=
u_0
+
\int_0^t
\left(
Au(s)+f(s)
\right)\,ds
$$

へ $J_h$ を作用させます。

$$
u_h(t):=J_hu(t),
\qquad
f_h(t):=J_hf(t)
$$

と置くと、$J_h$ は有界線形作用素なので Bochner 積分の外へ出せて

$$
u_h(t)
=
J_hu_0
+
\int_0^t
\left(
J_hAu(s)+f_h(s)
\right)\,ds.
$$

ほとんどすべての $s$ で $u(s)\in D(A)$ だから

$$
J_hAu(s)
=
AJ_hu(s)
=
Au_h(s).
$$

従って

$$
u_h(t)
=
J_hu_0
+
\int_0^t
\left(
Au_h(s)+f_h(s)
\right)\,ds.
$$

ここで各時刻について

$$
u_h(t)\in D(A).
$$

さらに

$$
Au_h(t)
=
\frac{T(h)u(t)-u(t)}h.
$$

$u\in C([0,T];X)$ なので、右辺は $t$ の連続関数です。従って

$$
u_h\in C([0,T];D(A))
$$

がグラフノルムについて成り立ちます。

また上の積分等式から $u_h$ は絶対連続で、

$$
u_h'(s)
=
Au_h(s)+f_h(s)
$$

がほとんどすべての $s$ で成り立ちます。

$t\in(0,T]$ を固定し、

$$
w_h(s)
=
T(t-s)u_h(s)
\qquad(0\le s\le t)
$$

と置きます。

この $w_h$ が絶対連続であることを先に確認します。$0\le a<b\le t$ に対し半群則から

$$
\begin{aligned}
w_h(b)-w_h(a)
&=
T(t-b)
\left(
u_h(b)-T(b-a)u_h(a)
\right)
\\
&=
T(t-b)
\left[
u_h(b)-u_h(a)
-
\{T(b-a)u_h(a)-u_h(a)\}
\right].
\end{aligned}
$$

$[0,T]$ 上で

$$
M_T
=
\sup_{0\le r\le T}\|T(r)\|
<
\infty
$$

と置きます。

絶対連続性から

$$
\|u_h(b)-u_h(a)\|
\le
\int_a^b
\|u_h'(r)\|\,dr.
$$

また $u_h(a)\in D(A)$ なので軌道微分を積分して

$$
T(b-a)u_h(a)-u_h(a)
=
\int_0^{b-a}
T(r)Au_h(a)\,dr.
$$

従って

$$
\begin{aligned}
\|w_h(b)-w_h(a)\|
&\le
M_T
\int_a^b
\|u_h'(r)\|\,dr
\\
&\quad
+
M_T^2
(b-a)
\sup_{0\le r\le T}
\|Au_h(r)\|.
\end{aligned}
$$

右辺は、互いに素な小区間について足し合わせたときに区間長の総和と $L^1$ 積分で制御できます。したがって $w_h$ は絶対連続です。

$u_h$ が微分可能なほとんどすべての $s$ では、生成作用素上の軌道微分を使って

$$
\begin{aligned}
w_h'(s)
&=
-AT(t-s)u_h(s)
+
T(t-s)u_h'(s)
\\
&=
T(t-s)
\left(
u_h'(s)-Au_h(s)
\right)
\\
&=
T(t-s)f_h(s).
\end{aligned}
$$

絶対連続関数の基本定理により

$$
w_h(t)-w_h(0)
=
\int_0^t
T(t-s)f_h(s)\,ds.
$$

端点を代入すると

$$
u_h(t)
=
T(t)J_hu_0
+
\int_0^t
T(t-s)J_hf(s)\,ds.
$$

$J_h$ は $T(t)$ と可換し、有界線形作用素なので Bochner 積分の外へ出せます。従って

$$
u_h(t)
=
J_h
\left[
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
\right].
$$

左辺は

$$
u_h(t)=J_hu(t).
$$

任意の固定した $x\in X$ について

$$
J_hx\to x
$$

なので、$h\downarrow0$ とすると

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds.
$$

従って $u$ は mild 解です。$\square$
<!-- proof-end -->

以上から

$$
\boxed{
\text{classical}
\Longrightarrow
\text{strong}
\Longrightarrow
\text{mild}
}
$$

が得られます。

逆向きは追加の正則性なしには一般に成り立ちません。

---

## 8. mild 解から微分方程式へ戻るには何が必要か

mild 解は

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)f(s)\,ds
$$

だけで作れます。

しかしこれを微分したいとき、

$$
\frac{d}{dt}T(t)u_0
$$

を考えるには通常

$$
u_0\in D(A)
$$

が必要です。

さらに Duhamel 項の微分にも外力の正則性が要ります。

ここでは分かりやすい十分条件として

$$
u_0\in D(A),
\qquad
f\in C^1([0,T];X)
$$

を使います。

<a id="thm-evol4-mild-to-classical"></a>
<!-- formal-statement-start -->
### 定理（mild 解から classical 解への正則性回復）

$X$ を Banach 空間、$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素とする。

$$
u_0\in D(A),
\qquad
f\in C^1([0,T];X)
$$

とする。

mild 解

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
$$

は classical 解である。

すなわち

$$
u\in C([0,T];D(A))
\cap
C^1([0,T];X)
$$

であり、

$$
u'(t)=Au(t)+f(t)
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

同次項

$$
T(t)u_0
$$

は $u_0\in D(A)$ なので EVOL2 の軌道微分で処理できます。

難しいのは

$$
v(t)
=
\int_0^tT(t-s)f(s)\,ds
$$

です。

まず変数変換

$$
r=t-s
$$

で

$$
v(t)
=
\int_0^t
T(r)f(t-r)\,dr
$$

と書き、$f\in C^1$ を使って $v'(t)$ を先に求めます。

次に半群則から

$$
v(t+h)
=
T(h)v(t)
+
\int_t^{t+h}
T(t+h-s)f(s)\,ds
$$

を作ります。

これを差分商へ直すと、生成作用素の定義そのものから

$$
v(t)\in D(A)
$$

と

$$
Av(t)=v'(t)-f(t)
$$

が同時に得られます。

<!-- proof-start -->
### 証明

$$
v(t)
=
\int_0^t
T(t-s)f(s)\,ds
$$

と置きます。

変数変換

$$
r=t-s
$$

により

$$
v(t)
=
\int_0^t
T(r)f(t-r)\,dr.
$$

$f\in C^1([0,T];X)$ なので、有限時間区間での半群の局所有界性を使えば Bochner 積分を $t$ で微分できます。

上端の寄与は

$$
T(t)f(0)
$$

です。

積分内部の $t$ 微分は

$$
T(r)f'(t-r)
$$

なので

$$
v'(t)
=
T(t)f(0)
+
\int_0^t
T(r)f'(t-r)\,dr.
$$

右辺は $t$ に連続です。従って

$$
v\in C^1([0,T];X).
$$

次に $h>0$ とします。

Duhamel 積分を $[0,t]$ と $[t,t+h]$ に分けると

$$
\begin{aligned}
v(t+h)
&=
\int_0^t
T(t+h-s)f(s)\,ds
\\
&\quad
+
\int_t^{t+h}
T(t+h-s)f(s)\,ds.
\end{aligned}
$$

第1項で半群則を使うと

$$
\int_0^t
T(t+h-s)f(s)\,ds
=
T(h)v(t).
$$

従って

$$
v(t+h)
=
T(h)v(t)
+
\int_t^{t+h}
T(t+h-s)f(s)\,ds.
$$

移項して $h$ で割ると

$$
\begin{aligned}
\frac{T(h)v(t)-v(t)}h
&=
\frac{v(t+h)-v(t)}h
\\
&\quad
-
\frac1h
\int_t^{t+h}
T(t+h-s)f(s)\,ds.
\end{aligned}
$$

$h\downarrow0$ とします。

$v\in C^1$ なので第一項は

$$
v'(t)
$$

へ収束します。

第二項では区間の長さが $h$ で、$s\in[t,t+h]$ なら

$$
t+h-s\to0,
\qquad
f(s)\to f(t).
$$

強連続性から

$$
T(t+h-s)f(s)\to f(t)
$$

なので平均値は

$$
f(t)
$$

へ収束します。

よって

$$
\lim_{h\downarrow0}
\frac{T(h)v(t)-v(t)}h
=
v'(t)-f(t).
$$

[強連続半群の生成作用素の定義](../EVOL2/index.md#def-evol2-generator)から

$$
v(t)\in D(A),
$$

$$
Av(t)=v'(t)-f(t).
$$

従って

$$
v'(t)=Av(t)+f(t).
$$

さらに $v'$ と $f$ は連続なので

$$
Av=v'-f
$$

も連続です。

ここまでの差分商は $0\le t<T$ で使えます。$t=0$ では

$$
v(0)=0\in D(A),
$$

また

$$
v'(0)=f(0)
$$

なので

$$
Av(0)=0=v'(0)-f(0).
$$

終点 $t=T$ では $t_k\uparrow T$ となる列を取ります。$t_k<T$ では

$$
v(t_k)\in D(A),
$$

$$
Av(t_k)=v'(t_k)-f(t_k).
$$

$v$、$v'$、$f$ は連続なので

$$
v(t_k)\to v(T),
$$

$$
Av(t_k)
\to
v'(T)-f(T)
$$

が $X$ で成り立ちます。

生成作用素 $A$ は閉作用素なので

$$
v(T)\in D(A),
$$

$$
Av(T)=v'(T)-f(T).
$$

従ってすべての $t\in[0,T]$ で $v(t)\in D(A)$ です。

さらに

$$
Av=v'-f
$$

は連続なので、$v$ 自身の $X$ での連続性と合わせて

$$
v\in C([0,T];D(A))
$$

がグラフノルムについて成り立ちます。

一方、$u_0\in D(A)$ なので EVOL2 の軌道微分から

$$
t\longmapsto T(t)u_0
$$

は $D(A)$ に値を取り、

$$
\frac{d}{dt}T(t)u_0
=
AT(t)u_0
=
T(t)Au_0.
$$

右辺は強連続性から連続です。

したがって

$$
u(t)=T(t)u_0+v(t)
$$

は

$$
u\in C([0,T];D(A))
\cap
C^1([0,T];X)
$$

を満たします。

最後に

$$
\begin{aligned}
u'(t)
&=
AT(t)u_0+v'(t)
\\
&=
AT(t)u_0+Av(t)+f(t)
\\
&=
Au(t)+f(t).
\end{aligned}
$$

従って $u$ は classical 解です。$\square$
<!-- proof-end -->

この定理は十分条件です。

実際には $f$ の条件を弱められる場合があります。しかし本章の目的は最大一般性ではなく、

$$
\boxed{
\text{mild 解}
+
\text{追加正則性}
\Longrightarrow
\text{微分方程式へ戻れる}
}
$$

という仕組みを、差分商から再現できるようにすることです。

---

## 9. mild 解とエネルギー弱解は同じ言葉ではない

GPDE10 では Gelfand 三つ組

$$
V\hookrightarrow H\hookrightarrow V^*
$$

を使い、

$$
u\in L^2(0,T;V),
\qquad
u_t\in L^2(0,T;V^*)
$$

というエネルギー弱解を扱いました。

一方、本章の mild 解は

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)f(s)\,ds
$$

という半群表示で定義されます。

この二つは目的が違います。

| 解概念 | 何を先に持つか | 方程式を読む場所 |
|---|---|---|
| classical | $D(A)$ 値の正則な軌道 | $X$ の点ごとの等式 |
| strong | $Au$ が時間可積分な軌道 | $X$ の時間積分等式 |
| mild | 強連続半群 $T(t)$ | $X$ の Duhamel 積分表示 |
| エネルギー弱解 | $V\hookrightarrow H\hookrightarrow V^*$ と双線形形式 | $V^*$-$V$ 双対による弱形式 |

熱方程式のような線形放物型問題では、適切な作用素実現が $H$ 上で強連続半群を生成し、エネルギー弱解の一意性も分かれば、両者が同じ解を表すことがあります。

しかしその一致には、

1. 双線形形式から閉作用素を作る
2. その作用素が半群を生成することを示す
3. 弱解と半群解が同じ初期値・外力を満たすことを示す
4. 一意性を使う

という追加の理論が必要です。

したがって

$$
\boxed{
\text{mild}
=
\text{weak}
}
$$

と用語だけで同一視してはいけません。

本章ではそれぞれの解概念の役割を分け、具体的な一致定理は PDE 側の作用素実現に委ねます。

---

## 10. 対角半群で Duhamel 公式を成分ごとに読む

再び

$$
X=\ell^2(\mathbb N),
$$

$$
T(t)x=(e^{-nt}x_n),
$$

$$
Ax=(-nx_n)
$$

を考えます。

外力を

$$
g
=
\left(
\frac1n
\right)_{n\ge1}
\in\ell^2
$$

とし、

$$
f(t)=g,
\qquad
u_0=0
$$

とします。

mild 解は

$$
u(t)
=
\int_0^tT(t-s)g\,ds.
$$

第 $n$ 成分は

$$
\begin{aligned}
u_n(t)
&=
\int_0^t
e^{-n(t-s)}
\frac1n\,ds
\\
&=
\frac1n
\int_0^t
e^{-nr}\,dr
\\
&=
\frac{1-e^{-nt}}{n^2}.
\end{aligned}
$$

従って

$$
u(t)
=
\left(
\frac{1-e^{-nt}}{n^2}
\right)_{n\ge1}.
$$

ここで

$$
n u_n(t)
=
\frac{1-e^{-nt}}n.
$$

従って

$$
\sum_{n=1}^{\infty}
n^2|u_n(t)|^2
=
\sum_{n=1}^{\infty}
\frac{(1-e^{-nt})^2}{n^2}
<\infty.
$$

よって

$$
u(t)\in D(A).
$$

また

$$
Au(t)
=
\left(
-\frac{1-e^{-nt}}n
\right)_{n\ge1},
$$

$$
f(t)
=
\left(
\frac1n
\right)_{n\ge1}.
$$

従って

$$
Au(t)+f(t)
=
\left(
\frac{e^{-nt}}n
\right)_{n\ge1}.
$$

一方、

$$
u_n'(t)
=
\frac{e^{-nt}}n.
$$

よって

$$
u'(t)=Au(t)+f(t).
$$

この例では $f$ は定数関数なので $C^1$ であり、前節の[「mild 解から classical 解への正則性回復」](#thm-evol4-mild-to-classical)どおり classical 解まで戻っています。

Duhamel 公式を抽象記号のまま眺めるだけでなく、各モードで

$$
\text{外力}
\to
\text{残り時間の減衰}
\to
\text{時間積分}
$$

となっていることを確認できます。

---

## 11. どの仮定がどこで働いたか

| 仮定・道具 | 使う場所 | 役割 |
|---|---|---|
| $A$ が $C_0$ 半群の生成作用素 | 全節 | 同次時間発展 $T(t)$ を与える |
| $u_0\in D(A)$ | classical 解・正則性回復 | $T(t)u_0$ を生成作用素で微分できる |
| $f\in L^1(0,T;X)$ | mild 解 | Duhamel 積分を作る |
| 半群の局所有界性 | mild 連続性・各種極限 | 積分の支配関数を与える |
| 強連続性 | mild 連続性・差分商 | $T(h)x\to x$ を使う |
| $u(t)\in D(A)$ がほとんど至る所（almost everywhere; a.e.） | strong 解 | $Au(t)$ を $X$ 値として読む |
| $Au\in L^1$ | strong 解 | 微分方程式を時間積分できる |
| $f\in C^1$ | mild から classical | Duhamel 項を時間微分する |
| EVOL2 の軌道微分 | Duhamel 導出 | $A$ の二項を相殺する |
| GPDE10 の mild 解 | 本章の積分表示 | 解概念の canonical definition |

特に重要なのは、

$$
\boxed{
u_0\in X
\quad\text{と}\quad
u_0\in D(A)
}
$$

を混同しないことです。

mild 解は前者だけで始められます。

classical 解へ戻るには後者のような追加正則性が必要です。

---

## 12. 演習

### Level A

<a id="ex-evol4-a01"></a>
#### EVOL4-A01 一次元 Duhamel 公式
- Level: A

$X=\mathbb R$、

$$
Au=-2u,
\qquad
u_0=3,
\qquad
f(t)=1
$$

とする。

半群

$$
T(t)=e^{-2t}
$$

を使って mild 解を求め、直接

$$
u'(t)=-2u(t)+1
$$

を確認せよ。

<!-- solution-start -->
**詳細解答**

Duhamel 公式は

$$
u(t)
=
e^{-2t}u_0
+
\int_0^t
e^{-2(t-s)}f(s)\,ds.
$$

$u_0=3$、$f(s)=1$ を代入すると

$$
u(t)
=
3e^{-2t}
+
\int_0^t
e^{-2(t-s)}\,ds.
$$

$r=t-s$ と置けば

$$
\int_0^t
e^{-2(t-s)}\,ds
=
\int_0^t
e^{-2r}\,dr
=
\frac{1-e^{-2t}}2.
$$

従って

$$
u(t)
=
3e^{-2t}
+
\frac{1-e^{-2t}}2
=
\frac12+\frac52e^{-2t}.
$$

時間微分は

$$
u'(t)
=
-5e^{-2t}.
$$

一方、

$$
-2u(t)+1
=
-2
\left(
\frac12+\frac52e^{-2t}
\right)
+1
=
-5e^{-2t}.
$$

よって

$$
u'(t)=-2u(t)+1.
$$

また

$$
u(0)=3
$$

なので初期条件も満たします。
<!-- solution-end -->

<a id="ex-evol4-a02"></a>
#### EVOL4-A02 $u_0\in X$ だが $u_0\notin D(A)$
- Level: A

$X=\ell^2(\mathbb N)$、

$$
T(t)x=(e^{-nt}x_n),
$$

$$
Ax=(-nx_n),
$$

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\}
$$

とする。

$$
u_0=(1/n)_{n\ge1}
$$

について次を示せ。

1. $u_0\in X$。
2. $u_0\notin D(A)$。
3. $f=0$ の mild 解 $u(t)=T(t)u_0$ を書け。
4. 任意の $t>0$ で $u(t)\in D(A)$。
5. $u$ が $[0,T]$ 上の classical 解でない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

まず

$$
\|u_0\|_2^2
=
\sum_{n=1}^{\infty}\frac1{n^2}
<
\infty.
$$

従って

$$
u_0\in\ell^2.
$$

一方、

$$
nu_{0,n}=1
$$

なので

$$
\sum_{n=1}^{\infty}|nu_{0,n}|^2
=
\sum_{n=1}^{\infty}1
=
\infty.
$$

従って

$$
u_0\notin D(A).
$$

外力が 0 なので mild 解は

$$
u(t)
=
T(t)u_0
=
\left(
\frac{e^{-nt}}n
\right)_{n\ge1}.
$$

$t>0$ なら

$$
\sum_{n=1}^{\infty}
n^2|u_n(t)|^2
=
\sum_{n=1}^{\infty}
e^{-2nt}.
$$

これは比 $e^{-2t}<1$ の等比級数なので収束します。

したがって

$$
u(t)\in D(A)
\qquad(t>0).
$$

しかし classical 解の定義では

$$
u\in C([0,T];D(A))
$$

が必要です。

特に

$$
u(0)=u_0
$$

も $D(A)$ に入らなければなりません。

実際には

$$
u_0\notin D(A)
$$

なので、この mild 解は $[0,T]$ 上の classical 解ではありません。
<!-- solution-end -->

<a id="ex-evol4-a03"></a>
#### EVOL4-A03 strong だが classical でない解
- Level: A

$X=\mathbb R$、$A=0$、$u_0=0$ とし、

$$
f(t)
=
\begin{cases}
0,&0\le t<1/2,\\
1,&1/2\le t\le1
\end{cases}
$$

とする。

$$
u(t)=\int_0^t f(s)\,ds
$$

を具体的に書き、strong 解であることと classical 解でないことを確認せよ。

<!-- solution-start -->
**詳細解答**

$t\le1/2$ なら積分区間で $f=0$ なので

$$
u(t)=0.
$$

$t>1/2$ なら

$$
u(t)
=
\int_{1/2}^{t}1\,ds
=
t-\frac12.
$$

従って

$$
u(t)
=
\begin{cases}
0,&0\le t\le1/2,\\
t-\frac12,&1/2<t\le1.
\end{cases}
$$

$u$ は連続です。

また $A=0$ なので

$$
Au=0\in L^1(0,1).
$$

さらに

$$
u(t)
=
u_0+\int_0^t(Au(s)+f(s))\,ds
$$

は定義そのものから成り立ちます。

従って $u$ は strong 解です。

一方、$t=1/2$ の左側では傾きが 0、右側では傾きが 1 です。

したがって $u$ は $t=1/2$ で微分可能でなく、

$$
u\notin C^1([0,1]).
$$

よって classical 解ではありません。
<!-- solution-end -->

<a id="ex-evol4-a04"></a>
#### EVOL4-A04 mild 解の安定性評価
- Level: A

$A$ が強連続半群 $(T(t))$ を生成し、

$$
M_T
=
\sup_{0\le t\le T}\|T(t)\|
$$

とする。

同じ外力 $f$ に対し、初期値 $u_0,v_0$ から作った mild 解を $u,v$ とする。

$$
\sup_{0\le t\le T}
\|u(t)-v(t)\|
\le
M_T\|u_0-v_0\|
$$

を示せ。

<!-- solution-start -->
**詳細解答**

同じ外力なので Duhamel 項は差を取ると消えます。

したがって

$$
u(t)-v(t)
=
T(t)(u_0-v_0).
$$

作用素ノルムから

$$
\|u(t)-v(t)\|
\le
\|T(t)\|
\|u_0-v_0\|.
$$

$t\in[0,T]$ では

$$
\|T(t)\|\le M_T
$$

なので

$$
\|u(t)-v(t)\|
\le
M_T\|u_0-v_0\|.
$$

$t$ の上限を取って

$$
\sup_{0\le t\le T}
\|u(t)-v(t)\|
\le
M_T\|u_0-v_0\|.
$$
<!-- solution-end -->

<a id="ex-evol4-a05"></a>
#### EVOL4-A05 符号規約を翻訳する
- Level: A

正作用素 $B$ に対して

$$
u_t+Bu=f
$$

を考え、その同次半群を

$$
S(t)=e^{-tB}
$$

とする。

EVOL 系列の生成作用素記号 $A$ を使って

$$
u'=Au+f
$$

へ書き換えよ。

また Duhamel 公式を書け。

<!-- solution-start -->
**詳細解答**

$$
u_t+Bu=f
$$

を移項すると

$$
u_t=-Bu+f.
$$

従って EVOL 系列での生成作用素は

$$
A=-B.
$$

同次方程式

$$
u'=Au
$$

の半群は

$$
T(t)=e^{tA}=e^{-tB}=S(t).
$$

したがって Duhamel 公式は

$$
u(t)
=
e^{-tB}u_0
+
\int_0^t
e^{-(t-s)B}f(s)\,ds.
$$

つまり positive operator $B$ 自体ではなく

$$
-B
$$

が減衰半群の生成作用素です。
<!-- solution-end -->

### Level B

<a id="ex-evol4-b01"></a>
#### EVOL4-B01 classical 解から Duhamel 公式を導く
- Level: B

$A$ を強連続半群 $(T(t))$ の生成作用素とする。

classical 解

$$
u'(t)=Au(t)+f(t)
$$

に対し、固定した $t>0$ について

$$
g(s)=T(t-s)u(s)
$$

と置く。

$g'(s)$ を計算して Duhamel 公式を導け。

<!-- solution-start -->
**詳細解答**

classical 解なので

$$
u(s)\in D(A)
$$

であり、

$$
u'(s)=Au(s)+f(s).
$$

生成作用素上の軌道微分から

$$
\frac{d}{dr}T(r)u(s)
=
AT(r)u(s)
=
T(r)Au(s).
$$

$r=t-s$ なので

$$
\frac{d}{ds}T(t-s)u(s)
=
-AT(t-s)u(s)
+
T(t-s)u'(s).
$$

$A$ と $T(t-s)$ は $D(A)$ 上で可換なので

$$
AT(t-s)u(s)
=
T(t-s)Au(s).
$$

従って

$$
\begin{aligned}
g'(s)
&=
-T(t-s)Au(s)
+
T(t-s)u'(s)
\\
&=
T(t-s)
\left(
u'(s)-Au(s)
\right)
\\
&=
T(t-s)f(s).
\end{aligned}
$$

$0$ から $t$ まで積分すると

$$
g(t)-g(0)
=
\int_0^t
T(t-s)f(s)\,ds.
$$

端点は

$$
g(t)=T(0)u(t)=u(t),
$$

$$
g(0)=T(t)u_0.
$$

したがって

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds.
$$
<!-- solution-end -->

<a id="ex-evol4-b02"></a>
#### EVOL4-B02 対角半群と定常外力
- Level: B

$X=\ell^2(\mathbb N)$、

$$
T(t)x=(e^{-nt}x_n),
$$

$$
Ax=(-nx_n),
$$

$$
g=(1/n)_{n\ge1},
\qquad
u_0=0
$$

とする。

外力 $f(t)=g$ に対し、

1. mild 解の第 $n$ 成分を求めよ。
2. 任意の $t\ge0$ で $u(t)\in D(A)$ を示せ。
3. $u'(t)=Au(t)+g$ を成分ごとに確認せよ。
4. この解が classical 解であることを説明せよ。

<!-- solution-start -->
**詳細解答**

mild 解の積分表示から

$$
u(t)
=
\int_0^tT(t-s)g\,ds.
$$

第 $n$ 成分は

$$
u_n(t)
=
\int_0^t
e^{-n(t-s)}
\frac1n\,ds.
$$

$r=t-s$ と置くと

$$
u_n(t)
=
\frac1n
\int_0^t e^{-nr}\,dr
=
\frac{1-e^{-nt}}{n^2}.
$$

次に

$$
n^2|u_n(t)|^2
=
\frac{(1-e^{-nt})^2}{n^2}
\le
\frac1{n^2}.
$$

従って

$$
\sum_{n=1}^{\infty}
n^2|u_n(t)|^2
\le
\sum_{n=1}^{\infty}\frac1{n^2}
<
\infty.
$$

よって

$$
u(t)\in D(A).
$$

時間微分は

$$
u_n'(t)
=
\frac{e^{-nt}}n.
$$

一方、

$$
(Au(t))_n
=
-nu_n(t)
=
-\frac{1-e^{-nt}}n.
$$

したがって

$$
(Au(t)+g)_n
=
-\frac{1-e^{-nt}}n+\frac1n
=
\frac{e^{-nt}}n
=
u_n'(t).
$$

よって

$$
u'(t)=Au(t)+g.
$$

最後に $g$ は $X$ の定数値関数なので

$$
f\in C^1([0,T];X).
$$

また

$$
u_0=0\in D(A).
$$

従って[「mild 解から classical 解への正則性回復」](#thm-evol4-mild-to-classical)から $u$ は classical 解です。

成分計算からも $u'(t)$ と $Au(t)$ が $X$ で連続であることを確認できます。
<!-- solution-end -->

<a id="ex-evol4-b03"></a>
#### EVOL4-B03 Duhamel 項が $D(A)$ に入る仕組み
- Level: B

$f\in C^1([0,T];X)$ とし、

$$
v(t)
=
\int_0^tT(t-s)f(s)\,ds
$$

と置く。

1. 変数変換により
   $$
   v(t)
   =
   \int_0^tT(r)f(t-r)\,dr
   $$
   と書け。
2. 
   $$
   v'(t)
   =
   T(t)f(0)
   +
   \int_0^tT(r)f'(t-r)\,dr
   $$
   を導け。
3. 半群則から
   $$
   v(t+h)
   =
   T(h)v(t)
   +
   \int_t^{t+h}T(t+h-s)f(s)\,ds
   $$
   を示せ。
4. 生成作用素の定義を使って
   $$
   v(t)\in D(A),
   \qquad
   Av(t)=v'(t)-f(t)
   $$
   を示せ。

<!-- solution-start -->
**詳細解答**

最初の式で

$$
r=t-s
$$

と置きます。

$s=0$ で $r=t$、$s=t$ で $r=0$ なので積分向きが反転し、

$$
v(t)
=
\int_0^tT(r)f(t-r)\,dr.
$$

$f\in C^1$ なので、上端の微分と被積分関数の微分を分けると

$$
v'(t)
=
T(t)f(0)
+
\int_0^t
T(r)f'(t-r)\,dr.
$$

次に

$$
v(t+h)
=
\int_0^{t+h}
T(t+h-s)f(s)\,ds.
$$

積分を分けて

$$
\begin{aligned}
v(t+h)
&=
\int_0^t
T(t+h-s)f(s)\,ds
\\
&\quad
+
\int_t^{t+h}
T(t+h-s)f(s)\,ds.
\end{aligned}
$$

$0\le s\le t$ では半群則により

$$
T(t+h-s)
=
T(h)T(t-s).
$$

従って第一項は

$$
T(h)
\int_0^tT(t-s)f(s)\,ds
=
T(h)v(t).
$$

よって

$$
v(t+h)
=
T(h)v(t)
+
\int_t^{t+h}T(t+h-s)f(s)\,ds.
$$

移項して $h$ で割ると

$$
\begin{aligned}
\frac{T(h)v(t)-v(t)}h
&=
\frac{v(t+h)-v(t)}h
\\
&\quad
-
\frac1h
\int_t^{t+h}
T(t+h-s)f(s)\,ds.
\end{aligned}
$$

$h\downarrow0$ で第一項は

$$
v'(t)
$$

へ収束します。

第二項の被積分関数は短い区間上で

$$
T(t+h-s)f(s)\to f(t)
$$

なので、その平均は

$$
f(t)
$$

へ収束します。

従って

$$
\lim_{h\downarrow0}
\frac{T(h)v(t)-v(t)}h
=
v'(t)-f(t).
$$

この差分商の議論から、まず $0\le t<T$ で

$$
v(t)\in D(A),
$$

$$
Av(t)=v'(t)-f(t)
$$

を得ます。

$t=T$ では $t_k\uparrow T$ と取ると

$$
v(t_k)\to v(T),
$$

$$
Av(t_k)
=
v'(t_k)-f(t_k)
\to
v'(T)-f(T).
$$

生成作用素は閉作用素なので

$$
v(T)\in D(A),
$$

$$
Av(T)=v'(T)-f(T).
$$

したがって全区間で主張が成り立ちます。
<!-- solution-end -->

<a id="ex-evol4-b04"></a>
#### EVOL4-B04 mild 解とエネルギー弱解を区別する
- Level: B

GPDE10 のエネルギー弱解と本章の mild 解について、次をそれぞれ答えよ。

1. どの空間構造を先に仮定するか。
2. 方程式をどの意味で満たすか。
3. 一般に同じ解概念と即断できない理由は何か。
4. 熱方程式で両者を一致させるために追加で何を示す必要があるか。

<!-- solution-start -->
**詳細解答**

エネルギー弱解では

$$
V\hookrightarrow H\hookrightarrow V^*
$$

という Gelfand 三つ組と、有界・強圧的な双線形形式などを先に持ちます。

方程式は

$$
\langle u_t,v\rangle_{V^*,V}
+
a(u,v)
=
\langle f,v\rangle
$$

のようにテスト関数 $v\in V$ に対する弱形式として読みます。

一方 mild 解では、Banach 空間または Hilbert 空間 $X$ 上の強連続半群

$$
T(t)
$$

を先に持ち、

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)f(s)\,ds
$$

という時間積分表示で解を定めます。

したがって前提にしている構造が異なります。

エネルギー弱解では $Au$ が $H$ に入らず $V^*$ にしか入らない場合も扱えます。

mild 解では、作用素の生成する半群が既に構成されている必要があります。

熱方程式で両者を一致させるには、少なくとも

- 双線形形式から対応する閉作用素を作る
- その作用素が $H$ 上の強連続半群を生成することを示す
- 半群解が弱形式を満たすことを示す
- エネルギー弱解側の一意性を使う

という橋渡しが必要です。

用語だけから

$$
\text{mild}=\text{weak}
$$

とは言えません。
<!-- solution-end -->

### Level C

<a id="ex-evol4-c01"></a>
#### EVOL4-C01 粗い初期値・外力・strong 解までを一つにつなぐ
- Level: C

$X=\ell^2(\mathbb N)$ とし、

$$
T(t)x=(e^{-nt}x_n),
$$

$$
Ax=(-nx_n),
$$

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\}.
$$

初期値と外力を

$$
u_0
=
\left(
\frac1n
\right)_{n\ge1},
$$

$$
f(t)
=
g
=
\left(
\frac1n
\right)_{n\ge1}
$$

とする。

次を示せ。

1. $u_0,g\in X$ だが $u_0\notin D(A)$。
2. mild 解を成分表示せよ。
3. 任意の $t>0$ で $u(t)\in D(A)$ を示せ。
4. $Au\in L^1(0,T;X)$ を示せ。
5. この mild 解が strong 解であることを示せ。
6. $[0,T]$ 上の classical 解ではない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

まず

$$
\sum_{n=1}^{\infty}\frac1{n^2}<\infty
$$

なので

$$
u_0,g\in\ell^2.
$$

一方、

$$
nu_{0,n}=1
$$

なので

$$
u_0\notin D(A).
$$

mild 解の積分表示から

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)g\,ds.
$$

第 $n$ 成分は

$$
u_n(t)
=
\frac{e^{-nt}}n
+
\int_0^t
e^{-n(t-s)}
\frac1n\,ds.
$$

積分は

$$
\int_0^t
e^{-n(t-s)}
\frac1n\,ds
=
\frac{1-e^{-nt}}{n^2}.
$$

したがって

$$
\boxed{
u_n(t)
=
\frac{e^{-nt}}n
+
\frac{1-e^{-nt}}{n^2}
}
$$

です。

次に $t>0$ を固定します。

$$
nu_n(t)
=
e^{-nt}
+
\frac{1-e^{-nt}}n.
$$

よって

$$
|nu_n(t)|^2
\le
2e^{-2nt}
+
\frac{2}{n^2}.
$$

右辺を $n$ について和を取ると

$$
2\sum_{n=1}^{\infty}e^{-2nt}
+
2\sum_{n=1}^{\infty}\frac1{n^2}
<
\infty.
$$

したがって

$$
u(t)\in D(A)
\qquad(t>0).
$$

次に $Au$ の時間可積分性を調べます。

$$
(Au(t))_n
=
-nu_n(t)
=
-e^{-nt}
-
\frac{1-e^{-nt}}n.
$$

三角不等式から

$$
\|Au(t)\|_2
\le
\left(
\sum_{n=1}^{\infty}e^{-2nt}
\right)^{1/2}
+
\left(
\sum_{n=1}^{\infty}
\frac{(1-e^{-nt})^2}{n^2}
\right)^{1/2}.
$$

第二項は

$$
\left(
\sum_{n=1}^{\infty}\frac1{n^2}
\right)^{1/2}
$$

で一様に抑えられます。

第一項は等比級数なので

$$
\sum_{n=1}^{\infty}e^{-2nt}
=
\frac{e^{-2t}}{1-e^{-2t}}
=
\frac1{e^{2t}-1}.
$$

$0<t\le T$ で $t$ が小さいとき

$$
e^{2t}-1\ge2t
$$

なので

$$
\left(
\sum_{n=1}^{\infty}e^{-2nt}
\right)^{1/2}
\le
\frac1{\sqrt{2t}}.
$$

従って

$$
\|Au(t)\|_2
\le
\frac1{\sqrt{2t}}
+
C
$$

と評価できます。

ここで

$$
\int_0^T t^{-1/2}\,dt
=
2\sqrt T
<
\infty.
$$

したがって

$$
Au\in L^1(0,T;\ell^2).
$$

次に strong 解の積分等式を確認します。

第 $n$ 成分を微分すると

$$
u_n'(t)
=
-e^{-nt}
+
\frac{e^{-nt}}n.
$$

一方、

$$
(Au(t)+g)_n
=
-e^{-nt}
-
\frac{1-e^{-nt}}n
+
\frac1n
=
-e^{-nt}
+
\frac{e^{-nt}}n.
$$

従って

$$
u_n'(t)
=
(Au(t)+g)_n.
$$

上で

$$
Au\in L^1(0,T;X),
\qquad
g\in L^1(0,T;X)
$$

を示しているので、Bochner 積分

$$
\int_0^t
(Au(s)+g)\,ds
$$

は $X$ の元として存在します。

この積分の第 $n$ 成分は、連続な座標汎関数を積分の外へ出して

$$
\int_0^t
\left(
(Au(s))_n+g_n
\right)\,ds
=
\int_0^t u_n'(s)\,ds
=
u_n(t)-u_{0,n}.
$$

したがって両辺は全ての座標で一致し、

$$
u(t)-u_0
=
\int_0^t
(Au(s)+g)\,ds
$$

が $X=\ell^2$ の等式として成り立ちます。

また $u$ は mild 解として $C([0,T];X)$ に入ります。

従って $u$ は strong 解です。

最後に classical 解なら

$$
u\in C([0,T];D(A))
$$

が必要なので

$$
u(0)=u_0\in D(A)
$$

でなければなりません。

しかし既に

$$
u_0\notin D(A)
$$

を示しました。

従ってこの解は strong ですが、$[0,T]$ 上の classical 解ではありません。

この問題では

$$
\boxed{
\text{mild}
\Longleftarrow
\text{strong}
\quad\text{だが}\quad
\text{classical ではない}
}
$$

という階層を一つの具体例で確認できました。
<!-- solution-end -->

---

## 13. 次章への橋

本章では

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)f(s)\,ds
$$

という積分表示によって、初期値が $D(A)$ に入らない場合でも時間発展を作れることを学びました。

ただし一般の $C_0$ 半群について言えるのは、基本的には

$$
u(t)\in X
$$

までです。

対角半群の例では $t>0$ で

$$
u(t)\in D(A)
$$

へ入りましたが、これは追加の平滑化構造を持っていたからです。

次の EVOL5 では、analytic semigroup と sectorial operator を導入し、

$$
\|A^\alpha T(t)\|
\le
C_\alpha t^{-\alpha}
$$

型の評価を使って

$$
\boxed{
\text{正の時間が正則性を生む}
}
$$

ことを作用素論として整理します。

EVOL4 で得た Duhamel 公式は、その平滑化を非斉次問題や半線形問題へ運ぶための土台になります。
