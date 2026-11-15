# MIR1-07 留数で作る正則3形式

<!-- definition-example-audit: strict -->

## 1. 方程式から「積分する3形式」へ

[前講の滑らかさの判定](../MIR1-06/index.md#prop-mir1-06-smooth-locus)により、Dwork型五次超曲面

$$
F_\psi(x)=\sum_{i=0}^4x_i^5-5\psi x_0x_1x_2x_3x_4,\qquad
X_\psi=\{F_\psi=0\}\subset\mathbb P^4_{\mathbb C}
$$

は $\psi^5\ne1$ で滑らかな複素三次元多様体である。一方、Hodge数だけでは、異なるファイバーの複素構造がどう変わるかを数値として追えない。各ファイバーに**正則3形式**を選び、それを実3次元の閉じたサイクルに積分した値（周期）を比べたい。

正則3形式とは、複素局所座標 $(u_1,u_2,u_3)$ ごとに

$$
\omega=h(u_1,u_2,u_3)\,du_1\wedge du_2\wedge du_3
$$

と書け、係数 $h$ が正則な微分形式である。$h$ がどの点でも零でなければ、その形式は標準束を自明化する。[既習の標準束と最高次形式の対応](../../CYG/CYG1-02/index.md#prop-cyg1-02-volume-trivialization)がこの意味を保証する。

[Greene–Plesser位相群の不変性](../MIR1-04/index.md#prop-mir1-04-residue-invariant)では既に留数形式が登場した。ここではそれを**射影空間のどこでも使える式**へ展開し、積分の $2\pi i$ と符号を固定する。留数の一般的な局所構成そのものは[局所正則随伴形式](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)を利用し、この族に特有の計算に集中する。

以下、基本のパラメータ領域を

$$
U=\{\psi\in\mathbb C:\psi^5\ne1\},\qquad
P(x)=\prod_{i=0}^4x_i
$$

とする。$U$ には $\psi=0$（滑らかなFermatファイバー）も含まれる。

## 2. 留数を定義し、局所座標で符号を確定する

四次元の射影空間そのものでは「分母が $F_\psi$ の有理4形式」を作れる。超曲面に沿った**単純極**（局所的に $1/f$ が一回現れる極）の係数を取り出すと、次元が一つ下がった3形式になる。ここでの留数は複素関数の点留数の高次元版である。

まず $\mathbb C^5\setminus\{0\}$ で、帽子をその因子の省略として

$$
\Omega=\sum_{i=0}^4(-1)^i x_i\,
dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4
$$

を作る。$\Omega$ は4形式で、$F_\psi$ は斉次五次式である。

<a id="def-mir1-07-residue-form"></a>

<!-- formal-statement-start -->
> **定義（Dwork型五次の留数3形式）**
>
> $\psi\in U$ とし、$X_\psi\subset\mathbb P^4_{\mathbb C}$ を次の五次式の零集合とする。

$$
F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_{i=0}^4x_i,\qquad X_\psi=\{F_\psi=0\}.
$$

> 留数の分子を次の4形式に固定する。

$$
\Omega=\sum_{i=0}^4(-1)^ix_i\,
dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4.
$$

> $X_\psi$ 上の留数3形式を

$$
\omega_\psi=\operatorname{Res}_{X_\psi}
\left(\frac{\Omega}{F_\psi}\right)
$$

> と定める。留数の規約は、局所的に有理4形式を $(df/f)\wedge\beta+$ 正則4形式と書いたときの $\beta|_{f=0}$ とする。したがって、小円を正方向に回る留数積分には $2\pi i$ が現れる。
<!-- formal-statement-end -->

この定義の各条件を確かめるには、まず射影チャート $x_0\ne0$ へ移り、$y_j=x_j/x_0$（$1\le j\le4$）と置く。$x_0=1$ の代表を選ぶと

$$
f_\psi(y)=1+\sum_{j=1}^4y_j^5-5\psi y_1y_2y_3y_4,
\qquad
\frac{\Omega}{F_\psi}=
\frac{dy_1\wedge dy_2\wedge dy_3\wedge dy_4}{f_\psi}.
$$

後者は、$dx_0=0$ により $\Omega$ の $i=0$ 項だけが残るためである。

以後 $f_j=\partial f_\psi/\partial y_j$（$1\le j\le4$）と略記し、偏微分では $\psi$ と他の $y_k$ を固定する。また $df_\psi=\sum_{j=1}^4 f_j\,dy_j$ は、$\psi$ を固定した **$y$ 方向の外微分**を意味する。

例えば $f_4\ne0$ の領域では、[局所正則随伴形式の座標構成](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)で使った非零Jacobian条件により、$f_\psi=0$ を $y_4$ について正則に解ける。残る $(y_1,y_2,y_3)$ が超曲面の正則局所座標になる。上記の $df_\psi$ を用いると、$dy_1\wedge dy_2\wedge dy_3$ を左から掛けたとき $f_4$ の項しか残らないので

$$
df_\psi\wedge dy_1\wedge dy_2\wedge dy_3
=-f_4\,dy_1\wedge dy_2\wedge dy_3\wedge dy_4.
$$

従って、留数を定義する $df_\psi/f_\psi$ が**左側**に来る規約では

$$
\frac{dy_1\wedge\cdots\wedge dy_4}{f_\psi}
=\frac{df_\psi}{f_\psi}\wedge
\left(-\frac{dy_1\wedge dy_2\wedge dy_3}{f_4}\right)
$$

となる。この表示から、局所的な3形式は次のように求まる。

<a id="prop-mir1-07-local-form"></a>

<!-- formal-statement-start -->
> **命題（消去変数による局所留数表示）**
>
> $\psi\in U$ とする。$x_0\ne0$ のチャートの $X_\psi$ 上で $f_j=\partial f_\psi/\partial y_j\ne0$（$j\in\{1,2,3,4\}$）なら、$\omega_\psi$ は

$$
\omega_\psi=
\frac{(-1)^{j-1}}{f_j}
\,dy_1\wedge\cdots\wedge\widehat{dy_j}\wedge\cdots\wedge dy_4
\quad\text{（$X_\psi$ の接空間に制限）}
$$

> と表せる。異なる消去変数の表示は重なりで一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$df_\psi$ を左に出す際、$dy_j$ は前へ $j-1$ 回移動する。残りを分母 $f_j$ で割る。二つの消去方向が重なる領域では、$df_\psi=0$ という**超曲面の接空間での関係**を代入して、符号を照合する。

<!-- proof-start -->
### 証明

任意の $j$ について、$df_\psi$ を最左端にして残りの3形式を $dy_1,\ldots,\widehat{dy_j},\ldots,dy_4$ の順に並べる。$df_\psi$ の中で $dy_j$ の項だけが残り、それを本来の第 $j$ 位置へ戻す交換回数は $j-1$ なので

$$
df_\psi\wedge
dy_1\wedge\cdots\wedge\widehat{dy_j}\wedge\cdots\wedge dy_4
=(-1)^{j-1}f_j\,dy_1\wedge\cdots\wedge dy_4.
$$

$f_j\ne0$ で割って留数を取れば、指定の局所公式になる。

重なりの符号を実際に計算する。$f_3f_4\ne0$ とし、$X_\psi$ の接空間では

$$
0=df_\psi=f_1dy_1+f_2dy_2+f_3dy_3+f_4dy_4,
$$

$$
dy_4=-\frac{f_1}{f_4}dy_1-\frac{f_2}{f_4}dy_2-\frac{f_3}{f_4}dy_3.
$$

両辺に $dy_1\wedge dy_2$ を左から掛けると、最初の二項は同じ微分を二度含むため消え、

$$
dy_1\wedge dy_2\wedge dy_4
=-\frac{f_3}{f_4}dy_1\wedge dy_2\wedge dy_3.
$$

したがって $j=3$ の式（符号は正）と $j=4$ の式（符号は負）は

$$
\frac{dy_1\wedge dy_2\wedge dy_4}{f_3}
=-\frac{dy_1\wedge dy_2\wedge dy_3}{f_4}
$$

として一致する。他の組も同じ接空間の関係と外積の反対称性で示せる。消去変数を替える一般的な貼り合わせは[局所正則随伴形式](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)にも一致する。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-mir1-07-residue-form -->
**定義の確認**（Fermat点での非消失性）。 $\psi=0$、$p=[1:0:0:0:-1]$ を取る。$f_0(0,0,0,-1)=1+(-1)^5=0$ なので $p\in X_0$。消去方向 $y_4$ については

$$
f_4=5y_4^4-5\psi y_1y_2y_3,\qquad f_4(p)=5\ne0.
$$

局所座標は $(y_1,y_2,y_3)$ で、その点の留数は

$$
\omega_0|_p=-\frac15\,dy_1\wedge dy_2\wedge dy_3\ne0.
$$

これは単なる代数的な値ではない。$f_4(p)\ne0$ によって $(y_1,y_2,y_3)$ が実際に $X_0$ の正則局所座標になり、その基底3形式の係数が非零であることを同時に検査した。さらにこの点では積 $y_1y_2y_3=0$ なので、任意の有限 $\psi$ に対して $f_\psi(p)=0$、$f_4(p)=5$ が成り立つ。ただし局所的な非消失だけで、特異ファイバー全体に大域的な正則体積形式があるとは結論できない。
<!-- definition-example-end -->

## 3. なぜ五次では射影空間上に貼り合わさるか

局所式は得られたが、斉次座標を共通に拡大するときにも形式が定まる必要がある。$x_i\mapsto\lambda x_i$（$\lambda\in\mathbb C^\times$）の下では $\Omega$ の各項が一つの座標と四つの微分を含むため、$\lambda^5$ 倍される。分母も五次斉次なので同じ倍率を受ける。これは偶然の「5」ではなく、[滑らかな射影超曲面の標準束の次数判定](../../CYG/CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)の $d=n+1=5$ に対応する。

<a id="prop-mir1-07-global-volume"></a>

<!-- formal-statement-start -->
> **命題（Dwork族の大域的な非消失正則3形式）**
>
> $\psi\in\mathbb C$、$\psi^5\ne1$ とする。次の射影五次超曲面と留数3形式を取る。

$$
F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_{i=0}^4x_i,\qquad
X_\psi=\{F_\psi=0\}\subset\mathbb P^4_{\mathbb C}.
$$

$$
\Omega=\sum_{i=0}^4(-1)^ix_i\,
dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4,
\qquad
\omega_\psi=\operatorname{Res}_{X_\psi}(\Omega/F_\psi).
$$

> この $\omega_\psi$ は斉次座標の代表に依存せず、大域的に定義された、どの点でも零にならない正則3形式である。したがって標準束は自明である。

$$
K_{X_\psi}\simeq\mathcal O_{X_\psi}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

五次同士の倍率が打ち消し合うので射影空間上で有理4形式ができる。滑らかさが、各点で**少なくとも一つの非零偏微分**を保証する。そこで先ほどの局所式は、分母を零にせず、局所座標の最高外積に非零係数を掛けた形式になる。

<!-- proof-start -->
### 証明

第一に $x\mapsto\lambda x$ なら、$dx_i\mapsto\lambda dx_i$ より

$$
\Omega(\lambda x,\lambda\,dx)=\lambda^5\Omega(x,dx),\qquad
F_\psi(\lambda x)=\lambda^5F_\psi(x).
$$

従って $\Omega/F_\psi$ の倍率は1。さらに、$\Omega$ は $\mathbb C^5$ の標準**5形式** $dx_0\wedge\cdots\wedge dx_4$ にEuler方向の径ベクトル場 $E=\sum_i x_i\partial_{x_i}$ を収縮した $\iota_E(dx_0\wedge\cdots\wedge dx_4)$ である。従って $\iota_E\Omega=\iota_E^2(dx_0\wedge\cdots\wedge dx_4)=0$ となる。この水平性と倍率0の不変性から $\Omega/F_\psi$ は $\mathbb P^4\setminus X_\psi$ 上の有理4形式を定める。

第二に[前講の滑らかさの必要十分条件](../MIR1-06/index.md#prop-mir1-06-smooth-locus)により $X_\psi$ は滑らかである。任意の点を含む射影チャート $x_k\ne0$ を一つ選ぶ。そのチャートで $F_\psi$ の局所式を $f$ とすると、もし $f$ の全偏微分が零なら、斉次Eulerの式から残りの偏微分も零となり、射影超曲面が特異であるという矛盾に至る。よって少なくとも一つの消去偏微分 $f_j$ は非零である。

第三に[局所留数表示](#prop-mir1-07-local-form)をその消去方向に適用する。[局所正則随伴形式の構成](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)で確認したとおり、非零な消去偏微分の条件から残り三変数が**正則**局所座標になり、$\omega_\psi$ はその最高外積の $1/f_j$ 倍（符号を除く）である。$f_j$ は近傍で正則かつ非零なので係数も正則かつ非零である。座標を替えた表示の一致は[随伴形式の貼り合わせ](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)から従う。この3形式が標準束の非消失な大域切断となり、[体積形式による自明化](../../CYG/CYG1-02/index.md#prop-cyg1-02-volume-trivialization)より結論する。$\square$
<!-- proof-end -->

**次数をずらすと何が壊れるか。** $\mathbb P^4$ で分母を次数 $d$ の斉次式に替えると、同じ分子の比は $\lambda^{5-d}$ 倍となる。$d\ne5$ では $\Omega/F$ は射影的な4形式としてそのまま貼り合わない。次数 $d$ の滑らかな超曲面に[既習の標準束の次数判定](../../CYG/CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)を適用すると、$K_X\simeq\mathcal O_X(d-5)$ を得る。六次では追加の一次式を分子に掛ければ切断は作れるが、その一次式が零になる場所では体積形式も零となる。四次で同じ定数分子の処方を使うこともできない。このように**局所留数が書けること**と**大域的な非消失形式になること**は異なる。

**低次元の検算。** 滑らかなFermat三次曲線 $E=\{u^3+v^3+w^3=0\}\subset\mathbb P^2$ でも、分子は次数3の射影2形式、分母も次数3である。$w=1$ のチャートで $f=u^3+v^3+1$ とすると、$f_v=3v^2\ne0$ の領域の留数1形式は

$$
\eta=-\frac{du}{3v^2}.
$$

$p=(u,v)=(0,-1)$ では $f(p)=0$、$f_v(p)=3$ なので $\eta|_p=-du/3\ne0$。これは五次の場合と同じ「局所消去・次数一致・非消失」の小さな模型である。

## 4. 留数を3サイクルに積分する

正則3形式を得たら、それを積分する場所を指定する。ここでいう**3サイクル**は $X_\psi$ の中の向き付き実3次元の閉じた特異サイクル（またはそれで表されるホモロジー類）であって、複素三次元部分多様体ではない。積分には**区分的に滑らかな代表**を用い、実3次元の単体の有限和として扱う。各単体の境界は総和として打ち消される。ホモロジー類の代表はこのように滑らかな鎖で取れるため、積分の定義とホモロジー類への依存を以下で確かめられる。

<a id="def-mir1-07-period"></a>

<!-- formal-statement-start -->
> **定義（留数3形式の周期）**
>
> $\psi^5\ne1$ となる $\psi\in\mathbb C$ を固定し、$X_\psi$ 上の留数正則3形式を $\omega_\psi=\operatorname{Res}_{X_\psi}(\Omega/F_\psi)$ とする。$[\gamma]\in H_3(X_\psi,\mathbb Z)$ を向き付き実3サイクルのホモロジー類とし、区分的に滑らかな代表 $\gamma$ を取る。**周期**を

$$
\Pi_\gamma(\psi)=\int_\gamma\omega_\psi
$$

> と定義する。複素係数で積分する。形式 $\omega_\psi$ の規格化は分子 $\Omega$ と分母 $F_\psi$ の上記の選択で固定するが、周期の値は $\gamma$ の選択にも依存する。
<!-- formal-statement-end -->

正則最高次形式は閉形式である。実際、局所表示 $\omega=h\,du_1\wedge du_2\wedge du_3$ の外微分では $du_j$ の項は外積で重複して消え、$d\bar u_j$ の項は $h$ の正則性から零となる。従って $d\omega=0$。もし $\gamma-\gamma'=\partial B$ なら、$B$ を区分的に滑らかな実4鎖として取り、その各片へ[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用する。内部の3次元境界は向きが逆で相殺するので、

$$
\int_\gamma\omega_\psi-\int_{\gamma'}\omega_\psi
=\int_{\partial B}\omega_\psi
=\int_Bd\omega_\psi=0.
$$

よって周期は代表の取り方によらず、ホモロジー類で決まる。

<!-- definition-example-start: def-mir1-07-period -->
**定義の確認**。 同じサイクルを逆向きに取れば $\int_{-\gamma}\omega_\psi=-\Pi_\gamma$ である。また $a[\gamma]+b[\delta]$（$a,b\in\mathbb Z$）を積分すると、積分の線形性より $a\Pi_\gamma+b\Pi_\delta$ となる。**周期を1にする**という主張には非零な周期を持つサイクルと再規格化する係数の選択が必要で、全サイクル・全パラメータで自動的に1になるわけではない。$\omega_\psi$ がどの点でも零でないことだけから、特定のサイクルの周期が非零だとは言えない。
<!-- definition-example-end -->

留数にはもう一つの具体的な積分表示がある。滑らかな超曲面 $X_\psi\subset\mathbb P^4$ の実3サイクル $\gamma$ の周りで、複素1次元の法方向へ小さい**正向きの円**を付けて得る実4次元の管状サイクルを $T(\gamma)$ と呼ぶ。向きは「法方向の円が先、$\gamma$ が後」と約束する。局所座標では法方向が $f_\psi$、円が $f_\psi=\varepsilon e^{i\theta}$ である。

<a id="prop-mir1-07-tube"></a>

<!-- formal-statement-start -->
> **命題（管状サイクルの留数公式）**
>
> $\psi\in\mathbb C$、$\psi^5\ne1$ とし、滑らかな $X_\psi\subset\mathbb P^4$ の向き付き実3サイクル $\gamma$ とその小さな正向き管状4サイクル $T(\gamma)\subset\mathbb P^4\setminus X_\psi$ を取る。$\omega_\psi=\operatorname{Res}_{X_\psi}(\Omega/F_\psi)$ とすると、次が成り立つ。

$$
\frac{1}{2\pi i}\int_{T(\gamma)}
\frac{\Omega}{F_\psi}
=\int_\gamma\omega_\psi.
$$

> 左辺の向きは法方向の正向き円を先に積分する規約とする。
<!-- formal-statement-end -->

### 証明の見取り図

局所的に $f_\psi$ を法座標に使って、有理4形式を $(df_\psi/f_\psi)\wedge\beta$ と書く。法方向の円では $\int df_\psi/f_\psi=2\pi i$。残る $\beta|_{X_\psi}$ がちょうど留数 $\omega_\psi$ である。貼り合わせとサイクルの閉性により、局所計算が大域的な積分に移る。

<!-- proof-start -->
### 証明

超曲面が滑らかなので、任意の点の近くで $f=f_\psi$ 自身を複素法座標として採用できる。このチャートで、留数の定義によって

$$
\alpha:=\frac{\Omega}{F_\psi}
=\frac{df}{f}\wedge\beta+\rho
$$

と書ける。$\beta$ は法座標 $f$ と残りの三座標に正則な3形式、$\rho$ は正則4形式であり、$\beta|_{f=0}=\omega_\psi$ である。

管状円 $f=\varepsilon e^{i\theta}$ 上では

$$
\frac{df}{f}=i\,d\theta,\qquad
\int_0^{2\pi}i\,d\theta=2\pi i.
$$

$\varepsilon\to0$ とすると、コンパクトな局所3鎖の上で $\beta(f,\cdot)\to\beta(0,\cdot)$ が一様に成り立つ。$\rho$ の積分は法方向の円の長さが $O(\varepsilon)$ で、係数が有界なため零へ近づく。ゆえに各局所積分の極限は

$$
\lim_{\varepsilon\to0}\int_{T_\varepsilon(\gamma)}
\alpha
=2\pi i\int_\gamma\beta|_{f=0}
=2\pi i\int_\gamma\omega_\psi.
$$

$\gamma$ を有限個の座標近傍に分割して積分すればこの計算を貼り合わせられる。一方、$\alpha$ は補集合上の正則最高次形式なので閉形式である。異なる十分小さな管状サイクルは補集合内でホモローグである。二つの管状サイクルを結ぶ実5鎖へ[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を片ごとに適用すれば、内部境界が相殺し、$d\alpha=0$ により両サイクルの積分が一致する。ゆえに左辺は半径に依存しない。従って極限の等式が元の管状サイクルの等式となる。$\square$
<!-- proof-end -->

**局所符号を手で確かめる。** $\mathbb C^4$ の座標 $(u,v,t,w)$ で超曲面 $w=0$、有理4形式

$$
\alpha=\frac{du\wedge dv\wedge dt\wedge dw}{w}
=\frac{dw}{w}\wedge(-du\wedge dv\wedge dt)
$$

を考える。$Q=[0,1]^3$（$u,v,t$ は実数）を向き付き3鎖とし、管状鎖 $S_\varepsilon^1\times Q$ の向きを円から先に取る。すると

$$
\int_{S_\varepsilon^1\times Q}\alpha
=-(2\pi i)\int_Qdu\wedge dv\wedge dt
=-2\pi i.
$$

この鎖は境界を持つので**閉サイクルの例ではない**が、局所公式の $2\pi i$ とマイナス符号を独立に検算できる。

## 5. パラメータを動かした周期はいつ正則か

特定の $\psi$ での周期だけなら、3サイクルを一つ選べばよい。しかし関数 $\Pi_\gamma(\psi)$ として扱うには、**異なるファイバーのサイクルをどう対応させるか**も必要である。

滑らかな領域の一点 $\psi_0\in U$ の近くで、射影的で滑らかなファイバーはコンパクトである。全空間

$$
\mathcal X_U=\{([x],\psi)\in\mathbb P^4\times U:F_\psi(x)=0\}
$$

から $U$ への射影は滑らかな固有な沈め込みになる。実際、各点で少なくとも一つの $x$ 方向偏微分が非零なので局所的に一つの $x$ 座標を消去でき、射影の微分は全射となる。ファイバーは射影的だからコンパクトで、パラメータのコンパクト集合の逆像も閉な $\mathbb P^4$ 内でコンパクトである。

この状況では局所的にファイバーを滑らかに同一視できる。理由は、沈め込みの局所座標でパラメータ方向を持ち上げ、分割した局所持ち上げを分割の1で貼り、コンパクトなファイバー上で有限時間そのベクトル場を積分できるからである。小円板 $D\subset U$ を選び、$\gamma(\psi_0)$ をこの同一視で運んだものを $\gamma(\psi)$ と書く。これが局所的にサイクルを**平行に追う**という意味である（接続の定義は次講）。

<a id="prop-mir1-07-period-holomorphic"></a>

<!-- formal-statement-start -->
> **命題（滑らかなパラメータ領域での周期の正則性）**
>
> $U=\{\psi\in\mathbb C:\psi^5\ne1\}$ とし、$\psi_0\in U$ の小円板 $D\subset U$ 上で、滑らかな射影ファイバー $X_\psi$ の実3サイクル $\gamma(\psi)$ を局所的な滑らかな自明化によって運ぶ。$\omega_\psi=\operatorname{Res}_{X_\psi}(\Omega/F_\psi)$ とすると

$$
\Pi(\psi)=\int_{\gamma(\psi)}\omega_\psi
$$

> は $D$ 上正則である。ここで $\Pi'(\psi)=d\Pi/d\psi$ は、運んだサイクルを使って定義した周期関数の**複素パラメータ $\psi$ に関する導関数**である。$\psi_0$ の固定された十分小さな管状サイクル $T_0\subset\mathbb P^4\setminus X_{\psi_0}$ を選べば、$D$ をさらに縮めて

$$
\Pi'(\psi)=\frac{1}{2\pi i}
\int_{T_0}\frac{5P(x)\,\Omega}{F_\psi(x)^2}
$$

> と計算できる。導関数の式は**補集合上の管状積分**の式であり、二重極を単純極の留数公式に直接入れた式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

十分小さく動かせば、最初の管状サイクル $T_0$ は動いた超曲面とも交わらない。その上で分母は一様に零から離れている。周期を固定サイクル上の有理4形式の積分で書けば、パラメータ微分を積分の内側へ移せる。微分では $F_\psi$ の $-5P$ が二重極の $+5P/F_\psi^2$ を生む。

<!-- proof-start -->
### 証明

$\psi_0$ における管状サイクル $T_0$ を十分小さな半径で取る。これはコンパクトで $X_{\psi_0}$ と交わらないから、連続関数 $|F_{\psi_0}|$ を**射影座標の有限個の自明化チャートで評価**した各値は、適切な有限被覆を取ることで $T_0$ 上で正の下限を持つ。従って $\psi$ を $\psi_0$ の近くに限れば $F_\psi$ も $T_0$ 上で零にならない。

局所自明化で $\gamma(\psi_0)$ を $\gamma(\psi)$ へ運ぶと、法方向の小円を付けた管状サイクル $T_\psi$ も滑らかに運べる。固定 $T_0$ はコンパクトで $X_{\psi_0}$ と離れているので、円板 $D$ を十分縮めれば、各固定 $\psi\in D$ について $T_0$、$T_\psi$ とそれらを結ぶ小さな変形をすべて同じ補集合 $\mathbb P^4\setminus X_\psi$ 内に収められる。具体的には、$T_\psi$ を $T_0$ の小さな管状近傍で法方向のグラフとして表し、その変位を0まで縮めればよい。その変形が作る実5鎖に $d(\Omega/F_\psi)=0$ と[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すれば両積分は一致する。そこで[管状サイクルの留数公式](#prop-mir1-07-tube)を使うと

$$
\Pi(\psi)=\frac{1}{2\pi i}
\int_{T_0}\frac{\Omega}{F_\psi}.
$$

$T_0$ は固定されたコンパクトな積分領域である。各チャートで $F_\psi$ は $\psi$ に正則に依存し、分母は一様に非零であるから、局所的に一様収束する幾何級数として $1/F_\psi$ を展開できる。積分とその級数を交換でき、$\Pi$ は正則になる。

ここで $\partial_\psi$ は**斉次座標 $x$ を固定して $\psi$ だけを動かす偏微分**であり、先の $df_\psi=\sum_j f_jdy_j$（$\psi$ 固定）とは区別する。$P$ と $\Omega$ は $\psi$ に依存せず、$\partial_\psi F_\psi=-5P$ なので

$$
\frac{\partial}{\partial\psi}\left(\frac{\Omega}{F_\psi}\right)
=-\frac{\Omega\,\partial_\psi F_\psi}{F_\psi^2}
=\frac{5P\Omega}{F_\psi^2}.
$$

前述の一様非零性により微分と積分を交換でき、主張した式を得る。$\square$
<!-- proof-end -->

**特異値を越えない理由。** $\psi^5=1$ では[判別式の計算](../MIR1-06/index.md#prop-mir1-06-smooth-locus)により偏微分が全て零となる点がある。局所消去、滑らかなファイバーの自明化、管状サイクルの一様な選択という本節の議論の起点が失われる。従って「正則な周期が特異値を通って同じように続く」とは主張しない。

[前講で定義した座標](../MIR1-06/index.md#def-mir1-06-z-coordinate)は、$\psi\ne0$ のとき

$$
z=(5\psi)^{-5}
$$

である。この座標の有限判別値は $z=1/3125$ である。一方、$z=0$ は有限な滑らかなファイバーを表さず、退化境界である。[前講の境界ファイバーの計算](../MIR1-06/index.md#prop-mir1-06-boundary)で得た特異な中心ファイバーに、滑らかなファイバーの周期の定義を直接適用してはならない。

さらに、この座標は $\psi$ を五乗根の位相倍だけ変えた違いを記録しない。したがって、$\psi$ 上で局所的に定めた周期を $z$ の単一値関数と解釈するには、対応するサイクルとファイバー同型による識別を別途指定する必要がある。

## 6. 何を規格化したのか、何をまだ規格化していないのか

本講で固定したのは、斉次式 $F_\psi$、分子 $\Omega$、局所留数に使う $df/f$ を左に置く符号、および正向き法円に対応する $1/(2\pi i)$ の四つである。

一方で、特定の積分サイクルや整数周期基底は**未選択**である。$\omega_\psi$ 自体を定数倍すれば全周期が同じだけ定数倍され、サイクルの整数基底を替えると周期の組が整数行列で混ざる。さらに[位相群不変性](../MIR1-04/index.md#prop-mir1-04-residue-invariant)により $\omega_\psi$ は $G$ 不変だが、元の滑らかな $X_\psi$ の3サイクルと、特異な商のcrepant解消 $Y_\psi$ の積分3サイクルを無条件に同一視することはできない。[解消の存在とHodge数](../MIR1-05/index.md#thm-mir1-05-external-input)は別の数学的入力である。

次講では、このように局所的に運んだサイクルと周期の微分を、Gauss–Manin接続およびHodge構造の変動として整理する。その先で二重極を低減して Picard–Fuchs 方程式を得る。

## 7. 演習：留数の符号から周期の変動まで

### Level A：一つの条件を自分で確認する

<a id="ex-mir1-07-a01"></a>
#### MIR1-07-A01 射影的な次数を照合する
- Level: A

$\Omega=\sum_{i=0}^4(-1)^ix_i\,dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4$ と、次数 $d$ の斉次多項式 $F$ について、$x\mapsto\lambda x$ の下で $\Omega/F$ が何倍されるか求めよ。$d=5$ と $d=4$ を比較せよ。

<!-- solution-start -->
**詳細解答。** $\Omega$ の各項には一つの $x_i$ と四つの $dx_j$ があるので $\lambda^{1+4}=\lambda^5$ 倍される。$F$ は $\lambda^d$ 倍だから

$$
\frac{\Omega}{F}\longmapsto
\lambda^{5-d}\frac{\Omega}{F}.
$$

$d=5$ では倍率1で、代表元を替えても不変である。$d=4$ では倍率 $\lambda$ が残り、同じ分子の比は射影的な有理4形式にはならない。これは[標準束の次数判定](../../CYG/CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)の $\mathcal O_X(d-5)$ と整合する。
<!-- solution-end -->

<a id="ex-mir1-07-a02"></a>
#### MIR1-07-A02 消去座標と非消失係数
- Level: A

$\psi\in U$、$f_\psi=1+\sum_{j=1}^4y_j^5-5\psi y_1y_2y_3y_4$ とする。点 $(0,0,0,-1)$ が $f_\psi=0$ に属することを示し、$y_4$ 消去による留数の値と正則性を求めよ。

<!-- solution-start -->
**詳細解答。** この点では $\sum y_j^5=-1$、四変数の積は零なので $f_\psi=1-1=0$ である。偏微分は

$$
f_4=5y_4^4-5\psi y_1y_2y_3=5.
$$

$5\ne0$ なので[局所正則随伴形式の座標構成](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)により $y_1,y_2,y_3$ が正則局所座標になる。[消去方向の公式](#prop-mir1-07-local-form)で $j=4$ を選ぶと符号は $(-1)^3=-1$、従って

$$
\omega_\psi|_p=-\frac15\,dy_1\wedge dy_2\wedge dy_3.
$$

係数は非零で、その近傍でも分母 $f_4$ は非零を保つため正則な非消失3形式になる。ただし $\psi\notin U$ ではこの一点での計算だけから大域的非消失性を結論できない。
<!-- solution-end -->

<a id="ex-mir1-07-a03"></a>
#### MIR1-07-A03 消去変数の符号を求める
- Level: A

$\alpha=dy_1\wedge dy_2\wedge dy_3\wedge dy_4/f(y)$、$f_2\ne0$ とする。$df/f$ を左に置く留数規約の下で、$y_2$ を消去するときの留数3形式を求めよ。

<!-- solution-start -->
**詳細解答。** $df=\sum_j f_jdy_j$ とし、$dy_1\wedge dy_3\wedge dy_4$ を右に掛けると、$j\ne2$ は同じ微分の二重出現により消える。残る項は

$$
df\wedge dy_1\wedge dy_3\wedge dy_4
=f_2\,dy_2\wedge dy_1\wedge dy_3\wedge dy_4
=-f_2\,dy_1\wedge\cdots\wedge dy_4.
$$

従って $\alpha=(df/f)\wedge(-dy_1\wedge dy_3\wedge dy_4/f_2)$ であり、留数は

$$
-\frac{dy_1\wedge dy_3\wedge dy_4}{f_2}
$$

を $f=0$ に制限したものである。分母 $f_2$ の非零条件によって消去と割り算が正当化される。
<!-- solution-end -->

<a id="ex-mir1-07-a04"></a>
#### MIR1-07-A04 平面三次曲線でも留数を作る
- Level: A

$E=\{u^3+v^3+w^3=0\}\subset\mathbb P^2$、$w=1$ とする。$(u,v)=(0,-1)$ で、$du\wedge dv/(u^3+v^3+1)$ の留数を求めよ。分母に使う偏微分が零でないことを確かめよ。

<!-- solution-start -->
**詳細解答。** $f=u^3+v^3+1$ について $f(0,-1)=0$、$f_v=3v^2$、$f_v(0,-1)=3$ である。$df\wedge du=-f_v\,du\wedge dv$ より

$$
\frac{du\wedge dv}{f}
=\frac{df}{f}\wedge\left(-\frac{du}{f_v}\right).
$$

よって $\operatorname{Res}=-du/(3v^2)$、点での値は $-du/3$ で非零である。三次式と射影2形式はどちらも斉次次数3なので、射影的な貼り合わせにも適合する。
<!-- solution-end -->

### Level B：二つの概念をつなぐ

<a id="ex-mir1-07-b01"></a>
#### MIR1-07-B01 二つの消去座標の一致
- Level: B

$f=0\subset\mathbb C^4$ を滑らかな超曲面とし、$f_3f_4\ne0$ とする。$j=3$ の留数 $\eta_3=dy_1\wedge dy_2\wedge dy_4/f_3$ と、$j=4$ の留数 $\eta_4=-dy_1\wedge dy_2\wedge dy_3/f_4$ が $Tf=0$ 上で一致することを示せ。

<!-- solution-start -->
**詳細解答。** 超曲面の接空間で $df=0$、つまり

$$
f_1dy_1+f_2dy_2+f_3dy_3+f_4dy_4=0
$$

が成り立つ。$f_4\ne0$ を使って $dy_4$ を解き、$dy_1\wedge dy_2$ を左から掛ける。$dy_1$ または $dy_2$ を含む項は外積の交代性により消えるから

$$
dy_1\wedge dy_2\wedge dy_4
=-\frac{f_3}{f_4}dy_1\wedge dy_2\wedge dy_3.
$$

$f_3\ne0$ で割り、$\eta_3=\eta_4$ を得る。両偏微分が非零であることを使ったのは、それぞれの局所式と割り算の正当性である。
<!-- solution-end -->

<a id="ex-mir1-07-b02"></a>
#### MIR1-07-B02 法方向の向きと $2\pi i$
- Level: B

$\mathbb C^4$ で $\alpha=du\wedge dv\wedge dt\wedge dw/w$、$Q=[0,1]^3$（$u,v,t$ は実数）を考える。$w=\varepsilon e^{i\theta}$、$0\le\theta\le2\pi$ とし、向きを $(\theta,u,v,t)$ の順に取る。$S_\varepsilon^1\times Q$ 上で $\alpha$ を積分し、留数3形式を確かめよ。これは閉サイクルか。

<!-- solution-start -->
**詳細解答。** $dw/w=i\,d\theta$ であり、$dw$ を3つの微分の左に出す際の交換は3回だから

$$
\alpha=-\frac{dw}{w}\wedge du\wedge dv\wedge dt.
$$

積分の向きは法円が先なので

$$
\int_{S_\varepsilon^1\times Q}\alpha
=-\left(\int_0^{2\pi}i\,d\theta\right)
 \left(\int_0^1du\int_0^1dv\int_0^1dt\right)
=-2\pi i.
$$

従って留数は $-du\wedge dv\wedge dt$ で、その $Q$ 上の積分は $-1$。$Q$ は境界を持つので $S^1\times Q$ も閉サイクルではない。ここでは[管状サイクルの大域公式](#prop-mir1-07-tube)の局所的な符号と係数を検算した。
<!-- solution-end -->

<a id="ex-mir1-07-b03"></a>
#### MIR1-07-B03 微分で二重極が現れる
- Level: B

$F_\psi=\sum_{i=0}^4x_i^5-5\psi P$、$P=\prod_ix_i$ とし、ある固定されたコンパクトな管状4サイクル $T_0$ が $\psi_0$ の近くで常に $X_\psi$ と交わらないと仮定する。

1. $\partial_\psi(\Omega/F_\psi)$ を計算せよ。
2. $\Pi(\psi)=(2\pi i)^{-1}\int_{T_0}\Omega/F_\psi$ の導関数を書け。
3. なぜ単純極用の局所留数を二重極へそのまま適用してはいけないか説明せよ。

<!-- solution-start -->
**詳細解答。** $\partial_\psi F_\psi=-5P$ なので、商の微分から

$$
\partial_\psi\left(\frac{\Omega}{F_\psi}\right)
=-\frac{\Omega}{F_\psi^2}(-5P)
=\frac{5P\Omega}{F_\psi^2}.
$$

$T_0$ はコンパクトで各 $\psi$ の零集合に交わらない。小さなパラメータ円板を閉円板に縮めれば分母はその直積上で一様に零から離れ、微分と積分を交換できる。よって

$$
\Pi'(\psi)=\frac1{2\pi i}\int_{T_0}
\frac{5P\Omega}{F_\psi^2}.
$$

[留数の定義](#def-mir1-07-residue-form)が直接与えるのは $(df/f)\wedge\beta$ の単純極の係数である。$1/F_\psi^2$ は二重極でその形ではない。従って上の式は正しいが、右辺をそのまま「$\operatorname{Res}(5P\Omega/F_\psi^2)$ の通常の局所公式」とするのは飛躍である。
<!-- solution-end -->

<a id="ex-mir1-07-b04"></a>
#### MIR1-07-B04 判別点と境界を取り違えない
- Level: B

$z=(5\psi)^{-5}$（$\psi\ne0$）とする。$\psi=1$、$\psi=2$、$\psi=0$ のそれぞれについて、ファイバーの滑らかさと $z$ での記述を判定し、$z=0$ に本講の滑らかな周期の命題を適用できるか論ぜよ。

<!-- solution-start -->
**詳細解答。** [滑らかさの命題](../MIR1-06/index.md#prop-mir1-06-smooth-locus)では条件は $\psi^5\ne1$ である。$\psi=1$ は特異で、その座標は $z=1/5^5=1/3125$。$\psi=2$ は $2^5=32\ne1$ で滑らか、その座標は $z=1/10^5=1/100000$。$\psi=0$ はFermat型で滑らかだが、$z=(5\psi)^{-5}$ は定義されず、$z=\infty$ の側に対応する。

$z=0$ は有限 $\psi$ からは得られず、$\psi\to\infty$ の退化境界である。[境界の中心ファイバー](../MIR1-06/index.md#prop-mir1-06-boundary)は滑らかな射影三次元多様体ではないので、[周期の局所正則性](#prop-mir1-07-period-holomorphic)の滑らかな固有沈め込みという条件はそこで満たされない。
<!-- solution-end -->

### Level C：留数の構成から周期微分まで

<a id="ex-mir1-07-c01"></a>
#### MIR1-07-C01 Dwork族で何が正当化されるか
- Level: C

$\psi_0^5\ne1$、$F_\psi=\sum x_i^5-5\psi\prod x_i$、$\Omega=\sum_i(-1)^ix_i\,dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4$ とする。

1. $\Omega/F_\psi$ が射影的な有理4形式であり、$X_{\psi_0}$ の上に非消失の留数正則3形式が定まる理由を示せ。
2. $x_0=1$ で $f_4\ne0$ の部分の留数を符号込みで求めよ。
3. $[\gamma]\in H_3(X_{\psi_0},\mathbb Z)$ を小円板上で滑らかに運ぶとき、対応する周期の管状積分表示と $\psi$ 微分を示せ。
4. $\psi^5=1$、$z=0$、群商 $X_\psi/G$ について、上の推論を無条件に再利用できない理由をそれぞれ述べよ。

<!-- solution-start -->
**詳細解答。** まず $\Omega$ の一項は座標1個・微分4個なので斉次次数5である。$F_\psi$ も五次で、共通拡大 $x\mapsto\lambda x$ の倍率はともに $\lambda^5$。また $\Omega$ は径方向の収縮なので水平であり、比は射影的に定まる。

$\psi_0^5\ne1$ では[滑らかさの命題](../MIR1-06/index.md#prop-mir1-06-smooth-locus)より全点で斉次偏微分が同時に零とはならない。射影チャートでEulerの式を使えば、ある消去偏微分が非零である。従って各点で[局所正則随伴形式の座標構成](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)を用いて三つの正則局所座標を選べ、分母が非零な留数の局所式を得る。貼り合わせは[局所正則随伴形式](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)によって保証され、係数も非零だから大域的な非消失3形式となる。

$x_0=1$ では $\Omega/F_\psi=dy_1\wedge\cdots\wedge dy_4/f_\psi$。$df_\psi\wedge dy_1\wedge dy_2\wedge dy_3=-f_4dy_1\wedge\cdots\wedge dy_4$ より

$$
\omega_\psi=-\frac{dy_1\wedge dy_2\wedge dy_3}{f_4},
\qquad f_4=5y_4^4-5\psi y_1y_2y_3,
$$

を $f_\psi=0$ に制限する。$f_4\ne0$ が局所正則性と可逆な消去の条件である。

次に $\psi_0$ の周りの小円板 $D\subset U$ で、滑らかでコンパクトなファイバーの局所自明化を使い $[\gamma]$ を運ぶ。小さな固定管状サイクル $T_0$ はパラメータを縮めれば全 $X_\psi$ を避け、[管状留数公式](#prop-mir1-07-tube)により

$$
\Pi(\psi)=\int_{\gamma(\psi)}\omega_\psi
=\frac1{2\pi i}\int_{T_0}\frac{\Omega}{F_\psi}.
$$

固定コンパクト積分領域上で $F_\psi$ は一様に零から離れているので微分交換でき、$\partial_\psi F_\psi=-5P$ を代入すれば

$$
\Pi'(\psi)=\frac1{2\pi i}\int_{T_0}
\frac{5P\Omega}{F_\psi^2}.
$$

ここで得たのは二重極の**管状積分**であって、単純極の局所留数表示を二重極に代入したものではない。

最後に適用範囲を分ける。$\psi^5=1$ では元の $X_\psi$ に特異点が生じ、少なくとも一部で消去偏微分が全て零になり、滑らかな自明化が壊れる。$z=0$ は有限 $\psi$ の滑らかなファイバーを表さず、退化境界である。[前講の境界計算](../MIR1-06/index.md#prop-mir1-06-boundary)が示すように、同じ滑らかな局所周期論は直接は適用できない。最後に群商 $X_\psi/G$ は、元の $X_\psi$ が滑らかでも固定点の像で特異になる。[位相群不変性](../MIR1-04/index.md#prop-mir1-04-residue-invariant)は形式の保存を保証するが、商・解消後の整数3サイクルを元のものと同一視する保証はしない。$\square$
<!-- solution-end -->

---

**参考文献**：[P. Griffiths, *On the Periods of Certain Rational Integrals*（Annals of Mathematics, 1969）](https://doi.org/10.2307/1970718)、[K. Hori ほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)。本講の局所符号・周期の正則性・演習の計算は提示した規約で検証した。