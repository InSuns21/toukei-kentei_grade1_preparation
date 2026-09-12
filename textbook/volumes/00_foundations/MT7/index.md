<!-- definition-example-audit: strict -->
# MT7 標準測度論 VIII：Lp完備性・稠密性・双対

D2Dでは \(L^p\) 空間、Hölder、Minkowski を作り、D2Eでは \(L^2\) の完備性を証明しました。本章では、その先に残っていた標準事項を閉じます。

```text
D2D：Lp・Hölder・Minkowski
          ↓
一般 1<=p<=infinity の完備性
          ↓
単関数の Lp 稠密性
          ↓
Radon 測度なら C_c(X) の Lp 稠密性
          ↓
σ-finite + Radon–Nikodym
          ↓
(Lp)* = Lq   (1<=p<infinity)
          ↓
p=infinity では何が壊れるか
```

本章は既存の [\(L^p\) 定義](../F0_00D2D_Lp_Holder_Minkowski/index.md#def-f0-00d2d-02)、[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)、[Minkowski の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-02)を正本として再利用します。\(L^2\) の完備性は [D2E](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01) の特殊例として回収されます。

---

## 1. 一般の \(L^p\) は Banach 空間

まず \(1\le p<\infty\) を扱います。D2E の \(L^2\) 証明で本質だったのは二乗そのものではなく、差分級数を Minkowski で制御できることでした。同じ議論は全ての有限 \(p\) で動きます。

<a id="thm-mt7-lp-complete"></a>
<!-- formal-statement-start -->
> **定理（Lp の完備性）**  
> 任意の測度空間について、\(1\le p\le\infty\) の \(L^p\) はそれぞれの \(L^p\) ノルムに関して完備である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：\(1\le p<\infty\)

\((f_n)\) を \(L^p\)-Cauchy 列とします。Cauchy 性から帰納的に部分列 \((f_{n_k})\) を選び、

$$
\|f_{n_{k+1}}-f_{n_k}\|_p\le 2^{-k}
$$

とできます。

差分の絶対値を

$$
g_k:=|f_{n_{k+1}}-f_{n_k}|
$$

と置き、その有限部分和を

$$
G_N:=\sum_{k=1}^N g_k
$$

とします。[Minkowski の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-02)より

$$
\|G_N\|_p
\le\sum_{k=1}^N\|g_k\|_p
\le\sum_{k=1}^N2^{-k}<1.
$$

\(G_N\uparrow G:=\sum_{k\ge1}g_k\) なので \(G_N^p\uparrow G^p\)。[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から

$$
\int G^p\,d\mu
=
\lim_{N\to\infty}\int G_N^p\,d\mu
\le1.
$$

従って \(G\in L^p\) であり、とくに \(G<\infty\) a.e. です。その点では

$$
\sum_{k=1}^{\infty}
|f_{n_{k+1}}-f_{n_k}|<\infty,
$$

ゆえに \((f_{n_k}(x))\) は実数の Cauchy 列です。零集合上では 0 と置くことで可測関数 \(f\) を

$$
f(x):=\lim_{k\to\infty}f_{n_k}(x)
$$

と定めます。

尾部

$$
H_k:=\sum_{j=k}^{\infty}g_j
$$

に対し a.e. で

$$
|f_{n_k}-f|\le H_k.
$$

有限部分和に Minkowski を使ってから単調極限を取れば

$$
\|H_k\|_p
\le\sum_{j=k}^{\infty}\|g_j\|_p
\le\sum_{j=k}^{\infty}2^{-j}
=2^{1-k}.
$$

したがって

$$
\|f_{n_k}-f\|_p\le2^{1-k}\to0.
$$

この時点で \(f\in L^p\) です。実際、十分大きい \(k\) について

$$
\|f\|_p
\le\|f-f_{n_k}\|_p+\|f_{n_k}\|_p<\infty.
$$

最後に元の列が Cauchy であることを使います。任意の \(arepsilon>0\) に対し、十分大きい \(N\) で \(m,n\ge N\) なら

$$
\|f_n-f_m\|_p<\varepsilon/2.
$$

さらに \(n_k\ge N\) かつ \(\|f_{n_k}-f\|_p<\varepsilon/2\) となる \(k\) を取れば、\(n\ge N\) に対して

$$
\|f_n-f\|_p
\le\|f_n-f_{n_k}\|_p+\|f_{n_k}-f\|_p
<\varepsilon.
$$

従って列全体が \(f\) へ \(L^p\) 収束します。

### 証明：\(p=\infty\)

\((f_n)\) を \(L^\infty\)-Cauchy とします。部分列を取り

$$
\|f_{n_{k+1}}-f_{n_k}\|_\infty\le2^{-k}
$$

とします。

本質的上限の定義から、各 \(k\) について零集合 \(N_k\) を除けば

$$
|f_{n_{k+1}}(x)-f_{n_k}(x)|\le2^{-k}
$$

です。可算和 \(N=\bigcup_kN_k\) も零集合なので、\(x\notin N\) では差分級数が一様に絶対収束し、ある \(f(x)\) へ収束します。すると

$$
|f(x)-f_{n_k}(x)|
\le\sum_{j=k}^{\infty}2^{-j}
=2^{1-k}
$$

が \(x\notin N\) で成り立つため

$$
\|f-f_{n_k}\|_\infty\le2^{1-k}.
$$

従って \(f\in L^\infty\) かつ部分列は \(f\) へ収束します。元の列全体の収束は有限 \(p\) の最後と同じ Cauchy 評価で従います。よって \(L^\infty\) も完備です。$\square$
<!-- proof-end -->

ここで有限 \(p\) では MCT が「差分の絶対値和が a.e. で有限」を作り、\(p=\infty\) では本質的一様評価そのものが差分級数を支えています。

---

## 2. 単関数は \(L^p\) に稠密

\(L^p\) の抽象元を扱うとき、まず有限個の値しか取らない関数へ落とせることが重要です。

<a id="thm-mt7-simple-dense"></a>
<!-- formal-statement-start -->
> **定理（単関数の Lp 稠密性）**  
> \(1\le p<\infty\) とする。任意の \(f\in L^p(\mu)\) と \(arepsilon>0\) に対し、\(L^p\) に属する実数値単関数 \(s\) が存在して \(\|f-s\|_p<\varepsilon\) となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず \(f\ge0\) とします。[単関数近似定理](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)により非負単関数列 \(s_n\) を

$$
0\le s_n\uparrow f
$$

となるよう取れます。

このとき

$$
0\le|f-s_n|^p\le f^p,
$$

かつ \(|f-s_n|^p\to0\) a.e. です。\(f\in L^p\) だから \(f^p\in L^1\)。[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)より

$$
\|f-s_n\|_p^p
=
\int|f-s_n|^p\,d\mu
\to0.
$$

一般の実数値 \(f\) については

$$
f=f^+-f^-
$$

と分け、それぞれを非負単関数 \(u_n,v_n\) で \(L^p\) 近似します。すると \(s_n=u_n-v_n\) も単関数で、Minkowski により

$$
\|f-s_n\|_p
\le\|f^+-u_n\|_p+\|f^--v_n\|_p\to0.
$$

十分大きい \(n\) を選べば結論です。$\square$
<!-- proof-end -->

### 有限測度 support を持つ近似も取れる

後で \(C_c\) 近似へ進むため、単関数の各非零レベル集合を有限測度にできます。\(f\in L^p\) に対して

$$
E_m:=\{1/m\le|f|\le m\}
$$

と置くと

$$
\mu(E_m)
\le m^p\int|f|^p\,d\mu<\infty.
$$

また \(f1_{E_m}\to f\) は \(L^p\) で成り立ちます。実際

$$
|f-f1_{E_m}|^p
=|f|^p1_{E_m^c}\to0
$$

a.e. で、右辺は \(|f|^p\) に支配されるからです。従って上の単関数近似を \(f1_{E_m}\) に適用すれば、有限測度集合上に support を持つ単関数で近似できます。

---

## 3. Radon 測度では \(C_c(X)\) が \(L^p\) に稠密

ここから \(X\) を局所コンパクト Hausdorff 空間、\(\mu\) を [Radon 測度](../MT5/index.md#def-mt5-radon)とします。

<a id="thm-mt7-cc-dense"></a>
<!-- formal-statement-start -->
> **定理（Cc の Lp 稠密性）**  
> \(1\le p<\infty\) とする。局所コンパクト Hausdorff 空間 \(X\) 上の Radon 測度 \(\mu\) に対し、\(C_c(X)\) は \(L^p(\mu)\) に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[単関数の Lp 稠密性](#thm-mt7-simple-dense)により、有限測度 support を持つ単関数

$$
s=\sum_{j=1}^m a_j1_{E_j}
$$

を近似できれば十分です。各 \(E_j\) は可測かつ \(\mu(E_j)<\infty\) とします。

まず一つの指示関数 \(1_E\) を近似します。任意の \(\eta>0\) を取ります。Radon 測度の内外正則性から compact 集合 \(K\subset E\) と open 集合 \(U\supset E\) を

$$
\mu(E\setminus K)<\eta/2,
\qquad
\mu(U\setminus E)<\eta/2
$$

となるよう選べます。従って

$$
\mu(U\setminus K)<\eta.
$$

[TOP5 の compact-open cutoff](../TOP5/index.md#thm-top5-lch-cutoff)により

$$
\varphi\in C_c(X),
\qquad
0\le\varphi\le1,
\qquad
\varphi=1\text{ on }K,
\qquad
\operatorname{supp}\varphi\subset U
$$

となる \(arphi\) が存在します。

\(K\) 上では \(arphi=1_E=1\)、\(X\setminus U\) では両方 0 なので、差が生じるのは \(U\setminus K\) だけです。従って

$$
|\varphi-1_E|^p\le1_{U\setminus K},
$$

ゆえに

$$
\|\varphi-1_E\|_p
\le\mu(U\setminus K)^{1/p}
<\eta^{1/p}.
$$

各 \(E_j\) について \(arphi_j\in C_c(X)\) を十分高精度で取り、

$$
g:=\sum_{j=1}^m a_j\varphi_j\in C_c(X)
$$

と置きます。Minkowski により

$$
\|g-s\|_p
\le\sum_{j=1}^m|a_j|\,\|\varphi_j-1_{E_j}\|_p.
$$

各項を例えば \(arepsilon/(2m\max(1,|a_j|))\) 未満にすれば \(\|g-s\|_p<\varepsilon/2\)。さらに \(\|f-s\|_p<\varepsilon/2\) としておけば

$$
\|f-g\|_p<\varepsilon.
$$

従って \(C_c(X)\) は \(L^p\) に稠密です。$\square$
<!-- proof-end -->

### \(p=\infty\) では一般に稠密ではない

\(X=\mathbb R\)、Lebesgue 測度を考えます。定数関数 \(1\in L^\infty\) に対し、任意の \(g\in C_c(\mathbb R)\) はある compact 集合の外で 0 です。従ってその外で \(|1-g|=1\) なので

$$
\|1-g\|_\infty=1.
$$

したがって \(C_c(\mathbb R)\) は \(L^\infty(\mathbb R)\) に稠密ではありません。有限 \(p\) の証明で \(\mu(U\setminus K)^{1/p}\) が小さくなる機構は、\(p=\infty\) では消えます。

---

## 4. \(L^q\) の関数は \(L^p\) 上の連続線形汎関数を作る

\(1\le p<\infty\) とし、共役指数 \(q\) を

$$
\frac1p+\frac1q=1
$$

で定めます。\(p=1\) では \(q=\infty\) とします。

\(g\in L^q\) に対して

$$
T_g(f):=\int fg\,d\mu
$$

と置きます。[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)から

$$
|T_g(f)|
\le\|f\|_p\|g\|_q,
$$

従って \(T_g\) は連続線形汎関数で

$$
\|T_g\|\le\|g\|_q.
$$

実は等号です。

### \(1<p<\infty\) のノルム等号

\(g\ne0\) とし

$$
f
:=
\frac{\operatorname{sgn}(g)|g|^{q-1}}
{\|g\|_q^{q/p}}
$$

と置きます。共役指数の関係から \((q-1)p=q\) なので

$$
\|f\|_p^p
=
\frac{\int|g|^q}{\|g\|_q^q}=1.
$$

また

$$
T_g(f)
=
\frac{\int|g|^q}{\|g\|_q^{q/p}}
=
\|g\|_q.
$$

従って \(\|T_g\|\ge\|g\|_q\) で、上側評価と合わせて

$$
\|T_g\|=\|g\|_q.
$$

### \(p=1\) のノルム等号

\(M=\|g\|_\infty\) とします。任意の \(arepsilon>0\) に対し

$$
E_\varepsilon:=\{|g|>M-\varepsilon\}
$$

は正測度です。σ-finite 性を仮定すれば、この中から \(0<\mu(F)<\infty\) となる可測集合 \(F\subset E_\varepsilon\) を取れます。

$$
f
:=
\frac{\operatorname{sgn}(g)1_F}{\mu(F)}
$$

とすれば \(\|f\|_1=1\) で、

$$
T_g(f)
=
\frac1{\mu(F)}\int_F|g|\,d\mu
>M-\varepsilon.
$$

\(arepsilon\downarrow0\) より \(\|T_g\|\ge M\)。従ってやはり

$$
\|T_g\|=\|g\|_\infty.
$$

---

## 5. 連続線形汎関数は全て積分表示される

ここで σ-finite 性が本質的に働きます。

<a id="thm-mt7-lp-duality"></a>
<!-- formal-statement-start -->
> **定理（σ-finite Lp 双対定理）**  
> \((X,\mathcal F,\mu)\) を σ-finite 測度空間、\(1\le p<\infty\)、\(q\) を共役指数とする。このとき任意の \(T\in(L^p(\mu))^*\) に対し一意な \(g\in L^q(\mu)\) が存在して \(T(f)=\int fg\,d\mu\) が全ての \(f\in L^p\) で成り立ち、さらに \(\|T\|=\|g\|_q\) である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### Step 1：有限測度集合上で符号付き測度を作る

σ-finite 性から

$$
X_1\subset X_2\subset\cdots,
\qquad
X=\bigcup_{n=1}^{\infty}X_n,
\qquad
\mu(X_n)<\infty
$$

となる可測集合列を取れます。

各 \(n\) について \(A\subset X_n\) 可測に対し

$$
\nu_n(A):=T(1_A)
$$

と置きます。\(1_A\in L^p\) なので定義できます。

互いに素な \(A_1,A_2,\ldots\subset X_n\) と \(A=\bigcup_jA_j\) を取ります。有限和 \(B_N=\bigcup_{j=1}^NA_j\) に対して

$$
\|1_A-1_{B_N}\|_p^p
=
\mu(A\setminus B_N)
\to0
$$

です。ここで \(\mu(A)\le\mu(X_n)<\infty\) を使いました。従って連続性から

$$
\nu_n(A)
=
\lim_{N\to\infty}T(1_{B_N})
=
\sum_{j=1}^{\infty}\nu_n(A_j).
$$

よって \(
u_n\) は有限符号付き測度です。また \(\mu(A)=0\) なら \(1_A=0\) in \(L^p\) なので \(
u_n(A)=0\)。従って

$$
\nu_n\ll\mu|_{X_n}.
$$

[有限符号付き測度版 Radon–Nikodym 定理](../MT3/index.md#thm-mt3-rn-signed)から \(g_n\in L^1(X_n)\) が存在して

$$
\nu_n(A)=\int_Ag_n\,d\mu
$$

となります。

#### Step 2：各 \(g_n\) は実は \(L^q\) に入る

まず \(1<p<\infty\) とします。\(m\ge1\) に対し

$$
h_m
:=
\operatorname{sgn}(g_n)|g_n|^{q-1}1_{\{|g_n|\le m\}}.
$$

\(X_n\) は有限測度で \(h_m\) は有界なので \(h_m\in L^p(X_n)\)。さらに \((q-1)p=q\) だから

$$
\|h_m\|_p^p
=
\int_{X_n}|g_n|^q1_{\{|g_n|\le m\}}\,d\mu.
$$

この積分を \(A_m\) と書きます。単関数近似から \(T(h_m)=\int h_mg_n\,d\mu\) が成り立つので

$$
A_m
=|T(h_m)|
\le\|T\|\,\|h_m\|_p
=
\|T\|A_m^{1/p}.
$$

\(A_m>0\) なら割って

$$
A_m^{1/q}\le\|T\|.
$$

\(m\to\infty\) とし MCT を使えば

$$
\|g_n\|_q\le\|T\|.
$$

\(p=1\) の場合は \(q=\infty\) です。もしある \(arepsilon>0\) について

$$
E=\{|g_n|>\|T\|+\varepsilon\}
$$

が正測度なら、\(X_n\) 内なので有限測度です。

$$
f=\operatorname{sgn}(g_n)1_E
$$

と置くと

$$
|T(f)|
=
\int_E|g_n|\,d\mu
>(\|T\|+\varepsilon)\mu(E),
$$

一方

$$
|T(f)|\le\|T\|\|f\|_1=\|T\|\mu(E),
$$

で矛盾です。従って

$$
\|g_n\|_\infty\le\|T\|.
$$

#### Step 3：局所密度を貼り合わせる

\(m<n\) とします。任意の可測 \(A\subset X_m\) について

$$
\int_Ag_n\,d\mu
=T(1_A)
=
\int_Ag_m\,d\mu.
$$

RN 密度の一意性から

$$
g_n=g_m
\qquad\text{a.e. on }X_m.
$$

各段階で零集合を修正して、\(X_m\) 上で実際に整合する代表元を取り、

$$
g(x)=g_n(x)
\qquad(x\in X_n)
$$

と定めます。

\(1<p<\infty\) なら

$$
\int_{X_n}|g|^q\,d\mu
\le\|T\|^q
$$

が全ての \(n\) で成り立つので、MCT により

$$
\|g\|_q\le\|T\|.
$$

\(p=1\) なら各 \(X_n\) 上で \(|g|\le\|T\|\) a.e. なので、可算和の零集合を除けば \(X\) 全体で同じ評価が成り立ち、

$$
\|g\|_\infty\le\|T\|.
$$

#### Step 4：全ての \(f\in L^p\) へ延長する

有限測度集合に support を持つ単関数 \(s\) については、ある \(X_n\) 内に support が入るよう分割して考えれば

$$
T(s)=\int sg\,d\mu.
$$

一般の \(f\in L^p\) に対しては、[単関数の Lp 稠密性](#thm-mt7-simple-dense)からそのような単関数列 \(s_k	o f\) を \(L^p\) で取れます。\(T\) の連続性と Hölder により

$$
T(s_k)\to T(f),
\qquad
\int s_kg\,d\mu\to\int fg\,d\mu.
$$

従って

$$
T(f)=\int fg\,d\mu.
$$

前節で積分汎関数のノルムが \(\|g\|_q\) に等しいことを示したので

$$
\|T\|=\|g\|_q.
$$

一意性は、二つの \(g,h\in L^q\) が同じ汎関数を表すなら \(T_{g-h}=0\) であり、ノルム等号から

$$
\|g-h\|_q=0
$$

となることから従います。$\square$
<!-- proof-end -->

### Step 2 の積分表示に単関数近似を使う理由

RN 定理から直接分かるのは指示関数、従って有限線形結合である単関数についての表示です。\(h_m\) 自体は一般には単関数ではありません。しかし \(h_m\) は有限測度集合 \(X_n\) 上の有界可測関数なので、単関数で \(L^p\) 近似できます。\(T\) と積分の両方がその近似に対して連続なため、

$$
T(h_m)=\int h_mg_n\,d\mu
$$

へ移せます。ここを暗黙に「RN だから一般関数にも成立」と飛ばさないことが重要です。

---

## 6. なぜ \(p=\infty\) を同じ定理に入れないのか

<a id="prop-mt7-linfty-boundary"></a>
<!-- formal-statement-start -->
> **命題（L-infinity 双対で RN 構成が破綻する機構）**  
> \(L^\infty\) の連続線形汎関数に対し \(A\mapsto T(1_A)\) と置いても、有限 \(p\) の証明で使った可算加法性は一般には連続性だけから従わない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限 \(p\) の Step 1 では、互いに素な \(A_j\subset X_n\) に対して

$$
1_{\bigcup_jA_j}
-
1_{\bigcup_{j=1}^NA_j}
=
1_{\bigcup_{j>N}A_j}
$$

の \(L^p\) ノルムが

$$
\mu\left(\bigcup_{j>N}A_j\right)^{1/p}
\to0
$$

となることを使いました。

しかし \(L^\infty\) では、尾部集合が正測度を持つ限り

$$
\left\|1_{\bigcup_{j>N}A_j}\right\|_\infty=1.
$$

従って有限部分和の指示関数は、和集合の指示関数へ \(L^\infty\) 収束しません。連続線形汎関数 \(T\) の連続性から

$$
T(1_{\bigcup_{j=1}^NA_j})
\to
T(1_{\bigcup_jA_j})
$$

を結論できず、\(A\mapsto T(1_A)\) が可算加法的測度になる保証が失われます。

したがって Radon–Nikodym 定理へ渡す入口そのものが閉じません。これが \((L^\infty)^*\) を一般に \(L^1\) と同一視できない構造的理由です。$\square$
<!-- proof-end -->

「\(L^1\) 関数 \(g\) は \(L^\infty\) 上の積分汎関数を作る」こと自体は Hölder から正しいですが、**全ての** \(L^\infty\) 連続線形汎関数がその形になる、という全射性が一般に壊れます。

---

## 7. 演習A

### A01 \(L^3\) 完備性の核心
- Level: A

\(L^3\)-Cauchy 列から部分列 \((f_{n_k})\) を \(\|f_{n_{k+1}}-f_{n_k}\|_3\le2^{-k}\) と取った。\(G_N=\sum_{k=1}^N|f_{n_{k+1}}-f_{n_k}|\) とするとき、\(\|G_N\|_3<1\) を示し、\(G=\lim G_N<\infty\) a.e. を導け。

<!-- solution-start -->
Minkowski から

$$
\|G_N\|_3
\le\sum_{k=1}^N2^{-k}<1.
$$

従って \(\int G_N^3\le1\)。\(G_N^3\uparrow G^3\) なので MCT により \(\int G^3\le1\)。よって \(G\in L^3\) であり、\(G=\infty\) となる集合は零集合である。
<!-- solution-end -->

### A02 単関数近似
- Level: A

\(f\ge0\)、\(f\in L^p\) とし、\(0\le s_n\uparrow f\) を単関数近似とする。なぜ \(\|f-s_n\|_p\to0\) か。

<!-- solution-start -->
\(|f-s_n|^p\to0\) a.e. かつ \(0\le|f-s_n|^p\le f^p\)。\(f^p\in L^1\) なので DCT により \(\int|f-s_n|^p\to0\)。従って \(\|f-s_n\|_p\to0\)。
<!-- solution-end -->

### A03 compact-open cutoff の \(L^p\) 誤差
- Level: A

\(\mu(U\setminus K)<\eta\)、\(0\le\varphi\le1\)、\(arphi=1\) on \(K\)、\(\operatorname{supp}\varphi\subset U\)、\(K\subset E\subset U\) とする。\(\|\varphi-1_E\|_p\) を評価せよ。

<!-- solution-start -->
差は \(U\setminus K\) の外で0で、全点で絶対値1以下。従って

$$
|\varphi-1_E|^p\le1_{U\setminus K},
$$

ゆえに

$$
\|\varphi-1_E\|_p
\le\mu(U\setminus K)^{1/p}<\eta^{1/p}.
$$
<!-- solution-end -->

### A04 双対ノルム
- Level: A

\(1<p<\infty\)、\(g\in L^q\setminus\{0\}\) とする。\(T_g(f)=\int fg\) に対し、\(\|T_g\|=\|g\|_q\) を達成する \(L^p\) 単位ベクトルを一つ書け。

<!-- solution-start -->

$$
f=
\frac{\operatorname{sgn}(g)|g|^{q-1}}
{\|g\|_q^{q/p}}
$$

と取る。\((q-1)p=q\) より \(\|f\|_p=1\)、また \(\int fg=\|g\|_q\)。従って Hölder の上側評価と合わせて \(\|T_g\|=\|g\|_q\)。
<!-- solution-end -->

---

## 8. 演習B

### B01 \(L^\infty\) の完備性
- Level: B

\(L^\infty\)-Cauchy 列から差分ノルムが \(2^{-k}\) 以下の部分列を取り、可算個の零集合を除いた上で一様 Cauchy になることを示せ。

<!-- solution-start -->
各 \(k\) で本質的上限評価を破る集合を \(N_k\) とすれば \(\mu(N_k)=0\)。\(N=\bigcup_kN_k\) も零集合。\(x\notin N\) では差分が \(2^{-k}\) 以下なので差分級数が一様収束し、極限 \(f\) に対し \(|f-f_{n_k}|\le2^{1-k}\)。従って \(L^\infty\) ノルムでも収束する。元の列全体は Cauchy 性から同じ極限へ収束する。
<!-- solution-end -->

### B02 \(C_c\) が \(L^\infty\) に稠密でない例
- Level: B

\(\mathbb R\) 上の Lebesgue 測度で、定数関数1が \(C_c(\mathbb R)\) の \(L^\infty\)-閉包に入らないことを示せ。

<!-- solution-start -->
任意の \(g\in C_c(\mathbb R)\) は compact support の外で0。そこでは \(|1-g|=1\) なので \(\|1-g\|_\infty=1\)。従って距離を1未満にできず、1は閉包に入らない。
<!-- solution-end -->

### B03 RN 構成で有限 \(p\) が効く場所
- Level: B

互いに素な \(A_j\subset X_n\)、\(\mu(X_n)<\infty\) に対し、\(1\le p<\infty\) では \(1_{\cup_{j=1}^NA_j}\to1_{\cup_jA_j}\) in \(L^p\) だが、\(p=\infty\) では一般に成り立たないことを説明せよ。

<!-- solution-start -->
有限 \(p\) では差の \(p\) 乗ノルムが尾部集合の測度

$$
\mu\left(\bigcup_{j>N}A_j\right)
$$

に等しく、有限測度集合内の下からの連続性により0へ行く。一方 \(p=\infty\) では尾部集合が正測度なら指示関数の本質的上限は1のまま。従って連続汎関数から可算加法性を引き出す議論が壊れる。
<!-- solution-end -->

---

## 9. 演習C

### C01 σ-finite \(L^p\) 双対の局所化
- Level: C

\(T\in(L^p)^*\)、\(1\le p<\infty\)、\(X_n\uparrow X\)、\(\mu(X_n)<\infty\) とする。本文の構成で得た RN 密度 \(g_n\) が \(g_{n+1}=g_n\) a.e. on \(X_n\) を満たし、一つの \(g\in L^q\) に貼り合わさることを証明せよ。

<!-- solution-start -->
任意の可測 \(A\subset X_n\) に対して

$$
\int_Ag_{n+1}\,d\mu
=T(1_A)
=
\int_Ag_n\,d\mu.
$$

従って \(g_{n+1}\) と \(g_n\) は \(X_n\) 上で同じ符号付き測度の RN 密度であり、一意性から a.e. 一致する。可算個の零集合を同時に除いて代表元を整合させれば \(g|_{X_n}=g_n\) と定義できる。\(1<p<\infty\) では各 \(n\) で \(\int_{X_n}|g|^q\le\|T\|^q\) なので MCT により \(\int_X|g|^q\le\|T\|^q\)。\(p=1\) では各 \(X_n\) 上で \(|g|\le\|T\|\) a.e. なので全体でも同じ本質的上限評価が成り立つ。
<!-- solution-end -->

---

## 10. 章末チェック

- \(1\le p<\infty\) の完備性を「速い部分列 → 差分級数 → a.e.極限 → 尾部 \(L^p\) 評価 → 元の列」の順で再構成できる。
- \(p=\infty\) では可算個の零集合を除き、本質的一様評価から完備性を直接示せる。
- 単関数稠密性で DCT をどこに使うか説明できる。
- Radon 正則性と compact-open cutoff から指示関数を \(C_c\) で \(L^p\) 近似できる。
- σ-finite \(L^p\) 双対で、有限測度局所化が指示関数の可算加法性を保証する箇所を説明できる。
- \(p=\infty\) で同じ RN 構成が壊れる理由を、尾部指示関数の \(L^\infty\) ノルムが1のままになることから説明できる。
