# MT5 標準測度論 VI：Radon 測度・Riesz–Markov

この章では、局所コンパクト Hausdorff 空間 $X$ 上で

$$
\text{正線形汎関数 }L:C_c(X)\to\mathbb R
$$

から Borel 測度を実際に構成し、

$$
\boxed{L(f)=\int_X f\,d\mu}
$$

を証明します。

Riesz–Markov の名前を掲げて終わるのではなく、

```text
LCH compact-open cutoff
        ↓
open U に m(U)=sup L(f) を定義
        ↓
open set 上の有限加法性・可算劣加法性
        ↓
compact K の内容 m_K と open-inner regularity
        ↓
外測度 μ*
        ↓
open set の Caratheodory 可測性 → Borel 測度 μ
        ↓
compact-finite / inner regular / outer regular
        ↓
L(f)=∫f dμ
        ↓
open set 上の一致から一意性
```

を一段ずつ閉じます。

位相的な唯一の新しい道具は [TOP5 補遺：局所コンパクト Hausdorff 空間の縮小と cutoff](../TOP5/lch-cutoff.md) に正本化しました。したがって本章では Urysohn 補題、partition of unity、one-point compactification を暗黙に使いません。

また Hahn–Banach、Banach 双対、Jordan 分解された汎関数も使いません。まず **正汎関数版**だけを完全に証明します。

---

## 1. $C_c(X)$ と Radon 測度

$X$ は以下、局所コンパクト Hausdorff 空間とします。

<a id="def-mt5-cc"></a>
<!-- formal-statement-start -->
### 定義（$C_c(X)$）

$$
C_c(X)
:=
\{f:X\to\mathbb R:\ f\text{ continuous},\ \operatorname{supp}f\text{ compact}\},
$$

ただし

$$
\operatorname{supp}f
:=
\overline{\{x\in X:f(x)\ne0\}}.
$$
<!-- formal-statement-end -->

$a,b\in\mathbb R$ と $f,g\in C_c(X)$ に対し

$$
\operatorname{supp}(af+bg)
\subseteq
\operatorname{supp}f\cup\operatorname{supp}g,
$$

右辺は compact 集合の有限合併なので compact です。従って $C_c(X)$ は実ベクトル空間です。

<a id="def-mt5-radon"></a>
<!-- formal-statement-start -->
### 定義（本章での Radon 測度）

$X$ の Borel $\sigma$-代数上の測度 $\mu$ が **Radon 測度**であるとは、次の三条件を満たすことをいう。

1. **compact-finite**：任意の compact 集合 $K\subseteq X$ に対し
   $$
   \boxed{\mu(K)<\infty.}
   $$

2. **open set 上の内正則性**：任意の open $U\subseteq X$ に対し
   $$
   \boxed{
   \mu(U)
   =
   \sup\{\mu(K):K\subseteq U,\ K\text{ compact}\}.}
   $$

3. **Borel set 上の外正則性**：任意の Borel 集合 $A\subseteq X$ に対し
   $$
   \boxed{
   \mu(A)
   =
   \inf\{\mu(U):A\subseteq U,\ U\text{ open}\}.}
   $$
<!-- formal-statement-end -->

文献によって「Radon」「regular Borel measure」の規約は少し異なります。本章では、任意の局所コンパクト Hausdorff 空間で Riesz–Markov を余計な可算性仮定なしに述べるため、**compact-finite + open-inner regular + Borel-outer regular** を定義として固定します。「全ての Borel 集合について内正則」とは定義していません。

---

## 2. 正線形汎関数と局所的な有界性

<a id="def-mt5-positive-functional"></a>
<!-- formal-statement-start -->
### 定義（正線形汎関数）

線形写像

$$
L:C_c(X)\to\mathbb R
$$

が **正**であるとは

$$
f\ge0
\quad\Longrightarrow\quad
L(f)\ge0
$$

が全ての $f\in C_c(X)$ について成り立つことをいう。
<!-- formal-statement-end -->

正性から単調性が直ちに従います。$f\le g$ なら $g-f\ge0$ なので

$$
L(g)-L(f)=L(g-f)\ge0,
$$

従って

$$
\boxed{f\le g\Longrightarrow L(f)\le L(g).}
$$

ここでは $L$ のノルムや Banach 空間としての双対を仮定しません。それでも compact support を固定すれば、cutoff により必要な有界性が出ます。

<a id="lem-mt5-local-order-bound"></a>
<!-- formal-statement-start -->
### 補題（正性から得られる局所 order bound）

$K\subseteq X$ を compact とする。$K$ のある開近傍上で $\chi=1$ となる

$$
\chi\in C_c(X),
\qquad0\le\chi\le1
$$

を一つ取る。このとき $h\in C_c(X)$ が $\operatorname{supp}h\subseteq K$ を満たせば

$$
\boxed{
|L(h)|
\le
\|h\|_\infty L(\chi).}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$M=\|h\|_\infty$ と置きます。$K$ 上では $\chi=1$ なので

$$
-M\chi\le h\le M\chi.
$$

$K$ の外では $h=0$ であり $\chi\ge0$ なので、同じ不等式は全 $X$ 上で成立します。$L$ の単調性から

$$
-ML(\chi)
\le
L(h)
\le
ML(\chi).
$$

よって $|L(h)|\le ML(\chi)$ です。$\square$
<!-- proof-end -->

これは「$L$ は $C_c(X)$ 上で有界」という主張ではありません。**support を一つの compact 集合に閉じ込めたときだけ**一様ノルム評価が出る、という局所的な主張です。

