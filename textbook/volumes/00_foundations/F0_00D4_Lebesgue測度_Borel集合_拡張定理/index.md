# F0-00D4 補講：Lebesgue測度・Borel集合・Carathéodory拡張定理

D3では、任意の外測度 $\mu^*$ から Carathéodory 可測集合を選ぶと完全測度が得られることを証明しました。

この章では二つの仕事をします。

1. 実数直線上で区間の長さから Lebesgue 測度を完成させる。
2. 同じ構成を一般化し、有限集合演算で閉じた集合族上の集合関数から測度を作る拡張原理を証明する。

中心線は

```text
区間の長さ
 ↓
Lebesgue外測度
 ↓
区間・開集合・Borel集合が可測
 ↓
Lebesgue測度

有限集合演算で閉じた集合族上の集合関数
 ↓
被覆infimumで外測度
 ↓
Carathéodory可測性
 ↓
生成σ代数上の測度
 ↓ σ有限なら一意
```

です。

### 名称について：Hopf の拡張定理はどこにいるか

測度の拡張定理には文献ごとの名称差があります。有限集合演算で閉じた集合族上の集合関数を生成 σ 代数上の測度へ延長する結果は、**Carathéodory の拡張定理**、**Hopf の拡張定理**、**Hahn--Kolmogorov の拡張定理**などの名前で現れます。出発点で可算加法性まで仮定するか、有限加法性と連続性から導くかでも定理の見た目が変わります。

本章では混同を避けるため、次の二段階に分けて扱います。

- 有限加法性と空集合への連続性から前測度性を得るための判定を先に証明する。
-前測度から外測度を作り、生成 σ 代数へ測度を延長する定理を **Carathéodory 拡張定理（Hopf / Hahn--Kolmogorov 型）**として扱う。

後の STO3 に現れる **Kolmogorov 拡張定理**は、有限個の時刻ごとに与えた整合的な確率法則を、一つの全体法則へまとめる定理です。その証明で本章の測度拡張定理を使いますが、二つは同じ定理ではありません。

---

# Part I：Lebesgue測度を完成する

## 1. 有限区間被覆の長さ補題

<a id="lem-finite-interval-cover"></a>

<!-- formal-statement-start -->
### 補題（有限区間被覆の長さ）

有限個の開区間 $I_1,\dots,I_m$ が $[a,b]$ を覆うなら

