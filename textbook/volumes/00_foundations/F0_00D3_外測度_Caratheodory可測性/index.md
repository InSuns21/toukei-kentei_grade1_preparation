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

定義中の被覆候補が空になる心配もありません。例えば $(-n,n)$ $(n\ge1)$ は $\mathbb R$ 全体を覆うので、任意の $A\subset\mathbb R$ も可算個の開区間で覆えます。したがって「被覆の長さ総和の下限を取る」という操作が、どの集合 $A$ に対しても意味を持ちます。

<!-- definition-example-start: def-f0-00d3-lebesgue-outer-measure -->
### 例1：一点集合

**定義の確認**

任意の $x\in\mathbb R$ と $\varepsilon>0$ に対して

$$
\{x\}\subset(x-\varepsilon/2,x+\varepsilon/2)
$$

です。この開区間一つは定義中の許される被覆なので、被覆コストは $\varepsilon$ です。したがって infimum の定義から

$$
0\le\lambda^*(\{x\})\le\varepsilon.
$$

$\varepsilon$ は任意なので

$$
\lambda^*(\{x\})=0.
$$

この例では「開区間被覆を作り、その長さ総和の infimum を取る」という定義をそのまま使っています。
<!-- definition-example-end -->

可算集合についても、各点を長さ $\varepsilon/2^n$ の区間で覆ることで外測度0になることを演習 A04 で確認します。

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

<!-- definition-example-start: def-f0-00d3-outer-measure -->
### 3.1 例：非空集合をすべて1と数える外測度

空でない集合 $X$ 上で

$$
\mu^*(A)=
\begin{cases}
0,&A=\varnothing,\\
1,&A\ne\varnothing
\end{cases}
$$

と定めます。

**定義の確認**

1. 定義どおり $\mu^*(\varnothing)=0$ です。
2. $A\subset B$ のとき、$A=\varnothing$ なら $0\le\mu^*(B)$、$A\ne\varnothing$ なら $B\ne\varnothing$ なので $\mu^*(A)=\mu^*(B)=1$ です。従って単調です。
3. $\bigcup_nA_n=\varnothing$ なら両辺とも0です。和集合が非空なら少なくとも一つの $A_n$ が非空なので

$$
\mu^*\left(\bigcup_nA_n\right)=1
\le
\sum_n\mu^*(A_n).
$$

従って三条件を全て満たし、これは外測度です。
<!-- definition-example-end -->

---

## 4. Lebesgue外測度が外測度であること

<a id="prop-f0-00d3-lebesgue-outer"></a>

<!-- formal-statement-start -->
### 命題（Lebesgue外測度の外測度性）

$\lambda^*$ は $\mathbb R$ 上の外測度である。
<!-- formal-statement-end -->

### 証明の見取り図

空集合と単調性は被覆候補を比較して示します。可算劣加法性は各集合をほぼ最適な区間列で覆い、その全被覆をまとめます。各近似誤差を $\varepsilon/2^n$ に分配するのが核心です。

<!-- proof-start -->
### 証明

まず空集合を考えます。任意の $\varepsilon>0$ に対し、長さ $\varepsilon/2^n$ の開区間 $I_n$ を一つずつ取れば

$$
\varnothing\subset\bigcup_{n=1}^{\infty}I_n,
\qquad
\sum_{n=1}^{\infty}|I_n|=\varepsilon.
$$

従って $0\le\lambda^*(\varnothing)\le\varepsilon$。$\varepsilon$ は任意なので

$$
\lambda^*(\varnothing)=0.
$$

次に $A\subset B$ とします。$B$ を覆う任意の区間族は、そのまま $A$ の被覆にもなります。従って $A$ では $B$ より広い被覆候補から infimum を取れるので

$$
\lambda^*(A)\le\lambda^*(B).
$$

最後に可算劣加法性を示します。もし

$$
\sum_{n=1}^{\infty}\lambda^*(A_n)=\infty
$$

なら、右辺が $\infty$ なので不等式は自動です。そこで以下ではこの和が有限の場合だけ考えます。このとき各 $\lambda^*(A_n)$ も有限です。

任意の $\varepsilon>0$ を固定します。各 $n$ について、$\lambda^*(A_n)$ が被覆コストの infimum であることから

$$
A_n\subset\bigcup_{k=1}^{\infty}I_{n,k},
\qquad
\sum_{k=1}^{\infty}|I_{n,k}|
<
\lambda^*(A_n)+\frac{\varepsilon}{2^n}
$$

