# MQFC14 Wick積と発散する自己収縮

[MQFC13](../MQFC13/index.md) では、周波数制限を外すと一点の分散が二次元ですでに発散することを見た。相互作用を作るには場の四乗などを積分したい。しかし分布として存在する場には一般に一点の値がない。まず有限の分散を持つ正規確率変数で積を作り直し、次にその積を空間で平均した量が極限を持つか調べる。

直接の前提は [MQFC5](../MQFC5/index.md)、[MQFC6](../MQFC6/index.md)、[MQFC7](../MQFC7/index.md)、[MQFC13](../MQFC13/index.md)。質量は $m>0$、次元は主に Euclid 空間の $d=2,3$ とする。

## 1. 自分自身との対を取り除く

中心化正規確率変数 $X$ の分散を $a$ とする。[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) によれば $E[X^4]=3a^2$。分散が大きくなると平均だけでも発散する。さらに二つの測定の積を平均したとき、同じ測定内で組を作る寄与もある。これを自己収縮と呼ぶ。四乗から単に平均を引くだけでは二本分の自己収縮が残る。そこで指数関数から自己収縮を打ち消す係数を組織的に作る。

<a id="def-mqfc14-wick"></a>

<!-- formal-statement-start -->
> **定義（Gaussian Wick多項式）**
> $a\ge0$、$u\in\mathbb R$、整数 $n\ge0$ とする。多項式 $W_n(u;a)$ を次の母関数の係数で定める。

$$
e^{tu-at^2/2}=\sum_{n=0}^{\infty}\frac{t^n}{n!}W_n(u;a).
$$

> 分散 $a$ の中心化正規確率変数 $X$ に対して $:X^n:_a=W_n(X;a)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc14-wick -->
### 直接例

$a=2$、$X$ を平均0、分散2の正規確率変数とする。$e^{tu}$ と $e^{-t^2}$ の級数を掛けると、$t^2$ の係数は $u^2/2-1$、$t^4$ の係数は $u^4/24-u^2/2+1/2$。従って $W_2(u;2)=u^2-2$、$W_4(u;2)=u^4-12u^2+12$。**定義の確認**：これらは実多項式であり、母関数の指定係数にそれぞれ $2!,4!$ を掛けた値である。$EX^2=2$、$EX^4=12$ を代入すれば両者の期待値は0になる。
<!-- definition-example-end -->

一般に、指数の二因子を展開して $t^{n-2k}t^{2k}$ を集めると

$$
W_n(u;a)=n!\sum_{k=0}^{\lfloor n/2\rfloor}
\frac{(-a/2)^k u^{n-2k}}{k!(n-2k)!}.
$$

最初の五つは

$$
\begin{aligned}
W_0&=1,\quad W_1=u,\\
W_2&=u^2-a,\quad W_3=u^3-3au,\\
W_4&=u^4-6au^2+3a^2.
\end{aligned}
$$

四乗の補正 $-6au^2$ は四つの位置から一対を選ぶ6通りに対応する。二対を選んだ3通りが定数 $3a^2$ を与える。$a=0$ の場合は $W_n=u^n$ となる。

## 2. 異なる点の積だけが残る理由

二つの中心化正規測定 $X,Y$ を同じ確率空間上で取り、その共分散を $c$ とする。Wick多項式の期待値を計算すると、次数が違う項は直交し、同じ次数では異なる測定を結ぶ対だけが残る。これが後で二乗平均を評価する鍵になる。

<a id="thm-mqfc14-wick-covariance"></a>

<!-- formal-statement-start -->
> **定理（Wick多項式の混合二次モーメント）**
> $(X,Y)$ は退化も許す中心化実Gaussianベクトルで、分散はそれぞれ $a,b$、共分散は $c$ とする。非負整数 $n,k$ について

$$
E[W_n(X;a)W_k(Y;b)]
=\begin{cases}n!c^n& n=k,\\0&n\ne k.\end{cases}
$$

> $n=k=0$ の値は1とする。
<!-- formal-statement-end -->

### 証明の見取り図

母関数を二つ掛けて平均する。Gaussianの指数モーメントに現れる $at^2/2,bs^2/2$ はそれぞれ打ち消され、$cts$ だけが残る。このため $t$ と $s$ の次数は必ず一致する。

<!-- proof-start -->
### 証明

