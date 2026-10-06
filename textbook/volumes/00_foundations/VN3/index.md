# VN3 射影・部分等長作用素・極分解

<!-- definition-example-audit: strict -->

> **既出概念**：[VN2 の von Neumann 環と二重可換子定理](../VN2/index.md#def-vn2-von-neumann-algebra)、[OA3 の projection・正元・正の平方根](../OA3/index.md#def-oa3-projection)、[OA6 の有界正規作用素のスペクトル定理](../OA6/index.md)を使います。

VN2 では、von Neumann 環を「作用素の弱い極限まで取り込んだ $*$-代数」として捉えました。しかし、代数の元を一つ取ったとき、その作用素が Hilbert 空間を**どの部分空間からどの部分空間へ運ぶか**はまだ見えていません。

有限次元の行列なら、行列 $T$ を「大きさ」と「向き」に分ける発想があります。作用素でも同じことをしたいのですが、一般の $T$ は可逆とは限らず、核を持つこともあります。したがって「向き」の部分は空間全体で等長になるとは限りません。

そこで本章では

$$
|T|=(T^*T)^{1/2}
$$

で「大きさ」を取り出し、核を除いた部分だけで距離を保つ作用素 $U$ を使って

$$
\boxed{T=U|T|}
$$

と分解します。これが極分解です。

さらに $T$ が von Neumann 環 $M$ の元なら、極分解に現れる $U$ も $M$ の中に残ることを示します。これは「一つの作用素から、その核・像・支持に対応する射影まで代数内部で回収できる」という von Neumann 環特有の強さにつながります。

---

## 1. 射影は閉部分空間を記録する

OA3 では $B(H)$ の元 $P$ が

$$
P=P^*,
\qquad
P^2=P
$$

を満たすとき projection と呼びました。Hilbert 空間上では、これは閉部分空間への直交射影そのものです。

<a id="prop-vn3-projection-subspace"></a>

<!-- formal-statement-start -->
### 命題（射影と閉部分空間の対応）

$H$ を複素 Hilbert 空間とする。

1. $P\in B(H)$ が $P=P^*=P^2$ を満たすなら、$\operatorname{ran}P$ は閉部分空間であり、

$$
H=\operatorname{ran}P\oplus\ker P,
\qquad
\ker P=(\operatorname{ran}P)^\perp
$$

が成り立つ。

2. 逆に、閉部分空間 $K\subset H$ に対する直交射影 $P_K$ は

$$
P_K=P_K^*=P_K^2
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $P^2=P$ とします。

$x\in\operatorname{ran}P$ なら、ある $y\in H$ があって $x=Py$ です。このとき

$$
Px=P(Py)=P^2y=Py=x.
$$

従って

$$
\operatorname{ran}P=\{x\in H:Px=x\}.
$$

右辺は連続写像 $P-I$ の核なので閉集合です。よって $\operatorname{ran}P$ は閉部分空間です。

任意の $x\in H$ に対して

$$
x=Px+(I-P)x
$$

と分解できます。ここで

$$
P(I-P)x
=Px-P^2x
=0
$$

なので $(I-P)x\in\ker P$ です。

さらに $u=Pa\in\operatorname{ran}P$、$v\in\ker P$ とすると、$P=P^*$ より

$$
\langle u,v\rangle
=
\langle Pa,v\rangle
=
\langle a,Pv\rangle
=
0.
$$

従って $\operatorname{ran}P\perp\ker P$ です。先ほどの分解と合わせて

$$
H=\operatorname{ran}P\oplus\ker P
$$

を得ます。

逆向きは Hilbert 空間の直交分解

$$
H=K\oplus K^\perp
$$

を使います。$x=u+v$（$u\in K$, $v\in K^\perp$）に対して $P_Kx=u$ と定めると、二回射影しても $u$ のままなので $P_K^2=P_K$ です。

また $x=u+v$, $y=a+b$ と書けば

$$
\langle P_Kx,y\rangle
=
\langle u,a+b\rangle
=
\langle u,a\rangle,
$$

一方

$$
\langle x,P_Ky\rangle
=
\langle u+v,a\rangle
=
\langle u,a\rangle.
$$

従って $P_K=P_K^*$ です。
<!-- proof-end -->

この対応により、von Neumann 環の中の射影は Hilbert 空間の「どの閉部分空間を見ているか」を代数の元として記録します。

---

## 2. 作用素の絶対値：大きさを取り出す

複素数では

$$
z=\frac{z}{|z|}|z|
$$

と「向き」と「絶対値」を分けます。作用素で $|T|$ に対応するものは $T^*T$ の正の平方根です。

<a id="def-vn3-operator-modulus"></a>

<!-- formal-statement-start -->
### 定義（作用素の絶対値）

$T\in B(H)$ に対し

$$
\boxed{|T|=(T^*T)^{1/2}}
$$

を $T$ の**絶対値**と呼ぶ。
<!-- formal-statement-end -->

[OA3 で証明した正元の平方根の一意存在](../OA3/index.md#thm-oa3-positive-square-root)により、$T^*T$ には一意な正の平方根が存在するので、この定義は well-defined です。

<!-- definition-example-start: def-vn3-operator-modulus -->

### 直接例：rank-one 行列

$$
T=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
$$

とします。

$$
T^*
=
\begin{pmatrix}
0&0\\
2&0
\end{pmatrix},
\qquad
T^*T
=
\begin{pmatrix}
0&0\\
0&4
\end{pmatrix}.
$$

従って正の平方根は

$$
\boxed{
|T|
=
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix}.
}
$$

$T$ は $e_2$ を $2e_1$ へ送りますが、$|T|$ は「$e_2$ 方向を2倍する」という大きさだけを残しています。

<!-- definition-example-end -->

極分解の構成で使う最重要等式は

$$
\boxed{\|Tx\|=\||T|x\|}
$$

です。実際、

$$
\|Tx\|^2
=
\langle Tx,Tx\rangle
=
\langle x,T^*Tx\rangle
=
\langle x,|T|^2x\rangle
=
\langle |T|x,|T|x\rangle
=
\||T|x\|^2.
$$

従って

$$
Tx=0
\Longleftrightarrow
|T|x=0,
$$

すなわち

$$
\boxed{\ker T=\ker |T|.}
$$

また一般の有界作用素 $A$ について

$$
(\operatorname{ran}A)^\perp=\ker A^*
$$

なので、$|T|=|T|^*$ を使えば

$$
\overline{\operatorname{ran}|T|}
=
(\ker |T|)^\perp
=
(\ker T)^\perp.
$$

この部分空間が、後で部分等長作用素 $U$ の初期空間になります。

---

## 3. 部分等長作用素：核を除いたところだけ距離を保つ

$T$ に核があると、空間全体で等長な作用素を使って $T=U|T|$ とするのは不可能です。$|T|x=0$ の方向は $T$ も消してしまうからです。

そこで、核の直交補空間だけで等長な作用素を使います。

<a id="def-vn3-partial-isometry"></a>

<!-- formal-statement-start -->
### 定義（部分等長作用素）

$V\in B(H)$ が

$$
\|Vx\|=\|x\|
\qquad
\left(x\in(\ker V)^\perp\right)
$$

を満たすとき、$V$ を**部分等長作用素**と呼ぶ。

$(\ker V)^\perp$ を $V$ の**初期空間**、$\overline{\operatorname{ran}V}$ を**終空間**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn3-partial-isometry -->

### 直接例：一つの座標軸だけを別の座標軸へ運ぶ

$H=\mathbb C^2$ で

$$
V=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

とします。

$$
Ve_1=0,
\qquad
Ve_2=e_1.
$$

従って

$$
\ker V=\operatorname{span}\{e_1\},
\qquad
(\ker V)^\perp=\operatorname{span}\{e_2\}.
$$

$x=\alpha e_2$ なら

$$
\|Vx\|
=
\|\alpha e_1\|
=
|\alpha|
=
\|\alpha e_2\|
=
\|x\|.
$$

よって $V$ は部分等長作用素です。初期空間は $\mathbb Ce_2$、終空間は $\mathbb Ce_1$ です。

<!-- definition-example-end -->

部分等長性は随伴を使うと射影の条件へ変換できます。

<a id="prop-vn3-partial-isometry-projections"></a>

<!-- formal-statement-start -->
### 命題（部分等長作用素と初期射影・終射影）

$V\in B(H)$ に対して次は同値である。

1. $V$ は部分等長作用素である。
2. $V^*V$ は射影である。

このとき

$$
\boxed{V^*V=P_{(\ker V)^\perp}}
$$

であり、さらに

$$
\boxed{VV^*=P_{\overline{\operatorname{ran}V}}}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $V$ が部分等長作用素とします。

$$
K=(\ker V)^\perp
$$

と置きます。$x,z\in K$ に対して、複素 Hilbert 空間の偏極恒等式を等長写像 $V|_K$ に適用すると

$$
\langle Vx,Vz\rangle=\langle x,z\rangle
$$

です。従って

$$
\langle V^*Vx,z\rangle
=
\langle Vx,Vz\rangle
=
\langle x,z\rangle
$$

が全ての $z\in K$ について成り立ちます。

また $w\in\ker V$ なら

$$
V^*Vw=0.
$$

従って $V^*V$ は $K$ 上で恒等作用素、$\ker V$ 上で零作用素です。ゆえに

$$
V^*V=P_K.
$$

特に射影です。

逆に $P=V^*V$ が射影だとします。任意の $x\in H$ について

$$
\|Vx\|^2
=
\langle x,V^*Vx\rangle
=
\langle x,Px\rangle.
$$

射影の直交分解 $x=Px+(I-P)x$ を使うと

$$
\langle x,Px\rangle
=
\|Px\|^2.
$$

したがって

$$
\|Vx\|=\|Px\|.
$$

特に

$$
Vx=0
\Longleftrightarrow
Px=0,
$$

なので $\ker V=\ker P$ です。よって

$$
(\ker V)^\perp
=
(\ker P)^\perp
=
\operatorname{ran}P.
$$

$x\in(\ker V)^\perp$ なら $Px=x$ なので

$$
\|Vx\|=\|Px\|=\|x\|.
$$

従って $V$ は部分等長作用素です。

最後に $Q=VV^*$ を考えます。$P=V^*V$ であり、$\ker P=\ker V$ なので $V=VP$ です。したがって

$$
Q^2
=
VV^*VV^*
=
V(V^*V)V^*
=
VPV^*
=
VV^*
=
Q.
$$

また $Q^*=Q$ ですから $Q$ は射影です。

$\operatorname{ran}Q\subset\operatorname{ran}V$ は明らかです。一方 $Vx=VPx$ であり、

$$
Q(Vx)
=
VV^*Vx
=
V(V^*V)x
=
VPx
=
Vx.
$$

従って $\operatorname{ran}V\subset\operatorname{ran}Q$ です。$Q$ の像は閉じているので

$$
\operatorname{ran}Q
=
\overline{\operatorname{ran}V}.
$$

ゆえに $VV^*$ は終空間への直交射影です。
<!-- proof-end -->

$V^*V$ を**初期射影**、$VV^*$ を**終射影**と呼びます。

---

## 4. 支持射影：正作用素が実際に働いている部分を取り出す

正作用素 $A\ge0$ が核を持つとき、$A$ は $\ker A$ 上では何もしません。そこで「$A$ が非自明に働く閉部分空間」を射影として記録します。

<a id="def-vn3-support-projection"></a>

<!-- formal-statement-start -->
### 定義（支持射影）

$A\in B(H)$ を正作用素とする。

$$
\boxed{
s(A)=P_{(\ker A)^\perp}
}
$$

を $A$ の**支持射影**と呼ぶ。

$A=A^*$ なので

$$
(\ker A)^\perp
=
\overline{\operatorname{ran}A}
$$

であり、同値に

$$
s(A)=P_{\overline{\operatorname{ran}A}}
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn3-support-projection -->

### 直接例：対角正作用素

$$
A=
\begin{pmatrix}
0&0\\
0&3
\end{pmatrix}
$$

なら

$$
\ker A=\mathbb Ce_1,
\qquad
(\ker A)^\perp=\mathbb Ce_2.
$$

従って

$$
\boxed{
s(A)=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
}
$$

固有値 $3$ の大きさそのものではなく、「どの方向でゼロでないか」だけを残した射影です。

<!-- definition-example-end -->

支持射影は不連続な指示関数のように見えますが、von Neumann 環では SOT 極限として内部から作れます。

<a id="prop-vn3-support-sot"></a>

<!-- formal-statement-start -->
### 命題（支持射影の SOT 近似）

$A\in B(H)$ を正作用素とし、

$$
R_n=A\left(A+\frac1n I\right)^{-1}
$$

とする。このとき

$$
\boxed{
R_n\xrightarrow{\mathrm{SOT}}s(A).
}
$$

さらに $M\subset B(H)$ が von Neumann 環で $A\in M$ なら、

$$
s(A)\in M.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A\ge0$ なので

$$
\sigma(A)\subset[0,\|A\|].
$$

各 $n$ について

$$
f_n(t)=\frac{t}{t+1/n}
$$

と置くと、$f_n$ は $\sigma(A)$ 上連続で

$$
0\le f_n(t)\le1.
$$

また

$$
f_n(0)=0,
$$

$t>0$ では

$$
f_n(t)\longrightarrow1.
$$

[OA6 の有界正規作用素のスペクトル定理](../OA6/index.md)に現れる PVM を $E_A$ と書き、$x\in H$ に対して

$$
\mu_x(B)=\langle x,E_A(B)x\rangle
$$

とします。

関数計算より

$$
R_n=f_n(A).
$$

一方

$$
s(A)=E_A((0,\infty)).
$$

実際、$E_A(\{0\})H=\ker A$ なので、その直交補への射影が $E_A((0,\infty))$ です。

従って

$$
\|(R_n-s(A))x\|^2
=
\int_{\sigma(A)}
\left|
f_n(t)-\mathbf 1_{(0,\infty)}(t)
\right|^2
\,d\mu_x(t).
$$

被積分関数は各 $t$ で $0$ へ収束し、絶対値は常に $1$ 以下です。よって優収束定理から

$$
\|(R_n-s(A))x\|\longrightarrow0.
$$

$x$ は任意なので

$$
R_n\xrightarrow{\mathrm{SOT}}s(A).
$$

次に $A\in M$ とします。$M$ は単位的 $*$-代数で WOT 閉なので、特にノルム閉であり $C^*$-部分代数です。

関数

$$
t\mapsto\frac{1}{t+1/n}
$$

は $\sigma(A)$ 上連続なので、連続関数計算から

$$
\left(A+\frac1nI\right)^{-1}\in M.
$$

従って $R_n\in M$ です。

[von Neumann の二重可換子定理](../VN2/index.md#thm-vn2-bicommutant)により von Neumann 環は SOT でも閉じています。$R_n\to s(A)$ が SOT 収束するので

$$
s(A)\in M.
$$
<!-- proof-end -->

ここで重要なのは、一般には $R_n$ が $s(A)$ へ**ノルム収束するとは限らない**ことです。0 がスペクトルの集積点なら、SOT の弱さが本質的に必要になります。

---

## 5. 極分解：大きさと向きを分ける

いよいよ $T$ から部分等長作用素を構成します。

<a id="thm-vn3-polar-decomposition"></a>

<!-- formal-statement-start -->
### 定理（有界作用素の極分解）

$H$ を複素 Hilbert 空間、$T\in B(H)$ とする。

このとき一意な部分等長作用素 $U\in B(H)$ が存在して

$$
\boxed{T=U|T|}
$$

を満たし、さらに

$$
\ker U=\ker T
$$

となる。

この $U$ の初期空間は

$$
\overline{\operatorname{ran}|T|}
=
(\ker T)^\perp
$$

であり、終空間は

$$
\overline{\operatorname{ran}T}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

$|T|x$ を $Tx$ へ送る写像

$$
|T|x\longmapsto Tx
$$

を作ります。先ほど示した

$$
\|Tx\|=\||T|x\|
$$

により、これは距離を保ちます。像の閉包まで連続延長し、$\ker T$ 上では0と定めれば部分等長作用素になります。

<!-- proof-start -->
### 証明

まず

$$
K_0=\operatorname{ran}|T|
$$

上で

$$
U_0(|T|x)=Tx
$$

と定めます。

#### 1. well-defined 性

もし

$$
|T|x=|T|y
$$

なら

$$
|T|(x-y)=0.
$$

$\ker|T|=\ker T$ なので

$$
T(x-y)=0,
$$

従って

$$
Tx=Ty.
$$

よって $U_0$ は well-defined です。

#### 2. 等長性

任意の $x\in H$ に対して

$$
\|U_0(|T|x)\|
=
\|Tx\|
=
\||T|x\|.
$$

従って $U_0$ は $K_0$ 上の等長写像です。

等長写像は連続なので、

$$
K=\overline{\operatorname{ran}|T|}
$$

へ一意に連続延長できます。その延長を $U_K$ と書きます。

$U_0(K_0)=\operatorname{ran}T$ なので、$U_K$ の像の閉包は

$$
\overline{\operatorname{ran}T}
$$

です。

#### 3. 空間全体への拡張

$|T|$ は自己共役なので

$$
K^\perp
=
\ker|T|
=
\ker T.
$$

従って

$$
H=K\oplus\ker T.
$$

$x=x_K+x_0$（$x_K\in K$, $x_0\in\ker T$）に対して

$$
Ux=U_Kx_K
$$

と定めます。

$U$ は $K$ 上では等長、$\ker T$ 上では0です。従って $U$ は部分等長作用素で、

$$
\ker U=\ker T.
$$

#### 4. $T=U|T|$

任意の $x\in H$ について $|T|x\in K_0$ なので、定義から

$$
U|T|x
=
U_0(|T|x)
=
Tx.
$$

従って

$$
T=U|T|.
$$

#### 5. 一意性

$V$ も部分等長作用素で

$$
T=V|T|,
\qquad
\ker V=\ker T
$$

を満たすとします。

$\operatorname{ran}|T|$ 上では

$$
V(|T|x)=Tx=U(|T|x)
$$

なので $U$ と $V$ は一致します。

$\operatorname{ran}|T|$ は $K$ で稠密で、$U,V$ は連続だから $K$ 全体で一致します。

また

$$
K^\perp=\ker T=\ker U=\ker V
$$

なので $K^\perp$ 上では両方とも0です。従って

$$
U=V.
$$
<!-- proof-end -->

極分解の「向き」$U$ は、$T$ が消してしまう方向まで無理に unitary にするのではなく、$T$ が実際に働く初期空間だけを終空間へ等長に運びます。

---

## 6. 行列で極分解を最後まで計算する

先ほどの

$$
T=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
$$

を使います。

既に

$$
|T|
=
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix}
$$

と求めました。

$|T|$ の像は $\mathbb Ce_2$、$T$ の像は $\mathbb Ce_1$ です。従って初期空間 $\mathbb Ce_2$ を終空間 $\mathbb Ce_1$ へ等長に送る作用素は

$$
Ue_2=e_1,
\qquad
Ue_1=0
$$

であり、

$$
U=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}.
$$

