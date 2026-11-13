# AQFT19 反線形極分解とモジュラー対象

[AQFT18のTomita閉包の対合性](../AQFT18/index.md#prop-aqft18-closure-involution)により、標準対 $(\mathcal M,\Omega)$ から閉じた反線形作用素 $S$ を得ました。しかし $S(A\Omega)=A^*\Omega$ という規則は、長さを保存するとは限りません。大きさの変化と、向き・複素共役を伴う変化を分離したいところです。

本講では前者を**正作用素 $\Delta^{1/2}$**、後者を**内積を共役して保存する反線形写像 $J$** として取り出します。特に、$S$ が閉じた対合であることから

$$
S=J\Delta^{1/2},\qquad J^2=I,\qquad
J\Delta J=\Delta^{-1}
$$

を、**各式の定義域も含めて**証明します。内積は一貫して第2変数線形です。使用する解析の既習結果は、[QM6の非有界自己共役作用素のスペクトル定理](../../QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)と[QM6のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)です。一般の $J\mathcal M J=\mathcal M'$ や $\Delta^{it}\mathcal M\Delta^{-it}=\mathcal M$ は**まだ主張しません**。

## 1. 出発点：$S$ の何が分かっているか

$\mathcal H$ を複素Hilbert空間、$\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega$ を単位ベクトルとし、[標準対の定義](../AQFT18/index.md#def-aqft18-standard-pair)どおり $\Omega$ は $\mathcal M$ に対して巡回・分離的とします。次の作用素を考えます。

$$
S_0(A\Omega)=A^*\Omega
\quad(A\in\mathcal M),\qquad
S=\overline{S_0}.
$$

[Tomita初期作用素の可閉性](../AQFT18/index.md#thm-aqft18-tomita-closable)から $S$ は稠密定義・閉・反線形です。さらに[対合性命題](../AQFT18/index.md#prop-aqft18-closure-involution)から

$$
S\operatorname{Dom}(S)=\operatorname{Dom}(S),\qquad
S^2x=x\quad(x\in\operatorname{Dom}(S)).
$$

従って $\ker S=\{0\}$、$\operatorname{Ran}S=\operatorname{Dom}S$ は稠密です。ただし一般に $\operatorname{Dom}S\ne\mathcal H$ で、$S$ や後の $\Delta$ を有界作用素のように掛け算してはいけません。

## 2. 長さを保存する反線形作用素

反線形性そのものは長さを保存しません。例えば $\mathbb C$ の $z\mapsto 2\overline z$ は反線形ですが長さは2倍です。**反ユニタリ**とは、反線形で全空間に定義され、内積を複素共役にしながら保存する全射です。

<a id="def-aqft19-antiunitary"></a>

<!-- formal-statement-start -->
> **定義（反ユニタリ作用素）**  
> 複素Hilbert空間 $\mathcal H$ の写像 $J:\mathcal H\to\mathcal H$ が反ユニタリであるとは、$J$ が全域定義の反線形全射で、任意の $x,y\in\mathcal H$ に対して
$$
\langle Jx,Jy\rangle=\overline{\langle x,y\rangle}
$$
> を満たすことをいう。特に $\|Jx\|=\|x\|$、$J^{-1}=J^\sharp$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft19-antiunitary -->
### 直接例：成分を交換する共役

$\mathcal H=\mathbb C^2$ とし $J(z_1,z_2)=(\overline z_2,\overline z_1)$ とします。$\alpha,\beta\in\mathbb C$ に対して $J(\alpha x+\beta y)=\overline\alpha Jx+\overline\beta Jy$ なので反線形です。また

$$
\langle Jx,Jy\rangle
=x_2\overline{y_2}+x_1\overline{y_1}
=\overline{\overline{x_1}y_1+\overline{x_2}y_2}
=\overline{\langle x,y\rangle}.
$$

$J^2x=x$ だから全射で逆写像を持ち、反ユニタリの**反線形性・内積条件・全射性**をそれぞれ確認できました。一般の反ユニタリでは必ずしも $J^2=I$ とは限りません。この追加性質を Tomita 作用素の対合性から導くのが本講の山場です。
<!-- definition-example-end -->

## 3. 閉反線形作用素を正作用素へ結び付ける

反線形作用素の[随伴の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)は

$$
\langle Tx,y\rangle=\langle T^\sharp y,x\rangle
$$

を満たす最大の $y$ を定義域に取ります。$T^\sharp T$ は線形ですが、$T$ が非有界なら積の定義域は自動的には全空間になりません。

反線形を線形作用素の定理へ移すには、スカラー倍で複素共役を付け直したHilbert空間を用意します。元のベクトルと一対一に対応しますが、複素数の掛け方を変えた空間です。内積も同時に調整するので、ノルムと完備性は変わりません。

<a id="def-aqft19-conjugate-hilbert"></a>

<!-- formal-statement-start -->
> **定義（共役Hilbert空間）**  
> 複素Hilbert空間 $\mathcal H$ に対し、元 $y\in\mathcal H$ を $\overline y$ と記す別の集合 $\overline{\mathcal H}$ を用意する。この集合の加法とスカラー倍、および内積を
$$
\overline y+\overline z=\overline{y+z},\qquad
\alpha\,\overline y=\overline{\overline\alpha\,y},\qquad
\langle\overline y,\overline z\rangle_{\overline{\mathcal H}}
=\langle z,y\rangle_{\mathcal H}
$$
> と定める。これを $\mathcal H$ の**共役Hilbert空間**と呼ぶ。対応 $y\mapsto\overline y$ は等長な反線形全単射である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft19-conjugate-hilbert -->
### 直接例：一次元で係数の共役を確認する

$\mathcal H=\mathbb C$ で $\langle z,w\rangle=\overline z w$ とします。$\alpha\in\mathbb C$ と $z\in\mathbb C$ について $\alpha\,\overline z=\overline{\overline\alpha z}$ なので、元の空間からの対応 $c(z)=\overline z$（右辺は共役空間の**元を表す記号**）は $c(\alpha z)=\overline\alpha\,c(z)$ を満たす反線形写像です。内積について

$$
\langle\overline z,\overline w\rangle_{\overline{\mathcal H}}
=\langle w,z\rangle_{\mathcal H}
=\overline w z,\qquad
\|\overline z\|_{\overline{\mathcal H}}=|z|
$$

となります。係数・内積・ノルムの三条件を確認できました。完備性は、共役空間のCauchy列が元の空間のCauchy列と同じノルム条件を持つことから従います。
<!-- definition-example-end -->

$T$ が反線形なら、$\widetilde T x=\overline{Tx}$ は $\mathcal H$ から $\overline{\mathcal H}$ への**線形**作用素です。実際、

$$
\widetilde T(\alpha x)
=\overline{T(\alpha x)}
=\overline{\overline\alpha Tx}
=\alpha\,\overline{Tx}.
$$

$\|Tx\|=\|\widetilde Tx\|$ でグラフの閉性も変わらず、[反線形随伴の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)の内積式から $\widetilde T^*\widetilde T=T^\sharp T$ が従います。後者の等式には**両辺の定義域の一致**も含まれています。

<a id="lem-aqft19-positive-square"></a>

<!-- formal-statement-start -->
> **補題（閉反線形作用素の正二乗）**  
> $T:\operatorname{Dom}T\subset\mathcal H\to\mathcal H$ を稠密定義・閉・反線形とする。
$$
P=T^\sharp T,\qquad
\operatorname{Dom}P=
\{x\in\operatorname{Dom}T:Tx\in\operatorname{Dom}T^\sharp\}
$$
> と置くと、$P$ は稠密定義・非負自己共役作用素であり、
$$
\operatorname{Dom}P^{1/2}=\operatorname{Dom}T,\qquad
\|P^{1/2}x\|=\|Tx\|
\quad(x\in\operatorname{Dom}T)
$$
> が成り立つ。さらに $\ker P^{1/2}=\ker T$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一般の非有界積 $T^\sharp T$ を形式的に「正」と呼ぶだけでは足りません。共役Hilbert空間を通して閉線形作用素 $A=\widetilde T$ とし、**グラフをHilbert空間にする**ことで $I+A^*A$ の全射性を示します。これにより自己共役性を確立してからスペクトル平方根を取ります。

<!-- proof-start -->
### 証明

$A=\widetilde T:\mathcal H\to\overline{\mathcal H}$ と置きます。$A$ のグラフは閉じているので、$\operatorname{Dom}A$ に

$$
\langle x,z\rangle_A
=\langle x,z\rangle_{\mathcal H}
+\langle Ax,Az\rangle_{\overline{\mathcal H}}
$$

を入れた空間は完備です。実際、このノルムでのCauchy列 $(x_n)$ は $x_n\to x$、$Ax_n\to y$ を満たし、閉性から $x\in\operatorname{Dom}A$、$Ax=y$ です。

任意の $y\in\mathcal H$ に対し $z\mapsto\langle y,z\rangle_{\mathcal H}$ はグラフノルムについて有界な線形汎関数です。Rieszの表現により、ある $x\in\operatorname{Dom}A$ が存在して、すべての $z\in\operatorname{Dom}A$ に対し

$$
\langle x,z\rangle+\langle Ax,Az\rangle
=\langle y,z\rangle
$$

となります。移項すると $\langle Ax,Az\rangle=\langle y-x,z\rangle$。したがって線形随伴の定義より $Ax\in\operatorname{Dom}A^*$、$A^*Ax=y-x$ です。つまり

$$
(I+A^*A)x=y,\qquad
\operatorname{Ran}(I+A^*A)=\mathcal H.
$$

$B=A^*A$ と書けば、$x,z\in\operatorname{Dom}B$ について

$$
\langle x,Bz\rangle=\langle Ax,Az\rangle
=\langle Bx,z\rangle,\qquad
\langle x,Bx\rangle=\|Ax\|^2\ge0.
$$

$B$ は非負対称作用素です。$I+B$ は単射です。というのも $(I+B)x=0$ なら内積を $x$ と取って $\|x\|^2+\|Ax\|^2=0$ となるからです。全射性と合わせて $R=(I+B)^{-1}$ は全域定義で $\|R\|\le1$ です。$B$ の対称性から $R$ も自己共役です。$R$ は単射なので $\overline{\operatorname{Ran}R}=\mathcal H$、従って $\operatorname{Dom}B=\operatorname{Ran}R$ は稠密です。

自己共役性を定義域でも確かめます。$v\in\operatorname{Dom}B^*$ とし、$y=v+B^*v$ に対して $(I+B)x=y$ を解きます。すると $(I+B^*)(v-x)=0$ です。$\operatorname{Ran}(I+B)=\mathcal H$ なので

$$
\ker(I+B^*)
=\operatorname{Ran}(I+B)^\perp=\{0\}.
$$

ゆえに $v=x\in\operatorname{Dom}B$。$B=B^*$ が従いました。

残る平方根の定義域を証明します。$x\in\operatorname{Dom}B$ なら[スペクトル関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)で

$$
\|B^{1/2}x\|^2
=\langle x,Bx\rangle=\|Ax\|^2.
$$

この一致を全 $\operatorname{Dom}A$ に延ばします。$\operatorname{Dom}B$ が $\operatorname{Dom}A$ に**グラフノルムで稠密**であることを確かめるため、$w\in\operatorname{Dom}A$ がすべての $z\in\operatorname{Dom}B$ に対し $\langle w,z\rangle_A=0$ と仮定します。$Az\in\operatorname{Dom}A^*$ なので

$$
0=\langle w,z\rangle+\langle Aw,Az\rangle
=\langle w,(I+B)z\rangle.
$$

$I+B$ の全射性から $w=0$ です。ゆえにグラフ直交補空間が零で、稠密性が従います。

一方、非負自己共役 $B$ の[スペクトル定理](../../QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)で射影 $E_B([0,n])$ を使えば、$u\in\operatorname{Dom}B^{1/2}$ に対し $u_n=E_B([0,n])u$ は $\operatorname{Dom}B$ に属し、

$$
\|u-u_n\|^2+\|B^{1/2}(u-u_n)\|^2
=\int_{(n,\infty)}(1+\lambda)\,d\mu_u(\lambda)
\longrightarrow0
$$

です。従って $\operatorname{Dom}B$ は $\operatorname{Dom}B^{1/2}$ にもグラフノルムで稠密です。先ほどのノルム一致によって、両方のグラフ完備化は同じになり、

$$
\operatorname{Dom}A=\operatorname{Dom}B^{1/2},
\qquad \|Ax\|=\|B^{1/2}x\|
$$

です。$A=\widetilde T$ と $\|Ax\|=\|Tx\|$ を戻し、$P=B=T^\sharp T$ を得ます。ノルムが零となるベクトルは両者で一致するので $\ker P^{1/2}=\ker T$ です。$\square$
<!-- proof-end -->

## 4. 正の部分と極分解

非負自己共役作用素は、[QM6のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)によって、非負の平方根を一意に持ちます。$S$ の「大きさ」を $\Delta^{1/2}$ とし、その平方を $\Delta$ と呼びます。$\Delta$ はモジュラー作用素です。**$S$ 自身は反線形ですが、$\Delta$ は線形**です。

<a id="def-aqft19-modular-operator"></a>

<!-- formal-statement-start -->
> **定義（正部分とモジュラー作用素）**  
> 標準対 $(\mathcal M,\Omega)$ の[AQFT18で構成した閉Tomita作用素](../AQFT18/index.md#thm-aqft18-tomita-closable) $S$ に対し
$$
\Delta=S^\sharp S,\qquad |S|=\Delta^{1/2}
$$
> と定める。$\Delta$ を**モジュラー作用素**、$|S|$ を $S$ の**正部分**と呼ぶ。定義域は
$$
\operatorname{Dom}\Delta
=\{x\in\operatorname{Dom}S:Sx\in\operatorname{Dom}S^\sharp\},
\qquad
\operatorname{Dom}\Delta^{1/2}=\operatorname{Dom}S.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft19-modular-operator -->
### 直接例：二点の対角環

[AQFT18の二点標準対](../AQFT18/index.md#def-aqft18-standard-pair)で $\mathcal H=\mathbb C^2$、$\mathcal M$ を対角行列全体、$\Omega=(\sqrt p,\sqrt{1-p})$、$0<p<1$ とします。任意の $(u,v)$ が $A\Omega$ と書けるため、$S(u,v)=(\overline u,\overline v)$ です。内積計算から $S^\sharp=S$ なので

$$
\Delta=S^\sharp S=I,\qquad
\Delta^{1/2}=I,\qquad
\operatorname{Dom}\Delta=\operatorname{Dom}S=\mathbb C^2.
$$

**定義の確認**：$I$ は自己共役・非負で正平方根も $I$ です。合成 $S^\sharp S$ の定義域は全空間で、上式は作用素の値だけでなく定義域も一致します。可換な標準対では長さの変更はありません。
<!-- definition-example-end -->

閉じた $S$ に対し、形式的に $J=S\Delta^{-1/2}$ と書くと、逆作用素の定義域を無視する危険があります。代わりに $\Delta^{1/2}$ の**値域上**で $J$ を定め、等長性から全空間へ延長します。

<a id="thm-aqft19-polar"></a>

<!-- formal-statement-start -->
> **定理（閉反線形作用素の極分解：単射・稠密値域の場合）**  
> $T$ を複素Hilbert空間 $\mathcal H$ 上の稠密定義・閉・反線形作用素とし、$\ker T=\{0\}$、$\overline{\operatorname{Ran}T}=\mathcal H$ を仮定する。$P=T^\sharp T$ とすると、ただ一つの反ユニタリ作用素 $U$ が存在して
$$
T=UP^{1/2},\qquad
\operatorname{Dom}T=\operatorname{Dom}P^{1/2}
$$
> が成立する。等式は定義域と各点での作用の両方を表す。さらに
$$
U(P^{1/2}x)=Tx
\quad(x\in\operatorname{Dom}T)
$$
> で $U$ が決まり、$P$ と $P^{1/2}$ は核が零で、それぞれの値域が稠密である。
<!-- formal-statement-end -->

### 証明の見取り図

$\ker P^{1/2}=\ker T=0$ なので $P^{1/2}x$ は $x$ を一意に指定します。また、[正二乗の補題](#lem-aqft19-positive-square)のノルム恒等式が等長性を保証します。稠密値域の仮定は、延長後の等長写像を**全射**にする箇所で使います。

<!-- proof-start -->
### 証明

[正二乗の補題](#lem-aqft19-positive-square)により $P\ge0$ は自己共役、$\operatorname{Dom}P^{1/2}=\operatorname{Dom}T$、$\|P^{1/2}x\|=\|Tx\|$ です。$\ker P^{1/2}=\ker T=\{0\}$ なので

$$
U_0(P^{1/2}x)=Tx
\qquad(x\in\operatorname{Dom}T)
$$

は値の選び方に依存しません。$P^{1/2}$ が線形、$T$ が反線形なので $U_0$ は反線形であり、

$$
\|U_0(P^{1/2}x)\|=\|Tx\|=\|P^{1/2}x\|.
$$

反線形の偏極計算によって、二つの入力についても内積を共役して保ちます。ここで $P^{1/2}$ は自己共役なので

$$
\overline{\operatorname{Ran}P^{1/2}}
=(\ker P^{1/2})^\perp=\mathcal H.
$$

従って稠密な定義域上の等長写像 $U_0$ は、Cauchy列の極限を取って全空間の反線形等長写像 $U$ に一意に延長できます。$U$ の値域は等長性によって閉じ、$\operatorname{Ran}U$ は $\operatorname{Ran}T$ を含みます。仮定 $\overline{\operatorname{Ran}T}=\mathcal H$ から $\operatorname{Ran}U=\mathcal H$ です。よって $U$ は反ユニタリです。

一意性は $T=VP^{1/2}$ を満たす別の反ユニタリ $V$ が、稠密な $\operatorname{Ran}P^{1/2}$ 上で $V(P^{1/2}x)=Tx=U(P^{1/2}x)$ を満たすことから従います。最後に $\ker P=\ker P^{1/2}=0$ と、自己共役作用素の値域と核の直交補関係から $\overline{\operatorname{Ran}P}=\mathcal H$ です。$\square$
<!-- proof-end -->

特に Tomita 作用素 $S$ は第1節で単射・稠密値域だと確かめたので、この定理を適用できます。一般の閉反線形作用素に核や非稠密値域があれば、延長されるのは全空間の反ユニタリとは限らず、**核の直交補から値域の閉包への反線形等長写像**にとどまり、全空間の全射とは限りません。仮定を落として同じ結論を使ってはいけません。

<a id="def-aqft19-modular-conjugation"></a>

<!-- formal-statement-start -->
> **定義（モジュラー共役）**  
> 標準対 $(\mathcal M,\Omega)$ に対し、上の[極分解定理](#thm-aqft19-polar)をそのTomita閉包 $S$ に適用して得られる唯一の反ユニタリ作用素 $J$ を**モジュラー共役**と呼ぶ。
$$
S=J\Delta^{1/2},
\quad
J(\Delta^{1/2}x)=Sx
\quad(x\in\operatorname{Dom}S).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft19-modular-conjugation -->
### 直接例：対角標準対では普通の複素共役

上の二点の例では $\Delta^{1/2}=I$、$S=C$（座標共役）でした。極分解の規則に $x\in\mathbb C^2$ を代入すると $Jx=J(Ix)=Cx$ です。$C$ は反線形、内積を共役して保存し、$C^2=I$ により全射です。**反線形性・全射性・内積を共役して保存する性質**と $S=JI$ を確認しました。
<!-- definition-example-end -->

## 5. 対合性からモジュラー関係が生まれる

一般の閉反線形作用素では、極分解の $U$ が対合になる理由はありません。しかし Tomita の $S$ は $S^2=I$ を定義域上で満たします。これにより $S^{-1}=S$ が**作用素として**成立します。逆演算子の極分解を元のものと比較すれば $J$ と $\Delta$ の対称性が決まります。

<a id="thm-aqft19-modular-relations"></a>

<!-- formal-statement-start -->
> **定理（Tomita対合のモジュラー関係）**  
> $S$ を複素Hilbert空間上の稠密定義・閉・反線形作用素とし、
$$
S\operatorname{Dom}S=\operatorname{Dom}S,\qquad
S^2x=x\quad(x\in\operatorname{Dom}S)
$$
> を仮定する。$\Delta=S^\sharp S$、$S=J\Delta^{1/2}$ と置くと、$J$ は反ユニタリ対合で、
$$
J^2=I,\qquad
J\Delta J=\Delta^{-1},\qquad
J\Delta^{1/2}J=\Delta^{-1/2}
$$
> が成立する。ここで逆作用素はいずれもその**稠密な値域**上で定義し、等式は閉作用素の定義域も含めた等号である。
<!-- formal-statement-end -->

### 証明の見取り図

対合性によって $S$ は単射・稠密値域です。従って[極分解定理](#thm-aqft19-polar)が使えます。$B=\Delta^{1/2}$ と置いて $S^{-1}$ の極分解を作り、**反ユニタリ部分の一意性**と**正部分の一意性**をそれぞれ比較します。

<!-- proof-start -->
### 証明

[Sの対合性](../AQFT18/index.md#prop-aqft18-closure-involution)から、$S^{-1}$ の定義域は $\operatorname{Ran}S=\operatorname{Dom}S$ で、$S^{-1}=S$ です。また $\ker S=0$、$\overline{\operatorname{Ran}S}=\mathcal H$ なので[極分解定理](#thm-aqft19-polar)から

$$
S=JB,\qquad B=\Delta^{1/2},\qquad
\operatorname{Dom}B=\operatorname{Dom}S
$$

が得られ、$B$ は正自己共役・単射・稠密値域です。スペクトル定理から $B^{-1}$ は $\operatorname{Ran}B$ 上の正自己共役作用素です。したがって

$$
S^{-1}=B^{-1}J^{-1}
=J^{-1}\bigl(JB^{-1}J^{-1}\bigr)
$$

を得ます。この積の定義域は $\{y:J^{-1}y\in\operatorname{Ran}B\}=J\operatorname{Ran}B=\operatorname{Ran}S$ であり、逆作用素の定義域と一致します。

括弧内の $C=JB^{-1}J^{-1}$ は**線形**で、反ユニタリ共役により正自己共役です。確かめると、$x=Jz$（$z\in\operatorname{Dom}B^{-1}$）について

$$
\langle x,Cx\rangle
=\langle Jz,JB^{-1}z\rangle
=\overline{\langle z,B^{-1}z\rangle}
=\langle z,B^{-1}z\rangle\ge0.
$$

随伴の定義域も、反ユニタリで移した $\operatorname{Dom}B^{-1}$ に一致します。従って $S^{-1}=J^{-1}C$ は、**反ユニタリ $\times$ 正自己共役**という順序の極分解です。$S^{-1}=S$ なので、[極分解の一意性](#thm-aqft19-polar)を両者に適用すると

$$
J=J^{-1},\qquad B=JB^{-1}J^{-1}.
$$

第1式から $J^2=I$。第2式を $J$ で左右から共役すれば、$JBJ=B^{-1}$ が**定義域ごと**成立します。平方を取る際は関数計算の積の定義域を使い、

$$
J\Delta J=JB^2J=(JBJ)^2
=(B^{-1})^2=\Delta^{-1}.
$$

さらに $B=\Delta^{1/2}$ と戻すと $J\Delta^{1/2}J=\Delta^{-1/2}$ です。$\square$
<!-- proof-end -->

ここで重要なのは**逆作用素の領域**です。非有界 $\Delta$ の場合、$\Delta^{-1}$ も一般に非有界であり、

$$
\operatorname{Dom}\Delta^{-1}=\operatorname{Ran}\Delta,\qquad
\operatorname{Dom}\Delta^{-1/2}=\operatorname{Ran}\Delta^{1/2}
$$

と読む必要があります。$\Delta\Delta^{-1}=I$ は $\operatorname{Ran}\Delta$ 上での恒等式であり、全空間上の有界作用素等式ではありません。

## 6. 標準ベクトル自身は動かない

標準対の単位ベクトル $\Omega=I\Omega$ は、Tomita 初期作用素により $S\Omega=\Omega$ です。さらに[AQFT18の可換子側との随伴包含](../AQFT18/index.md#prop-aqft18-adjoint-pairing)から $F_0\Omega=\Omega$ と $F_0\subset S^\sharp$ なので $S^\sharp\Omega=\Omega$ も得られます。

<a id="prop-aqft19-vacuum-fixed"></a>

<!-- formal-statement-start -->
> **命題（標準ベクトルのモジュラー不変性）**  
> 標準対 $(\mathcal M,\Omega)$ のモジュラー作用素とモジュラー共役について
$$
\Omega\in\operatorname{Dom}\Delta,\qquad
\Delta\Omega=\Omega,\qquad J\Omega=\Omega
$$
> が成立する。また任意の $t\in\mathbb R$ について $\Delta^{it}\Omega=\Omega$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$S$ と $S^\sharp$ の両方で $\Omega$ が固定されることを、$\Delta=S^\sharp S$ について、$S\Omega$ がさらに $S^\sharp$ の定義域に入ることを確かめて代入します。$\Delta^{1/2}$ と $\Delta^{it}$ にはスペクトル関数計算を適用します。

<!-- proof-start -->
### 証明

$S\Omega=\Omega$、$\Omega\in\operatorname{Dom}S^\sharp$ なので、$\Omega\in\operatorname{Dom}\Delta$ かつ

$$
\Delta\Omega=S^\sharp(S\Omega)=S^\sharp\Omega=\Omega.
$$

従って $\Omega$ は $\Delta$ の固有値 $1$ に属するベクトルです。[QM6のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)より $\Delta^{1/2}\Omega=\Omega$ と $\Delta^{it}\Omega=1^{it}\Omega=\Omega$ です。最後に $S=J\Delta^{1/2}$ を $\Omega$ に適用して

$$
\Omega=S\Omega=J\Delta^{1/2}\Omega=J\Omega
$$

を得ます。$\square$
<!-- proof-end -->

$\Delta^{it}$ はスペクトル関数 $\lambda\mapsto\lambda^{it}$ から作る全域定義ユニタリ作用素です。$\ker\Delta=0$ なので $\lambda=0$ のスペクトル射影は零です。群法則 $\Delta^{it}\Delta^{is}=\Delta^{i(t+s)}$ は関数の積から従い、強連続性は有界関数の各点連続性とスペクトル測度に対する優収束から従います。**これはHilbert空間上で群法則を満たすユニタリ作用素族を作っただけ**で、$\mathcal M$ を保つことまでは証明していません。

## 7. 非可換な二次元模型で何が変わるか

可換な対角環の例では常に $\Delta=I$ でした。変化を可視化するには、$K=\mathbb C^2$ 上のHilbert–Schmidt空間 $\mathcal H=S_2(K)=M_2(\mathbb C)$ を用います。内積は $\langle X,Y\rangle=\operatorname{Tr}(X^*Y)$、$\mathcal M=\{L_A:X\mapsto AX\mid A\in M_2(\mathbb C)\}$ とします。

$\lambda_1,\lambda_2>0$、$\lambda_1+\lambda_2=1$ として

$$
\Omega=\operatorname{diag}(\sqrt{\lambda_1},\sqrt{\lambda_2}).
$$

$\Omega$ が可逆なので $A\Omega=0\Rightarrow A=0$、任意の $X$ は $X=(X\Omega^{-1})\Omega$ と書けるため、標準対です。ここで行列単位 $E_{ij}$ を入力とすると、$A\Omega=E_{ij}$ に必要な $A$ は $A=E_{ij}/\sqrt{\lambda_j}$ です。よって**初期作用素の定義そのもの**から

$$
S(E_{ij})
=A^*\Omega
=\frac{E_{ji}\Omega}{\sqrt{\lambda_j}}
=\sqrt{\frac{\lambda_i}{\lambda_j}}\,E_{ji}.
$$

$S$ は反線形なので係数 $c_{ij}$ は複素共役になります。行列単位が正規直交基底だから、反線形随伴もここから計算でき、

$$
S^\sharp(E_{ji})
=\sqrt{\frac{\lambda_i}{\lambda_j}}\,E_{ij},\qquad
\Delta(E_{ij})=(S^\sharp S)(E_{ij})
=\frac{\lambda_i}{\lambda_j}E_{ij}.
$$

従って $\Delta^{1/2}E_{ij}=\sqrt{\lambda_i/\lambda_j}E_{ij}$ で、$J(\Delta^{1/2}E_{ij})=S(E_{ij})$ より

$$
JE_{ij}=E_{ji},\qquad JX=X^*,\qquad
\Delta(E_{ij})=\frac{\lambda_i}{\lambda_j}E_{ij}.
$$

**モジュラー共役の定義の確認**：$X\mapsto X^*$ は反線形全射で、$\|X^*\|_2=\|X\|_2$、$\langle X^*,Y^*\rangle=\overline{\langle X,Y\rangle}$ を満たします。さらにすべての行列単位で $S=J\Delta^{1/2}$ を直接検算しました。$\Delta$ は正で自己共役、固有値は $\lambda_i/\lambda_j>0$、全作用素の定義域は有限次元なので全空間です。

例えば $(\lambda_1,\lambda_2)=(3/4,1/4)$ とすれば、

$$
\Delta(E_{12})=3E_{12},\quad
\Delta(E_{21})=\tfrac13E_{21},\quad
\Delta(E_{11})=E_{11},\quad
\Delta(E_{22})=E_{22}.
$$

$J\Delta J(E_{12})=J\Delta(E_{21})=\tfrac13E_{12}=\Delta^{-1}(E_{12})$ です。逆比は $E_{21}$ にも成り立ちます。**非可換な模型では長さの変換が非自明**であることが分かりました。さらにモジュラー時間の複素位相も検算してみます。行列単位への関数計算から $\Delta^{it}E_{12}=3^{it}E_{12}$、$\Delta^{it}E_{21}=3^{-it}E_{21}$ です。$J$ は反線形なので、

$
J\Delta^{it}J E_{12}
=J\Delta^{it}E_{21}
=J(3^{-it}E_{21})
=\overline{3^{-it}}E_{12}
=3^{it}E_{12}.
$

これは $\Delta^{it}E_{12}$ と一致します。$\lambda>0$ の実数 $\lambda$ に対して $\overline{\lambda^{-it}}=\lambda^{it}$ となる点が鍵です。

## 8. 無限次元では定義域が本当に違う

[AQFT18の無限次元Hilbert–Schmidt標準対](../AQFT18/index.md#thm-aqft18-tomita-closable)で使った $K=\ell^2(\mathbb N)$、$\lambda_n=2^{-n}$、$\Omega=\operatorname{diag}(\sqrt{\lambda_n})$ を考えます。行列単位 $E_{ij}$ に対する第7節と同じ入力の計算は

$$
S(E_{ij})=\sqrt{\lambda_i/\lambda_j}\,E_{ji},
\qquad JE_{ij}=E_{ji},\qquad
\Delta E_{ij}=(\lambda_i/\lambda_j)E_{ij}
$$

となります。有限行列の線形包は $\mathcal H=S_2(K)$ で稠密です。重みのある正対角作用素 $B$ を行列単位への作用

$$
BE_{ij}=\sqrt{\frac{\lambda_i}{\lambda_j}}E_{ij}
$$

と、その重み付き二乗和が有限となる最大定義域で定めます。[QM5の最大実対角作用素の定理](../../QM/QM5/index.md#thm-qm5-real-diagonal-self-adjoint)を行列単位の列に適用すると、$B$ は正自己共役です。

次に $A\in B(K)$ とします。$(A\Omega)_{ij}=A_{ij}\sqrt{\lambda_j}$ だから

$$
(B(A\Omega))_{ij}
=\sqrt{\frac{\lambda_i}{\lambda_j}}A_{ij}\sqrt{\lambda_j}
=\sqrt{\lambda_i}A_{ij}
=(\Omega A)_{ij}.
$$

$\Omega A$ はHilbert–Schmidt作用素なので $A\Omega\in\operatorname{Dom}B$ です。従って

$$
JB(A\Omega)=J(\Omega A)
=(\Omega A)^*=A^*\Omega=S_0(A\Omega).
$$

すなわち $S_0\subset JB$ です。さらに $B$ の定義域に属する $X$ の有限切断 $X_N$ は

$$
\|X-X_N\|_2^2+\|B(X-X_N)\|_2^2
=\sum_{\max(i,j)>N}\left(1+\frac{\lambda_i}{\lambda_j}\right)|X_{ij}|^2
\longrightarrow0
$$

を満たします。有限行列上では $S_0=JB$ であり、その有限行列は $B$ のグラフノルムで稠密です。$J$ が等長なので $JB$ のグラフノルムも同じです。ゆえに閉包を取ると $S=JB$ です。$B^2$ が $\Delta$ となります。

この正対角作用素の定義域を[QM5の最大実対角作用素の定理](../../QM/QM5/index.md#thm-qm5-real-diagonal-self-adjoint)と固有値への関数計算で表すと、すなわち

$$
\begin{aligned}
\operatorname{Dom}\Delta^{1/2}
&=\left\{X:\sum_{i,j}\frac{\lambda_i}{\lambda_j}|X_{ij}|^2<\infty\right\},\\
\operatorname{Dom}\Delta
&=\left\{X:\sum_{i,j}\left(\frac{\lambda_i}{\lambda_j}\right)^2|X_{ij}|^2<\infty\right\},\\
\operatorname{Dom}\Delta^{-1}
&=\left\{X:\sum_{i,j}\left(\frac{\lambda_j}{\lambda_i}\right)^2|X_{ij}|^2<\infty\right\}.
\end{aligned}
$$

第7節の代数的計算は有限行列に対するもので、**無限級数の定義域を無視して全 $X$ に同じ式を代入したわけではありません**。例えば

$$
X=\sum_{n\ge1}2^{-3n/4}E_{1n}
$$

は $\sum_n2^{-3n/2}<\infty$ なので $\mathcal H$ に属します。$\lambda_1/\lambda_n=2^{n-1}$ を代入すると

$$
\|\Delta^{1/2}X\|_2^2
=\sum_{n\ge1}2^{n-1}2^{-3n/2}
=\tfrac12\sum_{n\ge1}2^{-n/2}<\infty,
$$

一方

$$
\|\Delta X\|_2^2
=\sum_{n\ge1}2^{2(n-1)}2^{-3n/2}
=\tfrac14\sum_{n\ge1}2^{n/2}=\infty.
$$

従って $X\in\operatorname{Dom}S=\operatorname{Dom}\Delta^{1/2}$ でも $X\notin\operatorname{Dom}\Delta$ です。$\Delta$ の式を $X$ に直接適用するとHilbert–Schmidt空間の外へ出ます。$JX=X^*$ は全空間で定義されるのに、$\Delta$ はそうでない点を区別してください。

## 9. 演習と詳細解答

### Level A：まず各対象の意味を確かめる

<a id="ex-aqft19-a01"></a>
#### AQFT19-A01 反ユニタリの三条件

- Level: A

$\mathbb C^2$ 上 $U(z_1,z_2)=(\overline z_2,\overline z_1)$ とする。反線形性・内積条件・全射性をそれぞれ確かめ、$U^2$ を求めよ。

<!-- solution-start -->
**詳細解答。** $U(\alpha x+\beta y)$ の第1成分は $\overline{\alpha x_2+\beta y_2}=\overline\alpha\,\overline{x_2}+\overline\beta\,\overline{y_2}$ で第2成分も同じ変形です。よって反線形です。内積は

$$
\langle Ux,Uy\rangle=x_2\overline{y_2}+x_1\overline{y_1}
=\overline{\overline{x_1}y_1+\overline{x_2}y_2}
=\overline{\langle x,y\rangle}.
$$

さらに $U(U(x_1,x_2))=(x_1,x_2)$ なので $U^2=I$ です。任意の $y$ は $y=U(Uy)$ と書けて全射です。以上で[反ユニタリの定義](#def-aqft19-antiunitary)の三条件を確認しました。
<!-- solution-end -->

<a id="ex-aqft19-a02"></a>
#### AQFT19-A02 可換な二点標準対の極分解

- Level: A

$0<p<1$、$\mathcal M$ を $\mathbb C^2$ 上の対角行列環、$\Omega=(\sqrt p,\sqrt{1-p})$ とする。$S,\Delta,J$ を求め、定義域も答えよ。

<!-- solution-start -->
**詳細解答。** $A=\operatorname{diag}(a,b)$ のとき $A\Omega=(a\sqrt p,b\sqrt{1-p})$ です。二成分の係数は任意に選べるので $\mathcal M\Omega=\mathbb C^2$。従って[Tomita初期作用素の定義](../AQFT18/index.md#def-aqft18-tomita-initial)から

$$
S(x_1,x_2)=(\overline{x_1},\overline{x_2})
$$

を全空間で得ます。$\langle Sx,y\rangle=\langle Sy,x\rangle$ を成分で確認すると $S^\sharp=S$ なので $\Delta=S^2=I$、$\Delta^{1/2}=I$。$S=J\Delta^{1/2}$ より $J=S$ です。すべて有界で $\operatorname{Dom}S=\operatorname{Dom}\Delta=\mathbb C^2$ です。
<!-- solution-end -->

<a id="ex-aqft19-a03"></a>
#### AQFT19-A03 非可換模型の比率

- Level: A

$\lambda_1=3/4,\lambda_2=1/4$ の左乗算Hilbert–Schmidt標準対で、$\Delta E_{12}$、$\Delta E_{21}$、$\Delta^{1/2}E_{12}$、$J E_{12}$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 第7節で導出した $S(E_{ij})=\sqrt{\lambda_i/\lambda_j}E_{ji}$ を出発点にします。行列単位の直交性から $\Delta E_{ij}=(\lambda_i/\lambda_j)E_{ij}$ なので

$$
\Delta E_{12}=3E_{12},\qquad
\Delta E_{21}=\tfrac13 E_{21},\qquad
\Delta^{1/2}E_{12}=\sqrt3 E_{12}.
$$

$S E_{12}=\sqrt3 E_{21}$ なので、[極分解の定義式](#def-aqft19-modular-conjugation)により $\sqrt3 JE_{12}=\sqrt3 E_{21}$、従って $JE_{12}=E_{21}$ です。すべて有限次元なので定義域は全空間です。
<!-- solution-end -->

<a id="ex-aqft19-a04"></a>
#### AQFT19-A04 逆作用素の定義域

- Level: A

$\ell^2(\mathbb N)$ 上 $B e_n=2^{-n}e_n$ とする。$B$ と $B^{-1}$ の定義域、核、値域の稠密性を答えよ。$B^{-1}$ を全空間上の有界作用素と書けない理由も示せ。

<!-- solution-start -->
**詳細解答。** $B$ は有界（$\|B\|=1/2$）なので $\operatorname{Dom}B=\ell^2$ です。全固有値が正なので $\ker B=0$。各 $e_n= B(2^n e_n)$ であり、有限列の線形包が $\operatorname{Ran}B$ に入るため値域は稠密です。逆作用素は $B^{-1}e_n=2^n e_n$ で、

$$
\operatorname{Dom}B^{-1}
=\operatorname{Ran}B
=\left\{y=(y_n)\in\ell^2:\sum_{n\ge1}2^{2n}|y_n|^2<\infty\right\}.
$$

$\|B^{-1}e_n\|=2^n$ が発散するため有界でなく、例えば $y_n=2^{-n}$ は $\ell^2$ に属しても逆作用素の定義域に属しません。
<!-- solution-end -->

### Level B：証明と定義域をつなぐ

<a id="ex-aqft19-b01"></a>
#### AQFT19-B01 グラフ完備性から全射性へ

- Level: B

$A:D(A)\subset H\to K$ を稠密定義・閉・線形作用素とする。$I+A^*A$ が全射であることを、グラフ内積とRiesz表現を使って示せ。

<!-- solution-start -->
**詳細解答。** $D(A)$ に $\langle x,z\rangle_A=\langle x,z\rangle+\langle Ax,Az\rangle$ を入れます。$A$ は閉じているのでこの空間は完備です。任意の $y\in H$ に対して $|\langle y,z\rangle|\le\|y\|\|z\|_A$ より、Riesz表現によって $x\in D(A)$ で

$$
\langle y,z\rangle
=\langle x,z\rangle+\langle Ax,Az\rangle
\quad(z\in D(A))
$$

となるものがあります。従って $\langle Ax,Az\rangle=\langle y-x,z\rangle$ です。これは随伴の定義から $Ax\in D(A^*)$、$A^*Ax=y-x$ を意味するので、$x\in D(A^*A)$ かつ $(I+A^*A)x=y$。$y$ は任意なので全射です。これは[正二乗の補題](#lem-aqft19-positive-square)の最初の核心を独立に再構成したものです。
<!-- solution-end -->

<a id="ex-aqft19-b02"></a>
#### AQFT19-B02 逆極分解の一意性

- Level: B

$S$ が閉反線形対合で、$S=JB$（$J$ は反ユニタリ、$B$ は単射な非負自己共役）とする。$S^{-1}$ の極分解を示し、$J^2=I$、$JBJ=B^{-1}$ を導け。

<!-- solution-start -->
**詳細解答。** $B$ は単射で正自己共役だから $B^{-1}:\operatorname{Ran}B\to H$ は稠密定義・正自己共役です。$S=JB$ の逆は

$$
S^{-1}=B^{-1}J^{-1}
=J^{-1}(JB^{-1}J^{-1})
$$

です。定義域は $J\operatorname{Ran}B=\operatorname{Ran}S$。$JB^{-1}J^{-1}$ は反ユニタリ共役で得る正自己共役作用素なので、右辺は反線形極分解です。一方 $S^{-1}=S$ は対合性から定義域ごと成立します。[極分解の一意性](#thm-aqft19-polar)より、反ユニタリ部分を比較して $J=J^{-1}$、正部分を比較して $B=JB^{-1}J^{-1}$。従って $J^2=I$、両側を $J$ で共役して $JBJ=B^{-1}$ です。
<!-- solution-end -->

<a id="ex-aqft19-b03"></a>
#### AQFT19-B03 非有界モジュラー作用素の定義域

- Level: B

$\lambda_n=2^{-n}$ のHilbert–Schmidt模型で $X=\sum_{n\ge1}2^{-3n/4}E_{1n}$ と置く。$X$ が $\operatorname{Dom}\Delta^{1/2}$ に属し、$\operatorname{Dom}\Delta$ に属さないことを示せ。

<!-- solution-start -->
**詳細解答。** 行列単位は正規直交基底なので $\|X\|_2^2=\sum2^{-3n/2}<\infty$。第7節の行列単位の導出から $\Delta E_{1n}=2^{n-1}E_{1n}$ です。よって

$$
\|\Delta^{1/2}X\|_2^2
=\sum_{n\ge1}2^{n-1}2^{-3n/2}
=\tfrac12\sum_{n\ge1}2^{-n/2}<\infty,
$$

$$
\|\Delta X\|_2^2
=\sum_{n\ge1}2^{2(n-1)}2^{-3n/2}
=\tfrac14\sum_{n\ge1}2^{n/2}=\infty.
$$

[QM6の非有界スペクトル積分の定義域](../../QM/QM6/index.md#def-qm6-unbounded-spectral-integral)に照らすと、前者だけが許されます。従って $X\in\operatorname{Dom}S=\operatorname{Dom}\Delta^{1/2}$ ですが $X\notin\operatorname{Dom}\Delta$ です。
<!-- solution-end -->

<a id="ex-aqft19-b04"></a>
#### AQFT19-B04 反線形共役とモジュラー時間のユニタリ作用素

- Level: B

$\Delta>0$（核零の正自己共役）、$J^2=I$（反ユニタリ）、$J\Delta J=\Delta^{-1}$ とする。任意の $t\in\mathbb R$ に対して $J\Delta^{it}J=\Delta^{it}$ を示し、$\Delta^{it}$ のユニタリ性を確認せよ。

<!-- solution-start -->
**詳細解答。** $f_t(\lambda)=\lambda^{it}$ は $\lambda>0$ で絶対値1です。[Borel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)により $\Delta^{it}=f_t(\Delta)$ は全空間上の作用素で

$$
(\Delta^{it})^*\Delta^{it}
=\overline{f_t}(\Delta)f_t(\Delta)=I
$$

となり、逆も $\Delta^{-it}$ なのでユニタリです。反ユニタリ共役は係数を複素共役にするため

$$
Jf_t(\Delta)J
=\overline{f_t}(J\Delta J)
=\overline{f_t}(\Delta^{-1})
$$

です。スペクトル値 $\lambda>0$ ごとに

$$
\overline{f_t}(\lambda^{-1})
=(\lambda^{-1})^{-it}=\lambda^{it}=f_t(\lambda)
$$

ですから $J\Delta^{it}J=\Delta^{it}$ となります。**$J$ が反線形であるため、単純に指数の符号を一度だけ反転させた式は誤り**です。
<!-- solution-end -->

### Level C：標準対からモジュラー対象を再構成する

<a id="ex-aqft19-c01"></a>
#### AQFT19-C01 無限次元左乗算模型の統合問題

- Level: C

$K=\ell^2(\mathbb N)$、$\mathcal H=S_2(K)$、$\mathcal M=\{L_A:A\in B(K)\}$、$\lambda_n=2^{-n}$、$\Omega=\operatorname{diag}(\sqrt{\lambda_n})$ とする。

1. $(\mathcal M,\Omega)$ の巡回性と分離性を確認せよ。
2. 行列単位を入力として $S_0(E_{ij})$ を計算せよ。
3. $JX=X^*$、$\Delta E_{ij}=(\lambda_i/\lambda_j)E_{ij}$ を定義域付きで構成し、$S=J\Delta^{1/2}$ と $J\Delta J=\Delta^{-1}$ を示せ。
4. $\Delta$ が非有界であること、$\operatorname{Dom}\Delta^{1/2}\ne\operatorname{Dom}\Delta$ を具体的な列で示せ。

<!-- solution-start -->
**詳細解答。**

**1. 標準性。** $\|\Omega\|_2^2=\sum_{n\ge1}2^{-n}=1$ です。任意の $i,j$ について

$$
L_{E_{ij}}\Omega=E_{ij}\Omega=\sqrt{\lambda_j}E_{ij}.
$$

$\lambda_j>0$ なので、すべての行列単位 $E_{ij}$ が $\mathcal M\Omega$ に属します。有限行列の線形包はHilbert–Schmidtノルムで稠密です。よって $\Omega$ は巡回的です。

分離性は作用素を列ごとに確認します。$A\Omega=0$ なら、すべての $j$ について

$$
0=(A\Omega)e_j=\sqrt{\lambda_j}Ae_j.
$$

$\lambda_j>0$ から $Ae_j=0$ です。$A$ は有界で、基底の線形包は稠密なので $A=0$。よって $\Omega$ は分離的です。

さらに $\mathcal M$ がvon Neumann環であることを確かめます。任意の $C\in B(K)$ について右乗算 $R_C(X)=XC$ は有界で、結合則から $R_CL_A=L_AR_C$ となります。従って $R_C\in\mathcal M'$ です。

$T\in\mathcal M''$ とします。$R_{E_{11}}$ は第1列を残す射影なので、$T$ はその値域 $\{E_{v1}:v\in K\}$ を保ちます。従って、ある線形作用素 $D:K\to K$ について

$$
T(E_{v1})=E_{Dv,1},\qquad
\|Dv\|=\|E_{Dv,1}\|_2
\le\|T\|\,\|E_{v1}\|_2=\|T\|\,\|v\|
$$

です。よって $D$ は有界です。

行列単位は $E_{ij}=R_{E_{1j}}E_{i1}$ と書けます。$T$ と右乗算の可換性から

$$
T(E_{ij})
=R_{E_{1j}}T(E_{i1})
=E_{De_i,j}
=L_D(E_{ij}).
$$

行列単位の線形包は稠密なので $T=L_D$。従って $\mathcal M''\subset\mathcal M$ です。逆の包含も成り立つので $\mathcal M''=\mathcal M$。[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)により $\mathcal M$ はvon Neumann環です。

**2. Tomitaの初期作用。** $E_{ij}=A\Omega$ には $A=E_{ij}/\sqrt{\lambda_j}\in B(K)$ を選べます。[Tomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)から

$$
S_0(E_{ij})=A^*\Omega
=\frac{1}{\sqrt{\lambda_j}}E_{ji}\Omega
=\sqrt{\frac{\lambda_i}{\lambda_j}}E_{ji}.
$$

複素係数は $S_0$ の反線形性により共役されます。

**3. 定義域付きの構成。** $X=\sum_{i,j}x_{ij}E_{ij}\in S_2(K)$ に対し

$$
\begin{aligned}
\operatorname{Dom}B
&=\left\{X:\sum_{i,j}(\lambda_i/\lambda_j)|x_{ij}|^2<\infty\right\},\\
BX&=\sum_{i,j}\sqrt{\lambda_i/\lambda_j}\,x_{ij}E_{ij}.
\end{aligned}
$$

これは[QM5の最大実対角作用素の定理](../../QM/QM5/index.md#thm-qm5-real-diagonal-self-adjoint)によって正自己共役です。$JX=X^*$ は全域の反ユニタリであり、$JB(E_{ij})=\sqrt{\lambda_i/\lambda_j}\,E_{ji}=S_0(E_{ij})$。ここで任意の $A\in B(K)$ に対し $(A\Omega)_{ij}=A_{ij}\sqrt{\lambda_j}$ なので $B(A\Omega)=\Omega A$、従って $JB(A\Omega)=A^*\Omega=S_0(A\Omega)$。つまり $S_0\subset JB$ です。一方、有限行列の線形包は $B$ のグラフノルムで稠密です。実際、有限切断 $X_N=\sum_{i,j\le N}x_{ij}E_{ij}$ に対して

$$
\|X-X_N\|_2^2+\|B(X-X_N)\|_2^2
=\sum_{\max(i,j)>N}\left(1+\frac{\lambda_i}{\lambda_j}\right)|x_{ij}|^2\to0.
$$

よって $JB$ は $S_0$ のグラフ閉包 $S$ と一致します。$S^\sharp S=B^2$ の定義域は $\{X:\sum(\lambda_i/\lambda_j)^2|x_{ij}|^2<\infty\}$ で、$\Delta=B^2$。$J E_{ij}=E_{ji}$ と複素共役から

$$
J\Delta J(E_{ij})=\frac{\lambda_j}{\lambda_i}E_{ij}
=\Delta^{-1}(E_{ij}).
$$

両辺は同じ最大対角作用素の定義域 $\{X:\sum(\lambda_j/\lambda_i)^2|x_{ij}|^2<\infty\}$ を持つので、作用素等号です。

**4. 非有界性と領域の差。** $\Delta E_{1n}=2^{n-1}E_{1n}$、$\|E_{1n}\|_2=1$ だから $\|\Delta E_{1n}\|_2\to\infty$ で非有界です。さらに

$$
X=\sum_{n\ge1}2^{-3n/4}E_{1n}
$$

について

$$
\|BX\|_2^2=\tfrac12\sum_n2^{-n/2}<\infty,
\qquad
\|\Delta X\|_2^2=\tfrac14\sum_n2^{n/2}=\infty.
$$

ゆえに $X\in\operatorname{Dom}B=\operatorname{Dom}S$ ですが $X\notin\operatorname{Dom}\Delta$。$\square$
<!-- solution-end -->

## 10. 到達点と次講

標準対から得られる閉Tomita対合は、正自己共役な $\Delta=S^\sharp S$ と反ユニタリな $J$ に分離できました。核・稠密値域・正平方根の定義域を調べた上で、逆作用素の極分解の一意性から $J^2=I$ および $J\Delta J=\Delta^{-1}$ を証明しました。有限次元の非可換模型は固有値の**比**を、無限次元模型は作用素の**定義域**を教えてくれます。

次講 **AQFT20「Hilbert–Schmidt標準表現の全計算」**では、有限次元の密度行列 $\rho$ から $S,J,\Delta$ とそのモジュラー時間発展を行列単位で体系的に再計算します。その後の AQFT21–23 で、一般の可換子定理やモジュラー不変性を証明します。
