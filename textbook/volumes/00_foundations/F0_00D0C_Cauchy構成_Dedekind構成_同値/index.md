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

[F0-00D0 の有理数の定数列埋め込み](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-embedding) を

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

## 2. Cauchy実数の像は本当にDedekind切断か

<a id="thm-f0-00d0c-cut"></a>
<!-- formal-statement-start -->
> **定理（Cauchy実数の像はDedekind切断）**  
> 任意の $x\in\mathbb R_C$ に対し
$$
\Phi(x)=\{q\in\mathbb Q:\iota(q)<x\}
$$
> は Dedekind切断である。
<!-- formal-statement-end -->

### 証明の見取り図

代表 Cauchy 列は有界なので、$x$ より十分小さい有理数と十分大きい有理数が存在します。下方閉性は順序の推移律だけです。最大元なしでは、$q<x$ の間にもう一つ有理数を入れます。

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

最後に $q\in\Phi(x)$ とします。つまり $x-\iota(q)>0$ です。Cauchy 実数の正値性の定義から、ある有理数 $c>0$ が存在して

$$
\iota(c)<x-\iota(q)
$$

となります。そこで

$$
r=q+\frac c2
$$

と置くと $q<r$ であり、

$$
\iota(r)-\iota(q)=\iota(c/2)<x-\iota(q),
$$

したがって $\iota(r)<x$。よって $r\in\Phi(x)$ であり、$\Phi(x)$ は最大元を持ちません。$\square$
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
> **定理（Cauchy-Dedekind対応は順序埋め込み）**  
> $x,y\in\mathbb R_C$ に対して
$$
x<y
\iff
\Phi(x)\subsetneq\Phi(y).
$$
> 特に $\Phi$ は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

$x<y$ なら「$x$ より左にある有理数」は当然「$y$ より左」にもあります。真包含には、[有理数の稠密性](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-dense)から $x$ と $y$ の間に有理数を一つ作ります。

<!-- proof-start -->
### 証明

$x<y$ とします。$q\in\Phi(x)$ なら $\iota(q)<x<y$ なので $q\in\Phi(y)$。従って

$$
\Phi(x)\subseteq\Phi(y).
$$

真包含を示します。$y-x>0$ なので、正値性の定義からある有理数 $c>0$ が存在して

$$
\iota(c)<y-x.
$$

[有理数の稠密性](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-dense)を $x$ と精度 $c/4$ に使い、$p\in\mathbb Q$ を

$$
|x-\iota(p)|<\frac c4
$$

となるように取ります。$r=p+c/2$ とすると

$$
x<\iota(r)<x+\iota(c)<y.
$$

実際、$\iota(p)>x-\iota(c/4)$ から $\iota(r)>x+\iota(c/4)>x$、また $\iota(p)<x+\iota(c/4)$ から $\iota(r)<x+\iota(3c/4)<y$ です。従って $r\in\Phi(y)\setminus\Phi(x)$ で、包含は真です。

逆に $\Phi(x)\subsetneq\Phi(y)$ とします。もし $y\le x$ なら、$y=x$ なら切断は等しく、$y<x$ なら今示した向きから $\Phi(y)\subsetneq\Phi(x)$ となり、いずれも矛盾です。従って $x<y$。

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

$l_0\in A$、$u_0\notin A$ を取ります。下方閉性から必ず $l_0<u_0$ です。

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

前補題の左端列 $(l_n)$ は、幅が0へ行く入れ子区間に閉じ込められるので Cauchy です。そこで

$$
x=[(l_n)]
$$

と置きます。$q\in A$ なら最大元なしを使って $q<r\in A$ とし、十分後ろで $l_n-q$ が**固定した正の幅**を持つことを示します。$q\notin A$ なら $l_n<q$ が全ての $n$ で成り立つので、$\iota(q)<x$ なら必要になる正の幅と矛盾します。

<!-- proof-start -->
### 証明

二分近似 $(l_n),(u_n)$ を取ります。$m>n$ なら $l_m\in[l_n,u_n]$ なので

$$
|l_m-l_n|
\le u_n-l_n\to0.
$$

