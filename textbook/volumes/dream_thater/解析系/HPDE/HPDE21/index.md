# HPDE21 因果伝播子とexact sequenceの核

遅延Green作用素は源から未来へ、先進Green作用素は過去へ伝わる解を作りました。しかし両者の差を取ると、源そのものが消えて**斉次方程式の解**が残ります。これが因果伝播子です。

ここで注意したいのは、斉次解が得られることと、「すべての空間コンパクトな斉次解を得た」ことは違う、という点です。本講で決着させるのは、**どんなコンパクトな源が差を零にするか**という核の問題です。これは次講の全射性の証明と切り分けます。

## 1. 何を入力し、何を出力するか

$(M,g)$ は境界を持たない時間向き付き滑らかな[大域双曲Lorentz時空](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)、$E\to M$ は有限ランクの滑らかな実または複素ベクトル束とします。$P:\Gamma(M,E)\to\Gamma(M,E)$ は[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)です。形式的自己随伴性は仮定しません。

[遅延・先進Green作用素](../HPDE18/index.md#def-hpde18-green-operators)の入力は、時空でコンパクトな台を持つ切断の空間 $\Gamma_c(M,E)$ です。各 $f\in\Gamma_c$ について、$K=\operatorname{supp}f$ と置くと、[Green作用素の構成と因果的支持](../HPDE18/index.md#thm-hpde18-green-existence)は

$$
PG_{\mathrm{ret}}f=f,\qquad
PG_{\mathrm{adv}}f=f,
$$

$$
\operatorname{supp}(G_{\mathrm{ret}}f)\subseteq J^+(K),
\qquad
\operatorname{supp}(G_{\mathrm{adv}}f)\subseteq J^-(K)
$$

を与えます。ここで $J^\pm$ は[因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)です。さらに[Green作用素の両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)は、**コンパクト支持の** $\varphi$ に限り

$$
G_{\mathrm{ret}}P\varphi=\varphi
=G_{\mathrm{adv}}P\varphi
$$

を保証します。

[空間コンパクト支持](../HPDE20/index.md#def-hpde20-support-classes)とは、あるコンパクト集合 $L\subset M$ を選ぶと切断の台が $J(L)=J^+(L)\cup J^-(L)$ に収まることでした。斉次方程式 $Pu=0$ を満たす、そのような切断全体をまとめて扱います。

<a id="def-hpde21-spatial-solution"></a>

<!-- formal-statement-start -->
> **定義（空間コンパクトな斉次解の空間）**  
> 上記の $(M,g),E,P$ に対し、

$$
\operatorname{Sol}_{\mathrm{sc}}(P)
=\{u\in\Gamma_{\mathrm{sc}}(M,E):Pu=0\}
$$

> と定める。零解、和、実数または複素数のスカラー倍について閉じた線形空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde21-spatial-solution -->
**定義の確認**。Minkowski平面で $P=\partial_t^2-\partial_x^2$ とします。$h\in C_c^\infty(\mathbb R)$ を零でない関数として

$$
u(t,x)=h(t-x)
$$

と置くと、$z=t-x$ に対して

$$
\partial_t^2u=h''(z),\qquad
\partial_x^2u=h''(z),\qquad Pu=0
$$

です。しかしこの解は空間コンパクトでは**ありません**。$h(z_0)\ne0$ となる $z_0$ に対し、直線 $t-x=z_0$ の全体で $u\ne0$ です。この直線は任意のコンパクト $L$ の因果影 $J(L)$ に含まれ得るようにも見えますが、実際には光線は一点の因果影に含まれるため、**空間コンパクトです**。具体的に $K=\{(0,-z_0)\}$ を固定しただけでは、$h$ の台の全幅を覆えません。そこで $\operatorname{supp}h\subset[a,b]$ とし

$$
K=\{(0,-z):z\in[a,b]\}
$$

と取ります。任意の $(t,x)$ で $u(t,x)\ne0$ なら $z=t-x\in[a,b]$。$(0,-z)\in K$ と $(t,x)$ の差は $(t,t)$ なので、未来または過去向きの光線で結ばれます。従って $\operatorname{supp}u\subseteq J(K)$ です。この例は「時間の両方向に無限に続く」ことがscに反しないと教えます。
<!-- definition-example-end -->

このようにsc解は一般に時空コンパクトではありません。Green作用素の出力を最初から $\Gamma_c$ と見なすことも避けましょう。

## 2. 二つのGreen解の差を定義する

同じ源 $f$ を未来側と過去側から解き、その差を取ります。源が同じなら作用素 $P$ をかけたときに打ち消し合います。符号はこの講を通じて「遅延引く先進」で固定します。

<a id="def-hpde21-causal-propagator"></a>

<!-- formal-statement-start -->
> **定義（因果伝播子）**  
> 第1節の大域双曲時空、束、作用素に対し、[遅延・先進Green作用素](../HPDE18/index.md#def-hpde18-green-operators)の差

$$
E_{\mathrm{cau}}
:=G_{\mathrm{ret}}-G_{\mathrm{adv}}
:\Gamma_c(M,E)\longrightarrow\Gamma(M,E)
$$

> を因果伝播子という。定義域は $\Gamma_c(M,E)$ とし、右辺の二作用素を任意の滑らかな切断に適用する意味にはしない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde21-causal-propagator -->
**定義の確認**。Minkowski平面の $P=\partial_t^2-\partial_x^2$ を取り、[1+1次元のGreen積分核](../HPDE12/index.md#def-hpde12-convolution-operators)を使います。$f\ge0$、$f\not\equiv0$、$\operatorname{supp}f\subset[-1,1]\times[-1,1]$ の滑らかな源を選びます。$t\ge3$、$x=0$ なら任意の源点 $(s,y)$ に対し

$$
s\le1<t,\qquad |y|\le1\le t-s.
$$

従って源の全体が観測点 $(t,0)$ の因果的過去に入り、

$$
(G_{\mathrm{ret}}f)(t,0)
=\frac12\int_{\mathbb R^2}f(s,y)\,ds\,dy>0.
$$

源は時刻 $1$ 以前なので $(G_{\mathrm{adv}}f)(t,0)=0$。従って $E_{\mathrm{cau}}f(t,0)>0$。同様に $t\le-3$ では遅延解が零、先進解が $\frac12\int f$ なので $E_{\mathrm{cau}}f(t,0)<0$ です。源はコンパクトでも、差は時間の両方向へ広がることが分かります。

一方、$\varphi(t,x)=h(t)q(x)$（$h,q\in C_c^\infty(\mathbb R)$）とし

$$
f=P\varphi=h''(t)q(x)-h(t)q''(x)
$$

と置くと、$f\in\Gamma_c$ です。[Greenの両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)より

$$
E_{\mathrm{cau}}f
=G_{\mathrm{ret}}P\varphi-G_{\mathrm{adv}}P\varphi
=\varphi-\varphi=0.
$$

異なるコンパクトな源でも同じ零の差を生じ得ることが、核を調べる動機です。
<!-- definition-example-end -->

## 3. 差は斉次解となり、空間コンパクトである

出力空間を単に滑らかな切断全体とするより、何が必ず成立するかを記述したいところです。

<a id="prop-hpde21-propagator-identities"></a>

<!-- formal-statement-start -->
> **命題（因果伝播子の二つの零合成と支持）**  
> 第1節の設定において、任意の $f,\varphi\in\Gamma_c(M,E)$ に対し

$$
PE_{\mathrm{cau}}f=0,\qquad
E_{\mathrm{cau}}P\varphi=0
$$

> が成立する。また $K=\operatorname{supp}f$ と置くと

$$
\operatorname{supp}(E_{\mathrm{cau}}f)
\subseteq J^+(K)\cup J^-(K)=J(K).
$$

> 従って因果伝播子は値域を制限して線形写像

$$
E_{\mathrm{cau}}:
\Gamma_c(M,E)\longrightarrow
\operatorname{Sol}_{\mathrm{sc}}(P)
$$

> とみなせる。
<!-- formal-statement-end -->

### 証明の見取り図

$P$ を**外側**からかけると $PG=f$ が二つ打ち消し合い、$P$ を**内側**からかけると $GP\varphi=\varphi$ が二つ打ち消し合います。支持については、差の台が各項の台の合併に収まることを使います。

<!-- proof-start -->
### 証明

$f\in\Gamma_c$ について、[遅延・先進Green作用素の方程式](../HPDE18/index.md#thm-hpde18-green-existence)を各項に適用すると

$$
P(E_{\mathrm{cau}}f)
=P(G_{\mathrm{ret}}f)-P(G_{\mathrm{adv}}f)
=f-f=0.
$$

$\varphi\in\Gamma_c$ なら $P\varphi\in\Gamma_c$ です。この入力条件を確認した後で[両側Green恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)を使うと

$$
E_{\mathrm{cau}}(P\varphi)
=G_{\mathrm{ret}}(P\varphi)-G_{\mathrm{adv}}(P\varphi)
=\varphi-\varphi=0.
$$

支持包含については、ある開集合で二つの切断がともに零なら差も零、という台の定義から

$$
\operatorname{supp}(a-b)
\subseteq \operatorname{supp}a\cup\operatorname{supp}b
$$

が成り立ちます。$a=G_{\mathrm{ret}}f$、$b=G_{\mathrm{adv}}f$ に代入し、[両Green解の因果的支持](../HPDE18/index.md#thm-hpde18-green-existence)を使うと

$$
\operatorname{supp}(E_{\mathrm{cau}}f)
\subseteq
\operatorname{supp}(G_{\mathrm{ret}}f)
\cup\operatorname{supp}(G_{\mathrm{adv}}f)
\subseteq J^+(K)\cup J^-(K).
$$

$K$ はコンパクトなので、これは[scの定義](../HPDE20/index.md#def-hpde20-support-classes)そのものです。従って $E_{\mathrm{cau}}f\in\operatorname{Sol}_{\mathrm{sc}}(P)$。線形性はGreen作用素の線形性から従います。$\square$
<!-- proof-end -->

二つの零合成は似ていますが、**それぞれ別の既出恒等式**を使いました。$E_{\mathrm{cau}}$ を先に微分する式と、コンパクト切断を先に微分する式を混同しないことが重要です。

## 4. 核を決めるために「共通解の台」を絞る

線形写像の核とは、零へ送られる入力の集合です。従って

$$
\ker E_{\mathrm{cau}}
=\{f\in\Gamma_c(M,E):E_{\mathrm{cau}}f=0\}
$$

です。前節で $E_{\mathrm{cau}}P\varphi=0$ を証明したので、既に

$$
P\Gamma_c(M,E)\subseteq\ker E_{\mathrm{cau}}
$$

が分かります。逆向きは新しい議論を要します。

$f\in\ker E_{\mathrm{cau}}$ なら二つのGreen解が一致し、

$$
u:=G_{\mathrm{ret}}f=G_{\mathrm{adv}}f
$$

という**一つの共通解**を作れます。遅延解である以上は $u$ の台が $J^+(K)$ にあり、先進解である以上は $J^-(K)$ にもあります。ゆえに合併ではなく**共通部分**に入ります。

<a id="lem-hpde21-common-solution-compact"></a>

<!-- formal-statement-start -->
> **補題（遅延解と先進解が一致すれば共通解はコンパクト支持）**  
> 第1節の仮定のもとで、$f\in\Gamma_c(M,E)$ が

$$
G_{\mathrm{ret}}f=G_{\mathrm{adv}}f
$$

> を満たすとする。その共通解 $u$ は $\Gamma_c(M,E)$ に属し、$Pu=f$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$K=\operatorname{supp}f$ と置けば、共通解の台は $J^+(K)\cap J^-(K)$ に含まれます。[大域双曲時空のコンパクト因果ダイヤモンド](../HPDE19/index.md#lem-hpde19-causal-overlap)を、二つのコンパクト集合として同じ $K$ を入れて適用します。

<!-- proof-start -->
### 証明

$f=0$ ならGreen作用素の線形性により $u=0$ で、主張は成立します。以下 $K=\operatorname{supp}f$ が非空とします。二つの支持包含を別々に書くと

$$
\operatorname{supp}u
=\operatorname{supp}(G_{\mathrm{ret}}f)
\subseteq J^+(K),
$$

$$
\operatorname{supp}u
=\operatorname{supp}(G_{\mathrm{adv}}f)
\subseteq J^-(K).
$$

従って

$$
\operatorname{supp}u\subseteq J^+(K)\cap J^-(K).
$$

[因果的未来と過去の重なりの補題](../HPDE19/index.md#lem-hpde19-causal-overlap)に $L=K$ を代入します。その適用条件は「$K$ と $L$ がコンパクト」で、$f\in\Gamma_c$ により満たされます。したがって右辺はコンパクトです。$\operatorname{supp}u$ は切断の台として閉集合なので、そのコンパクト集合の閉部分集合としてコンパクトです。ゆえに $u\in\Gamma_c(M,E)$ となります。

最後に[Green方程式](../HPDE18/index.md#thm-hpde18-green-existence)を共通解に適用して

$$
Pu=P(G_{\mathrm{ret}}f)=f.
$$

これで $u$ は望むコンパクト支持の原像です。$\square$
<!-- proof-end -->

ここで「$J^+(K)$ も $J^-(K)$ もコンパクト」とは主張していません。どちらも時間の一方向には伸び得ます。**同じ $K$ からの未来と過去を同時に満たす部分だけがコンパクト**です。

## 5. 因果伝播子の核とexact sequenceの前半

線形写像 $P$ の像 $P\Gamma_c$ は、コンパクト支持の切断 $\varphi$ から作れる源 $P\varphi$ のすべてです。前節の補題は、因果伝播子の核に属する源が必ずその形になることを意味します。

<a id="thm-hpde21-kernel-exact"></a>

<!-- formal-statement-start -->
> **定理（因果伝播子の核と列の前半の完全性）**  
> $(M,g)$ を境界なし、時間向き付き、滑らかな大域双曲Lorentz時空、$E\to M$ を有限ランクの滑らかな実または複素ベクトル束、$P$ をnormally hyperbolic作用素とする。第2節の $E_{\mathrm{cau}}$ について

$$
\ker\!\left(
E_{\mathrm{cau}}:\Gamma_c(M,E)\to
\operatorname{Sol}_{\mathrm{sc}}(P)
\right)
=P\Gamma_c(M,E)
$$

> が成立する。さらに $P:\Gamma_c(M,E)\to\Gamma_c(M,E)$ は単射であり、

$$
0\longrightarrow\Gamma_c(M,E)
\xrightarrow{\ P\ }\Gamma_c(M,E)
\xrightarrow{\ E_{\mathrm{cau}}\ }
\operatorname{Sol}_{\mathrm{sc}}(P)
$$

> は表示された最初の二つの $\Gamma_c$ の位置で完全である。ただし最後の矢印の全射性はここでは主張しない。
<!-- formal-statement-end -->

「完全」とは、ある項で**入ってくる写像の像が出ていく写像の核と一致する**ことです。最初の $0$ からの写像の像は $\{0\}$ ですから、そこで必要なのは $\ker P=\{0\}$、次に必要なのは $\operatorname{im}P=\ker E_{\mathrm{cau}}$ です。

### 証明の見取り図

まず $P\varphi=0$ なら、コンパクト支持切断に対する $G_{\mathrm{ret}}P\varphi=\varphi$ から $\varphi=0$ を得ます。核の二つの包含を別々に示し、逆包含で先ほどのコンパクト共通解補題を使います。

<!-- proof-start -->
### 証明

**第一項での完全性。** $\varphi\in\Gamma_c(M,E)$ が $P\varphi=0$ と仮定します。$P\varphi$ はコンパクト支持なので、[Greenの両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)を入力 $\varphi$ に適用でき、

$$
\varphi=G_{\mathrm{ret}}(P\varphi)
=G_{\mathrm{ret}}0=0.
$$

従って $\ker(P|_{\Gamma_c})=\{0\}$、すなわち $P$ は単射です。

**像が核に含まれること。** 任意の $\varphi\in\Gamma_c$ について、[二つの零合成](#prop-hpde21-propagator-identities)の第二式が

$$
E_{\mathrm{cau}}(P\varphi)=0
$$

を与えます。よって $\operatorname{im}P\subseteq\ker E_{\mathrm{cau}}$。

**核が像に含まれること。** $f\in\ker E_{\mathrm{cau}}$ を任意に取ります。定義と線形性より

$$
0=E_{\mathrm{cau}}f
=G_{\mathrm{ret}}f-G_{\mathrm{adv}}f,
$$

したがって $G_{\mathrm{ret}}f=G_{\mathrm{adv}}f$ です。[共通解のコンパクト支持補題](#lem-hpde21-common-solution-compact)を適用すると

$$
u:=G_{\mathrm{ret}}f
\in\Gamma_c(M,E),\qquad Pu=f.
$$

従って $f\in P\Gamma_c(M,E)$ であり、$\ker E_{\mathrm{cau}}\subseteq\operatorname{im}P$ を得ます。両包含を合わせて核の等式を得ます。

第一項と第二項の条件を併せれば、列の表示された部分での完全性が成立します。$\square$
<!-- proof-end -->

この定理は、任意の源 $f$ を解く操作について「**遅延応答と先進応答の差が見えない**のは、ちょうど $f$ 自身がコンパクトな切断に $P$ をかけた形であるとき」と説明します。一般の $P$ で自己随伴性を追加する必要もありません。

## 6. 核の等式から何がまだ出てこないか

二つのコンパクト源 $f_1,f_2$ については、線形性と[核の定理](#thm-hpde21-kernel-exact)から

$$
E_{\mathrm{cau}}f_1=E_{\mathrm{cau}}f_2
\iff E_{\mathrm{cau}}(f_1-f_2)=0
\iff f_1-f_2=P\varphi
$$

となる $\varphi\in\Gamma_c(M,E)$ が存在します。この意味で、出力を区別するために必要なのは「$P$ をかけて作れる源の違いを無視した源」です。

ただし、$\operatorname{Sol}_{\mathrm{sc}}(P)$ の**すべて**が因果伝播子の値になるかどうかは、以上からは従いません。線形写像は核が分かっても像の全体は決まりません。次のHPDE22でCauchy時間関数のカットオフを作り、全射性を別途証明します。

## 7. 演習：二つの作用域と核を紙上で確認する

### Level A

<a id="ex-hpde21-a01"></a>
#### HPDE21-A01 二つの零合成の由来

本講の $P$、$G_{\mathrm{ret}}$、$G_{\mathrm{adv}}$ に対し、$f,\varphi\in\Gamma_c(M,E)$ とする。$PE_{\mathrm{cau}}f$ と $E_{\mathrm{cau}}P\varphi$ をそれぞれ計算し、どのGreen恒等式を使ったか述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。最初は[Green方程式](../HPDE18/index.md#thm-hpde18-green-existence)を二度使い、

$$
PE_{\mathrm{cau}}f
=PG_{\mathrm{ret}}f-PG_{\mathrm{adv}}f=f-f=0.
$$

第二は $P\varphi\in\Gamma_c$ を局所性から確認してから、[コンパクト入力上の右逆恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)を使います。

$$
E_{\mathrm{cau}}P\varphi
=G_{\mathrm{ret}}P\varphi-G_{\mathrm{adv}}P\varphi
=\varphi-\varphi=0.
$$

前者は $PG=\operatorname{id}$、後者は $GP=\operatorname{id}$ を使うため、作用順序を交換したわけではありません。
<!-- solution-end -->

<a id="ex-hpde21-a02"></a>
#### HPDE21-A02 コンパクトな切断から零の差を作る

Minkowski平面の $P=\partial_t^2-\partial_x^2$ に対し $\varphi(t,x)=h(t)q(x)$（$h,q\in C_c^\infty(\mathbb R)$）とする。$f=P\varphi$ を明示し、その台のコンパクト性と $E_{\mathrm{cau}}f=0$ を示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。積の微分から

$$
\partial_t^2\varphi=h''(t)q(x),\qquad
\partial_x^2\varphi=h(t)q''(x)
$$

なので

$$
f=h''(t)q(x)-h(t)q''(x).
$$

滑らかな関数の微分は元の台の外で零です。従って

$$
\operatorname{supp}f\subseteq
\operatorname{supp}h\times\operatorname{supp}q
$$

となり右辺はコンパクトです。[Greenの両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)をコンパクトな $\varphi$ に適用すれば

$$
E_{\mathrm{cau}}f
=G_{\mathrm{ret}}P\varphi-G_{\mathrm{adv}}P\varphi
=\varphi-\varphi=0.
$$

源 $f$ が恒等的に零であることは必要ありません。
<!-- solution-end -->

<a id="ex-hpde21-a03"></a>
#### HPDE21-A03 空間コンパクト性と斉次性

$f\in\Gamma_c(M,E)$、$K=\operatorname{supp}f$ とする。$E_{\mathrm{cau}}f$ が $\operatorname{Sol}_{\mathrm{sc}}(P)$ に属することを、方程式と台の二条件に分けて確認せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。方程式は[Green方程式](../HPDE18/index.md#thm-hpde18-green-existence)を引き、

$$
P(E_{\mathrm{cau}}f)=f-f=0
$$

です。遅延解の台は $J^+(K)$、先進解の台は $J^-(K)$ に含まれます。差が非零の点では少なくともどちらかが非零なので

$$
\operatorname{supp}(E_{\mathrm{cau}}f)
\subseteq J^+(K)\cup J^-(K)=J(K).
$$

$K$ はコンパクトだから[scの定義](../HPDE20/index.md#def-hpde20-support-classes)を満たします。二条件より定義された斉次解空間に属します。
<!-- solution-end -->

<a id="ex-hpde21-a04"></a>
#### HPDE21-A04 コンパクト源でも出力は非コンパクト

Minkowski平面で $P=\partial_t^2-\partial_x^2$ とし、$f\ge0$ は零でない滑らかな関数で $\operatorname{supp}f\subset[-1,1]^2$ とする。$E_{\mathrm{cau}}f(t,0)$ を $t\ge3$ と $t\le-3$ で求め、その台が時空コンパクトでないことを示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。[波動核の積分公式](../HPDE12/index.md#def-hpde12-convolution-operators)では、$t\ge3$ のとき源の点 $(s,y)$ は $s\le1$、$|y|\le1\le t-s$ を満たします。従って遅延積分に全源が入り、先進側は零です。$I=\int_{\mathbb R^2}f(s,y)\,ds\,dy$ と置くと $I>0$ であり、

$$
E_{\mathrm{cau}}f(t,0)=\frac12 I\quad(t\ge3).
$$

$t\le-3$ では、源のすべてが観測点の未来にあり、遅延側は零、先進側だけが全源の積分です。従って

$$
E_{\mathrm{cau}}f(t,0)=-\frac12 I\quad(t\le-3).
$$

どんな有限時間区間にも収まらない点で非零なので出力の台はコンパクトではありません。これはsc性と矛盾しません。
<!-- solution-end -->

### Level B

<a id="ex-hpde21-b01"></a>
#### HPDE21-B01 二つの支持包含からコンパクト性へ

$f\in\Gamma_c(M,E)$ について $G_{\mathrm{ret}}f=G_{\mathrm{adv}}f=u$ とする。$u$ がコンパクト支持で $Pu=f$ であることを、コンパクト因果ダイヤモンドの仮定をすべて述べて証明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$K=\operatorname{supp}f$ はコンパクトです。$u$ は両方の解と等しいので

$$
\operatorname{supp}u\subseteq J^+(K),\qquad
\operatorname{supp}u\subseteq J^-(K)
$$

が同時に成立します。ゆえに台は $J^+(K)\cap J^-(K)$ に含まれます。時空の大域双曲性、境界がないこと、および $K$ がコンパクトであることから[コンパクト因果ダイヤモンド補題](../HPDE19/index.md#lem-hpde19-causal-overlap)を $K,L=K$ に適用できます。右辺はコンパクトです。閉集合 $\operatorname{supp}u$ はその閉部分集合なのでコンパクトです。最後に[遅延Green方程式](../HPDE18/index.md#thm-hpde18-green-existence)により

$$
Pu=PG_{\mathrm{ret}}f=f.
$$

従って $u\in\Gamma_c$ は必要な原像です。
<!-- solution-end -->

<a id="ex-hpde21-b02"></a>
#### HPDE21-B02 列の先頭に零を置ける理由

本講の $P$ が $\Gamma_c(M,E)$ 上で単射であることを証明せよ。また、斉次解 $v\ne0$ が別の支持条件では存在し得ることが、この単射性と矛盾しない理由を述べよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$\varphi\in\Gamma_c$ が $P\varphi=0$ とします。入力 $\varphi$ がコンパクト支持なので[両側Green恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)の適用条件を満たします。従って

$$
\varphi=G_{\mathrm{ret}}P\varphi
=G_{\mathrm{ret}}0=0,
$$

つまり核は $\{0\}$ で $P$ は単射です。

他方、たとえばMinkowski平面の $P=\partial_t^2-\partial_x^2$ に対して $v(t,x)=h(t-x)$ は $Pv=0$ で、$h$ が非零なら $v\ne0$ です。この $v$ の台は光線方向に非コンパクトであり、$\Gamma_c$ の元ではありません。[scの定義](../HPDE20/index.md#def-hpde20-support-classes)を満たしても、時空コンパクトとは限らないため、単射性と矛盾しません。
<!-- solution-end -->

<a id="ex-hpde21-b03"></a>
#### HPDE21-B03 大域双曲性を外すと壊れる箇所

通常のMinkowski平面から原点を除いた $M^\circ=\mathbb R^{1+1}\setminus\{(0,0)\}$ を考える。$p=(-1,0)$、$q=(1,0)$、$K=\{p,q\}$ とする。$M^\circ$ 内で $J^+(K)\cap J^-(K)$ がコンパクトとは限らないことを具体的な点列で示し、HPDE21のどの証明段階をこの模型ではそのまま使えないか述べよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$r_n=(0,1/n)$（$n\ge2$）を取ります。Minkowski計量で $p$ から $r_n$、$r_n$ から $q$ までは、時間差 $1$ に対し空間差 $1/n<1$ のため時間的に結ばれます。各線分を時刻に沿う直線とすれば、途中で原点を通らず $M^\circ$ 内にあります。従って

$$
r_n\in J^+(p)\cap J^-(q)
\subseteq J^+(K)\cap J^-(K).
$$

一方 $r_n\to(0,0)$ は元の $\mathbb R^2$ での極限ですが、原点は $M^\circ$ に含まれません。$M^\circ$ 内ではこの点列に収束部分列がないので、この因果ダイヤモンドはコンパクトではありません。

[共通解の台をコンパクトにする補題](#lem-hpde21-common-solution-compact)は、大域双曲性に基づくコンパクト因果ダイヤモンドを使います。その適用根拠が失われます。ここではGreen作用素自体の存在・一意性が成立しないとまでは主張していません。
<!-- solution-end -->

<a id="ex-hpde21-b04"></a>
#### HPDE21-B04 源を同じ解で分類する

$f_1,f_2\in\Gamma_c(M,E)$ について、$E_{\mathrm{cau}}f_1=E_{\mathrm{cau}}f_2$ であるための必要十分条件を、ある $\varphi\in\Gamma_c(M,E)$ を用いて書き、両方向を証明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。必要十分条件は

$$
f_1-f_2=P\varphi
\quad\text{となる }\varphi\in\Gamma_c(M,E)
\text{ が存在すること}
$$

です。まず出力が等しければ線形性から

$$
E_{\mathrm{cau}}(f_1-f_2)=
E_{\mathrm{cau}}f_1-E_{\mathrm{cau}}f_2=0.
$$

[核の定理](#thm-hpde21-kernel-exact)を差 $f_1-f_2\in\Gamma_c$ に適用すると、この差は $P\Gamma_c$ に属し、求める $\varphi$ が存在します。

逆に差が $P\varphi$ と書ければ、[零合成](#prop-hpde21-propagator-identities)から

$$
E_{\mathrm{cau}}f_1-E_{\mathrm{cau}}f_2
=E_{\mathrm{cau}}P\varphi=0.
$$

従って二つの出力は等しいです。この判定に全射性は不要です。
<!-- solution-end -->

### Level C

<a id="ex-hpde21-c01"></a>
#### HPDE21-C01 核・単射性・非コンパクト出力の総合問題

境界なし大域双曲Lorentz時空の有限ランク束上にnormally hyperbolic作用素 $P$ があり、遅延・先進Green作用素が既出の両側恒等式と支持条件を満たすとする。

(1) $E_{\mathrm{cau}}$ の作用域・値域を明示して $PE_{\mathrm{cau}}=E_{\mathrm{cau}}P=0$ をそれぞれの入力について証明せよ。

(2) $\ker E_{\mathrm{cau}}=P\Gamma_c$ と $P|_{\Gamma_c}$ の単射性を証明せよ。

(3) (2)は $E_{\mathrm{cau}}$ がすべてのsc斉次解を表すことを証明しているか。Minkowski平面でコンパクトな非負の源を使い、出力が非コンパクトでもscである状況を説明せよ。
- Level: C

<!-- solution-start -->
**詳細解答**。

**(1)** コンパクト源 $f$ に対してGreen解の両方が定義され、差は

$$
E_{\mathrm{cau}}:\Gamma_c(M,E)\to\Gamma(M,E),
\qquad
E_{\mathrm{cau}}f=G_{\mathrm{ret}}f-G_{\mathrm{adv}}f.
$$

[Green方程式](../HPDE18/index.md#thm-hpde18-green-existence)より

$$
PE_{\mathrm{cau}}f
=PG_{\mathrm{ret}}f-PG_{\mathrm{adv}}f=f-f=0.
$$

$\varphi\in\Gamma_c$ に対し $P\varphi\in\Gamma_c$ なので、[両側Green恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)を用いると

$$
E_{\mathrm{cau}}P\varphi
=G_{\mathrm{ret}}P\varphi-G_{\mathrm{adv}}P\varphi
=\varphi-\varphi=0.
$$

また台について

$$
\operatorname{supp}(E_{\mathrm{cau}}f)
\subseteq J^+(\operatorname{supp}f)
\cup J^-(\operatorname{supp}f)
$$

なので、[sc支持の定義](../HPDE20/index.md#def-hpde20-support-classes)と合わせ、値域を $\operatorname{Sol}_{\mathrm{sc}}(P)$ に制限できます。

**(2)** $\operatorname{im}P\subseteq\ker E_{\mathrm{cau}}$ は(1)の後半から従います。逆に $E_{\mathrm{cau}}f=0$ とすると

$$
u=G_{\mathrm{ret}}f=G_{\mathrm{adv}}f,\qquad Pu=f.
$$

$K=\operatorname{supp}f$ とすれば

$$
\operatorname{supp}u
\subseteq J^+(K)\cap J^-(K).
$$

[コンパクト因果ダイヤモンド補題](../HPDE19/index.md#lem-hpde19-causal-overlap)の条件は、大域双曲性と $K$ のコンパクト性によって満たされます。この交差はコンパクトで、閉集合 $\operatorname{supp}u$ もコンパクトです。よって $u\in\Gamma_c$ で $f=Pu\in P\Gamma_c$。両包含から核の等式が成り立ちます。

さらに $\varphi\in\Gamma_c$ が $P\varphi=0$ なら、[右側Green恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)より

$$
\varphi=G_{\mathrm{ret}}P\varphi=G_{\mathrm{ret}}0=0.
$$

従って $P|_{\Gamma_c}$ は単射です。

**(3)** (2)から分かるのは「零へ送る源」と「最初の写像が単射」という二点です。$\operatorname{im}E_{\mathrm{cau}}=\operatorname{Sol}_{\mathrm{sc}}(P)$ はまだ証明されていません。

非コンパクト出力の例として $P=\partial_t^2-\partial_x^2$、$f\ge0$、$f\not\equiv0$、$\operatorname{supp}f\subset[-1,1]^2$ を取ります。[平坦波動核](../HPDE12/index.md#def-hpde12-convolution-operators)の遅延・先進積分に $t\ge3,x=0$ を代入すると、源の全体は因果的過去にあるため

$$
E_{\mathrm{cau}}f(t,0)=\frac12\int_{\mathbb R^2}f(s,y)\,ds\,dy>0.
$$

$t$ はいくらでも大きくできるので台は非コンパクトです。それでもGreen支持条件から台は $J(\operatorname{supp}f)$ に収まりscです。これで時空コンパクト性と空間コンパクト性の区別も確認できました。
<!-- solution-end -->

## 8. 次講へつなぐ問い

本講では $P$ の単射性と $\ker E_{\mathrm{cau}}=P\Gamma_c$ を閉じました。残るのは、**任意の空間コンパクトな斉次解 $u$ から、$E_{\mathrm{cau}}f=u$ となるコンパクト源 $f$ を作れるか**という問いです。次講では時間方向に変化する滑らかなカットオフを使って、方程式の解から源を作ります。