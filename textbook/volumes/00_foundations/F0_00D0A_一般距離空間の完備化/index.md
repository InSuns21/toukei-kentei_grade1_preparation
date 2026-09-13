# F0-00D0A 一般距離空間の完備化

前章では有理数の Cauchy 列から $\mathbb R_C$ を作りました。本章では同じ発想が $\mathbb Q$ 特有ではなく、**任意の距離空間に対する標準操作**であることを示します。

結論は

$$
\boxed{(X,d)\longmapsto(\widehat X,\widehat d)}
$$

です。元の $X$ は $\widehat X$ に等長に埋め込まれ、その像は稠密で、$\widehat X$ は完備です。さらに、この三条件を満たす完備化は等長同型を除いて一意です。

---

## 1. 距離空間の Cauchy 列を同一視する

距離空間 $(X,d)$ の Cauchy 列全体を $\mathcal C(X)$ と書きます。

<a id="def-f0-00d0a-equivalence"></a>
<!-- formal-statement-start -->
> **定義（Cauchy列の同値関係）**  
> $(x_n),(y_n)\in\mathcal C(X)$ に対し
$$
(x_n)\sim(y_n)
\iff
d(x_n,y_n)\to0
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0a-equivalence -->
### 1.1 定義の確認：$(0,1)$ の二つの列

$X=(0,1)$、$d(x,y)=|x-y|$ とし、$n\ge1$ に対して

$$
x_n=\frac1{n+1},
\qquad
y_n=\frac1{n+2}
$$

とします。

**定義の確認**

1. $0<x_n,y_n<1$ なので、各項は実際に $X$ の点です。
2. 任意の $m,n\ge N$ に対し
$$
|x_m-x_n|
\le \frac1{m+1}+\frac1{n+1}
\le \frac2{N+1},
$$
なので $(x_n)$ は Cauchy 列です。$(y_n)$ も同じ評価で Cauchy 列です。
3. さらに
$$
d(x_n,y_n)
=\frac1{(n+1)(n+2)}\to0.
$$

従って $(x_n)\sim(y_n)$ です。どちらも $X$ 内には極限を持ちませんが、完備化では同じ新しい境界点を表します。
<!-- definition-example-end -->

反射律・対称律は距離の公理から直ちに従い、推移律は

$$
d(x_n,z_n)
\le d(x_n,y_n)+d(y_n,z_n)
$$

から従います。

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
### 1.2 新しい点は「収束先候補」の同値類

$X=(0,1)$ では $(1/(n+1))$ と $(1/(n+2))$ の同値類が一つの新しい点になります。後で $[0,1]$ と同一視したとき、この点が0に対応します。
<!-- definition-example-end -->

ここではまだ集合 $\widehat X$ を作っただけです。次に距離を入れます。

---

## 2. 同値類どうしの距離を作る

自然な候補は

$$
\widehat d([(x_n)],[(y_n)])
:=\lim_{n\to\infty}d(x_n,y_n)
$$

です。しかし、まず右辺の極限が存在し、次に代表列を変えても値が変わらないことを示さなければなりません。

<a id="lem-f0-00d0a-distance-cauchy"></a>
<!-- formal-statement-start -->
> **補題（点間距離列はCauchy）**  
> $(x_n),(y_n)$ が $(X,d)$ の Cauchy 列なら、実数列
$$
(d(x_n,y_n))_{n\ge1}
$$
> は Cauchy 列である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの時点 $m,n$ での距離の差を、各列自身の動いた距離で抑えます。

$$
|d(x_n,y_n)-d(x_m,y_m)|
\le d(x_n,x_m)+d(y_n,y_m).
$$

<!-- proof-start -->
### 証明

三角不等式から

$$
d(x_n,y_n)
\le d(x_n,x_m)+d(x_m,y_m)+d(y_m,y_n),
$$

従って

$$
d(x_n,y_n)-d(x_m,y_m)
\le d(x_n,x_m)+d(y_n,y_m).
$$

$m,n$ を入れ替えた不等式も合わせると

$$
|d(x_n,y_n)-d(x_m,y_m)|
\le d(x_n,x_m)+d(y_n,y_m).
$$

両列は Cauchy なので右辺は十分大きい $m,n$ で任意に小さくなります。従って $(d(x_n,y_n))$ は実数 Cauchy 列であり、実数の完備性から収束します。$\square$
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

代表列を $(x'_n),(y'_n)$ に取り替えたとき、候補距離の差を

$$
|d(x_n,y_n)-d(x'_n,y'_n)|
\le d(x_n,x'_n)+d(y_n,y'_n)
$$

