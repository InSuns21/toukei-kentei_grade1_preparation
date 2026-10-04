# NSA6 極限・連続・一様連続・コンパクト性

<!-- definition-example-audit: strict -->

NSA5 では、有限超実数が標準実数に無限小だけ近いことを $x\approx a$ と書き、標準部によって通常の実数へ戻れることを示しました。ここから解析の量化を、無限小と無限超自然数で読み替えます。

標準解析では

$$
\forall \varepsilon>0\ \exists N\ \forall n\ge N
$$

や

$$
\forall \varepsilon>0\ \exists \delta>0\ \forall x
$$

という量化順序を何度も使います。超準解析では、この「十分大きい」「十分近い」を

$$
H\in{}^*\mathbb N\setminus\mathbb N,
\qquad
x\approx a
$$

という実際の超準点で試せます。

ただし、短く書けることと証明責務が消えることは別です。この章では毎回、

1. 標準定義から移送して超準条件を得る向き
2. 標準定義が失敗したと仮定し、無限添字または無限小を代入して反例を作る向き

の両方を追います。

---

## 1. 「十分大きい添字」を無限超自然数で読む

実数列 $(a_n)$ を標準写像 $a:\mathbb N\to\mathbb R$ と見ます。NSA3--NSA4 の多ソート超冪では、その超準拡張

$$
{}^*a:{}^*\mathbb N\to{}^*\mathbb R
$$

があり、$H\in{}^*\mathbb N$ における値を ${}^*a_H$ と書けます。

無限超自然数 $H$ は、任意の標準自然数 $N$ より大きいので、「すべての十分大きい標準添字のさらに先」にあります。

<a id="thm-nsa6-sequence-limit"></a>
<!-- formal-statement-start -->
### 定理（数列極限の超準的特徴付け）

標準実数列 $(a_n)$ と標準実数 $L$ に対し、次は同値である。

1. $a_n\to L$。
2. 任意の無限超自然数 $H\in{}^*\mathbb N$ に対して

$$
{}^*a_H\approx L.
$$
<!-- formal-statement-end -->

### 証明の見取り図

収束しているなら、標準 $\varepsilon>0$ に対する「$n\ge N$ なら $|a_n-L|<\varepsilon$」を移送し、無限 $H$ を代入します。

逆向きでは、収束しないならある標準 $\varepsilon_0>0$ について、どれだけ先へ行っても悪い添字が存在します。この文を移送し、出発点として無限超自然数を入れると、極限値に無限小近接しない無限添字を作れます。

<!-- proof-start -->
### 証明

まず $a_n\to L$ とします。標準実数 $\varepsilon>0$ を任意に取ります。収束の定義から、ある標準自然数 $N$ が存在し、

$$
n\ge N
\Longrightarrow
|a_n-L|<\varepsilon
$$

がすべての標準自然数 $n$ で成り立ちます。

$a$、$L$、$\varepsilon$、$N$ を標準パラメータとして固定して移送すると、

$$
\nu\ge N
\Longrightarrow
|{}^*a_\nu-L|<\varepsilon
$$

がすべての $\nu\in{}^*\mathbb N$ で成り立ちます。

$H$ が無限超自然数なら $H\ge N$ なので

$$
|{}^*a_H-L|<\varepsilon.
$$

これは任意の標準 $\varepsilon>0$ で成り立つため ${}^*a_H\approx L$ です。

逆に、すべての無限 $H$ で ${}^*a_H\approx L$ だが $a_n\to L$ ではないと仮定します。収束の否定から、ある標準 $\varepsilon_0>0$ が存在し、

$$
\forall N\in\mathbb N\ \exists n\in\mathbb N,\quad
n\ge N,\quad |a_n-L|\ge\varepsilon_0
$$

となります。

これを移送すると、

$$
\forall N\in{}^*\mathbb N\ \exists \nu\in{}^*\mathbb N,\quad
\nu\ge N,\quad |{}^*a_\nu-L|\ge\varepsilon_0
$$

