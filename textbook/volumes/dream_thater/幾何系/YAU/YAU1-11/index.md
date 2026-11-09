# YAU1-11 高階評価と正則性

## 1. 三階評価から何が得られ、何がまだ必要か

[前章のCalabi型三階評価](../YAU1-10/index.md#thm-yau1-10-global-third-order)は、解計量の接続差を一様に抑える。これは「計量が上下に有界」という二階評価より強い。しかし連続性の方法で滑らかな極限を取るには、任意の固定次数の微分を一様に抑える必要がある。本章では三階評価を、係数のHölder連続性、線形楕円型方程式のSchauder評価、微分の帰納法へ接続する。

複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体 $(X,\omega)$ を固定する。$g$ をその計量、$F\in C^\infty(X,\mathbb R)$ を体積整合条件 $\int_Xe^F\omega^n=\int_X\omega^n$ を満たす関数とする。[連続性のパス](../YAU1-05/index.md#def-yau1-05-path)で解のある $t\in[0,1]$ に対して

$$
\rho_t=1-t+te^F,\quad H_t=\log\rho_t,\quad
h_{i\bar j}=g_{i\bar j}+\partial_i\partial_{\bar j}\varphi_t,
\quad \det h=e^{H_t}\det g,
$$

と書く。$\int_X\varphi_t\omega^n=0$ と正規化する。既習の二階・三階評価は、$t$ および解に依らない定数により

$$
c g\le h\le Cg,\qquad
|\nabla^g h|_g\le C_1
$$

を与える。後者は[接続差の定義](../YAU1-10/index.md#def-yau1-10-connection-difference)による $\nabla^g_i h_{j\bar q}=h_{k\bar q}\Psi_{ij}^k$ とその共役、および二側計量評価から従う。$g$ の固定された微分は定数に吸収する。

## 2. Hölder係数を用意する

局所Schauder評価は、単に一様楕円性を持つ有界係数だけでは適用できない。係数が一定のHölder指数と定数で制御される必要がある。$0<\alpha<1$ に対して、同じ座標チャート内で成分を比較する半ノルムを

$$
[a]_{C^{0,\alpha}(K)}=\sup_{x\ne y\in K}\frac{|a(x)-a(y)|}{|x-y|^\alpha},\qquad
\|a\|_{C^{0,\alpha}(K)}=\|a\|_{C^0(K)}+[a]_{C^{0,\alpha}(K)}
$$

とする。以下では有限個の固定チャートの小さい閉部分チャート $K$ でこのノルムを測る。背景距離 $d_g$ とチャート内のEuclid距離は各 $K$ で比較可能であり、重なりの遷移写像は固定で滑らかだから、この選択は一様性に影響しない。

<a id="def-yau1-11-uniform-holder"></a>

<!-- formal-statement-start -->
> **定義（一様Hölder係数族）**  
> 有限個の固定座標チャートの各コンパクト部分上で、$a_t=(a_t^{i\bar j})$ を正値Hermite行列値関数族とする。各 $t$ とすべての $\xi\in\mathbb C^n$ に対して次の二条件を、$t$ に依存しない $\lambda,\Lambda,M>0$ で満たすとき、**一様Hölder係数族**という。

$$
\lambda|\xi|^2\le a_t^{i\bar j}\xi_i\overline{\xi_j}\le\Lambda|\xi|^2,
\qquad \|a_t\|_{C^{0,\alpha}}\le M
$$
<!-- formal-statement-end -->

なぜHermite行列を調べるのかを確認する。$a_t^{i\bar j}$ は、未知関数に作用する $L_t=a_t^{i\bar j}\partial_i\partial_{\bar j}$ の**二階微分の係数**である。$z^i=x^i+iy^i$ とすれば $\partial_i=\tfrac12(\partial_{x^i}-i\partial_{y^i})$、$\partial_{\bar i}=\tfrac12(\partial_{x^i}+i\partial_{y^i})$。実余接ベクトル $(\eta,\theta)\in\mathbb R^{2n}$ に対する主記号は

$$
\sigma_{L_t}(\eta,\theta)
=\tfrac14a_t^{i\bar j}(\eta_i-i\theta_i)(\eta_j+i\theta_j),\qquad
\tfrac\lambda4(|\eta|^2+|\theta|^2)
\le\sigma_{L_t}\le\tfrac\Lambda4(|\eta|^2+|\theta|^2).
$$

これは複素二次形式の正値条件を実変数で読み直したもので、実非発散形作用素の一様楕円性にちょうど対応する。特に $n=1$ では $\partial_z\partial_{\bar z}=\tfrac14(\partial_{xx}+\partial_{yy})$ となる。

<!-- definition-example-start: def-yau1-11-uniform-holder -->
**定義の確認**。複素一次元の単位円板で $a_s(z)=2+s\operatorname{Re}z$、$0\le s\le1$ とする。これは一行一列の実Hermite行列であり、その二次形式は $a_s(z)\xi\bar\xi=a_s(z)|\xi|^2$。$-1<\operatorname{Re}z<1$ より、すべての $s,z,\xi$ に対して

$$
|\xi|^2\le a_s(z)|\xi|^2\le3|\xi|^2
$$

が成立する。さらに単位円板の直径が $2$ であることから

$$
|a_s(z)-a_s(w)|=s|\operatorname{Re}(z-w)|
\le|z-w|\le2^{1-\alpha}|z-w|^\alpha,
\quad \|a_s\|_{C^{0,\alpha}}\le3+2^{1-\alpha}.
$$

二つの条件を同じ $\lambda=1,\Lambda=3,M=3+2^{1-\alpha}$ で確認した。単なる二側有界性だけでは差商の評価は得られない。
<!-- definition-example-end -->

<a id="lem-yau1-11-holder-control"></a>

<!-- formal-statement-start -->
> **補題（三階評価から係数のHölder制御）**  
> 上記のコンパクトKähler多様体上で、解計量族が次の二側評価と微分評価を満たすとする。

$$
cg\le h_t\le Cg,\qquad |\nabla^gh_t|_g\le C_1.
$$

> 任意の固定Hölder指数 $0<\alpha<1$ に対して、逆行列 $h_t^{-1}$ は固定チャートの小さいコンパクト部分上で一様Hölder有界であり、一様Hölder係数族である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：逆行列の微分まで追う

固定チャートでは $\partial_kh_{i\bar j}=\nabla_k^gh_{i\bar j}+\Gamma(g)_{ki}^ph_{p\bar j}$ だから、背景接続の有界性により $|\partial h|\le C_2$。共役方向にも同じ評価が成立する。線分がチャート内部にある二点 $x,y$ を結び、微積分の基本定理を成分ごとに適用すると

$$
|h(x)-h(y)|\le C_2|x-y|.
$$

逆行列については $h^{-1}(x)-h^{-1}(y)=h^{-1}(x)(h(y)-h(x))h^{-1}(y)$ なので、$\|h^{-1}\|\le c_0^{-1}$ を使い

$$
|h^{-1}(x)-h^{-1}(y)|\le c_0^{-2}C_2|x-y|.
$$

線分を含む小球で以上を得る。離れた二点には $\|h^{-1}\|_{C^0}$ の上界を使い、有限個の小球で閉部分チャートを覆えば、その上でも同じ型のHölder評価が成り立つ。直径を $D$ とすれば $|x-y|\le D^{1-\alpha}|x-y|^\alpha$。有限チャートの最大定数を取れば一様 $C^{0,\alpha}$ 評価となる。また $cg\le h\le Cg$ を固定チャートで比較すると $h$ の固有値は $[c_0,C_0]$ に入り、逆行列の固有値は $[C_0^{-1},c_0^{-1}]$ に入る。よって定義の楕円条件も確認できた。□
<!-- proof-end -->

**平坦トーラスでの直接確認**。$X=\mathbb C/(\mathbb Z+i\mathbb Z)$ の周期座標 $z=x+iy$ で $g_{z\bar z}=1$ とし、$\varphi_\varepsilon=\varepsilon\cos(2\pi x)$（$|\varepsilon|\le1/(2\pi^2)$）を取る。$\partial_z\partial_{\bar z}=\tfrac14(\partial_{xx}+\partial_{yy})$ を適用すると

$$
h_{z\bar z}=1-\pi^2\varepsilon\cos(2\pi x),\qquad
\tfrac12\le h_{z\bar z}\le\tfrac32.
$$

したがってKähler正値性と二側評価を直接確認できる。さらに $|\partial_xh|\le2\pi^3|\varepsilon|\le\pi$、$\partial_yh=0$ だから、背景接続が零であるこの座標では $|\nabla^gh|$ が一様有界である。逆数の微分を省かず計算すると

$$
\partial_x(h^{-1})=-h^{-2}\partial_xh,\qquad
|\partial_x(h^{-1})|\le4\pi,
$$

となる。有限個の固定チャート上で $h^{-1}$ の上界 $2$ とLipschitz定数 $4\pi$ が揃い、上の補題どおり一様Hölder係数になる。この例は**係数評価の検算**であり、$\varepsilon$ を動かした族が同じ固定 $F$ の連続性のパスを解くと主張してはいない。

注意すべき点は、ここで制御したのは $h=g+\partial\bar\partial\varphi$ であって、ポテンシャルの純正則三階微分すべてではないことである。次の方程式は混合微分にだけ作用するので、この制限と整合する。

## 3. 方程式を微分して線形問題へ移す

対数行列式の一階微分は $\partial_k\log\det h=h^{i\bar j}\partial_kh_{i\bar j}$ である。右辺を $H_t+\log\det g$ と置くと、$\partial_kh=\partial_kg+\partial_k\partial\bar\partial\varphi$ だから、座標微分 $u_k=\partial_k\varphi$ に対して主部 $L_h=h^{i\bar j}\partial_i\partial_{\bar j}$ が現れる。ここで $D$ は固定した局所座標の $\partial_{x^k},\partial_{y^k}$ または $\partial_{z^k},\partial_{\bar z^k}$ を表し、$D^\beta$ はそれらの合成を表す。滑らかな局所関数ではこれらの座標微分が可換であることを使う。$u_k$ はチャートに依存するが、Schauder評価自体は局所的に行える。

<a id="lem-yau1-11-differentiation"></a>

<!-- formal-statement-start -->
> **補題（線形化方程式の微分公式）**  
> 正値Hermite行列 $h=g+\partial\bar\partial\varphi$ と $\log\det h=H+\log\det g$ が滑らかな局所座標で成り立つなら、各実または複素座標微分 $D$ に対して
>
> $$L_h(D\varphi)=DH+D\log\det g-h^{i\bar j}Dg_{i\bar j}.$$
>
> さらに任意の多重微分 $D^\beta$（$|\beta|=m\ge2$）について
>
> $$L_h(D^\beta\varphi)=D^\beta(H+\log\det g)-h^{i\bar j}D^\beta g_{i\bar j}-R_\beta,$$
>
> ただし $R_\beta$ は $h^{-1}$ と、次数 $1$ から $m-1$ の $h$ の微分の積からなる有限和である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：合成関数の最高階項を分離する

$A\mapsto\log\det A$ の方向微分は $d(\log\det)_A[B]=\operatorname{tr}(A^{-1}B)$ である。$\det(A+sB)=\det A\det(I+sA^{-1}B)$ を $s=0$ で微分すればこれを直接確認できる。一階では $D\log\det h=D(H+\log\det g)$ と $Dh=Dg+\partial\bar\partial D\varphi$ を代入して

$$
DH+D\log\det g=h^{i\bar j}Dg_{i\bar j}+L_h(D\varphi)
$$

を得る。背景項を左辺から**引く**ことで補題の符号となる。

二階では

$$
D_1D_2\log\det h
=\operatorname{tr}(h^{-1}D_1D_2h)
-\operatorname{tr}(h^{-1}D_1h\,h^{-1}D_2h).
$$

これは $D(h^{-1})=-h^{-1}(Dh)h^{-1}$ を用いた積の微分である。一般の $m$ 階ではこの操作を繰り返すと、ただ一つの因子に $m$ 階微分が集中する項が $\operatorname{tr}(h^{-1}D^\beta h)$ となり、それ以外の項では各 $h$ 微分の次数が $m-1$ 以下である。ここへ $D^\beta h=D^\beta g+\partial\bar\partial D^\beta\varphi$ を代入して結論を得る。□
<!-- proof-end -->

一次元では $h=g+\varphi_{z\bar z}$ として、$h_z/h=H_z+g_z/g$。したがって $h^{-1}(\varphi_z)_{z\bar z}=H_z+g_z/g-h^{-1}g_z$ となり、補題の一階式と一致する。二階微分すると負の項 $-h^{-2}h_zh_{\bar z}$ が現れる。

## 4. 一段目のSchauder評価と帰納法

用いる局所Schauder評価を明確にする。実次元 $d=2n$ の球 $B_{2r}\Subset U$ で、実対称係数 $a^{pq}\in C^{0,\alpha}(B_{2r})$ を持つ非発散形作用素 $Lu=a^{pq}(x)\partial_{pq}u$ が一様楕円的で、$u\in C^{2,\alpha}(B_{2r})$ なら、

<a id="eq-yau1-11-interior-schauder"></a>

$$
\|u\|_{C^{2,\alpha}(B_r)}
\le C\bigl(\|u\|_{C^0(B_{2r})}+\|Lu\|_{C^{0,\alpha}(B_{2r})}\bigr).
$$

$C$ は次元、$r$、楕円定数、係数のHölderノルム、$\alpha$ のみに依存する。この係数Hölder版は、既習の[弱解の内部 $H^2$ 正則性](../../../解析系/GPDE/GPDE9/index.md#thm-gpde9-poisson-interior-h2)とは**別の評価**である。必要な解析上の核心をここで確かめる。

**内点Schauder評価の導出。** まず定数の正定値実対称行列 $A$ に対して $L_A=A^{pq}\partial_{pq}$ とおく。線形変換 $x=A^{1/2}y$ により $L_A$ は $y$ 座標のLaplacianになる。コンパクト台の滑らかな $v$ に対して $q=L_Av$ とおけば、基本解 $\Gamma_A$ により $v=\Gamma_A*q$ と表せる。

二階微分の核 $K_{pq}=\partial_{pq}\Gamma_A$ は原点以外で次を満たす。

$$
|K(z)|\le C|z|^{-d},\qquad |\nabla K(z)|\le C|z|^{-d-1}.
$$

また $\partial_q\Gamma_A$ は次数 $1-d$ の斉次関数である。発散定理を同心球殻に適用すると、二つの境界での流束が等しいので

$$
\int_{r<|z|<R}K_{pq}(z)\,dz=0
$$

となる。一方 $K_{pq}$ は次数 $-d$ の斉次関数だから、極座標でこの積分は

$$
\log(R/r)\int_{S^{d-1}}K_{pq}(\theta)\,d\theta=0.
$$

つまり角度方向の積分が零になることを、ここで直接確かめた。小球の積分では $q(x-z)-q(x)$ を用いることで特異性を相殺する。二点 $x,y$ の距離を $\delta$ として積分を半径 $2\delta$ で分けると、近距離と遠距離の寄与はそれぞれ

$$
C[q]_{C^{0,\alpha}}\int_0^{2\delta}s^{\alpha-1}\,ds
\le C_\alpha[q]_{C^{0,\alpha}}\delta^\alpha,
\qquad
C[q]_{C^{0,\alpha}}\delta\int_{2\delta}^{R}s^{\alpha-2}\,ds
\le C_\alpha[q]_{C^{0,\alpha}}\delta^\alpha
$$

で抑えられる。遠方の有界部分は $\|q\|_{C^0}$ で処理する。この相殺と二つの積分により、定数係数について $\|D^2v\|_{C^{0,\alpha}}\le C\|L_Av\|_{C^{0,\alpha}}$ が従う（$d=2$ の基本解が対数形でも二階微分の核の次数は同じ）。

変動係数では、中心 $x_0$、半径 $\rho$ の小球で係数を $A_0=a(x_0)$ に固定し、内側で $1$ となる切断関数 $\eta$ を掛ける。積の微分を省かずに書けば

$$
L_{A_0}(\eta u)=\eta Lu+\eta(A_0-a(x))^{pq}u_{pq}
+2A_0^{pq}(\partial_p\eta)(\partial_qu)+(L_{A_0}\eta)u.
$$

$\|a(x)-A_0\|_{C^0(B_\rho)}\le M\rho^\alpha$ なので、二項目のHölder半ノルムは $M\rho^\alpha[D^2u]_{C^{0,\alpha}}+M\|D^2u\|_{C^0}$ 型に抑えられる。内側の球の差分商による補間評価

$$
\|D^2u\|_{C^0}\le\varepsilon[D^2u]_{C^{0,\alpha}}+C_\varepsilon\|u\|_{C^0},
\qquad
\|Du\|_{C^{0,\alpha}}\le\varepsilon\|u\|_{C^{2,\alpha}}+C_\varepsilon\|u\|_{C^0}
$$

を、境界からの距離で重み付けした内点ノルムに適用する。先に $\rho$ を小さくし、次に $\varepsilon$ を小さく取ると、$D^2u$ を含む右辺を左辺へ吸収できる。残るのは $\|u\|_{C^0}$ と $\|Lu\|_{C^{0,\alpha}}$ のみであり、固定された小球の有限被覆で冒頭の評価を得る。ここで半径・切断関数・吸収定数は $\lambda,\Lambda,M,\alpha,r,d$ だけで決まり、個々の解には依らない。

複素Laplacianの場合は第2節の主記号の計算により、実対称主部へ書き直して適用する。複素値の $D\varphi$ には実部・虚部それぞれへ実係数の評価を適用する。境界のないコンパクト $X$ を有限チャートで覆い、各小チャートの内側を評価すれば一様な大域評価が得られる。パス上で $\lambda,\Lambda$ と係数ノルムが同じであることが不可欠である。

まず一階微分 $u_k=\partial_k\varphi$ を考える。[前章の三階評価](../YAU1-10/index.md#thm-yau1-10-global-third-order)によって混合三階微分は有界である。また $\rho_t=1-t+te^F\ge\min\{1,e^{\min_XF}\}>0$ で、$D^j\rho_t=tD^je^F$（$j\ge1$）は任意の固定次数で一様有界だから、合成微分から $H_t=\log\rho_t$ の各固定階の導関数も $t$ に依らず有界となる。

補題の一階方程式の右辺 $DH_t+D\log\det g-h^{-1}Dg$ は $C^{0,\alpha}$ 一様有界となる。

$u_k$ の $C^0$ はポテンシャルの一階評価から得る必要がある。$\Delta_g\varphi=\operatorname{tr}_g(h-g)$ の右辺は、第2節の $h$ のLipschitz評価により $C^{0,\alpha}$ 一様有界である。従って同じ内点Schauder評価を固定された滑らかな背景作用素 $\Delta_g$ に適用し、既習の $\|\varphi\|_{C^0}$ 評価と有限被覆を使えば、まず $\|\varphi\|_{C^{2,\alpha}}\le C$ が得られる。

この背景作用素は係数が固定で滑らかなので循環しない。

従って局所Schauder評価から $\partial_k\varphi\in C^{2,\alpha}$ が一様に従い、座標を変換して $\varphi\in C^{3,\alpha}$ が得られる。以後は係数の微分に必要な正則性を一段ずつ増やす。

<a id="thm-yau1-11-higher-estimates"></a>

<!-- formal-statement-start -->
> **定理（一様高階事前評価）**  
> 境界のないコンパクト連結Kähler多様体 $(X,\omega)$ と滑らかな実関数 $F$ を固定する。$F$ は体積整合条件を満たすとする。連続性のパス上に存在する滑らかな平均零解 $\varphi_t$ が以下の方程式を満たし、既習の二階・三階事前評価が成立すると仮定する。

$$
\omega_{\varphi_t}^n=(1-t+te^F)\omega^n,\qquad t\in[0,1].
$$

> このとき、任意の非負整数 $m$ と固定したHölder指数 $0<\alpha<1$ について、
>
> $$\|\varphi_t\|_{C^{m,\alpha}(X,g)}\le C_{m,\alpha}$$
>
> が成立する。定数は $X,g,F,m,\alpha$ のみに依存し、解のある時刻 $t$ に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：循環を避けて各階を閉じる

**初期段階。** [一様 $C^0$ 評価](../YAU1-07/index.md#thm-yau1-07-moser)と[二側計量評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)から

$$
\|\varphi\|_{C^0}+\|\Delta_g\varphi\|_{C^0}\le C.
$$

さらに[三階評価](../YAU1-10/index.md#thm-yau1-10-global-third-order)から $h$ はLipschitz一様有界なので、$\Delta_g\varphi=\operatorname{tr}_g(h-g)$ は $C^{0,\alpha}$ 一様有界になる。固定背景作用素 $\Delta_g$ に[上記Schauder評価](#eq-yau1-11-interior-schauder)を適用すると

$$
\|\varphi\|_{C^{2,\alpha}}\le C
$$

を得る。これは変動係数の $L_h$ に評価を適用する**前**に得られ、循環しない。

これにより $D\varphi$ の $C^0$ も確保できる。

**最初の昇格。** [係数制御の補題](#lem-yau1-11-holder-control)により $h^{-1}$ は一様 $C^{0,\alpha}$、[微分公式](#lem-yau1-11-differentiation)の一階右辺も同様である。[局所Schauder評価](#eq-yau1-11-interior-schauder)を $D\varphi$ に適用して $C^{3,\alpha}$ 評価を得る。

**帰納段階。** ある $m\ge1$ について $\varphi$ の $C^{m+2,\alpha}$ 一様評価が得られたとする。すると $h=g+\partial\bar\partial\varphi$ と $h^{-1}$ の $C^{m,\alpha}$ ノルムは一様に有界である。

$|\beta|=m+1$ の[微分公式](#lem-yau1-11-differentiation)を使うと、残差 $R_\beta$ は $m$ 階以下の $h$ 微分で構成されるため $C^{0,\alpha}$ で一様有界となる。未知関数 $u=D^\beta\varphi$ 自身の $C^0$ も帰納仮定から有界である。

係数 $h^{-1}$ の一様楕円性・$C^{0,\alpha}$ 制御を使って[内点Schauder評価](#eq-yau1-11-interior-schauder)を適用すると

$$
\|D^\beta\varphi\|_{C^{2,\alpha}}\le C_{m+3,\alpha},
\qquad \|\varphi\|_{C^{m+3,\alpha}}\le C'_{m+3,\alpha}.
$$

数学的帰納法によりすべての階が閉じる。

**大域化。** 各チャートでは $D^\beta\varphi$ がスカラーの座標微分として定義される。有限個のチャートと固定された滑らかな遷移写像で共変微分ノルムに戻せば定数は統一される。いずれの段階も $t$ に依らない楕円定数・右辺定数しか用いない。□
<!-- proof-end -->

ここで三階評価に基づく係数のHölder制御が、変動する作用素に対するSchauder定数を固定する鍵だった。YAU1-12 では、この高階一様評価を使って解列の収束と極限方程式を扱う。

## 5. 仮定が欠けるとどこが止まるか

- $cg\le h$ の下界が失われると $h^{-1}$ の作用素ノルムが発散し、逆行列のHölder評価とSchauderの楕円定数が同時に壊れる。
- $|\nabla h|$ の評価がない場合、行列が上下有界であっても係数のHölder半ノルムは発散し得る。例えば $a_k(x)=2+\tfrac12\sin(kx)$ は正値で一様有界だが $[a_k]_{C^{0,\alpha}}$ は $k^\alpha$ のオーダーで増える。
- $F$ に高階の一様制御がなければ、$D^\beta H_t$ を右辺で一様に評価できず、高階ブートストラップはその階で止まる。滑らかな固定 $F$ という条件がここで効く。

## 6. 演習（全問詳細解答）

### Level A

#### YAU1-11-A01 逆行列
- Level: A

正値行列 $A(x)$ が $\|A^{-1}\|\le M$ と $\|DA\|\le K$ を満たすとき $\|D(A^{-1})\|\le M^2K$ を導け。

<!-- solution-start -->
**詳細解答。**
$AA^{-1}=I$ を微分すると $(DA)A^{-1}+A D(A^{-1})=0$。左から $A^{-1}$ を掛けると

$$
D(A^{-1})=-A^{-1}(DA)A^{-1},\qquad
\|D(A^{-1})\|\le\|A^{-1}\|^2\|DA\|\le M^2K.
$$

最後の評価は作用素ノルムの劣乗法性による。
<!-- solution-end -->

#### YAU1-11-A02 Hölder指数
- Level: A

直径 $D$ の領域で $|f(x)-f(y)|\le L|x-y|$ とする。任意の $0<\alpha<1$ のHölder半ノルムを評価せよ。

<!-- solution-start -->
**詳細解答。**
$x\ne y$ について $|f(x)-f(y)|/|x-y|^\alpha\le L|x-y|^{1-\alpha}\le LD^{1-\alpha}$。上限を取れば $[f]_{C^{0,\alpha}}\le LD^{1-\alpha}$。
<!-- solution-end -->

#### YAU1-11-A03 対数行列式
- Level: A

正値行列曲線 $A(s)$ について $(\log\det A)'=\operatorname{tr}(A^{-1}A')$ と二階微分公式を導け。

<!-- solution-start -->
**詳細解答。**
$\det A(s+\varepsilon)=\det A(s)\det(I+\varepsilon A^{-1}A'+o(\varepsilon))$ と $\det(I+\varepsilon B)=1+\varepsilon\operatorname{tr}B+o(\varepsilon)$ より一階式が従う。これを微分し、$(A^{-1})'=-A^{-1}A'A^{-1}$ を代入すると

$$
(\log\det A)''=\operatorname{tr}(A^{-1}A'')
-\operatorname{tr}(A^{-1}A'A^{-1}A').
$$
<!-- solution-end -->

#### YAU1-11-A04 一次元
- Level: A

$h=g+\varphi_{z\bar z}$、$\log(h/g)=H$ のとき $h^{-1}(\varphi_z)_{z\bar z}=H_z+g_z/g-h^{-1}g_z$ を示せ。

<!-- solution-start -->
**詳細解答。**
$\log h=H+\log g$ を $z$ 微分すると $h_z/h=H_z+g_z/g$。一方、$h_z=g_z+\partial_z(\varphi_{z\bar z})$ なので、混合偏微分の順序を交換して

$$
h^{-1}(\varphi_z)_{z\bar z}=\frac{h_z-g_z}{h}
=H_z+\frac{g_z}{g}-h^{-1}g_z.
$$
<!-- solution-end -->

### Level B

#### YAU1-11-B01 局所化
- Level: B

$B_{2r}\Subset U$ で一様 $C^{0,\alpha}$ 係数の方程式 $Lu=f$ がある。$\|u\|_{C^0(B_{2r})}$ と $\|f\|_{C^{0,\alpha}(B_{2r})}$ の一様上界が与えられたとき、なぜ $B_r$ に一様 $C^{2,\alpha}$ 評価が得られるか述べよ。境界に接する場合の不足も説明せよ。

<!-- solution-start -->
**詳細解答。**
[内点Schauder評価](#eq-yau1-11-interior-schauder)を使うと、

$$
\|u\|_{C^{2,\alpha}(B_r)}
\le C\bigl(\|u\|_{C^0(B_{2r})}+\|f\|_{C^{0,\alpha}(B_{2r})}\bigr).
$$

$C$ の依存する次元・半径・一様楕円定数・係数Hölderノルムがすべて固定されるので解ごとに変わらない。境界に接する場合は内部球が取れず、境界条件・境界の滑らかさを含む境界Schauder評価が別途必要となる。
<!-- solution-end -->

#### YAU1-11-B02 二階の残差
- Level: B

二つの座標微分 $D_1,D_2$ について、$L_h(D_1D_2\varphi)$ の右辺を完全に書け。

<!-- solution-start -->
**詳細解答。**
$Q=H+\log\det g$ と置き、二階微分公式を用いると $D_1D_2Q=h^{i\bar j}D_1D_2h_{i\bar j}-\operatorname{tr}(h^{-1}D_1h\,h^{-1}D_2h)$。$D_1D_2h=D_1D_2g+\partial\bar\partial(D_1D_2\varphi)$ を代入して
$$
L_h(D_1D_2\varphi)=D_1D_2Q-h^{i\bar j}D_1D_2g_{i\bar j}+\operatorname{tr}(h^{-1}D_1h\,h^{-1}D_2h).
$$
したがって補題の $R_\beta$ はこの場合、負の二次項である。符号を取り違えて右辺から二次項を引かないこと。
<!-- solution-end -->

#### YAU1-11-B03 背景Laplacian
- Level: B

$\Delta_g\varphi=\operatorname{tr}_g(h-g)$ を確認し、右辺が $C^{0,\alpha}$ 一様有界なら平均零解に $C^{2,\alpha}$ 評価が出る理由を述べよ。

<!-- solution-start -->
**詳細解答。**
$h_{i\bar j}-g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ を $g^{i\bar j}$ で縮約すれば等式となる。固定滑らかな計量 $g$ に[内点Schauder評価](#eq-yau1-11-interior-schauder)を有限個のチャートで適用すると

$$
\|\varphi\|_{C^{2,\alpha}}\le C\bigl(\|\varphi\|_{C^0}+\|\Delta_g\varphi\|_{C^{0,\alpha}}\bigr).
$$

$C^0$ は[前章までの一様評価](../YAU1-07/index.md#thm-yau1-07-moser)で固定され、右辺のHölderノルムは $g^{-1}$ と $h$ のHölderノルムから固定される。平均零条件は定数核を固定する。
<!-- solution-end -->

### Level C

#### YAU1-11-C01 ブートストラップを再構成
- Level: C

$\varphi$ に一様 $C^{m+2,\alpha}$ 評価があると仮定し、$m\ge1$ で $C^{m+3,\alpha}$ に上げる際の係数、残差、未知関数、Schauder定数の依存をすべて指定せよ。また $m=0$ の開始段階が別扱いになる理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

$|\beta|=m+1$ として未知関数を $u=D^\beta\varphi$ とする。

係数 $a^{i\bar j}=h^{i\bar j}$ は $h=g+\partial\bar\partial\varphi\in C^{m,\alpha}$ と一様正値性から $C^{0,\alpha}$ 有界で、楕円定数も一定である。

$R_\beta$ の各項は $h^{-1}$ および次数が $1$ 以上 $m$ 以下の $h$ の微分の積で、帰納仮定によって $C^{0,\alpha}$ 一様有界。例えば $m=1$ で $\beta=(D_1,D_2)$ なら $R_\beta=-\operatorname{tr}(h^{-1}D_1h\,h^{-1}D_2h)$ であり、これを右辺から引くと正の二次項になる。

$D^\beta(H+\log\det g)$ と $h^{-1}D^\beta g$ は固定滑らかなデータから同様に有界。

$\|u\|_{C^0}$ は $\varphi\in C^{m+2,\alpha}$ から得られる。

各固定小チャートの内点Schauder評価で $\|u\|_{C^{2,\alpha}}$ が一様になり、有限被覆で $\|\varphi\|_{C^{m+3,\alpha}}$ を得る。

$m=0$ では $D\varphi$ の $C^0$ と $h^{-1}$ のHölder性を先に確保する必要があり、固定背景Laplacianと三階評価から初期段階を独立に構成する。
<!-- solution-end -->
