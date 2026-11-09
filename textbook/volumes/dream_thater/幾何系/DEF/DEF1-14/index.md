# DEF1-14 quinticの101方向とミラーへの橋

<!-- definition-example-audit: strict -->

## 1. 101個の方程式の変化は、周期のどこへ現れるのか

[滑らかなquinticの全一次変形定理](../../CYG/CYG1-13/index.md#thm-cyg1-13-all-first-order)は、五次式の係数を動かす方向と $H^1(X,T_X)$ を一致させた。[Calabi–Yauの局所変形座標](../DEF1-11/index.md#thm-def1-11-local-chart)は、それらが実際の滑らかな局所族へ延びることを保証した。そして[周期写像の微分](../DEF1-13/index.md#prop-def1-13-infinitesimal-period)は、複素構造の動きがHodgeフィルトレーションをどう動かすかを測る。

ここでは、この三つを**一つの具体的な五次超曲面**で接続する。前半では $126-1-24=101$ がどの完全列で正当化されるかを再構成する。後半では101方向すべてを周期の一次微分が検出することを証明し、位相対称性を課したときに残る一方向がmirror symmetryの入口になることを確かめる。

以下、複素数体上で

$$
S=\mathbb C[z_0,z_1,z_2,z_3,z_4],\qquad
S_d=\{S\text{ の次数 }d\text{ の斉次式}\},
$$

とする。$F\in S_5$ が定める**滑らかな**超曲面を $X_F=\{F=0\}\subset\mathbb P^4$ と書く。滑らかさ、射影的Kähler性、[随伴公式からの $K_{X_F}\simeq\mathcal O_{X_F}$](../../CYG/CYG1-08/index.md#prop-cyg1-08-smooth-canonical)を確認してから変形論を適用する。$X_F$ は複素次元3であり、[quinticのHodge数](../../CYG/CYG1-08/index.md#prop-cyg1-08-hodge-diamond)は

$$
h^{3,0}=1,\qquad h^{2,1}=101,\qquad h^{1,1}=1.
$$

## 2. 126、1、24をそれぞれどの空間で引くか

五つの非負整数 $a_i$ の和を5とする単項式 $z_0^{a_0}\cdots z_4^{a_4}$ は、仕切り4本と玉5個の配置に対応する。したがって

$$
\dim S_5=\binom{5+5-1}{4}=\binom94=126.
$$

しかし $F+tG$ と $c(F+tG)$（$c\ne0$）は同じ零集合を表す。また、射影座標を変える $PGL(5)$ の接方向も同じ抽象複素多様体を表す。以下 $\partial_iF=\partial F/\partial z_i$ は、他の斉次座標を固定して $z_i$ で偏微分する記法とする。[五次式の一次多項式変形の定義](../../CYG/CYG1-13/index.md#def-cyg1-13-polynomial-direction)では、これらを偏微分イデアル

$$
J(F)=(\partial_0F,\ldots,\partial_4F),\qquad
\mathcal P_F=S_5/J(F)_5
$$

で割る。[斉次式のEuler恒等式](../../../代数系/AG/AG2-11/index.md#prop-ag2-11-euler-gradient)の $5F=\sum_i z_i\partial_iF$ によって、$F$ のスカラー倍は既に $J(F)_5$ に含まれる。したがって「25を引く」と「まず1、次に24を引く」は、**同じ重複を別の順序で除く**計算であり、25と1と24を全部引いてはならない。

<a id="ref-def1-14-restriction-sequence"></a>

### 法束列とコホモロジーで、単なる引き算を定理にする

[法束列](../../CYG/CYG1-07/index.md#prop-cyg1-07-normal)と[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)を、いずれも滑らかな $X_F$ 上で読む。

$$
\begin{aligned}
0&\longrightarrow T_{X_F}\longrightarrow T_{\mathbb P^4}|_{X_F}
\xrightarrow{\,dF\,}\mathcal O_{X_F}(5)\longrightarrow0,\\
0&\longrightarrow\mathcal O_{X_F}\longrightarrow
\mathcal O_{X_F}(1)^{\oplus5}\longrightarrow
T_{\mathbb P^4}|_{X_F}\longrightarrow0.
\end{aligned}
$$

第一列の最後の全射は、滑らかな零集合上で $dF$ が零にならないことに依存する。第二列は、五つの斉次座標の一次変化がスカラー行列だけを余分に数えることを束として記述する。

[射影空間のねじり層コホモロジー](../../../代数系/AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)を、$F$ による制限列



$$
0\longrightarrow\mathcal O_{\mathbb P^4}(m-5)
\xrightarrow{\cdot F}\mathcal O_{\mathbb P^4}(m)
\longrightarrow\mathcal O_{X_F}(m)\longrightarrow0
$$

の $m=0,1,5$ に適用する。[長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)から得る必要部分は次の表である。

| 束 | $h^0$ | この後に使う消滅 |
| --- | ---: | --- |
| $\mathcal O_{X_F}$ | $1$ | $H^1=H^2=0$ |
| $\mathcal O_{X_F}(1)$ | $5$ | $H^1=0$ |
| $\mathcal O_{X_F}(5)$ | $126-1=125$ | — |

例えば $H^2(X_F,\mathcal O_{X_F})=0$ は、$m=0$ の列で $H^2(\mathbb P^4,\mathcal O)=H^3(\mathbb P^4,\mathcal O(-5))=0$ の間に挟まれることから出る。これらの消滅をEuler列へ代入すると

$$
h^0(T_{\mathbb P^4}|_{X_F})=5\cdot5-1=24,\qquad
H^1(T_{\mathbb P^4}|_{X_F})=0.
$$

さらに[体積形式による収縮同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-isomorphism)と $h^{2,0}=0$ から、$H^0(X_F,T_{X_F})=0$ である。したがって法束列の長完全列は

$$
0\longrightarrow\mathbb C^{24}\longrightarrow
S_5/\mathbb CF\xrightarrow{\ \delta\ }
H^1(X_F,T_{X_F})\longrightarrow0
$$

に縮まり、

$$
\dim H^1(X_F,T_{X_F})=(126-1)-24=101.
$$

$dF$ の像が $J(F)_5/\mathbb CF$ であることまで確かめた[既習の全一次変形定理](../../CYG/CYG1-13/index.md#thm-cyg1-13-all-first-order)により、単なる次元一致より強い同型

$$
S_5/J(F)_5\simeq H^1(X_F,T_{X_F})
\xrightarrow{\ \lrcorner\Omega\ }H^{2,1}(X_F)
$$

を得る。最後の同型では、零にならない正則3形式 $\Omega$ を選び、[収縮のDolbeault同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)を使っている。つまり同じ101を係数、接束コホモロジー、Hodge型の三つで**同じ線形空間として**照合した。

### Fermatの101個を名前のある単項式にする

$$
F_0=z_0^5+z_1^5+z_2^5+z_3^5+z_4^5
$$

なら $\partial_iF_0=5z_i^4$ である。[Fermat五次のJacobian商](../../CYG/CYG1-13/index.md#prop-cyg1-13-fermat-101)は、指数がすべて3以下で総和5となる単項式を基底に持つ。次数5単項式126個から、少なくとも一つの指数が4以上のものを除く。一つの変数を決めて4を割り振ると、残り1の割り振りが5通りある。二変数がともに4以上になることは総次数5に反するので、除く数は正確に $5\cdot5=25$、残りは101である。

例えば $[z_0^4z_1]=0$ は射影座標の取り替えで消える。一方 $[z_0^3z_1^2]$ と $[z_0z_1z_2z_3z_4]$ は相異なる非零の方向である。この二方向を同じ「quinticを動かす」と呼んでも、後述の位相対称性を課すと区別が生じる。

## 3. 局所の101方向を周期写像は全部見分ける

[BTTの非障害性](../DEF1-10/index.md#thm-def1-10-btt-smooth)と[局所変形座標定理](../DEF1-11/index.md#thm-def1-11-local-chart)を $X_F$ に適用する。滑らかな局所基底 $(U,0)$ を $\mathbb C^{101}$ の原点近傍に取ることができ、Kodaira–Spencer写像は

$$
\operatorname{KS}:T_0U\xrightarrow{\ \simeq\ }H^1(X_F,T_{X_F})
$$

である。Fermatなら上の101個の単項式を $G_a$ と並べ、$F_{\boldsymbol t}=F_0+\sum_{a=1}^{101}t_aG_a$ と置くことで、原点で同型なKodaira–Spencer微分を持つ具体的な族ができる。滑らかさは十分小さい $\boldsymbol t$ で保たれ、[半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)と[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により、この族も局所変形座標として使える。

局所でGauss–Maninの平行移動により $H^3(X_{\boldsymbol t},\mathbb C)$ を中心の $H^3(X_F,\mathbb C)$ と同一視する。[Hodgeフィルトレーションの正則変動](../DEF1-13/index.md#thm-def1-13-holomorphic-variation)により、各点の正則3形式の一次元空間 $F^3_{\boldsymbol t}=H^{3,0}(X_{\boldsymbol t})$ は正則に変化する。したがって局所的に

$$
\mathcal Q:U\longrightarrow
\mathbb P\bigl(H^3(X_F,\mathbb C)\bigr),\qquad
\boldsymbol t\longmapsto F^3_{\boldsymbol t}
$$

が定まる。これは**周期写像からHodge直線だけを取り出した写像**である。行き先の射影空間の次元は $b_3-1=(2+2\cdot101)-1=203$ であり、その中で微分が何次元を捉えるかを調べる。

<a id="thm-def1-14-local-period"></a>

<!-- formal-statement-start -->
> **定理（quinticの局所周期写像の単射微分）**
>
> $X_F\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面とし、$(U,0)$ を原点でKodaira–Spencer写像が同型となる101次元の標識付き滑らかな局所変形族の基底とする。$\mathcal Q$ を上のGauss–Manin平行同定によるHodge直線の写像とする。このとき

$$
d\mathcal Q_0:T_0U\longrightarrow
\operatorname{Hom}\bigl(F^3_0,H^3(X_F,\mathbb C)/F^3_0\bigr)
$$

> は単射である。像は $\operatorname{Hom}(F^3_0,F^2_0/F^3_0)$ に入り、その次元は101である。したがって全Hodge旗の周期写像も原点で単射な微分を持つ。ただし大域的なTorelli定理を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

動くHodge直線を一度微分すると、[Griffiths横断性](../DEF1-13/index.md#thm-def1-13-griffiths)で $F^2/F^3\simeq H^{2,1}$ に落ちる。その成分はKodaira–Spencer類と零にならない3形式の収縮である。両者とも同型なので、どの非零方向も検出される。

<!-- proof-start -->
### 証明

$0\ne\Omega\in F^3_0$ を固定する。$F^3$ の局所正則枠 $\Omega_{\boldsymbol t}$ を $\Omega_0=\Omega$ として選ぶ。射影空間の直線 $[\Omega]$ での接ベクトルは $\operatorname{Hom}(\mathbb C\Omega,H^3/\mathbb C\Omega)$ であり、実際、$\Omega_{\boldsymbol t}$ を $f(\boldsymbol t)\Omega_{\boldsymbol t}$ と枠変更して微分した追加項 $(df)_0\Omega$ は商で消える。

方向 $v\in T_0U$ での微分を $[\nabla_v^{\mathrm{GM}}\Omega_{\boldsymbol t}]_0$ の商類として表す。[横断性](../DEF1-13/index.md#thm-def1-13-griffiths)へ $k=3,p=3$ を代入すると $\nabla_v\Omega_{\boldsymbol t}\in F^2_0$ である。[周期写像の微分と収縮の命題](../DEF1-13/index.md#prop-def1-13-infinitesimal-period)へ $(p,q)=(3,0)$、$\mu_v$ を $\operatorname{KS}(v)$ のBeltrami代表として代入すれば

$$
d\mathcal Q_0(v)(\Omega)
=-\bigl[\mu_v\lrcorner\Omega\bigr]
\in F^2_0/F^3_0\simeq H^{2,1}(X_F).
$$

負号は既習の $\partial_{\bar z}+\mu\partial_z$ 規約による。[収縮による同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)は $\Omega$ が零にならないことから

$$
H^1(X_F,T_{X_F})\xrightarrow{\ \simeq\ }H^{2,1}(X_F),
\qquad[\mu]\longmapsto[\mu\lrcorner\Omega]
$$

を与える。これに仮定の $\operatorname{KS}:T_0U\simeq H^1(X_F,T_{X_F})$ を合成したものが $-d\mathcal Q_0(\,\cdot\,)(\Omega)$ なので、その核は零で像の次元は101。全Hodge旗から $F^3$ を取り出す射影の微分が単射との合成であるから、全旗の微分にも核はない。$\square$
<!-- proof-end -->

**使い道と限界。** この定理は、近傍の101個の座標方向が周期の**一次変動**で区別できるという局所Torelli型の主張である。異なる遠方のquinticが同じ周期を持たないとか、標識を忘れた大域的モジュライが射影空間へ埋め込まれるとは述べていない。自己同型やモノドロミーも別途扱う必要がある。

## 4. 正則3形式を方程式から書き、周期を微分する

前節の $\Omega$ を具体的に書こう。斉次座標で次の四次微分形式を作る。

$$
\varpi=\sum_{i=0}^4(-1)^iz_i\,
dz_0\wedge\cdots\wedge\widehat{dz_i}\wedge\cdots\wedge dz_4.
$$

記号 $\widehat{dz_i}$ はその因子を除くことを意味する。$z\mapsto\lambda z$ に対して $\varpi$ と $F$ はともに $\lambda^5$ 倍されるので、その比 $\varpi/F$ は射影空間上の有理4形式を表す。滑らかな $X_F$ の近くでは単純極を持つ。

ここでの**Poincaré留数**は、局所方程式 $f=0$ の近くで有理4形式 $\omega$ を

$$
\omega=\alpha\wedge\frac{df}{f}+\beta,
\qquad\operatorname{Res}_{X_F}\omega=\alpha|_{f=0}
$$

と表示して定める。$\alpha$ は正則3形式、$\beta$ は正則4形式である。つまり $df/f$ を**右端**へ置く符号規約であり、左端へ置く流儀とは3形式の次数による符号が異なる。

<a id="def-def1-14-residue-volume"></a>

<!-- formal-statement-start -->
> **定義（quinticの留数体積形式）**
>
> $F\in S_5$ が滑らかな $X_F=\{F=0\}\subset\mathbb P^4_{\mathbb C}$ を定めるとする。上記の $\varpi$ を用い、単純極のPoincaré留数で得る正則3形式を

$$
\Omega_F=\operatorname{Res}_{X_F}\frac{\varpi}{F}
\in H^0(X_F,K_{X_F})
$$

> と定める。$z_4=1$ のアフィンチャートで $x_j=z_j/z_4$（$0\le j\le3$）を座標とし、局所方程式を

$$
f(x_0,x_1,x_2,x_3)=F(x_0,x_1,x_2,x_3,1)
$$

> と書く。$\partial f/\partial x_3\ne0$ の領域では

$$
\Omega_F=\frac{dx_0\wedge dx_1\wedge dx_2}{\partial f/\partial x_3}
\bigg|_{f=0}
$$

> と表す。異なる滑らかな座標チャートでも留数は貼り合い、$X_F$ 上でどこでも零にならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-14-residue-volume -->
**座標表示の導出**。$z_4=1$ では $\varpi=dx_0\wedge dx_1\wedge dx_2\wedge dx_3$ となる。$\partial f/\partial x_3\ne0$ なら、$df=\sum_{j=0}^3(\partial f/\partial x_j)dx_j$ のうち $j=0,1,2$ の項は外積で消えるため、

$$
\frac{dx_0\wedge dx_1\wedge dx_2\wedge dx_3}{f}
=\frac{dx_0\wedge dx_1\wedge dx_2}{\partial f/\partial x_3}
\wedge\frac{df}{f}.
$$

従って右端留数の規約から定義中の局所式が出る。分母の非零条件は、陰関数定理によって $x_0,x_1,x_2$ を超曲面上の局所座標とできる条件でもある。

**定義の確認**。Fermatの $F_0$ に対し $z_4=1$、$x_0=1,x_1=x_2=0,x_3=\eta$、$\eta^5=-2$ となる点を選ぶ。$f=1+\eta^5+1=0$、$\partial f/\partial x_3=5\eta^4\ne0$ だから、陰関数定理で $x_0,x_1,x_2$ が $X_0$ の局所座標になり、

$$
\Omega_{F_0}=\frac{1}{5\eta^4}\,dx_0\wedge dx_1\wedge dx_2
$$

はこの点で零にならない。別の点でも滑らかさから少なくとも一つの局所偏微分が非零となるので、同じ方式で係数が非零の表示が存在する。分母の非零と局所座標の独立性を両方確かめることが、留数形式が体積形式になる根拠である。
<!-- definition-example-end -->

留数のパラメータ微分には注意が要る。以下 $\partial_t=\partial/\partial t$ は、斉次座標 $z_i$ と多項式 $F,G$ を固定し、変形パラメータ $t$ だけを微分する方向である。分母を微分すると**二重極**が現れる。これは単純極の場合の「$df/f$ の右端の係数」という局所定義をそのまま適用するものではない。ここでは有理形式のde Rhamコホモロジー類から $H^3(X_F)$ へ送る**コホモロジー的留数**を用い、二重極の式もその意味で読む。

<a id="prop-def1-14-residue-derivative"></a>

<!-- formal-statement-start -->
> **命題（正則体積形式の留数表示と一次微分）**
>
> $F,G\in S_5$ とし、$X_0=\{F=0\}$ が滑らか、$X_t=\{F+tG=0\}$ が $t=0$ 近傍で滑らかな固有正則族をなすとする。$\Omega_t=\operatorname{Res}_{X_t}(\varpi/(F+tG))$ を選ぶ。このとき[Gauss–Manin接続](../DEF1-12/index.md#def-def1-12-gauss-manin)による微分は、コホモロジー的留数として

$$
\nabla_{\partial_t}^{\mathrm{GM}}[\Omega_t]\big|_{t=0}
=-\operatorname{Res}_{X_0}\left[\frac{G\varpi}{F^2}\right].
$$

> さらに、この類を $F^2_0/F^3_0\simeq H^{2,1}(X_0)$ へ射影すると、族のKodaira–Spencer類 $\mu_G$ に対して $-[\mu_G\lrcorner\Omega_0]$ となる。特に $[G]\ne0$ が $S_5/J(F)_5$ に属するとき、その商への射影は非零である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ斉次座標上の有理4形式を微分するので、分母の連鎖律から $-G/F^2$ が出る。留数と平行移動した周期の積分が整合することを確かめた後、商への射影は前節の収縮式を適用する。

<!-- proof-start -->
### 証明

$t$ が小さければ分母の零集合の外で

$$
\frac{1}{F+tG}=\frac1F-t\frac{G}{F^2}+O(t^2)
$$

であり、係数を $t$ で微分した有理形式は $-G\varpi/F^2$ である。留数のde Rham的解釈では、局所的に平行移動した三次元サイクル $\gamma_t\subset X_t$ の周囲の小さい管 $T(\gamma_t)$ について、サイクルの向きの後に正向きの小円を並べる向きを採用すると

$$
\int_{\gamma_t}\Omega_t
=\frac{1}{2\pi i}\int_{T(\gamma_t)}\frac{\varpi}{F+tG}.
$$

管のホモロジー類を局所的に平行に選ぶと、[平行サイクル上の周期の微分](../DEF1-12/index.md#prop-def1-12-period)により左辺の微分は $\nabla^{\mathrm{GM}}[\Omega_t]$ の周期である。右辺を微分した値は $-G\varpi/F^2$ の周期であるから、de Rhamの周期による類の判別で第一式が成立する。この二重極の留数は**コホモロジー類**を表し、点ごとに値を持つ正則3形式という意味ではない。

次に[周期写像の微分・収縮公式](../DEF1-13/index.md#prop-def1-13-infinitesimal-period)に $(p,q)=(3,0)$ を適用する。射影した値は $-[\mu_G\lrcorner\Omega_0]$ となる。[法束列からの同型](../../CYG/CYG1-13/index.md#thm-cyg1-13-all-first-order)は $[G]\ne0$ を非零の一次変形へ送り、[収縮同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)はそれを非零の $H^{2,1}$ 類へ送る。よって射影は非零である。$\square$
<!-- proof-end -->

**具体例。** $F=F_0$、$G=z_0z_1z_2z_3z_4$ なら $G$ はどの $z_i^4$ でも割り切れず、Jacobian商で非零である。従って $-G\varpi/F_0^2$ のコホモロジー的留数の $(2,1)$ 成分も非零だ。ただし「どの閉路の周期も非零」「指定した一つの閉路の周期微分が必ず非零」は導かれない。少なくとも適切な**周期の比**が一次で変化する、というのが正しい帰結である。

## 5. 101方向に位相対称性を課すと一方向が残る

[Fermat型族の位相対称群](../../CYG/CYG1-14/index.md#prop-cyg1-14-phase-group)は、五乗して1になる複素数の群 $\mu_5$ を使って

$$
\Gamma=\{(\zeta_0,\ldots,\zeta_4)\in\mu_5^5:
\zeta_0\cdots\zeta_4=1\}/\mu_5^{\mathrm{diag}},
\qquad|\Gamma|=125
$$

と書ける。$\Gamma$ は $F_0$ を保ち、座標を $z_i\mapsto\zeta_i z_i$ と変える。$J(F_0)=(z_0^4,\ldots,z_4^4)$ も保つため、$\Gamma$ はJacobian商 $R_5=S_5/J(F_0)_5$ に線形作用する。ここで**不変**とは、群のどの射影座標の取り替えによっても同じ一次変形類に戻ることである。

<a id="def-def1-14-invariant-direction"></a>

<!-- formal-statement-start -->
> **定義（位相対称群不変な一次変形方向）**
>
> $F_0=\sum_{i=0}^4z_i^5$ とし、上の位相対称群 $\Gamma$ を $R_5=S_5/J(F_0)_5$ に作用させる。任意の $\gamma\in\Gamma$ に対して $\gamma\cdot[G]=[G]$ を満たす類 $[G]\in R_5$ を**位相対称群不変な一次変形方向**と呼び、その全体を

$$
R_5^\Gamma=\{[G]\in R_5:\gamma\cdot[G]=[G]
\text{ for every }\gamma\in\Gamma\}
$$

> と書く。これは $R_5$ の複素線形部分空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-14-invariant-direction -->
**定義の確認**。 $P=z_0z_1z_2z_3z_4$ は $J(F_0)_5$ に入らず非零である。任意の $\gamma$ で $\gamma P=(\prod_i\zeta_i)P=P$ だから $[P]$ は不変である。一方 $M=z_0^3z_1^2$ も非零類だが、原始五乗根 $\zeta$ を使う $\gamma=(\zeta,1,1,1,\zeta^{-1})$ により $\gamma M=\zeta^3M\ne M$ となる。すなわち $[M]$ は不変でない。非零性と不変性は別々の条件である。
<!-- definition-example-end -->

<a id="prop-def1-14-single-invariant"></a>

<!-- formal-statement-start -->
> **命題（Fermat quintic の不変一次方向）**
>
> 滑らかなFermat五次超曲面 $X_0=\{\sum z_i^5=0\}$ と上の群 $\Gamma$ に対し、

$$
R_5^\Gamma=\mathbb C[z_0z_1z_2z_3z_4],
\qquad\dim_{\mathbb C}R_5^\Gamma=1.
$$

> この一方向の実際の滑らかな変形族の一つは、$\psi$ を0の近くで動かす

$$
X_\psi:\quad \sum_{i=0}^4z_i^5-5\psi z_0z_1z_2z_3z_4=0
$$

> である。$\psi^5\ne1$ なら $X_\psi$ は滑らかである。
<!-- formal-statement-end -->

### 証明の見取り図

Jacobian商の単項式基底は指数 $0,1,2,3$ だけでできる。二つの座標へ互いに逆の五乗根を掛ける作用をすべて調べると、不変な単項式の指数は五つとも等しくなる。総次数5ならすべて1しかない。

<!-- proof-start -->
### 証明

$R_5$ の基底は $z^a=z_0^{a_0}\cdots z_4^{a_4}$（$0\le a_i\le3$、$\sum_i a_i=5$）である。各単項式は $\Gamma$ の作用でスカラー倍され、異なる単項式が混ざることはない。

異なる添字 $i,j$ に対し、$i$ 成分を原始五乗根 $\zeta$、$j$ 成分を $\zeta^{-1}$、ほかを1とする群元 $\gamma_{ij}$ が存在する。その作用は

$$
\gamma_{ij}\cdot z^a=\zeta^{a_i-a_j}z^a
$$

である。

したがって $z^a$ がすべての元で不変なら、全ての組で $a_i-a_j\equiv0\pmod5$ が成り立つ。指数が0以上3以下なので差は $-3$ から3の間にあり、5の倍数となる差は0だけである。よって

$$
a_0=a_1=a_2=a_3=a_4=a,
\qquad5a=\sum_{i=0}^4a_i=5,
\qquad a=1.
$$

候補は $P=\prod_i z_i$ だけである。

$P$ は各 $\gamma$ で $\prod_i\zeta_i=1$ のため実際に不変である。各単項式が独立な固有ベクトルなので、これ以外の非不変単項式を線形結合して不変ベクトルを新たに作ることもできない。従って $R_5^\Gamma=\mathbb C[P]$。

族の滑らかさも確認する。偏微分は

$$
\frac{\partial F_\psi}{\partial z_i}
=5z_i^4-5\psi\prod_{j\ne i}z_j
$$

である。これらが全て零となる射影点で、どれかの座標が零なら、残る偏微分からほかの座標も全て零となってしまう。全座標が非零なら五式を掛けて

$$
\prod_i z_i^4
=\psi^5\prod_i\prod_{j\ne i}z_j
=\psi^5\prod_i z_i^4
$$

を得る。積が非零だから $\psi^5=1$ が必要である。逆に $\psi^5=1$ なら射影点 $[\psi^{-1}:1:1:1:1]$ で全偏微分が零になる。[Euler恒等式](../../../代数系/AG/AG2-11/index.md#prop-ag2-11-euler-gradient)によってその点は $F_\psi=0$ も満たす。よって[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)から、滑らかさは $\psi^5\ne1$ と同値である。$\square$
<!-- proof-end -->

この一方向は、元のquinticにおける101個の一次複素構造変形のうち、**指定した対称群を保つ方向**である。群の位数125を101から引いたわけではない。101次元の線形表現の**不変部分空間**を計算したのである。

## 6. mirror symmetry へ渡せること、まだ渡せないこと

元の滑らかなquinticは $(h^{1,1},h^{2,1})=(1,101)$ を持つ。古典的なmirror候補には、上の $\Gamma$ による $X_\psi/\Gamma$ の商と、その特異点の**crepant解消**（標準束を保つ種類の特異点解消）が現れる。[既習の位相群の命題](../../CYG/CYG1-14/index.md#prop-cyg1-14-phase-group)と[Hodge数交換の数値条件](../../CYG/CYG1-14/index.md#prop-cyg1-14-mirror-euler)は、鏡像候補のHodge数 $(101,1)$ とEuler標数 $+200$ という見通しを与える。

しかし $R_5^\Gamma$ が一次元であるだけでは、商の滑らかさも、解消の存在も、解消後のHodge数も証明できない。群作用には固定点があり得るため、商をそのまま滑らかなCalabi–Yauと呼んではいけない。解消で増える $(1,1)$ 類の数も別途計算が要る。

本章で**実際に証明した接続**は次の通りである。

1. すべての一次多項式方向 $R_5$ は101次元で、$H^1(T_X)\simeq H^{2,1}(X)$ と同一視できる。
2. [局所周期の単射微分](#thm-def1-14-local-period)は、101方向を $F^3$ の一次の動きとして検出する。
3. そのうち位相対称群を保つ部分は一方向 $[P]$ で、$\psi$ 族の[留数微分](#prop-def1-14-residue-derivative)は非零の $(2,1)$ 成分を持つ。

周期積分のPicard–Fuchs方程式、商のcrepant解消とHodge数、曲線の数え上げとの対応は後続のmirror symmetryで学ぶ内容である。**一パラメータの周期変動を得たことと、mirror対称性を証明したことは別**だと区別しておこう。

## 7. 演習

<a id="ex-def1-14-a01"></a>
### 演習 A1：五次単項式とJacobianの基底

- Level: A

$F_0=\sum_{i=0}^4z_i^5$ とする。$\dim S_5$、$\dim J(F_0)_5$、$\dim S_5/J(F_0)_5$ を求めよ。最後の引き算で同じ単項式を二回引いていないことも示せ。

<!-- solution-start -->
**詳細解答**

次数5の指数列は $a_0+\cdots+a_4=5$ の非負整数解であり、仕切り4本の位置を9箇所から選ぶので

$$
\dim S_5=\binom94=126.
$$

$J(F_0)_5$ は $z_i^4z_j$（$0\le i,j\le4$）の張る空間である。$i=j$ では純五次 $z_i^5$、$i\ne j$ では指数4の変数と指数1の変数から組 $(i,j)$ を復元できる。二変数がともに指数4以上なら総次数が8以上となり、次数5には現れない。従って25個は相異なる単項式で線形独立だから

$$
\dim J(F_0)_5=25,
\qquad\dim\bigl(S_5/J(F_0)_5\bigr)=126-25=101.
$$
<!-- solution-end -->

<a id="ex-def1-14-a02"></a>
### 演習 A2：Euler列に入れる三つの数

- Level: A

滑らかなquintic $X$ について $h^0(\mathcal O_X)$、$h^0(\mathcal O_X(1))$、$h^0(\mathcal O_X(5))$ を求め、最後の数で126から1を引く理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$m=0,1,5$ の[制限列](#ref-def1-14-restriction-sequence)を使う。[ねじり層コホモロジー](../../../代数系/AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から中間コホモロジーが零で、負のねじりの零次群も消える。$m=0$ の列では $H^0(\mathcal O(-5))=H^1(\mathcal O(-5))=0$、$m=1$ の列では $H^0(\mathcal O(-4))=H^1(\mathcal O(-4))=0$ を使うため、

$$
h^0(\mathcal O_X)=1,\qquad h^0(\mathcal O_X(1))=5.
$$

$m=5$ の列では $H^0(\mathbb P^4,\mathcal O)=\mathbb C$ が $F$ を掛けて $S_5$ に入り、$H^1(\mathbb P^4,\mathcal O)=0$ なので

$$
H^0(X,\mathcal O_X(5))\simeq S_5/\mathbb CF,
\qquad h^0(\mathcal O_X(5))=126-1=125.
$$

差し引く1は、方程式のスカラー倍が零集合を変えないという方向である。
<!-- solution-end -->

<a id="ex-def1-14-a03"></a>
### 演習 A3：消える方向と残る方向

- Level: A

FermatのJacobian商で、$z_0^4z_1$ と $z_0^2z_1^2z_2$ の二つの次数5単項式が零類か非零類かを判定せよ。

<!-- solution-start -->
**詳細解答**

$\partial_0F_0=5z_0^4$ なので $z_0^4z_1=(z_1/5)\partial_0F_0\in J(F_0)_5$ となり零類である。一方 $z_0^2z_1^2z_2$ の指数列は $(2,2,1,0,0)$。どの指数も4未満なので $J(F_0)_5$ を張る $z_i^4z_j$ のどれとも一致せず、独立な単項式基底の非零類となる。一次係数を動かすことと、非自明な複素変形を得ることは同値ではない。
<!-- solution-end -->

<a id="ex-def1-14-a04"></a>
### 演習 A4：周期写像の行き先の次元

- Level: A

滑らかなquinticの $H^3$ の複素次元、$F^3$ と $F^2$ の次元、$F^2/F^3$ の次元を求め、局所周期写像が一次で検出する変形方向の数と比較せよ。

<!-- solution-start -->
**詳細解答**

[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と共役対称性から $(h^{3,0},h^{2,1},h^{1,2},h^{0,3})=(1,101,101,1)$ であり、$\dim H^3=1+101+101+1=204$。$F^3=H^{3,0}$ は一次元、$F^2=H^{3,0}\oplus H^{2,1}$ は102次元、その商は101次元。[単射微分の定理](#thm-def1-14-local-period)は $T_0U$ の101方向をこの101次元の商へ同型に写す。射影空間全体の203次元を「変形が203方向ある」と誤読してはいけない。
<!-- solution-end -->

<a id="ex-def1-14-a05"></a>
### 演習 A5：二つの単項式に群を作用させる

- Level: A

$P=\prod_i z_i$、$M=z_0^3z_1^2$ とし、$\zeta^5=1$ かつ $\zeta\ne1$ とする。$\gamma=(\zeta,1,1,1,\zeta^{-1})$ の作用と、任意の $\Gamma$ の元の作用を使って、どちらの類が$\Gamma$-不変か判定せよ。

<!-- solution-start -->
**詳細解答**

$\gamma P=(\zeta\cdot\zeta^{-1})P=P$ であり、任意の群元でも $\gamma'P=(\prod_i\zeta_i')P=P$。$P$ の各指数は1だからJacobian商で非零で、$[P]$ は定義の全称条件を満たす。一方 $\gamma M=\zeta^3M$ である。五乗根の位数は素数5なので、$\zeta\ne1$ なら $\zeta^3\ne1$。$M$ も指数が4未満で非零類だから $[\gamma M]\ne[M]$ となり、$[M]$ は不変でない。たった一つの反例群元で不変性を否定できる。
<!-- solution-end -->

<a id="ex-def1-14-b01"></a>
### 演習 B1：法束列から101を最後まで導く

- Level: B

滑らかな五次超曲面 $X\subset\mathbb P^4$ の法束列と接Euler列から、$H^1(X,T_{\mathbb P^4}|_X)=0$、$H^0(X,T_X)=0$ を示し、$H^1(X,T_X)$ の次元を求めよ。

<!-- solution-start -->
**詳細解答**

[ねじり層コホモロジー](../../../代数系/AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)と制限列の長完全列から、$H^1(X,\mathcal O_X(1))=0$、$H^2(X,\mathcal O_X)=0$。接Euler列に長完全列を適用すると

$$
0=H^1(\mathcal O_X(1))^{\oplus5}
\longrightarrow H^1(T_{\mathbb P^4}|_X)
\longrightarrow H^2(\mathcal O_X)=0
$$

なので中項は零。$K_X$ は自明で零にならない正則体積形式があり、[収縮束同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-isomorphism)から $H^0(T_X)\simeq H^0(\Omega_X^2)$。また $h^{2,0}=0$ だから $H^0(T_X)=0$。

接Euler列の $H^0$ の部分から

$$
h^0(T_{\mathbb P^4}|_X)
=5h^0(\mathcal O_X(1))-h^0(\mathcal O_X)
=25-1=24.
$$

法束列では上の二つの零消滅により短完全列

$$
0\longrightarrow\mathbb C^{24}\longrightarrow
H^0(X,\mathcal O_X(5))\longrightarrow
H^1(X,T_X)\longrightarrow0
$$

を得る。$H^0(\mathcal O_X(5))\simeq S_5/\mathbb CF$ は125次元なので、結論は $125-24=101$。この計算では法束列の右端全射を保証する滑らかさが不可欠である。
<!-- solution-end -->

<a id="ex-def1-14-b02"></a>
### 演習 B2：見かけの係数変化の周期はどうなるか

- Level: B

$F_0=\sum_i z_i^5$、$G=z_0^4z_1$ とする。$z_0\mapsto z_0+(t/5)z_1$ という一次座標変更を使い、$F_0+tG$ のKodaira–Spencer類とHodge直線の周期写像の一次微分を求めよ。$\Omega_t$ 自体の微分が必ず零だと結論してよいか。

<!-- solution-start -->
**詳細解答**

連鎖律で

$$
F_0(z_0+(t/5)z_1,z_1,\ldots)
=F_0(z)+t\frac{z_1}{5}\partial_0F_0+O(t^2)
=F_0(z)+t z_0^4z_1+O(t^2).
$$

ここで $A$ は $(0,1)$ 成分が $1/5$、それ以外が0の $5\times5$ 行列、$I$ は同じサイズの単位行列である。この座標変更は $I+tA$ で表され、$A^2=0$ だから逆行列は厳密に $I-tA$ である。従ってこの一次方向は可逆な座標の再表示で消える。実際、

$$
G=(z_1/5)\partial_0F_0\in J(F_0)_5
$$

だから[全一次変形同型](../../CYG/CYG1-13/index.md#thm-cyg1-13-all-first-order)によってKodaira–Spencer類は零となる。[周期写像の微分公式](../DEF1-13/index.md#prop-def1-13-infinitesimal-period)の収縮類も零で、Hodge直線の一次微分は零である。

ただし $f(0)=1$ の零点のない正則関数で枠を $\Omega_t$ から $f(t)\Omega_t$ へ変えると、Leibniz則により

$$
\nabla_{\partial_t}^{\mathrm{GM}}(f\Omega_t)\big|_0
=\nabla_{\partial_t}^{\mathrm{GM}}\Omega_t\big|_0
+f'(0)\Omega_0.
$$

零と確定できるのは **$H^3/F^3$ の商での値**である。$\nabla\Omega_t$ そのものを零と断言してはならない。
<!-- solution-end -->

<a id="ex-def1-14-b03"></a>
### 演習 B3：位相対称群の不変部分空間を再導出する

- Level: B

$R_5$ の単項式基底を用い、$\Gamma$ が固定する部分空間の次元を最初から求めよ。群の位数125と無関係に説明せよ。

<!-- solution-start -->
**詳細解答**

$R_5$ の単項式基底指数は、次の二条件を満たす。

$$
\sum_i a_i=5,\qquad 0\le a_i\le3.
$$

$i,j$ 成分だけを原始五乗根 $\zeta,\zeta^{-1}$ で変える群元は、その単項式を $\zeta^{a_i-a_j}$ 倍する。全元で固定されるには $a_i\equiv a_j\pmod5$ が必要である。指数の差の絶対値は3以下だから、この合同条件は $a_i=a_j$ を意味する。

五つの指数がともに $a$ なら $5a=5$、すなわち $a=1$。$P=z_0z_1z_2z_3z_4$ は群元の五成分の積が1という条件から実際に固定される。各単項式の作用は対角的だから、固有値1でない基底ベクトルの和で不変方向を増やすことはできない。

従って $R_5^\Gamma=\mathbb C[P]$ は一次元。群の位数125は、不変部分空間の次元を引き算で与える数字ではない。
<!-- solution-end -->

<a id="ex-def1-14-b04"></a>
### 演習 B4：少なくとも一つの周期比が動く理由

- Level: B

滑らかなquinticの局所族で $\operatorname{KS}(v)\ne0$ とする。平坦な閉路の基底 $\gamma_0,\ldots,\gamma_{203}$ を選び、$\Pi_j(t)=\int_{\gamma_j(t)}\Omega_t$ と書く。$\Pi_0(0)\ne0$ とできる理由を述べ、すべての比 $\Pi_j/\Pi_0$ の $v$ 方向微分が零だと仮定して矛盾を導け。

<!-- solution-start -->
**詳細解答**

$\Omega_0$ は非零のde Rham類なので、周期が全て零ならde Rhamの周期対合の非退化性に反する。従って閉路を並べ替えて $\Pi_0(0)\ne0$ とできる。比の微分は商の微分則から

$$
v\left(\frac{\Pi_j}{\Pi_0}\right)\Big|_0
=\frac{(v\Pi_j)(0)\Pi_0(0)-\Pi_j(0)(v\Pi_0)(0)}
{\Pi_0(0)^2}.
$$

これが全て零なら、$c=(v\Pi_0)(0)/\Pi_0(0)$ と置いて $(v\Pi_j)(0)=c\Pi_j(0)$ が全ての $j$ で成立する。[平行サイクル上の周期の微分](../DEF1-12/index.md#prop-def1-12-period)によって、$\nabla_v[\Omega_t]_0-c[\Omega_0]$ の全周期が零となり、de Rham類も零。すると $F^2/F^3$ への射影は零である。しかし[局所周期の単射微分](#thm-def1-14-local-period)は $\operatorname{KS}(v)\ne0$ に対して射影が非零と述べる。矛盾。従って少なくとも一つの**正規化した周期比**の微分は非零となる。
<!-- solution-end -->

<a id="ex-def1-14-c01"></a>
### 演習 C1：101方向から一パラメータの周期変動へ

- Level: C

$$
F_\psi=\sum_{i=0}^4z_i^5-5\psi P,\qquad
P=z_0z_1z_2z_3z_4
$$

とし、$\Gamma$ は本章の位相対称群とする。

1. $\psi=0$ の近くで $X_\psi$ が滑らかであることを偏微分と射影点の条件から確かめよ。
2. 全一次複素変形が101次元である理由を法束列に沿って再構成し、$\partial_\psi|_0$ がその中の非零の一方向であることを示せ。
3. その方向が $\Gamma$-不変であること、局所周期のHodge直線を一次で動かすことを示し、留数微分を式で書け。
4. これだけで商 $X_\psi/\Gamma$ が滑らかでHodge数 $(101,1)$ のmirrorだと証明できるか。欠けている検証を挙げよ。

<!-- solution-start -->
**詳細解答**

**(1)** $\partial_iF_\psi=5z_i^4-5\psi\prod_{j\ne i}z_j$。どれかの $z_i$ が零なら、その成分以外の式から残りも零になり射影点に反する。全成分が非零なら全偏微分の等式を掛けて $\psi^5=1$。従って $|\psi|<1$ では同時零の射影点がなく、[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)で滑らかである。

**(2)** $\dim S_5=126$。$H^0(\mathcal O_X(5))\simeq S_5/\mathbb CF$ で125、Euler列から $h^0(T_{\mathbb P^4}|_X)=24$、$h^1(T_{\mathbb P^4}|_X)=0$、体積形式から $h^0(T_X)=0$。法束列の連結写像により $H^1(T_X)$ は101次元。[多項式一次方向と全変形の同型](../../CYG/CYG1-13/index.md#thm-cyg1-13-all-first-order)を使えば $\partial_\psi|_0$ は $[-5P]\in R_5$ に対応し、$P$ はどの $z_i^4$ でも割り切れないので非零である。

**(3)** $\gamma P=(\prod_i\zeta_i)P=P$、よって $[-5P]\in R_5^\Gamma$。[Fermat quintic の不変一次方向](#prop-def1-14-single-invariant)から、この方向が不変部分を生成する。[収縮同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)で $\operatorname{KS}(\partial_\psi)\lrcorner\Omega_0\ne0$、[周期微分式](../DEF1-13/index.md#prop-def1-13-infinitesimal-period)で $d\mathcal Q_0(\partial_\psi)\ne0$。留数の微分は、$G=-5P$ と[留数微分命題](#prop-def1-14-residue-derivative)に代入して

$$
\nabla_{\partial_\psi}[\Omega_\psi]\big|_{\psi=0}
=5\operatorname{Res}_{X_0}\left[\frac{P\varpi}{F_0^2}\right].
$$

この式の $(2,1)$ 成分は非零だが、任意の固定した閉路で積分が非零とは言えない。

**(4)** いいえ。不変方向が一次元でも、群作用の固定点があれば商は特異になり得る。少なくとも商特異点の記述、crepant解消の存在、解消後のHodge数の計算が必要である。mirror symmetryの本格的な主張にはさらに周期のPicard–Fuchs方程式や曲線数との比較が要る。数値 $(101,1)$ は[既習のmirrorの数値的見通し](../../CYG/CYG1-14/index.md#prop-cyg1-14-mirror-euler)と整合するが、この演習だけで構成・存在・対応を証明したことにはならない。
<!-- solution-end -->

## 8. DEF1系列で到達した地点

DEF1-01〜05では一次変形と障害の言語を、06〜08ではKuranishi基底の構成と局所完全性を、09〜11ではBTTとCalabi–Yauの滑らかな局所座標を、12〜13ではGauss–Manin接続と周期写像を得た。本章はquinticの101方向をその全部へ通し、さらに対称群の一方向を具体的に取り出した。

次に学ぶmirror symmetryでは、対称なquinticの周期方程式、商の解消、複素構造と複素化Kählerパラメータの交換を別々に検証する。ここまでで得た「101方向の局所変形」と「そのうちの対称な一方向」は、その二つを混同せず進むための出発点となる。
