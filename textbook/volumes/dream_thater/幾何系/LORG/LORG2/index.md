# LORG2 Lorentz計量と時間向き

<!-- definition-example-audit: strict -->

## 1. 点ごとに未来を選べても、時空全体に未来があるとは限らない

[LORG1 の Lorentz内積](../LORG1/index.md#def-lorg1-lorentz-inner-product)では、一つのベクトル空間に負方向が一本あると、時間的方向は二つの錐に分かれることを確かめました。時間軸のどちらを未来とするかは、内積の符号からは決まりません。

曲がった時空では接空間そのものが点ごとに異なります。各点で「こちらが未来」と別々に決めても、少し歩いたとき隣の点で未来と過去が突然入れ替われば、時空全体で「未来へ進む」を定義できません。必要なのは、**すべての接空間のLorentz内積を滑らかにそろえる計量**と、**未来錐の二つの成分のうち一方を連続的に選ぶこと**です。

本章では、まず計量を座標に依存しないテンソルとして作り、未来の選択が可能である条件を大域的な時間的ベクトル場と結びます。最後に、どの点の近くでも普通のMinkowski時空に見えるのに、時空全体では未来を選べない例を構成します。曲線の長さ・局所的な経路の性質・大域的因果関係は後続章で扱います。

## 2. 接空間の不定値内積を滑らかにそろえる

[GEO2 の接束](../../GEO/GEO2/index.md#def-geo2-tangent-bundle)では、点 $p$ ごとの接空間 $T_pM$ を一つの空間へまとめ、[GEO7 のテンソル場](../../GEO/GEO7/index.md#def-geo7-tensor-field)では、点ごとの双線形形式が滑らかに変化する意味を定めました。そこへ、各点で[LORG1 の慣性指数の条件](../LORG1/index.md#def-lorg1-lorentz-inner-product)を課します。

<a id="def-lorg2-lorentz-metric"></a>

<!-- formal-statement-start -->
> **定義（Lorentz計量とLorentz多様体）**  
> $n\ge1$ とする。$M$ を境界のない、Hausdorff・第二可算な滑らかな $(n+1)$ 次元多様体とする。滑らかな対称 $(0,2)$ 型テンソル場 $g$ で、各 $p\in M$ の双線形形式
>
$$
g_p:T_pM\times T_pM\longrightarrow\mathbb R
$$
>
> が非退化かつ慣性指数 $(1,n)$（負1本・正$n$本）をもつものを、符号規約 $(-,+,\ldots,+)$ の **Lorentz計量**と呼ぶ。組 $(M,g)$ をLorentz多様体と呼ぶ。この定義だけではどちらが未来か指定されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg2-lorentz-metric -->
**定義の確認**。$M=\mathbb R^2$ の標準座標 $(t,x)$ に対し、正の滑らかな関数 $a(t,x)$ を用いて

$$
g=-dt\otimes dt+a(t,x)^2\,dx\otimes dx
$$

とします。係数行列は

$$
(g_{ij})=\begin{pmatrix}-1&0\\0&a(t,x)^2\end{pmatrix}.
$$

行列式は $-a(t,x)^2<0$、固有値は $-1$ と $a(t,x)^2>0$ であり、どの点でも負方向がちょうど一本です。特に $a(t,x)=1+t^2+x^2$ は具体的な非定数例です。一方 $a(t,x)=x$ と置くと $x=0$ で行列式が零となり、全 $\mathbb R^2$ 上のLorentz計量にはなりません。
<!-- definition-example-end -->

座標を取り替えると成分は変化しますが、慣性指数は変わりません。局所座標を $y=y(x)$ に替え、Jacobi行列を $J^i{}_a=\partial x^i/\partial y^a$ と置くと、

$$
g'_{ab}=\sum_{i,j}J^i{}_a\,g_{ij}\,J^j{}_b,
\qquad G'=J^{\mathsf T}GJ.
$$

座標変換は微分同相なので $J$ は可逆です。[Sylvesterの慣性法則](../../../基礎科目/LA/LA6/index.md#thm-la6-inertia)により負・正・零方向の本数は不変です。これは「負方向が一本」という条件が座標の取り方で壊れない理由です。

### 2.1 点ごとの因果型

[LORG1 の因果型](../LORG1/index.md#def-lorg1-causal-type)を各接空間に適用します。具体的には $v\in T_pM\setminus\{0\}$ について $g_p(v,v)<0$ は時間的、$g_p(v,v)=0$ は光的、$g_p(v,v)>0$ は空間的です。光的か時間的である非零の $v$ を因果的といいます。**零ベクトルは光的・時間的・因果的のいずれにも数えません**。

上の例の $v=u\,\partial_t+w\,\partial_x$ に対しては

$$
g_p(v,v)=-u^2+a(p)^2w^2.
$$

したがって、時間的かどうかは $|u|>a(p)|w|$、光的かどうかは $|u|=a(p)|w|$ かつ $(u,w)\ne(0,0)$ で判定できます。$a(p)$ が大きい場所では、同じ座標成分をもつベクトルでも因果型が変わりえます。

## 3. 二つの時間錐を局所的に見分ける

各接空間の時間的ベクトル全体は二つの連結成分に分かれます。$p$ の近くで一つの時間的方向を滑らかに選べれば、そこに属する成分を「未来」と呼べます。まず**局所的には必ず選べる**ことを証明します。

<a id="lem-lorg2-local-timelike-field"></a>

<!-- formal-statement-start -->
> **補題（時間的ベクトル場の局所存在）**  
> $(M,g)$ を滑らかなLorentz多様体とし、$p\in M$ とする。$p$ の開近傍 $U$ 上に滑らかなベクトル場 $T$ が存在して、すべての $q\in U$ で
>
$$
g_q(T_q,T_q)<0
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ で負二乗をもつベクトルを一本取り、その**座標成分を一定にして**近くへ延ばします。計量の滑らかさと厳密不等号が時間的条件を保持します。

<!-- proof-start -->
### 証明

$g_p$ は負方向を一本もつので、ある $v\in T_pM$ について $g_p(v,v)<0$ です。$p$ を含む座標近傍 $(U_0,x^0,\ldots,x^n)$ で

$$
v=\sum_{i=0}^{n}v^i\left.\frac{\partial}{\partial x^i}\right|_p
$$

と表し、$U_0$ 上の滑らかなベクトル場を

$$
S_q=\sum_{i=0}^{n}v^i\left.\frac{\partial}{\partial x^i}\right|_q
$$

で定めます。係数 $v^i$ は定数ですが、各点の接ベクトルは対応する $T_qM$ に属します。

関数 $q\mapsto g_q(S_q,S_q)=\sum_{i,j}g_{ij}(q)v^iv^j$ は連続です。$p$ で負なので、十分小さい開近傍 $U\subset U_0$ 上でも負です。$T=S|_U$ と置けばよい。$\square$
<!-- proof-end -->

**具体例**。$g=-dt^2+a(t,x)^2dx^2$ では $T=\partial_t$ が全域で時間的です。反対に、$g(\partial_x,\partial_x)=a^2>0$ なので $\partial_x$ は時間的方向の代用品にはなりません。

局所で未来を判定するには、時間的な $T$ を基準として $g(T,v)$ の符号を使えます。ここで[LORG1 の逆Cauchy–Schwarz不等式](../LORG1/index.md#thm-lorg1-reverse-cauchy-schwarz)の「同じ時間錐にあるベクトルはLorentz内積が負」という性質が働きます。

<a id="lem-lorg2-timelike-sign"></a>

<!-- formal-statement-start -->
> **補題（時間的基準ベクトルによる向きの判定）**  
> $(V,g)$ を符号 $(-,+,\ldots,+)$ のLorentzベクトル空間とし、$T\in V$ を時間的ベクトルとする。非零因果ベクトル $v$ が、$T$ の属する時間的錐成分の**閉包から零を除いた集合**に属することと $g(T,v)<0$ は同値であり、反対側の時間的錐成分の閉包から零を除いた集合に属することと $g(T,v)>0$ は同値である。特に $g(T,v)\ne0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$T$ が未来になるMinkowski基底を選びます。$T$ の時間成分は空間成分のノルムより厳密に大きく、非零因果ベクトルの時間成分は空間成分のノルム以上です。この厳密不等式が、内積を零にしない理由です。

<!-- proof-start -->
### 証明

[LORG1 のLorentz標準形](../LORG1/index.md#def-lorg1-lorentz-inner-product)で $T=(s,\mathbf y)$、$v=(t,\mathbf x)$ とし、$s>\|\mathbf y\|$ となる向きに時間軸を取ります。$v$ が $T$ 側の[閉未来錐](../LORG1/index.md#def-lorg1-future-cone)から零を除いた集合に属するなら $t\ge\|\mathbf x\|$ かつ $t>0$ です。[EuclidのCauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
g(T,v)&=-st+\mathbf y\cdot\mathbf x\\
&\le-st+\|\mathbf y\|\,\|\mathbf x\|\\
&\le-st+\|\mathbf y\|\,t\\
&=-(s-\|\mathbf y\|)t<0.
\end{aligned}
$$

反対側の閉錐から零を除いた集合に属する場合は $-v$ が $T$ 側の閉錐にあるので、既に証明した結果から $g(T,-v)<0$、すなわち $g(T,v)>0$ です。非零因果ベクトルは、互いに零でしか交わらない二つの閉錐のいずれかに属するので、逆方向の含意も従います。$\square$
<!-- proof-end -->

ここで基準 $T$ を光的に弱めることはできません。$1+1$ 次元の $T=v=(1,1)$ は非零光的ですが $g(T,v)=0$ です。「時間的」が厳密な符号を与える仮定です。

## 4. 時間向きを滑らかに選ぶ

単に各点で二つの成分のどちらかを選ぶだけでは、近くへ動かしたときの整合がありません。局所的な時間的場で成分を代表できることを要求すれば、選択の連続性を座標に頼らず定義できます。

<a id="def-lorg2-time-orientation"></a>

<!-- formal-statement-start -->
> **定義（時間向き・時間向き付け可能性・時空）**  
> $(M,g)$ を滑らかなLorentz多様体とする。各 $p\in M$ で、$T_pM$ の時間的ベクトル全体の二つの連結成分から一方 $C_p^{\mathrm{tim},+}$ を選ぶ。各 $p$ について、その近傍 $U$ と滑らかな時間的ベクトル場 $T_U$ が存在し、すべての $q\in U$ で $T_U(q)\in C_q^{\mathrm{tim},+}$ を満たすなら、この選択を **時間向き**という。
>
> 時間向きが存在するLorentz多様体を **時間向き付け可能**と呼ぶ。時間向きを一つ指定した組 $(M,g,C^{\mathrm{tim},+})$ を **時間向き付き時空**という（以下、$M$ は連結とする）。各点で選んだ成分に属するベクトルを未来向き時間的、その閉包から零を除いたベクトルを未来向き因果的という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg2-time-orientation -->
**定義の確認**。$M=\mathbb R^2$、$g=-dt^2+a(t,x)^2dx^2$ では $T=\partial_t$ は全域で滑らかかつ $g(T,T)=-1$ です。[時間的基準ベクトルによる向きの判定](#lem-lorg2-timelike-sign)から

$$
C_p^{\mathrm{tim},+}
=\{u\,\partial_t+w\,\partial_x:u>a(p)|w|\}
$$

が定める選択は各点で $\partial_t$ を含みます。未来向き因果的な非零ベクトルは $u\ge a(p)|w|$ かつ $(u,w)\ne(0,0)$ です。$-\partial_t$ を使えば反対の時間向きが得られます。
<!-- definition-example-end -->

**注意：時間向きと多様体の向きは別**です。時間向きは時間錐の二成分から一方を選ぶ条件であり、[GEO8 の多様体の向き](../../GEO/GEO8/index.md#def-geo8-oriented-atlas)が要求する座標変換行列の行列式の正負とは違います。二つの概念を同一視しません。

局所的な選択が大域的に貼り合わさるかを調べるとき、[GEO4 の滑らかな1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)が使えます。重要なのは単にベクトル場を足すのではなく、**未来向き時間錐が凸**だから足しても時間的であり続けるという点です。

<a id="thm-lorg2-time-orientability"></a>

<!-- formal-statement-start -->
> **定理（時間向き付け可能性と大域時間的ベクトル場の同値性）**  
> $(M,g)$ をHausdorff・第二可算な滑らかなLorentz多様体とする。次は同値である。
>
> 1. $(M,g)$ は時間向き付け可能である。
> 2. $M$ 上に滑らかなベクトル場 $T$ が存在し、すべての $p\in M$ で $g_p(T_p,T_p)<0$ となる。
>
> さらに時間向きを指定した場合、その未来錐に属する滑らかな時間的ベクトル場 $T$ を選べる。
<!-- formal-statement-end -->

### 証明の見取り図

「場 $\Rightarrow$ 向き」は、その場が属する錐を毎点で指定すれば済みます。逆向きでは、未来向きの局所的場を開被覆上で選び、1の分割で貼り合わせます。符号が合わない局所場同士を足すと零にもなり得るので、「各局所場がすでに同じ未来成分にある」ことを確かめてから凸性を使います。

<!-- proof-start -->
### 証明

**(2)$\Rightarrow$(1)**。全域の滑らかな時間的場 $T$ があるとする。各 $p$ で $T_p$ を含む時間錐成分を $C_p^{\mathrm{tim},+}$ と選ぶ。任意の点の近傍で $T$ 自身が選択した成分の滑らかな代表になっているので、[時間向きの定義](#def-lorg2-time-orientation)を満たす。

**(1)$\Rightarrow$(2)**。時間向きが与えられたとする。定義により、開被覆 $(U_\alpha)$ と各 $U_\alpha$ 上の滑らかな未来向き時間的ベクトル場 $T_\alpha$ がある。[GEO4 の1の分割定理](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)をこの開被覆へ適用して、非負の滑らかな関数族 $(\varphi_\alpha)$ を取る。各 $\varphi_\alpha$ は対応する $U_\alpha$ の内部に台をもち、族は局所有限で、各点で

$$
\sum_\alpha\varphi_\alpha(p)=1
$$

となる。局所場 $\varphi_\alpha T_\alpha$ を台の外では零で延長し、

$$
T_p=\sum_\alpha\varphi_\alpha(p)(T_\alpha)_p
$$

と定める。局所有限性により、各点の近くでは有限和なので $T$ は滑らかである。

各 $p$ で $\varphi_\alpha(p)>0$ となる項はすべて**同じ未来向き時間錐成分**に属する。少なくとも一つの係数は正である。$I_p=\{\alpha:\varphi_\alpha(p)>0\}$ と置けば、この集合は有限かつ空でない。$T_pM$ にその未来を正の時間方向とするMinkowski基底を取り、$\alpha\in I_p$ について $T_\alpha(p)=(t_\alpha,\mathbf x_\alpha)$ と書けば $t_\alpha>\|\mathbf x_\alpha\|$ である。[LORG1 の未来錐の凸性と時間的錐の厳密性](../LORG1/index.md#prop-lorg1-cone-convex)を具体的に使うと、

$$
\begin{aligned}
\sum_{\alpha\in I_p}\varphi_\alpha(p)t_\alpha
&>\sum_{\alpha\in I_p}\varphi_\alpha(p)\|\mathbf x_\alpha\|\\
&\ge\left\|\sum_{\alpha\in I_p}\varphi_\alpha(p)\mathbf x_\alpha\right\|.
\end{aligned}
$$

従って $T_p$ は未来向き時間的であり、特に $T_p\ne0$ かつ $g_p(T_p,T_p)<0$。これが各 $p$ で成り立ち、主張を得る。$\square$
<!-- proof-end -->

**二つの局所場の具体的な貼り合わせ**。$1+1$ 次元Minkowski時空で

$$
T_1=(1,0),\qquad T_2=(2,1)
$$

は $g(T_1,T_1)=-1$、$g(T_2,T_2)=-3$ の未来向き時間的場です。$0\le\lambda\le1$ に対し

$$
T_\lambda=\lambda T_1+(1-\lambda)T_2
=(2-\lambda,1-\lambda).
$$

時間成分と空間成分の差は $(2-\lambda)-(1-\lambda)=1>0$ です。従って、場所に応じて $\lambda$ を滑らかに変えても時間的であり続けます。逆に $T_2=(-1,0)$ とすると $\lambda=1/2$ で零になってしまいます。**方向が一致することが貼り合わせの本質的な仮定**です。

<a id="cor-lorg2-global-future-test"></a>

<!-- formal-statement-start -->
> **系（大域時間的場による未来向きの判定）**  
> $(M,g)$ を時間向き付きLorentz多様体とし、$T$ をその時間向きを代表する滑らかな未来向き時間的場とする。各 $p\in M$ と非零因果ベクトル $v\in T_pM$ について
>
$$
v\text{ が未来向き}\quad\Longleftrightarrow\quad g_p(T_p,v)<0.
$$
>
> 時間的場 $T$ を別の未来向き時間的場 $S$ に替えても、この判定結果は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

これは[時間的基準ベクトルによる判定](#lem-lorg2-timelike-sign)を各点に適用するだけです。ただし対象は必ず**非零因果ベクトル**であり、一般の空間的ベクトルへ誤用しません。

<!-- proof-start -->
### 証明

固定した $p$ で $T_p$ と $v$ はLorentzベクトル空間 $T_pM$ の要素です。[判定補題](#lem-lorg2-timelike-sign)をこの二つへ適用すると、$v$ が $T_p$ の属する時間的錐成分の閉包から零を除いた集合にあることと $g_p(T_p,v)<0$ は同値です。$S_p$ も $T_p$ と同じ時間錐側にあるので、再び同じ補題を $S_p,v$ へ適用すると、符号による分類は一致します。$\square$
<!-- proof-end -->

## 5. 大域的に選べない未来：時間反転を含む商

局所存在補題はどのLorentz多様体でも成立します。では、どうして大域的な時間向きが存在しない場合があるのでしょうか。

$1+1$ 次元Minkowski平面 $(\mathbb R^2,\eta)$、

$$
\eta=-dt^2+dx^2
$$

の点を、写像

$$
F(t,x)=(-t,x+1)
$$

で同一視します。時間を反転させながら空間方向に一歩ずらす操作です。微分は

$$
dF=\begin{pmatrix}-1&0\\0&1\end{pmatrix}
$$

で、[LORG1 で調べた時間反転](../LORG1/index.md#def-lorg1-future-cone)のように計量を保ちつつ時間の向きを入れ替えます。

<a id="prop-lorg2-twisted-quotient"></a>

<!-- formal-statement-start -->
> **命題（時間反転Minkowski商の時間向き不可能性）**  
> $\eta=-dt^2+dx^2$ をもつ $\mathbb R^2$ で $F(t,x)=(-t,x+1)$ とし、$\mathbb Z$ の作用を $k\cdot(t,x)=F^k(t,x)$ で定める。この作用による商多様体
>
$$
M=\mathbb R^2/\langle F\rangle
$$
>
> には $\eta$ から誘導される滑らかなLorentz計量 $g$ が存在するが、$(M,g)$ は時間向き付け可能でない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $F$ が自由・固有不連続な等長変換を作ることを座標で確かめます。商に時間的ベクトル場が存在すると仮定すると、持ち上げた場の**時間成分**は、$t=0$ の線分上では零を通らず符号一定のはずです。しかし両端は $F$ で同一視され、持ち上げたベクトルの時間成分は逆符号でなければなりません。

<!-- proof-start -->
### 証明

任意の整数 $k$ に対し、

$$
F^{2m}(t,x)=(t,x+2m),\qquad
F^{2m+1}(t,x)=(-t,x+2m+1).
$$

従って $F^k(t,x)=(t,x)$ なら空間成分から $k=0$ で、作用は自由です。点 $(t_0,x_0)$ の小近傍を $x_0-1/3<x<x_0+1/3$ に含まれる開矩形 $U$ として取れば、$k\ne0$ による像 $F^k(U)$ は $U$ と交わりません。実際、像の $x$ 区間は整数 $k$ だけ平行移動するので、$F^k(U)$ は互いに素です。これらの矩形は次の関係を満たします。

$$
\pi^{-1}(\pi(U))=\bigcup_{k\in\mathbb Z}F^k(U).
$$

従って $\pi(U)$ は開集合、$\pi|_U$ はその上への全単射です。この逆を局所座標として使うと、二つの局所座標の遷移写像は $F^k$ の制限になり、滑らかです。

さらに任意のコンパクト集合 $K\subset\mathbb R^2$ の $x$ 成分は有界です。そのため $F^k(K)\cap K\ne\varnothing$ となる整数 $k$ は有限個であり、作用は固有不連続です。

商の異なる二点を代表する軌道を考えます。代表点の $x$ 成分の差が整数でなければ、十分小さい $x$ 区間を使って軌道を分離できます。整数差なら一方を $F^k$ で移して $x$ 成分を一致させます。二点は異なる軌道にあるため、このとき $t$ 成分は異なり、十分小さい $t$ 区間を使って分離できます。

従って商はHausdorffです。有理数端点をもつ矩形の像は可算な開基となるため、第二可算でもあります。上記の局所座標により商は滑らかな多様体となり、射影 $\pi:\mathbb R^2\to M$ は局所微分同相です。

また

$$
F^*\eta=-(d(-t))^2+(d(x+1))^2=-dt^2+dx^2=\eta.
$$

そのため各点で $\pi$ の局所逆を使って $\eta$ を $M$ へ移した計量は、別の局所逆を選んでも $F^k$ の等長性により一致します。滑らかで各点の慣性指数は $(1,1)$ です。

仮に $(M,g)$ が時間向き付け可能なら、[時間向き付け可能性と大域時間的ベクトル場の同値性](#thm-lorg2-time-orientability)から滑らかな時間的場 $T$ が存在します。射影の微分を使い、$\widetilde T$ を $\mathbb R^2$ へ持ち上げます。$\widetilde T=A(t,x)\partial_t+B(t,x)\partial_x$ と置くと

$$
-A(t,x)^2+B(t,x)^2<0
$$

なので、全点で $|A(t,x)|>|B(t,x)|$、特に $A(t,x)\ne0$ です。

持ち上げた場は射影に関して同じベクトルを表すので、射影の合成 $\pi\circ F=\pi$ を点 $p$ で微分すると $d\pi_{F(p)}\circ dF_p=d\pi_p$ です。これを各場の持ち上げに適用して

$$
\widetilde T(F(p))=dF_p(\widetilde T(p)).
$$

この式の時間成分を $p=(0,0)$ で比較すると、

$$
A(0,1)=-A(0,0).
$$

一方 $x\mapsto A(0,x)$ は区間 $[0,1]$ 上の連続関数で、どこでも零になりません。中間値の定理から符号は一定であり、両端が逆符号になることはありません。矛盾です。従って時間向きは存在しません。$\square$
<!-- proof-end -->

この商には各点の時間錐自体はあります。失敗するのは、時間反転を含む同一視の周りを一周した後、同じ未来錐成分へ戻るという**大域的な整合性**です。局所的な時間的場は作れても、それらを同じ側の錐にそろえた開被覆を作れないため、1の分割による貼り合わせの前提が破れます。

比較として $H(t,x)=(t,x+1)$ で同一視した普通の円筒 $N=\mathbb R^2/\langle H\rangle$ では $dH(\partial_t)=\partial_t$ です。場 $\partial_t$ は商へ降り、常に $g(\partial_t,\partial_t)=-1$ なので時間向きが存在します。二つの商はどちらも局所的に平坦ですが、時間向きについては違う答えになります。

## 6. 何を時間向きと取り違えてはいけないか

- **計量の存在は時間向きの存在を保証しません。** 時間反転商は滑らかなLorentz計量を持ちながら大域的な未来を選べません。
- **座標の時間成分が正という条件は一般には不変ではありません。** 同じ時間向きのもとで判断するには、未来向き時間的場 $T$ を一つ指定し、非零因果ベクトル $v$ に対する $g(T,v)<0$ を使います。
- **空間的ベクトルへ未来・過去を割り当てません。** $g(T,v)<0$ だけでは $v$ が因果的とは言えません。例えば平坦計量で $T=(1,0)$、$v=(1,2)$ は $g(T,v)=-1<0$ ですが $g(v,v)=3>0$ なので空間的です。
- **時間向きと時間座標は同一ではありません。** 大域的な時間的場を選べても、それがある一つの大域座標の座標ベクトル場である必要はありません。大域時間関数については後続章で条件を調べます。

## 7. 演習

特に指定しない限り符号規約は $(-,+,\ldots,+)$ とします。時間的ベクトル場はすべての点で厳密に負の自己二乗を持つものです。

### Level A

<a id="ex-lorg2-a01"></a>
#### LORG2-A01 変係数Lorentz計量
- Level: A

$\mathbb R^2$ 上の $g=-dt^2+(1+t^2)^2dx^2$ がLorentz計量であることを確認し、点 $(t,x)=(1,0)$ における $v=3\partial_t+\partial_x$ と $w=\partial_t+\partial_x$ の因果型を求めよ。

<!-- solution-start -->
**詳細解答**。係数行列は $\operatorname{diag}(-1,(1+t^2)^2)$ です。$(1+t^2)^2>0$、行列式は $-(1+t^2)^2<0$ なので、各点で慣性指数 $(1,1)$、成分は滑らかです。点 $t=1$ では $1+t^2=2$ だから

$$
g(v,v)=-3^2+2^2=-5<0,\qquad
g(w,w)=-1^2+2^2=3>0.
$$

従って $v$ は時間的、$w$ は空間的です。座標値だけでなく評価点の計量係数を代入することが必要です。
<!-- solution-end -->

<a id="ex-lorg2-a02"></a>
#### LORG2-A02 局所時間的場の構成
- Level: A

$g=-(2+x^2)dt^2+dx^2$ 上で $S=\partial_t+\tfrac12\partial_x$ が全域で時間的であることを証明せよ。さらに、$\partial_x$ が時間的でないことを確かめよ。

<!-- solution-start -->
**詳細解答**。計量係数は $2+x^2\ge2$ です。従って

$$
g(S,S)=-(2+x^2)+\frac14=-\frac74-x^2<0
$$

が全点で成立します。一方

$$
g(\partial_x,\partial_x)=1>0
$$

なので $\partial_x$ は空間的です。$S$ の係数が一定でも、判定には点ごとに変化する計量係数を用います。
<!-- solution-end -->

<a id="ex-lorg2-a03"></a>
#### LORG2-A03 基準場による未来判定
- Level: A

平坦計量 $\eta=-dt^2+dx^2$ の時間向きを $T=(2,1)$ が未来になるよう指定する。$v=(3,2)$、$w=(-3,2)$、$z=(1,2)$ を因果型と向きで分類せよ。

<!-- solution-start -->
**詳細解答**。まず $g(T,T)=-4+1=-3<0$ なので時間向きの基準にできます。各ベクトルの自己二乗は

$$
g(v,v)=-9+4=-5,\quad g(w,w)=-9+4=-5,\quad
g(z,z)=-1+4=3.
$$

$v,w$ は時間的、$z$ は空間的です。因果的な二つについて

$$
g(T,v)=-2\cdot3+1\cdot2=-4<0,\qquad
g(T,w)=-2(-3)+1\cdot2=8>0.
$$

よって[未来判定の系](#cor-lorg2-global-future-test)から $v$ は未来向き、$w$ は過去向きです。$z$ について $g(T,z)=0$ ですが、そもそも空間的なので未来・過去を割り当てません。
<!-- solution-end -->

<a id="ex-lorg2-a04"></a>
#### LORG2-A04 時間向きを保つ写像
- Level: A

$\mathbb R^2$ の平坦計量で $H(t,x)=(t,x+2)$ と $R(t,x)=(-t,x)$ がどちらも計量を保つことを示し、$T=\partial_t$ で指定した時間向きを保つのはどちらか答えよ。

<!-- solution-start -->
**詳細解答**。$dH$ は単位行列、$dR=\operatorname{diag}(-1,1)$ です。従って各 $u=(u_t,u_x)$ について

$$
\eta(dHu,dHu)=-u_t^2+u_x^2,\qquad
\eta(dRu,dRu)=-(-u_t)^2+u_x^2
=-u_t^2+u_x^2.
$$

二次形式の保存から極化公式で双線形形式も保存します。一方、$dH(T)=T$ ですが $dR(T)=-T$ です。$T$ と $-T$ は反対の時間錐成分なので、$H$ は時間向きを保ち $R$ は反転させます。
<!-- solution-end -->

### Level B

<a id="ex-lorg2-b01"></a>
#### LORG2-B01 二つの時間的場の貼り合わせ
- Level: B

$\eta=-dt^2+dx^2$ で $T_1=(2,0)$ と $T_2=(3,2)$ を取る。滑らかな関数 $\lambda:\mathbb R^2\to[0,1]$ に対して $S=\lambda T_1+(1-\lambda)T_2$ が全域で未来向き時間的であることを、自己二乗を計算して証明せよ。

<!-- solution-start -->
**詳細解答**。$T_1$ は $-4<0$、$T_2$ は $-9+4=-5<0$ で、いずれも時間成分が正です。各点で $\lambda$ を一つの数として計算すると

$$
S=(3-\lambda,2-2\lambda)
$$

なので

$$
\begin{aligned}
\eta(S,S)
&=-(3-\lambda)^2+(2-2\lambda)^2\\
&=-(9-6\lambda+\lambda^2)
 +(4-8\lambda+4\lambda^2)\\
&=-5-2\lambda+3\lambda^2.
\end{aligned}
$$

$0\le\lambda\le1$ では $3\lambda^2\le3\lambda$ なので

$$
\eta(S,S)\le-5+\lambda\le-4<0.
$$

さらに $S_t=3-\lambda\ge2>0$ なので未来向きです。$\lambda$ と二つの場が滑らかだから $S$ も滑らかです。これは[未来錐の凸性](../LORG1/index.md#prop-lorg1-cone-convex)を具体的に再検算した例です。
<!-- solution-end -->

<a id="ex-lorg2-b02"></a>
#### LORG2-B02 時間座標の表示に依存しない判定
- Level: B

$g=-dt^2+4dx^2$ のもとで、$T=\partial_t$ を未来とする。$s=t+3x$、$y=x$ に座標を変える。次を示せ。

1. $g$ を $(s,y)$ 座標で表示せよ。
2. $v=\partial_t+\tfrac14\partial_x$ が未来向き時間的なのに、単に変換後の $y$ 成分だけでは因果型を読めない理由を数値で示せ。

<!-- solution-start -->
**詳細解答**。逆変換は $t=s-3y$、$x=y$ なので $dt=ds-3dy$、$dx=dy$ です。従って

$$
\begin{aligned}
g&=-(ds-3dy)^2+4dy^2\\
&=-ds^2+6\,ds\,dy-5dy^2,
\end{aligned}
$$

成分行列は $\begin{pmatrix}-1&3\\3&-5\end{pmatrix}$、行列式は $5-9=-4<0$ です。$v$ は変換前の成分 $(1,\tfrac14)$ から

$$
v(s)=1+3\cdot\frac14=\frac74,\qquad v(y)=\frac14
$$

を持ちます。新座標の計量で評価すると

$$
g(v,v)=-\left(\frac74\right)^2
+6\frac74\frac14-5\left(\frac14\right)^2
=\frac{-49+42-5}{16}=-\frac34<0.
$$

また基準場は $T=\partial_s$（$x$ 固定で $s$ が変化）だから $g(T,v)=-\tfrac74+3\cdot\tfrac14=-1<0$ です。従って $v$ は未来向き時間的です。新座標では交差項があり、空間成分だけに $4$ を掛ける旧式の判定は使えません。必要なのは全成分と計量行列です。
<!-- solution-end -->

<a id="ex-lorg2-b03"></a>
#### LORG2-B03 時間的である仮定を落とすと
- Level: B

$1+1$ 次元Minkowski空間の光的ベクトル $T=(1,1)$ について、$T$ と同じ光の向きを持つ $v=(2,2)$ に対し $g(T,v)$ を計算せよ。なぜ[時間的基準ベクトルによる向きの判定](#lem-lorg2-timelike-sign)の基準ベクトルを光的に一般化できないか説明せよ。

<!-- solution-start -->
**詳細解答**。$g(T,T)=-1+1=0$、$g(v,v)=-4+4=0$ で、両方とも非零光的かつ同じ側の錐上です。しかし

$$
g(T,v)=-(1)(2)+(1)(2)=0.
$$

[時間的基準ベクトルによる向きの判定](#lem-lorg2-timelike-sign)の証明では、$T=(s,\mathbf y)$ について $s>\|\mathbf y\|$ という**厳密**不等号を用い、

$$
g(T,v)\le-(s-\|\mathbf y\|)t<0
$$

を得ました。光的なら $s-\|\mathbf y\|=0$ になり、この最後の厳密不等号が失われます。そのため内積の符号だけでは未来・過去を区別できません。
<!-- solution-end -->

### Level C

<a id="ex-lorg2-c01"></a>
#### LORG2-C01 二つのMinkowski商を比較する
- Level: C

$\varepsilon\in\{1,-1\}$ とし、$F_\varepsilon(t,x)=(\varepsilon t,x+1)$ による $\mathbb Z$ 作用の商 $M_\varepsilon=\mathbb R^2/\langle F_\varepsilon\rangle$ を考える。次を証明せよ。

1. $\eta=-dt^2+dx^2$ は両方の商へLorentz計量として降りる。
2. $\varepsilon=1$ の商には大域的な未来向き時間的場が存在する。
3. $\varepsilon=-1$ の商には連続な時間的場さえ存在しない。その際、被覆上での持ち上げ場の時間成分が零でないことと両端で逆符号になることをそれぞれ証明せよ。

<!-- solution-start -->
**詳細解答**。まず $F_\varepsilon^k$ は空間成分を $x+k$ に移すため、$k\ne0$ では固定点がありません。また任意のコンパクト集合の $x$ 成分は有界だから、それと交わる移動像は有限個です。小さい開矩形は非自明な移動像と交わらず、商は滑らかな多様体で射影は局所微分同相となります。

$dF_\varepsilon=\operatorname{diag}(\varepsilon,1)$ であり $\varepsilon^2=1$ なので

$$
F_\varepsilon^*\eta
=-(d(\varepsilon t))^2+(d(x+1))^2
=-\varepsilon^2dt^2+dx^2=\eta.
$$

従って計量は商へ一意に降り、各局所座標で慣性指数 $(1,1)$ です。

$\varepsilon=1$ なら $dF_1(\partial_t)=\partial_t$ です。よって $\partial_t$ は同一視と整合して商上の滑らかな場 $T$ を定め、

$$
g(T,T)=-1<0
$$

なので[時間向き付け可能性と大域時間的ベクトル場の同値性](#thm-lorg2-time-orientability)から $M_1$ は時間向き付け可能です。

$\varepsilon=-1$ で連続な時間的場が商上にあると仮定します。被覆への持ち上げを $\widetilde T=A(t,x)\partial_t+B(t,x)\partial_x$ と書くと、計量を保存するので

$$
-A(t,x)^2+B(t,x)^2<0
\quad\Longrightarrow\quad
|A(t,x)|>|B(t,x)|\ge0.
$$

従って $A(0,x)$ はすべての $x$ で零でありません。$x\in[0,1]$ 上で連続だから符号は一定です。しかし商の射影 $\pi$ について $\pi\circ F_{-1}=\pi$ ですから、場の持ち上げには

$$
\widetilde T(F_{-1}(p))
=dF_{-1,p}\widetilde T(p)
$$

が必要です。$p=(0,0)$ を選び、$F_{-1}(0,0)=(0,1)$ と代入すれば

$$
A(0,1)=-A(0,0).
$$

非零で連続な $A(0,x)$ が区間の両端で逆符号なのは中間値の定理に反します。従って連続な時間的場は存在せず、特に滑らかな時間的場も時間向きも存在しません。**違いは計量ではなく、貼り合わせの微分が未来錐の成分を保つかどうか**です。
<!-- solution-end -->

## 8. 次に進むための位置付け

Lorentz計量は接空間の因果型を点ごとに定めますが、未来と過去の選択は追加の大域的構造です。時間向き付け可能性は滑らかな時間的ベクトル場の存在と同値で、その証明には局所場、1の分割、未来錐の凸性を用いました。

次はこの向きを用いて、曲線の速度が（適切な正則性のもとで）各点で未来向き因果的となるとは何かを定義します。そこで初めて、Lorentz長さと固有時を曲線に沿って積分します。
