# CYG1-02 標準束の自明性をどう手で確かめるか

<!-- definition-example-audit: strict -->

## 1. 局所形式が書けたのに、なぜまだ足りないのか

[前章のCalabi–Yau条件](../CYG1-01/index.md#def-cyg1-01-criteria)の (K) は、標準束 $K_X$ が**正則線束として**自明であることだった。この条件を具体的な曲線や超曲面で確かめるには、抽象的な同型をどう作るかが問題になる。

複素次元 $n$ の滑らかな複素多様体 $X$ では、局所正則座標 $(z^1,\ldots,z^n)$ によって

$$
dz^1\wedge\cdots\wedge dz^n
$$

は局所的に零を持たない正則 $n$ 形式になる。しかし、**局所的な枠はすべての複素多様体にある**。$K_X\simeq\mathcal O_X$ を判定するには、座標を替えても一致する零のない大域形式を一つ作らなくてはならない。

例えば射影直線 $\mathbb P^1$ の斉次座標を $[Z_0:Z_1]$ とし、$Z_0\ne0$ で $z=Z_1/Z_0$、$Z_1\ne0$ で $w=Z_0/Z_1$ とする。両チャートの重なりでは $w=1/z$ だから、

$$
dw=-z^{-2}dz,\qquad dz=-w^{-2}dw.
$$

$dz$ は $z$ チャートでは非消失だが、$w=0$ で極を持ち、そのままでは大域的な正則1形式にならない。この例は、各チャートで微分形式が書けることと、**それらが正則に貼り合うこと**を区別させる。

以下では $K_X=\bigwedge^n\Omega_X^1$ を標準束、$\mathcal O_X$ を自明正則線束とする。前者が局所正則枠を持つことは[標準束の既習定義](../../KAH/KAH1-12/index.md#def-kah1-12-canonical)に含まれる。最高次形式の係数がどのように変わるかをまず計算する。

## 2. 零を持たない体積形式が、束の同型そのものになる

$X$ の二つの正則座標系を $z=(z^1,\ldots,z^n)$ と $w=(w^1,\ldots,w^n)$ とし、その重なりでの正則Jacobianを

$$
J_{wz}=\det\left(\frac{\partial w^a}{\partial z^b}\right)
$$

とする。座標変換は双正則なので $J_{wz}$ は零を取らない。外積の交代性と行列式の展開から

$$
dw^1\wedge\cdots\wedge dw^n
=J_{wz}\,dz^1\wedge\cdots\wedge dz^n.
$$

従って一つの大域形式 $\Omega$ を局所的に $f_z\,dz^1\wedge\cdots\wedge dz^n$、$f_w\,dw^1\wedge\cdots\wedge dw^n$ と書くと、必要な一致条件は

$$
f_z=f_wJ_{wz},\qquad f_w=\frac{f_z}{J_{wz}}
$$

となる。係数 $f_z$ が各点で零でないことと、重なりでこの式を満たすことは**別の検査**である。

<a id="prop-cyg1-02-volume-trivialization"></a>

<!-- formal-statement-start -->
> **命題（大域正則体積形式による標準束の自明化）**
> $X$ を空でない滑らかな複素次元 $n\ge1$ の複素多様体とする。次の二条件は同値である。
>
> 1. $K_X\simeq\mathcal O_X$ が正則線束として成立する。
> 2. $X$ の各点で零とならない大域正則 $n$ 形式 $\Omega$ が存在する。
>
> そのとき同型は $f\mapsto f\Omega$ で与えられ、逆は各局所座標で $\eta=h\Omega$ の係数 $h$ を読み取って定まる。
<!-- formal-statement-end -->

### 証明の見取り図

一つの零を持たない大域形式を、標準束の**全域で使える基底**にする。逆向きには線束同型で定数切断 $1$ を写す。局所座標の取り方を変えたときにも係数が同じ関数になることが鍵である。

<!-- proof-start -->
### 証明

大域正則 $n$ 形式 $\Omega$ が各点で非零とする。開集合 $U$ 上の正則関数 $f$ に $f\Omega$ を対応させると、正則層の準同型

$$
\Phi_U:\mathcal O_X(U)\longrightarrow K_X(U),\qquad f\longmapsto f\Omega|_U
$$

を得る。任意の点の座標近傍 $V\subset U$ で $\Omega=a(z)\,dz^1\wedge\cdots\wedge dz^n$ と書くと、$a$ は非消失正則関数である。任意の正則 $n$ 形式 $\eta=b(z)\,dz^1\wedge\cdots\wedge dz^n$ に対し、

$$
\eta=\frac{b}{a}\Omega,\qquad a\ne0
$$

だから $b/a$ は正則であり、局所的に $\Phi$ は全単射である。二つの座標系で $a_w=a_z/J_{wz}$、$b_w=b_z/J_{wz}$ なので

$$
\frac{b_w}{a_w}=\frac{b_z/J_{wz}}{a_z/J_{wz}}=\frac{b_z}{a_z}.
$$

この比は座標によらず重なりで一致し、正則関数に貼り合う。従って $\Phi$ は正則線束（対応する正則層）の同型である。

逆に $\Psi:\mathcal O_X\to K_X$ が正則線束同型なら、定数切断 $1$ の像 $\Omega=\Psi(1)$ は大域正則 $n$ 形式である。各点の線形写像 $\Psi_x:\mathbb C\to(K_X)_x$ は同型だから、$\Omega_x=\Psi_x(1)\ne0$。これで逆向きも成立する。$\square$
<!-- proof-end -->

**直接例：複素トーラス。** $T=\mathbb C^n/\Lambda$ の格子平行移動 $z\mapsto z+\lambda$ はJacobian $I_n$ を持つ。従って $dz^1\wedge\cdots\wedge dz^n$ の係数はどの重なりでも $1$ となり、各点で非零である。単に局所形式を一つ選んだのではなく、上の**両条件**を確認したので[命題](#prop-cyg1-02-volume-trivialization)から $K_T\simeq\mathcal O_T$ と結論できる。

## 3. 超曲面では「滑らかさ」から先に調べる

射影空間 $\mathbb P^m_{\mathbb C}$ の斉次座標を $[Z_0:\cdots:Z_m]$ とする。次数 $d\ge1$ の非零斉次多項式 $F$ による超曲面を $X_d=\{F=0\}\subset\mathbb P^m$ と書く。このとき超曲面での標準束を計算するには、まず **$X_d$ が滑らかな複素多様体であること**を確かめる必要がある。

そのために、斉次勾配 $\bigl(\partial F/\partial Z_0,\ldots,\partial F/\partial Z_m\bigr)$ が $F=0$ 上の射影点で同時に零にならないか調べる。これは[射影Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)であり、滑らかなら複素次元は $m-1$。偏微分の値は斉次代表の取り方で変わるが、**全成分が零かどうか**は代表の非零スカラー倍で不変である。

引用した判定定理は $F$ が平方因子を持たない場合に述べられている。実際、$F=G^2Q$ と重複因子を持つなら、$G=0$ 上で

$$
\frac{\partial F}{\partial Z_j}
=2GQ\frac{\partial G}{\partial Z_j}+G^2\frac{\partial Q}{\partial Z_j}=0
\quad(j=0,\ldots,m)
$$

となる。従って **勾配が同時に零にならないことを示せれば平方因子も排除できる**。

滑らかさを確認できたら[解析的随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)へ周囲の次元 $m$ と次数 $d$ を代入する。式は

$$
K_{X_d}\simeq\bigl(K_{\mathbb P^m}\otimes\mathcal O_{\mathbb P^m}(d)\bigr)|_{X_d}
\simeq\mathcal O_{X_d}(-m-1+d).
$$

第1段階では、周囲の標準束のねじり指数 $-m-1$ と、法方向の $d$ が足されている。これは[余法完全列の行列式](../../../代数系/AG/AG2-10/index.md#thm-ag2-10-adjunction)に由来する。**$d=m+1$ なら十分**だが、逆向きまで言うには $\mathcal O_{X_d}(k)$ が $k\ne0$ で自明にならないことも要る。

## 4. 次数が合わない場合は、なぜ自明でないのか

射影空間の超平面線束 $\mathcal O(1)$ の第一Chern類が持つ実係数像を $H$ とし、$X_d$ への制限も $H$ と書く。[射影多様体の整数型Kähler類](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)によれば、正規化 $\omega=\omega_{\mathrm{FS}}|_{X_d}$ に対し

$$
H=[\omega/(2\pi)]\in H^2(X_d;\mathbb R)
$$

である。$\omega$ は正値Kähler形式なので、複素次元 $r=m-1\ge1$ の滑らかなコンパクト $X_d$ では $\omega^r/r!$ が正の体積形式となる。従って

$$
\int_{X_d}H^r
=\frac1{(2\pi)^r}\int_{X_d}\omega^r>0.
$$

ここで $\mathcal O_{X_d}(k)$ が正則自明であると仮定すると、[整係数第一Chern類の自明束での消滅](../CYG1-01/index.md#prop-cyg1-01-chern-chain)からその実係数第一Chern類は零となる。$k$ が正なら[テンソル冪の第一Chern形式](../../KAH/KAH1-14/index.md#prop-kah1-14-positive-curvature)により、その類は $kH$ である。

負の場合も確認しておく。$\mathcal O_{X_d}(1)$ の局所正則枠のHermite計量を $h$（枠の長さの二乗）とすると、双対・テンソル冪で作る $\mathcal O_{X_d}(k)$（負の $k$ では双対の $-k$ 乗）の局所計量は $h^k$ である。この局所枠でのChern接続形式を $A^{(k)}$、その曲率を $F_{D^{(k)}}$ と書くと、任意の整数 $k$ について

$$
A^{(k)}=\partial\log h^k=k\,\partial\log h,
\qquad F_{D^{(k)}}=\bar\partial A^{(k)}=kF_{D^{(1)}}.
$$

従って[第一Chern形式と実係数類の対応](../../KAH/KAH1-12/index.md#thm-kah1-12-integrality)から $c_1(\mathcal O_{X_d}(k))_{\mathbb R}=kH$ は $k<0$ も含めて成立する。ここで $H^{r-1}$ はコホモロジー類 $H$ の $(r-1)$ 回の杯積とする。$H^{r-1}$ を掛けて積分すると

$$
0=\int_{X_d}(kH)\wedge H^{r-1}=k\int_{X_d}H^r.
$$

右の積分は正だから $k=0$ である。次数差が残る線束を「なんとなく自明そう」と判定してはいけない。

<a id="thm-cyg1-02-hypersurface-degree"></a>

<!-- formal-statement-start -->
> **定理（滑らかな射影超曲面の標準束自明性の次数判定）**
> $m\ge2$、$d\ge1$ とし、$X_d=\{F=0\}\subset\mathbb P^m_{\mathbb C}$ を次数 $d$ の非零斉次多項式が定める、空でない**滑らかな**射影超曲面とする。$X_d$ の複素次元は $m-1\ge1$ であり、

$$
K_{X_d}\simeq\mathcal O_{X_d}(d-m-1),\qquad
K_{X_d}\simeq\mathcal O_{X_d}\ \Longleftrightarrow\ d=m+1.
$$

> 特に $d=m+1$ なら消えない大域正則 $(m-1)$ 形式が存在する。ただしこの定理は任意に指定したKähler計量のRicci形式の零性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず滑らかさを確認する。その上で[解析的随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)を適用する。$d=m+1$ なら指数は零。逆向きには射影埋め込みで得る正のKähler類の最高冪の積分が零でないため、非零指数のねじり束は自明になれない。

<!-- proof-start -->
### 証明

$X_d$ は仮定により滑らかなので[解析的随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)が使える。周囲の射影空間次元を $m$、方程式次数を $d$ として代入すると

$$
K_{X_d}\simeq\mathcal O_{X_d}(d-m-1).
$$

$d=m+1$ なら右辺は $\mathcal O_{X_d}(0)=\mathcal O_{X_d}$ であり、[大域正則体積形式による標準束の自明化](#prop-cyg1-02-volume-trivialization)から零を持たない正則 $(m-1)$ 形式が得られる。

逆に $K_{X_d}$ が正則自明なら、$k=d-m-1$ と置いた $\mathcal O_{X_d}(k)$ も自明である。上で示した正値性により $k\int_{X_d}H^{m-1}=0$ から $k=0$、すなわち $d=m+1$ を得る。$\square$
<!-- proof-end -->

**直接例：三つの次元。** 次数だけを先に合わせても、滑らかさを省略してよいわけではない。次節のFermat型多項式でJacobianを確かめると、以下はいずれも滑らかである。

| 周囲の射影空間 | 超曲面 | 指数 $d-m-1$ | 正則標準束 |
|---|---|---:|---|
| $\mathbb P^2$ | Fermat三次曲線 | $3-2-1=0$ | 自明 |
| $\mathbb P^3$ | Fermat四次曲面 | $4-3-1=0$ | 自明 |
| $\mathbb P^4$ | Fermat五次三次元超曲面 | $5-4-1=0$ | 自明 |
| $\mathbb P^2$ | 滑らかな四次曲線 | $4-2-1=1$ | $\mathcal O_X(1)$、非自明 |

## 5. 局所式の分母は何を意味するか

随伴公式で線束の同型類が決まっても、実際に正則体積形式を手で書くには局所式が必要になる。$Z_0\ne0$ のチャートで $x_j=Z_j/Z_0$（$1\le j\le m$）、$f(x)=F(1,x_1,\ldots,x_m)$ と置く。

$f=0$ の点で $f_{x_s}=\partial f/\partial x_s\ne0$ なら、[局所正則随伴形式を構成した既習命題](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)により $x_s$ を残りの変数で局所的に解ける。したがって $dx_1,\ldots,\widehat{dx_s},\ldots,dx_m$（帽子はその項を除く意味）は $X_d$ の局所余接基底になる。同命題をこの基底へ適用すると、

$$
\eta_s=(-1)^{s-1}\frac{dx_1\wedge\cdots\wedge\widehat{dx_s}\wedge\cdots\wedge dx_m}{f_{x_s}}
$$

となる。分母が非零なのは**この部分チャートを選ぶ条件そのもの**であり、一つの分母が零になる点で超曲面全体が特異だという意味ではない。別の偏微分が非零なら、消去方向を替えればよい。

<a id="prop-cyg1-02-fermat-volume"></a>

<!-- formal-statement-start -->
> **命題（Fermat型超曲面の局所随伴形式の直接判定）**
> $m\ge2$、$d\ge2$ とし、複素射影空間 $\mathbb P^m$ 内の斉次式

$$
F(Z_0,\ldots,Z_m)=Z_0^d+\cdots+Z_m^d
$$

> の零集合を $X_d$ とする。$X_d$ は滑らかである。$Z_0\ne0$ で $f=1+x_1^d+\cdots+x_m^d$ とし、$x_s\ne0$ の領域では

$$
\eta_s=(-1)^{s-1}\frac{dx_1\wedge\cdots\wedge\widehat{dx_s}\wedge\cdots\wedge dx_m}{d x_s^{d-1}}
$$

> が非消失な局所正則 $(m-1)$ 形式を与える。同じチャート内で消去方向を替えた形式は一致する。$d=m+1$ のときは射影チャート間の次数因子も相殺され、局所形式の適切な符号を揃えると大域形式に貼り合う。
<!-- formal-statement-end -->

### 証明の見取り図

斉次勾配が同時零なら全斉次座標が零になってしまう。局所では $df=0$ によって消去する微分を替えた二つの分数形式を比較する。異なる射影チャート間の貼り合わせは、既習の随伴公式の座標変換で次数 $d-m-1$ が残るかどうかで決まる。

<!-- proof-start -->
### 証明

斉次偏微分は各 $j=0,\ldots,m$ について

$$
\frac{\partial F}{\partial Z_j}=dZ_j^{d-1}.
$$

複素数体は標数零で $d\ne0$。これらがすべて零なら $Z_j=0$ がすべての $j$ で成立するが、零ベクトルは射影点を定めない。よって[射影Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)で $X_d$ は滑らか。

$Z_0\ne0$ では $f_{x_s}=d x_s^{d-1}$ だから、$x_s\ne0$ なら[局所正則随伴形式の命題](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)の非零偏微分条件を満たす。その命題を $f$ と消去変数 $x_s$ に適用すれば表示式を得る。分子の外積は残りの $m-1$ 本の独立な局所微分からなるので、分母非零と合わせて局所形式は非消失である。

消去変数を $s$ から $t$ に替えたとき、$X_d$ の接ベクトル上で $df=0$ より

$$
f_{x_s}\,dx_s=-\sum_{j\ne s}f_{x_j}\,dx_j.
$$

これを $\eta_t$ の分子の外積へ代入すると、既に現れる $dx_j$ の重複項は零になり、$dx_s$ を含む項だけが残る。外積の並べ替えの符号 $(-1)^{s-1}$ と $(-1)^{t-1}$ が一致を保証する。これは[既習の消去方向の独立性の証明](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)の $f_{x_s}\ne0,f_{x_t}\ne0$ への適用である。

異なる射影チャート間も計算する。$U_i=\{Z_i\ne0\}$、$U_j=\{Z_j\ne0\}$ で、各チャートの座標を元の斉次添字の昇順に並べ、そこで貼り合う局所形式をそれぞれ $\eta_i,\eta_j$ とする。重なりで $u=Z_j/Z_i\ne0$ と置くと、$U_i$ の座標 $x_a=Z_a/Z_i$ と $U_j$ の座標 $y_b=Z_b/Z_j$ は

$$
y_i=u^{-1},\qquad y_b=x_b/u\quad(b\ne i,j),
$$

を満たす。従って $dy_i=-u^{-2}du$、$dy_b=u^{-1}dx_b-x_bu^{-2}du$ である。周囲の $m$ 本の微分の外積では、$dy_i$ が既に $du=dx_j$ を含むため、他の因子から $du$ を選ぶ項は零となる。残る係数は $-u^{-2}(u^{-1})^{m-1}$ である。$i<j$ なら $du$ を昇順に置き直す交換回数は $j-i-1$、$i>j$ なら $i-j-1$ 回なので、最初の負号も合わせた符号は $(-1)^{i+j}$ になる。従って座標Jacobianは $(-1)^{i+j}u^{-(m+1)}$ である。

一方、斉次次数 $d$ により $f_j=u^{-d}f_i$ である。両辺を微分すると

$$
df_j=u^{-d}df_i-d\,u^{-d-1}f_i\,du.
$$

超曲面上では $f_i=0$ だから $df_j|_{X_d}=u^{-d}df_i|_{X_d}$ となる。[解析的随伴公式の貼り合わせ計算](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)の分子Jacobianを分母の方程式変換係数で割ると

$$
\eta_j=(-1)^{i+j}u^{d-m-1}\eta_i.
$$

$d=m+1$ のとき変数 $u$ の冪は消え、$\Omega_i=(-1)^i\eta_i$ と選べば $\Omega_j=(-1)^j\eta_j=\Omega_i$。各点では滑らかさにより少なくとも一つの分母が非零で、同一チャート内でも消去方向を替えられる。よって $\Omega_i$ は全チャートを覆う零のない大域正則形式に貼り合う。$\square$
<!-- proof-end -->

**手で確かめる三次曲線の重なり。** $m=2,d=3$ で $Z_0\ne0$、$f=1+x^3+y^3$ とする。$x,y\ne0$ の領域では

$$
\eta_x=\frac{dy}{3x^2},\qquad
\eta_y=-\frac{dx}{3y^2}.
$$

$df=3x^2dx+3y^2dy=0$ なので

$$
\frac{dy}{3x^2}=-\frac{dx}{3y^2},\qquad \eta_x=\eta_y.
$$

次に $Z_1\ne0$ のチャートでは $w=Z_0/Z_1=1/x$、$v=Z_2/Z_1=y/x$、$f_1=w^3+1+v^3$ とする。$v\ne0$ の重なりでは

$$
dw=-x^{-2}dx,\qquad v^2=y^2x^{-2},
$$

従って第2チャートの局所随伴形式は

$$
\eta_{1,v}=-\frac{dw}{3v^2}
=\frac{dx}{3y^2}=-\eta_y.
$$

標準チャート番号による向きの符号を取れば $\Omega_0=\eta_y$、$\Omega_1=-\eta_{1,v}$ は一致する。この二つの重なりを確認しただけで全チャートの貼り合わせを証明したわけではない。残りの重なりと一般の $m$ に対する検証は、[既習の射影チャート変換の証明](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)が担う。

**五次の具体的な3形式。** $m=4,d=5$、$Z_0\ne0$ で $x_4\ne0$ なら

$$
\eta_4=-\frac{dx_1\wedge dx_2\wedge dx_3}{5x_4^4}.
$$

これは局所正則3形式である。$x_4=0$ ではこの表示が使えなくなるが、$1+x_1^5+\cdots+x_4^5=0$ の上で全 $x_j$ が零にはならないので別の消去方向がある。五次の**すべてのチャートにまたがる**貼り合わせは[CAG1-13の正則3形式](../../../代数系/CAG/CAG1-13/index.md#prop-cag1-13-analytic-gluing)で、さらに大域形式の一意性は同章の定理で計算済みである。

## 6. 失敗を診断する順番

1. **滑らかさを確認する。** 例えば $F=Z_0^5+Z_1^5+Z_2^5+Z_3^5$ で定める $Y\subset\mathbb P^4$ は、点 $p=[0:0:0:0:1]$ で $F=0$ かつ全偏微分が零である。[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)により特異点であり、通常の滑らかな $K_Y=\bigwedge^3\Omega_Y^1$ として[随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)をそのまま使うことはできない。**次数5だけでは足りない**。
2. **ねじり指数を計算する。** 滑らかな六次超曲面 $Y_6\subset\mathbb P^4$ なら $K_{Y_6}\simeq\mathcal O_{Y_6}(1)$。その第一Chern類の実像は正のKähler類で零でない。局所形式があっても大域の非消失枠は存在しない。
3. **局所分母を確認する。** $f_{x_s}=0$ の点で分数式を使ってはならない。別の偏微分が非零なら消去方向を替え、すべて零なら特異性を疑う。
4. **大域形式と計量を区別する。** (K) が成り立てば[前章の含意](../CYG1-01/index.md#prop-cyg1-01-chern-chain)から $c_1(X)_{\mathbb R}=0$。しかし、指定された任意のKähler計量がRicci平坦という結論にはならない。[前章の楕円曲線の反例](../CYG1-01/index.md#prop-cyg1-01-ricci-holonomy)はこの量化の違いを示す。

## 7. 演習――一つの形式から、超曲面の次数まで

<a id="ex-cyg1-02-a01"></a>
#### CYG1-02-A01 局所係数の座標変換
- Level: A

複素一次元の重なりで $w=2z+1$ とする。$\Omega=3\,dz$ を $w$ 座標で表し、非消失性が保たれる理由を示せ。

<!-- solution-start -->
**詳細解答。** $dw=2dz$ だから $dz=dw/2$。従って

$$
\Omega=3dz=\frac32dw.
$$

Jacobianは $2\ne0$、新しい係数は $3/2\ne0$。これは[局所係数変換](#prop-cyg1-02-volume-trivialization)の $f_w=f_z/J_{wz}$ そのものである。基底の係数は変わるが、形式が零でないという性質は変わらない。
<!-- solution-end -->

<a id="ex-cyg1-02-a02"></a>
#### CYG1-02-A02 射影直線での極
- Level: A

$\mathbb P^1$ の $z=Z_1/Z_0$、$w=Z_0/Z_1$ について、$dz$ を $w$ で表せ。$z$ チャートの局所枠 $dz$ がそのまま大域正則枠になるか判定せよ。

<!-- solution-start -->
**詳細解答。** 重なりで $z=w^{-1}$ だから

$$
dz=-w^{-2}dw.
$$

$w=0$ は $Z_1\ne0$ のチャート内の点であり、係数 $-w^{-2}$ はその点で極を持つ。従って $dz$ はそのままでは大域正則枠にならない。

局所的には $dz$ も $dw$ も非消失だが、$dz$ を両チャートに延長するには正則性が不足する。さらに[射影空間の標準束公式](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-canonical-projective)から

$$
K_{\mathbb P^1}\simeq\mathcal O(-2)
$$

だから、大域正則枠そのものが存在しない。
<!-- solution-end -->

<a id="ex-cyg1-02-a03"></a>
#### CYG1-02-A03 Fermat四次の滑らかさ
- Level: A

$F=Z_0^4+Z_1^4+Z_2^4+Z_3^4$ の零集合 $S\subset\mathbb P^3$ に対し、斉次偏微分を列挙して滑らかさを確認せよ。

<!-- solution-start -->
**詳細解答。** 四つの偏微分は

$$
(F_{Z_0},F_{Z_1},F_{Z_2},F_{Z_3})
=(4Z_0^3,4Z_1^3,4Z_2^3,4Z_3^3).
$$

全成分が零なら、複素数体で $4\ne0$ なので $Z_0=Z_1=Z_2=Z_3=0$。これは射影点ではない。[射影Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)により $S$ は滑らかで複素次元 $3-1=2$ である。
<!-- solution-end -->

<a id="ex-cyg1-02-a04"></a>
#### CYG1-02-A04 随伴指数の計算
- Level: A

滑らかな次数 $d$ の射影超曲面 $X_d\subset\mathbb P^m$（$m\ge2$）を考える。$(m,d)=(2,3),(3,4),(4,6)$ について $K_{X_d}$ のねじり指数を求めよ。

<!-- solution-start -->
**詳細解答。** [随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)の指数は $d-m-1$ である。順に

$$
3-2-1=0,\qquad4-3-1=0,\qquad6-4-1=1.
$$

従って最初の二つでは $K\simeq\mathcal O$、最後は $K\simeq\mathcal O(1)$。後者を単に「零ではない指数」と読むだけでなく、[次数判定定理](#thm-cyg1-02-hypersurface-degree)の正値積分の議論により非自明であると分かる。
<!-- solution-end -->

<a id="ex-cyg1-02-b01"></a>
#### CYG1-02-B01 三次曲線で二つの消去方向を突き合わせる
- Level: B

$f(x,y)=1+x^3+y^3=0$ の滑らかなアフィン曲線を考える。$x,y\ne0$ の部分で $x$ と $y$ をそれぞれ消去する局所随伴1形式を求め、$df=0$ を使って両者が一致することを示せ。

<!-- solution-start -->
**詳細解答。** $f_x=3x^2$、$f_y=3y^2$ で、仮定により両方とも非零。$x$ を消去すると $\eta_x=dy/f_x$、$y$ を消去すると符号が入って $\eta_y=-dx/f_y$ になる。よって

$$
\eta_x=\frac{dy}{3x^2},\qquad
\eta_y=-\frac{dx}{3y^2}.
$$

曲線上で $0=df=3x^2dx+3y^2dy$ なので $3y^2dy=-3x^2dx$ となる。$y\ne0$ により $3y^2$ で割って $dy=-(x^2/y^2)dx$ を得て、これを代入すると

$$
\eta_x=\frac{-(x^2/y^2)dx}{3x^2}
=-\frac{dx}{3y^2}=\eta_y.
$$

どちらも残りの局所座標の微分の非零倍だから、非消失性も確認できる。
<!-- solution-end -->

<a id="ex-cyg1-02-b02"></a>
#### CYG1-02-B02 射影チャートの重なりと符号
- Level: B

Fermat三次曲線 $Z_0^3+Z_1^3+Z_2^3=0$ の $Z_0Z_1Z_2\ne0$ の領域で、$x=Z_1/Z_0,y=Z_2/Z_0$ と $w=Z_0/Z_1,v=Z_2/Z_1$ を用いる。$\eta_{0,y}=-dx/(3y^2)$ と $\eta_{1,v}=-dw/(3v^2)$ の関係を求め、符号の調整を示せ。

<!-- solution-start -->
**詳細解答。** 座標変換は $w=x^{-1}$、$v=yx^{-1}$。従って

$$
dw=-x^{-2}dx,\qquad v^2=y^2x^{-2}.
$$

これを第2チャートの式へ代入すると

$$
\eta_{1,v}
=-\frac{-x^{-2}dx}{3y^2x^{-2}}
=\frac{dx}{3y^2}
=-\eta_{0,y}.
$$

そこで $\Omega_0=\eta_{0,y}$、$\Omega_1=-\eta_{1,v}$ と取れば重なりで $\Omega_0=\Omega_1$。射影チャート番号による符号を揃える必要があり、符号を無視した単なる「同じ式」の主張では不十分である。全チャートの一般形は[解析的随伴公式の貼り合わせ](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)へ戻る。
<!-- solution-end -->

<a id="ex-cyg1-02-b03"></a>
#### CYG1-02-B03 滑らかな五次と特異な五次を区別する
- Level: B

$Q=\{\sum_{j=0}^4Z_j^5=0\}$ と $Y=\{\sum_{j=0}^3Z_j^5=0\}$ を $\mathbb P^4$ 内で比較せよ。各斉次勾配を計算し、通常の滑らかな超曲面の随伴公式を適用できる方を判定せよ。

<!-- solution-start -->
**詳細解答。** $Q$ の勾配は $(5Z_0^4,\ldots,5Z_4^4)$。全成分零ならすべての斉次座標が零なので、射影点では起きず、$Q$ は滑らかである。[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)と[随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)に $m=4,d=5$ を代入して

$$
K_Q\simeq\mathcal O_Q(5-4-1)=\mathcal O_Q.
$$

$Y$ の勾配は $(5Z_0^4,5Z_1^4,5Z_2^4,5Z_3^4,0)$。点 $p=[0:0:0:0:1]$ では $F(p)=0$ かつ全偏微分が零なので、$p$ は特異点である。$Y$ は次数が5でも、滑らかな超曲面の標準束を扱う同じ定理の仮定を失う。局所でどの偏微分も単元にならず、通常の局所随伴形式の構成もそこで止まる。
<!-- solution-end -->

<a id="ex-cyg1-02-b04"></a>
#### CYG1-02-B04 非零のねじり指数を積分で排除する
- Level: B

$X\subset\mathbb P^m$ を滑らかな連結な複素次元 $r\ge1$ の射影多様体とし、$H=c_1(\mathcal O_X(1))_{\mathbb R}$ が正のFubini–Study形式の類であるとする。$\mathcal O_X(k)$ が正則自明なら $k=0$ と証明せよ。

<!-- solution-start -->
**詳細解答。** [射影埋め込みの整数型Kähler類](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)から $H=[\omega/(2\pi)]$、$\omega$ は正のKähler形式である。$X$ はコンパクト・非空・正次元だから

$$
A:=\int_XH^r=(2\pi)^{-r}\int_X\omega^r>0.
$$

正則自明な線束の第一Chern類は零なので、$\mathcal O_X(k)$ が自明なら $c_1(\mathcal O_X(k))_{\mathbb R}=0$。[テンソル冪の第一Chern形式](../../KAH/KAH1-14/index.md#prop-kah1-14-positive-curvature)から正の $k$ について $c_1(\mathcal O_X(k))_{\mathbb R}=kH$。負の $k$ でも $\mathcal O_X(1)$ の局所枠の計量を $h$ とすれば双対枠の計量は $h^{-1}$ となり、Chern接続形式が $\partial\log h$ から $-\partial\log h$ に変わるため曲率も負号を得る。よって負の $k$ でも同じ等式が成り立ち、$kH=0$。両辺へ $H^{r-1}$ を掛けて積分すると $0=kA$。$A>0$ から $k=0$ が従う。これは「正の束が自明でない」というだけでなく、負の指数にも通用する証明である。
<!-- solution-end -->

<a id="ex-cyg1-02-c01"></a>
#### CYG1-02-C01 似た三つの「証明」を修正する
- Level: C

次の三つの推論について、正しければ必要な条件と根拠を示し、誤りなら壊れた段階を説明して修正せよ。

1. 「$F$ が $\mathbb P^4$ 上の五次斉次式だから、$F=0$ の標準束は必ず自明である」。
2. 「滑らかなFermat五次の局所式 $-dx_1\wedge dx_2\wedge dx_3/(5x_4^4)$ は $x_4=0$ で使えない。よって標準束は自明でない」。
3. 「滑らかなFermat三次曲線の標準束が自明だから、そこで選んだ**任意の**Kähler計量はRicci平坦である」。

<!-- solution-start -->
**詳細解答。**

1. 誤り。$Y=\{Z_0^5+\cdots+Z_3^5=0\}\subset\mathbb P^4$ は $p=[0:0:0:0:1]$ を含み、斉次勾配は $p$ で零である。[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)より特異で、滑らかな超曲面の[随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)をそのまま適用する前提がない。正しい主張は「**滑らかな**五次超曲面 $Q\subset\mathbb P^4$ なら $K_Q\simeq\mathcal O_Q(5-4-1)=\mathcal O_Q$」である。
2. 誤り。局所式が使える条件はその分母となる偏微分 $5x_4^4\ne0$ である。$x_4=0$ でも $1+x_1^5+\cdots+x_4^5=0$ の各点では少なくとも一つの $x_s\ne0$ があり、$f_{x_s}=5x_s^4\ne0$。[局所随伴形式](../../../代数系/CAG/CAG1-11/index.md#prop-cag1-11-holomorphic-residue)の消去方向を $s$ に替えれば、その近傍に非消失の正則形式が存在する。さらに射影チャート間は[解析的随伴公式の変換](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)で指数 $d-m-1=0$ が残らないので貼り合う。**一つの局所表示が使えないこと**は大域束の非自明性を意味しない。
3. 誤り。平面三次曲線 $E$ は滑らかなら $K_E\simeq\mathcal O_E$ であり、[標準束からChern類への含意](../CYG1-01/index.md#prop-cyg1-01-chern-chain)で $c_1(E)_{\mathbb R}=0$ となる。しかし $[\rho(g)/(2\pi)]=0$ はRicci形式 $\rho(g)$ そのものの零とは違う。実際、[前章の非定数Kähler計量の計算](../CYG1-01/index.md#prop-cyg1-01-ricci-holonomy)では平坦トーラスとして表した楕円曲線上で $\rho(g)\ne0$ の計量を構成した。「あるRicci平坦計量の存在」にはYauの定理という外部入力があり、「任意の計量がRicci平坦」とは結論できない。

三件とも、正しく言い換える鍵は順に **滑らかさの仮定、消去方向と貼り合わせ、計量の量化** である。
<!-- solution-end -->

## 8. この判定法で次に何を調べるか

滑らかな超曲面では「Jacobianが全点で非零か → 随伴指数は何か → 局所体積形式はどう貼り合うか」の順に確認できる。次の講義では、標準束の正則自明性という正則幾何の条件と、整数係数・実係数の第一Chern類という位相的な情報がなぜ同じではないかをtorsion例から再検討する。
