# GMT23 BVコンパクト性とcoarea

<!-- definition-example-audit: strict -->

[GMT21のBV](../GMT21/index.md#def-gmt21-bv)は、通常の勾配がなくても分布微分を測度として数える道具でした。[GMT22の下半連続性](../GMT22/index.md#thm-gmt22-lsc)は、関数が $L^1$ で収束**した後**に変動がどうなるかを教えます。しかし、変動が一様に有界な関数列から、そもそも収束する部分列を選べるでしょうか。

さらに、ジャンプを含む関数を水平に切ると、その境界の大きさを高さごとに測れます。滑らかな関数についての[GMT14のcoarea公式](../GMT14/index.md#thm-gmt14-coarea)はレベル集合の面積を積分しましたが、BVでは微分が曲面上の測度に集中し得ます。そこで本講では次の二つを結びます。

1. **コンパクト性**：$L^1$ と変動の局所有界性から、$L^1_{\mathrm{loc}}$ で収束する部分列を作る。
2. **BVのcoarea**：関数の全変動を、高さで切った集合の境界の大きさの積分として再構成する。

以下 $d\ge1$、$\Omega\subset\mathbb R^d$ は開集合、積分 $dx$ はLebesgue測度によるものです。

記号 $\chi_E$ は集合 $E$ の指示関数を表します。また $K\Subset U$ は、コンパクト集合 $K$ が開集合 $U$ に含まれることを表します。

「ほとんど至る所（almost everywhere; a.e.）」は、特記しなければLebesgue測度についての意味です。各領域の境界に置かれた質量を勝手に数えないため、後に導入する境界の大きさは常に**領域の内側**だけで測ります。

## 1. 平行移動したときに関数がどれだけ変わるか

滑らかな $v$ では、線分上の微分積分により

$$
v(x+h)-v(x)=\int_0^1\nabla v(x+th)\cdot h\,dt
$$

です。したがって勾配積分が有界なら、小さい $h$ に対する関数の移動量も小さくなります。BV関数には古典的勾配がなくても、[GMT22の局所平滑化](../GMT22/index.md#def-gmt22-local-mollification)を通して同じ評価が残ります。

<a id="lem-gmt23-translation"></a>

<!-- formal-statement-start -->
> **補題（BVの局所平行移動評価）**  
> $u\in BV(\Omega)$、$K\subset\Omega$ はコンパクトな可測集合、$h\in\mathbb R^d$ とする。線分をすべて集めた集合

$$
K+[0,h]=\{x+th:x\in K,\ 0\le t\le1\}
$$

> が開集合 $U$ にコンパクトに含まれ、$U\Subset\Omega$ ならば

$$
\int_K|u(x+h)-u(x)|\,dx\le |h|\,|Du|(U).
$$

> 特に $K$ を固定し、$h$ を十分小さくするとき、右辺は $|h|$ に比例する。
<!-- formal-statement-end -->

### 証明の見取り図

先に $u$ を十分内側で平均し、滑らかな関数の線分積分を使います。平滑化の勾配の積分は、[GMT22の変動評価](../GMT22/index.md#prop-gmt22-local-convolution)によって元の $|Du|(U)$ 以下になります。最後に平滑化半径を0へ送ります。

<!-- proof-start -->
### 証明

$K+[0,h]\Subset W\Subset U$ となる開集合 $W$ を選びます。$K+[0,h]$ はコンパクトで $U$ 内にあるため、このような $W$ が存在します。$\varepsilon>0$ を $W+B(0,\varepsilon)\subset U$ かつ $W\subset\Omega_\varepsilon$ となるほど小さく取ります。

$u_\varepsilon=u*\rho_\varepsilon$ を $W$ 上で定めます。各 $x\in K$ について $t\mapsto u_\varepsilon(x+th)$ を微分すると $h\cdot\nabla u_\varepsilon(x+th)$ であり、$0$ から $1$ まで積分して絶対値を取ると

$$
\begin{aligned}
|u_\varepsilon(x+h)-u_\varepsilon(x)|
&\le |h|\int_0^1|\nabla u_\varepsilon(x+th)|\,dt.
\end{aligned}
$$

これを $K$ 上で積分します。$x+th\in W$ であり、[Lebesgue測度の平行移動不変性](../../F0/F0-00D4/index.md#cor-f0-00d4-lebesgue-translation-invariance)から

$$
\begin{aligned}
\int_K|u_\varepsilon(x+h)-u_\varepsilon(x)|\,dx
&\le |h|\int_0^1\int_{K+th}|\nabla u_\varepsilon(y)|\,dy\,dt\\
&\le |h|\int_W|\nabla u_\varepsilon(y)|\,dy\\
&\le |h|\,|Du|(W+B(0,\varepsilon))\\
&\le |h|\,|Du|(U).
\end{aligned}
$$

第3行は[局所畳み込みと変動評価](../GMT22/index.md#prop-gmt22-local-convolution)であり、最後は測度の単調性です。$u_\varepsilon\to u$ は $K$ と $K+h$ を含むコンパクト近傍上で $L^1$ 収束するので、左辺の差の積分も $u$ のものに収束します。$\varepsilon\downarrow0$ として結論を得ます。$\square$
<!-- proof-end -->

### 例：動く段差でも評価は一様

$\Omega=(0,1)$、$a\in(1/4,3/4)$、$u_a=\chi_{(a,1)}$ とします。[GMT21のジャンプの分布微分](../GMT21/index.md#thm-gmt21-measure-derivative)で $Du_a=\delta_a$、$|Du_a|(\Omega)=1$ です。$h>0$、$h<1/8$ なら、$u_a(x+h)-u_a(x)$ が1となるのは $x\in(a-h,a)$ だけです。したがって $K=[1/8,7/8]$ 上で

$$
\int_K|u_a(x+h)-u_a(x)|\,dx=h=|h|\,|Du_a|(\Omega)
$$

です（線分が $\Omega$ にある範囲での計算）。段差の位置が変わっても、右辺の定数は1のままです。

## 2. BV有界列から収束部分列を選ぶ

コンパクト性で必要なのは変動の一様上界だけではありません。$\Omega=(0,1)$ の定数列 $u_j\equiv j$ は $|Du_j|(\Omega)=0$ ですが、$L^1$ ノルムが発散します。そこで関数自身の $L^1$ 量も合わせて制御します。

<a id="def-gmt23-local-bv-bounded"></a>

<!-- formal-statement-start -->
> **定義（局所BV有界列）**  
> 開集合 $\Omega\subset\mathbb R^d$ 上の列 $(u_j)$ が**局所BV有界**であるとは、各 $j$ について $u_j\in L^1_{\mathrm{loc}}(\Omega)$ であり、任意の開集合 $U\Subset\Omega$ について、$u_j|_U\in BV(U)$ かつ

$$
\sup_j\left(\|u_j\|_{L^1(U)}+|Du_j|(U)\right)<\infty
$$

> が成り立つことをいう。$u_j\in BV(\Omega)$ で $BV$ ノルム $\|u_j\|_{L^1(\Omega)}+|Du_j|(\Omega)$ が一様有界なら、特に局所BV有界である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt23-local-bv-bounded -->
### 直接例：位置を変えるジャンプ

$u_j=\chi_{(a_j,1)}$、$a_j\in[1/4,3/4]$ とします。任意の $U\Subset(0,1)$ で $\|u_j\|_{L^1(U)}\le|U|\le1$、また分布微分 $Du_j=\delta_{a_j}$ を $U$ に制限すれば $|Du_j|(U)\le1$ です。したがって定義の和は全 $j$ について2以下であり、各 $u_j$ が局所BV有界であることを**両条件から**確認できました。$a_{j_k}\to a$ となる部分列を取れば

$$
\|u_{j_k}-\chi_{(a,1)}\|_{L^1(0,1)}=|a_{j_k}-a|\to0
$$

で、収束部分列の姿も見えます。

**定義の確認**：各 $U\Subset(0,1)$ において、$u_j|_U\in BV(U)$、$L^1$ ノルムが高々1、分布微分の全変動が高々1という定義の全条件を確認しました。上界は $j$ に依存しません。
<!-- definition-example-end -->

一般の関数では段差の位置という一つのパラメータを選べません。それでも、平行移動評価と平滑化によって無限次元の関数列を有限精度で近似できます。

<a id="thm-gmt23-compactness"></a>

<!-- formal-statement-start -->
> **定理（BVの局所L1コンパクト性）**  
> $\Omega\subset\mathbb R^d$ を開集合、$(u_j)$ を局所BV有界列とする。このとき部分列 $(u_{j_k})$ と $u\in L^1_{\mathrm{loc}}(\Omega)$ が存在し、任意の $K\Subset\Omega$ について

$$
\|u_{j_k}-u\|_{L^1(K)}\longrightarrow0
$$

> が成立する。極限 $u$ は $BV_{\mathrm{loc}}(\Omega)$ に属し、任意の開集合 $U\Subset\Omega$ で

$$
|Du|(U)\le\liminf_{k\to\infty}|Du_{j_k}|(U).
$$

> 特に $\sup_j\|u_j\|_{BV(\Omega)}<\infty$ なら局所 $L^1$ 収束部分列が取れるが、一般の $\Omega$ で $L^1(\Omega)$ 収束までは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$K$ の少し大きな領域 $U$ で一様な $L^1$・変動の上界を取ります。[平行移動評価](#lem-gmt23-translation)によって $u_j$ と滑らかな $u_j*\rho_\varepsilon$ の $L^1(K)$ 距離を全 $j$ に対し小さくできます。$\varepsilon$ を固定すれば平滑化した族は $K$ 上で一様有界かつ等連続なので、有限個の近似候補にできます。最後にコンパクト集合を増やしながら対角部分列を選びます。

<!-- proof-start -->
### 証明

**(1) 一つのコンパクト集合での有限精度近似。** $K\Subset\Omega$ とし、$K\Subset U_0\Subset U_1\Subset\Omega$ となる開集合を選びます。局所BV有界性から、ある $M<\infty$ により全 $j$ で

$$
\|u_j\|_{L^1(U_1)}+|Du_j|(U_1)\le M
$$

です。$\rho_\varepsilon$ を非負・積分1の標準平滑化核、$v_{j,\varepsilon}=u_j*\rho_\varepsilon$ を $U_0$ 上の局所畳み込みとします。十分小さい $|h|\le\varepsilon$ では $K+[0,h]\Subset U_1$ だから、[平行移動評価](#lem-gmt23-translation)を $u_j$ に適用し

$$
\begin{aligned}
\|v_{j,\varepsilon}-u_j\|_{L^1(K)}
&\le\int\rho_\varepsilon(h)\int_K|u_j(x-h)-u_j(x)|\,dx\,dh\\
&\le M\int\rho_\varepsilon(h)|h|\,dh\\
&\le M\varepsilon.
\end{aligned}
$$

ここで $-h$ に対しても線分が $U_1$ に含まれるよう $\varepsilon$ を選んでいます。

**(2) 固定した半径でのコンパクト性。** $\varepsilon$ を固定します。核の台が $U_1$ 内に収まるため、$x\in K$ について

$$
|v_{j,\varepsilon}(x)|\le M\|\rho_\varepsilon\|_\infty,\qquad
|\nabla v_{j,\varepsilon}(x)|\le M\|\nabla\rho_\varepsilon\|_\infty
$$

です。第二式の微分は核に移しており、元の関数の古典微分は使っていません。さらにコンパクト集合の固定した近傍でも同じ評価が成立するので、平滑化後の関数族は一様有界・等連続です。

ここで一様ノルムに関する有限近似を直接作れます。コンパクト集合を有限個の半径 $r$ の球で覆い、各中心の関数値を幅 $r$ の目盛へ丸めます。値の絶対値は一様に有界なので、目盛も有限個で足ります。

勾配の一様上界を次のように略記します。

$$
L_\varepsilon=M\|\nabla\rho_\varepsilon\|_\infty.
$$

同じ丸め値の組を持つ二関数は、中心では差が高々 $r$、他の点でも差が高々 $(2L_\varepsilon+1)r$ です。有限個の中心と目盛の組合せしかないため、任意の精度で有限個の代表関数から一様近似できます。従ってこの族は $C(K)$ で全有界です。

さらに $K$ のLebesgue測度は有限です。一様ノルムによる有限近似は、そのまま $L^1(K)$ での有限近似にもなります。

任意の $\delta>0$ に対して $\varepsilon<\delta/(2M)$ を先に取れば、上の平滑化誤差は $\delta/2$ 未満です。固定半径の族は有限個の $L^1(K)$ 球（半径 $\delta/2$）で覆えるので、元の $u_j|_K$ も有限個の半径 $\delta$ の球で覆えます。したがって $\{u_j|_K\}$ は $L^1(K)$ で全有界です。$L^1(K)$ は完備なので、収束部分列を持ちます。

**(3) 対角部分列と変動。** $\Omega$ を尽くす $K_m\Subset\operatorname{int}K_{m+1}$ を取り、$K_1$ で収束する部分列、その中から $K_2$ で収束する部分列、という順に選びます。対角列はすべての $K_m$ 上で $L^1$ 収束し、制限の一致によって $u\in L^1_{\mathrm{loc}}(\Omega)$ を定めます。

任意の $U\Subset\Omega$ について $L^1(U)$ 収束があり、[GMT22の下半連続性](../GMT22/index.md#thm-gmt22-lsc)を領域 $U$ へ適用して

$$
V_U(u)\le\liminf_k V_U(u_{j_k})=\liminf_k|Du_{j_k}|(U)<\infty
$$

を得ます。したがって $u|_U\in BV(U)$ であり、[全変動測度の双対表示](../GMT21/index.md#thm-gmt21-variation-duality)から表示された不等式が従います。すべての $U\Subset\Omega$ に対して成り立つので $u\in BV_{\mathrm{loc}}(\Omega)$ です。$\square$
<!-- proof-end -->

### 何が保証されないか：領域全体からの質量逃避

$\Omega=\mathbb R$、$u_j=\chi_{(j,j+1)}$ とすると、すべての $j$ で $\|u_j\|_1=1$、$|Du_j|(\mathbb R)=2$ です。任意のコンパクト集合上では十分大きな $j$ で $u_j=0$ なので、列全体が $L^1_{\mathrm{loc}}$ で0へ収束します。しかし $\|u_j-0\|_{L^1(\mathbb R)}=1$ のままです。これは定理の仮定を満たしたまま**大域 $L^1$ コンパクト性の結論だけが壊れる**例です。

逆に $\Omega=(0,1)$ で $u_j\equiv j$ は $|Du_j|=0$ ですが $\|u_j\|_1=j$ なので、局所BV有界性のうち $L^1$ 制御を失います。どちらの反例も、定理の結論を無条件に強められない理由を示しています。

## 3. 「高さで切った集合」の周長

高さ $t$ に対する超水準集合を $E_t=\{x\in\Omega:u(x)>t\}$ と書きます。$u$ が滑らかなら、典型的な境界は $u=t$ という超曲面です。BVではジャンプもあるので、境界を単に点集合として扱う代わりに指示関数の分布微分で測ります。

ここでは次講のGauss–Green測度に進む前に、coareaに必要な**相対周長の数値**だけを導入します。$E$ が有限体積を持たない場合も定義できるよう、テスト場は $\Omega$ の内部にコンパクト台を持つものに限定します。

<a id="def-gmt23-relative-perimeter"></a>

<!-- formal-statement-start -->
> **定義（超水準集合の相対周長）**  
> 開集合 $A\subset\mathbb R^d$ とLebesgue可測集合 $E\subset\mathbb R^d$ に対し、$A$ に相対的な周長を次の拡張実数で定める。

$$
P(E;A)=\sup\left\{\int_{E\cap A}\operatorname{div}\varphi\,dx:
\varphi\in C_c^\infty(A;\mathbb R^d),\ |\varphi|\le1\right\}.
$$

> $P(E;A)<\infty$ なら、$E$ は $A$ において有限周長を持つという。$u:\Omega\to\mathbb R$ が可測なら、各 $t\in\mathbb R$ に対して $E_t=\{u>t\}$ と定め、$P(E_t;A)$ をその超水準集合の相対周長と呼ぶ（$A\subset\Omega$）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt23-relative-perimeter -->
### 直接例：区間内部にある二つの端

$A=(0,1)$、$E=(1/4,3/4)$ です。$\varphi\in C_c^\infty(A)$ に対し

$$
\int_E\varphi'(x)\,dx=\varphi(3/4)-\varphi(1/4)\le2
$$

となります。一方、二点の近くに互いに台の交わらない滑らかな小山を取り、$\varphi(3/4)=1$、$\varphi(1/4)=-1$、$|\varphi|\le1$ とできます。上限は2なので $P(E;A)=2$ です。

**定義の確認**：$E$ は可測、$A$ は開集合、テスト関数は両端を含む $A$ 内に台を持ちます。上界2とそれを実現する許容テスト関数を両方構成したので、周長の双対的定義を直接検証しました。$E=(0,1/2)$ に変えると $A$ の境界0は数えず $P(E;A)=1$ です。
<!-- definition-example-end -->

この周長は[GMT21の双対変動量](../GMT21/index.md#def-gmt21-bv)を指示関数に適用したものです。指示関数が $L^1(A)$ に属する場合、[GMT21のBV変動量と測度の一致](../GMT21/index.md#thm-gmt21-variation-duality)から

$$
P(E;A)=|D\chi_E|(A)
$$

が従います。一般の $E$ でも指示関数は局所可積分なので、局所的に同じ議論ができ、有限周長なら有限な測度値微分で表せます。例えば $E=A$ は、領域の体積が無限でも周長0です。

各 $t$ の周長を積分するには $t\mapsto P(E_t;A)$ の可測性が必要です。テスト場を台・成分とも可算な稠密族から選んでも双対上限は変わりません。各テスト場に対する

$$
t\longmapsto\int_A\chi_{\{u>t\}}\operatorname{div}\varphi\,dx
$$

はTonelliの定理で可測ですから、それらの可算上限である $P(E_t;A)$ も可測です。相対周長が無限となる高さがあっても、積分は非負拡張実数として意味を持ちます。

## 4. 滑らかな関数で二つのcoareaを接続する

[GMT14のEuclid coarea](../GMT14/index.md#thm-gmt14-coarea)は、$f:\mathbb R^d\to\mathbb R$ で左辺が $\int|\nabla f|$、右辺がレベル面のHausdorff測度を高さで積分する公式です。ただし本教材の[GMT10の正規化](../GMT10/index.md#lem-gmt10-hausdorff-normalization)では、$\mathcal H^{d-1}$ は一般に通常の面積の $c_{d-1}$ 倍であり

$$
c_{d-1}=\mathcal H^{d-1}([0,1]^{d-1}),\qquad c_0=1
$$

です。滑らかな領域の境界で分布微分を積分すると通常の面積が出るため、$1/c_{d-1}$ が必要です。

<a id="prop-gmt23-smooth-coarea"></a>

<!-- formal-statement-start -->
> **命題（滑らかな関数の周長coarea）**  
> $\Omega\subset\mathbb R^d$ は開集合、$v\in C^\infty(\Omega)\cap W^{1,1}(\Omega)$ とする。Lebesgueほとんどすべての高さ $t\in\mathbb R$ について、$E_t=\{v>t\}$ の相対周長は

$$
P(E_t;\Omega)=\frac{1}{c_{d-1}}
\mathcal H^{d-1}\bigl(\{x\in\Omega:v(x)=t\}\bigr)
$$

> であり、したがって

$$
\int_{\mathbb R}P(E_t;\Omega)\,dt
=\int_\Omega|\nabla v(x)|\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

レベル集合の面積を高さごとの関数 $f(t)$ と見て、[Euclid空間のcoarea formula](../GMT14/index.md#thm-gmt14-coarea)から $f\in L^1(\mathbb R)$ を得ます。滑らかな段差関数を合成した $v$ の近似を使うと、相対周長が $f(t)$ 以下であることをほとんどすべての高さで示せます。逆向きは指示関数を高さで積分する恒等式と双対変動量から導きます。こうすれば特別なレベル面の滑らかさを仮定せずに済みます。

<!-- proof-start -->
### 証明

$f(s)=c_{d-1}^{-1}\mathcal H^{d-1}(\{x\in\Omega:v(x)=s\})$ と置きます。$v$ は局所Lipschitzなので、$\Omega$ をコンパクトに尽くす領域で[Euclid空間のcoarea formula](../GMT14/index.md#thm-gmt14-coarea)を適用し、非負積分の単調収束を取れば

$$
\int_{\mathbb R}f(s)\,ds=\int_\Omega|\nabla v|\,dx<\infty
$$

です。従って $f\in L^1(\mathbb R)$ です。ここで非減少な滑らかな関数 $\Theta:\mathbb R\to[0,1]$ を $\Theta(z)=0$（$z\le-1$）、$\Theta(z)=1$（$z\ge1$）、$\Theta'\ge0$、$\int\Theta'=1$ を満たすように取ります。固定した高さ $t$ と $\varepsilon>0$ に対し

$$
w_{t,\varepsilon}(x)=\Theta\left(\frac{v(x)-t}{\varepsilon}\right)
$$

を作ると、連鎖律から

$$
|\nabla w_{t,\varepsilon}(x)|
=\varepsilon^{-1}\Theta'\left(\frac{v(x)-t}{\varepsilon}\right)|\nabla v(x)|.
$$

これを積分してcoareaに代入すると

$$
\begin{aligned}
\int_\Omega|\nabla w_{t,\varepsilon}|\,dx
&=\int_{\mathbb R}\varepsilon^{-1}
\Theta'\left(\frac{s-t}{\varepsilon}\right)f(s)\,ds\\
&=\int_{\mathbb R}\Theta'(z)f(t+\varepsilon z)\,dz.
\end{aligned}
$$

$\Theta'$ は非負・コンパクト台・積分1の近似恒等核です。[Lebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)の一変数版（または近似恒等核の収束）により、ほとんどすべての $t$ で右辺は $f(t)$ へ収束します。

また、ほとんどすべての高さでは、等位集合のLebesgue測度が0です。実際、各 $x$ について次の積分は0です。

$$
\int_{\mathbb R}\chi_{\{v(x)=t\}}\,dt=0.
$$

[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で点 $x$ についても積分すると、ほとんどすべての $t$ で $\mathcal L^d(\{v=t\})=0$ と分かります。そのような高さでは、平滑化した段差関数は指示関数へ各コンパクト集合上で $L^1$ 収束します。

相対周長の双対定義でテスト場との積分を極限に通し、滑らかな近似の勾配により上から抑えると

$$
P(E_t;\Omega)\le\liminf_{\varepsilon\downarrow0}
\int_\Omega|\nabla w_{t,\varepsilon}|\,dx=f(t)
$$

です。積分して $\int_{\mathbb R}P(E_t;\Omega)\,dt\le\int_\Omega|\nabla v|\,dx$ を得ます。

逆向きには、各 $s\in\mathbb R$ の恒等式

$$
s=\int_{\mathbb R}(\chi_{\{s>t\}}-\chi_{\{0>t\}})\,dt
$$

を $s=v(x)$ に適用します。任意の $|\varphi|\le1$ のコンパクト台テスト場について、$v\in L^1(\Omega)$ だからFubiniを使え、また $\int_\Omega\operatorname{div}\varphi=0$ なので

$$
\int_\Omega v\operatorname{div}\varphi\,dx
=\int_{\mathbb R}\int_{E_t}\operatorname{div}\varphi\,dx\,dt
\le\int_{\mathbb R}P(E_t;\Omega)\,dt.
$$

テスト場で上限を取り、[W11関数とBVの比較](../GMT21/index.md#prop-gmt21-w11-inclusion)を使うと $\int_\Omega|\nabla v|\,dx\le\int_{\mathbb R}P(E_t;\Omega)\,dt$ です。従って二つの積分は等しく、かつ $0\le P(E_t;\Omega)\le f(t)$ がa.e.で成り立つので、差 $f(t)-P(E_t;\Omega)$ は非負で積分0、すなわち $P(E_t;\Omega)=f(t)$ がa.e.で成立します。$d=1$ でも $c_0=1$ で同様です。$\square$
<!-- proof-end -->

### 例：一次元の傾き

$\Omega=(0,1)$、$v(x)=x$ なら、$0<t<1$ で $E_t=(t,1)$、$P(E_t;\Omega)=1$ です。$t\le0$ では $E_t=\Omega$、$t\ge1$ では $E_t=\varnothing$（端点の違いは周長に影響しません）なので、他の高さの周長は0です。したがって $\int_{\mathbb R}P(E_t;\Omega)\,dt=1=\int_0^1|v'|\,dx$。連続的な勾配の変動が、**毎高さに一つずつ現れる端点**として数えられました。

## 5. BVのcoarea：ジャンプも各高さで数える

BV関数には普通のレベル超曲面が存在しない場合があります。それでも超水準集合の[相対周長](#def-gmt23-relative-perimeter)は定義でき、[BVの滑らかなstrict近似](../GMT22/index.md#thm-gmt22-smooth-approx)と[全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)が、滑らかな公式をBVへ移す橋になります。

<a id="thm-gmt23-bv-coarea"></a>

<!-- formal-statement-start -->
> **定理（BVのcoarea公式）**  
> $\Omega\subset\mathbb R^d$ は開集合、$u\in BV(\Omega)$ とする。$E_t=\{x\in\Omega:u(x)>t\}$ とすると、Lebesgueほとんどすべての $t$ について $E_t$ は $\Omega$ において有限周長を持ち、

$$
|Du|(\Omega)=\int_{-\infty}^{\infty}P(E_t;\Omega)\,dt.
$$

> さらに任意の開集合 $A\subset\Omega$ に対して局所版も成立する。

$$
|Du|(A)=\int_{-\infty}^{\infty}P(E_t;A)\,dt.
$$

> 左辺は $u|_A$ の測度値分布微分の全変動である。$A$ の境界上の質量は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

二方向の不等式を別々に示します。

- **上からの評価**：smoothなstrict近似 $u_j$ を選び、各高さで $\chi_{\{u_j>t\}}\to\chi_{\{u>t\}}$ とする。相対周長の双対上限とFatouから $\int P(E_t)\le|Du|$。
- **下からの評価**：関数 $u$ を超水準集合の指示関数の積分（layer-cake）で表し、テスト場の発散と積分を交換する。双対上限から $|Du|\le\int P(E_t)$。

<!-- proof-start -->
### 証明

まず $A=\Omega$ で示します。

**(1) 滑らかな近似と上からの評価。** [BVの滑らかなstrict近似](../GMT22/index.md#thm-gmt22-smooth-approx)から $u_j\in C^\infty(\Omega)\cap W^{1,1}(\Omega)$ を選び、

$$
\|u_j-u\|_{L^1(\Omega)}\to0,\qquad
\int_\Omega|\nabla u_j|\,dx\to|Du|(\Omega)
$$

とできます。$E_{j,t}=\{u_j>t\}$ と置きます。実数 $a,b$ について $a>b$ の場合は $\chi_{\{a>t\}}-\chi_{\{b>t\}}$ が $t\in[b,a)$ だけ1、逆なら同じ長さだけ $-1$ なので、点ごとに

$$
\int_{\mathbb R}|\chi_{\{a>t\}}-\chi_{\{b>t\}}|\,dt=|a-b|.
$$

これを $a=u_j(x)$、$b=u(x)$ に適用し、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で $x,t$ を交換すると

$$
\int_{\mathbb R}\|\chi_{E_{j,t}}-\chi_{E_t}\|_{L^1(\Omega)}\,dt
=\|u_j-u\|_{L^1(\Omega)}\to0.
$$

必要なら $\sum_j\|u_j-u\|_1<\infty$ となる部分列を選び直します。このとき上式を $j$ について和し、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使えば、ほとんどすべての $t$ で

$$
\|\chi_{E_{j,t}}-\chi_{E_t}\|_{L^1(\Omega)}\to0
$$

です。指示関数は $\Omega$ 全体で $L^1$ に属さない場合がありますが、**その差**は $L^1$ で収束しており、[下半連続性の双対証明](../GMT22/index.md#thm-gmt22-lsc)にはこの差の収束だけで十分です。実際、任意のテスト場 $\varphi$ に対する発散積分の差は $\|\operatorname{div}\varphi\|_\infty\|\chi_{E_{j,t}}-\chi_{E_t}\|_1$ 以下です。従って

$$
P(E_t;\Omega)\le\liminf_j P(E_{j,t};\Omega)
$$

が各該当高さで成立します。[Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)と[滑らかな周長coarea](#prop-gmt23-smooth-coarea)から

$$
\begin{aligned}
\int_{\mathbb R}P(E_t;\Omega)\,dt
&\le\int_{\mathbb R}\liminf_j P(E_{j,t};\Omega)\,dt\\
&\le\liminf_j\int_{\mathbb R}P(E_{j,t};\Omega)\,dt\\
&=\liminf_j\int_\Omega|\nabla u_j|\,dx\\
&=|Du|(\Omega)<\infty.
\end{aligned}
$$

よってほとんどすべての高さで $P(E_t;\Omega)<\infty$ です。

**(2) layer-cakeと下からの評価。** 任意の有限実数 $s$ に対して、次の恒等式が成立します。

$$
s=\int_{\mathbb R}\bigl(\chi_{\{s>t\}}-\chi_{\{0>t\}}\bigr)\,dt.
$$

$s>0$ なら $(0,s)$ で被積分関数が1、$s<0$ なら $(s,0)$ で $-1$ となるので両場合を直接確認できます。$s=u(x)$ として、$|\operatorname{div}\varphi|$ を掛けた積分の絶対値は $\|\operatorname{div}\varphi\|_\infty\int_\Omega|u|\,dx<\infty$ に抑えられます。

$\varphi\in C_c^\infty(\Omega;\mathbb R^d)$、$|\varphi|\le1$ とすると $\int_\Omega\operatorname{div}\varphi\,dx=0$ です。したがってFubiniの定理を用い

$$
\begin{aligned}
\int_\Omega u\operatorname{div}\varphi\,dx
&=\int_{\mathbb R}\int_\Omega
(\chi_{E_t}-\chi_{\{0>t\}})\operatorname{div}\varphi\,dx\,dt\\
&=\int_{\mathbb R}\int_{E_t}\operatorname{div}\varphi\,dx\,dt\\
&\le\int_{\mathbb R}P(E_t;\Omega)\,dt.
\end{aligned}
$$

最後は[相対周長の定義](#def-gmt23-relative-perimeter)に同じ $\varphi$ を入力したものです。左辺について $|\varphi|\le1$ のすべてのテスト場で上限を取ると、[GMT21のBV変動量と測度の一致](../GMT21/index.md#thm-gmt21-variation-duality)より

$$
|Du|(\Omega)\le\int_{\mathbb R}P(E_t;\Omega)\,dt
$$

です。両不等式を合わせて公式が成立します。

**(3) 局所化。** 任意の開集合 $A\subset\Omega$ で $u|_A\in BV(A)$ です。ここまでの証明の領域を $\Omega$ から $A$ に置き換えると、$E_t\cap A$ の相対周長 $P(E_t;A)$ を使った式が得られます。$Du|_A=D(u|_A)$ なので左辺は $|Du|(A)$ です。$\square$
<!-- proof-end -->

### 例1：一つの区間ジャンプ

$\Omega=(0,1)$、$u=\chi_{(1/4,3/4)}$ です。テスト関数への積分から $Du=\delta_{1/4}-\delta_{3/4}$、従って $|Du|(\Omega)=2$ です。一方、$0\le t<1$ なら $E_t=(1/4,3/4)$ で[相対周長の直接計算](#def-gmt23-relative-perimeter)により $P(E_t;\Omega)=2$、それ以外の高さでは $E_t=\Omega$ または空集合で周長0です。したがって

$$
\int_{\mathbb R}P(E_t;\Omega)\,dt=\int_0^1 2\,dt=2.
$$

普通の勾配はa.e.で0ですが、coareaは二つのジャンプを失いません。

### 例2：勾配とジャンプが同時にある

$\Omega=(0,1)$ で $u(x)=x+\chi_{(1/2,1)}(x)$ とします。分布微分は $Du=dx+\delta_{1/2}$ で、両者は互いに特異なので

$$
|Du|(\Omega)=\int_0^1 1\,dx+1=2.
$$

$0<t<1/2$ では $E_t=(t,1)$、$1/2<t<3/2$ では $E_t=(1/2,1)$、$3/2<t<2$ では $E_t=(t-1,1)$ です。いずれも $\Omega$ 内に端点が一つあり周長1、その他の高さでは周長0です。ゆえに

$$
\int_{\mathbb R}P(E_t;\Omega)\,dt
=\tfrac12+1+\tfrac12=2.
$$

傾きの寄与1とジャンプの高さ幅1が、同じ超水準集合の言葉で足し合わされました。

### GMT14のcoareaとの違い

| 観点 | 滑らかな（GMT14の）coarea | BVのcoarea |
| --- | --- | --- |
| 入力 | Lipschitz写像や滑らかな関数 | $BV$ 関数 |
| 左辺 | Jacobian、特に $\int|\nabla v|$ | 測度値微分の総変動 $|Du|$ |
| 右辺 | 各レベルのHausdorff測度、正規化係数付き | 各超水準集合の**相対周長** |
| ジャンプ | 滑らかな入力には現れない | 高さの区間全体で周長として計上 |

したがって二つの公式は別物ですが、[滑らかな周長coarea](#prop-gmt23-smooth-coarea)が接続点です。次のGMT24では $P(E;A)$ をGauss–Green測度と結び付け、周長の大きさだけでなく**境界の向き**も扱います。

## 6. 演習：近似・コンパクト性・超水準集合を自力でつなぐ

### Level A：定義と具体的な値を確定する

<a id="ex-gmt23-a01"></a>
### GMT23-A01 動くジャンプと収束

- Level: A

$\Omega=(0,1)$、$u_j=\chi_{(a_j,1)}$、$a_j\in[1/4,3/4]$ とする。(1) $Du_j$ とBVノルムの上界を求め、(2) $a_{j_k}\to a$ のとき $L^1(\Omega)$ 収束を計算し、(3) 平行移動の積分を $0<h<1/8$ について求めよ（積分領域は $K=[1/8,7/8]$）。

<!-- solution-start -->
#### 詳細解答

コンパクト台の $\psi$ について

$$
-\int_\Omega u_j\psi'\,dx=-\int_{a_j}^1\psi'\,dx
=\psi(a_j),
$$

なので $Du_j=\delta_{a_j}$、$|Du_j|(\Omega)=1$ です。また $\|u_j\|_1=1-a_j\le3/4$ だからBVノルムは $7/4$ 以下です。

二つの指示関数が異なる区間は $a_j$ と $a$ の間だけなので、

$$
\|u_{j_k}-\chi_{(a,1)}\|_1=|a_{j_k}-a|\to0.
$$

$u_j(x+h)-u_j(x)$ は $(a_j-h,a_j)$ 上で1、それ以外は0です。この区間は指定した $K$ に含まれるので $\int_K|u_j(x+h)-u_j(x)|\,dx=h$ です。[局所平行移動評価](#lem-gmt23-translation)の右辺と一致します。
<!-- solution-end -->

<a id="ex-gmt23-a02"></a>
### GMT23-A02 変動だけを抑えても失敗する

- Level: A

$\Omega=(0,1)$、$v_j(x)=j$ とする。$|Dv_j|(\Omega)$ と $\|v_j\|_{L^1(\Omega)}$ を求め、[局所BV有界列](#def-gmt23-local-bv-bounded)のどの仮定を失うか示せ。また $L^1((1/4,3/4))$ 収束部分列の有無も判定せよ。

<!-- solution-start -->
#### 詳細解答

$v_j$ は定数なので、任意の $\psi\in C_c^\infty(\Omega)$ について

$$
\langle Dv_j,\psi\rangle=-j\int_0^1\psi'(x)\,dx=0.
$$

したがって $|Dv_j|(\Omega)=0$ です。しかし $\|v_j\|_1=j$、また内部の区間でも $\|v_j\|_{L^1(1/4,3/4)}=j/2$ です。任意の部分列でこのノルムは発散するので $L^1$ 収束部分列はありません。失われた仮定は関数値の局所 $L^1$ 有界性であり、変動の有界性ではありません。
<!-- solution-end -->

<a id="ex-gmt23-a03"></a>
### GMT23-A03 放物線の高さによる切断

- Level: A

$\Omega=(0,1)$、$u(x)=x^2$ とする。ほとんどすべての $t\in\mathbb R$ について $E_t=\{u>t\}$、$P(E_t;\Omega)$ を求め、[BV coarea](#thm-gmt23-bv-coarea)を検算せよ。

<!-- solution-start -->
#### 詳細解答

$0<t<1$ なら $x^2>t$ は $x>\sqrt t$ と同値なので $E_t=(\sqrt t,1)$ です。この集合には $\Omega$ 内部の端点が一つあり、[相対周長の定義](#def-gmt23-relative-perimeter)から $P(E_t;\Omega)=1$。$t<0$ では $E_t=\Omega$、$t\ge1$ では空集合で周長0です（$t=0$ の差も周長に影響しません）。よって

$$
\int_{\mathbb R}P(E_t;\Omega)\,dt=\int_0^1 1\,dt=1.
$$

$u'=2x\ge0$ なので、[W11とBVの比較](../GMT21/index.md#prop-gmt21-w11-inclusion)から $|Du|(\Omega)=\int_0^1 2x\,dx=[x^2]_0^1=1$ です。
<!-- solution-end -->

<a id="ex-gmt23-a04"></a>
### GMT23-A04 正方形内の垂直な境界

- Level: A

$\Omega=(0,1)^2$、$E=(0,1/2)\times(0,1)$ とする。$D\chi_E$ の二成分をテスト場から求め、$P(E;\Omega)$ を計算せよ。さらに $u=3\chi_E$ のcoarea右辺を求めよ。

<!-- solution-start -->
#### 詳細解答

$\varphi=(\varphi_1,\varphi_2)\in C_c^\infty(\Omega;\mathbb R^2)$ に対し、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で積分を分け、各座標の微分を端点で評価すると

$$
\begin{aligned}
-\int_E\operatorname{div}\varphi\,dx\,dy
&=-\int_0^1\left(\int_0^{1/2}\partial_x\varphi_1\,dx
+\int_0^{1/2}\partial_y\varphi_2\,dx\right)dy\\
&=-\int_0^1\varphi_1(1/2,y)\,dy.
\end{aligned}
$$

第2成分は $y=0,1$ で $\varphi_2=0$ なので消えます。従って $D\chi_E=(-\mathcal L^1\llcorner S,0)$（$S=\{1/2\}\times(0,1)$ の弧長測度）で、$P(E;\Omega)=1$ です。

$u=3\chi_E$ なら $0\le t<3$ で $E_t=E$、外側の高さでは $\Omega$ または空集合です。従って $\int_{\mathbb R}P(E_t;\Omega)\,dt=\int_0^3 1\,dt=3$。左辺も $|Du|(\Omega)=3|D\chi_E|(\Omega)=3$ です。
<!-- solution-end -->

<a id="ex-gmt23-a05"></a>
### GMT23-A05 相対境界と全空間の境界

- Level: A

$E=(0,1/2)$ とする。(1) $A=(0,1)$、(2) $A=\mathbb R$ で $P(E;A)$ をそれぞれ求めよ。違いが生じる理由も述べよ。

<!-- solution-start -->
#### 詳細解答

$A=(0,1)$ 内のテスト関数 $\varphi$ なら

$$
\int_E\varphi'\,dx=\varphi(1/2)-\varphi(0)=\varphi(1/2)
$$

です。絶対値は1以下で、$\varphi(1/2)=1$ とする許容関数を取れるので $P(E;(0,1))=1$。

全空間では $\int_E\varphi'=\varphi(1/2)-\varphi(0)$ となり、二つの点の近傍で値をそれぞれ1と $-1$ にできるので $P(E;\mathbb R)=2$ です。差は $0$ が最初の領域では**テスト場の台の外**にある一方、全空間では内部の端点として数えられることに由来します。
<!-- solution-end -->

### Level B：証明の手順と仮定を再構成する

<a id="ex-gmt23-b01"></a>
### GMT23-B01 平滑化から平行移動評価へ

- Level: B

$u\in BV(\Omega)$、$K+[0,h]\Subset U\Subset\Omega$ とする。[局所畳み込みと変動評価](../GMT22/index.md#prop-gmt22-local-convolution)を出発点とし、$\int_K|u(x+h)-u(x)|\,dx\le|h||Du|(U)$ を導け。途中の平行移動による積分領域の変化を省略しないこと。

<!-- solution-start -->
#### 詳細解答

$K+[0,h]\Subset W\Subset U$ を選び、$W+B(0,\varepsilon)\subset U$ となる $\varepsilon$ で $u_\varepsilon=u*\rho_\varepsilon$ を定めます。$x\in K$ で微分積分の基本定理と[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
|u_\varepsilon(x+h)-u_\varepsilon(x)|
\le|h|\int_0^1|\nabla u_\varepsilon(x+th)|\,dt.
$$

両辺を $K$ で積分した右辺について $y=x+th$ を代入すると、Jacobianは1で積分領域は $K+th$ になります。従って

$$
\begin{aligned}
\int_K|u_\varepsilon(x+h)-u_\varepsilon(x)|\,dx
&\le|h|\int_0^1\int_{K+th}|\nabla u_\varepsilon(y)|\,dy\,dt\\
&\le|h|\int_W|\nabla u_\varepsilon|\,dy\\
&\le|h|\,|Du|(W+B(0,\varepsilon))
\le|h|\,|Du|(U).
\end{aligned}
$$

最後は引用した局所畳み込みの変動評価です。$u_\varepsilon\to u$ が $K$ と $K+h$ の近傍で $L^1$ 収束するため、左辺も極限を取れます。この過程で $u$ の点ごとの微分可能性は使いません。
<!-- solution-end -->

<a id="ex-gmt23-b02"></a>
### GMT23-B02 高さごとの集合の $L^1$ 収束

- Level: B

$u_j,u\in L^1(\Omega)$、$u_j\to u$ が $L^1(\Omega)$ で成り立つとする。(1) $E_{j,t}=\{u_j>t\}$、$E_t=\{u>t\}$ について

$$
\int_{\mathbb R}\|\chi_{E_{j,t}}-\chi_{E_t}\|_{L^1(\Omega)}\,dt
=\|u_j-u\|_{L^1(\Omega)}
$$

を示せ。(2) 全列についての各高さ収束を無条件には主張せず、ほとんどすべての $t$ において $L^1$ 収束する**部分列**が存在することを示せ。

<!-- solution-start -->
#### 詳細解答

固定した $x$ で $a=u_j(x)$、$b=u(x)$ と書きます。例えば $a>b$ なら $\chi_{\{a>t\}}-\chi_{\{b>t\}}$ は $b\le t<a$ で1、それ以外では0です。$a<b$ でも絶対値が1の区間の長さは $b-a$ なので

$$
\int_{\mathbb R}|\chi_{\{a>t\}}-\chi_{\{b>t\}}|\,dt=|a-b|.
$$

非負関数に[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を適用し、$x$ と $t$ の積分順を交換して(1)を得ます。

(2)では $L^1$ 収束から、帰納的に $j_{k+1}>j_k$ かつ $\|u_{j_k}-u\|_1<2^{-k}$ となる部分列を選びます。(1)を $k$ で足すと

$$
\int_{\mathbb R}\sum_k
\|\chi_{E_{j_k,t}}-\chi_{E_t}\|_{L^1(\Omega)}\,dt
=\sum_k\|u_{j_k}-u\|_1<\infty.
$$

従ってほとんどすべての $t$ で非負項の級数が有限であり、その各項は0へ向かいます。これが主張です。各固定 $t$ について元の列全体が収束するとは、この議論からは言えません。
<!-- solution-end -->

<a id="ex-gmt23-b03"></a>
### GMT23-B03 下向きジャンプを持つ関数

- Level: B

$\Omega=(0,1)$、$u(x)=x-\chi_{(1/2,1)}(x)$ とする。

1. $Du$ と $|Du|(\Omega)$ を求めよ。
2. $-1/2<t<0$ および $0<t<1/2$ で $E_t$ を求め、相対周長を計算せよ。
3. [BVのcoarea公式](#thm-gmt23-bv-coarea)を確認せよ。

<!-- solution-start -->
#### 詳細解答

$x$ の分布微分は $dx$ で、$\chi_{(1/2,1)}$ の分布微分は $\delta_{1/2}$ です。したがって

$$
Du=dx-\delta_{1/2}.
$$

Lebesgue測度と一点のDirac測度は互いに特異なので、[ベクトル値測度の全変動](../GMT21/index.md#def-gmt21-vector-variation)から $|Du|(\Omega)=\int_0^1 1\,dx+1=2$ です。

$-1/2<t<0$ では左半区間の $x>t$ は常に成立し、右半区間では $x-1>t$、すなわち $x>1+t$ なので

$$
E_t=(0,1/2)\cup(1+t,1).
$$

$0<t<1/2$ では左半区間だけが残り

$$
E_t=(t,1/2).
$$

どちらも $\Omega$ の内部に相異なる端点が二つあり、$P(E_t;\Omega)=2$ です。$t<-1/2$ では $E_t=\Omega$、$t>1/2$ では空集合で周長0です。従って（端点の高さは積分に影響せず）

$$
\int_{\mathbb R}P(E_t;\Omega)\,dt
=\int_{-1/2}^0 2\,dt+\int_0^{1/2}2\,dt=1+1=2
$$

であり、計算した $|Du|(\Omega)$ と一致します。下向きジャンプでも周長は符号付きでなく絶対値として現れます。
<!-- solution-end -->

<a id="ex-gmt23-b04"></a>
### GMT23-B04 逃げる質量と局所・大域の区別

- Level: B

$\Omega=\mathbb R$、$u_j=\chi_{(j,j+1)}$ とする。

1. BVノルムを求めよ。
2. $u_j\to0$ が $L^1_{\mathrm{loc}}(\mathbb R)$ で成立することを示せ。
3. どの部分列も $L^1(\mathbb R)$ で収束できないことを証明せよ。

さらに、$\Omega=(0,1)$、$v_j=\chi_{(0,1/j)}$ の場合と全変動の極限を比較せよ。

<!-- solution-start -->
#### 詳細解答

$Du_j=\delta_j-\delta_{j+1}$ なので $\|u_j\|_1=1$、$|Du_j|(\mathbb R)=2$、BVノルムは3です。任意のコンパクト集合 $K\subset\mathbb R$ には上界 $R$ があるので、$j>R$ なら $u_j|_K=0$ です。従って $L^1_{\mathrm{loc}}$ では0へ収束します。

もし部分列 $u_{j_k}$ が大域 $L^1$ で $w$ に収束すれば、各コンパクト集合への制限から $w=0$ a.e.ですが、その一方で $\|u_{j_k}-0\|_{L^1(\mathbb R)}=1$ のままです。矛盾します。

$v_j$ では $\|v_j\|_{L^1(0,1)}=1/j\to0$ と大域でも収束しますが、[GMT22の境界質量流出例](../GMT22/index.md#thm-gmt22-lsc)の計算と同じく $Dv_j=-\delta_{1/j}$ で $|Dv_j|((0,1))=1$ のままです。最初は**関数の質量**が無限遠へ逃げ、後者は**変動測度の質量**が境界へ逃げます。二つの現象を区別する必要があります。
<!-- solution-end -->

### Level C：二つ以上の定理を連結する

<a id="ex-gmt23-c01"></a>
### GMT23-C01 固定支持の許容クラスで変動を最小化する

- Level: C

$\Omega\subset\mathbb R^d$ は開集合、$K\Subset\Omega$ はコンパクト集合とする。$v_0\in C_c^\infty(\Omega)$ が $\operatorname{supp}v_0\subset K$、$0\le v_0\le1$、$m=\int_\Omega v_0\,dx>0$ を満たすと仮定する。許容クラス

$$
\mathcal A=\{v\in BV(\Omega):0\le v\le1\ \mathrm{a.e.},\
\operatorname{supp}v\subset K\ \mathrm{a.e.},\
\int_\Omega v\,dx=m\}
$$

上で $\inf_{v\in\mathcal A}|Dv|(\Omega)$ が実現されることを示せ。支持条件を固定している理由と、局所コンパクト性だけから大域 $L^1$ 収束を得る箇所を明確にせよ。

<!-- solution-start -->
#### 詳細解答

$v_0\in\mathcal A$ なので許容クラスは空でなく、$v_0$ は滑らか・コンパクト台だから $\int|\nabla v_0|<\infty$ です。よって下限 $\alpha$ は有限非負です。$\mathcal A$ 内の最小化列 $v_j$ を

$$
|Dv_j|(\Omega)\le\alpha+1/j
$$

となるよう選びます。$v_j\ge0$ かつ $\int v_j=m$ なので $\|v_j\|_1=m$。従って $\sup_j(\|v_j\|_1+|Dv_j|(\Omega))<\infty$ です。

[BV局所コンパクト性](#thm-gmt23-compactness)により部分列と $v$ が存在し、$v_j\to v$ が $L^1_{\mathrm{loc}}(\Omega)$ で成り立ちます。$K\Subset\Omega$ を含む開集合 $U\Subset\Omega$ を一つ選ぶと、$\Omega\setminus K$ 上では全 $v_j=0$ a.e.です。従って局所収束先もそこでは0です。よって

$$
\|v_j-v\|_{L^1(\Omega)}
=\|v_j-v\|_{L^1(U)}
\int_{\Omega\setminus U}|v_j-v|\,dx
=\|v_j-v\|_{L^1(U)}\to0.
$$

最後の積分が0なのは $U$ の外で $v_j=v=0$ だからです。ここで初めて、局所収束が大域収束へ強まります。

$L^1$ 収束から $\int v=m$ が従います。また $v_j$ は $[0,1]$ の値しか取らないので、$v$ がその範囲を外れる量は $|v-v_j|$ 以下に抑えられ、積分すると0です。よって $0\le v\le1$ が成り立ち、支持も $K$ に含まれます。[全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)より

$$
|Dv|(\Omega)\le\liminf_j|Dv_j|(\Omega)=\alpha<\infty.
$$

したがって $v\in BV(\Omega)$、$v\in\mathcal A$ であり、$\alpha$ を実現します。固定支持の条件を外すと、無限領域では質量が逃げる[B04の例](#ex-gmt23-b04)があり、この大域収束の議論は使えません。
<!-- solution-end -->

<a id="ex-gmt23-c02"></a>
### GMT23-C02 BVコンパクト性から周長集合のコンパクト性へ

- Level: C

開集合 $\Omega\subset\mathbb R^d$ 上で $(u_j)$ が局所BV有界であるとする。[BV局所コンパクト性](#thm-gmt23-compactness)で得た部分列を再び $(u_j)$ と書き、$u_j\to u$ が $L^1_{\mathrm{loc}}(\Omega)$ であるとする。固定した開集合 $U\Subset\Omega$ に対し、さらに部分列を選べば、ほとんどすべての $t$ で

$$
\chi_{\{u_j>t\}}\to\chi_{\{u>t\}}\quad\text{in }L^1(U)
$$

となることを示せ。次に

$$
\int_{\mathbb R}P(\{u>t\};U)\,dt
\le\liminf_j|Du_j|(U)
$$

を（必要なら右辺のliminfを実現する部分列から）導け。BV coareaとFatouの使いどころ、指示関数が大域 $L^1$ に属さない場合の扱いを説明せよ。

<!-- solution-start -->
#### 詳細解答

$u_j\to u$ が $L^1(U)$ なので、まず $\liminf_j|Du_j|(U)$ を実現する部分列を選び、その中から $\sum_j\|u_j-u\|_{L^1(U)}<\infty$ となる部分列を選びます。前者の極限値は変わりません。

[B02の高さ積分恒等式](#ex-gmt23-b02)を $U$ へ適用すると

$$
\int_{\mathbb R}\sum_j
\|\chi_{\{u_j>t\}}-\chi_{\{u>t\}}\|_{L^1(U)}\,dt
=\sum_j\|u_j-u\|_{L^1(U)}<\infty.
$$

[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)によりほとんどすべての $t$ で級数が有限となるので、各項は0へ向かいます。指示関数の**差**は $L^1(U)$ なので、指示関数自身が大域 $L^1$ に入ることを要求していません。

その高さで、[相対周長の双対定義](#def-gmt23-relative-perimeter)に従い任意の $|\varphi|\le1$ に対して積分を極限へ通せます。従って

$$
P(\{u>t\};U)\le\liminf_jP(\{u_j>t\};U).
$$

非負関数に[Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)を使い、各 $u_j|_U\in BV(U)$ に対する[BV coarea](#thm-gmt23-bv-coarea)を適用すると

$$
\begin{aligned}
\int_{\mathbb R}P(\{u>t\};U)\,dt
&\le\int_{\mathbb R}\liminf_jP(\{u_j>t\};U)\,dt\\
&\le\liminf_j\int_{\mathbb R}P(\{u_j>t\};U)\,dt\\
&=\liminf_j|Du_j|(U).
\end{aligned}
$$

こうしてBV関数列の収束から、ほとんどすべての高さにおける有限周長集合の収束と、積分した周長の下半連続性の両方が得られます。個々の高さに対して全列の収束や周長値の等号までは結論できません。
<!-- solution-end -->

## 7. 次の講義への橋

局所BVコンパクト性は、境界が複雑な集合の列でも収束先を失わないための道具です。BV coareaは、そのような集合を関数の超水準集合として一括で扱えるようにします。次の **GMT24「有限周長集合とGauss--Green測度」**では、周長の数値 $P(E;A)$ に加えて $D\chi_E$ の向きと符号を調べ、滑らかな境界の外向き法線を測度論的な境界へ拡張します。
