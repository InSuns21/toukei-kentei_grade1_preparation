# FA2 標準関数解析 II：開写像定理・有界逆定理・閉グラフ定理

<!-- definition-example-audit: strict -->

FA1 では、Banach 空間の商と [Baire のカテゴリー定理](../TOP6/index.md#thm-top6-baire-category)から一様有界性を引き出す仕組みを整えました。本章では、同じ「完備性が局所情報を大域化する」機構を、作用素そのものへ向けます。

```text
全射有界線形作用素 T:X→Y
  ↓  Y の Baire 性
closure(T(B_X)) が 0 のまわりの球を含む
  ↓  X の完備性 + 幾何級数型の補正
T(B_X) 自身が 0 のまわりの球を含む
  ↓
T は開写像
  ↓
全単射なら T^{-1} は有界
  ↓
閉グラフを持つ全定義線形作用素は有界
```

重要なのは、中央の

$$
B_Y(0,\delta)\subset \overline{T(B_X(0,1))}
\quad\Longrightarrow\quad
B_Y(0,c)\subset T(B_X(0,1))
$$

を省略しないことです。閉包の中に入っただけでは、まだ実際の原像は得られていません。そこを埋めるのが本章の核心です。

本章でも Hahn–Banach は使いません。スカラー体は $\mathbb R$ または $\mathbb C$ とします。

---

## 1. 開写像とは何か

<a id="def-fa2-open-map"></a>
<!-- formal-statement-start -->
### 定義（開写像）

位相空間 $X,Y$ の間の写像 $T:X\to Y$ が **開写像** であるとは、任意の開集合 $U\subset X$ に対して $T(U)$ が $Y$ で開集合になることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa2-open-map -->
**定義の確認**：積空間の座標射影

ノルム空間 $X,Y$ に対し

$$
P:X\times Y\to X,\qquad P(x,y)=x
$$

を考えます。積空間に

$$
\|(x,y)\|=\|x\|+\|y\|
$$

を入れると、任意の $(x_0,y_0)$ と $r>0$ について

$$
B_X(x_0,r)\subset P(B_{X\times Y}((x_0,y_0),r)).
$$

実際 $x\in B_X(x_0,r)$ なら $(x,y_0)$ が右辺の球に入ります。従って $P$ は開写像です。
<!-- definition-example-end -->

連続性は逆像を、開写像性は像を制御する性質であり、両者は別物です。しかし線形作用素では「単位球の像が 0 の近傍を含む」ことが開写像性を支配します。

### 球一個を押さえれば十分

線形写像 $T:X\to Y$ について、ある $c>0$ が

$$
B_Y(0,c)\subset T(B_X(0,1))
\tag{1}
$$

を満たすとします。$U\subset X$ を開集合、$x_0\in U$ とすると、ある $r>0$ が

$$
B_X(x_0,r)\subset U
$$

を満たします。線形性により

$$
T(B_X(x_0,r))
=Tx_0+rT(B_X(0,1)),
$$

従って (1) から

$$
B_Y(Tx_0,rc)
\subset T(B_X(x_0,r))
\subset T(U).
$$

よって各 $Tx_0$ は $T(U)$ の内点です。したがって、以後の目標は (1) の形の球包含を作ることに尽きます。

---

## 2. Baire がまず与えるのは「閉包内の球」

$X,Y$ を Banach 空間、$T:X\to Y$ を全射有界線形作用素とします。単位開球を

$$
B:=B_X(0,1)
$$

と書きます。

全射性から任意の $y\in Y$ はある $x\in X$ の像です。十分大きい整数 $n$ を取れば $x\in nB$ なので

$$
Y
=\bigcup_{n=1}^{\infty}T(nB)
\subset
\bigcup_{n=1}^{\infty}\overline{T(nB)}
\subset Y.
$$

従って

$$
Y=\bigcup_{n=1}^{\infty}\overline{T(nB)}.
\tag{2}
$$

各 $\overline{T(nB)}$ は閉集合です。$Y$ は Banach なので、[Baire のカテゴリー定理](../TOP6/index.md#thm-top6-baire-category)を (2) に適用でき、ある $n$ について $\overline{T(nB)}$ は空でない内部を持ちます。

スカラー倍写像は同相なので

$$
\overline{T(nB)}=n\overline{T(B)}.
$$

したがって $\overline{T(B)}$ も空でない内部を持ちます。よってある $y_0\in Y$ と $r>0$ が存在して

$$
B_Y(y_0,r)\subset \overline{T(B)}.
\tag{3}
$$

ここから中心を 0 に移します。$T(B)$ は対称、すなわち $T(B)=-T(B)$ なので、その閉包も対称です。$\|y\|<2r$ とすると

$$
y_+=y_0+\frac y2,
\qquad
y_-=y_0-\frac y2
$$

はいずれも $B_Y(y_0,r)$ に入ります。(3) より $y_+,y_-\in\overline{T(B)}$ です。差を取れば

$$
y=y_+-y_-
\in
\overline{T(B)}-\overline{T(B)}
\subset
\overline{T(B)-T(B)}
\subset
\overline{T(2B)}.
$$

従って

$$
B_Y(0,2r)\subset 2\overline{T(B)},
$$

両辺を $2$ で割って

$$
\boxed{B_Y(0,r)\subset\overline{T(B_X(0,1))}}.
\tag{4}
$$

ここまでで使った完備性は **値域 $Y$ の Banach 性** です。まだ (4) は閉包の主張にすぎません。

---

## 3. 閉包を実像へ変える逐次近似

<a id="lem-fa2-closure-to-image"></a>
<!-- formal-statement-start -->
### 補題（閉包内の球を実際の像内の球へ押し上げる）

$X$ を Banach 空間、$Y$ をノルム空間、$T:X\to Y$ を有界線形作用素とする。ある $\delta>0$ について

$$
B_Y(0,\delta)
\subset
\overline{T(B_X(0,1))}
$$

が成り立つなら

$$
\boxed{
B_Y\left(0,\frac\delta2\right)
\subset
T(B_X(0,1))
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$y\in Y$ を

$$
\|y\|<\frac\delta2
$$

となるように固定します。

仮定を $a>0$ 倍すると

$$
B_Y(0,a\delta)
\subset
\overline{T(B_X(0,a))}
\tag{5}
$$

が任意の $a>0$ について成り立ちます。

まず $a=1/2$ とします。$y\in B_Y(0,\delta/2)$ であり、(5) から

$$
y\in\overline{T(B_X(0,1/2))}.
$$

閉包の定義により $x_1\in X$ を

$$
\|x_1\|<\frac12,
\qquad
\|y-Tx_1\|<\frac\delta4
$$

となるように取れます。

残差を

$$
r_1=y-Tx_1
$$

と置きます。次に $a=1/4$ とすると

$$
r_1\in B_Y(0,\delta/4)
\subset
\overline{T(B_X(0,1/4))}
$$

なので、$x_2\in X$ を

$$
\|x_2\|<\frac14,
\qquad
\|r_1-Tx_2\|<\frac\delta8
$$

となるように取れます。

同様に帰納的に $x_n\in X$ を選んで

$$
\|x_n\|<2^{-n}
\tag{6}
$$

かつ

$$
\left\|
y-T\sum_{k=1}^{n}x_k
\right\|
<\delta 2^{-(n+1)}
\tag{7}
$$

とできます。

(6) から $m>n$ に対し

$$
\left\|
\sum_{k=1}^{m}x_k-
\sum_{k=1}^{n}x_k
\right\|
\le
\sum_{k=n+1}^{m}2^{-k},
$$

右辺は $n\to\infty$ で 0 になります。従って部分和は $X$ の Cauchy 列です。**ここで定義域 $X$ の完備性を使い**、ある $x\in X$ が存在して

$$
\sum_{k=1}^{n}x_k\to x.
$$

さらに

$$
\|x\|
\le
\sum_{k=1}^{\infty}\|x_k\|
<
\sum_{k=1}^{\infty}2^{-k}
=1,
$$

だから $x\in B_X(0,1)$ です。

$T$ は有界なので連続です。従って

$$
T\sum_{k=1}^{n}x_k\to Tx.
$$

一方 (7) の右辺は 0 に収束するため

$$
T\sum_{k=1}^{n}x_k\to y.
$$

極限の一意性から $Tx=y$ です。よって

$$
y\in T(B_X(0,1)).
$$

$y$ は $B_Y(0,\delta/2)$ の任意の点だったので結論を得ます。$\square$
<!-- proof-end -->

この補題では $Y$ の完備性は使いません。役割分担は明確です。

```text
Y complete → Baire → closure の中に球
X complete → 補正級数が X で収束 → 実際の像の中に球
```

---

## 4. 主定理：全射有界線形作用素は開く

<a id="thm-fa2-open-mapping"></a>
<!-- formal-statement-start -->
### 定理（開写像定理）

$X,Y$ を Banach 空間とし、$T:X\to Y$ を全射有界線形作用素とする。このとき $T$ は開写像である。

より具体的には、ある $c>0$ が存在して

$$
B_Y(0,c)
\subset
T(B_X(0,1))
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Section 2 の Baire の議論から、ある $\delta>0$ が存在して

$$
B_Y(0,\delta)
\subset
\overline{T(B_X(0,1))}
$$

となります。[閉包内の球から像内の球への逐次近似](#lem-fa2-closure-to-image)を適用すると

$$
B_Y\left(0,\frac\delta2\right)
\subset
T(B_X(0,1)).
$$

従って $c=\delta/2$ と置けば単位球像が 0 の近傍を含みます。Section 1 の球の拡大縮小の議論から、任意の開集合 $U\subset X$ に対して $T(U)$ は開です。$\square$
<!-- proof-end -->

### 定量的な読み方

上の球包含は、任意の $y\in Y$ に対し「大きすぎない原像」を取れることを意味します。$y\ne0$ とし、$0<a<c/\|y\|$ を取ると $ay\in B_Y(0,c)$ なので、ある $u\in B_X(0,1)$ が

$$
Tu=ay
$$

を満たします。$x=u/a$ と置けば $Tx=y$ かつ

$$
\|x\|<\frac1a.
$$

$a\uparrow c/\|y\|$ とできるため、任意の $\varepsilon>0$ に対し

$$
Tx=y,
\qquad
\|x\|\le \left(\frac1c+\varepsilon\right)\|y\|
$$

となる原像を選べます。全射性だけなら原像の存在しか分かりませんが、完備性は原像の大きさまで制御します。

---

## 5. 全単射なら逆写像も自動的に有界

<a id="thm-fa2-bounded-inverse"></a>
<!-- formal-statement-start -->
### 定理（有界逆定理）

$X,Y$ を Banach 空間とし、$T:X\to Y$ を全単射有界線形作用素とする。このとき逆写像

$$
T^{-1}:Y\to X
$$

も有界線形作用素である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T^{-1}$ の線形性は $T$ の線形性と単射性から従います。

[開写像定理](#thm-fa2-open-mapping)により $T$ は開写像です。従って $X$ の任意の開集合 $U$ に対して

$$
(T^{-1})^{-1}(U)=T(U)
$$

は $Y$ で開です。したがって $T^{-1}$ は連続です。線形写像について 0 での連続性と有界性は同値なので $T^{-1}$ は有界です。$\square$
<!-- proof-end -->

球包含から作用素ノルムも読めます。もし

$$
B_Y(0,c)\subset T(B_X(0,1))
$$

なら、全単射性により各 $y\in B_Y(0,c)$ の原像はただ一つで、その原像は単位球に入ります。従って

$$
\|T^{-1}y\|<1
\qquad(\|y\|<c).
$$

斉次性から

$$
\boxed{\|T^{-1}\|\le \frac1c}.
$$

### 例：微分と積分が互いに有界になるノルム

$$
E=\{f\in C^1([0,1]):f(0)=0\}
$$

に

$$
\|f\|_E=\|f\|_\infty+\|f'\|_\infty
$$

を入れ、

$$
D:E\to C([0,1]),\qquad Df=f'
$$

とします。$D$ は全単射で、

$$
\|Df\|_\infty\le\|f\|_E
$$

です。逆写像は

$$
(D^{-1}g)(t)=\int_0^t g(s)\,ds
$$

で、実際

$$
\|D^{-1}g\|_E
\le
2\|g\|_\infty.
$$

この例では逆作用素を直接計算できますが、一般には明示公式がなくても Banach 性と全単射性だけで逆作用素の有界性が従います。

---

## 6. FA1 の商空間を使う：全射の原像を定量化する

$T:X\to Y$ を全射有界線形作用素とします。連続性から

$$
\ker T=T^{-1}(\{0\})
$$

は閉部分空間です。従って [Banach 空間の閉部分空間による商は Banach](../FA1/index.md#thm-fa1-quotient-banach) より

$$
X/\ker T
$$

は Banach 空間です。

写像

$$
\widetilde T:X/\ker T\to Y,
\qquad
\widetilde T(x+\ker T)=Tx
$$

を考えます。$x-x'\in\ker T$ なら $Tx=Tx'$ なので well-defined です。全射性は $T$ から従い、

$$
\widetilde T(x+\ker T)=0
\iff Tx=0
\iff x+\ker T=\ker T
$$

なので単射です。

さらに商ノルムの定義から

$$
\begin{aligned}
\|\widetilde T(x+\ker T)\|
&=\|Tx\|\\
&=\|T(x-k)\|\qquad(k\in\ker T)\\
&\le\|T\|\,\|x-k\|.
\end{aligned}
$$

$k$ について infimum を取れば

$$
\|\widetilde T(x+\ker T)\|
\le
\|T\|\,\|x+\ker T\|_{X/\ker T}.
$$

よって $\widetilde T$ は有界です。

<a id="cor-fa2-quotient-lifting"></a>
<!-- formal-statement-start -->
### 系（商空間による全射作用素の定量的持ち上げ）

$X,Y$ を Banach 空間、$T:X\to Y$ を全射有界線形作用素とする。このときある $C>0$ が存在して

$$
\inf_{Tx=y}\|x\|
\le C\|y\|
\qquad(y\in Y)
$$

となる。

従って任意の $\varepsilon>0$ と $y\in Y$ に対し、ある $x\in X$ が存在して

$$
Tx=y,
\qquad
\|x\|<C\|y\|+\varepsilon
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で構成した $\widetilde T:X/\ker T\to Y$ は Banach 空間間の全単射有界線形作用素です。[有界逆定理](#thm-fa2-bounded-inverse)から $\widetilde T^{-1}$ は有界です。$C=\|\widetilde T^{-1}\|$ と置くと

$$
\|\widetilde T^{-1}y\|_{X/\ker T}
\le C\|y\|.
$$

$Tx=y$ となる任意の $x$ について

$$
\widetilde T^{-1}y=x+\ker T,
$$

従って

$$
\|\widetilde T^{-1}y\|_{X/\ker T}
=
\inf_{k\in\ker T}\|x-k\|
=
\inf_{Tz=y}\|z\|.
$$

これで最初の不等式を得ます。最後の主張は infimum の定義から従います。最良代表元が存在すると仮定する必要はありません。$\square$
<!-- proof-end -->

FA1 で「商ノルムの infimum は達成されるとは限らない」と注意したことが、ここでもそのまま効いています。

---

## 7. 作用素のグラフ

<a id="def-fa2-operator-graph"></a>
<!-- formal-statement-start -->
### 定義（作用素のグラフ）

線形写像 $T:X\to Y$ に対して

$$
G(T)
:=
\{(x,Tx):x\in X\}
\subset X\times Y
$$

を $T$ の **グラフ** という。$G(T)$ が $X\times Y$ の閉部分空間であるとき、$T$ は閉作用素であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa2-operator-graph -->
**定義の確認**：有界作用素のグラフは閉じている

$T:X\to Y$ が有界線形作用素とします。$(x_n,Tx_n)\to(x,y)$ とすると $x_n\to x$ です。有界性から

$$
\|Tx_n-Tx\|\le\|T\|\,\|x_n-x\|\to0,
$$

一方 $Tx_n\to y$ なので極限の一意性から $y=Tx$ です。従って $(x,y)\in G(T)$ で、$G(T)$ は閉です。
<!-- definition-example-end -->

逆向きは有限次元なら自然に見えますが、無限次元では非自明です。「グラフが閉じている」という極限に関する条件から、作用素ノルムの一様評価を引き出すために完備性が必要になります。

### 積 Banach 空間

$X,Y$ が Banach なら

$$
\|(x,y)\|_{X\times Y}=\|x\|_X+\|y\|_Y
$$

により $X\times Y$ も Banach です。実際 $(x_n,y_n)$ が Cauchy なら

$$
\|x_n-x_m\|\le\|(x_n,y_n)-(x_m,y_m)\|,
$$

$$
\|y_n-y_m\|\le\|(x_n,y_n)-(x_m,y_m)\|,
$$

だから各座標が Cauchy で、それぞれ $x\in X,y\in Y$ へ収束します。そして

$$
\|(x_n,y_n)-(x,y)\|
=
\|x_n-x\|+\|y_n-y\|\to0.
$$

従って、$G(T)$ が閉なら $G(T)$ は Banach 空間の閉部分空間として Banach です。

---

## 8. 閉じたグラフから有界性を取り出す

<a id="thm-fa2-closed-graph"></a>
<!-- formal-statement-start -->
### 定理（閉グラフ定理）

$X,Y$ を Banach 空間とし、$T:X\to Y$ を線形写像とする。$T$ が $X$ の全てで定義され、グラフ $G(T)$ が $X\times Y$ で閉なら、$T$ は有界である。

従って、Banach 空間間の全定義線形写像について

$$
T\text{ が有界}
\iff
G(T)\text{ が閉}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有界ならグラフが閉じることは Section 7 で確認済みです。逆向きを示します。

$G(T)$ に積空間から入るノルム

$$
\|(x,Tx)\|_G
=
\|x\|_X+\|Tx\|_Y
$$

を入れます。$G(T)$ は閉部分空間なので Banach です。

第一座標への射影を

$$
P:G(T)\to X,
\qquad
P(x,Tx)=x
$$

と定めます。これは線形で、

$$
\|P(x,Tx)\|_X
=
\|x\|_X
\le
\|x\|_X+\|Tx\|_Y
=
\|(x,Tx)\|_G
$$

だから有界です。

$T$ が $X$ の全てで定義されているので、任意の $x\in X$ に $(x,Tx)\in G(T)$ が対応し、$P$ は全射です。また

$$
P(x,Tx)=0
$$

なら $x=0$、従って $(x,Tx)=(0,0)$ なので単射です。したがって $P$ は Banach 空間間の全単射有界線形作用素です。

[有界逆定理](#thm-fa2-bounded-inverse)を $P$ に適用すると

$$
P^{-1}:X\to G(T),
\qquad
P^{-1}x=(x,Tx)
$$

は有界です。よってある $C>0$ が存在して

$$
\|x\|_X+\|Tx\|_Y
=
\|P^{-1}x\|_G
\le C\|x\|_X.
$$

従って

$$
\|Tx\|_Y
\le C\|x\|_X,
$$

よって $T$ は有界です。$\square$
<!-- proof-end -->

ここで「全てで定義される」という仮定は飾りではありません。射影 $P:G(T)\to X$ の全射性そのものに使っています。

---

## 9. グラフノルムで見ると何が起きているか

<a id="def-fa2-graph-norm"></a>
<!-- formal-statement-start -->
### 定義（グラフノルム）

線形写像 $T:X\to Y$ に対して

$$
\boxed{
\|x\|_T
:=
\|x\|_X+\|Tx\|_Y
}
$$

を $T$ の **グラフノルム** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa2-graph-norm -->
**定義の確認**：微分を含めた $C^1$ ノルム

$T=D$ を微分作用素とすると

$$
\|f\|_D
=
\|f\|_\infty+\|f'\|_\infty,
$$

これは通常の $C^1$ ノルムです。sup ノルムだけでは見えない導関数の大きさを、グラフノルムは明示的に測ります。
<!-- definition-example-end -->

写像

$$
J:(X,\|\cdot\|_T)\to G(T),
\qquad
Jx=(x,Tx)
$$

は定義から等長同型です。したがってグラフの閉性はグラフノルムの完備性として読み替えられます。

<a id="cor-fa2-graph-norm"></a>
<!-- formal-statement-start -->
### 系（閉グラフとグラフノルム）

$X,Y$ を Banach 空間、$T:X\to Y$ を全定義線形写像とする。このとき次は同値である。

1. $G(T)$ は $X\times Y$ で閉である。
2. $(X,\|\cdot\|_T)$ は Banach 空間である。

さらにこれらが成り立つとき、元のノルムとグラフノルムは同値、すなわちある $C\ge1$ が存在して

$$
\|x\|_X
\le
\|x\|_T
\le
C\|x\|_X
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$J:(X,\|\cdot\|_T)\to G(T)$ は等長同型なので、(1) なら $G(T)$ が Banach であることから (2) が従います。

逆に (2) とします。$(x_n,Tx_n)\in G(T)$ が積ノルムで $(x,y)$ に収束すると

$$
\|x_n-x_m\|_T
=
\|x_n-x_m\|+
\|Tx_n-Tx_m\|
\to0,
$$

従って $(x_n)$ はグラフノルムで Cauchy です。(2) からある $z\in X$ に $\|x_n-z\|_T\to0$。特に $x_n\to z$ かつ $Tx_n\to Tz$ です。一方積ノルム収束から $x_n\to x$、$Tx_n\to y$ なので $z=x$、$Tz=y$。従って $y=Tx$ であり $(x,y)\in G(T)$、よって (1) です。

最後に (1) が成り立てば[閉グラフ定理](#thm-fa2-closed-graph)から $T$ は有界で、

$$
\|x\|_T
\le
(1+\|T\|)\|x\|_X.
$$

逆向き $\|x\|_X\le\|x\|_T$ は定義から自明です。$\square$
<!-- proof-end -->

---

## 10. 仮定を外したときに壊れる機構

### 10.1 非完備空間では全単射有界でも逆が有界とは限らない

有限支列 $c_{00}$ に二つのノルムを入れます。

$$
X=(c_{00},\|\cdot\|_1),
\qquad
Y=(c_{00},\|\cdot\|_2).
$$

恒等写像

$$
I:X\to Y,
\qquad Ix=x
$$

は全単射で、

$$
\|Ix\|_2\le\|x\|_1
$$

だから有界です。しかし逆写像は有界ではありません。実際

$$
x^{(N)}=(\underbrace{1/N,\dots,1/N}_{N\text{ 個}},0,\dots)
$$

と置けば

$$
\|x^{(N)}\|_1=1,
\qquad
\|x^{(N)}\|_2=N^{-1/2}\to0.
$$

もし $I^{-1}:Y\to X$ が有界なら

$$
1=\|x^{(N)}\|_1
\le C\|x^{(N)}\|_2
=\frac C{\sqrt N}
$$

となり、大きい $N$ で矛盾します。

$c_{00}$ はどちらのノルムでも完備ではありません。従ってこの例は Banach 性を落とすと本章の結論が壊れ得ることを示します。

さらに $I$ は開写像でもありません。もし $I(B_X(0,1))$ が $Y$ の 0 近傍を含むなら、ある $\delta>0$ が

$$
B_Y(0,\delta)\subset I(B_X(0,1))
$$

を満たします。しかし十分大きい $N$ に対し

$$
z^{(N)}
=
\left(\underbrace{\frac{\delta}{2\sqrt N},\dots,\frac{\delta}{2\sqrt N}}_{N\text{ 個}},0,\dots\right)
$$

とすれば

$$
\|z^{(N)}\|_2=\frac\delta2<\delta,
$$

一方

$$
\|z^{(N)}\|_1=\frac{\delta\sqrt N}{2}>1
$$

となるので矛盾します。

### 10.2 閉作用素でも定義域が全空間でなければ有界とは限らない

$X=Y=C([0,1])$ に sup ノルムを入れ、

$$
D(D)=C^1([0,1])\subset X,
\qquad
Df=f'
$$

とします。$D$ は $D(D)$ 上の線形作用素ですが、sup ノルムについて有界ではありません。例えば

$$
f_n(t)=\frac{\sin(nt)}n
$$

なら

$$
\|f_n\|_\infty\le\frac1n\to0,
\qquad
\|Df_n\|_\infty=\|\cos(nt)\|_\infty=1.
$$

それでもグラフは $C([0,1])\times C([0,1])$ で閉です。実際 $f_n\to f$、$f_n'\to g$ がともに一様収束すると、各 $t$ について

$$
f_n(t)-f_n(0)=\int_0^t f_n'(s)\,ds.
$$

一様収束を使って極限を取れば

$$
f(t)-f(0)=\int_0^t g(s)\,ds.
$$

右辺は $C^1$ で導関数が $g$ なので $f\in C^1([0,1])$ かつ $f'=g$ です。

これは[閉グラフ定理](#thm-fa2-closed-graph)と矛盾しません。定義域が Banach 空間 $X=C([0,1])$ の全体ではなく、真部分空間 $C^1([0,1])$ だからです。グラフノルムを入れれば $C^1$ は完備になり、微分作用素も

$$
\|Df\|_\infty\le\|f\|_D
$$

と有界になります。

---

## 11. 三定理の役割分担

本章の論理を圧縮すると次のようになります。

```text
全射 + bounded + Banach/Banach
  ↓ Baire + closure→image の逐次近似
open

全単射 + bounded + Banach/Banach
  ↓ 上の open 性
inverse bounded

full domain + closed graph + Banach/Banach
  ↓ graph を Banach にし第一射影へ inverse bounded を適用
bounded
```

三つの結論は似ていますが、仮定の役割は異なります。

- 全射性：値域を可算個の像の閉包で覆うために使う。
- $Y$ の完備性：Baire により閉包の一つへ内部を作る。
- $X$ の完備性：逐次補正の級数を $X$ 内で収束させる。
- 全単射性：逆写像を写像として定義する。
- グラフ閉性：$G(T)$ 自身を Banach にする。
- 全定義性：$G(T)\to X$ の第一射影を全射にする。

この「どの仮定をどこで使ったか」を崩さないことが、後続のスペクトル論や閉作用素を読むときにも重要です。

---

# 演習

## A問題

### FA2-A01 球包含から開写像性

- Level: A
- 目安時間: 10分

線形写像 $T:X\to Y$ について、ある $c>0$ が

$$
B_Y(0,c)\subset T(B_X(0,1))
$$

を満たすとする。任意の $x_0\in X,r>0$ について

$$
B_Y(Tx_0,cr)
\subset
T(B_X(x_0,r))
$$

を示し、$T$ が開写像であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

$y\in B_Y(Tx_0,cr)$ とする。すると

$$
\left\|\frac{y-Tx_0}{r}\right\|<c.
$$

仮定からある $u\in B_X(0,1)$ が存在して

$$
Tu=\frac{y-Tx_0}{r}.
$$

$x=x_0+ru$ と置けば

$$
\|x-x_0\|=r\|u\|<r
$$

だから $x\in B_X(x_0,r)$ で、

$$
Tx=Tx_0+rTu=y.
$$

よって所望の球包含を得る。開集合 $U$ と $x_0\in U$ に対し $B_X(x_0,r)\subset U$ となる $r>0$ を取れば、$T(U)$ は $Tx_0$ のまわりに上の球を含む。したがって $T(U)$ は開である。
<!-- solution-end -->

### FA2-A02 逆作用素のノルム評価

- Level: A
- 目安時間: 10分

$T:X\to Y$ を全単射線形写像とし、

$$
B_Y(0,c)\subset T(B_X(0,1))
$$

とする。$\|T^{-1}\|\le1/c$ を示せ。

<!-- solution-start -->
#### 詳細解答

$0\ne y\in Y$ とし、$0<a<c/\|y\|$ を取る。$ay\in B_Y(0,c)$ だから、ある $u\in B_X(0,1)$ が $Tu=ay$ を満たす。全単射性から

$$
u=T^{-1}(ay)=aT^{-1}y.
$$

従って

$$
\|T^{-1}y\|<\frac1a.
$$

$a\uparrow c/\|y\|$ として

$$
\|T^{-1}y\|\le\frac1c\|y\|.
$$

$y=0$ も自明なので作用素ノルム評価が従う。
<!-- solution-end -->

### FA2-A03 有界作用素のグラフ

- Level: A
- 目安時間: 10分

$T:X\to Y$ が有界線形作用素なら $G(T)$ が閉であることを、点列を用いて示せ。

<!-- solution-start -->
#### 詳細解答

$(x_n,Tx_n)\in G(T)$ が $(x,y)\in X\times Y$ に収束したとする。すると $x_n\to x$ かつ $Tx_n\to y$。有界性から

$$
\|Tx_n-Tx\|\le\|T\|\|x_n-x\|\to0,
$$

よって $Tx_n\to Tx$。極限の一意性から $y=Tx$ であり $(x,y)=(x,Tx)\in G(T)$。従ってグラフは閉である。
<!-- solution-end -->

### FA2-A04 商空間で核を潰す

- Level: A
- 目安時間: 15分

$T:X\to Y$ を全射有界線形作用素とする。

$$
\widetilde T:X/\ker T\to Y,
\qquad
\widetilde T(x+\ker T)=Tx
$$

が well-defined な全単射有界線形作用素であり、$\|\widetilde T\|\le\|T\|$ を示せ。

<!-- solution-start -->
#### 詳細解答

$x+\ker T=x'+\ker T$ なら $x-x'\in\ker T$ なので $Tx=Tx'$、従って well-defined。線形性は商空間の演算から直ちに従う。$T$ が全射なので $\widetilde T$ も全射。$\widetilde T(x+\ker T)=0$ なら $x\in\ker T$ なので剰余類は 0、従って単射。

任意の $k\in\ker T$ に対し

$$
\|\widetilde T(x+\ker T)\|
=\|T(x-k)\|
\le\|T\|\|x-k\|.
$$

$k$ について infimum を取ると

$$
\|\widetilde T(x+\ker T)\|
\le\|T\|\|x+\ker T\|,
$$

よって $\|\widetilde T\|\le\|T\|$。
<!-- solution-end -->

## B問題

### FA2-B01 開写像性の定量的同値条件

- Level: B
- 目安時間: 20分

全射線形写像 $T:X\to Y$ について次が同値であることを示せ。

1. $T$ は開写像である。
2. ある $c>0$ が存在して $B_Y(0,c)\subset T(B_X(0,1))$。
3. ある $C>0$ が存在し、任意の $y\in Y$ と $\varepsilon>0$ に対して $Tx=y$ かつ $\|x\|<C\|y\|+\varepsilon$ となる $x$ が存在する。

<!-- solution-start -->
#### 詳細解答

$1\Rightarrow2$：$T(B_X(0,1))$ は 0 を含む開集合なので、ある $c>0$ に対して $B_Y(0,c)$ を含む。

$2\Rightarrow3$：$y=0$ は $x=0$。$y\ne0$ なら $0<a<c/\|y\|$ を $1/a<C\|y\|+\varepsilon$ となるほど $c/\|y\|$ に近く取る。ただし $C=1/c$ とすればよい。$ay\in B_Y(0,c)$ なので $Tu=ay$、$\|u\|<1$ となる $u$ があり、$x=u/a$ とすればよい。

$3\Rightarrow2$：$C>0$ を仮定の定数とし、$c=1/(2C)$ とする（$C=0$ なら全射性から $Y=\{0\}$ で自明）。$\|y\|<c$ に対し $\varepsilon=1/2$ とすると、ある $x$ が $Tx=y$ かつ

$$
\|x\|<C\|y\|+\frac12<1
$$

を満たす。よって $B_Y(0,c)\subset T(B_X(0,1))$。

$2\Rightarrow1$ は A01 で示した。従って三条件は同値。
<!-- solution-end -->

### FA2-B02 非完備反例を球で検証する

- Level: B
- 目安時間: 20分

$$
I:(c_{00},\|\cdot\|_1)\to(c_{00},\|\cdot\|_2),\qquad Ix=x
$$

について、(i) $I$ は全単射有界、(ii) $I^{-1}$ は非有界、(iii) $I$ は開写像でない、を全て示せ。

<!-- solution-start -->
#### 詳細解答

(i) 同じ集合上の恒等写像なので全単射。有限列について

$$
\|x\|_2\le\|x\|_1
$$

だから $\|I\|\le1$。

(ii)

$$
x^{(N)}=(1/N,\dots,1/N,0,\dots)
$$

を $N$ 個の非零成分で定めると

$$
\|x^{(N)}\|_1=1,
\qquad
\|x^{(N)}\|_2=N^{-1/2}.
$$

$\|I^{-1}y\|_1\le C\|y\|_2$ が成り立つなら $1\le C/\sqrt N$ となり矛盾。

(iii) もし開なら B01 よりある $\delta>0$ が $B_2(0,\delta)\subset I(B_1(0,1))$ を満たす。十分大きい $N$ に対し各非零成分を $\delta/(2\sqrt N)$ とした $z^{(N)}$ を取ると

$$
\|z^{(N)}\|_2=\delta/2<\delta,
\qquad
\|z^{(N)}\|_1=\delta\sqrt N/2>1,
$$

で矛盾。
<!-- solution-end -->

### FA2-B03 グラフノルムの完備性

- Level: B
- 目安時間: 25分

$X,Y$ を Banach 空間、$T:X\to Y$ を線形写像とする。$G(T)$ が閉であることと $(X,\|\cdot\|_T)$ が Banach であることが同値であることを、等長写像 $Jx=(x,Tx)$ を使わず直接証明せよ。

<!-- solution-start -->
#### 詳細解答

まず $G(T)$ が閉とする。$(x_n)$ がグラフノルムで Cauchy なら

$$
\|x_n-x_m\|\to0,
\qquad
\|Tx_n-Tx_m\|\to0.
$$

$X,Y$ の完備性から $x_n\to x\in X$、$Tx_n\to y\in Y$。従って $(x_n,Tx_n)\to(x,y)$。グラフが閉なので $y=Tx$。よって

$$
\|x_n-x\|_T
=
\|x_n-x\|+\|Tx_n-Tx\|\to0,
$$

したがってグラフノルムで完備。

逆に $(X,\|\cdot\|_T)$ が Banach とする。$(x_n,Tx_n)\to(x,y)$ なら $(x_n)$ はグラフノルムで Cauchy。完備性からある $z$ へグラフノルム収束するので $x_n\to z$、$Tx_n\to Tz$。一方 $x_n\to x$、$Tx_n\to y$ だから $z=x,y=Tz=Tx$。従って $(x,y)\in G(T)$ でグラフは閉。
<!-- solution-end -->

## C問題

### FA2-C01 閉じているが有界でない微分作用素

- Level: C
- 目安時間: 40分

$X=Y=C([0,1])$ に sup ノルムを入れ、

$$
D(D)=C^1([0,1]),
\qquad
Df=f'
$$

とする。

1. $D$ が $D(D)$ 上で有界でないことを示せ。
2. グラフ $G(D)\subset X\times Y$ は閉であることを示せ。
3. なぜこれは閉グラフに関する本章の定理と矛盾しないか説明せよ。
4. $D(D)$ にグラフノルムを入れると Banach になり、$D$ が有界になることを示せ。

<!-- solution-start -->
#### 詳細解答

1. $f_n(t)=\sin(nt)/n$ と置くと
   $$
   \|f_n\|_\infty\le1/n,
   \qquad
   \|Df_n\|_\infty=1.
   $$
   もし $D$ が sup ノルムについて有界なら $1\le C/n$ となり矛盾する。

2. $f_n\to f$、$f_n'\to g$ が一様収束したとする。微積分学の基本定理から
   $$
   f_n(t)-f_n(0)=\int_0^t f_n'(s)\,ds.
   $$
   左辺は $f(t)-f(0)$ に収束する。右辺は
   $$
   \left|\int_0^t(f_n'(s)-g(s))\,ds\right|
   \le\|f_n'-g\|_\infty
   $$
   により $\int_0^t g(s)ds$ へ一様収束する。従って
   $$
   f(t)=f(0)+\int_0^t g(s)ds,
   $$
   したがって $f\in C^1$ かつ $f'=g$。よって $(f,g)\in G(D)$ でグラフは閉。

3. 定義域は $X=C([0,1])$ 全体ではなく $C^1([0,1])$ である。本章の定理では「Banach 空間 $X$ の全てで定義された線形写像」が必要であり、その仮定が欠けている。実際 sup ノルムを入れた $C^1([0,1])$ は完備でもない。

4. グラフノルムは
   $$
   \|f\|_D=\|f\|_\infty+\|f'\|_\infty.
   $$
   このノルムで Cauchy な $(f_n)$ は $f_n$ と $f_n'$ がそれぞれ sup ノルムで Cauchy なので、$C([0,1])$ の完備性から $f_n\to f$、$f_n'\to g$。2 の議論により $f\in C^1$、$f'=g$ だから $\|f_n-f\|_D\to0$。従って完備。また定義から
   $$
   \|Df\|_\infty\le\|f\|_D,
   $$
   なので $D$ は作用素ノルム高々 1 の有界作用素になる。
<!-- solution-end -->

---

## まとめ

- 全射有界線形作用素について、値域の Banach 性は Baire により **像の閉包** に 0 近傍を作る。
- 定義域の Banach 性は幾何級数型の補正列を収束させ、閉包内の球を **実際の像** の球へ押し上げる。
- その球包含が開写像性の定量的な中身である。
- 全単射なら開写像性から逆写像の連続性・有界性が従う。
- 全射作用素は $X/\ker T$ 上の全単射へ降ろすと、原像の大きさを商ノルムで定量化できる。
- 閉グラフを持つ全定義線形作用素は、グラフを Banach 空間にして第一射影へ逆写像の結果を適用することで有界になる。
- 非完備な $c_{00}$ と、全定義でない微分作用素が、それぞれ仮定を外したときの破綻を具体化する。
