# GRP4 抽象代数 IV：素数から有限群の構造を読む

<!-- definition-example-audit: strict -->

[GRP3](../GRP3/index.md) では、群作用・軌道・安定化群・共役類・類等式を構成し、有限 $p$-群の中心が非自明であることまで証明しました。本章では、その数え上げをさらに押し進めます。

有限群の位数を素因数分解すると、各素数 $p$ に対応する最大の $p$-部分群が存在し、それらは互いに共役で、個数にも強い合同条件が付きます。これが Cauchy の定理と Sylow の三定理です。

主線は

$$
p\mid |G|
\longrightarrow
\text{位数 }p\text{ の元}
\longrightarrow
\text{最大の }p\text{-部分群}
\longrightarrow
\text{共役と個数}
\longrightarrow
\text{有限群の構造判定}
$$

です。

> **この章の停止線**
>
> Sylow 理論を使った有限群の標準的な構造判定と、正規部分群と補部分群による分解の入口までを扱います。一般の群拡大、群コホモロジー、有限単純群の分類、一般表現論へは進みません。

---

## 1. 素数が群の位数を割ると何が起こるか

Lagrange の定理は「元の位数は群の位数を割る」と述べます。しかし逆向き、

$$
p\mid |G|
\quad\Longrightarrow\quad
\text{位数 }p\text{ の元が存在するか}
$$

は Lagrange の定理だけでは分かりません。

この逆向きを保証するのが Cauchy の定理です。

<a id="thm-grp4-cauchy"></a>
<!-- formal-statement-start -->
> **定理（有限群の Cauchy の定理）**
>
> $G$ を有限群、$p$ を素数とする。
>
> $p\mid |G|$ なら、$G$ には位数 $p$ の元が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

集合

$$
X=
\left\{
(x_1,\ldots,x_p)\in G^p:
x_1x_2\cdots x_p=e
\right\}
$$

を考えます。

最後の成分は最初の $p-1$ 成分から一意に決まるので

$$
|X|=|G|^{p-1}.
$$

ここへ $p$ 個の成分を巡回させる作用を入れます。軌道の大きさは $1$ または $p$ なので、固定点の個数は $|X|$ と法 $p$ で同じになります。

<!-- proof-start -->
### 証明

巡回群

$$
C_p=\langle \sigma\rangle
$$

を $X$ に

$$
\sigma\cdot(x_1,x_2,\ldots,x_p)
=
(x_2,\ldots,x_p,x_1)
$$

で作用させます。

まずこの巡回移動が $X$ を保つことを確認します。

$$
x_1x_2\cdots x_p=e
$$

なら

$$
x_2\cdots x_p
=
x_1^{-1}.
$$

従って

$$
x_2\cdots x_p x_1
=
x_1^{-1}x_1
=
e.
$$

よって巡回移動後の組も $X$ に属します。

