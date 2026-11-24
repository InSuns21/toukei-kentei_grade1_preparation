# AFR4 Whittaker係数・Bessel関数

前講では、カスプで横方向の平均を消すと二乗積分の尾部が小さくなることを学びました。今回は平均以外の各振動が、実際にどんな速さで小さくなるかを求めます。正則モジュラー形式では指数関数が現れましたが、Maass形式では固有値によって高さ方向の形が変わります。その形を一つの特殊関数で表し、最後に群上の積分として読み替えます。

<!-- definition-example-audit: strict -->

## 1. 横方向の振動と高さ方向の方程式

$z=x+iy$（$y>0$）とし、[重さ0のMaass形式](../AFR2/index.md#def-afr2-maass) $u$ の固有値を $\lambda$ とします。記号 $a_n(y)$ は整数 $n$ に対する横方向のFourier係数です。

$a_n''(y)=d^2a_n(y)/dy^2$ と書きます。Maass形式の不変性を平行移動 $z\mapsto z+1$ に適用すると、$u$ は $x$ について周期1です。[周期方向のFourier展開と係数方程式](../AFR2/index.md#thm-afr2-fourier-equation)から

$$
a_n(y)=\int_0^1 u(x+iy)e^{-2\pi inx}\,dx,\qquad
a_n''+\left(\frac{\lambda}{y^2}-4\pi^2n^2\right)a_n=0.
$$

定数項 $n=0$ は[定数項の一般解](../AFR2/index.md#prop-afr2-zero-mode)で求めました。今回は $n\ne0$ とします。

周波数が高いほど高さ方向の変化も速くなるので、

$$
c=2\pi|n|,\qquad t=cy
$$

として高さを伸縮します。さらに $y^{1/2}$ を係数から取り出すと、一次微分の係数が $1/t$ となり標準的な方程式に帰着します。

次数を表す複素数 $\nu$ は次式で決めます。

$$
\nu^2=\frac14-\lambda.
$$

得られる方程式を変形Bessel方程式と呼び、まず変換の同値性を確かめます。以下、$a$ のプライムは高さ $y$ による常微分、$b$ のプライムは伸縮後の変数 $t$ による常微分です。

<a id="thm-afr4-bessel-reduction"></a>
<!-- formal-statement-start -->
> **定理（非零周波数の係数方程式の変換）**  
> $n\in\mathbb Z\setminus\{0\}$、$\lambda\in\mathbb C$、$c=2\pi|n|$、$\nu^2=1/4-\lambda$ とする。$a$ を $(0,\infty)$ 上の二階連続微分可能な複素関数とし、$a(y)=\sqrt y\,b(cy)$ と置く。このとき
>
$$
a''(y)+(\lambda/y^2-c^2)a(y)=0
$$
>
> が全ての $y>0$ で成立することと
>
$$
t^2b''(t)+tb'(t)-(t^2+\nu^2)b(t)=0
\qquad(t>0)
$$
>
> が成立することは同値である。後者が次数 $\nu$ の変形Bessel方程式である。
<!-- formal-statement-end -->

### 証明の見取り図

高さの伸縮と平方根を掛ける操作はどちらも可逆です。積の微分と連鎖律を二度用い、$y^{1/2}$ の微分で生じる $-1/4$ を固有値へ合わせます。

<!-- proof-start -->
### 証明

$b'$ と $b''$ は $t$ による微分、$a'$ と $a''$ は $y$ による微分です。$dt/dy=c$ なので

$$
a'=\frac{b}{2\sqrt y}+c\sqrt y\,b',
$$

$$
\begin{aligned}
a''&=-\frac{b}{4y^{3/2}}+\frac{c}{2\sqrt y}b'
+\frac{c}{2\sqrt y}b'+c^2\sqrt y\,b''\\
&=-\frac{b}{4y^{3/2}}+\frac{c}{\sqrt y}b'+c^2\sqrt y\,b''.
\end{aligned}
$$

各 $b,b',b''$ は $t=cy$ で評価します。元の左辺に代入して $y^{3/2}$ を掛けると

$$
c^2y^2 b''+cy b'+(\lambda-1/4-c^2y^2)b.
$$

$cy=t$ および $\lambda-1/4=-\nu^2$ により所望の左辺です。$y^{3/2}>0$ であり、$y\mapsto cy$ は正の半直線の全単射なので逆方向も成立します。
<!-- proof-end -->

例えば固有値に応じて次の次数を選べます。

$$
\lambda=0\ \Rightarrow\ \nu=\frac12,\qquad
\lambda=\frac14+r^2\ (r\in\mathbb R)\ \Rightarrow\ \nu=ir.
$$

後者は前講の[カスプから得られる近似固有関数](../AFR3/index.md#thm-afr3-approx-spectrum)で現れた区間スペクトルのパラメータです。どちらの平方根を選んでも方程式は変わりません。

ODE6の[指標根の差とFrobenius解の分岐](../../../解析系/ODE/ODE6/index.md#prop-ode6-root-cases)の例で扱った通常のBessel方程式の $t^2-\nu^2$ に対して、ここでは $t^2$ の符号が反対です。大きな $t$ で振動する解ではなく、指数的に増減する解を探します。

## 2. 無限遠で減衰する関数を積分で作る

方程式だけでは解は一意に定まりません。高さが大きくなると消える解を、次の収束積分で規格化します。$\cosh v=(e^v+e^{-v})/2$、$\sinh v=(e^v-e^{-v})/2$ とします。複素引数でも同じ指数関数の式を使います。

固定した $\nu\in\mathbb C$ と $t>0$ に対し、これから使う積分が存在することを先に確かめます。$v\ge0$ では $\cosh v\ge e^v/2$ です。$A=|\operatorname{Re}\nu|$ と書きます。複素指数関数の絶対値と和の三角不等式を使うと、

$$
|\cosh(\nu v)|
\le \frac{|e^{\nu v}|+|e^{-\nu v}|}{2}
=\frac{e^{v\operatorname{Re}\nu}+e^{-v\operatorname{Re}\nu}}2
\le e^{Av}.
$$

従って

$$
\int_0^\infty |e^{-t\cosh v}\cosh(\nu v)|\,dv
\le \int_1^\infty e^{-tp/2}p^{A-1}\,dp<\infty.
$$

ここで $p=e^v$ は $[0,\infty)$ から $[1,\infty)$ への単調な変数変換で、$dp/dv=p>0$ より $dv=dp/p$ です。最後の積分は $t>0$ による指数減衰がどんな固定のべき乗にも勝つため有限です。この積分で減衰解の候補を定めます。

<a id="def-afr4-k-bessel"></a>
<!-- formal-statement-start -->
> **定義（変形Bessel関数 K）**  
> $\nu\in\mathbb C$、$t>0$ とする。次数 $\nu$ の変形Bessel関数 $K_\nu$ を
>
$$
K_\nu(t)=\int_0^\infty e^{-t\cosh v}\cosh(\nu v)\,dv
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr4-k-bessel -->
**定義の確認**。 $\nu=1/2$、任意の $t>0$ で積分を評価します。$w=\sinh(v/2)$ と置きます。$dw/dv=\cosh(v/2)/2>0$ なので一対一の置換積分ができ、

$$
\cosh v=1+2w^2,\qquad
dw=\tfrac12\cosh(v/2)\,dv.
$$

$v=0$ で $w=0$、$v\to\infty$ で $w\to\infty$ です。従って

$$
K_{1/2}(t)=2e^{-t}\int_0^\infty e^{-2tw^2}\,dw
=\sqrt{\frac{\pi}{2t}}e^{-t}.
$$

最後の積分は $q=\sqrt{2t}\,w$ と置き、$dw=dq/\sqrt{2t}$ として計算しました。Gaussian積分の値は、$I=\int_0^\infty e^{-q^2}dq$ と置いて積分の二乗を第一象限の極座標（半径 $r$、角度 $\theta$、面積要素 $r\,dr\,d\theta$）に直せば確認できます。

$$
I^2=\int_0^{\pi/2}\int_0^\infty e^{-r^2}r\,dr\,d\theta
=\frac{\pi}{2}\cdot\frac12=\frac{\pi}{4}.
$$

$I>0$ なので $I=\sqrt\pi/2$ です。有限で正の値が定まり、確かに $t$ が増えると減衰します。
<!-- definition-example-end -->

また $\cosh(-\nu v)=\cosh(\nu v)$ なので $K_{-\nu}=K_\nu$ です。

この積分が先ほどの方程式を満たすのは、$t$ で微分した結果を $v$ の微分に置き換えられるためです。$K_\nu'$ と $K_\nu''$ は次数 $\nu$ を固定した引数 $t$ による常微分です。

<a id="thm-afr4-k-equation"></a>
<!-- formal-statement-start -->
> **定理（Kの微分方程式）**  
> 任意の $\nu\in\mathbb C$ について $K_\nu$ は $(0,\infty)$ 上で滑らかであり、
>
$$
t^2K_\nu''+tK_\nu'-(t^2+\nu^2)K_\nu=0
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

積分の指数部分を $v$ で二度微分し、部分積分で二つの微分を $\cosh(\nu v)$ 側へ移します。端点の項が消えることで $\nu^2$ が現れます。

<!-- proof-start -->
### 証明

$t$ を任意の閉区間 $[\alpha,\beta]\subset(0,\infty)$ に制限すると、$t$ に関する $m$ 階微分の絶対値は

$$
e^{-\alpha e^v/2+(m+|\operatorname{Re}\nu|)v}
$$

以下です。これは上と同じ置換で可積分なので、微積分の基本定理で微分の平均として表す差商は、上の評価で微分次数を一つ増やした可積分関数によって抑えられます。[Lebesgueの優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を実部・虚部の差商に適用すれば、各階で微分を積分内へ移せます。

$E(v)=e^{-t\cosh v}$、$h(v)=\cosh(\nu v)$ と置き、ここだけ $E',h'$ を $v$ による微分とします。

$$
E'=-t\sinh v\,E,\qquad
E''=(t^2\sinh^2v-t\cosh v)E.
$$

$K_\nu$ の $t$ 微分を積分内で取ると

$$
t^2K_\nu''+tK_\nu'-t^2K_\nu
=\int_0^\infty E''(v)h(v)\,dv.
$$

実際、積分内で $t$ の微分を一度行うと $-\cosh v$、二度行うと $\cosh^2v$ が $E$ に掛かります。従って三項を合わせた因子は $t^2(\cosh^2v-1)-t\cosh v$ であり、$\cosh^2v-1=\sinh^2v$ によって $E''/E$ と一致します。有限区間 $[0,R]$ で部分積分を二度行うと

$$
\int_0^R E''h\,dv=[E'h-Eh']_0^R+\int_0^R Eh''\,dv.
$$

$v=0$ では $\sinh0=0$ なので $E'(0)=h'(0)=0$ です。$R\to\infty$ では $E$ の超指数的減衰が $h,h',\sinh R$ の指数的増大に勝つため境界項は0に近づきます。$h''=\nu^2h$ なので積分の極限は $\nu^2K_\nu(t)$ です。移項して結論を得ます。
<!-- proof-end -->

## 3. なぜ減衰する解だけが残るか

積分の大きさを決めるのは、$\cosh v$ が最小値1を取る $v=0$ 近傍です。次の極限は規格化定数まで与えます。$f(t)\sim g(t)$ は $g(t)\ne0$ となる十分大きな $t$ で $f(t)/g(t)\to1$ を意味します。

<a id="thm-afr4-k-asymptotic"></a>
<!-- formal-statement-start -->
> **定理（Kの無限遠での漸近形）**  
> 固定した任意の $\nu\in\mathbb C$ について、$t\to\infty$ で
>
$$
K_\nu(t)\sim \sqrt{\frac{\pi}{2t}}e^{-t},
\qquad
K_\nu'(t)\sim-\sqrt{\frac{\pi}{2t}}e^{-t}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$v=w/\sqrt t$ と置いて、減衰の中心付近を拡大します。$\cosh v=1+v^2/2+O(v^4)$ によりGaussian型の積分が残ります。

<!-- proof-start -->
### 証明

[変形Bessel関数 K](#def-afr4-k-bessel)の積分で $v=w/\sqrt t$ と置くと

$$
e^t\sqrt t\,K_\nu(t)
=\int_0^\infty
 e^{-t(\cosh(w/\sqrt t)-1)}\cosh(\nu w/\sqrt t)\,dw.
$$

固定した $w$ では Taylor 展開により $t(\cosh(w/\sqrt t)-1)\to w^2/2$、$\cosh(\nu w/\sqrt t)\to1$ です。全ての実数 $v$ で $\cosh v\ge1+v^2/2$ です。$t\ge1$ なら被積分関数の絶対値は

$$
e^{-w^2/2+|\operatorname{Re}\nu|w}
$$

以下となり、平方完成から可積分です。[Lebesgueの優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を実部・虚部に適用すると極限は $\int_0^\infty e^{-w^2/2}dw=\sqrt{\pi/2}$ です。Gaussian積分は第2節の計算で $q=w/\sqrt2$ と置けば得られます。

[微分方程式の証明](#thm-afr4-k-equation)で正当化した積分内微分を一度行えば、$-K_\nu'(t)$ の積分には追加の $\cosh v$ が掛かります。同じ置換の後で $\cosh(w/\sqrt t)\le e^w$（$t\ge1$）なので、支配関数を $e^{-w^2/2+(|\operatorname{Re}\nu|+1)w}$ に変えれば同じ議論が成立します。点ごとの極限は変わらないので $-K_\nu'$ も同じ漸近形を持ちます。
<!-- proof-end -->

従って十分大きな $T$ を取れば $K_\nu(t)\ne0$（$t\ge T$）です。第二の解を作るため、この範囲で未知関数を $b=K_\nu v$ と置きます。増大解の具体的な規格化を知る必要はなく、指数増大することを示せば十分です。

<a id="thm-afr4-decaying-branch"></a>
<!-- formal-statement-start -->
> **定理（多項式増大条件による解の選択）**  
> $\nu\in\mathbb C$ とし、$b$ が $(0,\infty)$ 上で変形Bessel方程式を満たす二階連続微分可能な関数とする。ある $M\ge0$ と $C>0$ に対して $|b(t)|\le Ct^M$ が十分大きな $t$ で成立するなら、ある $\rho\in\mathbb C$ が存在して
>
$$
b(t)=\rho K_\nu(t)\qquad(t>0)
$$
>
> となる。逆にこの形の解は多項式増大条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

既知の減衰解で割って、残った未知関数の導関数を求めます。増大解は $e^t/\sqrt t$ 型になるため、多項式増大条件を満たしません。

<!-- proof-start -->
### 証明

$K=K_\nu$ と略記し、[漸近形](#thm-afr4-k-asymptotic)から $K$ が零にならない $[T,\infty)$ を選びます。$b=Kv$ を方程式に代入し、[Kの微分方程式](#thm-afr4-k-equation)を使うと

$$
t^2Kv''+(2t^2K'+tK)v'=0.
$$

$t^2K$ で割り、さらに $tK^2$ を掛ければ

$$
(tK^2v')'=tK^2v''+(K^2+2tKK')v'=0.
$$

従って積分定数 $A,B$ を用いて

$$
b(t)=AK(t)+BK(t)\int_T^t\frac{ds}{sK(s)^2}.
$$

$c_0=\sqrt{\pi/2}$ とすると $K(s)\sim c_0e^{-s}/\sqrt s$ なので

$$
\frac1{sK(s)^2}=c_0^{-2}e^{2s}(1+\varepsilon(s)),
\qquad \varepsilon(s)\to0.
$$

任意の $\delta>0$ に対し、ある $S\ge T$ で $|\varepsilon(s)|\le\delta$（$s\ge S$）となります。積分を $S$ で分け、$[T,S]$ の積分を $e^{2t}$ で割った値は0へ近づきます。残りの誤差積分の絶対値は

$$
\left|c_0^{-2}\int_S^t e^{2s}\varepsilon(s)\,ds\right|
\le \frac{\delta}{2c_0^2}(e^{2t}-e^{2S})
$$

です。$\delta$ は任意なので

$$
\int_T^t\frac{ds}{sK(s)^2}\sim\frac{e^{2t}}{2c_0^2}.
$$

従って第二項の $B$ を除く部分は $e^t/(2c_0\sqrt t)$ と漸近的に等しくなります。$B\ne0$ なら第一項の減衰では打ち消せず、$|b(t)|/t^M\to\infty$ です。従って $B=0$ です。

正の半直線では最高階係数 $t^2$ は非零で、正規化した係数は連続です。[連続係数線形高階初期値問題の存在・一意性](../../../解析系/ODE/ODE2/index.md#thm-ode2-linear-ivp)を $t>T$ の一点で、差 $b-AK$ に適用します。係数が複素の場合も、本式の実部・虚部を合わせた実線形一階系に同じ Picard 反復の議論を適用できます。差とその微分の初期値が0なので全ての $t>0$ で差は0です。逆方向は[漸近形](#thm-afr4-k-asymptotic)から従います。
<!-- proof-end -->

例えば $\nu=1/2$ での減衰解は第2節で明示できました。増大解 $t^{-1/2}e^t$ も同じ方程式を満たしますが、増大条件によって除かれます。これは単に「$K$ を選ぶ」という約束ではなく、元の保型形式の条件が解を選び出しているのです。

## 4. Maass形式の展開とカスプでの減衰

以下、$u_x=\partial_xu=\partial u/\partial x$、$u_y=\partial_yu=\partial u/\partial y$ と書きます。偏微分では他方の座標を固定します。$a_n'(y)$ は一変数の高さ係数の常微分です。

<a id="thm-afr4-maass-expansion"></a>
<!-- formal-statement-start -->
> **定理（Maass形式の非零周波数展開）**  
> $u$ を $SL_2(\mathbb Z)$ に対する[重さ0のMaass形式](../AFR2/index.md#def-afr2-maass)とし、固有値を $\lambda$、$\nu^2=1/4-\lambda$ とする。定数 $\rho(n)\in\mathbb C$（$n\in\mathbb Z\setminus\{0\}$）が一意に存在し、各高さ $y>0$ で絶対かつ $x$ に関して一様に
>
$$
u(x+iy)=a_0(y)+\sum_{n\ne0}\rho(n)\sqrt y\,
 K_\nu(2\pi|n|y)e^{2\pi inx}
$$
>
> が成立する。$a_0(y)=\int_0^1u(x+iy)\,dx$ である。
<!-- formal-statement-end -->

### 証明の見取り図

元の関数の一様な多項式増大から各係数も多項式で抑えられます。そのため第3節の解の選択を各整数に適用できます。

<!-- proof-start -->
### 証明

増大条件 $|u(x+iy)|\le Cy^M$（$y\ge1$）より、$|e^{-2\pi inx}|=1$ を使えば $|a_n(y)|\le Cy^M$ です。[係数方程式の変換](#thm-afr4-bessel-reduction)で $b(t)=a_n(t/c)/\sqrt{t/c}$ とすれば、$t\ge c$ で

$$
|b(t)|\le C(t/c)^{M-1/2}.
$$

$c=2\pi|n|>0$ は固定しており、十分大きな $t$ で非負の指数のべき乗によっても抑えられます。[解の選択定理](#thm-afr4-decaying-branch)から $b=\rho(n)K_\nu$ です。十分大きな $t$ で $K_\nu(t)\ne0$ なので $\rho(n)$ は一意です。[Fourier展開と係数方程式](../AFR2/index.md#thm-afr2-fourier-equation)の収束の主張をそのまま使えば、表示した級数も各高さで絶対かつ一様に収束します。
<!-- proof-end -->

一つの項が減衰しても、無限個の和の減衰は自動的には従いません。係数の大きさと高さの増加を同時に制御します。

<a id="thm-afr4-cusp-decay"></a>
<!-- formal-statement-start -->
> **定理（定数項を除いたカスプでの指数減衰）**  
> 上のMaass形式 $u$ に対し、ある $Y\ge1$ と $D>0$ が存在し、全ての $x\in\mathbb R$、$y\ge Y+1$ で
>
$$
|u(x+iy)-a_0(y)|+
|\partial_x u(x+iy)|+
|\partial_y(u(x+iy)-a_0(y))|
\le D e^{-2\pi(y-Y)}
$$
>
> が成立する。特に $a_0\equiv0$ なら $u$ は双曲面積に関して二乗可積分であり、AFR3のエネルギー実現の定義域に属する。
<!-- formal-statement-end -->

### 証明の見取り図

基準高さ $Y$ で係数を測り、それより高い位置では $K$ の上下評価の比を取ります。周波数が大きいほど指数因子が小さくなり、微分によって周波数が一つ増えても和を取れます。

<!-- proof-start -->
### 証明

[漸近形](#thm-afr4-k-asymptotic)から、ある $T>0$、正定数 $L,U$ があり、$t\ge T$ で

$$
L\frac{e^{-t}}{\sqrt t}\le |K_\nu(t)|\le U\frac{e^{-t}}{\sqrt t},
\qquad |K_\nu'(t)|\le U\frac{e^{-t}}{\sqrt t}.
$$

$Y>1$ かつ $2\pi Y\ge T$ とし、$P=\max_{0\le x\le1}|u(x+iY)|$ とします。$|a_n(Y)|\le P$ です。[非零周波数展開](#thm-afr4-maass-expansion)から $c=2\pi|n|$ に対し

$$
a_n(y)=a_n(Y)\frac{\sqrt y K_\nu(cy)}{\sqrt Y K_\nu(cY)}.
$$

分母は絶対値が $L e^{-cY}/\sqrt c$ 以上で非零です。$y\ge Y$ では

$$
|a_n(y)|\le P(U/L)e^{-c(y-Y)}.
$$

分子を $y$ で微分すると $K_\nu(cy)/(2\sqrt y)+c\sqrt y K_\nu'(cy)$ です。同じ上下評価から

$$
|a_n'(y)|\le P(U/L)(1/(2y)+c)e^{-c(y-Y)}.
$$

$x$ 微分の項の絶対値も $c|a_n(y)|$ 以下です。$d=y-Y\ge1$ で $q=e^{-2\pi d}\le e^{-2\pi}$ とすると

$$
\sum_{n\ne0}q^{|n|}=\frac{2q}{1-q},\qquad
\sum_{n\ne0}|n|q^{|n|}=\frac{2q}{(1-q)^2}.
$$

第二式は有限幾何和を微分するか、$\sum_{k\ge1}\sum_{j\ge k}q^j$ を順に足すことで得られます。どちらも $q$ の定数倍以下です。これらの評価は $y\ge Y+1$ で一様なので、級数と二つの一階微分級数が絶対かつ一様に収束します。[微分と極限の交換定理](../../../基礎科目/RA/RA5/index.md#thm-ra5-derivative)を任意の有限閉区間で、他方の変数を固定した有限部分和の実部・虚部に適用します。部分和は一点で収束し、導関数列は一様収束するので、和の一階微分は表示した微分級数に等しくなります。従って主張した評価が成立します。

[標準基本領域](../../MF/MF1/index.md#def-mf1-standard-domain)を $F$ とし、$\Gamma=SL_2(\mathbb Z)$、$\mathbb H=\{x+iy:x\in\mathbb R,\ y>0\}$ として、商空間を $X=\Gamma\backslash\mathbb H$ と書きます。

$a_0\equiv0$ なら $F$ の有限高さ部分では滑らかさから $u$ とその微分は有界です。高さ $Y+1$ 以上では指数減衰を用いて、$|u|^2y^{-2}$ および $|u_x|^2+|u_y|^2$ の積分が有限になります。

[双曲Laplace作用素のエネルギー実現](../AFR3/index.md#def-afr3-energy-realization)の空間 $V$ への所属も確認します。$R>Y+1$ とし、高さ $R$ 以下は1、高さ $2R$ 以上は0となる滑らかな切断を用います。

切断は $0\le\chi\le1$、引数が1以下では1、2以上では0となる滑らかな実関数を選びます。$F$ の $y>1$ の帯にだけ $\chi(y/R)$ を置き、残りは1とします。縦辺では高さが等しく、円弧の近くでは恒等的に1なので、[基本領域の存在と内部での一意性](../../MF/MF1/index.md#thm-mf1-fundamental-domain)に従って軌道に沿って延長すれば商上の滑らかな関数 $\chi_R$ になります。全上半平面で単に高さだけの関数を掛けるわけではありません。$u_R=\chi_Ru$ は滑らかで不変かつコンパクトな台を持ちます。

微分すると、元の微分の尾部に加えて $u\chi'(y/R)/R$ が現れます。その二乗積分は

$$
R^{-2}\|\chi'\|_\infty^2
\int_R^{2R}\int_{-1/2}^{1/2}|u|^2\,dx\,dy
$$

以下で0に近づきます。実際、指数減衰によりこの積分は定数倍の $R^{-2}e^{-4\pi(R-Y)}$ 以下です。また $w_R=u-u_R$ と置くと、$F$ 上で $w_R=(1-\chi_R)u$ です。まだ $u\in V$ を示していないので、ノルムと同じ形の積分を $J(w_R)$ と書きます。

$$
J(w_R)=\int_F (|w_R|^2y^{-2}+|\partial_xw_R|^2+|\partial_yw_R|^2)\,dx\,dy.
$$

右辺のうち $1-\chi_R$ が掛かる項は $y\ge R$ の可積分な尾部で抑えられます。高さ方向の微分は

$$
\partial_yw_R=(1-\chi_R)u_y-u\chi'(y/R)/R
$$

です。二項の和の二乗は各二乗の和の2倍以下なので、先ほどの評価と合わせて $J(w_R)\to0$ です。

$u_R-u_S=w_S-w_R$ は $V$ の元であり、各二乗の和を評価すると

$$
\|u_R-u_S\|_V^2\le 2J(w_R)+2J(w_S).
$$

整数 $R\to\infty$ を取れば $u_R$ は $V$ のノルムでCauchy列となり、その $H$ での極限は $u$ です。$V$ は滑らかなコンパクト台の不変関数の完備化なので $u\in V$ です。

コンパクト台の滑らかな試験関数 $v$ に対して、十分大きな $R$ では $u_R=u$ が $v$ の台上で成立します。[エネルギー恒等式](../AFR3/index.md#thm-afr3-green)を $u_R,v$ に適用すると

$$
a(u,v)=a(u_R,v)=(\Delta u_R,v)=(\lambda u,v).
$$

試験関数の $V$ での稠密性により全ての $v\in V$ へ延長できます。実際、$|a(u,v)|\le\|u\|_V\|v\|_V$、$|(\lambda u,v)|\le|\lambda|\|u\|\|v\|_V$ なので両辺は $V$ のノルムで連続です。これは[双曲Laplace作用素のエネルギー実現](../AFR3/index.md#def-afr3-energy-realization)で要求される等式です。従って $u\in D(A)$ かつ $Au=\lambda u$ です。
<!-- proof-end -->

これで増大条件と平均0から[重さ0のMaassカスプ形式](../AFR3/index.md#def-afr3-maass-cusp)の定義域条件まで導けました。さらに[エネルギー実現の非負性](../AFR3/index.md#thm-afr3-self-adjoint)から $\lambda\ge0$ です。ただし $\lambda\ge1/4$ まではこの議論で結論できません。

## 5. 群上で係数を取り出す

ここまでの係数は高さごとの積分でした。後続の保型表現論では、群上の関数に横方向の平行移動を施して積分する形が便利です。

$G=SL_2(\mathbb R)$、$\Gamma=SL_2(\mathbb Z)$ とします。[実特殊線形群の作用](../AFR1/index.md#def-afr1-real-group)において

$$
N(v)=\begin{pmatrix}1&v\\0&1\end{pmatrix},
\qquad A_y=\begin{pmatrix}\sqrt y&0\\0&1/\sqrt y\end{pmatrix}
$$

を使います。$v\in\mathbb R$、$y>0$ なので両者は実成分を持ち、行列式はそれぞれ $1\cdot1=1$、$\sqrt y/\sqrt y=1$ です。従って $G$ の元です。[実特殊線形群の作用式](../AFR1/index.md#def-afr1-real-group)に各成分を代入すると

$$
N(v)\cdot z=\frac{z+v}{1}=z+v,\qquad
A_y\cdot z=\frac{\sqrt y\,z}{1/\sqrt y}=yz.
$$

このため $N(v)A_y\cdot i=v+iy$ となり、群の行列で横方向と高さを指定できます。行列積から $N(v)N(w)=N(v+w)$、さらに整数 $m$ では全成分が整数なので $N(m)\in\Gamma$ です。

整数 $n$ に対し $v\mapsto e^{2\pi inv}$ は和を積に移す絶対値1の関数で、整数を足しても変わりません。このように和を積に移し、絶対値1を取る関数を加法指標と呼びます。

連続な関数 $\Phi:G\to\mathbb C$ に対し、左不変性とは全ての $\gamma\in\Gamma$ と $g\in G$ で

$$
\Phi(\gamma g)=\Phi(g)
$$

となることです。従って $\Phi(N(v)g)$ は $v$ について周期1となります。この一変数の周期関数から、古典的Fourier係数と同じ積分で非零周波数の成分を取り出します。

<a id="def-afr4-whittaker"></a>
<!-- formal-statement-start -->
> **定義（実群上のWhittaker係数）**  
> $\Phi:G\to\mathbb C$ を連続で左からの $\Gamma$ の作用に不変な関数とする。非零整数 $n$ に対し
>
$$
W_n^\Phi(g)=\int_0^1\Phi(N(v)g)e^{-2\pi inv}\,dv
\qquad(g\in G)
$$
>
> を本章のWhittaker係数と呼ぶ。加法指標の符号は上の積分で固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr4-whittaker -->
**定義の確認**。 $\Phi(g)=1$ は連続で、全ての $\gamma\in\Gamma$、$g\in G$ について $\Phi(\gamma g)=\Phi(g)$ です。$n=1$ なら

$$
W_1^\Phi(g)=\int_0^1e^{-2\pi iv}\,dv
=\left[\frac{e^{-2\pi iv}}{-2\pi i}\right]_0^1=0.
$$

任意の $g$ について積分が存在し、非零周波数を取り出すと定数は消えることが確認できます。係数が0でも定義の条件には反しません。
<!-- definition-example-end -->

非零の係数が現れる直接例も作れます。$2<y<3$ にコンパクトな台を持つ滑らかな非零の実関数 $\psi(y)$ を選びます。基本領域のこの帯で $f(x+iy)=\psi(y)e^{2\pi ix}$ とし、残りの基本領域では0とします。縦辺では周期1で接合し、円弧の近くと帯の上下端では0なので、群の軌道に沿う延長は滑らかで不変です。$\Phi(g)=f(g\cdot i)$ は従って連続かつ左不変です。$g=A_y$ で $N(v)A_y\cdot i=v+iy$ なので、$2<y<3$ では

$$
W_1^\Phi(A_y)=\psi(y)\int_0^1e^{2\pi iv}e^{-2\pi iv}\,dv=\psi(y).
$$

$\psi(y)\ne0$ となる高さでは実際に非零の係数が得られます。これは固有方程式を課していない群上の関数の例です。

この定義では重さや固有方程式はまだ要求しません。Maass形式を入力すると、第4節の特殊関数がそのまま現れます。[上半平面と回転による実行列の表示](../AFR1/index.md#thm-afr1-coordinates)の右回転 $k_\theta$ は $i$ を固定する行列で、任意の $g\in G$ は $N(x)A_yk_\theta$ と表示できます。実際、$N(x)A_y$ の行列積は同定理の $s(x+iy)$ です。

<a id="thm-afr4-whittaker-equivariance"></a>
<!-- formal-statement-start -->
> **定理（Whittaker係数の平行移動則と高さ表示）**  
> 上の $\Phi$ と非零整数 $n$ について、任意の $v_0\in\mathbb R$、$g\in G$ で
>
$$
W_n^\Phi(N(v_0)g)=e^{2\pi inv_0}W_n^\Phi(g)
$$
>
> が成立する。さらに $\Phi(g)=u(g\cdot i)$ が重さ0のMaass形式 $u$ の持ち上げなら、$y>0$、$x,\theta\in\mathbb R$ について
>
$$
W_n^\Phi(N(x)A_y k_\theta)=e^{2\pi inx}\rho(n)
 \sqrt y K_\nu(2\pi|n|y)
$$
>
> が成立する。$\nu^2=1/4-\lambda$、$\rho(n)$ は非零周波数展開の定数であり、$k_\theta$ は点 $i$ を固定する右回転である。
<!-- formal-statement-end -->

### 証明の見取り図

積分変数を $v_0$ だけ平行移動します。積分区間もずれますが、被積分関数は周期1なので元に戻せます。高さ方向の値は古典的Fourier係数と一致します。

<!-- proof-start -->
### 証明

$F(v)=\Phi(N(v)g)e^{-2\pi inv}$ と置きます。$N(v+1)=N(1)N(v)$ で $N(1)\in\Gamma$、$e^{-2\pi in}=1$ なので $F(v+1)=F(v)$ です。[Whittaker係数の定義](#def-afr4-whittaker)へ $N(v_0)g$ を代入し、$w=v+v_0$ と置くと

$$
W_n^\Phi(N(v_0)g)
=e^{2\pi inv_0}\int_{v_0}^{1+v_0}F(w)\,dw.
$$

周期1の連続関数の一周期積分は始点に依存しません。実際、始点の整数部分を周期性で取り除き、残り $h\in[0,1)$ について $[h,1+h]$ を $[h,1]$ と $[1,1+h]$ に分け、後者を $[0,h]$ に移せば $[0,1]$ の積分になります。これで第一の式が従います。

[群上の持ち上げの対応](../AFR1/index.md#thm-afr1-lift)を重さ0で使えば $\Phi(g)=u(g\cdot i)$ は左不変かつ右回転不変です。[上半平面と回転による実行列の表示](../AFR1/index.md#thm-afr1-coordinates)から $k_\theta\cdot i=i$ なので

$$
\Phi(N(v)A_y k_\theta)=u(v+iy).
$$

従って $W_n^\Phi(A_y k_\theta)=a_n(y)$ です。第一の式で $v_0=x$、$g=A_y k_\theta$ とし、[非零周波数展開](#thm-afr4-maass-expansion)を代入して第二の式を得ます。
<!-- proof-end -->

例えば $n=1$ の係数は $x$ を $1/4$ 増やすと $i$ 倍になります。高さを変えると $K_\nu$ の形に従います。右回転では変わりません。この三つの作用を分けて記録することが群上で係数を扱う利点です。

この積分は実群・重さ0での具体形です。後の局所体上の表現で使うWhittaker模型は、適切な指標に対する変換則を満たす関数空間として構成します。ここではその一般的な存在・一意性を仮定しません。次講では定数項が消えない Eisenstein 級数を調べます。

## 6. 演習と詳細解答

<a id="ex-afr4-a1"></a>
#### AFR4-A1 固有値と次数

$\lambda=1/4,\,5/4,\,0$ に対し $\nu^2=1/4-\lambda$ を満たす $\nu$ を一つずつ求めよ。

- Level: A
- ID: AFR4-A1

<!-- solution-start -->
**詳細解答。** [係数方程式の変換](#thm-afr4-bessel-reduction)の関係へ代入します。順に $\nu^2=0,-1,1/4$ となるので $\nu=0,i,1/2$ を選べます。符号を逆にしても $\nu^2$ は変わりません。[Kの定義](#def-afr4-k-bessel)でも $\cosh(-\nu v)=\cosh(\nu v)$ のため同じ関数になります。
<!-- solution-end -->

<a id="ex-afr4-a2"></a>
#### AFR4-A2 非零周波数と局所模型

$u(x+iy)=e^{-6\pi y}e^{-6\pi ix}$ の非零のFourier係数と双曲Laplace作用素の値を求めよ。

- Level: A
- ID: AFR4-A2

<!-- solution-start -->
**詳細解答。** [Fourier係数の式](../AFR2/index.md#thm-afr2-fourier-equation)へ代入すると、$a_n=e^{-6\pi y}\int_0^1e^{-2\pi i(n+3)x}dx$ です。$n=-3$ で積分は1、それ以外では指数関数の原始関数を両端で評価すると0です。従って $a_{-3}=e^{-6\pi y}$ だけが非零です。$x$ 方向では $-6\pi i$、$y$ 方向では $-6\pi$ が微分ごとに掛かるため、

$$
u_{xx}=(-6\pi i)^2u=-36\pi^2u,\qquad
u_{yy}=(-6\pi)^2u=36\pi^2u.
$$

従って [双曲Laplace作用素](../AFR2/index.md#def-afr2-laplacian)を作用させると0です。[実特殊線形群の作用](../AFR1/index.md#def-afr1-real-group)による整数行列の反転 $z\mapsto-1/z$ は $2i$ を $i/2$ に移しますが、$u(2i)=e^{-12\pi}$ と $u(i/2)=e^{-3\pi}$ が異なるので、これは大域的なMaass形式ではありません。
<!-- solution-end -->

<a id="ex-afr4-a3"></a>
#### AFR4-A3 指数減衰の規格化

$n=2$、$\lambda=0$ として $\sqrt yK_{1/2}(4\pi y)$ を初等関数で表示せよ。この項の係数が $a_2(y)=3e^{-4\pi y}$ になるための $\rho(2)$ を求めよ。

- Level: A
- ID: AFR4-A3

<!-- solution-start -->
**詳細解答。** 第2節の[変形Bessel関数 K](#def-afr4-k-bessel)の直接例から

$$
\sqrt y K_{1/2}(4\pi y)=\sqrt y\sqrt{\frac{\pi}{8\pi y}}e^{-4\pi y}
=\frac{1}{2\sqrt2}e^{-4\pi y}.
$$

[非零周波数展開](#thm-afr4-maass-expansion)の規格化では $\rho(2)/(2\sqrt2)=3$、よって $\rho(2)=6\sqrt2$ です。
<!-- solution-end -->

<a id="ex-afr4-a4"></a>
#### AFR4-A4 平行移動の符号

ある $\Phi,g$ で $W_{-2}^\Phi(g)=3$ とする。$W_{-2}^\Phi(N(1/8)g)$ を求めよ。

- Level: A
- ID: AFR4-A4

<!-- solution-start -->
**詳細解答。** [平行移動則](#thm-afr4-whittaker-equivariance)へ $n=-2,v_0=1/8$ を代入すると指数は $2\pi i(-2)/8=-\pi i/2$ です。$e^{-\pi i/2}=-i$ なので答えは $-3i$ です。積分の指数の符号とは逆の符号で変換される点に注意します。
<!-- solution-end -->

<a id="ex-afr4-b1"></a>
#### AFR4-B1 半整数次数の二つの解

$t>0$ で $b_\pm(t)=t^{-1/2}e^{\pm t}$ が $\nu=1/2$ の変形Bessel方程式を満たすことを直接示し、多項式増大条件を満たす線形結合を求めよ。

- Level: B
- ID: AFR4-B1

<!-- solution-start -->
**詳細解答。** $\sigma=\pm1$ と置き $b=t^{-1/2}e^{\sigma t}$ と書きます。プライムは $t$ による常微分です。積の微分で $b'=(\sigma-1/(2t))b$ を得て、さらにこの式を微分すると

$$
b'=(\sigma-1/(2t))b,\quad
b''=\left(\frac{1}{2t^2}+(\sigma-1/(2t))^2\right)b
=(1-\sigma/t+3/(4t^2))b.
$$

[係数方程式の変換](#thm-afr4-bessel-reduction)の左辺に代入すると

$$
\begin{aligned}
t^2b''+tb'-(t^2+1/4)b
&=(t^2-\sigma t+3/4+\sigma t-1/2-t^2-1/4)b\\
&=0.
\end{aligned}
$$

$b_+/b_-=e^{2t}$ は定数でないので二つは線形独立です。$A b_++B b_-=t^{-1/2}e^t(A+Be^{-2t})$ です。$A\ne0$ なら括弧は $A$ に収束するため指数増大し、$A=0$ なら減衰します。従って $B b_-$ だけが残ります。
<!-- solution-end -->

<a id="ex-afr4-b2"></a>
#### AFR4-B2 Kの導関数と隣の次数

積分表示から $K_\nu'(t)=-\tfrac12(K_{\nu+1}(t)+K_{\nu-1}(t))$ を導け。また $\nu=0$ のとき何が言えるか。

- Level: B
- ID: AFR4-B2

<!-- solution-start -->
**詳細解答。** [Kの微分方程式の証明](#thm-afr4-k-equation)の支配評価は一階微分も許すので

$$
K_\nu'(t)=-\int_0^\infty e^{-t\cosh v}\cosh v\cosh(\nu v)\,dv.
$$

指数関数の定義を掛け合わせると $2\cosh v\cosh(\nu v)=\cosh((\nu+1)v)+\cosh((\nu-1)v)$ となります。これを積分に入れ、それぞれ [Kの定義](#def-afr4-k-bessel)と比較すれば主張の式になります。$\nu=0$ では $K_{-1}=K_1$ なので $K_0'=-K_1$ です。$K_1(t)$ の被積分関数は正で収束するため $K_0'(t)<0$、すなわち $K_0$ は狭義単調減少です。
<!-- solution-end -->

<a id="ex-afr4-b3"></a>
#### AFR4-B3 反射と係数の消滅

Maass形式 $u$ が $u(-x+iy)=-u(x+iy)$ を満たすとする。$a_{-n}(y)=-a_n(y)$、$a_0\equiv0$、$\rho(-n)=-\rho(n)$ を示せ。

- Level: B
- ID: AFR4-B3

<!-- solution-start -->
**詳細解答。** [Fourier係数](../AFR2/index.md#thm-afr2-fourier-equation)で $a_{-n}(y)=\int_0^1u(x+iy)e^{2\pi inx}dx$ と書き、$t=1-x$ と置きます。$u(1-t+iy)=u(-t+iy)=-u(t+iy)$、$e^{2\pi in(1-t)}=e^{-2\pi int}$ なので

$$
a_{-n}(y)=-\int_0^1u(t+iy)e^{-2\pi int}dt=-a_n(y).
$$

$n=0$ なら $2a_0=0$ です。$n\ne0$ では [非零周波数展開](#thm-afr4-maass-expansion)の共通因子 $\sqrt yK_\nu(2\pi|n|y)$ が [Kの無限遠での漸近形](#thm-afr4-k-asymptotic) により十分大きな $y$ で非零なので割って $\rho(-n)=-\rho(n)$ を得ます。[指数減衰の定理](#thm-afr4-cusp-decay)によりこの $u$ は二乗可積分でエネルギー実現の定義域に属し、平均0なのでカスプ形式です。
<!-- solution-end -->

<a id="ex-afr4-c1"></a>
#### AFR4-C1 係数の尾部から積分を評価する

Maass形式の定数項が0とする。ある $Y>1,H>0$ があり、$y\ge Y$、$n\ne0$ で $|a_n(y)|\le H e^{-2\pi|n|(y-Y)}$ が成立しているとする。

1. $y\ge Y+1$ で $|u(x+iy)|\le 2H e^{-2\pi(y-Y)}/(1-e^{-2\pi})$ を示せ。
2. $R\ge Y+1$ に対し $\int_R^\infty\int_0^1|u|^2y^{-2}\,dx\,dy$ の指数的な上界を求めよ。
3. 平均が消えない定数関数では、(1)と同じ指数的な減衰の上界が成立しない理由を述べよ。

- Level: C
- ID: AFR4-C1

<!-- solution-start -->
**詳細解答。** (1) [非零周波数展開](#thm-afr4-maass-expansion)の絶対収束と $a_0=0$ を使います。$d=y-Y\ge1$ と置くと

$$
|u(x+iy)|\le \sum_{n\ne0}|a_n(y)|
\le 2H\sum_{k=1}^\infty e^{-2\pi kd}
=\frac{2H e^{-2\pi d}}{1-e^{-2\pi d}}.
$$

$1-e^{-2\pi d}\ge1-e^{-2\pi}>0$ なので所望の評価です。

(2) $B=2H/(1-e^{-2\pi})$ とします。$y\ge R$ で $y^{-2}\le R^{-2}$、幅は1なので

$$
\begin{aligned}
\int_R^\infty\int_0^1|u|^2y^{-2}\,dx\,dy
&\le B^2R^{-2}\int_R^\infty e^{-4\pi(y-Y)}dy\\
&=\frac{B^2}{4\pi R^2}e^{-4\pi(R-Y)}.
\end{aligned}
$$

(3) 定数関数1は $a_n=0$（$n\ne0$）ですが $a_0=1$ です。(1) の不等式の最初の段階で $a_0$ を捨てられません。実際、二乗積分の尾部は $\int_R^\infty y^{-2}dy=1/R$ です。有限面積により二乗可積分ではありますが、指数的には減衰しません。
<!-- solution-end -->

## 参考文献

- H. Iwaniec, *Spectral Methods of Automorphic Forms*, 2nd ed., AMS, 2002.
- D. Bump, *Automorphic Forms and Representations*, Cambridge University Press, 1997.
- NIST Digital Library of Mathematical Functions, [§10.25 Modified Bessel Functions](https://dlmf.nist.gov/10.25), [§10.32 Integral Representations](https://dlmf.nist.gov/10.32), [§10.40 Asymptotic Expansions for Large Argument](https://dlmf.nist.gov/10.40). 本章は正の実引数に限定して積分・微分方程式・主要漸近形を導出した。
