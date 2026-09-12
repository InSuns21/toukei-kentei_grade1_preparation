<!-- definition-example-audit: strict -->
# RA8 標準実解析 VIII：関数族のコンパクト性・近似

RA5では「一つの関数列が一様収束するか」を調べました。本章では視点を一段上げ、**関数の集合そのものが、どの条件で一様収束部分列を必ず持つか**を考えます。後半では同じ一様収束の枠組みで、連続関数を多項式や部分代数でどこまで近似できるかを証明します。

流れは

$$
C(K)\text{ と一様ノルム}
\longrightarrow
\text{同程度連続性・各点有界性}
\longrightarrow
\text{関数列の一様収束部分列}
\longrightarrow
\text{Bernstein近似}
\longrightarrow
\text{点分離代数による近似}
$$

です。$K$ は原則としてコンパクト距離空間、関数は実数値連続関数とします。一般コンパクト性の有限部分被覆を使うため、RA5に加えてTOP5を前提とします。

---

## 1. 連続関数全体を一つの距離空間として見る

<a id="def-ra8-ck-uniform-norm"></a>
<!-- formal-statement-start -->
> **定義（C(K)の一様ノルム）**  
> コンパクト距離空間 $K$ に対し、$K$ 上の実数値連続関数全体を $C(K)$ と書く。$f\in C(K)$ に対し $\|f\|_\infty=\sup_{x\in K}|f(x)|$ を **一様ノルム** と呼ぶ。二関数の距離を $d_\infty(f,g)=\|f-g\|_\infty$ とする。
<!-- formal-statement-end -->

コンパクト集合上の連続関数は有界なので、$\|f\|_\infty$ は有限です。一様収束 $f_n\to f$ は、そのまま

$$
\|f_n-f\|_\infty\to0
$$

と言い換えられます。

<!-- definition-example-start: def-ra8-ck-uniform-norm -->
**定義の確認**：$K=[0,1]$、$f(x)=x^2$、$g(x)=x$ とすると

$$
\|f-g\|_\infty
=\max_{0\le x\le1}|x^2-x|
=\frac14.
$$

したがって「関数同士の近さ」を区間全体で最悪の誤差として測っています。
<!-- definition-example-end -->

<a id="thm-ra8-ck-complete"></a>
<!-- formal-statement-start -->
> **定理（C(K)の一様ノルム完備性）**  
> 一様ノルムに関してCauchyである $C(K)$ の任意の列は、ある $f\in C(K)$ へ一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(f_n)$ を一様ノルムについてCauchyとします。任意の $x\in K$ を固定すると

$$
|f_n(x)-f_m(x)|\le\|f_n-f_m\|_\infty
$$

なので、$(f_n(x))$ は実数のCauchy列です。実数の完備性から

$$
f(x)=\lim_{n\to\infty}f_n(x)
$$

を定められます。

次に一様収束を示します。任意の $\varepsilon>0$ に対し、ある $N$ が存在して

$$
n,m\ge N
\Longrightarrow
\|f_n-f_m\|_\infty<\varepsilon.
$$

$n\ge N$ と $x\in K$ を固定し、$m\to\infty$ とすると

$$
|f_n(x)-f(x)|\le\varepsilon.
$$

これは全ての $x$ で同時に成り立つので

$$
\|f_n-f\|_\infty\le\varepsilon
\qquad(n\ge N).
$$

