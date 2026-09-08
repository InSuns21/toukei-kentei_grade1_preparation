# MT6 標準測度論 VII：C0 版 Riesz–Markov

MT5 では局所コンパクト Hausdorff 空間 $X$ 上の正線形汎関数

$$
L:C_c(X)\to\mathbb R
$$

を Radon 測度で表しました。本章では、その正汎関数版を出発点にして、実数値 $C_0(X)$ の任意の有界線形汎関数まで拡張します。

到達点は

$$
\boxed{
C_0(X)^*
\cong
\{\text{有限符号付き Radon 測度}\}
}
$$

という対応と、そのノルム等式

$$
\boxed{
\|T\|=|\nu|(X)
}
$$

です。ただし一般の双対空間論を証明装置としては使いません。必要な正負分解は $C_0(X)$ の点ごとの順序から直接作ります。

本章の流れは次です。

```text
C0(X) を無限遠で 0 になる連続関数として定義
        ↓
一様ノルムで Banach lattice になることを直接証明
        ↓
LCH cutoff により Cc(X) が C0(X) で一様稠密
        ↓
正の有界汎関数を Cc(X) に制限 → MT5
        ↓
cutoff + open-inner regularity で表現測度の全質量を有限化
        ↓
非負関数集合上で T+ を supremum として構成
        ↓
min 分解で T+ の加法性 → T=T+−T−
        ↓
二つの有限 Radon 測度の差として符号付き測度を得る
        ↓
Jordan 分解 + domination で Jordan 部分も Radon
        ↓
互いに素な compact 集合 + cutoff で ||T||=|ν|(X)
        ↓
ノルム等式から一意性
```

---

## 1. C0 空間

以下、$X$ は局所コンパクト Hausdorff 空間とします。

<a id="def-mt6-c0"></a>
<!-- formal-statement-start -->
### 定義（C0 空間）

$C_0(X)$ を

$$
C_0(X)
:=
\left\{
f:X\to\mathbb R:
\begin{array}{l}
f\text{ は連続},\\
\forall\varepsilon>0,\
\{x\in X:|f(x)|\ge\varepsilon\}\text{ は compact}
\end{array}
\right\}
$$

と定める。この性質を **無限遠で 0 になる**という。

ノルムは

$$
\boxed{
\|f\|_\infty:=\sup_{x\in X}|f(x)|
}
$$

とする。
<!-- formal-statement-end -->

まず、この supremum が有限であることを確認します。$f\in C_0(X)$ に対し

$$
K:=\{x:|f(x)|\ge1\}
$$

は compact です。連続像 $|f|(K)$ は $\mathbb R$ の compact 集合なので有界です。$K$ の外では $|f|<1$ だから、$f$ は全 $X$ 上で有界です。

また $f\in C_c(X)$ なら $f\in C_0(X)$ です。実際、$\operatorname{supp}f$ が compact なら

$$
\{|f|\ge\varepsilon\}
\subseteq
\operatorname{supp}f
$$

であり、左辺は連続性により閉集合なので compact 集合の閉部分集合です。

---

## 2. C0 は Banach lattice

本章では点ごとの順序

$$
f\le g
\quad\Longleftrightarrow\quad
f(x)\le g(x)\ \ (\forall x\in X)
$$

を使います。

<a id="thm-mt6-c0-banach-lattice"></a>
<!-- formal-statement-start -->
### 定理（C0 は Banach lattice）

$C_0(X)$ は一様ノルムに関して実 Banach 空間であり、さらに

$$
|f|,
\qquad
f\vee g:=\max(f,g),
\qquad
f\wedge g:=\min(f,g)
$$

が再び $C_0(X)$ に属する。

また

$$
|f|\le|g|
\quad\Longrightarrow\quad
\|f\|_\infty\le\|g\|_\infty
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 2.1 線形空間として閉じる

$f,g\in C_0(X)$、$a,b\in\mathbb R$ とします。連続性は保たれます。

$a=b=0$ なら自明です。一般に $M:=|a|+|b|>0$ と置くと、

$$
|af(x)+bg(x)|\ge\varepsilon
$$

なら

$$
|f(x)|\ge\frac{\varepsilon}{M}
\quad\text{または}\quad
|g(x)|\ge\frac{\varepsilon}{M}
$$

です。従って

$$
\{|af+bg|\ge\varepsilon\}
\subseteq
\{|f|\ge\varepsilon/M\}
\cup
\{|g|\ge\varepsilon/M\}.
$$

右辺は compact です。左辺は閉集合なので、右辺の閉部分集合として compact です。よって $af+bg\in C_0(X)$ です。

#### 2.2 lattice 演算

$|f|$ は連続で

$$
\{x:|f(x)|\ge\varepsilon\}
=
\{|f|\ge\varepsilon\}
$$

なので $|f|\in C_0(X)$ です。また

$$
f\vee g
=
\frac{f+g+|f-g|}{2},
$$

$$
f\wedge g
=
\frac{f+g-|f-g|}{2}
$$

だから、線形演算と絶対値で閉じることから $f\vee g,f\wedge g\in C_0(X)$ です。

また $|f|\le|g|$ なら各 $x$ で

$$
|f(x)|\le|g(x)|\le\|g\|_\infty
$$

なので、supremum を取れば $\|f\|_\infty\le\|g\|_\infty$ です。

#### 2.3 完備性

$(f_n)$ を一様ノルムの Cauchy 列とします。各 $x\in X$ について $(f_n(x))$ は実数の Cauchy 列なので極限

$$
f(x):=\lim_{n\to\infty}f_n(x)
$$

が存在します。

任意の $\varepsilon>0$ に対し、ある $N$ が存在して $m,n\ge N$ なら

$$
\|f_n-f_m\|_\infty<\varepsilon
$$

です。$m\to\infty$ とすると全 $x$ で

$$
|f_n(x)-f(x)|\le\varepsilon,
$$

従って $\|f_n-f\|_\infty\to0$ です。ここから $f$ の連続性を直接確認すると、$x_0\in X$ と $\varepsilon>0$ に対し $n$ を

