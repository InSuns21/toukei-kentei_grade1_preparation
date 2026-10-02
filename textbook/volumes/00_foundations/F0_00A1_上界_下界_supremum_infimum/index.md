# F0-00A1 実解析基礎：上限・下限・supremum・infimum

<!-- definition-example-audit: strict -->

[F0-00A1D](../F0_00A1D_順序_全順序_最小最大_整列/index.md) では、一般の半順序集合で上界・下界、最小元・最大元を定義しました。ここからは順序を実数の通常の大小関係 $\le$ に固定します。

実解析で繰り返し起こるのは、

> 集合の中に最大値がなくても、「これ以上は上へ行けない境界」は存在し得る

という状況です。例えば $(0,1)$ には最大元がありませんが、上側の境界は $1$ です。

この章では

$$
\boxed{
\text{上界・下界}
\to
\text{最小上界・最大下界}
\to
\text{上限・下限}
\to
\text{値が実際に達成されるか}
}
$$

を分けて扱います。

---

## 1. 実数集合を上から・下から抑える

空でない集合 $A\subseteq\mathbb R$ を考えます。

$M\in\mathbb R$ が $A$ の上界であるとは

$$
a\le M
\qquad(\forall a\in A)
$$

となることでした。下界 $m$ は

$$
m\le a
\qquad(\forall a\in A)
$$

を満たす実数です。

例えば

$$
A=(0,1)
$$

なら $1,2,100$ は全て上界で、$0,-1,-100$ は全て下界です。

上界・下界が存在するかどうか自体も、後の存在定理の仮定になります。そこで「少なくとも一つ上界がある」「少なくとも一つ下界がある」という性質に名前を付けます。

<a id="def-f0-00a1-boundedness"></a>

<!-- formal-statement-start -->
> **定義（上に有界・下に有界）**  
> 集合 $A\subseteq\mathbb R$ に上界が少なくとも一つ存在するとき、$A$ は **上に有界** であるという。  
> 集合 $A\subseteq\mathbb R$ に下界が少なくとも一つ存在するとき、$A$ は **下に有界** であるという。
<!-- formal-statement-end -->

---

## 2. 上限と下限

上界は普通たくさんあります。その中で最も小さい上界を境界値として取り出します。

<a id="def-f0-00a1-supremum"></a>

<!-- formal-statement-start -->
> **定義（上限）**  
> 空でなく上に有界な $A\subseteq\mathbb R$ に対し、$s\in\mathbb R$ が
>
> 1. $s$ は $A$ の上界である。
> 2. 任意の上界 $u$ に対して $s\le u$ である。
>
> を満たすとき、$s$ を $A$ の **上限（supremum）** といい
>
$$
s=\sup A
$$
>
> と書く。
<!-- formal-statement-end -->

上側の境界だけでなく下側の境界も同じ発想で取り出せます。上界の「最小」を考えたのと上下を反転し、下界の中で最も大きいものを定義します。

<a id="def-f0-00a1-infimum"></a>

<!-- formal-statement-start -->
> **定義（下限）**  
> 空でなく下に有界な $A\subseteq\mathbb R$ に対し、$t\in\mathbb R$ が
>
> 1. $t$ は $A$ の下界である。
> 2. 任意の下界 $l$ に対して $l\le t$ である。
>
> を満たすとき、$t$ を $A$ の **下限（infimum）** といい
>
$$
t=\inf A
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1-supremum, def-f0-00a1-infimum -->
### 2.1 定義の確認：開区間

$$
A=(0,1)
$$

では $1$ は上界です。しかも $u<1$ なら

$$
a=\frac{u+1}{2}
$$

を取ることで $u<a<1$ となるので、$u$ は上界ではありません。従って

$$
\sup(0,1)=1.
$$

同様に

$$
\inf(0,1)=0.
$$
<!-- definition-example-end -->

ここで $0,1\notin(0,1)$ です。上限・下限は集合の外にあっても構いません。

---

## 3. maximum / minimum は「達成された境界」

最大元 $\max A$ は $A$ 自身の要素でなければなりません。一方、$\sup A$ は $A$ の外にあっても構いません。

$$
A=(0,1]
$$

なら

$$
\sup A=\max A=1,
\qquad
\inf A=0
$$

ですが、$0\notin A$ なので $\min A$ は存在しません。

従って

$$
\boxed{
\text{上限・下限は境界値}
\qquad
\text{最大・最小は集合内で実際に達成された値}
}
$$

と分ける必要があります。

---

## 4. 上限の $\varepsilon$ 特徴付け

