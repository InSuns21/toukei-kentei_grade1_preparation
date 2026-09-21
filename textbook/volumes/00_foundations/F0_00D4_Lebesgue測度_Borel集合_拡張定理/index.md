# F0-00D4 補講：Lebesgue測度・Borel集合・Carathéodory拡張定理

D3では、任意の外測度 $\mu^*$ から Carathéodory 可測集合を選ぶと完全測度が得られることを証明しました。

この章では二つの仕事をします。

1. 実数直線上で区間の長さから Lebesgue 測度を完成させる。
2. 同じ構成を一般化し、premeasure から測度を作る Carathéodory 拡張定理を証明する。

中心線は

```text
区間の長さ
 ↓
Lebesgue外測度
 ↓
区間・開集合・Borel集合が可測
 ↓
Lebesgue測度

algebra上のpremeasure
 ↓
被覆infimumで外測度
 ↓
Carathéodory可測性
 ↓
σ(algebra)上の測度
 ↓ σ有限なら一意
```

です。

### 名称について：Hopf の拡張定理はどこにいるか

測度の拡張定理には文献ごとの名称差があります。algebra や ring 上の集合関数を生成 σ 代数上の測度へ延長する結果は、**Carathéodory の拡張定理**、**Hopf の拡張定理**、**Hahn--Kolmogorov の拡張定理**などの名前で現れます。出発点を「premeasure」とするか、「有限加法性と連続性」から始めるかでも定理の見た目が変わります。

本章では混同を避けるため、

- 有限加法性と空集合への連続性から premeasure 性を得る部分を **Hopf 型の premeasure 判定**、
- premeasure から外測度を作り、生成 σ 代数へ測度を延長する部分を **Carathéodory 拡張定理（Hopf / Hahn--Kolmogorov 型）**

と呼び分けます。

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

$[a,b]$ の任意の可算開区間被覆 $(I_n)$ を取ります。$[a,b]$ は compact なので有限部分被覆

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

> F0-00C の compact 性が、ここで「可算被覆から有限被覆を抜く」ために実際に働いています。

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
\sum_n|I_n|<\lambda^*(T)+\varepsilon
$$

となる開区間被覆を取ります。各 $I_n$ を点 $c$ の左側と右側に切ります。切った断片が半開区間になった場合は、それぞれを総追加長が $\varepsilon2^{-n}$ 以下となる開区間で少しだけ膨らませます。

すると $T\cap H$ と $T\setminus H$ の開区間被覆が得られ、その二つの総延長の和は

$$
\sum_n|I_n|+\varepsilon
$$

以下です。従って

$$
\lambda^*(T\cap H)+\lambda^*(T\setminus H)
\le
\lambda^*(T)+2\varepsilon.
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

$x,y\in G$ に対して

$$
x\sim y
\iff
[\min(x,y),\max(x,y)]\subset G
$$

と定めます。反射律・対称律は明らかで、推移律も二つの線分区間の和が同じ開集合 $G$ に含まれることから従うので、これは同値関係です。

$x$ の同値類 $C_x$ は区間です。さらに $G$ は開なので各 $z\in C_x$ の周りに $G$ に含まれる小開区間があり、その点は全て同じ同値類に入ります。従って $C_x$ 自身が開集合であり、したがって開区間です。端が無限大の区間も許します。

異なる同値類は互いに素で、その和は $G$ 全体です。

最後に各非空開区間 $C_x$ から有理数を一つ選びます。互いに素な異なる区間には異なる有理数が対応します。$\mathbb Q$ は可算なので同値類の個数も高々可算です。

同値類は「$G$ の中で区間を通って到達できる点全体」として一意に決まるため、分解も一意です。$\square$
<!-- proof-end -->

各開区間は可測で、Carathéodory 可測集合族はσ代数なので、全ての開集合 $G$ は Lebesgue 可測です。

---

## 6. Borel σ代数

<a id="def-borel-sigma-algebra"></a>

