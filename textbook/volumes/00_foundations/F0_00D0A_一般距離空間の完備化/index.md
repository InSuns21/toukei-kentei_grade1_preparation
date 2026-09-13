# F0-00D0A 一般距離空間の完備化

前章では有理数の Cauchy 列を使って $\mathbb R_C$ を作りました。本章では、同じ発想が $\mathbb Q$ 特有ではなく、**任意の距離空間に対する標準操作**であることを示します。

結論は次です。

$$
\boxed{(X,d)\longmapsto(\widehat X,\widehat d)}
$$

ここで $X$ は $\widehat X$ に等長に埋め込まれ、その像は稠密で、$\widehat X$ は完備です。さらに、この三条件を満たす完備化は等長同型を除いて一意です。

---

## 1. 距離空間の Cauchy 列を同一視する

距離空間 $(X,d)$ の Cauchy 列全体を $\mathcal C(X)$ と書きます。

<a id="def-f0-00d0a-equivalence"></a>
<!-- formal-statement-start -->
> **定義（Cauchy列の同値関係）**  
> 距離空間 $(X,d)$ の Cauchy 列 $(x_n),(y_n)\in\mathcal C(X)$ に対し
$$
(x_n)\sim(y_n)
\iff
d(x_n,y_n)\to0
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0a-equivalence -->
### 1.1 定義の確認

$X=(0,1)$、通常の距離 $d(x,y)=|x-y|$ とします。

$$
x_n=\frac1n,
\qquad
y_n=\frac1{n+1}
$$

はいずれも $X$ の Cauchy 列で、

$$
d(x_n,y_n)=\frac1{n(n+1)}\to0
$$

なので同値です。どちらも $(0,1)$ の中には極限を持ちませんが、完備化では同じ新しい境界点を表します。
<!-- definition-example-end -->

反射律・対称律・推移律は前章と同じ三角不等式で確認できます。

<a id="def-f0-00d0a-completion"></a>
<!-- formal-statement-start -->
> **定義（Cauchy列による完備化の台集合）**  
> 距離空間 $(X,d)$ に対し
$$
\widehat X:=\mathcal C(X)/\sim
$$
> と定める。$(x_n)$ の同値類を $[(x_n)]$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0a-completion -->
### 1.2 新しい点は「収束先候補」そのもの

$X=(0,1)$ では $(1/n)$ の同値類と $(1/(n+1))$ の同値類が一つの新しい点を作ります。後でこの点が閉区間 $[0,1]$ の0に対応します。
<!-- definition-example-end -->

---

## 2. 同値類どうしの距離をどう測るか

自然な候補は

$$
\widehat d([(x_n)],[(y_n)])
:=\lim_{n\to\infty}d(x_n,y_n)
$$

です。まず右辺の極限が存在しなければなりません。

<a id="lem-f0-00d0a-distance-cauchy"></a>
<!-- formal-statement-start -->
> **補題（点間距離列はCauchy）**  
> 距離空間 $(X,d)$ の Cauchy 列 $(x_n),(y_n)$ に対し、実数列 $(d(x_n,y_n))$ は Cauchy 列である。
<!-- formal-statement-end -->

### 証明の見取り図

逆三角不等式の二点版

$$
|d(x_n,y_n)-d(x_m,y_m)|
\le d(x_n,x_m)+d(y_n,y_m)
$$

で抑えます。

<!-- proof-start -->
### 証明

三角不等式から

$$
d(x_n,y_n)
\le d(x_n,x_m)+d(x_m,y_m)+d(y_m,y_n),
$$

よって

$$
d(x_n,y_n)-d(x_m,y_m)
\le d(x_n,x_m)+d(y_n,y_m).
$$

$n,m$ を入れ替えた不等式も合わせると

$$
|d(x_n,y_n)-d(x_m,y_m)|
\le d(x_n,x_m)+d(y_n,y_m).
$$

両列が Cauchy なので右辺は十分大きい $m,n$ で任意に小さくできます。したがって $(d(x_n,y_n))$ は実数 Cauchy 列であり、$\mathbb R$ の完備性から収束します。$\square$
<!-- proof-end -->

<a id="thm-f0-00d0a-metric-well-defined"></a>
<!-- formal-statement-start -->
> **定理（完備化距離のwell-defined性）**  
> $\widehat X$ 上で
$$
\widehat d([(x_n)],[(y_n)])
:=\lim_{n\to\infty}d(x_n,y_n)
$$
> と定めると、この値は代表列の選び方に依存せず、$\widehat d$ は距離である。
<!-- formal-statement-end -->

### 証明の見取り図

代表列を $(x'_n),(y'_n)$ へ取り替えたとき、二つの候補距離の差を

$$
|d(x_n,y_n)-d(x'_n,y'_n)|
\le d(x_n,x'_n)+d(y_n,y'_n)
$$