[有限次元Gaussian積分と特性関数](../MQFC6/index.md#thm-mqfc6-finite-gaussian) の正規変数を独立な標準正規変数の線形結合で表す方法を使う。$tX+sY$ は中心化正規変数で、分散は $at^2+2cts+bs^2$ である。分散 $v>0$ の正規密度に $e^z$ を掛けると $z-z^2/(2v)=-(z-v)^2/(2v)+v/2$ となるため、その積分は $e^{v/2}$。$v=0$ なら変数は0で同じ式になる。従って

$$
\begin{aligned}
E[e^{tX-at^2/2}e^{sY-bs^2/2}]
&=e^{-at^2/2-bs^2/2}E[e^{tX+sY}]\\
&=e^{cts}
=\sum_{j=0}^\infty \frac{c^jt^js^j}{j!}.
\end{aligned}
$$

原点近傍で任意の有限回微分を期待値内に移せる。実際、微分の絶対値はある定数と多項式で重み付けた $e^{R(|X|+|Y|)}$ で抑えられる。Cauchy–Schwarzの不等式と正規密度の二次減衰からその期待値は有限である（退化した周辺変数は0）。

$t$ を $n$ 回、$s$ を $k$ 回微分して原点に代入する。左辺は定義によって求める期待値となる。右辺では $j=n=k$ の項だけが残り、$n!k!c^n/n!=n!c^n$。次数が違うと残る項がない。
<!-- proof-end -->

$Y=X$ とすれば $E[W_n(X;a)^2]=n!a^n$。従って自己収縮を除いても、分散 $a$ が発散する一点で二乗平均が有限になるわけではない。$k=0$ とすれば $n\ge1$ の平均は0。例えば $a=b=1,c=1/2$ のとき、二次の混合二次モーメントは $2c^2=1/2$ になる。

## 3. 切断の発散と共分散核の短距離特異性

[有限体積・周波数切断](../MQFC13/index.md#def-mqfc13-cutoff) の体積制限を先に外し、半径 $\Lambda$ の周波数球で切断すると、点分散は

$$
a_\Lambda=(2\pi)^{-d}\int_{|p|\le\Lambda}
\frac{dp}{|p|^2+m^2}.
$$

二次元では角度積分が $2\pi$、三次元では $4\pi$ なので

$$
\begin{aligned}
a_\Lambda^{(2)}&=\frac1{4\pi}\log(1+\Lambda^2/m^2),\\
a_\Lambda^{(3)}&=\frac1{2\pi^2}
\bigl(\Lambda-m\arctan(\Lambda/m)\bigr).
\end{aligned}
$$

後者では $r^2/(r^2+m^2)=1-m^2/(r^2+m^2)$ を積分した。二次元は対数、三次元は一次で発散する。一点でなく異なる二点の距離を調べるため、ここからは滑らかな空間平均で正則化する。

[質量付き逆核の熱核積分表示](../MQFC5/index.md#thm-mqfc5-heat-resolvent) による共分散核は $z\ne0$ で

$$
C_d(z)=\int_0^\infty (4\pi t)^{-d/2}
e^{-m^2t-|z|^2/(4t)}\,dt.
$$

これは非負であり、距離 $r=|z|$ の関数である。

<a id="prop-mqfc14-singularity"></a>

<!-- formal-statement-start -->
> **命題（自由共分散核の短距離評価）**
> $m>0$ とする。ある正定数 $A,B$ が存在し、$0<r=|z|\le1/2$ で次が成り立つ。

$$
\begin{aligned}
A(1+|\log r|)&\le C_2(z)\le B(1+|\log r|),\\
A/r&\le C_3(z)\le B/r.
\end{aligned}
$$

> 各核は原点以外で連続である。
<!-- formal-statement-end -->

### 証明の見取り図

熱核の積分を短時間と長時間に分ける。短時間で $t$ が $r^2$ より小さい部分は指数で抑えられる。$r^2$ から1までの積分が対数または逆距離を生む。

<!-- proof-start -->
### 証明

二次元では $4\pi C_2=\int_0^\infty t^{-1}e^{-m^2t-r^2/(4t)}dt$。区間 $(0,r^2)$ で $u=r^2/(4t)$ と置くと $dt/t=-du/u$ であり、積分は $\int_{1/4}^\infty e^{-u}du/u$ 以下。$(r^2,1)$ では指数を1で抑えれば $2|\log r|$ 以下。$(1,\infty)$ では $\int_1^\infty e^{-m^2t}dt$ 以下である。下界は $(r^2,1)$ のみから得る。この区間で $m^2t\le m^2$、$r^2/(4t)\le1/4$ なので

$$
4\pi C_2(z)\ge e^{-m^2-1/4}\,2|\log r|.
$$

$r\le1/2$ では $|\log r|\ge\log2$ だから $1+|\log r|$ と定数倍の範囲で比較できる。

三次元では同じ置換により $t^{-3/2}dt=-2u^{-1/2}du/r$。質量因子を1で抑えると

$$
C_3(z)\le \frac{2}{(4\pi)^{3/2}r}
\int_0^\infty u^{-1/2}e^{-u}\,du.
$$

積分は0付近で $u^{-1/2}$、無限遠で指数減衰により有限。下界は $t\in[r^2,2r^2]$ で取る。ここで指数は $e^{-m^2/2-1/4}$ 以上であり、

$$
\int_{r^2}^{2r^2}t^{-3/2}dt
=\frac{2(1-1/\sqrt2)}r.
$$

これで両評価が得られる。原点から離れた任意のコンパクト集合上では、熱核積分の被積分関数を $t$ が0に近いところで $t^{-d/2}e^{-\delta^2/(4t)}$、無限遠で $t^{-d/2}e^{-m^2t}$ により一様に支配できる。ここで $\delta>0$ は原点までの最短距離である。支配収束により連続性が従う。
<!-- proof-end -->

局所的な $n$ 乗可積分性を比べよう。半径1/2の球で二次元なら動径積分は $\int_0^{1/2}r(1+|\log r|)^n dr$。$r=e^{-u}$ と変数変換すれば $\int_{\log2}^\infty e^{-2u}(1+u)^n du$ となり、任意の有限次数で有限になる。三次元なら $\int_0^{1/2}r^{2-n}dr$ と比較でき、整数 $n\ge1$ では $n=1,2$ のときだけ有限。$n=3$ では対数発散、$n>3$ では冪発散である。

## 4. 同じ自由場から滑らかな近似を作る

[質量付きEuclid自由場のGaussian測度の構成](../MQFC6/index.md#thm-mqfc6-free-measure) で得た実緩増加分布 $\Phi$ を一つ固定する。滑らかな非負偶関数 $\rho$ を単位球内に支持を持つように選び、積分を1にする。$\rho_\epsilon(z)=\epsilon^{-d}\rho(z/\epsilon)$ と置けば積分は1のまま、支持は半径 $\epsilon$ の球に縮む。場の平均

$$
X_\epsilon(x)=\Phi(\rho_\epsilon(x-\cdot))
$$

は同じ確率空間上の実Gaussian変数であり、$x$ について滑らかになる（試験関数の平行移動の微分を分布に作用させる）。共分散は [Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) を二つの平行移動へ適用して得る。

$$
C_{\epsilon,\eta}(x-y)
=E[X_\epsilon(x)X_\eta(y)]
=(C_d*\rho_\epsilon*\rho_\eta)(x-y).
$$

偶関数を選んだので反転は不要である。$a_\epsilon=C_{\epsilon,\epsilon}(0)$ は有限で $x$ に依存しない。熱核評価により核は局所可積分なので畳み込みは有限。ここから空間で平均したWick多項式を作る。$f$ は実滑らかなコンパクト支持関数とする。

<a id="def-mqfc14-smeared-wick"></a>

<!-- formal-statement-start -->
> **定義（正則化したWick積の試験関数測定）**
> 上記の自由場と平均核に対し、$\epsilon>0$、整数 $n\ge1$、実 $f\in C_c^\infty(\mathbb R^d)$ の測定を

$$
V_{\epsilon,n}(f)=\int_{\mathbb R^d}
f(x)W_n(X_\epsilon(x);a_\epsilon)\,dx
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc14-smeared-wick -->
### 直接例

$d=2,n=2$、$f=\rho$ とする。$X_\epsilon(x)$ は実滑らかな関数なので、コンパクト支持上の $f(x)(X_\epsilon(x)^2-a_\epsilon)$ は各実現で可積分。**定義の確認**：点ごとの分散が $a_\epsilon$ であることから [Wick多項式](#def-mqfc14-wick) の二次式を正しく使っている。$f$ の積分は1なので測定は $\int\rho(x)X_\epsilon(x)^2dx-a_\epsilon$。平均は0である。実際 $E|W_2|\le\sqrt2 a_\epsilon$ で積分可能な一様上界を持つから、期待値と空間積分を交換できる。
<!-- definition-example-end -->

## 5. 二乗平均で積の極限を構成する

一点では発散していても、測定の二乗平均は二点間の共分散の積分で決まる。原点近くの特異性が可積分なら極限が得られる。

<a id="thm-mqfc14-smeared-limit"></a>

<!-- formal-statement-start -->
> **定理（Wick積の二乗平均極限）**
> $d=2$ で任意の整数 $n\ge1$、または $d=3$ で $n=1,2$ とする。実コンパクト支持の滑らかな $f$ に対し $V_{\epsilon,n}(f)$ は $\epsilon\downarrow0$ で $L^2$ に収束する。極限を $V_n(f)$ と書く。異なる許容平均核を選んでも同じ極限となり、実 $f,g$ について

$$
E[V_n(f)V_n(g)]
=n!\int f(x)g(y)C_d(x-y)^n\,dx\,dy.
$$

> 写像 $f\mapsto V_n(f)$ は線形で、各固定コンパクト支持集合上で $f$ の一様ノルムについて連続である。
<!-- formal-statement-end -->

### 証明の見取り図

[Wick多項式の混合二次モーメント](#thm-mqfc14-wick-covariance) により異なる正則化間の内積が $n!C_{\epsilon,\eta}^n$ の積分になる。この核が $C_d^n$ に局所積分で収束すれば、二つの正則化の差の二乗平均が0に近づく。共通の確率空間を使うことが重要である。

<!-- proof-start -->
### 証明

まず有限の $\epsilon,\eta$ を固定する。点ごとの $W_n$ の二乗平均は $n!a_\epsilon^n$ と $n!a_\eta^n$ である。Cauchy–Schwarzにより積の絶対期待値は $n!(a_\epsilon a_\eta)^{n/2}$ 以下なので、コンパクト支持上の積分と期待値を交換できる。[混合二次モーメント](#thm-mqfc14-wick-covariance) に $X=X_\epsilon(x),Y=X_\eta(y)$ を入れれば

$$
E[V_{\epsilon,n}(f)V_{\eta,n}(g)]
=n!\int f(x)g(y)C_{\epsilon,\eta}(x-y)^n\,dx\,dy.
$$

次に任意の有界球 $B_R$ 上で $C_{\epsilon,\eta}\to C_d$ が $L^n$ で成り立つことを示す。[短距離評価](#prop-mqfc14-singularity) に続く動径積分から $C_d^n$ は有界球で可積分である。

$\kappa=\rho_\epsilon*\rho_\eta$ は非負で積分1、支持半径 $h=\epsilon+\eta$ の平均核である。

$h<\delta$ とし、確率測度 $\kappa(w)dw$ に関して $n>1$ なら Hölder の不等式を関数 $|C_d(z-w)|$ と定数1に適用する。後者の $n/(n-1)$ ノルムは1なので、平均の絶対値の $n$ 乗は絶対値の $n$ 乗の平均以下になる。

$n=1$ なら積分の三角不等式である。これを積分して

$$
\begin{aligned}
\int_{|z|<\delta}|C_d*\kappa(z)|^n dz
&\le\int \kappa(w)
\int_{|z|<\delta}|C_d(z-w)|^n dz\,dw\\
&\le\int_{|u|<2\delta}|C_d(u)|^n du.
\end{aligned}
$$

右辺は $\delta\downarrow0$ で0へ行く。従って $|C_d*\kappa-C_d|^n$ の原点付近の積分も $2^{n-1}$ 倍の二つの積分の和で小さくできる。残りの $\delta\le |z|\le R$ では $h<\delta/2$ とすれば、移動先は原点を離れたコンパクト集合に入る。核の一様連続性により平均と元の値との差は一様に0へ収束する。以上を合わせて局所 $L^n$ 収束が得られる。

$n=1$ ではこれがそのまま核の収束である。$n\ge2$ では $A=C_{\epsilon,\eta},B=C_d$ に対し

$$
|A^n-B^n|\le n|A-B|(A+B)^{n-1}.
$$

Hölderの不等式の指数を $n,n/(n-1)$ として $B_R$ で積分すると

$$
\|A^n-B^n\|_1\le
n\|A-B\|_n(\|A\|_n+\|B\|_n)^{n-1}.
$$

右辺の第一因子は0に収束し第二因子は有界なので、$n$ 乗の局所 $L^1$ 収束が従う。$f,g$ の支持を共に半径 $R$ の球に含め、$z=x-y$ に変数変換する。差の積分の絶対値は

$$
\|f\|_1\|g\|_\infty
\int_{B_{2R}}|C_{\epsilon,\eta}(z)^n-C_d(z)^n|\,dz
$$

以下である。このため混合二次モーメントは $\epsilon,\eta$ を独立に0へ近づけても指定の積分へ収束する。

$f=g$ として差のノルムを展開する。

$$
\begin{aligned}
\|V_{\epsilon,n}(f)-V_{\eta,n}(f)\|_2^2
&=E[V_{\epsilon,n}(f)^2]+E[V_{\eta,n}(f)^2]\\
&\quad-2E[V_{\epsilon,n}(f)V_{\eta,n}(f)].
\end{aligned}
$$

三項は同じ有限積分（最後はその $-2$ 倍）へ収束するので和は0へ行く。$L^2$ の完備性により極限が存在する。二つの異なる平均核の畳み込みも非負、積分1、支持半径が0へ縮むので、同じ差の計算で核の選択に依存しない。内積は $L^2$ 収束で連続だから極限の共分散式が従う。

線形性は有限正則化の線形性と $L^2$ 極限から従う。支持が $B_R$ の $f$ に対して

$$
\|V_n(f)\|_2^2\le n!|B_R|\|f\|_\infty^2
\int_{B_{2R}}C_d(z)^n\,dz.
$$

これで固定支持上の連続性も得られた。
<!-- proof-end -->

この定理で得たのは試験関数を入れると $L^2$ の確率変数が返る線形連続な分布的な測定である。すべての試験関数に対する同時の標本分布としての実現とは区別する（[MQFC13の極限の議論](../MQFC13/index.md#thm-mqfc13-moment-tight)）。二次元では四次も含む全有限次数の測定が構成できる。例えば $V_4(f)$ の二乗平均は $24\int f(x)f(y)C_2(x-y)^4dxdy$ である。

三次元の $n\ge3$ はどうなるか。非負の滑らかな $f$ がある球 $B$ 上で $f\ge b>0$ とする。$C_{\epsilon,\epsilon}(z)$ は非負で、$z\ne0$ では $C_3(z)$ に収束する。Fatouの補題を二乗平均の積分に適用すると

$$
\liminf_{\epsilon\downarrow0} E[V_{\epsilon,n}(f)^2]
\ge n!\int f(x)f(y)C_3(x-y)^n\,dx\,dy.
$$

球 $B$ の半分の半径の同心球に $x$ を取り、$y=x-z$ で $|z|$ をその半径未満に制限すれば $x,y\in B$。従って右辺は正定数倍の $\int_0^\delta r^{2-n}dr$ 以上で無限大になる。この具体的な測定では二乗平均極限が存在しない。三次元の相互作用場の構成には追加の手段が必要であり、二次元の証明をそのまま移せない。

## 6. 演習

### 演習 MQFC14-A1：母関数の係数

- Level: A

$W_5(u;a)$ を母関数から求めよ。

<!-- solution-start -->
$t^5$ の係数には指数の二因子から次数 $(5,0),(3,2),(1,4)$ の三組だけが寄与する。[Gaussian Wick多項式](#def-mqfc14-wick) より

$$
W_5=5!\left(\frac{u^5}{5!}
-\frac{au^3}{2\cdot3!}
+\frac{a^2u}{8}\right)
=u^5-10au^3+15a^2u.
$$
<!-- solution-end -->

### 演習 MQFC14-A2：直交と分散

- Level: A

$X$ は平均0、分散3の正規変数とする。$W_2(X;3),W_4(X;3)$ の内積とそれぞれの二乗平均を求めよ。

<!-- solution-start -->
[混合二次モーメント](#thm-mqfc14-wick-covariance) に $Y=X$、$a=b=c=3$ を代入する。次数2と4は異なるので内積は0。二乗平均はそれぞれ $2!3^2=18$、$4!3^4=1944$。平均も次数0との内積により0である。
<!-- solution-end -->

### 演習 MQFC14-A3：三次元の点分散

- Level: A

三次元、$m=2$ の周波数球切断の点分散を求め、$a_\Lambda/\Lambda$ の極限を計算せよ。

<!-- solution-start -->
球面積 $4\pi r^2$ を使い

$$
a_\Lambda=\frac{4\pi}{(2\pi)^3}
\int_0^\Lambda\left(1-\frac4{r^2+4}\right)dr.
$$

$r=2u$ と置けば補正項の積分は $2\arctan(\Lambda/2)$。従って $a_\Lambda=(\Lambda-2\arctan(\Lambda/2))/(2\pi^2)$。逆正接は有界だから比の極限は $1/(2\pi^2)$。
<!-- solution-end -->

### 演習 MQFC14-A4：短距離可積分性

- Level: A

三次元の $C_3^2,C_3^3$ の原点近傍での可積分性を判定せよ。

<!-- solution-start -->
[短距離評価](#prop-mqfc14-singularity) により $C_3$ は正定数倍の $r^{-1}$ で上下から抑えられる。球面積因子 $4\pi r^2$ を掛けると二乗は定数倍の $\int_0^\delta 1\,dr=\delta$ で有限。三乗は $\int_0^\delta dr/r$ であり、下端を $s>0$ として $\log\delta-\log s$ が無限大へ行くので発散する。
<!-- solution-end -->

### 演習 MQFC14-B1：平均を引くだけでは不十分

- Level: B

中心化Gaussianベクトル $(X,Y)$ の分散を $a,b$、共分散を $c$ とする。$X^4-3a^2$ と $Y^4-3b^2$ の内積を計算し、四次Wick多項式の内積と比較せよ。

<!-- solution-start -->
[Gaussian Wick多項式](#def-mqfc14-wick) の展開式から

$$
X^4-3a^2=W_4(X;a)+6aW_2(X;a).
$$

$Y$ 側は $W_4(Y;b)+6bW_2(Y;b)$。掛けると四項になるが、[混合二次モーメント](#thm-mqfc14-wick-covariance) で異なる次数の二項は0、四次同士は $24c^4$、二次同士は $36ab\cdot2c^2$ となる。合計は $24c^4+72abc^2$。Wick多項式同士なら $24c^4$ のみである。$c\ne0$ を固定して $a,b$ が増えると残った自己収縮による第二項は発散する。
<!-- solution-end -->

### 演習 MQFC14-B2：平均核の選択と二乗平均

- Level: B

同じ二次元自由場を二種類の平均核 $\rho_\epsilon,\sigma_\eta$ で測定し、三次のWick積を作る。両者の差の二乗平均を共分散で表し、0への収束を示せ。

<!-- solution-start -->
$C_{\rho\rho}=C_2*\rho_\epsilon*\rho_\epsilon$、$C_{\sigma\sigma}=C_2*\sigma_\eta*\sigma_\eta$、$C_{\rho\sigma}=C_2*\rho_\epsilon*\sigma_\eta$ と置く。全ての平均核は非負偶関数、積分1で支持が縮むとする。[混合二次モーメント](#thm-mqfc14-wick-covariance) を各組に使い差の二乗を展開すると

$$
6\int f(x)f(y)
\bigl(C_{\rho\rho}^3+C_{\sigma\sigma}^3
-2C_{\rho\sigma}^3\bigr)(x-y)\,dx\,dy.
$$

[Wick積の二乗平均極限](#thm-mqfc14-smeared-limit) の核の評価では三種とも局所 $L^3$ で $C_2$ に収束する。$|A^3-B^3|\le3|A-B|(A+B)^2$ と Hölder の指数 $3,3/2$ で三乗は局所 $L^1$ に収束する。支持の差集合は有界なので各積分は同じ $6\int f(x)f(y)C_2(x-y)^3dxdy$ に収束し、係数 $1+1-2=0$ により差のノルムが0になる。
<!-- solution-end -->

### 演習 MQFC14-B3：三次元の四次測定

- Level: B

三次元で非負の $f$ が原点付近の球で1であるとする。四次の正則化Wick積の二乗平均が発散することを示せ。

<!-- solution-start -->
[混合二次モーメント](#thm-mqfc14-wick-covariance) から二乗平均は $24\int f(x)f(y)C_{\epsilon,\epsilon}(x-y)^4dxdy$。非負なので Fatou の補題が適用でき、下極限は $24\int f(x)f(y)C_3(x-y)^4dxdy$ 以上。$f=1$ の半径 $r_0$ の球内で $|x|<r_0/2$、$|z|=|x-y|<\delta=\min(r_0/2,1/2)$ を取ると $f(x)f(y)=1$。 [短距離評価](#prop-mqfc14-singularity) の下界 $A/|z|$ を使うと積分は

$$
24|B_{r_0/2}|\,4\pi A^4\int_0^\delta r^{-2}dr
$$

以上である。下端 $s$ から積分すると $1/s-1/\delta$ で無限大へ向かう。従って二乗平均は発散し、$L^2$ 収束ならノルムは有界になるという必要条件を満たさない。
<!-- solution-end -->

### 演習 MQFC14-B4：補正係数を変えると何が起きるか

- Level: B

$X$ は分散 $a>0$ の中心化正規変数とする。$P(X)=X^4-\alpha aX^2+\beta a^2$ が定数と $W_2(X;a)$ の双方に直交するように $\alpha,\beta$ を定めよ。

<!-- solution-start -->
[Gaussian Wick多項式](#def-mqfc14-wick) から $X^2=W_2+a$、$X^4=W_4+6aW_2+3a^2$。これを代入すると

$$
P=W_4+(6-\alpha)aW_2+(3-\alpha+\beta)a^2.
$$

[混合二次モーメント](#thm-mqfc14-wick-covariance) の直交性から $E[PW_2]=(6-\alpha)a\cdot2a^2$。$a>0$ なのでこれが0となる条件は $\alpha=6$。また $EP=(3-\alpha+\beta)a^2$ だから $\beta=3$。このとき $P=W_4$ である。
<!-- solution-end -->

### 演習 MQFC14-C1：相互作用へ向けた多項式測定

- Level: C

二次元で実滑らかなコンパクト支持関数 $f$ と実数 $\lambda,\mu$ を取り、$U_\epsilon(f)=\lambda V_{\epsilon,4}(f)+\mu V_{\epsilon,2}(f)$ と置く。二乗平均極限の存在とその平均・分散を求めよ。さらにこの結果だけで $E[e^{-U_\epsilon(f)}]$ の収束が従うか考えよ。

<!-- solution-start -->
[Wick積の二乗平均極限](#thm-mqfc14-smeared-limit) に次数4と2を入れる。三角不等式により

$$
\|U_\epsilon-\lambda V_4(f)-\mu V_2(f)\|_2
\le|\lambda|\|V_{\epsilon,4}-V_4\|_2
+|\mu|\|V_{\epsilon,2}-V_2\|_2.
$$

右辺は0へ向かう。各次数の平均は [混合二次モーメント](#thm-mqfc14-wick-covariance) で定数との内積が0であり、$L^2$ 収束から平均も保存される。異なる次数の内積は有限正則化で0、極限でも0。よって極限 $U$ の平均は0、分散は

$$
\begin{aligned}
E[U^2]&=\lambda^2 E[V_4(f)^2]+\mu^2 E[V_2(f)^2]\\
&=\int f(x)f(y)
\bigl(24\lambda^2 C_2(x-y)^4
+2\mu^2 C_2(x-y)^2\bigr)\,dx\,dy.
\end{aligned}
$$

これは有限である。しかし指数関数は非有界であり、二乗平均収束だけでは期待値の収束は従わない。例えば一つの一様確率変数 $T$ を $[0,1]$ 上に取り、$Z_j=-j$ を $T\le j^{-4}$ のとき、残りで0とする。$EZ_j^2=j^{-2}\to0$ なので $Z_j\to0$ は $L^2$ 収束する一方、

$$
E[e^{-Z_j}]=1-j^{-4}+j^{-4}e^j\to\infty.
$$

指数重みの尾部評価は別に必要である。この例は自由場のWick積そのものの反例ではなく、二乗平均収束のみから指数重みの収束を推論することへの反例である。
<!-- solution-end -->

## 7. 次の講義

Wick多項式は同じ点の自己収縮を取り除き、二次元では任意の有限次数について試験関数測定の二乗平均極限を作れる。三次元では三次以上の同じ構成が二乗平均で破綻する。次講では二次元で下に有界な多項式から相互作用の重みを作る。指数重みの正規化と切断除去に必要な評価は、今回の二乗平均評価とは異なる。
