# FLOER1-03 重み付きSobolev空間とFredholm指数

<!-- definition-example-audit: strict -->

## 1. 端の条件を微分方程式の空間に入れる

前講では[交点の漸近作用素](../FLOER1-02/index.md#def-floer1-02-asymptotic-operator)が現れた。横断交点では零固有値がない。今回はこの事実を、無限帯 $S=\mathbb R\times[0,1]$ 上の方程式を解くための評価へ変える。有限帯の[境界付き一階楕円型評価](../FLOER1-01/index.md#thm-floer1-01-estimate)だけでは、切断が無限遠へ逃げることを防げない。

以下では実Hilbert空間を使う。$V=\mathbb C^n$ は実次元 $2n$、$J=i$、計量は標準実内積とする。$W_0,W_1$ は固定した[Lagrange部分空間](../../SYM/SYM6/index.md#def-sym6-lagrangian-subspace)であり、実次元 $n$ で標準シンプレクティック形式 $\omega$ の制限が零である。横断な対とは [Lagrange横断交叉](../FLOER1-01/index.md#def-floer1-01-transverse)の接空間条件と同じく、$W_0+W_1=V$（同値に $W_0\cap W_1=\{0\}$）となる対をいう。

帯の長手座標を $s\in\mathbb R$、横断座標を $t\in[0,1]$ とする。$v_s=\partial_s v=\partial v/\partial s$ は $t$ を固定した偏微分、$v_t=\partial_t v=\partial v/\partial t$ は $s$ を固定した偏微分である。一変数関数のプライムはその変数の常微分（Sobolev関数では弱微分）を表す。例えば $\phi'(t)=d\phi/dt$、$v_m'(s)=dv_m/ds$ である。

[写像に沿うSobolev切断](../../GW/GW1-03/index.md#def-gw1-03-sobolev-sections)で値と一階微分を測ったが、今回は非コンパクトな帯の自明束なので、弱偏微分を用いて全帯での可積分性を直接課す。$\|\cdot\|_2$ は文脈に応じた領域での実 $L^2$ ノルムとし、帯では

$$
\|v\|_{H^1(S)}^2=\|v\|_2^2+\|v_s\|_2^2+\|v_t\|_2^2
$$

とする。

横断方向の空間を

$$
H=L^2([0,1],V),\qquad
Y=\{\eta\in H^1([0,1],V):\eta(j)\in W_j,\ j=0,1\}
$$

と置く。$Y$ は閉部分空間である。帯全体についても

$$
X=\{v\in H^1(S,V):v(s,j)\in W_j,\ j=0,1\}
$$

と書く。ここで水平辺での値はトレースであり、条件はほとんど全ての $s$ に対して課す。トレースは局所的に[有限帯の境界付き評価の証明](../FLOER1-01/index.md#thm-floer1-01-estimate)で用いた方法で理解できる。トレースの連続性から $X$ も閉部分空間となる。

中央から両端の無限遠へ近づくほど大きな正の重みを掛けると、単なる二乗可積分性より速い減衰を要求できる。$\rho(s)=|s|$ とする。この関数は原点で微分できないが、弱微分は有界なので一階Sobolev空間の積の微分に使える。

<a id="def-floer1-03-weighted"></a>

<!-- formal-statement-start -->
> **定義（無限stripの重み付きSobolev空間）**
> $\delta\ge0$、$w_\delta(s)=e^{\delta|s|}$ とする。固定Lagrange境界を持つ無限帯上の切断について、次の空間とノルムを定める。

$$
X_\delta=\{v:w_\delta v\in X\},
\qquad \|v\|_{X_\delta}=\|w_\delta v\|_{H^1},
$$

$$
Z_\delta=\{f:w_\delta f\in L^2(S,V)\},
\qquad \|f\|_{Z_\delta}=\|w_\delta f\|_2.
$$

> 関数はほとんど至る所で等しいものを同一視する。境界条件は $X$ のトレース条件で課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-03-weighted -->
**定義の確認**。$V=\mathbb C$、$W_0=\mathbb R$、$W_1=i\mathbb R$ とし、$v=e^{-a|s|}e^{i\pi t/2}$、$a>0$ とする。$w_\delta v=e^{-(a-\delta)|s|}e^{i\pi t/2}$ の下端は実数、上端は純虚数。$\delta<a$ なら

$$
\|w_\delta v\|_2^2
=2\int_0^\infty e^{-2(a-\delta)s}\,ds
=\frac1{a-\delta}.
$$

ここで $\operatorname{sgn}(s)$ は正なら $1$、負なら $-1$、零なら $0$ とする符号関数である。$z=w_\delta v$ と置くと、弱偏微分は

$$
z_s=-(a-\delta)\operatorname{sgn}(s)z,
\qquad z_t=\frac{i\pi}{2}z.
$$

原点の左右で値が一致するので、部分積分の境界項が打ち消し合い、弱微分にDiracのデルタ項は生じない。従って $\delta<a$ なら

$$
\|z\|_{H^1(S)}^2
=\frac{1+(a-\delta)^2+\pi^2/4}{a-\delta}<\infty.
$$

両辺のトレースも確認したので $v\in X_\delta$。同じ関数を値域の元 $f=v$ とみなすと、$Z_\delta$ には境界条件や微分の条件がなく、上の $\|z\|_2^2$ だけで判定できる。$\delta\ge a$ では値自体の積分が発散するため、どちらの空間にも入らない。
<!-- definition-example-end -->

重みの掛け算は $X_\delta\to X$ と $Z_\delta\to L^2$ の等長全単射である。$D=\partial_s+i\partial_t+B(s,t)$（$B$ は有界な実線形行列）なら $z=w_\delta v$ と置く。$w_\delta'/w_\delta=\delta\operatorname{sgn}(s)$ がほとんど至る所で成立し、$w_\delta$ は $t$ に依存しないので、

$$
w_\delta v_s=z_s-\delta\operatorname{sgn}(s)z,
\qquad w_\delta v_t=z_t.
$$

$B$ は実線形で重みは実数だから $w_\delta Bv=Bz$。これらを足すと

$$
w_\delta Dv
=z_s+i z_t+Bz-\delta\operatorname{sgn}(s)z.
$$

境界条件は正の実数を掛けても変わらない。従って重みを変えることは、同じ空間上で零階項を変えることに等しい。正端で固有値は $\mu-\delta$、負端で $\mu+\delta$ に移る。

## 2. 横断交点のスペクトルと全帯での逆

端での[漸近作用素の自己共役性と横断性](../FLOER1-02/index.md#thm-floer1-02-asymptotic-invertible)を使う。$A=i\,d/dt:Y\to H$ とする。横断的な場合は逆が存在し、$H\to Y$ で有界である。

実数の固有値が零から離れているだけでなく、横断方向の全ての関数を固有関数で展開できることが必要である。そのための具体的な構成を行う。

<a id="thm-floer1-03-spectrum"></a>

<!-- formal-statement-start -->
> **定理（横断Lagrange対の固有関数展開）**
> 標準Hermite空間 $\mathbb C^n$ の横断Lagrange対 $W_0,W_1$ を取る。あるユニタリ座標では $W_0=\mathbb R^n$、$W_1=\bigoplus_{j=1}^n e^{i\theta_j}\mathbb R e_j$、$0<\theta_j<\pi$ と書ける。両端でこの対の境界条件を課す作用素 $A=i\,d/dt$ の実正規直交固有基底は

$$
\phi_{jk}(t)=e^{-i(k\pi-\theta_j)t}e_j,
\qquad \mu_{jk}=k\pi-\theta_j,\quad k\in\mathbb Z.
$$

> 特に零とスペクトルの距離は正である。

$$
\gamma=\min_{1\le j\le n}\min(\theta_j,\pi-\theta_j)>0.
$$
<!-- formal-statement-end -->

境界の角度を固有値の間隔のずれとして読める。横断性を失うと角度が零に近づき、逆の評価定数が悪化する。

<!-- proof-start -->
### 証明

$W_0$ の実正規直交基底とその $i$ 倍は、[Lagrange部分空間の計量直交補](../../SYM/SYM8/index.md#prop-sym8-lagrangian-orthogonal)から全体の実正規直交基底になる。この基底で $W_0=\mathbb R^n$。虚部への射影を $W_1$ に制限した核は $W_0\cap W_1=0$、両者の実次元は $n$ だから全単射である。従ってある実行列 $C$ によって $W_1=\{Cy+iy:y\in\mathbb R^n\}$ と書ける。

標準シンプレクティック形式の値は

$$
\omega(Cy+iy,Cz+iz)
=(Cy)^{\mathsf T}z-y^{\mathsf T}Cz
=y^{\mathsf T}(C^{\mathsf T}-C)z.
$$

ここで標準形式は $\omega(x+iy,u+iv)=x^{\mathsf T}v-y^{\mathsf T}u$ である。Lagrange条件により全ての $y,z$ で零となり、$y,z$ に標準基底を順に代入すると $C^{\mathsf T}-C$ の全成分が零になる。従って $C$ は実対称行列である。実直交行列で対角化すると各成分は $(c_j+i)\mathbb R$ となる。$c_j+i$ の偏角 $\theta_j$ は $(0,\pi)$ に入る。

一成分では $i\phi'=\mu\phi$、すなわち $\phi'=-i\mu\phi$ だから、積を微分すると $(e^{i\mu t}\phi(t))'=0$ となる。従って $\phi(t)=a e^{-i\mu t}$ である。下端条件で $a\in\mathbb R$、非零の固有関数では $a\ne0$。上端条件は $e^{-i\theta}\phi(1)=a e^{-i(\mu+\theta)}\in\mathbb R$ なので、$\mu+\theta\in\pi\mathbb Z$ となる。実内積での異なるモードの積は $\int_0^1\cos((k-l)\pi t)dt=0$、同じモードでは1である。

完全性を確認する。任意の複素 $L^2$ 関数 $f$ に対して次のように変換・拡張する。

$$
g(t)=e^{-i\theta t}f(t)\quad(0<t<1),
\qquad g(-t)=\overline{g(t)}.
$$

これを周期2の関数とみなす。共役対称性から Fourier 係数は実数である。実際、

$$
\overline{\int_{-1}^1 g(t)e^{ik\pi t}\,dt}
=\int_{-1}^1 g(-t)e^{-ik\pi t}\,dt
=\int_{-1}^1 g(t)e^{ik\pi t}\,dt.
$$

周期2の変数を $x=\pi t$ に変え、実部・虚部それぞれに [Fourier有限和の二乗平均収束](../../../解析系/FOU/FOU2/index.md#thm-fou2-mean-square-convergence)を適用する。まず区間内部で滑らかなコンパクト台関数を取り、その共役対称拡張に適用すれば三角多項式で近似できる。一般の $L^2$ 関数は区間内部の滑らかなコンパクト台関数で $L^2$ 近似でき、拡張の二乗ノルムは元の2倍だから、三角多項式はこの対称部分空間にも稠密である。

近似多項式 $p$ を対称化した多項式を

$$
p_{\mathrm{sym}}(t)=\frac{p(t)+\overline{p(-t)}}2
$$

とする。反射と共役は $L^2$ の距離を保ち、元の $g$ は対称なので

$$
\|p_{\mathrm{sym}}-g\|_2
\le \tfrac12(\|p-g\|_2+\|\overline{p(-\,\cdot)}-g\|_2)
=\|p-g\|_2.
$$

係数は実数になり、従って $g$ は $e^{-ik\pi t}$ の実係数展開を持つ。区間 $[0,1]$ に制限し $e^{i\theta t}$ を戻せば主張の展開となる。

[漸近作用素の対称性と横断性](../FLOER1-02/index.md#thm-floer1-02-asymptotic-invertible)で自己共役性を示したので、この完全固有基底による対角表示でスペクトルを計算できる。固有値列は有限点に集積しない。各成分で零に最も近い固有値は $-\theta_j$ と $\pi-\theta_j$ だから上の $\gamma$ を得る。
<!-- proof-end -->

次は $D_0=\partial_s+A$ の全帯での逆である。正負の固有値は異なる方向の積分を要求する。グラフノルムとは値と作用素の像の両方を測るノルムであり、$A=i\partial_t$ なら $\|A\eta\|_2=\|\eta_t\|_2$ である。

<a id="thm-floer1-03-inverse"></a>

<!-- formal-statement-start -->
> **定理（可逆な端作用素から全帯の逆）**
> $H$ を横断方向の実 $L^2$ 空間、$A$ を固定Lagrange境界を持つ稠密定義の作用素とし、随伴との作用および定義域が一致するとする（前講の[漸近作用素の対称性と横断性](../FLOER1-02/index.md#thm-floer1-02-asymptotic-invertible)で扱った自己共役性）。
>
> 実正規直交固有基底を持ち、全固有値について $|\mu|\ge\gamma>0$ とする。さらにある正定数 $c_1,c_2$ について

$$
c_1\|\eta\|_{H^1}\le \|\eta\|_2+\|A\eta\|_2
\le c_2\|\eta\|_{H^1}\qquad(\eta\in Y)
$$

> と仮定する。
> このとき $D_0=\partial_s+A:X\to L^2(S,V)$ は有界全単射である。$v\in X$ に対し

$$
\|D_0v\|_2^2=\|v_s\|_2^2+\|Av\|_2^2,
\qquad
\gamma\|v\|_2\le\|D_0v\|_2.
$$
<!-- formal-statement-end -->

このため漸近作用素は定理のグラフノルムの仮定を満たす。

<!-- proof-start -->
### 証明

固有基底を $\phi_m$、固有値を $\mu_m$ とする。展開した係数 $v_m(s)$ は $H^1(\mathbb R)$ に属する。コンパクト台の滑らかな係数について

$$
\|v_m'+\mu_m v_m\|_2^2
=\|v_m'\|_2^2+\mu_m^2\|v_m\|_2^2
+\mu_m\int_{\mathbb R}(v_m^2)'ds.
$$

最後の項は零であり、$H^1(\mathbb R)$ での近似でも等式は保たれる。有限個のモードについて和を取り、二乗ノルムの級数の極限を取ると第一式となる。$\|Av\|_2^2=\sum_m\mu_m^2\|v_m\|_2^2\ge\gamma^2\|v\|_2^2$ だから第二式と単射性を得る。

全射性は任意の $f\in L^2(S,V)$ の係数 $f_m$ について解を構成する。$\mu_m>0$ の場合と $\mu_m<0$ の場合を分ける。

$$
v_m(s)=
\begin{cases}
\displaystyle\int_{-\infty}^s e^{-\mu_m(s-r)}f_m(r)\,dr,
&\mu_m>0,\\
\displaystyle-\int_s^\infty e^{-\mu_m(s-r)}f_m(r)\,dr,
&\mu_m<0.
\end{cases}
$$

両積分の畳み込み核の絶対値の積分は $1/|\mu_m|$。例えば正の場合、Cauchy--Schwarz不等式で

$$
|v_m(s)|^2\le
\frac1{\mu_m}\int_0^\infty e^{-\mu_m q}|f_m(s-q)|^2\,dq.
$$

$s$ で積分し非負積分を交換すると $\|v_m\|_2\le\|f_m\|_2/\mu_m$。負の場合も $q=r-s\ge0$ と置けば核は $e^{-|\mu_m|q}$ となり同じ上界を得る。弱微分は積分端の項と指数の微分から $v_m'=f_m-\mu_m v_m$ である。従って $\|v_m'\|_2\le2\|f_m\|_2$。

有限和の差についてこの評価を足すと、$\sum_m v_m\phi_m$ は $L^2$、$s$ 微分、$A$ の作用の各ノルムでCauchy列となる。グラフノルム同値性により $H^1(S,V)$ でも収束し、閉じたトレース条件を保つ。$D_0v=f$ は $L^2$ 極限で成立する。
<!-- proof-end -->

## 3. 指数減衰を得る

一定係数の半帯で $v_s+Av=0$ とする。正端では各係数が $v_m(s)=v_m(R)e^{-\mu_m(s-R)}$ である。$L^2$ 条件から負の固有値の係数は零。従って $\|v(s,\cdot)\|_H\le e^{-\gamma(s-R)}\|v(R,\cdot)\|_H$ となる。非線形の場合は係数の小さなずれを評価に吸収する。

<a id="thm-floer1-03-decay"></a>

<!-- formal-statement-start -->
> **定理（横断収束端での重み付き一階減衰）**
> 滑らかな適合概複素構造を持つシンプレクティック多様体上の有限エネルギー擬正則strip $u$ が、正端で横断Lagrange交点 $p$ に値と一階微分について一様に収束するとする。交点の近傍で両Lagrange部分多様体を接平面へ直す座標を選び、$p$ を原点とした座標値を $v$ とする。
> 漸近作用素のスペクトルギャップを $\gamma$ とすると、任意の $0<\delta<\gamma$ について十分大きな $R$ で

$$
\int_R^\infty\int_0^1 e^{2\delta s}
(|v|^2+|v_s|^2+|v_t|^2)\,dt\,ds<\infty.
$$

> 負端では同じ主張が $s$ を $-s$ に替えて成立する。
<!-- formal-statement-end -->

これは重み付き $H^1$ の意味での指数減衰である。例えば各単位長の部分帯の非重み付き $H^1$ ノルムは $Ce^{-\delta s}$ 以下になる。一様な高階微分評価は別途、境界での高階正則性を必要とする。

<!-- proof-start -->
### 証明

**座標と非重み付きノルム。** 横断性から二つの接平面は直和である。元の座標で各Lagrange部分多様体を局所パラメータ $F_j:W_j\to V$ で表し、$F_j(0)=0$、$dF_j(0)$ は包含とする。写像 $(a,b)\mapsto F_0(a)+F_1(b)$ の微分は原点で $(a,b)\mapsto a+b$ という同型である。逆関数定理でこの写像を座標に用いれば両境界は固定平面になる。原点での微分を同一視すると $J(0)=i$ と取れる。

方程式はこの座標で

$$
D_0v=Q(s,t)v_t,\qquad Q=i-J(v).
$$

一様収束により $\sup_{s\ge R}|Q|\to0$。エネルギー有限性と小さな座標近傍での計量の一様な同値性から $v_s,v_t\in L^2$。前講の[横断漸近作用素の逆評価](../FLOER1-02/index.md#thm-floer1-02-asymptotic-invertible)を各 $s$ の $v(s,\cdot)$ に用いると $\|v(s,\cdot)\|_H\le C\|v_t(s,\cdot)\|_H$。積分して $v\in H^1$ となる。

**切断と有界な重み。** 滑らかな実関数 $\chi(s)$ を $s\le R$ で零、$s\ge R+1$ で1とする。$h_N(s)=\exp(\delta\min(\max(s-R,0),N))$ と置く。これは有界で $|h_N'|\le\delta h_N$。$z_N=h_N\chi v$ を全帯へ零延長すると $X$ に属する。積の微分を取ると

$$
D_0 z_N=Q\,\partial_t z_N+
h_N\chi'v+(h_N'/h_N)z_N.
$$

[全帯の逆評価](#thm-floer1-03-inverse)から $\|\partial_t z_N\|_2\le\|D_0z_N\|_2$、$\|z_N\|_2\le\gamma^{-1}\|D_0z_N\|_2$ である。$h_N$ は $\chi'$ の台上で $e^\delta$ 以下なので

$$
(1-\sup|Q|-\delta/\gamma)\|D_0z_N\|_2
\le e^\delta\|\chi'v\|_2.
$$

$\delta<\gamma$ だから $R$ を大きくして左辺の係数を正にできる。従って $z_N$ の $H^1$ ノルムは $N$ によらず有界である。

$s\ge R+1$ では $h_N v=z_N$ であり、$h_N v_t=\partial_t z_N$、$h_N v_s=\partial_s z_N-(h_N'/h_N)z_N$。よって $h_N v,h_Nv_t,h_Nv_s$ は全て一様に $L^2$ 有界。$N\to\infty$ で $h_N^2$ は単調増加するので非負積分の単調収束を適用すれば結論が成立する。有限長の残り区間は滑らかさで積分有限である。

負端では $\sigma=-s$ とし方程式に $-1$ を掛けると端作用素は $-A$、摂動は $-Q\partial_t$ となる。$-A$ のギャップも $\gamma$、微分評価も同じであり、上の切断と重みを $\sigma$ に適用できる。
<!-- proof-end -->

有限エネルギーだけから一様な収束端が存在することまでをこの定理は主張しない。前講の小さい断面と、ここで仮定した収束端を区別する。

## 4. 無限帯上のFredholm性

[Fredholm作用素と実指数](../../GW/GW1-03/index.md#def-gw1-03-fredholm)の定義は閉じた像、有限次元の核と余核を要求する。無限帯上では局所の楕円性に加えて端での逆が必要である。

束の枠を用いて線形化を $D=\partial_s+i\partial_t+B(s,t)$ と書く。以下の定理では固定境界条件と $B$ の一様な端の極限を仮定する。例えば収束端を持つ幾何学的stripでは、適合計量のユニタリ枠を端の交点の枠に近づけ、境界の実部分空間を固定する回転を施す。枠の微分は[有限帯での枠の変化の計算](../FLOER1-01/index.md#thm-floer1-01-estimate)の零階項になる。端の枠が $t$ のみに依存する極限へ一階で収束すれば、端の作用素はそのユニタリ枠で移した漸近作用素である。

<a id="thm-floer1-03-fredholm"></a>

<!-- formal-statement-start -->
> **定理（可逆な両端を持つ無限stripのFredholm性）**
> 固定したLagrange境界を持つ $X$ 上の作用素 $D=\partial_s+i\partial_t+B(s,t)$ を考える。$B$ は有界な実線形行列であり、$s\to\pm\infty$ で $B_\pm(t)$ へ $t$ について一様に収束するとする。
> $A_\pm=i\partial_t+B_\pm$ は $H$ 上、共通定義域 $Y$ を持ち、各々の随伴と作用および定義域が一致するものとする。完全固有基底を持ち、固有値の絶対値はそれぞれ $\gamma_\pm>0$ 以上とする。
> $0\le\delta<\min(\gamma_-,\gamma_+)$ なら次の作用素はFredholmである。

$$
D:X_\delta\longrightarrow Z_\delta.
$$

> また実指数はこの範囲の $\delta$ によらない。
<!-- formal-statement-end -->

証明では左右端と中央に逆を用意し、切断関数でつなぐ。逆の誤差が中央付近に集中するので、局所コンパクト性で制御できる。

<!-- proof-start -->
### 証明

**端と中央の逆。** 重みの共役作用素を $P=w_\delta D w_\delta^{-1}$ とする。端の作用素は $A_-+\delta$ と $A_+-\delta$。いずれも自己共役、固有基底は同じでギャップは $\gamma_\pm-\delta>0$ 以上。$B_\pm$ が有界だから

$$
\|\eta_t\|_2\le\|A_\pm\eta\|_2+\|B_\pm\|_\infty\|\eta\|_2
$$

逆向きには次の評価も成り立つ。

$$
\|A_\pm\eta\|_2\le\|\eta_t\|_2+\|B_\pm\|_\infty\|\eta\|_2.
$$

この二つの評価でグラフノルムと $H^1$ ノルムの同値性が分かる。重み付きの端作用素についても、$A_\pm$ を $A_\pm\mp\delta I$、$B_\pm$ を $B_\pm\mp\delta I$ に置き換えれば同じ評価が成立する。従って[全帯の逆](#thm-floer1-03-inverse)による有界逆を $G_\pm:L^2\to X$ とする。

中央用には $A_c=i\partial_t-cI$ を取る。横断でない境界でも、二つのLagrange平面をユニタリ座標で角度表示できる。具体的には $W_1\cap W_0$ を先に直交分離し、$i(W_1\cap W_0)$ は $W_1$ に直交するため、残る複素直交補で横断な対に前節の構成を用いる。共通方向では角度0を用いればよい。従って $i\partial_t$ の固有値は有限個の角度に対する $k\pi-\theta_j$ である。$c$ をこの離散集合の外に選ぶと $A_c$ は正のギャップを持ち、全帯の逆 $G_c$ が存在する。

**誤差がコンパクトになる理由。** $M(s,t)$ が有界で両端で一様に零へ収束する行列なら、掛け算 $X\to L^2$ はコンパクトである。

まず有界部分を考える。長方形 $\Omega=(-R,R)\times(0,1)$ はLipschitz領域である。[有界 Lipschitz 領域の Sobolev 拡張](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-extension-lipschitz)を $p=2$ で各実成分に使い、$\overline\Omega$ 上で1となる滑らかなコンパクト台関数を掛けて、より大きい有界開集合 $U$ 内に台を持つ拡張を得る。

積の微分により $H^1$ ノルムは定数倍で抑えられ、台が $U$ の内部にあるので $H_0^1(U)$ に属する。[Rellich--Kondrachov theorem](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-rellich-h01-l2)を $U$ に適用し、得た $L^2$ 収束を $\Omega$ に制限する。これで長方形の $H^1\to L^2$ がコンパクトと分かる。

外側の掛け算は次の評価を持つ。

$$
\|Mv\|_{L^2(|s|>R)}
\le \sup_{|s|>R}|M|\,\|v\|_{H^1}.
$$

右辺の係数は零に収束する。従ってコンパクト作用素のノルム極限として結論を得る。コンパクト台を持つ有界係数もこの場合に含まれる。

滑らかな実切断関数 $\chi_-,\chi_c,\chi_+$ を二乗和が1となるよう選び、$\chi_c$ はコンパクト台、$\chi_\pm$ は対応する端だけで1となるようにする。例えば端と中央を覆う非負関数を選び、その二乗和の平方根で割ればよい。$P_j$ を上で逆を構成した一定端作用素（中央も含む）とする。

$$
Q=\sum_{j\in\{-,c,+\}}\chi_j G_j\chi_j.
$$

$Q:L^2\to X$ は有界である。$P_j$ と $P$ の主部は同じなので $P-P_j$ は零階項である。積の微分を使うと

$$
PQ=I+\sum_j
\{\chi_j(P-P_j)+\chi_j'\}G_j\chi_j.
$$

$\chi_j(P-P_j)$ は両端で零に収束し、$\chi_j'$ はコンパクト台を持つ。従って右辺の和は $L^2\to L^2$ のコンパクト作用素 $K$ である。逆順では

$$
QP=I+\sum_j\chi_jG_j
\{\chi_j(P-P_j)-\chi_j'\}.
$$

括弧は $X\to L^2$ のコンパクト作用素であり、逆の合成で和は $X\to X$ のコンパクト作用素 $L$ となる。

**核・像・余核。** $Px=0$ なら $x=-Lx$。もし核が無限次元なら $X$ で正規直交する列を取れ、その像がコンパクトになることに矛盾する。核の直交補で $\|x\|_X\le C\|Px\|_2$ が成立しないと仮定すると、$\|x_m\|_X=1$、$x_m\perp\ker P$、$Px_m\to0$ を選べる。$x_m=QPx_m-Lx_m$ だからコンパクト性で $X$ 収束部分列を持つ。その極限は核と直交補の両方に属し零だが、ノルムは1で矛盾する。

像の収束列 $Px_m$ について、$x_m$ から核成分を引いて直交補内に選び直すと上の評価によりCauchy列となる。極限を $P$ に入れれば像が閉じていることが分かる。$M=(\operatorname{im}P)^\perp$ への直交射影を $\Pi$ とすると $PQ=I+K$ から $y=-\Pi Ky$ ($y\in M$)。同じ正規直交列の議論で $M$ は有限次元。閉像の余核は $M$ と同型なのでFredholm性が示された。

**指数。** $\tau\in[0,\delta]$ に対して $w_\tau D w_\tau^{-1}=D-\tau\operatorname{sgn}(s)I$ は作用素ノルム連続であり、上の証明で各 $\tau$ においてFredholmである。[Fredholm指数の局所一定性の証明](../../GW/GW1-03/index.md#thm-gw1-03-fredholm)に続く核・像の補空間による有限次元ブロック分解は定義域の形に依存しない。これを各 $\tau$ に適用して指数が区間上で一定と分かる。重みの等長同型は核と余核を保つため元の空間でも指数は同じである。
<!-- proof-end -->

境界条件を横断でなくし零固有値を残すと、例えば $W_0=W_1=\mathbb R$、$D=\partial_s+i\partial_t$ に対し、$\xi_m(s,t)=m^{-1/2}h((s-m^2)/m)$（$h$ は非零の滑らかなコンパクト台実関数）を選べる。$\|\xi_m\|_2=\|h\|_2$ だが $\|D\xi_m\|_2=m^{-1}\|h'\|_2\to0$、台は無限遠へ逃げる。固有関数展開で全帯上の斉次解はどの固有値でも両端の $L^2$ 条件を満たさず核は零。閉像であれば[有界逆定理](../../../解析系/FA/FA2/index.md#thm-fa2-bounded-inverse)から逆評価が成立するはずなので、この場合は像が閉じない。

## 5. 指数を相対次数へつなぐ

Fredholm性は指数が有限であることを示す。値そのものは、負端で減衰できる方向が正端で減衰できる方向に変わるかに依存する。まず一成分で数えよう。

<a id="prop-floer1-03-scalar-index"></a>

<!-- formal-statement-start -->
> **命題（符号が変化する一階実方程式の指数）**
> 有界連続な実関数 $a(s)$ が非零定数 $a_\pm$ へ両端で収束するとする。$T=\partial_s+a(s):H^1(\mathbb R)\to L^2(\mathbb R)$ はFredholmであり、その実指数は

$$
\operatorname{ind}_{\mathbb R}T
=\frac{\operatorname{sgn}a_+-\operatorname{sgn}a_-}{2}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

端の一定係数逆は[全帯の逆の係数ごとの構成](#thm-floer1-03-inverse)で $H=Y=\mathbb R$ とすれば得られる。中央に $a_c=1$ の逆を選び、[無限帯Fredholm性の証明](#thm-floer1-03-fredholm)の切断とコンパクト誤差の議論を実数値の一次元区間へ適用すると閉像と有限次元性を得る。

斉次方程式 $v'+av=0$ に対して $F(s)=\int_0^s a(r)\,dr$ と置く。積と合成関数の微分により

$$
(e^{F(s)}v(s))'=e^{F(s)}(v'(s)+a(s)v(s))=0.
$$

従って斉次解は

$$
v(s)=C\exp\left(-\int_0^s a(r)\,dr\right).
$$

ここでは $v$ で割っていないので、零解も含めて全解が得られる。

積分は各端で $a_\pm s+o(|s|)$ となる。例えば正端で任意の $\varepsilon>0$ に対し十分大きい $R$ から $|a-a_+|<\varepsilon$ とすれば誤差の絶対値は定数と $\varepsilon(s-R)$ の和以下となる。負端でも積分向きを逆にして同じ評価を得る。従って非零の斉次解は負端で $a_-<0$、正端で $a_+>0$ の場合に限り $L^2$ である。その場合 $v'=-av$ も $L^2$。

像に直交する $y\in L^2$ は内部の試験関数から弱方程式 $-y'+ay=0$ を満たす。$a$ は有界だから $y\in H^1$、逆にこの方程式の $L^2$ 解は部分積分で像に直交する。従って余核は $C'\exp(\int_0^s a(r)dr)$ の二乗可積分解からなり、$a_->0,a_+<0$ の場合に一次元、他は零。両次元の差を取ると表示式となる。
<!-- proof-end -->

例えば $a(s)=\tanh s$ なら核は $\operatorname{sech}s$ の実倍で、余核は零。逆向き $a=-\tanh s$ なら余核が一次元になる。この符号規約では負から正へ通過する固有値が指数に $+1$ を与える。

### Maslov指数との対応

Lagrange平面が連続に動くとき、固定したLagrange平面との共通方向が生じたり消えたりする。この交叉に向きを付けて数える量をMaslov指数という。ここでは交叉が非退化な場合をまず定義する。

$W$ 固定、$L(s)$ 可微分のLagrange平面の道とする。交叉点 $s_0$ で

$$
v\in W\cap L(s_0)
$$

を $L(s)$ 内の滑らかなベクトル $v(s)$ へ延長する。二次形式を

$$
q(v)=\omega(v,v'(s_0))
$$

と置く。二つの延長の差は交叉時刻で零となるため、その微分は $L(s_0)$ に入る。実際、局所枠で差を表した係数は交叉時刻ですべて零で、微分後は係数の微分と枠の積だけが残る。$\omega$ の制限が零なので、二次形式は延長の選択によらない。交叉方向 $v,w$ の延長をそれぞれ $v(s),w(s)$ とし、$b(v,w)=\omega(v,w'(s_0))$ と置く。延長によらないことは先ほどと同じ理由で従い、Lagrange性から $\omega(v(s),w(s))=0$ なので、

$$
0=\omega(v'(s_0),w)+\omega(v,w'(s_0))
=-b(w,v)+b(v,w).
$$

従って $b$ は実対称双線形形式であり、$q(v)=b(v,v)$ である。交叉形式が非退化とは $b(v,w)=0$ が全ての $w$ で成立するなら $v=0$ となることをいう。交叉空間の正規直交基底 $(e_j)$ で $b$ の行列を $M_{jk}=b(e_j,e_k)$ と書くと、$b(v,w)=x^{\mathsf T}My$（$x,y$ は座標）だからこの条件は $Mx=0$ が零解のみを持つことに等しい。対称行列を直交対角化したときの正・負の固有値の個数の差を形式の符号といい、非退化な交叉を正則交叉という。

<a id="def-floer1-03-maslov"></a>

<!-- formal-statement-start -->
> **定義（正則交叉での相対Maslov指数）**
> 有限次元シンプレクティック空間で固定Lagrange平面 $W$ と滑らかなLagrange平面の道 $L(s)$ を取る。両端は横断的、内部の交叉は有限個で、全交叉形式 $q(v)=\omega(v,v'(s_0))$ が非退化とする。
> 本講では第一引数を動く平面として

$$
\mu(L,W)=\sum_{s_0}\operatorname{sign}q_{s_0}
$$

> とする。$\operatorname{sign}$ は二次形式の正の固有値の個数から負の固有値の個数を引いた値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-03-maslov -->
**定義の確認**。$W=\mathbb R$、$L(s)=e^{i\theta(s)}\mathbb R$、$\theta$ は $-\pi/4$ から $\pi/4$ へ単調に増加し、零の位置 $s_0$ で $\theta'(s_0)>0$ とする。どの $s$ でも $L(s)$ は非零ベクトル $e^{i\theta(s)}$ が張る実一次元空間であり、二ベクトルが比例するので $\omega$ の制限は零、従ってLagrangeである。両端で $\sin\theta\ne0$ だから $W$ との共通方向はなく、唯一の交叉は $\theta=0$ である。$v(s)=e^{i\theta(s)}x$（$x\in\mathbb R$）を取ると $v(s_0)=x$、$v'(s_0)=i\theta'(s_0)x$ で

$$
q(x)=\omega(x,i\theta'(s_0)x)=\theta'(s_0)x^2.
$$

交叉空間 $\mathbb R$ の基底 $1$ に関する双線形形式は $b(x,y)=\theta'(s_0)xy$、行列は $(\theta'(s_0))$ である。$b(x,1)=0$ なら $x=0$ なので非退化、唯一の固有値が正なので符号は1。従って $\mu(L,W)=1$。
<!-- definition-example-end -->

上辺だけが動く平面モデルでこの数を解析から再現する。$\xi(s,0)\in\mathbb R$、$\xi(s,1)\in e^{i\theta(s)}\mathbb R$ とし、$\theta$ は滑らかで両端で定数、$\theta_\pm\notin\pi\mathbb Z$ とする。$z=e^{-it\theta(s)}\xi$ は両辺で実数値を取る。逆変換 $\xi=e^{it\theta(s)}z$ で、$s$ 微分では $t$ を固定し、$t$ 微分では $\theta(s)$ を固定する。積と連鎖律により

$$
\begin{aligned}
e^{-it\theta}\xi_s&=z_s+it\theta'(s)z,\\
e^{-it\theta}i\xi_t&=iz_t-\theta(s)z.
\end{aligned}
$$

これらを足して

$$
e^{-it\theta}(\partial_s+i\partial_t)\xi
=z_s+iz_t-\theta(s)z+it\theta'(s)z.
$$

最後の項はコンパクト台の零階摂動。Fredholm性を保つ線形補間でこれを除去できる（[無限帯Fredholm定理](#thm-floer1-03-fredholm)は両端の作用素が変わらなければ途中でも成立する）。従って指数は $\partial_s+i\partial_t-\theta(s)$ のものと同じである。$e^{-ik\pi t}$ に展開すれば各係数の $a(s)$ は $k\pi-\theta(s)$ となる。

$|k|\pi>\sup|\theta|+1$ ではこの係数は一定符号かつ絶対値が1以上。一定符号の積分核は $e^{-\int_r^s a}$（負の符号では積分方向を逆転）なので、前節と同じ積分評価でそのモードの逆は一様に有界である。さらに $|a|\ge |k|\pi-\sup|\theta|$ から $|k|\pi\|z_k\|_2$ も $\|f_k\|_2$ の一様定数倍で抑えられ、$z_k'=f_k-a z_k$ で $s$ 微分も制御できる。従って高周波の直和は $L^2\to X$ の逆を持ち、指数には有限個のモードだけが寄与する。

[一階実方程式の指数](#prop-floer1-03-scalar-index)から各モードの寄与は

$$
\frac{\operatorname{sgn}(k\pi-\theta_+)
-\operatorname{sgn}(k\pi-\theta_-)}{2}.
$$

$\theta$ が $\pi\mathbb Z$ を正方向へ横切ると固有値は正から負へ動き、寄与は $-1$。逆向きは $+1$。上の交叉形式は $\theta' x^2$ だから、交叉が全て正則なら

$$
\operatorname{ind}_{\mathbb R}D=-\mu(L,\mathbb R).
$$

下辺を固定したときの符号である。負端から正端へ相対次数が何個変わったかを、この符号で数えられる。直和の独立な回転平面では各指数を足せばよい。

### 一般の境界平面の道を数える

幾何学的stripの線形化を、適合計量に関するユニタリ枠で $D=\partial_s+i\partial_t+B(s,t)$ と表す。ここでは両端で枠が交点の固定枠に一階で収束し、$B\to0$、境界平面 $L_j(s)$ が一階で横断な対 $L_j^\pm$ に収束する場合を扱う。二つの平面が動く場合、交叉方向 $v\in L_0(s_0)\cap L_1(s_0)$ を各平面の道 $v_j(s)$ へ延長して、交叉形式を

$$
q_{10}(v)=\omega(v,v_1'(s_0))-\omega(v,v_0'(s_0))
$$

とする。これは固定平面を第二引数とした上の定義を拡張している。非退化な交叉だけなら符号の和を $\mu(L_1,L_0)$ とする。一般の道では両端横断を保つ小さな摂動で正則交叉にして数え、摂動に依存しないことを下記の相対Maslov理論の入力とする。

<a id="thm-floer1-03-relative-index"></a>

<!-- formal-statement-start -->
> **定理（stripの相対Maslov指数公式）**
> 適合ユニタリ枠で $D=\partial_s+i\partial_t+B$ と表された無限帯の実線形作用素を考える。$B$ は有界連続で両端で一様に零へ収束し、滑らかなLagrange境界平面は両端で横断な対へ一階で収束するとする。
> $D$ の定義域はその境界条件を満たす $H^1$ 切断、値域は $L^2$ 切断とする。このときFredholmであり、

$$
\operatorname{ind}_{\mathbb R}D=-\mu(L_1,L_0).
$$

> ここで相対Maslov指数は第一引数の交叉形式から第二引数の交叉形式を引く規約とする。
<!-- formal-statement-end -->

一般のMaslov理論は [Robbin–Salamon, The spectral flow and the Maslov index, Theorem 7.42 および §5](https://doi.org/10.1112/blms/27.1.1) を定理として用いる。以下ではその式を本講の境界と符号へ変換する。一般の摂動不変性の証明は同文献に譲る。

<!-- proof-start -->
### 証明

端で境界平面を一定にする。$L_j(s)$ の $L_j^\pm$ への直交射影は十分遠い端で可逆であり、その逆で固定基底を $L_j(s)$ の基底に移して実Gram--Schmidt法で正規直交化できる。

基底とその $i$ 倍の組を固定端の組へ移すユニタリ行列は $I$ へ一階で収束する。十分遠い端では行列対数を $I$ の近傍で選べるため、二つの端の行列の対数を $t$ で線形補間し指数を取れば、上下辺を同時に固定するユニタリ枠を作れる。

$s$ の切断関数を対数に掛け、中央では恒等行列にする。この変換と逆は $H^1$ および $L^2$ で有界である。枠微分が端で零へ収束するため、新しい零階項の極限も零である。境界平面の道は端で横断性を保ちながら変形されたので、相対Maslov指数は不変である。

固定境界の解析にも接続できる。端で平面を固定した後、各 $L_j(s)$ の滑らかな正規直交実基底を選び、端で一定に取る。実基底とその $i$ 倍を並べたユニタリ行列を $U_j(s)$ とする。基底は区間上で滑らかに延長でき、例えば局所枠を順につなぎ、端では一定の平面上で得た基底を一定に保てばよい。

$s=-R$（負端の平面が一定の位置）で $U_0(-R)$ と $U_1(-R)$ を結ぶ滑らかなユニタリ行列の道 $U(-R,t)$ を取る。ユニタリ行列はユニタリ対角化で各固有値を $e^{i\alpha}$ と表せるので、位相を連続に変化させれば任意の二行列を結べる。

行列 $K_j(s)=U_j'(s)U_j(s)^{-1}$ は反Hermiteである。$U_j^*U_j=I$ を微分すれば $K_j^*=-K_j$ が分かる。$K(s,t)=(1-t)K_0(s)+tK_1(s)$ と置き、

$$
\partial_s U(s,t)=K(s,t)U(s,t)
$$

を先ほどの初期値で解く。$(U^*U)_s=U^*(K^*+K)U=0$ だから解はユニタリ。両辺 $t=j$ では初期値と方程式が $U_j$ に一致するので $U(s,j)=U_j(s)$。$K_j$ は端で零だから $U$ は各端で $s$ に依存しない。中央はコンパクト区間上の滑らかな係数の常微分方程式なので、$U$ と一階微分は有界である。

$\xi=Uz$ とすると $z$ は固定された実境界を持ち、

$$
U^{-1}D(Uz)=\partial_s z+i\partial_t z+
U^{-1}(U_s+iU_t+BU)z.
$$

端の作用素は $U_\pm^{-1}(i\partial_t)U_\pm$ であり、元の端の横断Lagrange条件とのユニタリ同値により自己共役、固有基底とギャップを保つ。従って[固定境界の無限帯Fredholm性](#thm-floer1-03-fredholm)が適用でき、一般の相対指数公式も両端のギャップより小さい非負重みで値が変わらない。以下で相対Maslov指数を計算するための文献の式を適用する。

相対指数の計算では固定実境界への変換の前（端だけを固定した表示）に戻る。次に文献の横断座標を $\tau=1-t$、長手座標を $s$ とする。文献の作用素は $\partial_s-i\partial_\tau+S(\tau,s)$ となり、境界対は

$$
\Lambda(s)=L_1(s)\times L_0(s)
\subset (V\oplus V,-\omega\oplus\omega).
$$

両端の零階係数は零なので文献の端の基本解は恒等行列、グラフは対角平面 $\Delta=\{(v,v):v\in V\}$。$\Delta\cap\Lambda^\pm$ は零であり、文献の端の横断条件を満たす。係数の一様収束と端で境界が一定という条件も上で確認した。従って Theorem 7.42 の式 (20) の最初の二項は一定な横断対のMaslov指数であり零となり、

$$
\operatorname{ind}_{\mathbb R}D=-\mu(\Delta,\Lambda).
$$

交叉方向 $(v,v)$ に対する $\Lambda$ の交叉形式は $-\omega(v,v_1')+\omega(v,v_0')$。$\Delta$ は固定なので、第一引数の形式から第二引数の形式を引くと $q_{10}(v)$ になる。正則交叉の符号の和で $\mu(\Delta,\Lambda)=\mu(L_1,L_0)$。一般の場合も文献の摂動不変性で同じ等式が成立する。これで本講の符号へ変換できた。
<!-- proof-end -->

幾何学的な線形化では[stripの境界条件の線形化](../FLOER1-01/index.md#prop-floer1-01-linearization)により、端で写像の微分と枠の微分が零へ収束するなら零階係数は零へ収束する。ユニタリ枠は例えば端では交点近傍の滑らかなユニタリ枠を写像で引き戻して選び、中央で滑らかな枠につなぐ。固定境界のFredholm性はこの章で直接証明し、一般の相対指数の計算には上記文献を用いた。

閉曲面の[擬正則写像の実指数](../../GW/GW1-03/index.md#thm-gw1-03-index)は種数と第一Chern数から計算する。一方、ここでは交点間のstripと境界平面の道が指数の入力であり、閉曲面の公式を流用できない。相対次数を交点ごとの整数の差とするには、適切なgrading（次数の一貫した選択）が別に必要である。一般にはstripの相対類に依存する指数を先に扱う。

## 6. 演習

### Level A

<a id="ex-floer1-03-a01"></a>
#### FLOER1-03-A01 重みの限界
- Level: A

$v=e^{-2|s|}e^{i\pi t/2}$ は実軸・虚軸の境界を持つ。$\delta=1,2$ で $X_\delta$ に入るか調べよ。

<!-- solution-start -->
**詳細解答**。[重み付き空間](#def-floer1-03-weighted)で $\delta=1$ の重み付き値は $z=e^{-|s|}e^{i\pi t/2}$。$\|z\|_2^2=2\int_0^\infty e^{-2s}ds=1$。$z_s=-\operatorname{sgn}(s)z$、$z_t=i\pi z/2$ なので

$$
\|z\|_{H^1}^2=1+1+\pi^2/4.
$$

下端は実数、上端は純虚数であり条件を満たす。$\delta=2$ では $|z|=1$、帯の面積は無限大なので $z\notin L^2$、従って $X_2$ に入らない。
<!-- solution-end -->

<a id="ex-floer1-03-a02"></a>
#### FLOER1-03-A02 ギャップと重みの符号
- Level: A

$W_0=\mathbb R,W_1=e^{i\pi/3}\mathbb R$ で零に最も近い正負の固有値を求めよ。$\delta=\pi/3$ の重みでどちらの端に零固有値が現れるか。

<!-- solution-start -->
**詳細解答**。[横断Lagrange対の展開](#thm-floer1-03-spectrum)の $k=0,1$ を代入すると負は $-\pi/3$、正は $2\pi/3$。従ってギャップは $\pi/3$。正端では $\mu-\delta$ なので $k=0,1$ は $-2\pi/3,\pi/3$ であり零はない（他の $k$ はこれらから $\pi$ の整数倍離れる）。負端では $\mu+\delta$ なので $k=0$ が零になる。許容範囲の等号を一般に許してはいけない。
<!-- solution-end -->

<a id="ex-floer1-03-a03"></a>
#### FLOER1-03-A03 一つのモードの逆
- Level: A

$\mu=2$、$f(s)=e^{-s}$ ($s\ge0$)、$f(s)=0$ ($s<0$) とする。$v'+2v=f$ の $H^1(\mathbb R)$ 解を求めよ。

<!-- solution-start -->
**詳細解答**。正の固有値なので[全帯の逆](#thm-floer1-03-inverse)の過去からの積分を選ぶ。$s<0$ なら積分は零。$s\ge0$ なら

$$
v(s)=e^{-2s}\int_0^s e^r\,dr=e^{-s}-e^{-2s}.
$$

原点で左右の値は零で一致する。正半直線で $v'=-e^{-s}+2e^{-2s}$、負半直線では零。いずれも二乗可積分で、$v'+2v=e^{-s}$ が正側で成立する。全帯で非零の斉次解 $Ce^{-2s}$ は負端で発散するため、これが一意である。
<!-- solution-end -->

<a id="ex-floer1-03-a04"></a>
#### FLOER1-03-A04 指数と余核
- Level: A

$T=\partial_s-\tanh s$ の核、余核、実指数を求めよ。

<!-- solution-start -->
**詳細解答**。定義域を $H^1(\mathbb R)$、値域を $L^2(\mathbb R)$ とする。斉次方程式は $v'=(\tanh s)v$。[一階実方程式の指数の証明](#prop-floer1-03-scalar-index)と同じ積分因子を使う。$\cosh s>0$ だから $(v/\cosh s)'=(v'-(\tanh s)v)/\cosh s=0$。従って $v=C\cosh s$ であり、二乗可積分なのは $C=0$ のみ。余核の方程式は $-y'-(\tanh s)y=0$ なので $y=C'/\cosh s$。これは値も微分も二乗可積分である。両端の係数は $a_-=1,a_+=-1$ だから[一階実方程式の指数](#prop-floer1-03-scalar-index)により閉像が保証され、

$$
\operatorname{ind}_{\mathbb R}T=0-1=-1.
$$
<!-- solution-end -->

### Level B

<a id="ex-floer1-03-b01"></a>
#### FLOER1-03-B01 吸収できる重み
- Level: B

$V=\mathbb C$、$W_0=\mathbb R$、$W_1=e^{i}\mathbb R$ とする。[横断Lagrange対の固有関数展開](#thm-floer1-03-spectrum)から $\gamma=\min(1,\pi-1)=1$ である。正端の方程式が $D_0v=Qv_t$、$\sup|Q|\le1/5$ とする。本文の有界な重み $h_N$ と切断 $\chi$ を使う。$\delta=1/2$ で一様評価を得よ。$\delta=9/10$ では同じ議論で何が起きるか。

<!-- solution-start -->
**詳細解答**。[重み付き一階減衰の証明](#thm-floer1-03-decay)と同じ $z_N=h_N\chi v$ に対し

$$
\|D_0z_N\|_2\le
\left(\frac15+\delta\right)\|D_0z_N\|_2+
e^\delta\|\chi'v\|_2.
$$

$\delta=1/2$ では左へ移した係数は $1-1/5-1/2=3/10$。よって

$$
\|D_0z_N\|_2\le \frac{10e^{1/2}}{3}\|\chi'v\|_2.
$$

[全帯の逆評価](#thm-floer1-03-inverse)から $\|z_N\|_{H^1}^2\le (1+\gamma^{-2})\|D_0z_N\|_2^2=2\|D_0z_N\|_2^2$（$A=i\partial_t$ なので $\|Az_N\|_2=\|\partial_t z_N\|_2$）。$\delta=9/10$ では左の係数は $1-1/5-9/10=-1/10$ となって吸収できない。この計算だけから減衰そのものが失敗したとは言えない。端を遠くして $\sup|Q|<1/10$ にできれば同じ方法が働く。
<!-- solution-end -->

<a id="ex-floer1-03-b02"></a>
#### FLOER1-03-B02 零モードが逃げる
- Level: B

$W_0=W_1=\mathbb R$、$h\in C_c^\infty((0,1),\mathbb R)$、$\|h\|_2=1$ とし、$v_m(s,t)=m^{-1/2}h((s-m^2)/m)$ とする。$H^1$ ノルム、$Dv_m$ のノルム、任意の固定有限帯での極限を求めよ。

<!-- solution-start -->
**詳細解答**。$x=(s-m^2)/m$ と置くと $ds=m\,dx$、$t$ の長さは1である。従って

$$
\|v_m\|_2^2=\int_0^1 |h(x)|^2dx=1.
$$

$\partial_t v_m=0$、$\partial_s v_m=m^{-3/2}h'(x)$ より

$$
\|Dv_m\|_2^2=m^{-2}\|h'\|_2^2,\qquad
\|v_m\|_{H^1}^2=1+m^{-2}\|h'\|_2^2.
$$

台は $s\in[m^2,m^2+m]$ に含まれるので、任意の固定有限帯では十分大きい $m$ で恒等的に零。局所では零へ収束するが、大域の $L^2$ ノルムは1のまま。本文の[無限帯Fredholm定理](#thm-floer1-03-fredholm)の端のギャップ仮定が失われているので、局所コンパクト性だけではこの列を制御できない。
<!-- solution-end -->

<a id="ex-floer1-03-b03"></a>
#### FLOER1-03-B03 端の摂動のコンパクト性
- Level: B

$M(s,t)=1/(1+|s|)$ とする。掛け算 $M:X\to L^2$ がコンパクトであることを、有界列から収束部分列を選ぶ方法で示せ。

<!-- solution-start -->
**詳細解答**。$\|v_m\|_{H^1}\le K$ とする。各整数 $R$ の有限帯上で、[無限帯Fredholm性の証明](#thm-floer1-03-fredholm)と同じ拡張と切断を行い、[Rellich--Kondrachov theorem](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-rellich-h01-l2)により $L^2$ 収束部分列を選ぶ。$R=1,2,\ldots$ と入れ子の部分列を作り、対角部分列を取ると、どの固定 $R$ でも収束する。これを $v_{m_j}$ と書く。尾部では

$$
\|M(v_{m_j}-v_{m_k})\|_{L^2(|s|>R)}
\le\frac{2K}{1+R}.
$$

任意の $\varepsilon>0$ に対しこの上界が $\varepsilon/2$ 未満となる $R$ を先に選ぶ。有限帯上では $|M|\le1$、対角列がCauchyなので $j,k$ を大きくすれば残りのノルムも $\varepsilon/2$ 未満。従って $Mv_{m_j}$ は大域の $L^2$ でCauchyとなり、完備性から収束する。
<!-- solution-end -->

### Level C

<a id="ex-floer1-03-c01"></a>
#### FLOER1-03-C01 回転境界と相対指数
- Level: C

下辺は $\mathbb R$、上辺は $e^{i\theta(s)}\mathbb R$、$\theta$ は $-\pi/2$ から $3\pi/2$ まで滑らかに単調増加し、両端で定数とする。$\theta=0,\pi$ を通る点で微分は正とする。$D=\partial_s+i\partial_t$ の実指数、相対Maslov指数、$0<\delta<\pi/2$ の重みを付けた指数を求めよ。

<!-- solution-start -->
**詳細解答**。まず $z=e^{-it\theta(s)}\xi$ で境界を固定し、

$$
e^{-it\theta}D\xi
=z_s+iz_t-\theta z+it\theta'z.
$$

最後の係数は有界でコンパクト台。両端は $i\partial_t-\theta_\pm$ であり、固定実境界の固有値は $k\pi-\theta_\pm$。どちらも零に最も近い絶対値は $\pi/2$。従って[無限帯Fredholm定理](#thm-floer1-03-fredholm)の仮定を満たし、最後の項を連続的に除去しても指数は不変。

$e^{-ik\pi t}$ に展開すると係数は $a_-(k)=k\pi+\pi/2$、$a_+(k)=k\pi-3\pi/2$。$k=0,1$ では前者正、後者負なので各 $-1$。[一階実方程式の指数](#prop-floer1-03-scalar-index)から、$k\le-1$ では両者負、$k\ge2$ では両者正で各寄与は零。高周波は本文の回転境界の一様逆評価により無限個の余核を生じない。従って指数は $-2$。

[相対Maslov指数](#def-floer1-03-maslov)では $\theta=0,\pi$ の二交叉とも $q(x)=\theta' x^2$ が正定値なので $\mu=2$。指数は $-\mu$ と一致する。重みの範囲では両端のギャップを越えず、Fredholm定理の指数不変性により重み付き指数も $-2$。
<!-- solution-end -->

## 7. 次講への接続

指数は線形化の核の次元と余核の次元の差である。余核が零なら初めて核の次元が期待次元と一致する。次講では横断性による余核の制御、解列のコンパクト性、stripが折れ曲がる場合の境界を分けて調べる。指数だけで解の正則性やモジュライのコンパクト性を結論しない。

参考文献：J. Robbin / D. Salamon, [The spectral flow and the Maslov index](https://doi.org/10.1112/blms/27.1.1)；P. Seidel, [Fukaya Categories and Picard–Lefschetz Theory](https://ems.press/books/zlam/2/contents)。
