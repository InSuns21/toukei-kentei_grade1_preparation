# AFR19 Weil表現・theta級数

[AFR9 の有理数体のアデールPoisson和公式](../AFR9/index.md#thm-afr9-poisson) では試験関数を Fourier 変換しても有理数に沿った総和は変わりませんでした。[CA12 の theta 変換](../../../解析系/CA/CA12/index.md#thm-ca12-theta-transformation) ではこの現象を Gauss 関数で見ました。今回は一つの関数の変換公式から、試験関数の空間全体に作用する行列群へ進みます。行列の積と関数の変換の合成がどこまで一致するか、さらに有理点の和を取るとどうなるかを調べます。

<!-- definition-example-audit: strict -->

## 1. 平行移動と振動を一つの作用にする

実数上の滑らかで、すべての導関数が任意の多項式より速く減衰する関数を考えます。これは [Schwartz–Bruhat関数](../AFR9/index.md#def-afr9-schwartz-bruhat) の実素点の部分であり、空間を $\mathcal S(\mathbb R)$ と書きます。位置を $v$ だけずらす作用と、周波数 $u$ の振動を掛ける作用は一般に交換しません。例えば振動を掛けた関数をずらすと $e^{-2\pi iuv}$ が余分に現れます。

二つの作用を対称に組み合わせて、位相差を明示します。$w=(u,v)$ は標準基底での列ベクトルとし、$W(w)$ は $W(u,v)$ の略記とします。作用素の積 $UV$ は先に $V$、次に $U$ を作用させる合成で、$I$ は作用素の場合には恒等作用素、行列の場合には単位行列を表します。

<a id="def-afr19-weyl"></a>

<!-- formal-statement-start -->
> **定義（Weyl作用）**
> $u,v\in\mathbb R$ に対して、$\mathcal S(\mathbb R)$ 上の線形作用素を

$$
(W(u,v)f)(x)=e^{2\pi iu(x-v/2)}f(x-v)
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr19-weyl -->
**定義の確認**

$f(x)=e^{-\pi x^2}$、$(u,v)=(1,2)$ なら

$$
(W(1,2)f)(x)=e^{2\pi i(x-1)}e^{-\pi(x-2)^2}.
$$

$k$ 回微分すると積の微分則により、定数と $x-2$ の多項式を Gauss 関数と絶対値1の指数関数に掛けた有限和になります。任意の $x^m$ をさらに掛けても有界なので、出力は再び同じ空間に属します。一般の $f$ でも微分はずらした導関数の有限和となり、$x=(x-v)+v$ の展開で同じ減衰条件を確認できます。各操作は線形です。
<!-- definition-example-end -->

列 $w=(u,v)$、$w'=(u',v')$ に対し、実数値の双線形形式を

$$
\sigma(w,w')=uv'-u'v=\det[\,w\ \ w'\,]
$$

とします。右端は二つの列を並べた行列の行列式です。各引数について線形で、$\sigma(w,w)=0$ なので交代形式です。さらに $\sigma(w,(0,1))=u$、$\sigma(w,(1,0))=-v$ より、すべての $w'$ に対して $\sigma(w,w')=0$ なら $w=0$ です。この非退化性は交代性とは別の条件です。行列式1の行列 $g$ については

$$
\sigma(gw,gw')=\det(g[\,w\ \ w'\,])
=\det(g)\sigma(w,w')=\sigma(w,w')
$$

となります。これは位置と周波数を混ぜても保存したい量です。

<a id="prop-afr19-weyl-product"></a>

<!-- formal-statement-start -->
> **命題（Weyl作用の積公式）**
> 実数上のWeyl作用について、任意の二つの列 $w,w'\in\mathbb R^2$ に対して