各軌道の大きさは、[軌道・安定化群公式](../GRP3/index.md#thm-grp3-orbit-stabilizer)から $|C_p|=p$ の約数です。従って各軌道の大きさは

$$
1
\quad\text{または}\quad
p.
$$

$C_p$ の作用で固定される点は

$$
(x_1,\ldots,x_p)
=
(x,x,\ldots,x)
$$

という形です。さらに $X$ に属するためには

$$
x^p=e
$$

が必要十分です。

固定点全体を $X^{C_p}$ と書くと、固定点でない軌道は全て大きさ $p$ なので

$$
|X|
\equiv
|X^{C_p}|
\pmod p.
$$

一方

$$
|X|
=
|G|^{p-1}.
$$

仮定 $p\mid |G|$ から

$$
|X|\equiv0\pmod p.
$$

従って

$$
|X^{C_p}|
\equiv0\pmod p.
$$

恒等元 $e$ は $e^p=e$ を満たすので、少なくとも固定点

$$
(e,\ldots,e)
$$

が1つ存在します。

固定点の個数は正の $p$ の倍数なので、実は少なくとも $p$ 個あります。従って $e$ 以外にも

$$
x^p=e
$$

を満たす元 $x\ne e$ が存在します。

$x$ の位数は $p$ の約数であり、$x\ne e$ なので位数は $1$ ではありません。$p$ は素数だから

$$
\operatorname{ord}(x)=p.
$$

これで位数 $p$ の元が得られました。$\square$
<!-- proof-end -->

この証明の要点は、非可換群でも成分の巡回移動が積 $e$ という条件を保つことです。任意の置換で成分を並べ替えてよいわけではありません。

---

## 2. $p$-部分群と Sylow 部分群

<a id="def-grp4-p-subgroup-sylow"></a>
<!-- formal-statement-start -->
> **定義（p-部分群・Sylow p-部分群）**
>
> $G$ を有限群、$p$ を素数とする。
>
> 部分群 $P\le G$ の位数が $p$ の冪
>
$$
|P|=p^r
$$
>
> であるとき、$P$ を **$p$-部分群**という。
>
> また
>
$$
|G|=p^n m,
\qquad
p\nmid m
$$
>
> と書いたとき、位数が
>
$$
|P|=p^n
$$
>
> である $p$-部分群を **Sylow $p$-部分群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp4-p-subgroup-sylow -->
**定義の確認**

例：$S_3$ の Sylow 部分群

$$
|S_3|=6=2\cdot3.
$$

$p=3$ については

$$
P_3=\langle(1\,2\,3)\rangle
=
\{e,(1\,2\,3),(1\,3\,2)\}
$$

が位数3なので Sylow $3$-部分群です。

$p=2$ については

$$
P_2=\langle(1\,2)\rangle
=
\{e,(1\,2)\}
$$

が位数2なので Sylow $2$-部分群です。

一方 $\{e\}$ は $2$-部分群でも $3$-部分群でもありますが、最大の素数冪位数を持たないので Sylow 部分群ではありません。
<!-- definition-example-end -->

「最大」とは包含関係で何となく大きいという意味ではなく、群の位数に含まれる $p$ の冪を全て取り切った

$$
p^n
$$

という位数を持つことです。

そのような最大の $p$-部分群が本当に存在することを、次に証明します。

---

## 3. 最大の $p$-部分群は必ず存在する

<a id="thm-grp4-sylow-first"></a>
<!-- formal-statement-start -->
> **定理（Sylow の第一定理）**
>
> 有限群 $G$ の位数を
>
$$
|G|=p^n m,
\qquad
p\nmid m
$$
>
> とする。
>
> このとき $G$ は位数 $p^n$ の部分群を持つ。すなわち Sylow $p$-部分群が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$|G|$ に関する帰納法を使います。

- 中心の位数が $p$ で割れるなら、Cauchy の定理で中心に位数 $p$ の部分群を作り、その商群で帰納法を使う。
- 中心の位数が $p$ で割れないなら、類等式から指数が $p$ で割れない真の中心化群を見つけ、その中心化群の中で帰納法を使う。

GRP3 の類等式が Sylow 理論へ直接つながる箇所です。

<!-- proof-start -->
### 証明

$n=0$ なら $p\nmid |G|$ であり、位数 $1=p^0$ の自明部分群が条件を満たします。

以下 $n\ge1$ とし、$|G|$ に関する帰納法を使います。

#### 場合1：$p\mid |Z(G)|$

[有限群の Cauchy の定理](#thm-grp4-cauchy)を中心 $Z(G)$ に適用すると、位数 $p$ の元

$$
z\in Z(G)
$$

が存在します。

$$
C=\langle z\rangle
$$

と置けば

$$
|C|=p.
$$

しかも $C\subset Z(G)$ なので

$$
C\trianglelefteq G.
$$

従って商群 $G/C$ が作れ、その位数は

$$
|G/C|
=
\frac{|G|}{|C|}
=
p^{n-1}m.
$$

$n=1$ なら $G/C$ の自明部分群を取ります。$n\ge2$ なら $|G/C|<|G|$ なので帰納法を適用できます。

いずれの場合も $G/C$ には位数

$$
p^{n-1}
$$

の部分群 $\overline P$ が存在します。

標準射影

$$
\pi:G\to G/C
$$

に対し

$$
P=\pi^{-1}(\overline P)
$$

と置きます。

$C=\ker\pi$ かつ $C\subset P$ なので、[対応定理](../GRP2/index.md#thm-grp2-correspondence)から

$$
P/C\cong\overline P.
$$

従って

$$
|P|
=
|C|\,|\overline P|
=
p\cdot p^{n-1}
=
p^n.
$$

よって $P$ は Sylow $p$-部分群です。

#### 場合2：$p\nmid |Z(G)|$

[群の類等式](../GRP3/index.md#thm-grp3-class-equation)を

$$
|G|
=
|Z(G)|
+
\sum_i [G:C_G(x_i)]
$$

と書きます。ここで $x_i$ は非中心共役類の代表元です。

左辺は $p$ で割れますが、仮定から $|Z(G)|$ は $p$ で割れません。

もし全ての

$$
[G:C_G(x_i)]
$$

が $p$ で割れるなら、右辺を法 $p$ で見たとき

$$
0
\equiv
|Z(G)|
\not\equiv0
\pmod p
$$

となり矛盾します。

従ってある $i$ について

$$
p\nmid [G:C_G(x_i)].
$$

[群論の Lagrange の定理](../GRP2/index.md#thm-grp2-lagrange)から

$$
|G|
=
[G:C_G(x_i)]\,|C_G(x_i)|.
$$

左辺に含まれる $p^n$ は指数側には1つも含まれないので

$$
p^n\mid |C_G(x_i)|.
$$

しかも $x_i$ は非中心元なので

$$
C_G(x_i)\ne G.
$$

従って $C_G(x_i)$ は $G$ より小さい真の部分群です。

帰納法を $C_G(x_i)$ に適用すると、その中に位数 $p^n$ の部分群 $P$ が存在します。もちろん

$$
P\le C_G(x_i)\le G.
$$

よって $P$ は $G$ の Sylow $p$-部分群です。

以上の2場合で存在が示されました。$\square$
<!-- proof-end -->

ここで中心が大きければ商群へ降り、中心が小さければ中心化群へ潜る、という二分法が働いています。

---

## 4. $p$-群が有限集合へ作用すると固定点が残る

Sylow の第二・第三定理では、$p$-群の作用を繰り返し使います。

<a id="prop-grp4-pgroup-fixed-point-counting"></a>
<!-- formal-statement-start -->
> **命題（p-群作用の固定点の法 p 数え上げ）**
>
> 有限 $p$-群 $Q$ が有限集合 $X$ に作用しているとする。
>
> 全ての $Q$ の元で固定される点の集合を
>
$$
X^Q=
\{x\in X:q\cdot x=x\ \text{for all }q\in Q\}
$$
>
> とすると
>
$$
|X|
\equiv
|X^Q|
\pmod p.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X$ を $Q$-軌道に分割します。

各 $x\in X$ について、[軌道・安定化群公式](../GRP3/index.md#thm-grp3-orbit-stabilizer)から

$$
|Qx|
=
[Q:Q_x].
$$

$|Q|$ は $p$ の冪なので、軌道の大きさも $p$ の冪です。

軌道の大きさが1なら、その点は $Q$ の全要素で固定されます。

軌道の大きさが1より大きければ

$$
p\mid |Qx|.
$$

従って軌道分解を法 $p$ で数えると、大きさ1の軌道だけが残り

$$
|X|
\equiv
|X^Q|
\pmod p.
$$

$\square$
<!-- proof-end -->

この命題は「$p$-群の作用では、非固定軌道は $p$ 個ずつ消える」という数え上げです。

---

## 5. 全ての $p$-部分群を最大の $p$-部分群へ共役で入れる

<a id="thm-grp4-sylow-second"></a>
<!-- formal-statement-start -->
> **定理（Sylow の第二定理）**
>
> $G$ を有限群、$P$ を Sylow $p$-部分群、$Q$ を任意の $p$-部分群とする。
>
> このとき、ある $g\in G$ が存在して
>
$$
Q\le gPg^{-1}.
$$
>
> 特に $Q$ 自身が Sylow $p$-部分群なら
>
$$
Q=gPg^{-1}.
$$
>
> 従って Sylow $p$-部分群は全て互いに共役である。
<!-- formal-statement-end -->

### 証明の見取り図

$Q$ を左剰余類集合 $G/P$ に左から作用させます。

$$
|G/P|
=
[G:P]
$$

は $p$ で割れません。一方、固定点が1つもなければ、全ての軌道が $p$ の倍数個の点を持つので全体も $p$ の倍数になってしまいます。

したがって固定剰余類が存在し、その固定条件を共役包含へ読み替えます。

<!-- proof-start -->
### 証明

$Q$ を左剰余類集合

$$
G/P
$$

へ

$$
q\cdot(gP)=qgP
$$

で作用させます。

$P$ は Sylow $p$-部分群なので

$$
|G|=p^n m,
\qquad
|P|=p^n,
\qquad
p\nmid m.
$$

従って

$$
|G/P|
=
[G:P]
=
m
$$

は $p$ で割れません。

[p-群作用の固定点の法 $p$ 数え上げ](#prop-grp4-pgroup-fixed-point-counting)から

$$
|G/P|
\equiv
|(G/P)^Q|
\pmod p.
$$

左辺は $p$ で割れないので

$$
|(G/P)^Q|\ne0.
$$

従って $Q$ の全要素で固定される左剰余類

$$
gP
$$

が存在します。

固定されるということは、任意の $q\in Q$ に対し

$$
qgP=gP
$$

ということです。

剰余類の等値条件から

$$
g^{-1}qg\in P.
$$

これは全ての $q\in Q$ について成り立つので

$$
g^{-1}Qg\le P.
$$

両辺を $g$ で共役すれば

$$
Q\le gPg^{-1}.
$$

さらに $Q$ も Sylow $p$-部分群なら

$$
|Q|=|P|=p^n.
$$

包含

$$
Q\le gPg^{-1}
$$

の両辺は同じ有限位数なので

$$
Q=gPg^{-1}.
$$

$\square$
<!-- proof-end -->

第二定理は「Sylow 部分群は存在する」だけでなく、「他の全ての $p$-部分群を、適切な共役でその中へ押し込める」と述べています。

---

## 6. 正規化群から Sylow 部分群の個数を数える

Sylow 部分群が何個あるかを数えるには、その部分群を共役で動かします。

<a id="def-grp4-normalizer"></a>
<!-- formal-statement-start -->
> **定義（部分群の正規化群）**
>
> 群 $G$ の部分群 $H\le G$ に対し
>
$$
N_G(H)
=
\{g\in G:gHg^{-1}=H\}
$$
>
> を $H$ の **正規化群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp4-normalizer -->
**定義の確認**

$S_3$ で

$$
P=\langle(1\,2\,3)\rangle=A_3
$$

とします。

$A_3\trianglelefteq S_3$ なので、全ての $g\in S_3$ に対し

$$
gPg^{-1}=P.
$$

従って

$$
N_{S_3}(P)=S_3.
$$

一方

$$
H=\langle(1\,2)\rangle
$$

とすると、例えば

$$
(1\,2\,3)(1\,2)(1\,2\,3)^{-1}
=
(2\,3)
\notin H.
$$

従って $(1\,2\,3)\notin N_{S_3}(H)$ です。実際

$$
N_{S_3}(H)=H.
$$
<!-- definition-example-end -->

正規化群は実際に部分群です。$a,b\in N_G(H)$ なら

$$
aHa^{-1}=H,
\qquad
bHb^{-1}=H
$$

なので

$$
ab^{-1}H(ab^{-1})^{-1}
=
a(b^{-1}Hb)a^{-1}
=
aHa^{-1}
=
H.
$$

従って部分群判定が使えます。

また

$$
H\trianglelefteq G
\iff
N_G(H)=G.
$$

です。

<a id="thm-grp4-sylow-third"></a>
<!-- formal-statement-start -->
> **定理（Sylow の第三定理）**
>
> 有限群 $G$ の位数を
>
$$
|G|=p^n m,
\qquad
p\nmid m
$$
>
> とする。
>
> Sylow $p$-部分群の個数を $n_p$ とすると
>
$$
n_p\mid m
$$
>
> かつ
>
$$
n_p\equiv1\pmod p.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Sylow $p$-部分群を1つ固定して $P$ とします。

[Sylow の第二定理](#thm-grp4-sylow-second)から、全ての Sylow $p$-部分群は $P$ の共役

$$
gPg^{-1}
$$

として得られます。

従って $G$ が Sylow $p$-部分群全体へ共役で作用するとき、$P$ の軌道は Sylow $p$-部分群全体です。

$P$ の安定化群は

$$
\{g\in G:gPg^{-1}=P\}
=
N_G(P).
$$

[軌道・安定化群公式](../GRP3/index.md#thm-grp3-orbit-stabilizer)から

$$
n_p
=
[G:N_G(P)].
$$

しかも

$$
P\le N_G(P).
$$

従って指数の積

$$
[G:P]
=
[G:N_G(P)]
[N_G(P):P]
$$

が成り立ちます。

左辺は

$$
[G:P]=m
$$

なので

$$
n_p=[G:N_G(P)]
\mid m.
$$

これで1つ目の条件が示されました。

次に合同条件を示します。

$P$ 自身を、Sylow $p$-部分群全体の集合

$$
\operatorname{Syl}_p(G)
$$

へ共役で作用させます。

固定点 $Q\in\operatorname{Syl}_p(G)$ は、任意の $x\in P$ に対して

$$
xQx^{-1}=Q
$$

を満たします。すなわち $P$ が $Q$ を正規化します。

このとき $P$ は $Q$ を正規化しているので、集合積

$$
PQ=\{xy:x\in P,\ y\in Q\}
$$

は部分群になります。

実際、$p_1,p_2\in P$、$q_1,q_2\in Q$ に対し

$$
\begin{aligned}
(p_1q_1)(p_2q_2)
&=
p_1p_2
\bigl(p_2^{-1}q_1p_2\bigr)q_2.
\end{aligned}
$$

$P$ は $Q$ を正規化するので

$$
p_2^{-1}q_1p_2\in Q.
$$

従って積は再び $PQ$ に属します。また

$$
(pq)^{-1}
=
q^{-1}p^{-1}
=
p^{-1}\bigl(pq^{-1}p^{-1}\bigr)
\in PQ
$$

なので逆元でも閉じています。

さらに写像

$$
P\times Q\to PQ,
\qquad
(p,q)\mapsto pq
$$

を考えます。$pq=p'q'$ なら

$$
p'^{-1}p
=
q'q^{-1}
\in
P\cap Q.
$$

逆に $r\in P\cap Q$ ごとに

$$
(p',q')
=
(pr^{-1},rq)
$$

は同じ積 $pq$ を与えます。従って各元の逆像はちょうど $|P\cap Q|$ 個で、

$$
|PQ|
=
\frac{|P||Q|}{|P\cap Q|}.
$$

$P,Q$ はともに位数 $p^n$ なので、もし $P\ne Q$ なら

$$
|P\cap Q|<p^n
$$

であり

$$
|PQ|>p^n.
$$

しかも $|PQ|$ は $p$ の冪です。これは $p^n$ が $|G|$ に含まれる最大の $p$ の冪であることに矛盾します。

従って $P$ の作用で固定される Sylow $p$-部分群は

$$
Q=P
$$

ただ1つです。

[p-群作用の固定点の法 $p$ 数え上げ](#prop-grp4-pgroup-fixed-point-counting)から

$$
n_p
=
|\operatorname{Syl}_p(G)|
\equiv
1
\pmod p.
$$

$\square$
<!-- proof-end -->

第三定理は、Sylow 部分群の個数を非常に狭い候補へ落とします。

---

## 7. 一意な Sylow 部分群は正規部分群になる

<a id="prop-grp4-unique-sylow-normal"></a>
<!-- formal-statement-start -->
> **命題（一意な Sylow 部分群と正規性）**
>
> 有限群 $G$ の Sylow $p$-部分群 $P$ について、次は同値である。
>
> 1. $P$ は唯一の Sylow $p$-部分群である。
> 2. $P\trianglelefteq G$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$P$ が唯一なら、任意の $g\in G$ に対して

$$
gPg^{-1}
$$

も Sylow $p$-部分群です。唯一性から

$$
gPg^{-1}=P.
$$

従って $P\trianglelefteq G$ です。

逆に $P\trianglelefteq G$ なら

$$
gPg^{-1}=P
$$

が全ての $g$ で成り立ちます。

[Sylow の第二定理](#thm-grp4-sylow-second)により他の Sylow $p$-部分群は全て $P$ の共役なので、全て $P$ 自身に等しくなります。従って $P$ は唯一です。$\square$
<!-- proof-end -->

したがって

$$
n_p=1
$$

と示せれば、ただちに正規部分群が手に入ります。

有限群の構造判定では、まず [Sylow の第三定理](#thm-grp4-sylow-third)で $n_p$ を絞り、$n_p=1$ を見つけるのが標準的な第一手です。

---

## 8. 位数 $pq$ の群を Sylow 理論で読む

$p<q$ を素数とし

$$
|G|=pq
$$

とします。

Sylow $q$-部分群の個数 $n_q$ は

$$
n_q\mid p,
\qquad
n_q\equiv1\pmod q.
$$

$p<q$ なので、$p$ の正の約数 $1,p$ のうち法 $q$ で1に合同なのは $1$ だけです。

従って

$$
n_q=1.
$$

つまり Sylow $q$-部分群は必ず正規です。

さらに Sylow $p$-部分群の個数は

$$
n_p\mid q,
\qquad
n_p\equiv1\pmod p.
$$

なので

$$
n_p=1
\quad\text{または}\quad
n_p=q.
$$

後者が起こるには

$$
q\equiv1\pmod p
$$

が必要です。

<a id="thm-grp4-order-pq-cyclic"></a>
<!-- formal-statement-start -->
> **定理（位数 pq の群が巡回群になる十分条件）**
>
> $p<q$ を素数とし
>
$$
|G|=pq.
$$
>
> さらに
>
$$
p\nmid(q-1)
$$
>
> とする。
>
> このとき
>
$$
G\cong C_{pq}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上の議論から Sylow $q$-部分群 $Q$ は一意なので

$$
Q\trianglelefteq G.
$$

また

$$
n_p\mid q,
\qquad
n_p\equiv1\pmod p.
$$

$n_p$ は $1$ または $q$ です。

仮定

$$
p\nmid(q-1)
$$

は

$$
q\not\equiv1\pmod p
$$

を意味するので

$$
n_p\ne q.
$$

従って

$$
n_p=1
$$

であり、Sylow $p$-部分群 $P$ も正規です。

位数が互いに素なので

$$
P\cap Q=\{e\}.
$$

また

$$
|PQ|
=
\frac{|P||Q|}{|P\cap Q|}
=
pq
=
|G|.
$$

従って

$$
G=PQ.
$$

さらに $P,Q$ はともに正規なので、任意の $x\in P$, $y\in Q$ に対して交換子

$$
xyx^{-1}y^{-1}
$$

は $P$ にも $Q$ にも属します。

従って

$$
xyx^{-1}y^{-1}
\in
P\cap Q
=
\{e\}.
$$

よって

$$
xy=yx.
$$

したがって

$$
G\cong P\times Q.
$$

$P,Q$ はそれぞれ素数位数なので巡回群です。

$$
P\cong C_p,
\qquad
Q\cong C_q.
$$

互いに素な位数の巡回群の直積は巡回群なので

$$
C_p\times C_q
\cong
C_{pq}.
$$

従って

$$
G\cong C_{pq}.
$$

$\square$
<!-- proof-end -->

### 8.1 位数15の群

$$
15=3\cdot5,
\qquad
3\nmid(5-1)=4.
$$

従って位数15の群は全て

$$
C_{15}
$$

と同型です。

### 8.2 位数21では Sylow の個数だけでは一意に決まらない

$$
21=3\cdot7,
\qquad
3\mid(7-1)=6.
$$

この場合

$$
n_7=1
$$

ですが

$$
n_3=1
\quad\text{または}\quad
7
$$

の両方が [Sylow の第三定理](#thm-grp4-sylow-third)と両立します。

つまり Sylow の個数条件は非常に強力ですが、常に群を一意に決めるわけではありません。

---

## 9. 正規部分群と補部分群から群を組み立てる

<a id="def-grp4-internal-semidirect"></a>
<!-- formal-statement-start -->
> **定義（内部半直積）**
>
> 群 $G$ の部分群 $N,H\le G$ が
>
$$
N\trianglelefteq G,
\qquad
N\cap H=\{e\},
\qquad
NH=G
$$
>
> を満たすとき、$G$ は $N$ と $H$ の **内部半直積**であるという。
>
> この状況を
>
$$
G=N\rtimes H
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp4-internal-semidirect -->
**定義の確認**

例：$S_3$ は $C_3$ と $C_2$ の半直積

$$
N=A_3=\langle(1\,2\,3)\rangle,
\qquad
H=\langle(1\,2)\rangle
$$

とします。

$A_3\trianglelefteq S_3$ で

$$
|N|=3,
\qquad
|H|=2.
$$

位数が互いに素なので

$$
N\cap H=\{e\}.
$$

従って

$$
|NH|
=
\frac{|N||H|}{|N\cap H|}
=
6
=
|S_3|.
$$

よって

$$
NH=S_3.
$$

したがって

$$
S_3
=
A_3\rtimes\langle(1\,2)\rangle
\cong
C_3\rtimes C_2.
$$

しかも

$$
(1\,2)(1\,2\,3)(1\,2)
=
(1\,3\,2)
=
(1\,2\,3)^{-1}.
$$

つまり $C_2$ 側の非自明元が $C_3$ の生成元を逆元へ送ります。この「共役で正規部分群をどう動かすか」が、直積と半直積の違いを生みます。
<!-- definition-example-end -->

内部半直積では、各 $g\in G$ は

$$
g=nh,
\qquad
n\in N,\ h\in H
$$

と一意に書けます。

実際

$$
n_1h_1=n_2h_2
$$

なら

$$
n_2^{-1}n_1
=
h_2h_1^{-1}.
$$

左辺は $N$、右辺は $H$ に属するので両辺は $N\cap H=\{e\}$ に属し、

$$
n_1=n_2,
\qquad
h_1=h_2.
$$

ただし本章では、半直積の一般分類や群拡大理論へは進みません。

---

## 10. $A_4$ で Sylow の個数を直接確認する

$$
|A_4|=12=2^2\cdot3.
$$

Sylow $2$-部分群は位数4です。

$A_4$ の二重互換

$$
(1\,2)(3\,4),
\quad
(1\,3)(2\,4),
\quad
(1\,4)(2\,3)
$$

と恒等元からなる

$$
V=
\{
e,
(1\,2)(3\,4),
(1\,3)(2\,4),
(1\,4)(2\,3)
\}
$$

は位数4の部分群です。

従って $V$ は Sylow $2$-部分群です。

[Sylow の第三定理](#thm-grp4-sylow-third)では

$$
n_2\mid3,
\qquad
n_2\equiv1\pmod2.
$$

従って候補は

$$
n_2=1
\quad\text{または}\quad
3.
$$

実際 $V$ は $A_4$ の全ての二重互換をまとめて含み、共役で保たれるので

$$
V\trianglelefteq A_4.
$$

よって

$$
n_2=1.
$$

一方 Sylow $3$-部分群は位数3です。

$A_4$ には3-cycle が8個あり、位数3の各部分群は非単位元を2個ずつ持つので

$$
n_3
=
\frac82
=
4.
$$

これは

$$
n_3\mid4,
\qquad
n_3\equiv1\pmod3
$$

と一致します。

この例は、同じ群の中でも一方の Sylow 部分群は一意・正規、もう一方は複数存在することを示します。

---

## 11. 三つの Sylow 定理をどう使うか

有限群の位数

$$
|G|
=
\prod_i p_i^{n_i}
$$

が与えられたら、まず各 $p_i$ について

$$
n_{p_i}
\mid
\frac{|G|}{p_i^{n_i}},
\qquad
n_{p_i}
\equiv1
\pmod{p_i}
$$

を同時に満たす整数を列挙します。

候補が1しかなければ、その Sylow 部分群は一意なので正規です。

正規 Sylow 部分群が複数得られれば、

- 積 $PQ$ が部分群になる
- 互いに素な位数なら $P\cap Q=\{e\}$
- 両方が正規なら異なる因子の元が可換する

という構造が使えます。

一方、候補が複数残る場合には

- 共役作用
- 正規化群
- 元の個数の数え上げ
- 準同型による作用

を追加して絞り込みます。

Sylow 理論は「位数だけで群が全部分かる魔法」ではなく、「候補を急激に減らす骨格」です。

---

## 12. 演習

### Level A

#### GRP4-A01 Cauchy の定理を位数10の群へ使う
- Level: A

$G$ を位数10の群とする。

1. 位数2の元が存在することを示せ。
2. 位数5の元が存在することを示せ。
3. Sylow $5$-部分群の個数を求めよ。
4. Sylow $5$-部分群が正規であることを示せ。

<!-- solution-start -->
##### 詳細解答

$$
|G|=10=2\cdot5.
$$

まず

$$
2\mid |G|
$$

なので [有限群の Cauchy の定理](#thm-grp4-cauchy)から位数2の元が存在します。

同様に

$$
5\mid |G|
$$

なので位数5の元も存在します。

Sylow $5$-部分群の個数を $n_5$ とすると、[Sylow の第三定理](#thm-grp4-sylow-third)から

$$
n_5\mid2
$$

かつ

$$
n_5\equiv1\pmod5.
$$

2の正の約数は1,2ですが、そのうち法5で1に合同なのは1だけです。

従って

$$
n_5=1.
$$

一意な Sylow 部分群は正規なので

$$
P_5\trianglelefteq G.
$$
<!-- solution-end -->

#### GRP4-A02 位数12で Sylow 部分群数を絞る
- Level: A

$|G|=12$ とする。

1. Sylow $2$-部分群の個数 $n_2$ の候補を全て求めよ。
2. Sylow $3$-部分群の個数 $n_3$ の候補を全て求めよ。
3. $n_3=1$ のとき何が従うか。
4. $n_2=1$ のとき何が従うか。

<!-- solution-start -->
##### 詳細解答

$$
12=2^2\cdot3.
$$

[Sylow の第三定理](#thm-grp4-sylow-third)から

$$
n_2\mid3,
\qquad
n_2\equiv1\pmod2.
$$

3の正の約数は1,3で、どちらも奇数なので

$$
\boxed{n_2\in\{1,3\}}.
$$

同様に

$$
n_3\mid4,
\qquad
n_3\equiv1\pmod3.
$$

4の正の約数は1,2,4です。そのうち法3で1に合同なのは1,4なので

$$
\boxed{n_3\in\{1,4\}}.
$$

$n_3=1$ なら Sylow $3$-部分群は一意なので正規です。

$n_2=1$ なら Sylow $2$-部分群は一意なので正規です。
<!-- solution-end -->

#### GRP4-A03 位数15の群は巡回群
- Level: A

$G$ を位数15の群とする。[Sylow の第三定理](#thm-grp4-sylow-third)と[一意な Sylow 部分群と正規性](#prop-grp4-unique-sylow-normal)を使って

$$
G\cong C_{15}
$$

を示せ。

<!-- solution-start -->
##### 詳細解答

$$
15=3\cdot5.
$$

Sylow $5$-部分群数 $n_5$ は

$$
n_5\mid3,
\qquad
n_5\equiv1\pmod5.
$$

従って

$$
n_5=1.
$$

よって Sylow $5$-部分群 $Q$ は正規です。

Sylow $3$-部分群数 $n_3$ は

$$
n_3\mid5,
\qquad
n_3\equiv1\pmod3.
$$

候補は1または5ですが

$$
5\equiv2\pmod3
$$

なので

$$
n_3=1.
$$

従って Sylow $3$-部分群 $P$ も正規です。

位数が互いに素なので

$$
P\cap Q=\{e\}.
$$

また

$$
|PQ|
=
\frac{3\cdot5}{1}
=
15
$$

なので

$$
G=PQ.
$$

両方が正規なので $P$ と $Q$ の元は互いに可換し

$$
G\cong P\times Q.
$$

素数位数の群は巡回群だから

$$
P\cong C_3,
\qquad
Q\cong C_5.
$$

従って

$$
G
\cong
C_3\times C_5
\cong
C_{15}.
$$
<!-- solution-end -->

#### GRP4-A04 $S_3$ の Sylow 部分群と正規化群
- Level: A

$S_3$ について次を求めよ。

1. Sylow $3$-部分群を全て求めよ。
2. Sylow $2$-部分群を全て求めよ。
3. $n_3,n_2$ を求め、Sylow の第三定理を確認せよ。
4. $P=\langle(1\,2)\rangle$ に対して $N_{S_3}(P)$ を求めよ。

<!-- solution-start -->
##### 詳細解答

位数3の部分群は

$$
\langle(1\,2\,3)\rangle
=
\{e,(1\,2\,3),(1\,3\,2)\}
$$

ただ1つです。

従って

$$
n_3=1.
$$

位数2の元は3つの互換

$$
(1\,2),\quad(1\,3),\quad(2\,3)
$$

です。それぞれが異なる位数2の部分群を生成するので

$$
n_2=3.
$$

[Sylow の第三定理](#thm-grp4-sylow-third)では

$$
n_3\mid2,
\qquad
n_3\equiv1\pmod3,
$$

および

$$
n_2\mid3,
\qquad
n_2\equiv1\pmod2
$$

であり、実際 $n_3=1,n_2=3$ は条件を満たします。

最後に

$$
P=\langle(1\,2)\rangle
$$

とします。

正規化群の位数について

$$
n_2
=
[S_3:N_{S_3}(P)]
$$

なので

$$
3
=
\frac6{|N_{S_3}(P)|}.
$$

従って

$$
|N_{S_3}(P)|=2.
$$

$P\le N_{S_3}(P)$ かつ $|P|=2$ なので

$$
\boxed{N_{S_3}(P)=P}.
$$
<!-- solution-end -->

### Level B

#### GRP4-B01 $A_4$ の Sylow 部分群
- Level: B

$A_4$ について次を示せ。

1. 
   $$
   V=
   \{
   e,
   (1\,2)(3\,4),
   (1\,3)(2\,4),
   (1\,4)(2\,3)
   \}
   $$
   が Sylow $2$-部分群である。
2. $V\trianglelefteq A_4$ を示せ。
3. $n_2=1$ を結論せよ。
4. $3$-cycle の個数を数えて $n_3=4$ を示せ。

<!-- solution-start -->
##### 詳細解答

$V$ は恒等元と3つの二重互換からなります。

各非単位元は位数2で、異なる2つの二重互換の積は残りの二重互換になります。例えば

$$
(1\,2)(3\,4)(1\,3)(2\,4)
=
(1\,4)(2\,3).
$$

従って $V$ は部分群です。

$$
|V|=4=2^2
$$

であり

$$
|A_4|=12=2^2\cdot3
$$

なので $V$ は Sylow $2$-部分群です。

共役によって置換の巡回型は保存されます。$A_4$ で二重互換を共役しても二重互換になります。

$V$ は恒等元と $A_4$ に存在する全ての二重互換を含むので

$$
gVg^{-1}=V
$$

が全ての $g\in A_4$ に対して成り立ちます。

従って

$$
V\trianglelefteq A_4.
$$

よって一意な Sylow $2$-部分群であり

$$
n_2=1.
$$

次に3-cycle を数えます。

4個の文字から固定する1文字を4通りに選び、残り3文字の3-cycle は向きが2通りあるので

$$
4\cdot2=8
$$

個あります。

位数3の各部分群は2個の非単位元を持ち、異なる位数3の部分群は非単位元を共有しません。

従って

$$
n_3
=
\frac82
=
4.
$$

[Sylow の第三定理](#thm-grp4-sylow-third)の

$$
4\mid4,
\qquad
4\equiv1\pmod3
$$

とも一致します。
<!-- solution-end -->

#### GRP4-B02 位数21の群
- Level: B

$|G|=21$ とする。

1. Sylow $7$-部分群が正規であることを示せ。
2. Sylow $3$-部分群数が $1$ または $7$ であることを示せ。
3. $n_3=1$ なら $G\cong C_{21}$ を示せ。
4. Sylow の個数条件だけでは $n_3=7$ を排除できない理由を説明せよ。

<!-- solution-start -->
##### 詳細解答

$$
21=3\cdot7.
$$

Sylow $7$-部分群数 $n_7$ は

$$
n_7\mid3,
\qquad
n_7\equiv1\pmod7.
$$

3の正の約数は1,3で、法7で1に合同なのは1だけなので

$$
n_7=1.
$$

従って Sylow $7$-部分群は正規です。

Sylow $3$-部分群数 $n_3$ は

$$
n_3\mid7,
\qquad
n_3\equiv1\pmod3.
$$

7の正の約数は1,7で

$$
1\equiv1\pmod3,
\qquad
7\equiv1\pmod3.
$$

したがって

$$
n_3\in\{1,7\}.
$$

もし $n_3=1$ なら Sylow $3$-部分群も正規です。2つの Sylow 部分群の位数は互いに素で、積は群全体になり、両方が正規なので互いに可換します。

従って

$$
G\cong C_3\times C_7
\cong C_{21}.
$$

一方 $n_3=7$ も

$$
n_3\mid7,
\qquad
n_3\equiv1\pmod3
$$

の両条件を満たします。

従って [Sylow の第三定理](#thm-grp4-sylow-third)だけからはこの候補を消せません。追加の構造情報が必要です。
<!-- solution-end -->

#### GRP4-B03 位数45の群
- Level: B

$|G|=45$ とする。

1. Sylow $5$-部分群が一意であることを示せ。
2. Sylow $3$-部分群が一意であることを示せ。
3. $G$ が Sylow $3$-部分群 $P$ と Sylow $5$-部分群 $Q$ の直積に同型であることを示せ。
4. $G$ が可換群であることを結論せよ。$G$ が必ず巡回群かどうかも答えよ。

<!-- solution-start -->
##### 詳細解答

$$
45=3^2\cdot5.
$$

Sylow $5$-部分群数 $n_5$ は

$$
n_5\mid9,
\qquad
n_5\equiv1\pmod5.
$$

9の正の約数は1,3,9です。

法5で見ると

$$
1\equiv1,\qquad
3\equiv3,\qquad
9\equiv4.
$$

従って

$$
n_5=1.
$$

次に Sylow $3$-部分群数 $n_3$ は

$$
n_3\mid5,
\qquad
n_3\equiv1\pmod3.
$$

5の正の約数は1,5ですが

$$
5\equiv2\pmod3
$$

なので

$$
n_3=1.
$$

従って Sylow $3$-部分群 $P$ と Sylow $5$-部分群 $Q$ はともに正規です。

位数は

$$
|P|=9,
\qquad
|Q|=5
$$

で互いに素なので

$$
P\cap Q=\{e\}.
$$

また

$$
|PQ|
=
9\cdot5
=
45
$$

だから

$$
G=PQ.
$$

両方が正規なので異なる因子の元は可換し

$$
G\cong P\times Q.
$$

GRP3 で示した位数 $p^2$ の群の分類から、位数9の群 $P$ は

$$
C_9
\quad\text{または}\quad
C_3\times C_3
$$

です。いずれも可換群です。

また $Q\cong C_5$ なので $G$ は可換群です。

ただし $P$ が $C_3\times C_3$ の場合

$$
G\cong C_3\times C_3\times C_5
$$

となり巡回群ではありません。

したがって

$$
\boxed{G\text{ は必ず可換だが、必ずしも巡回群ではない}}
$$

です。
<!-- solution-end -->

### Level C

#### GRP4-C01 位数6の群を分類する
- Level: C

$G$ を位数6の群とする。同型を除いて

$$
C_6
\quad\text{または}\quad
S_3
$$

のどちらかであることを示せ。

<!-- solution-start -->
##### 詳細解答

$$
|G|=6=2\cdot3.
$$

Sylow $3$-部分群数 $n_3$ は

$$
n_3\mid2,
\qquad
n_3\equiv1\pmod3.
$$

従って

$$
n_3=1.
$$

よって Sylow $3$-部分群 $N$ は正規です。

$$
|N|=3
$$

なので

$$
N=\langle a\rangle
\cong C_3
$$

と書けます。

[有限群の Cauchy の定理](#thm-grp4-cauchy)から位数2の元 $b$ が存在します。

$$
H=\langle b\rangle
$$

と置けば

$$
|H|=2.
$$

位数が互いに素なので

$$
N\cap H=\{e\}.
$$

従って

$$
|NH|
=
\frac{|N||H|}{|N\cap H|}
=
6
=
|G|.
$$

よって

$$
G=NH.
$$

しかも $N\trianglelefteq G$ なので

$$
G=N\rtimes H.
$$

ここで $b$ による共役を調べます。

$N$ は正規なので

$$
bab^{-1}\in N.
$$

$a$ は位数3なので、その共役 $bab^{-1}$ も位数3です。

$N=\{e,a,a^2\}$ のうち位数3の元は $a,a^2$ だけなので

$$
bab^{-1}=a
$$

または

$$
bab^{-1}=a^2=a^{-1}
$$

です。

#### 場合1：$bab^{-1}=a$

このとき

$$
ba=ab.
$$

従って $a,b$ は可換します。

$ab$ の位数を調べると

$$
(ab)^6=e.
$$

さらに可換性から

$$
(ab)^2=a^2\ne e,
$$

および

$$
(ab)^3=b\ne e.
$$

従って $ab$ の位数は6です。

よって $G$ は位数6の元で生成され

$$
G\cong C_6.
$$

#### 場合2：$bab^{-1}=a^{-1}$

このとき $a,b$ は

$$
a^3=e,
\qquad
b^2=e,
\qquad
bab^{-1}=a^{-1}
$$

を満たします。

$G=NH$ かつ $N\cap H=\{e\}$ なので、内部半直積の一意表示から任意の $g\in G$ は一意に

$$
g=a^i b^j,
\qquad
i\in\{0,1,2\},
\quad
j\in\{0,1\}
$$

と書けます。

関係式

$$
bab^{-1}=a^{-1}
$$

は

$$
ba=a^{-1}b
$$

と同値です。従って $j=0,1$ に対して

$$
b^j a^k
=
a^{(-1)^j k}b^j
$$

となり、

$$
(a^i b^j)(a^k b^\ell)
=
a^{\,i+(-1)^j k}b^{\,j+\ell}
$$

と計算できます。$a$ の指数は法3、$b$ の指数は法2で読めばよいです。

一方 $S_3$ で

$$
r=(1\,2\,3),
\qquad
s=(1\,2)
$$

と置くと

$$
r^3=e,
\qquad
s^2=e,
\qquad
srs^{-1}=r^{-1}
$$

なので、同様に

$$
(r^i s^j)(r^k s^\ell)
=
r^{\,i+(-1)^j k}s^{\,j+\ell}.
$$

そこで

$$
\varphi:G\to S_3,
\qquad
\varphi(a^i b^j)=r^i s^j
$$

と定めます。一意表示があるので $\varphi$ は well-defined です。また上で得た2つの積の計算結果から

$$
\varphi(xy)
=
\varphi(x)\varphi(y)
$$

が成り立ち、$\varphi$ は群準同型です。

さらに

$$
\{a^i b^j:0\le i<3,\ 0\le j<2\}
$$

と

$$
\{r^i s^j:0\le i<3,\ 0\le j<2\}
$$

はいずれも6個の相異なる元からなるので、$\varphi$ は全単射です。

従って

$$
G\cong S_3.
$$

以上から位数6の群は同型を除いて

$$
\boxed{C_6,\ S_3}
$$

の2種類です。
<!-- solution-end -->

---

## 13. 章末まとめ

本章で得た流れは次です。

$$
p\mid|G|
\overset{\text{Cauchy}}{\Longrightarrow}
\exists x,\ \operatorname{ord}(x)=p
$$

$$
|G|=p^n m
\overset{\text{Sylow I}}{\Longrightarrow}
\exists P\le G,\ |P|=p^n
$$

$$
Q\le G,\ Q\text{ は }p\text{-部分群}
\overset{\text{Sylow II}}{\Longrightarrow}
Q\le gPg^{-1}
$$

$$
n_p
\overset{\text{Sylow III}}{\Longrightarrow}
n_p\mid m,
\qquad
n_p\equiv1\pmod p.
$$

特に

$$
n_p=1
\iff
P\trianglelefteq G.
$$

この数え上げだけで、位数15の群が巡回群であること、$A_4$ の Sylow 部分群の個数、位数6の群の分類まで到達できます。

GRP1--GRP4 で、学部標準の群論の主線

$$
\text{群}
\to
\text{商構造}
\to
\text{群作用}
\to
\text{有限群の素数別構造}
$$

が閉じました。