となる開区間被覆を選べます。

自然数の組 $(n,k)$ 全体は一列に並べられるので、二重列 $(I_{n,k})_{n,k}$ は一つの可算な開区間族として並べ直せます。また各 $A_n$ はその $n$ 行の区間で覆われるので

$$
\bigcup_{n=1}^{\infty}A_n
\subset
\bigcup_{n=1}^{\infty}\bigcup_{k=1}^{\infty}I_{n,k}.
$$

従って、この二重列を $\bigcup_nA_n$ の被覆として定義へ代入すると

$$
\begin{aligned}
\lambda^*\left(\bigcup_{n=1}^{\infty}A_n\right)
&\le
\sum_{n=1}^{\infty}\sum_{k=1}^{\infty}|I_{n,k}|\\
&<
\sum_{n=1}^{\infty}
\left(
\lambda^*(A_n)+\frac{\varepsilon}{2^n}
\right)\\
&=
\sum_{n=1}^{\infty}\lambda^*(A_n)+\varepsilon.
\end{aligned}
$$

最後の等号では $\sum_{n=1}^{\infty}2^{-n}=1$ を使いました。$\varepsilon>0$ は任意なので

$$
\lambda^*\left(\bigcup_{n=1}^{\infty}A_n\right)
\le
\sum_{n=1}^{\infty}\lambda^*(A_n).
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

<!-- definition-example-start: def-f0-00d3-caratheodory-measurable -->
### 例2：外測度0の集合

**定義の確認**

$\mu^*(N)=0$ とします。任意の $T\subset X$ について単調性から

$$
\mu^*(T\cap N)=0,
\qquad
\mu^*(T\setminus N)\le\mu^*(T).
$$

したがって

$$
\mu^*(T\cap N)+\mu^*(T\setminus N)
\le\mu^*(T).
$$

逆向きは

$$
T=(T\cap N)\cup(T\setminus N)
$$

と外測度の劣加法性から自動です。よって全ての $T$ について Carathéodory 等式が成立し、外測度0の集合は Carathéodory 可測です。
<!-- definition-example-end -->

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

### 証明の見取り図

まず補集合と有限和を閉じ、互いに素な可算和へ進み、一般の可算和は disjoint 化します。その後、Carathéodory 等式を有限段階まで繰り返して外測度の「$\le$」を可算加法性の「$=$」へ引き上げます。最後に零集合の部分集合が再び外測度0になることから完全性を得ます。

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

とします。Step 2 の有限和閉性から $F_n\in\mathcal M$ です。

ここで「Carathéodory 条件を繰り返す」部分を具体的に書きます。任意の $T\subset X$ を固定します。まず $E_1$ の可測性を $T$ に適用して

$$
\mu^*(T)
=
\mu^*(T\cap E_1)
+
\mu^*(T\setminus E_1).
$$

次に $E_2$ の可測性を、元の $T$ ではなく

$$
S:=T\setminus E_1
$$

へ適用します。すると

$$
\mu^*(T\setminus E_1)
=
\mu^*((T\setminus E_1)\cap E_2)
+
\mu^*((T\setminus E_1)\setminus E_2).
$$

$E_1$ と $E_2$ は互いに素なので

$$
(T\setminus E_1)\cap E_2=T\cap E_2,
$$

また

$$
(T\setminus E_1)\setminus E_2
=
T\setminus(E_1\cup E_2)
=
T\setminus F_2.
$$

従って

$$
\mu^*(T)
=
\mu^*(T\cap E_1)
+
\mu^*(T\cap E_2)
+
\mu^*(T\setminus F_2).
$$

この一段を $E_3,E_4,\ldots,E_n$ について繰り返すと、帰納的に

$$
\mu^*(T)
=
\sum_{k=1}^n\mu^*(T\cap E_k)
+
\mu^*(T\setminus F_n)
$$

を得ます。

$F_n\subset F$ なので

$$
T\setminus F\subset T\setminus F_n.
$$

外測度の単調性から

$$
\mu^*(T\setminus F)
\le
\mu^*(T\setminus F_n).
$$

従って全ての $n$ について

$$
\mu^*(T)
\ge
\sum_{k=1}^n\mu^*(T\cap E_k)
+
\mu^*(T\setminus F).
$$

