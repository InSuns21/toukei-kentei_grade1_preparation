# F0-00D0C Cauchy構成とDedekind構成の同値

ここまでに二つの実数を作りました。

- $\mathbb R_C$：有理 Cauchy 列を「差が0へ行く」で同一視したもの。
- $\mathbb R_D$：有理数の下方集合で最大元を持たない Dedekind切断。

見た目はまったく違います。本章の目標は、単に「どちらも実数と呼ぶ」と宣言することではなく、両者の間に **有理数・順序・四則演算を保つ全単射** を実際に作ることです。

結論は

$$
\boxed{\mathbb R_C\cong\mathbb R_D}
$$

です。ここで $\cong$ は「集合として同じ」という意味ではなく、**実数として使う構造を全部保った同型**という意味です。

---

## 1. Cauchy実数の「左にある有理数全部」を取る

[F0-00D0](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-embedding) の標準埋め込みを

$$
\iota:\mathbb Q\to\mathbb R_C
$$

とします。

<a id="def-f0-00d0c-phi"></a>
<!-- formal-statement-start -->
> **定義（Cauchy実数から切断への対応）**  
> $x\in\mathbb R_C$ に対し
$$
\Phi(x)
:=\{q\in\mathbb Q:\iota(q)<x\}
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0c-phi -->
### 1.1 有理数では何が起きるか

$x=\iota(r)$、$r\in\mathbb Q$ なら

$$
\Phi(\iota(r))
=\{q\in\mathbb Q:q<r\}
=r^*.
$$

つまり Cauchy 側の有理数は、Dedekind 側の標準切断へそのまま送られます。
<!-- definition-example-end -->

この定義の利点は、代表 Cauchy 列を一切選ばないことです。$x$ はすでに同値類なので、$\Phi$ の定義自体が代表元非依存になっています。

---

## 2. $\Phi(x)$ は本当にDedekind切断か

<a id="thm-f0-00d0c-cut"></a>
<!-- formal-statement-start -->
> **定理（$\Phi(x)$ はDedekind切断）**  
> 任意の $x\in\mathbb R_C$ に対し
$$
\Phi(x)=\{q\in\mathbb Q:\iota(q)<x\}
$$
> は Dedekind切断である。
<!-- formal-statement-end -->

### 証明の見取り図

代表 Cauchy 列は有界なので、$x$ より十分小さい有理数と十分大きい有理数が存在します。下方閉性は順序の推移律だけです。最大元なしは、$q<x$ の間へもう一つ有理数を入れます。

<!-- proof-start -->
### 証明

$x=[(a_n)]$ とします。有理 Cauchy 列 $(a_n)$ は有界なので、ある $M\in\mathbb Q_{>0}$ が存在して $|a_n|\le M$。従って

$$
\iota(-M-1)<x<\iota(M+1).
$$

よって $-M-1\in\Phi(x)$ であり、$M+1\notin\Phi(x)$。したがって $\Phi(x)$ は空でなく $\mathbb Q$ 全体でもありません。

$q\in\Phi(x)$、$p<q$ とします。すると

$$
\iota(p)<\iota(q)<x,
$$

よって $p\in\Phi(x)$。従って下方閉です。

最後に $q\in\Phi(x)$ とします。つまり $\iota(q)<x$。Cauchy 実数の順序定義から、ある $\varepsilon\in\mathbb Q_{>0}$ が存在して

$$
\iota(q+\varepsilon)<x
$$

となるように取れます。例えば

$$
r=q+\frac\varepsilon2
$$

とすれば $q<r$ かつ $\iota(r)<x$。したがって $r\in\Phi(x)$ であり、$\Phi(x)$ は最大元を持ちません。$\square$
<!-- proof-end -->

したがって

$$
\Phi:\mathbb R_C\to\mathbb R_D
$$

は正しく定義された写像です。

---

## 3. 順序を完全に保つ

<a id="thm-f0-00d0c-order"></a>
<!-- formal-statement-start -->
> **定理（$\Phi$ は順序埋め込み）**  
> $x,y\in\mathbb R_C$ に対して
$$
x<y
\iff
\Phi(x)\subsetneq\Phi(y).
$$
> 特に $\Phi$ は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

