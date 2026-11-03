# COMB7 離散和分と二項反転

[前章の前進差分](../COMB6/index.md#def-comb6-shift-differences)は、数列の隣り合う値から変化量を取り出す操作でした。例えば $F(n)=n^2$ の前進差分は $2n+1$ です。では、逆に奇数列 $1,3,5,\ldots$ だけを渡されたとき、元の平方数を作れるでしょうか。

この章では、差分を元に戻す「和分」と、二項係数で重み付けした数列から元の数列を復元する操作を扱います。両者に共通するのは、**足したものを別の足し方で取り消す**という有限計算です。和の端点、差分のシフト、逆向きの計算の符号を一つずつ確かめます。以後の数列の添字は特に断らなければ非負整数で、全ての和は有限和です。

## 1. 差分の逆を作る：離散和分

関数 $f$ の値 $f(0),f(1),\ldots$ が分かっているとします。まず $S(0)=0$ と置き、$S(1)=f(0)$、$S(2)=f(0)+f(1)$ と順に足します。$S(n+1)-S(n)$ は最後に加えた $f(n)$ だけです。この「差を取ると元へ戻る数列」を一般に考えます。

<a id="def-comb7-discrete-antiderivative"></a>

<!-- formal-statement-start -->
> **定義（離散原始数列と不定和分）**  
> 実数列 $f:\mathbb Z_{\geq0}\to\mathbb R$ に対し、実数列 $F:\mathbb Z_{\geq0}\to\mathbb R$ が全ての非負整数 $n$ で

$$
(\Delta F)(n):=F(n+1)-F(n)=f(n)
$$

> を満たすとき、$F$ を $f$ の**離散原始数列**という。このような $F$ を求める操作を**不定和分**という。特に初期値 $F(0)=0$ を指定したものを $f$ の正規化された離散原始数列と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb7-discrete-antiderivative -->
### 例：奇数を足すと平方数

**定義の確認**：$f(n)=2n+1$、$F(n)=n^2$ とします。いずれも非負整数全体で定義され、全ての $n\geq0$ で

$$
F(n+1)-F(n)=(n+1)^2-n^2=2n+1=f(n)
$$

です。また $F(0)=0$ です。したがって $F$ は正規化された離散原始数列です。一方、$F(n)=n^2+7$ でも差は同じで、初期値だけが7になります。通常の積分定数と同じ自由度が現れます。
<!-- definition-example-end -->

<a id="thm-comb7-discrete-fundamental"></a>

<!-- formal-statement-start -->
> **定理（離散微積分の基本定理）**  
> 任意の実数列 $f:\mathbb Z_{\geq0}\to\mathbb R$ に対して

$$
S(n)=\sum_{j=0}^{n-1}f(j)\quad(n\geq0),\qquad S(0)=0
$$

> と定める。ただし上端が下端より小さいときの和は空和 $0$ とする。このとき全ての $n\geq0$ で $\Delta S(n)=f(n)$ が成立し、$S$ は正規化された離散原始数列として一意である。また任意の実数列 $F$ と非負整数 $0\leq a\leq b$ について

$$
\sum_{j=a}^{b-1}\Delta F(j)=F(b)-F(a)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一つ前の部分和に $f(n)$ を加えると次の部分和になります。逆に、各差 $F(j+1)-F(j)$ を並べると隣り合う値が相殺し、端点だけが残ります。最初の値を固定すれば、それ以降の値も順に一つに決まります。

<!-- proof-start -->
### 証明

$n\geq0$ について、空和の場合も含めて有限和を一項だけ延ばすと

$$
S(n+1)=\sum_{j=0}^{n}f(j)
=\sum_{j=0}^{n-1}f(j)+f(n)=S(n)+f(n)
$$

なので $\Delta S(n)=f(n)$ です。$T$ も $\Delta T=f$、$T(0)=0$ を満たすとすると、$H=T-S$ は $H(0)=0$、$H(n+1)-H(n)=0$ です。$H(1)=H(0)=0$、さらに帰納的に $H(n)=0$ なら $H(n+1)=0$ となり、全ての $n$ で $T(n)=S(n)$ です。初期値を指定しない離散原始数列は $S(n)+C$（実定数 $C$）に限られます。

最後の主張は $a=b$ なら空和 $0=F(a)-F(a)$ です。$a<b$ なら

$$
\begin{aligned}
\sum_{j=a}^{b-1}\Delta F(j)
&=[F(a+1)-F(a)]+[F(a+2)-F(a+1)]\\
&\quad+\cdots+[F(b)-F(b-1)]\\
&=F(b)-F(a).
\end{aligned}
$$

どの中間値も正負一回ずつ現れて打ち消されます。
<!-- proof-end -->

例えば $f(j)=2j+1$ なら $S(n)=n^2$ であることを、先の定義例と一意性から確認できます。$n=0$ では左辺は空和、右辺は $0^2=0$ です。**$\sum_{j=0}^{n-1}$ の上端は $n-1$ ですが、差を取った結果は $f(n)$** になる点に注意します。

## 2. 掛け算された列の和：部分和分

積 $u(n)v(n)$ の差分を取りたいとき、連続関数の積の微分法則をそのまま写すと、評価点のずれを見落とします。$u(n+1)v(n+1)-u(n)v(n)$ の途中へ何を足して引くかで、正確な形が決まります。

<a id="prop-comb7-discrete-product"></a>

<!-- formal-statement-start -->
> **命題（離散積の法則）**  
> 非負整数上の任意の実数列 $u,v$ に対し、全ての $n\geq0$ で

$$
\begin{aligned}
\Delta(uv)(n)
&=u(n+1)\Delta v(n)+v(n)\Delta u(n)\\
&=u(n)\Delta v(n)+v(n+1)\Delta u(n)
\end{aligned}
$$

> が成り立つ。ここで $(uv)(n)=u(n)v(n)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

積の「未来の値」から「今の値」を引き、その間に $u(n+1)v(n)$ を挟めば一行目、$u(n)v(n+1)$ を挟めば二行目が得られます。どちらか一方の因子を一歩ずらす必要があります。

<!-- proof-start -->
### 証明

[前進差分の定義](../COMB6/index.md#def-comb6-shift-differences)を積に適用し、まず $u(n+1)v(n)$ を足して引きます。

$$
\begin{aligned}
\Delta(uv)(n)
&=u(n+1)v(n+1)-u(n)v(n)\\
&=u(n+1)[v(n+1)-v(n)]\\
&\quad+[u(n+1)-u(n)]v(n)\\
&=u(n+1)\Delta v(n)+v(n)\Delta u(n).
\end{aligned}
$$

同じ出発式に $u(n)v(n+1)$ を挟むと

$$
\begin{aligned}
\Delta(uv)(n)
&=[u(n+1)-u(n)]v(n+1)\\
&\quad+u(n)[v(n+1)-v(n)]\\
&=v(n+1)\Delta u(n)+u(n)\Delta v(n)
\end{aligned}
$$

です。いずれも各添字で定義された値だけを使います。
<!-- proof-end -->

<a id="thm-comb7-summation-by-parts"></a>

<!-- formal-statement-start -->
> **定理（部分和分）**  
> $u,v:\mathbb Z_{\geq0}\to\mathbb R$ を実数列、$0\leq a\leq b$ を整数とする。このとき

$$
\sum_{j=a}^{b-1}u(j)\Delta v(j)
=u(b)v(b)-u(a)v(a)
-\sum_{j=a}^{b-1}v(j+1)\Delta u(j)
$$

> が成り立つ。空和では双方の和が $0$ であり、境界項も $0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

[離散積の法則](#prop-comb7-discrete-product)で「差分を $v$ から $u$ へ移す」と、代わりに $v(j+1)$ が現れます。積全体の差分は[離散微積分の基本定理](#thm-comb7-discrete-fundamental)により端点二つに縮みます。

<!-- proof-start -->
### 証明

[離散積の法則](#prop-comb7-discrete-product)の二行目に $n=j$ を代入し、

$$
u(j)\Delta v(j)=\Delta(uv)(j)-v(j+1)\Delta u(j)
$$

と移項します。$j=a,\ldots,b-1$ の全てで足すと

$$
\begin{aligned}
\sum_{j=a}^{b-1}u(j)\Delta v(j)
&=\sum_{j=a}^{b-1}\Delta(uv)(j)
-\sum_{j=a}^{b-1}v(j+1)\Delta u(j)\\
&=u(b)v(b)-u(a)v(a)
-\sum_{j=a}^{b-1}v(j+1)\Delta u(j).
\end{aligned}
$$

二行目は[離散微積分の基本定理](#thm-comb7-discrete-fundamental)を $F=uv$、区間 $[a,b)$ に適用したものです。$a=b$ でも両辺が0です。
<!-- proof-end -->

### 例：シフトした因子を検算する

$u(j)=j$、$v(j)=j^2$、$a=1,b=4$ とします。$\Delta v(j)=2j+1$、$\Delta u(j)=1$ なので左辺は

$$
1\cdot3+2\cdot5+3\cdot7=34.
$$

右辺は $u(4)v(4)-u(1)v(1)=4\cdot16-1=63$ から

$$
\sum_{j=1}^{3}v(j+1)\Delta u(j)=2^2+3^2+4^2=29
$$

を引いて $63-29=34$ です。$v(j)$ と誤って置けば $1+4+9=14$ となり一致しません。

## 3. 二項係数なら和が一段上がる

[前章の下降階乗の差分定理](../COMB6/index.md#thm-comb6-falling-difference)により、二項多項式の差分は下の添字を一つ減らします。したがって、その逆である和分では添字を一つ増やせます。この相性を使うと、べき和を何度も展開せずに求められます。

<a id="thm-comb7-binomial-sum"></a>

<!-- formal-statement-start -->
> **定理（二項多項式の和分）**  
> 非負整数 $k,n$ と、$0\leq a\leq b$ を満たす整数 $a,b$ に対し、一般化二項多項式を整数点で評価すると

$$
\sum_{j=0}^{n-1}\binom jk=\binom n{k+1},
\qquad
\sum_{j=a}^{b-1}\binom jk=\binom b{k+1}-\binom a{k+1}
$$

> が成り立つ。$j<k$ の場合 $\binom jk=0$ とし、$n=0$ または $a=b$ なら和を $0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

$F(j)=\binom j{k+1}$ とすると、差分は $\binom jk$ です。全ての項が隣り合う差になるので望む和は端点差に変わります。

<!-- proof-start -->
### 証明

[下降階乗と一般化二項多項式](../COMB6/index.md#def-comb6-falling-factorial)により $k+1\geq1$ で $\binom0{k+1}=0$ です。

次に[下降階乗の差分定理](../COMB6/index.md#thm-comb6-falling-difference)を次数 $k+1$、整数評価点 $j$ に適用すれば

$$
\Delta\binom{j}{k+1}
=\binom{j+1}{k+1}-\binom{j}{k+1}=\binom jk.
$$

ここで右辺の最初の $\Delta$ は $j\mapsto\binom{j}{k+1}$ という数列に作用します。[離散微積分の基本定理](#thm-comb7-discrete-fundamental)を $F(j)=\binom{j}{k+1}$ に、まず区間 $[0,n)$、次に $[a,b)$ で用いると

$$
\sum_{j=0}^{n-1}\binom jk
=\binom n{k+1}-\binom0{k+1}=\binom n{k+1}
$$

および第二の等式を得ます。$j<k$ の場合は下降階乗に零因子があるため $\binom jk=0$ です。空和についても端点が同じか両辺0なので成立します。
<!-- proof-end -->

たとえば $k=2,n=6$ なら左辺は $0+0+1+3+6+10=20$、右辺も $\binom63=20$ です。この恒等式は二項係数を表に並べて斜めに足す「ホッケースティック恒等式」でもあります。

<a id="thm-comb7-newton-summation"></a>

<!-- formal-statement-start -->
> **定理（Newton 基底による多項式の和分）**  
> $p(x)$ を次数 $d$ 以下の実係数多項式（$d\geq0$ は整数）とし、$c_k=(\Delta^kp)(0)$（$0\leq k\leq d$）と置く。このとき全ての非負整数 $n$ で

$$
\sum_{j=0}^{n-1}p(j)
=\sum_{k=0}^{d}c_k\binom n{k+1}
$$

> が成り立つ。右辺は $n$ に関する次数 $d+1$ 以下の多項式で、$n=0$ では0である。
<!-- formal-statement-end -->

### 証明の見取り図

[Newton 前進展開](../COMB6/index.md#thm-comb6-newton-polynomial)で $p(j)$ を $\binom jk$ の有限和に変えます。項ごとに[二項多項式の和分](#thm-comb7-binomial-sum)を適用すれば、それぞれの下添字が1だけ増えます。

<!-- proof-start -->
### 証明

[Newton 前進展開](../COMB6/index.md#thm-comb6-newton-polynomial)を多項式 $p$、次数上限 $d$、評価点 $x=j$ に適用すると

$$
p(j)=\sum_{k=0}^{d}c_k\binom jk,\qquad c_k=(\Delta^kp)(0).
$$

$j=0,\ldots,n-1$ で和を取ります。どちらも有限の和であるため順序を入れ替えられ、

$$
\begin{aligned}
\sum_{j=0}^{n-1}p(j)
&=\sum_{j=0}^{n-1}\sum_{k=0}^{d}c_k\binom jk\\
&=\sum_{k=0}^{d}c_k\sum_{j=0}^{n-1}\binom jk\\
&=\sum_{k=0}^{d}c_k\binom n{k+1}.
\end{aligned}
$$

最後は[二項多項式の和分](#thm-comb7-binomial-sum)を各 $k$ に適用しました。各 $\binom n{k+1}$ は次数 $k+1$ の多項式で、$k+1\geq1$ より $n=0$ で0です。
<!-- proof-end -->

### 例：二乗和と三乗和

$p(j)=j^2$ では $\Delta^0p(0)=0$、$\Delta p(0)=1$、$\Delta^2p(0)=2$、三回以降は0です。よって

$$
\begin{aligned}
\sum_{j=0}^{n-1}j^2
&=\binom n2+2\binom n3\\
&=\frac{n(n-1)}2+\frac{n(n-1)(n-2)}3\\
&=\frac{n(n-1)(2n-1)}6.
\end{aligned}
$$

$j^3$ なら $j=0,1,2,3$ での値は $0,1,8,27$ で、差分表の先頭は $0,1,6,6$ です。したがって

$$
\sum_{j=0}^{n-1}j^3
=\binom n2+6\binom n3+6\binom n4
=\left(\frac{n(n-1)}2\right)^2.
$$

最後の多項式展開は Level C で自分の手で検証します。ここでは $n=1$ の空でない和（項は $0^3$ だけ）と $n=0$ の空和が共に0になることにも注目します。

## 4. 二項係数で混ぜた数列を戻す

和分では「隣との差」の情報から、初期値を指定して数列を戻しました。今度は各 $a_k$ を二項係数 $\binom nk$ で重み付けして $b_n$ を作り、全ての $b_n$ から $a_n$ を取り戻します。

$b_0$ は $a_0$ だけ、$b_1$ は $a_0,a_1$ だけという三角形の構造が鍵です。

<a id="def-comb7-binomial-transform"></a>

<!-- formal-statement-start -->
> **定義（二項変換）**  
> 実数列 $(a_n)_{n\geq0}$ に対し、実数列 $(b_n)_{n\geq0}$ を

$$
b_n=\sum_{k=0}^{n}\binom nk a_k\qquad(n\geq0)
$$

> で定めるとき、$b$ を $a$ の**二項変換**という。ここで $\binom nk$ は非負整数 $0\leq k\leq n$ の通常の二項係数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb7-binomial-transform -->
### 例：定数列を混ぜる

**定義の確認**：$a_k=1$（全ての $k\geq0$）とすると、最初の3項は次の通りです。

$$
b_0=1,\qquad b_1=1+1=2,\qquad b_2=1+2+1=4.
$$

一般の $n$ では[二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)を $(1+1)^n$ に適用して

$$
b_n=\sum_{k=0}^{n}\binom nk=2^n
$$

となります。各和は $n+1$ 項の有限和なので、無限級数の収束条件はありません。
<!-- definition-example-end -->

<a id="thm-comb7-binomial-inversion"></a>

<!-- formal-statement-start -->
> **定理（二項反転）**  
> 実数列 $a=(a_n)_{n\geq0}$ と $b=(b_n)_{n\geq0}$ について、次の二条件は同値である。

$$
\begin{aligned}
b_n&=\sum_{k=0}^{n}\binom nk a_k &&(n\geq0),\\
a_n&=\sum_{k=0}^{n}(-1)^{n-k}\binom nk b_k &&(n\geq0).
\end{aligned}
$$

> どちらも有限和で、$n=0$ では $a_0=b_0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二重和の順序を交換し、元の $a_j$（逆方向では $b_j$）の係数を計算します。

[二項係数の計数公式](../COMB2/index.md#thm-comb2-binomial-count)から、入れ子に選ぶ組合せは「まず $j$ 個選び、残りからさらに選ぶ」場合に書き換えられます。最後に[二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)の $(1-1)^m$ によって、最後の一項以外が消えます。

<!-- proof-start -->
### 証明

まず $b_n=\sum_{k=0}^n\binom nk a_k$ とします。これを逆変換の候補へ代入して有限和を入れ替えると

$$
\begin{aligned}
\sum_{k=0}^{n}(-1)^{n-k}\binom nk b_k
&=\sum_{k=0}^{n}(-1)^{n-k}\binom nk
\sum_{j=0}^{k}\binom kj a_j\\
&=\sum_{j=0}^{n}a_j
\sum_{k=j}^{n}(-1)^{n-k}\binom nk\binom kj.
\end{aligned}
$$

整数 $0\leq j\leq k\leq n$ のもとで、階乗を直接整理すると

$$
\begin{aligned}
\binom nk\binom kj
&=\frac{n!}{k!(n-k)!}\frac{k!}{j!(k-j)!}\\
&=\frac{n!}{j!(n-j)!}\frac{(n-j)!}{(k-j)!(n-k)!}\\
&=\binom nj\binom{n-j}{k-j}.
\end{aligned}
$$

これを内側の和に代入し、$r=k-j$、$m=n-j$ と置けば

$$
\begin{aligned}
\sum_{k=j}^{n}(-1)^{n-k}\binom nk\binom kj
&=\binom nj\sum_{r=0}^{m}(-1)^{m-r}\binom mr\\
&=\binom nj(1-1)^m\\
&=\begin{cases}1&(j=n),\\0&(j<n).\end{cases}
\end{aligned}
$$

ここで $m=0$ では最後の二項和はただ一項 $\binom00=1$ であり、$m>0$ なら二項定理で0です。したがって元の二重和は $a_n$ だけになり、順方向から逆方向を得ます。

逆に $a_k=\sum_{j=0}^k(-1)^{k-j}\binom kj b_j$ と仮定します。順変換の候補へ代入すると

$$
\begin{aligned}
\sum_{k=0}^{n}\binom nk a_k
&=\sum_{k=0}^{n}\binom nk
\sum_{j=0}^{k}(-1)^{k-j}\binom kj b_j\\
&=\sum_{j=0}^{n}b_j\binom nj
\sum_{r=0}^{n-j}(-1)^r\binom{n-j}{r}\\
&=b_n.
\end{aligned}
$$

この場合も $r=k-j$ と置き、同じ二項係数の積の等式を使いました。内側の和は $j=n$ なら1、$j<n$ なら0です。よって両方向が示されました。
<!-- proof-end -->

例えば $a_0=a_1=a_2=\cdots=1$ から $b_k=2^k$ を得たなら、逆方向は

$$
\sum_{k=0}^{n}(-1)^{n-k}\binom nk2^k=(2-1)^n=1
$$

で、全ての $a_n=1$ が戻ります。$\sum(-1)^k\binom nk b_k$ と書いた場合とは符号の置き方が異なることに注意します。

<a id="cor-comb7-signed-binomial-involution"></a>

<!-- formal-statement-start -->
> **系（符号付き二項変換の自己反転）**  
> 非負整数上の実数列 $a,c$ について、次の二条件は同値である。

$$
c_n=\sum_{k=0}^{n}(-1)^k\binom nk a_k,\qquad
a_n=\sum_{k=0}^{n}(-1)^k\binom nk c_k
\quad(n\geq0).
$$

> つまりこの符号付き変換を二度施すと元の数列に戻る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a'_k=(-1)^ka_k$ と置くと、最初の式は $c_n=\sum_{k=0}^n\binom nk a'_k$、すなわち[二項変換の定義](#def-comb7-binomial-transform)に一致します。[二項反転](#thm-comb7-binomial-inversion)の逆方向を適用して

$$
a'_n=\sum_{k=0}^{n}(-1)^{n-k}\binom nk c_k
$$

です。両辺に $(-1)^n$ を掛けると、$(-1)^na'_n=a_n$、$(-1)^n(-1)^{n-k}=(-1)^k$ なので第二の式を得ます。逆方向も同じ二項反転の同値性で成り立ちます。
<!-- proof-end -->

## 5. 差分係数と二項反転は同じ復元

前章では多項式 $p(x)$ について、$\Delta^kp(0)$ を係数にして $p(x)$ を全実数 $x$ で表す[Newton 前進展開](../COMB6/index.md#thm-comb6-newton-polynomial)を得ました。

数列 $f(0),f(1),\ldots$ が多項式由来と分からない場合でも、**整数点の値だけ**なら同じ形の有限和で戻せます。

<a id="thm-comb7-finite-newton-recovery"></a>

<!-- formal-statement-start -->
> **定理（整数点での有限 Newton 復元）**  
> 任意の実数列 $f:\mathbb Z_{\geq0}\to\mathbb R$ に対して、前進差分を $\Delta f(j)=f(j+1)-f(j)$ として反復定義すると、全ての非負整数 $n$ で

$$
f(n)=\sum_{k=0}^{n}\binom nk(\Delta^kf)(0)
$$

> が成り立つ。多項式性や無限級数の収束は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

差分係数 $a_k=(\Delta^kf)(0)$ は、元の値 $b_j=f(j)$ の符号付き二項和です。それはちょうど[二項反転](#thm-comb7-binomial-inversion)の逆方向の式なので、順方向へ反転すると元の数列が戻ります。

<!-- proof-start -->
### 証明

有限差分は $f(0),\ldots,f(k)$ だけで計算できます。[反復前進差分の交互和](../COMB6/index.md#thm-comb6-iterated-difference)の帰納計算は実数の間の値を使わず、整数点での差分定義だけで同じように進むため

$$
(\Delta^kf)(0)
=\sum_{j=0}^{k}(-1)^{k-j}\binom kj f(j)
$$

となります。これを $a_k=(\Delta^kf)(0)$、$b_j=f(j)$ と読むと、全ての $k$ で[二項反転](#thm-comb7-binomial-inversion)の第二式を満たしています。その第一式を $n$ に対して適用し

$$
b_n=\sum_{k=0}^{n}\binom nk a_k
=\sum_{k=0}^{n}\binom nk(\Delta^kf)(0)
$$

を得ます。$n=0$ は $\binom00\Delta^0f(0)=f(0)$ です。
<!-- proof-end -->

任意の数列では上端の $k$ が $n$ に依存し、全実数 $x$ で成立する一つの多項式恒等式を主張していません。例えば $f(n)=2^n$ の差分は $\Delta^kf(0)=1$（$k\geq0$）なので、整数 $n$ で

$$
2^n=\sum_{k=0}^{n}\binom nk
$$

となります。しかし有限次数の多項式が全ての整数点で $2^n$ に一致するわけではありません。**多項式なら差分係数は途中から0、任意の数列では一般に0にならない**というのが境界です。

## 6. 演習

### Level A：定義・端点・符号を手で確認する

#### A1. 離散原始数列を作る

$f(j)=3j+2$（$j\geq0$）の正規化された離散原始数列 $F(n)$ を式で求め、差分と初期値の双方を検算せよ。

- Level: A
- ID: COMB7-A1

<!-- solution-start -->
**詳細解答**

[二項多項式の和分](#thm-comb7-binomial-sum)を $k=1$ と $k=0$ に使います。$j=\binom j1$、$1=\binom j0$ より

$$
\begin{aligned}
F(n)&=\sum_{j=0}^{n-1}(3j+2)
=3\sum_{j=0}^{n-1}\binom j1+2\sum_{j=0}^{n-1}\binom j0\\
&=3\binom n2+2\binom n1
=\frac{3n(n-1)}2+2n.
\end{aligned}
$$

$F(0)=0$ です。また [下降階乗の差分定理](../COMB6/index.md#thm-comb6-falling-difference)を二項多項式の各項に適用すると $\Delta F(n)=3\binom n1+2\binom n0=3n+2=f(n)$ です。[離散微積分の基本定理](#thm-comb7-discrete-fundamental)によりこの初期値を持つ解は一意です。
<!-- solution-end -->

#### A2. 和の上端を間違えない

$F(j)=j^3$ とする。$\sum_{j=2}^{4}\Delta F(j)$ を、端点差と各項の計算の二通りで求めよ。

- Level: A
- ID: COMB7-A2

<!-- solution-start -->
**詳細解答**

和は $j=2,3,4$ の3項なので、[離散微積分の基本定理](#thm-comb7-discrete-fundamental)へ $a=2,b=5$ を代入し、$F(5)-F(2)=125-8=117$ です。各項では

$$
\Delta F(j)=(j+1)^3-j^3=3j^2+3j+1
$$

なので $\Delta F(2)=19,\ \Delta F(3)=37,\ \Delta F(4)=61$、和は $19+37+61=117$ となります。$F(4)-F(2)$ では末尾の項を一つ落とします。
<!-- solution-end -->

#### A3. 積の法則のシフト

$u(j)=j,v(j)=j^2$ とする。$n=2$ で $\Delta(uv)(2)$ を直接計算し、[離散積の法則](#prop-comb7-discrete-product)の二つの表示と照合せよ。

- Level: A
- ID: COMB7-A3

<!-- solution-start -->
**詳細解答**

$(uv)(j)=j^3$ より $\Delta(uv)(2)=3^3-2^3=19$ です。一方 $\Delta v(2)=9-4=5,\ \Delta u(2)=3-2=1$ なので

$$
\begin{aligned}
u(3)\Delta v(2)+v(2)\Delta u(2)&=3\cdot5+4\cdot1=19,\\
u(2)\Delta v(2)+v(3)\Delta u(2)&=2\cdot5+9\cdot1=19.
\end{aligned}
$$

どちらも直接計算に一致します。積の二つの因子を両方 $n$ で評価してはいけません。
<!-- solution-end -->

#### A4. 二項係数のホッケースティック和

$\sum_{j=0}^{5}\binom j2$ を全項を並べて求め、[二項多項式の和分](#thm-comb7-binomial-sum)でも確かめよ。さらに $n=0,k=2$ ではどうなるか述べよ。

- Level: A
- ID: COMB7-A4

<!-- solution-start -->
**詳細解答**

各項は $\binom02=0,\binom12=0,\binom22=1,\binom32=3,\binom42=6,\binom52=10$ なので和は $20$ です。定理の $n=6,k=2$ を使うと $\binom63=6\cdot5\cdot4/6=20$。$n=0$ なら和は空和0で、右辺 $\binom03=0$ と一致します。
<!-- solution-end -->

#### A5. 三角形の変換を戻す

$a_0=1,a_1=2,a_2=3,a_3=0$ とする。[二項変換](#def-comb7-binomial-transform)による $b_0,b_1,b_2,b_3$ を求め、[二項反転](#thm-comb7-binomial-inversion)から $a_2,a_3$ を復元せよ。

- Level: A
- ID: COMB7-A5

<!-- solution-start -->
**詳細解答**

定義を $n=0,1,2,3$ に適用し、二項係数の行 $1$、$1,1$、$1,2,1$、$1,3,3,1$ を使います。

$$
\begin{aligned}
b_0&=1,&b_1&=1+2=3,\\
b_2&=1+2\cdot2+3=8,&
b_3&=1+3\cdot2+3\cdot3+0=16.
\end{aligned}
$$

反転で

$$
\begin{aligned}
a_2&=b_2-2b_1+b_0=8-6+1=3,\\
a_3&=b_3-3b_2+3b_1-b_0=16-24+9-1=0.
\end{aligned}
$$

$(n-k)$ の偶奇で符号が決まることを確認できました。
<!-- solution-end -->

### Level B：二つの公式をつないで導く

#### B1. 一般の開始点を持つ二項和

非負整数 $k$ と整数 $0\leq a\leq b$ について $\sum_{j=a}^{b-1}\binom jk$ を求め、$a=b$ と $b\leq k$ の場合を個別に検算せよ。

- Level: B
- ID: COMB7-B1

<!-- solution-start -->
**詳細解答**

$F(j)=\binom j{k+1}$ とすれば、[下降階乗の差分定理](../COMB6/index.md#thm-comb6-falling-difference)の添字を $k+1$ として

$$
\Delta F(j)=\binom{j+1}{k+1}-\binom j{k+1}=\binom jk.
$$

したがって[離散微積分の基本定理](#thm-comb7-discrete-fundamental)を区間 $[a,b)$ に適用すると、和は $\binom b{k+1}-\binom a{k+1}$ です。

$a=b$ なら両辺0です。$b\leq k$ なら $j\leq b-1<k$ で左辺の各項は0、右辺も $a,b\leq k<k+1$ より両方の二項係数が0です。
<!-- solution-end -->

#### B2. 部分和分で指数付き和を求める

任意の非負整数 $n$ について $\sum_{j=0}^{n-1}j2^j$ を[部分和分](#thm-comb7-summation-by-parts)から導け。$n=0,1,2$ を検算せよ。

- Level: B
- ID: COMB7-B2

<!-- solution-start -->
**詳細解答**

$u(j)=j,\ v(j)=2^j$ とすると $\Delta v(j)=2^{j+1}-2^j=2^j$、$\Delta u(j)=1$ です。[部分和分](#thm-comb7-summation-by-parts)で $a=0,b=n$ を選ぶと

$$
\begin{aligned}
\sum_{j=0}^{n-1}j2^j
&=n2^n-0\cdot1-\sum_{j=0}^{n-1}2^{j+1}\\
&=n2^n-2\sum_{j=0}^{n-1}2^j.
\end{aligned}
$$

有限等比和は $G(n)=\sum_{j=0}^{n-1}2^j$ について $2G(n)-G(n)=2^n-1$（$n\geq0$、$n=0$ は空和）なので $G(n)=2^n-1$ です。従って

$$
\sum_{j=0}^{n-1}j2^j=n2^n-2(2^n-1)=(n-2)2^n+2.
$$

$n=0$ は $-2+2=0$、$n=1$ は $-2+2=0$、$n=2$ は $0+2=2$ で、直接和 $0,\ 0,\ 0\cdot1+1\cdot2$ と一致します。
<!-- solution-end -->

#### B3. 幾何数列の二項変換を反転する

実数 $t$ と非負整数 $n$ に対して $a_k=t^k$（$t^0=1$ とする）を二項変換した $b_n$ を求め、[二項反転](#thm-comb7-binomial-inversion)から $a_n$ が戻ることを式で示せ。

- Level: B
- ID: COMB7-B3

<!-- solution-start -->
**詳細解答**

[二項変換の定義](#def-comb7-binomial-transform)より $b_n=\sum_{k=0}^n\binom nk t^k$ です。[二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)で $1+t$ を展開したものなので $b_n=(1+t)^n$。逆変換にこれを代入すると

$$
\begin{aligned}
\sum_{k=0}^{n}(-1)^{n-k}\binom nk b_k
&=\sum_{k=0}^{n}\binom nk(1+t)^k(-1)^{n-k}\\
&=((1+t)+(-1))^n=t^n.
\end{aligned}
$$

$n=0$ ではいずれも一項1で、$t=-1$ の場合も $b_0=(1+t)^0=1$ は空積の値です。$n>0$ では通常の二項定理が使えます。
<!-- solution-end -->

#### B4. 二度の和分と有限和の順序交換

非負整数 $r,n$ に対し、次の有限二重和を閉じた二項係数の式にせよ。また順序を交換した式も書け。

$$
T(n,r)=\sum_{j=0}^{n-1}\sum_{k=0}^{j}\binom kr.
$$

- Level: B
- ID: COMB7-B4

<!-- solution-start -->
**詳細解答**

内側の和に[二項多項式の和分](#thm-comb7-binomial-sum)を区間 $[0,j+1)$ で使うと

$$
\sum_{k=0}^{j}\binom kr=\binom{j+1}{r+1}.
$$

そこで $m=j+1$ と置けば $m=1,\ldots,n$ となり、$\binom0{r+1}=0$ に注意して

$$
T(n,r)=\sum_{m=1}^{n}\binom m{r+1}
=\sum_{m=0}^{n}\binom m{r+1}
=\binom{n+1}{r+2}.
$$

一方、有限な格子点の範囲 $0\leq k\leq j\leq n-1$ で $k$ を先に固定すると、各 $k$ は $j=k,k+1,\ldots,n-1$ の $n-k$ 回現れます。よって

$$
T(n,r)=\sum_{k=0}^{n-1}(n-k)\binom kr.
$$

$n=0$ では両方空和0、閉じた式も $\binom1{r+2}=0$（$r\geq0$）です。無限和の交換は行っていません。
<!-- solution-end -->

### Level C：差分・和分・反転を一続きで使う

#### C1. 三乗和を Newton 基底から作る

$p(x)=x^3$ とする。次の問いに答えよ。

1. $p(0),p(1),p(2),p(3)$ から $c_k=\Delta^kp(0)$（$k=0,1,2,3$）を求めよ。
2. [Newton 基底による多項式の和分](#thm-comb7-newton-summation)で次の和を求め、通常の多項式へ展開して公式を証明せよ。

   $$
   \sum_{j=0}^{n-1}j^3
   $$

3. $n=0,2$ を検算せよ。

- Level: C
- ID: COMB7-C1

<!-- solution-start -->
**詳細解答**

(1) 値は $0,1,8,27$ です。第一差分は $1,7,19$、第二差分は $6,12$、第三差分は $6$ なので、各段の先頭は

$$
(c_0,c_1,c_2,c_3)=(0,1,6,6).
$$

これは[有限差分表の定義](../COMB6/index.md#def-comb6-finite-difference-table)に従う有限回の引き算です。

(2) [Newton 前進展開](../COMB6/index.md#thm-comb6-newton-polynomial)を次数3の $p$ に適用すると

$$
j^3=\binom j1+6\binom j2+6\binom j3.
$$

従って[Newton 基底による多項式の和分](#thm-comb7-newton-summation)により

$$
\sum_{j=0}^{n-1}j^3=\binom n2+6\binom n3+6\binom n4.
$$

右辺を下降階乗で開き、$n(n-1)/4$ を共通因子としてまとめます。

$$
\begin{aligned}
&\frac{n(n-1)}2
+n(n-1)(n-2)+\frac{n(n-1)(n-2)(n-3)}4\\
&=\frac{n(n-1)}4
\{2+4(n-2)+(n-2)(n-3)\}\\
&=\frac{n(n-1)}4\{2+4n-8+n^2-5n+6\}\\
&=\frac{n(n-1)}4(n^2-n)
=\left(\frac{n(n-1)}2\right)^2.
\end{aligned}
$$

(3) $n=0$ では空和0、公式も0です。$n=2$ では $0^3+1^3=1$、公式は $(2\cdot1/2)^2=1$ です。
<!-- solution-end -->

#### C2. 二項変換した列を和分し、反転で戻す

$a_k=k+1$（$k\geq0$）を[二項変換](#def-comb7-binomial-transform)した $b_n$ を考える。

1. $b_n$ を $n$ の式で求めよ。
2. $S(n)=\sum_{j=0}^{n-1}b_j$ を[部分和分](#thm-comb7-summation-by-parts)を使って求めよ。
3. [二項反転](#thm-comb7-binomial-inversion)の式へ求めた $b_k$ を代入し、全ての $a_n=n+1$ が戻ることを直接示せ。$n=0$ を別に確かめよ。

- Level: C
- ID: COMB7-C2

<!-- solution-start -->
**詳細解答**

(1) $b_n=\sum_{k=0}^{n}\binom nk(k+1)$ です。[二項係数の計数公式](../COMB2/index.md#thm-comb2-binomial-count)の階乗表示から $k\binom nk=n\binom{n-1}{k-1}$（$1\leq k\leq n$）となります。$n\geq1$ で

$$
\begin{aligned}
\sum_{k=0}^{n}k\binom nk
&=n\sum_{k=1}^{n}\binom{n-1}{k-1}\\
&=n\sum_{r=0}^{n-1}\binom{n-1}{r}=n2^{n-1}
\end{aligned}
$$

です。加えて $\sum_{k=0}^{n}\binom nk=2^n$ なので

$$
b_n=2^n+n2^{n-1}.
$$

$n=0$ では定義から $b_0=a_0=1$、得た式も $1+0=1$ です。

(2) [部分和分](#thm-comb7-summation-by-parts)を $u(j)=j,v(j)=2^j$ へ適用した B2 の計算を、区間 $[0,n)$ で再び行います。$\Delta u=1,\Delta v=2^j$ なので

$$
\sum_{j=0}^{n-1}j2^j=n2^n-2(2^n-1).
$$

これを2で割った式と、有限等比和 $\sum_{j=0}^{n-1}2^j=2^n-1$ を足して

$$
\begin{aligned}
S(n)&=\sum_{j=0}^{n-1}\left(2^j+j2^{j-1}\right)\\
&=(2^n-1)+\frac{n2^n-2(2^n-1)}2\\
&=n2^{n-1}.
\end{aligned}
$$

$n=0$ は空和0で、右辺も0です。

(3) [二項反転](#thm-comb7-binomial-inversion)へ $b_k=2^k+k2^{k-1}$ を代入します。第一部分は[二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)により

$$
\sum_{k=0}^{n}(-1)^{n-k}\binom nk2^k=(2-1)^n=1.
$$

$n\geq1$ で第二部分は $k=0$ の項が0です。$k\binom nk=n\binom{n-1}{k-1}$、$r=k-1$ を順に使い、

$$
\begin{aligned}
\sum_{k=1}^{n}(-1)^{n-k}\binom nk k2^{k-1}
&=n\sum_{k=1}^{n}(-1)^{n-k}\binom{n-1}{k-1}2^{k-1}\\
&=n\sum_{r=0}^{n-1}(-1)^{n-1-r}\binom{n-1}{r}2^r\\
&=n(2-1)^{n-1}=n.
\end{aligned}
$$

従って反転の右辺は $1+n=a_n$ です。$n=0$ でもただ一項 $b_0=1=a_0$ となり、式は全ての $n$ で成立します。
<!-- solution-end -->

## 7. 次の一歩

和分は「差分を元に戻す」操作でした。二項反転では、有限差分の符号付き係数を再度二項係数で足すと元に戻ることが分かりました。次章では、この差分の法則を**初期値を持つ方程式**として整理し、一次・高階の線形差分方程式の解がなぜ一意に決まるかを学びます。
