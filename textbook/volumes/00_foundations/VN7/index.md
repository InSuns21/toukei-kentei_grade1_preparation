# VN7 factor と型分類への入口

<!-- definition-example-audit: strict -->

> **既出概念**：[VN2 の可換子と von Neumann 環](../VN2/index.md#def-vn2-commutant)、[VN3 の射影・部分等長作用素](../VN3/index.md#def-vn3-partial-isometry)、[VN5 のトレース](../VN5/index.md)、[VN6 の可換 von Neumann 環](../VN6/index.md#thm-vn6-linfty-commutant)を使います。

VN6 では、可換 von Neumann 環では「代数の全ての元が互いに可換する」世界を見ました。反対に、非可換な作用素環では、**全ての元と同時に可換する部分**だけを取り出すと、代数がいくつの独立な成分に分かれているかが見えてきます。

まず、この「全員と可換する部分」に名前を与え、その射影が代数をどう分解するかを調べます。そのうえで、これ以上その方法では分けられない基本ブロックへ進みます。

ただし、その基本ブロックまで分けても分類は終わりません。有限次元の行列環と、無限次元 Hilbert 空間上の全有界作用素環は、どちらも「これ以上この方法では分けられない」のに、射影の大きさの振る舞いが異なります。

そこで、部分等長作用素を使って射影どうしを直接比較し、「真の一部分が全体と同じ大きさになれるか」「これ以上小さく割れない射影があるか」を調べます。この二つの問いから I / II / III という三つの型が自然に現れます。

型 II・III の深い構造や Tomita--Takesaki 理論には進みません。ここでの目的は、**何を測って三つの型に分けるのか**を射影の構造から理解することです。

---

## 1. 全員と可換する部分

von Neumann 環 $M\subset B(H)$ の元のうち、$M$ の全ての元と可換するものを集めます。

<a id="def-vn7-center"></a>

<!-- formal-statement-start -->
### 定義（中心）

$M\subset B(H)$ を von Neumann 環とする。

$$
\boxed{
Z(M):=M\cap M'
}
$$

を $M$ の **中心** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn7-center -->

### **定義の確認**：可換 von Neumann 環では中心が全体になる

$M$ が可換なら、任意の $x,y\in M$ について

$$
xy=yx.
$$

従って全ての $x\in M$ は $M'$ に属します。すなわち

$$
M\subset M'.
$$

したがって

$$
Z(M)
=
M\cap M'
=
\boxed{M}.
$$

VN6 の $L^\infty$ 乗算環はこの状況の代表例です。

<!-- definition-example-end -->

中心の射影は、代数そのものを独立な成分へ切り分けます。

<a id="prop-vn7-central-projection-decomposition"></a>

<!-- formal-statement-start -->
### 命題（中心射影による直和分解）

$M$ を von Neumann 環とし、

$$
z\in Z(M),
\qquad
z=z^*=z^2
$$

とする。

このとき

$$
zM:=\{zx:x\in M\},
\qquad
(I-z)M:=\{(I-z)x:x\in M\}
$$

はそれぞれ単位元 $z$、$I-z$ を持つ von Neumann 環であり、

$$
\boxed{
M\cong zM\oplus(I-z)M
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

写像

$$
\Phi:M\to zM\oplus(I-z)M
$$

を

$$
\Phi(x)=(zx,(I-z)x)
$$

で定めます。

$z$ は中心にあるので、$x,y\in M$ に対し

$$
zxy=(zx)(zy),
$$

また

$$
(zx)^*=zx^*
$$

です。したがって $zM$ は積と随伴で閉じています。同様に $(I-z)M$ も積と随伴で閉じています。

$\Phi$ は線形で、

$$
\Phi(xy)
=
(zxy,(I-z)xy)
=
(zxzy,(I-z)x(I-z)y)
=
\Phi(x)\Phi(y)
$$

です。随伴も保ちます。

単射性を確認します。$\Phi(x)=(0,0)$ なら

$$
zx=0,
\qquad
(I-z)x=0.
$$

両式を足して

$$
x=zx+(I-z)x=0.
$$

従って $\Phi$ は単射です。

次に全射性を示します。

$$
a\in zM,
\qquad
b\in(I-z)M
$$

を取ります。ある $x,y\in M$ があって

$$
a=zx,
\qquad
b=(I-z)y.
$$

ここで

$$
w=a+b\in M
$$

と置くと、

$$
zw
=
za+zb
=
a+0
=
a,
$$

かつ

$$
(I-z)w
=
0+b
=
b.
$$

従って

$$
\Phi(w)=(a,b).
$$

よって $\Phi$ は全射です。

最後に $zM$ が WOT 閉であることを確認します。$zx_\alpha$ が WOT で $T$ へ収束するとします。左から固定作用素 $z$ を掛ける操作は WOT 連続なので

$$
z(zx_\alpha)=zx_\alpha
\longrightarrow zT
$$

です。一方、[距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)から $zT=T$。また [von Neumann 環の定義](../VN2/index.md#def-vn2-von-neumann-algebra)から、WOT 極限 $T$ も $M$ に属します。したがって

$$
T=zT\in zM.
$$

よって $zM$ は von Neumann 環です。$(I-z)M$ も同様です。

以上より

$$
\boxed{
M\cong zM\oplus(I-z)M
}.
$$
<!-- proof-end -->

非自明な中心射影

$$
0\ne z\ne I
$$

があると、$M$ は二つの独立な部分へ割れます。

そこで「もう中心では割れない」成分を基本ブロックとして考えます。

---

## 2. 中心でこれ以上分解できない基本ブロック

非自明な中心射影があると、前節の直和分解で代数をさらに分けられます。したがって、中心がスカラー倍しか持たない場合を「中心による分解が尽きた基本ブロック」とみなすのが自然です。この基本ブロックに名前を与えます。

<a id="def-vn7-factor"></a>

<!-- formal-statement-start -->
### 定義（factor）

$M\subset B(H)$ を von Neumann 環とする。

$$
\boxed{
Z(M)=\mathbb C I
}
$$

が成り立つとき、$M$ を **factor** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn7-factor -->

### **定義の確認**：$M_n(\mathbb C)$ は factor

$$
M=M_n(\mathbb C)
$$

を $\mathbb C^n$ 上に自然に作用させます。

$A\in Z(M)$ とします。各標準基底ベクトルを $e_j$ とし、行列単位を

$$
E_{jk}e_k=e_j,
\qquad
E_{jk}e_\ell=0\quad(\ell\ne k)
$$

とします。

$A$ は全ての $E_{jj}$ と可換するので、各座標軸 $\mathbb Ce_j$ を保ちます。従って

$$
Ae_j=\lambda_j e_j.
$$

さらに $A$ は $E_{jk}$ と可換するので

$$
AE_{jk}e_k
=
AE_{jk}e_k
=
Ae_j
=
\lambda_j e_j,
$$

一方

$$
E_{jk}Ae_k
=
E_{jk}(\lambda_k e_k)
=
\lambda_k e_j.
$$

よって

$$
\lambda_j=\lambda_k
$$

です。$j,k$ は任意なので、ある $\lambda\in\mathbb C$ があって

$$
A=\lambda I.
$$

従って

$$
Z(M_n(\mathbb C))=\mathbb C I.
$$

よって

$$
\boxed{
M_n(\mathbb C)\text{ は factor}
}.
$$

<!-- definition-example-end -->

同じ現象は無限次元の $B(H)$ にも起こります。

<a id="thm-vn7-bh-factor"></a>

<!-- formal-statement-start -->
### 定理（全有界作用素環は factor）

$H\ne\{0\}$ を複素 Hilbert 空間とする。

このとき

$$
\boxed{
Z(B(H))=\mathbb C I
}
$$

である。

従って $B(H)$ は factor である。
<!-- formal-statement-end -->

### 証明の見取り図

$T\in B(H)$ が全ての作用素と可換するとします。

一つの単位ベクトル $e$ を固定し、任意の $x\in H$ に対して rank-one 作用素

$$
\theta_{x,e}(y)=\langle y,e\rangle x
$$

を使います。

まず $e$ への射影と可換することから

$$
Te=\lambda e
$$

を得ます。次に $\theta_{x,e}$ と可換することから

$$
Tx=\lambda x
$$

を全ての $x$ について得ます。

<!-- proof-start -->
### 証明

$$
T\in Z(B(H))
$$

とします。

単位ベクトル $e\in H$ を一つ固定します。

$e$ への直交射影を $P_e$ とすると

$$
P_e\in B(H)
$$

なので、$T$ は $P_e$ と可換します。

特に

$$
TP_e e=P_eTe.
$$

左辺は $Te$、右辺は $\mathbb Ce$ に属します。従ってある $\lambda\in\mathbb C$ があって

$$
Te=\lambda e.
$$

次に任意の $x\in H$ に対して

$$
\theta_{x,e}(y)
:=
\langle y,e\rangle x
$$

と定めます。

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\|\theta_{x,e}(y)\|
=
|\langle y,e\rangle|\|x\|
\le
\|y\|\|x\|
$$

なので

$$
\theta_{x,e}\in B(H).
$$

$T$ は全ての $B(H)$ の元と可換するため

$$
T\theta_{x,e}
=
\theta_{x,e}T.
$$

両辺を $e$ に作用させると、

$$
T\theta_{x,e}e
=
Tx
$$

です。

一方

$$
\theta_{x,e}Te
=
\theta_{x,e}(\lambda e)
=
\lambda x.
$$

従って

$$
Tx=\lambda x.
$$

$x$ は任意なので

$$
T=\lambda I.
$$

よって

$$
Z(B(H))
=
\mathbb C I.
$$

従って

$$
\boxed{
B(H)\text{ は factor}
}.
$$
<!-- proof-end -->

ここで重要な問題が残ります。

$$
M_n(\mathbb C)
$$

も

$$
B(\ell^2(\mathbb N))
$$

も factor です。

中心だけを見ると両者は同じ「分解不能なブロック」です。しかし一方は有限次元、もう一方は無限次元です。

この差を、抽象 von Neumann 環の内部だけで読む道具が必要です。

---

## 3. 射影を「同じ大きさ」と判定する

Hilbert 空間では、二つの閉部分空間の次元が同じなら unitary によって移せます。

von Neumann 環の内部では、VN3 の部分等長作用素を使います。

<a id="def-vn7-murray-von-neumann-equivalence"></a>

<!-- formal-statement-start -->
### 定義（射影の Murray--von Neumann 同値）

$M\subset B(H)$ を von Neumann 環とし、$p,q\in M$ を射影とする。

ある部分等長作用素 $v\in M$ が存在して

$$
\boxed{
v^*v=p,
\qquad
vv^*=q
}
$$

を満たすとき、$p$ と $q$ は **Murray--von Neumann 同値**であるといい、

$$
\boxed{
p\sim_M q
}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn7-murray-von-neumann-equivalence -->

### **定義の確認**：$M_2(\mathbb C)$ の二つの rank-one 射影

$$
p=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
\qquad
q=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
$$

とします。

$$
v=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
$$

と置くと

$$
v^*
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}.
$$

従って

$$
v^*v
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
=
p
$$

であり、

$$
vv^*
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
=
q.
$$

よって

$$
\boxed{
p\sim_{M_2(\mathbb C)}q
}.
$$

$v$ は $p\mathbb C^2=\mathbb Ce_1$ を $q\mathbb C^2=\mathbb Ce_2$ へ等長に運んでいます。

<!-- definition-example-end -->

この定義が本当に「同じ大きさ」を表すためには、同値関係になっていなければなりません。

<a id="prop-vn7-murray-von-neumann-equivalence-relation"></a>

<!-- formal-statement-start -->
### 命題（Murray--von Neumann 同値は同値関係）

von Neumann 環 $M$ の射影全体に対して、

$$
p\sim_M q
$$

は反射律・対称律・推移律を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 反射律

射影 $p$ 自身を

$$
v=p
$$

と置けば

$$
v^*v=p^2=p,
\qquad
vv^*=p^2=p.
$$

従って

$$
p\sim_M p.
$$

#### 対称律

$p\sim_M q$ とします。ある $v\in M$ があって

$$
v^*v=p,
\qquad
vv^*=q.
$$

ここで $v^*$ を使うと

$$
(v^*)^*v^*=vv^*=q
$$

かつ

$$
v^*(v^*)^*=v^*v=p.
$$

従って

$$
q\sim_M p.
$$

#### 推移律

$p\sim_M q$、$q\sim_M r$ とします。

ある部分等長作用素 $v,w\in M$ があって

$$
v^*v=p,
\qquad
vv^*=q,
$$

$$
w^*w=q,
\qquad
ww^*=r.
$$

ここで

$$
u:=wv\in M
$$

と置きます。

まず

$$
\begin{aligned}
u^*u
&=
v^*w^*wv\\
&=
v^*qv.
\end{aligned}
$$

$vv^*=q$ なので

$$
qv
=
vv^*v
=
v(v^*v)
=
vp
=
v.
$$

従って

$$
u^*u
=
v^*v
=
p.
$$

次に

$$
\begin{aligned}
uu^*
&=
wvv^*w^*\\
&=
wqw^*.
\end{aligned}
$$

$w^*w=q$ なので

$$
wq
=
w(w^*w)
=
(ww^*)w
=
rw
=
w.
$$

従って

$$
uu^*
=
ww^*
=
r.
$$

よって

$$
p\sim_M r.
$$

以上から Murray--von Neumann 同値は同値関係です。
<!-- proof-end -->

---

## 4. 行列では Murray--von Neumann 同値は rank と一致する

抽象定義が有限次元で何を意味するか確認します。

<a id="thm-vn7-matrix-equivalence-rank"></a>

<!-- formal-statement-start -->
### 定理（行列環では射影同値と rank が一致する）

$p,q\in M_n(\mathbb C)$ を射影とする。

このとき

$$
\boxed{
p\sim q
\quad\Longleftrightarrow\quad
\operatorname{rank}p=\operatorname{rank}q
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
p\sim q
$$

とします。

ある部分等長作用素 $v$ があって

$$
v^*v=p,
\qquad
vv^*=q.
$$

VN3 の部分等長作用素の性質から、$v$ は

$$
p\mathbb C^n
$$

から

$$
q\mathbb C^n
$$

への等長写像です。さらに終空間は $q\mathbb C^n$ 全体なので、この二つの部分空間は同じ次元を持ちます。

従って

$$
\operatorname{rank}p
=
\dim(p\mathbb C^n)
=
\dim(q\mathbb C^n)
=
\operatorname{rank}q.
$$

逆に

$$
\operatorname{rank}p=\operatorname{rank}q=r
$$

とします。

$p\mathbb C^n$ の正規直交基底を

$$
e_1,\ldots,e_r
$$

とし、$q\mathbb C^n$ の正規直交基底を

$$
f_1,\ldots,f_r
$$

とします。

$p\mathbb C^n$ 上で

$$
ve_j=f_j
$$

と定め、$(p\mathbb C^n)^\perp$ 上では $v=0$ とします。

すると $v$ は初期空間 $p\mathbb C^n$、終空間 $q\mathbb C^n$ を持つ部分等長作用素です。

従って

$$
v^*v=p,
\qquad
vv^*=q.
$$

よって

$$
p\sim q.
$$

以上から

$$
\boxed{
p\sim q
\Longleftrightarrow
\operatorname{rank}p=\operatorname{rank}q
}.
$$
<!-- proof-end -->

この結果は「Murray--von Neumann 同値は次元の抽象化」であることを示します。

ただし無限次元では、全空間と真の部分空間が同じ Hilbert 次元を持つことがあります。

ここから、射影が「真の一部分と同じ大きさになれるか」という有限性の新しい区別が生まれます。

---

## 5. 射影の有限性

射影 $q$ が射影 $p$ の部分であることを

$$
q\le p
$$

と書きます。作用素としては

$$
pq=qp=q
$$

と同値です。

<a id="def-vn7-finite-projection"></a>

<!-- formal-statement-start -->
### 定義（有限射影・無限射影）

$M$ を von Neumann 環、$p\in M$ を射影とする。

$p$ が **有限射影**であるとは、

$$
q\le p,
\qquad
q\sim_M p
$$

を満たす射影 $q\in M$ が必ず

$$
q=p
$$

となることをいう。

有限でない射影を **無限射影**という。

すなわち $p$ が無限であるとは、ある真部分射影

$$
q<p
$$

が存在して

$$
q\sim_M p
$$

となることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn7-finite-projection -->

### **定義の確認**：有限次元行列の射影は全て有限

$p\in M_n(\mathbb C)$ を射影とします。

$q\le p$ かつ $q\sim p$ と仮定します。

[行列環では射影同値と rank が一致する定理](#thm-vn7-matrix-equivalence-rank)から

$$
\operatorname{rank}q
=
\operatorname{rank}p.
$$

一方 $q\le p$ なので

$$
q\mathbb C^n\subset p\mathbb C^n.
$$

有限次元部分空間で包含関係があり、しかも次元が等しいので

$$
q\mathbb C^n=p\mathbb C^n.
$$

従って直交射影も等しく

$$
q=p.
$$

よって

$$
\boxed{
M_n(\mathbb C)\text{ の射影は全て有限}
}.
$$

<!-- definition-example-end -->

無限次元では逆の現象が起こります。

<a id="prop-vn7-shift-infinite-identity"></a>

<!-- formal-statement-start -->
### 命題（片側シフトが示す単位射影の無限性）

$$
H=\ell^2(\mathbb N)
$$

とし、標準正規直交基底を $(e_1,e_2,\ldots)$ とする。

片側シフト

$$
Se_k=e_{k+1}
$$

を考える。

このとき

$$
S^*S=I,
\qquad
SS^*=I-P_{e_1}.
$$

従って

$$
\boxed{
I\sim I-P_{e_1}<I
}
$$

であり、$I$ は $B(H)$ の無限射影である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の基底ベクトル $e_k$ について

$$
\|Se_k\|=\|e_{k+1}\|=1
$$

であり、正規直交基底全体を一つ右へずらすので $S$ は等長作用素です。

従って

$$
S^*S=I.
$$

一方 $S$ の像は

$$
\overline{\operatorname{span}}\{e_2,e_3,\ldots\}
=
(\mathbb Ce_1)^\perp.
$$

VN3 の部分等長作用素と終射影の関係から

$$
SS^*
=
P_{(\mathbb Ce_1)^\perp}
=
I-P_{e_1}.
$$

よって $S$ を同値を実現する部分等長作用素として

$$
I\sim I-P_{e_1}.
$$

しかも

$$
I-P_{e_1}<I.
$$

したがって定義から

$$
\boxed{
I\text{ は無限射影}
}.
$$
<!-- proof-end -->

これは無限集合についての

$$
\mathbb N
\cong
\{2,3,4,\ldots\}
$$

という現象の作用素版です。

---

## 6. これ以上小さく割れない原子

有限・無限だけではまだ型 I と型 II を区別できません。

型 I の特徴は、最小の非零射影が存在することです。

<a id="def-vn7-minimal-projection"></a>

<!-- formal-statement-start -->
### 定義（最小射影）

$M$ を von Neumann 環とし、$0\ne p\in M$ を射影とする。

$$
0\le q\le p
$$

を満たす射影 $q\in M$ が

$$
q=0
\quad\text{または}\quad
q=p
$$

に限られるとき、$p$ を **最小射影**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn7-minimal-projection -->

### **定義の確認**：$M_n(\mathbb C)$ の rank-one 射影は最小

$p$ を rank-one 射影とします。

$q\le p$ なら

$$
q\mathbb C^n\subset p\mathbb C^n.
$$

右辺は1次元なので、$q\mathbb C^n$ は

$$
\{0\}
$$

または

$$
p\mathbb C^n
$$

のどちらかです。

従って

$$
q=0
$$

または

$$
q=p.
$$

よって

$$
\boxed{
\text{rank-one 射影は最小射影}
}.
$$

逆に rank が2以上なら、その像の中の1次元部分空間への直交射影が真の非零部分射影になるので最小ではありません。

<!-- definition-example-end -->

$B(\ell^2)$ にも rank-one 射影があるため、単位射影が無限でも「最小射影を持つ」という意味では $M_n(\mathbb C)$ と同じ側に属します。

これが型 I の共通点です。

---

## 7. 三つの型へ分類する

ここまでの道具を一つにまとめます。

<a id="def-vn7-factor-type-classification"></a>

<!-- formal-statement-start -->
### 定義（factor の I / II / III 型）

$M$ を factor とする。

1. $M$ が **I 型**であるとは、$M$ が非零の最小射影を持つことをいう。
2. $M$ が **II 型**であるとは、$M$ が非零の最小射影を持たないが、非零の有限射影を持つことをいう。
3. $M$ が **III 型**であるとは、$M$ の非零射影が全て無限射影であることをいう。

II 型のうち、

- 単位射影 $I$ が有限なら **II$_1$ 型**
- 単位射影 $I$ が無限なら **II$_\infty$ 型**

と呼ぶ。

I 型では、有限次元の

$$
M_n(\mathbb C)
$$

を **I$_n$ 型**と呼び、可分無限次元 Hilbert 空間上の

$$
B(\ell^2(\mathbb N))
$$

を **I$_\infty$ 型**の標準例と呼ぶ。
<!-- formal-statement-end -->

この定義で、何を見て分類しているかが明確になります。

| 型 | 最小射影 | 非零有限射影 | 単位射影の典型 |
|---|---|---|---|
| I | ある | ある | 有限の場合も無限の場合もある |
| II | ない | ある | II$_1$ では有限、II$_\infty$ では無限 |
| III | ない | ない | 無限 |

### I$_n$ 型：$M_n(\mathbb C)$

すでに示したように

$$
M_n(\mathbb C)
$$

は factor です。

rank-one 射影は最小射影なので I 型です。

さらに単位射影は

$$
I
=
E_{11}+\cdots+E_{nn}
$$

と、互いに直交し、互いに Murray--von Neumann 同値な $n$ 個の最小射影へ分解されます。

従って

$$
\boxed{
M_n(\mathbb C)\text{ は I}_n\text{ 型}
}.
$$

### I$_\infty$ 型：$B(\ell^2)$

$B(\ell^2)$ は factor で、rank-one 射影を持つので I 型です。

一方、片側シフトにより

$$
I\sim I-P_{e_1}<I
$$

なので単位射影は無限です。

従って

$$
\boxed{
B(\ell^2(\mathbb N))\text{ は I}_\infty\text{ 型}
}.
$$

---

## 8. なぜ II 型・III 型が必要なのか

型 I の世界では、最小射影が「原子」になります。

有限次元行列なら rank-one 射影、$B(\ell^2)$ でも1次元部分空間への射影が最小です。したがって空間を最小単位まで分解する像が残っています。

しかし一般の factor では、非零射影 $p$ を取っても、その中にさらに

$$
0<q<p
$$

となる非零射影を見つけられ、これをどこまでも続けられる場合があります。

それでも有限射影が残るなら II 型です。

特に II$_1$ 型では単位射影 $I$ 自身が有限です。有限次元の rank のような整数値の「大きさ」はありませんが、VN5 で見たトレースを使うと、典型的な II$_1$ factor では射影の大きさを連続的に測る構造が現れます。

ここで重要なのは、

$$
\boxed{
\text{最小射影がない}
\quad\ne\quad
\text{射影の大きさを測れない}
}
$$

という点です。

II 型は「原子はないが、有限性は残る」世界です。

一方 III 型では、非零有限射影すらありません。

つまり任意の非零射影 $p$ が、ある真部分射影 $q<p$ と

$$
p\sim q
$$

になります。

このため、有限次元的な「全体の中に同じ大きさの真部分は入らない」という直観が完全に失われます。

$$
\boxed{
\begin{array}{c}
\text{I 型}\\
\text{最小射影がある}
\end{array}
\quad\longrightarrow\quad
\begin{array}{c}
\text{II 型}\\
\text{最小射影はないが有限射影はある}
\end{array}
\quad\longrightarrow\quad
\begin{array}{c}
\text{III 型}\\
\text{非零有限射影がない}
\end{array}
}
$$

という順に、「有限次元の部分空間」という像から離れていきます。

II 型・III 型 factor の具体的構成や分類は深い理論です。本章ではその構成を黒箱として持ち込まず、**それらが必要になる分類軸そのもの**を射影から理解するところまでを扱います。

---

## 9. 中心と型分類は役割が違う

最後に二段階を分けて整理します。

### 第1段階：中心で分解する

中心射影 $z$ があれば

$$
M\cong zM\oplus(I-z)M
$$

と分解できます。

したがって factor は「中心による分解を終えた基本ブロック」です。

### 第2段階：factor の内部で射影を比較する

factor になっても

$$
M_n(\mathbb C)
$$

と

$$
B(\ell^2)
$$

は区別できません。

そこで Murray--von Neumann 同値によって射影を比較し、

- 最小射影があるか
- 有限射影があるか
- 単位射影が有限か無限か

を調べます。

これが I / II / III 型分類です。

$$
\boxed{
\text{中心}
\;\text{は「分解できるか」を測り、}
\quad
\text{射影}
\;\text{は「factor の内部構造」を測る}
}
$$

と整理できます。

---

# 演習

## Level A

### A1. 中心を計算する

$M=M_2(\mathbb C)$ とする。

1. $A\in Z(M)$ なら $A$ が $E_{11}$ と可換することから、$A$ の非対角成分が0になることを示せ。
2. さらに $E_{12}$ と可換することから、二つの対角成分が等しいことを示せ。
3. $Z(M)=\mathbb CI$ を結論せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$$
A=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

とします。

$$
E_{11}
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

計算すると

$$
AE_{11}
=
\begin{pmatrix}
a&0\\
c&0
\end{pmatrix},
\qquad
E_{11}A
=
\begin{pmatrix}
a&b\\
0&0
\end{pmatrix}.
$$

両者が等しいので

$$
b=c=0.
$$

従って

$$
A=
\begin{pmatrix}
a&0\\
0&d
\end{pmatrix}.
$$

次に

$$
E_{12}
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

と可換するので

$$
AE_{12}
=
\begin{pmatrix}
0&a\\
0&0
\end{pmatrix},
$$

一方

$$
E_{12}A
=
\begin{pmatrix}
0&d\\
0&0
\end{pmatrix}.
$$

従って

$$
a=d.
$$

よって

$$
A=aI.
$$

従って

$$
\boxed{
Z(M_2(\mathbb C))=\mathbb CI
}.
$$

<!-- solution-end -->

---

### A2. 二つの rank-one 射影を同値にする

$$
p=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
\qquad
q=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
$$

とする。

1.
   $$
   v=
   \begin{pmatrix}
   0&0\\
   1&0
   \end{pmatrix}
   $$
   に対して $v^*v=p$ を示せ。
2. $vv^*=q$ を示せ。
3. $p\sim q$ を結論せよ。
4. $v$ の初期空間と終空間を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$$
v^*
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}.
$$

従って

$$
v^*v
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
=
p.
$$

また

$$
vv^*
=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
=
q.
$$

従って定義から

$$
\boxed{
p\sim q
}.
$$

VN3 の初期射影・終射影の対応から、初期空間は

$$
p\mathbb C^2=\mathbb Ce_1,
$$

終空間は

$$
q\mathbb C^2=\mathbb Ce_2.
$$

<!-- solution-end -->

---

### A3. 片側シフトで無限射影を確認する

$H=\ell^2(\mathbb N)$ とし、

$$
Se_k=e_{k+1}
$$

とする。

1. $S^*e_1=0$、$S^*e_{k+1}=e_k$ を示せ。
2. $S^*S=I$ を示せ。
3. $SS^*=I-P_{e_1}$ を示せ。
4. $I$ が無限射影であることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

内積を基底上で比べると

$$
\langle Se_j,e_k\rangle
=
\delta_{j+1,k}.
$$

従って

$$
S^*e_1=0,
$$

また $k\ge1$ に対して

$$
S^*e_{k+1}=e_k.
$$

よって全ての $k$ で

$$
S^*Se_k
=
S^*e_{k+1}
=
e_k.
$$

従って

$$
\boxed{
S^*S=I
}.
$$

一方

$$
SS^*e_1=0,
$$

$k\ge2$ なら

$$
SS^*e_k
=
Se_{k-1}
=
e_k.
$$

従って

$$
\boxed{
SS^*=I-P_{e_1}
}.
$$

したがって $S$ が Murray--von Neumann 同値を実現し、

$$
I\sim I-P_{e_1}.
$$

しかも

$$
I-P_{e_1}<I.
$$

よって

$$
\boxed{
I\text{ は無限射影}
}.
$$

<!-- solution-end -->

---

### A4. I$_n$ と I$_\infty$ を判定する

1. $M_n(\mathbb C)$ が I$_n$ 型 factor である理由を述べよ。
2. $B(\ell^2(\mathbb N))$ が I$_\infty$ 型 factor である理由を述べよ。
3. 両者に共通する性質と、異なる性質を一つずつ挙げよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$M_n(\mathbb C)$ について、

- 中心は $\mathbb CI$ なので factor
- rank-one 射影は最小射影
- 単位射影は $n$ 個の互いに直交する rank-one 射影の和

です。

従って

$$
\boxed{
M_n(\mathbb C)\text{ は I}_n\text{ 型 factor}
}.
$$

一方 $B(\ell^2)$ では、

- $B(H)$ の中心は $\mathbb CI$ なので factor
- rank-one 射影を持つので I 型
- 片側シフトにより単位射影 $I$ は無限

です。

従って

$$
\boxed{
B(\ell^2)\text{ は I}_\infty\text{ 型 factor}
}.
$$

共通点は

$$
\boxed{
\text{どちらも最小射影を持つ I 型 factor}
}
$$

であることです。

相違点は

$$
\boxed{
M_n(\mathbb C)\text{ の }I\text{ は有限、}
\quad
B(\ell^2)\text{ の }I\text{ は無限}
}
$$

です。

<!-- solution-end -->

---

## Level B

### B1. $B(H)'=\mathbb CI$ を rank-one 作用素から再証明する

$H\ne\{0\}$ とし、

$$
T\in B(H)'
$$

とする。

1. 単位ベクトル $e$ を固定し、$e$ への射影 $P_e$ と $T$ の可換性から $Te=\lambda e$ を示せ。
2. 任意の $x\in H$ に対し
   $$
   \theta_{x,e}(y)=\langle y,e\rangle x
   $$
   が有界作用素であることを示せ。
3. $T\theta_{x,e}=\theta_{x,e}T$ を $e$ に作用させ、$Tx=\lambda x$ を示せ。
4. $T=\lambda I$ と結論せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$P_e\in B(H)$ なので

$$
TP_e=P_eT.
$$

$P_ee=e$ を使うと

$$
Te
=
TP_ee
=
P_eTe.
$$

右辺は $\mathbb Ce$ に属するので、ある $\lambda\in\mathbb C$ があって

$$
Te=\lambda e.
$$

次に

$$
\theta_{x,e}(y)=\langle y,e\rangle x
$$

とします。

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
\|\theta_{x,e}(y)\|
=
|\langle y,e\rangle|\|x\|
\le
\|y\|\|x\|.
$$

よって

$$
\theta_{x,e}\in B(H).
$$

$T$ は $B(H)'$ にあるので

$$
T\theta_{x,e}
=
\theta_{x,e}T.
$$

これを $e$ に作用させると

$$
T\theta_{x,e}e
=
Tx,
$$

一方

$$
\theta_{x,e}Te
=
\theta_{x,e}(\lambda e)
=
\lambda x.
$$

従って

$$
Tx=\lambda x.
$$

$x$ は任意なので

$$
\boxed{
T=\lambda I
}.
$$

従って

$$
\boxed{
B(H)'=\mathbb CI
}.
$$

<!-- solution-end -->

---

### B2. $M_n(\mathbb C)$ で射影同値と rank を結ぶ

$p,q\in M_n(\mathbb C)$ を射影とする。

1. $p\sim q$ なら $\operatorname{rank}p=\operatorname{rank}q$ を示せ。
2. rank が等しいなら、像の正規直交基底を対応させる部分等長作用素 $v$ を構成せよ。
3. $v^*v=p$、$vv^*=q$ を示せ。
4. これを使って $M_n(\mathbb C)$ の全射影が有限であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$p\sim q$ なら、ある部分等長作用素 $v$ があって

$$
v^*v=p,
\qquad
vv^*=q.
$$

$v$ は $p\mathbb C^n$ から $q\mathbb C^n$ への等長全射になるので

$$
\operatorname{rank}p
=
\dim(p\mathbb C^n)
=
\dim(q\mathbb C^n)
=
\operatorname{rank}q.
$$

逆に rank が共通の値 $r$ だとします。

$p\mathbb C^n$ の正規直交基底を

$$
e_1,\ldots,e_r,
$$

$q\mathbb C^n$ の正規直交基底を

$$
f_1,\ldots,f_r
$$

とします。

$p\mathbb C^n$ 上で

$$
ve_j=f_j
$$

とし、その直交補上では $v=0$ と定めます。

すると $v$ の初期空間は $p\mathbb C^n$、終空間は $q\mathbb C^n$ なので

$$
v^*v=p,
\qquad
vv^*=q.
$$

よって

$$
p\sim q.
$$

最後に $q\le p$ かつ $q\sim p$ とします。

同値性から

$$
\operatorname{rank}q=\operatorname{rank}p.
$$

また

$$
q\mathbb C^n\subset p\mathbb C^n.
$$

有限次元部分空間で包含かつ次元が等しいので像は一致します。従って

$$
q=p.
$$

よって

$$
\boxed{
M_n(\mathbb C)\text{ の全射影は有限}
}.
$$

<!-- solution-end -->

---

### B3. 中心射影の分解を再構成する

$M$ を von Neumann 環とし、$z\in Z(M)$ を射影とする。

$$
\Phi(x)=(zx,(I-z)x)
$$

と定める。

1. $zM$ と $(I-z)M$ が $*$-代数になることを示せ。
2. $\Phi$ が $*$-準同型であることを示せ。
3. $\Phi$ の単射性と全射性を示せ。
4. $M\cong zM\oplus(I-z)M$ を結論せよ。
5. factor では中心射影が $0,I$ に限られることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$z$ は中心にあるので

$$
zx=xz
$$

が全ての $x\in M$ に対して成り立ちます。

$a=zx$、$b=zy$ とすると

$$
ab
=
zxzy
=
z^2xy
=
zxy
\in zM.
$$

また

$$
a^*
=
(zx)^*
=
x^*z
=
zx^*
\in zM.
$$

従って $zM$ は $*$-代数です。$(I-z)M$ も同様です。

$\Phi$ について

$$
\Phi(xy)
=
(zxy,(I-z)xy).
$$

一方

$$
\Phi(x)\Phi(y)
=
(zxzy,(I-z)x(I-z)y)
=
(zxy,(I-z)xy).
$$

従って積を保ちます。随伴も同様です。

$\Phi(x)=0$ なら

$$
zx=0,
\qquad
(I-z)x=0.
$$

両者を足して

$$
x=0.
$$

従って単射です。

任意の

$$
(a,b)\in zM\oplus(I-z)M
$$

を取り、

$$
w=a+b
$$

と置きます。

$za=a$、$zb=0$ なので

$$
zw=a.
$$

同様に

$$
(I-z)w=b.
$$

従って

$$
\Phi(w)=(a,b),
$$

ゆえに全射です。

よって

$$
\boxed{
M\cong zM\oplus(I-z)M
}.
$$

最後に $M$ が factor なら

$$
Z(M)=\mathbb CI.
$$

中心にある射影は $\lambda I$ の形であり、

$$
(\lambda I)^2=\lambda I
$$

より

$$
\lambda^2=\lambda.
$$

従って

$$
\lambda=0
\quad\text{または}\quad
1.
$$

よって factor の中心射影は

$$
\boxed{
0,I\text{ のみ}
}.
$$

<!-- solution-end -->

---

### B4. Murray--von Neumann 同値の推移律と有限性

$p,q,r$ を $M$ の射影とし、

$$
p\sim q,
\qquad
q\sim r
$$

とする。

1. $v^*v=p$, $vv^*=q$、$w^*w=q$, $ww^*=r$ を満たす $v,w$ を取る。
2. $u=wv$ と置き、$u^*u=p$ を示せ。
3. $uu^*=r$ を示せ。
4. $p\sim r$ を結論せよ。
5. 「同値な射影の一方が有限なら他方も有限」であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$$
u=wv
$$

とします。

まず

$$
\begin{aligned}
u^*u
&=
v^*w^*wv\\
&=
v^*qv.
\end{aligned}
$$

$$
q=vv^*
$$

なので

$$
qv
=
vv^*v
=
v(v^*v)
=
vp
=
v.
$$

従って

$$
u^*u=v^*v=p.
$$

次に

$$
\begin{aligned}
uu^*
&=
wvv^*w^*\\
&=
wqw^*.
\end{aligned}
$$

$$
q=w^*w
$$

なので

$$
wq
=
w(w^*w)
=
(ww^*)w
=
rw
=
w.
$$

従って

$$
uu^*=ww^*=r.
$$

よって

$$
\boxed{
p\sim r
}.
$$

最後に $p\sim q$ とし、$p$ が有限だとします。

$q$ の部分射影 $q_0\le q$ が

$$
q_0\sim q
$$

を満たすとします。

$p\sim q$ を実現する部分等長作用素 $v$ を使うと、$q$ の部分射影 $q_0$ は $p$ の部分射影へ引き戻せます。具体的に

$$
p_0:=v^*q_0v
$$

と置くと

$$
p_0\le p
$$

であり、$q_0\sim p_0$ です。

また

$$
q_0\sim q\sim p
$$

なので推移律により

$$
p_0\sim p.
$$

$p$ は有限なので

$$
p_0=p.
$$

すると $v p_0 v^*=q$ である一方、定義から $vp_0v^*=q_0$ なので

$$
q_0=q.
$$

従って $q$ も有限です。

よって

$$
\boxed{
p\sim q\text{ なら有限性は同値類上で不変}
}.
$$

<!-- solution-end -->

---

## Level C

### C1. $B(\ell^2)$ を I$_\infty$ 型 factor と判定する

$$
H=\ell^2(\mathbb N),
\qquad
M=B(H)
$$

とする。

次を順に示せ。

1. $M'=\mathbb CI$ を rank-one 作用素を使って示し、$M$ が factor であることを結論せよ。
2. rank-one 射影 $p=P_{e_1}$ が最小射影であることを示せ。
3. 片側シフト $S$ により
   $$
   S^*S=I,
   \qquad
   SS^*=I-p
   $$
   を示せ。
4.
   $$
   I\sim I-p<I
   $$
   を示し、$I$ が無限射影であることを結論せよ。
5. $M$ が I 型であること、さらに I$_\infty$ 型であることを結論せよ。
6. なぜ $M$ は II 型でも III 型でもないか、型分類の定義から説明せよ。
7. $M_n(\mathbb C)$ と比較し、「factor であること」と「有限次元的であること」が別の性質であることを説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず

$$
T\in M'=B(H)'
$$

とします。

単位ベクトル $e=e_1$ を固定し、$e$ への射影 $P_e$ と可換することから

$$
Te=\lambda e
$$

となる $\lambda\in\mathbb C$ が存在します。

任意の $x\in H$ に対し

$$
\theta_{x,e}(y)=\langle y,e\rangle x
$$

と置きます。

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\|\theta_{x,e}(y)\|
\le
\|x\|\|y\|
$$

なので $\theta_{x,e}\in B(H)$ です。

$T$ は $\theta_{x,e}$ と可換するため

$$
T\theta_{x,e}e
=
\theta_{x,e}Te.
$$

左辺は $Tx$、右辺は $\lambda x$ なので

$$
Tx=\lambda x.
$$

$x$ は任意だから

$$
T=\lambda I.
$$

従って

$$
M'=\mathbb CI.
$$

よって

$$
Z(M)=M\cap M'=\mathbb CI,
$$

すなわち

$$
\boxed{
M\text{ は factor}
}.
$$

次に

$$
p=P_{e_1}
$$

を考えます。

$q\le p$ が射影なら

$$
qH\subset pH=\mathbb Ce_1.
$$

$\mathbb Ce_1$ は1次元なので

$$
qH=\{0\}
$$

または

$$
qH=\mathbb Ce_1.
$$

従って

$$
q=0
$$

または

$$
q=p.
$$

よって

$$
\boxed{
p\text{ は最小射影}
}.
$$

次に片側シフト

$$
Se_k=e_{k+1}
$$

を取ります。

基底上の計算から

$$
S^*S=I,
$$

また像が

$$
(\mathbb Ce_1)^\perp
$$

なので

$$
SS^*=I-p.
$$

従って $S$ は

$$
I
$$

と

$$
I-p
$$

の Murray--von Neumann 同値を実現します。

すなわち

$$
I\sim I-p.
$$

しかも $p\ne0$ なので

$$
I-p<I.
$$

よって

$$
\boxed{
I\text{ は無限射影}
}.
$$

$M$ は非零最小射影 $p$ を持つので I 型です。

さらに可分無限次元 Hilbert 空間上の $B(H)$ で単位射影が無限なので

$$
\boxed{
M=B(\ell^2)\text{ は I}_\infty\text{ 型 factor}
}.
$$

II 型は「最小射影を持たない」ことが必要ですが、$M$ は $p$ という最小射影を持ちます。従って II 型ではありません。

III 型では全ての非零射影が無限でなければなりません。しかし rank-one 射影 $p$ は有限です。実際、$q\le p$ なら $q=0$ または $p$ であり、$q\sim p$ かつ $q\le p$ なら $q=p$ です。

従って III 型でもありません。

最後に $M_n(\mathbb C)$ と比較します。

両者とも

$$
Z(M)=\mathbb CI
$$

なので factor です。

しかし

$$
M_n(\mathbb C)
$$

では全ての射影が有限で、単位射影は $n$ 個の最小射影の和です。

一方

$$
B(\ell^2)
$$

では最小射影はあるものの、単位射影は無限です。

従って

$$
\boxed{
\text{factor}
\text{ とは中心で分解できないことを表すだけであり、}
\text{有限次元的かどうかは射影構造をさらに調べて初めて分かる}
}
$$

と結論できます。


<!-- solution-end -->