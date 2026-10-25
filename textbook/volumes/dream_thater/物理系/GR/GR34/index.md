# GR34 Raychaudhuri方程式

[GR5の測地線偏差方程式](../GR5/index.md#thm-gr5-deviation)は、自由落下する二本の曲線の距離が曲率でどう変わるかを教えました。しかしブラックホールへ向かう光を多数考えたとき、一本ずつ偏差を解くだけでは「光線の束が細くなるか」「断面積がどの速さで変わるか」を判断しにくいものです。

そこで、近接する測地線の集まり全体に、一つの膨張率を割り当てます。ただし距離の変化は一様な拡大縮小だけではありません。形を変えるせん断と、束をねじる回転を区別すると、曲率が膨張率に及ぼす影響を一階の微分方程式で求められます。これがRaychaudhuri方程式です。

以下、$(M,g)$ は滑らかな4次元時間向き付きLorentz時空、計量符号は $(-,+,+,+)$、$c=1$ とします。$\nabla$ は[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)です。曲率は[GR6の規約](../GR6/index.md#prop-gr6-coordinate-curvature)に合わせ、

$$
R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z,\qquad
\operatorname{Ric}_{bd}=R^a{}_{bad}
$$

と固定します。時間的曲線では固有時 $\tau$、光的曲線ではアフィンパラメータ $\lambda$ を使います。後者に固有時は使えません。

## 1. 一人の速度ではなく、隣り合う速度の変化を見る

平坦時空でも、原点から外へ飛び出す多数の慣性粒子は離れていきます。曲率が零であることと、粒子群の体積が変わらないことは別です。各点に未来向き単位速度 $u$ を滑らかに置き、その流線を[測地線](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)とします。流線が局所的に重ならず、一つの滑らかな速度場を作ることが必要です。

隣の流線への微小変位 $X$ を考えると、速度の変化は $\nabla_Xu$ です。自由落下の向き $u$ 自身には垂直な物差しを使いたいので、まず

$$
h_{ab}=g_{ab}+u_au_b,\qquad
h^a{}_b=\delta^a{}_b+u^au_b
$$

を置きます。$u^au_a=-1$ より $h^a{}_bu^b=0$、$h^a{}_ch^c{}_b=h^a{}_b$。つまり $h$ は各点の三次元空間 $u^\perp$ への直交射影です。二添字量の対称部分を $B_{(ab)}=(B_{ab}+B_{ba})/2$、反対称部分を $B_{[ab]}=(B_{ab}-B_{ba})/2$ と書きます。これを通して速度勾配を三つの異なる変形に分けます。

<a id="def-gr34-timelike-optics"></a>

<!-- formal-statement-start -->
> **定義（時間的測地線合同の光学分解）**
> 4次元Lorentz時空の開集合に滑らかな未来向き単位時間的ベクトル場 $u$ があり、$g(u,u)=-1$、$\nabla_uu=0$ を満たすとする。その積分曲線の集まりを時間的測地線合同という。空間へ射影した速度勾配と、その膨張率 $\theta$、せん断 $\sigma_{ab}$、回転 $\omega_{ab}$ を

$$
\begin{aligned}
B_{ab}&=h_a{}^ch_b{}^d\nabla_du_c,&
\theta&=h^{ab}B_{ab},\\
\sigma_{ab}&=B_{(ab)}-\frac{\theta}{3}h_{ab},&
\omega_{ab}&=B_{[ab]}=\frac12(B_{ab}-B_{ba})
\end{aligned}
$$

> と定める。従って $B_{ab}=(\theta/3)h_{ab}+\sigma_{ab}+\omega_{ab}$ であり、$u^a\sigma_{ab}=u^a\omega_{ab}=0$、$h^{ab}\sigma_{ab}=0$、$\sigma_{ab}=\sigma_{ba}$、$\omega_{ab}=-\omega_{ba}$ である。$1/3$ は $u^\perp$ の次元が3であることから来る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr34-timelike-optics -->
**定義の確認**。Minkowski時空の一点で $u=e_0$ とする正規直交枠を選び、三次元空間上の $B_{ij}$ が

$$
(B_{ij})=
\begin{pmatrix}
2&-3&0\\
3&2&0\\
0&0&-1
\end{pmatrix}
$$

であるとします。行列 $B_{ij}=g(e_i,\nabla_{e_j}u)$ の列は変位方向、行は速度成分です。

この局所データは実際の測地線合同としても実現できます。$t=0$ の原点近くの初期位置 $\mathbf y$ に、次の三速度と初期四元速度を与えます。

$$
\mathbf v(\mathbf y)=B\mathbf y,\quad |\mathbf v|<1,\qquad
u=(\gamma,\gamma\mathbf v),\quad
\gamma=(1-|\mathbf v|^2)^{-1/2}.
$$

条件を満たす小近傍に制限すると $g(u,u)=-\gamma^2(1-|\mathbf v|^2)=-1$ で、未来向きです。各粒子をこの一定四元速度で直線運動させれば $\nabla_uu=0$ です。初期位置から時刻 $t$ への写像は $t=0$ で恒等写像なので、十分短時間は交差しない合同になります。

原点での値を使うと、定義で指定した速度勾配が復元されます。

$$
\gamma(0)=1,\qquad
\partial_j\gamma(0)=0,\qquad
\partial_ju_i(0)=B_{ij}.
$$

実際に分解すると、$\theta=2+2-1=3$ で、$(\theta/3)h_{ij}$ は単位行列になります。従って

$$
(\sigma_{ij})=\operatorname{diag}(1,1,-2),\qquad
(\omega_{ij})=\begin{pmatrix}0&-3&0\\3&0&0\\0&0&0\end{pmatrix}.
$$

対称部分の跡が $1+1-2=0$、反対称部分の対角がすべて零であることを直接確かめられます。せん断は体積を一次では変えない形の変化、回転は近接線のねじれであり、膨張は一様な拡大の部分です。$u$ に垂直な成分だけを使うので、四次元行列の跡を誤って4で割りません。
<!-- definition-example-end -->

$u^a\nabla_bu_a=\frac12\nabla_b(u^au_a)=0$、$u^b\nabla_bu_a=0$ だから、この測地線合同では実は $B_{ab}=\nabla_bu_a$ となります。また $\theta=\nabla_au^a$ です。ただし、この簡約は**加速していない単位時間的合同**で使ったもので、加速場へ無条件に流用できません。

## 2. 時間的Raychaudhuri方程式を導く

膨張率 $\theta$ は隣の測地線が離れる速さをまとめた量です。それが時間とともに変わる理由は二つあります。既に生じている速度勾配が変位をさらに変える非線形効果と、時空曲率による測地線偏差です。まず両者を式で分けます。

<a id="thm-gr34-timelike-raychaudhuri"></a>

<!-- formal-statement-start -->
> **定理（時間的Raychaudhuri方程式）**
> 4次元Lorentz時空で、$u$ を滑らかな未来向き単位時間的測地線合同の速度場、$\tau$ を各流線の固有時とする。[時間的光学分解](#def-gr34-timelike-optics)で定めた $\theta,\sigma,\omega$ は

$$
\boxed{
\frac{d\theta}{d\tau}
=-\frac{\theta^2}{3}
-\sigma_{ab}\sigma^{ab}
+\omega_{ab}\omega^{ab}
-\operatorname{Ric}_{ab}u^au^b
}
$$

> を満たす。添字の縮約は $u^\perp$ の正定値計量によるため、$\sigma_{ab}\sigma^{ab}\ge0$、$\omega_{ab}\omega^{ab}\ge0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

単位時間的測地線の[偏差方程式](../GR5/index.md#thm-gr5-deviation)を三本の空間方向へ並べると、偏差行列の二階微分が曲率で決まります。一階微分を速度勾配 $B$ として整理し、最後に行列の跡を取ります。このとき反対称部分の二乗が負の跡を持つので、Raychaudhuri方程式では回転項が**正**になります。

<!-- proof-start -->
### 証明

一つの基準測地線上で $u$ とともに平行移動する空間正規直交枠 $e_1,e_2,e_3$ を取ります。[平行移動が内積を保存すること](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-parallel-causal-cone)から、枠は $u^\perp$ の正規直交性を保ちます。

近隣の流線への偏差 $X_j$ を、流れとの交換子が $[u,X_j]=0$ となるよう選びます。捩率零より $\nabla_uX_j=\nabla_{X_j}u$ であり、初期時刻に $g(u,X_j)=0$ なら

$$
\nabla_u g(u,X_j)
=g(u,\nabla_{X_j}u)
=\tfrac12X_j(g(u,u))=0
$$

です。従って偏差は空間内に留まります。$J_{ij}=g(e_i,X_j)$、$B_{ik}=g(e_i,\nabla_{e_k}u)$ と置くと、枠が平行なので

$$
\frac{dJ_{ij}}{d\tau}
=g(e_i,\nabla_uX_j)
=g(e_i,\nabla_{X_j}u)
=\sum_kB_{ik}J_{kj},
\qquad J'=BJ.
$$

流線が交差せず $J$ が正則な局所領域で $B=J'J^{-1}$ です。[GR5の測地線偏差方程式](../GR5/index.md#thm-gr5-deviation)を同じ偏差 $X_j$ に使うと

$$
\frac{D^2X_j}{d\tau^2}=R(u,X_j)u,\qquad
J''=CJ,\qquad C_{ik}=g(e_i,R(u,e_k)u).
$$

これを $J'=BJ$ の微分 $J''=B'J+BJ'= (B'+B^2)J$ と比較し、正則な $J$ を消して

$$
B'=C-B^2,\qquad
\theta'=\operatorname{tr}C-\operatorname{tr}(B^2)
$$

を得ます。曲率の反対称性 $R(u,e_i)=-R(e_i,u)$ と[Ricciの縮約](../GR6/index.md#def-gr6-ricci-scalar)により、時間方向 $u$ の寄与は $R(u,u)u=0$ なので

$$
\operatorname{tr}C
=\sum_i g(e_i,R(u,e_i)u)
=-\sum_i g(e_i,R(e_i,u)u)
=-\operatorname{Ric}(u,u).
$$

最後に $B=(\theta/3)I+\sigma+\omega$ です。$\operatorname{tr}\sigma=\operatorname{tr}\omega=0$、対称行列と反対称行列の積の跡は零であり、

$$
\begin{aligned}
\operatorname{tr}(B^2)
&=\frac{\theta^2}{3}
+\operatorname{tr}(\sigma^2)
+\operatorname{tr}(\omega^2)\\
&=\frac{\theta^2}{3}
+\sigma_{ab}\sigma^{ab}
-\omega_{ab}\omega^{ab}.
\end{aligned}
$$

最後の負符号は $\operatorname{tr}(\omega^2)=\sum_{ij}\omega_{ij}\omega_{ji}=-\sum_{ij}\omega_{ij}^2$ によります。これを $\theta'=\operatorname{tr}C-\operatorname{tr}(B^2)$ に代入して主張を得ます。
<!-- proof-end -->

膨張、せん断、回転は粒子群の**運動学**であり、Ricci項は時空の**幾何学**です。Ricci曲率が正の集束効果を持っても、回転の正項がある場合には膨張率が必ず下がるとは言えません。物質のエネルギー条件からRicci項の符号を決めるのは次章の問題です。

### 平坦時空なのに膨張する直接例

Minkowski座標 $(t,x,y,z)$ の未来光円錐の内部 $t>r=\sqrt{x^2+y^2+z^2}$ で、$\tau=\sqrt{t^2-r^2}>0$、

$$
u^\mu=\frac{x^\mu}{\tau},\qquad
x^\mu=(t,x,y,z)
$$

を考えます。$x_\mu x^\mu=-\tau^2$ なので $g(u,u)=-1$、$u^0>0$。また $\partial_\nu\tau=-x_\nu/\tau=-u_\nu$ だから

$$
\partial_\nu u_\mu
=\frac{g_{\mu\nu}}{\tau}
+\frac{x_\mu x_\nu}{\tau^3}
=\frac{h_{\mu\nu}}{\tau},
\qquad
u^\nu\partial_\nu u_\mu
=\frac{u_\mu+u_\mu(u^\nu u_\nu)}{\tau}=0.
$$

従ってこれは時間的測地線合同で、$B=h/\tau$、$\theta=3/\tau$、$\sigma=\omega=0$。平坦なので $\operatorname{Ric}=0$、定理は

$$
\theta'=-\frac{3}{\tau^2}
=-\frac{(3/\tau)^2}{3}
$$

と両辺一致します。$\tau$ が増えるにつれて**正の膨張率は小さくなる**のであり、負になるわけではありません。

## 3. 光には三次元の静止空間がない

光線の接ベクトル $k$ は零ベクトルなので、時間的 $u$ と違い $k^\perp$ は $k$ 自身を含みます。$k^\perp$ は三次元ですが、進行方向 $k$ を物差しに含めてはいけません。光の束の断面は二次元だからです。

一つの未来向き光的測地線合同について $\nabla_kk=0$ となる接ベクトル場 $k$ を選びます。補助の未来向き光的ベクトル場 $\ell$ を $g(k,\ell)=-1$ となるよう選びます。$k,\ell$ に垂直な二次元空間へ射影する量を

$$
q_{ab}=g_{ab}+k_a\ell_b+\ell_ak_b
$$

とすれば $q_{ab}k^b=q_{ab}\ell^b=0$、$q^a{}_cq^c{}_b=q^a{}_b$ です。$\ell$ は断面を表示する補助で、進行方向の物理的な自由度を増やすものではありません。

<a id="def-gr34-null-optics"></a>

<!-- formal-statement-start -->
> **定義（光的スクリーンと光学分解）**
> 4次元Lorentz時空に滑らかな零ベクトル場 $k$ があり、$g(k,k)=0$、$k\ne0$、$\nabla_kk=0$ とする。その積分曲線の局所的な集まりをアフィン媒介の光的測地線合同という。$g(k,\ell)=-1$ を満たす補助零ベクトル $\ell$ を選び、$q$ を上記の射影とする。二次元スクリーンの光学テンソルは

$$
\begin{aligned}
\mathcal B_{ab}&=q_a{}^cq_b{}^d\nabla_dk_c,&
\hat\theta&=q^{ab}\mathcal B_{ab},\\
\hat\sigma_{ab}&=\mathcal B_{(ab)}-\frac{\hat\theta}{2}q_{ab},&
\hat\omega_{ab}&=\mathcal B_{[ab]}
\end{aligned}
$$

> であり、$\mathcal B_{ab}=(\hat\theta/2)q_{ab}+\hat\sigma_{ab}+\hat\omega_{ab}$ と分解する。膨張率の係数 $1/2$ はスクリーンが二次元であることによる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr34-null-optics -->
**定義の確認**。Minkowski時空の $r>0$ で、出射する放射状光線の接ベクトル

$$
k=\partial_t+\partial_r,\qquad
\ell=\tfrac12(\partial_t-\partial_r)
$$

を取ります。$g(k,k)=g(\ell,\ell)=0$、$g(k,\ell)=-1$、$k^t>0$ であり、$\nabla_kk=0$ は $r$ がアフィンパラメータとして線形に増えることから、またCartesian座標で $k=(1,x^i/r)$ を微分しても確認できます。スクリーンは球面の正規直交二方向 $e_\vartheta,e_\varphi$ です。角度一定の微小変位はそれぞれ長さ $r\,d\vartheta$、$r\sin\vartheta\,d\varphi$ を持ち、$dr/d\lambda=1$ によって両方向とも単位長さ当たり $1/r$ の割合で伸びます。従ってスクリーンの速度勾配は

$$
(\mathcal B_{AB})=\begin{pmatrix}1/r&0\\0&1/r\end{pmatrix},
\quad
\hat\theta=\frac2r,\quad
\hat\sigma_{AB}=0,\quad\hat\omega_{AB}=0.
$$

二次元の跡 $2/r$ は四次元時空の次元や零方向を数に入れずに得られます。$\ell$ の選択を変えても、$k^\perp/\langle k\rangle$ 上の光学変形とその跡は変わりません。
<!-- definition-example-end -->

## 4. 光的Raychaudhuri方程式：二次元の跡と曲率

<a id="thm-gr34-null-raychaudhuri"></a>

<!-- formal-statement-start -->
> **定理（光的Raychaudhuri方程式）**
> 4次元Lorentz時空の滑らかなアフィン媒介の光的測地線合同 $k=d/d\lambda$ に対し、[スクリーンの光学分解](#def-gr34-null-optics)で定めた量は、局所的に

$$
\boxed{
\frac{d\hat\theta}{d\lambda}
=-\frac{\hat\theta^2}{2}
-\hat\sigma_{ab}\hat\sigma^{ab}
+\hat\omega_{ab}\hat\omega^{ab}
-\operatorname{Ric}_{ab}k^ak^b
}
$$

> を満たす。$k$ のアフィン性を外し $\nabla_kk=\kappa k$ とした場合、この式には $\kappa\hat\theta$ が加わる。$\kappa=0$ とした本定理の式を任意の非アフィンパラメータにそのまま適用してはいけない。
<!-- formal-statement-end -->

### 証明の見取り図

時間的合同との違いは、直交方向が三次元ではなく、光線に垂直なベクトルを進行方向のずれで同一視した二次元になることだけです。光的偏差二本の行列を作り、[測地線偏差](../GR5/index.md#thm-gr5-deviation)に相当するJacobi方程式をこの商空間へ射影して跡を取ります。曲率のRicci縮約には二つの光的方向の余計な寄与はありません。

<!-- proof-start -->
### 証明

基準光線上で $\nabla_k\ell=0$ となる補助零ベクトルを初期値から平行移動し、同じく平行なスクリーン正規直交枠 $e_1,e_2$ を選びます。計量両立性により $g(k,\ell)=-1$、$g(e_A,k)=g(e_A,\ell)=0$ は保存されます。

隣接光線への偏差 $X_j$ を $[k,X_j]=0$、$g(k,X_j)=0$ で選びます。後者は $\nabla_k g(k,X_j)=g(k,\nabla_{X_j}k)=\frac12X_j(g(k,k))=0$ により保存されます。進行方向に比例する部分はスクリーンの物理的な変位を表さないので捨て、$J_{Aj}=g(e_A,X_j)$ を作ります。局所的に $J$ が正則な間は

$$
J'=\mathcal BJ,\qquad
J''=\mathcal CJ,\qquad
\mathcal C_{AB}=g(e_A,R(k,e_B)k)
$$

です。最初の等式は捩率零と $[k,X_j]=0$ から、二番目は[偏差方程式](../GR5/index.md#thm-gr5-deviation)と同じ曲率交換子の計算から従います。従って

$$
\mathcal B'=\mathcal C-\mathcal B^2,
\qquad
\hat\theta'=\operatorname{tr}\mathcal C-\operatorname{tr}(\mathcal B^2).
$$

$g(k,k)=0$、$R(k,k)=0$ と曲率の対称性により、Ricci縮約を零枠 $(k,\ell,e_1,e_2)$ で表すと、$k,\ell$ に沿う寄与は零です。そこで

$$
\operatorname{tr}\mathcal C
=\sum_{A=1}^{2}g(e_A,R(k,e_A)k)
=-\operatorname{Ric}(k,k).
$$

次に二次元のスクリーンで $\mathcal B=(\hat\theta/2)I+\hat\sigma+\hat\omega$ と分解します。対称性・反対称性・跡零から

$$
\operatorname{tr}(\mathcal B^2)
=\frac{\hat\theta^2}{2}
+\hat\sigma_{ab}\hat\sigma^{ab}
-\hat\omega_{ab}\hat\omega^{ab}.
$$

この二式を代入すれば主張を得ます。非アフィンの場合は $\nabla_kk=\kappa k$ を測地線偏差の交換子に戻すと、速度勾配の進化式に $\kappa\mathcal B$ が加わるため、跡に $\kappa\hat\theta$ が残ります。
<!-- proof-end -->

### 同じMinkowskiでも、出射と入射は逆

出射合同 $k_+=\partial_t+\partial_r$ では $dr/d\lambda=1$、$\hat\theta_+=2/r$ だから

$$
\frac{d\hat\theta_+}{d\lambda}
=-\frac{2}{r^2}
=-\frac{(2/r)^2}{2}.
$$

入射合同 $k_-=\partial_t-\partial_r$ では $dr/d\lambda=-1$、$\hat\theta_-=-2/r$ であり、

$$
\frac{d\hat\theta_-}{d\lambda}
=\frac{d(-2/r)}{dr}(-1)
=-\frac2{r^2}
=-\frac{\hat\theta_-^2}{2}.
$$

どちらも曲率・せん断・回転は零です。入射光線は有限アフィン長で $r=0$ に集まりますが、Minkowski時空自体の曲率特異性を意味しません。**焦点と時空特異性は別の概念**です。

## 5. なぜ膨張率は体積・面積の変化なのか

一つ一つの光線の方向だけでなく、細い束全体を考える理由は、膨張が測定可能な断面積の変化に対応するからです。局所的に独立な偏差ベクトルを並べた行列 $J$ が非特異なら、体積要素・断面積要素は $|\det J|$ に比例します。

<a id="prop-gr34-volume-area"></a>

<!-- formal-statement-start -->
> **命題（体積と面積の対数微分）**
> 時間的測地線合同の空間三方向の独立な偏差が作る微小体積 $V>0$、または光的測地線合同のスクリーン二方向の独立な偏差が作る微小面積 $A>0$ を、それぞれ偏差行列が非特異な区間で考える。このとき

$$
\frac{1}{V}\frac{dV}{d\tau}=\theta,\qquad
\frac{1}{A}\frac{dA}{d\lambda}=\hat\theta.
$$

> ただし光的の場合の $A$ はスクリーンに射影した小面積であり、任意の座標断面積ではない。
<!-- formal-statement-end -->

### 証明の見取り図

三本または二本の偏差を列に取った行列の微分が $J'=BJ$ でした。行列式を各列について一次的な関数として微分すると、列ごとの変化のうち、その列に平行な成分だけが跡として残ります。

<!-- proof-start -->
### 証明

時間的の場合、$V=V_0|\det J|/|\det J_0|$ です。$J$ の列を $J_1,\ldots,J_3$ と書き、$J'=BJ$ を使います。行列式の多重線形性より、その微分は「一本の列だけを微分した行列式」の和です。各 $J_j'=BJ_j$ を $J$ の列で展開する係数行列は $H=J^{-1}BJ$ です。列 $j$ を $\sum_iH_{ij}J_i$ に置き換えた行列式では、$i\ne j$ の項は同じ列を二本持つため零となり、$i=j$ の項だけが $H_{jj}\det J$ を与えます。従って

$$
\frac{d}{d\tau}\det J
=\sum_jH_{jj}\det J
=\operatorname{tr}(J^{-1}BJ)\det J.
$$

$J$ が非特異な区間で $V$ の対数を微分すると

$$
\frac{V'}{V}
=\frac{d}{d\tau}\log|\det J|
=\operatorname{tr}(J^{-1}J')
=\operatorname{tr}(J^{-1}BJ)
=\operatorname{tr}B=\theta.
$$

光的の場合にも二次元スクリーンの $J$ に同じ計算を使い、$\operatorname{tr}\mathcal B=\hat\theta$ を得ます。焦点で $\det J=0$ となる場合、これらの対数微分式はその点をまたいでそのまま延長できません。
<!-- proof-end -->

先ほどの時間的放射合同なら $V\propto\tau^3$ だから $V'/V=3/\tau$、出射する光線束なら球面上の小さな角度領域について $A\propto r^2$ だから $A'/A=2/r$。二つの直接計算が一致します。

## 6. 集束評価と、そこからまだ言えないこと

Raychaudhuri方程式は、Ricci項の符号と回転零の条件が分かれば、膨張率がどれだけ速く負の無限大へ向かうかを評価します。ここで**曲率条件は仮定**です。Einstein方程式だけから無条件で $\operatorname{Ric}(u,u)\ge0$ や $\operatorname{Ric}(k,k)\ge0$ が出るわけではありません。

<a id="prop-gr34-focusing"></a>

<!-- formal-statement-start -->
> **命題（回転零合同の有限パラメータ集束評価）**
> 4次元Lorentz時空の時間的測地線合同がある流線上で $\omega_{ab}=0$、$\operatorname{Ric}(u,u)\ge0$ を満たし、初期膨張 $\theta(0)=\theta_0<0$ とする。光的測地線合同なら $\hat\omega_{ab}=0$、$\operatorname{Ric}(k,k)\ge0$、$\hat\theta(0)=\hat\theta_0<0$ とする。いずれも偏差行列が正則な間、

$$
\theta'\le-\frac{\theta^2}{3},
\qquad
\hat\theta'\le-\frac{\hat\theta^2}{2}.
$$

> 従って同じ仮定が維持されるなら、時間的には $3/|\theta_0|$ 以内、光的には $2/|\hat\theta_0|$ 以内に、合同の滑らかな非焦点表示を維持できなくなる。これはそれだけで時空の測地不完備性や曲率発散を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

せん断の二乗は正、回転零、Ricci項は非負なので、膨張率の微分は負の二乗以下です。負の膨張率を保つ区間で逆数を微分し、零へ達する上限時刻を求めます。

<!-- proof-start -->
### 証明

[時間的Raychaudhuri方程式](#thm-gr34-timelike-raychaudhuri)で二つの非正項と回転零を使い $\theta'\le-\theta^2/3$。初期値が負なので滑らかで有限な間は $\theta(\tau)\le\theta_0<0$ です。$\theta^2>0$ に注意して

$$
\frac{d}{d\tau}\left(\frac1\theta\right)
=-\frac{\theta'}{\theta^2}\ge\frac13.
$$

初期時刻から積分すると

$$
\frac1{\theta(\tau)}\ge\frac1{\theta_0}+\frac{\tau}{3}.
$$

左辺は負なので、右辺が零になる $\tau= -3/\theta_0=3/|\theta_0|$ まで、$\theta$ が有限な負の値として存在し続けることはできません。より早く焦点が生じる場合もあります。

光的の場合も[光的Raychaudhuri方程式](#thm-gr34-null-raychaudhuri)で同様に

$$
\frac{d}{d\lambda}\left(\frac1{\hat\theta}\right)
\ge\frac12,\qquad
\frac1{\hat\theta(\lambda)}
\ge\frac1{\hat\theta_0}+\frac{\lambda}{2}
$$

となり、上限は $-2/\hat\theta_0=2/|\hat\theta_0|$ です。これは合同の局所表示の限界についての評価であって、個々の測地線がそこで終わるとは主張していません。
<!-- proof-end -->

回転 $\omega$ が非零なら正の $\omega_{ab}\omega^{ab}$ が残り、この比較不等式はただちには導けません。さらに、集束したあとに測地線が延長できるかという大域的問題は別です。[入射Minkowski光線の例](#thm-gr34-null-raychaudhuri)は曲率零でも焦点を作るので、焦点だけから「時空の特異点」と断言する誤りへの反例になります。

## 7. 演習：次元・符号・仮定・局所と大域

### Level A：まず式の意味を判定する

<a id="ex-gr34-a01"></a>
#### GR34-A01 射影の階数
- Level: A

$u=e_0$ を四次元Minkowski正規直交枠の未来向き単位時間ベクトルとする。$h^a{}_b$ の行列を求め、$h^2=h$、$hu=0$、$\operatorname{tr}h=3$ を検算せよ。

<!-- solution-start -->
**詳細解答。** $g_{ab}=\operatorname{diag}(-1,1,1,1)$、$u^a=(1,0,0,0)$、$u_b=(-1,0,0,0)$ です。従って $h^a{}_b=\delta^a{}_b+u^au_b=\operatorname{diag}(0,1,1,1)$。成分ごとに $0^2=0$、$1^2=1$ より $h^2=h$ であり、第一列が零なので $hu=0$。対角和は $0+1+1+1=3$ です。膨張率の分母3はこの階数に由来します。
<!-- solution-end -->

<a id="ex-gr34-a02"></a>
#### GR34-A02 せん断・回転・膨張を行列から
- Level: A

三次元の空間正規直交枠で $B=\begin{pmatrix}2&-1&0\\1&0&0\\0&0&1\end{pmatrix}$ とする。$\theta,\sigma,\omega$ を求め、$B=(\theta/3)I+\sigma+\omega$ を直接検算せよ。

<!-- solution-start -->
**詳細解答。** $\theta=2+0+1=3$、対称部分は $\operatorname{diag}(2,0,1)$ です。よって

$$
\sigma=\operatorname{diag}(1,-1,0),\qquad
\omega=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}.
$$

$\theta I/3=I$ を加えると対角は $(2,0,1)$、反対称部分を加えると非対角の $B_{12}=-1,B_{21}=1$ も復元されます。$\operatorname{tr}\sigma=0$、$\omega^\mathsf T=-\omega$ も成立します。
<!-- solution-end -->

<a id="ex-gr34-a03"></a>
#### GR34-A03 回転の二乗の符号
- Level: A

直前の $B$ について $\sigma_{ij}\sigma^{ij}$、$\omega_{ij}\omega^{ij}$、$\operatorname{tr}(B^2)$ を求め、時間的Raychaudhuri方程式で回転が正符号になる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 空間計量は単位行列なので $\sigma_{ij}\sigma^{ij}=1^2+(-1)^2=2$、$\omega_{ij}\omega^{ij}=(-1)^2+1^2=2$ です。一方 $\operatorname{tr}(\omega^2)=-2$ だから

$$
\operatorname{tr}(B^2)=\frac{3^2}{3}+2-2=3.
$$

直接掛けても $B^2=\begin{pmatrix}3&-2&0\\2&-1&0\\0&0&1\end{pmatrix}$ で跡は $3-1+1=3$。方程式の右辺は $-\operatorname{tr}(B^2)-\operatorname{Ric}(u,u)$ だから、$-\operatorname{tr}(\omega^2)=+\omega_{ij}\omega^{ij}$ と符号が反転します。
<!-- solution-end -->

<a id="ex-gr34-a04"></a>
#### GR34-A04 光的スクリーンの射影
- Level: A

Minkowski時空で $k=(1,1,0,0)$、$\ell=(1/2,-1/2,0,0)$ とする。$g(k,k)$、$g(\ell,\ell)$、$g(k,\ell)$ を求め、$q^a{}_b$ の階数を調べよ。

<!-- solution-start -->
**詳細解答。** $g(k,k)=-1+1=0$、$g(\ell,\ell)=-1/4+1/4=0$、$g(k,\ell)=-1/2-1/2=-1$。$q^a{}_b=\delta^a{}_b+k^a\ell_b+\ell^ak_b$ で、$\ell_b=(-1/2,-1/2,0,0)$、$k_b=(-1,1,0,0)$ を代入すると

$$
(q^a{}_b)=\operatorname{diag}(0,0,1,1).
$$

従って $q^2=q$、$qk=q\ell=0$、階数は2です。光的方程式の膨張二乗の係数 $1/2$ の根拠になります。
<!-- solution-end -->

<a id="ex-gr34-a05"></a>
#### GR34-A05 出射光束の面積
- Level: A

Minkowski時空の出射放射状零測地線 $k=\partial_t+\partial_r$、$r(\lambda)=r_0+\lambda>0$ を考える。一定の微小立体角 $\Delta\Omega$ を持つ束の面積 $A$ から $\hat\theta$ を求め、光的Raychaudhuri方程式を検算せよ。

<!-- solution-start -->
**詳細解答。** 球面の小面積は $A=r^2\Delta\Omega$ です。$dr/d\lambda=1$ だから $A'=2r\Delta\Omega$、従って $\hat\theta=A'/A=2/r$。微分すると $\hat\theta'=(-2/r^2)(dr/d\lambda)=-2/r^2$。曲率、せん断、回転はいずれも零で、$-\hat\theta^2/2=-(4/r^2)/2=-2/r^2$ と一致します。面積の二乗則が係数2を生みます。
<!-- solution-end -->

### Level B：導出を独力で接続する

<a id="ex-gr34-b01"></a>
#### GR34-B01 Riccati方程式から時間的な係数を再導出
- Level: B

局所的に偏差行列が正則で $J'=BJ$、$J''=CJ$、$\operatorname{tr}C=-\operatorname{Ric}(u,u)$ とする。三次元の対称・反対称分解から時間的Raychaudhuri方程式を、行列の積の跡を省略せず導け。

<!-- solution-start -->
**詳細解答。** $J'=BJ$ を一度微分すると $J''=B'J+BJ'= (B'+B^2)J$ なので、正則な $J$ を右から消して $B'=C-B^2$。跡を取って $\theta'=-\operatorname{Ric}(u,u)-\operatorname{tr}(B^2)$ です。$B=\theta I/3+\sigma+\omega$ として

$$
\begin{aligned}
\operatorname{tr}(B^2)
&=\operatorname{tr}(\theta^2I/9)+
\operatorname{tr}(\sigma^2)+\operatorname{tr}(\omega^2)\\
&\quad+\frac{2\theta}{3}\operatorname{tr}(\sigma+\omega)
+\operatorname{tr}(\sigma\omega+\omega\sigma)\\
&=\frac{\theta^2}{3}+\sigma_{ij}\sigma_{ij}-\omega_{ij}\omega_{ij}.
\end{aligned}
$$

最後の交差項は $\sigma^\mathsf T=\sigma,\omega^\mathsf T=-\omega$ と跡の転置不変性により零です。代入すると

$$
\theta'=-\theta^2/3-\sigma_{ij}\sigma_{ij}
+\omega_{ij}\omega_{ij}-\operatorname{Ric}(u,u).
$$

となります。$\operatorname{Ric}$ の符号は[GR6の縮約](../GR6/index.md#def-gr6-ricci-scalar)と[偏差方程式](../GR5/index.md#thm-gr5-deviation)の規約に従います。
<!-- solution-end -->

<a id="ex-gr34-b02"></a>
#### GR34-B02 時間的放射合同の全条件
- Level: B

$t>r$ のMinkowski時空で $\tau=(t^2-r^2)^{1/2}$、$u^\mu=x^\mu/\tau$ とする。$g(u,u)$、$\nabla_uu$、$B_{\mu\nu}$、$\theta$、$\sigma$、$\omega$ を計算し、体積の尺度を求めよ。

<!-- solution-start -->
**詳細解答。** $x_\mu x^\mu=-\tau^2$ なので $u_\mu u^\mu=-1$、$t>r$ より未来向きです。$\partial_\nu\tau=-x_\nu/\tau=-u_\nu$ を商の微分へ代入して

$$
\partial_\nu u_\mu
=g_{\mu\nu}/\tau+x_\mu x_\nu/\tau^3
=(g_{\mu\nu}+u_\mu u_\nu)/\tau=h_{\mu\nu}/\tau.
$$

従って $u^\nu\partial_\nu u_\mu=(u_\mu+u_\mu(-1))/\tau=0$。射影 $h$ は三次元なので $B=h/\tau$、$\theta=h^{\mu\nu}h_{\mu\nu}/\tau=3/\tau$。対称な $B$ の跡零部分は $h/\tau-(3/\tau)h/3=0$、反対称部分も零です。[体積の対数微分](#prop-gr34-volume-area)で $V'/V=3/\tau$ を積分すると $\log V=3\log\tau+C$、従って $V=C_1\tau^3$、$C_1>0$。曲率零でも体積は膨張します。
<!-- solution-end -->

<a id="ex-gr34-b03"></a>
#### GR34-B03 入射光束の集束上限
- Level: B

平坦な四次元Minkowski時空で $r(0)=R>0$ の入射光線 $k=\partial_t-\partial_r$ を考える。$\hat\theta_0$、面積、焦点までのアフィン長を計算し、[集束評価](#prop-gr34-focusing)の上限との関係を述べよ。

<!-- solution-start -->
**詳細解答。** $dr/d\lambda=-1$ なので $r(\lambda)=R-\lambda$、$0\le\lambda<R$ です。$A=(R-\lambda)^2\Delta\Omega$ だから

$$
\hat\theta=\frac{A'}A=-\frac{2}{R-\lambda},\qquad
\hat\theta_0=-\frac2R.
$$

$\hat\theta'=-2/(R-\lambda)^2=-\hat\theta^2/2$ で、Ricci・せん断・回転は零です。上限は $2/|\hat\theta_0|=2/(2/R)=R$、実際に $A\to0$ となる $\lambda=R$ と一致します。光線は原点を通過して延長可能であり、ここに曲率特異性はありません。
<!-- solution-end -->

<a id="ex-gr34-b04"></a>
#### GR34-B04 回転零・アフィン性の役割
- Level: B

1. 時間的合同で $\theta_0<0$、$\operatorname{Ric}(u,u)=0$、$\sigma=0$、$\omega=0$ とするとき、$\theta(\tau)$ を解け。
2. 光的合同の接ベクトルを非定数の正関数 $f$ で $\tilde k=fk$ と再規格化したとき、$\nabla_{\tilde k}\tilde k$ を求め、なぜ元の光的Raychaudhuri方程式をそのまま使えないか述べよ。

<!-- solution-start -->
**詳細解答。**

1. $\theta'=-\theta^2/3$ なので $d(1/\theta)/d\tau=1/3$。初期値から $1/\theta=1/\theta_0+\tau/3$、従って

$$
\theta(\tau)=\frac{\theta_0}{1+(\theta_0/3)\tau}.
$$

   $\theta_0<0$ なので分母が零となる $\tau=-3/\theta_0$ までに非焦点表示が失われます。この式は非零の回転項がある場合には一般に成立しません。

2. $\nabla_kk=0$ を使い積の微分を実行すると

$$
\nabla_{\tilde k}\tilde k
=\nabla_{fk}(fk)
=f\,k(f)\,k+f^2\nabla_kk
=k(f)\,\tilde k.
$$

   よって $\tilde k$ は一般には非アフィンで $\tilde\kappa=k(f)$ です。新しいパラメータについては[光的方程式](#thm-gr34-null-raychaudhuri)に $\tilde\kappa\tilde\theta$ が必要です。$k(f)=0$ なら各生成線上で倍率一定なのでアフィン性が保たれます。
<!-- solution-end -->

### Level C：時間的・光的集束を比較する

<a id="ex-gr34-c01"></a>
#### GR34-C01 同じ曲率条件でも異なる集束時刻
- Level: C

滑らかな四次元Lorentz時空で、ある時間的測地線合同とある光的測地線合同について、いずれも回転零、せん断零、各流線に沿って $\operatorname{Ric}(u,u)=0$、$\operatorname{Ric}(k,k)=0$ と仮定する。初期値をそれぞれ $\theta(0)=-3/L$、$\hat\theta(0)=-2/L$（$L>0$）とする。

1. 両者のRaychaudhuri方程式を解いて、非焦点表示が失われるパラメータの値を求めよ。
2. 初期微小体積 $V_0>0$ と初期微小面積 $A_0>0$ から $V(\tau),A(\lambda)$ を求めよ。
3. 係数 $1/3$ と $1/2$ の起源を説明し、上の結果だけで時空の測地不完備性を導けるか論じよ。
4. 光的接ベクトルを非アフィンに取り直した場合、同じ初期値と上限 $L$ を無条件に再利用できるか。

<!-- solution-start -->
**詳細解答。**

1. [時間的方程式](#thm-gr34-timelike-raychaudhuri)は $\theta'=-\theta^2/3$。逆数を微分して $1/\theta=-L/3+\tau/3$、従って

$$
\theta(\tau)=-\frac3{L-\tau}\quad(0\le\tau<L).
$$

   [光的方程式](#thm-gr34-null-raychaudhuri)では $\hat\theta'=-\hat\theta^2/2$ なので $1/\hat\theta=-L/2+\lambda/2$、従って

$$
\hat\theta(\lambda)=-\frac2{L-\lambda}\quad(0\le\lambda<L).
$$

   双方とも $L$ で負の無限大へ向かいます。

2. [体積・面積の対数微分](#prop-gr34-volume-area)を用いると

$$
\frac{V'}V=-\frac3{L-\tau},\qquad
\frac{A'}A=-\frac2{L-\lambda}.
$$

   初期値まで積分して

$$
V(\tau)=V_0\left(1-\frac{\tau}{L}\right)^3,\qquad
A(\lambda)=A_0\left(1-\frac{\lambda}{L}\right)^2.
$$

   どちらも $L$ で零へ収束しますが、次数は異なります。

3. 時間的合同の瞬間静止空間は三次元、光的合同の物理的な横断スクリーンは二次元です。正規化された等方的膨張 $B=(\theta/d)I$ を二乗して跡を取れば $\operatorname{tr}(B^2)=\theta^2/d$。従って $d=3,2$ がそれぞれ $1/3,1/2$ になります。これは曲率発散や個々の測地線が延長不能になることとは異なります。[入射Minkowski光線の例](#prop-gr34-focusing)のように、平坦時空で焦点だけが生じる場合があります。

4. 再規格化した接ベクトル $\tilde k=fk$ に対し $\nabla_{\tilde k}\tilde k=k(f)\tilde k$ であり、一般には非アフィンです。$k(f)$ の項を含む進化式へ移るうえ、新パラメータの目盛りも変わります。従って元のアフィン長の数値 $L$ を無条件には移せません。
<!-- solution-end -->

## 8. 次の問い

膨張率にはせん断が非正、回転が非負、Ricci曲率が負符号で現れました。しかし $\operatorname{Ric}(u,u)$ と $\operatorname{Ric}(k,k)$ がいつ非負になるかは、この幾何学だけでは決まりません。次のGR35では、Einstein方程式と物質のエネルギー運動量テンソルからその条件を検討します。さらに地平線に沿う光線が**どこまで延長できるか**という大域的仮定はGR36以降で別に扱います。
