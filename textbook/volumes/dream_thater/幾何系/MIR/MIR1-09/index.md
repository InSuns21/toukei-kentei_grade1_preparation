# MIR1-09 Griffiths–Dworkの極次数低減

<!-- definition-example-audit: strict -->

## 1. 周期を四回微分したあと、どこで止めるか

[前講の高次微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)によって、Dwork型五次超曲面の周期を $\psi$ で $k$ 回微分すると、分母に $F_\psi^{k+1}$ が現れる。微分のたびに極が高くなるだけなら、有限階の微分方程式を具体的に求める方法が見えない。

本講では、偏微分 $\partial F_\psi/\partial x_i$ を含む分子は、**全微分**を差し引くと極の次数を一つ下げられることを証明する。この操作がGriffiths–Dworkの極次数低減である。「全微分」はある3形式の外微分 $d\Phi$ のことで、閉じた4サイクル上では積分が零になる。多項式の恒等式を積分の恒等式へ移す際、この条件を確認する。

記号は前講と同じく、$\psi\in U=\{\psi\in\mathbb C:\psi^5\ne1\}$ とし、

$$
F_\psi(x)=\sum_{i=0}^4x_i^5-5\psi P(x),\qquad
P(x)=\prod_{i=0}^4x_i,\qquad
X_\psi=\{F_\psi=0\}\subset\mathbb P^4_{\mathbb C}
$$

と置く。$x=(x_0,\ldots,x_4)$ は斉次座標であり、$\partial_i$ は **$\psi$ と他の $x_j$ を固定した** $x_i$ 偏微分を表す。また

$$
\Omega=\sum_{i=0}^4(-1)^ix_i\,
dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4
$$