実際、

$$
U|T|
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix}
=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
=
T.
$$

さらに

$$
U^*U
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix},
\qquad
UU^*
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

前者は $|T|$ が働く $e_2$ 方向、後者は $T$ の像である $e_1$ 方向を記録しています。

---

## 7. 極分解と支持射影

前節の行列計算は一般の場合にもそのまま成立します。

<a id="prop-vn3-polar-support"></a>

<!-- formal-statement-start -->
### 命題（極分解と支持射影）

$T=U|T|$ を前節の極分解とする。このとき

$$
\boxed{U^*U=s(|T|)}
$$

および

$$
\boxed{UU^*=s(|T^*|)}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$U$ の初期空間は

$$
\overline{\operatorname{ran}|T|}
=
(\ker|T|)^\perp
$$

です。

[部分等長作用素と初期射影・終射影](#prop-vn3-partial-isometry-projections)から $U^*U$ は初期空間への射影なので

$$
U^*U
=
P_{(\ker|T|)^\perp}
=
s(|T|).
$$

次に $U$ の終空間は $\overline{\operatorname{ran}T}$ です。従って

$$
UU^*
=
P_{\overline{\operatorname{ran}T}}.
$$

一般の有界作用素について

$$
(\operatorname{ran}T)^\perp=\ker T^*
$$

なので

$$
\overline{\operatorname{ran}T}
=
(\ker T^*)^\perp.
$$

また $|T^*|=(TT^*)^{1/2}$ について、前と同じノルム計算から

$$
\ker|T^*|=\ker T^*.
$$

従って

$$
UU^*
=
P_{(\ker T^*)^\perp}
=
P_{(\ker|T^*|)^\perp}
=
s(|T^*|).
$$
<!-- proof-end -->

この二つの射影により、$T$ の「出発側の支持」と「到着側の支持」が対になって現れます。

---

## 8. von Neumann 環では極分解が代数の外へ逃げない

一般の $C^*$-環を $B(H)$ に表現しただけでは、極分解の部分等長作用素が元の $C^*$-環に入るとは限りません。

von Neumann 環では SOT 極限を取り込めるため、これが成立します。

<a id="thm-vn3-von-neumann-polar"></a>

<!-- formal-statement-start -->
### 定理（von Neumann 環内での極分解）

$M\subset B(H)$ を von Neumann 環、$T\in M$ とする。

$T=U|T|$ を

$$
\ker U=\ker T
$$

で正規化した極分解とすると、

$$
\boxed{|T|\in M,\qquad U\in M.}
$$

さらに

$$
s(|T|)\in M,
\qquad
s(|T^*|)\in M.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $T\in M$ かつ $M$ は $*$-代数なので

$$
T^*T\in M.
$$

$M$ はノルム閉な $C^*$-部分代数でもあるため、正の平方根の関数計算から

$$
|T|=(T^*T)^{1/2}\in M.
$$

支持射影の SOT 近似命題を $|T|$ に適用すると

$$
s(|T|)\in M.
$$

次に

$$
R_n=\left(|T|+\frac1nI\right)^{-1}
$$

と置きます。連続関数計算から $R_n\in M$ です。従って

$$
U_n=TR_n\in M.
$$

極分解 $T=U|T|$ を代入すると

$$
U_n
=
U|T|
\left(|T|+\frac1nI\right)^{-1}.
$$

ここで

$$
|T|
\left(|T|+\frac1nI\right)^{-1}
\xrightarrow{\mathrm{SOT}}
s(|T|)
$$

でした。

固定作用素 $U$ による左乗法は SOT 連続なので

$$
U_n
\xrightarrow{\mathrm{SOT}}
Us(|T|).
$$

$U^*U=s(|T|)$ であり、$U$ は初期空間の外で0なので

$$
Us(|T|)=U.
$$

従って

$$
U_n\xrightarrow{\mathrm{SOT}}U.
$$

各 $U_n\in M$ で、$M$ は SOT 閉なので

$$
U\in M.
$$

最後に $T^*\in M$ へ[支持射影の SOT 近似](#prop-vn3-support-sot)を適用すれば

$$
s(|T^*|)\in M
$$

も得られます。
<!-- proof-end -->

この定理は、von Neumann 環が単に「WOT で閉じた $C^*$-環」である以上の使いやすさを持つことを示します。作用素 $T$ が代数に入っていれば、$T$ の核・像を記録する射影と、それらを結ぶ部分等長作用素まで同じ代数の中で扱えます。

次章 VN4 では、この作用素代数に自然な双対空間を与えるトレース級作用素と predual を導入し、WOT とは別の重要な弱位相である ultraweak 位相へ進みます。

---

# 演習

## Level A

### A1. 射影の像と核

$$
P=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
\in M_2(\mathbb C)
$$

について、$P^2=P=P^*$ を確認し、

$$
\operatorname{ran}P,
\qquad
\ker P
$$

を求めて

$$
\mathbb C^2=\operatorname{ran}P\oplus\ker P
$$

を確認せよ。

- Level: A

#### 詳細解答

直接計算すると

$$
P^2
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
=P
$$

であり、$P$ は実対角行列なので $P^*=P$ です。

$x=(x_1,x_2)^\mathsf T$ に対して

$$
Px=(x_1,0)^\mathsf T.
$$

従って

$$
\operatorname{ran}P
=
\{(z,0)^\mathsf T:z\in\mathbb C\}
=
\mathbb Ce_1.
$$

また $Px=0$ は $x_1=0$ と同値なので

$$
\ker P=\mathbb Ce_2.
$$

$e_1\perp e_2$ だから

$$
\boxed{
\mathbb C^2
=
\mathbb Ce_1\oplus\mathbb Ce_2
=
\operatorname{ran}P\oplus\ker P.
}
$$

---

### A2. 部分等長作用素の初期射影と終射影

$$
V=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

について $V^*V$ と $VV^*$ を計算し、$V$ の初期空間と終空間を求めよ。

- Level: A

#### 詳細解答

$$
V^*
=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}.
$$

従って

$$
V^*V
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix},
$$

