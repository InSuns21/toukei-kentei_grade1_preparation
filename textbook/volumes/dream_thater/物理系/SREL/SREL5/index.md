# SREL5 電磁場テンソル・Maxwell方程式の共変形式

<!-- definition-example-audit: strict -->

[SREL2のMinkowski計量](../SREL2/index.md#def-srel2-minkowski-metric)と[SREL3の四元ベクトル](../SREL3/index.md#def-srel3-four-momentum)によって、運動量を慣性系によらず扱えるようになりました。しかし電磁気学では、電場と磁場を別々の三次元ベクトルとして書くと、時間と空間を混ぜるLorentz変換の下で式がどう変わるのか見えにくくなります。

本章では、電場と磁場を**一つの反対称な二階テンソル**に組み込みます。さらに電荷密度と電流密度を一つの四成分の量にまとめ、真空中のMaxwell方程式が二つの四次元方程式になることを全成分で検算します。最後に、Lorentz変換で法則が保たれる理由と、その方程式が電荷保存を要求する理由を確かめます。

## 1. 記法・単位・物理的な前提

時空は平坦な $\mathbb R^4$、座標は $x^\mu=(ct,x,y,z)$、$\mu=0,1,2,3$、計量は

$$
\eta_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1),\qquad
c>0,\qquad \varepsilon_0\mu_0c^2=1
$$

です。ここで $\varepsilon_0,\mu_0>0$ は真空の定数で、**SI単位系**を採用します。添字を上下するにはこの計量を使い、同じ上下添字は $0$ から $3$ まで和を取ります。$i,j,k$ は空間添字 $1,2,3$ だけを走ります。

電場 $\boldsymbol E$、磁束密度 $\boldsymbol B$、電荷密度 $\rho$、電流密度 $\boldsymbol j$ は十分滑らかな実関数とし、成分展開には $C^1$、電荷保存とLorentz変換後の微分計算には少なくとも局所的 $C^2$ の正則性を仮定します。点電荷など特異な源や媒質中の構成則はここでは扱いません。

時間と空間の微分を同じ表に収めるため、

$$
\partial_\mu=\frac{\partial}{\partial x^\mu}
=\left(\frac1c\partial_t,\partial_x,\partial_y,\partial_z\right),
\qquad
\partial^\mu=\eta^{\mu\nu}\partial_\nu
=\left(\frac1c\partial_t,-\partial_x,-\partial_y,-\partial_z\right)
$$

と書きます。二つ目の式は空間成分の符号が逆になる点に注意してください。

### 1.1 三次元のMaxwell方程式を出発点とする