を用いる。$\widehat{dx_i}$ はその因子を省いた意味である。[Dwork族の滑らかさの判定](../MIR1-06/index.md#prop-mir1-06-smooth-locus)により $U$ 上の各 $X_\psi$ は滑らかであり、[管状サイクルの留数公式](../MIR1-07/index.md#prop-mir1-07-tube)から、閉4サイクル $T\subset\mathbb P^4\setminus X_\psi$ で $\int_T\Omega/F_\psi$ を考えられる。

## 2. Jacobianイデアルは何を記録するか

分子を偏微分で割ろうとする前に、どの多項式を「偏微分で作れる」と呼ぶか固定する。複素係数多項式環 $S=\mathbb C[x_0,\ldots,x_4]$ の**イデアル**とは、加法で閉じ、任意の $S$ の元を掛けてもその中に留まる部分集合である。例えば $(x_0^4,\ldots,x_4^4)$ は、各 $x_i^4$ に任意の多項式を掛けたものの有限和全体である。

<a id="def-mir1-09-jacobian-ideal"></a>

<!-- formal-statement-start -->
> **定義（Dwork五次のJacobianイデアル）**
>
> $\psi\in\mathbb C$ を固定し、$S=\mathbb C[x_0,\ldots,x_4]$ とする。斉次五次式 $F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_{i=0}^4x_i$ のJacobianイデアルを

$$
J(F_\psi)=(\partial_0F_\psi,\ldots,\partial_4F_\psi)
=\left\{\sum_{i=0}^4B_i\partial_iF_\psi:B_i\in S\right\}
$$

> と定める。その元 $A$ は、偏微分 $\partial_iF_\psi$ の多項式係数線形結合として書ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-09-jacobian-ideal -->

**定義の確認**（Jacobianイデアルへの所属を直接確かめる）。 各偏微分は

$$
\partial_iF_\psi
=5x_i^4-5\psi\prod_{j\ne i}x_j.
$$

したがって $x_0\partial_0F_\psi$ は $J(F_\psi)$ の元である。$\psi=0$ なら $J(F_0)=(x_0^4,\ldots,x_4^4)$ となり、$x_0^4x_1$ は $x_0^4$ の倍数だから属する。一方、$P=x_0x_1x_2x_3x_4$ の各変数の指数は $1$ なので、指数が $4$ 以上の変数を必ず含むこのイデアルのどの単項式の線形結合にもならず、$P\notin J(F_0)$ である。

<!-- definition-example-end -->

この判定は単に多項式の割り算をしている。**$A\in J(F_\psi)$ と $A=0$ は違う。** 後で消えるのは $A$ そのものではなく、適切な極を持つ有理微分形式を積分したときの高い極の成分である。

## 3. 射影空間に降りる有理4形式と極次数

$\mathbb C^5\setminus\{0\}$ で $(x_0,\ldots,x_4)$ を同時に $\lambda$ 倍しても、射影点は変わらない。$\Omega$ は $x_i$ を一つ、$dx_j$ を四つ含むので $\lambda^5$ 倍され、$F_\psi$ は $\lambda^5$ 倍される。したがって、分子が斉次次数 $5(k-1)$ の多項式 $A$ なら $A\Omega/F_\psi^k$ は $\lambda^{5(k-1)+5-5k}=1$ 倍となる。

ただし、斉次重みが零という条件だけでは、微分形式が射影空間へ降りることはまだ分からない。実際に座標表示を確認する。$x_0\ne0$ のチャートで、$t=x_0$、$y_j=x_j/x_0$（$j=1,\ldots,4$）と置けば、$x=(t,ty_1,\ldots,ty_4)$ である。このとき

$$
dx_0\wedge\cdots\wedge dx_4
=t^4\,dt\wedge dy_1\wedge\cdots\wedge dy_4.
$$

$$
\Omega=t^5\,dy_1\wedge\cdots\wedge dy_4.
$$

後者は $\Omega$ の定義に代入して展開すれば得られ、スケール方向の $dt$ が残らないことも示している。$f_\psi(y)=F_\psi(1,y)$ と置くと、$F_\psi(t,ty)=t^5f_\psi(y)$ だから

$$
\frac{A(t,ty)\Omega}{F_\psi(t,ty)^k}
=\frac{t^{5(k-1)}A(1,y)\,t^5}
{t^{5k}f_\psi(y)^k}\,
dy_1\wedge\cdots\wedge dy_4
=\frac{A(1,y)}{f_\psi(y)^k}\,
dy_1\wedge\cdots\wedge dy_4.
$$

$t$ が消えて射影座標 $y$ だけの形式になった。貼り合わせも、隣のチャートで符号と次数を実際に検査できる。$x_0x_1\ne0$ の重なりで、$x_1\ne0$ の座標を $z_0=x_0/x_1=1/y_1$、$z_j=x_j/x_1=y_j/y_1$（$j=2,3,4$）とすると、

$$
dz_0\wedge dz_2\wedge dz_3\wedge dz_4
=-y_1^{-5}\,dy_1\wedge dy_2\wedge dy_3\wedge dy_4.
$$

斉次次数が $5$ と $5(k-1)$ であることから、それぞれ

$$
F_\psi(z_0,1,z_2,z_3,z_4)=y_1^{-5}f_\psi(y),
$$

$$
A(z_0,1,z_2,z_3,z_4)=y_1^{-5(k-1)}A(1,y)
$$

となる。$x_1\ne0$ のチャートでは $\Omega=-x_1^5\,dz_0\wedge dz_2\wedge dz_3\wedge dz_4$ なので、先頭の負号と座標変換の負号が相殺され、$A\Omega/F_\psi^k$ の表示は上の $x_0\ne0$ の表示に一致する。同じ理由で他のチャートでも一致する。これで、次数条件から射影上の有理4形式を作るまでの橋渡しができた。

<a id="def-mir1-09-pole-form"></a>

<!-- formal-statement-start -->
> **定義（射影五次に沿う有理4形式の極次数）**
>
> $\psi\in\mathbb C$ に対し、次の斉次五次式をとる。

$$
F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_{i=0}^4x_i.
$$

> 整数 $k\ge1$ と斉次次数 $5(k-1)$ の多項式 $A\in\mathbb C[x_0,\ldots,x_4]$ を選ぶ。$V_\psi=\mathbb P^4_{\mathbb C}\setminus\{F_\psi=0\}$ 上の有理4形式を

$$
\alpha_{k,A}=\frac{A\Omega}{F_\psi^k}
$$

> と書く。分母の指数 $k$ を、この表示の極次数と呼ぶ。これは表示についての呼び名であり、分子と分母に共通因子があれば実際の極は低くなる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-09-pole-form -->

**定義の確認**（次数と射影への降下の直接例）。 $k=1$ なら $\deg A=0$ なので $A=1$ を選べる。$k=2$ なら $\deg A=5$ なので $A=x_0^5$ や $A=P$ が許される。$k=3$ なら $\deg A=10$ なので $A=P^2$ が許される。いずれも分子と $\Omega$ の全次数が分母の全次数に一致する。上の座標表示で $\nu=dy_1\wedge\cdots\wedge dy_4$、$q(y)=y_1y_2y_3y_4$ と置くと、それぞれの局所表示は

$$
\alpha_{1,1}=\frac{\nu}{f_\psi},\qquad
\alpha_{2,P}=\frac{q(y)\nu}{f_\psi^2},\qquad
\alpha_{3,P^2}=\frac{q(y)^2\nu}{f_\psi^3}.
$$

どの場合もスケール変数 $t$ は残らず、射影上の形式としての条件も確認できる。

<!-- definition-example-end -->

異なる極次数の形式について、$V_\psi$ 上で

$$
\alpha\equiv\beta\pmod{d}
\quad\Longleftrightarrow\quad
\alpha-\beta=d\Phi
$$

となる有理3形式 $\Phi$ が $V_\psi$ 上に存在するとき、**全微分を除いて等しい**と書く。区分的に滑らかでコンパクトな閉4サイクル $T\subset V_\psi$ の各向き付けられた4片へ[一般Stokes公式](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用し、内部の境界寄与を相殺すると

$$
\int_T\alpha-\int_T\beta
=\int_Td\Phi=\int_{\partial T}\Phi=0
$$

となる。$\partial T=0$ が効くのであり、境界のある鎖では同じ結論を保証しない。

## 4. 全微分を作って極を一段低減する

ここからが核心である。$\Omega$ を別の記法で書くため、

$$
\mathrm{vol}=dx_0\wedge dx_1\wedge dx_2\wedge dx_3\wedge dx_4,\qquad
E=\sum_{i=0}^4x_i\partial_i
$$

と置く。$E$ は各座標を同じ比率で拡大する**Eulerベクトル場**である。微分形式の**内部積** $\iota_E$ は、4形式なら最初の引数へ $E$ を代入して3形式にする操作で、交代性から $\iota_E\iota_E=0$ となる。$\Omega=\iota_E\mathrm{vol}$ である。

<a id="prop-mir1-09-pole-reduction"></a>

<!-- formal-statement-start -->
> **命題（Griffiths–Dworkの極次数低減公式）**
>
> $\psi\in\mathbb C$、$k\ge2$ とする。$F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_{i=0}^4x_i$ に対して、各 $B_i\in\mathbb C[x_0,\ldots,x_4]$ を斉次次数 $5k-9$ の多項式とし、$A=\sum_{i=0}^4B_i\partial_iF_\psi$ と置く。すると $A$ の次数は $5(k-1)$ であり、$V_\psi=\mathbb P^4\setminus\{F_\psi=0\}$ 上で

$$
\frac{A\Omega}{F_\psi^k}
\equiv
\frac{1}{k-1}
\frac{\left(\sum_{i=0}^4\partial_iB_i\right)\Omega}
{F_\psi^{k-1}}
\pmod{d}
$$

> が成り立つ。従って、$V_\psi$ 内の任意の閉4サイクル $T$ に関する両辺の積分は等しい。$\partial_i$ は $x_i$ に関する偏微分で、$\psi$ は固定する。
<!-- formal-statement-end -->

### 証明の見取り図

$\sum_iB_i\partial_iF_\psi$ に分母を掛けた式を直接積分せず、まずアフィン錐に4形式を作る。外微分の積の規則で分母を微分すると、目的の高次極が出る。次にEulerベクトル場で縮約して射影空間に降ろす。最後に[一般Stokes公式](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を閉4サイクルに適用して全微分の積分を消す。周期に使う管状4サイクルの由来は[管状サイクルの留数公式](../MIR1-07/index.md#prop-mir1-07-tube)である。

<!-- proof-start -->
### 証明

$\widehat{dx_i}$ は第 $i$ 因子の省略として、$\mathbb C^5\setminus\{0\}$ 上に

$$
\eta_B=\sum_{i=0}^4(-1)^i
\frac{B_i}{F_\psi^{k-1}}\,
dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4
$$

を置く。$\deg B_i=5k-9$ なので、各項は座標を $\lambda$ 倍すると $\lambda^{(5k-9)+4-5(k-1)}=\lambda^0$ 倍となる。よって $\eta_B$ は斉次重み零である。

次に外微分する。第 $i$ 項では $d(B_i/F_\psi^{k-1})$ のうち $dx_i$ 成分だけが残る。$dx_i$ を第 $i$ 位置へ戻す符号 $(-1)^i$ は表示の $(-1)^i$ と打ち消し合う。商の微分を展開して

$$
\partial_i\left(\frac{B_i}{F_\psi^{k-1}}\right)
=\frac{\partial_iB_i}{F_\psi^{k-1}}
-(k-1)\frac{B_i\partial_iF_\psi}{F_\psi^k}
$$

を得る。従って

$$
d\eta_B=
\left[
\frac{\sum_i\partial_iB_i}{F_\psi^{k-1}}
-(k-1)\frac{\sum_iB_i\partial_iF_\psi}{F_\psi^k}
\right]\mathrm{vol}.
$$

$\Phi_B=-\iota_E\eta_B$ と置く。内部積を二度取ると零だから $\iota_E\Phi_B=0$ であり、$\eta_B$ の重みが零なので $\Phi_B$ も重み零である。二条件が射影への降下を保証する理由も確かめる。$x_0=t\ne0$ のチャートでは $E=t\partial/\partial t$ である。3形式 $\Phi_B$ の $dt$ を含む部分を $dt\wedge\sum_Jc_J(t,y)dy_J$、含まない部分を $\sum_Ia_I(t,y)dy_I$ と書く（$J$ は2個、$I$ は3個の $y$ 添字の組）。$\iota_E\Phi_B=0$ より $t c_J=0$、従って $c_J=0$ であり、重み零より $t\,\partial a_I/\partial t=0$ だから $a_I$ は $y$ のみの関数になる。他のチャートでも同じ理由が成り立つので、$\Phi_B$ は射影空間上の有理3形式として貼り合わさる。特に $V_\psi$ では分母が零にならず正則である。

ここで外微分と内部積の関係を、この場合に直接確かめる。$\eta_B$ の各項を $h\,dx_{i_1}\wedge\cdots\wedge dx_{i_4}$ と書き、$h=B_i/F_\psi^{k-1}$ とする。単項式 $x_0^{a_0}\cdots x_4^{a_4}$ に $E=\sum_jx_j\partial_j$ を作用させると、各偏微分の寄与を足して $(\sum_j a_j)x_0^{a_0}\cdots x_4^{a_4}$ となる。従って斉次性と商の微分則から

$$
E(B_i)=(5k-9)B_i,\qquad E(F_\psi)=5F_\psi,
$$

$$
E(h)=\frac{(5k-9)B_i}{F_\psi^{k-1}}
-\frac{5(k-1)B_i}{F_\psi^{k-1}}
=-4h.
$$

ここで $\sigma=dx_{i_1}\wedge\cdots\wedge dx_{i_4}$ とおくと、

$$
\iota_E\sigma
=\sum_{a=1}^4(-1)^{a-1}x_{i_a}\,
dx_{i_1}\wedge\cdots\wedge\widehat{dx_{i_a}}\wedge\cdots\wedge dx_{i_4}.
$$

各項を外微分すると、$dx_{i_a}$ を元の位置へ戻す符号が $(-1)^{a-1}$ と打ち消されるから、$d(\iota_E\sigma)=4\sigma$ となる。内部積の積の規則 $\iota_E(dh\wedge\sigma)=E(h)\sigma-dh\wedge\iota_E\sigma$ と合わせれば

$$
d\iota_E(h\sigma)+\iota_Ed(h\sigma)
=(E(h)+4h)\sigma=0.
$$

全項に足すと $d\iota_E\eta_B=-\iota_Ed\eta_B$ が得られる。これは重み零の形式に対するCartanの公式を直接計算したものなので、$\Phi_B=-\iota_E\eta_B$ について

$$
d\Phi_B=-d(\iota_E\eta_B)
=\iota_E(d\eta_B).
$$

先ほどの $d\eta_B$ に代入し、$\iota_E\mathrm{vol}=\Omega$ を使うと

$$
d\Phi_B=
\frac{\left(\sum_i\partial_iB_i\right)\Omega}{F_\psi^{k-1}}
-(k-1)\frac{A\Omega}{F_\psi^k}.
$$

$k-1\ne0$ なので項を移せば

$$
\frac{A\Omega}{F_\psi^k}
=\frac{1}{k-1}
\frac{\left(\sum_i\partial_iB_i\right)\Omega}{F_\psi^{k-1}}
-\frac{1}{k-1}d\Phi_B.
$$

右端は全微分である。閉4サイクル $T\subset V_\psi$ は境界を持たず、$\Phi_B$ は $T$ 上で定義されるので、[一般Stokes公式](../../GEO/GEO8/index.md#thm-geo8-general-stokes)によりその積分は零である。これが主張である。$\square$
<!-- proof-end -->

この証明では **$F_\psi$ が滑らかという仮定は代数恒等式そのものには不要**である。一方、滑らかな三次元ファイバーの周期・Gauss–Manin接続として解釈する際には $\psi^5\ne1$ を使う。また $A$ がJacobianイデアルに属するだけでなく、**その極次数に合った次数の** $B_i$ を選ぶ必要がある。斉次な $A$ なら、各 $B_i$ の該当する斉次部分だけを取ればよい。

## 5. 二重極を実際に低減する

<a id="prop-mir1-09-second-pole"></a>

<!-- formal-statement-start -->
> **命題（Dwork五次の二重極の低減）**
>
> $\psi\in\mathbb C$、$F_\psi=\sum_{i=0}^4x_i^5-5\psi P$、$P=\prod_{i=0}^4x_i$ とすると、$V_\psi=\mathbb P^4\setminus\{F_\psi=0\}$ 上で

$$
\frac{x_0^5\Omega}{F_\psi^2}
\equiv
\psi\frac{P\Omega}{F_\psi^2}
+\frac{1}{5}\frac{\Omega}{F_\psi}
\pmod{d}
$$

> が成り立つ。等号は多項式の等号ではなく、全微分を除いた有理4形式の関係である。
<!-- formal-statement-end -->

### 証明の見取り図

偏微分 $\partial_0F_\psi$ を書き、$x_0$ を掛けて分子にある $x_0^5$ を取り出す。次に[極次数低減公式](#prop-mir1-09-pole-reduction)を $k=2$ に適用して分母の次数を一段下げる。

<!-- proof-start -->
### 証明

偏微分を計算すると

$$
x_0\partial_0F_\psi=5x_0^5-5\psi P.
$$

$k=2$ では $B_0=x_0$、$B_1=\cdots=B_4=0$ は次数 $5k-9=1$ を満たす。$\sum_i\partial_iB_i=\partial_0x_0=1$ だから、[極次数低減公式](#prop-mir1-09-pole-reduction)より

$$
\frac{(5x_0^5-5\psi P)\Omega}{F_\psi^2}
\equiv\frac{\Omega}{F_\psi}.
$$

両辺を $5$ で割り、$\psi P$ の項を右辺へ移せば求める式となる。$\square$
<!-- proof-end -->

**もう一つの直接例（消える項）。** Fermat点 $\psi=0$ では、$A=x_0^4x_1$ と $B_0=x_1/5$、他を零と取れば $A=B_0\partial_0F_0$ である。ところが $\partial_0B_0=0$ だから、公式は

$$
\frac{x_0^4x_1\,\Omega}{F_0^2}\equiv0\pmod{d}
$$

を与える。$A\ne0$ にもかかわらず閉4サイクルの積分は零になる。これが「Jacobianイデアルの項を低減する」ことと、「多項式を零と置く」ことの違いである。

## 6. 四回微分で出る五重極が本当に減るか

[前講の微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)で $k=4$ とすると、周期の第四導関数には $P^4\Omega/F_\psi^5$ が現れる。分子 $P^4$ の次数は $20$ で、五重極に必要な $5(5-1)=20$ と一致する。これをJacobianイデアルで表せれば、五重極を四重極へ下げられる。

求める表示を単に「存在する」とせず、実際に作る。$r=0,1,\ldots,5$ について次の単項式を導入する。空積は $1$ とする。

$$
m_r=
\left(\prod_{i<r}x_i^{r-1}\right)
\left(\prod_{i\ge r}x_i^{4+r}\right).
$$

$r=0$ では前半が空積で $m_0=P^4$、$r=5$ では後半が空積で $m_5=P^4$ となる。中間の例は

$$
m_1=x_1^5x_2^5x_3^5x_4^5,\qquad
m_2=x_0x_1x_2^6x_3^6x_4^6.
$$

各段階で $x_r^4$ を $\psi\prod_{j\ne r}x_j$ に取り替えると、余りは $\partial_rF_\psi/5$ の倍数になる。

<a id="prop-mir1-09-fifth-pole"></a>

<!-- formal-statement-start -->
> **命題（Dwork五次の五重極の一段低減）**
>
> $\psi\in\mathbb C$、$\psi^5\ne1$ とし、$F_\psi=\sum_{i=0}^4x_i^5-5\psi P$、$P=\prod_{i=0}^4x_i$ とする。$r=0,\ldots,4$ に対し

$$
B_r=\frac15
\left(\prod_{i<r}x_i^{r-1}\right)x_r^r
\left(\prod_{i>r}x_i^{4+r}\right)
$$

> と定める。このとき各 $B_r$ は次数 $16$ の斉次多項式であり、$V_\psi$ 上で

$$
\frac{P^4\Omega}{F_\psi^5}
\equiv
\frac{\left(\sum_{r=0}^4\psi^r\partial_rB_r\right)\Omega}
{4(1-\psi^5)F_\psi^4}
\pmod{d}
$$

> が成り立つ。従って滑らかなDworkファイバーの周期の第四導関数に生じる五重極は、四重極の積分で表せる。
<!-- formal-statement-end -->

### 証明の見取り図

各 $m_r$ に対して $m_r-\psi m_{r+1}=B_r\partial_rF_\psi$ を確かめる。$\psi^r$ を掛けて五本足し合わせれば途中の $m_r$ が消え、$(1-\psi^5)P^4$ だけが残る。最後に[極次数低減公式](#prop-mir1-09-pole-reduction)を $k=5$ に適用する。

<!-- proof-start -->
### 証明

まず $r\in\{0,\ldots,4\}$ を固定する。$F_\psi$ の偏微分を $B_r$ に掛けると

$$
B_r\partial_rF_\psi
=\left(\prod_{i<r}x_i^{r-1}\right)x_r^r
\left(\prod_{i>r}x_i^{4+r}\right)
\left(x_r^4-\psi\prod_{j\ne r}x_j\right).
$$

最初の項は各変数の指数が $i<r$ で $r-1$、$i\ge r$ で $4+r$ だから $m_r$ に等しい。第二項では、$i<r$ の指数は $r$、$i\le r$ の $x_r$ の指数は $r$、$i>r$ の指数は $5+r$ となり、これは $m_{r+1}$ である。従って

$$
m_r-\psi m_{r+1}=B_r\partial_rF_\psi.
$$

この式に $\psi^r$ を掛け $r=0$ から $4$ まで足す。隣り合う中間項は一つずつ相殺されるから

$$
\sum_{r=0}^4\psi^rB_r\partial_rF_\psi
=\sum_{r=0}^4(\psi^rm_r-\psi^{r+1}m_{r+1})
=m_0-\psi^5m_5
=(1-\psi^5)P^4.
$$

$1-\psi^5\ne0$ なので、$A=P^4$ を

$$
P^4=\sum_{r=0}^4
\frac{\psi^rB_r}{1-\psi^5}\,\partial_rF_\psi
$$

と表せる。$B_r$ の次数は $r(r-1)+r+(4-r)(4+r)=16$ で、$k=5$ に必要な $5k-9=16$ と一致する。[極次数低減公式](#prop-mir1-09-pole-reduction)の $k-1=4$ を代入すると主張の式が得られる。偏微分 $\partial_r$ では $\psi$ を固定するため、$\partial_r(\psi^r B_r)=\psi^r\partial_rB_r$ である。$\square$
<!-- proof-end -->

実際に右辺の多項式を微分すると、$r=0$ の項は $B_0$ が $x_0$ に依存しないため消え、

$$
\sum_{r=0}^4\psi^r\partial_rB_r
=\frac15\left(
\psi x_2^5x_3^5x_4^5
+2\psi^2x_0x_1x_2x_3^6x_4^6
+3\psi^3x_0^2x_1^2x_2^2x_3^2x_4^7
+4\psi^4P^3
\right).
$$

各項は次数 $15$ で、四重極の分子に必要な $5(4-1)=15$ と一致する。$\psi=0$ なら右辺全体が零になり、Fermat点では五重極の該当類が全微分になることも確かめられる。

周期 $\Pi(\psi)=(2\pi i)^{-1}\int_T\Omega/F_\psi$ を、$T$ を固定できる小円板内で考える。[高次微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)の $k=4$ より

$$
\Pi^{(4)}(\psi)=\frac{4!\,5^4}{2\pi i}
\int_T\frac{P^4\Omega}{F_\psi^5}.
$$

従ってこの右辺は上記の四重極で置き換えられる。ただし、これ**だけ**でPicard–Fuchs作用素の全係数を求めたことにはならない。低い次数の極も引き続き同じ方法で整理し、$\psi$ から $z=(5\psi)^{-5}$ へ座標を変える計算は次講で行う。

**適用範囲を確かめる。** $\psi^5=1$ では構成した表示を $1-\psi^5$ で割れない。[判別点の判定](../MIR1-06/index.md#prop-mir1-06-smooth-locus)でも $X_\psi$ が特異になる。この二つは整合しているが、分母に現れた因子だけで特異点の性質や微分方程式の特異点の種類まで決めてはいけない。また $z=0$ は $\psi=\infty$ の境界であり、この有限 $\psi$ における証明へ直接代入できない。

## 7. なぜ境界と次数を無視できないか

「全微分だから積分は零」は、**閉じた**サイクルで成立する。例えば複素平面の座標を $t$ とし、$0$ を通らない滑らかな道 $\gamma$ を $t=t(s)$（$0\le s\le1$、$t(0)=a\ne0$、$t(1)=b\ne0$）と書く。このとき $dt=t'(s)\,ds$ であり、連鎖律から

$$
\int_\gamma d(t^{-1})
=\int_0^1-\frac{t'(s)}{t(s)^2}\,ds
=\left[\frac1{t(s)}\right]_{s=0}^{s=1}
=\frac1b-\frac1a
$$

となり、一般には零でない。高次極の項を捨てられる理由は、[前講の閉じた管状4サイクル](../MIR1-07/index.md#prop-mir1-07-tube)を使い、外微分した3形式がそのサイクル上で定義されているためである。

また係数 $B_i$ の斉次次数を勝手に変えると、$\Phi_B=-\iota_E\eta_B$ が射影空間上で重み零にならない。アフィン座標で形式的な等式が書けても、それを射影超曲面の周期へそのまま適用するのは誤りである。前節の次数 $16\to15$ の確認は、単なる見栄えではなくこの貼り合わせ条件を確かめている。

## 8. 演習：偏微分・全微分・周期を結ぶ

### Level A：一つの操作を確実にする

<a id="ex-mir1-09-a01"></a>
#### MIR1-09-A01 極次数と斉次次数
- Level: A

斉次五次式 $F$ に沿う $A\Omega/F^k$ が射影空間上で定義されるとする。$k=1,2,3,5$ の各場合に $\deg A$ を求めよ。また $A=\sum B_i\partial_iF$ と書くときの $\deg B_i$ を $k=2,3,5$ について求めよ。

<!-- solution-start -->
**詳細解答。** $\Omega$ の次数は $5$、分母の次数は $5k$。斉次重みを零にする条件は $\deg A+5-5k=0$ なので $\deg A=5(k-1)$。順に $0,5,10,20$ である。$\deg\partial_iF=4$ だから $\deg B_i=5(k-1)-4=5k-9$。$k=2,3,5$ では順に $1,6,16$ となる。係数が混合次数なら必要な斉次成分だけを選ぶ。
<!-- solution-end -->

<a id="ex-mir1-09-a02"></a>
#### MIR1-09-A02 Fermat点のイデアル
- Level: A

$F_0=\sum_{i=0}^4x_i^5$ とする。$J(F_0)$ を計算し、$x_0^4x_1\in J(F_0)$ だが $P=\prod_ix_i\notin J(F_0)$ であることを単項式の指数から説明せよ。

<!-- solution-start -->
**詳細解答。** $\partial_iF_0=5x_i^4$ であり、$5$ は複素数体で可逆なので $J(F_0)=(x_0^4,\ldots,x_4^4)$ である。$x_0^4x_1=x_1\cdot x_0^4$ は生成元 $x_0^4$ の倍数だから属する。他方、イデアル内の各単項式は少なくとも一つの変数の指数が $4$ 以上である。$P$ の指数は全部 $1$ であり、単項式の線形独立性から $P$ をそのような単項式の線形結合では表せない。
<!-- solution-end -->

<a id="ex-mir1-09-a03"></a>
#### MIR1-09-A03 外微分の符号と係数
- Level: A

四つのアフィン座標 $y_1,\ldots,y_4$ と正則関数 $f$ を取り、$f\ne0$ の領域で $C$ を正則関数とする。$k\ge2$ とし、3形式 $\beta=C\,dy_2\wedge dy_3\wedge dy_4/f^{k-1}$ の外微分を求めよ。

<!-- solution-start -->
**詳細解答。** $dy_2\wedge dy_3\wedge dy_4$ は閉形式である。$d(C/f^{k-1})$ を展開すると $dy_1$ の成分だけが残り、$dy_1$ は既に先頭にあるので符号は正。従って

$$
d\beta=\left[
\frac{\partial C/\partial y_1}{f^{k-1}}
-(k-1)\frac{C(\partial f/\partial y_1)}{f^k}
\right]dy_1\wedge dy_2\wedge dy_3\wedge dy_4.
$$

$k-1$ は $f^{-(k-1)}$ を微分した係数に由来し、$\partial f/\partial y_1$ を消してはならない。
<!-- solution-end -->

<a id="ex-mir1-09-a04"></a>
#### MIR1-09-A04 二重極の一段低減
- Level: A

$F_\psi=\sum_i x_i^5-5\psi P$ とし、$B_0=x_0$、他を零とする。$A=\sum_iB_i\partial_iF_\psi$ と $\sum_i\partial_iB_i$ を求め、$A\Omega/F_\psi^2$ を単純極へ低減せよ。

<!-- solution-start -->
**詳細解答。** $A=x_0(5x_0^4-5\psi\prod_{i=1}^4x_i)=5x_0^5-5\psi P$。また $\partial_0x_0=1$ で、他の $B_i$ は零だから発散和は $1$。[極次数低減公式](#prop-mir1-09-pole-reduction)で $k=2$ とすると

$$
\frac{(5x_0^5-5\psi P)\Omega}{F_\psi^2}
\equiv \frac{1}{2-1}\frac{\Omega}{F_\psi}.
$$

左辺の二重極全体が単純極と全微分を除いて等しいのであり、$x_0^5$ と $\psi P$ を別々に消したわけではない。
<!-- solution-end -->

### Level B：定義と証明の複数段を接続する

<a id="ex-mir1-09-b01"></a>
#### MIR1-09-B01 射影チャートでも係数は一致するか
- Level: B

$x_0=1$、$y_j=x_j/x_0$（$j=1,\ldots,4$）と置き、$f(y)=F_\psi(1,y)$ とする。ここで $F_{\psi,i}=\partial F_\psi/\partial x_i$（$\psi$ と他の $x_j$ は固定）、$f_j=\partial f/\partial y_j$ と書く。$k=2$、$B_0=x_0$、$B_j=0$（$j\ge1$）のとき、Eulerの斉次式 $\sum_i x_i\partial_iF_\psi=5F_\psi$ を利用して $F_{\psi,0}(1,y)=5f-\sum_{j=1}^4y_j f_j$ を示せ。局所3形式を実際に外微分して $F_{\psi,0}(1,y)\,dy_1\wedge\cdots\wedge dy_4/f^2$ を単純極へ低減せよ。

<!-- solution-start -->
**詳細解答。** $x_0=1$ のチャートでは $x_j=y_j$（$j\ge1$）なので、連鎖律を各 $y_j$ に適用すると $f_j(y)=F_{\psi,j}(1,y)$ となる。ここでの $F_{\psi,0}(1,y)$ は、$x_0$ でもう一度 $f$ を微分した量ではなく、$F_\psi$ を $x_0$ で偏微分してから $x_0=1$ を代入した量である。$F_\psi$ は斉次次数5だからEulerの式が成り立つ。$x_0=1$ を代入すると

$$
F_{\psi,0}(1,y)+\sum_{j=1}^4y_j f_j=5f,
\qquad
F_{\psi,0}(1,y)=5f-\sum_j y_j f_j.
$$

各 $j$ について3形式

$$
\beta_j=\frac{(-1)^{j-1}(-y_j)}{f}\,
dy_1\wedge\cdots\wedge\widehat{dy_j}\wedge\cdots\wedge dy_4
$$

を外微分すると、[極次数低減公式の証明で行った外微分の計算](#prop-mir1-09-pole-reduction)と同じ符号の扱いで

$$
d\beta_j=
\left(-\frac1f+\frac{y_j f_j}{f^2}\right)
dy_1\wedge\cdots\wedge dy_4.
$$

四つを足せば $\sum_jy_jf_j/f^2\equiv4/f$ である。従って

$$
\frac{F_{\psi,0}(1,y)}{f^2}
=\frac5f-\sum_j\frac{y_jf_j}{f^2}
\equiv\frac{5-4}{f}=\frac1f
$$

が形式の係数として成立する。射影の大域公式で $\partial_0B_0=1$ と計算した結果と一致する。
<!-- solution-end -->

<a id="ex-mir1-09-b02"></a>
#### MIR1-09-B02 三重極を二段で低減する
- Level: B

$F_\psi=\sum_i x_i^5-5\psi P$ において $k=3$、$B_0=x_0^6$、他を零とし、$(x_0^6\partial_0F_\psi)\Omega/F_\psi^3$ を最初に二重極、次に二重極と単純極の和へ低減せよ。

<!-- solution-start -->
**詳細解答。** $\deg B_0=6=5\cdot3-9$ なので[極次数低減公式](#prop-mir1-09-pole-reduction)を適用できる。$\partial_0B_0=6x_0^5$、$k-1=2$ だから

$$
\frac{x_0^6\partial_0F_\psi\,\Omega}{F_\psi^3}
\equiv\frac{6x_0^5\Omega}{2F_\psi^2}
=\frac{3x_0^5\Omega}{F_\psi^2}.
$$

今度は[二重極の低減](#prop-mir1-09-second-pole)を代入すると

$$
\frac{3x_0^5\Omega}{F_\psi^2}
\equiv3\psi\frac{P\Omega}{F_\psi^2}
+\frac35\frac{\Omega}{F_\psi}.
$$

左辺の元の分子は $x_0^6\partial_0F_\psi=5x_0^{10}-5\psi x_0^5P$ で次数10となり、三重極の条件にも一致する。$P\Omega/F_\psi^2$ はまだ二重極として残る。
<!-- solution-end -->

<a id="ex-mir1-09-b03"></a>
#### MIR1-09-B03 Fermat点の五重極はなぜ消えるか
- Level: B

$F_0=\sum_i x_i^5$、$P=\prod_i x_i$ とする。$P^4=(x_1^4x_2^4x_3^4x_4^4/5)\partial_0F_0$ を確認し、$P^4\Omega/F_0^5$ の閉4サイクル積分が零になる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $\partial_0F_0=5x_0^4$ なので

$$
\frac{x_1^4x_2^4x_3^4x_4^4}{5}\partial_0F_0
=x_0^4x_1^4x_2^4x_3^4x_4^4=P^4.
$$

$B_0=x_1^4x_2^4x_3^4x_4^4/5$ は次数16で五重極に必要な次数を満たし、$\partial_0B_0=0$ である。他は零だから、[極次数低減公式](#prop-mir1-09-pole-reduction)の $k=5$ で $P^4\Omega/F_0^5\equiv0\pmod d$。$F_0\ne0$ の領域の閉4サイクル上で全微分を積分すると[一般Stokes公式](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で零になる。多項式 $P^4$ 自体が零だからではない。
<!-- solution-end -->

<a id="ex-mir1-09-b04"></a>
#### MIR1-09-B04 閉じない積分路と判別点
- Level: B

1. $a,b\in\mathbb C^*$ を結ぶ、零を避ける滑らかな道 $\gamma$ について $\int_\gamma d(1/t)$ を求め、全微分を積分で消すために必要な条件を述べよ。
2. Dwork族の $\psi^5=1$ で、五重極を減らす本講の公式のどの操作が不能になるかを特定せよ。

<!-- solution-start -->
**詳細解答。** 

1. 原始関数 $1/t$ は道に沿って定義されている。$\gamma$ を $t=t(s)$（$0\le s\le1$、$t(0)=a$、$t(1)=b$）とパラメータ表示すれば、連鎖律から

$$
\int_\gamma d(t^{-1})
=\int_0^1\frac{d}{ds}\left(\frac1{t(s)}\right)ds
=\int_\gamma-\frac{dt}{t^2}
=\frac1b-\frac1a.
$$

$a\ne b$ なら一般に零でない。閉じたサイクルでは $\partial\gamma=0$ で端点の寄与が打ち消される。4次元でも $\int_Td\Phi=\int_{\partial T}\Phi$ という同じ境界条件が必要である。

2. [五重極の低減](#prop-mir1-09-fifth-pole)の証明で得る多項式恒等式は $(1-\psi^5)P^4=\sum_r\psi^rB_r\partial_rF_\psi$ である。$\psi^5=1$ では係数 $1-\psi^5=0$ なので、$P^4$ について解く際の割り算ができない。さらに[滑らかさの判定](../MIR1-06/index.md#prop-mir1-06-smooth-locus)からファイバーも特異になり、滑らかな族の周期の議論を無条件に継続できない。恒等式そのものが偽になるわけではない。
<!-- solution-end -->

### Level C：五重極の導出を一続きで再現する

<a id="ex-mir1-09-c01"></a>
#### MIR1-09-C01 四階周期微分から五重極の低減まで
- Level: C

$\psi_0^5\ne1$ の近傍で、すべての $X_\psi$ を避ける閉管状4サイクル $T$ を固定し、

$$
\Pi(\psi)=\frac1{2\pi i}\int_T\frac{\Omega}{F_\psi},
\qquad F_\psi=\sum_{i=0}^4x_i^5-5\psi\prod_{i=0}^4x_i
$$

とする。以下を証明せよ。

1. $\Pi^{(4)}$ を $P^4\Omega/F_\psi^5$ の積分で表し、微分と積分を交換する仮定を述べよ。
2. $m_r=(\prod_{i<r}x_i^{r-1})(\prod_{i\ge r}x_i^{4+r})$ と $B_r=(1/5)(\prod_{i<r}x_i^{r-1})x_r^r(\prod_{i>r}x_i^{4+r})$ により $(1-\psi^5)P^4=\sum_{r=0}^4\psi^rB_r\partial_rF_\psi$ を示せ。
3. 極次数を5から4へ下げる係数をすべて明示し、$\psi=0$ と $\psi^5=1$ の違いを説明せよ。

<!-- solution-start -->
**詳細解答。**

1. $T$ はコンパクトで、$\psi_0$ の十分小さい閉円板の全点で $F_\psi$ と交わらないよう選んでいる。分母の絶対値には $T$ 上の一様な正の下界があり、被積分形式は $\psi$ で任意階正則微分できる。[前講の微分公式](../MIR1-08/index.md#prop-mir1-08-pole-derivatives)を $k=4$ に適用すると

$$
\Pi^{(4)}(\psi)
=\frac{4!\,5^4}{2\pi i}\int_T\frac{P^4\Omega}{F_\psi^5}
=\frac{15000}{2\pi i}\int_T\frac{P^4\Omega}{F_\psi^5}.
$$

2. $r\in\{0,\ldots,4\}$ とすると、$\partial_rF_\psi=5(x_r^4-\psi\prod_{j\ne r}x_j)$ だから

$$
B_r\partial_rF_\psi=m_r-\psi m_{r+1}.
$$

ここで第一項は $x_r^r x_r^4=x_r^{r+4}$、第二項は他のすべての指数が1増えることから、それぞれ $m_r,m_{r+1}$ となる。$\psi^r$ を掛けて和を取れば

$$
\sum_{r=0}^4\psi^rB_r\partial_rF_\psi
=\sum_{r=0}^4\psi^rm_r-
\sum_{r=1}^5\psi^rm_r
=m_0-\psi^5m_5.
$$

$m_0=m_5=P^4$ なので目的の恒等式が成立する。

3. $\psi^5\ne1$ なので $P^4=\sum_r(\psi^rB_r/(1-\psi^5))\partial_rF_\psi$ と書ける。$B_r$ は次数16だから[極次数低減公式](#prop-mir1-09-pole-reduction)を $k=5$ で適用して

$$
\frac{P^4\Omega}{F_\psi^5}
\equiv
\frac{\Omega}{4(1-\psi^5)F_\psi^4}
\sum_{r=0}^4\psi^r\partial_rB_r
\pmod d.
$$

微分する変数は $x_r$ であり $\psi$ ではない。実際、

$$
\sum_{r=0}^4\psi^r\partial_rB_r
=\frac15\left(
\psi x_2^5x_3^5x_4^5
+2\psi^2x_0x_1x_2x_3^6x_4^6
+3\psi^3x_0^2x_1^2x_2^2x_3^2x_4^7
+4\psi^4P^3
\right).
$$

最初の積分式へ代入すれば $\Pi^{(4)}$ はこの四重極の積分で表される。$\psi=0$ では右辺の分子が零になり、$P^4\Omega/F_0^5$ は全微分である。$\psi^5=1$ では $1-\psi^5$ で割れず、[判別点の判定](../MIR1-06/index.md#prop-mir1-06-smooth-locus)でもファイバーは特異になるため、この表示を使えない。
<!-- solution-end -->

## 9. 次講へ：低減した極を微分方程式へ組み立てる

本講は、Jacobianイデアルに分子が入ることを**多項式の恒等式で確認する** → 次数を満たす3形式を作る → 外微分との差を取る → 閉サイクルで積分を比較する、という鎖を閉じた。

次の **MIR1-10** では、五重極を四重極へ戻す関係を出発点に、さらに低い極へ整理し、$z=(5\psi)^{-5}$ と $\theta=z\,d/dz$ によるquinticの四階Picard–Fuchs作用素を導出する。その作用素が扱うのはミラー族の群不変な周期部分であり、元のquinticの第3コホモロジー全体ではない。

**参考文献**：[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Griffiths, *On the Periods of Certain Rational Integrals*](https://doi.org/10.2307/1970710)。主要な極次数低減公式とDwork五次の恒等式は上で証明した。
