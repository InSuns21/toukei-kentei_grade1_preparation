# SYM8 適合概複素構造と発展境界

[SYM1の線形標準形](../SYM1/index.md#thm-sym1-linear-normal-form)は、シンプレクティック形式を位置と運動量の組で表しました。[SYM7のMoser安定性](../SYM7/index.md#thm-sym7-moser-stability)は、2形式の変形から微分同相を作りました。しかし、シンプレクティック形式 $\omega$ は $\omega(v,v)=0$ なので、単独では長さや角度を測れません。解析の不等式やエネルギーを考える際には、正定値な計量も欲しくなります。

どんな計量でもよいわけではありません。$\omega$ と計量が勝手な方向を選ぶと、シンプレクティック構造と計量幾何の計算がかみ合わなくなります。そこで「各位置方向を、それと面積を作るもう一方の方向へ90度回す」という演算子 $J$ を挟み、

$$
g(u,v)=\omega(u,Jv)
$$

が対称・正定値になるようにします。$J$ は一見複素数の掛け算のように振る舞いますが、実際に複素座標があることを意味しません。本章では**線形構成・滑らかな多様体への拡張・境界の識別**を、独立の条件として証明します。

## 1. 「90度回転」を形式から切り出す

実ベクトル空間 $V$ 上の線形写像 $J$ を二回作用させて $-I$ になるなら、$J$ は実ベクトルを複素数の虚数単位のように回します。この性質を備えた写像を調べることから始めます。

<a id="def-sym8-complex-structure"></a>

<!-- formal-statement-start -->
> **定義（線形複素構造）**  
> 有限次元実ベクトル空間 $V$ 上の線形写像 $J:V\to V$ が

$$
J^2=-I_V
$$

> を満たすとき、$J$ を線形複素構造という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym8-complex-structure -->
### 直接例：平面の四分の一回転

**定義の確認**：$V=\mathbb R^2$ で、列ベクトルに対して

$$
J_0=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

と置きます。直接掛け算すると

$$
J_0^2=
\begin{pmatrix}-1&0\\0&-1\end{pmatrix}=-I_2.
$$

従って線形複素構造です。$J_0(1,0)=(0,1)$、$J_0(0,1)=(-1,0)$ なので、二回で180度回転します。
<!-- definition-example-end -->

しかし $J^2=-I$ だけでは $\omega$ との相性は決まりません。たとえば $-J_0$ も二乗は $-I$ ですが、回転の向きが逆で、$\omega$ から得られる「長さの二乗」が負になります。正値性は独立に要求する必要があります。

<a id="def-sym8-compatible"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック形式に適合する複素構造）**  
> $(V,\omega)$ を有限次元実シンプレクティックベクトル空間とし、$J:V\to V$ を線形写像とする。$J$ が $\omega$ に適合するとは、任意の $u,v\in V$ と非零の $v$ に対し、次の三条件を満たすことをいう。

$$
J^2=-I,\qquad
\omega(Ju,Jv)=\omega(u,v),\qquad
\omega(v,Jv)>0\quad(v\ne0).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym8-compatible -->
### 直接例：平面の正準形式

**定義の確認**：$\omega_0=dq\wedge dp$ とし、列ベクトル $u=(q,p)^{\mathsf T}$、$v=(q',p')^{\mathsf T}$ に対して

$$
\omega_0(u,v)=qp'-pq',\qquad
\Omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

先ほどの $J_0=-\Omega$ を使います。第一条件は確認済みです。さらに $J_0u=(-p,q)$、$J_0v=(-p',q')$ なので

$$
\omega_0(J_0u,J_0v)=(-p)q'-q(-p')=qp'-pq'=\omega_0(u,v).
$$

最後に

$$
\omega_0(v,J_0v)=q^2+p^2>0\quad(v\ne0).
$$

三条件を一つずつ検証したので $J_0$ は適合します。逆向きの $-J_0$ なら最後は $-(q^2+p^2)<0$ です。
<!-- definition-example-end -->

## 2. 対称性は条件からどう現れるか

計量らしさは見た目では判断できません。$\omega$ が交代的でも、第2引数に $J$ を入れると対称性が現れることを計算で確かめます。

<a id="thm-sym8-compatible-metric"></a>

<!-- formal-statement-start -->
> **定理（適合性と正定値内積の同値）**  
> $(V,\omega)$ を有限次元実シンプレクティックベクトル空間とし、$J^2=-I$ を満たす線形写像 $J$ を取る。$g_J(u,v)=\omega(u,Jv)$ と置く。このとき次は同値である。
>
> 1. $J$ は $\omega$ に適合する。
> 2. $g_J$ は対称かつ正定値な実双線形形式である。
>
> これらが成り立つとき、さらに $g_J(Ju,Jv)=g_J(u,v)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

「形式の保存」と「$g_J$ の対称性」を $J^2=-I$ を用いて往復させます。最後の直交性は、適合性を得た後に一行ずつ引数を書き換えて確かめます。

<!-- proof-start -->
### 証明

まず適合性を仮定します。$J^2=-I$ から $J^{-1}=-J$ です。形式の保存を、第一引数 $u$、第二引数 $-Jv$ に適用すると

$$
\omega(Ju,J(-Jv))=\omega(u,-Jv).
$$

左辺は $\omega(Ju,v)$ なので

$$
\omega(Ju,v)=-\omega(u,Jv)
$$

です。$\omega$ の交代性も使うと

$$
\begin{aligned}
g_J(v,u)
&=\omega(v,Ju)\\
&=-\omega(Ju,v)\\
&=\omega(u,Jv)=g_J(u,v).
\end{aligned}
$$

定義した $g_J$ は双線形であり、対称です。また非零 $v$ について $g_J(v,v)=\omega(v,Jv)>0$ だから正定値です。

逆に、$g_J$ が対称・正定値とします。定義を展開すると