です。

無限超自然数 $H$ を一つ取り $N=H$ と置くと、ある $\nu\ge H$ が存在して

$$
|{}^*a_\nu-L|\ge\varepsilon_0.
$$

$\nu$ も無限超自然数ですが、標準正実数 $\varepsilon_0$ 以上離れているので ${}^*a_\nu\not\approx L$。矛盾です。
<!-- proof-end -->

### 具体例：$1/n$ の「十分先」

$a_n=1/n$ $(n\ge1)$ とします。無限超自然数 $H$ に対して

$$
{}^*a_H=\frac1H.
$$

任意の標準 $m\ge1$ に対し $H>m$ なので

$$
0<\frac1H<\frac1m.
$$

従って $1/H$ は無限小で、${}^*a_H\approx0$ です。

---

## 2. Cauchy 条件では二つの無限添字を比べる

極限値 $L$ を最初から知らないときは、列の後ろ同士を比較する Cauchy 条件を使います。標準定義では二つの添字 $m,n$ を同時に十分大きくします。超準的には、二つとも無限添字にすればよいはずです。

<a id="thm-nsa6-cauchy"></a>
<!-- formal-statement-start -->
### 定理（Cauchy 条件の超準的特徴付け）

標準実数列 $(a_n)$ に対し、次は同値である。

1. $(a_n)$ は Cauchy 列である。
2. 任意の無限超自然数 $H,K$ に対して

$$
{}^*a_H\approx{}^*a_K.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy 条件を満たす向きは

$$
m,n\ge N
\Longrightarrow
|a_m-a_n|<\varepsilon
$$

を移送します。逆向きは Cauchy 条件の否定を移送し、無限 $N$ の先に互いに標準量だけ離れた二つの超添字を作ります。

<!-- proof-start -->
### 証明

$(a_n)$ が Cauchy 列とします。標準 $\varepsilon>0$ に対し、ある標準 $N$ が存在し

$$
m,n\ge N
\Longrightarrow
|a_m-a_n|<\varepsilon
$$

が成り立ちます。移送すると、すべての $\mu,\nu\in{}^*\mathbb N$ について

$$
\mu,\nu\ge N
\Longrightarrow
|{}^*a_\mu-{}^*a_\nu|<\varepsilon.
$$

無限 $H,K$ はともに $N$ 以上なので、任意の標準 $\varepsilon>0$ に対して

$$
|{}^*a_H-{}^*a_K|<\varepsilon.
$$

従って ${}^*a_H\approx{}^*a_K$ です。

逆に Cauchy 条件が成り立たないとします。ある標準 $\varepsilon_0>0$ が存在して

$$
\forall N\in\mathbb N\ \exists m,n\in\mathbb N,\quad
m,n\ge N,\quad |a_m-a_n|\ge\varepsilon_0
$$

となります。移送後、無限 $N=H$ を代入すると、無限 $\mu,\nu\ge H$ が存在し

$$
|{}^*a_\mu-{}^*a_\nu|\ge\varepsilon_0.
$$

従って ${}^*a_\mu\not\approx{}^*a_\nu$ です。
<!-- proof-end -->

実数の完備性を合わせれば、「すべての無限添字で値同士が無限小近接する」ことから標準極限の存在へ戻れます。ここで極限値を生み出しているのは依然として $\mathbb R$ の完備性です。

---

## 3. 連続性は「無限小近接を保つ」

標準関数 $f:E\to\mathbb R$ と標準点 $a\in E$ を考えます。点 $a$ での連続性は、入力を $a$ に十分近づければ出力を $f(a)$ に十分近づけられる、という性質でした。

<a id="thm-nsa6-continuity"></a>
<!-- formal-statement-start -->
### 定理（連続性の超準的特徴付け）

標準集合 $E\subseteq\mathbb R$、標準写像 $f:E\to\mathbb R$、標準点 $a\in E$ に対し、次は同値である。