で0へ押し込みます。

<!-- proof-start -->
### 証明

$(x_n)\sim(x'_n)$、$(y_n)\sim(y'_n)$ とします。前節と同じ評価から

$$
|d(x_n,y_n)-d(x'_n,y'_n)|
\le d(x_n,x'_n)+d(y_n,y'_n)\to0.
$$

よって極限値は同じで、$\widehat d$ は代表元に依存しません。

非負性と対称性は $d$ から従います。$\widehat d([(x_n)],[(y_n)])=0$ なら $d(x_n,y_n)\to0$ なので二列は同値で、同値類は等しいです。

三角不等式は各 $n$ で

$$
d(x_n,z_n)\le d(x_n,y_n)+d(y_n,z_n)
$$

が成り立つので、極限を取れば

$$
\widehat d(x,z)\le\widehat d(x,y)+\widehat d(y,z)
$$

となります。$\square$
<!-- proof-end -->

---

## 3. 元の空間は定数列として埋め込まれる

<a id="thm-f0-00d0a-isometric-embedding"></a>
<!-- formal-statement-start -->
> **定理（標準埋め込みは等長）**  
> 距離空間 $(X,d)$ に対し
$$
i:X\to\widehat X,
\qquad
i(x)=[(x,x,x,\ldots)]
$$
> と定めると
$$
\widehat d(i(x),i(y))=d(x,y)
$$
> が成り立つ。したがって $i$ は等長写像であり、特に単射である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定数列なので

$$
\widehat d(i(x),i(y))
=\lim_{n\to\infty}d(x,y)
=d(x,y).
$$

$d(x,y)=0$ なら $x=y$ だから単射です。$\square$
<!-- proof-end -->

<a id="thm-f0-00d0a-dense"></a>
<!-- formal-statement-start -->
> **定理（標準埋め込みの像は稠密）**  
> 任意の $\xi=[(x_n)]\in\widehat X$ と任意の $\varepsilon>0$ に対し、ある $x\in X$ が存在して
$$
\widehat d(\xi,i(x))<\varepsilon
$$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy 列の十分後ろの一項 $x_N$ を定数列として固定します。

<!-- proof-start -->
### 証明

$(x_n)$ が Cauchy なので、ある $N$ が存在して $m,n\ge N$ なら $d(x_m,x_n)<\varepsilon$。$x=x_N$ とすると

$$
\widehat d(\xi,i(x_N))
=\lim_{m\to\infty}d(x_m,x_N)
\le\varepsilon.
$$

必要なら最初から $\varepsilon/2$ を使えば厳密な不等号 $<\varepsilon$ が得られます。よって $i(X)$ は稠密です。$\square$
<!-- proof-end -->

---

## 4. 完備化は本当に完備である

<a id="thm-f0-00d0a-complete"></a>
<!-- formal-statement-start -->
> **定理（$\widehat X$ の完備性）**  
> 距離空間 $(X,d)$ から Cauchy 列商で構成した $(\widehat X,\widehat d)$ は完備である。
<!-- formal-statement-end -->

### 証明の見取り図

$\widehat X$ の Cauchy 列 $(\xi_k)$ を取り、稠密な $i(X)$ から

$$
\widehat d(\xi_k,i(x_k))<2^{-k}
$$

となる $x_k\in X$ を選びます。すると $(x_k)$ は $X$ の Cauchy 列なので、その同値類 $[(x_k)]$ が極限候補になります。

<!-- proof-start -->
### 証明

$(\xi_k)$ を $\widehat X$ の Cauchy 列とします。稠密性から各 $k$ で $x_k\in X$ を取り

$$
\widehat d(\xi_k,i(x_k))<2^{-k}
$$

とします。

任意の $\varepsilon>0$ に対し、十分大きい $k,\ell$ で

$$
\widehat d(\xi_k,\xi_\ell)<\frac\varepsilon3,
\qquad
2^{-k},2^{-\ell}<\frac\varepsilon3.
$$

等長性から

$$
\begin{aligned}
d(x_k,x_\ell)
&=\widehat d(i(x_k),i(x_\ell))\\
&\le\widehat d(i(x_k),\xi_k)
+\widehat d(\xi_k,\xi_\ell)
+\widehat d(\xi_\ell,i(x_\ell))\\
&<\varepsilon.
\end{aligned}
$$

よって $(x_k)$ は $X$ の Cauchy 列です。$\xi=[(x_k)]\in\widehat X$ と置きます。

さらに

$$
\widehat d(\xi_k,\xi)
\le\widehat d(\xi_k,i(x_k))
+\widehat d(i(x_k),\xi)
$$

