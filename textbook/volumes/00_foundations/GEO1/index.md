# GEO1 多様体の局所座標・アトラス・滑らかさ

Euclid 空間では、点の近くを一つの座標系で表せます。しかし球面や円の積のような空間全体を、座標表示を破綻させずに一枚の Euclid 座標で覆うことはできません。

そこで発想を変えます。

> **空間全体を一枚の座標で表すのではなく、各点の近くを Euclid 空間の開集合で表し、座標どうしの重なりで変換が滑らかにつながることを要求する。**

これが本章で定式化する、多様体上の滑らかさの基本思想です。

本章では

$$
\text{位相多様体}
\longrightarrow
\text{座標近傍}
\longrightarrow
\text{滑らかなアトラス}
\longrightarrow
\text{滑らかな構造}
\longrightarrow
\text{滑らかな写像}
$$

という順に進みます。接ベクトルや微分はまだ使いません。それらは次章 GEO2 で、ここで作る座標不変な滑らかさを土台に導入します。

位相側では [Hausdorff 性](../TOP4/index.md#def-top4-t2) と [第二可算性](../TOP4/index.md#def-top4-second-countable)、解析側では [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function) までを既知とします。

<!-- definition-example-audit: strict -->

---

## 1. 各点の近くが Euclid 空間に見える位相空間

<a id="def-geo1-topological-manifold"></a>
<!-- formal-statement-start -->
> **定義（位相多様体）**  
> $n\ge 0$ とする。位相空間 $M$ が **$n$ 次元位相多様体**であるとは、次の三条件を満たすことをいう。
>
> 1. $M$ は Hausdorff 空間である。
> 2. $M$ は第二可算である。
> 3. 任意の $p\in M$ に対し、$p$ の開近傍 $U\subseteq M$ と $\mathbb R^n$ の開集合 $\widetilde U$ が存在し、$U$ と $\widetilde U$ は同相である。
<!-- formal-statement-end -->

第三条件だけが「局所 Euclid 性」です。Hausdorff 性と第二可算性も定義に入れるのは、後で点の分離・可算な局所化・1 の分割などを一貫して使えるクラスに絞るためです。

<!-- definition-example-start: def-geo1-topological-manifold -->
**定義の確認**
### 例：$\mathbb R^n$ の開集合

$O\subseteq\mathbb R^n$ を開集合とします。

- $\mathbb R^n$ は距離空間なので Hausdorff であり、部分空間 $O$ も Hausdorff です。
- 有理数中心・有理数半径の開球全体は $\mathbb R^n$ の可算基底です。これを $O$ と交わらせれば $O$ の可算基底になるので、$O$ は第二可算です。
- 各 $p\in O$ について $U=O$ と取り、恒等写像 $O\to O$ を使えば局所 Euclid 性を満たします。

したがって $O$ は $n$ 次元位相多様体です。
<!-- definition-example-end -->

ここで「局所的に $\mathbb R^n$ と同じ」と「大域的に $\mathbb R^n$ と同じ」は全く別です。円 $S^1$ は各点の近くでは開区間に見えますが、円全体は実直線とは同相ではありません。

---

## 2. 点の近くに座標を入れる

<a id="def-geo1-chart"></a>
<!-- formal-statement-start -->
> **定義（座標近傍・座標写像）**  
> $M$ を $n$ 次元位相多様体とする。$U\subseteq M$ を開集合とし、
>
$$
\varphi:U\to\varphi(U)\subseteq\mathbb R^n
$$
>
> が $\mathbb R^n$ の開集合 $\varphi(U)$ への同相写像であるとき、組 $(U,\varphi)$ を **座標近傍**という。$\varphi$ を **座標写像**という。
>
$$
\varphi(p)=\bigl(x^1(p),\dots,x^n(p)\bigr)
$$
>
> と書くとき、$x^1,\dots,x^n$ をこの座標近傍の **局所座標**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-chart -->
**定義の確認**
### 例：極座標は局所座標にはなるが、平面全体の一枚座標ではない

$$
U=\mathbb R^2\setminus\{(x,0):x\le0\}
$$

とし、

$$
\varphi(x,y)
=
\left(
\frac12\log(x^2+y^2),
\operatorname{Arg}(x+iy)
\right)
$$

を考えます。主値偏角を $-\pi<\operatorname{Arg}<\pi$ とすれば、

$$
\varphi:U\to\mathbb R\times(-\pi,\pi)
$$

は同相写像です。従って $(U,\varphi)$ は座標近傍です。

原点を除くだけでは偏角を一価連続に取れません。座標近傍は「式が書ける領域」ではなく、**開集合への同相写像が実際に存在する領域**です。
<!-- definition-example-end -->

<a id="def-geo1-atlas"></a>
<!-- formal-statement-start -->
> **定義（アトラス）**  
> $M$ を $n$ 次元位相多様体とする。座標近傍の族
>
$$
\mathcal A=\{(U_\alpha,\varphi_\alpha)\}_{\alpha\in A}
$$
>
> が
>
$$
M=\bigcup_{\alpha\in A}U_\alpha
$$
>
> を満たすとき、$\mathcal A$ を $M$ の **アトラス**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-atlas -->
**定義の確認**
### 例：円を二枚の座標近傍で覆う

$$
S^1=\{(x,y)\in\mathbb R^2:x^2+y^2=1\}
$$

とし、北極 $N=(0,1)$、南極 $S=(0,-1)$ を除く二つの開集合

$$
U_N=S^1\setminus\{N\},
\qquad
U_S=S^1\setminus\{S\}
$$

を取ります。後で詳しく扱う立体射影によって、それぞれ $\mathbb R$ と同相になります。

しかも

$$
U_N\cup U_S=S^1
$$

なので、この二枚は $S^1$ のアトラスを与えます。
<!-- definition-example-end -->

---

## 3. 座標変換が滑らかにつながるとは何か

二つの座標近傍 $(U,\varphi)$、$(V,\psi)$ が重なると、同じ点を二種類の Euclid 座標で表せます。重なり $U\cap V$ 上では

$$
\psi\circ\varphi^{-1}
:
\varphi(U\cap V)
\to
\psi(U\cap V)
$$

という座標変換が現れます。

$U\cap V$ は $M$ で開であり、$\varphi,\psi$ は同相写像なので、定義域・値域はどちらも $\mathbb R^n$ の開集合です。従って通常の多変数微分の意味で「滑らか」を問えます。

<a id="def-geo1-compatible-charts"></a>
<!-- formal-statement-start -->
> **定義（滑らかに両立する座標近傍）**  
> 同じ $n$ 次元位相多様体 $M$ の座標近傍 $(U,\varphi)$、$(V,\psi)$ が **滑らかに両立する**とは、
>
> - $U\cap V=\varnothing$ である、または
> - 座標変換
>
$$
\psi\circ\varphi^{-1}
:
\varphi(U\cap V)\to\psi(U\cap V)
$$
>
> とその逆写像がともに $C^\infty$ 級である
>
> ことをいう。
<!-- formal-statement-end -->

逆向きの座標変換は

$$
\varphi\circ\psi^{-1}
=
(\psi\circ\varphi^{-1})^{-1}
$$

です。「一方向が $C^\infty$ なら十分」とは限りません。

<!-- definition-example-start: def-geo1-compatible-charts -->
**定義の確認**
### 例：線形座標変換は両立する

$\mathbb R^n$ 上で

$$
\varphi(x)=x,
\qquad
\psi(x)=Ax+b
$$

とし、$A$ を可逆行列とします。座標変換は

$$
\psi\circ\varphi^{-1}(x)=Ax+b
$$

で、逆向きの写像は

$$
x\longmapsto A^{-1}(x-b)
$$

です。どちらも $C^\infty$ 級なので二つの座標近傍は滑らかに両立します。
<!-- definition-example-end -->

### 反例：$x^3$ は「滑らかな全単射」だが座標変換としては不十分

$\mathbb R$ 上で

$$
\varphi(x)=x,
\qquad
\psi(x)=x^3
$$

を考えます。$\psi\circ\varphi^{-1}(x)=x^3$ は $C^\infty$ 級です。

しかし逆向きの写像は

$$
\varphi\circ\psi^{-1}(y)=y^{1/3}
$$

であり、$y=0$ で微分可能ではありません。従ってこの二つの座標近傍は滑らかに両立しません。

失われているのは「逆向きも滑らか」という条件です。これを落とすと、同じ点の近くで微分可能性の判定が座標の選び方によって変わってしまいます。

<a id="def-geo1-smooth-atlas"></a>
<!-- formal-statement-start -->
> **定義（滑らかなアトラス）**  
> アトラス $\mathcal A$ の任意の二つの座標近傍が滑らかに両立するとき、$\mathcal A$ を **滑らかなアトラス**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-smooth-atlas -->
**定義の確認**
### 例：$\mathbb R^n$ の標準アトラス

一枚だけからなる

$$
\mathcal A_{\mathrm{std}}
=
\{(\mathbb R^n,\operatorname{id})\}
$$

は $\mathbb R^n$ を覆います。一枚しかないので必要な座標変換は恒等写像だけであり、$C^\infty$ 級です。従ってこれは滑らかなアトラスです。
<!-- definition-example-end -->

---

## 4. アトラス同士の両立性は同値関係になる

個々の座標近傍についての「両立する」という関係は、一般には推移律を自動では持ちません。そこで「同じ滑らかさを表すか」を比較するときは、**滑らかなアトラス全体**を比較します。

<a id="def-geo1-compatible-atlases"></a>
<!-- formal-statement-start -->
> **定義（滑らかなアトラスの両立性）**  
> 同じ位相多様体 $M$ 上の二つの滑らかなアトラス $\mathcal A,\mathcal B$ が **両立する**とは、
>
$$
\mathcal A\cup\mathcal B
$$
>
> も滑らかなアトラスになることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-compatible-atlases -->
**定義の確認**
### 例：標準座標と可逆アフィン座標

$\mathbb R^n$ の標準一枚アトラス

$$
\mathcal A=\{(\mathbb R^n,\operatorname{id})\}
$$

と、可逆行列 $A$ を使った

$$
\mathcal B=\{(\mathbb R^n,x\mapsto Ax+b)\}
$$

を取ります。前節で両者の座標変換と逆向きの写像がともに滑らかであることを確認しました。従って $\mathcal A\cup\mathcal B$ は滑らかなアトラスであり、二つのアトラスは両立します。
<!-- definition-example-end -->

<a id="thm-geo1-atlas-compatibility-equivalence"></a>
<!-- formal-statement-start -->
> **定理（滑らかなアトラスの両立性は同値関係）**  
> 固定した位相多様体 $M$ 上の滑らかなアトラス全体に対し、
>
$$
\mathcal A\sim\mathcal B
\quad\Longleftrightarrow\quad
\mathcal A\cup\mathcal B
\text{ が滑らかなアトラス}
$$
>
> と定める。この関係は反射律・対称律・推移律を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

反射律と対称律は定義から直ちに出ます。推移律だけが本体です。

$\mathcal A$ の座標と $\mathcal C$ の座標が直接滑らかにつながることを示したいとき、各点の近くで $\mathcal B$ の座標を一枚挟みます。座標変換を二つの滑らかな座標変換の合成へ分解するのが核心です。

<!-- proof-start -->
### 証明

反射律について、$\mathcal A$ が滑らかなアトラスなら

$$
\mathcal A\cup\mathcal A=\mathcal A
$$

も滑らかなアトラスです。従って $\mathcal A\sim\mathcal A$ です。

対称律は

$$
\mathcal A\cup\mathcal B
=
\mathcal B\cup\mathcal A
$$

から従います。

推移律を示します。

$$
\mathcal A\sim\mathcal B,
\qquad
\mathcal B\sim\mathcal C
$$

と仮定します。$\mathcal A$ の座標近傍 $(U,\varphi)$ と $\mathcal C$ の座標近傍 $(W,\chi)$ を取り、$p\in U\cap W$ とします。

$\mathcal B$ は $M$ を覆うので、$p$ を含む $(V,\psi)\in\mathcal B$ が存在します。すると $p$ の近くの

$$
U\cap V\cap W
$$

上で、$\varphi$ 座標から $\chi$ 座標への変換は

$$
\chi\circ\varphi^{-1}
=
(\chi\circ\psi^{-1})
\circ
(\psi\circ\varphi^{-1})
$$

と因子分解できます。

$\mathcal A\sim\mathcal B$ より $\psi\circ\varphi^{-1}$ とその逆は滑らかです。また $\mathcal B\sim\mathcal C$ より $\chi\circ\psi^{-1}$ とその逆も滑らかです。従って合成 $\chi\circ\varphi^{-1}$ とその逆は $p$ の近くで滑らかです。

$p$ は $U\cap W$ の任意の点でした。Euclid 空間上の滑らかさは局所的な性質なので、$\chi\circ\varphi^{-1}$ は定義域全体で滑らかです。逆向きの写像も同様です。

従って $\mathcal A$ の任意の座標近傍と $\mathcal C$ の任意の座標近傍が滑らかに両立し、

$$
\mathcal A\cup\mathcal C
$$

は滑らかなアトラスです。よって $\mathcal A\sim\mathcal C$ です。$\square$
<!-- proof-end -->

この定理のおかげで、「どの滑らかなアトラスを最初に選んだか」ではなく、そのアトラスと両立する座標すべてを一つにまとめる準備が整います。

---

## 5. アトラスを極大化する

<a id="def-geo1-maximal-smooth-atlas"></a>
<!-- formal-statement-start -->
> **定義（極大滑らかアトラス）**  
> 滑らかなアトラス $\mathcal A$ が **極大**であるとは、$\mathcal A$ の全ての座標近傍と滑らかに両立する任意の座標近傍 $(U,\varphi)$ が、すでに $\mathcal A$ に属することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-maximal-smooth-atlas -->
**定義の確認**
### 例：標準一枚アトラスそのものは極大ではない

$\mathbb R^n$ の

$$
\{(\mathbb R^n,\operatorname{id})\}
$$

は滑らかなアトラスですが、一般には極大ではありません。

たとえば可逆アフィン写像

$$
\psi(x)=Ax+b
$$

による座標近傍 $(\mathbb R^n,\psi)$ は標準座標と滑らかに両立します。それでも一枚アトラスには含まれていません。

極大化とは「新しい幾何を足す」ことではなく、**同じ滑らかさを表す全ての許される座標を最初からまとめること**です。
<!-- definition-example-end -->

<a id="thm-geo1-maximal-atlas-extension"></a>
<!-- formal-statement-start -->
> **定理（滑らかなアトラスからの極大化）**  
> $M$ 上の任意の滑らかなアトラス $\mathcal A$ に対し、$\mathcal A$ を含む極大滑らかアトラス $\mathcal A_{\max}$ が一意に存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal A$ の各座標近傍と滑らかに両立する座標近傍を全て集めて

$$
\mathcal A_{\max}
=
\{
(U,\varphi):
(U,\varphi)
\text{ は }\mathcal A\text{ の全ての座標近傍と両立する}
\}
$$

と定めます。

まず $\mathcal A\subseteq\mathcal A_{\max}$ です。実際、$\mathcal A$ 自身が滑らかなアトラスなので、その各座標近傍は $\mathcal A$ の全ての座標近傍と両立します。従って $\mathcal A_{\max}$ は $M$ を覆います。

次に $\mathcal A_{\max}$ の任意の二つ

$$
(U,\varphi),
\qquad
(W,\chi)
$$

が両立することを示します。$p\in U\cap W$ を取ります。$\mathcal A$ は $M$ を覆うので、$p$ を含む $(V,\psi)\in\mathcal A$ を選べます。

定義から $(U,\varphi)$ と $(V,\psi)$ は両立し、$(V,\psi)$ と $(W,\chi)$ も両立します。前定理の推移律の証明と同じ局所因子分解

$$
\chi\circ\varphi^{-1}
=
(\chi\circ\psi^{-1})
\circ
(\psi\circ\varphi^{-1})
$$

により、$(U,\varphi)$ と $(W,\chi)$ は両立します。従って $\mathcal A_{\max}$ は滑らかなアトラスです。

さらに、$\mathcal A_{\max}$ の全ての座標近傍と両立する座標近傍 $(Z,\zeta)$ を取ると、特に $\mathcal A\subseteq\mathcal A_{\max}$ の全ての座標近傍と両立します。従って定義から

$$
(Z,\zeta)\in\mathcal A_{\max}.
$$

よって $\mathcal A_{\max}$ は極大です。

最後に一意性を示します。$\mathcal A$ を含む極大滑らかアトラス $\mathcal M$ があったとします。$\mathcal M$ の各座標近傍は $\mathcal A$ と両立するので

$$
\mathcal M\subseteq\mathcal A_{\max}.
$$

逆に $\mathcal A_{\max}$ の各座標近傍は $\mathcal A$ と両立します。$\mathcal A\subseteq\mathcal M$ であり、前定理の推移律を各点で使えば、その座標近傍は $\mathcal M$ の全ての座標近傍とも両立します。$\mathcal M$ の極大性から

$$
\mathcal A_{\max}\subseteq\mathcal M.
$$

従って $\mathcal A_{\max}=\mathcal M$ です。$\square$
<!-- proof-end -->

<a id="def-geo1-smooth-structure"></a>
<!-- formal-statement-start -->
> **定義（滑らかな構造・滑らかな多様体）**  
> 位相多様体 $M$ 上の極大滑らかアトラスを **滑らかな構造**という。
>
> 滑らかな構造を一つ指定した位相多様体を **滑らかな多様体**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-smooth-structure -->
**定義の確認**
### 例：Euclid 空間の標準滑らかな構造

$\mathbb R^n$ の標準一枚アトラス

$$
\{(\mathbb R^n,\operatorname{id})\}
$$

を前定理で極大化して得られる滑らかな構造を、$\mathbb R^n$ の標準滑らかな構造と呼びます。

従って、標準構造に属する座標近傍 $(U,\varphi)$ とは、局所的に

$$
\varphi:U\to\varphi(U)
$$

と $\varphi^{-1}$ が通常の意味で $C^\infty$ 級になる座標です。
<!-- definition-example-end -->

以後、滑らかな多様体と書いたときは、その極大滑らかアトラスが固定されているものとします。

---

## 6. 球面 $S^n$：一枚で無理なら二枚で覆う

$$
S^n
=
\{
(x_1,\dots,x_{n+1})\in\mathbb R^{n+1}:
x_1^2+\cdots+x_{n+1}^2=1
\}
$$

とします。

北極と南極を

$$
N=(0,\dots,0,1),
\qquad
S=(0,\dots,0,-1)
$$

と置き、

$$
U_N=S^n\setminus\{N\},
\qquad
U_S=S^n\setminus\{S\}
$$

を取ります。

立体射影を

$$
\varphi_N(x)
=
\frac{(x_1,\dots,x_n)}{1-x_{n+1}},
$$

$$
\varphi_S(x)
=
\frac{(x_1,\dots,x_n)}{1+x_{n+1}}
$$

と定めます。それぞれ $\mathbb R^n$ への同相写像で、逆写像は

$$
\varphi_N^{-1}(y)
=
\left(
\frac{2y}{1+\|y\|^2},
\frac{\|y\|^2-1}{1+\|y\|^2}
\right),
$$

$$
\varphi_S^{-1}(y)
=
\left(
\frac{2y}{1+\|y\|^2},
\frac{1-\|y\|^2}{1+\|y\|^2}
\right)
$$

です。

重なり $U_N\cap U_S$ は両極を除いた球面であり、$\varphi_N$ 座標では $y\ne0$ に対応します。直接代入すると

$$
(\varphi_S\circ\varphi_N^{-1})(y)
=
\frac{y}{\|y\|^2},
\qquad
y\in\mathbb R^n\setminus\{0\}.
$$

この写像は自分自身が逆写像であり、$\mathbb R^n\setminus\{0\}$ 上で $C^\infty$ 級です。

<a id="prop-geo1-sphere-smooth"></a>
<!-- formal-statement-start -->
> **命題（球面の標準滑らかな構造）**  
> $S^n$ は部分空間位相により Hausdorff かつ第二可算な $n$ 次元位相多様体であり、
>
$$
\{(U_N,\varphi_N),(U_S,\varphi_S)\}
$$
>
> は滑らかなアトラスをなす。従ってその極大化により $S^n$ は $n$ 次元滑らかな多様体になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$S^n$ は距離空間 $\mathbb R^{n+1}$ の部分空間なので Hausdorff です。また $\mathbb R^{n+1}$ の可算基底を $S^n$ と交わらせれば可算基底が得られるので第二可算です。

上で $\varphi_N,\varphi_S$ が $\mathbb R^n$ への同相写像であることを逆写像まで明示しました。従って各点は Euclid 開集合への座標近傍を持ち、$S^n$ は $n$ 次元位相多様体です。

二枚は $S^n$ を覆い、重なりの座標変換と逆向きの写像は

$$
y\longmapsto\frac{y}{\|y\|^2}
$$

で、$y\ne0$ 上で滑らかです。従って二枚は滑らかなアトラスです。[滑らかなアトラスからの極大化](#thm-geo1-maximal-atlas-extension)により標準滑らかな構造が定まります。$\square$
<!-- proof-end -->

$S^1$ は $n=1$ の場合です。従って円は「例外的な図形」ではなく、球面族の最初の非自明な滑らかな多様体です。

---

## 7. 実射影空間 $\mathbb{RP}^n$

球面上で反対側の点を同一視します。

$$
x\sim -x
$$

とし、

$$
\mathbb{RP}^n=S^n/{\sim}
$$

に商位相を入れます。商写像を

$$
q:S^n\to\mathbb{RP}^n
$$

と書きます。同値類 $q(x)$ は $[x]$ と書きます。また任意の非零ベクトル $v\in\mathbb R^{n+1}\setminus\{0\}$ に対して

$$
[v]
:=
q\left(\frac{v}{\|v\|}\right)
$$

と書けば、任意の $\lambda\ne0$ について $[\lambda v]=[v]$ です。したがって $[x_0:\cdots:x_n]$ という通常の同次座標記法を、球面の反対点商と矛盾なく使えます。

### 7.1 Hausdorff 性と第二可算性

まず $q$ が開集合を開集合へ送ることを示します。$O\subseteq S^n$ が開なら

$$
q^{-1}(q(O))
=
O\cup(-O)
$$

は開です。商位相の定義から $q(O)$ は開になります。

$S^n$ の可算基底を $\{B_k\}_{k\ge1}$ とすると、$\{q(B_k)\}_{k\ge1}$ は $\mathbb{RP}^n$ の可算基底になります。従って $\mathbb{RP}^n$ は第二可算です。

Hausdorff 性も確認します。$[x]\ne[y]$ なら有限集合

$$
\{x,-x\},
\qquad
\{y,-y\}
$$

は互いに素です。球面の距離で

$$
\delta
=
\min_{\varepsilon,\eta\in\{-1,1\}}
\|\varepsilon x-\eta y\|
>0
$$

と置きます。$\{x,-x\}$ の各点の半径 $\delta/3$ の球の和と、$\{y,-y\}$ の各点の半径 $\delta/3$ の球の和は互いに交わりません。しかもそれぞれ反転 $z\mapsto-z$ で不変な開集合です。

その像は $[x]$ と $[y]$ の開近傍です。しかも二つの元の開集合は反転 $z\mapsto-z$ で不変、すなわち同値類ごとに飽和しています。もし二つの像が交われば、同じ同値類の代表を両方の開集合に取れるため、反転不変性から元の二つの開集合自身が交わってしまいます。これは構成に反します。

従って二つの像は互いに素であり、$\mathbb{RP}^n$ は Hausdorff です。

### 7.2 射影座標

$i=0,\dots,n$ に対して

$$
U_i
=
\{
[x_0:\cdots:x_n]\in\mathbb{RP}^n:
x_i\ne0
\}
$$

と置きます。ここでは同じ直線を表す非零スカラー倍を同じ記号 $[x_0:\cdots:x_n]$ で表しています。

座標写像

$$
\varphi_i:U_i\to\mathbb R^n
$$

を

$$
\varphi_i([x_0:\cdots:x_n])
=
\left(
\frac{x_0}{x_i},
\dots,
\widehat{\frac{x_i}{x_i}},
\dots,
\frac{x_n}{x_i}
\right)
$$

で定めます。帽子はその成分を除くことを表します。

非零スカラー倍をしても比は変わらないので良定義です。

連続性も確認します。$q^{-1}(U_i)$ 上の写像

$$
x\longmapsto
\left(
\frac{x_0}{x_i},
\dots,
\widehat{\frac{x_i}{x_i}},
\dots,
\frac{x_n}{x_i}
\right)
$$

は連続で、$x$ と $-x$ に同じ値を取ります。[商写像の普遍性](../TOP1/index.md#thm-top1-quotient-universal)により、この写像は一意な連続写像 $\varphi_i:U_i\to\mathbb R^n$ へ降下します。

逆写像は、$i$ 番目の成分を $1$ にして作ったベクトル $v(u)$ に対して

$$
u\longmapsto
q\left(
\frac{v(u)}{\|v(u)\|}
\right)
$$

です。正規化 $u\mapsto v(u)/\|v(u)\|$ と商写像 $q$ は連続なので、この逆写像も連続です。従って $\varphi_i$ は同相写像です。

二つの座標 $U_i,U_j$ が重なるところでは、$j$ 番目に対応する座標成分が非零であり、座標変換は各成分をその非零成分で割る有理式になります。分母が0にならない開集合上なので滑らかで、逆向きの写像も同じ形です。

<a id="prop-geo1-projective-space-smooth"></a>
<!-- formal-statement-start -->
> **命題（実射影空間の標準滑らかな構造）**  
> $\mathbb{RP}^n$ は $n$ 次元位相多様体であり、
>
$$
\{(U_i,\varphi_i):0\le i\le n\}
$$
>
> は滑らかなアトラスをなす。従って $\mathbb{RP}^n$ は標準的な $n$ 次元滑らかな多様体になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節で Hausdorff 性と第二可算性を確認しました。

$U_i$ は $q(\{x\in S^n:x_i\ne0\})$ であり、$q$ が開集合を開集合へ送るので開です。$\varphi_i$ は $\mathbb R^n$ への同相写像であり、$U_i$ は全体を覆います。従って $\mathbb{RP}^n$ は $n$ 次元位相多様体です。

重なりの座標変換は、非零な一つの座標で各成分を割る有理式です。分母が0でない領域では $C^\infty$ 級で、逆向きの写像も同じ形です。従って全ての座標近傍は滑らかに両立し、滑らかなアトラスをなします。極大化により標準滑らかな構造が定まります。$\square$
<!-- proof-end -->

---

## 8. 積から新しい多様体を作る

<a id="thm-geo1-product-manifold"></a>
<!-- formal-statement-start -->
> **定理（積多様体の滑らかな構造）**  
> $M$ を $m$ 次元滑らかな多様体、$N$ を $n$ 次元滑らかな多様体とする。積位相を入れた $M\times N$ は $m+n$ 次元位相多様体である。
>
> $M,N$ の座標近傍
>
$$
(U,\varphi),
\qquad
(V,\psi)
$$
>
> に対し
>
$$
(U\times V,\varphi\times\psi),
\qquad
(\varphi\times\psi)(p,q)
=
(\varphi(p),\psi(q))
$$
>
> を取ると、これらは滑らかなアトラスをなし、$M\times N$ に自然な滑らかな構造を定める。
<!-- formal-statement-end -->

### 証明の見取り図

位相多様体であることは「Hausdorff」「第二可算」「局所 Euclid」を一つずつ確認します。滑らかさは、積座標の座標変換が各因子の座標変換の直積になることから従います。

<!-- proof-start -->
### 証明

$M,N$ は Hausdorff なので、異なる二点 $(p,q)\ne(p',q')$ があれば少なくとも一方の成分が異なります。その成分を互いに素な開近傍で分離し、もう一方には全空間を取れば、$M\times N$ も Hausdorff です。

$M$ の可算基底を $\{B_i\}$、$N$ の可算基底を $\{C_j\}$ とすると

$$
\{B_i\times C_j:i,j\ge1\}
$$

は可算な積位相の基底です。従って $M\times N$ は第二可算です。

$(p,q)\in M\times N$ を取ります。$p$ を含む座標近傍 $(U,\varphi)$ と $q$ を含む座標近傍 $(V,\psi)$ を選べば

$$
\varphi\times\psi
:
U\times V
\to
\varphi(U)\times\psi(V)
\subseteq
\mathbb R^{m+n}
$$

は同相写像です。右辺は開集合なので、$M\times N$ は局所 Euclid です。

最後に $(U,\varphi),(U',\varphi')$ と $(V,\psi),(V',\psi')$ を取り、積座標の重なりを考えます。座標変換は

$$
(\varphi'\times\psi')
\circ
(\varphi\times\psi)^{-1}(x,y)
=
\left(
(\varphi'\circ\varphi^{-1})(x),
(\psi'\circ\psi^{-1})(y)
\right)
$$

です。各成分は滑らかで逆向きの写像も滑らかなので、積座標どうしは滑らかに両立します。$\square$
<!-- proof-end -->

<a id="def-geo1-torus"></a>
<!-- formal-statement-start -->
> **定義（$n$ 次元トーラス）**  
> 標準滑らかな円 $S^1$ の $n$ 個の積
>
$$
T^n=(S^1)^n
$$
>
> に積多様体の滑らかな構造を入れたものを **$n$ 次元トーラス**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-torus -->
**定義の確認**
### 例：$T^2$ の積座標

$T^2=S^1\times S^1$ では、各円から北極座標または南極座標を一枚ずつ選ぶことで、最大4枚の積座標

$$
U_{\varepsilon_1}\times U_{\varepsilon_2}
\longrightarrow
\mathbb R^2,
\qquad
\varepsilon_1,\varepsilon_2\in\{N,S\}
$$

が得られます。前定理により、これらの重なりの座標変換は各円の

$$
t\longmapsto\frac1t
$$

型の座標変換を成分ごとに並べたものになり、分母が0でない領域で滑らかです。
<!-- definition-example-end -->

---

## 9. 多様体の間の写像を座標で調べる

<a id="def-geo1-smooth-map"></a>
<!-- formal-statement-start -->
> **定義（滑らかな写像）**  
> $M$ を $m$ 次元滑らかな多様体、$N$ を $n$ 次元滑らかな多様体とし、$f:M\to N$ を写像とする。
>
> 任意の $p\in M$ に対し、
>
> - $p\in U$ となる $M$ の座標近傍 $(U,\varphi)$、
> - $f(p)\in V$ となる $N$ の座標近傍 $(V,\psi)$
>
> を、必要なら $U$ を縮めて $f(U)\subseteq V$ となるように選べて、座標表示
>
$$
\psi\circ f\circ\varphi^{-1}
:
\varphi(U)\to\psi(V)
$$
>
> が $C^\infty$ 級であるとき、$f$ を **滑らかな写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-smooth-map -->
**定義の確認**
### 例：球面の高さ関数

$$
h:S^n\to\mathbb R,
\qquad
h(x_1,\dots,x_{n+1})=x_{n+1}
$$

を考えます。

北極を除く立体射影座標では

$$
(h\circ\varphi_N^{-1})(y)
=
\frac{\|y\|^2-1}{\|y\|^2+1},
$$

南極を除く座標では

$$
(h\circ\varphi_S^{-1})(y)
=
\frac{1-\|y\|^2}{\|y\|^2+1}.
$$

分母は常に正なので、どちらも $\mathbb R^n$ 上で $C^\infty$ 級です。二枚で球面を覆うので $h$ は滑らかです。
<!-- definition-example-end -->

ここで重大な疑問があります。

> 滑らかさを「座標表示」で定義したのに、座標を変えたら判定が変わらないのか。

次の定理が、その心配を消します。

<a id="thm-geo1-smoothness-chart-independence"></a>
<!-- formal-statement-start -->
> **定理（滑らかさの座標独立性）**  
> $f:M\to N$ と $p\in M$ を取る。
>
> ある $p$ 周りの座標 $(U,\varphi)$ と $f(p)$ 周りの座標 $(V,\psi)$ において
>
$$
\psi\circ f\circ\varphi^{-1}
$$
>
> が $p$ の近くで $C^\infty$ 級であるとする。
>
> このとき、任意の別の座標 $(U',\varphi')$ と $(V',\psi')$ を $p,f(p)$ の周りに取っても、十分小さい重なり上で
>
$$
\psi'\circ f\circ(\varphi')^{-1}
$$
>
> は $C^\infty$ 級である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

仮定で滑らかとされた座標表示を

$$
F=\psi\circ f\circ\varphi^{-1}
$$

と置きます。$F$ は滑らかなので連続です。従って

$$
f|_U
=
\psi^{-1}\circ F\circ\varphi
$$

も連続です。

別の座標 $(U',\varphi')$、$(V',\psi')$ を取ります。$f(p)\in V\cap V'$ で、$V\cap V'$ は $N$ の開集合です。そこで

$$
W
=
U\cap U'\cap (f|_U)^{-1}(V\cap V')
$$

と置くと、$W$ は $p$ を含む $M$ の開集合です。この $W$ へ制限すれば、以下の合成は全て定義されます。

$$
\psi'\circ f\circ(\varphi')^{-1}
=
(\psi'\circ\psi^{-1})
\circ
(\psi\circ f\circ\varphi^{-1})
\circ
(\varphi\circ(\varphi')^{-1}).
$$

中央は仮定により滑らかです。右端

$$
\varphi\circ(\varphi')^{-1}
$$

は $M$ の座標変換、左端

$$
\psi'\circ\psi^{-1}
$$

は $N$ の座標変換なので、滑らかな構造の定義からどちらも滑らかです。

従って右辺は滑らかな Euclid 写像の合成であり、$\psi'\circ f\circ(\varphi')^{-1}$ も $p$ の近くで滑らかです。$\square$
<!-- proof-end -->

この定理があるので、実際の計算では **最も楽な座標を一組選べばよい** と分かります。

<a id="prop-geo1-smooth-composition"></a>
<!-- formal-statement-start -->
> **命題（恒等写像と合成の滑らかさ）**  
> 任意の滑らかな多様体 $M$ について恒等写像 $\operatorname{id}_M$ は滑らかである。
>
> また
>
$$
M\xrightarrow{f}N\xrightarrow{g}P
$$
>
> が滑らかな写像なら、$g\circ f:M\to P$ も滑らかである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

恒等写像を同じ座標 $(U,\varphi)$ で前後から表せば

$$
\varphi\circ\operatorname{id}_M\circ\varphi^{-1}
=
\operatorname{id}_{\varphi(U)}
$$

なので滑らかです。

合成について、$p\in M$ の近くで $f$ と $g$ の座標表示がそれぞれ定義できるよう座標近傍を縮めます。すると

$$
\chi\circ(g\circ f)\circ\varphi^{-1}
=
(\chi\circ g\circ\psi^{-1})
\circ
(\psi\circ f\circ\varphi^{-1})
$$

です。右辺は Euclid 空間上の二つの滑らかな写像の合成なので滑らかです。$\square$
<!-- proof-end -->

---

## 10. 滑らかな全単射の逆も滑らかか

<a id="def-geo1-diffeomorphism"></a>
<!-- formal-statement-start -->
> **定義（微分同相写像）**  
> 滑らかな多様体 $M,N$ の間の写像
>
$$
f:M\to N
$$
>
> が
>
> 1. 全単射である。
> 2. $f$ が滑らかである。
> 3. 逆写像 $f^{-1}:N\to M$ も滑らかである。
>
> を満たすとき、$f$ を **微分同相写像**という。微分同相写像が存在するとき $M,N$ は **微分同相**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo1-diffeomorphism -->
**定義の確認**
### 例：可逆アフィン写像

$$
f:\mathbb R^n\to\mathbb R^n,
\qquad
f(x)=Ax+b
$$

で $A$ が可逆なら

$$
f^{-1}(y)=A^{-1}(y-b)
$$

です。標準座標でどちらも多項式型の写像なので滑らかです。従って $f$ は微分同相写像です。
<!-- definition-example-end -->

### 反例：滑らかな全単射でも微分同相とは限らない

$$
f:\mathbb R\to\mathbb R,
\qquad
f(x)=x^3
$$

は滑らかな全単射ですが

$$
f^{-1}(y)=y^{1/3}
$$

は $0$ で微分可能ではありません。

従って「滑らかな全単射」と「微分同相写像」は同じではありません。これは座標近傍の両立性で見た失敗と全く同じ機構です。

---

## 11. 位相的な同定に使うコンパクト → Hausdorff の道具

多様体の具体例では、ある商空間や貼り合わせ空間が既知の空間と同相であることを示したい場面が頻繁に出ます。

この位相的部分は GEO1 で再証明しません。TOP2 の

- [連続全単射の同相判定](../TOP2/index.md#thm-top2-compact-hausdorff-bijection)
- [コンパクト商空間の同定判定](../TOP2/index.md#thm-top2-compact-quotient-identification)

を使います。

たとえば

$$
F:[0,1]\to S^1,
\qquad
F(t)=(\cos 2\pi t,\sin 2\pi t)
$$

は $0$ と $1$ だけを同一視した商から円への同相写像を誘導します。

ここで重要なのは、

$$
\text{位相的に同じ}
\quad\text{と}\quad
\text{滑らかな構造まで同じ}
$$

は別の主張だということです。同相を得た後、滑らかな多様体として比較するには座標表示で写像と逆写像の滑らかさを確認する必要があります。

---

## 12. 演習

### GEO1-A01 開集合は滑らかな多様体

$O\subseteq\mathbb R^n$ を開集合とする。

1. $O$ が $n$ 次元位相多様体であることを示せ。
2. 一枚アトラス $\{(O,\operatorname{id})\}$ が滑らかなアトラスであることを示せ。
3. その極大化によって $O$ に標準滑らかな構造が入ることを説明せよ。

- Level: A
- 狙い: 位相多様体・滑らかなアトラス・極大化の定義確認

<!-- solution-start -->
**詳細解答**

1. $\mathbb R^n$ は Hausdorff なので、その部分空間 $O$ も Hausdorff です。

   $\mathbb R^n$ の可算基底 $\{B_k\}_{k\ge1}$ を取ると

   $$
   \{B_k\cap O:k\ge1\}
   $$

   は $O$ の可算基底です。従って $O$ は第二可算です。

   各 $p\in O$ について $U=O$ と取り、

   $$
   \operatorname{id}:O\to O\subseteq\mathbb R^n
   $$

   を使えば局所 Euclid 性を満たします。従って $O$ は $n$ 次元位相多様体です。

2. 一枚しかないので、必要な座標変換は恒等写像だけです。これは $C^\infty$ 級で逆写像も同じです。従って滑らかなアトラスです。

3. [滑らかなアトラスからの極大化](#thm-geo1-maximal-atlas-extension)により、この一枚アトラスを含む極大滑らかアトラスが一意に存在します。それを $O$ の標準滑らかな構造とします。
<!-- solution-end -->

### GEO1-A02 $x^3$ 座標は標準座標と両立しない

$\mathbb R$ 上で

$$
\varphi(x)=x,
\qquad
\psi(x)=x^3
$$

とする。

1. $(\mathbb R,\varphi)$ と $(\mathbb R,\psi)$ がともに位相的な座標近傍であることを示せ。
2. $\psi\circ\varphi^{-1}$ は滑らかであることを示せ。
3. $\varphi\circ\psi^{-1}$ は $0$ で微分可能でないことを示し、二つが滑らかに両立しないと結論せよ。

- Level: A
- 狙い: 「一方向が滑らか」では不十分であることの確認

<!-- solution-start -->
**詳細解答**

1. $\varphi$ は恒等写像なので同相です。$\psi(x)=x^3$ は連続な狭義単調増加全単射で、逆写像

   $$
   \psi^{-1}(y)=y^{1/3}
   $$

   も連続です。従ってどちらも座標近傍です。

2.

   $$
   \psi\circ\varphi^{-1}(x)=x^3
   $$

   は多項式なので $C^\infty$ 級です。

3.

   $$
   \varphi\circ\psi^{-1}(y)=y^{1/3}.
   $$

   $0$ における差商は

   $$
   \frac{h^{1/3}-0}{h}
   =
   h^{-2/3}
   $$

   で、$h\to0$ で有限値へ収束しません。従って $0$ で微分可能ではありません。

   滑らかな両立性は座標変換が微分同相であることを要求するので、この二つは滑らかに両立しません。
<!-- solution-end -->

### GEO1-A03 球面の座標変換

$S^n$ の立体射影 $\varphi_N,\varphi_S$ について

$$
(\varphi_S\circ\varphi_N^{-1})(y)
=
\frac{y}{\|y\|^2}
$$

を直接導き、この写像が $\mathbb R^n\setminus\{0\}$ 上の微分同相写像であることを示せ。

- Level: A
- 狙い: アトラスの両立性を式で検証する

<!-- solution-start -->
**詳細解答**

北極からの立体射影の逆写像は

$$
\varphi_N^{-1}(y)
=
\left(
\frac{2y}{1+\|y\|^2},
\frac{\|y\|^2-1}{1+\|y\|^2}
\right).
$$

$r^2=\|y\|^2$ と置きます。南極座標へ入れると、最初の $n$ 成分は $2y/(1+r^2)$、分母は

$$
1+\frac{r^2-1}{1+r^2}
=
\frac{2r^2}{1+r^2}.
$$

従って

$$
(\varphi_S\circ\varphi_N^{-1})(y)
=
\frac{y}{r^2}
=
\frac{y}{\|y\|^2}.
$$

重なりでは $y\ne0$ なので分母は0になりません。各成分は $C^\infty$ 級です。

さらに

$$
\frac{\,y/\|y\|^2\,}{\|y/\|y\|^2\|^2}=y
$$

なので、この写像は自分自身が逆写像です。従って微分同相写像です。
<!-- solution-end -->

### GEO1-A04 球面の高さ関数

$$
h:S^n\to\mathbb R,
\qquad
h(x)=x_{n+1}
$$

が滑らかな写像であることを、北極・南極の立体射影座標を使って示せ。

- Level: A
- 狙い: 多様体間写像を座標表示で判定する

<!-- solution-start -->
**詳細解答**

北極座標では

$$
h\circ\varphi_N^{-1}(y)
=
\frac{\|y\|^2-1}{1+\|y\|^2}.
$$

分母は $1+\|y\|^2>0$ なので、これは $\mathbb R^n$ 全体で $C^\infty$ 級です。

南極座標では

$$
h\circ\varphi_S^{-1}(y)
=
\frac{1-\|y\|^2}{1+\|y\|^2}
$$

で、これも $C^\infty$ 級です。

二つの座標近傍は $S^n$ を覆うため、任意の点の近くで滑らかな座標表示を持ちます。従って $h$ は滑らかです。
<!-- solution-end -->

### GEO1-B01 積多様体と射影

$M$ を $m$ 次元滑らかな多様体、$N$ を $n$ 次元滑らかな多様体とする。

1. 積座標の座標変換が各因子の座標変換の直積になることを示せ。
2. 第一射影 $\pi_M:M\times N\to M$ が滑らかであることを示せ。
3. 第二射影 $\pi_N$ についても同様に示せ。

- Level: B
- 狙い: 積構造と滑らかな写像の座標表示を接続する

<!-- solution-start -->
**詳細解答**

1. $(U,\varphi),(U',\varphi')$ を $M$ の座標、$(V,\psi),(V',\psi')$ を $N$ の座標とすると、

   $$
   (\varphi'\times\psi')
   \circ
   (\varphi\times\psi)^{-1}(x,y)
   =
   \left(
   (\varphi'\circ\varphi^{-1})(x),
   (\psi'\circ\psi^{-1})(y)
   \right).
   $$

   各成分は滑らかな座標変換なので、この写像と逆写像はともに滑らかです。

2. 積座標と $M$ の座標を使うと、

   $$
   \varphi\circ\pi_M\circ(\varphi\times\psi)^{-1}(x,y)
   =
   x.
   $$

   これは $\mathbb R^{m+n}\to\mathbb R^m$ の標準射影なので $C^\infty$ 級です。従って $\pi_M$ は滑らかです。

3. 同様に

   $$
   \psi\circ\pi_N\circ(\varphi\times\psi)^{-1}(x,y)
   =
   y
   $$

   なので $\pi_N$ も滑らかです。
<!-- solution-end -->

### GEO1-B02 $\mathbb{RP}^2$ の座標変換

$\mathbb{RP}^2$ の

$$
U_0=\{[x_0:x_1:x_2]:x_0\ne0\},
\qquad
U_1=\{[x_0:x_1:x_2]:x_1\ne0\}
$$

に

$$
\varphi_0([x_0:x_1:x_2])
=
\left(
\frac{x_1}{x_0},
\frac{x_2}{x_0}
\right),
$$

$$
\varphi_1([x_0:x_1:x_2])
=
\left(
\frac{x_0}{x_1},
\frac{x_2}{x_1}
\right)
$$

を入れる。

1. $\varphi_0(U_0\cap U_1)$ を求めよ。
2. $\varphi_1\circ\varphi_0^{-1}$ を求めよ。
3. その写像と逆写像が滑らかであることを示せ。

- Level: B
- 狙い: 実射影空間の座標変換を具体計算する

<!-- solution-start -->
**詳細解答**

1. $\varphi_0$ 座標を

   $$
   (u,v)
   =
   \left(
   \frac{x_1}{x_0},
   \frac{x_2}{x_0}
   \right)
   $$

   と置きます。$U_1$ と重なる条件は $x_1\ne0$ なので $u\ne0$ です。従って

   $$
   \varphi_0(U_0\cap U_1)
   =
   \{(u,v)\in\mathbb R^2:u\ne0\}.
   $$

2. $\varphi_0^{-1}(u,v)$ は同次座標で $[1:u:v]$ です。よって

   $$
   (\varphi_1\circ\varphi_0^{-1})(u,v)
   =
   \left(
   \frac1u,
   \frac vu
   \right).
   $$

3. $u\ne0$ 上で各成分は分母が0にならない有理関数なので $C^\infty$ 級です。

   逆方向も

   $$
   (a,b)\longmapsto
   \left(
   \frac1a,
   \frac ba
   \right)
   $$

   となり、$a\ne0$ 上で滑らかです。従って二つの座標近傍は滑らかに両立します。
<!-- solution-end -->

### GEO1-B03 滑らかさが座標に依存しないことを再構成する

$f:M\to N$ と $p\in M$ を取る。座標 $(U,\varphi)$、$(V,\psi)$ で

$$
\psi\circ f\circ\varphi^{-1}
$$

が滑らかであるとする。

別の座標 $(U',\varphi')$、$(V',\psi')$ を取ったとき、

$$
\psi'\circ f\circ(\varphi')^{-1}
$$

が滑らかであることを、必要な定義域の縮小を明示しながら証明せよ。

- Level: B
- 狙い: 本章の核心である座標独立性を自力再現する

<!-- solution-start -->
**詳細解答**

$p$ を含む領域を、必要な合成が全て定義される十分小さい近傍へ制限します。滑らかさは局所的な性質なので、この縮小で問題はありません。

その近傍上では

$$
\psi'\circ f\circ(\varphi')^{-1}
=
(\psi'\circ\psi^{-1})
\circ
(\psi\circ f\circ\varphi^{-1})
\circ
(\varphi\circ(\varphi')^{-1})
$$

です。

中央の写像は仮定で滑らかです。左右はそれぞれ $N,M$ の滑らかな構造に属する座標変換なので滑らかです。

従って右辺は滑らかな Euclid 写像の合成であり、左辺も滑らかです。

ここで滑らかな構造を「互いに両立する座標の極大アトラス」としたことが、座標独立性を保証するために使われています。
<!-- solution-end -->

### GEO1-C01 $\mathbb{RP}^n$ を最初から構成する

$$
\mathbb{RP}^n=S^n/(x\sim-x)
$$

に商位相を入れ、$q:S^n\to\mathbb{RP}^n$ を商写像とする。次を順に示せ。

1. $q$ が開集合を開集合へ送ることを示せ。
2. $\mathbb{RP}^n$ が第二可算である。
3. $\mathbb{RP}^n$ が Hausdorff である。
4. $U_i=\{[x]:x_i\ne0\}$ と射影座標 $\varphi_i$ が $\mathbb R^n$ への座標近傍を与える。
5. 任意の $i,j$ について座標変換が滑らかである。
6. 以上から $\mathbb{RP}^n$ が $n$ 次元滑らかな多様体であると結論せよ。

- Level: C
- 狙い: 位相条件・局所 Euclid 性・座標互換性を一つの構成で統合する

<!-- solution-start -->
**詳細解答**

1. $O\subseteq S^n$ を開集合とします。反転 $a(x)=-x$ は同相写像なので $-O$ も開です。

   $$
   q^{-1}(q(O))
   =
   O\cup(-O)
   $$

   は開です。商位相の定義により $q(O)$ は開です。従って $q$ は開集合を開集合へ送ります。

2. $S^n$ の可算基底を $\{B_k\}_{k\ge1}$ とします。1より各 $q(B_k)$ は開です。

   $\mathbb{RP}^n$ の開集合 $W$ と $[x]\in W$ を取ると、$q^{-1}(W)$ は $x$ を含む開集合です。ある $k$ が存在して

   $$
   x\in B_k\subseteq q^{-1}(W).
   $$

   よって

   $$
   [x]\in q(B_k)\subseteq W.
   $$

   従って $\{q(B_k)\}$ は可算基底で、$\mathbb{RP}^n$ は第二可算です。

3. $[x]\ne[y]$ とします。このとき $\{x,-x\}$ と $\{y,-y\}$ は互いに素です。有限個の正数

   $$
   \|\varepsilon x-\eta y\|,
   \qquad
   \varepsilon,\eta\in\{-1,1\}
   $$

   の最小値を $\delta$ とすると $\delta>0$ です。

   $x,-x$ の周りの半径 $\delta/3$ の球面内開球の和を $O_x$、$y,-y$ のものを $O_y$ とします。中心間距離は少なくとも $\delta$ で、半径の和は $2\delta/3<\delta$ なので $O_x\cap O_y=\varnothing$ です。

   両者は反転で不変です。1より $q(O_x),q(O_y)$ は開で、$[x],[y]$ をそれぞれ含みます。

   もし $q(O_x)\cap q(O_y)\ne\varnothing$ なら、ある $z\in O_x$ と $w\in O_y$ が同じ同値類に属します。従って $w=z$ または $w=-z$ です。$O_x$ は反転で不変なので、どちらの場合も $w\in O_x\cap O_y$ となり矛盾します。

   よって $q(O_x),q(O_y)$ は互いに素であり、$\mathbb{RP}^n$ は Hausdorff です。

4. $\{x\in S^n:x_i\ne0\}$ は開で、1よりその像 $U_i$ は開です。

   $$
   \varphi_i([x_0:\cdots:x_n])
   =
   \left(
   \frac{x_0}{x_i},
   \dots,
   \widehat{\frac{x_i}{x_i}},
   \dots,
   \frac{x_n}{x_i}
   \right)
   $$

   は非零スカラー倍で値が変わらないので 良定義 です。

   任意の $u\in\mathbb R^n$ に対し、$i$ 番目を1、残りを $u$ としたベクトルを $v(u)$ と置けば

   $$
   u\longmapsto q\left(\frac{v(u)}{\|v(u)\|}\right)
   $$

   が逆写像です。これは連続です。

   一方 $\varphi_i\circ q$ は $x_i\ne0$ の領域で座標比からなる連続写像で、[商写像の普遍性](../TOP1/index.md#thm-top1-quotient-universal)により $\varphi_i$ も連続です。従って $\varphi_i$ は同相写像です。

5. $U_i\cap U_j$ では $x_j/x_i\ne0$ です。$\varphi_i$ 座標で $i$ 番目を1に正規化した同次座標を考えると、$\varphi_j$ 座標へ移る操作は「全成分を $j$ 番目の非零成分で割り、$j$ 番目を除く」ことです。

   各成分は

   $$
   \frac{u_k}{u_j}
   \quad\text{または}\quad
   \frac1{u_j}
   $$

   の形です。$u_j\ne0$ 上では $C^\infty$ 級です。逆向きの写像も $i,j$ を交換した同じ形なので滑らかです。

6. 2と3で第二可算・Hausdorff、4で局所 Euclid 性、5で座標の滑らかな両立性を示しました。従って $\{(U_i,\varphi_i)\}$ は滑らかなアトラスです。

   [極大化定理](#thm-geo1-maximal-atlas-extension)により一意な極大滑らかアトラスへ拡張できるので、

   $$
   \boxed{\mathbb{RP}^n\text{ は }n\text{ 次元滑らかな多様体}}
   $$

   です。
<!-- solution-end -->

---

## 13. まとめ

この章で最も重要なのは、滑らかさを「座標の式」だけで終わらせず、座標を変えても同じ概念になるところまで閉じたことです。

$$
\text{局所 Euclid}
\longrightarrow
\text{座標近傍}
\longrightarrow
\text{滑らかな座標変換}
\longrightarrow
\text{極大滑らかアトラス}
$$

によって滑らかな構造を作り、その上で

$$
\psi\circ f\circ\varphi^{-1}
$$

が滑らかかどうかで多様体間の写像を判定しました。

主要な具体例として

$$
\mathbb R^n,\qquad
S^n,\qquad
T^n,\qquad
\mathbb{RP}^n
$$

を構成しました。

次の GEO2 では、点 $p\in M$ における「微小な方向」を接空間 $T_pM$ として作ります。そこで初めて、滑らかな写像 $f:M\to N$ の微分

$$
df_p:T_pM\to T_{f(p)}N
$$

が座標に依存しない線形写像として現れます。
