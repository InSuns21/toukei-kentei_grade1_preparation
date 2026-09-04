# F0-00D3 補講：外測度・Carathéodory可測性

D2では Lebesgue 測度を「使えるもの」として先に導入しました。この章では、その一段下へ降りて

$$
\boxed{
\text{区間の長さ}
\to
\text{外測度}
\to
\text{Carathéodory可測集合}
\to
\text{完全測度}
}
$$

を構成します。

中心となる問いは、

> **全ての集合にまず“外から見た大きさ”を与え、その中から本当に加法的に測れる集合をどう選ぶか。**

です。

---

## 1. なぜ最初から全ての集合へ長さを定義しないのか

区間なら

$$
\ell((a,b))=b-a
$$

と長さを定められます。しかし全ての $A\subset\mathbb R$ に対して同時に

- 区間の長さと一致する
- 平行移動で長さが変わらない
- 互いに素な可算和に対して可算加法的

となる長さを定義することはできません。D5 の Vitali 集合がその障害を具体化します。

そこで戦略を逆にします。

1. 全ての部分集合へ、加法性を要求しすぎない **外測度** を定める。
2. 外測度をきれいに二分できる集合だけを **可測** と認定する。
3. その集合族上では外測度が本物の測度になることを証明する。

---

## 2. Lebesgue 外測度

<a id="def-f0-00d3-lebesgue-outer-measure"></a>

<!-- formal-statement-start -->
### 定義（Lebesgue外測度）

$A\subset\mathbb R$ に対して

$$
\boxed{
\lambda^*(A)
:=
\inf\left\{
\sum_{n=1}^\infty |I_n|:
A\subset\bigcup_{n=1}^\infty I_n,
\ I_n\text{ は開区間}
\right\}
}
$$

を **Lebesgue外測度** という。
<!-- formal-statement-end -->

$A$ 自身には可測性を仮定していません。$\lambda^*$ は全ての部分集合に定義されます。

### 例1：一点集合

任意の $x\in\mathbb R$ と $\varepsilon>0$ に対して

$$
\{x\}\subset(x-\varepsilon/2,x+\varepsilon/2)
$$

だから

$$
0\le\lambda^*(\{x\})\le\varepsilon.
$$

$\varepsilon$ は任意なので

$$
\lambda^*(\{x\})=0.
$$

同様に可算集合は可算劣加法性から外測度0になります。

---

## 3. 一般の外測度

<a id="def-f0-00d3-outer-measure"></a>

<!-- formal-statement-start -->
### 定義（外測度）

集合 $X$ 上の写像

$$
\mu^*:2^X\to[0,\infty]
$$

が次を満たすとき **外測度** という。

1. $\mu^*(\varnothing)=0$
2. $A\subset B\Rightarrow\mu^*(A)\le\mu^*(B)$
3. 任意の $A_n\subset X$ に対して

$$
\boxed{
\mu^*\left(\bigcup_{n=1}^\infty A_n\right)
\le
\sum_{n=1}^\infty\mu^*(A_n)
}
$$

<!-- formal-statement-end -->

3 は **可算劣加法性** です。測度の可算加法性とは違い、まだ等号は要求しません。

---

## 4. Lebesgue外測度が外測度であること

<a id="prop-f0-00d3-lebesgue-outer"></a>

<!-- formal-statement-start -->
### 命題（Lebesgue外測度の外測度性）

$\lambda^*$ は $\mathbb R$ 上の外測度である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

空集合は空の被覆で覆えるので $\lambda^*(\varnothing)=0$。

$A\subset B$ なら、$B$ を覆う任意の区間族は $A$ も覆うため

$$
\lambda^*(A)\le\lambda^*(B).
$$

可算劣加法性を示します。任意の $\varepsilon>0$ を固定します。各 $A_n$ について外測度の infimum の定義から

$$
A_n\subset\bigcup_{k=1}^\infty I_{n,k},
\qquad
\sum_k|I_{n,k}|
<
\lambda^*(A_n)+\frac{\varepsilon}{2^n}
$$

となる被覆を選べます。$\lambda^*(A_n)=\infty$ の項があれば主張は自明なので、有限の項だけ考えれば十分です。