で0へ押し込みます。その後、距離の4公理を確認します。

<!-- proof-start -->
### 証明

$(x_n)\sim(x'_n)$、$(y_n)\sim(y'_n)$ とします。三角不等式から

$$
|d(x_n,y_n)-d(x'_n,y'_n)|
\le d(x_n,x'_n)+d(y_n,y'_n)\to0.
$$

従って二つの距離列は同じ極限を持ち、$\widehat d$ は代表元に依存しません。

非負性と対称性は $d$ から従います。また

$$
\widehat d([(x_n)],[(y_n)])=0
$$

なら $d(x_n,y_n)\to0$ なので $(x_n)\sim(y_n)$、従って同値類は等しいです。逆向きも定義から明らかです。

最後に各 $n$ で

$$
d(x_n,z_n)
\le d(x_n,y_n)+d(y_n,z_n)
$$

なので、極限を取ると

$$
\widehat d(x,z)
\le\widehat d(x,y)+\widehat d(y,z).
$$

以上より $\widehat d$ は距離です。$\square$
<!-- proof-end -->

---

## 3. 元の空間を定数列として埋め込む

<a id="thm-f0-00d0a-isometric-embedding"></a>
<!-- formal-statement-start -->
> **定理（定数列埋め込みは等長）**  
> 写像
$$
i:X\to\widehat X,
\qquad
i(x)=[(x,x,x,\ldots)]
$$
> は
$$
\widehat d(i(x),i(y))=d(x,y)
$$
> を満たす。従って $i$ は等長写像であり、特に単射である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定数列なので

$$
\widehat d(i(x),i(y))
=\lim_{n\to\infty}d(x,y)
=d(x,y).
$$

従って距離を保ち、$i(x)=i(y)$ なら $d(x,y)=0$ なので $x=y$ です。$\square$
<!-- proof-end -->

以後、必要なら $X$ と $i(X)$ を同一視します。ただし論証上は「元の点」と「定数列の同値類」は別の集合の元であることを忘れません。

<a id="thm-f0-00d0a-dense"></a>
<!-- formal-statement-start -->
> **定理（定数列埋め込みの像は稠密）**  
> 任意の $\xi=[(x_n)]\in\widehat X$ と任意の $\varepsilon>0$ に対し、ある $x\in X$ が存在して
$$
\widehat d(\xi,i(x))<\varepsilon
$$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

代表 Cauchy 列の十分後ろの一項 $x_N$ を、今度は定数列として固定します。

<!-- proof-start -->
### 証明

$(x_n)$ は Cauchy なので、$\varepsilon/2$ に対してある $N$ が存在し、$m,n\ge N$ なら

$$
d(x_m,x_n)<\frac\varepsilon2.
$$

$x=x_N$ とします。$m\ge N$ なら

$$
d(x_m,x_N)<\frac\varepsilon2.
$$

従って極限を取って

$$
\widehat d(\xi,i(x_N))
=\lim_{m\to\infty}d(x_m,x_N)
\le\frac\varepsilon2
<\varepsilon.
$$

よって $i(X)$ は $\widehat X$ に稠密です。$\square$
<!-- proof-end -->

---

## 4. 完備化空間は本当に完備

<a id="thm-f0-00d0a-complete"></a>
<!-- formal-statement-start -->
> **定理（完備化空間は完備）**  
> Cauchy 列商で構成した距離空間 $(\widehat X,\widehat d)$ は完備である。
<!-- formal-statement-end -->

### 証明の見取り図

$\widehat X$ の Cauchy 列 $(\xi_k)$ を取ります。稠密な $i(X)$ から

$$
\widehat d(\xi_k,i(x_k))<2^{-k}
$$

となる $x_k\in X$ を選びます。すると $(x_k)$ は $X$ の Cauchy 列になり、その同値類 $[(x_k)]$ が $(\xi_k)$ の極限になります。

<!-- proof-start -->
### 証明

$(\xi_k)$ を $\widehat X$ の Cauchy 列とします。稠密性から各 $k$ で $x_k\in X$ を取り

$$
\widehat d(\xi_k,i(x_k))<2^{-k}
$$

とします。

任意の $\varepsilon>0$ を取ります。十分大きい $k,\ell$ では

$$
\widehat d(\xi_k,\xi_\ell)<\frac\varepsilon3,
\qquad
2^{-k},2^{-\ell}<\frac\varepsilon3.
$$