---

## 3. open set から候補測度を作る

記号を短くするため、open $U\subseteq X$ に対して

$$
f\prec U
$$

を

$$
f\in C_c(X),
\qquad
0\le f\le1,
\qquad
\operatorname{supp}f\subseteq U
$$

の略記とします。

<a id="def-mt5-open-content"></a>
<!-- formal-statement-start -->
### 定義（open set 上の content）

open $U\subseteq X$ に対し

$$
\boxed{
m(U)
:=
\sup\{L(f):f\prec U\}
\in[0,\infty]}
$$

と定める。
<!-- formal-statement-end -->

$f=0$ は常に候補なので集合は空ではありません。定義から

$$
m(\varnothing)=0,
$$

また $U\subseteq V$ なら候補集合も包含するので

$$
\boxed{m(U)\le m(V).}
$$

---

## 4. 有限 open cover に従属する有限分解

open set の可算劣加法性を証明するには、compact support を有限個の open set へ分解する必要があります。一般の partition of unity は使いません。TOP5 の cutoff を有限回掛け合わせるだけで十分です。

<a id="lem-mt5-finite-cutoff-partition"></a>
<!-- formal-statement-start -->
### 補題（compact 集合上の有限 cutoff partition）

$K\subseteq X$ を compact とし

$$
K\subseteq U_1\cup\cdots\cup U_r
$$

を有限 open cover とする。このとき $h_1,\ldots,h_r\in C_c(X)$ が存在して

$$
0\le h_j\le1,
\qquad
\operatorname{supp}h_j\subseteq U_j,
$$

かつ

