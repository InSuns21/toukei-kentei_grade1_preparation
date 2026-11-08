# YAU1-09 二階評価の大域閉包

## 1. 局所不等式から計量全体の評価へ

[前章の局所計算](../YAU1-08/index.md#cor-yau1-08-path)で、相対跡の対数が満たす微分不等式を得た。しかしこの不等式自体は、跡がどの点でも小さいとは言っていない。コンパクト多様体の**最大点**へ不等式を持ち込み、逆跡を抑え、その情報を全点へ運ぶ必要がある。

本章では複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体 $(X,\omega)$、滑らかな実関数 $F$ を固定し、

$$
\int_Xe^F\omega^n=\int_X\omega^n
$$

を仮定する。[連続性のパス](../YAU1-05/index.md#def-yau1-05-path)の**解が存在する**時刻 $t\in[0,1]$ について、

$$
\rho_t=1-t+te^F,\qquad
\omega_{\varphi_t}=\omega+i\partial\bar\partial\varphi_t>0,\qquad
\omega_{\varphi_t}^n=\rho_t\omega^n,\qquad
\int_X\varphi_t\omega^n=0
$$

とする。$g$、$h$ はそれぞれ $\omega$、$\omega_{\varphi_t}$ のHermite係数、$L_{\varphi_t}f=h^{i\bar j}\partial_i\partial_{\bar j}f$ は複素Laplacianである。[相対跡と逆跡](../YAU1-08/index.md#def-yau1-08-relative-traces)を

$$
S=\operatorname{tr}_\omega\omega_{\varphi_t}=\sum_{i=1}^n\lambda_i,
\qquad T=\operatorname{tr}_{\omega_{\varphi_t}}\omega=\sum_{i=1}^n\lambda_i^{-1}
$$

と書く。ここで $\lambda_i>0$ は $g$ に対する $h$ の相対固有値であり、$\prod_i\lambda_i=\rho_t$ である。以下、証明の途中で $t$ を省略する。

固定データに依存する正定数 $m,M,C_0$ を次のように選べる。

$$
m:=\min\{1,\min_Xe^F\}>0,\quad
M:=\max\{1,\max_Xe^F\},\quad
m\le\rho_t\le M,\quad
\|\varphi_t\|_{L^\infty(X)}\le C_0.
$$

最後の不等式は[前々章のMoser反復](../YAU1-07/index.md#thm-yau1-07-moser)に基づく。必要な定数は $t$ や解の二階微分には依存しない。目標は、同じ固定データだけで

$$
c\omega\le\omega_{\varphi_t}\le C\omega
$$

と上下から挟むことである。ここで形式の大小は、任意の接ベクトル $v$ に対するHermite二次形式の大小を意味する。

## 2. 最大値を取るための補助関数

$\log S$ だけを最大化すると、[局所不等式](../YAU1-08/index.md#cor-yau1-08-path)の右辺には $-BT$ が残り、$T$ の上界を取り出せない。一方、ポテンシャル $\varphi$ は、計量の差を記録しているので、

$$
L_\varphi\varphi
=h^{i\bar j}(h_{i\bar j}-g_{i\bar j})=n-T
$$

が成り立つ。そこで、$\varphi$ を大きな正の係数で引く。これは既知の $C^0$ 評価を、二階評価へ接続する工夫である。

<a id="def-yau1-09-auxiliary"></a>

<!-- formal-statement-start -->
> **定義（二階評価の補助関数）**
> $(X,\omega)$ 上の滑らかな実数値関数 $\varphi$ が $\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ を満たすとする。定数 $A>0$ に対し、正の相対跡 $S=\operatorname{tr}_\omega\omega_\varphi$ を用いて

$$
Q_A:=\log S-A\varphi
$$

> と定める。$Q_A$ を二階評価の補助関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-09-auxiliary -->
**定義の確認**。平坦な複素二次元トーラスで $g=I$、$\varphi=0$ とすると $h=I>0$、相対固有値は $(1,1)$ だから $S=2$、$Q_A=\log2$ である。少し変形した $\varphi=\varepsilon\cos(2\pi x_1)$（$z_1=x_1+iy_1$、$0<\pi^2\varepsilon<1$）では、$\partial_{z_1}\partial_{\bar z_1}=\tfrac14\partial_{x_1}^2$ により

$$
h=\operatorname{diag}(1-\pi^2\varepsilon\cos(2\pi x_1),1),\qquad
S=2-\pi^2\varepsilon\cos(2\pi x_1).
$$

よって $h$ の二つの固有値はともに正、$Q_A=\log(2-\pi^2\varepsilon\cos(2\pi x_1))-A\varepsilon\cos(2\pi x_1)$ は実数値の滑らかな関数である。ここでは固有値を**基準計量 $g=I$ に関して**取っているので、跡が単純な和になる。$\varphi$ が小さくても、$Q_A$ の最大点は $S$ の最大点と一致する必要はない。
<!-- definition-example-end -->

## 3. 最大点で逆跡を抑える

[連続性のパスに一様な局所不等式](../YAU1-08/index.md#cor-yau1-08-path)から、固定した $B,C_1\ge0$ が存在して

$$
L_\varphi\log S\ge -BT-C_1
$$

が全点で成り立つ。$L_\varphi\varphi=n-T$ と組み合わせると、正の $A$ について

$$
L_\varphi Q_A
\ge -BT-C_1-A(n-T)
=(A-B)T-(C_1+An).
$$

$A>B$ とすることが重要である。これにより最大点で、未知の非負量 $T$ の**上界**が現れる。

<a id="thm-yau1-09-maximum-inverse-trace"></a>

<!-- formal-statement-start -->
> **定理（補助関数の最大点における逆跡評価）**
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクトKähler多様体とし、$\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ は滑らかであるとする。$S=\operatorname{tr}_\omega\omega_\varphi$、$T=\operatorname{tr}_{\omega_\varphi}\omega$ と書く。定数 $B,C_1\ge0$ に対して $L_\varphi\log S\ge-BT-C_1$ が全点で成立すると仮定する。$A>B$ を固定し、$Q_A=\log S-A\varphi$ が最大となる点を $p$ とすると、

$$
T(p)\le D_A:=\frac{C_1+An}{A-B}.
$$

> 特に $A=B+1$ とすれば $D_A=C_1+n(B+1)$ は固定データのみで決まる。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクト性で $Q_A$ の最大点が存在する。その点では実数値関数の複素Hessianが半負定値なので、正定値な $h^{-1}$ で縮約した $L_\varphi Q_A$ は非正。局所下界と挟み、$A-B>0$ で割る。

<!-- proof-start -->
### 証明

$S>0$ なので $Q_A$ は滑らかである。$X$ はコンパクトであるから最大点 $p$ が存在する。$p$ の正則座標で任意の複素ベクトル $v$ に対し、実数値関数 $Q_A$ の極大性から

$$
v^i\overline{v^j}\,\partial_i\partial_{\bar j}Q_A(p)\le0
$$

が成立する。実際、$v$ が張る実二次元平面への制限の実Hessianは半負定値で、その複素方向の混合微分は二つの実方向の二階微分の和の $1/4$ である。$h(p)$ に関する正規直交基底で縮約すると

$$
L_\varphi Q_A(p)
=h^{i\bar j}(p)\partial_i\partial_{\bar j}Q_A(p)\le0.
$$

[局所下界](../YAU1-08/index.md#cor-yau1-08-path)と $L_\varphi\varphi=n-T$ から

$$
\begin{aligned}
0&\ge L_\varphi Q_A(p)\\
&=L_\varphi\log S(p)-A L_\varphi\varphi(p)\\
&\ge-BT(p)-C_1-A(n-T(p))\\
&=(A-B)T(p)-(C_1+An).
\end{aligned}
$$

$A-B>0$ で割って $T(p)\le D_A$ を得る。$A=B+1$ の式は代入で従う。$\square$
<!-- proof-end -->

この定理が抑えているのは、今のところ **$Q_A$ の最大点での逆跡 $T(p)$ だけ**である。他の点に同じ $T$ の上界を勝手に移してはいけない。

## 4. 行列式と逆跡が跡の上界を作る

最大点では $T(p)\le D_A$、方程式から $\prod_i\lambda_i(p)=\rho_t(p)\le M$ がある。前者で各固有値が零から離れ、後者が残る一つの固有値の発散を防ぐ。

<a id="lem-yau1-09-eigenvalue-algebra"></a>

<!-- formal-statement-start -->
> **補題（行列式・逆跡・跡からの固有値評価）**
> $n\ge1$ とし、正数 $\lambda_1,\ldots,\lambda_n$ が与えられたとする。$\prod_i\lambda_i\le M$、$\sum_i\lambda_i^{-1}\le D$（$M,D>0$）なら、各 $i$ に対し

$$
\frac1D\le\lambda_i\le MD^{\,n-1},
\qquad
\sum_i\lambda_i\le nMD^{\,n-1}.
$$

> また $\prod_i\lambda_i\ge m>0$、$\sum_i\lambda_i\le K$（$K>0$）なら、各 $i$ に対し

$$
\frac{m}{K^{\,n-1}}\le\lambda_i\le K.
$$
<!-- formal-statement-end -->

### 証明の見取り図

逆跡の各項が正なので $1/\lambda_i\le D$。全積を、注目する一つの固有値と他の $n-1$ 個へ分解する。後半では跡の上界から各 $\lambda_i\le K$ として同じ分解を逆向きに使う。

<!-- proof-start -->
### 証明

$\lambda_i^{-1}\le\sum_j\lambda_j^{-1}\le D$ なので $\lambda_i\ge D^{-1}$。したがって、添字 $i$ を固定すると

$$
\prod_{j\ne i}\lambda_j\ge D^{-(n-1)},\qquad
\lambda_i=\frac{\prod_j\lambda_j}{\prod_{j\ne i}\lambda_j}
\le\frac{M}{D^{-(n-1)}}=MD^{n-1}.
$$

各 $i$ について加えると $\sum_i\lambda_i\le nMD^{n-1}$。次に $\sum_j\lambda_j\le K$ なら各 $\lambda_j\le K$ であるから

$$
\prod_{j\ne i}\lambda_j\le K^{n-1},\qquad
\lambda_i=\frac{\prod_j\lambda_j}{\prod_{j\ne i}\lambda_j}
\ge\frac{m}{K^{n-1}}.
$$

$n=1$ では空積を $1$ と約束するため、両主張は $\lambda_1^{-1}\le D$、$m\le\lambda_1\le K$ に還元される。$\square$
<!-- proof-end -->

**最小例。** $\lambda=(2,3)$ なら $T=1/2+1/3=5/6$、積は $6$ である。たとえば $D=1,M=6$ とおくと補題の上界 $6$ は各固有値 $2,3$ を確かに包む。逆に積だけを固定した $\lambda=(R,R^{-1})$ では $R\to\infty$ に伴い $T=R+R^{-1}$ が発散し、補題に必要な**一定の** $D$ を選べない。

## 5. 最大点の情報を全点へ運ぶ

最大点 $p$ に上の補題を適用すれば $S(p)\le nMD_A^{n-1}$。一方、$Q_A(x)\le Q_A(p)$ より

$$
\log S(x)-A\varphi(x)
\le\log S(p)-A\varphi(p).
$$

両辺に $A\varphi(x)$ を足し、指数を取ると

$$
S(x)\le S(p)\exp\{A(\varphi(x)-\varphi(p))\}
\le nMD_A^{\,n-1}\exp(A\,\operatorname{osc}_X\varphi).
$$

ここで $\operatorname{osc}_X\varphi:=\sup_X\varphi-\inf_X\varphi$ であり、[一様 $C^0$ 評価](../YAU1-07/index.md#thm-yau1-07-moser)から $\operatorname{osc}_X\varphi\le2C_0$。**最大点の逆跡上界から全点の相対跡上界へ**進むのに、ちょうどこの $C^0$ 入力が必要になる。

<a id="thm-yau1-09-global-second-order"></a>

<!-- formal-statement-start -->
> **定理（連続性のパス上の大域二階評価）**
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X,\mathbb R)$ を $\int_Xe^F\omega^n=\int_X\omega^n$ を満たす関数とする。解が存在する $t\in[0,1]$ について、平均零の滑らかな $\varphi_t$ が $\omega_{\varphi_t}=\omega+i\partial\bar\partial\varphi_t>0$ と $\omega_{\varphi_t}^n=(1-t+te^F)\omega^n$ を満たすとする。このとき $X,\omega,F$ のみに依存し、$t$ と解に依存しない正数 $c,C$ が存在して

$$
c\omega\le\omega_{\varphi_t}\le C\omega
$$

> が全点で成り立つ。したがって $\varphi_t$ の複素Hessian $i\partial\bar\partial\varphi_t=\omega_{\varphi_t}-\omega$ も $\omega$ に関して一様に有界である。
<!-- formal-statement-end -->

### 証明の見取り図

一様な密度の上下界と $C^0$ 評価を用意する。補助関数 $Q_A$ の極大点では $L_\varphi Q_A\le0$ となることを使い、その点の $T$ を抑える。行列式上界と合わせて最大点の $S$ を抑え、$C^0$ 評価で全点へ伝える。最後は行列式下界と $S$ 上界から相対固有値の下界を得る。

<!-- proof-start -->
### 証明

固定した $F$ より $m\le\rho_t\le M$ は全時刻で成立する。[Moser反復の定理](../YAU1-07/index.md#thm-yau1-07-moser)を平均零の解へ適用し $\|\varphi_t\|_\infty\le C_0$ を得る。この定理の仮定である固定背景のコンパクト性・Kähler性・右辺の一様上下界・解の正値性はすべて満たされている。

[前章のパス一様局所不等式](../YAU1-08/index.md#cor-yau1-08-path)の定数 $B,C_1$ を取り、$A=B+1$ とする。[最大点での逆跡評価](#thm-yau1-09-maximum-inverse-trace)より

$$
D:=C_1+n(B+1),\qquad T(p)\le D
$$

である。ここで $p$ は $Q_A$ の最大点で、$D$ は解・時刻に依存しない。$\prod_i\lambda_i(p)=\rho_t(p)\le M$ と[固有値補題](#lem-yau1-09-eigenvalue-algebra)を組み合わせ、

$$
S(p)=\sum_i\lambda_i(p)\le nMD^{n-1}
$$

を得る。任意の $x\in X$ で $Q_A(x)\le Q_A(p)$ と $|\varphi_t|\le C_0$ を使えば

$$
\begin{aligned}
\log S(x)&\le\log S(p)+A(\varphi_t(x)-\varphi_t(p))\\
&\le\log(nMD^{n-1})+2AC_0.
\end{aligned}
$$

従って

$$
S(x)\le K:=nMD^{n-1}e^{2AC_0}.
$$

さらに $\prod_i\lambda_i(x)=\rho_t(x)\ge m$ を[固有値補題](#lem-yau1-09-eigenvalue-algebra)の後半に入力して

$$
\frac{m}{K^{n-1}}\le\lambda_i(x)\le K
\qquad (i=1,\ldots,n;\ x\in X)
$$

を得る。$g$ に関する正規直交基底では $h=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$ なので、任意の複素接ベクトル $v$ に対して

$$
\frac{m}{K^{n-1}}\,g(v,\bar v)
\le h(v,\bar v)\le K\,g(v,\bar v).
$$

よって $c=m/K^{n-1}$、$C=K$ とすれば二側評価が成立する。$i\partial\bar\partial\varphi_t=h-g$ だから、同じ基底でHessianの固有値は $\lambda_i-1\in[c-1,C-1]$ であり、一様に有界である。$\square$
<!-- proof-end -->

ここで得た $C^2$ は**複素混合二階微分の計量評価**を指す。一般の実Hessianの全成分、まして三階微分やHölder半ノルムをこの一節だけから抑えたと解釈してはならない。高階の閉包には次章以降の追加議論が必要である。

<a id="cor-yau1-09-uniform-ellipticity"></a>

<!-- formal-statement-start -->
> **系（線形化作用素の一様楕円性）**
> 上の大域二階評価の定理の仮定の下、各解の線形化 $L_{\varphi_t}f=h_t^{i\bar j}\partial_i\partial_{\bar j}f$ は、固定計量 $g$ に関して一様楕円的である。すなわち、定理の $0<c\le C$ に対し任意の複素共ベクトル $\xi$ について

$$
\frac1C\,g^{i\bar j}\xi_i\overline{\xi_j}
\le h_t^{i\bar j}\xi_i\overline{\xi_j}
\le\frac1c\,g^{i\bar j}\xi_i\overline{\xi_j}
$$

> が成立する。定数は $t$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

正値Hermite行列の固有値を逆数にすると大小が反転する。各点で背景正規直交基底を選び、[大域二階評価](#thm-yau1-09-global-second-order)の $c\le\lambda_i\le C$ を逆数に移す。

<!-- proof-start -->
### 証明

点 $x$ で $g=I$、$h_t=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$ とする。$c\le\lambda_i\le C$ より $C^{-1}\le\lambda_i^{-1}\le c^{-1}$。したがって

$$
\frac1C\sum_i|\xi_i|^2
\le\sum_i\frac{|\xi_i|^2}{\lambda_i}
\le\frac1c\sum_i|\xi_i|^2.
$$

両端はこの基底での $g^{-1}$、中央は $h_t^{-1}$ の二次形式である。式は基底の選択に依存しないので全点で成り立つ。$\square$
<!-- proof-end -->

一様楕円性は、次章の三階評価およびその次のSchauder型の議論へ進むための条件である。ただし**係数のHölder連続性まで得たわけではない**ので、この系だけを引用して直ちに高階評価を適用することはできない。

## 6. 具体例で二種類の評価を見分ける

**平坦複素トーラスの余弦ポテンシャル。** 第2節の例で $a:=\pi^2\varepsilon\in(0,1)$ と置く。実際に

$$
\lambda_1=1-a\cos(2\pi x_1),\quad \lambda_2=1,\quad
\rho=\lambda_1,\quad
S=2-a\cos(2\pi x_1),\quad
T=\frac1{1-a\cos(2\pi x_1)}+1.
$$

$1-a\le\lambda_1\le1+a$ なので $m=1-a$、$M=1+a$ は密度の上下界であり、$S\le2+a$、$T\le(1-a)^{-1}+1$ を直接確認できる。$\int_X\rho\,\omega^2=\int_X\omega^2$ も余弦の平均が零であるため成立する。この例の $\rho$ は端点 $t=1$ の指定密度であり、途中の $t$ について**同じ $\varphi$** がパスを解くとは主張していない。

**なぜ行列式だけでは駄目か。** 一点の正値Hermite行列 $h_R=\operatorname{diag}(R,R^{-1})$ と $g=I$ を考える。全て $R>0$ で $\det h_R/\det g=1$ だが、$S_R=R+R^{-1}$、$T_R=R+R^{-1}$ は $R\to\infty$ で発散する。これは大域方程式の解の列を構成したものではなく、**密度の積の情報だけでは不十分**という線形代数上の反例である。

**どの仮定がどこで働いたか。**

- コンパクト性を失うと、$Q_A$ が最大点を取るとは限らず第3節が始まらない。
- $\|\varphi\|_\infty$ の一様評価を失うと、最大点の $S(p)$ を任意の $x$ へ運ぶ際の指数因子を抑えられない。
- 密度の下界 $m>0$ が失われると、$S$ の上界からも $\lambda_i\ge m/K^{n-1}$ を導けない。例えば $(\lambda_1,\lambda_2)=(\delta,1)$ では $S\le2$ だが $\delta\downarrow0$ で退化する。
- Kähler性・曲率の一様性を失うと、入力である[局所対数跡不等式](../YAU1-08/index.md#cor-yau1-08-path)の導出そのものが保証されない。

## 7. 演習：最大点と全点を区別して閉包する

### Level A

#### YAU1-09-A01 ポテンシャルのLaplacian
- Level: A

複素次元 $n$ のKähler計量 $g$、$h=g+\partial\bar\partial\varphi>0$ に対し、$L_h\varphi=n-\operatorname{tr}_h g$ を局所成分から導け。ここで $L_h f=h^{i\bar j}\partial_i\partial_{\bar j}f$ とする。

<!-- solution-start -->
**詳細解答。** $h_{i\bar j}=g_{i\bar j}+\partial_i\partial_{\bar j}\varphi$ なので $\varphi_{i\bar j}=h_{i\bar j}-g_{i\bar j}$。したがって

$$
\begin{aligned}
L_h\varphi
&=h^{i\bar j}\varphi_{i\bar j}\\
&=h^{i\bar j}h_{i\bar j}-h^{i\bar j}g_{i\bar j}\\
&=\operatorname{tr}(h^{-1}h)-\operatorname{tr}_h g
=n-\operatorname{tr}_h g.
\end{aligned}
$$

$h$ が正値なので逆行列が存在する。$h^{-1}h=I_n$ の跡が $n$ であることを使った。
<!-- solution-end -->

#### YAU1-09-A02 三つの相対量
- Level: A

一点で基準計量が単位行列、もう一方の正値計量の相対固有値が $(2,1/2,3)$ のとき、相対跡 $S$、逆跡 $T$、体積比 $\rho$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [相対量の定義](../YAU1-08/index.md#def-yau1-08-relative-traces)に従う。各固有値が正なので逆数と積は定義でき、

$$
S=2+\frac12+3=\frac{11}{2},
\qquad
T=\frac12+2+\frac13=\frac{17}{6},
\qquad
\rho=2\cdot\frac12\cdot3=3.
$$

$S$ は固有値の和、$T$ は逆数の和、$\rho$ は積であり、三つを取り違えない。
<!-- solution-end -->

#### YAU1-09-A03 係数を選ぶ理由
- Level: A

複素次元 $n=2$ で $L_h\log S\ge-2T-3$、$L_h\varphi=2-T$ とする。$Q_A=\log S-A\varphi$ の最大点 $p$ において $A=3$ を選び、$T(p)$ の上界を示せ。$A=2$ では同じ手順から上界が出ない理由も述べよ。

<!-- solution-start -->
**詳細解答。** 二式を引き合わせて

$$
L_hQ_A\ge-2T-3-A(2-T)=(A-2)T-(3+2A).
$$

$A=3$ とすれば $L_hQ_3\ge T-9$。最大点で $L_hQ_3(p)\le0$ なので $0\ge T(p)-9$、ゆえに $T(p)\le9$。一方、$A=2$ では $L_hQ_2\ge-7$ としか得られず、右辺から $T$ が消える。$T$ の上界には **$A-B$ を正に選ぶこと**が必要である。
<!-- solution-end -->

#### YAU1-09-A04 固有値補題の数値化
- Level: A

正数 $\lambda_1,\lambda_2$ が $\lambda_1\lambda_2\le6$、$\lambda_1^{-1}+\lambda_2^{-1}\le2$ を満たす。各固有値と和の上界を与え、$n=2$ の[固有値補題](#lem-yau1-09-eigenvalue-algebra)を直接検算せよ。

<!-- solution-start -->
**詳細解答。** 各逆数は非負なので $\lambda_i^{-1}\le2$、したがって $\lambda_i\ge1/2$。他方の固有値が $1/2$ 以上だから

$$
\lambda_1=\frac{\lambda_1\lambda_2}{\lambda_2}
\le\frac6{1/2}=12,\qquad
\lambda_2=\frac{\lambda_1\lambda_2}{\lambda_1}
\le12.
$$

よって $\lambda_1+\lambda_2\le24$。これは補題の $D=2,M=6,n=2$ から得る $MD^{n-1}=12$、$nMD^{n-1}=24$ と一致する。
<!-- solution-end -->

#### YAU1-09-A05 複素一次元では
- Level: A

複素次元 $n=1$ で $h=g+\partial\bar\partial\varphi>0$ が $h=\rho g$（$0<m\le\rho\le M$）を満たすとする。$S,T$ と二側計量評価を求め、補助関数を使わなくても結論が得られる理由を述べよ。

<!-- solution-start -->
**詳細解答。** 一次元では行列式比は唯一の相対固有値に等しいから $\lambda_1=\rho$。よって

$$
S=\rho,\qquad T=\rho^{-1},\qquad
mg\le h=\rho g\le Mg.
$$

一次元では固有値の積とその唯一の固有値が同じであり、密度の上下界がそのまま計量の上下界となる。$n\ge2$ では積から各固有値を抑えられず、最大値原理と跡の情報が要る。
<!-- solution-end -->

### Level B

#### YAU1-09-B01 定数を最後まで運ぶ
- Level: B

複素次元 $n=2$ で密度 $1/2\le\rho\le2$、ポテンシャル $\|\varphi\|_\infty\le1/4$、局所下界 $L_h\log S\ge-T-2$ が成立するとする。$A=2$ を選ぶとき、最大点の $T$ の上界、全点の $S$ の上界、相対固有値の二側評価を具体式で求めよ。

<!-- solution-start -->
**詳細解答。** $B=1,C_1=2,n=2,A=2$ だから $A-B=1$。まず[最大点評価](#thm-yau1-09-maximum-inverse-trace)より

$$
D_A=\frac{2+2\cdot2}{2-1}=6,\qquad T(p)\le6.
$$

密度の上界 $M=2$ を踏まえて[固有値補題](#lem-yau1-09-eigenvalue-algebra)を適用すると、最大点では

$$
S(p)\le nMD_A^{n-1}=2\cdot2\cdot6=24.
$$

全点 $x$ では $Q_2(x)\le Q_2(p)$、$\varphi(x)-\varphi(p)\le2(1/4)=1/2$ なので

$$
S(x)\le24\,e^{\,2\cdot(1/2)}=24e=:K.
$$

最後に $m=1/2$ と積の下界を使うと、各相対固有値について

$$
\frac{1}{48e}=\frac{m}{K}\le\lambda_i(x)\le K=24e.
$$

上界に $M$、下界に $m$ を使う順序が重要である。
<!-- solution-end -->

#### YAU1-09-B02 余弦ポテンシャルで実測する
- Level: B

平坦複素二次元トーラス $(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ 上で $g=I$ とし、$\varphi(x_1)=\varepsilon\cos(2\pi x_1)$（$a=\pi^2\varepsilon\in(0,1)$）を取る。$S,T,\rho$ の範囲と $\operatorname{osc}_X\varphi$ を計算せよ。$Q_A$ を $x_1=0$ と $x_1=1/2$ で比較せよ。

<!-- solution-start -->
**詳細解答。** $\partial_{z_1}\partial_{\bar z_1}\varphi=\tfrac14\partial_{x_1}^2\varphi=-a\cos(2\pi x_1)$、他の成分は零だから

$$
h=\operatorname{diag}(1-a\cos(2\pi x_1),1).
$$

$0<a<1$ より正値性が保たれる。相対固有値の和・逆数の和・積を使うと

$$
\begin{aligned}
2-a&\le S=2-a\cos(2\pi x_1)\le2+a,\\
1+\frac1{1+a}&\le T=1+\frac1{1-a\cos(2\pi x_1)}
\le1+\frac1{1-a},\\
1-a&\le\rho=1-a\cos(2\pi x_1)\le1+a.
\end{aligned}
$$

$\sup\varphi=\varepsilon$、$\inf\varphi=-\varepsilon$ なので $\operatorname{osc}_X\varphi=2\varepsilon$。特定の二点では

$$
Q_A(0)=\log(2-a)-A\varepsilon,\qquad
Q_A(1/2)=\log(2+a)+A\varepsilon.
$$

$A>0$、$\varepsilon>0$ だから後者が大きい。ここでは $S$ の最大点と $Q_A$ の最大点が一致するが、一般に一致するという定理ではない。
<!-- solution-end -->

#### YAU1-09-B03 二つの退化を見分ける
- Level: B

基準計量 $g=I_2$ に対し、正値Hermite行列の二つの列 $h_R=\operatorname{diag}(R,R^{-1})$（$R\ge1$）、$k_\delta=\operatorname{diag}(\delta,1)$（$0<\delta\le1$）を考える。各列で $S$、行列式比を計算し、二階評価のどの入力が欠けているか述べよ。

<!-- solution-start -->
**詳細解答。** $h_R$ では

$$
\det h_R=1,\qquad S_R=R+R^{-1}\ge R\longrightarrow\infty,
\qquad T_R=R^{-1}+R\longrightarrow\infty.
$$

体積比は上下から固定されるが、逆跡 $T_R$ を最大点で制限するような情報は与えられていない。$k_\delta$ では

$$
\det k_\delta=\delta\downarrow0,\qquad
S_\delta=1+\delta\le2,\qquad
\lambda_{\min}(k_\delta)=\delta\downarrow0.
$$

こちらは $S$ が有界でも密度の**正の下界** $m$ がない。両列とも一点の代数例であり、コンパクトKähler多様体上のパスの解列とは限らない。
<!-- solution-end -->

#### YAU1-09-B04 逆行列と楕円性
- Level: B

複素次元 $2$ の二つの正値Hermite行列 $g,h$ が $c\,g\le h\le C\,g$（$0<c\le C$）を満たすとする。$g$ に関する正規直交基底で、逆二次形式の不等式と $L_h$ の一様楕円性を導け。また、この情報だけで $h$ の成分のHölder半ノルムを抑えたことになるか説明せよ。

<!-- solution-start -->
**詳細解答。** 基準計量での正規直交基底を取り、さらに $h$ を対角化すると $g=I_2$、$h=\operatorname{diag}(\lambda_1,\lambda_2)$、$c\le\lambda_i\le C$。逆行列は $\operatorname{diag}(\lambda_1^{-1},\lambda_2^{-1})$ だから

$$
\frac1C(|\xi_1|^2+|\xi_2|^2)
\le\frac{|\xi_1|^2}{\lambda_1}+\frac{|\xi_2|^2}{\lambda_2}
\le\frac1c(|\xi_1|^2+|\xi_2|^2).
$$

中央が $L_h$ の主係数二次形式であり、定数は点や時刻に依存しない。だが成分の値が一様な範囲にあることは、異なる点の間での変動率を制限しない。例えば単純な関数 $b_k(x)=1+\tfrac14\sin(kx)$ は値が $3/4$ と $5/4$ の間にあっても $k$ とともに振動が速くなる。よってHölder半ノルムの評価は別途必要である。
<!-- solution-end -->

### Level C

#### YAU1-09-C01 大域二階評価を白紙から閉じる
- Level: C

境界のないコンパクト連結Kähler多様体 $(X,\omega)$（複素次元 $n\ge1$）上の滑らかな許容ポテンシャル $\varphi$ が $\omega_\varphi^n=\rho\omega^n$ を満たし、$m\le\rho\le M$、$\|\varphi\|_\infty\le C_0$、$L_\varphi\log S\ge-BT-C_1$（$B,C_1\ge0$）を仮定する。$S=\operatorname{tr}_\omega\omega_\varphi$、$T=\operatorname{tr}_{\omega_\varphi}\omega$ であり、$A>0$ に対して $Q_A=\log S-A\varphi$ と置く。$Q_A$ の極大点で $L_\varphi Q_A\le0$ とするところから双側計量評価まで、係数 $A$、最大点の $D$、全点の $K$、$c,C$ を明示して証明せよ。

<!-- solution-start -->
**詳細解答。** $A=B+1$ とし、[補助関数](#def-yau1-09-auxiliary) $Q_A=\log S-A\varphi$ を作る。許容性から $S>0$、コンパクト性から最大点 $p$ がある。$L_\varphi\varphi=n-T$ は $h^{i\bar j}(h_{i\bar j}-g_{i\bar j})$ の縮約で従う。したがって

$$
\begin{aligned}
0&\ge L_\varphi Q_A(p)\\
&\ge-BT(p)-C_1-A(n-T(p))\\
&=(A-B)T(p)-(C_1+An).
\end{aligned}
$$

$A-B=1$ なので $T(p)\le D:=C_1+n(B+1)$。逆跡は正の逆固有値の和だから各 $\lambda_i(p)^{-1}\le D$、つまり $\lambda_i(p)\ge1/D$。積 $\prod_i\lambda_i(p)=\rho(p)\le M$ と組み合わせ、

$$
\lambda_i(p)
=\frac{\rho(p)}{\prod_{j\ne i}\lambda_j(p)}
\le MD^{n-1},\qquad
S(p)\le nMD^{n-1}.
$$

$Q_A(x)\le Q_A(p)$ から $\log S(x)\le\log S(p)+A(\varphi(x)-\varphi(p))$。$|\varphi|\le C_0$ なので

$$
S(x)\le K:=nMD^{n-1}e^{2AC_0}
$$

が全点で成立する。次に $\prod_i\lambda_i(x)=\rho(x)\ge m$、各 $\lambda_j(x)\le S(x)\le K$ だから

$$
\lambda_i(x)\ge\frac{m}{\prod_{j\ne i}\lambda_j(x)}
\ge\frac{m}{K^{n-1}}.
$$

したがって $c=m/K^{n-1}$、$C=K$ で $c\omega\le\omega_\varphi\le C\omega$。最大点の $T$ の上界を全点に移すという誤りは犯していない。全点へ移したのは $Q_A$ の**最大値の比較による $S$ の上界**である。
<!-- solution-end -->

#### YAU1-09-C02 パスの一様性と不足する正則性
- Level: C

複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体 $(X,\omega)$ と、$\int_Xe^F\omega^n=\int_X\omega^n$ を満たす滑らかな実関数 $F$ を固定する。$\rho_t=1-t+te^F$、$H_t=\log\rho_t$ とする。(i) $m,M$ と $\|L_\omega H_t\|_\infty$ の $t$ に依存しない上界を計算せよ。(ii) 解が存在する各 $t$ で $C^0$ 評価と局所対数跡不等式が成立するなら、最大値原理の定数が $t$ に依存しない理由を説明せよ。(iii) それだけでは $C^{2,\alpha}$ 評価や三階評価を主張できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $u=e^F>0$ と置くと $u$ はコンパクトな $X$ 上で正の最小値を持つ。従って

$$
m:=\min\{1,\min_Xu\}>0,\qquad
M:=\max\{1,\max_Xu\}
$$

は固定定数である。$0\le t\le1$ と $m\le1,u\le M$ から $(1-t)m+tm\le(1-t)\cdot1+t u\le(1-t)M+tM$、ゆえに $m\le\rho_t\le M$。$t$ は $X$ に関して定数なので

$$
\partial_i\rho_t=t\partial_i u,\qquad
\partial_i\partial_{\bar j}\rho_t=t\partial_i\partial_{\bar j}u.
$$

$H_t=\log\rho_t$ を二回微分すると

$$
\partial_i\partial_{\bar j}H_t
=\frac{t\,\partial_i\partial_{\bar j}u}{\rho_t}
-\frac{t^2\,\partial_i u\,\partial_{\bar j}u}{\rho_t^2}.
$$

背景計量の逆成分で縮約して

$$
|L_\omega H_t|
\le\frac{\|L_\omega u\|_\infty}{m}
+\frac{\||\partial u|_\omega^2\|_\infty}{m^2}
=:E.
$$

ここまでの定数はすべて $F,\omega$ にしか依存しない。[前章の局所不等式](../YAU1-08/index.md#cor-yau1-08-path)で必要な背景曲率の上界もコンパクトな固定 $\omega$ に依存するのみなので、同じ $B,C_1$ が全時刻に使える。[Moser反復の評価](../YAU1-07/index.md#thm-yau1-07-moser)の $C_0$ も固定入力による一様定数である。したがって[大域二階評価](#thm-yau1-09-global-second-order)の

$$
A=B+1,\quad D=C_1+nA,\quad
K=nMD^{n-1}e^{2AC_0},\quad
c=m/K^{n-1},\quad C=K
$$

はすべて時刻に依存しない。ただし局所下界と $C^0$ 評価を利用できるのは**解が存在する時刻**に限る。存在が未証明の時刻へ評価を先取りしてはならない。

最後に、この評価は $c\,g\le h_t\le C\,g$ という主係数の値の制約を与えるが、$h_t$ の点間変動や微分はまだ制御しない。Schauder評価に必要な係数のHölder制御、古典的証明での三階微分の評価は次章以降の別の議論である。$\square$
<!-- solution-end -->

## 8. 次章への橋

ここまでで、存在する全てのパス解に対し $C^0$ と複素Hessianの双側評価が同じ定数で閉じた。[線形化作用素](../YAU1-03/index.md#prop-yau1-03-linearization)は一様楕円的になったが、係数の微分制御はまだない。次章YAU1-10では、背景計量に関する接続差の平方を用いた **Calabi型三階評価** を構成する。

### 参考文献

- V. V. Datar, *Lecture Notes on Calabi's Conjectures and Kähler–Einstein Metrics*, 二階評価と最大値原理の節。
- Z. Błocki, *The Complex Monge–Ampère Equation on Compact Kähler Manifolds*, $C^2$ 評価の節。
- T. Collins, *Geometry of the Complex Monge–Ampère Equation*, 二階評価と高階評価への接続。