1. $f$ は $a$ で連続である。
2. 任意の $x\in{}^*E$ について

$$
x\approx a
\Longrightarrow
{}^*f(x)\approx f(a).
$$
<!-- formal-statement-end -->

### 証明の見取り図

連続なら、標準 $\varepsilon$ に対して得た標準 $\delta$ を固定して連続性の含意を移送します。連続でないなら、その失敗命題を移送し、正の無限小 $\delta=1/H$ を代入して反例を作ります。

<!-- proof-start -->
### 証明

$f$ が $a$ で連続とします。標準 $\varepsilon>0$ に対し、ある標準 $\delta>0$ が存在し、

$$
x\in E,\quad |x-a|<\delta
\Longrightarrow
|f(x)-f(a)|<\varepsilon.
$$

移送すると、任意の $x\in{}^*E$ に対して同じ含意が成り立ちます。$x\approx a$ なら $|x-a|<\delta$ なので

$$
|{}^*f(x)-f(a)|<\varepsilon.
$$

標準 $\varepsilon>0$ は任意だから ${}^*f(x)\approx f(a)$ です。

逆に $f$ が $a$ で連続でないとします。ある標準 $\varepsilon_0>0$ が存在し、任意の標準 $\delta>0$ に対してある $x\in E$ が存在して

$$
|x-a|<\delta,\qquad |f(x)-f(a)|\ge\varepsilon_0.
$$

この命題を移送します。無限超自然数 $H$ を取り $\rho=1/H$ を代入すると、ある $x\in{}^*E$ が存在して

$$
|x-a|<\rho,\qquad |{}^*f(x)-f(a)|\ge\varepsilon_0.
$$

$\rho$ は無限小なので $x\approx a$ ですが、出力差は標準正実数 $\varepsilon_0$ 以上です。従って超準条件が破れます。
<!-- proof-end -->

### 具体例：$f(x)=x^2$

$x=a+\eta$、$\eta\approx0$ とします。すると

$$
{}^*f(x)-f(a)
=
(a+\eta)^2-a^2
=
2a\eta+\eta^2.
$$

標準実数 $a$ は有限超実数なので $2a\eta$ と $\eta^2$ は無限小です。従って $x\approx a$ なら $x^2\approx a^2$ です。

---

## 4. 一様連続性では基準点を標準点に固定しない

点 $a$ での連続性では比較の片側が標準点 $a$ に固定されていました。一様連続性では定義域のどこでも同じ $\delta$ を使うため、比較する二点を両方とも動かします。

<a id="thm-nsa6-uniform-continuity"></a>
<!-- formal-statement-start -->
### 定理（一様連続性の超準的特徴付け）

標準集合 $E\subseteq\mathbb R$ と標準写像 $f:E\to\mathbb R$ に対し、次は同値である。

1. $f$ は $E$ 上一様連続である。
2. 任意の $x,y\in{}^*E$ について

$$
x\approx y
\Longrightarrow
{}^*f(x)\approx{}^*f(y).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f$ が一様連続とします。標準 $\varepsilon>0$ に対し、ある標準 $\delta>0$ が存在し、すべての標準 $x,y\in E$ について

$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|<\varepsilon.
$$

移送すると任意の $x,y\in{}^*E$ について同じ含意が成り立ちます。$x\approx y$ なら $|x-y|<\delta$ なので ${}^*f(x)\approx{}^*f(y)$ です。

逆に一様連続でないとします。ある標準 $\varepsilon_0>0$ が存在し、任意の標準 $\delta>0$ に対して標準 $x,y\in E$ を取れて

$$
|x-y|<\delta,\qquad |f(x)-f(y)|\ge\varepsilon_0.
$$

この命題を移送し、無限 $H$ に対する $\delta=1/H$ を代入すると、ある $x,y\in{}^*E$ が存在して

