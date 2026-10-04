# NSA7 微分・Taylor 展開を無限小で読む

<!-- definition-example-audit: strict -->

NSA6 では、極限と連続性を「無限添字」「無限小近接」で読み替えました。微分はさらに相性がよい対象です。標準解析の増分比

$$
\frac{f(a+h)-f(a)}{h}
$$

では $h\to0$ としますが、超準解析では $h$ を実際の非零無限小として固定できます。

ただし、ここでも「$h$ を0だと思って計算する」わけではありません。分母 $h$ は最後まで非零です。この増分比がある標準実数に無限小近接することを証明し、そのあとで標準部を取ります。

この章では

$$
\text{標準微分}
\Longleftrightarrow
\text{全ての非零無限小増分比が同じ標準値に近い}
$$

を出発点に、積の微分公式、連鎖律、Taylor の定理までを無限小で読み直します。

---

## 1. 無限小差分商を固定する

標準開区間 $J\subseteq\mathbb R$、標準関数 $f:J\to\mathbb R$、標準点 $a\in J$ を考えます。

[RA3 の微分係数](../RA3/index.md#def-ra3-differential-coefficient)では $h$ を0へ近づけます。超準世界では、非零無限小 $h$ で $a+h\in{}^*J$ となるものを直接取り、差分商を一つの超実数として見ます。

<a id="def-nsa7-infinitesimal-difference-quotient"></a>
<!-- formal-statement-start -->
### 定義（無限小差分商）

非零無限小 $h\in{}^*\mathbb R$ で $a+h\in{}^*J$ を満たすものに対し、

$$
Q_f(a;h)
=
\frac{{}^*f(a+h)-f(a)}{h}
$$

を $f$ の $a$ における **無限小差分商** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa7-infinitesimal-difference-quotient -->
**定義の確認**。$f(x)=x^2$ なら

$$
Q_f(a;h)
=
\frac{(a+h)^2-a^2}{h}
=
2a+h.
$$

$h$ は無限小なので

$$
Q_f(a;h)\approx2a.
$$

どの非零無限小 $h$ を選んでも、差分商は同じ標準実数 $2a$ に無限小近接します。
<!-- definition-example-end -->

この「選び方によらず同じ標準値へ近づく」が微分可能性そのものです。

<a id="thm-nsa7-differentiability"></a>
<!-- formal-statement-start -->
### 定理（微分可能性の超準的特徴付け）

標準開区間 $J\subseteq\mathbb R$、標準関数 $f:J\to\mathbb R$、標準点 $a\in J$、標準実数 $A$ に対し、次は同値である。

1. $f$ は $a$ で微分可能で

$$
f'(a)=A.
$$

2. 任意の非零無限小 $h$ で $a+h\in{}^*J$ を満たすものに対して

$$
Q_f(a;h)\approx A.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前向きは微分係数の $\varepsilon$-$\delta$ 定義をそのまま移送します。

逆向きでは、差分商が $A$ へ収束しないと仮定します。するとある標準 $\varepsilon_0>0$ があり、どんな標準 $\delta>0$ に対しても $0<|h|<\delta$ なのに差分商が $A$ から $\varepsilon_0$ 以上離れる $h$ が存在します。この失敗命題を移送し、$\delta=1/H$ を代入すれば非零無限小の反例ができます。

<!-- proof-start -->
### 証明

まず $f'(a)=A$ とします。標準 $\varepsilon>0$ を任意に取ります。微分係数の定義から、ある標準 $\delta>0$ が存在し、

$$
0<|t|<\delta,\quad a+t\in J
$$

なら

$$
\left|
\frac{f(a+t)-f(a)}{t}
-A
\right|
<
\varepsilon
$$

です。

この命題を移送します。非零無限小 $h$ は任意の標準 $\delta>0$ より小さいので

$$
\left|Q_f(a;h)-A\right|<\varepsilon.
$$

標準 $\varepsilon>0$ は任意だから

$$
Q_f(a;h)\approx A.
$$

逆に、全ての非零無限小 $h$ で $Q_f(a;h)\approx A$ だが、標準差分商が $A$ に収束しないとします。

するとある標準 $\varepsilon_0>0$ が存在し、任意の標準 $\delta>0$ に対してある標準 $t$ が存在して

$$
0<|t|<\delta,
\qquad
a+t\in J,
$$

かつ

$$
\left|
\frac{f(a+t)-f(a)}{t}
-A
\right|
\ge\varepsilon_0
$$

となります。

移送後、無限超自然数 $H$ に対する $\delta=1/H$ を代入すると、ある $h$ が存在して

$$
0<|h|<\frac1H,
$$

かつ

$$
\left|Q_f(a;h)-A\right|\ge\varepsilon_0.
$$

$h$ は非零無限小なのに差分商が $A$ に無限小近接しません。仮定に反します。
<!-- proof-end -->

<a id="cor-nsa7-derivative-standard-part"></a>
<!-- formal-statement-start -->
### 系（導関数の標準部表示）

$f$ が標準点 $a$ で微分可能なら、任意の非零無限小 $h$ で $a+h\in{}^*J$ を満たすものについて $Q_f(a;h)$ は有限超実数であり、

$$
f'(a)
=
\operatorname{st}\!\left(Q_f(a;h)\right).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前定理から

$$
Q_f(a;h)\approx f'(a).
$$

標準実数 $f'(a)$ に無限小近接する超実数は有限です。標準部の一意性から

$$
\operatorname{st}(Q_f(a;h))=f'(a).
$$
<!-- proof-end -->

「$h$ の選び方に依存しない」とは、差分商そのものが全て等しいという意味ではありません。$x^2$ では $2a+h$ なので、異なる $h$ なら値も異なります。しかし全ての差分商の**標準部が同じ**です。

---

## 2. 微分可能なら連続を無限小で見る

標準解析では「微分可能なら連続」を差分商の有界性から証明しました。超準的には同じ機構が一行の積へ見えます。

<a id="prop-nsa7-differentiable-continuous"></a>
<!-- formal-statement-start -->
### 命題（微分可能なら連続の超準的証明）

標準関数 $f:J\to\mathbb R$ が標準点 $a\in J$ で微分可能なら、$f$ は $a$ で連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in{}^*J$ かつ $x\approx a$ とします。$x=a$ なら自明です。

$x\ne a$ のとき

$$
h=x-a
$$

は非零無限小です。差分商を使うと

$$
{}^*f(x)-f(a)
=
h\,Q_f(a;h).
$$

微分可能性の超準的特徴付けから

$$
Q_f(a;h)\approx f'(a),
$$

なので $Q_f(a;h)$ は有限超実数です。無限小と有限超実数の積は無限小だから

$$
{}^*f(x)-f(a)
$$

は無限小です。

従って

$$
x\approx a
\Longrightarrow
{}^*f(x)\approx f(a).
$$

NSA6 の連続性の超準的特徴付けから $f$ は $a$ で連続です。
<!-- proof-end -->

ここで使った本質は

$$
\text{関数の増分}
=
\text{入力の無限小}
\times
\text{有限な差分商}
$$

です。

---

## 3. 積の微分公式は差分商を正確に分ける

「無限小だから高次項を捨てる」とだけ言うと、どこで標準部を取ったかが消えます。積の微分ではまず差分商を**厳密な等式**で分解し、そのあと無限小近接を使います。

<a id="prop-nsa7-product-rule"></a>
<!-- formal-statement-start -->
### 命題（積の微分公式の超準的導出）

標準関数 $f,g:J\to\mathbb R$ が標準点 $a\in J$ で微分可能なら、

$$
(fg)'(a)
=
f'(a)g(a)+f(a)g'(a).
$$
<!-- formal-statement-end -->

### 証明の見取り図

非零無限小 $h$ に対して、積の差分を

$$
{}^*f(a+h){}^*g(a+h)-f(a)g(a)
$$

と書き、${}^*f(a+h)g(a)$ を足して引きます。すると二つの差分商へ分かれます。

<!-- proof-start -->
### 証明

非零無限小 $h$ を取り $a+h\in{}^*J$ とします。

$$
\begin{aligned}
&{}^*f(a+h){}^*g(a+h)-f(a)g(a)\\
&=
{}^*f(a+h)\bigl({}^*g(a+h)-g(a)\bigr)
+
g(a)\bigl({}^*f(a+h)-f(a)\bigr).
\end{aligned}
$$

$h\ne0$ なので割って

$$
Q_{fg}(a;h)
=
{}^*f(a+h)Q_g(a;h)
+
g(a)Q_f(a;h).
$$

$f$ は微分可能なので連続です。従って

$$
{}^*f(a+h)\approx f(a).
$$

また

$$
Q_g(a;h)\approx g'(a),
\qquad
Q_f(a;h)\approx f'(a).
$$

有限超実数同士の積と和は無限小近接を保つので

$$
Q_{fg}(a;h)
\approx
f(a)g'(a)+g(a)f'(a).
$$

任意の非零無限小 $h$ で成り立つため、微分可能性の超準的特徴付けから

$$
(fg)'(a)
=
f'(a)g(a)+f(a)g'(a).
$$
<!-- proof-end -->

---

## 4. 連鎖律では「内側の増分が0」を飛ばさない

合成関数の差分商で

$$
\frac{{}^*g({}^*f(a+h))-g(f(a))}{{}^*f(a+h)-f(a)}
$$

を作りたくなります。しかし

$$
{}^*f(a+h)-f(a)=0
$$

となる $h$ があり得るため、最初からこの比で割ると証明に穴が開きます。

<a id="prop-nsa7-chain-rule"></a>
<!-- formal-statement-start -->
### 命題（連鎖律の超準的導出）

標準開区間 $J,K\subseteq\mathbb R$、標準関数 $f:J\to K$、$g:K\to\mathbb R$、標準点 $a\in J$ とする。$f$ が $a$ で微分可能、$g$ が $f(a)$ で微分可能なら

$$
(g\circ f)'(a)
=
g'(f(a))f'(a).
$$
<!-- formal-statement-end -->

### 証明の見取り図

非零無限小 $h$ に対して

$$
u={}^*f(a+h)-f(a)
$$

と置きます。微分可能性から連続なので $u$ は無限小です。

- $u\ne0$ なら、合成差分商を「$g$ の $u$ 差分商」×「$f$ の $h$ 差分商」に分ける。
- $u=0$ なら、合成差分商も0。このとき $Q_f(a;h)=0$ なので、$Q_f(a;h)\approx f'(a)$ から標準実数 $f'(a)=0$ と分かる。

この二枝でゼロ除算を完全に避けます。

<!-- proof-start -->
### 証明

非零無限小 $h$ を取り、

$$
u={}^*f(a+h)-f(a)
$$

と置きます。

$f$ は微分可能なので連続です。従って

$$
{}^*f(a+h)\approx f(a),
$$

したがって $u$ は無限小です。

まず $u\ne0$ とします。このとき

$$
\begin{aligned}
Q_{g\circ f}(a;h)
&=
\frac{{}^*g({}^*f(a+h))-g(f(a))}{h}\\
&=
\frac{{}^*g(f(a)+u)-g(f(a))}{u}
\cdot
\frac{u}{h}.
\end{aligned}
$$

第一因子は $g$ の $f(a)$ における非零無限小差分商なので

$$
\frac{{}^*g(f(a)+u)-g(f(a))}{u}
\approx
g'(f(a)).
$$

第二因子は

$$
\frac{u}{h}
=
Q_f(a;h)
\approx
f'(a).
$$

従って

$$
Q_{g\circ f}(a;h)
\approx
g'(f(a))f'(a).
$$

次に $u=0$ とします。このとき

$$
{}^*f(a+h)=f(a),
$$

なので

$$
{}^*g({}^*f(a+h))-g(f(a))=0
$$

であり、

$$
Q_{g\circ f}(a;h)=0.
$$

一方

$$
Q_f(a;h)=\frac{u}{h}=0.
$$

微分可能性の超準的特徴付けから $Q_f(a;h)\approx f'(a)$ なので

$$
0\approx f'(a).
$$

$f'(a)$ は標準実数であるため

$$
f'(a)=0.
$$

従ってこの場合も

$$
Q_{g\circ f}(a;h)
=
0
=
g'(f(a))f'(a).
$$

どちらの枝でも任意の非零無限小 $h$ について

$$
Q_{g\circ f}(a;h)
\approx
g'(f(a))f'(a)
$$

となるので、微分可能性の超準的特徴付けから連鎖律が従います。
<!-- proof-end -->

この場合分けは形式上の細部ではありません。「分母が0にならないことを確認してから割る」という標準解析と同じ責務を、無限小計算でも守っています。

---

## 5. 平均値定理との接続

差分商の超準的特徴付けは、[平均値定理](../RA3/index.md#thm-ra3-mvt)を置き換えるものではありません。むしろ、平均値定理を無限小区間へ移送すると、差分商が「途中の導関数」に等しいことが見えます。

$f$ が標準開区間上で微分可能で、標準点 $a$ の近くで平均値定理の仮定を満たすとします。非零無限小 $h$ に対し、移送された平均値定理から $a$ と $a+h$ の間にある $\xi$ が存在して

$$
Q_f(a;h)={}^*f'(\xi).
$$

ここで

$$
|\xi-a|\le|h|
$$

なので $\xi\approx a$ です。

もしさらに $f'$ が $a$ で連続なら

$$
{}^*f'(\xi)\approx f'(a),
$$

従って差分商の特徴付けをもう一度回収できます。

ただし、**微分可能性だけから $f'$ の連続性は従いません**。したがって、この平均値定理経由の説明を微分可能性の一般証明として使うには、$f'$ の連続性という追加仮定が必要です。

---

## 6. Taylor の定理を無限小増分へ移送する

[RA3 の Taylor の定理](../RA3/index.md#thm-ra3-taylor)は、標準点 $a,x$ に対して

$$
f(x)
=
\sum_{k=0}^{n}
\frac{f^{(k)}(a)}{k!}(x-a)^k
+
\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}
$$

という厳密な等式を与えました。

ここで $x=a+h$ とし、$h$ を非零無限小にすると、Taylor 多項式の残りが「何次の無限小か」を読めます。

<a id="thm-nsa7-taylor-infinitesimal"></a>
<!-- formal-statement-start -->
### 定理（Taylor の定理の無限小表示）

$n\ge0$ を標準整数とする。標準開区間 $J\subseteq\mathbb R$ 上の標準関数 $f:J\to\mathbb R$ が $C^{n+1}$ 級で、標準点 $a\in J$ を取る。

非零無限小 $h$ で $a+h\in{}^*J$ を満たすものに対し、$a$ と $a+h$ の間のある $\xi\in{}^*J$ が存在して

$$
{}^*f(a+h)
=
\sum_{k=0}^{n}
\frac{f^{(k)}(a)}{k!}h^k
+
\frac{{}^*f^{(n+1)}(\xi)}{(n+1)!}h^{n+1}.
$$

さらに $\xi\approx a$ で、係数 ${}^*f^{(n+1)}(\xi)$ は有限超実数である。従って剰余項 $R_{n+1}(h)$ は

$$
\frac{R_{n+1}(h)}{h^n}
$$

が無限小になる。
<!-- formal-statement-end -->

### 証明の見取り図

標準 Taylor の定理へ「展開点 $a$、評価点 $a+h$、次数 $n$」を代入した形を移送します。

中間点 $\xi$ は $a$ と $a+h$ の間にあるので $|\xi-a|\le|h|$。従って $\xi\approx a$ です。$f^{(n+1)}$ は連続なので、その超準値は標準値 $f^{(n+1)}(a)$ に無限小近接し、特に有限です。

<!-- proof-start -->
### 証明

RA3 の Taylor の定理を、標準パラメータ $n,a$ と標準関数 $f$ を固定して移送します。評価点として $a+h$ を入れると、$a$ と $a+h$ の間にある $\xi$ が存在して

$$
{}^*f(a+h)
=
\sum_{k=0}^{n}
\frac{f^{(k)}(a)}{k!}h^k
+
\frac{{}^*f^{(n+1)}(\xi)}{(n+1)!}h^{n+1}.
$$

$\xi$ は両端の間にあるので

$$
|\xi-a|\le|h|.
$$

$h$ は無限小だから $\xi\approx a$ です。

$f\in C^{n+1}$ なので $f^{(n+1)}$ は $a$ で連続です。NSA6 の連続性の超準的特徴付けから

$$
{}^*f^{(n+1)}(\xi)
\approx
f^{(n+1)}(a).
$$

従って ${}^*f^{(n+1)}(\xi)$ は有限超実数です。

剰余項を

$$
R_{n+1}(h)
=
\frac{{}^*f^{(n+1)}(\xi)}{(n+1)!}h^{n+1}
$$

とすると、$h\ne0$ なので

$$
\frac{R_{n+1}(h)}{h^n}
=
\frac{{}^*f^{(n+1)}(\xi)}{(n+1)!}h.
$$

右辺は有限超実数と無限小の積だから無限小です。
<!-- proof-end -->

### 具体例：$e^h$

$f(x)=e^x$、$a=0$、$n=1$ とします。Taylor の無限小表示から、0と $h$ の間の $\xi$ が存在して

$$
e^h
=
1+h+\frac{e^\xi}{2}h^2.
$$

$\xi\approx0$ なので $e^\xi\approx1$ で有限です。従って

$$
\frac{e^h-1}{h}
=
1+\frac{e^\xi}{2}h
\approx1.
$$

標準部を取れば

$$
\left.\frac{d}{dx}e^x\right|_{x=0}=1.
$$

ここで $h^2$ を「0として消した」のではありません。剰余項を $h$ で割ったあとに残る

$$
\frac{e^\xi}{2}h
$$

が無限小であることを確認し、標準部を取った結果として消えています。

---

## 7. 「無限小を捨てる」の正確な意味

例えば

$$
Q_f(a;h)=A+\eta
$$

で $\eta$ が無限小なら、

$$
\operatorname{st}(Q_f(a;h))
=
\operatorname{st}(A+\eta)
=
A.
$$

この操作を口語的に「無限小を捨てる」と言うことはできます。しかし数学的には

1. 差分商が有限である
2. 標準部が定義できる
3. 無限小項の標準部が0である
4. 標準部が加法を保つ

を使っています。

$h=0$ と代入しているわけではありません。もし最初に $h=0$ とすれば差分商自体が定義されません。

---

## 演習

<a id="ex-nsa7-a01"></a>
### NSA7-A01 $x^2$ の微分
- Level: A

$f(x)=x^2$ とする。標準 $a$ と任意の非零無限小 $h$ に対して $Q_f(a;h)$ を計算し、標準部から $f'(a)$ を求めよ。

<!-- solution-start -->
**詳細解答**。

$$
Q_f(a;h)
=
\frac{(a+h)^2-a^2}{h}
=
\frac{2ah+h^2}{h}
=
2a+h.
$$

$h$ は無限小なので $2a+h\approx2a$。従って

$$
f'(a)
=
\operatorname{st}(2a+h)
=
2a.
$$
<!-- solution-end -->

<a id="ex-nsa7-a02"></a>
### NSA7-A02 $x^3$ の無限小差分商
- Level: A

$f(x)=x^3$ とする。$Q_f(a;h)$ を展開し、$f'(a)=3a^2$ を確認せよ。

<!-- solution-start -->
**詳細解答**。

$$
(a+h)^3-a^3
=
3a^2h+3ah^2+h^3.
$$

$h\ne0$ なので

$$
Q_f(a;h)
=
3a^2+3ah+h^2.
$$

$3ah$ と $h^2$ は無限小だから

$$
Q_f(a;h)\approx3a^2.
$$

従って $f'(a)=3a^2$。
<!-- solution-end -->

<a id="ex-nsa7-a03"></a>
### NSA7-A03 積の差分商を分解する
- Level: A

$f,g$ が $a$ で微分可能とする。$Q_{fg}(a;h)$ を $Q_f,Q_g$ で表す厳密な等式を導け。

<!-- solution-start -->
**詳細解答**。分子に ${}^*f(a+h)g(a)$ を足して引くと

$$
\begin{aligned}
&{}^*f(a+h){}^*g(a+h)-f(a)g(a)\\
&=
{}^*f(a+h)\bigl({}^*g(a+h)-g(a)\bigr)
+
g(a)\bigl({}^*f(a+h)-f(a)\bigr).
\end{aligned}
$$

非零 $h$ で割れば

$$
Q_{fg}(a;h)
=
{}^*f(a+h)Q_g(a;h)+g(a)Q_f(a;h).
$$

これが近似ではなく出発点となる厳密な等式です。
<!-- solution-end -->

<a id="ex-nsa7-a04"></a>
### NSA7-A04 合成関数の差分商
- Level: A

$f(x)=x^2$, $g(y)=e^y$ とし、$a$ を標準実数とする。超準的連鎖律から $(g\circ f)'(a)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$f'(a)=2a$、$g'(f(a))=e^{a^2}$ です。連鎖律から

$$
(g\circ f)'(a)
=
g'(f(a))f'(a)
=
2ae^{a^2}.
$$

超準的には、非零無限小 $h$ に対して合成差分商がこの標準実数に無限小近接することを意味します。
<!-- solution-end -->

<a id="ex-nsa7-a05"></a>
### NSA7-A05 $e^h$ の一次 Taylor 展開
- Level: A

非零無限小 $h$ に対し

$$
e^h=1+h+\eta h
$$

となる無限小 $\eta$ が存在することを示せ。

<!-- solution-start -->
**詳細解答**。Taylor の定理を $a=0,n=1$ に適用すると、0と $h$ の間の $\xi$ が存在して

$$
e^h
=
1+h+\frac{e^\xi}{2}h^2.
$$

そこで

$$
\eta=\frac{e^\xi}{2}h
$$

と置きます。$\xi\approx0$ なので $e^\xi$ は有限、$h$ は無限小です。従って $\eta$ は無限小で

$$
e^h=1+h+\eta h.
$$
<!-- solution-end -->

<a id="ex-nsa7-b01"></a>
### NSA7-B01 $|x|$ は0で微分可能でない
- Level: B

正の非零無限小 $\varepsilon$ を取り、$h=\varepsilon$ と $h=-\varepsilon$ に対する $f(x)=|x|$ の0での差分商を比較せよ。

<!-- solution-start -->
**詳細解答**。

$h=\varepsilon>0$ では

$$
Q_f(0;\varepsilon)
=
\frac{|\varepsilon|}{\varepsilon}
=
1.
$$

一方 $h=-\varepsilon<0$ では

$$
Q_f(0;-\varepsilon)
=
\frac{|-\varepsilon|}{-\varepsilon}
=
-1.
$$

二つは同じ標準実数に無限小近接しません。従って微分可能性の超準的特徴付けから $|x|$ は0で微分可能ではありません。
<!-- solution-end -->

<a id="ex-nsa7-b02"></a>
### NSA7-B02 微分可能なら連続を再構成する
- Level: B

$f$ が $a$ で微分可能とする。任意の $x\approx a$ に対し ${}^*f(x)\approx f(a)$ を、$x=a$ と $x\ne a$ に分けて示せ。

<!-- solution-start -->
**詳細解答**。$x=a$ なら差は0です。

$x\ne a$ なら $h=x-a$ は非零無限小で

$$
{}^*f(x)-f(a)=hQ_f(a;h).
$$

微分可能性から $Q_f(a;h)\approx f'(a)$ なので差分商は有限です。無限小と有限超実数の積は無限小だから

$$
{}^*f(x)-f(a)
$$

は無限小です。従って ${}^*f(x)\approx f(a)$。
<!-- solution-end -->

<a id="ex-nsa7-b03"></a>
### NSA7-B03 連鎖律のゼロ増分枝
- Level: B

連鎖律の証明で

$$
u={}^*f(a+h)-f(a)=0
$$

となったとする。このとき $f'(a)=0$ と結論できる理由と、合成差分商が正しい目標値へ一致することを示せ。

<!-- solution-start -->
**詳細解答**。$h\ne0$ なので

$$
Q_f(a;h)=\frac{u}{h}=0.
$$

一方、$f$ の微分可能性から

$$
Q_f(a;h)\approx f'(a).
$$

従って $0\approx f'(a)$。$f'(a)$ は標準実数なので、標準実数で無限小なのは0だけであることから

$$
f'(a)=0.
$$

また $u=0$ なら ${}^*f(a+h)=f(a)$ なので合成関数の分子も0で

$$
Q_{g\circ f}(a;h)=0.
$$

右辺の目標値も

$$
g'(f(a))f'(a)=0.
$$

従ってゼロ除算をせずにこの枝を閉じられます。
<!-- solution-end -->

<a id="ex-nsa7-b04"></a>
### NSA7-B04 Taylor 剰余の次数
- Level: B

$f\in C^3$ とし、標準点 $a$ と非零無限小 $h$ を取る。二次 Taylor 多項式からの剰余 $R_3(h)$ について

$$
R_3(h)/h^2
$$

が無限小であることを示せ。

<!-- solution-start -->
**詳細解答**。Taylor の定理から、$a$ と $a+h$ の間の $\xi$ が存在して

$$
R_3(h)
=
\frac{{}^*f^{(3)}(\xi)}{3!}h^3.
$$

$\xi\approx a$ で、$f^{(3)}$ は連続なので ${}^*f^{(3)}(\xi)$ は有限です。従って

$$
\frac{R_3(h)}{h^2}
=
\frac{{}^*f^{(3)}(\xi)}{6}h
$$

は有限超実数と無限小の積であり、無限小です。
<!-- solution-end -->

<a id="ex-nsa7-c01"></a>
### NSA7-C01 局所線形化と連鎖律
- Level: C

標準関数 $f$ が標準点 $a$ で微分可能であることと、任意の無限小 $h$ について

$$
{}^*f(a+h)-f(a)
=
f'(a)h+h\eta_h
$$

と書けることが同値であることを示せ。ここで $\eta_h$ は $h\ne0$ のとき無限小、$h=0$ のとき0とする。

さらに、$g$ が $f(a)$ で微分可能な場合にこの表示を $g\circ f$ へ二段階で適用し、連鎖律を導け。

<!-- solution-start -->
**詳細解答**。

まず $f$ が微分可能とします。$h\ne0$ なら

$$
Q_f(a;h)\approx f'(a)
$$

なので

$$
Q_f(a;h)=f'(a)+\eta_h
$$

と書け、$\eta_h$ は無限小です。両辺に $h$ を掛けると

$$
{}^*f(a+h)-f(a)
=
f'(a)h+h\eta_h.
$$

$h=0$ では $\eta_0=0$ とすれば同じ式が成り立ちます。

逆にこの表示が任意の非零無限小 $h$ で成り立つなら、$h$ で割って

$$
Q_f(a;h)=f'(a)+\eta_h\approx f'(a).
$$

従って超準的特徴付けを満たします。

次に

$$
u={}^*f(a+h)-f(a)
$$

と置きます。$f$ の局所線形化から

$$
u=f'(a)h+h\eta_h.
$$

右辺は無限小なので $u$ も無限小です。

$g$ の $f(a)$ における局所線形化を $u$ に適用すると

$$
{}^*g(f(a)+u)-g(f(a))
=
g'(f(a))u+u\theta_u
$$

で、$\theta_u$ は無限小です。

$u=f'(a)h+h\eta_h$ を代入すると

$$
\begin{aligned}
{}^*(g\circ f)(a+h)-(g\circ f)(a)
&=
g'(f(a))(f'(a)h+h\eta_h)
+
u\theta_u\\
&=
g'(f(a))f'(a)h
+
h\,g'(f(a))\eta_h
+
u\theta_u.
\end{aligned}
$$

$h\ne0$ で割ると

$$
Q_{g\circ f}(a;h)
=
g'(f(a))f'(a)
+
g'(f(a))\eta_h
+
\frac{u}{h}\theta_u.
$$

$u/h=Q_f(a;h)$ は有限、$\eta_h,\theta_u$ は無限小です。従って後二項は無限小で

$$
Q_{g\circ f}(a;h)
\approx
g'(f(a))f'(a).
$$

よって

$$
(g\circ f)'(a)=g'(f(a))f'(a).
$$

この導出では局所線形化を二段階で合成しており、「微分は一次近似」という意味が連鎖律へ直接つながっています。
<!-- solution-end -->