$x<y$ なら「$x$ より左にある有理数」は当然「$y$ より左」にもあります。真包含を示すには [有理数の稠密性](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-dense) を使い、

$$
x<\iota(r)<y
$$

となる有理数を一つ挟みます。

<!-- proof-start -->
### 証明

$x<y$ とします。$q\in\Phi(x)$ なら $\iota(q)<x<y$ なので $q\in\Phi(y)$。従って

$$
\Phi(x)\subseteq\Phi(y).
$$

また $y-x>0$ なので、有理数の稠密性から $x<\iota(r)<y$ を満たす $r\in\mathbb Q$ を取れます。すると $r\in\Phi(y)$ ですが $r\notin\Phi(x)$。従って真包含です。

逆に $\Phi(x)\subsetneq\Phi(y)$ とします。もし $y\le x$ なら、$y=x$ なら切断は等しく、$y<x$ なら前半から $\Phi(y)\subsetneq\Phi(x)$ となり、どちらも矛盾です。従って $x<y$。

特に $\Phi(x)=\Phi(y)$ なら $x<y$ でも $y<x$ でもなく、全順序性から $x=y$。よって $\Phi$ は単射です。$\square$
<!-- proof-end -->

---

## 4. 任意の切断をCauchy列で境界まで追い込む

単射だけでは二つの構成が同じとは言えません。任意の $A\in\mathbb R_D$ がある Cauchy 実数の像になることを示します。

<a id="lem-f0-00d0c-bracketing"></a>
<!-- formal-statement-start -->
> **補題（切断境界の二分近似）**  
> 任意の Dedekind切断 $A$ に対し、有理数列 $(l_n),(u_n)$ を
$$
l_n\in A,
\qquad
u_n\notin A,
\qquad
0<u_n-l_n\le2^{-n}(u_0-l_0)
$$
> となるように構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ は空でなく $\mathbb Q$ 全体でもないので、$l_0\in A$ と $u_0\notin A$ を取れます。中点

$$
m_n=\frac{l_n+u_n}{2}
$$

が $A$ に入るなら左端を中点へ、入らないなら右端を中点へ動かします。区間幅は毎回半分になります。

<!-- proof-start -->
### 証明

$l_0\in A$、$u_0\notin A$ を取る。下方閉性から必ず $l_0<u_0$ です。

$l_n,u_n$ が得られたとし

$$
m_n=\frac{l_n+u_n}{2}
$$

と置きます。

$m_n\in A$ なら

$$
l_{n+1}=m_n,\qquad u_{n+1}=u_n,
$$

$m_n\notin A$ なら

$$
l_{n+1}=l_n,\qquad u_{n+1}=m_n
$$

とします。どちらの場合も $l_{n+1}\in A$, $u_{n+1}\notin A$ が保たれ、

$$
u_{n+1}-l_{n+1}
=\frac12(u_n-l_n).
$$

帰納的に

$$
u_n-l_n=2^{-n}(u_0-l_0).
$$

よって主張が従います。$\square$
<!-- proof-end -->

<a id="thm-f0-00d0c-surjective"></a>
<!-- formal-statement-start -->
> **定理（任意の切断はCauchy実数から得られる）**  
> 任意の $A\in\mathbb R_D$ に対し、ある $x\in\mathbb R_C$ が存在して
$$
\Phi(x)=A
$$
> となる。従って $\Phi$ は全射である。
<!-- formal-statement-end -->

### 証明の見取り図

前補題の左端列 $(l_n)$ は、幅が0へ行く区間の中に閉じ込められるので Cauchy です。そこで

$$
x=[(l_n)]
$$

と置きます。$q\in A$ なら最大元なしを使って $q<r\in A$ とし、十分細かい段階で $q<l_n$ まで左端が進むことを示します。$q\notin A$ なら全ての $l_n$ は $q$ より左に残ります。

<!-- proof-start -->
### 証明