で、第一項は $2^{-k}\to0$、第二項も $[(x_k)]$ の定義から0へ行きます。したがって $\xi_k\to\xi$ です。$\square$
<!-- proof-end -->

---

## 5. 完備化は等長同型を除いて一意

「Cauchy列商」という作り方だけが正解なのではありません。別の方法で完備空間を作っても、元の空間を同じ距離のまま稠密に含むなら結果は本質的に同じです。

<a id="thm-f0-00d0a-uniqueness"></a>
<!-- formal-statement-start -->
> **定理（完備化の一意性）**  
> 距離空間 $(X,d)$ に対し、$(Y_1,\rho_1)$、$(Y_2,\rho_2)$ が完備で、等長埋め込み
$$
j_1:X\to Y_1,
\qquad
j_2:X\to Y_2
$$
> の像がそれぞれ稠密だとする。このとき、$j_1(x)$ を $j_2(x)$ へ送る写像は一意的に等長全単射
$$
T:Y_1\to Y_2
$$
> へ延長される。
<!-- formal-statement-end -->

### 証明の見取り図

$y\in Y_1$ を取り、稠密性から $j_1(x_n)\to y$ となる列を選びます。等長性により $(j_2(x_n))$ も Cauchy なので、$Y_2$ の完備性から極限を持ちます。その極限を $T(y)$ と定めます。代表する近似列を変えても同じ極限になること、距離を保つこと、全射であることを順に確認します。

<!-- proof-start -->
### 証明

$y\in Y_1$ を取る。$j_1(X)$ が稠密なので $j_1(x_n)\to y$ となる $(x_n)\subset X$ を取れる。

$(j_1(x_n))$ は Cauchy で、$j_1,j_2$ はともに等長だから

$$
\rho_2(j_2(x_m),j_2(x_n))
=d(x_m,x_n)
=\rho_1(j_1(x_m),j_1(x_n))\to0.
$$

$Y_2$ は完備なので $(j_2(x_n))$ はある点へ収束する。その極限を $T(y)$ と定める。

別の列 $(x'_n)$ でも $j_1(x'_n)\to y$ なら

