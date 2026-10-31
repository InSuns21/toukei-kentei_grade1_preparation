# MICA6 分布の積

[MICA3の滑らかな係数との積](../MICA3/index.md#thm-mica3-smooth-multiplier)では、分布 $u$ に滑らかな関数 $a$ を掛ける操作を試験関数から定義できました。しかし二つとも特異な場合、$u(x)v(x)$ という点ごとの式は一般には意味を持ちません。例えばデルタ分布を滑らかな山で近似して二乗すると、その山の高さが発散します。一方、片側の周波数にだけ特異な分布どうしは、驚くほど自然に掛けられます。

どちらの現象も「同じ場所に特異性があるか」だけでは判定できません。必要なのは、[MICA5で座標不変にした波面集合](../MICA5/index.md#def-mica5-manifold-wavefront)の**余接方向**です。この章では二つの分布をまず独立した変数に配置し、対角線に沿う操作がなぜ逆向きの波面を警戒するのかを導き、局所Fourier畳み込みから積の存在と波面の評価を証明します。

以下は主に開集合 $\Omega\subset\mathbb R^n$ 上のスカラー分布です。Fourier変換は [MICA1の定義](../MICA1/index.md#def-mica1-local-fourier)と同じく

$$
\widehat f(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}f(x)\,dx,
\qquad
f(x)=(2\pi)^{-n}\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

で固定します。後者は適切な可積分性の下での反転式であり、分布では双対性を通じて使用します。$0_\Omega=\{(x,0):x\in\Omega\}$ と書き、$WF(u)$ には零余ベクトルを含めません。

## 1. 二つの場所を分けてから同じ場所へ戻す

滑らかな $f,g$ に対しては、まず独立な二点 $(x,y)$ の関数 $f(x)g(y)$ を作り、その後に $y=x$ と置けば $f(x)g(x)$ が得られます。分布でも第一段階は常に可能です。第二段階に初めて障害が現れます。

試験関数 $\Phi(x,y)\in C_c^\infty(\Omega\times\Omega)$ を固定すると、$y$ の分布 $v$ を作用させた関数

$$
x\longmapsto\langle v(y),\Phi(x,y)\rangle
$$

は滑らかでコンパクト支持です。$x$ 微分は $\langle v,\partial_x^\alpha\Phi\rangle$ になり、支持は $\Phi$ の $x$ 方向への射影に入るからです。従って、その関数へ $u$ を作用させられます。

<a id="def-mica6-tensor-product"></a>

<!-- formal-statement-start -->
> **定義（分布のテンソル積）**  
> $\Omega\subset\mathbb R^n$ を開集合、$u,v\in\mathcal D'(\Omega)$ とする。$\Omega\times\Omega$ 上の分布 $u\otimes v$ を、任意の $\Phi\in C_c^\infty(\Omega\times\Omega)$ に対し

$$
\langle u\otimes v,\Phi\rangle
=\left\langle u(x),\left\langle v(y),\Phi(x,y)\right\rangle\right\rangle
$$

> で定める。両変数の作用順を入れ替えても同じ分布になる。
<!-- formal-statement-end -->

最後の作用順の独立性は、$\Phi$ の台を有限個の箱へ分割し、各箱上で試験関数を有限和の $x$ と $y$ の積に試験関数位相で近似して確認できます。有限和 $\sum_j a_j(x)b_j(y)$ では両順序とも $\sum_j\langle u,a_j\rangle\langle v,b_j\rangle$ であり、分布の連続性で極限へ移れます。

<!-- definition-example-start: def-mica6-tensor-product -->
### 直接例：二つのデルタは別の変数なら掛けられる

**定義の確認**。試験関数への作用とその連続線形性、作用順序の独立性を確かめます。

$u=\delta_a$、$v=\delta_b$ のとき、定義を内側から評価すると

$$
\langle\delta_a\otimes\delta_b,\Phi\rangle
=\langle\delta_a(x),\Phi(x,b)\rangle
=\Phi(a,b).
$$

これは $(a,b)$ に集中する二変数のデルタ分布です。$\Phi$ に対して連続線形で、定義の両順序も同じ値を与えます。**別の変数に置いたデルタ同士には問題がありません**。二点を同一視する次の操作が問題です。
<!-- definition-example-end -->

対角写像 $\Delta:\Omega\to\Omega\times\Omega$ を $\Delta(x)=(x,x)$ とします。滑らかな $f,g$ では

$$
\Delta^*(f\otimes g)(x)=(f\otimes g)(x,x)=f(x)g(x).
$$

ここで $\Delta^*$ は通常関数の合成であり、**任意の分布に対する引き戻しを先に仮定した記号ではありません**。分布の対角制限を許す条件を、以下では直接構成します。

### 対角線が見ている余接方向

対角部分多様体 $D=\{(x,x):x\in\Omega\}$ の接ベクトルは $(h,h)$ です。[余法束の消滅条件](../MICA5/index.md#prop-mica5-conormal-coordinates)により、余ベクトル $(\xi,\eta)$ が接空間を消す条件は

$$
(\xi,\eta)(h,h)=\xi\cdot h+\eta\cdot h
=(\xi+\eta)\cdot h=0\quad (\forall h\in\mathbb R^n).
$$

従って $\xi+\eta=0$ であり、対角線の非零余法束は

$$
N^*D\setminus0
=\{(x,x;\xi,-\xi):x\in\Omega,\ \xi\ne0\}.
$$

つまり対角方向に制限しようとすると、**ちょうど逆向きの二つの周波数**が正面衝突します。例えば $(\xi,\eta)=(3,-3)$ は対角の接方向 $(1,1)$ を消しますが、$(3,2)$ は消しません。これは後の存在条件の座標的な根拠です。

## 2. テンソル積の波面と対角の衝突

一つの因子が滑らかでも、もう一つの因子が特異ならテンソル積は特異になり得ます。従って波面集合を単純な $WF(u)\times WF(v)$ だけにすると、片方の余ベクトルが零の方向を取り落とします。

<a id="prop-mica6-tensor-wavefront"></a>

<!-- formal-statement-start -->
> **命題（テンソル積の波面集合の包含）**  
> $u,v\in\mathcal D'(\Omega)$ とし、$\widetilde{WF}(w)=WF(w)\cup\{(x,0):x\in\operatorname{supp}w\}$ と置く。このとき

$$
WF(u\otimes v)
\subset\bigl(\widetilde{WF}(u)\times\widetilde{WF}(v)\bigr)
\setminus0_{\Omega\times\Omega}.
$$

> 右辺の直積は $(x,\xi;y,\eta)$ という余接成分ごとの直積である。
<!-- formal-statement-end -->

### 証明の見取り図

二点の近くでそれぞれの分布をcutoffで局所化すると、テンソル積のFourier変換は二つのFourier変換の積になります。両周波数成分が大きい方向では両方が特異でない限り急減少し、片方が小さい方向では他方が急減少すれば十分です。

<!-- proof-start -->
### 証明

点 $(x_0,y_0)$ の近くに台を持つ $\chi_1(x),\chi_2(y)$ を選び、$f=\chi_1u$、$g=\chi_2v$ と置きます。テンソル積の定義とFourier変換から

$$
\widehat{f\otimes g}(\xi,\eta)=\widehat f(\xi)\widehat g(\eta).
$$

[コンパクト支持分布の多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth)により、どちらの因子も高々多項式増大です。一方、波面に含まれない非零方向では[錐上の急減少](../MICA2/index.md#def-mica2-directional-regularity)が成立します。

右辺の集合にない非零方向 $(\xi_0,\eta_0)$ を固定します。$x_0$ または $y_0$ が対応する分布の台の外なら、近傍で $f=0$ または $g=0$ となり波面はありません。それ以外では、$(\xi_0,\eta_0)$ が右辺から外れるため、非零な方の成分 $\xi_0$ または $\eta_0$ の少なくとも一方で波面の規則方向を選べます。

例えば $\xi_0\ne0$ で $\xi_0$ が規則方向なら、$(\xi,\eta)$ が $(\xi_0,\eta_0)$ の十分狭い錐に属するとき $|\xi|\ge c|(\xi,\eta)|$ です。$\widehat f(\xi)$ は任意次数で急減少し、$\widehat g(\eta)$ の多項式増大を吸収できます。$\eta_0$ が規則方向の場合も変数を交換します。よって指定方向ではテンソル積の局所Fourier変換が急減少し、包含が従います。$\square$
<!-- proof-end -->

対角線上で $N^*D\setminus0$ に属する方向は $(\xi,-\xi)$ で両成分とも非零です。[テンソル積の包含](#prop-mica6-tensor-wavefront)と突き合わせると、この方向で障害となる候補は

$$
(x,\xi)\in WF(u),\qquad (x,-\xi)\in WF(v)
$$

という同一点の逆向きの組だけです。ただし「候補がない」ことから任意の引き戻し定理を無証明で使うのではなく、次節でFourier積分として存在を直接示します。

## 3. 非衝突条件から積を構成する

積の候補を周波数空間で見ると、滑らかなコンパクト支持関数に対する積のFourier公式

$$
\widehat{fg}(\zeta)
=(2\pi)^{-n}\int_{\mathbb R^n}
\widehat f(\eta)\widehat g(\zeta-\eta)\,d\eta
$$

が出発点です。分布では二つのFourier変換が多項式増大するので、この積分は自動的には収束しません。$|\eta|$ が大きく $\zeta$ が固定されると、$\eta$ と $\zeta-\eta$ はほぼ逆向きです。このとき少なくとも一方が急減少するなら、積分に意味が生まれます。

分布を滑らかに近似するときには、積分が $1$ の試験関数 $\rho\in C_c^\infty(\mathbb R^n)$ を選び、$\rho_\varepsilon(x)=\varepsilon^{-n}\rho(x/\varepsilon)$ を畳み込みます。$f*\rho_\varepsilon$ は滑らかな関数となり、$\varepsilon\downarrow0$ で $f$ に試験関数への作用の意味で近づきます。以下ではこの型の平滑化核（mollifier）を使います。Fourier側では畳み込みにより $\widehat\rho(\varepsilon\xi)$ が掛かり、固定周波数でこの因子は $1$ に近づきます。

<a id="lem-mica6-cone-separation"></a>

<!-- formal-statement-start -->
> **補題（非衝突方向の錐分離とFourier畳み込み）**  
> $f,g\in\mathcal D'(\mathbb R^n)$ をコンパクト支持分布とする。単位球面上の閉集合 $A,B$ が存在し、$WF(f)$ の全方向成分は $A$、$WF(g)$ の全方向成分は $B$ に入り、$A\cap(-B)=\varnothing$ とする。このとき

$$
F(\zeta)=(2\pi)^{-n}\int_{\mathbb R^n}
\widehat f(\eta)\widehat g(\zeta-\eta)\,d\eta
$$

> はすべての $\zeta\in\mathbb R^n$ で絶対収束し、$F$ は高々多項式増大する。さらに標準的なコンパクト支持mollifierで $f,g$ を平滑化した積のFourier変換は、$F$ に分布の意味で収束し、その極限はmollifierに依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

球面上の互いに離れた閉集合 $A$ と $-B$ の周りへ、なお衝突しない少し広い錐を取ります。$|\eta|$ が $|\zeta|$ より十分大きければ、$\eta$ と $\zeta-\eta$ は反対方向に近いため、必ず一方のFourier変換が急減少します。残りの有界な積分領域は多項式増大で制御します。

<!-- proof-start -->
### 証明

球面はコンパクトで、$A$ と $-B$ は交わらない閉集合です。[角距離の分離](../MICA2/index.md#lem-mica2-angular-separation)と同じ有限被覆の議論により、$A,B$ を含む開いた錐 $\Gamma_f,\Gamma_g$ を、球面上の閉包について

$$
\overline{\Gamma_f}\cap(-\overline{\Gamma_g})=\varnothing
$$

となるように取れます（空集合の場合も許します）。$f,g$ はコンパクト支持です。台を覆う有限個の小近傍で[波面集合の定義](../MICA3/index.md#def-mica3-wavefront)を使い、局所化を有限和にまとめると、各 $N$ に対して定数 $C_N,D_N$ が存在して

$$
|\widehat f(\eta)|\le C_N(1+|\eta|)^{-N}
\quad(\eta\notin\Gamma_f),
\qquad
|\widehat g(\theta)|\le D_N(1+|\theta|)^{-N}
\quad(\theta\notin\Gamma_g).
$$

他方、[分布のFourier多項式上界](../MICA1/index.md#prop-mica1-polynomial-growth)から、ある整数 $m\ge0$ と $C>0$ に対し両方とも $C(1+|\cdot|)^m$ で抑えられます。

$\zeta$ を固定して $|\eta|>2|\zeta|+1$ とすると、$|\zeta-\eta|\ge|\eta|/2$ で、両方向は $|\eta|\to\infty$ のとき互いに逆向きへ近づきます。錐の閉包の角距離には正の下界があるので、ある $R>2$ を選べば $|\eta|>R(1+|\zeta|)$ では $\eta\notin\Gamma_f$ または $\zeta-\eta\notin\Gamma_g$ です。急減少側に次数 $N$、もう一方に多項式上界を当てると

$$
|\widehat f(\eta)\widehat g(\zeta-\eta)|
\le C_N'(1+|\eta|)^{m-N}.
$$

$N>m+n$ なら右辺は $\eta$ で可積分です。$|\eta|\le R(1+|\zeta|)$ の有限領域では被積分関数を $C(1+|\zeta|)^{2m}$、積分領域の体積を $C_R(1+|\zeta|)^n$ で抑えられます。外側の積分も $N>m+n$ を固定すると高々多項式増大であり、$F$ の存在と多項式上界を得ます。

$\rho\in C_c^\infty(\mathbb R^n)$、$\int\rho=1$、$\rho_\varepsilon(x)=\varepsilon^{-n}\rho(x/\varepsilon)$ とし $f_\varepsilon=f*\rho_\varepsilon$、$g_\varepsilon=g*\rho_\varepsilon$ とします。平滑化した二関数には冒頭の積の畳み込み表示を使えるので、

$$
\widehat{f_\varepsilon g_\varepsilon}(\zeta)
=(2\pi)^{-n}\int\widehat f(\eta)\widehat g(\zeta-\eta)
\widehat\rho(\varepsilon\eta)
\widehat\rho(\varepsilon(\zeta-\eta))\,d\eta.
$$

$\widehat\rho$ は有界で各固定周波数では $\widehat\rho(\varepsilon\eta)\to1$ です。上記の可積分な上界を支配関数とする優収束で各 $\zeta$ における極限が $F(\zeta)$ になります。さらに全 $\zeta$ に一様な多項式上界はmollifier因子を入れても保たれるため、Schwartz試験関数を掛けて再度優収束でき、Fourier逆変換した分布が収束します。極限式に $\rho$ が残らないので選び方に依存しません。$\square$
<!-- proof-end -->

一般の $u,v$ はコンパクト支持とは限りません。しかし積を定めたい点 $x_0$ の近くでcutoff $\chi=1$ を取り、$f=\chi u$、$g=\chi v$ を考えれば補題を局所的に適用できます。

<a id="thm-mica6-product-existence"></a>

<!-- formal-statement-start -->
> **定理（Hörmanderの分布積の存在定理）**  
> $\Omega\subset\mathbb R^n$ を開集合、$u,v\in\mathcal D'(\Omega)$ とする。すべての $x\in\Omega$ と $\xi\in\mathbb R^n\setminus\{0\}$ に対し

$$
\neg\bigl((x,\xi)\in WF(u)
\ \text{かつ}\ (x,-\xi)\in WF(v)\bigr)
$$

> が成立するなら、$u,v$ を局所cutoffでコンパクト支持にしてmollifier平滑化した積の極限 $uv\in\mathcal D'(\Omega)$ が、平滑化方法によらず存在し、局所的に一意に貼り合わさる。滑らかな関数の積や滑らかな係数と分布の積と一致する。この条件が成立すれば積を構成できるが、積の存在に必要だとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

波面集合は閉集合なので、点 $x_0$ の上で逆向きの方向が交わらなければ、点の近くで生じ得る悪い方向を二つの衝突しない錐に収められます。cutoffを掛けた二分布へ[Fourier畳み込みの補題](#lem-mica6-cone-separation)を適用します。cutoffが違っても小さい近傍では平滑化の積が一致するので、局所的な極限を貼り合わせられます。

<!-- proof-start -->
### 証明

$x_0\in\Omega$ を固定します。$WF(u)$ と $WF(v)$ は[相対閉な錐集合](../MICA3/index.md#prop-mica3-closed-conic)です。球面切片

$$
A_0=\{\theta\in S^{n-1}:(x_0,\theta)\in WF(u)\},
\quad
B_0=\{\theta\in S^{n-1}:(x_0,\theta)\in WF(v)\}
$$

は閉集合で、仮定により $A_0\cap(-B_0)=\varnothing$ です。球面上の分離からこれらを含む閉じた近傍 $A,B$ を $A\cap(-B)=\varnothing$ のまま選べます。波面の閉性から、十分小さい相対コンパクト近傍 $V\ni x_0$ における全波面方向も $A,B$ に収まります。実際、これが不可能なら $x_j\to x_0$ と球面方向 $\theta_j\to\theta$ を取り、$(x_0,\theta)$ が $A$ または $B$ の外にある波面点を閉性によって得て矛盾します。

$\chi\in C_c^\infty(V)$ を $x_0$ の近くで $1$ に取り、$f=\chi u$、$g=\chi v$ とします。[滑らかな係数との積のWF非増大](../MICA3/index.md#thm-mica3-smooth-multiplier)により、$WF(f),WF(g)$ の方向も $A,B$ の中です。従って[非衝突方向の錐分離とFourier畳み込み](#lem-mica6-cone-separation)から $f_\varepsilon g_\varepsilon$ は分布として極限を持ちます。

別の $\chi'$ を $x_0$ の近くで $1$ にしても、$\chi u$ と $\chi'u$、$\chi v$ と $\chi'v$ は共通の近傍 $W$ で一致します。$\rho$ の台が有界なので、小さい $\varepsilon$ について $W$ より小さい閉近傍では平滑化された関数も一致します。よって極限分布は同じです。各点で作った極限が共通部分で一致するので、一つの分布 $uv$ に貼り合わさります。二つのmollifierを別々に選んでも補題の極限 $F$ は同じです。

滑らかな $a$ に対しては $(a*\rho_\varepsilon)$ の全微分が局所一様に $a$ の対応する微分へ収束します。従って $u_\varepsilon(a*\rho_\varepsilon)$ は試験関数への作用で $au$ に収束し、[既習の滑らかな係数との積](../MICA3/index.md#thm-mica3-smooth-multiplier)と一致します。滑らかな二関数については通常の積へ収束します。$\square$
<!-- proof-end -->

**対角引き戻しとの対応。** 滑らかな $u,v$ では既述のとおり $uv=\Delta^*(u\otimes v)$ です。一般の分布では、対角に集中する核 $\rho_\varepsilon(x-y)$ を試験関数へ掛けた作用

$$
\langle u\otimes v,\varphi(x)\rho_\varepsilon(x-y)\rangle
=\langle u,\varphi\,(v*\rho_\varepsilon)\rangle,
\qquad(v*\rho_\varepsilon)(x)=\langle v(y),\rho_\varepsilon(x-y)\rangle
$$

を考えると、定理の条件の下で先ほどのFourier支配収束により極限が $\langle uv,\varphi\rangle$ となります。ここでは $u$ を平滑化しない**片側平滑化**ですが、Fourier積分の一方にだけ有界な $\widehat\rho$ 因子を入れても同じ極限になるためです。従って、対角制限が存在する場合の意味を積から構成できました。一般の滑らかな写像に沿う引き戻しは次のMICA7で扱います。

## 4. 積の特異方向は三種類から生まれる

積 $uv$ の波面は単に二集合の和 $WF(u)\cup WF(v)$ に入るとは限りません。同じ点で二つの非零周波数 $\xi,\eta$ が加わった $\xi+\eta$ も現れ得ます。ただし、対角制限の条件のおかげでその和は零になりません。

<a id="thm-mica6-product-wavefront"></a>

<!-- formal-statement-start -->
> **定理（分布積の波面集合評価）**  
> $u,v\in\mathcal D'(\Omega)$ は[分布積の非衝突条件](#thm-mica6-product-existence)を満たすとする。同じ基点上での非零余ベクトルの和の集合を

$$
WF(u)\oplus WF(v)
=\{(x,\xi+\eta):(x,\xi)\in WF(u),
\ (x,\eta)\in WF(v)\}
$$

> と置く。このとき $\xi+\eta\ne0$ であり、

$$
WF(uv)\subset WF(u)\cup WF(v)\cup
\bigl(WF(u)\oplus WF(v)\bigr).
$$

> 右辺は一般に等号ではなく、上界である。
<!-- formal-statement-end -->

### 証明の見取り図

候補にない方向 $\zeta_0$ を取ります。Fourier畳み込みの積分を、$\eta$ が小さい領域、$\zeta-\eta$ が小さい領域、両方が大きい領域、そして遠方の尾部へ分けます。最初の二つは単独の波面がないこと、三つ目は和の方向がないこと、遠方は逆向き衝突がないことを使います。

<!-- proof-start -->
### 証明

$x_0$ の上で右辺に属さない $\zeta_0\ne0$ を選びます。球面方向の閉性と非衝突による角距離の下界を使い、$x_0$ に十分近いところの二因子の悪い方向を閉錐 $A,B$ に、$\zeta_0$ の方向を小さい開錐 $\Gamma$ に収めます。必要な分離は

$$
\overline\Gamma\cap A=\varnothing,
\quad\overline\Gamma\cap B=\varnothing,
\quad\overline\Gamma\cap(A+B)=\varnothing,
\quad A\cap(-B)=\varnothing
$$

です。$A+B$ の非零方向が閉であることも確認します。もし $\xi_j+\eta_j$ の長さが有界なのに $|\xi_j|+|\eta_j|\to\infty$ なら、正規化した部分列は $A$ と $-B$ の共通方向を持つはずで、最後の条件に矛盾します。従って球面上で分離できるのです。

$x_0$ 近くのcutoffを掛けた $f,g$ のFourier変換は、それぞれ $A,B$ の外で任意次数に急減少し、全域で高々多項式増大します。[積の存在のFourier公式](#lem-mica6-cone-separation)において $\zeta\in\Gamma$、$|\zeta|$ 大とします。小さい $c\in(0,1/4)$ を選び積分を次の領域へ分けます。

1. $|\eta|\le c|\zeta|$ では $\zeta-\eta$ の方向が $\Gamma$ に近く $B$ の外なので、$\widehat g$ が急減少します。
2. $|\zeta-\eta|\le c|\zeta|$ では $\eta$ が $\Gamma$ に近く $A$ の外なので、$\widehat f$ が急減少します。
3. 両方 $\ge c|\zeta|$、かつ $|\eta|\le R|\zeta|$ では、両方とも悪い錐に入るなら $\zeta=\eta+(\zeta-\eta)$ が $A+B$ に入ってしまいます。従って少なくとも一方の因子が大きい周波数で急減少します。
4. $|\eta|>R|\zeta|$ の尾部は、$\eta$ と $\zeta-\eta$ がほぼ反対方向になるため、[非衝突錐分離補題](#lem-mica6-cone-separation)と同じ評価で少なくとも一方が任意次数に急減少します。

**1–3の評価を数に直します。** 多項式増大の次数を $m$ とします。有限領域では $|\eta|,|\zeta-\eta|\le(R+1)|\zeta|$、急減少側の大きさは $\ge c|\zeta|$ なので、積分領域の体積 $O(|\zeta|^n)$ を含めても

$$
\int_{|\eta|\le R|\zeta|}
|\widehat f(\eta)\widehat g(\zeta-\eta)|\,d\eta
\le C_N(1+|\zeta|)^{n+m-N}.
$$

尾部では、$|\zeta|\ge1$ のとき

$$
\int_{R|\zeta|}^\infty r^{m-N+n-1}\,dr
=O(|\zeta|^{m+n-N})
$$

です。任意の目標次数 $L$ に対し $N>m+n+L$ を取れば、両領域を合わせて

$$
|\widehat{fg}(\zeta)|\le C_L(1+|\zeta|)^{-L}
\qquad(\zeta\in\Gamma)
$$

を得ます。これは $x_0,\zeta_0$ での[波面集合の定義](../MICA3/index.md#def-mica3-wavefront)による規則性です。よって右辺の外には $WF(uv)$ がなく、包含が示されます。$\square$
<!-- proof-end -->

この評価で三種類の方向の役割は異なります。一方が滑らかなら新しい方向は増えず、両方が特異なら和の方向も候補になります。しかし係数の消滅や相殺により候補方向が実際には現れないこともあります。

## 5. 成立する積と、十分条件が保証しない積

### 片側境界値は同じ側なら掛けられる

[MICA4の片側境界値](../MICA4/index.md#def-mica4-boundary-value)に従い、実数直線上で $u_+=(x+i0)^{-1}$、$u_-=(x-i0)^{-1}$ と書きます。[境界値の波面](../MICA4/index.md#thm-mica4-boundary-wf)は

$$
WF(u_+)=\{(0,\xi):\xi>0\},\qquad
WF(u_-)=\{(0,\xi):\xi<0\}.
$$

$u_+$ 同士なら正の方向二つが加わるだけで逆向き衝突はありません。一方 $u_+$ と $u_-$ では正・負の方向が衝突します。

<a id="prop-mica6-boundary-product"></a>

<!-- formal-statement-start -->
> **命題（同側境界値の積）**  
> $u_\pm=\lim_{\varepsilon\downarrow0}(x\pm i\varepsilon)^{-1}$ を $\mathcal D'(\mathbb R)$ の極限で定める。同じ符号同士はHörmander積として掛けられ、

$$
u_\pm u_\pm=(x\pm i0)^{-2}=-\partial_xu_\pm,
\qquad WF(u_\pm^2)\subset WF(u_\pm)
$$

> が成立する。異符号の組には非衝突十分条件を適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

各符号の波面は片側半直線なので同符号同士に衝突がありません。分布の微分 $\partial_x$ は連続であり、滑らかな近似関数では $(x\pm i\varepsilon)^{-2}=-\partial_x(x\pm i\varepsilon)^{-1}$ です。積がこの極限に一致することはFourier側でも確かめられます。

<!-- proof-start -->
### 証明

存在は[非衝突積の定理](#thm-mica6-product-existence)から従います。$u_+$ のFourier変換は[MICA4の境界値公式](../MICA4/index.md#prop-mica4-sokhotski)と $\widehat{\mathrm{pv}(1/x)}(\xi)=-i\pi\operatorname{sgn}(\xi)$ から

$$
\widehat{u_+}(\xi)=-2\pi i\,\mathbf1_{\{\xi>0\}}
$$

となります（$\xi=0$ の値は分布に影響しません）。同符号の畳み込みは各 $\zeta>0$ で $\eta\in(0,\zeta)$ にしか寄与せず、

$$
\widehat{u_+^2}(\zeta)
=(2\pi)^{-1}(-2\pi i)^2\int_0^\zeta d\eta
=-2\pi\zeta\,\mathbf1_{\{\zeta>0\}}.
$$

一方、[分布微分のFourier公式](../MICA1/index.md#prop-mica1-fourier-derivative)により、微分はFourier側で $i\zeta$ の乗算になるので

$$
\widehat{-\partial_xu_+}(\zeta)
=-i\zeta(-2\pi i)\mathbf1_{\{\zeta>0\}}
=-2\pi\zeta\mathbf1_{\{\zeta>0\}}
$$

となり一致します。負側についても $\widehat{u_-}(\zeta)=2\pi i\mathbf1_{\{\zeta<0\}}$ なので、$\zeta<0$ では畳み込みの積分区間が $\zeta<\eta<0$（長さ $-\zeta$）となり、

$$
\widehat{u_-^2}(\zeta)
=(2\pi)^{-1}(2\pi i)^2(-\zeta)\mathbf1_{\{\zeta<0\}}
=2\pi\zeta\mathbf1_{\{\zeta<0\}}
=\widehat{-\partial_xu_-}(\zeta).
$$

Fourier変換の一意性から両符号で主張の等式が成立します。[微分で波面が増えない定理](../MICA3/index.md#thm-mica3-derivative)で最後の包含も従います。$\square$
<!-- proof-end -->

このFourier計算は局所cutoffを省いた大域的なtempered分布としての検算です。実際の積の定義は前節の局所cutoffと平滑化によるもので、正周波数の畳み込みが一方向にしか広がらないことを反映しています。

### 十分条件が成立しない二つの違う例

まず $H$ を[Heaviside分布](../MICA4/index.md#def-mica4-heaviside)とします。$H$ は局所可積分な関数なので通常の関数積 $H^2=H$ が定める分布には意味があります。しかし[Heavisideの波面](../MICA4/index.md#thm-mica4-heaviside)には正負両方向があり、$WF(H)$ と $-WF(H)$ が衝突します。従って定理の仮定は不成立です。**仮定不成立は、積があらゆる意味で不可能だという必要条件の主張ではありません**。

対照的に $\delta_0$ を近似する $\rho_\varepsilon=\varepsilon^{-1}\rho(x/\varepsilon)$（$\rho\in C_c^\infty(\mathbb R)$、$\int\rho=1$、$\rho\not\equiv0$）の二乗を考えます。任意の試験関数 $\varphi$ に対し、$x=\varepsilon t$ と置換すれば

$$
\langle\rho_\varepsilon^2,\varphi\rangle
=\varepsilon^{-1}\int\rho(t)^2\varphi(\varepsilon t)\,dt
=\frac{\varphi(0)}{\varepsilon}\int\rho(t)^2\,dt+O(1).
$$

$\varphi(0)>0$ なら $\int\rho^2>0$ により発散します。ここでは自然なmollifier二乗が分布極限を持たず、定理の構成が失敗する機構を実際に見ました。ただし、別の正規化・延長操作で何かを定める可能性と、**元の分布だけから標準的な積が一意に決まること**は別問題です。

異符号境界値についても、同じ $\varepsilon$ を使った積は

$$
\frac1{x+i\varepsilon}\frac1{x-i\varepsilon}
=\frac1{x^2+\varepsilon^2},\qquad
\int\frac{\varphi(x)}{x^2+\varepsilon^2}\,dx
=\frac{\pi\varphi(0)}{\varepsilon}+O(1)
$$

と発散します。後式は $\varphi(x)=\varphi(0)+x\psi(x)$ を零付近で分解し、偶関数核に対する奇関数項の消滅と有界な残部を使って得ます。逆向きの特異方向を掛けるとFourier積分の遠方で急減少因子が保証されない、という証明上の障害と対応しています。

## 6. 交叉する特異集合の積

$\mathbb R^2$ で $u(x,y)=\delta(x)$ と $v(x,y)=H(y)$ を考えます。前者の波面方向は $x$ 軸方向、後者は $y$ 軸方向なので、原点でも互いに逆向きにはなりません。$u$ には[超平面デルタの波面](../MICA4/index.md#thm-mica4-hyperplane)を適用します。$v=H(y)$ は、[半空間Heavisideの波面](../MICA4/index.md#prop-mica4-halfspace)で扱った $H(x)$ の座標を $F(x,y)=(y,x)$ で交換したものです。座標基底 $e_x,e_y$ に対して $DF(e_x)=e_y$、$DF(e_y)=e_x$ なので、その行列は

$$
DF=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad (DF)^{-\mathsf T}=DF
$$

です。[波面集合の座標変換則](../MICA5/index.md#thm-mica5-coordinate-change)によって余接方向 $(\tau,0)$ も $(0,\tau)$ へ移るので、

$$
WF(u)|_{(0,0)}=\{(\xi,0):\xi\ne0\},\qquad
WF(v)|_{(0,0)}=\{(0,\eta):\eta\ne0\}.
$$

よって積は存在し、試験関数への作用で

$$
\langle uv,\varphi\rangle
=\int_0^\infty\varphi(0,y)\,dy
$$

と書けます。原点では和の方向 $(\xi,\eta)$（両成分非零）も候補になり、[積の波面評価](#thm-mica6-product-wavefront)の右辺は全非零方向を含みます。

実際、ここでは**すべて**の方向が残ります。$\chi(x,y)=a(x)b(y)$ を原点近くで $1$ とするcutoffとし、$a(0)=b(0)=1$、$b\ge0$ に取ります。積のFourier変換は

$$
\widehat{\chi uv}(\xi,\eta)
=\int_0^\infty e^{-iy\eta}b(y)\,dy
=\frac1{i\eta}+O(|\eta|^{-2})
\quad (|\eta|\to\infty).
$$

最後の展開は $y=0$ の境界項を取り出す一回の部分積分と、残った滑らかなコンパクト支持関数へのもう一回の部分積分によります。

$\eta_0\ne0$ の方向では $(\xi,\eta)=t(\xi_0,\eta_0)$ とすると $1/t$ しか減衰しません。

$\eta_0=0$ かつ $\xi_0\ne0$ の方向では、$b\ge0$ かつ $b=1$ が原点近傍で成り立つので、

$$
\widehat{bH}(0)=\int_0^\infty b(y)\,dy>0
$$

です。よって $(\xi,\eta)=(t\xi_0,0)$ に沿ってFourier変換が正の定数に等しく、急減少しません。

任意のcutoffで急減少が成り立つなら、[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)によりこの積型cutoffでも急減少するはずなので矛盾します。従って

$$
WF(\delta(x)H(y))|_{(0,0)}=\mathbb R^2\setminus\{(0,0)\}
$$

です。非衝突条件は**積が存在する**ことを保証しますが、積で新しい方向が生まれないことまでは保証しないのです。

## 7. 演習

### 演習 MICA6-A1：テンソル積を試験関数で確認

- Level: A
- 目安時間: 14分

$u=\delta_1$、$v=\delta_{-2}$ を $\mathbb R$ 上の分布とする。$\Phi(x,y)=a(x)b(y)$ に対する $u\otimes v$ の作用を計算し、$\Delta^*(u\otimes v)$ が一般には自動定義されない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

[テンソル積の定義](#def-mica6-tensor-product)から

$$
\langle u\otimes v,a(x)b(y)\rangle
=\langle\delta_1,a\rangle\langle\delta_{-2},b\rangle
=a(1)b(-2).
$$

これは二点 $(1,-2)$ に集中する分布です。$\Delta$ は $x=y$ という制限ですが、一般の分布は点上の値を持たないため、普通の関数のように $x=y$ を代入することはできません。今回の二つのデルタは互いに異なる場所に台があるので、非衝突条件を満たし、[積の定理](#thm-mica6-product-existence)により積は零分布として定義されます。しかしその結論を得るには位置と方向の条件確認が必要です。
<!-- solution-end -->

### 演習 MICA6-A2：対角線の余法束

- Level: A
- 目安時間: 15分

$\mathbb R^2$ 上の対角線 $D=\{(x,x):x\in\mathbb R\}$ に対し、接ベクトルを求め、余法束 $N^*D$ を計算せよ。$(2,-2)$ と $(2,2)$ のどちらが非零余法線か。

<!-- solution-start -->
#### 詳細解答

$x\mapsto(x,x)$ の導関数から接ベクトルは $(h,h)$、$h\in\mathbb R$ です。[余法束の定義](../MICA5/index.md#prop-mica5-conormal-coordinates)により、$(a,b)$ が余法線である条件は

$$
(a,b)\cdot(h,h)=(a+b)h=0\quad(\forall h)
\quad\Longleftrightarrow\quad a+b=0.
$$

従って $N^*D=\{(x,x;t,-t):x,t\in\mathbb R\}$ です。$(2,-2)$ は $2-2=0$ なので非零余法線、$(2,2)$ は $2+2=4\ne0$ なので余法線ではありません。
<!-- solution-end -->

### 演習 MICA6-A3：反対方向の衝突を見つける

- Level: A
- 目安時間: 16分

$u_+=(x+i0)^{-1}$、$u_-=(x-i0)^{-1}$ とする。[MICA4の境界値の波面](../MICA4/index.md#thm-mica4-boundary-wf)を使い、$(u_+,u_+)$、$(u_+,u_-)$ のそれぞれが非衝突十分条件を満たすか判定せよ。

<!-- solution-start -->
#### 詳細解答

$u_+$ の特異方向は原点上の $\xi>0$ のみ、$u_-$ は $\eta<0$ のみです。前者の組なら $\xi>0,\eta>0$ なので $\eta=-\xi$ は不可能です。従って[積の定理](#thm-mica6-product-existence)を適用できます。後者の組では任意の $\xi>0$ に対し $(0,\xi)\in WF(u_+)$、$(0,-\xi)\in WF(u_-)$ です。従って仮定不成立です。ただしこれは十分条件の失敗であり、任意の別操作まで否定する論証ではありません。
<!-- solution-end -->

### 演習 MICA6-A4：滑らかな係数を含む積

- Level: A
- 目安時間: 15分

$u=\delta_0$、$a(x)=2+x^2$ とする。$au$ を試験関数から求め、$WF(au)$ を求めよ。非衝突条件と[滑らかな係数との積](../MICA3/index.md#thm-mica3-smooth-multiplier)の結論が一致することを示せ。

<!-- solution-start -->
#### 詳細解答

$a$ は滑らかなので $WF(a)=\varnothing$ です。逆向き衝突を作る $WF(a)$ の方向はなく、積の定理を適用できます。試験関数 $\varphi$ への作用は

$$
\langle a\delta_0,\varphi\rangle
=\langle\delta_0,a\varphi\rangle
=a(0)\varphi(0)=2\varphi(0).
$$

よって $a\delta_0=2\delta_0$ です。$a(0)=2\ne0$ なので[滑らかな係数の非零点での波面等号](../MICA3/index.md#thm-mica3-smooth-multiplier)と[点デルタの波面](../MICA4/index.md#prop-mica4-point-delta)を適用して

$$
WF(a\delta_0)=\{(0,\xi):\xi\ne0\}.
$$

新しい積の構成は既習の積を変更していません。
<!-- solution-end -->

### 演習 MICA6-B1：デルタ平方の発散係数

- Level: B
- 目安時間: 26分

$\rho\in C_c^\infty(\mathbb R)$ を実数値、$\int\rho=1$ とし $\rho_\varepsilon(x)=\varepsilon^{-1}\rho(x/\varepsilon)$ とする。$\varphi\in C_c^\infty(\mathbb R)$ について $\langle\rho_\varepsilon^2,\varphi\rangle$ の主発散項を求めよ。$\rho$ の形を変えたときその係数は不変か。

<!-- solution-start -->
#### 詳細解答

$x=\varepsilon t$ で変数変換すると

$$
\begin{aligned}
\langle\rho_\varepsilon^2,\varphi\rangle
&=\int\varepsilon^{-2}\rho(x/\varepsilon)^2\varphi(x)\,dx\\
&=\varepsilon^{-1}\int\rho(t)^2\varphi(\varepsilon t)\,dt.
\end{aligned}
$$

$\varphi(\varepsilon t)-\varphi(0)=\int_0^{\varepsilon t}\varphi'(s)\,ds$ です。$\rho$ の台上では $|\varphi(\varepsilon t)-\varphi(0)|\le\varepsilon|t|\sup|\varphi'|$ であり、従って

$$
\langle\rho_\varepsilon^2,\varphi\rangle
=\varepsilon^{-1}\varphi(0)\int\rho(t)^2\,dt+O(1).
$$

$\int\rho^2>0$ なので $\varphi(0)\ne0$ なら発散します。$\int\rho=1$ は $\int\rho^2$ の値を固定しません。例えば $\rho_c(t)=c\rho(ct)$（$c>0$）なら積分1のまま $\int\rho_c^2=c\int\rho^2$ です。発散係数さえ平滑化の形によって変わるため、標準的な分布積が得られないことがよく分かります。
<!-- solution-end -->

### 演習 MICA6-B2：同側境界値の高次の積

- Level: B
- 目安時間: 27分

$u_+=(x+i0)^{-1}$ を考える。非衝突十分条件から $u_+^3$ が存在することを示し、$(x+i0)^{-3}=\tfrac12\partial_x^2u_+$ と一致することを導け。

<!-- solution-start -->
#### 詳細解答

[同側境界値の積](#prop-mica6-boundary-product)より $u_+^2=-\partial_xu_+$ で、その波面は[微分による非増大](../MICA3/index.md#thm-mica3-derivative)から正方向だけにあります。$u_+$ も正方向だけなので、$u_+^2$ と $u_+$ は逆向きに衝突せず、もう一度[積の存在定理](#thm-mica6-product-existence)を適用できます。

近似する滑らかな関数 $f_\varepsilon(x)=(x+i\varepsilon)^{-1}$ に対して

$$
f_\varepsilon'(x)=-(x+i\varepsilon)^{-2},
\qquad f_\varepsilon''(x)=2(x+i\varepsilon)^{-3}.
$$

$u_+=\lim_{\varepsilon\downarrow0}f_\varepsilon$ は試験関数への作用での極限です。分布の微分作用は連続なので $\tfrac12\partial_x^2u_+$ は $(x+i0)^{-3}$ です。またFourier側では $\widehat{u_+}$ が正の周波数だけに支持を持つため、三重畳み込みの積分領域は $0<\eta_1$、$0<\eta_2$、$\eta_1+\eta_2<\zeta$ という面積 $\zeta^2/2$ の三角形です。よって

$$
\widehat{u_+^3}(\zeta)
=(2\pi)^{-2}(-2\pi i)^3\frac{\zeta^2}{2}\mathbf1_{\{\zeta>0\}}
=i\pi\zeta^2\mathbf1_{\{\zeta>0\}}.
$$

一方 $\tfrac12\widehat{\partial_x^2u_+}=\tfrac12(i\zeta)^2(-2\pi i)\mathbf1_{\{\zeta>0\}}=i\pi\zeta^2\mathbf1_{\{\zeta>0\}}$ なので一致します。
<!-- solution-end -->

### 演習 MICA6-B3：二つの特異集合が交わっても掛けられる

- Level: B
- 目安時間: 29分

$\mathbb R^2$ 上で $u(x,y)=\delta(x)$、$v(x,y)=\delta(y)$ とする。各波面集合を求め、積 $uv$ が存在することを示せ。その作用と原点上の波面集合を求めよ。

<!-- solution-start -->
#### 詳細解答

[超平面デルタの波面](../MICA4/index.md#thm-mica4-hyperplane)によって

$$
WF(u)=\{(0,y;\xi,0):y\in\mathbb R,\xi\ne0\},
\quad
WF(v)=\{(x,0;0,\eta):x\in\mathbb R,\eta\ne0\}.
$$

同じ基点は原点だけですが、$(\xi,0)$ と $(0,\eta)$ は $\xi,\eta\ne0$ で逆向きにはなれません。[積の存在定理](#thm-mica6-product-existence)により積が定まり、分離した作用から

$$
\langle uv,\varphi\rangle=\varphi(0,0)
$$

です。すなわち二変数の点デルタ $\delta_{(0,0)}$ であり、[点デルタの波面](../MICA4/index.md#prop-mica4-point-delta)から

$$
WF(uv)=\{(0,0;\xi,\eta):(\xi,\eta)\ne(0,0)\}.
$$

積の波面上界の「二つの方向の和」が両成分非零の方向を実際に埋める例です。
<!-- solution-end -->

### 演習 MICA6-C1：交叉するデルタと段差の波面を完全決定

- Level: C
- 目安時間: 42分

$\mathbb R^2$ 上で $u(x,y)=\delta(x)$、$v(x,y)=H(y)$ とする。積 $w=uv$ について次を示せ。

1. 非衝突条件がすべての点で成立することを示し、$\langle w,\varphi\rangle$ を具体的な一変数積分で書け。
2. 原点以外の波面集合を完全に決定せよ。
3. 原点上の全非零方向が波面に含まれることを、Fourier変換とcutoffの任意性を踏まえて証明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 積の存在と作用。** [直線デルタの波面](../MICA4/index.md#thm-mica4-hyperplane)では特異方向は $(\xi,0)$ です。$H(y)$ については、[半空間段差の波面](../MICA4/index.md#prop-mica4-halfspace)の $H(x)$ を変数交換して、[波面集合の座標変換則](../MICA5/index.md#thm-mica5-coordinate-change)から $(0,\eta)$ が特異方向になります。両方の位置集合が交わる原点でも $\xi\ne0,\eta\ne0$ に対し $(\xi,0)=-(0,\eta)$ は不可能です。よって[積の存在定理](#thm-mica6-product-existence)が使えます。定義を平滑化してから試験関数で評価すると、境界 $y=0$ は測度零なので

$$
\langle w,\varphi\rangle=\int_{y>0}\varphi(0,y)\,dy.
$$

**2. 原点以外。** $x\ne0$ では $u=0$ なので $w=0$ です。$x=0,y>0$ なら $H(y)=1$ が局所的に成立し、$w=\delta(x)$ です。$x=0,y<0$ では $H(y)=0$ なので $w=0$ です。余接ベクトルの基点への射影を $\pi(x,y;\xi,\eta)=(x,y)$ と書くと、

$$
WF(w)\setminus\pi^{-1}(\{(0,0)\})
=\{(0,y;\xi,0):y>0,\xi\ne0\}
$$

です。

**3. 原点。** $a,b\in C_c^\infty(\mathbb R)$ をそれぞれ0の近くで1とし、さらに $b\ge0$ を選び、$\chi(x,y)=a(x)b(y)$ と置きます。作用から

$$
\widehat{\chi w}(\xi,\eta)
=\int_0^\infty b(y)e^{-iy\eta}\,dy.
$$

一回の部分積分で境界項 $b(0)/(i\eta)$ を取り出し、残りの $b'$ のFourier変換をもう一回部分積分して

$$
\widehat{\chi w}(\xi,\eta)=\frac1{i\eta}+O(|\eta|^{-2})
\quad(|\eta|\to\infty)
$$

です。$\eta_0\ne0$ の任意の方向では $(t\xi_0,t\eta_0)$ に代入すると $t^{-1}$ の非零主項が残り、急減少ではありません。$\eta_0=0,\xi_0\ne0$ のときは、非負の $b$ が原点の近くで1なので

$$
\widehat{\chi w}(t\xi_0,0)
=\widehat{bH}(0)
=\int_0^\infty b(y)\,dy>0
$$

がすべての $t>0$ で成立します。この周波数列は目的方向上にあり、Fourier変換は一定の正値なので急減少しません。

もし別のcutoffで目的方向に急減少があったなら、$\chi$ の台を十分小さくし直したときにも[cutoff縮小の定理](../MICA2/index.md#thm-mica2-cutoff-stability)で急減少するはずです。上の計算はどのように小さく取った積型cutoffでも成り立つので矛盾します。よって

$$
WF(w)|_{(0,0)}=\mathbb R^2\setminus\{(0,0)\}.
$$

これは[積の波面集合の評価](#thm-mica6-product-wavefront)に現れる和の方向が実際に必要であることの確認です。
<!-- solution-end -->

## 8. 何が分かったか

二つの分布は、まず別々の変数でテンソル積として組み立てられます。同じ点へ戻す際には対角線の余法線方向 $(\xi,-\xi)$ が障害になり、同一点で逆向きの波面が衝突しなければ積を構成できます。ただし逆向きに衝突したときの積を一律に否定するわけではありません。局所Fourier畳み込みは、非衝突なら遠方の積分を急減少で制御できることを具体的に示しました。

積の波面には元の二つの方向に加えて和の方向も現れ得ます。一方、条件不成立は必ずしも通常関数としての積の存在を否定しません。MICA7では対角線以外の滑らかな写像や部分多様体への制限へ、この「余法線との交差を調べる」という考え方を広げます。
