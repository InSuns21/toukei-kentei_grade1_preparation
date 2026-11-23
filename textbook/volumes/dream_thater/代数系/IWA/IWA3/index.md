# IWA3 岩澤代数・完備群環

[IWA2で構成した円分塔](../IWA2/index.md#thm-iwa2-compatible-tower)の有限層のGalois群を $\Gamma_n=\operatorname{Gal}(K_n/\mathbb Q)$ と書くと、$\Gamma_n\simeq\mathbb Z/p^n\mathbb Z$ であり、無限層の群 $\Gamma=\varprojlim_n\Gamma_n$ は $\mathbb Z_p$ と同型です。ここで $p$ は任意の素数で、$p=2$ も含みます。位相的生成元 $\gamma\in\Gamma$ を一つ固定し、その $\Gamma_n$ への像を $\gamma_n$ と書きます。$n=0$ の群は自明群です。

一つの群元を選んで加群に作用させるだけなら群の記法で足ります。しかし、例えば $\gamma$ と $1$ の差を考えたり、有限層ごとに整合する係数付きの和を扱ったりするには、**群の作用を加法・乗法のできる一つの環に収める**のが便利です。本講では有限群環から出発して完備群環を作り、$\gamma-1$ を新しい座標 $T$ とする理由を証明します。こうして得た環が、次講以降の逆極限や岩澤加群を記述する舞台になります。

## 1. 群元の「係数付きの和」を作る

有限群 $H$ と可換環 $A$ に対して、群の元 $[h]$ を互いに異なる形式的基底記号として扱い、$\sum_{h\in H}a_h[h]$（$a_h\in A$）を考えます。和は係数ごと、積は $[h][k]=[hk]$ として分配法則で延長します。$[1_H]$ が環の単位元です。これが有限群環 $A[H]$ の構成です。$H$ が可換なら群環も可換です。

例えば $H=\langle g:g^3=1\rangle$、$A=\mathbb F_3=\mathbb Z/3\mathbb Z$ なら、任意の元はただ一通り $a_0+a_1g+a_2g^2$ と書けます。この環では $g^3=1$ でも $g$ を数の $1$ と同一視しません。したがって $g-1$ は一般に零ではありません。

<a id="def-iwa3-finite-group-ring"></a>

<!-- formal-statement-start -->
> **定義（有限群環）**  
> 有限群 $H$ と単位元 $1_A$ を持つ可換環 $A$ に対し、$A[H]$ は形式和 $\sum_{h\in H}a_h[h]$ 全体である。加法を係数ごと、積を
$$
\left(\sum_h a_h[h]\right)\left(\sum_k b_k[k]\right)
=\sum_{x\in H}\left(\sum_{hk=x}a_hb_k\right)[x]
$$
> で定める。単位元は $1_A[1_H]$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa3-finite-group-ring -->
**定義の確認。** $H=\{1,g,g^2\}$、$g^3=1$ とすると、$\mathbb F_3[H]$ の元 $x=1+g$ と $y=g+2g^2$ の積は
$$
xy=g+2g^2+g^2+2g^3=2+g
$$
です。$g^2$ の係数は $2+1=0$（法3）、$g^3=1$ を使って定数項は2になります。加法と積を形式的基底の規則だけで計算できました。
<!-- definition-example-end -->

有限層では $H=\Gamma_n$、係数環を $A=\mathbb Z/p^m\mathbb Z$ とした
$$
R_{m,n}=(\mathbb Z/p^m\mathbb Z)[\Gamma_n],
\qquad m\ge1,\ n\ge0
$$
を使います。基底は $1,\gamma_n,\ldots,\gamma_n^{p^n-1}$ で、$R_{m,n}$ は係数環上の階数 $p^n$ の自由加群です。$\Gamma_n$ の指数は法 $p^n$ で扱います。

## 2. 二種類の極限を同時に取る

$m$ を増やすのは係数を $p$ 進的に精密にする操作、$n$ を増やすのはGalois群の層を深くする操作です。$m'\ge m$、$n'\ge n$ なら、係数を法 $p^m$ へ還元し、$\gamma_{n'}$ を $\gamma_n$ に送ることで環準同型 $R_{m',n'}\to R_{m,n}$ ができます。これらは合成と両立し、いずれも全射です。

ここで「全ての有限段に整合する」という語を、互いの像が一致する族であることとして定義できます。

<a id="def-iwa3-completed-group-ring"></a>

<!-- formal-statement-start -->
> **定義（岩澤代数・完備群環）**  
> 素数 $p$、位相群 $\Gamma\simeq\mathbb Z_p$、その有限商 $\Gamma_n=\Gamma/\Gamma^{p^n}$ を固定する。上記の遷移写像と両立する族の環
$$
\Lambda=\mathbb Z_p[[\Gamma]]
:=\varprojlim_{m,n\ge1,\ n\ge0}(\mathbb Z/p^m\mathbb Z)[\Gamma_n]
$$
> を $\Gamma$ の **岩澤代数**（完備群環）と呼ぶ。各有限環への射影の核を零元の近傍とする逆極限位相を入れる。
<!-- formal-statement-end -->

ここで右辺の添字は $m\ge1$、$n\ge0$ を意味します。$\Gamma/\Gamma^{p^n}$ における $\Gamma^{p^n}$ は $p^n$ 乗の元からなる閉部分群です。[閉部分群の分類](../IWA1/index.md#thm-iwa1-closed-subgroups)によりこの商は位数 $p^n$ です。

<!-- definition-example-start: def-iwa3-completed-group-ring -->
**定義の確認。** 各層の $1+\gamma_n$ を選ぶと、制限写像は $\gamma_{n+1}\mapsto\gamma_n$ なのでこの族は両立し、$\Lambda$ の元 $1+\gamma$ を定めます。一方、法 $p$・第1層で $1+\gamma_1$ を選び、第0層で $0$ を選ぶことはできません。前者の第0層への像は $1+1=2\in\mathbb F_p$ で、$p=2$ の場合だけ零、一般には零ではないからです。例えば $p=3$ なら不整合がはっきりします。
<!-- definition-example-end -->

$m,n$ を固定した有限環の全射があるので、$\Lambda$ の演算は全成分で行えばよく、有限段の等式を整合させて無限段へ持ち上げられます。$\mathbb Z_p[\Gamma]$（有限個の群元だけを使う通常の群環）から $\Lambda$ への自然な写像があり、その像は稠密です。実際、有限環 $R_{m,n}$ の任意の元は $\Gamma_n$ の代表元の有限和で持ち上がります。後に、元を無限級数で書くためにはこの「近似してから極限を取る」性質が重要になります。

## 3. 有限段では $T=\gamma_n-1$ が冪零になる

最初に $m,n$ が有限の場合を調べます。$T$ を形式変数とし、$T$ に $\gamma_n-1$ を代入します。$p$ を法とした群環では二項係数が消えるので
$$
(\gamma_n-1)^{p^n}
=\gamma_n^{p^n}-1=0
\quad\text{in }\mathbb F_p[\Gamma_n].
$$
従って $R_{m,n}$ では $(\gamma_n-1)^{p^n}$ は $p$ の倍数であり、さらに $m$ 乗すると零です。つまり
$$
(\gamma_n-1)^{mp^n}=0
\quad\text{in }R_{m,n}.
$$
この**冪零性**があるため、形式的冪級数 $\sum_{j\ge0}a_jT^j$ を代入しても、有限段では十分高い次数の項がすべて消え、有限和として計算できます。

<a id="prop-iwa3-finite-presentation"></a>

<!-- formal-statement-start -->
> **命題（有限群環の一変数表示）**  
> 素数 $p$、$m\ge1$、$n\ge0$、巡回群 $\Gamma_n=\langle\gamma_n\rangle$（位数 $p^n$）に対し、
$$
\omega_n(T)=(1+T)^{p^n}-1
$$
> と置く。$T\mapsto\gamma_n-1$ は全射環準同型を誘導し、その核は $(p^m,\omega_n(T))$ である。従って
$$
R_{m,n}\simeq
\mathbb Z_p[[T]]/(p^m,\omega_n(T)).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$X=1+T$ を群の生成元に対応させます。関係は $X^{p^n}=1$ の一つだけです。冪級数を代入できる理由は、先ほどの冪零性です。

<!-- proof-start -->
### 証明

$A_m=\mathbb Z/p^m\mathbb Z$、$q=p^n$ と置きます。$A_m[X]/(X^q-1)$ には $1,X,\ldots,X^{q-1}$ が基底として残ります。実際、$X^q-1$ は最高次係数1の多項式なので、任意の多項式はこれで割ると次数 $q$ 未満の余りを持ち、次数 $q$ 未満の非零多項式が $(X^q-1)$ に属することはありません。$X^q=1$ により $X$ は可逆で、その逆元は $X^{q-1}$ です。従って
$$
A_m[X]/(X^q-1)\longrightarrow A_m[\Gamma_n],
\qquad X^j\longmapsto\gamma_n^j
$$
は基底と積を保つ同型です。

$X=1+T$ と置けば、左辺は $A_m[T]/(\omega_n(T))$ です。法 $p$ では $\omega_n(T)\equiv T^q$ なので、商環で $T^q$ は $p$ の倍数です。よって $T^{mq}=0$ となります。このため $A_m[[T]]$ の任意の冪級数は商環上で次数 $mq$ 未満の多項式と同じ像を持ち、$A_m[[T]]\to A_m[T]/(\omega_n)$ は全射です。

また、$\omega_n(T)$ は最高次係数1の多項式であり、冪級数側で零となる元が $(\omega_n)$ に属することは次のように確認できます。$\omega_n(T)=T^q+p h(T)$（$h$ は定数項0の次数 $q-1$ 以下の多項式）と書くと、任意の $f\in A_m[[T]]$ を形式的に関係 $T^q=-p h(T)$ で置き換え、$p$ の次数を一つ上げる操作を高々 $m$ 回行うことで、次数 $q$ 未満の一意な剰余 $r(T)$ と $\omega_n(T)g(T)$ に分解できます。一意性は上で示した多項式商の基底の独立性から従います。従って核は $(\omega_n)$ であり、係数を $\mathbb Z_p$ へ戻せば核は $(p^m,\omega_n)$ です。
<!-- proof-end -->

**直接計算。** $p=3,n=1$ のとき
$$
\omega_1(T)=(1+T)^3-1=3T+3T^2+T^3.
$$
係数を法3にすれば $T^3=0$ ですが、法9では $T^3=-3T-3T^2$ であり、一般には零ではありません。有限段の計算を無限段へ持ち込むとき、この違いを忘れないようにします。

## 4. なぜ極限で冪級数環と同型になるか

有限段の表示をそのまま極限すればよさそうですが、**位相が一致すること**を確かめる必要があります。$\mathbb Z_p[[T]]$ には、$I=(p,T)$ として $I^r$（$r\ge1$）を零元の近傍とする位相を入れます。これは係数の $p$ 進精度と $T$ の次数を同時に制御する位相です。

例えば $T^j\to0$ であり、$p^j\to0$ です。また $\sum_{j\ge0}a_jT^j$ の部分和は $I$ 進的に収束します。形式的冪級数環はこの位相について完備です。係数を順に確定させれば極限の冪級数を一意に復元できます。

<a id="lem-iwa3-cofinal-ideals"></a>

<!-- formal-statement-start -->
> **補題（有限段の核と $I$ 進位相の一致）**  
> $R=\mathbb Z_p[[T]]$、$I=(p,T)$、
$$
J_{m,n}=(p^m,(1+T)^{p^n}-1)
\qquad(m\ge1,\ n\ge0)
$$
> と置く。各 $m,n$ に対してある $N$ が存在して $I^N\subset J_{m,n}$ となり、各 $r\ge1$ に対して十分大きな $m,n$ では $J_{m,n}\subset I^r$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

一方向は有限商で $p$ と $T$ が冪零になること、もう一方向は $\omega_n$ の二項係数に現れる $p$ の冪を評価することから従います。

<!-- proof-start -->
### 証明

固定した $m,n$ で $q=p^n$ と置きます。[有限群環の表示](#prop-iwa3-finite-presentation)の証明から $R/J_{m,n}$ では $p^m=0$、$T^{mq}=0$ です。$I^N$ の各生成元は $p^aT^b$（$a+b=N$）です。$N=m+mq$ とすれば $a\ge m$ または $b\ge mq$ のいずれかが成立するので、すべての生成元が $J_{m,n}$ に属します。従って $I^{m+mp^n}\subset J_{m,n}$ です。

逆向きには、$1\le k\le p^n$ に対し
$$
k\binom{p^n}{k}=p^n\binom{p^n-1}{k-1}
$$
を用います。右辺の第二因子は整数なので、$v_p(\binom{p^n}{k})\ge n-v_p(k)$ です。$k-v_p(k)\ge1$ だから、$\binom{p^n}{k}T^k$ は $I^{n+1}$ に属します。従って $\omega_n(T)\in I^{n+1}$ です。$p^m\in I^m$ と併せれば、$m\ge r$ かつ $n+1\ge r$ のとき $J_{m,n}\subset I^r$ となります。
<!-- proof-end -->

この補題によって、有限段の核を近傍基としても $I$ 進近傍を使っても同じ収束・連続性を得ます。

<a id="thm-iwa3-power-series-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（岩澤代数の冪級数表示）**  
> 素数 $p$、位相群 $\Gamma\simeq\mathbb Z_p$ とその位相的生成元 $\gamma$ を固定する。$\Gamma_n=\Gamma/\Gamma^{p^n}$ として定義した完備群環 $\Lambda=\mathbb Z_p[[\Gamma]]$ に対し、連続な $\mathbb Z_p$ 代数の同型
$$
\Phi_\gamma:\mathbb Z_p[[T]]\xrightarrow{\ \sim\ }\Lambda,
\qquad T\longmapsto\gamma-1
$$
> が存在する。左辺に $(p,T)$ 進位相、右辺に有限群環の逆極限位相を入れると、$\Phi_\gamma$ は位相環の同型である。
<!-- formal-statement-end -->

### 証明の見取り図

有限段ごとに $T\mapsto\gamma_n-1$ を代入し、[有限群環の表示](#prop-iwa3-finite-presentation)で全射・核を確定します。[補題](#lem-iwa3-cofinal-ideals)で両側の完備化が同じであると分かるので、極限へ移れます。

<!-- proof-start -->
### 証明

各 $(m,n)$ に対し、[有限群環の一変数表示](#prop-iwa3-finite-presentation)が環同型
$$
\phi_{m,n}:R/J_{m,n}\xrightarrow{\ \sim\ }R_{m,n}
$$
を与えます。$m$ または $n$ を大きくしたときの射影は、いずれも $\gamma_{n'}\mapsto\gamma_n$、$T\mapsto T$ を保つため、これらの同型は遷移写像と可換です。従って逆極限を取ると
$$
\varprojlim_{m,n}R/J_{m,n}\ \xrightarrow{\ \sim\ }\
\varprojlim_{m,n}R_{m,n}=\Lambda
$$
を得ます。

一方、[核の共終補題](#lem-iwa3-cofinal-ideals)によって、左辺は $\varprojlim_r R/I^r$ と同型です。$R=\mathbb Z_p[[T]]$ が $I$ 進完備であることも係数から直接確認できます。実際、互いに整合する $R/I^r$ の剰余類から、固定した $j\ge0$ の $T^j$ 係数を法 $p^s$ で決めるには $r>j+s$ を選べば十分です。$r$ を大きくしても得られる剰余は変わらず、全ての $s$ に対して整合するので、$p$ 進整数の一つの係数 $a_j$ を定めます。全ての $j$ について繰り返して得た $\sum_j a_jT^j$ は元の族へ写り、各係数の一意性により元も一意です。従って $R\simeq\varprojlim_r R/I^r$ です。

同型を合わせた写像では $T$ の各有限段の像が $\gamma_n-1$ ですから、逆極限で $T\mapsto\gamma-1$ となります。両側の零元の近傍基を同一視しているので、写像と逆写像はいずれも連続です。
<!-- proof-end -->

この定理の含意は、$\Gamma$ が「形式冪級数の変数一つ」にまとめられることです。ただし $\gamma$ の選び方が座標を決めているので、$T$ 自体は標準的な元ではありません。

## 5. 定数項・単元・群の作用

群環では群元を全て $1$ に写すと、形式和から係数の和が取り出されます。無限段でも各有限層の係数和は両立するため、連続環準同型 $\varepsilon:\Lambda\to\mathbb Z_p$ が得られます。これを **augmentation（係数和写像）** と呼びます。

<a id="prop-iwa3-augmentation"></a>

<!-- formal-statement-start -->
> **命題（係数和写像と単元判定）**  
> $\Gamma\simeq\mathbb Z_p$、位相的生成元 $\gamma$ を固定し、$\Lambda\simeq\mathbb Z_p[[T]]$ で $T=\gamma-1$ とする。係数和写像 $\varepsilon$ は
$$
\varepsilon\!\left(\sum_{j\ge0}a_jT^j\right)=a_0
$$
> と一致し、$\ker\varepsilon=(T)$ である。また $f(T)=\sum_{j\ge0}a_jT^j$ が $\Lambda$ の単元となるための必要十分条件は $a_0\in\mathbb Z_p^\times$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$T=\gamma-1$ の係数和は零です。単元の逆元は、定数項から順に係数を決めて構成します。

<!-- proof-start -->
### 証明

有限群環の $\sum a_h[h]\mapsto\sum a_h$ は積についても乗法的です。$[h]\mapsto1$ なので $\varepsilon(T)=\varepsilon(\gamma-1)=0$、$\varepsilon(a)=a$（$a\in\mathbb Z_p$）です。冪級数の部分和の連続性から $\varepsilon(f)=a_0$ となります。定数項が零であることは $f=Tf_1$ と書けることと同値なので核は $(T)$ です。

$f g=1$ が成り立つなら、定数項により $a_0b_0=1$ であるから $a_0$ は $\mathbb Z_p$ の単元です。逆に $a_0$ が単元なら、$g(T)=\sum_{r\ge0}b_rT^r$ の係数を
$$
b_0=a_0^{-1},\qquad
b_r=-a_0^{-1}\sum_{j=1}^{r}a_jb_{r-j}\quad(r\ge1)
$$
で順に定められます。これで $fg$ の定数項は1、各正次数の係数は0になります。可換環なので $g$ は両側の逆元です。
<!-- proof-end -->

**例。** $\gamma=1+T$ は単元であり、逆元 $\gamma^{-1}$ は $\sum_{j\ge0}(-T)^j$ です。他方、$p+T$ は定数項が $p$ なので単元ではありません。$p+T$ が非零であることと、単元でないことは異なります。

さらに $\Lambda$ は整域です。$f,g$ が非零なら、それぞれ最初に零でない $T$ の係数が $a_r,b_s$ として現れ、積の $T^{r+s}$ の係数は $a_rb_s\ne0$ です。ここで $\mathbb Z_p$ が整域であることを使いました。この性質は有限群環で $T$ が冪零になり得る事実と対照的です。

## 6. 生成元を替えても環は変わらない

$\Gamma\simeq\mathbb Z_p$ の位相的生成元は一つとは限りません。[位相的生成元の判定](../IWA1/index.md#prop-iwa1-generator-criterion)から、別の生成元は $\gamma'=\gamma^u$（$u\in\mathbb Z_p^\times$）と書けます。この指数は各 $\Gamma_n$ で $u\bmod p^n$ を使って定めるので、普通の整数冪と矛盾しません。

冪級数の中では $\gamma'= (1+T)^u$ です。$u$ が $p$ 進整数でも、二項係数 $\binom uj$ は整数指数を $p$ 進極限で近似して得る $\mathbb Z_p$ の元です。そのため
$$
T'=\gamma'-1=(1+T)^u-1
=\sum_{j\ge1}\binom uj T^j
$$
が意味を持ちます。最初の係数は $u$ なので、この置換は逆に戻せます。

<a id="prop-iwa3-generator-change"></a>

<!-- formal-statement-start -->
> **命題（位相的生成元の変更）**  
> $\Gamma\simeq\mathbb Z_p$ の位相的生成元 $\gamma$、$u\in\mathbb Z_p^\times$ に対し、$\gamma'=\gamma^u$ も位相的生成元である。$T=\gamma-1$、$T'=\gamma'-1$ とすれば
$$
T'=(1+T)^u-1,\qquad
T=(1+T')^{u^{-1}}-1
$$
> が $\mathbb Z_p[[T]]$ 内の形式的冪級数の等式として成立する。従って二つの座標は同じ位相環 $\Lambda$ を記述する。
<!-- formal-statement-end -->

### 証明の見取り図

有限層で指数 $u$ は法 $p^n$ の単元なので群の自己同型を与えます。逆指数 $u^{-1}$ を各層で用い、それを極限でつなぎます。

<!-- proof-start -->
### 証明

$\Gamma_n$ は位数 $p^n$ の巡回群です。$u\bmod p^n$ は $p$ と互いに素なので、$\gamma_n\mapsto\gamma_n^u$ は自己同型で、その逆は $\gamma_n\mapsto\gamma_n^{u^{-1}}$ です。両者は全ての $n$ で制限と可換であり、極限で互いに逆の $\Gamma$ の連続自己同型を与えます。従って $\gamma'=\gamma^u$ は位相的生成元です。

非負整数列 $u_k$ を $u$ に $p$ 進収束させると、各固定した $j$ に対し $\binom{u_k}{j}\to\binom uj$ が $\mathbb Z_p$ で成り立ちます。整数指数の場合の $(1+T)^{u_k}$ は有限層でも群元 $\gamma^{u_k}$ を表し、収束後は $\gamma^u$ を表します。$u^{-1}$ にも同じ議論を適用すると、両置換の合成は有限層ごとに恒等写像です。[冪級数表示の同型](#thm-iwa3-power-series-isomorphism)により全ての有限層で一致する冪級数は一致するので、二つの等式と互いに逆であることが従います。
<!-- proof-end -->

**直接例。** $p=3$ で $u=2$ とすると $T'=2T+T^2$ です。$2$ は3進単元なので、逆変換
$$
T=(1+T')^{1/2}-1=\frac12T'-\frac18(T')^2+\cdots
$$
は $\mathbb Z_3[[T']]$ 内で意味を持ちます。$u=3$ を使うと $\gamma^3$ は $\Gamma/\Gamma^3$ で単位元に写るため、位相的生成元ではありません。したがって $T'=(1+T)^3-1=3T+3T^2+T^3$ を座標変換に使うこともできません。

## 7. 次の講義へ：ノルム型の和を見分ける

有限層の群環には、群の全元を足し合わせる元が自然に現れます。例えば $\Gamma_{n+1}\to\Gamma_n$ の核を生成する $\gamma_{n+1}^{p^n}$ の冪の和は
$$
S_n=\sum_{j=0}^{p-1}\gamma^{jp^n}\in\Lambda
$$
と書けます。$T$ 座標では等比数列の恒等式から
$$
\omega_{n+1}(T)=\omega_n(T)
\left(\sum_{j=0}^{p-1}(1+T)^{jp^n}\right)
=\omega_n(T)S_n.
$$
これは $\Lambda$ の正しい等式です。$\omega_n(T)$ は $\Lambda\simeq\mathbb Z_p[[T]]$ 内では零でありません。一方、第 $n$ 層の商環に写すと $\omega_n=0$ になります。商環で零となる関係を、極限の環で最初から零として扱ってはいけません。

この $S_n$ と、層間の**射影** $\gamma_{n+1}\mapsto\gamma_n$ は別の対象です。さらに数体のノルム写像も区別しなければなりません。次のIWA4ではこれらの写像を、類群や単数群の逆極限へ接続します。

## 8. 演習：有限群環から完備群環まで

### A1. 群環の冪零元

$p=3$、$\Gamma_1=\langle g:g^3=1\rangle$ とする。$\mathbb F_3[\Gamma_1]$ で $T=g-1$ と置き、$T^2,T^3$ を $1,g,g^2$ の線形結合で示せ。

- Level: A
- ID: IWA3-A1

<!-- solution-start -->
**詳細解答。** 分配法則から $T^2=(g-1)^2=g^2-2g+1=g^2+g+1$（法3）。さらに
$$
T^3=(g-1)^3=g^3-3g^2+3g-1=1-1=0
$$
です。$T^2=1+g+g^2$ は基底の係数が全て1なので零でありません。従って冪零指数は3です。
<!-- solution-end -->

### A2. 法9では $T^3$ が消えない

$p=3,m=2,n=1$ とする。$(\mathbb Z/9\mathbb Z)[\Gamma_1]$ で $T=g-1$ の $T^3$ を計算し、$T^3\ne0$ だが $T^6=0$ を示せ。

- Level: A
- ID: IWA3-A2

<!-- solution-start -->
**詳細解答。** $g^3=1$ より
$$
T^3=g^3-3g^2+3g-1=3g-3g^2.
$$
$g$ と $g^2$ は自由基底なので法9で係数 $3,-3$ は零でなく、$T^3\ne0$ です。一方 $T^6=9(g-g^2)^2=0$（法9）です。これは[有限群環の表示](#prop-iwa3-finite-presentation)の $mp^n=6$ に一致します。
<!-- solution-end -->

### A3. 係数和写像

$\Lambda$ の元 $f=2+3\gamma$ を $T=\gamma-1$ で表し、$\varepsilon(f)$ を求めよ。また $f-\varepsilon(f)\in(T)$ を確認せよ。

- Level: A
- ID: IWA3-A3

<!-- solution-start -->
**詳細解答。** $\gamma=1+T$ なので
$$
f=2+3(1+T)=5+3T,\qquad\varepsilon(f)=5.
$$
従って $f-\varepsilon(f)=3T\in(T)$ です。$\varepsilon$ が定数項を取ることは[係数和写像の命題](#prop-iwa3-augmentation)と一致します。
<!-- solution-end -->

### A4. 逆元を級数で作る

$f=1+pT\in\mathbb Z_p[[T]]$ の逆元を示し、$T^3$ 未満の項について積が1となることを確かめよ。

- Level: A
- ID: IWA3-A4

<!-- solution-start -->
**詳細解答。** 定数項が1なので単元です。幾何級数
$$
g=\sum_{j\ge0}(-pT)^j=1-pT+p^2T^2-p^3T^3+\cdots
$$
を取ると、部分和 $g_N$ について $(1+pT)g_N=1-(-pT)^{N+1}$。最後の項は $T$ 進的にも $(p,T)$ 進的にも零へ収束するため $fg=1$ です。$T^3$ 未満では
$$
(1+pT)(1-pT+p^2T^2)\equiv1\pmod{T^3}
$$
です。
<!-- solution-end -->

### A5. 第1層の関係式

$p=3$ とする。$\omega_1(T)$ を展開し、法3の群環での関係式と法9の群環での関係式をそれぞれ書け。

- Level: A
- ID: IWA3-A5

<!-- solution-start -->
**詳細解答。** 二項展開より
$$
\omega_1(T)=(1+T)^3-1=3T+3T^2+T^3.
$$
法3では $T^3=0$、法9では $T^3=-3T-3T^2$ です。後者の右辺は一般には零ではありません。従って法3だけで証明した冪零指数を法9へそのまま持ち上げられません。
<!-- solution-end -->

### B1. 有限段の写像は環準同型か

$p=3$、係数を法9に固定し、$\Gamma_2=\langle h:h^9=1\rangle\to\Gamma_1=\langle g:g^3=1\rangle$ を $h\mapsto g$ で定める。$a+bh^2+ch^5$ の像を求め、$h^4\cdot h^5$ の積が写像と両立することを確かめよ。

- Level: B
- ID: IWA3-B1

<!-- solution-start -->
**詳細解答。** 指数を法3に還元すると $h^2\mapsto g^2$、$h^5\mapsto g^2$ なので、像は $a+(b+c)g^2$ です。一方 $h^4h^5=h^9=1$ なので積の像は1。各因子の像は $g^4=g$、$g^5=g^2$ で、積は $g^3=1$ です。係数の和と積を保つことが具体的に確認できました。
<!-- solution-end -->

### B2. 生成元を取り替える

$p=3$ とし、$\gamma'=\gamma^2$ を選ぶ。$T'=\gamma'-1$ を $T$ の式で書き、逆変換の $T'$ の一次・二次項を求めよ。$u=3$ が失敗する理由も述べよ。

- Level: B
- ID: IWA3-B2

<!-- solution-start -->
**詳細解答。** $\gamma=1+T$ なので $T'=(1+T)^2-1=2T+T^2$ です。逆写像は $u^{-1}=1/2\in\mathbb Z_3$ を指数に使い、二項係数から
$$
T=(1+T')^{1/2}-1
=\frac12T'+\frac{(1/2)(-1/2)}2(T')^2+\cdots
=\frac12T'-\frac18(T')^2+\cdots.
$$
$2$ と $8$ は3進単元なので係数は $\mathbb Z_3$ にあります。$u=3$ は法3で零となるため $\gamma^3$ の $\Gamma_1$ への像は単位元となり、位相的生成元ではありません。
<!-- solution-end -->

### B3. 単元でない元と非零性

$\mathbb Z_3[[T]]$ で $f=3+T$、$g=1+3T$ を考える。それぞれの単元性を判定し、$fg\ne0$ を確かめよ。

- Level: B
- ID: IWA3-B3

<!-- solution-start -->
**詳細解答。** [単元判定](#prop-iwa3-augmentation)で $f$ の定数項3は $\mathbb Z_3$ の単元でないので $f$ は非単元です。$g$ の定数項1は単元なので $g^{-1}=1-3T+9T^2-\cdots$ が存在します。積を計算すると
$$
fg=(3+T)(1+3T)=3+10T+3T^2
$$
です。定数項3が $\mathbb Z_3$ で非零なので積も非零です。非単元と零因子を混同してはいけません。
<!-- solution-end -->

### B4. 冪級数の係数を再帰的に決める

$p=3$ とし $f(T)=1+T+T^2$ の逆元 $g(T)=\sum_{r\ge0}b_rT^r$ の $b_0,b_1,b_2,b_3$ を求め、次数3まで積を検算せよ。

- Level: B
- ID: IWA3-B4

<!-- solution-start -->
**詳細解答。** [逆元の再帰式](#prop-iwa3-augmentation)で $a_0=a_1=a_2=1$、$a_j=0$（$j\ge3$）と置きます。$b_0=1$、$b_1=-b_0=-1$、$b_2=-(b_1+b_0)=0$、$b_3=-(b_2+b_1)=1$ です。従って $g\equiv1-T+T^3\pmod{T^4}$。積は
$$
(1+T+T^2)(1-T+T^3)
\equiv1+(1-1)T+(1-1)T^2+(1-1)T^3
\equiv1\pmod{T^4}
$$
となります。
<!-- solution-end -->

### C1. 二つの有限化とノルム型の和

$p=3$、$m=2$、$n=1$ とし、$\Gamma_1=\langle g:g^3=1\rangle$、$R=(\mathbb Z/9\mathbb Z)[\Gamma_1]$ とする。(i) $R$ の元の個数を求めよ。(ii) 係数和写像の核を $T=g-1$ を使って記述せよ。(iii) $S=1+g+g^2$ について $TS=0$、$S\ne0$ を示せ。(iv) 法3では $S=T^2$ となることを示し、無限段の $\Lambda$ における $T$ と有限段の $T$ の違いを述べよ。

- Level: C
- ID: IWA3-C1

<!-- solution-start -->
**詳細解答。** (i) $1,g,g^2$ は係数環 $\mathbb Z/9$ 上の自由基底なので、各係数に9通りの選択があり、$|R|=9^3=729$ です。[有限群環の一変数表示](#prop-iwa3-finite-presentation)では $R\simeq(\mathbb Z/9)[[T]]/(3T+3T^2+T^3)$ です。

(ii) $a+bg+cg^2$ の係数和は $a+b+c$（法9）です。$\varepsilon(g-1)=0$ なので $(T)\subset\ker\varepsilon$。逆に $\varepsilon(a+bg+cg^2)=0$ なら $a+b+c=0$ ですから
$$
a+bg+cg^2=b(g-1)+c(g^2-1)
=(g-1)\bigl(b+c(g+1)\bigr)\in(T).
$$
ゆえに $\ker\varepsilon=(T)$ です。

(iii) $gS=g+g^2+g^3=g+g^2+1=S$ だから
$$
TS=(g-1)S=gS-S=0.
$$
一方 $S=1+g+g^2$ の三つの基底係数は全て $1\bmod9$ なので $S\ne0$ です。

(iv) $T^2=(g-1)^2=g^2-2g+1$ です。法3で $-2=1$ なので $T^2=g^2+g+1=S$ となります。有限環 $R$ では $T$ は零因子であり、より高い冪が零になります。しかし無限段の $\Lambda\simeq\mathbb Z_3[[T]]$ は整域で、$T$ は非零かつ零因子ではありません。有限段では $\omega_1(T)=0$ を課しているのに対し、無限段では $\omega_1(T)=3T+3T^2+T^3\ne0$ であることが違いの理由です。
<!-- solution-end -->

## 9. 次講への問い

有限群環と無限群環を同じ座標で扱えるようになりました。次に必要なのは、数体の拡大 $K_{n+1}/K_n$ が生む単数・イデアル類群の**ノルム写像**と、群の作用が作る制限・射影をそれぞれ定義し、どの遷移写像で逆極限を取るか確定することです。IWA4ではこの区別から岩澤加群の具体的な構成へ進みます。
