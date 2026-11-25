# FLOER1-02 stripの端と作用・エネルギー

<!-- definition-example-audit: strict -->

## 1. 無限の帯で何を測るか

前講の[Lagrange境界条件付きstrip](../FLOER1-01/index.md#def-floer1-01-strip)は有限の帯で定義した。今回は両端を無限に延ばし、一方の交点から他方の交点へ移る曲線を調べる。有限帯で方程式を満たすだけでは、無限に延ばしたときに発散する曲線も残る。曲線の変化の総量を測り、端の条件と区別することから始めよう。

滑らかな実 $2n$ 次元シンプレクティック多様体 $(X,\omega)$、[概複素構造と適合性](../../SYM/SYM8/index.md#def-sym8-almost-complex)の条件を満たす $J$、埋め込まれた境界なしの[Lagrange部分多様体](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold) $L_0,L_1$ を固定する。計量は $g(v,w)=\omega(v,Jw)$ である。[適合性と正定値内積の同値](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)により $J$ はこの計量で等長、$J^2=-I$ である。

帯 $S=\mathbb R\times[0,1]$ に座標 $(s,t)$、向き $ds\wedge dt$ を入れる。滑らかさは水平辺まで含む。前講と同じ方程式を採用する。

$$
u_s+J(u)u_t=0,\qquad
u(s,0)\in L_0,\quad u(s,1)\in L_1.
$$

速度の二乗を帯全体で積分すると、動きの総量を測れる。無限区間なので積分が収束するかを条件にする。

<a id="def-floer1-02-finite-energy"></a>

<!-- formal-statement-start -->
> **定義（有限エネルギーstrip）**
> 適合概複素構造 $J$ を持つシンプレクティック多様体 $(X,\omega)$ と二つのLagrange部分多様体 $L_0,L_1$ を取る。滑らかな写像 $u:\mathbb R\times[0,1]\to X$ が次の条件を満たすとする。

$$
u_s+J(u)u_t=0,\qquad
u(s,0)\in L_0,\quad u(s,1)\in L_1.
$$

> 次の量が有限なら有限エネルギーstripという。

$$
E(u)=\lim_{R\to\infty}E_R(u),\qquad
E_R(u)=\frac12\int_{-R}^{R}\int_0^1
(|u_s|_g^2+|u_t|_g^2)\,dt\,ds.
$$

> 極限は非負被積分関数の積分の単調極限として、無限大も許して定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-02-finite-energy -->
**定義の確認**。標準平面 $X=\mathbb C$、$J=i$、$L_0=\mathbb R$、$L_1=i\mathbb R$ とする。$u(s,t)=0$ なら両境界条件と方程式を満たし、両偏微分は零なので $E_R=E=0$。対して $v(s,t)=e^{\pi(s+it)/2}$ は下辺が実数、上辺が純虚数で、$v_s+i v_t=0$ だが

$$
E_R(v)=\frac{\pi^2}{4}\int_{-R}^R e^{\pi s}\,ds
=\frac{\pi}{4}(e^{\pi R}-e^{-\pi R}).
$$

従って有限エネルギーではない。方程式と境界条件だけではエネルギーの有限性を保証しない。
<!-- definition-example-end -->

擬正則方程式から $u_t=J(u)u_s$ である。[擬正則写像のエネルギー恒等式](../../GW/GW1-02/index.md#thm-gw1-02-energy-identity)を平坦な有限帯に適用すると、誤差項が零になる。局所的にも次の関係が確認できる。

$$
\frac12(|u_s|^2+|u_t|^2)=|u_s|^2
=\omega(u_s,Ju_s)=\omega(u_s,u_t).
$$

ゆえに有限帯で $E_R(u)=\int_{S_R}u^*\omega$。右辺も非負であり、無限帯ではこの有限帯積分の極限を取ればよい。一般の写像で面積とエネルギーが一致するわけではない。

### 両端を固定する

交点を曲線の始点・終点として使うには、$s$ を大きく正負に動かしたとき、横断方向の曲線 $t\mapsto u(s,t)$ が一点へ縮むことを指定したい。[Lagrange横断交叉](../FLOER1-01/index.md#def-floer1-01-transverse)では交点の接空間の和が全接空間になり、交点は孤立する。

<a id="def-floer1-02-ends"></a>

<!-- formal-statement-start -->
> **定義（stripの収束端）**
> 滑らかなLagrange境界条件付き擬正則strip $u:\mathbb R\times[0,1]\to X$ と交点 $p_-,p_+\in L_0\cap L_1$ を取る。各点の近傍の座標で、十分大きな $|s|$ の対応する側の全横断曲線が座標近傍に入り、次の極限が $t\in[0,1]$ について一様に成立するとき、$p_-,p_+$ を収束端とする（本講の $C^1$ 端条件）。

$$
u(s,t)\to p_\pm,\qquad
u_t(s,t)\to0\quad(s\to\pm\infty).
$$

> 微分の極限は座標成分で測る。方程式から $u_s\to0$ も成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-02-ends -->
**定義の確認**。実軸と虚軸に対する先ほどの定数stripは両端が原点であり、両境界を満たす。任意の $s,t$ で座標値が零、偏微分も零なので一様極限の条件が成立する。指数関数の例は負端では値と微分が一様に零へ近づくが、正端ではノルムが発散するため二つの収束端を持たない。座標変換をしても、点の近くで変換の微分が有界なので零への微分の極限は変わらない。
<!-- definition-example-end -->

有限エネルギーから直ちに上の端条件を結論してはいけない。まず積分から得られる弱い情報を確認する。

<a id="prop-floer1-02-small-slices"></a>

<!-- formal-statement-start -->
> **命題（有限エネルギーstripの小さい横断曲線）**
> 適合概複素構造の下の有限エネルギーstrip $u$ について、$s_k^+\to+\infty$、$s_k^-\to-\infty$ となる列が存在し、横断曲線の計量長さが両列に沿って零へ収束する。
> さらに $u$ の像がコンパクト集合に含まれ、$L_0,L_1$ が $X$ の閉集合なら、各列の部分列に沿って横断曲線は交点へ一様に収束する。
<!-- formal-statement-end -->

積分の有限性から小さい断面を選び、曲線の長さが小さければその全体が始点の近くにあることを使う。

<!-- proof-start -->
### 証明

$h(s)=\int_0^1|u_t(s,t)|^2dt$ と置く。方程式と適合性から $E(u)=\int_{\mathbb R}h(s)ds<\infty$。区間 $[k,k+1]$ の積分を $a_k$ とすると、非負級数の和が有限なので $a_k\to0$。連続関数 $h$ の区間内の最小値は平均以下であるから、ある $s_k^+\in[k,k+1]$ で $h(s_k^+)\le a_k$。区間 $[-k-1,-k]$ でも同様に選べば負の列を得る。

曲線長を $\ell(s)=\int_0^1|u_t(s,t)|dt$ とすると、[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)で

$$
\ell(s)^2\le\left(\int_0^1 1^2dt\right)
\left(\int_0^1|u_t(s,t)|^2dt\right)=h(s).
$$

従って両列で $\ell\to0$。像がコンパクト集合に含まれるなら、例えば正の列の始点 $u(s_k^+,0)$ にはある点 $p$ に収束する部分列がある。計量から定まる距離 $d_g$ では

$$
d_g(u(s_k^+,t),p)
\le\ell(s_k^+)+d_g(u(s_k^+,0),p).
$$

右辺は $t$ によらず零へ向かう。$t=0,1$ の像はそれぞれ $L_0,L_1$ 内なので閉性から $p\in L_0\cap L_1$。負の列でもコンパクト性から始点が $p'$ に収束する部分列を選ぶ。距離は

$$
d_g(u(s_k^-,t),p')\le\ell(s_k^-)+d_g(u(s_k^-,0),p')
$$

で抑えられ、右辺は一様に零へ向かう。閉性から $p'$ も両Lagrange部分多様体の共通点である。
<!-- proof-end -->

この命題は全ての $s$ での収束や微分の一様収束までは示さない。横断性を活用して指数減衰を導くには、次講の非コンパクト領域での評価が必要になる。以下では作用差を求めるため、二つの収束端を持つ解を扱う。

## 2. 完全な場合の作用汎関数

横断曲線を一つの点とみなすと、stripはその点が $s$ とともに移動する軌道である。その軌道に沿って減少する実数値を構成したい。1形式 $\lambda$ が存在して $d\lambda=\omega$ と書けるとき、曲線に沿う線積分を候補にできる。ただし境界が動くので、線積分の変分には両端から項が現れる。この項を消すには両Lagrange部分多様体で原始関数（制限した1形式の外微分前の関数）を選ぶ必要がある。

<a id="def-floer1-02-exact-action"></a>

<!-- formal-statement-start -->
> **定義（完全Lagrange境界と作用汎関数）**
> シンプレクティック多様体 $(X,\omega)$ 上の1形式 $\lambda$ が $d\lambda=\omega$ を満たすとする。埋め込まれたLagrange部分多様体 $L_j$ の包含を $\iota_j:L_j\to X$ とする。各 $j=0,1$ について滑らかな関数 $f_j:L_j\to\mathbb R$ が存在して

$$
\iota_j^*\lambda=df_j
$$

> となるとき、この境界は $\lambda$ に関して完全である。滑らかな道 $\gamma:[0,1]\to X$ が $\gamma(j)\in L_j$ を満たすとき、作用汎関数を次で定める。

$$
\mathcal A(\gamma)=-\int_0^1\lambda_{\gamma(t)}(\dot\gamma(t))dt
+f_1(\gamma(1))-f_0(\gamma(0)).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-02-exact-action -->
**定義の確認**。標準平面で $\lambda=-y\,dx$、$L_0=\mathbb R$、$L_1=i\mathbb R$ とする。$d(-y\,dx)=-dy\wedge dx=dx\wedge dy$。実軸では $y=0$、虚軸では接方向に $dx=0$ だから制限は双方とも零で、$f_0=f_1=0$ と取れる。道 $\gamma(t)=1-t+it$ は下端が実軸、上端が虚軸で、$\dot x=-1,y=t$ である。線積分は $\int_0^1 t\,dt=1/2$、作用は $-1/2$ となる。作用自体は負でもよい。
<!-- definition-example-end -->

交点 $p$ の定数道では線積分は零なので、以下では $\mathcal A(p)=f_1(p)-f_0(p)$ と略記する。$f_j$ に定数を加えると作用値は移動するが、同じ選択の下での作用差は変わらない。

<a id="prop-floer1-02-variation"></a>

<!-- formal-statement-start -->
> **命題（完全Lagrange境界での作用の第一変分）**
> $d\lambda=\omega$ と $\iota_j^*\lambda=df_j$ を満たす完全Lagrange境界を持つ滑らかな道 $\gamma$ を取る。境界を保つ滑らかな変分 $\Gamma(\varepsilon,t)$ の速度を $\xi=\partial_\varepsilon\Gamma(0,t)$ とすると、作用の微分は

$$
d\mathcal A_\gamma(\xi)
=\int_0^1\omega(\dot\gamma,\xi)dt
=\int_0^1g(J\dot\gamma,\xi)dt.
$$

> ただし $J$ は $\omega$ に適合し、$g(v,w)=\omega(v,Jw)$ とする。
<!-- formal-statement-end -->

端の補正項を入れると、道の内部の微分だけが残る。この式はstrip方程式が作用を減らす運動になる理由を与える。

<!-- proof-start -->
### 証明

$F(\varepsilon,t)=\Gamma(\varepsilon,t)$ とし、引き戻した1形式を $F^*\lambda=a\,d\varepsilon+b\,dt$ と書く。係数は $a=\lambda(F_\varepsilon),b=\lambda(F_t)$ である。外微分を取ると

$$
d(F^*\lambda)=(\partial_\varepsilon b-\partial_t a)
\,d\varepsilon\wedge dt.
$$

$F^*d\lambda=F^*\omega$ との比較で

$$
\partial_\varepsilon b=\omega(F_\varepsilon,F_t)+\partial_t a.
$$

有限区間の滑らかな積分なので微分を積分内に入れ、$\varepsilon=0$ で評価する。

$$
\frac{d}{d\varepsilon}\bigg|_0\int_0^1 b\,dt
=\int_0^1\omega(\xi,\dot\gamma)dt
+\lambda(\xi(1))-\lambda(\xi(0)).
$$

境界速度は $TL_j$ に属するから、$df_j(\xi(j))=\lambda(\xi(j))$。作用の負の線積分と端の関数の微分を足すと、端の二項が相殺する。交代性により $-\omega(\xi,\dot\gamma)=\omega(\dot\gamma,\xi)$。さらに [適合性と正定値内積の同値](../../SYM/SYM8/index.md#thm-sym8-compatible-metric) から

$$
g(J\dot\gamma,\xi)=\omega(J\dot\gamma,J\xi)
=\omega(\dot\gamma,\xi).
$$

これで主張の式を得る。
<!-- proof-end -->

道の接方向の内積を $\langle v,w\rangle=\int_0^1g(v,w)dt$ と見れば、第一変分は $J\dot\gamma$ との内積である。ここで端点を含む滑らかな道の空間に対し、端点の接条件まで満たす勾配ベクトル場の存在を主張しているのではない。内部での $L^2$ 表現として読み、strip方程式そのものを用いる。全てのコンパクト台の内部変分で第一変分が零なら $J\dot\gamma=0$（内部に台を持つ非負関数を掛けた $J\dot\gamma$ を速度に選べる）。$J$ は可逆なので道は定数、端の条件から交点の定数道となる。逆に定数道では第一変分が零である。

<a id="thm-floer1-02-action-energy"></a>

<!-- formal-statement-start -->
> **定理（完全境界での作用差とエネルギー）**
> 適合概複素構造 $J$、$d\lambda=\omega$、$\iota_j^*\lambda=df_j$ を満たすシンプレクティック多様体とLagrange境界を取る。滑らかな擬正則strip $u:\mathbb R\times[0,1]\to X$ が二つの収束端 $p_-,p_+$（値と横断微分の一様極限）を持つなら、エネルギーは有限で、

$$
E(u)=\mathcal A(p_-)-\mathcal A(p_+)\ge0.
$$

> 作用は負の線積分に $f_1-f_0$ の端補正を加える規約とする。等号が成立するのは定数stripの場合に限る。
<!-- formal-statement-end -->

作用の変分を $s$ 方向へ適用すると、stripの速度と作用の変化の符号が反対になる。有限帯で積分してから端へ極限を取る。

<!-- proof-start -->
### 証明

$\gamma_s(t)=u(s,t)$ と置く。[完全Lagrange境界での作用の第一変分](#prop-floer1-02-variation)で $\xi=u_s$、$\dot\gamma_s=u_t$ を代入し、$J(u)u_t=-u_s$ を使うと

$$
\frac{d}{ds}\mathcal A(\gamma_s)
=\int_0^1 g(J(u)u_t,u_s)dt
=-\int_0^1|u_s|^2dt.
$$

$[-R,R]$ で積分し、エネルギー密度の関係 $|u_t|=|u_s|$ を使う。

$$
E_R(u)=\mathcal A(\gamma_{-R})-\mathcal A(\gamma_R).
$$

収束端の座標近傍を小さく取ると、その閉包上の $\lambda$ の係数は有界である。$u_t\to0$ が一様なので線積分は零へ収束する。また $f_j(u(s,j))\to f_j(p_\pm)$ は、$u(s,j)$ が埋め込まれた $L_j$ 内で収束することと $f_j$ の連続性から従う。従って $\mathcal A(\gamma_{\pm R})\to\mathcal A(p_\pm)$。左辺は非負積分の単調極限であり、右辺が有限の実数へ収束するため有限で、等式が得られる。

$E=0$ の場合、連続な非負関数 $|u_s|^2$ の積分が零であるから各点で $u_s=0$。方程式と $J$ の可逆性から $u_t=0$。帯は連結なので $u$ は定数。逆は微分が零であることから従う。
<!-- proof-end -->

有限帯での符号は境界積分でも検算できる。[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)（矩形では辺ごとの基本定理でも導ける）で向き $ds\wedge dt$ の下辺は $s$ 増加、右辺は $t$ 増加、上辺は $s$ 減少、左辺は $t$ 減少。従って

$$
\begin{aligned}
\int_{S_R}u^*\omega
&=\int_{\gamma_R}\lambda-\int_{\gamma_{-R}}\lambda\\
&\quad+f_0(u(R,0))-f_0(u(-R,0))\\
&\quad-f_1(u(R,1))+f_1(u(-R,1))\\
&=\mathcal A(\gamma_{-R})-\mathcal A(\gamma_R).
\end{aligned}
$$

### 非定数のstripで検算する

$X=\mathbb C$、$J=i$、$\lambda=-y\,dx$、$L_0=\mathbb R$ とし、$L_1$ は円周の開弧

$$
L_1=\{e^{i\phi}:-\varepsilon<\phi<\pi+\varepsilon\},
\quad 0<\varepsilon<\pi/2
$$

とする。一次元なのでシンプレクティック形式の制限は零。交点 $\pm1$ では円の接線が虚軸方向で、実軸と横断する。開弧上で $\phi$ は一価であり、

$$
\lambda|_{L_1}=\sin^2\phi\,d\phi,\qquad
f_1(\phi)=\frac{\phi}{2}-\frac{\sin 2\phi}{4}
$$

は原始関数である。$f_0=0$ とする。

$z=s+it$、$w=e^{\pi z/2}$、$u=(w-1)/(w+1)$ と置く。$0\le t\le1$ では $w$ は閉第一象限の零でない点で、$w+1\ne0$。この複素微分可能な合成写像は $u_s+i u_t=0$ を満たす。実際

$$
u_s=\frac{\pi w}{(w+1)^2},\qquad
u_t=\frac{i\pi w}{(w+1)^2}.
$$

下辺では $w=r>0$ だから $u=(r-1)/(r+1)\in(-1,1)$。上辺では $w=ir$ で

$$
u=\frac{r^2-1+2ir}{1+r^2},\qquad
|u|=1,\quad \operatorname{Im}u>0.
$$

よって上辺は開弧に入る。$s\to-\infty$ では $|w|\to0$、$s\to+\infty$ では $|w|\to\infty$。$|w+1|^2=|w|^2+1+2\operatorname{Re}w\ge\max(1,|w|^2)$ なので、$u+1=2w/(w+1)$ は負端で、$u-1=-2/(w+1)$ は正端で一様に零へ近づく。また $|u_t|\le\pi\min(|w|,1/|w|)$ も両端で零へ向かう。

従って[完全境界での作用差とエネルギー](#thm-floer1-02-action-energy)より、$p_-=-1$、$p_+=1$ に対して

$$
E(u)=f_1(\pi)-f_1(0)=\frac{\pi}{2}.
$$

別の検算として、開帯は指数写像で開第一象限へ一対一に移り、逆式 $w=(1+u)/(1-u)$ は $|u|<1,\operatorname{Im}u>0$ で実部・虚部がともに正になる。従って $u$ は上半単位円板へ一対一の向きを保つ微分同相であり、面積は $\pi/2$。作用差の符号と係数が一致する。

## 3. 一般の境界ではなぜ作用が多価になるか

完全性の仮定がないと、各道に線積分と端補正を組み合わせた実数を直接割り当てられるとは限らない。だが、基準道から今の道までの面を指定すれば面積によって作用の変化を測れる。

基準道 $\gamma_0$ と道 $\gamma_1$ の間の滑らかな変形 $V:[0,1]_r\times[0,1]_t\to X$ を取る。$V(0,t)=\gamma_0(t)$、$V(1,t)=\gamma_1(t)$ とし、各 $r$ で $V(r,j)\in L_j$ とする。向きは $dr\wedge dt$。作用変化の候補は

$$
\Delta\mathcal A(V)=-\int_{[0,1]^2}V^*\omega.
$$

<a id="prop-floer1-02-relative-area"></a>

<!-- formal-statement-start -->
> **命題（境界を保つ変形の面積と作用の周期）**
> 閉2形式 $\omega$ を持つシンプレクティック多様体とLagrange境界 $L_0,L_1$ を取る。両端の道を固定し、水平辺の像をそれぞれ $L_j$ に保つ滑らかな変形族の下で、面積 $\int V^*\omega$ は不変である。
> また同じ基準道に戻る滑らかな道の一周の変形で面積が非零なら、全ての道に対し面積の負値を作用差として与える一価の実数値関数は存在しない。
<!-- formal-statement-end -->

変形を三次元の箱にまとめる。内部では $d\omega=0$、側面では二つの境界条件が面積を消す。一周の変形は、同じ道に戻っても面積が蓄積する可能性を示す。

<!-- proof-start -->
### 証明

変形族を $H(a,r,t)$ とし、箱 $[0,1]^3$ の向きを $da\wedge dr\wedge dt$ とする。$dH^*\omega=H^*(d\omega)=0$ なので、[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により六面の向き付き積分の和は零となる（箱の場合は各変数の基本定理でも得られる）。

$r=0,1$ 面では写像が $a$ に依存しないので二次元の引き戻しは零。$t=0,1$ 面は対応するLagrange部分多様体内にあるため二つの接方向に対する $\omega$ は零。残る $a=1$ と $a=0$ はそれぞれ $dr\wedge dt$ とその負の向きである。従って

$$
0=\int H(1,\cdot,\cdot)^*\omega
-\int H(0,\cdot,\cdot)^*\omega.
$$

次に基準道に戻る変形 $V$ について、一価関数 $\mathcal A$ が指定の差を与えるなら、$\gamma_0=\gamma_1$ より $0=\mathcal A(\gamma_1)-\mathcal A(\gamma_0)=-\int V^*\omega$。面積が非零という仮定に矛盾する。
<!-- proof-end -->

例えば標準平面で $L_0$ を単位円、$L_1$ を中心 $1$・半径 $1$ の円とする。両者は一次元で交点は $(1/2,\pm\sqrt3/2)$、各半径ベクトルの方向は平行でないので交点は横断的である。$p=2\in L_1$ を固定し、

$$
V(r,t)=(1-t)e^{2\pi ir}+tp
$$

と取る。$t=0$ は $L_0$ 上を一周、$t=1$ は $p$。$r=0,1$ の道は一致する。$\lambda=-y\,dx$ と [一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes) を矩形に適用すると、左右の辺は打ち消し、上辺は定数、下辺は正方向に一周するため

$$
\int V^*\omega=\int_0^{2\pi}\sin^2\phi\,d\phi=\pi.
$$

この例では $\omega$ 自体は完全だが $\lambda|_{L_0}$ は完全でない。実際、もし $df_0$ なら閉曲線上の積分は $f_0(1)-f_0(1)=0$ となるはずである。作用の周期は $-\pi$ であり、同じ道に異なる作用値の変化が対応する。変形の情報を保持した作用や周期を記録する係数が必要になる。閉シンプレクティック多様体に大域的な $\lambda$ があると仮定する必要はなく、一般の場合はこの相対面積の情報を扱う。

## 4. 端で残る線形方程式

作用差は曲線の総エネルギーを与えるが、交点の近くでどの速さで収束するかまでは決めない。端点 $p$ で方程式を線形化すると、帯の長手方向と横断方向を分離できる。

前講の[stripの境界条件の線形化](../FLOER1-01/index.md#prop-floer1-01-linearization)を定数解 $p$ に適用する。$u_t=0$ のため零階項 $(\nabla_\xi J)u_t$ が消え、固定ベクトル空間 $V=T_pX$ 上で

$$
D_p\xi=\partial_s\xi+J_p\partial_t\xi,\qquad
\xi(s,j)\in W_j=T_pL_j.
$$

横断方向の関数を作用素の定義域にする。$H^1([0,1],V)$ は関数と一階弱微分が $L^2$ に属する空間である（[Sobolev空間](../../GA/GA2/index.md#def-ga2-sobolev)の一次元の場合）。一次元では弱微分を積分すると絶対連続な代表元を選べるので、端の値をその代表元で測る。

<a id="def-floer1-02-asymptotic-operator"></a>

<!-- formal-statement-start -->
> **定義（交点の漸近作用素）**
> 適合概複素構造を持つシンプレクティック多様体のLagrange交点 $p$ において、$V=T_pX$、$W_j=T_pL_j$、$J_p=J(p)$ と置く。実Hilbert空間 $L^2([0,1],V)$ の内積は $g_p$ の積分で定める。漸近作用素 $A_p$ とその定義域を次で定める。

$$
\begin{aligned}
\mathcal D(A_p)
&=\{\eta\in H^1([0,1],V):
\eta(0)\in W_0,\ \eta(1)\in W_1\},\\
A_p\eta&=J_p\eta'.
\end{aligned}
$$

> ここで $\eta'$ は $t$ に関する弱微分で、$A_p$ の値は $L^2([0,1],V)$ に属する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-02-asymptotic-operator -->
**定義の確認**。実軸と虚軸の交点 $p=0$ で $V=\mathbb C,J_p=i$、$W_0=\mathbb R,W_1=i\mathbb R$。$\eta(t)=e^{i\pi t/2}$ は滑らかで $\eta,\eta'$ は有界、したがって $H^1$ に属する。端値は $1,i$ だから定義域の条件を満たし、

$$
A_p\eta=i\frac{i\pi}{2}\eta=-\frac{\pi}{2}\eta
$$

となる。定数関数 $\eta=1$ は微分が零でも上端の条件を満たさず、定義域には入らない。
<!-- definition-example-end -->

ここでは $D_p=\partial_s+A_p$ という符号を採用した。$A_p\eta=\mu\eta$ の非零解を固有関数、$\mu$ を固有値と呼ぶ。線形方程式に $\xi(s,t)=c(s)\eta(t)$ を代入すると

$$
D_p\xi=(c'+\mu c)\eta,\qquad c(s)=c(0)e^{-\mu s}.
$$

正の固有値は正端で減衰し、負の固有値は負端で減衰する。零固有値があれば、長手方向に変化しない非零成分が残る。横断交叉がこの成分を排除する。

定義域を持つ作用素では、内積による移項が可能という対称性と、移項先の定義域まで一致する自己共役性を区別する。具体的には随伴の定義域とは、移項した結果を再び内積で表せるベクトル全体の集合である。自己共役であるとは元の作用素と随伴作用素の定義域・作用が一致することである。

<a id="thm-floer1-02-asymptotic-invertible"></a>

<!-- formal-statement-start -->
> **定理（漸近作用素の対称性と横断性）**
> $V$ を実 $2n$ 次元シンプレクティックベクトル空間、$J$ を適合複素構造、$W_0,W_1$ をLagrange部分空間とする。実 $L^2([0,1],V)$ 上で、$H^1$ 関数の両端が $W_j$ に入る定義域を持つ作用素 $A=J\,d/dt$ は自己共役である。核は定数関数としての $W_0\cap W_1$ に一致する。
> さらに $W_0+W_1=V$ なら $A$ は全単射で、ある定数 $C>0$ について全ての定義域の元が次を満たす。

$$
\|\eta\|_{H^1}\le C\|A\eta\|_{L^2}.
$$
<!-- formal-statement-end -->

部分積分で境界項を調べ、横断性から初期値を一意に決めれば逆を明示できる。

<!-- proof-start -->
### 証明

$g(Ja,b)=\omega(a,b)=-g(a,Jb)$ である。定義域内の $\eta,\zeta$ について絶対連続代表元の部分積分から

$$
\langle A\eta,\zeta\rangle-\langle\eta,A\zeta\rangle
=[g(J\eta,\zeta)]_0^1.
$$

各端で $g(J\eta(j),\zeta(j))=\omega(\eta(j),\zeta(j))=0$。従って対称である。

随伴の定義を確認する。内部にコンパクト台を持つ滑らかな関数が定義域に入り $L^2$ で稠密なので、随伴の定義域は、ある $f\in L^2$ が存在して全ての $\eta\in\mathcal D(A)$ に対し $\langle A\eta,\zeta\rangle=\langle\eta,f\rangle$ となる $\zeta\in L^2$ の集合である。内部の試験関数 $\eta$ に制限すると

$$
\int_0^1 g(\eta',-J\zeta)dt
=\int_0^1g(\eta,f)dt.
$$

弱微分の定義から $(-J\zeta)'=-f$ となる。両辺に $J$ を作用させると

$$
\zeta'=-Jf\in L^2,\qquad J\zeta'=f.
$$

従って $\zeta\in H^1$ である。改めて部分積分すると全ての $\eta$ について

$$
[g(J\eta,\zeta)]_0^1=0.
$$

一方の端を零、他方を任意の $w\in W_j$ とする一次関数を選べる。例えば $j=0$ では $\eta(t)=(1-t)w$、$j=1$ では $\eta(t)=tw$ を選ぶ。それぞれの端で

$$
\omega(w,\zeta(j))=g(Jw,\zeta(j))=0
\qquad(w\in W_j)
$$

が成立する。[Lagrange部分空間と計量直交補](../../SYM/SYM8/index.md#prop-sym8-lagrangian-orthogonal)から $(JW_j)^\perp=W_j$ であり、この条件は $\zeta(j)\in W_j$ に等しい。

よって随伴の定義域は元の定義域に含まれ、対称性による逆の包含も成立する。作用は $f=J\zeta'$ で一致する。

核について、$A\eta=0$ なら $J$ は可逆なので $\eta'=0$、従って $\eta$ は定数。端の条件はその定数が $W_0\cap W_1$ に属することに等しい。

横断性を仮定すると両空間は次元 $n$ なので $V=W_0\oplus W_1$。任意の $f\in L^2$ に対し $A\eta=f$ を解くには

$$
\eta(t)=a-\int_0^t J f(r)dr
$$

と置けばよい。$q=\int_0^1 J f(r)dr$ として直和分解 $q=a+b$（$a\in W_0,b\in W_1$）を取る。すると $\eta(0)=a\in W_0$、$\eta(1)=a-q=-b\in W_1$、弱微分は $-Jf$ なので方程式を満たす。核は零であるため一意である。

$P_0:V\to W_0$ をこの直和の射影とし、その有限な作用素ノルムを $M$ とする。$J$ の等長性と[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から $|q|\le\|f\|_{L^2}$、$|a|\le M\|f\|_{L^2}$。各 $t\in[0,1]$ で積分のノルムを評価すると

$$
\left|\int_0^t Jf(r)dr\right|
\le \int_0^t |f(r)|dr
\le \sqrt{t}\,\|f\|_{L^2}
\le \|f\|_{L^2}.
$$

区間の長さが1であることを用い、二乗積分して

$$
\|\eta\|_{L^2}\le(M+1)\|f\|_{L^2},
\qquad
\|\eta'\|_{L^2}=\|f\|_{L^2}.
$$

$H^1$ ノルムを二乗和で取れば $C=\sqrt{(M+1)^2+1}$ が使える。
<!-- proof-end -->

横断性を外して $W_0=W_1=\mathbb R\subset\mathbb C$ とすれば $\eta=1$ は定義域に入り核の非零元になる。逆を作る際の直和分解が失われ、上の評価も成立しない。

### 平面の固有値を全て求める

標準平面で $W_0=\mathbb R$、$W_1=e^{i\theta}\mathbb R$、$0<\theta<\pi$ とする。実Hilbert空間上の固有値は実数として扱う。ここで実数 $\mu$ に対し $i\eta'=\mu\eta$ を解く。$\eta'=-i\mu\eta$ より $\eta(t)=a e^{-i\mu t}$。$t=0$ の条件から $a$ は実数で、非零解を求めるので $a\ne0$。$t=1$ では $e^{-i(\mu+\theta)}$ が実数となる必要がある。従って

$$
\mu=k\pi-\theta,\qquad k\in\mathbb Z.
$$

逆にこの値なら上下端の条件を満たし、関数は滑らかで $H^1$ に属する。零固有値はなく、全ての固有値について $|\mu|\ge\min(\theta,\pi-\theta)>0$。直線が平行に近づくとこの下界は小さくなる。ここで求めたのは平面モデルの固有値であり、一般の作用素のスペクトル分解や非線形解の指数減衰は次講で学ぶ。

## 5. 演習

### Level A

<a id="ex-floer1-02-a01"></a>
#### FLOER1-02-A01 有限帯から無限帯へ
- Level: A

$X=\mathbb C$、$J=i$、$L_0=\mathbb R$、$L_1=e^{i\theta}\mathbb R$、$0<\theta<\pi$ とする。$u=e^{\theta(s+it)}$ の方程式、境界条件、$E_R$ と $E$ を求めよ。

<!-- solution-start -->
**詳細解答**。$u_s=\theta u,u_t=i\theta u$ なので $u_s+i u_t=0$。下辺は正の実数、上辺は $e^{i\theta}$ の正の実数倍。$|u|=e^{\theta s}$ だから[有限エネルギーstrip](#def-floer1-02-finite-energy)の積分は

$$
E_R=\int_{-R}^{R}\theta^2 e^{2\theta s}ds
=\frac{\theta}{2}(e^{2\theta R}-e^{-2\theta R}).
$$

$\theta>0$ より $R\to\infty$ で発散する。
<!-- solution-end -->

<a id="ex-floer1-02-a02"></a>
#### FLOER1-02-A02 原始関数と定数道の作用
- Level: A

$\lambda=-y\,dx$、$L_0=\mathbb R$、$L_1=\{(x,2x):x\in\mathbb R\}$ とする。$f_0(0)=0,f_1(0)=3$ となる原始関数を求め、交点の定数道の作用を計算せよ。

<!-- solution-start -->
**詳細解答**。$d\lambda=dx\wedge dy$。実軸では $y=0$ なので $f_0=0$。$L_1$ を $x\mapsto(x,2x)$ で表示すると $\lambda|_{L_1}=-2x\,dx$ であり、$f_1(x)=3-x^2$。交点は $2x=0$ より原点だけである。[完全Lagrange境界と作用汎関数](#def-floer1-02-exact-action)に代入すると、定数道の速度が零なので作用は $0+3-0=3$。
<!-- solution-end -->

<a id="ex-floer1-02-a03"></a>
#### FLOER1-02-A03 作用差の符号
- Level: A

完全境界の交点 $p,q$ の作用がそれぞれ $2,-1$ とする。収束端を持つ非定数の擬正則stripが $p$ から $q$ へ向かう場合のエネルギーを求め、逆方向が可能か判定せよ。

<!-- solution-start -->
**詳細解答**。[完全境界での作用差とエネルギー](#thm-floer1-02-action-energy)により $E=\mathcal A(p)-\mathcal A(q)=2-(-1)=3$。逆向きなら $E=-1-2=-3$ となるが、エネルギーは非負積分なので不可能。正の差だけから順方向の解の存在は結論できない。
<!-- solution-end -->

<a id="ex-floer1-02-a04"></a>
#### FLOER1-02-A04 固有関数と減衰方向
- Level: A

$V=\mathbb C,J=i,W_0=\mathbb R,W_1=i\mathbb R$ とする。$\eta(t)=e^{-i\pi t/2}$ が漸近作用素の固有関数になることを確かめ、$D=\partial_s+A$ の分離解を一つ作れ。

<!-- solution-start -->
**詳細解答**。滑らかなので $\eta,\eta'$ は $L^2$、端は $1,-i$ だから[交点の漸近作用素](#def-floer1-02-asymptotic-operator)の定義域に入る。

$$
i\eta'=i(-i\pi/2)\eta=(\pi/2)\eta.
$$

$c'+(\pi/2)c=0$ の解 $c=e^{-\pi s/2}$ を選ぶと $\xi=c\eta$ は $D\xi=0$。正端で減衰、負端で増大する。線形方程式の解であり両端有限エネルギーの解とは限らない。
<!-- solution-end -->

### Level B

<a id="ex-floer1-02-b01"></a>
#### FLOER1-02-B01 小さい断面と交点
- Level: B

有限エネルギーstripで $h(s)=\int_0^1|u_t|^2dt$ とする。各整数 $k\ge1$ について $s_k\in[k,k+1]$ を選び、$d_g(u(s_k,0),u(s_k,1))\to0$ を示せ。像がコンパクトで両Lagrange部分多様体が閉なら、交点が存在することも示せ。

<!-- solution-start -->
**詳細解答**。適合性と方程式から $\int_{\mathbb R}h=E<\infty$。$a_k=\int_k^{k+1}h$ は非負で和が有限だから $a_k\to0$。連続性から $h(s_k)\le a_k$ となる点がある。横断曲線の長さを使い

$$
d_g(u(s_k,0),u(s_k,1))
\le\int_0^1 |u_t|dt\le\sqrt{h(s_k)}
\le\sqrt{a_k}\to0.
$$

コンパクト性から始点列の部分列が $p$ に収束し、三角不等式から終点列も同じ $p$ に収束する。閉性により $p\in L_0\cap L_1$。これは[有限エネルギーstripの小さい横断曲線](#prop-floer1-02-small-slices)の結論を端点の距離に適用した形である。
<!-- solution-end -->

<a id="ex-floer1-02-b02"></a>
#### FLOER1-02-B02 作用の補正項
- Level: B

標準平面で $\lambda=x\,dy$、$L_0=\mathbb R$、$L_1=\{(x,x)\}$ とする。原始関数を原点で零とし、道 $\gamma_a(t)=(a,at)$ の作用を求めよ。$a$ について直接微分し、第一変分の積分と一致するか調べよ。

<!-- solution-start -->
**詳細解答**。$d\lambda=dx\wedge dy$、$L_0$ 上は $dy=0$、$L_1$ 上は $dy=dx$ なので $f_0=0,f_1(x)=x^2/2$。下端 $(a,0)$、上端 $(a,a)$ は境界を満たす。線積分は $\int_0^1 a\cdot a\,dt=a^2$ だから[完全Lagrange境界と作用汎関数](#def-floer1-02-exact-action)は

$$
\mathcal A(\gamma_a)=-a^2+a^2/2=-a^2/2,\qquad
\frac{d}{da}\mathcal A=-a.
$$

変分速度は $\xi=(1,t)$、横断速度は $\dot\gamma=(0,a)$。従って $\omega(\dot\gamma,\xi)=0\cdot t-a\cdot1=-a$。積分すると $-a$ で[完全Lagrange境界での作用の第一変分](#prop-floer1-02-variation)と一致する。補正を落とすと $-2a$ になり、境界項が残る。
<!-- solution-end -->

<a id="ex-floer1-02-b03"></a>
#### FLOER1-02-B03 非零の周期
- Level: B

$L_0=\{|z|=\rho\}$（$\rho>0$）、$L_1=\{|z-\rho|=\rho\}$、$p=2\rho$ とする。$V(r,t)=(1-t)\rho e^{2\pi ir}+tp$ の面積と作用の周期を求め、$\lambda=-y\,dx$ の $L_0$ 上の原始関数が存在しない理由を示せ。

<!-- solution-start -->
**詳細解答**。二円は埋め込まれた一次元部分多様体で、交点では半径ベクトルが非平行なので横断的である。$V$ は下端を $L_0$ 上、上端を $p\in L_1$ に送り、$r=0,1$ の道は一致する。$ds$ ではなく $dr\wedge dt$ の向きを取ると下辺は $r$ 増加方向。[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で左右の辺が消え、上辺は定数なので

$$
\int V^*\omega=\int_0^{2\pi}\rho^2\sin^2\phi\,d\phi
=\pi\rho^2.
$$

よって[境界を保つ変形の面積と作用の周期](#prop-floer1-02-relative-area)でいう作用差は $-\pi\rho^2\ne0$。もし $\lambda|_{L_0}=df_0$ なら閉曲線上の積分は始点と終点の関数値の差で零となる。計算結果に反する。
<!-- solution-end -->

<a id="ex-floer1-02-b04"></a>
#### FLOER1-02-B04 漸近作用素を逆に解く
- Level: B

$A=i\,d/dt$、$W_0=\mathbb R,W_1=i\mathbb R$ とし、$A\eta=1+i$ を端の条件を保って解け。端条件を $W_0=W_1=\mathbb R$ に変えたとき解けるか。

<!-- solution-start -->
**詳細解答**。[漸近作用素の対称性と横断性](#thm-floer1-02-asymptotic-invertible)の逆構成では、$\eta'= -i(1+i)=1-i$ だから

$$
\eta(t)=a+(1-i)t,\quad a\in\mathbb R.
$$

上端の実部が零となるには $a+1=0$ だから $a=-1$、$\eta(t)=-1+t-it$。両端は $-1,-i$、微分は $1-i$ で $i(1-i)=1+i$ と確認できる。両空間が実軸の場合は上端の虚部 $-1$ を消せないので解なし。横断性が失われ、さらに任意の実定数が核に入る。
<!-- solution-end -->

### Level C

<a id="ex-floer1-02-c01"></a>
#### FLOER1-02-C01 半円stripの向きとエネルギー
- Level: C

$\rho>0$ とし、$\lambda=-y\,dx$、$L_0=\mathbb R$、$L_1=\{\rho e^{i\phi}:-\varepsilon<\phi<\pi+\varepsilon\}$（$0<\varepsilon<\pi/2$）とする。$w=e^{\pi(s+it)/2}$ として $u=\rho(w-1)/(w+1)$ を考える。

1. 方程式、Lagrange境界、横断性、収束端を確認せよ。
2. 原始関数を構成し、作用差からエネルギーを求めよ。
3. $s$ を反転した $v(s,t)=u(-s,t)$ が擬正則でない理由を方程式と作用差の両方から説明せよ。

<!-- solution-start -->
**詳細解答**。

1. 第一象限では $w+1\ne0$ である。微分は

$$
u_s=\frac{\rho\pi w}{(w+1)^2},\qquad
u_t=\frac{i\rho\pi w}{(w+1)^2}.
$$

従って $u_s+i u_t=0$。$t=0$ で $w=r>0$、$u=\rho(r-1)/(r+1)\in L_0$。$t=1$ では $w=ir$ だから

$$
u=\rho\frac{r^2-1+2ir}{1+r^2}.
$$

ノルムの二乗は $\rho^2((r^2-1)^2+4r^2)/(1+r^2)^2=\rho^2$、虚部は正なので $u\in L_1$。二つの部分多様体は一次元なので $\omega$ の制限は零、交点 $\pm\rho$ では接方向が実軸と虚軸になり横断する。

$|w|=e^{\pi s/2}$ で $|w+1|\ge\max(1,|w|)$ より

$$
|u+\rho|\le2\rho |w|,\qquad
|u-\rho|\le2\rho/|w|.
$$

前者を負端、後者を正端に用いる。$|u_t|\le\rho\pi\min(|w|,1/|w|)$ なので微分も両端で一様に零へ収束する。従って[stripの収束端](#def-floer1-02-ends)は $-\rho,\rho$。

2. $d\lambda=\omega$。実軸では $f_0=0$、円弧では $x=\rho\cos\phi$、$y=\rho\sin\phi$ だから

$$
\lambda|_{L_1}=\rho^2\sin^2\phi\,d\phi,\qquad
f_1(\phi)=\rho^2(\phi/2-\sin(2\phi)/4).
$$

角度が開区間内で一価なので原始関数は正しく定義される。[完全境界での作用差とエネルギー](#thm-floer1-02-action-energy)により

$$
E(u)=f_1(\pi)-f_1(0)=\pi\rho^2/2.
$$

3. $v_s=-u_s(-s,t)$、$v_t=u_t(-s,t)$ より $v_s+i v_t=-2u_s(-s,t)$。$w\ne0$ なのでこれは零ではない。もし擬正則なら収束端の順が入れ替わるため作用差は $-\pi\rho^2/2$ となり、非負エネルギーと矛盾する。写像としてのDirichletエネルギーは反転前と同じ正の値だが、面積の向きは反転している。
<!-- solution-end -->

## 6. 次講への接続

作用差は完全境界での総エネルギーと向きを決め、漸近作用素は横断交点の近くの線形方程式を決める。次講ではスペクトルと重み付きSobolev空間を用い、端の指数減衰と非コンパクトな帯全体のFredholm性を結び付ける。エネルギーが有限であること、端が収束すること、線形作用素が可逆な端を持つこと、帯全体でFredholm性が成り立つことは、それぞれ異なる主張である。
