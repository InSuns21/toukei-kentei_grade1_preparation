# MICA5 座標変換と余法束

[MICA4の直線デルタ](../MICA4/index.md#thm-mica4-hyperplane)は、直線に接する周波数方向では滑らかで、接線を消す方向だけに波面を持ちました。しかし、斜めの直線を水平にする座標を選ぶと、成分としての「垂直方向」は変わってしまいます。波面集合を曲がった空間で使うには、**座標を取り替えても同じ幾何学的方向を指す**ことを証明しなければなりません。

例えば水平線 $y=0$ を $(u,v)=(x,y+2x)$ へ写すと、線は $v=2u$ になります。旧座標の法線を表す1形式 $dy$ は、新座標では $dv-2du$ です。成分 $(0,1)$ が $(-2,1)$ に変わるのは、幾何学的な方向が変わったからではありません。この章では、周波数が**接ベクトルではなく余接ベクトル**として変換する理由を局所Fourier変換から証明し、その帰結として局所的な方向情報を多様体の余接束へ貼り合わせます。

ここでもFourier変換は [MICA1の局所Fourier変換](../MICA1/index.md#def-mica1-local-fourier)と同じく

$$
\widehat{\varphi}(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}\varphi(x)\,dx
$$

とします。滑らかな多様体、接空間・余接空間・余接束は [GEO2の定義](../../../幾何系/GEO/GEO2/index.md#def-geo2-cotangent-bundle)まで既習とします。座標に沿う分布はまず $\mathbb R^n$ の開集合上で扱い、後半で一般の多様体へ貼り合わせます。

## 1. 座標を動かすと、分布と周波数はどう動くか

$U,V\subset\mathbb R^n$ を開集合、$F:U\to V$ を滑らかな微分同相写像とします。通常の滑らかな関数 $u(x)$ なら新しい座標 $y=F(x)$ で同じ関数は $u(F^{-1}(y))$ です。分布は点ごとに値を持たないので、試験関数に対する作用で同じ操作を定めます。

変数変換 $dy=|\det DF(x)|\,dx$ を使うと、滑らかな $u$ について

$$
\int_V u(F^{-1}(y))\varphi(y)\,dy
=\int_U u(x)\varphi(F(x))|\det DF(x)|\,dx
$$

です。右辺は $u$ が分布でも意味を持ちます。$\varphi\in C_c^\infty(V)$ なら $F^{-1}(\operatorname{supp}\varphi)$ は $U$ のコンパクト集合であり、右辺の試験関数は滑らかでコンパクト支持だからです。

<a id="def-mica5-coordinate-pushforward"></a>

<!-- formal-statement-start -->
> **定義（微分同相による分布の座標移送）**  
> $F:U\to V$ を $\mathbb R^n$ の開集合間の滑らかな微分同相写像、$u\in\mathcal D'(U)$ とする。$F_*u\in\mathcal D'(V)$ を、すべての $\varphi\in C_c^\infty(V)$ に対して

$$
\langle F_*u,\varphi\rangle
=\left\langle u,(\varphi\circ F)|\det DF|\right\rangle
$$

> で定める。これは滑らかな関数に対して $F_*u=u\circ F^{-1}$ と一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica5-coordinate-pushforward -->
### 直接例：伸縮による点デルタの移送

**定義の確認**。試験関数に対する作用が定義式を満たすことを先に確かめます。

$n=1$、$F(x)=3x$、$u=\delta_2$ とします。$DF=3$ なので定義から

$$
\langle F_*\delta_2,\varphi\rangle
=\langle\delta_2,3\varphi(3x)\rangle=3\varphi(6).
$$

従って $F_*\delta_2=3\delta_6$ です。ここで $F_*$ は「**スカラー関数として**座標表示を移す」規約です。測度としての押し出し $\varphi\mapsto\langle\delta_2,\varphi\circ F\rangle$ とはJacobian因子が違います。ただし係数 $3$ は滑らかで零でないので、波面方向には影響しません。
<!-- definition-example-end -->

次に周波数を考えます。新座標の位相 $e^{-iy\cdot\eta}$ を旧座標へ代入すると $e^{-iF(x)\cdot\eta}$ です。点 $x$ で位相を微分すると

$$
d_x(F(x)\cdot\eta)=\sum_{j=1}^n\sum_{i=1}^n
\frac{\partial F^j}{\partial x^i}(x)\eta_j\,dx^i,
\qquad \xi=(DF_x)^{\mathsf T}\eta.
$$

$\xi$ と $\eta$ はそれぞれ旧座標と新座標での余ベクトル成分です。$DF_x$ は接ベクトルを新座標へ送りますが、余ベクトルは**引き戻す向き**で $DF_x^{\mathsf T}$ が働きます。逆に新座標の成分は

$$
\eta=(DF_x)^{-\mathsf T}\xi.
$$

この式は [GEO2の余接束の座標変換](../../../幾何系/GEO/GEO2/index.md#prop-geo2-cotangent-bundle-smooth)でも導かれたものです。接ベクトルの変換 $DF_x\,v$ と混同しないでください。

### 具体例：せん断した直線

$F(x,y)=(u,v)=(x,y+2x)$ では

$$
DF=\begin{pmatrix}1&0\\2&1\end{pmatrix},\qquad
(DF)^{-\mathsf T}=\begin{pmatrix}1&-2\\0&1\end{pmatrix}.
$$

旧座標の線 $y=0$ の法線 $\xi=(0,\tau)$ は、$\eta=(-2\tau,\tau)$ へ移ります。新座標の線 $v=2u$ の接ベクトルは $(1,2)$ なので

$$
(-2\tau,\tau)\cdot(1,2)=0.
$$

どちらの座標でも、同じ「接方向を消す」という幾何学的条件を表しています。

## 2. Fourier減衰から座標変換則を証明する

位相の微分だけでは、分布のFourier変換の**全次数の急減少**が保たれる証明にはなりません。非線形 $F$ では、旧座標の平面波が新座標で平面波でなくなるためです。そこで「位相の勾配が零にならない領域では振動積分が任意の次数で小さくなる」という計算を使います。

<a id="lem-mica5-nonstationary-phase"></a>

<!-- formal-statement-start -->
> **補題（非停留位相の積分評価）**  
> $K\subset\mathbb R^n$ をコンパクト集合、$a\in C_c^\infty(\mathbb R^n)$ を $\operatorname{supp}a\subset K$ とする。実数値の滑らかな位相 $\Phi_\lambda$ が $K$ の近傍で定義され、$\lambda\ge1$ に対して、ある $c>0$ と各多重指数 $\alpha$ に対する $C_\alpha$ が一様に存在し

$$
|\nabla\Phi_\lambda(x)|\ge c\lambda,
\qquad |\partial_x^\alpha\Phi_\lambda(x)|\le C_\alpha\lambda
\quad (|\alpha|\ge1,\ x\in K)
$$

> を満たすとする。このとき任意の整数 $N\ge0$ に対し $C_N'>0$ が存在して

$$
\left|\int a(x)e^{i\Phi_\lambda(x)}\,dx\right|
\le C_N'\lambda^{-N}
$$

> が成り立つ。定数は指定した一様な微分上界、$K$、$a$ にのみ依存する。
<!-- formal-statement-end -->

### 証明の見取り図

勾配が零でないので、位相の指数関数を一度微分すると元の指数関数に戻る微分作用素を作れます。その作用素を部分積分で振幅 $a$ へ移すたびに $\lambda^{-1}$ を一つ得ます。重要なのは勾配の下界だけでなく、高階微分の上界も使うことです。

<!-- proof-start -->
### 証明

$q_\lambda=\nabla\Phi_\lambda/|\nabla\Phi_\lambda|^2$ と置き、

$$
L_\lambda=\frac1i q_\lambda\cdot\nabla_x
$$

とすると、$\nabla_x e^{i\Phi_\lambda}=i(\nabla\Phi_\lambda)e^{i\Phi_\lambda}$ より $L_\lambda e^{i\Phi_\lambda}=e^{i\Phi_\lambda}$ です。$|\nabla\Phi_\lambda|\ge c\lambda$ なので $q_\lambda=O(\lambda^{-1})$ です。さらに分母を微分した項は

$$
\partial_{x_j}\bigl(|\nabla\Phi_\lambda|^{-2}\bigr)
=-2|\nabla\Phi_\lambda|^{-4}
\sum_k (\partial_{x_k}\Phi_\lambda)
(\partial_{x_j}\partial_{x_k}\Phi_\lambda),
$$

各分子因子が $O(\lambda)$、分母が $\lambda^4$ のため、この一階微分も $O(\lambda^{-2})$ です。積の微分を繰り返すと、仮定した全階数の上界により $\partial^\alpha q_\lambda=O_\alpha(\lambda^{-1})$ が従います。

コンパクト支持のため境界項はなく、形式的随伴 $L_\lambda^*$ を $a$ に移して

$$
\int a e^{i\Phi_\lambda}\,dx
=\int (L_\lambda^*)^N a\,e^{i\Phi_\lambda}\,dx,
\qquad
L_\lambda^*a=-\frac1i\operatorname{div}(a q_\lambda)
$$

を得ます。各回で $a$ の有限階微分に $O(\lambda^{-1})$ の係数が掛かるので、$\|(L_\lambda^*)^N a\|_\infty\le C_N\lambda^{-N}$ です。積分領域は固定コンパクト集合 $K$ に含まれるから、体積を掛けて結論を得ます。$\square$
<!-- proof-end -->

これを座標変換に当てはめます。[MICA3の波面集合の定義](../MICA3/index.md#def-mica3-wavefront)では、ある点・方向が $WF(u)$ に**入らない**ためには、点の近くで $1$ となるcutoffと、方向を含む開錐上で全次数の急減少が存在すれば十分でした。

<a id="thm-mica5-coordinate-change"></a>

<!-- formal-statement-start -->
> **定理（波面集合の微分同相による変換則）**  
> $F:U\to V$ を $\mathbb R^n$ の開集合間の滑らかな微分同相写像、$u\in\mathcal D'(U)$、$v=F_*u$ を[分布の座標移送](#def-mica5-coordinate-pushforward)とする。このとき

$$
WF(v)=\left\{\left(F(x),(DF_x)^{-\mathsf T}\xi\right):
(x,\xi)\in WF(u)\right\}.
$$

> 特に $(x,\xi)\notin WF(u)$ なら、$y=F(x)$、$\eta=(DF_x)^{-\mathsf T}\xi$ として $(y,\eta)\notin WF(v)$ であり、逆向きの含意も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

旧座標で規則的な錐を一つ取ります。その中へ新座標の周波数を $DF_x^{\mathsf T}$ で戻すよう、小さな座標近傍と錐を選びます。Fourier積分を旧座標の周波数 $\zeta$ で表したとき、規則的な錐の高周波部分では $\widehat{\chi u}(\zeta)$ が急減少し、それ以外では位相の勾配 $\zeta-DF_x^{\mathsf T}\eta$ が零から離れます。後者へ[非停留位相の補題](#lem-mica5-nonstationary-phase)を適用します。逆写像でも同じ論法を使うことで等号になります。

<!-- proof-start -->
### 証明

$(x_0,\xi_0)\notin WF(u)$ を固定し、$y_0=F(x_0)$、$\eta_0=(DF_{x_0})^{-\mathsf T}\xi_0$ とします。規則性の定義から、$\chi\in C_c^\infty(U)$ が $x_0$ 近傍で $1$ となり、開錐 $\Gamma\ni\xi_0$ 上で

$$
|\widehat{\chi u}(\zeta)|\le C_N(1+|\zeta|)^{-N}
\quad(\zeta\in\Gamma,\ N\ge0)
$$

を満たします。$\Gamma$ より方向幅が小さい開錐 $\Gamma_0$ を $\xi_0$ の周りに取り、単位球面上の閉包が $\Gamma$ 内に収まるようにします。$F$ の微分の連続性と可逆性から、小さい $x_0$ の近傍 $W\Subset U$ と $\eta_0$ の開錐 $\Lambda$ を選び、任意の $x\in\overline W$、$\eta\in\Lambda$ に対し

$$
(DF_x)^{\mathsf T}\eta\in\Gamma_0,
\qquad c_0|\eta|\le |(DF_x)^{\mathsf T}\eta|\le C_0|\eta|
$$

とできます。ここで $W$ を $\chi=1$ の領域に含めます。$\rho\in C_c^\infty(V)$ を $\rho=1$ near $y_0$、$F^{-1}(\operatorname{supp}\rho)\subset W$ となるように取り、$a(x)=\rho(F(x))|\det DF_x|$ とします。

$w=\chi u$ はコンパクト支持なので、[MICA1のFourier変換の多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth)から、ある $m,C$ について $|\widehat w(\zeta)|\le C(1+|\zeta|)^m$ です。コンパクト支持分布のFourier反転を、試験関数 $a(x)e^{-iF(x)\cdot\eta}$ への作用に用いると

$$
\begin{aligned}
\widehat{\rho v}(\eta)
&=\langle w,a(x)e^{-iF(x)\cdot\eta}\rangle\\
&=(2\pi)^{-n}\int_{\mathbb R^n}\widehat w(\zeta)K(\eta,\zeta)\,d\zeta,\\
K(\eta,\zeta)
&=\int_{\mathbb R^n}a(x)e^{i(x\cdot\zeta-F(x)\cdot\eta)}\,dx.
\end{aligned}
$$

後者の積分は各 $\eta$ に対して $\zeta$ 方向に急減少するため、$\widehat w$ の多項式増大と合わせて絶対収束します。$\eta\in\Lambda$、$|\eta|\ge1$ とし、$\zeta$ を次の二つに分けます。

**（1）$\zeta\in\Gamma$ かつ $|\zeta|\ge\varepsilon|\eta|$。** $\varepsilon>0$ は後で小さく固定します。$|K|\le\|a\|_{L^1}$ と規則的錐上の急減少により、任意の $N>n$ について

$$
\int_{\Gamma\cap\{|\zeta|\ge\varepsilon|\eta|\}}
|\widehat w(\zeta)K(\eta,\zeta)|\,d\zeta
\le C_N'\int_{|\zeta|\ge\varepsilon|\eta|}(1+|\zeta|)^{-N}\,d\zeta
\le C_N''(1+|\eta|)^{n-N}.
$$

**（2）残りの $\zeta$。** 位相 $\Phi_{\eta,\zeta}(x)=x\cdot\zeta-F(x)\cdot\eta$ の勾配は

$$
\nabla_x\Phi_{\eta,\zeta}(x)
=\zeta-(DF_x)^{\mathsf T}\eta.
$$

$|\zeta|<\varepsilon|\eta|$ なら $\varepsilon<c_0/2$ を選ぶことで、その大きさは $\ge(c_0/2)|\eta|$ です。それ以外で $\zeta\notin\Gamma$ なら、$DF_x^{\mathsf T}\eta$ が球面上で $\Gamma_0$ の内側を動き $\zeta$ が $\Gamma$ の外側にあるため、角度の分離から

$$
|\zeta-(DF_x)^{\mathsf T}\eta|
\ge c_1(|\zeta|+|\eta|)
$$

となります。前者でも $|\zeta|<\varepsilon|\eta|$ なので同じ形の下界を得ます。さらに位相の一階以上の $x$ 微分は $C_\alpha(|\zeta|+|\eta|)$ 以下です。[非停留位相の補題](#lem-mica5-nonstationary-phase)を $\lambda=|\zeta|+|\eta|$ に適用して、任意の $L$ について

$$
|K(\eta,\zeta)|\le C_L(1+|\eta|+|\zeta|)^{-L}
$$

が得られます。よって多項式増大を掛けて積分すれば

$$
\int_{\text{（2）の領域}}|\widehat w(\zeta)K(\eta,\zeta)|\,d\zeta
\le C_L'\int_{\mathbb R^n}(1+|\zeta|)^m
(1+|\eta|+|\zeta|)^{-L}\,d\zeta
\le C_L''(1+|\eta|)^{m+n-L},
$$

ここで最終の不等式は $\zeta=(1+|\eta|)t$ と同程度の尺度変更で評価でき、$L>m+n$ を取っています。$N,L$ は任意に大きく選べるため $\widehat{\rho v}$ は $\Lambda$ 上で全次数急減少します。$|\eta|<1$ は連続性とコンパクト性から定数を増やせばよく、$(y_0,\eta_0)\notin WF(v)$ です。

同じ証明を微分同相 $F^{-1}:V\to U$ と $v$ に適用します。分布の移送の定義で $|(DF^{-1})_y|=|\det DF_x|^{-1}$ が成り立つため $(F^{-1})_*v=u$ です。したがって逆向きの規則性も得られ、集合の等号が成立します。$\square$
<!-- proof-end -->

特に直線を曲線へ写しても、波面の「どちらの方向で急減少しないか」は上の逆転置変換に従います。ただし、この定理は**微分同相**の定理です。導関数が退化する一般の滑らかな写像に対し同じ等号を主張してはいけません。その場合の引き戻し条件は後の講義で扱います。

## 3. 多様体上で座標の継ぎ目を消す

$M$ を $n$ 次元滑らかな多様体とします。$T^*M$ の点は、基点 $p\in M$ と余ベクトル $\alpha_p\in T_p^*M$ の組です。[余接束の局所自明化](../../../幾何系/GEO/GEO2/index.md#prop-geo2-cotangent-bundle-smooth)によれば、座標 $x:O\to U\subset\mathbb R^n$ の中では $\alpha_p$ を列成分 $\xi$ で表せます。零余ベクトルの集合を**零切断** $0_M=\{(p,0):p\in M\}$ と記します。

多様体上の分布は、コンパクト支持の滑らかな密度に作用する連続線形汎関数として扱います。$x$ 座標で密度が $\varphi(x)|dx^1\cdots dx^n|$ と表されるときの作用を、$\mathbb R^n$ 上の局所分布 $u_x$ によって表します。別の座標 $y=F(x)$ へ移ると、同じ試験密度は旧座標で $\varphi(F(x))|\det DF(x)|\,|dx^1\cdots dx^n|$ となります。その作用を比べると $u_y=F_*u_x$ が従い、第1節のJacobian規約が座標表示に結び付きます。

<a id="def-mica5-manifold-wavefront"></a>

<!-- formal-statement-start -->
> **定義（多様体上の波面集合）**  
> $M$ を滑らかな $n$ 次元多様体、$u$ をその上の分布とする。$p\in M$、$0\ne\alpha_p\in T_p^*M$ に対し、$p$ を含む座標 $x:O\to U$ で表した余ベクトル成分を $\xi$、分布を $u_x$ とする。
>
> $(p,\alpha_p)\in WF(u)$ とは、$(x(p),\xi)\in WF(u_x)$ であることをいう。従って

$$
WF(u)\subset T^*M\setminus 0_M.
$$

> この条件は座標の選択によらない。
<!-- formal-statement-end -->

### なぜ貼り合うか

二つの座標 $x,y$ の重なりで $F=y\circ x^{-1}$ とすると、余接成分は $\eta=(DF)^{-\mathsf T}\xi$ に従います。局所分布も $u_y=F_*u_x$ なので、[波面集合の座標変換則](#thm-mica5-coordinate-change)が同じ変換を与えます。したがって両座標での所属判定が一致します。

より小さい座標近傍へ制限しても [MICA3の局所性](../MICA3/index.md#lem-mica3-locality)により判定は不変です。よって重なりでは同じ部分集合を記述し、全体として $T^*M\setminus0_M$ に貼り合います。

<!-- definition-example-start: def-mica5-manifold-wavefront -->
### 直接例：点デルタは座標を変えても全方向

**定義の確認**。$M=\mathbb R^2$、$u=\delta_{(0,0)}$ とします。元の座標では [点デルタの波面集合](../MICA4/index.md#prop-mica4-point-delta)により、原点上の全ての非零余ベクトルが $WF(u)$ に入り、原点以外では入りません。微分同相 $F(x,y)=(x,y+2x)$ で座標を変えると $DF$ は可逆で、$(DF)^{-\mathsf T}$ は $\mathbb R^2\setminus\{0\}$ をそれ自身へ全単射として写します。[変換則](#thm-mica5-coordinate-change)によって新座標でも原点上の非零余ベクトルが全て残ります。これは定義で要求した座標によらない所属条件を、点・方向の両方で検証した例です。
<!-- definition-example-end -->

## 4. 余法束は接方向を消す余ベクトルの集合

[SYM6の余法束](../../../幾何系/SYM/SYM6/index.md#def-sym6-conormal-bundle)は、埋め込み部分多様体 $S\subset M$ の各点で接ベクトル全てに零を与える余ベクトルの集合でした。ここではその局所座標を、波面集合の周波数と突き合わせます。「法線ベクトル」を計量で選ぶ必要はなく、余ベクトルが接方向を消すという線形条件だけで定まります。

<a id="prop-mica5-conormal-coordinates"></a>

<!-- formal-statement-start -->
> **命題（余法束の局所座標と自然性）**  
> $M$ を $n$ 次元滑らかな多様体、$S\subset M$ を次元 $k$ の滑らかな埋め込み部分多様体とする。[余法束](../../../幾何系/SYM/SYM6/index.md#def-sym6-conormal-bundle)を

$$
N^*S=\{(p,\alpha_p)\in T^*M:p\in S,
\ \alpha_p(v)=0\ (\forall v\in T_pS)\}
$$

> とする。$S$ に適合した局所座標 $(s,z)\in\mathbb R^k\times\mathbb R^{n-k}$ で $S=\{z=0\}$ なら、余接成分を $(\sigma,\zeta)$ として

$$
N^*S=\{(s,0;0,\zeta):s\in\mathbb R^k,\ \zeta\in\mathbb R^{n-k}\}
$$

> が局所的に成り立つ。また $F:M\to M'$ を微分同相写像、$S'=F(S)$ とすると

$$
N^*S'=\{(F(p),(DF_p)^{-\mathsf T}\alpha_p):
(p,\alpha_p)\in N^*S\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

適合座標の $\partial_{s^a}$ が $T_pS$ を張るので、余ベクトルがそれらに与える値がすべて零という条件は $\sigma_a=0$ に他なりません。微分同相による自然性は、$F$ が接方向を $DF_p$ で移すことを、余ベクトルの変換式で打ち消す計算です。

<!-- proof-start -->
### 証明

埋め込み部分多様体の[適合座標](../../../幾何系/GEO/GEO3/index.md#def-geo3-embedded-submanifold)を使い、$p\in S$ の近くで $z=0$ とします。接ベクトルは $v=\sum_{a=1}^k v^a\partial_{s^a}$、余ベクトルは

$$
\alpha=\sum_{a=1}^k\sigma_a\,ds^a
+\sum_{b=1}^{n-k}\zeta_b\,dz^b
$$

と一意に書けます。双対基底の関係から $\alpha(\partial_{s^a})=\sigma_a$ であり、任意の接ベクトルを消すことと $\sigma_1=\cdots=\sigma_k=0$ は同値です。$\zeta$ には制約がなく、零余ベクトルも含まれます。

次に $q=F(p)$、$S'=F(S)$ とします。$F|_S$ は微分同相なので $T_qS'=DF_p(T_pS)$ です。$\beta_q=(DF_p)^{-\mathsf T}\alpha_p$ とおくと、任意の $v\in T_pS$ に対し

$$
\beta_q(DF_pv)
=\bigl((DF_p)^{\mathsf T}\beta_q\bigr)(v)
=\alpha_p(v).
$$

ゆえに $\alpha_p$ が $T_pS$ を消すことと $\beta_q$ が $T_qS'$ を消すことは同値です。逆向きには $F^{-1}$ を使えるため集合の等号になります。$\square$
<!-- proof-end -->

### 直接例：放物線の余法束

$M=\mathbb R^2$、$S=\{(x,y):y=x^2\}$ とします。$s=x$ をパラメータに取ると接ベクトルは $(1,2x)$ です。余ベクトル $\alpha=\xi\,dx+\eta\,dy$ が全接方向を消す条件は

$$
\alpha(1,2x)=\xi+2x\eta=0.
$$

従って

$$
N^*S=\{((x,x^2),t(-2x,1)):x\in\mathbb R,\ t\in\mathbb R\}.
$$

実際 $F(x,z)=(x,z+x^2)$ は $z=0$ を放物線へ写し、微分行列は

$$
DF=\begin{pmatrix}1&0\\2x&1\end{pmatrix}
$$

なので、旧法線 $(0,t)$ の逆転置像は $(-2xt,t)$ です。二つの判定が一致し、零余ベクトル $t=0$ は余法束には入っても、波面集合には入りません。

## 5. 曲がった部分多様体のデルタはどの方向に特異か

超平面の場合は [MICA4のアフィン超平面デルタ](../MICA4/index.md#thm-mica4-hyperplane)で法線方向だけが残りました。曲がった $S$ でも適合座標で平坦化できます。ただし「デルタ分布」を指定するには、$S$ 上で何を積分するかが必要です。

$S$ 上の滑らかな正の密度 $\mu$ を固定します。第3節で分布を試験密度に作用させたため、さらに $M$ 上の滑らかな正の基準密度 $\Omega$ を一つ選びます。試験密度 $\omega=f\Omega$ に対し、作用を

$$
\langle\delta_{S,\mu,\Omega},\omega\rangle
=\int_S f|_S\,\mu
$$

とすれば明確です。$\Omega$ の選択を変えると零でない滑らかな係数が掛かるだけなので、波面集合には影響しません。

<a id="thm-mica5-submanifold-delta"></a>

<!-- formal-statement-start -->
> **定理（部分多様体デルタの波面集合）**  
> $M$ を滑らかな $n$ 次元多様体、$S\subset M$ を**閉集合である**滑らかな埋め込み $k$ 次元部分多様体（$0\le k<n$）、$\mu$ を $S$ 上の滑らかな正の密度、$\Omega$ を $M$ 上の滑らかな正の基準密度とする。試験密度 $\omega=f\Omega$ に対し $\langle\delta_{S,\mu,\Omega},\omega\rangle=\int_S f|_S\,\mu$ で定める。このとき

$$
WF(\delta_{S,\mu,\Omega})=N^*S\setminus0_M.
$$

> ここで余法束は[前節の消滅条件](#prop-mica5-conormal-coordinates)で定まり、$0_M$ は零切断である。
<!-- formal-statement-end -->

### 証明の見取り図

適合座標では $S=\{z=0\}$ で、$\delta_{S,\mu,\Omega}$ は $a(s)\delta(z)$ の形になります。局所Fourier変換は $s$ 方向に任意次数で急減少し、$z$ の周波数に依存しません。接成分が非零の方向で急減少し、法線方向では任意のcutoffに対し非減衰列を作れることを確かめ、座標変換則で貼り合わせます。

<!-- proof-start -->
### 証明

$p\in S$ に適合した座標 $(s,z)\in\mathbb R^k\times\mathbb R^r$、$r=n-k\ge1$ を選び、$S=\{z=0\}$ とします。$\Omega=b(s,z)|ds\,dz|$、$\mu=c(s)|ds|$ と書けば、局所座標分布の積分係数は $a(s)=c(s)/b(s,0)>0$ となります。試験関数 $\varphi$ への作用は

$$
\langle\delta_{S,\mu,\Omega},\varphi\rangle
=\int a(s)\varphi(s,0)\,ds.
$$

$(s_0,0)$ 近傍で $1$ となるcutoff $\chi\in C_c^\infty$ を任意に取ります。$g(s)=a(s)\chi(s,0)$ はコンパクト支持で滑らかで、$s_0$ の近くでは正です。Fourier変換の定義から

$$
\widehat{\chi\delta_{S,\mu,\Omega}}(\sigma,\zeta)
=\int e^{-is\cdot\sigma}g(s)\,ds
=\widehat g(\sigma).
$$

**接成分 $\sigma_0\ne0$ の方向。** その周りの十分狭い開錐では $|\sigma|\ge c|(\sigma,\zeta)|$ です。$g\in C_c^\infty$ の [Fourier急減少](../MICA1/index.md#thm-mica1-smooth-rapid)より、任意の $N$ で

$$
|\widehat g(\sigma)|\le C_N(1+|\sigma|)^{-N}
\le C_N'(1+|(\sigma,\zeta)|)^{-N}.
$$

よってこれらの方向は $WF$ に入りません。

**法線方向 $(0,\zeta_0)$、$\zeta_0\ne0$。** $g$ は零関数ではないので [Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)から $\widehat g(\beta)\ne0$ となる $\beta\in\mathbb R^k$ が存在します。周波数列 $(\sigma,\zeta)=(\beta,t\zeta_0)$ は $t\to+\infty$ で任意の $(0,\zeta_0)$ を含む開錐へ入ります。しかし

$$
\widehat{\chi\delta_{S,\mu,\Omega}}(\beta,t\zeta_0)
=\widehat g(\beta)\ne0
$$

は急減少しません。cutoffを任意に取ったので、全ての非零法線方向が $WF$ に含まれます。$k=0$ の場合は $s$ と $\sigma$ が空の組であり、$g$ は正の定数、$\widehat g=g\ne0$ と読めば同じ証明が成立します。

$M\setminus S$ の点では、$S$ が閉なのでその点の近くで分布は零です。[波面集合の局所性](../MICA3/index.md#lem-mica3-locality)から波面はありません。以上より適合座標で $WF=N^*S\setminus0_M$ です。任意の座標への移行では[波面集合の変換則](#thm-mica5-coordinate-change)と[余法束の自然性](#prop-mica5-conormal-coordinates)の両方が同じ逆転置行列に従うため、等号は多様体全体で成立します。$\square$
<!-- proof-end -->

ここで「閉部分多様体」は位相的に $M$ の閉集合という意味です。閉でない埋め込み部分多様体でも $S$ の内部の各点近くでは同じ局所計算が成り立ちますが、その全体を $M$ 上の分布として延長できるかは積分の支持・収束を別途確認する必要があります。

## 6. 演習

### 演習 MICA5-A1：せん断による法線の移送

- Level: A
- 目安時間: 15分

$F(x,y)=(u,v)=(x,y+3x)$ とする。$S=\{y=0\}$ の法線共変ベクトル $(0,t)$（$t\ne0$）を変換し、$F(S)$ の接ベクトルとの組み合わせが零であることを確かめよ。

<!-- solution-start -->
#### 詳細解答

微分行列とその逆転置は

$$
DF=\begin{pmatrix}1&0\\3&1\end{pmatrix},\qquad
(DF)^{-\mathsf T}=\begin{pmatrix}1&-3\\0&1\end{pmatrix}.
$$

従って新しい余ベクトルは $(-3t,t)$ です。$F(x,0)=(x,3x)$ なので新しい直線の接ベクトルは $(1,3)$、評価すると

$$
(-3t,t)\cdot(1,3)=-3t+3t=0.
$$

逆転置変換が「接方向を消す」という条件を保つことを直接確認できました。
<!-- solution-end -->

### 演習 MICA5-A2：放物線の余法束を定義から

- Level: A
- 目安時間: 16分

$S=\{(x,y)\in\mathbb R^2:y=4x^2\}$ とする。各点の接空間を一つのベクトルで張り、$N^*S$ を $t\in\mathbb R$ を使って書け。零余ベクトルを外すと何が残るか。

<!-- solution-start -->
#### 詳細解答

$\gamma(x)=(x,4x^2)$ の導関数は $\gamma'(x)=(1,8x)$ で、第一成分が $1$ なので常に零ではありません。従って $T_{\gamma(x)}S=\operatorname{span}\{(1,8x)\}$ です。余ベクトル $(\xi,\eta)$ の評価は $\xi+8x\eta$ なので、消滅条件 $\xi+8x\eta=0$ を解き $\eta=t$ と置くと

$$
N^*S=\{((x,4x^2),t(-8x,1)):x,t\in\mathbb R\}.
$$

$t=0$ が零余ベクトルであり、$N^*S\setminus0$ では $t\ne0$ です。$(1,8x)$ と $(-8x,1)$ の内積は $-8x+8x=0$ で、定義も再確認できます。
<!-- solution-end -->

### 演習 MICA5-A3：余法束の余次元二の模型

- Level: A
- 目安時間: 15分

$S=\{(s_1,s_2,z_1,z_2)\in\mathbb R^4:z_1=z_2=0\}$ とする。$S$ の次元と、任意の点における余法束の自由な成分を求めよ。方向 $(1,0,0,1)$ は $N^*S$ に属するか。

<!-- solution-start -->
#### 詳細解答

自由な基点変数は $s_1,s_2$ なので $\dim S=2$ です。接空間は $\partial_{s_1},\partial_{s_2}$ で張られます。余ベクトルを $(\sigma_1,\sigma_2,\zeta_1,\zeta_2)$ とすると接基底への評価は $\sigma_1,\sigma_2$ です。よって

$$
N^*S=\{(s_1,s_2,0,0;0,0,\zeta_1,\zeta_2):
s_i,\zeta_j\in\mathbb R\}.
$$

法線成分には二つの自由度があります。$(1,0,0,1)$ は $\sigma_1=1$ で $\partial_{s_1}$ を消さないため、余法束には入りません。
<!-- solution-end -->

### 演習 MICA5-A4：伸縮で周波数を送る

- Level: A
- 目安時間: 14分

$F(x_1,x_2)=(y_1,y_2)=(2x_1,3x_2)$ とする。旧座標の位相 $e^{i\lambda x_1}$（$\lambda>0$）を新座標へ書き直し、旧周波数 $(\lambda,0)$ がどの新周波数に対応するか求めよ。$DF$ と $(DF)^{-\mathsf T}$ のどちらを使うべきか理由を述べよ。

<!-- solution-start -->
#### 詳細解答

逆写像は $x_1=y_1/2$、$x_2=y_2/3$ ですから、位相は $e^{i(\lambda/2)y_1}$ となります。従って新周波数は $(\lambda/2,0)$ です。

$$
DF=\begin{pmatrix}2&0\\0&3\end{pmatrix},\qquad
(DF)^{-\mathsf T}=\begin{pmatrix}1/2&0\\0&1/3\end{pmatrix},
\qquad
(DF)^{-\mathsf T}\begin{pmatrix}\lambda\\0\end{pmatrix}
=\begin{pmatrix}\lambda/2\\0\end{pmatrix}.
$$

周波数は位相の微分という余ベクトルなので、接ベクトル用の $DF$ ではなく逆転置を使います。
<!-- solution-end -->

### 演習 MICA5-B1：余法束の自然性を非線形変換で確認

- Level: B
- 目安時間: 25分

$F(x,z)=(u,v)=(x,z+x^3)$ と $S=\{z=0\}$ を考える。$F$ が微分同相であることを示し、$N^*F(S)$ を（1）曲線の接ベクトルの消滅条件、（2）$N^*S$ の逆転置像、の二通りで求めよ。

<!-- solution-start -->
#### 詳細解答

逆写像は $F^{-1}(u,v)=(u,v-u^3)$ で滑らかなので、$F$ は大域微分同相です。像は $v=u^3$ であり、$u$ によるパラメータ表示 $\gamma(u)=(u,u^3)$ の接ベクトルは $(1,3u^2)$ です。新座標の余ベクトル $(a,b)$ が接方向を消す条件は

$$
a+3u^2b=0.
$$

$b=t$ と置けば $(a,b)=t(-3u^2,1)$ を得ます。一方、$N^*S$ の旧余ベクトルは $(0,t)$ です。微分行列の逆転置は

$$
DF=\begin{pmatrix}1&0\\3x^2&1\end{pmatrix},\qquad
(DF)^{-\mathsf T}=\begin{pmatrix}1&-3x^2\\0&1\end{pmatrix}
$$

なので、その像は $t(-3x^2,1)$ です。像の点では $u=x$ であるため一致します。両方とも接ベクトルへの評価を零にする同じ集合であり、定義に戻った確認です。
<!-- solution-end -->

### 演習 MICA5-B2：密度付き曲線デルタの全方向

- Level: B
- 目安時間: 26分

$\mathbb R^3$ の座標を $(s_1,s_2,z)$ とし、$S=\{z=0\}$ とする。$a(s_1,s_2)>0$ を滑らかな関数とし、$T$ を $\langle T,\varphi\rangle=\int_{\mathbb R^2}a(s)\varphi(s,0)\,ds$ で定める。任意の点 $(s_0,0)$ の上で、方向 $(1,0,0)$ と $(0,0,-1)$ がそれぞれ波面に入るか、cutoffと錐を使って論証せよ。

<!-- solution-start -->
#### 詳細解答

$(s_0,0)$ の近くで $1$ となる任意のcutoff $\chi$ を取り、$g(s)=a(s)\chi(s,0)$ と置きます。$g\in C_c^\infty(\mathbb R^2)$、$g$ は $s_0$ 付近で正なので零関数ではありません。直接の作用計算で

$$
\widehat{\chi T}(\sigma_1,\sigma_2,\zeta)=\widehat g(\sigma_1,\sigma_2).
$$

$(1,0,0)$ の周りで $|\sigma|\ge c|(\sigma,\zeta)|$ となる小さな開錐を選べば、滑らかな $g$ のFourier変換はその錐で任意次数で急減少します。従って $(1,0,0)$ は波面に入りません。

反対に $\widehat g(\beta)\ne0$ となる $\beta\in\mathbb R^2$ が存在します（存在しなければFourier反転から $g=0$ となり矛盾）。列 $(\beta_1,\beta_2,-t)$ は任意の $(0,0,-1)$ 周りの開錐に十分大きい $t$ で入り、その値は常に $\widehat g(\beta)\ne0$ です。任意のcutoffで急減少に反するので $(0,0,-1)$ は波面に入ります。
<!-- solution-end -->

### 演習 MICA5-B3：曲がった段差

- Level: B
- 目安時間: 26分

$F(x,y)=(u,v)=(x,y+x^2)$、$h(x,y)=H(y)$ とする。新座標での分布 $F_*h$ を表し、その波面集合を求めよ。$H$ の値を境界でどう定めても波面が変わらない理由も説明せよ。

<!-- solution-start -->
#### 詳細解答

$F^{-1}(u,v)=(u,v-u^2)$ で、$\det DF=1$ です。滑らかな関数の場合と同じ座標移送の式を局所可積分関数へ適用できるので

$$
(F_*h)(u,v)=H(v-u^2)
$$

がほとんど至る所で成り立ちます。[MICA4の半空間Heaviside](../MICA4/index.md#prop-mica4-halfspace)を座標交換して使えば、旧座標の波面は $\{((x,0),(0,t)):t\ne0\}$ です。微分行列は

$$
DF=\begin{pmatrix}1&0\\2x&1\end{pmatrix}
$$

なので、[変換則](#thm-mica5-coordinate-change)に代入して

$$
WF(F_*h)=\{((u,u^2),t(-2u,1)):u\in\mathbb R,\ t\ne0\}
$$

を得ます。$v-u^2$ の微分 $dv-2u\,du$ と一致します。境界曲線は平面内のLebesgue測度零の集合なので、そこで $H$ の値を変えても局所可積分関数が定める分布は同一です。従って波面集合も不変です。
<!-- solution-end -->

### 演習 MICA5-C1：曲がった交点の二方向

- Level: C
- 目安時間: 40分

$\mathbb R^2$ 上で $u(x,y)=\delta(y)$ を $\langle u,\varphi\rangle=\int\varphi(x,0)\,dx$、$v(x,y)=H(x)$ を局所可積分分布として定め、$F(x,y)=(a,b)=(x,y+x^2)$ とする。$w=F_*(u+v)$ と置く。

1. $F$ が微分同相であることを示し、$F_*u$ と $F_*v$ を別々に求めよ。
2. $WF(F_*u)$ と $WF(F_*v)$ を求め、原点以外の各点上で $WF(w)$ を決定せよ。
3. 原点で、放物線の法線と直線の法線の両方向が相殺されずに残ることを、[和の包含](../MICA3/index.md#prop-mica3-sum)の両向きの適用から証明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 分布の移送。** $F^{-1}(a,b)=(a,b-a^2)$ は滑らかで、$\det DF=1$ です。作用の定義から

$$
\begin{aligned}
\langle F_*u,\varphi\rangle
&=\int\varphi(x,x^2)\,dx,\\
\langle F_*v,\varphi\rangle
&=\int_{x>0}\varphi(x,y+x^2)\,dx\,dy
=\int_{a>0}\varphi(a,b)\,da\,db.
\end{aligned}
$$

最後の等号では $a=x$、$b=y+x^2$、Jacobianの絶対値 $1$ を使いました。従って $F_*u$ は放物線 $b=a^2$ に沿う密度 $da$ のデルタ分布、$F_*v=H(a)$ です。

**2. 個別の波面。** 旧座標の $WF(u)$ は[MICA4の超平面デルタ](../MICA4/index.md#thm-mica4-hyperplane)から $\{((x,0),(0,t)):t\ne0\}$、$WF(v)$ は[半空間の段差](../MICA4/index.md#prop-mica4-halfspace)から $\{((0,y),(s,0)):s\ne0\}$ です。逆転置行列

$$
(DF)^{-\mathsf T}=\begin{pmatrix}1&-2x\\0&1\end{pmatrix}
$$

をそれぞれへ適用すると

$$
\begin{aligned}
WF(F_*u)&=\{((a,a^2),t(-2a,1)):a\in\mathbb R,\ t\ne0\},\\
WF(F_*v)&=\{((0,b),(s,0)):b\in\mathbb R,\ s\ne0\}.
\end{aligned}
$$

放物線 $b=a^2$ と直線 $a=0$ は原点でだけ交わります。そのため放物線上の原点以外では $F_*v$ は局所的に定数、直線上の原点以外では $F_*u$ は局所的に零です。[局所性](../MICA3/index.md#lem-mica3-locality)と[和の包含](../MICA3/index.md#prop-mica3-sum)を和と差へ適用し、$w$ の波面はそれぞれの場所にある唯一の非滑らかな項と等しいと分かります。二集合の外では $WF(w)$ は空です。

**3. 原点での相殺の排除。** 原点上では二つの方向集合は

$$
A=\{(0,t):t\ne0\},\qquad B=\{(s,0):s\ne0\}
$$

で、$A\cap B=\varnothing$ です。[和の波面集合の包含](../MICA3/index.md#prop-mica3-sum)は $WF(w)|_0\subset A\cup B$ を与えます。一方、$F_*u=w-F_*v$ に同じ包含を適用すると $A\subset WF(w)|_0\cup B$ です。$A\cap B=\varnothing$ だから $A\subset WF(w)|_0$。同じく $F_*v=w-F_*u$ から $B\subset WF(w)|_0$ です。従って

$$
WF(w)|_{(0,0)}=A\cup B.
$$

異なる余法線方向は和で打ち消せません。同じ方向を持つ二分布であれば、一般に相殺があり得るので、この議論の結論には $A\cap B=\varnothing$ が本質的です。
<!-- solution-end -->

## 7. 何を得たか

波面の方向は座標成分だけで決まる「普通のベクトル」ではなく、位相の微分としての**余ベクトル**です。微分同相 $F$ の下で $DF^{-\mathsf T}$ に従うと証明したことで、波面集合を多様体の余接束上に定義できました。さらに、部分多様体上のデルタの特異方向は接空間を消す余法束の非零部分と一致します。

この幾何学的な方向の記録は、次のMICA6で二つの分布を掛ける条件を考えるときに使います。同じ点で互いに逆向きの特異方向が衝突するかどうかを、座標に依存せず検査できるようになるからです。