従って $(l_n)$ は有理 Cauchy 列です。$x=[(l_n)]\in\mathbb R_C$ と置きます。

まず $q\in A$ とします。$A$ は最大元を持たないので $q<r$ となる $r\in A$ を取れます。幅は0へ行くので、十分大きい $n$ で

$$
u_n-l_n<\frac{r-q}{2}.
$$

$r\in A$、$u_n\notin A$ なので、もし $u_n\le r$ なら下方閉性から $u_n\in A$ となって矛盾します。従って $r<u_n$。よって

$$
\begin{aligned}
l_n-q
&=u_n-q-(u_n-l_n)\\
&>r-q-\frac{r-q}{2}\\
&=\frac{r-q}{2}>0.
\end{aligned}
$$

従って十分後ろで $l_n-q$ は固定した正の有理幅 $(r-q)/2$ を持ちます。Cauchy 実数の順序定義から

$$
\iota(q)<x,
$$

すなわち $q\in\Phi(x)$ です。

次に $q\notin A$ とします。各 $l_n\in A$ なので $l_n<q$ です。仮に $\iota(q)<x$ なら、順序定義からある有理数 $c>0$ と $N$ が存在して

$$
l_n-q\ge c\qquad(n\ge N)
$$

となるはずです。しかし実際には全ての $n$ で $l_n-q<0$ なので矛盾です。従って $\iota(q)<x$ ではなく、$q\notin\Phi(x)$。

以上から全ての $q\in\mathbb Q$ について

$$
q\in A\iff q\in\Phi(x),
$$

従って $A=\Phi(x)$ です。$\square$
<!-- proof-end -->

---

## 5. 加法と乗法も保つ

順序全単射だけでも、二つの「実数直線」が同じ順序構造を持つことは分かります。しかし体として同じであることも確認します。

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

加法では $r<x+y$ の正の余裕を三つに分け、$x,y$ を有理数で**下から**近似します。乗法では正の $x,y$ に対して有理上界 $M$ を固定し、

$$
xy-ab=x(y-b)+b(x-a)
$$

を使って、下からの有理近似 $a,b$ の積を $xy$ へ近づけます。負の元は加法逆元へ還元します。

<!-- proof-start -->
### 証明

全単射と順序保存は前節までで示しました。有理数については定義から

$$
\Phi(\iota(q))=\{r\in\mathbb Q:r<q\}=q^*.
$$

#### 加法

まず $r\in\Phi(x)+\Phi(y)$ とします。切断の和の定義から、ある有理数 $a,b$ が存在して

$$
a<x,\qquad b<y,\qquad r=a+b.
$$

従って $r<x+y$ であり $r\in\Phi(x+y)$。よって

$$
\Phi(x)+\Phi(y)\subseteq\Phi(x+y).
$$

逆に $r\in\Phi(x+y)$、すなわち $r<x+y$ とします。正値性の定義から、ある有理数 $c>0$ が存在して

$$
\iota(c)<x+y-\iota(r).
$$

[有理数の稠密性](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-dense)を使い、$p,s\in\mathbb Q$ を

$$
|x-p|<\frac c8,
\qquad
|y-s|<\frac c8
$$

となるように取ります。さらに

$$
a=p-\frac c8,
\qquad
b=s-\frac c8
$$

と置きます。すると

$$
x-\frac c4<a<x,
\qquad
y-\frac c4<b<y.
$$

従って $a\in\Phi(x)$、$b\in\Phi(y)$ であり、

$$
a+b>x+y-\frac c2>r.
$$

切断 $\Phi(x)+\Phi(y)$ は下方閉なので $r\in\Phi(x)+\Phi(y)$。よって

$$
\Phi(x+y)=\Phi(x)+\Phi(y).
$$

特に $0=\iota(0)$ なので $\Phi(0)=0^*$ です。また

$$
0^*=\Phi(0)=\Phi(x+(-x))=\Phi(x)+\Phi(-x).
$$

加法逆元の一意性から

$$
\Phi(-x)=-\Phi(x).
$$

#### 乗法：正の元

$x,y>0$ とします。まず $r\in\Phi(x)\Phi(y)$ とします。$r\le0$ なら $xy>0$ なので $r<xy$。$r>0$ なら積切断の定義から、ある正有理数 $a,b$ が存在して

