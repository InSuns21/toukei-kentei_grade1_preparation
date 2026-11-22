# GBG7 水平分布とLie環値接続1形式はなぜ同値か

[GBG6 の水平分布](../GBG6/index.md#def-gbg6-horizontal-distribution)を選ぶと、主束の各接ベクトルは水平成分と垂直成分に一意に分かれる。しかし、接ベクトルを一つ与えたとき「どれだけ垂直に動いているか」を数式で取り出すには、部分空間の指定だけでは不便である。そこで垂直成分を Lie 環 $\mathfrak g$ の元で測り、水平成分を零として検出する1形式を作る。

本講では、水平分布からこの1形式を作る方向と、1形式の核から水平分布を復元する方向を**両方とも証明する**。それによって「接続を指定する二つの方法」が本当に同じ情報を持つことが分かる。次講では、同じ大域的な接続を異なる局所 section で書くと何が起こるかを調べる。

$M$ は Hausdorff・第二可算、境界のない有限次元滑らかな多様体、$G$ は有限次元実 Lie 群、$\pi:P\to M$ は[滑らかな右主 $G$ 束](../GBG2/index.md#def-gbg2-principal-bundle)とする。$R_g(p)=pg$、$\mathfrak g=T_eG$ とし、[GBG6 の基本ベクトル場](../GBG6/index.md#def-gbg6-fundamental-field)を
$$
\xi_P(p)=\left.\frac{d}{dt}\right|_{0}p\exp(t\xi)
$$
で定める右作用の規約を使う。[LIE2 の随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)を $\operatorname{Ad}_g$ と記す。

<!-- definition-example-audit: strict -->

---

## 1. 垂直方向を Lie 環の元として読み取る

[LIE4 の Lie 環値1形式](../../../代数系/LIE/LIE4/index.md#def-lie4-lie-algebra-valued-one-form)は、各点 $p$ の接ベクトル $z\in T_pP$ を線形に $\mathfrak g$ の元へ写す滑らかな族である。引き戻しは
$$
(R_g^*\omega)_p(z):=\omega_{pg}((dR_g)_p z)
$$
と定める。単に実数値の1形式を使うのとは違い、値が群の随伴作用で変わる可能性がある。

必要な二条件を考えよう。垂直方向 $\xi_P(p)$ に与える値は、元のラベル $\xi$ そのものであってほしい。これを後の（C1）で要求する。また、主束の点を $p$ から $pg$ へ移しても測っている幾何は同じだから、[基本ベクトル場の右移動公式](../GBG6/index.md#thm-gbg6-vertical-fundamental)に合わせて値を $\operatorname{Ad}_{g^{-1}}$ で変換させる。これを（C2）で要求する。

<a id="def-gbg7-connection-form"></a>

<!-- formal-statement-start -->
> **定義（主束の接続1形式）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ 上の滑らかな $\mathfrak g$ 値1形式 $\omega$ が次の二条件を満たすとき、$\omega$ を **主束の接続1形式**（接続形式）という。
>
> **（C1）基本ベクトル場の再生**：任意の $p\in P$ と $\xi\in\mathfrak g$ で

$$
\omega_p(\xi_P(p))=\xi.
$$

> **（C2）右作用への同変性**：任意の $g\in G$ について

$$
R_g^*\omega=\operatorname{Ad}_{g^{-1}}\circ\omega,
$$

> すなわち任意の $p\in P$、$z\in T_pP$ について

$$
\omega_{pg}((dR_g)_p z)=\operatorname{Ad}_{g^{-1}}(\omega_p(z))
$$

> が成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg7-connection-form -->
**定義の確認**（積主束の標準接続）。$P=M\times GL(n,\mathbb R)$、$p=(x,K)$ とする。まず[積多様体の接空間](../../GEO/GEO2/index.md#prop-geo2-product-tangent)を $T_xM\oplus M_n(\mathbb R)$ と同一視する。[LIE4 の左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)は $K$ において $W\mapsto K^{-1}W$ である。したがって
$$
\omega^0_{(x,K)}(v,W):=K^{-1}W
$$
と置く。これは各 $(x,K)$ で線形で、逆行列と行列積が滑らかなので滑らかな $\mathfrak{gl}_n$ 値1形式である。

基本ベクトルは $\xi_P(x,K)=(0,K\xi)$ だから
$$
\omega^0_{(x,K)}(0,K\xi)=K^{-1}K\xi=\xi.
$$
これが（C1）である。$R_g(x,K)=(x,Kg)$、$(dR_g)(v,W)=(v,Wg)$ を使うと
$$
\begin{aligned}
\omega^0_{(x,Kg)}(v,Wg)
&=(Kg)^{-1}Wg\\
&=g^{-1}(K^{-1}W)g\\
&=\operatorname{Ad}_{g^{-1}}\bigl(\omega^0_{(x,K)}(v,W)\bigr),
\end{aligned}
$$
だから（C2）も満たす。この二条件を実際に確認したので、$\omega^0$ は定義した主束接続形式である。
<!-- definition-example-end -->

標準接続では $\omega^0(v,W)=0$ の条件は $W=0$ と同値である。すなわち、[GBG6 の標準水平分布](../GBG6/index.md#def-gbg6-horizontal-distribution)が零となる方向として復元された。以下ではこの対応を任意の主束へ広げる。

## 2. 水平分布から接続形式を構成する

[GBG6 の直和射影](../GBG6/index.md#prop-gbg6-horizontal-lift)によって、水平分布 $H$ が与えられれば任意の $z\in T_pP$ は $z=z_H+z_V$ に一意に分解される。一方、[垂直接空間と Lie 環の同型](../GBG6/index.md#thm-gbg6-vertical-fundamental)によって $z_V$ に唯一の Lie 環ラベルが対応する。これを $\omega_p(z)$ とすればよい。

<a id="thm-gbg7-horizontal-to-form"></a>

<!-- formal-statement-start -->
> **定理（水平分布から接続1形式への構成）**  
> 滑らかな右主 $G$ 束 $P\to M$ に[水平分布](../GBG6/index.md#def-gbg6-horizontal-distribution) $H$ が与えられたとする。$\iota_p:\mathfrak g\to V_pP$ を $\iota_p(\xi)=\xi_P(p)$ とし、$H_pP$ に沿う垂直射影を $\operatorname{pr}^V_p$ と書くとき、

$$
\omega^H_p(z):=\iota_p^{-1}\bigl(\operatorname{pr}^V_p(z)\bigr)
$$

> は滑らかな主束接続1形式である。また $\ker\omega^H_p=H_pP$ であり、この核と再生条件を満たす接続1形式は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

垂直射影は水平部分を消す。Lie 環への逆写像でラベルを回収すれば再生条件は自動的に従う。右同変性は、垂直射影と右作用の可換性、および基本ベクトルのラベルが右作用で $\operatorname{Ad}_{g^{-1}}$ に移る事実を順に適用して示す。

<!-- proof-start -->
### 証明

[垂直接空間とLie環の同型](../GBG6/index.md#thm-gbg6-vertical-fundamental)から、$\iota_p$ は各点で線形同型である。また[水平持ち上げと直和射影](../GBG6/index.md#prop-gbg6-horizontal-lift)により垂直射影は線形だから、合成である $\omega^H_p$ も線形である。

滑らかさを確認する。局所自明化 $p=s(x)k$ を取る。$\mathfrak g$ の基底 $\xi_1,\ldots,\xi_m$ に対応する基本ベクトル $\xi_{a,P}$ は、$VP$ の滑らかな局所枠となる。

$H$ は滑らかな部分束なので、$H$ の局所枠と上記の垂直局所枠を合わせると $TP$ の局所枠になる。局所枠の変換行列は滑らかで各点可逆だから、その逆行列の成分も滑らかである。従って、直和分解で得られる垂直係数、すなわち $\omega^H$ の各成分は滑らかである。

（C1）を確かめる。$\xi_P(p)\in V_pP$ だから
$$
\begin{aligned}
\omega^H_p(\xi_P(p))
&=\iota_p^{-1}\bigl(\operatorname{pr}^V_p(\iota_p(\xi))\bigr)\\
&=\iota_p^{-1}(\iota_p(\xi))=\xi.
\end{aligned}
$$

（C2）について、[直和射影の右作用との可換性](../GBG6/index.md#prop-gbg6-horizontal-lift)を $z\in T_pP$ に適用し、
$$
\operatorname{pr}^V_{pg}((dR_g)_p z)
=(dR_g)_p\,\operatorname{pr}^V_p(z).
$$
ここで $\eta:=\omega^H_p(z)$ と置くと、$\operatorname{pr}^V_p(z)=\iota_p(\eta)$ である。[基本ベクトルの右移動公式](../GBG6/index.md#thm-gbg6-vertical-fundamental)によって
$$
(dR_g)_p\iota_p(\eta)
=\iota_{pg}(\operatorname{Ad}_{g^{-1}}\eta).
$$
両辺に $\iota_{pg}^{-1}$ を施せば
$$
\omega^H_{pg}((dR_g)_p z)=\operatorname{Ad}_{g^{-1}}\omega^H_p(z)
$$
となる。

最後に $\omega^H_p(z)=0$ は $\operatorname{pr}^V_p(z)=0$ と同値で、直和分解の一意性から $z\in H_pP$ と同値である。もし別の接続形式 $\widetilde\omega$ が同じ核を持てば、$z=z_H+\iota_p(\xi)$ に対して線形性・再生条件から $\widetilde\omega_p(z)=0+\xi=\omega^H_p(z)$。従って一意である。
<!-- proof-end -->

この構成の肝は、水平ベクトルに「零」を与えるだけでなく、**垂直ベクトルの正しい尺度を固定する**ことである。零集合だけを指定した任意の線形写像では接続形式にならない。

## 3. 接続形式から水平分布を復元する

逆向きは、接続形式の零空間を水平とすればよい。ただし定義の二条件から、零空間が滑らかな部分束であり、垂直方向と直和をなして右作用で保たれることを示す必要がある。

<a id="thm-gbg7-form-to-horizontal"></a>

<!-- formal-statement-start -->
> **定理（接続1形式から水平分布への構成）**  
> 滑らかな右主 $G$ 束 $P\to M$ に[上で定義した主束接続形式](#def-gbg7-connection-form) $\omega$ が与えられたとする。各 $p\in P$ で

$$
H^\omega_pP:=\ker(\omega_p:T_pP\to\mathfrak g)
$$

> と定めると、$H^\omega$ は滑らかな水平分布である。水平・垂直成分は、任意の $z\in T_pP$ に対して

$$
z_V=(\omega_p(z))_P(p),\qquad
z_H=z-(\omega_p(z))_P(p)
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

$\omega$ は基本ベクトル上で恒等写像なので、垂直空間からの寄与を正確に引くことができる。その残りの $\omega$ 値が零であることを計算すれば直和が得られる。右移動では $\omega$ の値が随伴変換されるので、零は零のまま運ばれる。

<!-- proof-start -->
### 証明

$\eta:=\omega_p(z)$ と置く。[垂直空間と Lie 環の同型](../GBG6/index.md#thm-gbg6-vertical-fundamental)によって $\eta_P(p)$ は垂直である。（C1）と線形性を用いると
$$
\omega_p\bigl(z-\eta_P(p)\bigr)
=\omega_p(z)-\omega_p(\eta_P(p))
=\eta-\eta=0.
$$
従って $z=z_H+z_V$ と分解できる。もし $z\in H^\omega_pP\cap V_pP$ なら、同型性より $z=\xi_P(p)$ と書け、$\omega_p(z)=\xi$ と $\omega_p(z)=0$ から $\xi=0$、従って $z=0$。これで（H1）の直和と分解の一意性が示された。

$\omega$ は滑らかで（C1）から各 $\omega_p:T_pP\to\mathfrak g$ が全射である。さらに
$$
Q_p(z):=z-(\omega_p(z))_P(p)
$$
は $TP$ 上の滑らかな束写像で、$Q_p^2=Q_p$ かつ像は $\ker\omega_p$ である。局所枠で表示すると $Q$ は滑らかな一定階数 $\dim M$ の射影だから、その像は滑らかな部分束である。これが $H^\omega$ の滑らかさである。

最後に $z\in\ker\omega_p$ と $g\in G$ を取る。（C2）より
$$
\omega_{pg}((dR_g)_p z)
=\operatorname{Ad}_{g^{-1}}\omega_p(z)=0.
$$
従って $(dR_g)_p(H^\omega_pP)\subseteq H^\omega_{pg}P$。$g^{-1}$ について同じ包含を用いて逆向きも得るので等号となり、（H2）が成立する。
<!-- proof-end -->

<a id="thm-gbg7-equivalence"></a>

<!-- formal-statement-start -->
> **定理（水平分布と接続1形式の一対一対応）**  
> 滑らかな右主 $G$ 束 $P\to M$ において、滑らかな右同変水平分布 $H$ と、再生条件・右同変条件を満たす $\mathfrak g$ 値接続1形式 $\omega$ は、

$$
H\longmapsto\omega^H,\qquad
\omega\longmapsto H^\omega=\ker\omega
$$

> により互いに逆の一対一対応をなす。
<!-- formal-statement-end -->

### 証明の見取り図

一方では核が元の水平空間に戻ることを、もう一方では再生条件から垂直成分のラベルが元の形式と一致することを利用する。

<!-- proof-start -->
### 証明

[水平分布からの構成](#thm-gbg7-horizontal-to-form)で $\ker\omega^H=H$ を証明した。逆に $\omega$ を取り、[接続形式からの分解](#thm-gbg7-form-to-horizontal)により $z=z_H+\eta_P(p)$、$\eta=\omega_p(z)$ と書く。$z_H\in\ker\omega$ だから、$\ker\omega$ から作った形式について
$$
\omega^{H^\omega}_p(z)=\iota_p^{-1}(\eta_P(p))=\eta=\omega_p(z).
$$
すべての $p,z$ で等しいので、二つの構成は互いに逆である。
<!-- proof-end -->

## 4. Maurer–Cartan 形式が必要になる理由

基底が一点の主束 $G\to\{\mathrm{pt}\}$ を考える。射影の微分は零なので垂直空間は $T_kG$ 全体であり、水平空間は $\{0\}$ しかない。したがって[水平分布と接続1形式の対応](#thm-gbg7-equivalence)は、この主束上の接続形式を一つに決める。

<a id="prop-gbg7-maurer-cartan-fibre"></a>

<!-- formal-statement-start -->
> **命題（一点上の主束とMaurer–Cartan形式）**  
> 有限次元 Lie 群 $G$ を右主束 $\pi:G\to\{\mathrm{pt}\}$ とみなす。この主束の唯一の接続1形式は、[LIE4 の左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)

$$
\theta_k=(d\ell_{k^{-1}})_k:T_kG\to\mathfrak g
$$

> であり、対応する水平空間は各点で $\{0\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

基本ベクトルの速度は左移動の微分で作られる。これに左移動の逆を施せば、Lie 環の元がそのまま返る。右同変性は [Maurer–Cartan 形式の右移動則](../../../代数系/LIE/LIE4/index.md#prop-lie4-maurer-cartan-equivariance)に一致する。

<!-- proof-start -->
### 証明

任意の $k\in G$、$\xi\in\mathfrak g$ について、[右主束の基本ベクトル場](../GBG6/index.md#def-gbg6-fundamental-field)から
$$
\xi_G(k)=(d\ell_k)_e\xi.
$$
[LIE4 の Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)を適用すると
$$
\theta_k(\xi_G(k))
=(d\ell_{k^{-1}})_k(d\ell_k)_e\xi
=\xi,
$$
よって（C1）である。（C2）は[右移動則](../../../代数系/LIE/LIE4/index.md#prop-lie4-maurer-cartan-equivariance)を主束の右作用に適用して得る。$\theta_k$ は逆同型なので $\ker\theta_k=\{0\}$。

一意性も直接示せる。$\omega$ が接続1形式なら、任意の $W\in T_kG$ は $W=(d\ell_k)_e\xi$ と一意に書ける。（C1）から $\omega_k(W)=\xi=(d\ell_{k^{-1}})_kW=\theta_k(W)$ である。
<!-- proof-end -->

**符号と左右の確認**。行列群では $\theta_K(W)=K^{-1}W$ である。一方、主束の基本ベクトルは $K\xi$ なので、$K^{-1}(K\xi)=\xi$ となる。$WK^{-1}$ を使ってしまうと $\xi$ ではなく $K\xi K^{-1}$ が返り、一般には（C1）を満たさない。Maurer–Cartan 形式の「左」がここで必要になる。

## 5. 積主束上で両方の表示を計算する

[GBG6 の積主束の水平分布の具体形](../GBG6/index.md#thm-gbg6-product-horizontal)は、滑らかな $\mathfrak g$ 値1形式 $b$ を $M$ 上に選ぶことで
$$
H^b_{(x,k)}P=\{(v,-(dr_k)_e b_x(v)):v\in T_xM\}
$$
と表せた。これを接続1形式へ変換する。ここで $r_k(h)=hk$ は群の右乗法、$\theta_k=(d\ell_{k^{-1}})_k$ は左 Maurer–Cartan 形式である。二つの微分を混同しないことが重要である。

<a id="prop-gbg7-product-form"></a>

<!-- formal-statement-start -->
> **命題（積主束における接続1形式の具体式）**  
> $P=M\times G$ を標準右主束とし、$b\in\Omega^1(M;\mathfrak g)$ を滑らかな Lie 環値1形式とする。このとき

$$
\omega^b_{(x,k)}(v,W)
=\operatorname{Ad}_{k^{-1}}\bigl(b_x(v)\bigr)+\theta_k(W)
$$

> は主束の接続1形式であり、その核は [GBG6 の水平グラフ](../GBG6/index.md#thm-gbg6-product-horizontal) $H^b$ に等しい。特に $G=GL(n,\mathbb R)$ では

$$
\omega^b_{(x,K)}(v,W)
=K^{-1}b_x(v)K+K^{-1}W
=K^{-1}\bigl(b_x(v)K+W\bigr).
$$

> 逆に積主束上のすべての接続1形式は、一意な $b$ についてこの形である。
<!-- formal-statement-end -->

### 証明の見取り図

グラフの水平ベクトルを形式へ入れたら零になるようにする。右移動で $(v,W)$ が $(v,(dr_g)_kW)$ となるとき、$b$ の項と Maurer–Cartan 形式の項が同じ随伴変換を受けることを確認する。逆向きは、単位元上の section で接続形式を読む。

<!-- proof-start -->
### 証明

まず $\omega^b$ は $b$、随伴作用、$\theta$ が滑らかなので滑らかな $\mathfrak g$ 値1形式である。基本ベクトルは $(0,(d\ell_k)_e\xi)$ だから、[Maurer–Cartan 形式の再生計算](#prop-gbg7-maurer-cartan-fibre)により
$$
\omega^b_{(x,k)}(0,(d\ell_k)_e\xi)
=\operatorname{Ad}_{k^{-1}}b_x(0)+\theta_k((d\ell_k)_e\xi)=\xi.
$$
よって（C1）。

$g\in G$ による右移動を考える。[Maurer–Cartan 形式の右移動則](../../../代数系/LIE/LIE4/index.md#prop-lie4-maurer-cartan-equivariance)と随伴表現の積の規則を用いると
$$
\begin{aligned}
\omega^b_{(x,kg)}(v,(dr_g)_kW)
&=\operatorname{Ad}_{(kg)^{-1}}b_x(v)+\theta_{kg}((dr_g)_kW)\\
&=\operatorname{Ad}_{g^{-1}}\operatorname{Ad}_{k^{-1}}b_x(v)
 +\operatorname{Ad}_{g^{-1}}\theta_k(W)\\
&=\operatorname{Ad}_{g^{-1}}\omega^b_{(x,k)}(v,W).
\end{aligned}
$$
よって（C2）。

次に、右乗法方向の速度 $W=-(dr_k)_e b_x(v)$ を代入する。二つの乗法の微分を合成すると
$$
\theta_k((dr_k)_e\eta)
=(d\ell_{k^{-1}})_k(dr_k)_e\eta
=\operatorname{Ad}_{k^{-1}}\eta
$$
である。$\eta=b_x(v)$ とすれば
$$
\omega^b_{(x,k)}(v,-(dr_k)_e b_x(v))
=\operatorname{Ad}_{k^{-1}}b_x(v)-\operatorname{Ad}_{k^{-1}}b_x(v)=0.
$$
このグラフは $\dim M$ 次元であり、[接続形式からの水平分布](#thm-gbg7-form-to-horizontal)も $\dim M$ 次元だから核と等しい。

逆に任意の接続形式 $\omega$ を取る。[水平分布の一対一対応](#thm-gbg7-equivalence)で $H=\ker\omega$ を得る。[積主束の水平分布の分類](../GBG6/index.md#thm-gbg6-product-horizontal)から唯一の $b$ があって $H=H^b$ となる。今示した $\omega^b$ と $\omega$ は同じ核を持ち、共に（C1）を満たすから、[水平分布からの形式の一意性](#thm-gbg7-horizontal-to-form)により $\omega=\omega^b$ である。
<!-- proof-end -->

### 非可換な行列で何が間違いやすいか

$G=GL(2,\mathbb R)$、$B=E_{12}=\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$、$g=\operatorname{diag}(2,1)$ とする。$M=\mathbb R$ 上の $b_x(v)=vB$ を考えると、正しい形式は
$$
\omega^b_{(x,K)}(v,W)=K^{-1}vBK+K^{-1}W.
$$
これに対して、一見似た式
$$
\widetilde\omega_{(x,K)}(v,W)=vB+K^{-1}W
$$
も（C1）は満たす。しかし $(x,I)$ で $(1,0)$ を取ると $\widetilde\omega_{(x,I)}(1,0)=B$、右から $g$ を作用させた $(x,g)$ でも $\widetilde\omega_{(x,g)}(1,0)=B$ である。一方、必要な随伴変換は
$$
\operatorname{Ad}_{g^{-1}}B=g^{-1}Bg=\frac12B\ne B.
$$
従って（C2）は破れる。**壊れたのは再生条件ではなく右同変条件**である。核の候補も $(v,-KvB)$ となり、GBG6 で見たように右作用で保たれない。

もう一つの失敗は、$\omega^0$ を $2\omega^0$ に替えることである。核は同じでも
$$
(2\omega^0)_p(\xi_P(p))=2\xi
$$
だから（C1）を満たさない。**核の一致だけでは対応の逆向きを正当化できない**ことが分かる。

---

## 6. 演習と詳細解答

### Level A：定義と再生条件を具体式で確かめる

<a id="ex-gbg7-a01"></a>
#### GBG7-A01 $U(1)$ 積主束の標準形式
- Level: A

$P=\mathbb R\times U(1)$、$z\in U(1)$、$T_zU(1)=iz\mathbb R$ とする。標準接続形式を $\omega^0_{(x,z)}(v,izt)=it$ として、線形性・滑らかさ・（C1）（C2）・核をそれぞれ確かめよ。

<!-- solution-start -->
**詳細解答**。$t$ は $iz\ne0$ により一意なので写像は well-defined であり、各点で $(v,izt)\mapsto it$ は実線形である。$z^{-1}izt=it$ と書けるので滑らか。基本ベクトルは $\xi=is\in i\mathbb R$ に対して $(0,izs)$ だから、$\omega^0(0,izs)=is=\xi$ で（C1）。

任意の $a\in U(1)$ について $R_a(x,z)=(x,za)$、$(dR_a)(v,izt)=(v,izta)$ なので
$$
\omega^0_{(x,za)}(v,i(za)t)=it.
$$
$U(1)$ は可換だから $\operatorname{Ad}_{a^{-1}}(it)=it$。よって（C2）も成立する。$\omega^0(v,izt)=0$ は $t=0$ と同値なので核は $\{(v,0)\}$。これは[標準水平分布](../GBG6/index.md#def-gbg6-horizontal-distribution)と一致する。
<!-- solution-end -->

<a id="ex-gbg7-a02"></a>
#### GBG7-A02 非可換な標準形式の再生
- Level: A

$P=\mathbb R\times GL(2,\mathbb R)$、$K=\operatorname{diag}(2,1)$、$\xi=E_{12}$ とする。$\xi_P(x,K)$ と $\omega^0_{(x,K)}(\xi_P(x,K))$ を求め、$WK^{-1}$ を使った場合と比べよ。

<!-- solution-start -->
**詳細解答**。[基本ベクトル場の規約](../GBG6/index.md#def-gbg6-fundamental-field)から $\xi_P(x,K)=(0,K\xi)$ である。$K\xi=2E_{12}$ なので
$$
\omega^0_{(x,K)}(0,2E_{12})
=K^{-1}(2E_{12})=E_{12}.
$$
従って（C1）を満たす。一方 $W\mapsto WK^{-1}$ なら、$2E_{12}K^{-1}=2E_{12}$ となり、$\xi$ に戻らない。右主作用での基本ベクトルが $K\xi$ であるため、**左から $K^{-1}$** を掛ける必要がある。
<!-- solution-end -->

<a id="ex-gbg7-a03"></a>
#### GBG7-A03 垂直射影の Lie 環ラベル
- Level: A

$P=\mathbb R\times GL(2,\mathbb R)$、$b_x(v)=vB$、$B=E_{12}$、$K=\operatorname{diag}(2,1)$ とする。接ベクトル $z=(2,I)$ を水平・垂直に分解し、$\omega^b_{(x,K)}(z)$ が垂直成分の Lie 環ラベルになることを確かめよ。

<!-- solution-start -->
**詳細解答**。[GBG6 の水平グラフ](../GBG6/index.md#thm-gbg6-product-horizontal)は $W=-vBK$。$BK=B$ より水平成分は $(2,-2B)$、垂直成分は $(0,I+2B)$ で、和が $(2,I)$ になる。垂直成分 $(0,K\eta)$ のラベルは $\eta=K^{-1}(I+2B)$ だから
$$
\eta=
\begin{pmatrix}1/2&1\\0&1\end{pmatrix}.
$$
一方、[積主束の接続形式](#prop-gbg7-product-form)へ代入すると
$$
\begin{aligned}
\omega^b_{(x,K)}(2,I)
&=K^{-1}(2BK+I)\\
&=K^{-1}(2B+I)
=\begin{pmatrix}1/2&1\\0&1\end{pmatrix}.
\end{aligned}
$$
従って $\omega^b(z)=\eta$ であり、水平成分は零、垂直成分は $\eta_P(x,K)=(0,K\eta)=(0,I+2B)$ と再生される。
<!-- solution-end -->

<a id="ex-gbg7-a04"></a>
#### GBG7-A04 同じ核でも接続形式とは限らない
- Level: A

標準積主束の接続形式 $\omega^0$ に対して、$\widetilde\omega=2\omega^0$ と置く。核、（C1）、（C2）を調べ、どの条件を失ったか答えよ。

<!-- solution-start -->
**詳細解答**。$2$ は零でないので $\ker(2\omega^0_p)=\ker\omega^0_p$ は各点で一致する。右移動に対して
$$
R_g^*(2\omega^0)=2\operatorname{Ad}_{g^{-1}}\omega^0
=\operatorname{Ad}_{g^{-1}}(2\omega^0)
$$
なので（C2）は保たれる。しかし基本ベクトルには
$$
(2\omega^0)_p(\xi_P(p))=2\omega^0_p(\xi_P(p))=2\xi
$$
を与え、$\xi\ne0$ なら再生条件（C1）は破れる。核だけから形式を一意に復元するには（C1）が不可欠である。
<!-- solution-end -->

<a id="ex-gbg7-a05"></a>
#### GBG7-A05 一点上の主束と加法群
- Level: A

$G=(\mathbb R^2,+)$ を右主束 $G\to\{\mathrm{pt}\}$ とみなす。基本ベクトルと接続形式を標準座標で求め、水平空間が $\{0\}$ である理由を示せ。

<!-- solution-start -->
**詳細解答**。加法群では[LIE2 の Lie 群指数の定義](../../../代数系/LIE/LIE2/index.md#def-lie2-exponential-map)から $\exp(t\xi)=t\xi$ である。右作用は $k\mapsto k+a$ だから、基本ベクトルの速度は

$$
\xi_G(k)=\left.\frac{d}{dt}\right|_0(k+t\xi)=\xi.
$$

[左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)は加法群では $\theta_k(W)=W$ なので、$\theta_k(\xi_G(k))=\xi$、すなわち（C1）が成立する。加法群の随伴作用と右平行移動の微分は恒等写像だから（C2）も成立する。

$\pi$ は一点への写像だから $d\pi=0$、従って $V_kG=T_kG$。直和条件から水平空間は零だけであり、上の形式の核も $\ker\theta_k=\{0\}$ となる。
<!-- solution-end -->

### Level B：一般論の理由を自分の言葉で証明する

<a id="ex-gbg7-b01"></a>
#### GBG7-B01 形式から滑らかな水平分布を作る
- Level: B

主束 $P\to M$ の接続形式 $\omega$ について $Q_p(z)=z-(\omega_p(z))_P(p)$ と置く。$Q^2=Q$、$\operatorname{im}Q=\ker\omega$、右作用との可換性を証明し、これらから $\ker\omega$ の滑らかさと同変性が従うことを説明せよ。

<!-- solution-start -->
**詳細解答**。$\eta=\omega_p(z)$ と置くと、[再生条件](#def-gbg7-connection-form)によって $\omega_p(\eta_P(p))=\eta$。従って $\omega_p(Q_p(z))=\eta-\eta=0$。さらに $w\in\ker\omega_p$ なら $Q_p(w)=w$。よって $\operatorname{im}Q_p=\ker\omega_p$、そして $Q_p^2(z)=Q_p(Q_p(z))=Q_p(z)$ である。

右作用を適用すると
$$
\begin{aligned}
(dR_g)_p Q_p(z)
&=(dR_g)_p z-(dR_g)_p(\eta_P(p))\\
&=(dR_g)_p z-(\operatorname{Ad}_{g^{-1}}\eta)_P(pg)\\
&=Q_{pg}((dR_g)_p z).
\end{aligned}
$$
第二行は[基本ベクトルの右移動公式](../GBG6/index.md#thm-gbg6-vertical-fundamental)、第三行は（C2）による。$Q$ は滑らかで、（C1）から $\omega_p$ は全射なので $\operatorname{rank}Q_p=\dim P-\dim G=\dim M$ が一定である。局所座標で一定階数射影の像には滑らかな枠を選べるため $\ker\omega$ は滑らかな部分束。右作用との可換性からその像が $pg$ の像へ運ばれ、水平分布の条件を満たす。
<!-- solution-end -->

<a id="ex-gbg7-b02"></a>
#### GBG7-B02 随伴作用を欠く項がなぜ失敗するか
- Level: B

$P=\mathbb R\times GL(2,\mathbb R)$、$B=E_{12}$、$b_x(v)=vB$ とする。$\widetilde\omega_{(x,K)}(v,W)=vB+K^{-1}W$ の（C1）を確認し、$g=\operatorname{diag}(2,1)$ と $(1,0)\in T_{(x,I)}P$ を使って（C2）の失敗を示せ。正しい $\omega^b$ の場合も同じ入力で比較せよ。

<!-- solution-start -->
**詳細解答**。基本ベクトル $(0,K\xi)$ を代入すると $\widetilde\omega(0,K\xi)=K^{-1}K\xi=\xi$。従って（C1）は成立する。$R_g$ は $(1,0)$ を $(1,0)$ に送る。$\widetilde\omega_{(x,g)}(1,0)=B$ だが
$$
\operatorname{Ad}_{g^{-1}}\widetilde\omega_{(x,I)}(1,0)
=g^{-1}Bg=\tfrac12B.
$$
$B\ne0$ なので（C2）は成立しない。これに対して[正しい積主束の形式](#prop-gbg7-product-form)では $\omega^b_{(x,I)}(1,0)=B$、$\omega^b_{(x,g)}(1,0)=g^{-1}Bg=\tfrac12B$ となり、（C2）が成立する。非可換性による積の順序を反映する $\operatorname{Ad}_{K^{-1}}b$ が必要である。
<!-- solution-end -->

<a id="ex-gbg7-b03"></a>
#### GBG7-B03 積主束の任意の形式は単位元で決まる
- Level: B

積主束 $P=M\times G$ の接続形式 $\omega$ と標準 section $s(x)=(x,e)$ について、$b_x(v):=\omega_{(x,e)}(v,0)$ と置く。この $b$ が滑らかな Lie 環値1形式であることを示し、任意の $(x,k)$、$(v,W)$ において $\omega=\omega^b$ を直接導け。

<!-- solution-start -->
**詳細解答**。$s$ は滑らかで、$ds_x(v)=(v,0)$ である。[Lie 環値1形式の引き戻し](../../../代数系/LIE/LIE4/index.md#def-lie4-lie-algebra-valued-one-form)として $b=s^*\omega$ は各 $x$ で線形・滑らかになる。

任意の $(v,W)$ を
$$
(v,W)=(v,0)+(0,W)
$$
と分ける。右作用 $R_k$ は $(x,e)$ の $(v,0)$ を $(x,k)$ の $(v,0)$ に送るため、（C2）から
$$
\omega_{(x,k)}(v,0)
=\operatorname{Ad}_{k^{-1}}\omega_{(x,e)}(v,0)
=\operatorname{Ad}_{k^{-1}}b_x(v).
$$
また $W=(d\ell_k)_e\xi$、$\xi=\theta_k(W)$ と一意に書けるので、（C1）から $\omega_{(x,k)}(0,W)=\xi=\theta_k(W)$。両式を線形性で加えれば
$$
\omega_{(x,k)}(v,W)
=\operatorname{Ad}_{k^{-1}}b_x(v)+\theta_k(W).
$$
これは[積主束の形式](#prop-gbg7-product-form)である。$b$ は $s^*\omega$ に等しいため一意である。
<!-- solution-end -->

### Level C：水平・垂直・再生・右同変をまとめて検算する

<a id="ex-gbg7-c01"></a>
#### GBG7-C01 二つの非可換方向を持つ接続形式
- Level: C

$P=\mathbb R^2\times GL(2,\mathbb R)$、$B=E_{12}$、$D=\operatorname{diag}(1,0)$ とする。基底点 $(x,y)$ で
$$
b_{(x,y)}(v_1,v_2)=v_1B+xv_2D
$$
と置き、$\omega^b_{((x,y),K)}(v,W)=K^{-1}(b_{(x,y)}(v)K+W)$ を考える。

1. この形式が滑らかで、再生条件・右同変条件を満たすことを任意の $K,g$ について確かめよ。
2. $x=1$、$v=(2,3)$、$K=\operatorname{diag}(2,1)$、$W=I$ とする。$\omega^b(v,W)$ を計算し、水平・垂直分解を求めよ。
3. $g=\operatorname{diag}(3,1)$ で右移動した接ベクトルについて、接続形式の値が随伴変換された値と一致することを成分で確認せよ。
4. $\widetilde\omega(v,W)=b(v)+K^{-1}W$ はなぜ同じ接続形式にならないか。失った条件と、証明のどの段階が使えなくなるか説明せよ。

<!-- solution-start -->
**詳細解答**。

**第1問**。$b$ の係数は $x$ の多項式だから滑らか、$\omega^b$ は可逆行列の逆行列と積からなるので滑らかである。$\xi_P=(0,K\xi)$ を代入すると
$$
\omega^b(0,K\xi)=K^{-1}(0+K\xi)=\xi,
$$
よって（C1）。右移動 $(K,W)\mapsto(Kg,Wg)$ では
$$
\begin{aligned}
\omega^b_{Kg}(v,Wg)
&=(Kg)^{-1}\bigl(b(v)Kg+Wg\bigr)\\
&=g^{-1}K^{-1}\bigl(b(v)K+W\bigr)g\\
&=\operatorname{Ad}_{g^{-1}}\omega^b_K(v,W),
\end{aligned}
$$
となり（C2）が成立する。したがって[接続形式の定義](#def-gbg7-connection-form)を満たす。

**第2問**。$x=1$ で $b(v)=2B+3D$、$BK=B$、$DK=\operatorname{diag}(2,0)$ だから
$$
b(v)K=\begin{pmatrix}6&2\\0&0\end{pmatrix},\qquad
b(v)K+I=\begin{pmatrix}7&2\\0&1\end{pmatrix}.
$$
したがって
$$
\omega^b_K(v,I)
=K^{-1}(b(v)K+I)
=\begin{pmatrix}7/2&1\\0&1\end{pmatrix}
=:\eta.
$$
[水平グラフ](../GBG6/index.md#thm-gbg6-product-horizontal)から $W_H=-b(v)K$ だから
$$
(v,I)
=\left(v,-\begin{pmatrix}6&2\\0&0\end{pmatrix}\right)
 +\left(0,\begin{pmatrix}7&2\\0&1\end{pmatrix}\right).
$$
第二項は垂直で、$K\eta=\left(\begin{smallmatrix}7&2\\0&1\end{smallmatrix}\right)$ なので、[垂直ラベルの再生](#thm-gbg7-form-to-horizontal)にも一致する。

**第3問**。$g=\operatorname{diag}(3,1)$ なら $Kg=\operatorname{diag}(6,1)$、$Wg=\operatorname{diag}(3,1)$。右移動後の値を直接計算すると
$$
\begin{aligned}
\omega^b_{Kg}(v,Wg)
&=(Kg)^{-1}\bigl(b(v)Kg+Wg\bigr)\\
&=\begin{pmatrix}1/6&0\\0&1\end{pmatrix}
\begin{pmatrix}21&2\\0&1\end{pmatrix}
=\begin{pmatrix}7/2&1/3\\0&1\end{pmatrix}.
\end{aligned}
$$
一方
$$
g^{-1}\eta g
=\begin{pmatrix}1/3&0\\0&1\end{pmatrix}
\begin{pmatrix}7/2&1\\0&1\end{pmatrix}
\begin{pmatrix}3&0\\0&1\end{pmatrix}
=\begin{pmatrix}7/2&1/3\\0&1\end{pmatrix}.
$$
両辺は一致する。

**第4問**。$\widetilde\omega$ も垂直基本ベクトルを正しく再生する。$x=1$、$v=(1,0)$、$W=0$、$K=I$ とすると $b(v)=B$ で、右移動後の形式の値も $B$ のままである。

一方、$g=\operatorname{diag}(3,1)$ による随伴変換は

$$
g^{-1}Bg=\tfrac13B\ne B.
$$

そのため右同変条件が失われ、[形式から核の右同変性を導く証明](#thm-gbg7-form-to-horizontal)の「零が右移動でも零になる」という段階が使えない。従って $\ker\widetilde\omega$ は一般に主束の水平分布にならない。
<!-- solution-end -->

---

## 7. この講義で得た道具

水平分布を選ぶと、接ベクトルを「水平」と「Lie 環の元に対応する垂直」に一意に分けられる。これを測るのが接続1形式であり、
$$
\omega(\xi_P)=\xi,\qquad R_g^*\omega=\operatorname{Ad}_{g^{-1}}\omega,\qquad H=\ker\omega
$$
が双方の記述を結ぶ。積主束の式では、Maurer–Cartan 形式 $\theta$ が垂直方向を測り、$\operatorname{Ad}_{k^{-1}}b$ が基底方向の寄与を加える。

次の **GBG8** では、局所 section を替えても同じ大域的な $\omega$ を記述できることを確認し、局所ゲージポテンシャルの変換則を導く。