$$
VV^*
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

$V^*V$ は $\mathbb Ce_2$ への射影なので、初期空間は

$$
\boxed{\mathbb Ce_2}.
$$

$VV^*$ は $\mathbb Ce_1$ への射影なので、終空間は

$$
\boxed{\mathbb Ce_1}.
$$

実際 $Ve_2=e_1$ であり、$V$ はこの二つの1次元空間の間で距離を保ちます。

---

### A3. 支持射影

$$
A=
\begin{pmatrix}
0&0\\
0&3
\end{pmatrix}
$$

について $s(A)$ を求めよ。また

$$
R_n=A\left(A+\frac1nI\right)^{-1}
$$

を計算し、成分ごとに $s(A)$ へ収束することを確認せよ。

- Level: A

#### 詳細解答

$\ker A=\mathbb Ce_1$ なので

$$
(\ker A)^\perp=\mathbb Ce_2.
$$

従って

$$
s(A)
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

次に

$$
A+\frac1nI
=
\begin{pmatrix}
1/n&0\\
0&3+1/n
\end{pmatrix},
$$

よって

$$
\left(A+\frac1nI\right)^{-1}
=
\begin{pmatrix}
n&0\\
0&(3+1/n)^{-1}
\end{pmatrix}.
$$

したがって

$$
R_n
=
\begin{pmatrix}
0&0\\
0&\dfrac{3}{3+1/n}
\end{pmatrix}.
$$