[定数列埋め込みは等長](#thm-f0-00d0a-isometric-embedding)なので左辺を $\widehat d$ へ移し、その後に距離の三角不等式を適用すると

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

従って $(x_k)$ は $X$ の Cauchy 列です。そこで

$$
\xi=[(x_k)]\in\widehat X
$$

と置きます。

次に $i(x_k)$ が $\xi$ へ収束することを確認します。固定した $k$ に対して

$$
\widehat d(i(x_k),\xi)
=\lim_{m\to\infty}d(x_k,x_m).
$$

$(x_k)$ が Cauchy なので、この量は $k\to\infty$ で0へ行きます。従って

$$
\widehat d(\xi_k,\xi)
\le\widehat d(\xi_k,i(x_k))
+\widehat d(i(x_k),\xi)
\to0.
$$

よって $\xi_k\to\xi$ です。$\square$
<!-- proof-end -->

ここまでで

$$
\boxed{
i:X\hookrightarrow\widehat X
\text{ は等長},
\quad i(X)\text{ は稠密},
\quad \widehat X\text{ は完備}
}
$$

が得られました。

---

## 5. 完備化は等長同型を除いて一意

「Cauchy列商」という作り方だけが正解なのではありません。別の方法で完備空間を作っても、元の空間を同じ距離のまま稠密に含むなら、本質的には同じです。

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

$y\in Y_1$ を $j_1(X)$ の点列で近似し、その同じ元列を $Y_2$ 側へ送って極限を取ります。

```text
j_1(x_n) → y   in Y_1
   │
   │ 同じ x_n
   ↓
j_2(x_n) → T(y) in Y_2
```

近似列の選び方に依存しないことが、ここでも well-defined 性です。

<!-- proof-start -->
### 証明

$y\in Y_1$ を取ります。$j_1(X)$ が稠密なので

$$
j_1(x_n)\to y
$$

となる $(x_n)\subset X$ を取れます。収束列は Cauchy なので $(j_1(x_n))$ は Cauchy です。両埋め込みが等長だから

$$
\rho_2(j_2(x_m),j_2(x_n))
=d(x_m,x_n)
=\rho_1(j_1(x_m),j_1(x_n))\to0.
$$

従って $(j_2(x_n))$ は $Y_2$ の Cauchy 列です。$Y_2$ の完備性から極限が存在するので

$$
T(y):=\lim_{n\to\infty}j_2(x_n)
$$

と定めます。

別の列 $(x'_n)$ でも $j_1(x'_n)\to y$ なら

$$
\begin{aligned}
d(x_n,x'_n)
&=\rho_1(j_1(x_n),j_1(x'_n))\\
&\le\rho_1(j_1(x_n),y)+\rho_1(y,j_1(x'_n))\to0.
\end{aligned}
$$

従って

$$
\rho_2(j_2(x_n),j_2(x'_n))\to0
$$

であり、$Y_2$ 側の極限は同じです。よって $T$ は well-defined。

$y,z\in Y_1$ をそれぞれ $j_1(x_n),j_1(u_n)$ で近似すれば

$$
\begin{aligned}
\rho_2(T(y),T(z))
&=\lim_n\rho_2(j_2(x_n),j_2(u_n))\\
&=\lim_n d(x_n,u_n)\\
&=\lim_n\rho_1(j_1(x_n),j_1(u_n))\\
&=\rho_1(y,z).
\end{aligned}
$$

従って $T$ は等長です。逆向きにも同じ構成を行えば互いに逆写像が得られるので $T$ は全単射です。

$x\in X$ に対して定数列 $x_n=x$ を選べば

$$
T(j_1(x))=j_2(x).
$$

最後に、別の等長延長 $S$ が同じ条件を満たすなら、$j_1(x_n)\to y$ に対し連続性から

$$
S(y)=\lim_nS(j_1(x_n))
=\lim_nj_2(x_n)
=T(y).
$$

従って延長は一意です。$\square$
<!-- proof-end -->

この定理により「完備化」は特定の内部表現ではなく、**等長同型を除いて一意な数学的対象**として扱えます。

---

## 6. 具体例

### 6.1 $(0,1)$ の完備化は $[0,1]$

通常の距離を入れた $(0,1)$ は完備ではありません。

$$
\frac1{n+1}\to0,
\qquad
1-\frac1{n+1}\to1
$$

ですが、0と1は空間の外です。

一方 $[0,1]$ は $\mathbb R$ の閉部分集合なので完備で、$(0,1)$ は $[0,1]$ に稠密です。包含写像は等長です。従って[完備化の一意性](#thm-f0-00d0a-uniqueness)から

$$
\widehat{(0,1)}\cong[0,1].
$$

### 6.2 すでに完備な空間は変わらない

$X$ 自身が完備なら、任意の $[(x_n)]\in\widehat X$ の代表 Cauchy 列は $X$ 内のある $x$ へ収束します。従って

$$
(x_n)\sim(x,x,x,\ldots),
$$

つまり全ての新しい同値類が既存の点から来ます。完備化は「穴があるときだけ」点を増やします。

### 6.3 $\mathbb Q$ の一般完備化は前章の $\mathbb R_C$

通常距離を入れた $\mathbb Q$ に本章の一般構成を適用すると、定義上まさに前章の Cauchy 実数が得られます。また[完備化の一意性](#thm-f0-00d0a-uniqueness)を使えば、$\mathbb Q$ を等長かつ稠密に含む任意の完備距離空間は $\mathbb R_C$ と等長同型です。

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
従って
$$
d(x_n,y_n)-d(x_m,y_m)
\le d(x_n,x_m)+d(y_n,y_m).
$$
$m,n$ を入れ替えた不等式と合わせると絶対値評価が得られる。

##### 本番答案
三角不等式を両方向に用いれば
$$
|d(x_n,y_n)-d(x_m,y_m)|
\le d(x_n,x_m)+d(y_n,y_m).
$$

##### 採点基準
- 三角不等式の展開：10点
- 入れ替えによる絶対値化：10点
<!-- solution-end -->

### F0-00D0A-A02 定数列埋め込みの等長性

- Level: A
- 目安時間: 6分
- 主題: 等長埋め込み
- 使用技術: 定義への代入

$i(x)=[(x,x,\ldots)]$ とするとき
$$
\widehat d(i(x),i(y))=d(x,y)
$$
を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
定数列なので
$$
\widehat d(i(x),i(y))
=\lim_{n\to\infty}d(x,y)
=d(x,y).
$$
従って距離を保ち、特に $i$ は単射。

##### 本番答案
定義へ定数列を代入すれば $\lim d(x,y)=d(x,y)$。

##### 採点基準
- 距離定義への代入：12点
- 単射の確認：8点
<!-- solution-end -->

### F0-00D0A-A03 Cauchy列の同値関係の推移律

- Level: A
- 目安時間: 8分
- 主題: 商構成
- 使用技術: 三角不等式

$(x_n)\sim(y_n)$、$(y_n)\sim(z_n)$ なら $(x_n)\sim(z_n)$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
任意の $\varepsilon>0$ を取る。十分大きい $n$ で
$$
d(x_n,y_n)<\varepsilon/2,
\qquad
d(y_n,z_n)<\varepsilon/2.
$$
従って
$$
d(x_n,z_n)
\le d(x_n,y_n)+d(y_n,z_n)
<\varepsilon.
$$
よって $d(x_n,z_n)\to0$。

##### 本番答案
三角不等式と $\varepsilon/2$ 分割から $d(x_n,z_n)\to0$。

##### 採点基準
- 同値性の量化：8点
- 三角不等式：8点
- 結論：4点
<!-- solution-end -->

### F0-00D0A-A04 定数列埋め込みの像が稠密である理由

- Level: A
- 目安時間: 10分
- 主題: 稠密性
- 使用技術: Cauchy条件

$\xi=[(x_n)]\in\widehat X$ と $\varepsilon>0$ に対し、代表列の一項 $x_N$ を用いて
$$
\widehat d(\xi,i(x_N))<\varepsilon
$$
となる $N$ を取れることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$(x_n)$ は Cauchy なので、ある $N$ が存在して $m,n\ge N$ なら
$$
d(x_m,x_n)<\varepsilon/2.
$$
特に $m\ge N$ で $d(x_m,x_N)<\varepsilon/2$。従って
$$
\widehat d(\xi,i(x_N))
=\lim_{m\to\infty}d(x_m,x_N)
\le\varepsilon/2<\varepsilon.
$$

##### 本番答案
Cauchy条件を $\varepsilon/2$ で使い $x_N$ を固定して極限を取る。

##### 採点基準
- $N$ の選択：8点
- 完備化距離への変換：8点
- 厳密な不等号：4点
<!-- solution-end -->

### F0-00D0A-B01 $(0,1)$ の完備化

- Level: B
- 目安時間: 12分
- 主題: 完備化の同定
- 使用技術: 稠密性・閉部分集合の完備性

通常距離を入れた $(0,1)$ の完備化が $[0,1]$ と等長同型であることを、[完備化の一意性](#thm-f0-00d0a-uniqueness)を用いて説明せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$[0,1]$ は完備な $\mathbb R$ の閉部分集合なので完備。包含写像 $(0,1)\hookrightarrow[0,1]$ は等長である。また0は $1/(n+1)$、1は $1-1/(n+1)$ で近似でき、内部点は自分自身で近似できるので $(0,1)$ は $[0,1]$ に稠密。従って[完備化の一意性](#thm-f0-00d0a-uniqueness)から
$$
\widehat{(0,1)}\cong[0,1].
$$

##### 本番答案
$[0,1]$ は完備で、$(0,1)$ はそこへ等長かつ稠密に埋め込まれる。[完備化の一意性](#thm-f0-00d0a-uniqueness)より結論。

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

$(X,d)$ がすでに完備なら、定数列埋め込み $i:X\to\widehat X$ が全射であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
任意の $\xi=[(x_n)]\in\widehat X$ を取る。$(x_n)$ は $X$ の Cauchy 列で、$X$ は完備だからある $x\in X$ へ収束する。従って
$$
d(x_n,x)\to0,
$$
なので $(x_n)$ は定数列 $(x,x,\ldots)$ と同値。よって $\xi=i(x)$ であり $i$ は全射。

##### 本番答案
完備性より代表 Cauchy 列 $(x_n)$ は $x\in X$ へ収束し、$(x_n)\sim(x)$。従って任意の同値類は $i(x)$ の形。

##### 採点基準
- 完備性の適用：8点
- 定数列との同値性：8点
- 全射の結論：4点
<!-- solution-end -->

### F0-00D0A-B03 $\mathbb Q$ の一般完備化を同定する

- Level: B
- 目安時間: 15分
- 主題: 完備化の一意性
- 使用技術: 等長性・稠密性・完備性

通常距離を入れた $\mathbb Q$ の本章の完備化を $\widehat{\mathbb Q}$ とする。前章の $\mathbb R_C$ と $\widehat{\mathbb Q}$ が等長同型であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
本章の構成から $\widehat{\mathbb Q}$ は完備で、$\mathbb Q$ はそこへ等長かつ稠密に埋め込まれる。前章では $\mathbb R_C$ が完備で、定数列による $\mathbb Q$ の埋め込みが等長かつ稠密であることを示した。従って、同じ距離空間 $\mathbb Q$ の二つの完備化になっている。[完備化の一意性](#thm-f0-00d0a-uniqueness)から
$$
\widehat{\mathbb Q}\cong\mathbb R_C
$$
である。

##### 本番答案
両者とも $\mathbb Q$ を等長かつ稠密に含む完備距離空間なので、[完備化の一意性](#thm-f0-00d0a-uniqueness)から等長同型。

##### 採点基準
- $\widehat{\mathbb Q}$ の三条件：6点
- $\mathbb R_C$ の三条件：6点
- 一意性の適用：8点
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
1. [定数列埋め込みは等長](#thm-f0-00d0a-isometric-embedding)なので
$$
\begin{aligned}
d(x_k,x_\ell)
&=\widehat d(i(x_k),i(x_\ell))\\
&\le2^{-k}+\widehat d(\xi_k,\xi_\ell)+2^{-\ell}.
\end{aligned}
$$
$(\xi_k)$ が Cauchy で $2^{-k},2^{-\ell}\to0$ だから右辺は任意に小さくなる。従って $(x_k)$ は Cauchy。

2. $\xi=[(x_k)]$ とする。三角不等式で
$$
\widehat d(\xi_k,\xi)
\le2^{-k}+\widehat d(i(x_k),\xi).
$$
第二項は
$$
\widehat d(i(x_k),\xi)=\lim_{m\to\infty}d(x_k,x_m)
$$
であり、$(x_k)$ の Cauchy性から $k\to\infty$ で0へ行く。従って $\xi_k\to\xi$。

##### 本番答案
$$
d(x_k,x_\ell)
\le2^{-k}+\widehat d(\xi_k,\xi_\ell)+2^{-\ell}\to0.
$$
従って $(x_k)$ は Cauchy。$\xi=[(x_k)]$ と置けば
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
- 定数列埋め込みが等長で、像が稠密であることを証明できる。
- 対角近似で $\widehat X$ の完備性を証明できる。
- 完備化が等長同型を除いて一意であることを証明できる。
- 既に完備な空間では新しい点が増えないことを説明できる。
- $(0,1)$ や $\mathbb Q$ の完備化を一意性から同定できる。

次章では、距離ではなく **順序の穴** を埋める Dedekind 切断から実数を作ります。