二分近似 $(l_n),(u_n)$ を取ります。$m>n$ なら $l_m,u_m$ は区間 $[l_n,u_n]$ 内にあるので

$$
|l_m-l_n|
\le u_n-l_n\to0.
$$

従って $(l_n)$ は有理 Cauchy 列です。$x=[(l_n)]\in\mathbb R_C$ と置きます。

まず $q\in A$ とします。$A$ は最大元を持たないので $q<r$ となる $r\in A$ を取れます。$u_n-l_n\to0$ だから、十分大きい $n$ で

$$
u_n-l_n<r-q.
$$

$r\in A$、$u_n\notin A$ なので下方閉性から $r<u_n$。従って

$$
l_n
>u_n-(r-q)
>r-(r-q)
=q.
$$

十分大きい $n$ で $l_n-q$ は正の有理幅を持つため $\iota(q)<x$。よって $q\in\Phi(x)$。

次に $q\notin A$ とします。各 $l_n\in A$ なので、下方閉性から $l_n<q$ です。従って $\iota(q)<x$ とはなれず、$q\notin\Phi(x)$。

以上から $q\in A\iff q\in\Phi(x)$ であり、$A=\Phi(x)$。$\square$
<!-- proof-end -->

---

## 5. 加法と乗法も保つ

順序全単射だけでも、二つの「実数直線」が同じ順序構造を持つことは分かります。しかし体として同じであることも確認したいので演算を見ます。

<a id="thm-f0-00d0c-field-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（Cauchy実数とDedekind実数の順序体同型）**  
> 写像
$$
\Phi:\mathbb R_C\to\mathbb R_D,
\qquad
\Phi(x)=\{q\in\mathbb Q:\iota(q)<x\}
$$
> は全単射で、任意の $x,y\in\mathbb R_C$ に対し
$$
\Phi(x+y)=\Phi(x)+\Phi(y),
$$
$$
\Phi(xy)=\Phi(x)\Phi(y),
$$
> を満たし、順序を保つ。また全ての $q\in\mathbb Q$ について
$$
\Phi(\iota(q))=q^*.
$$
> 従って $\mathbb R_C$ と $\mathbb R_D$ は、有理数を固定する順序体として同型である。
<!-- formal-statement-end -->

### 証明の見取り図

加法では

$$
q<x+y
$$

なら、$x,y$ をそれぞれ少し下から有理数 $a,b$ で近似して $q<a+b<x+y$ とできます。逆向きは $a<x,b<y$ なら $a+b<x+y$ です。

正の元の乗法も同じく、有理数で下から近似して積を挟みます。符号がある場合は正負へ分ければよいです。

<!-- proof-start -->
### 証明

全単射と順序保存は前節までで示しました。有理数については定義から

$$
\Phi(\iota(q))=\{r\in\mathbb Q:r<q\}=q^*.
$$

加法を示します。$r\in\Phi(x)+\Phi(y)$ なら、ある $a<x$, $b<y$ が存在して $r=a+b$。従って

$$
r=a+b<x+y,
$$

よって $r\in\Phi(x+y)$。

逆に $r\in\Phi(x+y)$、すなわち $r<x+y$ とします。正の差

$$
\delta=(x+y)-r>0
$$

に対し、有理数の稠密性から十分小さい正有理数 $\varepsilon$ を取り $2\varepsilon<\delta$ とできます。さらに $x,y$ を下から有理数で近似して

$$
x-\varepsilon<a<x,
\qquad
y-\varepsilon<b<y
$$

とします。すると

$$
a+b>x+y-2\varepsilon>r.
$$

切断の和は下方閉なので $r\in\Phi(x)+\Phi(y)$。よって加法を保ちます。

$x,y>0$ の乗法についても、$r<xy$ のとき正の余裕を取り、有理数 $0<a<x$, $0<b<y$ を十分近く選べば $r<ab<xy$ とできます。逆に $a<x,b<y$ なら $ab<xy$。従って正の元で積を保ちます。一般の場合は $(-x)y=-(xy)$ などの符号規則へ還元できます。