$$
\boxed{
\sum_{j=1}^r h_j=1
\quad\text{on }K.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $x\in K$ について $x\in U_{j(x)}$ となる添字 $j(x)$ を一つ選びます。TOP5 の compact-open cutoff を singleton $\{x\}\subset U_{j(x)}$ に適用し、

$$
0\le c_x\le1,
\qquad
c_x=1\text{ on some open }N_x\ni x,
\qquad
\operatorname{supp}c_x\subseteq U_{j(x)}
$$

となる $c_x\in C_c(X)$ を取ります。

$(N_x)_{x\in K}$ は $K$ の開被覆なので、compact 性から有限個 $x_1,\ldots,x_s$ で覆えます。同じ $U_j$ に割り当てられた cutoff をまとめて

$$
g_j
:=
1-
\prod_{i:j(x_i)=j}(1-c_{x_i})
$$

と置きます。該当する $i$ が無いときは $g_j=0$ とします。すると

$$
0\le g_j\le1,
\qquad
\operatorname{supp}g_j\subseteq U_j,
$$

かつ $N_{x_i}$ 上では対応する $g_{j(x_i)}=1$ です。従って各 $x\in K$ で少なくとも一つの $g_j(x)=1$ です。

次に

$$
h_1=g_1,
\qquad
h_j=g_j\prod_{i<j}(1-g_i)
\quad(j\ge2)
$$

と定めます。各 $h_j$ は $C_c(X)$ に属し、$0\le h_j\le1$、かつ $\operatorname{supp}h_j\subseteq\operatorname{supp}g_j\subseteq U_j$ です。

有限積の恒等式

$$
\sum_{j=1}^r h_j
=
1-\prod_{j=1}^r(1-g_j)
$$

が成り立ちます。$x\in K$ では少なくとも一つの $g_j(x)=1$ なので右辺は1です。$\square$
<!-- proof-end -->

この補題は一般の partition of unity より弱いですが、Riesz–Markov の構成にはこれで足ります。

---

## 5. $m$ の可算劣加法性と有限加法性

<a id="lem-mt5-open-subadditivity"></a>
<!-- formal-statement-start -->
### 補題（open set 上の可算劣加法性）

open sets $U,U_1,U_2,\ldots$ が

$$
U\subseteq\bigcup_{n=1}^\infty U_n
$$

を満たすなら

$$
\boxed{
m(U)
\le
\sum_{n=1}^\infty m(U_n).}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\prec U$ を任意に取ります。$K=\operatorname{supp}f$ は compact で

$$
K\subseteq\bigcup_{n=1}^\infty U_n.
$$

compact 性から有限部分被覆を取り、重複する添字を除いて

$$
K\subseteq U_{n_1}\cup\cdots\cup U_{n_r}
$$

とします。有限 cutoff partition により

$$
0\le h_j\le1,
\quad
\operatorname{supp}h_j\subseteq U_{n_j},
\quad
\sum_{j=1}^rh_j=1\text{ on }K
$$

を満たす $h_j$ が取れます。

$f=0$ は $K$ の外で成り立つので、全 $X$ 上で

$$
f=\sum_{j=1}^rfh_j.
$$

各 $fh_j$ は

$$
0\le fh_j\le1,
\qquad
\operatorname{supp}(fh_j)\subseteq U_{n_j}
$$

だから $fh_j\prec U_{n_j}$ です。従って

$$
L(f)
=
\sum_{j=1}^rL(fh_j)
\le
\sum_{j=1}^rm(U_{n_j})
\le
\sum_{n=1}^\infty m(U_n).
$$

$f\prec U$ について上限を取れば結論を得ます。$\square$
<!-- proof-end -->

<a id="lem-mt5-open-additivity"></a>
<!-- formal-statement-start -->
### 補題（互いに素な open sets 上の有限加法性）

open $U,V$ が $U\cap V=\varnothing$ を満たすなら

$$
\boxed{m(U\cup V)=m(U)+m(V).}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $f\prec U$, $g\prec V$ とします。support は互いに素なので任意の点で高々一方しか非零にならず、

$$
0\le f+g\le1,
\qquad
\operatorname{supp}(f+g)
\subseteq U\cup V.
$$

従って $f+g\prec U\cup V$ で

$$
m(U\cup V)
\ge
L(f+g)=L(f)+L(g).
$$

$f,g$ について独立に上限を取れば

$$
m(U\cup V)\ge m(U)+m(V).
$$

逆向きを示します。$h\prec U\cup V$ とし $K=\operatorname{supp}h$ と置きます。

$$
K_U:=K\cap U,
\qquad
K_V:=K\cap V
$$

とします。$K\subseteq U\cup V$ かつ $U\cap V=\varnothing$ なので、$K_U,K_V$ は互いに補集合となる clopen subset of $K$、従って compact です。

TOP5 の cutoff により $\chi_U,\chi_V\in C_c(X)$ を

$$
0\le\chi_U,\chi_V\le1,
$$

$$
\chi_U=1\text{ on }K_U,
\quad\operatorname{supp}\chi_U\subseteq U,
$$

$$
\chi_V=1\text{ on }K_V,
\quad\operatorname{supp}\chi_V\subseteq V
$$

となるように取ります。すると

$$
h_U:=h\chi_U\prec U,
\qquad
h_V:=h\chi_V\prec V,
$$

かつ $K_U$ 上では $h_U=h,h_V=0$、$K_V$ 上では $h_U=0,h_V=h$、$K$ の外では全て0なので

$$
h=h_U+h_V.
$$

従って

$$
L(h)
\le
m(U)+m(V).
$$

$h\prec U\cup V$ について上限を取れば逆向きが得られます。$\square$
<!-- proof-end -->

---

## 6. compact 集合の content と open-inner regularity

compact $K\subseteq X$ に対し

<a id="def-mt5-compact-content"></a>
<!-- formal-statement-start -->
### 定義（compact content）

$$
\boxed{
m_K
:=
\inf\{m(U):K\subseteq U,\ U\text{ open}\}.}
$$
<!-- formal-statement-end -->

<a id="lem-mt5-compact-finite"></a>
<!-- formal-statement-start -->
### 補題（compact content は有限）

任意の compact $K\subseteq X$ について

$$
\boxed{m_K<\infty.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

TOP5 の cutoff により $\chi\in C_c(X)$ と open $N\supseteq K$ を

$$
0\le\chi\le1,
\qquad
\chi=1\text{ on }N
$$

となるように取れます。

$f\prec N$ なら $N$ 上で $0\le f\le1=\chi$、$N$ の外では $f=0\le\chi$ です。従って

$$
L(f)\le L(\chi).
$$

$f\prec N$ について上限を取れば

$$
m(N)\le L(\chi)<\infty.
$$

ゆえに

$$
m_K\le m(N)<\infty.
$$

$\square$
<!-- proof-end -->

<a id="lem-mt5-open-inner-content"></a>
<!-- formal-statement-start -->
### 補題（open content の compact からの復元）

任意の open $U\subseteq X$ に対し

$$
\boxed{
m(U)
=
\sup\{m_K:K\subseteq U,\ K\text{ compact}\}.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$K\subseteq U$ なら $m_K$ は $K$ の open neighborhood 全体での下限なので

$$
m_K\le m(U).
$$

従って右辺 $\le m(U)$ です。

逆に $f\prec U$ を取り

$$
K:=\operatorname{supp}f
$$

と置きます。$V$ を $K\subseteq V$ となる任意の open set とすると、同じ $f$ は $f\prec V$ でもあるので

$$
L(f)\le m(V).
$$

全ての open neighborhood $V\supseteq K$ について下限を取ると

$$
L(f)\le m_K.
$$

従って

$$
L(f)
\le
\sup_{K'\subseteq U\text{ compact}}m_{K'}.
$$

$f\prec U$ について上限を取れば

$$
m(U)
\le
\sup_{K'\subseteq U\text{ compact}}m_{K'}.
$$

両方向を合わせて結論を得ます。$\square$
<!-- proof-end -->

ここで内正則性は、まだ「測度の性質」として仮定したのではありません。**$m(U)=\sup L(f)$ の定義と compact support だけから導出した**ものです。

---

## 7. outer measure を作る

<a id="def-mt5-outer-measure"></a>
<!-- formal-statement-start -->
### 定義（$m$ から作る outer measure）

任意の部分集合 $A\subseteq X$ に対して

$$
\boxed{
\mu^*(A)
:=
\inf\{m(U):A\subseteq U,\ U\text{ open}\}.}
$$
<!-- formal-statement-end -->

<a id="thm-mt5-outer-measure"></a>
<!-- formal-statement-start -->
### 定理（$\mu^*$ は outer measure）

$\mu^*$ は

1. $\mu^*(\varnothing)=0$,
2. $A\subseteq B\Rightarrow\mu^*(A)\le\mu^*(B)$,
3. $\displaystyle\mu^*(\bigcup_nA_n)\le\sum_n\mu^*(A_n)$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

空集合については $m(\varnothing)=0$ から $\mu^*(\varnothing)=0$ です。単調性は、$B$ を覆う open set は全て $A$ も覆うことから従います。

可算劣加法性を示します。右辺が $\infty$ なら自明なので

$$
\sum_{n=1}^\infty\mu^*(A_n)<\infty
$$

とします。任意の $\varepsilon>0$ に対し、各 $n$ について open $U_n\supseteq A_n$ を

$$
m(U_n)
<
\mu^*(A_n)+\varepsilon2^{-n}
$$

となるように取れます。

$$
U:=\bigcup_{n=1}^\infty U_n
$$

は $\bigcup_nA_n$ を覆う open set です。open content の可算劣加法性から

$$
\begin{aligned}
\mu^*\left(\bigcup_nA_n\right)
&\le m(U)\\
&\le\sum_nm(U_n)\\
&<\sum_n\mu^*(A_n)+\varepsilon.
\end{aligned}
$$

$\varepsilon\downarrow0$ として結論を得ます。$\square$
<!-- proof-end -->

open $U$ については特に

$$
\boxed{\mu^*(U)=m(U)}
$$

です。実際、$U$ 自身を被覆に使えば $\mu^*(U)\le m(U)$。逆に open $V\supseteq U$ なら単調性から $m(U)\le m(V)$ なので、$V$ 全体で下限を取れば $m(U)\le\mu^*(U)$ です。

---

## 8. open set は Caratheodory 可測

外測度を作っただけでは、Borel 集合が測度の定義域に入るとはまだ言えません。ここが構成の核心です。

<a id="thm-mt5-open-caratheodory"></a>
<!-- formal-statement-start -->
### 定理（全ての open set は $\mu^*$-可測）

任意の open $G\subseteq X$ と任意の $A\subseteq X$ に対して

$$
\boxed{
\mu^*(A)
=
\mu^*(A\cap G)
+
\mu^*(A\setminus G).}
$$

従って全ての open set は Caratheodory 可測であり、全 Borel 集合も $\mu^*$-可測である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

outer measure の可算劣加法性から

$$
\mu^*(A)
\le
\mu^*(A\cap G)+\mu^*(A\setminus G)
$$

は自動的です。逆向きを示します。

$A\subseteq U$ となる open $U$ を任意に取ります。まず次を示します。

$$
\boxed{
m(U)
\ge
m(U\cap G)+\mu^*(U\setminus G)}
$$

compact $K\subseteq U\cap G$ を任意に取ります。TOP5 の cutoff を $K\subseteq U\cap G$ に適用し、$K$ の open neighborhood $W$ で

$$
K\subseteq W,
\qquad
\overline W\subseteq U\cap G
$$

となるものを取れます。例えば cutoff $\chi$ に対し $W=\{\chi>1/2\}$ とすればよいです。

$W$ と $U\setminus\overline W$ は互いに素な open sets で、その合併は $U$ に含まれます。有限加法性と単調性から

$$
m(U)
\ge
m(W)+m(U\setminus\overline W).
$$

$K\subseteq W$ なので compact content の定義から

$$
m(W)\ge m_K.
$$

また $\overline W\subseteq G$ だから

$$
U\setminus G
\subseteq
U\setminus\overline W,
$$

従って

$$
\mu^*(U\setminus G)
\le
m(U\setminus\overline W).
$$

以上より

$$
m(U)
\ge
m_K+\mu^*(U\setminus G).
$$

compact $K\subseteq U\cap G$ について上限を取り、open-inner content の補題を使うと先ほどの boxed 不等式が得られます。

いま

$$
A\cap G\subseteq U\cap G,
\qquad
A\setminus G\subseteq U\setminus G
$$

なので

$$
\mu^*(A\cap G)
\le m(U\cap G),
$$

$$
\mu^*(A\setminus G)
\le\mu^*(U\setminus G).
$$

よって先ほどの不等式から

$$
m(U)
\ge
\mu^*(A\cap G)+\mu^*(A\setminus G).
$$

これは全ての open $U\supseteq A$ について成り立つので下限を取れば

$$
\mu^*(A)
\ge
\mu^*(A\cap G)+\mu^*(A\setminus G).
$$

逆向きと合わせて等号です。

Caratheodory 可測集合全体は $\sigma$-代数をなすことは MT0 で証明済みです。open sets を全て含むので、それらが生成する Borel $\sigma$-代数も全て含みます。$\square$
<!-- proof-end -->

---

## 9. Borel 測度 $\mu$ は Radon

Borel 集合 $A$ に対し

$$
\boxed{\mu(A):=\mu^*(A)}
$$

と定めます。[Carathéodory の定理](../F0_00D3_外測度_Caratheodory可測性/index.md#thm-f0-00d3-caratheodory)によりこれは Borel 測度です。

<a id="thm-mt5-radon-regularity"></a>
<!-- formal-statement-start -->
### 定理（構成した $\mu$ は Radon）

上で構成した Borel 測度 $\mu$ は

1. compact-finite,
2. open-inner regular,
3. Borel-outer regular

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 9.1 compact-finite

$K$ が compact なら Hausdorff 性により $K$ は閉、従って Borel です。定義から

$$
\mu(K)
=
\mu^*(K)
=
\inf_{U\supseteq K\text{ open}}m(U)
=m_K.
$$

compact content の有限性により

$$
\mu(K)=m_K<\infty.
$$

#### 9.2 open-inner regular

open $U$ について $\mu(U)=\mu^*(U)=m(U)$ です。先ほどの補題と $\mu(K)=m_K$ から

$$
\begin{aligned}
\mu(U)
&=m(U)\\
&=\sup_{K\subseteq U\text{ compact}}m_K\\
&=\sup_{K\subseteq U\text{ compact}}\mu(K).
\end{aligned}
$$

#### 9.3 Borel-outer regular

Borel $A$ について、outer measure の定義そのものから

$$
\begin{aligned}
\mu(A)
&=\mu^*(A)\\
&=\inf_{U\supseteq A\text{ open}}m(U)\\
&=\inf_{U\supseteq A\text{ open}}\mu(U).
\end{aligned}
$$

従って $\mu$ は本章の定義で Radon 測度です。$\square$
<!-- proof-end -->

---

## 10. 積分表示：$L(f)=\int f\,d\mu$

ここまでで測度はできました。しかし「この測度が本当に元の $L$ を表す」ことはまだ証明していません。

まず $f\in C_c(X)$, $f\ge0$ を考えます。

<a id="thm-mt5-positive-representation"></a>
<!-- formal-statement-start -->
### 定理（非負 $C_c$ 関数の積分表示）

$f\in C_c(X)$, $f\ge0$ なら

$$
\boxed{L(f)=\int_X f\,d\mu.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f=0$ なら自明です。以下 $M:=\|f\|_\infty>0$ とします。$C:=\operatorname{supp}f$ は compact です。

正整数 $n$ に対し

$$
\delta:=\frac{M}{n}
$$

と置き、$k=1,\ldots,n$ に対して

$$
U_k:=\{x:f(x)>(k-1)\delta\},
$$

$$
K_k:=\{x:f(x)\ge k\delta\}
$$

と置きます。$U_k$ は open、$K_k$ は compact で

$$
K_k\subseteq U_k.
$$

また $U_1=\{f>0\}\subseteq C$ なので

$$
m(U_k)=\mu(U_k)\le\mu(C)<\infty.
$$

各 $k$ について $m(U_k)$ の supremum の定義から $g_k\prec U_k$ を

$$
L(g_k)>m(U_k)-\frac1n
$$

となるように取ります。一方 TOP5 の cutoff により $c_k\prec U_k$ で

$$
c_k=1\text{ on }K_k
$$

となるものを取れます。

$$
h_k:=\max(g_k,c_k)
$$

と置きます。$\max(a,b)=(a+b+|a-b|)/2$ だから $h_k$ は連続で、compact support は二つの support の有限合併に含まれます。従って

$$
h_k\prec U_k,
\qquad
h_k=1\text{ on }K_k,
$$

かつ $h_k\ge g_k$ なので正性から

$$
m(U_k)-\frac1n
<L(g_k)
\le L(h_k)
\le m(U_k).
$$

以下ではこの三項評価を繰り返し使います。

ここで連続関数

$$
s_n:=\delta\sum_{k=1}^n h_k
$$

を作ります。

$x\in X$ を固定し $j=\lfloor f(x)/\delta\rfloor$ とします。$f(x)<M$ の場合、$k\le j$ なら $f(x)\ge k\delta$ なので $h_k(x)=1$。一方 $k\ge j+2$ なら

$$
f(x)<(j+1)\delta\le(k-1)\delta
$$

なので $x\notin U_k$、従って $h_k(x)=0$ です。$h_{j+1}(x)$ だけが $[0,1]$ の途中の値を取り得ます。よって

$$
j\delta
\le s_n(x)\le(j+1)\delta.
$$

$f(x)$ も同じ区間にあるので

$$
|s_n(x)-f(x)|\le\delta.
$$

$f(x)=M$ の場合は全ての $K_k$ に入るので $s_n(x)=M$、$f(x)=0$ の場合は全ての $h_k(x)=0$ です。従って全 $x$ について

$$
\boxed{\|s_n-f\|_\infty\le\delta.}
$$

全ての $h_k$ の support は $U_1\subseteq C$ に含まれるので

$$
\operatorname{supp}(s_n-f)\subseteq C.
$$

局所 order bound を $C$ に適用するため $\chi=1$ near $C$ となる cutoff を固定すると、直前の一様評価から

$$
|L(s_n)-L(f)|
\le
\delta L(\chi)
\longrightarrow0.
$$

一方、上の三項評価より

$$
0
\le
\delta\sum_{k=1}^n m(U_k)-L(s_n)
<
\delta\,n\,\frac1n
=
\delta
\longrightarrow0.
$$

従って二つの極限評価から

$$
L(f)
=
\lim_{n\to\infty}
\delta\sum_{k=1}^n\mu(U_k).
$$

最後に右辺が $\int f\,d\mu$ へ収束することを、有限単関数の上下評価だけで直接確認します。

$$
u_n
:=
\delta\sum_{k=1}^n1_{\{f>(k-1)\delta\}},
$$

$$
\ell_n
:=
\delta\sum_{k=1}^n1_{\{f>k\delta\}}
$$

と置きます。点ごとに

$$
0\le\ell_n\le f\le u_n,
$$

かつ

$$
0\le u_n-\ell_n
\le
\delta1_{\{f>0\}}.
$$

$\{f>0\}\subseteq C$ で $\mu(C)<\infty$ なので

$$
0
\le
\int u_n\,d\mu-\int\ell_n\,d\mu
\le
\delta\mu(C)
\longrightarrow0.
$$

$\ell_n\le f\le u_n$ だから挟み撃ちにより

$$
\int u_n\,d\mu
\longrightarrow
\int f\,d\mu.
$$

有限単関数の積分の定義から

$$
\int u_n\,d\mu
=
\delta\sum_{k=1}^n
\mu(\{f>(k-1)\delta\})
=
\delta\sum_{k=1}^n\mu(U_k).
$$

これと直前の $L(f)$ の極限表示を合わせて

$$
L(f)=\int f\,d\mu.
$$

$\square$
<!-- proof-end -->

この証明の要点は、測度を作るときに使った supremum $m(U)$ を、$f$ の高さ方向の有限分割へ戻したことです。ここでも「層別積分公式」を名前だけで呼ばず、有限単関数の上下評価で閉じています。

<a id="cor-mt5-real-representation"></a>
<!-- formal-statement-start -->
### 系（実数値 $C_c$ 関数の積分表示）

任意の $f\in C_c(X)$ について

$$
\boxed{L(f)=\int_X f\,d\mu.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
f^+:=\max(f,0),
\qquad
f^-:=\max(-f,0)
$$

と置けば $f^+,f^-\in C_c(X)$、$f=f^+-f^-$ です。両者は非負なので直前の定理から

$$
L(f^+)=\int f^+\,d\mu,
\qquad
L(f^-)=\int f^-\,d\mu.
$$

また support は compact で $\mu$ は compact-finite だから両積分は有限です。線形性により

$$
L(f)
=L(f^+)-L(f^-)
=\int f\,d\mu.
$$

$\square$
<!-- proof-end -->

---

## 11. 一意性

<a id="thm-mt5-uniqueness"></a>
<!-- formal-statement-start -->
### 定理（表現 Radon 測度の一意性）

$\nu$ が別の Radon 測度で

$$
L(f)=\int_X f\,d\nu
\qquad
(\forall f\in C_c(X))
$$

を満たすなら

$$
\boxed{\nu=\mu}
$$

が全 Borel 集合上で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず open $U$ 上で一致することを示します。

$f\prec U$ なら $0\le f\le1_U$ なので

$$
L(f)
=
\int f\,d\nu
\le
\nu(U).
$$

$f\prec U$ について supremum を取ると

$$
m(U)\le\nu(U).
$$

逆に compact $K\subseteq U$ を任意に取ります。TOP5 の cutoff から $f\prec U$ で $f=1$ on $K$ となるものを取れます。すると

$$
\nu(K)
\le
\int f\,d\nu
=L(f)
\le
m(U).
$$

$\nu$ の open-inner regularity により compact $K\subseteq U$ について supremum を取ると

$$
\nu(U)\le m(U).
$$

両方の不等式から

$$
\nu(U)=m(U)=\mu(U)
$$

が全 open $U$ で成り立ちます。

最後に Borel $A$ に対し、両測度の outer regularity から

$$
\begin{aligned}
\nu(A)
&=\inf_{U\supseteq A\text{ open}}\nu(U)\\
&=\inf_{U\supseteq A\text{ open}}\mu(U)\\
&=\mu(A).
\end{aligned}
$$

従って全 Borel 集合上で一致します。$\square$
<!-- proof-end -->

---

## 12. Riesz–Markov：正汎関数版

ここまでを一つにまとめます。

<a id="thm-mt5-riesz-markov-positive"></a>
<!-- formal-statement-start -->
### 定理（Riesz–Markov：$C_c(X)$ 上の正汎関数版）

$X$ を局所コンパクト Hausdorff 空間とする。任意の正線形汎関数

$$
L:C_c(X)\to\mathbb R
$$

に対し、一意な Radon 測度 $\mu$ が存在して

$$
\boxed{
L(f)=\int_X f\,d\mu
\qquad
(\forall f\in C_c(X))}
$$

となる。
<!-- formal-statement-end -->

### 証明の依存表

| 段階 | 本当に使ったもの |
|---|---|
| cutoff | TOP4 の分離公理 + TOP5 の compactness + TOP5補遺の dyadic construction |
| $m(U)$ の劣加法性 | compact support の有限部分被覆 + 有限 cutoff partition |
| compact-finite | $K$ の近傍上で1となる一つの cutoff |
| outer measure | open content の可算劣加法性 |
| Borel measurability | open-inner content + $\overline W\subset G$ となる shrinking |
| regularity | $\mu^*$ の定義 + compact content |
| 表現 | 高さ方向の有限分割 + 正性の局所 order bound |
| 一意性 | cutoff + inner/outer regularity |

Hahn–Banach、Banach–Alaoglu、一般の partition of unity、一般の Urysohn 補題を外部定理としては使っていません。

---

## 13. 典型例

### 13.1 点評価は Dirac 測度になる

$x_0\in X$ を固定し

$$
L(f):=f(x_0)
$$

とします。$f\ge0$ なら $f(x_0)\ge0$ なので $L$ は正です。

Dirac 測度

$$
\delta_{x_0}(A)
=
\begin{cases}
1,&x_0\in A,\\
0,&x_0\notin A
\end{cases}
$$

に対し

$$
\int f\,d\delta_{x_0}=f(x_0)=L(f).
$$

一意性により Riesz–Markov が構成する測度は $\delta_{x_0}$ です。

### 13.2 有限個の点評価

$x_1,\ldots,x_r\in X$ と $a_i\ge0$ に対し

$$
L(f)=\sum_{i=1}^ra_if(x_i)
$$

は正線形汎関数です。表現測度は

$$
\mu=\sum_{i=1}^ra_i\delta_{x_i}.
$$

「正係数」が正性に対応していることが見えます。

### 13.3 $\mathbb R$ 上の Lebesgue 積分

$X=\mathbb R$ とし

$$
L(f)=\int_{\mathbb R}f\,d\lambda
\qquad(f\in C_c(\mathbb R))
$$

とします。Lebesgue 測度 $\lambda$ は MT0 で正則性を確認済みで、compact set 上有限です。従って $\lambda$ は本章の意味で Radon であり $L$ を表します。一意性から、本章の構成で得られる $\mu$ はちょうど $\lambda$ です。

### 13.4 離散空間では有限和になる

$X$ を任意の離散空間とします。離散空間は局所コンパクト Hausdorff で、compact 部分集合は有限集合です。従って

$$
C_c(X)
=
\{f:X\to\mathbb R:\operatorname{supp}f\text{ finite}\}.
$$

各点の重み $a_x\ge0$ を任意に与えると

$$
L(f)=\sum_{x\in X}a_xf(x)
$$

は各 $f$ について有限和なので正線形汎関数です。対応する Radon 測度は

$$
\mu(A)=\sum_{x\in A}a_x
$$

です。空間全体の測度が $\infty$ でも構いません。Radon の有限性要求は **compact set 上**だからです。

---

## 14. なぜ局所コンパクト性が前面に出るのか

本章の構成で局所コンパクト性が最初に効いた場所は、測度論ではなく

$$
K\subset U
\quad\Longrightarrow\quad
f\in C_c(X),\quad
f=1\text{ near }K,\quad
\operatorname{supp}f\subset U
$$

という cutoff です。

この関数があることで

- compact set を open set の内側から検出する、
- support を open cover ごとに有限分解する、
- compact set の候補測度を有限に抑える、
- 一意性で $\nu(K)$ を $L(f)$ と比較する、

という全ての橋が架かります。

したがって「Riesz–Markov の仮定は LCH」という暗記より、**LCH が $C_c$ の局所化能力を保証する**と理解する方が構造を捉えています。

---

## 15. $C_0(X)$・符号付き測度との対応はここでは先取りしない

よく知られた別形式では

$$
C_0(X)^*
\cong
\{\text{有限符号付き Radon 測度}\}
$$

という表現が現れます。しかしこれを本章の正汎関数定理と同一視してはいけません。

そこへ進むには少なくとも、

1. $C_0(X)$ と一様ノルム、
2. $C_c(X)$ の $C_0(X)$ での稠密性、
3. 有界汎関数を正部分・負部分へ分解する順序構造、
4. 符号付き測度の全変動とのノルム対応、

を整理する必要があります。

MT2 には符号付き測度・全変動がありますが、**任意の有界線形汎関数の正負分解**は別の論証です。Hahn–Banach や Banach 双対の一般論を本章の存在証明へ逆流させないため、ここでは正 $L:C_c(X)\to\mathbb R$ の Riesz–Markov までを証明境界とします。

後続の関数解析では、本章を測度側の正本として $C_0(X)$ 版へ接続します。

---

# 演習

## A1. 正性から単調性

- Level: A

正線形汎関数 $L:C_c(X)\to\mathbb R$ について

$$
f\le g\Longrightarrow L(f)\le L(g)
$$

を、正性の定義だけから証明せよ。

## A2. 点評価の open content

- Level: A

$x_0\in X$ とし $L(f)=f(x_0)$ とする。本章の定義した $m(U)$ が

$$
m(U)=
\begin{cases}
1,&x_0\in U,\\
0,&x_0\notin U
\end{cases}
$$

となることを示せ。

## A3. open set では outer measure と content が一致する

- Level: A

open $U\subseteq X$ について

$$
\mu^*(U)=m(U)
$$

を、$\mu^*$ の定義と $m$ の単調性だけから証明せよ。

## A4. compact 集合の測度は有限である

- Level: A

compact $K\subseteq X$ について

$$
\mu(K)=m_K<\infty
$$

を示せ。どこで Hausdorff 性と cutoff を使うかも明示せよ。

## B1. compact support の有限化が必要な箇所

- Level: B

$m(U)$ の可算劣加法性の証明で、なぜ open cover $U\subseteq\bigcup_nU_n$ から最初から全空間の partition of unity を作る必要がないのか説明せよ。

## B2. open set 上の一致だけで一意性が出る理由

- Level: B

二つの Radon 測度 $\mu,\nu$ が全ての open set 上で一致するとする。Borel set 上でも一致することを、本章の Radon の定義だけから証明せよ。

## B3. Caratheodory 可測性で shrinking が必要な理由

- Level: B

open $G\subseteq X$ と open $U\subseteq X$ に対して

$$
m(U)\ge m(U\cap G)+\mu^*(U\setminus G)
$$

を証明せよ。その際、compact $K\subseteq U\cap G$ に対して

$$
K\subseteq W,
\qquad
\overline W\subseteq U\cap G
$$

となる open $W$ を挟む理由を説明せよ。

## C1. 離散空間の例

- Level: C

$X$ を非可算離散空間、$a_x=1$ とする。

1. $C_c(X)$ の各関数が有限 support を持つことを示せ。
2. $L(f)=\sum_xf(x)$ が well-defined な正線形汎関数であることを示せ。
3. 対応する counting measure は $\mu(X)=\infty$ だが Radon であることを示せ。

---

# 演習解答

## A1 解答

$f\le g$ なら $g-f\ge0$。正性から

$$
L(g-f)\ge0.
$$

線形性より

$$
L(g)-L(f)\ge0,
$$

従って $L(f)\le L(g)$ です。ここでは continuity や norm は一切使っていません。

## A2 解答

$x_0\notin U$ なら、$f\prec U$ の support は $U$ に含まれるので $f(x_0)=0$。従って全候補で $L(f)=0$ となり $m(U)=0$ です。

$x_0\in U$ なら TOP5 の cutoff により $f\prec U$ で $f(x_0)=1$ となるものがあります。従って $m(U)\ge1$。一方全候補で $0\le f(x_0)\le1$ だから $m(U)\le1$。よって $m(U)=1$ です。

これは outer measure 構成前の段階ですでに Dirac 測度の open set 上の値が現れていることを示します。

## A3 解答

$U$ 自身が $U$ を覆う open set なので、outer measure の定義から

$$
\mu^*(U)\le m(U).
$$

逆に $V\supseteq U$ が open なら $m$ の単調性から

$$
m(U)\le m(V).
$$

従って全 open $V\supseteq U$ について下限を取れば

$$
m(U)
\le
\inf_{V\supseteq U\text{ open}}m(V)
=
\mu^*(U).
$$

両方を合わせて $\mu^*(U)=m(U)$ です。ここではまだ Caratheodory 可測性は使っていません。

## A4 解答

Hausdorff 空間では compact 集合 $K$ は閉なので Borel 集合です。従って構成後の Borel 測度について

$$
\mu(K)
=
\mu^*(K)
=
\inf_{U\supseteq K\text{ open}}m(U)
=m_K.
$$

有限性には cutoff を使います。TOP5 により $K$ のある open neighborhood $N$ 上で $\chi=1$、$0\le\chi\le1$ となる $\chi\in C_c(X)$ を取れます。$f\prec N$ なら全点で $0\le f\le\chi$ なので

$$
L(f)\le L(\chi).
$$

よって $m(N)\le L(\chi)<\infty$、従って

$$
m_K\le m(N)<\infty.
$$

Hausdorff 性は $K$ を Borel に入れるため、局所コンパクト性を含む cutoff 構成は有限上界を作るために使われています。

## B1 解答

$m(U)$ の候補 $f$ は compact support

$$
K=\operatorname{supp}f
$$

を持ちます。従って可算 open cover から必要なのは $K$ を覆う有限部分だけです。その有限 cover に対して TOP5 の cutoff を有限個作り、積

$$
h_j=g_j\prod_{i<j}(1-g_i)
$$

で有限分解すれば足ります。

つまり必要なのは「空間全体に従属する partition of unity」ではなく、**一つの compact support を有限化する能力**です。これが一般 partition of unity を依存に入れなくてよい理由です。

## B2 解答

$A$ を Borel set とします。outer regularity により

$$
\mu(A)
=
\inf_{U\supseteq A\text{ open}}\mu(U),
$$

$$
\nu(A)
=
\inf_{U\supseteq A\text{ open}}\nu(U).
$$

全 open $U$ で $\mu(U)=\nu(U)$ だから、右辺の下限を取る集合と値が完全に同じです。従って

$$
\mu(A)=\nu(A).
$$

内正則性ではなく **外正則性が open set 上の一致を Borel set 全体へ運ぶ**ことがポイントです。

## B3 解答

compact $K\subseteq U\cap G$ を任意に取ります。TOP5 の shrinking/cutoff により open $W$ を

$$
K\subseteq W,
\qquad
\overline W\subseteq U\cap G
$$

となるように取れます。すると $W$ と $U\setminus\overline W$ は互いに素な open sets で、その合併は $U$ に含まれるので

$$
m(U)
\ge
m(W)+m(U\setminus\overline W).
$$

また $K\subseteq W$ から $m(W)\ge m_K$、さらに $\overline W\subseteq G$ から

$$
U\setminus G
\subseteq
U\setminus\overline W
$$

なので

$$
\mu^*(U\setminus G)
\le
m(U\setminus\overline W).
$$

従って

$$
m(U)
\ge
m_K+\mu^*(U\setminus G).
$$

compact $K\subseteq U\cap G$ について supremum を取り、open-inner content の等式を使えば

$$
m(U)
\ge
m(U\cap G)+\mu^*(U\setminus G).
$$

$W$ を挟む理由は、$U\cap G$ の compact 部分を一方に保持しつつ、その閉包を $G$ の内側へ押し込み、もう一方の **open set** $U\setminus\overline W$ が $U\setminus G$ を覆うようにするためです。単に $U\cap G$ と $U\setminus G$ に分けると後者は一般には open でなく、$m$ の有限加法性を適用できません。

## C1 解答

離散空間では任意の singleton が open です。もし compact $K$ が無限なら

$$
K=\bigcup_{x\in K}\{x\}
$$

は singleton による開被覆ですが、有限部分被覆を持ちません。従って compact subset は有限です。逆に有限集合は任意の位相空間で compact なので、離散空間の compact subset はちょうど有限集合です。

よって $f\in C_c(X)$ なら $\operatorname{supp}f$ は有限であり

$$
L(f)=\sum_{x\in X}f(x)
$$

は実際には有限和です。従って well-defined で線形、$f\ge0$ なら各項が非負なので正です。

対応する counting measure は

$$
\mu(A)=\#A
$$

（無限集合では $\infty$）です。compact $K$ は有限だから $\mu(K)<\infty$。open set は全ての部分集合であり、任意の $U$ はその有限部分集合の上限として

$$
\mu(U)
=
\sup\{\#K:K\subseteq U,\ K\text{ finite}\}
$$

と書けるので inner regular です。outer regularity は $A$ 自身が open であることから自明です。従って $X$ が非可算で $\mu(X)=\infty$ でも Radon です。
