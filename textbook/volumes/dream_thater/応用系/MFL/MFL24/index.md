# MFL24 群表現・intertwiner・特徴型

<!-- definition-example-audit: strict -->

## 1. 同じ回転を「特徴の種類」に応じてどう作用させるか

[MFL23 の軌道上の等変写像](../MFL23/index.md#thm-mfl23-orbit-extension)は、入力を固定する対称変換が出力にも制約を課すことを示した。しかし、多数の特徴を持つデータでは、各特徴が回転・鏡映で**どのように変わるか**を先に指定しなければ、等変な線形層を作れない。

例えば正方形を90度回転させたとき、質量のような実数は変わらないが、向きを示す二成分の矢印は一緒に回る。符号付き面積は回転では変わらず、鏡映では符号が逆になる。単に「特徴が2個ある」だけでは、その変換規則は決まらない。

本章では有限群 $G$ と実有限次元ベクトル空間を使う。群作用の積・単位元は[GRP3 の群作用](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)に従い、各変換を可逆行列で表す。目的は次の三つである。

1. 入出力の特徴が従う行列表現を指定する。
2. 線形写像がその表現と両立する条件を、行列方程式として解く。
3. 有限群の具体的な基底分解から、許される特徴間の混合と禁じられる混合を理解する。

群平均から一般の等変層を構成するのは次章 MFL25 の役割である。本章は $C_2,C_4,D_4$ の有限計算で閉じる。一般の既約表現分類や複素表現の大定理は仮定しない。

## 2. 群の各元を可逆行列へ対応させる

$V=\mathbb R^d$ のベクトルを**特徴ベクトル**、その成分を測る基底を一度固定する。線形写像をこの基底で行列表示すると、合成は行列積になる。$\operatorname{GL}_d(\mathbb R)$ は可逆な $d\times d$ 実行列全体である。群の元 $g$ に行列 $\rho(g)\in\operatorname{GL}_d(\mathbb R)$ を割り当て、$g$ を作用させた特徴を $\rho(g)v$ と書く。

この割当が群の合成と整合することが必要である。これを**実行列表現**（以下、群表現）という。

<a id="def-mfl24-representation"></a>

<!-- formal-statement-start -->
> **定義（有限群の実有限次元表現）**
> 有限群 $G$ と $d\ge1$ に対し、写像 $\rho:G\to\operatorname{GL}_d(\mathbb R)$ が

$$
\rho(e)=I_d,\qquad \rho(gh)=\rho(g)\rho(h)
\quad(g,h\in G)
$$

> を満たすとき、$\rho$ を $G$ の $\mathbb R^d$ 上の**表現**という。$\rho(g)v$ が特徴の変換規則を与える。全 $g$ で $\rho(g)=I_d$ の表現を**自明表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl24-representation -->
**定義の確認**（四分の一回転）。$C_4=\{e,r,r^2,r^3\}$、$r^4=e$ とし、標準基底で

$$
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
\rho(r^k)=R^k
$$

と置く。$R^2=-I_2$, $R^4=I_2$ なので、$R^{-1}=R^3$、各 $R^k$ は可逆である。$\rho(e)=R^0=I_2$、任意の $i,j$ に対し

$$
\rho(r^ir^j)=R^{i+j}=R^iR^j
=\rho(r^i)\rho(r^j)
$$

（指数は4を法として読む）が成立する。これで可逆性・単位元・積の条件をそれぞれ確認した。$\rho(r)$ は特徴 $(a,b)^T$ を $(-b,a)^T$ に送る。
<!-- definition-example-end -->

表現の条件から逆元を代入すると

$$
\rho(g)\rho(g^{-1})=\rho(e)=I_d,
$$

したがって $\rho(g^{-1})=\rho(g)^{-1}$ となる。これは群作用の可逆性を行列の世界で再現している。基底が変われば行列も変わるが、作用そのものは変わらない。

## 3. 入力型と出力型をつなぐ線形写像

入力 $V_{\mathrm{in}}=\mathbb R^m$、出力 $V_{\mathrm{out}}=\mathbb R^n$ に、それぞれ表現 $\rho_{\mathrm{in}}$ と $\rho_{\mathrm{out}}$ を指定する。線形層 $F(x)=Wx$ は $n\times m$ 行列 $W$ で記述される。

入力を先に $g$ で変換した結果は $W\rho_{\mathrm{in}}(g)x$。出力してから変換した結果は $\rho_{\mathrm{out}}(g)Wx$。これが任意の $x$ で一致することを、MFL22 の[等変性の定義](../MFL22/index.md#def-mfl22-equivariant)を線形層に適用して要求する。

この二経路を一致させる線形写像を **絡作用素**（intertwiner）と呼ぶ。

<a id="def-mfl24-intertwiner"></a>

<!-- formal-statement-start -->
> **定義（表現の間の絡作用素）**
> 有限群 $G$ の実有限次元表現 $\rho_{\mathrm{in}}:G\to\operatorname{GL}_m(\mathbb R)$、$\rho_{\mathrm{out}}:G\to\operatorname{GL}_n(\mathbb R)$ に対し、線形写像 $W:\mathbb R^m\to\mathbb R^n$ が全 $g\in G$ で

$$
W\rho_{\mathrm{in}}(g)=\rho_{\mathrm{out}}(g)W
$$

> を満たすとき、$W$ を**絡作用素**という。$m$ と $n$ は異なってもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl24-intertwiner -->
**定義の確認**（符号を保つ例）。$C_2=\{e,s\}$、$s^2=e$ の入力・出力をともに $\mathbb R^2$ とし、$\rho(e)=I_2$、$\rho(s)=\operatorname{diag}(1,-1)$ とする。$\rho(s)^2=I_2$ なので、積の条件と可逆性を満たす表現である。$W=\operatorname{diag}(2,3)$ なら

$$
W\rho(s)=\begin{pmatrix}2&0\\0&-3\end{pmatrix}
=\rho(s)W.
$$

単位元については $WI_2=I_2W$。$C_2$ の元は $e,s$ だけなので全元について条件を確認した。一方、成分を入れ替える $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ は $P\rho(s)\ne\rho(s)P$ となるため、この特徴型間の絡作用素ではない。
<!-- definition-example-end -->

<a id="thm-mfl24-linear-equivariance"></a>

<!-- formal-statement-start -->
> **定理（線形等変性と交換条件の同値性）**
> 有限群 $G$、実有限次元表現 $\rho_{\mathrm{in}}:G\to\operatorname{GL}_m(\mathbb R)$、$\rho_{\mathrm{out}}:G\to\operatorname{GL}_n(\mathbb R)$、$W\in\mathbb R^{n\times m}$、線形写像 $F:\mathbb R^m\to\mathbb R^n$、$F(x)=Wx$ について、次は同値である。
>
> 1. 全 $g\in G$、全 $x\in\mathbb R^m$ で $F(\rho_{\mathrm{in}}(g)x)=\rho_{\mathrm{out}}(g)F(x)$。
> 2. 全 $g\in G$ で $W\rho_{\mathrm{in}}(g)=\rho_{\mathrm{out}}(g)W$。
<!-- formal-statement-end -->

**証明の見取り図**。ベクトルに作用させる順番を二つ書き、すべての入力で等しい行列は同一だと示す。

<!-- proof-start -->
### 証明

（2）を仮定すると、任意の $g,x$ に対して

$$
F(\rho_{\mathrm{in}}(g)x)
=W\rho_{\mathrm{in}}(g)x
=\rho_{\mathrm{out}}(g)Wx
=\rho_{\mathrm{out}}(g)F(x).
$$

逆に（1）を仮定すると、$A_g:=W\rho_{\mathrm{in}}(g)-\rho_{\mathrm{out}}(g)W$ は全 $x$ に対して $A_gx=0$ を満たす。$\mathbb R^m$ の標準基底 $e_1,\ldots,e_m$ を代入すると、$A_ge_j=0$ は $A_g$ の第 $j$ 列が零ベクトルであることを意味する。全列が0なので $A_g=0$。よって（2）が成立する。
<!-- proof-end -->

群が生成元 $r,s$ で生成される場合、各生成元の方程式だけで全元を検査できる。たとえば $W\rho_{\mathrm{in}}(r)=\rho_{\mathrm{out}}(r)W$ と同じ $s$ の式があれば、積 $rs$ に対して

$$
W\rho_{\mathrm{in}}(rs)
=W\rho_{\mathrm{in}}(r)\rho_{\mathrm{in}}(s)
=\rho_{\mathrm{out}}(r)\rho_{\mathrm{out}}(s)W
=\rho_{\mathrm{out}}(rs)W.
$$

逆元についても、生成元 $r$ に対する $W\rho_{\mathrm{in}}(r)=\rho_{\mathrm{out}}(r)W$ の左から $\rho_{\mathrm{out}}(r)^{-1}$、右から $\rho_{\mathrm{in}}(r)^{-1}$ を掛けると

$$
W\rho_{\mathrm{in}}(r)^{-1}
=\rho_{\mathrm{out}}(r)^{-1}W
$$

となるので成立する。有限群の全元を列挙する手法と生成元で解く手法は、ここでは同じ条件を与える。

## 4. 特徴型とは何を変換規則として約束することか

特徴ベクトルの**型**とは、次元だけでなく「どの表現で変換するか」を含めた指定である。例えば $C_2$ で一つの実数を変換しない型は $\rho_+(s)=1$、符号を反転する型は $\rho_-(s)=-1$。どちらも次元1だが型は異なる。

二つの型を一緒に並べた特徴 $x=(x_+,x_-)^T$ では、$s$ に対し $\operatorname{diag}(1,-1)$ が作用する。このように各部分空間を個別に保ち、ブロックごとに表現行列が並ぶものを**直和表現**と呼ぶ。

<a id="def-mfl24-feature-type"></a>

<!-- formal-statement-start -->
> **定義（特徴型と直和表現）**
> 有限群 $G$ の表現 $\rho:G\to\operatorname{GL}_d(\mathbb R)$ を指定された $d$ 成分の特徴を、**型 $\rho$ の特徴**という。表現 $\rho_1$ が $\mathbb R^{d_1}$、$\rho_2$ が $\mathbb R^{d_2}$ に作用するとき、$\mathbb R^{d_1+d_2}$ 上の**直和表現** $\rho_1\oplus\rho_2$ を

$$
(\rho_1\oplus\rho_2)(g)
=\begin{pmatrix}\rho_1(g)&0\\0&\rho_2(g)\end{pmatrix}
$$

> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl24-feature-type -->
**定義の確認**。$G=C_2$ とし、$\rho_+(s)=1$、$\rho_-(s)=-1$、どちらも単位元 $e$ には1を対応させる。$s^2=e$ なので、それぞれ $(\pm1)^2=1$ により積の条件を満たし、逆元も存在する。

直和を $D=\rho_+\oplus\rho_-$ と書くと、ブロックを並べた行列は

$$
D(e)=I_2,\qquad D(s)=\operatorname{diag}(1,-1),
\qquad D(s)^2=I_2.
$$

これで直和自身の可逆性・単位元・積の条件も確認できた。例えば

$$
D(s)(3,5)^T=(3,-5)^T
$$

となり、変わらない第1成分と符号が変わる第2成分を区別できる。
<!-- definition-example-end -->

### 4.1 符号型が違う成分は線形に混ぜられない

<a id="prop-mfl24-sign-selection"></a>

<!-- formal-statement-start -->
> **命題（C2の符号型による選択則）**
> $C_2=\{e,s\}$ とし、$m$ 次元入力、$n$ 次元出力で $\rho_{\mathrm{in}}(s)=\operatorname{diag}(\lambda_1,\ldots,\lambda_m)$、$\rho_{\mathrm{out}}(s)=\operatorname{diag}(\mu_1,\ldots,\mu_n)$、$\lambda_j,\mu_i\in\{1,-1\}$ とする。$W=(w_{ij})$ が絡作用素であるための必要十分条件は

$$
(\lambda_j-\mu_i)w_{ij}=0
\qquad(1\le i\le n,\ 1\le j\le m)
$$

> である。特に $\lambda_j\ne\mu_i$ なら $w_{ij}=0$。
<!-- formal-statement-end -->

**証明の見取り図**。[線形等変性の交換条件](#thm-mfl24-linear-equivariance)を行列の各成分で比較する。

<!-- proof-start -->
### 証明

右から対角行列を掛けると、第 $j$ 列が $\lambda_j$ 倍される。左から掛けると第 $i$ 行が $\mu_i$ 倍される。したがって各成分は

$$
\bigl(W\rho_{\mathrm{in}}(s)\bigr)_{ij}=w_{ij}\lambda_j,
\qquad
\bigl(\rho_{\mathrm{out}}(s)W\bigr)_{ij}=\mu_iw_{ij}.
$$

両行列が等しい条件は、すべての $i,j$ について $(\lambda_j-\mu_i)w_{ij}=0$ である。$e$ では両表現が単位行列なので追加条件はない。符号が異なれば差は $\pm2$ で非零ゆえ、該当する $w_{ij}$ は0に限られる。逆にこれらの成分条件が成り立てば全元で交換条件を満たす。
<!-- proof-end -->

**直接計算**。入力を $\rho_{\mathrm{in}}(s)=\operatorname{diag}(1,-1,-1)$、出力を $\rho_{\mathrm{out}}(s)=\operatorname{diag}(1,-1)$ とする。各成分を選択則へ代入すると

$$
W=\begin{pmatrix}a&0&0\\0&b&c\end{pmatrix}
\quad(a,b,c\in\mathbb R)
$$

だけが許される。実際、左右の積は同じ行列になり、

$$
W\rho_{\mathrm{in}}(s)=\rho_{\mathrm{out}}(s)W
=\begin{pmatrix}a&0&0\\0&-b&-c\end{pmatrix}.
$$

符号反転する2個の入力を混ぜることは許されるが、変換しない成分へ流し込むことは許されない。

## 5. $C_4$ の回転型――二成分でも任意の混合はできない

$C_4$ の二次元回転表現 $\rho(r)=R$ を入出力に採る。この特徴は一対の座標が90度回転する型であり、二つの独立なスカラー特徴ではない。一般の行列 $W=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ が許される条件を解こう。

<a id="thm-mfl24-rotation-commutant"></a>

<!-- formal-statement-start -->
> **定理（四分の一回転と可換な実2次行列）**
> $C_4=\langle r\mid r^4=e\rangle$ の実二次元表現を次の生成元行列で定める。

$$
\rho(r)=R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

> 線形写像 $W:\mathbb R^2\to\mathbb R^2$ が $C_4$-等変であるための必要十分条件は

$$
W=aI_2+bR=\begin{pmatrix}a&-b\\b&a\end{pmatrix}
\qquad(a,b\in\mathbb R)
$$

> である。
<!-- formal-statement-end -->

**証明の見取り図**。群の生成元 $r$ だけを考え、$WR=RW$ を4成分で解く。

<!-- proof-start -->
### 証明

$W=\begin{pmatrix}p&q\\u&v\end{pmatrix}$ と置くと

$$
WR=\begin{pmatrix}q&-p\\v&-u\end{pmatrix},\qquad
RW=\begin{pmatrix}-u&-v\\p&q\end{pmatrix}.
$$

両行列が等しいことは $q=-u$、$p=v$ と同値である（残る2式は同じ条件）。$a=p$、$b=u$ とおけば $W=aI_2+bR$。逆にこの形は $R$ と可換であり、$R^k$ とも可換なので $C_4$ の全元で交換条件を満たす。[線形等変性の同値性](#thm-mfl24-linear-equivariance)により結論を得る。
<!-- proof-end -->

例えば $W=I_2+2R$、$x=(1,2)^T$ とすると

$$
Wx=(-3,4)^T,\qquad
W(Rx)=W(-2,1)^T=(-4,-3)^T=R(Wx).
$$

この二次元回転型は、実数上では座標軸に分けて二つの一変数型にはできない。実際、1次元不変部分空間があれば非零実ベクトル $v$ に対して $Rv=tv$ となる実数 $t$ が必要だが、$R^2v=-v$ より $t^2=-1$ を要求して矛盾する。ここではこの事実を**実数上で分解できない回転型**と呼ぶ。複素数へ拡張したときの扱いとは区別する。

### 5.1 鏡映を許すと、混合はさらに制限される

$D_4$ の平面表現を $\rho(r)=R$、$\rho(s)=S=\operatorname{diag}(1,-1)$ とする。$R^2=-I_2$、$S^2=I_2$ であり、直接掛けると

$$
SRS=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
=-R=R^{-1},\qquad R^4=S^2=I_2.
$$

よって前章で扱った正方形の回転・鏡映と同じ群関係を満たす。$C_4$ の回転だけで認められた $aI+bR$ が、鏡映まで認められるとは限らない。

<a id="prop-mfl24-dihedral-commutant"></a>

<!-- formal-statement-start -->
> **命題（D4の平面ベクトル型の線形自己写像）**
> $D_4=\langle r,s\mid r^4=s^2=e,\ srs=r^{-1}\rangle$ の実二次元表現を次の生成元行列で定める。

$$
\rho(r)=R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
\rho(s)=S=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

> 線形写像 $W:\mathbb R^2\to\mathbb R^2$ が $D_4$-等変であるための必要十分条件は次の形である。

$$
W=aI_2\qquad(a\in\mathbb R).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r$ に対する等変性から[回転型の定理](#thm-mfl24-rotation-commutant)を適用でき、$W=aI_2+bR$。さらに $s$ に対して $WS=SW$ が必要である。$SRS=R^{-1}=-R$ だから $RS=-SR$、従って

$$
WS-SW=b(RS-SR)=2bRS.
$$

$R,S$ は可逆なので $RS$ も可逆、$2bRS=0$ から $b=0$。逆に $aI_2$ は $R,S$ の両方と可換で、生成される $D_4$ の全元とも可換である。
<!-- proof-end -->

**壊れる例**。$W=R$ は90度回転には等変だが、鏡映 $S$ に対して $RS=-SR$ なので不等変である。入力 $x=(1,0)^T$ では

$$
W(Sx)=(0,1)^T,\qquad S(Wx)=(0,-1)^T.
$$

失った仮定は「回転だけでなく鏡映にも等変であること」であり、証明の生成元条件 $WS=SW$ が壊れている。

## 6. 四頂点の値を表現型ごとに分解する

正方形の各頂点にスカラー値 $x=(x_0,x_1,x_2,x_3)^T\in\mathbb R^4$ を置く。[群作用の定義](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)に従い、回転 $r$ は頂点 $j$ を $j+1\pmod4$ へ送る。各値も頂点と一緒に移すので、回転後の第 $j+1$ 成分は回転前の第 $j$ 成分になる。

標準基底 $e_j$（第 $j$ 成分だけ1）を使い、この4次元の置換作用を次で表す。

$$
Pe_j=e_{j+1\pmod4}\qquad(j=0,1,2,3).
$$

本節の $P$ は第3節の2次元入れ替え行列とは異なり、4次元の回転作用を表す。

全頂点で一定の模様、隣接頂点で符号が反転する模様、互いに90度ずれた二つの差分模様を基底候補にする。回転によって各模様がどう動くかを調べる。

<a id="thm-mfl24-c4-decomposition"></a>

<!-- formal-statement-start -->
> **定理（C4の四頂点置換表現の実直和分解）**
> $e_0,e_1,e_2,e_3$ を $\mathbb R^4$ の標準基底とし、$P:\mathbb R^4\to\mathbb R^4$ を $Pe_j=e_{j+1\pmod4}$ で定める。次の4本のベクトルを考える。

$$
u_0=(1,1,1,1)^T,\quad
u_2=(1,-1,1,-1)^T,\quad
u_c=(1,0,-1,0)^T,\quad
u_s=(0,1,0,-1)^T.
$$

> これらは $\mathbb R^4$ の基底をなし、この順の基底では

$$
[P]_{(u_0,u_2,u_c,u_s)}
=\begin{pmatrix}
1&0&0&0\\0&-1&0&0\\0&0&0&-1\\0&0&1&0
\end{pmatrix}
=1\oplus(-1)\oplus R.
$$

> したがってこの4次元表現は自明1次元型、符号1次元型、実2次元回転型の直和である。
<!-- formal-statement-end -->

**証明の見取り図**。各ベクトルを実際に1頂点移動し、基底の独立性を内積で示してから作用の行列を作る。

<!-- proof-start -->
### 証明

定義から $P(x_0,x_1,x_2,x_3)^T=(x_3,x_0,x_1,x_2)^T$ である。従って

$$
Pu_0=u_0,\qquad Pu_2=-u_2,\qquad
Pu_c=u_s,\qquad Pu_s=-u_c.
$$

標準内積で異なるベクトルの内積は0である。例えば $u_0\cdot u_2=1-1+1-1=0$、$u_c\cdot u_s=0$ であり、他の組も成分を掛けて足せば0。各ノルム二乗は順に $4,4,2,2$ と正なので4本は互いに直交する非零ベクトルであり、$\mathbb R^4$ の基底をなす。

この基底での行列表現は、列ごとに $Pu_0,Pu_2,Pu_c,Pu_s$ の係数を書いたものである。表示した4式から第1列 $(1,0,0,0)^T$、第2列 $(0,-1,0,0)^T$、第3列 $(0,0,0,1)^T$、第4列 $(0,0,-1,0)^T$ を得る。従って表示したブロック対角行列となり、直和分解が成立する。
<!-- proof-end -->

これは一般の有限群表現の分解定理を無証明で使ったのではなく、**一つの4次元表現を具体的な基底で分解した結果**である。任意の頂点値は

$$
x=\alpha u_0+\beta u_2+\gamma u_c+\delta u_s,
$$

ただし直交性から

$$
\alpha=\frac{x_0+x_1+x_2+x_3}{4},\qquad
\beta=\frac{x_0-x_1+x_2-x_3}{4},
$$

$$
\gamma=\frac{x_0-x_2}{2},\qquad
\delta=\frac{x_1-x_3}{2}.
$$

と一意に書ける。回転によって $\alpha$ は不変、$\beta$ は符号を変え、$(\gamma,\delta)$ は行列 $R$ で回る。入力を最初から4個の無関係なスカラーとして扱うと、この変換則を見落とす。

## 7. バイアス項と鏡映での特徴型

線形層へ定数ベクトル $b$ を足した $F(x)=Wx+b$ を考える。定数項も任意に選べるわけではない。

<a id="prop-mfl24-affine-equivariance"></a>

<!-- formal-statement-start -->
> **命題（アフィン等変写像の条件）**
> 有限群 $G$ の実有限次元表現 $\rho_{\mathrm{in}}:G\to\operatorname{GL}_m(\mathbb R)$ と $\rho_{\mathrm{out}}:G\to\operatorname{GL}_n(\mathbb R)$、$W\in\mathbb R^{n\times m}$、$b\in\mathbb R^n$ に対し、$F:\mathbb R^m\to\mathbb R^n$、$F(x)=Wx+b$ が全 $g\in G,x\in\mathbb R^m$ で等変であるための必要十分条件は

$$
W\rho_{\mathrm{in}}(g)=\rho_{\mathrm{out}}(g)W,
\qquad \rho_{\mathrm{out}}(g)b=b
$$

> が全 $g\in G$ で成立することである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

等変性の式は $W\rho_{\mathrm{in}}(g)x+b=\rho_{\mathrm{out}}(g)Wx+\rho_{\mathrm{out}}(g)b$。$x=0$ を代入すると $b=\rho_{\mathrm{out}}(g)b$。これを元の式へ戻して両辺から $b$ を引くと、全 $x$ について

$$
(W\rho_{\mathrm{in}}(g)-\rho_{\mathrm{out}}(g)W)x=0.
$$

[線形等変性と行列条件の同値性](#thm-mfl24-linear-equivariance)の逆向きにより、$W$ は絡作用素である。逆に二条件が成り立てば、$F(\rho_{\mathrm{in}}(g)x)=W\rho_{\mathrm{in}}(g)x+b=\rho_{\mathrm{out}}(g)(Wx+b)$ となる。
<!-- proof-end -->

例えば平面回転型の出力では $Rb=b$ から $(-b_2,b_1)^T=(b_1,b_2)^T$、よって $b_1=-b_2$ かつ $b_2=b_1$、従って $b=0$ である。一方、自明1次元型へのバイアスは任意の実数を取れる。

### 7.1 スカラー・符号付きスカラー・ベクトル

$D_4$ の平面への作用を、行列 $Q=\rho(g)$（$R$ と $S$ の積）で表す。次の三つの特徴は同じ群に対して異なる型を持つ。

- **通常のスカラー**：値 $t$ を変えずに $t\mapsto t$ とする。
- **符号付きスカラー**：値 $a$ を $a\mapsto\det(Q)a$ とする。
- **平面ベクトル**：列ベクトル $v$ を $v\mapsto Qv$ とする。

$\det$ は [LA3B の行列式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant)である。生成元の行列を直接計算すると

$$
\det R=0\cdot0-(-1)\cdot1=1,\qquad
\det S=1\cdot(-1)-0\cdot0=-1.
$$

任意の $Q$ は生成元の積なので、[LA3C の行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)から $\det(Q)\in\{1,-1\}$。従って符号付きスカラーの変換も可逆である。また二つの群元の行列 $Q_1,Q_2$ に対し

$$
\det(Q_1Q_2)=\det(Q_1)\det(Q_2)
$$

なので積の条件も成立する。通常のスカラー、符号付きスカラー、平面ベクトルはいずれも表現である。

符号付きスカラーの自然な例は二つのベクトルが張る**向き付き面積** $A(v,w)=v_1w_2-v_2w_1$。列を並べた行列 $[v\ w]$ の行列式である。行列積は列ごとに作用するから $Q[v\ w]=[Qv\ Qw]$ となり、[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)をこの積へ適用して

<a id="eq-mfl24-oriented-area"></a>

$$
A(Qv,Qw)=\det(Q[v\ w])=\det(Q)A(v,w).
$$

$Q=R$ なら $\det R=1$、$Q=S$ なら $\det S=-1$。つまり回転では面積の符号が保たれ、鏡映では反転する。これは単なる実数（自明型）とは異なる。たとえば $A((1,0)^T,(0,1)^T)=1$ だが、$S$ を両方へ掛けると $A((1,0)^T,(0,-1)^T)=-1$。

**失敗例**。鏡映で符号反転する面積 $a$ を「普通のスカラー」出力へ $F(a)=ca$ として送ると、入力変換後は $F(-a)=-ca$、出力変換後は $F(a)=ca$。全 $a$ で一致するには $c=0$ が必要である。型を無視した非零の係数は、鏡映への等変性と両立しない。

## 8. 演習――表現を確かめ、許される係数を自分で解く

<a id="ex-mfl24-a01"></a>

### MFL24-A01 表現の公理

- Level: A
- 問題: $C_2=\{e,s\}$ について $\rho(e)=I_2$、$\rho(s)=\operatorname{diag}(1,-1)$ が表現であることを、公理と可逆性から確認せよ。また $\rho(s)=\operatorname{diag}(1,0)$ ではなぜ失敗するか。

<a id="ex-mfl24-a02"></a>

### MFL24-A02 絡作用素の判定

- Level: A
- 問題: $C_2$ の入力と出力がともに $\rho(s)=\operatorname{diag}(1,-1)$ に従うとき、$W=\begin{pmatrix}2&0\\0&-3\end{pmatrix}$ と $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ のどちらが絡作用素か、行列の積を両順序で計算して答えよ。

<a id="ex-mfl24-a03"></a>

### MFL24-A03 直和型

- Level: A
- 問題: $C_2$ の自明型と符号型の直和で $(x_+,x_-)=(4,-2)$ を $s$ で変換せよ。また $s^2$ の作用を計算せよ。

<a id="ex-mfl24-a04"></a>

### MFL24-A04 四頂点の型

- Level: A
- 問題: $x=(3,1,1,-1)^T$ を第6節の $u_0,u_2,u_c,u_s$ で展開し、$P x$ の座標を分解規則から求めよ。

<a id="ex-mfl24-b01"></a>

### MFL24-B01 異なる入出力型

- Level: B
- 問題: $C_2$ の入力を $\operatorname{diag}(1,-1,-1)$、出力を $\operatorname{diag}(-1,1)$ とし、全ての絡作用素 $W:\mathbb R^3\to\mathbb R^2$ を求めよ。さらに $W$ の自由な係数数を答えよ。

<a id="ex-mfl24-b02"></a>

### MFL24-B02 回転と鏡映の差

- Level: B
- 問題: $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$S=\operatorname{diag}(1,-1)$ に対し、$W=I_2+R$ が $C_4$-等変だが $D_4$-等変ではないことを行列積で示せ。$x=(1,0)^T$ でも等変性の破れを確認せよ。

<a id="ex-mfl24-b03"></a>

### MFL24-B03 アフィン項

- Level: B
- 問題: $C_2$ の入力・出力が共に $\operatorname{diag}(1,-1)$ で変換する。等変なアフィン写像 $F:\mathbb R^2\to\mathbb R^2$ の $W,b$ の一般形を求め、非零のバイアスが許される成分を説明せよ。

<a id="ex-mfl24-b04"></a>

### MFL24-B04 符号付き面積

- Level: B
- 問題: $v=(2,1)^T,w=(1,3)^T$ に対する $A(v,w)$ を求め、$S=\operatorname{diag}(1,-1)$ で両ベクトルを鏡映した場合と、$R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ で回転した場合の面積を直接計算して変換則と照合せよ。

<a id="ex-mfl24-c01"></a>

### MFL24-C01 四頂点から回転型への線形写像

- Level: C
- 問題: $C_4$ が $\mathbb R^4$ に $Pe_j=e_{j+1\pmod4}$、$\mathbb R^2$ に $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ で作用する。全ての線形等変写像 $W:\mathbb R^4\to\mathbb R^2$ を求めよ。第6節の基底を使って、$u_0,u_2$ が出力へ送れないこと、$u_c,u_s$ の像の制約を導き、標準座標 $x_j$ による出力式を与えよ。自由度が2であることを確認せよ。

## 9. 演習の詳細解答

### Level A の解答

**MFL24-A01 解答**。$C_2$ の生成元 $s$ と単位元 $e$ に対して

$$
\rho(s)^2=\operatorname{diag}(1,1)=I_2=\rho(e),
\qquad \rho(e)\rho(s)=\rho(s)\rho(e)=\rho(s).
$$

これで全ての積を確認した。$\rho(s)^{-1}=\rho(s)$ なので可逆性も満たす。一方、候補 $T=\operatorname{diag}(1,0)$ は

$$
\det T=0,\qquad T^2=T\ne I_2=\rho(e)
$$

だから逆がなく、生成元の関係 $s^2=e$ にも反する。

**MFL24-A02 解答**。$D=\operatorname{diag}(1,-1)$ とすると

$$
WD=DW=\begin{pmatrix}2&0\\0&3\end{pmatrix},
$$

一方で

$$
PD=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
DP=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

よって[絡作用素の定義](#def-mfl24-intertwiner)を満たすのは $W$ だけである。$e$ についてはどの行列も交換条件を満たすが、$s$ の検査が不可欠である。

**MFL24-A03 解答**。直和表現は $D=\operatorname{diag}(1,-1)$ なので

$$
D(4,-2)^T=(4,2)^T,\qquad
D^2(4,-2)^T=(4,-2)^T.
$$

第1成分は不変、第2成分は1回で符号を変え、2回で元へ戻る。これは $s^2=e$ と一致する。

**MFL24-A04 解答**。[第6節の係数式](#thm-mfl24-c4-decomposition)に $x_0=3,x_1=1,x_2=1,x_3=-1$ を入れると

$$
\alpha=(3+1+1-1)/4=1,\quad
\beta=(3-1+1+1)/4=1,
$$

$$
\gamma=(3-1)/2=1,\quad
\delta=(1-(-1))/2=1.
$$

従って $x=u_0+u_2+u_c+u_s$。$Pu_0=u_0$、$Pu_2=-u_2$、$Pu_c=u_s$、$Pu_s=-u_c$ から

$$
Px=u_0-u_2-u_c+u_s=(-1,3,1,1)^T.
$$

直接の並べ替え $(x_3,x_0,x_1,x_2)^T$ とも一致する。

### Level B の解答

**MFL24-B01 解答**。[符号型の選択則](#prop-mfl24-sign-selection)を、入力符号 $(1,-1,-1)$、出力符号 $(-1,1)$ に適用する。第1出力は第2・第3入力とだけ同符号なので $w_{11}=0$。第2出力は第1入力とだけ同符号なので $w_{22}=w_{23}=0$。従って

$$
W=\begin{pmatrix}0&a&b\\c&0&0\end{pmatrix}
\quad(a,b,c\in\mathbb R).
$$

確認のため両順序を掛けると

$$
W\operatorname{diag}(1,-1,-1)
=\begin{pmatrix}0&-a&-b\\c&0&0\end{pmatrix}
=\operatorname{diag}(-1,1)W.
$$

自由な実係数は $a,b,c$ の3個である。

**MFL24-B02 解答**。$W=I+R$ は $R$ と可換なので $C_4$ の全回転に等変である。一方、$R S=-S R$ より

$$
WS-SW=(I+R)S-S(I+R)=RS-SR=2RS\ne0.
$$

$x=e_1$ なら $Sx=e_1$ なので $W(Sx)=We_1=(1,1)^T$。しかし $S(Wx)=S(1,1)^T=(1,-1)^T$。従って鏡映に等変ではなく、$s$ に対する交換条件が失敗した。

**MFL24-B03 解答**。$D=\operatorname{diag}(1,-1)$ とおく。[符号型の選択則](#prop-mfl24-sign-selection)により $WD=DW$ の一般解は $W=\operatorname{diag}(a,d)$。さらに[アフィン等変性の条件](#prop-mfl24-affine-equivariance)は $Db=b$ だから、$b=(b_1,b_2)^T$ に対して

$$
(b_1,-b_2)^T=(b_1,b_2)^T\iff b_2=0.
$$

従って $F(x_1,x_2)=(ax_1+b_1,dx_2)^T$ が一般形。変換しない第1成分にだけ定数を足せる。

**MFL24-B04 解答**。元の面積は

$$
A(v,w)=2\cdot3-1\cdot1=5.
$$

$Sv=(2,-1)^T$、$Sw=(1,-3)^T$ なので

$$
A(Sv,Sw)=2(-3)-(-1)(1)=-5=(\det S)5.
$$

$Rv=(-1,2)^T$、$Rw=(-3,1)^T$ なので

$$
A(Rv,Rw)=(-1)\cdot1-2(-3)=5=(\det R)5.
$$

どちらも $\det(R)=1$、$\det(S)=-1$ による[向き付き面積の変換則](#eq-mfl24-oriented-area)と一致する。特定のベクトルで符号だけを見たのではなく、二つの積を実際に計算した。

### Level C の解答

**MFL24-C01 解答**。入力の[実直和分解](#thm-mfl24-c4-decomposition)の基底で $W$ を調べる。等変性 $WP=RW$ を各基底ベクトルに適用する。

$Pu_0=u_0$ なので $Wu_0=RWu_0$。$Wu_0=(a,b)^T$ と書けば $(a,b)=(-b,a)$、すなわち $a=-b$、$b=a$ から $a=b=0$。次に $Pu_2=-u_2$ なので $-Wu_2=RWu_2$。$Wu_2=(c,d)^T$ と置くと $(-c,-d)=(-d,c)$、つまり $c=d$、$d=-c$ なので $c=d=0$。従って両1次元型からの寄与は消える。

$Wu_c=z=(p,q)^T$ を任意に選ぶと、$Pu_c=u_s$ から $Wu_s=RWu_c=Rz=(-q,p)^T$ と決まる。残る $Pu_s=-u_c$ の条件は

$$
W(Pu_s)=-Wu_c=-z,\qquad
R(Wu_s)=R^2z=-z
$$

で自動的に満たされる。よって $p,q$ の2個が自由である。任意の $x=\alpha u_0+\beta u_2+\gamma u_c+\delta u_s$ に対して

$$
Wx=\gamma z+\delta Rz
=\begin{pmatrix}p&-q\\q&p\end{pmatrix}
\begin{pmatrix}(x_0-x_2)/2\\(x_1-x_3)/2\end{pmatrix}.
$$

したがって標準座標での全行列は

$$
W=\frac12\begin{pmatrix}p&-q&-p&q\\q&p&-q&-p\end{pmatrix}.
$$

実際に第1列を右に1列ずつ循環させる入力作用 $P$ を掛けると、各列は $R$ 倍された列に一致し、$WP=RW$ を満たす。ここでは不変な $u_0$ を出力の回転ベクトルへ送れず、符号型 $u_2$ も送れない一方、回転型 $(u_c,u_s)$ の2自由度だけが残ることが本質である。

## 10. まとめと次章への入口

群表現は「変換が特徴へどう作用するか」を定め、絡作用素は「型を守って線形に混ぜられるか」を判定する。$C_2$ では符号型の選択則、$C_4$ では $aI+bR$、鏡映を加えた $D_4$ では $aI$ という違いが現れた。四頂点の値も、自明型・符号型・回転型へ具体的に分解できた。

これだけでは任意の線形写像を等変に**変換する方法**や、非線形活性化を含む層の構成はまだない。MFL25 では有限群平均、層の合成、非線形性を扱い、ここで導いた交換条件を設計原理として使う。
