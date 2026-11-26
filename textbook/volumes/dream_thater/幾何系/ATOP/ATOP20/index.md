# ATOP20 Mayer–Vietoris完全列

[ATOP19の小さい鎖によるホモロジー同型](../ATOP19/index.md#thm-atop19-small-chain-isomorphism) によって、開被覆の一つの領域に収まる単体だけで空間全体のホモロジーを計算できるようになりました。しかし、領域を二つ選んだ場合、それぞれのホモロジー群を足すだけでは全体の穴を捉えられません。円周を二つの開いた弧で覆うと、どちらも可縮なのに円周には1次の穴があります。

共通部分に着目します。円周を反時計回りに一周する鎖を二つの弧に沿う鎖に分けると、各鎖の境界は共通部分にあり、互いに相殺します。この境界を取り出して、全体にある穴を共通部分の低い次数の情報へ移すのが本講の目的です。係数は整数、負次数の通常の鎖群・ホモロジー群は零とします。

## 1. 二領域の鎖を貼り合わせる

位相空間 $X$ を開集合 $U,V$ で覆い、$W=U\cap V$ とします。$C_n(Y)$ は部分空間 $Y$ の整数係数の [特異鎖群](../ATOP16/index.md#def-atop16-singular-chains) です。[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) $\partial_n:C_n(Y)\to C_{n-1}(Y)$ は次数が明らかなとき $\partial$ と略し、$\partial^2$ は連続する二次数の境界の合成を表します。点 $x$ に対応する特異0単体は $\langle x\rangle$ と書きます。包含による [特異鎖の誘導準同型](../ATOP16/index.md#def-atop16-induced-chain-map) は自由基底の単体をそのまま別の単体として扱う単射なので、各鎖群を $C_n(X)$ の部分群とみなします。

[小さい鎖の複体](../ATOP19/index.md#def-atop19-small-chains) をこの被覆について $D_*$ と書きます。各基底単体の像が $U$ または $V$ に収まることから

$$
D_n=C_n(U)+C_n(V).
$$

両方の鎖群に属する鎖は、自由基底での非零係数の単体がすべて双方に属するので、

$$
C_n(U)\cap C_n(V)=C_n(W).
$$

和が零になる二つの鎖は、同じ共通部分の鎖を互いに反対符号で持つ場合に限られます。この関係を [短完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-short-exact) に表します。ここでは可換群（整数加群）を扱うので、[短完全列の特徴づけ](../../../基礎論系/CATB/CATB1-05/index.md#thm-catb1-05-short-exact-test) により、左の写像の単射性、中央での像と核の一致、右の写像の全射性を調べれば十分です。$\oplus$ は成分ごとに加法を取る直和です。

<a id="thm-atop20-small-chain-sequence"></a>

<!-- formal-statement-start -->
> **定理（二領域の小さい鎖の短完全列）**
> $X=U\cup V$ を位相空間の二つの開部分集合による被覆とし、$W=U\cap V$ とする。$D_*$ をこの被覆の小さい鎖の複体とする。各次数で次の列は完全であり、写像は境界作用素と可換である。

$$
0\longrightarrow C_n(W)
\xrightarrow{a} C_n(U)\oplus C_n(V)
\xrightarrow{b}D_n\longrightarrow0.
$$

$$
a(c)=(c,-c),\qquad b(u,v)=u+v.
$$
<!-- formal-statement-end -->

写像 $a$ の負号は、共通部分の鎖が二重に数えられたときに打ち消すためのものです。

<!-- proof-start -->
### 証明

$a(c)=0$ なら第1成分から $c=0$ なので単射です。$b(a(c))=c-c=0$ です。逆に $b(u,v)=0$ なら $u=-v$ であり、上の共通部分の鎖群の等式から $u\in C_n(W)$ です。従って $(u,v)=a(u)$ となり、$\ker b=\operatorname{im}a$ です。$D_n$ の定義から任意の鎖は $u+v$ に分けられるので $b$ は全射です。

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) は加法的で、各面は元の単体が入る領域に入ります。従って

$$
\partial a(c)=(\partial c,-\partial c)=a(\partial c),
$$

$$
\partial b(u,v)=\partial u+\partial v=b(\partial u,\partial v).
$$

以上から鎖複体の短完全列が得られます。
<!-- proof-end -->

例えば $X=[0,1]$、$U=[0,3/4)$、$V=(1/4,1]$ とします。点 $q=1/2$ の0単体を $\langle q\rangle$ と書けば、$(\langle q\rangle,-\langle q\rangle)$ は和が零であり、$a(\langle q\rangle)$ です。一方 $0$ の0単体は $U$ にだけ属するので、$(\langle0\rangle,0)$ は $b$ によって零になりません。

## 2. 全体のサイクルから共通部分のサイクルへ

$n\ge1$ とします。[特異サイクルと特異境界鎖](../ATOP16/index.md#def-atop16-singular-cycles) の定義に従い、境界が零である小さい $n$ サイクル $z$ を $z=u+v$ と分解します。$\partial z=0$ だから $\partial u=-\partial v$ です。従って両者の境界は共通部分 $W$ にあり、さらに二重境界は零です。

例えば円周の右半分を南から北へ進む道を $u$、左半分を北から南へ戻る道を $v$ とすると、境界は北を $p$、南を $q$ として次のように相殺します。

| 鎖 | 進む向き | 境界 |
| --- | --- | --- |
| $u$ | $q$ → $p$ | $\langle p\rangle-\langle q\rangle$ |
| $v$ | $p$ → $q$ | $\langle q\rangle-\langle p\rangle$ |
| $z=u+v$ | 一周 | $0$ |

[特異ホモロジー群](../ATOP16/index.md#def-atop16-singular-homology) $H_n(Y)$ では、サイクル $z$ の類 $[z]$ は境界鎖を加えても変わりません。この境界を共通部分のホモロジー類として取り出し、次数を一つ下げる接続準同型を構成します。

<a id="thm-atop20-connecting"></a>

<!-- formal-statement-start -->
> **定理（Mayer–Vietoris接続準同型）**
> 位相空間 $X$ の開被覆 $X=U\cup V$ と $W=U\cap V$ を取る。整数係数で $n\ge1$ とする。$[z]\in H_n(X)$ の小さいサイクル代表元を $z=u+v$ と分解する。ただし $u\in C_n(U)$、$v\in C_n(V)$ とする。このとき

$$
\delta_n:H_n(X)\to H_{n-1}(W),
\qquad \delta_n[z]=[\partial u]
$$

> は代表元と分解に依存しない群準同型である。次数0では $\delta_0$ を零群への零写像とする。
<!-- formal-statement-end -->

符号は第1領域の境界を取る規約です。小さい代表元の存在とその代表元同士の比較には [小さい鎖によるホモロジー同型](../ATOP19/index.md#thm-atop19-small-chain-isomorphism) を用います。

<!-- proof-start -->
### 証明

まず $\partial u=-\partial v$ から $\partial u\in C_{n-1}(W)$ です。[特異鎖の二重境界の消滅](../ATOP16/index.md#thm-atop16-singular-boundary-square) よりこれはサイクルです。

同じ $z$ の別の分解を $z=u'+v'$ とすると

$$
u'-u=v-v'\in C_n(W).
$$

従って $\partial u'-\partial u=\partial(u'-u)$ は $W$ の境界です。

次に同じホモロジー類を表す小さいサイクル $z,z'$ を取ります。[小さい鎖によるホモロジー同型](../ATOP19/index.md#thm-atop19-small-chain-isomorphism) の単射性により、$z'-z=\partial d$ を満たす $d\in D_{n+1}$ が存在します。$d=s+t$ と領域別に分けると、

$$
z'=(u+\partial s)+(v+\partial t).
$$

この分解を使えば $\partial(u+\partial s)=\partial u$ です。先に示した分解非依存性から任意の分解でも同じ類が得られます。

同型の全射性により全ての $[z]$ に小さい代表元があり、二つの代表元の和には各領域の成分の和を使えます。境界の加法性から $\delta_n$ も加法的です。
<!-- proof-end -->

円周の例では $\delta_1[z]=[\langle p\rangle-\langle q\rangle]$ です。共通部分の二つの点が異なる道連結成分にあれば、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) によりこの差は非零になります。

## 3. 完全列と三つの位置の意味

$W$ から $U,V$ への包含を $i,j$、$U,V$ から $X$ への包含を $k,l$ と書きます。[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) $H_n(f)$ を、次数が文脈から決まるとき $f_*$ と略します。鎖を包含で同一視しているので、例えば $i_*[c]=[c]$ ですが、左辺の入力の類は $W$、右辺の類は $U$ で取ります。第1節の $a,b$ に対応するホモロジー上の写像を

$$
a_*(\xi)=(i_*\xi,-j_*\xi),
\qquad b_*(\alpha,\beta)=k_*\alpha+l_*\beta
$$

と書きます。各位置で前の写像の像が次の写像の核に一致することが、可換群における [完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-exact) の条件です。

<a id="thm-atop20-mayer-vietoris"></a>

<!-- formal-statement-start -->
> **定理（Mayer–Vietoris完全列）**
> 位相空間 $X$ の開被覆 $X=U\cup V$ と $W=U\cap V$ に対し、整数係数の次の列は完全である。各 $n\ge1$ で

$$
\cdots\to H_n(W)
\xrightarrow{a_*} H_n(U)\oplus H_n(V)
\xrightarrow{b_*} H_n(X)
$$

$$
\xrightarrow{\delta_n}H_{n-1}(W)
\xrightarrow{a_*}H_{n-1}(U)\oplus H_{n-1}(V)
\to\cdots
$$

> 写像 $a_*$ は包含 $W\hookrightarrow U,V$ の誘導写像の対 $(i_*,-j_*)$、$b_*$ は包含 $U,V\hookrightarrow X$ の誘導写像の和である。接続準同型 $\delta_n$ は小さい代表元 $z=u+v$ に対する $[\partial u]$ である。末端は

$$
H_0(W)\xrightarrow{a_*}H_0(U)\oplus H_0(V)
\xrightarrow{b_*}H_0(X)\to0.
$$
<!-- formal-statement-end -->

[二領域の小さい鎖の短完全列](#thm-atop20-small-chain-sequence) によって鎖レベルで失われた情報を共通部分に戻せます。ホモロジー上では、境界を加えて代表元を変える操作が必要です。以下の三箇所をそれぞれ確認すれば全次数の完全性が従います。

<!-- proof-start -->
### 証明

**領域別の群での完全性。** サイクル $c\in C_n(W)$ は $a_*$ により $([c],[-c])$ に移り、和は零です。逆に $u,v$ を各領域のサイクルとし、$H_n(X)$ で $[u+v]=0$ と仮定します。[小さい鎖によるホモロジー同型](../ATOP19/index.md#thm-atop19-small-chain-isomorphism) の単射性から $u+v=\partial(s+t)$ となる $s\in C_{n+1}(U)$、$t\in C_{n+1}(V)$ が取れます。

$$
c=u-\partial s=-(v-\partial t).
$$

従って $c\in C_n(W)$ であり、$\partial c=\partial u-\partial^2s=0$ です。各領域で境界を引いただけなので $[u]=[c]$、$[v]=[-c]$ です。これで $\ker b_*=\operatorname{im}a_*$ が示されました。

**全体の群での完全性。** $b_*$ の像では $u,v$ がサイクルなので、[Mayer–Vietoris接続準同型](#thm-atop20-connecting) の値は零です。逆に $[z]$ が接続の核に属するとし、小さい代表元を $z=u+v$ と分解します。$\delta_n[z]=0$ とは $\partial u=\partial c$ となる $c\in C_n(W)$ があることです。

$$
\partial(u-c)=0,\qquad
\partial(v+c)=0.
$$

第2式は $\partial v=-\partial u=-\partial c$ から従います。両者の和は $z$ のままです。従って $[z]$ は $b_*$ の像です。$n=0$ では全ての0鎖の境界が零なので、どの小さい代表元もそのまま二つの0サイクルへ分けられ、$b_*$ は全射です。

**共通部分の群での完全性。** $\delta_n[z]=[\partial u]$ は $U$ では $u$ の境界、$V$ では $-v$ の境界なので $a_*$ の核に入ります。逆に $c\in C_{n-1}(W)$ をサイクルとし、$a_*[c]=0$ と仮定します。両領域で $[c]=0$ であることから

$$
\partial u=c,\qquad \partial v=-c
$$

となる $u\in C_n(U)$、$v\in C_n(V)$ を選べます。$z=u+v$ は小さいサイクルであり、$\delta_n[z]=[c]$ です。よって $\ker a_*=\operatorname{im}\delta_n$ が従います。

各位置で核と像が一致し、0次末端も含めて列は完全です。
<!-- proof-end -->

この定理では、開被覆の代わりに部分集合の内部が $X$ を覆うという仮定でも同じ証明が成立します。鎖の短完全列だけでは開性を使いませんが、$D_*$ と $C_*(X)$ のホモロジー同型を得るには [小さい鎖によるホモロジー同型](../ATOP19/index.md#thm-atop19-small-chain-isomorphism) の仮定が必要です。ここでは同定理で $A=\varnothing$ とし、開集合 $U,V$ はそれぞれ自身が内部なので仮定を満たします。

## 4. 円周と高次元球面

### 円周

$S^1$ を単位円周とし、$U$ は左端 $(-1,0)$ を除いた円周、$V$ は右端 $(1,0)$ を除いた円周とします。両者は開で、和は全円周です。角度座標により各領域は開区間と同相です。例えば $U$ は角度 $-\pi<\theta<\pi$ で表せ、$\theta$ を $(1-t)\theta$ に変える連続変形（$0\le t\le1$）で一点に縮みます。$V$ は円周を半回転させた領域なので同様に可縮です。$W$ は上半円と下半円（端点を除く）の二成分で、各成分も開区間です。

[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) より各領域の正次数の群は零です。共通部分の鎖も二つの成分に分かれます。特異単体の定義域は道連結なので、その像は必ず一成分に収まります。境界も成分を保存するため、鎖群・サイクル群・境界群は成分別の直和となります。従って $W$ の正次数の群も零です。

[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により、$H_0(W)=\mathbb Z^2$ と $H_0(U)\oplus H_0(V)=\mathbb Z^2$ を得ます。上、下の成分をこの順で基底に取ると

$$
a_*(x,y)=(x+y,-x-y).
$$

[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) の該当部分は

$$
0\to H_1(S^1)\xrightarrow{\delta_1}\mathbb Z^2
\xrightarrow{a_*}\mathbb Z^2.
$$

従って $\delta_1$ は核への同型であり、

$$
\ker a_*=\{(t,-t):t\in\mathbb Z\}.
$$

右側の半円を南から北へ進み、左側の半円を北から南へ戻る2本の特異1単体の和は、上の開被覆に従属するサイクルです。接続の値は $(1,-1)$ なのでこのサイクルの類は生成元です。$n\ge2$ では $H_n(U)\oplus H_n(V)$ と $H_{n-1}(W)$ が零なので $H_n(S^1)=0$ です。[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) より円周は道連結なので $H_0(S^1)=\mathbb Z$ です。

### 球面

整数 $m\ge2$ に対し $S^m$ を $\mathbb R^{m+1}$ の単位球面とし、最後の座標を $h$ と書きます。広げた二つの半球

$$
U=\{h>-1/2\},\qquad V=\{h<1/2\}
$$

を使います。どちらも開で和は全体です。それぞれ反対側の極を射影中心とする立体射影を用いると、開球と同相です。具体的に $U$ 上で $(x,h)\mapsto x/(1+h)$ とすると、逆写像は

$$
y\mapsto\left(\frac{2y}{1+\|y\|^2},
\frac{1-\|y\|^2}{1+\|y\|^2}\right).
$$

ここで $x,y\in\mathbb R^m$ です。球面上では $\|x\|^2=1-h^2$ なので

$$
\|y\|^2=\frac{1-h^2}{(1+h)^2}=\frac{1-h}{1+h}.
$$

$1+h>0$ より $h>-1/2$ は $\|y\|^2<3$ と同値です。逆写像の最後の成分を $h$ とすれば $1+h=2/(1+\|y\|^2)$ であり、第1成分をこれで割ると $y$ に戻ります。逆向きの合成でも上のノルムの式を代入すれば $(x,h)$ に戻ります。開球内で $y$ を $(1-t)y$（$0\le t\le1$）に変えれば一点に縮みます。$V$ は $h$ の符号反転から同様に可縮です。

共通部分は赤道を含む帯です。対応

$$
(\omega,h)\mapsto(\sqrt{1-h^2}\,\omega,h)
$$

は $S^{m-1}\times(-1/2,1/2)$ から $W$ への同相です。逆は $(x,h)\mapsto(x/\sqrt{1-h^2},h)$ であり、分母は正です。$t\in[0,1]$ を変形の時刻として $\omega$ を固定し、$h$ を $(1-t)h$ に変えれば、帯の中に留まり、赤道を固定したまま時刻1で赤道に達します。従って赤道への [変形レトラクト](../ATOP3/index.md#def-atop3-deformation-retract) が得られます。[ホモトピー同値と特異ホモロジー群](../ATOP17/index.md#cor-atop17-equivalence) により $H_k(W)\cong H_k(S^{m-1})$ です。

| 領域 | 形 | 残す部分 |
| --- | --- | --- |
| $U$ | 北極を含む開球 | 北極 |
| $W$ | 赤道帯 | 赤道 $S^{m-1}$ |
| $V$ | 南極を含む開球 | 南極 |

[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) に $n\ge2$ を代入すると

$$
0\to H_n(S^m)\xrightarrow{\delta_n}H_{n-1}(W)\to0.
$$

ここで両端の零は $U,V$ の正次数群の消滅から来ています。$m\ge2$ なら赤道は道連結なので $a_*:H_0(W)\to H_0(U)\oplus H_0(V)$ は $t\mapsto(t,-t)$ で単射です。従って $H_1(S^m)=0$。[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) より球面は道連結なので $H_0(S^m)=\mathbb Z$ です。

円周の計算を帰納の出発点にして $n\ge2$ の同型を使うと、$m\ge1$ に対し

$$
H_n(S^m)\cong
\begin{cases}
\mathbb Z & n=0,m,\\
0 & \text{それ以外}.
\end{cases}
$$

各回で球面の次元とホモロジー次数を一つずつ下げていることがポイントです。

## 5. トーラス：局所の穴と貼り合わせの穴

トーラスを $T=S^1\times S^1$ とします。第2因子に円周で用いた開弧 $A,B$ を取り、$U=S^1\times A$、$V=S^1\times B$ とします。積位相で開であり、$U\cup V=T$ です。$A,B$ は可縮なので、各領域は第1因子の円周へ変形レトラクトします。具体的には角度座標で開弧を開区間へ移し、線形補間で一点に縮めます。第1因子は動かしません。$W$ は同様の二つの領域の非交和です。

[ホモトピー同値と特異ホモロジー群](../ATOP17/index.md#cor-atop17-equivalence) と第4節の円周の計算から、$k=0,1$ で $H_k(W)\cong\mathbb Z^2$、$H_k(U)\oplus H_k(V)\cong\mathbb Z^2$、$k\ge2$ では両者とも零です。

1次の基底は各成分で第1因子を一周する同じ向きのループとします。包含後に第2座標を開弧内で動かせばその領域の基底ループとホモトピックです。[特異ホモロジーのホモトピー不変性](../ATOP17/index.md#thm-atop17-homotopy-invariance) によりどちらの共通成分の基底も各領域で同じ生成元に移ります。0次でも各成分の点は各領域の生成元に移ります。従って $k=0,1$ で、共通部分の上側・下側の成分の生成元を順に $w_1,w_2$、領域 $U,V$ の生成元を $e_U,e_V$ とします。第3節の $a_*=(i_*,-j_*)$ により

$$
a_*(w_1)=a_*(w_2)=(e_U,-e_V).
$$

整数 $x,y$ に対して $a_*(xw_1+yw_2)=((x+y)e_U,-(x+y)e_V)$ です。従ってこれらの基底での座標を列ベクトルとすると、二つの基底の像を列に並べた $a_*$ の行列は

$$
M=\begin{pmatrix}1&1\\-1&-1\end{pmatrix}.
$$

$M(x,y)=(x+y,-x-y)$ なので、核の条件は $y=-x$ です。像は $(s,-s)$ の形で、任意の整数 $s$ は $(x,y)=(s,0)$ から得られます。[加群の核・余核の構成](../../../基礎論系/CATB/CATB1-04/index.md#thm-catb1-04-module-category) によれば、整数加群における余核は終域を像で割った商群 $\mathbb Z^2/\operatorname{im}M$ です。成分和 $g(x,y)=x+y$ は全射で、その核は $\operatorname{im}M$ に一致します。従って類 $[(x,y)]$ を $x+y$ に送る写像が代表元によらず定まり、単射かつ全射なので余核は $\mathbb Z$ と同型です。

[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) の2次部分から

$$
0\to H_2(T)\xrightarrow{\delta_2}\mathbb Z^2
\xrightarrow{M}\mathbb Z^2
$$

を得るので $H_2(T)\cong\ker M\cong\mathbb Z$ です。1次部分は

$$
\mathbb Z^2\xrightarrow{M}\mathbb Z^2
\xrightarrow{b_*} H_1(T)
\xrightarrow{\delta_1}\mathbb Z^2\xrightarrow{M}\mathbb Z^2.
$$

完全性より $\ker b_*=\operatorname{im}M$ なので、余核の類 $[(x,y)]$ を $b_*(x,y)$ に送る写像は代表元によらず、核が零で、像は $\operatorname{im}b_*=\ker\delta_1$ です。第1因子の一周の類を $e$ とすれば、この部分群は $\mathbb Ze$ です。第2因子の一周の類を $f$ とし、第1座標を固定します。円周の例と同じ二弧への分解から、$f$ の接続の値は $(1,-1)$ です。

任意の $h_1\in H_1(T)$ に対し $\delta_1 h_1=k(1,-1)$ となる整数 $k$ が一意に定まります。差 $h_1-kf$ は核に入るので、一意な整数 $j$ を用いて $h_1=je+kf$ と書けます。もし $je+kf=0$ なら接続を作用させて $k=0$、次に $j=0$ が従います。従って

$$
H_1(T)=\mathbb Ze\oplus\mathbb Zf.
$$

この計算は直和への分解を実際のループで与えており、一般の短完全列が常に分裂すると仮定していません。$T$ は道連結なので [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により $H_0(T)=\mathbb Z$ です。$n\ge3$ では完全列の両側が零なので、全結果は

$$
H_n(T)\cong
\begin{cases}
\mathbb Z & n=0,2,\\
\mathbb Z^2 & n=1,\\
0 & n\ge3.
\end{cases}
$$

## 6. 演習

### 演習 ATOP20-A1：短完全列の符号

- Level: A

$X=[0,1]$、$U=[0,3/4)$、$V=(1/4,1]$ とする。$p=1/2$ とし、$a(\langle p\rangle)$ と $b(a(\langle p\rangle))$ を求めよ。$a$ の第2成分を正符号にした場合も計算せよ。

<!-- solution-start -->
**詳細解答**

$p$ は両領域に入るので [二領域の小さい鎖の短完全列](#thm-atop20-small-chain-sequence) の写像を適用できます。

$$
a(\langle p\rangle)=(\langle p\rangle,-\langle p\rangle),
\qquad b(a(\langle p\rangle))=0.
$$

正符号に変更すれば和は $2\langle p\rangle$ です。整数係数の自由鎖群では非零なので像が核に含まれなくなります。
<!-- solution-end -->

### 演習 ATOP20-A2：共通部分にある境界

- Level: A

円周の第4節の開被覆で、右半円を南 $q$ から北 $p$ へ進む1単体 $u$、左半円を北から南へ進む1単体 $v$ を取る。$z=u+v$ の境界と $\delta_1[z]$ を求めよ。

<!-- solution-start -->
**詳細解答**

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) により

$$
\partial u=\langle p\rangle-\langle q\rangle,\qquad
\partial v=\langle q\rangle-\langle p\rangle.
$$

和は零なので $z$ はサイクルです。$u,v$ はそれぞれ $U,V$ に入り、両端は $W$ に入ります。[Mayer–Vietoris接続準同型](#thm-atop20-connecting) より上、下の成分の順で

$$
\delta_1[z]=(1,-1).
$$

[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により上と下の成分の類は別々の基底元なので非零です。
<!-- solution-end -->

### 演習 ATOP20-A3：核と余核

- Level: A

準同型 $M:\mathbb Z^2\to\mathbb Z^2$ が $M(x,y)=(x+y,-x-y)$ であるとする。核・像・余核を求めよ。

<!-- solution-start -->
**詳細解答**

$M(x,y)=0$ は $x+y=0$ と同値なので核は $\mathbb Z(1,-1)$ です。像について、任意の整数 $s$ は $x=s,y=0$ として得られるので像も $\mathbb Z(1,-1)$ です。

成分和写像 $g(x,y)=x+y$ は全射で、核はこの像です。よって余核の類 $[(x,y)]$ を $x+y$ に送る写像は全単射な準同型です。余核は $\mathbb Z$ です。
<!-- solution-end -->

### 演習 ATOP20-A4：共通部分が連結な場合

- Level: A

$X$ が二つの非空な可縮開集合 $U,V$ の和で、共通部分 $W$ も非空かつ可縮とする。全次数の $H_n(X)$ を求めよ。

<!-- solution-start -->
**詳細解答**

[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により $U,V,W$ の正次数群はすべて零です。[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) により $n\ge2$ の $H_n(X)$ は零群に挟まれるので零です。

各領域は道連結で共通点を持つため、任意の二点をその共通点経由で結べます。$X$ は道連結で、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) より $H_0(X)=\mathbb Z$ です。

0次の $a_*$ は $\mathbb Z\to\mathbb Z^2$、$t\mapsto(t,-t)$ で単射です。完全列の $0\to H_1(X)\to H_0(W)$ において接続の像はこの核である零群なので $H_1(X)=0$ です。
<!-- solution-end -->

### 演習 ATOP20-B1：接続の符号を交換する

- Level: B

開被覆の領域 $U,V$ の順序を入れ替えた場合、接続準同型が元のものの負になることを示せ。また分解の変更で値が変わらないことを確認せよ。

<!-- solution-start -->
**詳細解答**

小さい代表元 $z=u+v$ を取り、元の順序では [Mayer–Vietoris接続準同型](#thm-atop20-connecting) は $[\partial u]$ です。逆順では第1領域が $V$ なので $[\partial v]$ を取ります。

$$
\partial z=0\implies \partial v=-\partial u.
$$

従って逆順の接続は $-\delta_n$ です。分解を $u'=u+w$、$v'=v-w$ と変えると $w\in C_n(W)$ です。逆順での境界の変化は $-\partial w$ で、共通部分の境界なのでホモロジー類は不変です。
<!-- solution-end -->

### 演習 ATOP20-B2：開被覆条件が必要な理由

- Level: B

開被覆でない場合の反例を考える。$X=[0,1]$、$U=X\setminus\{1/2\}$、$V=\{1/2\}$ とする。$H_0(U)\oplus H_0(V)$ と $H_0(X)$ を計算し、共通部分が空であることから得られるはずの同型が成立しないことを示せ。どの証明段階が壊れるか。

<!-- solution-start -->
**詳細解答**

$U$ は左、右の二つの道連結成分、$V$ は一点、$X$ は道連結です。[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により前者は $\mathbb Z^3$、後者は $\mathbb Z$ です。包含の和は三つの点の類をすべて同じ生成元に送るため

$$
b_*(a,b,c)=a+b+c.
$$

例えば $(1,0,-1)$ は非零の核です。しかし $W$ は空なので $H_0(W)=0$ です。従ってこの位置は完全ではありません。

小さい鎖の短完全列は依然成立しますが、全体で境界となる左の点と中点の差を小さい1鎖で埋められません。小さい1単体は三つの成分の一つにしか入らず、その境界は各成分で係数和が零だからです。$V$ の内部は空で、中点が $U$ の内部にも入らないので [小さい鎖によるホモロジー同型](../ATOP19/index.md#thm-atop19-small-chain-isomorphism) の仮定が欠けています。
<!-- solution-end -->

### 演習 ATOP20-B3：三つの成分を持つ共通部分

- Level: B

$X=U\cup V$ を開被覆とする。$U,V$ は非空可縮で、$W=U\cap V$ はちょうど三つの道連結成分を持ち、各成分は可縮とする。$H_n(X)$ を全次数で求め、接続の像の基底を与えよ。

<!-- solution-start -->
**詳細解答**

[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) より $U,V$ と $W$ の各成分の正次数の群は零です。従って $W$ 全体でも正次数の群は零になります。$W$ については特異単体が一つの道連結成分に入るため、成分別の鎖群の直和を取れます。[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) より $n\ge2$ では $H_n(X)=0$ です。

1次部分は

$$
0\to H_1(X)\xrightarrow{\delta_1}\mathbb Z^3
\xrightarrow{a_*}\mathbb Z^2.
$$

[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により共通部分の各成分の点の類が基底です。それぞれが包含で両領域の同じ0次生成元に移るため

$$
a_*(x,y,z)=(x+y+z,-x-y-z).
$$

核の要素は $z=-x-y$ を満たすので

$$
(x,y,z)=x(1,0,-1)+y(0,1,-1).
$$

この二つのベクトルは最初の二座標から独立で、核を生成します。従って接続はこの核への同型で $H_1(X)\cong\mathbb Z^2$ です。共通部分が非空なので $X$ は道連結で、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) より $H_0(X)=\mathbb Z$ です。
<!-- solution-end -->

### 演習 ATOP20-B4：球面の次数移動

- Level: B

第4節の広げた半球の開被覆を用い、$H_3(S^4)$ と $H_4(S^4)$ を円周の計算および低次数の完全性まで戻って求めよ。

<!-- solution-start -->
**詳細解答**

第4節で共通部分が赤道に変形レトラクトし、各半球が可縮であることを確認しました。[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) により次数が2以上のとき接続は赤道の一つ下の次数の群への同型です。従って

$$
H_3(S^4)\cong H_2(S^3)\cong H_1(S^2).
$$

$S^2$ の赤道は道連結なので、0次の差写像は $t\mapsto(t,-t)$ で単射です。各半球の1次群は零なので $H_1(S^2)=0$ です。一方

$$
H_4(S^4)\cong H_3(S^3)
\cong H_2(S^2)\cong H_1(S^1)\cong\mathbb Z.
$$

最後の同型は円周の二つの共通成分の差を生成元とする第4節の計算です。
<!-- solution-end -->

### 演習 ATOP20-C1：円周を因子とする積空間

- Level: C

非空な道連結空間 $Y$ に対して $H_k(Y\times S^1)\cong H_k(Y)\oplus H_{k-1}(Y)$ を $k\ge1$ で示せ。短完全列が一般に分裂するとは仮定せず、第1因子への射影を利用せよ。$H_0$ も求めよ。

<!-- solution-start -->
**詳細解答**

円周の第4節の二つの開弧 $A,B$ を取り、$U=Y\times A$、$V=Y\times B$ と置きます。積位相により開被覆です。各開弧は一点へ縮むので各領域は $Y$ とホモトピー同値です。共通部分は二つの道連結成分の非交和であり、各成分も $Y$ とホモトピー同値です。特異単体は一成分に収まるので、そのホモロジー群は成分別の直和です。第1座標を固定する収縮を使うため、第1因子への射影で各同型を具体的に識別できます。

$G_k=H_k(Y)$ と書きます。[ホモトピー同値と特異ホモロジー群](../ATOP17/index.md#cor-atop17-equivalence) によって各領域の群は $G_k$、共通部分の群は $G_k^2$ と識別されます。各成分から領域へ包含した後に射影しても元の射影と等しいため、差写像は

$$
M_k:G_k^2\to G_k^2,\qquad
(x,y)\mapsto(x+y,-x-y).
$$

$G_k$ は任意のアーベル群でよく、ねじれ（非零元の有限回の加法が零になること）があっても、$x+y=0$ と $y=-x$ は同値です。任意の $(s,-s)$ は $M_k(s,0)$ と書けるので、核と像はいずれも反対符号の対の全体です。成分和は全射で核はこの像に一致するため、第5節と同じ商群の計算で余核は $G_k$ と同型です。

[Mayer–Vietoris完全列](#thm-atop20-mayer-vietoris) から、接続をその像である $\ker M_{k-1}$ と同一視すると

$$
0\to G_k\xrightarrow{\iota_*}H_k(Y\times S^1)
\xrightarrow{d}G_{k-1}\to0
$$

を得ます。ここで $\iota(y)=(y,a)$ とし、$a\in A$ を固定しました。実際、余核の任意の類は $(x,0)$ で代表できるため、第1領域からの包含の前に $y\mapsto(y,a)$ で $Y$ の類を $U$ に移せば、その合成は $\iota$ です。射影とこの写像は互いにホモトピー逆なので、余核からの単射は $\iota_*$ になります。$d$ は $\delta_k$ の第1成分です。

射影 $p:Y\times S^1\to Y$ は $p\circ\iota=\operatorname{id}_Y$ を満たします。[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) の関手性により $p_*\iota_*=\operatorname{id}_{G_k}$ です。

任意の $h\in H_k(Y\times S^1)$ を

$$
h=\iota_*p_*h+(h-\iota_*p_*h)
$$

と分けると、第2項は $\ker p_*$ に入ります。両部分群の共通部分は零です。実際 $\iota_*x\in\ker p_*$ なら $x=p_*\iota_*x=0$ です。

$d$ の $\ker p_*$ への制限は単射です。$d(h)=0$ なら完全性で $h=\iota_*x$、さらに $p_*h=0$ から $x=0$ です。全射性は、任意の $y\in G_{k-1}$ に対して $d(h)=y$ となる $h$ を選び、$h-\iota_*p_*h$ を取れば従います。実際、

$$
p_*(h-\iota_*p_*h)=p_*h-p_*h=0,
$$

$$
d(h-\iota_*p_*h)=d(h)-0=y
$$

です。第2式では短完全列の完全性から $d\iota_*=0$ を使いました。

よって $\ker p_*\cong G_{k-1}$ であり、求める直和が従います。$Y\times S^1$ は二つの道連結空間の積なので道連結です。従って [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) より $H_0(Y\times S^1)=\mathbb Z$ です。$Y=S^1$ と置けば第5節のトーラスの群が再び得られます。
<!-- solution-end -->

## 7. まとめ

二領域の小さい鎖の短完全列では共通部分の鎖を反対符号で入れ、領域別の鎖を足します。全体のサイクルを領域別に分けた境界が共通部分のサイクルとなり、Mayer–Vietoris接続準同型を与えます。完全性によって、全体にしか見えない穴を共通部分の一つ下の次数から計算できます。

次講では有限単体複体の骨格を用いて、これまでの特異ホモロジーと単体ホモロジーが同じ群を与えることを調べます。