右辺の有限和は $n$ とともに増加するので、$n\to\infty$ として

$$
\mu^*(T)
\ge
\sum_{k=1}^\infty\mu^*(T\cap E_k)
+
\mu^*(T\setminus F).
$$

一方、

$$
T\cap F
=
\bigcup_{k=1}^{\infty}(T\cap E_k)
$$

だから可算劣加法性より

$$
\mu^*(T\cap F)
\le
\sum_{k=1}^\infty\mu^*(T\cap E_k).
$$

従って

$$
\mu^*(T)
\ge
\mu^*(T\cap F)+\mu^*(T\setminus F).
$$

逆向きは

$$
T=(T\cap F)\cup(T\setminus F)
$$

への劣加法性から成り立つので等号です。従って $F\in\mathcal M$。

#### Step 4：一般の可算和

一般の $A_n\in\mathcal M$ に対して

$$
E_1=A_1,
\qquad
E_n=A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置きます。$\bigcup_{k<n}A_k$ は有限和なので Step 2 から可測で、その補集合も可測です。従って

$$
E_n
=
A_n\cap
\left(\bigcup_{k<n}A_k\right)^c
\in\mathcal M.
$$

この $E_n$ は「$A_n$ のうち、それ以前の集合にまだ現れていない部分」だけを残すので互いに素です。また、$x\in\bigcup_nA_n$ なら $x$ が初めて現れる $A_m$ を取ることで $x\in E_m$ となります。逆に $E_n\subset A_n$ です。従って

$$
\bigcup_{n=1}^{\infty}A_n
=
\bigsqcup_{n=1}^{\infty}E_n.
$$

Step 3 により右辺は可測です。従って $\mathcal M$ は任意の可算和で閉じ、すでに補集合でも閉じているのでσ代数です。

#### Step 5：外測度の制限は可算加法的

互いに素な $E_n\in\mathcal M$ を取り

$$
E=\bigsqcup_{n=1}^\infty E_n
$$

とします。前段より $E\in\mathcal M$。

Step 3 で得た有限段階の式を、ここではテスト集合 $T=E$ に適用します。すると

$$
\mu^*(E)
=
\sum_{k=1}^n\mu^*(E\cap E_k)
+
\mu^*(E\setminus F_n),
\qquad
F_n=\bigcup_{k=1}^nE_k.
$$

各 $E_k\subset E$ なので $E\cap E_k=E_k$ で、最後の項は非負です。従って

$$
\mu^*(E)
\ge
\sum_{k=1}^n\mu^*(E_k)
$$

が全ての $n$ で成り立ちます。右辺の有限和を $n\to\infty$ とすれば

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

<!-- definition-example-start: def-f0-00d3-complete-measure -->
### 7.1 例：Carathéodory構成で得た測度

**定義の確認**

Carathéodory 定理で得た $\mu=\mu^*|_{\mathcal M}$ を考えます。$N\in\mathcal M$、$\mu(N)=0$ とし、任意の $A\subset N$ を取ると

$$
0\le\mu^*(A)\le\mu^*(N)=0
$$

なので $\mu^*(A)=0$ です。外測度0集合は Carathéodory 可測だから $A\in\mathcal M$ で、さらに $\mu(A)=0$ です。

したがって零集合 $N$ の **任意の部分集合** が同じ可測集合族へ入り、完全測度の定義を満たします。
<!-- definition-example-end -->

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

なので

$$
0\le\lambda^*(\{x\})\le\varepsilon.
$$

$\varepsilon\downarrow0$ から $\lambda^*(\{x\})=0$。

### 本番答案

任意の $\varepsilon>0$ に対し $\{x\}$ は長さ $\varepsilon$ の開区間で覆えるから $\lambda^*(\{x\})\le\varepsilon$。よって $\lambda^*(\{x\})=0$。

### 採点基準（20点）

- 任意の $\varepsilon>0$ を取る：4点
- 長さ $\varepsilon$ の開区間被覆：7点
- 外測度の上界 $\le\varepsilon$：5点
- $\varepsilon\downarrow0$ で結論：4点
<!-- solution-end -->

## F0-00D3-A02 外測度0集合は可測

- Level: A
- 目安時間: 10分

$\mu^*(N)=0$ なら $N$ が Carathéodory 可測であることを示せ。

<!-- solution-start -->
### 詳細解答

任意の $T\subset X$ について単調性より

