# NSA8 Riemann 積分と超有限和

<!-- definition-example-audit: strict -->

NSA4 では超有限集合を作り、NSA5 では有限超実数から標準部を取り、NSA6 では「十分大きい添字」を無限超自然数で読み替えました。ここまでの道具を積分へ持ち込むと、教科書でよく描く「幅が限りなく小さい長方形を限りなくたくさん足す」という図を、実際の式として書けます。

ただし、ここには落とし穴があります。各長方形の誤差が無限小でも、**無限超自然数個の誤差を足した結果が無限小とは限りません**。例えば無限 $H$ に対して $1/H$ は無限小ですが、

$$
\sum_{k=0}^{H-1}\frac1H=1
$$

です。

したがってこの章では、「無限小だから捨てる」ではなく、

1. 有限分割と有限和を移送して超有限分割・超有限和を作る。
2. Darboux 上和と下和の差を、標準解析の Riemann 可積分性と結ぶ。
3. その差が無限小になるとき、どの内部標本点を選んでも超有限 Riemann 和が同じ標準部を持つことを示す。

という順に進みます。Loeb 測度や Lebesgue 積分は使いません。標準側の入力は [RA4 の Riemann/Darboux 積分](../RA4/index.md)だけです。

---

## 1. 有限個の長方形を超有限個へ移送する

標準実数 $a<b$ を固定します。標準自然数 $n\ge1$ に対する等分割は

$$
x_{n,k}=a+k\frac{b-a}{n},
\qquad
k=0,1,\ldots,n
$$

です。有限和

$$
\sum_{k=0}^{n-1}c_k
$$

は、$n$ 個の項を順に足す通常の有限操作です。NSA3 の移送原理により、この「有限個」という形を超自然数へ拡張できます。

<a id="def-nsa8-hyperfinite-uniform-partition"></a>
<!-- formal-statement-start -->
### 定義（超有限等分割）

$H\in{}^*\mathbb N_{>0}$ に対し

$$
\Delta_H=\frac{b-a}{H},
\qquad
x_k=a+k\Delta_H
\quad
(0\le k\le H)
$$

と置く。内部集合

$$
P_H=\{x_k:0\le k\le H\}
$$

を $[a,b]$ の **$H$ 等分超有限分割**という。

$H$ が無限超自然数なら $\Delta_H$ は正の無限小である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa8-hyperfinite-uniform-partition -->
**定義の確認**。$a=0,b=1$ とし、無限 $H$ を取ると

$$
P_H=
\left\{
0,\frac1H,\frac2H,\ldots,\frac{H-1}{H},1
\right\}.
$$

内部的な点の個数は $H+1$ で、隣接点の距離は常に $1/H$ です。$H$ は無限なので $1/H$ は無限小ですが、分割全体の長さは

$$
H\cdot\frac1H=1
$$

のままです。
<!-- definition-example-end -->

