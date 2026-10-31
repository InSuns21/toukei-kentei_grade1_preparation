# MICA7 引き戻しと部分多様体への制限

[MICA6の分布積](../MICA6/index.md#thm-mica6-product-existence)では、二つの変数に置いた分布を対角線上へ戻す操作を考えました。滑らかな関数なら、より一般に写像 $f:X\to Y$ に沿って $u(f(x))$ と合成できます。しかし分布 $u$ は点ごとの値を持たないので、合成記号をそのまま分布に適用することはできません。

例えば $u=\delta_0$、$f(s,t)=s$ なら、元の一点に集中した分布を直線 $s=0$ に沿うデルタへ引き戻せそうです。反対に $u=\delta_0$、$f(t)=t^2$ とすると、形式的な $\delta(t^2)$ は原点で無限大の重みを要求します。二つを分けるのは、写像の微分が特異な余接方向を潰すかどうかです。

この章では、まず線形代数で判定できる条件を定義し、Fourier積分から引き戻しを実際に構成します。その後、曲線や曲面へ分布を戻す操作と対角線の例を調べます。波面による判定が成功すれば引き戻しを構成できますが、その判定が破れたからといって全ての分布的操作が不可能になるわけではありません。

以下はまず開集合 $X\subset\mathbb R^n$、$Y\subset\mathbb R^m$ と滑らかな写像 $f:X\to Y$ を舞台とします。Fourier変換は [MICA1の規約](../MICA1/index.md#def-mica1-local-fourier)に従い

$$
\widehat v(\eta)=\int e^{-iy\cdot\eta}v(y)\,dy,\qquad
v(y)=(2\pi)^{-m}\int e^{iy\cdot\eta}\widehat v(\eta)\,d\eta
$$

です。分布のFourier変換と反転はコンパクト支持化した分布に対して双対的に解釈します。$WF(u)$ には零余ベクトルを含みません。$df_x^{\mathsf T}$ は、$Y$ の余ベクトルを $X$ の余ベクトルへ移す転置微分です。

## 1. 写像が見失う余接方向

写像の微分 $df_x:T_xX\to T_{f(x)}Y$ に対し、余ベクトル $\eta$ の引き戻しは、接ベクトル $h$ へ

$$
({}^{\mathsf T}df_x\eta)(h)=\eta(df_xh)
$$

と作用します。座標では $Df_x$ が $m\times n$ 行列なので、その転置は $n\times m$ 行列です。この転置で零になる非零の $\eta$ は、$f$ の像に沿った微小な動きを全く検出できません。そこに $u$ の特異な周波数方向があると、合成のFourier積分で振動による相殺が期待できなくなります。

ここで $Df_x$ は $x$ に関する微分行列であり、${}^{\mathsf T}df_x\eta$ と $(Df_x)^{\mathsf T}\eta$ は同じ余ベクトルを表します。接ベクトルと余ベクトルを列ベクトルで表示すると、上の定義式は

$$
\eta(df_xh)=\eta^{\mathsf T}(Df_xh)
=\bigl((Df_x)^{\mathsf T}\eta\bigr)^{\mathsf T}h
$$

です。したがって行列の転置像が零かを計算することは、**全ての接方向 $h$ への作用が零か**という元の条件を判定することにほかなりません。また $\eta$ を固定して $x$ だけを微分すれば、連鎖律から

$$
\nabla_x(f(x)\cdot\eta)=(Df_x)^{\mathsf T}\eta
$$

です。後の非停留位相評価でも、この同じ転置像を使います。

この「写像によって消える余接方向」を、値域 $Y$ 上に記録します。英語の normal set という名は、[部分多様体の余法束](../MICA5/index.md#prop-mica5-conormal-coordinates)との類似を表しますが、一般の写像の像が部分多様体であるとは仮定しません。

<a id="def-mica7-normal-set"></a>

<!-- formal-statement-start -->
> **定義（写像のnormal set）**  
> $X\subset\mathbb R^n$、$Y\subset\mathbb R^m$ を開集合、$f:X\to Y$ を滑らかな写像とする。写像 $f$ のnormal setを、値域の非零余ベクトルの集合

$$
N_f=\left\{(f(x),\eta)\in T^*Y:
x\in X,\ \eta\ne0,\ {}^{\mathsf T}df_x\eta=0\right\}
$$

> と定める。$N_f$ と $WF(u)$ が交わらないとき、$u$ の波面は $f$ に対して**非特性的**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica7-normal-set -->
### 直接例：射影と二乗写像

**定義の確認**。転置の定義域と零条件を、具体的な行列で調べます。

射影 $p:\mathbb R^2\to\mathbb R$、$p(s,t)=s$ に対しては

$$
Dp_{(s,t)}=\begin{pmatrix}1&0\end{pmatrix},\qquad
{}^{\mathsf T}Dp_{(s,t)}\eta=(\eta,0).
$$

値域の余ベクトル $\eta$ が非零なら $(\eta,0)\ne0$ なので $N_p=\varnothing$ です。これは射影が全射微分を持つことの座標表示です。

一方 $q:\mathbb R\to\mathbb R$、$q(t)=t^2$ なら

$$
Dq_t=(2t),\qquad {}^{\mathsf T}Dq_t\eta=2t\eta.
$$

$\eta\ne0$ で転置像が零となるのは $t=0$ の場合だけです。その値域の基点も $q(0)=0$ なので

$$
N_q=\{(0,\eta):\eta\ne0\}.
$$

この例は「微分が零の点の**値**と、そこで失われる**方向**」の両方を記録する必要を示しています。
<!-- definition-example-end -->

### 埋め込み曲線では余法束になる

$i:\mathbb R\to\mathbb R^2$ を $i(s)=(s,s^2)$ とすると、接ベクトルは $(h,2sh)$ です。$(\alpha,\beta)$ の転置像は

$$
{}^{\mathsf T}di_s(\alpha,\beta)=\alpha+2s\beta.
$$

従って $N_i=\{(s,s^2;-2s\beta,\beta):\beta\ne0\}$ です。[MICA5の放物線の余法束の計算](../MICA5/index.md#prop-mica5-conormal-coordinates)で、接方向 $(1,2s)$ を消す方程式 $\alpha+2s\beta=0$ と一致します。一般の埋め込みでも同じ関係になります。

### 座標を変えても条件が変わらない理由

$X,Y$ の座標変換をそれぞれ微分同相とします。微分は連鎖律で可逆行列を左右から掛けた表示へ変わり、余ベクトルは [MICA5の逆転置の法則](../MICA5/index.md#thm-mica5-coordinate-change)で移ります。例えば値域の新座標を $z=G(y)$ とすれば $\eta_z=(DG_y)^{-\mathsf T}\eta_y$ で、

$$
{}^{\mathsf T}d(G\circ f)_x\eta_z
={}^{\mathsf T}df_x\,{}^{\mathsf T}dG_{f(x)}\eta_z
={}^{\mathsf T}df_x\eta_y.
$$

定義域の座標変更でこの式の左からさらに可逆転置行列が作用しても、零か非零かは不変です。従って $N_f$ と $WF(u)$ の交差条件は多様体でも意味を持ちます。

## 2. 波面と衝突しない方向では振動が消える

局所化した $u$ のFourier変換は、高々多項式増大ですが、[波面のない錐方向](../MICA2/index.md#def-mica2-directional-regularity)では急減少します。残る悪い方向で必要なのは、位相 $f(x)\cdot\eta$ が $x$ に関して停留しないことです。その勾配こそ $df_x^{\mathsf T}\eta$ です。

<a id="lem-mica7-noncharacteristic-phase"></a>

<!-- formal-statement-start -->
> **補題（非特性方向の一様非停留位相）**  
> $f:X\subset\mathbb R^n\to Y\subset\mathbb R^m$ を滑らか、$u\in\mathcal D'(Y)$ とし、$WF(u)\cap N_f=\varnothing$ を仮定する。任意の $x_0\in X$ の近くで、十分小さなコンパクト集合 $K\Subset X$ と、$f(K)$ の近傍で $1$ となる $\chi\in C_c^\infty(Y)$、球面上の閉集合 $A\subset S^{m-1}$ を選び、次を満たせる。
>
> 1. $\widehat{\chi u}(\eta)$ は $A$ の外の、$A$ から正の角距離を持つ各閉錐上で任意次数に急減少する。
> 2. $x\in K$、$\eta/|\eta|\in A$ に対し、ある $c>0$ で

$$
|{}^{\mathsf T}df_x\eta|\ge c|\eta|
$$

> が成り立つ。従って $a\in C_c^\infty(\operatorname{int}K)$ について任意の $N$ で

$$
\left|\int_X a(x)e^{if(x)\cdot\eta}\,dx\right|
\le C_{N,a}(1+|\eta|)^{-N}
\qquad(\eta/|\eta|\in A).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$WF(u)$ の方向は単位球面で閉集合になります。転置微分が零となる方向と交わらないので、両者の間に角度の余裕を作れます。悪い方向では位相を微分して部分積分し、悪くない方向では $u$ のFourier変換自体の減衰を使います。

<!-- proof-start -->
### 証明

$y_0=f(x_0)$ と置きます。[波面集合の閉錐性](../MICA3/index.md#prop-mica3-closed-conic)により

$$
B_0=\{\theta\in S^{m-1}:(y_0,\theta)\in WF(u)\}
$$

はコンパクトです。仮定より、各 $\theta\in B_0$ で $df_{x_0}^{\mathsf T}\theta\ne0$ です。連続関数 $\theta\mapsto|{}^{\mathsf T}df_{x_0}\theta|$ は $B_0$ 上で正の最小値を持ちます。$B_0$ が空なら $y_0$ 近傍で $u$ は滑らかであり、$A=\varnothing$ を取ればよいので、以下は $B_0\ne\varnothing$ の場合を考えます。

$B_0$ の十分小さい閉近傍 $A$ を球面上で選び、なお $|{}^{\mathsf T}df_{x_0}\theta|\ge2c$ とします。$df$ の連続性から $x_0$ の近傍 $W$ では $|{}^{\mathsf T}df_x\theta|\ge c$ が全ての $\theta\in A$ で成り立ちます。$f(\overline W)$ が十分小さいように $W$ を縮め、$y_0$ の周囲で $\chi=1$、$\operatorname{supp}\chi$ が十分小さくなるcutoffを選びます。

ここで $A$ の外側にある球面上の閉集合の各点について、$y_0$ 上の対応方向は $WF(u)$ に含まれません。[MICA2のcutoff安定性](../MICA2/index.md#thm-mica2-cutoff-stability)と球面の有限被覆により、$\chi$ の台を小さく選べば、その閉方向集合で $\widehat{\chi u}$ は任意次数に急減少します。これが第1項です。

$K\Subset W$ を内点に $x_0$ を含むように取り、$\eta=|\eta|\theta$ と書けば

$$
|\nabla_x(f(x)\cdot\eta)|
=|{}^{\mathsf T}df_x\eta|
=|\eta|\,|{}^{\mathsf T}df_x\theta|
\ge c|\eta|.
$$

$K$ 上の $f$ の任意階微分は有界で、位相の任意の正次数微分は $O(|\eta|)$ です。従って [MICA5の非停留位相の補題](../MICA5/index.md#lem-mica5-nonstationary-phase)を $\lambda=|\eta|$ として適用すれば、$|\eta|\ge1$ で任意の $N$ に対する減衰が出ます。$|\eta|\le1$ は $\|a\|_1$ で抑え、定数を増やせば結論となります。$\square$
<!-- proof-end -->

補題の $A$ は特異な周波数を包む閉じた角度集合であって、$WF(u)$ と同一である必要はありません。少し広く取ることで、一様な微分下界を確保しています。

## 3. 分布の引き戻しをFourier積分で構成する

滑らかな $v$ なら、$f^*v=v\circ f$ です。分布では $f^*u$ を最初から試験関数への作用として構成します。$x_0$ 近くの試験関数 $\varphi$ を固定し、$f(\operatorname{supp}\varphi)$ の近傍で $1$ となるcutoff $\chi$ を用います。形式的にFourier反転を書けば

$$
\int_X\varphi(x)\,u(f(x))\,dx
\ \sim\ (2\pi)^{-m}\int_{\mathbb R^m}
\widehat{\chi u}(\eta)
\left(\int_X \varphi(x)e^{if(x)\cdot\eta}\,dx\right)d\eta.
$$

右の積分が絶対収束することを示せれば、左辺に意味を与えられます。

<a id="thm-mica7-pullback"></a>

<!-- formal-statement-start -->
> **定理（分布の非特性的引き戻し）**  
> $X\subset\mathbb R^n$、$Y\subset\mathbb R^m$ を開集合、$f:X\to Y$ を滑らかな写像、$u\in\mathcal D'(Y)$ とする。[normal set](#def-mica7-normal-set)に対し

$$
WF(u)\cap N_f=\varnothing
$$

> と仮定する。このとき、局所的に $f^*u\in\mathcal D'(X)$ が構成でき、$u$ の局所cutoffと正規化mollifierによる平滑化 $u_\varepsilon$ の合成 $u_\varepsilon\circ f$ は分布として $f^*u$ に収束する。結果はこれらの選択によらず、滑らかな $u$ では通常の合成と一致する。構成は局所的に貼り合わさり、滑らかな多様体間の写像にも座標ごとに定まる。
>
> 仮定が成立すれば存在を保証するが、満たさないときの個別の極限の存在までは否定しない。
<!-- formal-statement-end -->

### 証明の見取り図

悪い錐では [非停留位相](#lem-mica7-noncharacteristic-phase)により内側の積分が急減少し、良い錐では [局所Fourierの急減少](../MICA2/index.md#def-mica2-directional-regularity)により外側の因子が急減少します。どちらでも他方の高々多項式の増大を吸収できるので、Fourier積分を定義として使用できます。局所平滑化してから極限を取ると、cutoffや平滑化核に依存しないことも確かめられます。

<!-- proof-start -->
### 証明

**局所構成。** $x_0\in X$ の周囲で[直前の補題](#lem-mica7-noncharacteristic-phase)の $K,\chi,A$ を選びます。$\varphi\in C_c^\infty(\operatorname{int}K)$ に対し

$$
I_\varphi(\eta)=\int_X\varphi(x)e^{if(x)\cdot\eta}\,dx
$$

と置きます。$\widehat{\chi u}$ は[コンパクト支持分布の多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth)により $|\widehat{\chi u}(\eta)|\le C(1+|\eta|)^M$ です。

$A$ をわずかに広げた角度集合 $A_1$ を取り、$A_1$ 上でも $|{}^{\mathsf T}df_x\eta|\ge(c/2)|\eta|$ とします。球面の滑らかな角度分割 $b_1+b_2=1$ を、$b_1$ は $A_1$ 内に支持を持ち $A$ 上で $1$、$b_2$ は $A$ から正の角距離を持つ方向に支持を持つように選びます。$|\eta|\ge1$ にこの分割を適用します。

$b_1$ の方向では非停留位相の評価から、任意の $N$ で $|I_\varphi(\eta)|\le C_{N,\varphi}(1+|\eta|)^{-N}$ です。$b_2$ の方向では $\widehat{\chi u}$ が任意次数に急減少し、$|I_\varphi|\le\|\varphi\|_{L^1}$ です。$N>M+m$ を選べば双方の積は $\mathbb R^m$ で可積分です。従って

$$
\langle f^*u,\varphi\rangle
=(2\pi)^{-m}\int_{\mathbb R^m}
\widehat{\chi u}(\eta)I_\varphi(\eta)\,d\eta
$$

で定められます。上記の評価定数は $\varphi$ の有限階の微分の上限で抑えられます。よって固定コンパクト集合上で

$$
|\langle f^*u,\varphi\rangle|
\le C_K\max_{|\alpha|\le N_K}\|\partial^\alpha\varphi\|_\infty
$$

となり、線形性と合わせて試験関数位相について連続、すなわち分布です。

**平滑化と選択からの独立。** $\rho\in C_c^\infty(\mathbb R^m)$、$\int\rho=1$ とし、$\rho_\varepsilon(y)=\varepsilon^{-m}\rho(y/\varepsilon)$、$w_\varepsilon=(\chi u)*\rho_\varepsilon$ とします。これは滑らかで、Fourier変換は

$$
\widehat{w_\varepsilon}(\eta)
=\widehat{\chi u}(\eta)\widehat\rho(\varepsilon\eta)
$$

です。[FOU3のFourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)を適用し、絶対収束を確認して

$$
\langle w_\varepsilon\circ f,\varphi\rangle
=(2\pi)^{-m}\int
\widehat{\chi u}(\eta)\widehat\rho(\varepsilon\eta)
I_\varphi(\eta)\,d\eta
$$

となります。$\widehat\rho$ は有界で、各 $\eta$ に対し $\widehat\rho(\varepsilon\eta)\to1$ です。既に示した可積分上界に有界因子を掛けられるので、[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)によって定義式へ収束します。極限に $\rho$ は残りません。

別のcutoff $\chi'$ を取ると、$\chi u$ と $\chi'u$ は $f(\operatorname{supp}\varphi)$ のある近傍で一致します。コンパクト支持の $\rho$ を使えば、小さい $\varepsilon$ では両者の畳み込みがその近傍のより小さい領域で一致し、$\varphi$ の台上で合成値が一致します。従って極限も同じです。共通の小近傍の各構成は一致し、試験関数の分割によって $X$ 全体へ貼り合わさります。

**通常の合成と座標。** $u$ が滑らかな関数なら、上のFourier反転は $u(f(x))$ を返すので通常の合成と一致します。

座標を変えた平滑化は一般に元の座標での畳み込みそのものではありません。そこで上の極限が成り立つために実際に使った性質を抜き出します。近似族 $w_\varepsilon$ について、局所cutoff後のFourier変換が各固定周波数で $\widehat{\chi u}$ へ収束し、全方向で一様な多項式上界、規則的な閉錐では全次数の一様急減少上界を持てば十分です。実際、$A_1$ 内では振動積分の減衰と多項式上界を、補集合では近似族の急減少を掛けるので、同じ可積分な支配関数が使えます。

座標変換 $y'=G(y)$ の下で、分布の係数と試験密度のJacobian因子は [MICA5の分布座標移送](../MICA5/index.md#def-mica5-coordinate-pushforward)に従います。[MICA5の座標変換則の証明](../MICA5/index.md#thm-mica5-coordinate-change)を近似族に適用すると、そこでの非停留位相評価は一様なFourier上界だけに依存するため、この三つの性質も変換後の規則錐で保たれます。従って二つの座標で作った平滑化の合成は共に同じ局所Fourier積分へ収束し、極限は一致します。定義域の座標変更では試験密度の通常の変数変換を行えばよいので、滑らかな多様体上にも貼り合わせられます。$\square$
<!-- proof-end -->

特に **$df_x$ が全射である写像（沈め込み）**なら、転置は単射なので $N_f=\varnothing$ です。従って任意の分布を引き戻せます。例えば射影 $p(s,t)=s$ では

$$
\langle p^*\delta_0,\varphi\rangle
=\int_{\mathbb R}\varphi(0,t)\,dt.
$$

これは $\mathbb R^2$ の直線 $s=0$ に集中する分布です。一般の写像では、このような簡単な積分公式が最初からあるとは限りません。

## 4. 引き戻した後の特異方向

引き戻しが存在するだけでなく、どの方向へ特異性が移るかを知りたいところです。滑らかな関数の合成の連鎖律から推測すると、値域の余ベクトル $\eta$ は転置微分 ${}^{\mathsf T}df_x\eta$ へ移ります。一般の分布でも、これが波面の**上界**となります。

<a id="thm-mica7-pullback-wavefront"></a>

<!-- formal-statement-start -->
> **定理（引き戻しの波面集合評価）**  
> $f:X\subset\mathbb R^n\to Y\subset\mathbb R^m$ は滑らか、$u\in\mathcal D'(Y)$ は $WF(u)\cap N_f=\varnothing$ を満たすとする。[引き戻し](#thm-mica7-pullback)に対して

$$
WF(f^*u)\subset
\left\{(x,{}^{\mathsf T}df_x\eta):
(f(x),\eta)\in WF(u)\right\}.
$$

> 右辺の余ベクトルは仮定によって非零である。一般に包含は等号とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

引き戻しの局所Fourier変換では、位相が $f(x)\cdot\eta-x\cdot\xi$ になります。停留するなら $\xi={}^{\mathsf T}df_x\eta$ です。そのような組が存在しない方向 $\xi$ では、悪い $\eta$ で非停留位相を使い、良い $\eta$ では $u$ 自身の急減少を使うことで、Fourier変換が全次数急減少します。

<!-- proof-start -->
### 証明

右辺に属さない $(x_0,\xi_0)$、$\xi_0\ne0$ を固定します。$x_0$ の小近傍でcutoff $a=1$ を取り、[引き戻しのFourier式](#thm-mica7-pullback)へ試験関数 $a(x)e^{-ix\cdot\xi}$ を代入すると

$$
\widehat{a f^*u}(\xi)
=(2\pi)^{-m}\int_{\mathbb R^m}
\widehat{\chi u}(\eta)J(\xi,\eta)\,d\eta,
$$

$$
J(\xi,\eta)=\int_X a(x)
e^{i(f(x)\cdot\eta-x\cdot\xi)}\,dx.
$$

ここでも $A_1$ を $u$ の悪い周波数の閉錐をわずかに広げたもの、残りを良い錐として分割します。$(x_0,\xi_0)$ が右辺の外にあり、$WF(u)$ は閉錐で、非特性条件も成り立つので、$a$ の台と $\xi_0$ の周囲の開錐 $\Gamma$ を小さくすれば、$\eta$ が悪い錐に属する場合

$$
|{}^{\mathsf T}df_x\eta-\xi|
\ge c(|\eta|+|\xi|)
\quad(x\in\operatorname{supp}a,\ \xi\in\Gamma)
$$

とできます。実際、この下界を破る列があれば $|\eta|+|\xi|$ で正規化し、球面のコンパクト性と閉性を使って極限を取れます。非特性条件により $\eta$ だけが無限大で $\xi$ が相対的に零になる場合は除外され、残る極限は $\xi={}^{\mathsf T}df_{x_0}\eta$ を与え、右辺の外という選び方に反します。

位相の $x$ 勾配が ${}^{\mathsf T}df_x\eta-\xi$ であり、高階微分も $O(|\xi|+|\eta|)$ なので、[非停留位相評価](../MICA5/index.md#lem-mica5-nonstationary-phase)から

$$
|J(\xi,\eta)|\le C_N(1+|\xi|+|\eta|)^{-N}
$$

を得ます。$|\widehat{\chi u}(\eta)|\le C(1+|\eta|)^M$ を掛けて積分すると、$N>M+m+L$ のとき悪い錐の寄与は $O((1+|\xi|)^{-L})$ です。

良い錐では $\widehat{\chi u}(\eta)$ 自体が任意次数で急減少します。$|\eta|\ge\varepsilon|\xi|$ の領域は、$|J|\le\|a\|_1$ とFourierの急減少から、任意の $L$ で $O((1+|\xi|)^{-L})$ です。一方 $|\eta|<\varepsilon|\xi|$ では $\varepsilon>0$ を $df$ の一様上界に比べ十分小さくすると

$$
|{}^{\mathsf T}df_x\eta-\xi|\ge\tfrac12|\xi|
$$

となり、同じ非停留位相評価から $|J|\le C_N(1+|\xi|)^{-N}$ が得られます。良い錐では $\widehat{\chi u}$ が可積分なので、この領域の積分も任意次数に減衰します。低周波数 $|\eta|\le1$ は後者に含めます。

従って $\xi\in\Gamma$ で $\widehat{a f^*u}(\xi)$ は任意次数急減少し、[波面集合の定義](../MICA3/index.md#def-mica3-wavefront)より $(x_0,\xi_0)\notin WF(f^*u)$ です。$\square$
<!-- proof-end -->

射影 $p(s,t)=s$ と $u=\delta_0$ の例では、[点デルタの波面](../MICA4/index.md#prop-mica4-point-delta)の $(0,\eta)$ は $(s,t; \eta,0)$ へ移ります。[部分多様体デルタの波面](../MICA5/index.md#thm-mica5-submanifold-delta)から実際にも

$$
WF(p^*\delta_0)=\{(0,t;\eta,0):t\in\mathbb R,\ \eta\ne0\}
$$

となり、上界と一致します。対して係数が消える場合などには包含が真に狭くなり得ます。上界の証明が保証するのは、**新しい特異方向は転置微分の像以外に現れない**ということです。

## 5. 部分多様体への制限

$S\subset M$ が埋め込み部分多様体で、包含写像を $i:S\hookrightarrow M$ とします。滑らかな関数の $S$ への制限は $i^*v=v|_S$ です。分布の制限を許すには、$S$ に接する方向を全て消す余ベクトル、すなわち [余法束](../MICA5/index.md#prop-mica5-conormal-coordinates)に波面がないことを確かめます。

<a id="cor-mica7-submanifold-restriction"></a>

<!-- formal-statement-start -->
> **系（部分多様体への制限）**  
> $M$ を滑らかな多様体、$S\subset M$ を滑らかな埋め込み部分多様体、$i:S\hookrightarrow M$ を包含写像、$u\in\mathcal D'(M)$ とする。$N^*S$ を $S$ の余法束、$0_M$ を零切断とする。もし

$$
WF(u)\cap(N^*S\setminus0_M)=\varnothing
$$

> なら $u|_S=i^*u\in\mathcal D'(S)$ が定義でき、その波面について

$$
WF(u|_S)\subset
\{(s,i_s^*\eta):(i(s),\eta)\in WF(u)\}
$$

> が成り立つ。ただし $i_s^*\eta=\eta|_{T_sS}$ は接空間への余ベクトルの制限であり、右辺では零にならない。
<!-- formal-statement-end -->

### 証明の見取り図

適合座標では $S=\{z=0\}$ です。包含の微分は接ベクトル $(h,0)$ をそのまま入れる写像で、その転置は $(\sigma,\zeta)\mapsto\sigma$ です。よってnormal setは $\sigma=0$、つまり余法束そのものです。

<!-- proof-start -->
### 証明

$s\in S$ に対し、[適合座標と余法束](../MICA5/index.md#prop-mica5-conormal-coordinates)により $M$ の局所座標を $(s,z)\in\mathbb R^k\times\mathbb R^{n-k}$、$S=\{z=0\}$ とできます。包含は $i(s)=(s,0)$ で

$$
di_s(h)=(h,0),\qquad
{}^{\mathsf T}di_s(\sigma,\zeta)=\sigma.
$$

したがって ${}^{\mathsf T}di_s(\sigma,\zeta)=0$ の条件は $\sigma=0$ であり、非零の $(0,\zeta)$ 全体が $N_i=N^*S\setminus0_M$ をなします。系の仮定は[引き戻し定理](#thm-mica7-pullback)の仮定と一致し、存在が従います。さらに[波面上界](#thm-mica7-pullback-wavefront)へ ${}^{\mathsf T}di_s$ を代入すると表示式を得ます。各座標での構成は[波面集合の座標不変性](../MICA5/index.md#thm-mica5-coordinate-change)と引き戻しの局所性で一致します。$\square$
<!-- proof-end -->

### 成功例：横に特異な分布を縦に切る

$M=\mathbb R^2$ の座標を $(s,z)$、$S=\{z=0\}$ とします。$u(s,z)=\delta(s)$ は直線 $s=0$ に沿うデルタで、

$$
WF(u)=\{(0,z;\sigma,0):z\in\mathbb R,\ \sigma\ne0\}.
$$

一方 $N^*S\setminus0=\{(s,0;0,\zeta):\zeta\ne0\}$ です。両者はどの点でも交わらないので制限可能です。$u$ を $s$ 方向へ平滑化してから $z=0$ と置き、試験関数 $\psi(s)$ に作用させると

$$
\langle u|_S,\psi\rangle
=\lim_{\varepsilon\to0}\int\rho_\varepsilon(s)\psi(s)\,ds
=\psi(0).
$$

従って $u|_S=\delta_0$ です。波面の転置像も $(\sigma,0)\mapsto\sigma$ で、非零方向を保ちます。

### 失敗例：分布が制限面そのものに集中する

同じ $S=\{z=0\}$ に $v(s,z)=\delta(z)$ を置くと、$WF(v)=N^*S\setminus0$ です。[余法束による判定](#cor-mica7-submanifold-restriction)は成立しません。非負の正規化mollifierで $z$ 方向だけを平滑化して $v_\varepsilon(s,z)=\rho_\varepsilon(z)$ とすれば

$$
\langle v_\varepsilon|_S,\psi\rangle
=\rho_\varepsilon(0)\int\psi(s)\,ds
=\varepsilon^{-1}\rho(0)\int\psi(s)\,ds.
$$

$\rho(0)>0$、$\int\psi\ne0$ を選ぶと発散します。消滅するのはまさに $z$ 方向の振動であり、位相の非停留性を失ったためです。この計算は、波面条件が単なる技術的飾りではないことを示します。

## 6. 対角引き戻しと二分布の積

多様体 $M$ の対角写像 $\Delta:M\to M\times M$ を $\Delta(x)=(x,x)$ とします。局所座標で接ベクトル $h$ は $(h,h)$ へ移るため、その転置は

$$
{}^{\mathsf T}d\Delta_x(\xi,\eta)=\xi+\eta.
$$

非零の $(\xi,\eta)$ が零へ移る条件は $\eta=-\xi$ です。従って

$$
N_\Delta=N^*D\setminus0
=\{(x,x;\xi,-\xi):x\in M,\ \xi\ne0\},
$$

ここで $D=\{(x,x):x\in M\}$ です。[MICA5の余法束の消滅条件](../MICA5/index.md#prop-mica5-conormal-coordinates)を $(h,h)$ に適用しても同じ式が出ます。

<a id="prop-mica7-diagonal-product"></a>

<!-- formal-statement-start -->
> **命題（対角引き戻しと分布の積）**  
> $\Omega\subset\mathbb R^n$ を開集合、$u,v\in\mathcal D'(\Omega)$ とする。全ての $x\in\Omega$、$\xi\ne0$ に対し $(x,\xi)\in WF(u)$ と $(x,-\xi)\in WF(v)$ が同時には成立しないと仮定する。このとき [テンソル積](../MICA6/index.md#def-mica6-tensor-product)に対して

$$
WF(u\otimes v)\cap N_\Delta=\varnothing,
\qquad
\Delta^*(u\otimes v)=uv,
$$

> 右辺は [MICA6のHörmander積](../MICA6/index.md#thm-mica6-product-existence)であり、左辺の引き戻しは本章の引き戻し定理で定めたものである。
<!-- formal-statement-end -->

### 証明の見取り図

対角余法線では $\xi$ と $-\xi$ の**両成分が非零**です。従ってテンソル積の波面の上界へ代入すると、逆向きの衝突がないことが交差しない条件になります。等号は、二変数を別々に平滑化してから対角線上へ戻す計算で確かめられます。

<!-- proof-start -->
### 証明

[MICA6のテンソル積波面上界](../MICA6/index.md#prop-mica6-tensor-wavefront)では、$WF(u\otimes v)$ の非零方向は、両方の波面方向または一方の零方向から生まれます。$N_\Delta$ の $(\xi,-\xi)$ は $\xi\ne0$ で両成分が非零なので、交差があれば $(x,\xi)\in WF(u)$、$(x,-\xi)\in WF(v)$ が必要です。仮定により不可能で、[引き戻し定理](#thm-mica7-pullback)が適用できます。

局所cutoffを掛けた $u,v$ を別々にmollifierで平滑化した $u_\varepsilon,v_\varepsilon$ について、滑らかな関数では

$$
\Delta^*(u_\varepsilon\otimes v_\varepsilon)(x)
=u_\varepsilon(x)v_\varepsilon(x).
$$

積の右辺は[前章のFourier畳み込みの構成](../MICA6/index.md#lem-mica6-cone-separation)により $uv$ に収束します。左辺はテンソル積の平滑化（積型mollifier）なので、本章の[分布の非特性的引き戻し](#thm-mica7-pullback)により $\Delta^*(u\otimes v)$ に収束します。極限は同一で、等号が従います。$\square$
<!-- proof-end -->

この命題は、MICA6で得た積の規則を一般引き戻しの特別な場合として位置付けます。ただし $\Delta^*$ をすべての $u\otimes v$ に自動的に適用できるわけではありません。

## 7. 条件が破れたら何が言えるか

二乗写像 $q(t)=t^2$ のnormal setは原点の全ての非零方向です。[Heaviside分布の波面](../MICA4/index.md#thm-mica4-heaviside)は $WF(H)=\{(0,\eta):\eta\ne0\}$ なので $WF(H)\cap N_q\ne\varnothing$ です。それでも $H(t^2)=1$ は $t\ne0$ で成り立ち、点 $t=0$ の値は分布を変えません。

実際、任意の正規化されたコンパクト支持の滑らかなmollifier $\rho$ による $H_\varepsilon=H*\rho_\varepsilon$ を用いると、$t\ne0$ では $H_\varepsilon(t^2)\to1$ です。また $|H_\varepsilon(t^2)|\le\|\rho\|_1$ なので、任意のコンパクト支持試験関数 $\varphi$ に対して[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から

$$
\lim_{\varepsilon\to0}\int H_\varepsilon(t^2)\varphi(t)\,dt
=\int\varphi(t)\,dt.
$$

この特定の合成は分布 $1$ に収束します。しかし **波面による一般定理はこの例の極限を保証していません**。別の $u$、例えば $\delta_0$ の合成では、非負で $\rho(0)>0$、$\int\rho=1$ を満たす滑らかなコンパクト支持の近似核を選ぶと、$t=\sqrt\varepsilon\,r$ の置換により

$$
\int\varepsilon^{-1}\rho(t^2/\varepsilon)\varphi(t)\,dt
=\varepsilon^{-1/2}\left(\varphi(0)\int\rho(r^2)\,dr+o(1)\right)
$$

となり、$\varphi(0)>0$ なら $\varepsilon^{-1/2}$ の次数で発散します。$\rho(0)>0$ は係数の正値性を保証する条件です。単に $\rho\ge0$、$\int\rho=1$ とするだけでは、$\rho$ が負の半直線だけに支持を持つ可能性があり、この発散の結論は出ません。十分条件の不成立から一般に言えるのは「この定理を適用できない」ということまでです。

## 8. 演習

### 演習 MICA7-A1：二乗写像のnormal set

- Level: A
- 目安時間: 16分

$q:\mathbb R\to\mathbb R$、$q(t)=t^2$ とする。$N_q$ を定義から求め、$u(y)=y^3$ と $u=\delta_0$ のそれぞれについて、引き戻しの非特性条件が成立するか判定せよ。

<!-- solution-start -->
#### 詳細解答

$Dq_t=(2t)$ なので転置は非零 $\eta$ を $2t\eta$ へ写します。零となるのは $t=0$ に限り、その像も $q(0)=0$ だから

$$
N_q=\{(0,\eta):\eta\ne0\}.
$$

$y^3$ は滑らかなので $WF(y^3)=\varnothing$ であり、[引き戻し定理](#thm-mica7-pullback)を適用でき、結果は $(t^2)^3=t^6$ です。一方 [点デルタの波面](../MICA4/index.md#prop-mica4-point-delta)は $WF(\delta_0)=\{(0,\eta):\eta\ne0\}$ です。$N_q$ との交差が全方向で起きるので十分条件は不成立です。これは $\delta_0(t^2)$ という形式記法を分布として定義したことを意味しません。
<!-- solution-end -->

### 演習 MICA7-A2：射影は全ての分布を引き戻せる

- Level: A
- 目安時間: 16分

$p:\mathbb R^3\to\mathbb R^2$、$p(a,b,c)=(a,b)$ とする。$N_p$ を計算し、$u=\delta_{(0,0)}$ の引き戻しが試験関数 $\varphi(a,b,c)$ へどう作用するか求めよ。

<!-- solution-start -->
#### 詳細解答

微分行列は

$$
Dp=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix},\qquad
{}^{\mathsf T}Dp(\eta_1,\eta_2)=(\eta_1,\eta_2,0).
$$

この転置が零になるのは $\eta_1=\eta_2=0$ だけなので $N_p=\varnothing$ です。局所的に二変数デルタを平滑化し、試験関数に作用させて極限を取ると

$$
\begin{aligned}
\langle p^*\delta_{(0,0)},\varphi\rangle
&=\lim_{\varepsilon\to0}\int_{\mathbb R^3}
\rho_\varepsilon(a,b)\varphi(a,b,c)\,da\,db\,dc\\
&=\int_{\mathbb R}\varphi(0,0,c)\,dc.
\end{aligned}
$$

$\varphi$ のコンパクト支持により $c$ 積分と近似単位の極限を交換できます。引き戻しは直線 $\{a=b=0\}$ 上のデルタです。
<!-- solution-end -->

### 演習 MICA7-A3：水平面への制限

- Level: A
- 目安時間: 18分

$S=\{(s,z)\in\mathbb R^2:z=0\}$、$i(s)=(s,0)$ とする。$N_i$ を計算し、$u(s,z)=\delta(s-1)$ を $S$ に制限できるか判定せよ。できる場合は結果を求めよ。

<!-- solution-start -->
#### 詳細解答

$di_s(h)=(h,0)$ だから転置は $(\sigma,\zeta)\mapsto\sigma$ です。従って

$$
N_i=\{(s,0;0,\zeta):\zeta\ne0\}.
$$

$u$ は直線 $s=1$ に集中し、[部分多様体デルタの波面集合](../MICA5/index.md#thm-mica5-submanifold-delta)より $WF(u)=\{(1,z;\sigma,0):\sigma\ne0\}$ です。交差しないので[制限の系](#cor-mica7-submanifold-restriction)が適用できます。$s$ だけの近似単位を用いれば

$$
\langle i^*u,\psi\rangle
=\lim_{\varepsilon\to0}\int\rho_\varepsilon(s-1)\psi(s)\,ds
=\psi(1),
$$

従って $i^*u=\delta_1$ です。
<!-- solution-end -->

### 演習 MICA7-A4：対角線の余接方程式

- Level: A
- 目安時間: 17分

$\Delta:\mathbb R^2\to\mathbb R^4$、$\Delta(x_1,x_2)=(x_1,x_2,x_1,x_2)$ に対するnormal setを、微分の転置から求めよ。

<!-- solution-start -->
#### 詳細解答

定義域の接ベクトル $(h_1,h_2)$ は $(h_1,h_2,h_1,h_2)$ へ移ります。値域の余ベクトルを $(\xi_1,\xi_2;\eta_1,\eta_2)$ と書くと

$$
{}^{\mathsf T}d\Delta(\xi,\eta)
=(\xi_1+\eta_1,\xi_2+\eta_2).
$$

このベクトルが零で、元の $(\xi,\eta)$ が非零である条件は $\eta=-\xi$、$\xi\ne0$ です。従って

$$
N_\Delta=\{(x,x;\xi,-\xi):x\in\mathbb R^2,\ \xi\in\mathbb R^2\setminus\{0\}\}.
$$

これは[対角余法束の導出](#prop-mica7-diagonal-product)と一致し、二つの周波数が互いに打ち消す条件です。
<!-- solution-end -->

### 演習 MICA7-B1：デルタを制限面に重ねると発散する

- Level: B
- 目安時間: 26分

$S=\{z=0\}\subset\mathbb R^2$ と $v(s,z)=\delta(z)$ を考える。非負で $\int\rho=1$、$\rho(0)>0$ の $\rho\in C_c^\infty(\mathbb R)$ を取り、$v_\varepsilon(s,z)=\varepsilon^{-1}\rho(z/\varepsilon)$ とする。$WF(v)\cap N_i$ を判定し、$v_\varepsilon|_S$ が分布として収束しないことを示せ。

<!-- solution-start -->
#### 詳細解答

$v$ の特異支持は $z=0$ で、[部分多様体デルタの波面](../MICA5/index.md#thm-mica5-submanifold-delta)により

$$
WF(v)=\{(s,0;0,\zeta):\zeta\ne0\}.
$$

[包含のnormal set](#cor-mica7-submanifold-restriction)も同じ集合なので、交差は空ではありません。$z=0$ を代入すると $v_\varepsilon(s,0)=\varepsilon^{-1}\rho(0)$ です。$\int\psi(s)\,ds=1$ を満たす非負の試験関数を選べば

$$
\langle v_\varepsilon|_S,\psi\rangle
=\varepsilon^{-1}\rho(0)\longrightarrow+\infty.
$$

分布としての収束が起きるなら各試験関数への作用は有限値へ収束するはずなので、これは不可能です。転置微分が法線周波数を零にするため、平滑化後の高さが制限によってそのまま残ることが発散機構です。
<!-- solution-end -->

### 演習 MICA7-B2：二乗写像と十分条件の限界

- Level: B
- 目安時間: 28分

$q(t)=t^2$、$H(y)=\boldsymbol{1}_{(0,\infty)}(y)$ とする。$WF(H)\cap N_q$ を求めよ。正規化された任意の $\rho\in C_c^\infty(\mathbb R)$ に対する $H_\varepsilon=H*\rho_\varepsilon$ について、試験関数への作用を取ると $H_\varepsilon(q(t))\to1$ となることを証明せよ。十分条件の意味も述べよ。

<!-- solution-start -->
#### 詳細解答

[Heaviside分布の波面](../MICA4/index.md#thm-mica4-heaviside)は $(0,\eta)$、$\eta\ne0$ の全方向です。演習A1で求めた $N_q$ と一致し、交差は空ではありません。

$H_\varepsilon(y)=\int H(y-\varepsilon z)\rho(z)\,dz$ と書くと、$t\ne0$ なら $t^2>0$ なので、小さい $\varepsilon$ で $t^2-\varepsilon z>0$ が $\rho$ の台上で一様に成立し、$H_\varepsilon(t^2)=\int\rho=1$ です。一方、全ての $\varepsilon,t$ で

$$
|H_\varepsilon(t^2)|
\le\int|\rho(z)|\,dz=\|\rho\|_1.
$$

したがってコンパクト支持の $\varphi$ について、単一点 $t=0$ を除き被積分関数が $\varphi(t)$ に収束し、$\|\rho\|_1|\varphi(t)|$ が可積分な支配関数です。[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)より

$$
\langle H_\varepsilon\circ q,\varphi\rangle
\longrightarrow\int_{\mathbb R}\varphi(t)\,dt.
$$

よって極限は定数分布 $1$ です。ただし $WF(H)\cap N_q\ne\varnothing$ なので、[引き戻し定理](#thm-mica7-pullback)そのものからこの結論は出ません。特定の近似極限を別計算で確かめただけです。
<!-- solution-end -->

### 演習 MICA7-B3：引き戻し後の波面上界を追う

- Level: B
- 目安時間: 27分

$p:\mathbb R^2\to\mathbb R$ を $p(s,t)=s+t$ とし、$u=\delta_0$ とする。非特性条件を確認し、$p^*u$ の台と波面集合を求めよ。特に、転置微分で予想した方向が実際に現れることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$Dp=(1,1)$、$Dp^{\mathsf T}\eta=(\eta,\eta)$ なので $\eta\ne0$ を零へ写さず、$N_p=\varnothing$ です。よって[引き戻し定理](#thm-mica7-pullback)が適用されます。座標変換 $(r,t)=(s+t,t)$ は逆写像 $(s,t)=(r-t,t)$ を持ち、Jacobianの絶対値が $1$ です。この座標で $p^*\delta_0=\delta(r)$ だから、試験関数へは

$$
\langle p^*\delta_0,\varphi\rangle
=\int_{\mathbb R}\varphi(-t,t)\,dt
$$

と作用します。台は直線 $s+t=0$ です。その接ベクトルは $(h,-h)$ なので、余法線 $(\sigma,\tau)$ は $(\sigma-\tau)h=0$、すなわち $\sigma=\tau$ を満たします。[部分多様体デルタの波面集合](../MICA5/index.md#thm-mica5-submanifold-delta)から

$$
WF(p^*\delta_0)
=\{(-t,t;\eta,\eta):t\in\mathbb R,\ \eta\ne0\}.
$$

これは[波面上界](#thm-mica7-pullback-wavefront)の $Dp^{\mathsf T}\eta=(\eta,\eta)$ と一致します。
<!-- solution-end -->

### 演習 MICA7-C1：放物線への制限と接触の障害

- Level: C
- 目安時間: 40分

$i:\mathbb R\to\mathbb R^2$、$i(s)=(s,s^2)$ とし、分布 $u(x,y)=\delta(y-x)$、$v(x,y)=\delta(y)$ を考える。

1. $u$ の波面集合と $N_i$ を求め、$WF(u)\cap N_i$ が空であることを確かめよ。
2. $i^*u$ を試験関数への作用から計算せよ。
3. $v$ については何が変わるか調べよ。さらに、次を満たすmollifierで $v$ を平滑化したときの $i^*v_\varepsilon$ の発散次数を求めよ。

$$
\rho\in C_c^\infty(\mathbb R),\quad \rho\ge0,\quad
\int\rho=1,\quad \rho(0)>0,\qquad
v_\varepsilon(x,y)=\varepsilon^{-1}\rho(y/\varepsilon).
$$

<!-- solution-start -->
#### 詳細解答

**（1）余法線の判定。** $i'(s)=(1,2s)$ なので $di_s^{\mathsf T}(\alpha,\beta)=\alpha+2s\beta$ です。従って

$$
N_i=\{(s,s^2;-2s\beta,\beta):s\in\mathbb R,\ \beta\ne0\}.
$$

$u$ は直線 $L=\{y=x\}$ 上のデルタで、その接方向は $(1,1)$ です。[部分多様体デルタの波面](../MICA5/index.md#thm-mica5-submanifold-delta)により

$$
WF(u)=\{(x,x;\lambda(-1,1)):x\in\mathbb R,\ \lambda\ne0\}.
$$

基点が $i(s)$ と $L$ に同時に属するには $s^2=s$、すなわち $s=0$ または $s=1$ です。そこで $u$ の余法線 $(-\lambda,\lambda)$ を転置で移すと

$$
{}^{\mathsf T}di_s(-\lambda,\lambda)
=(-1+2s)\lambda.
$$

$s=0$ では $-\lambda\ne0$、$s=1$ では $\lambda\ne0$ なので交差はありません。$s\notin\{0,1\}$ では基点が $u$ の台の外で波面がありません。

**（2）制限の具体計算。** $g(s)=s^2-s=s(s-1)$ とします。零点は $0,1$ のみで

$$
g'(s)=2s-1,\qquad g'(0)=-1,\quad g'(1)=1.
$$

各零点の近くで $r=g(s)$ は逆関数を持ち、変数変換のJacobianは $|g'(s)|^{-1}$ です。試験関数 $\psi$ の台を二つの零点の小近傍とその外に分割し、正規化近似単位 $\rho_\varepsilon$ を用いれば

$$
\begin{aligned}
\lim_{\varepsilon\to0}\int\rho_\varepsilon(g(s))\psi(s)\,ds
&=\frac{\psi(0)}{|g'(0)|}
+\frac{\psi(1)}{|g'(1)|}\\
&=\psi(0)+\psi(1).
\end{aligned}
$$

零点の外では $|g(s)|$ が各コンパクト台上で正の下界を持ち、十分小さい $\varepsilon$ で寄与は零です。従って

$$
i^*u=\delta_0+\delta_1.
$$

**（3）接触すると何が壊れるか。** $v=\delta(y)$ の波面は $\{(x,0;0,\beta):\beta\ne0\}$ です。放物線と $y=0$ は $s=0$ で接し、$N_i$ の余ベクトル $(0,\beta)$ と重なります。従って十分条件は不成立です。

$v_\varepsilon(x,y)=\rho_\varepsilon(y)$ と平滑化すると $i^*v_\varepsilon(s)=\varepsilon^{-1}\rho(s^2/\varepsilon)$ です。問題で指定した $\rho$ に対して $s=\sqrt\varepsilon\,r$ と置けば

$$
\begin{aligned}
\langle i^*v_\varepsilon,\psi\rangle
&=\varepsilon^{-1/2}
\int_{\mathbb R}\rho(r^2)\psi(\sqrt\varepsilon\,r)\,dr\\
&=\varepsilon^{-1/2}
\left(\psi(0)\int_{\mathbb R}\rho(r^2)\,dr+o(1)\right).
\end{aligned}
$$

$\rho(r^2)$ はコンパクト支持で、$\psi(\sqrt\varepsilon r)\to\psi(0)$ への[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)が使えます。$\rho(0)>0$ だから $\int\rho(r^2)\,dr>0$ です。$\psi(0)>0$ を選べば $\varepsilon^{-1/2}$ の次数で発散します。ここでは $g(s)=s^2$ の導関数が零点で消え、（2）で使えた逆関数による座標変換が破綻しました。非特性条件が支える証明機構を、横断交差と接触の差として確認できました。
<!-- solution-end -->

## 9. 何が分かったか

- 写像のnormal setは、**写像の転置微分で消える値域の余接方向**を記録します。
- $WF(u)\cap N_f=\varnothing$ なら、局所Fourier変換の急減少と非停留位相を組み合わせて $f^*u$ を構成でき、波面の転置像が上界になります。
- 埋め込みへの制限ではnormal setが余法束、対角線では逆向きの周波数の組になります。これは分布の積の条件も説明します。
- 条件が破れると発散する例も、特定の合成がなお分布として収束する例もあります。**十分条件と必要条件は区別**してください。

次は、分布に作用する演算子がどの余接方向の特異性を消せるかを、擬微分作用素の主シンボルによって調べます。