<!-- formal-statement-start -->
### 定義（Borel σ代数）

$$
\boxed{
\mathcal B(\mathbb R)
:=
\sigma(\{G\subset\mathbb R:G\text{ は開集合}\})
}
$$

を **Borel σ代数** という。
<!-- formal-statement-end -->

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

## 9. algebra と premeasure

<a id="def-set-algebra"></a>

<!-- formal-statement-start -->
### 定義（集合のalgebra）

$\mathcal A\subset2^X$ が

1. $X\in\mathcal A$
2. $A\in\mathcal A\Rightarrow A^c\in\mathcal A$
3. $A,B\in\mathcal A\Rightarrow A\cup B\in\mathcal A$

を満たすとき $X$ 上の **algebra** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set-algebra -->
### 9.1 例：一つの集合から作る4集合のalgebra

**定義の確認**

固定した $A\subset X$ に対して

$$
\mathcal A=\{\varnothing,A,A^c,X\}
$$

とします。まず $X\in\mathcal A$。補集合は $\varnothing\leftrightarrow X$、$A\leftrightarrow A^c$ と同じ4集合内に残ります。二集合の和も、$A\cup A^c=X$ を含め必ずこの4集合のどれかです。従って定義の3条件を全て満たします。
<!-- definition-example-end -->

algebra は有限集合演算で閉じますが、可算和で閉じるとは限りません。

<a id="def-premeasure"></a>

<!-- formal-statement-start -->
### 定義（premeasure）

$\mu_0:\mathcal A\to[0,\infty]$ が **premeasure** であるとは、互いに素な $A_n\in\mathcal A$ について、もし

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

$\mathbb R$ 上で半開区間 $[a,b)$ の有限互いに素和からなる algebra を考え

$$
\mu_0([a,b))=b-a
$$

と定め、有限互いに素和には加法的に延長します。互いに素な $A_n$ の可算和が再びこの algebra に属する場合、その和は有限個の半開区間へ整理でき、各区間の長さは互いに素な部分区間の長さの和になります。従って

$$
\mu_0\left(\bigsqcup_n A_n\right)=\sum_n\mu_0(A_n),
$$

となり premeasure の可算加法条件を満たします。これが Lebesgue 測度を作る元の premeasure です。
<!-- definition-example-end -->

---

## 9.5 有限加法性から premeasure へ：Hopf 型の判定

実際の構成では、最初から可算加法性を直接確認するより、まず有限加法性を示し、減少列に対する連続性を確認する方が容易なことがあります。確率測度の候補では全空間の質量が $1$ なので、特にこの形が使いやすくなります。

<a id="lem-f0-00d4-hopf-premeasure"></a>

<!-- formal-statement-start -->
### 補題（Hopf型のpremeasure判定）

$X$ 上の algebra $\mathcal A$ と写像

$$
\mu_0:\mathcal A\to[0,\infty)
$$

を考える。$\mu_0(\varnothing)=0$、$\mu_0(X)<\infty$ とし、互いに素な $A,B\in\mathcal A$ に対して

$$
\mu_0(A\cup B)=\mu_0(A)+\mu_0(B)
$$

が成り立つ、すなわち $\mu_0$ は有限加法的であるとする。

このとき次は同値である。

1. $\mu_0$ は $\mathcal A$ 上の premeasure である。
2. 任意の減少列 $E_1\supset E_2\supset\cdots$、$E_n\in\mathcal A$ で $\bigcap_nE_n=\varnothing$ となるものについて

$$
\mu_0(E_n)\downarrow0
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

premeasure から空集合への連続性を出す向きでは、減少列を互いに素な「層」

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

まず $\mu_0$ が premeasure であるとします。

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

premeasure 性から

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

と置きます。algebra は有限和と差で閉じるので $R_N\in\mathcal A$ です。また

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

したがって $\mu_0$ は premeasure です。$\square$
<!-- proof-end -->