$$
|x-y|<\frac1H,\qquad |{}^*f(x)-{}^*f(y)|\ge\varepsilon_0.
$$

よって $x\approx y$ なのに出力は無限小近接しません。
<!-- proof-end -->

### 連続だが一様連続でない例：$x^2$ on $\mathbb R$

無限超自然数 $H$ を取り、

$$
x=H,\qquad y=H+\frac1H
$$

と置きます。差 $y-x=1/H$ は無限小なので $x\approx y$ です。しかし

$$
y^2-x^2
=
2+\frac1{H^2}.
$$

右辺は $2$ に無限小近接し、0には無限小近接しません。従って $x^2\not\approx y^2$ です。

---

## 5. コンパクト性は「全ての超準点が標準世界の近くに戻る」

一様連続性の反例では、$H$ のような無限遠の点が効きました。コンパクト集合では、そのような逃げ方ができません。

距離空間 $(X,d)$ の標準部分集合 $K$ を考えます。$x\in{}^*K$ が、ある標準点 $a\in K$ に超準距離で無限小だけ近いなら、「$x$ は標準世界のすぐそばにある」と言えます。これを一つの概念として固定します。

<a id="def-nsa6-nearstandard"></a>
<!-- formal-statement-start -->
### 定義（nearstandard point）

標準距離空間 $(X,d)$ の標準部分集合 $K\subseteq X$ と $x\in{}^*K$ に対し、ある標準点 $a\in K$ が存在して

$$
{}^*d(x,a)
$$

が無限小であるとき、$x$ を $K$ の **nearstandard point** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa6-nearstandard -->
**定義の確認**。$K=[0,1]\subset\mathbb R$ とし、正の無限小 $\eta=1/H$ を取ります。

$$
0<\eta<1
$$

なので $\eta\in{}^*K$ です。また $|\eta-0|=\eta$ は無限小なので、$\eta$ は標準点 $0\in K$ に無限小近接する nearstandard point です。
<!-- definition-example-end -->

<a id="thm-nsa6-compact-nearstandard"></a>
<!-- formal-statement-start -->
### 定理（コンパクト性の nearstandard 特徴付け）

標準距離空間 $(X,d)$ の標準部分集合 $K\subseteq X$ に対し、次は同値である。

1. $K$ はコンパクトである。
2. 任意の $x\in{}^*K$ は $K$ の nearstandard point である。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクトなら、各半径 $1/m$ で $K$ を有限個の球で覆います。$x=[x_n]$ の各 $x_n$ はその有限個のどれかに入るので、超フィルターは一つの球を選びます。こうして得た中心列から、点列コンパクト性で一つの標準極限点を作ります。

逆向きでは、任意の標準点列 $(x_n)\subset K$ を超準点 $[x_n]$ にまとめます。nearstandard 性から標準 $a\in K$ を得ると、$a$ の $1/k$ 近傍へ入る添字集合がすべて $\mathcal U$ に属します。各集合は無限なので、添字を増加させながら選んで $a$ へ収束する部分列を作れます。

<!-- proof-start -->
### 証明

まず $K$ がコンパクトとします。$K=\varnothing$ の場合は自明なので $K\ne\varnothing$ とし、$x\in{}^*K$ を取ります。代表列を必要なら $\mathcal U$ に属さない添字上だけ変更して

$$
x=[x_n],\qquad x_n\in K
$$

とできます。

標準自然数 $m\ge1$ を固定します。コンパクト距離空間は全有界なので、有限個の標準点

$$
a_{m,1},\ldots,a_{m,r_m}\in K
$$

を取り、

$$
K\subseteq\bigcup_{j=1}^{r_m}B(a_{m,j},1/m)
$$

とできます。

各 $j$ について

$$
A_{m,j}=\{n:d(x_n,a_{m,j})<1/m\}
$$