$$
\omega(u,Jv)=g_J(u,v)=g_J(v,u)=\omega(v,Ju)=-\omega(Ju,v).
$$

ここで $v$ を $Jv$ に置き換え、$J(Jv)=-v$ を代入すると

$$
-\omega(u,v)=-\omega(Ju,Jv).
$$

両辺を $-1$ 倍して $\omega(Ju,Jv)=\omega(u,v)$ を得ます。さらに正定値性から $\omega(v,Jv)=g_J(v,v)>0$ です。もともとの $J^2=-I$ と合わせ、適合性の三条件が成立します。

最後に、形式の保存を $u$ と $Jv$ に適用すると

$$
\begin{aligned}
g_J(Ju,Jv)
&=\omega(Ju,J(Jv))\\
&=\omega(Ju,-v)\\
&=\omega(u,Jv)=g_J(u,v).
\end{aligned}
$$

二行目から三行目では、先に示した $\omega(Ju,v)=-\omega(u,Jv)$ を使いました。
<!-- proof-end -->

この定理により、$\omega$ と適合する $J$ の組から**長さ・直交性・エネルギー**を扱えるようになります。しかし「適合する $J$ が存在する」という主張はまだ示していません。

## 3. どのシンプレクティック空間にも適合構造はある

最小例から先に構成します。[SYM1のシンプレクティック基底定理](../SYM1/index.md#thm-sym1-linear-normal-form)によって

$$
e_1,\ldots,e_n,f_1,\ldots,f_n
$$

を選び、$\omega(e_i,f_j)=\delta_{ij}$、同種の基底ベクトル同士の値は零とします。この基底で $Je_i=f_i$、$Jf_i=-e_i$ とすれば適合するはずです。

<a id="thm-sym8-linear-existence"></a>

<!-- formal-statement-start -->
> **定理（適合する線形複素構造の存在）**  
> 任意の $2n$ 次元実シンプレクティックベクトル空間 $(V,\omega)$ に、$\omega$ に適合する線形複素構造 $J$ が存在する。$n=0$ の場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

シンプレクティック基底の各対を同じ向きに回します。任意のベクトルを基底展開し、二乗・形式の保存・正値性を順番に検証します。

<!-- proof-start -->
### 証明

$n=0$ は零空間の唯一の線形写像が $I=0$ でもあり、空の正値性条件を満たす場合です。$n\ge1$ とします。[SYM1の線形標準形](../SYM1/index.md#thm-sym1-linear-normal-form)により上記の基底を選び、

$$
Je_i=f_i,\qquad Jf_i=-e_i
$$

を基底上で指定して線形に延長します。各 $i$ で $J^2e_i=-e_i$、$J^2f_i=-f_i$ なので、基底を張る全空間で $J^2=-I$ です。

二つのベクトルを

$$
u=\sum_i(a_i e_i+b_i f_i),\qquad
v=\sum_i(c_i e_i+d_i f_i)
$$

と置くと

$$
Ju=\sum_i(-b_i e_i+a_i f_i),\qquad
Jv=\sum_i(-d_i e_i+c_i f_i).
$$

双線形性と基底の条件から

$$
\begin{aligned}
\omega(u,v)&=\sum_i(a_i d_i-b_i c_i),\\
\omega(Ju,Jv)&=\sum_i((-b_i)c_i-a_i(-d_i))\\
&=\sum_i(a_i d_i-b_i c_i)=\omega(u,v).
\end{aligned}
$$

最後に

$$
\omega(v,Jv)=\sum_i(c_i^2+d_i^2).
$$

$v\ne0$ なら基底係数のうち少なくとも一つは非零なので右辺は正です。従って三条件がすべて成立します。
<!-- proof-end -->

これは存在証明ですが、**基底を選び替えると一般に別の $J$** を得ます。多様体上で各点の基底を無関係に選ぶだけでは、得られる $J_x$ が滑らかに変化する保証もありません。そこで、最初に滑らかな内積を選び、それから $J$ を作る方法が役立ちます。

## 4. 正定値計量からの構成：平方根を使う理由

$h$ を $V$ 上の任意の正定値内積とします。$\omega$ と $h$ を結ぶ線形写像 $A$ を

$$
h(Au,v)=\omega(u,v)\qquad(u,v\in V)
$$

で定めます。$h$ が非退化なので $Au$ は一意です。$\omega$ の非退化性から $A$ は可逆で、交代性から $h(Au,v)=-h(u,Av)$、すなわち $A$ は $h$ に関して反対称です。

単に $J=A$ としても $A^2=-I$ とは限りません。$A$ に含まれる伸縮を、正定値平方根で除きます。

<a id="thm-sym8-polar-construction"></a>

<!-- formal-statement-start -->
> **定理（内積からの適合複素構造の構成）**  
> $(V,\omega)$ を有限次元実シンプレクティック空間、$h$ を正定値内積とする。$h(Au,v)=\omega(u,v)$ で $A$ を定め、

$$
S=(-A^2)^{1/2},\qquad J=S^{-1}A
$$

> と置く。ここで $S$ は $h$ に関する正定値平方根である。このとき $S$ は可逆で $AS=SA$、$J$ は $\omega$ に適合する。また

$$
g_J(u,v)=h(Su,v)
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ の反対称性から $-A^2$ は対称・正定値です。[正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)で伸縮 $S$ を抽出し、$J=S^{-1}A$ の二乗を計算します。正値性は $\omega(u,Ju)=h(Su,u)$ へ戻して確かめます。

<!-- proof-start -->
### 証明

$h$ に関する随伴を $A^*$ とすると、既に得た交代性は $A^*=-A$ です。$A$ の可逆性により、$u\ne0$ に対して $Au\ne0$ であり、

$$
h((-A^2)u,u)=h(A^*Au,u)=h(Au,Au)>0.
$$

従って $B=-A^2=A^*A$ は $h$ に関して対称・正定値です。$h$ の正規直交基底を選び、[LA6の半正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)を $B$ の実対称行列に適用すると、唯一の正定値対称平方根 $S$ が存在します。$B$ の固有値はすべて正なので $S$ も可逆です。

次に $A$ は $B=-A^2$ と可換です。$B$ の固有空間 $E_\lambda$ を考えると、$Bu=\lambda u$ なら

$$
B(Au)=A(Bu)=\lambda Au,
$$

よって $A(E_\lambda)\subseteq E_\lambda$ です。平方根 $S$ は各 $E_\lambda$ 上で $\sqrt\lambda I$ と作用するため、そこでは $AS=SA$。固有空間の直和が $V$ 全体なので $AS=SA$ が成立します。逆行列とも可換です。

従って

$$
\begin{aligned}
J^2&=(S^{-1}A)(S^{-1}A)\\
&=S^{-2}A^2\\
&=-S^{-2}S^2=-I.
\end{aligned}
$$

さらに $S$ は対称、$A$ は反対称なので

$$
\begin{aligned}
g_J(u,v)
&=\omega(u,Jv)=h(Au,S^{-1}Av)\\
&=h(S^{-1}Au,Av)\\
&=h(A^*S^{-1}Au,v)\\
&=h((-A)S^{-1}Au,v)\\
&=h(Su,v).
\end{aligned}
$$

四行目では $-A S^{-1}A=-S^{-1}A^2=S$ を使っています。最後は $S$ の対称性です。$S$ は正定値だから $g_J$ は対称・正定値であり、[適合性と正定値内積の同値](#thm-sym8-compatible-metric)から $J$ が適合することを得ます。
<!-- proof-end -->

### 一対で伸縮を見える形にする

$\omega=dq\wedge dp$、$h=a\,dq^2+b\,dp^2$（$a,b>0$）とします。$h$ の係数行列 $H=\operatorname{diag}(a,b)$ を使えば、定義 $h(Au,v)=\omega(u,v)$ は $A^{\mathsf T}H=\Omega$ を意味するので

$$
A=\begin{pmatrix}0&-1/a\\1/b&0\end{pmatrix},
\qquad -A^2=\frac1{ab}I_2.
$$

従って

$$
S=\frac1{\sqrt{ab}}I_2,\quad
J=\begin{pmatrix}0&-\sqrt{b/a}\\\sqrt{a/b}&0\end{pmatrix},
\quad
[g_J]=\begin{pmatrix}\sqrt{a/b}&0\\0&\sqrt{b/a}\end{pmatrix}.
$$

元の $h$ と出来上がった $g_J$ は一般には一致しません。構成は $h$ の形をそのまま採用するのではなく、$\omega$ と両立するように伸縮を補正する操作なのです。

## 5. 多様体上で滑らかに構成できるか

[SYM2のシンプレクティック多様体](../SYM2/index.md#def-sym2-symplectic-manifold)では、各点にシンプレクティック接空間があります。しかし、点ごとの $J_x$ だけでなく、$x$ とともに滑らかに変わる写像場を求める必要があります。

<a id="def-sym8-almost-complex"></a>

<!-- formal-statement-start -->
> **定義（概複素構造と適合性）**  
> 滑らかな実 $2n$ 次元多様体 $M$ の接束上の滑らかな束写像 $J:TM\to TM$ が、各点 $x$ で

$$
J_x^2=-I_{T_xM}
$$

> を満たすとき、$J$ を概複素構造という。さらに $(M,\omega)$ がシンプレクティック多様体で、各点の $J_x$ が $\omega_x$ に適合するとき、$J$ を $\omega$ に適合する概複素構造という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym8-almost-complex -->
### 直接例：トーラスと球面

**定義の確認**：トーラス $\mathbb T^2$ に角度方向の大域的ベクトル場 $\partial_x,\partial_y$ があり、$\omega=dx\wedge dy$ です。

$$
J\partial_x=\partial_y,\qquad
J\partial_y=-\partial_x
$$

とすれば係数は一定なので滑らか、各接空間で $J^2=-I$、$g=dx^2+dy^2$ は正定値です。従って適合します。

もう一つの大域例として、単位球面 $S^2\subset\mathbb R^3$ では [SYM2の面積形式](../SYM2/index.md#prop-sym2-sphere-area)を

$$
\omega_x(u,v)=\det(x,u,v)
$$

と定めました。$x\cdot v=0$ の接ベクトルに $J_xv=x\times v$ を対応させます。これは接空間に入り、$x$ に滑らかに依存します。ベクトル三重積の公式と $\|x\|=1$ により

$$
J_x^2v=x\times(x\times v)=x(x\cdot v)-v=-v,
$$

また接ベクトル $u,v$ について

$$
\omega_x(u,J_xv)=x\cdot\bigl(u\times(x\times v)\bigr)
=u\cdot v-(u\cdot x)(v\cdot x)=u\cdot v.
$$

従って [適合性と正定値内積の同値](#thm-sym8-compatible-metric)を各接空間に適用でき、この $J$ は球面全体で適合します。球面に一枚の平面座標を貼る必要はありません。
<!-- definition-example-end -->

任意の滑らかな計量 $h$ からの構成を多様体全体で使うためには、正定値平方根の**滑らかさ**を示さなければなりません。「各点で平方根がある」という事実だけでは不足します。

<a id="lem-sym8-smooth-square-root"></a>

<!-- formal-statement-start -->
> **補題（正定値平方根の滑らかな依存）**  
> 開集合 $U\subset\mathbb R^m$ 上の滑らかな実対称正定値行列値写像 $B:U\to\operatorname{Sym}_r^+$ に対し、唯一の正定値対称平方根 $B(x)^{1/2}$ も $x$ に滑らかに依存する。
<!-- formal-statement-end -->

### 証明の見取り図

平方根の値は[LA6の平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)から得られます。滑らかさには、方程式 $K^2=B(x)$ の $K$ に関する微分が対称行列空間上で可逆になることを使います。

<!-- proof-start -->
### 証明

$x_0\in U$ を固定して $K_0=B(x_0)^{1/2}$ とします。対称行列空間上の写像

$$
F(K,x)=K^2-B(x)
$$

を考えます。$K$ の方向 $H=H^{\mathsf T}$ に微分すると

$$
\begin{aligned}
(K+tH)^2-K^2
&=t(KH+HK)+t^2H^2,\\
D_KF(K_0,x_0)[H]&=K_0H+HK_0.
\end{aligned}
$$

$K_0$ を直交基底で $\operatorname{diag}(\lambda_1,\ldots,\lambda_r)$ にすると $\lambda_i>0$ です。この基底での成分は

$$
(K_0H+HK_0)_{ij}=(\lambda_i+\lambda_j)H_{ij}.
$$

任意の対称行列 $C$ に対し、$H_{ij}=C_{ij}/(\lambda_i+\lambda_j)$ と選べば $H$ は対称で、$K_0H+HK_0=C$。従って微分は対称行列空間の線形同型です。

[RA6Aの陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を $(K_0,x_0)$ で、未知変数を対称行列 $K$ の独立成分、外部パラメータを $x$ として適用すると、$x_0$ の近くで $F(K(x),x)=0$ を満たす $C^1$ 級の対称行列 $K(x)$ が存在します。定理の微分公式をこの方程式に適用すると

$$
DK(x)=-[D_KF(K(x),x)]^{-1}D_xF(K(x),x)
$$

です。$F$ は滑らかで、右辺の行列演算と逆行列は可逆性が続く近傍で滑らかです。まず $K$ が $C^1$ 級なので右辺は $C^1$ 級となり $K$ は $C^2$ 級です。同じ操作を帰納的に繰り返して任意次数の微分が連続と分かり、$K$ は滑らかです。$K(x)$ は $K_0$ に近いので、その近傍を小さく取れば正定値です。正定値平方根の一意性から $K(x)=B(x)^{1/2}$。各 $x_0$ についてこれが成立するため、全域で滑らかです。
<!-- proof-end -->

<a id="thm-sym8-manifold-existence"></a>

<!-- formal-statement-start -->
> **定理（滑らかな計量からの適合概複素構造）**  
> $(M,\omega)$ を滑らかなシンプレクティック多様体とし、$M$ に各接空間上に正定値内積を与える滑らかな対称2階テンソル $h$ が与えられているとする。このとき $\omega$ に適合する滑らかな概複素構造 $J$ が存在する。特に、局所有限な分割の一を持つ通常のパラコンパクトな滑らかな多様体には、そのような $h$ が存在するため、この結論が適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

各点に[内積からの構成](#thm-sym8-polar-construction)を適用します。局所座標で $h,\omega$ の係数は滑らかなので、$A$、$-A^2$、その正定値平方根、逆行列、$J$ も滑らかです。

<!-- proof-start -->
### 証明

各点 $x$ で、接空間 $T_xM$ 上の正定値内積 $h_x$ により

$$
h_x(A_xu,v)=\omega_x(u,v)
$$

を満たす $A_x$ を定めます。局所座標で行列を $H(x),\Omega(x)$ とすれば、$A(x)^{\mathsf T}H(x)=\Omega(x)$ です。従って

$$
A(x)=-H(x)^{-1}\Omega(x)
$$

です。$H(x)$ は正定値、$\Omega(x)$ は非退化なので、この逆行列表示は滑らかです。$B(x)=-A(x)^2$ は $h_x$ に関し正定値・自己随伴ですが、一般の座標で通常の対称行列とは限りません。

この点を処理するため $H(x)$ の正定値平方根 $R(x)=H(x)^{1/2}$ を取ります。[平方根の滑らかさ](#lem-sym8-smooth-square-root)により $R$ は滑らかです。$R$ は $h_x$ を標準内積に移す変換であり、

$$
\widetilde B(x)=R(x)B(x)R(x)^{-1}
$$

は通常の実対称正定値行列です。再び補題から $\widetilde S(x)=\widetilde B(x)^{1/2}$ は滑らかです。

$$
S(x)=R(x)^{-1}\widetilde S(x)R(x)
$$

と戻せば $S(x)^2=B(x)$ で、$h_x$ に関し正定値です。最後に

$$
J_x=S(x)^{-1}A(x)
$$

と定めると、逆行列と行列積は滑らかなので $x\mapsto J_x$ も滑らかです。各 $x$ で[線形構成定理](#thm-sym8-polar-construction)のすべての仮定が成立し、$\omega_x$ に適合します。

最後の付記については、局所有限な座標近傍と分割の一 $(\rho_i)$ を取り、各座標近傍の標準 Euclid 計量 $h_i$ を考えます。$\rho_i$ の台の外で積を零として

$$
h=\sum_i \rho_i h_i
$$

と置きます。局所有限性により各点付近の和は有限で滑らかです。$\sum_i\rho_i=1$、$\rho_i\ge0$ より、非零接ベクトル $v$ には少なくとも一つ $\rho_i(x)>0$ があり、

$$
h_x(v,v)=\sum_i\rho_i(x)(h_i)_x(v,v)>0.
$$

こうして必要な滑らかな計量が得られます。
<!-- proof-end -->

**注意**：上の存在定理は、複素座標が存在して $J$ が積分可能になると主張していません。ここで構成したものは、点ごとに二乗が $-I$ となる滑らかな写像場です。

## 6. 等長性・Lagrange方向・体積の結び付き

適合する $J$ は、[適合性と正定値内積の同値](#thm-sym8-compatible-metric)によって $g$ の等長変換です。従って長さだけでなく、どの方向が直交するかも $\omega$ で表せます。

<a id="prop-sym8-lagrangian-orthogonal"></a>

<!-- formal-statement-start -->
> **命題（Lagrange部分空間と計量直交補）**  
> $(V^{2n},\omega)$ に適合する $J$ と $g(u,v)=\omega(u,Jv)$ があるとする。$L\subset V$ が $n$ 次元の部分空間なら、$L$ が Lagrange であることと

$$
J(L)=L^{\perp_g}
$$

> は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$g(u,Jv)=\omega(u,J^2v)=-\omega(u,v)$ が橋渡しです。片方の包含を示し、両辺の次元が $n$ であることを使います。

<!-- proof-start -->
### 証明

$u,v\in L$ に対し

$$
g(u,Jv)=\omega(u,J(Jv))=-\omega(u,v).
$$

まず $L$ が Lagrange なら、[等方・余等方の次元とLagrange判定](../SYM6/index.md#thm-sym6-lagrangian-criterion)により $L$ は等方であり、右辺は零です。従って全ての $Jv$ は $L$ と $g$ に関して直交し、$J(L)\subseteq L^{\perp_g}$ です。$J$ は可逆なので $\dim J(L)=n$。正定値内積の直交補は $\dim L^{\perp_g}=2n-n=n$ であり、包含は等号です。

逆に $J(L)=L^{\perp_g}$ なら、$u,v\in L$ に対して $Jv\in L^{\perp_g}$ なので $g(u,Jv)=0$。上の恒等式から $\omega(u,v)=0$ であり、$L$ は等方です。$\dim L=n$ と[等方・余等方の次元とLagrange判定](../SYM6/index.md#thm-sym6-lagrangian-criterion)により Lagrange です。
<!-- proof-end -->

<a id="prop-sym8-compatible-volume"></a>

<!-- formal-statement-start -->
> **命題（適合計量とシンプレクティック体積）**  
> $(V^{2n},\omega)$ を実シンプレクティックベクトル空間、$n\ge1$ とし、$J$ を適合複素構造、$g(u,v)=\omega(u,Jv)$ とする。このときある $g$-正規直交基底

$$
e_1,Je_1,\ldots,e_n,Je_n
$$

> が存在し、これが定める正向きの体積形式は $\omega^{\wedge n}/n!$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

一対 $e,Je$ は $\omega(e,Je)=g(e,e)=1$ を満たします。$g$-直交補が $J$ で保たれることを示せば、その補空間で同じ一対を取り出せます。

<!-- proof-start -->
### 証明

$g$-単位ベクトル $e_1$ を取り、$W_1=\operatorname{span}\{e_1,Je_1\}$ とします。[適合性と正定値内積の同値](#thm-sym8-compatible-metric)による $J$ の等長性から $\|Je_1\|_g=1$ です。また

$$
g(e_1,Je_1)=\omega(e_1,J(Je_1))=-\omega(e_1,e_1)=0.
$$

よって二方向は正規直交です。$W_1$ は $J$ によって不変であり、任意の $z\in W_1^{\perp_g}$ と $w\in W_1$ について

$$
g(Jz,w)=-g(z,Jw)=0
$$

です。ここでは $g(Jz,J(Jw))=g(z,Jw)$ と $J^2=-I$ を使いました。$Jw\in W_1$ なので $Jz\in W_1^{\perp_g}$。従って $W_1^{\perp_g}$ も $J$-不変です。

この補空間の実次元は $2n-2$ です。そこで同じ操作を繰り返し、有限回で所望の $g$-正規直交基底を構成します。異なる組のベクトルは $g$ で直交し、$\omega(u,v)=-g(u,Jv)$ という関係から $\omega$ でも直交します。各組では $\omega(e_i,Je_i)=g(e_i,e_i)=1$ です。

この基底の双対1形式を $e^1,f^1,\ldots,e^n,f^n$ とすると

$$
\omega=\sum_{i=1}^n e^i\wedge f^i.
$$

[SYM2の最高次外積の計算](../SYM2/index.md#prop-sym2-symplectic-orientation)と同じ添字展開で、同じ組を二回選ぶ項は零、異なる組を一回ずつ選ぶ項は $n!$ 個なので

$$
\frac{\omega^{\wedge n}}{n!}
=e^1\wedge f^1\wedge\cdots\wedge e^n\wedge f^n.
$$

右辺は構成した正規直交基底で値1を取る体積形式です。
<!-- proof-end -->

[Lagrange部分多様体の接空間判定](../SYM6/index.md#def-sym6-lagrangian-submanifold)を使う場合、各接空間でこの直交補の特徴づけを適用できます。ただし計量の直交補とシンプレクティック直交補は、同じ記号で書かないようにします。

## 7. 正値性だけでは「適合」とは限らない

形式保存を外して $\omega(v,Jv)>0$ だけを課すと、条件は弱くなります。何が壊れるかを明確にするため、別の概念として区別します。

<a id="def-sym8-tame"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック形式が馴らす概複素構造）**  
> $(V,\omega)$ を有限次元実シンプレクティック空間とする。$J^2=-I$ を満たす線形写像 $J$ が、すべての非零 $v$ に対し $\omega(v,Jv)>0$ を満たすとき、$J$ は $\omega$ により馴らされる（$\omega$-tame）という。多様体では同じ条件をすべての接空間に課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym8-tame -->
### 直接例：適合するものは必ず馴らされる

**定義の確認**：第1節の $J_0$ は $J_0^2=-I$ であり、非零 $v=(q,p)$ に対して $\omega_0(v,J_0v)=q^2+p^2>0$ です。従って馴らされます。さらに適合性も満たすので、馴らされる条件だけではそれとの差を判定できません。次の例で差を見ます。
<!-- definition-example-end -->

$\mathbb R^4=\mathbb R^2\oplus\mathbb R^2$ に直和の標準形式 $\omega=\omega_0\oplus\omega_0$ を置き、$J_2=J_0$、$D=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}$ とします。実数 $\varepsilon$ に対しブロック行列

$$
J_\varepsilon=
\begin{pmatrix}J_2&\varepsilon D\\0&J_2\end{pmatrix}
$$

を考えます。$J_2D+DJ_2=0$ なので $J_\varepsilon^2=-I_4$ です。$v=(v_1,v_2)$ と書くと

$$
\omega(v,J_\varepsilon v)=\|v_1\|^2+\|v_2\|^2
+\varepsilon\,\omega_0(v_1,Dv_2).
$$

$D$ は Euclid ノルムを保ち、$|\omega_0(a,b)|\le\|a\|\|b\|$ だから

$$
\omega(v,J_\varepsilon v)\ge
\left(1-\frac{|\varepsilon|}{2}\right)
(\|v_1\|^2+\|v_2\|^2)>0
$$

が $0<|\varepsilon|<2$ で成立します。従って馴らされます。しかし $u=(0,0,1,0)$、$v=(0,1,0,0)$ とすると

$$
\omega(u,v)=0,\qquad
\omega(J_\varepsilon u,J_\varepsilon v)=-\varepsilon\ne0.
$$

従って形式を保存せず、**適合しません**。壊れたのは正値性ではなく形式保存であり、[適合性と内積の同値](#thm-sym8-compatible-metric)に必要な対称性を一般には失います。

## 8. どこから先が別の理論か

ここまでの $J$ は、接空間上では複素数倍に似た線形作用素ですが、$\mathbb R^{2n}$ のような複素座標 $z^k=x^k+iy^k$ を局所的に取れるとは限りません。複素座標から来る $J$ と一般の概複素構造を分ける条件が**可積分性**です。この判定の主要結果は、別途、複素・微分幾何の理論を必要とします。本章では可積分性を仮定せず、その定理を証明なしで使用しません。

また、Riemann面の標準複素構造を $j$ とすれば、写像 $u$ の微分について

$$
du\circ j=J\circ du
$$

という方程式を考えることができます。これが擬正則写像を研究するときの出発点です。ただし、方程式を**書ける**ことと、その解の正則性・コンパクト性・計数を示せることは別です。Gromov–Witten理論やFloer理論はこれらを含む後続の独立科目であり、本章の結論として使いません。

## 9. 演習：適合性、構成、滑らかさ、境界を結ぶ

### Level A：定義を手で判定する

#### A1. 標準平面を行列で再計算する

$\omega_0=dq\wedge dp$、$J_0=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とする。$\Omega J_0$ を計算し、$J_0$ が適合することを三条件で示せ。

- Level: A
- ID: SYM8-A1

<!-- solution-start -->
**詳細解答**　係数行列は $\Omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ です。計算すると

$$
J_0^2=-I,\qquad
\Omega J_0=I.
$$

$u^{\mathsf T}\Omega J_0v=u^{\mathsf T}v$ は対称・正定値です。[適合性と内積の同値](#thm-sym8-compatible-metric)により適合します。三条件を直接見るなら、$J_0^{\mathsf T}\Omega J_0=\Omega$ は $J_0=-\Omega$、$J_0^{\mathsf T}=-J_0$、$\Omega^2=-I$ を代入して確かめられます。第三条件は $\omega_0(v,J_0v)=v^{\mathsf T}v>0$ です。
<!-- solution-end -->

#### A2. 逆回転はなぜ不適合か

同じ形式に対して $K=-J_0$ とする。$K^2$、$K^{\mathsf T}\Omega K$、$\omega_0(v,Kv)$ を求め、失敗する条件を特定せよ。

- Level: A
- ID: SYM8-A2

<!-- solution-start -->
**詳細解答**　$K^2=(-1)^2J_0^2=-I$ です。また

$$
K^{\mathsf T}\Omega K
=(-J_0)^{\mathsf T}\Omega(-J_0)
=J_0^{\mathsf T}\Omega J_0=\Omega.
$$

しかし $v=(q,p)^{\mathsf T}\ne0$ なら

$$
\omega_0(v,Kv)
=-\omega_0(v,J_0v)=-(q^2+p^2)<0.
$$

第一・第二条件は成立し、第三の正値性だけが破れます。向きの選択を正値性が固定していることが分かります。
<!-- solution-end -->

#### A3. 係数の異なる回転

$a>0$ に対して $J_a=\begin{pmatrix}0&-a^{-1}\\a&0\end{pmatrix}$ を考える。$J_a$ が $\omega_0$ に適合するか判定し、$g_a$ の行列を求めよ。

- Level: A
- ID: SYM8-A3

<!-- solution-start -->
**詳細解答**　二乗は

$$
J_a^2=
\begin{pmatrix}-a^{-1}a&0\\0&-aa^{-1}\end{pmatrix}=-I.
$$

計量の行列は

$$
\Omega J_a=
\begin{pmatrix}a&0\\0&a^{-1}\end{pmatrix}.
$$

$a>0$ なので対称・正定値です。[同値定理](#thm-sym8-compatible-metric)から適合します。直接の正値性は $\omega_0(v,J_av)=aq^2+a^{-1}p^2>0$、保存性は定理の逆方向の証明で保証されます。
<!-- solution-end -->

#### A4. 引数の入れ替えの符号

$J^2=-I$ と $\omega(Ju,Jv)=\omega(u,v)$ を仮定する。$\omega(Ju,v)=-\omega(u,Jv)$ を導き、$g(u,v)=\omega(u,Jv)$ が対称となる理由を示せ。

- Level: A
- ID: SYM8-A4

<!-- solution-start -->
**詳細解答**　形式の保存へ第二引数として $-Jv$ を入れます。$J(-Jv)=v$ だから

$$
\omega(Ju,v)=\omega(u,-Jv)=-\omega(u,Jv).
$$

交代性も使うと

$$
g(v,u)=\omega(v,Ju)=-\omega(Ju,v)=\omega(u,Jv)=g(u,v).
$$

第二引数に $-Jv$ を選ぶのは、$J^2=-I$ を利用して $v$ に戻すためです。
<!-- solution-end -->

#### A5. 球面の回転

$S^2$ 上の接ベクトル $v$ に $J_xv=x\times v$ を定め、$\omega_x(u,v)=\det(x,u,v)$ とする。$J^2=-I$ と $\omega_x(v,J_xv)=\|v\|^2$ を示せ。

- Level: A
- ID: SYM8-A5

<!-- solution-start -->
**詳細解答**　単位ベクトル $x$ と接ベクトル $v$ は $x\cdot v=0$ なので

$$
x\times(x\times v)
=x(x\cdot v)-(x\cdot x)v=-v.
$$

従って $J_x^2v=-v$。また三重積恒等式より

$$
\begin{aligned}
\omega_x(v,J_xv)
&=x\cdot(v\times(x\times v))\\
&=(x\cdot x)(v\cdot v)-(x\cdot v)^2\\
&=\|v\|^2.
\end{aligned}
$$

非零 $v$ なら正です。さらに $g_x(u,v)=u\cdot v$ と同じ恒等式で得られ、対称・正定値だから[適合性と正定値内積の同値](#thm-sym8-compatible-metric)から適合性まで導けます。
<!-- solution-end -->

### Level B：複数の条件を接続する

#### B1. 四次元で計量と体積

$\mathbb R^4$ の座標 $(q_1,p_1,q_2,p_2)$ に $\omega=dq_1\wedge dp_1+dq_2\wedge dp_2$ を置き、$Je_{q_i}=e_{p_i}$、$Je_{p_i}=-e_{q_i}$ とする。$g$ と $\omega^{\wedge2}/2$ を求め、向きが一致することを示せ。

- Level: B
- ID: SYM8-B1

<!-- solution-start -->
**詳細解答**　座標順に $\Omega$ と $J$ はそれぞれ $\Omega_2=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ と $J_2=-\Omega_2$ の二ブロック直和です。従って $\Omega J=I_4$ なので

$$
g=dq_1^2+dp_1^2+dq_2^2+dp_2^2.
$$

$\alpha_i=dq_i\wedge dp_i$ と置くと $\alpha_i\wedge\alpha_i=0$、2形式同士は可換だから

$$
\begin{aligned}
\omega^{\wedge2}
&=(\alpha_1+\alpha_2)\wedge(\alpha_1+\alpha_2)\\
&=\alpha_1\wedge\alpha_2+\alpha_2\wedge\alpha_1\\
&=2\,dq_1\wedge dp_1\wedge dq_2\wedge dp_2.
\end{aligned}
$$

よって $\omega^{\wedge2}/2$ は $g$ の標準正向き正規直交基底に対する体積形式に一致します。[適合体積命題](#prop-sym8-compatible-volume)を具体的に確認しました。
<!-- solution-end -->

#### B2. 対角計量を正規化する

$\omega=dq\wedge dp$、$h=a\,dq^2+b\,dp^2$、$a,b>0$ とする。$A$、$S$、$J=S^{-1}A$ を計算し、$h(Su,v)=\omega(u,Jv)$ を行列で確認せよ。

- Level: B
- ID: SYM8-B2

<!-- solution-start -->
**詳細解答**　$H=\operatorname{diag}(a,b)$、$\Omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とします。$A^{\mathsf T}H=\Omega$ を転置すると $HA=-\Omega$ なので

$$
A=-H^{-1}\Omega
=\begin{pmatrix}0&-1/a\\1/b&0\end{pmatrix}.
$$

この積の平方は $A^2=-(ab)^{-1}I$ です。従って $S=(ab)^{-1/2}I$ であり、

$$
J=\sqrt{ab}A=
\begin{pmatrix}0&-\sqrt{b/a}\\\sqrt{a/b}&0\end{pmatrix}.
$$

さらに

$$
HS=\begin{pmatrix}\sqrt{a/b}&0\\0&\sqrt{b/a}\end{pmatrix}
=\Omega J.
$$

任意の列ベクトル $u,v$ に対して左辺の係数行列は $u^{\mathsf T}HSv$、右辺は $u^{\mathsf T}\Omega Jv$ なので、両双線形形式は一致します。[内積からの構成定理](#thm-sym8-polar-construction)の中間式まで再現できました。
<!-- solution-end -->

#### B3. 正値性だけでは足りない

$0<|\varepsilon|<2$、$D=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}$、$J_\varepsilon=\begin{pmatrix}J_2&\varepsilon D\\0&J_2\end{pmatrix}$、$\omega=\omega_0\oplus\omega_0$ とする。$J_\varepsilon^2=-I_4$、$\omega(v,J_\varepsilon v)>0$ を示し、形式保存が失敗する二方向を挙げよ。

- Level: B
- ID: SYM8-B3

<!-- solution-start -->
**詳細解答**　$J_2D=\operatorname{diag}(1,-1)$、$DJ_2=\operatorname{diag}(-1,1)$ だから和は零です。従ってブロック積で

$$
J_\varepsilon^2=
\begin{pmatrix}J_2^2&\varepsilon(J_2D+DJ_2)\\0&J_2^2\end{pmatrix}=-I_4.
$$

$v=(v_1,v_2)$ に対し交差項の絶対値は

$$
|\varepsilon\omega_0(v_1,Dv_2)|
\le|\varepsilon|\|v_1\|\|v_2\|
\le\frac{|\varepsilon|}{2}(\|v_1\|^2+\|v_2\|^2)
$$

です。よって $v\ne0$ なら $\omega(v,J_\varepsilon v)\ge(1-|\varepsilon|/2)\|v\|^2>0$。

最後に $u=(0,0,1,0)$、$v=(0,1,0,0)$ を取ると $\omega(u,v)=0$ です。一方、$J_\varepsilon u=(0,-\varepsilon,0,1)$、$J_\varepsilon v=(-1,0,0,0)$ なので

$$
\omega(J_\varepsilon u,J_\varepsilon v)
=0\cdot0-(-\varepsilon)(-1)=-\varepsilon\ne0.
$$

従って[馴らされる構造の定義](#def-sym8-tame)は満たしますが、[適合性の定義](#def-sym8-compatible)の形式保存を満たしません。
<!-- solution-end -->

#### B4. Lagrange空間と直交補

適合三つ組 $(V^{2n},\omega,J)$ に対し、$n$ 次元部分空間 $L$ が等方なら $J(L)=L^{\perp_g}$ と示せ。逆に $g(L,J(L))=0$ が成立すれば $L$ が Lagrange になる理由も示せ。

- Level: B
- ID: SYM8-B4

<!-- solution-start -->
**詳細解答**　$u,v\in L$ で $g(u,Jv)=\omega(u,-v)=-\omega(u,v)$ です。等方性から右辺が零だから、$Jv\in L^{\perp_g}$ です。よって $J(L)\subseteq L^{\perp_g}$。$J^{-1}=-J$ なので $\dim J(L)=n$、正定値内積による直交補も $2n-n=n$ 次元です。従って包含は等号になります。

逆に $g(L,J(L))=0$ なら全 $u,v\in L$ で

$$
0=g(u,Jv)=-\omega(u,v)
$$

です。よって $L$ は等方であり、半次元条件と[SYM6のLagrange判定](../SYM6/index.md#thm-sym6-lagrangian-criterion)から Lagrange です。直交性は単独では $n$ 次元を保証しないので、問題の次元仮定が使われています。
<!-- solution-end -->

### Level C：存在定理を別の経路で組み直す

#### C1. 計量の経路から適合構造の経路を作る

$(V^{2n},\omega)$ の二つの正定値内積 $h_0,h_1$ を取り、$h_t=(1-t)h_0+th_1$（$0\le t\le1$）とする。

1. 全時刻で $h_t$ が正定値であることを示せ。
2. $h_t(A_tu,v)=\omega(u,v)$、$S_t=(-A_t^2)^{1/2}$、$J_t=S_t^{-1}A_t$ と定め、$(t,u)\mapsto J_tu$ が滑らかで、各 $J_t$ が適合することを示せ。
3. $\omega=dq\wedge dp$、$h_0=dq^2+dp^2$、$h_1=4dq^2+dp^2$ に対する $J_t$ を明示せよ。またすべての $t$ で $\omega(v,J_tv)>0$ を確認せよ。

- Level: C
- ID: SYM8-C1

<!-- solution-start -->
**詳細解答**

**(1)** 任意の非零 $v$ に対し、$h_0(v,v)>0$ と $h_1(v,v)>0$ です。$0\le t\le1$ で係数 $1-t,t$ はともに非負で和が1なので

$$
h_t(v,v)=(1-t)h_0(v,v)+t h_1(v,v)>0.
$$

両端も含めて正定値です。

**(2)** 固定した基底で $h_t$ の行列を $H_t$、$\omega$ の行列を $\Omega$ とすれば、[内積からの構成定理](#thm-sym8-polar-construction)の最初の式と交代性より

$$
A_t=-H_t^{-1}\Omega.
$$

$H_t$ は $0\le t\le1$ の全時刻で正定値です。さらに $H_t$ は $t$ の一次式であり、端点 $t=0,1$ の周囲でも固有値が連続かつ正なので、区間を少し広げた開区間で正定値を保ちます。従って逆行列 $H_t^{-1}$ と $A_t$ は、この開区間上で滑らかです。$B_t=-A_t^2$ は $H_t$-自己随伴かつ正定値です。第5節の[滑らかな平方根補題](#lem-sym8-smooth-square-root)と同じ理由で、$H_t^{1/2}B_tH_t^{-1/2}$ の通常の正定値平方根を取って戻すと、$S_t$ は滑らかです。従って $S_t^{-1}$、$J_t=S_t^{-1}A_t$ も滑らかです。各時刻で $h_t$ と $\omega$ は定理の仮定を満たすので

$$
J_t^2=-I,\quad
g_t(u,v)=\omega(u,J_tv)=h_t(S_tu,v)
$$

であり、$g_t$ は正定値です。[適合性と内積の同値](#thm-sym8-compatible-metric)から $J_t$ は全時刻で適合します。

**(3)** $h_t$ の係数は $a_t=(1-t)+4t=1+3t$ と $b_t=1$ です。$a_t\ge1$ なので[対角計量の構成](#thm-sym8-polar-construction)の一対の式を $a=a_t,b=1$ として代入でき、

$$
J_t=
\begin{pmatrix}
0&-(1+3t)^{-1/2}\\
(1+3t)^{1/2}&0
\end{pmatrix}
$$

を得ます。これは両端を含めて滑らかです。$v=(q,p)$ に対し

$$
\omega(v,J_tv)
=(1+3t)^{1/2}q^2+(1+3t)^{-1/2}p^2>0\quad(v\ne0).
$$

従って $h_t$ の凸補間は、**互いに異なる適合構造を滑らかな経路で結ぶ具体的な方法**を与えます。ただしこの問題は、すべての適合構造の空間についてより強い位相的結論を証明したものではありません。
<!-- solution-end -->

## 10. この章で得た道具と次の境界

ここまでで、非退化交代形式から「計量を持たない」という不便を解消する仕組みを構成しました。正値性と形式保存を併せた適合性、基底による線形存在、任意の補助計量からの平方根構成、滑らかな多様体上の適合概複素構造までが本章の証明済みの範囲です。

これにより Lagrange 部分空間は計量直交補で読み替えられ、$\omega^n/n!$ は適合計量の体積と一致します。一方、適合性は複素座標の存在を意味せず、擬正則曲線の解の正則性・コンパクト性や Floer 理論は別の定理群を必要とします。この区別を保つことが、後続分野へ進むための土台になります。