$$
\mu^*(T\cap N)=0.
$$

また $T\setminus N\subset T$ だから

$$
\mu^*(T\cap N)+\mu^*(T\setminus N)
\le\mu^*(T).
$$

逆向き

$$
\mu^*(T)
\le
\mu^*(T\cap N)+\mu^*(T\setminus N)
$$

は外測度の劣加法性から従うので等号。従って $N$ は Carathéodory 可測。

### 本番答案

$\mu^*(N)=0$ より $\mu^*(T\cap N)=0$。また $T\setminus N\subset T$ だから右辺は $\mu^*(T)$ 以下。一方、逆向きは劣加法性より自動。従って Carathéodory 等式が成立する。

### 採点基準（20点）

- $\mu^*(T\cap N)=0$：5点
- 単調性で $\mu^*(T\setminus N)\le\mu^*(T)$：5点
- 逆向きが劣加法性から従う：5点
- Carathéodory 可測性を結論：5点
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

従って $E$ の Carathéodory 等式

$$
\mu^*(T)=\mu^*(T\cap E)+\mu^*(T\setminus E)
$$

の右辺二項を入れ替えれば $E^c$ の Carathéodory 等式そのものになる。

### 本番答案

$T\cap E^c=T\setminus E$、$T\setminus E^c=T\cap E$ なので、$E$ の Carathéodory 等式の二項を交換するだけで $E^c$ の等式が得られる。

### 採点基準（20点）

- 二つの集合恒等式を記述：8点
- $E$ の Carathéodory 等式を使用：6点
- 二項の交換で同じ等式になること：4点
- $E^c$ 可測の結論：2点
<!-- solution-end -->

## F0-00D3-A04 可算集合を短い区間で覆う

- Level: A
- 目安時間: 12分

可算集合

$$
A=\{x_1,x_2,\ldots\}\subset\mathbb R
$$

に対して $\lambda^*(A)=0$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $\varepsilon>0$ を固定します。各点 $x_n$ を中心とする長さ

$$
\frac{\varepsilon}{2^n}
$$

の開区間 $I_n$ を取ります。すると $x_n\in I_n$ なので

$$
A\subset\bigcup_{n=1}^{\infty}I_n.
$$

Lebesgue 外測度の定義から

$$
0\le\lambda^*(A)
\le
\sum_{n=1}^{\infty}|I_n|
=
\sum_{n=1}^{\infty}\frac{\varepsilon}{2^n}
=
\varepsilon.
$$

$\varepsilon>0$ は任意なので $\lambda^*(A)=0$ です。
<!-- solution-end -->

## F0-00D3-B01 有限和の可測性

- Level: B
- 目安時間: 18分

$E,F$ が Carathéodory 可測なら $E\cup F$ も可測であることを示せ。

<!-- solution-start -->
### 詳細解答

任意の $T$ について、まず $E$ で分けると

$$
\mu^*(T)=\mu^*(T\cap E)+\mu^*(T\setminus E).
$$

次に $F$ の可測性を $T\setminus E$ に適用して

$$
\mu^*(T\setminus E)
=
\mu^*(T\cap(F\setminus E))
+
\mu^*(T\setminus(E\cup F)).
$$

したがって

$$
\mu^*(T)
=
\mu^*(T\cap E)+\mu^*(T\cap(F\setminus E))
+
\mu^*(T\setminus(E\cup F)).
$$

劣加法性より前二項の和は $\mu^*(T\cap(E\cup F))$ 以上なので

$$
\mu^*(T)
\ge
\mu^*(T\cap(E\cup F))+
\mu^*(T\setminus(E\cup F)).
$$

逆向きは自動だから等号。

### 本番答案

$T$ を $E$ で分け、残りを $F$ で分けると

$$
\mu^*(T)
=
\mu^*(T\cap E)+\mu^*(T\cap(F\setminus E))
+
\mu^*(T\setminus(E\cup F)).
$$

前二項に劣加法性を使えば Carathéodory 条件の逆向き不等式を得る。順向きは外測度の劣加法性より自動なので $E\cup F$ は可測。

### 採点基準（20点）

- $E$ での分割：4点
- $F$ で再分割：5点
- 三項表示：4点
- 劣加法性から逆向き不等式：5点
- 結論：2点
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

$E=\bigsqcup_nE_n$ と置く。有限段階まで Carathéodory 条件を繰り返し $T=E$ とすれば

