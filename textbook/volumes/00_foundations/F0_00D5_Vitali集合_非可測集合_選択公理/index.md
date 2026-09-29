# F0-00D5 補講：Vitali集合・非可測集合・選択公理

D3・D4では、外測度からLebesgue測度を構成しました。

ここで自然な疑問が出ます。

> なぜ最初から実数の全ての部分集合を可測にしないのか。

答えは、**区間の長さと整合的・平行移動不変・可算加法的な測度を全ての部分集合へ拡張することはできない**からです。

この障害を具体的に示す代表例が **Vitali集合** です。

そしてVitali集合の構成には、F0-00A2で扱った選択公理が現れます。

---

## 1. 有理数だけ違う実数を同一視する

区間 $[0,1]$ 上で「有理数だけずれている点を同じグループとみなす」ことを考えます。これを次の関係として定義します。

<a id="def-f0-00d5-vitali-equivalence"></a>

<!-- formal-statement-start -->
### 定義（Vitali同値関係）

$x,y\in[0,1]$ に対して

$$
x\sim y
\quad\Longleftrightarrow\quad
x-y\in\mathbb Q
$$

と定める。この関係を本章の **Vitali同値関係** と呼ぶ。
<!-- formal-statement-end -->

この定義が本当に同値関係になることを、三条件で直接確認します。

### 1.1 反射律

$$
x-x=0\in\mathbb Q.
$$

### 1.2 対称律

$x-y\in\mathbb Q$ なら

$$
y-x=-(x-y)\in\mathbb Q.
$$

### 1.3 推移律

$x-y,y-z\in\mathbb Q$ なら

$$
x-z=(x-y)+(y-z)\in\mathbb Q.
$$

従って $[0,1]$ は同値類に分割されます。

<!-- definition-example-start: def-f0-00d5-vitali-equivalence -->
### 1.4 最小例で同じ類・違う類を確認する

**定義の確認**

例えば

$$
\frac16-\frac56=-\frac23\in\mathbb Q
$$

なので

$$
\frac16\sim\frac56.
$$

一方、

$$
0-\frac{\sqrt2}{2}=-\frac{\sqrt2}{2}\notin\mathbb Q
$$

なので

$$
0\not\sim\frac{\sqrt2}{2}.
$$

「数値が近いか」ではなく、**差が有理数かどうか**だけで同じ同値類かを判定します。
<!-- definition-example-end -->

---

## 2. 同値類とは何か

$x\in[0,1]$ の同値類は

$$
[x]
=
\{y\in[0,1]:x-y\in\mathbb Q\}
$$

です。

つまり $x$ から有理数だけずれた点を、区間内でまとめた集合です。

各同値類は可算です。

しかし同値類そのものの個数は非可算です。

---

## 3. 各同値類から一つずつ選ぶ

$[0,1]$ の全ての同値類から、代表元をちょうど一つずつ選びます。

<a id="def-f0-00d5-vitali-set"></a>

<!-- formal-statement-start -->
> **定義（Vitali集合）**  
> 関係 $x\sim y\iff x-y\in\mathbb Q$ による $[0,1]$ の各同値類から代表元をちょうど一つずつ選び、その代表元全体を $V\subset[0,1]$ としたものを **Vitali集合** といいます。すなわち、各 $\sim$ 同値類と $V$ の共通部分はちょうど1点です。
<!-- formal-statement-end -->

この「全ての同値類から一つずつ代表を選ぶ」操作で、標準的には選択公理を使います。

明示的な代表選択規則は一般には与えられません。

<!-- definition-example-start: def-f0-00d5-vitali-set -->
### 3.1 定義から得られる二つの性質

**定義の確認**

$V$ は各同値類とちょうど1点で交わるので、次の二点が成り立ちます。

1. 任意の $x\in[0,1]$ に対し、その同値類の代表 $v\in V$ が一つ存在し、

$$
   x-v\in\mathbb Q.
$$

2. $v_1,v_2\in V$ かつ $v_1-v_2\in\mathbb Q$ なら $v_1\sim v_2$ です。同じ同値類から代表を二つ取ることはないので

$$
   v_1=v_2.
$$

後の非可測性証明では、1 が「平行移動族が $[0,1]$ を覆う」ことに、2 が「異なる平行移動が互いに素」になることに使われます。
<!-- definition-example-end -->

---

## 4. 「非可測」とは何か