すると

$$
\bigcup_nA_n
\subset
\bigcup_{n,k}I_{n,k}
$$

だから

$$
\begin{aligned}
\lambda^*\left(\bigcup_nA_n\right)
&\le\sum_{n,k}|I_{n,k}|\\
&<\sum_n\lambda^*(A_n)+\varepsilon.
\end{aligned}
$$

$\varepsilon\downarrow0$ として

$$
\lambda^*\left(\bigcup_nA_n\right)
\le\sum_n\lambda^*(A_n).
$$

よって $\lambda^*$ は外測度です。$\square$
<!-- proof-end -->

---

## 5. Carathéodory 可測性

外測度だけでは一般に加法性が足りません。そこで「任意のテスト集合を、その集合の内側と外側へ切っても外測度が失われない」集合を選びます。

<a id="def-f0-00d3-caratheodory-measurable"></a>

<!-- formal-statement-start -->
### 定義（Carathéodory可測性）

外測度 $\mu^*$ に対して $E\subset X$ が **Carathéodory可測** であるとは、任意の $T\subset X$ について

$$
\boxed{
\mu^*(T)
=
\mu^*(T\cap E)
+
\mu^*(T\setminus E)
}
$$

が成り立つことをいう。
<!-- formal-statement-end -->

外測度の劣加法性から

$$
\mu^*(T)
\le
\mu^*(T\cap E)+\mu^*(T\setminus E)
$$

は自動です。従って本質は逆向き

$$
\mu^*(T)
\ge
\mu^*(T\cap E)+\mu^*(T\setminus E)
$$

を保証することです。

### 例2：外測度0の集合

$\mu^*(N)=0$ とします。任意の $T$ について

$$
\mu^*(T\cap N)=0,
\qquad
\mu^*(T\setminus N)\le\mu^*(T)
$$

なので

$$
\mu^*(T\cap N)+\mu^*(T\setminus N)
\le\mu^*(T).
$$

逆向きは劣加法性から自動なので等号です。したがって外測度0の集合は全て Carathéodory 可測です。

---

## 6. Carathéodory の定理

<a id="thm-f0-00d3-caratheodory"></a>

<!-- formal-statement-start -->
### 定理（Carathéodory）

外測度 $\mu^*$ に対し

$$
\mathcal M
:=
\{E\subset X:E\text{ はCarathéodory可測}\}
$$

と置く。このとき

1. $\mathcal M$ は σ代数である。
2. $\mu:=\mu^*|_{\mathcal M}$ は $\mathcal M$ 上の測度である。
3. この測度は完全である。

<!-- formal-statement-end -->

```text
外測度 on 2^X
 ↓ 可測集合を選別
完全測度 on M
```

を正当化する主定理です。

<!-- proof-start -->
### 証明

#### Step 1：空集合と補集合

$\varnothing$ について

$$
T\cap\varnothing=\varnothing,
\qquad
T\setminus\varnothing=T
$$

だから可測です。

また $E$ が可測なら

$$
T\cap E^c=T\setminus E,
\qquad
T\setminus E^c=T\cap E
$$

なので Carathéodory 条件の右辺が入れ替わるだけです。従って $E^c$ も可測です。

#### Step 2：有限和で閉じる

$E,F\in\mathcal M$ とします。任意の $T\subset X$ に対して、まず $E$ の可測性から

$$
\mu^*(T)
=
\mu^*(T\cap E)+\mu^*(T\setminus E).
$$

次に $F$ の可測性を $T\setminus E$ に適用すると

$$
\mu^*(T\setminus E)
=
\mu^*((T\setminus E)\cap F)
+
\mu^*(T\setminus(E\cup F)).
$$

従って

$$
\mu^*(T)
=
\mu^*(T\cap E)
+
\mu^*(T\cap(F\setminus E))
+
\mu^*(T\setminus(E\cup F)).
$$

劣加法性から

$$
\mu^*(T\cap(E\cup F))
\le
\mu^*(T\cap E)
+
\mu^*(T\cap(F\setminus E)).
$$

ゆえに

$$
\mu^*(T)
\ge
\mu^*(T\cap(E\cup F))
+
\mu^*(T\setminus(E\cup F)).
$$