と置きます。有限個の $A_{m,j}$ の和集合は $\mathbb N$ です。超フィルター性から少なくとも一つ $A_{m,j(m)}\in\mathcal U$ となる $j(m)$ が存在します。$a_m=a_{m,j(m)}$ と置けば

$$
{}^*d(x,a_m)<\frac1m.
$$

標準列 $(a_m)\subset K$ は、点列コンパクト性から収束部分列 $a_{m_k}\to a\in K$ を持ちます。

標準 $\varepsilon>0$ を任意に取り、十分大きい $k$ で

$$
\frac1{m_k}<\frac{\varepsilon}{2},
\qquad
d(a_{m_k},a)<\frac{\varepsilon}{2}
$$

とします。移送された三角不等式から

$$
{}^*d(x,a)
\le
{}^*d(x,a_{m_k})+d(a_{m_k},a)
<
\varepsilon.
$$

標準 $\varepsilon>0$ は任意なので ${}^*d(x,a)$ は無限小です。

逆に ${}^*K$ の全点が nearstandard とします。距離空間ではコンパクト性と点列コンパクト性が同値なので、任意の標準点列 $(x_n)\subset K$ が $K$ 内収束部分列を持つことを示します。

$x=[x_n]\in{}^*K$ と置きます。nearstandard 性から、ある標準 $a\in K$ が存在して ${}^*d(x,a)$ は無限小です。従って各標準 $k\ge1$ で

$$
A_k=\{n:d(x_n,a)<1/k\}\in\mathcal U.
$$

自由超フィルターの要素は有限集合ではないので $A_k$ は無限です。よって帰納的に

$$
n_1<n_2<\cdots,\qquad n_k\in A_k
$$

と取れます。このとき

$$
d(x_{n_k},a)<\frac1k\to0,
$$

従って $x_{n_k}\to a\in K$ です。よって $K$ は点列コンパクト、したがってコンパクトです。
<!-- proof-end -->

注意すべき点は、「収束部分列の添字集合が自動的に $\mathcal U$ に入る」とはしていないことです。前向きでは有限被覆を超フィルターが一つ選ぶ性質を使っています。

---

## 6. コンパクト集合上の連続性が一様になる理由

標準解析の Heine--Cantor は、超準的には「コンパクト集合の超準点は標準点の近くから逃げない」ことで説明できます。

<a id="cor-nsa6-heine-cantor"></a>
<!-- formal-statement-start -->
### 系（Heine--Cantor の超準的証明）

$K$ を標準コンパクト距離空間、$f:K\to\mathbb R$ を標準連続関数とする。このとき $f$ は一様連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意に $x,y\in{}^*K$ を取り $x\approx y$ とします。コンパクト性の nearstandard 特徴付けから、ある標準 $a\in K$ が存在して $x\approx a$ です。従って $y\approx a$ でもあります。

$f$ は $a$ で連続なので

$$
{}^*f(x)\approx f(a),
\qquad
{}^*f(y)\approx f(a).
$$

よって ${}^*f(x)\approx{}^*f(y)$。任意の $x,y\in{}^*K$ で成り立つため、一様連続性の超準的特徴付けから $f$ は一様連続です。
<!-- proof-end -->

---

## 7. 量化順序を見失わない

点 $a$ での連続性は

$$
x\approx a
\Longrightarrow
{}^*f(x)\approx f(a).
$$

一様連続性は

$$
x\approx y
\Longrightarrow
{}^*f(x)\approx{}^*f(y)
\qquad(x,y\in{}^*E).
$$

コンパクト性は

$$
x\in{}^*K
\Longrightarrow
\exists a\in K\text{ standard},\quad x\approx a.
$$

点での連続性は標準基準点の monad だけを見ます。一様連続性は無限遠を含む ${}^*E$ 全体で互いに近い二点を見ます。コンパクト性は、その ${}^*K$ 全体が標準点の monad から逃げないことを保証します。

---

## 演習

<a id="ex-nsa6-a01"></a>
#### NSA6-A01 $1/n$ の極限
- Level: A

