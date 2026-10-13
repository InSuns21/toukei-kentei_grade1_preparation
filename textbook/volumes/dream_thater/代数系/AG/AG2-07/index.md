# AG2-07 Weil因子・Cartier因子と可逆層

前章では、[可逆層](../AG2-06/index.md#def-ag2-06-invertible-sheaf)を局所基底と遷移関数で構成しました。例えば $\mathbb P^1$ の $\mathcal O(1)$ には $S,T$ という大域切断があります。しかし切断 $S$ の零点 $[0:1]$ を、単なる集合として記録しただけでは、$S^2$ が同じ点で「二重に」零になることを区別できません。

零点・極に整数の重複度を付けて足し合わせる方法と、各近傍で零点・極を作る一つの有理関数を指定して重なりで照合する方法があります。後者の関数を逆数にして局所基底とすると可逆層が生まれます。これらがどこまで同じ情報なのか、滑らかな曲線で証明し、特異点では何が壊れるかを検討します。

以下、基礎体は $k=\mathbb C$ です。$X$ はまず既約な代数曲線（または明示したときは既約な代数多様体）とし、$K=k(X)$ はその有理関数体です。主な完全証明の舞台は **滑らかな既約射影平面曲線** と $\mathbb P^1$ です。「因子」と言っても、点の和と局所関数の組とでは最初から定義が異なることに注意します。

## 1. なぜ零点を整数付きで数えるのか

$\mathbb A^1$ の座標 $t$ について、$t$ と $t^3$ は零点集合がともに $\{0\}$ ですが、$t^3$ を $t$ で割っても $t^2$ が残ります。一方、$1/t$ は $0$ で値を取れず、そこに一次の極があります。そこで零点には正、極には負の整数を与えます。

点 $P$ で消え、しかもその点で消える正則関数のすべてを局所的に割り切る一つの関数を考えます。この関数が存在すれば、零点と極を整数で数える基準になります。その存在と、有理関数の一意的な整数冪分解は次節で証明します。

<a id="def-ag2-07-local-parameter"></a>

<!-- formal-statement-start -->
> **定義（局所パラメータ）**  
> 既約代数曲線 $C$ の点 $P$ で、局所環 $\mathcal O_{C,P}$ の極大イデアル $\mathfrak m_P$ を一つの元 $t_P\in\mathfrak m_P$ が生成するとき、$t_P$ を $P$ の局所パラメータという。存在するかどうかは曲線と点の性質による。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-07-local-parameter -->
**定義の確認**：$\mathbb A^1$ の $P=0$ では、局所環 $\mathbb C[t]_{(t)}$ の極大イデアルは $(t)$ です。$t$ が局所パラメータであり、$t^m$ の零点位数を $m$ と数えられます。滑らかな平面曲線についても次節でこの性質を証明します。
<!-- definition-example-end -->

<a id="def-ag2-07-weil-divisor"></a>

<!-- formal-statement-start -->
> **定義（Weil因子・有効因子・次数）**  
> $X$ を既約な代数曲線とする。$X$ の閉点 $P$ を形式的な記号 $[P]$ として、有限個を除き $n_P=0$ となる整数族 $(n_P)$ の和

$$
D=\sum_{P\in X}n_P[P]
$$

> を **Weil因子** と呼ぶ。すべての $n_P\ge0$ のとき $D$ を有効と書き、$D\ge0$ と表す。$X$ が射影曲線で $k=\mathbb C$ のとき、次数を $\deg D=\sum_Pn_P$ とする。加法は各点の係数ごとに定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-07-weil-divisor -->
**定義の確認**：異なる点 $P,Q$ に対して $D=2[P]-[Q]$ はWeil因子ですが有効ではなく、$D+[Q]=2[P]\ge0$ です。$\deg D=1$ であり、$2[P]$ と $[P]$ は同じ集合を台に持っていても異なる因子です。
<!-- definition-example-end -->

高次元では点でなく**既約な余次元1の部分多様体**を基底にして同じ有限和を作ります。曲面上の曲線がこれに当たり、曲面上の点は余次元2なのでWeil因子の項にはなりません。以後の零点位数の計算を無条件に高次元の任意の特異多様体へ拡張はしません。

## 2. 滑らかな曲線で位数を定義する

[点の局所環](../AG1-04/index.md#def-ag1-04-point-local-ring)の元は点の近くで定義された正則関数の局所的な表示を表します。滑らかな平面曲線なら、二つの座標のうち一つをもう一つの倍数として局所表示できるため、極大イデアルを一つの元で生成できます。

<a id="lem-ag2-07-local-parameter"></a>

<!-- formal-statement-start -->
> **補題（滑らかな平面曲線の局所パラメータと位数）**  
> $F\in\mathbb C[x,y]$ を既約多項式、$C=V(F)$ とし、$P=(a,b)\in C$ が $F_y(P)\ne0$ を満たすとする。$A=\mathcal O_{C,P}$ と $t=x-a$ について

$$
\mathfrak m_P=(t),\qquad
K(C)^\times=\{t^nu:n\in\mathbb Z,\ u\in A^\times\}
$$

> が成り立つ。各 $f\in K(C)^\times$ の指数 $n$ は一意である。$F_x(P)\ne0$ の場合は $t=y-b$ に交換した同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$F(a,b)=0$ を使って $F(x,y)$ を $x-a$ と $y-b$ で分解します。$F_y(P)\ne0$ なので $y-b$ が $x-a$ の倍数になります。さらに局所環はNoether環であるため、非零元が $t$ で無限回割り切れる事態は起きません。

<!-- proof-start -->
### 証明

差の因数分解により多項式 $H,G$ を選んで

$$
F(x,y)-F(a,b)=(x-a)H(x,y)+(y-b)G(x,y)
$$

と書けます。$G(P)=F_y(P)\ne0$ となるように、例えば $F(x,y)-F(x,b)$ を $y-b$ で割って $G$ とし、$F(x,b)-F(a,b)$ を $x-a$ で割って $H$ とすればよいです。$A$ では $F=0$、かつ $G$ は $P$ で非零なので単元です。したがって

$$
y-b=-(x-a)H/G.
$$

局所環の極大イデアルは $x-a,y-b$ で生成されますから $\mathfrak m_P=(t)$ です。

$F$ が既約なので $\mathbb C[x,y]/(F)$ は整域です。[有限変数多項式環のNoether性](../AG1-05/index.md#cor-ag1-05-multivariate-noether)と[商環・局所化でのNoether性の保存](../AG1-05/index.md#prop-ag1-05-quotient-localization)を順に適用すると、$A=(\mathbb C[x,y]/(F))_{(x-a,y-b)}$ はNoether整域です。そこで $I=\bigcap_{r\ge0}t^rA$ と置きます。$A$ がNoetherなので、$I$ は有限生成イデアルです。また $z\in I$ なら $z=tw$ と書け、$z\in t^{r+1}A$ から整域での $t$ の約分により $w\in t^rA$ が各 $r$ に対して従います。ゆえに $I=tI$ です。

$I$ の生成元を $z_1,\ldots,z_m$ とし、$z_i=t\sum_j a_{ij}z_j$ と書きます。係数行列 $I_m-t(a_{ij})$ の行列式は $1$ と $\mathfrak m_P$ の元の和なので単元です。随伴行列を掛ければ $z_i=0$ がすべての $i$ について従い、$I=0$ です。

非零 $a\in A$ について、$a\notin I$ なので $a\in t^nA$ となる整数 $n\ge0$ に最大値があります。$a=t^nu$ と書けば、$u\notin tA=\mathfrak m_P$ なので $u\in A^\times$ です。任意の非零有理関数 $f=a/b$ を二つの非零元の商として表し、各元の分解を割り算すれば $f=t^{n_a-n_b}(u_a/u_b)$ です。

もし $t^nu=t^mv$ で $u,v$ が単元、$n>m$ なら $v=t^{n-m}u$ は極大イデアルに入って単元でなくなるため矛盾します。したがって指数は一意です。$F_x(P)\ne0$ の場合も二座標を入れ替えて同じ計算ができます。
<!-- proof-end -->

<a id="def-ag2-07-order-principal"></a>

<!-- formal-statement-start -->
> **定義（位数・主因子）**  
> 上のように局所環が局所パラメータ $t_P$ の整数冪と単元で分解できる曲線の点 $P$ で、$f=t_P^nu$ と書ける非零有理関数 $f$ の位数を $\operatorname{ord}_P(f)=n$ とする。すべての点でこの分解が成り立つ滑らかな既約曲線上では

$$
\operatorname{div}(f)
=\sum_P\operatorname{ord}_P(f)[P]
$$

> を $f$ の **主因子** と呼ぶ。二つの因子の差が主因子なら、それらは **線形同値** であり $D\sim E$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-07-order-principal -->
**定義の確認**：放物線 $y=x^2$ の原点では $t=x$ が局所パラメータで、$y=t^2$ です。従って $\operatorname{ord}_0(x)=1$、$\operatorname{ord}_0(y)=2$、$\operatorname{ord}_0(1/x)=-1$ です。単に零点であるかどうかでなく、何回局所パラメータで割れるかを数えています。
<!-- definition-example-end -->

位数は乗法と両立します。$f=t_P^au$、$g=t_P^bv$ なら $fg=t_P^{a+b}uv$ で、$uv$ は単元なので

$$
\operatorname{ord}_P(fg)=\operatorname{ord}_P(f)+\operatorname{ord}_P(g).
$$

従って主因子は $\operatorname{div}(fg)=\operatorname{div}(f)+\operatorname{div}(g)$ を満たします。非零有理関数の主因子の台は有限です。アフィンチャート上で $f=p/q$ と書けば、位数が非零となりうるのは $p$ または $q$ の零点だけであり、既約曲線上の非零多項式の零点は有限です。射影曲線は有限個の標準アフィンチャートで覆えるため、全体でも有限個です。

## 3. 局所方程式としてのCartier因子

Weil因子は零点の場所と重複度を列挙します。それに対し、局所方程式による方法では開集合ごとに「この関数の零・極を見ている」という局所方程式を保持します。局所方程式が別の近傍で単元倍だけ変わることを要求するのが鍵です。

<a id="def-ag2-07-cartier-divisor"></a>

<!-- formal-statement-start -->
> **定義（Cartier因子）**  
> $X$ を既約代数多様体、$K=k(X)$ を有理関数体とする。開被覆 $X=\bigcup_iU_i$ を取る。

> 各 $U_i$ に非零有理関数 $f_i\in K^\times$ を指定し、重なり $U_i\cap U_j$ 上で比 $f_i/f_j$ が正則な単元となる組を **Cartier因子の局所表示** という。

> 開被覆を細分したとき、局所方程式の比が正則単元となる表示を同一視し、得られる対象をCartier因子と呼ぶ。

> 各 $f_i$ が局所的に正則なら有効Cartier因子と呼ぶ。全体の一つの有理関数 $f$ で表されるものを主Cartier因子と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-07-cartier-divisor -->
**定義の確認**：$\mathbb P^1$ の $U_S=\{S\ne0\}$、$U_T=\{T\ne0\}$ に対し、$x=T/S$、$y=S/T$ とします。点 $P_\infty=[0:1]$ の局所方程式を $f_S=1$、$f_T=y$ と置くと、重なりで $f_S/f_T=1/y=x$ は単元です。$U_T$ の $y=0$ にだけ単純零点を持つので、これは点 $[P_\infty]$ を表す有効Cartier因子です。
<!-- definition-example-end -->

単元倍の条件を「非零な有理関数倍」と弱めることはできません。もし任意の有理関数倍を許すなら、例えば $1$ と $y$ は $y=0$ を含む領域でも無条件に同じ局所方程式となり、零点の情報を失います。

滑らかな曲線では、位数を使って二種類の因子を照合できます。

<a id="prop-ag2-07-cartier-to-weil"></a>

<!-- formal-statement-start -->
> **命題（Cartier因子からWeil因子へ）**  
> $C$ を滑らかな既約射影平面曲線とする。Cartier因子の局所表示 $(U_i,f_i)$ について、$P\in U_i$ で

$$
n_P=\operatorname{ord}_P(f_i)
$$

> と置くと、$n_P$ は局所表示の選び方によらず、有限個を除いて $0$ となる。従って $\sum_Pn_P[P]$ はWeil因子であり、この対応は加法を保ち、主Cartier因子を通常の主因子へ送る。
<!-- formal-statement-end -->

### 証明の見取り図

同じ点を含む二つの近傍では $f_i/f_j$ が単元なので位数は $0$ です。位数の加法性によって局所方程式に依存しない係数を得ます。

<!-- proof-start -->
### 証明

$P\in U_i\cap U_j$ とします。$u=f_i/f_j$ と置くと、$u$ は $P$ で正則な単元なので $\operatorname{ord}_P(u)=0$ です。$f_i=uf_j$ と位数の加法性から

$$
\operatorname{ord}_P(f_i)
=\operatorname{ord}_P(u)+\operatorname{ord}_P(f_j)
=\operatorname{ord}_P(f_j).
$$

別の細分表示でも、同一のCartier因子を表すため比は局所単元となり、同じ議論が成り立ちます。有限被覆を取り、各 $f_i$ の零点・極の有限性を適用すると、非零係数を持つ点の集合も有限です。

局所表示を掛け合わせたとき、点 $P$ の係数は $\operatorname{ord}_P(f_ig_i)$ です。これは二つの位数の和なので加法的です。主Cartier因子 $(f)$ はどのチャートでも $f$ を局所方程式とするため、対応先は $\operatorname{div}(f)$ です。
<!-- proof-end -->

## 4. 滑らかな曲線では二つの因子は一致する

任意のWeil因子 $D=\sum_Pn_P[P]$ が与えられたとします。点 $P$ の近くでは $t_P^{n_P}$ を局所方程式として使えば、求める零点と極の重複度を再現できます。別の点で余分な零点が生じないよう開集合を狭め、台の外では $1$ を選びます。

<a id="thm-ag2-07-weil-cartier-curve"></a>

<!-- formal-statement-start -->
> **定理（滑らかな平面曲線のWeil因子とCartier因子）**  
> $C\subset\mathbb P^2_{\mathbb C}$ を滑らかな既約射影平面曲線とする。このときCartier因子からWeil因子への写像は加法群の同型である。

$$
\operatorname{CaDiv}(C)\simeq\operatorname{Div}(C).
$$

> 主因子同士も対応する。したがってCartier因子の主因子による商と、Weil因子の線形同値による商は一致する。
<!-- formal-statement-end -->

### 証明の見取り図

全射性では各点の局所パラメータを使います。単射性では、すべての点で位数 $0$ の有理関数は、各局所環で単元だという事実を使います。曲線の滑らかさが、この二つの議論を可能にします。

<!-- proof-start -->
### 証明

まず全射性を示します。$D=\sum_{P\in S}n_P[P]$ とし、$S$ は係数が非零な有限集合とします。

各 $P\in S$ では[滑らかな平面曲線の局所パラメータと位数](#lem-ag2-07-local-parameter)をアフィンチャートに適用し、$t_P$ を選びます。$t_P$ は $P$ で位数 $1$ を持つ有理関数です。

$P$ の十分小さな開近傍 $V_P$ を選びます。$t_P$ とその逆数は $V_P\setminus\{P\}$ 上でともに正則です。実際、局所パラメータの分数表示の分母が非零となる領域に狭め、他の零点・極は有限個なので除去できます。

$V_P$ では $f_P=t_P^{n_P}$ を置き、$U_0=C\setminus S$ では $f_0=1$ と置きます。$P\ne Q$ なら $V_P\cap V_Q$ の上ではどちらの局所方程式も零・極を持たず、各点の局所環で単元です。正則性と可逆性は局所的に判定できるので、その比も重なりで正則単元です。同じく $V_P\cap U_0$ でも $f_P$ は単元です。従ってこれらはCartier因子を定め、対応するWeil因子は $D$ です。

次に単射性を示します。あるCartier因子 $(U_i,f_i)$ が零Weil因子に写るとします。各点 $P\in U_i$ で $\operatorname{ord}_P(f_i)=0$ です。[滑らかな平面曲線の局所パラメータと位数](#lem-ag2-07-local-parameter)より $f_i$ は点 $P$ の局所環の単元です。従って $f_i$ と $1/f_i$ はともに各点の近くで正則で、$\mathcal O_C(U_i)^\times$ の元です。局所方程式を $1$ に替えられるので、このCartier因子は零です。

最後に主因子については[Cartier因子からWeil因子への命題](#prop-ag2-07-cartier-to-weil)で示したように、$(f)$ が $\operatorname{div}(f)$ に写ります。従って主因子による商にも同型が誘導されます。
<!-- proof-end -->

ここで言えるのは、まず **滑らかな曲線では** 二つが対応するということです。高次元や特異点を持つ多様体でこの同型を理由なく使うことはできません。特にWeil因子は余次元1の部分集合の情報ですが、Cartier因子はその集合が局所的に一つの方程式で切り出せるという、より強い条件を要求します。

## 5. Cartier因子が可逆層を作る

前章の遷移関数は $e_j=g_{ij}e_i$ という向きでした。Cartier因子 $D=(U_i,f_i)$ では、重なりの単元 $f_i/f_j$ がそのまま遷移関数になります。局所基底を形式的な $1/f_i$ と解釈すると、切断の零・極条件も同時に読めます。

<a id="def-ag2-07-associated-line-bundle"></a>

<!-- formal-statement-start -->
> **定義（因子に付随する可逆層）**  
> $X$ を既約代数多様体、$D$ を局所表示 $(U_i,f_i)$ を持つCartier因子とする。開集合 $W\subseteq U_i$ に対して、$W$ 上の正則関数 $a$ の $a/f_i$ という有理関数表示を局所切断とし、局所基底 $e_i=1/f_i$ を採用して貼り合わせた可逆層を $\mathcal O_X(D)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-07-associated-line-bundle -->
**定義の確認**：$D=[0:1]$ を $\mathbb P^1$ 上で $f_S=1$、$f_T=y$ と表すと $e_S=1$、$e_T=1/y$ です。重なりで $e_T=(1/y)e_S=x e_S$ となり、[射影直線の$\mathcal O(1)$](../AG2-06/index.md#def-ag2-06-twisting-sheaf)の基底変換と一致します。
<!-- definition-example-end -->

<a id="prop-ag2-07-associated-gluing"></a>

<!-- formal-statement-start -->
> **命題（因子からの貼り合わせと切断条件）**  
> $D=(U_i,f_i)$ をCartier因子とすると、$\mathcal O_X(D)$ は可逆層であり、その局所基底の遷移関数は

$$
e_j=\frac{f_i}{f_j}e_i
$$

> である。さらに $X$ が滑らかな既約曲線のとき、非零有理関数 $g\in K^\times$ が $\mathcal O_X(D)$ の大域切断を与えるための必要十分条件は

$$
\operatorname{div}(g)+D\ge0
$$

> である。零関数も常に切断を与える。
<!-- formal-statement-end -->

### 証明の見取り図

$1/f_j=(f_i/f_j)(1/f_i)$ は基底の変換そのものです。大域切断 $g$ は、各局所基底 $1/f_i$ の係数 $g f_i$ が正則ならよく、その条件を各点の位数で書き換えます。

<!-- proof-start -->
### 証明

$f_i/f_j$ は $U_i\cap U_j$ 上の単元です。三重の重なりでは

$$
\frac{f_i}{f_j}\frac{f_j}{f_k}
=\frac{f_i}{f_k},
$$

なので[遷移関数による可逆層の構成](../AG2-06/index.md#prop-ag2-06-gluing-transitions)の仮定を満たします。各チャートで $e_i=1/f_i$ を基底とする階数1の層を貼り合わせ、可逆層を得ます。Cartier因子の表示を単元倍に替えても、局所基底が単元倍に替わるだけで同型の層が得られます。

曲線上の有理関数 $g$ は $U_i$ では $g=(gf_i)e_i$ と表されます。$gf_i$ が正則であることと、すべての $P\in U_i$ で $\operatorname{ord}_P(gf_i)\ge0$ であることは、局所パラメータによる分解から同値です。位数の加法性より

$$
\operatorname{ord}_P(gf_i)
=\operatorname{ord}_P(g)+\operatorname{ord}_P(f_i)
=\operatorname{ord}_P(g)+n_P.
$$

すべてのチャートで正則となる条件は各 $P$ について右辺が非負であることなので、$\operatorname{div}(g)+D\ge0$ が必要十分です。$g=0$ の場合は係数がどのチャートでも $0$ で、常に切断です。
<!-- proof-end -->

この表示から、**有効因子 $D$ に対して $1$ は $\mathcal O(D)$ の大域切断**になることが分かります。実際、$D=\operatorname{div}(1)+D\ge0$ です。ただしその切断 $1$ の局所係数は $f_i$ なので、$D$ の台上では零になります。「有理関数 $1$ は零でない」と「線束の切断として零点を持たない」は別の主張です。

## 6. 因子類と直線束の同型類

因子に付随する可逆層は主因子を加えても同型類が変わりません。例えば $D+\operatorname{div}(h)$ の局所方程式は $hf_i$ であり、$1/(hf_i)$ という新しい局所基底を $1/f_i$ に対応させられます。逆に任意の可逆層は、有理関数体上で一つ基底を選べば局所方程式を持つ因子から作れます。

<a id="thm-ag2-07-cartier-picard"></a>

<!-- formal-statement-start -->
> **定理（Cartier因子類と可逆層の同型類）**  
> $X$ を既約代数多様体とする。Cartier因子の群を主Cartier因子で割った群は、可逆層のテンソル積による同型類の群 $\operatorname{Pic}(X)$ と自然に同型である。

$$
\operatorname{CaDiv}(X)/\operatorname{Prin}(X)
\simeq\operatorname{Pic}(X),\qquad
[D]\longmapsto[\mathcal O_X(D)].
$$
<!-- formal-statement-end -->

### 証明の見取り図

テンソル積では局所方程式も掛け算になります。主因子なら全体の一つの有理関数で基底を揃えられます。任意の可逆層から逆向きに因子を作るには、その有理関数体上の一次元ベクトル空間に非零元を一つ選びます。

<!-- proof-start -->
### 証明

$D=(f_i)$、$E=(h_i)$ の共通細分被覆を取ります。$\mathcal O(D)$ と $\mathcal O(E)$ の局所基底は $1/f_i,1/h_i$ なのでテンソル積の基底の遷移関数は

$$
\frac{f_i}{f_j}\frac{h_i}{h_j}
=\frac{f_ih_i}{f_jh_j}.
$$

これは $D+E$ の局所方程式 $f_ih_i$ に付随する層の遷移関数です。従って[テンソル積の貼り合わせ](../AG2-06/index.md#prop-ag2-06-tensor-dual)と同じ計算により $\mathcal O(D+E)\simeq\mathcal O(D)\otimes\mathcal O(E)$ です。

$D=\operatorname{div}(h)$ が一つの大域有理関数で表示される主Cartier因子なら、全チャートで $f_i=h$ を取れて遷移関数は $1$ です。したがって $\mathcal O(D)$ は自明です。ゆえに群準同型は商へ降ります。

全射性を示します。可逆層 $\mathcal L$ の各局所基底を $e_i$ とし、遷移関数を $e_j=g_{ij}e_i$ とします。$X$ は既約なので、任意の二つの非空開集合が交わります。各非空 $U_i$ 上の局所基底 $e_i$ から一次元 $K$-ベクトル空間 $K e_i$ を作り、重なりの $e_j=g_{ij}e_i$ によって同一視します。遷移関数は $g_{ij}g_{jk}=g_{ik}$ を満たすので、この同一視は三重の重なりでも整合します。こうして得た共通の一次元 $K$-ベクトル空間で非零元 $s$ を選び、各 $i$ について $s=h_i e_i$ と表します。$h_i\in K^\times$ で、$h_i e_i=h_j e_j=h_jg_{ij}e_i$ より

$$
h_i=h_jg_{ij},\qquad
\frac{h_i}{h_j}=g_{ij}\in\mathcal O^\times(U_i\cap U_j).
$$

従って $(h_i)$ はCartier因子を定めます。その付随層の基底 $1/h_i$ は $1/h_j=(h_i/h_j)(1/h_i)$ と変換するため、$1/h_i\mapsto e_i$ は重なりで一致する同型を与えます。よって $\mathcal L\simeq\mathcal O((h_i))$ です。

単射性を示します。$\mathcal O(D)\simeq\mathcal O_X$ なら、$1$ の像は全点で局所基底となる大域切断です。これを有理関数 $g\in K^\times$ として読むと、各 $U_i$ で $g f_i$ は正則単元です。従って局所方程式 $f_i$ と $1/g$ は単元倍しか違わず、$D$ は主Cartier因子 $(1/g)$ と等しいです。核が主因子に一致するので証明が終わります。
<!-- proof-end -->

滑らかな射影平面曲線では[WeilとCartierの同型](#thm-ag2-07-weil-cartier-curve)を合成して

$$
\operatorname{Div}(C)/\operatorname{Prin}(C)\simeq\operatorname{Pic}(C)
$$

となります。任意の特異曲線や特異曲面で同じ同型を無条件に書いてはいけません。

## 7. $\mathbb P^1$ の因子類を計算する

$\mathbb P^1$ で $t=T/S$、$P_a=[1:a]$、$P_\infty=[0:1]$ とします。$t-a$ は $P_a$ に一次の零点、$P_\infty$ に一次の極を持ちます。実際、$U_S$ 上では $t-a$ は単項一次、$U_T$ 上で $y=S/T$ とすると

$$
t-a=\frac{1-ay}{y}
$$

となり、$y=0$ で分子は $1$ です。従って

$$
\operatorname{div}(t-a)=[P_a]-[P_\infty].
$$

<a id="thm-ag2-07-p1-picard"></a>

<!-- formal-statement-start -->
> **定理（射影直線の因子類とPicard群）**  
> $\mathbb P^1_{\mathbb C}$ の任意のWeil因子 $D$ は $\deg D=d$ とすると $d[P_\infty]$ に線形同値であり、次数写像は同型を与える。

$$
\operatorname{Pic}(\mathbb P^1)\simeq\mathbb Z,\qquad
[\mathcal O(D)]\longmapsto\deg D.
$$

> 特に $\mathcal O(D)\simeq\mathcal O(d)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

有限点 $P_a$ は $t-a$ の主因子を足し引きして無限遠点に置き換えられます。主因子の次数が $0$ であることから、残る無限遠点の係数 $d$ は一意です。

<!-- proof-start -->
### 証明

有限な台を持つ因子を

$$
D=\sum_{a\in A}n_a[P_a]+n_\infty[P_\infty]
$$

と書きます。$f(t)=\prod_{a\in A}(t-a)^{n_a}\in\mathbb C(t)^\times$ を作ります。負指数も有理関数として許されます。位数の加法性より

$$
\operatorname{div}(f)
=\sum_{a\in A}n_a[P_a]
-\left(\sum_{a\in A}n_a\right)[P_\infty].
$$

従って $D-\operatorname{div}(f)=d[P_\infty]$、ただし $d=n_\infty+\sum_a n_a=\deg D$ です。

逆に $\mathbb C(t)^\times$ の任意の元は互いに素な多項式の商 $p(t)/q(t)$ で表せます。複素数上の一次因子分解により、有限点での零点位数の総和は $\deg p-\deg q$ です。無限遠点で $y=1/t$ とすると

$$
\frac{p(1/y)}{q(1/y)}
=y^{\deg q-\deg p}
\frac{y^{\deg p}p(1/y)}{y^{\deg q}q(1/y)},
$$

最後の分数は $y=0$ で非零の定数値を持つため、無限遠での位数は $\deg q-\deg p$ です。よって全点での位数和は $0$ となり、主因子の次数は $0$ です。したがって次数の異なる $d[P_\infty]$ は線形同値にならず、次数で類が一意に決まります。

前節の[Cartier因子類と可逆層](#thm-ag2-07-cartier-picard)によってPicard群へ移ります。$[P_\infty]$ の局所方程式は $f_S=1,f_T=y$ であり、[付随層の例](#def-ag2-07-associated-line-bundle)から $\mathcal O([P_\infty])\simeq\mathcal O(1)$ です。[可逆層のテンソル積と双対](../AG2-06/index.md#prop-ag2-06-tensor-dual)を使うと、正の $d$ は $\mathcal O(1)$ の $d$ 回テンソル積、負の $d$ はその双対の $-d$ 回テンソル積に対応するため、すべての整数 $d$ について $\mathcal O(d[P_\infty])\simeq\mathcal O(d)$ となります。
<!-- proof-end -->

例えば $D=[P_2]-2[P_0]+3[P_\infty]$ は次数 $2$ なので $\mathcal O(D)\simeq\mathcal O(2)$ です。しかし $D$ 自身と $2[P_\infty]$ は等しい因子ではなく、主因子を加えた**線形同値類**が同じです。

## 8. 特異点では何が壊れるか

滑らかな曲線で重要だったのは、局所環の極大イデアルが局所パラメータ一つで生成されることでした。この条件を外すと、Weil因子として数えた余次元1の集合が、Cartier因子として一つの正則方程式で切り出せるとは限りません。

例えば二次円錐 $X=V(uw-v^2)\subset\mathbb A^3$ の原点 $O=(0,0,0)$ における局所環を $A$、極大イデアルを $\mathfrak m=(u,v,w)A$ とします。曲線 $L=V(u,v)\subset X$ のイデアル $I=(u,v)A$ は原点で一つの元で生成できません。実際、$\mathfrak m I$ の元はすべて次数2以上の式から成り、$I/\mathfrak m I$ では $u,v$ の像が一次の独立な二元を与えます。もし $I=(h)$ なら $I/\mathfrak m I$ は $h$ の像一つで生成されるはずなので矛盾します。

この例は、**既約曲線 $L$ をその被約な局所方程式として一本で切り出すことはできない**という障害を具体化します。$\mathbb P^1$ で使えた「各点で一つのパラメータの冪を取る」方法を、特異点を含む高次元の空間へ勝手に一般化しないでください。一般のWeil因子がCartier因子になるかどうかは、局所環の追加条件が必要です。

## 9. 演習：位数・貼り合わせ・因子類

以下、特記しない限り $k=\mathbb C$ とします。局所方程式と因子の同値類を混同せず、位数の計算を明示してください。

**Level A：定義と局所計算**

### A1. 射影直線の座標関数

$\mathbb P^1$ の $t=T/S$ について $\operatorname{div}(t)$ とその次数を求めよ。

- Level: A
- ID: AG2-07-A1

<!-- solution-start -->
**詳細解答。** $U_S$ 上で $t$ の零点は $t=0$、つまり $P_0=[1:0]$ で、$t$ 自身が局所パラメータなので位数は $1$ です。$U_T$ 上では $t=1/y$、$y=S/T$ は $P_\infty=[0:1]$ で局所パラメータなので位数は $-1$ です。他の点では $t$ は正則単元です。従って $\operatorname{div}(t)=[P_0]-[P_\infty]$、次数は $1-1=0$ です。
<!-- solution-end -->

### A2. 放物線の重複度

$C=V(y-x^2)$ の原点 $P$ で $x,y,x^3/y$ の位数を計算せよ。

- Level: A
- ID: AG2-07-A2

<!-- solution-start -->
**詳細解答。** $F=y-x^2$ なら $F_y(P)=1$ なので[局所パラメータ補題](#lem-ag2-07-local-parameter)を適用し、$t=x$ が局所パラメータです。座標環の等式 $y=x^2=t^2$ を使うと、$\operatorname{ord}_P(x)=1$、$\operatorname{ord}_P(y)=2$ です。また $x^3/y=t^3/t^2=t$ が有理関数体で成り立つため位数は $1$ です。分子・分母の位数の差 $3-2=1$ とも一致します。
<!-- solution-end -->

### A3. Cartier因子からの遷移関数

$\mathbb P^1$ の $D=[P_\infty]$ に対し、$U_S,U_T$ の局所方程式を与え、$\mathcal O(D)$ の基底変換を求めよ。

- Level: A
- ID: AG2-07-A3

<!-- solution-start -->
**詳細解答。** $U_S$ は $P_\infty$ を含まないため $f_S=1$、$U_T$ では $f_T=y=S/T$ と置きます。重なりでは $f_S/f_T=1/y=x$ が正則単元であるためCartier因子の条件を満たします。局所基底 $e_S=1/f_S=1$、$e_T=1/f_T=1/y$ は $e_T=(1/y)e_S=x e_S$ と変換されます。これは[射影直線の$\mathcal O(1)$](../AG2-06/index.md#def-ag2-06-twisting-sheaf)の遷移規則に一致します。
<!-- solution-end -->

### A4. 因子による極の許容量

$D=[P_\infty]$ のとき、$g=1$、$g=t$、$g=1/t$ が $\mathcal O(D)$ の大域切断になるか判定せよ。

- Level: A
- ID: AG2-07-A4

<!-- solution-start -->
**詳細解答。** [切断条件](#prop-ag2-07-associated-gluing)により $\operatorname{div}(g)+D\ge0$ を調べます。$g=1$ は $\operatorname{div}(1)+D=[P_\infty]\ge0$ です。$g=t$ は A1 より $\operatorname{div}(t)+D=[P_0]\ge0$ です。$g=1/t$ は位数が逆なので $\operatorname{div}(1/t)+D=-[P_0]+2[P_\infty]$ となり、$P_0$ の係数が負です。従って最初の二つだけ大域切断です。$D$ により許される極は $P_\infty$ での高々一次であり、$P_0$ の極は許しません。
<!-- solution-end -->

**Level B：局所関数から大域の情報へ**

### B1. 有理関数の零点と極

$\mathbb P^1$ の有理関数 $g=(t-1)/t^2$ の主因子を全点で求めよ。

- Level: B
- ID: AG2-07-B1

<!-- solution-start -->
**詳細解答。** $P_1=[1:1]$ では $t-1$ が局所パラメータで分母 $t^2$ は単元なので位数は $1$ です。$P_0=[1:0]$ では分子が $-1$ で単元、分母 $t^2$ の位数は $2$ なので位数は $-2$ です。無限遠では $t=1/y$ と代入して

$$
g=\frac{1/y-1}{1/y^2}=y(1-y)
$$

となり、$y=0$ で $1-y$ は単元なので位数は $1$ です。他に零点・極はありません。従って $\operatorname{div}(g)=[P_1]-2[P_0]+[P_\infty]$、係数和は $1-2+1=0$ です。
<!-- solution-end -->

### B2. 二点の因子と$\mathcal O(2)$

$D=[P_0]+[P_\infty]$ が $2[P_\infty]$ に線形同値であることを具体的な有理関数で示し、付随層を同定せよ。

- Level: B
- ID: AG2-07-B2

<!-- solution-start -->
**詳細解答。** A1 の計算から $\operatorname{div}(t)=[P_0]-[P_\infty]$ です。両辺へ $2[P_\infty]$ を加えると $D=2[P_\infty]+\operatorname{div}(t)$ となります。従って $D\sim2[P_\infty]$ です。[Cartier因子類と可逆層の同型類](#thm-ag2-07-cartier-picard)により $\mathcal O(D)\simeq\mathcal O(2[P_\infty])$ です。さらに[射影直線のPicard群の定理](#thm-ag2-07-p1-picard)の局所基底計算から $\mathcal O(2[P_\infty])\simeq\mathcal O(2)$ となります。
<!-- solution-end -->

### B3. 局所パラメータを誤らない

$C=V(y-x^2)$ の原点 $P$ で、$x$ と $y$ の零点集合は局所的に同じであるのに $\operatorname{ord}_P(x)\ne\operatorname{ord}_P(y)$ となる理由を、局所環の生成元から示せ。

- Level: B
- ID: AG2-07-B3

<!-- solution-start -->
**詳細解答。** $C$ の局所環で $y=x^2$ が成り立ち、原点における極大イデアルは $(x,y)=(x,x^2)=(x)$ です。したがってその生成元である局所パラメータは $t=x$ です。$x=t$ と $y=t^2$ はいずれも $t=0$ で消えますが、前者は $t$ で一回、後者は二回割り切れ、$t$ で割った残りが単元になる指数が違います。従って位数はそれぞれ $1,2$ です。「零点集合の一致」から「零点位数の一致」は導けません。
<!-- solution-end -->

### B4. 局所的に一つの方程式で切れるか

二次円錐 $uw=v^2$ の原点 $O$ で、直線 $L=V(u,v)$ の被約イデアル $I=(u,v)$ が局所的に主イデアルでないことを示せ。

- Level: B
- ID: AG2-07-B4

<!-- solution-start -->
**詳細解答。** 局所環と極大イデアルを次のように置きます。

$$
A=\left(\mathbb C[u,v,w]/(uw-v^2)\right)_{(u,v,w)},\qquad \mathfrak m=(u,v,w)A.
$$

$\mathfrak m I$ は $u^2,uv,uw,v^2,vw$ などの次数2以上の積で生成されます。定義関係 $uw=v^2$ も次数2であり、一次の線形関係を生みません。

従って $I/\mathfrak m I$ では $u,v$ の像は一次の独立な二元で、その $\mathbb C$-次元は $2$ です。

もし $I=(h)$ なら $I/\mathfrak m I$ は $h$ の像一つで生成され、次元は高々 $1$ となって矛盾します。従って $I$ は原点 $O$ では主イデアルでありません。
<!-- solution-end -->

**Level C：曲線の幾何と層をつなぐ**

### C1. 円錐曲線と二重零点

滑らかな射影円錐曲線 $C=V(XZ-Y^2)\subset\mathbb P^2$ を

$$
\nu:\mathbb P^1\longrightarrow C,\qquad
[s:t]\longmapsto[s^2:st:t^2]
$$

でパラメータ表示する。$\nu$ が同型であることを標準チャートで確認せよ。さらに直線 $X=0$ の $C$ 上の交わりを因子として求め、$\mathcal O_C(1)$ の $\nu$ による引き戻しを同定せよ。

- Level: C
- ID: AG2-07-C1

<!-- solution-start -->
**詳細解答。** $X\ne0$ のチャートでは $s\ne0$ で、$Y/X=t/s$ が逆写像のアフィン座標です。$Z\ne0$ のチャートでは $t\ne0$ で、$Y/Z=s/t$ が逆写像の座標です。$[X:Y:Z]\in C$ が $X=Z=0$ を満たせば $Y^2=XZ=0$ から全座標が零となって矛盾するため、二つのチャートは $C$ を覆います。重なりでは $Y/X$ と $Y/Z$ は互いに逆数なので逆写像は一致し、$\nu$ は同型です。

$X=0$ を代入すると $s^2=0$ となるため、交点は $s=0$、すなわち $Q=[0:0:1]$ だけです。$Z\ne0$ の局所座標を $z=s/t=Y/Z$ とすると $X/Z=z^2$ です。$z$ は $Q$ の局所パラメータで、$X/Z$ の位数は $2$ なので交点因子は $2[Q]$ です。

超平面切断の線束は、[射影空間の$\mathcal O(1)$の定義](../AG2-06/index.md#def-ag2-06-twisting-sheaf)による $\mathcal O_C(1)$ です。$X\ne0$、$Z\ne0$ における局所基底をそれぞれ $e_X,e_Z$ と書くと、重なりで $e_Z=(Z/X)e_X$ です。$\nu$ により $X=s^2$、$Z=t^2$ だから、引き戻した基底の変換は

$
\nu^*e_Z=\nu^*\!\left(\frac{Z}{X}\right)\nu^*e_X
=\left(\frac{t}{s}\right)^2\nu^*e_X.
$

これは $\mathbb P^1$ 上の $\mathcal O(2)$ の基底変換そのものです。また座標切断 $X,Y,Z$ は引き戻すと $s^2,st,t^2$ になり、[斉次二次式の切断](../AG2-06/index.md#prop-ag2-06-homogeneous-sections)とも整合します。従って $\nu^*\mathcal O_C(1)\simeq\mathcal O_{\mathbb P^1}(2)$ です。次数 $2$ は交点因子 $2[Q]$ と一致します。
<!-- solution-end -->

### C2. 因子の次数と切断空間

$\mathbb P^1$ 上で $D=2[P_1]-[P_0]+[P_\infty]$ と置く。$\mathcal O(D)$ の同型類と $H^0(\mathbb P^1,\mathcal O(D))$ の次元を求めよ。また $D$ は有効ではないのに、$\mathcal O(D)$ が非零切断を持つ理由を説明せよ。

- Level: C
- ID: AG2-07-C2

<!-- solution-start -->
**詳細解答。** 係数の和は $\deg D=2-1+1=2$ です。[射影直線のPicard群の定理](#thm-ag2-07-p1-picard)により $\mathcal O(D)\simeq\mathcal O(2)$ です。[射影直線の大域切断定理](../AG2-06/index.md#thm-ag2-06-p1-sections)を $d=2$ に適用すると $H^0(\mathbb P^1,\mathcal O(2))$ は $S^2,ST,T^2$ を基底に持つので次元は $3$ です。

非零切断の存在を因子の条件で直接確認します。$f=(t-1)^2/t$ と置くと、[主因子の計算](#thm-ag2-07-p1-picard)で使った一次因子の位数から

$$
\operatorname{div}(f)=2[P_1]-[P_0]-[P_\infty].
$$

したがって $D=\operatorname{div}(f)+2[P_\infty]$ です。$g=1/f=t/(t-1)^2$ を取れば $\operatorname{div}(g)+D=2[P_\infty]\ge0$ となるので、[切断条件](#prop-ag2-07-associated-gluing)によって $g$ は非零の大域切断です。$D$ 自体が有効でないことは、ある有理関数 $g$ を掛けて有効にできないことを意味しません。零点・極の許容量を因子全体で見ることが重要です。
<!-- solution-end -->

## 10. 次に使う見方

因子は零点と極を整数付きで記録し、Cartier因子はそれを単元倍を許す局所方程式として保持します。曲線の滑らかさは局所パラメータの存在を保証し、二つの情報を一致させます。さらに $1/f_i$ を局所基底に取ると可逆層が生まれ、同じ線束を与える違いは主因子で測られます。

次章では局所パラメータを曲線上の微分の表現へ結び付け、座標を替えたときの微分の変換から標準束へ進みます。