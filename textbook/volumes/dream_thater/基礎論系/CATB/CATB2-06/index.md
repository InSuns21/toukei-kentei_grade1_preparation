# CATB2-06 豊穣随伴と豊穣Kan拡張

## 1. Homの構造を失わずに拡張する

通常の[随伴](../../CAT/CAT2-08/index.md#def-cat2-08-adjunction)は二つのHom集合の自然な全単射を与える。しかし線形写像の空間や距離をHomに持つ場合、射の集合だけでなく、その構造も対応させたい。前講で得た重み付きの普遍性は、まさにHom対象の同型を要求していた。本講ではこの二つを結び、図式の定義域を広げる操作を構成する。

基底 $\mathcal V$ は局所小な対称右閉・完備モノイダル圏とする。単位は $I$、内部Homは $[U,Z]$ とする。[自己豊穣化](../CATB2-04/index.md#thm-catb2-04-self-enrichment)により基底自身も豊穣圏とみなせる。すべての圏・関手・自然変換は、特に断らない限りこの基底上の豊穣なものとする。合成は $m$ と書き、通常の射の順序と同じく後に作用する因子を左に置く。括弧や単位子は [Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence) により省略する。因子を交換するときは対称性を使う。

以下の $N(S,T)$ は小さい対象集合を持つ定義域上の関手間の[豊穣自然変換のHom対象](../CATB2-04/index.md#def-catb2-04-natural-hom)である。任意のパラメータ対象 $P$ からこれへの射は、各対象での $P$ を入力に含む成分が豊穣自然性を満たすことと同値である。以下の証明では、一般化された元を実際の元と混同しないよう、テンソル積を定義域とする射の等式として計算する。

## 2. 豊穣随伴

例えば集合で固定集合 $S$ との直積は写像集合を作る操作と随伴になる。ベクトル空間では同じ役割をテンソル積と線形写像の空間が果たす。どちらの場合も転置はHomの構造を保つ。

<a id="def-catb2-06-enriched-adjunction"></a>

<!-- formal-statement-start -->
> **定義（豊穣随伴）**
>
> 対称モノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal A,\mathcal B$ と豊穣関手 $F:\mathcal A\to\mathcal B$, $G:\mathcal B\to\mathcal A$ を取る。豊穣随伴 $F\dashv G$ とは、各対象 $a,b$ に対する $\mathcal V$ の同型

$$
\theta_{a,b}:\mathcal B(Fa,b)\xrightarrow{\sim}\mathcal A(a,Gb)
$$

> があり、二変数に関して豊穣自然であることをいう。すなわち、次の二つの等式が成り立つ（右辺の $m$ は各圏の合成）。

$$
\theta_{a',b}m(1\otimes F_{a',a})=m(\theta_{a,b}\otimes1).
$$

> この式の定義域は $\mathcal B(Fa,b)\otimes\mathcal A(a',a)$ である。第二変数についての条件は次式であり、その定義域は $\mathcal B(b,b')\otimes\mathcal B(Fa,b)$ である。

$$
\theta_{a,b'}m=m(G_{b,b'}\otimes\theta_{a,b}).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-06-enriched-adjunction -->
**定義の確認**。 集合を基底とし、$F(X)=X\times S$、$G(Y)=Y^S$ とする。射 $u:X'\to X$ は $u\times1_S$ へ、射 $v:Y\to Y'$ は $h\mapsto v h$ へ送る。いずれも恒等射と合成を保つ。転置と逆転置は

$$
\theta(f)(x)(s)=f(x,s),\qquad
\theta^{-1}(g)(x,s)=g(x)(s)
$$

である。両操作を連続して適用すると全ての $x,s$ で元に戻る。第一変数については

$$
\theta(f(u\times1_S))(x')(s)
=f(u(x'),s)=\theta(f)(u(x'))(s).
$$

第二変数については

$$
\theta(vf)(x)(s)=v(f(x,s))=(Gv)(\theta(f)(x))(s).
$$

集合ではテンソル積は直積なので、これはすべての入力に対する二つの構造射の等式そのものである。従って豊穣随伴である。
<!-- definition-example-end -->

単位からのHomを $\theta$ に適用すれば、[台となる圏](../CATB2-01/index.md#thm-catb2-01-underlying-category)の射の全単射を得る。二つの豊穣自然性の式に単位からの射を代入すれば通常の自然性が得られる。ただし台の射だけを調べて豊穣自然性を結論することは一般にはできない。

## 3. 随伴は重み付きの普遍性を運ぶ

左随伴が余極限を保つという通常の性質には、Hom対象の同型を使った強い形がある。重み付きの脚の構造も保たれる。

<a id="thm-catb2-06-preservation"></a>

<!-- formal-statement-start -->
> **定理（豊穣随伴による重み付き余極限・極限の保存）**
>
> 局所小な対称右閉・完備モノイダル圏を基底とする豊穣随伴 $F:\mathcal A\rightleftarrows\mathcal B:G$ と、対象集合が小さい豊穣圏 $\mathcal J$ を取る。
>
> 反変重み $W:\mathcal J^{\mathrm{op}}\to\underline{\mathcal V}$ と図式 $D:\mathcal J\to\mathcal A$ の重み付き余極限 $Q=W\star D$ が存在すれば、$FQ$ は重み $W$ による $FD$ の余極限である。
>
> 共変重み $U:\mathcal J\to\underline{\mathcal V}$ と図式 $E:\mathcal J\to\mathcal B$ の重み付き極限 $L=\{U,E\}$ が存在すれば、$GL$ は重み $U$ による $GE$ の極限である。
<!-- formal-statement-end -->

### 証明の見取り図

随伴で試験対象を移し、前講の[余極限](../CATB2-05/index.md#def-catb2-05-weighted-colimit)・[極限](../CATB2-05/index.md#def-catb2-05-weighted-limit)の同型を使い、再び随伴で図式の各成分を移す。合成が候補の脚から誘導される射であることまで確認する。

<!-- proof-start -->
### 証明

余極限の脚を $\iota_j:Wj\to\mathcal A(Dj,Q)$ とする。候補の脚は $F_{Dj,Q}\iota_j$ である。$F$ が合成を保つため、$\iota$ の自然性を表す等式に $F$ を適用すると候補の脚の自然性になる。任意の $b$ に対して

$$
\begin{aligned}
\mathcal B(FQ,b)
&\cong\mathcal A(Q,Gb)\\
&\cong N(W,\mathcal A(D-,Gb))\\
&\cong N(W,\mathcal B(FD-,b)).
\end{aligned}
$$

第二行は[重み付き余極限の定義](../CATB2-05/index.md#def-catb2-05-weighted-colimit)による。第三行では各成分に $\theta_{Dj,b}^{-1}$ を後合成する。第一変数の豊穣自然性が図式の射に沿う整合条件を保つため、この操作と逆操作は自然な族を互いに移す。任意のパラメータ $P$ でも同じ等式が成立するので、[Hom対象の普遍性](../CATB2-04/index.md#prop-catb2-04-natural-hom-universal)で基底の同型が得られる。

さらにこの合成を成分で調べる。第一変数の自然性に $\iota_j$ を代入した等式は、定義域 $\mathcal B(FQ,b)\otimes Wj$ 上で

$$
\theta_{Dj,b}m(1\otimes F_{Dj,Q}\iota_j)
=m(\theta_{Q,b}\otimes\iota_j)
$$

となる。従って $\theta_{Dj,b}^{-1}$ で戻すと候補の脚との後合成そのものになる。よって余極限の誘導射は同型である。

極限側の脚を $\lambda_j:Uj\to\mathcal B(L,Ej)$ とする。候補の脚は $G_{L,Ej}\lambda_j$ であり、関手律から自然性を持つ。任意の $a$ に対して

$$
\begin{aligned}
\mathcal A(a,GL)
&\cong\mathcal B(Fa,L)\\
&\cong N(U,\mathcal B(Fa,E-))\\
&\cong N(U,\mathcal A(a,GE-)).
\end{aligned}
$$

ここでは[重み付き極限の定義](../CATB2-05/index.md#def-catb2-05-weighted-limit)と第二変数の豊穣自然性を使う。最後の同型は成分に $\theta_{a,Ej}$ を後合成し、逆にその逆同型を後合成することで得る。定義域 $Uj\otimes\mathcal B(Fa,L)$ 上で

$$
\theta_{a,Ej}m(\lambda_j\otimes1)
=m(G_{L,Ej}\lambda_j\otimes\theta_{a,L})
$$

が成り立つため、合成同型は候補の脚による前合成である。従って極限の誘導射も同型である。
<!-- proof-end -->

例えば集合で二元集合との直積は二つのコピーを作る操作であり、余積の各成分を二つずつ複製する。一方、写像集合 $Y^S$ は積の各成分を独立に評価できるので積を保つ。この保存性は存在する極限・余極限についての主張であり、任意の重み付き極限の存在を保証するものではない。

## 4. 定義域を広げる二つの方法

豊穣関手 $K:\mathcal J\to\mathcal D$ と $T:\mathcal J\to\mathcal C$ が与えられたとする。$\mathcal D$ 上の関手を作り、その $K$ に沿う制限を $T$ と比較したい。ここでは $\mathcal J,\mathcal D$ の対象集合を小さいと仮定する。これにより両方の定義域上で $N$ が存在する。

通常の [左Kan拡張](../../CAT/CAT3-06/index.md#def-cat3-06-left-kan) と [右Kan拡張](../../CAT/CAT3-06/index.md#def-cat3-06-right-kan) では、比較自然変換の向きが異なる。豊穣な場合は対応する変換のHom対象全体の同型を求める。

<a id="def-catb2-06-left-kan"></a>

<!-- formal-statement-start -->
> **定義（豊穣左Kan拡張）**
>
> 局所小な対称右閉・完備モノイダル圏上の豊穣関手 $K:\mathcal J\to\mathcal D$, $T:\mathcal J\to\mathcal C$ を取る。$\mathcal J,\mathcal D$ の対象集合は小さいとする。
>
> 豊穣関手 $L:\mathcal D\to\mathcal C$ と豊穣自然変換 $\eta:T\Rightarrow LK$ が豊穣左Kan拡張をなすとは、任意の豊穣関手 $H:\mathcal D\to\mathcal C$ に対して $\eta$ から誘導される射

$$
N(L,H)\longrightarrow N(T,HK)
$$

> が基底の同型となることをいう。成分では変換を $K$ に沿って制限し、$\eta$ と前合成する。$L$ を $\operatorname{Lan}_K T$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-06-left-kan -->
**定義の確認**。 集合を基底とし、$\mathcal J$ を一対象・恒等射のみの圏、$\mathcal D$ を矢印 $0\to1$ の圏とする。$K$ は対象を $0$ に送る。$T$ の値を集合 $A$ とする。$L$ を $A\xrightarrow{1_A}A$、$\eta$ を $1_A$ と置く。任意の関手 $H=(B\xrightarrow{h}C)$ に対する変換 $L\Rightarrow H$ は二写像 $f:A\to B$, $g:A\to C$ で $g=hf$ を満たすものとなる。従って誘導射は $(f,hf)\mapsto f$、逆は $f\mapsto(f,hf)$ である。互いに逆なので集合のHom対象の同型になる。
<!-- definition-example-end -->

右向きでは比較射が制限から $T$ へ向かうため、普遍性の試験関手も逆向きになる。

<a id="def-catb2-06-right-kan"></a>

<!-- formal-statement-start -->
> **定義（豊穣右Kan拡張）**
>
> 局所小な対称右閉・完備モノイダル圏上の豊穣関手 $K:\mathcal J\to\mathcal D$, $T:\mathcal J\to\mathcal C$ を取る。$\mathcal J,\mathcal D$ の対象集合は小さいとする。
>
> 豊穣関手 $R:\mathcal D\to\mathcal C$ と豊穣自然変換 $\epsilon:RK\Rightarrow T$ が豊穣右Kan拡張をなすとは、任意の豊穣関手 $H:\mathcal D\to\mathcal C$ に対して $\epsilon$ から誘導される射

$$
N(H,R)\longrightarrow N(HK,T)
$$

> が基底の同型となることをいう。成分では制限の後に $\epsilon$ を後合成する。$R$ を $\operatorname{Ran}_K T$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-06-right-kan -->
**定義の確認**。 同じ $\mathcal J,\mathcal D,K,T$ で $R=(A\to\{*\})$、$\epsilon=1_A$ とする。$H=(B\xrightarrow{h}C)$ から $R$ への変換は $f:B\to A$ と $g:C\to\{*\}$ である。$g$ は唯一であり、両経路 $B\to\{*\}$ も唯一なので自然性が成立する。従って誘導射 $(f,g)\mapsto f$ は全単射である。
<!-- definition-example-end -->

ここまでの普遍性は関手全体を比較するものである。次に、各対象 $d$ で必要な重みを作り、そこから関手と比較射を構成する。

## 5. 左Kan拡張を対象ごとに作る

対象 $d$ への射の集まり $\mathcal D(Kj,d)$ は $j$ に関して反変である。$K$ の射を前に合成することで添字を移せる。これを余極限の重みとする。

<a id="thm-catb2-06-left-formula"></a>

<!-- formal-statement-start -->
> **定理（重み付き余極限による豊穣左Kan公式）**
>
> 局所小な対称右閉・完備モノイダル圏上の豊穣関手 $K:\mathcal J\to\mathcal D$, $T:\mathcal J\to\mathcal C$ を取る。$\mathcal J,\mathcal D$ の対象集合は小さいとする。各 $d$ について反変重み $W_d=\mathcal D(K-,d)$ による重み付き余極限が存在すると仮定する。このとき豊穣左Kan拡張が存在し、

$$
(\operatorname{Lan}_K T)(d)=W_d\star T
$$

> と選べる。
<!-- formal-statement-end -->

### 証明の見取り図

余極限の脚は $Kj\to d$ を $Tj\to Ld$ に変換する。$d\to e$ を後ろにつなげば $Le$ への脚を得るので、普遍性により $Ld\to Le$ のHom対象上の構造射が定まる。任意の変換 $T\Rightarrow HK$ はこの脚に沿って延長できる。

<!-- proof-start -->
### 証明

$Ld=W_d\star T$ と選び、余極限の脚を

$$
i_{d,j}:\mathcal D(Kj,d)\to\mathcal C(Tj,Ld)
$$

とする。重みの豊穣関手律は [表現可能関手の関手律](../CATB2-04/index.md#prop-catb2-04-representable-functor) の反変形と $K$ の関手律から従う。

**関手構造。** パラメータ $P=\mathcal D(d,e)$ を使う。次の族は $j$ に関して自然である。

$$
P\otimes W_dj\xrightarrow{m} W_ej
\xrightarrow{i_{e,j}}\mathcal C(Tj,Le).
$$

実際、$K$ からの射を前合成する経路と $P$ で後合成する経路は結合律で一致し、最後に $i_e$ の自然性を適用できる。 [Hom対象の普遍性](../CATB2-04/index.md#prop-catb2-04-natural-hom-universal) と [余極限の普遍性](../CATB2-05/index.md#def-catb2-05-weighted-colimit) から唯一の構造射

$$
L_{d,e}:P\to\mathcal C(Ld,Le)
$$

が得られ、次を満たす。

$$
m(L_{d,e}\otimes i_{d,j})=i_{e,j}m.
\qquad (\ast)
$$

この式で $P$ の入力を単位にすれば右辺は $i_{d,j}$。恒等射も同じ脚を与えるので、余極限の同型の単射性から単位律が従う。合成律は $\mathcal D(e,f)\otimes\mathcal D(d,e)$ をパラメータとして比較する。両候補を $i_{d,j}$ と合成すると、一方は $i_{f,j}m(m\otimes1)$、他方は $i_{f,j}m(1\otimes m)$ となる。結合律で一致するため同じ単射性によって両候補も一致する。従って $L$ は豊穣関手である。

**比較射。** $u_{Kj}:I\to\mathcal D(Kj,Kj)$ を単位とし、$\eta_j=i_{Kj,j}u_{Kj}$ とする。$\mathcal J(j,k)$ 上で $L_{Kj,Kk}K_{jk}$ を $\eta_j$ に後合成すると、$(\ast)$ と単位律により $i_{Kk,j}K_{jk}$ となる。一方 $\eta_k$ を $T_{jk}$ に前合成しても $i_{Kk}$ の反変自然性により同じ射になる。従って $\eta$ は豊穣自然変換である。

**拡張と逆操作。** 任意の豊穣関手 $H:\mathcal D\to\mathcal C$ とパラメータ $P$ に対し、自然な族 $t_j:P\to\mathcal C(Tj,HKj)$ を取る。各 $d,j$ で

$$
P\otimes W_dj\xrightarrow{\sigma}
W_dj\otimes P
\xrightarrow{H_{Kj,d}\otimes t_j}
\mathcal C(HKj,Hd)\otimes\mathcal C(Tj,HKj)
\xrightarrow{m}\mathcal C(Tj,Hd)
$$

を作る。この族は $j$ に関して反変自然である。$\mathcal J(j,k)$ の因子を加えた二経路は、$H$ の合成律によって $H_{Kk,d}$ と $H_{Kj,Kk}K_{jk}$ の合成に分けられ、$t$ の自然性によって後者を $t_k$ と $T_{jk}$ の合成に移せる。残る括弧の違いは結合律で一致する。

余極限の同型から一意な $s_d:P\to\mathcal C(Ld,Hd)$ が存在し、

$$
m(s_d\otimes i_{d,j})=m(H_{Kj,d}\otimes t_j)\sigma
\qquad (\dagger)
$$

を満たす。$s$ の豊穣自然性を調べるため、$\mathcal D(d,e)$ と $P$ をパラメータにして両経路を $i_{d,j}$ と合成する。片方は $H_{d,e}$ を $(\dagger)$ の右辺に後合成し、もう片方は $(\ast)$ で $i_{e,j}m$ に置き換えてから $(\dagger)$ を使う。どちらも $H$ が二射の合成を保つことと $\mathcal C$ の結合律により、$H_{Kj,e}m$ と $t_j$ の合成になる。従って余極限の同型の単射性で二経路は等しい。

$s_{Kj}$ を $\eta_j$ と前合成すると $(\dagger)$ の $W_{Kj}j$ に単位を入れた式となり、$t_j$ が復元される。逆に自然な $s$ から $t_j=s_{Kj}\eta_j$ を作った場合、$(\ast)$ の $d=Kj$ に単位を代入した式から

$$
i_{e,j}=m(L_{Kj,e}\otimes\eta_j)
$$

を得る。従って $m(s_e\otimes i_{e,j})$ は $s$ の自然性により $(\dagger)$ の右辺となり、[重み付き余極限の定義](../CATB2-05/index.md#def-catb2-05-weighted-colimit)で与えられた同型に $\mathcal V(P,-)$ を適用した写像は単射である。従って脚との合成がすべて一致する二つのパラメータ付き射は等しく、元の $s_e$ が復元される。

両操作はパラメータ $P$ の射による前合成と両立する。ゆえに [Hom対象の普遍性](../CATB2-04/index.md#prop-catb2-04-natural-hom-universal) によって、誘導射 $N(L,H)\to N(T,HK)$ に逆射が得られる（$P=N(T,HK)$ の恒等射を逆操作に入れればよい）。二つの復元式を恒等射に適用すれば両合成は恒等射になる。よって [豊穣左Kan拡張の定義](#def-catb2-06-left-kan) を満たす。
<!-- proof-end -->

例えば集合で第4節の包含を考える。$d=0,1$ ともに $W_d$ は一元集合である。[一対象図式の重み付き余極限](../CATB2-05/index.md#thm-catb2-05-single-object) によって両方の値は $A$ となり、唯一の矢印は恒等写像に移る。

## 6. 右Kan拡張を対象ごとに作る

右側では $d$ から $Kj$ への射を重みとする。これは $j$ に関して共変であるため、極限を使う。

<a id="thm-catb2-06-right-formula"></a>

<!-- formal-statement-start -->
> **定理（重み付き極限による豊穣右Kan公式）**
>
> 局所小な対称右閉・完備モノイダル圏上の豊穣関手 $K:\mathcal J\to\mathcal D$, $T:\mathcal J\to\mathcal C$ を取る。$\mathcal J,\mathcal D$ の対象集合は小さいとする。各 $d$ について共変重み $U_d=\mathcal D(d,K-)$ による重み付き極限が存在すると仮定する。このとき豊穣右Kan拡張が存在し、

$$
(\operatorname{Ran}_K T)(d)=\{U_d,T\}
$$

> と選べる。
<!-- formal-statement-end -->

### 証明の見取り図

反対圏で射の向きを逆転すれば、余極限による左側の構成を極限による右側へ移せる。どの重み・比較射・普遍性が対応するかを追う。

<!-- proof-start -->
### 証明

対称性を使って反対豊穣圏の合成を定める（[豊穣Yonedaの反変形](../CATB2-04/index.md#thm-catb2-04-enriched-yoneda)）。$K^{\mathrm{op}}:\mathcal J^{\mathrm{op}}\to\mathcal D^{\mathrm{op}}$ と $T^{\mathrm{op}}:\mathcal J^{\mathrm{op}}\to\mathcal C^{\mathrm{op}}$ を考える。[重み付き余極限による豊穣左Kan公式](#thm-catb2-06-left-formula)の適用条件を確かめる。

反対圏での反変重みは

$$
\mathcal D^{\mathrm{op}}(K-,d)=\mathcal D(d,K-)=U_d
$$

となり、元の $\mathcal J$ 上では共変である。仮定の極限の脚 $\lambda_{d,j}:U_dj\to\mathcal C(Rd,Tj)$ は、反対圏では余極限の脚

$$
U_dj\to\mathcal C^{\mathrm{op}}(Tj,Rd)
$$

そのものである。余極限の誘導射の定義域も $\mathcal C^{\mathrm{op}}(Rd,X)=\mathcal C(X,Rd)$ となり、余極限の普遍性は [重み付き極限の普遍性](../CATB2-05/index.md#def-catb2-05-weighted-limit) と一致する。脚と射の合成順序が逆になるときは対称性でテンソル因子を交換する。従って左公式に必要な余極限はすべて存在する。

左公式から反対圏上の関手を得て、それを再び反対にすると $R:\mathcal D\to\mathcal C$ を得る。その構造射は具体的に

$$
R_{d,e}:\mathcal D(d,e)\to\mathcal C(Rd,Re)
$$

であり、定義域 $\mathcal D(e,Kj)\otimes\mathcal D(d,e)$ 上で

$$
m(\lambda_{e,j}\otimes R_{d,e})=\lambda_{d,j}m
$$

を満たす。これは左構成の $(\ast)$ を反転した式である。単位・合成の保存も反対圏を二回取ることで保存される。比較射は $\epsilon_j=\lambda_{Kj,j}u_{Kj}$ となる。

最後に変換のHom対象を比較する。反対を取ると $H\Rightarrow R$ の成分 $\mathcal C(Hd,Rd)$ は $\mathcal C^{\mathrm{op}}(Rd,Hd)$ となる。パラメータ付き自然性の二経路は合成順序と因子の交換により互いに入れ替わるので、成分が同じ自然な族を表す。 [Hom対象の普遍性](../CATB2-04/index.md#prop-catb2-04-natural-hom-universal) から両Hom対象は同型である。左拡張の同型をこの同型で挟むと

$$
\begin{aligned}
N(H,R)
&\cong N(R^{\mathrm{op}},H^{\mathrm{op}})\\
&\cong N(T^{\mathrm{op}},H^{\mathrm{op}}K^{\mathrm{op}})\\
&\cong N(HK,T).
\end{aligned}
$$

中央は比較射との前合成であったから、元の圏に戻せば $\epsilon$ との後合成である。従って [豊穣右Kan拡張の定義](#def-catb2-06-right-kan) を満たす。
<!-- proof-end -->

第4節の集合の例では $U_0$ は一元集合、$U_1$ は空集合である。[一対象図式の重み付き極限](../CATB2-05/index.md#thm-catb2-05-single-object) により $R0=A$、$R1=A^\varnothing$ は一元集合となる。

## 7. いつ公式を使えるか

両公式は、必要な重み付き余極限・極限が対象圏 $\mathcal C$ に存在することを仮定している。基底の完備性は $N$ を構成するための条件であり、それだけでは $\mathcal C$ に普遍対象は生まれない。例えば集合を基底とし、空の $\mathcal J$ から一対象の $\mathcal D$ へ拡張するなら、左には始対象、右には終対象が必要である。対象圏が空でない有限集合だけの圏なら始対象はない。仮に始対象 $A$ があると、二元集合への写像が唯一でなければならないが、二種類の定値写像が存在するため矛盾する。

一対象の添字豊穣圏でHom対象が $I$ の場合には、対象圏を基底自身とする。[一対象図式の重み付き極限・余極限](../CATB2-05/index.md#thm-catb2-05-single-object)により、左は $\mathcal D(K*,d)\otimes T*$、右は $[\mathcal D(d,K*),T*]$ となる。例えばベクトル空間を基底とし、これらのHom対象がそれぞれ2次元と3次元で $T*$ が4次元なら、左の次元は8、右の次元は12である。左は基底テンソルの係数、右は線形写像の行列成分を自由に選ぶことからこの差が出る。

## 8. 演習

### CATB2-06-A01 随伴の二変数

- Level: A

集合で $S=\{0,1\}$ とし、$f:X\times S\to Y$ を転置する。$u:X'\to X$ と $v:Y\to Y'$ を同時に合成したときの転置を求めよ。

<!-- solution-start -->
**詳細解答。** [豊穣随伴の定義](#def-catb2-06-enriched-adjunction) の具体例の転置を使う。任意の $x',s$ について

$$
\theta(vf(u\times1_S))(x')(s)=v(f(u(x'),s))
$$

である。一方、$\theta(f)(u(x'))$ は $s\mapsto f(u(x'),s)$ という写像なので、$Gv$ を適用すれば同じ値になる。従って転置は $(Gv)\theta(f)u$ である。二変数の自然性を同時に確認できた。
<!-- solution-end -->

### CATB2-06-A02 重みの向き

- Level: A

$K:\mathcal J\to\mathcal D$ と $j\to k$ に対応するHom対象を考える。左公式・右公式の重みの作用をテンソル積の射で書け。

<!-- solution-start -->
**詳細解答。** [左公式](#thm-catb2-06-left-formula) の重みは $W_dj=\mathcal D(Kj,d)$。$K_{jk}$ を前合成するため、

$$
W_dk\otimes\mathcal J(j,k)
\xrightarrow{1\otimes K_{jk}}
\mathcal D(Kk,d)\otimes\mathcal D(Kj,Kk)
\xrightarrow{m} W_dj.
$$

従って反変である。[右公式](#thm-catb2-06-right-formula) の重みは $U_dj=\mathcal D(d,Kj)$。後合成によって

$$
\mathcal J(j,k)\otimes U_dj
\xrightarrow{K_{jk}\otimes1}
\mathcal D(Kj,Kk)\otimes\mathcal D(d,Kj)
\xrightarrow{m}U_dk
$$

となるため共変である。
<!-- solution-end -->

### CATB2-06-A03 終点への包含

- Level: A

集合で $K$ が一対象圏を矢印圏 $0\to1$ の終点 $1$ へ送るとする。$T*=A$ に対して左右のKan拡張を求めよ。

<!-- solution-start -->
**詳細解答。** [左公式](#thm-catb2-06-left-formula) の重みは $d=0$ で空集合、$d=1$ で一元集合である。[一対象図式の重み付き極限・余極限](../CATB2-05/index.md#thm-catb2-05-single-object)から $L0=\varnothing,L1=A$ となる。矢印は唯一の空写像である。右側は $\mathcal D(0,1),\mathcal D(1,1)$ がともに一元集合なので $R0=R1=A$ となる。構造射は一元集合の重みの引き戻しが恒等写像であることから $1_A$ となる。比較射はどちらも $1_A$ である。
<!-- solution-end -->

### CATB2-06-A04 空の添字圏

- Level: A

集合で $\mathcal J$ を空圏、$\mathcal D$ を一対象・恒等射のみの圏とする。対象圏も集合としたとき左右のKan拡張を求め、変換の普遍性を確認せよ。

<!-- solution-start -->
**詳細解答。** [左公式](#thm-catb2-06-left-formula) の余極限は脚が空なので始対象、[右公式](#thm-catb2-06-right-formula) の極限は終対象である。よって左は空集合、右は一元集合である。任意の試験集合 $X$ への空集合からの写像、任意の $X$ から一元集合への写像は各一つである。空圏上の自然変換も空の成分族一つだけなので、誘導射はいずれも一元集合間の全単射となる。
<!-- solution-end -->

### CATB2-06-B01 余積を保つ転置

- Level: B

集合の随伴 $-\times S\dashv(-)^S$ が二集合 $A,B$ の余積を保つことを、具体的な同型と任意の試験集合への写像で確認せよ。

<!-- solution-start -->
**詳細解答。** [保存定理](#thm-catb2-06-preservation) を一元集合の重みに適用すれば余積を保つことが分かる。余積を具体的に互いに交わらない二つのコピーの集合 $(\{0\}\times A)\cup(\{1\}\times B)$ と定める。次の写像を考える。

$$
\phi: (A\sqcup B)\times S\to(A\times S)\sqcup(B\times S)
$$

を $\phi((0,a),s)=(0,(a,s))$、$\phi((1,b),s)=(1,(b,s))$ と定める。タグを変えずに括弧を戻す写像が逆である。任意の $X$ への写像 $f$ は各タグに制限して $f_A(a,s)=f((0,a),s)$、$f_B(b,s)=f((1,b),s)$ を与える。逆にこの二写像からタグごとに $f$ を定めれば全ての入力で一意である。これは余積の脚が元の余積の包含と $1_S$ の直積であることも確認している。
<!-- solution-end -->

### CATB2-06-B02 ベクトル空間の点ごとの拡張

- Level: B

基底と対象圏を実ベクトル空間とする。添字圏は一対象でHom対象が $\mathbb R$ とし、$T*=\mathbb R^2$ とする。ある $d$ について $\mathcal D(K*,d)=\mathbb R^3$、$\mathcal D(d,K*)=\mathbb R^4$ と与えられている。左右の公式の値と脚を求めよ。

<!-- solution-start -->
**詳細解答。** [左公式](#thm-catb2-06-left-formula)の重みは $\mathbb R^3$ である。[一対象図式の重み付き極限・余極限](../CATB2-05/index.md#thm-catb2-05-single-object)により

$$
Ld=\mathbb R^3\otimes\mathbb R^2.
$$

脚は $w\mapsto(x\mapsto w\otimes x)$ で、標準基底のテンソル $e_i\otimes f_j$ が6本の基底を与える。任意の線形な脚の族は双線形写像 $(w,x)\mapsto g(w)(x)$ を与えるのでテンソル積の普遍性で一意に因子分解される。

[右公式](#thm-catb2-06-right-formula) では

$$
Rd=[\mathbb R^4,\mathbb R^2].
$$

脚は $w\mapsto(M\mapsto Mw)$ である。行列は2行4列なので次元は8。任意の線形な脚の族 $g:\mathbb R^4\to[X,\mathbb R^2]$ から、$x$ を $w\mapsto g(w)(x)$ へ送る線形写像が一意に定まる。評価すれば元の族に戻る。任意のパラメータでもテンソル積の転置によって同じ復元ができるため、Hom対象の普遍性が成立する。
<!-- solution-end -->

### CATB2-06-B03 比較射の自然性

- Level: B

左公式で $\eta_j=i_{Kj,j}u_{Kj}$ と置く。$\mathcal J(j,k)$ 上の二経路が等しいことを、脚の反変自然性の等式と構造射の条件 $(\ast)$ を書き、それぞれに単位を代入して示せ。

<!-- solution-start -->
**詳細解答。** [左公式の証明](#thm-catb2-06-left-formula) の構造射の条件は $m(L_{d,e}\otimes i_{d,j})=i_{e,j}m$。$d=Kj,e=Kk$ とし、第二因子を $u_{Kj}$、第一因子を $K_{jk}$ で指定すると、

$$
m(L_{Kj,Kk}K_{jk}\otimes\eta_j)
=i_{Kk,j}K_{jk}
$$

となる。右辺では単位律を使った。反変自然性は

$$
m(i_{Kk,k}\otimes T_{jk})
=i_{Kk,j}m(1\otimes K_{jk})
$$

であり、定義域は $\mathcal D(Kk,Kk)\otimes\mathcal J(j,k)$ である。第一因子に $u_{Kk}$ を入れると右辺は $i_{Kk,j}K_{jk}$、左辺は $m(\eta_k\otimes T_{jk})$ となる。よって二つの経路はHom対象上で一致する。
<!-- solution-end -->

### CATB2-06-C01 二方向への拡張を比較する

- Level: C

集合で $\mathcal J$ は対象一つ・恒等射のみとし、$\mathcal D$ は対象 $0,1$ と $0$ から $1$ への異なる二射 $p,q$ および恒等射だけを持つ圏とする。$K*=0$、$T*=A=\{a,b\}$ とする。左右のKan拡張の全ての値、構造射、比較射を計算し、任意の試験関手 $H=(B\rightrightarrows C)$ に対する自然変換の普遍性を示せ。

<!-- solution-start -->
**詳細解答。** [左公式](#thm-catb2-06-left-formula) では $W_0=\{1_0\}$、$W_1=\{p,q\}$。一対象図式の重み付き余極限は [直積としての公式](../CATB2-05/index.md#thm-catb2-05-single-object) で計算できる。従って $L0=A$ と同一視し、

$$
L1=\{p,q\}\times A,\qquad L(p)(x)=(p,x),\quad L(q)(x)=(q,x).
$$

比較射 $\eta$ は $1_A$。左の試験関手の二射を $h_p,h_q:B\to C$ とする。自然変換 $s:L\Rightarrow H$ の成分は $s_0:A\to B$ と $s_1:\{p,q\}\times A\to C$ である。二つの自然性は

$$
s_1(p,x)=h_p(s_0(x)),\qquad
s_1(q,x)=h_q(s_0(x)).
$$

従って任意の $s_0$ から $s_1$ が全ての元について一意に定まる。制限して $\eta$ と合成する操作は $s_0$ を取り出す操作であるから全単射になる。$L1$ は4元で、単に $A$ をコピー一つだけ置くと二つの独立な脚を表せない。

[右公式](#thm-catb2-06-right-formula) の重みは $U_0=\{1_0\}$、$U_1=\varnothing$。従って $R0=A$、$R1=\{*\}$ となり、$R(p),R(q)$ は両方とも唯一の定値写像、$\epsilon=1_A$ である。任意の自然変換 $t:H\Rightarrow R$ は $t_0:B\to A$ と唯一の $t_1:C\to\{*\}$ からなる。二つの自然性は両辺とも唯一の写像 $B\to\{*\}$ となるため成立する。よって $t_0$ を取り出す操作は全単射である。左右の定義が要求する向きの変換をそれぞれ構成できた。
<!-- solution-end -->

## 9. 次に向けて

左公式では $\mathcal D(K-,d)$ という重みが図式を移した。次講では一つの関手から生じる重みだけでなく、二つの圏の対象を同時に入力とするHom型のデータを合成する。