$n\to\infty$ で

$$
\frac{3}{3+1/n}\to1
$$

なので

$$
R_n\to
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
=s(A).
$$

有限次元では SOT とノルム位相が一致するため、この例ではノルム収束もしています。

---

### A4. $2\times2$ 行列の極分解

$$
T=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
$$

について $|T|$ と極分解の部分等長作用素 $U$ を求め、

$$
T=U|T|
$$

を確認せよ。

- Level: A

#### 詳細解答

まず

$$
T^*T
=
\begin{pmatrix}
0&0\\
0&4
\end{pmatrix}.
$$

従って正の平方根は

$$
|T|
=
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix}.
$$

$\overline{\operatorname{ran}|T|}=\mathbb Ce_2$ であり、

$$
Te_2=2e_1,
\qquad
|T|e_2=2e_2.
$$

したがって $|T|e_2$ を $Te_2$ へ送る等長部分は $e_2\mapsto e_1$ です。核 $\mathbb Ce_1$ 上では0とするので

$$
U=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}.
$$

行列積を取ると

$$
U|T|
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
\begin{pmatrix}
0&0\\
0&2
\end{pmatrix}
=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
=T.
$$

従って

$$
\boxed{T=U|T|}.
$$

---

## Level B

### B1. $V^*V$ が射影なら部分等長作用素になる

