# LORG12 achronal集合・edge・achronal境界

<!-- definition-example-audit: strict -->

## 1. 「同時刻の面」を初期値の置き場所にするには

[LORG11の因果単純性](../LORG11/index.md#def-lorg11-causal-simplicity)は、二点間の因果的到達関係の閉性を制御しました。しかし初期値を与えるのは二点の関係ではなく、通常は空間的に広がる集合です。ある面の二点が時間的曲線で結べてしまうなら、面の「異なる場所」に置いた値が時間順序を持ってしまいます。

この障害を排除する最も基本的な条件が **achronal（非時間的）** です。しかし光的に結べる二点は残るので、より強い **acausal（非因果的）** と区別します。さらに、有限の初期値面の「端」では未来から過去へ面を横切らずに回り込めます。この回り込みを **edge** で測り、最後に時間的未来の境界が、端を持たない面をどのように作るかを調べます。

以下、$(M,g)$ は滑らかで連結、Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体とします。次元は $n+1$（$n\ge1$）、計量の符号は $(-,+,\ldots,+)$ です。

曲線は[LORG3の区分的 $C^1$ 未来因果曲線](../LORG3/index.md#def-lorg3-causal-curve)です。到達記号と集合 $p\ll q$、$p\le q$、$I^\pm(S)$ は[LORG6の定義](../LORG6/index.md#def-lorg6-chronological-causal-future)に従います。

曲線列の一様極限を扱う節では局所Lipschitz因果曲線も使います。その意味と極限操作の条件は当該節で説明します。

## 2. achronal と acausal：光的な結び付きは許すか

二次元Minkowski時空 $(\mathbb R^{1,1},-dt^2+dx^2)$ では、$t=0$ 上のどの異なる二点も、時間的にも光的にも結べません。これに対し、光線 $t=x$ 上の異なる二点は光的に結べますが、時間的には結べません。これが二つの条件の差です。

<a id="def-lorg12-achronal-acausal"></a>

<!-- formal-statement-start -->
> **定義（achronal集合とacausal集合）**  
> 時間向き付きLorentz多様体の部分集合 $S\subset M$ が **非時間的（achronal）** であるとは、
>
> $$I^+(S)\cap S=\varnothing$$
>
> であることをいう。すなわち **$p,q\in S$（$p=q$ も許す）に対して $p\ll q$ が一切成立しない**。
>
> $S$ が **非因果的（acausal）** であるとは、異なる二点 $p,q\in S$ の間に $p\le q$ が成立しないことをいう。$p\le p$ は定数曲線で常に成立するため、acausalでは異なる二点に限る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg12-achronal-acausal -->
**定義の確認**。$S_0=\{(0,x):x\in\mathbb R\}$ の二点 $p=(0,a)$、$q=(0,b)$ で $a\ne b$ とすると、時間差は零、空間差は $|a-b|>0$ です。[Minkowskiの到達条件](../LORG6/index.md#thm-lorg6-minkowski-futures)では $p\le q$ も $q\le p$ も成り立ちません。従って $S_0$ はacausalかつachronalです。

$N=\{(u,u):0\le u\le1\}$ については、二点の差が $(v-u,v-u)$ なので $|\Delta t|=|\Delta x|$ です。異なる二点を未来向きに光的に結べますが、$\Delta t>|\Delta x|$ は成立しません。よって $N$ はachronalですがacausalではありません。

一方、時刻を円周として同一視した時間周期の時空では、一点 $p$ から自身へ時間的に一周できます。[LORG9で構成した時間周期円筒の閉時間的曲線](../LORG9/index.md#def-lorg9-chronological)を使うと $\{p\}$ ですらachronalとは限りません。「一点集合だから必ず非時間的」とは判断できません。
<!-- definition-example-end -->

<a id="prop-lorg12-acausal-achronal"></a>

<!-- formal-statement-start -->
> **命題（causal時空での二条件の関係）**  
> すべての時空でacausal集合がachronalとは限らない。しかし時空が[LORG9のcausal条件](../LORG9/index.md#def-lorg9-causal)を満たすなら、acausal集合はachronalである。逆向きはMinkowski時空でも成立しない。
<!-- formal-statement-end -->

### 証明の見取り図

異なる二点の時間的結び付きは因果的結び付きでもあります。残る問題は $p\ll p$ だけです。causal条件はこの自己到達を排除します。

<!-- proof-start -->
### 証明

$S$ をacausalとします。異なる $p,q\in S$ について $p\ll q$ なら、[時間的到達は因果的到達を含意する](../LORG6/index.md#prop-lorg6-transitivity)ので $p\le q$、acausal性に矛盾します。$p=q$ については、causal時空なら非定数の閉未来因果曲線がないため $p\ll p$ は不可能です。よって $I^+(S)\cap S=\varnothing$ です。

causal条件を外した場合には、時間周期円筒の一点集合は「異なる二点がない」ためacausalですが、$p\ll p$ によりachronalではありません。逆向きの失敗は前の光線分 $N$ が与えます。$\square$
<!-- proof-end -->

## 3. edge：面を避けて過去から未来へ回れる点

有限の時刻一定区間 $S=\{(0,x):|x|\le1\}$ を想像します。内部の点では十分小さな近傍のすべての過去未来を結ぶ時間的曲線が $S$ を横切ります。しかし端点 $(0,\pm1)$ では、時刻零を区間の外で通るように曲線を少しずらせます。edgeは、この回り込みがいくら近傍を縮めても可能な点です。

局所の到達関係を正確に書くため、開集合 $U\subset M$ に対し $q\ll_U r$ を、**全体が $U$ 内に収まる未来時間的曲線**が存在することと定めます。$I_U^\pm(p)$ はこれによる未来・過去です。全時空での $\ll$ と混同しません。

<a id="def-lorg12-edge"></a>

<!-- formal-statement-start -->
> **定義（achronal集合のedge）**  
> achronal集合 $S\subset M$ の **edge（縁）** は、次の条件を満たす $p\in\overline S$ 全体である。
>
> 任意の $p$ の開近傍 $U$ に対し、$q\in I_U^-(p)$ と $r\in I_U^+(p)$ が存在し、$q$ から $r$ へ至る **$U$ 内の未来時間的曲線で $S$ と交わらないもの** がある。
>
> その点集合を $\operatorname{edge}(S)$ と記す。$\overline S$ は $M$ での閉包であり、$S$ 自身に属さないedge点も許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg12-edge -->
**定義の確認**。$S=\{(0,x):x\ge0\}$ とし、$o=(0,0)$ を調べます。任意の開近傍 $U\ni o$ に、十分小さい $\varepsilon>0$ を選んで
$$
q=(-2\varepsilon,-\varepsilon),\quad
r=(2\varepsilon,-\varepsilon)
$$
と、$o$ を結ぶ二本の直線分、および $q$ から $r$ への垂直線分を考えます。$q\ll_U o$ を確認するため、直線分を $u\in[0,1]$ で

$
\alpha(u)=(-2\varepsilon+2\varepsilon u,\,-\varepsilon+\varepsilon u),
\qquad \dot\alpha=(2\varepsilon,\varepsilon)
$

とパラメータ化します。この速度の時刻成分は正であり、

$
g(\dot\alpha,\dot\alpha)=-(2\varepsilon)^2+\varepsilon^2=-3\varepsilon^2<0
$

なので未来時間的です。$o$ から $r$ への直線の速度は $(2\varepsilon,-\varepsilon)$ で、自己内積は同じく $-3\varepsilon^2$ です。従って $q\ll_U o\ll_U r$ です。

$\varepsilon$ を十分小さくすれば、三本の線分すべてが $U$ 内に収まります。$q$ から $r$ への垂直線分は $x=-\varepsilon$ で時刻零を通り、$S$ に触れません。よって $o\in\operatorname{edge}(S)$ です。

これに対し $p=(0,a)$、$a>0$ では、$|x-a|<a/2$ の小近傍内の連続曲線は、負時刻から正時刻に進む間に $t=0$ となり、そのとき $x>0$ です。必ず $S$ と交差するため $p$ はedgeに入りません。$a<0$ の点は $\overline S$ に含まれません。
<!-- definition-example-end -->

次は定義を一度一般のグラフに当てておきます。後の境界面では、この形が局所的に現れます。

<a id="lem-lorg12-spacelike-slice-edge"></a>

<!-- formal-statement-start -->
> **補題（Minkowski時刻一定面のedge）**  
> $M=\mathbb R^{1,1}$、$S_A=\{(0,x):x\in A\}$（$A\subset\mathbb R$）とする。このとき $S_A$ はachronalであり、
>
> $$\operatorname{edge}(S_A)=\{(0,x):x\in\partial_{\mathbb R} A\}.$$
<!-- formal-statement-end -->

### 証明の見取り図

$A$ の内部点では時刻零で必ず面に当たり、$A$ の閉包外ではedgeの所属条件が失敗します。残る境界点では、$A$ の外側の空間位置で時刻零を通過する短い曲線を作ります。

<!-- proof-start -->
### 証明

どの二点も同時刻なので $S_A$ はachronalです。$p=(0,a)$、$a\notin\overline A$ は $\overline{S_A}$ に入りません。$a\in\operatorname{Int}A$ のとき、小さい $U=\{|t|<\delta,\ |x-a|<\delta\}$ を $\{0\}\times A$ が横切るように取れます。$q\ll_U p\ll_U r$ を満たす点は $t_q<0<t_r$ です。$U$ 内の任意の連続曲線は中間値の定理によって $t=0$ を通り、その空間座標は $A$ に属します。ゆえに回避曲線はありません。

$a\in\partial A=\overline A\setminus\operatorname{Int}A$ とします。任意の $U\ni(0,a)$ に対し、$b\notin A$ を $a$ に十分近く選びます。$d=|b-a|>0$ とし、$U$ に収まるよう $d$ を縮めたうえで $h=2d$、$q=(-h,b)$、$r=(h,b)$ と置きます。$q\ll_U(0,a)\ll_U r$ は $h>|b-a|$ により成立し、$q$ から $r$ への垂直線分は $x=b\notin A$ だから $S_A$ を避けます。境界に $b=a\notin A$ が使えるときは $b=a$、任意の小さい $h$ を選べばよいです。したがって境界点はすべてedgeです。$\square$
<!-- proof-end -->

この補題は「点が集合に含まれるか」と「端点か」を分けます。例えば $A=(0,1)$ でも $\operatorname{edge}(S_A)$ には $(0,0)$ と $(0,1)$ が入ります。

## 4. 時間的未来の境界は必ずachronal

[LORG7の開性](../LORG7/index.md#thm-lorg7-chronological-open)から、任意の $S\subset M$ について $F=I^+(S)$ は開です。また $I^+(F)=F$ です。実際、$s\ll q$ を結ぶ時間的曲線の途中点 $u$ を選べば $s\ll u\ll q$ で $u\in F$、従って $q\in I^+(F)$ です。逆包含は時間的曲線の連結による推移性から成立します。

このように **$I^+(F)=F$ を満たす開集合** を未来集合と呼びます。その位相的境界が、時間的に結べない点から成ることを次に証明します。

<a id="def-lorg12-achronal-boundary"></a>

<!-- formal-statement-start -->
> **定義（achronal境界）**  
> 任意の $S\subset M$ の時間的未来から得る
>
> $$A^+(S)=\partial_M I^+(S)=\overline{I^+(S)}\setminus I^+(S)$$
>
> を **未来のachronal境界** という。過去については $A^-(S)=\partial_M I^-(S)$ と定める。$S$ 自身がachronalであることは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg12-achronal-boundary -->
**定義の確認**。二次元Minkowski時空で $S=\{(0,0)\}$ と置きます。[Minkowski時空の時間的・因果的未来と過去の定理](../LORG6/index.md#thm-lorg6-minkowski-futures)をこの $S$ に適用すると
$$
I^+(S)=\{(t,x):t>|x|\},\qquad
A^+(S)=\{(t,x):t=|x|\}.
$$
$A^+(S)$ の二点の時間差は空間差の絶対値を超えません。例えば両点が同じ右側の光線上なら等号です。左右で異なる側の点を $(|a|,a)$、$(|b|,b)$（$a\ge0\ge b$）と書けば、$|\Delta t|=|a+b|\le a-b=|\Delta x|$ です。従ってachronalです。一方同一の光線上で異なる二点は因果的に結べるので、acausalではありません。
<!-- definition-example-end -->

<a id="thm-lorg12-boundary-achronal"></a>

<!-- formal-statement-start -->
> **定理（時間的未来の境界は閉かつachronal）**  
> 任意の $S\subset M$ に対し $A^+(S)$ と $A^-(S)$ は閉集合かつachronal集合である。
<!-- formal-statement-end -->

### 証明の見取り図

境界上の二点 $p\ll q$ があったと仮定します。$p$ は未来集合 $F$ で近似できるので、$p\ll q$ の開性により $F$ の点から $q$ に時間的に進めます。しかし未来集合から時間的に進んだ点は内部 $F$ に戻り、$q$ が境界上であることと矛盾します。

<!-- proof-start -->
### 証明

$F=I^+(S)$ は開なので、その境界 $\partial F=\overline F\setminus F$ は閉です。二点 $p,q\in\partial F$ の間に $p\ll q$ が成立すると仮定します。

[時間的到達関係の端点安定性](../LORG7/index.md#lem-lorg7-timelike-endpoints)により、$p$ の開近傍 $U$ を十分小さく取れば、任意の $u\in U$ について $u\ll q$ です。また $p\in\overline F$ より $u\in U\cap F$ を選べます。

$u\in F$ なので、ある $s\in S$ が $s\ll u$ を満たします。[時間的関係の推移性](../LORG6/index.md#prop-lorg6-transitivity)を適用すると

$$
s\ll u\ll q\quad\Longrightarrow\quad s\ll q\quad\Longrightarrow\quad q\in F.
$$

しかし境界点 $q\in\partial F$ は $q\notin F$ を満たし、矛盾します。過去側も時間向きを逆にして証明できます。$\square$
<!-- proof-end -->

**注意**：境界はachronalでも、互いに光的な二点は含み得ます。Minkowskiの未来光円錐がその実例であり、「achronal境界＝滑らかな空間的超曲面」ではありません。

## 5. 境界は端を持たない局所Lipschitz超曲面になる

$\partial I^+(S)$ は光円錐の頂点で折れていても、局所では一本のグラフとして表せます。点 $p$ の周りで、未来時間的な座標ベクトル $\partial_t$ を持つ小さい座標箱 $(t,\mathbf x)$ を選びます。箱をさらに小さくすると、ある定数 $C>0$ によって、箱内の未来因果ベクトル $(\tau,\xi)$ は $\tau>0$ と $|\xi|\le C\tau$ を満たします。これは未来錐が座標変化に連続的に依存し、各点で $\partial_t$ が時間的であることから得る一様な速度上界です。

<a id="lem-lorg12-boundary-graph"></a>

<!-- formal-statement-start -->
> **補題（achronal境界の局所グラフ表示）**  
> $A=\partial I^+(S)$、$p\in A$ とする。$p$ の周りには座標箱 $V=(-\delta,\delta)\times B_\rho\subset M$ があり、適切に $p=(0,\mathbf0)$ として
>
> $$A\cap V=\{(f(\mathbf x),\mathbf x):\mathbf x\in B_\rho\}$$
>
> となる連続関数 $f:B_\rho\to(-\delta,\delta)$ が存在する。箱を必要に応じて縮めれば、ある $K>0$ に対し
>
> $$|f(\mathbf x)-f(\mathbf y)|\le K|\mathbf x-\mathbf y|$$
>
> も成立する。すなわち境界は局所Lipschitzな位相的超曲面である。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ の少し過去は $\overline F$ の外、少し未来は $F$ の中です。この二点の関係を近くのすべての縦線へ伝えます。未来集合であることが縦線との交点の一意性を与え、境界がachronalであることがグラフの傾きに上界を与えます。

<!-- proof-start -->
### 証明

$F=I^+(S)$、$p\in\partial F$ とします。$p_-\ll p\ll p_+$ を同じ座標縦線上の十分近い点として選びます。$p_+\in F$ です。なぜなら $u_k\in F$、$u_k\to p$ を選び、[時間的関係の開性](../LORG7/index.md#lem-lorg7-timelike-endpoints)から大きな $k$ で $u_k\ll p_+$、従って $p_+\in I^+(F)=F$ だからです。

反対に $p_-\notin\overline F$ です。もし $u_k\in F$ が $p_-$ に収束すれば、$p_-\ll p$ から大きな $k$ で $u_k\ll p$ となって $p\in F$、境界点という仮定と矛盾します。

$F$ と $M\setminus\overline F$ は開集合であり、それぞれ $p_+$ と $p_-$ を含みます。従って細い空間球 $B_\rho$ と時刻幅 $\delta$ を選び、任意の $\mathbf x\in B_\rho$ に対して、下端は未来集合の閉包の外、上端は内部となるようにできます。すなわち

$$
(-\delta,\mathbf x)\notin\overline F,\qquad (\delta,\mathbf x)\in F.
$$

各縦線で未来への移動は時間的です。$F$ の未来集合性から、この縦線上の $F$ は上側の区間であり、一意の閾値 $t=f(\mathbf x)$ を持ちます。

閾値より下側は $F$ の外、上側は $F$ 内です。したがって $(f(\mathbf x),\mathbf x)\in\overline F\setminus F=A$ です。逆に箱内の $A$ の点は、その縦線上の閾値でなければなりません。

連続性は、$\mathbf x_j\to\mathbf x$ のとき $f(\mathbf x_j)$ の任意の収束部分列の極限が閉集合 $A$ に入り、縦線上の交点の一意性から $f(\mathbf x)$ に等しいことで示せます。値域は有界なので収束部分列があり、結局列全体が収束します。

最後に箱を縮めて、$K>0$ を「$|\Delta t|>K|\Delta\mathbf x|$ なら、その二点は箱内の直線によって時間的に結べる」ように取ります。これは $g$ が標準的な時間的ベクトルの近傍で負になることから、係数の一様連続性を使って選べます。もし二つの境界点に $|f(\mathbf x)-f(\mathbf y)|>K|\mathbf x-\mathbf y|$ があれば、両者が時間的に結ばれ、前節の[achronal性](#thm-lorg12-boundary-achronal)に矛盾します。従って所望のLipschitz評価を得ます。$\square$
<!-- proof-end -->

<a id="thm-lorg12-boundary-edgeless"></a>

<!-- formal-statement-start -->
> **定理（achronal境界にはedgeがない）**  
> 任意の $S\subset M$ に対し、
>
> $$\operatorname{edge}(A^+(S))=\operatorname{edge}(A^-(S))=\varnothing.$$
<!-- formal-statement-end -->

### 証明の見取り図

局所グラフの過去側から未来側へ連続曲線で進むと、グラフとの差 $t-f(\mathbf x)$ が負から正へ変わります。中間値の定理により必ず零になり、境界と交わります。

<!-- proof-start -->
### 証明

$A=A^+(S)$ として $p\in A$ を固定します。[局所グラフ表示](#lem-lorg12-boundary-graph)の座標箱 $V$ を取り、$p=(f(\mathbf0),\mathbf0)$ とします。

$q\in I^-_V(p)$ がグラフ上または上側にあると仮定します。グラフの上側なら、縦線上の点 $a=(f(\mathbf x_q),\mathbf x_q)\in A$ から $q$ へ時間的に進めるので

$$
a\ll q\ll p
$$

となります。グラフ上なら $q\in A$ かつ $q\ll p$ です。どちらも $A$ のachronal性に反するため、$t_q-f(\mathbf x_q)<0$ です。

時間方向を逆にした議論から、$r\in I^+_V(p)$ では $t_r-f(\mathbf x_r)>0$ となります。

$V$ 内の任意の時間的曲線 $\gamma$ が $q$ と $r$ を結ぶとすると、連続関数 $t(\gamma)-f(\mathbf x(\gamma))$ は始点で負、終点で正です。中間値の定理から途中で零になり、$\gamma$ は $A$ と交わります。したがって **この一つの近傍 $V$ において回避曲線が存在しない** ため、$p$ はedgeの定義を満たしません。$p$ は任意なので $\operatorname{edge}(A)=\varnothing$。過去の境界も同じです。$\square$
<!-- proof-end -->

ここでいう「端がない」は、集合としての閉性や滑らかさと同義ではありません。前の半直線 $S=\{(0,x):x\ge0\}$ はedgeを持ちますが、その時間的未来の境界は頂点で折れていてもedgeを持ちません。

## 6. 境界に沿う光的生成子はどこから来るか

Minkowski時空の点の未来光円錐は、頂点から出た光的な直線の集まりでした。曲がった時空で同じことをいうには、「曲線が極限で消えてしまわないか」を確認しなければなりません。ここでは必要な部分だけを座標箱で証明します。

まず座標時刻でパラメータ化した曲線列を考え、その曲線列から一様収束する部分列を抜き出す仕組みを確かめます。閉包が小さな座標領域に収まる有界な座標箱内で $\partial_t$ が時間的であるとき、未来因果曲線を座標時刻 $t$ でパラメータ化すると、その空間成分 $\mathbf x(t)$ に $|\mathbf x'(t)|\le C$ がほとんど至る所で成り立ちます。従って同じ閉時刻区間上の曲線列は一様Lipschitzです。値域を箱のコンパクトな部分に制限すれば、時刻区間を細分した有限格子点で収束部分列を取り、Lipschitz評価で格子点間の誤差を抑える対角法によって一様収束部分列を得ます。極限もLipschitzであることは、$|\mathbf x_k(t)-\mathbf x_k(s)|\le C|t-s|$ の両辺を極限へ移せば分かります。

**極限が因果的であること**も確認します。極限曲線の点 $z_0$ において、十分近い点 $z$ の未来因果速度 $(1,\xi)$（$|\xi|\le C$）は、計量の連続性により任意に小さい $\eta>0$ に対して

$
g_{z_0}((1,\xi),(1,\xi))\le\eta
$

を満たします。$\eta$ を固定すると、この条件は $z_0$ における光円錐を少し広げた閉凸な未来錐を定めます。$\mathbf x_k(t+h)-\mathbf x_k(t)$ は各速度の積分なので、凸性から $(h,\mathbf x_k(t+h)-\mathbf x_k(t))$ もこの広げた錐に属します。一様極限で $k\to\infty$、続いて $\eta\downarrow0$ とし、Lipschitz関数のほとんど至る所で存在する微分を取ると

$
g_{\gamma(t)}((1,\mathbf x'(t)),(1,\mathbf x'(t)))\le0
$

となり、速度は未来向きです。以後、このようにほとんど至る所で未来因果速度を持つ局所Lipschitz曲線を扱います。これは後のLORG14の大域的な限界曲線補題とは異なり、**固定された小座標箱内だけ** の議論です。

<a id="thm-lorg12-null-generators"></a>

<!-- formal-statement-start -->
> **定理（未来achronal境界の光的生成子）**  
> 滑らかな時間向き付きLorentz多様体の任意の $S\subset M$ に対し、$A=\partial I^+(S)$ とする。各 $p\in A\setminus\overline S$ を終点とする、$A$ 内を走る非定数の過去向き **光的測地線の一部分** が存在する。境界内のそのような光的測地線を過去へ極大に延ばすと、過去端点が $\overline S$ に属するか、過去方向に端点を持たず非延長となる。
>
> 「非延長」は時空内の極限点を持つままそこで停止することができない、という意味であり、アフィンパラメータの無限長を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

境界点 $p$ を内部の点 $q_k\in I^+(S)$ で近似し、それぞれに $S$ からの時間的曲線を取ります。$p$ 周辺の小箱は $\overline S$ を避けられるため、曲線はその箱に外から入ります。一定時間幅の最後の部分を取り出し、前述の曲線列の一様収束の議論で極限を作ります。その極限が境界の外へ出ると、元の $p$ が時間的未来の内部へ入ってしまうことを示します。

<!-- proof-start -->
### 証明

$p\notin\overline S$ なので、$p$ の周りに閉包が $\overline S$ と交わらない小座標箱を取れます。$p=(0,\mathbf0)$ とし、外箱を $U=(-T,T)\times B_R$ と書きます。箱を縮めて $\partial_t$ を未来時間的とし、箱内の未来因果曲線の空間速度に共通の上界 $|\mathbf x'(t)|\le C$ を取ります（第5節冒頭）。さらに $0<\varepsilon<T/4$ を $2C\varepsilon<3R/4$ となるように選びます。

$p$ の真上にある $q_k=(1/k,\mathbf0)$ は、十分大きい $k$ で $p\ll q_k$ です。$p\in\overline{I^+(S)}$ と[時間的到達の端点安定性](../LORG7/index.md#lem-lorg7-timelike-endpoints)から $q_k\in F=I^+(S)$ でもあります。従って $s_k\in S$ から $q_k$ への未来時間的曲線 $\gamma_k$ が取れます。

**共通時間区間を取り出す。** $s_k\notin U$、$q_k\in U$ です。$\gamma_k$ の $q_k$ に至る最後の $U$ 内部分を考えます。その入域が $t>-\varepsilon$ で起こったと仮定すると、入域点は外箱の空間側面 $|\mathbf x|=R$ にあります（下側時刻面は $t=-T<-\varepsilon$）。しかし $q_k$ へ至る間の時間差は大きな $k$ で $2\varepsilon$ 未満なのに、必要な空間移動量は $R$ です。速度上界から

$$
R=|\mathbf x_{\rm entry}-\mathbf0|
\le C\bigl(1/k-t_{\rm entry}\bigr)<2C\varepsilon<3R/4
$$

となり矛盾します。従って最後の入域は $t\le-\varepsilon$ で、$\gamma_k$ は $t\in[-\varepsilon,0]$ の間ずっと $U$ 内にあります。さらにこの区間で

$$
|\mathbf x_k(t)|\le |\mathbf x_k(0)|+C|t|
\le C/k+C\varepsilon
$$

となるので、$k$ を大きくすると曲線像は $U$ 内の一つのコンパクトな小箱に収まります。

第6節冒頭で示した座標時刻パラメータ化・一様Lipschitz評価・閉凸な因果錐を使い、部分列を取って $[-\varepsilon,0]$ 上で一様収束する局所Lipschitz未来因果曲線 $\gamma$ を得ます。$|\mathbf x_k(0)|\le C/k$ より $\gamma(0)=p$ です。$\gamma(-\varepsilon)$ の時刻は $-\varepsilon$ なので、この極限曲線は非定数です。また $\gamma_k$ の各点は $s_k$ から時間的に到達できるので $F$ にあり、極限から $\gamma\subset\overline F$ です。

**極限を境界にとどめる。** 仮に $z=\gamma(t_0)\in F$ とします。$z$ から $p$ への局所Lipschitz因果部分に対して、[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)をそのまま引用することはできません。この補題は区分的 $C^1$ 曲線に対するものだからです。

ただし、同章の[時間的変形](../LORG7/index.md#lem-lorg7-causal-push)の速度評価は、一様Lipschitz曲線の微分可能なほとんどすべての点にも適用できます。未来時間的な流れで始点を少し過去へずらし、終点 $p$ を固定すると、変形曲線の速度は一様に時間的になります。座標箱を有限個に分割して折れ線近似すれば、時間的錐の開性により区分的 $C^1$ の未来時間的曲線が得られます。

こうして、始点 $z_\delta$ について

$
z_\delta\in I^-(z),\qquad z_\delta\ll p,\qquad z_\delta\longrightarrow z
$

となる曲線を構成できます。$z\in F=I^+(S)$ なら、ある $s\in S$ に対して $s\ll z$ です。[端点安定性](../LORG7/index.md#lem-lorg7-timelike-endpoints)から、十分小さい $\delta$ で

$
s\ll z_\delta\ll p\quad\Longrightarrow\quad p\in F
$

となりますが、これは $p\in\partial F$ に矛盾します。従って極限曲線のどの点も $F$ に属さず、$\gamma\subset\overline F\setminus F=A$ です。

**光的測地線であること。** $\gamma$ の二点が時間的に結ばれると $A$ の[achronal性](#thm-lorg12-boundary-achronal)に反します。各十分短い部分区間の像を[LORG5の凸正規近傍](../LORG5/index.md#thm-lorg5-convex-normal-existence)に収めて考えます。因果曲線の途中に時間的速度があれば、その部分を小さく時間的に動かして両端を時間的に結べます。また光的速度だけであっても、前後の方向が一致せず折れれば、[未来因果錐の凸性](../LORG1/index.md#prop-lorg1-cone-convex)によって二つの非平行な未来光的方向の和は未来時間的になります。局所正規座標内で折れの前後を短く取り、端点をつなぐ時間的な短絡を作れるため、やはりachronal性に反します。従って時間的部分も方向の折れも許されず、各短区間の像はその両端を結ぶ一本の未来光的測地線と一致します。隣り合う区間の測地線は共通部分で方向も一致し、[測地線の初期値一意性](../LORG4/index.md#prop-lorg4-lorentz-exponential)から同一の測地線へ継がれます。

最後に、$A$ 内にとどまるこの光的測地線を過去へ極大に延ばします。過去端点 $r\in M\setminus\overline S$ があるなら、いま証明した構成を $r$ に適用して、そのさらに過去から $r$ へ至る境界内の光的測地線片が得られます。接続方向が異なれば先ほどの角の短絡が作られてachronal性に反するため、延長は元の測地線と滑らかにつながり、極大性に矛盾します。従って過去端点が存在する場合は $\overline S$ に属し、時空内に過去端点を持たない場合は過去非延長です。$\square$
<!-- proof-end -->

**何を言っていないか**：すべての境界点で過去へ非自明な光的生成子がある、とは主張していません。例えば $S=\{(0,x):x\ge0\}$ の境界の水平部分は $S$ に含まれ、光的な生成子を必要としません。また生成子の**過去**についての主張を、そのまま未来方向へ裏返すこともできません。未来へ進む生成子は、別の生成子と合流・交差する場所で境界を離れ得ます。

## 7. 半直線の未来境界を式で描く

再び二次元Minkowski時空で
$$
S=\{(0,x):x\ge0\}
$$
とします。$S$ から $(t,x)$ へ時間的に進むには、ある $a\ge0$ が存在して $t>|x-a|$ でなければなりません。右辺の最小値は
$$
\inf_{a\ge0}|x-a|=\max(0,-x)
$$
です。従って
$$
I^+(S)=\{(t,x):t>\max(0,-x)\},
\qquad
A^+(S)=\{(t,x):t=\max(0,-x)\}.
$$
$x\ge0$ の部分は時刻零の水平半直線、$x<0$ の部分は $t=-x$ の光線です。$o=(0,0)$ は $S$ のedgeですが、$A^+(S)$ ではedgeではありません。$x<0$ の光線上の各点は、$o$ を過去端点とする光的測地線上にあります。これは前節の定理の「過去端点は $\overline S$ に入る」を具体化しています。

**反例から分かること**：単なるachronal集合は端を持ち得ます。一方、未来集合の境界として作り直すと、その端から光的部分が付け加わり、局所的には端のないグラフができます。ただし、この局所的な結果だけから「どの非延長因果曲線も一度だけ交わる」というCauchy性は導けません。その条件は次章以降に別途導入します。

## 8. 演習

<a id="ex-lorg12-a01"></a>
### LORG12-A01 時刻一定面の二条件
- Level: A

二次元Minkowski時空の $S=\{(3,x):-2\le x\le2\}$ についてachronal性とacausal性を定義から判定せよ。

<!-- solution-start -->
**詳細解答**。$p=(3,a)$、$q=(3,b)$ が異なるとき $\Delta t=0$、$|\Delta x|=|b-a|>0$ です。[Minkowski到達条件](../LORG6/index.md#thm-lorg6-minkowski-futures)により $p\le q$ も $q\le p$ も成立しません。従ってacausalです。$p=q$ についても $p\ll p$ は $0>0$ に反して成立しないので、$I^+(S)\cap S=\varnothing$ となりachronalです。
<!-- solution-end -->

<a id="ex-lorg12-a02"></a>
### LORG12-A02 光線分の違い
- Level: A

$N=\{(u,-u):0\le u\le3\}$ がachronalでacausalでないことを示せ。

<!-- solution-start -->
**詳細解答**。$p=(u,-u)$、$q=(v,-v)$、$u<v$ とすると $\Delta t=v-u>0$、$|\Delta x|=v-u$ です。時間的到達の必要条件 $\Delta t>|\Delta x|$ は成立せず、すべての順序付き二点について時間的到達はありません。よってachronalです。一方、例えば $u=0,v=1$ は $\Delta t=|\Delta x|=1$ で未来光的直線分が存在し、異なる二点が $p\le q$ を満たします。従ってacausalではありません。
<!-- solution-end -->

<a id="ex-lorg12-a03"></a>
### LORG12-A03 区間のedge
- Level: A

$S=\{(0,x):-2\le x\le1\}$ のedgeを求め、内部点がedgeでない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[Minkowski時刻一定面のedge](#lem-lorg12-spacelike-slice-edge)で $A=[-2,1]$ とすると $\partial_{\mathbb R} A=\{-2,1\}$ です。よって
$$
\operatorname{edge}(S)=\{(0,-2),(0,1)\}.
$$
内部の $a\in(-2,1)$ では $0<\delta<\min(a+2,1-a)$ として $|x-a|<\delta$ を保つ小箱を取ると、負時刻から正時刻へ至る連続曲線は時刻零で $S$ を通ります。edgeの定義に必要な回避曲線が、その小箱では存在しないことが理由です。
<!-- solution-end -->

<a id="ex-lorg12-a04"></a>
### LORG12-A04 点の未来境界
- Level: A

$S=\{(1,2)\}$ に対する $I^+(S)$ と $A^+(S)$ を計算し、境界が閉じていることを確かめよ。

<!-- solution-start -->
**詳細解答**。時間差 $t-1$、空間差 $x-2$ を[LORG6の錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)へ代入すると
$$
I^+(S)=\{(t,x):t-1>|x-2|\}.
$$
連続関数 $h(t,x)=t-1-|x-2|$ を使えば閉包は $\{h\ge0\}$ なので、
$$
A^+(S)=\{(t,x):t-1=|x-2|\}.
$$
これは連続関数 $h$ の零点集合であり閉です。二本の光線が頂点 $(1,2)$ で接するため、頂点で滑らかとは限りません。
<!-- solution-end -->

<a id="ex-lorg12-b01"></a>
### LORG12-B01 開区間と閉区間の端
- Level: B

$S_1=\{(0,x):0<x<2\}$、$S_2=\{(0,x):0\le x\le2\}$ のedgeを比較し、$S_1$ 自身にはない点がedgeになり得ることを示せ。

<!-- solution-start -->
**詳細解答**。空間集合 $A_1=(0,2)$ と $A_2=[0,2]$ の境界はいずれも $\{0,2\}$ です。[Minkowski時刻一定面のedge](#lem-lorg12-spacelike-slice-edge)を適用すると
$$
\operatorname{edge}(S_1)=\operatorname{edge}(S_2)=\{(0,0),(0,2)\}.
$$
$S_1$ では両端点は $S_1$ に含まれませんが $\overline{S_1}$ に属します。edgeの定義が $p\in S$ でなく $p\in\overline S$ を要求するため、これらもedgeになります。
<!-- solution-end -->

<a id="ex-lorg12-b02"></a>
### LORG12-B02 一般時空での境界のachronal性
- Level: B

任意の部分集合 $S\subset M$ について $p,q\in\partial I^+(S)$ かつ $p\ll q$ と仮定して矛盾を導け。使う開性を明記せよ。

<!-- solution-start -->
**詳細解答**。$F=I^+(S)$ とすると、[時間的未来の開性](../LORG7/index.md#thm-lorg7-chronological-open)で $F$ は開集合です。境界点 $p$ は $\overline F\setminus F$ に属します。

$p\ll q$ と仮定すると、[端点安定性](../LORG7/index.md#lem-lorg7-timelike-endpoints)によって $p$ の開近傍 $U$ が取れ、任意の $u\in U$ について $u\ll q$ です。閉包条件により $u\in U\cap F$ を選び、ある $s\in S$ で $s\ll u$ とできます。

時間的曲線を結ぶと

$$
s\ll u\ll q\quad\Longrightarrow\quad s\ll q\quad\Longrightarrow\quad q\in F.
$$

ところが境界点 $q$ は $q\notin F$ なので矛盾します。従って境界上の異なる点も同じ点も、時間的に結ばれません。
<!-- solution-end -->

<a id="ex-lorg12-b03"></a>
### LORG12-B03 グラフならedgeがない
- Level: B

小座標箱 $V$ 内の閉achronal集合が $t=f(\mathbf x)$ という連続グラフであり、各縦線が未来時間的とする。$p$ の十分小さい近傍で時間的な回避曲線が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**。$p=(f(\mathbf x_p),\mathbf x_p)$ とします。$q\ll_V p$ が $t_q\ge f(\mathbf x_q)$ を満たせば、$q$ はグラフ上か上側です。上側ではグラフ点 $(f(\mathbf x_q),\mathbf x_q)\ll_V q\ll_V p$ となり、グラフ上では $q\ll_V p$ がそのままachronal性に矛盾します。よって $h(q)=t_q-f(\mathbf x_q)<0$ です。同じ議論で $r\in I_V^+(p)$ なら $h(r)>0$ です。$V$ 内で $q$ と $r$ を結ぶ任意の連続曲線に沿って $h$ は連続で符号を変えるので、中間値の定理により途中で $h=0$、すなわちグラフと交わります。従って $p$ はedgeに入りません。
<!-- solution-end -->

<a id="ex-lorg12-b04"></a>
### LORG12-B04 半直線境界の光的部分
- Level: B

$S=\{(0,a):a\ge0\}$ について $A^+(S)$ を計算し、$p=(2,-2)$ に至る光的生成子の過去端点を特定せよ。

<!-- solution-start -->
**詳細解答**。$(t,x)\in I^+(S)$ はある $a\ge0$ について $t>|x-a|$ を満たすことと同値です。$x\ge0$ なら $a=x$ が最小値零を与え、$x<0$ なら $a=0$ が最小値 $-x$ を与えます。従って
$$
A^+(S)=\{(t,x):t=\max(0,-x)\}.
$$
$p=(2,-2)$ は左側の $t=-x$ 上にあります。$\gamma(u)=(u,-u)$（$0\le u\le2$）は $\dot\gamma=(1,-1)$、$g(\dot\gamma,\dot\gamma)=-1+1=0$、未来向きで、全点が境界に属します。過去端点は $(0,0)\in S$ です。
<!-- solution-end -->

<a id="ex-lorg12-c01"></a>
### LORG12-C01 edgeを持つ初期集合とedgeを持たない境界
- Level: C

二次元Minkowski時空で $S=\{(0,x):0\le x\le2\}$ とする。

1. $S$ がacausal・achronalであることと $\operatorname{edge}(S)$ を確認せよ。
2. $A^+(S)$ を区分的に計算せよ。
3. $A^+(S)$ にedgeがないことを、一般定理を引用するだけでなくグラフを使って説明せよ。
4. $p=(1,-1)$ での光的生成子とその過去端点を求めよ。

<!-- solution-start -->
**詳細解答**。

(1) 異なる二点の時間差は零、空間差は正なので因果的に結べず、$S$ はacausalです。自身への非定数時間的到達もないためachronalです。[Minkowski時刻一定面のedge](#lem-lorg12-spacelike-slice-edge)により空間区間の境界は $\{0,2\}$ なので
$$
\operatorname{edge}(S)=\{(0,0),(0,2)\}.
$$

(2) 点 $(t,x)$ が $I^+(S)$ に属する条件は $t>\inf_{0\le a\le2}|x-a|$ です。この最小値は $x<0$ で $-x$、$0\le x\le2$ で零、$x>2$ で $x-2$ となります。従って
$$
A^+(S)=\{(f(x),x):x\in\mathbb R\},
\quad
f(x)=
\begin{cases}
-x,&x<0,\\
0,&0\le x\le2,\\
x-2,&x>2.
\end{cases}
$$

(3) 関数 $f$ は連続で、各区間の傾きの絶対値は高々1です。区間の継ぎ目をまたぐ場合にも、折れ線の各小区間での増分の絶対値を足せば $|f(x)-f(y)|\le|x-y|$ です。よってグラフ上の二点は時間的に結べません。さらに $p=(f(a),a)$ の直前直後の点 $q\ll p\ll r$ は $h(t,x)=t-f(x)$ の値が負・正です（もし逆ならグラフ上の点との時間的関係が生じます）。時間的曲線上でも $h$ は連続であり、負の値から正の値へ移る途中では必ず零を取るため、edgeの回避条件を満たしません。端点 $(0,0),(0,2)$ も境界全体ではedgeではありません。

(4) $p=(1,-1)$ は左光線 $t=-x$ にあり、$\gamma(u)=(u,-u)$（$0\le u\le1$）が境界上の未来光的測地線です。速度の自己内積は零、時刻成分は正で、過去端点 $(0,0)$ は $S$ に属します。これは[生成子定理](#thm-lorg12-null-generators)の端点条件の具体例です。
<!-- solution-end -->

## 参考文献

- B. O'Neill, *Semi-Riemannian Geometry with Applications to Relativity*, ch. 14. 非時間的集合と境界の局所幾何。
- S. W. Hawking and G. F. R. Ellis, *The Large Scale Structure of Space-Time*, §6.3. edge、achronal境界、生成子。
- E. Minguzzi, [Lorentzian causality theory](https://link.springer.com/article/10.1007/s41114-019-0019-x), *Living Reviews in Relativity* **22** (2019). 因果境界と生成子の一般理論。
