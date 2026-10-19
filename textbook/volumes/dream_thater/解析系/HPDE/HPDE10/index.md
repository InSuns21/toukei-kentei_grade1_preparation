# HPDE10 有限伝播と依存領域の評価

[HPDE8のエネルギー不等式](../HPDE8/index.md#thm-hpde8-energy-inequality)は、側面からエネルギーが流入しない領域では、上面のエネルギーを下面と源で支配できることを示しました。しかし「どの点の値が、初期面のどこに依存するか」は、領域の切り方まで決めなければ分かりません。この章では**未来へ行くほど縮む過去光円錐**を使い、点の値に影響し得る初期データと源の範囲を決定します。

結論は二つの形を取ります。まず、初期集合から外へ出ない因果曲線の全称条件を用いた**依存領域の一意性**です。次に、コンパクトな初期データ・源から作った解の**支持が因果的な範囲を越えないこと**です。この二つをつなぐには、大域双曲性によるコンパクト性が必要になります。ここでは滑らかな解が**与えられていることを仮定**し、解の存在そのものはHPDE11以降で扱います。

## 1. 「影響が届く」と「値が決まる」は向きが違う

以下、$(M,g)$ は境界のない滑らかな時間向き付きLorentz多様体、符号は $(-,+,\ldots,+)$ とします。大域的な結論では $M$ は大域双曲的で、$\Sigma$ は滑らかな空間的Cauchy超曲面とします。[LORG16の大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)、[LORG15のCauchy面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)、[LORG20の滑らかな時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)を使います。

[因果集合の定義](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)で、$J^+(A)$ は $A$ から未来因果曲線で到達できる点の集合、$J^-(A)$ は $A$ へ未来因果曲線で到達できる点の集合でした。$J(A)=J^+(A)\cup J^-(A)$ と書きます。

初期面の一部分 $S\subset\Sigma$ から**値が定まる点**は、[LORG13の依存領域](../../../幾何系/LORG/LORG13/index.md#def-lorg13-dependence) $D^\pm(S)$ で測ります。一方、初期データが $K_\Sigma\subset\Sigma$ にしか存在しないとき、**影響が届き得る点**は $J^\pm(K_\Sigma)$ に含まれると予想されます。$D(S)$ と $J(S)$ は別の集合であり、前者はすべての非延長因果曲線、後者は少なくとも一本の因果曲線に関する条件です。

例えばMinkowski平面で $\Sigma=\{t=0\}$、$S=\{(0,x):|x|\le R\}$ とします。[LORG13の依存領域公式](../../../幾何系/LORG/LORG13/index.md#thm-lorg13-domain-formula)へ $[X-t,X+t]\subset[-R,R]$ を代入すると、$0\le t\le R$ について

$$
D^+(S)=\{(t,x):0\le t\le R,\ |x|+t\le R\}.
$$

これに対して $J^+(S)$ の切断は $|x|\le R+t$ で、時間とともに**広がります**。前者の切断 $|x|\le R-t$ は**縮みます**。これを取り違えるとエネルギーの側面フラックスも逆向きになります。

## 2. 平坦な縮小円錐でエネルギーを計算する

時空 $\mathbb R^{1+n}$、計量 $g=-dt^2+\sum_i(dx^i)^2$ で、実関数 $u\in C^2$ が

$$
Pu=u_{tt}-\Delta_xu+V(t,x)u=f
$$

を満たすとします。$V$ は実数値の連続関数とし、考えるコンパクト領域で有界とします。**$V\ge0$ は必要ありません**。[HPDE8の正にずらしたエネルギー](../HPDE8/index.md#def-hpde8-shifted-energy)と同様に、係数 $1$ の $u^2$ を追加します。

頂点 $(T,0)$ の過去円錐を時刻 $s<T$ で切った閉領域を

$$
\Omega_{s,T}=\{(t,x):s\le t\le T,\ r=|x|\le T-t\}
$$

とします。$s\le t<T$ の切断を $B_t=\{x:|x|\le T-t\}$ とし、

$$
e=\frac12(u_t^2+|\nabla_xu|^2+u^2),
\qquad E(t)=\int_{B_t}e(t,x)\,dx
$$

とおきます。正にずらしたため、$V$ の符号と無関係に $e\ge0$ で、$e=0$ なら $u=u_t=\nabla_xu=0$ です。

先に移動する境界の向きを確認します。側面の内側は $F(t,x)=t+r-T\le0$ なので外向き共法線は $dF=dt+dr$。$r=T-t>0$ で計量によってベクトルへ移すと

$$
g^{-1}(dF,\cdot)=-\partial_t+\partial_r
$$

であり、これは**過去向き光的**です。頂点 $r=0$ にこの法線は定義されませんが、まず $t<T$ の切断で積分し、最後に極限を取ります。

<a id="prop-hpde10-flat-cone-balance"></a>
<!-- formal-statement-start -->
> **命題（平坦な縮小円錐のエネルギー収支）**  
> $s<b<T$、$u\in C^2$、$V$ を実連続、$f$ を連続とし、上記の円錐内で $Pu=f$ が成立するとする。$n\ge1$ とする。$B_t$ の球面上の外向き半径微分を $u_r$、球面接方向の勾配を $\nabla_{\tan}u$ と書く。このとき

$$
\begin{aligned}
E(b)&+\frac12\int_s^b\int_{\partial B_t}
\left((u_t-u_r)^2+|\nabla_{\tan}u|^2+u^2\right)
\,dS\,dt\\
&=E(s)+\int_s^b\int_{B_t}
\left(fu_t+(1-V)uu_t\right)\,dx\,dt.
\end{aligned}
$$

> $n=1$ の場合は両端点の和を境界積分とし、接方向の項は零とする。
<!-- formal-statement-end -->

### 証明の見取り図

$e$ の時間微分を方程式で置き換えた後、動く球の積分を微分します。境界が毎秒1だけ内側へ進むため、空間フラックスと境界移動項が一つの平方和になります。

<!-- proof-start -->
### 証明

積の微分と $u_{tt}-\Delta u=f-Vu$ を使うと

$$
\begin{aligned}
\partial_te
&=u_tu_{tt}+\nabla u\cdot\nabla u_t+uu_t\\
&=u_t(u_{tt}-\Delta u)+\nabla\cdot(u_t\nabla u)+uu_t\\
&=fu_t+(1-V)uu_t+\nabla\cdot(u_t\nabla u).
\end{aligned}
$$

球の半径は $\rho(t)=T-t$、$\rho'(t)=-1$ です。球面の動きを含む積分微分と[Gauss–Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)から

$$
\begin{aligned}
E'(t)
&=\int_{B_t}\partial_te\,dx-\int_{\partial B_t}e\,dS\\
&=\int_{B_t}\left(fu_t+(1-V)uu_t\right)\,dx
+\int_{\partial B_t}(u_tu_r-e)\,dS.
\end{aligned}
$$

球面では $|\nabla u|^2=u_r^2+|\nabla_{\tan}u|^2$ なので

$$
\begin{aligned}
e-u_tu_r
&=\tfrac12(u_t^2+u_r^2+|\nabla_{\tan}u|^2+u^2)-u_tu_r\\
&=\tfrac12\left((u_t-u_r)^2+|\nabla_{\tan}u|^2+u^2\right)\ge0.
\end{aligned}
$$

これを $E'$ の式へ代入し、$s$ から $b$ まで積分すれば結論です。$n=1$ では、右端の $u_r=u_x$ と左端の $u_r=-u_x$ をそれぞれ使うので、左右の平方和の符号が違って見えることにも整合します。$\square$
<!-- proof-end -->

側面へ**入って来る**量ではなく、縮む領域から**出て行く**量が左辺に現れました。逆に広がる未来円錐を切り取った場合はこの非負フラックスを同じ向きで捨てられません。

## 3. 零データなら頂点まで零になる

非負フラックスを捨てた収支から評価を導きます。$\Omega_{s,T}$ はコンパクトなので $M_V=\sup_{\Omega_{s,T}}|V|<\infty$ です。Youngの不等式と $u_t^2+u^2\le2e$ を使うと

$$
\begin{aligned}
|fu_t|&\le\tfrac12f^2+\tfrac12u_t^2\le\tfrac12f^2+e,\\
|(1-V)uu_t|&\le(1+M_V)\tfrac12(u^2+u_t^2)
\le(1+M_V)e.
\end{aligned}
$$

従って各 $b<T$ で

$$
E(b)\le E(s)+(2+M_V)\int_s^bE(t)\,dt
+\frac12\int_s^b\|f(t)\|_{L^2(B_t)}^2dt.
$$

ここへ[積分型Grönwall不等式](../HPDE8/index.md#lem-hpde8-gronwall)を、$A=2+M_V$、$B=1/2$、$F(t)=\|f(t)\|_{L^2(B_t)}^2$ として代入します。

<a id="thm-hpde10-flat-dependence"></a>
<!-- formal-statement-start -->
> **定理（平坦な円錐の依存領域評価）**  
> $u\in C^2$ が上記の $\Omega_{s,T}$ で $Pu=f$ を満たし、$V$ は実連続で有界とする。このとき $s\le b<T$ で

$$
E(b)\le e^{(2+M_V)(b-s)}E(s)
+\frac12\int_s^b e^{(2+M_V)(b-t)}
\|f(t)\|_{L^2(B_t)}^2\,dt.
$$

> 特に $u(s,\cdot)=\partial_tu(s,\cdot)=0$ が $B_s$ 上で成立し、$f=0$ が $\Omega_{s,T}$ 上で成立するなら、$u=0$ が円錐全体（頂点も含む）で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

定数は有限の円錐ごとに選びます。初期エネルギーと源項が零であれば不等式の右辺は零です。正の $u^2$ のおかげで、微分だけでなく関数そのものが零と分かります。

<!-- proof-start -->
### 証明

直前の積分不等式の $E,F$ は非負連続です。[HPDE8のGrönwall補題](../HPDE8/index.md#lem-hpde8-gronwall)の各文字に代入して表示の上界を得ます。

初期データが $B_s$ 上で零なら $u_s=\nabla_xu(s,\cdot)=0$ も成立し、$E(s)=0$ です。さらに $f=0$ なら $E(b)\le0$、一方 $E(b)\ge0$ なので $E(b)=0$。連続かつ非負の $e$ の積分が零なので $e(b,x)=0$ が $B_b$ の各点で成り立ちます。特に $e\ge u^2/2$ より $u(b,x)=0$ です。任意の $b<T$ に適用し、$u$ の連続性から $(T,0)$ でも $u=0$ が従います。$\square$
<!-- proof-end -->

**直接例：初期半径を数値にする。** $s=0$、$T=3$、頂点 $p=(3,2)$ の空間位置を中心に平行移動すると、初期切断は $[2-3,2+3]=[-1,5]$ です。この区間に初期値と初期速度が零で、$\{0\le t\le3,\ |x-2|\le3-t\}$ 上の源が零なら $u(3,2)=0$ です。初期切断を $[-1,5]$ より狭くすれば、一般にはこの結論を保証できません。

## 4. 曲がった時空と束値作用素で何を置き換えるか

平坦な球を時空全体へそのまま移すことはできません。光円錐は計量によって変わり、光的側面に交点や滑らかでない部分が現れ得ます。しかし、局所座標での主部が同じ時空計量に従う限り、**エネルギーの非負な境界項**は残ります。

[HPDE5のnormally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic) $P:\Gamma(E)\to\Gamma(E)$ を考えます。$E\to M$ は有限ランクの実または複素ベクトル束です。[HPDE4の束接続](../HPDE4/index.md#def-hpde4-connection)と正定値束計量を局所的に選びます。この補助接続は必ずしも $P$ の一意な接続と同じではありません。[HPDE8の束値評価](../HPDE8/index.md#prop-hpde8-bundle-energy)のように差は一次以下の係数として扱えます。

小さな時間座標近傍では、[LORG20の分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)に合わせて

$$
g=-\beta(t,x)^2dt^2+h_{ij}(t,x)\,dx^i dx^j,\qquad \beta>0
$$

と書けます。コンパクトな局所時間帯では $\beta,h^{ij}$ と係数の必要な導関数が有界であり、正定値性も一様です。$P=-\Box_g^\nabla+A^a\nabla_a+B$ と書いたとき、$A,B$ は滑らかな一次・零次係数です。二階主部のLorentz性が、以下の境界符号を決めます。

未来向き単位時間的ベクトル $N$、正定値束計量に関するノルム $\|\cdot\|$、固定 $\lambda>0$ に対し、局所的なエネルギー密度は

$$
e_\lambda=\tfrac12\left(
\|\nabla_Nu\|^2+\|D_\Sigma u\|_h^2+\lambda\|u\|^2
\right)
$$

です。外向き共法線に対応するベクトルが $K=b(-N+V)$（$b>0$、$V$ は空間的単位ベクトル）なら、[HPDE7の非負フラックス](../HPDE7/index.md#prop-hpde7-null-flux)と同じ平方完成により

$$
g(J_\lambda,K)=\frac b2
\left(\|\nabla_Nu-\nabla_Vu\|^2+
\|D_{\perp V}u\|^2+\lambda\|u\|^2\right)\ge0.
$$

ここでは**導関数の主部だけで作った補助電流**を使います。$A,B$、計量非互換性、束曲率、時間的乗数の変形による項は、コンパクト領域上では $C e_\lambda+C\|Pu\|^2$ で支配できます。側面の符号を零次作用素 $B$ の正定値性から導いたわけではありません。

さらに局所座標球 $|x-x_0|\le R-c(t-t_0)$ の境界で $F=c(t-t_0)+|x-x_0|-R$ と置くと

$$
g^{-1}(dF,dF)=-\frac{c^2}{\beta^2}
+h^{ij}\frac{x_i-x_{0i}}{|x-x_0|}
\frac{x_j-x_{0j}}{|x-x_0|}.
$$

$c>\sup\beta\sqrt{\lambda_{\max}(h^{ij})}$ とすれば $g^{-1}(dF,dF)<0$ で、$g^{-1}(dF,\cdot)$ は過去向き時間的です。**光より少し速く縮む座標球**の側面はエネルギーにとって流入境界ではありません。これは局所一意性を証明するための補助領域であり、物理的に信号が光速を超えるという意味ではありません。

<a id="lem-hpde10-local-cone"></a>
<!-- formal-statement-start -->
> **補題（局所的な後方領域の零データ一意性）**  
> $P$ を滑らかなnormally hyperbolic束値作用素とする。空間的スライス上の一点の近傍で、コンパクト閉包を持つ時間座標を選ぶ。定数 $c>0$ と半径 $R>0$ を固定し、縮む座標球の外向き共法線が過去向き時間的であり、領域が座標近傍内に収まると仮定する。
>
> 滑らかな切断 $u$ が次の閉領域で方程式を満たすとする。

$$
t_0\le t\le t_1<t_0+R/c,\qquad Pu=0.
$$

> さらに底面球で $u$ と未来向き単位法線 $N$ に沿う微分がともに零なら、領域全体で $u=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

光的境界の場合と同様、側面フラックスは非負で、内部の係数誤差だけがエネルギーに残ります。局所性によってすべての係数上界は有限です。

<!-- proof-start -->
### 証明

局所座標に正定値束計量とその互換接続を取り、上の $e_\lambda$ を積分して $E_\lambda(t)$ を定義します。$\lambda>0$ なので $e_\lambda=0$ と $u=\nabla u=0$ は同値です。外向き共法線が過去向き時間的な側面では、非負エネルギーの優越性によってフラックスも非負です。実際、$K=-aN+V$（$a>|V|_h$）と書けば

$$
\begin{aligned}
g(J_\lambda,K)
&=\tfrac a2(\|\nabla_Nu\|^2+\|D_\Sigma u\|^2+\lambda\|u\|^2)
-\operatorname{Re}\langle\nabla_Nu,\nabla_Vu\rangle\\
&\ge \tfrac{a-|V|_h}{2}(\|\nabla_Nu\|^2+\|D_\Sigma u\|^2)
+\tfrac{a\lambda}{2}\|u\|^2\ge0.
\end{aligned}
$$

ここでCauchy–Schwarzと $2ab\le a^2+b^2$ を、$|\nabla_Vu|\le |V|_h|D_\Sigma u|_h$ に適用しました。内部の誤差は[HPDE8の束値エネルギー評価](../HPDE8/index.md#prop-hpde8-bundle-energy)で制御され、コンパクト領域に依存する $C<\infty$ について

$$
E_\lambda(t)\le E_\lambda(t_0)+C\int_{t_0}^tE_\lambda(\tau)\,d\tau
+C\int_{t_0}^t\|Pu(\tau)\|_{L^2(B_\tau)}^2\,d\tau
$$

を得ます。底面で $u=\nabla_Nu=0$、従って接方向微分も零で $E_\lambda(t_0)=0$ です。$Pu=0$ と[Grönwallの不等式](../../ODE/ODE8/index.md#lem-ode8-gronwall)から $E_\lambda(t)=0$、正定値性と連続性から $u=0$ です。$\square$
<!-- proof-end -->

この補題は**任意の小さな局所時間帯**に適用できます。座標球の $c$ は局所係数に依存してよく、非コンパクトな $M$ 上で単一の上界を置く必要はありません。

## 5. 因果的な過去全体での依存領域

局所補題をつなぐ際に要る幾何を確認します。大域双曲時空で $p\in J^+(\Sigma)$ とすると、$\Sigma$ と $p$ の間にある因果的な過去は

$$
Q_p=J^-(p)\cap\Sigma,\qquad
C_p=J^-(p)\cap J^+(\Sigma)
=J^-(p)\cap J^+(Q_p)
$$

です。$Q_p$ はコンパクトで、$C_p$ もコンパクトです。このコンパクト性は一般のLorentz多様体では成立しません。[LORG16の大域双曲性の特徴付け](../../../幾何系/LORG/LORG16/index.md#thm-lorg16-characterization)と、$\Sigma$ がCauchy面であることから従います。特に $C_p$ の各点に至る過去因果曲線を $\Sigma$ まで延長すると交点が $Q_p$ に属し、上の二集合の一致が分かります。

この事実は、一点 $p$ までの議論を**有限個の局所時間帯**で覆えることを保証します。$Q_p$ の外側から勝手にデータを持ち込む必要はありません。

<a id="thm-hpde10-causal-dependence"></a>
<!-- formal-statement-start -->
> **定理（大域双曲時空の因果的な依存評価）**  
> $(M,g)$ を境界のない滑らかな大域双曲時空とし、$\Sigma$ を滑らかな空間的Cauchy面とする。有限ランクの滑らかな実または複素ベクトル束 $E\to M$ 上にnormally hyperbolic作用素 $P$ を与える。
>
> 滑らかな切断 $u$ が源 $f$ を持つ方程式を満たすとし、未来の点 $p$ の初期面上の足跡と、そこから $p$ までの因果領域をそれぞれ次で定める。

$$
Pu=f,\qquad
p\in J^+(\Sigma),\qquad
Q_p=J^-(p)\cap\Sigma,\qquad
C_p=J^-(p)\cap J^+(\Sigma).
$$

> 次の二条件が成り立つなら、$u(p)=0$ である。
>
> 1. $u|_\Sigma=0$ および $\nabla_Nu|_\Sigma=0$ が $Q_p$ 上で成立する。$N$ は未来向き単位法線で、$\nabla$ は任意に選んだ滑らかな束接続とする。
> 2. $f=0$ が $C_p$ 上で成立する。
>
> 時間向きを逆にした $p\in J^-(\Sigma)$ に対しても、$J^+(p)\cap\Sigma$ と $J^+(p)\cap J^-(\Sigma)$ を用いた同様の結論が成り立つ。これらは与えられた滑らかな解の一意性であり、解の存在定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

一点 $p$ の因果的過去を $\Sigma$ で切ると、$C_p$ はコンパクトな「上ほど細い」領域になります。その光的側面の外向き共法線は過去向きなので、前節と同じ非負フラックスを使えます。境界が折れる場合には、局所Lipschitz表示を用いて積分します。

<!-- proof-start -->
### 証明

[LORG20の時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)で $\Sigma=\Sigma_0$ とし、$p$ の時刻を $T\ge0$ とします。$T=0$ なら $p\in\Sigma$ であり仮定1から結論です。以下 $T>0$ とします。

$C_p$ はコンパクトであり、$0\le t\le T$ にあるため、補助束計量・互換接続・未来向き単位法線 $N$ を用いて[HPDE8の束値エネルギー評価](../HPDE8/index.md#prop-hpde8-bundle-energy)の密度 $e_\lambda$ を定義できます。$C_p$ 上で必要な係数・接続・時空計量・lapse の有限上界および正定値性の下界が取れます。$\Sigma_t$ の切断を $C_t=C_p\cap\Sigma_t$ とし、

$$
E_\lambda(t)=\int_{C_t}e_\lambda\,d\mu_{h_t}
$$

を考えます。

$C_p$ の側面は $J^-(p)$ の境界の一部です。[LORG12のachronal境界の局所Lipschitz表示](../../../幾何系/LORG/LORG12/index.md#lem-lorg12-boundary-graph)と[光的生成子](../../../幾何系/LORG/LORG12/index.md#thm-lorg12-null-generators)によって、頂点と折れ目を除いたほとんどすべての側面点に外向き共法線が存在し、その対応ベクトルは過去向き光的です。実際、円錐の局所表示 $F\le0$ の境界では、$dF$ を外向きに取ると $g^{-1}(dF,\cdot)$ は過去向きであり、光的生成子の接方向に直交して零長を持ちます。従って[非負光的フラックス](../HPDE7/index.md#prop-hpde7-null-flux)と第4節の束値平方和から、側面のフラックスは非負です。

滑らかな解に対する電流の発散定理を、$0\le t\le b<T$ の領域 $C_p\cap\{t\le b\}$ へ適用します。局所Lipschitzな境界では座標グラフ上で積分し、折れ目の集合は面測度零なので寄与しません。必要なら滑らかな内側近似を用い、電流と面密度の有界性から極限を取ります。上下面での向きを[HPDE7のStokes収支](../HPDE7/index.md#thm-hpde7-stokes-balance)に合わせると

$$
E_\lambda(b)+F_{\mathrm{side}}(0,b)
=E_\lambda(0)+\int_{C_p\cap\{0\le t\le b\}}
\nabla_aJ_\lambda^a\,d\mu_g,
\qquad F_{\mathrm{side}}(0,b)\ge0.
$$

$Pu=f=0$ が $C_p$ 上で成立するので、束値の誤差評価には源項がありません。$d\mu_g=\beta\,dt\,d\mu_{h_t}$ と書き、コンパクト集合上の $\beta$ と係数を $A<\infty$ に吸収すると

$$
0\le E_\lambda(b)\le E_\lambda(0)+A\int_0^b E_\lambda(t)\,dt.
$$

初期切断 $C_0=Q_p$ 上で $u=\nabla_Nu=0$ です。接方向の微分も零であるため $E_\lambda(0)=0$。[Grönwallの不等式](../../ODE/ODE8/index.md#lem-ode8-gronwall)から、すべての $b<T$ で $E_\lambda(b)=0$。$e_\lambda\ge\lambda\|u\|^2/2$ と連続性により $u$ は $C_p\cap\{t<T\}$ で零です。$p$ の直前から $p$ へ近付く点は $C_p$ の内部に存在するので、滑らかさによる連続性で $u(p)=0$ となります。

時間反転した場合も同じように切断を下方へ動かし、エネルギー電流の時間向きを反転して評価します。$\square$
<!-- proof-end -->

**定理の読み方**：データが $Q_p$ 上で零であり、そこから頂点へ至る領域に源がなければ、別の場所にどんな初期データがあっても頂点の値を変えられません。逆に、この定理だけでは $Q_p$ 内のデータから解を**構成**できません。

<a id="cor-hpde10-domain-uniqueness"></a>
<!-- formal-statement-start -->
> **系（依存領域での一致）**  
> 上記の大域双曲時空と同一の作用素 $P$ に対する滑らかな二解 $u,v$ を考える。初期面の部分集合 $S\subset\Sigma$ 上で、初期変位と法線速度が一致すると仮定する。

$$
u|_S=v|_S,\qquad
\nabla_Nu|_S=\nabla_Nv|_S.
$$

> 対象となる点 $p$ が未来依存領域にある場合は、因果的な足跡と領域を次のように置く。

$$
p\in D^+(S)\cap J^+(\Sigma),\quad
Q_p=J^-(p)\cap\Sigma\subset S,\quad
C_p=J^-(p)\cap J^+(\Sigma).
$$

> 二解の源が $C_p$ 上で一致するなら $u(p)=v(p)$ である。過去側も $p\in D^-(S)\cap J^-(\Sigma)$ としてすべての因果集合の時間向きを反転した同様の結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二解の差に定理を適用します。$D(S)$ の全称条件は、どの過去因果曲線も初期集合を外れないという幾何を供給します。

<!-- proof-start -->
### 証明

$w=u-v$ とすると線形性により $Pw=f_u-f_v$ です。初期変位と法線速度は $S$ で一致するので $w=\nabla_Nw=0$ が $Q_p\subset S$ 上で成り立ちます。さらに源差は $C_p$ 上で零と仮定しているため、[因果的な依存評価](#thm-hpde10-causal-dependence)を $w$ に適用して $w(p)=0$ を得ます。過去側でも同じです。$\square$
<!-- proof-end -->

幾何学的な[未来・過去依存領域](../../../幾何系/LORG/LORG13/index.md#def-lorg13-dependence)を使って $Q_p\subset S$ を確かめられる状況では、この系が幾何学的な $D(S)$ を「解の一意性」の領域に変えます。$S$ が不規則な部分集合でも定理の仮定を飛ばさず、実際に必要な因果的足跡 $Q_p$ を確認します。

## 6. コンパクト支持は因果的な範囲に収まる

切断 $u|_\Sigma$ と法線データ $\nabla_Nu|_\Sigma$ の支持の和集合を $K_\Sigma$ とします。ここで[HPDE3の支持の定義](../HPDE3/index.md#prop-hpde3-support)に従い、支持とは零でない点の集合の閉包です。$K_\Sigma$ と $K_f=\operatorname{supp}f$ がともにコンパクトであると仮定します。

<a id="def-hpde10-data-source-support"></a>
<!-- formal-statement-start -->
> **定義（初期データ・源の因果的な影響範囲）**  
> 上記の大域双曲時空で、初期変位 $u_0=u|_\Sigma$、初期法線速度 $u_1=\nabla_Nu|_\Sigma$、源 $f=Pu$ の支持がコンパクトであるとする。その合併と因果的到達集合を

$$
K= \operatorname{supp}u_0\cup\operatorname{supp}u_1\cup\operatorname{supp}f,
\qquad J(K)=J^+(K)\cup J^-(K)
$$

> と書き、$J(K)$ を初期データ・源の**因果的な影響可能範囲**と呼ぶ。これは実際の解の支持と等しいと定義するのではなく、その上界の候補である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde10-data-source-support -->
**定義の確認**。二次元Minkowskiで、$u_0$ が $[-1,1]$ 上に支持され、$u_1=f=0$ とします。$K$ は時刻零のコンパクト区間です。[Minkowskiの因果到達条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)により、時刻 $t$ の $J(K)$ の切断は

$$
|x|\le1+|t|
$$

となります。例えば $(t,x)=(2,4)$ は外、$(2,3)$ は境界上にあります。定義は等号を含む光的境界も許します。$f$ が別のコンパクト集合に支持されていれば、その点から伸びる因果錐も合併します。
<!-- definition-example-end -->

<a id="thm-hpde10-finite-propagation"></a>
<!-- formal-statement-start -->
> **定理（有限伝播・支持の因果的包含）**  
> $(M,g)$ を滑らかな大域双曲時空、$\Sigma$ を滑らかな空間的Cauchy超曲面とし、$P:\Gamma(E)\to\Gamma(E)$ を滑らかなnormally hyperbolic作用素とする。滑らかな解 $u$ が $Pu=f$ を満たし、$u|_\Sigma,\nabla_Nu|_\Sigma$ および $f$ がコンパクト支持であると仮定する。上で定めたコンパクト集合 $K$ に対して

$$
\operatorname{supp}u\subset J(K)
$$

> が成り立つ。とくに $\Sigma$ 以後に限れば

$$
\operatorname{supp}u\cap J^+(\Sigma)
\subset J^+\!\left(K_\Sigma\cup(K_f\cap J^+(\Sigma))\right),
$$

> $\Sigma$ 以前に限れば時間を反転した対応する包含が成立する。これは強Huygens性や解の存在を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ が因果的到達集合の外側なら、$p$ の過去とデータ支持・源支持は交わりません。その零条件を一点の依存評価へ代入します。最後に「各点で零」から「支持の閉包が含まれる」へ進むため、$J(K)$ の閉性を確認します。

<!-- proof-start -->
### 証明

$p\in J^+(\Sigma)$ で $p\notin J^+(K_\Sigma\cup(K_f\cap J^+(\Sigma)))$ とします。$q\in Q_p=J^-(p)\cap\Sigma$ に $u_0(q)\ne0$ または $u_1(q)\ne0$ があれば、$q\in K_\Sigma$ かつ $q\le p$ となって $p\in J^+(K_\Sigma)$ に反します。従って $Q_p$ 上で両データが零です。

同じく $r\in C_p$ で $f(r)\ne0$ なら $r\in K_f\cap J^+(\Sigma)$、$r\le p$ となり仮定に反するので、$f=0$ が $C_p$ 上で成立します。[因果的な依存評価](#thm-hpde10-causal-dependence)により $u(p)=0$ です。時間を反転して、$\Sigma$ 以前にも同様の包含を得ます。両側を合わせれば $u=0$ が $M\setminus J(K)$ で成立します。

さらに、$K$ がコンパクトで $M$ が大域双曲的なため、因果的未来・過去が閉集合になることを示します。任意の収束列 $p_j\in J^+(K)$、$p_j\to p$ を取ります。各点から始点 $k_j\in K$ を選ぶと、$k_j\le p_j$ です。

コンパクト性によって部分列を選び、$k_j\to k\in K$ とできます。[LORG16の因果関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)を端点列に適用すると

$$
k_j\le p_j,\qquad k_j\to k,\qquad p_j\to p
\quad\Longrightarrow\quad k\le p,
$$

となります。従って $p\in J^+(K)$ で、$J^+(K)$ は閉です。過去側でも向きを逆にして同じ議論が成立し、$J^-(K)$ も閉になります。ゆえに $J(K)$ は閉で、$u=0$ が成り立つ $M\setminus J(K)$ は開集合です。支持の定義から $\operatorname{supp}u\subset J(K)$ を得ます。$\square$
<!-- proof-end -->

ここで初期データ $K_\Sigma$ だけを見て、源 $f$ の支持を忘れてはなりません。初期データが全て零でも、後から源を加えれば解はその因果的未来に生じ得ます。

## 7. 有限伝播は強Huygens性ではない

有限伝播は**円錐の外側に影響が出ない**ことです。円錐の**内側に残響がない**ことまでは要求しません。[HPDE1のd'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)に戻って、初期変位を零、初期速度をコンパクト支持の非負関数 $g$ とした一次元波動の解は

$$
u(t,x)=\frac12\int_{x-t}^{x+t}g(y)\,dy\qquad(t>0)
$$

でした。例えば $g$ が $[-1,1]$ に支持され、$\int_{-1}^1g(y)\,dy=2$ なら $t>1$、$|x|<t-1$ の**円錐内部**では区間 $[x-t,x+t]$ が $[-1,1]$ を全て含み

$$
u(t,x)=\frac12\int_{-1}^1g(y)\,dy=1
$$

となります。この値は最初に波面が通り過ぎた後も残ります。しかし $|x|>t+1$ なら積分区間が $g$ の支持と交わらず $u=0$ です。有限伝播は満たしますが、強Huygens性は成り立ちません。

強Huygens性を持つ特殊な平坦模型については[HPDE2の高次元波動](../HPDE2/index.md#thm-hpde2-kirchhoff)を参照してください。一般の曲率・質量・ポテンシャルに拡張できると推論してはいけません。

## 8. 演習：領域・向き・支持を判定する

<a id="ex-hpde10-a01"></a>
### A1. 過去円錐の初期切断
- Level: A
- 問題：$1+1$ 次元Minkowskiの $\Sigma=\{t=0\}$、$p=(4,-2)$ について $Q_p=J^-(p)\cap\Sigma$ と、$0\le t\le4$ の後方円錐の切断を求めよ。

<!-- solution-start -->
**詳細解答**。[Minkowski因果到達条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)によって $(t,x)\le(4,-2)$ である条件は $4-t\ge|x+2|$ です。$t=0$ を代入すると $4\ge|x+2|$、すなわち $-6\le x\le2$ です。各時刻の切断は $|x+2|\le4-t$、つまり $-6+t\le x\le2-t$ です。時間とともに縮み、$t=4$ で一点 $x=-2$ になります。
<!-- solution-end -->

<a id="ex-hpde10-a02"></a>
### A2. 左右の光的フラックスの符号
- Level: A
- 問題：$1+1$ 次元で $e=(u_t^2+u_x^2+u^2)/2$ とする。領域 $|x|\le T-t$ の右側面・左側面で $e-u_tu_r$ を $u_t,u_x,u$ の平方和としてそれぞれ書け。

<!-- solution-start -->
**詳細解答**。右端 $x=T-t$ では外向き半径微分は $u_r=u_x$ です。従って

$$
e-u_tu_r=\tfrac12(u_t^2+u_x^2+u^2)-u_tu_x
=\tfrac12((u_t-u_x)^2+u^2).
$$

左端 $x=-T+t$ では外向き半径微分は $u_r=-u_x$ なので

$$
e-u_tu_r=\tfrac12(u_t^2+u_x^2+u^2)+u_tu_x
=\tfrac12((u_t+u_x)^2+u^2).
$$

左右で交差項の符号が逆になるのは外向き空間方向が逆だからです。どちらも非負です。
<!-- solution-end -->

<a id="ex-hpde10-a03"></a>
### A3. 負のポテンシャルでも非負の測定量
- Level: A
- 問題：$V=-7$ とし、$Pu=u_{tt}-u_{xx}-7u=f$ のエネルギー $e=(u_t^2+u_x^2+u^2)/2$ の時間微分を計算せよ。また $(1-V)uu_t$ がエネルギーで支配できることを示せ。

<!-- solution-start -->
**詳細解答**。方程式から $u_{tt}-u_{xx}=f+7u$。積の微分で

$$
\begin{aligned}
\partial_te
&=u_tu_{tt}+u_xu_{xt}+uu_t\\
&=u_t(u_{tt}-u_{xx})+\partial_x(u_tu_x)+uu_t\\
&=fu_t+8uu_t+\partial_x(u_tu_x).
\end{aligned}
$$

[Youngの不等式](../../F0/F0-00D2D/index.md#lem-f0-00d2d-01)から $|8uu_t|\le4(u^2+u_t^2)\le8e$ です。$V<0$ でもずらしたエネルギーは非負で、係数 $8$ は内部誤差の上界に吸収できます。
<!-- solution-end -->

<a id="ex-hpde10-a04"></a>
### A4. 支持の因果的な外側
- Level: A
- 問題：$1+1$ 次元Minkowskiで時刻零の初期データの支持が $[-2,1]$、源が零とする。有限伝播が許す時刻 $t=3$ と $t=-2$ の空間支持の上界を求めよ。

<!-- solution-start -->
**詳細解答**。$J^\pm(K_\Sigma)$ の時刻 $t$ の切断は、初期区間を半径 $|t|$ だけ拡大した $[-2-|t|,1+|t|]$ です。$t=3$ では $[-5,4]$、$t=-2$ では $[-4,3]$。どちらも因果的に到達できる**上界**であり、解が区間内の全点で非零であるとは限りません。
<!-- solution-end -->

<a id="ex-hpde10-b01"></a>
### B1. 移動区間の両端を微分する
- Level: B
- 問題：$1+1$ 次元で $a(t)=x_0-(T-t)$、$b(t)=x_0+(T-t)$ とし、$E(t)=\int_{a(t)}^{b(t)}e(t,x)\,dx$ を考える。$\partial_te=fu_t+(1-V)uu_t+\partial_x(u_tu_x)$ を用い、$E'$ に現れる二つの非負な側面項を求めよ。

<!-- solution-start -->
**詳細解答**。可動端点の公式で $a'=1$、$b'=-1$ だから

$$
\begin{aligned}
E'(t)
&=\int_{a(t)}^{b(t)}\partial_te\,dx+e(t,b)b'-e(t,a)a'\\
&=\int_{a(t)}^{b(t)}[fu_t+(1-V)uu_t]\,dx\\
&\quad+u_tu_x|_{b}-u_tu_x|_a-e(t,b)-e(t,a).
\end{aligned}
$$

右端の損失は $e-u_tu_x=\tfrac12((u_t-u_x)^2+u^2)$、左端は $e+u_tu_x=\tfrac12((u_t+u_x)^2+u^2)$ です。従ってこれらを $F_R,F_L$ と置けば

$$
E'(t)+F_R(t)+F_L(t)=\int_{a(t)}^{b(t)}[fu_t+(1-V)uu_t]\,dx.
$$

右端の移動速度を $+1$ と誤ると平方完成の符号が逆になります。
<!-- solution-end -->

<a id="ex-hpde10-b02"></a>
### B2. 依存領域と影響範囲を取り違えない
- Level: B
- 問題：$\Sigma=\{t=0\}$、$S=\{(0,x):|x|\le2\}$ を考える。$p=(1,0)$、$q=(1,2)$ について、それぞれ $D^+(S)$ と $J^+(S)$ に属するか判定せよ。その違いを因果曲線の量化で説明せよ。

<!-- solution-start -->
**詳細解答**。[依存領域公式](../../../幾何系/LORG/LORG13/index.md#thm-lorg13-domain-formula)より $D^+(S)$ では $|x|+t\le2$ が必要十分です。$p$ では $0+1=1\le2$ なので属し、$q$ では $2+1=3>2$ なので属しません。

一方 $J^+(S)$ は $|x|\le2+t$ なので、$p$ も $q$ も属します。$p$ に至るどの過去非延長因果曲線も時刻零で $S$ と交わりますが、$q$ には時刻零で $x=3$ から光的直線で到達でき、これは $S$ を通りません。$J^+$ に必要なのは少なくとも一本の経路、$D^+$ に必要なのはすべての経路です。
<!-- solution-end -->

<a id="ex-hpde10-b03"></a>
### B3. 後から加えた源はどこへ伝わるか
- Level: B
- 問題：$\mathbb R^{1,1}$ の波動方程式 $u_{tt}-u_{xx}=f$ で、時刻零の初期変位・速度は零、$f$ は $\{1\le t\le2,\ |x|\le1\}$ に支持されるとする。時刻 $t=4$ で有限伝播から得られる支持上界を求め、初期支持だけを使ってはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**。源の点 $(\tau,y)$ から $(4,x)$ へ未来因果曲線がある必要条件は $|x-y|\le4-\tau$ です。$1\le\tau\le2$、$|y|\le1$ なので

$$
|x|\le|y|+|x-y|\le1+(4-\tau)\le4.
$$

従って時刻4の支持は $[-4,4]$ に含まれます。初期支持は空でも、時刻1以後の源が波を作れるため、$K_\Sigma$ だけの因果未来（空集合）を上界にすると誤ります。具体的な $f$ の支持が矩形全体に達していなければ、実際の上界はさらに小さくなり得ます。
<!-- solution-end -->

<a id="ex-hpde10-b04"></a>
### B4. 座標上の縮む領域は本当に流入しないか
- Level: B
- 問題：$g=-4\,dt^2+dx^2$ のMinkowski型計量で $\{0\le t\le1,\ |x|\le3(1-t)\}$ を考える。右側面の外向き共法線 $dF$ と $K=g^{-1}(dF,\cdot)$ を求め、側面が流入境界でないことを時間向きと二乗で説明せよ。

<!-- solution-start -->
**詳細解答**。右側面は $F=3t+x-3=0$、内側は $F\le0$ です。従って $dF=3\,dt+dx$ です。逆計量は $g^{tt}=-1/4$、$g^{xx}=1$ なので

$$
K=-\tfrac34\partial_t+\partial_x,\qquad
g(K,K)=-4(\tfrac34)^2+1=-\tfrac54<0.
$$

$\partial_t$ が未来向きなら $K$ の時刻成分は負で、$K$ は**過去向き時間的**です。物理的な光速度は $|dx/dt|=2$ で、領域の半径は毎秒3縮むため、補助境界は光速より速く内側へ進みます。これは[局所後方領域の補題](#lem-hpde10-local-cone)で使える非流入境界の例です。
<!-- solution-end -->

<a id="ex-hpde10-c01"></a>
### C1. 二解の一致からコンパクト支持の包含まで
- Level: C
- 問題：滑らかな大域双曲時空のnormally hyperbolic作用素 $P$ について、滑らかな二解 $u,v$ の初期変位と法線速度が同じコンパクト集合 $K_\Sigma$ の外でともに零、源 $f_u,f_v$ が同じコンパクト集合 $K_f$ の外で零であるとする。$w=u-v$ に対し、(i) 過去因果領域上の零条件、(ii) $w(p)=0$ の判定、(iii) $\operatorname{supp}w\subset J(K_\Sigma\cup K_f)$ の結論を順に示せ。また、この証明では解の存在を示していない理由を述べよ。

<!-- solution-start -->
**詳細解答**。(i) $K=K_\Sigma\cup K_f$ とおき、まず $p\in J^+(\Sigma)\setminus J^+(K)$ を取ります。$Q_p=J^-(p)\cap\Sigma$ の点 $q$ が $K_\Sigma$ に属すれば $q\le p$ より $p\in J^+(K)$ となり矛盾するため $Q_p\cap K_\Sigma=\varnothing$ です。同様に $C_p=J^-(p)\cap J^+(\Sigma)$ が $K_f$ と交われば、交点 $r\le p$ より $p\in J^+(K)$ で矛盾します。従って $C_p\cap K_f=\varnothing$ です。

(ii) $Pw=f_u-f_v$ であり、両解の初期データは $Q_p$ 上でともに零、源差は $C_p$ で零です。[因果的な依存評価](#thm-hpde10-causal-dependence)を $w$ に適用して $w(p)=0$ と分かります。$p\in J^-(\Sigma)\setminus J^-(K)$ についても時間反転で同様に零となります。

(iii) よって $w=0$ が $M\setminus J(K)$ に成立します。$K$ はコンパクトで、大域双曲性により $J(K)$ は閉です。従って補集合は開で、支持の定義から $\operatorname{supp}w\subset J(K)$ です。全過程で $u,v$ が滑らかに**存在すると仮定**してエネルギー法を適用しただけなので、任意の初期データから解を作ったことにはなりません。
<!-- solution-end -->

## 9. 次章へ：解の存在はまだ別問題

今回、初期データと源が与えられて**解が存在すれば**、離れた点へ光円錐を越えて影響できず、同じデータを持つ解は依存領域で一致すると証明しました。しかし、エネルギー不等式は与えられた解を評価するもので、解を作り出す道具そのものではありません。

次のHPDE11では、二階方程式を一次の対称双曲系へ還元し、近似解の構成・一様評価・極限を通じて局所Cauchy解の**存在**を示します。有限伝播はその局所解を重なりで一致させる際の鍵になります。
