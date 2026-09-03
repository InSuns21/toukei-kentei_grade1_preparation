# F0-00D3 補講：外測度・Carathéodory可測性

F0-00D2ではLebesgue測度を

> 区間の長さを一般の可測集合へ拡張した測度

として使いました。

この章では、その「拡張したもの」がどこから来るのかを作ります。

最終目標は

$$
\boxed{
\text{区間の長さ}
\to
\text{外測度}
\to
\text{可測集合の選別}
\to
\text{測度}
}
$$

です。

ここから先は、確率・統計に必要な測度論のさらに下にある基礎工事です。

---

## 1. なぜ最初から全ての集合へ長さを定義しないのか

区間については

$$
\ell((a,b))=b-a
$$

と長さを定められます。

有限個の互いに素な区間の和なら、その長さを足せばよいでしょう。

しかし任意の集合

$$
A\subset\mathbb R
$$

について

- 平行移動しても長さが変わらない
- 可算個の互いに素な集合の長さは足し算できる
- 区間の長さは通常の長さと一致する

を同時に満たす「長さ」を全ての部分集合へ定義することはできません。

この障害はD5のVitali集合で具体化します。

したがって戦略は逆です。

> まず全ての集合に対して外側から大きさを与え、その中から加法性が正しく働く集合だけを可測集合として選ぶ。

これがCarathéodoryの考え方です。

---

## 2. 区間で集合を外から覆う

$A\subset\mathbb R$ を任意の集合とします。

$A$ を可算個の開区間

$$
I_1,I_2,\dots
$$

で覆う、つまり

$$
A\subset\bigcup_{n=1}^{\infty} I_n
$$

とします。

この被覆の総延長は

$$
\sum_{n=1}^{\infty}|I_n|
$$

です。

もちろん覆い方によって総延長は変わります。

そこで、可能な被覆の中で最も小さい総延長を考えます。

---

## 3. Lebesgue外測度

<a id="def-f0-00d3-lebesgue-outer-measure"></a>

<!-- formal-statement-start -->
> **定義（Lebesgue外測度）**  
> $A\subset\mathbb R$ に対して

$$
\lambda^*(A)
=
\inf\left\{
\sum_{n=1}^{\infty}|I_n|:
A\subset\bigcup_{n=1}^{\infty}I_n,
\ I_n\text{ は開区間}
\right\}
$$

> と定めた量を **Lebesgue外測度** といいます。
<!-- formal-statement-end -->

ここで重要なのは、$A$ 自体には可測性を仮定していないことです。

$$
\lambda^*(A)
$$

は **すべての部分集合** $A\subset\mathbb R$ に対して定義されます。

---

## 4. なぜinfimumなのか

ある被覆の総延長が1.01だからといって、集合の長さが1.01とは限りません。

もっと効率のよい被覆があるかもしれません。

そこで

$$
\inf
$$

を取ります。

これはF0-00Aで扱った「最小値が存在しなくても下限は考えられる」という発想そのものです。

測度論でもinfimumが本気で働きます。

---

## 5. 外測度の三条件

<a id="def-f0-00d3-outer-measure"></a>

<!-- formal-statement-start -->
> **定義（外測度）**  
> 集合 $X$ の全ての部分集合上の関数 $\mu^*:2^X\to[0,\infty]$ が、
> 1. $\mu^*(\varnothing)=0$、
> 2. $A\subset B\Rightarrow\mu^*(A)\le\mu^*(B)$、
> 3. 任意の $A_1,A_2,\dots\subset X$ に対して

$$
\mu^*\left(\bigcup_{n=1}^{\infty}A_n\right)
\le
\sum_{n=1}^{\infty}\mu^*(A_n)
$$

> を満たすとき、$\mu^*$ を **外測度** といいます。
<!-- formal-statement-end -->

上の3条件を順に空集合・単調性・可算劣加法性と呼びます。

注意してください。

ここでは **等号ではなく不等号** です。

まだ測度ではありません。

---

## 6. Lebesgue外測度が外測度であること

### 6.1 空集合

空集合は空の被覆で覆えるので

$$
\lambda^*(\varnothing)=0.
$$

### 6.2 単調性

$A\subset B$ なら、$B$ を覆う任意の区間族は $A$ も覆います。

従って、$A$ の被覆候補は $B$ より多く、

$$
\lambda^*(A)\le\lambda^*(B).
$$

### 6.3 可算劣加法性

任意の $\varepsilon>0$ を取ります。

各 $A_n$ について、外測度の定義から

$$
A_n\subset\bigcup_k I_{n,k}
$$

かつ

$$
\sum_k |I_{n,k}|
<
\lambda^*(A_n)+\frac{\varepsilon}{2^n}
$$

となる被覆を選べます。

すると

$$
\bigcup_n A_n
\subset
\bigcup_{n,k}I_{n,k}.
$$

よって

$$
\begin{aligned}
\lambda^*\left(\bigcup_nA_n\right)
&\le
\sum_{n,k}|I_{n,k}|\\
&<
\sum_n\lambda^*(A_n)+\varepsilon.
\end{aligned}
$$

$\varepsilon>0$ は任意なので

$$
\boxed{
\lambda^*\left(\bigcup_nA_n\right)
\le
\sum_n\lambda^*(A_n)
}.
$$

---

## 7. 外測度だけでは加法性が足りない

測度にしたいなら、互いに素な集合について

$$
\mu(A\cup B)=\mu(A)+\mu(B)
$$

が欲しいです。

しかし外測度は一般に

$$
\mu^*(A\cup B)
\le
\mu^*(A)+\mu^*(B)
$$

しか保証しません。

そこで

> どんな集合 $T$ を持ってきても、$E$ で切った部分と外側の部分に外測度がきれいに分解する