ここで「$k=0,\ldots,H-1$ を全部走る」は外部的な無限級数ではありません。[NSA4 の超有限初期区間](../NSA4/index.md#prop-nsa4-hyperfinite-initial-segment)上で、有限和という標準操作を移送した**内部的な超有限和**です。

標準有界関数 $f:[a,b]\to\mathbb R$ を考えます。各小区間から標本点を一つずつ選びますが、超有限和の内部操作として扱うため、標本点族も内部的であることを要求します。

<a id="def-nsa8-hyperfinite-riemann-sum"></a>
<!-- formal-statement-start -->
### 定義（超有限 Riemann 和）

$H\in{}^*\mathbb N_{>0}$ とし、$P_H$ を上の超有限等分割とする。内部点族

$$
\xi=(\xi_k)_{0\le k<H}
$$

が

$$
x_k\le \xi_k\le x_{k+1}
\qquad
(0\le k<H)
$$

を満たすとき、

$$
S_H(f;\xi)
=
\sum_{k=0}^{H-1}
{}^*f(\xi_k)\Delta_H
$$

を $f$ の **超有限 Riemann 和**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa8-hyperfinite-riemann-sum -->
**定義の確認**。左端を取る

$$
\xi_k=x_k
$$

は内部点族です。$f(x)=x$、$[a,b]=[0,1]$ なら

$$
S_H(f;\xi)
=
\sum_{k=0}^{H-1}\frac{k}{H}\frac1H.
$$

有限公式

$$
\sum_{k=0}^{n-1}k=\frac{n(n-1)}2
$$

を移送して $n=H$ と置けば

$$
S_H(f;\xi)
=
\frac{H(H-1)}{2H^2}
=
\frac12-\frac1{2H}.
$$

$H$ が無限なら $1/(2H)$ は無限小なので

$$
S_H(f;\xi)\approx\frac12.
$$

標準部を取ると $1/2$ です。
<!-- definition-example-end -->

有限公式を無限 $H$ に代入してよい理由は、「$H$ も普通の自然数だと思う」からではありません。有限和公式が自然数変数についての移送可能な命題であり、[NSA3 の移送原理](../NSA3/index.md#cor-nsa3-transfer)によって超自然数にも成り立つからです。

---

## 2. $x^2$ では本当に $1/3$ が出る

同じ左端分割で $f(x)=x^2$ を考えます。有限公式

$$
\sum_{k=0}^{n-1}k^2
=
\frac{(n-1)n(2n-1)}6
$$

を $H$ へ移送すると

$$
S_H
=
\sum_{k=0}^{H-1}
\left(\frac{k}{H}\right)^2\frac1H
=
\frac{(H-1)H(2H-1)}{6H^3}.
$$

分子を展開して $H^3$ で割ると

$$
S_H
=
\frac13-\frac1{2H}+\frac1{6H^2}.
$$

従って

$$
S_H\approx\frac13,
\qquad
\operatorname{st}(S_H)=\frac13.
$$

この例では有限和公式が明示的なので、超有限和の標準部を直接計算できました。しかし一般の関数では閉じた和の公式はありません。そこで「値を直接足し切る」のではなく、RA4 で使った上和・下和で挟みます。

---

## 3. 等分割の Darboux gap は可積分性を検出する

$f:[a,b]\to\mathbb R$ を標準有界関数とします。標準自然数 $n\ge1$ に対する等分割を $P_n$ とし、[RA4 の Darboux 上和・下和](../RA4/index.md#def-ra4-darboux)を

$$
U_n=U(f,P_n),
\qquad
L_n=L(f,P_n)
$$

と書きます。差

$$
D_n=U_n-L_n\ge0
$$

は、その等分割でまだ残っている「上からの面積」と「下からの面積」の隙間です。

ここで一つ確認が必要です。RA4 の Darboux 判定は「**ある**細かい分割で gap を小さくできる」という条件でした。NSA8 では等分割だけを使いたいので、「Riemann 可積分なら等分割の gap も 0 へ行く」を先に証明します。

<a id="lem-nsa8-uniform-darboux-gap"></a>
<!-- formal-statement-start -->
### 補題（等分割 Darboux gap の収束）

標準有界関数 $f:[a,b]\to\mathbb R$ に対し、次は同値である。

1. $f$ は Riemann 可積分である。
2. 等分割の gap $D_n=U_n-L_n$ が $0$ に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

逆向きは簡単です。$D_n\to0$ なら、任意の $\varepsilon>0$ に対してある等分割で $D_n<\varepsilon$ なので、RA4 の Darboux 判定を使えます。

順向きでは、可積分性から gap の小さい分割 $Q$ を一つ固定します。十分細かい等分割 $P_n$ の小区間のうち、$Q$ の分点を**内部にまたぐ**ものだけを「悪い区間」と呼びます。悪い区間は有限個しかなく、その総延長は mesh とともに 0 へ行きます。それ以外の区間では $Q$ のどれか一区間の中に完全に収まるので、振動を $Q$ の gap で支配できます。

<!-- proof-start -->
### 証明

まず $f$ が Riemann 可積分とします。$|f(x)|\le B$ を満たす標準 $B\ge1$ を取ります。

標準 $\varepsilon>0$ を任意に固定します。[Darboux 可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion)から、ある標準分割

$$
Q:a=q_0<q_1<\cdots<q_m=b
$$

が存在して

$$
U(f,Q)-L(f,Q)<\frac{\varepsilon}{2}.
$$

等分割 $P_n$ の幅を

$$
\Delta_n=\frac{b-a}{n}
$$

とします。$Q$ の内部分点 $q_1,\ldots,q_{m-1}$ のどれかを**小区間の内部に含む** $P_n$ の小区間を悪い区間と呼びます。各内部分点につき悪い区間は高々1個なので、悪い区間は高々 $m-1$ 個です。

悪い区間一つでの $f$ の振動は高々 $2B$ です。したがって悪い区間が Darboux gap へ与える寄与は高々

$$
2B(m-1)\Delta_n.
$$

一方、悪くない $P_n$ の各小区間は、ある $Q$ の小区間 $[q_{j-1},q_j]$ の中に含まれます。そのような小区間での振動は $Q$ 側の振動以下です。同じ $Q$ 区間に含まれる良い小区間の長さを全部足しても $q_j-q_{j-1}$ 以下なので、良い区間全体の寄与は

$$
U(f,Q)-L(f,Q)
$$

以下です。

従って

$$
D_n
\le
U(f,Q)-L(f,Q)
+
2B(m-1)\Delta_n.
$$

$n$ を十分大きくして

$$
2B(m-1)\Delta_n<\frac{\varepsilon}{2}
$$

とすれば

$$
D_n<\varepsilon.
$$

よって $D_n\to0$ です。

逆に $D_n\to0$ とします。任意の標準 $\varepsilon>0$ に対してある $n$ が存在し

$$
U(f,P_n)-L(f,P_n)=D_n<\varepsilon.
$$

したがって [Darboux 可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion)から $f$ は Riemann 可積分です。
<!-- proof-end -->

この補題で、Riemann 可積分性を「標準実数列 $D_n$ が 0 に収束する」という形へ変換できました。ここから NSA6 の数列極限の特徴付けをそのまま使えます。

---

## 4. Riemann 可積分性の超準的特徴付け

標準列 $(D_n)$ の超準拡張を $({}^*D_H)$ と書きます。これは、有限の等分割について定義した Darboux 上和・下和の列を、超自然数 $H$ まで移送したものです。

ここでの $\,{}^*U_H,{}^*L_H$ は**内部的な**等分割に対する移送値です。外部集合すべてに上限・下限が存在すると主張しているわけではありません。NSA5 で注意した「$\,{}^*\mathbb R$ は Dedekind 完備ではない」という点とは衝突しません。

<a id="thm-nsa8-riemann-integrability"></a>
<!-- formal-statement-start -->
### 定理（Riemann 可積分性の超準的特徴付け）

標準有界関数 $f:[a,b]\to\mathbb R$ に対し、次は同値である。

1. $f$ は Riemann 可積分である。
2. 任意の無限超自然数 $H\in{}^*\mathbb N$ に対して

$$
{}^*U_H-{}^*L_H\approx0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節の補題から、

$$
f\text{ が Riemann 可積分}
\iff
D_n\to0
$$

です。

一方、[NSA6 の数列極限の超準的特徴付け](../NSA6/index.md#thm-nsa6-sequence-limit)を標準実数列 $D_n$ と標準極限値 $0$ に適用すると、

$$
D_n\to0
\iff
\text{任意の無限 }H\text{ について }{}^*D_H\approx0.
$$

定義から

$$
{}^*D_H={}^*U_H-{}^*L_H
$$

なので、二つの同値をつなげれば結論を得ます。
<!-- proof-end -->

この定理の利点は、可積分性を「無限小 mesh の分割では上から見ても下から見ても面積が同じ」という一行へ圧縮できることです。ただし、その一行の背後には前節の標準的な boundary-cell 評価があります。

---

## 5. 標本点をどう選んでも標準部は同じになる

有限の 標本点付き Riemann 和には、常に

$$
L_n
\le
\sum_{k=0}^{n-1}f(\xi_k)\Delta_n
\le
U_n
$$

が成り立ちます。これは各小区間で

$$
\inf f\le f(\xi_k)\le\sup f
$$

だからです。この有限の不等式を移送すれば、内部標本点族を使った超有限和でも

$$
{}^*L_H
\le
S_H(f;\xi)
\le
{}^*U_H
$$

が成り立ちます。

<a id="cor-nsa8-hyperfinite-integral"></a>
<!-- formal-statement-start -->
### 系（積分は超有限 Riemann 和の標準部）

標準有界関数 $f:[a,b]\to\mathbb R$ が Riemann 可積分で

$$
I=\int_a^b f(x)\,dx
$$

とする。

任意の無限超自然数 $H$ と、$H$ 等分超有限分割上の任意の内部標本点族 $\xi$ に対して

$$
S_H(f;\xi)\approx I.
$$

特に $S_H(f;\xi)$ は有限超実数であり、

$$
\int_a^b f(x)\,dx
=
\operatorname{st}\left(S_H(f;\xi)\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

標準有限分割では、下和 $\le$ 積分値 $\le$ 上和です。この不等式も移送できます。超準的可積分性判定により上和と下和の差は無限小なので、その間に挟まれた積分値と 標本点付き和 も互いに無限小近接します。

<!-- proof-start -->
### 証明

Riemann 可積分性から、任意の標準有限分割 $P_n$ について

$$
L_n\le I\le U_n.
$$

移送により無限 $H$ でも

$$
{}^*L_H\le I\le{}^*U_H.
$$

また 標本点付き和 について

$$
{}^*L_H\le S_H(f;\xi)\le{}^*U_H.
$$

従って $I$ と $S_H(f;\xi)$ はともに区間

$$
[{}^*L_H,{}^*U_H]
$$

の中にあります。よって

$$
|S_H(f;\xi)-I|
\le
{}^*U_H-{}^*L_H.
$$

[超準的可積分性判定](#thm-nsa8-riemann-integrability)から右辺は無限小です。したがって

$$
S_H(f;\xi)\approx I.
$$

$I$ は標準実数なので $S_H(f;\xi)$ は有限であり、[NSA5 の標準部](../NSA5/index.md#def-nsa5-standard-part)を取って

$$
\operatorname{st}(S_H(f;\xi))=I.
$$
<!-- proof-end -->

ここで「左端点を選ぶ」という特別な選択は不要になりました。内部標本点なら、左端・右端・中点・小区間ごとに異なる選び方でも、可積分関数では標準部が同じです。

---

## 6. 連続関数では一様連続性が gap を直接つぶす

RA4 では $[a,b]$ 上の連続関数が Riemann 可積分であることを証明しました。超準側では、なぜ長方形の高さの選び方が問題にならなくなるのかを [NSA6 の一様連続性](../NSA6/index.md#thm-nsa6-uniform-continuity)から直接読めます。

<a id="prop-nsa8-continuous-hyperfinite"></a>
<!-- formal-statement-start -->
### 命題（連続関数の超有限和）

標準連続関数 $f:[a,b]\to\mathbb R$、無限超自然数 $H$、$H$ 等分超有限分割上の内部標本点族 $\xi$ に対し、

$$
\operatorname{st}\left(S_H(f;\xi)\right)
=
\int_a^b f(x)\,dx.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Heine--Cantor の超準的証明](../NSA6/index.md#cor-nsa6-heine-cantor)から $f$ は $[a,b]$ 上一様連続です。また [RA4 の連続関数の Riemann 可積分性](../RA4/index.md#thm-ra4-continuous)から $f$ は Riemann 可積分です。

従って前節の系を適用でき、

$$
S_H(f;\xi)
\approx
\int_a^b f(x)\,dx.
$$

標準部を取れば結論を得ます。

一様連続性が何をしているかも確認します。標準 $\varepsilon>0$ に対し、一様連続性から標準 $\delta>0$ が存在して

$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|<\frac{\varepsilon}{b-a}.
$$

$H$ は無限なので $\Delta_H<\delta$。各小区間内の二点の距離は高々 $\Delta_H$ だから、各小区間での高さの振れは $\varepsilon/(b-a)$ 以下です。幅を掛けて超有限個足すと、総差は

$$
\frac{\varepsilon}{b-a}
\sum_{k=0}^{H-1}\Delta_H
=
\frac{\varepsilon}{b-a}(b-a)
=
\varepsilon
$$

以下です。

ここでは「各差が無限小だから足しても無限小」とは言っていません。任意の**標準** $\varepsilon$ に対する一様な上界を先に作り、それを総長 $b-a$ と掛けています。
<!-- proof-end -->

---

## 7. 不連続でも可積分な関数、可積分でない関数

### 7.1 一点の跳びは消える

$[0,1]$ 上で

$$
f(x)=
\begin{cases}
0,&x<c,\\
1,&x\ge c
\end{cases}
\qquad
(0<c<1)
$$

とします。

$H$ 等分割で $c$ を内部にまたぐ小区間は高々1個です。それ以外では関数は定数なので上和と下和の差への寄与は0です。悪い区間の幅は $1/H$ だから

$$
0\le{}^*U_H-{}^*L_H\le\frac1H\approx0.
$$

従って超準的可積分性判定から $f$ は Riemann 可積分です。不連続点が一つあること自体では、面積は壊れません。

### 7.2 Dirichlet 関数では全区間が振動する

一方、

$$
d(x)=
\begin{cases}
1,&x\in\mathbb Q,\\
0,&x\notin\mathbb Q
\end{cases}
$$

を $[0,1]$ 上で考えます。

有理数と無理数は任意の標準開区間に存在します。この密度の命題を移送すると、各正の長さを持つ内部小区間にも $\,{}^*\mathbb Q$ の点とその補集合の点が存在します。従って各セルで

$$
\sup{}^*d=1,
\qquad
\inf{}^*d=0.
$$

よって無限 $H$ でも

$$
{}^*U_H-{}^*L_H
=
H\cdot\frac1H
=
1.
$$

これは無限小ではありません。したがって $d$ は Riemann 可積分ではありません。

「mesh が無限小なら何でも積分できる」のではありません。**各セルの振動が超有限個の総和として消えるか**が本質です。

---

## 8. この章で得た見方

Riemann 積分を超準的に書くと

$$
\int_a^b f(x)\,dx
=
\operatorname{st}
\left(
\sum_{k=0}^{H-1}
{}^*f(\xi_k)\Delta_H
\right)
$$

という、17世紀的な「無限小長方形の和」に近い形になります。

しかし厳密化の核心は式の見た目ではなく、

- $H$ は無限超自然数である。
- 和は有限和の移送として定義された内部的な超有限和である。
- 標本点族は内部的である。
- Riemann 可積分性は超有限 Darboux gap が無限小になることと同値である。
- 標準部を取る前に和が有限であることを確認する。
- 超有限個の無限小を足すときは、一様評価や Darboux gap を使う。

という論理の鎖にあります。

Loeb 測度を導入すると超有限集合から測度論へさらに進めますが、それはこの章の道具ではありません。ここでは Riemann 積分の範囲だけで完結させました。

---

## 演習

<a id="ex-nsa8-a01"></a>
### NSA8-A01 $f(x)=x$ の左端和
- Level: A

$[0,1]$ を無限 $H$ 等分し、左端点を標本点に取る。超有限 Riemann 和を計算し、その標準部を求めよ。

<!-- solution-start -->
**詳細解答**。

$$
S_H
=
\sum_{k=0}^{H-1}\frac{k}{H}\frac1H
=
\frac1{H^2}\sum_{k=0}^{H-1}k.
$$

有限公式を移送して

$$
\sum_{k=0}^{H-1}k=\frac{H(H-1)}2.
$$

従って

$$
S_H
=
\frac{H(H-1)}{2H^2}
=
\frac12-\frac1{2H}.
$$

$H$ は無限なので $1/(2H)$ は無限小です。よって

$$
S_H\approx\frac12,
\qquad
\operatorname{st}(S_H)=\frac12.
$$
<!-- solution-end -->

<a id="ex-nsa8-a02"></a>
### NSA8-A02 $f(x)=x^2$ の左端和
- Level: A

同じ分割で $f(x)=x^2$ とする。有限公式

$$
\sum_{k=0}^{n-1}k^2=\frac{(n-1)n(2n-1)}6
$$

を使って標準部を求めよ。

<!-- solution-start -->
**詳細解答**。

$$
S_H
=
\frac1{H^3}\sum_{k=0}^{H-1}k^2
=
\frac{(H-1)H(2H-1)}{6H^3}.
$$

分子を展開すると

$$
(H-1)H(2H-1)=2H^3-3H^2+H.
$$

従って

$$
S_H
=
\frac13-\frac1{2H}+\frac1{6H^2}.
$$

後二項は無限小なので

$$
\operatorname{st}(S_H)=\frac13.
$$
<!-- solution-end -->

<a id="ex-nsa8-a03"></a>
### NSA8-A03 標本点をずらす
- Level: A

$f(x)=x$、$[0,1]$ とする。標準 $\theta\in[0,1]$ を固定し、

$$
\xi_k=\frac{k+\theta}{H}
$$

と取る。$S_H(f;\xi)$ を計算し、$\theta$ によらず標準部が $1/2$ になることを示せ。

<!-- solution-start -->
**詳細解答**。

$$
S_H
=
\sum_{k=0}^{H-1}
\frac{k+\theta}{H}\frac1H
=
\frac1{H^2}
\left(
\sum_{k=0}^{H-1}k+H\theta
\right).
$$

したがって

$$
S_H
=
\frac{H(H-1)}{2H^2}
+
\frac{H\theta}{H^2}
=
\frac12+\frac{\theta-\frac12}{H}.
$$

$\theta-\frac12$ は標準有限実数、$1/H$ は無限小なので第二項は無限小です。よって

$$
\operatorname{st}(S_H)=\frac12.
$$
<!-- solution-end -->

<a id="ex-nsa8-a04"></a>
### NSA8-A04 一点ジャンプの Darboux gap
- Level: A

$$
f(x)=
\begin{cases}
0,&x<c,\\
1,&x\ge c
\end{cases}
$$

を $[0,1]$ 上で考える。無限 $H$ 等分に対して

$$
{}^*U_H-{}^*L_H\le\frac1H
$$

を示せ。

<!-- solution-start -->
**詳細解答**。$c$ を内部にまたがない小区間では $f$ は0または1の定数なので、その区間の上限と下限は等しく、gap への寄与は0です。

$c$ を内部にまたぐ小区間は高々1個です。その区間での上限は1、下限は0なので振動は1、幅は $1/H$ です。従って全 gap は

$$
{}^*U_H-{}^*L_H
\le
1\cdot\frac1H
=
\frac1H.
$$

$H$ が無限なら右辺は無限小です。
<!-- solution-end -->

<a id="ex-nsa8-a05"></a>
### NSA8-A05 「各項が無限小」の危険
- Level: A

無限 $H$ に対し、$H$ 個の項がすべて $1/H$ である超有限和を計算せよ。また、この例が「各誤差が無限小なら総誤差も無限小」という推論への反例である理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

各項 $1/H$ は無限小ですが、

$$
\sum_{k=0}^{H-1}\frac1H
=
H\frac1H
=
1.
$$

総和は標準実数1であり、無限小ではありません。従って超有限和では、各項を個別に $0$ とみなして捨てることはできません。

NSA8 ではこの問題を、一様な $\varepsilon$ 評価または Darboux 上和と下和の gap で総和全体を直接抑えることで回避します。
<!-- solution-end -->

<a id="ex-nsa8-b01"></a>
### NSA8-B01 連続関数で標本点依存性を消す
- Level: B

$f:[a,b]\to\mathbb R$ が連続とする。同じ無限 $H$ 等分上の二つの内部標本点族 $\xi,\eta$ に対し、

$$
S_H(f;\xi)-S_H(f;\eta)\approx0
$$

を一様連続性から直接示せ。

<!-- solution-start -->
**詳細解答**。$[a,b]$ 上の連続関数は一様連続です。標準 $\varepsilon>0$ を任意に取ります。一様連続性から標準 $\delta>0$ が存在して

$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|<\frac{\varepsilon}{b-a}.
$$

$H$ は無限なので $\Delta_H=(b-a)/H<\delta$ です。同じ小区間にある $\xi_k,\eta_k$ について

$$
|\xi_k-\eta_k|\le\Delta_H<\delta
$$

だから

$$
|{}^*f(\xi_k)-{}^*f(\eta_k)|
<
\frac{\varepsilon}{b-a}.
$$

従って

$$
|S_H(f;\xi)-S_H(f;\eta)|
\le
\sum_{k=0}^{H-1}
\frac{\varepsilon}{b-a}\Delta_H.
$$

超有限和の幅の総和は

$$
\sum_{k=0}^{H-1}\Delta_H
=
H\Delta_H=b-a
$$

なので

$$
|S_H(f;\xi)-S_H(f;\eta)|\le\varepsilon.
$$

任意の標準 $\varepsilon>0$ で成り立つから差は無限小です。
<!-- solution-end -->

<a id="ex-nsa8-b02"></a>
### NSA8-B02 Dirichlet 関数はなぜ失敗するか
- Level: B

Dirichlet 関数 $d=1_{\mathbb Q}$ を $[0,1]$ 上で考える。各超有限セルの上限が1、下限が0になることを使い、超準的可積分性判定が失敗することを示せ。

<!-- solution-start -->
**詳細解答**。有理数と無理数の稠密性を移送すると、正の長さを持つ各内部セルには $\,{}^*\mathbb Q$ の点と、その補集合の点が存在します。

したがって各セルで

$$
\sup{}^*d=1,
\qquad
\inf{}^*d=0.
$$

幅は $1/H$ なので

$$
{}^*U_H
=
H\cdot1\cdot\frac1H
=
1,
$$

$$
{}^*L_H
=
H\cdot0\cdot\frac1H
=
0.
$$

従って

$$
{}^*U_H-{}^*L_H=1
$$

であり無限小ではありません。[Riemann 可積分性の超準的特徴付け](#thm-nsa8-riemann-integrability)に反するため、$d$ は Riemann 可積分ではありません。
<!-- solution-end -->

<a id="ex-nsa8-b03"></a>
### NSA8-B03 $H$ と標本点を変えても積分値は変わらない
- Level: B

$f$ が Riemann 可積分で積分値を $I$ とする。無限超自然数 $H,K$ と、それぞれの等分割上の内部標本点族 $\xi,\eta$ に対し、

$$
S_H(f;\xi)\approx S_K(f;\eta)
$$

を示せ。

<!-- solution-start -->
**詳細解答**。[積分は超有限 Riemann 和の標準部](#cor-nsa8-hyperfinite-integral)から

$$
S_H(f;\xi)\approx I
$$

かつ

$$
S_K(f;\eta)\approx I.
$$

したがって

$$
S_H(f;\xi)-S_K(f;\eta)
=
\bigl(S_H(f;\xi)-I\bigr)
-
\bigl(S_K(f;\eta)-I\bigr).
$$

右辺は無限小同士の差なので無限小です。よって

$$
S_H(f;\xi)\approx S_K(f;\eta).
$$

従って両者の標準部はどちらも $I$ です。
<!-- solution-end -->

<a id="ex-nsa8-b04"></a>
### NSA8-B04 等分割だけで可積分性を判定できる理由
- Level: B

$f$ が Riemann 可積分で $|f|\le B$ とする。gap が $\varepsilon/2$ 未満の標準分割 $Q$ を固定したとき、十分細かい等分割 $P_n$ について

$$
U(f,P_n)-L(f,P_n)
\le
U(f,Q)-L(f,Q)+2B(m-1)\Delta_n
$$

となる理由を、「$Q$ の分点をまたぐ区間」と「またがない区間」に分けて説明せよ。

<!-- solution-start -->
**詳細解答**。$Q$ の内部分点は $m-1$ 個です。各内部分点を小区間の内部に含む $P_n$ のセルは高々1個なので、悪いセルは高々 $m-1$ 個です。

悪いセル一つでの振動は、$|f|\le B$ から高々 $2B$、幅は $\Delta_n$ です。従って悪いセル全体の寄与は高々

$$
2B(m-1)\Delta_n.
$$

一方、良いセルはどれか一つの $Q$ のセルに完全に含まれます。同じ $Q$ セル内の良いセルでは振動は $Q$ セルの振動以下で、その幅の総和は $Q$ セルの長さ以下です。

従って良いセル全部の gap 寄与は

$$
U(f,Q)-L(f,Q)
$$

以下です。両者を足せば

$$
U(f,P_n)-L(f,P_n)
\le
U(f,Q)-L(f,Q)+2B(m-1)\Delta_n.
$$

となります。$\Delta_n\to0$ なので、等分割だけでも gap を0へ近づけられます。
<!-- solution-end -->

<a id="ex-nsa8-c01"></a>
### NSA8-C01 任意の無限小 mesh の内部 tagged partition
- Level: C

$f:[a,b]\to\mathbb R$ が Riemann 可積分、$I=\int_a^b f$ とする。

等分割とは限らない内部超有限分割

$$
a=y_0<y_1<\cdots<y_N=b
$$

を取り、その mesh

$$
\mu=\max_{0\le j<N}(y_{j+1}-y_j)
$$

が無限小であるとする。内部標本点 $\zeta_j\in[y_j,y_{j+1}]$ に対し

$$
T=\sum_{j=0}^{N-1}{}^*f(\zeta_j)(y_{j+1}-y_j)
$$

と置く。$T\approx I$ を示せ。

<!-- solution-start -->
**詳細解答**。$|f|\le B$ を満たす標準 $B\ge1$ を取ります。標準 $\varepsilon>0$ を任意に固定します。

Riemann 可積分性と Darboux 判定から、ある標準分割

$$
Q:a=q_0<q_1<\cdots<q_m=b
$$

が存在して

$$
U(f,Q)-L(f,Q)<\frac{\varepsilon}{2}.
$$

内部分割のセル $[y_j,y_{j+1}]$ を二種類に分けます。

- $Q$ の内部分点をセルの内部に含むものを悪いセルとする。
- それ以外を良いセルとする。

内部分点は標準有限個 $m-1$ しかないので、悪いセルは高々 $m-1$ 個です。各悪いセルの長さは $\mu$ 以下、振動は高々 $2B$ なので、悪いセル全体の上下差への寄与は

$$
2B(m-1)\mu.
$$

$\mu$ は無限小だから、この量も無限小です。

良いセルはどれか一つの $Q$ セルに含まれます。従って良いセル全体の上下差への寄与は

$$
U(f,Q)-L(f,Q)<\frac{\varepsilon}{2}
$$

以下です。

したがって、この内部分割に対する内部上和 $\mathcal U$ と内部下和 $\mathcal L$ の差は

$$
0\le\mathcal U-\mathcal L
<
\frac{\varepsilon}{2}
+
2B(m-1)\mu.
$$

第二項は無限小なので、任意の標準 $\varepsilon>0$ に対して全体を $\varepsilon$ 未満にできます。従って

$$
\mathcal U-\mathcal L\approx0.
$$

標準有限分割で成り立つ

$$
L(f,P)\le I\le U(f,P)
$$

と

$$
L(f,P)\le R(f;P,\text{tags})\le U(f,P)
$$

を移送すると、この内部分割でも

$$
\mathcal L\le I\le\mathcal U,
\qquad
\mathcal L\le T\le\mathcal U.
$$

よって

$$
|T-I|
\le
\mathcal U-\mathcal L
\approx0.
$$

したがって

$$
T\approx I.
$$

等分割は計算と定理の記述を簡単にするための便利な選択であり、積分値そのものは「内部超有限かつ mesh が無限小」というより一般の分割でも回収できます。
<!-- solution-end -->
