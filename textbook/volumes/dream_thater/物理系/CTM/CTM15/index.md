# CTM15 粘性応力からNavier–Stokes方程式へ

[CTM7 の局所運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)は、密度と応力が分かれば物質点の加速度を求められると教えた。しかし、保存則だけでは応力 $\sigma$ を速度 $v$ から計算できない。[CTM14 の超弾性](../CTM14/index.md#def-ctm14-hyperelastic-energy)は変形から応力を作ったが、水や空気では変形した形を固定しても、流れを止めればせん断応力が消えることがある。

そこで、流体の**変形速度**から応力を求める構成則を加える。圧力と粘性を分け、応力の発散を一項ずつ計算すれば、Navier–Stokes 方程式が現れる。本講の目標は式を暗記することではなく、**どの仮定がどの項を消したか**を説明できることである。

## 0. 対象・既習事項・単位

三次元 Euclid 空間内の時変領域 $\Omega_t$ 上で、[CTM1 の運動写像](../CTM1/index.md#def-ctm1-motion-configuration)から得た速度 $v(x,t)$ と密度 $\rho(x,t)>0$ を考える。速度は時間 $C^1$・空間 $C^2$ 級、密度は時間・空間 $C^1$ 級、圧力と粘性係数は必要な空間 $C^1$ 級とし、局所計算する点の近傍で各場は滑らかとする。境界条件を扱うときは平らな壁と連続な速度の境界値を仮定する。

[CTM4 の速度勾配・変形速度テンソル](../CTM4/index.md#def-ctm4-rate-of-deformation-spin)と [VC9 の物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)を用いる。

$$
L_{ij}=\partial_jv_i,\qquad
D=\frac{L+L^T}{2},\qquad
\theta=\operatorname{tr}D=\operatorname{div}v,\qquad
D_tv=\partial_tv+(v\cdot\nabla)v.
$$

$\partial_j=\partial/\partial x_j$、添字 $i,j,k\in\{1,2,3\}$ は直交座標成分で、反復添字は和とする。$I=I_3$、$A:B=\sum_{i,j}A_{ij}B_{ij}$、$|A|^2=A:A$ とする。$\Delta v$ は **成分ごとの Laplace 演算子**、すなわち $(\Delta v)_i=\sum_j\partial_j^2v_i$ を意味する。

- $x$: m、$t$: s、$v$: m/s、$D,\theta$: s$^{-1}$、$\rho$: kg/m$^3$。
- $\sigma$, 圧力 $p$, 偏差応力 $\tau$: Pa = N/m$^2$。動粘性係数ではなく**粘性係数** $\eta$: Pa s、体積粘性係数 $\zeta$: Pa s。
- $b$: 単位質量当たりの体積力 m/s$^2$。$\nu=\eta/\rho$（m$^2$/s）は**動粘度**であり、$\eta$ と同じ量ではない。

[CTM5 の質量保存](../CTM5/index.md#thm-ctm5-mass-equivalence)は

$$
D_t\rho+\rho\theta=0
$$

である。[CTM7 の局所運動量式](../CTM7/index.md#thm-ctm7-material-momentum)は

$$
\rho D_tv=\operatorname{div}\sigma+\rho b,\qquad
(\operatorname{div}\sigma)_i=\partial_j\sigma_{ij}.
$$

後者は角運動量の仮定の下で $\sigma=\sigma^T$ を満たす（[CTM7 の応力対称性](../CTM7/index.md#prop-ctm7-angular-stress)）。これらは**材料を選ぶ前から**成立する収支則である。

## 1. 圧力による押し合いと、形を変えることへの抵抗

流体が静止しているとき、面の向きに関係なく等しい圧力 $p>0$ が内向きに働くなら、[CTM6 の traction](../CTM6/index.md#def-ctm6-traction)は $t(n)=-pn$ であり、対応する応力は $-pI$ である。他方、隣り合う流体層を違う速さで滑らせると、相対的な滑りを妨げるせん断力が現れる。後者を速度の空間的変化で測りたい。

応力の「平均の等方部分」と「跡が零の部分」を区別する。一般の対称テンソルでは

$$
\sigma=\frac{\operatorname{tr}\sigma}{3}I
+\left(\sigma-\frac{\operatorname{tr}\sigma}{3}I\right)
$$

と分けられる。ただし、**圧縮性流体の熱力学的圧力** $p$ と、単純に $-\operatorname{tr}\sigma/3$ とした**機械的平均圧力**が一致するとは、まだ仮定していない。体積変化に起因する粘性があれば一致しないためである。

<a id="def-ctm15-deviatoric-rate"></a>

<!-- formal-statement-start -->
### 定義（変形速度の偏差部分と体積変化率）

三次元の速度場 $v$ に対し、対称な変形速度テンソル $D=(\nabla v+(\nabla v)^T)/2$ の跡を $\theta=\operatorname{div}v$ と置き、

$$
D^\circ=D-\frac{\theta}{3}I
$$

を**偏差変形速度**とする。$\operatorname{tr}D^\circ=0$ であり、$D=D^\circ+\theta I/3$ は直交分解である。
<!-- formal-statement-end -->

定義の係数 $1/3$ は三次元で $\operatorname{tr}I=3$ であることから決まる。実際、

$$
\operatorname{tr}D^\circ=\theta-\frac{\theta}{3}\operatorname{tr}I=0,\qquad
D^\circ:I=\operatorname{tr}D^\circ=0.
$$

<!-- definition-example-start: def-ctm15-deviatoric-rate -->
### **定義の確認**：等方膨張と平面せん断

$v=(a x_1,a x_2,a x_3)$（$a$ は s$^{-1}$）では $L=D=aI$、$\theta=3a$ なので $D^\circ=aI-(3a/3)I=0$。一様に体積を増やす運動は、偏差変形を作らない。一方 $v=(\gamma x_2,0,0)$ では

$$
D=\frac{\gamma}{2}
\begin{pmatrix}0&1&0\\1&0&0\\0&0&0\end{pmatrix},
\quad
\theta=0,\quad D^\circ=D.
$$

こちらは体積を局所的に変えず、形だけを変える。二つの例はそれぞれ $\operatorname{tr}D^\circ=0$ を直接満たす。
<!-- definition-example-end -->

## 2. Newton 流体の構成則

圧力だけでは流れに必要な接線方向の面力が出ない。さらに観測者の剛体回転によって見掛けの角速度が加わるため、応力を単純に $L$ に比例させるのも適切でない。[CTM4 の観測者変換則](../CTM4/index.md#prop-ctm4-observer-transform)では $D^*=QDQ^T$ と変わるので、$D$ を用いれば客観的な粘性応答が作れる。

材料の等方性と、変形速度への**線形応答**をモデルとして仮定する。$p$ は静的な体積応答に対応する圧力で、圧縮性の場合には別途状態方程式などで与えるものとする。

<a id="def-ctm15-newtonian-fluid"></a>

<!-- formal-statement-start -->
### 定義（圧縮性等方 Newton 流体）

三次元の古典的 Cauchy 連続体で、速度場 $v$ の変形速度 $D$ と偏差変形速度 $D^\circ$ に対し、Cauchy 応力を

$$
\boxed{\sigma=-pI+2\eta D^\circ+\zeta\theta I}
$$

で与える**圧縮性等方 Newton 流体**を考える。$\theta=\operatorname{div}v$、$\eta>0$ はせん断粘性係数、$\zeta\ge0$ は体積粘性係数とする。$p$ は熱力学的圧力として別に指定されるスカラー場であり、係数は温度・状態に依存してもよい。
<!-- formal-statement-end -->

ここで $\tau=2\eta D^\circ+\zeta\theta I$ が粘性応力である。この仮定は**線形運動量保存からは導かれない**。また、$\zeta=0$ と置くのは追加の材料仮定であって、一般の圧縮性 Newton 流体の必然ではない。

しばしば別の表記 $\sigma=-pI+2\eta D+\lambda_v\theta I$ を見る。$D=D^\circ+\theta I/3$ を代入して係数を比較すると

$$
\lambda_v=\zeta-\frac{2\eta}{3},\qquad
\zeta=\lambda_v+\frac{2\eta}{3}.
$$

したがって散逸条件は $\lambda_v\ge0$ ではなく、$\eta>0$ と $\lambda_v+2\eta/3\ge0$ である。固体の Lamé 係数 $\lambda$ と $\lambda_v$ は別物である。

<!-- definition-example-start: def-ctm15-newtonian-fluid -->
### **定義の確認**：二枚の板の間を流れる液体

$0\le y\le h$ の流体について $v=(Uy/h,0,0)$、$U$ は m/s、$h>0$ は m、$p=p_0$ とする。前節のせん断の例で $\gamma=U/h$ と置けば $\theta=0$ だから、

$$
\sigma=
\begin{pmatrix}
-p_0&\eta U/h&0\\
\eta U/h&-p_0&0\\
0&0&-p_0
\end{pmatrix}.
$$

上側の法線 $n=e_2$ に対する traction は $\sigma e_2=(\eta U/h,-p_0,0)$。せん断応力は Pa、圧力を除く接線成分は板の速度差 $U$ と粘性係数 $\eta$ に比例し、間隔 $h$ に反比例する。定義の各条件である対称性、偏差部分、体積変化率をこの行列で直接確かめられる。
<!-- definition-example-end -->

<a id="prop-ctm15-objective-newtonian"></a>

<!-- formal-statement-start -->
### 命題（Newton 粘性応力の客観性）

粘性係数 $\eta,\zeta$ が観測者の回転によって不変なスカラー材料量であり、圧力 $p$ も不変であるとする。重ね合わせた剛体運動の回転 $Q(t)\in SO(3)$ に対し、Newton 応力の客観性は次の式で表される。

$$
\sigma=-pI+2\eta D^\circ+\zeta\theta I,\qquad
\sigma^*=Q\sigma Q^T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[CTM4 の $D$ の変換](../CTM4/index.md#prop-ctm4-observer-transform)から跡と偏差部分がどう変わるか確かめ、各項を共役する。

<!-- proof-start -->
### 証明

$D^*=QDQ^T$、$Q^TQ=I$ より $\theta^*=\operatorname{tr}(QDQ^T)=\operatorname{tr}D=\theta$。したがって

$$
(D^\circ)^*=QDQ^T-\frac{\theta}{3}I
=Q\left(D-\frac{\theta}{3}I\right)Q^T=QD^\circ Q^T.
$$

$p,\eta,\zeta$ をスカラー不変量として代入すると

$$
\sigma^*=-pI+2\eta QD^\circ Q^T+\zeta\theta I
=Q(-pI+2\eta D^\circ+\zeta\theta I)Q^T.
$$

このため、速度勾配の反対称部分に観測者回転の付加項があっても応力には現れない。$\square$
<!-- proof-end -->

## 3. 粘性が散逸させる仕事を計算する

[CTM9 の内部エネルギー収支](../CTM9/index.md#thm-ctm9-internal-energy)には $\sigma:D$ が現れる。圧縮・膨張に対して圧力がする仕事は $-p\theta$ であり、残りの粘性部分 $\tau:D$ は不可逆な仕事に対応する。Newton 流体でこの量が非負かを調べる。

<a id="thm-ctm15-viscous-dissipation"></a>

<!-- formal-statement-start -->
### 定理（Newton 流体の粘性散逸）

三次元の圧縮性等方 Newton 流体で、$\eta>0,\zeta\ge0$ とし $D$ を実対称の変形速度テンソルとする。$\tau=2\eta D^\circ+\zeta\theta I$ の仕事率密度は

$$
\boxed{\tau:D=2\eta|D^\circ|^2+\zeta\theta^2\ge0.}
$$

非圧縮条件 $\theta=0$ のもとでは $\tau:D=2\eta D:D\ge0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

偏差部分と等方部分の二重内積がゼロになることが核心である。エネルギー式に単なる「粘性は熱になる」という言葉を足すのでなく、成分で符号を確認する。

<!-- proof-start -->
### 証明

[変形速度の偏差部分と体積変化率](#def-ctm15-deviatoric-rate)から $D=D^\circ+(\theta/3)I$、$D^\circ:I=0$、$I:D=\theta$ である。したがって

$$
\begin{aligned}
\tau:D
&=(2\eta D^\circ+\zeta\theta I):(D^\circ+\theta I/3)\\
&=2\eta D^\circ:D^\circ
 +\frac{2\eta\theta}{3}(D^\circ:I)
 +\zeta\theta(I:D)\\
&=2\eta|D^\circ|^2+\zeta\theta^2.
\end{aligned}
$$

$|D^\circ|^2$ と $\theta^2$ は非負で、係数の仮定から結論が従う。$\theta=0$ なら $D^\circ=D$ であり、式の右辺は $2\eta D:D$ となる。$\square$
<!-- proof-end -->

例えば先の二枚の板の流れでは $D_{12}=D_{21}=U/(2h)$ なので

$$
D:D=2\left(\frac{U}{2h}\right)^2=\frac{U^2}{2h^2},
\qquad
\tau:D=\eta\frac{U^2}{h^2}.
$$

単位は Pa/s = W/m$^3$。この量は応力が流体に供給する機械仕事全体 $\sigma:D$ と一般には一致せず、**圧縮性の場合は圧力仕事 $-p\theta$ を区別する**。粘性散逸が熱へ変わる過程を含む熱方程式を解くには、熱力学・状態方程式の追加データが必要になる。

## 4. 応力の発散から支配方程式へ

構成則が分かったので、ここで初めて [CTM7 の局所運動量式](../CTM7/index.md#thm-ctm7-material-momentum)へ代入する。まず圧縮性の場合の式を残し、それから単純な流体でどの項が消えるかを証明する。

<a id="thm-ctm15-compressible-momentum"></a>

<!-- formal-statement-start -->
### 定理（圧縮性 Newton 流体の運動量方程式）

$\rho>0$、$v$、$p$、$\eta>0$、$\zeta\ge0$ が第0節の正則性を満たし、質量保存、局所運動量収支、[圧縮性等方 Newton 構成則](#def-ctm15-newtonian-fluid)が成立するとする。このとき

$$
\boxed{
\rho\{\partial_tv+(v\cdot\nabla)v\}
=-\nabla p+\operatorname{div}(2\eta D^\circ+\zeta\theta I)+\rho b.
}
$$

加えて $D_t\rho+\rho\theta=0$ が成立する。ただし、**この二式だけで一般の圧縮性流れが閉じるわけではない**。$p$ と温度等に対する状態方程式・エネルギー則が別途必要である。
<!-- formal-statement-end -->

### 証明の見取り図

圧力は $\operatorname{div}(-pI)=-\nabla p$ として現れる。粘性係数が空間で変わるとき、微分を係数の外へ出せないことに注意する。

<!-- proof-start -->
### 証明

成分ごとに [CTM7 の運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)の右辺を計算すると、

$$
\begin{aligned}
(\operatorname{div}\sigma)_i
&=\partial_j(-p\delta_{ij}+2\eta D^\circ_{ij}+\zeta\theta\delta_{ij})\\
&=-\partial_i p+\partial_j(2\eta D^\circ_{ij})+\partial_i(\zeta\theta).
\end{aligned}
$$

$\partial_j(p\delta_{ij})=\partial_i p$ は Kronecker 記号 $\delta_{ij}$ を使った計算である。左辺の $D_tv$ を $\partial_tv+v_j\partial_jv$ と書けば表示した方程式を得る。質量保存は [CTM5 の連続の式](../CTM5/index.md#thm-ctm5-mass-equivalence)そのものである。$\square$
<!-- proof-end -->

粘性係数一定の場合は、さらに中間計算を進められる。$D^\circ_{ij}=(\partial_jv_i+\partial_iv_j)/2-\theta\delta_{ij}/3$ だから、二階微分の交換を用いて

$$
\begin{aligned}
\partial_j(2\eta D^\circ_{ij})
&=\eta\partial_j(\partial_jv_i+\partial_iv_j-\tfrac23\theta\delta_{ij})\\
&=\eta\Delta v_i+\eta\partial_i\theta-\tfrac{2\eta}{3}\partial_i\theta\\
&=\eta\Delta v_i+\frac{\eta}{3}\partial_i\theta.
\end{aligned}
$$

$\zeta$ も一定なら $\partial_i(\zeta\theta)=\zeta\partial_i\theta$。したがって圧縮性の粘性項は

$$
\eta\Delta v+\left(\zeta+\frac{\eta}{3}\right)\nabla(\operatorname{div}v)
$$

となる。**圧縮性のままで $\eta\Delta v$ だけを残すのは一般には誤り**である。

## 5. 非圧縮条件と密度一定は同じ主張ではない

[CTM5 の連続の式](../CTM5/index.md#thm-ctm5-mass-equivalence)を使うと、非圧縮 $\theta=\operatorname{div}v=0$ は

$$
D_t\rho=0
$$

と同値である（$\rho>0$）。つまり各物質点の密度は一定だが、**別の物質点どうしで密度が等しい必要はない**。たとえば異なる密度の液体を均一な速度で移動させれば、場所によって密度は変わり得る。

<a id="def-ctm15-incompressible-newtonian"></a>

<!-- formal-statement-start -->
### 定義（非圧縮 Newton 流体の応力）

三次元の流体で $\operatorname{div}v=0$ を課し、$\eta>0$ を粘性係数とする。非圧縮 Newton 模型は

$$
\boxed{\sigma=-pI+2\eta D,\qquad \operatorname{div}v=0}
$$

を満たすとする。$p$ は非圧縮拘束を保つために運動量方程式と境界条件で決まる**圧力（拘束反力）**として扱い、一般には密度だけの関数として先に指定しない。
<!-- formal-statement-end -->

この定義は $\theta=0$ と $D^\circ=D$ を用いた圧縮性 Newton 式の応力と同形だが、圧力の決め方は異なる。境界に速度を指定する際にも圧力の値そのものは定数分だけ不定となり得る。

<!-- definition-example-start: def-ctm15-incompressible-newtonian -->
### **定義の確認**：密度の異なる層でも非圧縮

$v=(U,0,0)$（$U$ は定数）、$\rho(x,t)=\rho_*\{1+\epsilon\sin[k(x_1-Ut)]\}$ とする。$\rho_*>0$、$|\epsilon|<1$、$k>0$（m$^{-1}$）なら $\rho>0$ であり、

$$
\operatorname{div}v=0,\quad
\partial_t\rho=-\rho_*\epsilon kU\cos[k(x_1-Ut)],\quad
v\cdot\nabla\rho=\rho_*\epsilon kU\cos[k(x_1-Ut)].
$$

従って $D_t\rho=0$。$\epsilon\ne0$ なら密度は一般に空間一定でない。それでも $D=0$、$\sigma=-pI$ という定義上の非圧縮応力を持ち、$p$ が一定、$b=0$ なら運動量式も満たす。
<!-- definition-example-end -->

<a id="thm-ctm15-incompressible-navier-stokes"></a>

<!-- formal-statement-start -->
### 定理（一定粘性係数の非圧縮 Navier–Stokes 方程式）

三次元の古典的 Cauchy 流体で、第0節の正則性、質量保存、運動量収支、[非圧縮 Newton 構成則](#def-ctm15-incompressible-newtonian)、$\operatorname{div}v=0$、**空間で一定の** $\eta>0$ を仮定する。このとき

$$
\boxed{
\rho\{\partial_tv+(v\cdot\nabla)v\}
=-\nabla p+\eta\Delta v+\rho b,\qquad \operatorname{div}v=0.
}
$$

さらに初期密度が空間的に一様な定数 $\rho_*>0$ なら、物質点の運動に沿い $\rho(x,t)=\rho_*$ が保たれ、$\nu=\eta/\rho_*$ として

$$
\partial_tv+(v\cdot\nabla)v=-\frac{1}{\rho_*}\nabla p+\nu\Delta v+b.
$$

後者では初期・境界条件も別途課す。
<!-- formal-statement-end -->

### 証明の見取り図

[圧縮性の式](#thm-ctm15-compressible-momentum)から $\theta=0$ を代入するだけではなく、粘性応力の発散を**各成分について**計算する。密度を一定とする箇所は質量保存から独立に確認する。

<!-- proof-start -->
### 証明

$\theta=0$ より [偏差分解](#def-ctm15-deviatoric-rate)で $D^\circ=D$、$\zeta\theta I=0$ となる。[CTM7 の局所運動量式](../CTM7/index.md#thm-ctm7-material-momentum)への代入で

$$
\rho D_tv=-\nabla p+\operatorname{div}(2\eta D)+\rho b.
$$

$\eta$ が空間一定であり、$v$ が空間 $C^2$ 級なので微分を交換できる。成分 $i$ ごとに

$$
\begin{aligned}
[\operatorname{div}(2\eta D)]_i
&=\eta\sum_j\partial_j(\partial_jv_i+\partial_iv_j)\\
&=\eta\sum_j\partial_j^2v_i+\eta\partial_i\left(\sum_j\partial_jv_j\right)\\
&=\eta(\Delta v)_i+\eta\partial_i(\operatorname{div}v)
=\eta(\Delta v)_i.
\end{aligned}
$$

従って第一式が得られる。非圧縮と質量保存から $D_t\rho=0$。初期密度 $\rho_*$ が全物質点で同一なら、各物質軌道について常微分方程式 $d\rho(\chi(X,t),t)/dt=0$ を積分して $\rho(\chi(X,t),t)=\rho_*$、空間全体でも一定となる。最後に $\rho_*>0$ で割れば第二式が得られる。$\square$
<!-- proof-end -->

この式は、流体の**運動量収支**と**構成則**の合成である。解の存在・滑らかさをここで保証したわけではない。また非圧縮でも $\eta=\eta(x,t)$ なら

$$
[\operatorname{div}(2\eta D)]_i
=\eta(\Delta v)_i+2(\partial_j\eta)D_{ij}
$$

であり、一般に $\eta\Delta v$ に置き換えられない。

## 6. 壁との接触：境界条件は保存則から自動では出ない

壁に接する流体では、壁の速度と流体の速度をどの成分まで一致させるかを、流体内部の方程式とは別に選ぶ。流体の境界までの速度の極限を $v|_\Gamma$、壁面 $\Gamma$ の各点の速度を $V_{\mathrm{wall}}$ と書く。

<a id="def-ctm15-no-slip"></a>

<!-- formal-statement-start -->
### 定義（壁面の無滑り条件）

流体の速度 $v$ と固体壁の速度 $V_{\mathrm{wall}}$ が接触面 $\Gamma$ で定義できるとき、次の境界条件を**無滑り条件**という。

$$
\boxed{v|_\Gamma=V_{\mathrm{wall}}.}
$$

静止壁なら $V_{\mathrm{wall}}=0$ である。これは流体側の速度の法線成分だけでなく、接線成分も一致させる条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm15-no-slip -->
### **定義の確認**：上下で異なる板速度

$0\le y\le h$ で $v=(Uy/h,0,0)$、下壁の速度 $0$、上壁の速度 $Ue_1$ とすると、$y=0$ では $v|_\Gamma=0$、$y=h$ では $v|_\Gamma=Ue_1$。いずれも壁速度の**三成分全部**に一致するので、両壁で条件が成り立つ。
<!-- definition-example-end -->

もっと弱い条件として、壁を流体が通り抜けないことだけを要求できる。滑らかな壁の流体側単位法線を $n$ とする。

<a id="def-ctm15-impermeability"></a>

<!-- formal-statement-start -->
### 定義（壁面の非貫通条件）

流体の速度 $v$、固体壁の速度 $V_{\mathrm{wall}}$、接触面 $\Gamma$ の単位法線 $n$ が存在するとき、法線方向の相対速度が零となる次の境界条件を**非貫通条件**という。

$$
\boxed{(v|_\Gamma-V_{\mathrm{wall}})\cdot n=0.}
$$

流体と壁の接線方向の相対速度は、この条件だけからは零とならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm15-impermeability -->
### **定義の確認**：通り抜けずに滑る

水平な静止壁 $y=0$ の法線を $n=-e_2$、壁面上の流体速度を $v|_\Gamma=Ve_1$（$V\ne0$）とする。$(Ve_1-0)\cdot(-e_2)=0$ で非貫通条件を満たすが、$Ve_1\ne0$ なので[無滑り条件](#def-ctm15-no-slip)を満たさない。後者が前者より強いことを直接確認できる。
<!-- definition-example-end -->

これらはいずれも**運動量保存だけでは導けないモデル仮定**である。希薄気体や微細な尺度では滑りを許す模型が必要になることもある。壁で速度を指定するか traction $\sigma n$ を指定するかにより境界値問題は異なり、両者を自由に独立指定してよいわけではない。

### **直接検算**：定常平板せん断

$0<y<h$、下壁静止・上壁が $Ue_1$ で移動し、$\rho,\eta>0$ が定数、$b=0$、$p=p_0$ とする。$v=(Uy/h,0,0)$ は

$$
\operatorname{div}v=0,\quad
\partial_tv=0,\quad
(v\cdot\nabla)v=(Uy/h)\,\partial_{x_1}v=0,\quad
\Delta v=0.
$$

よって [非圧縮 Navier–Stokes 方程式](#thm-ctm15-incompressible-navier-stokes)の両辺は零である。また $v(0)=0$、$v(h)=Ue_1$ は無滑り条件を満たす。上壁から流体への接線 traction は $+\eta U/h$、下壁から流体への接線 traction は $-\eta U/h$ でつり合う。単位面積当たり上壁の仕事率は $(\eta U/h)U$、流体内部の散逸は

$$
\int_0^h \tau:D\,dy
=\int_0^h\eta\left(\frac Uh\right)^2dy
=\frac{\eta U^2}{h}.
$$

これは単位面積当たりの供給仕事率と一致する。壁面法線の向きを逆にすると traction の符号も逆になることに注意する。

## 7. よくある取り違えと適用範囲

- **非圧縮 $\neq$ 空間的密度一定**。質量保存から言えるのは $D_t\rho=0$ で、密度を全空間で同じ定数とするには一様初期密度が要る。
- **粘性係数一定と、非圧縮は別条件**。どちらが欠けても $\operatorname{div}(2\eta D)=\eta\Delta v$ とは限らない。
- **速度勾配 $L$ 全体は粘性応力ではない**。剛体回転なら $D=0$ で、Newton 流体の粘性応力は零になる。
- **無滑りは追加の境界モデル**。質量と運動量保存のみからは導けない。
- **圧縮性流体には $\zeta\theta I$ が必要になり得る**。非圧縮では消えるが、圧縮性まで同じ二項の式で扱ってはいけない。

次講 CTM16 では、ここで得た方程式の各項を長さ・速度のスケールで比較し、慣性と粘性のどちらを無視できるかを判断する。

## 8. 演習

特記がなければ三次元、直交デカルト座標、$\eta>0$ とする。速度・圧力・体積力は問題文の仮定を満たすだけ滑らかである。答えに使用する運動量式、非圧縮条件、境界条件を明記し、応力の成分と単位を確認せよ。

### Level A

### A1. 単純せん断の応力と traction

$v=(a x_2,0,0)$、$a$ は s$^{-1}$ の定数、$p=p_0$、$\eta$ 一定とする。$D,\theta,\sigma$ と法線 $n=e_2$ の traction を求め、散逸 $\tau:D$ を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$L_{12}=\partial_2v_1=a$ 以外の $L$ 成分は零なので

$$
D_{12}=D_{21}=a/2,\quad \theta=0,\quad
\sigma=\begin{pmatrix}-p_0&\eta a&0\\\eta a&-p_0&0\\0&0&-p_0\end{pmatrix}.
$$

[非圧縮 Newton 応力](#def-ctm15-incompressible-newtonian)を用いた。$t(e_2)=\sigma e_2=(\eta a,-p_0,0)^T$。$D:D=2(a/2)^2=a^2/2$ なので [粘性散逸定理](#thm-ctm15-viscous-dissipation)から $\tau:D=2\eta(a^2/2)=\eta a^2$（W/m$^3$）である。
<!-- solution-end -->

### A2. 等方膨張ではどちらの粘性が働くか

$v=a(x_1,x_2,x_3)$ とする。圧縮性 Newton 流体の $\eta,\zeta$ は一定として、$D^\circ,\theta,\tau,\tau:D$ を求めよ。$\zeta=0$ のときの結論も述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\partial_jv_i=a\delta_{ij}$ より $D=aI$、$\theta=\operatorname{tr}D=3a$。[偏差分解](#def-ctm15-deviatoric-rate)から $D^\circ=aI-(3a/3)I=0$。従って [圧縮性 Newton 構成則](#def-ctm15-newtonian-fluid)より $\tau=\zeta(3a)I$。二重内積は

$$
\tau:D=(3\zeta a I):(aI)=3\zeta a^2(I:I)=9\zeta a^2,
$$

$I:I=3$ を用いた。$\zeta=0$ ならこの運動の粘性散逸は零であるが、一般の流れのせん断散逸まで消えるわけではない。
<!-- solution-end -->

### A3. 非圧縮でも空間的に密度が変わる例

$v=(U,0,0)$、$\rho(x,t)=\rho_*[1+\epsilon\sin k(x_1-Ut)]$、$\rho_*>0$、$|\epsilon|<1$、$k>0$ とする。$\operatorname{div}v=0$ と $D_t\rho=0$ を直接確かめ、密度一定との違いを説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\partial_1v_1=\partial_2v_2=\partial_3v_3=0$ なので $\operatorname{div}v=0$。密度の時間微分は $-\rho_*\epsilon kU\cos k(x_1-Ut)$、空間微分 $\partial_1\rho=\rho_*\epsilon k\cos k(x_1-Ut)$ である。よって

$$
D_t\rho=\partial_t\rho+U\partial_1\rho
=-\rho_*\epsilon kU\cos k(x_1-Ut)
+\rho_*\epsilon kU\cos k(x_1-Ut)=0.
$$

$|\epsilon|<1$ により $\rho>0$、$\epsilon\ne0$ のとき $\partial_1\rho$ は一般に零でない。これは各粒子の密度が保存されることと矛盾しない（[CTM5 の連続の式](../CTM5/index.md#thm-ctm5-mass-equivalence)）。
<!-- solution-end -->

### A4. 応力発散と粘性の次元

$\eta$ の単位が Pa s であるとき、$2\eta D$、$\eta\Delta v$、$\rho D_tv$ の各単位を SI 基本単位で求め、一致すべき二項を特定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$D$ は s$^{-1}$、$\eta$ は kg m$^{-1}$ s$^{-1}$ なので $2\eta D$ は kg m$^{-1}$ s$^{-2}$ = Pa。$\Delta v$ は $(\mathrm{m/s})/\mathrm{m}^2=\mathrm{m}^{-1}\mathrm{s}^{-1}$ だから

$$
[\eta\Delta v]=(\mathrm{kg\,m^{-1}s^{-1}})
(\mathrm{m^{-1}s^{-1}})=\mathrm{kg\,m^{-2}s^{-2}}.
$$

$D_tv$ は m s$^{-2}$ であり、$[\rho D_tv]=(\mathrm{kg\,m^{-3}})(\mathrm{m\,s^{-2}})=\mathrm{kg\,m^{-2}s^{-2}}$。後二者は N/m$^3$ と一致し、運動量方程式の同じ側の項として比較できる。$\eta D$ は応力であって、そのまま体積力とは加算できない。
<!-- solution-end -->

### A5. 剛体回転に粘性せん断は生じるか

$v=(-\omega x_2,\omega x_1,0)$（$\omega$ 定数）とする。$L,D,\theta,\tau$ を求めよ。$\rho,\eta$ は定数、$b=0$ のとき、圧力 $p=p_0+\rho\omega^2(x_1^2+x_2^2)/2$ が運動量式を満たすことも確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$L=\begin{pmatrix}0&-\omega&0\\\omega&0&0\\0&0&0\end{pmatrix}$ だから $L^T=-L$、$D=(L+L^T)/2=0$、$\theta=0$、$\tau=2\eta D=0$。一方、速度は時間一定でも移流加速度があり、

$$
(v\cdot\nabla)v
=(-\omega x_2)\partial_1v+(\omega x_1)\partial_2v
=(-\omega^2x_1,-\omega^2x_2,0).
$$

$p$ の勾配は $(\rho\omega^2x_1,\rho\omega^2x_2,0)$。従って $\rho D_tv=-\nabla p$ で [非圧縮 Navier–Stokes 式](#thm-ctm15-incompressible-navier-stokes)を満たす。粘性応力ゼロと加速度ゼロを混同しない。
<!-- solution-end -->

### Level B

### B1. 空間変化する粘性係数

$v=(g(y),0,0)$、$\eta=\eta(y)>0$、$p=p_0$ とする。$\operatorname{div}(2\eta D)$ の全成分を求め、$\eta\Delta v$ といつ一致するかを明らかにせよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$x_2=y$ として $D_{12}=D_{21}=g'(y)/2$、その他は零、$\theta=0$ である。従って

$$
2\eta D=
\begin{pmatrix}
0&\eta(y)g'(y)&0\\
\eta(y)g'(y)&0&0\\
0&0&0
\end{pmatrix}.
$$

応力の各行の発散を取れば

$$
\operatorname{div}(2\eta D)
=\big((\eta g')'(y),0,0\big)
=\big(\eta g''+\eta'g',0,0\big).
$$

対して $\eta\Delta v=(\eta g'',0,0)$。一致の条件は $\eta'(y)g'(y)=0$（各点）であり、$\eta$ が定数であれば十分だが、非圧縮 $\theta=0$ だけでは十分でない。例えば $\eta=\eta_0(1+y/h)>0$、$g=Uy/h$（$y>0$）では差は $\eta_0U/h^2$ となる。
<!-- solution-end -->

### B2. 平行平板の定常流と仕事率

$0<y<h$ の非圧縮 Newton 流体で $\rho,\eta$ 一定、$b=0$、$p=p_0$、$v=(u(y),0,0)$ とする。下壁 $u(0)=0$、上壁 $u(h)=U$ の無滑り条件を課す。運動方程式から $u$ を求め、上壁の仕事率と流体の散逸を単位面積当たりで照合せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\operatorname{div}v=0$、$\partial_tv=0$、$(v\cdot\nabla)v=u(y)\partial_1v=0$、$\Delta v=(u''(y),0,0)$。よって [非圧縮 Navier–Stokes 式](#thm-ctm15-incompressible-navier-stokes)の第1成分は $\eta u''=0$。積分して $u(y)=Ay+B$、壁条件から $B=0$、$A=U/h$。従って $u=Uy/h$ である。

$D_{12}=D_{21}=U/(2h)$ より上側の外向き法線 $e_2$ に働く流体への接線 traction は $\sigma_{12}=\eta U/h$。上壁の流体への仕事率は $(\eta U/h)U$（W/m$^2$）。一方 [粘性散逸](#thm-ctm15-viscous-dissipation)を高さで積分すると

$$
\int_0^h2\eta D:D\,dy
=\int_0^h\eta(U/h)^2\,dy
=\eta U^2/h.
$$

両者は一致する。下壁の速度は零なので下壁がする仕事率は零だが、下壁にも反対符号のせん断 traction が作用する。
<!-- solution-end -->

### B3. 圧縮性では体積粘性を見落とせない

$v=(a x_1,0,0)$、$a$ は一定、$\eta>0,\zeta\ge0$ 一定とし、任意の滑らかな圧力 $p(x,t)$ を与える。$\theta,D^\circ,\sigma$ の対角成分と散逸 $\tau:D$ を求めよ。$\zeta\ge0$ を落としてもよいかも述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$D=\operatorname{diag}(a,0,0)$、$\theta=a$ なので

$$
D^\circ=\operatorname{diag}(2a/3,-a/3,-a/3).
$$

[圧縮性 Newton 応力](#def-ctm15-newtonian-fluid)へ代入すると

$$
\begin{aligned}
\sigma_{11}&=-p+(4\eta/3+\zeta)a,\\
\sigma_{22}&=\sigma_{33}=-p+(-2\eta/3+\zeta)a,
\end{aligned}
$$

非対角成分は零となる。$|D^\circ|^2=(4+1+1)a^2/9=2a^2/3$ より

$$
\tau:D=2\eta(2a^2/3)+\zeta a^2
=(4\eta/3+\zeta)a^2\ge0.
$$

$\zeta=0$ は特定の材料の追加仮定であり、一般には省略できない。係数が一定なので粘性応力自体の発散は零であっても、局所散逸は非零になり得る。これは粘性力の発散と粘性仕事率が異なる量だからである。
<!-- solution-end -->

### B4. 非圧縮・非一様密度の厳密な流れ

$v=(ay,0,0)$、$\rho=\rho(y)>0$（時間に依存しない滑らかな関数）、$\eta>0$ 一定、$p=p_0$、$b=0$ とする。質量保存、非圧縮 Navier–Stokes 式、粘性散逸を確認し、この流れが「密度一定」の仮定を必要とするか述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\operatorname{div}v=\partial_1(ay)=0$、$\partial_t\rho=0$、$v\cdot\nabla\rho=(ay)\partial_1\rho=0$ より $D_t\rho=0$、すなわち [CTM5 の質量保存](../CTM5/index.md#thm-ctm5-mass-equivalence)を満たす。加速度は $\partial_tv+(v\cdot\nabla)v=0+(ay)\partial_1v=0$。$\Delta v=0$、$\nabla p=0$ だから任意の正の $\rho(y)$ に対し [非圧縮 Navier–Stokes 式](#thm-ctm15-incompressible-navier-stokes)の両辺は零。

$D_{12}=D_{21}=a/2$ で $\tau:D=\eta a^2$。この解は一様密度を必要としない。$\nu=\eta/\rho(y)$ を定数として扱うことだけはできない。
<!-- solution-end -->

### Level C

### C1. 粘性の不均一性・境界条件・散逸を一つの式で結ぶ

$0<y<h$、$h>0$ の非圧縮 Newton 流体を考える。$\rho>0$ は一定、$b=0$、$p=p_0$、定常速度 $v=(u(y),0,0)$、粘性係数は $\eta(y)=\eta_0(1+\alpha y/h)$ とする。$\eta_0>0$、$\alpha>-1$、壁の無滑り条件は $u(0)=0,u(h)=U$ とする。

(i) 応力発散から $\eta(y)u'(y)$ が一定になることを導け。(ii) $\alpha\ne0$ と $\alpha=0$ に分け $u(y)$ とせん断 traction を求めよ。(iii) 単位面積当たりの散逸と上壁の供給仕事率が一致すること、$\alpha\to0$ で一様粘性の解へ戻ることを示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(i) 方程式。** $\partial_tv=0$、$\operatorname{div}v=0$、$(v\cdot\nabla)v=u(y)\partial_1v=0$。$D_{12}=D_{21}=u'/2$ で、粘性応力の非零成分は $\tau_{12}=\tau_{21}=\eta(y)u'(y)$。したがって [運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)の第1成分は

$$
0=\partial_y(\eta(y)u'(y)).
$$

積分すると $\eta(y)u'(y)=T$（定数、Pa）。これは流体層ごとのせん断 traction が同じ大きさであることを意味する。

**(ii) 速度。** $\alpha>-1$ より区間 $0\le y\le h$ で $1+\alpha y/h>0$。$\alpha\ne0$ なら

$$
u'(y)=\frac{T}{\eta_0(1+\alpha y/h)},\qquad
u(y)-u(0)=\frac{Th}{\eta_0\alpha}\log(1+\alpha y/h).
$$

$u(0)=0$ と $u(h)=U$ から、$\log(1+\alpha)\ne0$ なので

$$
\boxed{
T=\frac{\eta_0U\alpha}{h\log(1+\alpha)},\qquad
u(y)=U\frac{\log(1+\alpha y/h)}{\log(1+\alpha)}.
}
$$

$\alpha=0$ なら $\eta=\eta_0$ なので $u'=T/\eta_0$、境界条件から $T=\eta_0U/h$、$u=Uy/h$。上壁の流体への接線 traction は $+Te_1$、下壁では $-Te_1$ である。

**(iii) 散逸と極限。** [粘性散逸定理](#thm-ctm15-viscous-dissipation)と $\tau_{12}=T$ から $\tau:D=\eta(u')^2=Tu'$ である。そこで

$$
\int_0^h\tau:D\,dy
=\int_0^hTu'(y)\,dy
=T[u(h)-u(0)]=TU.
$$

上壁の速度が $Ue_1$ で、そこに働く接線 traction が $Te_1$ だから供給仕事率も $TU$（W/m$^2$）。$T$ と $U$ は同符号なので $TU\ge0$。

最後に $\log(1+z)/z\to1$（$z\to0$）を用いると、

$$
\frac{\log(1+\alpha y/h)}{\log(1+\alpha)}
=\frac{\log(1+\alpha y/h)/\alpha}{\log(1+\alpha)/\alpha}
\longrightarrow\frac yh,
\quad
\frac{\alpha}{\log(1+\alpha)}\longrightarrow1.
$$

よって $u\to Uy/h$、$T\to\eta_0U/h$。定粘性の解を独立に求めた結果とも一致する。
<!-- solution-end -->

## 9. 学びの整理

粘性流体の局所方程式は、保存則・材料の構成則・状態に対する拘束を**別々に**宣言して組み合わせた結果である。

$$
\begin{gathered}
\rho D_tv=\operatorname{div}\sigma+\rho b,\\
\sigma=-pI+2\eta D^\circ+\zeta\theta I,\\
\operatorname{div}v=0,\quad \eta\ \text{が空間一定}
\quad\Longrightarrow\quad
\rho D_tv=-\nabla p+\eta\Delta v+\rho b.
\end{gathered}
$$

圧縮性の場合は $\zeta$ と $\nabla(\operatorname{div}v)$ が重要になり得る。非圧縮でも粘性係数に空間勾配があれば、応力発散の係数微分を省略できない。方程式の各項を残す・捨てる判断は次講の無次元化へつながる。
