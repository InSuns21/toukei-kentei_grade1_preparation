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

局所Schauder評価は、単に一様楕円性を持つ有界係数だけでは適用できない。係数が一定のHölder指数と定数で制御される必要がある。距離 $d_g$ に関する $0<\alpha<1$ のHölder半ノルムは、テンソルを同一の座標チャートで比較して定義し、有限個の固定チャートと小さい閉部分チャート上の値を合算する（重なりの遷移写像は固定で滑らか）。

<a id="def-yau1-11-uniform-holder"></a>

<!-- formal-statement-start -->
> **定義（一様Hölder係数族）**  
> 有限個の固定座標チャートの各コンパクト部分上で、行列値関数族 $a_t$ が次の二条件を全時刻に共通する正定数で満たすとき、**一様Hölder係数族**という。

$$
\lambda|\xi|^2\le a_t^{i\bar j}\xi_i\overline{\xi_j}\le\Lambda|\xi|^2,
\qquad \|a_t\|_{C^{0,\alpha}}\le M
$$
<!-- formal-statement-end -->

ここで正定値条件は実線形の主部 $a^{i\bar j}\partial_i\partial_{\bar j}$ にも一様楕円性を与える。複素座標 $z^i=x^i+iy^i$ で $\partial_i\partial_{\bar i}=\tfrac14(\partial_{x^ix^i}+\partial_{y^iy^i})$ となるため、実楕円定数には固定係数 $1/4$ が入るが、一様性は変わらない。

<!-- definition-example-start: def-yau1-11-uniform-holder -->
**定義の確認**。複素一次元の単位円板で $a_s(z)=2+s\operatorname{Re}z$、$0\le s\le1$ とすると $1\le a_s\le3$ であり、$|a_s(z)-a_s(w)|\le|z-w|\le 2^{1-\alpha}|z-w|^\alpha$ である。したがって $a_s$ は一様Hölder係数族である。単なる $1\le a_s\le3$ では差商の評価は得られない。
<!-- definition-example-end -->

<a id="lem-yau1-11-holder-control"></a>

<!-- formal-statement-start -->
> **補題（三階評価から係数のHölder制御）**  
> 上記のコンパクトKähler多様体上で、解計量族が次の二側評価と微分評価を満たすとする。

$$
cg\le h_t\le Cg,\qquad |\nabla^gh_t|_g\le C_1.
$$

> 任意の固定Hölder指数に対して、逆行列 $h_t^{-1}$ は固定チャートの小さいコンパクト部分上で一様Hölder有界であり、一様Hölder係数族である。
<!-- formal-statement-end -->

<details>
<summary>証明：逆行列の微分まで追う</summary>

固定チャートでは $\partial_kh_{i\bar j}=\nabla_k^gh_{i\bar j}+\Gamma(g)_{ki}^ph_{p\bar j}$ だから、背景接続の有界性により $|\partial h|\le C_2$。共役方向にも同じ評価が成立する。線分がチャート内部にある二点 $x,y$ を結び、微積分の基本定理を成分ごとに適用すると

$$
|h(x)-h(y)|\le C_2|x-y|.
$$

逆行列については $h^{-1}(x)-h^{-1}(y)=h^{-1}(x)(h(y)-h(x))h^{-1}(y)$ なので、$\|h^{-1}\|\le c_0^{-1}$ を使い

$$
|h^{-1}(x)-h^{-1}(y)|\le c_0^{-2}C_2|x-y|.
$$

チャートの直径を $D$ とすれば $|x-y|\le D^{1-\alpha}|x-y|^\alpha$。有限チャートの最大定数を取れば一様 $C^{0,\alpha}$ 評価となる。固有値の二側評価は逆行列の一様楕円性も保証する。□
</details>

注意すべき点は、ここで制御したのは $h=g+\partial\bar\partial\varphi$ であって、ポテンシャルの純正則三階微分すべてではないことである。次の方程式は混合微分にだけ作用するので、この制限と整合する。

## 3. 方程式を微分して線形問題へ移す

対数行列式の一階微分は $\partial_k\log\det h=h^{i\bar j}\partial_kh_{i\bar j}$ である。右辺を $H_t+\log\det g$ と置くと、$\partial_kh=\partial_kg+\partial_k\partial\bar\partial\varphi$ だから、座標微分 $u_k=\partial_k\varphi$ に対して主部 $L_h=h^{i\bar j}\partial_i\partial_{\bar j}$ が現れる。$u_k$ はチャートに依存するが、Schauder評価自体は局所的に行える。