$V\in B(H)$ とし、$P=V^*V$ が射影であると仮定する。

1. $\|Vx\|^2=\|Px\|^2$ を示せ。
2. $\ker V=\ker P$ を示せ。
3. $V$ が $(\ker V)^\perp$ 上で等長であることを示せ。

- Level: B

#### 詳細解答

任意の $x\in H$ に対して

$$
\|Vx\|^2
=
\langle Vx,Vx\rangle
=
\langle x,V^*Vx\rangle
=
\langle x,Px\rangle.
$$

$P$ は直交射影なので

$$
x=Px+(I-P)x,
\qquad
Px\perp(I-P)x.
$$

したがって

$$
\langle x,Px\rangle
=
\langle Px,Px\rangle
=
\|Px\|^2.
$$

よって

$$
\boxed{\|Vx\|^2=\|Px\|^2}.
$$

この等式から

$$
Vx=0
\Longleftrightarrow
Px=0
$$

なので

$$
\boxed{\ker V=\ker P}.
$$

射影について

$$
(\ker P)^\perp=\operatorname{ran}P
$$

です。従って $x\in(\ker V)^\perp$ なら $x\in\operatorname{ran}P$ であり

$$
Px=x.
$$

よって

$$
\|Vx\|
=
\|Px\|
=
\|x\|.
$$

