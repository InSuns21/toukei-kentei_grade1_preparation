# MICA11 自由場の二点分布

<!-- definition-example-audit: strict -->

[MICA10の特異性伝播](../MICA10/index.md#thm-mica10-propagation)は、波動方程式の解にどのような特異方向があり得るかを制約しました。しかし、波動方程式を満たす分布を一つ選んでも、それが**量子状態の相関**になるとは限りません。分布の局所的な特異性、量子状態の正値性、場の交換関係は異なる条件だからです。

例えば平坦時空の真空では、二つの離れた領域における場の相関は一般には消えません。一方、場の順序を入れ替えた差は因果伝播子で固定され、空間的に離れた領域では消えます。この違いを理解してから、後の局所Hadamard形と波面集合条件へ進みます。

この章では、まず場を試験関数で平均した量、次に状態、その二点分布、最後に平坦時空の正周波数模型、という順に組み立てます。**二点分布は一般に点 $(x,y)$ で評価できる通常の関数ではありません**。記号 $W(x,y)$ は分布核の略記です。

## 1. 古典的な因果伝播子から量子場の交換関係へ

以下、$(M,g)$ は境界のない滑らかな**4次元、時間向き付き大域双曲Lorentz時空**とし、計量の符号は $(-,+,+,+)$、自然体積密度は $d\mu_g$ とします。[大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)は、[Green作用素の存在](../../HPDE/HPDE18/index.md#thm-hpde18-green-existence)を適用するために必要です。

質量 $m\ge0$、曲率結合 $\xi\in\mathbb R$、スカラー曲率 $R$ に対し、[実Klein–Gordon作用素](../../HPDE/HPDE23/index.md#def-hpde23-real-kg)を

$$
P=-\Box_g+m^2+\xi R
$$

とします。場の入力は、実数値の滑らかなコンパクト支持試験関数の空間 $\mathcal D_{\mathbb R}(M)=C_c^\infty(M;\mathbb R)$ です。複素試験関数には $\mathcal D_{\mathbb C}(M)=C_c^\infty(M;\mathbb C)$ を使います。

古典場なら $\int_M f(x)u(x)\,d\mu_g(x)$ は $u$ を $f$ の支持内で平均した値です。量子場では点ごとの $\Phi(x)$ を先に作用素として定義せず、この平均に対応する記号 $\Phi(f)$ を基本対象とします。試験関数で場をならす（smearing）という考え方を、以下では代数の関係式として具体化します。

[因果伝播子の定義](../../HPDE/HPDE21/index.md#def-hpde21-causal-propagator)に従い

$$
E:=G_{\mathrm{ret}}-G_{\mathrm{adv}},\qquad
E(f,h):=\int_M f(Eh)\,d\mu_g
$$

と置きます。$G_{\mathrm{ret}}$ は未来支持、$G_{\mathrm{adv}}$ は過去支持のGreen作用素です。実 $f,h$ に対する $E(f,h)$ は実数で、形式的自己随伴性から $E(h,f)=-E(f,h)$ です。[HPDE23のGreen対合](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)は、この規約の符号を確認する基準になります。複素引数には両変数で複素線形に延長します。

場を「先にHilbert空間上で表現した作用素」として扱う前に、積・和・随伴 $*$ を形式的に使える単位的複素 $*$ 代数を考えます。$[A,B]:=AB-BA$ は交換子、$1$ は単位元です。次の関係式が自由場の最小限の代数的データです。

<a id="def-mica11-smeared-algebra"></a>

<!-- formal-statement-start -->
> **定義（実Klein–Gordon場のsmearing代数）**  
> 境界のない4次元大域双曲Lorentz時空 $(M,g)$ の実Klein–Gordon作用素と、遅延 − 先進の因果伝播子を次の規約で固定する。
> $m\ge0$、$\xi\in\mathbb R$ とし、$R$ は $g$ のスカラー曲率とする。

$$
P=-\Box_g+m^2+\xi R,\qquad
E=G_{\mathrm{ret}}-G_{\mathrm{adv}}
$$

> 複素試験関数 $f\in\mathcal D_{\mathbb C}(M)$ に対応する記号 $\Phi(f)$ と単位元 $1$ から、次の関係を満たす単位的複素 $*$ 代数を生成する：
>
> 1. $\Phi(af+bh)=a\Phi(f)+b\Phi(h)$（$a,b\in\mathbb C$）。
> 2. $\Phi(f)^*=\Phi(\overline f)$。
> 3. $\Phi(Pf)=0$。
> 4. $[\Phi(f),\Phi(h)]=-iE(f,h)1$。
>
> この章ではこの代数を $\mathfrak A_P$ と書く。交換子の $-i$ は上の **遅延 − 先進** 規約であり、因果伝播子の定義を逆にすれば同時に変わる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica11-smeared-algebra -->
### 直接例：実試験関数と反対称交換子

**定義の確認**。実 $f,h\in\mathcal D_{\mathbb R}(M)$ を選びます。$\overline f=f$ なので $\Phi(f)^*=\Phi(f)$ です。また

$$
[\Phi(f),\Phi(f)]=-iE(f,f)1=0,
$$

なぜなら $E(f,f)=-E(f,f)$ から $E(f,f)=0$ だからです。引数を逆転すれば

$$
[\Phi(h),\Phi(f)]=-iE(h,f)1=+iE(f,h)1
=-[\Phi(f),\Phi(h)].
$$

ここで必要なのは試験関数の複素線形性、実関数の随伴性、$E$ の交代性です。さらに $\operatorname{supp}f$ と $\operatorname{supp}h$ が**因果的に分離**し、両支持の任意の二点を結ぶ因果曲線が存在しなければ、Green作用素の因果的支持から $E(f,h)=0$ となり交換子は零です。単に同時刻の空間支持が交わらないだけでは十分ではなく、積 $\Phi(f)\Phi(h)$ そのものが零になるわけでもありません。
<!-- definition-example-end -->

場の方程式 $\Phi(Pf)=0$ と交換子は矛盾しません。実際、[因果伝播子の二つの零合成と支持](../../HPDE/HPDE21/index.md#prop-hpde21-propagator-identities)より $EPf=0$ であり、形式的自己随伴性を使うと $E(Pf,h)=0$ です。従って $[\Phi(Pf),\Phi(h)]=0$ となります。

## 2. 量子場から正の数を得るには

古典的な分布 $u$ には、観測量に期待される数値を割り当てる操作は必要ありません。しかし量子場で $\Phi(f)^*\Phi(f)$ は振幅の二乗に対応するので、その評価値が負になってはいけません。そこで、代数の各元に複素数を割り当て、線形性・規格化・正値性を満たす汎関数を導入します。確率分布を時空の各点へ直接置く定義ではありません。

<a id="def-mica11-positive-state"></a>

<!-- formal-statement-start -->
> **定義（正値状態）**  
> 単位的複素 $*$ 代数 $\mathfrak A_P$ 上の複素線形汎関数 $\omega:\mathfrak A_P\to\mathbb C$ が**正値状態**であるとは、$\omega(1)=1$ かつ任意の $A\in\mathfrak A_P$ に対し $\omega(A^*A)\ge0$（実数として非負）が成り立つことをいう。以下では単に状態ともいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica11-positive-state -->
### 直接例：ベクトル状態と場の一次式

**定義の確認（状態そのもの）**。単位的 $*$ 代数 $\mathfrak A_P$ がHilbert空間の共通不変領域上に $*$ 表現 $\pi$ を持ち、単位ベクトル $\Omega$ がその領域に属するとします。内積を第1変数線形とし、$\pi(A^*)$ が $\pi(A)$ のこの領域での随伴であることを使い、

$$
\omega_\Omega(A):=\langle\pi(A)\Omega,\Omega\rangle,\qquad
\omega_\Omega(1)=\|\Omega\|^2=1
$$

と置きます。$\pi$ と内積の線形性から $\omega_\Omega$ は複素線形です。また任意の代数元 $A$ について

$$
\omega_\Omega(A^*A)
=\langle\pi(A^*A)\Omega,\Omega\rangle
=\langle\pi(A)\Omega,\pi(A)\Omega\rangle
=\|\pi(A)\Omega\|^2\ge0.
$$

したがって**規格化・線形性・全元に対する正値性**を確認できました。平坦時空でこの表現を実際に作る例が、[QFT4のFock空間上のsmearing](../../../物理系/QFT/QFT4/index.md#def-qft4-smeared-field)とその真空ベクトルです。交換子の符号は[QFT5のPauli–Jordan核](../../../物理系/QFT/QFT5/index.md#thm-qft5-commutator-cauchy)で照合できます。これは一般の曲時空にFock真空が一意に存在するという主張ではありません。

**定義の確認（任意の状態への帰結）**。実試験関数 $f$ と実数 $s$ に対し $A=1+s\Phi(f)$ を取ります。$A^*=A$ であり、定義を各項へ適用して

$$
\omega(A^*A)=1+2s\,\omega(\Phi(f))+s^2\omega(\Phi(f)^2)\ge0.
$$

この式はすべての実 $s$ について実数です。特に $\omega(\Phi(f))$ と $\omega(\Phi(f)^2)$ は実数であり、後者は $A=\Phi(f)$ の正値性から非負です。**ここでは $\omega(\Phi(f))=0$ とは結論できません**。真空のような零の一重点関数は、状態の選択に依存する追加の性質です。
<!-- definition-example-end -->

一般の $A$ に対する $\omega(A^*)=\overline{\omega(A)}$ も正値性から導けます。$\omega((1+tA)^*(1+tA))$ が実数であることを実 $t$ について調べれば $\omega(A)+\omega(A^*)$ が実数、$A$ を $iA$ に置き換えれば $i\omega(A)-i\omega(A^*)$ が実数です。二条件から随伴と複素共役の関係が従います。

## 3. 二つの試験関数と二点分布

積の順序を固定し、$\Phi(f)$、$\Phi(h)$ の積に対する状態の値を考えます。二つの入力を独立に動かすので、得られるものは二変数に関する**双線形**汎関数です。状態の正値性だけでは、試験関数を滑らかに変化させたときの連続性は保証されません。二点分布を持つ状態を扱うには、連続性を**別に仮定**します。

<a id="def-mica11-two-point"></a>

<!-- formal-statement-start -->
> **定義（分布型二点量と二点分布）**  
> $\mathfrak A_P$ 上の状態 $\omega$ に対し、$f,h\in\mathcal D_{\mathbb C}(M)$ について

$$
\omega_2(f,h):=\omega\!\left(\Phi(f)\Phi(h)\right)
$$

> と定める。$\omega_2$ が試験関数の標準位相について**共同連続**であり、ある $W\in\mathcal D'(M\times M;\mathbb C)$ により $\omega_2(f,h)=W(f\otimes h)$ と表せるとき、二点量が**分布型**であるという。この $W$ を二点分布と呼ぶ。状態の代数的正値性だけでは、ここで要求した連続性・分布核の存在は仮定できない。
<!-- formal-statement-end -->

ここで $(f\otimes h)(x,y)=f(x)h(y)$ です。二点分布の形式的表示

$$
\omega_2(f,h)=\int_{M\times M}W(x,y)f(x)h(y)\,d\mu_g(x)d\mu_g(y)
$$

は、積分核が通常関数のときには通常の積分ですが、一般には**分布の作用**を表す略記です。「$W(x,x)$ を代入する」操作はこの定義に含まれません。[MICA7の引き戻し条件](../MICA7/index.md#thm-mica7-pullback)が後に対角制限の可否を判定します。

<!-- definition-example-start: def-mica11-two-point -->
### 直接例：双線形性と順序を確認する

**定義の確認**。$f_1,f_2,h\in\mathcal D_{\mathbb C}(M)$、$a,b\in\mathbb C$ に対し、

$$
\begin{aligned}
\omega_2(af_1+bf_2,h)
&=\omega((a\Phi(f_1)+b\Phi(f_2))\Phi(h))\\
&=a\omega_2(f_1,h)+b\omega_2(f_2,h).
\end{aligned}
$$

第2引数も同様に線形です。一方、積の順序が入れ替わる $\omega_2(h,f)$ は、一般には $\omega_2(f,h)$ と異なります。**双線形**と、次の節で使う $\omega_2(\overline f,h)$ の**第1引数反線形**な正値形式を混同しないでください。

この計算が確認したのは双線形性であって、**共同連続性や分布核の存在ではありません**。その非自明な条件を満たす具体例は、次節のMinkowski真空核 $W_0$ をFourier変換で評価して確認します。
<!-- definition-example-end -->

## 4. 正値性・双解性・交換子は別々の条件

分布核 $W$ が物理的な二点量の候補になるには、少なくとも三つの検査があります。試験関数の複素共役を第1引数に入れた正値性、両変数での場の方程式、引数交換の反対称部分です。それぞれ、量子状態・運動方程式・因果的交換関係という別の情報を表します。

<a id="def-mica11-two-point-conditions"></a>

<!-- formal-statement-start -->
> **定義（二点分布の正値性・双解性・交換子条件）**  
> 境界のない滑らかな4次元大域双曲Lorentz時空の実 $P=-\Box_g+m^2+\xi R$ と $E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ を固定する。複素双線形な連続汎関数 $W(f,h)$ が以下を満たすという：
>
> - **正値性**：任意の複素試験関数 $f$ に対し $W(\overline f,f)\ge0$。
> - **双解性**：任意の複素試験関数 $f,h$ に対し $W(Pf,h)=W(f,Ph)=0$。
> - 交換子条件：任意の複素試験関数 $f,h$ に対し $W(f,h)-W(h,f)=-iE(f,h)$。
>
> $W$ を状態の二点量として用いる際には、さらに $W(f,h)=\overline{W(\overline h,\overline f)}$ という**Hermite性**も確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica11-two-point-conditions -->
### 直接例：Minkowski真空を四条件へ入れる

**定義の確認**。$M=\mathbb R^{1+3}$、$P=\partial_t^2-\Delta+m^2$、$m>0$ とし、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ と置きます。平坦な真空の分布核を

$$
W_0(x,y)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\omega_{\boldsymbol p}(t_x-t_y)+i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}
$$

で与えます。これは[QFT5のFock真空二点分布](../../../物理系/QFT/QFT5/index.md#thm-qft5-wightman-positive)の積分表示です。ここで時空Fourier変換の変数 $q^0\in\mathbb R$、$\boldsymbol q\in\mathbb R^3$ を

$$
\widetilde f(q^0,\boldsymbol q)
:=\int_{\mathbb R^4}f(t,\boldsymbol x)
e^{iq^0t-i\boldsymbol q\cdot\boldsymbol x}\,dt\,d^3x
$$

と定めます。指数の $x$ 側の積分は $\widetilde f(-\omega_{\boldsymbol p},-\boldsymbol p)$、$y$ 側は $\widetilde h(\omega_{\boldsymbol p},\boldsymbol p)$ なので、

$$
W_0(f,h)
=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
\widetilde f(-\omega_{\boldsymbol p},-\boldsymbol p)
\widetilde h(\omega_{\boldsymbol p},\boldsymbol p).
$$

質量 $m>0$ により $\omega_{\boldsymbol p}\ge m$ です。コンパクト支持の滑らかな試験関数はFourier変換が急減少します。支持をコンパクト集合 $K$ に固定すると、任意の整数 $N\ge0$ について

$$
|\widetilde f(\pm\omega_{\boldsymbol p},\pm\boldsymbol p)|
\le C_{K,N}(f)(1+|\boldsymbol p|)^{-N}
$$

となります。ここで $C_{K,N}(f)$ は $K$ 上の有限階までの微分の上限で抑えられる量です。$h$ についても同じ評価が得られます。

$N=2$ を両因子に適用すれば積は $|\boldsymbol p|$ について4次減衰し、3次元の運動量積分は絶対収束します。分母も $2\omega_{\boldsymbol p}\ge2m$ なので零になりません。各固定支持上の試験関数の半ノルムで積分を抑えられるため、両引数に**共同連続**です。これで分布型二点量の非自明な条件も確認できました。

さらに $\widetilde{\overline f}(-\omega,-\boldsymbol p)=\overline{\widetilde f(\omega,\boldsymbol p)}$ より、正値性は

$$
W_0(\overline f,f)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
|\widetilde f(\omega_{\boldsymbol p},\boldsymbol p)|^2\ge0
$$

です。$P_x$ は第1変数 $(t_x,\boldsymbol x)$、$P_y$ は第2変数 $(t_y,\boldsymbol y)$ に作用する微分作用素です。指数へそれぞれ作用させると $-\omega_{\boldsymbol p}^2+|\boldsymbol p|^2+m^2=0$ が掛かり、双解性が成立します。二点の交換では時間差の正弦部分だけが残り、

$$
W_0(x,y)-W_0(y,x)=-iE(x,y),\quad
E(t,\boldsymbol z)=\int\frac{d^3p}{(2\pi)^3}
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z}
$$

となります。核の複素共役を取ると引数交換に等しいのでHermite性も成立します。これらはすべて試験関数に作用させた**分布恒等式**です。第5節で正周波数の意味と、交換子の変数変換・符号をさらに詳しく検算します。
<!-- definition-example-end -->

正値性は「$W(x,y)$ が各点で非負」という主張ではありません。また、これらの条件だけを読んで「Hadamard状態が存在する」とも結論しません。Hadamard性は**特異方向への追加の制約**であり、後の章で導入します。

<a id="prop-mica11-state-properties"></a>

<!-- formal-statement-start -->
> **命題（状態から従う二点量の性質）**  
> $\omega$ を上記 $\mathfrak A_P$ 上の状態とし、その $\omega_2$ は共同連続と仮定する。このとき二点分布 $W$ は上の正値性、双解性、交換子条件、Hermite性を満たす。さらに複素試験関数 $f_1,\dots,f_N$ と複素数 $c_1,\dots,c_N$ について

$$
\sum_{j,k=1}^N\overline{c_j}c_k\,
W(\overline{f_j},f_k)\ge0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正値性は $A=\Phi(f)$、双解性は $\Phi(Pf)=0$、反対称部分は $[\Phi(f),\Phi(h)]$ へ状態を作用させます。多点の正値性は、複数の場を一つに足してから正値性を使うだけです。

<!-- proof-start -->
### 証明

任意の複素試験関数 $f$ について $\Phi(f)^*=\Phi(\overline f)$ なので

$$
W(\overline f,f)
=\omega(\Phi(f)^*\Phi(f))\ge0.
$$

複素試験関数 $f,h$ と $P$ の実係数性から $\Phi(Pf)=0$、$\Phi(Ph)=0$ であり、従って

$$
W(Pf,h)=\omega(0\cdot\Phi(h))=0,
\qquad W(f,Ph)=\omega(\Phi(f)\cdot0)=0.
$$

交換子については状態の線形性と $\omega(1)=1$ を用いて

$$
\begin{aligned}
W(f,h)-W(h,f)
&=\omega([\Phi(f),\Phi(h)])\\
&=-iE(f,h)\omega(1)=-iE(f,h).
\end{aligned}
$$

随伴は積の順序を反転するので

$$
\begin{aligned}
\overline{W(\overline h,\overline f)}
&=\overline{\omega(\Phi(\overline h)\Phi(\overline f))}\\
&=\omega((\Phi(\overline h)\Phi(\overline f))^*)\\
&=\omega(\Phi(f)\Phi(h))=W(f,h).
\end{aligned}
$$

最後に $F=\sum_kc_kf_k$ と置くと $\Phi(F)^*\Phi(F)$ を展開して

$$
0\le W(\overline F,F)
=\sum_{j,k}\overline{c_j}c_kW(\overline{f_j},f_k).
$$

すべての等式は試験関数に対するもので、分布を対角上で評価してはいません。
<!-- proof-end -->

実試験関数 $f,h$ の場合にはHermite性から $W(h,f)=\overline{W(f,h)}$ です。よって対称な実部を $\mu(f,h):=\operatorname{Re}W(f,h)$ と置けば

$$
W(f,h)=\mu(f,h)-\frac{i}{2}E(f,h),\qquad
\mu(f,h)=\mu(h,f).
$$

したがって**交換子は虚部の反対称部分を固定しますが、実対称部分 $\mu$ は固定しません**。状態の自由度がここに残ります。

正値性が $\mu$ をどこまで制限するかを、二つの試験関数だけで確認します。

<a id="prop-mica11-cauchy-schwarz"></a>

<!-- formal-statement-start -->
> **命題（二点分布のCauchy–Schwarz評価）**  
> 上記命題の $W$ に対し、複素試験関数 $f,h$ は

$$
|W(\overline f,h)|^2\le W(\overline f,f)W(\overline h,h)
$$

> を満たす。特に実試験関数 $f,h$ に対して $\mu(f,h)=\operatorname{Re}W(f,h)$ と書けば

$$
\mu(f,f)\mu(h,h)-\mu(f,h)^2\ge\frac14E(f,h)^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$B(f,h)=W(\overline f,h)$ は正半定値Hermite形式です。$B(f,f)$ が零のときも式を使えるよう、二次式 $B(f+zh,f+zh)\ge0$ から直接示します。

<!-- proof-start -->
### 証明

$a=B(f,f)\ge0$、$b=B(h,h)\ge0$、$c=B(f,h)$ と置きます。Hermite性から $B(h,f)=\overline c$ であり、任意の $z\in\mathbb C$ に対して

$$
0\le B(f+zh,f+zh)=a+z c+\overline z\,\overline c+|z|^2b.
$$

$b>0$ なら $z=-\overline c/b$ と選び、$0\le a-|c|^2/b$ より $|c|^2\le ab$。$b=0$ なら $z=-t\overline c$（$t>0$）で $0\le a-2t|c|^2$ ですから $c=0$ であり、やはり不等式が成立します。

実試験関数では $a=\mu(f,f)$、$b=\mu(h,h)$ と書けます。また[状態から従う交換子条件](#prop-mica11-state-properties)を使うと

$$
c=W(f,h)=\mu(f,h)-\frac{i}{2}E(f,h),
\quad |c|^2=\mu(f,h)^2+\frac14E(f,h)^2.
$$

これを $|c|^2\le ab$ に代入して結論を得ます。
<!-- proof-end -->

この不等式は、交換子が零でない二方向に対して $\mu$ を両方とも零にすることが許されない、という意味を持ちます。**正値性は量子論の独立した制約**です。

## 5. 平坦時空の真空で正周波数を計算する

一般の曲がった時空では大域的な時間並進対称性がないため、真空を一意に決める「全時空共通の正周波数」という指定は普通はできません。そこで正周波数の意味を確認する**模型**として $M=\mathbb R^{1+3}$、$g=-dt^2+d\boldsymbol x^2$、$m>0$、$\xi R=0$ を考えます。

$z=(z^0,\boldsymbol z)=x-y$、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ とします。[QFT5のFock真空二点分布](../../../物理系/QFT/QFT5/index.md#thm-qft5-wightman-positive)の正規化を、ここでの $(-,+,+,+)$ 計量と $P=\partial_t^2-\Delta+m^2$ に合わせると

$$
W_0(z)=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\omega_{\boldsymbol p}z^0+i\boldsymbol p\cdot\boldsymbol z}.
$$

この振動積分は緩増加分布の意味で解釈します。$e^{-i\omega t}$ が正周波数枝であり、$e^{+i\omega t}$ を等しい重みで足すのではありません。試験関数 $f$ の時空Fourier変換は第4節と同じ規約を使い、時間周波数の変数を $q^0$、空間周波数を $\boldsymbol q$ と書きます（因果伝播子 $E$ とは区別します）。

$$
\widetilde f(q^0,\boldsymbol q)
:=\int_{\mathbb R^4}f(t,\boldsymbol x)
e^{iq^0t-i\boldsymbol q\cdot\boldsymbol x}\,dt\,d^3x.
$$

この符号を使えば

$$
W_0(f,h)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
\widetilde f(-\omega_{\boldsymbol p},-\boldsymbol p)
\widetilde h(\omega_{\boldsymbol p},\boldsymbol p).
$$

$\widetilde{\overline f}(-\omega,-\boldsymbol p)=\overline{\widetilde f(\omega,\boldsymbol p)}$ だから

$$
W_0(\overline f,f)
=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
|\widetilde f(\omega_{\boldsymbol p},\boldsymbol p)|^2\ge0.
$$

正値性は位相のある積分核の点ごとの符号ではなく、**質量殻に制限したFourier変換の絶対値二乗**から来ます。$f$ がSchwartzなら $m>0$ により分母が零にならず、被積分関数は急減少するので有限です。

質量殻の式を $k=(k^0,\boldsymbol k)$ に対して書けば

$$
(k^0)^2-|\boldsymbol k|^2=m^2,\quad k^0>0,
\quad k^0=\omega_{\boldsymbol k}.
$$

この枝に分布が支持されることが[Minkowski模型の正エネルギースペクトル条件](../../../物理系/QFT/QFT5/index.md#def-qft5-positive-mass-shell)です。$P_z$ を指数に作用させると $(-\omega_{\boldsymbol p}^2+|\boldsymbol p|^2+m^2)$ が掛かって零になるため、$W_0$ は両変数で場の方程式を満たします。

### 交換子を正弦核から確かめる

$W_0(z)-W_0(-z)$ の第2項で $\boldsymbol p\mapsto-\boldsymbol p$ と変数変換すると

$$
\begin{aligned}
W_0(z)-W_0(-z)
&=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z}
(e^{-i\omega_{\boldsymbol p}z^0}-e^{i\omega_{\boldsymbol p}z^0})\\
&=-i\int\frac{d^3p}{(2\pi)^3}
\frac{\sin(\omega_{\boldsymbol p}z^0)}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z}
=-iE(z).
\end{aligned}
$$

$E(z)$ は[QFT5のPauli–Jordan核のCauchyデータ](../../../物理系/QFT/QFT5/index.md#thm-qft5-commutator-cauchy)および[HPDE21の遅延 − 先進規約](../../HPDE/HPDE21/index.md#def-hpde21-causal-propagator)と一致します。$\sin(0)=0$ から $E(0,\boldsymbol z)=0$、$\partial_t\sin(\omega t)/\omega|_{t=0}=1$ とFourier逆変換から

$$
\partial_tE(0,\boldsymbol z)=\delta^3(\boldsymbol z).
$$

従って等時刻の場では $[\Phi(t,\boldsymbol x),\partial_s\Phi(s,\boldsymbol y)]_{s=t}=+i\delta^3(\boldsymbol x-\boldsymbol y)$ と読めます。これは**空間的なsmearing後の分布恒等式**であり、$\Phi(t,\boldsymbol x)$ を単独の点作用素として構成したという意味ではありません。

### 高周波でどの余接方向が現れるか

[MICA3の波面集合](../MICA3/index.md#def-mica3-wavefront)はFourier変換の高周波方向を検出します。上の一つの指数の位相を $\varphi(x,y;\boldsymbol p)=-\omega_{\boldsymbol p}(t_x-t_y)+\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)$ と書くと、各変数の位相微分は

$$
d_x\varphi=(-\omega_{\boldsymbol p},\boldsymbol p),
\qquad d_y\varphi=(+\omega_{\boldsymbol p},-\boldsymbol p)=-d_x\varphi.
$$

任意の単位空間方向 $\boldsymbol n$ について $\boldsymbol p=r\boldsymbol n$、$r\to\infty$ とすると

$$
\frac{\omega_{r\boldsymbol n}}r=\sqrt{1+\frac{m^2}{r^2}}\longrightarrow1,
\quad r^{-1}d_x\varphi\longrightarrow(-1,\boldsymbol n).
$$

$(-,+,+,+)$ 計量では、共変ベクトル $k=(-1,\boldsymbol n)$ の計量双対 $k^\sharp=(1,\boldsymbol n)$ は未来向き光的です。有限 $r$ の $(-\omega_{r\boldsymbol n},r\boldsymbol n)$ は質量 $m>0$ なら**時間的**ですが、極限の高周波方向は**光的**になります。この二つを混同しないことが後の波面集合条件の出発点です。

<a id="prop-mica11-positive-direction"></a>

<!-- formal-statement-start -->
> **命題（Minkowski真空の正周波数と光的余接方向）**  
> $\mathbb R^{1+3}$ に計量 $g=-dt^2+d\boldsymbol x^2$ を入れ、質量を $m>0$ とする。運動量 $\boldsymbol p\in\mathbb R^3$ の正周波数と、二点間の位相を次で定める。

$$
\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2},\qquad
\varphi(x,y;\boldsymbol p)
=-\omega_{\boldsymbol p}(t_x-t_y)
+\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y).
$$

> 各有限運動量での余接微分は

$$
d_x\varphi=(-\omega_{\boldsymbol p},\boldsymbol p),\qquad
d_y\varphi=-d_x\varphi.
$$

> 単位ベクトル $\boldsymbol n$ と $r>0$ に対し $\boldsymbol p=r\boldsymbol n$ と置くと、$r\to\infty$ で

$$
(r^{-1}d_x\varphi,r^{-1}d_y\varphi)
\longrightarrow((-1,\boldsymbol n),(1,-\boldsymbol n)).
$$

> 第1成分 $(-1,\boldsymbol n)$ の計量双対は未来向き光的である。
<!-- formal-statement-end -->

### 証明の見取り図

位相を二つの時空変数で微分し、次に質量殻の平方根を大運動量で割ります。結論は**位相の高周波方向**についてであり、これだけで二点分布の波面集合の完全な等式を証明したことにはなりません。

<!-- proof-start -->
### 証明

$\omega_{\boldsymbol p}$ は $x,y$ に依存しないので、位相の $t_x$ 微分は $-\omega_{\boldsymbol p}$、$\boldsymbol x$ 微分は $\boldsymbol p$ です。$y$ 微分では両符号が反転します。$\boldsymbol p=r\boldsymbol n$ として $\omega_{r\boldsymbol n}/r=\sqrt{1+m^2/r^2}\to1$ だから主張する極限が出ます。最後に

$$
g^{-1}(k,k)=-(-1)^2+|\boldsymbol n|^2=0,
\qquad k^\sharp=(1,\boldsymbol n)
$$

を確認します。時間成分が正で、零でない光的ベクトルです。従って未来向きです。
<!-- proof-end -->

この計算は、Minkowski真空で選ばれる**正のエネルギー枝**が、波面の余接方向では $dt$ 係数の負号として現れる理由を教えてくれます。ただし、分布の真の $WF(W_0)$ を決定するには、停留位相と局所化を含む解析が別途必要です。[MICA10の伝播定理](../MICA10/index.md#thm-mica10-propagation)は特性方向への伝播を教えますが、正の枝の選択や真空の正値性を自動的に保証しません。

## 6. 同じ交換子でも二点分布は一意でない

先ほどの $\mu$ は状態に依存するので、同じ背景と同じ場の交換関係でも相関の強さは変えられます。これを「あり得るはず」と言うだけでなく、滑らかな解を使って明示的に作ります。

実数値の滑らかなKlein–Gordon解 $v\in C^\infty(M;\mathbb R)$（$Pv=0$）を選び、試験関数を数値にする線形汎関数を

$$
\ell_v(f):=\int_Mv(x)f(x)\,d\mu_g(x)
$$

とします。$f$ はコンパクト支持なので、$v$ が空間コンパクトである必要はありません。実係数の $P$ の形式的自己随伴性により $\ell_v(Pf)=\ell_{Pv}(f)=0$ です。

<a id="prop-mica11-smooth-shift"></a>

<!-- formal-statement-start -->
> **命題（滑らかな双解による二点量の変更）**  
> 上記の $M,P,E$ 上で、共同連続な状態の二点分布 $W$ が正値性、双解性、交換子条件、Hermite性を満たすとする。実数値の滑らかな解 $Pv=0$ と $\lambda\ge0$ に対して

$$
W_\lambda(f,h):=W(f,h)+\lambda\ell_v(f)\ell_v(h)
$$

> と置くと、$W_\lambda$ も同じ四条件を満たす連続な二点分布である。付加された核は滑らかな関数 $\lambda v(x)v(y)$ である。この条件だけでは $W$ は一般に一意にならない。
<!-- formal-statement-end -->

### 証明の見取り図

追加項は二つの引数を入れ替えても変わりません。$Pv=0$ なので双解性を壊さず、正値性へは絶対値二乗を加えます。場の平均値をずらした状態による実現も後で確認します。

<!-- proof-start -->
### 証明

滑らかな $v$ に対する $\ell_v$ は試験関数の標準位相で連続ですから、$\ell_v\otimes\ell_v$ は共同連続です。実 $v$ なので $\ell_v(\overline f)=\overline{\ell_v(f)}$ となり、任意の複素 $f$ について

$$
W_\lambda(\overline f,f)
=W(\overline f,f)+\lambda|\ell_v(f)|^2\ge0.
$$

任意の $f,h$ に対し $\ell_v(Pf)=0$ だから

$$
W_\lambda(Pf,h)=W(Pf,h)+\lambda\ell_v(Pf)\ell_v(h)=0,
$$

第2引数についても零です。交換子を取ると

$$
\begin{aligned}
W_\lambda(f,h)-W_\lambda(h,f)
&=W(f,h)-W(h,f)\\
&\quad+\lambda(\ell_v(f)\ell_v(h)-\ell_v(h)\ell_v(f))\\
&=-iE(f,h).
\end{aligned}
$$

追加項のHermite性も $\overline{\ell_v(\overline h)\ell_v(\overline f)}=\ell_v(h)\ell_v(f)$ から従います。最後に分布核 $\lambda v\otimes v$ は滑らかです。
<!-- proof-end -->

さらに、$W$ が状態 $\omega$ の二点分布なら、**一点量が零でなくても** $W_\lambda$ は実際に状態から得られます。実 $a$ に対する置換

$$
\alpha_a(\Phi(f))=\Phi(f)+a\ell_v(f)1,
\qquad \alpha_a(1)=1
$$

は $\ell_v(Pf)=0$ と $v$ の実数値性により場の方程式と随伴を保ち、定数項が交換子に寄与しないので場の交換関係も保つ $*$ 自己同型です。逆写像は $\alpha_{-a}$ です。$\omega\circ\alpha_{\pm a}$ は正値状態であり、その二点量を積の展開から計算すると

$$
\begin{aligned}
(\omega\circ\alpha_{\pm a})_2(f,h)
&=\omega\bigl((\Phi(f)\pm a\ell_v(f)1)
(\Phi(h)\pm a\ell_v(h)1)\bigr)\\
&=W(f,h)\pm a\{\ell_v(f)\omega(\Phi(h))
+\ell_v(h)\omega(\Phi(f))\}\\
&\quad+a^2\ell_v(f)\ell_v(h).
\end{aligned}
$$

従って $a=\sqrt\lambda$ とした二状態の**平均**は、任意の一点量について一次項が相殺され、二点量 $W+\lambda\ell_v\otimes\ell_v$ を持ちます。条件を形式上満たすだけの人工的な核ではありません。

一方、付加項が滑らかなので[MICA3の波面集合の和の性質](../MICA3/index.md#prop-mica3-sum)に照らし、この操作は特異方向を新たに作りません。**正値性・場の交換関係・双解性を確認すること**と、**特異方向にHadamard条件を課すこと**は、ここでも別段階の検査です。

## 7. 演習――状態・方程式・周波数を自分で接続する

<a id="ex-mica11-a01"></a>
### 演習 MICA11-A1：smearing代数と随伴

- Level: A
- 目安時間: 16分

複素試験関数 $f=u+iv$（$u,v\in\mathcal D_{\mathbb R}(M)$）に対して $\Phi(f)^*=\Phi(u)-i\Phi(v)$ を示せ。実試験関数 $u$ では $[\Phi(u),\Phi(u)]=0$ を、$E$ の交代性から検証せよ。

<!-- solution-start -->
#### 詳細解答

定義の複素線形性から $\Phi(f)=\Phi(u)+i\Phi(v)$ です。随伴は複素係数を共役にするので

$$
\Phi(f)^*=\Phi(u)^*-i\Phi(v)^*=\Phi(u)-i\Phi(v)
=\Phi(\overline f).
$$

また $E(u,u)=-E(u,u)$ より $E(u,u)=0$ です。[場の交換子関係](#def-mica11-smeared-algebra)を適用すると

$$
[\Phi(u),\Phi(u)]=-iE(u,u)1=0.
$$

後者は場の可換性をすべての異なる入力について主張するものではありません。
<!-- solution-end -->

<a id="ex-mica11-a02"></a>
### 演習 MICA11-A2：正値性を二点分布へ移す

- Level: A
- 目安時間: 18分

状態 $\omega$ と複素試験関数 $f$ について、$\omega_2(\overline f,f)\ge0$ を定義から示せ。また $\omega_2(f,h)=\overline{\omega_2(\overline h,\overline f)}$ を導け。

<!-- solution-start -->
#### 詳細解答

$A=\Phi(f)$ と置き、[場の随伴関係](#def-mica11-smeared-algebra)により $A^*=\Phi(\overline f)$ です。従って[状態の正値性](#def-mica11-positive-state)を $A$ に適用すれば

$$
\omega_2(\overline f,f)=\omega(A^*A)\ge0.
$$

次に $B=\Phi(\overline h)\Phi(\overline f)$ とすると、随伴は積の順序を反転するため $B^*=\Phi(f)\Phi(h)$ です。状態が $\omega(B^*)=\overline{\omega(B)}$ を満たすことを使い、

$$
\omega_2(f,h)=\omega(B^*)=\overline{\omega(B)}
=\overline{\omega_2(\overline h,\overline f)}.
$$

正値性を $\omega_2(f,f)\ge0$ と書くのは、複素 $f$ については誤りです。
<!-- solution-end -->

<a id="ex-mica11-a03"></a>
### 演習 MICA11-A3：双解性と分布の意味

- Level: A
- 目安時間: 17分

$P$ が実数係数の形式的自己随伴なKlein–Gordon作用素で、$\Phi(Pf)=0$ とする。共同連続な二点量 $W$ が $W(Pf,h)=W(f,Ph)=0$ を満たすことを示せ。なぜこの式だけから $W(x,x)$ は定義されないのか説明せよ。

<!-- solution-start -->
#### 詳細解答

$\Phi(Pf)=0$ なので、$W(Pf,h)=\omega(\Phi(Pf)\Phi(h))=\omega(0)=0$。同様に $W(f,Ph)=\omega(\Phi(f)\Phi(Ph))=0$。これは分布の第1・第2変数に微分作用素が作用したときに零になるという弱方程式です。

しかし $W$ は $C_c^\infty(M\times M)$ への連続汎関数であり、点 $(x,x)$ を表すデルタ分布は試験関数ではありません。$W$ がその点で通常の関数値を持つとは限らず、対角写像による引き戻しには[MICA7の条件](../MICA7/index.md#thm-mica7-pullback)を別途確認する必要があります。
<!-- solution-end -->

<a id="ex-mica11-a04"></a>
### 演習 MICA11-A4：正周波数の質量殻

- Level: A
- 目安時間: 18分

平坦時空で $m>0$、$P=\partial_t^2-\Delta+m^2$、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ とする。$e^{-i\omega_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol x}$ が $Pu=0$ を満たすことを計算せよ。$\boldsymbol p=0$ の正・負二枝も書け。

<!-- solution-start -->
#### 詳細解答

時間微分で $\partial_t^2u=-\omega_{\boldsymbol p}^2u$、空間微分で $\Delta u=-|\boldsymbol p|^2u$ です。従って

$$
Pu=(-\omega_{\boldsymbol p}^2+|\boldsymbol p|^2+m^2)u=0.
$$

$\boldsymbol p=0$ なら質量殻方程式は $(k^0)^2=m^2$ なので $k^0=+m$ と $k^0=-m$ の二枝です。真空二点核は指数 $e^{-i\omega t}$ に対応する $k^0>0$ の枝を選びます。
<!-- solution-end -->

<a id="ex-mica11-a05"></a>
### 演習 MICA11-A5：共変ベクトルを未来へ向ける

- Level: A
- 目安時間: 19分

$g=-dt^2+d\boldsymbol x^2$、$|\boldsymbol n|=1$ とし、共変ベクトル $k=-dt+\sum_jn_jdx^j$ の計量双対 $k^\sharp$ を求め、その因果型と時間向きを判定せよ。

<!-- solution-start -->
#### 詳細解答

逆計量は $g^{ab}=\operatorname{diag}(-1,1,1,1)$ なので、成分 $k_0=-1$、$k_j=n_j$ を上げると $k^0=(-1)(-1)=1$、$k^j=n_j$ です。従って

$$
k^\sharp=\partial_t+\sum_jn_j\partial_{x^j},\quad
g(k^\sharp,k^\sharp)=-1+|\boldsymbol n|^2=0.
$$

零でない光的ベクトルで、時間成分が正なので未来向きです。**共変ベクトルの時間係数は負**であることが、正エネルギー位相と矛盾しないことを確認できました。
<!-- solution-end -->

<a id="ex-mica11-b01"></a>
### 演習 MICA11-B1：正弦核と等時刻交換関係

- Level: B
- 目安時間: 27分

$m>0$ のMinkowski真空二点核

$$
W_0(t,\boldsymbol z)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\omega_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol z}
$$

から、(i) $W_0(z)-W_0(-z)=-iE(z)$、(ii) $E(0,\boldsymbol z)=0$、$\partial_tE(0,\boldsymbol z)=\delta^3(\boldsymbol z)$ を示せ。(iii) 時刻 $s=t$ で $[\Phi(t,\boldsymbol x),\partial_s\Phi(s,\boldsymbol y)]$ の符号を確認せよ。場の点記号は空間smearingされた分布恒等式の略記とする。

<!-- solution-start -->
#### 詳細解答

(i) $W_0(-t,-\boldsymbol z)$ の積分で $\boldsymbol p\mapsto-\boldsymbol p$ と置くと $\omega_{-\boldsymbol p}=\omega_{\boldsymbol p}$ なので、空間指数を $e^{i\boldsymbol p\cdot\boldsymbol z}$ に揃えられます。差を取れば

$$
\begin{aligned}
W_0(z)-W_0(-z)
&=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z}(e^{-i\omega_{\boldsymbol p}t}-e^{i\omega_{\boldsymbol p}t})\\
&=-i\int\frac{d^3p}{(2\pi)^3}
e^{i\boldsymbol p\cdot\boldsymbol z}\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
=-iE(z).
\end{aligned}
$$

(ii) $\sin 0=0$ から $E(0,\boldsymbol z)=0$。分布として $t$ 微分し、$t=0$ で $\cos0=1$ とすると

$$
\partial_tE(0,\boldsymbol z)=\int\frac{d^3p}{(2\pi)^3}e^{i\boldsymbol p\cdot\boldsymbol z}
=\delta^3(\boldsymbol z).
$$

(iii) 交換子は $-iE(t-s,\boldsymbol x-\boldsymbol y)$ です。第2場の時刻 $s$ で微分すると $\partial_s=-\partial_{(t-s)}$ なので

$$
[\Phi(t,\boldsymbol x),\partial_s\Phi(s,\boldsymbol y)]_{s=t}
=-i(-\partial_tE(0,\boldsymbol x-\boldsymbol y))
=+i\delta^3(\boldsymbol x-\boldsymbol y).
$$

因果伝播子を先進 − 遅延と誤読すると、この最後の符号が逆になります。
<!-- solution-end -->

<a id="ex-mica11-b02"></a>
### 演習 MICA11-B2：正値性と交換子が作る下限

- Level: B
- 目安時間: 28分

実試験関数 $f,h$ について、二点量の実対称部分を $\mu(f,h)=\operatorname{Re}W(f,h)$ とする。$W(f,h)-W(h,f)=-iE(f,h)$ と正値性を使い、$\mu(f,f)\mu(h,h)-\mu(f,h)^2\ge E(f,h)^2/4$ を証明せよ。また $E(f,h)\ne0$ なら $\mu(f,f)=0$ が不可能な理由を述べよ。

<!-- solution-start -->
#### 詳細解答

状態から来るHermite性を実 $f,h$ に使うと $W(h,f)=\overline{W(f,h)}$。従って $W(f,h)-\overline{W(f,h)}=2i\operatorname{Im}W(f,h)=-iE(f,h)$ だから

$$
W(f,h)=\mu(f,h)-\frac{i}{2}E(f,h).
$$

正値性のCauchy–Schwarz評価は[本章の命題](#prop-mica11-cauchy-schwarz)より

$$
|W(f,h)|^2\le W(f,f)W(h,h)=\mu(f,f)\mu(h,h).
$$

左辺を複素数の絶対値二乗として展開すると

$$
|W(f,h)|^2=\mu(f,h)^2+\frac14E(f,h)^2.
$$

これを上の不等式に代入して結論を得ます。$E(f,h)\ne0$ なら右辺の $E(f,h)^2/4$ は正です。もし $\mu(f,f)=0$ なら左辺の最初の積は零で、そこから $\mu(f,h)^2$ を引くので非正になり矛盾します。
<!-- solution-end -->

<a id="ex-mica11-b03"></a>
### 演習 MICA11-B3：滑らかな状態依存項を作る

- Level: B
- 目安時間: 30分

平坦な $\mathbb R^{1+3}$ で $m>0$、$P=\partial_t^2-\Delta+m^2$ とする。$v(t,\boldsymbol x)=\cos(mt)$、$\ell_v(f)=\int vf\,d^4x$、$\lambda>0$ とし、真空二点量 $W_0$ に $\lambda\ell_v(f)\ell_v(h)$ を加える。(i) $Pv=0$、(ii) 正値性、(iii) 双解性と交換子不変性、(iv) なぜ追加項が滑らかかを検証せよ。

<!-- solution-start -->
#### 詳細解答

(i) $v$ は空間座標に依存しないため $\Delta v=0$、また $\partial_t^2\cos(mt)=-m^2\cos(mt)$ です。従って $Pv=(-m^2+m^2)v=0$。

(ii) $v$ が実数値なので $\ell_v(\overline f)=\overline{\ell_v(f)}$ です。$W_\lambda(\overline f,f)=W_0(\overline f,f)+\lambda|\ell_v(f)|^2\ge0$ となります。

(iii) コンパクト支持により二回の部分積分の境界項が零で、$\ell_v(Pf)=\int v(Pf)=\int (Pv)f=0$。これにより $W_\lambda(Pf,h)=W_\lambda(f,Ph)=0$。また追加項は $f,h$ の交換で変化しないので、差 $W_\lambda(f,h)-W_\lambda(h,f)$ は元の $-iE(f,h)$ です。

(iv) 付加した分布核は $\lambda\cos(mt_x)\cos(mt_y)$ です。これは $M\times M$ 上の滑らかな関数なので、点ごとの積としても意味があり、波面集合に新しい特異方向を生じさせません。
<!-- solution-end -->

<a id="ex-mica11-c01"></a>
### 演習 MICA11-C1：一つの二点分布を四方向から検算する

- Level: C
- 目安時間: 42分

$\mathbb R^{1+3}$ の $g=-dt^2+d\boldsymbol x^2$、$m>0$、$P=\partial_t^2-\Delta+m^2$ に対して、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$、

$$
W_0(x,y)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\omega_{\boldsymbol p}(t_x-t_y)+i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}
$$

を分布として用いる。さらに実滑らかな解 $v$ と $\lambda\ge0$ について $W_\lambda=W_0+\lambda v\otimes v$ とする。次を説明せよ。

1. $W_0(\overline f,f)\ge0$ の直接計算と双解性を示す。
2. $W_\lambda^T(x,y):=W_\lambda(y,x)$（分布核の引数交換）と定める。$W_\lambda-W_\lambda^T$ を求め、どの符号の因果伝播子に対応するか述べる。
3. $\boldsymbol p=r\boldsymbol n$、$r\to\infty$ で位相の第1変数の余接方向を求め、その計量双対が未来光的であることを示す。
4. 以上から「$W_\lambda$ はどの曲時空でも一意なHadamard状態である」と結論するのが誤りである理由を二つ挙げる。

<!-- solution-start -->
#### 詳細解答

**1.** まず $W_0(f,h)$ の $x,y$ 積分をそれぞれ行うと、本文と同じFourier規約で

$$
W_0(f,h)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
\widetilde f(-\omega_{\boldsymbol p},-\boldsymbol p)
\widetilde h(\omega_{\boldsymbol p},\boldsymbol p).
$$

$\widetilde{\overline f}(-\omega,-\boldsymbol p)=\overline{\widetilde f(\omega,\boldsymbol p)}$ を代入すると

$$
W_0(\overline f,f)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
|\widetilde f(\omega_{\boldsymbol p},\boldsymbol p)|^2\ge0.
$$

$P_x$ を位相の指数に作用させた係数は $-\omega_{\boldsymbol p}^2+|\boldsymbol p|^2+m^2=0$、$P_y$ も二階作用素なので同じ係数です。従って分布として両変数の弱方程式が成立します。

**2.** $W_0^T(x,y):=W_0(y,x)$ と書けば、$\boldsymbol p\mapsto-\boldsymbol p$ の変数変換と $e^{-ia}-e^{ia}=-2i\sin a$ により

$$
W_0-W_0^T=-i\int\frac{d^3p}{(2\pi)^3}
\frac{\sin(\omega_{\boldsymbol p}(t_x-t_y))}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}=-iE.
$$

追加項は $v(x)v(y)=v(y)v(x)$ なので $W_\lambda-W_\lambda^T=W_0-W_0^T=-iE$。$\partial_tE(0,\boldsymbol z)=\delta^3(\boldsymbol z)$ であるため、$E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ の規約です。

**3.** 位相を $x$ で微分すると $k_x=(-\omega_{r\boldsymbol n},r\boldsymbol n)$。$r$ で割り、$\omega_{r\boldsymbol n}/r=\sqrt{1+m^2/r^2}\to1$ を使うと $k_x/r\to(-1,\boldsymbol n)$ です。逆計量 $\operatorname{diag}(-1,1,1,1)$ で添字を上げると $(1,\boldsymbol n)$ となり、計量ノルムは $-1+|\boldsymbol n|^2=0$、時間成分は正です。

**4.** 第一に、$W_0$ の式は**Minkowski真空**の模型であり、大域時間並進を持たない一般の曲時空に同じ積分式をそのまま移せません。第二に、正値性・双解性・場の交換関係と一つの位相の高周波極限の計算だけでは、曲時空のHadamard波面集合の**完全な等式**を証明できず、かつその条件から状態の一意性も出ません。$\lambda v\otimes v$ は滑らかで基本条件を保つ実例なので、少なくとも基本条件からの一意性は否定されます。なお $W_\lambda$ の正値性も $W_0(\overline f,f)+\lambda|\ell_v(f)|^2\ge0$ と直接確認できます。
<!-- solution-end -->

## 8. 次に必要になる問い

ここで得た二点分布の**正値性・双解性・場の交換関係**は、状態としての基礎です。Minkowski真空では正周波数枝が特異方向の向きを示唆しましたが、一般の曲時空ではそれを大域Fourier変換で指定できません。

次は、測地的に近い二点間で幾何学だけから決まる特異部分を作ります。そこから、滑らかな状態依存部分をどう分離するか、波面集合がどの因果的余接方向を選ぶか、そしてなぜ生の二点分布を対角上で評価できないかへ進みます。
