# EC3 複素一様化・格子・j不変量

[EC2の結合法則](../EC2/index.md#thm-ec2-associativity)によって、非特異な三次曲線の点は体の標数によらず可換群をなすことが分かりました。しかし座標による加法は分母の零を場合分けしなくてはなりません。複素数上では別の見方ができます。平面の二つの独立な方向を周期として同一視すると、トーラス上の**ただの足し算**が曲線上の加法になります。

この章では [CA8の複素格子](../../../解析系/CA/CA8/index.md#def-ca8-lattice) と [複素トーラス](../../../解析系/CA/CA8/index.md#thm-ca8-complex-torus)、[CA9のWeierstrass関数](../../../解析系/CA/CA9/index.md#def-ca9-weierstrass-p)を使います。最初に格子から曲線を作り、次にその加法を厳密に一致させます。その逆向きに任意の複素楕円曲線から格子を作り、最後に同型を数値一つで判定する方法を得ます。体は本章を通して $\mathbb C$ です。後の有理数体上の問題と混同しません。

## 1. 格子の足し算を三次曲線へ移す

複素格子 $\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2$ は $\omega_1/\omega_2\notin\mathbb R$ を満たします。商 $\mathbb C/\Lambda$ の点 $[z]$ は $z+\lambda$（$\lambda\in\Lambda$）を同じ点とみなした同値類です。その加法は $[u]+[v]=[u+v]$。$[0]$ が単位元で、$-[z]=[-z]$ です。

[CA9の微分方程式](../../../解析系/CA/CA9/index.md#thm-ca9-weierstrass-differential-equation)は、格子の関数 $\wp=\wp_\Lambda$ と $g_2=g_2(\Lambda),g_3=g_3(\Lambda)$ について

$$
(\wp')^2=4\wp^3-g_2\wp-g_3
$$

と述べます。右辺の先頭を係数1にするため $x=\wp,\ y=\wp'/2$ と置きます。こうすると曲線は

$$
E_\Lambda:\quad y^2=x^3-\frac{g_2}{4}x-\frac{g_3}{4},
\qquad O=[0:1:0]
$$

です。短いWeierstrass形の係数は $A=-g_2/4,\ B=-g_3/4$ です。[三次多項式の非退化](../../../解析系/CA/CA9/index.md#thm-ca9-discriminant-nonzero)から $g_2^3-27g_3^2\ne0$。実際に [EC1の短い形の判別式](../EC1/index.md#def-ec1-invariants)へ代入すると

$$
\begin{aligned}
\Delta(E_\Lambda)
&=-16(4A^3+27B^2)\\
&=-16\left(-\frac{g_2^3}{16}+\frac{27g_3^2}{16}\right)
=g_2^3-27g_3^2\ne0.
\end{aligned}
$$

<a id="def-ec3-uniformization-map"></a>

<!-- formal-statement-start -->
> **定義（格子のWeierstrass写像）**  
> 複素格子 $\Lambda$ と上の非特異曲線 $E_\Lambda$ に対して、写像 $\Phi_\Lambda:\mathbb C/\Lambda\to E_\Lambda(\mathbb C)$ を次で定める。

$$
\Phi_\Lambda([z])=
\begin{cases}
(\wp_\Lambda(z),\wp_\Lambda'(z)/2), &[z]\ne[0],\\
O,&[z]=[0].
\end{cases}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec3-uniformization-map -->
**定義の確認。** $z$ を $z+\lambda$ に替えても [CA9の周期性](../../../解析系/CA/CA9/index.md#thm-ca9-weierstrass-symmetry-periodicity)により $\wp,\wp'$ は同じ値です。微分方程式への代入で像は曲線上にあり、原点類だけは $O$ と定義しました。さらに $\wp(-z)=\wp(z),\ \wp'(-z)=-\wp'(z)$ なので、反転は [EC2の反転](../EC2/index.md#def-ec2-inverse)と一致します。

$$
\Phi_\Lambda(-[z])=-\Phi_\Lambda([z]).
$$

原点近くの [CA9のLaurent展開](../../../解析系/CA/CA9/index.md#prop-ca9-laurent-expansion)では $x=z^{-2}+O(z^2)$、$y=-z^{-3}+O(z)$ です。従って射影座標 $[x:y:1]$ を $y$ で割ると

$$
[x/y:1:1/y]\longrightarrow[0:1:0]=O.
$$

つまり特別に付け足した値も連続な極限と一致します。
<!-- definition-example-end -->

[CA9の三次曲線表示](../../../解析系/CA/CA9/index.md#thm-ca9-torus-cubic-parametrization)は $(\wp,\wp')$ の単射・全射を証明しています。$y$ 座標だけ2で割る変換は可逆なので、$\Phi_\Lambda$ も全単射です。さらに $z=0$ では $x/y=-z+O(z^5)$ が局所座標となり、有限点でも非特異性と $\wp',\wp''$ によって局所逆写像を作れます。したがって両方向が正則な対応です。ただし**全単射であるだけでは、まだ群準同型とはいえません**。

## 2. 割線の傾きから加法の一致を証明する

二点の像の $x$ 座標を加法公式で照合できても、$y$ 座標の符号が残ります。そこで加法公式の微分と曲線の方程式を一緒に使います。

<a id="thm-ec3-group-uniformization"></a>

<!-- formal-statement-start -->
> **定理（格子加法と割線・接線加法の一致）**  
> 任意の複素格子 $\Lambda$ について、Weierstrass写像 $\Phi_\Lambda$ は、$\mathbb C/\Lambda$ の加法から [EC2で定めた曲線上の加法](../EC2/index.md#def-ec2-chord-tangent-addition)への群同型である。すなわち全ての $[u],[v]\in\mathbb C/\Lambda$ に対して

$$
\Phi_\Lambda([u+v])
=
\Phi_\Lambda([u])+\Phi_\Lambda([v])
$$

> が成り立つ。両辺は複素解析的にも互いに逆を持つ正則写像で対応する。
<!-- formal-statement-end -->

### 証明の見取り図

$u,v,u+v$ が格子点でなく、$\wp(u)\ne\wp(v)$ となる一般配置を先に扱います。[CA9の加法公式](../../../解析系/CA/CA9/index.md#thm-ca9-addition-formula)が和の $x$ 座標を与えます。$y$ 座標はこの式を $u$ で微分し、曲線の方程式で整理します。例外となる接点・縦線・原点は、証明した恒等式を正則写像の連続性で延ばします。

<!-- proof-start -->
### 証明

**(1) 一般配置での $x$ 座標。** 記号を短くするため

$$
x=\wp(u),\quad y=\frac{\wp'(u)}2,\quad
a=\wp(v),\quad b=\frac{\wp'(v)}2
$$

と置きます。いずれも $E_\Lambda$ 上にあるから、$A=-g_2/4,\ B=-g_3/4$ として

$$
y^2=x^3+Ax+B,\qquad
b^2=a^3+Aa+B
$$

です。$x\ne a$ なら割線の傾きは

$$
m=\frac{y-b}{x-a}.
$$

[割線・接線による加法](../EC2/index.md#def-ec2-chord-tangent-addition)により、代数的に加えた点の $x$ 座標は $X=m^2-x-a$ です。一方 [CA9の加法公式](../../../解析系/CA/CA9/index.md#thm-ca9-addition-formula)に $u,v$ を代入すると

$$
\wp(u+v)
=-x-a+\frac14
\left(\frac{2y-2b}{x-a}\right)^2
=m^2-x-a=X.
$$

**(2) $y$ 座標の符号。** 曲線の微分方程式を $u$ で微分して

$$
x'=2y,\qquad y'=3x^2+A
$$

を得ます（ここで $'$ は $u$ による微分）。まず上の傾きについて商の微分法を実行します。

$$
m'
=\frac{(3x^2+A)(x-a)-2y(y-b)}{(x-a)^2}
=\frac{3x^2+A-2ym}{x-a}.
$$

また二点の曲線式を引き、$y-b=m(x-a)$ を使えば

$$
(y-b)(y+b)
=(x-a)(x^2+ax+a^2+A),
$$

$$
x^2+ax+a^2+A=m(y+b)=m(2y-m(x-a)).
$$

従って

$$
\begin{aligned}
3x^2+A-2ym
&=2x^2-ax-a^2-(x-a)m^2\\
&=-(x-a)(m^2-2x-a)\\
&=-(x-a)(X-x).
\end{aligned}
$$

これを $m'$ に戻すと $m'=-(X-x)$。ゆえに

$$
\frac{dX}{du}=2mm'-x'
=-2m(X-x)-2y.
$$

$X=\wp(u+v)$ なので、左辺は $\wp'(u+v)$ です。したがって

$$
\frac{\wp'(u+v)}2=-m(X-x)-y.
$$

右辺は割線上の第三交点 $(X,y+m(X-x))$ を $x$ 軸に関して反転した $y$ 座標そのものです。よって一般配置では $x,y$ がともに一致します。

**(3) 例外配置への延長。** $\Phi_\Lambda$ は第1節で見たようにトーラス全体で正則です。EC2の加法は、各点において局所座標から割線の傾きの極を除去して得られる正則な二変数写像です。例えば $v\to u$ なら

$$
\frac{y(v)-y(u)}{x(v)-x(u)}
\longrightarrow
\frac{3x(u)^2+A}{2y(u)}
$$

（$y(u)\ne0$ の場合）となり接線の傾きへ移ります。$y(u)=0$ なら和は $O$ に近づき、$u+v\to2u\in\Lambda$ です。$v\to-u$ の縦線の場合も、第三交点の射影座標が $O$ へ向かいます。$u$ または $v$ が格子点のときは $O$ が単位元です。

一般配置はトーラスの直積の稠密な開集合をなします。両辺の写像は全域で連続なので、一般配置の等式を任意の二点へ極限で移せます。全単射性は第1節で確認済みですから群同型です。$\square$
<!-- proof-end -->

**ここで得たもの。** $n\Phi_\Lambda([z])=\Phi_\Lambda([nz])$ です。たとえば三つの非零半周期点は2倍すると格子類 $[0]$ になるため、三つの非自明な2位数点へ移ります。対応する曲線点は

$$
(e_1,0),\quad(e_2,0),\quad(e_3,0),
$$

であり、$e_i$ が相異なることも [CA9の半周期値の定理](../../../解析系/CA/CA9/index.md#thm-ca9-discriminant-nonzero)で保証されています。格子上の単純な倍算が、EC2の接線の縦線分岐を説明しているわけです。

## 3. 逆方向：任意の複素楕円曲線から周期格子を作る

格子から曲線を作るだけでは、最初から与えられた任意の曲線がトーラスなのか分かりません。これを確かめるには曲線上の微分を積分し、その**閉路積分の周期**を調べます。

[EC1の短い形への変換](../EC1/index.md#thm-ec1-short-form)により、任意の非特異な複素Weierstrass曲線は

$$
E:\quad y^2=f(x)=x^3+Ax+B,\qquad 4A^3+27B^2\ne0
$$

に可逆に移せます。$f$ の根を $e_1,e_2,e_3$ とすれば、判別式非零により三根は相異なります。$x:E(\mathbb C)\to\mathbb P^1(\mathbb C)$ は一般の $x$ で $(x,\pm\sqrt{f(x)})$ の二点を持ち、三根と無限遠点で二枚が合流します。三根のうち二つを結ぶ切れ目と、残る一根を無限遠へ結ぶ切れ目を球面上に引き、その両岸を二枚のコピーの間で貼り替えると、二つの環状領域を境界で貼った**位相的なトーラス**になります。独立な閉路 $a,b$ を一周ずつ選べば、任意の閉路は向きと回数を考慮して整数係数の $a,b$ に対応します。

曲線上の正則微分を局所座標ごとに整合する形で扱う方法は [CA8の正則微分の定義](../../../解析系/CA/CA8/index.md#def-ca8-holomorphic-one-form)に従います。ここで候補

$$
\omega=\frac{dx}{2y}
$$

を取ります。$y\ne0$ では $x$ を局所座標とできるので正則です。$y=0$ の点は $f'(x)\ne0$ であり、曲線式の微分 $2y\,dy=f'(x)\,dx$ より

$$
\omega=\frac{dy}{f'(x)}
$$

と書けるため、ここでも正則かつ零でありません。無限遠点 $O$ では $t=-x/y$ を局所座標に取ると $x=t^{-2}+O(t^2),\ y=-t^{-3}+O(t)$ で、

$$
\omega=(1+O(t^4))\,dt
$$

となります。したがって曲線全体で零点を持たない正則微分です。

<a id="def-ec3-period-lattice"></a>

<!-- formal-statement-start -->
> **定義（楕円曲線の周期格子）**  
> 非特異な複素曲線 $E:y^2=x^3+Ax+B$ 上の微分 $\omega=dx/(2y)$ と、上に説明した二つの向き付き基本閉路 $a,b$ について、その積分値を

$$
\Omega_1=\int_a\omega,\qquad
\Omega_2=\int_b\omega
$$

> とする。この二数が実線形独立であることを次の定理で示し、そのとき

$$
\Lambda_E=\mathbb Z\Omega_1+\mathbb Z\Omega_2
$$

> を $E$ の（この微分による）周期格子と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec3-period-lattice -->
**定義の確認。** 一度 $a$ を周回する積分は $\Omega_1$、逆向きなら $-\Omega_1$、$a$ のあと $b$ を周回すれば積分の加法性から $\Omega_1+\Omega_2$ です。したがって閉路を整数回組み合わせて得られる積分は全て $\Lambda_E$ に含まれます。逆に両基本閉路の積分が実際に $\Omega_1,\Omega_2$ なので、格子内の整数結合は全て周期として実現します。非平行性はまだ前提にせず、次の証明で確かめます。
<!-- definition-example-end -->

<a id="thm-ec3-converse-uniformization"></a>

<!-- formal-statement-start -->
> **定理（複素楕円曲線の逆一様化）**  
> 非特異な複素Weierstrass曲線 $E$ を短い形にして得た上の $\omega$ に対し、$\Omega_1,\Omega_2$ は実線形独立である。従って $\Lambda_E$ は複素格子であり、$P\in E(\mathbb C)$ に対する積分の同値類

$$
\mathcal A(P)
=
\left[\int_O^P\omega\right]\in\mathbb C/\Lambda_E
$$

> は経路に依存せず、$E(\mathbb C)$ と $\mathbb C/\Lambda_E$ の間の双正則写像を与える。その逆写像は $\Phi_{\Lambda_E}$ である。ゆえに全ての複素楕円曲線は複素トーラスから得られる。
<!-- formal-statement-end -->

### 証明の見取り図

非平行な周期が二つあることは、微分の絶対値二乗を曲線全体で積分した正の面積から示します。積分写像はどの点でも導関数が零でないので局所同型です。さらに基本閉路が作る周期がすべて現れることから、覆う枚数は1になります。最後に逆写像の座標関数と $\wp$ を比較します。

<!-- proof-start -->
### 証明

**(1) 二周期の独立性。** $a,b$ を切り開いたトーラスの基本領域を $D$ とします。$D$ は二つの基本閉路に沿って切り開いた円板状の領域で、全ての閉路が点へ縮められるため積分の経路依存がありません。そこで $\omega$ の原始関数 $F$ を取れます。複素共役の微分を $\overline\omega$ と書き、Stokesの公式を $d(F\overline\omega)=\omega\wedge\overline\omega$ に適用します。向きの取り方を $a,b$ の正向きに合わせると、向かい合う辺における $F$ の値の差がそれぞれ $\Omega_1,\Omega_2$ となり、

$$
\int_E\omega\wedge\overline\omega
=
\Omega_1\overline{\Omega_2}
-
\Omega_2\overline{\Omega_1}.
$$

局所座標 $w=s+it$ で $\omega=h(w)\,dw$ なら

$$
\frac{i}{2}\,\omega\wedge\overline\omega
=|h(w)|^2\,ds\wedge dt
$$

です。$h$ はどこでも零でないため、この二次元積分は正です。従って右辺は零ではありません。$\Omega_1\overline{\Omega_2}-\Omega_2\overline{\Omega_1}\ne0$ は $\operatorname{Im}(\Omega_1\overline{\Omega_2})\ne0$ と同値です。すなわち二周期は実線形独立で、$\Lambda_E$ は格子になります。

**(2) 積分写像は一対一の被覆。** $O$ から $P$ への二つの経路の積分差は閉路の積分であり、基本閉路によって $\mathbb Z\Omega_1+\mathbb Z\Omega_2$ に属します。従って $\mathcal A$ は良定義です。[CA8の局所正則座標](../../../解析系/CA/CA8/index.md#def-ca8-complex-chart)で $\omega=h(w)\,dw$、$h(w)\ne0$ と表せるので、積分写像の局所表示の導関数は $h(w)$ です。正則逆関数定理によって局所双正則です。

$E(\mathbb C)$ はコンパクトかつ連結です。局所双正則写像の像は開で、コンパクト性により閉でもあるので、連結なトーラス $\mathbb C/\Lambda_E$ 全体へ写ります。さらにコンパクトな定義域からの局所同型は有限枚被覆です。その被覆が定める基本群の部分群は、閉路 $a,b$ の像がそれぞれ $\Omega_1,\Omega_2$ に対応するため、$\pi_1(\mathbb C/\Lambda_E)\cong\Lambda_E$ の全体です。被覆の枚数はこの部分群の指数に等しく、指数1なので $\mathcal A$ は一対一です。従って双正則写像です。

**(3) 逆写像と $\wp$ の一致。** $\psi=\mathcal A^{-1}$ とし、$X(z)=x(\psi([z]))$、$Y(z)=y(\psi([z]))$ と置きます。$\mathcal A$ の定義より $\psi^*\omega=dz$ なので

$$
\frac{dX}{dz}=2Y.
$$

無限遠点では $t=-x/y$ と $\omega=(1+O(t^4))dt$ だから $z=t+O(t^5)$、従って $X=z^{-2}+O(z^2)$ です。$x$ は $O$ に二重極を一つ持ち、他には極を持ちません。[$\wp$ の極構造](../../../解析系/CA/CA9/index.md#thm-ca9-weierstrass-symmetry-periodicity)も同じなので $X-\wp_{\Lambda_E}$ は極のない楕円関数です。[CA8の正則関数の剛性](../../../解析系/CA/CA8/index.md#thm-ca8-compact-holomorphic-constant)により定数 $c$ です。しかも上の展開と $\wp(z)=z^{-2}+O(z^2)$ の比較から $c=0$ です。従って

$$
X(z)=\wp_{\Lambda_E}(z),\qquad
Y(z)=\frac12 X'(z)=\frac12\wp_{\Lambda_E}'(z).
$$

つまり $\psi=\Phi_{\Lambda_E}$ です。曲線式に代入すれば $A=-g_2(\Lambda_E)/4$、$B=-g_3(\Lambda_E)/4$ も得られます。$\square$
<!-- proof-end -->

ここでの微分の正規化は重要です。別の微分 $c\omega$（$c\ne0$）を取ると全周期が $c$ 倍になりますが、対応する複素トーラスの同型類は変わりません。

## 4. $j$ 不変量は同型をどう区別するか

格子を同じ複素数で拡大・回転させると、商の形も群としての性質も変わりません。この比較を正確に述べるため、次の関係を用います。

<a id="def-ec3-lattice-homothety"></a>

<!-- formal-statement-start -->
> **定義（複素格子の相似）**  
> 二つの複素格子 $\Lambda,\Lambda'\subset\mathbb C$ に対し、ある $a\in\mathbb C^\times$ が存在して $\Lambda'=a\Lambda$ となるとき、二格子は相似であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec3-lattice-homothety -->
**定義の確認。** $\Lambda=\mathbb Z+i\mathbb Z$、$\Lambda'=2\mathbb Z+2i\mathbb Z$ なら、任意の $m,n\in\mathbb Z$ に対して $2(m+ni)=2m+2ni$ なので $2\Lambda=\Lambda'$ です。$a=2\ne0$ が定義の条件を満たします。写像 $[z]\mapsto[2z]$ は $\mathbb C/\Lambda$ から $\mathbb C/\Lambda'$ への良定義な群同型で、逆は $[w]\mapsto[w/2]$ です。
<!-- definition-example-end -->

一般に $\Lambda'=a\Lambda$ なら $[z]\mapsto[az]$ が商の同型を与えます。曲線側でも $x,y$ をそれぞれ $a^{-2},a^{-3}$ 倍すると [CA9のスケーリング則](../../../解析系/CA/CA9/index.md#prop-ca9-scaling)と係数変換が一致します。

<a id="def-ec3-j-invariant"></a>

<!-- formal-statement-start -->
> **定義（楕円曲線と格子のj不変量）**  
> 非特異な複素楕円曲線 $E:y^2=x^3+Ax+B$ と、複素格子 $\Lambda$ に対し、それぞれ

$$
j(E)=1728\,\frac{4A^3}{4A^3+27B^2},
\qquad
j(\Lambda)=1728\,\frac{g_2(\Lambda)^3}
{g_2(\Lambda)^3-27g_3(\Lambda)^2}
$$

> と定める。いずれも分母は非零である。一般Weierstrass形では [EC1の不変量](../EC1/index.md#def-ec1-invariants)を用いた $j=c_4^3/\Delta$ と同じ値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec3-j-invariant -->
**定義の確認。** $E:y^2=x^3-x$ では $A=-1,B=0$、判別式 $-16(-4)=64\ne0$ ですから

$$
j(E)=1728\frac{-4}{-4}=1728.
$$

$E:y^2=x^3+1$ では $A=0,B=1$、判別式 $-432\ne0$ で $j(E)=0$ です。$\Lambda_\square=\mathbb Z+i\mathbb Z$ なら [CA9の正方格子の計算](../../../解析系/CA/CA9/index.md#prop-ca9-scaling)から $g_3=0$、かつ判別式非零なので $g_2\ne0$、従って $j(\Lambda_\square)=1728$。六角対称の格子では $g_2=0$、従って $j=0$ です。どちらも分母非零を確かめてから値を出しています。
<!-- definition-example-end -->

<a id="thm-ec3-j-classification"></a>

<!-- formal-statement-start -->
> **定理（複素数上のjによる同型分類）**  
> 原点を保つ二つの複素楕円曲線 $E,E'$ が同型であるための必要十分条件は、次の等式である。

$$
j(E)=j(E').
$$

> 同様に二つの複素格子 $\Lambda,\Lambda'$ が相似であるための必要十分条件は

$$
j(\Lambda)=j(\Lambda')
$$

> である。これは **$\mathbb C$ 上**の分類であり、$\mathbb Q$ 上の同型を判定する主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

必要性は許される座標変換に対する不変性です。十分性は短い形の係数 $A,B$ を比較し、同じ $j$ なら必要な4乗根・6乗根を**複素数体で**選べることを使います。格子については第3節の逆一様化と正則な群準同型の形を組み合わせます。

<!-- proof-start -->
### 証明

**(1) 曲線の必要性。** 原点を保つ同型がどの座標変換を誘導するかを先に確かめます。第3節で曲線は $\mathbb C/\Lambda$ と同一視できます。格子類 $[0]$ 以外で極のない有理型関数のLaurent主部を考えます。[留数和が0となる定理](../../../解析系/CA/CA9/index.md#thm-ca9-residue-sum-zero)により唯一の極の $z^{-1}$ 項は零です。従って唯一の極の位数が2以下なら $\wp$ の適切な倍を引いた差は正則楕円関数、位数が3以下なら $\wp'$ と $\wp$ の適切な倍を引いた差は正則楕円関数です。$L(nO)$ を、$O$ 以外に極を持たず、$O$ で高々 $n$ 位の極を持つ有理型関数の空間と書きます。上の主部の消去と [正則楕円関数の剛性](../../../解析系/CA/CA8/index.md#thm-ca8-compact-holomorphic-constant)から、それぞれ

$$
L(2O)=\operatorname{span}_{\mathbb C}\{1,x\},\qquad
L(3O)=\operatorname{span}_{\mathbb C}\{1,x,y\}
$$

となります。曲線同型が原点を保つなら新座標もこの空間に入るため

$$
x'=\alpha x+r,\qquad
y'=\beta y+s x+t,\qquad \alpha\beta\ne0
$$

と書けます。短い形 $y'^2=x'^3+A'x'+B'$ に代入し、$y$ の一次項を比較すると $2\beta(sx+t)=0$ なので $s=t=0$。$x^3$ 係数を比較して $\beta^2=\alpha^3$、$x^2$ 係数から $3\alpha^2r=0$ なので $r=0$。残りの係数から

$$
A'=\alpha^2A,\qquad B'=\alpha^3B.
$$

$\mathbb C$ で $u^2=\alpha$ を選び、必要なら $u$ を $-u$ に替えれば $\beta=u^3$ とできます。従って全ての原点保存同型は $(x,y)\mapsto(u^2x,u^3y)$ という尺度変換です。これは [EC1の許される変換](../EC1/index.md#prop-ec1-admissible-change)の短い形同士の場合とも一致します。従って $c_4^3/\Delta$、すなわち $j$ は変わりません。

**(2) 曲線の十分性。** $E:y^2=x^3+Ax+B$、$E':y^2=x^3+A'x+B'$ とし、$j(E)=j(E')$ と仮定します。

$j=0$ なら $A=A'=0$、判別式非零から $B,B'\ne0$ です。複素数体で $u^6=B'/B$ を解けば尺度変換を得ます。$j=1728$ なら $B=B'=0$、$A,A'\ne0$ なので $u^4=A'/A$ を解けばよい。

残りの場合 $A,B,A',B'$ は全て非零です。$j$ の式で交差乗算すると

$$
A^3B'^2=A'^3B^2.
$$

$r=A'/A,\ s=B'/B$ とすると $r^3=s^2$。ここで $t=s/r$ と置けば

$$
t^2=\frac{s^2}{r^2}=r,\qquad
t^3=\frac{s^3}{r^3}=s.
$$

複素数で $u^2=t$ を取れば、$u^4=r$、$u^6=s$。よって $(x,y)\mapsto(u^2x,u^3y)$ が $E$ から $E'$ への原点を保つ同型を与えます。

**(3) 格子の分類。** $\Lambda'=a\Lambda$ なら [CA9のスケーリング則](../../../解析系/CA/CA9/index.md#prop-ca9-scaling)から $g_2'=a^{-4}g_2$、$g_3'=a^{-6}g_3$ なので $j(\Lambda')=j(\Lambda)$。

逆に $j(\Lambda)=j(\Lambda')$ なら上の曲線の結論と第3節の一様化により、$\mathbb C/\Lambda\to\mathbb C/\Lambda'$ の原点を保つ双正則な群同型 $f$ が存在します。商への射影と [CA8の被覆写像](../../../解析系/CA/CA8/index.md#def-ca8-covering-map)により、$f$ を $F:\mathbb C\to\mathbb C$、$F(0)=0$ に持ち上げられます。加法保存から

$$
F(u+v)-F(u)-F(v)\in\Lambda'
$$

であり、左辺は連続、右辺は離散集合なので定数0です。従って $F$ は加法的で正則です。微分して $F'(u)=F'(0)=a$、積分して $F(z)=az$。双方向の同型とその逆を考えれば $a\Lambda=\Lambda'$ が従います。$\square$
<!-- proof-end -->

**注意：有理数体では違う。** $y^2=x^3-x$ と $y^2=x^3-4x$ はともに $j=1728$ ですが、上の尺度変換には $u^4=4$ が必要です。$u=\sqrt2$ など複素数では存在しても、有理数 $u$ には $u^4=4$ を満たすものがありません（$u^2=2$ または $-2$ が必要）。従ってこの二つは $\mathbb C$ 上では同型ですが、$\mathbb Q$ 上では原点を保つ同型ではありません。これは $j$ だけから $\mathbb Q$ 上の同型を結論してはいけない具体例です。

## 5. 対称な格子と複素乗法の入口

任意の整数 $n$ は $n\Lambda\subseteq\Lambda$ を満たし、$[z]\mapsto[nz]$ はトーラスの群自己準同型です。整数以外の複素数も格子を保つことがあり、そのとき追加の自己準同型が生まれます。これが複素乗法（CM）を考える出発点です。ここでは一般分類ではなく、手で検算できる二例を扱います。

<a id="def-ec3-complex-multiplication"></a>

<!-- formal-statement-start -->
> **定義（格子表示における複素乗法）**  
> 複素格子 $\Lambda$ に対し、

$$
R_\Lambda=\{\alpha\in\mathbb C:\alpha\Lambda\subseteq\Lambda\}
$$

> と置く。この集合の各 $\alpha$ は $[z]\mapsto[\alpha z]$ という複素トーラスの群自己準同型を定める。$R_\Lambda$ が整数倍写像に対応する $\mathbb Z$ より真に大きいとき、$\mathbb C/\Lambda$（および対応する楕円曲線）は複素乗法を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec3-complex-multiplication -->
**定義の確認。** 正方格子 $\Lambda_\square=\mathbb Z+i\mathbb Z$ では

$$
i(m+ni)=-n+mi\in\Lambda_\square\qquad(m,n\in\mathbb Z)
$$

なので $i\in R_{\Lambda_\square}$。$i\notin\mathbb Z$ ですから整数倍以外の自己準同型です。さらに $i^2=-1$ なので、この写像を二度適用すると反転写像になります。$\rho=e^{\pi i/3}$、$\Lambda_\triangle=\mathbb Z+\rho\mathbb Z$ では $\rho^2=\rho-1$ だから

$$
\rho(m+n\rho)=-n+(m+n)\rho\in\Lambda_\triangle.
$$

ここでも $\rho\notin\mathbb Z$ で、$\rho^2-\rho+1=0$ です。どちらも格子の**二つの生成元の像**を確認したので、定義の包含条件を全ての格子元について検証できています。
<!-- definition-example-end -->

逆に一般の格子で任意の複素数を掛けられるわけではありません。例えば $[z]\mapsto[\sqrt2z]$ が $\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で良定義なら $\sqrt2\cdot1\in\mathbb Z+i\mathbb Z$ が必要ですが、$\sqrt2$ は整数でないので成立しません。複素乗法は単に複素座標で表しているという意味ではなく、**格子を保つ追加の複素スカラー**があるという条件です。一般の自己準同型環や同種写像の次数はEC4で扱います。

## 6. 演習：格子、群法則、分類を再現する

### A1. 正方格子の反転と半周期

$\Lambda=\mathbb Z+i\mathbb Z$ において、$[1/2],[i/2],[(1+i)/2]$ が相異なる2位数点であることと、その像が $E_\Lambda$ の $y=0$ の三点であることを示せ。

- Level: A
- ID: EC3-A1

<!-- solution-start -->
**詳細解答。** 各点を2倍すると $1,i,1+i\in\Lambda$ なので $2[z]=[0]$ です。他方、$1/2$ や $i/2$ とその差 $(1-i)/2$ は実部・虚部の少なくとも一方が整数でなく、どれも格子点でも互いに同じ類でもありません。$\wp'$ は奇かつ格子周期的なので $2z\in\Lambda$ のとき $\wp'(z)=\wp'(-z)=-\wp'(z)$、従って $\wp'(z)=0$。三像の $y$ は零です。相異なる $x$ 座標は [CA9の三次非退化定理](../../../解析系/CA/CA9/index.md#thm-ca9-discriminant-nonzero)から従い、三点とも非特異曲線上です。
<!-- solution-end -->

### A2. $g_2,g_3$ と判別式の変換

$E_\Lambda$ の係数 $A,B$ と判別式を $g_2,g_3$ で表し、$a\ne0$ のとき $\Delta(E_{a\Lambda})=a^{-12}\Delta(E_\Lambda)$ を導け。

- Level: A
- ID: EC3-A2

<!-- solution-start -->
**詳細解答。** $A=-g_2/4,B=-g_3/4$ だから

$$
\Delta=-16(4A^3+27B^2)=g_2^3-27g_3^2.
$$

[スケーリング則](../../../解析系/CA/CA9/index.md#prop-ca9-scaling)により $g_2(a\Lambda)=a^{-4}g_2(\Lambda)$、$g_3(a\Lambda)=a^{-6}g_3(\Lambda)$ です。従って

$$
\Delta(E_{a\Lambda})
=(a^{-4}g_2)^3-27(a^{-6}g_3)^2
=a^{-12}(g_2^3-27g_3^2).
$$

$a\ne0$ なので非零性は保たれます。
<!-- solution-end -->

### A3. 二つの $j$ の直接計算

$\mathbb C$ 上の $E_1:y^2=x^3-x$ と $E_2:y^2=x^3+1$ が非特異であることを確認し、$j(E_1)$ と $j(E_2)$ を求めよ。

- Level: A
- ID: EC3-A3

<!-- solution-start -->
**詳細解答。** $E_1$ では $A=-1,B=0$、従って $\Delta=-16(4(-1)^3)=64\ne0$。$j=1728\cdot(-4)/(-4)=1728$ です。$E_2$ では $A=0,B=1$、$\Delta=-16(27)=-432\ne0$。分母27は非零で分子0なので $j=0$ です。同じ $j$ ではないから、[複素数上のjによる同型分類](#thm-ec3-j-classification)よりこの二曲線は $\mathbb C$ 上で同型ではありません。
<!-- solution-end -->

### A4. 正方格子のCMを検査する

$\Lambda=\mathbb Z+i\mathbb Z$ において $\alpha=i$ が自己準同型を誘導すること、$\alpha^2=-1$、そして $\alpha=1/2$ は自己準同型を誘導しないことを証明せよ。

- Level: A
- ID: EC3-A4

<!-- solution-start -->
**詳細解答。** 格子元 $m+ni$ を $i$ 倍すると $-n+mi\in\Lambda$ なので $i\Lambda\subseteq\Lambda$。もし代表元を $z+\lambda$ に変えると $i(z+\lambda)-iz=i\lambda\in\Lambda$ ですから $[z]\mapsto[iz]$ は良定義。二度適用すると $[i^2z]=[-z]$ になります。一方、$1\in\Lambda$ に対して $(1/2)\cdot1=1/2\notin\Lambda$ なので $(1/2)\Lambda\subseteq\Lambda$ は成立せず、$[z]\mapsto[z/2]$ は商上で良定義ではありません。
<!-- solution-end -->

### B1. 加法公式の $y$ 座標を復元する

$E:y^2=x^3+Ax+B$ 上で $P(u)=(x(u),y(u))$、$Q=(a,b)$ を取り、$x'=2y,\ y'=3x^2+A$、$m=(y-b)/(x-a)$ とする。$X=m^2-x-a$ の微分から $Y=-m(X-x)-y$ を導け（$x\ne a$）。

- Level: B
- ID: EC3-B1

<!-- solution-start -->
**詳細解答。** $m'=((3x^2+A)(x-a)-2y(y-b))/(x-a)^2$ なので $m'=(3x^2+A-2ym)/(x-a)$。曲線式の差は

$$
(y-b)(y+b)=(x-a)(x^2+ax+a^2+A).
$$

$y-b=m(x-a)$ から $x^2+ax+a^2+A=m(y+b)=m(2y-m(x-a))$。これを並べ替えて

$$
3x^2+A-2ym=-(x-a)(m^2-2x-a)=-(x-a)(X-x)
$$

なので $m'=-(X-x)$。従って

$$
X'=2mm'-x'=-2m(X-x)-2y=2Y.
$$

$X=\wp(u+v)$ なら $Y=X'/2=\wp'(u+v)/2$ となり、[群法則の一致](#thm-ec3-group-uniformization)で必要な符号まで決まります。
<!-- solution-end -->

### B2. $j$ が同じ曲線の尺度を構成する

$E:y^2=x^3-1$ と $E':y^2=x^3-64$ について、$j$ を比較し、$\mathbb C$ 上の明示的な同型を作れ。

- Level: B
- ID: EC3-B2

<!-- solution-start -->
**詳細解答。** 両曲線とも $A=0$、$B=-1,-64$ で、$\Delta=-432B^2\ne0$ です。従って $j(E)=j(E')=0$。尺度変換 $(x,y)\mapsto(u^2x,u^3y)$ が $B$ を $u^6B$ に変えるので $u^6=64$ を選びます。$u=2$ と取れば

$$
x'=4x,\qquad y'=8y,
$$

$$
(y')^2=64y^2=64(x^3-1)=(4x)^3-64=(x')^3-64.
$$

逆写像 $(x',y')\mapsto(x'/4,y'/8)$ も明示でき、$O$ は $O$ に写るので同型です。
<!-- solution-end -->

### B3. 有理数体のtwistに注意する

$E:y^2=x^3-x$ と $E':y^2=x^3-4x$ の $j$ は同じか。$\mathbb C$ 上の同型を与え、$\mathbb Q$ 上で同じ尺度変換が存在しないことを示せ。

- Level: B
- ID: EC3-B3

<!-- solution-start -->
**詳細解答。** 両方とも $B=0$、$A=-1,-4$ で $A\ne0$、ゆえに $j=1728$。尺度変換には $u^4=A'/A=4$ が必要です。$\mathbb C$ では $u=\sqrt2$ を選び、$(x,y)\mapsto(2x,2\sqrt2\,y)$ とすれば

$$
(2\sqrt2\,y)^2=8(x^3-x)=(2x)^3-4(2x).
$$

一方 $u\in\mathbb Q$ なら $u^4=4$ より $u^2=2$（有理数の平方は負でない）ですが、$\sqrt2\notin\mathbb Q$。短い形同士の原点を保つ一般の同型は [EC1の許容変換](../EC1/index.md#prop-ec1-admissible-change)からこの尺度変換に限られるため、$\mathbb Q$ 上では同型ではありません。
<!-- solution-end -->

### C1. 三つの橋を一つにつなぐ

非特異な $E/\mathbb C:y^2=x^3+Ax+B$ と $\omega=dx/(2y)$ を考える。(a) $\omega$ が $y=0$ と $O$ で正則かつ零でないことを局所座標で確かめよ。(b) 二つの周期が実線形独立であるために、基本領域上の Stokes 計算が何を示せばよいか記せ。(c) 周期格子 $\Lambda_E$ から曲線を復元し、$\Phi_{\Lambda_E}$ が群同型である理由を、使用した既出定理を明示して説明せよ。

- Level: C
- ID: EC3-C1

<!-- solution-start -->
**詳細解答。** (a) $f(x)=x^3+Ax+B$ とする。非特異性から $y=0$ のとき $f'(x)\ne0$。方程式を微分した $2y\,dy=f'(x)\,dx$ から

$$
\omega=\frac{dx}{2y}=\frac{dy}{f'(x)}
$$

で、$y$ を局所座標とすると係数 $1/f'(x)$ は正則かつ非零。$O$ では $t=-x/y$ を使い $x=t^{-2}+O(t^2)$、$y=-t^{-3}+O(t)$ だから $\omega=(1+O(t^4))dt$ です。

(b) $E$ を二基本閉路 $a,b$ で切り開き、$\omega$ の原始関数 $F$ を置くと Stokes から

$$
\int_E\omega\wedge\overline\omega
=\Omega_1\overline{\Omega_2}-\Omega_2\overline{\Omega_1}.
$$

局所表示 $\omega=h(w)dw$ では $(i/2)\omega\wedge\overline\omega=|h|^2ds\,dt>0$。したがって左辺は非零、$\operatorname{Im}(\Omega_1\overline{\Omega_2})\ne0$ です。二周期は平行ではありません。

(c) 周期格子で積分を商に取ると、経路を変えても差は $\Lambda_E$ に入ります。[逆一様化定理](#thm-ec3-converse-uniformization)により積分写像は双正則で逆は $\wp$ による $\Phi_{\Lambda_E}$。この写像について [格子加法と割線加法の一致](#thm-ec3-group-uniformization)を適用すれば

$$
\Phi_{\Lambda_E}([u+v])
=\Phi_{\Lambda_E}([u])+\Phi_{\Lambda_E}([v]).
$$

従って積分で得た複素トーラスの通常加法と、曲線の割線・接線群則が同じ群構造です。逆写像の存在だけを群同型の理由にせず、加法公式の計算が必要だった点が重要です。
<!-- solution-end -->

## 7. 次に必要になる道具

複素数上では、楕円曲線の点を格子類で表して足し算・倍算・同型を解析的に理解できました。しかし有限体では複素格子をそのまま使えません。EC4では、体に依存しない写像としての同種写像、自己準同型、有限位数点を代数的に定義し、有限体のFrobeniusと点数評価へ向かいます。
