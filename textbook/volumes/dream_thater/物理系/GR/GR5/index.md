# GR5 潮汐力と測地線偏差

<!-- definition-example-audit: strict -->

[GR3の自由落下の測地線方程式](../GR3/index.md#thm-gr3-stationary-action)は一人の運動を定め、[GR4の局所直交枠](../GR4/index.md#def-gr4-observer-frame)はその人の時計と物差しを定めました。しかし一点で重力を打ち消せても、少し離れた二人の自由落下者まで同時に静止させられるとは限りません。二人の間隔が増減するとき、何が座標の取り方に依存せずに残るのでしょうか。

[GEO17のJacobi方程式](../../../幾何系/GEO/GEO17/index.md#def-geo17-jacobi)はRiemann幾何で「測地線族の一次のずれ」を表しました。以下では、正定値を前提にせず、[LORG4のLorentz計量のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)を使ってこの計算を再構成します。その結果を物理的な相対加速度に読み替え、最後に「加速して見える平坦な座標」と「本当に曲がった時空」を区別します。

以下、$(M,g)$ は滑らかな時間向き付き四次元Lorentz時空、計量符号は $(-,+,+,+)$、$c>0$ です。時間的自由落下者の世界線 $\gamma(\tau)$ を固有時 $\tau$（秒）で媒介変数表示し、$u=\dot\gamma$、$g(u,u)=-c^2$ とします。[GEO16の曲率作用素](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)と同じく、曲率の符号は

$$
R(X,Y)Z=\nabla_X\nabla_Y Z-\nabla_Y\nabla_X Z-\nabla_{[X,Y]}Z
$$

で固定します。この規約と計量符号は別々の約束です。

## 1. 二人の自由落下を一本の式で比べる

離れた事象の座標差は接ベクトルそのものではありません。そこで近くの自由落下世界線を滑らかな一変数族として並べ、中央の曲線の上で間隔の一次変化を接ベクトルにします。曲線族が交差しても、この接ベクトルは微分として定義できます。ここで「アフィン測地線」とは、[LORG4の測地線条件](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type) $\nabla_TT=0$ を満たす曲線を指します。各曲線の時間向きと $g(T,T)=-c^2$ を揃えることで、共通のパラメータ $\tau$ をそれぞれの固有時として使います。

<a id="def-gr5-geodesic-family"></a>

<!-- formal-statement-start -->
> **定義（固有時で同期した測地線族と偏差ベクトル）**  
> 滑らかな写像 $F:(-\varepsilon,\varepsilon)\times I\to M$ が、各 $s$ について $\tau\mapsto F(s,\tau)$ を未来向きの時間的アフィン測地線とし、各曲線の接ベクトル $T=\partial_\tau F$ が $g(T,T)=-c^2$ を満たすとする。基準曲線を $\gamma(\tau)=F(0,\tau)$ と置く。この曲線に沿うベクトル場

$$
J(\tau)=\left.\frac{\partial F}{\partial s}\right|_{s=0}
$$

> を **偏差ベクトル場** と呼ぶ。$s$ は無次元としてもよく、その場合 $J$ の単位は長さである。同じ $\tau$ が隣接曲線それぞれの固有時であることを同期条件とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr5-geodesic-family -->
**定義の確認**：Minkowskiの平行な自由落下。座標 $(x^0,x,y,z)=(ct,x,y,z)$、$g=\operatorname{diag}(-1,1,1,1)$ で、長さ $L>0$ を固定し

$$
F(s,\tau)=(c\tau,sL,0,0)
$$

と置きます。各 $s$ で接ベクトルは $T=(c,0,0,0)$、自己内積は $-c^2$、時間成分は正です。計量は定数なのでChristoffel係数がすべて零となり、$\nabla_TT=0$ です。従って各曲線は固有時で同期した未来向き測地線です。$J=(0,L,0,0)$ は $s$ 微分として得られ、$g(J,T)=0$。初めから「座標差は物理的長さだ」と仮定せず、定義の全条件を確認しました。
<!-- definition-example-end -->

なお、固有時の同期は初期相対速度にも制約を与えます。$g(T,T)=-c^2$ を $s$ で微分し、[捩率零のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)と可換なパラメータ方向を用いると

$
0=\left.\partial_s g(T,T)\right|_{s=0}
=2g(\nabla_S T,u)|_{s=0}
=2g(DJ/d\tau,u).
$

したがって、同期した族から得た $J$ では相対速度の時間方向成分は初めから零です。一方、$g(J,u)$ 自体は初期に零とは限らず、空間的な偏差として読むには別にその条件が必要です。

$J$ は一般には時間方向成分も持ちます。物差しに沿う間隔を測るための直交条件と初期の相対速度は、後で明示します。偏差ベクトルは微小な隣接世界線の **一次の差** を表し、有限に離れた二人の正確な距離を無条件に与えるものではありません。

## 2. 測地線偏差の式を導く

曲線族の上で、$T=F_*\partial_\tau$、$S=F_*\partial_s$ とします。二つのパラメータ方向は可換です。[LORG4の接続の捩率零](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)により、引き戻し束の共変微分は $\nabla_ST=\nabla_TS$ を満たします。正定値性は一度も必要ありません。

<a id="thm-gr5-deviation"></a>

<!-- formal-statement-start -->
> **定理（Lorentz時空の測地線偏差方程式）**  
> 上の定義を満たす滑らかな測地線族 $F$ について、基準曲線の速度 $u=\dot\gamma$ と偏差ベクトル $J$ は

$$
\boxed{\frac{D^2J}{d\tau^2}=-R(J,u)u}
$$

> を満たす。$D/d\tau=\nabla_u$ は基準曲線に沿う共変微分である。曲率の規約は章頭の $R(X,Y)$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

各世界線の測地線条件を隣の曲線へ向けて微分します。微分順序を交換したときだけ曲率が現れ、捩率零を使って二回の $\tau$ 微分へ直します。

<!-- proof-start -->
### 証明

測地線族の条件はすべての $s,\tau$ で $\nabla_TT=0$ です。$s$ 方向に微分すると

$$
0=\nabla_S(\nabla_TT).
$$

[GEO16で定めた曲率作用素](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)の定義を引き戻し束上の可換な二方向へ適用すると

$$
\nabla_S\nabla_TT-\nabla_T\nabla_ST=R(S,T)T,
$$

ゆえに

$$
0=\nabla_T\nabla_ST+R(S,T)T.
$$

接続は捩率零、パラメータ方向は可換なので $\nabla_ST=\nabla_TS$。従って

$$
0=\nabla_T(\nabla_TS)+R(S,T)T
  =\nabla_T^2S+R(S,T)T.
$$

$s=0$ では $S=J$、$T=u$。$\nabla_T$ は基準曲線に沿う $D/d\tau$ になるので

$$
\frac{D^2J}{d\tau^2}+R(J,u)u=0.
$$

これが結論です。$g$ の正定値性にもRiemann多様体の最短性にも依存していません。$\square$
<!-- proof-end -->

平坦な場合は $R=0$ です。このとき偏差の共変加速度は零ですが、曲線座標で見た二人の **座標加速度** が同じとは限りません。この違いは例で確かめます。

## 3. 観測者の物差しで潮汐を読む

物理的な相対加速度を出すには、[GR4の局所直交枠](../GR4/index.md#def-gr4-observer-frame)の空間軸を基準観測者に沿って比較します。基準曲線が自由落下なので $Du/d\tau=0$ です。ある時刻の空間軸 $e_{(i)}$ を平行移動すると、計量両立性によって直交性と長さが保たれます。ここで $e_{(0)}=u/c$、$De_{(a)}/d\tau=0$ とします。加速・回転する観測者の枠なら補正項が必要です。

<a id="def-gr5-tidal-matrix"></a>

<!-- formal-statement-start -->
> **定義（自由落下観測者の潮汐行列）**  
> 自由落下曲線 $\gamma$ に沿う平行な局所直交枠 $(e_{(0)},e_{(1)},e_{(2)},e_{(3)})$ を取り、$u=ce_{(0)}$ とする。$i,j=1,2,3$ に対して

$$
\mathcal E_{ij}=g\bigl(R(e_{(j)},e_{(0)})e_{(0)},e_{(i)}\bigr)
$$

> と置き、$\mathcal E=(\mathcal E_{ij})$ をこの枠の **潮汐行列** と呼ぶ。単位は長さの逆二乗である。この章では $\mathcal E$ と $c^2\mathcal E$ を区別し、後者は時間の逆二乗の単位を持つ。
<!-- formal-statement-end -->

座標成分から潮汐行列へ移る理由を、定義そのものから確認します。$g(J,u)=0$ の偏差なら、直交枠の空間軸に沿って $J=\sum_j\xi^{(j)}e_{(j)}$ と展開できます。$u=ce_{(0)}$ と曲率の多重線形性から

$
g(R(J,u)u,e_{(i)})
=c^2\sum_j\xi^{(j)}
g(R(e_{(j)},e_{(0)})e_{(0)},e_{(i)})
=c^2\sum_j\mathcal E_{ij}\xi^{(j)}.
$

従って $\mathcal E_{ij}$ は、曲率による偏差加速度を三本の物差しで表す際に、$j$ 方向の間隔が $i$ 方向の加速度に与える係数です。直交条件が保たれることと成分の二階微分との対応は、次の命題で証明します。

<!-- definition-example-start: def-gr5-tidal-matrix -->
**定義の確認**：平坦時空。上のMinkowskiの族で $u=c\partial_0$、$e_{(0)}=\partial_0$、$e_{(i)}=\partial_i$ を取ります。各軸は接続係数が零なので平行で、内積行列は $\operatorname{diag}(-1,1,1,1)$ です。さらに座標基底で $\nabla_{\partial_\mu}\partial_\nu=0$、$[\partial_\mu,\partial_\nu]=0$ なので、曲率の定義へ代入すれば $R(\partial_\mu,\partial_\nu)\partial_\rho=0$ です。曲率のテンソル性からすべての $(i,j)$ で $\mathcal E_{ij}=0$。これは単なる対角化ではなく、枠の仮定も曲率の定義も確認した例です。
<!-- definition-example-end -->

<a id="prop-gr5-frame-deviation"></a>

<!-- formal-statement-start -->
> **命題（測定される潮汐相対加速度）**  
> 上の平行枠と測地線族について、ある初期時刻 $\tau_0$ に

$$
g(J,u)|_{\tau_0}=0,\qquad
g(DJ/d\tau,u)|_{\tau_0}=0
$$

> とする。このとき $J$ は基準曲線の全存在区間で $u$ に直交し、$\xi^{(i)}=g(J,e_{(i)})$ は

$$
\boxed{\frac{d^2\xi^{(i)}}{d\tau^2}
=-c^2\sum_{j=1}^3\mathcal E_{ij}\xi^{(j)}}
$$

> を満たす。$\mathcal E_{ij}=\mathcal E_{ji}$ である。式は測地線間隔に関する一次近似であり、$\xi(\tau_0)$ と $\dot\xi(\tau_0)$ を与えて初めて解が決まる。
<!-- formal-statement-end -->

### 証明の見取り図

まず時間方向の偏差が再び混入しないことを確認します。第二の初期条件 $g(DJ/d\tau,u)=0$ は、上で見たとおり同期した測地線族では正規化から自動的に従いますが、初期値としての役割を明示するために記載しています。次に平行枠の微分は零なので、共変微分を成分の普通の微分へ置き換えます。

<!-- proof-start -->
### 証明

$f(\tau)=g(J,u)$ とすると、計量両立性と $Du/d\tau=0$ より

$$
f'=g(DJ/d\tau,u),\qquad
f''=g(D^2J/d\tau^2,u).
$$

[測地線偏差方程式](#thm-gr5-deviation)を代入し、曲率テンソルの最後の二つの引数の交代性（[GEO16の曲率対称性](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)と同じ代数的計算がLorentzの計量両立接続でも成立）を用いると

$$
f''=-g(R(J,u)u,u)=0.
$$

初期値 $f(\tau_0)=f'(\tau_0)=0$ から $f=0$。したがって $J=\sum_j\xi^{(j)}e_{(j)}$ と展開できます。さらに枠が平行なので

$$
\frac{DJ}{d\tau}=\sum_j\dot\xi^{(j)}e_{(j)},\qquad
\frac{D^2J}{d\tau^2}=\sum_j\ddot\xi^{(j)}e_{(j)}.
$$

これを[偏差方程式](#thm-gr5-deviation)に代入し、$e_{(i)}$ と内積を取ると主張する三本の方程式を得ます。また計量両立性から得られるRiemann曲率の対称性により

$$
g(R(X,u)u,Y)=g(R(Y,u)u,X)
$$

が成り立つので $\mathcal E_{ij}=\mathcal E_{ji}$ です。この等式は[GEO16の対称性](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)の交換対称性と反対称性から従い、内積の正定値性は使用しません。$\square$
<!-- proof-end -->

初期の相対速度が零でも潮汐行列が非零なら、その瞬間から間隔の二階微分が生じます。逆に $\mathcal E=0$ でも、初期相対速度が非零なら間隔は線形に変わります。**距離が変わること**と **曲率による相対加速度があること**は同じではありません。

## 4. 静的計量で曲率を手で計算する

曲がった時空でも、一つの座標が時間的、もう一つが空間的なら計算を追いやすくなります。座標を $(t,x,y,z)$（$t$ は秒）とし、開いた領域で $N(x)>0$ の滑らかな関数を使って

$$
ds^2=-c^2N(x)^2dt^2+dx^2+dy^2+dz^2
$$

とします。計量の逆行列は $\operatorname{diag}(-1/(c^2N^2),1,1,1)$ です。[Lorentz計量のLevi-Civita接続とKoszul表示](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)から、$N'=dN/dx$ として非零になり得る係数は

$$
\Gamma^t_{tx}=\Gamma^t_{xt}=\frac{N'}{N},\qquad
\Gamma^x_{tt}=c^2NN'
$$

だけです。たとえば第一式は $\tfrac12g^{tt}\partial_xg_{tt}=\tfrac12(-1/(c^2N^2))(-2c^2NN')=N'/N$、第二式は $-\tfrac12g^{xx}\partial_xg_{tt}=-\tfrac12(-2c^2NN')=c^2NN'$ から出ます。

<a id="prop-gr5-lapse-curvature"></a>

<!-- formal-statement-start -->
> **命題（静的なlapse計量の曲率と潮汐）**  
> 上の計量と章頭の曲率符号のもとで、

$$
R(\partial_x,\partial_t)\partial_t=c^2NN''\partial_x
$$

> が成立する。$N'(x_0)=0$ を満たす定数 $x_0$ で静止する世界線 $\gamma(\tau)=(\tau/N(x_0),x_0,y_0,z_0)$ は時間的測地線であり、その上の平行な局所直交枠

$$
e_{(0)}=\frac{1}{cN(x_0)}\partial_t,\qquad
e_{(1)}=\partial_x,\quad e_{(2)}=\partial_y,\quad e_{(3)}=\partial_z
$$

> では $\mathcal E_{11}=N''(x_0)/N(x_0)$、その他の成分は零である。従って $x$ 方向の微小偏差は

$$
\ddot\xi^{(1)}+\frac{c^2N''(x_0)}{N(x_0)}\xi^{(1)}=0
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

接続係数を微分すると $N'^2$ が出ますが、接続の積にも同じ項があり、相殺されます。$N'(x_0)=0$ は静止した基準観測者が **自由落下** するための条件です。

<!-- proof-start -->
### 証明

座標ベクトル場は可換なので、$R(\partial_x,\partial_t)\partial_t$ を接続の定義で計算します。

$$
\begin{aligned}
\nabla_x\nabla_t\partial_t
 &=\nabla_x(c^2NN'\partial_x)
 =c^2\bigl((N')^2+NN''\bigr)\partial_x,\\
\nabla_t\nabla_x\partial_t
 &=\nabla_t\!\left(\frac{N'}N\partial_t\right)
 =\frac{N'}N\,c^2NN'\partial_x
 =c^2(N')^2\partial_x.
\end{aligned}
$$

差を取ると $c^2NN''\partial_x$ になります。$y,z$ 方向の係数は零なのでそれらに関する曲率作用も零です。

定数 $x_0$ の静止曲線では $d\tau=N(x_0)dt$、$u=N(x_0)^{-1}\partial_t$ です。$g(u,u)=-c^2$ で未来向きです。一方、[GR3の四元加速度](../GR3/index.md#def-gr3-four-acceleration)は

$$
\nabla_uu
=\frac{\Gamma^x_{tt}}{N(x_0)^2}\partial_x
=\frac{c^2N'(x_0)}{N(x_0)}\partial_x=0
$$

となるので基準曲線は測地線です。表示した枠のGram行列は $\operatorname{diag}(-1,1,1,1)$ で、基底でもあります。平行性も接続係数から直接確認します。$N_0=N(x_0)$、$N'_0=N'(x_0)$ と書けば

$
\nabla_u e_{(0)}=\frac{1}{cN_0^2}\Gamma^x_{tt}\partial_x
=\frac{cN'_0}{N_0}e_{(1)},\qquad
\nabla_u e_{(1)}=\frac{1}{N_0}\Gamma^t_{tx}\partial_t
=\frac{cN'_0}{N_0}e_{(0)}.
$

$N'_0=0$ だから両者は零であり、$y,z$ 方向の二軸も接続係数が零なので平行です。さらに

$$
R(e_{(1)},e_{(0)})e_{(0)}
=\frac{1}{c^2N(x_0)^2}\,c^2N(x_0)N''(x_0)\partial_x
=\frac{N''(x_0)}{N(x_0)}e_{(1)}.
$$

したがって定義通りに内積を取ると $\mathcal E_{11}=N''/N$ を得ます。[測定される潮汐相対加速度](#prop-gr5-frame-deviation)へ代入すれば最後の式です。$\square$
<!-- proof-end -->

### 曲率のある直接例：自由落下者二人が接近する

$\alpha>0$（単位 $\mathrm{s}^{-2}$）を取り、$N(x)=1+\alpha x^2/(2c^2)$ とします。$N(0)=1$、$N'(0)=0$、$N''(0)=\alpha/c^2$ なので、$x=0$ に静止する基準者は自由落下者で、潮汐行列は $\operatorname{diag}(\alpha/c^2,0,0)$。初期値 $\xi^{(1)}(0)=L>0$、$\dot\xi^{(1)}(0)=0$ なら

$$
\xi^{(1)}(\tau)=L\cos(\sqrt{\alpha}\,\tau),\qquad
\ddot\xi^{(1)}(0)=-\alpha L.
$$

微小な二人の間隔は初めは縮みます。正弦・余弦の表示は **Jacobi方程式の解** であって、任意に離れた二人の固有距離の厳密解を主張していません。$\alpha<0$ なら $N>0$ の近傍で $\cosh(\sqrt{-\alpha}\tau)$ へ変わり、初期の偏差は増幅します。

## 5. Rindlerでは加速度があっても潮汐曲率は零

[GR3のRindler計量](../GR3/index.md#prop-gr3-rindler-motion)は上と同じ形で

$$
N(x)=1+\frac{a_0x}{c^2}>0,\qquad a_0>0
$$

を使います。$N'=a_0/c^2$ なので静止者の加速度は $a_0/N$ ですが、$N''=0$ です。ここでの「静止者」は自由落下者ではありません。偏差方程式をその世界線族へそのまま当てはめるのは仮定違反です。

<a id="prop-gr5-rindler-flat"></a>

<!-- formal-statement-start -->
> **命題（Rindlerの曲率零と自由落下者の偏差）**  
> $N(x)=1+a_0x/c^2>0$ のRindler領域では全曲率テンソル $R$ が零である。領域内の任意の自由落下基準世界線とその近傍の同期した自由落下測地線族について、平行直交枠で測った偏差は

$$
\ddot\xi^{(i)}=0,\qquad
\xi^{(i)}(\tau)=A_i+B_i(\tau-\tau_0)
$$

> を満たす。ただし空間的な初期偏差・初期相対速度の条件を課す。
<!-- formal-statement-end -->

### 証明の見取り図

接続の非零成分は残っていますが、曲率の独立な成分は $N''$ だけに比例します。零曲率を確認してから自由落下族の偏差式に戻ります。

<!-- proof-start -->
### 証明

前節の接続係数に $N''=0$ を代入すると $R(\partial_x,\partial_t)\partial_t=0$。さらに同じ接続から

$$
R(\partial_t,\partial_x)\partial_x
=\left[-\partial_x\!\left(\frac{N'}N\right)
-\left(\frac{N'}N\right)^2\right]\partial_t
=-\frac{N''}N\partial_t=0.
$$

他の座標方向は接続係数が零で、$R$ は最初の二引数に交代的なので、座標基底上の全成分が零です。よってテンソルとして $R=0$。自由落下基準曲線へ[測地線偏差方程式](#thm-gr5-deviation)を用いると $D^2J/d\tau^2=0$。初期の直交条件が保たれることと平行枠の成分表示は[観測潮汐公式](#prop-gr5-frame-deviation)によるため、各成分は通常の $\ddot\xi^{(i)}=0$ を満たし、初期値 $A_i=\xi^{(i)}(\tau_0)$、$B_i=\dot\xi^{(i)}(\tau_0)$ で積分できます。$\square$
<!-- proof-end -->

静止者の加速度と自由落下者の偏差加速度を混同しなければ、座標変換だけで潮汐力を作り出せないことが分かります。ここでは二つの計量を並べて、$N'$ が静止者の加速度、$N''$ が曲率へ寄与する役割を分離しました。

## 6. Newtonの潮汐との照合

弱く静的な重力場を考えると $N\simeq1+\Phi/c^2$（$|\Phi|/c^2\ll1$）です。一次の近似で $c^2N''/N\simeq\Phi''$ となるので、偏差方程式は

$$
\ddot\xi\simeq-\Phi''\,\xi.
$$

これはNewton力学の二粒子の加速度差からも導けます。$a(x)=-\Phi'(x)$ とすると、$a(x+\delta x)-a(x)=-\Phi''(x)\delta x+O((\delta x)^2)$ です。したがって曲率は力そのものの大きさではなく **力の空間的な変化** と結び付いています。この比較は弱場の対応であり、ここからEinstein場の方程式を導いたわけではありません。

三次元のNewtonポテンシャル $\Phi=-GM/r$（$r>0$）で単位放射方向 $\boldsymbol n=\boldsymbol x/r$ とすれば、$\partial_i\Phi=GMx_i/r^3$ なので

$
\partial_i\partial_j\Phi
=GM\left(\frac{\delta_{ij}}{r^3}-\frac{3x_ix_j}{r^5}\right)
=\frac{GM}{r^3}(\delta_{ij}-3n_in_j).
$

このHessianは、空間的な間隔 $\boldsymbol\xi$ に相対加速度 $-\operatorname{Hess}\Phi\,\boldsymbol\xi$ を与える線形写像の行列表現です。$\boldsymbol n$ を代入すると $H\boldsymbol n=(GM/r^3)(1-3)\boldsymbol n=-2GM\boldsymbol n/r^3$、$\boldsymbol t\cdot\boldsymbol n=0$ の接線方向では $H\boldsymbol t=(GM/r^3)\boldsymbol t$ となります。したがって放射方向の固有値は $-2GM/r^3$、二つの接線方向は $+GM/r^3$。よって初期相対速度が零なら、放射方向は伸び、接線方向は縮みます。これは非相対論的な **弱場の潮汐の向き** の例であり、Schwarzschild解をまだ導入せずに理解できます。

## 7. 演習：初期条件と曲率符号を自分で判断する

各問で $g$ は $(-,+,+,+)$、$R(X,Y)$ は章頭の規約です。相対偏差を測る場合は、基準世界線が自由落下し、枠が平行であることを確認してください。

### Level A

<a id="ex-gr5-a01"></a>
#### GR5-A01 平行なMinkowski世界線
- Level: A

$F(s,\tau)=(c\tau,sL,0,0)$、$L>0$ の測地線条件・偏差・初期相対速度を求めよ。

<!-- solution-start -->
**詳細解答**。$T=\partial_\tau F=(c,0,0,0)$ は未来向きで $g(T,T)=-c^2$、MinkowskiのCartesian座標では $\Gamma^\rho_{\mu\nu}=0$ なので $\nabla_TT=0$。$J=\partial_sF|_0=(0,L,0,0)$ で $g(J,T)=0$、$DJ/d\tau=0$、$g(DJ/d\tau,T)=0$。平行枠 $e_{(1)}=\partial_x$ で $\xi^{(1)}=L$、$\dot\xi^{(1)}=0$。曲率が零なので[測地線偏差方程式](#thm-gr5-deviation)の両辺とも零です。
<!-- solution-end -->

<a id="ex-gr5-a02"></a>
#### GR5-A02 離れる速度は潮汐と異なる
- Level: A

平坦時空の平行枠で初期偏差 $L$、初期相対速度 $v$ が $x$ 方向にあるとき、Jacobi方程式を解け。間隔が変化するなら曲率非零か。

<!-- solution-start -->
**詳細解答**。[潮汐相対加速度の命題](#prop-gr5-frame-deviation)で $\mathcal E=0$ を代入すると $\ddot\xi^{(1)}=0$。一度積分して $\dot\xi^{(1)}=v$、さらに $\xi^{(1)}(\tau)=L+v(\tau-\tau_0)$。$v\ne0$ なら間隔の一次変化はありますが、二階微分は零です。曲率非零の根拠にはなりません。
<!-- solution-end -->

<a id="ex-gr5-a03"></a>
#### GR5-A03 時間成分の初期条件
- Level: A

$R(J,u)u$ が $u$ に直交することを使い、$g(J,u)|_0=0$、$g(DJ/d\tau,u)|_0=0$ から $g(J,u)=0$ が保たれることを示せ。

<!-- solution-start -->
**詳細解答**。$f=g(J,u)$ と置き、基準者の自由落下条件 $Du/d\tau=0$ から $f'=g(DJ/d\tau,u)$、$f''=g(D^2J/d\tau^2,u)$。[測地線偏差方程式](#thm-gr5-deviation)より $f''=-g(R(J,u)u,u)=0$。最後の等号は計量両立接続の曲率が最後の二変数について交代的なためです。$f(\tau)=A+B\tau$ に初期値 $f(0)=f'(0)=0$ を入れると $A=B=0$ です。
<!-- solution-end -->

<a id="ex-gr5-a04"></a>
#### GR5-A04 一定の潮汐係数
- Level: A

平行枠で $\mathcal E=\operatorname{diag}(k,0,0)$（$k>0$、長さの逆二乗）とする。$\xi^{(1)}(0)=L,\dot\xi^{(1)}(0)=0$ の解と次元を確認せよ。

<!-- solution-start -->
**詳細解答**。[潮汐相対加速度](#prop-gr5-frame-deviation)から $\ddot\xi^{(1)}+c^2k\xi^{(1)}=0$。振動数 $\omega=c\sqrt{k}$ は $\mathrm{s}^{-1}$ で、一般解 $A\cos(\omega\tau)+B\sin(\omega\tau)$ に初期値を入れると $A=L$、$B=0$。よって $\xi^{(1)}=L\cos(c\sqrt{k}\tau)$、初期相対加速度は $-c^2kL$ です。
<!-- solution-end -->

<a id="ex-gr5-a05"></a>
#### GR5-A05 Rindlerの二種類の加速度
- Level: A

$N=1+a_0x/c^2>0$ について静止者の固有加速度の $x$ 成分と、自由落下者間の共変偏差加速度を求めよ。

<!-- solution-start -->
**詳細解答**。静止者の四元速度は $u=N^{-1}\partial_t$、$\Gamma^x_{tt}=c^2NN'=a_0N$ なので $a^x=\Gamma^x_{tt}/N^2=a_0/N\ne0$。[GR3の四元加速度](../GR3/index.md#def-gr3-four-acceleration)と一致します。一方 $N''=0$ なので[全曲率が零となるRindlerの命題](#prop-gr5-rindler-flat)から $R=0$、自由落下基準者に沿う $D^2J/d\tau^2=-R(J,u)u=0$。静止者の族は測地線族ではないので、第一の値をそのまま第二に使いません。
<!-- solution-end -->

### Level B

<a id="ex-gr5-b01"></a>
#### GR5-B01 曲がったlapseの全過程
- Level: B

$N=1+\alpha x^2/(2c^2)$、$\alpha>0$ について $x=0$ の基準者が測地線であることを示し、$\Gamma^t_{tx}$、$\Gamma^x_{tt}$、$R(\partial_x,\partial_t)\partial_t$、$\ddot\xi^{(1)}(0)$ を求めよ。初期偏差は $\xi^{(1)}(0)=L$、初期相対速度は零とする。

<!-- solution-start -->
**詳細解答**。$N'=\alpha x/c^2$、$N''=\alpha/c^2$ です。接続は $\Gamma^t_{tx}=N'/N=\alpha x/(c^2N)$ と $\Gamma^x_{tt}=c^2NN'=\alpha xN$。$x=0$ では両者零で、$u=\partial_t$、$g(u,u)=-c^2$、$\nabla_uu=\Gamma^x_{tt}\partial_x=0$ です。曲率計算は

$$
\begin{aligned}
R(\partial_x,\partial_t)\partial_t
&=\left[\partial_x(c^2NN')-c^2(N')^2\right]\partial_x\\
&=c^2NN''\partial_x=\alpha N\partial_x.
\end{aligned}
$$

$x=0$ で $N=1$、平行枠の $\mathcal E_{11}=N''/N=\alpha/c^2$ です。従って $\ddot\xi^{(1)}(0)=-c^2(\alpha/c^2)L=-\alpha L$。初期条件を使わずに「ただちに接近する」とは言えません。
<!-- solution-end -->

<a id="ex-gr5-b02"></a>
#### GR5-B02 二方向の潮汐を分ける
- Level: B

$ds^2=-c^2N(x,y)^2dt^2+dx^2+dy^2+dz^2$、$N=1+(\alpha x^2+\beta y^2)/(2c^2)$、$N>0$ とする。原点の静止者が測地線であることを確認し、原点での $\mathcal E_{ij}$ と初期相対加速度を求めよ。

<!-- solution-start -->
**詳細解答**。$N_x=\alpha x/c^2$、$N_y=\beta y/c^2$ なので原点で勾配は零です。一般に $\Gamma^i_{tt}=c^2N\partial_iN$、$\Gamma^t_{ti}=\partial_iN/N$（$i=x,y$）だから、原点で接続係数は零、$\nabla_uu=0$。空間計量はEuclidなので $e_{(0)}=(cN)^{-1}\partial_t$、$e_{(i)}=\partial_i$ は原点で直交・平行です。曲率式を二方向で導くには、$N_i=\partial_iN$ と置き、$\nabla_t\partial_t=c^2N\sum_iN_i\partial_i$ と $\nabla_j\partial_t=(N_j/N)\partial_t$ を使います。座標方向は可換なので

$
\begin{aligned}
R(\partial_j,\partial_t)\partial_t
&=\nabla_j\nabla_t\partial_t-\nabla_t\nabla_j\partial_t\\
&=c^2\sum_i\left[\partial_j(NN_i)-\frac{N_j}{N}NN_i\right]\partial_i\\
&=c^2N\sum_i(\partial_j\partial_iN)\partial_i.
\end{aligned}
$

原点のHessianは $\operatorname{diag}(\alpha/c^2,\beta/c^2,0)$、ゆえに

$$
\mathcal E=\operatorname{diag}(\alpha/c^2,\beta/c^2,0),\quad
\ddot{\boldsymbol\xi}(0)=(-\alpha\xi^{(1)}(0),-\beta\xi^{(2)}(0),0).
$$

各成分は別々の初期偏差・初期相対速度で定まります。$\alpha,\beta$ の符号が異なれば、一方向は圧縮、もう一方向は伸長です。
<!-- solution-end -->

<a id="ex-gr5-b03"></a>
#### GR5-B03 Newtonの球対称潮汐
- Level: B

$\Phi=-GM/r$、$G,M>0,r>0$ の点 $(r,0,0)$ でHessianを計算し、放射・接線方向の相対加速度の符号を答えよ。

<!-- solution-start -->
**詳細解答**。$\partial_i(1/r)=-x_i/r^3$ なので $\partial_i\Phi=GMx_i/r^3$。もう一度微分すると $\partial_j(x_i/r^3)=\delta_{ij}/r^3-3x_ix_j/r^5$ です。従って

$$
(\partial_i\partial_j\Phi)_{(r,0,0)}
=\frac{GM}{r^3}\operatorname{diag}(-2,1,1).
$$

Newton相対加速度は $-\operatorname{Hess}\Phi\,\boldsymbol\xi$ です。$x$ 放射方向は $+2GM\xi^{(1)}/r^3$ で伸び、$y,z$ 接線方向は $-GM\xi^{(2,3)}/r^3$ で縮みます。ここでは弱場のNewton模型であり、場の方程式の結論を使っていません。
<!-- solution-end -->

<a id="ex-gr5-b04"></a>
#### GR5-B04 初速度を変えたJacobi場
- Level: B

一定の $\mathcal E_{11}=k>0$ の区間で $\xi^{(1)}(0)=L$、$\dot\xi^{(1)}(0)=V$ とする。$\xi^{(1)}(\tau)$ を導き、$V=0$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答**。[潮汐相対加速度の命題](#prop-gr5-frame-deviation)に $\mathcal E_{11}=k$ を代入し、$\omega=c\sqrt{k}>0$ を置けば $\ddot\xi+\omega^2\xi=0$。一般解 $\xi=A\cos(\omega\tau)+B\sin(\omega\tau)$ の $\tau=0$ から $A=L$、微分して $\dot\xi(0)=B\omega=V$ より $B=V/\omega$。よって

$$
\xi^{(1)}(\tau)=L\cos(\omega\tau)+\frac{V}{\omega}\sin(\omega\tau).
$$

$V=0$ のときは余弦だけですが、$V\ne0$ なら初期の間隔変化には相対速度が寄与します。初期の **潮汐加速度** $\ddot\xi(0)=-\omega^2L$ は同じです。
<!-- solution-end -->

### Level C

<a id="ex-gr5-c01"></a>
#### GR5-C01 加速座標と本当の潮汐を判別する
- Level: C

同じ形式 $ds^2=-c^2N(x)^2dt^2+dx^2+dy^2+dz^2$ の二模型を考える。（I）$N_1(x)=1+a_0x/c^2>0$、$a_0>0$。（II）$N_2(x)=1+\alpha x^2/(2c^2)$、$\alpha>0$。両者で静止者の四元加速度を出し、どの点の静止者が自由落下者か判定せよ。次に、（I）の任意の自由落下基準者、（II）の $x=0$ の自由落下基準者について、初期偏差 $\xi^{(1)}(0)=L>0$、初期相対速度零を与え、一次の偏差を求めよ。最後に「静止者の加速度が非零だから潮汐も非零」という推論の誤りを説明せよ。

<!-- solution-start -->
**詳細解答**。両模型で $u=N^{-1}\partial_t$ は未来向きで $g(u,u)=-c^2$。Christoffel係数 $\Gamma^x_{tt}=c^2NN'$ から静止者の四元加速度は $a^x=c^2N'/N$ です。（I）は $a^x=a_0/N_1$ で領域全体で非零なので **どの静止世界線も測地線ではありません**。（II）は $a^x=\alpha x/N_2$ で、$x=0$ の静止者だけが測地線です。

曲率は[静的lapseの命題](#prop-gr5-lapse-curvature)から $R(\partial_x,\partial_t)\partial_t=c^2NN''\partial_x$。（I）では $N_1''=0$、他の独立曲率成分も零です。従って自由落下基準世界線に沿う平行枠では $\ddot\xi^{(1)}=0$。初期偏差 $L$、初期相対速度零を積分すると $\xi^{(1)}(\tau)=L$ です。この結論は **Rindlerの静止世界線族** ではなく自由落下の測地線族に関するものです。

（II）では $N_2(0)=1,N_2'(0)=0,N_2''(0)=\alpha/c^2$。原点静止者の速度は $u=\partial_t$、$\nabla_uu=0$、枠 $(\partial_t/c,\partial_x,\partial_y,\partial_z)$ は平行です。$\mathcal E_{11}=N_2''/N_2=\alpha/c^2$ なので $\ddot\xi^{(1)}+\alpha\xi^{(1)}=0$、初期条件により

$$
\xi^{(1)}(\tau)=L\cos(\sqrt{\alpha}\tau),\qquad
\ddot\xi^{(1)}(0)=-\alpha L.
$$

（I）では非零の静止者加速度 $a_0/N_1$ を得ても、静止者は測地線族という仮定を満たしません。潮汐相対加速度は測地線偏差から出すべきものであり、Christoffel係数や静止者の加速度だけから曲率の非零性は判断できません。
<!-- solution-end -->

## 8. 次に必要となる曲率の情報

ここでは曲率が隣接する自由落下者の運動を支配することを示しました。ただし潮汐行列は曲率テンソルの一部であり、一人の観測者による三次元の測定だけで四次元曲率の全成分が分かるとは限りません。次のGR6ではRiemannテンソル全体と、そこから縮約されるRicci曲率・スカラー曲率を整理します。