$$
\mu^*(E)
\ge
\sum_{k=1}^n\mu^*(E_k)
$$

を全ての $n$ について得る。したがって

$$
\mu^*(E)
\ge
\sum_{k=1}^\infty\mu^*(E_k).
$$

逆向き

$$
\mu^*(E)
\le
\sum_{k=1}^\infty\mu^*(E_k)
$$

は外測度の可算劣加法性そのものなので等号。

### 本番答案

有限 Carathéodory 分割から

$$
\mu^*(E)\ge\sum_{k=1}^n\mu^*(E_k)
$$

を得る。$n\to\infty$ で「$\ge$」。逆の「$\le$」は外測度の可算劣加法性。従って等号。

### 採点基準（20点）

- $E=\bigsqcup E_n$ と置く：3点
- 有限段階の Carathéodory 分割：7点
- $n\to\infty$ で逆向き評価：4点
- 可算劣加法性：4点
- 等号の結論：2点
<!-- solution-end -->

## F0-00D3-B03 完全性

- Level: B
- 目安時間: 15分

Carathéodory 構成で得た測度が完全であることを説明せよ。

<!-- solution-start -->
### 詳細解答

$N\in\mathcal M$、$\mu(N)=0$ とし $A\subset N$ を任意に取る。外測度の定義に含まれる単調性から

$$
0\le\mu^*(A)\le\mu^*(N)=0
$$

なので $\mu^*(A)=0$。外測度0の集合は全て Carathéodory 可測だから $A\in\mathcal M$ で、さらに $\mu(A)=0$。従って零集合の全ての部分集合が可測であり、測度は完全。

### 本番答案

$A\subset N$、$\mu(N)=0$ なら単調性より $\mu^*(A)=0$。外測度0集合は Carathéodory 可測なので $A$ も可測で測度0。従って Carathéodory 構成の測度は完全である。

### 採点基準（20点）

- 零集合 $N$ と部分集合 $A$ を設定：4点
- 単調性から $\mu^*(A)=0$：6点
- 外測度0集合の可測性：5点
- $\mu(A)=0$：2点
- 完全性の結論：3点
<!-- solution-end -->

## F0-00D3-C01 可算和閉性を分解から再構成する

- Level: C
- 目安時間: 25分

Carathéodory 可測集合全体を $\mathcal M$ とする。任意の列 $A_1,A_2,\ldots\in\mathcal M$ に対して

$$
E_1=A_1,
\qquad
E_n=A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置く。

1. 各 $E_n$ が $\mathcal M$ に属することを示せ。
2. $(E_n)$ が互いに素であることを示せ。
3. $\bigcup_nA_n=\bigsqcup_nE_n$ を示せ。
4. 互いに素な可測集合の可算和が可測であるという本文の結果を使い、$\bigcup_nA_n\in\mathcal M$ を結論せよ。

<!-- solution-start -->
### 詳細解答

1. 固定した $n\ge2$ について

$$
F_{n-1}:=\bigcup_{k<n}A_k
$$

と置きます。これは有限個の可測集合の和なので $F_{n-1}\in\mathcal M$ です。補集合閉性と有限共通部分閉性から

$$
E_n=A_n\cap F_{n-1}^c\in\mathcal M.
$$

$E_1=A_1$ も可測です。

2. $m<n$ とします。$E_m\subset A_m$ です。一方、$E_n$ は $A_1,\ldots,A_{n-1}$ を全て除いた部分なので、特に $E_n\subset A_m^c$ です。従って

$$
E_m\cap E_n=\varnothing.
$$

3. 各 $E_n\subset A_n$ なので $\bigcup_nE_n\subset\bigcup_nA_n$ です。逆に $x\in\bigcup_nA_n$ を取ります。$x\in A_n$ となる自然数のうち最小のものを $m$ とすると、$x$ は $A_1,\ldots,A_{m-1}$ に入らないので

$$
x\in
A_m\setminus\bigcup_{k<m}A_k
=
E_m.
$$

従って

$$
\bigcup_nA_n
=
\bigsqcup_nE_n.
$$

4. 各 $E_n$ は可測で互いに素なので、本文 Step 3 により $\bigsqcup_nE_n$ は可測です。3 の等式から

$$
\bigcup_nA_n\in\mathcal M.
$$

これで一般の可算和閉性が、有限和・補集合・互いに素な可算和から再構成できました。
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