$$
\|f-f_n\|_\infty<\varepsilon/3
$$

となるように固定し、$f_n$ の $x_0$ での連続性を使えば、$x_0$ のある近傍 $U$ で

$$
|f_n(x)-f_n(x_0)|<\varepsilon/3
$$

となります。従って $x\in U$ なら

$$
|f(x)-f(x_0)|<\varepsilon.
$$

最後に $f$ が無限遠で 0 になることを示します。$\varepsilon>0$ に対し $n$ を

$$
\|f-f_n\|_\infty<\varepsilon/2
$$

となるように取ります。すると

$$
\{|f|\ge\varepsilon\}
\subseteq
\{|f_n|\ge\varepsilon/2\}.
$$

右辺は compact、左辺は $f$ の連続性により閉です。従って左辺も compact です。

よって $f\in C_0(X)$ かつ $\|f_n-f\|_\infty\to0$ であり、$C_0(X)$ は完備です。$\square$
<!-- proof-end -->

ここで重要なのは、空間 $X$ 自体の compact 性を仮定していないことです。完備性は「極限との差を一様ノルムで抑えること」と「各 $f_n$ が大きくなる場所は compact」という二つを組み合わせて出ています。

---

## 3. Cc は C0 に一様稠密

<a id="thm-mt6-cc-dense-c0"></a>
<!-- formal-statement-start -->
### 定理（Cc の C0 稠密性）

任意の $f\in C_0(X)$ と $\varepsilon>0$ に対し、ある $g\in C_c(X)$ が存在して

$$
\boxed{
\|f-g\|_\infty<\varepsilon
}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
K:=\{x\in X:|f(x)|\ge\varepsilon\}
$$

と置きます。$K$ は compact です。

$K=\varnothing$ なら $g=0$ でよいので、以下 $K\ne\varnothing$ とします。