上限を証明で使うときは、「上界である」と「少し下へ動かすと上界でなくなる」に分解すると扱いやすくなります。この二条件をまとめた **上限の ε 特徴付け** を、後続の収束証明で使える形にしておきます。

<a id="prop-f0-00a1-sup-epsilon"></a>

<!-- formal-statement-start -->
> **命題（上限の $\varepsilon$ 特徴付け）**  
> 空でなく上に有界な $A\subseteq\mathbb R$ と $s\in\mathbb R$ について、$s=\sup A$ であることは
>
> 1. $a\le s$ が全ての $a\in A$ で成り立つ。
> 2. 任意の $\varepsilon>0$ に対し、ある $a\in A$ が存在して
>
$$
s-\varepsilon<a
$$
>
> となる。
>
> ことと同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $s=\sup A$ とします。$s$ は上界なので1が成り立ちます。

任意の $\varepsilon>0$ を取ります。もし $s-\varepsilon$ も $A$ の上界なら、$s$ より小さい上界が存在することになり、$s$ が最小上界であることに反します。従って $s-\varepsilon$ は上界ではありません。よってある $a\in A$ が存在して

$$
s-\varepsilon<a
$$

となります。

逆に1と2を仮定します。1から $s$ は上界です。もし $u<s$ である上界 $u$ が存在したとすると

$$
\varepsilon=s-u>0
$$

と置けます。2からある $a\in A$ が

$$
u=s-\varepsilon<a
$$

を満たします。これは $u$ が上界であることに反します。従って $s$ より小さい上界は存在せず、$s=\sup A$ です。$\square$
<!-- proof-end -->

下限についても上下を反転すれば同様に

$$
t=\inf A
$$

であることは、$t\le a$ と、任意の $\varepsilon>0$ に対して

$$
a<t+\varepsilon
$$

となる $a\in A$ が存在することと同値です。

この特徴付けが、RA1 の有界単調数列の収束証明でそのまま使われます。

---

## 5. 最適化でなぜ infimum から始めるのか

集合 $C$ 上で関数 $f$ を最小化するとき

$$
\inf_{x\in C}f(x)
$$

は、最小点が存在するか分からなくても「可能な値の下側の境界」として考えられます。

例えば

$$
C=(0,1),
\qquad
f(x)=x
$$

なら

$$
\inf_{x\in C}f(x)=0
$$

ですが、$f(x)=0$ を達成する $x\in C$ はありません。

したがって最適化では

$$
\boxed{
\text{まず infimum を特定する}
\to
\text{その値を達成する点が存在するかを別に証明する}
}
$$

という順番になります。

---

## 6. 演習

### F0-00A1-A01 上限と最大値を区別する

- Level: A
- 目安時間: 8分

$A=(0,1]$ について $\sup A,\inf A,\max A,\min A$ を求め、存在しないものを明記せよ。

<!-- solution-start -->
#### 詳細解答

上側では $1\in A$ かつ全ての $a\in A$ に $a\le1$ なので

$$
\sup A=\max A=1.
$$

下側では $0$ が最大の下界なので $\inf A=0$ です。しかし $0\notin A$ なので最小元は存在しません。
<!-- solution-end -->

### F0-00A1-A02 開区間の上限・下限

- Level: A
- 目安時間: 8分

$A=(-3,5)$ について $\sup A,\inf A$ を求め、それぞれが $A$ の元として達成されるか判定せよ。

<!-- solution-start -->
#### 詳細解答

$5$ は上界です。任意の $u<5$ に対して

$$
a=\frac{u+5}{2}
$$

と置けば $u<a<5$ なので $u$ は上界ではありません。従って $\sup A=5$。

同様に $\inf A=-3$。ただし $-3,5\notin A$ なので、どちらも集合内では達成されません。
<!-- solution-end -->

### F0-00A1-A03 値域の上限・下限

- Level: A
- 目安時間: 8分

$A=[-2,3]$ とし

$$
B=\{2x+1:x\in A\}
$$

とする。$\sup B,\inf B$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$x\in[-2,3]$ なら

$$
-3\le2x+1\le7.
$$

端点 $x=-2,3$ が $A$ に属するので両端値は実際に達成されます。従って

$$
\inf B=-3,\qquad \sup B=7.
$$
<!-- solution-end -->

### F0-00A1-A04 半直線の上限と最大元

- Level: A
- 目安時間: 8分

$$
A=\{x\in\mathbb R:x<3\}
$$

について、$\sup A$ を求め、最大元が存在するか判定せよ。

<!-- solution-start -->
#### 詳細解答

$A$ の任意の $x$ は $x<3$ を満たすので、$3$ は上界です。

次に $u<3$ とします。