したがって $\Phi$ は四則演算と順序を保つ全単射です。$\square$
<!-- proof-end -->

---

## 6. 「同じ実数」とは何を意味するのか

$\mathbb R_C$ の元は **Cauchy列の同値類** です。

$\mathbb R_D$ の元は **有理数の部分集合** です。

したがって集合としては別物です。それでも

$$
\mathbb R_C\cong\mathbb R_D
$$

と言えるのは、数として観測できる構造

- $+$
- $\times$
- $<$
- $0,1$
- $\mathbb Q$ の埋め込み

が全て保存されるからです。

これは数学で繰り返し現れる考え方です。

> **要素の内部表現ではなく、構造を保つ写像によって「同じ」を判定する。**

Cauchy列構成は距離・近似・関数空間へ一般化しやすく、Dedekind構成は上限性質を直接見せやすい。二つは役割が違いますが、完成した実数体系は同じです。

---

## 7. 完全性の諸形式がつながる

Dedekind側では

$$
\text{空でない上に有界な集合には上限がある}
$$

が構成から得られました。

Cauchy側では

$$
\text{全てのCauchy列が収束する}
$$

が構成から得られました。

両構成が同型なので、この二つは「別々の実数」についての性質ではありません。同じ実数体系の完全性を異なる方向から見ています。

後続の実解析ではさらに、

- 有界単調数列の収束
- Bolzano--Weierstrass
- 区間縮小
- Cauchy判定

などが同じ完全性から導かれます。

---

## 8. 演習

### F0-00D0C-A01 有理数の像

- Level: A
- 目安時間: 6分
- 主題: 標準埋め込みの整合
- 使用技術: 定義への代入

$r\in\mathbb Q$ に対して
$$
\Phi(\iota(r))=r^*
$$
を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
定義から
$$
\Phi(\iota(r))
=\{q\in\mathbb Q:\iota(q)<\iota(r)\}.
$$
$\iota$ は順序を保つので $\iota(q)<\iota(r)$ と $q<r$ は同値。従って
$$
\Phi(\iota(r))=\{q:q<r\}=r^*.
$$
##### 本番答案
$\iota$ の順序保存性より $\iota(q)<\iota(r)\iff q<r$。従って定義から一致。
##### 採点基準
- $\Phi$ の定義：8点
- 順序保存性：8点
- 結論：4点
<!-- solution-end -->

### F0-00D0C-A02 下方閉性

- Level: A
- 目安時間: 7分
- 主題: $\Phi(x)$ の切断性
- 使用技術: 順序の推移律

$q\in\Phi(x)$、$p<q$ なら $p\in\Phi(x)$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$q\in\Phi(x)$ なので $\iota(q)<x$。$p<q$ と $\iota$ の順序保存性から $\iota(p)<\iota(q)$。従って
$$
\iota(p)<\iota(q)<x,
$$
よって $p\in\Phi(x)$。
##### 本番答案
$p<q$ から $\iota(p)<\iota(q)<x$。従って $p\in\Phi(x)$。
##### 採点基準
- 埋め込みの順序保存：8点
- 推移律：8点
- 結論：4点
<!-- solution-end -->

### F0-00D0C-B01 二分近似はCauchy列になる

- Level: B
- 目安時間: 12分
- 主題: 切断からCauchy列
- 使用技術: 入れ子区間評価

$l_n\in A$, $u_n\notin A$、$[l_{n+1},u_{n+1}]\subseteq[l_n,u_n]$、$u_n-l_n\to0$ とする。$(l_n)$ が Cauchy 列であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$m\ge n$ なら入れ子性から $l_m\in[l_n,u_n]$。従って
$$
0\le l_m-l_n\le u_n-l_n.
$$
任意の $\varepsilon>0$ に対して十分大きい $n$ で $u_n-l_n<\varepsilon$。従って $m\ge n$ なら $|l_m-l_n|<\varepsilon$。よって Cauchy。
##### 本番答案
$m\ge n$ なら $|l_m-l_n|\le u_n-l_n\to0$。よって $(l_n)$ は Cauchy。
##### 採点基準
- 入れ子性の使用：8点
- 幅による評価：8点
- Cauchy性：4点
<!-- solution-end -->

