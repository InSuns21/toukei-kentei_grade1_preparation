# QFT28 非可換ゲージ変換・Yang–Mills曲率とゲージ場の自己相互作用

[QFT15のMaxwell場](../QFT15/index.md#def-qft15-potential-field)では、ゲージ変換でポテンシャルが変わっても電磁場テンソルは変わりませんでした。[QFT17の最小結合](../QFT17/index.md#def-qft17-covariant-derivative)は、この自由度を物質場の局所位相変換と結び付けました。しかし複数の「内部方向」を持つ物質場では、変換を行う順序が交換しない場合があります。そのとき、電磁場と同じく微分だけで作った曲率では不十分です。

本講では、行列として作用する局所対称性から共変微分を作り、その交換子を計算してYang–Mills曲率を得ます。曲率の変換則と作用原理を証明し、最後にゲージ場自身が三点・四点で相互作用する理由を式から取り出します。量子ゲージ固定、ghost、BRST、ループ補正はまだ用いません。

以下では四次元Minkowski空間、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、$\hbar=c=1$ とします。ローマ字 $a,b,c$ は内部方向、ギリシャ字 $\mu,\nu$ は時空方向（$0,1,2,3$）を表し、同じ位置に上下で現れる添字は和を取ります。行列は時空点 $x$ に滑らかに依存し、作用の変分は境界で零になるコンパクト支持の変分で行います。結合定数 $g>0$ は実数です。

## 1. 位相から行列へ：局所変換を微分できるか

複素数の位相 $e^{i\alpha}$ は掛け算の順序を入れ替えられます。一方、$N$ 成分の複素列ベクトル $\psi(x)$ に作用する行列 $U(x)$ は一般に交換しません。ここで $SU(N)$ は $U^\dagger U=I$ かつ $\det U=1$ を満たす $N\times N$ 複素行列の集まりとします。$N\ge2$ を固定します。

この行列群の単位行列の近くを記述するため、Hermitianかつ跡が零の行列 $T^a$（$a=1,\ldots,N^2-1$）を基底に取り、規格化と交換子を次のように固定します。

$$
\operatorname{tr}(T^aT^b)=\frac12\delta^{ab},
\qquad [T^a,T^b]=i f^{abc}T^c.
$$

$[X,Y]=XY-YX$ は行列の交換子です。係数 $f^{abc}$ は [LIE4で導入した構造定数](../../../代数系/LIE/LIE4/index.md#def-lie4-structure-constants)をHermitian生成子の規約へ移したもので、実数であり、この規格化の下では添字に関して完全反対称です。とくに $U=e^{i\alpha^aT^a}$ は実数関数 $\alpha^a(x)$ に対して $SU(N)$ に属します。指数は行列のべき級数で定義します。

完全反対称性は規格化から確認できます。$[T^a,T^b]=if^{abc}T^c$ に $T^d$ を掛けて跡を取ると

$$
f^{abd}=-2i\operatorname{tr}([T^a,T^b]T^d).
$$

右辺は $a,b$ の交換で符号が変わり、跡の巡回性によって $\operatorname{tr}([T^a,T^b]T^d)=\operatorname{tr}(T^a[T^b,T^d])$ と循環できるため三添字に反対称です。Hermitian行列の交換子は反Hermitianなので右辺は実数です。

**最小例：$SU(2)$。** Pauli行列を使って

$$
T^1=\frac12\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
T^2=\frac12\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
T^3=\frac12\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

と置くと、$(T^1)^2=I/4$ なので $\operatorname{tr}(T^1T^1)=1/2$ です。また $T^1T^2=iT^3/2$、$T^2T^1=-iT^3/2$ だから $[T^1,T^2]=iT^3$。添字を巡回させた関係も成り立ち、$f^{abc}=\varepsilon^{abc}$（$\varepsilon^{123}=1$）です。これが非可換性を手で検査できる例になります。

局所変換 $\psi'=U(x)\psi$ の普通の偏微分には $(\partial_\mu U)\psi$ が余分に現れます。そこで行列値の四元ポテンシャル $A_\mu$ を用い、その項を打ち消す微分を考えます。

<a id="def-qft28-covariant-derivative"></a>

<!-- formal-statement-start -->
> **定義（SU(N)ゲージ場と基本表現の共変微分）**  
> $N\ge2$、$g>0$ とし、$SU(N)$ のHermitianで跡が零の生成子 $T^a$ を $\operatorname{tr}(T^aT^b)=\delta^{ab}/2$ に規格化する。実数の滑らかな係数 $A_\mu^a(x)$ による行列値ポテンシャル $A_\mu=A_\mu^aT^a$ と、$N$ 成分の滑らかな物質場 $\psi$ に対し、共変微分を

$$
D_\mu\psi=(\partial_\mu-igA_\mu)\psi
$$

> とする。局所ゲージ変換とは、滑らかな $U(x)\in SU(N)$ により $\psi'(x)=U(x)\psi(x)$ と変える操作である。$A_\mu$ の変換則は $D'_\mu\psi'=U D_\mu\psi$ を要求して定める。
<!-- formal-statement-end -->

この定義で $D_\mu$ は物質場に左から作用する演算子です。行列 $A_\mu$ 自身への微分と、物質場に作用する $D_\mu$ を混同しないようにします。

<a id="thm-qft28-gauge-covariance"></a>

<!-- formal-statement-start -->
> **定理（非可換ゲージ変換の共変性）**  
> 上の $D_\mu=\partial_\mu-igA_\mu$、滑らかな $U(x)\in SU(N)$ および $\psi'=U\psi$ に対し、すべての滑らかな $\psi$ について $D'_\mu\psi'=UD_\mu\psi$ が成り立つための必要十分条件は

$$
A'_\mu=U A_\mu U^{-1}-\frac{i}{g}(\partial_\mu U)U^{-1}
$$

> である。変換後の $A'_\mu$ もHermitianで跡が零の行列である。
<!-- formal-statement-end -->

### 証明の見取り図

普通の積の微分で出る $\partial_\mu U$ を新しいポテンシャルの非斉次項が打ち消します。$U^{-1}=U^\dagger$ を使うと、その非斉次項が許された生成子の実線形結合であることも確かめられます。

<!-- proof-start -->
### 証明

まず積の微分から

$$
D'_\mu(U\psi)=(\partial_\mu U)\psi
+U\partial_\mu\psi-igA'_\mu U\psi.
$$

これが $U\partial_\mu\psi-igUA_\mu\psi$ に任意の $\psi$ で等しいことは、

$$
(\partial_\mu U)-igA'_\mu U=-igUA_\mu
$$

と同値です。右から $U^{-1}$ を掛け、$ig$ で割ると定理の式を得ます。逆に得た式を最初の積の微分へ代入すれば余分な項が打ち消されるため、十分性も従います。

Hermitian性は $U^\dagger U=I$ の微分から $[(\partial_\mu U)U^{-1}]^\dagger=-(\partial_\mu U)U^{-1}$ が従うことによります。従って $-i(\partial_\mu U)U^{-1}/g$ はHermitianです。さらに $\det U=1$ の微分（$\partial_\mu\det U=(\det U)\operatorname{tr}(U^{-1}\partial_\mu U)$）から非斉次項の跡は零です。共役項にもHermitian性と零跡性が保存されます。
<!-- proof-end -->

<!-- definition-example-start: def-qft28-covariant-derivative -->
### 例：純ゲージ場を直接作る

**定義の確認**：この例では行列の生成子表示が実係数であり、共変微分の変換条件を積の微分で確かめます。

$SU(2)$ で初めに $A_\mu=0$ とし、滑らかな実数関数 $\theta(x)$ から $U=e^{i\theta T^3}$ を作ります。$T^3$ は自分自身と交換するので $\partial_\mu U=i(\partial_\mu\theta)T^3 U$ です。定理の式から

$$
A'_\mu=\frac{\partial_\mu\theta}{g}T^3.
$$

これは $A'^3_\mu=(\partial_\mu\theta)/g$、$A'^1_\mu=A'^2_\mu=0$ という実係数の生成子展開であり、Hermitian性・零跡性を満たします。さらに

$$
(\partial_\mu-igA'_\mu)(U\psi)
=i(\partial_\mu\theta)T^3U\psi+U\partial_\mu\psi
-i(\partial_\mu\theta)T^3U\psi
=U\partial_\mu\psi.
$$

定義の共変性を具体的に検査できました。ポテンシャルが零でなくても、物理的な曲率が零になる場合があることは次節で確かめます。
<!-- definition-example-end -->

局所変換を $U=I+i\alpha^aT^a+O(\alpha^2)$ とすると、一次では

$$
\delta A_\mu^a=\frac1g\partial_\mu\alpha^a
+f^{abc}A_\mu^b\alpha^c+O(\alpha^2).
$$

最初の項はU(1)と似ていますが、第二項は生成子が交換しないことから生まれます。$U(1)$ のように単一の可換方向だけを残せば第二項は零です。

## 2. 二つの共変微分を入れ替えると何が残るか

[QFT15の電磁場テンソル](../QFT15/index.md#def-qft15-potential-field)はポテンシャルの偏微分の差でした。しかしここでは $D_\mu D_\nu\psi$ と $D_\nu D_\mu\psi$ の差に $A_\mu A_\nu-A_\nu A_\mu$ が残ります。これは物質場の運搬の順序が交換しないことを測る量です。

<a id="def-qft28-curvature"></a>

<!-- formal-statement-start -->
> **定義（Yang–Mills曲率と随伴共変微分）**  
> 滑らかな $SU(N)$ ゲージ場 $A_\mu=A_\mu^aT^a$ の曲率 $F_{\mu\nu}=F_{\mu\nu}^aT^a$ を、任意の基本表現の物質場 $\psi$ に対する交換子

$$
[D_\mu,D_\nu]\psi=-igF_{\mu\nu}\psi
$$

> により定義する。行列値の滑らかな場 $X$ には、随伴共変微分

$$
\mathcal D_\mu X=\partial_\mu X-ig[A_\mu,X]
$$

> を用いる。両者を定義するのは同じ $A_\mu$ だが、$D_\mu$ は列ベクトル、$\mathcal D_\mu$ は行列に作用する。
<!-- formal-statement-end -->

実際に交換子を展開すると、$\partial_\mu\partial_\nu\psi$ と $A_\mu\partial_\nu\psi$ 型の項は相殺されます。一方、$A_\mu A_\nu\psi$ の順序差だけは残ります。

$$
\begin{aligned}
[D_\mu,D_\nu]\psi
&=-ig(\partial_\mu A_\nu-\partial_\nu A_\mu)\psi
-g^2[A_\mu,A_\nu]\psi,\\
F_{\mu\nu}
&=\partial_\mu A_\nu-\partial_\nu A_\mu
-ig[A_\mu,A_\nu],\\
F_{\mu\nu}^a
&=\partial_\mu A_\nu^a-\partial_\nu A_\mu^a
+g f^{abc}A_\mu^bA_\nu^c.
\end{aligned}
$$

最後の行は $[T^b,T^c]=if^{bca}T^a$ と $f^{bca}=f^{abc}$ を代入して得ました。また行列値場の成分表示は

$$
(\mathcal D_\mu X)^a
=\partial_\mu X^a+g f^{abc}A_\mu^bX^c
$$

です。下付き添字の $F_{\mu\nu}$ は反対称で、$F_{\nu\mu}=-F_{\mu\nu}$ を満たします。

<!-- definition-example-start: def-qft28-curvature -->
### 例：一定なのに曲率が零にならない

**定義の確認**：まず交換子で曲率を計算し、成分表示・反対称性も検査します。

$SU(2)$ の $A_1=aT^1$、$A_2=bT^2$、$A_0=A_3=0$ を時空に依らない実定数 $a,b$ で与えます。すべての偏微分は零ですが、$[T^1,T^2]=iT^3$ なので

$$
F_{12}=-ig[aT^1,bT^2]=gabT^3,
\qquad F_{21}=-gabT^3.
$$

残りの独立成分は零です。例えば $a=b=1$ なら $F_{12}^3=g$ であり、$F_{12}^1=F_{12}^2=0$ です。曲率を単に偏微分の差と置くと、この場を誤って零と判定してしまいます。逆に前節の純ゲージ場 $A'_\mu=(\partial_\mu\theta)T^3/g$ は交換子が零で、混合偏微分も交換するため $F'_{\mu\nu}=0$ です。定義の二種類の項をともに確かめました。
<!-- definition-example-end -->

曲率はポテンシャルと異なり非斉次項なしで変換します。ただし可換なU(1)では「不変」だったのに対し、非可換な場合は内部方向が回転します。

<a id="thm-qft28-curvature-bianchi"></a>

<!-- formal-statement-start -->
> **定理（曲率の共変変換とBianchi恒等式）**  
> $N\ge2$、$g>0$ とし、滑らかな $SU(N)$ ポテンシャル $A_\mu$ から[曲率](#def-qft28-curvature)を作る。[非可換ゲージ変換](#thm-qft28-gauge-covariance) $U(x)$ の下で

$$
F'_{\mu\nu}=UF_{\mu\nu}U^{-1}
$$

> が成り立つ。また任意の $A_\mu$ は次のBianchi恒等式を満たす。

$$
\mathcal D_\mu F_{\nu\rho}
+\mathcal D_\nu F_{\rho\mu}
+\mathcal D_\rho F_{\mu\nu}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

曲率の変換則は $D'_\mu(U\psi)=UD_\mu\psi$ を二度使います。Bianchi恒等式は、[GEO5で扱った交換子のJacobi恒等式](../../../幾何系/GEO/GEO5/index.md#thm-geo5-bracket-identities)と同じ代数的恒等式を行列・微分演算子に適用した帰結です。どちらも成分を力ずくで展開する前に、演算子として見ると仕組みが明瞭です。

<!-- proof-start -->
### 証明

任意の滑らかな $\psi$ に対し、共変性を $D_\nu\psi$ にも適用できます。従って

$$
\begin{aligned}
[D'_\mu,D'_\nu](U\psi)
&=D'_\mu(UD_\nu\psi)-D'_\nu(UD_\mu\psi)\\
&=U[D_\mu,D_\nu]\psi=-igUF_{\mu\nu}\psi.
\end{aligned}
$$

一方、定義より左辺は $-igF'_{\mu\nu}U\psi$ です。$g\ne0$ と $U$ の可逆性により $F'_{\mu\nu}=UF_{\mu\nu}U^{-1}$ が従います。

任意の行列値場 $X$ の掛け算演算子との交換子は、$\psi$ に作用させて展開すれば

$$
[D_\mu,X]\psi
=\bigl(\partial_\mu X-ig[A_\mu,X]\bigr)\psi
=(\mathcal D_\mu X)\psi.
$$

演算子の交換子は、結合律から $[P,[Q,R]]+[Q,[R,P]]+[R,[P,Q]]=0$ を満たします。$P=D_\mu,Q=D_\nu,R=D_\rho$ とし、$[D_\nu,D_\rho]=-igF_{\nu\rho}$ を代入すると

$$
-ig\bigl(\mathcal D_\mu F_{\nu\rho}
+\mathcal D_\nu F_{\rho\mu}
+\mathcal D_\rho F_{\mu\nu}\bigr)=0.
$$

$g\ne0$ なのでBianchi恒等式を得ます。ここでは場の方程式を一切使っておらず、任意の滑らかなポテンシャルについて成立します。
<!-- proof-end -->

**二つの違いを押さえましょう。** $F_{\mu\nu}=0$ は「この場の曲率が零」という条件です。一方、Bianchi恒等式は曲率が零でなくても常に成立する恒等式です。Yang–Millsの運動方程式とも別物です。

## 3. 作用は何に対して不変なのか

[QFT15のMaxwell作用](../QFT15/index.md#def-qft15-maxwell-action)は $F_{\mu\nu}F^{\mu\nu}$ を積分しました。行列値の曲率は共役で変換するため、そのまま各行列成分を固定して比べるのではなく、跡を取って内部方向の回転を取り除きます。

<a id="def-qft28-yang-mills-action"></a>

<!-- formal-statement-start -->
> **定義（Yang–Mills作用）**  
> 四次元Minkowski空間上の滑らかな $SU(N)$ ゲージ場 $A_\mu=A_\mu^aT^a$ に対し、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$ で時空添字を上げ下げし、真空のYang–Mills作用を

$$
S_{\mathrm{YM}}[A]
=-\frac12\int d^4x\,\operatorname{tr}(F_{\mu\nu}F^{\mu\nu})
=-\frac14\int d^4x\,F_{\mu\nu}^aF^{a\mu\nu}
$$

> で定める。第二の等号には $\operatorname{tr}(T^aT^b)=\delta^{ab}/2$ を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft28-yang-mills-action -->
### 例：固定内部方向ならMaxwell理論に戻る

**定義の確認**：作用の二つの表示が一致することを生成子の跡から確かめます。

$A_\mu=a_\mu T^3$ とすれば $[A_\mu,A_\nu]=0$ なので、$F_{\mu\nu}=(\partial_\mu a_\nu-\partial_\nu a_\mu)T^3$ です。規格化を跡から確認すると

$$
-\frac12\operatorname{tr}(F_{\mu\nu}F^{\mu\nu})
=-\frac14(\partial_\mu a_\nu-\partial_\nu a_\mu)
(\partial^\mu a^\nu-\partial^\nu a^\mu).
$$

内部方向を一つに制限した作用密度はMaxwell型です。ただしこれは $SU(2)$ 全体をU(1)と同一視したわけではなく、交換する一方向だけに限った特例です。
<!-- definition-example-end -->

<a id="thm-qft28-action-eom"></a>

<!-- formal-statement-start -->
> **定理（Yang–Mills作用の不変性と真空場方程式）**  
> $g>0$、滑らかな $SU(N)$ 接続 $A_\mu$、その曲率 $F_{\mu\nu}$、および[Yang–Mills作用](#def-qft28-yang-mills-action)を考える。局所ゲージ変換 $A'_\mu=UA_\mu U^{-1}-i(\partial_\mu U)U^{-1}/g$ は作用を不変にする。コンパクト支持の任意の実係数変分 $\delta A_\nu^a$ に対して作用が停留するための必要十分条件は、真空Yang–Mills方程式

$$
\mathcal D_\mu F^{\mu\nu}=0,
\qquad
\partial_\mu F^{a\mu\nu}+g f^{abc}A_\mu^b F^{c\mu\nu}=0
$$

> が各時空点で成立することである。
<!-- formal-statement-end -->

### 証明の見取り図

不変性は曲率の共変変換と跡の巡回性から従います。場の方程式は曲率を一次変分し、通常の部分積分の代わりに交換子も合わせて移す「随伴共変微分の部分積分」を用いて求めます。

<!-- proof-start -->
### 証明

[曲率の共変変換](#thm-qft28-curvature-bianchi)を用いれば

$$
\begin{aligned}
\operatorname{tr}(F'_{\mu\nu}F'^{\mu\nu})
&=\operatorname{tr}(UF_{\mu\nu}U^{-1}UF^{\mu\nu}U^{-1})\\
&=\operatorname{tr}(UF_{\mu\nu}F^{\mu\nu}U^{-1})\\
&=\operatorname{tr}(F_{\mu\nu}F^{\mu\nu}).
\end{aligned}
$$

内部変換は時空座標を動かさないため、積分も不変です。

次に $A\mapsto A+\epsilon\delta A$ を代入し、$\epsilon$ の一次係数を取ります。$F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu-ig[A_\mu,A_\nu]$ の微分から

$$
\begin{aligned}
\delta F_{\mu\nu}
&=\partial_\mu\delta A_\nu-\partial_\nu\delta A_\mu
-ig([\delta A_\mu,A_\nu]+[A_\mu,\delta A_\nu])\\
&=\mathcal D_\mu\delta A_\nu-\mathcal D_\nu\delta A_\mu.
\end{aligned}
$$

曲率の反対称性と跡の巡回性を用いると

$$
\delta S_{\mathrm{YM}}
=-\int d^4x\,\operatorname{tr}(F^{\mu\nu}\delta F_{\mu\nu})
=-2\int d^4x\,\operatorname{tr}(F^{\mu\nu}\mathcal D_\mu\delta A_\nu).
$$

ここで部分積分の境界項は変分のコンパクト支持で零です。交換子の項についても

$$
\operatorname{tr}(F^{\mu\nu}[A_\mu,\delta A_\nu])
=\operatorname{tr}([F^{\mu\nu},A_\mu]\delta A_\nu)
$$

なので、$\mathcal D_\mu$ を移すと符号が反転し、

$$
\delta S_{\mathrm{YM}}
=2\int d^4x\,\operatorname{tr}((\mathcal D_\mu F^{\mu\nu})\delta A_\nu)
=\int d^4x\,(\mathcal D_\mu F^{\mu\nu})^a\delta A_\nu^a.
$$

任意の実係数 $\delta A_\nu^a$ が局所的に取れるため、停留条件と各成分の零が同値です。最後に[随伴共変微分の成分式](#def-qft28-curvature)を $X=F^{\mu\nu}$ に適用すれば二つ目の表示が従います。
<!-- proof-end -->

真空方程式の形はMaxwell理論の $\partial_\mu F^{\mu\nu}=0$ に似ていますが、非可換な場合には $g f^{abc}A_\mu^bF^{c\mu\nu}$ が加わります。$A_\mu$ を一定にしただけでは運動方程式の解になるとは限りません。方程式はゲージ共変であり、行列の各成分を個別にゲージ不変な観測量と呼べるわけでもありません。

## 4. ゲージ場が自分自身と相互作用する

Yang–Mills作用は曲率の二乗ですが、曲率そのものに $g A A$ が含まれます。従って作用をポテンシャル $A$ の次数で分けると、二次の自由場だけでなく三次と四次の相互作用が現れます。

<a id="prop-qft28-self-interactions"></a>

<!-- formal-statement-start -->
> **命題（三点・四点ゲージ場自己相互作用の展開）**  
> $SU(N)$ の生成子の規格化と $g>0$ を上記のように固定し、$K_{\mu\nu}^a=\partial_\mu A_\nu^a-\partial_\nu A_\mu^a$ とおく。Yang–Mills作用密度は、ポテンシャルの次数で

$$
\begin{aligned}
\mathcal L_2&=-\frac14K_{\mu\nu}^aK^{a\mu\nu},\\
\mathcal L_3&=-\frac g2 f^{abc}K_{\mu\nu}^a A^{b\mu}A^{c\nu},\\
\mathcal L_4&=-\frac{g^2}{4}f^{abc}f^{ade}
A_\mu^bA_\nu^cA^{d\mu}A^{e\nu}
\end{aligned}
$$

> に分かれる。$\mathcal L_3$ は三つ、$\mathcal L_4$ は四つのゲージ場を含み、可換な生成子に制限するとともに消える。
<!-- formal-statement-end -->

### 証明の見取り図

$F=K+g f A A$ を $F^2$ へ代入し、二次・三次・四次を分けます。交差項には二通りの順序があり、そのため三次の係数は $-g/2$ になります。

<!-- proof-start -->
### 証明

[曲率の成分表示](#def-qft28-curvature)から $F_{\mu\nu}^a=K_{\mu\nu}^a+g f^{abc}A_\mu^bA_\nu^c$ です。従って

$$
\begin{aligned}
F_{\mu\nu}^aF^{a\mu\nu}
={}&K_{\mu\nu}^aK^{a\mu\nu}
+2g f^{abc}K_{\mu\nu}^a A^{b\mu}A^{c\nu}\\
&+g^2f^{abc}f^{ade}A_\mu^b A_\nu^c A^{d\mu}A^{e\nu}.
\end{aligned}
$$

全体に $-1/4$ を掛けて三項へ分ければ主張が従います。なお三次項は $K_{\mu\nu}^a$ の反対称性と $f^{abc}$ の反対称性から $-g f^{abc}(\partial_\mu A_\nu^a)A^{b\mu}A^{c\nu}$ とも書けます。
<!-- proof-end -->

例えば前節の一定 $SU(2)$ 場 $A_1=aT^1,A_2=bT^2$ は $K=0$ でも $F_{12}^3=gab$ でした。空間成分なので $F^{12}=F_{12}$ であり、

$$
\mathcal L_2=\mathcal L_3=0,
\qquad \mathcal L_4=-\frac14\bigl(2g^2a^2b^2\bigr)
=-\frac{g^2a^2b^2}{2}.
$$

四次項だけでも非零の場のエネルギーが現れる例です。$g$ を零に近づける極限、あるいは一つの可換生成子だけを残した場合には相互作用は消え、自由なMaxwell型の二次作用が残ります。逆に局所的なゲージ不変性を保ったまま任意の質量項 $m^2\operatorname{tr}(A_\mu A^\mu)$ を足せるわけではありません。純ゲージ変換で $A=0$ が一般に非零へ移るからです。

## 5. 演習

各問では $\eta=\operatorname{diag}(1,-1,-1,-1)$、$D_\mu=\partial_\mu-igA_\mu$、$[T^a,T^b]=if^{abc}T^c$、$\operatorname{tr}(T^aT^b)=\delta^{ab}/2$ とします。$SU(2)$ の場合は $f^{abc}=\varepsilon^{abc}$ です。

### 演習 QFT28-A1：生成子の交換子

- Level: A
- 問題：本文の $SU(2)$ 生成子について、$[T^2,T^3]$ と $\operatorname{tr}(T^2T^3)$ を行列の積で求め、構造定数と規格化を確かめてください。

<!-- solution-start -->
**詳細解答**

$$
T^2T^3=\frac14\begin{pmatrix}0&i\\i&0\end{pmatrix}
=\frac i2T^1,
\qquad T^3T^2=-\frac i2T^1.
$$

従って $[T^2,T^3]=iT^1$ です。また $T^2T^3$ は対角成分が零なので $\operatorname{tr}(T^2T^3)=0=\delta^{23}/2$。これは $f^{231}=1$ と基底の直交規格化を直接確認しています。
<!-- solution-end -->

### 演習 QFT28-A2：純ゲージの曲率

- Level: A
- 問題：$SU(2)$ で $U=e^{i\theta(x)T^3}$、初期場 $A_\mu=0$ とします。変換後のポテンシャルを求め、その曲率が零であることを二つの項に分けて示してください。

<!-- solution-start -->
**詳細解答**

[ゲージ変換則](#thm-qft28-gauge-covariance)で $\partial_\mu U=i(\partial_\mu\theta)T^3U$ だから $A'_\mu=(\partial_\mu\theta)T^3/g$。微分の差は

$$
\partial_\mu A'_\nu-\partial_\nu A'_\mu
=\frac{\partial_\mu\partial_\nu\theta-\partial_\nu\partial_\mu\theta}{g}T^3=0
$$

です。滑らかさから混合偏微分を交換しました。さらに両ポテンシャルは同じ $T^3$ の倍数なので $[A'_\mu,A'_\nu]=0$。よって[曲率の定義](#def-qft28-curvature)の双方の項が零で、$F'_{\mu\nu}=0$ です。
<!-- solution-end -->

### 演習 QFT28-A3：一定ポテンシャルの曲率

- Level: A
- 問題：$SU(2)$ で $A_1=2T^1,A_2=3T^2,A_0=A_3=0$ を時空一定とします。非零の曲率成分と $F^a_{\mu\nu}F^{a\mu\nu}$ を求めてください。

<!-- solution-start -->
**詳細解答**

微分項は零です。$[T^1,T^2]=iT^3$ なので $F_{12}=-ig[2T^1,3T^2]=6gT^3$、$F_{21}=-6gT^3$ です。したがって $F^3_{12}=6g,F^3_{21}=-6g$ 以外は零です。計量の空間成分は $\eta^{11}=\eta^{22}=-1$ なので $F^{3 12}=(-1)(-1)F^3_{12}=6g$。和を両方の順序で取ると

$$
F^a_{\mu\nu}F^{a\mu\nu}
=F^3_{12}F^{3 12}+F^3_{21}F^{3 21}=72g^2.
$$
<!-- solution-end -->

### 演習 QFT28-A4：微小ゲージ変換の符号

- Level: A
- 問題：$U=I+i\alpha+O(\alpha^2)$、$\alpha=\alpha^aT^a$ とします。有限変換から一次の $\delta A_\mu^a$ を求め、$SU(2)$ で $A_\mu=a_\mu T^1$、$\alpha=\epsilon T^2$（$\epsilon$ は定数）なら $\delta A_\mu$ がどの生成子方向か調べてください。

<!-- solution-start -->
**詳細解答**

$U^{-1}=I-i\alpha+O(\alpha^2)$ なので $UA_\mu U^{-1}=A_\mu+i[\alpha,A_\mu]+O(\alpha^2)$。また $-i(\partial_\mu U)U^{-1}/g=(\partial_\mu\alpha)/g+O(\alpha^2)$ です。$i[\alpha,A_\mu]=-\alpha^bA_\mu^c f^{bca}T^a=f^{abc}A_\mu^b\alpha^cT^a$ より

$$
\delta A_\mu^a=\frac1g\partial_\mu\alpha^a+f^{abc}A_\mu^b\alpha^c.
$$

指定例では微分項が零で、$i[\epsilon T^2,a_\mu T^1]=i\epsilon a_\mu(-iT^3)=\epsilon a_\mu T^3$。従って第三方向へ回転し、符号は正です。
<!-- solution-end -->

### 演習 QFT28-A5：跡の不変性

- Level: A
- 問題：任意の $N\times N$ 行列 $X,Y$ と可逆行列 $U$ について、$\operatorname{tr}(UXU^{-1}UYU^{-1})=\operatorname{tr}(XY)$ を示し、Yang–Mills作用のどこで使うか述べてください。

<!-- solution-start -->
**詳細解答**

中間の $U^{-1}U=I$ により積は $UXYU^{-1}$。跡の巡回性 $\operatorname{tr}(PQ)=\operatorname{tr}(QP)$ を $P=U,Q=XYU^{-1}$ に適用すると $\operatorname{tr}(UXYU^{-1})=\operatorname{tr}(XYU^{-1}U)=\operatorname{tr}(XY)$ です。[曲率の共変変換](#thm-qft28-curvature-bianchi)で $X=F_{\mu\nu},Y=F^{\mu\nu}$ を入力することが、作用密度のゲージ不変性の核心です。
<!-- solution-end -->

### 演習 QFT28-B1：曲率の無限小変換

- Level: B
- 問題：滑らかな微小変換 $U=I+i\alpha+O(\alpha^2)$ に対して $F'_{\mu\nu}=UF_{\mu\nu}U^{-1}$ を一次まで展開し、$\delta F^a_{\mu\nu}$ の成分式を求めてください。なぜ一般には $\delta F^a_{\mu\nu}=0$ でないのか説明してください。

<!-- solution-start -->
**詳細解答**

一次では $F'=F+i[\alpha,F]+O(\alpha^2)$ です。交換子は

$$
i[\alpha,F]
=i\alpha^bF^c_{\mu\nu}[T^b,T^c]
=-\alpha^bF^c_{\mu\nu}f^{bca}T^a
=f^{abc}F^b_{\mu\nu}\alpha^cT^a.
$$

従って $\delta F^a_{\mu\nu}=f^{abc}F^b_{\mu\nu}\alpha^c$。非可換な内部方向は変換で互いに混ざるので各成分は不変である必要がありません。一方、$F^a_{\mu\nu}F^{a\mu\nu}$ の一次変分は $2f^{abc}F^a_{\mu\nu}F^{b\mu\nu}\alpha^c=0$ です。$F^aF^b$ が $a,b$ で対称、$f^{abc}$ が反対称だからです。
<!-- solution-end -->

### 演習 QFT28-B2：Bianchi恒等式を成分で読む

- Level: B
- 問題：$SU(2)$ の滑らかな場について、$\mathcal D_\mu F_{\nu\rho}+\mathcal D_\nu F_{\rho\mu}+\mathcal D_\rho F_{\mu\nu}=0$ の内部成分式を展開し、$A_1=aT^1,A_2=bT^2,A_3=0$ が時空一定のとき $(\mu,\nu,\rho)=(1,2,3)$ の各項を検算してください。

<!-- solution-start -->
**詳細解答**

[Yang–Mills曲率と随伴共変微分](#def-qft28-curvature)から、各 $a$ について

$$
\begin{aligned}
0={}&\partial_\mu F^a_{\nu\rho}+\partial_\nu F^a_{\rho\mu}+\partial_\rho F^a_{\mu\nu}\\
&+g\varepsilon^{abc}\left(A_\mu^bF^c_{\nu\rho}
+A_\nu^bF^c_{\rho\mu}+A_\rho^bF^c_{\mu\nu}\right).
\end{aligned}
$$

指定例では $F_{12}=gabT^3$ だけが非零です。$F_{23}=F_{31}=0$ なので $\mathcal D_1F_{23}=\mathcal D_2F_{31}=0$。$F_{12}$ は一定で $A_3=0$ なので $\mathcal D_3F_{12}=\partial_3F_{12}-ig[A_3,F_{12}]=0$。三項を独立に確認できました。これは非零曲率でもBianchi恒等式が成立する例です。
<!-- solution-end -->

### 演習 QFT28-B3：一定場は真空解か

- Level: B
- 問題：$SU(2)$ で $A_1=aT^1,A_2=bT^2,A_0=A_3=0$（$a,b$ は実定数）とします。真空方程式 $\mathcal D_\mu F^{\mu\nu}=0$ の $\nu=1,2$ 成分を計算し、どのような場合に満たされるか判定してください。

<!-- solution-start -->
**詳細解答**

$F^{12}=F_{12}=gabT^3$、$F^{21}=-gabT^3$ で、通常の偏微分は全て零です。$\nu=1$ では $\mu=2$ だけが寄与し、

$$
\mathcal D_\mu F^{\mu1}
=-ig[bT^2,-gabT^3]
=ig^2ab^2[T^2,T^3]
=-g^2ab^2T^1.
$$

$\nu=2$ では $\mu=1$ だけが寄与し、

$$
\mathcal D_\mu F^{\mu2}
=-ig[aT^1,gabT^3]
=-ig^2a^2b[T^1,T^3]
=-g^2a^2bT^2.
$$

$g>0$ なので、両者が零になる必要十分条件は $ab=0$ です。$a,b$ が共に非零なら偏微分が零でも交換子の項が残り、真空解ではありません。これは[真空場方程式](#thm-qft28-action-eom)の非線形性を直接検査しています。
<!-- solution-end -->

### 演習 QFT28-B4：三点と四点を展開する

- Level: B
- 問題：一般の $SU(N)$ で $K_{\mu\nu}^a=\partial_\mu A_\nu^a-\partial_\nu A_\mu^a$ と置き、$-F_{\mu\nu}^aF^{a\mu\nu}/4$ から二次・三次・四次項を導いてください。さらに $SU(2)$ の一定場 $A_1=aT^1,A_2=bT^2$ に対する作用密度を求めてください。

<!-- solution-start -->
**詳細解答**

出発点は $F^a=K^a+g f^{abc}A^bA^c$ です。二乗の交差項を二つとも残せば

$$
\begin{aligned}
\mathcal L_2&=-\tfrac14K^a_{\mu\nu}K^{a\mu\nu},\\
\mathcal L_3&=-\tfrac g2f^{abc}K^a_{\mu\nu}A^{b\mu}A^{c\nu},\\
\mathcal L_4&=-\tfrac{g^2}4f^{abc}f^{ade}A^b_\mu A^c_\nu A^{d\mu}A^{e\nu}.
\end{aligned}
$$

三次項の係数 $1/2$ は二倍の交差項に全体の $-1/4$ を掛けた結果です。一定場では $K=0$、$F^3_{12}=gab,F^3_{21}=-gab$。よって $F^2=2g^2a^2b^2$ から $\mathcal L_4=-g^2a^2b^2/2$、$\mathcal L_2=\mathcal L_3=0$ です。$a$ または $b$ が零なら相互作用も消えます。
<!-- solution-end -->

### 演習 QFT28-C1：曲率・作用・運動方程式を一度に確かめる

- Level: C
- 問題：$SU(2)$、$g>0$、滑らかな時空上で、$A_0=A_3=0$、$A_1=aT^1$、$A_2=bT^2$（$a,b$ は非零定数）を考えます。

1. 曲率 $F_{\mu\nu}$ と作用密度を求めてください。
2. 一定行列 $U=e^{i\beta T^3}$（$\beta$ は実定数）でゲージ変換した後、曲率が共役変換され、作用密度が不変であることを実際に確認してください。
3. $\mathcal D_\mu F^{\mu1}$ と $\mathcal D_\mu F^{\mu2}$ を計算し、これが真空解でないことを示してください。
4. $b\to0$ の極限で何が変わるか、曲率・作用・運動方程式の三つの観点から説明してください。

<!-- solution-start -->
**詳細解答**

**（1）曲率と作用。** $\partial_\mu A_\nu=0$、$[T^1,T^2]=iT^3$ より

$$
F_{12}=gabT^3,\qquad F_{21}=-gabT^3,
\qquad\mathcal L=-\frac{g^2a^2b^2}{2}.
$$

**（2）共役変換の直接検算。** $U$ は一定なので $A'_\mu=UA_\mu U^{-1}$。$[UA_1U^{-1},UA_2U^{-1}]=U[A_1,A_2]U^{-1}$ から

$$
F'_{12}=-ig[A'_1,A'_2]
=U(gabT^3)U^{-1}=gabT^3.
$$

最後の等号は $U$ が $T^3$ の指数であり、$[U,T^3]=0$ だからです。この場合はたまたま第三方向の曲率成分も不変ですが、一般の $U$ では内部方向が回転します。$\operatorname{tr}((T^3)^2)=1/2$ なので、$\mathcal L'=-\operatorname{tr}(F'_{12}F'^{12})=-g^2a^2b^2/2=\mathcal L$ です（反対称な二成分の寄与を合わせました）。

**（3）運動方程式。** 時空微分は零ですが、随伴共変微分は零とは限りません。

$$
\begin{aligned}
\mathcal D_\mu F^{\mu1}
&=-ig[A_2,F^{21}]=-g^2ab^2T^1,\\
\mathcal D_\mu F^{\mu2}
&=-ig[A_1,F^{12}]=-g^2a^2bT^2.
\end{aligned}
$$

$a,b\ne0$ なので両者は非零です。従って真空方程式を満たしません。曲率が一定であることと停留場であることは同値ではありません。

**（4）可換方向への極限。** $b\to0$ では $A_1=aT^1$ のみとなり、交換子 $[A_\mu,A_\nu]$ が零です。上式から $F_{12}\to0$、$\mathcal L\to0$、両方の $\mathcal D_\mu F^{\mu\nu}\to0$ となります。残った一定ポテンシャルは曲率零の場であり、少なくとも局所的にはゲージ変換で零ポテンシャルへ移せます。この帰結を一般の非可換な $a,b\ne0$ の場へ拡張してはいけません。
<!-- solution-end -->

## 6. 学びの整理

- 局所的な内部変換が非可換になると、共変微分に行列値ポテンシャルが必要になり、その変換則は非斉次項を持ちます。
- 曲率は $[D_\mu,D_\nu]=-igF_{\mu\nu}$ で決まり、$F\mapsto UFU^{-1}$ と変換します。Bianchi恒等式は運動方程式とは別に常に成立します。
- $\operatorname{tr}(F^2)$ の作用から $\mathcal D_\mu F^{\mu\nu}=0$ が導かれ、三点・四点のゲージ場自己相互作用が自動的に現れます。
- 本講の計算は古典的で局所的なゲージ理論の計算です。量子化にはゲージ冗長性の処理がさらに必要で、次にその手順を学びます。