$a_n=1/n$ $(n\ge1)$ とする。任意の無限超自然数 $H$ に対して ${}^*a_H\approx0$ を示し、数列極限の超準的特徴付けから $a_n\to0$ を確認せよ。

<!-- solution-start -->
**詳細解答**。無限 $H$ は任意の標準自然数 $m\ge1$ より大きいので $0<1/H<1/m$。従って $1/H$ は無限小で

$$
{}^*a_H=\frac1H\approx0.
$$

任意の無限 $H$ で成り立つため、数列極限の超準的特徴付けから $a_n\to0$ です。
<!-- solution-end -->

<a id="ex-nsa6-a02"></a>
#### NSA6-A02 交代列は Cauchy でない
- Level: A

$a_n=(-1)^n$ とする。無限超自然数 $H$ と $H+1$ を使って Cauchy 条件が失敗することを示せ。

<!-- solution-start -->
**詳細解答**。$H+1$ も無限です。移送された恒等式から ${}^*a_{H+1}=-{}^*a_H$。また ${}^*a_H$ は $1$ または $-1$ なので

$$
|{}^*a_{H+1}-{}^*a_H|=2.
$$

差は無限小ではないので Cauchy 条件の超準的特徴付けが破れます。
<!-- solution-end -->

<a id="ex-nsa6-a03"></a>
#### NSA6-A03 二乗関数の連続性
- Level: A

$f(x)=x^2$ とし、標準 $a$ を固定する。$x\approx a$ なら ${}^*f(x)\approx f(a)$ を直接示せ。

<!-- solution-start -->
**詳細解答**。$x=a+\eta$ と置くと $\eta$ は無限小で、

$$
{}^*f(x)-f(a)=2a\eta+\eta^2.
$$

標準 $a$ は有限なので両項は無限小です。従って ${}^*f(x)\approx f(a)$。
<!-- solution-end -->

<a id="ex-nsa6-a04"></a>
#### NSA6-A04 $x^2$ は $\mathbb R$ 上で一様連続でない
- Level: A

無限 $H$ に対し $x=H$, $y=H+1/H$ と置く。$x\approx y$ だが $x^2\not\approx y^2$ を示せ。

<!-- solution-start -->
**詳細解答**。$y-x=1/H$ は無限小です。一方

$$
y^2-x^2=2+\frac1{H^2}
$$

の標準部は2なので無限小ではありません。一様連続性の超準的特徴付けから結論が従います。
<!-- solution-end -->

<a id="ex-nsa6-a05"></a>
#### NSA6-A05 $[0,1]$ の超準点
- Level: A

$x\in{}^*[0,1]$ とする。$x$ は有限超実数であり、$\operatorname{st}(x)\in[0,1]$ となることを示せ。

<!-- solution-start -->
**詳細解答**。移送された順序から $0\le x\le1$。従って $x$ は有限です。標準部の単調性により

$$
0=\operatorname{st}(0)
\le
\operatorname{st}(x)
\le
\operatorname{st}(1)=1.
$$

よって $\operatorname{st}(x)\in[0,1]$ で、$x\approx\operatorname{st}(x)$。従って $x$ は nearstandard です。
<!-- solution-end -->

<a id="ex-nsa6-b01"></a>
#### NSA6-B01 極限条件の逆向きを再構成する
- Level: B

「任意の無限 $H$ で ${}^*a_H\approx L$」から $a_n\to L$ を示す証明を、収束の否定から再構成せよ。

<!-- solution-start -->
**詳細解答**。収束しないなら、ある標準 $\varepsilon_0>0$ が存在して

$$
\forall N\in\mathbb N\ \exists n\ge N,\quad |a_n-L|\ge\varepsilon_0.
$$

移送して無限 $N=H$ を代入すると、ある無限 $\nu\ge H$ で

$$
|{}^*a_\nu-L|\ge\varepsilon_0.
$$

