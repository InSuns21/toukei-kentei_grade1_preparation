# DEF1-05 二次以上の障害類

<!-- definition-example-audit: strict -->

## 1. 一次変形は、なぜ二次で止まることがあるのか

[一次変形の商空間](../DEF1-04/index.md#prop-def1-04-gauge-exact)は $H^1(X,T_X)$ であった。しかし、一次方程式を満たすことは、実際の複素構造を作れることを意味しない。[Maurer–Cartan方程式](../DEF1-03/index.md#thm-def1-03-maurer-cartan)には二次の括弧が含まれるからである。今回の問いは、その二次項を補正できない原因を**コホモロジー類**として測り、三次以降へも同じ検査を拡張することである。

$X$ を複素次元 $n\ge1$ の複素多様体とする。$T_X=T^{1,0}X$ とし、既習の[正則接束値Dolbeault複体](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)について

$$
C^q=\mathcal A^{0,q}(X,T_X),\qquad
d=\bar\partial_T:C^q\longrightarrow C^{q+1},\qquad d^2=0
$$

と略記する。$d\alpha=0$ を満たす $\alpha\in C^1$ は一次の候補である。$t$ を形式変数とし、$\phi(t)=t\alpha+t^2\beta+\cdots$ の係数を次数ごとに決めたい。ここでは収束を仮定しない。形式変数を使うというのは、各次数の係数を等置する代数的な操作であり、$t$ に数値を代入できるという意味ではない。

[次数別Maurer–Cartan方程式](../DEF1-03/index.md#prop-def1-03-order-equations)の二次の式は

$$
d\beta=-\frac12[\alpha,\alpha].
$$

右辺が $d$ の像にあるかどうかが、二次への延長を決める。ただし、まず右辺が $d$ で閉じていることを確かめないと、$H^2$ の元と呼ぶことさえできない。

## 2. 括弧を微分する規則と二次障害

前々章の[次数1の括弧](../DEF1-03/index.md#def-def1-03-bracket)では $[\alpha,\beta]=[\beta,\alpha]\in C^2$ だった。閉性を証明するため、接束値形式の次数を含む符号規則を確認する。次数 $p$ の形式 $u$、次数 $q$ の形式 $v$ の括弧は次数 $p+q$ を持ち、次を満たす。

$$
\begin{aligned}
[u,v]&=-(-1)^{pq}[v,u],\\
d[u,v]&=[du,v]+(-1)^p[u,dv],\\
(-1)^{pr}[u,[v,w]]&+(-1)^{qp}[v,[w,u]]
+(-1)^{rq}[w,[u,v]]=0
\end{aligned}
$$

ただし最後の式では $u,v,w$ の次数はそれぞれ $p,q,r$。これは次数付きLie括弧の反対称性、微分則、Jacobi恒等式である。特に次数1同士の括弧は**対称**、次数1と次数2の括弧は反対称になる。

<a id="lem-def1-05-graded-identities"></a>

<!-- formal-statement-start -->
> **補題（接束値Dolbeault複体の括弧恒等式）**
>
> 任意の複素多様体 $X$ 上の $C^q=\mathcal A^{0,q}(X,T_X)$ において、[次数1の括弧](../DEF1-03/index.md#def-def1-03-bracket)は上の次数付き括弧へ拡張でき、表示した反対称性・微分則・Jacobi恒等式を満たす。特に $\alpha,\beta\in C^1$ と $v\in C^0$ に対し

$$
\begin{aligned}
d[\alpha,\beta]&=[d\alpha,\beta]-[\alpha,d\beta],\\
d[v,\alpha]&=[dv,\alpha]+[v,d\alpha],\\
d[v,dv]&=[dv,dv]
\end{aligned}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

局所座標で接束値形式を「反正則形式に値を持つ正則方向の微分作用素」と見る。次数付き交換子ならJacobi恒等式が自動的に成り立ち、$d$ との交換子が微分則を与える。

<!-- proof-start -->
### 証明

局所正則座標 $z^i$ を選ぶ。$u=\sum u^i\partial_{z^i}\in C^p$ の係数 $u^i$ は滑らかな $(0,p)$ 形式である。滑らかな関数と $d\bar z^j$ からなる反正則微分形式の代数上で、次数 $p$ の微分作用素 $D_u$ を

$$
D_u(f)=\sum_i u^i\wedge\partial_{z^i}f,\qquad
D_u(d\bar z^j)=0
$$

と置き、積には $D_u(\eta\wedge\theta)=D_u\eta\wedge\theta+(-1)^{p\deg\eta}\eta\wedge D_u\theta$ で拡張する。正則座標変換では $\bar w$ は $\bar z$ のみの関数なので、この定義は座標間で一致する。

次数付き交換子 $[D_u,D_v]_{\mathrm g}=D_uD_v-(-1)^{pq}D_vD_u$ は再び同じ種類の微分作用素である。関数 $f$ に作用させ、$\partial_{z^i}\partial_{z^j}f$ の項が相殺することを使うと

$$
[u,v]^i=\sum_j\left(
u^j\wedge\partial_{z^j}v^i
-(-1)^{pq}v^j\wedge\partial_{z^j}u^i\right)
$$

を得る。$p=q=1$ なら、二つの $(0,1)$ 形式の外積を展開して、[前々章の成分式](../DEF1-03/index.md#def-def1-03-bracket)の四項がそのまま出る。交換子の反対称性とJacobi恒等式は、作用素の合成の結合則を両辺に展開して直接得られる。

また $d=\bar\partial$ と $D_u$ の交換子を関数 $f$ に作用させると、$\bar\partial\partial_{z^i}f=\partial_{z^i}\bar\partial f$ により二階微分が相殺し、$[d,D_u]_{\mathrm g}=D_{du}$ となる。$d\bar z^j$ 上でも両辺は零である。従って

$$
\begin{aligned}
D_{d[u,v]}&=[d,[D_u,D_v]_{\mathrm g}]_{\mathrm g}\\
&=[[d,D_u]_{\mathrm g},D_v]_{\mathrm g}
+(-1)^p[D_u,[d,D_v]_{\mathrm g}]_{\mathrm g}\\
&=D_{[du,v]+(-1)^p[u,dv]}.
\end{aligned}
$$

作用素は関数への作用で係数を復元できるため、微分則が成立する。最後の三式は $p,q$ に $1,1$ または $0,1$ を代入し、$d^2v=0$ を用いたものである。$\square$
<!-- proof-end -->

これで $d\alpha=0$ なら $d[\alpha,\alpha]=0$ と分かる。従って二次項の「閉形式の類」を取れる。

<a id="def-def1-05-primary-obstruction"></a>

<!-- formal-statement-start -->
> **定義（二次障害類）**
>
> 複素多様体 $X$ と $d\alpha=0$ を満たす $\alpha\in C^1$ に対し、**二次障害類**を

$$
\operatorname{ob}_2([\alpha])
=\left[\frac12[\alpha,\alpha]\right]
\in H_{\bar\partial}^{0,2}(X,T_X)\simeq H^2(X,T_X)
$$

> と定める。右端の同型には[正則ベクトル束版Dolbeaultの定理](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)を使う。括弧の係数 $1/2$ は $\phi(t)=t\alpha+t^2\beta+\cdots$ の二次係数と整合させるものである。右辺が代表 $\alpha$ の選び方に依存しないことは次の定理で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-05-primary-obstruction -->
**定義の確認**（零になるが括弧は非零）。$X=\mathbb C^2$ とし、[前々章の例](../DEF1-03/index.md#def-def1-03-bracket)の

$$
\alpha=z^2\,d\bar z^1\otimes\partial_{z^1}
+z^1\,d\bar z^2\otimes\partial_{z^2}
$$

を使う。$d\alpha=0$ は係数の正則性から従う。括弧を二方向へ展開すると

$$
\frac12[\alpha,\alpha]
=(-z^1\partial_{z^1}+z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2\ne0.
$$

しかし次の $\beta$ を選べばよい。

$$
\beta=\bar z^1z^1\,d\bar z^2\otimes\partial_{z^1}
+\bar z^2z^2\,d\bar z^1\otimes\partial_{z^2}.
$$

そのDolbeault微分は

$$
d\beta=(z^1\partial_{z^1}-z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2
=-\frac12[\alpha,\alpha].
$$

従って括弧の形式そのものは非零でも、コホモロジー類 $\operatorname{ob}_2([\alpha])$ は零である。これは $\beta$ を**実際に一つ作って**二次条件を確認する例である。
<!-- definition-example-end -->

<a id="thm-def1-05-primary-criterion"></a>

<!-- formal-statement-start -->
> **定理（二次延長の必要十分条件と代表独立性）**
>
> 複素多様体 $X$ の一次閉形式 $\alpha\in C^1$ に対し、二次までの形式

$$
\phi(t)=t\alpha+t^2\beta
$$

> がMaurer–Cartan方程式を二次の係数まで満たす $\beta\in C^1$ が存在することと、二次障害類が零であることは同値である。

$$
\operatorname{ob}_2([\alpha])=0.
$$

> さらに $\alpha$ を $\alpha+dv$（$v\in C^0$）へ替えても障害類は変わらない。従って二次障害は $H^1(X,T_X)$ の元について定まる。
<!-- formal-statement-end -->

### 証明の見取り図

二次方程式は「閉じた二次形式が完全か」を問う。その後、代表変更による括弧の差を $d$ の像として書けば、商類が不変になる。

<!-- proof-start -->
### 証明

[次数別方程式](../DEF1-03/index.md#prop-def1-03-order-equations)に $\phi_1=\alpha,\phi_2=\beta$ を代入すると、一次係数は $d\alpha=0$、二次係数は

$$
d\beta+\frac12[\alpha,\alpha]=0.
$$

[括弧恒等式](#lem-def1-05-graded-identities)より右辺第二項は閉形式である。$H^2=\ker(d:C^2\to C^3)/\operatorname{im}(d:C^1\to C^2)$ の定義によれば、上式に解 $\beta$ があることは $[\tfrac12[\alpha,\alpha]]=0$ と同値である。

次に $\alpha'=\alpha+dv$ と置く。$d\alpha'=d\alpha+d^2v=0$ である。次数1の括弧の対称性と[微分則](#lem-def1-05-graded-identities)から

$$
\begin{aligned}
\frac12[\alpha',\alpha']-\frac12[\alpha,\alpha]
&=[\alpha,dv]+\frac12[dv,dv]\\
&=d[v,\alpha]+\frac12d[v,dv]\\
&=d\left([v,\alpha]+\frac12[v,dv]\right).
\end{aligned}
$$

二行目では $d[v,\alpha]=[dv,\alpha]+[v,d\alpha]=[\alpha,dv]$、および $d[v,dv]=[dv,dv]$ を使った。従って二つの二次形式は同じ $H^2$ の類を与える。前章のゲージ規約 $\alpha' = \alpha-dv$ はここで $v$ を $-v$ に替えた場合であり、結論は同じである。$\square$
<!-- proof-end -->

二次障害は一次方向 $a=[\alpha]\in H^1(X,T_X)$ に対する**二次式**である。$\operatorname{ob}_2(ca)=c^2\operatorname{ob}_2(a)$、また二方向 $a,b$ の和では交差項 $[\alpha,\gamma]$ の類が現れる。$H^2$ の次元だけを見ても、この二次式が零か非零かは判断できない。

## 3. 三次から先に現れるもの

二次が解けたとしても、三次方程式は独立に調べる必要がある。$\phi(t)=\sum_{k\ge1}t^k\phi_k$ とし、$\phi_1=\alpha$ と置く。[形式的解の定義](../DEF1-03/index.md#def-def1-03-formal-solution)に従い、$t$ の係数を一つずつ零にする。

<a id="def-def1-05-higher-obstruction"></a>

<!-- formal-statement-start -->
> **定義（高次障害形式と障害類）**
>
> 複素多様体 $X$ 上、整数 $m\ge2$ と $\phi_1,\ldots,\phi_{m-1}\in C^1$ が、すべての $1\le k<m$ について

$$
d\phi_k+\frac12\sum_{i+j=k\atop i,j\ge1}[\phi_i,\phi_j]=0
$$

> を満たすとする（$k=1$ の和は空和）。この**選ばれた低次の延長**に対する次数 $m$ の障害形式を

$$
R_m=\frac12\sum_{i+j=m\atop i,j\ge1}
[\phi_i,\phi_j]\in C^2
$$

> とする。$dR_m=0$ を次の定理で示すので、その類 $[R_m]\in H^2(X,T_X)$ をこの低次延長の次数 $m$ の障害類とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-05-higher-obstruction -->
**定義の確認**（三次）。$m=3$ では和に現れるのは $(i,j)=(1,2),(2,1)$ の二組である。次数1の括弧は対称なので

$$
R_3=\frac12\bigl([\phi_1,\phi_2]+[\phi_2,\phi_1]\bigr)
=[\phi_1,\phi_2].
$$

前の二次方程式を満たす $\phi_2$ を選び、$R_3$ が完全なら $d\phi_3=-R_3$ を解く。$\phi_2$ を別の解 $\phi_2+\eta$（$d\eta=0$）へ替えると $R_3$ は $[\phi_1,\eta]$ だけ変化するため、**三次障害類は一般に一次方向だけの不変量ではない**。
<!-- definition-example-end -->

すべての次数で障害形式が閉じることを確かめるには、形式 $\phi$ の積分可能性のずれを $F(\phi)=d\phi+\tfrac12[\phi,\phi]$ と書き、その微分を調べる。微分 $dF$ は単独では零にならないが、括弧による補正項と足すと零になる。この関係をBianchi恒等式と呼ぶ。

<a id="lem-def1-05-bianchi"></a>

<!-- formal-statement-start -->
> **補題（Maurer–Cartan曲率のBianchi恒等式）**
>
> 複素多様体 $X$ と任意の接束値形式 $\phi\in C^1$ に対し、積分可能性のずれを

$$
F(\phi)=d\phi+\frac12[\phi,\phi]\in C^2
$$

> と置くと、次の恒等式が成り立つ。

$$
dF(\phi)+[\phi,F(\phi)]=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

微分則で二次項を微分し、三重括弧をJacobi恒等式で消す。残る二項は次数符号で相殺する。

<!-- proof-start -->
### 証明

[括弧の微分則](#lem-def1-05-graded-identities)を次数1の $\phi$ へ適用すると

$$
\begin{aligned}
dF&=\frac12\bigl([d\phi,\phi]-[\phi,d\phi]\bigr)
=[d\phi,\phi],\\
[\phi,F]&=[\phi,d\phi]+\frac12[\phi,[\phi,\phi]].
\end{aligned}
$$

次数 $(1,1,1)$ のJacobi恒等式は $-3[\phi,[\phi,\phi]]=0$ を与え、複素数体上では二重括弧は零である。また次数 $(1,2)$ の反対称性で $[\phi,d\phi]=-[d\phi,\phi]$ となる。従って二つの式を加えると $dF+[\phi,F]=0$ を得る。$\square$
<!-- proof-end -->

<a id="thm-def1-05-higher-criterion"></a>

<!-- formal-statement-start -->
> **定理（高次障害の閉性と延長判定）**
>
> 複素多様体 $X$ 上、[高次障害の定義](#def-def1-05-higher-obstruction)の仮定を満たす $\phi_1,\ldots,\phi_{m-1}\in C^1$ が与えられたとする。このとき $dR_m=0$ が成立する。次数 $m$ までMaurer–Cartan方程式を満たす $\phi_m\in C^1$ が存在するための必要十分条件は

$$
[R_m]=0\in H^2(X,T_X)
$$

> である。特に $H^2(X,T_X)=0$ なら、任意の一次閉形式はすべての次数へ帰納的に**形式的**延長を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず[Bianchi恒等式](#lem-def1-05-bianchi)を部分和 $\phi_{<m}$ に適用する。低次の曲率が消えていると、最初に残る $t^m$ の係数は $d$ で閉じる。そこで $H^2$ の零判定を繰り返せる。

<!-- proof-start -->
### 証明

まず $\phi_{<m}(t)=\sum_{k=1}^{m-1}t^k\phi_k$ を[Bianchi恒等式](#lem-def1-05-bianchi)の $\phi$ へ代入する。仮定により $F(\phi_{<m})$ の $t^0,\ldots,t^{m-1}$ の係数は零であり、$t^m$ の係数は $R_m$ である。以下の $O(t^{m+1})$ は形式級数の次数 $m+1$ 以上を表し、数値的な大きさの評価ではない。従って

$$
F(\phi_{<m})=t^mR_m+O(t^{m+1}).
$$

$\phi_{<m}$ は $t$ の一次から始まるので、$[\phi_{<m},F(\phi_{<m})]$ は $t^{m+1}$ 以上から始まる。Bianchi恒等式の $t^m$ 係数を比較すると $dR_m=0$ を得る。

最後に $t^m\phi_m$ を追加すると、$d\phi_m$ は次数 $m$ に寄与し、括弧 $[t^m\phi_m,t^i\phi_i]$ は $i\ge1$ ゆえ次数 $m+1$ 以上にしか寄与しない。従って次数 $m$ の方程式は正確に $d\phi_m=-R_m$ である。これは閉形式 $R_m$ の類が零であることと同値である。

$H^2=0$ の場合は、$d\phi_1=0$ を出発点とし、各 $m$ で閉形式 $R_m$ が必ず完全になるので数学的帰納法により全係数 $\phi_m$ を選べる。ただし、この帰納法は $\|\phi_m\|$ の評価を一切与えず、$\sum t^m\phi_m$ の収束を意味しない。$\square$
<!-- proof-end -->

三次以降では $R_m$ の定義に**低次の解の選択**が含まれる。二次障害が零でも、ある $\phi_2$ の選び方では三次障害が残る可能性がある。延長問題で問うべきなのは、適切な選択を続けて全次数へ進めるかどうかであり、選択を固定した一つの高次類だけではない。

## 4. $H^2\ne0$ なのに障害が生じない例

$X=\mathbb C^2/\Lambda$ を、$\Lambda=(\mathbb Z+i\mathbb Z)^2$ による複素二次元トーラスとする。座標 $z^1,z^2$ に対応する $dz^j,d\bar z^j,\partial_{z^j}$ は格子での平行移動に不変なので $X$ 上で大域的に定義される。

まず $H^2(X,T_X)$ が非零であることを直接確かめる。接束は大域枠 $\partial_{z^1},\partial_{z^2}$ で自明であり、

$$
\omega=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}
$$

は $d\omega=0$ を満たす。もし $\omega=d\eta$ となる大域的 $\eta\in C^1$ が存在すれば、その $\partial_{z^1}$ 成分を $\eta^1$ と書き、$\Omega=dz^1\wedge dz^2$ を使う。

ここで二つの微分を区別する。接束値形式への $d=\bar\partial_T$ と異なり、スカラー値形式の**全外微分**は $d_{\mathrm{dR}}=\partial+\bar\partial$ と書く。$d\eta$ の $\partial_{z^1}$ 成分は $\bar\partial\eta^1$ である。

$\eta^1$ は $(0,1)$ 形式なので $\partial\eta^1\wedge\Omega$ は型 $(3,1)$ となり、複素次元2では零である。$d_{\mathrm{dR}}\Omega=0$ と外微分の積の規則から

$$
\begin{aligned}
d_{\mathrm{dR}}(\eta^1\wedge\Omega)
&=(\partial\eta^1+\bar\partial\eta^1)\wedge\Omega
-\eta^1\wedge d_{\mathrm{dR}}\Omega\\
&=\bar\partial\eta^1\wedge\Omega
\end{aligned}
$$

が従う。よって

$$
\int_X d\bar z^1\wedge d\bar z^2\wedge\Omega
=\int_X \bar\partial\eta^1\wedge\Omega
=\int_X d_{\mathrm{dR}}(\eta^1\wedge\Omega)=0
$$

となる。最後の等号には境界のないコンパクト多様体上の[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を使った。

しかし左辺は、格子による商を表す単位立方体 $[0,1]^4$ 上での積分である。$z^j=x^j+iy^j$ とおけば

$$
\begin{aligned}
d\bar z^1\wedge d\bar z^2\wedge dz^1\wedge dz^2
&=-(2i)^2\,dx^1\wedge dy^1\wedge dx^2\wedge dy^2\\
&=4\,dx^1\wedge dy^1\wedge dx^2\wedge dy^2
\end{aligned}
$$

なので積分は $4\ne0$。よって $[\omega]\ne0$、したがって $H^2(X,T_X)\ne0$ である。

一方、任意の複素数の定数 $a^i_j$ を選び

$$
\alpha=\sum_{i,j=1}^2 a^i_j\,d\bar z^j\otimes\partial_{z^i}
$$

と置く。係数が定数なので $d\alpha=0$ であり、[括弧の成分式](../DEF1-03/index.md#def-def1-03-bracket)の $\partial_{z^p}a^i_j$ も全て零である。従って $[\alpha,\alpha]=0$ となり、$\phi(t)=t\alpha$ はすべての次数でMaurer–Cartan方程式を満たす。

$t$ が十分小さいと[Beltramiグラフの直和条件](../DEF1-02/index.md#def-def1-02-beltrami-graph)も成り立つ。[可積分性の定理](../DEF1-03/index.md#thm-def1-03-maurer-cartan)から実際の複素構造が得られ、この例では $t\alpha$ は多項式なので収束の問題もない。

例えば $\alpha=d\bar z^1\otimes\partial_{z^1}$ の一次類は零でない。仮に $\alpha=d(v^1\partial_{z^1}+v^2\partial_{z^2})$ なら $\partial_{\bar z^1}v^1=1$ となる。しかし格子周期関数 $v^1$ の $x^1,y^1$ に関する平均では、左辺は零、右辺は1となり矛盾する。

[トーラスの一次変形の記述](../../CYG/CYG1-12/index.md#prop-cyg1-12-torus-directions)を用いれば、任意の $H^1(X,T_X)$ の類がこのような定数係数代表を持つことも分かる。

**結論**：この $X$ では $H^2(X,T_X)\ne0$ なのに、すべての一次類に定数係数の延長が存在する。障害類を収める**コホモロジー群**と、実際に障害写像が非零の値を取るかは別問題である。

ただし「障害は常に零」を一般の複素多様体に移してはいけない。比較用の純代数模型として、次数1の基底を $e$、次数2の基底を $f$ とする。微分を $d=0$ と置き、括弧は次の式と、それ以外は零という規則で定める。

$$
[e,e]=2f.
$$

Jacobi恒等式は $f$ との括弧がすべて零なので成立する。この模型では一次係数を $\phi_1=e$ とすると二次障害は $[f]\ne0$ であり、$d\phi_2=-f$ を解けない。

これは**複素多様体の具体例ではなく**、障害写像が非零であり得る仕組みを切り出した模型である。

## 5. 何を証明し、何を次章へ残したか

- 二次障害 $\operatorname{ob}_2:H^1(X,T_X)\to H^2(X,T_X)$ は代表によらず定まり、零であることが二次延長と同値である。
- 三次以上の障害は、選んだ低次延長ごとに $H^2(X,T_X)$ に現れ、Bianchi恒等式が閉性を保証する。
- $H^2=0$ は**形式的**延長の十分条件であるが、必要条件ではない。トーラスでは $H^2\ne0$ でも障害が消える。
- 無限級数を実際の解析的変形族へ変えるには収束とゲージ固定の議論が別途必要である。次のKuranishi構成では、この解析的問題を扱う。

## 6. 演習――閉性、商類、選択依存性を自分で検算する

<a id="ex-def1-05-a01"></a>
#### DEF1-05-A01 二次障害の係数 $1/2$
- Level: A

$d\alpha=0$ とする。$\phi=t\alpha+t^2\beta$ を $F(\phi)=d\phi+\tfrac12[\phi,\phi]$ に代入し、$t^1,t^2,t^3,t^4$ の係数を全て書け。

<!-- solution-start -->
**詳細解答。** 微分の線形性から $d\phi=t\,d\alpha+t^2d\beta=t^2d\beta$。括弧の双線形性と次数1同士の対称性より

$$
\begin{aligned}
[\phi,\phi]
&=t^2[\alpha,\alpha]+t^3([\alpha,\beta]+[\beta,\alpha])+t^4[\beta,\beta]\\
&=t^2[\alpha,\alpha]+2t^3[\alpha,\beta]+t^4[\beta,\beta].
\end{aligned}
$$

従って一次係数は零、二次は $d\beta+\tfrac12[\alpha,\alpha]$、三次は $[\alpha,\beta]$、四次は $\tfrac12[\beta,\beta]$。二次係数が零でも後二者が自動的に零にはならない。
<!-- solution-end -->

<a id="ex-def1-05-a02"></a>
#### DEF1-05-A02 閉形式でなければ障害類ではない
- Level: A

$X=\mathbb C^2$ で $\alpha=\bar z^1d\bar z^2\otimes\partial_{z^1}$ とする。$d\alpha$ を求め、$\alpha$ を一次変形として扱えない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $d\bar z^1\wedge d\bar z^2$ の係数は $\partial_{\bar z^1}(\bar z^1)-\partial_{\bar z^2}(0)=1$ なので

$$
d\alpha=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}\ne0.
$$

一次係数は $d\phi_1=0$ を満たす必要がある。これに失敗すると二次補正 $\phi_2$ を追加しても $t^1$ の非零係数は消せないため、$[\alpha]\in H^1$ も二次障害 $\operatorname{ob}_2([\alpha])$ も定義されない。
<!-- solution-end -->

<a id="ex-def1-05-a03"></a>
#### DEF1-05-A03 一次方向を定数倍したとき
- Level: A

$d\alpha=0$、$c\in\mathbb C$ とする。$\operatorname{ob}_2(c[\alpha])$ を求め、$H^2$ の線形写像ではない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $d(c\alpha)=c\,d\alpha=0$ だから定義できる。括弧の複素双線形性より

$$
\operatorname{ob}_2(c[\alpha])
=\left[\frac12[c\alpha,c\alpha]\right]
=c^2\left[\frac12[\alpha,\alpha]\right]
=c^2\operatorname{ob}_2([\alpha]).
$$

一般には $c$ 倍ではなく $c^2$ 倍なので線形写像とはいえない。障害写像が恒等的に零という特別な場合は零写像として線形でもある点に注意する。
<!-- solution-end -->

<a id="ex-def1-05-a04"></a>
#### DEF1-05-A04 三次の組の数を数える
- Level: A

$m=4$ の $R_m$ を $\phi_1,\phi_2,\phi_3$ で表し、$[\phi_i,\phi_j]=[\phi_j,\phi_i]$ を用いて簡約せよ。

<!-- solution-start -->
**詳細解答。** $i,j\ge1$、$i+j=4$ の順序付き組は $(1,3),(2,2),(3,1)$。従って

$$
\begin{aligned}
R_4&=\frac12([\phi_1,\phi_3]+[\phi_2,\phi_2]+[\phi_3,\phi_1])\\
&=[\phi_1,\phi_3]+\frac12[\phi_2,\phi_2].
\end{aligned}
$$

二次の自己括弧の前には $1/2$ が残る。
<!-- solution-end -->

<a id="ex-def1-05-b01"></a>
#### DEF1-05-B01 代表変更の補正形式を作る
- Level: B

$d\alpha=0$ とし $\alpha'=\alpha+dv$、$v\in C^0$ とする。$\tfrac12[\alpha',\alpha']-\tfrac12[\alpha,\alpha]$ が完全形式であることを、原始量も示して証明せよ。

<!-- solution-start -->
**詳細解答。** 先に $d\alpha'=d\alpha+d^2v=0$。双線形性・次数1の対称性から差は $[\alpha,dv]+\tfrac12[dv,dv]$ となる。[微分則](#lem-def1-05-graded-identities)を $v,\alpha$ と $v,dv$ へそれぞれ適用すると

$$
\begin{aligned}
d[v,\alpha]&=[dv,\alpha]+[v,d\alpha]=[\alpha,dv],\\
d[v,dv]&=[dv,dv]+[v,d^2v]=[dv,dv].
\end{aligned}
$$

よって求める原始量は $[v,\alpha]+\tfrac12[v,dv]\in C^1$ である。従って $H^2$ の類は一致する。
<!-- solution-end -->

<a id="ex-def1-05-b02"></a>
#### DEF1-05-B02 二次補正が三次を変える
- Level: B

$d\alpha=0$、$d\beta=-\tfrac12[\alpha,\alpha]$ とする。$\eta\in C^1$ が $d\eta=0$ を満たすとき、$\beta'=\beta+\eta$ も二次補正になることを示し、対応する三次障害形式の差を求めよ。

<!-- solution-start -->
**詳細解答。** 線形性より $d\beta'=d\beta+d\eta=-\tfrac12[\alpha,\alpha]$ である。三次障害形式は[定義](#def-def1-05-higher-obstruction)に $m=3$ を代入して $R_3=[\alpha,\beta]$。従って

$$
R_3'=[\alpha,\beta+\eta]
=[\alpha,\beta]+[\alpha,\eta],\qquad
R_3'-R_3=[\alpha,\eta].
$$

$d[\alpha,\eta]=[d\alpha,\eta]-[\alpha,d\eta]=0$ なので差は閉形式だが、完全とは限らない。従って三次障害類は一般に選択依存である。
<!-- solution-end -->

<a id="ex-def1-05-b03"></a>
#### DEF1-05-B03 二次元トーラスで $H^2$ を検出する
- Level: B

$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ とする。$\omega=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^2}$ が $d$-完全でないことを、$dz^1\wedge dz^2$ との積分とStokesの定理で示せ。

<!-- solution-start -->
**詳細解答。** $d\omega=0$ は $(0,3)$ 形式が複素次元2で零となるため成立する。もし $\omega=d\eta$ なら、$\partial_{z^2}$ 成分で $d\bar z^1\wedge d\bar z^2=\bar\partial\eta^2$ となる。

$\Omega=dz^1\wedge dz^2$ は閉じた大域正則 $(2,0)$ 形式である。$\partial\eta^2\wedge\Omega=0$ は型 $(3,1)$ が複素次元2を超えるためである。第4節で区別した全外微分について

$$
d_{\mathrm{dR}}(\eta^2\wedge\Omega)
=\bar\partial\eta^2\wedge\Omega
$$

となるので、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により

$$
\int_X d\bar z^1\wedge d\bar z^2\wedge\Omega
=\int_X d_{\mathrm{dR}}(\eta^2\wedge\Omega)=0.
$$

一方 $d\bar z^j\wedge dz^j=2i\,dx^j\wedge dy^j$ だから、積の順序を入れ替えると左辺は $-(2i)^2\int_{[0,1]^4}dx^1dy^1dx^2dy^2=4$ となる。矛盾より $[\omega]\ne0$。
<!-- solution-end -->

<a id="ex-def1-05-b04"></a>
#### DEF1-05-B04 非零の障害を持つ代数模型
- Level: B

次数1の空間 $L^1=\mathbb Ce$、次数2の空間 $L^2=\mathbb Cf$、$d=0$、$[e,e]=2f$、$f$ を含む括弧は全て零とする。この次数付きLie代数の $t e$ を二次へ延長できないことを示し、幾何学的な複素多様体の例と混同できない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $d^2=0$ は $d=0$ より成立する。次数1同士の括弧は対称でよく、$[e,e]=2f$ と矛盾しない。全ての二重括弧は $f$ を含むため零であり、Jacobi恒等式も満たす。一次方程式 $de=0$ は成立するが

$$
R_2=\frac12[e,e]=f,\qquad H^2=L^2/\operatorname{im}d=\mathbb Cf
$$

なので $[R_2]=[f]\ne0$。任意の $\phi_2\in L^1$ に対し $d\phi_2=0$ だから $d\phi_2=-f$ は解けない。この模型は次数付きLie代数としての障害の仕組みを示すだけで、ある複素多様体のDolbeault複体から得たとは示していない。
<!-- solution-end -->

<a id="ex-def1-05-c01"></a>
#### DEF1-05-C01 障害空間と実際の延長を統合する
- Level: C

$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ とする。(1) $H^2(X,T_X)\ne0$ を証明せよ。(2) $\alpha=2d\bar z^1\otimes\partial_{z^1}+i\,d\bar z^2\otimes\partial_{z^2}$ が非零の一次類を与えることを示せ。(3) $\phi(t)=t\alpha$ が小さい $t$ で実際の複素構造を与えること、ならびに「$H^2\ne0$ なら障害がある」という推論が誤りである理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (1) $T_X$ は並進不変枠 $\partial_{z^1},\partial_{z^2}$ で自明化される。$\omega=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}$ を考える。$d\omega=0$。もし $\omega=d\eta$ なら、$\partial_{z^1}$ 成分を $\eta^1$ として

$$
\int_Xd\bar z^1\wedge d\bar z^2\wedge dz^1\wedge dz^2
=\int_Xd_{\mathrm{dR}}(\eta^1\wedge dz^1\wedge dz^2)=0
$$

を得る。ここで $d=\bar\partial_T$ は接束値形式への微分、$d_{\mathrm{dR}}=\partial+\bar\partial$ は全外微分である。$\partial\eta^1\wedge dz^1\wedge dz^2=0$ は型 $(3,1)$ が複素次元2を超えることから従う。また $d_{\mathrm{dR}}(dz^1\wedge dz^2)=0$ と[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を用いた。

しかし左辺は基本領域で $-(2i)^2\int_{[0,1]^4}dx^1dy^1dx^2dy^2=4$ なので矛盾する。従って $[\omega]\ne0$。

(2) $d\alpha=0$ は係数が定数だから成立する。もし $\alpha=dv$ なら $v^1$ は $\partial_{\bar z^1}v^1=2$ を満たす。$\partial_{\bar z^1}=(\partial_{x^1}+i\partial_{y^1})/2$ を基本領域で平均すると、周期関数 $v^1$ の境界値が相殺し左辺は零、右辺の平均は2となり矛盾する。ゆえに $[\alpha]\ne0$。

(3) $\partial_{z^p}\alpha^i_{\bar j}=0$ なので[括弧の式](../DEF1-03/index.md#def-def1-03-bracket)から $[\alpha,\alpha]=0$。さらに $d\alpha=0$ だから

$$
F(t\alpha)=t\,d\alpha+\frac{t^2}{2}[\alpha,\alpha]=0
$$

が厳密に成立する。$t$ を小さく取れば $t\alpha$ の作用素ノルムが1未満となってグラフと共役の直和性が成立し、[Maurer–Cartanと可積分性](../DEF1-03/index.md#thm-def1-03-maurer-cartan)から複素構造を得る。この族は多項式だから収束も明白である。(1) は障害の**値を置く空間**の非零性、(3) はこの一次方向の**障害値**の零性であり、両者は矛盾しない。
<!-- solution-end -->