Vitali集合について矛盾を作る前に、結論で使う言葉を固定します。

<a id="def-f0-00d5-nonmeasurable"></a>

<!-- formal-statement-start -->
### 定義（Lebesgue非可測集合）

$A\subset\mathbb R$ が Lebesgue σ代数 $\mathcal L$ に属さないとき、すなわち

$$
A\notin\mathcal L
$$

であるとき、$A$ を **Lebesgue非可測集合** という。
<!-- formal-statement-end -->

ここではまだ具体例を使いません。次の節から Vitali集合の平行移動を調べ、5節の定理で実際にこの条件を満たす集合が存在することを示します。

---

## 5. 有理数平行移動を考える

$q\in\mathbb Q\cap[-1,1]$ に対して

$$
V+q
=
\{v+q:v\in V\}
$$

を考えます。

このような平行移動を可算個並べます。

$$
\{V+q:q\in\mathbb Q\cap[-1,1]\}.
$$

有理数は可算なので、この族も可算です。

---

<a id="thm-vitali-nonmeasurable"></a>

## 6. Vitali集合がLebesgue可測ではないことを示す

<!-- formal-statement-start -->
> **定理（Vitali集合の非可測性）**  
> 各 $\sim$ 同値類から代表元を一つずつ選んで得た Vitali集合 $V\subset[0,1]$ はLebesgue可測ではない。
<!-- formal-statement-end -->

### 6.1 証明の見取り図

証明で使う事実は四つだけです。

1. $V+q$（$q\in\mathbb Q\cap[-1,1]$）は互いに素。
2. それらの可算和は $[0,1]$ を覆う。
3. それでも全体は $[-1,2]$ に収まる。
4. 平行移動不変性により全ての $V+q$ は同じ測度を持つ。

そこで $V$ が可測だと仮定すると、$\lambda(V)$ は0か正かのどちらかです。0なら可算和の測度も0で $[0,1]$ を覆えません。正なら可算和の測度は無限大になり、$[-1,2]$ に収まりません。

$$
\boxed{
\lambda(V)=0\Rightarrow 1\le0,
\qquad
\lambda(V)>0\Rightarrow\infty\le3
}
$$

この矛盾の部分を完全に追いたい場合だけ、以下を開けば十分です。

<!-- proof-start -->
### 証明

#### Step 1：異なる有理数平行移動は互いに素

$q_1\ne q_2$ とします。

もし

$$
x\in(V+q_1)\cap(V+q_2)
$$

なら、ある $v_1,v_2\in V$ が存在して

$$
x=v_1+q_1=v_2+q_2.
$$

従って

$$
v_1-v_2=q_2-q_1\in\mathbb Q.
$$

よって

$$
v_1\sim v_2.
$$

しかし $V$ は各同値類から一つしか代表を選んでいないので

$$
v_1=v_2.
$$

すると

$$
q_1=q_2
$$

となり矛盾です。

従って

$$
\boxed{
q_1\ne q_2
\Longrightarrow
(V+q_1)\cap(V+q_2)=\varnothing
}
$$

です。

---

#### Step 2：平行移動族は $[0,1]$ を覆う

任意の $x\in[0,1]$ を取ります。

$x$ の同値類から代表元 $v\in V$ が一つ選ばれています。

従って

$$
x-v\in\mathbb Q.
$$

また $x,v\in[0,1]$ なので

$$
-1\le x-v\le1.
$$

よって

$$
q=x-v\in\mathbb Q\cap[-1,1]
$$

で

$$
x=v+q\in V+q.
$$

従って

$$
\boxed{
[0,1]
\subset
\bigcup_{q\in\mathbb Q\cap[-1,1]}(V+q)
}
$$

です。

---

#### Step 3：全体は有限区間 $[-1,2]$ に収まる

$v\in[0,1]$、$q\in[-1,1]$ なので

$$
-1\le v+q\le2.
$$

従って

$$
\boxed{
\bigcup_{q\in\mathbb Q\cap[-1,1]}(V+q)
\subset[-1,2]
}
$$

です。

まとめると

$$
[0,1]
\subset
\bigcup_q(V+q)
\subset[-1,2].
$$

---

#### Step 4：可測だと仮定して可算加法性を使う

ここで $V$ がLebesgue可測だと仮定します。