従って ${}^*a_\nu\not\approx L$ となり仮定に反します。
<!-- solution-end -->

<a id="ex-nsa6-b02"></a>
#### NSA6-B02 $1/x$ は $(0,1)$ 上で一様連続でない
- Level: B

$f(x)=1/x$ とする。無限 $H$ を用いて一様連続性の超準条件を破る二点を作れ。

<!-- solution-start -->
**詳細解答**。$x=1/H$, $y=1/(H+1)$ と置きます。どちらも ${}^*(0,1)$ に属し、

$$
x-y=\frac1{H(H+1)}
$$

は無限小なので $x\approx y$。しかし

$$
{}^*f(x)=H,\qquad {}^*f(y)=H+1
$$

なので出力差は1です。従って一様連続ではありません。
<!-- solution-end -->

<a id="ex-nsa6-b03"></a>
#### NSA6-B03 nearstandard 性から収束部分列を作る
- Level: B

${}^*K$ の全点が nearstandard だとする。標準点列 $(x_n)\subset K$ から $K$ 内へ収束する部分列を構成せよ。

<!-- solution-start -->
**詳細解答**。$x=[x_n]\in{}^*K$ を作ります。nearstandard 性から標準 $a\in K$ が存在して ${}^*d(x,a)$ は無限小です。従って

$$
A_k=\{n:d(x_n,a)<1/k\}\in\mathcal U
$$

で、各 $A_k$ は無限です。帰納的に $n_1<n_2<\cdots$ かつ $n_k\in A_k$ と取れば

$$
d(x_{n_k},a)<1/k\to0.
$$

よって $x_{n_k}\to a\in K$ です。
<!-- solution-end -->

<a id="ex-nsa6-b04"></a>
#### NSA6-B04 Heine--Cantor を三つの無限小近接で追う
- Level: B

$K$ をコンパクト、$f:K\to\mathbb R$ を連続とする。$x,y\in{}^*K$ かつ $x\approx y$ から ${}^*f(x)\approx{}^*f(y)$ を導け。

<!-- solution-start -->
**詳細解答**。nearstandard 特徴付けから標準 $a\in K$ が存在して $x\approx a$。$x\approx y$ なので $y\approx a$ でもあります。点 $a$ での連続性から

$$
{}^*f(x)\approx f(a),
\qquad
{}^*f(y)\approx f(a).
$$

従って ${}^*f(x)\approx{}^*f(y)$。一様連続性の超準的特徴付けから $f$ は一様連続です。
<!-- solution-end -->

<a id="ex-nsa6-c01"></a>
#### NSA6-C01 非コンパクト性・非一様連続性・逃げる超準点
- Level: C

$K=(0,1)$ と $f(x)=1/x$ を考える。無限 $H$ に対する $x=1/H$ と $y=1/(H+1)$ を使い、(i) $x$ が $K$ の nearstandard point でないこと、(ii) $x\approx y$ だが ${}^*f(x)\not\approx{}^*f(y)$ であることを示し、二つの失敗の関係を説明せよ。

<!-- solution-start -->
**詳細解答**。$0<1/H<1$ なので $x\in{}^*K$。また $x\approx0$ ですが $0\notin K$ です。もし標準 $a\in(0,1)$ に $x\approx a$ なら、$a\approx0$ となります。標準実数で無限小なのは0だけなので $a=0$、矛盾です。従って $x$ は nearstandard でなく、$K$ はコンパクトではありません。

さらに

$$
x-y=\frac1{H(H+1)}
$$

は無限小ですが

$$
{}^*f(x)-{}^*f(y)=H-(H+1)=-1
$$

なので出力は無限小近接しません。標準点列 $1/n$ が境界0へ逃げる現象を超準化すると $1/H$ という一つの非 nearstandard 点になり、その同じ場所で $1/x$ は無限小入力差を標準サイズの出力差へ増幅しています。
<!-- solution-end -->