逆向きは自動なので $E\cup F$ は可測です。従って有限和・有限共通部分・差でも閉じます。

#### Step 3：互いに素な可算和

互いに素な $E_1,E_2,\dots\in\mathcal M$ を取り

$$
F_n:=\bigcup_{k=1}^nE_k,
\qquad
F:=\bigcup_{k=1}^\infty E_k
$$

とします。有限和の結果から $F_n\in\mathcal M$。

Carathéodory 条件を順に適用すると、任意の $T$ について

$$
\mu^*(T)
=
\sum_{k=1}^n\mu^*(T\cap E_k)
+
\mu^*(T\setminus F_n).
$$

$T\setminus F\subset T\setminus F_n$ なので

$$
\mu^*(T)
\ge
\sum_{k=1}^n\mu^*(T\cap E_k)
+
\mu^*(T\setminus F).
$$

$n\to\infty$ として

$$
\mu^*(T)
\ge
\sum_{k=1}^\infty\mu^*(T\cap E_k)
+
\mu^*(T\setminus F).
$$

さらに劣加法性から

$$
\mu^*(T\cap F)
\le
\sum_{k=1}^\infty\mu^*(T\cap E_k).
$$

よって

$$
\mu^*(T)
\ge
\mu^*(T\cap F)+\mu^*(T\setminus F).
$$

逆向きは自動なので $F\in\mathcal M$。

#### Step 4：一般の可算和

一般の $A_n\in\mathcal M$ に対して

$$
E_1=A_1,
\qquad
E_n=A_n\setminus\bigcup_{k<n}A_k
$$

と disjoint 化します。各 $E_n\in\mathcal M$ で

$$
\bigcup_nA_n=\bigsqcup_nE_n.
$$

Step 3 より右辺は可測。したがって $\mathcal M$ はσ代数です。

#### Step 5：外測度の制限は可算加法的

互いに素な $E_n\in\mathcal M$ を取り

$$
E=\bigsqcup_{n=1}^\infty E_n
$$

とします。前段より $E\in\mathcal M$。

有限段階で Carathéodory 条件を繰り返し、テスト集合に $T=E$ を入れると

$$
\mu^*(E)
\ge
\sum_{k=1}^n\mu^*(E_k)
$$

なので

$$
\mu^*(E)
\ge
\sum_{k=1}^\infty\mu^*(E_k).
$$

逆向きは外測度の可算劣加法性です。従って

$$
\mu^*(E)=\sum_{k=1}^\infty\mu^*(E_k).
$$

よって $\mu=\mu^*|_{\mathcal M}$ は測度です。

#### Step 6：完全性

$N\in\mathcal M$、$\mu(N)=0$、$A\subset N$ とします。単調性から

$$
0\le\mu^*(A)\le\mu^*(N)=0
$$

なので $\mu^*(A)=0$。例2より外測度0の集合は Carathéodory 可測なので $A\in\mathcal M$、かつ $\mu(A)=0$。

以上で三つの主張を全て示しました。$\square$
<!-- proof-end -->

---

## 7. 完全測度という言葉

<a id="def-f0-00d3-complete-measure"></a>

<!-- formal-statement-start -->
### 定義（完全測度）

測度空間 $(X,\mathcal M,\mu)$ が **完全** であるとは、$N\in\mathcal M$、$\mu(N)=0$ なら任意の $A\subset N$ も $A\in\mathcal M$ となることをいう。
<!-- formal-statement-end -->

Carathéodory 構成ではこの完全性まで自動的に得られます。

---

## 8. Lebesgue測度へつながる

Lebesgue 外測度 $\lambda^*$ に対する Carathéodory 可測集合族を

$$
\mathcal L
$$

と書けば

$$
\lambda:=\lambda^*|_{\mathcal L}
$$

は完全測度です。

残る仕事は

1. 区間の外測度が通常の長さと一致する。
2. 区間が Carathéodory 可測である。
3. 従って Borel 集合が全て可測になる。
4. 一般の premeasure から同じ構成で測度を拡張できる。

ことです。D4 で全て証明します。

---

## 9. 証明で何が起きたか

