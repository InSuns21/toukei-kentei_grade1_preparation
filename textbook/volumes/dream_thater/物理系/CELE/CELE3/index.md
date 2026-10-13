# CELE3 三体問題の特殊解

<!-- definition-example-audit: strict -->

> **既習の道具**：[CELE2 のNewton三体方程式](../CELE2/index.md#prop-cele2-nbody-equations)、[CELE2 の重心分離](../CELE2/index.md#prop-cele2-jacobi-reduction)、[CELE1 のKepler円運動](../CELE1/index.md#thm-cele1-planar-integrability)、[GMECH8 の相対平衡](../../../幾何系/GMECH/GMECH8/index.md#def-gmech8-relative-equilibrium)を使用します。

## 1. 解けない三体問題にも、形を保つ運動がある

一般の三体運動では二本の相対ベクトルが結合するため、[重心分離](../CELE2/index.md#prop-cele2-jacobi-reduction)をしても二つのKepler問題にはなりません。しかし初期配置を特別に選べば、三体全体が形を変えずに回転したり、同じ形を保ちながら拡大・縮小したりします。

そのために必要なのは、個々の重力加速度が**重心へ向かう位置ベクトルに同じ係数で比例する**という条件です。この共通比例条件を定式化し、正三角形型と一直線型を構成します。最後に「形が保存される解が存在する」ことと「小さく崩しても形が保たれる」ことは別問題であると確かめます。

以後、三質点の質量を $m_1,m_2,m_3>0$、万有引力定数を $G>0$ とし、位置は平面 $\mathbb R^2$ で考えます。衝突のない配置のみを扱い、$J(u_1,u_2)=(-u_2,u_1)$ は反時計回りの $90^\circ$ 回転、$R_\theta$ は角 $\theta$ の回転行列とします。

## 2. 中心配置：加速度の向きを三体でそろえる

三質点の位置 $a_i$ に対して、全質量 $M=m_1+m_2+m_3$、重心 $c=M^{-1}\sum_i m_i a_i$ をとります。全体を並進しても重力は変わらないので、$b_i=a_i-c$ と置くと $\sum_i m_i b_i=0$ です。次の定義は、重心に関する形を記述します。

<a id="def-cele3-central-configuration"></a>

<!-- formal-statement-start -->
> **定義（中心配置）**  
> $m_i,G>0$、互いに異なる $b_1,b_2,b_3\in\mathbb R^2$ が $\sum_i m_i b_i=0$ を満たすとする。ある共通定数 $\lambda>0$ が存在して、各 $i=1,2,3$ に対し

$$
G\sum_{j\ne i}m_j\frac{b_j-b_i}{|b_j-b_i|^3}
=-\lambda b_i
$$

> が成立するとき、$(b_1,b_2,b_3)$ を重心を原点とする中心配置と呼ぶ。
<!-- formal-statement-end -->

左辺は粒子 $i$ の単位質量当たりの重力加速度です。係数 $\lambda$ は粒子番号に依存してはいけません。各力が重心を向くだけでなく、**重心からの距離に比例する強さ**を持つことが条件です。

<!-- definition-example-start: def-cele3-central-configuration -->

**定義の確認：等質量の一直線配置。** $m_1=m_2=m_3=m>0$、$b_1=(-d,0),b_2=(0,0),b_3=(d,0)$、$d>0$ とします。重心は原点で衝突もありません。第1粒子の加速度は右向きで

$$
Gm\left(\frac1{d^2}+\frac1{(2d)^2}\right)e_x
=\frac{5Gm}{4d^2}e_x
=-\frac{5Gm}{4d^3}b_1.
$$

第2粒子は左右の力が相殺して零、第3粒子は対称性から $-5Gm\,e_x/(4d^2)$ です。ゆえに三粒子すべてに同じ $\lambda=5Gm/(4d^3)>0$ が使えます。

<!-- definition-example-end -->

質量重み付きの大きさを測る量として、慣性モーメント $I$ と正の重力ポテンシャル量 $U$ を

$$
I(b)=\sum_{i=1}^3m_i|b_i|^2,\qquad
U(b)=G\sum_{i<j}\frac{m_im_j}{|b_i-b_j|}
$$

と置きます。実際の位置エネルギーは $V=-U$ です。$I>0,U>0$ は非衝突のため成立します。

<a id="prop-cele3-multiplier-scaling"></a>

<!-- formal-statement-start -->
> **命題（中心配置の係数と縮尺）**  
> $m_i,G>0$ の非衝突中心配置 $b$ に対応する係数は一意で、

$$
\lambda=\frac{U(b)}{I(b)}>0
$$

> である。また、$s>0$、回転 $R$ に対して $(sRb_i)$ も中心配置となり、その係数は $\lambda/s^3$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各加速度と $m_i b_i$ の内積を足すと、一つの粒子対に由来する二項が組になり、$-Gm_im_j/|b_i-b_j|$ が現れます。縮尺の三乗は、距離に対する重力加速度の $s^{-2}$ と位置の $s$ から出ます。

<!-- proof-start -->
### 証明

定義の等式へ $m_i b_i$ を内積し、$i$ について足します。右辺は $-\lambda I(b)$ です。左辺で対 $(i,j)$ から来る項は

$$
\begin{aligned}
&Gm_im_j\frac{b_i\cdot(b_j-b_i)+b_j\cdot(b_i-b_j)}
{|b_i-b_j|^3}\\
&=Gm_im_j\frac{-(b_i-b_j)\cdot(b_i-b_j)}
{|b_i-b_j|^3}
=-\frac{Gm_im_j}{|b_i-b_j|}.
\end{aligned}
$$

三つの対を足すと $-\lambda I=-U$。$I>0$ で割れば係数の公式と一意性を得ます。次に $b_i'=sRb_i$ と置き、回転でノルムが保存されることを使うと

$$
G\sum_{j\ne i}m_j\frac{b'_j-b'_i}{|b'_j-b'_i|^3}
=\frac1{s^2}R\left(G\sum_{j\ne i}m_j
\frac{b_j-b_i}{|b_j-b_i|^3}\right)
=-\frac{\lambda}{s^2}Rb_i
=-\frac{\lambda}{s^3}b'_i.
$$

さらに $\sum_i m_i b_i'=sR\sum_i m_i b_i=0$ であり、非衝突条件も保たれます。
<!-- proof-end -->

たとえば直前の一直線配置で間隔を $d$ から $2d$ に変えると、回転角速度の二乗に対応する係数は $1/8$ になります。「距離を2倍にすると力が $1/4$」だけでは、運動の角速度を誤って求めます。

## 3. Lagrangeの正三角形配置

質量が等しくなくても、三角形の三辺を等しくすると重力は同じ縮尺で重心を向きます。ここで必要なのは力の大きさが三粒子で等しいことではありません。**各加速度を、それぞれの重心からの位置に比例させること**です。

<a id="prop-cele3-lagrange-equilateral"></a>

<!-- formal-statement-start -->
> **命題（Lagrangeの正三角形中心配置）**  
> $m_i,G>0$ とし、相異なる $a_1,a_2,a_3\in\mathbb R^2$ が一辺 $d>0$ の正三角形をなすとする。$c=M^{-1}\sum_i m_i a_i$、$b_i=a_i-c$ とすれば、$(b_i)$ は中心配置であり

$$
\lambda=\frac{GM}{d^3}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

全ての粒子間距離が $d$ なので、分母 $d^3$ を一度に外へ出せます。重み付きベクトル和を重心の式へ置き換えると、粒子 $i$ の質量に依存しない係数が現れます。

<!-- proof-start -->
### 証明

$b_j-b_i=a_j-a_i$ です。第 $i$ 粒子に働く加速度を整理すると

$$
\begin{aligned}
G\sum_{j\ne i}m_j\frac{b_j-b_i}{d^3}
&=\frac{G}{d^3}\left(\sum_{j\ne i}m_jb_j
-b_i\sum_{j\ne i}m_j\right)\\
&=\frac{G}{d^3}\left(\sum_{j=1}^3m_jb_j-Mb_i\right)
=-\frac{GM}{d^3}b_i.
\end{aligned}
$$

重心の定義より中間式の総和は零です。$G,M,d>0$ なので係数は正であり、非衝突・重心零の条件も満たします。
<!-- proof-end -->

**不等質量の具体例。** $m_1=1,m_2=2,m_3=3$、$a_1=(0,0)$、$a_2=(2,0)$、$a_3=(1,\sqrt3)$ とします。三辺はいずれも $2$、重心は

$$
c=\frac{a_1+2a_2+3a_3}{6}
=\left(\frac76,\frac{\sqrt3}{2}\right).
$$

第1粒子の加速度は $G(2(2,0)+3(1,\sqrt3))/8=G(7,3\sqrt3)/8$。一方

$$
-\frac{3G}{4}(a_1-c)
=\frac{3G}{4}\left(\frac76,\frac{\sqrt3}{2}\right)
=\frac G8(7,3\sqrt3).
$$

両者は一致します。力の大きさを個別に暗記しなくても、正三角形と重心から運動を組み立てられます。

## 4. Eulerの一直線配置

三質点を直線上に置けば自動的に中心配置になるわけではありません。外側の粒子に働く力と真ん中の粒子に働く力が、**同じ $\lambda$ で重心方向を向くように間隔比を選ぶ**必要があります。

並び順を $1,2,3$ に固定し、並進と正の縮尺によって一次元座標を $a_1=0,a_2=1,a_3=1+x$（$x>0$）とします。重心を引く前の各加速度を $f_1,f_2,f_3$ と記せば

$$
\begin{aligned}
f_1/G&=m_2+\frac{m_3}{(1+x)^2},\\
f_2/G&=-m_1+\frac{m_3}{x^2},\\
f_3/G&=-\frac{m_1}{(1+x)^2}-\frac{m_2}{x^2}.
\end{aligned}
$$

中心配置の等式から重心の項を消すには、第2・第1粒子の加速度差が $-\lambda(a_2-a_1)$、第3・第2粒子の差が $-\lambda(a_3-a_2)$ となることを利用します。

<a id="thm-cele3-euler-collinear"></a>

<!-- formal-statement-start -->
> **定理（Eulerの共線中心配置）**  
> 任意の $m_1,m_2,m_3,G>0$ について、順序 $a_1<a_2<a_3$ を固定すると、並進および正の縮尺を除いて共線中心配置はただ一つ存在する。$a_1=0,a_2=1,a_3=1+x$ と規格化すると、間隔比 $x>0$ は

$$
\begin{aligned}
P(x)={}&(m_1+m_2)x^5+(3m_1+2m_2)x^4
 +(3m_1+m_2)x^3\\
&-(m_2+3m_3)x^2-(2m_2+3m_3)x
 -(m_2+m_3)=0
\end{aligned}
$$

> の唯一の正の根である。三粒子の順序を入れ替えれば、ラベル付き三体では対応する三通りの「どの粒子が中央にあるか」を区別できる。
<!-- formal-statement-end -->

### 証明の見取り図

重心の値を最初から代入すると式が煩雑になります。加速度の**差**から共通の係数を消して五次方程式を作り、最後にその根から中心配置であることを戻して証明します。正の根の一意性は係数の符号だけに頼らず、$P(x)/x^3$ の単調性から示せます。

<!-- proof-start -->
### 証明

正規化された三座標で中心配置が成立するなら、粒子間の加速度差から

$$
f_2-f_1=-\lambda,\qquad
f_3-f_2=-\lambda x,
$$

すなわち $f_3-f_2=x(f_2-f_1)$ が必要です。上の $f_i$ を代入し、$G$ を消して両辺を整理すると

$$
\begin{aligned}
0={}&\frac{f_3-f_2-x(f_2-f_1)}G\\
={}&m_1\left(1-\frac1{(1+x)^2}\right)
-\frac{m_2+m_3}{x^2}
+x(m_1+m_2)\\
&-m_3\left(\frac1x-\frac{x}{(1+x)^2}\right).
\end{aligned}
$$

$x^2(1+x)^2>0$ を掛けて展開すると、ちょうど $P(x)=0$ になります。よって必要条件が得られました。

正の根を調べるため $F(x)=P(x)/x^3$ と置きます。これは

$$
\begin{aligned}
F(x)={}&(m_1+m_2)x^2+(3m_1+2m_2)x+(3m_1+m_2)\\
&-\frac{m_2+3m_3}{x}
-\frac{2m_2+3m_3}{x^2}
-\frac{m_2+m_3}{x^3}
\end{aligned}
$$

です。正の質量の仮定から、$F'(x)$ は全て正の項の和になります。特に $F$ は $(0,\infty)$ 上で連続かつ狭義増加で、

$$
\lim_{x\downarrow0}F(x)=-\infty,\qquad
\lim_{x\to\infty}F(x)=+\infty.
$$

中間値の定理で正の根が存在し、狭義増加性でただ一つです。

逆にその根を選び、$c=M^{-1}\sum_i m_i a_i$、$b_i=a_i-c$ と置きます。$\lambda=-(f_2-f_1)$ と定めれば、方程式から全ての $i$ で $f_i+\lambda a_i$ が同じ定数 $K$ です。一方、作用・反作用で $\sum_i m_i f_i=0$ なので

$$
0=\sum_i m_i(f_i+\lambda a_i)-\lambda\sum_i m_i a_i
=MK-\lambda Mc.
$$

従って $K=\lambda c$、すなわち $f_i=-\lambda(a_i-c)=-\lambda b_i$。ここで $I>0$ であり、前節と同じ粒子対の内積計算から $\lambda I=U>0$ が導かれます。したがって $\lambda>0$ も確かめられ、定義の全条件が成立します。
<!-- proof-end -->

$m_1=m_2=m_3=m$ なら $x=1$ が方程式の解です。唯一性から間隔比は $1:1$、重心を引けば $(-1,0,1)$ に相当します。ただし質量を変えると一般に $x=1$ ではなくなります。Euler型は「等間隔の三点」ではなく「正しい間隔比を持つ一直線配置」です。

## 5. 相似運動：三体の形を変えずにKepler運動へ

中心配置は静止した力のつり合いではありません。三質点が同じ角度だけ回転し、同じ倍率だけ拡大・縮小すれば、元のNewton方程式に解が残り得ます。この**形状不変**の解を求めます。

<a id="def-cele3-homographic"></a>

<!-- formal-statement-start -->
> **定義（相似運動）**  
> 衝突のない平面三体解 $q_i(t)$ が、重心静止系で固定した相異なる $b_i\in\mathbb R^2$、$r(t)>0$、角度関数 $\theta(t)$ によって

$$
q_i(t)=r(t)R_{\theta(t)}b_i,\qquad
\sum_i m_i b_i=0
$$

> と書けるとき、その解を相似運動という。$r$ が一定の場合は剛体的な回転、$\theta$ が一定の場合は相似縮小・拡大である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele3-homographic -->

**定義の確認。** $b_1=(-1,0),b_2=(0,0),b_3=(1,0)$、$m_1=m_2=m_3=G=1$ とします。この中心配置の係数は $\lambda=5/4$ です。$r(t)=2$、$\theta(t)=\sqrt{5/32}\,t$ と置くと、円運動条件 $\dot\theta^2=\lambda/r^3=(5/4)/8=5/32$ を満たします。各時刻で $q_2=0$、$|q_2-q_1|=|q_3-q_2|=2$、$|q_3-q_1|=4$、重心零であり、次の定理の方程式も満たすのでNewtonの三体解になっています。一般には $r,\theta$ を任意に与えただけでは解になりません。

<!-- definition-example-end -->

<a id="thm-cele3-homographic-reduction"></a>

<!-- formal-statement-start -->
> **定理（中心配置からの相似運動）**  
> $m_i,G>0$、非衝突の平面中心配置 $(b_i)$ の係数を $\lambda>0$ とする。$C^2$ 関数 $r(t)>0,\theta(t)$ が区間上で

$$
\ddot r-r\dot\theta^2=-\frac{\lambda}{r^2},
\qquad
\frac{d}{dt}(r^2\dot\theta)=0
$$

> を満たすなら、$q_i(t)=r(t)R_{\theta(t)}b_i$ はNewtonの三体方程式を満たす。特に $h=r^2\dot\theta$ は一定で、

$$
\ddot r=\frac{h^2}{r^3}-\frac{\lambda}{r^2},
\qquad
\frac12\dot r^2+\frac{h^2}{2r^2}-\frac{\lambda}{r}=e
$$

> が成り立つ。$e$ は単位慣性モーメント当たりの保存エネルギーである。
<!-- formal-statement-end -->

### 証明の見取り図

$rR_\theta b_i$ を二回微分すると、半径方向の係数と $90^\circ$ 回転した方向の係数に分かれます。重力は中心配置のため半径方向だけにあり、接線方向の係数が零になる条件が角運動量保存 $r^2\dot\theta=h$ です。

<!-- proof-start -->
### 証明

$\frac{d}{dt}(R_\theta b_i)=\dot\theta JR_\theta b_i$ と $J^2=-\mathrm{Id}$ を用います。まず一回微分すると

$$
\dot q_i=\dot r R_\theta b_i+r\dot\theta JR_\theta b_i.
$$

積の微分を各項へ施せば

$$
\ddot q_i=(\ddot r-r\dot\theta^2)R_\theta b_i
+(2\dot r\dot\theta+r\ddot\theta)JR_\theta b_i.
$$

他方、粒子間距離は $|q_i-q_j|=r|b_i-b_j|$ なので、中心配置の定義をそのまま代入して

$$
G\sum_{j\ne i}m_j\frac{q_j-q_i}{|q_j-q_i|^3}
=\frac1{r^2}R_\theta
\left(G\sum_{j\ne i}m_j\frac{b_j-b_i}{|b_j-b_i|^3}\right)
=-\frac{\lambda}{r^2}R_\theta b_i.
$$

接線方向が消える条件は $2\dot r\dot\theta+r\ddot\theta=0$。$r>0$ を掛ければ $2r\dot r\dot\theta+r^2\ddot\theta=(r^2\dot\theta)'=0$ です。半径方向の条件も仮定の第一式と一致します。ゆえにNewton方程式が成り立ちます。

$h=r^2\dot\theta$ と置いて $\dot\theta=h/r^2$ を代入すると $\ddot r=h^2/r^3-\lambda/r^2$。これに $\dot r$ を掛け、

$$
\dot r\ddot r
=\frac{h^2\dot r}{r^3}-\frac{\lambda\dot r}{r^2}
=-\frac{d}{dt}\left(\frac{h^2}{2r^2}-\frac{\lambda}{r}\right)
$$

と書き直せば、表示した $e$ が一定になります。
<!-- proof-end -->

この運動は[二体問題の有効ポテンシャル](../../MECH/MECH6/index.md#def-mech6-effective-potential)と同じ一自由度の動径方程式に帰着します。ただし三体そのものが一般に可積分になったわけではありません。**中心配置から始まる特別な初期値族**だけがこの方程式へ閉じています。

なお元の三体運動のエネルギーと角運動量は、$I_0=I(b)$、$U_0=U(b)=\lambda I_0$ を使い

$$
H=I_0\left(\frac12\dot r^2+\frac{h^2}{2r^2}-\frac{\lambda}{r}\right)
=I_0 e,\qquad
L_z=I_0r^2\dot\theta=I_0 h
$$

です。これで $e$ が元の全エネルギー $H$ そのものではないことも分かります。

## 6. 円運動と回転座標系での相対平衡

$r(t)=r_0>0$ を一定、$\theta(t)=\omega t+\theta_0$ とすれば、動径方程式から

$$
-r_0\omega^2=-\frac{\lambda}{r_0^2},
\qquad \omega^2=\frac{\lambda}{r_0^3}.
$$

つまり任意の中心配置は、縮尺 $r_0$ に応じた一定角速度で回る三体の**相対平衡**を生みます。[GMECH8 の相対平衡の定義](../../../幾何系/GMECH/GMECH8/index.md#def-gmech8-relative-equilibrium)は、全体として動いていても回転対称性を除いた状態が一定という考え方です。

<a id="prop-cele3-rotating-equilibrium"></a>

<!-- formal-statement-start -->
> **命題（中心配置と回転座標系の平衡）**  
> $m_i,G>0$ の非衝突平面三体について、$\omega\ne0$ を固定し、$q_i(t)=R_{\omega t}s_i(t)$ とする。回転座標系でのNewton方程式は

$$
\ddot s_i+2\omega J\dot s_i
=G\sum_{j\ne i}m_j\frac{s_j-s_i}{|s_j-s_i|^3}
+\omega^2s_i
$$

> である。重心が原点にある静止配置 $s_i(t)\equiv b_i$ がこの方程式の解となる必要十分条件は、$b$ が係数 $\lambda=\omega^2$ の中心配置であることである。
<!-- formal-statement-end -->

### 証明の見取り図

座標変換を二回微分すると、速度に比例するCoriolis項 $2\omega J\dot s_i$ と位置に比例する遠心項 $-\omega^2s_i$ が現れます。右辺の重力は回転共変なので、静止配置の条件が中心配置の式と同じになります。

<!-- proof-start -->
### 証明

$R_{\omega t}'=\omega JR_{\omega t}$、$J^2=-\mathrm{Id}$ より

$$
\dot q_i=R_{\omega t}(\dot s_i+\omega Js_i),\qquad
\ddot q_i=R_{\omega t}(\ddot s_i+2\omega J\dot s_i-\omega^2s_i).
$$

粒子間の距離は回転で変わらず、加速度の重力項は $R_{\omega t}$ を左に出せます。Newton方程式へ代入し左から $R_{-\omega t}$ を掛けると、表示された回転系の式を得ます。

$\dot s_i=\ddot s_i=0$ を代入すると、静止条件は

$$
0=G\sum_{j\ne i}m_j\frac{b_j-b_i}{|b_j-b_i|^3}
+\omega^2b_i.
$$

これは正の係数 $\lambda=\omega^2$ を持つ中心配置の定義と一致します。逆向きも同じ代入で従います。
<!-- proof-end -->

正準変数では $p_i=m_i\dot q_i$ を使い、角運動量 $L_z=\sum_i(q_i\times p_i)_z$ に対して $H_\omega=H-\omega L_z$ が回転系での拡張Hamiltonianとなります。[相対平衡の臨界点判定](../../../幾何系/GMECH/GMECH8/index.md#thm-gmech8-relative-critical)の適用時、円回転の運動量は $p_i=m_i\omega Jb_i$ です。実際に

$$
\partial_{p_i}H_\omega=\frac{p_i}{m_i}-\omega Jb_i=0,
\qquad
\partial_{q_i}H_\omega=\partial_{q_i}V+\omega Jp_i
=m_i\omega^2b_i-m_i\omega^2b_i=0.
$$

ここで $\partial_{q_i}V=m_i\omega^2b_i$ は中心配置条件を書き直したものです。このように拡張Hamiltonianの臨界条件と、回転座標系の静止条件を実際に照合できます。

### 安定なのか

存在と安定性は異なります。例えば相似運動族の内部だけで $h\ne0$ を固定し、有効ポテンシャル

$$
W_h(r)=\frac{h^2}{2r^2}-\frac{\lambda}{r}
$$

を考えます。円運動条件 $h^2=\lambda r_0$ において

$$
W_h'(r_0)=0,\qquad
W_h''(r_0)=\frac{3h^2}{r_0^4}-\frac{2\lambda}{r_0^3}
=\frac{\lambda}{r_0^3}>0.
$$

よって**形を保つ動径摂動に限れば**有効ポテンシャルは極小です。しかし一般の三体摂動は三角形の辺の比や直線上の順序まで変えられます。これら形状方向を含む線形化の固有値や非線形効果を調べなければ、Lagrange型もEuler型も、三体全体で安定だとは言えません。次章の制限三体問題では、同様の回転系で平衡点の線形安定性を具体的に調べます。

## 7. 演習：特殊解を出発点から組み立てる

### Level A

<a id="ex-cele3-a01"></a>
**A1. 中心配置を直接検証する。** 等質量 $m>0$、$G>0$、$d>0$ に対し、$b_1=(-d,0),b_2=(0,0),b_3=(d,0)$ の重心、各重力加速度、共通係数 $\lambda$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 重心は $m(-d+0+d)/(3m)=0$ です。粒子1から見た他の粒子までの距離は $d,2d$ なので

$$
f_1=\left(\frac{Gm}{d^2}+\frac{Gm}{(2d)^2},0\right)
=\left(\frac{5Gm}{4d^2},0\right).
$$

粒子3の加速度は $f_3=-f_1$、粒子2の加速度は $Gm(-1/d^2+1/d^2)e_x=0$ です。$f_1=-\lambda b_1=\lambda d e_x$ に代入すれば $\lambda=5Gm/(4d^3)>0$。第2、第3粒子にも同じ係数が使えるので[中心配置の定義](#def-cele3-central-configuration)を満たします。
<!-- solution-end -->

<a id="ex-cele3-a02"></a>
**A2. 縮尺と角速度。** ある中心配置で $\lambda=8$ とする。配置を $2$ 倍に拡大したときの係数と、各配置をそのまま円回転させる角速度の絶対値を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [縮尺の命題](#prop-cele3-multiplier-scaling)へ $s=2$ を入れると $\lambda'=8/2^3=1$ です。各配置自身を固定位置 $r_0=1$ の円回転と考えると、角速度の二乗はそれぞれ $\omega^2=8$、$(\omega')^2=1$。ゆえに $|\omega|=2\sqrt2$、$|\omega'|=1$ となります。加速度の大きさだけではなく、半径の伸びも角速度へ効く点を確認します。
<!-- solution-end -->

<a id="ex-cele3-a03"></a>
**A3. 不等質量の正三角形。** $m_1=1,m_2=2,m_3=3$、$G>0$、頂点 $a_1=(0,0)$、$a_2=(2,0)$、$a_3=(1,\sqrt3)$ の重心、$\lambda$、第1粒子の加速度を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $|a_2-a_1|=2$、$|a_3-a_1|=\sqrt{1+3}=2$、$|a_3-a_2|=\sqrt{1+3}=2$ なので正三角形です。重心は

$$
c=\frac{a_1+2a_2+3a_3}{6}
=\left(\frac76,\frac{\sqrt3}2\right).
$$

[Lagrangeの正三角形中心配置](#prop-cele3-lagrange-equilateral)から $\lambda=G(1+2+3)/2^3=3G/4$。第1粒子の加速度を個別に計算すると

$$
f_1=G\left(\frac{2(2,0)}8+\frac{3(1,\sqrt3)}8\right)
=\left(\frac{7G}8,\frac{3\sqrt3G}8\right).
$$

一方 $-\lambda(a_1-c)=\frac{3G}{4}c$ は同じベクトルです。質量が異なっても成立することを確認できました。
<!-- solution-end -->

<a id="ex-cele3-a04"></a>
**A4. 回転系の加速度。** $q(t)=R_{\omega t}s(t)$、$\omega$ は定数として、$\dot q,\ddot q$ を $s,\dot s,\ddot s,J$ で表せ。また $s$ が定数の場合を代入せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $R'_{\omega t}=\omega JR_{\omega t}$ を用いて一回微分すると $\dot q=R_{\omega t}(\dot s+\omega Js)$。再び微分すれば

$$
\begin{aligned}
\ddot q
&=R_{\omega t}\{\omega J(\dot s+\omega Js)+\ddot s+\omega J\dot s\}\\
&=R_{\omega t}(\ddot s+2\omega J\dot s-\omega^2s).
\end{aligned}
$$

ここで $J^2=-\mathrm{Id}$ を使用しました。$\dot s=\ddot s=0$ なら $\ddot q=-\omega^2R_{\omega t}s=-\omega^2q$。回転系で静止していても慣性系では向心加速度があります。
<!-- solution-end -->

### Level B

<a id="ex-cele3-b01"></a>
**B1. Eulerの間隔比を選ぶ。** 質量 $m_1,m_2,m_3>0$ を $0,1,1+x$（$x>0$）の順に置く。加速度差の条件から五次方程式 $P(x)=0$ を導き、$P(x)/x^3$ が狭義増加することを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 粒子ごとの加速度は

$$
f_1=G\left(m_2+\frac{m_3}{(1+x)^2}\right),\quad
f_2=G\left(-m_1+\frac{m_3}{x^2}\right),\quad
f_3=-G\left(\frac{m_1}{(1+x)^2}+\frac{m_2}{x^2}\right).
$$

共通 $\lambda$ があるなら $f_2-f_1=-\lambda$、$f_3-f_2=-\lambda x$ なので $f_3-f_2-x(f_2-f_1)=0$。代入後 $x^2(1+x)^2/G$ を掛けて分母を消し、$x$ のべきでまとめると

$$
\begin{aligned}
P(x)={}&(m_1+m_2)x^5+(3m_1+2m_2)x^4+(3m_1+m_2)x^3\\
&-(m_2+3m_3)x^2-(2m_2+3m_3)x-(m_2+m_3)=0.
\end{aligned}
$$

$x>0$ で $F=P/x^3$ の導関数を各項で計算すると

$$
F'(x)=2(m_1+m_2)x+(3m_1+2m_2)
+\frac{m_2+3m_3}{x^2}
+\frac{2(2m_2+3m_3)}{x^3}
+\frac{3(m_2+m_3)}{x^4}>0.
$$

$F(0+)=-\infty,F(\infty)=\infty$ なので根は唯一です。これは[Eulerの定理](#thm-cele3-euler-collinear)の存在一意性の中心部分を、具体的に再計算したものです。
<!-- solution-end -->

<a id="ex-cele3-b02"></a>
**B2. 相似運動の方程式を再導出する。** $b$ は係数 $\lambda$ の中心配置とする。$q_i=rR_\theta b_i$ をNewton方程式へ代入して $h=r^2\dot\theta$ の保存と $\ddot r=h^2/r^3-\lambda/r^2$ を導け。

- Level: B

<!-- solution-start -->
**詳細解答。** $\dot R_\theta=\dot\theta JR_\theta$ なので

$$
\dot q_i=\dot rR_\theta b_i+r\dot\theta JR_\theta b_i,\quad
\ddot q_i=(\ddot r-r\dot\theta^2)R_\theta b_i
+(2\dot r\dot\theta+r\ddot\theta)JR_\theta b_i.
$$

重力側は距離が $r$ 倍になるため $-\lambda R_\theta b_i/r^2$。中心配置では少なくとも一つの $b_i\ne0$ であり、その粒子について $R_\theta b_i$ と $JR_\theta b_i$ は直交独立です。係数を比較して

$$
\ddot r-r\dot\theta^2=-\lambda/r^2,\qquad
2\dot r\dot\theta+r\ddot\theta=0.
$$

後式へ $r$ を掛けると $(r^2\dot\theta)'=0$、従って $h$ は一定です。$\dot\theta=h/r^2$ を前式へ代入すれば $\ddot r=h^2/r^3-\lambda/r^2$ を得ます。
<!-- solution-end -->

<a id="ex-cele3-b03"></a>
**B3. 相似運動の保存エネルギー。** 中心配置 $b$ の $I_0=\sum_i m_i|b_i|^2$、$U_0=G\sum_{i<j}m_im_j/|b_i-b_j|$ を用い、$q_i=rR_\theta b_i$ の全運動エネルギー、全エネルギー、全角運動量を求めよ。$U_0=\lambda I_0$ を利用せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\dot q_i=R_\theta(\dot r b_i+r\dot\theta Jb_i)$ です。$b_i\cdot Jb_i=0$ であり回転はノルムを保つので

$$
|\dot q_i|^2=\dot r^2|b_i|^2+r^2\dot\theta^2|b_i|^2.
$$

従って $T=\frac12I_0(\dot r^2+r^2\dot\theta^2)$。距離が $r$ 倍になるので重力の位置エネルギーは $V=-U_0/r=-\lambda I_0/r$。$h=r^2\dot\theta$ とすると

$$
H=T+V=I_0\left(\frac12\dot r^2+\frac{h^2}{2r^2}-\frac{\lambda}{r}\right).
$$

平面角運動量は

$$
L_z=\sum_i m_i(q_i\times\dot q_i)_z
=\sum_i m_i r^2\dot\theta(b_i\times Jb_i)_z
=I_0r^2\dot\theta=I_0h,
$$

ここで $(b_i\times Jb_i)_z=|b_i|^2$ を用いました。
<!-- solution-end -->

<a id="ex-cele3-b04"></a>
**B4. 円運動の動径変位。** $r''=h^2/r^3-\lambda/r^2$、$\lambda>0$、$h\ne0$ の系で円運動半径 $r_0$ を求め、$W_h''(r_0)$ の符号を判定せよ。これだけで三体解の全摂動に対する安定性を証明できるか。

- Level: B

<!-- solution-start -->
**詳細解答。** 半径一定の条件は $h^2/r_0^3-\lambda/r_0^2=0$ です。$r_0>0$ より $r_0=h^2/\lambda$。有効ポテンシャル $W_h=h^2/(2r^2)-\lambda/r$ を微分すると

$$
W_h'(r)=-\frac{h^2}{r^3}+\frac{\lambda}{r^2},
\quad
W_h''(r)=\frac{3h^2}{r^4}-\frac{2\lambda}{r^3}.
$$

$h^2=\lambda r_0$ を代入して $W_h''(r_0)=\lambda/r_0^3>0$ です。これは固定形状の動径変位に対する極小性であり、一般の摂動は中心配置から外れて形を変え得ます。したがって全三体相空間での安定性は、この計算だけでは証明できません。
<!-- solution-end -->

### Level C

<a id="ex-cele3-c01"></a>
**C1. 不等質量Lagrange解を完全に検算する。** $G>0$、$m_1=1,m_2=2,m_3=3$、$a_1=(0,0)$、$a_2=(2,0)$、$a_3=(1,\sqrt3)$ とし、$b_i=a_i-c$（$c$ は重心）を基準形とする。(i) $I_0,U_0,\lambda$、(ii) $q_i(t)=R_{\omega t}b_i$ が三体解となる $|\omega|$、(iii) 全エネルギー $H$ と角運動量 $L_z$（$\omega>0$）、(iv) 形状を保った動径方向での極小性を、途中式とともに求めよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) 辺長はすべて $d=2$、総質量は $M=6$ です。重心は $c=(7/6,\sqrt3/2)$。重心系の慣性モーメントは、$\sum_i m_i b_i=0$ を使う恒等式

$$
M\sum_i m_i|b_i|^2=\sum_{i<j}m_im_j|b_i-b_j|^2
$$

で計算できます。右辺は $4(m_1m_2+m_1m_3+m_2m_3)=4(2+3+6)=44$ なので

$$
I_0=\frac{44}{6}=\frac{22}3,\qquad
U_0=G\frac{2+3+6}{2}=\frac{11G}{2}.
$$

従って[中心配置の係数](#prop-cele3-multiplier-scaling)は

$$
\lambda=\frac{U_0}{I_0}
=\frac{11G/2}{22/3}=\frac{3G}{4}.
$$

(ii) 回転半径倍率 $r=1$ の円運動条件は $\omega^2=\lambda$。ゆえに $\omega=\pm\sqrt{3G/4}$ です。[相似運動の定理](#thm-cele3-homographic-reduction)で $r=1,\theta=\omega t$ を代入すれば $\ddot r-r\omega^2=-\lambda$ かつ $(r^2\dot\theta)'=0$ が成り立つので、実際に三体方程式の解です。

(iii) 正向き $\omega=\sqrt{3G/4}$ のとき、$|\dot q_i|^2=\omega^2|b_i|^2$ より

$$
T=\frac12I_0\omega^2
=\frac12\frac{22}3\frac{3G}4=\frac{11G}4,\qquad
V=-U_0=-\frac{11G}2.
$$

したがって

$$
H=T+V=-\frac{11G}4,\qquad
L_z=I_0\omega=\frac{22}3\sqrt{\frac{3G}4}.
$$

(iv) この円解では $h=r^2\dot\theta=\omega$、$h^2=\lambda$ です。[動径の有効ポテンシャル](#thm-cele3-homographic-reduction)について

$$
W_h''(1)=3h^2-2\lambda
=3\lambda-2\lambda
=\frac{3G}4>0.
$$

動径だけを変える摂動に対しては局所極小ですが、三角形の形を歪める摂動は調べていません。従ってこの結論を三体全体の安定性へ拡張してはいけません。
<!-- solution-end -->

## 8. 次の問題：小さい第三天体を加えた回転系

ここまでEuler型・Lagrange型の特殊解は、中心配置から決まる相対平衡であると分かりました。全質量が有限の三体は互いに動かし合います。次章では第三天体の質量を無視できる極限を取り、残り二天体の円運動を固定して考えます。回転座標系の平衡点、Jacobi積分、通行可能領域を、今回作った向心力と回転系の式から導きます。
