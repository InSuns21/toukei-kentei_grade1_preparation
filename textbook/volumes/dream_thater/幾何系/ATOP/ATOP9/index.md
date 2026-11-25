# ATOP9 被覆空間の分類と普遍被覆

[ATOP5](../ATOP5/index.md) では一つの被覆が与えられれば道を持ち上げられました。[ATOP8](../ATOP8/index.md) ではグラフの基本群を求めました。今回は逆に、基本群の部分群から被覆そのものを作ります。円周の何周分を同じ点として扱うかを選ぶと、実直線や有限枚の円周が現れる、という仕組みを一般化します。

以下、$I=[0,1]$、底空間を $X$、基点を $x_0\in X$、[基本群](../ATOP4/index.md#def-atop4-fundamental-group) を $G=\pi_1(X,x_0)$ とします。

[道の連結と逆走](../ATOP4/index.md#def-atop4-path-operations) に従い、$\alpha*\beta$ は左から右へ進む順序、$\bar\alpha(s)=\alpha(1-s)$ は逆走、$c_x(s)=x$ は定値道です。道のパラメータ $s$ は $I$ を動きます。

$[\alpha]$ は端点を固定した [道ホモトピー](../ATOP4/index.md#def-atop4-path-homotopy) による類、$\simeq_p$ はそのホモトピー関係です。ループの類の積は連結で、群の単位元 $1=[c_{x_0}]$ と円周の点 $1\in S^1$ は文脈で区別します。三本以上の連結の括弧は [道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) により類を考えるときに省略します。

<!-- definition-example-audit: strict -->

## 1. 小さな近傍に必要な性質

円周を覆う実直線では、小さな弧の中を移動するだけなら何周もすることはありません。一般の空間でも、近傍内で点を道によって結べることと、その中のループが大域的には何も巻かないことを要求します。二つの条件は別々です。[弧状連結性](../../../基礎科目/TOP/TOP3/index.md#def-top3-path-connected) とは、任意の二点をその集合内の道で結べることでした。ここではそのような開集合を各点の周りで任意に小さく取れるかを調べます。

<a id="def-atop9-locally-path-connected"></a>

<!-- formal-statement-start -->
> **定義（局所弧状連結性）**
> 位相空間 $X$ の各点 $x$ とその任意の開近傍 $O$ に対し、弧状連結な開集合 $U$ が存在して $x\in U\subset O$ となるとき、$X$ は局所弧状連結という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop9-locally-path-connected -->
**定義の確認**

実直線で $x\in O$ が開なら、ある $\varepsilon>0$ に対して $(x-\varepsilon,x+\varepsilon)\subset O$ です。

その区間の任意の二点 $a,b$ は道 $s\mapsto (1-s)a+sb$ で結べます。

値は両端の間にあるため区間から出ません。

したがって実直線は局所弧状連結です。
<!-- definition-example-end -->

次の条件では近傍内で縮められることまでは要求しません。[ループ](../ATOP4/index.md#def-atop4-loop) は始点と終点が同じ道です。近傍を出てもよいので、空間全体でループを縮められることを要求します。

<a id="def-atop9-semilocal"></a>

<!-- formal-statement-start -->
> **定義（半局所単連結性）**
> 位相空間 $X$ の各点 $x$ に対して開近傍 $U$ が存在し、$U$ 内の $x$ を基点とする任意のループが $X$ 内で定値ループと道ホモトピックであるとき、$X$ は半局所単連結という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop9-semilocal -->
**定義の確認**

円周 $S^1$ の点 $x$ を含む十分短い開弧 $U$ は開区間と同相です。

[円周の実直線による被覆](../ATOP5/index.md#prop-atop5-circle-cover) の局所逆写像を $\varphi:U\to J$ とします。

$x$ を基点とする任意のループ $\gamma$ に対して

$$
K(s,t)=\varphi^{-1}((1-t)\varphi(\gamma(s))+t\varphi(x))
$$

と置きます。

ここで $s\in I$ はループをたどる時刻、$t\in I$ は変形の進み具合です。$\varphi$ とその逆は同相写像の両方向であり、区間 $J$ は凸なので括弧内は常に $J$ に属し、$K$ は連続です。

$t=0$ で $\gamma$、$t=1$ で定値道、$s=0,1$ で常に $x$ です。

従って円周は半局所単連結です。

同じ開弧内の二点は区間座標で線分を用いて結べるため、局所弧状連結性も満たします。
<!-- definition-example-end -->

以下では $X$ が弧状連結、局所弧状連結、半局所単連結であると仮定します。三つの条件から、各点の任意の開近傍内に、次の性質を持つ開集合 $U$ を選べます。

- $U$ は弧状連結である。
- $U$ 内の任意のループは、その基点を固定して $X$ 内で定値道に変形できる。

実際、半局所単連結性で得た近傍と指定された開近傍の共通部分から、局所弧状連結性により弧状連結な $U$ を選びます。

中心 $x$ 以外の点 $y$ のループ $\beta$ については、$U$ 内の道 $\eta:x\to y$ を選びます。

$\eta*\beta*\bar\eta$ は $x$ のループなので $X$ で自明です。

[道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) に従い左に $\bar\eta$、右に $\eta$ を連結すると $\beta$ も自明になります。

以後この性質を持つ開集合を小近傍と呼びます。

また、局所弧状連結な空間では道で到達できる点の集合は開です。各到達点を含む弧状連結な開近傍の点も到達できるからです。到達できない点の集合も、同じ議論で開です。従って空間が連結なら全点が到達でき、弧状連結です。[被覆写像の定義](../ATOP5/index.md#def-atop5-covering-map) によれば各シートは底空間の開集合と同相です。上の任意の開近傍とシートとの共通部分を底へ写し、そこで弧状連結な開近傍を選んで逆写像で戻せば、被覆空間も局所弧状連結になります。

## 2. 被覆から部分群を取り出す

[被覆写像](../ATOP5/index.md#def-atop5-covering-map) $p:E\to X$ に対して $e_0\in p^{-1}(\{x_0\})$ を選びます。

点の逆像をファイバーと呼びます。[道の持上げ](../ATOP5/index.md#thm-atop5-path-lifting) により、ループ $\alpha$ と初期値 $e_0$ に対し $p\circ\widetilde\alpha=\alpha$ を満たす道 $\widetilde\alpha$ が一意に決まります。[基本群の誘導準同型](../ATOP4/index.md#thm-atop4-induced-homomorphism) は $p_*[\beta]=[p\circ\beta]$ であり、その像は部分群です。

$x_0$ からのループが $e_0$ に戻るように持ち上がるかどうかで、ループを分類できます。

<a id="thm-atop9-closed-lift"></a>

<!-- formal-statement-start -->
> **定理（閉じた持上げの判定）**
> 被覆写像 $p:E\to X$ と基点 $e_0$、$x_0=p(e_0)$ を取る。$x_0$ のループ $\alpha$ の $e_0$ からの持上げを $\widetilde\alpha$ とする。この持上げがループとなる必要十分条件は

$$
[\alpha]\in p_*\pi_1(E,e_0)
$$

> である。ここで $p_*$ は基本群の誘導準同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\widetilde\alpha(1)=e_0$ なら $\widetilde\alpha$ 自身がループで、その投影は $\alpha$ です。

従って [基本群の誘導準同型](../ATOP4/index.md#thm-atop4-induced-homomorphism) により $p_*[\widetilde\alpha]=[\alpha]$ です。

逆に像に属するなら $e_0$ のループ $\beta$ が存在し、$p_*[\beta]=[\alpha]$ です。

すなわち $p\circ\beta$ と $\alpha$ は道ホモトピックです。

$\beta$ は $p\circ\beta$ の持上げなので、[持上げの終点不変性](../ATOP5/index.md#cor-atop5-endpoint-invariance) により $\widetilde\alpha(1)=\beta(1)=e_0$ です。
<!-- proof-end -->

円周を複素数の絶対値1の集合とみなし、$z=e^{2\pi i u}$ は $(\cos 2\pi u,\sin 2\pi u)$ の複素数表示とします。$u$ は一周を1とする角度の座標です。

正整数 $n$ に対する写像 $p_n:S^1\to S^1$、$p_n(z)=z^n$ を考えます。[円周の実直線による被覆](../ATOP5/index.md#prop-atop5-circle-cover) の局所座標を使い、任意の点を含む開弧 $U$ を長さ1未満の開区間 $J$ の指数写像による像とします。$u\in J$ と $j=0,\ldots,n-1$ に対し

$$
v_j(e^{2\pi i u})=e^{2\pi i(u+j)/n}
$$

と置くと、$p_n(v_j(e^{2\pi i u}))=e^{2\pi i u}$ です。逆に $p_n(e^{2\pi i v})=e^{2\pi i u}$ なら $nv-u$ は整数なので、その整数を $n$ で割った余り $j$ によって上の形に表せます。異なる余りは同じ点を与えません。各 $v_j$ の像は開弧で、$v_j$ はそこでの $p_n$ の制限の連続な逆写像です。写像 $p_n$ 自身は連続で、この局所逆写像から全射でもあります。よって [被覆写像](../ATOP5/index.md#def-atop5-covering-map) の全条件が成立します。特に $n=3$ と置けば三枚被覆です。以下の例では $p=p_3$ とします。

基点を上下とも1とし、ループ $\alpha(s)=e^{2\pi i ks}$（$k$ は整数）を持ち上げると

$$
\widetilde\alpha(s)=e^{2\pi i ks/3}
$$

です。これは連続、初期値1、三乗が $\alpha(s)$ なので [道の持上げ](../ATOP5/index.md#thm-atop5-path-lifting) の一意性から確定します。終点が1となるのは $k$ が3の倍数のときです。[円周の基本群](../ATOP6/index.md#thm-atop6-fundamental-group-circle) と上の判定から像部分群は $3\mathbb Z$ です。

## 3. 部分群から被覆を組み立てる

今度は $G$ の任意の部分群 $H$ が与えられたとします。すべての道を記録すると同じ到着点に多数の履歴が残ります。そこで、一方を通って他方を逆走したループが $H$ に入るときだけ二つの履歴を同一視します。

<a id="thm-atop9-path-construction"></a>

<!-- formal-statement-start -->
> **定理（道類による被覆の構成）**
> 弧状連結・局所弧状連結・半局所単連結な空間 $X$、基点 $x_0$、$G=\pi_1(X,x_0)$ の部分群 $H$ を取る。$x_0$ から始まる道の集合上で

$$
\alpha\sim_H\beta
\iff
\alpha(1)=\beta(1),\quad [\alpha*\bar\beta]\in H
$$

> と定める。この同値関係の類を $[\alpha]_H$ とし、その集合を $E_H$ とする。$E_H$ には位相を入れることができ、終点写像 $p_H:E_H\to X$ は連結な被覆となる。基点 $e_H=[c_{x_0}]_H$ に関して

$$
p_H([\alpha]_H)=\alpha(1),\qquad
(p_H)_*\pi_1(E_H,e_H)=H.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同値関係を確かめた後、到着点の小近傍内で道を延ばすことで被覆のシートを作ります。小近傍内の異なる延ばし方は大域的に同じ道類になるため、シートの中では「終点だけ」で点が決まります。

<!-- proof-start -->
### 証明

**同値関係と終点写像。** [道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) から $[\alpha*\bar\alpha]=1\in H$ なので反射律が成立します。対称律は逆元を取ると得られます。推移律について、同じ終点を持つ三つの道に対して

$$
[\alpha*\bar\beta][\beta*\bar\gamma]
=[\alpha*\bar\gamma]
$$

です。中央の逆走と順走が相殺され、$H$ は積で閉じているので推移律が成立します。終点写像は定義から代表元によらず、$X$ が弧状連結なので全射です。

**位相の構成。** $\alpha$ の終点 $x$ を含む小近傍 $U$ に対して

$$
B(\alpha,U)=
\{[\alpha*\eta]_H:
\eta(0)=x,\ \eta(I)\subset U\}
$$

を作ります。代表元 $\alpha$ を $\beta\sim_H\alpha$ に置き換えても、同じ延長 $\eta$ に対し [道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) から

$$
[(\alpha*\eta)*\overline{(\beta*\eta)}]
=[\alpha*\eta*\bar\eta*\bar\beta]
=[\alpha*\bar\beta]\in H.
$$

従って $[\alpha*\eta]_H=[\beta*\eta]_H$ となり、この集合は変わりません。

各 $y\in U$ に対し $x$ から $y$ への道 $\eta$ が存在します。

別の道 $\xi$ を選んでも $\eta*\bar\xi$ は $U$ 内のループで $X$ では自明です。

従って

$$
[\alpha*\eta*\bar\xi*\bar\alpha]=1\in H.
$$

つまり $B(\alpha,U)$ の点は終点 $y$ ごとにただ一つです。

ここで $p_H$ の制限が $U$ への全単射になります。

これらの集合は $E_H$ を覆います。

二つの集合の共通点 $[\delta]_H$ があれば、その終点を含む小近傍 $W$ を二つの底の開集合の共通部分内に取ります。

$[\delta]_H$ はそれぞれの集合に属するので、それぞれの道の延長で表せます。

その延長にさらに $W$ 内の道を連結しても元の底の開集合内に留まります。

従って

$$
B(\delta,W)\subset B(\alpha,U)\cap B(\beta,V).
$$

この二条件により集合族を開基とする位相が定まります。具体的には開集合をこれらの集合の任意の合併とすれば、有限交叉も開基の合併になります。

**局所同相とシート分解。** 底の開集合 $O$ の逆像内の各点に対して、その終点を含む小近傍 $U\subset O$ を選べば $B(\alpha,U)$ が逆像内に入ります。

従って $p_H$ は連続です。

また各開基の像は

$$
p_H(B(\alpha,U))=U
$$

です。任意の開集合は開基の合併であり、その像は開集合の合併になります。従って開集合の像は開です。特にシートの開集合は全空間でも開なので、制限の逆写像による逆像は開です。そのため制限の全単射の逆も連続になります。

小近傍 $U$ の一点 $x$ を選びます。

終点 $x$ を持つ道の類ごとに $B(\alpha,U)$ を取ります。

これらが $p_H^{-1}(U)$ を覆うことは、終点 $y\in U$ の任意の道 $\delta$ に対し、$U$ 内の道 $\xi:y\to x$ を選べば $[\delta*\xi]_H$ が $x$ の上にあり、$\bar\xi$ を連結して元の類へ戻ることから分かります。

二つの集合が交われば、ある $y$ と $U$ 内の道 $\eta,\xi:x\to y$ に対して

$$
[\alpha*\eta*\bar\xi*\bar\beta]\in H.
$$

中央のループ $\eta*\bar\xi$ は $X$ で自明です。

従って $[\alpha*\bar\beta]\in H$ となり、もとの $x$ 上の類は等しくなります。

異なる類のシートは互いに素です。

以上は [被覆写像](../ATOP5/index.md#def-atop5-covering-map) の条件そのものです。

**弧状連結性と像部分群。** 任意の道 $\alpha$ について、$t\in I$ を固定し、$s\in I$ を動かして途中まで進む道 $\alpha_t(s)=\alpha(ts)$ を使って

$$
L_\alpha(t)=[\alpha_t]_H
$$

と置きます。

$t_0$ の近くで $\alpha(t)$ が小近傍 $U$ に留まるように時間の区間を選びます。

その時間区間内の $t$ に対し、$\eta_t(s)=\alpha(t_0+(t-t_0)s)$ と置きます。$t<t_0$ なら逆向きに進む道です。連結 $\alpha_{t_0}*\eta_t$ は $\alpha$ に連続な時刻関数

$$
q(s)=
\begin{cases}
2t_0s & 0\le s\le 1/2,\\
t_0+(t-t_0)(2s-1) & 1/2\le s\le 1
\end{cases}
$$

を合成した道です。$q(0)=0$、$q(1)=t$ で、値はすべて $I$ 内です。時刻関数を線形補間して

$$
M(s,h)=\alpha((1-h)q(s)+hts)
$$

と置くと、$h\in I$ を動かす間も値は $X$ 内、両端は $x_0,\alpha(t)$ のままです。$h=0$ で連結した道、$h=1$ で $\alpha_t$ になります。従って [道ホモトピー](../ATOP4/index.md#def-atop4-path-homotopy) により $[\alpha_t]_H=[\alpha_{t_0}*\eta_t]_H$ です。

したがってその時間区間では

$$
L_\alpha(t)=(p_H|_{B(\alpha_{t_0},U)})^{-1}(\alpha(t)).
$$

右辺は連続なので $L_\alpha$ は各 $t_0$ の近くで連続、従って全体で連続です。

始点は $e_H$、終点は $[\alpha]_H$ です。

全点が $e_H$ から道で結ばれるので $E_H$ は弧状連結です。

$L_\alpha$ は $\alpha$ の持上げでもあります。

$\alpha$ が $x_0$ のループなら、終点が $e_H$ となるのは

$$
[\alpha]_H=[c_{x_0}]_H
\iff [\alpha]\in H
$$

のときです。[道の持上げの一意性](../ATOP5/index.md#thm-atop5-path-lifting) により $L_\alpha$ が指定の持上げであり、[閉じた持上げの判定](#thm-atop9-closed-lift) より所望の像部分群を得ます。
<!-- proof-end -->

例えば $H=2\mathbb Z$ として円周を考えます。二つの道が同じ点へ着いたとき、0から実直線へ持ち上げた終点の差は整数です。その整数が偶数なら同じ類になります。従って実直線上で2だけ離れた点を同一視する円周が得られ、二枚被覆になります。これを一般の部分群について証明するのが次節です。

## 4. 基点付きの分類と枚数

二つの被覆が底空間の上で同じ形であるとは、単に上の空間が [同相](../../../基礎科目/TOP/TOP2/index.md#def-top2-homeomorphism)（連続な逆写像を持つ連続全単射）であるだけでなく、各点の投影先を変えないことです。基点付きの場合は同じ底の点の上の基点も対応させます。

<a id="def-atop9-cover-equivalence"></a>

<!-- formal-statement-start -->
> **定義（被覆の同値）**
> 同じ底空間 $X$ の被覆写像 $p:E\to X$ と $q:F\to X$ を取る。
> 同相写像 $f:E\to F$ が次の条件を満たすとき、二つの被覆は同値という。

$$
q\circ f=p.
$$

> 基点 $e_0,f_0$ を指定した場合、さらに次の条件を満たす同値を基点付きの同値という。

$$
f(e_0)=f_0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop9-cover-equivalence -->
**定義の確認**

$p:\mathbb R\to S^1$ を $p(u)=e^{2\pi i u}$、$q:\mathbb R\to S^1$ を $q(v)=e^{-2\pi i v}$ とします。

前者は [円周の実直線による被覆](../ATOP5/index.md#prop-atop5-circle-cover) です。後者は前者と実直線の反転 $v\mapsto-v$ の合成なので、前者の各シートを反転すれば同相なシート分解が得られ、やはり被覆です。

$f(u)=-u$ は逆写像も $v\mapsto-v$ でともに連続です。

$$
q(f(u))=e^{2\pi i u}=p(u).
$$

さらに $f(0)=0$ なので基点0を保つ同値です。
<!-- definition-example-end -->

<a id="thm-atop9-based-classification"></a>

<!-- formal-statement-start -->
> **定理（連結被覆の基点付き分類）**
> 弧状連結・局所弧状連結・半局所単連結な空間 $X$ と基点 $x_0$ を取る。連結被覆（$E$ が連結）$p:E\to X$ と基点 $e_0\in p^{-1}(\{x_0\})$ の基点付き同値類は、$G=\pi_1(X,x_0)$ の部分群と一対一に対応する。対応は

$$
(p,e_0)\longmapsto p_*\pi_1(E,e_0)
$$

> で与えられる。各部分群 $H$ の代表は道類による被覆 $p_H:E_H\to X$ である。
<!-- formal-statement-end -->

### 証明の見取り図

与えられた被覆の点を、基点から底空間の道を持ち上げた到着点として表します。同じ点へ着く二つの履歴を判定すると、前節で作った同値関係がそのまま現れます。

<!-- proof-start -->
### 証明

[基点付きの被覆の同値](#def-atop9-cover-equivalence) $f$ はループを対応させ、$q\circ f=p$ により投影を変えないので像部分群を保ちます。逆写像でも同じことが成り立つため、二つの像は等しくなります。[道類による被覆の構成](#thm-atop9-path-construction) から任意の $H$ が実現されます。

逆に連結被覆 $p:E\to X$ を取り、$H=p_*\pi_1(E,e_0)$ と置きます。

第1節の議論により $E$ は弧状連結です。

$\alpha$ の持上げの終点を $T(\alpha)$ とし、

$$
f:E_H\to E,\qquad f([\alpha]_H)=T(\alpha)
$$

と定めます。

同じ終点を持つ道 $\alpha,\beta$ について、$\alpha*\bar\beta$ の持上げが閉じることと $T(\alpha)=T(\beta)$ は同値です。

実際、終点が一致すれば $\alpha$ の持上げに $\beta$ の持上げの逆走を連結できます。

逆に持上げが閉じるなら、その後半を逆走した道は $e_0$ からの $\beta$ の持上げになります。

[道の持上げの一意性](../ATOP5/index.md#thm-atop5-path-lifting) によりその終点は $T(\alpha)$ と $T(\beta)$ の両方です。

[閉じた持上げの判定](#thm-atop9-closed-lift) を適用すると

$$
T(\alpha)=T(\beta)\iff [\alpha*\bar\beta]\in H
$$

となります。

終点が異なれば投影先も異なるので、$f$ は代表元によらず単射です。

任意の $e\in E$ に対し $e_0$ から $e$ への道を選び、投影して $\alpha$ とすれば元の道がその持上げなので、$f$ は全射です。

$X$ の小近傍 $U$ をさらに $p$ の均等被覆近傍内に選びます。

均等被覆近傍のシートを $U$ の逆像へ制限したもののうち、$T(\alpha)$ を含むシートを $V$ とします。従って $p|_V:V\to U$ は同相です。

$U$ 内の道を延ばすとき、その持上げは $V$ の局所逆写像で与えられるので

$$
f|_{B(\alpha,U)}=(p|_V)^{-1}\circ p_H|_{B(\alpha,U)}.
$$

右辺は同相であり、これらの開集合が $E_H$ を覆います。

各制限が同相なので、開集合の像はそれらの制限による開集合の像の合併です。

従って $f$ は連続な全単射で、逆写像も連続です。

定義から $p\circ f=p_H$、$f(e_H)=e_0$ なので基点付き同値です。
<!-- proof-end -->

次に基点の上にいくつ点があるかを求めます。その濃度を被覆の枚数と呼び、[部分群の指数](../../../代数系/GRP/GRP2/index.md#def-grp2-index)（剰余類の個数）と比較します。非可換群では $Hg$ と $gH$ は一般には異なります。本講の道の積の順序では、[右剰余類](../../../代数系/GRP/GRP2/index.md#def-grp2-cosets) $Hg$ が自然に現れます。

<a id="thm-atop9-fiber-index"></a>

<!-- formal-statement-start -->
> **定理（被覆の枚数と指数）**
> 弧状連結・局所弧状連結・半局所単連結な空間 $X$ の連結被覆 $p:E\to X$ と基点 $e_0$ を取る。記号を次のように定める。

$$
x_0=p(e_0),\qquad G=\pi_1(X,x_0).
$$

$$
H=p_*\pi_1(E,e_0).
$$

> 基点のファイバーと右剰余類の集合には全単射があり、任意の点 $x\in X$ のファイバーの濃度は部分群の指数に等しい。

$$
|p^{-1}(\{x\})|=[G:H].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[基点付き分類](#thm-atop9-based-classification) により $E_H$ で考えれば十分です。

$x_0$ のファイバーではすべての道はループです。

$g=[\alpha]$、$k=[\beta]$ と置くと

$$
[\alpha]_H=[\beta]_H\iff gk^{-1}\in H.
$$

右辺が成り立てば $g=hk$ となる $h\in H$ があり、$Hg=Hk$ です。

逆に $Hg=Hk$ なら $g\in Hk$ なので $gk^{-1}\in H$ です。

従って $[\alpha]_H\mapsto H[\alpha]$ は全単射です。

左剰余類と右剰余類は逆元を取る写像 $Hg\mapsto g^{-1}H$ により一対一に対応するので、その個数は [部分群の指数](../../../代数系/GRP/GRP2/index.md#def-grp2-index) です。

任意の点 $x$ への道 $\eta:x_0\to x$ を取ります。

各ファイバー点から $\eta$ を持ち上げた終点を対応させ、逆に $\bar\eta$ を持ち上げると、[道の持上げの一意性](../ATOP5/index.md#thm-atop5-path-lifting) により元の点へ戻ります。

よって二つのファイバーの濃度は等しいです。
<!-- proof-end -->

三枚被覆では $G=\mathbb Z$、$H=3\mathbb Z$ です。剰余類を0、1、2で番号付けすると、正向きに一周した後のシート番号は1増えます。

| 出発番号 | 一周後 | 二周後 | 三周後 |
| --- | --- | --- | --- |
| 0 | 1 | 2 | 0 |
| 1 | 2 | 0 | 1 |
| 2 | 0 | 1 | 2 |

三周したときだけ元のシートへ戻ることが、指数3と閉じた持上げの両方を具体化しています。

## 5. 基点を忘れると共役が現れる

同じ被覆でも、ファイバーのどこを出発点とするかで、閉じて持ち上がるループの集合が変わることがあります。

$E_H$ 上で $e_g=[\alpha]_H$ をループ $\alpha$（類 $g=[\alpha]$）の終点の道類とします。

そこからループ $\gamma$（類 $k$）を持ち上げると、[道類による被覆の構成](#thm-atop9-path-construction) と同じく途中までの道 $\gamma_t(s)=\gamma(ts)$ を延長した $t\mapsto[\alpha*\gamma_t]_H$ で表され、終点は $[\alpha*\gamma]_H$ です。これはシートの局所逆写像による連続な持上げで、[道の持上げの一意性](../ATOP5/index.md#thm-atop5-path-lifting) から確定します。

[道類の同値関係](#thm-atop9-path-construction) により閉じる条件は

$$
[\alpha*\gamma*\bar\alpha]=gkg^{-1}\in H.
$$

すなわち新基点に対応する部分群は $g^{-1}Hg=\{g^{-1}hg:h\in H\}$ になります。これは [群の共役](../../../代数系/GRP/GRP3/index.md#def-grp3-conjugation) を各元に適用した部分群です。部分群同士がこの操作で移り合うとき共役であるといい、共役で結ばれる部分群全体を一つの共役類と呼びます。

<a id="thm-atop9-unbased-classification"></a>

<!-- formal-statement-start -->
> **定理（基点なしの連結被覆の分類）**
> 弧状連結・局所弧状連結・半局所単連結な空間 $X$ と基点 $x_0$ を取る。連結被覆の基点を指定しない同値類は、$G=\pi_1(X,x_0)$ の部分群の共役類と一対一に対応する。部分群 $H,K$ の被覆が同値となる必要十分条件は、ある $g\in G$ について

$$
H=g^{-1}Kg
$$

> が成立することである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

被覆同値 $f:E_H\to E_K$ があれば $f(e_H)$ は $E_K$ の $x_0$ のファイバーにあります。

[枚数と指数](#thm-atop9-fiber-index) の対応でその点を $Kg$ と書けます。

上の持上げの計算と [閉じた持上げの判定](#thm-atop9-closed-lift) により、そこでの像部分群は $g^{-1}Kg$ です。

同値は基点 $e_H$ と $f(e_H)$ を対応させるので [基点付き分類](#thm-atop9-based-classification) から $H=g^{-1}Kg$ です。

逆にこの等式が成立するなら $E_K$ の基点を $Kg$ に選び直せば、像部分群が $H$ になります。

[基点付き分類](#thm-atop9-based-classification) により $E_H$ と基点付き同値であり、基点を忘れても同値です。
<!-- proof-end -->

円周の場合は $G=\mathbb Z$ が可換なので、共役しても部分群が変わりません。

一方、円周二つの花束では [花束の基本群](../ATOP8/index.md#thm-atop8-bouquet-group) により $G=F(a,b)$ です。

$H=\langle a\rangle$ と $K=b^{-1}Hb$ は異なる部分群です。

実際 $b^{-1}ab$ は [既約語の一意性](../ATOP8/index.md#prop-atop8-reduced-word) によって $a$ の整数乗と一致しません。

しかし上の定理から同じ基点なしの被覆を記述します。

## 6. 普遍被覆と木

部分群のうち最小の $\{1\}$ は、底空間で自明なループしか閉じない被覆を与えます。この被覆には、上の空間自身にも穴がないという特別な性質があります。[単連結性](../ATOP4/index.md#def-atop4-simply-connected) とは、非空かつ弧状連結で、任意の基点のループが定値道と道ホモトピックになることです。

<a id="def-atop9-universal-cover"></a>

<!-- formal-statement-start -->
> **定義（普遍被覆）**
> 弧状連結な位相空間 $X$ の被覆写像 $p:\widetilde X\to X$ で、$\widetilde X$ が単連結であるものを普遍被覆という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop9-universal-cover -->
**定義の確認**

[円周の実直線による被覆](../ATOP5/index.md#prop-atop5-circle-cover) は $p(u)=e^{2\pi i u}$ です。実直線は線分で任意の二点を結べます。任意のループ $\alpha$ の基点を $a$ とすれば

$$
H(s,t)=(1-t)\alpha(s)+ta
$$

は連続で、$t=0$ で $\alpha$、$t=1$ で定値道、$s=0,1$ で常に $a$ です。

従って [単連結性](../ATOP4/index.md#def-atop4-simply-connected) を満たし、実直線は円周の普遍被覆です。
<!-- definition-example-end -->

<a id="thm-atop9-universal-existence"></a>

<!-- formal-statement-start -->
> **定理（普遍被覆の存在と因子化）**
> 弧状連結・局所弧状連結・半局所単連結な空間 $X$ と基点 $x_0\in X$ を取る。$X$ は普遍被覆を持ち、基点付き同値を除いて一意である。基点付き普遍被覆 $\widetilde p:\widetilde X\to X$ と任意の基点付き連結被覆 $p:E\to X$ に対し、両被覆の基点は $x_0$ の上に選ぶ。この基点を保ち

$$
p\circ r=\widetilde p
$$

> を満たす連続写像 $r:\widetilde X\to E$ が一意に存在し、これも被覆写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[道類による構成](#thm-atop9-path-construction) を $H=\{1\}$ に適用します。上の空間は弧状連結で、[被覆写像が誘導する基本群準同型](../ATOP5/index.md#thm-atop5-induced-injective) は単射です。その像は $\{1\}$ なので上の基本群も自明です。[基本群の基点変更](../ATOP4/index.md#thm-atop4-basepoint-change) により弧状連結な上の空間の任意の基点でも基本群は自明です。従って [普遍被覆の定義](#def-atop9-universal-cover) を満たします。逆に単連結な被覆の像部分群は自明なので [基点付き分類](#thm-atop9-based-classification) により一意です。

$E=E_H$、$\widetilde X=E_{\{1\}}$ と同一視してよいので

$$
r([\alpha]_{\{1\}})=[\alpha]_H
$$

と定めます。

$\{1\}\subset H$ により代表元によらず、同じ道の類を取れば全射です。

小近傍 $U$ に対する各シートで $r$ は終点を変えず、$B(\alpha,U)$ から $E_H$ の対応するシートへ同相に写ります。

従って連続です。

$E_H$ の任意の点の近くでシート $B(\alpha,U)$ を選びます。

その逆像は $E_{\{1\}}$ における $U$ 上のシートのうち、$r$ で $B(\alpha,U)$ に写るものの合併です。

実際、あるシートの一点が逆像にあれば、そのシート全体は道の延長によって $B(\alpha,U)$ に写ります。

各シートは互いに素な開集合で、制限は同相です。

よって [被覆写像の定義](../ATOP5/index.md#def-atop5-covering-map) により $r$ 自身も被覆です。

基点を保つ二つの候補は $p$ に関する同じ写像 $\widetilde p$ の持上げです。$\widetilde X$ は連結なので [連結空間上の持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) により一致します。
<!-- proof-end -->

半局所単連結性は普遍被覆の存在に必要でもあります。もし普遍被覆があれば、均等被覆近傍内のループは一つのシートの逆写像によって閉じた道として持ち上がります。上の空間が単連結なのでその道を定値道へ縮められ、ホモトピーを投影すれば底空間でも縮められます。従って近傍内のループが底空間で縮められない点があると普遍被覆は存在しません。

### 八の字の普遍被覆を描く

円周二つの花束は、辺の内部では開区間、共通頂点では四本の短い半辺を集めた星形の開近傍を持ちます。星形近傍は各半辺の座標を連続的に0へ縮められるので可縮です。内部の区間も可縮であり、[可縮空間は単連結](../ATOP4/index.md#prop-atop4-contractible-simply-connected) により各近傍は弧状連結でループはその中で縮められます。これらは任意に小さく取れ、花束全体も共通頂点を経由して道で結べるので分類定理の三条件を満たします。

その普遍被覆のファイバーは $H=\{1\}$ の右剰余類、すなわち自由群 $F(a,b)$ の各元です。

頂点 $w$ から正向きの $a$ 辺を持ち上げると $wa$、正向きの $b$ 辺なら $wb$ へ着きます。

逆向きの辺はそれぞれ $wa^{-1},wb^{-1}$ に向かいます。

これは [道類による構成](#thm-atop9-path-construction) で道を延ばしたものです。

辺の途中の点も同じ道を途中まで延ばした類で表され、区間座標で連続です。

以下は既約語の長さ2までの部分です。点線に相当する「…」の先にはさらに枝が続きます。

| 長さ1の頂点 | 根の方向以外の隣接頂点（長さ2） |
| --- | --- |
| $a$ | $aa,\ ab,\ ab^{-1}$ |
| $a^{-1}$ | $a^{-1}a^{-1},\ a^{-1}b,\ a^{-1}b^{-1}$ |
| $b$ | $ba,\ ba^{-1},\ bb$ |
| $b^{-1}$ | $b^{-1}a,\ b^{-1}a^{-1},\ b^{-1}b^{-1}$ |

    … ← a の子3個
             |
             a
             |
    … — a⁻¹ — 1 — b — …
             |
             b⁻¹
             |
    … ← b⁻¹ の子3個

模式図は四本の枝の位置だけを表し、各長さ1頂点から外へ三本ずつ続くことは表で補っています。[自由群の既約語の一意性](../ATOP8/index.md#prop-atop8-reduced-word) により、空でない既約語の最後の文字を逆向きにたどる隣接頂点だけが長さを一つ減らします。他の三つは長さを一つ増やします。どの頂点からも文字を順に消して根に戻れるため連結です。もし有限のサイクルがあれば、サイクル上で長さ最大の頂点はサイクル内に異なる二つの長さの短い隣接頂点を持つはずですが、そのような隣接頂点は一つしかありません。従ってサイクルはなく、無限に枝分かれする木になっています。長さ2で切り取った図の境界は実際の被覆の端点ではありません。

## 7. デッキ変換と正規部分群

底の点を動かさず、被覆のシートの対応だけを変える対称性を調べます。つまり [被覆の同値](#def-atop9-cover-equivalence) のうち、同じ被覆からそれ自身への同値を考えます。

<a id="def-atop9-deck"></a>

<!-- formal-statement-start -->
> **定義（デッキ変換）**
> 被覆写像 $p:E\to X$ に対し、同相写像 $d:E\to E$ が $p\circ d=p$ を満たすとき、$d$ をデッキ変換という。合成を演算とするデッキ変換全体の群を $\operatorname{Deck}(p)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop9-deck -->
**定義の確認**

円周の実直線による被覆で $d_m(u)=u+m$（$m\in\mathbb Z$）とします。逆写像は $d_{-m}$ でどちらも連続です。

$$
p(d_m(u))=e^{2\pi i(u+m)}=p(u).
$$

よってデッキ変換です。さらに $d_m\circ d_n=d_{m+n}$、恒等写像は $d_0$ です。
<!-- definition-example-end -->

一般にも恒等写像と合成は投影を保ち、$p\circ d=p$ の両辺を右から $d^{-1}$ と合成すれば逆写像も投影を保ちます。写像の合成は結合的なので群になります。

部分群 $H$ を共役で変えない元を集めた集合を、$H$ の正規化群といい、$N_G(H)$ と書きます。

$$
N_G(H)=\{g\in G:gHg^{-1}=H\}.
$$

$g,k$ がこの集合に属すれば $gkHk^{-1}g^{-1}=gHg^{-1}=H$ です。

また $gHg^{-1}=H$ の両辺を $g^{-1}$ で共役すれば逆元も属します。

単位元も属し、$H$ の元による共役は $H$ を保つので $H\subset N_G(H)$ です。

定義により $N_G(H)$ の全元で $gHg^{-1}=H$ が成立するため、[正規部分群の同値条件](../../../代数系/GRP/GRP2/index.md#prop-grp2-normal-equivalences) により $H$ は $N_G(H)$ の正規部分群です。

従って [商群](../../../代数系/GRP/GRP2/index.md#thm-grp2-quotient-well-defined) を作れます。

<a id="thm-atop9-deck-normalizer"></a>

<!-- formal-statement-start -->
> **定理（デッキ変換群と正規化群）**
> 弧状連結・局所弧状連結・半局所単連結な空間 $X$ の連結被覆 $p:E\to X$ と基点 $e_0\in E$、$x_0=p(e_0)$ を取る。$G=\pi_1(X,x_0)$、$H=p_*\pi_1(E,e_0)$ とし、$N_G(H)=\{g\in G:gHg^{-1}=H\}$ を正規化群とすると

$$
\operatorname{Deck}(p)\cong N_G(H)/H.
$$

> またデッキ変換が基点のファイバー上の任意の点を任意の点へ移せることと、$H$ が $G$ の正規部分群であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

基点をどこへ移すかで変換全体が決まります。ただし任意のファイバー点へ移せるとは限らず、そこで閉じるループの部分群が元と一致する必要があります。

<!-- proof-start -->
### 証明

[基点付き分類](#thm-atop9-based-classification) で $E_H$ を用います。$g\in N_G(H)$ を代表するループ $\lambda$ に対して

$$
d_g([\alpha]_H)=[\lambda*\alpha]_H
$$

と置きます。もし $\alpha\sim_H\beta$ なら

$$
[\lambda*\alpha*\bar\beta*\bar\lambda]
=g[\alpha*\bar\beta]g^{-1}\in H
$$

なので代表元によらず、$\lambda$ の道ホモトピー類だけで決まります。

$d_g$ はシート $B(\alpha,U)$ を $B(\lambda*\alpha,U)$ へ終点を保って写し、各制限は局所座標で恒等写像です。

従って連続です。

$d_g\circ d_k=d_{gk}$ は [道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) により成り立ち、$d_1$ は恒等写像です。

$g^{-1}$ も正規化群に属するので $d_{g^{-1}}$ が連続な逆写像となり、$d_g$ はデッキ変換です。

任意のデッキ変換 $d$ を取ります。$d(e_H)=Hg$ と表すと、同値は閉じるループの集合を保つため [基点変更の計算](#thm-atop9-unbased-classification) により

$$
H=g^{-1}Hg.
$$

従って $g\in N_G(H)$ です。

$d_g$ と $d$ は基点で一致する $p_H$ の持上げなので [連結空間上の持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) から一致します。

よって $g\mapsto d_g$ は全射準同型です。

その核は

$$
d_g=\mathrm{id}
\iff d_g(e_H)=e_H
\iff Hg=H
\iff g\in H.
$$

最初の逆向きは [連結空間上の持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) によります。

ここで商群 $N_G(H)/H$ からデッキ変換群への写像を $Hg\mapsto d_g$ と定めます。

$Hg=Hk$ と $gk^{-1}\in H$ は同値です。先ほどの合成則と核の計算から

$$
d_g=d_k
\iff d_{gk^{-1}}=\mathrm{id}
\iff gk^{-1}\in H.
$$

従って代表元の選び方によらず、しかも単射です。任意のデッキ変換は $d_g$ の形に表せるので全射でもあります。

さらに $H$ は正規化群の正規部分群であり、商群の積は $(Hg)(Hk)=Hgk$ です。この積は $d_{gk}=d_g\circ d_k$ に対応するため群同型が得られます。

基点を移せるファイバー点はちょうど $Hg$（$g\in N_G(H)$）です。

すべてのファイバー点へ移せるなら任意の $k\in G$ について $Hk=Hg$ となる $g\in N_G(H)$ があり、$k\in Hg\subset N_G(H)$ となります。

従って $N_G(H)=G$ となり、[正規部分群の同値条件](../../../代数系/GRP/GRP2/index.md#prop-grp2-normal-equivalences) から $H$ は正規部分群です。

逆に $H$ が正規なら $N_G(H)=G$ であり、すべての点へ移せます。

任意の二点間の移動は、基点から各点への変換を逆写像と合成して得られます。
<!-- proof-end -->

この性質を持つ連結被覆を正規被覆と呼びます。

三枚の円周被覆では $\mathbb Z$ の部分群 $3\mathbb Z$ が正規なのでデッキ変換群は $\mathbb Z/3\mathbb Z$ です。

一方、任意の普遍被覆では $H=\{1\}$ なので $\operatorname{Deck}(\widetilde p)\cong G$ です。

被覆の枚数とデッキ変換の個数が常に等しいわけではありません。

次の演習で非正規の具体例を扱います。

## 8. 演習

### 演習 ATOP9-A1：開弧と局所条件

- Level: A

円周上の任意の点の任意の開近傍の中に、局所弧状連結性と半局所単連結性の両方を確かめられる開集合を選べ。

<!-- solution-start -->
**詳細解答**

[円周の実直線による被覆](../ATOP5/index.md#prop-atop5-circle-cover) の局所座標 $\varphi$ を使います。

指定された開近傍と座標近傍の共通部分を取り、その座標像の中から中心 $\varphi(x)$ を含む開区間 $J$ を選びます。

$U=\varphi^{-1}(J)$ とすれば開で、任意の二点 $y,z$ は道

$$
s\mapsto\varphi^{-1}((1-s)\varphi(y)+s\varphi(z))
$$

で結ばれます。$x$ のループ $\gamma$ については

$$
K(s,t)=\varphi^{-1}((1-t)\varphi(\gamma(s))+t\varphi(x))
$$

が端点を固定した定値道へのホモトピーです。いずれも区間の凸性により値が定義され、連続です。[局所弧状連結性](#def-atop9-locally-path-connected) と [半局所単連結性](#def-atop9-semilocal) の条件が成立します。
<!-- solution-end -->

### 演習 ATOP9-A2：五枚被覆の持上げ

- Level: A

$p(z)=z^5$ の円周被覆で基点1から三周、負の二周、十周するループを持ち上げ、終点を求めよ。対応する部分群も求めよ。

<!-- solution-start -->
**詳細解答**

$k$ 周する道は $\alpha_k(s)=e^{2\pi i ks}$ です。

第2節で確かめた $n$ 枚被覆の構成を $n=5$ に適用します。候補 $e^{2\pi i ks/5}$ は連続で初期値1、五乗が $\alpha_k$ なので [道の持上げ](../ATOP5/index.md#thm-atop5-path-lifting) により求める道です。

従って終点は順に

$$
e^{6\pi i/5},\quad e^{-4\pi i/5},\quad 1.
$$

第一と第二は指数が $2\pi i$ だけ異なるので同じ点です。

任意の整数 $k$ で終点が1になるのは $k\in5\mathbb Z$ のときです。

[円周の基本群](../ATOP6/index.md#thm-atop6-fundamental-group-circle) と [閉じた持上げの判定](#thm-atop9-closed-lift) から像部分群は $5\mathbb Z$ です。
<!-- solution-end -->

### 演習 ATOP9-A3：道類の計算

- Level: A

$X=S^1$、$H=4\mathbb Z$ とする。基点1のループで巻き数が $-1,3,7,2$ である四つの道を、道類の構成において分類せよ。

<!-- solution-start -->
**詳細解答**

[道類による被覆の構成](#thm-atop9-path-construction) により、二つの道の巻き数の差が $4\mathbb Z$ に属するとき同じ類です。

差は $3-(-1)=4$、$7-3=4$ なので最初の三つは同じ類です。

$2-3=-1$ は4で割り切れないので最後の道は別の類です。

剰余類で書けば

$$
4\mathbb Z-1=4\mathbb Z+3=4\mathbb Z+7
$$

で、最後は $4\mathbb Z+2$ です。
<!-- solution-end -->

### 演習 ATOP9-A4：普遍被覆のデッキ変換

- Level: A

$p(u)=e^{2\pi i u}$ のデッキ変換 $d$ が必ず整数平行移動になることを、基点の像と持上げの一意性から示せ。

<!-- solution-start -->
**詳細解答**

$p(d(0))=p(0)=1$ なので $d(0)=m$ は整数です。

$u\mapsto u+m$ は [デッキ変換](#def-atop9-deck) の定義例で確認した変換です。

この写像と $d$ は連結な実直線上の $p$ の持上げで、0において一致します。

[連結空間上の持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) により

$$
d(u)=u+m\qquad (u\in\mathbb R).
$$

合成は整数の加法に対応するのでデッキ変換群は $\mathbb Z$ です。
<!-- solution-end -->

### 演習 ATOP9-B1：因子化の枚数

- Level: B

円周の十二枚被覆 $p_{12}(z)=z^{12}$ と四枚被覆 $p_4(z)=z^4$ を考える。

$p_4\circ r=p_{12}$ を満たす基点1を保つ被覆 $r$ を求め、各被覆に対応する部分群と $r$ の枚数を確かめよ。

<!-- solution-start -->
**詳細解答**

$r(z)=z^3$ と置くと $r(1)=1$ で

$$
p_4(r(z))=(z^3)^4=z^{12}.
$$

短い開弧の三つの逆像の弧はそれぞれ角度を3倍する同相写像で対応するので三枚被覆です。基点を保つ候補は連結な円周からの $p_{12}$ の持上げなので [持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) により一意です。

第2節の $n$ 枚被覆で、$k$ 周する道に対し $e^{2\pi i ks/n}$ は連続で初期値1、$n$ 乗が $e^{2\pi i ks}$ です。[道の持上げ](../ATOP5/index.md#thm-atop5-path-lifting) の一意性から終点は

$$
e^{2\pi i k/4},\qquad e^{2\pi i k/12}
$$

です。[円周の基本群](../ATOP6/index.md#thm-atop6-fundamental-group-circle) と [閉じた持上げの判定](#thm-atop9-closed-lift) により、それぞれ4の倍数、12の倍数のときだけ閉じます。

対応する部分群は $4\mathbb Z$ と $12\mathbb Z$ で、後者が前者に含まれます。

$4\mathbb Z$ を12で割った剰余類は0、4、8の三つなので

$$
[4\mathbb Z:12\mathbb Z]=3.
$$

これは $r$ の枚数と一致します。
<!-- solution-end -->

### 演習 ATOP9-B2：道類のシートの一意性

- Level: B

道類による被覆 $E_H$ で、$U$ を第1節の小近傍、$\alpha$ を $x_0$ から $x\in U$ への道とする。

$U$ 内の二つの道 $\eta,\xi:x\to y$ があるとき、$[\alpha*\eta]_H=[\alpha*\xi]_H$ を示せ。

半局所単連結性が使われている箇所を明示せよ。

<!-- solution-start -->
**詳細解答**

両方の道の終点は $y$ です。[道類の同値関係](#thm-atop9-path-construction) の判定に使うループは

$$
(\alpha*\eta)*\overline{(\alpha*\xi)}
\simeq_p \alpha*\eta*\bar\xi*\bar\alpha.
$$

$\eta*\bar\xi$ は $U$ 内の $x$ のループです。

半局所単連結性から選んだ小近傍の性質により、このループは $X$ 内で $c_x$ と道ホモトピックです。

[道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) から外側の道も相殺されるので

$$
[\alpha*\eta*\bar\xi*\bar\alpha]=1\in H.
$$

従って二つの道は同じ類です。半局所単連結性を使うのは、中央のループが底空間で自明になるところです。この性質なしには特に $H=\{1\}$ のとき、同じ終点に異なる類が残る可能性があります。
<!-- solution-end -->

### 演習 ATOP9-B3：非可換な基点変更

- Level: B

$G=F(a,b)$、$H=\langle a\rangle$ とする。

$E_H$ の基点を $H$ から $Hb$ へ変えたときの部分群を求め、$a$ と $b^{-1}ab$ のそれぞれが新基点で閉じて持ち上がるか判定せよ。

<!-- solution-start -->
**詳細解答**

[基点なしの分類](#thm-atop9-unbased-classification) の計算では、$Hb$ から類 $k$ のループをたどると $Hbk$ に着きます。元の点に戻る条件は

$$
Hbk=Hb\iff bkb^{-1}\in H.
$$

従って新しい部分群は $b^{-1}Hb$ です。

$k=a$ なら $bab^{-1}$ は $b$ を含む既約語です。

[既約語の一意性](../ATOP8/index.md#prop-atop8-reduced-word) により $a$ の整数乗にはならないので閉じません。

$k=b^{-1}ab$ なら

$$
b(b^{-1}ab)b^{-1}=a\in H
$$

なので閉じます。元の基点では判定が逆になります。
<!-- solution-end -->

### 演習 ATOP9-B4：木の頂点数

- Level: B

二つの円周の花束の普遍被覆において、既約語長がちょうど3の頂点数と、長さ3以下の頂点数を求めよ。さらに頂点 $ab^{-1}a$ から根へ戻る辺の列を示せ。

<!-- solution-start -->
**詳細解答**

[自由群の既約語の一意性](../ATOP8/index.md#prop-atop8-reduced-word) と第6節の構成から、長さ1の語は四通りです。次の文字には直前の文字の逆以外の三通りを選べます。よって長さ2は $4\cdot3=12$、長さ3は

$$
4\cdot3^2=36
$$

です。根は空語一つなので長さ3以下の頂点数は $1+4+12+36=53$ です。

最後の文字を打ち消す右からの乗算を順に行います。

$$
ab^{-1}a\xrightarrow{a^{-1}}ab^{-1}
\xrightarrow{b}a\xrightarrow{a^{-1}}1.
$$

三本で根へ戻ります。各辺で語長は高々一つしか減らないので、三本未満では戻れません。
<!-- solution-end -->

### 演習 ATOP9-C1：三枚だが対称性を持たない被覆

- Level: C

$X$ を二つの円周の花束とし、$G=F(a,b)$ とする。

三点集合 $\{1,2,3\}$ 上で、語を左から右へ読むたびに $a$ は1と2を交換し、$b$ は2と3を交換するものとする。

逆文字も対応する交換を行う。

点1を元に戻す語の集合を $H$ とする。

1. $H$ が部分群であることと、その指数が3であることを示せ。
2. $H$ が正規部分群ではないことを具体的な語で示せ。
3. 対応する連結被覆のデッキ変換群を求めよ。

<!-- solution-start -->
**詳細解答**

語の簡約で隣接逆文字対を消しても、二回同じ交換を行う操作は恒等写像なので三点への作用は変わりません。[既約語の一意性](../ATOP8/index.md#prop-atop8-reduced-word) により群の元ごとに操作が決まります。点 $i$ に語 $w$ を作用させた結果を $i\cdot w$ と書きます。連続して二つの語を読むことから

$$
(i\cdot u)\cdot v=i\cdot(uv).
$$

空語は1を固定し、1を固定する二つの語の積も1を固定します。各語の作用は交換の合成、すなわち全単射であり、逆語は逆写像になります。従って $1\cdot u=1$ なら $1\cdot u^{-1}=1$ です。よって $H$ は部分群です。

$1\cdot u=1\cdot v$ なら両方に右から $v^{-1}$ を作用させて $1\cdot(uv^{-1})=1$、すなわち $uv^{-1}\in H$ を得ます。

逆も右から $v$ を作用させれば成立します。

従って右剰余類 $Hu$ と点 $1\cdot u$ が一対一に対応します。

空語で1、$a$ で2、$ab$ で3に到達するので指数は3です。

第6節で確かめた花束の局所条件と [道類による被覆の構成](#thm-atop9-path-construction)、[枚数と指数](#thm-atop9-fiber-index) により三枚の連結被覆が存在します。

$b$ は点1を固定するので $b\in H$ です。一方 $aba^{-1}$ を点1から読むと

$$
1\xrightarrow{a}2\xrightarrow{b}3
\xrightarrow{a^{-1}}3.
$$

従って $aba^{-1}\notin H$ です。[正規部分群の同値条件](../../../代数系/GRP/GRP2/index.md#prop-grp2-normal-equivalences) から $H$ は正規ではありません。

最後に $g\in N_G(H)$ なら $g^{-1}Hg=H$、同値に $gHg^{-1}=H$ です。

任意の $h\in H$ に対して

$$
(1\cdot g)\cdot h
=1\cdot(ghg^{-1}g)=1\cdot g.
$$

特に $b\in H$ なので $1\cdot g$ は $b$ に固定されます。

$b$ が固定する点は1だけです。

従って $1\cdot g=1$、すなわち $g\in H$ です。

逆の包含 $H\subset N_G(H)$ は正規化群の定義から成立します。

$$
N_G(H)=H,\qquad N_G(H)/H=\{1\}.
$$

[デッキ変換群と正規化群](#thm-atop9-deck-normalizer) よりデッキ変換は恒等写像だけです。三枚あることと三つの対称性を持つことは別の条件なのです。
<!-- solution-end -->

## 9. 次の講義へ

被覆の分類では一次元のループを基本群として記録しました。次は図形を三角形やその高次元版に分割し、辺だけでなく面や立体のつながりも計算できるようにします。

## 参考文献

- A. Hatcher, [Algebraic Topology](https://pi.math.cornell.edu/~hatcher/AT/ATchapters.html), Chapter 1, §1.3（Covering Spaces）。
