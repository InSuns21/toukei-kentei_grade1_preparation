# KAH1-16 ホロノミーと総合演習

<!-- definition-example-audit: strict -->

## 1. 曲率を知ったあと、閉路を一周すると何が残るか

[Kähler条件の接続による同値性](../KAH1-03/index.md#thm-kah1-03-main-equivalence)によって、Kähler計量のLevi–Civita接続は実計量 $g$ と複素構造 $J$ の両方を平行に保つ。前章では[Ricci平坦性](../KAH1-15/index.md#def-kah1-15-ricci-flat)を $\rho=0$ と記述した。それでは、接ベクトルを閉じた曲線に沿って一周させ、出発点へ戻したとき、どこまで元のベクトルに戻るだろうか。

平行移動は長さを保つが、一般に向きを回転させる。しかも局所的な曲率が零でも、穴を一周したあとの回転は残りうる。この**局所の曲率と大域の閉路の違い**を読み取るのが本章の中心課題である。

$X$ は複素次元 $n\ge1$ の滑らかなKähler多様体とし、必要な場面では連結性・単連結性を追加する。[基本形式](../KAH1-01/index.md#def-kah1-01-fundamental-form)は $\omega(U,V)=g(JU,V)$、正則座標で

$$
\omega=i g_{j\bar k}\,dz^j\wedge d\bar z^k,\qquad
\rho=-i\partial\bar\partial\log\det(g_{j\bar k})
$$

と規格化する。接続の曲率や第一Chern類の符号はこの規約から導く。Levi–Civita接続を $\nabla$ と書き、その複素化の $T^{1,0}X$ への制限を $D$ とする。

## 2. 閉路の平行移動を群として集める

区分的に滑らかな曲線 $\gamma:[0,1]\to X$ に沿うベクトル場 $V(t)$ が平行とは、$\nabla_{\dot\gamma(t)}V(t)=0$ を満たすことだった。各区間での線形常微分方程式は初期値 $V(0)$ から $V(1)$ を一意に決める。そこで

$$
P_\gamma:T_{\gamma(0)}X\longrightarrow T_{\gamma(1)}X,\qquad
P_\gamma(V(0))=V(1)
$$

という線形写像を得る。逆向きの曲線では $P_{\gamma^{-1}}=P_\gamma^{-1}$ となる。二本の曲線を順につなぐと平行移動は写像の合成になるから、出発点と終点が同じ閉路に着目する意味がある。

<a id="def-kah1-16-holonomy"></a>

<!-- formal-statement-start -->
> **定義（ホロノミー群）**  
> $(X,g)$ を滑らかなRiemann多様体、$\nabla$ をそのLevi–Civita接続、$x\in X$ を基点とする。$x$ を出発・終点とする区分的に滑らかな閉路 $\gamma$ の平行移動をすべて集めた
>
$$
\operatorname{Hol}_x(g)=\{P_\gamma:\gamma(0)=\gamma(1)=x\}
$$
>
> を $x$ におけるホロノミー群という。これは $T_xX$ の可逆線形変換の[部分群](../../../代数系/GRP/GRP1/index.md#def-grp1-subgroup)である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-16-holonomy -->
**定義の確認**（平坦な複素空間）。 $\mathbb C^n$ の正定値定数係数計量を取り、実座標の一定枠で平行移動方程式を書く。すべてのChristoffel記号が零だから $dV^a/dt=0$、すなわち $V^a(t)=V^a(0)$ である。閉路なら始点と終点の座標枠も同じなので $P_\gamma=I$。恒等変換の集合 $\{I\}$ は合成・逆元で閉じるから、定義した群は実際に $\operatorname{Hol}_x(g)=\{I\}$ である。
<!-- definition-example-end -->

この定義だけでは、閉路が一つの点へ連続的に縮む場合と、穴を取り囲んで縮まない場合が混在する。そこで**縮められる閉路だけ**を取り出す。[単連結性の定義](../../GEO/GEO18/index.md#def-geo18-simply-connected)と同じく、閉路を基点 $x$ に固定したまま定数閉路へ連続変形できることを「基点を保って零ホモトピック」という。滑らかな多様体上では、以下の曲率の議論に必要な閉路は滑らかな円板で張れるものとして考え、一般の区分的に滑らかな零ホモトピック閉路は滑らかな近似で扱える。

<a id="def-kah1-16-restricted"></a>

<!-- formal-statement-start -->
> **定義（制限ホロノミー群）**  
> 上記の $(X,g)$ と $x\in X$ に対し、$x$ を基点とし零ホモトピックな区分的に滑らかな閉路による平行移動の集合
>
$$
\operatorname{Hol}_x^0(g)=\{P_\gamma:\gamma\text{ は基点を保って零ホモトピックな閉路}\}
$$
>
> を制限ホロノミー群という。この群は、全閉路によるホロノミー群の中で零ホモトピックな閉路に由来する変換だけを集めたものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-16-restricted -->
**定義の確認**（平坦なトーラス）。 [平坦な複素トーラス](../KAH1-10/index.md#prop-kah1-10-flat-torus) $T=\mathbb C^n/\Lambda$ では、閉路を被覆空間へ持ち上げると、その始点と終点は格子ベクトルだけずれる。しかし格子の作用は平行移動であり、その微分は $I$ である。定数係数枠での平行移動も $I$ なので、どの閉路にも $P_\gamma=I$。特に縮められる閉路の集合から得る $\operatorname{Hol}_x^0(g)=\{I\}$ が成り立ち、$\operatorname{Hol}_x^0(g)\subseteq\operatorname{Hol}_x(g)$ の両方を直接確かめた。
<!-- definition-example-end -->

次の点も定義から検算できる。二つの零ホモトピック閉路を連結しても零ホモトピックであり、逆向きの閉路も同様である。従って制限ホロノミーも群である。基点を結ぶ曲線に沿って平行移動すれば、異なる基点のホロノミー群は共役で結ばれる。以下の群包含の議論は、基点が変わっても同じ意味を持つ。

## 3. Kähler計量の平行移動は必ずユニタリになる

複素構造 $J$ を保つ線形変換は複素線形であり、計量を保つ線形変換は直交変換である。両方を満たす変換は、複素次元 $n$ のHermite空間のユニタリ群 $U(n)$ に属する。ここで[ユニタリ群と特殊ユニタリ群](../../../代数系/LIE/LIE3/index.md#def-lie3-unitary-groups)の $U(n)$ は正規直交複素基底で行列 $A^*A=I$ を満たす行列の群であり、$SU(n)$ はさらに $\det_{\mathbb C}A=1$ を満たす部分群である。群の行列表示は選んだ正規直交基底に依存するが、この二つの条件は依存しない。

<a id="thm-kah1-16-unitary"></a>

<!-- formal-statement-start -->
> **定理（Kählerホロノミーのユニタリ性）**  
> $(X,g,J,\omega)$ を複素次元 $n\ge1$ のKähler多様体とし、$x\in X$ を任意に取る。$J_x$ で複素ベクトル空間とみなした $T_xX$ に $g_x$ からHermite内積を入れる。このとき
>
$$
\operatorname{Hol}_x(g)\subseteq U(n)
$$
>
> が、ユニタリ基底を選んだ行列表示で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

長さと角度の保存には $\nabla g=0$ を、複素線形性には $\nabla J=0$ を別々に使う。どちらも[Kähler接続の同値判定](../KAH1-03/index.md#thm-kah1-03-main-equivalence)から得られる。

<!-- proof-start -->
### 証明

曲線 $\gamma$ に沿う初期ベクトル $u,v$ の平行延長を $U(t),V(t)$ とする。計量両立性と平行方程式から

$$
\frac{d}{dt}g(U,V)
=g(\nabla_{\dot\gamma}U,V)+g(U,\nabla_{\dot\gamma}V)=0.
$$

従って $g(P_\gamma u,P_\gamma v)=g(u,v)$。次に $U$ が平行なら

$$
\nabla_{\dot\gamma}(JU)
=(\nabla_{\dot\gamma}J)U+J\nabla_{\dot\gamma}U=0+0=0.
$$

$JU$ は初期値 $Ju$ の平行延長であり、一意性によって $P_\gamma(Ju)=J(P_\gamma u)$。従って平行移動は $J$ と可換な実等長変換である。

実ベクトル空間の複素数倍を $(a+ib)u=au+bJu$ と定めれば、$J$ との可換性より $P_\gamma((a+ib)u)=(a+ib)P_\gamma u$。また $h(u,v)=g(u,v)+i\,g(Ju,v)$ は $J,g$ によるHermite内積（第一変数・第二変数の線形規約を必要なら共役して同値に扱う）である。双方の保存より $h(P_\gamma u,P_\gamma v)=h(u,v)$。閉路の平行移動は $T_xX$ 上のユニタリ変換であり、全閉路について成立する。$\square$
<!-- proof-end -->

**一つ注意。** $U(n)$ に属する行列は必ず絶対値1の複素行列式を持つが、その値が必ず $1$ とは限らない。$SU(n)$ へ絞るには、行列式の平行移動を追加で調べる必要がある。

## 4. 接束の行列式とRicci形式

正則接束 $E=T^{1,0}X$ の最高外冪 $L=\det E$ を考える。この線束は[標準束と反標準束の定義](../KAH1-12/index.md#def-kah1-12-canonical)に従う $K_X^{-1}$ である。接束のChern接続 $D$ はKähler条件下でLevi–Civita接続と一致するので、$L$ にも誘導接続を与える。正則枠 $e_1,\ldots,e_n$ に沿い $De_j=\sum_k e_k A^k{}_j$ と書くと、

$$
D(e_1\wedge\cdots\wedge e_n)
=\sum_{j=1}^n e_1\wedge\cdots\wedge(De_j)\wedge\cdots\wedge e_n
=(\operatorname{tr}A)(e_1\wedge\cdots\wedge e_n).
$$

途中の $k\ne j$ の項は同じ基底ベクトルが二度現れるため消える。従って[接続の局所表示](../../CM/CM2-10/index.md#def-cm2-10-connection)での係数1形式は $\operatorname{tr}A$ となる。[接束の行列式接続](../KAH1-12/index.md#prop-kah1-12-determinant-curvature)は、その曲率を

$$
F_L=\bar\partial\partial\log\det G
=-\partial\bar\partial\log\det G
=-i\rho
$$

と与える。最後の等号は $\rho=-i\partial\bar\partial\log\det G$ をそのまま代入して検算した。よってRicci形式は、**行列式線束の接続に残る曲率**を測る。

<a id="prop-kah1-16-determinant-transport"></a>

<!-- formal-statement-start -->
> **命題（行列式表現と曲率）**  
> 複素次元 $n\ge1$ のKähler多様体 $X$ とそのLevi–Civita接続を考える。閉路 $\gamma$ による $T_x^{1,0}X$ 上の平行移動の複素行列式は、$L=\det T^{1,0}X$ の誘導接続による $\gamma$ に沿った平行移動の係数に等しい。$L$ の曲率は
>
$$
F_L=-i\rho
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

平行な $n$ 本のベクトルの外積は誘導接続に関して平行になる。その終値は平行移動行列の行列式倍となる。曲率の等式は上の局所式から符号を確かめる。

<!-- proof-start -->
### 証明

$u_1,\ldots,u_n$ を $T_x^{1,0}X$ の基底とし、それぞれの平行延長を $U_j(t)$ とする。誘導接続の積の規則から

$$
D_{\dot\gamma}(U_1\wedge\cdots\wedge U_n)
=\sum_{j=1}^n U_1\wedge\cdots\wedge D_{\dot\gamma}U_j\wedge\cdots\wedge U_n=0.
$$

閉路の終点で $U_j(1)=\sum_k u_k P^k{}_j$ と書けば、多重線形性と交代性から

$$
U_1(1)\wedge\cdots\wedge U_n(1)
=\det(P^k{}_j)\,u_1\wedge\cdots\wedge u_n.
$$

これは $L_x$ での平行移動係数にほかならない。曲率については[接束の行列式接続と曲率](../KAH1-12/index.md#prop-kah1-12-determinant-curvature)から $F_L=\bar\partial\partial\log\det G$。$\partial\bar\partial=-\bar\partial\partial$ および $\rho=-i\partial\bar\partial\log\det G$ を用いると $F_L=-i\rho$。$\square$
<!-- proof-end -->

例えば平坦トーラスでは $G$ が定数行列なので $F_L=0$。しかし $F_L=0$ が分かっても、**縮まない閉路の平行移動**についてはまだ結論していない。次節でこの量化の違いを埋める。

## 5. 曲率零が保証するのは制限ホロノミーである

曲線 $\gamma$ が滑らかな円板 $f:D^2\to X$ の境界なら、線束 $f^*L$ は円板上で自明化できる。単位長の枠を選び、その接続を $d+a$ と書けば、ユニタリ性から $a$ は純虚数値1形式である。階数1なので曲率は $da=f^*F_L$ となる。平行切断の係数 $c(t)$ は $\dot c+a(\dot\gamma)c=0$ を満たすから

$$
\frac{c(1)}{c(0)}
=\exp\left(-\int_{\partial D^2}a\right)
=\exp\left(-\int_{D^2}da\right)
=\exp\left(i\int_{D^2}f^*\rho\right).
$$

中央の等号にはStokesの定理を使った。上式は、単位円板内の枠の選び方には依存しない。反時計回りを境界向きとしたときの符号である。

<a id="thm-kah1-16-su-restricted"></a>

<!-- formal-statement-start -->
> **定理（Ricci平坦性と制限ホロノミー）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の連結Kähler多様体とし、$g$ を対応するRiemann計量とする。次の二条件は同値である。
>
> 1. $g$ のRicci形式が $\rho=0$ である。
> 2. ある（従って任意の）基点 $x$ で、ユニタリ基底に関して $\operatorname{Hol}_x^0(g)\subseteq SU(n)$ が成立する。
>
> 特に $X$ が単連結で $\rho=0$ なら、全ホロノミーも $\operatorname{Hol}_x(g)\subseteq SU(n)$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$\rho=0$ なら円板上の行列式接続は平坦なので、一周した係数は $1$ になる。逆向きは小円板での積分がすべて $2\pi$ の整数倍かつ零に近付くことを使い、Ricci形式の各成分を取り出す。

<!-- proof-start -->
### 証明

まず $\rho=0$ とする。[行列式表現の命題](#prop-kah1-16-determinant-transport)によって $F_L=-i\rho=0$。零ホモトピックな閉路 $\gamma$ を張る滑らかな円板を選ぶと、直前のStokes計算から

$$
\det_{\mathbb C}(P_\gamma)
=\exp\left(i\int_{D^2}f^*\rho\right)
=\exp(0)=1.
$$

[Kählerホロノミーのユニタリ性](#thm-kah1-16-unitary)からも $P_\gamma\in U(n)$。二つを合わせて $P_\gamma\in SU(n)$ となる。区分的に滑らかな零ホモトピック閉路は滑らかな円板による近似で同じ結論を得る。

逆向きに、制限ホロノミーが $SU(n)$ に入るとする。任意の点 $y\in X$ と実接ベクトル $u,v\in T_yX$ を選ぶ。小さい座標円板 $f_\varepsilon:[0,\varepsilon]^2\to X$ を $f_\varepsilon(s,t)=\varphi^{-1}(\varphi(y)+su+tv)$ と構成する（座標表示の $u,v$ を使用する）。その境界は零ホモトピックである。基点を $x$ から $y$ へ変えても平行移動の行列は共役され、行列式は変わらないので、

$$
1=\det P_{\partial f_\varepsilon}
=\exp\left(i\int_{[0,\varepsilon]^2}f_\varepsilon^*\rho\right).
$$

$\rho$ は実2形式だから、この積分は実数であり $2\pi\mathbb Z$ に属する。一方、滑らかさから積分の絶対値は $O(\varepsilon^2)$ なので、十分小さい $\varepsilon$ では絶対値が $2\pi$ 未満となり、積分は $0$ である。両辺を $\varepsilon^2$ で割って $\varepsilon\to0$ とすると

$$
\rho_y(u,v)
=\lim_{\varepsilon\to0}
\frac{1}{\varepsilon^2}\int_{[0,\varepsilon]^2}f_\varepsilon^*\rho=0.
$$

$y,u,v$ が任意なので $\rho=0$。最後に $X$ が[単連結](../../GEO/GEO18/index.md#def-geo18-simply-connected)なら全閉路が零ホモトピックだから、定義により $\operatorname{Hol}_x=\operatorname{Hol}_x^0$ である。$\square$
<!-- proof-end -->

この定理は**与えられた**Kähler計量のRicci形式と、その計量の接続に関する同値である。[第一Chern類の必要条件](../KAH1-15/index.md#thm-kah1-15-cohomology)で $c_1(X)_{\mathbb R}=0$ が分かることとは違う。実係数類が零でも、手元の計量の $\rho$ が零とは限らない。

## 6. 全ホロノミーは $SU(n)$ に入らないことがある

制限ホロノミーと全ホロノミーを区別するため、計算できる**コンパクトな平坦Kähler曲面**を構成しよう。$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、積トーラス $Y=E\times E$ に積の平坦計量を与える。写像

$$
\sigma:Y\longrightarrow Y,\qquad
\sigma(z,w)=(z+\tfrac12,-w)
$$

を考える。格子との両立によりこれは正則写像であり、二回作用させると $(z+1,w)=(z,w)$ なので $\sigma^2=\operatorname{id}$。また $\sigma(z,w)=(z,w)$ なら $1/2\in\mathbb Z+i\mathbb Z$ が必要だが、これは偽である。従って作用は固定点を持たず、商 $X=Y/\langle\sigma\rangle$ は滑らかな複素曲面である。

$\sigma$ の微分は複素行列 $\operatorname{diag}(1,-1)$。積の基本形式 $\omega_Y=i(dz\wedge d\bar z+dw\wedge d\bar w)$ に対し、$dz$ は不変、$dw$ は符号反転するが $dw\wedge d\bar w$ は不変なので $\sigma^*\omega_Y=\omega_Y$。よって正値・実 $(1,1)$ 型・閉性を持つ形式が商へ降り、$X$ はKählerである。各局所座標の係数は定数なので全Riemann曲率が零、従って $\rho=0$。それでも、商で閉じる一周には回転が残る。

<a id="prop-kah1-16-flat-quotient"></a>

<!-- formal-statement-start -->
> **命題（平坦商における非特殊ユニタリ全ホロノミー）**  
> 上記の自由な位数2の等長正則作用による商 $X=(E\times E)/\langle\sigma\rangle$ はコンパクト連結Kähler曲面であり、誘導計量について
>
$$
\begin{aligned}
\rho&=0,\\
\operatorname{Hol}_x^0(g)&=\{I\},\\
\operatorname{Hol}_x(g)&=\{I,\operatorname{diag}(1,-1)\}.
\end{aligned}
$$
>
> がユニタリ基底の取り方を適切に選べば成立する。従って全ホロノミーは $SU(2)$ に含まれない。
<!-- formal-statement-end -->

### 証明の見取り図

商をとる前の積トーラスでは平行移動は恒等変換である。一方、$\sigma$ に対応する閉路の持ち上げは始点と $\sigma$ で移った終点を結び、最後の接空間の同一視に $d\sigma$ が現れる。

<!-- proof-start -->
### 証明

$Y$ はコンパクト連結であり、有限群の自由作用による商 $X$ もコンパクト連結かつ滑らかである。上の計量の降下によって $X$ はKählerで、局所平坦性から $\rho=0$。このため[制限ホロノミー定理](#thm-kah1-16-su-restricted)で $\operatorname{Hol}^0\subseteq SU(2)$ は既に言えるが、より強く局所平坦な座標枠を円板に沿って運べば、縮まる閉路の移動は $I$ である。

$x=[(0,0)]$ とし、$Y$ で $(0,0)$ から $(1/2,0)$ へ進む曲線を取る。両端は $\sigma$ により $X$ で同じ点を表すので、商への射影は $x$ を基点とする閉路になる。$Y$ でこの曲線に沿う平行移動は定数係数枠で $I$。終点 $(1/2,0)=\sigma(0,0)$ の接ベクトルを始点に戻して比較すると $d\sigma^{-1}=\operatorname{diag}(1,-1)$ が掛かる。従ってこの閉路のホロノミーは同じ対角行列で、その行列式は $-1$。

$Y$ のすべての閉路では平行移動が $I$、商における任意の閉路の持ち上げの終点は始点そのものか $\sigma$ による移動先である。よって他の行列は現れず、表示した二元群が全ホロノミーである。一方零ホモトピックな閉路は $Y$ 上で閉じ、平行移動は $I$ だから制限ホロノミーは $\{I\}$。$\square$
<!-- proof-end -->

標準束の側からも差を確かめられる。$Y$ の大域正則2形式 $dz\wedge dw$ は $\sigma^*(dz\wedge dw)=-dz\wedge dw$ と変わる。$Y$ 上の任意の大域正則2形式は $f(z,w)\,dz\wedge dw$ の形で、コンパクト性により正則関数 $f$ は定数である。従って非零で $\sigma$ 不変な正則2形式は存在せず、$X$ の標準束 $K_X$ は正則自明ではない。一方 $(dz\wedge dw)^{\otimes2}$ は不変だから $K_X^{\otimes2}$ は正則自明である。

ここで $\rho=0$ と $c_1(X)_{\mathbb R}=0$ は成立するが、標準束に全域の非零正則枠はない。この反例は[前章の論理的な境界](../KAH1-15/index.md#thm-kah1-15-cohomology)を実体化している。

## 7. 単連結な場合の平行な体積形式と後続への橋

平坦な接続の曲率が零であるというだけでは大域平行枠は得られない。しかし単連結な基底では曲線を変えても平行移動が一致するので、始点の線束の非零ベクトルをどこへでも一意に平行移動できる。これを標準束 $K_X$ に適用してみよう。

<a id="prop-kah1-16-volume"></a>

<!-- formal-statement-start -->
> **命題（単連結Ricci平坦Kähler多様体の平行正則体積形式）**  
> $X$ を連結かつ単連結な複素次元 $n\ge1$ のKähler多様体とし、与えられた計量のRicci形式が $\rho=0$ とする。このとき標準束 $K_X$ には零にならない大域的な平行切断が存在し、それは正則 $(n,0)$ 形式である。
<!-- formal-statement-end -->

### 証明の見取り図

反標準束の曲率は $-i\rho$、その双対である標準束の曲率は符号を変えた $i\rho$ である。曲率零と単連結性から経路独立性が得られ、Chern接続の $(0,1)$ 部分を使って正則性を確認する。

<!-- proof-start -->
### 証明

[標準束と双対接続](../KAH1-12/index.md#def-kah1-12-canonical)により、標準束は行列式線束の双対である。曲率は双対化で符号を変えるから、

$$
K_X=L^*,\qquad
F_{K_X}=-F_L=i\rho=0.
$$

基点 $x$ のファイバー $K_{X,x}$ から非零ベクトル $\eta_x$ を選ぶ。任意の点 $y\in X$ への曲線 $\gamma$ に沿って $\eta_x$ を平行移動し、次のように置く。

$$
\eta_y=P_\gamma\eta_x.
$$

二つの曲線の違いは閉路である。単連結性と前節の円板上の[一般Stokes定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)による計算から、曲率零の線束ではその閉路の平行移動係数は $1$。従って $\eta_y$ は曲線 $\gamma$ の選択によらない。局所平行移動方程式の滑らかなパラメータ依存性より、$\eta$ は滑らかな平行切断になる。

単位的な接続は非零ベクトルの長さを保つので $\eta$ はどの点でも零にならない。さらにChern接続の $(0,1)$ 部分は[正則束と両立する接続の条件](../../CM/CM2-10/index.md#def-cm2-10-compatible-conditions)により $\bar\partial$ に等しい。$D\eta=0$ の $(0,1)$ 成分をとると $\bar\partial\eta=0$、従って $\eta$ は大域正則 $(n,0)$ 形式である。$\square$
<!-- proof-end -->

**どこまでが今回の結論か。** $SU(n)$ に含まれることは、既にRicci平坦な計量が与えられているときの帰結である。「第一Chern類が実係数で零だからRicci平坦計量が存在する」という深い存在命題を本章で証明したことにはならない。これからのCYG系列では標準束・ホロノミー・Calabi–Yauという名称の使い分けを、YAU系列ではRicci平坦計量の存在に必要な解析を学ぶ。

## 8. 演習：局所曲率・全閉路・大域的制約

### Level A

<a id="ex-kah1-16-a01"></a>
#### KAH1-16-A01 複素構造を保存する平行移動
- Level: A

Kähler多様体上の曲線 $\gamma$ に沿い $V$ が平行であるとする。$JV$ も平行であることを示し、閉路の平行移動が複素線形になる理由を述べよ。

<!-- solution-start -->
**詳細解答。** [Kähler接続の同値性](../KAH1-03/index.md#thm-kah1-03-main-equivalence)により $\nabla J=0$。Leibniz則で

$$
\nabla_{\dot\gamma}(JV)
=(\nabla_{\dot\gamma}J)V+J(\nabla_{\dot\gamma}V)=0.
$$

初期値 $JV(0)$ を持つ平行延長の一意性より $P_\gamma(JV(0))=J P_\gamma(V(0))$。複素数倍 $(a+ib)u=au+bJu$ に対し $P_\gamma((a+ib)u)=(a+ib)P_\gamma u$ だから複素線形である。
<!-- solution-end -->

<a id="ex-kah1-16-a02"></a>
#### KAH1-16-A02 曲率の符号検算
- Level: A

$\rho=-i\partial\bar\partial\log\det G$ と $F_L=\bar\partial\partial\log\det G$ から $F_L=-i\rho$ を導け。$L$ の双対線束の曲率も書け。

<!-- solution-start -->
**詳細解答。** 関数 $f=\log\det G$ について $d^2f=0$ の $(1,1)$ 部分から $\bar\partial\partial f=-\partial\bar\partial f$。また $-i\rho=(-i)(-i\partial\bar\partial f)=-\partial\bar\partial f$ なので $F_L=-i\rho$。双対接続では局所接続1形式が符号を変えるため、曲率も $F_{L^*}=-F_L=i\rho$ となる。
<!-- solution-end -->

<a id="ex-kah1-16-a03"></a>
#### KAH1-16-A03 全ホロノミーと制限ホロノミー
- Level: A

$\mathbb C/(\mathbb Z+i\mathbb Z)$ の平坦計量について、格子での接ベクトルの同一視も書いて、全ホロノミーと制限ホロノミーを求めよ。

<!-- solution-start -->
**詳細解答。** 被覆座標 $z$ で計量係数は一定だから、平行ベクトルは $\dot V=0$ を満たす。閉路の持ち上げは $z(0)$ から $z(0)+m+in$ へ進む。格子変換 $z\mapsto z+m+in$ の微分は複素数として $1$ なので、始点への同一視でも係数は変わらず、閉路の平行移動はすべて $1$。従って $\operatorname{Hol}=\operatorname{Hol}^0=\{1\}$。
<!-- solution-end -->

<a id="ex-kah1-16-a04"></a>
#### KAH1-16-A04 正曲率の射影直線
- Level: A

$\mathbb{CP}^1$ に規格化されたFubini–Study計量を入れる。[既習のRicci計算](../KAH1-15/index.md#thm-kah1-15-fs)から、制限ホロノミーが $SU(1)$ に入るか判定せよ。

<!-- solution-start -->
**詳細解答。** $\rho_{\mathrm{FS}}=2\omega_{\mathrm{FS}}$ であり、$\omega_{\mathrm{FS}}$ は各点で正値だから零でない。従って $\rho_{\mathrm{FS}}\ne0$。[制限ホロノミーの同値定理](#thm-kah1-16-su-restricted)の逆方向を使えば、もし $\operatorname{Hol}^0\subseteq SU(1)$ なら $\rho=0$ となるはずで矛盾。$SU(1)=\{1\}$ なので制限ホロノミーは自明でない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-16-b01"></a>
#### KAH1-16-B01 円板のStokes公式を再導出
- Level: B

円板上のHermite線束で単位局所枠を用い、接続を $D=d+a$ と書く。$a$ が純虚数値で、閉路の平行移動係数が $\exp(-\int_DF)$ となることを、平行微分方程式から示せ。

<!-- solution-start -->
**詳細解答。** 枠 $e$ の長さが $1$ なので、計量両立性を微分すると $0=d\langle e,e\rangle=(a+\bar a)\langle e,e\rangle$、従って $a+\bar a=0$。切断 $ce$ が平行なら $0=D_{\dot\gamma}(ce)=(\dot c+a(\dot\gamma)c)e$、従って $d(\log c)/dt=-a(\dot\gamma)$（$c\ne0$ を保つ）。初期値で積分すると $c(1)/c(0)=\exp(-\int_\gamma a)$。階数1だから $F=da$ であり、$\gamma=\partial D$ に[一般Stokes定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用して $\exp(-\int_\gamma a)=\exp(-\int_DF)$。曲率零なら指数は $1$。
<!-- solution-end -->

<a id="ex-kah1-16-b02"></a>
#### KAH1-16-B02 小円板でRicci形式を回収
- Level: B

任意の点 $y$ を通る十分小さい座標正方形について $\det P_{\partial D_\varepsilon}=1$ が成り立つとする。$\rho_y(u,v)=0$ をすべての実接ベクトル $u,v$ について導け。

<!-- solution-start -->
**詳細解答。** [行列式線束の曲率](#prop-kah1-16-determinant-transport)は $F_L=-i\rho$ であり、[円板の平行移動公式](#thm-kah1-16-su-restricted)の証明から $1=\exp(i\int_{D_\varepsilon}\rho)$。$\rho$ は実形式なので $\int_{D_\varepsilon}\rho\in2\pi\mathbb Z$。連続性からその値は $O(\varepsilon^2)$ であり、十分小さい正方形では絶対値が $2\pi$ より小さい。従って積分は $0$。正方形の辺を座標上で $\varepsilon u,\varepsilon v$ に取ると、

$$
\frac1{\varepsilon^2}\int_{D_\varepsilon}\rho
=\rho_y(u,v)+o(1)=0.
$$

$\varepsilon\to0$ として $\rho_y(u,v)=0$。$u,v$ が任意なので $y$ で $\rho_y=0$。
<!-- solution-end -->

<a id="ex-kah1-16-b03"></a>
#### KAH1-16-B03 自由作用と行列式の反例
- Level: B

$Y=E\times E$ の $\sigma(z,w)=(z+1/2,-w)$ について (i) 固定点がない、(ii) 平坦Kähler計量を保存、(iii) 商の閉路の行列式ホロノミーが $-1$ となり得る、の三点を示せ。

<!-- solution-start -->
**詳細解答。** (i) 固定点があれば $z+1/2=z$ in $E$、すなわち $1/2\in\mathbb Z+i\mathbb Z$ となる。しかし整数 $m,n$ に対し $m+in=1/2$ は解を持たない。(ii) $\sigma^*dz=dz$、$\sigma^*dw=-dw$ だから $\sigma^*(i\,dz\wedge d\bar z+i\,dw\wedge d\bar w)$ は元と一致する。正値・閉性も商へ降りる。(iii) $(0,0)$ と $(1/2,0)$ を結ぶ被覆上の曲線は商で閉じる。平坦な被覆上の平行移動は $I$、終点を始点へ同一視する微分が $d\sigma^{-1}=\operatorname{diag}(1,-1)$ だから、複素行列式は $1\cdot(-1)=-1$。
<!-- solution-end -->

<a id="ex-kah1-16-b04"></a>
#### KAH1-16-B04 必要条件と与えられた計量を区別
- Level: B

複素トーラス $T=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上に、平坦Kähler形式 $\omega_0$ と滑らかな実関数 $\varphi=\varepsilon\cos(2\pi\operatorname{Re}z)$ を用いて $\omega=\omega_0+i\partial\bar\partial\varphi$ を入れる。十分小さい $\varepsilon\ne0$ に対し $\omega$ はKählerであるが一般にRicci平坦でないことを示せ。これが $c_1(T)_{\mathbb R}=0$ と矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\varphi$ は $z\mapsto z+m+in$ の下で不変なので $T$ 上の実関数である。$x=\operatorname{Re}z$ とすると $\partial_z\partial_{\bar z}\varphi=(1/4)\partial_x^2\varphi=-\pi^2\varepsilon\cos(2\pi x)$。従って

$$
\omega=i\bigl(1-\pi^2\varepsilon\cos(2\pi x)\bigr)\,dz\wedge d\bar z.
$$

$|\varepsilon|<1/\pi^2$ なら係数は全点で正。複素次元1の実 $(1,1)$ 形式は閉じるので $\omega$ はKählerである。$f(x)=1-\pi^2\varepsilon\cos(2\pi x)$ と置けば

$$
\rho=-i\partial\bar\partial\log f
=-\frac{i}{4}\,\frac{d^2}{dx^2}\log f\;dz\wedge d\bar z.
$$

$x=1/4$ では $f=1$、$f'=2\pi^3\varepsilon$、$f''=0$ なので $(\log f)''=f''/f-(f'/f)^2=-4\pi^6\varepsilon^2\ne0$。よって $\rho\ne0$。一方 $\rho=-i\partial\bar\partial\log f$ は大域関数 $\log f$ の外微分から作った完全2形式なので $[\rho]=0$。トーラスの $c_1(T)_{\mathbb R}=0$ と両立し、類の零は代表の零を強制しない。
<!-- solution-end -->

### Level C

<a id="ex-kah1-16-c01"></a>
#### KAH1-16-C01 平坦な有限商をめぐる四つの主張
- Level: C

$X=(E\times E)/\langle\sigma\rangle$、$\sigma(z,w)=(z+1/2,-w)$ に商からの平坦Kähler計量を入れる。次を順に示せ。

1. $X$ では $\rho=0$、従って $c_1(X)_{\mathbb R}=0$ を示せ。
2. 制限ホロノミーは $SU(2)$ に含まれるが、全ホロノミーは含まれないことを示せ。
3. $K_X$ は正則自明でないが $K_X^{\otimes2}$ は正則自明であることを示せ。
4. 「Ricci平坦」「実係数第一Chern類零」「標準束正則自明」を、同じ意味の三語として扱えない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (1) 積トーラスの計量行列は各局所座標で $G=I_2$、従って $\rho=-i\partial\bar\partial\log\det I_2=0$。この式は局所等式として商へ降りる。[Ricci–Chern対応](../KAH1-12/index.md#thm-kah1-12-ricci-chern)から $2\pi c_1(X)_{\mathbb R}=[\rho]=0$。

(2) [制限ホロノミー定理](#thm-kah1-16-su-restricted)に (1) を適用すると $\operatorname{Hol}^0\subseteq SU(2)$。実際この平坦例では $\operatorname{Hol}^0=\{I\}$。$\sigma$ の経路を持ち上げて終点を同一視すると、全ホロノミーは $\operatorname{diag}(1,-1)$ を含む。その複素行列式は $-1$ なので $SU(2)$ に入らない。

(3) 被覆上の正則最高次形式は $f(z,w)\,dz\wedge dw$ と書ける。$Y=E\times E$ はコンパクト連結なので $f$ は定数である。しかし $\sigma^*(dz\wedge dw)=-dz\wedge dw$ だから、非零の降下する形式はなく、$K_X$ は正則自明でない。一方二乗テンソルに対して符号は $(-1)^2=1$ なので $(dz\wedge dw)^{\otimes2}$ は $X$ へ降りる大域非零正則切断となり、$K_X^{\otimes2}$ は正則自明である。

(4) 本例は $\rho=0$ と $c_1(X)_{\mathbb R}=0$ の両方を満たすが $K_X$ の正則自明性を満たさない。また[B04の非平坦代表](#ex-kah1-16-b04)は実係数第一Chern類が零でも、選んだ計量のRicci形式が零とは限らないことを示す。前者は閉路での行列式平行移動の障害、後者はコホモロジー類と局所曲率代表の違いが原因である。
<!-- solution-end -->

## 9. Kähler幾何学から次の講義へ

Kähler条件から $\nabla J=0$ が得られ、閉路の平行移動は $U(n)$ に入る。さらにRicci平坦なら行列式線束の曲率が消えるため、**縮められる閉路**の平行移動は $SU(n)$ に入る。ただし全ホロノミーには非自明な行列式が残りうる。この差を見分けて初めて、標準束の大域的な性質と曲率の局所的な性質を混同せずに済む。

次に学ぶべき問いは、そもそも与えられたKähler類の中にRicci平坦計量が存在するか、存在するとすればどのように構成されるかである。その問題はCalabi予想・複素Monge–Ampère方程式と結び付き、後続のYAU系列の課題となる。
