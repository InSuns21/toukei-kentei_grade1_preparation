# TOP6 標準位相 VI：全有界性・Baire・net/filter

<!-- definition-example-audit: strict -->

TOP6では、見た目の似た三つの話を一つに混ぜません。

1. **距離による有限化**：全有界性は、任意の半径で空間を有限個の球へ圧縮する条件です。
2. **完備性による存在**：Baireのカテゴリー定理では、半径を縮めながら作ったCauchy列の極限を空間内に残すために完備性を使います。
3. **一般位相の収束**：第一可算性がない空間では、点列だけでは閉包や連続性を完全には検出できません。そこで添字を自然数から有向集合へ広げた net と、集合族で同じ収束を記述する filter を導入します。

この三層では必要な構造が違います。

$$
\begin{array}{c|c}
\text{話題} & \text{必要な構造}\\ \hline
\text{全有界性} & \text{距離}\\
\text{Baireのカテゴリー定理} & \text{完備距離}\\
\text{net/filter} & \text{一般の位相}
\end{array}
$$

したがって「コンパクト性の仲間だから」「収束の話だから」と一括して仮定を移植しないことが重要です。

---

## 1. 正本の再確認：全有界性

全有界性そのものは既に F0-00C1 で定義済みです。本章では重複定義を作らず、[全有界性の定義](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#def-f0-00c1-totally-bounded)を正本として使います。

距離空間 $(X,d)$ が全有界であるとは、量化を省略せず書けば

$$
\forall\varepsilon>0\ \exists m\in\mathbb N\ \exists p_1,\dots,p_m\in X:
X\subseteq\bigcup_{j=1}^mB(p_j,\varepsilon)
$$

ということです。

「有界」との違いは、直径が有限かではなく、**どれほど小さい半径を指定されても有限個の球で覆えるか**にあります。

---

<a id="thm-top6-total-bounded-cauchy-subsequence"></a>
<!-- formal-statement-start -->
> **定理（全有界性とCauchy部分列による特徴付け）**  
> 距離空間 $(X,d)$ について、次は同値である。
>
> 1. $X$ は全有界である。
> 2. $X$ の任意の点列はCauchy部分列を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 全有界ならCauchy部分列を持つ

$X$ を全有界とし、任意の点列 $(x_n)$ を取ります。

半径 $2^{-3}$ の球を有限個選んで $X$ を覆います。点列の項は無限個あるので、有限個の球のうち少なくとも一つは点列の項を無限個含みます。その球に入る項の添字全体を $I_1\subseteq\mathbb N$ とします。

次に半径 $2^{-4}$ の有限球被覆を取ります。$I_1$ に属する項はまだ無限個あるので、その有限被覆のうち一つは $\{x_n:n\in I_1\}$ の項を無限個含みます。その添字全体を $I_2$ とします。すると

$$
I_1\supseteq I_2,
\qquad |I_2|=\infty.
$$

同様にして、各 $k\ge1$ について無限集合 $I_k\subseteq\mathbb N$ を

$$
I_1\supseteq I_2\supseteq\cdots
$$

となるように選び、$\{x_n:n\in I_k\}$ が半径 $2^{-(k+2)}$ のある一つの球に全て入るようにできます。

ここから添字を増加させます。$n_1\in I_1$ を一つ取り、$n_k$ まで選んだら、$I_{k+1}$ は無限集合なので

$$
n_{k+1}\in I_{k+1},
\qquad n_{k+1}>n_k
$$

となるように選べます。これで $(x_{n_k})$ は部分列です。

この部分列がCauchyであることを確認します。$p,q\ge k$ なら、入れ子関係から

$$
n_p,n_q\in I_k.
$$

従って $x_{n_p}$ と $x_{n_q}$ はともに半径 $2^{-(k+2)}$ の同じ球に入っています。その球の中心を $c_k$ とすると、[距離・距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)の第三条件から

$$
\begin{aligned}
d(x_{n_p},x_{n_q})
&\le d(x_{n_p},c_k)+d(c_k,x_{n_q})\\
&<2^{-(k+2)}+2^{-(k+2)}\\
&=2^{-(k+1)}.
\end{aligned}
$$

任意の $\varepsilon>0$ に対し $2^{-(k+1)}<\varepsilon$ となる $k$ を取れば、$p,q\ge k$ で

$$
d(x_{n_p},x_{n_q})<\varepsilon.
$$

よって $(x_{n_k})$ はCauchy列です。

この向きでは **完備性を使っていません**。全有界性が担当したのは、各尺度で有限個の球しかないため「無限個の項が残る球」を一つ選び続けられることだけです。

#### 任意の点列がCauchy部分列を持つなら全有界

逆に、任意の点列がCauchy部分列を持つと仮定します。$X$ が全有界でないと仮定して矛盾を導きます。

全有界性の否定から、ある $\varepsilon>0$ が存在して、半径 $\varepsilon$ の球を有限個選んでも $X$ を覆えません。

$x_1\in X$ を一つ取ります。$B(x_1,\varepsilon)$ だけでは覆えないので

$$
x_2\notin B(x_1,\varepsilon)
$$

を取れます。$x_1,\dots,x_n$ まで選んだときも、有限個の球

$$
B(x_1,\varepsilon),\dots,B(x_n,\varepsilon)
$$

では $X$ を覆えないので

$$
x_{n+1}\notin\bigcup_{j=1}^nB(x_j,\varepsilon)
$$

を選べます。

従って $i<j$ なら

$$
d(x_i,x_j)\ge\varepsilon.
$$

この性質はどの部分列にも残ります。したがって任意の部分列の異なる二項間距離は常に $\varepsilon$ 以上であり、[Cauchy列の定義](../F0_00D_Cauchy列_完備性_無限次元/index.md#def-f0-00d-01)の $\varepsilon/2$ 条件を満たせません。よってCauchy部分列は存在しません。仮定に反します。

従って $X$ は全有界です。$\square$
<!-- proof-end -->

この定理の本質は

$$
\boxed{\text{全有界性}\Longleftrightarrow\text{任意の列からCauchy部分列を抽出できる}}
$$

です。まだ「収束」は出ていません。Cauchy部分列を実際に空間内で収束させるのが次の完備性です。

---

<a id="thm-top6-compact-complete-total-bounded"></a>
<!-- formal-statement-start -->
> **定理（コンパクト距離空間と完備かつ全有界の同値）**  
> 距離空間 $(X,d)$ について、次は同値である。
>
> 1. $X$ はコンパクトである。
> 2. $X$ は完備かつ全有界である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### コンパクトなら完備かつ全有界

まず $X$ をコンパクトとします。

完備性は [コンパクト距離空間は完備](../F0_00D_Cauchy列_完備性_無限次元/index.md#thm-f0-00d-02) から得られます。

全有界性は開被覆から直接出します。任意の $\varepsilon>0$ を固定すると

$$
\{B(x,\varepsilon):x\in X\}
$$

は $X$ の開被覆です。コンパクト性により有限個の点 $x_1,\dots,x_m$ を選んで

$$
X\subseteq B(x_1,\varepsilon)\cup\cdots\cup B(x_m,\varepsilon)
$$

とできます。$\varepsilon$ は任意なので、[全有界性の定義](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#def-f0-00c1-totally-bounded)を満たします。

ここではコンパクト性が「各 $\varepsilon$ ごとの無限な球被覆を有限個へ減らす」役割を担当しました。

#### 完備かつ全有界ならコンパクト

次に $X$ が完備かつ全有界とします。任意の点列 $(x_n)$ を取ります。

[全有界性とCauchy部分列による特徴付け](#thm-top6-total-bounded-cauchy-subsequence)から、ある部分列 $(x_{n_k})$ がCauchy列になります。

$X$ は完備なので、[完備距離空間の定義](../F0_00D_Cauchy列_完備性_無限次元/index.md#def-f0-00d-02)から、ある $x\in X$ が存在して

$$
x_{n_k}\to x.
$$

従って任意の点列が収束部分列を持つので $X$ は点列コンパクトです。最後に [距離空間ではコンパクト性と点列コンパクト性が同値](../TOP5/index.md#thm-top5-metric-sequential) を使えば $X$ はコンパクトです。$\square$
<!-- proof-end -->

二つの仮定の担当は分離できます。

- **全有界性**：任意の点列から Cauchy 部分列を作る。
- **完備性**：その Cauchy 部分列の極限を $X$ の中に存在させる。

どちらか一方だけではコンパクト性に届きません。

### 1.1 全有界だが完備でない：$(0,1)$

通常の距離を入れた $(0,1)$ は全有界です。任意の $\varepsilon>0$ に対し $N\in\mathbb N$ を $1/N<\varepsilon$ となるように取ります。点

$$
p_j=\frac{j}{N}\qquad(j=1,\dots,N-1)
$$

だけでは端点近くの記述が少し面倒なので、より安全に区間 $[0,1]$ を長さ $<\varepsilon$ の有限個の小区間へ分割し、$(0,1)$ と交わる各小区間から一点ずつ中心を取ります。各点はその中心から距離 $<\varepsilon$ にあるので、有限個の $\varepsilon$ 球で $(0,1)$ を覆えます。

一方

$$
x_n=1/n
$$

は $(0,1)$ 内のCauchy列ですが、通常の実数上では $0$ に収束し、$0\notin(0,1)$ です。従って $(0,1)$ は完備ではありません。

失敗しているのは「有限球被覆」ではなく、**Cauchy列の着地点を空間内に残す条件**です。

### 1.2 完備だが全有界でない：無限離散距離空間

無限集合 $X$ に

$$
d(x,y)=
\begin{cases}
0,&x=y,\\
1,&x\ne y
\end{cases}
$$

という離散距離を入れます。

この空間のCauchy列 $(x_n)$ に $\varepsilon=1/2$ を適用すると、十分大きい $m,n$ について

$$
d(x_m,x_n)<1/2
$$

でなければなりません。離散距離は $0$ か $1$ しか取らないので、十分後では $x_m=x_n$ です。つまり列は最終的に定数列になり、$X$ 内で収束します。従って $X$ は完備です。

しかし半径 $1/2$ の球は

$$
B(x,1/2)=\{x\}
$$

です。$X$ は無限集合なので有限個の一点集合では覆えません。従って全有界ではありません。

失敗しているのは完備性ではなく、**小さい尺度で有限個に圧縮する条件**です。

---

## 2. Baire：稠密な開条件を可算個同時に満たす

全有界性の節では「有限個に減らす」ことが中心でした。Baireのカテゴリー定理は別の原理です。ここでは可算個の稠密な開条件を順番に満たすように閉球を入れ子にし、その中心列の極限を **完備性** で確保します。

<a id="def-top6-nowhere-dense"></a>
<!-- formal-statement-start -->
> **定義（疎集合）**  
> 位相空間 $X$ の部分集合 $A\subseteq X$ が **疎集合（nowhere dense）** であるとは

$$
\operatorname{int}(\overline A)=\varnothing
$$

> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-nowhere-dense -->
**定義の確認**
### 2.1 $\mathbb R$ の一点集合は疎

通常の位相を入れた $\mathbb R$ で $A=\{0\}$ とします。一点集合は閉なので

$$
\overline A=\{0\}.
$$

しかし一点集合は非空開区間を一つも含まないので

$$
\operatorname{int}(\overline A)=\varnothing.
$$

従って $\{0\}$ は疎集合です。

一方 $\mathbb Q\subseteq\mathbb R$ は疎集合ではありません。$\mathbb Q$ は $\mathbb R$ で稠密なので

$$
\overline{\mathbb Q}=\mathbb R,
\qquad
\operatorname{int}(\overline{\mathbb Q})=\mathbb R\ne\varnothing.
$$

「内部が空」なのは $A$ 自身ではなく **閉包 $\overline A$ の内部** である点が重要です。
<!-- definition-example-end -->

<a id="def-top6-meagre"></a>
<!-- formal-statement-start -->
> **定義（第一類集合・meagre集合）**  
> 位相空間 $X$ の部分集合 $A\subseteq X$ が **第一類集合（meagre集合）** であるとは、疎集合 $A_1,A_2,\dots\subseteq X$ が存在して

$$
A\subseteq\bigcup_{n=1}^{\infty}A_n
$$

> と書けることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-meagre -->
**定義の確認**
### 2.2 $\mathbb Q$ は $\mathbb R$ の中でmeagre

$\mathbb Q=\{q_1,q_2,\dots\}$ と列挙します。各一点集合 $\{q_n\}$ は $\mathbb R$ で疎なので

$$
\mathbb Q=\bigcup_{n=1}^{\infty}\{q_n\}
$$

より $\mathbb Q$ は $\mathbb R$ の中でmeagreです。

ここで「meagre」は「稠密でない」を意味しません。実際 $\mathbb Q$ は $\mathbb R$ で稠密ですが、同時にmeagreです。
<!-- definition-example-end -->

<a id="def-top6-baire-space"></a>
<!-- formal-statement-start -->
> **定義（Baire空間）**  
> 位相空間 $X$ が **Baire空間** であるとは、任意の開集合列 $G_1,G_2,\dots$ が

$$
\overline{G_n}=X\qquad(\forall n)
$$

> を満たすとき、

$$
\overline{\bigcap_{n=1}^{\infty}G_n}=X
$$

> となることをいう。すなわち、開かつ稠密な集合の可算共通部分が再び稠密であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-baire-space -->
**定義の確認**
### 2.3 有限離散空間はBaire

有限集合 $X$ に離散位相を入れます。離散位相では $A\subseteq X$ の閉包は $A$ 自身なので、$G\subseteq X$ が稠密なら

$$
\overline G=G=X.
$$

従って開かつ稠密な集合は $X$ そのものしかありません。その可算共通部分も $X$ です。よって有限離散空間はBaire空間です。
<!-- definition-example-end -->

---

<a id="thm-top6-baire-category"></a>
<!-- formal-statement-start -->
> **定理（Baireのカテゴリー定理）**  
> 完備距離空間はBaire空間である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(X,d)$ を完備距離空間とし、$G_1,G_2,\dots$ を開かつ稠密な部分集合とします。

$$
G=\bigcap_{n=1}^{\infty}G_n
$$

が稠密であることを示すため、任意の非空開集合 $O\subseteq X$ に対して

$$
O\cap G\ne\varnothing
$$

を示します。

#### 第1段階：最初の閉球を作る

$G_1$ は稠密なので、非空開集合 $O$ と交わり

$$
O\cap G_1\ne\varnothing.
$$

$O\cap G_1$ は開です。点 $x_1\in O\cap G_1$ を一つ取ります。開集合の定義から、ある $\eta_1>0$ が存在して

$$
B(x_1,\eta_1)\subseteq O\cap G_1.
$$

そこで

$$
0<r_1<\min(\eta_1,1/2)
$$

を取れば、閉球

$$
C_1=\overline B(x_1,r_1)
$$

について

$$
C_1\subseteq B(x_1,\eta_1)\subseteq O\cap G_1
$$

となります。

#### 第2段階：閉球を入れ子にする

$C_n=\overline B(x_n,r_n)$ まで作られたとします。開球 $B(x_n,r_n)$ は非空開集合です。$G_{n+1}$ は稠密なので

$$
B(x_n,r_n)\cap G_{n+1}\ne\varnothing.
$$

この交わりは開集合です。そこから点 $x_{n+1}$ を一つ取り、ある $\eta_{n+1}>0$ を

$$
B(x_{n+1},\eta_{n+1})
\subseteq
B(x_n,r_n)\cap G_{n+1}
$$

となるように取ります。さらに

$$
0<r_{n+1}<\min(\eta_{n+1},2^{-(n+1)})
$$

とすれば

$$
C_{n+1}=\overline B(x_{n+1},r_{n+1})
\subseteq
B(x_n,r_n)\cap G_{n+1}
\subseteq C_n.
$$

従って

$$
C_1\supseteq C_2\supseteq\cdots,
\qquad
r_n<2^{-n}
$$

という閉球列を作れます。また

$$
C_1\subseteq O\cap G_1,
\qquad
C_n\subseteq G_n\quad(n\ge1)
$$

です。

ここまでで使ったのは **各 $G_n$ の稠密性と開性** だけです。稠密性が現在の開球との非空な交わりを保証し、開性がその交わりの内部に次の閉球を入れる余地を与えています。

#### 第3段階：中心列がCauchyであることを示す

$m>n$ とします。閉球が入れ子なので

$$
x_m\in C_m\subseteq C_n.
$$

従って

$$
d(x_m,x_n)\le r_n<2^{-n}.
$$

任意の $\varepsilon>0$ に対し $2^{-N}<\varepsilon$ となる $N$ を取れば、$m>n\ge N$ で

$$
d(x_m,x_n)<\varepsilon.
$$

よって $(x_n)$ はCauchy列です。

#### 第4段階：完備性で極限を空間内に作る

ここで初めて完備性を使います。[完備距離空間の定義](../F0_00D_Cauchy列_完備性_無限次元/index.md#def-f0-00d-02)から、ある $x\in X$ が存在して

$$
x_n\to x.
$$

固定した $n$ について、全ての $m\ge n$ で $x_m\in C_n$ です。$C_n$ は閉集合なので、[距離空間における閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)から

$$
x\in C_n.
$$

$n$ は任意だから

$$
x\in\bigcap_{n=1}^{\infty}C_n.
$$

さらに $C_1\subseteq O$ かつ $C_n\subseteq G_n$ なので

$$
x\in O\cap\bigcap_{n=1}^{\infty}G_n.
$$

従って任意の非空開集合 $O$ が $G$ と交わります。ゆえに $G$ は稠密で、$X$ はBaire空間です。$\square$
<!-- proof-end -->

この証明では **コンパクト性を使っていません**。役割分担は次の通りです。

$$
\begin{array}{c|c}
\text{仮定・性質} & \text{証明中の仕事}\\ \hline
G_n\text{ が稠密} & \text{現在の開球と }G_n\text{ を必ず交わらせる}\\
G_n\text{ が開} & \text{交わりの内部に次の閉球を入れる}\\
r_n\to0 & \text{中心列をCauchyにする}\\
X\text{ が完備} & \text{Cauchy列の極限を }X\text{ 内に作る}\\
C_n\text{ が閉} & \text{極限を全ての }C_n\text{ に残す}
\end{array}
$$

---

<a id="cor-top6-complete-not-meagre"></a>
<!-- formal-statement-start -->
> **系（非空完備距離空間は自身の中でmeagreでない）**  
> 非空完備距離空間 $X$ を、$X$ 自身の中で可算個の疎集合の合併として覆うことはできない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反対に

$$
X\subseteq\bigcup_{n=1}^{\infty}A_n
$$

で各 $A_n$ が疎だとします。疎集合の定義から

$$
\operatorname{int}(\overline{A_n})=\varnothing.
$$

従って

$$
G_n=X\setminus\overline{A_n}
$$

は開です。また $G_n$ が稠密であることを確認します。もし $G_n$ が稠密でなければ、ある非空開集合 $U$ が $\overline{A_n}$ と交わらないのではなく、より直接には $\overline{G_n}\ne X$ なので非空開集合 $V=X\setminus\overline{G_n}$ が存在します。$V$ は $G_n$ と交わらないため $V\subseteq\overline{A_n}$ となり、$\operatorname{int}(\overline{A_n})\ne\varnothing$ に反します。よって $G_n$ は稠密です。

[Baireのカテゴリー定理](#thm-top6-baire-category)から

$$
\bigcap_{n=1}^{\infty}G_n
$$

は稠密、特に $X\ne\varnothing$ なので非空です。一方

$$
\begin{aligned}
\bigcap_{n=1}^{\infty}G_n
&=X\setminus\bigcup_{n=1}^{\infty}\overline{A_n}\\
&\subseteq X\setminus\bigcup_{n=1}^{\infty}A_n\\
&=\varnothing,
\end{aligned}
$$

となり矛盾です。$\square$
<!-- proof-end -->

### 2.4 完備性を外すと壊れる：$\mathbb Q$

通常の距離を入れた $\mathbb Q$ を考えます。$\mathbb Q$ は可算なので

$$
\mathbb Q=\{q_1,q_2,\dots\}
$$

と列挙できます。

各一点集合 $\{q_n\}$ は $\mathbb Q$ で閉です。また $\mathbb Q$ には孤立点がないので、一点集合の内部は空です。従って $\{q_n\}$ は $\mathbb Q$ の中で疎です。よって

$$
\mathbb Q=\bigcup_{n=1}^{\infty}\{q_n\}
$$

は自身の中でmeagreです。

同じ事実をBaire空間の定義からも見られます。

$$
G_n=\mathbb Q\setminus\{q_n\}
$$

と置くと、各 $G_n$ は $\mathbb Q$ で開かつ稠密ですが

$$
\bigcap_{n=1}^{\infty}G_n=\varnothing.
$$

従って $\mathbb Q$ はBaire空間ではありません。

そして $\mathbb Q$ は完備でもありません。たとえば $\sqrt2$ へ収束する有理数近似列は $\mathbb Q$ 内ではCauchyですが、その極限 $\sqrt2$ は $\mathbb Q$ に属しません。ここで壊れているのは「稠密開集合」ではなく、**縮小する条件列から作ったCauchy列の極限を空間内へ残す完備性**です。

後続の関数解析では、このBaire原理から一様有界性原理・開写像定理などへ進みます。本章ではそこを先取りせず、Baireそのものの証明境界で止めます。

---

## 3. 点列では閉包を検出できない空間がある

距離空間では点列が非常に強力でした。しかし一般位相では、点列だけを見ていると閉包に入る点を見落とすことがあります。

非可算集合 $I$ を取り

$$
X=\{0,1\}^I
$$

に積位相を入れます。$p\in X$ を全ての座標が1である点

$$
p(i)=1\qquad(i\in I)
$$

とし、有限個の座標だけが1である点全体を

$$
A=\{a\in X:\{i\in I:a(i)=1\}\text{ が有限}\}
$$

とします。

### 3.1 $p$ は $A$ の閉包に入る

$p$ の任意の近傍 $U$ を取ります。積位相の基底の定義から、有限個の座標 $F\subseteq I$ だけを指定する基本開近傍 $B$ を

$$
p\in B\subseteq U
$$

となるように取れます。

$p$ は全座標で1なので、$B$ が要求する有限個の座標を1にし、それ以外を0にした点 $a_F$ を作れば

$$
a_F\in A\cap B\subseteq A\cap U.
$$

従って $p$ の任意の近傍が $A$ と交わり、$p\in\overline A$ です。

### 3.2 しかし $A$ の点列は $p$ へ収束できない

任意の点列 $(a_n)$ を $A$ から取ります。各 $a_n$ の1である座標集合を

$$
S_n=\{i\in I:a_n(i)=1\}
$$

とします。各 $S_n$ は有限なので

$$
S=\bigcup_{n=1}^{\infty}S_n
$$

は可算です。$I$ は非可算なので

$$
i_*\in I\setminus S
$$

を一つ取れます。

すると全ての $n$ について

$$
a_n(i_*)=0,
\qquad p(i_*)=1.
$$

集合

$$
U_* = \{x\in X:x(i_*)=1\}
$$

は積位相の基本開集合で $p$ の近傍ですが、どの $a_n$ も $U_*$ に入りません。従って $(a_n)$ は $p$ に収束しません。

つまり

$$
p\in\overline A
$$

なのに、$A$ の点からなる $p$ への収束点列は存在しません。

ここではコンパクト性もTychonoffの定理も使っていません。**点列の添字が可算であるため、可算個の有限台が触れられる座標も可算個にしかならない**ことが破綻の原因です。

この不足を補うには、「十分後」という概念を自然数順序だけに縛らない収束概念が必要です。

---

<a id="def-top6-directed-set"></a>
<!-- formal-statement-start -->
> **定義（有向集合）**  
> 非空集合 $D$ と二項関係 $\preceq$ の組 $(D,\preceq)$ が **有向集合** であるとは、次を満たすことをいう。
>
> 1. $d\preceq d$ が全ての $d\in D$ で成り立つ。
> 2. $d_1\preceq d_2$ かつ $d_2\preceq d_3$ なら $d_1\preceq d_3$。
> 3. 任意の $d_1,d_2\in D$ に対し、ある $e\in D$ が存在して

$$
d_1\preceq e,
\qquad
d_2\preceq e
$$

> となる。
>
> 反対称性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-directed-set -->
**定義の確認**
### 3.3 自然数と近傍族

$(\mathbb N,\le)$ は有向集合です。二つの自然数 $m,n$ に対して

$$
e=\max(m,n)
$$

を取れば両方より後ろに進めます。

一般の位相空間で点 $x$ の近傍全体を $\mathcal N(x)$ とします。順序を通常の包含と逆向きに

$$
U\preceq V
\quad\Longleftrightarrow\quad
V\subseteq U
$$

と定めると、二つの近傍 $U,V$ に対して $U\cap V$ は再び近傍で

$$
U\preceq U\cap V,
\qquad
V\preceq U\cap V.
$$

従って近傍を「より小さく絞るほど後ろ」と読む有向集合になります。
<!-- definition-example-end -->

<a id="def-top6-net"></a>
<!-- formal-statement-start -->
> **定義（net）**  
> 有向集合 $(D,\preceq)$ から集合 $X$ への写像

$$
x:D\to X,
\qquad d\mapsto x_d
$$

> を $X$ の **net（ネット）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-net -->
**定義の確認**
### 3.4 点列はnetの特別な場合

点列 $(x_n)$ は、有向集合 $(\mathbb N,\le)$ から $X$ への写像

$$
n\mapsto x_n
$$

とみなせます。従ってnetは点列を捨てる概念ではなく、添字集合を自然数より一般化した概念です。
<!-- definition-example-end -->

<a id="def-top6-net-convergence"></a>
<!-- formal-statement-start -->
> **定義（netの収束）**  
> 位相空間 $X$ のnet $(x_d)_{d\in D}$ が $x\in X$ に **収束する** とは、$x$ の任意の近傍 $U$ に対し、ある $d_0\in D$ が存在して

$$
d_0\preceq d
\Longrightarrow
x_d\in U
$$

> となることをいう。このとき $x_d\to x$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-net-convergence -->
**定義の確認**
### 3.5 自然数を添字にすると通常の点列収束へ戻る

$D=\mathbb N$ とすると、$d_0\preceq d$ は $n_0\le n$ です。従ってnet収束の条件は

$$
\forall U\in\mathcal N(x)\ \exists n_0\ \forall n\ge n_0:
 x_n\in U,
$$

となり、通常の位相的な点列収束そのものです。
<!-- definition-example-end -->

---

<a id="thm-top6-closure-net"></a>
<!-- formal-statement-start -->
> **定理（閉包のnetによる特徴付け）**  
> 位相空間 $X$、部分集合 $A\subseteq X$、点 $x\in X$ について、次は同値である。
>
> 1. $x\in\overline A$。
> 2. $A$ の点からなるnetで $x$ に収束するものが存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 閉包に入るなら収束netを作れる

$x\in\overline A$ とします。従って $x$ の任意の近傍 $U$ は $A$ と交わり

$$
A\cap U\ne\varnothing
$$

です。

添字集合を

$$
D=\{(U,a):U\text{ は }x\text{ の近傍},\ a\in A\cap U\}
$$

とします。順序を

$$
(U,a)\preceq(V,b)
\quad\Longleftrightarrow\quad
V\subseteq U
$$

と定めます。後ろへ進むほど近傍を小さくする順序です。

$D$ が有向であることを確認します。$(U,a),(V,b)\in D$ を取ります。$U\cap V$ は $x$ の近傍です。$x\in\overline A$ なので

$$
A\cap U\cap V\ne\varnothing.
$$

従ってある $c\in A\cap U\cap V$ が存在します。このとき

$$
(U\cap V,c)\in D
$$

であり

$$
(U,a)\preceq(U\cap V,c),
\qquad
(V,b)\preceq(U\cap V,c).
$$

反射性・推移性は集合包含の反射性・推移性から従うので、$D$ は有向集合です。

この $D$ 上で

$$
x_{(U,a)}=a
$$

と定めます。全ての値は $A$ に属します。

このnetが $x$ に収束することを示します。$W$ を $x$ の任意の近傍とします。$x\in\overline A$ なので $a_0\in A\cap W$ を一つ取れ、

$$
d_0=(W,a_0)\in D
$$

です。$(W,a_0)\preceq(V,b)$ なら定義から $V\subseteq W$ なので

$$
x_{(V,b)}=b\in V\subseteq W.
$$

従ってnetは最終的に $W$ の中に入り、$x_{(U,a)}\to x$ です。

ここで添字を単に「近傍 $U$」とせず **$(U,a)$ の組** にしたのは重要です。最初に全近傍 $U$ について一点 $a_U\in A\cap U$ を一斉に選ぶ操作を避け、必要な点を添字自身に持たせています。

#### 収束netがあるなら閉包に入る

逆に、$A$ の点からなるnet $(x_d)$ が $x$ に収束するとします。$x\notin\overline A$ と仮定します。

$\overline A$ は閉なので

$$
U=X\setminus\overline A
$$

は $x$ を含む開近傍です。netの収束から、ある $d_0$ 以後で

$$
x_d\in U
$$

となります。

しかしnetの全ての値は $A\subseteq\overline A$ に属するので

$$
x_d\notin U.
$$

矛盾です。従って $x\in\overline A$ です。$\square$
<!-- proof-end -->

点列では失敗した「閉包の点を収束で検出する」が、netでは追加の可算性仮定なしに回復しました。

---

<a id="thm-top6-continuity-net"></a>
<!-- formal-statement-start -->
> **定理（連続性のnetによる特徴付け）**  
> 位相空間 $X,Y$ と写像 $f:X\to Y$ について、次は同値である。
>
> 1. $f$ は連続である。
> 2. 任意のnet $x_d\to x$ に対して

$$
f(x_d)\to f(x)
$$

> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 連続ならnetの極限を保つ

$f$ を連続とし、$x_d\to x$ とします。$V$ を $f(x)$ の任意の近傍とします。近傍の定義から、ある開集合 $O$ が存在して

$$
f(x)\in O\subseteq V.
$$

$f$ は連続なので $f^{-1}(O)$ は $X$ の開集合で、$x$ を含みます。従って $f^{-1}(O)$ は $x$ の近傍です。

$x_d\to x$ だから、ある $d_0$ 以後で

$$
x_d\in f^{-1}(O).
$$

従って

$$
f(x_d)\in O\subseteq V.
$$

$V$ は任意なので $f(x_d)\to f(x)$ です。

#### 全てのnetの極限を保つなら連続

逆に、全ての収束netについて極限を保つと仮定し、$f$ が連続でないと仮定します。

連続性の否定から、ある開集合 $V\subseteq Y$ が存在して $f^{-1}(V)$ が開ではありません。従ってある

$$
x\in f^{-1}(V)
$$

について、$f^{-1}(V)$ は $x$ の近傍ではありません。実際、もし $f^{-1}(V)$ の各点がその中に含まれる開近傍を持てば、$f^{-1}(V)$ はそれらの開近傍の合併として開になってしまいます。

$f^{-1}(V)$ が $x$ の近傍でないので、$x$ の任意の近傍 $U$ に対して

$$
U\not\subseteq f^{-1}(V).
$$

従って

$$
U\setminus f^{-1}(V)\ne\varnothing.
$$

そこで

$$
D=\{(U,a):U\text{ は }x\text{ の近傍},\ a\in U\setminus f^{-1}(V)\}
$$

と置き、前の定理と同じく

$$
(U,a)\preceq(W,b)
\quad\Longleftrightarrow\quad
W\subseteq U
$$

と定めます。二つの近傍の共通部分も近傍で、そこにも $f^{-1}(V)$ の外の点が存在するため、同じ計算で $D$ は有向集合です。

netを

$$
x_{(U,a)}=a
$$

と定めます。任意の近傍 $W$ に対し $(W,a_0)$ を一つ取れば、それ以後の値は全て $W$ に入るので

$$
x_{(U,a)}\to x.
$$

しかし全ての添字について

$$
x_{(U,a)}\notin f^{-1}(V),
$$

従って

$$
f(x_{(U,a)})\notin V.
$$

一方 $x\in f^{-1}(V)$ なので $f(x)\in V$ であり、$V$ は $f(x)$ の開近傍です。従って $f(x_{(U,a)})$ は $f(x)$ に収束できません。これは「全ての収束netの極限を保つ」という仮定に反します。

よって $f$ は連続です。$\square$
<!-- proof-end -->

この逆向きでは、連続性の失敗点 $x$ の **全ての近傍** を添字として使いました。自然数だけで近傍を追い切れる保証がない一般位相で、netが点列より強い理由がここに現れています。

---

## 4. filter：点ではなく「最終的に入る集合」を記録する

netは「どの点を順に通るか」を持っています。filterは点の並びを捨て、最終的にどの集合の中にいるかだけを記録します。

<a id="def-top6-filter"></a>
<!-- formal-statement-start -->
> **定義（filter）**  
> 集合 $X$ 上の部分集合族 $\mathcal F\subseteq\mathcal P(X)$ が **filter（フィルター）** であるとは、次を満たすことをいう。
>
> 1. $\mathcal F\ne\varnothing$ かつ $\varnothing\notin\mathcal F$。
> 2. $A,B\in\mathcal F$ なら $A\cap B\in\mathcal F$。
> 3. $A\in\mathcal F$ かつ $A\subseteq B\subseteq X$ なら $B\in\mathcal F$。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-filter -->
**定義の確認**
### 4.1 一点から作るfilter

$x\in X$ を固定し

$$
\mathcal F_x=\{A\subseteq X:x\in A\}
$$

と置きます。

$X\in\mathcal F_x$ なので非空で、$x\notin\varnothing$ だから $\varnothing\notin\mathcal F_x$ です。$A,B$ がともに $x$ を含めば $A\cap B$ も $x$ を含みます。また $A$ が $x$ を含み $A\subseteq B$ なら $B$ も $x$ を含みます。従って $\mathcal F_x$ はfilterです。
<!-- definition-example-end -->

<a id="def-top6-filter-convergence"></a>
<!-- formal-statement-start -->
> **定義（filterの収束）**  
> 位相空間 $X$ 上のfilter $\mathcal F$ が $x\in X$ に **収束する** とは、$x$ の任意の近傍 $U$ が

$$
U\in\mathcal F
$$

> を満たすことをいう。このとき $\mathcal F\to x$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top6-filter-convergence -->
**定義の確認**
### 4.2 一点filterはその点に収束する

上の

$$
\mathcal F_x=\{A\subseteq X:x\in A\}
$$

を考えます。$x$ の近傍は定義上 $x$ を含むので、任意の近傍 $U$ について $U\in\mathcal F_x$ です。従って

$$
\mathcal F_x\to x.
$$
<!-- definition-example-end -->

---

<a id="thm-top6-net-filter-correspondence"></a>
<!-- formal-statement-start -->
> **定理（netとfilterの収束対応）**  
> 1. $X$ のnet $(x_d)_{d\in D}$ に対し

$$
\mathcal F_{(x_d)}
=
\left\{A\subseteq X:
\exists d_0\ \forall d\succeq d_0,\ x_d\in A
\right\}
$$

> と置くと、$\mathcal F_{(x_d)}$ はfilterである。さらに

$$
x_d\to x
\Longleftrightarrow
\mathcal F_{(x_d)}\to x.
$$

> 2. 逆に、任意のfilter $\mathcal F$ から、その「最終的に入る集合」のfilterがちょうど $\mathcal F$ になるnetを構成できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### netからfilterを作る

まず $X\in\mathcal F_{(x_d)}$ は明らかなのでこの集合族は非空です。どの添字以後でも $x_d\in\varnothing$ とはならないため

$$
\varnothing\notin\mathcal F_{(x_d)}.
$$

$A,B\in\mathcal F_{(x_d)}$ とします。ある $d_A,d_B$ が存在して

$$
d\succeq d_A\Rightarrow x_d\in A,
\qquad
d\succeq d_B\Rightarrow x_d\in B
$$

です。$D$ は有向なので、ある $e$ が存在して

$$
e\succeq d_A,
\qquad e\succeq d_B.
$$

$d\succeq e$ なら推移性から $d\succeq d_A,d_B$ なので

$$
x_d\in A\cap B.
$$

従って $A\cap B\in\mathcal F_{(x_d)}$ です。

また $A\in\mathcal F_{(x_d)}$ かつ $A\subseteq B$ なら、$x_d$ が最終的に $A$ に入る同じ添字以後で $B$ にも入るので $B\in\mathcal F_{(x_d)}$ です。よって $\mathcal F_{(x_d)}$ はfilterです。

次に収束を比較します。$x_d\to x$ であることは、$x$ の任意の近傍 $U$ について $x_d$ が最終的に $U$ に入ることです。これは定義から

$$
U\in\mathcal F_{(x_d)}
$$

と同値です。従って

$$
x_d\to x
\Longleftrightarrow
\mathcal F_{(x_d)}\to x.
$$

#### filterからnetを作る

今度はfilter $\mathcal F$ を取ります。添字集合を

$$
D_{\mathcal F}
=
\{(A,a):A\in\mathcal F,\ a\in A\}
$$

とします。$\varnothing\notin\mathcal F$ なので、$\mathcal F$ の各要素は非空です。また $\mathcal F\ne\varnothing$ なので $D_{\mathcal F}\ne\varnothing$ です。

順序を

$$
(A,a)\preceq(B,b)
\quad\Longleftrightarrow\quad
B\subseteq A
$$

と定めます。$(A,a),(B,b)$ を二つ取ると、filterの有限交差条件から

$$
A\cap B\in\mathcal F.
$$

しかも $\varnothing\notin\mathcal F$ なので $A\cap B\ne\varnothing$ です。従って $c\in A\cap B$ を一つ取れ、

$$
(A\cap B,c)
$$

が両方の上界になります。よって $D_{\mathcal F}$ は有向集合です。

netを

$$
x_{(A,a)}=a
$$

と定めます。このnetの最終filterが $\mathcal F$ と一致することを両包含で示します。

まず $C\in\mathcal F$ とします。$c\in C$ を一つ取り $d_0=(C,c)$ とします。$(C,c)\preceq(B,b)$ なら $B\subseteq C$ なので

$$
x_{(B,b)}=b\in B\subseteq C.
$$

従ってnetは最終的に $C$ に入り

$$
C\in\mathcal F_{(x_d)}.
$$

よって

$$
\mathcal F\subseteq\mathcal F_{(x_d)}.
$$

逆に $S\in\mathcal F_{(x_d)}$ とします。ある $d_0=(A_0,a_0)$ 以後で全てのnetの値が $S$ に入るとします。

任意の $y\in A_0$ に対し $(A_0,y)\in D_{\mathcal F}$ であり

$$
(A_0,a_0)\preceq(A_0,y)
$$

です。従って最終性から

$$
y=x_{(A_0,y)}\in S.
$$

$y$ は任意なので

$$
A_0\subseteq S.
$$

$A_0\in\mathcal F$ かつfilterは上方閉なので $S\in\mathcal F$ です。従って

$$
\mathcal F_{(x_d)}\subseteq\mathcal F.
$$

以上から

$$
\mathcal F_{(x_d)}=\mathcal F.
$$

$\square$
<!-- proof-end -->

netとfilterは別々の魔法ではありません。

- net：点をどの順序で通るかを保持する。
- filter：最終的に入る集合だけを保持する。

上の定理は、その収束情報が相互に変換できることを示しています。

### 4.3 本章で扱わない境界

コンパクト性には「netの収束部分net」や ultrafilter を用いた特徴付けもあります。しかし、そこでは subnet の定義や ultrafilter の拡張原理など新しい道具が必要です。本章ではそれらを無言で使わず、**閉包・連続性・net/filter対応まで**を一般位相の収束コアとして確立して止めます。

---

## 5. 仮定の役割を横断して整理する

$$
\begin{array}{c|c|c}
\text{結果} & \text{必要な主構造} & \text{核心操作}\\ \hline
\text{全有界性}\iff\text{Cauchy部分列抽出} & \text{距離} & \text{有限球被覆を尺度ごとに反復}\\
\text{compact}\iff\text{complete + totally bounded} & \text{距離} & \text{Cauchy抽出 + 完備化}\\
\text{Baireのカテゴリー定理} & \text{完備距離} & \text{縮小閉球の中心列を完備性で収束}\\
\text{閉包のnet特徴付け} & \text{位相のみ} & \text{全近傍を有向化}\\
\text{連続性のnet特徴付け} & \text{位相のみ} & \text{連続性失敗点の全近傍を有向化}\\
\text{net/filter対応} & \text{集合 + 位相} & \text{最終的に入る集合を抽出}
\end{array}
$$

特に次を混同しないでください。

- 全有界性だけではCauchy部分列は得られても、その極限が空間内にあるとは限らない。
- 完備性だけでは無限離散空間のように、列からCauchy部分列を抽出できない場合がある。
- Baireのカテゴリー定理はコンパクト性の定理ではない。完備性が働く。
- net/filterの定義に距離・完備性・Hausdorff性は不要である。
- 点列で閉包を検出できないことは、点列の定義が誤っているのではなく、添字が可算であることの限界である。

---

## 6. 演習

### Level A

<a id="ex-top6-a01"></a>
#### TOP6-A01 $(0,1)$ の全有界性
- Level: A

通常の距離を入れた $(0,1)$ が全有界であることを、任意の $\varepsilon>0$ に対して有限個の中心を具体的に作って示せ。

<!-- solution-start -->
**解答・解説**：$N\in\mathbb N$ を $1/N<\varepsilon$ となるように取ります。区間

$$
I_j=((j-1)/N,j/N)\cap(0,1)
\qquad(j=1,\dots,N)
$$

のうち非空なものから一点 $p_j$ を選びます。同じ $I_j$ に属する任意の $x$ と $p_j$ の距離は $1/N<\varepsilon$ なので

$$
I_j\subseteq B(p_j,\varepsilon).
$$

有限個の $I_j$ が $(0,1)$ を覆うため、対応する有限個の $\varepsilon$ 球が $(0,1)$ を覆います。完備性は使っていません。
<!-- solution-end -->

<a id="ex-top6-a02"></a>
#### TOP6-A02 無限離散距離空間
- Level: A

無限集合に離散距離を入れた空間が完備だが全有界でないことを示せ。

<!-- solution-start -->
**解答・解説**：Cauchy列に $\varepsilon=1/2$ を適用すると、十分後の二項間距離が $1/2$ 未満になります。離散距離は異なる点なら1なので、十分後の項は全て同一点です。従って列は収束し、空間は完備です。一方 $1/2$ 球は一点集合なので、無限集合を有限個では覆えません。従って全有界ではありません。
<!-- solution-end -->

<a id="ex-top6-a03"></a>
#### TOP6-A03 疎集合かを判定する
- Level: A

通常の $\mathbb R$ で $\mathbb Z$ が疎集合であることを示せ。

<!-- solution-start -->
**解答・解説**：$\mathbb Z$ は $\mathbb R$ で閉なので $\overline{\mathbb Z}=\mathbb Z$ です。任意の整数 $n$ の周りのどんな開区間も非整数を含むため、$\mathbb Z$ は非空開区間を含みません。従って

$$
\operatorname{int}(\overline{\mathbb Z})
=\operatorname{int}(\mathbb Z)
=\varnothing.
$$

よって $\mathbb Z$ は疎です。
<!-- solution-end -->

<a id="ex-top6-a04"></a>
#### TOP6-A04 点列をnetとして読む
- Level: A

$(x_n)$ を位相空間 $X$ の点列とする。$(\mathbb N,\le)$ を有向集合とみなしたとき、netの収束定義が通常の点列収束定義と一致することを示せ。

<!-- solution-start -->
**解答・解説**：net収束は、任意の近傍 $U$ に対しある $n_0$ が存在して

$$
n\ge n_0\Longrightarrow x_n\in U
$$

となることです。これは位相空間における点列収束の「十分大きい全ての添字で近傍に入る」という定義そのものです。有向集合の一般化では、この $n\ge n_0$ だけが $d\succeq d_0$ に置き換わります。
<!-- solution-end -->

<a id="ex-top6-a05"></a>
#### TOP6-A05 一点filter
- Level: A

$x\in X$ に対し

$$
\mathcal F_x=\{A\subseteq X:x\in A\}
$$

がfilterであり、任意の位相を入れた $X$ で $x$ に収束することを確認せよ。

<!-- solution-start -->
**解答・解説**：$X\in\mathcal F_x$、$\varnothing\notin\mathcal F_x$ です。$x\in A,B$ なら $x\in A\cap B$、また $x\in A\subseteq B$ なら $x\in B$ なのでfilterの三条件を満たします。さらに $x$ の任意の近傍 $U$ は $x\in U$ を満たすため $U\in\mathcal F_x$ です。従って $\mathcal F_x\to x$ です。
<!-- solution-end -->

### Level B

<a id="ex-top6-b01"></a>
#### TOP6-B01 全有界なら有界
- Level: B

全有界な距離空間が有界であることを示せ。

<!-- solution-start -->
**解答・解説**：半径1の有限球被覆

$$
X\subseteq\bigcup_{j=1}^mB(p_j,1)
$$

を取ります。中心 $p_1$ を固定し

$$
R=1+\max_{1\le j\le m}d(p_j,p_1)
$$

と置きます。任意の $x\in X$ はある $B(p_j,1)$ に入るので、[距離・距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)の第三条件から

$$
d(x,p_1)
\le d(x,p_j)+d(p_j,p_1)
<R.
$$

従って $X\subseteq B(p_1,R)$ で有界です。逆向きは無限離散距離空間が反例です。
<!-- solution-end -->

<a id="ex-top6-b02"></a>
#### TOP6-B02 $\mathbb Q$ がBaireでないことを直接示す
- Level: B

通常の位相を入れた $\mathbb Q$ がBaire空間でないことを、開かつ稠密な集合列を具体的に作って示せ。

<!-- solution-start -->
**解答・解説**：$\mathbb Q=\{q_1,q_2,\dots\}$ と列挙し

$$
G_n=\mathbb Q\setminus\{q_n\}
$$

とします。一点集合は $\mathbb Q$ で閉なので $G_n$ は開です。$\mathbb Q$ には孤立点がないため、任意の非空開集合は $q_n$ 以外の有理数も含み、$G_n$ と交わります。従って $G_n$ は稠密です。しかし

$$
\bigcap_{n=1}^{\infty}G_n=\varnothing.
$$

よって $\mathbb Q$ はBaire空間ではありません。
<!-- solution-end -->

<a id="ex-top6-b03"></a>
#### TOP6-B03 閉包を点列で検出できない例
- Level: B

非可算 $I$、積空間 $X=\{0,1\}^I$、有限台点全体 $A$、全1点 $p$ を本文と同じように取る。$p\in\overline A$ だが $A$ の点列で $p$ に収束するものがないことを再構成せよ。

<!-- solution-start -->
**解答・解説**：$p$ の基本近傍は有限個の座標しか指定しないので、その有限個だけ1、残りを0とした有限台点が近傍内にあります。従って全近傍が $A$ と交わり $p\in\overline A$ です。

一方、点列 $(a_n)$ の各有限台 $S_n$ の合併 $S=\bigcup_nS_n$ は可算です。非可算な $I$ から $i_*\notin S$ を取ると、全ての $a_n(i_*)=0$ ですが $p(i_*)=1$ です。したがって開近傍 $\{x:x(i_*)=1\}$ に点列の項が一つも入らず、$a_n\not\to p$ です。
<!-- solution-end -->

### Level C

<a id="ex-top6-c01"></a>
#### TOP6-C01 閉包をfilterで特徴付ける
- Level: C

位相空間 $X$、$A\subseteq X$、$x\in X$ に対し、次が同値であることを示せ。

1. $x\in\overline A$。
2. $A\in\mathcal F$ かつ $\mathcal F\to x$ となるfilter $\mathcal F$ が存在する。

<!-- solution-start -->
**解答・解説**：まず $x\in\overline A$ とします。次の集合族を考えます。

$$
\mathcal F
=
\{B\subseteq X:\text{ある }x\text{ の近傍 }U\text{ が存在して }A\cap U\subseteq B\}.
$$

$x\in\overline A$ なので全ての近傍 $U$ について $A\cap U\ne\varnothing$ です。従って $\varnothing\notin\mathcal F$ です。一方 $A\cap X=A\subseteq A$ だから $A\in\mathcal F$、従って $\mathcal F\ne\varnothing$ です。

$B_1,B_2\in\mathcal F$ なら近傍 $U_1,U_2$ が存在して

$$
A\cap U_i\subseteq B_i.
$$

$U_1\cap U_2$ も近傍で

$$
A\cap(U_1\cap U_2)
\subseteq B_1\cap B_2,
$$

だから $B_1\cap B_2\in\mathcal F$ です。上方閉性は定義から直ちに従います。よって $\mathcal F$ はfilterです。

任意の $x$ の近傍 $U$ について

$$
A\cap U\subseteq U
$$

なので $U\in\mathcal F$ です。従って $\mathcal F\to x$ です。

逆に $A\in\mathcal F$ かつ $\mathcal F\to x$ とします。任意の $x$ の近傍 $U$ は $U\in\mathcal F$ です。filterの有限交差条件から

$$
A\cap U\in\mathcal F.
$$

$\varnothing\notin\mathcal F$ なので $A\cap U\ne\varnothing$ です。よって $x$ の全近傍が $A$ と交わり、$x\in\overline A$ です。
<!-- solution-end -->

---

## 7. 章末チェック

この章を終えた時点で、次を本文なしで再構成できるか確認してください。

1. 全有界性の量化 $\forall\varepsilon\,\exists\text{有限個の球}$ を正確に言える。
2. 全有界性からCauchy部分列を作るとき、「有限個の球の一つに無限個残る」を尺度ごとに反復できる。
3. compact $\Leftrightarrow$ complete + totally bounded で、全有界性と完備性が別々に何を担当するか説明できる。
4. Baire証明で、稠密性・開性・半径の縮小・完備性・閉球の閉性がそれぞれどこで使われるか説明できる。
5. $\mathbb Q$ がBaireでない例で、どの完備性が失われているか説明できる。
6. 非可算積の有限台点の例で、なぜ点列が全座標を追えないか説明できる。
7. 閉包から収束netを作るとき、なぜ添字を $(U,a)$ の組にすると全近傍からの一斉選択を避けられるか説明できる。
8. 連続性が失敗した点の全近傍から、連続性を破るnetをどう作るか説明できる。
9. netから作る「最終filter」のfilter公理を、有向性を使って証明できる。
10. filterから作るnetの最終filterが元のfilterと一致することを、両包含で示せる。

TOP6の狙いは用語を増やすことではありません。**有限化には距離、極限の存在には完備性、一般位相の収束検出には有向化**という三つの役割を分離して使えるようになることです。