$$
W(w)W(w')=e^{\pi i\sigma(w,w')}W(w+w')
$$

> が成立する。特に $W(w)^{-1}=W(-w)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二回ずらした結果は一回で $v+v'$ ずらすことと同じです。指数の定数項だけを比較すると、二つの列の交代形式が残ります。

<!-- proof-start -->
### 証明

合成を実際に計算すると

$$
(W(w)W(w')f)(x)
=e^{2\pi i[u(x-v/2)+u'(x-v-v'/2)]}f(x-v-v').
$$

一方、$W(w+w')$ の指数を $2\pi i$ で割った値は $(u+u')(x-(v+v')/2)$ です。差は

$$
-uv/2-u'v-u'v'/2+(u+u')(v+v')/2
=(uv'-u'v)/2.
$$

従って積公式が成立します。$w'=-w$ なら交代形式は0、$W(0)=I$ なので逆作用も得られます。
<!-- proof-end -->

例えば

$$
W(1,0)W(0,1/2)=-W(0,1/2)W(1,0)
$$

です。順序の違いは位相として現れます。Heisenberg群はこの位相を第三の実座標 $t$ へ取り込みます。積を

$$
(w,t)(w',t')=(w+w',t+t'+\sigma(w,w')/2)
$$

とします。三つの元を左から結合したとき、実座標への追加分は

$$
\frac{\sigma(w,w')+\sigma(w+w',w'')}{2}
$$

であり、右から結合したときは

$$
\frac{\sigma(w',w'')+\sigma(w,w'+w'')}{2}
$$

です。$\sigma$ の式を展開すれば、どちらも三組の交代形式の和の半分になります。単位元は $(0,0)$、逆元は $(-w,-t)$ です。[Weyl作用の積公式](#prop-afr19-weyl-product) から、$(w,t)\mapsto e^{2\pi it}W(w)$ はこの群の表現になります。

## 2. 行列を関数の変換へ移す

$SL_2(\mathbb R)$ は実2次正方行列で行列式が1のもの全体です。上の交代形式を保存するので、この群で位置と周波数の組を動かせます。その動きを関数への作用素 $U$ で実現するとは、$UW(w)U^{-1}=W(gw)$ が成り立つことです。

三つの行列を使います。

$$
n(b)=\begin{pmatrix}1&b\\0&1\end{pmatrix},\quad
m(a)=\begin{pmatrix}a&0\\0&a^{-1}\end{pmatrix},\quad
s=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

$b\in\mathbb R$、$a\in\mathbb R^\times=\mathbb R\setminus\{0\}$ とし、それぞれ二次位相、尺度変換、Fourier変換を対応させます。最後の積分核は [AFR9 のアデールFourier変換](../AFR9/index.md#def-afr9-adelic-fourier) の実成分に合わせます。

<a id="def-afr19-generators"></a>

<!-- formal-statement-start -->
> **定義（振動子作用の基本変換）**
> $\mathcal S(\mathbb R)$ 上で、$b\in\mathbb R$、$a\ne0$ に対し

$$
(N_b f)(x)=e^{\pi ibx^2}f(x),
\qquad (D_a f)(x)=|a|^{1/2}f(ax),
$$

$$
(F f)(y)=\int_{\mathbb R}f(x)e^{-2\pi ixy}\,dx
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr19-generators -->
**定義の確認**

$f(x)=e^{-\pi x^2}$ の場合、$N_1f=e^{-\pi(1-i)x^2}$、$D_2f=\sqrt2e^{-4\pi x^2}$ です。[Gauss関数のFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform) に $\varepsilon=\pi,\ \xi=2\pi y$ を入れると $Ff(y)=e^{-\pi y^2}$ です。三つとも微分すると多項式と指数減衰の積になり、Schwartz 条件を満たします。

一般の $f$ についても、$N_b$ は積の微分則、$D_a$ は連鎖律から同条件を保ちます。$F$ については [アデールFourier反転](../AFR9/index.md#thm-afr9-inversion) の実成分の証明で使った、微分と部分積分による急減少性が適用できます。いずれも線形で、逆は $N_{-b}$、$D_{1/a}$、$F^{-1}f(x)=Ff(-x)$ です。
<!-- definition-example-end -->

係数 $|a|^{1/2}$ は積分ノルム $\|f\|_2=(\int_{\mathbb R}|f(x)|^2dx)^{1/2}$ を保つためです。実際、$u=ax$ と置くと

$$
\int |D_af(x)|^2dx
=|a|\int |f(ax)|^2dx=\int |f(u)|^2du.
$$

$N_b$ は絶対値1の因子を掛けるので同じノルムを保ちます。$F$ もノルムを保ちます。$f,Ff$ が急減少で可積分なので、二重積分の絶対可積分性から積分順を交換すると

$$
\int |Ff(y)|^2dy
=\int f(x)\overline{\int Ff(y)e^{2\pi ixy}dy}\,dx.
$$

内側は [Fourier反転](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion) に $\xi=2\pi y$ を代入した式により $f(x)$ です。

<a id="thm-afr19-covariance"></a>

<!-- formal-statement-start -->
> **定理（基本変換の共変性）**
> $b\in\mathbb R,\ a\in\mathbb R^\times$ とする。第2節の基本変換 $N_b,D_a,F$ と行列 $n(b),m(a),s$ に対し、すべての $w\in\mathbb R^2$ について

$$
N_bW(w)N_b^{-1}=W(n(b)w),\qquad
D_aW(w)D_a^{-1}=W(m(a)w),
$$

$$
FW(w)F^{-1}=W(sw)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

位相を二次式の差として展開すると剪断が生じます。尺度変換では位置と周波数が逆の倍率を受けます。Fourier変換は位置と周波数を符号付きで交換します。

<!-- proof-start -->
### 証明

$N_bW(u,v)f$ と $W(u+bv,v)N_bf$ の指数を比較します。前者の指数を $2\pi i$ で割ると $bx^2/2+u(x-v/2)$、後者では

$$
(u+bv)(x-v/2)+b(x-v)^2/2
=u(x-v/2)+bx^2/2.
$$

両者の関数部分も $f(x-v)$ で一致します。

尺度変換については

$$
(D_a W(u,v)f)(x)
=|a|^{1/2}e^{2\pi iu(ax-v/2)}f(ax-v).
$$

指数は $au(x-(v/a)/2)$ で、関数部分は $(D_af)(x-v/a)$ です。

Fourier変換では $x=t+v$ と変数変換して

$$
(FW(u,v)f)(y)
=\int e^{2\pi iu(t+v/2)} f(t)e^{-2\pi i(t+v)y}dt
$$

$$
=e^{-2\pi iv(y-u/2)}(Ff)(y-u).
$$

これは $W(-v,u)Ff$ です。三つの行列が列 $(u,v)$ をそれぞれ $(u+bv,v)$、$(au,v/a)$、$(-v,u)$ へ移すことと一致します。右側に各逆作用素を合成すれば結論です。
<!-- proof-end -->

## 3. 位相まで考えると二重被覆が必要になる

行列の積を基本変換の積に置き換えたいのですが、一つの行列には複数の分解があります。まずその違いが定数位相に限られることを確かめます。絶対値1の複素数を掛けた二つの作用素を同一視することを、ここでは位相を除いて同じと考えることにします。

<a id="thm-afr19-projective"></a>

<!-- formal-statement-start -->
> **定理（実振動子作用の射影性）**
> $g\in SL_2(\mathbb R)$ は $n(b),m(a),s$ の積として表せる。各因子を $N_b,D_a,F$ に置き換えて得る作用素を $U_g$ とすると、分解による違いは絶対値1の定数倍に限られる。従って位相を除いた作用素の類は群の積を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

行列を直接分解します。同じ行列に対応する二つの作用素の比はすべての位置・周波数の作用と交換します。そのような作用素は関数の各点の値を定数倍するしかなく、平行移動と交換するため定数は点に依存しません。

<!-- proof-start -->
### 証明

$g=\begin{pmatrix}A&B\\ C&D\end{pmatrix}$ とします。$C=0$ なら $AD=1$ なので $g=m(A)n(B/A)$ です。$C\ne0$ では、まず右側の三因子を掛けると

$$
m(1/C)s n(D/C)
=\begin{pmatrix}0&-1/C\\ C&D\end{pmatrix}.
$$

左から $n(A/C)$ を掛ければ

$$
n(A/C)m(1/C)s n(D/C)
=\begin{pmatrix}A&(AD-1)/C\\ C&D\end{pmatrix}=g
$$

となります。最後は $AD-BC=1$ を使いました。

[基本変換の共変性](#thm-afr19-covariance) を各因子に繰り返すと $U_gW(w)U_g^{-1}=W(gw)$ です。同じ $g$ を実現する $U,V$ に対し $L=V^{-1}U$ は全 $W(w)$ と交換します。

特に $W(u,0)$ は関数に $e^{2\pi iux}$ を掛ける作用です。ここで $u$ は振動の周波数を表す実変数で、関数の引数 $x$ と試験関数 $f$ は固定します。$xf$ は $x\mapsto xf(x)$ という関数の略記です。$LW(u,0)f=W(u,0)Lf$ の両辺を $u=0$ で微分すると

$$
L(2\pi ixf)=2\pi ixLf,
\qquad L(xf)=xLf
$$

となるはずです。この微分を作用素の外へ出せる理由を確認します。

Schwartz 空間の収束を測る量を

$$
p_{m,k}(f)=\sup_x|x^m f^{(k)}(x)|,\qquad m,k\ge0
$$

とします。$m,k$ は非負整数で、$f^{(k)}(x)=d^kf(x)/dx^k$ は引数 $x$ に関する導関数です。先ほどの周波数 $u$ に関する微分とは区別します。$u\ne0$ に対し指数関数の Taylor の積分剰余から

$$
\begin{aligned}
R_u(x)&=\left(\frac{e^{2\pi iux}-1}{u}-2\pi ix\right)f(x)\\
&=u(2\pi ix)^2 f(x)\int_0^1(1-t)e^{2\pi itux}\,dt
\end{aligned}
$$

です。$|u|\le1$ なら指数の各導関数の絶対値は階数にだけ依存する定数で抑えられます。積の微分則を適用すると、残る多項式と $f$ の各導関数の積は急減少性で抑えられます。従って各 $m,k$ について

$$
p_{m,k}(R_u)\le C_{m,k,f}|u|
$$

となり、求める微分はこの空間の収束について成立します。

$N_b,D_a$ は積の微分則と尺度変換で各量を有限個の同種の量により抑えます。Fourier変換については出力の変数 $y$ で $k$ 回微分して

$$
(Ff)^{(k)}(y)=(-2\pi i)^k F(x^kf)(y)
$$

を得ます。入力の変数 $x$ で部分積分すると、急減少性により境界項が消え、

$$
F((x^kf)')(y)=2\pi iyF(x^kf)(y)
$$

です。これを $m$ 回繰り返して

$$
y^m(Ff)^{(k)}(y)=
\frac{(-2\pi i)^k}{(2\pi i)^m}
F\bigl((x^kf)^{(m)}\bigr)(y)
$$

です。右辺の上限は積分する関数の $L^1$ ノルムの定数倍以下であり、そのノルムは

$$
\int_{\mathbb R}(1+x^2)^{-1}\,dx
\cdot\sup_x (1+x^2)|(x^kf)^{(m)}(x)|
$$

で抑えられます。従って基本作用素とその逆、およびその積である $L$ はこの収束について連続です。

任意の $x_0$ を固定します。$f(x_0)=0$ なら $h(x)=f(x)/(x-x_0)$ は $x_0$ で滑らかに延長でき、遠方では分母の逆数の導関数が多項式で抑えられるので $h$ は$\mathcal S(\mathbb R)$ の元です。延長は近傍で

$$
h(x)=\int_0^1 f'(x_0+t(x-x_0))dt
$$

と書けることで分かります。すると

$$
(Lf)(x_0)=(L((x-x_0)h))(x_0)
=((x-x_0)Lh)(x_0)=0.
$$

$\eta(x)=e^{-\pi(x-x_0)^2}$ として $f-f(x_0)\eta$ に適用すると $(Lf)(x_0)=c(x_0)f(x_0)$、ただし $c(x_0)=(L\eta)(x_0)$ です。$x_0$ は任意なので $Lf(x)=c(x)f(x)$ です。

$W(0,v)$ との交換から

$$
c(x)f(x-v)=c(x-v)f(x-v)
$$

です。どこでも非零の Gauss 関数を選べば $c(x)=c(x-v)$ が全 $x,v$ で成立します。よって $c$ は定数です。$L$ は積分ノルムを保つ作用素の合成なので、非零の $f$ のノルムを比較すると $|c|=1$ です。$U=cV$ が従います。行列 $gh$ の一つの分解は $g$ と $h$ の分解を連結したものなので、位相を除いた類は積を保ちます。
<!-- proof-end -->

このように作用素の位相倍を同一視して得る表現を射影表現といいます。しかし theta 級数の値を求める際には、位相の違いも数値の違いになります。

<a id="ref-afr19-complex-gaussian"></a>

### 上半平面でのFourier変換と位相

実際、$z$ が上半平面にあるとき $f_z(x)=e^{\pi izx^2}$ と置くと $N_1f_z=f_{z+1}$ です。Fourier変換は

$$
Ff_z=(-iz)^{-1/2}f_{-1/z}
$$

となります。平方根は実部が正の半平面で正の実数上の正の値を選びます。

$z=it$、$t>0$ では [Gauss関数のFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform) へ $\varepsilon=\pi t,\ \xi=2\pi y$ を代入した式です。

一般の $z$ については、上半平面のコンパクト集合で $\Im z\ge\delta>0$ なので積分とその導関数の被積分関数が多項式と Gauss 型減衰の積で支配され、両辺は正則です。

[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity) を適用します。正の虚軸上で一致するので、等式は上半平面全体で成立します。

行列の積では $(sn(1))^3=s^2=-I$ ですが、$f_i$ に $FN_1$ を三回作用させると

$$
i\longmapsto(-1+i)/2\longmapsto-1+i\longmapsto i
$$

となり、各回は $z\mapsto z+1\mapsto-1/(z+1)$ と変換し、係数は順に

$$
(1-i)^{-1/2}=2^{-1/4}e^{\pi i/8},
\qquad
((1-i)/2)^{-1/2}=2^{1/4}e^{\pi i/8},
\qquad 1
$$

です。従って積は $e^{\pi i/4}$ です。一方、$F^2f_i=f_i$ です。従ってこの規格化をそのまま使った作用は行列群の通常の表現ではありません。

実数上でこの位相を整える標準的な群が metaplectic 群（メタプレクティック群）です。上半平面を $\mathfrak H=\{z\in\mathbb C:\Im z>0\}$ とします。

[一次分数変換](../../MF/MF1/index.md#def-mf1-fractional-action) を整数行列から実行列へ広げます。

$$
gz=\frac{Az+B}{Cz+D}.
$$

$C=0$ なら $AD=1$ なので $D\ne0$、$C\ne0$ なら分母が零となる点 $-D/C$ は実数です。

[虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action) の証明は行列の成分が実数で $AD-BC=1$ であることだけを使うので、ここでも

$$
\Im(gz)=\frac{(AD-BC)\Im z}{|Cz+D|^2}
=\frac{\Im z}{|Cz+D|^2}>0
$$

です。合成も同じ通分計算から $(gh)z=g(hz)$ となり、実行列でも群作用です。各行列に分母の正則な平方根を二つの選択肢として添え、位相を区別する群を作ります。

<a id="def-afr19-metaplectic"></a>

<!-- formal-statement-start -->
> **定義（実メタプレクティック二重被覆）**
> $g=\begin{pmatrix}A&B\\ C&D\end{pmatrix}\in SL_2(\mathbb R)$ とし、$\phi$ は $\mathfrak H$ 上の正則関数で

$$
\phi(z)^2=Cz+D
$$

> を満たすとする。このような組 $(g,\phi)$ 全体に積

$$
(g,\phi)(h,\eta)=(gh,z\mapsto\phi(hz)\eta(z))
$$

> を入れた群を $\mathrm{Mp}_2(\mathbb R)$ とする。ここで $hz$ は分数線形変換である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr19-metaplectic -->
**定義の確認**

$Cz+D$ は $C\ne0$ なら虚部が一定の符号を持つ半平面にあり、$C=0$ なら非零定数です。半平面の場合は偏角を長さ $\pi$ の区間に選び、正則な対数の半分を指数関数に入れると一つの平方根が得られます。非零定数の場合は定数の平方根を選びます。

二つの平方根の比は連続で値が $\pm1$ に限られ、上半平面は連結なので一定です。従っていずれも正則な平方根はちょうど二つあります。

$s$ なら $\phi(z)=\sqrt z$（偏角 $0<\arg z<\pi$）が一つの選択です。二回の積では $s^2=-I$ で、平方根の積は

$$
\bigl(\phi(-1/z)\phi(z)\bigr)^2=(-1/z)z=-1.
$$

$z=i$ で積の値は $i$ なので、連結性から常に $i$ です。四回では $(I,-1)$、八回で $(I,1)$ となります。

一般の積についても分数線形変換の分母を実際に掛けると $(C_g(hz)+D_g)(C_hz+D_h)=C_{gh}z+D_{gh}$ です。従って積は再び定義条件を満たします。関数の合成と積の結合性から群の結合性が従い、単位元は $(I,1)$、逆元は $(g^{-1},z\mapsto1/\phi(g^{-1}z))$ です。射影 $(g,\phi)\mapsto g$ の核は $(I,\pm1)$ であり、どの行列にも二つの持ち上げがあります。
<!-- definition-example-end -->

ここから実数上のWeil表現そのものを構成できます。先ほどの実振動子作用は行列ごとに位相だけが不定でした。持ち上げ $(g,\phi)$ では $f_z$ に作用したときの係数を $\phi(z)^{-1}$ と指定します。この指定がすべての分解と両立することを示します。

<a id="thm-afr19-real-weil"></a>

<!-- formal-statement-start -->
> **定理（実Weil表現の構成）**
> $\mathrm{Mp}_2(\mathbb R)$ 上に、$\mathcal S(\mathbb R)$ のノルム保存線形作用素による表現 $\omega$ が一意に存在し、各 $\omega(g,\phi)$ は $g$ の行列分解に対応する基本変換の積の定数位相倍である。すべての $z\in\mathfrak H$ について

$$
\omega(g,\phi) f_z=\phi(z)^{-1}f_{gz},
\qquad f_z(x)=e^{\pi izx^2}
$$

> を満たす。被覆の核の元 $(I,-1)$ は負の恒等作用素として作用する。
<!-- formal-statement-end -->

### 証明の見取り図

三基本行列の持ち上げに対応する位相を個別に決めます。持ち上げの積における平方根の掛け方は、Gauss 関数へ順に作用したときの係数の掛け方と一致します。射影性により二つの分解は定数倍しか違わず、一つの非零 Gauss 関数で一致すればその定数が1と分かります。

<!-- proof-start -->
### 証明

$n(b)$ には $\phi(z)=1$ を選びます。$n(b)z=z+b$ であり $N_b f_z=f_{z+b}$ なので要求を満たします。$m(a)$ は $z\mapsto a^2z$ と作用し、平方根は定数です。$a>0$ なら $\phi=a^{-1/2}$ と選び、$D_a$ を対応させます。$a<0$ なら $\phi=i|a|^{-1/2}$ と選び、$-iD_a$ を対応させます。どちらも $\phi^2=a^{-1}$ であり、$D_af_z=|a|^{1/2}f_{a^2z}$ から指定した係数が得られます。

$s$ には $\phi(z)=\sqrt z$ を選びます。$0<\arg z<\pi$ なので $-iz$ の偏角は $\arg z-\pi/2$。従って

$$
(-iz)^{-1/2}=e^{\pi i/4}(\sqrt z)^{-1}.
$$

[複素Gauss変換式](#ref-afr19-complex-gaussian) から $e^{-\pi i/4}F$ が要求する作用素です。さらに $(I,-1)$ には $-I$ を対応させます。

[実振動子作用の射影性](#thm-afr19-projective) の行列分解を任意の $g$ に適用し、その各因子に今選んだ持ち上げを掛け合わせます。積は $g$ の二つの持ち上げの一方なので、必要なら $(I,-1)$ を掛けて指定された $(g,\phi)$ にできます。この操作で得る作用素を $U$ とします。

二つの持ち上げの作用素が Gauss 関数に対して指定された式を満たすとき、

$$
U_{g,\phi}U_{h,\eta}f_z
=\eta(z)^{-1}\phi(hz)^{-1}f_{ghz}.
$$

[実メタプレクティック二重被覆](#def-afr19-metaplectic) の積の平方根は $\phi(hz)\eta(z)$ です。従って合成についても指定が保たれます。有限回繰り返すことで上で作った $U$ はすべての $f_z$ に指定通り作用します。

別の分解から得る $V$ も同じ性質を持ちます。$U,V$ は同じ行列を実現するので、射影性の定理から $U=cV$（$|c|=1$）。$z=i$ を入れると $Uf_i=Vf_i$ は非零関数なので $c=1$ です。この一意性により分解によらず $\omega(g,\phi)$ が定まり、合成と積の対応も上の Gauss 関数の計算から成立します。各因子はノルムを保存し、位相因子も絶対値1です。核の作用は構成した $-I$ です。
<!-- proof-end -->

例えば $s$ の持ち上げの作用素の四乗は $e^{-\pi i}F^4=-I$ です。二重被覆の非自明な核が実際に作用することが分かります。このように位置と周波数を混ぜる行列の動きを、位相まで指定して実現した表現が本講の振動子表現（Weil表現）です。

ここでは実数体上の一次元模型を構成しました。一般の局所体・二次形式については、自己双対測度と位相（Weil指数）の選択が追加で必要です。その一般的な構成は S. Kudla, [Notes on the Local Theta Correspondence](https://www.math.toronto.edu/~skudla/castle.pdf), §I の Heisenberg 群・metaplectic 群・Schrödinger 模型を参照してください。

## 4. 有理点の総和はなぜ不変か

実素点だけでは、例えば $f(n)$ を整数上で足すと $N_1$ によって奇数項の符号が変わります。有限素点も合わせれば、すべての有理点で二次位相を打ち消せます。

ここで $\mathbb A=\mathbb A_{\mathbb Q}$ は [アデール環](../../ANF/ANF19/index.md#def-anf19-adele) です。[アデールの単元とイデール位相](../../ANF/ANF19/index.md#prop-anf19-idele-topology) の命題により、$\mathbb A^\times$ は [イデール群](../../ANF/ANF19/index.md#def-anf19-idele) $\mathbb I_{\mathbb Q}$ と一致します。具体的には全成分が非零で、ほとんどすべての有限素点で $a_p\in\mathbb Z_p^\times$ となる元からなり、乗法と逆元は成分ごとに計算します。

$x=(x_\infty,x_f)$ の $x_f=(x_p)_p$ は有限素点成分で、$\widehat{\mathbb Z}=\prod_p\mathbb Z_p$ と書きます。

$\mathbb A$ 上で [標準大域加法指標](../AFR9/index.md#prop-afr9-global-character) を $\psi$ とします。実成分が負符号なので、二次位相は $\psi(-bx^2/2)$ とすれば実の $N_b$ に一致します。

$b\in\mathbb A$、$a\in\mathbb A^\times$ について基本変換を

$$
N_b^{\mathbb A} f(x)=\psi(-bx^2/2)f(x),
$$

$$
D_a^{\mathbb A} f(x)=|a|_{\mathbb A}^{1/2}f(ax),
\qquad F_{\mathbb A}f=\widehat f
$$

とします。絶対値の積は

$$
|a|_{\mathbb A}=|a_\infty|\prod_p|a_p|_p
$$

であり、$\widehat f$ は [アデールFourier変換](../AFR9/index.md#def-afr9-adelic-fourier) です。

これらは [Schwartz–Bruhat関数](../AFR9/index.md#def-afr9-schwartz-bruhat) の空間を保ちます。実成分は第2節の計算を使います。有限側では各点の十分小さい開近傍で試験関数と指標がともに一定なので、積もその近傍で一定です。台のコンパクト性は指標との積や可逆な尺度変換によって保たれます。

ほとんどすべての素数で

$$
b_p/2\in\mathbb Z_p,\qquad a_p\in\mathbb Z_p^\times
$$

なので、標準因子 $1_{\mathbb Z_p}$ は変わりません。Fourier変換については [p進球指示関数のFourier変換](../AFR9/index.md#thm-afr9-ball-transform) と [アデールFourier反転](../AFR9/index.md#thm-afr9-inversion) を使います。

試験関数を対角有理点で評価して足し合わせる線形汎関数を用意します。例えば実成分が Gauss 関数、有限側が整数環の指示関数なら、有理点のうち整数だけが残ります。

<a id="def-afr19-theta-functional"></a>

<!-- formal-statement-start -->
> **定義（theta和汎関数）**
> $f\in\mathcal S(\mathbb A)$ に対して

$$
\Lambda(f)=\sum_{q\in\mathbb Q}f(q)
$$

> と定める。$q$ はアデールへの対角埋め込みで評価する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr19-theta-functional -->
**定義の確認**

$f(x)=e^{-\pi x_\infty^2}1_{\widehat{\mathbb Z}}(x_f)$ はSchwartz–Bruhat関数で、全素数で整となる有理数は整数なので

$$
\Lambda(f)=1+2\sum_{n\ge1}e^{-\pi n^2}.
$$

$n^2\ge n$ から絶対値の和は $1+2e^{-\pi}/(1-e^{-\pi})$ 以下です。一般の $f$ も [有理数体のアデールPoisson和公式](../AFR9/index.md#thm-afr9-poisson) の収束結論により定義でき、絶対収束する和の線形性から線形汎関数になります。
<!-- definition-example-end -->

<a id="thm-afr19-rational-invariance"></a>

<!-- formal-statement-start -->
> **定理（有理基本変換に対するtheta和の不変性）**
> $f\in\mathcal S(\mathbb A)$、$b\in\mathbb Q$、$a\in\mathbb Q^\times$ とする。対角埋め込みしたパラメータによる基本変換に対して

$$
\Lambda(N_b^{\mathbb A}f)=\Lambda(f),\quad
\Lambda(D_a^{\mathbb A}f)=\Lambda(f),\quad
\Lambda(F_{\mathbb A}f)=\Lambda(f).
$$

> これらの任意の有限合成についても不変である。
<!-- formal-statement-end -->

### 証明の見取り図

二次位相は有理数上で1、尺度因子は全素点の積で1、有理数の集合は非零有理数倍で置換されます。最後の変換には Poisson 和公式が働きます。

<!-- proof-start -->
### 証明

有理数 $q$ に対して $-bq^2/2$ も有理数です。[大域加法指標の有理数上の自明性](../AFR9/index.md#prop-afr9-global-character) から $\psi(-bq^2/2)=1$ です。従って和の各項が一致します。

非零有理数を $a=\pm\prod_p p^{k_p}$（有限個の非零 $k_p$）と書くと、実絶対値は $\prod_p p^{k_p}$、$p$ 進絶対値は $p^{-k_p}$ です。積が1なので

$$
\Lambda(D_a^{\mathbb A}f)
=\sum_{q\in\mathbb Q}f(aq)
=\sum_{q'\in\mathbb Q}f(q').
$$

最後は $q'=aq$ が有理数上の全単射であり、絶対収束により並べ替え可能であることを使いました。$F_{\mathbb A}$ の等式は [有理数体のアデールPoisson和公式](../AFR9/index.md#thm-afr9-poisson) そのものです。各変換の出力は同じ試験関数空間に属するので、有限合成には順にこの等式を適用できます。
<!-- proof-end -->

例えば $b=1$、$q=1$ の二次位相を計算すると実成分は $e^{\pi i}=-1$、$2$ 進成分は $\psi_2(-1/2)=-1$、奇素数の成分は1です。積は1です。実素点だけで見た符号変化は $2$ 進成分を落としたことによるものです。

作用素の有限合成 $U$ に対して $K_f(U)=\Lambda(Uf)$ と置くと、有理基本変換の合成 $R$ に対して $K_f(RU)=K_f(U)$ です。これは左不変性を得る計算です。一般の保型theta核では局所Weil表現の位相を整合させて大域表現 $\omega$ を作り、有理点上の被覆の分裂を使って $g\mapsto\Lambda(\omega(g)f)$ を作ります。分裂とは有理点の群を被覆群へ群準同型として持ち上げることです。本節では位相を未指定の一般の局所積へ勝手に拡張せず、有理基本変換について不変性を直接確認しました。

## 5. 古典的theta級数が現れる

実成分に第3節の $f_z$ を取り、有限成分を $1_{\widehat{\mathbb Z}}$ とした関数を $\Phi_z$ とします。その theta 和は

$$
\vartheta(z)=\Lambda(\Phi_z)=\sum_{n\in\mathbb Z}e^{\pi izn^2}.
$$

$z=it$ なら [Jacobi theta 関数](../../../解析系/CA/CA12/index.md#def-ca12-jacobi-theta) と一致します。実部の位相も含む変換を計算してみます。

<a id="thm-afr19-theta"></a>

<!-- formal-statement-start -->
> **定理（複素theta級数の基本変換）**
> $\mathfrak H=\{z\in\mathbb C:\Im z>0\}$ 上の級数 $\vartheta(z)=\sum_{n\in\mathbb Z}e^{\pi izn^2}$ は正則であり、

$$
\vartheta(z+2)=\vartheta(z),\qquad
\vartheta(-1/z)=(-iz)^{1/2}\vartheta(z)
$$

> を満たす。平方根は $-iz$ の実部が正の半平面で正の実数上の正の値を選ぶ。
<!-- formal-statement-end -->

### 証明の見取り図

整数の二乗に偶数の位相を掛けると1になります。反転は実Gauss関数のFourier変換と、有限側の整数環が自分自身へ変換されることから得ます。

<!-- proof-start -->
### 証明

コンパクト集合上で $\Im z\ge\delta>0$ とすれば各項の絶対値は $e^{-\pi\delta n^2}$ 以下、$z$ 微分は $\pi n^2e^{-\pi\delta n^2}$ 以下です。どちらの和も収束するので局所一様収束と項別微分が成立し、正則です。$e^{2\pi in^2}=1$ から第一の変換則を得ます。

[p進球指示関数のFourier変換](../AFR9/index.md#thm-afr9-ball-transform) に $k=0,a=0$ を入れると各有限素点で $1_{\mathbb Z_p}$ は自分自身へ移ります。実成分は[複素Gauss関数の変換式](#ref-afr19-complex-gaussian) を使って

$$
F_{\mathbb A}\Phi_z=(-iz)^{-1/2}\Phi_{-1/z}.
$$

[有理基本変換に対するtheta和の不変性](#thm-afr19-rational-invariance) より

$$
\vartheta(z)=\Lambda(F_{\mathbb A}\Phi_z)
=(-iz)^{-1/2}\vartheta(-1/z).
$$

$-iz\ne0$ なので両辺に平方根を掛ければ第二の変換則を得ます。
<!-- proof-end -->

$z=4i$ なら $\vartheta(i/4)=2\vartheta(4i)$ です。一般に $z=it$ で $\vartheta(i/t)=\sqrt t\,\vartheta(it)$ となり、[CA12 の theta 変換](../../../解析系/CA/CA12/index.md#thm-ca12-theta-transformation) を回収しました。周期2としたのは重要です。$z=i$ と $z=i+1$ の差は奇数項から生じ、

$$
\vartheta(i)-\vartheta(i+1)
=4\sum_{\substack{n\ge1\\n\ {\rm odd}}}e^{-\pi n^2}>0.
$$

従って全モジュラー群に対してそのまま整数重さの形式と見なせません。反転で平方根が現れることが半整数重さの入口です。

## 6. 次に二つの群を同時に動かす

一次元から $r$ 次元へ進む最初の模型として、$x=(x_1,\ldots,x_r)$、$Q(x)=\sum_j x_j^2/2$ とします。二次位相を $e^{2\pi ibQ(x)}$、尺度作用を $|a|^{r/2}f(ax)$、Fourier核を $e^{-2\pi ix\cdot y}$ に置き換えます。積の関数 $\prod_j f_j(x_j)$ では三つの変換は各座標の変換の積です。特に多次元Gauss関数 $\prod_j e^{\pi izx_j^2}$ は反転時に $(-iz)^{-r/2}$ を受けます。

もう一つの群として、$Q(hx)=Q(x)$ を満たす可逆な実線形写像 $h$ を考えます。標準基底に関する行列も $h$ と書きます。二次形式の保存条件から $h^Th=I_r$ が従います。実際、$Q(h(x+y))-Q(hx)-Q(hy)=x^Th^Thy$ を $Q(x+y)-Q(x)-Q(y)=x^Ty$ と比較し、$x,y$ に標準基底を入れれば各成分が一致します。従って $h^{-1}=h^T$、$|\det h|=1$ です。

$(R_hf)(x)=f(h^{-1}x)$ とすると $R_hR_kf(x)=f(k^{-1}h^{-1}x)=R_{hk}f(x)$ です。$Q(h^{-1}x)=Q(x)$ なので二次位相と交換し、$h^{-1}(ax)=a h^{-1}x$ なので尺度変換とも交換します。Fourier変換との交換も、$x=ht$、$dx=dt$ と置いて

$$
F(R_hf)(y)=\int f(t)e^{-2\pi i(ht)\cdot y}dt
=(Ff)(h^Ty)=(R_hFf)(y)
$$

と確認できます。例えば $r=2$ の座標交換行列は $x_1^2+x_2^2$ を保ち、この三作用と交換します。これが同じ関数空間に二つの群を作用させる理由です。次講では、一般の二次形式・Hermitian形式でこの構成を捉え、theta和を一方の群に沿って積分することで他方の群の関数を作る方法へ進みます。

## 7. 演習

<a id="ex-afr19-a1"></a>

### A1. 二つの作用の順序

$w=(2,0),w'=(0,1/4)$ とする。$W(w)W(w')$ と逆順の比を求めよ。

- Level: A
- ID: AFR19-A1

<!-- solution-start -->
**詳細解答**

[Weyl作用の積公式](#prop-afr19-weyl-product) で $\sigma(w,w')=2/4=1/2$、$\sigma(w',w)=-1/2$ です。前者は $iW(2,1/4)$、後者は $-iW(2,1/4)$ です。比は $-1$ になります。
<!-- solution-end -->

<a id="ex-afr19-a2"></a>

### A2. 尺度変換とノルム

$f(x)=e^{-\pi x^2}$ に $D_{-2}$ を作用させよ。$\int|D_{-2}f|^2$ を $\int|f|^2$ と比較せよ。

- Level: A
- ID: AFR19-A2

<!-- solution-start -->
**詳細解答**

[振動子作用の基本変換](#def-afr19-generators) より $D_{-2}f(x)=\sqrt2 e^{-4\pi x^2}$。積分は $2\int e^{-8\pi x^2}dx$ です。$u=-2x$ と置くと向きが逆になり絶対Jacobianは $1/2$、従って $\int e^{-2\pi u^2}du=\int|f|^2$ です。
<!-- solution-end -->

<a id="ex-afr19-a3"></a>

### A3. 行列と列の変換

$w=(2,3)$ に $n(4),m(2),s$ をこの順に作用させよ。対応する作用素の合成を答えよ。

- Level: A
- ID: AFR19-A3

<!-- solution-start -->
**詳細解答**

[基本変換の共変性](#thm-afr19-covariance) の行列の作用に従うと $(2,3)\mapsto(14,3)\mapsto(28,3/2)\mapsto(-3/2,28)$ です。行列の積は右から作用するため $s m(2)n(4)$、作用素は $FD_2N_4$ です。
<!-- solution-end -->

<a id="ex-afr19-a4"></a>

### A4. 有理数の位相

$b=1,q=3$ で $\psi(-bq^2/2)$ の実成分と有限成分を別々に計算せよ。

- Level: A
- ID: AFR19-A4

<!-- solution-start -->
**詳細解答**

[標準局所加法指標](../AFR9/index.md#def-afr9-additive-character) より実成分は $e^{9\pi i}=-1$。$-9/2$ は奇素数で整なのでそれらの指標は1です。$2$ 進小数部分は $1/2$（差は $-5\in\mathbb Z_2$）なので $\psi_2(-9/2)=e^{\pi i}=-1$。全体は $(-1)(-1)=1$ です。
<!-- solution-end -->

<a id="ex-afr19-b1"></a>

### B1. 異なる分解の位相

行列 $g=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ を $n(b)m(a)s n(c)$ に分解せよ。同じ行列を実現する基本変換の二つの有限合成があるとき、その比が定数倍となる理由を説明せよ。

- Level: B
- ID: AFR19-B1

<!-- solution-start -->
**詳細解答**

[実振動子作用の射影性](#thm-afr19-projective) の分解で $A=2,C=1,D=1$ を代入すると $b=2,a=1,c=1$ です。実際

$$
n(2)s n(1)=\begin{pmatrix}2&-1\\1&0\end{pmatrix}
\begin{pmatrix}1&1\\0&1\end{pmatrix}
=\begin{pmatrix}2&1\\1&1\end{pmatrix}.
$$

対応作用素は $N_2D_1FN_1=N_2FN_1$（$D_1=I$）です。同じ共変性を持つ基本変換の積 $U,V$ なら $L=V^{-1}U$ は $W(w)$ と交換します。

[実振動子作用の射影性](#thm-afr19-projective) の証明で確認した Schwartz 空間上の連続性を用い、$f,x$ を固定した周波数 $u$ に関して

$$
LW(u,0)f=W(u,0)Lf
$$

を $u=0$ で微分します。両辺の $2\pi i$ を消すと $L(xf)=xLf$ です。

$f(x_0)=0$ なら $f=(x-x_0)h$ と書け、$Lf(x_0)=0$。従って点ごとに $Lf(x)=c(x)f(x)$ です。平行移動との交換から $c(x)=c(x-v)$、全点で同じ定数になります。ノルム保存からその絶対値は1です。
<!-- solution-end -->

<a id="ex-afr19-b2"></a>

### B2. 有限素点の尺度

$a=6/5$、$f\in\mathcal S(\mathbb A)$ とする。実絶対値と非自明な三つの有限絶対値の積を求め、$\Lambda(D_a^{\mathbb A}f)$ を計算せよ。

- Level: B
- ID: AFR19-B2

<!-- solution-start -->
**詳細解答**

$a=2\cdot3\cdot5^{-1}$ なので $|a|_\infty=6/5$、$|a|_2=1/2$、$|a|_3=1/3$、$|a|_5=5$ です。積は $(6/5)(1/2)(1/3)5=1$。従って $D_a^{\mathbb A}f(q)=f(6q/5)$。$q'=6q/5$ は逆写像 $q=5q'/6$ を持つため有理数全体を一度ずつ走ります。[theta和汎関数](#def-afr19-theta-functional) は絶対収束するので $\Lambda(D_a^{\mathbb A}f)=\sum_{q'}f(q')=\Lambda(f)$ です。
<!-- solution-end -->

<a id="ex-afr19-b3"></a>

### B3. 反転と周期の違い

$\vartheta(9i)$ と $\vartheta(i/9)$ の関係を求めよ。また $\vartheta(i+1)$ が $\vartheta(i)$ と等しくならない理由を、和の各項から示せ。

- Level: B
- ID: AFR19-B3

<!-- solution-start -->
**詳細解答**

[複素theta級数の基本変換](#thm-afr19-theta) で $z=9i$ を入れると $-1/z=i/9$、$-iz=9$ なので $\vartheta(i/9)=3\vartheta(9i)$ です。$z=i+1$ では各項は $(-1)^{n^2}e^{-\pi n^2}=(-1)^ne^{-\pi n^2}$ です。差は偶数項で0、奇数項で $2e^{-\pi n^2}$。正負の奇数を合わせると $4\sum_{n\ge1,\ n\ {\rm odd}}e^{-\pi n^2}>0$ なので等しくありません。
<!-- solution-end -->

<a id="ex-afr19-b4"></a>

### B4. 二重被覆の持ち上げと作用素

$s=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ の持ち上げ $(s,\sqrt z)$ について、その二乗・四乗と対応するWeil表現の作用素を求めよ。$m(-2)$ の平方根を $i/\sqrt2$ と選んだ場合、$f_i$ はどう変わるか。

- Level: B
- ID: AFR19-B4

<!-- solution-start -->
**詳細解答**

[実メタプレクティック二重被覆](#def-afr19-metaplectic) の積から二乗は

$$
(s,\sqrt z)^2=(-I,\sqrt{-1/z}\sqrt z)
$$

です。係数の二乗は $-1$ で、$z=i$ で係数は $i$ です。連結な上半平面上で連続なので、常に $i$ です。従って

$$
(s,\sqrt z)^2=(-I,i),\qquad
(s,\sqrt z)^4=(I,-1).
$$

[実Weil表現の構成](#thm-afr19-real-weil) で持ち上げに対応する作用素は $e^{-\pi i/4}F$ です。二乗と四乗を計算すると

$$
(e^{-\pi i/4}F)^2=-iF^2,\qquad
(e^{-\pi i/4}F)^4=-F^4=-I.
$$

[アデールFourier反転](../AFR9/index.md#thm-afr9-inversion) の実成分によれば $F^2f(x)=f(-x)$ なので、二乗は関数を反転して $-i$ 倍する作用です。

$m(-2)$ は $z\mapsto4z$ と作用し、選んだ平方根は $\phi=i/\sqrt2$ なので $\phi^{-1}=-i\sqrt2$。作用素は $-iD_{-2}$ で、

$$
(-iD_{-2} f_i)(x)=-i\sqrt2 e^{-4\pi x^2}=-i\sqrt2 f_{4i}(x).
$$

指定した平方根の逆数と一致しています。
<!-- solution-end -->

<a id="ex-afr19-c1"></a>

### C1. 二次元のtheta和と交換する群

$Q(x)= (x_1^2+x_2^2)/2$、$h=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とする。$h$ が $Q$ を保つこと、$R_h$ が二次位相および二次元Fourier変換と交換することを示せ。最後に $\Im z>0$ に対して $\Theta_2(z)=\sum_{m,n\in\mathbb Z}e^{\pi iz(m^2+n^2)}$ の反転則を求めよ。

- Level: C
- ID: AFR19-C1

<!-- solution-start -->
**詳細解答**

$hx=(-x_2,x_1)$ なので $Q(hx)=(x_2^2+x_1^2)/2=Q(x)$、$h^Th=I_2$、$\det h=1$ です。$N_bR_hf(x)=e^{2\pi ibQ(x)}f(h^{-1}x)$ に対し、$R_hN_bf(x)=e^{2\pi ibQ(h^{-1}x)}f(h^{-1}x)$ で二次形式の保存から一致します。

Fourier積分では $x=ht$ と置くとJacobianは1で、

$$
F(R_hf)(y)=\int f(t)e^{-2\pi i t\cdot h^Ty}dt
=Ff(h^{-1}y).
$$

従って $FR_h=R_hF$ です。$y=\Im z>0$ に対して絶対値の二重和は $(\sum_n e^{-\pi yn^2})^2<\infty$。積へ分解して $\Theta_2(z)=\vartheta(z)^2$ です。[複素theta級数の基本変換](#thm-afr19-theta) を二乗すると

$$
\Theta_2(-1/z)=(-iz)\Theta_2(z).
$$

一つの平方根が二つ掛かって整数の冪になりました。この結論は正定値の直交二次元模型であり、任意の二次形式で同じ格子が自分自身へ変換されることを主張しません。
<!-- solution-end -->

