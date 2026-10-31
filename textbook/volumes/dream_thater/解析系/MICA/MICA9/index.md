# MICA9 特性集合とHamilton流

[MICA8の楕円正則性](../MICA8/index.md#thm-mica8-elliptic-regularity)によって、$Pu$ が滑らかなら $u$ の特異方向は主シンボルが零になる場所に限られると分かりました。しかし「残り得る方向」と「その方向が時空内でどうつながるか」は別の問いです。

例えば平坦時空の波動作用素では、零になる周波数は光円錐を作ります。この円錐上に方向付きの曲線を描く道具が Hamilton 流です。既習の[余接束の正準シンプレクティック形式](../../../幾何系/SYM/SYM3/index.md#thm-sym3-cotangent-symplectic)と[Hamilton ベクトル場](../../../幾何系/SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)を、微分作用素の主シンボルに適用します。

この章のゴールは、曲がった時空でも **Klein–Gordon 作用素の特性方向に沿う Hamilton 曲線を射影すると、アフィンパラメータ付き零測地線になる**ことを、添字・符号を含めて証明することです。曲線の正式な名称は後で導入します。特異性が曲線の**全体に伝播する**というさらに強い定理は MICA10 で証明します。

記号を固定します。$X$ は境界のない滑らかな多様体、$T^*X\setminus0$ は零余ベクトルを除いた余接束です。局所座標は $(x^a,\xi_a)$、$D_a=-i\partial_{x^a}$、同じ添字の上下の反復は総和とします。以下、特性方向を扱う作用素は滑らかな係数を持つ**スカラー**微分作用素（必要に応じ古典擬微分作用素）で、主シンボル $p_m(x,\xi)$ は実数値、滑らかで周波数について $m$ 次同次とします。$m\ge1$ とし、係数と関数は十分滑らかです。

Lorentz 計量を使う節では、[LORG2の符号規約](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)に従って $(-,+,\ldots,+)$ を採用します。$\Box_g u=g^{ab}(\partial_a\partial_bu-\Gamma^c_{ab}\partial_cu)$ です。[HPDE5の主シンボル](../../HPDE/HPDE5/index.md#def-hpde5-principal-symbol)は $\partial$ の係数による規約ですが、この章では MICA8 と同じく $D=-i\partial$ の記号を使います。この違いは二階主シンボルに負号を付けるため、必要な箇所で明示します。

## 1. 特性集合は「逆に解けない」方向

スカラーの[主シンボルと楕円集合](../MICA8/index.md#def-mica8-elliptic)は、どの非零方向で主部の逆数が局所的に取れるかを判定します。その補集合を、今度は方程式の幾何を決める舞台として見ます。

<a id="def-mica9-characteristic"></a>

<!-- formal-statement-start -->
> **定義（特性集合と非特性方向の再確認）**  
> $X$ 上の次数 $m\ge1$ のスカラー古典作用素 $P$ の実数値主シンボルを $p_m$ とする。**特性集合**と**非特性方向**は、それぞれ

$$
\operatorname{Char}(P)=\{(x,\xi)\in T^*X\setminus0:p_m(x,\xi)=0\},
\qquad
\operatorname{Ell}(P)=\{(x,\xi)\in T^*X\setminus0:p_m(x,\xi)\ne0\}
$$

> と定める。$\xi=0$ は含めない。局所座標での $p_m$ の零集合は、座標を変えても同じ余接方向の集合を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica9-characteristic -->
### 直接例：楕円型と波動型を区別する

**定義の確認**。$\mathbb R^{1+1}$ の余接座標を $(t,x;\tau,\kappa)$ とします。$D_t^2+D_x^2$ の二次主シンボルは $\tau^2+\kappa^2$ なので、非零 $(\tau,\kappa)$ で零にならず、$\operatorname{Char}(P)=\varnothing$ です。

一方、$P=-D_t^2+D_x^2$ では $p_2=-\tau^2+\kappa^2$ です。零集合は $\tau=\kappa$ または $\tau=-\kappa$ という二つの錐の枝からなり、$(\tau,\kappa)=(0,0)$ は除きます。係数が定数なので、基点 $(t,x)$ は任意です。低階の定数を加えても $p_2$ は変わりません。
<!-- definition-example-end -->

ここで既習の楕円正則性を方程式へ適用します。これは「波面がどこを**外れられないか**」についての結論で、まだ曲線に沿う伝播ではありません。

<a id="prop-mica9-wavefront-confinement"></a>

<!-- formal-statement-start -->
> **命題（特性方向への波面の制限）**  
> $P$ を開集合 $X$ 上の滑らかな係数を持つスカラー古典作用素、$u\in\mathcal D'(X)$ とする。$Pu\in C^\infty(X)$ なら

$$
WF(u)\subset\operatorname{Char}(P).
$$

> 一般の右辺については $WF(u)\subset WF(Pu)\cup\operatorname{Char}(P)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

非特性方向なら主シンボルで割れます。その方向の局所近似逆を与える[MICA8の楕円正則性](../MICA8/index.md#thm-mica8-elliptic-regularity)を適用します。

<!-- proof-start -->
### 証明

任意の非特性方向 $z=(x,\xi)$ を取ります。[特性集合と非特性方向の再確認](#def-mica9-characteristic)より主シンボルは $p_m(z)\ne0$、従って $z$ は楕円集合に属します。

[MICA8の楕円正則性](../MICA8/index.md#thm-mica8-elliptic-regularity)の第二包含に $A=P$ を代入すると、楕円集合上での波面は右辺の波面に含まれます。つまり

$$
z\in WF(u)\cap\operatorname{Ell}(P)\quad\Longrightarrow\quad z\in WF(Pu).
$$

対偶から、$z\notin WF(Pu)$ なら $z\notin WF(u)$。すべての非特性方向について言えるため、所望の包含を得ます。特に $Pu$ が滑らかなら $WF(Pu)=\varnothing$ です。
<!-- proof-end -->

この包含の逆は成立しません。例えば $u=0$ は特性方向を持つ作用素に対しても波面が空です。特性集合は**特異性の候補**であり、特異性そのものではありません。

## 2. 主シンボルを余接束上の Hamilton 関数にする

[SYM3の正準形式](../../../幾何系/SYM/SYM3/index.md#thm-sym3-cotangent-symplectic)は余接座標 $(x^a,\xi_a)$ で $\omega=\sum_a dx^a\wedge d\xi_a$ です。[SYM4の定義](../../../幾何系/SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)は $\iota_{H_p}\omega=dp$ とするので、その[正準座標式](../../../幾何系/SYM/SYM4/index.md#thm-sym4-existence-coordinate)に $H=p_m$ を代入すると

$$
H_p=\sum_a\left(
\frac{\partial p}{\partial\xi_a}\frac{\partial}{\partial x^a}
-\frac{\partial p}{\partial x^a}\frac{\partial}{\partial\xi_a}
\right).
$$

主シンボルの添字 $m$ は省略して $p$ と書きます。この構成は $p$ を関数として使うので、変数 $\xi_a$ が**余接座標**であることが必要です。位相空間 $T^*X$ の点は、位置と周波数方向を一緒に持ちます。

<a id="def-mica9-bicharacteristic"></a>

<!-- formal-statement-start -->
> **定義（双特性曲線）**  
> $P$ の滑らかな実数値主シンボル $p$ と非零特性点 $z_0=(x_0,\xi_0)\in\operatorname{Char}(P)$ を取る。$z(0)=z_0$ を満たす $H_p$ の極大積分曲線 $z(s)=(x(s),\xi(s))$ を、この初期点から出る**双特性曲線**という。局所座標での方程式は

$$
\dot x^a=\frac{\partial p}{\partial\xi_a},
\qquad
\dot\xi_a=-\frac{\partial p}{\partial x^a}.
$$

> 点は $T^*X\setminus0$ にある範囲のパラメータで考える。「極大」はその領域内で延長できないことを意味し、全実数時刻で存在することは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica9-bicharacteristic -->
### 直接例：平坦な光線

**定義の確認**。$p(t,x;\tau,\kappa)=-\tau^2+\kappa^2$、初期点 $z_0=(0,0;-1,1)$ を使います。$p(z_0)=0$ で余ベクトルは非零です。偏導関数は $\partial_\tau p=-2\tau$、$\partial_\kappa p=2\kappa$、$\partial_t p=\partial_x p=0$。従って初期値問題は

$$
\dot t=-2\tau,\quad\dot x=2\kappa,\quad
\dot\tau=0,\quad\dot\kappa=0,
$$

であり、解は $z(s)=(2s,2s;-1,1)$ です。解は全実数 $s$ で定義され、余ベクトルは常に非零、$p(z(s))=0$ なので特性集合の中にあります。射影 $x=t$ は速さ1の光線です。
<!-- definition-example-end -->

<a id="prop-mica9-hamilton-conservation"></a>

<!-- formal-statement-start -->
> **命題（Hamilton流による主シンボルの保存）**  
> $p\in C^\infty(T^*X\setminus0,\mathbb R)$ とし、$z(s)$ を $H_p$ の積分曲線とする。その存在する任意の区間で $p(z(s))$ は一定である。従って、初期点が $p=0$ にあれば曲線は $\operatorname{Char}(P)$ に留まる。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ と $\xi$ の二種類の変数について連鎖律を使い、二つの積が互いに打ち消し合うことを確かめます。

<!-- proof-start -->
### 証明

積分曲線の各点で $p$ を微分すると

$$
\frac{d}{ds}p(x(s),\xi(s))
=\sum_a\left(\partial_{x^a}p\,\dot x^a
+\partial_{\xi_a}p\,\dot\xi_a\right).
$$

[Hamilton方程式](#def-mica9-bicharacteristic)を両項に代入すると

$$
\sum_a\left(
\partial_{x^a}p\,\partial_{\xi_a}p
-\partial_{\xi_a}p\,\partial_{x^a}p
\right)=0.
$$

従って初期値 $p(z(0))$ が保たれます。初期点が特性点ならこの定数は零です。滑らかな ODE の局所存在一意性は[SYM4の Hamilton 流の議論](../../../幾何系/SYM/SYM4/index.md#thm-sym4-flow-preservation)の前提で使われています。
<!-- proof-end -->

## 3. どの零集合でも同じように流れるわけではない

特性集合が同じでも、主シンボルがそこで重複して零になると $H_p$ 自身が零になることがあります。伝播定理に進む前に、流れの退化を見分ける必要があります。

余接方向の拡大縮小を表す**半径方向のベクトル場**は $R=\sum_a\xi_a\partial_{\xi_a}$ です。これは位置 $x$ を変えずに $\xi$ を伸縮します。$H_p$ が $R$ の方向にしか動かないなら、余接方向を射影した幾何的な光線を動かせません。

<a id="def-mica9-real-principal-type"></a>

<!-- formal-statement-start -->
> **定義（実主型特性点）**  
> $p$ を $T^*X\setminus0$ 上の滑らかな実数値・正次数同次のスカラー主シンボルとする。$z\in\{p=0\}$ で $H_p(z)$ が半径方向 $R(z)$ と平行でないとき、$z$ を**実主型の特性点**という。特性集合のすべての点で成立する作用素を実主型という。特に $\partial_\xi p(z)\ne0$ は実主型であるための十分条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica9-real-principal-type -->
### 直接例：波動作用素を二乗すると退化する

**定義の確認**。$q=-\tau^2+\kappa^2$ とすると、$q=0$ かつ $(\tau,\kappa)\ne0$ では $(\partial_\tau q,\partial_\kappa q)=(-2\tau,2\kappa)\ne(0,0)$ です。$H_q$ は位置成分を持つので、半径方向と平行ではありません。

対して $P=(-D_t^2+D_x^2)^2$ の四次主シンボルは $p=q^2$ です。$p=0$ の集合は同じでも、$dp=2q\,dq$ ですから特性点で $H_p=2qH_q=0$。零ベクトルは $R$ の零倍なので実主型条件を満たしません。主シンボルを二乗すると「**同じ特性円錐でも同じ Hamilton 流とは限らない**」ことが分かります。
<!-- definition-example-end -->

主シンボルの同次性にも意味があります。$\xi$ の大きさは波面集合では重要でなく、その**方向**が重要だからです。次の補題は半径を変えると流れの速さだけが変わることを示します。

<a id="lem-mica9-homogeneous-rescaling"></a>

<!-- formal-statement-start -->
> **補題（同次性と双特性曲線の再パラメータ化）**  
> $p(x,\lambda\xi)=\lambda^m p(x,\xi)$（$\lambda>0$、$m\ge1$）とする。$S_\lambda(x,\xi)=(x,\lambda\xi)$ と書くと

$$
H_p(S_\lambda z)=\lambda^{m-1}(S_\lambda)_*H_p(z).
$$

> 従って $z(s)$ が $H_p$ の積分曲線なら、$S_\lambda z(\lambda^{m-1}s)$ もその積分曲線である（共通の定義域で）。基点へ射影した軌跡は同じで、パラメータの速さのみが変わる。
<!-- formal-statement-end -->

### 証明の見取り図

$\xi$ 微分は同次次数を1減らし、$x$ 微分は次数を変えません。一方、$S_\lambda$ の微分は垂直方向の成分を $\lambda$ 倍します。

<!-- proof-start -->
### 証明

同次式をそれぞれ微分すると

$$
\partial_{\xi_a}p(x,\lambda\xi)=\lambda^{m-1}\partial_{\xi_a}p(x,\xi),
\qquad
\partial_{x^a}p(x,\lambda\xi)=\lambda^m\partial_{x^a}p(x,\xi).
$$

$H_p(z)=A^a\partial_{x^a}+B_a\partial_{\xi_a}$ と置けば、$(S_\lambda)_*H_p(z)=A^a\partial_{x^a}+\lambda B_a\partial_{\xi_a}$（評価先は $S_\lambda z$）。上の同次関係を[Hamiltonの座標式](../../../幾何系/SYM/SYM4/index.md#thm-sym4-existence-coordinate)へ入れると $H_p(S_\lambda z)=\lambda^{m-1}A^a\partial_{x^a}+\lambda^mB_a\partial_{\xi_a}$ となって主張を得ます。

最後に $w(s)=S_\lambda z(\lambda^{m-1}s)$ と置くと、連鎖律で

$$
\dot w(s)=\lambda^{m-1}(S_\lambda)_*H_p(z(\lambda^{m-1}s))=H_p(w(s)).
$$

従って $w$ は同じ方程式の積分曲線です。
<!-- proof-end -->

## 4. Klein–Gordon作用素の特性集合は光円錐

ここから $(M,g)$ を境界のない滑らかな $d\ge2$ 次元 Lorentz 多様体とし、時間向きは必要なら固定します。$g_{ab}$ は計量成分、$g^{ab}$ はその逆行列の成分です。$g$ が非退化だから、余ベクトル $\xi$ に対応するベクトル $v^a=g^{ab}\xi_b$ を一意に定められます。この対応を $g^\sharp$ と呼びます。

実数値関数に作用する $P=-\Box_g+\mu^2+V(x)$（$\mu^2\ge0$、$V$ は滑らかな実関数）を考えます。[HPDE5のnormally hyperbolic作用素](../../HPDE/HPDE5/index.md#def-hpde5-normally-hyperbolic)と同じ二階の最高次部分です。$D_a=-i\partial_a$ を使えば、$-\partial_a\partial_b=D_aD_b$ です。従って作用素の二階主記号は

$$
p(x,\xi)=g^{ab}(x)\xi_a\xi_b.
$$

一階の Christoffel 補正、質量 $\mu^2$、零階ポテンシャル $V$ はこの二次主シンボルに入りません。[HPDE5の $\partial$-規約による主記号](../../HPDE/HPDE5/index.md#def-hpde5-principal-symbol)は $-g^{ab}\xi_a\xi_b$ です。零集合は同じですが、Hamilton ベクトル場の符号は逆になるため、以後は上の $D$-規約に統一します。

<a id="prop-mica9-kg-characteristic"></a>

<!-- formal-statement-start -->
> **命題（Klein–Gordon作用素の光的特性と実主型性）**  
> $(M,g)$ を滑らかな非退化 Lorentz 多様体、$P=-\Box_g+\mu^2+V$ を実スカラーKlein–Gordon型作用素（$\mu^2\ge0$、$V\in C^\infty(M,\mathbb R)$）とする。$D=-i\partial$ の主シンボルについて

$$
\operatorname{Char}(P)
=\{(x,\xi)\in T^*M\setminus0:g^{ab}(x)\xi_a\xi_b=0\}.
$$

> すべての特性点で $\partial_\xi p=2g^\sharp(\xi)\ne0$ であるから、$P$ は実主型である。双特性曲線の Hamilton 方程式は

$$
\dot x^a=2g^{ab}\xi_b,\qquad
\dot\xi_a=-(\partial_a g^{bc})\xi_b\xi_c.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最高階部分だけを残して実二次形式を作り、零条件を光的余ベクトルの定義へ戻します。実主型性は、計量の非退化性と $\xi\ne0$ から従います。

<!-- proof-start -->
### 証明

$\Box_g=g^{ab}\partial_a\partial_b-g^{ab}\Gamma^c_{ab}\partial_c$ と展開します。$-\Box_g$ の二階部分は $-g^{ab}\partial_a\partial_b=g^{ab}D_aD_b$ であり、残る項は一階以下です。[MICA8の微分作用素の主シンボル](../MICA8/index.md#def-mica8-differential-symbol)から $p=g^{ab}\xi_a\xi_b$ が得られます。従って[特性集合の定義](#def-mica9-characteristic)はこの二次形式の零集合になります。

$p$ を余接変数で偏微分すると

$$
\partial_{\xi_a}p=2g^{ab}\xi_b.
$$

もし右辺が零なら、計量の逆行列関係を使い、両辺に $g_{ca}$ を掛けることで $\xi_c=0$ となります。しかし特性集合では零余ベクトルを除いているので、これは矛盾です。よって $\partial_\xi p\ne0$ です。

$H_p$ は非零の位置方向成分を持ち、余接変数だけを変える $R$ と平行になりません。[実主型の定義](#def-mica9-real-principal-type)が満たされます。最後に位置変数でも $p$ を偏微分し、[Hamilton方程式](#def-mica9-bicharacteristic)へ代入して命題の表示式を得ます。
<!-- proof-end -->

### Minkowski時空で余接方向も確かめる

$g=-dt^2+dx^2$ なら $p=-\tau^2+\kappa^2$ です。未来向きのベクトル $v=g^\sharp\xi$ を $v^t>0$ で定めれば $v^t=-\tau$ なので、未来向き光線には $\tau<0$ が対応します。例えば $\xi=-dt+dx$ は $v=\partial_t+\partial_x$ を与え、[直接例](#def-mica9-bicharacteristic)の曲線 $t=x=2s$ を生みます。**未来向きの余ベクトルを $\tau>0$ と誤認しない**ためにも、計量による対応を一度通します。

## 5. Hamiltonの軌道は零測地線へ射影される

[LORG4の測地線方程式](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)は、アフィンパラメータ $s$ に関して

$$
\ddot x^a+\Gamma^a_{bc}\dot x^b\dot x^c=0
$$

です。ここでは [Klein–GordonのHamilton方程式](#prop-mica9-kg-characteristic)からこの式を直接導きます。そのため、逆計量の微分が

$$
\partial_c g^{ab}=-g^{ad}g^{be}\partial_c g_{de}
$$

となることを使います。これは $g^{ad}g_{db}=\delta^a_b$ を $x^c$ で微分し、逆行列を掛けた恒等式です。

<a id="thm-mica9-null-geodesic"></a>

<!-- formal-statement-start -->
> **定理（Klein–Gordon双特性曲線と零測地線）**  
> $(M,g)$ を滑らかな非退化 Lorentz 多様体とし、$P=-\Box_g+\mu^2+V$（$\mu^2\ge0$、$V\in C^\infty(M,\mathbb R)$）の $D=-i\partial$ 主シンボルを $p=g^{ab}\xi_a\xi_b$ とする。非零特性点から出る双特性曲線 $(x(s),\xi(s))$ の射影 $x(s)$ は、零でない接ベクトルを持つ**アフィンパラメータ付き零測地線**であり

$$
\dot x^a=2g^{ab}\xi_b,\qquad
g_{ab}\dot x^a\dot x^b=0,\qquad
\ddot x^a+\Gamma^a_{bc}\dot x^b\dot x^c=0
$$

> を満たす。逆に、アフィンパラメータ付きの非定数零測地線 $x(s)$ に沿って $\xi_a(s)=\frac12g_{ab}(x(s))\dot x^b(s)$ と置くと、$(x(s),\xi(s))$ は $p$ の双特性曲線になる（同じ存在区間で）。
<!-- formal-statement-end -->

### 証明の見取り図

$v^a=g^{ab}\xi_b$ と置き、Hamilton方程式の第一式で $\dot x=2v$ とします。$\dot\xi_a$ の表示と、上で導いた逆計量の微分恒等式を組み合わせて $\dot v^a=-2\Gamma^a_{bc}v^bv^c$ を得ることが核心です。逆向きでは[測地線方程式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)を使って $\dot\xi_a$ を復元します。

<!-- proof-start -->
### 証明

**(1) 零条件。** [Hamilton流の保存則](#prop-mica9-hamilton-conservation)により $p(x(s),\xi(s))=0$ です。$\dot x^a=2g^{ab}\xi_b$ と計量の逆行列関係から $g_{ab}\dot x^a\dot x^b=4g^{cd}\xi_c\xi_d=4p=0$ となります。$\xi\ne0$ と計量の非退化性から $\dot x\ne0$ です。

**(2) 測地線方程式。** $v^a=g^{ab}\xi_b$ と置き、連鎖律と[Hamilton方程式](#prop-mica9-kg-characteristic)を適用します。

$$
\dot v^a=(\partial_cg^{ab})\dot x^c\xi_b+g^{ab}\dot\xi_b
=2(\partial_cg^{ab})v^c\xi_b-g^{ab}(\partial_bg^{cd})\xi_c\xi_d.
$$

ここへ $\xi_b=g_{be}v^e$ と逆計量の微分公式を入れ、計量の添字対称性を使います。

$$
\dot v^a=-2g^{ad}(\partial_cg_{de})v^cv^e
+g^{ab}(\partial_bg_{ce})v^cv^e.
$$

[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の係数

$$
\Gamma^a_{ce}=\frac12g^{ab}
(\partial_cg_{be}+\partial_eg_{bc}-\partial_bg_{ce})
$$

では $v^cv^e$ が対称なので、前式は $\dot v^a=-2\Gamma^a_{ce}v^cv^e$ と一致します。$\dot x^a=2v^a$、$\ddot x^a=2\dot v^a$ を代入して

$$
\ddot x^a=-4\Gamma^a_{ce}v^cv^e
=-\Gamma^a_{ce}\dot x^c\dot x^e
$$

を得ます。よって $s$ はアフィンパラメータです。

**(3) 逆向き。** 零測地線 $x(s)$ から $\xi_a=\tfrac12g_{ab}\dot x^b$ と定めます。$\dot x\ne0$ なので $\xi\ne0$、また $p=\tfrac14g_{ab}\dot x^a\dot x^b=0$ です。逆行列を掛ければ $2g^{ab}\xi_b=\dot x^a$ で、Hamiltonの第一式が成立します。

第二式について積を微分し、[測地線方程式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation)を代入します。

$$
\dot\xi_a=\frac12(\partial_cg_{ab})\dot x^c\dot x^b
-\frac12g_{ab}\Gamma^b_{cd}\dot x^c\dot x^d.
$$

$g_{ab}\Gamma^b_{cd}=\tfrac12(\partial_cg_{ad}+\partial_dg_{ac}-\partial_ag_{cd})$ なので、対称な $\dot x^c\dot x^d$ と縮約した最初の二項は相殺し

$$
\dot\xi_a=\frac14(\partial_ag_{cd})\dot x^c\dot x^d.
$$

一方、逆計量の微分公式と $\xi_b=\tfrac12g_{bc}\dot x^c$ より

$$
-(\partial_ag^{bc})\xi_b\xi_c
=\frac14(\partial_ag_{de})\dot x^d\dot x^e.
$$

従って Hamilton の第二式も成立します。[双特性曲線の定義](#def-mica9-bicharacteristic)によって逆向きも示されました。
<!-- proof-end -->

### 曲がった時空での直接計算

$1+1$ 次元の $g=-dt^2+a(t)^2dx^2$、$a(t)>0$ は滑らかとします。逆計量は $g^{tt}=-1$、$g^{xx}=a^{-2}$。したがって

$$
p=-\tau^2+\frac{\kappa^2}{a(t)^2},\qquad
\dot t=-2\tau,\quad
\dot x=\frac{2\kappa}{a(t)^2},\quad
\dot\tau=\frac{2a'(t)\kappa^2}{a(t)^3},\quad
\dot\kappa=0.
$$

未来向きの枝を $\kappa>0$、$\tau=-\kappa/a(t)$ として選ぶと $\dot t=2\kappa/a(t)>0$ であり、光線の傾きは

$$
\frac{dx}{dt}=\frac{\dot x}{\dot t}=\frac1{a(t)}.
$$

特性条件から求めた $\tau=-\kappa/a(t)$ を微分すると $\dot\tau=(\kappa a'/a^2)\dot t=2a'\kappa^2/a^3$ となり、Hamiltonの第三式と一致します。$a$ が定数なら直線、$a$ が変化すれば座標上の光線は曲がります。ただし $t$ 自体がアフィンパラメータとは限りません。

## 6. 零集合と曲線の軌跡、伝播定理を区別する

主シンボルを零にならない滑らかな実関数 $b(x,\xi)>0$ 倍した $\widetilde p=bp$ を考えると、$\{\widetilde p=0\}=\{p=0\}$ です。積の微分から $H_{bp}=bH_p+pH_b$ なので、特性集合上では $H_{bp}=bH_p$。同じ向きの**パラメータを付けない軌跡**が得られますが、その速度・アフィンパラメータは一般に変わります。

これは曲がった計量の共形変換にも使えます。$\widetilde g=\Omega^2g$（$\Omega>0$）なら $\widetilde g^{ab}=\Omega^{-2}g^{ab}$ なので、光的特性集合と非パラメータ化した零測地線の軌跡は共通です。ただし各計量に関するアフィンパラメータは一般には共通ではありません。

最後に、[波面の特性集合への包含](#prop-mica9-wavefront-confinement)から **$WF(u)$ が各双特性曲線の全体を含む**とはまだ言えません。包含だけでは特性集合の一部分を選んでも矛盾しないからです。$Pu$ が滑らかで $P$ が実主型などの適切な仮定を満たすとき、特異性が双特性曲線に沿って伝播することは、次の MICA10 の中心定理になります。

## 7. 演習――特性方向から光線まで

<a id="ex-mica9-a01"></a>
### 演習 MICA9-A1：特性方向と低階項

- Level: A
- 目安時間: 17分

$\mathbb R^2$ 上の $P_1=D_x^2+4D_y^2+3$、$P_2=D_x^2-4D_y^2+3$ の特性集合を求めよ。$\xi=(2,1)$ と $(0,1)$ が特性か調べ、定数項の役割を説明せよ。

<!-- solution-start -->
#### 詳細解答

[MICA8の主シンボルの定義](../MICA8/index.md#def-mica8-differential-symbol)に従い最高二階だけを取ると $p_1=\xi_x^2+4\xi_y^2$、$p_2=\xi_x^2-4\xi_y^2$ です。非零方向について $p_1>0$ だから $\operatorname{Char}(P_1)=\varnothing$ です。$p_2=0$ は $\xi_x=2\xi_y$ または $\xi_x=-2\xi_y$ であり、零余ベクトルを除いた二本の錐が特性集合です。

$(2,1)$ では $p_2=4-4=0$、$(0,1)$ では $p_2=-4\ne0$ です。$p_1(2,1)=8$、$p_1(0,1)=4$ なのでいずれも非特性です。$+3$ は零階であり、どちらの二階主シンボルにも入りません。
<!-- solution-end -->

<a id="ex-mica9-a02"></a>
### 演習 MICA9-A2：Hamiltonベクトル場の符号

- Level: A
- 目安時間: 18分

$T^*\mathbb R^2$ で $p(x,y;\xi,\eta)=x\xi+\eta^2$ とする。$H_p$ を求め、$\omega=dx\wedge d\xi+dy\wedge d\eta$ に対して $\iota_{H_p}\omega=dp$ を直接確かめよ。

<!-- solution-start -->
#### 詳細解答

$\partial_\xi p=x$、$\partial_\eta p=2\eta$、$\partial_xp=\xi$、$\partial_yp=0$ です。[Hamiltonベクトル場の座標式](../../../幾何系/SYM/SYM4/index.md#thm-sym4-existence-coordinate)から

$$
H_p=x\partial_x+2\eta\partial_y-\xi\partial_\xi.
$$

一般の $A\partial_x+B\partial_y+C\partial_\xi+D\partial_\eta$ を $\omega$ に入れると $A\,d\xi-C\,dx+B\,d\eta-D\,dy$ なので、この場合

$$
\iota_{H_p}\omega=x\,d\xi+\xi\,dx+2\eta\,d\eta=dp.
$$

よって正準形式の符号と一致します。この $p$ は周波数について同次ではありませんが、Hamiltonベクトル場を**関数として計算する**問題には支障がありません。微分作用素の主シンボルとしての仮定とは区別します。
<!-- solution-end -->

<a id="ex-mica9-a03"></a>
### 演習 MICA9-A3：質量が消える段階

- Level: A
- 目安時間: 17分

$g=-dt^2+dx^2$ と $P=-\Box_g+\mu^2+V(t,x)$（滑らかな $V$）について、$D=-i\partial$ での全記号の二階部分と特性集合、Hamiltonベクトル場を求めよ。$\mu=0$ と $\mu>0$ で異なるか。

<!-- solution-start -->
#### 詳細解答

平坦計量では $\Box_g=-\partial_t^2+\partial_x^2$ なので $P=\partial_t^2-\partial_x^2+\mu^2+V$ です。$\partial=iD$ を代入すると $P=-D_t^2+D_x^2+\mu^2+V$ であり、全記号は $-\tau^2+\kappa^2+\mu^2+V(t,x)$、二階主シンボルは $p=-\tau^2+\kappa^2$ です。

$p=0$ かつ $(\tau,\kappa)\ne0$ が特性集合です。[Hamilton方程式](#def-mica9-bicharacteristic)に偏導関数を代入すると

$$
H_p=-2\tau\partial_t+2\kappa\partial_x.
$$

$\mu^2$ と $V$ は零階項なので、$\mu$ の有無でも $V$ の値でも特性集合とこの流れは変わりません。完全な解の形は低階項に依存し得るので、主シンボルだけから解が同一とは言えません。
<!-- solution-end -->

<a id="ex-mica9-a04"></a>
### 演習 MICA9-A4：二方向のMinkowski光線

- Level: A
- 目安時間: 17分

$p=-\tau^2+\kappa^2$ とし、初期点 $(t_0,x_0;\tau_0,\kappa_0)$ が特性で $\tau_0<0$ とする。$\kappa_0$ の正負によって射影の傾きを求め、未来向きの条件を説明せよ。

<!-- solution-start -->
#### 詳細解答

特性条件は $\tau_0^2=\kappa_0^2$。非零余ベクトルかつ $\tau_0<0$ なので $\tau_0=-|\kappa_0|$、$\kappa_0\ne0$ です。Hamilton方程式を積分すると

$$
t(s)=t_0-2\tau_0s,\quad x(s)=x_0+2\kappa_0s,\quad
\tau(s)=\tau_0,\quad\kappa(s)=\kappa_0.
$$

$dt/ds=-2\tau_0>0$ で未来へ進み、$dx/dt=-\kappa_0/\tau_0=\operatorname{sgn}(\kappa_0)$ です。$\kappa_0>0$ なら右向き、$\kappa_0<0$ なら左向きの光線です。時間向きは余ベクトルの符号自体ではなく $g^\sharp\xi$ の $t$ 成分 $-\tau_0$ で判定しています。
<!-- solution-end -->

<a id="ex-mica9-b01"></a>
### 演習 MICA9-B1：時間依存計量で全Hamilton方程式を照合する

- Level: B
- 目安時間: 27分

$g=-dt^2+e^{2Ht}dx^2$（$H$ は定数）で $p=g^{ab}\xi_a\xi_b$ とする。$\kappa_0>0$ の未来向き特性解で $t(0)=0$、$x(0)=0$ としたとき、$x$ を $t$ の関数として求め、$\tau$ の方程式まで検算せよ。$H=0$ の場合も扱え。

<!-- solution-start -->
#### 詳細解答

$a(t)=e^{Ht}$ として本文の曲がった計量の式を使うと $p=-\tau^2+e^{-2Ht}\kappa^2$ であり、$\kappa=\kappa_0$ は保存されます。未来向き枝では $\tau=-\kappa_0e^{-Ht}$ なので

$$
\dot t=2\kappa_0e^{-Ht},\quad
\dot x=2\kappa_0e^{-2Ht},\quad
\dot\tau=2H\kappa_0^2e^{-2Ht}.
$$

$\dot t>0$ で割れるため $dx/dt=e^{-Ht}$。$H\ne0$ なら $x(t)=\int_0^t e^{-Hr}dr=(1-e^{-Ht})/H$、$H=0$ なら $x(t)=t$ です。$\tau(t)=-\kappa_0e^{-Ht}$ の $t$ 微分は $H\kappa_0e^{-Ht}$。これに $dt/ds=2\kappa_0e^{-Ht}$ を掛ければ $d\tau/ds=2H\kappa_0^2e^{-2Ht}$ となり、第三式と一致します。$H<0$ でも全式は局所的に成立します。
<!-- solution-end -->

<a id="ex-mica9-b02"></a>
### 演習 MICA9-B2：重複特性で流れが止まる

- Level: B
- 目安時間: 24分

$q(\tau,\kappa)=-\tau^2+\kappa^2$、$p=q^2$ とする。$q$ と $p$ の特性集合、$H_q$ と $H_p$ を比較せよ。また、$p$ が実主型でない理由と、「特性集合が同じだから伝播の向きも同じ」と言えない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$p=0\iff q=0$ なので、零余ベクトルを除いた特性集合は一致します。一方、積の微分から $dp=2q\,dq$、[Hamiltonの座標式](#def-mica9-bicharacteristic)から

$$
H_q=-2\tau\partial_t+2\kappa\partial_x,\qquad
H_p=2qH_q.
$$

特性集合上では $q=0$ なので $H_p=0$ ですが、$H_q$ は非零の位置成分を持ちます。$H_p$ は半径方向の零倍となり、[実主型の条件](#def-mica9-real-principal-type)を満たしません。$q$ の場合にあった正方向の流れが、二乗した $p$ では停留してしまうのです。集合としての零点条件だけではその微分 $dp$ の情報は復元できません。
<!-- solution-end -->

<a id="ex-mica9-b03"></a>
### 演習 MICA9-B3：余接方向の拡大と時間の変更

- Level: B
- 目安時間: 27分

$p(x,\xi)$ を次数 $m\ge1$ の実同次主シンボルとし、$z(s)$ をその双特性曲線とする。$\lambda>0$ に対し $w(s)=S_\lambda z(\lambda^{m-1}s)$ が同じ Hamilton 方程式を満たすことを示せ。特に $m=2$ で、射影した軌跡とパラメータがどうなるか述べよ。

<!-- solution-start -->
#### 詳細解答

同次性から $\partial_\xi p(x,\lambda\xi)=\lambda^{m-1}\partial_\xi p(x,\xi)$ と $\partial_x p(x,\lambda\xi)=\lambda^m\partial_x p(x,\xi)$ です。$w_x(s)=x(\lambda^{m-1}s)$、$w_\xi(s)=\lambda\xi(\lambda^{m-1}s)$ なので連鎖律により

$$
\dot w_x=\lambda^{m-1}\dot x(\lambda^{m-1}s)=\partial_\xi p(w_x,w_\xi),
$$

$$
\dot w_\xi=\lambda^m\dot\xi(\lambda^{m-1}s)=-\partial_xp(w_x,w_\xi).
$$

両方のHamilton方程式を検証できました。初期値は $(x_0,\lambda\xi_0)$ で $p=\lambda^mp(z_0)=0$、余ベクトルは非零です。$m=2$ なら $w_x(s)=x(\lambda s)$ で、基点の軌跡は同じでもパラメータの速さは $\lambda$ 倍になります。この違いは波面集合の錐的な方向判定と矛盾しません。
<!-- solution-end -->

<a id="ex-mica9-c01"></a>
### 演習 MICA9-C1：共形計量の光線とアフィンパラメータ

- Level: C
- 目安時間: 38分

$\mathbb R^{1+1}$ の $g=-dt^2+dx^2$ と $\widetilde g=e^{2f(t,x)}g$（$f$ は滑らかな実関数）を考える。両者の Klein–Gordon 主シンボル $p,\widetilde p$ について、次を示せ。

1. 特性集合が一致し、その上で $H_{\widetilde p}=e^{-2f}H_p$ が成り立つ。
2. 非パラメータ化した光線の軌跡は一致するが、同じ曲線パラメータ $s$ が一般に両方のアフィンパラメータになるとは限らない。
3. $f(t,x)=ct$（$c\ne0$）で、$g$ の未来向き直線 $(t,x)=(2s,2s)$ を $\widetilde g$ の Hamilton 流としてパラメータ化し直す関係式を求めよ。$\xi=-dt+dx$ の初期値はそのまま使う。

<!-- solution-start -->
#### 詳細解答

逆計量は $\widetilde g^{ab}=e^{-2f}g^{ab}$ なので $\widetilde p=e^{-2f}p$ です。指数は正だから零集合は同一です。積の偏微分を Hamilton の座標式へ代入して

$$
H_{e^{-2f}p}=e^{-2f}H_p+pH_{e^{-2f}}
$$

を得ます。特性集合上では $p=0$、従って第一問が成立します。

曲線上のどの点でも二つのベクトル場は正の関数倍なので、積分曲線の向きは同じで速度だけが変化します。$\widetilde g$ の流れをパラメータ $r$、$g$ の流れを $s$ とすると、共通の曲線 $z(s(r))$ に対し

$$
\frac{dz}{dr}=\frac{ds}{dr}H_p(z)=e^{-2f(z)}H_p(z),
\qquad\frac{ds}{dr}=e^{-2f(z(s(r)))}.
$$

零測地線と Hamilton 曲線の対応は[本章の定理](#thm-mica9-null-geodesic)なので、基点へ射影した光線は同じですが、$ds/dr$ が一定でなければアフィンパラメータは一致しません。

第三問では $z(s)=(2s,2s;-1,1)$ だから $f=ct=2cs$。従って

$$
\frac{dr}{ds}=e^{4cs},\qquad
r(s)=\int_0^s e^{4cu}du=\frac{e^{4cs}-1}{4c},
$$

として $r(0)=0$ と選びます。この関係を逆にした $s(r)=\log(1+4cr)/(4c)$ の定義域 $1+4cr>0$ で、$z(s(r))$ は $\widetilde p$ の Hamilton 曲線です。余ベクトル $(-1,1)$ は特性のままで、位置成分の速度は $e^{-2ct}$ 倍になります。$c\to0$ の極限は $r=s$ に戻り、共形因子が定数である場合の一定倍率の再パラメータとも整合します。
<!-- solution-end -->

## 8. 次章への接続

ここまでで、主シンボルから特性集合を切り出し、Hamiltonベクトル場を計算し、Klein–Gordon の実主型性と零測地線への射影を証明しました。[楕円正則性](../MICA8/index.md#thm-mica8-elliptic-regularity)は滑らかな右辺に対する波面を特性集合へ閉じ込めます。

残る問いは「その集合の中で特異性は途中だけに存在できるか」です。特性集合の幾何だけでは答えられず、擬微分作用素の交換子と実主型の解析が必要になります。次の MICA10 で、$Pu\in C^\infty$ という仮定のもとで波面が双特性曲線に沿ってどう伝播するかを調べます。