$$
\boxed{
\sum_{j=1}^m|I_j|\ge b-a
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $I_j=(\alpha_j,\beta_j)$ を $[a,b]$ と交わる部分だけに切り詰めても、覆いであることは変わらず長さは増えません。

$a,b$ と、切り詰めた区間の全端点を小さい順に

$$
a=t_0<t_1<\cdots<t_N=b
$$

と並べます。各小区間 $(t_{r-1},t_r)$ は元の被覆区間の少なくとも一つに完全に含まれます。もし内部の一点がある $I_j$ に入れば、$t_{r-1},t_r$ の間にはどの区間の端点もないため、その小区間全体が同じ $I_j$ に含まれるからです。

従って元区間の長さを端点分割された小区間の長さの和として数えると、$[a,b]$ を構成する全小区間が少なくとも一回は数えられます。よって

$$
\sum_{j=1}^m|I_j|
\ge
\sum_{r=1}^N(t_r-t_{r-1})
=b-a.
$$

$\square$
<!-- proof-end -->

---

## 2. 区間の外測度は長さに一致する

<a id="thm-f0-00d4-interval-length"></a>

<!-- formal-statement-start -->
### 定理（区間のLebesgue外測度）

任意の $a<b$ について

$$
\boxed{\lambda^*([a,b])=b-a}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 上からの評価

任意の $\varepsilon>0$ に対して

$$
[a,b]\subset(a-\varepsilon/2,b+\varepsilon/2)
$$

だから

$$
\lambda^*([a,b])\le b-a+\varepsilon.
$$

$\varepsilon\downarrow0$ として

$$
\lambda^*([a,b])\le b-a.
$$

#### 下からの評価

$[a,b]$ の任意の可算開区間被覆 $(I_n)$ を取ります。$[a,b]$ はコンパクトなので有限部分被覆

$$
I_{n_1},\dots,I_{n_m}
$$

が存在します。[有限区間被覆の長さ補題](#lem-finite-interval-cover)から

$$
\sum_{k=1}^m|I_{n_k}|\ge b-a.
$$

従って元の可算被覆についても

$$
\sum_{n=1}^\infty|I_n|\ge b-a.
$$

全ての開区間被覆について infimum を取れば

$$
\lambda^*([a,b])\ge b-a.
$$

上下を合わせて等号です。$\square$
<!-- proof-end -->

> F0-00C のコンパクト性が、ここで「可算被覆から有限被覆を抜く」ために実際に働いています。

---

## 3. 平行移動不変性

<a id="prop-f0-00d4-translation-invariance"></a>

<!-- formal-statement-start -->
### 命題（Lebesgue外測度の平行移動不変性）

任意の $A\subset\mathbb R,t\in\mathbb R$ に対して

$$
\boxed{\lambda^*(A+t)=\lambda^*(A)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A$ を覆う開区間族 $(I_n)$ を全て $t$ だけ平行移動すると $A+t$ を覆い、各長さは変わりません。従って

$$
\lambda^*(A+t)\le\lambda^*(A).
$$

$A+t$ に $-t$ を適用すれば逆向きも得るので等号です。$\square$
<!-- proof-end -->

<a id="cor-f0-00d4-lebesgue-translation-invariance"></a>

<!-- formal-statement-start -->
### 系（Lebesgue測度の平行移動不変性）

$E\subset\mathbb R$ が Lebesgue 可測なら、任意の $t\in\mathbb R$ に対して $E+t$ も Lebesgue 可測であり、

$$
\lambda(E+t)=\lambda(E)
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

外測度の値が平行移動で変わらないだけでは、$E+t$ に測度記号 $\lambda(E+t)$ を使えるとはまだ限りません。先に Carathéodory 可測性そのものが平行移動で保たれることを確認し、その後で外測度の不変性を測度へ制限します。

<!-- proof-start -->
### 証明

$E$ を Lebesgue 可測、$t\in\mathbb R$ とします。$E+t$ の Carathéodory 条件を確認するため、任意の $T\subset\mathbb R$ を取ります。

$E$ の可測性を、平行移動したテスト集合

$$
T-t:=\{x-t:x\in T\}
$$

へ適用すると

$$
\lambda^*(T-t)
=
\lambda^*((T-t)\cap E)
+
\lambda^*((T-t)\setminus E).
$$

各集合を $t$ だけ平行移動すると

$$
((T-t)\cap E)+t
=
T\cap(E+t),
$$

$$
((T-t)\setminus E)+t
=
T\setminus(E+t).
$$

また直前の命題から外測度は平行移動不変なので

$$
\lambda^*(T-t)=\lambda^*(T),
$$

$$
\lambda^*((T-t)\cap E)
=
\lambda^*(T\cap(E+t)),
$$

$$
\lambda^*((T-t)\setminus E)
=
\lambda^*(T\setminus(E+t)).
$$

これらを Carathéodory 等式へ代入すると

$$
\lambda^*(T)
=
\lambda^*(T\cap(E+t))
+
\lambda^*(T\setminus(E+t)).
$$

$T$ は任意なので $E+t$ は Lebesgue 可測です。

最後に、Lebesgue測度は可測集合上で $\lambda=\lambda^*$ と定めたものだから

$$
\lambda(E+t)
=
\lambda^*(E+t)
=
\lambda^*(E)
=
\lambda(E).
$$

従って Lebesgue測度も平行移動不変です。$\square$
<!-- proof-end -->

---

## 4. 半直線と開区間は Carathéodory 可測

<a id="lem-halfline-measurable"></a>

<!-- formal-statement-start -->
### 補題（半直線の可測性）

任意の $c\in\mathbb R$ について半直線 $(-\infty,c]$ は Lebesgue 外測度 $\lambda^*$ に関して Carathéodory 可測である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$H=(-\infty,c]$ とし、任意の $T\subset\mathbb R$ を取ります。外測度の劣加法性から

$$
\lambda^*(T)
\le
\lambda^*(T\cap H)+\lambda^*(T\setminus H)
$$

は自動なので逆向きを示します。

まず $\lambda^*(T)<\infty$ とします。任意の $\varepsilon>0$ に対して

$$
T\subset\bigcup_n I_n,
\qquad
\sum_n|I_n|<\lambda^*(T)+\frac{\varepsilon}{2}
$$

となる開区間被覆を取ります。

各 $I_n=(\alpha_n,\beta_n)$ を点 $c$ で左側と右側に分けます。$I_n$ が $c$ をまたがない場合は、そのまま片側の被覆に使えます。$\alpha_n<c<\beta_n$ の場合だけ、左側の断片 $(\alpha_n,c]$ を開集合で覆うため

$$
L_n
=
\left(
\alpha_n,,
c+\frac{\varepsilon}{2^{n+2}}
\right),
$$

右側には

$$
R_n=(c,\beta_n)
$$

を使います。$L_n$ は $I_n\cap H$ を、$R_n$ は $I_n\setminus H$ を覆います。また、もとの区間長 $\beta_n-\alpha_n$ に対して増える長さは高々 $\varepsilon/2^{n+2}$ です。

したがって全ての $n$ を合わせると、$T\cap H$ と $T\setminus H$ の二つの開区間被覆の総延長は

$$
\sum_n|I_n|
+
\sum_{n=1}^{\infty}\frac{\varepsilon}{2^{n+2}}
<
\lambda^*(T)+\frac{\varepsilon}{2}+rac{\varepsilon}{4}
<
\lambda^*(T)+\varepsilon.
$$

外測度は被覆コストの下限なので

$$
\lambda^*(T\cap H)+\lambda^*(T\setminus H)
<
\lambda^*(T)+\varepsilon.
$$

$\varepsilon\downarrow0$ として必要な逆向き不等式を得ます。

次に $\lambda^*(T)=\infty$ とします。もし

$$
\lambda^*(T\cap H)+\lambda^*(T\setminus H)<\infty
$$

なら両部分を有限総延長で覆えるので、それらを合わせて $T$ の有限総延長被覆を作れて矛盾します。従って右辺も $\infty$ で等号です。$\square$
<!-- proof-end -->

Carathéodory 可測集合は補集合・有限共通部分で閉じます。従って

$$
(-\infty,b),\qquad(a,\infty)
$$

も可測であり

$$
(a,b)=(-\infty,b)\cap(a,\infty)
$$

も可測です。

<a id="cor-open-interval-measurable"></a>

<!-- formal-statement-start -->
### 系（区間のLebesgue可測性）

全ての開区間・閉区間・半開区間は Lebesgue 可測である。
<!-- formal-statement-end -->

---

## 5. 開集合は高々可算個の互いに素な開区間の和

<a id="thm-open-set-decomposition"></a>

<!-- formal-statement-start -->
### 定理（実数上の開集合の分解）

任意の開集合 $G\subset\mathbb R$ は、高々可算個の互いに素な開区間の和として一意に表せる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $x\in G$ に対して

$$
C_x
:=
\left\{
y\in G:
[\min(x,y),\max(x,y)]\subset G
\right\}
$$

と置きます。これは「$x$ と一本の区間で結べる $G$ 内の点を全部集めた集合」です。

まず $C_x$ が区間であることを示します。$y,z\in C_x$ とし、$y\le w\le z$ を取ります。$[x,y]$ と $[x,z]$ はともに $G$ に含まれ、その和集合は $x,y,z$ を含む一つの区間です。したがって $[x,w]\subset G$ となり、$w\in C_x$ です。

次に $C_x$ が開であることを示します。$z\in C_x$ とします。$G$ は開なので、ある $\varepsilon>0$ が存在して

$$
(z-\varepsilon,z+\varepsilon)\subset G
$$

となります。この近傍の任意の $w$ に対し、$[x,z]\subset G$ と $z$ の近傍を合わせれば $[\min(x,w),\max(x,w)]\subset G$ です。従って

$$
(z-\varepsilon,z+\varepsilon)\subset C_x.
$$

よって $C_x$ は開集合であり、区間でもあるので開区間です。端が無限大の区間も許します。

また二つの集合 $C_x,C_y$ が一点 $z$ を共有するとします。$[x,z]$ と $[y,z]$ は $G$ に含まれるので、両者の和集合は $x$ と $y$ の間をすべて含み、

$$
[\min(x,y),\max(x,y)]\subset G.
$$

さらに任意の $w\in C_x$ について、$[x,w]$ と上の $x$–$y$ 間の区間を合わせれば $y$ と $w$ の間も $G$ に含まれます。従って $w\in C_y$ であり、

$$
C_x\subset C_y.
$$

今度は $x$ と $y$ の役割を交換します。$C_x$ と $C_y$ は点 $z$ を共有しているので、全く同じ包含の導出を $y$ から $x$ の向きに適用でき、

$$
C_y\subset C_x.
$$

従って

$$
C_x=C_y.
$$

したがって異なる $C_x$ は互いに素です。一方 $x\in C_x$ なので

$$
G=\bigcup_{x\in G}C_x.
$$

各非空開区間 $C_x$ は有理数を少なくとも一つ含みます。互いに素な異なる $C_x$ には異なる有理数を対応させられるので、$\mathbb Q$ の可算性から異なる $C_x$ の個数は高々可算です。

最後に一意性を確認します。$x\in G$ を含む任意の開区間 $I\subset G$ を取ると、$y\in I$ なら $x$ と $y$ の間の区間も $I$ に含まれるので $y\in C_x$ です。従って $I\subset C_x$。つまり $C_x$ は $x$ を含み $G$ に含まれる最大の開区間として一意に決まります。したがって上の互いに素な開区間分解も一意です。$\square$
<!-- proof-end -->

各開区間は可測で、Carathéodory 可測集合族はσ代数なので、全ての開集合 $G$ は Lebesgue 可測です。

---

## 6. Borel σ代数

<a id="def-borel-sigma-algebra"></a>

### Borel σ代数の再確認

D2 で導入した Borel σ代数を、この章で得た「全ての開集合が Lebesgue 可測」という事実へ接続します。定義は

$$
\mathcal B(\mathbb R)
=
\sigma(\{G\subset\mathbb R:G\text{ は開集合}\})
$$

です。ここでは新しい概念を定義しているのではなく、既出の Borel σ代数を Lebesgue 可測集合族と比較するために再掲しています。

<!-- definition-example-start: def-borel-sigma-algebra -->
### 例1：有理数集合は Borel 集合

**定義の確認**

一点集合 $\{q\}$ は閉集合なので、その補集合が開集合です。Borel σ代数は開集合を含むσ代数なので閉集合も含みます。さらに $\mathbb Q$ は可算だから

$$
\mathbb Q=\bigcup_{q\in\mathbb Q}\{q\}
$$

も Borel σ代数に属します。これは「開集合から生成したσ代数で補集合・可算和を取る」という定義を実際に使った例です。また一点集合の測度は0なので

$$
\lambda(\mathbb Q)=0.
$$
<!-- definition-example-end -->

開集合が全て Lebesgue 可測で、Lebesgue 可測集合族 $\mathcal L$ はσ代数なので

$$
\boxed{
\mathcal B(\mathbb R)\subset\mathcal L
}.
$$

---

## 7. Borel と Lebesgue 可測は同じではない

<a id="def-measure-completion"></a>

<!-- formal-statement-start -->
### 定義（測度空間の完備化）

測度空間 $(X,\mathcal F,\mu)$ に、$\mu(N)=0$ となる $N\in\mathcal F$ の全ての部分集合を可測集合として追加し、測度0と定めて得る最小の完全な拡張を **完備化** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-measure-completion -->
### 7.1 例：Cantor 集合の部分集合を追加する

**定義の確認**

Cantor 集合 $C$ は Borel 集合で $\lambda(C)=0$ です。従って Borel 測度を完備化すると、定義により **全ての** $V\subset C$ が可測集合として追加され、$\lambda(V)=0$ と定められます。

さらに $|C|=\mathfrak c$ なので $|2^C|=2^{\mathfrak c}$、一方 Borel 集合全体の濃度は $\mathfrak c$ です。従って $C$ の部分集合には Borel でないものも存在し、それらも完備化後には Lebesgue 可測になります。したがって

$$
\mathcal B(\mathbb R)\subsetneq\mathcal L.
$$
<!-- definition-example-end -->

Lebesgue 測度は Borel 測度の完備化です。

---

## 8. 区間の種類によらず長さは同じ

一点集合の測度は0なので

$$
[a,b],\quad(a,b),\quad[a,b),\quad(a,b]
$$

の差は測度0です。従って

$$
\boxed{
\lambda([a,b])
=
\lambda((a,b))
=
\lambda([a,b))
=
\lambda((a,b])
=b-a
}.
$$

ここまでで

$$
(\mathbb R,\mathcal L,\lambda)
$$

という完全測度空間が得られました。

---

# Part II：Carathéodory拡張定理

## 9.集合代数と前測度

<a id="def-set-algebra"></a>

<!-- formal-statement-start -->
### 定義（集合代数）

$\mathcal A\subset2^X$ が

1. $X\in\mathcal A$
2. $A\in\mathcal A\Rightarrow A^c\in\mathcal A$
3. $A,B\in\mathcal A\Rightarrow A\cup B\in\mathcal A$

を満たすとき $X$ 上の **集合代数（algebra）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set-algebra -->
### 9.1 例：一つの集合から作る4集合代数

**定義の確認**

固定した $A\subset X$ に対して

$$
\mathcal A=\{\varnothing,A,A^c,X\}
$$

とします。まず $X\in\mathcal A$。補集合は $\varnothing\leftrightarrow X$、$A\leftrightarrow A^c$ と同じ4集合内に残ります。二集合の和も、$A\cup A^c=X$ を含め必ずこの4集合のどれかです。従って定義の3条件を全て満たします。
<!-- definition-example-end -->

集合代数は有限集合演算で閉じますが、可算和で閉じるとは限りません。

<a id="def-premeasure"></a>

<!-- formal-statement-start -->
### 定義（前測度）

$\mu_0:\mathcal A\to[0,\infty]$ が **前測度（premeasure）** であるとは、互いに素な $A_n\in\mathcal A$ について、もし

$$
\bigcup_{n=1}^\infty A_n\in\mathcal A
$$

なら

$$
\boxed{
\mu_0\left(\bigcup_nA_n\right)=\sum_n\mu_0(A_n)
}
$$

を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-premeasure -->
### 例2：半開区間の長さ

**定義の確認**

$\mathbb R$ 上で半開区間 $[a,b)$ の有限互いに素和からなる集合代数を考え

$$
\mu_0([a,b))=b-a
$$

と定め、有限互いに素和には加法的に延長します。互いに素な $A_n$ の可算和が再びこの集合代数に属する場合、その和は有限個の半開区間へ整理でき、各区間の長さは互いに素な部分区間の長さの和になります。従って

$$
\mu_0\left(\bigsqcup_n A_n\right)=\sum_n\mu_0(A_n),
$$

となり前測度の可算加法条件を満たします。これが Lebesgue 測度を作る元の前測度です。
<!-- definition-example-end -->

---

## 9.5 有限加法性から前測度へ：Hopf 型の判定

実際の構成では、最初から可算加法性を直接確認するより、まず有限加法性を示し、減少列に対する連続性を確認する方が容易なことがあります。確率測度の候補では全空間の質量が $1$ なので、特にこの形が使いやすくなります。

<a id="lem-f0-00d4-hopf-premeasure"></a>

<!-- formal-statement-start -->
### 補題（Hopf型の前測度判定）

$X$ 上の集合代数$\mathcal A$ と写像

$$
\mu_0:\mathcal A\to[0,\infty)
$$

を考える。$\mu_0(\varnothing)=0$、$\mu_0(X)<\infty$ とし、互いに素な $A,B\in\mathcal A$ に対して

$$
\mu_0(A\cup B)=\mu_0(A)+\mu_0(B)
$$

が成り立つ、すなわち $\mu_0$ は有限加法的であるとする。

このとき次は同値である。

1. $\mu_0$ は $\mathcal A$ 上の前測度である。
2. 任意の減少列 $E_1\supset E_2\supset\cdots$、$E_n\in\mathcal A$ で $\bigcap_nE_n=\varnothing$ となるものについて

$$
\mu_0(E_n)\downarrow0
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

前測度から空集合への連続性を出す向きでは、減少列を互いに素な「層」

$$
E_n\setminus E_{n+1}
$$

へ分解します。逆向きでは、互いに素な列から最初の有限個を取り除いて残る **tail**

$$
R_N
=
E\setminus\bigcup_{n=1}^N E_n
$$

が空集合へ減少することを使います。有限加法性が最初の有限個を処理し、連続性が tail を消します。

<!-- proof-start -->
### 証明

まず $\mu_0$ が前測度であるとします。

$$
E_1\supset E_2\supset\cdots,
\qquad
\bigcap_{n=1}^{\infty}E_n=\varnothing
$$

とし、

$$
D_n:=E_n\setminus E_{n+1}
$$

と置きます。各 $D_n\in\mathcal A$ で、$D_n$ は互いに素です。また共通部分が空なので

$$
E_1
=
\bigsqcup_{n=1}^{\infty}D_n.
$$

前測度性から

$$
\mu_0(E_1)
=
\sum_{n=1}^{\infty}\mu_0(D_n).
$$

左辺は $\mu_0(X)<\infty$ から有限です。さらに各 $N$ について

$$
E_N
=
\bigsqcup_{n=N}^{\infty}D_n
$$

なので

$$
\mu_0(E_N)
=
\sum_{n=N}^{\infty}\mu_0(D_n).
$$

上の等式では $\mu_0(E_1)<\infty$ が、非負な項の全体の和になっています。したがって最初の有限個を除いて残る

$$
\sum_{n=N}^{\infty}\mu_0(D_n)
$$

は $N\to\infty$ で $0$ へ収束し、

$$
\mu_0(E_N)\downarrow0.
$$

逆に、$\mu_0$ が有限加法的で、空集合へ減少する列に対する連続性を満たすとします。互いに素な $A_1,A_2,\ldots\in\mathcal A$ が

$$
A:=\bigsqcup_{n=1}^{\infty}A_n\in\mathcal A
$$

を満たすとします。最初の有限個を除いた残りを

$$
R_N
:=
A\setminus\bigcup_{n=1}^N A_n
$$

と置きます。集合代数は有限和と差で閉じるので $R_N\in\mathcal A$ です。また

$$
R_1\supset R_2\supset\cdots,
\qquad
\bigcap_{N=1}^{\infty}R_N=\varnothing.
$$

従って仮定から

$$
\mu_0(R_N)\to0.
$$

一方、有限加法性により

$$
A
=
\left(\bigsqcup_{n=1}^N A_n\right)
\sqcup R_N
$$

だから

$$
\mu_0(A)
=
\sum_{n=1}^N\mu_0(A_n)
+
\mu_0(R_N).
$$

$N\to\infty$ とすると

$$
\mu_0(A)
=
\sum_{n=1}^{\infty}\mu_0(A_n).
$$

したがって $\mu_0$ は前測度です。$\square$
<!-- proof-end -->

この補題は、**「有限加法性は分かるが、可算加法性を直接扱いにくい」**場面を前測度へ渡す橋です。とくに全質量 $1$ の確率候補では $\mu_0(X)<\infty$ が自動なので、空集合へ減少する列だけを制御すればよくなります。

---

## 10.前測度から外測度を作る

任意の $E\subset X$ に対して

$$
\boxed{
\mu^*(E)
:=
\inf\left\{
\sum_{n=1}^\infty\mu_0(A_n):
E\subset\bigcup_nA_n,
\ A_n\in\mathcal A
\right\}
}
$$

と定めます。

<a id="lem-premeasure-outer"></a>

<!-- formal-statement-start -->
### 補題（前測度から作る外測度）

上で定めた $\mu^*$ は外測度である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varnothing$ は $\varnothing\in\mathcal A$ 一つで覆え、前測度から $\mu_0(\varnothing)=0$ なので $\mu^*(\varnothing)=0$。

$E\subset F$ なら $F$ の任意の $\mathcal A$-被覆は $E$ も覆うので単調性が従います。

可算劣加法性を示します。もし

$$
\sum_{n=1}^{\infty}\mu^*(E_n)=\infty
$$

なら、示すべき不等式の右辺が $\infty$ なので主張は自動です。以下ではこの和が有限の場合を考えます。

任意の $\varepsilon>0$ を固定します。各 $n$ について $\mu^*(E_n)$ は被覆コストの下限だから、$\mathcal A$ の集合 $A_{n,1},A_{n,2},\ldots$ を

$$
E_n\subset\bigcup_{k=1}^{\infty}A_{n,k},
\qquad
\sum_{k=1}^{\infty}\mu_0(A_{n,k})
<
\mu^*(E_n)+\frac{\varepsilon}{2^n}
$$

となるように選べます。

自然数の組 $(n,k)$ 全体は一列に並べられるので、全ての $A_{n,k}$ をまとめると $\bigcup_nE_n$ の可算な $\mathcal A$-被覆になります。従って定義から

$$
\begin{aligned}
\mu^*\left(\bigcup_{n=1}^{\infty}E_n\right)
&\le
\sum_{n=1}^{\infty}\sum_{k=1}^{\infty}\mu_0(A_{n,k})\\
&<
\sum_{n=1}^{\infty}
\left(
\mu^*(E_n)+\frac{\varepsilon}{2^n}
\right)\\
&=
\sum_{n=1}^{\infty}\mu^*(E_n)+\varepsilon.
\end{aligned}
$$

$\varepsilon>0$ は任意なので

$$
\mu^*\left(\bigcup_{n=1}^{\infty}E_n\right)
\le
\sum_{n=1}^{\infty}\mu^*(E_n).
$$

これで可算劣加法性が示され、$\mu^*$ は外測度です。$\square$
<!-- proof-end -->

---

## 11. 元の集合代数上では値が変わらない

<a id="lem-extension-agrees"></a>

<!-- formal-statement-start -->
### 補題（外測度は前測度を拡張する）

任意の $A\in\mathcal A$ に対して

$$
\boxed{\mu^*(A)=\mu_0(A)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A$ 自身一つで $A$ を覆えるので

$$
\mu^*(A)\le\mu_0(A).
$$

逆向きを示します。$A\subset\bigcup_nA_n$、$A_n\in\mathcal A$ を任意の被覆とします。

$$
B_1=A\cap A_1,
$$

$$
B_n=A\cap\left(A_n\setminus\bigcup_{k<n}A_k\right)
\quad(n\ge2)
$$

と置くと、$B_n\in\mathcal A$ は互いに素で

$$
A=\bigsqcup_nB_n.
$$

和集合 $A$ 自身が $\mathcal A$ に入るので前測度の可算加法性を使えます。従って

$$
\mu_0(A)=\sum_n\mu_0(B_n)
\le
\sum_n\mu_0(A_n).
$$

任意の被覆に対して成立するので infimum を取って

$$
\mu_0(A)\le\mu^*(A).
$$

よって等号です。$\square$
<!-- proof-end -->

---

## 12.集合代数の集合は Carathéodory 可測

<a id="lem-algebra-caratheodory"></a>

<!-- formal-statement-start -->
### 補題（集合代数の集合のCarathéodory可測性）

任意の $A\in\mathcal A$ は、上で構成した外測度 $\mu^*$ に関して Carathéodory 可測である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $E\subset X$ を取ります。劣加法性から

$$
\mu^*(E)
\le
\mu^*(E\cap A)+\mu^*(E\setminus A)
$$

は自動です。逆向きを示します。

$E\subset\bigcup_nA_n$、$A_n\in\mathcal A$ を任意の被覆とします。$\mathcal A$ は差・共通部分で閉じるので

$$
A_n\cap A,
\qquad
A_n\setminus A
$$

も $\mathcal A$ に属し、互いに素な二分割です。前測度の有限加法性から

$$
\mu_0(A_n)
=
\mu_0(A_n\cap A)+\mu_0(A_n\setminus A).
$$

前者たちは $E\cap A$ を、後者たちは $E\setminus A$ を覆います。従って

$$
\mu^*(E\cap A)+\mu^*(E\setminus A)
\le
\sum_n\mu_0(A_n).
$$

右辺について全ての $E$ の被覆の infimum を取れば

$$
\mu^*(E\cap A)+\mu^*(E\setminus A)
\le
\mu^*(E).
$$

よって等号で、$A$ は Carathéodory 可測です。$\square$
<!-- proof-end -->

D3 により Carathéodory 可測集合全体 $\mathcal M$ はσ代数なので

$$
\mathcal A\subset\mathcal M
\quad\Longrightarrow\quad
\sigma(\mathcal A)\subset\mathcal M.
$$

また $\mu^*|_{\mathcal M}$ は完全測度です。

---

## 12.5 一意性条件に出る「σ有限」を先に定義する

次の拡張定理では、一意性の条件として **σ有限** という語を使います。先に意味を固定します。

前測度$\mu_0$ が **σ有限** であるとは、可算個の $A_n\in\mathcal A$ が存在して

$$
X=\bigcup_{n=1}^{\infty}A_n,
\qquad
\mu_0(A_n)<\infty
$$

となることをいいます。つまり **全空間を可算個の前測度が有限な集合で覆える** という条件です。

具体例と一意性証明はSection 14で改めて確認します。

---

## 13.前測度を生成 σ 代数へ拡張する

<a id="thm-caratheodory-extension"></a>

<!-- formal-statement-start -->
### 定理（Carathéodory拡張定理；Hopf / Hahn--Kolmogorov 型）

集合 $X$ 上の集合代数$\mathcal A$ と、その上の前測度$\mu_0$ に対して、$\mu_0$ と $\mathcal A$ 上で一致する測度 $\mu$ が生成σ代数 $\sigma(\mathcal A)$ 上に存在する。

さらに $\mu_0$ がσ有限なら、この拡張は一意である。
<!-- formal-statement-end -->

この定理の存在部分で必要なのは、前測度から作った外測度が

1. 元の集合代数上で値を保ち、
2.集合代数の各集合を Carathéodory 可測にし、
3. したがって生成 σ 代数全体を Carathéodory 可測集合族へ入れる

という三段階です。有限加法的な有限集合関数から出発する場合は、先に [Hopf 型の前測度判定](#lem-f0-00d4-hopf-premeasure)で前測度性を確認してからこの定理へ渡せます。

### 証明の見取り図

10節で外測度 $\mu^*$ を作り、11節で $\mu^*=\mu_0$ on $\mathcal A$、12節で $\mathcal A\subset\mathcal M$ を示しました。あとは $\mathcal M$ が σ 代数であることを D3 から使えば

$$
\sigma(\mathcal A)\subset\mathcal M
$$

となり、$\mu^*$ を $\sigma(\mathcal A)$ へ制限するだけです。

<!-- proof-start -->
### 存在の証明

10節の被覆 infimum で $\mu^*$ を構成すると外測度になります。

12節により $\mathcal A$ の全ての集合は $\mu^*$-Carathéodory 可測。従って

$$
\sigma(\mathcal A)\subset\mathcal M.
$$

[D3 の Carathéodory 定理](../F0_00D3_外測度_Caratheodory可測性/index.md#thm-f0-00d3-caratheodory)から

$$
\mu:=\mu^*|_{\sigma(\mathcal A)}
$$

は測度です。11節から $A\in\mathcal A$ では

$$
\mu(A)=\mu^*(A)=\mu_0(A).
$$

従って $\mu$ は $\mu_0$ の拡張です。$\square$
<!-- proof-end -->

> $\mu^*$ を Carathéodory 可測集合全体 $\mathcal M$ に制限すれば完全測度が得られます。$\sigma(\mathcal A)$ だけへ制限した拡張は一般には完全とは限りません。この二つを混同しないことが重要です。

---

## 14. σ有限性と一意性

<a id="def-sigma-finite"></a>

<!-- formal-statement-start -->
### 定義（σ有限前測度）

前測度$\mu_0$ が **σ有限** であるとは、$A_n\in\mathcal A$ が存在して

$$
X=\bigcup_{n=1}^\infty A_n,
\qquad
\mu_0(A_n)<\infty
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sigma-finite -->
### 14.1 例：区間長前測度はσ有限

**定義の確認**

半開区間の有限互いに素和からなる集合代数上の長さ前測度を考えます。

$$
A_n=[-n,n)
$$

と置けば $A_n\in\mathcal A$、

$$
\mathbb R=\bigcup_{n=1}^\infty A_n,
\qquad
\mu_0(A_n)=2n<\infty.
$$

従って定義の「全空間を可算個の前測度が有限な集合で覆う」という条件を満たし、この前測度はσ有限です。
<!-- definition-example-end -->

### 証明の見取り図

全体が有限測度なら、二つの拡張が一致する集合全体を Dynkin 族にして [π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)を適用します。σ有限の場合は、全空間を有限測度部分へ互いに素に分割し、その各部分で有限測度の場合へ帰着します。ここで D3A の π–λ 定理が実際の証明依存として働きます。

<!-- proof-start -->
### 一意性の証明

$\mu,\nu$ を $\sigma(\mathcal A)$ 上の二つの拡張測度とします。

まず有限測度の場合、つまり $\mu_0(X)<\infty$ とします。

$$
\mathcal D:=\{E\in\sigma(\mathcal A):\mu(E)=\nu(E)\}
$$

と置きます。$\mu(X)=\nu(X)<\infty$ なので、補集合について

$$
\mu(E^c)=\mu(X)-\mu(E),
\qquad
\nu(E^c)=\nu(X)-\nu(E)
$$

が使えます。また互いに素な可算和では両測度の可算加法性から等しさが保たれます。従って $\mathcal D$ は Dynkin 族です。

$\mathcal A$ は有限共通部分で閉じる π系 で、拡張は $\mathcal A$ 上でともに $\mu_0$ と一致するので

$$
\mathcal A\subset\mathcal D.
$$

[π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から

$$
\sigma(\mathcal A)\subset\mathcal D.
$$

よって有限測度の場合は一意です。

一般のσ有限の場合を扱います。まず

$$
X=\bigcup_{n=1}^{\infty}A_n,
\qquad
A_n\in\mathcal A,
\qquad
\mu_0(A_n)<\infty
$$

となる列を取ります。これを

$$
B_1=A_1,
\qquad
B_n
=
A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置き換えます。集合代数は有限和と差で閉じるので $B_n\in\mathcal A$ です。また $B_n\subset A_n$ だから有限加法性から

$$
\mu_0(B_n)\le\mu_0(A_n)<\infty.
$$

構成から $(B_n)$ は互いに素で、

$$
X=\bigsqcup_{n=1}^{\infty}B_n.
$$

固定した $n$ について

$$
\mathcal A_{B_n}
:=
\{A\cap B_n:A\in\mathcal A\}
$$

を考えます。これは $B_n$ 上の集合代数です。さらに

$$
\sigma(\mathcal A_{B_n})
=
\{E\cap B_n:E\in\sigma(\mathcal A)\}
$$

です。左辺は $\mathcal A_{B_n}$ を含む最小のσ代数であり、右辺も $B_n$ 上のσ代数で $\mathcal A_{B_n}$ を含むので一方の包含が出ます。逆向きは、$E$ を「$E\cap B_n$ が左辺に入る集合」として集めるとそれが $\mathcal A$ を含むσ代数になることから従います。

ここで $\mu$ と $\nu$ を $B_n$ 上へ制限すると、どちらも $\mathcal A_{B_n}$ 上で

$$
A\cap B_n
\longmapsto
\mu_0(A\cap B_n)
$$

を拡張する有限測度です。全質量は

$$
\mu(B_n)=\nu(B_n)=\mu_0(B_n)<\infty.
$$

したがって、すでに示した有限測度の場合の一意性を $B_n$ 上で適用でき、任意の $E\in\sigma(\mathcal A)$ に対して

$$
\mu(E\cap B_n)=\nu(E\cap B_n).
$$

最後に $E\cap B_n$ は互いに素で、その和が $E$ だから、可算加法性により

$$
\mu(E)
=
\sum_n\mu(E\cap B_n)
=
\sum_n\nu(E\cap B_n)
=
\nu(E).
$$

従ってσ有限なら拡張は一意です。$\square$
<!-- proof-end -->

---

## 15. 積測度は拡張定理の直接の応用

D2C の積測度をここで回収します。

可測長方形上で

$$
\pi(A\times B):=\mu(A)\nu(B)
$$

と置き、有限互いに素和へ加法的に延長します。これが前測度になることの確認は、後の D2C で行います。本節ではその確認を前提にし、**前測度が得られた後の拡張機構**だけを回収します。

[Carathéodory 拡張定理](#thm-caratheodory-extension)から

$$
\sigma\{A\times B:A\in\mathcal A,B\in\mathcal B\}
=
\mathcal A\otimes\mathcal B
$$

上に拡張測度が存在します。$\mu,\nu$ がσ有限なら長方形前測度もσ有限なので一意です。

従って

$$
\boxed{
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
}
$$

を満たす積測度の存在・一意性が、ここで依存先まで含めて証明されました。

---

## 16. 確率論との接続

確率測度は有限測度なのでσ有限です。そのため、簡単な事象の集合代数上で整合的に確率を定め、生成σ代数へ拡張するとき一意性が得やすいという利点があります。

さらに、集合代数上でまず有限加法的な確率候補 $P_0$ を作った場合、

$$
A_n\downarrow\varnothing
\quad\Longrightarrow\quad
P_0(A_n)\downarrow0
$$

を示せば、[Hopf 型の前測度判定](#lem-f0-00d4-hopf-premeasure)によって $P_0$ は前測度になります。後の STO3 では、有限個の座標だけを見る事象に定めた確率を、より大きな σ 代数へ延長するとき、この「有限加法性 → 空集合への連続性 →前測度→ 測度拡張」という流れがそのまま現れます。

また非負可測関数 $f$ が

$$
\int_{\mathbb R}f\,d\lambda=1
$$

を満たすなら

$$
P(A):=\int_Af\,d\lambda
$$

は確率測度で

$$
P\ll\lambda,
\qquad
\frac{dP}{d\lambda}=f.
$$

P2 の Radon–Nikodym 定理では、この「密度で測度を表す」考えを一般化します。

---

# 17. 演習

## F0-00D4-A01 区間被覆

- Level: A
- 目安時間: 10分

$[0,1]$ を有限個の開区間 $I_1,\dots,I_m$ が覆うとき

$$
\sum_j|I_j|\ge1
$$

となる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

0,1 と全区間の端点を小さい順に並べて有限分割する。各隣接小区間は少なくとも一つの被覆区間に完全に含まれる。従って、元の区間長を小区間長の和として数えると $[0,1]$ の全小区間が少なくとも一度は数えられるため

$$
\sum_j|I_j|\ge1.
$$

<!-- solution-end -->

## F0-00D4-A02 Borel集合と測度0

- Level: A
- 目安時間: 10分

$A=\mathbb Q\cap[0,1]$ が Borel 集合であることを示し、$\lambda(A)$ を求めよ。

<!-- solution-start -->
### 詳細解答

一点集合 $\{q\}$ は閉集合なので Borel 集合。有理数は可算だから

$$
A=\bigcup_{q\in\mathbb Q\cap[0,1]}\{q\}
$$

は Borel 集合の可算和であり Borel。各一点の Lebesgue 測度は0なので可算加法性から

$$
\lambda(A)=0.
$$

<!-- solution-end -->

## F0-00D4-A03 被覆式の意味を説明する

- Level: A
- 目安時間: 12分

Carathéodory 拡張で

$$
\mu^*(E)=\inf\left\{\sum_n\mu_0(A_n):E\subset\bigcup_nA_n\right\}
$$

とする理由を、Lebesgue 外測度との対応で説明せよ。

<!-- solution-start -->
### 詳細解答

Lebesgue 外測度では任意集合 $E$ を開区間 $I_n$ で外側から覆い、その被覆コスト

$$
\sum_n|I_n|
$$

の infimum を取った。一般の拡張では「開区間」を集合代数の集合 $A_n$ に、「区間長」を前測度$\mu_0(A_n)$ に置き換える。従って同じ外側近似の構造

$$
\text{covering objects} + \text{cost} + \inf
$$

を抽象化した式である。

<!-- solution-end -->


## F0-00D4-A04 tail を消して可算加法性へ進む

- Level: A
- 目安時間: 12分

$\mathcal A$ を $X$ 上の集合代数、$\mu_0:\mathcal A\to[0,\infty)$ を有限加法的な集合関数とする。互いに素な $A_n\in\mathcal A$ について

$$
A=\bigsqcup_{n=1}^{\infty}A_n\in\mathcal A
$$

とする。さらに

$$
R_N
:=
A\setminus\bigcup_{n=1}^N A_n
$$

と置く。

1. $R_N\downarrow\varnothing$ を示せ。
2. $\mu_0(R_N)\to0$ が分かれば

$$
\mu_0(A)=\sum_{n=1}^{\infty}\mu_0(A_n)
$$

が従うことを示せ。

<!-- solution-start -->
### 詳細解答

まず $N$ を増やすと取り除く集合 $\bigcup_{n=1}^N A_n$ が大きくなるので

$$
R_{N+1}\subset R_N.
$$

したがって $(R_N)$ は減少列です。

また $x\in A$ なら

$$
A=\bigcup_{n=1}^{\infty}A_n
$$

より、ある $m$ が存在して $x\in A_m$ です。すると $N\ge m$ では

$$
x\notin R_N.
$$

よって全ての $R_N$ に属する点は存在せず、

$$
\bigcap_{N=1}^{\infty}R_N=\varnothing.
$$

次に、$A_1,\ldots,A_N,R_N$ は互いに素で

$$
A
=
\left(\bigsqcup_{n=1}^N A_n\right)
\sqcup R_N
$$

です。有限加法性を繰り返し使うと

$$
\mu_0(A)
=
\sum_{n=1}^N\mu_0(A_n)
+
\mu_0(R_N).
$$

仮定 $\mu_0(R_N)\to0$ を使って $N\to\infty$ とすれば

$$
\mu_0(A)
=
\lim_{N\to\infty}
\sum_{n=1}^N\mu_0(A_n)
=
\sum_{n=1}^{\infty}\mu_0(A_n).
$$

これが Hopf 型判定の「有限加法性と空集合への連続性から前測度性を得る」向きの核心です。
<!-- solution-end -->

## F0-00D4-B01 元の値を保つこと

- Level: B
- 目安時間: 20分

$A\in\mathcal A$ について $\mu^*(A)=\mu_0(A)$ を証明せよ。

<!-- solution-start -->
### 詳細解答

$A$ 自身一つで $A$ を覆えるので

$$
\mu^*(A)\le\mu_0(A).
$$

逆向きには、任意の被覆 $A\subset\bigcup_nA_n$ を

$$
B_1=A\cap A_1,
\qquad
B_n=A\cap\left(A_n\setminus\bigcup_{k<n}A_k\right)
$$

と $A$ 内で disjoint 化する。すると $B_n\in\mathcal A$、$B_n\subset A_n$、$A=\bigsqcup_nB_n$ なので

$$
\mu_0(A)=\sum_n\mu_0(B_n)
\le\sum_n\mu_0(A_n).
$$

任意の被覆について成立するから infimum を取り

$$
\mu_0(A)\le\mu^*(A).
$$

両向きを合わせて等号。

<!-- solution-end -->

## F0-00D4-B02集合代数の集合のCarathéodory可測性

- Level: B
- 目安時間: 20分

$A\in\mathcal A$ が $\mu^*$-Carathéodory 可測であることを証明せよ。

<!-- solution-start -->
### 詳細解答

任意の $E\subset X$ とその $\mathcal A$-被覆 $E\subset\bigcup_nA_n$ を取る。各 $A_n$ を

$$
A_n\cap A,
\qquad
A_n\setminus A
$$

へ分けると、前者は $E\cap A$、後者は $E\setminus A$ を覆う。有限加法性から

$$
\mu_0(A_n)=\mu_0(A_n\cap A)+\mu_0(A_n\setminus A).
$$

従って

$$
\mu^*(E\cap A)+\mu^*(E\setminus A)
\le\sum_n\mu_0(A_n).
$$

全被覆について infimum を取って

$$
\mu^*(E\cap A)+\mu^*(E\setminus A)
\le\mu^*(E).
$$

逆向きは外測度の劣加法性から自動なので Carathéodory 等式が成立する。

<!-- solution-end -->

## F0-00D4-B03 拡張の一意性

- Level: B
- 目安時間: 25分

$\mu_0(X)<\infty$ とし、$\mu,\nu$ を $\sigma(\mathcal A)$ 上の二つの拡張とする。

$$
\mathcal D=\{E:\mu(E)=\nu(E)\}
$$

が Dynkin 族であることを示し、[π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から一意性を証明せよ。

<!-- solution-start -->
### 詳細解答

$\mu(X)=\nu(X)=\mu_0(X)<\infty$。$E\in\mathcal D$ なら

$$
\mu(E^c)=\mu(X)-\mu(E)
=
\nu(X)-\nu(E)=\nu(E^c)
$$

なので補集合で閉じる。

互いに素な $E_n\in\mathcal D$ なら

$$
\mu\left(\bigcup_nE_n\right)
=
\sum_n\mu(E_n)
=
\sum_n\nu(E_n)
=
\nu\left(\bigcup_nE_n\right),
$$

よって互いに素な可算和でも閉じ、$\mathcal D$ は Dynkin 族。

$\mathcal A$ は π-system で、両拡張は $\mathcal A$ 上で $\mu_0$ と一致するため $\mathcal A\subset\mathcal D$。[π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から

$$
\sigma(\mathcal A)\subset\mathcal D.
$$

従って $\mu=\nu$。

<!-- solution-end -->


## F0-00D4-B04 積測度への適用

- Level: B
- 目安時間: 20分

$(X,\mathcal A,\mu)$、$(Y,\mathcal B,\nu)$ を σ有限測度空間とする。可測長方形の有限互いに素和からなる集合代数$\mathcal R$ 上に、長方形では

$$
\pi(A\times B)=\mu(A)\nu(B)
$$

を満たす **σ有限な前測度$\pi$ が構成済みである**と仮定する。

この仮定から、積 σ 代数 $\mathcal A\otimes\mathcal B$ 上に

$$
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
$$

を満たす測度が一意に存在することを、拡張定理の仮定確認を含めて説明せよ。

<!-- solution-start -->
### 詳細解答

まず $\mathcal R$ は可測長方形の有限互いに素和からなる集合代数であり、問題文の仮定により

$$
\pi:\mathcal R\to[0,\infty]
$$

は前測度です。したがって [Carathéodory 拡張定理](#thm-caratheodory-extension)の存在部分を適用でき、

$$
\sigma(\mathcal R)
$$

上に $\pi$ を延長する測度が存在します。

$\mathcal R$ は可測長方形を含み、逆に $\mathcal R$ の各要素は可測長方形の有限和なので

$$
\sigma(\mathcal R)
=
\sigma\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
=
\mathcal A\otimes\mathcal B.
$$

従って得られた測度を $\mu\times\nu$ と書けば、元の集合代数上では $\pi$ と一致するため、特に長方形について

$$
(\mu\times\nu)(A\times B)
=
\pi(A\times B)
=
\mu(A)\nu(B).
$$

さらに問題文で $\pi$ は σ有限と仮定されています。よって拡張定理の一意性部分を適用でき、$\mathcal A\otimes\mathcal B$ 上でこの条件を満たす拡張は一意です。

ここでは rectangle set function が前測度であること自体は仮定しました。その確認は積測度を本格的に扱う D2C で行い、本問では **前測度から積測度へ進む拡張部分**だけを切り出しています。
<!-- solution-end -->

## F0-00D4-C01 Carathéodory拡張定理の再構成

- Level: C
- 目安時間: 35分

$X$ 上の集合代数$\mathcal A$ と有限加法的な集合関数

$$
P_0:\mathcal A\to[0,1],
\qquad
P_0(X)=1
$$

を考える。さらに任意の減少列 $E_n\in\mathcal A$ について

$$
E_n\downarrow\varnothing
\quad\Longrightarrow\quad
P_0(E_n)\downarrow0
$$

が成り立つとする。

次を順に示せ。

1. $P_0$ は前測度である。
2. 被覆 infimum から外測度 $P^*$ を作ると、$P^*=P_0$ on $\mathcal A$ であり、$\mathcal A$ の各集合は $P^*$-Carathéodory 可測である。
3. $P_0$ は $\sigma(\mathcal A)$ 上の確率測度 $P$ へ拡張される。
4. この拡張は一意である。

<!-- solution-start -->
### 詳細解答

#### 1. Hopf 型判定で前測度性を得る

$P_0(X)=1<\infty$ であり、問題文で有限加法性と空集合への連続性が与えられています。したがって [Hopf 型の前測度判定](#lem-f0-00d4-hopf-premeasure)を適用でき、

$$
P_0
$$

は $\mathcal A$ 上の前測度です。

適用条件を式で確認すると、互いに素な $A_n\in\mathcal A$ で

$$
A=\bigsqcup_{n=1}^{\infty}A_n\in\mathcal A
$$

なら

$$
R_N
=
A\setminus\bigcup_{n=1}^N A_n
\downarrow\varnothing.
$$

よって $P_0(R_N)\to0$ であり、有限加法性から

$$
P_0(A)
=
\sum_{n=1}^N P_0(A_n)+P_0(R_N)
$$

なので $N\to\infty$ として

$$
P_0(A)=\sum_{n=1}^{\infty}P_0(A_n).
$$

#### 2. 外測度を作り、元の集合代数を回収する

任意の $E\subset X$ に対し

$$
P^*(E)
=
\inf\left\{
\sum_{n=1}^{\infty}P_0(A_n):
E\subset\bigcup_nA_n,\ A_n\in\mathcal A
\right\}
$$

と定めます。1で $P_0$ が前測度であることを確認したので、[前測度から作る外測度](#lem-premeasure-outer)より $P^*$ は外測度です。

[外測度は前測度を拡張する](#lem-extension-agrees)から、任意の $A\in\mathcal A$ について

$$
P^*(A)=P_0(A).
$$

[集合代数の集合のCarathéodory可測性](#lem-algebra-caratheodory)から、各 $A\in\mathcal A$ は $P^*$-Carathéodory 可測です。

#### 3. 生成 σ 代数へ拡張する

$P^*$-Carathéodory 可測集合全体を $\mathcal M$ とすると、[D3 の Carathéodory 定理](../F0_00D3_外測度_Caratheodory可測性/index.md#thm-f0-00d3-caratheodory)より $\mathcal M$ は σ 代数です。2から

$$
\mathcal A\subset\mathcal M
$$

なので

$$
\sigma(\mathcal A)\subset\mathcal M.
$$

したがって

$$
P:=P^*|_{\sigma(\mathcal A)}
$$

は $\sigma(\mathcal A)$ 上の測度です。また $A\in\mathcal A$ では

$$
P(A)=P^*(A)=P_0(A),
$$

よって $P$ は $P_0$ の拡張です。

特に

$$
P(X)=P_0(X)=1
$$

なので $P$ は確率測度です。

#### 4. 一意性

$P_0(X)=1<\infty$ なので $P_0$ は σ有限です。したがって [Carathéodory 拡張定理](#thm-caratheodory-extension)の一意性部分を適用でき、$\sigma(\mathcal A)$ 上の拡張は一意です。

この問題では

$$
\boxed{
\text{有限加法性}
\to
\text{空集合への連続性}
\to
\text{前測度}
\to
\text{外測度}
\to
\text{Carathéodory可測性}
\to
\text{一意な確率測度}
}
$$

という本章の拡張機構全体を一度に再構成しました。
<!-- solution-end -->

---

## 18. 章末チェック

- 有限開区間被覆の長さ総和が $b-a$ 以上になることを証明できる。
- $\lambda^*([a,b])=b-a$ をコンパクト性から証明できる。
- 半直線・開区間が Carathéodory 可測であることを証明できる。
- 実数上の開集合が高々可算個の互いに素な開区間へ分解されることを証明できる。
- Borel σ代数と Lebesgue σ代数、完備化を区別できる。
- 有限加法的な有限集合関数について、空集合への連続性から前測度性を導く Hopf 型判定を証明できる。
-前測度から被覆 infimum で外測度を作れる。
- $\mu^*=\mu_0$ on $\mathcal A$ を証明できる。
- $\mathcal A$ の集合が Carathéodory 可測であることを証明できる。
- Carathéodory 拡張定理が Hopf / Hahn--Kolmogorov 型の拡張定理としても現れることを把握し、存在を証明できる。
- 有限測度での一意性を π–λ 定理で、σ有限版を局所化で証明できる。
- 積測度の存在・一意性を拡張定理の系として説明できる。

**次：F0-00D5 Vitali集合・非可測集合・選択公理**