[局所コンパクト Hausdorff 空間の cutoff](../TOP5/index.md#thm-top5-lch-cutoff)を $K\subset X$ に適用し、

$$
\chi\in C_c(X),
\qquad
0\le\chi\le1,
\qquad
\chi=1\text{ on }K
$$

を取ります。

$$
g:=\chi f
$$

と置けば $g$ は連続で

$$
\operatorname{supp}g
\subseteq
\operatorname{supp}\chi,
$$

従って $g\in C_c(X)$ です。

$K$ 上では $g=f$ です。$X\setminus K$ では $|f|<\varepsilon$ かつ $0\le\chi\le1$ なので

$$
|f-g|
=|1-\chi|\,|f|
<\varepsilon.
$$

従って全 $X$ で $\|f-g\|_\infty<\varepsilon$ です。$\square$
<!-- proof-end -->

この一行の cutoff が、MT5 の $C_c(X)$ の世界と本章の $C_0(X)$ の世界をつなぎます。

---

## 4. 正の有界汎関数は有限 Radon 測度になる

$T:C_0(X)\to\mathbb R$ を有界線形汎関数とし、

$$
\|T\|
:=
\sup_{\|f\|_\infty\le1}|T(f)|
$$

と書きます。

$T$ が **正**であるとは、$f\ge0$ なら $T(f)\ge0$ となることです。

<a id="thm-mt6-positive-representation"></a>
<!-- formal-statement-start -->
### 定理（正有界汎関数の有限 Radon 表現）

$T:C_0(X)\to\mathbb R$ を正の有界線形汎関数とする。このとき一意な有限 Radon 測度 $\mu$ が存在して

$$
\boxed{
T(f)=\int_X f\,d\mu
\qquad
(\forall f\in C_0(X))
}
$$

となる。さらに

$$
\boxed{
\|T\|=\mu(X)
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 4.1 MT5 へ制限する

$C_c(X)\subset C_0(X)$ なので、制限

$$
L:=T|_{C_c(X)}
$$

は $C_c(X)$ 上の正線形汎関数です。

[MT5 の正汎関数版 Riesz–Markov](../MT5/index.md#thm-mt5-riesz-markov-positive)により、一意な Radon 測度 $\mu$ が存在して

$$
T(g)=L(g)=\int_Xg\,d\mu
\qquad(g\in C_c(X))
$$

となります。

#### 4.2 測度の全質量が有限である

compact $K\subseteq X$ を任意に取ります。[cutoff](../TOP5/index.md#thm-top5-lch-cutoff)により

$$
\chi\in C_c(X),
\qquad
0\le\chi\le1,
\qquad
\chi=1\text{ on }K
$$

を取れます。すると

$$
\mu(K)
\le
\int_X\chi\,d\mu
=T(\chi)
\le
\|T\|\,\|\chi\|_\infty
\le
\|T\|.
$$

$X$ 自身は open なので、Radon 測度の open-inner regularity から

$$
\mu(X)
=
\sup_{K\subseteq X\text{ compact}}\mu(K)
\le
\|T\|.
$$

従って $\mu$ は有限です。

#### 4.3 C0 全体へ表示を延長する

$f\in C_0(X)$ を固定します。Cc の稠密性から $g_n\in C_c(X)$ を

$$
\|g_n-f\|_\infty\to0
$$

となるように取れます。有界性から

$$
T(g_n)\to T(f).
$$

一方 $\mu(X)<\infty$ なので

$$
\left|
\int_X(g_n-f)\,d\mu
\right|
\le
\|g_n-f\|_\infty\mu(X)
\to0.
$$

従って

$$
T(f)
=
\lim_nT(g_n)
=
\lim_n\int g_n\,d\mu
=
\int f\,d\mu.
$$

#### 4.4 ノルム

任意の $f\in C_0(X)$ に対し

$$
|T(f)|
\le
\int|f|\,d\mu
\le
\|f\|_\infty\mu(X),
$$

従って $\|T\|\le\mu(X)$ です。4.2 の逆向きと合わせて

$$
\|T\|=\mu(X).
$$

#### 4.5 一意性

別の有限 Radon 測度 $\lambda$ も $C_0(X)$ 上で $T$ を表すなら、特に全ての $g\in C_c(X)$ で

$$
\int g\,d\lambda=T(g)=\int g\,d\mu.
$$

MT5 の一意性により $\lambda=\mu$ です。$\square$
<!-- proof-end -->

非 compact な $X$ では定数関数 $1$ が $C_0(X)$ に属するとは限りません。それでも $\|T\|=\mu(X)$ が出るのは、compact 集合上で $1$ となる cutoff が「局所的な定数1」の役割を果たすからです。

---

## 5. 任意の有界汎関数から正部分を作る

ここから $T$ の正性を外します。鍵は非負関数集合

$$
C_0(X)_+
:=
\{f\in C_0(X):f\ge0\}
$$

上で、$T$ の「可能な正の寄与」を supremum で拾うことです。

<a id="def-mt6-positive-envelope"></a>
<!-- formal-statement-start -->
### 定義（正部分 envelope）

有界線形汎関数 $T:C_0(X)\to\mathbb R$ と $f\in C_0(X)_+$ に対し

$$
\boxed{
T^+(f)
:=
\sup\{T(g):0\le g\le f\}
}
$$

と定める。
<!-- formal-statement-end -->

$g=0$ が候補なので $T^+(f)\ge0$ です。また $0\le g\le f$ なら

$$
\|g\|_\infty\le\|f\|_\infty
$$

なので

$$
T(g)
\le
|T(g)|
\le
\|T\|\,\|f\|_\infty.
$$

従って supremum は有限で

$$
0\le T^+(f)\le\|T\|\,\|f\|_\infty.
$$

<a id="lem-mt6-positive-envelope-additive"></a>
<!-- formal-statement-start -->
### 補題（正部分 envelope の加法性）

$f,h\in C_0(X)_+$ と $a\ge0$ に対し

$$
\boxed{
T^+(f+h)=T^+(f)+T^+(h),
\qquad
T^+(af)=aT^+(f)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正の斉次性は $a=0$ なら自明です。$a>0$ なら

$$
0\le g\le af
\quad\Longleftrightarrow\quad
0\le g/a\le f
$$

なので supremum の候補が一対一に対応し、$T^+(af)=aT^+(f)$ です。

加法性を示します。

まず $0\le g_1\le f$, $0\le g_2\le h$ なら

$$
0\le g_1+g_2\le f+h
$$

なので

$$
T(g_1)+T(g_2)
=T(g_1+g_2)
\le T^+(f+h).
$$

$g_1,g_2$ をそれぞれ supremum へ任意に近づければ

$$
T^+(f)+T^+(h)
\le T^+(f+h).
$$

逆向きが本質です。$0\le g\le f+h$ を任意に取ります。C0 の lattice 演算を使い

$$
g_1:=g\wedge f,
$$

$$
g_2:=g-g_1=(g-f)^+
$$

と置きます。すると

$$
0\le g_1\le f.
$$

また $g\le f+h$ から $g-f\le h$ なので

$$
0\le g_2=(g-f)^+\le h.
$$

しかも $g=g_1+g_2$ です。従って

$$
T(g)
=T(g_1)+T(g_2)
\le
T^+(f)+T^+(h).
$$

全ての $0\le g\le f+h$ について supremum を取れば

$$
T^+(f+h)
\le
T^+(f)+T^+(h).
$$

両向きを合わせて等号です。$\square$
<!-- proof-end -->

この $g_1=g\wedge f$ と $g_2=(g-f)^+$ が、正部分の加法性を支える **min 分解**です。一般の線形空間ではなく、$C_0(X)$ が lattice であることがここで初めて本格的に効きます。

---

## 6. 非負関数集合上の加法写像を線形化する

<a id="lem-mt6-cone-extension"></a>
<!-- formal-statement-start -->
### 補題（非負関数集合上の加法写像の線形拡張）

$F:C_0(X)_+\to[0,\infty)$ が加法的かつ非負スカラーについて斉次的であるとする。このとき一意な正線形汎関数 $\widetilde F:C_0(X)\to\mathbb R$ が存在し、$f\ge0$ では

$$
\widetilde F(f)=F(f)
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $u\in C_0(X)$ は

$$
u=u^+-u^-
$$

と正関数の差に書けます。より一般に $u=p-q$ ($p,q\ge0$) と書いたとき

$$
\widetilde F(u):=F(p)-F(q)
$$

と定めます。

well-defined 性を確認します。同じ $u$ が

$$
p-q=p'-q'
$$

とも書けたなら

$$
p+q'=p'+q.
$$

非負関数集合上の加法性から

$$
F(p)+F(q')=F(p')+F(q),
$$

従って

$$
F(p)-F(q)=F(p')-F(q').
$$

よって定義は分解に依存しません。

$u=p-q$, $v=r-s$ なら

$$
u+v=(p+r)-(q+s)
$$

なので加法性が従います。非負スカラー倍は仮定から、負のスカラー倍は

$$
\widetilde F(-u)=-\widetilde F(u)
$$

から従います。従って $\widetilde F$ は実線形です。

$f\ge0$ なら $f=f-0$ と書けるため

$$
\widetilde F(f)=F(f)\ge0,
$$

すなわち正です。一意性は $u=u^+-u^-$ と全ての関数が正関数の差に分解できることから従います。$\square$
<!-- proof-end -->

<a id="thm-mt6-functional-positive-negative"></a>
<!-- formal-statement-start -->
### 定理（有界汎関数の正負分解）

任意の有界線形汎関数 $T:C_0(X)\to\mathbb R$ に対し、正の有界線形汎関数 $T^+,T^-$ が存在して

$$
\boxed{
T=T^+-T^-
}
$$

となる。ここで $T^+$ は非負関数集合上では正部分 envelope で与えられ、

$$
T^-:=T^+-T
$$

である。また

$$
\boxed{
\|T^+\|\le\|T\|,
\qquad
\|T^-\|\le\|T\|
}
$$

なので両者は有界である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[正部分 envelope の加法性](#lem-mt6-positive-envelope-additive)により $T^+$ は非負関数集合上で加法的・非負斉次です。従って[非負関数集合上の加法写像の線形拡張](#lem-mt6-cone-extension)により、同じ記号 $T^+$ で表す正線形汎関数へ一意に延長できます。

まず $T^+$ の有界性を示します。正性から $-|u|\le u\le|u|$ に対し

$$
-T^+(|u|)
\le
T^+(u)
\le
T^+(|u|).
$$

従って

$$
|T^+(u)|
\le
T^+(|u|)
\le
\|T\|\,\||u|\|_\infty
=
\|T\|\,\|u\|_\infty.
$$

よって $\|T^+\|\le\|T\|$ です。

次に $T^-:=T^+-T$ と置きます。$f\ge0$ なら正部分 envelope の候補として $g=f$ を取れるので

$$
T^+(f)\ge T(f),
$$

従って $T^-(f)\ge0$、すなわち $T^-$ も正です。さらに $0\le g\le f$ に対し $h=f-g$ と置けば $0\le h\le f$ で

$$
T(g)-T(f)=-T(h).
$$

したがって非負関数集合上で

$$
T^-(f)
=T^+(f)-T(f)
=\sup_{0\le h\le f}(-T(h)),
$$

つまり $T^-$ は $-T$ の正部分 envelope です。先ほど $T^+$ に示した評価を $-T$ に適用して

$$
\|T^-\|\le\|-T\|=\|T\|.
$$

定義から直ちに $T=T^+-T^-$ です。$\square$
<!-- proof-end -->

この段階では $T^+,T^-$ が「互いに特異」であることを仮定していません。測度側では後で Jordan 分解を取り、余分に共通している正質量を自動的に落とします。

---

## 7. 有限符号付き Radon 測度

<a id="def-mt6-finite-signed-radon"></a>
<!-- formal-statement-start -->
### 定義（有限符号付き Radon 測度）

有限符号付き Borel 測度 $\nu$ が **有限符号付き Radon 測度**であるとは、[Jordan 分解](../MT2/index.md#thm-mt2-jordan)

$$
\nu=\nu^+-\nu^-
$$

の正部分 $\nu^+$ と負部分 $\nu^-$ がともに MT5 の意味で有限 Radon 測度であることをいう。
<!-- formal-statement-end -->

この定義なら全変動

$$
|\nu|=\nu^++\nu^-
$$

も有限 Radon 測度です。

次の小さな補題が、正汎関数から得た二つの Radon 測度の差をこの定義へ接続します。

<a id="lem-mt6-radon-domination"></a>
<!-- formal-statement-start -->
### 補題（有限 Radon 測度の domination による正則性）

$\mu$ を有限 Radon 測度、$\lambda$ を有限正 Borel 測度とし

$$
0\le\lambda\le\mu
$$

とする。このとき $\lambda$ も有限 Radon 測度である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

compact-finite は

$$
\lambda(K)\le\mu(K)<\infty
$$

から従います。

open $U$ と $\varepsilon>0$ を固定します。$\mu$ の open-inner regularity から compact $K\subseteq U$ を

$$
\mu(U)-\mu(K)
=
\mu(U\setminus K)
<\varepsilon
$$

となるように取れます。すると

$$
0\le
\lambda(U)-\lambda(K)
=
\lambda(U\setminus K)
\le
\mu(U\setminus K)
<\varepsilon.
$$

従って

$$
\lambda(U)
=
\sup_{K\subseteq U\text{ compact}}\lambda(K).
$$

次に Borel $A$ を固定します。$\mu$ の outer regularity と有限性から open $U\supseteq A$ を

$$
\mu(U)-\mu(A)
=
\mu(U\setminus A)
<\varepsilon
$$

となるように取れます。すると

$$
0\le
\lambda(U)-\lambda(A)
=
\lambda(U\setminus A)
\le
\mu(U\setminus A)
<\varepsilon.
$$

従って $\lambda$ も Borel-outer regular です。以上で Radon の三条件が揃いました。$\square$
<!-- proof-end -->

<a id="lem-mt6-difference-radon"></a>
<!-- formal-statement-start -->
### 補題（有限 Radon 測度の差は有限符号付き Radon）

$\alpha,\beta$ を有限 Radon 測度とする。このとき

$$
\nu:=\alpha-\beta
$$

は有限符号付き Radon 測度である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\nu$ は有限符号付き Borel 測度です。[Jordan 分解の最小性](../MT2/index.md#thm-mt2-jordan-minimal)から

$$
\nu^+\le\alpha,
\qquad
\nu^-\le\beta.
$$

直前の domination 補題をそれぞれ適用すれば $\nu^+,\nu^-$ は有限 Radon 測度です。従って定義より $\nu$ は有限符号付き Radon 測度です。$\square$
<!-- proof-end -->

有限 Radon 測度 $\alpha,\beta$ の和も有限 Radon です。compact-finite は自明です。open $U$ では $\alpha(U),\beta(U)$ をそれぞれ compact $K_\alpha,K_\beta\subseteq U$ で任意精度に近似し、$K_\alpha\cup K_\beta$ を取れば open-inner regularity が従います。Borel $A$ では $\alpha,\beta$ それぞれの outer regularity から open $U_\alpha,U_\beta\supseteq A$ を取り、$U_\alpha\cap U_\beta$ を使えば outer regularity が従います。

弱めの Radon 規約を採用している MT5 では、「差だから Jordan 部分も自動的に正則」と一言で済ませるのは危険です。ここで domination を一段挟むことで、その穴を明示的に閉じています。

---

## 8. 任意の有界汎関数の測度表示

<a id="thm-mt6-general-existence"></a>
<!-- formal-statement-start -->
### 定理（任意の有界汎関数の有限符号付き Radon 表示）

任意の有界線形汎関数

$$
T:C_0(X)\to\mathbb R
$$

に対し、ある有限符号付き Radon 測度 $\nu$ が存在して

$$
\boxed{
T(f)=\int_Xf\,d\nu
\qquad
(\forall f\in C_0(X))
}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有界汎関数の正負分解から

$$
T=T^+-T^-
$$

と書け、$T^+,T^-$ は正の有界線形汎関数です。

正有界汎関数の有限 Radon 表現をそれぞれに適用すると、有限 Radon 測度 $\mu^+,\mu^-$ が存在して

$$
T^+(f)=\int f\,d\mu^+,
$$

$$
T^-(f)=\int f\,d\mu^-.
$$

そこで

$$
\nu:=\mu^+-\mu^-
$$

と置きます。[有限 Radon 測度の差は有限符号付き Radon](#lem-mt6-difference-radon)より $\nu$ は有限符号付き Radon 測度です。また符号付き積分の線形性から

$$
T(f)
=T^+(f)-T^-(f)
=
\int f\,d\mu^+-\int f\,d\mu^-
=
\int f\,d\nu.
$$

$\square$
<!-- proof-end -->

ここで $\mu^+,\mu^-$ を Jordan 部分だとは主張していません。Jordan 分解の最小性を通すことで、最終的な $\nu^+,\nu^-$ だけが測度として本質的な正負部分になります。

---

## 9. 有限符号付き Radon 測度から有界汎関数へ

有限符号付き Radon 測度 $\nu$ に対し

$$
T_\nu(f)
:=
\int_Xf\,d\nu
\qquad(f\in C_0(X))
$$

と置きます。

$C_0(X)$ の関数は有界で $|\nu|(X)<\infty$ なので全て $|\nu|$-可積分です。

<a id="thm-mt6-signed-norm"></a>
<!-- formal-statement-start -->
### 定理（有限符号付き Radon 測度のノルム等式）

$\nu$ を有限符号付き Radon 測度とする。このとき $T_\nu$ は有界線形汎関数で

$$
\boxed{
\|T_\nu\|=|\nu|(X)
}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 9.1 上からの評価

[全変動による積分評価](../MT2/index.md#thm-mt2-integral-bound)から

$$
|T_\nu(f)|
=
\left|\int f\,d\nu\right|
\le
\int|f|\,d|\nu|
\le
\|f\|_\infty|\nu|(X).
$$

従って

$$
\|T_\nu\|\le|\nu|(X).
$$

#### 9.2 Jordan 分解から互いに素な compact 集合を作る

逆向きを示します。$|\nu|(X)=0$ なら自明なので、以下任意の $\eta>0$ を固定し

$$
\delta:=\eta/5
$$

と置きます。

[Hahn 分解](../MT2/index.md#thm-mt2-hahn)に対応する Borel 分割

$$
X=P\sqcup N
$$

を取り、

$$
\nu^-(P)=0,
\qquad
\nu^+(N)=0
$$

とします。

$\nu^+$ の Borel-outer regularity と $\nu^+(N)=0$ から、open $G\supseteq N$ を

$$
\nu^+(G)<\delta
$$

となるように取れます。

$\nu^-$ は $N$ に集中しているので $\nu^-(G)=\nu^-(X)$ です。$G$ 上の open-inner regularity から compact $K^-\subseteq G$ を

$$
\nu^-(K^-)
>
\nu^-(X)-\delta
$$

となるように取ります。

一方、$X$ 上の $\nu^+$ の open-inner regularity から compact $K_0^+\subseteq X$ を

$$
\nu^+(K_0^+)
>
\nu^+(X)-\delta
$$

となるように取ります。そこで

$$
K^+:=K_0^+\setminus G
$$

と置きます。$G$ は open なので $K^+$ は compact $K_0^+$ の閉部分集合で compact です。また $K^-\subseteq G$ だから

$$
K^+\cap K^-=\varnothing.
$$

さらに

$$
\nu^+(K^+)
\ge
\nu^+(K_0^+)-\nu^+(G)
>
\nu^+(X)-2\delta.
$$

#### 9.3 cutoff で符号を連続関数へ移す

[cutoff](../TOP5/index.md#thm-top5-lch-cutoff)を $K^-\subset G$ に適用し、

$$
0\le\phi^-\le1,
\qquad
\phi^-=1\text{ on }K^-,
\qquad
\operatorname{supp}\phi^-\subseteq G
$$

となる $\phi^-\in C_c(X)$ を取ります。

$C^-:=\operatorname{supp}\phi^-$ は compact です。Hausdorff 空間では compact 集合は閉なので $X\setminus C^-$ は open です。$K^+\cap C^-=\varnothing$ だから、再び cutoff を使い

$$
0\le\phi^+\le1,
\qquad
\phi^+=1\text{ on }K^+,
\qquad
\operatorname{supp}\phi^+\subseteq X\setminus C^-
$$

となる $\phi^+\in C_c(X)$ を取ります。

二つの support は互いに素です。従って

$$
f:=\phi^+-\phi^-
$$

と置けば $f\in C_c(X)\subset C_0(X)$ かつ

$$
\|f\|_\infty\le1.
$$

正の主項は

$$
\int\phi^+\,d\nu^+
\ge
\nu^+(K^+)
>
\nu^+(X)-2\delta,
$$

$$
\int\phi^-\,d\nu^-
\ge
\nu^-(K^-)
>
\nu^-(X)-\delta.
$$

交差項について、$\operatorname{supp}\phi^-\subseteq G$ だから

$$
\int\phi^-\,d\nu^+
\le
\nu^+(G)
<\delta.
$$

また $K^-\subseteq C^-$ かつ $\operatorname{supp}\phi^+\subseteq X\setminus C^-$ なので

$$
\int\phi^+\,d\nu^-
\le
\nu^-(X\setminus K^-)
<\delta.
$$

従って

$$
\begin{aligned}
T_\nu(f)
&=
\int\phi^+\,d\nu^+
-\int\phi^+\,d\nu^-
-\int\phi^-\,d\nu^+
+\int\phi^-\,d\nu^-\\
&>
\nu^+(X)+\nu^-(X)-5\delta\\
&=
|\nu|(X)-\eta.
\end{aligned}
$$

$\|f\|_\infty\le1$ だから

$$
\|T_\nu\|
\ge
|T_\nu(f)|
>
|\nu|(X)-\eta.
$$

$\eta>0$ は任意なので

$$
\|T_\nu\|\ge|\nu|(X).
$$

9.1 と合わせて等号です。$\square$
<!-- proof-end -->

この証明では、Hahn 分解の可測な符号関数をそのまま $C_0(X)$ に入れていません。Radon 正則性で質量の大半を **互いに素な compact 集合**へ押し込み、LCH cutoff でその符号を連続関数へ移しています。ここがノルム等式の核心です。

---

## 10. 実数値 C0 版 Riesz–Markov

<a id="thm-mt6-riesz-markov-c0"></a>
<!-- formal-statement-start -->
### 定理（Riesz–Markov：実数値 C0 版）

$X$ を局所コンパクト Hausdorff 空間とする。任意の有界線形汎関数

$$
T:C_0(X)\to\mathbb R
$$

に対し、一意な有限符号付き Radon 測度 $\nu$ が存在して

$$
\boxed{
T(f)=\int_Xf\,d\nu
\qquad
(\forall f\in C_0(X))
}
$$

となる。さらに

$$
\boxed{
\|T\|=|\nu|(X)
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

存在は任意の有界汎関数の有限符号付き Radon 表示で証明済みです。ノルム等式は[有限符号付き Radon 測度のノルム等式](#thm-mt6-signed-norm)から従います。

一意性を示します。$\nu_1,\nu_2$ がともに $T$ を表す有限符号付き Radon 測度だとします。

$$
\sigma:=\nu_1-\nu_2
$$

と置きます。$\nu_i^+,\nu_i^-$ は有限 Radon 測度なので

$$
\sigma
=
(\nu_1^++\nu_2^-)
-
(\nu_1^-+\nu_2^+)
$$

は有限 Radon 測度二つの差です。従って[有限 Radon 測度の差は有限符号付き Radon](#lem-mt6-difference-radon)により $\sigma$ は有限符号付き Radon 測度です。

全ての $f\in C_0(X)$ で

$$
T_\sigma(f)
=
\int f\,d\nu_1-
\int f\,d\nu_2
=0.
$$

従って $\|T_\sigma\|=0$ です。ノルム等式から

$$
|\sigma|(X)=0.
$$

よって $\sigma=0$、すなわち $\nu_1=\nu_2$ です。$\square$
<!-- proof-end -->

この一意性は「$C_c$ 上の一意性」をもう一度 open set から証明し直してはいません。符号付き測度では、全変動ノルムと汎関数ノルムが一致すること自体が一意性を即座に与えます。

---

## 11. 典型例と境界

### 11.1 compact 空間では C0 と C が一致する

$X$ が compact なら任意の連続関数 $f$ に対し

$$
\{|f|\ge\varepsilon\}
$$

は compact の閉部分集合なので compact です。従って

$$
C_0(X)=C(X).
$$

この場合、本章の定理は「$C(X)$ の有界実線形汎関数は有限符号付き Radon 測度で一意に表される」となります。

正汎関数なら定数関数 $1\in C(X)$ を使えて

$$
\|T\|=T(1)=\mu(X)
$$

です。非 compact 空間では定数1の代わりを cutoff が担いました。

### 11.2 自然数の離散空間では c0 と l1 の対応になる

$X=\mathbb N$ に離散位相を入れます。compact 集合は有限集合なので

$$
f\in C_0(\mathbb N)
\quad\Longleftrightarrow\quad
f(n)\to0.
$$

従って $C_0(\mathbb N)$ は通常の実数値数列空間 $c_0$ です。

有限符号付き Radon 測度 $\nu$ は各点の重み

$$
a_n:=\nu(\{n\})
$$

で決まり、

$$
|\nu|(\mathbb N)
=
\sum_{n=1}^\infty|a_n|<\infty.
$$

従って

$$
T(f)
=
\sum_{n=1}^\infty a_nf(n),
$$

$$
\|T\|
=
\sum_{n=1}^\infty|a_n|.
$$

つまり本章の定理は、具体的には「$c_0$ の連続双対が絶対可算和可能な係数列で表される」という事実を含みます。

### 11.3 点評価

$x_0\in X$ に対し

$$
T(f):=f(x_0)
$$

と置くと、表現測度は Dirac 測度 $\delta_{x_0}$ です。

$$
|\delta_{x_0}|(X)=1
$$

だから

$$
\|T\|=1.
$$

### 11.4 MT5 では許されたが本章では許されない測度

$X=\mathbb N$ の counting measure $m$ は Radon です。compact 集合が有限だから compact-finite であり、離散位相では正則性も成立します。しかし

$$
m(X)=\infty.
$$

従って MT5 では

$$
L(g)=\sum_{n=1}^\infty g(n)
\qquad(g\in C_c(\mathbb N))
$$

は正線形汎関数として問題ありません。$g$ は有限 support なので和は有限です。

一方 $C_0(\mathbb N)=c_0$ では、例えば

$$
f(n)=1/n
$$

は $c_0$ に属しますが counting measure に関する積分は発散します。したがって counting measure は $C_0$ 上の有界汎関数を与えません。

ここに

$$
C_c\text{ 上では compact-finite Radon}
\quad\text{対}\quad
C_0\text{ 上では finite signed Radon}
$$

という境界がはっきり現れます。

---

## 12. 定義の横断確認：二点離散空間

<!-- definition-example-start: def-mt6-c0, def-mt6-positive-envelope, def-mt6-finite-signed-radon -->
**定義の確認**：以下では同じ有限離散模型の中で、$C_0(X)$、正部分 envelope、有限符号付き Radon 測度の三定義を順に具体化します。

$X=\{a,b\}$ に離散位相を入れます。有限空間なので全ての実数値関数が $C_0(X)$ に属し、一様ノルムは

$$
\|(x,y)\|_\infty=\max(|x|,|y|)
$$

です。

$$
T(x,y)=2x-3y
$$

とします。$f=(u,v)\ge0$ に対し $0\le g\le f$ の範囲で $T(g)$ を最大にするには、正係数側では $g(a)=u$、負係数側では $g(b)=0$ とすればよいので

$$
T^+(u,v)=2u.
$$

従って

$$
T^-(u,v)=T^+(u,v)-T(u,v)=3v.
$$

表現測度は

$$
\nu=2\delta_a-3\delta_b,
$$

Jordan 部分は $\nu^+=2\delta_a$, $\nu^-=3\delta_b$ です。有限離散空間では全ての正測度が有限 Radon なので $\nu$ は有限符号付き Radon 測度です。また

$$
\|T\|=5=|\nu|(X),
$$

実際 $f(a)=1,f(b)=-1$ で $T(f)=5$ となります。三つの定義と最終ノルム等式を同じ模型で確認できます。
<!-- definition-example-end -->

---

# 演習

## A1. C0 関数は有界

- Level: A

$f\in C_0(X)$ なら $\|f\|_\infty<\infty$ であることを、$\{|f|\ge1\}$ の compact 性から証明せよ。

## A2. C0 の lattice 演算

- Level: A

$f,g\in C_0(X)$ に対し $|f|$, $f\vee g$, $f\wedge g$ が $C_0(X)$ に属することを示せ。また $|f|\le|g|$ なら $\|f\|_\infty\le\|g\|_\infty$ を示せ。

## A3. ノルム極限は無限遠で 0

- Level: A

$f_n\in C_0(X)$ と連続関数 $f$ が $\|f_n-f\|_\infty\to0$ を満たすとする。任意の $\varepsilon>0$ について

$$
\{|f|\ge\varepsilon\}
\subseteq
\{|f_n|\ge\varepsilon/2\}
$$

となる $n$ を取り、$f\in C_0(X)$ を証明せよ。

## A4. Cc の一様稠密性

- Level: A

$f\in C_0(X)$ と $\varepsilon>0$ に対し

$$
K=\{|f|\ge\varepsilon\}
$$

を取り、LCH cutoff から $g\in C_c(X)$ で $\|f-g\|_\infty<\varepsilon$ を構成せよ。

## B1. 正汎関数の表現測度が有限になる理由

- Level: B

正の有界線形汎関数 $T:C_0(X)\to\mathbb R$ を $C_c(X)$ に制限して得た Radon 測度 $\mu$ について

$$
\mu(X)\le\|T\|
$$

を証明せよ。非 compact な $X$ では $1\notin C_0(X)$ となり得ることに注意し、cutoff を使うこと。

## B2. min 分解から正部分 envelope の加法性

- Level: B

$f,h\ge0$ と $0\le g\le f+h$ に対し

$$
g_1=g\wedge f,
\qquad
g_2=(g-f)^+
$$

と置く。$g=g_1+g_2$, $0\le g_1\le f$, $0\le g_2\le h$ を確認し、これを使って

$$
T^+(f+h)=T^+(f)+T^+(h)
$$

を証明せよ。

## B3. 有界汎関数を二つの正汎関数の差にする

- Level: B

正部分 envelope の加法性を仮定する。

1. 非負関数集合上の $T^+$ を全 $C_0(X)$ へ線形に延長せよ。
2. $|T^+(u)|\le\|T\|\|u\|_\infty$ を示せ。
3. $T^-:=T^+-T$ が正であることを示し、$T=T^+-T^-$ を得よ。

## C1. Jordan 分解からノルム等式と一意性まで

- Level: C

$\nu$ を有限符号付き Radon 測度とする。

1. $\|T_\nu\|\le|\nu|(X)$ を示せ。
2. Hahn 分解 $X=P\sqcup N$ と Radon 正則性から、任意の $\eta>0$ に対し互いに素な compact 集合 $K^+,K^-$ を、$\nu^+(K^+)$ と $\nu^-(K^-)$ がそれぞれ全質量へ十分近くなるように構成せよ。
3. cutoff で $\|f\|_\infty\le1$ かつ $T_\nu(f)>|\nu|(X)-\eta$ となる $f\in C_c(X)$ を作れ。
4. これより $\|T_\nu\|=|\nu|(X)$ を示せ。
5. 二つの有限符号付き Radon 測度が同じ $C_0(X)$ 上の汎関数を表すなら一致することを示せ。

---

# 演習解答

## A1 解答

$$
K=\{|f|\ge1\}
$$

は compact です。$|f|$ は連続なので $|f|(K)$ は compact、従って有界です。ある $M<\infty$ が存在して $x\in K$ なら $|f(x)|\le M$ とできます。$x\notin K$ なら $|f(x)|<1$ です。従って

$$
|f(x)|\le\max(M,1)
$$

が全 $x$ で成り立ち、$\|f\|_\infty<\infty$ です。

## A2 解答

$|f|$ は連続で

$$
\{||f||\ge\varepsilon\}=\{|f|\ge\varepsilon\}
$$

は compact なので $|f|\in C_0(X)$ です。

$$
f\vee g=\frac{f+g+|f-g|}{2},
\qquad
f\wedge g=\frac{f+g-|f-g|}{2}
$$

と表せるので、$C_0(X)$ の線形演算と絶対値に関する閉性から両者も $C_0(X)$ に属します。

また $|f|\le|g|$ なら各 $x$ で $|f(x)|\le\|g\|_\infty$ なので supremum を取って

$$
\|f\|_\infty\le\|g\|_\infty.
$$

## A3 解答

$\|f-f_n\|_\infty\to0$ より、ある $n$ を

$$
\|f-f_n\|_\infty<\varepsilon/2
$$

となるように取れます。$|f(x)|\ge\varepsilon$ なら

$$
|f_n(x)|
\ge
|f(x)|-|f(x)-f_n(x)|
>
\varepsilon/2.
$$

従って

$$
\{|f|\ge\varepsilon\}
\subseteq
\{|f_n|\ge\varepsilon/2\}.
$$

右辺は compact です。左辺は $f$ の連続性から閉なので、右辺の閉部分集合として compact です。$\varepsilon>0$ は任意だから $f\in C_0(X)$ です。

## A4 解答

$$
K=\{|f|\ge\varepsilon\}
$$

は compact です。$K=\varnothing$ なら $g=0$ で終わりです。

そうでなければ cutoff により

$$
\chi\in C_c(X),
\quad0\le\chi\le1,
\quad\chi=1\text{ on }K
$$

を取ります。$g=\chi f$ と置けば $\operatorname{supp}g\subseteq\operatorname{supp}\chi$ なので $g\in C_c(X)$ です。

$K$ 上では $f-g=0$、$X\setminus K$ では $|f|<\varepsilon$ だから

$$
|f-g|
=|1-\chi||f|
<\varepsilon.
$$

従って $\|f-g\|_\infty<\varepsilon$ です。

## B1 解答

MT5 により $T|_{C_c}$ を表す Radon 測度 $\mu$ を取ります。compact $K\subseteq X$ に対し cutoff $\chi$ を

$$
0\le\chi\le1,
\qquad
\chi=1\text{ on }K
$$

となるように取ると

$$
\mu(K)
\le
\int\chi\,d\mu
=T(\chi)
\le
\|T\|.
$$

$X$ は open なので open-inner regularity により

$$
\mu(X)
=
\sup_{K\subseteq X\text{ compact}}\mu(K)
\le\|T\|.
$$

定数関数1を使わず、compact ごとの cutoff だけで全質量を抑えている点が重要です。

## B2 解答

$g_1=g\wedge f$ だから $0\le g_1\le f$ です。また

$$
g_2=g-g_1=(g-f)^+.
$$

$g\le f+h$ から $g-f\le h$ なので $0\le g_2\le h$ です。従って $g=g_1+g_2$ で

$$
T(g)
=T(g_1)+T(g_2)
\le
T^+(f)+T^+(h).
$$

$0\le g\le f+h$ 全体で supremum を取れば

$$
T^+(f+h)
\le
T^+(f)+T^+(h).
$$

逆に $0\le g_1\le f$, $0\le g_2\le h$ なら $g_1+g_2\le f+h$ なので

$$
T(g_1)+T(g_2)
\le T^+(f+h).
$$

それぞれ supremum に近づければ逆向きも得られ、等号です。

## B3 解答

非負関数集合上の加法性から、$u=p-q$ ($p,q\ge0$) に対し

$$
T^+(u):=T^+(p)-T^+(q)
$$

と定めます。もし $p-q=p'-q'$ なら $p+q'=p'+q$ なので、非負関数集合上の加法性により

$$
T^+(p)+T^+(q')=T^+(p')+T^+(q).
$$

従って well-defined です。和とスカラー倍を正関数の差として計算すれば線形性も従います。

正性から

$$
-|u|\le u\le|u|
$$

に $T^+$ を作用させて

$$
|T^+(u)|\le T^+(|u|).
$$

非負関数集合上の定義時の評価より

$$
T^+(|u|)
\le
\|T\|\,\||u|\|_\infty
=
\|T\|\,\|u\|_\infty.
$$

従って $T^+$ は有界です。

最後に $f\ge0$ なら envelope の候補に $g=f$ を取れるので $T^+(f)\ge T(f)$ です。よって

$$
T^-(f)
:=T^+(f)-T(f)
\ge0.
$$

$T^-$ は正の有界線形汎関数で

$$
T=T^+-T^-.
$$

## C1 解答

まず[全変動による積分評価](../MT2/index.md#thm-mt2-integral-bound)から

$$
|T_\nu(f)|
\le
\|f\|_\infty|\nu|(X),
$$

従って $\|T_\nu\|\le|\nu|(X)$ です。

逆向きには $\eta>0$ を固定し $\delta=\eta/5$ とします。Hahn 分解 $X=P\sqcup N$ を取り、$\nu^+(N)=0$, $\nu^-(P)=0$ とします。

$\nu^+$ の outer regularity から open $G\supseteq N$ を $\nu^+(G)<\delta$ となるように取ります。$\nu^-(G)=\nu^-(X)$ なので open-inner regularity から compact $K^-\subset G$ を

$$
\nu^-(K^-)>\nu^-(X)-\delta
$$

となるように取れます。

また compact $K_0^+\subset X$ を

$$
\nu^+(K_0^+)>\nu^+(X)-\delta
$$

となるように取り

$$
K^+=K_0^+\setminus G
$$

と置けば $K^+$ は compact、$K^+\cap K^-=\varnothing$ で

$$
\nu^+(K^+)>
\nu^+(X)-2\delta.
$$

cutoff $\phi^-$ を $K^-\subset G$ に取り、その compact support を $C^-$ とします。次に $K^+\subset X\setminus C^-$ に cutoff $\phi^+$ を取れば二つの support は互いに素です。

$$
f=\phi^+-\phi^-
$$

と置くと $\|f\|_\infty\le1$ です。主項二つの損失は $2\delta$ と $\delta$、交差項は

$$
\int\phi^-d\nu^+<\delta,
\qquad
\int\phi^+d\nu^-<\delta
$$

なので

$$
T_\nu(f)>|\nu|(X)-5\delta=|\nu|(X)-\eta.
$$

従って

$$
\|T_\nu\|\ge|\nu|(X)-\eta.
$$

$\eta$ は任意だから $\|T_\nu\|\ge|\nu|(X)$ であり、上からの評価と合わせて

$$
\|T_\nu\|=|\nu|(X).
$$

最後に $\nu_1,\nu_2$ が同じ汎関数を表すなら $\sigma=\nu_1-\nu_2$ と置きます。有限符号付き Radon 測度の加減に関する閉性は、各 Jordan 部分を使って有限 Radon 測度二つの差に書き、domination 補題を適用すれば従います。従って $\sigma$ にノルム等式を使えて

$$
|\sigma|(X)
=
\|T_\sigma\|
=0.
$$

よって $\sigma=0$、すなわち $\nu_1=\nu_2$ です。