従って $f_n\to f$ は一様収束です。[一様収束で連続性が保存される定理](../RA5/index.md#thm-ra5-continuity)により $f$ は連続なので $f\in C(K)$ です。$\square$
<!-- proof-end -->

ここでは「各点で収束先がある」だけで終わらず、Cauchy条件の量化が $x$ に依存しないことをそのまま一様収束へ戻しているのが要点です。

---

## 2. 関数族全体を同時に制御する二条件

<a id="def-ra8-equicontinuous"></a>
<!-- formal-statement-start -->
> **定義（同程度連続な関数族）**  
> $\mathcal F\subset C(K)$ が **同程度連続** であるとは、任意の $x\in K$ と任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して、$d(x,y)<\delta$ なら $|f(x)-f(y)|<\varepsilon$ が全ての $f\in\mathcal F$ について成り立つことをいう。
<!-- formal-statement-end -->

一つ一つの $f$ ごとに別の $\delta$ を選ぶのではなく、**同じ点 $x$ では関数族全体に共通の $\delta$ を選べる**ことが条件です。

<!-- definition-example-start: def-ra8-equicontinuous -->
**定義の確認**：全ての $f\in\mathcal F$ が共通の定数 $L$ について

$$
|f(x)-f(y)|\le Ld(x,y)
$$

を満たすなら、$L>0$ のとき $\delta=\varepsilon/L$ と取ればよく、$L=0$ なら任意の $\delta>0$ でよいので、$\mathcal F$ は同程度連続です。
<!-- definition-example-end -->

$K$ がコンパクトなら、点ごとの同程度連続性は一様な形へ強化できます。実際、$\varepsilon>0$ を固定し、各 $x\in K$ で関数族全体に対する半径 $r_x>0$ を $\varepsilon/2$ 用に選びます。球 $B(x,r_x/2)$ は $K$ を覆うので、[コンパクト性](../TOP5/index.md#def-top5-compact)から有限個

$$
B(x_1,r_{x_1}/2),\dots,B(x_m,r_{x_m}/2)
$$

で覆えます。$\delta=\min_i r_{x_i}/2$ とすれば、$d(u,v)<\delta$ のとき $u$ を含む球を一つ選び、三角不等式で $u,v$ の両方を同じ $x_i$ の制御範囲へ入れられます。従って

$$
d(u,v)<\delta
\Longrightarrow
|f(u)-f(v)|<\varepsilon
\quad(\forall f\in\mathcal F).
$$

ここでコンパクト性が「点ごとに違う無限個の半径」を有限個へ圧縮しています。

<a id="def-ra8-pointwise-bounded"></a>
<!-- formal-statement-start -->
> **定義（各点有界な関数族）**  
> $\mathcal F\subset C(K)$ が **各点有界** であるとは、各 $x\in K$ について $\sup_{f\in\mathcal F}|f(x)|<\infty$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra8-pointwise-bounded -->
**定義の確認**：$\mathcal F=\{f_n:n\ge1\}$、$f_n(x)=x^n$ を $[0,1]$ 上で考えると $0\le f_n(x)\le1$ なので各点有界です。しかし後で見るように、この関数族は同程度連続ではありません。各点有界だけでは一様収束部分列を保証できません。
<!-- definition-example-end -->

<a id="def-ra8-relatively-compact"></a>
<!-- formal-statement-start -->
> **定義（相対コンパクトな関数族）**  
> $\mathcal F\subset C(K)$ が一様ノルムについて **相対コンパクト** であるとは、その閉包 $\overline{\mathcal F}$ が $C(K)$ の一様ノルム距離でコンパクトであることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra8-relatively-compact -->
**定義の確認**：一つの関数 $f$ だけからなる集合 $\{f\}$ は閉包も $\{f\}$ で、任意の開被覆から $f$ を含む一つを選べば有限部分被覆になるためコンパクトです。従って有限個の関数からなる族は相対コンパクトです。
<!-- definition-example-end -->

---

## 3. Arzela-Ascoli定理

<a id="thm-ra8-arzela-ascoli"></a>
<!-- formal-statement-start -->
> **定理（Arzela-Ascoli定理）**  
> $K$ をコンパクト距離空間、$\mathcal F\subset C(K)$ とする。このとき、$\mathcal F$ が一様ノルムについて相対コンパクトであることと、$\mathcal F$ が同程度連続かつ各点有界であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：相対コンパクト性から二条件へ

$\overline{\mathcal F}$ が一様ノルムでコンパクトとします。

まず各点有界性を示します。もしある $x\in K$ で $\{|f(x)|:f\in\mathcal F\}$ が非有界なら、$f_n\in\mathcal F$ を

$$
|f_n(x)|>n
$$

となるように選べます。一様ノルム距離は距離なので、[距離空間ではコンパクト性と点列コンパクト性が同値](../TOP5/index.md#thm-top5-metric-sequential)であることから、$(f_n)$ には一様ノルムで収束する部分列があります。しかし一様収束なら固定した $x$ での値も収束し、特に有界になります。$|f_n(x)|>n$ と矛盾です。

次に同程度連続性を示します。反対に同程度連続でないなら、ある $x\in K$ と $\varepsilon_0>0$ が存在して、各 $n$ について

$$
f_n\in\mathcal F,
\qquad y_n\in K,
\qquad d(x,y_n)<\frac1n,
$$

かつ

$$
|f_n(x)-f_n(y_n)|\ge\varepsilon_0
$$

となるものを選べます。すると $y_n\to x$ です。一方、$\overline{\mathcal F}$ のコンパクト性から部分列を取り $f_{n_k}\to g$ を一様収束とできます。$g$ は連続なので

$$
|g(x)-g(y_{n_k})|\to0.
$$

ところが

$$
\begin{aligned}
|f_{n_k}(x)-f_{n_k}(y_{n_k})|
&\le 2\|f_{n_k}-g\|_\infty+|g(x)-g(y_{n_k})|\\
&\to0,
\end{aligned}
$$

となり、$\varepsilon_0$ 以上という選び方に反します。従って $\mathcal F$ は同程度連続です。

### 証明：二条件から相対コンパクト性へ

今度は $\mathcal F$ が同程度連続かつ各点有界とします。任意の点列 $(f_n)\subset\mathcal F$ から一様収束部分列を作ります。

まず $K$ に可算な稠密集合を作ります。各 $m\ge1$ について、半径 $1/m$ の開球全体は $K$ を覆います。コンパクト性から有限個の中心

$$
D_m=\{x_{m,1},\dots,x_{m,N_m}\}
$$

だけで $K$ を覆えます。従って

$$
D=\bigcup_{m=1}^\infty D_m
$$

は可算で稠密です。$D=\{q_1,q_2,\dots\}$ と並べます。

$q_1$ では $(f_n(q_1))$ は有界実数列です。有界実数列から収束部分列を取れることは、閉区間を二分し、無限個の項を含む半分を毎回選ぶ入れ子区間の議論から従います。その部分列の中から $q_2$ で収束する部分列を取り、さらにその中から $q_3$ で収束する部分列を取る、という操作を繰り返します。第 $j$ 段階で得た部分列の第 $j$ 項を取る対角選択により、ある部分列 $(f_{n_k})$ が全ての $q_j\in D$ で収束します。

この部分列が一様Cauchyであることを示します。$\varepsilon>0$ を取ります。コンパクト性による一様化を使い、ある $\delta>0$ が存在して

$$
d(x,y)<\delta
\Longrightarrow
|f(x)-f(y)|<\frac\varepsilon3
\quad(\forall f\in\mathcal F)
$$

となります。$1/m<\delta$ となる $m$ を選びます。有限集合 $D_m$ の各点で $(f_{n_k})$ は収束するので、ある $N$ が存在して、$k,\ell\ge N$ なら全ての $q\in D_m$ で

$$
|f_{n_k}(q)-f_{n_\ell}(q)|<\frac\varepsilon3
$$

となります。

任意の $x\in K$ に対し $d(x,q)<1/m<\delta$ となる $q\in D_m$ を選ぶと

$$
\begin{aligned}
|f_{n_k}(x)-f_{n_\ell}(x)|
&\le |f_{n_k}(x)-f_{n_k}(q)|\\
&\quad+|f_{n_k}(q)-f_{n_\ell}(q)|\\
&\quad+|f_{n_\ell}(q)-f_{n_\ell}(x)|\\
&<\varepsilon.
\end{aligned}
$$

従って $(f_{n_k})$ は一様Cauchyです。[C(K)の一様ノルム完備性](#thm-ra8-ck-complete)から、ある $f\in C(K)$ へ一様収束します。

ここまでで「$\mathcal F$ 内の任意の点列は一様収束部分列を持つ」ことを示しました。閉包の点列 $(g_n)\subset\overline{\mathcal F}$ に対しては、各 $n$ で $f_n\in\mathcal F$ を

$$
\|f_n-g_n\|_\infty<\frac1n
$$

となるように選びます。$(f_n)$ の一様収束部分列 $f_{n_k}\to f$ を取れば

$$
\|g_{n_k}-f\|_\infty
\le\|g_{n_k}-f_{n_k}\|_\infty+\|f_{n_k}-f\|_\infty\to0.
$$

従って $\overline{\mathcal F}$ は点列コンパクトです。再び[距離空間ではコンパクト性と点列コンパクト性が同値](../TOP5/index.md#thm-top5-metric-sequential)を使えば、$\overline{\mathcal F}$ はコンパクトです。よって $\mathcal F$ は相対コンパクトです。$\square$
<!-- proof-end -->

証明の中心は「無限個の関数を直接制御する」のではなく、コンパクト性で $K$ を有限個の観測点へ落とし、対角化でその観測点上の収束をそろえ、同程度連続性で点の間を埋めることです。

---

## 4. 各点有界だけでは足りない

$K=[0,1]$、$f_n(x)=x^n$ とします。全ての $x$ と $n$ で $0\le f_n(x)\le1$ なので各点有界です。

しかし同程度連続ではありません。$\varepsilon=1/2$ とします。どんな $\delta>0$ を与えても $y\in(0,1)$ を $1-y<\delta$ となるように取り、さらに $n$ を十分大きくして $y^n<1/2$ とできます。すると

$$
|1-y|<\delta,
\qquad
|f_n(1)-f_n(y)|=1-y^n>\frac12.
$$

従って関数族全体に共通の $\delta$ は存在しません。

また、もし $(x^{n_k})$ が一様収束するなら各点収束もするため、その収束先は

$$
f(x)=
\begin{cases}
0,&0\le x<1,\\
1,&x=1
\end{cases}
$$

でなければなりません。しかし一様収束先は連続であるはずなのに、この $f$ は $x=1$ で不連続です。従って一様収束部分列はありません。[Arzela-Ascoli定理](#thm-ra8-arzela-ascoli)の条件から何が失われると破綻するかがそのまま見えます。

---

## 5. Bernstein多項式とWeierstrass近似

一様収束部分列の存在とは別に、任意の連続関数を扱いやすい関数で一様近似できるかを考えます。まず $[0,1]$ 上で具体的な多項式を作ります。

<a id="def-ra8-bernstein"></a>
<!-- formal-statement-start -->
> **定義（Bernstein多項式）**  
> $f\in C([0,1])$ に対し $B_nf(x)=\sum_{k=0}^n f(k/n)\binom nk x^k(1-x)^{n-k}$ を $f$ の第 $n$ Bernstein多項式という。
<!-- formal-statement-end -->

各 $B_nf$ は有限和なので $x$ の多項式です。

<!-- definition-example-start: def-ra8-bernstein -->
**定義の確認**：$f(t)=t$ なら

$$
B_nf(x)
=\frac1n\sum_{k=0}^n k\binom nkx^k(1-x)^{n-k}
=x.
$$

$f(t)=t^2$ なら後の演習で

$$
B_nf(x)=x^2+\frac{x(1-x)}n
$$

を確認します。一次関数は正確に再現し、二次関数の誤差は $O(1/n)$ です。
<!-- definition-example-end -->

<a id="thm-ra8-weierstrass"></a>
<!-- formal-statement-start -->
> **定理（Weierstrass近似定理）**  
> 任意の $f\in C([a,b])$ と $\varepsilon>0$ に対し、ある実係数多項式 $p$ が存在して $\sup_{x\in[a,b]}|f(x)-p(x)|<\varepsilon$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $[0,1]$ の場合を示します。記号を簡単にするため

$$
p_{n,k}(x)=\binom nkx^k(1-x)^{n-k}
$$

と置きます。二項展開から

$$
\sum_{k=0}^np_{n,k}(x)=1.
$$

また $k\binom nk=n\binom{n-1}{k-1}$ を使うと

$$
\sum_{k=0}^n\frac{k}{n}p_{n,k}(x)=x.
$$

同様に $k(k-1)\binom nk=n(n-1)\binom{n-2}{k-2}$ から

$$
\sum_{k=0}^n\frac{k(k-1)}{n^2}p_{n,k}(x)
=\frac{n-1}{n}x^2.
$$

$k^2=k(k-1)+k$ を使って整理すると

$$
\sum_{k=0}^n
\left(\frac{k}{n}-x\right)^2p_{n,k}(x)
=\frac{x(1-x)}n
\le\frac1{4n}.
$$

$f$ はコンパクト区間上連続なので一様連続です。$M=\|f\|_\infty$ と置き、任意の $\varepsilon>0$ に対して $\delta>0$ を

$$
|s-t|<\delta
\Longrightarrow
|f(s)-f(t)|<\frac\varepsilon2
$$

となるように選びます。すると

$$
|B_nf(x)-f(x)|
\le\sum_{k=0}^n
\left|f\!\left(\frac{k}{n}\right)-f(x)\right|p_{n,k}(x).
$$

$|k/n-x|<\delta$ の項では各差は $\varepsilon/2$ 未満です。一方 $|k/n-x|\ge\delta$ の項では差を $2M$ で抑え、さらに

$$
1\le\frac{(k/n-x)^2}{\delta^2}
$$

を使えます。従って全ての $x\in[0,1]$ について

$$
\begin{aligned}
|B_nf(x)-f(x)|
&\le\frac\varepsilon2
+\frac{2M}{\delta^2}
\sum_{k=0}^n
\left(\frac{k}{n}-x\right)^2p_{n,k}(x)\\
&\le\frac\varepsilon2+\frac{M}{2n\delta^2}.
\end{aligned}
$$

$n$ を十分大きく取れば第2項も $\varepsilon/2$ 未満です。この評価は $x$ に依らないので

$$
\|B_nf-f\|_\infty<\varepsilon.
$$

従って $[0,1]$ 上で多項式近似ができました。一般の $[a,b]$ は

$$
t=\frac{x-a}{b-a}
$$

で $[0,1]$ へ移し、得られた $t$ の多項式へこの一次式を代入すればよいです。$\square$
<!-- proof-end -->

証明の本体は、遠い標本点の重みを二次偏差

$$
\sum (k/n-x)^2p_{n,k}(x)
$$

で一様に小さくすることです。確率論の定理は使っていません。

---

## 6. 実Stone-Weierstrass定理

<a id="def-ra8-separates-points"></a>
<!-- formal-statement-start -->
> **定義（点を分離する部分代数）**  
> コンパクト距離空間 $K$ に対し $A\subset C(K)$ が **点を分離する部分代数** であるとは、$A$ が和・実数倍・積について閉じ、定数関数を全て含み、任意の異なる $x,y\in K$ に対して $g(x)\ne g(y)$ となる $g\in A$ が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra8-separates-points -->
**定義の確認**：$K=[a,b]$ で実多項式を $K$ に制限した集合 $A$ を考えます。和・実数倍・積で閉じ、定数多項式を含みます。$x\ne y$ なら $g(t)=t$ と取れば $g(x)\ne g(y)$ なので点を分離します。
<!-- definition-example-end -->

<a id="thm-ra8-stone-weierstrass"></a>
<!-- formal-statement-start -->
> **定理（実Stone-Weierstrass定理）**  
> $K$ をコンパクト距離空間とし、$A\subset C(K)$ を定数関数を含み点を分離する実部分代数とする。このとき $A$ は一様ノルムで $C(K)$ に稠密である。すなわち任意の $f\in C(K)$ と $\varepsilon>0$ に対し、ある $g\in A$ が存在して $\|f-g\|_\infty<\varepsilon$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$B=\overline A$ を一様ノルム閉包とします。まず $B$ も和・実数倍・積について閉じることを確認します。$f,g\in B$ に対し $f_m,g_m\in A$ を $f_m\to f$, $g_m\to g$ と一様収束するように選びます。和と実数倍の保存は直ちに従います。積については $(f_m)$ が一様収束するので $\|f_m\|_\infty$ は十分後で一様に有界であり、

$$
\|f_mg_m-fg\|_\infty
\le\|f_m\|_\infty\|g_m-g\|_\infty
+\|g\|_\infty\|f_m-f\|_\infty\to0.
$$

従って $fg\in B$ であり、$B$ は閉じた部分代数です。

次に $h\in B$ なら $|h|\in B$ であることを示します。$M=\|h\|_\infty$ とします。$M=0$ なら自明なので $M>0$ とします。[Weierstrass近似定理](#thm-ra8-weierstrass)を $[-M,M]$ 上の連続関数 $|t|$ に適用し、多項式 $q$ で $|t|$ を一様近似します。$p(t)=q(t)-q(0)$ と置けば $p(0)=0$ で、近似誤差は高々元の2倍です。$p$ は定数項を持たないので、$B$ が和・積・実数倍で閉じることから $p(h)\in B$ です。近似精度を任意に上げれば $p(h)\to|h|$ が一様収束し、$B$ は閉なので $|h|\in B$ です。

従って $f,g\in B$ なら

$$
\max(f,g)=\frac{f+g+|f-g|}{2},
\qquad
\min(f,g)=\frac{f+g-|f-g|}{2}
$$

も $B$ に属します。つまり $B$ は有限個のmax/minを取る操作に閉じます。

任意の $f\in C(K)$ と $\varepsilon>0$ を固定します。まず異なる二点 $x,y\in K$ を取ります。$A$ は点を分離するので $a\in A$ を $a(x)\ne a(y)$ となるように選べます。すると

$$
h_{x,y}(z)
=f(x)+\frac{f(y)-f(x)}{a(y)-a(x)}\{a(z)-a(x)\}
$$

は $A$ に属し、

$$
h_{x,y}(x)=f(x),
\qquad
h_{x,y}(y)=f(y)
$$

を満たします。$x=y$ の場合は定数関数 $f(x)$ を使えば同じ二点補間の役割を果たします。

$x$ を固定します。各 $y\in K$ に対し

$$
U_y=\{z\in K:h_{x,y}(z)>f(z)-\varepsilon\}
$$

と置くと、$h_{x,y}(y)=f(y)$ なので $y\in U_y$ です。$U_y$ は開であり、$\{U_y\}_{y\in K}$ は $K$ の開被覆です。[コンパクト性](../TOP5/index.md#def-top5-compact)から有限個 $y_1,\dots,y_m$ を選べます。そこで

$$
g_x=\max\{h_{x,y_1},\dots,h_{x,y_m}\}\in B
$$

と置きます。全ての $h_{x,y_j}$ は $x$ で $f(x)$ に等しいため $g_x(x)=f(x)$ であり、有限被覆の作り方から全ての $z\in K$ で

$$
g_x(z)>f(z)-\varepsilon
$$

です。

今度は $x$ を動かし、

$$
V_x=\{z\in K:g_x(z)<f(z)+\varepsilon\}
$$

と置きます。$g_x(x)=f(x)$ なので $x\in V_x$ であり、$\{V_x\}_{x\in K}$ は開被覆です。再び[コンパクト性](../TOP5/index.md#def-top5-compact)から有限個 $x_1,\dots,x_r$ を選べます。最後に

$$
g=\min\{g_{x_1},\dots,g_{x_r}\}\in B
$$

と置きます。各 $g_{x_i}$ は全点で $f-\varepsilon$ より大きいので $g(z)>f(z)-\varepsilon$。一方、各 $z$ はどれか $V_{x_i}$ に入るため、その $i$ について $g_{x_i}(z)<f(z)+\varepsilon$ であり、最小値を取った $g$ も $g(z)<f(z)+\varepsilon$ です。従って $\|f-g\|_\infty\le\varepsilon$。

上の構成を最初から $\varepsilon/2$ に対して行えば、$\|f-g\|_\infty<\varepsilon$ を得ます。よって $f\in B=\overline A$。任意の $f\in C(K)$ について成り立つため $B=C(K)$ です。$\square$
<!-- proof-end -->

この証明では、[Weierstrass近似定理](#thm-ra8-weierstrass)を「多項式で全てを直接近似するため」ではなく、**絶対値を部分代数の閉包の中に作るため**に使っています。絶対値が作れればmax/minが作れ、コンパクト性で無限個の局所補間関数を有限個に圧縮できます。

### 多項式近似は直ちに回収できる

$K=[a,b]$ で $A$ を実多項式の制限全体とすれば、定数を含み点を分離します。従って[実Stone-Weierstrass定理](#thm-ra8-stone-weierstrass)から多項式が $C([a,b])$ に稠密であることが再び従います。ただし本章では循環を避けるため、[実Stone-Weierstrass定理](#thm-ra8-stone-weierstrass)の証明に先立ってBernstein多項式から[Weierstrass近似定理](#thm-ra8-weierstrass)を独立に証明しました。

---

## 7. 演習A

### A01 一様ノルム
- Level: A

$K=[-1,1]$、$f(x)=x^2$、$g(x)=1/2$ とする。$\|f-g\|_\infty$ を求めよ。

<!-- solution-start -->
$|x^2-1/2|$ は $x^2\in[0,1]$ に対して最大 $1/2$。従って $\|f-g\|_\infty=1/2$。
<!-- solution-end -->

### A02 共通Lipschitz定数
- Level: A

$\mathcal F=\{f_a(x)=\sin(x+a):a\in\mathbb R\}$ を $[0,1]$ 上で考える。同程度連続か、各点有界かを判定せよ。

<!-- solution-start -->
任意の $x,y,a$ に対し $|\sin(x+a)-\sin(y+a)|\le|x-y|$ なので共通Lipschitz定数1を持ち、同程度連続。さらに $|f_a(x)|\le1$ なので各点有界。従って[Arzela-Ascoli定理](#thm-ra8-arzela-ascoli)により相対コンパクト。
<!-- solution-end -->

### A03 $x^n$ の破綻点
- Level: A

$\{x^n:n\ge1\}\subset C([0,1])$ が同程度連続でないことを、$x=1$ の近くで定義から示せ。

<!-- solution-start -->
$\varepsilon=1/2$ を固定する。任意の $\delta>0$ に対し $y\in(0,1)$ を $1-y<\delta$ と選び、その後 $n$ を十分大きくして $y^n<1/2$ とする。すると $|1-y|<\delta$ なのに $|1-y^n|>1/2$。共通の $\delta$ は存在しない。
<!-- solution-end -->

### A04 Bernstein多項式
- Level: A

$f(t)=t^2$ に対し

$$
B_nf(x)=x^2+\frac{x(1-x)}n
$$

を示し、$\|B_nf-f\|_\infty$ を求めよ。

<!-- solution-start -->
$p_{n,k}(x)=\binom nkx^k(1-x)^{n-k}$ と置く。$k^2=k(k-1)+k$ と

$$
k\binom nk=n\binom{n-1}{k-1},
\qquad
k(k-1)\binom nk=n(n-1)\binom{n-2}{k-2}
$$

を使うと、二項展開から

$$
\sum_{k=0}^n k\,p_{n,k}(x)=nx,
$$

および

$$
\sum_{k=0}^n k(k-1)p_{n,k}(x)=n(n-1)x^2
$$

を得る。従って

$$
\begin{aligned}
B_nf(x)
&=\sum_{k=0}^n\frac{k^2}{n^2}p_{n,k}(x)\\
&=\frac{n(n-1)x^2+nx}{n^2}\\
&=x^2+\frac{x(1-x)}n.
\end{aligned}
$$

よって誤差は $x(1-x)/n$。$[0,1]$ で $x(1-x)$ の最大値は $1/4$ なので

$$
\|B_nf-f\|_\infty=\frac1{4n}.
$$
<!-- solution-end -->

---

## 8. 演習B

### B01 小さく振動する列
- Level: B

$f_n(x)=\sin(nx)/n$ を $[0,1]$ 上で考える。この関数族が同程度連続かつ各点有界であることを示し、実際の一様収束先も求めよ。

<!-- solution-start -->
$|f_n'(x)|=|\cos(nx)|\le1$ なので、1変数の平均値定理から $|f_n(x)-f_n(y)|\le|x-y|$。従って共通Lipschitz定数1を持つ。また $|f_n(x)|\le1/n\le1$ なので各点有界。さらに

$$
\|f_n\|_\infty\le\frac1n\to0,
$$

よって列全体が0へ一様収束する。
<!-- solution-end -->

### B02 各点収束しても部分列を救えない例
- Level: B

$f_n(x)=x^n$ の任意の部分列も一様収束しないことを示せ。

<!-- solution-start -->
任意の部分列 $x^{n_k}$ も $x<1$ では0、$x=1$ では1へ各点収束する。したがって一様収束するなら収束先は

$$
f(x)=0\ (x<1),\qquad f(1)=1
$$

でなければならない。しかしこれは不連続。[一様収束で連続性が保存される定理](../RA5/index.md#thm-ra5-continuity)に反するので、どの部分列も一様収束しない。
<!-- solution-end -->

### B03 多項式代数
- Level: B

$K=[a,b]$ 上の実多項式の制限全体が[実Stone-Weierstrass定理](#thm-ra8-stone-weierstrass)の仮定を満たすことを確認せよ。

<!-- solution-start -->
多項式は和・実数倍・積で閉じ、定数多項式を含む。異なる $x,y\in[a,b]$ に対し $p(t)=t$ と取れば $p(x)\ne p(y)$ なので点を分離する。従って[実Stone-Weierstrass定理](#thm-ra8-stone-weierstrass)により $C([a,b])$ に一様ノルムで稠密。
<!-- solution-end -->

---

## 9. 演習C

### C01 微分係数で関数列を一様に捕まえる
- Level: C

$(f_n)\subset C^1([0,1])$ が

$$
|f_n(0)|\le1,
\qquad
|f_n'(x)|\le1
\quad(0\le x\le1)
$$

を全ての $n$ で満たすとする。

1. $(f_n)$ が一様収束部分列を持つことを示せ。
2. さらに $f_n(0)\to a$、$f_n'\to g$ が一様収束するとき、列全体の一様収束先を求めよ。

<!-- solution-start -->
1変数の平均値定理から

$$
|f_n(x)-f_n(y)|\le|x-y|,
$$

なので関数族は同程度連続。また

$$
|f_n(x)|\le|f_n(0)|+|x|\le2
$$

なので各点有界。[Arzela-Ascoli定理](#thm-ra8-arzela-ascoli)により一様収束部分列を持つ。

追加仮定の下では[微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2)から

$$
f_n(x)=f_n(0)+\int_0^x f_n'(t)\,dt.
$$

従って

$$
\sup_{x\in[0,1]}
\left|f_n(x)-\left(a+\int_0^x g(t)\,dt\right)\right|
\le |f_n(0)-a|+\|f_n'-g\|_\infty\to0.
$$

よって列全体が

$$
f(x)=a+\int_0^xg(t)\,dt
$$

へ一様収束する。
<!-- solution-end -->

---

## 10. 章末チェック

- $C(K)$ の一様ノルムCauchy列から、点ごとの収束先と一様収束先を同じ量化で作れる。
- 同程度連続性で「関数ごとの連続性」ではなく関数族全体の共通制御を要求する理由を説明できる。
- [Arzela-Ascoli定理](#thm-ra8-arzela-ascoli)の十分性を「有限点集合 → 可算稠密集合 → 対角部分列 → 一様Cauchy」の順で再構成できる。
- 各点有界だけでは $x^n$ を排除できず、同程度連続性が必要であることを示せる。
- Bernstein多項式の二次偏差評価から[Weierstrass近似定理](#thm-ra8-weierstrass)を一様に証明できる。
- [実Stone-Weierstrass定理](#thm-ra8-stone-weierstrass)で、[Weierstrass近似定理](#thm-ra8-weierstrass)が $|f|$ を作り、そこからmax/minと有限部分被覆へ進む論理を再構成できる。