<a id="lem-yau1-11-differentiation"></a>

<!-- formal-statement-start -->
> **補題（線形化方程式の微分公式）**  
> 正値Hermite行列 $h=g+\partial\bar\partial\varphi$ と $\log\det h=H+\log\det g$ が滑らかな局所座標で成り立つなら、各実または複素座標微分 $D$ に対して
>
> $$L_h(D\varphi)=DH+h^{i\bar j}Dg_{i\bar j}-D\log\det g.$$
>
> さらに任意の多重微分 $D^\beta$（$|\beta|=m\ge2$）について
>
> $$L_h(D^\beta\varphi)=D^\beta(H+\log\det g)-h^{i\bar j}D^\beta g_{i\bar j}-R_\beta,$$
>
> ただし $R_\beta$ は $h^{-1}$ と、次数 $1$ から $m-1$ の $h$ の微分の積からなる有限和である。
<!-- formal-statement-end -->

<details>
<summary>証明：合成関数の最高階項を分離する</summary>

$A\mapsto\log\det A$ の方向微分は $d(\log\det)_A[B]=\operatorname{tr}(A^{-1}B)$ である。$\det(A+sB)=\det A\det(I+sA^{-1}B)$ を $s=0$ で微分すればこれを直接確認できる。一階の式は $D\log\det h=h^{i\bar j}Dh_{i\bar j}$ に $Dh=Dg+\partial\bar\partial D\varphi$ を代入し、両辺を移項したものである。

二階では

$$
D_1D_2\log\det h
=\operatorname{tr}(h^{-1}D_1D_2h)
-\operatorname{tr}(h^{-1}D_1h\,h^{-1}D_2h).
$$

これは $D(h^{-1})=-h^{-1}(Dh)h^{-1}$ を用いた積の微分である。一般の $m$ 階ではこの操作を繰り返すと、ただ一つの因子に $m$ 階微分が集中する項が $\operatorname{tr}(h^{-1}D^\beta h)$ となり、それ以外の項では各 $h$ 微分の次数が $m-1$ 以下である。ここへ $D^\beta h=D^\beta g+\partial\bar\partial D^\beta\varphi$ を代入して結論を得る。□
</details>

一次元では $h=g+\varphi_{z\bar z}$ として、$h_z/h=H_z+g_z/g$。したがって $h^{-1}(\varphi_z)_{z\bar z}=H_z+g_z/g-h^{-1}g_z$ となり、補題の一階式と一致する。二階微分すると負の項 $-h^{-2}h_zh_{\bar z}$ が現れる。

## 4. 一段目のSchauder評価と帰納法

用いる局所Schauder評価を明確にする。実次元 $2n$ の球 $B_{2r}\Subset U$ で一様楕円な非発散形作用素 $Lu=a^{pq}(x)\partial_{pq}u$ の係数が $C^{0,\alpha}$ なら、

$$
\|u\|_{C^{2,\alpha}(B_r)}
\le C\bigl(\|u\|_{C^0(B_{2r})}+\|Lu\|_{C^{0,\alpha}(B_{2r})}\bigr).
$$

$C$ は次元、$r$、楕円定数、係数のHölderノルム、$\alpha$ のみに依存する。この入力は既習の楕円型Schauder理論の局所評価である。複素Laplacianの場合は実対称主部へ書き直して適用する。境界のないコンパクト $X$ を有限チャートで覆い、各小チャートの内側を評価すれば一様な大域評価が得られる。パス上で $\lambda,\Lambda$ と係数ノルムが同じであることが不可欠である。