### F0-00D0C-B02 順序保存から単射を出す

- Level: B
- 目安時間: 10分
- 主題: 同型
- 使用技術: 全順序

$\Phi$ が
$$
x<y\iff\Phi(x)\subsetneq\Phi(y)
$$
を満たすとする。$\Phi(x)=\Phi(y)$ なら $x=y$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
もし $x\ne y$ なら全順序性により $x<y$ または $y<x$。前者なら $\Phi(x)\subsetneq\Phi(y)$、後者なら $\Phi(y)\subsetneq\Phi(x)$ となり、どちらも $\Phi(x)=\Phi(y)$ に矛盾。従って $x=y$。
##### 本番答案
$x\ne y$ なら全順序性からどちらかが真に小さく、像も真包含になるため像の等号に矛盾。
##### 採点基準
- 全順序性：8点
- 真包含への移行：8点
- 矛盾と結論：4点
<!-- solution-end -->

### F0-00D0C-C01 任意の切断をCauchy実数へ戻す

- Level: C
- 目安時間: 30分
- 主題: 全射性
- 使用技術: 二分法・Cauchy列・切断条件

Dedekind切断 $A$ に対し、$l_n\in A$, $u_n\notin A$、$u_n-l_n\to0$ となる入れ子区間を二分法で構成し、$x=[(l_n)]$ と置く。

1. $(l_n)$ が有理 Cauchy 列であることを示せ。
2. $q\in A$ なら $q\in\Phi(x)$ を示せ。
3. $q\notin A$ なら $q\notin\Phi(x)$ を示し、$A=\Phi(x)$ を結論せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
1. $m\ge n$ なら $l_m\in[l_n,u_n]$ なので
$$
|l_m-l_n|\le u_n-l_n\to0.
$$
よって Cauchy。

2. $q\in A$ とする。最大元なしから $q<r$ となる $r\in A$ を取る。十分大きい $n$ で $u_n-l_n<r-q$。$r\in A$, $u_n\notin A$ なので $r<u_n$。従って
$$
l_n>u_n-(r-q)>q.
$$
よって eventually $l_n-q$ は正で、$\iota(q)<x$。従って $q\in\Phi(x)$。

3. $q\notin A$ なら全ての $l_n\in A$ に対し $l_n<q$。従って $\iota(q)<x$ にはならず $q\notin\Phi(x)$。2と3から全ての有理数 $q$ について
$$
q\in A\iff q\in\Phi(x),
$$
従って $A=\Phi(x)$。

##### 本番答案
入れ子性より $|l_m-l_n|\le u_n-l_n\to0$。$q\in A$ なら $q<r\in A$ を取り、幅 $<r-q$ とすれば $l_n>q$ eventually。$q\notin A$ なら常に $l_n<q$。ゆえに $\Phi([(l_n)])=A$。
##### 採点基準
- Cauchy性：6点
- $q\in A\Rightarrow q\in\Phi(x)$：8点
- $q\notin A\Rightarrow q\notin\Phi(x)$：4点
- 集合の等号：2点
<!-- solution-end -->

---

## 9. 章末チェック

- $\Phi(x)=\{q\in\mathbb Q:q<x\}$ という対応を説明できる。
- $\Phi(x)$ が Dedekind切断になる4条件を確認できる。
- 順序保存性から単射性を導ける。
- 任意の切断を二分近似し、有理 Cauchy 列を構成できる。
- $\Phi$ の全射性を証明できる。
- Cauchy構成とDedekind構成が「同じ集合」ではなく「有理数を固定する順序体として同型」であることを説明できる。

これで

$$
\boxed{
\mathbb Q
\xrightarrow{\text{Cauchy完備化}}
\mathbb R_C
\cong
\mathbb R_D
\xleftarrow{\text{Dedekind切断}}
\mathbb Q
}
$$

が一本につながりました。