$$
a=\frac{u+3}{2}
$$

と置けば

$$
u<a<3.
$$

従って $a\in A$ かつ $u<a$ なので、$u$ は上界ではありません。よって

$$
\sup A=3.
$$

一方 $3\notin A$ です。また任意の $x\in A$ に対して $(x+3)/2\in A$ かつ $x<(x+3)/2$ なので、$A$ には最大元がありません。
<!-- solution-end -->

### F0-00A1-B01 平行移動と上限

- Level: B
- 目安時間: 12分

空でなく上に有界な $A\subseteq\mathbb R$ と $c\in\mathbb R$ に対し

$$
A+c=\{a+c:a\in A\}
$$

と置く。$\sup(A+c)=\sup A+c$ を上限の定義から示せ。

<!-- solution-start -->
#### 詳細解答

$s=\sup A$ とします。任意の $a\in A$ について $a\le s$ だから

$$
a+c\le s+c.
$$

従って $s+c$ は $A+c$ の上界です。

次に $u<s+c$ とします。すると $u-c<s$。$s$ は最小上界なので $u-c$ は $A$ の上界ではありません。従ってある $a\in A$ が存在して

$$
u-c<a.
$$

両辺に $c$ を足せば $u<a+c$。よって $u$ は $A+c$ の上界ではありません。従って

$$
\sup(A+c)=s+c.
$$
<!-- solution-end -->

### F0-00A1-B02 二集合の和集合の上限

- Level: B
- 目安時間: 12分

空でなく上に有界な $A,B\subseteq\mathbb R$ に対して

$$
\sup(A\cup B)=\max\{\sup A,\sup B\}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$s=\sup A$、$t=\sup B$、$M=\max\{s,t\}$ とします。

$a\in A$ なら $a\le s\le M$、$b\in B$ なら $b\le t\le M$ なので、$M$ は $A\cup B$ の上界です。

一方 $u<M$ とします。$M=s$ なら $u<s$ なので $u$ は $A$ の上界ではなく、ある $a\in A$ が $u<a$ を満たします。従って $u$ は $A\cup B$ の上界でもありません。$M=t$ の場合も同様です。

よって $M$ が最小上界です。
<!-- solution-end -->

### F0-00A1-B03 下限を上限へ変換する

- Level: B
- 目安時間: 12分

空でなく下に有界な $A\subseteq\mathbb R$ に対し

$$
-A=\{-a:a\in A\}
$$

と置く。$\inf A=-\sup(-A)$ を示せ。

<!-- solution-start -->
#### 詳細解答

$s=\sup(-A)$ とします。任意の $a\in A$ に対して $-a\le s$ なので

$$
-s\le a.
$$

従って $-s$ は $A$ の下界です。

もし $l>-s$ が下界なら、$-l<s$ です。$l\le a$ を符号反転すると $-a\le-l$ なので、$-l$ は $-A$ の上界になります。これは $s$ が最小上界であることに反します。

従って $-s$ が最大下界であり

$$
\inf A=-\sup(-A).
$$
<!-- solution-end -->

### F0-00A1-C01 集合の和の上限

- Level: C
- 目安時間: 18分

空でなく上に有界な $A,B\subseteq\mathbb R$ に対し

$$
A+B=\{a+b:a\in A,\ b\in B\}
$$

と置く。次を証明せよ。

$$
\sup(A+B)=\sup A+\sup B.
$$

<!-- solution-start -->
#### 詳細解答

$s=\sup A$、$t=\sup B$ とします。任意の $a\in A,b\in B$ に対し $a\le s,b\le t$ だから

$$
a+b\le s+t.
$$

従って $s+t$ は $A+B$ の上界です。

次に任意の $\varepsilon>0$ を取ります。上限の $\varepsilon$ 特徴付けから、ある $a\in A$ と $b\in B$ が存在して

$$
s-\frac{\varepsilon}{2}<a,
\qquad
t-\frac{\varepsilon}{2}<b
$$

となります。二式を足すと

$$
s+t-\varepsilon<a+b.
$$

従って $s+t-\varepsilon$ は $A+B$ の上界ではありません。任意の $\varepsilon>0$ でこれが成り立つので、上限の $\varepsilon$ 特徴付けから

$$
\sup(A+B)=s+t.
$$
<!-- solution-end -->

---

## 7. 次に進む

ここでは「上限とは何か」を定義しました。しかし、空でなく上に有界な実数集合に上限が**必ず存在するか**はまだ別問題です。

**次：[F0-00A1B 実数の上限性質・Archimedes 性](../F0_00A1B_実数の上限性質_Archimedes性/index.md)**
