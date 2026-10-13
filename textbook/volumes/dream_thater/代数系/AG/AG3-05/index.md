# AG3-05 ファイバー積と基底変換

二つのスキームを単に集合として掛け合わせても、環に含まれる情報は正しく復元できません。例えば実数体上の一点 $\operatorname{Spec}\mathbb C$ を二つ掛け合わせると、集合論的には一点のはずですが、環を用いて構成すると二点が現れます。この違いを説明する道具が**ファイバー積**です。

前章の[スキームの貼り合わせ定理](../AG3-04/index.md#thm-ag3-04-gluing)により、局所アフィンな構成を大域化できます。今回はまず環上のテンソル積でアフィンの場合を構成し、「二つの射が同じ基底へ落ちる」条件を普遍性で表します。次に局所計算を貼り合わせ、基底を取り替えたときに方程式、開部分、閉部分、ファイバーがどう変わるかを調べます。

以下、環は可換で単位的、環準同型は単位元を保ち、零環も許します。$k$ は必要に応じて指定する体です。すべてのスキームは前章の[スキームの定義](../AG3-04/index.md#def-ag3-04-scheme)によります。

## 1. なぜ「基底の上で」積を取るのか

まず $R$ を可換環、$B,C$ を $R$ から環準同型を備えた可換環とします。$B$ と $C$ の元を掛け合わせるだけではなく、$r\in R$ をどちらから作用させても一致するという条件が必要です。

そのために $R$-加群のテンソル積 $B\otimes_R C$ を取り、純テンソルに

$$
(b\otimes c)(b'\otimes c')=bb'\otimes cc',
\qquad 1=1_B\otimes1_C
$$

で積を入れます。例えば $(rb)\otimes c=b\otimes(rc)$ なので、$R$ の二つの作用は同じものになります。テンソル積の双線形性と積の結合則から、これらの積は任意の有限和に対して矛盾なく拡張されます。

<a id="def-ag3-05-fiber-product"></a>

<!-- formal-statement-start -->
> **定義（スキームのファイバー積）**  
> スキームの射 $f:X\to S$、$g:Y\to S$ に対し、スキーム $P$ と射 $p_X:P\to X$、$p_Y:P\to Y$ の組がファイバー積であるとは、$f\circ p_X=g\circ p_Y$ であり、任意のスキーム $T$ と射 $a:T\to X$、$b:T\to Y$ が $f\circ a=g\circ b$ を満たすたびに、$p_X\circ h=a$、$p_Y\circ h=b$ を満たす射 $h:T\to P$ がただ一つ存在することをいう。$P$ を $X\times_S Y$ と記す。
<!-- formal-statement-end -->

ここで $T$ はアフィンと仮定しません。条件は、特定の座標表示ではなく**すべてのスキームからの射**についての主張です。普遍性が一意性を保証するので、ファイバー積は存在すれば一意な同型を除いて定まります。

<!-- definition-example-start: def-ag3-05-fiber-product -->
### 例：二つのアフィン直線

**定義の確認** $X=\operatorname{Spec}k[x]$、$Y=\operatorname{Spec}k[y]$、$S=\operatorname{Spec}k$ とします。候補を $P=\operatorname{Spec}k[x,y]$ とし、射影は $k[x]\to k[x,y]$ および $k[y]\to k[x,y]$ から作ります。[アフィンスキームの射と環準同型の対応](../AG3-03/index.md#thm-ag3-03-affine-fully-faithful)により、任意のアフィンな $T=\operatorname{Spec}D$ の二つの射は $x\mapsto u$、$y\mapsto v$（$u,v\in D$）で指定されます。$k[x,y]\to D$ を $x\mapsto u$、$y\mapsto v$ とする方法は唯一です。非アフィンの $T$ でも、アフィン開被覆上の一意な射が重複部分で一致するので[射の貼り合わせ](../AG3-04/index.md#thm-ag3-04-morphism-gluing)で一意な射を得ます。したがってこの候補は定義の条件を満たします。
<!-- definition-example-end -->

<a id="thm-ag3-05-affine-product"></a>

<!-- formal-statement-start -->
> **定理（アフィンスキームのファイバー積）**  
> 可換環 $R$ と $R$-代数 $B,C$ に対し、$X=\operatorname{Spec}B$、$Y=\operatorname{Spec}C$、$S=\operatorname{Spec}R$ とする。$R$-代数 $D=B\otimes_R C$ からの標準準同型 $b\mapsto b\otimes1$、$c\mapsto1\otimes c$ が定める射によって、次のスキームはファイバー積になる。

$$
X\times_S Y\simeq\operatorname{Spec}(B\otimes_R C).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$T$ がアフィンなら環準同型の向きを逆転させ、$B$ と $C$ から同じ環へ向かう二つの準同型をテンソル積からの一つの準同型へまとめます。一般の $T$ についてはアフィン開被覆上で作った射を貼り合わせます。

<!-- proof-start -->
### 証明

$D=B\otimes_R C$ と置きます。$R\to B$、$R\to C$ の像は $D$ で一致します。実際 $r\in R$ に対して

$$
(r1_B)\otimes1_C=1_B\otimes(r1_C).
$$

ゆえに標準準同型 $i_B:B\to D$、$i_C:C\to D$ が誘導する二つの射は $S$ 上で可換です。

$T=\operatorname{Spec}E$ のとき、[アフィンスキームの射の対応](../AG3-03/index.md#thm-ag3-03-affine-fully-faithful)によって、$a:T\to X$、$b:T\to Y$ は $\alpha:B\to E$、$\beta:C\to E$ に対応します。$S$ 上で可換であることは $\alpha(r1_B)=\beta(r1_C)$ を意味します。そこで

$$
\gamma\!\left(\sum_{j=1}^n b_j\otimes c_j\right)
=\sum_{j=1}^n\alpha(b_j)\beta(c_j)
$$

と置きます。この式は $R$-平衡性

$$
\alpha(rb)\beta(c)=\alpha(b)\beta(rc)
$$

によりテンソル積上で well-defined です。さらに純テンソルについて

$$
\gamma((b\otimes c)(b'\otimes c'))
=\alpha(bb')\beta(cc')
=\gamma(b\otimes c)\gamma(b'\otimes c')
$$

であり、有限和へ分配して環準同型となります。$b\otimes c=(b\otimes1)(1\otimes c)$ ですから、$\gamma$ の値は二つの制限によって一意です。よって $T$ がアフィンの場合の普遍性が成立します。

一般のスキーム $T$ はアフィン開集合 $T_\lambda$ で覆えます。各 $T_\lambda$ で得られる射 $h_\lambda:T_\lambda\to\operatorname{Spec}D$ は、重複する任意の点のアフィン近傍 $V\subseteq T_\lambda\cap T_\mu$ 上で、先ほどの一意性により一致します。したがって重複部分全体でも一致します。[射の貼り合わせ定理](../AG3-04/index.md#thm-ag3-04-morphism-gluing)で $h:T\to\operatorname{Spec}D$ が得られます。一意性もアフィン開被覆上で判定できるので、任意の $T$ に対する普遍性が証明されました。
<!-- proof-end -->

$R=k$、$B=k[x]$、$C=k[y]$ なら $B\otimes_k C\simeq k[x,y]$ です。一方、$R$ に沿う関係式があるときには、元の二つの座標の間に方程式が入ります。

## 2. 方程式で見るファイバー積

$a\in R$ の像を、$B$ と $C$ でそれぞれどう表すかによって、$B\otimes_R C$ の方程式が決まります。たとえば $R=k[t]$ とし、$B=k[x]$ へ $t\mapsto x^2$、$C=k[y]$ へ $t\mapsto y^2$ と送ると、同じ $t$ を二度評価する条件は $x^2=y^2$ です。

<a id="prop-ag3-05-equation"></a>

<!-- formal-statement-start -->
> **命題（多項式表示と方程式）**  
> 可換環 $R$ と $R$-代数 $C$、および $R$-代数 $B=R[x_1,\ldots,x_n]/I$（$I$ はイデアル）に対し、$I_C$ を $I$ の像で生成される $C[x_1,\ldots,x_n]$ のイデアルとする。このとき $C$-代数の自然な同型がある。

$$
B\otimes_R C\simeq C[x_1,\ldots,x_n]/I_C.
$$
<!-- formal-statement-end -->

### 証明の見取り図

テンソル積は $R$ の係数を $C$ へ変えます。もとの方程式は、その係数を取り替えた式として残ります。

<!-- proof-start -->
### 証明

まず $R[x_1,\ldots,x_n]\otimes_R C\to C[x_1,\ldots,x_n]$ を

$$
\left(\sum_\nu r_\nu x^\nu\right)\otimes c
\longmapsto\sum_\nu (r_\nu c)x^\nu
$$

で定めます（$r_\nu c$ は $R\to C$ の作用）。逆写像は $c x^\nu\mapsto x^\nu\otimes c$ です。両者は単項式で逆になり、加法・積を保存するため環同型です。

次に $R[x_1,\ldots,x_n]\to B$ の商写像と $C$ のテンソル積で、$B\otimes_R C$ は $R[x_1,\ldots,x_n]\otimes_R C$ の像となります。核は $f\otimes c$（$f\in I$、$c\in C$）の有限和の集合です。これは、任意のテンソルを持つ二つの加群の生成元と関係式からテンソル積を作ると、$I$ の関係式を追加することに等しいことから従います。上の同型の下で核はまさに $I_C$ です。したがって主張の同型が成立します。
<!-- proof-end -->

**具体計算。** $R=k[t]$、$B=k[x]$（$t\mapsto x^2$）、$C=k[y]$（$t\mapsto y^2$）では、$B\simeq R[x]/(x^2-t)$、$C\simeq R[y]/(y^2-t)$ なので

$$
B\otimes_R C
\simeq k[t,x,y]/(x^2-t,y^2-t)
\simeq k[x,y]/(x^2-y^2).
$$

最後の同型は第一式 $t=x^2$ を第二式へ代入したものです。$\operatorname{char}k\ne2$ なら $(x-y)(x+y)=0$ と分解しますが、二つの直線が交差する点は一つです。二つの成分を単純な直和集合にしてはいけません。

## 3. アフィンから一般のスキームへ

[スキームの局所アフィン性](../AG3-04/index.md#def-ag3-04-scheme)と[開部分の構成](../AG3-04/index.md#prop-ag3-04-open-subscheme)により、任意の射 $X\to S$、$Y\to S$ は、基底の同じアフィン開集合へ入る小さなアフィン開部分に分けて扱えます。ただし、異なるアフィン開部分の交わりが必ずアフィンとは限らないため、交わりをさらに主開集合で覆う必要があります。

<a id="thm-ag3-05-scheme-product"></a>

<!-- formal-statement-start -->
> **定理（スキームのファイバー積の存在と一意性）**  
> 任意のスキームの射 $X\to S$、$Y\to S$ に対しファイバー積 $X\times_S Y$ が存在する。得られる対象と射影は[ファイバー積の普遍性](#def-ag3-05-fiber-product)を満たし、その普遍性を保つ一意なスキーム同型を除いて一意である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $S$ のアフィン開集合の上へ制限します。そこでは $X,Y$ のアフィン開部分を選び、[アフィンの場合の定理](#thm-ag3-05-affine-product)を使います。共通部分では $D(b\otimes c)$ に縮めると、両方のチャートの主開部分への制限と一致します。これらを貼り合わせ、最後に普遍性を局所的に確認します。

<!-- proof-start -->
### 証明

**局所チャート。** $S$ のアフィン開被覆を $W_i=\operatorname{Spec}R_i$ とします。$X_i=f^{-1}(W_i)$、$Y_i=g^{-1}(W_i)$ をそれぞれアフィン開部分 $U_{i\lambda}=\operatorname{Spec}B_{i\lambda}$、$V_{i\mu}=\operatorname{Spec}C_{i\mu}$ で覆います。各対の候補を

$$
P_{i\lambda\mu}
=\operatorname{Spec}(B_{i\lambda}\otimes_{R_i}C_{i\mu})
$$

とします。この候補は $U_{i\lambda}$ と $V_{i\mu}$ に射影します。

**開部分との整合。** $U=\operatorname{Spec}B$ の主開 $D(b)=\operatorname{Spec}B_b$ と $V=\operatorname{Spec}C$ の主開 $D(c)=\operatorname{Spec}C_c$ に対し、局所化の普遍性から

$$
B_b\otimes_R C_c
\simeq (B\otimes_R C)_{(b\otimes1)(1\otimes c)}.
$$

左辺の逆元 $b^{-1}\otimes1$ と $1\otimes c^{-1}$ は右辺で存在し、右辺の $(b\otimes c)^{-1}$ は左辺で $b^{-1}\otimes c^{-1}$ に移るため、互いに逆の準同型が構成できます。ゆえに右辺の素スペクトルは $P$ の開部分 $D(b\otimes c)$ です。

**貼り合わせ。** 二つの $P_{i\lambda\mu}$ の上で、両方の射影がそれぞれ二つの元チャートの交わりへ入る部分を考えます。この部分の各点では、$S$ の二つのアフィン開集合の交わりに含まれる主開近傍 $D(r)$ を取れます。さらに $U,V$ 側の交わりを主開近傍へ縮めます。上の局所化同型によって、二つの候補のこれらの開部分は同じアフィン・ファイバー積で表示されます。この同型は[アフィンの場合の普遍性](#thm-ag3-05-affine-product)から一意で、三重の重複でも同じ二つの射影を持つため合成が一致します。よって[貼り合わせ定理](../AG3-04/index.md#thm-ag3-04-gluing)でスキーム $P$ と射影 $p_X,p_Y$ を得ます。

**普遍性。** $T$ と $S$ 上で一致する射 $a:T\to X$、$b:T\to Y$ を取ります。任意の $t\in T$ で $s=f(a(t))=g(b(t))$ を含む $W_i$ を選び、$a(t)$、$b(t)$ を含む $U_{i\lambda}$、$V_{i\mu}$ を選びます。

$$
N=a^{-1}(U_{i\lambda})\cap b^{-1}(V_{i\mu})
$$

は $t$ の開近傍です。その中で $t$ を含むアフィン開部分 $N_t$ を選べば、[アフィンの場合の普遍性](#thm-ag3-05-affine-product)から $N_t\to P_{i\lambda\mu}$ が一意に存在します。二つの $N_t$ が重なるところでも、点ごとに更に小さい上記の共通チャートに縮めれば両射が同じ二つの射影を持つため一致します。[射の貼り合わせ](../AG3-04/index.md#thm-ag3-04-morphism-gluing)から唯一の $T\to P$ が得られます。

**一意性。** $P,P'$ が普遍性を満たすなら、$P$ から $P'$ への一意な射と逆向きの一意な射が存在します。合成は同じ二つの射影を持つので恒等射と一致します。従って両者は一意な同型で結ばれます。
<!-- proof-end -->

この構成は、二つの空間の「同じ基底の点の上にある部分」を合わせる操作です。しかし点集合そのものが対の集合とは限りません。後の具体例でその違いを確認します。

## 4. 基底変換と図式の再構成

射 $f:X\to S$ と射 $q:S'\to S$ に対し、$X'=X\times_S S'$ を作って $S'$ へ射影すると、もとの族を新しい基底で眺め直せます。これが**基底変換**です。方程式では、係数を $S$ 上の環から $S'$ 上の環へ移すことに当たります。

<a id="def-ag3-05-base-change"></a>

<!-- formal-statement-start -->
> **定義（基底変換）**  
> スキームの射 $f:X\to S$ と $q:S'\to S$ に対し、ファイバー積 $X'=X\times_S S'$ を $X$ の $S'$ への基底変換といい、射影 $f':X'\to S'$ を $f$ の基底変換という。二つの射影が作る可換な四角形を基底変換図式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-05-base-change -->
### 例：方程式の係数を一つの値に固定する

**定義の確認** $k$ を体とし、$S=\operatorname{Spec}k[t]$、$X=\operatorname{Spec}k[t,x]/(x^2-t)$ とします。$q:S'=\operatorname{Spec}k\to S$ を $t\mapsto0$ で定めると、[多項式表示の命題](#prop-ag3-05-equation)により

$$
X'=\operatorname{Spec}\bigl((k[t,x]/(x^2-t))\otimes_{k[t]}k\bigr)
\simeq\operatorname{Spec}k[x]/(x^2).
$$

両射影の合成は $t\mapsto0$ で一致し、[ファイバー積の定理](#thm-ag3-05-affine-product)による普遍性を満たします。これが基底変換の直接例です。もとの $x^2=t$ を単に点集合で $t=0$ と置き換えるより、冪零元 $x$ を保持できる点が重要です。
<!-- definition-example-end -->

<a id="prop-ag3-05-associativity"></a>

<!-- formal-statement-start -->
> **命題（反復基底変換と結合法則）**  
> スキームの射 $X\to S$、$S'\to S$、$S''\to S'$ に対して、自然な $S''$-スキーム同型がある。また $S$ 上のスキーム $X,Y,Z$ に対し二通りの括弧の付け方は自然に同型である。

$$
(X\times_S S')\times_{S'}S''\simeq X\times_S S'',
$$

$$
(X\times_S Y)\times_S Z\simeq X\times_S(Y\times_S Z).
$$
<!-- formal-statement-end -->

### 証明の見取り図

両辺へ向かう射は同じ互換条件を満たす組から決まります。したがってどちらも同じ普遍性を持ちます。

<!-- proof-start -->
### 証明

第一式の左辺 $L$ から $X$ への射は $L\to X\times_SS'\to X$、$S''$ への射は第二射影です。$L$ の任意の点を試験対象 $T$ の射で置き換えると、$T\to L$ の情報は

$$
a:T\to X,\quad b:T\to S',\quad c:T\to S''
$$

であって、$a$ と $b$ の $S$ への像が一致し、$b$ が $c$ の $S'$ への合成であることに等しいです。$b$ は $c$ から一意に定まるので、結局 $T\to X$ と $T\to S''$ が $S$ 上で一致することだけが条件です。これは右辺の普遍性です。[一意性](#thm-ag3-05-scheme-product)により第一同型を得ます。

第二式でも $T$ からの射は $a:T\to X$、$b:T\to Y$、$c:T\to Z$ の三つで、$S$ への三つの合成が一致する条件に等しいです。括弧の付け方はこの条件を変えないので同型となります。構成が $T$ の射の合成と両立するため自然です。
<!-- proof-end -->

<a id="prop-ag3-05-open-closed-change"></a>

<!-- formal-statement-start -->
> **命題（開部分と閉部分の基底変換）**  
> スキーム $S$ 上の射 $X\to S$ と任意の $S'\to S$ に対し、$X$ の開部分スキーム $U\hookrightarrow X$ の基底変換 $U\times_S S'\to X\times_S S'$ は開埋め込みである。また、閉部分スキーム $Z\hookrightarrow X$ の基底変換は閉埋め込みである。とくに $X=\operatorname{Spec}B$、$S=\operatorname{Spec}R$、$S'=\operatorname{Spec}C$、$Z=\operatorname{Spec}(B/I)$ のとき、その閉部分の環は次で与えられる。

$$
(B/I)\otimes_R C\simeq (B\otimes_R C)/I(B\otimes_R C).
$$
<!-- formal-statement-end -->

### 証明の見取り図

開部分については $D(b)$ を基本単位にし、その基底変換が $D(b\otimes1)$ であると確かめます。閉部分は商環の関係式 $I$ を保ったまま係数を取り替えます。

<!-- proof-start -->
### 証明

**開埋め込み。** $X=\operatorname{Spec}B$、$S=\operatorname{Spec}R$、$S'=\operatorname{Spec}C$ のとき、[主開集合の表示](../AG3-03/index.md#prop-ag3-03-principal-affine)と[アフィンファイバー積](#thm-ag3-05-affine-product)から

$$
D_B(b)\times_{\operatorname{Spec}R}\operatorname{Spec}C
\simeq\operatorname{Spec}(B_b\otimes_R C)
\simeq D_{B\otimes_R C}(b\otimes1).
$$

最後の同型は局所化の普遍性によります。これは基底変換後の空間の開部分です。任意の開部分 $U$ は主開集合で覆われ、各部分の表示は重複部分でも同じ開集合に一致します。一般の $X,S,S'$ も、$S$ とその逆像のアフィン開部分に局所化して確認でき、開埋め込みが得られます。

**閉埋め込み。** アフィンの場合、$(B/I)\otimes_R C$ は $B\otimes_R C$ において $i\otimes c$（$i\in I$）をすべて零とする商環です。したがって標準準同型は全射で、その核は $I(B\otimes_R C)$ です。環全射の[素スペクトルの閉集合への射](../AG3-03/index.md#prop-ag3-03-quotient-spectrum)から、対応する射は閉埋め込みです。一般の閉埋め込みは標的のアフィン開部分上でこの形になり、局所表示が重複部分で一致するので大域の結論が従います。
<!-- proof-end -->

ここで**閉埋め込みの基底変換に平坦性は必要ありません**。ただしテンソル積があらゆる単射を保つ、という主張は別物です。後の平坦性の学習ではこの違いが重要になります。

## 5. ファイバーが保持する情報

基底 $S$ の点 $s$ は、単なる集合の元としてだけでなく、[剰余体](../AG3-01/index.md#def-ag3-01-residue-field) $\kappa(s)$ を伴います。$\operatorname{Spec}\kappa(s)\to S$ を用いて基底変換すれば、その点の上にあるスキームが得られます。

<a id="def-ag3-05-fiber"></a>

<!-- formal-statement-start -->
> **定義（点上のファイバーと幾何学的ファイバー）**  
> スキームの射 $f:X\to S$ と点 $s\in S$ に対し、点上のファイバーとは、標準射 $\operatorname{Spec}\kappa(s)\to S$ による基底変換 $X_s=X\times_S\operatorname{Spec}\kappa(s)$ をいう。さらに $\kappa(s)$ の代数閉包 $\overline{\kappa(s)}$ を選んだとき、$X_{\bar s}=X\times_S\operatorname{Spec}\overline{\kappa(s)}$ を幾何学的ファイバーという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-05-fiber -->
### 例：一次元の族の二つのファイバー

**定義の確認** $k$ を標数 $2$ でない体とし、$X=\operatorname{Spec}k[t,x]/(x^2-t)$、$S=\operatorname{Spec}k[t]$ とします。$s_0=(t)$ では $\kappa(s_0)=k$、$s_1=(t-1)$ でも $\kappa(s_1)=k$ です。定義に従う基底変換を計算すると

$$
X_{s_0}\simeq\operatorname{Spec}k[x]/(x^2),
\qquad
X_{s_1}\simeq\operatorname{Spec}k[x]/(x^2-1).
$$

第一のファイバーは冪零元を持ち、第二の環は $(x-1)$ と $(x+1)$ が互いに素なので $k\times k$ に同型です。この差はスキームとしてのファイバーを取らなければ読み取れません。
<!-- definition-example-end -->

<a id="prop-ag3-05-fiber-coordinate"></a>

<!-- formal-statement-start -->
> **命題（アフィンな族の点上のファイバー）**  
> $R$ を可換環、$B$ を $R$-代数、$f:\operatorname{Spec}B\to\operatorname{Spec}R$ を対応する射とする。$s=\mathfrak p\in\operatorname{Spec}R$ の剰余体を $\kappa(\mathfrak p)$ とすると、そのファイバーは次で与えられる。

$$
(\operatorname{Spec}B)_s\simeq
\operatorname{Spec}(B\otimes_R\kappa(\mathfrak p)).
$$

> このファイバーの点は、$B$ の素イデアルで $R$ への逆像が $\mathfrak p$ であるものと一対一に対応する。ただし、ファイバー上の構造層はこの点集合だけでは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

局所化 $R_{\mathfrak p}$ のあと剰余体へ移ることで、$B$ の素イデアルのうち基底で $\mathfrak p$ に写るものだけが残ります。

<!-- proof-start -->
### 証明

最初の同型は[アフィンファイバー積定理](#thm-ag3-05-affine-product)を $C=\kappa(\mathfrak p)$ に適用したものです。

点の対応を確認します。$T=R\setminus\mathfrak p$ と置くと

$$
B\otimes_R\kappa(\mathfrak p)
\simeq T^{-1}B/\mathfrak p(T^{-1}B).
$$

右辺の素イデアルは $T^{-1}B$ の素イデアルで $\mathfrak p(T^{-1}B)$ を含むものに対応します。[局所化による素イデアルの対応](../AG1-04/index.md#thm-ag1-04-universal)を用いると、これは $B$ の素イデアル $\mathfrak q$ で $\mathfrak q\cap R$ が $\mathfrak p$ に含まれ、かつ $\mathfrak pB\subseteq\mathfrak q$ を満たすものです。二条件を合わせると

$$
\mathfrak p\subseteq \mathfrak q\cap R\subseteq\mathfrak p
\quad\Longleftrightarrow\quad
\mathfrak q\cap R=\mathfrak p.
$$

よってファイバーの素点はちょうど所望の素点に対応します。一方、同じ素点集合を持つ環でも冪零元の有無が異なるため、位相的な点の記述だけで構造層を復元することはできません。
<!-- proof-end -->

例えば $k$ が体のとき $X=Y=\operatorname{Spec}\mathbb C$、$S=\operatorname{Spec}\mathbb R$ とします。$\mathbb C\otimes_{\mathbb R}\mathbb C$ は、第二因子の虚数単位 $j$ に関する $\mathbb C[j]/(j^2+1)$ です。$\mathbb C$ 上で

$$
j^2+1=(j-i)(j+i),\qquad (j-i)+( -j-i)=-2i
$$

となり、二つの因子は互いに素なので中国剰余定理から $\mathbb C\times\mathbb C$ です。従ってファイバー積には二点があります。集合としての一点と一点の積を用いる方法では、この二点を検出できません。

## 6. 演習：方程式・普遍性・ファイバー

### A1. 座標を独立に取る

体 $k$ に対し $X=\operatorname{Spec}k[u,v]$、$Y=\operatorname{Spec}k[w]$、$S=\operatorname{Spec}k$ とする。$X\times_SY$ の環と射影に対応する環準同型を求めよ。

- Level: A
- ID: AG3-05-A1

<!-- solution-start -->
### 詳細解答

$k[u,v]$ は $k$ 上で基底 $u^av^b$（$a,b\ge0$）を持ち、$k[w]$ は $w^c$ を基底に持ちます。テンソル積の基底 $u^av^b\otimes w^c$ を $u^av^bw^c$ に写すと積も一致するため

$$
k[u,v]\otimes_k k[w]\simeq k[u,v,w].
$$

射影の反変写像は $u\mapsto u$、$v\mapsto v$ および $w\mapsto w$ という二つの包含です。二つの像は $k$ 上で一致するので普遍性の条件を満たします。
<!-- solution-end -->

### A2. 開部分と閉部分の交わり

$S=\operatorname{Spec}k[t]$、$U=D(t)=\operatorname{Spec}k[t,t^{-1}]$、$Z=\operatorname{Spec}k[t]/(t)$ とし、いずれも $S$ 上の自然な射を持つとする。$U\times_S Z$ を求めよ。

- Level: A
- ID: AG3-05-A2

<!-- solution-start -->
### 詳細解答

[アフィンファイバー積](#thm-ag3-05-affine-product)から環は $k[t,t^{-1}]\otimes_{k[t]}k[t]/(t)$ です。右因子で $t=0$、左因子で $t$ は単元です。テンソル積で

$$
1=t^{-1}t\otimes1=t^{-1}\otimes t\cdot1=0
$$

となるため、この環は零環です。零環の素スペクトルには素イデアルがないので、ファイバー積は空スキームです。$D(t)$ と $V(t)$ が交わらないこととも一致します。
<!-- solution-end -->

### A3. 一点への基底変換

$k$ を体、$R=k[t]$、$B=R[x]/(x^3-t)$ とする。$t\mapsto a$（$a\in k$）で定まる $\operatorname{Spec}k\to\operatorname{Spec}R$ による基底変換の環を求めよ。

- Level: A
- ID: AG3-05-A3

<!-- solution-start -->
### 詳細解答

$\operatorname{Spec}k$ への環準同型は $k[t]\to k$、$t\mapsto a$ です。[多項式表示の命題](#prop-ag3-05-equation)で係数を移すと

$$
B\otimes_{k[t]}k
\simeq k[x]/(x^3-a).
$$

$t$ の像は $a$ に置き換わり、それ以外の $x$ の関係式は追加されません。よってファイバー積はこの環の素スペクトルです。
<!-- solution-end -->

### A4. 閉部分の基底変換

$R=k[t]$、$B=R[x,y]$、$I=(xy-t)$、$C=R/(t)$ とする。$Z=\operatorname{Spec}(B/I)$ の $\operatorname{Spec}C$ への基底変換を求めよ。

- Level: A
- ID: AG3-05-A4

<!-- solution-start -->
### 詳細解答

[閉部分の基底変換](#prop-ag3-05-open-closed-change)より環は

$$
(B/I)\otimes_R C
\simeq C[x,y]/(xy-\bar t).
$$

$C=k[t]/(t)\simeq k$ で $\bar t=0$ ですから

$$
(B/I)\otimes_R C\simeq k[x,y]/(xy).
$$

これは二本の座標軸の合併を表します。単に $xy=0$ の解を列挙するだけでなく、交点における環も保持しています。
<!-- solution-end -->

### B1. 二つのファイバーの違い

$\operatorname{char}k\ne2$ の体 $k$ と $X=\operatorname{Spec}k[t,x]/(x^2-t)$、$S=\operatorname{Spec}k[t]$ を考える。$t=0$ と $t=1$ のファイバーの環を計算し、点集合と冪零元の違いを説明せよ。

- Level: B
- ID: AG3-05-B1

<!-- solution-start -->
### 詳細解答

[点上のファイバー](#def-ag3-05-fiber)の定義と[多項式表示](#prop-ag3-05-equation)を使うと $t=0$ で $k[x]/(x^2)$、$t=1$ で $k[x]/(x^2-1)$ です。第一の環で $\bar x^2=0$、$\bar x\ne0$ なので $\bar x$ は冪零元です。素イデアルは $(\bar x)$ の一つだけです。

第二の環は

$$
x^2-1=(x-1)(x+1),
\qquad (x+1)-(x-1)=2.
$$

$2$ は $k$ で単元なので $(x-1)$ と $(x+1)$ は互いに素です。中国剰余定理で $k[x]/(x^2-1)\simeq k\times k$、点は二つで非零冪零元はありません。標数の条件が必要なのはここです。
<!-- solution-end -->

### B2. 同じ基底座標の二乗を一致させる

$\operatorname{char}k\ne2$ の体 $k$ について $X=\operatorname{Spec}k[x]$、$Y=\operatorname{Spec}k[y]$、$S=\operatorname{Spec}k[t]$ とし、二つの射は環準同型 $t\mapsto x^2$、$t\mapsto y^2$ に対応する。ファイバー積を求め、その既約成分を説明せよ。

- Level: B
- ID: AG3-05-B2

<!-- solution-start -->
### 詳細解答

$k[x]\simeq k[t,x]/(t-x^2)$ と $k[y]\simeq k[t,y]/(t-y^2)$ を使い、[方程式の基底変換](#prop-ag3-05-equation)から

$$
k[x]\otimes_{k[t]}k[y]
\simeq k[t,x,y]/(t-x^2,t-y^2)
\simeq k[x,y]/(x^2-y^2).
$$

標数 $2$ でないため $x^2-y^2=(x-y)(x+y)$ で、二因子は相異なる既約一次式です。[既約集合と素イデアルの対応](../AG1-02/index.md#thm-ag1-02-irreducible-prime)を適用すると二つの既約成分は $V(x-y)$ と $V(x+y)$ です。両者の共通部分は $x-y=x+y=0$、従って $2x=2y=0$ から原点 $(x,y)$ 一点です。成分が重なっていても、それらの和集合はファイバー積の位相空間全体です。
<!-- solution-end -->

### B3. 基底変換を二回行う

$R=k[t]$、$B=R[x]/(x^2-t)$、$C=R/(t^2)$、$D=C/(t)$ とする。$B$ を $R\to C\to D$ に沿って二回基底変換した環と、$R\to D$ に沿って一回で基底変換した環を、それぞれ計算して同型を具体的に示せ。

- Level: B
- ID: AG3-05-B3

<!-- solution-start -->
### 詳細解答

一回目は

$$
B\otimes_R C\simeq k[t,x]/(t^2,x^2-t).
$$

二回目に $C\to D\simeq k$ で $t=0$ と置くと

$$
(B\otimes_R C)\otimes_C D\simeq k[x]/(x^2).
$$

他方、最初から $R\to D$ で $t=0$ とすれば $B\otimes_R D\simeq k[x]/(x^2)$ です。自然同型は純テンソル $(b\otimes c)\otimes d\mapsto b\otimes(cd)$ で、逆は $b\otimes d\mapsto(b\otimes1)\otimes d$ です。$R$-平衡性と $C$-平衡性により well-defined で、両合成は純テンソルで恒等です。[反復基底変換](#prop-ag3-05-associativity)の具体例です。
<!-- solution-end -->

### B4. 一点と一点の積が二点になる理由

$\mathbb R$ 上の $X=Y=\operatorname{Spec}\mathbb C$ に対して $X\times_{\operatorname{Spec}\mathbb R}Y$ の座標環を計算し、位相的な点の個数を求めよ。

- Level: B
- ID: AG3-05-B4

<!-- solution-start -->
### 詳細解答

$\mathbb C\simeq\mathbb R[z]/(z^2+1)$ と書き、左側の $\mathbb C$ を係数環として固定します。すると

$$
\mathbb C\otimes_{\mathbb R}\mathbb C
\simeq\mathbb C[z]/(z^2+1)
=\mathbb C[z]/((z-i)(z+i)).
$$

$(z-i)$ と $(z+i)$ の和には $2i$ が含まれ、$2i$ は $\mathbb C$ の単元です。中国剰余定理から

$$
\mathbb C[z]/((z-i)(z+i))\simeq
\mathbb C[z]/(z-i)\times\mathbb C[z]/(z+i)
\simeq\mathbb C\times\mathbb C.
$$

直積環の素イデアルは $0\times\mathbb C$ と $\mathbb C\times0$ の二つなので二点です。$X,Y$ はそれぞれ一つの素点しか持ちませんが、ファイバー積は素点対の集合の直積と一致しません。
<!-- solution-end -->

### C1. グラフの方程式と普遍性

$k$ を体、$f:\operatorname{Spec}k[x]\to\operatorname{Spec}k[y]$ を $y\mapsto x^2$ で定まる射とする。$\Gamma_f$ を、$(\mathrm{id},f)$ が定める $\operatorname{Spec}k[x]\to\operatorname{Spec}k[x]\times_{\operatorname{Spec}k}\operatorname{Spec}k[y]$ とする。(1) 積の座標環、(2) $\Gamma_f$ の環準同型と核、(3) $\Gamma_f$ が閉埋め込みであること、(4) 任意のスキーム $T$ からの射がグラフへ因子化する条件を示せ。

- Level: C
- ID: AG3-05-C1

<!-- solution-start -->
### 詳細解答

(1) [アフィン積](#thm-ag3-05-affine-product)の環は $k[x]\otimes_k k[y]\simeq k[x,y]$ です。

(2) グラフは二つの射 $\mathrm{id}$ と $f$ からファイバー積の普遍性で得られ、対応する環準同型は

$$
\varphi:k[x,y]\longrightarrow k[x],\qquad
\varphi(x)=x,\quad\varphi(y)=x^2.
$$

$\varphi$ は $x$ を含むので全射です。$y-x^2$ は核に属し、$k[x,y]/(y-x^2)\to k[x]$ は $y$ を $x^2$ と置き換える同型なので $\ker\varphi=(y-x^2)$ です。

(3) [商環の素スペクトルの閉埋め込み](../AG3-03/index.md#prop-ag3-03-quotient-spectrum)により $\Gamma_f$ は $V(y-x^2)$ への閉埋め込みです。

(4) $T$ の射 $a:T\to\operatorname{Spec}k[x,y]$ がグラフを経由するための必要十分条件は、$a$ の定める $x$ と $y$ の引き戻し切断について $a^\#(y)=a^\#(x)^2$ が成り立つことです。必要性は $\varphi(y-x^2)=0$ から従います。十分性はアフィン開被覆 $T_\lambda$ 上で $k[x,y]\to\Gamma(T_\lambda,\mathcal O_T)$ がイデアル $(y-x^2)$ を殺すため、商環 $k[x]$ を経由する唯一の環準同型があることによります。各 $T_\lambda$ の射は重複部分で一致し、[射の貼り合わせ](../AG3-04/index.md#thm-ag3-04-morphism-gluing)で一意の因子化を得ます。これによりグラフは方程式としても普遍性としても特徴付けられます。
<!-- solution-end -->

### C2. 特異ファイバーと冪零ファイバーを比較する

体 $k$ と二つの $k[t]$-代数

$$
B=k[t,x,y]/(xy-t),\qquad
C=k[t,z]/(z^2-t)
$$

を考える。それぞれのスキームの $t=0$ および $t=1$ におけるファイバーを求め、(1) $B$ の $t=0$ ファイバーが二本の軸の合併であること、(2) $B$ の $t=1$ ファイバーが乗法群の座標環 $k[x,x^{-1}]$ であること、(3) $C$ の $t=0$ ファイバーでは零でない冪零元が生じることを証明せよ。

- Level: C
- ID: AG3-05-C2

<!-- solution-start -->
### 詳細解答

点 $s_a=(t-a)$（$a=0,1$）の剰余体は $k$ です。[ファイバーの座標環](#prop-ag3-05-fiber-coordinate)と[方程式の係数変更](#prop-ag3-05-equation)で

$$
B\otimes_{k[t]}k\simeq k[x,y]/(xy-a),\qquad
C\otimes_{k[t]}k\simeq k[z]/(z^2-a)
$$

を得ます。

(1) $a=0$ の前者は $k[x,y]/(xy)$。$xy$ が零となる素イデアル $\mathfrak q$ では素性により $x\in\mathfrak q$ または $y\in\mathfrak q$ です。したがってスペクトルは $V(x)\cup V(y)$。一方、$xy$ は相異なる既約元 $x,y$ の積なので $(xy)=(x)\cap(y)$ は根基イデアルです。ゆえにこのファイバーは被約であり、交点で冪零元を持ちません。

(2) $a=1$ では $xy=1$ です。$x$ は $y$ を逆元とする単元なので

$$
k[x,y]/(xy-1)\longrightarrow k[x,x^{-1}],
\qquad x\mapsto x,\quad y\mapsto x^{-1}
$$

は同型です。逆写像は $x\mapsto \bar x$、$x^{-1}\mapsto\bar y$ で、$\bar x\bar y=1$ により well-defined です。

(3) $a=0$ の後者は $k[z]/(z^2)$ です。$\bar z$ は零でなく（$z\notin(z^2)$）、$\bar z^2=0$ です。したがって $B$ の交差する二成分と、$C$ の厚みを持つ一点とは、どちらも $t=0$ で形が変わるもののスキームとして異なります。参考として $a=1$ では $C$ のファイバーは $k[z]/(z^2-1)$ であり、標数 $2$ でない場合に限り $k\times k$ と分解します。
<!-- solution-end -->

## 7. 次の道具へ

ファイバー積は「同じ基底の上の二つの射を一致させる」普遍的な構成です。アフィンではテンソル積、一般には開チャートの貼り合わせがその実体となります。閉部分を係数変更しても閉部分として残ること、点上のファイバーに冪零情報が残ることを確認しました。

次に層の構成を扱うときは、環 $B$ だけでなく $B$-加群を各アフィン開部分へ対応させます。そこで局所化と貼り合わせをもう一度使うことになります。