この補題は、**「有限加法性は分かるが、可算加法性を直接扱いにくい」**場面を premeasure へ渡す橋です。とくに全質量 $1$ の確率候補では $\mu_0(X)<\infty$ が自動なので、空集合へ減少する列だけを制御すればよくなります。

---

## 10. premeasure から外測度を作る

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
### 補題（premeasureから作る外測度）

上で定めた $\mu^*$ は外測度である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varnothing$ は $\varnothing\in\mathcal A$ 一つで覆え、premeasure から $\mu_0(\varnothing)=0$ なので $\mu^*(\varnothing)=0$。

$E\subset F$ なら $F$ の任意の $\mathcal A$-被覆は $E$ も覆うので単調性が従います。

可算劣加法性は D3 の Lebesgue 外測度と同じ $\varepsilon/2^n$ 議論です。各 $E_n$ に対し総コストが $\mu^*(E_n)+\varepsilon2^{-n}$ 未満の被覆を取り、全被覆を合わせれば $\bigcup_nE_n$ を覆うので

$$
\mu^*\left(\bigcup_nE_n\right)
\le
\sum_n\mu^*(E_n)+\varepsilon.
$$

$\varepsilon\downarrow0$ とすればよい。$\square$
<!-- proof-end -->

---

## 11. 元の algebra 上では値が変わらない

<a id="lem-extension-agrees"></a>

<!-- formal-statement-start -->
### 補題（外測度はpremeasureを拡張する）

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

和集合 $A$ 自身が $\mathcal A$ に入るので premeasure の可算加法性を使えます。従って

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

## 12. algebra の集合は Carathéodory 可測

<a id="lem-algebra-caratheodory"></a>

<!-- formal-statement-start -->
### 補題（algebra集合のCarathéodory可測性）

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

も $\mathcal A$ に属し、互いに素な二分割です。premeasure の有限加法性から

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

premeasure $\mu_0$ が **σ有限** であるとは、可算個の $A_n\in\mathcal A$ が存在して

$$
X=\bigcup_{n=1}^{\infty}A_n,
\qquad
\mu_0(A_n)<\infty
$$

となることをいいます。つまり **全空間を可算個の有限premeasure集合で覆える** という条件です。

具体例と一意性証明はSection 14で改めて確認します。

---

## 13. Carathéodory 拡張定理（Hopf / Hahn--Kolmogorov 型）：存在

<a id="thm-caratheodory-extension"></a>

<!-- formal-statement-start -->
### 定理（Carathéodory拡張定理；Hopf / Hahn--Kolmogorov 型）

集合 $X$ 上の algebra $\mathcal A$ と、その上の premeasure $\mu_0$ に対して、$\mu_0$ と $\mathcal A$ 上で一致する測度 $\mu$ が生成σ代数 $\sigma(\mathcal A)$ 上に存在する。

さらに $\mu_0$ がσ有限なら、この拡張は一意である。
<!-- formal-statement-end -->

この定理の存在部分で必要なのは、premeasure から作った外測度が

1. 元の algebra 上で値を保ち、
2. algebra の各集合を Carathéodory 可測にし、
3. したがって生成 σ 代数全体を Carathéodory 可測集合族へ入れる

