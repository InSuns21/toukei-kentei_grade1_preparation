# CATB2-04 豊穣Yonedaの補題

## 1. 恒等射で評価するだけで、変換全体が分かるか

通常の[共変Yonedaの補題](../../CAT/CAT1-11/index.md#thm-cat1-11-covariant-yoneda)では、関手 $\operatorname{Hom}(a,-)$ から関手 $F$ への自然変換を恒等射 $1_a$ で評価すると、集合 $Fa$ の元が得られる。逆に元 $v$ から、射 $f:a\to x$ に $F(f)(v)$ を対応させる自然変換を復元できた。

前講ではHomを集合ではなく基底の対象とする[豊穣関手](../CATB2-03/index.md#def-catb2-03-enriched-functor)と[豊穣自然変換](../CATB2-03/index.md#def-catb2-03-enriched-natural)を構成した。線形写像なら、変換全体の集合だけでなく、その線形構造を知りたい。そこで変換全体を表す対象を作り、その対象自体が $Fa$ と同型になることを示す。

本講では基底 $\mathcal V$ を局所小な[対称モノイダル圏](../../CAT/CAT4-03/index.md#def-cat4-03-symmetric)で、[右閉](../../CAT/CAT4-05/index.md#def-cat4-05-right-closed)かつ[完備](../../CAT/CAT2-04/index.md#def-cat2-04-complete)と仮定する。つまり単位対象 $I$、テンソル積 $\otimes$、対称性 $\sigma$ があり、内部Hom $[U,W]$ と評価射

$$
e_{U,W}:[U,W]\otimes U\to W
$$

が存在し、小さい積と等化子も存在する。豊穣圏 $\mathcal A$ の対象は集合をなすとする。基底自身は対象の集まりが真の類でもよい。豊穣圏の合成・単位の公理は対象の集まりの大きさに依存せず、以下の積を取る箇所では添字の小ささを確認する。

記号を軽くするため、[Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)で許される括弧の付け替えと単位子は省略して書く。例えば $P\otimes I=P$ と書く操作は実際には右単位子による同一視である。因子の順序を変えるときは対称性を使い、単なる括弧変更とは区別する。射の合成は右から左に読む。[豊穣圏の定義](../CATB2-01/index.md#def-catb2-01-enriched-category)の合成 $m^\mathcal A_{xyz}$ と単位 $j^\mathcal A_x$ は、所属する圏が明らかなとき上添字を省く。

## 2. 基底自身を豊穣圏として見る

集合では写像の集合をHomとする。閉構造のある基底では、写像の集合に当たるものを内部Hom対象に置き換えられる。合成は二つの内部Hom対象をテンソルして、評価を二度行えば作れる。

<a id="thm-catb2-04-self-enrichment"></a>

<!-- formal-statement-start -->
> **定理（閉モノイダル圏の自己豊穣化）**
>
> 局所小な右閉モノイダル圏 $\mathcal V$ は、自身を基底とする豊穣圏 $\underline{\mathcal V}$ をなす。対象は $\mathcal V$ の対象、Hom対象は $[U,W]$ とする。合成 $c$ は

$$
c_{U,W,Z}:[W,Z]\otimes[U,W]\to[U,Z]
$$

> であり、次の射を転置したものとする。

$$
[W,Z]\otimes[U,W]\otimes U
\xrightarrow{1\otimes e_{U,W}}[W,Z]\otimes W
\xrightarrow{e_{W,Z}} Z.
$$

> 単位 $i_U:I\to[U,U]$ は左単位子 $I\otimes U\to U$ の転置である。
<!-- formal-statement-end -->

### 証明の見取り図

内部Homへの射が等しいことを示すには、評価射へ戻して比較する。三つの写像を順に作用させる操作は、どの二つを先に合成しても同じ順序で評価することになる。

<!-- proof-start -->
### 証明

[評価とカリー化の普遍性](../../CAT/CAT4-05/index.md#thm-cat4-05-evaluation-curry)から $c,i$ は指定された型で一意に存在する。定義により

$$
e_{U,Z}(c_{U,W,Z}\otimes1_U)
=e_{W,Z}(1\otimes e_{U,W}).
$$

四対象 $U,W,Z,T$ を取る。結合律の二経路は $[Z,T]\otimes[W,Z]\otimes[U,W]$ から $[U,T]$ への射である。両経路を逆転置し、右端に $U$ を加えて評価すると、左の括弧付けでは

$$
\begin{aligned}
&e_{U,T}(c_{U,W,T}\otimes1_U)
(c_{W,Z,T}\otimes1\otimes1_U)\\
&=e_{W,T}(c_{W,Z,T}\otimes1_W)
(1\otimes1\otimes e_{U,W})\\
&=e_{Z,T}(1\otimes e_{W,Z})
(1\otimes1\otimes e_{U,W}).
\end{aligned}
$$

右の括弧付けでは

$$
\begin{aligned}
&e_{U,T}(c_{U,Z,T}\otimes1_U)
(1\otimes c_{U,W,Z}\otimes1_U)\\
&=e_{Z,T}(1\otimes e_{U,Z})
(1\otimes c_{U,W,Z}\otimes1_U)\\
&=e_{Z,T}(1\otimes e_{W,Z})
(1\otimes1\otimes e_{U,W}).
\end{aligned}
$$

最初の計算の中段はテンソル双関手の合成保存、二つの計算の最終行は合成の定義による。両者が一致し、転置の一意性から結合律を得る。

左単位の逆転置は

$$
e_{U,W}(c_{U,W,W}(i_W\otimes1)\otimes1_U)
=e_{W,W}(i_W\otimes e_{U,W})=e_{U,W}.
$$

右単位も

$$
e_{U,W}(c_{U,U,W}(1\otimes i_U)\otimes1_U)
=e_{U,W}(1\otimes e_{U,U}(i_U\otimes1_U))
=e_{U,W}.
$$

いずれも単位子で同一視した式であり、$e_{U,W}$ は $1_{[U,W]}$ の逆転置である。転置の一意性で左右単位律を得る。以上で[豊穣圏の公理](../CATB2-01/index.md#def-catb2-01-enriched-category)が全て成立する。
<!-- proof-end -->

例えば集合を基底とすれば $[U,W]$ は全写像の集合、$c(g,f)=g\circ f$、$i_U$ は恒等写像を指定する。ベクトル空間では[閉構造](../../CAT/CAT4-05/index.md#thm-cat4-05-vector-spaces)を使って、$[U,W]$ は線形写像のベクトル空間、$c$ は双線形な合成をテンソル積からの線形写像にしたものである。

## 3. 固定した対象から出るHomを関手にする

対象 $a$ を固定する。各 $x$ にHom対象 $\mathcal A(a,x)$ を割り当てるとき、$x$ から $y$ へのHom対象の作用は、$\mathcal A(a,x)$ の右から来る入力と合成することで作れる。

<a id="def-catb2-04-representable"></a>

<!-- formal-statement-start -->
> **定義（豊穣表現可能関手）**
>
> 局所小な右閉モノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal A$ と対象 $a$ に対し、共変な豊穣表現可能関手 $H_a:\mathcal A\to\underline{\mathcal V}$ は

$$
H_a(x)=\mathcal A(a,x),\qquad
(H_a)_{xy}=(m^\mathcal A_{axy})^\sharp
$$

> で指定される。ここで転置前の射は

$$
m^\mathcal A_{axy}:
\mathcal A(x,y)\otimes\mathcal A(a,x)\to\mathcal A(a,y)
$$

> であり、$\sharp$ は右閉構造による転置である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-04-representable -->
**定義の確認（有限集合）。** 通常の順序 $0<1$ を持つ二対象の圏を集合で豊穣化する。$a=0$ とすれば $H_0(0)=\{1_0\}$、$H_0(1)=\{s\}$（$s:0\to1$）。$s$ の作用は $1_0\mapsto s$。二つの恒等射の作用はそれぞれ一元集合の恒等写像である。非恒等射同士は合成できず、$s1_0=s=1_1s$ だから可能な全合成が保存される。恒等射も保存されるので確かに豊穣関手である。$a=1$ なら $H_1(0)=\varnothing$、$H_1(1)=\{1_1\}$ となり、固定点を変えると関手も変わる。
<!-- definition-example-end -->

<a id="prop-catb2-04-representable-functor"></a>

<!-- formal-statement-start -->
> **命題（表現可能関手の関手律）**
>
> 局所小な右閉モノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal A$ と対象 $a$ に対し、[豊穣表現可能関手](#def-catb2-04-representable)で指定した $H_a$ の構造射は合成と単位を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

Hom上の構造射の合成保存を評価へ戻すと、$\mathcal A$ の合成の結合律になる。単位保存も $\mathcal A$ の単位律に帰着する。

<!-- proof-start -->
### 証明

[豊穣関手の公理](../CATB2-03/index.md#def-catb2-03-enriched-functor)で合成保存を調べる。比較する射は

$$
(H_a)_{xz}m^\mathcal A_{xyz},\qquad
c((H_a)_{yz}\otimes(H_a)_{xy})
$$

で、いずれも $\mathcal A(y,z)\otimes\mathcal A(x,y)$ から $[\mathcal A(a,x),\mathcal A(a,z)]$ への射である。右に $\mathcal A(a,x)$ を加えて逆転置すると、それぞれ

$$
m^\mathcal A_{axz}(m^\mathcal A_{xyz}\otimes1),
\qquad
m^\mathcal A_{ayz}(1\otimes m^\mathcal A_{axy})
$$

となる。第二式では[自己豊穣化の合成](#thm-catb2-04-self-enrichment)の評価公式に二つの構造射を代入した。[豊穣圏の結合律](../CATB2-01/index.md#def-catb2-01-enriched-category)で二式は等しい。単位保存についても $(H_a)_{xx}j_x$ の逆転置は $m_{axx}(j_x\otimes1)$ であり、左単位律で恒等射になる。これは $i_{H_ax}$ の逆転置と一致する。従って両公理を満たす。
<!-- proof-end -->

## 4. 自然変換の集まりを対象にする

豊穣関手 $F,G:\mathcal A\to\underline{\mathcal V}$ を取る。構造射 $F_{xy}$ の逆転置を $d^F_{xy}$ と書く。

$$
d^F_{xy}:\mathcal A(x,y)\otimes Fx\to Fy.
$$

豊穣関手の公理を評価へ戻すと次の作用の法則になる。

$$
\begin{aligned}
d^F_{xz}(m_{xyz}\otimes1)&=d^F_{yz}(1\otimes d^F_{xy}),\\
d^F_{xx}(j_x\otimes1)&=1_{Fx}.
\end{aligned}
$$

ここで第一式の始域は $\mathcal A(y,z)\otimes\mathcal A(x,y)\otimes Fx$。第二式では左単位子を同一視した。逆に二式が成立すれば、転置の一意性から関手の公理が成立する。

普通の豊穣自然変換は $I\to[Fx,Gx]$ の族であった。もっと一般に任意の対象 $P$ からの射 $P\to[Fx,Gx]$ の族を考え、自然性を課す。$P$ を変換のパラメータと見なせば、全てのパラメータで自然性を満たす族を一つの対象で表したい。

<a id="def-catb2-04-natural-family"></a>

<!-- formal-statement-start -->
> **定義（豊穣自然変換のパラメータ付き族）**
>
> 局所小な対称右閉モノイダル圏 $\mathcal V$、その上の豊穣圏 $\mathcal A$、豊穣関手 $F,G:\mathcal A\to\underline{\mathcal V}$、基底の対象 $P$ を取る。射の族 $t_x:P\otimes Fx\to Gx$ がパラメータ付きの自然性を満たすとは、各 $x,y$ について

$$
t_y(1_P\otimes d^F_{xy})
=d^G_{xy}(1\otimes t_x)(\sigma_{P,\mathcal A(x,y)}\otimes1)
$$

> が成立することをいう。両辺の始域は $P\otimes\mathcal A(x,y)\otimes Fx$、終域は $Gy$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-04-natural-family -->
**定義の確認。** 集合の二対象の圏 $0\to1$ で $F=H_0$ とし、$G(0)=G(1)=\{0,1\}$、$G(s)=1_{\{0,1\}}$ とする。$P=\{p,q\}$、$t_0(p,1_0)=0,t_0(q,1_0)=1$、$t_1(p,s)=0,t_1(q,s)=1$ と置く。非恒等射 $s$ に対する左辺は $t_1(p,s)=0$ と $t_1(q,s)=1$、右辺も $G(s)$ が恒等写像なのでそれぞれ $0,1$。恒等射の条件は各 $t_x$ 自身に一致する。従って全ての自然性が成立する。
<!-- definition-example-end -->

特に $P=I$ なら転置により前講の[豊穣自然性](../CATB2-03/index.md#def-catb2-03-enriched-natural)と一致する。実際、前講の二経路を $Fx$ で逆転置すると、一方は $t_y(1\otimes d^F_{xy})$、他方は $d^G_{xy}(1\otimes t_x)$ となり、単位子と対称性の整合性で上の式に一致する。

<a id="def-catb2-04-natural-hom"></a>

<!-- formal-statement-start -->
> **定義（豊穣自然変換のHom対象）**
>
> 局所小な対称右閉・完備モノイダル圏 $\mathcal V$、対象集合が小さい豊穣圏 $\mathcal A$ と豊穣関手 $F,G:\mathcal A\to\underline{\mathcal V}$ を取る。
>
> $Q=\prod_x[Fx,Gx]$、$R=\prod_{x,y}[\mathcal A(x,y)\otimes Fx,Gy]$ とする。積の射影を $\pi_x$ とし、$v_x=e_{Fx,Gx}(\pi_x\otimes1):Q\otimes Fx\to Gx$ とする。二射 $L,R':Q\to R$ を、各成分の逆転置がそれぞれ

$$
v_y(1_Q\otimes d^F_{xy}),\qquad
d^G_{xy}(1\otimes v_x)(\sigma_{Q,\mathcal A(x,y)}\otimes1)
$$

> となるように定める。豊穣自然変換のHom対象 $N(F,G)$ は、この二射の等化子とする。

$$
k:N(F,G)\to Q,\qquad
L,R':Q\to R,\qquad Lk=R'k.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-04-natural-hom -->
**定義の確認。** 直前の有限集合の例では $Q$ は二つの一元集合から $\{0,1\}$ への写像の対、すなわち $\{0,1\}^2$ に同一視できる。恒等射の成分では $L,R'$ は一致し、$s$ の成分だけが二つの値の一致を要求する。従って等化子は $\{(0,0),(1,1)\}$ である。実際、この部分集合への包含は二射を等しくし、二射を等しくする任意の写像は像がこの部分集合に入り、一意に包含を経由する。
<!-- definition-example-end -->

<a id="prop-catb2-04-natural-hom-universal"></a>

<!-- formal-statement-start -->
> **命題（自然変換のHom対象の普遍性）**
>
> 局所小な対称右閉・完備モノイダル圏 $\mathcal V$ 上の小さい対象集合を持つ豊穣圏 $\mathcal A$ と豊穣関手 $F,G:\mathcal A\to\underline{\mathcal V}$ を取る。任意の $P\in\mathcal V$ に対し、[Hom対象](#def-catb2-04-natural-hom)への射 $P\to N(F,G)$ と、[パラメータ付き自然性](#def-catb2-04-natural-family)を満たす族 $t_x:P\otimes Fx\to Gx$ は、パラメータ $P$ について自然に一対一に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

積への射は成分の族、内部Homへの射は転置で二引数の射、等化子への射は二経路が一致する射である。この三つの普遍性を順に使う。

<!-- proof-start -->
### 証明

対象集合が小さいため $x$ と $(x,y)$ は小さい添字集合を走る。完備性により $Q,R$ と等化子が存在する。[小さい積の普遍性](../../CAT/CAT2-04/index.md#def-cat2-04-small-product)で射 $h:P\to Q$ は射の族 $\pi_xh:P\to[Fx,Gx]$ と一対一に対応する。[評価とカリー化](../../CAT/CAT4-05/index.md#thm-cat4-05-evaluation-curry)により、その族は

$$
t_x=v_x(h\otimes1_{Fx})
$$

と一対一に対応する。$Lh=R'h$ は、積 $R$ の各成分で一致することと同値である。各成分を逆転置すると

$$
\begin{aligned}
v_y(1_Q\otimes d^F_{xy})(h\otimes1\otimes1)
&=t_y(1_P\otimes d^F_{xy}),\\
d^G_{xy}(1\otimes v_x)(\sigma_{Q,\mathcal A(x,y)}\otimes1)
(h\otimes1\otimes1)
&=d^G_{xy}(1\otimes t_x)(\sigma_{P,\mathcal A(x,y)}\otimes1).
\end{aligned}
$$

第二式は対称性の自然性で $h$ を交換の後ろへ移した。従って $Lh=R'h$ は[パラメータ付き自然性](#def-catb2-04-natural-family)そのものである。[等化子の普遍性](../../CAT/CAT2-03/index.md#def-cat2-03-equalizer)からこの条件は $h=k\bar h$ となる唯一の $\bar h:P\to N(F,G)$ があることと同値である。

$P'\to P$ を $b$ とすれば $\bar h b$ に対応する族は

$$
v_x(k\bar h b\otimes1)=t_x(b\otimes1).
$$

よって対応はパラメータについて自然である。
<!-- proof-end -->

この構成は、単に単位対象 $I$ から出る射を集めるだけではない。例えば線形写像の豊穣圏なら積はベクトル空間の直積、等化子は二つの線形写像の差の核であるから、変換全体の線形構造を保持できる。

## 5. 恒等射で評価し、作用で復元する

$F$ を任意の豊穣関手とし、$H_a$ から $F$ への変換を考える。$t_x:P\otimes\mathcal A(a,x)\to Fx$ が与えられたら、$x=a$ として $j_a:I\to\mathcal A(a,a)$ を入力できる。逆に $P\to Fa$ から $F$ の作用を使って全成分を作れる。

<a id="thm-catb2-04-enriched-yoneda"></a>

<!-- formal-statement-start -->
> **定理（豊穣Yonedaの補題）**
>
> 局所小な対称右閉・完備モノイダル圏 $\mathcal V$、対象集合が小さい豊穣圏 $\mathcal A$、対象 $a$、豊穣関手 $F:\mathcal A\to\underline{\mathcal V}$ に対して、基底の圏における同型

$$
N(H_a,F)\cong Fa
$$

> がある。任意の対象 $P$ に対する射の対応は、自然性を満たす族 $t$ と射 $b:P\to Fa$ の間の次の逆対応である。

$$
b=t_a(1_P\otimes j_a),\qquad
t_x=d^F_{ax}(1\otimes b)\sigma_{P,\mathcal A(a,x)}.
$$

> 第一式では右単位子を同一視する。
<!-- formal-statement-end -->

### 証明の見取り図

自然性を対象対 $(a,x)$ について使い、$H_a(a)$ の入力を $j_a$ に固定する。すると $t_x$ は $t_a$ の恒等射での値だけから復元できる。逆にその復元公式が自然になる理由は $F$ の合成保存である。

<!-- proof-start -->
### 証明

まず $b:P\to Fa$ から定理の右式で $t_x$ を定める。自然性の始域を $P\otimes D\otimes E$、ただし $D=\mathcal A(x,y)$、$E=\mathcal A(a,x)$ とする。$M=m_{axy}:D\otimes E\to\mathcal A(a,y)$ と書く。左辺は

$$
\begin{aligned}
t_y(1_P\otimes M)
&=d^F_{ay}(1\otimes b)\sigma_{P,\mathcal A(a,y)}(1\otimes M)\\
&=d^F_{ay}(M\otimes b)\sigma_{P,D\otimes E}\\
&=d^F_{xy}(1_D\otimes d^F_{ax})
(1_D\otimes1_E\otimes b)\sigma_{P,D\otimes E}.
\end{aligned}
$$

第二行は対称性の自然性、第三行は $F$ の作用の合成律である。[組紐の六角形条件](../../CAT/CAT4-03/index.md#def-cat4-03-braiding)で

$$
\sigma_{P,D\otimes E}
=(1_D\otimes\sigma_{P,E})(\sigma_{P,D}\otimes1_E)
$$

と分解できる。従って左辺は

$$
d^F_{xy}(1_D\otimes t_x)(\sigma_{P,D}\otimes1_E)
$$

となり、[パラメータ付き自然性](#def-catb2-04-natural-family)の右辺に一致する。

次に $b$ から作った族を恒等射で評価する。対称性の自然性と単位子の整合性で $\sigma_{P,\mathcal A(a,a)}(1_P\otimes j_a)$ は $j_a\otimes1_P$ に一致するので

$$
t_a(1_P\otimes j_a)
=d^F_{aa}(j_a\otimes b)
=1_{Fa}b=b.
$$

逆向きを示す。自然性を満たす任意の族 $t$ を取って $b=t_a(1_P\otimes j_a)$ と定める。自然性を $(a,x)$ に適用し、$E=\mathcal A(a,x)$ とおく。

$$
t_x(1_P\otimes m_{aax})
=d^F_{ax}(1_E\otimes t_a)(\sigma_{P,E}\otimes1).
$$

両辺に $1_P\otimes1_E\otimes j_a$ を前合成する。左辺は $\mathcal A$ の右単位律で $t_x$ になる。右辺は

$$
\begin{aligned}
&d^F_{ax}(1_E\otimes t_a)
(\sigma_{P,E}\otimes j_a)\\
&=d^F_{ax}(1_E\otimes(t_a(1_P\otimes j_a)))\sigma_{P,E}\\
&=d^F_{ax}(1_E\otimes b)\sigma_{P,E}.
\end{aligned}
$$

よって元の族が復元される。これで二操作が互いに逆である。

最後に、射の集合の全単射だけでなく対象の同型を得ることを確認する。$N=N(H_a,F)$ とし、[Hom対象の普遍性](#prop-catb2-04-natural-hom-universal)で $1_N$ に対応する族を $w_x:N\otimes H_ax\to Fx$ とする。評価による射を $E=w_a(1_N\otimes j_a):N\to Fa$ と置く。逆方向の射 $B:Fa\to N$ は $P=Fa,b=1_{Fa}$ から復元した族に対応する射とする。

$EB=1_{Fa}$ は $B$ の族を評価する上の計算から従う。$BE$ に対応する族は、パラメータを $E:N\to Fa$ で変えるので

$$
d^F_{ax}(1\otimes E)\sigma_{N,\mathcal A(a,x)}.
$$

これは $w$ を恒等射で評価して復元した族であり、上の逆向きの計算で $w_x$ に等しい。普遍性の一意性により $BE=1_N$。従って $E,B$ は互いに逆の射である。
<!-- proof-end -->

ここで重要なのは、任意の $P$ を使ったことである。一般の基底では $I$ からの射だけで対象や射の全情報を読み取れるとは限らない。完備性は変換のHom対象を積と等化子で構成するため、閉性は変換の族を内部Homで表すために使った。表現可能関手に対する自然な族と $Fa$ の射の逆対応自体は、積や等化子の存在に依存しない。

## 6. 二変数での自然性と反変形

表現可能関手と $F$ のどちらを変えても、恒等射での評価がその変化と両立するかを確かめる。

<a id="prop-catb2-04-yoneda-natural"></a>

<!-- formal-statement-start -->
> **命題（豊穣Yoneda同型の自然性）**
>
> [豊穣Yonedaの補題](#thm-catb2-04-enriched-yoneda)の仮定の下で、同型 $E_{a,F}:N(H_a,F)\to Fa$ は台となる圏の射 $u:a\to b$ と豊穣自然変換 $\beta:F\Rightarrow G$（$G:\mathcal A\to\underline{\mathcal V}$）に関して自然である。すなわち $u$ による $H_b\to H_a$ の前合成、および $\beta$ による後合成で誘導される射をそれぞれ $u^*,\beta_*$ とすると

$$
E_{b,F}u^*=F_0(u)E_{a,F},\qquad
E_{a,G}\beta_*=\beta_a E_{a,F}
$$

> が成立する。ここで $\beta_a$ は評価で得る基底の通常の射 $Fa\to Ga$ である。
<!-- formal-statement-end -->

### 証明の見取り図

前合成は新しい恒等射を $u$ に送るので、評価の結果は $F(u)$ を作用させたものになる。後合成では評価と成分 $\beta_a$ の適用の順番を交換できる。

<!-- proof-start -->
### 証明

$u$ を[台となる圏の構成](../CATB2-01/index.md#thm-catb2-01-underlying-category)により $I\to\mathcal A(a,b)$ と読む。各 $x$ で

$$
h_x=m_{abx}(1\otimes u):H_bx\to H_ax
$$

を定める。$h_y m_{bxy}=m_{axy}(1\otimes h_x)$ が成立する。実際、左辺は $m_{aby}(m_{bxy}\otimes1)$ に $1\otimes1\otimes u$ を前合成した射、右辺は $m_{axy}(1\otimes m_{abx})$ に同じ射を前合成したものであり、結合律で等しい。従って $h$ は豊穣自然変換である。

族 $t_x:P\otimes H_ax\to Fx$ の前合成を $s_x=t_x(1_P\otimes h_x)$ とする。自然性の左辺は

$$
\begin{aligned}
s_y(1_P\otimes m_{bxy})
&=t_y(1_P\otimes m_{axy})(1_P\otimes1\otimes h_x)\\
&=d^F_{xy}(1\otimes s_x)(\sigma_{P,\mathcal A(x,y)}\otimes1).
\end{aligned}
$$

第二行は $t$ の自然性である。従って $s$ は自然で、$P=N(H_a,F)$ の普遍族に適用すれば $u^*$ が得られる。単位律から $h_bj_b=u$。従って $s$ を評価すると

$$
s_b(1_P\otimes j_b)=t_b(1_P\otimes u)
=d^F_{ab}(u\otimes E_{a,F}p)
$$

となる。ただし最後の式の $p:P\to N(H_a,F)$ は $t$ を表す射であり、[豊穣Yonedaの復元公式](#thm-catb2-04-enriched-yoneda)を使った。右辺は $F_0(u)E_{a,F}p$ である。$p=1$ とすれば第一の自然性を得る。

$\beta$ の成分を基底の射 $\beta_x:Fx\to Gx$ と読む。自然性は $\beta_y d^F_{xy}=d^G_{xy}(1\otimes\beta_x)$ である。後合成した族 $s_x=\beta_xt_x$ に対し

$$
\begin{aligned}
s_y(1_P\otimes m_{axy})
&=\beta_y d^F_{xy}(1\otimes t_x)(\sigma\otimes1)\\
&=d^G_{xy}(1\otimes s_x)(\sigma\otimes1)
\end{aligned}
$$

なので再び自然である。$P=N(H_a,F)$ の普遍族から $\beta_*$ を得る。恒等射での評価は $s_a(1\otimes j_a)=\beta_at_a(1\otimes j_a)$。これで第二の自然性が成立する。
<!-- proof-end -->

特に $F=H_b$ を代入すれば

$$
N(H_a,H_b)\cong\mathcal A(b,a).
$$

共変表現可能関手では添字の向きが逆になる。この同型は豊穣版のYoneda埋め込みのHom上の計算である。

### 6.1 Hom対象全体についての両立性

直前の命題は単位対象からの射に対する自然性を述べた。実際には、パラメータ付きの自然な族を使えば、より強いHom対象上の両立性も確認できる。

まず $D=\mathcal A(a,b)$ とする。$t_x:P\otimes H_ax\to Fx$ を $p:P\to N(H_a,F)$ に対応する族とし、前合成のパラメータを $D$ 全体へ拡張する。

$$
s_x=t_x(1_P\otimes m_{abx}):
P\otimes H_bx\otimes D\to Fx.
$$

$H_bx$ と $D$ を対称性で交換すれば、$P\otimes D$ をパラメータとする族になる。その自然性は、$\mathcal A(x,y)\otimes H_bx\otimes D$ 上の結合律

$$
m_{aby}(m_{bxy}\otimes1_D)
=m_{axy}(1\otimes m_{abx})
$$

と $t$ の自然性から得られる。具体的に、$P,D,\mathcal A(x,y),H_bx$ の順の入力を二経路とも $P,\mathcal A(x,y),H_bx,D$ の順に並べ直し、左経路では $m_{bxy}$ の後に $m_{aby}$、右経路では $m_{abx}$ の後に $m_{axy}$ を作用させる。結合律で一致し、さらに $t_y$ の自然性を使うと $d^F_{xy}$ を最後に作用させる経路に一致する。交換は対称性の自然性と六角形条件で同じ置換に整理される。

この族を $j_b$ で評価すると $m_{abb}(j_b\otimes1_D)=1_D$ だから $t_b:P\otimes D\to Fb$ そのものになる。[豊穣Yonedaの復元公式](#thm-catb2-04-enriched-yoneda)で

$$
t_b=d^F_{ab}(1_D\otimes E_{a,F}p)\sigma_{P,D}.
$$

特に $P=N(H_a,F)$ と $p=1_P$ を選ぶと、前合成のHom対象上の作用と $F$ のHom対象上の作用が評価同型で結ばれる。

後合成についても、$q:S\to N(F,G)$ に対応する族を $v_x:S\otimes Fx\to Gx$ とすれば、$v_x(1_S\otimes t_x)$ は $S\otimes P$ をパラメータとする自然な族になる。自然性の左辺にまず $t$ の自然性を代入すると $d^F_{xy}$ が $v_y$ の直前に現れる。次に $v$ の自然性

$$
v_y(1_S\otimes d^F_{xy})
=d^G_{xy}(1\otimes v_x)(\sigma_{S,\mathcal A(x,y)}\otimes1)
$$

を代入すると、$d^G_{xy}$ が最後に作用する右辺になる。二回の交換は六角形条件で $S\otimes P$ と $\mathcal A(x,y)$ の交換に等しい。$j_a$ で評価すれば

$$
v_a(1_S\otimes t_a)(1_{S\otimes P}\otimes j_a)
=v_a(1_S\otimes E_{a,F}p).
$$

$S=N(F,G)$、$P=N(H_a,F)$、$q=1_S,p=1_P$ とすれば、後合成のHom対象上の作用と評価での作用も両立する。この二つの計算が、単位対象からの射だけに限定しない自然性の内容である。

### 6.2 反変形

反変形も得られる。対称基底の上で $\mathcal A^{\mathrm{op}}(x,y)=\mathcal A(y,x)$ と置き、合成は二つのHom因子を対称性で交換してから $\mathcal A$ で合成する。三入力では二通りの括弧付けとも因子を逆順にする同じ置換になる（六角形条件と対称性）。その後の合成は $\mathcal A$ の結合律で一致する。単位は同じ $j_x$ を使い、左右単位律が入れ替わる。従って豊穣圏である。

[豊穣Yonedaの補題](#thm-catb2-04-enriched-yoneda)で、対象圏を $\mathcal A^{\mathrm{op}}$、豊穣関手を $F:\mathcal A^{\mathrm{op}}\to\underline{\mathcal V}$ とする。このとき表現可能関手の値は $\mathcal A^{\mathrm{op}}(a,x)=\mathcal A(x,a)$ なので

$$
N(\mathcal A(-,a),F)\cong Fa
$$

が得られる。反変形での復元は $\mathcal A^{\mathrm{op}}$ の作用 $d^F_{ax}:\mathcal A(x,a)\otimes Fa\to Fx$ を用いる。次講の重みを扱うときに、この向きの区別が重要になる。

## 7. 距離情報を失わない例

二点 $a,b$ の距離を $d(a,b)=2,d(b,a)=5$ とし、対角をゼロとする。[Lawvere型拡張距離](../CATB2-02/index.md#def-catb2-02-lawvere-metric)の三角不等式は、中間点が始点または終点なら等号、始点と終点が同じなら非負性で成立する。

基底は[Lawvere距離の基底](../CATB2-02/index.md#def-catb2-02-lawvere-base)で、射 $u\to v$ は数として $u\ge v$ のときに存在し、テンソルは加法、単位は $0$。任意の小さい族の積は数としての上限で、平行な二射は必ず同じなので等化子は恒等射である。内部Hom $[u,v]$ は $p+u\ge v$ と $p\ge[u,v]$ が同値となる残余である。$u$ が有限なら $[u,v]=\max(v-u,0)$（$v=\infty$ なら $\infty$）、$u=\infty$ なら常に $[u,v]=0$。これで閉性も確認できる。

$H_a(x)=d(a,x)$、$H_b(x)=d(b,x)$ とする。豊穣Yonedaによる $N(H_a,H_b)$ は $d(b,a)=5$。構成から直接計算しても、積 $Q$ は

$$
\sup_{x\in\{a,b\}}[d(a,x),d(b,x)]
=\max([0,5],[2,0])=5.
$$

$L,R'$ は平行射なので等しく、等化子は $Q$ 自身である。逆向きも $N(H_b,H_a)=\max([5,0],[0,2])=2$ になる。通常の自然変換としてはどちらも $0\to5$ または $0\to2$ が存在しないため検出できないが、Hom対象を使えば異なる正の費用をそのまま取り出せる。

## 8. 演習

### CATB2-04-A01 内部Homの合成

- Level: A

集合 $U=\{0,1\},W=\{a,b\},Z=\{2,3\}$ に対して $f(0)=b,f(1)=a,g(a)=2,g(b)=3$ とする。自己豊穣化の合成と単位を求めよ。

<!-- solution-start -->
**詳細解答。** [自己豊穣化の合成](#thm-catb2-04-self-enrichment)は $(g,f)$ を二度評価する。$c(g,f)(0)=g(b)=3$、$c(g,f)(1)=g(a)=2$。単位 $i_U$ は一元集合から $1_U$ を選ぶ写像であり、$1_U(0)=0,1_U(1)=1$。従って $c(f,1_U)(0)=b,c(f,1_U)(1)=a$ で $f$ に戻る。
<!-- solution-end -->

### CATB2-04-A02 構造射の向き

- Level: A

$H_a$ の構造射 $(H_a)_{xy}$ の始域と終域を求め、その逆転置を書け。

<!-- solution-start -->
**詳細解答。** [豊穣表現可能関手](#def-catb2-04-representable)で $H_ax=\mathcal A(a,x)$、$H_ay=\mathcal A(a,y)$。自己豊穣化のHom対象は内部Homなので

$$
(H_a)_{xy}:\mathcal A(x,y)\to[\mathcal A(a,x),\mathcal A(a,y)].
$$

[評価の普遍性](../../CAT/CAT4-05/index.md#thm-cat4-05-evaluation-curry)で逆転置すると

$$
\mathcal A(x,y)\otimes\mathcal A(a,x)
\xrightarrow{m_{axy}}\mathcal A(a,y).
$$

先に $a\to x$、次に $x\to y$ を合成するため、Hom因子の型はこの順序になる。
<!-- solution-end -->

### CATB2-04-A03 有限集合での評価と復元

- Level: A

二対象の圏 $a\xrightarrow{s}x$ を集合で豊穣化する。$F(a)=\{0,1\}$、$F(x)=\{2,3,4\}$、$F(s)(0)=4,F(s)(1)=2$ とする。$v=1$ に対応する自然変換 $H_a\Rightarrow F$ を求めよ。

<!-- solution-start -->
**詳細解答。** [豊穣Yonedaの補題](#thm-catb2-04-enriched-yoneda)を $P=I$ に適用する。成分は $t_a(1_a)=F(1_a)(1)=1$、$t_x(s)=F(s)(1)=2$。恒等射の自然性はその成分自身に一致し、$s$ に対して $t_x(s1_a)=2=F(s)t_a(1_a)$ なので自然である。評価すると $1$ に戻る。
<!-- solution-end -->

### CATB2-04-A04 等化子の計算

- Level: A

集合の二対象の圏 $a\to x$ で、$H_a$ と、$F(a)=\{0,1\}$、$F(x)=\{2,3\}$、$F(s)(0)=F(s)(1)=2$ を取る。$N(H_a,F)$ を積と等化子で直接計算せよ。

<!-- solution-start -->
**詳細解答。** [Hom対象の定義](#def-catb2-04-natural-hom)で積 $Q$ は $\{0,1\}\times\{2,3\}$。四つの対のうち、自然性は非恒等射について第二成分が第一成分の $F(s)$ による像であることを要求する。恒等射については全て成立する。従って $(0,2),(1,2)$ だけが等化子に残る。第一射影が $\{0,1\}$ への全単射で、逆は $v\mapsto(v,2)$ となる。
<!-- solution-end -->

### CATB2-04-B01 パラメータを持つ自然な族

- Level: B

A03 の圏と関手で $P=\{p,q,r\}$ とする。$b(p)=0,b(q)=1,b(r)=0$ から族を構成し、自然性と評価による復元を確認せよ。

<!-- solution-start -->
**詳細解答。** [復元公式](#thm-catb2-04-enriched-yoneda)で $t_a(z,1_a)=b(z)$、$t_x(z,s)=F(s)b(z)$。従って $t_a$ の値は順に $0,1,0$、$t_x$ は $4,2,4$。非恒等射の自然性の左辺は $t_x(z,s1_a)=t_x(z,s)$、右辺は $F(s)t_a(z,1_a)$ であり、$p,q,r$ の三点でそれぞれ $4=4,2=2,4=4$。恒等射については $t_a,t_x$ 自身が両辺になる。恒等射で評価すれば $z\mapsto t_a(z,1_a)=b(z)$ となり、三点全てで元に戻る。
<!-- solution-end -->

### CATB2-04-B02 前合成の向きと自然性

- Level: B

通常の圏を集合で豊穣化し、$u:a\to b$、$v\in F(a)$ を取る。$v$ から復元した $H_a\Rightarrow F$ に $H_b\Rightarrow H_a$ を前合成し、$1_b$ で評価した値を求めよ。さらに $g:b\to x$ での成分を直接計算せよ。

<!-- solution-start -->
**詳細解答。** [自然性の命題](#prop-catb2-04-yoneda-natural)で $H_b\to H_a$ の成分は $g\mapsto gu$。元の族は $f\mapsto F(f)(v)$ なので合成は

$$
g\mapsto F(gu)(v)=F(g)(F(u)(v)).
$$

$g=1_b$ を代入すると $F(1_b)(F(u)(v))=F(u)(v)$。これは $H_b$ の恒等射で評価した値である。その値から復元した成分も $F(g)(F(u)(v))$ なので、任意の $x,g$ で一致する。$H_a\to H_b$ と向きを取り違えると $gu$ が合成できない。
<!-- solution-end -->

### CATB2-04-B03 非対称な費用

- Level: B

三点 $0,1,3$ の費用を $d(x,y)=\max(y-x,0)$ とする。$N(H_1,H_3)$ と $N(H_3,H_1)$ を内部Homの積で計算し、Yonedaの補題でも照合せよ。

<!-- solution-start -->
**詳細解答。** 非負性と $d(x,x)=0$ は定義から従う。任意の実数 $r,s$ で $\max(r+s,0)\le\max(r,0)+\max(s,0)$ なので $r=y-x,s=z-y$ を代入して三角不等式を得る。従って[距離の豊穣化](../CATB2-02/index.md#thm-catb2-02-lawvere-enrichment)が使える。

$x=0,1,3$ の順に $H_1$ は $0,0,2$、$H_3$ は $0,0,0$。基底の内部Homは有限値について $[u,v]=\max(v-u,0)$ である。積は上限、平行射は等しいので等化子は恒等射。よって

$$
N(H_1,H_3)=\max(0,0,0)=0,
$$

$$
N(H_3,H_1)=\max(0,0,2)=2.
$$

[豊穣Yonedaの補題](#thm-catb2-04-enriched-yoneda)でそれぞれ $d(3,1)=0$、$d(1,3)=2$。一致する。単位 $0$ からの射は前者には存在し後者には存在しない。
<!-- solution-end -->

### CATB2-04-C01 線形構造ごとの復元

- Level: C

体 $k$ 上のベクトル空間を基底とする一対象の豊穣圏 $\mathcal A$ を考える。Hom対象 $D$ は基底 $1,\varepsilon$ を持つ二次元ベクトル空間で、合成は双線形な積 $(a+b\varepsilon)(c+d\varepsilon)=ac+(ad+bc)\varepsilon$、単位は $1$ とする（この代数は双対数の代数と呼ばれる）。$F$ は唯一の対象を $k^2$ に送り、作用を

$$
(a+b\varepsilon)\cdot(x,y)=(ax+by,ay)
$$

とする。$F$ が豊穣関手となることを示し、$N(H_*,F)$ を線形写像 $D\to k^2$ の部分空間として求めよ。恒等射での評価と復元を具体的に確認せよ。

<!-- solution-start -->
**詳細解答。** $D$ の積は $(a+b\varepsilon)(c+d\varepsilon)=ac+(ad+bc)\varepsilon$。単位は $1+0\varepsilon$。第三の因子を $e+f\varepsilon$ とすると、左の括弧付けでは定数項 $ace$、$\varepsilon$ の係数は $acf+(ad+bc)e$。右の括弧付けでは定数項 $ace$、$\varepsilon$ の係数は $a(cf+de)+bce$。展開すると共に $acf+ade+bce$ なので結合律が成立する。左右から $1$ を掛けても元の係数は変わらない。積と作用は各変数に線形で、[ベクトル空間の閉構造](../../CAT/CAT4-05/index.md#thm-cat4-05-vector-spaces)のテンソル積からの線形写像を定める。

まず作用の合成を確認する。$A=a+b\varepsilon,B=c+d\varepsilon$ として

$$
\begin{aligned}
A\cdot(B\cdot(x,y))
&=A\cdot(cx+dy,cy)\\
&=(acx+ady+bcy,acy)\\
&=(AB)\cdot(x,y).
\end{aligned}
$$

また $1\cdot(x,y)=(x,y)$。従って第4節の作用の法則を満たし、転置すれば[豊穣関手](../CATB2-03/index.md#def-catb2-03-enriched-functor)になる。$H_*$ の作用は $D$ 自身への左乗法である。

[Hom対象の定義](#def-catb2-04-natural-hom)では $Q=[D,k^2]$、自然性は線形写像 $T:D\to k^2$ に対して $T(AB)=A\cdot T(B)$ が全ての $A,B\in D$ で成立することである。これは二つの線形写像の等化子、すなわち条件を満たす部分空間を与える。$B=1$ と置くと $T(A)=A\cdot T(1)$。$T(1)=(s,t)$ と書けば

$$
T(a+b\varepsilon)=(as+bt,at).
$$

逆にこの式で $T$ を定めると $a,b$ に線形であり、作用の合成律から

$$
T(AB)=(AB)\cdot(s,t)=A\cdot(B\cdot(s,t))=A\cdot T(B)
$$

なので条件を満たす。基底 $1,\varepsilon$ と $k^2$ の標準基底による行列表示は

$$
\begin{pmatrix}s&t\\t&0\end{pmatrix}
$$

である。第一列は $T(1)$、第二列は $\varepsilon\cdot(s,t)=(t,0)$ から得た。従ってこの行列全体は二次元ベクトル空間で、第一列を取る線形写像は $k^2$ への同型である。逆写像は $(s,t)$ を上の行列へ送る線形写像。[豊穣Yonedaの補題](#thm-catb2-04-enriched-yoneda)が集合の全単射だけでなく線形同型を与える具体例となった。
<!-- solution-end -->

## 9. 次に向けて

自然な族を表すHom対象と、表現可能関手からの変換を恒等射で評価する公式を得た。次講では、どのような族を取り出すかを指定する関手を重みとして、極限や余極限をHom対象による普遍性で定義する。

参考文献：G. M. Kelly, [Basic Concepts of Enriched Category Theory](https://www.tac.mta.ca/tac/reprints/articles/10/tr10abs.html), 第1・2章。
