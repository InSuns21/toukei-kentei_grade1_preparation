# MICA15 応力テンソルと局所共変性

<!-- definition-example-audit: strict -->

[MICA14のHadamard subtraction](../MICA14/index.md#def-mica14-subtracted-remainder)によって、二点分布から滑らかな二変数関数を得られました。しかしWick平方の対角値を取れるだけでは、エネルギー密度や圧力を定められません。応力テンソルには微分が必要で、さらに**有限なテンソルであることと保存されることは別**だからです。

本章では、4次元の実自由スカラー場について次の順で進みます。

1. 古典場の応力テンソルと保存恒等式を、曲率結合を含めて計算する。
2. 二点間の平行移動を使って双微分作用素を作り、減算した**あと**に対角へ制限する。
3. 二つのHadamard状態の応力テンソル期待値の差が保存されることを示し、個々の期待値に必要な局所補正と区別する。
4. 局所共変性、保存則、尺度依存、有限なくりこみ自由度、trace anomalyをそれぞれ検査する。

## 1. 古典場から出発する

舞台は、時間向き・空間向きが指定された境界なしの滑らかな4次元大域双曲Lorentz時空 $(M,g)$ です。計量の符号は $(-,+,+,+)$、自然単位系を使います。$R_{ab}$、$R$、$G_{ab}=R_{ab}-\tfrac12Rg_{ab}$ はそれぞれRicciテンソル、スカラー曲率、[Einsteinテンソル](../../../物理系/GR/GR7/index.md#def-gr7-einstein-tensor)です。$\Box_g=\nabla^a\nabla_a$ とし、$m\ge0$、$\xi\in\mathbb R$ を背景とともに固定します。

[MICA11で固定したKlein–Gordon作用素](../MICA11/index.md#def-mica11-smeared-algebra)は

$$
P=-\Box_g+m^2+\xi R,
\qquad P\phi=0
\quad\Longleftrightarrow\quad
\Box_g\phi=(m^2+\xi R)\phi.
$$

滑らかな実場 $\phi$ に対する作用を、計量の体積密度 $d\mu_g$ を用いて

$$
S[\phi,g]=-\frac12\int_M
\bigl(\nabla^a\phi\nabla_a\phi+(m^2+\xi R)\phi^2\bigr)d\mu_g
$$

とします。変分では境界項が消えるコンパクト支持の変化を考えます。計量変分 $\delta_g S=-\frac12\int_M T_{ab}\,\delta g^{ab}d\mu_g$ という符号規約で、応力テンソルを得ます。

[HPDE7の実スカラー場の応力エネルギーテンソル](../../HPDE/HPDE7/index.md#def-hpde7-stress-energy)は、与えられたポテンシャル $q$ を固定してエネルギー評価に使う構成です。ここでは $q=m^2+\xi R$ 自体が**計量の変分で変化する**ため、その定義だけでは不足し、曲率結合の追加項が現れます。

<a id="def-mica15-classical-stress"></a>

<!-- formal-statement-start -->
> **定義（曲率結合した実スカラー場の古典的応力テンソル）**  
> 上の作用と符号規約のもとで、滑らかな実場 $\phi$ の対称な二階共変テンソルを

$$
\begin{aligned}
T_{ab}[\phi]={}&\nabla_a\phi\nabla_b\phi
-\tfrac12g_{ab}(\nabla_c\phi\nabla^c\phi+m^2\phi^2)\\
&+\xi\{G_{ab}\phi^2
+g_{ab}\Box_g(\phi^2)-\nabla_a\nabla_b(\phi^2)\}
\end{aligned}
$$

> と定義する。$\phi$ は必ずしも運動方程式の解でなくてよい。$\xi=0$ では最終行が消える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica15-classical-stress -->
### 定義の確認：平坦時空の定数場と時間一次関数

**定義の確認**。二つの滑らかな解で条件と成分を計算します。

Minkowski計量 $\eta=\operatorname{diag}(-1,1,1,1)$、$m=\xi=0$ なら $R_{ab}=0$ です。$\phi=1$ は $P\phi=0$ を満たし、全偏微分が零なので $T_{ab}[1]=0$。一方、$\phi=t$ も $\Box_\eta t=0$ を満たしますが、$\partial_0t=1$、$\partial_it=0$、$\partial_ct\partial^ct=-1$ より

$$
T_{00}[t]=1-\tfrac12(-1)(-1)=\tfrac12,
\quad T_{0i}[t]=0,\quad T_{ij}[t]=\tfrac12\delta_{ij}.
$$

すべての条件と成分を直接確認できました。同じ質量零方程式の解でも、定数場と時間一次関数は異なる応力テンソルを持ちます。
<!-- definition-example-end -->

なぜ曲率項の微分が $\phi^2$ に作用するのでしょうか。$R\phi^2$ の計量変分で生じる $\delta R$ の二階微分を部分積分して、$g_{ab}\Box_g\phi^2-\nabla_a\nabla_b\phi^2$ を得るためです。**計量が曲がっていても $\xi G_{ab}\phi^2$ だけを追加すればよいわけではありません。**

<a id="prop-mica15-classical-conservation"></a>

<!-- formal-statement-start -->
> **命題（古典的保存恒等式）**  
> 上の滑らかな $(M,g)$ と $m,\xi$ に対する任意の実滑らかな $\phi$ について

$$
\nabla^aT_{ab}[\phi]
=\bigl(\Box_g\phi-m^2\phi-\xi R\phi\bigr)\nabla_b\phi
=-(P\phi)\nabla_b\phi.
$$

> 特に $P\phi=0$ なら $\nabla^aT_{ab}[\phi]=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の二項を微分すると $(\Box_g\phi-m^2\phi)\nabla_b\phi$ が残ります。$\xi$ の括弧は、[縮約Bianchi恒等式](../../../物理系/GR/GR7/index.md#thm-gr7-contracted-bianchi) $\nabla^aG_{ab}=0$ とスカラーの共変微分の交換子を使って、ちょうど $-\xi R\phi\nabla_b\phi$ を生みます。

<!-- proof-start -->
### 証明

計量との両立性 $\nabla g=0$ と、スカラーの二階共変微分の対称性から

$$
\begin{aligned}
\nabla^a(\nabla_a\phi\nabla_b\phi)
&=(\Box_g\phi)\nabla_b\phi
+\nabla^a\phi\nabla_b\nabla_a\phi,\\
\tfrac12\nabla_b(\nabla_c\phi\nabla^c\phi)
&=\nabla^c\phi\nabla_b\nabla_c\phi.
\end{aligned}
$$

二つの最後の項が相殺し、質量項の微分は $-m^2\phi\nabla_b\phi$ です。次に任意の滑らかなスカラー $f$ について

$$
\Box_g\nabla_b f-\nabla_b\Box_g f
=R_b{}^c\nabla_cf
$$

が成り立ちます。$f=\phi^2$ として、$\nabla^aG_{ab}=0$ および $G_{ab}=R_{ab}-\frac12Rg_{ab}$ を代入すると

$$
\begin{aligned}
&\nabla^a\{G_{ab}f+g_{ab}\Box_g f-\nabla_a\nabla_bf\}\\
&=G_{ab}\nabla^af
+\nabla_b\Box_gf-\Box_g\nabla_bf\\
&=(G_{ab}-R_{ab})\nabla^af
=-\tfrac12R\nabla_bf=-R\phi\nabla_b\phi.
\end{aligned}
$$

両部分を足して $\nabla^aT_{ab}=-(P\phi)\nabla_b\phi$ です。保存は**解であることを用いた結論**で、単に $T$ が滑らかだから成り立つのではありません。
<!-- proof-end -->

## 2. 二点間の微分はどの添字を持つか

[MICA14で作った滑らかな余り](../MICA14/index.md#def-mica14-subtracted-remainder)を $F_{\omega,\ell}(x,y)$ と書きます。$x$ と $y$ の接空間は異なるため、$\nabla_a^x\nabla_{b'}^yF$ はそのままでは $x$ の二階テンソルになりません。ここでプライム付き添字 $b'$ は **$y$ での共変添字**を表し、積の微分を区別します。

十分小さい[測地的凸開集合](../../../幾何系/LORG/LORG5/index.md#def-lorg5-convex-normal) $C\subset M$ の二点 $x,y$ は一意の測地線で結ばれます。その測地線に沿う[平行移動](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-parallel-causal-cone)で $y$ の共変ベクトルを $x$ に運ぶ写像を $I_a{}^{b'}(x,y):T_y^*M\to T_x^*M$ と書きます。$I_a{}^{b'}(x,x)=\delta_a{}^b$、計量は平行移動で保存されます。$g^{ab'}(x,y):=g^{ac}(x)I_c{}^{b'}(x,y)$ とします。

滑らかな二変数関数 $F$ の対角値は $[F](x):=F(x,x)$ と書きます。$[F]$ を微分すると **両方の変数が動く**ため、例えば

$$
\nabla_a[F]=[\nabla^x_aF]+[I_a{}^{b'}\nabla^y_{b'}F].
$$

これは普通の合成関数の連鎖律です。従って $\nabla_a\nabla_b[F]$ と $[\nabla_a^x\nabla_b^xF]$ は一般には異なります。

<a id="def-mica15-bidifferential"></a>

<!-- formal-statement-start -->
> **定義（点分離応力テンソルの双微分作用）**  
> 上記の $C\times C$ 上で実対称な $F\in C^\infty(C\times C)$ に対し、二階共変テンソル $\mathcal D_{ab}F$ を次で定める。

$$
\begin{aligned}
\mathcal D_{ab}F:={}&
\tfrac12[ I_b{}^{b'}\nabla_a^x\nabla_{b'}^yF
+I_a{}^{a'}\nabla_b^x\nabla_{a'}^yF ]\\
&-\tfrac12g_{ab}[g^{cd'}\nabla_c^x\nabla_{d'}^yF]
-\tfrac12m^2g_{ab}[F]\\
&+\xi\{G_{ab}[F]+g_{ab}\Box_g[F]-\nabla_a\nabla_b[F]\}.
\end{aligned}
$$

> 角括弧は**微分を先に行ったあとの**対角値である。この定義は滑らかな $F$ のみに用い、生の $\omega_2$ や $H_{\ell,\infty}$ の対角値を別々に要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica15-bidifferential -->
### 定義の確認：分離変数の二点関数

**定義の確認**。混合微分を実際に計算して古典式と比較します。

平坦時空、$m=\xi=0$ で $F(x,y)=t_x t_y$ とします。平行移動は恒等写像です。$[F]=t^2$、$[\partial_0^x\partial_{0'}^yF]=1$、$[\eta^{cd'}\partial_c^x\partial_{d'}^yF]=-1$ であり、

$$
\mathcal D_{00}F=1-\tfrac12(-1)(-1)=\tfrac12,
\qquad \mathcal D_{ij}F=\tfrac12\delta_{ij}.
$$

これは前節の $T_{ab}[t]$ と一致します。曲がった時空で同じ計算をするときは、$b'$ をそのまま $b$ と見なさず $I_b{}^{b'}$ を挿入することが必要です。
<!-- definition-example-end -->

<a id="prop-mica15-polarization"></a>

<!-- formal-statement-start -->
> **命題（双微分作用と古典テンソルの対応）**  
> 同じ背景の任意の実滑らかな $u,v$ に対し、対称な二点関数を

$$
F_{u,v}(x,y)=\tfrac12\{u(x)v(y)+v(x)u(y)\}
$$

> と定める。このとき、

$$
\mathcal D_{ab}F_{u,v}
=\tfrac12\bigl(T_{ab}[u+v]-T_{ab}[u]-T_{ab}[v]\bigr).
$$

> 特に $\mathcal D_{ab}(u\otimes u)=T_{ab}[u]$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

双微分は $u$ の $x$ 微分と $v$ の $y$ 微分を対角で掛け、$\nabla\nabla[F]$ は $(uv)$ を微分します。古典式の各二次項を極化して比較すればよいのです。

<!-- proof-start -->
### 証明

対角で $[F_{u,v}]=uv$ です。また

$$
\bigl[I_b{}^{b'}\nabla_a^x\nabla_{b'}^y F_{u,v}\bigr]
=\tfrac12(\nabla_au\nabla_bv+\nabla_av\nabla_bu).
$$

したがってその対称化も右辺に等しく、混合トレースは $\nabla_cu\nabla^cv$ です。一方 $\nabla_a\nabla_b[F_{u,v}]=\nabla_a\nabla_b(uv)$、$\Box_g[F_{u,v}]=\Box_g(uv)$。例えば

$$
\nabla_a\nabla_b(uv)
=u\nabla_a\nabla_bv+v\nabla_a\nabla_bu
+\nabla_au\nabla_bv+\nabla_av\nabla_bu.
$$

これらを[古典的応力テンソル](#def-mica15-classical-stress)に代入し、$T[u+v]$ を展開して $T[u],T[v]$ を引くと残る交差項が完全に一致します。$u=v$ のときは右辺が $T[u]$ です。
<!-- proof-end -->

## 3. 保存則：状態間の差と単独の期待値

同じ $(M,g,P)$ に対する二つのHadamard状態 $\omega,\omega'$ を取ります。[MICA13の滑らかな差](../MICA13/index.md#prop-mica13-smooth-difference)により

$$
D:=\omega_2-\omega'_2\in C^\infty(M\times M).
$$

[二点分布の双解性と同じ交換子条件](../MICA11/index.md#def-mica11-two-point-conditions)により $P_xD=P_yD=0$、$D(x,y)=D(y,x)$ で、実値です。従ってこの $D$ には前節の $\mathcal D$ を適用できます。

<a id="thm-mica15-state-difference"></a>

<!-- formal-statement-start -->
> **定理（応力テンソル期待値の状態間差）**  
> 上記の二つのHadamard状態について、局所共変かつ保存的な**同一の**応力テンソルくりこみ規約を両状態に用いると、差は

$$
\langle T_{ab}\rangle_\omega-
\langle T_{ab}\rangle_{\omega'}
=\mathcal D_{ab}D
$$

> で与えられる滑らかな実対称テンソルであり、

$$
\nabla^a(\mathcal D_{ab}D)=0.
$$

> この差は両状態に共通のHadamard減算・保存用局所補正・有限くりこみ項の選択に依存しない。個々の期待値がこの式だけで一意に決まるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

局所減算と局所補正は両状態に同じものが加わります。引き算ではそれらが消え、滑らかな双解 $D$ のみが残ります。保存性には[古典的保存恒等式](#prop-mica15-classical-conservation)を二変数へ極化して使います。

<!-- proof-start -->
### 証明

同じ $H_{\ell,\infty}$ による二つの滑らかな余りの差は

$$
(\omega_2-H_{\ell,\infty})
-(\omega'_2-H_{\ell,\infty})=D.
$$

同じ局所補正 $Q_{ab}[g,m,\xi,\ell]$ が加わる処方でも、その差は $Q_{ab}-Q_{ab}=0$。$\mathcal D$ の線形性により最初の結論を得ます。$D$ は実対称であり、定義式は $a,b$ について対称なので、テンソルは実対称です。

保存の計算を説明します。滑らかな対称双解 $D$ の局所Cauchyデータ（$D$、二つの法線微分、両法線微分）は、Cauchy面の二点上の滑らかな関数です。局所領域を決めてCauchyデータをカットオフし、有限和の分離変数関数で必要な導関数まで近似します。[双曲方程式の大域Cauchy解と連続依存](../../HPDE/HPDE16/index.md#thm-hpde16-global-cauchy)を各変数に適用すれば、$D$ は局所的に滑らかな解 $u_j,v_j$ の対称極化和

$$
\sum_j c_j\{u_j(x)v_j(y)+v_j(x)u_j(y)\}/2
$$

によって、保存式を評価するのに必要な有限階の導関数まで近似できます。各 $Pu_j=Pv_j=0$ です。[極化の命題](#prop-mica15-polarization)と[古典的保存恒等式](#prop-mica15-classical-conservation)により各項の $\mathcal D$ の発散は零。$\mathcal D$ と $\nabla^a$ は有限階の滑らかな係数の微分作用なので、近似の極限でも発散は零です。

なお、この近似は二点分布**そのもの**を対角評価してよいという意味ではありません。すでに滑らかと証明した $D$ に対してのみ使用しています。
<!-- proof-end -->

### 直接計算：Wick平方は変わるが応力テンソルは変わらない例

質量零・最小結合のMinkowski時空で、[MICA11の滑らかな双解による状態変更](../MICA11/index.md#prop-mica11-smooth-shift)により $D=\lambda\,1\otimes1$（$\lambda\ge0$）とします。[MICA14のWick平方の差](../MICA14/index.md#prop-mica14-state-difference)は $[D]=\lambda$。一方、$\partial 1=0$、$m=\xi=0$ なので

$$
\mathcal D_{ab}D=\lambda T_{ab}[1]=0.
$$

同じ背景でも、観測量によって状態への依存の仕方は異なります。$D=\lambda\,t_x t_y$ とすれば前節の計算から $\mathcal D_{00}D=\lambda/2$、$\mathcal D_{ij}D=(\lambda/2)\delta_{ij}$、すべて定数なので発散は零です。

### なぜ個々の期待値では保存が難しいのか

[MICA12の局所Hadamard式](../MICA12/index.md#def-mica12-local-parametrix) $H_{\ell,\infty}$ は、特異部分を消すための**parametrix**であり、一般には厳密な双解ではありません。$F_{\omega,\ell}=\omega_2-H_{\ell,\infty}$ が滑らかでも

$$
P_xF_{\omega,\ell}=-P_xH_{\ell,\infty},
\qquad
P_yF_{\omega,\ell}=-P_yH_{\ell,\infty}
$$

は一般に零でなく、右辺は局所幾何で決まる滑らかな余りです。したがって $\nabla^a\mathcal D_{ab}F_{\omega,\ell}=0$ と無条件に置くのは誤りです。この障害を消すには、Hadamard係数の再帰・共変微分の交換関係を使った**状態に依存しない局所補正**、または古典場の殻上で零になる $g_{ab}\phi P\phi$ 型の項を利用する改善点分離が必要です。

<a id="def-mica15-renormalized-stress"></a>

<!-- formal-statement-start -->
> **定義（保存的な点分離応力テンソルの期待値）**  
> 上記の4次元実Klein–Gordon場について、局所Hadamard減算から得た滑らかな実対称余り $F_{\omega,\ell}^{\mathrm s}$ に対し、状態非依存の局所幾何テンソル $Q_{ab}[g,m,\xi,\ell]$ を、各凸正規近傍の重なりで整合し、$\nabla^a(\mathcal D_{ab}F_{\omega,\ell}^{\mathrm s}+Q_{ab})=0$ となる保存的な規約で選ぶ。さらに許容される有限な保存的局所テンソル $C_{ab}$ を指定し、

$$
\langle T_{ab}\rangle_{\omega}^{\mathrm{ren}}
:=\mathcal D_{ab}F_{\omega,\ell}^{\mathrm s}
+Q_{ab}[g,m,\xi,\ell]+C_{ab}[g,m,\xi]
$$

> と表す。$F^{\mathrm s}(x,y)=\frac12(F(x,y)+F(y,x))$ の実対称部分を用いる。この表示は、**保存を満たす $Q_{ab}$ が構成された規約を前提にする**。滑らかな余りがあるだけで任意の $Q_{ab}$ が自動的に存在するという定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica15-renormalized-stress -->
### 定義の確認：平坦な質量零真空

**定義の確認**。保存と規格化を別々に確かめます。

質量零Minkowski真空で同じ正周波数規約を選ぶと、[MICA14の直接例](../MICA14/index.md#def-mica14-subtracted-remainder)のとおり $H_{\ell,\infty}=\omega_{2,0}$ なので $F_{0,\ell}=0$ です。Minkowski真空の応力テンソルを零とする規格化を選び $Q_{ab}+C_{ab}=0$ とすれば、$\langle T_{ab}\rangle_0^{\mathrm{ren}}=0$、その発散も零です。これは**規格化を選んだ例**であり、一般の曲がった時空の補正が零という意味ではありません。
<!-- definition-example-end -->

上の $Q_{ab}$ の存在と局所共変な構成は簡単な微分恒等式だけでは証明できません。**この一段だけは外部の主要定理を明示的に用います**。Moretti, *Commun. Math. Phys.* **232** (2003), 189–221, [“Comments on the Stress-Energy Tensor Operator in Curved Spacetime”](https://doi.org/10.1007/s00220-002-0702-7) は、Hadamard係数と改良された点分離作用素を用いて保存的な期待値を構成します。ここでの $Q_{ab}$ はその保存的な構成を概念的に書いたもので、任意の関数の発散を後付けで打ち消せるという主張ではありません。証明の責務が残る箇所は**個々の状態の保存的規約の存在**であり、前の状態間差の証明はこの存在定理を必要としません。

## 4. 局所共変性と有限自由度

「曲がった時空ごとに好きな基準状態を選んで減算する」のでは、別の時空の同じ局所領域で異なる規約が生じ得ます。必要なのは、背景の小さい領域を大きい時空へ埋め込んでも、その領域内では**同じ幾何学的レシピ**を適用できることです。

ここでは向きと時間向きを保つ等長埋め込み $\psi:(M,g)\to(M',g')$ が、像での因果構造を保ち、場の定数 $m,\xi$ が一致する場合を考えます。等次元の等長埋め込みは局所微分同相なので、像の開集合で二点分布を制限して比較できます。

状態 $\omega'$ を $M'$ に取り、その場の局所代数を $M$ に引き戻した状態を $\psi^*\omega'$ と書きます。その二点分布は $\psi^*\omega'_2$ です。

**時空間で一つの特別な状態を自動選択する**とは仮定しません。

<a id="def-mica15-local-covariance"></a>

<!-- formal-statement-start -->
> **定義（応力テンソル期待値の局所共変性）**  
> 上記の因果構造・向き・時間向きを保つ等長埋め込み $\psi$ と、任意の対応するHadamard状態 $\omega'$ に対して、局所的なテンソル場の処方 $T^{\mathrm{ren}}$ が

$$
\langle T_{ab}\rangle^{\mathrm{ren}}_{\psi^*\omega'}[g]
=\psi^*\!\left(
\langle T_{ab}\rangle^{\mathrm{ren}}_{\omega'}[g']
\right)
$$

> を満たすとき、その処方を局所共変と呼ぶ。左辺は $M$ の引き戻し状態で評価した値、右辺は $M'$ の値を幾何学的に引き戻したものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica15-local-covariance -->
### 定義の確認：Minkowski時空の平行移動

**定義の確認**。等長埋め込みと状態の変換を平坦模型で照合します。

$\psi_a(x)=x+a$ というMinkowski等長写像を考えます。質量・結合定数と計量は不変、二点関数は引き戻しで $D_a(x,y)=D(x+a,y+a)$ となります。平坦時空の $I$ は恒等写像で、$\partial_xD_a(x,y)=(\partial_1D)(x+a,y+a)$ です。従って[双微分作用](#def-mica15-bidifferential)と対角制限の各項は平行移動と交換し、

$$
\mathcal D_{ab}D_a(x)=\mathcal D_{ab}D(x+a).
$$

定義の両辺が一致することを具体的に確かめました。この最小例は一般の曲がった時空で局所共変性を証明する代わりではありません。
<!-- definition-example-end -->

保存・局所共変性・スケーリングを満たす処方は一つに定まりません。次の分類で使う「工学次元4」は、長さの単位を変えたときに応力テンソルが $L^{-4}$ として変換することを意味します。$m$ は $L^{-1}$、$R$ と $G_{ab}$ は $L^{-2}$、$\nabla$ は $L^{-1}$ です。

<a id="def-mica15-curvature-variations"></a>

<!-- formal-statement-start -->
> **定義（局所曲率作用の変分テンソル）**  
> コンパクト支持の計量変分による汎関数微分として、境界項を無視できる任意の4次元Lorentz時空で

$$
\begin{aligned}
I_{ab}&:=\frac{2}{\sqrt{|g|}}
\frac{\delta}{\delta g^{ab}}
\int R^2\sqrt{|g|}\,d^4x,\\
J_{ab}&:=\frac{2}{\sqrt{|g|}}
\frac{\delta}{\delta g^{ab}}
\int R_{cd}R^{cd}\sqrt{|g|}\,d^4x
\end{aligned}
$$

> と定める。変分の符号はこの式で固定する。ここでの汎関数微分は局所密度のEuler–Lagrange微分を表し、非コンパクト時空で積分自体の収束を要求するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica15-curvature-variations -->
### 定義の確認：平坦時空

**定義の確認**。曲率が零の背景で作用の一次変分まで調べます。

Minkowski時空では $R_{ab}=R=0$ で、それらの共変微分も零です。例えば $R^2$ の一次変分は $2R\,\delta R+R^2\delta\sqrt{|g|}/\sqrt{|g|}$ に比例するので、平坦背景で零です。同様に $R_{cd}R^{cd}$ の一次変分の各項には曲率が少なくとも一つ掛かり、零になります。従って $I_{ab}=J_{ab}=0$ です。定義を「曲率の二乗だから零」と短絡せず、一次変分まで確かめました。
<!-- definition-example-end -->

<a id="prop-mica15-conserved-curvature"></a>

<!-- formal-statement-start -->
> **命題（曲率変分テンソルの保存性）**  
> 上記の $I_{ab},J_{ab}$ は、4次元の任意の滑らかなLorentz計量に対して局所的・対称であり、

$$
\nabla^a I_{ab}=0,
\qquad \nabla^a J_{ab}=0.
$$

> また $\nabla^ag_{ab}=0$、$\nabla^aG_{ab}=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

曲率から作った積分は座標変換で不変です。コンパクト支持のベクトル場に沿って計量を少し動かすと、一次変分は零です。その式を部分積分すれば、変分テンソルの発散が零と分かります。

<!-- proof-start -->
### 証明

$S[g]$ を二つの曲率二乗作用のいずれか、$K_{ab}=2(\sqrt{|g|})^{-1}\delta S/\delta g^{ab}$ とします。コンパクト支持のベクトル場 $X$ が生成する微小座標変換で、逆計量のLie微分は

$$
\delta_Xg^{ab}=\mathcal L_Xg^{ab}
=-\nabla^aX^b-\nabla^bX^a.
$$

各作用は微分同相不変なので、対称性を使い

$$
0=\delta_XS
=\frac12\int K_{ab}\delta_Xg^{ab}\,d\mu_g
=-\int K_{ab}\nabla^aX^b\,d\mu_g.
$$

支持がコンパクトだから境界項はなく、部分積分して

$$
0=\int (\nabla^aK_{ab})X^b\,d\mu_g.
$$

任意の $X$ に対して成り立つため $\nabla^aK_{ab}=0$。二つの $S$ をそれぞれ選べば $I,J$ の保存を得ます。$g$ の保存はLevi-Civita接続の計量両立性、$G$ の保存は[縮約Bianchi恒等式](../../../物理系/GR/GR7/index.md#thm-gr7-contracted-bianchi)から従います。
<!-- proof-end -->

<a id="thm-mica15-finite-freedom"></a>

<!-- formal-statement-start -->
> **定理（4次元スカラー場の有限なくりこみ自由度）**  
> 同じ4次元実自由Klein–Gordon理論 $(M,g,m,\xi)$ に対する二つの保存的かつ局所共変な応力テンソル処方を考える。さらにWald–Hollands型の適切な工学次元・スケーリング、滑らかな背景依存、局所性などの条件を両者に課す。このとき、単位演算子倍として現れる期待値の差は、背景に共通する実定数 $\alpha_i$ により

$$
\Delta T_{ab}
=\alpha_1m^4g_{ab}+\alpha_2m^2G_{ab}
+\alpha_3I_{ab}+\alpha_4J_{ab}.
$$

> 係数は採用した処方に依存し、個々のHadamard状態には依存しない。この四項の分類は上記公理を課した**4次元**での主張であり、任意の背景依存関数を係数に入れてよいわけではない。
<!-- formal-statement-end -->

### 証明の見取り図と証明の境界

[曲率変分テンソルの保存性](#prop-mica15-conserved-curvature)により、列挙した四種類はすべて保存されます。質量と曲率の工学次元はそれぞれ1と2で、四項は次元4です。4次元ではEuler密度の変分が局所的に消えるため、$R_{abcd}R^{abcd}$ 由来の保存的テンソルは $I,J$ の線形結合に帰着します。

ここで確認したのは、列挙した候補の保存性と次元です。**ほかの局所項を排除する段階**には、局所共変なWick多項式・スケーリングと背景依存の分類定理が必要です。この部分は [Hollands–Wald, *Commun. Math. Phys.* **223** (2001), Theorems 5.1–5.2](https://arxiv.org/abs/gr-qc/0103074) とWald型公理のもとで引用します。公理を外したときや4次元以外で、同じ四項だけが残ると推論してはいけません。

### 長さスケールの変更と状態変更を混同しない

[尺度変更とWick平方の局所項](../MICA14/index.md#prop-mica14-scale-shift)によれば、$\ell'=e^s\ell$ のもとで滑らかな余りの変化は、同じ状態について

$$
F_{\omega,\ell'}-F_{\omega,\ell}
=\frac{s}{4\pi^2}V_\infty
$$

という状態非依存の局所的な滑らかな二変数項です。双微分作用をかけると

$$
\mathcal D_{ab}F_{\omega,\ell'}
-\mathcal D_{ab}F_{\omega,\ell}
=\frac{s}{4\pi^2}\mathcal D_{ab}V_\infty.
$$

ただし $\mathcal D_{ab}V_\infty$ **単独**の保存をここから主張してはいけません。保存的な規約全体の $Q_{ab}$ も尺度とともに変わり得ます。両方を含む保存的な局所共変処方の差だけが、適切な背景依存の滑らかさの条件のもとで前定理の有限項の形に整理されます。一方、同じ尺度変更を二状態に施す場合は $V_\infty$ と局所補正が共通なので、[状態間差の定理](#thm-mica15-state-difference)は不変です。

## 5. trace anomalyへの入口

応力テンソルの**トレース**とは $T^a{}_a=g^{ab}T_{ab}$ のことです。4次元で $m=0,\xi=1/6$ の場は古典的に共形結合と呼ばれます。曲率項のトレースを取ると $g^{ab}G_{ab}=-R$、$g^{ab}g_{ab}=4$ なので

$$
T^a{}_a[\phi]
=-(\nabla\phi)^2-2m^2\phi^2
+\xi\{-R\phi^2+3\Box_g(\phi^2)\}.
$$

$\Box_g(\phi^2)=2\phi\Box_g\phi+2(\nabla\phi)^2$ に $m=0,\xi=1/6$ を代入すると

$$
T^a{}_a[\phi]
=\phi(\Box_g-\tfrac16R)\phi=-\phi P\phi=0
\qquad(P\phi=0).
$$

量子化後、局所共変性・保存性・場の方程式を維持する応力テンソルのトレースには、一般の曲がった時空で**状態非依存の曲率からなる項が残り得ます**。これを trace anomaly（トレース異常）と呼びます。古典的に零という結果を、そのまま量子の複合場へ適用してはいけません。共形質量零の場合、曲率二乗に由来する異常の普遍的な部分は、許された有限項で一般にすべて消せず、$\Box_gR$ に比例する成分は規約に依存します。正確な係数・曲率不変量の分類は [Wald, *Phys. Rev. D* **17** (1978), 1477](https://doi.org/10.1103/PhysRevD.17.1477) を参照します。ここでは個別の曲率係数を根拠なく固定しません。

## 6. 演習――保存と有限性を別々に検算する

<a id="ex-mica15-a01"></a>
### 演習 MICA15-A1：質量項の符号

- Level: A
- 目安時間: 15分

4次元Minkowski時空（$-+++$）で $\xi=0$、$m>0$ とし、$\phi(t)=\cos(mt)$ とする。$P\phi=0$ を確認し、$T_{00}$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\Box_\eta\phi=-\partial_t^2\phi=m^2\cos(mt)$ より $P\phi=-m^2\phi+m^2\phi=0$。$\partial_t\phi=-m\sin(mt)$ で、$(\nabla\phi)^2=-m^2\sin^2(mt)$。従って[古典的応力テンソル](#def-mica15-classical-stress)から

$$
\begin{aligned}
T_{00}&=m^2\sin^2(mt)
-\tfrac12(-1)\{-m^2\sin^2(mt)+m^2\cos^2(mt)\}\\
&=\tfrac12m^2\{\sin^2(mt)+\cos^2(mt)\}
=\tfrac12m^2.
\end{aligned}
$$

時間に依存しない正のエネルギー密度を得ます。計量の時間成分が $-1$ であることを二度使いました。
<!-- solution-end -->

<a id="ex-mica15-a02"></a>
### 演習 MICA15-A2：対角で微分する変数

- Level: A
- 目安時間: 12分

$F(x,y)=f(x)f(y)$ を滑らかなスカラー関数とする。$[F]$ の一階・二階微分を計算し、$[\nabla_a^x\nabla_b^xF]$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

$[F]=f^2$。積の微分により

$$
\nabla_a[F]=2f\nabla_af,
$$

$$
\nabla_a\nabla_b[F]
=2\nabla_af\nabla_bf+2f\nabla_a\nabla_bf.
$$

他方、$y$ は固定しているので $\nabla_a^x\nabla_b^xF=(\nabla_a\nabla_bf)(x)f(y)$、対角値は $f\nabla_a\nabla_bf$ です。両者の差は $2\nabla_af\nabla_bf+f\nabla_a\nabla_bf$。対角値と二階微分は無条件に交換しません。
<!-- solution-end -->

<a id="ex-mica15-a03"></a>
### 演習 MICA15-A3：定数解の状態変更

- Level: A
- 目安時間: 12分

質量零・最小結合Minkowski真空に $\lambda\,1\otimes1$（$\lambda\ge0$）を加えたHadamard状態について、Wick平方期待値と応力テンソル期待値の元の状態との差を求めよ。

<!-- solution-start -->
#### 詳細解答

$P1=0$ なので状態の正値性とHadamard性は[滑らかな双解の加算](../MICA11/index.md#prop-mica11-smooth-shift)に従います。[Wick平方の状態間差](../MICA14/index.md#prop-mica14-state-difference)から $[\lambda\,1\otimes1]=\lambda$。応力テンソルについては[状態間差の定理](#thm-mica15-state-difference)と[極化の命題](#prop-mica15-polarization)から $\Delta T_{ab}=\lambda T_{ab}[1]$。全偏微分と $m,\xi$ が零なのでこれは零です。二つの局所量が同じ状態依存を持つとは限りません。
<!-- solution-end -->

<a id="ex-mica15-a04"></a>
### 演習 MICA15-A4：有限なだけでは保存しない

- Level: A
- 目安時間: 12分

連結なLorentz時空上の滑らかな実関数 $h$ について $K_{ab}=h g_{ab}$ と置く。$\nabla^aK_{ab}$ を計算し、$h$ が定数でないときの結論を述べよ。

<!-- solution-start -->
#### 詳細解答

Levi-Civita接続の計量両立性により

$$
\nabla^a(hg_{ab})
=(\nabla^ah)g_{ab}+h\nabla^ag_{ab}
=\nabla_bh.
$$

$M$ が連結で $h$ が非定数なら、ある点で $\nabla_bh\ne0$ です。$K$ は滑らかかつ有限ですが、一般には保存されません。これは[滑らかな余りの引き戻し](../MICA14/index.md#prop-mica14-differential-restriction)だけで保存性を言えない反例です。
<!-- solution-end -->

<a id="ex-mica15-a05"></a>
### 演習 MICA15-A5：曲率二乗項の次元

- Level: A
- 目安時間: 12分

4次元で $[m]=L^{-1}$、$[R]=L^{-2}$、$[\nabla]=L^{-1}$ とする。$m^4g_{ab}$、$m^2G_{ab}$、$I_{ab}$、$J_{ab}$ の工学次元を調べよ。

<!-- solution-start -->
#### 詳細解答

$g_{ab}$ はここでは無次元なので $[m^4g_{ab}]=L^{-4}$。$G_{ab}$ はRicciテンソルと $Rg_{ab}$ の和で $L^{-2}$ だから $[m^2G_{ab}]=L^{-4}$。$I,J$ は曲率二乗（$L^{-4}$）の作用密度を計量で変分したもので、計量変分は次元を変えないので両者とも $L^{-4}$。いずれも応力テンソルの次元と一致します。次元一致は**保存・局所共変性を証明する十分条件ではありません**。
<!-- solution-end -->

<a id="ex-mica15-b01"></a>
### 演習 MICA15-B1：共形質量零場のトレース

- Level: B
- 目安時間: 28分

4次元で $m=0$、$\xi=1/6$、$P\phi=0$ とする。[古典的応力テンソル](#def-mica15-classical-stress)のトレースが零であることを、$\Box_g(\phi^2)$ を展開して導け。

<!-- solution-start -->
#### 詳細解答

$g^{ab}g_{ab}=4$、$g^{ab}G_{ab}=R-\frac12(4)R=-R$ です。最小結合部分のトレースは $(\nabla\phi)^2-2\{(\nabla\phi)^2+m^2\phi^2\}=-(\nabla\phi)^2-2m^2\phi^2$。$\xi$ 項は $\xi(-R\phi^2+3\Box_g\phi^2)$。さらに

$$
\Box_g(\phi^2)=2\phi\Box_g\phi+2(\nabla\phi)^2.
$$

$m=0$、$\xi=1/6$ とすると $(\nabla\phi)^2$ の係数は $-1+(1/6)\cdot3\cdot2=0$。残りは

$$
T^a{}_a
=-\frac16R\phi^2+\phi\Box_g\phi
=-\phi P\phi=0.
$$

最後の等号には場の方程式を使いました。量子のtrace anomalyへこの古典計算を無条件に持ち込んではいけません。
<!-- solution-end -->

<a id="ex-mica15-b02"></a>
### 演習 MICA15-B2：解の積から保存テンソルへ

- Level: B
- 目安時間: 27分

質量零・最小結合のMinkowski時空で $u=t$、$v=x^1$ とする。$P u=P v=0$ を確かめ、$F_{u,v}=(u(x)v(y)+v(x)u(y))/2$ に対する $\mathcal D_{ab}F_{u,v}$ の $01,10,00,11$ 成分と発散を求めよ。

<!-- solution-start -->
#### 詳細解答

座標一次関数なので $\Box u=\Box v=0$。勾配は $\partial_au=\delta_a^0$、$\partial_av=\delta_a^1$、内積 $\eta^{ab}\partial_au\partial_bv=0$ です。[極化の命題](#prop-mica15-polarization)から

$$
\mathcal D_{ab}F_{u,v}
=\tfrac12(\partial_au\partial_bv+\partial_av\partial_bu)
-\tfrac12\eta_{ab}(\partial^cu\partial_cv).
$$

従って $\mathcal D_{01}=\mathcal D_{10}=1/2$、$\mathcal D_{00}=\mathcal D_{11}=0$。他成分も零で、すべて定数なので $\partial^a\mathcal D_{ab}=0$。任意の対称テンソルが保存的なのではなく、双解条件からこの成分が生まれています。
<!-- solution-end -->

<a id="ex-mica15-b03"></a>
### 演習 MICA15-B3：尺度を変えた二状態の差

- Level: B
- 目安時間: 25分

同じ背景上の二つのHadamard状態 $\omega,\omega'$ を取り、$\ell'=e^s\ell$ とする。$F_{\omega,\ell'}-F_{\omega,\ell}=sV_\infty/(4\pi^2)$ が成り立つと仮定する。二状態の応力テンソル差が尺度変更によって不変であることを示し、$\mathcal D_{ab}V_\infty$ が単独で保存されるとは言えない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

最初に同じ尺度で二状態の滑らかな余りを引くと

$$
F_{\omega,\ell}-F_{\omega',\ell}
=\omega_2-\omega'_2=D.
$$

尺度変更後も、両状態に同じ $sV_\infty/(4\pi^2)$ が加わるので差は

$$
F_{\omega,\ell'}-F_{\omega',\ell'}
=(F_{\omega,\ell}-F_{\omega',\ell})
+\frac{s}{4\pi^2}(V_\infty-V_\infty)=D.
$$

線形な $\mathcal D$ をかけても差は $\mathcal DD$ です。保存的規約の局所補正と有限項も状態に共通なので相殺します。ただし $P_xV_\infty=0$ は一般に成立せず、[保存恒等式](#prop-mica15-classical-conservation)の双解条件が不足しています。尺度によって変わる $Q_{ab}$ を含む全処方の保存を確認する必要があります。
<!-- solution-end -->

<a id="ex-mica15-b04"></a>
### 演習 MICA15-B4：微分同相不変性から保存を導く

- Level: B
- 目安時間: 30分

$S[g]=\int R^2d\mu_g$ とし、$I_{ab}$ を[曲率変分テンソル](#def-mica15-curvature-variations)で定める。コンパクト支持のベクトル場 $X$ による $\delta_X g^{ab}$ を書き、$\nabla^aI_{ab}=0$ を導け。境界項が消える条件を明記せよ。

<!-- solution-start -->
#### 詳細解答

微小微分同相変換では $\delta_Xg^{ab}=-\nabla^aX^b-\nabla^bX^a$。$R^2d\mu_g$ はスカラー密度なので、コンパクト支持の $X$ による全作用の変化は境界項となり零です。従って

$$
0=\frac12\int I_{ab}\delta_Xg^{ab}d\mu_g
=-\int I_{ab}\nabla^aX^b d\mu_g.
$$

積の微分 $\nabla^a(I_{ab}X^b)=(\nabla^aI_{ab})X^b+I_{ab}\nabla^aX^b$ を用いて部分積分します。$X$ の支持がコンパクトだから境界積分は零で、

$$
\int(\nabla^aI_{ab})X^b d\mu_g=0.
$$

任意のコンパクト支持の $X$ について成立するので基本補題から $\nabla^aI_{ab}=0$。単に $R^2$ がスカラーだというだけでなく、**変分後に任意の $X$ を使う**段階が必要です。
<!-- solution-end -->

<a id="ex-mica15-c01"></a>
### 演習 MICA15-C1：点分離から有限くりこみ自由度まで

- Level: C
- 目安時間: 55分

4次元の同じ $(M,g,P)$ に対する二つのHadamard状態 $\omega,\omega'$ を考える。

1. $D=\omega_2-\omega'_2$ が滑らかな実対称双解である根拠を列挙する。
2. $D$ の二階微分を対角で評価する順序と、曲がった時空で必要な二点間の演算子を示す。
3. $\mathcal D_{ab}D$ の保存を説明し、個々の $F_{\omega,\ell}$ の保存を同じ議論だけでは言えない理由を示す。
4. $\ell$ の変更と有限な幾何項の付加に関して、どの量が規約に依存し、どの差が不変か述べる。
5. 古典的共形質量零場のトレースと量子のtrace anomalyが矛盾しない理由を説明する。

<!-- solution-start -->
#### 詳細解答

**1.** [Hadamard二点分布の差の滑らかさ](../MICA13/index.md#prop-mica13-smooth-difference)から $D\in C^\infty$。[二点分布の条件](../MICA11/index.md#def-mica11-two-point-conditions)を引けば $P_xD=P_yD=0$、交換子の反対称部分は消えるので $D^T=D$。Hermite性とこの対称性を合わせて $\overline D=D$ です。

**2.** 生の二点分布をそれぞれ対角へ代入するのでなく、まず $D$ を二変数上で作ります。$x,y$ の添字を比較するには測地線に沿う平行移動 $I_a{}^{b'}$ が必要です。[双微分作用](#def-mica15-bidifferential)の $\nabla_a^x\nabla_{b'}^y$、混合トレース、$\nabla_a\nabla_b[D]$ を計算し、**最後に** $y=x$ を取ります。

**3.** $D$ は滑らかな対称双解なので、[極化の命題](#prop-mica15-polarization)で古典テンソルの交差項へ戻し、[古典的保存恒等式](#prop-mica15-classical-conservation)とCauchy解の連続依存による近似で $\nabla^a\mathcal DD=0$ を得ます。しかし $F_{\omega,\ell}=\omega_2-H_{\ell,\infty}$ では一般に $P_xF=-P_xH\ne0$ です。状態非依存の局所補正を含めた保存的処方が別途必要になります。

**4.** [尺度変更](../MICA14/index.md#prop-mica14-scale-shift)で各 $F$ は $sV_\infty/(4\pi^2)$ だけ変わります。$\mathcal D$ をかけた値だけでは保存を保証せず、保存的局所補正も併せて変えます。正則性・スケーリング等の公理のもとで残る有限な差は[四種のテンソル](#thm-mica15-finite-freedom)の線形結合です。ただしどちらも**状態に共通**なので、二状態間の差 $\mathcal DD$ は不変です。

**5.** 古典場では $m=0,\xi=1/6$、$P\phi=0$ のとき $T^a{}_a=-\phi P\phi=0$ です。量子場の複合積はHadamard subtractionと保存的な局所調整を経て初めて定義されるため、古典的な積の恒等式をそのまま同一点の作用素積に移すことはできません。保存・局所共変性・場の方程式を維持した結果、状態非依存の曲率異常が残り得ます。
<!-- solution-end -->

## 7. どこまで到達したか

生の二点分布から局所観測量を作るには、**共通特異部分の減算 → 微分 → 対角制限 → 保存を保証する局所規約**の順序を守ります。二状態間の差は滑らかな双解だけで計算でき、その保存性を古典場の恒等式から再構成できます。一方、個々の期待値の保存・局所共変性と有限自由度の**存在・分類**は、Hadamard再帰と局所Wick多項式の定理を必要とします。

ここで行ったのは**自由場の複合局所量の制限**です。相互作用場の時間順序積を衝突対角へ**延長**する摂動的くりこみは別の構成であり、MQFC系列で扱います。Hadamard状態の存在や状態の一意的選択、半古典Einstein方程式の解の存在まで、この章から結論してはいけません。

## 参考文献

- Valter Moretti, [*Comments on the Stress-Energy Tensor Operator in Curved Spacetime*](https://doi.org/10.1007/s00220-002-0702-7), *Commun. Math. Phys.* **232** (2003), 189–221（保存的な改善点分離）。
- Stefan Hollands and Robert M. Wald, [*Local Wick Polynomials and Time Ordered Products of Quantum Fields in Curved Spacetime*](https://arxiv.org/abs/gr-qc/0103074), *Commun. Math. Phys.* **223** (2001), 289–326（局所共変性・スケーリングと有限項）。
- Stefan Hollands and Robert M. Wald, [*Quantum Fields in Curved Spacetime*](https://arxiv.org/abs/1401.2026)（複合場・応力テンソルと状態の違いの概説）。
- Robert M. Wald, [*Trace Anomaly of a Conformally Invariant Quantum Field in Curved Spacetime*](https://doi.org/10.1103/PhysRevD.17.1477), *Phys. Rev. D* **17** (1978), 1477（trace anomaly）。
