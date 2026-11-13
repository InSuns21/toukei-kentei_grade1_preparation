# AQFT18 標準対とTomita作用素

[AQFT13の局所巡回・分離性](../AQFT13/index.md#cor-aqft13-vacuum-local-standard)により、適切な仮定を満たす真空 $\Omega$ は、局所von Neumann環 $\mathcal M(O)$ の演算子を作用させて多くのベクトルを作れ、かつその作用から演算子を一意に識別できます。しかし、これだけでは「局所可観測量に自然な時間発展」を与える公式はまだありません。

その最初の候補が、**作用素の随伴をベクトルに移す規則**です。

$$
A\Omega\longmapsto A^*\Omega.
$$

同じベクトル $A\Omega$ が異なる演算子の作用として書けた場合にも値が一致するでしょうか。また、規則を与えるのは一部のベクトルだけです。極限で得られるベクトルにも矛盾なく延長できるでしょうか。本講は、この二つの問いを**分離性による一意性**と**可換子の巡回性による可閉性**で解決します。

本講ではこの規則を矛盾なく閉包へ延長して $S$ を構成します。その極分解、モジュラー作用素 $\Delta$ とモジュラー共役 $J$ は次講 AQFT19 の課題です。計量符号 $(-,+,+,+)$ の局所量子場理論にも応用しますが、以下の基本定理には時空・正エネルギー・Type IIIという仮定は不要です。内積 $\langle x,y\rangle$ は**第2変数線形**とします。

## 1. 標準対はどの二つの性質を備えるか

複素Hilbert空間 $\mathcal H$ 上の単位的von Neumann環 $\mathcal M\subset B(\mathcal H)$ とベクトル $\Omega$ を固定します。[巡回ベクトル](../AQFT12/index.md#def-aqft12-cyclic-vector)は $\overline{\mathcal M\Omega}=\mathcal H$ を、[分離ベクトル](../AQFT13/index.md#def-aqft13-separating-vector)は $A\Omega=0$ なら $A=0$ を要求します。

両方を備えた組なら、$A\Omega$ という表示は一意であるうえ、これらのベクトルは全空間で稠密です。この組には次の定義で名前を与えます。大事なのは、環だけでなく**環と選んだベクトルの組**の性質だということです。

<a id="def-aqft18-standard-pair"></a>

<!-- formal-statement-start -->
> **定義（標準対）**  
> $\mathcal H$ を複素Hilbert空間、$\mathcal M\subset B(\mathcal H)$ を単位元を含むvon Neumann環、$\Omega\in\mathcal H$ を単位ベクトルとする。組 $(\mathcal M,\Omega)$ が**標準対**であるとは、次の両条件を満たすことをいう。
>
> **（S1）巡回性**
$$
\overline{\mathcal M\Omega}=\mathcal H.
$$
>
> **（S2）分離性**
$$
A\in\mathcal M,\quad A\Omega=0
\quad\Longrightarrow\quad A=0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft18-standard-pair -->
### 直接例：二点の対角環

$\mathcal H=\mathbb C^2$、$\mathcal M=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$ とし、$0<p<1$ に対して

$$
\Omega=(\sqrt p,\sqrt{1-p})
$$

を選びます。$\|\Omega\|^2=p+(1-p)=1$ です。この組について、まず**分離性**を成分で確かめます。

$$
\operatorname{diag}(a,b)\Omega
=(a\sqrt p,b\sqrt{1-p})=(0,0)
$$

なら、二つの平方根がともに正なので $a=b=0$ です。次に任意の $(u,v)\in\mathbb C^2$ に対して

$$
A=\operatorname{diag}\left(\frac{u}{\sqrt p},
\frac{v}{\sqrt{1-p}}\right)\in\mathcal M
$$

を選べば $A\Omega=(u,v)$ です。よって $\mathcal M\Omega=\mathcal H$ で巡回的です。両条件を**別々に**確かめたので標準対です。

一方 $p=1$ では $\Omega=(1,0)$ となり、非零な $\operatorname{diag}(0,1)$ が $\Omega$ を消します。同時に第2座標を生成できず、標準対ではありません。

**定義の確認**：$0<p<1$ では巡回性と分離性の両方を行列成分で判定しました。$p=1$ ではそれぞれの破綻も具体的に確認できました。
<!-- definition-example-end -->

[AQFT13の可換子の巡回性と分離性の同値](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)を $\mathcal M$ に適用すると、標準対なら $\Omega$ は**可換子 $\mathcal M'$ に対しても巡回・分離的**です。ここで[可換子](../../VN/VN2/index.md#def-vn2-commutant)は同じ $\mathcal H$ 上で取ります。これが後で可閉性を証明する鍵になります。

## 2. なぜ反線形作用素と閉包が必要か

通常の線形作用素は複素係数をそのまま外へ出します。しかし随伴については

$$
(\alpha A+\beta B)^*
=\overline\alpha A^*+\overline\beta B^*.
$$

この複素共役を持つ写像を反線形と呼びます。作用素が全Hilbert空間に定義されているとは限らないため、まず定義域を含めて定義します。

<a id="def-aqft18-antilinear"></a>

<!-- formal-statement-start -->
> **定義（反線形作用素）**  
> 複素Hilbert空間 $\mathcal H$ の複素線形部分空間 $D\subset\mathcal H$ から $\mathcal H$ への写像 $T:D\to\mathcal H$ が**反線形**であるとは、$x,y\in D$、$\alpha,\beta\in\mathbb C$ に対して
$$
T(\alpha x+\beta y)
=\overline\alpha Tx+\overline\beta Ty
$$
> が成り立つことをいう。$D$ を $\operatorname{Dom}(T)$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft18-antilinear -->
### 直接例：成分ごとの複素共役

$C:\mathbb C^2\to\mathbb C^2$ を $C(z_1,z_2)=(\overline z_1,\overline z_2)$ と置きます。各座標で

$$
\overline{\alpha x_j+\beta y_j}
=\overline\alpha\,\overline{x_j}
+\overline\beta\,\overline{y_j}
$$

なので $C$ は反線形です。さらに $C^2=I$、$\|Cx\|=\|x\|$ です。しかし $C(ix)=-iCx$ なので、零でない $x$ について複素線形ではありません。

**定義の確認**：任意の係数とベクトルで共役係数が現れ、定義域は複素線形な全空間です。したがって反線形性の全条件を満たします。
<!-- definition-example-end -->

有限次元の例では全空間に作用していましたが、一般には $T$ をまず稠密な部分空間 $D$ 上にだけ定めます。**グラフ**とは組 $(x,Tx)$ の集合で、$\mathcal H\oplus\mathcal H$ のノルム

$$
\|(x,y)\|_{\oplus}^2=\|x\|^2+\|y\|^2
$$

を使って極限を取ります。グラフの閉包が同じ入力に異なる出力を割り当てないとき、極限による延長が可能です。その性質を可閉性と呼びます。

<a id="def-aqft18-closable"></a>

<!-- formal-statement-start -->
> **定義（可閉作用素・閉包）**  
> $D\subset\mathcal H$ を稠密な複素線形部分空間、$T:D\to\mathcal H$ を反線形作用素とする。グラフ
$$
G(T)=\{(x,Tx):x\in D\}
\subset\mathcal H\oplus\mathcal H
$$
> の閉包 $\overline{G(T)}$ がある作用素のグラフとなるとき、$T$ は**可閉**であるという。その閉グラフで定まる作用素を**閉包** $\overline T$ と呼ぶ。
>
> 同値な判定条件は、任意の列 $x_n\in D$ について
$$
x_n\longrightarrow0,\quad Tx_n\longrightarrow y
\quad\Longrightarrow\quad y=0
$$
> となることである。$T$ 自身のグラフが閉じているとき $T$ は**閉作用素**である。
<!-- formal-statement-end -->

### なぜ零列の判定で十分か

$\overline{G(T)}$ に $(0,y)$ が含まれれば、グラフの点 $(x_n,Tx_n)$ で $(0,y)$ へ近づく列が取れます。上の判定条件により $y=0$ です。

逆に同じ入力 $x$ に二つの出力 $y,z$ が対応したなら、近似列の差を取ると $(0,y-z)$ がグラフ閉包に入ります。元のグラフは実線形部分空間なので、極限の差も許されます。従って $y-z=0$。これで**閉包が一価の作用素になる条件**と零列の条件が一致します。閉包の定義域と値は、次の収束対で具体的に書けます。

$$
\begin{aligned}
\operatorname{Dom}(\overline T)
&=\{x:\exists x_n\in D,\ x_n\to x,\
Tx_n\to y\text{ for some }y\},\\
\overline T x&=y.
\end{aligned}
$$

反線形性も極限で保たれます。実際、$x_n\to x$、$Tx_n\to y$ なら $\alpha x_n\to\alpha x$、$T(\alpha x_n)=\overline\alpha Tx_n\to\overline\alpha y$ です。

<!-- definition-example-start: def-aqft18-closable -->
### 直接例：全空間の共役作用素

前節の $C$ は全空間 $\mathbb C^2$ に定義され、$\|Cx-Cy\|=\|x-y\|$ を満たします。もし $x_n\to0$ なら $\|Cx_n\|=\|x_n\|\to0$ ですから、判定条件の極限 $y$ は必ず零です。また $x_n\to x$ と $Cx_n\to y$ なら $Cx_n\to Cx$ より $y=Cx$。従ってグラフは既に閉じており、$\overline C=C$ です。

**定義の確認**：零列判定だけでなくグラフの閉性も確かめたため、可閉性と閉包の双方を判定できました。
<!-- definition-example-end -->

ここで注意したいのは、**可閉性は有界性ではない**ことです。$\|Tx\|\le C\|x\|$ という一様な定数がなくても、$x_n\to0$ かつ $Tx_n\to y$ の場合に $y=0$ とできれば可閉です。後で実際に非有界な例を見ます。

## 3. Tomita初期作用素の定義は矛盾しないか

標準対 $(\mathcal M,\Omega)$ では、$A\in\mathcal M$ を使って作ったベクトル $A\Omega$ から $A^*\Omega$ を作ります。次にこの規則を定義します。ここで $\mathcal M\Omega$ は線形部分空間ですが、まだ閉じているとは限りません。

<a id="def-aqft18-tomita-initial"></a>

<!-- formal-statement-start -->
> **定義（Tomita初期作用素）**  
> $(\mathcal M,\Omega)$ を複素Hilbert空間 $\mathcal H$ 上の標準対とする。$\operatorname{Dom}(S_0)=\mathcal M\Omega$ とし、各 $A\in\mathcal M$ に対して
$$
S_0(A\Omega)=A^*\Omega
$$
> と定める写像 $S_0$ を**Tomita初期作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft18-tomita-initial -->
### 直接例：対角環では複素共役になる

第1節の $\mathcal M$ と $\Omega=(\sqrt p,\sqrt{1-p})$ に戻ります。任意の $x=(u,v)$ に対し

$$
x=A\Omega,\quad
A=\operatorname{diag}\left(
\frac{u}{\sqrt p},\frac{v}{\sqrt{1-p}}\right)
$$

です。$A^*=\operatorname{diag}(\overline u/\sqrt p,\overline v/\sqrt{1-p})$ なので

$$
S_0x=A^*\Omega=(\overline u,\overline v)=Cx.
$$

従って $\operatorname{Dom}(S_0)=\mathbb C^2$ であり、前節の閉じた反線形作用素 $C$ と一致します。**代表 $A$ の一意性・定義域・反線形性・値**まで具体的に検査できました。

**定義の確認**：標準対の分離性により入力の表示は一意であり、計算した $S_0$ は指定した随伴の規則を全定義域で満たします。
<!-- definition-example-end -->

<a id="prop-aqft18-initial-properties"></a>

<!-- formal-statement-start -->
> **命題（Tomita初期作用素の成立）**  
> $(\mathcal M,\Omega)$ が標準対なら、上の $S_0$ はwell-definedな稠密定義反線形作用素であり、$\mathcal M\Omega$ を自分自身に全単射として写し、
$$
S_0^2x=x\qquad(x\in\mathcal M\Omega)
$$
> を満たす。ここで $S_0^2$ の定義域は $\mathcal M\Omega$ 全体である。
<!-- formal-statement-end -->

### 証明の見取り図

well-defined性には分離性を、稠密性には巡回性を別々に使います。随伴を二度取ると元に戻るため、初期定義域上では対合になります。

<!-- proof-start -->
### 証明

**well-defined性。** $A\Omega=B\Omega$ なら $(A-B)\Omega=0$ です。[分離性](../AQFT13/index.md#def-aqft13-separating-vector)から $A-B=0$ なので $A=B$、従って $A^*\Omega=B^*\Omega$ です。よって同じ入力に二つの出力が対応することはありません。

**定義域と反線形性。** $\mathcal M$ は複素線形空間で、$(\alpha A+\beta B)\Omega=\alpha A\Omega+\beta B\Omega$ なので $\mathcal M\Omega$ も複素線形部分空間です。$S_0$ を作用させると

$$
\begin{aligned}
S_0(\alpha A\Omega+\beta B\Omega)
&=(\alpha A+\beta B)^*\Omega\\
&=\overline\alpha A^*\Omega+\overline\beta B^*\Omega\\
&=\overline\alpha S_0(A\Omega)
 +\overline\beta S_0(B\Omega).
\end{aligned}
$$

**稠密性。** [巡回性](../AQFT12/index.md#def-aqft12-cyclic-vector)は $\overline{\mathcal M\Omega}=\mathcal H$ そのものなので、定義域が稠密です。

**対合性と値域。** $A^*\in\mathcal M$ なので $S_0(A\Omega)=A^*\Omega$ も定義域にあります。さらに

$$
S_0(S_0(A\Omega))
=S_0(A^*\Omega)
=(A^*)^*\Omega=A\Omega.
$$

任意の $B\Omega$ は $S_0(B^*\Omega)$ と書けるので値域も $\mathcal M\Omega$ 全体です。$\square$
<!-- proof-end -->

この命題で分かったのは**初期定義域上の対合性**です。定義域が閉じているとは限らず、全Hilbert空間上の有界な対合と取り違えてはいけません。

## 4. 可換子側にも同じ規則を置く

元の環 $\mathcal M$ だけで $S_0$ のグラフを調べると、可閉性を直接示すのは難しいことがあります。そこで $\mathcal M$ の全ての元と可換な環 $\mathcal M'$ を使います。

[AQFT13の巡回性と分離性の同値](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)により、$\Omega$ は $\mathcal M'$ に対しても巡回的かつ分離的です。したがって可換子側にも、随伴を取る同型の初期作用素を定義できます。

<a id="def-aqft18-commutant-initial"></a>

<!-- formal-statement-start -->
> **定義（可換子側Tomita初期作用素）**  
> $(\mathcal M,\Omega)$ を標準対とする。$\operatorname{Dom}(F_0)=\mathcal M'\Omega$ に対し
$$
F_0(B\Omega)=B^*\Omega
\qquad(B\in\mathcal M')
$$
> と定める反線形作用素 $F_0$ を**可換子側Tomita初期作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft18-commutant-initial -->
### 直接例：二点対角環の可換子

第1節の対角環を $D$ とします。$T=(t_{ij})\in B(\mathbb C^2)$ が $P=\operatorname{diag}(1,0)\in D$ と可換なら

$$
TP=\begin{pmatrix}t_{11}&0\\t_{21}&0\end{pmatrix},
\qquad
PT=\begin{pmatrix}t_{11}&t_{12}\\0&0\end{pmatrix}
$$

より $t_{12}=t_{21}=0$ です。逆に対角行列同士は可換なので $D'=D$。従って $F_0$ は $S_0$ と同じ成分共役 $C$ になり、両者の定義域も $\mathbb C^2$ です。可換子側でのwell-defined性と稠密性もこの例で確認できました。

**定義の確認**：可換子 $D'=D$ を行列で求めたうえで、任意の $B\Omega$ に対し $F_0(B\Omega)=B^*\Omega$ を検証しました。
<!-- definition-example-end -->

<a id="ref-aqft18-core-pairing"></a>

### 基本対合の計算

ここで二つの作用素を結ぶ**基本対合公式**を計算します。$A\in\mathcal M$、$B\in\mathcal M'$ なら $AB=BA$ です。内積の第2変数線形規約を使い、随伴の作用を一つずつ移すと

$$
\begin{aligned}
\langle S_0(A\Omega),B\Omega\rangle
&=\langle A^*\Omega,B\Omega\rangle\\
&=\langle\Omega,AB\Omega\rangle\\
&=\langle\Omega,BA\Omega\rangle\\
&=\langle B^*\Omega,A\Omega\rangle\\
&=\langle F_0(B\Omega),A\Omega\rangle.
\end{aligned}
$$

この公式で $B\Omega$ は単なる試験ベクトルではありません。**可換子側の巡回性によって、この形のベクトルが全空間に稠密である**ため、極限の値を一意に決められます。

## 5. 可閉性を証明し、閉包を作る

<a id="thm-aqft18-tomita-closable"></a>

<!-- formal-statement-start -->
> **定理（Tomita初期作用素の可閉性）**  
> $\mathcal H$ 上の標準対 $(\mathcal M,\Omega)$ に対し、$S_0$ と $F_0$ はともに可閉である。したがって閉じた反線形作用素
$$
S=\overline{S_0},\qquad F=\overline{F_0}
$$
> が一意に構成される。両者の定義域と値域は稠密である。
<!-- formal-statement-end -->

### 証明の見取り図

$A_n\Omega\to0$、$A_n^*\Omega\to\eta$ とすると、どの $B\Omega$ に対しても

$$
\langle\eta,B\Omega\rangle
=\lim_n\langle B^*\Omega,A_n\Omega\rangle=0
$$

です。[可換子の巡回性](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)によって $B\Omega$ は稠密に走るため $\eta=0$ となり、[可閉性の零列判定](#def-aqft18-closable)が使えます。逆側は $\mathcal M$ の巡回性を使う対称な議論です。

<!-- proof-start -->
### 証明

**$S_0$ の可閉性。** 任意の列 $x_n=A_n\Omega\in\mathcal M\Omega$ が

$$
x_n\to0,\qquad S_0x_n=A_n^*\Omega\to\eta
$$

を満たすとします。任意の $B\in\mathcal M'$ を固定し、第4節の基本対合公式を $A_n,B$ に適用すると

$$
\begin{aligned}
\langle\eta,B\Omega\rangle
&=\lim_n\langle A_n^*\Omega,B\Omega\rangle\\
&=\lim_n\langle B^*\Omega,A_n\Omega\rangle\\
&=\langle B^*\Omega,0\rangle=0.
\end{aligned}
$$

ここで $B$ を固定したので、内積の連続性によって極限を移せます。[可換子の巡回性と分離性の同値](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)により $\overline{\mathcal M'\Omega}=\mathcal H$ です。任意の $\zeta\in\mathcal H$ に対し $B_k\Omega\to\zeta$ とする列を取ると

$$
\langle\eta,\zeta\rangle
=\lim_k\langle\eta,B_k\Omega\rangle=0.
$$

特に $\zeta=\eta$ とすれば $\|\eta\|^2=0$、従って $\eta=0$ です。[零列判定](#def-aqft18-closable)が成立し、$S_0$ は可閉です。

**$F_0$ の可閉性。** $y_n=B_n\Omega\to0$、$F_0y_n=B_n^*\Omega\to\xi$ とします。今度は任意の $A\in\mathcal M$ に対して

$$
\langle\xi,A\Omega\rangle
=\lim_n\langle B_n^*\Omega,A\Omega\rangle
=\lim_n\langle A^*\Omega,B_n\Omega\rangle=0.
$$

$\overline{\mathcal M\Omega}=\mathcal H$ より $\xi=0$ となり、$F_0$ も可閉です。

**閉包の構成。** グラフの閉包を取ることで $S,F$ が定まります。もとの $\mathcal M\Omega$、$\mathcal M'\Omega$ はそれぞれの定義域に含まれ、両方とも稠密です。$S_0$ と $F_0$ は初期定義域をその全体へ写すので、閉包の値域も稠密です。反線形性は第2節の極限計算から保たれます。$\square$
<!-- proof-end -->

定理の証明では、有界作用素の極限を作用素ノルムで取ったのではありません。ベクトル $A_n\Omega$ と $A_n^*\Omega$ の**両方**がノルム収束する場合を調べています。$S_0$ が無界であっても、この条件なら矛盾なく $S$ を定義できます。

<a id="prop-aqft18-closure-involution"></a>

<!-- formal-statement-start -->
> **命題（Tomita閉包の対合性と稠密値域）**  
> 上の標準対で構成した閉作用素 $S$ と $F$ は、それぞれの定義域を自分自身へ全単射に写し、
$$
S^2x=x\quad(x\in\operatorname{Dom}(S)),
\qquad
F^2y=y\quad(y\in\operatorname{Dom}(F))
$$
> を満たす。特に $\operatorname{Ran}(S)=\operatorname{Dom}(S)$、$\operatorname{Ran}(F)=\operatorname{Dom}(F)$ は稠密である。これは $S,F$ が全空間に定義されるという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$S_0^2=I$ なのでグラフ上の二つの座標を交換しても、元のグラフに残ります。この性質を閉包へ持ち込みます。$Sx$ が再び定義域に属することを、極限列の両成分から確かめます。

<!-- proof-start -->
### 証明

$x\in\operatorname{Dom}(S)$ とします。閉包の定義から $x_n\in\mathcal M\Omega$ を選んで

$$
x_n\to x,\qquad S_0x_n\to Sx
$$

とできます。初期作用素の[対合性](#prop-aqft18-initial-properties)によって $S_0x_n\in\operatorname{Dom}(S_0)$、$S_0(S_0x_n)=x_n$ です。

そこで $z_n=S_0x_n$ と置くと

$$
z_n\to Sx,\qquad S_0z_n=x_n\to x.
$$

$S$ は $S_0$ のグラフ閉包であるため、この収束対は $Sx\in\operatorname{Dom}(S)$、$S(Sx)=x$ を意味します。よって $S^2x=x$ で、$S$ は定義域から自分自身への全単射です。全射性は任意の $x$ が $S(Sx)$ として得られることから従います。

$F_0^2=I$ に同じ議論を適用すると $F^2=I$ も成立します。両作用素の定義域は[可閉性の定理](#thm-aqft18-tomita-closable)から稠密なので、値域も稠密です。$\square$
<!-- proof-end -->

## 6. 反線形随伴が可換子側を結ぶ

次講の極分解では、作用素の随伴と積が必要になります。線形作用素の随伴と取り違えないよう、反線形の場合の式をここで固定します。

稠密定義反線形作用素 $T$ と任意の $y\in\mathcal H$ に対し、$x\mapsto\langle Tx,y\rangle$ は $x$ の**線形**汎関数です。この汎関数を $\langle z,x\rangle$ の形で表せる $y$ だけを随伴の定義域に入れます。稠密性により、そのような $z$ は存在すれば一意です。この $z$ を $T^\sharp y$ と定義します。

<a id="def-aqft18-antilinear-adjoint"></a>

<!-- formal-statement-start -->
> **定義（反線形随伴）**  
> $T:D\to\mathcal H$ を稠密定義反線形作用素とする。$y\in\mathcal H$ が $\operatorname{Dom}(T^\sharp)$ に属するとは、ある $z\in\mathcal H$ が存在し、すべての $x\in D$ について
$$
\langle Tx,y\rangle=\langle z,x\rangle
$$
> が成り立つことをいう。このとき $T^\sharp y=z$ と定義する。$T^\sharp$ 自身も反線形である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft18-antilinear-adjoint -->
### 直接例：座標共役は自分自身が反線形随伴

$\mathbb C^2$ の内積を $\langle x,y\rangle=\sum_j\overline{x_j}y_j$ とします。$C(x_1,x_2)=(\overline{x_1},\overline{x_2})$ なら

$$
\langle Cx,y\rangle
=\sum_j x_jy_j
=\langle Cy,x\rangle.
$$

従って $C^\sharp y=Cy$ が全ての $y$ に対して成立し、$C^\sharp=C$ です。反線形随伴の式の**両辺で $x,y$ の順序が入れ替わる**ことを直接確認できました。

**定義の確認**：どの $y\in\mathbb C^2$ についても表現ベクトル $z=Cy$ が存在し、反線形随伴の定義域が全空間であることも分かりました。
<!-- definition-example-end -->

<a id="prop-aqft18-adjoint-pairing"></a>

<!-- formal-statement-start -->
> **命題（可換子側との反線形随伴包含）**  
> $\mathcal H$ 上の標準対 $(\mathcal M,\Omega)$ から構成したTomita初期作用素 $S_0,F_0$ と閉包 $S,F$ について、
$$
F_0\subset S_0^\sharp,\qquad
S_0\subset F_0^\sharp,
\qquad
F\subset S^\sharp,\qquad
S\subset F^\sharp
$$
> が成り立つ。包含は作用素の定義域と値が一致する部分を意味する。ここでは等号を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

第4節の基本対合公式を反線形随伴の定義へそのまま代入します。閉包に移すときは、両側のベクトルをグラフで近似し、内積の連続性を使います。

<!-- proof-start -->
### 証明

$y=B\Omega\in\operatorname{Dom}(F_0)$ を固定すると、任意の $x=A\Omega\in\operatorname{Dom}(S_0)$ に対して、第4節で直接検算した[内積の対応](#ref-aqft18-core-pairing)を用いると

$$
\langle S_0x,y\rangle=\langle F_0y,x\rangle
$$

です。従って反線形随伴の定義で $z=F_0y$ と選べるので、$y\in\operatorname{Dom}(S_0^\sharp)$、$S_0^\sharp y=F_0y$。すなわち $F_0\subset S_0^\sharp$ です。左右を交換した同じ等式から $S_0\subset F_0^\sharp$ です。

次に $x\in\operatorname{Dom}(S)$ を固定し、$x_n\in\operatorname{Dom}(S_0)$ で $x_n\to x$、$S_0x_n\to Sx$ とします。任意の $y=B\Omega\in\operatorname{Dom}(F_0)$ について

$$
\langle Sx,y\rangle
=\lim_n\langle S_0x_n,y\rangle
=\lim_n\langle F_0y,x_n\rangle
=\langle F_0y,x\rangle.
$$

さらに $y\in\operatorname{Dom}(F)$ を任意に取り、$y_m\in\operatorname{Dom}(F_0)$、$y_m\to y$、$F_0y_m\to Fy$ とすれば、前式の $y=y_m$ で極限を取り

$$
\langle Sx,y\rangle=\langle Fy,x\rangle
$$

となります。これは $y\in\operatorname{Dom}(S^\sharp)$ と $S^\sharp y=Fy$ を意味するので $F\subset S^\sharp$ です。同様に $S\subset F^\sharp$ が従います。$\square$
<!-- proof-end -->

ここまでに**可閉性・閉包・対合性・随伴の包含**が得られました。$S^\sharp=F$ などの等号、閉反線形作用素の極分解、$J$ と $\Delta$ に関する一般定理は次講以降で、それぞれの追加論証とともに扱います。

## 7. 無限次元ではなぜ閉包が必要なのか

二点の対角環では $S_0=C$ が有界で、初めから全空間に定義されていました。これだけでは閉包を導入する理由が見えません。そこで**標準対であっても $S_0$ が非有界になる**具体例を作ります。一般のモジュラー公式を先取りせず、行列単位の計算だけで示します。

$K=\ell^2(\mathbb N)$、$e_j$ を標準正規直交基底とします。$K$ 上のHilbert–Schmidt作用素の空間 $\mathcal H=S_2(K)$ は、行列成分 $X_{ij}=\langle e_i,Xe_j\rangle$ によって

$$
\|X\|_2^2=\sum_{i,j\ge1}|X_{ij}|^2<\infty,
\qquad
\langle X,Y\rangle_2=\sum_{i,j\ge1}\overline{X_{ij}}Y_{ij}
$$

を満たす作用素全体で、行列単位 $E_{ij}=|e_i\rangle\langle e_j|$ が正規直交基底です。有限個の成分だけを残す切断は二重級数の尾を零にするので、有限行列の線形結合は $\mathcal H$ で稠密です。

$A\in B(K)$ の**左乗算** $L_A(X)=AX$ は $\mathcal H$ 上の有界作用素で、$\|AX\|_2\le\|A\|\,\|X\|_2$ です。左乗算環を $\mathcal M=\{L_A:A\in B(K)\}$ とします。これが単位的von Neumann環であることを、行列単位から確かめます。

右乗算を $R_B(X)=XB$（$B\in B(K)$）と書くと、$\|R_BX\|_2\le\|B\|\,\|X\|_2$ であり、右乗算と左乗算は結合則により交換します。従って全ての $R_B$ は $\mathcal M'$ に属します。

$T\in\mathcal M''$ とすると、$T$ は特に全ての右乗算と可換します。$R_{E_{11}}$ は第1列を残す射影なので、$T$ はその値域を保ちます。任意の $v\in K$ に対して $E_{v1}=|v\rangle\langle e_1|$ と書けば、第1列部分空間は $\{E_{v1}:v\in K\}$ です。ゆえに $T(E_{v1})=E_{Av,1}$ となる線形写像 $A:K\to K$ が存在します。

行列単位のHilbert–Schmidtノルムから $\|E_{v1}\|_2=\|v\|$ なので、$\|Av\|=\|T(E_{v1})\|_2\le\|T\|\|v\|$ です。従って $A\in B(K)$。任意の $i,j$ に対し $E_{ij}=R_{E_{1j}}(E_{i1})$ であるから、$T$ とこの右乗算の可換性により

$$
T(E_{ij})=R_{E_{1j}}T(E_{i1})
=E_{Ae_i,j}=L_A(E_{ij}).
$$

行列単位の線形包が稠密だから $T=L_A$、従って $\mathcal M''\subset\mathcal M$。逆の包含は任意の作用素集合で成り立つので $\mathcal M''=\mathcal M$ です。[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)によって $\mathcal M$ はvon Neumann環です。

対角の正作用素 $\Omega$ を

$$
\lambda_j=2^{-j},\qquad
\Omega=\operatorname{diag}(\sqrt{\lambda_1},
\sqrt{\lambda_2},\ldots)
$$

と置きます。$\sum_{j\ge1}\lambda_j=1$ なので $\|\Omega\|_2=1$ です。

**巡回性の確認。** $L_{E_{ij}}\Omega=E_{ij}\Omega=\sqrt{\lambda_j}E_{ij}$ です。$\lambda_j>0$ なので全ての行列単位 $E_{ij}$ を $\mathcal M\Omega$ の中で作れます。行列単位の線形包が稠密だから $\Omega$ は巡回的です。

**分離性の確認。** $L_A\Omega=0$ とすると各 $j$ に対して

$$
0=(A\Omega)e_j=\sqrt{\lambda_j}Ae_j.
$$

全ての $\lambda_j$ が正なので $Ae_j=0$。基底の線形包上で $A=0$ となり、有界性により全 $K$ で $A=0$ です。従って $L_A=0$、分離的です。

この標準対の $S_0$ について、$A=E_{1n}$ を代入します。行列単位の随伴は $E_{1n}^*=E_{n1}$ なので

$$
\begin{aligned}
x_n&=L_{E_{1n}}\Omega
=\sqrt{\lambda_n}E_{1n},\\
S_0x_n&=L_{E_{n1}}\Omega
=\sqrt{\lambda_1}E_{n1},\\
\frac{\|S_0x_n\|_2}{\|x_n\|_2}
&=\sqrt{\frac{\lambda_1}{\lambda_n}}
=2^{(n-1)/2}\longrightarrow\infty.
\end{aligned}
$$

つまり**$S_0$ は標準対から生じても有界とは限りません**。それでも第5節の定理によって可閉であり、閉包 $S$ が存在します。なお $S_0x_n$ はノルムが一定でも、$E_{n1}$ は互いに直交しているため収束しません。これは可閉性の零列判定に反しません。

### 別の無限次元例：可換な乗算環では閉包を手で書ける

$\mathcal H=L^2([0,1])$、$\mathcal M=L^\infty([0,1])$ の[乗算作用素](../../VN/VN6/index.md#def-vn6-multiplication-operator)の環、$\Omega(t)=1$ とします。ここで $\mathcal M$ がvon Neumann環であることは、[VN6の可換子の定理](../../VN/VN6/index.md#thm-vn6-linfty-commutant)にも一致します。復習として、実際の計算を確かめましょう。

全ての乗算作用素と可換な $T\in B(L^2)$ は、特に各可測集合 $E$ の指示関数 $\mathbf1_E$ による乗算と可換します。$h=T1$ と置くと、$T\mathbf1_E=\mathbf1_E h$ です。従って

$$
\|\mathbf1_E h\|_2
=\|T\mathbf1_E\|_2
\le\|T\|\sqrt{|E|}.
$$

もし $|h|>\|T\|+\varepsilon$ となる可測集合 $E$ が正測度なら、左辺は $(\|T\|+\varepsilon)\sqrt{|E|}$ より大きくなり矛盾します。ゆえに $|h|\le\|T\|$ ほとんど至る所で、$h\in L^\infty$ です。

単関数について $Tf=hf$ が成り立ち、単関数は $L^2$ に稠密で、$T$ と $M_h$ はともに有界です。従って全 $f\in L^2$ で $Tf=hf$ が成り立ち、$\mathcal M'\subset\mathcal M$ です。乗算同士は可換なので逆の包含も成立し、$\mathcal M'=\mathcal M$ です。[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)より $\mathcal M''=\mathcal M$ で、von Neumann環であることも確かめられました。

次に標準性を判定します。任意の $f\in L^\infty$ に対し $M_f\Omega=f$ です。$M_f\Omega=0$ なら $f=0$ ほとんど至る所なので分離的です。任意の $g\in L^2$ を

$$
g_n=g\,\mathbf1_{\{|g|\le n\}}
$$

で切断すると $g_n\in L^\infty$ で、$\|g-g_n\|_2^2=\int_{\{|g|>n\}}|g|^2\to0$ です。従って巡回的です。$S_0f=\overline f$ が $L^\infty\subset L^2$ に定義され、切断列により

$$
g_n\to g,\qquad
S_0g_n=\overline{g_n}\to\overline g.
$$

ゆえに $\overline{S_0}$ は全 $L^2$ 上の複素共役 $Sg=\overline g$ です。この例では**初期定義域が真部分空間でも、閉包は有界作用素になり得る**ことが分かります。

## 8. 仮定を落とすと何が壊れるか

**分離性がない場合。** $\mathcal H=\mathbb C^2$、$\mathcal M=B(\mathbb C^2)$、$\Omega=e_1$ とします。任意のベクトル $v$ を第1列にもつ行列 $A_v$ を取れば $A_ve_1=v$ なので巡回的です。しかし $A=E_{12}$ は非零なのに

$$
A\Omega=E_{12}e_1=0,\qquad
A^*\Omega=E_{21}e_1=e_2\ne0.
$$

零ベクトルを表す $A=0$ と $A=E_{12}$ で出力が異なります。したがって $A\Omega\mapsto A^*\Omega$ は**写像としてwell-definedではありません**。破綻するのは可閉性より前の段階です。

**巡回性がない場合。** 同じ $\mathbb C^2$ で $\mathcal M=\mathbb CI$、$\Omega=e_1$ とすると、$\lambda I\,\Omega=0$ なら $\lambda=0$ なので分離的ですが、

$$
\mathcal M\Omega=\mathbb Ce_1\subsetneq\mathbb C^2.
$$

$S_0(\lambda e_1)=\overline\lambda e_1$ はこの一次元部分空間上でwell-definedでも、**定義域が稠密ではありません**。よって第5節の標準対の定理や第6節の稠密定義作用素の随伴を、そのまま適用できません。これは「閉包が存在しない」という主張ではありません。

**局所量子場理論への戻り方。** [AQFT13の真空局所巡回・分離性の系](../AQFT13/index.md#cor-aqft13-vacuum-local-standard)の仮定がそろった非空有界double cone $O$ では $(\mathcal M(O),\Omega)$ が標準対となり、本講の $S_0,S$ を構成できます。逆に局所性・スペクトル条件等が不足する一般のnetで、全ての領域に同じ結論を無条件に主張してはいけません。

## 9. 演習と詳細解答

### Level A：定義を手で判定する

<a id="ex-aqft18-a01"></a>
#### AQFT18-A01 二点の標準対と初期作用素

- Level: A

$\mathcal H=\mathbb C^2$、$D$ を対角行列環とする。$\Omega=(\sqrt{1/4},\sqrt{3/4})$ に対して、巡回性・分離性を個別に示し、$S_0$ を任意の $x=(u,v)$ について求めよ。

<!-- solution-start -->
**詳細解答。** $\Omega=(1/2,\sqrt3/2)$ は単位ベクトルです。$A=\operatorname{diag}(a,b)$ が $A\Omega=0$ を満たすなら

$$
(a/2,b\sqrt3/2)=(0,0)
$$

なので $a=b=0$、すなわち分離的です。任意の $(u,v)$ に対して

$$
A=\operatorname{diag}(2u,2v/\sqrt3)
$$

とすれば $A\Omega=(u,v)$ だから $D\Omega=\mathbb C^2$ で巡回的です。この表示の $A^*=\operatorname{diag}(2\overline u,2\overline v/\sqrt3)$ より

$$
S_0(u,v)=A^*\Omega=(\overline u,\overline v).
$$

定義域は全 $\mathbb C^2$、$S_0^2=I$ であり、[直接例](#def-aqft18-tomita-initial)の公式に一致します。
<!-- solution-end -->

<a id="ex-aqft18-a02"></a>
#### AQFT18-A02 反線形の符号を落とさない

- Level: A

$\mathcal H=\mathbb C^2$、$C(z_1,z_2)=(\overline z_1,\overline z_2)$ とする。$x=(1,i)$、$\alpha=2+i$ に対して $C(\alpha x)=\overline\alpha Cx$ を成分で確かめ、$C^2x=x$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\alpha x=(2+i,(2+i)i)= (2+i,-1+2i)$ です。よって

$$
C(\alpha x)=(2-i,-1-2i).
$$

一方 $Cx=(1,-i)$、$\overline\alpha=2-i$ なので

$$
\overline\alpha Cx=(2-i,(2-i)(-i))
=(2-i,-1-2i).
$$

両者は一致します。また $C(Cx)=C(1,-i)=(1,i)=x$。これは反線形であっても二度作用すれば複素線形な恒等写像になる例です。
<!-- solution-end -->

<a id="ex-aqft18-a03"></a>
#### AQFT18-A03 分離性の欠落と零ベクトル

- Level: A

$\mathcal H=\mathbb C^2$、$\mathcal M=B(\mathbb C^2)$、$\Omega=e_1$ とする。$E_{12}\Omega$ と $E_{12}^*\Omega$ を求め、$A\Omega\mapsto A^*\Omega$ が写像を定義しない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 行列単位 $E_{12}$ は $e_2$ を $e_1$ に写し、$e_1$ を $0$ に写します。従って

$$
E_{12}e_1=0,\qquad E_{12}^*e_1=E_{21}e_1=e_2.
$$

同じ零ベクトルは零作用素 $A=0$ からも得られますが、その場合の出力は $A^*\Omega=0$ です。入力が同じなのに出力が $e_2$ と $0$ で異なるので、[Tomita初期作用素の定義](#def-aqft18-tomita-initial)に必要なwell-defined性がありません。非零な $E_{12}$ が $\Omega$ を消すことが、失われた分離性を示しています。
<!-- solution-end -->

<a id="ex-aqft18-a04"></a>
#### AQFT18-A04 可閉性の零列判定

- Level: A

稠密定義反線形作用素 $T$ に対して、列 $x_n\in\operatorname{Dom}(T)$ が $x_n\to x$、$Tx_n\to y$ と $x_n'\to x$、$Tx_n'\to y'$ を満たすとする。可閉性の零列判定から $y=y'$ を証明せよ。

<!-- solution-start -->
**詳細解答。** 定義域は複素線形部分空間なので $z_n=x_n-x_n'$ も定義域にあります。収束の差から

$$
z_n\to x-x=0.
$$

$T$ は反線形で、実数係数 $1,-1$ は複素共役でも不変だから

$$
Tz_n=Tx_n-Tx_n'\to y-y'.
$$

[零列判定](#def-aqft18-closable)より $y-y'=0$。従って $y=y'$ です。これは閉包の出力が近似列の選択に依存しないことを示す操作です。
<!-- solution-end -->

### Level B：可換子・閉包・無限次元を結び付ける

<a id="ex-aqft18-b01"></a>
#### AQFT18-B01 可換子側が稠密になる理由

- Level: B

$\mathcal M\subset B(\mathcal H)$ がvon Neumann環で、$\Omega$ が $\mathcal M$ に分離的とする。$K=\overline{\mathcal M'\Omega}$ への直交射影 $P$ を用い、$K=\mathcal H$ を証明せよ。$\Omega$ が $\mathcal M$ に巡回的とは仮定しない。

<!-- solution-start -->
**詳細解答。** $B,C\in\mathcal M'$ とすると $B(C\Omega)=(BC)\Omega$ なので $K$ は $B$ に関して不変です。$B^*\in\mathcal M'$ についても不変であり、$\eta\in K^\perp$、$\zeta\in K$ に対し

$$
\langle B\eta,\zeta\rangle
=\langle\eta,B^*\zeta\rangle=0.
$$

従って $K^\perp$ も不変です。よって $P$ は全ての $B\in\mathcal M'$ と可換します。[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)から $P\in(\mathcal M')'=\mathcal M$ です。

$I\in\mathcal M'$ より $\Omega\in K$、したがって $(I-P)\Omega=0$。$I-P\in\mathcal M$ と分離性から $I-P=0$ です。従って $P=I$、$K=\mathcal H$ です。これは[AQFT13の巡回性と分離性の同値](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)の証明を、可閉性に必要な方向だけ再構成したものです。
<!-- solution-end -->

<a id="ex-aqft18-b02"></a>
#### AQFT18-B02 可換子の内積から可閉性へ

- Level: B

標準対で $x_n=A_n\Omega\to0$、$A_n^*\Omega\to\eta$ とする。任意の $B\in\mathcal M'$ について基本対合公式を適用し $\eta=0$ を導け。また、どこで巡回性と分離性が使われるか明示せよ。

<!-- solution-start -->
**詳細解答。** $B$ を固定すると交換 $AB=BA$ から

$$
\begin{aligned}
\langle A_n^*\Omega,B\Omega\rangle
&=\langle\Omega,A_nB\Omega\rangle\\
&=\langle\Omega,BA_n\Omega\rangle\\
&=\langle B^*\Omega,A_n\Omega\rangle.
\end{aligned}
$$

内積の連続性で $n\to\infty$ とすれば

$$
\langle\eta,B\Omega\rangle
=\langle B^*\Omega,0\rangle=0.
$$

[可換子側の巡回性](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)は、元の環に対する**分離性**から導かれます。この稠密性によって $\eta$ は全 $\mathcal H$ に直交し、$\eta=0$ です。一方、元の**巡回性**は $\operatorname{Dom}(S_0)=\mathcal M\Omega$ 自体を稠密にするのに必要です。分離性はさらに $S_0$ のwell-defined性にも使われます。これで可閉性の零列判定を確認しました。
<!-- solution-end -->

<a id="ex-aqft18-b03"></a>
#### AQFT18-B03 無限次元標準対は非有界になり得る

- Level: B

$K=\ell^2(\mathbb N)$、$\mathcal H=S_2(K)$、$\mathcal M=\{L_A:A\in B(K)\}$、$\Omega=\operatorname{diag}(2^{-j/2})$ とする。行列単位 $E_{ij}$ を用いて標準性を示し、$x_n=E_{1n}\Omega$ について $\|S_0x_n\|_2/\|x_n\|_2$ を求めよ。また、この列が可閉性の反例ではない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\|\Omega\|_2^2=\sum_{j=1}^\infty2^{-j}=1$ です。$L_{E_{ij}}\Omega=2^{-j/2}E_{ij}$ なので、全行列単位の線形包は $\mathcal M\Omega$ に含まれます。有限成分切断がHilbert–Schmidtノルムで収束するため巡回的です。

$A\Omega=0$ なら各 $j$ について $2^{-j/2}Ae_j=0$、従って $Ae_j=0$。有界作用素 $A$ は零であり、分離的です。

$E_{1n}^*=E_{n1}$、$E_{1n}\Omega=2^{-n/2}E_{1n}$、$E_{n1}\Omega=2^{-1/2}E_{n1}$ なので

$$
\frac{\|S_0x_n\|_2}{\|x_n\|_2}
=\frac{2^{-1/2}}{2^{-n/2}}
=2^{(n-1)/2}\to\infty.
$$

$S_0$ は非有界です。ただし $\|S_0x_n\|_2=2^{-1/2}$ は一定であり、$S_0x_n$ は異なる行列単位に沿って互いに直交するので、**ノルム収束する部分列すらありません**。可閉性の零列判定は出力も収束する場合にしか適用しないため、矛盾しません。
<!-- solution-end -->

<a id="ex-aqft18-b04"></a>
#### AQFT18-B04 閉包でも対合が残る

- Level: B

$S_0$ が可閉かつ $S_0(\operatorname{Dom}S_0)=\operatorname{Dom}S_0$、$S_0^2=I$ を満たすとする。$S=\overline{S_0}$ について $\operatorname{Dom}S$ が $S$ で保たれ、$S^2=I$ がその定義域で成立することを示せ。

<!-- solution-start -->
**詳細解答。** 任意の $x\in\operatorname{Dom}S$ に対し、[可閉作用素・閉包](#def-aqft18-closable)の収束列による特徴づけから $x_n\in\operatorname{Dom}S_0$ を取り

$$
x_n\to x,\qquad S_0x_n\to Sx
$$

とできます。仮定により $z_n=S_0x_n$ も $\operatorname{Dom}S_0$ に属し、$S_0z_n=x_n$ です。従って

$$
(z_n,S_0z_n)=(S_0x_n,x_n)\to(Sx,x).
$$

右辺は閉じたグラフ $G(S)$ に属します。これは $Sx\in\operatorname{Dom}S$ かつ $S(Sx)=x$ を意味します。任意の $x$ に成立するので、$S$ は定義域上で全単射、$S^2=I$ です。この結論から $\operatorname{Dom}S=\mathcal H$ は導かれません。
<!-- solution-end -->

### Level C：標準対から閉包までを一続きで証明する

<a id="ex-aqft18-c01"></a>
#### AQFT18-C01 可換な無限次元模型を完全に構成する

- Level: C

$\mathcal H=L^2([0,1])$、$\mathcal M=\{M_f:f\in L^\infty([0,1])\}$（$M_fg=fg$）、$\Omega=1$ とする。

1. $(\mathcal M,\Omega)$ が標準対であることを示せ。
2. $S_0$ の定義域と値を求め、$S=\overline{S_0}$ を全ての $L^2$ ベクトル上で構成せよ。
3. 任意の $g,h\in L^2$ に対して $\langle Sg,h\rangle=\langle Sh,g\rangle$ と $S^2=I$ を示せ。
4. $\mathcal M=B(\mathbb C^2)$、$\Omega=e_1$ に置き換えると、どの段階が失敗するか述べよ。

<!-- solution-start -->
**詳細解答。**

**1. 標準性。** $\Omega=1$ のノルムは $\int_0^1 1\,dt=1$ です。$M_f\Omega=f$ であり、$M_f\Omega=0$ なら $f=0$ ほとんど至る所で、乗算作用素は零です。よって分離的です。

任意の $g\in L^2$ に対して $g_n=g\,\mathbf1_{\{|g|\le n\}}$ と置くと $g_n\in L^\infty$ で、

$$
\|g-g_n\|_2^2
=\int_0^1|g|^2\mathbf1_{\{|g|>n\}}\,dt\to0.
$$

極限は $|g|^2$ の可積分性と尾部の単調減少（または優収束）によります。よって $\overline{\mathcal M\Omega}=L^2$ で巡回的です。

**2. 初期作用素と閉包。** $M_f^*=M_{\overline f}$ なので

$$
\operatorname{Dom}(S_0)=L^\infty([0,1])
\subset L^2([0,1]),\qquad
S_0f=\overline f.
$$

任意の $g\in L^2$ に対する前段の切断 $g_n$ は $L^\infty$ に属し、$g_n\to g$ です。さらに

$$
\|S_0g_n-\overline g\|_2
=\|\overline{g_n}-\overline g\|_2
=\|g_n-g\|_2\to0.
$$

よって全 $L^2$ 上の写像 $Sg=\overline g$ は $S_0$ のグラフ閉包に含まれます。一方、$f_n\to f$、$\overline{f_n}\to h$ なら複素共役の等距離性から $\overline{f_n}\to\overline f$ でもあり、[距離空間における極限の一意性](../../../基礎科目/F0/F0-00B/index.md#prop-f0-00b-01)から $h=\overline f$。従ってグラフ閉包はちょうど $S$ のグラフです。

**3. 反線形随伴と対合。** 内積を $\langle g,h\rangle=\int_0^1\overline g h\,dt$ とすると

$$
\langle Sg,h\rangle
=\int_0^1 gh\,dt
=\langle Sh,g\rangle.
$$

積 $gh$ の可積分性は[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から従います。また

$$
S(Sg)=\overline{\overline g}=g
$$

なので $S^2=I$ です。等距離性 $\|Sg\|_2=\|g\|_2$ からも $S$ が閉じていることを確かめられます。

**4. 分離性の欠落。** 全行列環の $e_1$ は巡回的ですが $E_{12}e_1=0$、$E_{12}^*e_1=e_2$ です。零作用素の表示からは出力 $0$ になるため、$S_0(A\Omega)=A^*\Omega$ は初めからwell-definedではありません。従って可閉性の判定へ進む前に構成が破綻します。
<!-- solution-end -->

## 10. 到達点と次講

標準対の**分離性**が $A\Omega\mapsto A^*\Omega$ の一意性を、**巡回性**が稠密定義域を与えます。さらに[AQFT13の巡回性と分離性の同値](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)を使うことで、可換子側の初期作用素 $F_0$ が稠密な試験ベクトルを提供し、$S_0$ と $F_0$ の可閉性が成立しました。閉包 $S$ と $F$ は反線形・閉・稠密定義で、それぞれ定義域上で二乗が恒等作用素です。

無限次元Hilbert–Schmidt模型では $S_0$ が非有界にもなるため、単に随伴をベクトルへ移す公式を書いただけでは足りないことも確認しました。次講**AQFT19「反線形極分解とモジュラー対象」**では、閉じた $S$ からどのように $J$ と $\Delta$ を取り出し、その定義域・核・稠密値域を扱うかを学びます。
