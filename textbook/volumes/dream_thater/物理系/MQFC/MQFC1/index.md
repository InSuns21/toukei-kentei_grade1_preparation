# MQFC1 場のsmearing・Schwartz空間・緩増加分布と核

温度のような古典的な場なら各点の値を測ると考えられます。しかし量子場の数学では、点の値よりも、滑らかな重みを掛けて空間全体で平均した結果を基本にします。例えば一点に集中した電荷は普通の関数では表せませんが、測定器の重みを与えれば応答を計算できます。この操作を smearing（試験関数による平均化）と呼びます。重みは非負や積分1である必要はありません。

[超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution)と[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を既習とします。ここではまず数値を返す分布だけを扱い、作用素を返す量子場は次講で構成します。

## 1. 無限遠まで制御する試験関数

$x\in\mathbb R^d$、$d\ge1$ とし、$|x|$ をEuclidノルムとします。[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_1,\dots,\alpha_d)$ は非負整数の組で、$|\alpha|=\sum_j\alpha_j$、$\partial^\alpha=\prod_j\partial_{x_j}^{\alpha_j}$ です。コンパクト支持の試験関数は局所問題に便利ですが、Fourier変換すると一般にコンパクト支持ではなくなります。そこで無限遠での減衰を全階微分にも要求します。以下の量は三角不等式と絶対同次性を満たすため半ノルムと呼ばれます。

<a id="def-mqfc1-schwartz"></a>

<!-- formal-statement-start -->
> **定義（Schwartz空間）**  
> 滑らかな複素数値関数 $f$ で、すべての整数 $N,m\ge0$ に対して次の量が有限であるもの全体を $\mathcal S(\mathbb R^d)$ とする。

$$
p_{N,m}(f)=\max_{|\alpha|\le m}\sup_x(1+|x|)^N|\partial^\alpha f(x)|.
$$

> この空間の収束は、すべての $p_{N,m}(f_k-f)$ が零に収束することで定める。位相は有限個の半ノルムの上界による近傍で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc1-schwartz -->
### 直接例

**定義の確認**。$f(x)=e^{-|x|^2}$ は、微分するごとに多項式と同じ指数関数の積になります。実際 $\partial_j(Pe^{-|x|^2})=(\partial_j P-2x_jP)e^{-|x|^2}$ です。任意次数の多項式増大は指数減衰に負けるので全半ノルムは有限です。一方 $f(x)=(1+|x|^2)^{-1}$ は $p_{3,0}$ が無限となるため属しません。コンパクト支持の滑らかな関数はすべて属します。
<!-- definition-example-end -->

通常の点ごとの収束だけでは足りません。例えば一次元の $f_k(x)=e^{-(x-k)^2}$ は各点で零に近づきますが $p_{0,0}(f_k)=1$ です。

## 2. 緩増加分布

測定結果が重みの微小変化に対して連続であることを要求します。有限個の半ノルムによる制御は、その連続性を数式にしたものです。

<a id="def-mqfc1-tempered"></a>

<!-- formal-statement-start -->
> **定義（緩増加分布）**  
> $\mathcal S'(\mathbb R^d)$ は $\mathcal S(\mathbb R^d)$ 上の連続な複素線形汎関数全体である。作用を $\langle T,f\rangle$ と書く。連続性は、ある $C>0$ と $N,m\ge0$ に対し

$$
|\langle T,f\rangle|\le C p_{N,m}(f)
\qquad(f\in\mathcal S)
$$

> が成立することと同値である。
<!-- formal-statement-end -->

連続なら原点のある近傍で絶対値が1以下になります。有限個の半ノルムを最大の $N,m$ にまとめ、ある $\eta>0$ で $p_{N,m}(f)<\eta$ なら $|\langle T,f\rangle|\le1$ とできます。非零の $f$ を $\eta/(2p_{N,m}(f))$ 倍すれば評価が得られます。逆に評価があれば原点で連続で、線形性から全点で連続です。

<!-- definition-example-start: def-mqfc1-tempered -->
### 直接例

**定義の確認**。Dirac分布 $\delta_a$ を $\langle\delta_a,f\rangle=f(a)$ と定めると線形で、絶対値は $p_{0,0}(f)$ 以下です。従って緩増加分布です。これは普通の関数の一点での値ではなく、重みに対する応答です。
<!-- definition-example-end -->

<a id="prop-mqfc1-polynomial"></a>

<!-- formal-statement-start -->
> **命題（多項式増大関数による緩増加分布）**  
> 可測な $g$ が $|g(x)|\le A(1+|x|)^q$（$A>0,q\ge0$）をほとんど至る所で満たすなら、次の積分は緩増加分布を定める。

$$
\langle T_g,f\rangle=\int_{\mathbb R^d}g(x)f(x)\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

増大分を試験関数の減衰で相殺し、残りを可積分にします。

<!-- proof-start -->
### 証明

整数 $N>q+d$ を選びます。被積分関数の絶対値は

$$
|g(x)f(x)|\le A p_{N,0}(f)(1+|x|)^{q-N}
$$

です。単位球内の積分は有限で、球外では半径 $r$ に関する積分が定数倍の $\int_1^\infty r^{d-1+q-N}\,dr$ 以下です。指数は $-1$ 未満なので有限です。よって絶対収束し、同じ積分を定数にまとめれば連続性の評価が従います。線形性は積分の線形性から従います。
<!-- proof-end -->

## 3. 微分とFourier変換

分布の微分は試験関数へ移します。Fourier変換についても同じ方針ですが、そのためには試験関数の空間が変換で保たれる必要があります。[Fourier変換](../../../解析系/FOU/FOU3/index.md#def-fou3-fourier-transform)の符号を次で固定します。

$$
\widehat f(\xi)=\int e^{-ix\cdot\xi}f(x)\,dx.
$$

<a id="thm-mqfc1-fourier"></a>

<!-- formal-statement-start -->
> **定理（Schwartz空間のFourier変換）**  
> Fourier変換は $\mathcal S(\mathbb R^d)$ から自身への連続な線形全単射であり、逆変換は

$$
f(x)=(2\pi)^{-d}\int e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

周波数微分を空間の多項式に、周波数の多項式を空間微分に変換します。

<!-- proof-start -->
### 証明

すべての $x^\beta f(x)$ は可積分なので優収束により

$$
\partial_\xi^\beta\widehat f
=\widehat{(-ix)^\beta f}.
$$

部分積分により、任意の多重指数 $\alpha$ について

$$
(i\xi)^\alpha\partial_\xi^\beta\widehat f
=\widehat{\partial_x^\alpha[(-ix)^\beta f]}.
$$

境界項は急減少性から零です。右辺の絶対値は被変換関数の $L^1$ ノルム以下です。Leibniz則により、そのノルムは有限個の $p_{N,m}(f)$ の定数倍で抑えられます。具体的には $N>|\beta|+d$、$m=|\alpha|$ で十分です。さらに $(1+|\xi|)^N$ は次数 $N$ 以下の座標単項式の絶対値の有限和の定数倍以下なので、変換後の全半ノルムについて連続性が従います。

逆符号の変換も同じ評価を満たします。[一変数の反転定理](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)を各座標に適用します。部分変換についても上と同じ微分・積分評価が未変換座標を含むSchwartz半ノルムを制御するため、各段階で急減少性が残ります。従ってFubiniの定理により順序を交換でき、各座標から $(2\pi)^{-1}$ が現れて逆変換式を得ます。逆向きにも同じ議論が成立するので全単射です。
<!-- proof-end -->

<a id="def-mqfc1-duality"></a>

<!-- formal-statement-start -->
> **定義（緩増加分布の微分とFourier変換）**  
> $T\in\mathcal S'$ に対し

$$
\begin{aligned}
\langle\partial^\alpha T,f\rangle
&=(-1)^{|\alpha|}\langle T,\partial^\alpha f\rangle,\\
\langle\widehat T,f\rangle
&=\langle T,\widehat f\rangle
\end{aligned}
$$

> と定める。双対作用は複素線形であって複素共役を含まない。
<!-- formal-statement-end -->

試験関数の微分とFourier変換は連続なので、両者は再び緩増加分布です。通常の可積分関数の変換と整合することは、絶対収束のもとで積分順序を交換すれば分かります。

<!-- definition-example-start: def-mqfc1-duality -->
### 直接例

**定義の確認**。$\langle\delta_0',f\rangle=-f'(0)$、$\langle\widehat{\delta_0},f\rangle=\widehat f(0)=\int f(x)\,dx$ です。前者は $p_{0,1}$ で制御され、後者は命題により緩増加分布です。つまり $\widehat{\delta_0}=1$ です。
<!-- definition-example-end -->

<a id="prop-mqfc1-derivative"></a>

<!-- formal-statement-start -->
> **命題（分布微分のFourier表示）**  
> $T\in\mathcal S'$ に対して $\widehat{\partial_j T}=i\xi_j\widehat T$ が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\partial_{x_j}\widehat f(x)=\widehat{-i\xi_j f}(x)$ を使うと、

$$
\begin{aligned}
\langle\widehat{\partial_j T},f\rangle
&=-\langle T,\partial_{x_j}\widehat f\rangle\\
&=\langle T,\widehat{i\xi_j f}\rangle\\
&=\langle\widehat T,i\xi_j f\rangle.
\end{aligned}
$$

右辺が分布に滑らかな多項式を掛ける定義です。多項式を掛けても試験関数はSchwartz空間に留まります。任意の $f$ で一致するので結論を得ます。
<!-- proof-end -->

## 4. 点評価と積はどこで失敗するか

一次元で非負の滑らかなコンパクト支持関数 $\rho$ を $\int\rho=1$、$\rho(0)>0$ となるように選び、$\rho_\varepsilon(x)=\varepsilon^{-1}\rho(x/\varepsilon)$ とします（$\varepsilon>0$）。

<a id="prop-mqfc1-product-failure"></a>

<!-- formal-statement-start -->
> **命題（点評価と積の連続拡張の障害）**  
> $\rho_\varepsilon\to\delta_0$ は各試験関数への作用の収束として成立する。しかし $\rho_\varepsilon(0)$ は発散し、$\rho_\varepsilon^2$ は緩増加分布として収束しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

変数変換 $x=\varepsilon y$ で

$$
\langle\rho_\varepsilon,f\rangle=\int\rho(y)f(\varepsilon y)\,dy\longrightarrow f(0).
$$

優収束の支配関数は $\rho(y)\|f\|_\infty$ です。一方、$\rho_\varepsilon(0)=\varepsilon^{-1}\rho(0)\to+\infty$ です。二乗については

$$
\varepsilon\langle\rho_\varepsilon^2,f\rangle
=\int\rho(y)^2f(\varepsilon y)\,dy
\longrightarrow f(0)\int\rho(y)^2\,dy.
$$

$f(0)=1$ の試験関数を選べば右辺は正です。従って $\langle\rho_\varepsilon^2,f\rangle$ は発散し、分布極限はありません。
<!-- proof-end -->

この反例は、通常の関数上の点評価や積を、すべての分布にこの収束に関して連続に拡張することができないと示します。特定の分布の積が別条件で定義できることや、発散を差し引く処方の存在を否定するものではありません。

## 5. 二点核と正値性

二つの重みに対する相関を考えます。二変数の普通の関数がない場合にも、直積空間の試験関数に作用する分布を使えます。$f\otimes g$ は $(x,y)\mapsto f(x)g(y)$ です。各座標の微分と減衰を掛け合わせれば $\mathcal S(\mathbb R^{2d})$ に属します。

<a id="def-mqfc1-kernel"></a>

<!-- formal-statement-start -->
> **定義（二点分布核と正値性）**  
> $K\in\mathcal S'(\mathbb R^{2d})$ を二点分布核と呼び、対応する複素半双線形形式（第1引数で共役線形、第2引数で線形）を

$$
B_K(f,g)=\langle K,\overline f\otimes g\rangle
$$

> と定める。すべての $f\in\mathcal S$ に対して $B_K(f,f)\ge0$（実数）なら正値型の核と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc1-kernel -->
### 直接例

**定義の確認**。対角核 $K$ を $\langle K,F\rangle=\int F(x,x)\,dx$ で定めます。$N>d$ のとき $|F(x,x)|\le p_{N,0}(F)(1+\sqrt2|x|)^{-N}$ なので連続な線形汎関数です。さらに

$$
B_K(f,f)=\int |f(x)|^2\,dx\ge0.
$$

一方、$-K$ は同じ意味で分布核ですが、非零の $f$ に対して負になります。核であること自体は正値性を保証しません。
<!-- definition-example-end -->

<a id="prop-mqfc1-gram"></a>

<!-- formal-statement-start -->
> **命題（有限個の試験関数による正値性判定）**  
> 二点分布核が正値型であることと、任意の有限族 $f_1,\dots,f_n$ に対し行列 $G_{ij}=B_K(f_i,f_j)$ がHermite正半定値であることは同値である。ここでHermite正半定値とは $G^*=G$ かつすべての $c\in\mathbb C^n$ で $c^*Gc\ge0$ を意味する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f=\sum_jc_j f_j$ とすれば

$$
B_K(f,f)=\sum_{i,j}\overline{c_i}c_jG_{ij}=c^*Gc.
$$

正値型ならこれは常に非負の実数です。$c=e_i$ で対角成分が実数、$c=e_i+e_j$ で $G_{ij}+G_{ji}$ が実数、$c=e_i+ie_j$ で $i(G_{ij}-G_{ji})$ が実数と分かります。従って $G_{ji}=\overline{G_{ij}}$ となりHermite正半定値です。逆向きは $n=1$ で従います。
<!-- proof-end -->

一般の連続双線形形式を分布核で表すSchwartz核定理はここでは使用しません。また並進不変な核 $K(x,y)=u(x-y)$ に対する正値性と一般の核の正値性を区別します。相関の正値性は次講以降でHilbert空間の内積を構成するための条件になります。

## 6. 演習

### 演習 MQFC1-A1：急減少

- Level: A
- 目安時間: 10分

一次元で $x^2 e^{-x^2}$ がSchwartz関数であることを示せ。

<!-- solution-start -->
#### 詳細解答

$P_0=x^2$ とし $P_{k+1}=P_k'-2xP_k$ とおくと第 $k$ 階微分は $P_k e^{-x^2}$ です。各 $P_k$ は多項式です。任意の $N$ に対し $(1+|x|)^N|P_k(x)|e^{-x^2}$ は連続で無限遠で零になるため有界です。有限個の微分の最大も有限なので定義を満たします。
<!-- solution-end -->

### 演習 MQFC1-A2：デルタの微分

- Level: A
- 目安時間: 10分

$\langle\delta_a'',f\rangle$ を求め、連続性を示せ。

<!-- solution-start -->
#### 詳細解答

二回微分の符号は $(-1)^2=1$ なので $\langle\delta_a'',f\rangle=f''(a)$ です。絶対値は $p_{0,2}(f)$ 以下であり、緩増加分布です。
<!-- solution-end -->

### 演習 MQFC1-A3：平行移動したデルタ

- Level: A
- 目安時間: 10分

一次元の $\widehat{\delta_a}$ を求めよ。

<!-- solution-start -->
#### 詳細解答

双対定義から

$$
\langle\widehat{\delta_a},f\rangle=\widehat f(a)
=\int e^{-ia\xi}f(\xi)\,d\xi.
$$

従って $\widehat{\delta_a}(\xi)=e^{-ia\xi}$ です。絶対値が1なので多項式増大関数の命題も適用できます。
<!-- solution-end -->

### 演習 MQFC1-A4：非正値の核

- Level: A
- 目安時間: 10分

$K(x,y)=-1$ は分布核だが正値型ではないことを示せ。

<!-- solution-start -->
#### 詳細解答

定数関数は $\mathbb R^{2d}$ 上で多項式増大条件を満たします。積分を分離すると

$$
B_K(f,f)=-\left|\int f(x)\,dx\right|^2.
$$

$f=e^{-|x|^2}$ の積分は正なので負になり、正値型ではありません。
<!-- solution-end -->

### 演習 MQFC1-B1：定数分布の変換

- Level: B
- 目安時間: 15分

$d$ 次元の定数分布 $1$ のFourier変換を求め、$\widehat{\partial_j1}=0$ と整合することを示せ。

<!-- solution-start -->
#### 詳細解答

反転式を $x=0$ で使うと $\int\widehat f(\xi)\,d\xi=(2\pi)^df(0)$ です。従って $\langle\widehat1,f\rangle=(2\pi)^df(0)$、つまり $\widehat1=(2\pi)^d\delta_0$ です。また

$$
\langle i\xi_j\widehat1,f\rangle
=(2\pi)^d(i\xi_j f)(0)=0.
$$

定数の分布微分も $-\int\partial_j f=0$ です。境界値は急減少によって零になります。
<!-- solution-end -->

### 演習 MQFC1-B2：正規化した二乗の極限

- Level: B
- 目安時間: 15分

第4節の $\rho_\varepsilon$ に対し $\varepsilon\rho_\varepsilon^2$ の極限を求め、その値が $\rho$ に依存することを示せ。

<!-- solution-start -->
#### 詳細解答

変数変換で $\langle\varepsilon\rho_\varepsilon^2,f\rangle=\int\rho(y)^2 f(\varepsilon y)\,dy$ となります。$\rho^2\|f\|_\infty$ で支配されるので極限は $f(0)\int\rho^2$ です。従って $(\int\rho^2)\delta_0$ に収束します。別の正規化関数 $\widetilde\rho(y)=2\rho(2y)$ は積分1ですが、

$$
\int\widetilde\rho(y)^2\,dy=2\int\rho(y)^2\,dy.
$$

係数が2倍になります。この処方は元の分布だけから一意には決まりません。
<!-- solution-end -->

### 演習 MQFC1-B3：階数1の核

- Level: B
- 目安時間: 20分

$h\in\mathcal S$ とし $K(x,y)=h(x)\overline{h(y)}$ とする。緩増加分布であることと正値性を示し、有限族の行列を求めよ。

<!-- solution-start -->
#### 詳細解答

$h$ は有界なので $K$ も有界で、命題により緩増加分布です。$z_j=\int\overline{h(y)} f_j(y)\,dy$ とおけば絶対収束により積分を分離でき、

$$
G_{ij}=\overline{z_i}z_j,\qquad
c^*Gc=\left|\sum_j c_jz_j\right|^2.
$$

従って正値型です。各列は共通ベクトル $(\overline{z_i})_i$ の倍数なので行列の階数は高々1です。
<!-- solution-end -->

### 演習 MQFC1-C1：差を測る正値核

- Level: C
- 目安時間: 30分

一次元で $a\ne0$ とし、$K$ を

$$
\langle K,F\rangle=2F(0,0)+F(a,a)-F(0,a)-F(a,0)
$$

と定める。連続性、正値性、$B_K(f,f)=0$ の条件を示し、この零条件が $f=0$ を意味しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

各点評価は $p_{0,0}(F)$ 以下なので $|\langle K,F\rangle|\le5p_{0,0}(F)$ です。線形性も明らかなので分布核です。$u=f(0),v=f(a)$ とすると

$$
\begin{aligned}
B_K(f,f)&=2|u|^2+|v|^2-\overline uv-\overline vu\\
&=|u|^2+|u-v|^2\ge0.
\end{aligned}
$$

両方の平方が零となる条件は $u=0$ かつ $u-v=0$、すなわち $f(0)=f(a)=0$ です。例えば $f(x)=x(x-a)e^{-x^2}$ はこの条件を満たす非零のSchwartz関数です。従って正値型でも零ノルムの非零試験関数が存在し、内積を作るにはそのような方向を同一視する必要があります。
<!-- solution-end -->

## 7. 次の講義

試験関数の空間、連続な分布、そのFourier変換と二点核の正値性を得ました。次のMQFC2では数値の代わりに共通稠密定義域上の作用素を返す場を扱います。正値性はHilbert空間との接続に、点評価と積の失敗は相互作用のくりこみの必要性につながります。