ような集合 $E$ を選びます。

---

## 8. Carathéodory可測性

外測度 $\mu^*$ に対して集合 $E\subset X$ が **Carathéodory可測** であるとは、任意の $T\subset X$ について

$$
\boxed{
\mu^*(T)
=
\mu^*(T\cap E)
+
\mu^*(T\setminus E)
}
$$

が成り立つことです。

この式は

> $E$ が外測度の世界を不自然に切り裂かない

ことを表します。

外測度の劣加法性から

$$
\mu^*(T)
\le
\mu^*(T\cap E)+\mu^*(T\setminus E)
$$

は自動的です。

従って可測性で本当に要求しているのは逆向き

$$
\mu^*(T)
\ge
\mu^*(T\cap E)+\mu^*(T\setminus E)
$$

です。

---

## 9. 可測集合全体

Carathéodory可測集合全体を

$$
\mathcal M
=
\{E\subset X:E\text{ はCarathéodory可測}\}
$$

と書きます。

大定理は次です。

$$
\boxed{
\mathcal M\text{ はsigma代数であり、}
\mu^*|_{\mathcal M}\text{ は完全な測度である}
}
$$

これがCarathéodoryの定理です。

つまり

> 全ての集合へ外測度を与える
> → 加法性を壊さない集合だけ選ぶ
> → そこでは本物の測度になる

という建設が可能です。

---

## 10. sigma代数になる理由：補集合

$E$ が可測なら

$$
T\cap E^c=T\setminus E,
\qquad
T\setminus E^c=T\cap E
$$

なので、Carathéodory条件は単に右辺の二項が入れ替わるだけです。

従って

$$
E\in\mathcal M
\Longrightarrow
E^c\in\mathcal M.
$$

---

## 11. 有限和で何が起こるか

$E,F$ が可測なら、$T$ を

$$
T\cap E,
\qquad
T\setminus E
$$

に分け、さらに後者を $F$ で分けることができます。

この分割を繰り返すと、互いに素な可測集合 $E_1,\dots,E_n$ に対して

$$
\mu^*\left(T\cap\bigcup_{k=1}^nE_k\right)
=
\sum_{k=1}^n\mu^*(T\cap E_k)
$$

という有限加法性が得られます。

---

## 12. 可算和へ進む

互いに素な可測集合 $E_1,E_2,\dots$ に対して、有限段階の分解から

$$
\mu^*(T)
\ge
\sum_{k=1}^n\mu^*(T\cap E_k)
+
\mu^*\left(T\setminus\bigcup_{k=1}^nE_k\right)
$$

を得ます。

$n\to\infty$ とし、外測度の劣加法性を組み合わせることで

$$
\bigcup_{k=1}^{\infty}E_k
$$

も可測であることが示せます。

従って $\mathcal M$ はsigma代数です。

この証明の本質は、**有限分割での加法性を積み上げて可算分割へ持ち上げる**ことです。

---

## 13. 外測度を可測集合へ制限すると測度になる

互いに素な $E_n\in\mathcal M$ に対して

$$
\mu\left(\bigcup_nE_n\right)
=
\sum_n\mu(E_n)
$$

が成り立ちます。

ここで

$$
\mu=\mu^*|_{\mathcal M}
$$

です。

従って外測度は可測集合上で本物の測度になります。

---

## 14. 完全性まで自動で得られる

$N\in\mathcal M$ かつ

$$
\mu(N)=0
$$

とします。

任意の部分集合

$$
A\subset N
$$

について単調性から

$$
0\le\mu^*(A)\le\mu^*(N)=0
$$

なので

$$
\mu^*(A)=0.
$$

外測度0の集合はCarathéodory可測であることが示せるので、$A$ も可測です。

従って、零集合の部分集合まで可測集合として取り込めます。

<a id="def-f0-00d3-complete-measure"></a>

<!-- formal-statement-start -->
> **定義（測度の完全性）**  
> 測度空間 $(X,\mathcal M,\mu)$ が **完全** であるとは、$N\in\mathcal M$ かつ $\mu(N)=0$ なら、任意の部分集合 $A\subset N$ も $A\in\mathcal M$ となることをいいます。このとき単調性から $\mu(A)=0$ です。
<!-- formal-statement-end -->

Carathéodory構成で得られる測度はこの意味で完全です。

---

## 15. Lebesgue測度へどうつながるか

ここまでで、開区間の長さから作ったLebesgue外測度

$$
\lambda^*
$$

があります。

そのCarathéodory可測集合族を

$$
\mathcal L
$$

とします。

すると

$$
\lambda=\lambda^*|_{\mathcal L}
$$

がLebesgue測度になります。

残る仕事は

1. 区間がCarathéodory可測であること
2. 区間の外測度が本当にその長さになること
3. Borel集合がすべて可測であること

を確認することです。

それをD4で行います。

---

## 16. この章の構図

ここまでを一枚で書けば

$$
\boxed{
\text{interval lengths}
\to
\lambda^*\text{ on all subsets}
\to
\text{Carathéodory criterion}
\to
\mathcal L
\to
\lambda=\lambda^*|_{\mathcal L}
}
$$

です。

D2ではLebesgue測度を「あるもの」として使いました。

この章では、その存在の仕組みを一段下から作りました。

---

## 章末チェック

- Lebesgue外測度を可算開区間被覆のinfimumで定義できる。
- 外測度の三条件を述べられる。
- Lebesgue外測度の可算劣加法性をepsilon近似から示せる。
- 外測度と測度の違いを説明できる。
- Carathéodory可測性を定義できる。
- 可測集合族がsigma代数になる証明の骨格を説明できる。
- 外測度の制限が完全な測度になる理由を説明できる。
- D2で使ったLebesgue測度がどのように建設されるか説明できる。