従って $V$ は部分等長作用素です。

---

### B2. 極分解の一意性

$T=U|T|=V|T|$ とし、$U,V$ はともに部分等長作用素で

$$
\ker U=\ker V=\ker T
$$

を満たすとする。$U=V$ を証明せよ。

- Level: B

#### 詳細解答

任意の $x\in H$ について

$$
U(|T|x)
=
Tx
=
V(|T|x).
$$

従って $U$ と $V$ は $\operatorname{ran}|T|$ 上で一致します。

両者は有界作用素なので連続です。よってその閉包

$$
K=\overline{\operatorname{ran}|T|}
$$

上でも一致します。

一方

$$
K^\perp
=
\ker|T|
=
\ker T.
$$

仮定から

$$
\ker T=\ker U=\ker V
$$

なので、$K^\perp$ 上では $U,V$ はともに0です。

したがって直交分解

$$
H=K\oplus K^\perp
$$

の両成分で一致するため

$$
\boxed{U=V}.
$$

---

### B3. 支持射影への SOT 収束は作用素ノルムでの収束とは限らない

$H=\ell^2(\mathbb N)$ とし、標準基底を $(e_k)$ とする。

$$
Ae_k=\frac1k e_k
$$

で定まる正作用素 $A$ を考える。

1. $\ker A=\{0\}$ と $s(A)=I$ を示せ。
2. $R_n=A(A+\frac1nI)^{-1}$ に対して