次の四本は数学だけから証明する式ではなく、実験的に採用する真空中の電磁場の法則です。[EMAG7で導入したFaraday則](../../EMAG/EMAG7/index.md#principle-emag7-faraday)と[Ampère–Maxwell則](../../EMAG/EMAG7/index.md#principle-emag7-ampere-maxwell)を、静電・静磁のGauss則と合わせて再掲します。四次元化はこれらの法則と同値な記述を導く作業です。

<a id="principle-srel5-maxwell-si"></a>

<!-- formal-statement-start -->
> **原理（真空中のMaxwell方程式・SI単位系）**  
> $\boldsymbol E,\boldsymbol B,\rho,\boldsymbol j$ が前述の正則性を持つとき、古典電磁気学の場の方程式を次のように与える。

$$
\begin{aligned}
\nabla\cdot\boldsymbol E&=\rho/\varepsilon_0,&
\nabla\times\boldsymbol B-\frac1{c^2}\partial_t\boldsymbol E&=\mu_0\boldsymbol j,\\
\nabla\cdot\boldsymbol B&=0,&
\nabla\times\boldsymbol E+\partial_t\boldsymbol B&=\boldsymbol0.
\end{aligned}
$$
<!-- formal-statement-end -->

前の二式は電荷・電流を源とし、後の二式は通常の磁荷を導入しない真空モデルを表します。たとえば時間・空間ともに一定な $\boldsymbol E,\boldsymbol B$ と $\rho=0,\boldsymbol j=\boldsymbol0$ は四式を満たします。ところが一定な $\rho\ne0$ と零の $\boldsymbol E$ を同時に置くと最初の式が壊れます。**場と源は独立に好きな関数を選べるわけではありません。**

## 2. 四元電流と電磁場テンソル

まず、密度は観測系によって変わるものの、電荷密度と電流密度は独立な物理量ではないことに注目します。時空上の流れとして組にします。

<a id="def-srel5-four-current"></a>

<!-- formal-statement-start -->
> **定義（四元電流）**  
> SI単位の電荷密度 $\rho$、三次元電流密度 $\boldsymbol j=(j_x,j_y,j_z)$ に対し、反変四元電流を

$$
J^\mu=(c\rho,j_x,j_y,j_z)
$$

> と定める。共変成分は $J_\mu=(c\rho,-j_x,-j_y,-j_z)$ とする。異なる慣性系では四元ベクトルの法則 $J'^\mu=\Lambda^\mu{}_\nu J^\nu$ で変換することを物理モデルの一部として仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel5-four-current -->
### 例：静止した電荷分布の一点

**定義の確認**：ある瞬間の局所的な静止系で $\rho=\rho_0$、$\boldsymbol j=\boldsymbol0$ なら、$J=(c\rho_0,0,0,0)$ です。$x$ 方向の速度 $v=\beta c$ の[SREL1のLorentz変換](../SREL1/index.md#thm-srel1-lorentz)を適用すると

$$
J'^0=\gamma c\rho_0,\qquad J'^1=-\gamma v\rho_0.
$$

よって $\rho'=\gamma\rho_0$、$j'_x=-\gamma v\rho_0$ となります。源が静止している系から動く系に移れば、見かけの電荷密度だけでなく電流も生じます。
<!-- definition-example-end -->

電場と磁場をまとめるには、四元電流とは異なり **二つの添字を持つ**対象が必要です。反対称性があれば独立成分は $4\cdot3/2=6$ 個になり、三成分ずつの電場と磁場をちょうど収納できます。

<a id="def-srel5-field-tensor"></a>

<!-- formal-statement-start -->
> **定義（電磁場テンソル）**  
> 各時空点で $\boldsymbol E,\boldsymbol B$ が与えられたとき、反変電磁場テンソル $F^{\mu\nu}$ を、符号規約 $(+,-,-,-)$ に対して

$$
F^{0i}=-\frac{E_i}{c},\qquad
F^{ij}=-\sum_{k=1}^3\epsilon_{ijk}B_k,\qquad
F^{\nu\mu}=-F^{\mu\nu}
$$

> で定める。ただし $\epsilon_{123}=+1$ の完全反対称記号を使う。共変成分は $F_{\mu\nu}=\eta_{\mu\alpha}\eta_{\nu\beta}F^{\alpha\beta}$ とする。
<!-- formal-statement-end -->

定義を四行四列に展開すると

$$
(F^{\mu\nu})=
\begin{pmatrix}
0&-E_x/c&-E_y/c&-E_z/c\\
E_x/c&0&-B_z&B_y\\
E_y/c&B_z&0&-B_x\\
E_z/c&-B_y&B_x&0
\end{pmatrix}.
$$

添字を**一つだけ**下げるのと、**二つとも**下げるのでは結果が異なります。実際、

$$
F_{0i}=-F^{0i}=E_i/c,\qquad
F_{ij}=F^{ij}=-\epsilon_{ijk}B_k.
$$

電気成分だけ符号が反転するのは、時間方向の計量が $+1$、空間方向が $-1$ だからです。

<!-- definition-example-start: def-srel5-field-tensor -->
### 例：$x$ 方向の電場と $z$ 方向の磁場

**定義の確認**：$\boldsymbol E=(E_0,0,0)$、$\boldsymbol B=(0,0,B_0)$ に対して

$$
(F^{\mu\nu})=
\begin{pmatrix}
0&-E_0/c&0&0\\
E_0/c&0&-B_0&0\\
0&B_0&0&0\\
0&0&0&0
\end{pmatrix}.
$$

例えば $F^{12}=-\epsilon_{123}B_0=-B_0$、$F^{21}=B_0$、$F_{01}=E_0/c$ をそれぞれ直接確認できます。$F^{01}$ と $F_{01}$ を同符号として扱うと、次のGauss則の導出で符号が逆になります。
<!-- definition-example-end -->

## 3. 源を持つ二本の方程式を一つにする

電磁場テンソルの発散 $\partial_\mu F^{\mu\nu}$ は添字 $\mu$ が縮約されるため、自由な添字 $\nu$ を一つ持つ四元ベクトルになります。源の四元電流と型が一致します。

<a id="thm-srel5-inhomogeneous-maxwell"></a>

<!-- formal-statement-start -->
> **定理（非斉次Maxwell方程式の巡回微分表示）**  
> 上記のSI単位系・計量・電磁場テンソルと四元電流に対して、次の四成分の方程式は、三次元のGauss則とAmpère–Maxwell則の組に同値である。

$$
\boxed{\partial_\mu F^{\mu\nu}=\mu_0J^\nu\quad(\nu=0,1,2,3).}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\nu=0$ では $F^{i0}=E_i/c$ を代入してGauss則が出ます。$\nu=i$ では、時間微分の項が $-\partial_tE_i/c^2$、空間微分の項が $(\nabla\times\boldsymbol B)_i$ になることを確認します。二方向とも成分を戻せるので「同値」です。

<!-- proof-start -->
### 証明

まず $\nu=0$ とします。$F^{00}=0$、$F^{i0}=E_i/c$ なので

$$
\begin{aligned}
\partial_\mu F^{\mu0}
&=\partial_0F^{00}+\sum_{i=1}^3\partial_iF^{i0}\\
&=0+\frac1c\sum_{i=1}^3\partial_iE_i
=\frac1c\nabla\cdot\boldsymbol E.
\end{aligned}
$$

右辺は $\mu_0J^0=\mu_0c\rho$ です。したがって $\nabla\cdot\boldsymbol E=\mu_0c^2\rho=\rho/\varepsilon_0$ であり、Gauss則と一致します。

次に固定した $i\in\{1,2,3\}$ について $\nu=i$ とします。定義から

$$
\begin{aligned}
\partial_\mu F^{\mu i}
&=\partial_0F^{0i}+\sum_{j=1}^3\partial_jF^{ji}\\
&=-\frac1{c^2}\partial_tE_i
+\sum_{j,k=1}^3\epsilon_{ijk}\partial_jB_k\\
&=-\frac1{c^2}\partial_tE_i+(\nabla\times\boldsymbol B)_i.
\end{aligned}
$$

二行目では $F^{ji}=-\epsilon_{jik}B_k=+\epsilon_{ijk}B_k$ を使用しました。右辺 $\mu_0J^i=\mu_0j_i$ と等しいという条件が、Ampère–Maxwell則の $i$ 成分そのものです。

逆に、Gauss則があれば上の $\nu=0$ の等式を逆向きに読み、Ampère–Maxwell則の三成分があれば $\nu=1,2,3$ を逆向きに読めます。よって四成分すべてについて必要十分です。
<!-- proof-end -->

例えば定常で $\boldsymbol B=(0,0,B_z(x))$ の場合、$\nu=2$ 成分は $-\partial_x B_z=\mu_0j_y$ です。磁場の向きと電流の向きを決めるとき、縮約を形式的に覚えるより成分で符号を確認できます。

## 4. 源を持たない二本の方程式を一つにする

残る二式には、電荷・電流のような源がありません。$F$ の**下付き**成分について、三つの微分を巡回させて足すと表せます。これは電磁場の変換で符号を維持するためにも便利な形式です。

<a id="thm-srel5-homogeneous-maxwell"></a>

<!-- formal-statement-start -->
> **定理（斉次Maxwell方程式の巡回微分表示）**  
> 前節の設定で $F_{\mu\nu}=\eta_{\mu\alpha}\eta_{\nu\beta}F^{\alpha\beta}$ とする。次の条件は、磁場のGauss則とFaradayの電磁誘導則の組に同値である。

$$
\boxed{
\partial_\lambda F_{\mu\nu}
+\partial_\mu F_{\nu\lambda}
+\partial_\nu F_{\lambda\mu}=0
\quad(\lambda,\mu,\nu=0,1,2,3).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

反対称性のため、添字が重なる成分は恒等的に零です。互いに異なる三添字の選び方は四種類だけで、$(1,2,3)$ が磁場の発散、$(0,1,2)$、$(0,2,3)$、$(0,3,1)$ が電磁誘導の各成分を表します。

<!-- proof-start -->
### 証明

空間添字 $(\lambda,\mu,\nu)=(1,2,3)$ に対して $F_{23}=-B_x$、$F_{31}=-B_y$、$F_{12}=-B_z$ だから、

$$
\partial_1F_{23}+\partial_2F_{31}+\partial_3F_{12}
=-(\partial_xB_x+\partial_yB_y+\partial_zB_z)
=-\nabla\cdot\boldsymbol B.
$$

次に $(\lambda,\mu,\nu)=(0,1,2)$ を取ります。$F_{12}=-B_z$、$F_{20}=-E_y/c$、$F_{01}=E_x/c$ をそのまま代入すると

$$
\begin{aligned}
\partial_0F_{12}+\partial_1F_{20}+\partial_2F_{01}
&=-\frac1c\partial_tB_z-\frac1c\partial_xE_y+\frac1c\partial_yE_x\\
&=-\frac1c\left(\partial_t B_z+(\nabla\times\boldsymbol E)_z\right).
\end{aligned}
$$

同じように、**各成分を明示して**別の二組を計算します。$(0,2,3)$ のとき $F_{23}=-B_x$、$F_{30}=-E_z/c$、$F_{02}=E_y/c$ なので

$$
\partial_0F_{23}+\partial_2F_{30}+\partial_3F_{02}
=-\frac1c\left(\partial_tB_x+\partial_yE_z-\partial_zE_y\right).
$$

$(0,3,1)$ のとき $F_{31}=-B_y$、$F_{10}=-E_x/c$、$F_{03}=E_z/c$ なので

$$
\partial_0F_{31}+\partial_3F_{10}+\partial_1F_{03}
=-\frac1c\left(\partial_tB_y+\partial_zE_x-\partial_xE_z\right).
$$

以上で独立な四成分はそれぞれ磁場のGauss則とFaraday則の三成分の $-1/c$ 倍です。残りの添字の組は、反対称性と添字の順序の入れ替えでこれらの符号違い、または同じ添字を含んで零になる式です。逆向きにも四式の零から元の二本の方程式を回収できるため同値です。
<!-- proof-end -->

ここで $F^{\mu\nu}$ をそのまま $F_{\mu\nu}$ の代わりに置くと、$\partial_t\boldsymbol B$ と $\nabla\times\boldsymbol E$ の間の符号が崩れます。**下付きにする操作は見た目だけの記法変更ではありません。**

## 5. Lorentz変換で方程式が保たれる

[SREL2の計量保存](../SREL2/index.md#thm-srel2-interval-invariance)を満たす**一定**のLorentz行列 $\Lambda$ を使い、座標を $x'^\mu=\Lambda^\mu{}_\nu x^\nu+a^\mu$ で変換します。$a^\mu$ は定数です。電磁場には添字が二つあるので、各添字にLorentz行列を一つずつ作用させます。

<a id="prop-srel5-field-boost"></a>

<!-- formal-statement-start -->
> **命題（電磁場のLorentz変換）**  
> 電磁場テンソルの成分が

$$
F'^{\mu\nu}(x')
=\Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta F^{\alpha\beta}(x)
$$

> に従うとする。$x$ 方向への速度 $v=\beta c$ の[SREL1のboost](../SREL1/index.md#thm-srel1-lorentz)に対して、電場・磁場の $y,z$ 成分は

$$
\begin{aligned}
E'_y&=\gamma(E_y-vB_z),&
E'_z&=\gamma(E_z+vB_y),\\
B'_y&=\gamma(B_y+vE_z/c^2),&
B'_z&=\gamma(B_z-vE_y/c^2)
\end{aligned}
$$

> に変換され、$E'_x=E_x$、$B'_x=B_x$ である。
<!-- formal-statement-end -->

### 証明の見取り図

テンソル法則を二つの添字に適用するだけですが、$F^{0i}=-E_i/c$ のマイナスが効きます。$y$ 成分の電場と $z$ 成分の磁場を独立に計算し、残りも同じ行列要素で確かめます。

<!-- proof-start -->
### 証明

boostの非零行列要素は $\Lambda^0{}_0=\Lambda^1{}_1=\gamma$、$\Lambda^0{}_1=\Lambda^1{}_0=-\beta\gamma$、$\Lambda^2{}_2=\Lambda^3{}_3=1$ です。まず

$$
\begin{aligned}
F'^{02}
&=\Lambda^0{}_0F^{02}+\Lambda^0{}_1F^{12}\\
&=\gamma(-E_y/c)-\beta\gamma(-B_z)
=-\gamma(E_y-vB_z)/c.
\end{aligned}
$$

従って $E'_y=-cF'^{02}=\gamma(E_y-vB_z)$ です。別の成分では

$$
\begin{aligned}
F'^{12}
&=\Lambda^1{}_0F^{02}+\Lambda^1{}_1F^{12}\\
&=(-\beta\gamma)(-E_y/c)+\gamma(-B_z)\\
&=-\gamma(B_z-vE_y/c^2),
\end{aligned}
$$

よって $B'_z=-F'^{12}=\gamma(B_z-vE_y/c^2)$ です。$z$ 側についても

$$
\begin{aligned}
F'^{03}&=\gamma F^{03}-\beta\gamma F^{13}
=-\gamma(E_z+vB_y)/c,\\
F'^{13}&=-\beta\gamma F^{03}+\gamma F^{13}
=\gamma(B_y+vE_z/c^2).
\end{aligned}
$$

$F^{13}=B_y$ だから $B'_y=F'^{13}$、$E'_z=-cF'^{03}$ です。最後に

$$
F'^{01}=\gamma^2(1-\beta^2)F^{01}=F^{01},
\qquad F'^{23}=F^{23}
$$

となり、$E'_x=E_x$、$B'_x=B_x$ を得ます。
<!-- proof-end -->

ここでは電場と磁場が、単にそれぞれの三次元ベクトルとして回転するのではなく**互いに混ざる**ことが分かりました。磁場だけの場でも別の慣性系では電場が見えることがあります。

<a id="thm-srel5-covariance"></a>

<!-- formal-statement-start -->
> **定理（Maxwell方程式のLorentz共変性）**  
> $\Lambda$ を定数Lorentz行列とし、十分滑らかな $F,J$ が前節の二つの四元Maxwell方程式を満たすとする。四元電流を $J'^\nu=\Lambda^\nu{}_\beta J^\beta$、電磁場を上の二階テンソル法則で変換したとき、プライム座標でも

$$
\partial'_\mu F'^{\mu\nu}=\mu_0J'^\nu,
\qquad
\partial'_\lambda F'_{\mu\nu}
+\partial'_\mu F'_{\nu\lambda}
+\partial'_\nu F'_{\lambda\mu}=0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

偏微分は変数変換によって逆行列を一つ持ちます。その逆行列と $F$ の変換行列が、縮約添字の場所で打ち消し合います。斉次式では、下付きテンソルが逆行列を二つ持つことを使います。

<!-- proof-start -->
### 証明

定数行列の変数変換で連鎖律を使うと、各 $\mu$ に対して

$$
\partial'_\mu=(\Lambda^{-1})^\alpha{}_\mu\partial_\alpha.
$$

従って非斉次式の左辺は

$$
\begin{aligned}
\partial'_\mu F'^{\mu\nu}
&=(\Lambda^{-1})^\alpha{}_\mu\partial_\alpha
  \left(\Lambda^\mu{}_\gamma\Lambda^\nu{}_\delta F^{\gamma\delta}\right)\\
&=(\Lambda^{-1})^\alpha{}_\mu\Lambda^\mu{}_\gamma
  \Lambda^\nu{}_\delta\,\partial_\alpha F^{\gamma\delta}\\
&=\delta^\alpha{}_\gamma\Lambda^\nu{}_\delta
  \partial_\alpha F^{\gamma\delta}\\
&=\Lambda^\nu{}_\delta\mu_0J^\delta
=\mu_0J'^\nu.
\end{aligned}
$$

二行目では $\Lambda$ が座標に依存しないので微分が行列へ作用しないことを使いました。

斉次式では、Lorentz計量保存から

$$
F'_{\mu\nu}
=(\Lambda^{-1})^\alpha{}_\mu
 (\Lambda^{-1})^\beta{}_\nu F_{\alpha\beta}
$$

です。これを $\partial'_\lambda F'_{\mu\nu}$ に代入すると、三つの逆行列を外へ出して

$$
\partial'_\lambda F'_{\mu\nu}
=(\Lambda^{-1})^\gamma{}_\lambda
 (\Lambda^{-1})^\alpha{}_\mu
 (\Lambda^{-1})^\beta{}_\nu
 \partial_\gamma F_{\alpha\beta}.
$$

他の二つの巡回項では、右辺のダミー添字 $\gamma,\alpha,\beta$ を巡回して同じ前因子にそろえます。従って巡回和は

$$
\begin{aligned}
&\partial'_\lambda F'_{\mu\nu}
+\partial'_\mu F'_{\nu\lambda}
+\partial'_\nu F'_{\lambda\mu}\\
&\quad=(\Lambda^{-1})^\gamma{}_\lambda
(\Lambda^{-1})^\alpha{}_\mu
(\Lambda^{-1})^\beta{}_\nu
\left(\partial_\gamma F_{\alpha\beta}
+\partial_\alpha F_{\beta\gamma}
+\partial_\beta F_{\gamma\alpha}\right)=0.
\end{aligned}
$$

括弧内が元の斉次方程式で零になることを使いました。
<!-- proof-end -->

この証明は**慣性系間の一定Lorentz変換**に対するものです。位置によって変わる一般の座標変換では、行列を定数として微分の外へ出す計算はそのままでは成立しません。

## 6. 四元形式から電荷保存を導く

非斉次Maxwell方程式の巡回微分表示には、源に対する制約が含まれます。反対称テンソルの発散をもう一度とると、二階偏微分の対称性と反対称性が打ち消し合うからです。

<a id="thm-srel5-continuity"></a>

<!-- formal-statement-start -->
> **定理（Maxwell方程式からの局所電荷保存）**  
> $F$ が反対称で $C^2$ 級、$J$ が $C^1$ 級で、$\partial_\mu F^{\mu\nu}=\mu_0J^\nu$ が各点で成立し、$\mu_0\ne0$ とする。このとき

$$
\boxed{\partial_\nu J^\nu=0
\quad\Longleftrightarrow\quad
\partial_t\rho+\nabla\cdot\boldsymbol j=0}
$$

> が成り立つ。左側はMaxwell方程式からの必要条件であり、任意の保存電流に対して場の解が必ず存在するという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial_\nu$ を非斉次式の両辺へ作用させます。混合偏微分を交換できるため、$\mu,\nu$ の役割を入れ替えた同じ式がマイナス符号を持ち、発散の発散が零になります。

<!-- proof-start -->
### 証明

元の式へ $\partial_\nu$ を作用させて和を取ると

$$
\mu_0\partial_\nu J^\nu
=\partial_\nu\partial_\mu F^{\mu\nu}.
$$

右辺を $D$ とおきます。$C^2$ 級なので $\partial_\nu\partial_\mu=\partial_\mu\partial_\nu$ です。ダミー添字を交換し、$F^{\nu\mu}=-F^{\mu\nu}$ を使うと

$$
\begin{aligned}
D&=\partial_\mu\partial_\nu F^{\mu\nu}\\
&=\partial_\nu\partial_\mu F^{\nu\mu}\\
&=-\partial_\nu\partial_\mu F^{\mu\nu}=-D.
\end{aligned}
$$

従って $2D=0$、$D=0$、$\mu_0>0$ より $\partial_\nu J^\nu=0$ です。[四元電流の定義](#def-srel5-four-current)と微分の定義を代入すると

$$
\begin{aligned}
\partial_\nu J^\nu
&=\partial_0(c\rho)+\partial_1j_x+\partial_2j_y+\partial_3j_z\\
&=\frac1c\partial_t(c\rho)+\nabla\cdot\boldsymbol j
=\partial_t\rho+\nabla\cdot\boldsymbol j.
\end{aligned}
$$

これで二つの保存式が同値であることも確かめられました。
<!-- proof-end -->

例えば $\rho(t,\boldsymbol r)=\rho_0$、$\boldsymbol j=\boldsymbol0$ は連続の式を満たしますが、$F=0$ も同時に指定すると $\nabla\cdot\boldsymbol E=\rho/\varepsilon_0$ を満たすのは $\rho_0=0$ の場合だけです。**電荷保存は場の方程式を解くための必要条件ですが、十分条件ではありません。**

## 7. 適用範囲と次章への接続

本章の共変性は、平坦な時空、真空のMaxwell方程式、慣性系間の一定Lorentz変換の組について証明しました。媒質の分極・磁化、曲がった時空、点電荷の特異な源は追加の構成則や数学的設定を必要とします。電磁場テンソルを変換できるようになったので、次章では電磁場のLorentz変換をさまざまな配置で検算し、エネルギー運動量テンソルへ進みます。

---

## 演習

### Level A

### A1. 電場と磁場の六成分

$\boldsymbol E=(E_0,0,0)$、$\boldsymbol B=(0,0,B_0)$ とする。$F^{\mu\nu}$ の行列を書き、$F_{01}$ と $F_{12}$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[電磁場テンソルの定義](#def-srel5-field-tensor)で $F^{01}=-E_0/c$、$F^{12}=-B_0$ です。反対称性で逆順の成分の符号を反転させると

$$
(F^{\mu\nu})=
\begin{pmatrix}
0&-E_0/c&0&0\\
E_0/c&0&-B_0&0\\
0&B_0&0&0\\
0&0&0&0
\end{pmatrix}.
$$

下付きにするには $\eta_{00}\eta_{11}=-1$、$\eta_{11}\eta_{22}=+1$ を使うので

$$
F_{01}=(1)(-1)F^{01}=E_0/c,\qquad
F_{12}=(-1)(-1)F^{12}=-B_0.
$$

<!-- solution-end -->

### A2. Gauss則を四元式から取り出す

$\nu=0$ の $\partial_\mu F^{\mu\nu}=\mu_0J^\nu$ を展開し、SI単位の電場のGauss則を得よ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[テンソルと四元電流](#def-srel5-field-tensor)の成分を直接使います。$F^{00}=0$、$F^{i0}=E_i/c$、$J^0=c\rho$ なので、

$$
\partial_\mu F^{\mu0}
=\partial_0F^{00}+\sum_i\partial_iF^{i0}
=\frac{\nabla\cdot\boldsymbol E}{c}
=\mu_0c\rho.
$$

両辺を $c$ 倍し、$c^2\mu_0=1/\varepsilon_0$ とすると

$$
\nabla\cdot\boldsymbol E=\frac{\rho}{\varepsilon_0}.
$$

$F^{0i}$ を誤って使用すると符号が反転するので、添字の順番を区別します。
<!-- solution-end -->

### A3. $y$ 方向のAmpère–Maxwell則

$\boldsymbol B=(0,0,B_z(x,t))$、$\boldsymbol E=(0,E_y(x,t),0)$ とする。非斉次四元式の $\nu=2$ 成分を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[テンソル定義](#def-srel5-field-tensor)から、$\nu=2$ に寄与する成分は $F^{02}=-E_y/c$、$F^{12}=-B_z$ です。他の成分は零なので

$$
\begin{aligned}
\partial_\mu F^{\mu2}
&=\partial_0F^{02}+\partial_1F^{12}\\
&=-\frac1{c^2}\partial_tE_y-\partial_xB_z
=\mu_0j_y.
\end{aligned}
$$

一方、$(\nabla\times\boldsymbol B)_y=-\partial_xB_z$ ですから、

$$
(\nabla\times\boldsymbol B)_y-\frac1{c^2}\partial_tE_y=\mu_0j_y
$$

と一致します。
<!-- solution-end -->

### A4. Faraday則の $z$ 成分

$F_{12}=-B_z$、$F_{20}=-E_y/c$、$F_{01}=E_x/c$ を使い、斉次四元式の $(0,1,2)$ 成分がどの三次元方程式を表すか示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[斉次方程式](#thm-srel5-homogeneous-maxwell)へ順番を変えず代入して、

$$
\begin{aligned}
0&=\partial_0F_{12}+\partial_1F_{20}+\partial_2F_{01}\\
&=-\frac1c\partial_tB_z-\frac1c\partial_xE_y+\frac1c\partial_yE_x.
\end{aligned}
$$

$c>0$ を掛けて移項すると

$$
\partial_tB_z+\partial_xE_y-\partial_yE_x=0.
$$

これは $\partial_t B_z+(\nabla\times\boldsymbol E)_z=0$ です。
<!-- solution-end -->

### A5. 保存しない電流は許されるか

$\rho(t,\boldsymbol r)=\rho_0+at$、$\boldsymbol j=0$ とする。定数 $a\ne0$ に対し、これを源とする滑らかな真空Maxwell解が存在するか答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[電荷保存の必要条件](#thm-srel5-continuity)に代入すると

$$
\partial_\mu J^\mu
=\partial_t\rho+\nabla\cdot\boldsymbol j=a+0=a\ne0.
$$

滑らかなMaxwell解が存在すれば同定理によりこの値は零でなければならず、矛盾します。よって指定した源に対する滑らかな解は存在しません。条件が壊れているのは場の境界条件ではなく、源が満たすべき局所保存則です。
<!-- solution-end -->

### Level B

### B1. 斉次四元式から磁束のGauss則

斉次Maxwell方程式の $(1,2,3)$ 成分を計算し、$\nabla\cdot\boldsymbol B=0$ を導け。また、添字が二つ等しいときは式が恒等的に零であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[電磁場テンソル](#def-srel5-field-tensor)の下付き空間成分は $F_{23}=-B_x$、$F_{31}=-B_y$、$F_{12}=-B_z$ です。従って

$$
\partial_1F_{23}+\partial_2F_{31}+\partial_3F_{12}
=-\partial_xB_x-\partial_yB_y-\partial_zB_z=0,
$$

つまり $\nabla\cdot\boldsymbol B=0$ です。次に例として $(\lambda,\mu,\nu)=(0,0,2)$ とすると

$$
\partial_0F_{02}+\partial_0F_{20}+\partial_2F_{00}
=\partial_0(F_{02}+F_{20})+0=0.
$$

一般に同じ添字があれば、二項が反対称性で打ち消し合い、残りの対角成分が零なので恒等式になります。
<!-- solution-end -->

### B2. 電場だけの系をboostする

元の慣性系で一様な $\boldsymbol E=(0,E_0,0)$、$\boldsymbol B=0$ とする。$x$ 正方向へ速さ $0<v<c$ で動く慣性系の $\boldsymbol E',\boldsymbol B'$ を求め、符号をテンソル成分で確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[電磁場のboostの命題](#prop-srel5-field-boost)では $E_y=E_0$、$B_z=0$、その他の成分も零です。従って

$$
\boldsymbol E'=(0,\gamma E_0,0),\qquad
\boldsymbol B'=(0,0,-\gamma vE_0/c^2).
$$

テンソル式から直接確認すると、$F^{02}=-E_0/c$ だけが独立な非零成分であり、

$$
\begin{aligned}
F'^{02}&=\gamma F^{02}=-\gamma E_0/c,\\
F'^{12}&=-\beta\gamma F^{02}
=+\beta\gamma E_0/c.
\end{aligned}
$$

よって $E'_y=-cF'^{02}=\gamma E_0$、$B'_z=-F'^{12}=-\gamma vE_0/c^2$ です。$B'_z$ が負となるのは、$F^{12}=-B_z$ の符号とboostの非対角項の符号が両方作用するためです。
<!-- solution-end -->

### B3. 一次元の電磁波を検算する

$u=x-ct$、$f:\mathbb R\to\mathbb R$ は $C^2$ 級とする。$E_0$ は定数とし、

$$
\boldsymbol E=(0,E_0 f(u),0),\qquad
\boldsymbol B=(0,0,E_0 f(u)/c),\qquad \rho=0,\ \boldsymbol j=0
$$

が真空Maxwell方程式を満たすことを四本の三次元式で確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$u=x-ct$ なので $\partial_x f(u)=f'(u)$、$\partial_t f(u)=-c f'(u)$ です。$E_x=E_z=B_x=B_y=0$、各非零成分は $x,t$ のみに依存するため、

$$
\nabla\cdot\boldsymbol E=\partial_yE_y=0,\qquad
\nabla\cdot\boldsymbol B=\partial_zB_z=0.
$$

回転のうち非零の可能性があるのは $y,z$ 成分です。まず

$$
(\nabla\times\boldsymbol E)_z=\partial_xE_y=E_0f'(u),\qquad
\partial_tB_z=-E_0f'(u)
$$

なのでFaraday則が成立します。次に

$$
(\nabla\times\boldsymbol B)_y=-\partial_xB_z=-\frac{E_0}{c}f'(u),\qquad
\frac1{c^2}\partial_tE_y=-\frac{E_0}{c}f'(u).
$$

従ってAmpère–Maxwell則の左辺も零です。最後に $\rho=\boldsymbol j=0$ なので右辺の源も零であり、四式をすべて満たします。
<!-- solution-end -->

### Level C

### C1. 真空平面波を別の慣性系から見る

B3の波で $E_0>0$、$f(u)=\cos(ku)$、$k>0$ とする。$x$ 方向への速度 $0<v<c$ のLorentz boostを行う。

1. $u=x-ct$ を $(t',x')$ で表せ。
2. 新しい系の $\boldsymbol E',\boldsymbol B'$ を求め、波の進行方向と $E'_y=cB'_z$ の関係を示せ。
3. 変換後の場が、電荷・電流が零のMaxwell方程式を満たすことを**少なくとも一つの回転方程式を直接計算したうえで**確かめよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) [Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)の逆変換は $x=\gamma(x'+vt')$、$t=\gamma(t'+vx'/c^2)$ です。よって $\beta=v/c$ と置けば

$$
\begin{aligned}
u&=\gamma(x'+vt')-c\gamma(t'+vx'/c^2)\\
&=\gamma\bigl((1-\beta)x'-(c-v)t'\bigr)\\
&=\gamma(1-\beta)(x'-ct').
\end{aligned}
$$

(2) 元の場は $E_y=E_0\cos(ku)$、$B_z=E_y/c$ です。[電磁場のboost公式](#prop-srel5-field-boost)に代入すると

$$
\begin{aligned}
E'_y&=\gamma(E_y-vB_z)=\gamma(1-\beta)E_y,\\
B'_z&=\gamma(B_z-vE_y/c^2)=\frac{\gamma(1-\beta)}c E_y.
\end{aligned}
$$

従って $A=\gamma(1-\beta)E_0$、$k'=\gamma(1-\beta)k$ と置くと

$$
\boldsymbol E'=(0,A\cos(k'(x'-ct')),0),\quad
\boldsymbol B'=(0,0,A\cos(k'(x'-ct'))/c).
$$

$A>0,k'>0$ なので、位相一定の点は $x'-ct'=\text{定数}$ に沿って正の $x'$ 方向へ速さ $c$ で移動します。また各点で $E'_y=cB'_z$ です。

(3) $w=k'(x'-ct')$ と置けば $\partial_{x'}\cos w=-k'\sin w$、$\partial_{t'}\cos w=ck'\sin w$ です。Faraday則の $z$ 成分は

$$
\begin{aligned}
(\nabla'\times\boldsymbol E')_z+\partial_{t'}B'_z
&=\partial_{x'}(A\cos w)+\partial_{t'}(A\cos w/c)\\
&=-Ak'\sin w+Ak'\sin w=0.
\end{aligned}
$$

Ampère–Maxwell則の $y$ 成分も

$$
\begin{aligned}
(\nabla'\times\boldsymbol B')_y-\frac1{c^2}\partial_{t'}E'_y
&=-\partial_{x'}(A\cos w/c)-\frac1{c^2}\partial_{t'}(A\cos w)\\
&=\frac{Ak'}c\sin w-\frac{Ak'}c\sin w=0.
\end{aligned}
$$

非零成分は $x',t'$ にのみ依存するため $\nabla'\cdot\boldsymbol E'=\partial_{y'}E'_y=0$、$\nabla'\cdot\boldsymbol B'=\partial_{z'}B'_z=0$ です。源も零なので四本すべて成立します。この直接計算は[Maxwell方程式のLorentz共変性](#thm-srel5-covariance)の具体例です。
<!-- solution-end -->