まず一階微分 $u_k=\partial_k\varphi$ を考える。[前章の三階評価](../YAU1-10/index.md#thm-yau1-10-global-third-order)によって混合三階微分は有界であり、$g$ と $H_t$ は固定された滑らかなデータの一様有界族である。

補題の一階方程式の右辺 $DH_t+h^{-1}Dg-D\log\det g$ は $C^{0,\alpha}$ 一様有界となる。

$u_k$ の $C^0$ はポテンシャルの一階評価から得る必要があるが、平均零と $\|\partial\bar\partial\varphi\|_{C^0}\le C$、コンパクト性を用いる固定背景Laplacianの楕円評価（$\Delta_g\varphi=\operatorname{tr}_g(h-g)$）により $\|\varphi\|_{C^{1,\alpha}}\le C$ を先に確保できる。

この背景作用素は係数が固定で滑らかなので循環しない。

従って局所Schauder評価から $\partial_k\varphi\in C^{2,\alpha}$ が一様に従い、座標を変換して $\varphi\in C^{3,\alpha}$ が得られる。以後は係数の微分に必要な正則性を一段ずつ増やす。

<a id="thm-yau1-11-higher-estimates"></a>

<!-- formal-statement-start -->
> **定理（一様高階事前評価）**  
> 境界のないコンパクト連結Kähler多様体 $(X,\omega)$ と滑らかな実関数 $F$ を固定する。$F$ は体積整合条件を満たすとする。連続性のパス上に存在する滑らかな平均零解 $\varphi_t$ が以下の方程式を満たし、既習の二階・三階事前評価が成立すると仮定する。

$$
\omega_{\varphi_t}^n=(1-t+te^F)\omega^n,\qquad t\in[0,1].
$$

> このとき、任意の非負整数 $m$ と固定したHölder指数 $0<\alpha<1$ について次の評価が成立する。
>
> $$\|\varphi_t\|_{C^{m,\alpha}(X,g)}\le C_{m,\alpha}$$
>
> が成立する。定数は $X,g,F,m,\alpha$ のみに依存し、解のある時刻 $t$ に依存しない。
<!-- formal-statement-end -->

<details>
<summary>証明：循環を避けて各階を閉じる</summary>

**初期段階。** [一様 $C^0$ 評価](../YAU1-07/index.md#thm-yau1-07-moser)と[二側計量評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)から $\|\varphi\|_{C^0}+\|\Delta_g\varphi\|_{C^0}\le C$。

固定係数の $L^p$ 楕円評価を $p>2n$ で使えば $\|\varphi\|_{W^{2,p}}\le C_p$、Sobolev埋め込みで $\|\varphi\|_{C^{1,\gamma}}\le C$（$\gamma=1-2n/p$）。

ここでは任意の指定 $\alpha<1$ に対して $p$ を十分大きく取る。

さらに三階評価による $h$ のLipschitz制御から $\Delta_g\varphi=\operatorname{tr}_g(h-g)$ は $C^{0,\alpha}$ 一様有界となり、固定背景作用素のSchauder評価で $\|\varphi\|_{C^{2,\alpha}}\le C$。

これにより $D\varphi$ の $C^0$ も確保できる。

**最初の昇格。** [係数制御の補題](#lem-yau1-11-holder-control)により $h^{-1}$ は一様 $C^{0,\alpha}$、[微分公式](#lem-yau1-11-differentiation)の一階右辺も同様である。局所Schauder評価を $D\varphi$ に適用して $C^{3,\alpha}$ 評価を得る。

**帰納段階。** ある $m\ge1$ について $\varphi$ の $C^{m+2,\alpha}$ 一様評価が得られたとする。すると $h$ と $h^{-1}$ の $C^{m,\alpha}$ ノルムは一様に有界である。$|\beta|=m+1$ の式を直接使うと $R_\beta$ は $m$ 階以下の $h$ 微分で構成されるため、$C^{0,\alpha}$ で一様有界となる。$D^\beta\varphi$ 自身の $C^0$ は帰納仮定から有界である。係数 $h^{-1}$ の $C^{0,\alpha}$ 一様性を用いてSchauder評価を適用すると $D^\beta\varphi\in C^{2,\alpha}$ が一様に従う。従って $\varphi\in C^{m+3,\alpha}$。数学的帰納法によりすべての階が閉じる。

**大域化。** 各チャートでは $D^\beta\varphi$ がスカラーの座標微分として定義される。有限個のチャートと固定された滑らかな遷移写像で共変微分ノルムに戻せば定数は統一される。いずれの段階も $t$ に依らない楕円定数・右辺定数しか用いない。□
</details>

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
**詳細解答。

**
$AA^{-1}=I$ を微分すると $(DA)A^{-1}+A D(A^{-1})=0$。左から $A^{-1}$ を掛け $D(A^{-1})=-A^{-1}(DA)A^{-1}$。作用素ノルムの劣乗法性から上界 $M\cdot K\cdot M=M^2K$ を得る。
<!-- solution-end -->

#### YAU1-11-A02 Hölder指数
- Level: A

直径 $D$ の領域で $|f(x)-f(y)|\le L|x-y|$ とする。任意の $0<\alpha<1$ のHölder半ノルムを評価せよ。

<!-- solution-start -->
**詳細解答。

**
$x\ne y$ について $|f(x)-f(y)|/|x-y|^\alpha\le L|x-y|^{1-\alpha}\le LD^{1-\alpha}$。上限を取れば $[f]_{C^{0,\alpha}}\le LD^{1-\alpha}$。
<!-- solution-end -->

#### YAU1-11-A03 対数行列式
- Level: A

正値行列曲線 $A(s)$ について $(\log\det A)'=\operatorname{tr}(A^{-1}A')$ と二階微分公式を導け。

<!-- solution-start -->
**詳細解答。**
$\det A(s+\varepsilon)=\det A(s)\det(I+\varepsilon A^{-1}A'+o(\varepsilon))$ と $\det(I+\varepsilon B)=1+\varepsilon\operatorname{tr}B+o(\varepsilon)$ より一階式が従う。これを微分し、$(A^{-1})'=-A^{-1}A'A^{-1}$ を代入して $(\log\det A)''=\operatorname{tr}(A^{-1}A'')-\operatorname{tr}(A^{-1}A'A^{-1}A')$。
<!-- solution-end -->

#### YAU1-11-A04 一次元
- Level: A

$h=g+\varphi_{z\bar z}$、$\log(h/g)=H$ のとき $h^{-1}(\varphi_z)_{z\bar z}=H_z+g_z/g-h^{-1}g_z$ を示せ。

<!-- solution-start -->
**詳細解答。**
$\log h=H+\log g$ を $z$ 微分して $h_z/h=H_z+g_z/g$。$h_z=g_z+\partial_z(\varphi_{z\bar z})$ を代入して $h^{-1}(\varphi_z)_{z\bar z}=H_z+g_z/g-h^{-1}g_z$。
<!-- solution-end -->

### Level B

#### YAU1-11-B01 局所化
- Level: B

$B_{2r}\Subset U$ で一様 $C^{0,\alpha}$ 係数の方程式 $Lu=f$ がある。$u$ と $f$ の一様ノルムが与えられたとき、なぜ $B_r$ に一様 $C^{2,\alpha}$ 評価が得られるか述べよ。境界に接する場合の不足も説明せよ。

<!-- solution-start -->
**詳細解答。**
内点Schauder評価 $\|u\|_{C^{2,\alpha}(B_r)}\le C(\|u\|_{C^0(B_{2r})}+\|f\|_{C^{0,\alpha}(B_{2r})})$ を使用する。$C$ の依存する次元・半径・一様楕円定数・係数Hölderノルムがすべて固定されるので解ごとに変わらない。境界に接する場合は内部球が取れず、境界条件・境界の滑らかさを含む境界Schauder評価が別途必要となる。
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
$h_{i\bar j}-g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ を $g^{i\bar j}$ で縮約すれば等式となる。固定滑らかな計量 $g$ の大域Schauder評価は $\|\varphi\|_{C^{2,\alpha}}\le C(\|\varphi\|_{C^0}+\|\Delta_g\varphi\|_{C^{0,\alpha}})$。$C^0$ は前章までの評価で固定され、右辺のHölderノルムは $g^{-1}$ と $h$ のHölderノルムから固定される。平均零条件は定数核を固定する。
<!-- solution-end -->

### Level C

#### YAU1-11-C01 ブートストラップを再構成
- Level: C

$\varphi$ に一様 $C^{m+2,\alpha}$ 評価があると仮定し、$m\ge1$ で $C^{m+3,\alpha}$ に上げる際の係数、残差、未知関数、Schauder定数の依存をすべて指定せよ。また $m=0$ の開始段階が別扱いになる理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

$|\beta|=m+1$ として未知関数を $u=D^\beta\varphi$ とする。

係数 $a^{i\bar j}=h^{i\bar j}$ は $h=g+\partial\bar\partial\varphi\in C^{m,\alpha}$ と一様正値性から $C^{0,\alpha}$ 有界で、楕円定数も一定である。

$R_\beta$ の各項は $h^{-1}$ および高々 $m$ 階の $Dh$ の積で、帰納仮定によって $C^{0,\alpha}$ 一様有界。

$D^\beta(H+\log\det g)$ と $h^{-1}D^\beta g$ は固定滑らかなデータから同様に有界。

$\|u\|_{C^0}$ は $\varphi\in C^{m+2,\alpha}$ から得られる。

各固定小チャートの内点Schauder評価で $\|u\|_{C^{2,\alpha}}$ が一様になり、有限被覆で $\|\varphi\|_{C^{m+3,\alpha}}$ を得る。

$m=0$ では $D\varphi$ の $C^0$ と $h^{-1}$ のHölder性を先に確保する必要があり、固定背景Laplacianと三階評価から初期段階を独立に構成する。
<!-- solution-end -->