$$
d(x_n,x'_n)
=\rho_1(j_1(x_n),j_1(x'_n))\to0,
$$

したがって

$$
\rho_2(j_2(x_n),j_2(x'_n))\to0.
$$

よって $Y_2$ 側の極限は同じであり $T$ は well-defined。

同様に極限を通して

$$
\rho_2(T(y),T(z))=\rho_1(y,z)
$$

が従うので $T$ は等長。逆向きにも同じ構成を行えば互いに逆写像となり全単射である。$X$ 上では定義から $T(j_1(x))=j_2(x)$。稠密集合上の値で連続写像は決まるので一意である。$\square$
<!-- proof-end -->

この定理により「完備化」は特定の実装ではなく、**等長同型を除いて一つの数学的対象**として扱えます。

---

## 6. 例：$(0,1)$ の完備化は $[0,1]$

通常の距離を入れた $(0,1)$ は完備ではありません。

$$
\frac1n\to0,
\qquad
1-\frac1n\to1
$$

ですが、0と1は空間の外です。

一方 $[0,1]$ は $\mathbb R$ の閉部分集合なので完備であり、$(0,1)$ は $[0,1]$ に稠密です。包含写像は等長です。

したがって完備化の一意性から

$$
\widehat{(0,1)}\cong[0,1].
$$

「不足した点を追加する」という直感が文字通り見える例です。

---

## 7. 演習

### F0-00D0A-A01 距離列のCauchy性

- Level: A
- 目安時間: 8分
- 主題: 完備化距離
- 使用技術: 三角不等式

Cauchy 列 $(x_n),(y_n)$ に対し
$$
|d(x_n,y_n)-d(x_m,y_m)|
\le d(x_n,x_m)+d(y_n,y_m)
$$
を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
三角不等式から
$$
d(x_n,y_n)
\le d(x_n,x_m)+d(x_m,y_m)+d(y_m,y_n).
$$
よって
$$
d(x_n,y_n)-d(x_m,y_m)
\le d(x_n,x_m)+d(y_n,y_m).
$$
$n,m$ を入れ替えた不等式と合わせて絶対値評価を得る。
##### 本番答案
両向きの三角不等式を組み合わせればよい。
##### 採点基準
- 三角不等式の展開：10点
- 入れ替えによる絶対値化：10点
<!-- solution-end -->

### F0-00D0A-A02 定数列埋め込みの等長性

- Level: A
- 目安時間: 6分
- 主題: 等長埋め込み
- 使用技術: 定義への代入

$i(x)=[(x,x,\ldots)]$ とするとき、$\widehat d(i(x),i(y))=d(x,y)$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
定数列なので
$$
\widehat d(i(x),i(y))
=\lim_{n\to\infty}d(x,y)=d(x,y).
$$
距離0なら $x=y$ だから $i$ は単射でもある。
##### 本番答案
定義へ定数列を代入すれば $\lim d(x,y)=d(x,y)$。
##### 採点基準
- 距離定義への代入：12点
- 単射の確認：8点
<!-- solution-end -->

### F0-00D0A-B01 $(0,1)$ の完備化

- Level: B
- 目安時間: 12分
- 主題: 完備化の同定
- 使用技術: 稠密性・閉部分集合の完備性

通常距離を入れた $(0,1)$ の完備化が $[0,1]$ と等長同型であることを、完備化の一意性を用いて説明せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$[0,1]$ は完備な $\mathbb R$ の閉部分集合なので完備。包含写像 $(0,1)\hookrightarrow[0,1]$ は距離を変えないので等長である。また任意の $x\in[0,1]$ は $(0,1)$ の点列で近似でき、特に0は $1/n$、1は $1-1/n$ で近似できる。したがって $(0,1)$ は $[0,1]$ に稠密。完備化の一意性から標準完備化と $[0,1]$ は等長同型。
##### 本番答案
$[0,1]$ は完備、$(0,1)$ はそこへ等長かつ稠密に埋め込まれる。ゆえに完備化の一意性から $\widehat{(0,1)}\cong[0,1]$。
##### 採点基準
- $[0,1]$ の完備性：6点
- 等長性：4点
- 稠密性：6点
- 一意性の適用：4点
<!-- solution-end -->

### F0-00D0A-B02 すでに完備なら新しい点は増えない

- Level: B
- 目安時間: 12分
- 主題: 完備化
- 使用技術: Cauchy列の収束

$(X,d)$ がすでに完備なら、標準埋め込み $i:X\to\widehat X$ が全射であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
任意の $\xi=[(x_n)]\in\widehat X$ を取る。$(x_n)$ は $X$ の Cauchy 列で、$X$ は完備だからある $x\in X$ へ収束する。すると
$$
d(x_n,x)\to0,
$$
よって $(x_n)$ は定数列 $(x,x,\ldots)$ と同値。したがって $\xi=i(x)$ であり $i$ は全射。
##### 本番答案
完備性より代表 Cauchy 列 $(x_n)$ は $x\in X$ へ収束し、$(x_n)\sim(x)$。よって任意の同値類は $i(x)$ の形。
##### 採点基準
- 完備性の適用：8点
- 定数列との同値性：8点
- 全射の結論：4点
<!-- solution-end -->

### F0-00D0A-C01 完備性の対角構成

- Level: C
- 目安時間: 25分
- 主題: 一般完備化
- 使用技術: 稠密近似・三角不等式

$\widehat X$ の Cauchy 列 $(\xi_k)$ に対し、$x_k\in X$ を
$$
\widehat d(\xi_k,i(x_k))<2^{-k}
$$
となるように取る。

1. $(x_k)$ が $X$ の Cauchy 列であることを示せ。
2. $\xi=[(x_k)]$ と置くと $\xi_k\to\xi$ であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
1. 等長性と三角不等式から
$$
\begin{aligned}
d(x_k,x_\ell)
&=\widehat d(i(x_k),i(x_\ell))\\
&\le2^{-k}+\widehat d(\xi_k,\xi_\ell)+2^{-\ell}.
\end{aligned}
$$
$(\xi_k)$ が Cauchy で、$2^{-k},2^{-\ell}\to0$ だから右辺は任意に小さくできる。

2. $\xi=[(x_k)]$ とする。三角不等式で
$$
\widehat d(\xi_k,\xi)
\le2^{-k}+\widehat d(i(x_k),\xi).
$$
第二項は $(x_k)$ が $\xi$ を表すことから0へ行く。よって全体も0へ行く。

##### 本番答案
$$
d(x_k,x_\ell)
\le2^{-k}+\widehat d(\xi_k,\xi_\ell)+2^{-\ell}\to0.
$$
したがって $(x_k)$ は Cauchy。$\xi=[(x_k)]$ と置けば
$$
\widehat d(\xi_k,\xi)
\le2^{-k}+\widehat d(i(x_k),\xi)\to0.
$$
##### 採点基準
- $x_k$ のCauchy性評価：10点
- 極限候補の構成：4点
- $\xi_k\to\xi$ の評価：6点
<!-- solution-end -->

---

## 8. 章末チェック

- 任意の距離空間に Cauchy 列商を適用できる。
- $\widehat d$ の極限が存在し、代表元に依存しないことを示せる。
- 標準埋め込みが等長で像が稠密であることを示せる。
- 対角近似で完備性を証明できる。
- 完備化が等長同型を除いて一意である意味を説明できる。

次章では距離ではなく **順序の穴** を埋める Dedekind 切断から実数を作ります。
