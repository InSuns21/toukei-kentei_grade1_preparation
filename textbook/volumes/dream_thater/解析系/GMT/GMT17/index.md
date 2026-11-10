# GMT17 Besicovitch--Federer射影判定 I

<!-- definition-example-audit: strict -->

[GMT5のMarstrand射影次元定理](../GMT5/index.md#thm-gmt5-marstrand-dimension)と[GMT7の高次元版](../GMT7/index.md#thm-gmt7-grassmann-dimension)では、典型的な方向への直交射影でHausdorff**次元**がどう変わるかを調べました。しかし次元が $m$ という情報だけでは、射影の $m$ 次元**面積**が正か零かは決まりません。

[GMT16の分解定理](../GMT16/index.md#thm-gmt16-decomposition)によって、有限 $m$ 次元面積を持つ集合は、可算整流可能な部分 $R$ と純非整流部分 $P$ に分かれます。この二つを射影で見分けられるでしょうか。線分は多くの方向で正の長さを保ちます。一方、[四隅Cantor集合の射影例](../GMT16/index.md#prop-gmt16-projection-contrast)は、純非整流集合でも**特定の方向**で正の長さに射影され得ることを示しました。そこで問うべきなのは、ある一方向ではなく、**ほとんどすべての方向**です。

本講義では次の三点を途中式から導きます。

- 曲面片の射影を支える横断性・円錐評価。
- 整流可能部分が正の面積を保つ方向についての定理。
- 純非整流側の証明で注意すべき臨界次元の方向平均評価。

最後の「純非整流ならほとんど全方向で零面積」という核心を閉じるのは次のGMT18です。

以下、整数 $d\ge2$ と $1\le m<d$ を固定します。

$G(d,m)$ は原点を通る $m$ 平面の集合、$\gamma_{d,m}$ はその回転不変確率です。$V\in G(d,m)$ に対し、$\pi_V$ は直交射影を表します。これらは[GMT7のGrassmann空間と直交射影の定義](../GMT7/index.md#def-gmt7-grassmann-projection)で導入済みです。

$\mathcal H^m$ は[MT8の非正規化Hausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)を使います。$m$ 平面ではLebesgue測度と比例し、その係数は[GMT10の平面測度の正規化](../GMT10/index.md#lem-gmt10-hausdorff-normalization)による $c_m$ です。

## 1. 射影だけでは面積は増えない

直交射影では、差ベクトル $z=z_V+z_{V^\perp}$ のうち $z_V$ だけを残すので

$$
|\pi_Vx-\pi_Vy|^2=|z_V|^2
=|x-y|^2-|z_{V^\perp}|^2\le|x-y|^2
\quad(z=x-y).
$$

従って射影は1-Lipschitzです。これを集合の大きさへ移すと次の上界になります。

<a id="lem-gmt17-projection-lipschitz"></a>

<!-- formal-statement-start -->
> **補題（直交射影のHausdorff面積上界）**
> $1\le m<d$、$V\in G(d,m)$、$E\subset\mathbb R^d$ とする。このとき

$$
\mathcal H^m(\pi_VE)\le\mathcal H^m(E).
$$

> 特に、$\mathcal H^m(E)=0$ なら、すべての $V$ で $\mathcal H^m(\pi_VE)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Hausdorff測度は、小さい直径の被覆の直径の $m$ 乗和を最小化して作ります。射影後の各被覆集合の直径は元より大きくなりません。

<!-- proof-start -->
### 証明

$E\subset\bigcup_i U_i$、$\operatorname{diam}U_i<\delta$ という任意の可算被覆を取ります。上の距離評価により

$$
\pi_VE\subset\bigcup_i\pi_VU_i,\qquad
\operatorname{diam}(\pi_VU_i)\le\operatorname{diam}U_i<\delta.
$$

従ってHausdorff前測度の定義で

$$
\mathcal H^m_\delta(\pi_VE)
\le\sum_i\operatorname{diam}(\pi_VU_i)^m
\le\sum_i\operatorname{diam}(U_i)^m.
$$

右辺の被覆全体について下限を取り、さらに $\delta\downarrow0$ とすると結論です。ここには $c_m$ を付け足しません。両辺が**同じ** $\mathcal H^m$ だからです。$\square$
<!-- proof-end -->

例えば水平線分 $S=[0,2]\times\{0\}\subset\mathbb R^2$ の、水平から角度 $\theta$ の直線への射影長さは $2|\cos\theta|$ です。上界2は保たれますが、$\theta=\pi/2$ では零です。**一つの悪い方向**だけを根拠に線分を非整流と判断することはできません。

## 2. 接平面に横断的なら、射影は潰れない

[GMT15の近似接平面](../GMT15/index.md#def-gmt15-approximate-tangent)は、曲面の近くの点が細い円錐に集中することを表しました。接平面 $T$ に対して射影先 $V$ が直交していると、その接方向は潰れてしまいます。これを測るため、線形写像 $A=\pi_V|_T:T\to V$ を考えます。

$T$ と $V$ はどちらも $m$ 次元です。$T$ の正規直交基底 $t_1,\ldots,t_m$ と $V$ の正規直交基底 $v_1,\ldots,v_m$ を取ると、$A$ の行列は

$$
M_{ij}=\langle v_i,t_j\rangle\quad(1\le i,j\le m)
$$

です。なぜなら $\pi_Vt_j=\sum_i\langle t_j,v_i\rangle v_i$ だからです。従って $A$ の可逆性は $\det M\ne0$、同値に $\ker A=T\cap V^\perp=\{0\}$ で判定できます。[GMT10のGram行列式の幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)をこの行列へ適用すると

$$
J_m(\pi_V|_T)=\sqrt{\det(M^{\mathsf T}M)}=|\det M|.
$$

こうして「面積が潰れない」を線形代数の判定に接続できます。

<a id="def-gmt17-transverse-projection"></a>

<!-- formal-statement-start -->
> **定義（接平面に横断的な射影と最小伸長率）**
> $1\le m<d$、$T,V\in G(d,m)$ とする。$\pi_V|_T:T\to V$ が可逆、すなわち $T\cap V^\perp=\{0\}$ のとき、$V$ は $T$ に**横断的な射影方向**であるという。最小伸長率を

$$
\sigma(T,V)=\min_{\substack{u\in T\\|u|=1}}|\pi_Vu|
$$

> と定める。$\sigma(T,V)>0$ は横断性と同値であり、横断的なら $0<\sigma(T,V)\le1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt17-transverse-projection -->
### 直接例：二本の直線のなす角

**定義の確認**：最小値の存在、核、行列式と面積倍率を別々に確かめます。

$d=2,m=1$ とし、$T=\mathbb Re_1$、$V=\mathbb R(\cos\theta,\sin\theta)$ とします。$T$ の単位ベクトルは $\pm e_1$ だけです。$v=(\cos\theta,\sin\theta)$ を $V$ の単位基底とすると

$$
\pi_V(ae_1)=a\cos\theta\,v,\qquad
\sigma(T,V)=|\cos\theta|,\qquad
M=(\cos\theta).
$$

よって $\det M\ne0$ と $\sigma>0$ は共に $\cos\theta\ne0$ と同値です。$\theta=\pi/2$ なら $T=V^\perp$ で、$T$ 全体が一点へ射影されます。$\theta=0$ なら $\sigma=J_1=1$ で長さを保ちます。中間角では長さの倍率は $|\cos\theta|$ です。これで定義とJacobianの対応を直接確認できました。
<!-- definition-example-end -->

### 円錐にある二点差分はどれだけ縮むか

近似接平面の定義は一点 $x$ を頂点とする円錐外**測度**の消失であって、集合内の任意の二点差分が同じ円錐に入るとは言っていません。まず、二点差分そのものに円錐条件がある場合だけの正確な評価を示します。この区別を飛ばすと、点ごとの近似接線から曲面全体の双Lipschitz性を誤って結論してしまいます。

<a id="lem-gmt17-cone-bilipschitz"></a>

<!-- formal-statement-start -->
> **補題（円錐条件から射影の双Lipschitz評価）**
> $1\le m<d$、$T,V\in G(d,m)$、$\sigma=\sigma(T,V)>0$ とする。$A\subset\mathbb R^d$ が、相異なるすべての $x,y\in A$ で

$$
\operatorname{dist}(x-y,T)\le\eta|x-y|,
\qquad 0\le\eta<\frac{\sigma}{2(1+\sigma)}
$$

> を満たすとする。このとき任意の $x,y\in A$ に対して

$$
\frac{\sigma}{2}|x-y|
\le|\pi_Vx-\pi_Vy|\le|x-y|.
$$

> 従って $\pi_V|_A$ は像への双Lipschitz写像で、その逆のLipschitz定数は高々 $2/\sigma$ である。
<!-- formal-statement-end -->

### 証明の見取り図

差 $z=x-y$ を $T$ 方向と垂直方向に分けます。前者を射影した長さは最低 $\sigma|z_T|$ だけ残り、後者が引き起こす誤差は $|z_\perp|$ 以下です。

<!-- proof-start -->
### 証明

$z=z_T+z_\perp$、$z_T=\pi_Tz$、$z_\perp=z-\pi_Tz$ とします。仮定により $|z_\perp|\le\eta|z|$ です。さらに $z=z_T+z_\perp$ への三角不等式で $|z|\le|z_T|+|z_\perp|$ なので

$$
|z_\perp|\le\eta|z|,\qquad
|z_T|\ge|z|-|z_\perp|\ge(1-\eta)|z|.
$$

$z_T\in T$ だから最小伸長率の定義で $|\pi_Vz_T|\ge\sigma|z_T|$。直交射影が1-Lipschitzであることを $z_\perp$ に適用して

$$
\begin{aligned}
|\pi_Vz|
&\ge|\pi_Vz_T|-|\pi_Vz_\perp|\\
&\ge\sigma|z_T|-|z_\perp|\\
&\ge\{\sigma-(1+\sigma)\eta\}|z|
>\frac{\sigma}{2}|z|.
\end{aligned}
$$

非厳密な下界も当然成り立ちます。上界は第1節の距離評価です。下界により $\pi_Vx=\pi_Vy$ なら $x=y$、また像上の逆写像について $|x-y|\le(2/\sigma)|\pi_Vx-\pi_Vy|$ となります。$\square$
<!-- proof-end -->

例えば $d=2,m=1$ のグラフ $A=\{(t,h(t)):t\in[-1,1]\}$ で $|h(t)-h(s)|\le L|t-s|$ とします。任意の二点差分 $z=(t-s,h(t)-h(s))$ は

$$
\operatorname{dist}(z,\mathbb Re_1)=|h(t)-h(s)|
\le\frac{L}{\sqrt{1+L^2}}|z|.
$$

従って $L/\sqrt{1+L^2}<\sigma/(2(1+\sigma))$ を満たすなら補題を使えます。この十分条件は保守的です。例えば水平射影なら実際には $\pi_{\mathbb Re_1}|_A$ は任意の有限 $L$ で双Lipschitzですが、補題は小さい傾きのときだけそれを保証します。

## 3. 横断性はほとんどすべての方向で成り立つ

一枚の接平面 $T$ に直交する射影は面積を潰します。しかし、$T$ を固定して方向 $V$ を回せば、潰れる条件は例外的です。ここで「ほとんどすべて」は $G(d,m)$ 上の $\gamma_{d,m}$ に関する意味です。

<a id="lem-gmt17-generic-transversality"></a>

<!-- formal-statement-start -->
> **補題（横断的な射影はGrassmannほとんど至る所で起きる）**
> $1\le m<d$、$T\in G(d,m)$ を固定する。このとき

$$
\gamma_{d,m}\{V\in G(d,m):\sigma(T,V)=0\}=0.
$$

> 同値に、$\gamma_{d,m}$-ほとんどすべての $V$ で $J_m(\pi_V|_T)>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

ランダムな $m$ 本のGaussianベクトルで射影先の部分空間を張ります。固定した $T$ 上で射影が退化する条件は、$m\times m$ のGaussian成分行列の行列式が零になることと同値です。行列式が零となる確率を、列ごとの条件付き確率で直接0と示します。

<!-- proof-start -->
### 証明

$T$ の正規直交基底を $t_1,\ldots,t_m$ とし、$\mathbb R^d$ で独立な標準Gaussianベクトル $g_1,\ldots,g_m$ を取ります。$g_j$ は確率1で一次独立です。実際、先行する $j-1$ 本が張る真部分空間に、連続密度を持つ $g_j$ が入る条件付き確率は0であり、$j=1,\ldots,m$ の有限回で帰納できます。

$V=\operatorname{span}(g_1,\ldots,g_m)$ とします。Gaussianの分布は直交変換で不変なので、この $V$ の分布は[GMT7で構成した回転不変Grassmann確率](../GMT7/index.md#def-gmt7-grassmann-projection) $\gamma_{d,m}$ です。

線形写像 $G^{\mathsf T}:T\to\mathbb R^m$ を

$$
G^{\mathsf T}u=(\langle g_1,u\rangle,\ldots,\langle g_m,u\rangle)
$$

と置きます。$G^{\mathsf T}u=0$ は $u$ が全 $g_j$ と直交すること、つまり $u\in V^\perp$ と同値です。従って

$$
\ker(\pi_V|_T)=T\cap V^\perp
=\ker(G^{\mathsf T}|_T).
$$

$G^{\mathsf T}|_T$ の行列 $H=(\langle g_i,t_j\rangle)_{i,j}$ の各成分は独立な標準Gaussianです。最初の $m-1$ 行が一次独立である確率は1です。これらを固定すると、最後の行がその $(m-1)$ 次元の行空間に入る確率は0です。$m=1$ の場合も $H_{11}$ が連続密度を持つので零になる確率は0です。従って $\det H\ne0$ が確率1で、$\ker(\pi_V|_T)=\{0\}$ です。定義の同値性から $\sigma>0$ と $J_m>0$ も従います。$\square$
<!-- proof-end -->

### 整流可能な集合の射影が正面積になる

接平面が点ごとに変わっても、方向と点の二重積分を交換すれば上の補題を使えます。ここで必要なのは、[GMT13の可算整流可能集合上のarea formula](../GMT13/index.md#thm-gmt13-rectifiable-area)です。$R$ 上の接平面 $T_xR$ は[GMT13の接平面の定義と構成](../GMT13/index.md#def-gmt13-tangent-plane)により $\mathcal H^m$-ほとんど至る所で定まり、[GMT15の密度と近似接平面定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)によって局所の幾何とも一致します。

注意したいのは、**点ごとの例外方向が同じ集合である必要はない**ことです。点に依存する零測度の例外方向集合を無限に合併しても零測度とは限りません。そこで方向と点の組全体を測度で扱い、積分順序の交換によって一つの「ほとんど全方向」という結論にまとめます。

<a id="thm-gmt17-rectifiable-positive-projection"></a>

<!-- formal-statement-start -->
> **定理（整流可能部分はほとんど全方向で正面積に射影される）**
> $1\le m<d$ とし、$R\subset\mathbb R^d$ はBorelな可算 $m$-整流可能集合で、

$$
0<\mathcal H^m(R)<\infty
$$

> とする。このとき $\gamma_{d,m}$-ほとんどすべての $V\in G(d,m)$ について

$$
\mathcal H^m(\pi_VR)>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定した各接平面でJacobianが零になる方向は例外的です。これをTonelliで $R$ 上に積分すると、ほとんど全方向で接Jacobianが $R$ 上ほとんど至る所正になります。面積公式の左辺が正なら、右辺の重複度積分も正であり、射影像が零面積という可能性は消えます。

<!-- proof-start -->
### 証明

$\mu=\mathcal H^m\llcorner R$ とします。$\mu(R)$ は正で有限です。接平面の可測代表を取れるのは、[GMT13の双Lipschitz片への分割](../GMT13/index.md#lem-gmt13-bilipschitz-pieces)で可測な微分行列から $T_xR$ を作れるためです。零集合上では任意の固定 $m$ 平面を割り当てます。

$V$ ごとに接Jacobianを

$$
j(V,x)=J_m(\pi_V|_{T_xR})\in[0,1]
$$

と置きます。Gram行列の成分は $T_xR$ と $V$ の可測な局所座標から作られ、行列式と平方根は連続なので、$(V,x)\mapsto j(V,x)$ は可測です。[横断性補題](#lem-gmt17-generic-transversality)から固定した $\mu$-ほとんどすべての $x$ で

$$
\int_{G(d,m)}\boldsymbol1_{\{j(V,x)=0\}}
\,d\gamma_{d,m}(V)=0.
$$

非負可測関数への[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使うと

$$
\begin{aligned}
0
&=\int_R\int_{G(d,m)}
\boldsymbol1_{\{j(V,x)=0\}}\,d\gamma_{d,m}(V)\,d\mu(x)\\
&=\int_{G(d,m)}\mu\{x\in R:j(V,x)=0\}
\,d\gamma_{d,m}(V).
\end{aligned}
$$

従って $\gamma_{d,m}$-ほとんどすべての $V$ について、$j(V,x)>0$ が $\mu$-ほとんどすべての $x$ で成立します。そのような $V$ を一つ固定します。非負関数 $j(V,\cdot)$ は正測度集合 $R$ 上でほとんど至る所正なので

$$
0<\int_Rj(V,x)\,d\mathcal H^m(x)
\le\mathcal H^m(R)<\infty.
$$

ここで[GMT13の面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)に $E=R$、$F=\pi_V|_R$、$g\equiv1$ を代入します。$F$ は1-Lipschitz、定理の接Jacobianは上の $j$ ですから

$$
0<\int_Rj(V,x)\,d\mathcal H^m(x)
=\int_VN(\pi_V,R,y)\,d\mathcal H^m(y),
$$

ただし $N(\pi_V,R,y)=\#\{x\in R:\pi_Vx=y\}$ です。$N=0$ は $\pi_VR$ の外で成り立ちます。もし $\mathcal H^m(\pi_VR)=0$ なら、非負関数 $N$ の積分は零になり、正の左辺に矛盾します。ゆえに結論が従います。$\square$
<!-- proof-end -->

この定理は「ほとんど全方向で射影が一対一」という主張ではありません。例えば平行な二線分は多くの方向で重なり、重複度 $N$ が2になる区間があります。それでも面積公式の積分が正になるというのが正しい結論です。

### 零射影なら、整流可能な正面積部分は残せない

今度は[GMT16の有限面積分解定理](../GMT16/index.md#thm-gmt16-decomposition)を組み合わせます。この向きはGMT18の判定の**片方向**を既に閉じられます。

<a id="cor-gmt17-ae-zero-implies-pure"></a>

<!-- formal-statement-start -->
> **系（零射影から純非整流性への必要条件）**
> $1\le m<d$ とし、$E\subset\mathbb R^d$ はBorelで $\mathcal H^m(E)<\infty$ とする。もし

$$
\mathcal H^m(\pi_VE)=0
\quad\text{が }\gamma_{d,m}\text{-ほとんどすべての }V\text{ で成立}
$$

> するなら、$E$ は純 $m$-非整流可能である。
<!-- formal-statement-end -->

### 証明の見取り図

$E=R\dot\cup P$ と分解し、$R$ が正の面積なら上の定理で射影が正になる方向がほとんど全て、という矛盾を導きます。零面積の $R$ は純非整流性を妨げません。

<!-- proof-start -->
### 証明

[GMT16の分解定理](../GMT16/index.md#thm-gmt16-decomposition)で $E=R\mathbin{\dot\cup}P$ とします。もし $\mathcal H^m(R)>0$ なら、[整流可能部分はほとんど全方向で正面積に射影される](#thm-gmt17-rectifiable-positive-projection)ことから、ほとんど全方向で $\mathcal H^m(\pi_VR)>0$ です。$R\subset E$ だから $\pi_VR\subset\pi_VE$ であり、$\mathcal H^m(\pi_VE)>0$ がほとんど全方向で従って仮定と矛盾します。よって $\mathcal H^m(R)=0$ です。

任意のLipschitz写像 $f:\mathbb R^m\to\mathbb R^d$ について、$P$ の[純非整流性の定義](../GMT12/index.md#def-gmt12-purely-unrectifiable)と劣加法性から

$$
\begin{aligned}
\mathcal H^m(E\cap f(\mathbb R^m))
&\le\mathcal H^m(R\cap f(\mathbb R^m))
+\mathcal H^m(P\cap f(\mathbb R^m))\\
&\le\mathcal H^m(R)+0=0.
\end{aligned}
$$

従って $E$ は純 $m$-非整流可能です。$\square$
<!-- proof-end -->

**まだ逆向きは証明していません。** 純非整流集合が、ある方向へ正の長さに射影されることは[GMT16の四隅集合](../GMT16/index.md#prop-gmt16-projection-contrast)が示しました。逆向きで必要なのは、そのような方向が $\gamma_{d,m}$-零集合に限られると証明することです。

## 4. 方向平均で「二点が射影後に近付く確率」を測る

逆向きへ進む準備として、$x\ne y$ を固定し、射影後の二点が距離 $\rho$ 未満になる方向の割合を評価します。$z=x-y$ と書けば、調べるのは $|\pi_Vz|<\rho$ です。[GMT7のGrassmann核補題の証明](../GMT7/index.md#lem-gmt7-grassmann-kernel)では

$$
X=\frac{|\pi_Vz|^2}{|z|^2}
\quad\text{の密度}\quad
p_X(u)=\frac{u^{a-1}(1-u)^{b-1}}{B(a,b)},
\quad a=\frac m2,\quad b=\frac{d-m}{2}
$$

を $0<u<1$ 上で導きました。ここで $B(a,b)=\int_0^1u^{a-1}(1-u)^{b-1}\,du$ です。負べきの平均とは違い、今回の計算では $X$ が**零に近い確率**を積分します。

<a id="lem-gmt17-small-projection-tail"></a>

<!-- formal-statement-start -->
> **補題（射影短距離の方向平均評価）**
> $d\ge2$、$1\le m<d$、$z\in\mathbb R^d\setminus\{0\}$、$\rho>0$ とする。$a=m/2$、$b=(d-m)/2$ とおくと、$0<\rho<|z|$ では

$$
\gamma_{d,m}\{V:|\pi_Vz|<\rho\}
=\frac1{B(a,b)}
\int_0^{(\rho/|z|)^2}u^{a-1}(1-u)^{b-1}\,du.
$$

> さらに $d,m$ のみに依存する有限定数 $C_{d,m}$ があり、すべての $\rho>0$ に対し

$$
\gamma_{d,m}\{V:|\pi_Vz|<\rho\}
\le C_{d,m}\min\left\{1,\left(\frac{\rho}{|z|}\right)^m\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$X$ のBeta密度を0から $(\rho/|z|)^2$ まで積分し、$u^{m/2-1}$ の原始関数を計算します。$\rho/|z|\le1/2$ とそれ以外を分けると、$u=1$ 付近の密度の特異性に惑わされません。

<!-- proof-start -->
### 証明

$t=\rho/|z|$ と置きます。$0<t<1$ で $|\pi_Vz|<\rho$ と $X<t^2$ は同値ですから、密度積分の公式が従います。

$0<t\le1/2$ なら積分範囲は $0<u\le1/4$ です。$b>0$ なので

$$
(1-u)^{b-1}\le M_b:=\max\{1,(3/4)^{b-1}\}
$$

です。よって

$$
\begin{aligned}
\gamma_{d,m}\{V:|\pi_Vz|<\rho\}
&\le\frac{M_b}{B(a,b)}\int_0^{t^2}u^{a-1}\,du\\
&=\frac{M_b}{aB(a,b)}(t^2)^a\\
&=\frac{2M_b}{mB(a,b)}t^m.
\end{aligned}
$$

$1/2<t<1$ なら確率が1以下なので $1\le2^mt^m$ です。$t\ge1$ なら右辺の $\min$ は1となり、やはり確率は1以下です。従って

$$
C_{d,m}=\max\left\{1,2^m,
\frac{2M_b}{mB(a,b)}\right\}
$$

とすれば全範囲で成立します。$\square$
<!-- proof-end -->

### 直接計算：平面で長さが短くなる方向

$d=2,m=1$ のとき、$V$ は角度 $\theta\in[0,\pi)$ の直線です。$z=|z|e_1$ と取れば $|\pi_Vz|=|z||\cos\theta|$ です。$0<t<1$ に対し $|\cos\theta|<t$ を満たす区間の長さは $2\arcsin t$ なので

$$
\gamma_{2,1}\{V:|\pi_Vz|<t|z|\}
=\frac{2}{\pi}\arcsin t.
$$

$t\downarrow0$ で $\arcsin t/t\to1$ だから、この確率は $(2/\pi)t$ に近付きます。上の $t^m$ の指数 $m=1$ はこの例で正しいことが分かります。$t=1/2$ の場合は $\arcsin(1/2)=\pi/6$ なので確率は $1/3$ です。

### 臨界指数では各距離スケールが同程度に寄与する

上の確率を二点 $(x,y)$ に適用し、測度 $\mu$ で $y$ を平均すると、射影先で半径 $\rho$ に集まる質量を方向平均できます。ただし、ある点の近くにどれだけ $\mu$ が集中するかの仮定が必要です。

半径 $s$ の球質量が一様に $As^m$ 以下となる条件を**上側 $m$ 成長条件**と呼ぶことにします。これは[GMT2のFrostman型球成長評価](../GMT2/index.md#thm-gmt2-frostman)に似ていますが、今は**臨界指数 $m$** で仮定する強い条件です。有限Hausdorff面積だけから、すべての点・半径で同じ $A$ があるとは主張しません。

<a id="prop-gmt17-critical-concentration"></a>

<!-- formal-statement-start -->
> **命題（上側m成長条件からの臨界射影集中評価）**
> $d\ge2$、$1\le m<d$、$R>0$ とし、$\mu$ を $\mathbb R^d$ 上の有限正Borel測度とする。ある $A>0$ に対して、すべての $x\in\operatorname{supp}\mu$ と $0<s\le2R$ で

$$
\mu(B(x,s))\le As^m
$$

> が成り立つとする。このとき $0<\rho\le R/2$ に対して

$$
\begin{aligned}
&\int_{G(d,m)}
\mu\{y\in B(x,R):|\pi_V(y-x)|<\rho\}
\,d\gamma_{d,m}(V)\\
&\qquad\le A\rho^m
\left[1+2^mC_{d,m}
\left(1+\log_2\frac R\rho\right)\right]
\qquad(x\in\operatorname{supp}\mu).
\end{aligned}
$$

> 特に $x$ についても $\mu$ で積分すれば、左辺の二点積分は同じ右辺に $\mu(\mathbb R^d)$ を掛けた量以下となる。
<!-- formal-statement-end -->

### 証明の見取り図

近距離 $|y-x|<\rho$ は球成長条件で直接評価し、外側を $\rho,2\rho,4\rho,\ldots$ の輪に分けます。第 $j$ 輪で短く射影される確率は約 $2^{-jm}$、輪の質量は高々約 $2^{jm}\rho^m$ なので、各輪の寄与は約 $\rho^m$ です。その輪の数が対数になります。

<!-- proof-start -->
### 証明

非負可測な指示関数に[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を適用して積分順序を交換します。[射影短距離の方向平均評価](#lem-gmt17-small-projection-tail)を適用すると、左辺は

$$
\int_{B(x,R)}
\gamma_{d,m}\{V:|\pi_V(y-x)|<\rho\}\,d\mu(y)
$$

に等しいです。$y=x$ では確率は1とし、同じく近距離領域へ含めます。

まず $D_{-1}=B(x,\rho)$ 上の寄与は $\mu(D_{-1})\le A\rho^m$ です。残りの点を

$$
D_j=\{y:2^j\rho\le|y-x|<\min(2^{j+1}\rho,R)\},
\quad j=0,1,\ldots,N-1
$$

に分けます。$N=\lceil\log_2(R/\rho)\rceil$ と取れば、$B(x,R)\setminus B(x,\rho)$ はこれらの輪に含まれます。各輪の点では $|y-x|\ge2^j\rho$ なので

$$
\gamma_{d,m}\{V:|\pi_V(y-x)|<\rho\}
\le C_{d,m}2^{-jm}.
$$

一方、$D_j\subset B(x,2^{j+1}\rho)$、しかも $2^{j+1}\rho\le2R$ です。球成長条件から

$$
\mu(D_j)\le A(2^{j+1}\rho)^m.
$$

従って第 $j$ 輪の積分は

$$
C_{d,m}2^{-jm}\mu(D_j)
\le 2^mC_{d,m}A\rho^m.
$$

輪の数は $N\le1+\log_2(R/\rho)$ ですから、近距離の寄与と足して主張の上界となります。最後の二点積分は、この点ごとの上界を $d\mu(x)$ で積分して得ます。$\square$
<!-- proof-end -->

この対数評価は、有限面積集合の射影判定を**まだ証明しません**。例えば線分上の長さ測度も球成長条件を満たし、かつほとんど全方向の射影は正の長さです。臨界の $O(\rho^m\log(R/\rho))$ という上界だけで「零射影」と判断してはいけません。GMT18では純非整流性から得られる追加の幾何情報を使い、単なる球成長・方向平均より強い結論へ進みます。

## 5. 演習：射影の横断性と方向平均を紙上で確かめる

### GMT17-A01 直交射影の被覆評価
- Level: A
- 目安時間: 12分

$E\subset\mathbb R^3$、$V$ を二次元平面とする。直径が $\delta$ 未満の可算被覆 $E\subset\bigcup_iU_i$ から、$\mathcal H^2_\delta(\pi_VE)\le\sum_i(\operatorname{diam}U_i)^2$ を示せ。$E$ のBorel可測性は必要か。

<!-- solution-start -->
#### 詳細解答

$\pi_V$ は1-Lipschitzなので $\pi_VE\subset\bigcup_i\pi_VU_i$、$\operatorname{diam}(\pi_VU_i)\le\operatorname{diam}U_i<\delta$ です。従ってHausdorff前測度の下限を取る候補被覆として $\{\pi_VU_i\}$ を用いれば

$$
\mathcal H^2_\delta(\pi_VE)
\le\sum_i\operatorname{diam}(\pi_VU_i)^2
\le\sum_i\operatorname{diam}(U_i)^2.
$$

被覆論法は任意の集合に適用されるため、Borel可測性は不要です。最初の等号を測度の可算加法性と混同してはいけません。
<!-- solution-end -->

### GMT17-A02 傾いた直線の横断性
- Level: A
- 目安時間: 15分

$T=\mathbb R(1,1)$、$V=\mathbb Re_1$、$W=\mathbb R(1,-1)$ とする。$\sigma(T,V)$ と $\sigma(T,W)$、それぞれのJacobianを求め、横断性を判定せよ。

<!-- solution-start -->
#### 詳細解答

$T$ の単位基底は $t=(1,1)/\sqrt2$ です。$V$ の単位基底 $e_1$ への内積は $1/\sqrt2$ だから

$$
\sigma(T,V)=|\langle t,e_1\rangle|=\frac1{\sqrt2},
\qquad J_1(\pi_V|_T)=\frac1{\sqrt2}.
$$

$W$ の単位基底は $w=(1,-1)/\sqrt2$ で、$\langle t,w\rangle=(1-1)/2=0$ です。従って $\sigma(T,W)=J_1(\pi_W|_T)=0$。$V$ へは横断的ですが、$T=W^\perp$ なので $W$ へは横断的ではありません。
<!-- solution-end -->

### GMT17-A03 円錐補題の定数
- Level: A
- 目安時間: 15分

$\sigma=1/2$ とし、二点差分が $\operatorname{dist}(x-y,T)\le(1/10)|x-y|$ を満たす集合 $A$ を考える。円錐補題の仮定を確認し、実際に証明で得られる下界を数値で計算せよ。

<!-- solution-start -->
#### 詳細解答

閾値は $\sigma/[2(1+\sigma)]=(1/2)/3=1/6$ であり、$\eta=1/10<1/6$ です。従って[円錐補題](#lem-gmt17-cone-bilipschitz)を適用できます。証明中のより強い係数は

$$
\sigma-(1+\sigma)\eta
=\frac12-\frac32\frac1{10}
=\frac7{20}.
$$

従って $|\pi_Vx-\pi_Vy|\ge(7/20)|x-y|$ です。定理に記載した $\sigma/2=1/4$ より強い評価であり、単に $1/4$ と答えても十分ですが、上式を再計算できることが重要です。
<!-- solution-end -->

### GMT17-A04 正方形の面への射影
- Level: A
- 目安時間: 15分

$R=[0,1]^2\times\{0\}\subset\mathbb R^3$ を $xy$ 平面 $T$ に置き、$V$ を $xz$ 平面とする。$\sigma(T,V)$ と $J_2(\pi_V|_T)$ を求め、$\mathcal H^2(\pi_VR)$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

$T$ の基底を $e_1,e_2$、$V$ の基底を $e_1,e_3$ とすると制限射影の行列は

$$
M=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

$e_2$ が核に属するため $\sigma(T,V)=0$、$J_2=|\det M|=0$ です。像は $\{(x,0,0):0\le x\le1\}$ という線分なので $\mathcal H^2(\pi_VR)=0$。$R$ の面積 $\mathcal H^2(R)=c_2>0$ は、この例外的な射影で潰れます。
<!-- solution-end -->

### GMT17-A05 平面の短距離方向確率
- Level: A
- 目安時間: 15分

$d=2,m=1$、$z=(3,0)$、$\rho=3/2$ とする。$V$ を角度 $\theta\in[0,\pi)$ で指定し、$|\pi_Vz|<\rho$ の方向確率を計算せよ。

<!-- solution-start -->
#### 詳細解答

$|\pi_Vz|=3|\cos\theta|$ なので条件は $|\cos\theta|<1/2$ です。$[0,\pi)$ では $\pi/3<\theta<2\pi/3$ となり、区間長は $\pi/3$。回転不変確率は角度の長さを $\pi$ で割るため

$$
\gamma_{2,1}\{V:|\pi_Vz|<3/2\}
=\frac{\pi/3}{\pi}=\frac13.
$$

[$\rho/|z|=1/2$ の方向平均公式](#lem-gmt17-small-projection-tail)にも一致します。
<!-- solution-end -->

### GMT17-B01 整流可能集合に零射影が起きる方向
- Level: B
- 目安時間: 25分

$R=[0,1]\times\{0\}\cup([0,1]\times\{2\})$、$V_\theta=\mathbb R(\cos\theta,\sin\theta)$ とする。$\mathcal H^1(\pi_{V_\theta}R)=0$ となる角度を決めよ。ほとんど全方向で正であることの理由を、Jacobianと像の長さからそれぞれ説明せよ。

<!-- solution-start -->
#### 詳細解答

各線分の射影は長さ $|\cos\theta|$ の区間です。$\cos\theta\ne0$ なら、少なくとも一方の射影像が正の長さを持つので和集合の長さも正です。$\cos\theta=0$、すなわち $\theta=\pi/2$ では各線分が一点になり、像は高々二点で長さ0です。

各線分の接方向は $T=\mathbb Re_1$ であり、接Jacobianは $|\cos\theta|$。従って $\theta\ne\pi/2$ では

$$
\int_RJ_1(\pi_{V_\theta}|_T)\,d\mathcal H^1
=2|\cos\theta|>0.
$$

重複があっても[面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)の右辺の重複度積分が正なので像の長さは正です。一方、零方向の集合は角度一点で $\gamma_{2,1}$-測度0です。
<!-- solution-end -->

### GMT17-B02 混合集合の射影に何が残るか
- Level: B
- 目安時間: 25分

$E=S\cup(K+(2,2))$ とし、$S=[0,1]\times\{0\}$、$K$ はGMT12の四隅Cantor集合とする。$E$ が正で有限の $\mathcal H^1$ 面積を持つことを確認し、$\mathcal H^1(\pi_VE)>0$ がほとんど全方向で成り立つ理由を示せ。$K$ 自身のほとんど全方向の射影を、この議論だけで判定できるか。

<!-- solution-start -->
#### 詳細解答

[GMT12の四隅集合の面積評価](../GMT12/index.md#lem-gmt12-corner-mass)により $0<\mathcal H^1(K)<\infty$ です。$S$ と平行移動した $K$ は互いに素なコンパクト集合だから

$$
\mathcal H^1(E)=1+\mathcal H^1(K)\in(1,\infty).
$$

$S\subset E$ は正長の可算1整流可能集合であるため、[正射影定理](#thm-gmt17-rectifiable-positive-projection)からほとんど全 $V$ で $\mathcal H^1(\pi_VS)>0$、従って単調性で $\mathcal H^1(\pi_VE)>0$ です。$K$ は純1非整流ですが、この結論はあくまで $S$ を使ったものなので、$K$ 単独のほとんど全方向の射影については何も証明していません。それはGMT18の課題です。
<!-- solution-end -->

### GMT17-B03 Beta積分から短距離のべき指数
- Level: B
- 目安時間: 30分

$d=3,m=2$ のとき、固定 $z\ne0$ に対して $X=|\pi_Vz|^2/|z|^2$ のBeta密度を求め、$0<t<1$ に対し $\mathbb P(|\pi_Vz|<t|z|)$ を積分して求めよ。$t\downarrow0$ の最初の非零項も示せ。

<!-- solution-start -->
#### 詳細解答

$a=m/2=1$、$b=(d-m)/2=1/2$ です。Beta積分は

$$
B(1,1/2)=\int_0^1(1-u)^{-1/2}\,du
=[-2\sqrt{1-u}]_0^1=2.
$$

よって $p_X(u)=\frac12(1-u)^{-1/2}$。短距離事象は $X<t^2$ なので

$$
\begin{aligned}
\mathbb P(|\pi_Vz|<t|z|)
&=\frac12\int_0^{t^2}(1-u)^{-1/2}\,du\\
&=\left[-\sqrt{1-u}\right]_0^{t^2}
=1-\sqrt{1-t^2}\\
&=\frac{t^2}{1+\sqrt{1-t^2}}.
\end{aligned}
$$

分母は $t\downarrow0$ で2に近付くため、確率は $t^2/2+o(t^2)$ です。指数2は $m=2$ と一致します。
<!-- solution-end -->

### GMT17-B04 輪の和から対数が現れる理由
- Level: B
- 目安時間: 30分

有限測度 $\mu$ が $\mu(B(x,s))\le As^m$（$x\in\operatorname{supp}\mu$、$0<s\le2R$）を満たすとする。$\rho=R/8$ で、第 $j$ 輪 $2^j\rho\le|y-x|<2^{j+1}\rho$ の $j=0,1,2$ について、短距離の方向平均に対する各輪の上界を求めよ。$\rho=R/2^k$ に一般化し対数を説明せよ。

<!-- solution-start -->
#### 詳細解答

第 $j$ 輪では[短距離平均補題](#lem-gmt17-small-projection-tail)から射影短距離確率は高々 $C_{d,m}2^{-jm}$ です。一方、球成長条件で輪の質量は高々 $A(2^{j+1}\rho)^m$。掛けると

$$
C_{d,m}2^{-jm}\cdot A2^{(j+1)m}\rho^m
=2^mC_{d,m}A\rho^m
$$

で、$j=0,1,2$ のどれも同じ上界です。近距離 $|y-x|<\rho$ の寄与は高々 $A\rho^m$。従って $R=8\rho$ までの合計は

$$
A\rho^m(1+3\cdot2^mC_{d,m}).
$$

$\rho=R/2^k$ なら輪は $k$ 個あり、合計は高々 $A\rho^m(1+k2^mC_{d,m})$。$k=\log_2(R/\rho)$ なので臨界次元では対数因子が現れます。これは上界であって、実際に対数が必ず出るという下界ではありません。
<!-- solution-end -->

### GMT17-C01 零射影と純非整流性の論理、臨界評価の限界
- Level: C
- 目安時間: 45分

$1\le m<d$、$E\subset\mathbb R^d$ を $\mathcal H^m(E)<\infty$ のBorel集合とする。

1. $E$ がほとんど全 $V$ で $\mathcal H^m(\pi_VE)=0$ を満たすなら、[GMT16の分解定理](../GMT16/index.md#thm-gmt16-decomposition)と本講の結果から純 $m$-非整流可能と示せ。
2. $m=1,d=2$ で水平線分 $S=[0,1]\times\{0\}$ の測度 $\mu=\mathcal H^1\llcorner S$ が $\mu(B(x,r))\le2r$ を満たすことを確かめよ。なぜこの球成長条件と本講の臨界対数上界だけから、ほとんど全方向の零射影を結論できないか。
3. $S$ と四隅Cantor集合 $K$ の射影例を使い、「一方向で零射影」「一方向で正射影」「ほとんど全方向で零射影」の相違を述べよ。まだ証明していない含意を明示せよ。

<!-- solution-start -->
#### 詳細解答

**1. 分解と矛盾。** [分解定理](../GMT16/index.md#thm-gmt16-decomposition)で $E=R\mathbin{\dot\cup}P$ とします。$R$ は可算整流可能、$P$ は純非整流です。

もし $\mathcal H^m(R)>0$ なら

$$
0<\mathcal H^m(R)\le\mathcal H^m(E)<\infty.
$$

そこで[整流可能部分の正射影定理](#thm-gmt17-rectifiable-positive-projection)が適用でき、ほとんど全 $V$ で $\mathcal H^m(\pi_VR)>0$ となります。しかし $\pi_VR\subset\pi_VE$ なので仮定と矛盾します。

従って $\mathcal H^m(R)=0$ です。任意のLipschitz像 $f(\mathbb R^m)$ に対して

$$
\mathcal H^m(E\cap f(\mathbb R^m))
\le\mathcal H^m(R)+\mathcal H^m(P\cap f(\mathbb R^m))=0,
$$

ゆえに $E$ は純非整流です。

**2. 上界の限界。** $x\in S$ と任意の $r>0$ について、直線と半径 $r$ の開球との交差は長さ高々 $2r$ の区間です。$S$ へ制限すればその長さは増えないので $\mu(B(x,r))\le2r$ です。従って臨界射影集中命題の仮定は $A=2$ で満たされます。

一方、角度 $\theta$ の直線への射影は長さ $|\cos\theta|$ の区間です。この値は $\theta=\pi/2$ を除くすべての方向で正です。方向平均の上界 $O(\rho\log(R/\rho))$ はこの線分にも成り立つため、その上界だけから零射影を結論する論法は偽です。純非整流性に固有の追加情報が不可欠です。

**3. 量化の違い。** $S$ は垂直方向で零射影ですが、他の方向で正射影を持つ整流可能集合です。[GMT16の四隅集合の命題](../GMT16/index.md#prop-gmt16-projection-contrast)は $K$ が水平方向で零射影、特定の斜め方向で正射影を持つことを示します。しかも $K$ は[GMT12の純非整流集合](../GMT12/index.md#thm-gmt12-corner-pure)です。このように、零・正の個別方向はどちらも両クラスを判別しません。「純非整流なら**ほとんど全方向**で零射影」という逆向きはこの講義では未証明であり、GMT18で証明すべき内容です。
<!-- solution-end -->

## まとめ

- [直交射影の面積上界](#lem-gmt17-projection-lipschitz)は全方向で成立しますが、面積がいつ正に残るかまでは言いません。
- [横断性の定義](#def-gmt17-transverse-projection)、[円錐による双Lipschitz評価](#lem-gmt17-cone-bilipschitz)、[ほとんど全方向の横断性](#lem-gmt17-generic-transversality)を経て、[整流可能部分の正射影定理](#thm-gmt17-rectifiable-positive-projection)を証明しました。
- [零射影から純非整流性への含意](#cor-gmt17-ae-zero-implies-pure)は証明済みです。逆の含意はまだ使えません。
- [射影短距離の方向平均](#lem-gmt17-small-projection-tail)から[臨界対数上界](#prop-gmt17-critical-concentration)を導きましたが、線分の反例が示すとおり、この上界だけで純非整流性を検出することはできません。

次のGMT18「Besicovitch--Federer射影判定 II」で純非整流部分のほとんど全方向での零射影を証明し、両方向の判定を完成させます。