[D4 の平行移動不変性](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#cor-f0-00d4-lebesgue-translation-invariance)より、$V$ が可測なら各 $V+q$ も可測で、

$$
\lambda(V+q)=\lambda(V)
$$

です。

また $V+q$ は互いに素なので、可算加法性から

$$
\lambda\left(
\bigcup_q(V+q)
\right)
=
\sum_q\lambda(V).
$$

ここで場合分けします。

---

#### Step 5：$\lambda(V)=0$ なら矛盾

もし

$$
\lambda(V)=0
$$

なら

$$
\sum_q\lambda(V)=0.
$$

従って

$$
\lambda\left(
\bigcup_q(V+q)
\right)=0.
$$

しかしこの集合は $[0,1]$ を含むので単調性から

$$
1
=
\lambda([0,1])
\le0
$$

となり矛盾です。

---

#### Step 6：$\lambda(V)>0$ でも矛盾

もし

$$
\lambda(V)>0
$$

なら、正の同じ値を可算無限個足すので

$$
\sum_q\lambda(V)=\infty.
$$

従って

$$
\lambda\left(
\bigcup_q(V+q)
\right)=\infty.
$$

しかしこの集合は $[-1,2]$ に含まれるため

$$
\lambda\left(
\bigcup_q(V+q)
\right)
\le
\lambda([-1,2])=3.
$$

これも矛盾です。
<!-- proof-end -->
---

## 7. 結論：Vitali集合はLebesgue可測ではない

どちらの場合も矛盾するので

$$
\boxed{
V\text{ はLebesgue可測ではない}
}
$$

ことが分かります。

<!-- definition-example-start: def-f0-00d5-nonmeasurable -->
### 例：Vitali集合

**定義の確認**

直前の定理で、Vitali集合 $V$ を可測と仮定すると

$$
\lambda(V)=0
$$

でも

$$
\lambda(V)>0
$$

でも矛盾することを示しました。従って $V\notin\mathcal L$ であり、定義どおり $V$ は Lebesgue非可測集合です。
<!-- definition-example-end -->

つまり実数の全ての部分集合がLebesgue可測なわけではありません。

---

## 8. 何が同時には実現できないのか

Vitali集合の議論は、次の三つを全ての部分集合で同時に満たすことができないことを示します。

1. 区間の測度が通常の長さに一致する
2. 平行移動不変
3. 可算加法性

全ての部分集合を可測にしたいなら、どれかを捨てなければなりません。

Lebesgue測度は

> 良い性質を保つ代わりに、可測集合をσ代数へ制限する

という選択をしています。

---

## 9. 選択公理はどこで使われたか

Vitali集合の証明で選択公理が使われるのは

$$
\boxed{
\text{各同値類から代表元を一つずつ選ぶ}
}
$$

という箇所です。

その後の

- 有理数平行移動
- 互いに素であること
- 可算加法性による矛盾

には、選択公理そのものは使っていません。

従って

$$
\text{選択公理}
\to
\text{Vitali代表集合の存在}
\to
\text{非可測集合の存在}
$$

という流れです。

---

## 10. 「選択公理が悪い」のか

そう単純ではありません。

選択公理は

- Hahn--Banach
- 一般のベクトル空間の基底
- 多くの極大原理

を使うときにも現れます。

一方でVitali集合のような直感に反する対象の存在も許します。

したがって選択公理は

> 非構成的な存在を強力に保証する代わりに、非常に非直感的な対象も存在させる

公理だと理解するとよいです。

---

## 11. 可測集合の制限は欠点ではない

統計学では、観測事象として使う集合が

- 区間
- 半空間
- Borel集合
- 密度で記述できる集合

などであることがほとんどです。

これらは通常問題なく可測です。

非可測集合の存在は、日常の確率計算を壊すというより

> 「確率は任意の部分集合へ自由に割り当てられるわけではない」

という理論的境界を教えてくれます。

---

## 12. 確率論への接続

確率空間

$$
(\Omega,\mathcal F,P)
$$

で、事象を全ての部分集合ではなく

$$
A\in\mathcal F
$$

に制限する理由が、ここではっきりします。

$$
\mathcal F
$$

は単なる形式上の飾りではありません。

可算加法的な確率を矛盾なく扱える「測定可能な事象の世界」を指定しています。

---

## 13. 関数解析への接続

選択公理はD5ではVitali集合を作りました。

一方C6では、同じ選択原理がZornの補題を通じてHahn--Banachの極大延長を支えます。

つまり

$$
\boxed{
\text{選択公理}
\begin{cases}
\to\text{Hahn--Banachの存在定理}\\
\to\text{Vitali非可測集合}
\end{cases}
}
$$

です。

同じ基礎公理が、関数解析では強力な正の存在定理を、測度論では「測れない集合」の存在を生みます。

---

## 14. ここまでの測度論と集合論のつながり

ここまでの深掘りを並べると

$$
\text{集合}
\to
\text{選択公理}
\to
\text{Zorn}
$$

と

$$
\text{測度}
\to
\text{外測度}
\to
\text{Carathéodory}
\to
\text{Lebesgue測度}
\to
\text{Vitali集合}
$$

がつながりました。

統計学の入口から見るとだいぶ遠くまで来ましたが、各章は前章までの語彙だけで読めるようにしてあります。

---

## 15. 演習

### F0-00D5-A01 同じ同値類かを判定する

- Level: A
- 目安時間: 8分

次の各組が Vitali 同値関係で同値か判定せよ。

1. $x=1/5$, $y=4/5$
2. $x=0$, $y=\sqrt2/2$

<!-- solution-start -->
### 詳細解答

定義は

$$
x\sim y
\iff
x-y\in\mathbb Q
$$

です。

1. 
$$
   \frac15-\frac45=-\frac35\in\mathbb Q
$$
   なので $1/5\sim4/5$ です。

2. 
$$
   0-\frac{\sqrt2}{2}
   =
   -\frac{\sqrt2}{2}
   \notin\mathbb Q
$$
   なので $0\not\sim\sqrt2/2$ です。

判定に使うのは距離の大小ではなく、差が有理数かどうかです。
<!-- solution-end -->

### F0-00D5-A02 代表元は同じ同値類に二つ存在しない

- Level: A
- 目安時間: 8分

$V$ を Vitali集合とする。$v_1,v_2\in V$ かつ $v_1-v_2\in\mathbb Q$ なら $v_1=v_2$ を示せ。

<!-- solution-start -->
### 詳細解答

$v_1-v_2\in\mathbb Q$ なので、Vitali 同値関係の定義から

$$
v_1\sim v_2.
$$

したがって $v_1,v_2$ は同じ同値類に属します。一方、Vitali集合は **各同値類から代表元をちょうど一つ** 選んだ集合です。よって同じ同値類に属する二つの元がともに $V$ に入るなら、それらは同じ代表元でなければならず、

$$
v_1=v_2.
$$
<!-- solution-end -->

### F0-00D5-A03 異なる有理数平行移動の互いに素性

- Level: A
- 目安時間: 10分

$q_1,q_2\in\mathbb Q\cap[-1,1]$、$q_1\ne q_2$ とする。

$$
(V+q_1)\cap(V+q_2)=\varnothing
$$

を示せ。

<!-- solution-start -->
### 詳細解答

反対に、ある

$$
x\in(V+q_1)\cap(V+q_2)
$$

が存在すると仮定します。すると $v_1,v_2\in V$ があって

$$
x=v_1+q_1=v_2+q_2.
$$

従って

$$
v_1-v_2=q_2-q_1\in\mathbb Q.
$$

A02 より $v_1=v_2$ です。上の等式へ戻すと

$$
q_1=q_2
$$

となり、仮定 $q_1\ne q_2$ に矛盾します。従って交わりは空です。
<!-- solution-end -->

### F0-00D5-A04 平行移動族の上下の包含

- Level: A
- 目安時間: 10分

$$
U
=
\bigcup_{q\in\mathbb Q\cap[-1,1]}(V+q)
$$

と置く。

$$
[0,1]\subset U\subset[-1,2]
$$

を示せ。

<!-- solution-start -->
### 詳細解答

まず $x\in[0,1]$ を任意に取ります。$x$ の同値類から選ばれた代表元を $v\in V$ とすると

$$
x-v\in\mathbb Q.
$$

さらに $x,v\in[0,1]$ だから

$$
-1\le x-v\le1.
$$

そこで $q=x-v$ と置けば $q\in\mathbb Q\cap[-1,1]$ で

$$
x=v+q\in V+q\subset U.
$$

よって $[0,1]\subset U$ です。

逆に $y\in U$ なら、ある $v\in V\subset[0,1]$ と $q\in[-1,1]$ があって $y=v+q$ です。従って

$$
-1\le y\le2,
$$

なので $U\subset[-1,2]$ です。
<!-- solution-end -->

### F0-00D5-B01 選択公理を使う位置を集合族で書く

- Level: B
- 目安時間: 15分

$[0,1]/\!\sim$ を Vitali 同値関係による同値類全体とする。Vitali集合の構成で選択公理を使う箇所を、「非空集合族からの選択関数」という形で書け。

<!-- solution-start -->
### 詳細解答

同値類全体

$$
[0,1]/\!\sim
$$

の各元 $C$ は、$[0,1]$ の非空部分集合です。したがって

$$
\mathscr C
=
\{C:C\in[0,1]/\!\sim\}
$$

は非空集合からなる集合族です。

選択公理をこの集合族へ適用すると、各 $C\in\mathscr C$ に対して

$$
s(C)\in C
$$

を同時に選ぶ選択関数 $s$ が存在します。そこで

$$
V
=
\{s(C):C\in\mathscr C\}
$$

と置けば、各同値類 $C$ と $V$ の共通部分はちょうど $s(C)$ の1点です。

この **選択関数 $s$ の存在を保証する段階** が選択公理を使う箇所です。その後の平行移動・互いに素性・測度の矛盾には選択公理を再度使いません。
<!-- solution-end -->

### F0-00D5-B02 Vitali集合を可測と仮定して矛盾を導く

- Level: B
- 目安時間: 18分

$V$ が Lebesgue 可測であると仮定し、

$$
U
=
\bigsqcup_{q\in\mathbb Q\cap[-1,1]}(V+q)
$$

とする。$\lambda(V)=0$ と $\lambda(V)>0$ の二場合でそれぞれ矛盾を導け。

<!-- solution-start -->
### 詳細解答

[D4 の Lebesgue測度の平行移動不変性](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#cor-f0-00d4-lebesgue-translation-invariance)から、全ての $q$ について

$$
\lambda(V+q)=\lambda(V).
$$

A03 より平行移動族は互いに素なので、可算加法性から

$$
\lambda(U)
=
\sum_{q\in\mathbb Q\cap[-1,1]}\lambda(V).
$$

まず $\lambda(V)=0$ なら右辺は0です。従って $\lambda(U)=0$。しかし A04 より $[0,1]\subset U$ なので単調性から

$$
1=\lambda([0,1])\le\lambda(U)=0,
$$

となり矛盾します。

次に $\lambda(V)>0$ なら、正の同じ値を可算無限個加えるので

$$
\lambda(U)=\infty.
$$

一方 A04 より $U\subset[-1,2]$ だから

$$
\lambda(U)\le\lambda([-1,2])=3.
$$

これも矛盾です。従って $V$ は Lebesgue 可測ではありません。
<!-- solution-end -->

### F0-00D5-B03 全ての部分集合を測ることができない理由

- Level: B
- 目安時間: 20分

$m:2^{\mathbb R}\to[0,\infty]$ が次を全て満たすと仮定する。

1. 互いに素な可算和に対して可算加法的。
2. $m(A+t)=m(A)$ が全ての $A\subset\mathbb R,t\in\mathbb R$ で成り立つ。
3. $m([a,b])=b-a$ が全ての $a<b$ で成り立つ。

Vitali集合 $V$ を使って矛盾を導け。

<!-- solution-start -->
### 詳細解答

$U=\bigcup_{q\in\mathbb Q\cap[-1,1]}(V+q)$ と置きます。

まず $q_1\ne q_2$ で $(V+q_1)\cap(V+q_2)$ に点 $x$ があると仮定すると、

$$
x=v_1+q_1=v_2+q_2
$$

となる $v_1,v_2\in V$ が存在し、

$$
v_1-v_2=q_2-q_1\in\mathbb Q.
$$

Vitali集合は一つの同値類から代表を一つしか取らないので $v_1=v_2$、従って $q_1=q_2$ となって矛盾します。よって $(V+q)$ は互いに素です。

次に $x\in[0,1]$ なら、その同値類の代表 $v\in V$ に対して

$$
q=x-v\in\mathbb Q\cap[-1,1]
$$

であり、$x\in V+q\subset U$ です。従って $[0,1]\subset U$。

逆に $v\in V\subset[0,1]$、$q\in[-1,1]$ なら $-1\le v+q\le2$ なので $U\subset[-1,2]$ です。以上から

$$
[0,1]\subset U\subset[-1,2].
$$

平行移動不変性から

$$
m(V+q)=m(V)
$$

なので、可算加法性より

$$
m(U)
=
\sum_{q\in\mathbb Q\cap[-1,1]}m(V).
$$

$m(V)=0$ なら $m(U)=0$ ですが、単調性は可算加法性と非負性から従うので

$$
1=m([0,1])\le m(U)=0
$$

となります。

$m(V)>0$ なら $m(U)=\infty$ ですが、

$$
m(U)\le m([-1,2])=3
$$

となり矛盾します。

したがって、区間長との一致・平行移動不変性・可算加法性を保ったまま、全ての実数部分集合へ測度を定義することはできません。
<!-- solution-end -->

### F0-00D5-C01 Vitali集合の外側と可測な内側

- Level: C
- 目安時間: 25分

Vitali集合 $V$ について次を示せ。

1. Lebesgue外測度は
$$
   \lambda^*(V)>0
$$
   である。
2. Lebesgue可測集合 $E\subset V$ は必ず
$$
   \lambda(E)=0
$$
   を満たす。

<!-- solution-start -->
### 詳細解答

#### 1. $\lambda^*(V)>0$

反対に $\lambda^*(V)=0$ と仮定します。D4 の平行移動不変性から

$$
\lambda^*(V+q)=0
$$

が全ての $q\in\mathbb Q\cap[-1,1]$ で成り立ちます。

外測度の可算劣加法性より

$$
\lambda^*(U)
\le
\sum_q\lambda^*(V+q)
=0,
$$

ただし

$$
U=\bigcup_q(V+q).
$$

従って $\lambda^*(U)=0$ です。しかし $[0,1]\subset U$ です。$U$ の任意の開区間被覆はそのまま $[0,1]$ の被覆でもあるため、外測度の定義から

$
\lambda^*([0,1])
\le
\lambda^*(U).
$

一方 D4 で $\lambda^*([0,1])=1$ を示したので

$
1
=
\lambda^*([0,1])
\le
\lambda^*(U)
=0,
$

となり矛盾します。従って $\lambda^*(V)>0$ です。

#### 2. 可測な $E\subset V$ は測度0

$E\subset V$ が Lebesgue 可測で、反対に

$$
\lambda(E)>0
$$

と仮定します。

$q_1\ne q_2$ とし、もし

$$
x\in(E+q_1)\cap(E+q_2)
$$

なら、$e_1,e_2\in E\subset V$ が存在して

$$
x=e_1+q_1=e_2+q_2.
$$

従って

$$
e_1-e_2=q_2-q_1\in\mathbb Q.
$$

$e_1,e_2$ はともに Vitali集合 $V$ の元なので、同じ同値類に属するなら $e_1=e_2$ です。すると $q_1=q_2$ となり仮定に反します。よって $(E+q)$ も互いに素です。

また $E\subset[0,1]$ なので

$$
\bigcup_{q\in\mathbb Q\cap[-1,1]}(E+q)
\subset[-1,2].
$$

[D4 の Lebesgue測度の平行移動不変性](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#cor-f0-00d4-lebesgue-translation-invariance)と可算加法性から左辺の測度は

$$
\sum_q\lambda(E)=\infty.
$$

一方、単調性からその測度は高々

$$
\lambda([-1,2])=3
$$

です。矛盾したので $\lambda(E)=0$ です。

したがって Vitali集合は、外側から見れば正の外測度を持つ一方、その内部に入る Lebesgue 可測部分集合は全て測度0です。これが「単に測度をまだ計算していない」のではなく、可測性そのものが壊れていることを強く示しています。
<!-- solution-end -->

---

## 章末チェック

- $x-y\in\mathbb Q$ による同値関係を説明できる。
- 各同値類から代表元を選ぶ箇所で選択公理が使われることを説明できる。
- Vitali集合の有理数平行移動が互いに素であることを示せる。
- 平行移動族が $[0,1]$ を覆い $[-1,2]$ に入ることを示せる。
- $\lambda(V)=0$ と $\lambda(V)>0$ の両方で矛盾が出ることを説明できる。
- 全ての実数部分集合をLebesgue可測にできない理由を説明できる。
- σ代数が確率論で必要な理由を非可測集合の存在から説明できる。
- 選択公理がHahn--BanachとVitali集合の両方に現れることを説明できる。
