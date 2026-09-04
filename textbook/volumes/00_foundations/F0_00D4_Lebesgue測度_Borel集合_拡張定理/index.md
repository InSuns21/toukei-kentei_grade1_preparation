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

---

# Part I：Lebesgue測度を完成する

## 1. 区間の外測度は長さに一致する

<a id="thm-f0-00d4-interval-length"></a>

<!-- formal-statement-start -->
### 定理

任意の $a<b$ について

$$
\boxed{\lambda^*([a,b])=b-a}.
$$
<!-- formal-statement-end -->

### 1.1 上からの評価

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

### 1.2 有限区間被覆の補題

<a id="lem-finite-interval-cover"></a>

<!-- formal-statement-start -->
### 補題

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

と並べます。各小区間 $(t_{r-1},t_r)$ は元の有限被覆の少なくとも一つの区間に完全に含まれます。なぜなら、その内部の一点を覆う区間は端点集合の間では出入りできないからです。

従って、各元区間 $I_j$ の長さを端点分割された小区間の長さの和として数えると、$[a,b]$ を構成する全ての小区間が少なくとも一回は数えられます。よって

$$
\sum_{j=1}^m|I_j|
\ge
\sum_{r=1}^N(t_r-t_{r-1})
=b-a.
$$

$\square$
<!-- proof-end -->

### 1.3 下からの評価

$[a,b]$ の任意の可算開区間被覆 $(I_n)$ を取ります。$[a,b]$ は compact なので有限部分被覆

$$
I_{n_1},\dots,I_{n_m}
$$

が存在します。補題から

$$
\sum_{k=1}^m|I_{n_k}|\ge b-a.
$$

従って元の可算被覆についても

$$
\sum_{n=1}^\infty|I_n|\ge b-a.
$$

全被覆について infimum を取って

$$
\lambda^*([a,b])\ge b-a.
$$

上からの評価と合わせて定理が従います。$\square$

> F0-00C の compact 性が、ここで「可算被覆から有限被覆を抜く」ために実際に働いています。

---

## 2. 平行移動不変性

<!-- formal-statement-start -->
### 命題

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

## 3. 半直線と開区間は Carathéodory 可測

<a id="lem-halfline-measurable"></a>

<!-- formal-statement-start -->
### 補題

任意の $c\in\mathbb R$ について半直線 $(-\infty,c]$ は Lebesgue 外測度 $\lambda^*$ に関して Carathéodory 可測である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$H=(-\infty,c]$ とし、任意の $T\subset\mathbb R$ を取ります。劣加法性から

$$
\lambda^*(T)
\le
\lambda^*(T\cap H)+\lambda^*(T\setminus H)
$$

は自動なので逆向きを示します。

$\lambda^*(T)<\infty$ とし、任意の $\varepsilon>0$ に対して

$$
T\subset\bigcup_n I_n,
\qquad
\sum_n|I_n|<\lambda^*(T)+\varepsilon
$$

となる開区間被覆を取ります。各 $I_n$ を $c$ の左側・右側で切ります。切った断片は半開区間になる場合がありますが、それぞれを総追加長が $\varepsilon2^{-n}$ 以下となる開区間で少しだけ膨らませられます。

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

$\lambda^*(T)=\infty$ の場合は

$$
\infty\le
\lambda^*(T\cap H)+\lambda^*(T\setminus H)
$$

を示す必要がありますが、もし右辺が有限なら上の被覆を両部分について合わせることで $T$ の有限長被覆が作れて矛盾します。従って等号はこの場合にも成立します。$\square$
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

<a id="thm-open-interval-measurable"></a>

<!-- formal-statement-start -->
### 系

全ての開区間・閉区間・半開区間は Lebesgue 可測である。
<!-- formal-statement-end -->

---

## 4. 開集合は高々可算個の互いに素な開区間の和

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

と定めます。これは同値関係です。

$x$ の同値類 $C_x$ は区間です。さらに $G$ は開なので各 $z\in C_x$ の周りに $G$ に含まれる小開区間があり、その点は同じ同値類に入ります。従って $C_x$ 自身が開集合であり、したがって開区間（非有界区間も許す）です。

異なる同値類は互いに素で、その和は $G$ 全体です。

最後に各非空開区間 $C_x$ から有理数を一つ選びます。互いに素な異なる区間には異なる有理数が対応します。$\mathbb Q$ は可算なので同値類の個数も高々可算です。$\square$
<!-- proof-end -->

各開区間は可測で、Carathéodory 可測集合族はσ代数なので

$$
\boxed{G\text{ は Lebesgue 可測}}.
$$

---

## 5. Borel σ代数

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

開集合が全て Lebesgue 可測で、Lebesgue 可測集合族 $\mathcal L$ はσ代数なので

$$
\boxed{
\mathcal B(\mathbb R)\subset\mathcal L
}.
$$

### 例1：有理数集合