$$
R_ne_k=\frac{n}{n+k}e_k
$$

を示せ。
3. $R_n\xrightarrow{\mathrm{SOT}}I$ だが $\|R_n-I\|=1$ であることを示せ。

- Level: B

#### 詳細解答

全ての $k$ で $1/k>0$ なので

$$
Ax=0
$$

なら各座標について

$$
\frac{x_k}{k}=0,
$$

従って $x_k=0$ です。よって

$$
\ker A=\{0\}.
$$

したがって

$$
\boxed{s(A)=I}.
$$

次に $e_k$ 上で

$$
\left(A+\frac1nI\right)e_k
=
\left(\frac1k+\frac1n\right)e_k.
$$

従って

$$
\left(A+\frac1nI\right)^{-1}e_k
=
\frac{1}{1/k+1/n}e_k
=
\frac{kn}{n+k}e_k.
$$

最後に $A$ を作用させて

$$
R_ne_k
=
\frac1k\frac{kn}{n+k}e_k
=
\boxed{\frac{n}{n+k}e_k}.
$$

各固定 $k$ について

$$
\frac{n}{n+k}\to1.
$$

また $0\le n/(n+k)\le1$ なので、$x=(x_k)\in\ell^2$ に対し

$$
\|(R_n-I)x\|^2
=
\sum_{k=1}^\infty
\left(\frac{k}{n+k}\right)^2|x_k|^2.
$$

各項は0へ収束し、

$$
\left(\frac{k}{n+k}\right)^2|x_k|^2
\le
|x_k|^2
$$

です。級数版の優収束から

$$
\|(R_n-I)x\|\to0.
$$

よって

$$
R_n\xrightarrow{\mathrm{SOT}}I.
$$

一方 $R_n-I$ は対角作用素で、その対角成分の絶対値は

$$
\frac{k}{n+k}.
$$

従って

$$
\|R_n-I\|
=
\sup_{k\ge1}\frac{k}{n+k}
=
1.
$$

つまり

$$
\boxed{
R_n\xrightarrow{\mathrm{SOT}}I
\quad\text{だが}\quad
R_n\not\to I\ \text{in norm}.
}
$$

0 が $\sigma(A)$ の集積点であるため、支持射影を取り出すには弱い作用素位相が本質的です。

---

### B4. von Neumann 環内で部分等長作用素を回収する

$M\subset B(H)$ を von Neumann 環、$T\in M$ とし、

$$
T=U|T|
$$

を極分解とする。

$$
U_n
=
T\left(|T|+\frac1nI\right)^{-1}
$$

と置く。

1. $U_n\in M$ を示せ。
2. $U_n\xrightarrow{\mathrm{SOT}}U$ を示せ。
3. $U\in M$ を結論せよ。

- Level: B

#### 詳細解答

$T\in M$ なので

$$
T^*T\in M.
$$

$M$ はノルム閉な $C^*$-部分代数でもあるから、正の平方根の関数計算により

$$
|T|=(T^*T)^{1/2}\in M.
$$

関数

$$
t\mapsto\frac{1}{t+1/n}
$$

は $\sigma(|T|)$ 上で連続なので

$$
\left(|T|+\frac1nI\right)^{-1}\in M.
$$

$M$ は積で閉じているため

$$
\boxed{U_n\in M}.
$$

次に $T=U|T|$ を代入すると

$$
U_n
=
U|T|
\left(|T|+\frac1nI\right)^{-1}.
$$