$$
0<a<x,\qquad0<b<y,\qquad r<ab.
$$

順序体の積の単調性から $ab<xy$ なので、いずれの場合も $r<xy$、すなわち $r\in\Phi(xy)$。従って

$$
\Phi(x)\Phi(y)\subseteq\Phi(xy).
$$

逆に $r\in\Phi(xy)$ とします。$r\le0$ なら積切断の定義から直ちに $r\in\Phi(x)\Phi(y)$ です。以下 $r>0$ とします。

$x,y>0$ なので、正値性から正有理数 $\alpha,\beta$ を

$$
0<\alpha<x,
\qquad
0<\beta<y
$$

となるように取れます。また Cauchy 実数の代表列の有界性から、十分大きい正有理数 $M$ を取り

$$
x<M,\qquad y<M
$$

とできます。さらに $xy-r>0$ なので、ある正有理数 $d$ が存在して

$$
0<d<xy-r.
$$

正有理数 $\varepsilon$ を

$$
0<\varepsilon<\min\left\{\frac\alpha2,\frac\beta2,\frac{d}{2M}\right\}
$$

となるように取ります。[有理数の稠密性](../F0_00D0_Cauchy完備化_有理数から実数/index.md#thm-f0-00d0-dense)から、まず $p,s\in\mathbb Q$ を

$$
|x-p|<\frac\varepsilon2,
\qquad
|y-s|<\frac\varepsilon2
$$

となるように取り、

$$
a=p-\frac\varepsilon2,
\qquad
b=s-\frac\varepsilon2
$$

と置きます。すると

$$
x-\varepsilon<a<x,
\qquad
y-\varepsilon<b<y.
$$

また $x>\alpha>2\varepsilon$, $y>\beta>2\varepsilon$ なので $a,b>0$ です。さらに $0<b<y<M$ および $x<M$ から

$$
\begin{aligned}
0<xy-ab
&=x(y-b)+b(x-a)\\
&<M\varepsilon+M\varepsilon\\
&=2M\varepsilon<d.
\end{aligned}
$$

従って

$$
ab>xy-d>r.
$$

よって積切断の定義から $r\in\Phi(x)\Phi(y)$。これで正の $x,y$ について

$$
\Phi(xy)=\Phi(x)\Phi(y)
$$

が示されました。

$x=0$ または $y=0$ の場合は $\Phi(0)=0^*$ から従います。負の元を含む場合は、既に示した $\Phi(-x)=-\Phi(x)$ と Dedekind 側の符号規則

$$
(-A)B=-(AB),
\qquad
(-A)(-B)=AB
$$

へ還元できます。従って全ての $x,y$ で積を保ちます。

以上より $\Phi$ は有理数・加法・乗法・順序を保つ全単射、すなわち順序体同型です。$\square$
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
- 主題: 有理数埋め込みの整合
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
- 主題: Cauchy実数の像の切断性
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

### F0-00D0C-A03 像が空でも全体でもないこと

- Level: A
- 目安時間: 8分
- 主題: Cauchy実数の像の切断性
- 使用技術: Cauchy列の有界性

$x=[(a_n)]\in\mathbb R_C$ とする。代表列の有界性を使い、$\Phi(x)$ が空でなく $\mathbb Q$ 全体でもないことを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
Cauchy列 $(a_n)$ は有界なので、ある有理数 $M>0$ が存在して $|a_n|\le M$。すると全ての $n$ で
$$
a_n-(-M-1)\ge1,
$$
よって $\iota(-M-1)<x$。従って $-M-1\in\Phi(x)$ で、像は空でない。

一方
$$
(M+1)-a_n\ge1
$$
なので $x<\iota(M+1)$。従って $M+1\notin\Phi(x)$ で、像は $\mathbb Q$ 全体ではない。

##### 本番答案
$|a_n|\le M$ と取れば $\iota(-M-1)<x<\iota(M+1)$。従って前者は像に入り、後者は入らない。
##### 採点基準
- Cauchy列の有界性：6点
- 非空性：7点
- 真部分集合性：7点
<!-- solution-end -->

### F0-00D0C-A04 像に最大元がないこと

- Level: A
- 目安時間: 10分
- 主題: Cauchy実数の像の切断性
- 使用技術: 正値性・有理中点

$q\in\Phi(x)$ とする。$q<r$ かつ $r\in\Phi(x)$ となる有理数 $r$ を構成せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$q\in\Phi(x)$ なので $x-\iota(q)>0$。正値性の定義からある有理数 $c>0$ が存在して
$$
\iota(c)<x-\iota(q).
$$
$r=q+c/2$ と置く。すると $q<r$ であり
$$
\iota(r)=\iota(q)+\iota(c/2)<x.
$$
従って $r\in\Phi(x)$。よって最大元はない。

##### 本番答案
$x-q>0$ の有理幅 $c>0$ を取り $r=q+c/2$ とすれば $q<r<x$。
##### 採点基準
- 正の有理幅の取得：8点
- $r$ の構成：6点
- 最大元なしの結論：6点
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

### F0-00D0C-B03 加法を保つことを再構成する

- Level: B
- 目安時間: 18分
- 主題: 順序体同型
- 使用技術: 有理数の稠密性・下方閉性

任意の $x,y\in\mathbb R_C$ について
$$
\Phi(x+y)=\Phi(x)+\Phi(y)
$$
を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
まず $r\in\Phi(x)+\Phi(y)$ とする。切断の和の定義から $r=a+b$ と書け、$a<x$, $b<y$。従って $r<x+y$ なので $r\in\Phi(x+y)$。

逆に $r<x+y$ とする。正の差 $(x+y)-r$ にはある正有理幅 $c$ が入る。稠密性から $x,y$ をそれぞれ $c/8$ 未満で近似する有理数 $p,s$ を取り、
$$
a=p-c/8,
\qquad b=s-c/8
$$
とする。すると
$$
x-c/4<a<x,
\qquad y-c/4<b<y,
$$
従って $a\in\Phi(x)$、$b\in\Phi(y)$。さらに
$$
a+b>x+y-c/2>r.
$$
$\Phi(x)+\Phi(y)$ は下方閉なので $r$ もそこに属する。以上で両包含が示された。

##### 本番答案
一方向は $a<x,b<y\Rightarrow a+b<x+y$。逆向きは $r<x+y$ の正の余裕 $c$ を取り、$x,y$ を下から $c/4$ 未満で有理近似して $r<a+b$ とし、和切断の下方閉性を使う。
##### 採点基準
- 第1包含：6点
- 正の余裕の取得：4点
- 下からの有理近似：6点
- 下方閉性による逆包含：4点
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

2. $q\in A$ とする。最大元なしから $q<r$ となる $r\in A$ を取る。十分大きい $n$ で
$$
u_n-l_n<\frac{r-q}{2}.
$$
$r\in A$, $u_n\notin A$ なので $r<u_n$。従って
$$
l_n-q
>r-q-\frac{r-q}{2}
=\frac{r-q}{2}.
$$
よって eventually $l_n-q$ は固定した正の有理幅を持ち、$\iota(q)<x$。従って $q\in\Phi(x)$。

3. $q\notin A$ なら全ての $l_n\in A$ に対し $l_n<q$。仮に $\iota(q)<x$ なら順序定義から eventually $l_n-q\ge c>0$ となる必要があり、矛盾。従って $q\notin\Phi(x)$。2と3から
$$
q\in A\iff q\in\Phi(x)
$$
が全有理数で成り立つので $A=\Phi(x)$。

##### 本番答案
入れ子性より $|l_m-l_n|\le u_n-l_n\to0$。$q\in A$ なら $q<r\in A$ を取り、幅 $<(r-q)/2$ とすれば $l_n-q>(r-q)/2$ eventually。$q\notin A$ なら常に $l_n<q$ なので正の幅は生じない。ゆえに $\Phi([(l_n)])=A$。
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
- 全射性の両向きで、Cauchy実数の順序に必要な「固定した正の幅」を明示できる。
- 加法と正の元の乗法が保存されることを有理近似の誤差評価から再構成できる。
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
