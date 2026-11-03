# COMB6 有限差分と Newton 展開

[前章の Stirling 数の漸化式](../COMB5/index.md#thm-comb5-stirling-second-recurrence)では、数表の隣り合う行を比較して規則を読み取りました。今度は一つの数列の隣り合う**値の差**を取ります。例えば $0,1,4,9,16,\ldots$ なら、隣の差は $1,3,5,7,\ldots$、さらに差を取ると $2,2,2,\ldots$ です。連続関数の微分ではなく、整数だけ進む操作で多項式の構造が見えてきます。

この章の問いは「差の表だけから多項式を一意に復元できるか」です。差を取る演算、差を取ると次数が下がる多項式の基底、そして Newton 展開を順に作ります。ここでの等式は**多項式の代数的恒等式**であり、無限級数の収束や数値誤差は必要としません。

## 1. 一歩ずらして引く：前進差分と後退差分

整数 $n$ での値 $f(n)$ を考えると、前後の値との比較には $f(n+1)$ と $f(n-1)$ を使います。より一般に、実数 $x$ 上の関数 $f$ を右へ一歩ずらす演算を考えます。関数自体を入力して別の関数を返すので、この種の規則を**作用素**と呼びます。

<a id="def-comb6-shift-differences"></a>

<!-- formal-statement-start -->
> **定義（シフト作用素・前進差分・後退差分）**  
> 実数全体で定義された関数 $f:\mathbb R\to\mathbb R$ に対し、シフト作用素 $E$、逆向きシフト $E^{-1}$、前進差分 $\Delta$、後退差分 $\nabla$ を

$$
\begin{aligned}
(Ef)(x)&=f(x+1),& (E^{-1}f)(x)&=f(x-1),\\
(\Delta f)(x)&=f(x+1)-f(x),&
(\nabla f)(x)&=f(x)-f(x-1)
\end{aligned}
$$

> と定める。恒等作用素 $I$ は $(If)(x)=f(x)$ とする。$\Delta^0=I$、$\Delta^{r+1}=\Delta\circ\Delta^r$（整数 $r\geq0$）により反復前進差分を定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb6-shift-differences -->
### 例：二乗の隣接差

**定義の確認**：$f(x)=x^2$ は全ての実数で定義され、$Ef(x)=(x+1)^2$、$E^{-1}f(x)=(x-1)^2$ です。従って

$$
\begin{aligned}
(\Delta f)(x)&=(x+1)^2-x^2=2x+1,\\
(\nabla f)(x)&=x^2-(x-1)^2=2x-1,\\
(\Delta^2 f)(x)&=[2(x+1)+1]-(2x+1)=2.
\end{aligned}
$$

例えば $x=2$ で前進差は $f(3)-f(2)=9-4=5$、後退差は $f(2)-f(1)=4-1=3$ です。両者は評価する区間が異なります。$E^{-1}$ は関数を一歩戻す作用素であり、関数値 $1/f(x)$ を意味しません。
<!-- definition-example-end -->

<a id="prop-comb6-operator-relations"></a>

<!-- formal-statement-start -->
> **命題（差分作用素の関係）**  
> 任意の関数 $f:\mathbb R\to\mathbb R$ について

$$
\Delta=E-I,\qquad \nabla=I-E^{-1}=E^{-1}\Delta
$$

> が作用素として成り立つ。また、実数 $a,b$ と関数 $f,g$ に対し $\Delta(af+bg)=a\Delta f+b\Delta g$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x$ について、$(E-I)f(x)=f(x+1)-f(x)=\Delta f(x)$。同じく $(I-E^{-1})f(x)=f(x)-f(x-1)=\nabla f(x)$ です。一方 $(E^{-1}\Delta f)(x)=(\Delta f)(x-1)=f(x)-f(x-1)$ なので後退差分にも一致します。

最後に $\Delta(af+bg)(x)=(af+bg)(x+1)-(af+bg)(x)$ を開くと、$a[f(x+1)-f(x)]+b[g(x+1)-g(x)]$ となります。全ての $x$ で等しいため作用素の等式です。
<!-- proof-end -->

この線形性のおかげで、多項式の各項を別々に差分して足すことができます。

<a id="thm-comb6-iterated-difference"></a>

<!-- formal-statement-start -->
> **定理（反復前進差分の交互和）**  
> 整数 $r\geq0$ と関数 $f:\mathbb R\to\mathbb R$ に対し、全ての実数 $x$ で

$$
(\Delta^r f)(x)=\sum_{j=0}^{r}(-1)^{r-j}\binom rj f(x+j)
$$

> が成り立つ。二項係数は[二項係数の定義](../COMB2/index.md#def-comb2-binomial)による。
<!-- formal-statement-end -->

### 証明の見取り図

一回の差分は「次の値から今の値を引く」操作です。$r$ 回の差分にもう一回差分を取ると、同じ関数値の係数が二つの経路から集まり、[Pascal の恒等式](../COMB2/index.md#thm-comb2-pascal)になります。

<!-- proof-start -->
### 証明

$r=0$ では右辺は $f(x)$ の一項だけで、$\Delta^0f=f$ と一致します。$r$ で成立すると仮定し、定義に従って

$$
\begin{aligned}
(\Delta^{r+1}f)(x)
&=(\Delta^rf)(x+1)-(\Delta^rf)(x)\\
&=\sum_{j=0}^{r}(-1)^{r-j}\binom rj f(x+j+1)
-\sum_{j=0}^{r}(-1)^{r-j}\binom rj f(x+j).
\end{aligned}
$$

第一の和で $i=j+1$ と置くと、$f(x+i)$ の係数は（範囲外の二項係数を0として）

$$
(-1)^{r+1-i}\left[\binom r{i-1}+\binom ri\right]
=(-1)^{r+1-i}\binom{r+1}i
$$

です。最後の等号は [Pascal の恒等式](../COMB2/index.md#thm-comb2-pascal)で、$i=0$ と $i=r+1$ の端点にも適用できます。従って $r+1$ の式が得られ、数学的帰納法で全ての $r$ に成立します。
<!-- proof-end -->

例えば二回差分なら、差の差を直接開いて

$$
\Delta^2 f(x)=f(x+2)-2f(x+1)+f(x)
$$

です。係数 $1,-2,1$ の順番は、差を取る位置から決まります。

## 2. 差分すると形が保たれる多項式

通常の冪 $x^k$ の差分は、例えば $\Delta x^3=3x^2+3x+1$ のように複数の次数が混じります。そこで「差分が一段下の形になる」多項式を探します。因数を $x,x-1,\ldots$ と一つずつずらす積が便利です。

<a id="def-comb6-falling-factorial"></a>

<!-- formal-statement-start -->
> **定義（下降階乗と一般化二項多項式）**  
> 実数 $x$ と非負整数 $k$ に対し、下降階乗 $x^{\underline{k}}$ と一般化二項多項式 $\binom{x}{k}$ を

$$
x^{\underline{0}}=1,\qquad
x^{\underline{k}}=\prod_{j=0}^{k-1}(x-j)\quad(k\geq1),
\qquad
\binom{x}{k}=\frac{x^{\underline{k}}}{k!}
$$

> と定める。$k<0$ に対しては便宜上 $\binom{x}{k}=0$ とする。$k!$ は[階乗の定義](../COMB2/index.md#def-comb2-ordered-selection)を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb6-falling-factorial -->
### 例：整数での選び方と一致する

**定義の確認**：$k=0$ では空積なので $x^{\underline0}=\binom x0=1$。$k=3$ では $x^{\underline3}=x(x-1)(x-2)$、$\binom x3=x(x-1)(x-2)/6$ です。$x=5$ とすれば $\binom53=5\cdot4\cdot3/6=10$ となり、[3元部分集合の個数](../COMB2/index.md#thm-comb2-binomial-count)と一致します。$x=1$ では $1^{\underline3}=0$ となり、$1$ 元から $3$ 個選べないことと一致します。一方 $x=1/2$ でも値は定義されますが、もはや集合を数える個数という意味ではありません。
<!-- definition-example-end -->

<a id="thm-comb6-falling-difference"></a>

<!-- formal-statement-start -->
> **定理（下降階乗の差分）**  
> 非負整数 $k$ に対し実数 $x$ の多項式として

$$
\Delta x^{\underline{k}}=
\begin{cases}
0 & (k=0),\\
k x^{\underline{k-1}} & (k\geq1),
\end{cases}
\qquad
\Delta\binom{x}{k}=
\begin{cases}
0 & (k=0),\\
\binom{x}{k-1} & (k\geq1)
\end{cases}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x+1$ から始まる積と $x$ から始まる積を引きます。共通する $k-1$ 個の因子をくくると、残る差はちょうど $k$ です。これが通常の微分の $\frac{d}{dx}x^k=kx^{k-1}$ に相当する便利さです。

<!-- proof-start -->
### 証明

$k=0$ なら $\binom x0=x^{\underline0}=1$ は定数で、差分は0です。$k\geq1$ なら、両方の積に共通な $k-1$ 個の因子をくくります。

$$
\begin{aligned}
\Delta x^{\underline k}
&=(x+1)\prod_{j=0}^{k-2}(x-j)
 -(x-k+1)\prod_{j=0}^{k-2}(x-j)\\
&=\{(x+1)-(x-k+1)\}\prod_{j=0}^{k-2}(x-j)\\
&=k x^{\underline{k-1}}.
\end{aligned}
$$

$k=1$ では $\prod_{j=0}^{-1}$ を空積1と解釈し、$(x+1)-x=1$ を得ます。[前進差分の線形性](#prop-comb6-operator-relations)から定数 $1/k!$ を外に出して

$$
\Delta\binom{x}{k}=\frac{k}{k!}x^{\underline{k-1}}
=\frac{x^{\underline{k-1}}}{(k-1)!}
=\binom{x}{k-1}
$$

を得ます。$k!$ は非零なので除算は正当です。
<!-- proof-end -->

たとえば $\binom{x}{3}$ の差分は $\binom{x}{2}$、その差分は $\binom{x}{1}$ です。同じ操作を重ねると最後は定数1、その次は0になります。

<a id="cor-comb6-binomial-iterates"></a>

<!-- formal-statement-start -->
> **系（二項多項式の反復差分）**  
> 非負整数 $k,r$ に対し、実数 $x$ の多項式として

$$
\Delta^r\binom{x}{k}=
\begin{cases}
\binom{x}{k-r}&(0\leq r\leq k),\\
0&(r>k)
\end{cases}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r=0$ では元の多項式です。[下降階乗の差分定理](#thm-comb6-falling-difference)を $r$ 回繰り返すと、$r\leq k$ の間は添字が一つずつ下がり、$\binom{x}{k-r}$ となります。$r=k$ で $\binom x0=1$ に達し、さらに差分すると0です。それ以後も定数0の差分は0なので主張が成り立ちます。
<!-- proof-end -->

## 3. 多項式の「座標」を差分で読み取る

ここでは次数が $d$ 以下の実係数多項式全体を考えます。次数とは、零でない最高次の項 $a_dx^d$ に現れる整数 $d$ のことで、$a_d\ne0$ です（零多項式はどの次数以下にも含めます）。通常は $1,x,\ldots,x^d$ を使って係数を表しますが、各 $\binom{x}{k}$ も次数 $k$、最高次係数 $1/k!$ を持ちます。これらは別の「座標」の取り方になります。

<a id="thm-comb6-binomial-basis"></a>

<!-- formal-statement-start -->
> **定理（二項多項式の基底）**  
> 非負整数 $d$ に対し、任意の実係数多項式 $p(x)$（次数は $d$ 以下）は、ただ一通りの実数 $c_0,\ldots,c_d$ を用いて

$$
p(x)=\sum_{k=0}^{d}c_k\binom{x}{k}
$$

> と表せる。さらに $0\leq r\leq d$ に対し $c_r=(\Delta^r p)(0)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最高次の項から順に消すと、二項多項式でどんな $p$ も作れます。一方、差分を $r$ 回取り $x=0$ と置くと、$\binom{x}{k}$ のうち $k=r$ の成分だけが1となり、他は0になります。この性質で係数が一つずつ読めます。

<!-- proof-start -->
### 証明

まず存在を示します。$d=0$ なら定数 $p=a_0$ は $a_0\binom x0$ です。$d\geq1$ で最高次係数 $a_d$ が非零なら、$\binom xd$ の最高次係数は $1/d!$ なので

$$
p(x)-a_dd!\binom xd
$$

の $x^d$ の項が $a_d-a_dd!/d!=0$ となり、次数は $d-1$ 以下です。これを繰り返せば $d$ 以下の二項多項式の線形結合になります。$p$ が初めから低次数や零の場合も、該当する最高次項から同じ操作を始めればよいです。

次に $p=\sum_{k=0}^dc_k\binom xk$ と表したとします。[反復差分の系](#cor-comb6-binomial-iterates)と[線形性](#prop-comb6-operator-relations)から、$0\leq r\leq d$ で

$$
(\Delta^r p)(0)=
\sum_{k=r}^d c_k\binom{0}{k-r}=c_r
$$

です。なぜなら $k=r$ で $\binom00=1$、$k>r$ では分子の下降階乗に因子0が含まれ $\binom0{k-r}=0$ だからです。これは表し方のいかんによらず $p$ から定まる値です。二通りの表示があれば全係数が同じになるので一意です。
<!-- proof-end -->

この証明は、「差分の値が座標である」という後の展開式の核心をすでに含んでいます。

<a id="thm-comb6-newton-polynomial"></a>

<!-- formal-statement-start -->
> **定理（Newton 前進展開：多項式版）**  
> $p$ を次数 $d$ 以下の実係数多項式とし、$d$ は非負整数とする。このとき全ての実数 $x$ で

$$
p(x)=\sum_{k=0}^{d}(\Delta^k p)(0)\binom{x}{k}
$$

> が成り立つ。係数は点 $0,1,\ldots,k$ での $p$ の値だけから求められる。
<!-- formal-statement-end -->

### 証明の見取り図

[二項多項式の基底](#thm-comb6-binomial-basis)に展開した係数を差分で読んだものが、この式です。$\Delta^k p(0)$ は [反復差分の交互和](#thm-comb6-iterated-difference)により、$p(0),\ldots,p(k)$ だけを使うので、各係数を有限回の引き算だけで計算できます。

<!-- proof-start -->
### 証明

[二項多項式の基底定理](#thm-comb6-binomial-basis)を次数上限 $d$ と多項式 $p$ に適用すると、唯一の係数 $c_k$ による $p(x)=\sum_{k=0}^dc_k\binom{x}{k}$ が存在し、各 $c_k=(\Delta^kp)(0)$ です。これを代入して結論を得ます。また[反復差分の交互和](#thm-comb6-iterated-difference)を $x=0,r=k$ に適用すると

$$
(\Delta^kp)(0)=\sum_{j=0}^k(-1)^{k-j}\binom kj p(j).
$$

従って係数計算に必要なのは $p(0),\ldots,p(k)$ です。全ては多項式の等号であり、$x$ に整数以外を代入しても成立します。
<!-- proof-end -->

### 例：二乗の展開を実際に戻す

$p(x)=x^2$ では $p(0)=0$、$\Delta p(0)=p(1)-p(0)=1$、$\Delta^2p(0)=p(2)-2p(1)+p(0)=4-2=2$ です。次数上限 $d=2$ で [Newton 前進展開](#thm-comb6-newton-polynomial)を使うと

$$
p(x)=0\binom x0+1\binom x1+2\binom x2
=x+x(x-1)=x^2.
$$

「係数 $2$」は $x^2$ の通常の係数ではなく、$\binom x2$ の前に付く差分係数です。

## 4. 差分表は何を保証するか

未知の数列が最初の数項だけ与えられていても、各段階で隣接差を取ることはできます。まず $\Delta a_i=a_{i+1}-a_i$、さらに $\Delta^2a_i=\Delta a_{i+1}-\Delta a_i$ とし、同じ操作を繰り返します。表の先頭に現れる数字が $a_0,\Delta a_0,\Delta^2a_0,\ldots$ です。ただし、数列の全体が多項式由来だという仮定なしに、その先の値が確定するわけではありません。

例えば $a_0=2,a_1=5,a_2=10,a_3=17$ なら差分表は次のようになります。空欄は、その列の差を計算するための右隣の値が与えられていないことを表します。

| $n$ | $a_n$ | $\Delta a_n$ | $\Delta^2a_n$ | $\Delta^3a_n$ |
|---:|---:|---:|---:|---:|
| 0 | 2 | 3 | 2 | 0 |
| 1 | 5 | 5 | 2 |  |
| 2 | 10 | 7 |  |  |
| 3 | 17 |  |  |  |

差分表の先頭を係数にすれば

$$
2+3\binom x1+2\binom x2+0\binom x3
=2+3x+x(x-1)=x^2+2x+2
$$

という多項式ができます。与えた四点には一致するのですが、四点だけから元の数列が永遠にこの二次式だとはまだ言えません。

<a id="def-comb6-finite-difference-table"></a>

<!-- formal-statement-start -->
> **定義（有限差分表）**  
> 非負整数 $m$ と実数データ $a_0,\ldots,a_m$ が与えられたとき、$\Delta^0a_i=a_i$ とし、$0\leq r<m$、$0\leq i<m-r$ で

$$
\Delta^{r+1}a_i=\Delta^ra_{i+1}-\Delta^ra_i
$$

> と定める。$0\leq r\leq m$ で値 $\Delta^ra_0$ が差分表の $r$ 段目の先頭である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb6-finite-difference-table -->
### 例：四つの観測値を三段まで差分する

**定義の確認**：上の $2,5,10,17$ で、第一段は $5-2=3,10-5=5,17-10=7$、第二段は $5-3=2,7-5=2$、第三段は $2-2=0$ です。$m=3$ のとき第三段には一つの値しかなく、第四段を計算するデータはありません。差分表はデータの長さを勝手に延長しません。
<!-- definition-example-end -->

<a id="thm-comb6-finite-interpolation"></a>

<!-- formal-statement-start -->
> **定理（等間隔有限データの一意な補間）**  
> 非負整数 $m$ と任意の実数 $a_0,\ldots,a_m$ に対し、次数 $m$ 以下の実係数多項式 $P$ で $P(j)=a_j$（$j=0,\ldots,m$）を満たすものがちょうど一つ存在する。それは

$$
P(x)=\sum_{k=0}^m \Delta^ka_0\binom{x}{k}
$$

> である。差分係数は[有限差分表の定義](#def-comb6-finite-difference-table)で求める。
<!-- formal-statement-end -->

### 証明の見取り図

候補は差分表から明示的に作ります。$j$ 番目で評価すると $\binom jk=0$（$k>j$）なので、過去の項だけが現れます。[二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)を使い、交互和が打ち消し合って $a_j$ だけが残ることを示します。一意性は差分係数の読み取りで確認します。

<!-- proof-start -->
### 証明

差分表の再帰式は数列 $a_0,\ldots,a_m$ の有限な部分で [反復前進差分の交互和](#thm-comb6-iterated-difference)と同じ計算を行うため、$0\leq k\leq m$ で

$$
\Delta^ka_0=\sum_{i=0}^k(-1)^{k-i}\binom ki a_i
$$

となります。この式はデータの範囲 $0,\ldots,k$ だけを用いるので、元の数列の延長は不要です。

上の $P$ を作れば、各 $\binom xk$ は次数 $k$ 以下なので $P$ は次数 $m$ 以下です。$0\leq j\leq m$ では $\binom jk=0$（$k>j$）を用いて

$$
\begin{aligned}
P(j)
&=\sum_{k=0}^{j}\binom jk\sum_{i=0}^k(-1)^{k-i}\binom ki a_i\\
&=\sum_{i=0}^{j}a_i\binom ji
\sum_{k=i}^{j}(-1)^{k-i}\binom{j-i}{k-i}\\
&=\sum_{i=0}^{j}a_i\binom ji(1-1)^{j-i}=a_j.
\end{aligned}
$$

第二行で使った係数の積は、$0\leq i\leq k\leq j$ のもとで [二項係数の計数公式](../COMB2/index.md#thm-comb2-binomial-count)を両辺に適用すると

$$
\binom jk\binom ki
=\frac{j!}{k!(j-k)!}\frac{k!}{i!(k-i)!}
=\frac{j!}{i!(j-i)!}\frac{(j-i)!}{(k-i)!(j-k)!}
=\binom ji\binom{j-i}{k-i}
$$

と検算できます。ここで全ての階乗の添字は非負です。第三行は $k-i=t$ と置いて [二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)を $1+(-1)$ に適用しました。指数0の場合の $(1-1)^0$ は空積1であり、$i=j$ の項だけが残ります。

別の次数 $m$ 以下の多項式 $Q$ も同じ各点の値を持つと仮定します。[Newton 前進展開](#thm-comb6-newton-polynomial)により $Q$ の $\binom xk$ の係数は $\Delta^kQ(0)$ ですが、この値は $Q(0),\ldots,Q(k)$、すなわち $a_0,\ldots,a_k$ のみで決まります。よって係数は全て $\Delta^ka_0$ で $P$ と同じ、従って $Q=P$ です。
<!-- proof-end -->

ここでの「一意」は、**次数を $m$ 以下に制限した範囲**での一意性です。例えば四つの値 $a_0,\ldots,a_3$ に一致する $P$ へ、任意の実数 $t$ について $t\,x(x-1)(x-2)(x-3)$ を加えても同じ四点に一致します。しかし $x=4$ での値は $24t$ だけ変わります。観測だけから未来を予言する定理ではありません。

## 5. 多項式なら何段で差が止まるか

差分表の下の段が常に0になるのは、多項式を識別する手掛かりです。ただし一つの有限表の末尾に0が出ただけでは、その先でも0であり続けるとは言えません。

<a id="thm-comb6-degree-test"></a>

<!-- formal-statement-start -->
> **定理（差分による多項式の次数判定）**  
> $p$ を零でない実係数多項式、$d\geq0$ を整数とする。$p$ の次数がちょうど $d$ であることと、$\Delta^dp$ が零でない定数多項式で $\Delta^{d+1}p=0$ であることは同値である。このとき $p$ の最高次係数を $a_d$ とすれば $\Delta^dp=d!a_d$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[二項多項式の基底](#thm-comb6-binomial-basis)では次数 $d$ の項が $\binom xd$ の係数としてだけ残り、$d$ 回差分すると定数になります。逆に、より高い次数の項があれば $d$ 回差分しても非定数の項が残ります。

<!-- proof-start -->
### 証明

$p$ の次数を $q$、最高次係数を $a_q\ne0$ とします。[二項多項式の基底](#thm-comb6-binomial-basis)を次数上限 $q$ として使うと

$$
p(x)=\sum_{k=0}^{q}c_k\binom{x}{k},
\qquad c_q=q!a_q\ne0
$$

です。[反復差分の系](#cor-comb6-binomial-iterates)で $q$ 回差分すると、$k<q$ の項は0で、$k=q$ の項は定数1になるので $\Delta^qp=c_q$、$\Delta^{q+1}p=0$ です。

もし $q>d$ なら $\Delta^dp$ に最高次数 $q-d\geq1$ の項 $c_q\binom{x}{q-d}$ が残り、その最高次係数は $c_q/(q-d)!\ne0$ です。従って $\Delta^dp$ は定数になり得ません。一方 $q<d$ なら $\Delta^dp=0$ です。結局 $\Delta^dp$ が非零定数となるのは $q=d$ のときだけで、その値は $d!a_d$ です。
<!-- proof-end -->

数列についても、**すべての位置**で差分が消えるという強い条件があれば結論を得られます。[実数列の定義](../../../基礎科目/F0/F0-00B0/index.md#def-f0-00b0-real-sequence)では添字を1から数えましたが、ここでは最初の項を $a_0$ とします。

<a id="prop-comb6-sequence-polynomial"></a>

<!-- formal-statement-start -->
> **命題（差分が消える数列）**  
> 非負整数 $d$ と実数列 $(a_n)_{n\geq0}$ について $\Delta a_n=a_{n+1}-a_n$ と定める。全ての $n\geq0$ で $\Delta^{d+1}a_n=0$ なら、全ての $n\geq0$ に対して

$$
a_n=\sum_{k=0}^d\Delta^ka_0\binom nk
$$

> が成り立つ。逆に右辺の形の数列なら $\Delta^{d+1}a_n=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の $d+1$ 項に合う多項式 $P$ を作ります。$a_n-P(n)$ の最初の $d+1$ 項は0で、同じ次数の差分も常に0です。差分を展開すると、次の値を直前の $d+1$ 個から決められるので、ずっと一致します。

<!-- proof-start -->
### 証明

[等間隔有限データの一意な補間](#thm-comb6-finite-interpolation)を $a_0,\ldots,a_d$ に適用し、次数 $d$ 以下の $P(x)=\sum_{k=0}^d\Delta^ka_0\binom xk$ を得ます。[次数判定の定理](#thm-comb6-degree-test)および零多項式の場合から、$\Delta^{d+1}P(n)=0$ は全ての $n$ で成り立ちます。

$b_n=a_n-P(n)$ と置くと $b_0=\cdots=b_d=0$、$\Delta^{d+1}b_n=0$ です。[反復前進差分の交互和](#thm-comb6-iterated-difference)は数列にも適用できるため

$$
0=\Delta^{d+1}b_n
=b_{n+d+1}+\sum_{j=0}^{d}(-1)^{d+1-j}\binom{d+1}j b_{n+j}.
$$

$n=0$ で右辺の和は全て0だから $b_{d+1}=0$。次に $n=1$ では $b_1,\ldots,b_{d+1}=0$ なので $b_{d+2}=0$ です。この操作を繰り返して全ての $b_n=0$ を得ます。逆向きは[反復差分の系](#cor-comb6-binomial-iterates)で各 $\binom nk$ が $d+1>k$ 回の差分で0になることと線形性から従います。
<!-- proof-end -->

## 6. 刻み幅と始点を変える

ここまでは $0,1,2,\ldots$ を使いましたが、実際の表は $a,a+h,a+2h,\ldots$ にあるかもしれません。刻み幅 $h$ が0でなければ、変数を取り直すだけで同じ構造が使えます。

<a id="thm-comb6-newton-step"></a>

<!-- formal-statement-start -->
> **定理（任意の始点・非零刻み幅での Newton 展開）**  
> $p$ を次数 $d$ 以下の実係数多項式、$a,h\in\mathbb R$ かつ $h\ne0$ とする。$\Delta_h p(x)=p(x+h)-p(x)$、$\Delta_h^0p=p$ と定め、$\Delta_h$ を反復すると

$$
p(x)=\sum_{k=0}^d (\Delta_h^kp)(a)
\binom{(x-a)/h}{k}
$$

> が全ての実数 $x$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

新しい変数 $t=(x-a)/h$ を使えば $x=a+ht$ です。$t$ を1増やすことが元の変数の刻み幅 $h$ と一致するので、通常の [Newton 前進展開](#thm-comb6-newton-polynomial)へ帰着できます。

<!-- proof-start -->
### 証明

$q(t)=p(a+ht)$ と置くと、$h\ne0$ なので $q$ は次数 $d$ 以下の実係数多項式です。$q(t+1)-q(t)=p(a+h(t+1))-p(a+ht)=(\Delta_hp)(a+ht)$。これを反復すれば帰納法により

$$
(\Delta^kq)(t)=(\Delta_h^kp)(a+ht)
$$

が任意の $k\geq0$ に成り立ちます。[Newton 前進展開](#thm-comb6-newton-polynomial)を $q$、評価点 $t=(x-a)/h$、次数上限 $d$ に適用して

$$
q(t)=\sum_{k=0}^d(\Delta^kq)(0)\binom tk
=\sum_{k=0}^d(\Delta_h^kp)(a)\binom tk
$$

を得ます。左辺は $q((x-a)/h)=p(x)$ ですから結論です。
<!-- proof-end -->

例えば $p(x)=x^2+1$ に $a=1,h=2$ を選ぶと値は $p(1)=2,p(3)=10,p(5)=26$ です。差分の先頭は $2,8,8$ で、$t=(x-1)/2$ を使って $p(x)=2+8t+8\binom t2$ と復元できます。これは**厳密な多項式恒等式**です。測定ノイズや丸めを含む数値補間についての誤差保証ではありません。

## 7. 演習

### Level A：定義・添字・境界を確かめる

#### A1. 前進差分と後退差分の違い

実数全体の関数 $f(x)=x^2+x$ について $\Delta f(x)$ と $\nabla f(x)$ を求め、$x=2$ で元の関数値を使って検算せよ。

- Level: A
- ID: COMB6-A1

<!-- solution-start -->
**詳細解答**

[差分の定義](#def-comb6-shift-differences)をそれぞれ直接適用します。

$$
\begin{aligned}
\Delta f(x)&=[(x+1)^2+(x+1)]-[x^2+x]=2x+2,\\
\nabla f(x)&=[x^2+x]-[(x-1)^2+(x-1)]=2x.
\end{aligned}
$$

$f(1)=2,f(2)=6,f(3)=12$ なので、$\Delta f(2)=12-6=6$、$\nabla f(2)=6-2=4$。得た式の $x=2$ への代入値 $2\cdot2+2=6$、$2\cdot2=4$ と一致します。
<!-- solution-end -->

#### A2. 下降階乗の差を数値で確かめる

下降階乗 $x^{\underline3}$ について $4^{\underline3},5^{\underline3}$ を求め、その差が $3\cdot4^{\underline2}$ と一致することを確かめよ。さらに $\binom53-\binom43$ を求めよ。

- Level: A
- ID: COMB6-A2

<!-- solution-start -->
**詳細解答**

[下降階乗の定義](#def-comb6-falling-factorial)により

$$
4^{\underline3}=4\cdot3\cdot2=24,\quad
5^{\underline3}=5\cdot4\cdot3=60,\quad
4^{\underline2}=4\cdot3=12.
$$

従って $5^{\underline3}-4^{\underline3}=60-24=36=3\cdot12$ で、[下降階乗の差分定理](#thm-comb6-falling-difference)の $k=3,x=4$ を検算できました。一般化二項多項式では $\binom53=60/3!=10$、$\binom43=24/3!=4$ なので差は $6=\binom42$ です。後者も同じ差分定理の二項多項式版に一致します。
<!-- solution-end -->

#### A3. 上側が負の二項多項式

一般化二項多項式 $\binom{x}{k}$ について $\binom{-1}{0},\binom{-1}{2},\binom{-1}{3}$ を求め、「集合の選び方」として解釈できるか答えよ。

- Level: A
- ID: COMB6-A3

<!-- solution-start -->
**詳細解答**

[一般化二項多項式の定義](#def-comb6-falling-factorial)に代入して

$$
\binom{-1}{0}=1,\qquad
\binom{-1}{2}=\frac{(-1)(-2)}{2!}=1,\qquad
\binom{-1}{3}=\frac{(-1)(-2)(-3)}{3!}=-1.
$$

上側が非負整数のときには [二項係数の部分集合解釈](../COMB2/index.md#def-comb2-binomial)が使えますが、$-1$ 元の有限集合は存在しないため、これらは代数的な多項式の値であって選び方の個数ではありません。特に最後が負になることも、単なる個数ではない証拠です。
<!-- solution-end -->

#### A4. 四つの数から差分表を作る

データ $a_0=3,a_1=8,a_2=15,a_3=24$ の全ての差分表を作り、これら四点を通る次数3以下の多項式を求めよ。

- Level: A
- ID: COMB6-A4

<!-- solution-start -->
**詳細解答**

[差分表の定義](#def-comb6-finite-difference-table)で差を取ります。第一段は $8-3=5,15-8=7,24-15=9$、第二段は $7-5=2,9-7=2$、第三段は $2-2=0$ です。先頭列は $(3,5,2,0)$ となります。

[等間隔有限データの一意な補間](#thm-comb6-finite-interpolation)から

$$
\begin{aligned}
P(x)&=3\binom x0+5\binom x1+2\binom x2+0\binom x3\\
&=3+5x+x(x-1)=x^2+4x+3.
\end{aligned}
$$

確認すると $P(0)=3,P(1)=8,P(2)=15,P(3)=24$ です。三回差分の先頭が0であることは、補間多項式が実際には次数2以下であることを示します。
<!-- solution-end -->

#### A5. 最高次係数と高階差分

実数上の多項式 $p(x)=3x^3-x$ について、$\Delta^3p$ と $\Delta^4p$ を求めよ。最高次係数と $p(0),p(1),p(2),p(3)$ の両方を使って検算せよ。

- Level: A
- ID: COMB6-A5

<!-- solution-start -->
**詳細解答**

$p$ は次数3、最高次係数3です。[次数判定定理](#thm-comb6-degree-test)で $d=3$ と置くと $\Delta^3p=3!\cdot3=18$（定数）、$\Delta^4p=0$ です。

独立に、$p(0)=0,p(1)=2,p(2)=22,p(3)=78$ と計算し、[反復差分の交互和](#thm-comb6-iterated-difference)を $r=3,x=0$ に適用すると

$$
\Delta^3p(0)=p(3)-3p(2)+3p(1)-p(0)
=78-66+6-0=18.
$$

これは全ての点で定数18となるという定理と、少なくとも $x=0$ で一致します。四回差分は定数18の差を取って0です。
<!-- solution-end -->

### Level B：差分から多項式を戻す

#### B1. 交互に符号が変わる数列

$n\geq0$ について $a_n=(-1)^n$ とする。$\Delta^ra_n=(-2)^r(-1)^n$ を全ての非負整数 $r$ について証明し、$\Delta^3a_0$ を交互和でも計算せよ。この数列は有限次数の多項式 $P(n)$ で全ての $n\geq0$ に表せるか。

- Level: B
- ID: COMB6-B1

<!-- solution-start -->
**詳細解答**

定義から $\Delta a_n=a_{n+1}-a_n=-(-1)^n-(-1)^n=-2(-1)^n$ です。$r=0$ では $\Delta^0a_n=a_n$。$r$ で式が成立すれば、差分の線形性と今の一回差分の式から

$$
\Delta^{r+1}a_n
=\Delta[(-2)^r(-1)^n]
=(-2)^r[-2(-1)^n]
=(-2)^{r+1}(-1)^n
$$

となるので帰納法が閉じます。

別に $a_0=1,a_1=-1,a_2=1,a_3=-1$ を [交互和公式](#thm-comb6-iterated-difference)へ代入すると

$$
\Delta^3a_0=a_3-3a_2+3a_1-a_0
=-1-3-3-1=-8=(-2)^3.
$$

もし全ての $n$ で次数 $d$ 以下の $P(n)$ と等しければ、[次数判定定理](#thm-comb6-degree-test)から $\Delta^{d+1}a_n=0$ のはずです。しかし実際には $(-2)^{d+1}(-1)^n\ne0$ で矛盾します。有限データの補間が常に可能なことと、数列全体が多項式になることは別問題です。
<!-- solution-end -->

#### B2. 補間と次数の検算

$a_0=1,a_1=4,a_2=11,a_3=22$ を通る次数3以下の多項式 $P$ を求め、$P(4)$ と $\Delta^3P$ を計算せよ。

- Level: B
- ID: COMB6-B2

<!-- solution-start -->
**詳細解答**

第一差分は $4-1=3,11-4=7,22-11=11$。第二差分は $7-3=4,11-7=4$。第三差分は $4-4=0$ です。[等間隔有限データの一意な補間](#thm-comb6-finite-interpolation)から

$$
\begin{aligned}
P(x)&=1\binom x0+3\binom x1+4\binom x2+0\binom x3\\
&=1+3x+2x(x-1)=2x^2+x+1.
\end{aligned}
$$

よって $P(4)=2\cdot16+4+1=37$ です。$P$ は二次式であり、[次数判定](#thm-comb6-degree-test)では $\Delta^3P=0$。実際 $2x^2+x+1$ の差は $4x+3$、その差は4、さらに差を取れば0です。与えられた値の次が37だと言えるのは、次数3以下の多項式から来たという条件のもとに限ります。
<!-- solution-end -->

#### B3. 一つ飛ばしの表から復元する

実数上の次数2以下の多項式 $p$ について $p(1)=2,p(3)=10,p(5)=26$ が分かっている。$p(x)$ を求め、$p(7)$ を計算せよ。

- Level: B
- ID: COMB6-B3

<!-- solution-start -->
**詳細解答**

始点 $a=1$、刻み幅 $h=2$ と置きます。差分表の第一差分は $10-2=8,26-10=16$、第二差分は $16-8=8$ です。[刻み幅を変えた Newton 展開](#thm-comb6-newton-step)の仮定 $h\ne0$ を満たすので、$t=(x-1)/2$ と置き

$$
\begin{aligned}
p(x)&=2\binom t0+8\binom t1+8\binom t2\\
&=2+8t+4t(t-1)=4t^2+4t+2\\
&=(x-1)^2+2(x-1)+2=x^2+1.
\end{aligned}
$$

したがって $p(7)=7^2+1=50$ です。もとの3点でも $1^2+1=2,3^2+1=10,5^2+1=26$ と直接確認できます。
<!-- solution-end -->

#### B4. 差分が常に一定なら

実数列 $(a_n)_{n\geq0}$ が全ての $n\geq0$ で $\Delta^2a_n=0$ を満たし、$a_0=2,a_1=5$ とする。全ての $a_n$ を求め、差分の定義からも答えを検算せよ。

- Level: B
- ID: COMB6-B4

<!-- solution-start -->
**詳細解答**

最初の差分は $\Delta a_0=a_1-a_0=5-2=3$ です。[差分が消える数列の命題](#prop-comb6-sequence-polynomial)を $d=1$ に適用すると

$$
a_n=a_0\binom n0+\Delta a_0\binom n1=2+3n.
$$

直接には $\Delta^2a_n=\Delta a_{n+1}-\Delta a_n=0$ から、隣接する第一差分が等しく、全て $\Delta a_0=3$ です。従って $a_{n+1}=a_n+3$、$a_0=2$ を繰り返して $a_n=2+3n$。求めた式に戻れば $\Delta(2+3n)=3$、$\Delta^2(2+3n)=0$、かつ初期2項にも一致します。
<!-- solution-end -->

### Level C：補間と外挿の論理を区別する

#### C1. 四点では未来は決まらない

実数列の最初の四項が $a_0=1,a_1=4,a_2=9,a_3=16$ と分かっている。

1. この四点を通る次数3以下の多項式 $P(x)$ を Newton 展開で求め、$P(4)$ を計算せよ。
2. 実数 $t$ に対し $Q_t(x)=P(x)+t\,x(x-1)(x-2)(x-3)$ とする。最初の四点に一致することを証明し、$Q_t(4)$ を求めよ。
3. $a_4=30$ も与えられたとき、四点だけで決めた外挿と一致させる必要はあるか。$Q_t(4)=30$ となる $t$ を求めよ。

- Level: C
- ID: COMB6-C1

<!-- solution-start -->
**詳細解答**

(1) 第一差分は $4-1=3,9-4=5,16-9=7$、第二差分は $5-3=2,7-5=2$、第三差分は $2-2=0$。従って[等間隔有限データの一意な補間](#thm-comb6-finite-interpolation)から

$$
\begin{aligned}
P(x)&=1+3\binom x1+2\binom x2+0\binom x3\\
&=1+3x+x(x-1)=(x+1)^2.
\end{aligned}
$$

よって $P(4)=25$ です。これが次数3以下という制限を満たす唯一の補間多項式です。

(2) $j=0,1,2,3$ のそれぞれについて、積 $j(j-1)(j-2)(j-3)$ には少なくとも一つ0の因子があります。従って $Q_t(j)=P(j)+t\cdot0=a_j$ は任意の $t$ で成立します。一方 $x=4$ では積 $4\cdot3\cdot2\cdot1=24$ なので $Q_t(4)=25+24t$ です。$t\ne0$ の場合、$Q_t$ は四次式で、補間の一意性定理の「次数3以下」という仮定を満たしません。

(3) 観測された第五項が30なら、四点だけからの予測25を守る理由はありません。$25+24t=30$ を解いて $t=5/24$ とすれば、$Q_{5/24}$ は最初の五項全てに一致します。四点での有限差分表は、その後の全ての差分を0と保証するものではないのです。
<!-- solution-end -->

#### C2. 全時刻の条件は未来を決める

実数列 $(a_n)_{n\geq0}$ に $a_0=1,a_1=2,a_2=5$ が与えられ、全ての $n\geq0$ で $\Delta^3a_n=0$ と仮定する。

1. 数列の全項を $n$ の式で求め、$a_{10}$ を計算せよ。
2. 同じ最初の三項だけを保ち、$\Delta^3a_n=0$ の仮定を除いたときには $a_3$ が自由に変わる具体例を作れ。

- Level: C
- ID: COMB6-C2

<!-- solution-start -->
**詳細解答**

(1) 初期値の差分は $\Delta a_0=2-1=1$、$\Delta a_1=5-2=3$ なので $\Delta^2a_0=3-1=2$ です。[差分が消える数列の命題](#prop-comb6-sequence-polynomial)を $d=2$ に適用するためには、まさに全ての $n$ で $\Delta^3a_n=0$ という仮定が必要です。従って

$$
a_n=1\binom n0+1\binom n1+2\binom n2
=1+n+n(n-1)=n^2+1.
$$

$a_{10}=10^2+1=101$ となります。得た式は $n=0,1,2$ で $1,2,5$ に一致し、二次式なので[次数判定](#thm-comb6-degree-test)によって第三差分は常に0です。

(2) 例えば任意の実数 $c$ に対して

$$
b_n=n^2+1+c\,n(n-1)(n-2)
$$

と定めると、$n=0,1,2$ では積に0が含まれるので $b_0=1,b_1=2,b_2=5$ です。しかし $b_3=10+6c$ で任意に変えられます。$c\ne0$ なら三次の項があるため第三差分は $3!c=6c\ne0$ となり、(1) の全時刻条件を破ります。これが仮定の働く場所です。
<!-- solution-end -->

## 8. 次の一歩

差分表から多項式を戻す [Newton 前進展開](#thm-comb6-newton-polynomial)を得ました。次は逆の問い――「差を取ると $f$ になる数列をどう求めるか」――です。COMB7では離散的な和分を導入し、差分と総和を結びつけます。