という三段階です。有限加法的な有限集合関数から出発する場合は、先に [Hopf 型の premeasure 判定](#lem-f0-00d4-hopf-premeasure)で premeasure 性を確認してからこの定理へ渡せます。

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
### 定義（σ有限premeasure）

premeasure $\mu_0$ が **σ有限** であるとは、$A_n\in\mathcal A$ が存在して

$$
X=\bigcup_{n=1}^\infty A_n,
\qquad
\mu_0(A_n)<\infty
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sigma-finite -->
### 14.1 例：区間長premeasureはσ有限

**定義の確認**

半開区間の有限互いに素和からなる algebra 上の長さ premeasure を考えます。

$$
A_n=[-n,n)
$$

と置けば $A_n\in\mathcal A$、

$$
\mathbb R=\bigcup_{n=1}^\infty A_n,
\qquad
\mu_0(A_n)=2n<\infty.
$$

従って定義の「全空間を可算個の有限premeasure集合で覆う」という条件を満たし、この premeasure はσ有限です。
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

$\mathcal A$ は有限共通部分で閉じる π-system で、拡張は $\mathcal A$ 上でともに $\mu_0$ と一致するので

$$
\mathcal A\subset\mathcal D.
$$

[π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から

$$
\sigma(\mathcal A)\subset\mathcal D.
$$

よって有限測度の場合は一意です。

一般のσ有限の場合、$X$ を有限 premeasure の algebra 集合で覆う列から差を取って、互いに素な $B_n\in\mathcal A$ で

$$
X=\bigsqcup_nB_n,
\qquad
\mu_0(B_n)<\infty
$$

となるようにできます。

各 $B_n$ 上に制限すると有限測度の場合の一意性から、任意の $E\in\sigma(\mathcal A)$ について

$$
\mu(E\cap B_n)=\nu(E\cap B_n).
$$

可算加法性により

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

と置き、有限互いに素和へ加法的に延長します。これが premeasure になることの確認は、後の D2C で行います。本節ではその確認を前提にし、**premeasure が得られた後の拡張機構**だけを回収します。

[Carathéodory 拡張定理](#thm-caratheodory-extension)から

$$
\sigma\{A\times B:A\in\mathcal A,B\in\mathcal B\}
=
\mathcal A\otimes\mathcal B
$$

上に拡張測度が存在します。$\mu,\nu$ がσ有限なら長方形 premeasure もσ有限なので一意です。

従って

$$
\boxed{
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
}
$$

を満たす積測度の存在・一意性が、ここで依存先まで含めて証明されました。

---

## 16. 確率論との接続

確率測度は有限測度なのでσ有限です。そのため、簡単な事象の algebra 上で整合的に確率を定め、生成σ代数へ拡張するとき一意性が得やすいという利点があります。

さらに、algebra 上でまず有限加法的な確率候補 $P_0$ を作った場合、

$$
A_n\downarrow\varnothing
\quad\Longrightarrow\quad
P_0(A_n)\downarrow0
$$

を示せば、[Hopf 型の premeasure 判定](#lem-f0-00d4-hopf-premeasure)によって $P_0$ は premeasure になります。後の STO3 では、有限個の座標だけを見る事象に定めた確率を、より大きな σ 代数へ延長するとき、この「有限加法性 → 空集合への連続性 → premeasure → 測度拡張」という流れがそのまま現れます。

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

## F0-00D4-A03 premeasureと外測度

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

の infimum を取った。一般の拡張では「開区間」を algebra の集合 $A_n$ に、「区間長」を premeasure $\mu_0(A_n)$ に置き換える。従って同じ外側近似の構造

$$
\text{covering objects} + \text{cost} + \inf
$$

を抽象化した式である。

<!-- solution-end -->


## F0-00D4-A04 tail を消して可算加法性へ進む

- Level: A
- 目安時間: 12分

$\mathcal A$ を $X$ 上の algebra、$\mu_0:\mathcal A\to[0,\infty)$ を有限加法的な集合関数とする。互いに素な $A_n\in\mathcal A$ について

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

これが Hopf 型判定の「有限加法性と空集合への連続性から premeasure 性を得る」向きの核心です。
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

## F0-00D4-B02 algebra集合のCarathéodory可測性

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

$(X,\mathcal A,\mu)$、$(Y,\mathcal B,\nu)$ を σ有限測度空間とする。可測長方形の有限互いに素和からなる algebra $\mathcal R$ 上に、長方形では

$$
\pi(A\times B)=\mu(A)\nu(B)
$$

を満たす **σ有限な premeasure $\pi$ が構成済みである**と仮定する。

この仮定から、積 σ 代数 $\mathcal A\otimes\mathcal B$ 上に

$$
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
$$

を満たす測度が一意に存在することを、拡張定理の仮定確認を含めて説明せよ。

<!-- solution-start -->
### 詳細解答

まず $\mathcal R$ は可測長方形の有限互いに素和からなる algebra であり、問題文の仮定により

$$
\pi:\mathcal R\to[0,\infty]
$$

は premeasure です。したがって [Carathéodory 拡張定理](#thm-caratheodory-extension)の存在部分を適用でき、

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

従って得られた測度を $\mu\times\nu$ と書けば、元の algebra 上では $\pi$ と一致するため、特に長方形について

$$
(\mu\times\nu)(A\times B)
=
\pi(A\times B)
=
\mu(A)\nu(B).
$$

さらに問題文で $\pi$ は σ有限と仮定されています。よって拡張定理の一意性部分を適用でき、$\mathcal A\otimes\mathcal B$ 上でこの条件を満たす拡張は一意です。

ここでは rectangle set function が premeasure であること自体は仮定しました。その確認は積測度を本格的に扱う D2C で行い、本問では **premeasure から積測度へ進む拡張部分**だけを切り出しています。
<!-- solution-end -->

## F0-00D4-C01 Hopf 型判定から一意な測度拡張まで

- Level: C
- 目安時間: 35分

$X$ 上の algebra $\mathcal A$ と有限加法的な集合関数

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

1. $P_0$ は premeasure である。
2. 被覆 infimum から外測度 $P^*$ を作ると、$P^*=P_0$ on $\mathcal A$ であり、$\mathcal A$ の各集合は $P^*$-Carathéodory 可測である。
3. $P_0$ は $\sigma(\mathcal A)$ 上の確率測度 $P$ へ拡張される。
4. この拡張は一意である。

<!-- solution-start -->
### 詳細解答

#### 1. Hopf 型判定で premeasure 性を得る

$P_0(X)=1<\infty$ であり、問題文で有限加法性と空集合への連続性が与えられています。したがって [Hopf 型の premeasure 判定](#lem-f0-00d4-hopf-premeasure)を適用でき、

$$
P_0
$$

は $\mathcal A$ 上の premeasure です。

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

#### 2. 外測度を作り、元の algebra を回収する

任意の $E\subset X$ に対し

$$
P^*(E)
=
\inf\left\{
\sum_{n=1}^{\infty}P_0(A_n):
E\subset\bigcup_nA_n,\ A_n\in\mathcal A
\right\}
$$

と定めます。1で $P_0$ が premeasure であることを確認したので、10節の補題から $P^*$ は外測度です。

さらに11節の結果から、任意の $A\in\mathcal A$ について

$$
P^*(A)=P_0(A).
$$

12節の結果から、各 $A\in\mathcal A$ は $P^*$-Carathéodory 可測です。

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
\text{premeasure}
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
- $\lambda^*([a,b])=b-a$ を compact 性から証明できる。
- 半直線・開区間が Carathéodory 可測であることを証明できる。
- 実数上の開集合が高々可算個の互いに素な開区間へ分解されることを証明できる。
- Borel σ代数と Lebesgue σ代数、完備化を区別できる。
- 有限加法的な有限集合関数について、空集合への連続性から premeasure 性を導く Hopf 型判定を証明できる。
- premeasure から被覆 infimum で外測度を作れる。
- $\mu^*=\mu_0$ on $\mathcal A$ を証明できる。
- $\mathcal A$ の集合が Carathéodory 可測であることを証明できる。
- Carathéodory 拡張定理が Hopf / Hahn--Kolmogorov 型の拡張定理としても現れることを把握し、存在を証明できる。
- 有限測度での一意性を π–λ 定理で、σ有限版を局所化で証明できる。
- 積測度の存在・一意性を拡張定理の系として説明できる。

**次：F0-00D5 Vitali集合・非可測集合・選択公理**
