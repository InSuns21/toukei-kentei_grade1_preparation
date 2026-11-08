# YAU1-05 連続性の方法と開性

## 1. 解を一つ知っている方程式から動かす

前章の[定数差一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)は「存在するなら一意」であって、まだ存在を与えない。そこで、既に解を知っている方程式を出発点とし、右辺を少しずつ目標まで変える。これが**連続性の方法**である。

以後、$X$ は複素次元 $n\ge1$ の境界のないコンパクト**連結**Kähler多様体、$\omega$ は固定Kähler形式とする。体積を $V=\int_X\omega^n>0$ と書く。与えられた $F\in C^\infty(X;\mathbb R)$ は、[体積整合条件](../YAU1-03/index.md#prop-yau1-03-compatibility)

$$
\int_X e^F\omega^n=V
$$

を満たすと仮定する。目標は、[許容Kählerポテンシャル](../YAU1-03/index.md#def-yau1-03-positive-domain) $\varphi$ に対する $\omega_\varphi^n=e^F\omega^n$ である。

出発点の $\varphi=0$ は $\omega_0=\omega$ を与える。右辺密度を $1$ から $e^F$ へ直線的に動かせば、各時刻で体積が保存され、しかも密度の正値性が残る。この二つを同時に満たさないパスでは、後で線形Poisson方程式を解く際に障害が現れる。

ここでは解 $\varphi$ の定数を固定するため、[前章の平均ゼロ規格化](../YAU1-04/index.md#def-yau1-04-mean-zero)を用いる。**右辺の積分を合わせる操作**と**未知関数の平均を零にする操作**は独立である。

<a id="def-yau1-05-path"></a>

<!-- formal-statement-start -->
> **定義（体積正規化された連続性のパスと可解集合）**  
> 上記の $X,\omega,F$ に対し、$0\le t\le1$ で正の関数 $\rho_t$ と方程式を

$$
\rho_t=(1-t)+te^F,\qquad
\omega_{\varphi_t}^n=\rho_t\omega^n,\qquad
\int_X\varphi_t\omega^n=0,\quad\omega_{\varphi_t}>0
$$

> と定める。ここで $\omega_\varphi=\omega+i\partial\bar\partial\varphi$ である。この方程式に許容解が存在する $t$ の集合を、対象の関数クラスを指定した **可解集合** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-05-path -->
**定義の確認**（平坦楕円曲線）。$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$ とし、$0<|a|<1$、$e^F=1-a\cos(2\pi x)$ とする。$e^F>0$ は $|a|<1$ から従い、$\int_0^1\cos(2\pi x)\,dx=0$ により体積が一致する。このとき

$$
\rho_t=1-ta\cos(2\pi x),\qquad
\varphi_t=\frac{ta}{\pi^2}\cos(2\pi x)
$$

が実際の解である。$\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ を使うと

$$
\partial_z\partial_{\bar z}\varphi_t=-ta\cos(2\pi x),\qquad
\omega_{\varphi_t}=\rho_t\omega_0>0.
$$

$\int_T\varphi_t\omega_0=0$ も周期積分で確かめられる。こうして、滑らかさ・正値・方程式・平均ゼロというすべての条件を直接検証できた。
<!-- definition-example-end -->

<a id="prop-yau1-05-path-compatibility"></a>

<!-- formal-statement-start -->
> **命題（連続性のパスの体積・正値整合性）**  
> 境界のないコンパクト連結Kähler多様体 $(X,\omega)$ と、体積整合条件を満たす滑らかな実関数 $F$ を取る。このとき、上の $\rho_t$ は $t\in[0,1]$ で滑らか、正値であり、次の等式を満たす。

$$
\int_Xe^F\omega^n=V,\qquad
\int_X\rho_t\omega^n=V.
$$

> また $t=0$ には平均ゼロの解 $\varphi_0=0$ がある。
<!-- formal-statement-end -->

### 証明の見取り図

点ごとの正値性は二つの正数を非負の係数で平均することで、積分は線形性で確かめる。端点 $t=0$ の解は基準計量自身である。

<!-- proof-start -->
### 証明

$e^F(x)>0$ は各 $x$ で成立し、$0\le t\le1$ に対して $(1-t),t\ge0$ で和は $1$ だから

$$
\rho_t(x)=(1-t)\cdot1+t\cdot e^{F(x)}>0.
$$

また積分を別々に行えば

$$
\int_X\rho_t\omega^n
=(1-t)\int_X\omega^n+t\int_Xe^F\omega^n
=(1-t)V+tV=V.
$$

$t=0$ では $\rho_0=1$、$\partial\bar\partial0=0$ より $\omega_{\varphi_0}=\omega>0$、$\int_X0\,\omega^n=0$。従ってすべての条件を満たす。$\square$
<!-- proof-end -->

**開性と閉性は別である。** $0$ が可解集合に属し、その集合が区間 $[0,1]$ の中で開であるだけでは、$1$ まで到達できない。たとえば $[0,1/2)$ は $[0,1]$ 内で開で、$0$ を含むが $1$ を含まない。後続の事前評価と極限論法が閉性を担う。

## 2. なぜ対数作用素をそのまま平均ゼロへ写せないか

[前章の線形化](../YAU1-03/index.md#prop-yau1-03-linearization)は、正値計量 $\omega_\varphi$ に対して

$$
D\mathcal M_\omega|_\varphi(v)
=g_\varphi^{j\bar k}v_{j\bar k}
=\frac12\Delta_{\omega_\varphi}v
$$

であった（繰り返し添字は和）。$\Delta_{\omega_\varphi}$ は非正の実Laplacianである。定数 $v$ が核になることは[核の命題](../YAU1-04/index.md#prop-yau1-04-kernel)で確かめた。

しかし、$L_\varphi v=\frac12\Delta_{\omega_\varphi}v$ の像は、一般には**変動する体積** $\omega_\varphi^n$ に関して平均零となる。すなわち

$$
\int_X L_\varphi v\,\omega_\varphi^n=0
$$

であって、固定した $\omega^n$ に関する $\int_X L_\varphi v\,\omega^n=0$ ではない。この違いを消すため、対数を取る前の**体積密度**

$$
Q(\varphi):=\frac{\omega_\varphi^n}{\omega^n}
$$

を使う。これは局所正則座標で $Q(\varphi)=\det(G+(\varphi_{j\bar k}))/\det G$ という正の実関数になる。[体積差のStokes計算](../YAU1-03/index.md#prop-yau1-03-compatibility)より、どの許容 $\varphi$ でも

$$
\int_X Q(\varphi)\omega^n=V.
$$

したがって $Q(\varphi)-\rho_t$ は、**あらかじめ固定した体積形式** $\omega^n$ に関して必ず平均零である。この構成なら、右辺の平均零条件と線形化の値域が自然に一致する。

## 3. 関数空間を定め、正値性を開条件にする

陰関数定理は、関数の集合にノルムを入れて完備にした **Banach空間** で適用する。有限次元の[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)と同じ発想だが、そこから無限次元版を無条件には引用できない。以下では必要な局所版を証明する。

実次元を $d=2n$、整数 $s=d+1$ とする。$H^k(X;\mathbb R)$ は、有限個の滑らかな座標と分割関数で、すべての弱微分 $|\alpha|\le k$ の $L^2$ ノルムの和から定まるSobolev空間である。[GA2の多様体Sobolev空間と完備性](../../GA/GA2/index.md#thm-ga2-complete-density)の高階版であり、異なる有限座標系のノルムは同値である。$\int_Xu\omega^n$ は連続な線形汎関数だから、その核は閉じている。

<a id="def-yau1-05-fixed-spaces"></a>

<!-- formal-statement-start -->
> **定義（固定平均ゼロSobolev空間と正値開領域）**  
> 上記の $(X,\omega)$ と $s=2n+1$ に対し、実Banach空間を

$$
E=\left\{u\in H^{s+2}(X;\mathbb R):
\int_Xu\,\omega^n=0\right\},\qquad
Y=\left\{h\in H^s(X;\mathbb R):
\int_Xh\,\omega^n=0\right\}
$$

> とする。さらに $E$ 内の領域を

$$
U=\{u\in E:\omega+i\partial\bar\partial u>0\}
$$

> と定める。$U$ の各元では正値性を連続な二階微分の意味で解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-05-fixed-spaces -->
**定義の確認**。前節の平坦楕円曲線で $s=3$ とする。$\varphi_t=ta\cos(2\pi x)/\pi^2$ は滑らかなので $H^5(T)$ に属し、周期積分が零だから $E$ に属する。$|ta|<1$ なら

$$
1-ta\cos(2\pi x)\ge 1-|ta|>0
$$

より正値で、$\varphi_t\in U$ である。一方、定数 $7$ は $H^5$ に属し、計量の正値性も壊さないが、$\int_T7\omega_0=7V\ne0$ なので $E$ には属さない。所属条件と正値条件を混同していない。
<!-- definition-example-end -->

$s+2>d/2+2$ だから、座標ごとのSobolev埋め込みにより $H^{s+2}\hookrightarrow C^2$ は連続である。$u\in U$ に対し正値行列 $G_u$ の最小固有値は $X$ のコンパクト性から座標で局所的な正の下限を持ち、有限個の座標で正の下限を選べる。$H^{s+2}$ 距離が十分小さい $v$ では $D^2v$ が一様に小さいため、$G_{u+v}$ も正値となる。従って $U$ は $E$ の開集合である。

<a id="lem-yau1-05-sobolev-product"></a>

<!-- formal-statement-start -->
> **補題（高階Sobolev空間の積と体積密度写像の微分可能性）**  
> $X$ を実次元 $d$ の滑らかなコンパクト多様体、$s=d+1$ とする。$H^s(X)$ は関数の積について閉じ、定数 $C$ が存在して

$$
\|fg\|_{H^s}\le C\|f\|_{H^s}\|g\|_{H^s}
$$

> が成り立つ。特に上の $U$ 上の体積密度写像 $Q:U\to H^s(X;\mathbb R)$ は $C^1$ 級である。
<!-- formal-statement-end -->

### 証明の見取り図

$s>d$ と大きめに選ぶことで、積の微分に現れる二つの因子のうち、低階微分の方を $L^\infty$ で制御できる。行列式は二階微分成分の有限個の積なので、積の評価から微分可能性が従う。

<!-- proof-start -->
### 証明

有限個の座標と分割関数により、まず有界な座標球の滑らかな関数で示せばよい。$|\alpha|\le s$ のLeibniz公式は

$$
D^\alpha(fg)
=\sum_{\beta\le\alpha}{\alpha\choose\beta}
(D^\beta f)(D^{\alpha-\beta}g).
$$

各項では $|\beta|\le\lfloor s/2\rfloor$ または $|\alpha-\beta|\le\lfloor s/2\rfloor$ の少なくとも一方が成り立つ。前者なら $D^\beta f\in H^{s-|\beta|}$ で、$s-|\beta|\ge\lceil s/2\rceil>d/2$ だから、局所Sobolev埋め込みで

$$
\|D^\beta f\,D^{\alpha-\beta}g\|_{L^2}
\le \|D^\beta f\|_{L^\infty}
\|D^{\alpha-\beta}g\|_{L^2}
\le C\|f\|_{H^s}\|g\|_{H^s}.
$$

後者は $f,g$ を交換して同じ評価を使う。有限個の微分と有限個の座標球で和を取れば主張を得る。滑らかな関数の密度から $H^s$ 全体へ拡張できる。

$u\in U$ の二階微分は $H^s$ に属し、滑らかな $G$ の成分との和も $H^s$ に属する。局所的に

$$
\det(G+D^2_{\mathbb C}(u+v))
=\det(G+D^2_{\mathbb C}u)
+\sum_{j,k}\operatorname{cof}_{j\bar k}(G_u)\,v_{j\bar k}
+R_u(v)
$$

と多項式展開できる。余因子も $H^s$ の積であり、$R_u(v)$ は少なくとも二つの $D^2v$ を含むので、$v$ が小さいとき

$$
\|R_u(v)\|_{H^s}\le C_u\|v\|_{H^{s+2}}^2.
$$

$\det G$ は滑らかで正だから、これで $Q$ の[Fréchet微分](../../../解析系/F0/F0-02C3/index.md#def-f0-02c3-frechet-derivative)の存在が示される。余因子の係数は $u$ に連続に依存するため導関数も連続であり、$Q$ は $C^1$ 級である。$\square$
<!-- proof-end -->

## 4. 正しい値域を持つ非線形写像の線形化

$E,Y,U$ を前節の空間とし、$t$ を実数として、次の写像を考える。$\rho_t$ は実数 $t$ についても滑らかに定義でき、$t_0\in[0,1]$ の十分近くではコンパクト性と $\rho_{t_0}>0$ により正値のままである。

$$
\Phi:U\times\mathbb R\longrightarrow Y,\qquad
\Phi(u,t)=Q(u)-\rho_t.
$$

$Q(u)$ と $\rho_t$ はともに固定測度 $\omega^n$ に関して積分が $V$ なので、$\Phi(u,t)\in Y$ である。$Q$ は[前節の補題](#lem-yau1-05-sobolev-product)から $C^1$、$\rho_t$ は $t$ の一次式だから $\Phi$ も $C^1$ である。

<a id="prop-yau1-05-density-linearization"></a>

<!-- formal-statement-start -->
> **命題（体積密度写像の線形化と固定平均零性）**  
> 上記の $U,E,Y$ について、任意の $u\in U$ と $v\in E$ で $\Phi$ の $u$ 方向のFréchet微分は

$$
D_u\Phi(u,t)v
=Q(u)\sum_{j,k}g_u^{j\bar k}v_{j\bar k}
=\frac{Q(u)}2\Delta_{\omega_u}v
$$

> と表せる。この値は $Y$ に属し、$\partial_t\Phi(u,t)=-(e^F-1)$ である。線形化は局所座標の選択によらない。
<!-- formal-statement-end -->

### 証明の見取り図

前章の対数微分に密度 $Q(u)$ を掛けると行列式の微分になる。固定平均零性は、各 $u$ に対する体積一定の恒等式を方向微分して得る。

<!-- proof-start -->
### 証明

$G_u=(g_{j\bar k}+u_{j\bar k})$ とし、$u+\varepsilon v\in U$ となる小さい $\varepsilon$ を取る。[Jacobiの行列式微分公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)から

$$
\left.\frac{d}{d\varepsilon}\right|_0
\frac{\det(G_u+\varepsilon D^2_{\mathbb C}v)}{\det G}
=\frac{\det G_u}{\det G}
\operatorname{tr}(G_u^{-1}D^2_{\mathbb C}v).
$$

右辺は $Q(u)\sum g_u^{j\bar k}v_{j\bar k}$ であり、[対数作用素の線形化](../YAU1-03/index.md#prop-yau1-03-linearization)の実Laplacian規約 $\Delta_{\omega_u}=2\sum g_u^{j\bar k}\partial_j\partial_{\bar k}$ と一致する。余因子の多項式展開による $H^s$ の余剰項評価は[前節の補題](#lem-yau1-05-sobolev-product)で示したため、これは単なる点ごとの方向微分でなくFréchet微分である。

さらに [体積不変の公式](../YAU1-03/index.md#prop-yau1-03-compatibility)は $u+\varepsilon v\in U$ の全てで

$$
\int_XQ(u+\varepsilon v)\omega^n=V
$$

を与える。$H^s\to\mathbb R$ の積分汎関数は連続なので方向微分と交換でき、

$$
\int_X D_u\Phi(u,t)v\,\omega^n
=\left.\frac{d}{d\varepsilon}\right|_0 V=0.
$$

したがって線形化は $Y$ へ写る。$-\rho_t=-1-t(e^F-1)$ を微分すれば $-(e^F-1)$ となり、その積分も体積整合条件から零である。$\square$
<!-- proof-end -->

**重要な測度の変換。** $Q(u)\omega^n=\omega_u^n$ なので、線形化を $L_uv=h$ と書くと

$$
L_uv:=\frac{Q(u)}2\Delta_{\omega_u}v=h
\quad\Longleftrightarrow\quad
\frac12\Delta_{\omega_u}v=\frac{h}{Q(u)}.
$$

右辺の可解条件は $\int_X(h/Q(u))\omega_u^n=\int_Xh\omega^n=0$。ここでは**密度による割り算と測度変換が打ち消し合う**。単に「$h$ が平均ゼロだからPoisson方程式は解ける」とするのは、異なる測度を混同した誤りである。

## 5. 核だけでなく全射性まで：線形化を同型にする

微分 $L_u$ が定数を消すことだけでは、無限次元の陰関数定理は使えない。指定された**すべての** $h\in Y$ に対し $L_uv=h$ を解き、さらに逆写像が有界である必要がある。

<a id="thm-yau1-05-poisson-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（変動体積を用いる線形化の同型）**  
> $(X,\omega)$ を境界のないコンパクト連結Kähler多様体、$s=2n+1$ とし、$u\in U$ が**滑らか**であるとする。このとき

$$
L_u:E\longrightarrow Y,\qquad
L_uv=\frac{Q(u)}2\Delta_{\omega_u}v
$$

> は有界な実線形同型であり、逆写像 $L_u^{-1}:Y\to E$ も有界である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の固定平均ゼロ $h$ を、変動体積について平均ゼロとなる $2h/Q(u)$ へ移す。[GA3のPoisson存在一意性](../../GA/GA3/index.md#thm-ga3-poisson-existence)と[局所高階正則性](../../GA/GA3/index.md#thm-ga3-local-regularity)で解を作り、最後に固定測度で平均を引く。核は定数なので一意性が得られる。

<!-- proof-start -->
### 証明

**全射性。** $h\in Y$ を任意に取る。$Q(u)$ は滑らかで正、かつコンパクト性により $1/Q(u)$ は滑らかで有界だから、$f=-2h/Q(u)\in H^s(X)$ である。変動計量の体積形式は $dV_{\omega_u}=\omega_u^n/n!$ なので、

$$
\int_X f\,dV_{\omega_u}
=-\frac2{n!}\int_X\frac{h}{Q(u)}
\omega_u^n
=-\frac2{n!}\int_Xh\omega^n=0.
$$

$(X,\omega_u)$ は滑らかなコンパクト連結・境界なしRiemann多様体なので、[GA3のPoisson存在定理](../../GA/GA3/index.md#thm-ga3-poisson-existence)を次の方程式へ適用できる。

$$
-\Delta_{\omega_u}w=f.
$$

このとき $w\in H^1$ の弱解が存在する。[GA3の局所正則性定理](../../GA/GA3/index.md#thm-ga3-local-regularity)には、外力が $H^s$ に属し、計量が滑らかという条件を代入する。よって $w\in H^{s+2}_{\mathrm{loc}}$。有限個の座標で覆えるコンパクト $X$ では $w\in H^{s+2}(X)$ と結論できる。

固定体積での平均を $c=V^{-1}\int_Xw\omega^n$ と置き、$v=w-c$ とすれば $v\in E$ で $\Delta_{\omega_u}c=0$。従って

$$
\frac12\Delta_{\omega_u}v=\frac{h}{Q(u)},\qquad
L_uv=h.
$$

**単射性。** $L_uv=0$ なら $Q(u)>0$ より $\Delta_{\omega_u}v=0$。$s+2>d/2+2$ なので $v$ は少なくとも $C^2$ で、[GA3の調和関数の定数性](../../GA/GA3/index.md#prop-ga3-harmonic-constant)から $v=c$。固定平均ゼロ $\int_Xv\omega^n=0$ を使うと $cV=0$、すなわち $v=0$。

**有界性。** $L_u$ は滑らかな係数を持つ二階作用素であり、各座標で積と微分の標準評価から $\|L_uv\|_{H^s}\le C_u\|v\|_{H^{s+2}}$。$E,Y$ はBanach空間だから、全単射を示した $L_u$ に[FA2の有界逆定理](../../../解析系/FA/FA2/index.md#thm-fa2-bounded-inverse)を適用できる。従って $\|L_u^{-1}h\|_{H^{s+2}}\le C'_u\|h\|_{H^s}$ となる。$\square$
<!-- proof-end -->

**正規化の位置。** $w$ はいったん $\omega_u^n$ に関する平均ゼロで作ってよいが、必要な $v$ は $\omega^n$ に関して平均ゼロである。両者の平均との差は一般に定数であるため、Poisson方程式を壊さずに代表を取り直せる。$h$ を変動測度で平均ゼロと要求してはいない。

## 6. 無限次元でも働く局所陰関数の論法

有限次元の[逆関数定理の縮小写像の構成](../../../基礎科目/RA/RA6A/index.md#lem-ra6a-contraction)を、Banach空間の完備性を用いて書き直す。未知関数の微分が同型であるなら、その逆を使って非線形方程式を $T(u)=u$ という形に変えられる。

<a id="lem-yau1-05-banach-ift"></a>

<!-- formal-statement-start -->
> **補題（Banach空間の局所陰関数補題）**  
> $E,Y$ を実Banach空間、$U\subset E$ を開集合、$I\subset\mathbb R$ を開区間とし、$\Psi:U\times I\to Y$ を $C^1$ 級とする。$\Psi(u_0,t_0)=0$ かつ $A=D_u\Psi(u_0,t_0):E\to Y$ が有界線形同型で有界逆を持つなら、$t_0$ の近くの全ての $t$ に対して $u_0$ の近くにただ一つの解 $u(t)\in U$ が存在し、$t\mapsto u(t)$ は $C^1$ 級である。さらに

$$
u'(t)=-[D_u\Psi(u(t),t)]^{-1}
\partial_t\Psi(u(t),t)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$T_t(u)=u-A^{-1}\Psi(u,t)$ を作り、$D_uT_{t_0}(u_0)=0$ を使って十分小さい球では縮小写像とする。パラメータを動かしても球が自分自身へ写るよう調整し、反復列の極限で $T_t(u)=u$ を満たす点を得る。解が満たす $\Psi(u(t),t)=0$ を微分して変化率を求める。

<!-- proof-start -->
### 証明

$U$ の開性と $D_u\Psi$ の連続性から、ある $r>0$ と $\delta>0$ を選び、閉球 $\overline B_r(u_0)\subset U$、$|t-t_0|<\delta$ で

$$
\left\|I_E-A^{-1}D_u\Psi(u,t)\right\|_{\mathcal L(E)}
\le\frac12,\qquad
\|A^{-1}\Psi(u_0,t)\|_E\le\frac r2
$$

とできる。第二式は $\Psi(u_0,t_0)=0$ と $t$ についての連続性から従う。$T_t(u)=u-A^{-1}\Psi(u,t)$ と置くと、Banach空間値の線分積分（微積分の基本定理）により、球の任意の $u,v$ で

$$
\|T_t(u)-T_t(v)\|_E
\le\sup_{0\le\theta\le1}
\|D_uT_t(v+\theta(u-v))\|
\|u-v\|_E\le\frac12\|u-v\|_E.
$$

特に

$$
\|T_t(u)-u_0\|_E
\le\|T_t(u)-T_t(u_0)\|_E
+\|T_t(u_0)-u_0\|_E
\le\tfrac r2+\tfrac r2=r.
$$

従って閉球は $T_t$ に保たれる。$u^{(0)}=u_0$、$u^{(m+1)}=T_t(u^{(m)})$ と反復すると、

$$
\|u^{(m+1)}-u^{(m)}\|_E
\le2^{-m}\|u^{(1)}-u^{(0)}\|_E.
$$

差の級数が収束するので、完備性から $u^{(m)}\to u(t)$。$T_t$ の連続性から $T_t(u(t))=u(t)$、従って $\Psi(u(t),t)=0$。別の解 $T_t(v)=v$ があれば $\|u(t)-v\|\le\frac12\|u(t)-v\|$ となるので、一意である。

次に $D_u\Psi(u,t)=A(I_E-B)$、$\|B\|\le1/2$ と置ける。作用素の等比級数は $\|B^m\|\le2^{-m}$ によりノルム収束し、

$$
(I_E-B)\sum_{m=0}^N B^m
=\sum_{m=0}^N B^m(I_E-B)
=I_E-B^{N+1}\longrightarrow I_E
$$

となるので、$I_E-B$ は有界な逆を持つ。パラメータを $h$ だけ動かした二解の差は、上の縮小評価から

$$
\|u(t+h)-u(t)\|_E
\le2\|A^{-1}[\Psi(u(t),t+h)-\Psi(u(t),t)]\|_E
=O(|h|).
$$

$\Psi(u(t+h),t+h)-\Psi(u(t),t)=0$ をFréchet一次近似し、$h$ で割って $h\to0$ とすると

$$
D_u\Psi(u(t),t)\,u'(t)+\partial_t\Psi(u(t),t)=0
$$

を得る。逆写像の連続性と $\Psi$ の $C^1$ 性から右辺の微分式も連続である。$\square$
<!-- proof-end -->

## 7. 解の存在を近くのパラメータへ運ぶ

まず「何の開性か」を正確に指定する。$E,U$ は第3節のものとし、

$$
\mathcal S_s
=\{t\in[0,1]:\text{ある }u\in U
\text{ が }Q(u)=\rho_t\text{ を満たす}\}
$$

とする。この段階では $H^{s+2}$ 解を対象にする。**滑らかな解の全パラメータでの存在**は、後続の正則性を伴う閉性論証と最後に接続する。ここで必要なのは、既存解の近くで方程式が解き続けられることである。

先ほどの[線形同型定理](#thm-yau1-05-poisson-isomorphism)は滑らかな基点で証明した。$H^{s+2}$ 基点にも適用するため、次の正則性の事実を確認しておく。

**局所正則性の補足。** $u\in U$ が $Q(u)=\rho_t$ を満たし、$\rho_t$ が滑らかで正なら $u$ は滑らかである。実際、$s=d+1$ から $G_u$ は少なくとも $C^1$ で一様正値、$G_u^{-1}$ は $H^s$ に属する。局所実座標方向 $\partial_\ell$ で $\log\det G_u-\log\det G=\log\rho_t$ を弱微分すると

$$
g_u^{j\bar k}(\partial_\ell u)_{j\bar k}
=\partial_\ell\log\rho_t
+\operatorname{tr}(G^{-1}\partial_\ell G)
-\operatorname{tr}(G_u^{-1}\partial_\ell G).
$$

右辺は $H^s$、左辺の二階係数は $H^s\subset C^1$ で一様楕円型である。局所実座標でその作用素を $a^{pq}\partial_p\partial_qw$ と書き、$w=\partial_\ell u$ とする。発散形への書き直しは

$$
a^{pq}\partial_p\partial_qw
=\partial_p(a^{pq}\partial_qw)
-(\partial_pa^{pq})\partial_qw.
$$

係数は $C^1$、$w\in H^{s+1}$ なので最後の項は $L^2$ である。[GPDE9の内部 $H^2$ 評価](../../../解析系/GPDE/GPDE9/index.md#thm-gpde9-lipschitz-coefficient-h2)をまず適用できる。さらに $|\alpha|=m\le s$ の差分商で微分すると、最高次の未知項以外は

$$
a^{pq}\partial_p\partial_qD^\alpha w
=D^\alpha f_\ell
-\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
(D^\beta a^{pq})\partial_p\partial_qD^{\alpha-\beta}w
$$

の和となる（$f_\ell$ は上の一次微分方程式の右辺）。各和の $w$ の微分次数は $m-|\beta|+2\le m+1$ で、帰納的に既知である。係数微分との積は[第3節のSobolev積評価](#lem-yau1-05-sobolev-product)を作ったのと同じLeibnizと局所埋め込みで $L^2$ に抑えられる。したがって内部 $H^2$ 評価を $D^\alpha w$ に繰り返すと $w\in H^{s+2}_{\mathrm{loc}}$、つまり $u\in H^{s+3}_{\mathrm{loc}}$ を得る。

すると $G_u^{-1}$ の係数にも一階高い正則性が戻るので、この議論を反復して $u\in H^m_{\mathrm{loc}}$ を任意の $m$ について得る。有限個の座標とSobolev埋め込みから $u\in C^\infty(X)$ となる。ここで正値性による一様楕円性は**一つの固定解**について保たれている。後の章で必要な、パラメータ列にわたる一様な事前評価とは異なる。

<a id="thm-yau1-05-openness"></a>

<!-- formal-statement-start -->
> **定理（連続性の方法における可解集合の開性）**  
> $(X,\omega)$ を境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X;\mathbb R)$ を $\int_Xe^F\omega^n=V$ を満たす関数とする。$s=2n+1$、$E,U$ を[固定平均ゼロSobolev空間と正値開領域](#def-yau1-05-fixed-spaces)とし、上記 $\mathcal S_s$ を取る。このとき
>
> 1. $0\in\mathcal S_s$ である。
> 2. $\mathcal S_s$ は区間 $[0,1]$ の中で開である。
> 3. $t_0\in\mathcal S_s$ の任意の解 $u_0$ の近くには $C^1$ 級の局所解枝 $t\mapsto u_t$ があり、

$$
\frac{Q(u_t)}2\Delta_{\omega_{u_t}}\dot u_t=e^F-1,\qquad
\int_X\dot u_t\omega^n=0
$$

> が成り立つ。これらの結論だけでは $1\in\mathcal S_s$ はまだ導けない。
<!-- formal-statement-end -->

### 証明の見取り図

$t=0$ の解を直接確認する。$t_0$ の解は局所正則性により滑らかなので、[線形化の同型](#thm-yau1-05-poisson-isomorphism)が使える。[Banach空間の局所陰関数補題](#lem-yau1-05-banach-ift)で隣のパラメータへ解を延長する。

<!-- proof-start -->
### 証明

[パスの体積・正値整合性](#prop-yau1-05-path-compatibility)により $t=0$ の解は $u_0=0\in U$。よって $0\in\mathcal S_s$ である。

任意の $t_0\in\mathcal S_s$ を取り、解 $u_0\in U$ を選ぶ。局所正則性の補足から $u_0$ は滑らかで、$Q(u_0)=\rho_{t_0}$ を満たす。第4節で確認した通り $\Phi:U\times\mathbb R\to Y$ は $C^1$ で、$\Phi(u_0,t_0)=0$ である。さらに

$$
D_u\Phi(u_0,t_0)=L_{u_0}:E\longrightarrow Y
$$

は[変動体積の同型定理](#thm-yau1-05-poisson-isomorphism)による有界な同型である。そこで[局所陰関数補題](#lem-yau1-05-banach-ift)を $E,Y,U,\Phi$ へ適用する。ある $\varepsilon>0$ が存在して、$|t-t_0|<\varepsilon$ なら $u_t\in U$ で $\Phi(u_t,t)=0$ となる解が存在し、$t\mapsto u_t$ は $C^1$ である。$t$ を $[0,1]$ と交差させれば、$\mathcal S_s$ が相対開集合であることが従う。

最後に $\Phi(u_t,t)=0$ を $t$ で微分すると、[線形化公式](#prop-yau1-05-density-linearization)から

$$
0=D_u\Phi(u_t,t)\dot u_t+\partial_t\Phi(u_t,t)
=\frac{Q(u_t)}2\Delta_{\omega_{u_t}}\dot u_t-(e^F-1).
$$

また各 $u_t\in E$ の平均は零なので、連続線形な積分汎関数を微分して $\int_X\dot u_t\omega^n=0$。この微分式の右辺は $\omega^n$ で平均零であり、左辺を $Q(u_t)$ で割って $\omega_{u_t}^n$ に移すと、Poissonの積分条件とも一致する。$\square$
<!-- proof-end -->

## 8. どの仮定が何を守るか

1. **体積整合がない場合。** $F\equiv\log2$ とすると $\int e^F\omega^n=2V$。$\rho_t=1+t$ で $\int\rho_t\omega^n=(1+t)V$ だから $t>0$ では固定Kähler類の体積 $V$ と両立しない。$\Phi$ の値域を $Y$ に置けず、単に微分が可逆だからと存在を主張できない。
2. **正値境界の場合。** 楕円曲線の $1-ta\cos2\pi x$ で $|ta|=1$ になるとある点で密度が零、$G_u^{-1}$ が定義できず一様楕円性と局所陰関数定理の適用が止まる。今回は $|a|<1$、$0\le t\le1$ なので境界に達しないが、一般の可解集合の極限で同じ安全性があるとは限らない。
3. **非連結の場合。** 各連結成分でPoissonの積分条件が別々に必要で、核も各成分の定数からなる。全体で平均ゼロにする条件一つでは核を除けず、[単射性の証明](#thm-yau1-05-poisson-isomorphism)が失敗する。
4. **閉性を仮定してしまう場合。** $\Phi$ の微分が各既存解で同型であることは局所情報であり、パラメータ列 $t_k\to t_\ast$ に対し解の $H^{s+2}$ ノルムや正値下限を一様に制御しない。後続の $C^0$、二階、三階評価と正則性がここを埋める。

## 9. 演習：開性の証明を各段階から再構成する

<a id="ex-yau1-05-a01"></a>

### Level A — YAU1-05-A01：正規化した直線パス
- Level: A

$X,\omega,F$ は第1節の条件を満たすとする。$\rho_t=1+t(e^F-1)$ について正値性・積分・端点の3条件を示せ。

<!-- solution-start -->
**詳細解答。** $0\le t\le1$ なら $\rho_t=(1-t)\cdot1+t\cdot e^F$。各点で $1,e^F>0$ だから正値である。積分は

$$
\int_X\rho_t\omega^n=(1-t)V+t\int_Xe^F\omega^n
=(1-t)V+tV=V.
$$

端点では $\rho_0=1$、$\rho_1=e^F$。これで開始方程式と目標方程式を結ぶ。
<!-- solution-end -->

<a id="ex-yau1-05-a02"></a>

### Level A — YAU1-05-A02：楕円曲線の解枝
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$e^F=1-a\cos(2\pi x)$（$|a|<1$）とする。全ての $t\in[0,1]$ について平均ゼロ解と、その $t$ 微分を求めよ。

<!-- solution-start -->
**詳細解答。** $\rho_t=1-ta\cos2\pi x$。二階微分 $\partial_z\partial_{\bar z}(\cos2\pi x)=-\pi^2\cos2\pi x$ から

$$
u_t=\frac{ta}{\pi^2}\cos2\pi x,\qquad
(u_t)_{z\bar z}=-ta\cos2\pi x
$$

とすれば $\omega_{u_t}=\rho_t\omega_0$。$1-|ta|>0$ で正値、周期積分により平均零である。微分は

$$
\dot u_t=\frac a{\pi^2}\cos2\pi x,\qquad
\frac{Q(u_t)}2\Delta_{\omega_{u_t}}\dot u_t
=\partial_z\partial_{\bar z}\dot u_t=-a\cos2\pi x=e^F-1.
$$

最後の等式では複素一次元なので $Q(u_t)g_{u_t}^{z\bar z}=1$ を使った。
<!-- solution-end -->

<a id="ex-yau1-05-a03"></a>

### Level A — YAU1-05-A03：変動平均と固定平均
- Level: A

$Q>0$、$\omega_u^n=Q\omega^n$ とする。$\int_Xh\omega^n=0$ のとき $f=h/Q$ が満たす積分条件を示せ。また、一般には $\int_Xh\omega_u^n=0$ と結論できない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 体積形式を代入すると

$$
\int_X f\omega_u^n
=\int_X\frac hQ\,Q\omega^n
=\int_Xh\omega^n=0.
$$

しかし $h$ 自体を積分すると $\int_Xh\omega_u^n=\int_XhQ\omega^n$ であり、$Q$ は一般に定数ではない。たとえば楕円曲線で $h=\cos2\pi x$、$Q=1-a\cos2\pi x$ とすると固定平均は零だが

$$
\int_T hQ\omega_0
=-2a\int_0^1\cos^2(2\pi x)\,dx=-a,
$$

で $a\ne0$ なら零でない。
<!-- solution-end -->

<a id="ex-yau1-05-a04"></a>

### Level A — YAU1-05-A04：体積密度の行列式微分
- Level: A

複素二次元で $G=I_2$、$G_u=\operatorname{diag}(p,q)$（$p,q>0$）、$D^2_{\mathbb C}v=\operatorname{diag}(b,c)$ とする。$DQ_u(v)$ と $Q(u)\operatorname{tr}(G_u^{-1}D^2_{\mathbb C}v)$ を別々に計算せよ。

<!-- solution-start -->
**詳細解答。** $Q(u)=pq$ で、変動後の密度は

$$
Q(u+\varepsilon v)=(p+\varepsilon b)(q+\varepsilon c)
=pq+\varepsilon(bq+pc)+\varepsilon^2bc.
$$

ゆえに $DQ_u(v)=bq+pc$。一方 $G_u^{-1}=\operatorname{diag}(1/p,1/q)$ だから

$$
Q(u)\operatorname{tr}(G_u^{-1}D^2_{\mathbb C}v)
=pq\left(\frac bp+\frac cq\right)=bq+pc
$$

で一致する。微分の余剰項は $\varepsilon^2bc$ である。
<!-- solution-end -->

<a id="ex-yau1-05-a05"></a>

### Level A — YAU1-05-A05：固定ゲージの効果
- Level: A

$u\in H^{s+2}(X)$ について $u-c$ の $\omega^n$ 平均が零になる定数 $c$ を求め、$Q(u-c)=Q(u)$ を示せ。$\omega_u^n$ 平均を引く場合とどう違うか。

<!-- solution-start -->
**詳細解答。** $0=\int_X(u-c)\omega^n=\int_Xu\omega^n-cV$ を解いて

$$
c=\frac1V\int_Xu\omega^n
$$

を得る。$\partial\bar\partial c=0$ だから $\omega_{u-c}=\omega_u$、従って $Q(u-c)=Q(u)$。変動平均を引くと $c'=V^{-1}\int_Xu\omega_u^n$ となり、一般には $c'\ne c$ である。どちらも定数変更なので方程式は保つが、定義域 $E$ を指定するのは固定平均の $c$ である。
<!-- solution-end -->

<a id="ex-yau1-05-b01"></a>

### Level B — YAU1-05-B01：Poisson逆写像を構成する
- Level: B

滑らかな許容 $u$ と、$h\in Y$ を与える。$L_uv=h$ を $v\in E$ で解く手順を、外力・体積測度・正規化・一意性の順に記せ。

<!-- solution-start -->
**詳細解答。** まず $f=-2h/Q(u)$ と置く。$Q(u)>0$ が滑らかなので $f\in H^s$。$\omega_u^n=Q(u)\omega^n$ から

$$
\int_Xf\,dV_{\omega_u}
=-\frac2{n!}\int_Xh\,\omega^n=0.
$$

コンパクト連結・境界なしの $(X,\omega_u)$ で[GA3のPoisson存在定理](../../GA/GA3/index.md#thm-ga3-poisson-existence)を適用し、$-\Delta_{\omega_u}w=f$ を解く。さらに[高階正則性](../../GA/GA3/index.md#thm-ga3-local-regularity)で $w\in H^{s+2}$。$c=V^{-1}\int_Xw\omega^n$ を引いた $v=w-c\in E$ は

$$
L_uv=\frac{Q(u)}2(-f)=h.
$$

二解 $v_1,v_2$ の差は $\Delta_{\omega_u}(v_1-v_2)=0$ であり、連結コンパクト性から定数、固定平均零から零である。この順に全射と単射を示せた。
<!-- solution-end -->

<a id="ex-yau1-05-b02"></a>

### Level B — YAU1-05-B02：Sobolev積評価の要所
- Level: B

実次元 $d=4$、$s=d+1=5$ とする。$|\alpha|\le5$ のLeibniz展開の各項で、積の一方を $L^\infty$、他方を $L^2$ で評価できる理由を説明せよ。$s=2$ では同じ証明が使えない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $|\alpha|\le5$ を $|\beta|+|\alpha-\beta|$ に分けると、両方が $3$ 以上なら和は $6$ 以上で矛盾する。従って少なくとも一方は $2$ 以下である。たとえば $|\beta|\le2$ なら

$$
D^\beta f\in H^{5-|\beta|}\subset H^3,\qquad
3>\frac d2=2.
$$

局所Sobolev埋め込みで $\|D^\beta f\|_\infty\le C\|f\|_{H^5}$、もう一方は $\|D^{\alpha-\beta}g\|_2\le\|g\|_{H^5}$。逆の場合も交換すればよい。$s=2$ では $|\alpha|=2$、$|\beta|=1$ で両因子が $H^1$ にしか入らず、$H^1(\mathbb R^4)\not\hookrightarrow L^\infty$。同じ $L^\infty\times L^2$ の論法は閉じない。
<!-- solution-end -->

<a id="ex-yau1-05-b03"></a>

### Level B — YAU1-05-B03：縮小写像から陰関数を作る
- Level: B

Banach空間の $C^1$ 写像 $\Psi(u,t)$ について、$\Psi(u_0,t_0)=0$、$A=D_u\Psi(u_0,t_0)$ が有界可逆とする。$T_t(u)=u-A^{-1}\Psi(u,t)$ に対して $D_uT_{t_0}(u_0)$ を求め、局所解の一意性が従う式を書け。

<!-- solution-start -->
**詳細解答。** 微分の線形性から

$$
D_uT_{t_0}(u_0)
=I_E-A^{-1}D_u\Psi(u_0,t_0)
=I_E-A^{-1}A=0.
$$

微分の連続性により小球では $\|D_uT_t\|\le1/2$ とできる。パラメータをさらに狭めて球への自己写像性を確保すれば、反復列は差が $2^{-m}$ の等比級数で抑えられ、完備性により $T_t(u)=u$ の解へ収束する。二つの解 $T_t(u)=u$、$T_t(v)=v$ には

$$
\|u-v\|=\|T_t(u)-T_t(v)\|\le\tfrac12\|u-v\|
$$

が成り立つので $u=v$。存在には反復列、一意性にはこの不等式をそれぞれ使う。
<!-- solution-end -->

<a id="ex-yau1-05-b04"></a>

### Level B — YAU1-05-B04：定数方向のままでは可逆でない
- Level: B

$Q$ を $H^{s+2}(X)$ 全体で考えると、微分が同型にならない理由を示せ。$E$ への制限を行っても $H^s(X)$ 全体への全射にはならない理由を示せ。

<!-- solution-start -->
**詳細解答。** 定数 $c$ について $D^2_{\mathbb C}c=0$ だから $DQ_u(c)=0$。従って定数方向が非自明な核であり、$H^{s+2}$ 全体では単射でない。$E$ へ制限すると連結コンパクト性から核は零になるが、任意の $v\in E$ に対して

$$
\int_XDQ_u(v)\omega^n=0
$$

なので、その像は $H^s(X)$ の真部分空間 $Y$ に含まれる。たとえば定数 $h\equiv1$ は $H^s$ に属すが積分が $V>0$ だから像に入らない。定義域の定数ゲージを除くことと、値域の積分条件を合わせることは両方必要である。
<!-- solution-end -->

<a id="ex-yau1-05-c01"></a>

### Level C — YAU1-05-C01：開性を出発点から証明する
- Level: C

コンパクト連結・境界なしKähler多様体で $\int_Xe^F\omega^n=V$ とする。$\rho_t=1-t+te^F$ の可解集合が相対開であることを、平均ゼロ空間の選択、非線形写像、微分の同型、陰関数補題の四段階で論証せよ。どこで閉性が未証明のまま残るかも明記せよ。

<!-- solution-start -->
**詳細解答。** まず $s=2n+1$ とし、$E=H^{s+2}\cap\{\int u\omega^n=0\}$、$Y=H^s\cap\{\int h\omega^n=0\}$、$U=\{u\in E:\omega_u>0\}$ とする。$H^{s+2}\hookrightarrow C^2$ と正値固有値の下界から $U$ は開。$\rho_t$ は正かつ積分が $V$ で、$u=0$ が $t=0$ の解である。

次に $\Phi(u,t)=\omega_u^n/\omega^n-\rho_t$ と置く。Stokesによる固定体積の不変性から $\Phi$ は $Y$ に値を取り、Sobolev積評価と行列式の多項式性から $C^1$。微分は

$$
D_u\Phi(u,t)v
=Q(u)g_u^{j\bar k}v_{j\bar k}
=\frac{Q(u)}2\Delta_{\omega_u}v.
$$

解 $u_0$ は正則性の反復で滑らか。任意の $h\in Y$ に対し $f=-2h/Q(u_0)$ とすれば

$$
\int_Xf\omega_{u_0}^n=-2\int_Xh\omega^n=0.
$$

[GA3のPoisson定理](../../GA/GA3/index.md#thm-ga3-poisson-existence)で $-\Delta_{\omega_{u_0}}v=f$ を解き、[局所正則性](../../GA/GA3/index.md#thm-ga3-local-regularity)で $H^{s+2}$ を得て固定平均を引く。核は定数のみなので $L_{u_0}:E\to Y$ は全単射、[有界逆定理](../../../解析系/FA/FA2/index.md#thm-fa2-bounded-inverse)で逆も有界となる。

最後に[Banach空間の局所陰関数補題](#lem-yau1-05-banach-ift)を使えば $t_0$ の近傍の全ての $t$ に対し解があり、区間内での開性が従う。しかし $t_k\to t_\ast$ の解列が正値性と高階ノルムの一様評価を保つとは示していない。従って閉性は未証明であり、$1$ の可解性はまだ結論できない。
<!-- solution-end -->

<a id="ex-yau1-05-c02"></a>

### Level C — YAU1-05-C02：三種類の障害を切り分ける
- Level: C

次の3条件をそれぞれ外したとき、開性証明の**最初に壊れる部分**と、その理由を説明せよ。

1. $\int_Xe^F\omega^n=V$ を外し、$F\equiv\log2$ とする。
2. 許容計量の正値性を外し、平坦楕円曲線で密度 $1-ta\cos2\pi x$ が零を取る $ta=1$ を許す。
3. 連結性を外し、同じ体積の楕円曲線を二つ非交和にする。

<!-- solution-start -->
**詳細解答。** 

**(1)** $\rho_t=1+t$ となるので $\int_X\rho_t\omega^n=(1+t)V$。$t>0$ では固定Kähler類の[体積不変性](../YAU1-03/index.md#prop-yau1-03-compatibility)に矛盾する。$\Phi=Q-\rho_t$ は固定平均ゼロの $Y$ に値を取らない。この段階で関数空間の設定が破綻する。

**(2)** $ta=1$ かつ $x=0$ の点で $\rho_t=0$ である。$G_u$ の行列式が零となり、正値Hermite行列の逆行列 $G_u^{-1}$ が存在しない。従って $D_u\Phi=Q(u)\operatorname{tr}(G_u^{-1}D^2v)$ という表示、Poisson解の一様楕円性、陰関数補題の同型条件を使えない。

**(3)** $X=T_1\sqcup T_2$ で $v|_{T_1}=1$、$v|_{T_2}=-1$ とすると、両成分の体積が同じなら $\int_Xv\omega^n=0$。しかし両成分上で $v$ は定数なので $\Delta_{\omega_u}v=0$、従って $L_uv=0$。$v\ne0$ だから平均ゼロ $E$ 上でも微分が単射でない。さらに右辺の可解性には各成分ごとの積分条件が必要になる。全体平均一つでは不足する。
<!-- solution-end -->

## 10. 次の段階へ

この章で証明したのは、**一つ解があれば近くのパラメータでも解ける**という局所的な主張である。残る問題は、$t$ を動かしても解が発散せず、$\omega_{\varphi_t}>0$ が崩れず、極限で方程式を満たすことを保証する**一様な事前評価**である。次章では平均とGreen関数を使う $C^0$ 評価の入口へ進み、さらにMoser反復、二階・三階評価を積み重ねて閉性を目指す。