支持射影の SOT 近似から

$$
|T|
\left(|T|+\frac1nI\right)^{-1}
\xrightarrow{\mathrm{SOT}}
s(|T|).
$$

固定作用素 $U$ を左から掛けても SOT 収束は保たれるので

$$
U_n
\xrightarrow{\mathrm{SOT}}
Us(|T|).
$$

極分解では

$$
U^*U=s(|T|),
$$

したがって $U$ は $s(|T|)H$ の外で0です。よって

$$
Us(|T|)=U.
$$

従って

$$
\boxed{U_n\xrightarrow{\mathrm{SOT}}U}.
$$

各 $U_n\in M$ であり、von Neumann 環 $M$ は SOT 閉なので

$$
\boxed{U\in M}.
$$

---

## Level C

### C1. 極分解を定義から再構成する

$T\in B(H)$ とし、

$$
|T|=(T^*T)^{1/2}
$$

とする。次を順に証明し、極分解を再構成せよ。

1. $\|Tx\|=\||T|x\|$ と $\ker T=\ker|T|$。
2. $\operatorname{ran}|T|$ 上の写像

$$
U_0(|T|x)=Tx
$$

が well-defined な等長写像であること。
3. $U_0$ を $\overline{\operatorname{ran}|T|}$ へ延長し、その直交補上で0とすることで部分等長作用素 $U$ を得ること。
4. $T=U|T|$、$\ker U=\ker T$。
5. $U^*U=s(|T|)$、$UU^*=s(|T^*|)$。
6. さらに $T$ が von Neumann 環 $M$ の元なら $U\in M$。

- Level: C

#### 詳細解答

まず

$$
\|Tx\|^2
=
\langle x,T^*Tx\rangle
=
\langle x,|T|^2x\rangle
=
\||T|x\|^2.
$$

従って

$$
\boxed{\|Tx\|=\||T|x\|}.
$$

特に

$$
Tx=0
\Longleftrightarrow
|T|x=0
$$

なので

$$
\boxed{\ker T=\ker|T|}.
$$

次に

$$
U_0(|T|x)=Tx
$$

と定めます。もし $|T|x=|T|y$ なら

$$
|T|(x-y)=0.
$$

従って $x-y\in\ker|T|=\ker T$ であり

$$
Tx=Ty.
$$

よって $U_0$ は well-defined です。

さらに

$$
\|U_0(|T|x)\|
=
\|Tx\|
=
\||T|x\|
$$

なので $U_0$ は等長です。

等長写像は連続なので

$$
K=\overline{\operatorname{ran}|T|}
$$

へ一意に延長できます。この延長を $U_K$ とします。

$|T|$ は自己共役だから

$$
K^\perp
=
(\operatorname{ran}|T|)^\perp
=
\ker|T|
=
\ker T.
$$

従って

$$
H=K\oplus\ker T.
$$

$x=x_K+x_0$ に対し

$$
Ux=U_Kx_K
$$

と定めます。

$U$ は $K$ 上で等長、$K^\perp=\ker T$ 上で0なので部分等長作用素です。また

$$
\boxed{\ker U=\ker T}.
$$

任意の $x\in H$ について $|T|x\in\operatorname{ran}|T|$ だから

$$
U|T|x
=
U_0(|T|x)
=
Tx.
$$

従って

$$
\boxed{T=U|T|}.
$$

部分等長作用素の初期射影は初期空間 $K$ への射影です。ところが

$$
K
=
\overline{\operatorname{ran}|T|}
=
(\ker|T|)^\perp.
$$

従って

$$
\boxed{
U^*U
=
P_K
=
s(|T|).
}
$$

終空間は $\overline{\operatorname{ran}T}$ なので

$$
UU^*
=
P_{\overline{\operatorname{ran}T}}.
$$

一方

$$
\overline{\operatorname{ran}T}
=
(\ker T^*)^\perp
=
(\ker|T^*|)^\perp.
$$

よって

$$
\boxed{UU^*=s(|T^*|)}.
$$

最後に $T\in M$ とします。$M$ は $*$-代数なので $T^*T\in M$、正の平方根の関数計算から $|T|\in M$ です。

$$
U_n
=
T\left(|T|+\frac1nI\right)^{-1}
$$

と置けば、連続関数計算と積閉性から $U_n\in M$ です。

また

$$
U_n
=
U|T|
\left(|T|+\frac1nI\right)^{-1}.
$$

支持射影の近似より

$$
|T|
\left(|T|+\frac1nI\right)^{-1}
\xrightarrow{\mathrm{SOT}}
s(|T|).
$$

したがって

$$
U_n
\xrightarrow{\mathrm{SOT}}
Us(|T|)
=
U.
$$

von Neumann 環は SOT 閉なので

$$
\boxed{U\in M}.
$$

これで極分解の存在、幾何学的意味、支持射影との関係、von Neumann 環内部での閉性まで一続きに再構成できました。
