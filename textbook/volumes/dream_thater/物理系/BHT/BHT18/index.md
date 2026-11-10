# BHT18 共変位相空間とNoether流

[前講の境界アンサンブル](../BHT17/index.md#def-bht17-ensembles)では、固定する電荷・電位や角運動量・角速度によって変分問題が変わることを見ました。しかし第一法則に登場する「無限遠のエネルギー」や「地平線の寄与」は、SchwarzschildやKerrの質量関数を知らない場合にどう定義するのでしょうか。

その入口が**共変位相空間**です。作用を変分して現れる境界項を捨てず、二つの摂動の組から保存流を作り、対称変換の生成量を境界面で測ります。次講ではこれを定常地平線へ適用します。本講の目標は、その前段階である微分・部分積分・符号・境界条件を自分の手で確かめることです。

時空は向き付きの4次元Lorentz多様体で符号は $(-,+,+,+)$、自然単位は $c=\hbar=k_B=1$ とし、重力定数 $G$ は残します。必要な局所計算では一般次元も許します。境界付き領域は滑らかで、角がある場合の追加項は別に扱います。

微分形式の外微分を $d$、ベクトル場 $\xi$ による内部積を $\iota_\xi$、Lie微分を $\mathcal L_\xi$ とします。$d$ は**時空方向**、$\delta$ は**解・場の配置方向**の変分であり、互いに交換すると仮定します。一般場の集合を $\phi$ と書き、計量も動的な場に含めます。

## 1. 場の方程式の隣に残る境界項

[GR11の境界変分](../../GR/GR11/index.md#thm-gr11-dirichlet-variation)では、作用の変分を内部の場の方程式と境界上の項に分けました。境界値を固定して停留させるときには境界項を相殺または消去しましたが、解の間を比較するときにはその項自身が役に立ちます。

位置 $x$ での微分同相に対して共変な**局所作用の被積分形式**を、積分できる $n$ 形式 $\mathbf L[\phi]$ として扱います。場の変分 $\delta\phi$ に対し、部分積分後のEuler–Lagrange項を $\mathbf E(\phi)\cdot\delta\phi$ と記します。これは微分方程式と変分の積であって、通常の内積を仮定しません。残りは $(n-1)$ 形式の外微分です。

<a id="def-bht18-variation"></a>

<!-- formal-statement-start -->
> **定義（共変変分とシンプレクティックポテンシャル）**\
> 向き付き $n$ 次元時空上の局所的・微分同相共変な作用密度の $n$ 形式 $\mathbf L[\phi]$ に対し、滑らかな場の変分 $\delta\phi$ が

$$
\delta\mathbf L
=\mathbf E(\phi)\cdot\delta\phi
+d\boldsymbol\theta(\phi;\delta\phi)
$$

> を満たすよう、Euler–Lagrange $n$ 形式 $\mathbf E\cdot\delta\phi$ と、$\delta\phi$ に線形な $(n-1)$ 形式 $\boldsymbol\theta$ を選ぶ。$\boldsymbol\theta$ を**シンプレクティックポテンシャル流**と呼ぶ。$\mathbf E=0$ が場の方程式である。ポテンシャルは一般に一意ではなく、$\delta\phi$ に線形な局所的 $(n-2)$ 形式 $\mathbf Y(\phi;\delta\phi)$ により $\boldsymbol\theta\mapsto\boldsymbol\theta+d\mathbf Y$ と変えても変分式は保たれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht18-variation -->
**定義の確認**：まず計量を固定した質量零の実スカラー場 $f$ だけを変分します。$*$ はこの向き付きLorentz計量によるHodge作用素であり、1形式 $\alpha,\beta$ に対して

$$
\alpha\wedge *\beta=g^{ab}\alpha_a\beta_b\,\boldsymbol\epsilon
$$

を満たすように定めます（$\boldsymbol\epsilon$ は向きと計量が決める体積形式）。ここでは計量のLorentz符号を内積にそのまま反映するため、平坦座標の時間1形式なら $dt\wedge *dt=-\boldsymbol\epsilon$ です。この章では $*$ を場の配置方向に変分しないので、$\delta(*df)=*d(\delta f)$ となります。

作用密度を $\mathbf L_f=-\tfrac12 df\wedge *df$ とすると、1形式のHodge内積の対称性により二項が等しく、積分部分を行えば

$$
\delta\mathbf L_f=-d(\delta f)\wedge *df
=\delta f\,d*df-d(\delta f\,*df).
$$

従って $\mathbf E_f\cdot\delta f=\delta f\,d*df$、$\boldsymbol\theta_f=-\delta f\,*df$ です。ここで $\boldsymbol\theta_f$ は $(n-1)$ 形式で $\delta f$ に線形です。局所座標で $(*df)_{a_2\cdots a_n}=\nabla^a f\,\epsilon_{aa_2\cdots a_n}$ と書けば

$$
d*df=(\nabla_a\nabla^a f)\,\boldsymbol\epsilon
=(\Box f)\,\boldsymbol\epsilon.
$$

従って $\mathbf E_f=0$ は波動方程式 $\Box f=0$ に対応します。固定背景でのこの例はポテンシャルを**計算する**ためのもので、任意の微分同相をゲージ対称性にする議論ではありません。後でNoether流を作るときは、計量も変換する共変な重力理論へ戻ります。
<!-- definition-example-end -->

<a id="prop-bht18-scalar"></a>

<!-- formal-statement-start -->
> **命題（固定背景スカラー場の変分と流）**\
> 向き付きLorentz時空の計量を固定し、実スカラー場 $f$ の $\mathbf L_f=-\tfrac12 df\wedge *df$ を考える。境界上で変分が滑らかとすると、ポテンシャルは $\boldsymbol\theta_f=-\delta f\,*df$ と選べる。二つの変分 $u=\delta_1 f$, $v=\delta_2f$ を独立に選ぶと、その反対称変分は

$$
\boldsymbol\omega_f(f;u,v)
=u\,*dv-v\,*du.
$$
<!-- formal-statement-end -->

### 証明の見取り図

積の微分で現れる $d(\delta f\,*df)$ が境界項です。二度目の変分では「摂動そのものを固定してもう一方を微分する」ので、$u,v$ の積のうち $*df$ に関する部分だけが残ります。

<!-- proof-start -->
### 証明

$d(\delta f\,*df)=d(\delta f)\wedge *df+\delta f\,d*df$ より

$$
-d(\delta f)\wedge *df
=\delta f\,d*df-d(\delta f\,*df).
$$

したがって上記の $\boldsymbol\theta_f$ が得られます。二変分が交換し $\delta_1v=\delta_2u=0$ となる場の配置方向の定数拡張を選べば

$$
\delta_1\boldsymbol\theta_f(v)=-v\,*du,\qquad
\delta_2\boldsymbol\theta_f(u)=-u\,*dv.
$$

差を取ると $\boldsymbol\omega_f=\delta_1\boldsymbol\theta_f(v)-\delta_2\boldsymbol\theta_f(u)=u\,*dv-v\,*du$ です。この式は $f$ がまだ波動方程式を満たさなくても代数的に成立します。
<!-- proof-end -->

## 2. 二つの摂動から流を作る

シンプレクティックポテンシャルは一つの変分に依存します。保存則に使うのは、二つの摂動を入れ替えた差です。力学の位相空間におけるシンプレクティック2形式の場の理論版ですが、境界があると切片に依存し得るため、いきなり「保存された位相空間の2形式」とは呼びません。

<a id="def-bht18-omega"></a>

<!-- formal-statement-start -->
> **定義（共変シンプレクティック流）**\
> [共変変分](#def-bht18-variation)の $\boldsymbol\theta$ に対して、場の配置上で交換する二変分 $\delta_1,\delta_2$ から $(n-1)$ 形式

$$
\boldsymbol\omega(\phi;\delta_1\phi,\delta_2\phi)
=\delta_1\boldsymbol\theta(\phi;\delta_2\phi)
-\delta_2\boldsymbol\theta(\phi;\delta_1\phi)
$$

> を定める。これを**共変シンプレクティック流**と呼ぶ。向きを付けた空間的 $(n-1)$ 次元切片 $\Sigma$ 上の候補2形式は $\Omega_\Sigma=\int_\Sigma\boldsymbol\omega$ である。積分の収束・境界流束の消滅・ゲージ方向の商などが確認されるまで、$\Omega_\Sigma$ の非退化性や切片独立性は仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht18-omega -->
**定義の確認**：固定背景スカラーでは[前節の計算](#prop-bht18-scalar)から $\boldsymbol\omega_f=u\,*dv-v\,*du$ です。1形式のHodge双対を使い、$\boldsymbol\omega_f=\omega^a\boldsymbol\epsilon_a$ と書けば、成分は

$$
\omega^a=u\nabla^av-v\nabla^au
$$

です。これはベクトルの座標成分を唐突に導入したものではなく、$*du=(\nabla^au)\boldsymbol\epsilon_a$ から従います。入れ替えると $\boldsymbol\omega_f(v,u)=-\boldsymbol\omega_f(u,v)$、同じ摂動二つなら零です。さらに $u,v$ がどちらも $d*du=d*dv=0$ を満たせば、

$$
d\boldsymbol\omega_f=d u\wedge *dv-d v\wedge *du+u\,d*dv-v\,d*du=0.
$$

最初の二項は1形式のHodge内積の対称性から消えます。残る二項は**線形化波動方程式**によって消えます。
<!-- definition-example-end -->

<a id="thm-bht18-conservation"></a>

<!-- formal-statement-start -->
> **定理（線形化解上のシンプレクティック流保存）**\
> $\delta\mathbf L=\mathbf E\cdot\delta\phi+d\boldsymbol\theta$ を満たす滑らかな局所作用を考える。背景が $\mathbf E(\phi)=0$ を満たし、二つの交換可能な摂動が線形化方程式 $\delta_1\mathbf E=\delta_2\mathbf E=0$ を満たすなら

$$
d\boldsymbol\omega(\phi;\delta_1\phi,\delta_2\phi)=0.
$$

> 二切片 $\Sigma_1,\Sigma_2$ と側面 $B$ で囲まれた領域 $U$ に対し、向きが $\partial U=\Sigma_2-\Sigma_1+B$ なら

$$
\Omega_{\Sigma_2}-\Omega_{\Sigma_1}
=-\int_B\boldsymbol\omega.
$$

> 従って側面流束が零のときに限り、この領域で切片積分が保存される。
<!-- formal-statement-end -->

### 証明の見取り図

同じ $\mathbf L$ を二通りの順番で変分し、差を取ります。二階変分の可換性からゼロになる左辺と、Euler–Lagrange項の線形化との差が流の発散です。最後にStokesの定理を適用します。

<!-- proof-start -->
### 証明

まず $\delta_2\mathbf L=\mathbf E\cdot\delta_2\phi+d\boldsymbol\theta(\delta_2\phi)$ を $\delta_1$ で微分すると

$$
\delta_1\delta_2\mathbf L
=(\delta_1\mathbf E)\cdot\delta_2\phi
+\mathbf E\cdot\delta_1\delta_2\phi
+d[\delta_1\boldsymbol\theta(\delta_2\phi)].
$$

添字 $1,2$ を逆にした式を引き、$\delta_1\delta_2\mathbf L=\delta_2\delta_1\mathbf L$ と $\delta_1\delta_2\phi=\delta_2\delta_1\phi$ を使うと

$$
d\boldsymbol\omega
=(\delta_2\mathbf E)\cdot\delta_1\phi
-(\delta_1\mathbf E)\cdot\delta_2\phi.
$$

二摂動が線形化方程式を満たすので右辺は零です。さらに [Stokesの定理](../../../幾何系/VC/VC5/index.md#thm-vc5-stokes) を微分形式で用いると

$$
0=\int_Ud\boldsymbol\omega
=\int_{\Sigma_2}\boldsymbol\omega
-\int_{\Sigma_1}\boldsymbol\omega+\int_B\boldsymbol\omega.
$$

移項して主張を得ます。**背景が解であるだけでは足りず、二摂動が線形化解であること**、および切片比較には側面の流束条件が必要です。
<!-- proof-end -->

**何が保存されないか**：境界で外向きにシンプレクティック流が出れば $\Omega_{\Sigma_2}\ne\Omega_{\Sigma_1}$ です。また $\delta_1\mathbf E\ne0$ なら、すでに局所的に $d\boldsymbol\omega$ が零とは限りません。ブラックホールの無限遠・壁・地平線の扱いを同一視してはいけない理由です。

## 3. 微分同相からNoether流を作る

次は「二つの摂動の組」ではなく「一つの対称変換」に注目します。任意の滑らかなベクトル場 $\xi^a$ が作る微分同相は、動的計量を含む共変理論の場に $\delta_\xi\phi=\mathcal L_\xi\phi$ を生じます。局所的に $\xi$ を固定して変分すること、特に場依存の $\xi(\phi)$ はこの講の恒等式へそのまま代入しないことを約束します。

[Cartanの公式](../../../幾何系/GEO/GEO7/index.md#thm-geo7-cartan-formula) $\mathcal L_\xi\alpha=d(\iota_\xi\alpha)+\iota_\xi(d\alpha)$ を使います。$\mathbf L$ は$n$ 次元上の最高次形式なので $d\mathbf L=0$、従って $\mathcal L_\xi\mathbf L=d(\iota_\xi\mathbf L)$ です。この恒等式が「局所変換の影響は境界へ押し出せる」という核心になります。

<a id="def-bht18-noether"></a>

<!-- formal-statement-start -->
> **定義（微分同相Noether流とNoether電荷）**\
> 計量を含む動的場 $\phi$ の微分同相共変な局所作用の $n$ 形式について、場に依存しない滑らかなベクトル場 $\xi$ を選ぶ。[ポテンシャル](#def-bht18-variation)を用いて $(n-1)$ 形式

$$
\mathbf J_\xi
=\boldsymbol\theta(\phi;\mathcal L_\xi\phi)
-\iota_\xi\mathbf L
$$

> を**Noether流**と呼ぶ。場の方程式の上で $d\mathbf J_\xi=0$ のとき、少なくとも収縮可能な近傍で $\mathbf J_\xi=d\mathbf Q_\xi$ となる $(n-2)$ 形式 $\mathbf Q_\xi$ を**Noether電荷形式**と呼ぶ。大域的な存在・正規化と、積分値がHamiltonian保存量であるかは追加の問題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht18-noether -->
**定義の確認**：Einstein真空の平坦Minkowski時空では $R=0$ です。定数時間並進 $\xi=\partial_t$ は計量を変えないので、定義の二項を別々に確かめると

$$
\mathcal L_\xi g=0,\qquad
\boldsymbol\theta(g;\mathcal L_\xi g)=0,\qquad
\iota_\xi\mathbf L_{\rm EH}=0.
$$

従って $\mathbf J_\xi=0$ であり、その局所電荷形式として $\mathbf Q_\xi=0$ を選べます。$\xi^\flat=g_{ab}\xi^b dx^a$ を計量双対1形式と書けば、この例では $\xi^\flat=-dt$ です。後で導く[Einstein電荷公式](#prop-bht18-einstein-q)でも $d\xi^\flat=0$ から同じ電荷形式が得られます。流が零でも「任意の時空・任意の境界でエネルギーが零」という意味にはなりません。
<!-- definition-example-end -->

<a id="thm-bht18-noether-closure"></a>

<!-- formal-statement-start -->
> **定理（Noether流の発散とon-shell閉性）**\
> 微分同相共変な $\mathbf L$、$\boldsymbol\theta$、場に依存しない $\xi$ について、任意の滑らかな場配置（off shell）で

$$
d\mathbf J_\xi=-\mathbf E(\phi)\cdot\mathcal L_\xi\phi.
$$

> 従って場の方程式 $\mathbf E=0$ の上（on shell）では $d\mathbf J_\xi=0$ であり、収縮可能な開集合上で $\mathbf J_\xi=d\mathbf Q_\xi$ を選べる。単に対称性があることからoff shellで閉じるとは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

変分公式に $\delta\phi=\mathcal L_\xi\phi$ を代入し、微分同相共変性から得られる $\mathcal L_\xi\mathbf L=d(\iota_\xi\mathbf L)$ を同じ式へ代入します。

<!-- proof-start -->
### 証明

[共変変分式](#def-bht18-variation)へLie変分を代入すると

$$
\mathcal L_\xi\mathbf L
=\mathbf E(\phi)\cdot\mathcal L_\xi\phi
+d\boldsymbol\theta(\phi;\mathcal L_\xi\phi).
$$

他方、作用の被積分形式が微分同相共変なので $\delta_\xi\mathbf L=\mathcal L_\xi\mathbf L$ です。[Cartanの公式](../../../幾何系/GEO/GEO7/index.md#thm-geo7-cartan-formula)と最高次形式性から左辺は $d(\iota_\xi\mathbf L)$。従って

$$
d[\boldsymbol\theta(\phi;\mathcal L_\xi\phi)-\iota_\xi\mathbf L]
=-\mathbf E(\phi)\cdot\mathcal L_\xi\phi.
$$

角括弧が $\mathbf J_\xi$ です。$\mathbf E=0$ なら閉形式となり、局所的には[Poincaréの補題](../../../幾何系/GEO/GEO9/index.md#thm-geo9-poincare-lemma)で $\mathbf J_\xi=d\mathbf Q_\xi$ を得ます。非自明な位相の領域での大域的電荷形式はこの補題だけからは従いません。
<!-- proof-end -->

### Einstein重力で電荷の係数を固定する

抽象的な $\mathbf Q_\xi$ を一つ具体化します。向きと体積形式を $\boldsymbol\epsilon$ とし、$\boldsymbol\epsilon_a=\iota_{\partial_a}\boldsymbol\epsilon$、$\boldsymbol\epsilon_{ab}$ は二回の縮約に対応する形式とします。計量の変分を $h_{ab}=\delta g_{ab}$、$h=g^{ab}h_{ab}$ とします。以下の四次元Einstein–Hilbert作用はLorentz符号で

$$
\mathbf L_{\rm EH}=\frac{R}{16\pi G}\boldsymbol\epsilon.
$$

外部境界でDirichlet変分を行うときは[GR11のGHY境界項](../../GR/GR11/index.md#def-gr11-ghy-action)も必要ですが、まずバルクの局所恒等式を計算します。

<a id="prop-bht18-einstein-q"></a>

<!-- formal-statement-start -->
> **命題（Einstein–HilbertのNoether電荷）**\
> 向き付き4次元Lorentz時空、計量符号 $(-,+,+,+)$、$\mathbf L_{\rm EH}=R\boldsymbol\epsilon/(16\pi G)$ に対し、$h_{ab}=\delta g_{ab}$ とおく。シンプレクティックポテンシャルの一つは

$$
\boldsymbol\theta_{\rm EH}(g;h)=\frac1{16\pi G}
\boldsymbol\epsilon_a(\nabla_bh^{ab}-\nabla^ah).
$$

> 場に依存しない $\xi^a$ のNoether電荷として

$$
(\mathbf Q_\xi)_{ab}
=-\frac{1}{16\pi G}\epsilon_{abcd}\nabla^c\xi^d
$$

> を選べる。このとき

$$
\mathbf J_\xi=d\mathbf Q_\xi
+\frac1{8\pi G}G^a{}_b\xi^b\,\boldsymbol\epsilon_a.
$$

> 従ってEinstein真空方程式 $G_{ab}=0$ の上で $\mathbf J_\xi=d\mathbf Q_\xi$ となる。$\mathbf Q_\xi$ 自体の閉性は一般には要求しない。
<!-- formal-statement-end -->

### 証明の見取り図

変分公式のポテンシャルは接続の変分 $\delta\Gamma$ の微分部分から出ます。$h=\mathcal L_\xi g$ を代入して $\mathbf J_\xi$ を計算し、反対称な $\nabla^{[a}\xi^{b]}$ の発散と差を取ると Einstein テンソルが残ります。

<!-- proof-start -->
### 証明

計量変分から $\delta g^{ab}=-h^{ab}$、$\delta\boldsymbol\epsilon=\tfrac12h\boldsymbol\epsilon$、接続変分から

$$
\delta\Gamma^a{}_{bc}=\frac12g^{ad}
(\nabla_bh_{cd}+\nabla_ch_{bd}-\nabla_dh_{bc})
$$

を得ます。$R=g^{ab}R_{ab}$ を変分し、[GR10のPalatini恒等式](../../GR/GR10/index.md#lem-gr10-palatini) $\delta R_{ab}=\nabla_c\delta\Gamma^c{}_{ab}-\nabla_b\delta\Gamma^c{}_{ac}$ を使います。上式の $\delta\Gamma$ を代入すると

$$
g^{ab}\delta R_{ab}=\nabla_a(\nabla_bh^{ab}-\nabla^ah),
\qquad \delta R=-R^{ab}h_{ab}+g^{ab}\delta R_{ab}.
$$

これと体積形式の変分を合わせ、$-R^{ab}h_{ab}+Rh/2=-G^{ab}h_{ab}$ を用いれば

$$
\delta\mathbf L_{\rm EH}
=-\frac1{16\pi G}G^{ab}h_{ab}\boldsymbol\epsilon
+\frac1{16\pi G}d[\boldsymbol\epsilon_a(\nabla_bh^{ab}-\nabla^ah)].
$$

ここで $h_{ab}=\mathcal L_\xi g_{ab}=\nabla_a\xi_b+\nabla_b\xi_a$、$h=2\nabla_b\xi^b$ を代入します。曲率の交換子 $\nabla_b\nabla^a\xi^b-\nabla^a\nabla_b\xi^b=R^a{}_b\xi^b$ を使うと、ポテンシャルの係数ベクトルは

$$
\nabla_bh^{ab}-\nabla^ah
=\Box\xi^a-\nabla^a(\nabla_b\xi^b)+R^a{}_b\xi^b.
$$

$\iota_\xi\mathbf L_{\rm EH}=R\xi^a\boldsymbol\epsilon_a/(16\pi G)$ なので、$\mathbf J_\xi$ の係数は上式から $R\xi^a$ を引いたものです。反対称テンソル $F^{ba}=\nabla^b\xi^a-\nabla^a\xi^b$ の発散は

$$
\nabla_bF^{ba}
=\Box\xi^a-\nabla^a(\nabla_b\xi^b)-R^a{}_b\xi^b.
$$

この発散に対応する2形式を確認します。先の計量双対1形式 $\xi^\flat$ の $d\xi^\flat$ は反対称な一階微分です。Hodge双対と体積形式の規約から

$$
(*d\xi^\flat)_{ab}=\epsilon_{abcd}\nabla^c\xi^d,
\qquad \mathbf Q_\xi=-\frac1{16\pi G}*d\xi^\flat
$$

と選びます。$\mathbf Q_\xi=\tfrac12(\mathbf Q_\xi)_{ab}dx^a\wedge dx^b$ として外微分すると

$$
d\mathbf Q_\xi=\frac1{16\pi G}(\nabla_bF^{ba})\boldsymbol\epsilon_a.
$$

ここで $\boldsymbol\epsilon_a=\iota_{\partial_a}\boldsymbol\epsilon$ であり、単に反対称成分を書くだけでなく、$d\mathbf Q_\xi$ が先の発散の体積形式であることまで確かめました。$\mathbf J_\xi$ との係数差は

$$
\frac1{16\pi G}(2R^a{}_b-R\delta^a_b)\xi^b
=\frac1{8\pi G}G^a{}_b\xi^b.
$$

よって主張が成立します。電荷形式の符号は $\epsilon_{abcd}$ の向きと、Noether流に採用した $-\iota_\xi\mathbf L$ の符号と整合しています。
<!-- proof-end -->

**直接例：平坦時空でのboost**。Minkowski座標 $(t,x,y,z)$、$\epsilon_{txyz}=+1$、$\xi=x\partial_t+t\partial_x$ とします。$\xi^\flat=-x\,dt+t\,dx$ なので $d\xi^\flat=2dt\wedge dx$。$\nabla^t\xi^x=-1$、$\nabla^x\xi^t=1$ から

$$
(\mathbf Q_\xi)_{yz}
=-\frac1{16\pi G}[
\epsilon_{yztx}(-1)+\epsilon_{yzxt}(1)]
=\frac1{8\pi G}.
$$

したがって一定の $y,z$ 領域を横切る2形式は $\mathbf Q_\xi=dy\wedge dz/(8\pi G)$ です（$y,z$ の向きをこの順に選ぶ）。この電荷密度は一定でも $d\mathbf Q_\xi=0$、従って真空の $\mathbf J_\xi=0$ と矛盾しません。**閉じた曲面の電荷積分と、開いた面片の積分は別の量**です。

## 4. 電荷を変分して境界のHamiltonianへ

Noether流が閉じていても、その面積分 $\int_S\mathbf Q_\xi$ が直ちに保存エネルギーになるわけではありません。変分に境界ポテンシャルの寄与が残るため、二つを組み合わせます。

<a id="def-bht18-surface"></a>

<!-- formal-statement-start -->
> **定義（表面Hamiltonian変分）**\
> 動的場の解 $\phi$、線形化方程式を満たす $\delta\phi$、場に依存しないベクトル場 $\xi$ と向き付き閉じた $(n-2)$ 次元面 $S$ に対し、局所Noether電荷が選ばれているとする。[Noether電荷](#def-bht18-noether)と[ポテンシャル](#def-bht18-variation)から

$$
\mathbf k_\xi(\phi;\delta\phi)
=\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta(\phi;\delta\phi),
\qquad \delta H_\xi[S]=\int_S\mathbf k_\xi
$$

> を定義する。$\delta H_\xi[S]$ は解空間上の**1形式の候補**である。これを実際の関数 $H_\xi$ の微分として積分するには、有限性・境界条件・解空間での積分可能性を別途示す。異なる面で評価した値を等しいとするには、さらに対応する流束・拘束条件が要る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht18-surface -->
**定義の確認**：境界が二つの成分 $S_\infty$ と $S_H$ を持つ空間切片 $\Sigma$ の向きを $\partial\Sigma=S_\infty-S_H$ とすると、$\int_{\partial\Sigma}\mathbf k_\xi=\int_{S_\infty}\mathbf k_\xi-\int_{S_H}\mathbf k_\xi$ です。両者を同じ符号で足せば境界の向きが誤ります。また $\xi|_{S_H}=0$ ならその面で $\iota_\xi\boldsymbol\theta=0$ ですが、$\delta\mathbf Q_\xi$ は $\nabla\xi$ に依存するため一般に零ではありません。
<!-- definition-example-end -->

<a id="thm-bht18-boundary"></a>

<!-- formal-statement-start -->
> **定理（共変位相空間の境界変分恒等式）**\
> 微分同相共変な局所作用密度と共変に選んだ $\boldsymbol\theta$ を考える。背景が $\mathbf E=0$ を満たし、$\delta\mathbf E=0$ を満たす摂動 $\delta\phi$、場に依存しない $\xi$ を固定する。on shellで $\mathbf J_\xi=d\mathbf Q_\xi$ が局所的に成立する領域では

$$
d\left[\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta(\phi;\delta\phi)\right]
=\boldsymbol\omega(\phi;\delta\phi,\mathcal L_\xi\phi).
$$

> 従って $\Sigma$ とその境界で積分が定義できるなら

$$
\int_\Sigma\boldsymbol\omega(\delta\phi,\mathcal L_\xi\phi)
=\int_{\partial\Sigma}\left(\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta\right).
$$

> 特に $\mathcal L_\xi\phi=0$ の厳密対称背景では右辺の**全境界成分の向き付き和**が零になる。これは各成分の積分が個別に零であるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta\mathbf J_\xi$ を直接変分する方法と、on shellの $\mathbf J_\xi=d\mathbf Q_\xi$ を変分する方法で比較します。二つの差は $\boldsymbol\omega$ と $\iota_\xi\boldsymbol\theta$ の外微分です。

<!-- proof-start -->
### 証明

まず $\xi$ を固定して

$$
\delta\mathbf J_\xi
=\delta[\boldsymbol\theta(\mathcal L_\xi\phi)]
-\iota_\xi\delta\mathbf L.
$$

$\boldsymbol\omega$ の定義とポテンシャルの微分同相共変性から

$$
\delta[\boldsymbol\theta(\mathcal L_\xi\phi)]
=\boldsymbol\omega(\delta\phi,\mathcal L_\xi\phi)
+\mathcal L_\xi\boldsymbol\theta(\delta\phi).
$$

実際、$\omega$ の第二項は $\delta_\xi\boldsymbol\theta(\delta\phi)$ で、$\xi$ が場に依存しなければ変分 $\delta\phi$ のLie変換も含めて $\mathcal L_\xi\boldsymbol\theta(\delta\phi)$ に等しいからです。[共変変分式](#def-bht18-variation)の $\delta\mathbf L=\mathbf E\cdot\delta\phi+d\boldsymbol\theta$ とCartan公式を代入すれば

$$
\begin{aligned}
\delta\mathbf J_\xi
&=\boldsymbol\omega+\mathcal L_\xi\boldsymbol\theta
-\iota_\xi(\mathbf E\cdot\delta\phi)
-\iota_\xi d\boldsymbol\theta\\
&=\boldsymbol\omega+d(\iota_\xi\boldsymbol\theta)
-\iota_\xi(\mathbf E\cdot\delta\phi).
\end{aligned}
$$

背景が on shell なら最後の項は零です。ただし「on shell で $\mathbf J_\xi=d\mathbf Q_\xi$」という等式を、任意の場方向にそのまま微分することはできません。ここで線形化方程式を使う理由を確認します。

微分同相生成変分 $\mathcal L_\xi\phi$ は局所場と $\xi$ の有限階微分から作られます。$\mathbf E\cdot\mathcal L_\xi\phi$ を $\xi$ の微分について部分積分すると、$\xi$ に比例する項と $d\mathbf B_\xi(\mathbf E)$ に分かれます。コンパクト台の任意の $\xi$ に対する作用の微分同相不変性から、前者はNoether恒等式によって零です。従って

$$
\mathbf E\cdot\mathcal L_\xi\phi=d\mathbf B_\xi(\mathbf E),
\qquad d(\mathbf J_\xi+\mathbf B_\xi)=0.
$$

$\mathbf B_\xi$ は $\mathbf E$ とその微分に線形なので、局所的に $\mathbf J_\xi=d\mathbf Q_\xi-\mathbf B_\xi$ と選ぶと、背景で $\mathbf B_\xi=0$、線形化解について $\delta\mathbf B_\xi=0$ です。Einstein重力では[先の命題](#prop-bht18-einstein-q)の $\mathbf B_\xi=-(8\pi G)^{-1}G^a{}_b\xi^b\boldsymbol\epsilon_a$ が具体例です。この形で初めて、$\delta\mathbf J_\xi=d(\delta\mathbf Q_\xi)$ と置けます。両式を比べて

$$
d(\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta)
=\boldsymbol\omega
$$

を得ます。Stokesの定理で積分版を得ます。最後の結論は $\mathcal L_\xi\phi=0$ を代入するだけですが、**境界面の間の関係**が残ります。
<!-- proof-end -->

この式は第一法則への橋です。定常ブラックホールで $\xi$ を地平線生成Killing場とすると $\mathcal L_\xi\phi=0$ であり、無限遠と地平線の境界項の関係が生まれます。ただし地平線の分岐面、規格化、電磁場のゲージ選択、許容摂動の条件を揃える作業は次講で行います。

### 完全微分を足しても物理的変分は変わるか

局所作用の境界項選択には自由度があります。[BHT13の作用・境界値問題](../BHT13/index.md#def-bht13-euclidean-action)で現れた「境界で何を固定するか」と同様、今回も各形式単独ではなく組合せを検査します。

<a id="prop-bht18-shift"></a>

<!-- formal-statement-start -->
> **命題（完全微分による作用変更の不変性）**\
> $n$ 次元の微分同相共変な $\mathbf L$ に対し、場から共変に作られる $(n-1)$ 形式 $\boldsymbol\mu$ を選んで $\mathbf L'=\mathbf L+d\boldsymbol\mu$ とする。$\xi$ は場に依存しないものとする。このとき

$$
\boldsymbol\theta'=\boldsymbol\theta+\delta\boldsymbol\mu,\quad
\mathbf J'_\xi=\mathbf J_\xi+d(\iota_\xi\boldsymbol\mu),\quad
\mathbf Q'_\xi=\mathbf Q_\xi+\iota_\xi\boldsymbol\mu
$$

> と選べる。従って $\mathbf k'_\xi=\delta\mathbf Q'_\xi-\iota_\xi\boldsymbol\theta'=\mathbf k_\xi$ である。これは $\boldsymbol\theta\mapsto\boldsymbol\theta+d\mathbf Y$ など全ての曖昧さが自動的に消えるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

完全微分の変分とLie微分を順に展開します。$\iota_\xi\boldsymbol\mu$ に対する $\delta$ と $\iota_\xi$ の交換には、$\delta\xi=0$ を使います。

<!-- proof-start -->
### 証明

$$
\delta\mathbf L'=\delta\mathbf L+d(\delta\boldsymbol\mu)
=\mathbf E\cdot\delta\phi+d(\boldsymbol\theta+\delta\boldsymbol\mu).
$$

よって第一式が成立します。次に

$$
\begin{aligned}
\mathbf J'_\xi-\mathbf J_\xi
&=\delta_\xi\boldsymbol\mu-\iota_\xi d\boldsymbol\mu\\
&=\mathcal L_\xi\boldsymbol\mu-\iota_\xi d\boldsymbol\mu
=d(\iota_\xi\boldsymbol\mu)
\end{aligned}
$$

です（[Cartanの公式](../../../幾何系/GEO/GEO7/index.md#thm-geo7-cartan-formula)を $\boldsymbol\mu$ に適用）。従って $\mathbf Q'_\xi$ を記載のように選べます。最後に

$$
\begin{aligned}
\mathbf k'_\xi-\mathbf k_\xi
&=\delta(\iota_\xi\boldsymbol\mu)-\iota_\xi(\delta\boldsymbol\mu)\\
&=\iota_\xi(\delta\boldsymbol\mu)-\iota_\xi(\delta\boldsymbol\mu)=0.
\end{aligned}
$$

ここでは $\xi$ が変分で変化しないことと、$\boldsymbol\mu$ が共変に変換することを両方使っています。
<!-- proof-end -->

## 5. どこまで導いたか

この講で手に入れたのは、場とその摂動から**局所流・表面変分を構成する道具**です。Hamiltonianの有限値、Noether電荷の絶対規格化、エントロピー、第二法則まで確定したわけではありません。

| 式・構成 | 必要な条件 | まだ導けないこと |
| --- | --- | --- |
| $\delta L=E\delta\phi+d\theta$ | 局所作用と部分積分 | 境界での停留条件 |
| $d\omega=0$ | 背景方程式と二つの線形化方程式 | 境界流束がある場合の切片保存 |
| $dJ_\xi=-E\mathcal L_\xi\phi$ | 計量も動的な微分同相共変性 | off shellでの閉性 |
| $J_\xi=dQ_\xi$ | on shell、少なくとも局所領域 | $Q_\xi$ の一意性・大域的存在 |
| $\delta H_\xi=\int_S(\delta Q_\xi-\iota_\xi\theta)$ | 許容摂動、境界、有限性 | 解空間で積分可能な $H_\xi$ の存在 |
| $\int_{\partial\Sigma}k_\xi=0$ | 厳密対称背景と線形化摂動 | 各境界積分の個別消滅 |

境界で流束が消えるかどうか、ゲージ方向をどう商に取るか、表面1形式が積分可能かどうかは物理的な境界条件次第です。たとえば $\delta H_\xi$ が解空間の閉じた1形式でなければ、異なる変分経路で積分した「エネルギー」が一致しません。そこで「Noether流があるから保存電荷がある」という短絡を避け、**局所恒等式 → 境界条件 → 可積分な電荷**の三段を守ります。

## 6. 演習――境界項を追い切る

### Level A：部分積分、反対称性、発散

<a id="ex-bht18-a01"></a>

#### BHT18-A01 スカラー作用の部分積分

- Level: A
- 問題: 固定した2次元Lorentz計量上で $\mathbf L=-\tfrac12df\wedge*df$ とする。$d(\delta f\,*df)$ を展開し、Euler–Lagrange項と $\theta$ を決めよ。

<!-- solution-start -->
**詳細解答**：計量固定なので $\delta(*df)=*d(\delta f)$ です。1形式のHodge内積の対称性を使えば

$$
\delta\mathbf L=-\frac12[d(\delta f)\wedge*df+df\wedge*d(\delta f)]
=-d(\delta f)\wedge*df.
$$

$d(\delta f\,*df)=d(\delta f)\wedge*df+\delta f\,d*df$ を移項し、$\delta\mathbf L=\delta f\,d*df-d(\delta f\,*df)$ とします。従って $E_f=d*df$、$\theta=-\delta f\,*df$。任意の境界値変分に対し境界項が自動的に零になるわけではありません。
<!-- solution-end -->

<a id="ex-bht18-a02"></a>

#### BHT18-A02 シンプレクティック流の反対称性

- Level: A
- 問題: $u,v$ を固定背景のスカラー摂動とする。$\omega_f(u,v)=u*dv-v*du$ から $\omega_f(v,u)$ と $\omega_f(u,u)$ を求めよ。$u=v$ を取ったときだけで保存則が成立するという主張は正しいか。

<!-- solution-start -->
**詳細解答**：入替えれば $\omega_f(v,u)=v*du-u*dv=-\omega_f(u,v)$、同じ摂動では $\omega_f(u,u)=u*du-u*du=0$ です。しかし $\omega_f(u,u)=0$ は任意の $u$ で代数的に成立します。異なる二つの摂動について $d\omega_f=0$ とするには、[保存定理](#thm-bht18-conservation)のように両方が線形化方程式を満たす必要があります。
<!-- solution-end -->

<a id="ex-bht18-a03"></a>

#### BHT18-A03 保存流の直接微分

- Level: A
- 問題: 1+1次元の平坦計量 $ds^2=-dt^2+dx^2$ で、波動方程式を満たす $u=t$, $v=x$ を考える。$\omega^a=u\nabla^av-v\nabla^au$ の成分と $\partial_a\omega^a$ を求めよ。

<!-- solution-start -->
**詳細解答**：逆計量は $g^{tt}=-1$, $g^{xx}=1$ です。したがって

$$
\nabla^tu=-\partial_tu=-1,\quad \nabla^xv=1,\quad
\nabla^tv=\nabla^xu=0
$$

であり、[Hodge双対から得た成分表示](#def-bht18-omega)に代入すると

$$
\omega^t=t\cdot0-x(-1)=x,\qquad
\omega^x=t\cdot1-x\cdot0=t.
$$

従って $\partial_t\omega^t+\partial_x\omega^x=\partial_t x+\partial_x t=0$ です。両摂動は $\Box t=\Box x=0$、滑らかであるため、[線形化保存定理](#thm-bht18-conservation)の具体例になっています。無限空間での流束積分は収束しないので、有限領域で考えます。
<!-- solution-end -->

<a id="ex-bht18-a04"></a>

#### BHT18-A04 Noether流が閉じる条件

- Level: A
- 問題: 微分同相共変な $\mathbf L$ で $\delta_\xi\mathbf L=\mathcal L_\xi\mathbf L=d(\iota_\xi\mathbf L)$ とする。$\delta_\xi\phi=\mathcal L_\xi\phi$ を変分式へ代入して $dJ_\xi$ を求め、off shellとon shellを区別せよ。

<!-- solution-start -->
**詳細解答**：変分式から $d(\iota_\xi\mathbf L)=\mathbf E\cdot\mathcal L_\xi\phi+d\theta(\mathcal L_\xi\phi)$。$d$ の項を片側へまとめ、

$$
d[\theta(\mathcal L_\xi\phi)-\iota_\xi\mathbf L]
=-\mathbf E\cdot\mathcal L_\xi\phi.
$$

左辺は $dJ_\xi$ です。off shellで $\mathbf E\ne0$ のとき右辺を勝手に零にできません。on shellで $\mathbf E=0$ なら閉じます。[Noether流の発散定理](#thm-bht18-noether-closure)の基本形です。
<!-- solution-end -->

<a id="ex-bht18-a05"></a>

#### BHT18-A05 向き付き二つの境界

- Level: A
- 問題: 空間切片の境界が $\partial\Sigma=S_\infty-S_H$ と与えられる。$\mathcal L_\xi\phi=0$ なら二つの $\int k_\xi$ について何が従うか。どちらも零だと結論してよいか。

<!-- solution-start -->
**詳細解答**：[境界変分恒等式](#thm-bht18-boundary)の左辺は $\omega(\delta\phi,0)=0$ です。よって

$$
0=\int_{\partial\Sigma}k_\xi
=\int_{S_\infty}k_\xi-\int_{S_H}k_\xi.
$$

従うのは $\int_{S_\infty}k_\xi=\int_{S_H}k_\xi$ であり、個別の零ではありません。二つの面でそれぞれ非零の共通値を持っても等式を満たします。向きの符号と「和が零」と「各項が零」の違いが要点です。
<!-- solution-end -->

### Level B：線形化条件と電荷の曖昧さ

<a id="ex-bht18-b01"></a>

#### BHT18-B01 線形化方程式を外したとき

- Level: B
- 問題: 固定背景質量零スカラーに対し $u=t^2$, $v=1$ を1+1次元Minkowski上で考える。$d\omega_f$ を計算し、なぜ保存定理を適用できないか説明せよ。$d*du=(\Box u)\epsilon$、$\Box=-\partial_t^2+\partial_x^2$ の記法を使ってよい。

<!-- solution-start -->
**詳細解答**：$d\omega_f=u\,d*dv-v\,d*du$ です。$v=1$ なので $dv=0$、$\Box v=0$、一方 $\Box u=-2$ です。従って

$$
d\omega_f=(u\Box v-v\Box u)\epsilon
=[t^2\cdot0-1\cdot(-2)]\epsilon=2\epsilon.
$$

また成分 $\omega^a=u\nabla^av-v\nabla^au=-\nabla^a u$ から $\partial_a\omega^a=-\Box u=2$ と独立に一致します。$u$ が線形化波動方程式を満たさないため、[保存定理](#thm-bht18-conservation)の仮定が欠けています。背景 $f=0$ が解であることだけでは足りません。
<!-- solution-end -->

<a id="ex-bht18-b02"></a>

#### BHT18-B02 Einstein電荷の平坦例

- Level: B
- 問題: 4次元Minkowski計量と向き $\epsilon_{txyz}=+1$ を取り、$\xi=x\partial_t+t\partial_x$ とする。$\xi^\flat$ と $d\xi^\flat$、$Q_{yz}$ を計算せよ。同じ背景で $\xi=\partial_t$ に替えると何が変わるか。

<!-- solution-start -->
**詳細解答**：計量を下げて $\xi^\flat=-xdt+t dx$ です。積の外微分を取ると

$$
d\xi^\flat=-dx\wedge dt+dt\wedge dx=2dt\wedge dx.
$$

ここで $\nabla^t\xi^x=-1$, $\nabla^x\xi^t=1$ です。向きの規約から $\epsilon_{yztx}=1$, $\epsilon_{yzxt}=-1$ であり、これらを[Einstein電荷公式](#prop-bht18-einstein-q)に代入して

$$
Q_{yz}=-\frac1{16\pi G}[1(-1)+(-1)(1)]
=\frac1{8\pi G}.
$$

一方 $\partial_t$ では $\xi^\flat=-dt$ は定数係数で $d\xi^\flat=0$、従って $Q_{ab}=0$。計量と曲率が同じ零でも、電荷形式は選んだ生成場の一階微分に依存するため異なります。面片上の値を大域的質量と混同しません。
<!-- solution-end -->

<a id="ex-bht18-b03"></a>

#### BHT18-B03 完全微分による作用密度変更

- Level: B
- 問題: $\mathbf L'=\mathbf L+d\mu$ とし、$\xi$ を場に依存しない固定ベクトル場とする。$\theta'$、$J'_\xi$、$Q'_\xi$ を順に決め、$k'_\xi-k_\xi$ が零になることを示せ。$\mu$ は共変に変換すると仮定する。

<!-- solution-start -->
**詳細解答**：まず $\delta L'=\delta L+d\delta\mu=E\delta\phi+d(\theta+\delta\mu)$ より $\theta'=\theta+\delta\mu$。次に

$$
J'_\xi-J_\xi=\mathcal L_\xi\mu-\iota_\xi d\mu
=d(\iota_\xi\mu)
$$

なので $Q'_\xi=Q_\xi+\iota_\xi\mu$ を選びます。最後に $\delta\xi=0$ から $\delta\iota_\xi\mu=\iota_\xi\delta\mu$ とでき、

$$
k'_\xi-k_\xi
=\delta(\iota_\xi\mu)-\iota_\xi\delta\mu=0.
$$

これは[完全微分の不変性](#prop-bht18-shift)の再構成です。もし $\delta\xi\ne0$ なら一般に追加項 $\iota_{\delta\xi}\mu$ が現れ、この証明を流用できません。
<!-- solution-end -->

<a id="ex-bht18-b04"></a>

#### BHT18-B04 境界での積分可能性

- Level: B
- 問題: 解の二パラメータ領域 $(a,b)$ で、ある境界Hamiltonianの候補が $\delta H=b\,\delta a$ となったとする。$(0,0)$ から $(1,1)$ への経路「$a$ を先に変え次に $b$」と「$b$ を先に変え次に $a$」で線積分を求めよ。何が欠けているか説明せよ。

<!-- solution-start -->
**詳細解答**：先に $a:0\to1$ を動かす経路では $b=0$ なので $\int b\,da=0$、続く $b$ 方向では $da=0$ で合計零です。先に $b:0\to1$ を動かすとその間 $da=0$ ですが、続く $a$ 方向では $b=1$ なので

$$
\int_0^1 b\,da=\int_0^1 1\,da=1.
$$

同じ両端で値が $0,1$ と違います。実際、解空間の外微分は $d_{\rm sol}(b\,da)=db\wedge da\ne0$ です。局所的な[表面Hamiltonian変分](#def-bht18-surface)が計算できても、解空間で閉じた1形式という積分可能性条件がなければ $H$ は定義できません。
<!-- solution-end -->

### Level C：共変変分から第一法則の前段へ

<a id="ex-bht18-c01"></a>

#### BHT18-C01 二つの切片・二つの境界を統合する

- Level: C
- 問題: 微分同相共変理論の滑らかな背景解 $\phi$ と線形化解 $\delta\phi$ を考える。場に依存しない $\xi$ に対し、(i) $\delta L=E\delta\phi+d\theta$ と $J_\xi=\theta(\mathcal L_\xi\phi)-\iota_\xi L$ から $dJ_\xi$ を導く。(ii) $\omega$ の定義を用いて、on shellで $d(\delta Q_\xi-\iota_\xi\theta)=\omega(\delta\phi,\mathcal L_\xi\phi)$ を導く。(iii) $\mathcal L_\xi\phi=0$、$\partial\Sigma=S_\infty-S_H$ なら境界で何が等しいか結論し、なぜこれだけでWaldエントロピーを導いたことにはならないか述べよ。

<!-- solution-start -->
**詳細解答**：

**(i) Noether流の発散。** $\delta_\xi L=\mathcal L_\xi L=d(\iota_\xi L)$ を変分式に代入して

$$
d(\iota_\xi L)=E\cdot\mathcal L_\xi\phi+d\theta(\mathcal L_\xi\phi).
$$

両辺の外微分項をまとめると $d[\theta(\mathcal L_\xi\phi)-\iota_\xi L]=-E\cdot\mathcal L_\xi\phi$。従って $dJ_\xi=-E\cdot\mathcal L_\xi\phi$ です。on shellで初めて $dJ_\xi=0$ なので、局所的に $J_\xi=dQ_\xi$ を選びます。

**(ii) 表面変分。** $\xi$ を固定して $J_\xi$ を変分し、$\omega(\delta\phi,\mathcal L_\xi\phi)=\delta\theta(\mathcal L_\xi\phi)-\mathcal L_\xi\theta(\delta\phi)$ を使います。すると

$$
\delta J_\xi
=\omega+\mathcal L_\xi\theta-\iota_\xi(E\cdot\delta\phi+d\theta).
$$

Cartan公式 $\mathcal L_\xi\theta=d(\iota_\xi\theta)+\iota_\xi d\theta$ で最後の二項の $\iota_\xi d\theta$ が相殺し、背景が解なので $E=0$ を代入すると

$$
\delta J_\xi=\omega+d(\iota_\xi\theta).
$$

線形化方程式が成立する解の変分では $\delta J_\xi=d\delta Q_\xi$。従って $d(\delta Q_\xi-\iota_\xi\theta)=\omega$ を得ます。

**(iii) 境界恒等式。** $\mathcal L_\xi\phi=0$ なら $\omega(\delta\phi,0)=0$。Stokesの定理と $\partial\Sigma=S_\infty-S_H$ より

$$
0=\int_\Sigma d(\delta Q_\xi-\iota_\xi\theta)
=\int_{S_\infty}(\delta Q_\xi-\iota_\xi\theta)
-\int_{S_H}(\delta Q_\xi-\iota_\xi\theta).
$$

従って無限遠と地平線の**表面変分が等しい**と分かります。しかし地平線上での $\xi$ の規格化、分岐面での正則性、場のゲージ、電荷・角運動量の仕事項と、$\int_S k_\xi$ の積分可能性をまだ確かめていません。エントロピーの具体公式も未導出です。次講でこれらを揃えて初めてWald公式へ進めます。
<!-- solution-end -->

## 7. 次講へ

今回得た $\mathbf Q_\xi$ と $\mathbf k_\xi$ は、幾何の局所公式から境界での物理的変分へ進むための橋です。BHT19では定常な分岐Killing地平線を設定し、地平線生成場の規格化、地平線側のNoether電荷、無限遠の保存量を結び、Einstein重力では面積則 $S=A/(4G)$ を回復します。

**参考となる一次論文**：R. M. Wald, [*Black Hole Entropy is Noether Charge*](https://arxiv.org/abs/gr-qc/9307038) (1993); V. Iyer and R. M. Wald, [*Some Properties of Noether Charge and a Proposal for Dynamical Black Hole Entropy*](https://arxiv.org/abs/gr-qc/9403028) (1994)。本講の例と演習は独自に構成し、引用した論文の証明・演習は転載していません。