Carathéodory 条件は一見すると

$$
\forall T\subset X
$$

を要求する強い定義ですが、その強さのおかげで可測集合 $E$ は「どんなテスト集合に対しても、内外へ切った測度が正確に足し戻せる切断面」になります。

```text
1つの可測集合で二分できる
 ↓
有限個の互いに素な可測集合で分割できる
 ↓
有限段階の等式を n→∞ へ送る
 ↓
可算加法性
```

という構造です。外測度が最初から持つ「≤」に、Carathéodory 可測性が逆向きの「≥」を供給して等号へ格上げしています。

---

# 10. 演習

## F0-00D3-A01 一点集合の外測度

- Level: A
- 目安時間: 8分

$x\in\mathbb R$ に対して $\lambda^*(\{x\})=0$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $\varepsilon>0$ に対し

$$
\{x\}\subset(x-\varepsilon/2,x+\varepsilon/2)
$$

なので $\lambda^*(\{x\})\le\varepsilon$。非負性と $\varepsilon\downarrow0$ から0。
<!-- solution-end -->

## F0-00D3-A02 外測度0集合は可測

- Level: A
- 目安時間: 10分

$\mu^*(N)=0$ なら $N$ が Carathéodory 可測であることを示せ。

<!-- solution-start -->
### 詳細解答

任意の $T$ について $\mu^*(T\cap N)=0$。また $T\setminus N\subset T$ より

$$
\mu^*(T\cap N)+\mu^*(T\setminus N)\le\mu^*(T).
$$

逆向きは外測度の劣加法性から従うので等号。
<!-- solution-end -->

## F0-00D3-A03 補集合で閉じる

- Level: A
- 目安時間: 8分

$E$ が Carathéodory 可測なら $E^c$ も可測であることを定義から示せ。

<!-- solution-start -->
### 詳細解答

任意の $T$ について

$$
T\cap E^c=T\setminus E,
\qquad
T\setminus E^c=T\cap E.
$$

従って $E$ の Carathéodory 等式の二項が入れ替わるだけ。
<!-- solution-end -->

## F0-00D3-B01 有限和の可測性

- Level: B
- 目安時間: 18分

$E,F$ が Carathéodory 可測なら $E\cup F$ も可測であることを示せ。

<!-- solution-start -->
### 詳細解答

$T$ をまず $E$ で分け、$T\setminus E$ をさらに $F$ で分けると

$$
\mu^*(T)
=
\mu^*(T\cap E)
+
\mu^*(T\cap(F\setminus E))
+
\mu^*(T\setminus(E\cup F)).
$$

前二項の和は劣加法性により $\mu^*(T\cap(E\cup F))$ 以上なので必要な逆向き不等式を得る。
<!-- solution-end -->

## F0-00D3-B02 可算加法性を導く

- Level: B
- 目安時間: 20分

互いに素な $E_n\in\mathcal M$ について

$$
\mu^*\left(\bigcup_nE_n\right)
=
\sum_n\mu^*(E_n)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

有限個までの Carathéodory 分割から左辺は任意の有限部分和以上。$n\to\infty$ で「≥」。逆の「≤」は外測度の可算劣加法性そのもの。
<!-- solution-end -->

## F0-00D3-B03 完全性

- Level: B
- 目安時間: 15分

Carathéodory 構成で得た測度が完全であることを説明せよ。

<!-- solution-start -->
### 詳細解答

$A\subset N$、$\mu(N)=0$ なら外測度の単調性から $\mu^*(A)=0$。外測度0集合は全て Carathéodory 可測なので $A$ も可測、測度0。
<!-- solution-end -->

---

## 11. 章末チェック

- Lebesgue 外測度を開区間被覆の infimum で定義できる。
- 外測度の三条件を述べ、Lebesgue 外測度について証明できる。
- Carathéodory 可測性の「自動な向き」と「本質的な向き」を区別できる。
- Carathéodory 可測集合がσ代数になることを証明できる。
- 外測度の制限が可算加法的測度になることを証明できる。
- 外測度0集合から完全性を証明できる。

**次：F0-00D4 Lebesgue測度・Borel集合・Carathéodory拡張定理**
