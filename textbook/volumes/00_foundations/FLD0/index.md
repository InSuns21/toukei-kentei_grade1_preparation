# FLD0 一般の体上のベクトル空間

[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) では実数を係数とするベクトル空間を定義し、[F0-00F](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) では実線形写像を基底で行列表示しました。[LA1](../LA1/index.md) では係数を複素数まで広げ、同じ集合でもスカラーをどこから取るかによって線形構造が変わることを見ました。

ここまでの線形代数だけを見ると、スカラーはいつも $\mathbb R$ または $\mathbb C$ です。しかし [RNG1](../RNG1/index.md#def-rng1-zero-divisor-domain-field) で **体** を定義した今なら、線形代数で本当に必要だった性質を切り分けられます。加法・乗法ができ、$0$ でないスカラーで割れるなら、一次独立・基底・次元・行列・階数と退化次数の議論の多くはそのまま動きます。

最小の驚きは有限体です。例えば

$$
\mathbb F_2=\mathbb Z/2\mathbb Z=\{0,1\}
$$

では

$$
1+1=0
$$

です。それでも $\mathbb F_2^2$ には基底があり、線形写像を行列で表せます。つまり線形代数の「線形」は、実数直線の幾何だけを意味しているわけではありません。

この章では

$$
\text{体 }F
\longrightarrow
F\text{-ベクトル空間}
\longrightarrow
F\text{-線形結合・基底・次元}
\longrightarrow
F\text{-線形写像}
\longrightarrow
\text{体拡大 }K/F
$$

という橋を作ります。これにより次の [FLD1](../FLD1/index.md) で、体 $K$ の元を $F$ の元でスカラー倍する見方を使って

$$
[K:F]=\dim_F K
$$

と書く準備が整います。

---

## 1. 実数・複素数の代わりに任意の体を係数にする

ベクトル空間の公理を見直すと、係数について使っていたのは大小関係や距離ではありません。足し算・掛け算・分配法則と、非零係数で割れることです。これらをまとめて持つものが体でした。

そこで、実ベクトル空間の定義に現れた $\mathbb R$ を一般の体 $F$ に置き換えます。

<a id="def-fld0-vector-space-over-field"></a>
<!-- formal-statement-start -->
> **定義（体上のベクトル空間）**
>
> $F$ を体とする。集合 $V$ に加法
>
$$
V\times V\to V
$$
>
> とスカラー倍
>
$$
F\times V\to V
$$
>
> が定義され、任意の $x,y,z\in V$ と $a,b\in F$ に対して
>
> 1. $x+y=y+x$
> 2. $(x+y)+z=x+(y+z)$
> 3. $x+0=x$ となる $0\in V$ がある
> 4. $x+(-x)=0$ となる $-x\in V$ がある
> 5. $a(x+y)=ax+ay$
> 6. $(a+b)x=ax+bx$
> 7. $(ab)x=a(bx)$
> 8. $1_Fx=x$
>
> を満たすとき、$V$ を **$F$ 上のベクトル空間**、または **$F$-ベクトル空間**という。$F$ をこのベクトル空間の **スカラー体**という。
<!-- formal-statement-end -->

$F=\mathbb R$ とすれば F0-00E の実ベクトル空間、$F=\mathbb C$ とすれば LA1 の複素ベクトル空間です。つまり新しい公理を増やしたのではなく、係数を供給する体だけを一般化しています。

<!-- definition-example-start: def-fld0-vector-space-over-field -->
**定義の確認**：$\mathbb F_2^2$

$\mathbb F_2=\{0,1\}$ では非零元は $1$ だけで、その逆元も $1$ です。従って $\mathbb F_2$ は体です。

$$
V=\mathbb F_2^2
=
\{(0,0),(1,0),(0,1),(1,1)\}
$$

に成分ごとの加法とスカラー倍を入れます。例えば

$$
(1,0)+(1,1)=(0,1)
$$

です。第1成分では $1+1=0$ と計算しています。

また

$$
1(x,y)=(x,y),
\qquad
0(x,y)=(0,0).
$$

加法の結合則・交換則や分配法則は、各成分で $\mathbb F_2$ の体の演算則を使えば成り立ちます。従って $\mathbb F_2^2$ は $\mathbb F_2$ 上のベクトル空間です。
<!-- definition-example-end -->

有限体では「矢印の長さ」や「角度」を考えなくても、線形結合・基底・行列計算はできます。これが代数的な線形代数と Euclid 幾何を切り分ける最初の例です。

---

## 2. 線形結合・一次独立・基底・次元も係数体に依存する

実ベクトル空間では、線形結合の係数を $\mathbb R$ から取りました。一般の体上では、その係数を $F$ から取ります。

<a id="def-fld0-span-over-field"></a>
<!-- formal-statement-start -->
> **定義（体上の線形結合・線形包）**
>
> $V$ を $F$-ベクトル空間、$S\subseteq V$ とする。$S$ から有限個 $v_1,\dots,v_k$ を選び、$a_1,\dots,a_k\in F$ として作る
>
$$
a_1v_1+\cdots+a_kv_k
$$
>
> を **$F$-線形結合**という。その全体を
>
$$
\operatorname{span}_F(S)
$$
>
> と書き、$S$ の **$F$-線形包**という。
<!-- formal-statement-end -->

<a id="def-fld0-basis-over-field"></a>
<!-- formal-statement-start -->
> **定義（体上の一次独立・基底）**
>
> $S\subseteq V$ が **$F$ 上一次独立**であるとは、相異なる有限個 $v_1,\dots,v_k\in S$ と $a_1,\dots,a_k\in F$ に対して
>
$$
a_1v_1+\cdots+a_kv_k=0
$$
>
> なら必ず
>
$$
a_1=\cdots=a_k=0
$$
>
> となることをいう。
>
> $B\subseteq V$ が $F$ 上一次独立で
>
$$
\operatorname{span}_F(B)=V
$$
>
> を満たすとき、$B$ を $V$ の **$F$-基底**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld0-span-over-field, def-fld0-basis-over-field -->
**定義の確認**：$\mathbb F_2^2$ の標準基底

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

とします。任意の $(x,y)\in\mathbb F_2^2$ は

$$
(x,y)=xe_1+ye_2
$$

と書けるので

$$
\operatorname{span}_{\mathbb F_2}\{e_1,e_2\}
=
\mathbb F_2^2.
$$

また

$$
ae_1+be_2=(0,0)
$$

なら左辺は $(a,b)$ なので $a=b=0$ です。従って $e_1,e_2$ は $\mathbb F_2$ 上一次独立で、$\mathbb F_2^2$ の $\mathbb F_2$-基底です。
<!-- definition-example-end -->

### 2.1 同じ集合でもスカラー体が変わると一次独立性が変わる

$\mathbb R$ を $\mathbb Q$ 上のベクトル空間として見ることもできます。二つの実数

$$
1,\sqrt2
$$

を考えます。

有理数 $a,b\in\mathbb Q$ に対して

$$
a+b\sqrt2=0
$$

なら、$b\ne0$ なら

$$
\sqrt2=-\frac ab\in\mathbb Q
$$

となって矛盾します。従って $b=0$、さらに $a=0$ です。よって $1,\sqrt2$ は $\mathbb Q$ 上一次独立です。

一方、$\mathbb R$ 上では

$$
(-\sqrt2)\cdot1+1\cdot\sqrt2=0
$$

という非自明な線形関係があるので一次従属です。

一次独立・基底・次元は、ベクトルの集合だけでなく **どの体を係数として許すか** に依存します。

---

## 3. 部分空間判定も任意の体で同じ形になる

<a id="prop-fld0-subspace-test-over-field"></a>
<!-- formal-statement-start -->
> **命題（体上の部分空間判定法）**
>
> $V$ を $F$-ベクトル空間とし、$W\subseteq V$ を空でない部分集合とする。このとき $W$ が $F$-部分空間であるための必要十分条件は、任意の $u,v\in W$ と $a,b\in F$ に対して
>
$$
au+bv\in W
$$
>
> が成り立つことである。
<!-- formal-statement-end -->

### 証明の見取り図

F0-00E の実数版と同じ証明です。実数の順序や絶対値は使わず、$0,1,-1$ が体 $F$ に存在し、スカラー倍ができることだけを使います。

<!-- proof-start -->
### 証明

$W$ が $F$-部分空間なら、$u,v\in W$ と $a,b\in F$ に対して $au,bv\in W$ であり、加法にも閉じるので

$$
au+bv\in W
$$

です。

逆に、$W$ は空でないとし、任意の $u,v\in W$ と $a,b\in F$ に対して $au+bv\in W$ と仮定します。$w\in W$ を一つ取ります。

$a=b=0$ とすれば

$$
0w+0w=0\in W.
$$

$b=0$ とすれば、任意の $a\in F$ に対して

$$
au\in W.
$$

特に $a=-1$ とすれば $-u\in W$ です。また $a=b=1$ とすれば

$$
u+v\in W.
$$

従って $W$ は零ベクトルを含み、加法・加法逆元・$F$ によるスカラー倍に閉じます。結合法則や分配法則などの等式は $V$ から継承されるので、$W$ は $F$-ベクトル空間です。$\square$
<!-- proof-end -->

### 具体例：$\mathbb F_3^3$ の平面

$$
W=
\{(x,y,z)\in\mathbb F_3^3:x+y+z=0\}
$$

とします。$u,v\in W$ と $a,b\in\mathbb F_3$ なら、$au+bv$ の成分の和は

$$
a(u_1+u_2+u_3)+b(v_1+v_2+v_3)=0.
$$

従って $au+bv\in W$ であり、$W$ は $\mathbb F_3$-部分空間です。

---

## 4. なぜ「体」であることが線形代数を支えるのか

F0-00E の [Steinitz の交換補題](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#lem-steinitz-exchange) の核心を見直します。生成系の一つを一次独立なベクトルと交換するとき、

$$
u_k
=
a_1u_1+\cdots+a_{k-1}u_{k-1}
+b_kw_k+\cdots+b_nw_n
$$

という表示から、ある $b_j\ne0$ を選び

$$
w_j
=
\frac1{b_j}
\left(
u_k-
\sum_{i=1}^{k-1}a_i u_i
-
\sum_{\ell\ne j}b_\ell w_\ell
\right)
$$

と解きました。

ここで必要なのは

$$
b_j\ne0
\quad\Longrightarrow\quad
b_j^{-1}\in F
$$

という性質です。これはまさに体の公理です。$\mathbb R$ の大小関係や完備性は使っていません。

この観察を、後で階数・退化次数の定理に使える形まで定理として閉じます。

<a id="thm-fld0-steinitz-basis-extension-over-field"></a>
<!-- formal-statement-start -->
> **定理（一般の体上の Steinitz の交換補題と基底延長）**
>
> $V$ を $F$-ベクトル空間とする。
>
> 1. $V$ が $n$ 本のベクトルで張られ、$u_1,\dots,u_m$ が $F$ 上一次独立なら $m\le n$ である。
> 2. $V$ が有限次元で、$u_1,\dots,u_m$ が $F$ 上一次独立なら、これらを含む $F$-基底へ延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

第1部では、生成系のベクトルを $u_1,u_2,\dots$ と1本ずつ交換します。交換のたびに、0でない係数 $b_j$ の逆元 $b_j^{-1}$ を使います。第2部では、一次独立集合がまだ全体を張らないなら、その線形包の外から1本追加する操作を繰り返します。

<!-- proof-start -->
### 証明

まず第1部を示します。

$$
V=\operatorname{span}_F(v_1,\dots,v_n)
$$

とし、$u_1,\dots,u_m$ が $F$ 上一次独立であるとします。

$k=0,1,\dots$ について

$$
V=
\operatorname{span}_F
(u_1,\dots,u_k,w_{k+1},\dots,w_n)
$$

となるように、もとの生成系から $n-k$ 本を残せることを帰納的に示します。$k=0$ では $w_j=v_j$ とすれば成立します。

$k-1$ まで交換できたとします。$u_k\in V$ なので

$$
u_k
=
a_1u_1+\cdots+a_{k-1}u_{k-1}
+b_kw_k+\cdots+b_nw_n
$$

と書けます。

もし

$$
b_k=\cdots=b_n=0
$$

なら $u_k$ は $u_1,\dots,u_{k-1}$ の $F$-線形結合になり、$u_1,\dots,u_m$ の一次独立性に反します。従ってある $j$ について

$$
b_j\ne0.
$$

$F$ は体なので $b_j^{-1}$ が存在し、

$$
w_j
=
b_j^{-1}
\left(
u_k
-
\sum_{i=1}^{k-1}a_i u_i
-
\sum_{\substack{\ell=k\\ \ell\ne j}}^n b_\ell w_\ell
\right)
$$

と解けます。従って $w_j$ を $u_k$ に置き換えても、交換前の $w_j$ を交換後の族から再び生成できるため、$V$ 全体を張る性質は失われません。

この交換を繰り返せます。もし $m>n$ なら、$n$ 回交換した時点で

$$
V=\operatorname{span}_F(u_1,\dots,u_n)
$$

となります。ところが $u_{n+1}\in V$ なので $u_{n+1}$ は $u_1,\dots,u_n$ の線形結合となり、一次独立性に反します。従って

$$
m\le n.
$$

次に第2部を示します。$V$ は有限次元なので、ある有限生成系

$$
v_1,\dots,v_n
$$

を持ちます。

もし

$$
\operatorname{span}_F(u_1,\dots,u_m)=V
$$

なら、すでに $u_1,\dots,u_m$ は基底です。

そうでなければ

$$
x_1\in
V\setminus
\operatorname{span}_F(u_1,\dots,u_m)
$$

を一つ取ります。このとき

$$
u_1,\dots,u_m,x_1
$$

は一次独立です。実際

$$
a_1u_1+\cdots+a_mu_m+bx_1=0
$$

で $b\ne0$ なら

$$
x_1
=
-b^{-1}(a_1u_1+\cdots+a_mu_m)
$$

となって $x_1$ の選び方に反します。従って $b=0$ で、残りの係数も $u_1,\dots,u_m$ の一次独立性から0です。

まだ全体を張らなければ同じ操作で $x_2,x_3,\dots$ を追加します。しかし第1部から一次独立なベクトルの本数は有限生成系の本数 $n$ を超えられません。従って有限回でこの操作は停止し、

$$
u_1,\dots,u_m,x_1,\dots,x_r
$$

が $V$ の基底になります。よって基底へ延長できます。$\square$
<!-- proof-end -->

ここでは交換式で $b_j^{-1}$ を使ったこと、基底延長で $b^{-1}$ を使ったことが、体の仮定が働く場所です。

さらに第1部を二つの基底へ相互に適用すると、有限次元 $F$-ベクトル空間では **どの基底も同じ本数**を持つことが分かります。これで初めて基底の本数を空間固有の量として定義できます。

<a id="def-fld0-dimension-over-field"></a>
<!-- formal-statement-start -->
> **定義（体上の次元）**
>
> $V$ が有限基底を持つ $F$-ベクトル空間であるとする。$V$ の $F$-基底の本数を **$F$ 上の次元**といい
>
$$
\dim_FV
$$
>
> と書く。直前に証明した[一般体版の交換定理](#thm-fld0-steinitz-basis-extension-over-field)により、この本数は選んだ基底によらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld0-dimension-over-field -->
**定義の確認**：前節で $\mathbb F_2^2$ の

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

が $\mathbb F_2$-基底であることを確認しました。基底は2本なので

$$
\boxed{\dim_{\mathbb F_2}\mathbb F_2^2=2}.
$$

別の基底を選んでも、交換補題から本数は必ず2本です。
<!-- definition-example-end -->

一方、係数を一般の環 $R$ にすると非零元が逆元を持つとは限りません。例えば $\mathbb Z$ では $2\ne0$ ですが $1/2\notin\mathbb Z$ です。このため「非零係数で割って一つの生成元を消す」という線形代数の標準操作がそのまま使えません。一般の環上ではベクトル空間ではなく **加群**を考え、[MOD1](../MOD1/index.md) で別の理論として扱います。

---

## 5. 一般の体上の線形写像

係数体を一般化したら、「係数を外へ出せる」という線形性も同じ体に対して定義する必要があります。

<a id="def-fld0-linear-map-over-field"></a>
<!-- formal-statement-start -->
> **定義（体上の線形写像）**
>
> $V,W$ を $F$-ベクトル空間とする。写像
>
$$
T:V\to W
$$
>
> が任意の $x,y\in V$ と $a,b\in F$ に対して
>
$$
T(ax+by)=aT(x)+bT(y)
$$
>
> を満たすとき、$T$ を **$F$-線形写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld0-linear-map-over-field -->
**定義の確認**：$\mathbb F_3$ 上の行列

$$
A=
\begin{pmatrix}
1&2\\
2&1
\end{pmatrix}
\in M_2(\mathbb F_3)
$$

に対して

$$
T(x)=Ax
$$

とします。$u,v\in\mathbb F_3^2$、$a,b\in\mathbb F_3$ なら行列積の分配法則から

$$
\begin{aligned}
T(au+bv)
&=A(au+bv)\\
&=aAu+bAv\\
&=aT(u)+bT(v).
\end{aligned}
$$

従って $T$ は $\mathbb F_3$-線形です。
<!-- definition-example-end -->

行列の加減乗や Gaussian 消去法も、係数の四則演算を $F$ の中で行えば同じです。例えば $\mathbb F_3$ では

$$
2^{-1}=2
$$

です。実際

$$
2\cdot2=4\equiv1\pmod3.
$$

したがって「第 $i$ 行を非零スカラー倍する」という基本変形も有限体上で問題なく実行できます。

---

## 6. 階数・退化次数の定理も体を選ばない

<a id="thm-fld0-rank-nullity-over-field"></a>
<!-- formal-statement-start -->
> **定理（一般の体上の階数・退化次数の定理）**
>
> $V,W$ を $F$-ベクトル空間、$V$ を有限次元とし、$T:V\to W$ を $F$-線形写像とする。このとき
>
$$
\dim_FV
=
\dim_F\ker T
+
\dim_F\operatorname{Im}T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

核の基底を $V$ の基底へ延長し、追加した基底ベクトルの像が $\operatorname{Im}T$ の基底になることを示します。必要なのは一次独立・基底延長・線形性だけで、実数固有の性質は使いません。

<!-- proof-start -->
### 証明

$$
u_1,\dots,u_r
$$

を $\ker T$ の $F$-基底とします。基底延長により

$$
u_1,\dots,u_r,v_1,\dots,v_s
$$

を $V$ の $F$-基底へ延長できます。従って

$$
\dim_FV=r+s.
$$

まず

$$
T(v_1),\dots,T(v_s)
$$

が $\operatorname{Im}T$ を張ることを示します。任意の $y\in\operatorname{Im}T$ に対し、ある $x\in V$ が存在して $y=T(x)$ です。基底展開により

$$
x=
\sum_{i=1}^r a_i u_i
+
\sum_{j=1}^s b_j v_j.
$$

$u_i\in\ker T$ なので $T(u_i)=0$ です。従って

$$
\begin{aligned}
y=T(x)
&=
\sum_{i=1}^r a_iT(u_i)
+
\sum_{j=1}^s b_jT(v_j)\\
&=
\sum_{j=1}^s b_jT(v_j).
\end{aligned}
$$

よって像を張ります。

次に一次独立性を示します。

$$
\sum_{j=1}^s b_jT(v_j)=0
$$

とすると、線形性から

$$
T\left(\sum_{j=1}^s b_jv_j\right)=0.
$$

従って

$$
\sum_{j=1}^s b_jv_j\in\ker T.
$$

核の基底で表せるので、ある $a_1,\dots,a_r\in F$ が存在して

$$
\sum_{j=1}^s b_jv_j
=
\sum_{i=1}^r a_i u_i.
$$

移項して

$$
\sum_{i=1}^r (-a_i)u_i
+
\sum_{j=1}^s b_jv_j
=0.
$$

これは $V$ の基底の線形関係なので全係数が0です。特に

$$
b_1=\cdots=b_s=0.
$$

従って $T(v_1),\dots,T(v_s)$ は $\operatorname{Im}T$ の基底で

$$
\dim_F\operatorname{Im}T=s.
$$

また

$$
\dim_F\ker T=r
$$

なので

$$
\dim_FV=r+s
=
\dim_F\ker T
+
\dim_F\operatorname{Im}T.
$$

$\square$
<!-- proof-end -->

---

## 7. 基底を選べば $F^n$ に座標化できる

<a id="thm-fld0-coordinate-isomorphism-over-field"></a>
<!-- formal-statement-start -->
> **定理（一般の体上の座標写像）**
>
> $V$ を $n$ 次元 $F$-ベクトル空間とし、順序付き $F$-基底
>
$$
\mathcal B=(v_1,\dots,v_n)
$$
>
> を固定する。このとき
>
$$
\Phi_{\mathcal B}:V\to F^n,
\qquad
x\mapsto[x]_{\mathcal B}
$$
>
> は $F$-線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x,y\in V$ を

$$
x=\sum_{i=1}^n c_iv_i,
\qquad
y=\sum_{i=1}^n d_iv_i
$$

とします。$a,b\in F$ に対し

$$
ax+by
=
\sum_{i=1}^n(ac_i+bd_i)v_i.
$$

基底展開の一意性から

$$
[ax+by]_{\mathcal B}
=
a[x]_{\mathcal B}
+
b[y]_{\mathcal B}.
$$

従って $\Phi_{\mathcal B}$ は $F$-線形です。

座標が等しければ基底展開の係数が全て等しいので元のベクトルも等しく、$\Phi_{\mathcal B}$ は単射です。また任意の

$$
(c_1,\dots,c_n)^T\in F^n
$$

に対して

$$
x=c_1v_1+\cdots+c_nv_n
$$

と置けば

$$
[x]_{\mathcal B}=(c_1,\dots,c_n)^T.
$$

従って全射でもあります。よって $\Phi_{\mathcal B}$ は $F$-線形同型です。$\square$
<!-- proof-end -->

この定理により、有限体上でも有理数体上でも、有限次元ベクトル空間を基底で座標化して行列計算へ移せます。

---

## 8. どこまでが一般体で、どこから実数・複素数固有か

一般体へ広げやすいのは、主に **加法・乗法・逆元だけで閉じる代数的線形代数**です。

- 線形結合・線形包
- 一次独立・基底・次元
- 線形写像・核・像
- 表現行列・基底変換
- Gaussian 消去法
- 階数・退化次数の定理
- 行列式
- 作用素多項式・最小多項式

一方、次の話では $\mathbb R$ や $\mathbb C$ に固有の追加構造・性質を使います。

- 正値な内積とノルム
- 直交性・Gram--Schmidt 法
- 実数の大小関係を使う正定値性
- 複素共役を使う Hermitian 内積
- 固有多項式が必要な形に分解することを前提とする標準形

このため、[LA4](../LA4/index.md) は実・複素線形代数の本線として $\mathbb F=\mathbb R$ または $\mathbb C$ に範囲を固定しています。作用素多項式や最小多項式そのものは一般体でも定義できますが、Jordan 構造まで一気に進むには「最小多項式がその体上で一次因子の積へ分解する」という追加条件が必要です。

一般化するときは、「式が同じ形だから大丈夫」ではなく、証明のどこで体の公理だけを使い、どこで $\mathbb R$・$\mathbb C$ の追加性質を使ったかを分けて見ることが重要です。

---

## 9. 体拡大はベクトル空間を自然に作る

ここが FLD1 への直接の接続です。

$F\subset K$ を二つの体とします。$K$ の加法をベクトル加法として使い、$a\in F$ と $x\in K$ に対して

$$
a\cdot x=ax
$$

と $K$ の乗法でスカラー倍を定めます。

$F$ は $K$ の部分体なので $a\in F$ は $K$ の元でもあります。従って積 $ax$ は $K$ の中で定義されています。さらに体 $K$ の分配法則・結合法則から

$$
a(x+y)=ax+ay,
$$

$$
(a+b)x=ax+bx,
$$

$$
(ab)x=a(bx),
$$

$$
1_Fx=x
$$

が成り立ちます。従って **$K$ は自然に $F$-ベクトル空間になります。**

例えば

$$
K=\mathbb Q(\sqrt2)
=
\{a+b\sqrt2:a,b\in\mathbb Q\}
$$

なら

$$
1,\sqrt2
$$

は $\mathbb Q$-基底なので

$$
\dim_{\mathbb Q}\mathbb Q(\sqrt2)=2.
$$

FLD1 では、この次元を

$$
[\mathbb Q(\sqrt2):\mathbb Q]=2
$$

と書き、**拡大次数**として体論の量に読み替えます。

---

## 10. 演習

### Level A

<a id="ex-fld0-a01"></a>
#### FLD0-A01 $\mathbb F_2^2$ を全て書き出す

- Level: A

$V=\mathbb F_2^2$ とする。

1. $V$ の全ての元を書け。
2. $e_1=(1,0)$, $e_2=(0,1)$ が $\mathbb F_2$-基底であることを示せ。
3. $e_1+e_2$ を加えた $\{e_1,e_2,e_1+e_2\}$ が一次従属であることを示せ。

<!-- solution-start -->
**詳細解答**

$\mathbb F_2=\{0,1\}$ なので、各成分には2通りしかなく

$$
V=
\{(0,0),(1,0),(0,1),(1,1)\}.
$$

任意の $(x,y)\in V$ は

$$
(x,y)=xe_1+ye_2
$$

と書けるので $e_1,e_2$ は $V$ を張ります。

また

$$
ae_1+be_2=0
$$

なら左辺は $(a,b)$ なので

$$
a=b=0.
$$

従って一次独立で、$e_1,e_2$ は基底です。

最後に $\mathbb F_2$ では $-1=1$ なので

$$
e_1+e_2+(e_1+e_2)
=
2e_1+2e_2
=
0.
$$

係数 $(1,1,1)$ は全て0ではないので、3本の集合は一次従属です。
<!-- solution-end -->

<a id="ex-fld0-a02"></a>
#### FLD0-A02 $\mathbb F_3$ で割る

- Level: A

$\mathbb F_3$ 上で方程式

$$
2x=1
$$

を解け。また $2^{-1}$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\mathbb F_3$ では

$$
2\cdot2=4\equiv1\pmod3.
$$

従って

$$
2^{-1}=2.
$$

両辺に $2^{-1}=2$ を掛けると

$$
x=2\cdot1=2.
$$

確認すると

$$
2x=2\cdot2=4\equiv1\pmod3.
$$

非零元で割れることが、体上の Gaussian 消去や交換補題を支えます。
<!-- solution-end -->

<a id="ex-fld0-a03"></a>
#### FLD0-A03 $\mathbb Q$ 上の一次独立性

- Level: A

$\mathbb R$ を $\mathbb Q$-ベクトル空間と見たとき、$1,\sqrt2$ が $\mathbb Q$ 上一次独立であることを示せ。

<!-- solution-start -->
**詳細解答**

$a,b\in\mathbb Q$ が

$$
a+b\sqrt2=0
$$

を満たすとします。

$b\ne0$ なら

$$
\sqrt2=-\frac ab
$$

となり右辺は有理数です。これは $\sqrt2\notin\mathbb Q$ に矛盾します。従って $b=0$ です。

すると元の式は $a=0$ になります。よって非自明な $\mathbb Q$-線形関係は存在せず、

$$
\{1,\sqrt2\}
$$

は $\mathbb Q$ 上一次独立です。
<!-- solution-end -->

<a id="ex-fld0-a04"></a>
#### FLD0-A04 有限体上の部分空間

- Level: A

$$
W=
\{(x,y,z)\in\mathbb F_5^3:x+2y-z=0\}
$$

が $\mathbb F_5$-部分空間であることを示せ。

<!-- solution-start -->
**詳細解答**

まず

$$
(0,0,0)\in W
$$

なので $W$ は空ではありません。

$u=(u_1,u_2,u_3)$, $v=(v_1,v_2,v_3)\in W$ と $a,b\in\mathbb F_5$ を取ります。すると

$$
u_1+2u_2-u_3=0,
$$

$$
v_1+2v_2-v_3=0.
$$

$au+bv$ の成分に同じ一次式を作用させると

$$
\begin{aligned}
&(au_1+bv_1)+2(au_2+bv_2)-(au_3+bv_3)\\
&=a(u_1+2u_2-u_3)+b(v_1+2v_2-v_3)\\
&=0.
\end{aligned}
$$

従って $au+bv\in W$ です。[体上の部分空間判定法](#prop-fld0-subspace-test-over-field)から $W$ は $\mathbb F_5$-部分空間です。
<!-- solution-end -->

### Level B

<a id="ex-fld0-b01"></a>
#### FLD0-B01 $\mathbb F_2$ 上の核・像・階数

- Level: B

$$
A=
\begin{pmatrix}
1&1&0\\
0&1&1
\end{pmatrix}
\in M_{2\times3}(\mathbb F_2)
$$

が定める線形写像

$$
T:\mathbb F_2^3\to\mathbb F_2^2,
\qquad
T(x)=Ax
$$

について、$\ker T$ と $\operatorname{Im}T$ の基底を求め、階数・退化次数の定理を確認せよ。

<!-- solution-start -->
**詳細解答**

$x=(x_1,x_2,x_3)^T$ とすると

$$
Ax=
\begin{pmatrix}
x_1+x_2\\
x_2+x_3
\end{pmatrix}.
$$

従って $Ax=0$ は

$$
x_1+x_2=0,
\qquad
x_2+x_3=0.
$$

$\mathbb F_2$ では $-x=x$ なので

$$
x_1=x_2,
\qquad
x_3=x_2.
$$

従って

$$
x=t(1,1,1)^T,
\qquad
t\in\mathbb F_2.
$$

よって

$$
\ker T
=
\operatorname{span}_{\mathbb F_2}
\{(1,1,1)^T\},
$$

$$
\dim_{\mathbb F_2}\ker T=1.
$$

像は $A$ の列ベクトルで張られます。

$$
c_1=
\begin{pmatrix}1\\0\end{pmatrix},
\qquad
c_2=
\begin{pmatrix}1\\1\end{pmatrix},
\qquad
c_3=
\begin{pmatrix}0\\1\end{pmatrix}.
$$

$c_1,c_3$ は $\mathbb F_2^2$ の標準基底なので像は全体です。

$$
\operatorname{Im}T=\mathbb F_2^2,
\qquad
\dim_{\mathbb F_2}\operatorname{Im}T=2.
$$

したがって

$$
\dim_{\mathbb F_2}\mathbb F_2^3
=
3
=
1+2
=
\dim\ker T+\dim\operatorname{Im}T.
$$
<!-- solution-end -->

<a id="ex-fld0-b02"></a>
#### FLD0-B02 スカラー体を変えると独立性が変わる

- Level: B

$V=\mathbb R$ とし、$S=\{1,\sqrt2\}$ とする。

1. $V$ を $\mathbb Q$-ベクトル空間と見たとき $S$ は一次独立であることを示せ。
2. $V$ を $\mathbb R$-ベクトル空間と見たとき $S$ は一次従属であることを示せ。
3. この差が生じる理由を「許される係数」の違いから説明せよ。

<!-- solution-start -->
**詳細解答**

第1問は A03 と同じです。$a,b\in\mathbb Q$ について

$$
a+b\sqrt2=0
$$

なら $b\ne0$ は $\sqrt2\in\mathbb Q$ を導くので不可能です。従って $a=b=0$ で、$\mathbb Q$ 上一次独立です。

一方 $\mathbb R$ 上では係数 $-\sqrt2$ を使えるので

$$
(-\sqrt2)\cdot1+1\cdot\sqrt2=0
$$

という非自明な線形関係があります。従って $\mathbb R$ 上一次従属です。

同じ集合 $S$ を見ていても、$\mathbb Q$ 上では $-\sqrt2$ を係数として使えず、$\mathbb R$ 上では使えます。一次独立性は「どの係数を許すか」を含む概念なので、スカラー体を変えると判定が変わります。
<!-- solution-end -->

<a id="ex-fld0-b03"></a>
#### FLD0-B03 一般の体上の座標写像

- Level: B

$V$ を3次元 $F$-ベクトル空間、$\mathcal B=(v_1,v_2,v_3)$ を順序付き基底とする。

$$
x=2v_1-v_2+3v_3
$$

という記法を使える体 $F$ を考える。ただし体によっては $2,3,-1$ が同じ元を表す場合もある。

1. $[x]_{\mathcal B}$ を書け。
2. $F=\mathbb F_3$ の場合に座標を簡約せよ。
3. 座標写像の線形性を $a,b\in F$ に対して確認せよ。

<!-- solution-start -->
**詳細解答**

一般の $F$ では

$$
[x]_{\mathcal B}
=
\begin{pmatrix}
2\\
-1\\
3
\end{pmatrix},
$$

ただし各整数は $F$ の単位元 $1_F$ の整数倍として解釈します。

$F=\mathbb F_3$ では

$$
3=0,
\qquad
-1=2
$$

なので

$$
[x]_{\mathcal B}
=
\begin{pmatrix}
2\\
2\\
0
\end{pmatrix}.
$$

次に

$$
y=d_1v_1+d_2v_2+d_3v_3
$$

とします。すると

$$
ax+by
=
\sum_{i=1}^3(ac_i+bd_i)v_i
$$

なので、基底展開の一意性から

$$
[ax+by]_{\mathcal B}
=
a[x]_{\mathcal B}
+
b[y]_{\mathcal B}.
$$

従って座標写像は $F$-線形です。
<!-- solution-end -->

### Level C

<a id="ex-fld0-c01"></a>
#### FLD0-C01 $\mathbb Q(\sqrt2)$ を線形写像で見る

- Level: C

$$
K=
\mathbb Q(\sqrt2)
=
\{a+b\sqrt2:a,b\in\mathbb Q\}
$$

を $\mathbb Q$-ベクトル空間とし、

$$
T:K\to K,
\qquad
T(x)=\sqrt2,x
$$

と定める。

1. $T$ が $\mathbb Q$-線形であることを示せ。
2. 基底 $\mathcal B=(1,\sqrt2)$ に関する表現行列を求めよ。
3. $T^2=2I$ を行列計算でも確認せよ。
4. この例が「体拡大を線形代数で見る」入口になっている理由を説明せよ。

<!-- solution-start -->
**詳細解答**

まず $x,y\in K$ と $a,b\in\mathbb Q$ に対して

$$
\begin{aligned}
T(ax+by)
&=\sqrt2(ax+by)\\
&=a\sqrt2x+b\sqrt2y\\
&=aT(x)+bT(y).
\end{aligned}
$$

ここで $a,b$ と $\sqrt2$ の積は実数の乗法なので可換です。従って $T$ は $\mathbb Q$-線形です。

次に基底ベクトルの像を計算します。

$$
T(1)=\sqrt2
=
0\cdot1+1\cdot\sqrt2,
$$

$$
T(\sqrt2)=2
=
2\cdot1+0\cdot\sqrt2.
$$

従って表現行列の第1列・第2列はそれぞれ $(0,1)^T$, $(2,0)^T$ で

$$
[T]_{\mathcal B}
=
\begin{pmatrix}
0&2\\
1&0
\end{pmatrix}.
$$

これを二乗すると

$$
\begin{pmatrix}
0&2\\
1&0
\end{pmatrix}^2
=
\begin{pmatrix}
2&0\\
0&2
\end{pmatrix}
=
2I.
$$

元の写像でも

$$
T^2(x)
=
\sqrt2(\sqrt2x)
=
2x
$$

なので確かに

$$
T^2=2I.
$$

この例では $K$ 自身が体ですが、同時に $\mathbb Q$ をスカラー体とする2次元ベクトル空間でもあります。体の乗法「$\sqrt2$ を掛ける」を $\mathbb Q$-線形写像として行列化できました。

FLD1 ではこの

$$
\dim_{\mathbb Q}K=2
$$

を

$$
[K:\mathbb Q]=2
$$

という拡大次数として読み、代数的元・最小多項式・商多項式環へ接続します。
<!-- solution-end -->

---

## 11. 次に進む

一般の体 $F$ 上でも、基底・次元・線形写像という代数的な線形代数が使えることが分かりました。また $F\subset K$ なら、$K$ を自然に $F$-ベクトル空間として見られます。

次はこの視点を体論そのものへ移し、**拡大次数・代数的元・最小多項式**を構成します。

**次：[FLD1 体拡大・代数的元・最小多項式](../FLD1/index.md)**
