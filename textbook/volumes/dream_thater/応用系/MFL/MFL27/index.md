# MFL27 等質空間と安定化群が決める核の形

<!-- definition-example-audit: strict -->

## 1. 群の全元がデータの点とは限らない

[MFL26 の群畳み込み](../MFL26/index.md#thm-mfl26-group-equivariance)では、入力と出力のラベルを群 $G$ の全要素に置いた。ところが、正方形の四頂点に値を載せるだけなら、$D_4$ の8個の対称操作に対してデータの点は4個しかない。頂点0を固定する鏡映 $s$ は、単位元 $e$ と**同じ点**に到着するからである。

[MFL23 の軌道と安定化群](../MFL23/index.md#prop-mfl23-fibers)は、この重複を数えていた。今回は重複を除いた場所で線形層を作る。入力を動かす前と層を適用する前とで答えが一致するためには、**同じ点を表す群元の選び方によって核の値が変わらない**ことが必要である。さらにベクトルや符号付き特徴では、単に核値が等しいだけでは足りない。

まず有限群と実数値信号で構成・必要十分条件を証明し、最後に [MFL24 の特徴型](../MFL24/index.md#def-mfl24-feature-type)を使って行列値の核に進む。有限和だけを扱い、積分測度や連続Lie群の表現分類は必要としない。滑らかな群作用を扱う [LIE4 の等質空間](../../../代数系/LIE/LIE4/index.md#def-lie4-homogeneous-space)へ進む前に、有限模型だけで重複と核制約を理解する。

## 2. 一つの軌道を左剰余類で表す

有限群 $G$ が集合 $X$ に左から作用し、どの点からも他の点へ移れるとする。この性質を**推移的**という。一点 $x_0$ を固定する群元全体は、その点の安定化群 $H=\{h\in G:h x_0=x_0\}$ である。すでに [GRP3 の軌道・安定化群](../../../代数系/GRP/GRP3/index.md#def-grp3-orbit-stabilizer)で定義したものを使う。

同じ点に着く $g$ と $gh$（$h\in H$）をまとめた集合 $gH=\{gh:h\in H\}$ を**左剰余類**という。「左」という名称は代表元 $g$ が $H$ の左側に掛かることを指す。全左剰余類の集合を $G/H$ と書く。ここで $H$ は正規部分群である必要がなく、$G/H$ 自身に群の積が定義できるとは限らない。

<a id="def-mfl27-homogeneous-space"></a>

<!-- formal-statement-start -->
> **定義（有限等質空間と代表元）**
> 有限群 $G$ と部分群 $H\le G$ に対し、左剰余類全体の集合 $X=G/H$ を**有限等質空間**と呼ぶ。各点は $gH=\{gh:h\in H\}$ の形であり、$G$ の $X$ への左作用を

$$
t\cdot(gH)=(tg)H
$$

> とする。$gH=ghH$（$h\in H$）を同じ点として扱い、$g$ と $gh$ をその点の**代表元**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl27-homogeneous-space -->
**定義の確認**。$D_4=\{r^k,r^ks:0\le k<4\}$、$r^4=s^2=e$、$srs=r^{-1}$ とし、$H=\{e,s\}$ を取る。$H$ は $s^2=e$ で閉じる2元部分群である。$r^jH=\{r^j,r^js\}$（$j=0,1,2,3$）は互いに交わらず、合わせて全8元である。よって $X$ は4点。$s rH=r^{-1}sH=r^3H$ なので、鏡映は頂点番号 $j=1$ を $j=3$ へ移す。$H$ 自体は $sH=H$ として固定される。この具体例で、作用は点に対して一意であり、代表元の書き方には依存しないことを確かめられる。
<!-- definition-example-end -->

<a id="prop-mfl27-coset-orbit"></a>

<!-- formal-statement-start -->
> **命題（推移的作用と等質空間の同一視）**
> 有限群 $G$ が非空集合 $X$ に推移的に左作用し、$x_0\in X$、$H=G_{x_0}$ とする。次の写像 $\phi:G/H\to X$ は代表元によらず定まる全単射であり、群作用と可換である。

$$
\phi(gH)=g x_0,\qquad
\phi(t\cdot gH)=t\phi(gH)\quad(t,g\in G).
$$
<!-- formal-statement-end -->

**証明の見取り図**。同じ到着点であることと、二つの群元が右から $H$ の元だけ違うことを対応させる。これは [MFL23 の到着点ごとの重複数](../MFL23/index.md#prop-mfl23-fibers)を、点の名前の付け方として利用するものである。

<!-- proof-start -->
### 証明

$g'=gh$（$h\in H$）なら $g'x_0=ghx_0=gx_0$ なので $\phi$ は代表元によらない。逆に $g'x_0=gx_0$ なら $g^{-1}g'x_0=x_0$、すなわち $g^{-1}g'\in H$ であり $g'H=gH$。したがって単射である。推移性から任意の $x\in X$ は $gx_0$ と書けるため全射である。最後に

$$
\phi(t\cdot gH)=\phi(tgH)=(tg)x_0=t(gx_0)=t\phi(gH).
$$

左作用の合成則によって最後の等号が成り立つ。$\square$
<!-- proof-end -->

今後 $X=G/H$ 上のスカラー信号を $f:X\to\mathbb R$ とし、群による変換を $(U_tf)(x)=f(t^{-1}x)$ と定める。同じ場所の値を読み出すので、$f(ghH)=f(gH)$ が必要である。

## 3. 核はなぜ二重に同じ値を持つ必要があるか

線形層を $Tf(x)=\sum_{y\in X}A(x,y)f(y)$ と書く。$A(x,y)$ は出力点 $x$ が入力点 $y$ から読む重みである。[MFL26 の相対群元](../MFL26/index.md#def-mfl26-group-correlation)に倣い、$x=aH$、$y=bH$ に対し相対配置 $a^{-1}b$ だけで重みを決めたい。しかし $a$ を $ah_1$ に、$b$ を $bh_2$ に替えると相対元は

$$
(ah_1)^{-1}(bh_2)=h_1^{-1}a^{-1}bh_2
$$

へ変わる。**出力点の代表元は左側、入力点の代表元は右側で核に作用する**。この二方向の重複を同時に扱う必要がある。

<a id="def-mfl27-double-coset-kernel"></a>

<!-- formal-statement-start -->
> **定義（二重剰余類とスカラー整合核）**
> 有限群 $G$、部分群 $H\le G$、元 $v\in G$ に対し $HvH=\{h_1vh_2:h_1,h_2\in H\}$ を**二重剰余類**といい、それらの集合を $H\backslash G/H$ と書く。実数値核 $K:G\to\mathbb R$ が $G/H$ に対して**代表元整合的**であるとは、任意の $v\in G$ と $h_1,h_2\in H$ に対して

$$
K(h_1vh_2)=K(v)
$$

> を満たすことをいう。これは $K$ が各二重剰余類上で一定であることと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl27-double-coset-kernel -->
**定義の確認**。$G=D_4,H=\{e,s\}$ では $sr^j=r^{-j}s$ なので、右側の $H$ を掛けても点 $r^jH$ は変わらず、左側の $s$ は $r^jH$ を $r^{-j}H$ へ移す。したがって二重剰余類は

$$
H,\qquad HrH=rH\cup r^3H,\qquad Hr^2H=r^2H.
$$

各集合はそれぞれ2、4、2元で、重複せず全8元を覆う。$K(r^0)=a,K(r)=K(r^3)=b,K(r^2)=c$ と置き、$K(r^js)=K(r^j)$ と定めれば、左右の $H$ の作用を一つずつ確かめて $K(h_1vh_2)=K(v)$ が成立する。逆に $K(r)=1,K(r^3)=0$ は $s(rH)=r^3H$ で値が違うため不適合である。
<!-- definition-example-end -->

この例の意味は「同じ頂点を起点にした右隣と左隣へ異なるスカラー重みを置けない」ということだ。$s$ は起点を固定して両隣を交換するからである。

<a id="thm-mfl27-scalar-kernel"></a>

<!-- formal-statement-start -->
> **定理（等質空間のスカラー等変核の必要十分条件）**
> 有限群 $G$、部分群 $H\le G$、$X=G/H$ とする。実線形写像 $T:\mathbb R^X\to\mathbb R^X$ が任意の $t\in G$ で $TU_t=U_tT$ を満たすための必要十分条件は、ただ一つの代表元整合核 $K:G\to\mathbb R$ が存在して

$$
(Tf)(aH)=\sum_{bH\in X}K(a^{-1}b)f(bH)
$$

> と書けることである。核は $H\backslash G/H$ 上の値と一対一に対応し、上式は $a,b$ の代表元によらない。
<!-- formal-statement-end -->

**証明の見取り図**。十分性は相対元 $(ta)^{-1}(tb)=a^{-1}b$ を使う。必要性は行列係数 $A(x,y)$ に一つの場所だけ値1の信号を入力し、等変性から $A(tx,ty)=A(x,y)$ を取り出す。この対角作用の不変性を原点 $H$ に戻せば核は一つに決まる。

<!-- proof-start -->
### 証明

まず $K$ が整合的とする。$a'=ah_1,b'=bh_2$ なら

$$
K((a')^{-1}b')=K(h_1^{-1}a^{-1}bh_2)=K(a^{-1}b).
$$

ゆえに和の各係数は代表元に依存しない。任意の $t,a\in G$ に対して、$x=bH$ を $x=t(cH)$ と変数変換する。左作用は $X$ の全単射なので

$$
\begin{aligned}
(TU_tf)(aH)
&=\sum_{bH\in X}K(a^{-1}b)f(t^{-1}bH)\\
&=\sum_{cH\in X}K(a^{-1}tc)f(cH)\\
&=\sum_{cH\in X}K((t^{-1}a)^{-1}c)f(cH)\\
&=(Tf)(t^{-1}aH)=(U_tTf)(aH).
\end{aligned}
$$

逆向きを示す。有限集合 $X$ の各 $y$ について一点信号 $\delta_y$ を用い、$A(x,y)=(T\delta_y)(x)$ と定める。任意の $f$ は $f=\sum_y f(y)\delta_y$ なので、線形性から $Tf(x)=\sum_y A(x,y)f(y)$。また $U_t\delta_y=\delta_{ty}$ である。等変性を点 $tx$ で評価すると

$$
A(tx,ty)=(T\delta_{ty})(tx)
=(TU_t\delta_y)(tx)
=(U_tT\delta_y)(tx)=A(x,y).
$$

$K(v):=A(H,vH)$ と置く。$h_2\in H$ なら $vh_2H=vH$ より $K(vh_2)=K(v)$。$h_1\in H$ なら上の対角不変性で

$$
K(h_1v)=A(H,h_1vH)
=A(h_1H,h_1vH)=A(H,vH)=K(v).
$$

よって整合的である。任意の $a,b$ に対して $t=a^{-1}$ を用いると

$$
A(aH,bH)=A(H,a^{-1}bH)=K(a^{-1}b).
$$

最後に $K(v)=A(H,vH)$ は $T$ の一点信号応答から一意に決まる。$\square$
<!-- proof-end -->

入力だけを全群上に置いた [MFL26 の群畳み込み](../MFL26/index.md#thm-mfl26-group-equivariance)は、$H=\{e\}$ の特別な場合である。非自明な $H$ があると、自由に選べる重みの個数は $|G|$ ではなく**二重剰余類の個数**まで減る。

## 4. 正方形の四頂点では「自身・隣・向かい」の三種類

ここでは $G=D_4$、$H=\{e,s\}$、$x_j=r^jH$（$j=0,1,2,3$）とする。$K$ の三つの値を前節の $a,b,c$ とすると、$x_j$ での和の相対元は $(r^j)^{-1}r^k=r^{k-j}$ であり

$$
(Tf)(j)=a f(j)+b\{f(j+1)+f(j-1)\}+c f(j+2),
\qquad j\pmod4.
$$

これが四頂点上のすべての $D_4$ 等変な実線形スカラー層の形である。行列で書くと

$$
\begin{pmatrix}
a&b&c&b\\ b&a&b&c\\ c&b&a&b\\ b&c&b&a
\end{pmatrix}.
$$

例えば $f=(1,2,3,4)$、$(a,b,c)=(1,2,-1)$ なら、頂点0の出力は $1+2(2+4)-3=10$ となる。他の頂点も順に $6,14,10$ である。これは単に対称そうに見える行列を推測したのではなく、[核の必要十分条件](#thm-mfl27-scalar-kernel)によって全候補を分類した結果である。

もし $K(r)=1,K(r^3)=0$ としたら、同じ出力点 $H=sH$ に対し、代表元 $a=e$ を選んだ値は $f(rH)$ の係数が1、$a=s$ を選んだ値は $K(s^{-1}r)=K(r^3s)=0$ となる。「右隣だけ」を読む層は $D_4$ のこの頂点作用の下では定義できない。数値的な小さいずれでなく、**同じ点の出力に二つの答えを割り当てる**破綻である。

## 5. 特徴型があると「同じ値」ではなく「型に従う値」

ここまで各頂点の特徴はスカラーだった。では、鏡映で符号が反転する一成分特徴を出力したい場合はどうするか。[MFL24 の表現](../MFL24/index.md#def-mfl24-representation)を安定化群 $H$ に制限して考える。

有限次元実ベクトル空間 $V$ と $H$ の表現 $\rho:H\to\operatorname{GL}(V)$ に対し、群元 $g$ で表した特徴 $F(g)\in V$ には、同じ点 $gH$ を $gh$ で表したときの**成分変換則**が必要となる。幾何的な点は変わらないが、点に取り付けた基準の取り方が変わるためである。これを**右共変な特徴**と呼び、$F(gh)=\rho(h)^{-1}F(g)$ と約束する。スカラーなら $\rho(h)=1$ なので普通の $G/H$ 上の関数へ戻る。

<a id="def-mfl27-typed-section"></a>

<!-- formal-statement-start -->
> **定義（安定化群表現に従う特徴）**
> 有限群 $G$、部分群 $H\le G$、有限次元実ベクトル空間 $V$、実表現 $\rho:H\to\operatorname{GL}(V)$ に対し、写像 $F:G\to V$ が**右共変**であるとは、全 $g\in G,h\in H$ に対して

$$
F(gh)=\rho(h)^{-1}F(g)
$$

> が成り立つことをいう。$G$ はこのような写像へ $(L_tF)(g)=F(t^{-1}g)$ と左作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl27-typed-section -->
**定義の確認**。$G=D_4,H=\{e,s\}$、$V=\mathbb R$、$\rho(e)=1,\rho(s)=-1$ とする。$s^2=e$ に対応して $(-1)^2=1$ なので、これは [有限群の表現の定義](../MFL24/index.md#def-mfl24-representation)を満たす。四つの値 $F(r^j)=j+1$ を選び、$F(r^js)=-(j+1)$ と定めると、各 $g=r^j$ と $g=r^js$ に対して $F(gs)=-F(g)$ が成立する。左作用でも

$$
(L_tF)(gs)=F(t^{-1}gs)=-F(t^{-1}g)=-(L_tF)(g)
$$

となり、同じ種類の特徴へ写る。値を $F(r^j)=F(r^js)$ と誤って固定すれば、符号型ではなくスカラー型になってしまう。
<!-- definition-example-end -->

行列値核にも入力と出力の型の違いがある。入力表現を $\rho_{\mathrm{in}}:H\to\operatorname{GL}(V_{\mathrm{in}})$、出力表現を $\rho_{\mathrm{out}}:H\to\operatorname{GL}(V_{\mathrm{out}})$ とする。同じ入力点の代表を $u$ から $uh$ に替えると、入力成分は $\rho_{\mathrm{in}}(h)^{-1}$ 倍される。そこで重みは右から $\rho_{\mathrm{in}}(h)$ を掛けて相殺しなければならない。一方、出力点の代表を $g$ から $gh$ に替えたときには、出力全体が $\rho_{\mathrm{out}}(h)^{-1}$ で変わる必要がある。

<a id="def-mfl27-typed-kernel"></a>

<!-- formal-statement-start -->
> **定義（安定化群の両側制約を満たす行列値核）**
> 有限群 $G$、部分群 $H\le G$、表現 $\rho_{\mathrm{in}}$ と $\rho_{\mathrm{out}}$ を上記のように取る。写像 $K:G\to\operatorname{Hom}(V_{\mathrm{in}},V_{\mathrm{out}})$ が**型整合核**であるとは、任意の $v\in G,h_1,h_2\in H$ に対して

$$
K(h_1vh_2)
=\rho_{\mathrm{out}}(h_1)\,K(v)\,\rho_{\mathrm{in}}(h_2)
$$

> を満たすことをいう。右辺は線形写像の合成であり、$\rho_{\mathrm{out}}(h_1)$ は出力側、$\rho_{\mathrm{in}}(h_2)$ は入力側に作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl27-typed-kernel -->
**定義の確認**。$D_4,H=\{e,s\}$ で入力をスカラー型 $\rho_{\mathrm{in}}(s)=1$、出力を符号型 $\rho_{\mathrm{out}}(s)=-1$ とし、

$$
K(e)=K(r^2)=0,\quad K(r)=1,\quad K(r^3)=-1,\quad
K(r^js)=K(r^j)
$$

と置く。右に $s$ を掛けたときは値が変わらない。左に $s$ を掛けると $sr^js^m=r^{-j}s^{m+1}$ となるから、$j=0,2$ では両辺0、$j=1,3$ では値が逆符号となる。よってすべての $v$ で $K(sv)=-K(v)$ が成立し、両側の制約を満たす。両側の操作を続けて行っても同じである。
<!-- definition-example-end -->

<a id="thm-mfl27-typed-correlation"></a>

<!-- formal-statement-start -->
> **定理（型整合核の等質空間相互相関）**
> 有限群 $G$、部分群 $H\le G$、実表現 $\rho_{\mathrm{in}}$ と $\rho_{\mathrm{out}}$、型整合核 $K:G\to\operatorname{Hom}(V_{\mathrm{in}},V_{\mathrm{out}})$ を取る。入力が右共変な $F:G\to V_{\mathrm{in}}$ のとき

$$
(C_KF)(g)=\sum_{uH\in G/H}K(g^{-1}u)F(u)
$$

> は各入力点 $uH$ の代表元によらず、出力は $\rho_{\mathrm{out}}$ に従って右共変である。また任意の $t\in G$ について $C_KL_t=L_tC_K$ が成り立つ。逆に、各和項が全入力 $F$ に対して代表元によらず、出力が所定の右共変性を持つことを要求すれば、核の両側制約が必要である。
<!-- formal-statement-end -->

**証明の見取り図**。入力代表の変更は核の右側変換と入力成分の逆変換で打ち消し合う。出力代表の変更は核の左側変換が引き受ける。最後の群作用は相対元の変数変換で示す。入力・出力の型を区別する点以外は [MFL26 の群相互相関](../MFL26/index.md#thm-mfl26-group-equivariance)と同じ仕組みである。

<!-- proof-start -->
### 証明

$h\in H$ に対して、入力点の代表 $u$ を $uh$ に替えた一項は

$$
\begin{aligned}
K(g^{-1}uh)F(uh)
&=K(g^{-1}u)\rho_{\mathrm{in}}(h)
  \rho_{\mathrm{in}}(h)^{-1}F(u)\\
&=K(g^{-1}u)F(u).
\end{aligned}
$$

したがって和は定まる。出力点の代表を $g$ から $gh$ に替えると

$$
\begin{aligned}
(C_KF)(gh)
&=\sum_{uH}K(h^{-1}g^{-1}u)F(u)\\
&=\rho_{\mathrm{out}}(h^{-1})
  \sum_{uH}K(g^{-1}u)F(u)\\
&=\rho_{\mathrm{out}}(h)^{-1}(C_KF)(g).
\end{aligned}
$$

次に任意の $t\in G$ で $u=tw$ と置く。左作用が $G/H$ の全単射だから

$$
\begin{aligned}
(C_KL_tF)(g)
&=\sum_{uH}K(g^{-1}u)F(t^{-1}u)\\
&=\sum_{wH}K(g^{-1}tw)F(w)\\
&=\sum_{wH}K((t^{-1}g)^{-1}w)F(w)\\
&=(L_tC_KF)(g).
\end{aligned}
$$

必要性は、入力を任意の一つの剰余類 $uH$ のみに支持させ、そこでの $F(u)\in V_{\mathrm{in}}$ を任意に選ぶことで確認する。代表を $uh$ に替えてもその項が同じなら

$$
K(vh)\rho_{\mathrm{in}}(h)^{-1}z=K(v)z
$$

が任意の $v=g^{-1}u$ と $z\in V_{\mathrm{in}}$ に成り立つ。すなわち $K(vh)=K(v)\rho_{\mathrm{in}}(h)$。同じ一点支持の入力に出力の右共変性を要求すると $K(h^{-1}v)z=\rho_{\mathrm{out}}(h)^{-1}K(v)z$、よって $K(hv)=\rho_{\mathrm{out}}(h)K(v)$。この二式の合成が両側制約である。$\square$
<!-- proof-end -->

**固定点での選択則**。$v=e$ と置き、左右の制約を比較すると、任意の $h\in H$ に対して

$$
\rho_{\mathrm{out}}(h)K(e)=K(e)\rho_{\mathrm{in}}(h).
$$

これは [MFL24 の絡作用素](../MFL24/index.md#def-mfl24-intertwiner)の条件そのものである。したがって入力がスカラー型、出力が反射符号型なら $-K(e)=K(e)$ から $K(e)=0$。自己点から自分への寄与を符号型の出力へ無条件に流すことはできない。

## 6. 反射で符号が変わる「隣の差分」

上で構成した $D_4$ の符号型核は、$F(r^j)=f(j)$ と表すスカラー入力に対し

$$
(C_KF)(r^j)=f(j+1)-f(j-1).
$$

を与える。これは右隣と左隣の**差分**であり、両隣の**和**を取ったスカラー核とは違う。頂点0を固定する鏡映 $s$ は左右を交換するので、差分の符号が変わる。

ただし値を $g=r^js$ の代表で読むと $(C_KF)(r^js)=-(C_KF)(r^j)$ になる。出力は通常の「各頂点に固定されたスカラー」ではなく、基準に応じて符号が変わる特徴である。基準の変更を無視して比較すれば、正しい等変層を誤って不変性違反と判定してしまう。

この有限例が示す重要な区別は次のとおりである。

- スカラー→スカラー：核は $H\backslash G/H$ 上で一定、重みは $a,b,c$ の3自由度。
- スカラー→反射符号型：核は $K(e)=K(r^2)=0$、$K(r^3)=-K(r)$、重みは1自由度。
- $H=\{e\}$：代表元の重複がなく、[群上の任意の核](../MFL26/index.md#def-mfl26-group-correlation)を許す。

この分類は有限群と今回の入出力型の範囲での厳密な結果であり、一般の連続回転群の steerable kernel をすべて分類したという意味ではない。

## 7. 代表元を変えても答えが同じか、実験する

[Pythonラボ](homogeneous_kernel_lab.py)では $D_4$ の全8元と四頂点を列挙し、代表元 $r^j$ と $r^js$ を切り替える。正しいスカラー核、反射符号型核、整合性を壊した核の3種類を比較する。整数和なので残差は浮動小数誤差ではない。

~~~bash
python textbook/volumes/dream_thater/応用系/MFL/MFL27/homogeneous_kernel_lab.py --self-test
python textbook/volumes/dream_thater/応用系/MFL/MFL27/homogeneous_kernel_lab.py --model scalar --kernel valid --transform reflection
python textbook/volumes/dream_thater/応用系/MFL/MFL27/homogeneous_kernel_lab.py --model odd --kernel valid --transform rotation
python textbook/volumes/dream_thater/応用系/MFL/MFL27/homogeneous_kernel_lab.py --model scalar --kernel invalid --representative reflected
~~~

~~~python-file-lab
# lab-id: MFL27-HOMOGENEOUS-KERNEL
# lab-title: 等質空間の代表元と核制約
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL27/homogeneous_kernel_lab.py
# timeout-ms: 60000
# lab-preset: スカラー核・鏡映 | --model scalar --kernel valid --transform reflection
# lab-preset: 符号型核・回転 | --model odd --kernel valid --transform rotation
# lab-preset: 壊れた核・代表元変更 | --model scalar --kernel invalid --representative reflected
# lab-preset: 壊れた核・鏡映 | --model scalar --kernel invalid --transform reflection
~~~

表示する代表元差は、**スカラー型なら同じ値、符号型なら逆符号**となるべき比較からの最大偏差である。等変残差も、反射時に符号を反転する出力型を考慮して計算する。整合性違反の核では出力点の代表を替えるだけで答えが変わり、変換テストの残差も生じる。この「失敗」を自動修復せず対照として表示する。

## 8. 演習――核の制約を自力で導く

<a id="ex-mfl27-a01"></a>

### MFL27-A01 正方形の等質空間

- Level: A
- 問題: $D_4=\{r^k,r^ks\}$、$r^4=s^2=e$、$srs=r^{-1}$、$H=\{e,s\}$ とする。$G/H$ の全点を列挙し、$s\cdot rH$ と $r^2\cdot r^3H$ を求めよ。代表 $rH$ と $rsH$ が同じ点であることも確認せよ。

<a id="ex-mfl27-a02"></a>

### MFL27-A02 二重剰余類を数える

- Level: A
- 問題: A01 の $D_4,H$ で $Hr^jH$（$j=0,1,2,3$）を列挙し、異なる二重剰余類の個数と各元数を求めよ。どの群関係で左右の隣点が同一視されたかも述べよ。

<a id="ex-mfl27-a03"></a>

### MFL27-A03 三係数の層を計算する

- Level: A
- 問題: $f(0),\ldots,f(3)=(1,2,3,4)$ とし、$Tf(j)=a f(j)+b(f(j+1)+f(j-1))+c f(j+2)$（添字は $\bmod4$）で $(a,b,c)=(1,2,-1)$ とする。$Tf$ の4成分を求め、$r$ による入力の回転後の頂点0の出力が元の頂点3の出力と等しいことを検算せよ。

<a id="ex-mfl27-a04"></a>

### MFL27-A04 代表元で答えが割れる反例

- Level: A
- 問題: $K(r)=K(rs)=1$、それ以外の $D_4$ の元で0とし、$f=\delta_{rH}$ とする。$(Tf)(H)$ を出力代表元 $a=e$ と $a=s$ で別々に和 $\sum_{bH}K(a^{-1}b)f(bH)$ から計算せよ。どの整合条件が失われたか述べよ。

<a id="ex-mfl27-b01"></a>

### MFL27-B01 任意の線形等変層から核を復元する

- Level: B
- 問題: 有限群 $G$、部分群 $H$、$X=G/H$ とし、線形 $T:\mathbb R^X\to\mathbb R^X$ が全 $t\in G$ で $TU_t=U_tT$ を満たすとする。$A(x,y)=(T\delta_y)(x)$、$K(v)=A(H,vH)$ と置き、(1) $A(tx,ty)=A(x,y)$、(2) $K(h_1vh_2)=K(v)$、(3) $Tf(aH)=\sum_{bH}K(a^{-1}b)f(bH)$ を順に示せ。

<a id="ex-mfl27-b02"></a>

### MFL27-B02 正規部分群なら何が変わるか

- Level: B
- 問題: $G=C_4=\{e,r,r^2,r^3\}$、$H=\{e,r^2\}$ とする。$G/H$ は何点か、二重剰余類は何個かを数え、すべてのスカラー等変線形層の $2\times2$ 行列を求めよ。$D_4$ の四頂点の場合と自由係数の個数を比べよ。

<a id="ex-mfl27-b03"></a>

### MFL27-B03 符号型の隣接差分

- Level: B
- 問題: $D_4,H=\{e,s\}$ とし、入力型は $\rho_{\mathrm{in}}(s)=1$、出力型は $\rho_{\mathrm{out}}(s)=-1$ とする。両側核制約から $K(e)=K(r^2)=0$、$K(r^3)=-K(r)$ を導け。$K(r)=1$ としたときの出力を $f=(1,2,3,4)$ で計算し、鏡映した入力 $f'(j)=f(-j)$ に対する出力の頂点0で符号反転を検算せよ。

<a id="ex-mfl27-b04"></a>

### MFL27-B04 核の平均による修復

- Level: B
- 問題: $D_4/H$ のスカラー用核について $K(r^j)=K(r^js)=k_j$ とするが、$k_1=k_3$ は仮定しない。$\overline k_j=\{k_j+k_{-j}\}/2$（添字 $\bmod4$）で平均すると整合核になること、平均を二度行っても値が変わらないことを示せ。また $\sum_j(k_j-v_j)^2$ を整合条件 $v_1=v_3$ の下で最小にする $v$ が $\overline k$ であることを平方完成から示せ。

<a id="ex-mfl27-c01"></a>

### MFL27-C01 同じ入力から二種類の等変特徴を作る

- Level: C
- 問題: $D_4/H$ の四頂点 $j=0,1,2,3$ に $f=(1,2,3,4)$ を置く。$D_4$ は $r:j\mapsto j+1$、$s:j\mapsto-j$ と作用する。
  1. スカラー出力 $Sf(j)=f(j)+2\{f(j+1)+f(j-1)\}-f(j+2)$ と、符号型出力 $Af(j)=f(j+1)-f(j-1)$ を、どの二重剰余類にどの係数を置いたかから構成せよ。
  2. $Sf$ と $Af$ を全頂点で求め、$s$ による入力の鏡映後に $Sf'(j)=Sf(-j)$ と $Af'(j)=-Af(-j)$ が成立することを4頂点で検算せよ。
  3. 両者が全 $D_4$ に等変であることを、[スカラー核の必要十分条件](#thm-mfl27-scalar-kernel)と[型整合核の等変性](#thm-mfl27-typed-correlation)から証明せよ。もし $Af$ の反射符号を無視して普通のスカラー出力と解釈したら、どの頂点の検算で破綻するかを具体的に示せ。

## 9. 演習の詳細解答

### Level A の解答

<!-- solution-start -->
**MFL27-A01 解答**。$r^jH=\{r^j,r^js\}$（$j=0,1,2,3$）の四集合は互いに交わらない。$s r=r^{-1}s=r^3s$ より $s\cdot rH=r^3H$。$r^2r^3=r^5=r$ なので $r^2\cdot r^3H=rH$。$rsH=rH$ は $sH=H$ により成立する。左作用と右側の代表変更を混同しない。

**MFL27-A02 解答**。左に $s$ を掛けると $sr^jH=r^{-j}H$ になる。よって

$$
\begin{aligned}
HeH&=\{e,s\},\\
HrH&=\{r,rs,r^3,r^3s\},\\
Hr^2H&=\{r^2,r^2s\},\qquad Hr^3H=HrH.
\end{aligned}
$$

異なる集合は3個、元数は $2+4+2=8$。$srs=r^{-1}$ が $j=1$ と $j=3$ の隣点を交換した。

**MFL27-A03 解答**。[三係数の公式](#thm-mfl27-scalar-kernel)を頂点ごとに使うと

$$
\begin{aligned}
Tf(0)&=1+2(2+4)-3=10,\\
Tf(1)&=2+2(3+1)-4=6,\\
Tf(2)&=3+2(4+2)-1=14,\\
Tf(3)&=4+2(1+3)-2=10.
\end{aligned}
$$

回転した入力は $f'(j)=f(j-1)$ で、$(4,1,2,3)$。したがって $Tf'(0)=4+2(1+3)-2=10=Tf(3)$。回転後の出力は元の出力を1頂点右へ移したものになる。

**MFL27-A04 解答**。$f$ は $rH$ にだけ1を持つ。出力代表が $a=e$ のとき、和の唯一の非零項は $K(e^{-1}r)f(rH)=K(r)=1$。$a=s$ のときは $s^{-1}=s$、$sr=r^3s$ より $K(s^{-1}r)=K(r^3s)=0$。どちらも出力点は $H=sH$ なのに1と0の別の答えになる。右整合 $K(vs)=K(v)$ は満たすが、左整合 $K(sv)=K(v)$ を満たさない。
<!-- solution-end -->

### Level B の解答

<!-- solution-start -->
**MFL27-B01 解答**。$U_t\delta_y=\delta_{ty}$ であり、等変性より

$$
\begin{aligned}
A(tx,ty)&=(T\delta_{ty})(tx)\\
&=(TU_t\delta_y)(tx)=(U_tT\delta_y)(tx)=A(x,y).
\end{aligned}
$$

$K(vh_2)=A(H,vh_2H)=A(H,vH)=K(v)$。また $h_1H=H$ と上の同時移動不変性から $K(h_1v)=A(h_1H,h_1vH)=A(H,vH)=K(v)$。両者を合成して $K(h_1vh_2)=K(v)$。最後に $t=a^{-1}$ を代入すれば $A(aH,bH)=A(H,a^{-1}bH)=K(a^{-1}b)$。任意の $f=\sum_{bH}f(bH)\delta_{bH}$ の線形性から指定された和が得られる。

**MFL27-B02 解答**。$H=\{e,r^2\}$ は2元なので、左剰余類は $H$ と $rH=\{r,r^3\}$ の二点である。$C_4$ は可換であり、$Hr^jH=r^jH$。二重剰余類も2個。核を $K(e)=K(r^2)=a$、$K(r)=K(r^3)=b$ とすると、二点の順 $H,rH$ で

$$
T=\begin{pmatrix}a&b\\b&a\end{pmatrix}.
$$

四頂点の $D_4$ の場合は $a,b,c$ の3自由度だったが、この二点の場合は2自由度である。比較対象の点数自体が違うことにも注意する。

**MFL27-B03 解答**。右側の制約は $K(vs)=K(v)$、左側は $K(sv)=-K(v)$。$v=e$ について $K(s)=K(e)$ と $K(s)=-K(e)$ を比較すれば $K(e)=0$。$r^2$ は $s$ と可換なので $K(sr^2)=K(r^2s)=K(r^2)$ かつ $K(sr^2)=-K(r^2)$、よって $K(r^2)=0$。$sr=r^3s$ から $K(r^3)=-K(r)$。

$K(r)=1$ なら [型整合核の相互相関](#thm-mfl27-typed-correlation)より

$$
Af(j)=f(j+1)-f(j-1)=(-2,2,2,-2)_j.
$$

鏡映入力は $f'=(1,4,3,2)$ であり $Af'(0)=f'(1)-f'(3)=4-2=2=-Af(0)$。符号型として正しい。

**MFL27-B04 解答**。$H$ の左作用は $j\mapsto-j$ なので、平均後の値は $\overline k_{-j}=\overline k_j$、右側の $H$ 不変性は既に仮定されている。よって整合的。さらに

$$
\frac{\overline k_j+\overline k_{-j}}2
=\frac{\tfrac12(k_j+k_{-j})+\tfrac12(k_{-j}+k_j)}2
=\overline k_j
$$

なので二度目の平均で変わらない。最小二乗では $v_0=k_0,v_2=k_2$ が最適。$v_1=v_3=z$ と置くと

$$
(k_1-z)^2+(k_3-z)^2
=2\left(z-\frac{k_1+k_3}{2}\right)^2
 +\frac{(k_1-k_3)^2}{2}.
$$

右辺第二項は $z$ に依存せず、最小点は $z=(k_1+k_3)/2$。これが $\overline k$ である。
<!-- solution-end -->

### Level C の解答

<!-- solution-start -->
**MFL27-C01 解答**。

1. スカラーでは二重剰余類 $H,HrH,Hr^2H$ にそれぞれ $1,2,-1$ を置く。これにより [スカラー核の必要十分条件](#thm-mfl27-scalar-kernel)から $S$ の式を得る。符号型は $K(e)=K(r^2)=0,K(r)=1,K(r^3)=-1$ とし、$K(r^js)=K(r^j)$ に広げる。左鏡映は $r$ と $r^3$ を交換して核を負にするので、[型整合核の定義](#def-mfl27-typed-kernel)を満たし $A$ の式を得る。

2. $S$ は頂点0から順に

   $$
   Sf=(10,6,14,10),\qquad Af=(-2,2,2,-2).
   $$

   鏡映した入力は $f'(j)=f(-j)=(1,4,3,2)$。各点の隣の値を代入すると

   $$
   \begin{aligned}
   Sf'&=(10,10,14,6),\\
   Af'&=(2,2,-2,-2).
   \end{aligned}
   $$

   元の $Sf(-j)$ は $(10,10,14,6)$、$-Af(-j)$ は $(2,2,-2,-2)$ で、4成分すべて一致する。

3. $S$ の核は左右 $H$ 不変なので、[スカラー核の必要十分条件](#thm-mfl27-scalar-kernel)が全 $t\in D_4$ での等変性を保証する。$A$ の核は入力が自明型、出力が符号型の両側制約を満たすので、[型整合核の相互相関](#thm-mfl27-typed-correlation)を適用できる。

   正規の代表 $r^j$ で比較すると、鏡映の出力代表は $s^{-1}r^j=r^{-j}s$ である。出力の右共変性により $s$ を右から付けたときに符号が反転し、

   $$
   Af'(j)=-Af(-j)
   $$

   となる。符号を無視して普通のスカラー出力として比較すると、頂点0で左辺は2、右辺の符号反転前は $-2$ となり一致しない。これは不具合ではなく出力型の情報である。
<!-- solution-end -->

## 10. 次の講義へ

四頂点では「自身・隣・向かい」の3係数しかスカラー核に許されなかった。出力を反射符号型へ変えると、むしろ隣接**差分**が自然な核になった。次の MFL28 では円周の回転を連続的に動かし、周波数ごとに成分がどう混ざるかを初等的な Fourier 計算で調べる。