一点集合は閉集合なので Borel 集合。従って

$$
\mathbb Q=\bigcup_{q\in\mathbb Q}\{q\}
$$

も Borel 集合です。また一点集合の測度は0なので

$$
\lambda(\mathbb Q)=0.
$$

---

## 6. Borel と Lebesgue 可測は同じではない

<a id="def-measure-completion"></a>

<!-- formal-statement-start -->
### 定義（測度空間の完備化）

測度空間 $(X,\mathcal F,\mu)$ に、$\mu(N)=0$ となる $N\in\mathcal F$ の全ての部分集合を可測集合として追加し、測度0と定めて得る最小の完全な拡張を **完備化** という。
<!-- formal-statement-end -->

Lebesgue 測度は Borel 測度の完備化です。そのため

$$
\mathcal B(\mathbb R)\subsetneq\mathcal L.
$$

厳密な包含も確認できます。Cantor 集合 $C$ は Borel 集合で測度0、濃度は連続体濃度 $\mathfrak c$ です。従って部分集合族 $2^C$ の濃度は $2^{\mathfrak c}$。一方、Borel 集合全体の濃度は $\mathfrak c$ です。よって $C$ の部分集合の中には Borel でないものが存在します。しかし $C$ は零測度なので、そのような部分集合も Lebesgue 測度の完全性により Lebesgue 可測です。

---

## 7. 区間の種類によらず長さは同じ

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

## 8. algebra と premeasure

<a id="def-set-algebra"></a>

<!-- formal-statement-start -->
### 定義（集合のalgebra）

$\mathcal A\subset2^X$ が

1. $X\in\mathcal A$
2. $A\in\mathcal A\Rightarrow A^c\in\mathcal A$
3. $A,B\in\mathcal A\Rightarrow A\cup B\in\mathcal A$

を満たすとき $X$ 上の **algebra** という。
<!-- formal-statement-end -->

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

### 例2：半開区間の長さ

$\mathbb R$ 上で半開区間 $[a,b)$ の有限互いに素和からなる algebra を考え

$$
\mu_0([a,b))=b-a
$$

と定めます。有限和には加法的に延長します。これが Lebesgue 測度を作る元の premeasure です。

---

## 9. premeasure から外測度を作る

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

<a id="lem-premasure-outer"></a>

<!-- formal-statement-start -->
### 補題

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

## 10. 元の algebra 上では値が変わらない

<a id="lem-extension-agrees"></a>

<!-- formal-statement-start -->
### 補題

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

## 11. algebra の集合は Carathéodory 可測

<a id="lem-algebra-caratheodory"></a>

<!-- formal-statement-start -->
### 補題

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

また $\mu^*|_{\mathcal M}$ は測度です。

---

## 12. Carathéodory 拡張定理：存在

<a id="thm-caratheodory-extension"></a>

<!-- formal-statement-start -->
### 定理（Carathéodory拡張定理）

集合 $X$ 上の algebra $\mathcal A$ と、その上の premeasure $\mu_0$ に対して、$\mu_0$ と $\mathcal A$ 上で一致する測度 $\mu$ が生成σ代数 $\sigma(\mathcal A)$ 上に存在する。

さらに $\mu_0$ がσ有限なら、この拡張は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 存在の証明

9節の被覆 infimum で $\mu^*$ を構成すると外測度になる。

11節により $\mathcal A$ の全ての集合は $\mu^*$-Carathéodory 可測。従って

$$
\sigma(\mathcal A)\subset\mathcal M.
$$

D3 の Carathéodory 定理から

$$
\mu:=\mu^*|_{\sigma(\mathcal A)}
$$

は測度です。10節から $A\in\mathcal A$ では

$$
\mu(A)=\mu^*(A)=\mu_0(A).
$$

従って $\mu$ は $\mu_0$ の拡張です。$\square$
<!-- proof-end -->

> $\mu^*$ を Carathéodory 可測集合全体 $\mathcal M$ に制限すれば完全測度が得られます。$\sigma(\mathcal A)$ だけへ制限した拡張は一般には完全とは限りません。この二つを混同しないことが重要です。

---

## 13. σ有限性と一意性

<a id="def-sigma-finite"></a>

<!-- formal-statement-start -->
### 定義（σ有限 premeasure）

premeasure $\mu_0$ が **σ有限** であるとは、$A_n\in\mathcal A$ が存在して

$$
X=\bigcup_{n=1}^\infty A_n,
\qquad
\mu_0(A_n)<\infty
$$

となることをいう。
<!-- formal-statement-end -->

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

π–λ 定理から

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

## 14. 積測度は拡張定理の直接の応用

D2C の積測度をここで回収します。

$\mathcal A\times\mathcal B$ の可測長方形上で

$$
\pi(A\times B):=\mu(A)\nu(B)
$$

と置き、有限互いに素和へ加法的に延長すると premeasure が得られます。D2C ではこの premeasure 性を一変数 MCT だけで確認しました。

Carathéodory 拡張定理から

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

## 15. 確率論との接続

確率測度は有限測度なのでσ有限です。そのため、簡単な事象の algebra 上で整合的に確率を定め、生成σ代数へ拡張するとき一意性が得やすいという利点があります。

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

# 16. 演習

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

区間端点と0,1を全て並べて有限分割する。各隣接小区間は少なくとも一つの被覆区間に含まれるので、元区間の長さ総和は全小区間長の総和1以上。
<!-- solution-end -->

## F0-00D4-A02 Borel集合と測度0

- Level: A
- 目安時間: 10分

$A=\mathbb Q\cap[0,1]$ が Borel 集合であることを示し、$\lambda(A)$ を求めよ。

<!-- solution-start -->
### 詳細解答

一点集合は閉集合なので Borel。有理数は可算だから $A$ は一点集合の可算和で Borel。各一点の測度は0なので $\lambda(A)=0$。
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

Lebesgue 外測度では「区間の長さ」をコストとして外側から覆った。一般の拡張では区間を algebra の集合 $A_n$、長さを premeasure $\mu_0(A_n)$ に置き換えた同じ構成である。
<!-- solution-end -->

## F0-00D4-B01 元の値を保つこと

- Level: B
- 目安時間: 20分

$A\in\mathcal A$ について $\mu^*(A)=\mu_0(A)$ を証明せよ。

<!-- solution-start -->
### 詳細解答

$A$ 自身で覆えば $\mu^*(A)\le\mu_0(A)$。任意の被覆 $A\subset\bigcup_nA_n$ を $A$ 内で disjoint 化して $B_n\subset A_n$、$A=\bigsqcup B_n$ とすれば

$$
\mu_0(A)=\sum_n\mu_0(B_n)\le\sum_n\mu_0(A_n).
$$

infimum を取り逆向きを得る。
<!-- solution-end -->

## F0-00D4-B02 algebra集合のCarathéodory可測性

- Level: B
- 目安時間: 20分

$A\in\mathcal A$ が $\mu^*$-Carathéodory 可測であることを証明せよ。

<!-- solution-start -->
### 詳細解答

任意の $E$ の $\mathcal A$-被覆 $A_n$ を $A_n\cap A$ と $A_n\setminus A$ に分ける。premeasure の有限加法性によりコストは保存され、前者は $E\cap A$、後者は $E\setminus A$ を覆う。従って

$$
\mu^*(E\cap A)+\mu^*(E\setminus A)\le\mu^*(E).
$$

逆向きは外測度の劣加法性。
<!-- solution-end -->

## F0-00D4-B03 拡張の一意性

- Level: B
- 目安時間: 25分

$\mu_0(X)<\infty$ とし、$\mu,\nu$ を $\sigma(\mathcal A)$ 上の二つの拡張とする。

$$
\mathcal D=\{E:\mu(E)=\nu(E)\}
$$

が Dynkin 族であることを示し、π–λ 定理から一意性を証明せよ。

<!-- solution-start -->
### 詳細解答

全空間の測度が共通かつ有限なので補集合で等しさを保つ。互いに素な可算和では可算加法性で保つ。従って $\mathcal D$ は Dynkin 族。$\mathcal A$ は π-system で $\mathcal A\subset\mathcal D$ だから

$$
\sigma(\mathcal A)\subset\mathcal D.
$$
<!-- solution-end -->

## F0-00D4-B04 積測度への適用

- Level: B
- 目安時間: 20分

σ有限な $\mu,\nu$ について、長方形上の

$$
\pi(A\times B)=\mu(A)\nu(B)
$$

から積測度が一意に存在する論理を説明せよ。

<!-- solution-start -->
### 詳細解答

長方形の有限互いに素和の algebra へ $\pi$ を延長する。D2C の一変数 MCT の議論で premeasure 性を確認する。Carathéodory 拡張定理で $\mathcal A\otimes\mathcal B$ 上へ拡張し、σ有限性により一意性を得る。
<!-- solution-end -->

---

## 17. 章末チェック

- $\lambda^*([a,b])=b-a$ を compact 性と有限区間被覆補題から証明できる。
- 半直線・開区間が Carathéodory 可測であることを証明できる。
- 実数上の開集合が高々可算個の互いに素な開区間へ分解されることを証明できる。
- Borel σ代数と Lebesgue σ代数、完備化を区別できる。
- premeasure から被覆 infimum で外測度を作れる。
- $\mu^*=\mu_0$ on $\mathcal A$ を証明できる。
- $\mathcal A$ の集合が Carathéodory 可測であることを証明できる。
- Carathéodory 拡張定理の存在を証明できる。
- 有限測度での一意性を π–λ 定理で、σ有限版を局所化で証明できる。
- 積測度の存在・一意性を拡張定理の系として説明できる。

**次：F0-00D5 Vitali集合・非可測集合・選択公理**
