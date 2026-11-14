# FLUID16 管路・円筒間の定常層流をどう解くか

前講までの理想流では壁に沿った速度を指定しなかった。一方、実在の粘性流体は壁面で接線方向にも速度を合わせる。[CTM16の平板 Couette 流](../../CTM/CTM16/index.md#thm-ctm16-couette-profile)と[CTM17の平板 Poiseuille 流](../../CTM/CTM17/index.md#thm-ctm17-plane-poiseuille)では、その条件から速度分布が決まった。本講は壁を曲げて円管や二重円筒にしたとき、同じ運動方程式に現れる**曲率の項**が結果をどう変えるかを追う。

## 0. 模型と円筒座標の意味

長い直円管の軸を $z$ 軸とし、軸からの距離 $r=\sqrt{x^2+y^2}$、軸の周りの角度 $\theta$ を用いる。円筒座標の単位ベクトルは $e_r=(\cos\theta,\sin\theta,0)$、$e_\theta=(-\sin\theta,\cos\theta,0)$、$e_z=(0,0,1)$ である。$r>0$ で $\partial_\theta e_r=e_\theta$、$\partial_\theta e_\theta=-e_r$ となる。円管断面の面積要素は、幅 $dr$ の薄い円環の面積を考えると $dA=r\,dr\,d\theta$ である。

一定密度 $\rho>0$、一定の動的粘性係数 $\eta>0$ の非圧縮 Newton 流体を、体積力なしで考える。速度 $v$ は空間 $C^2$、圧力 $p$ は空間 $C^1$ とし、壁まで速度が連続とする。既習の[非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)と[Newton 応力](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)は

$$
\rho\{\partial_t v+(v\cdot\nabla)v\}
=-\nabla p+\eta\Delta v,\qquad
\nabla\cdot v=0,\qquad
\sigma=-pI+2\eta D,\quad D=\frac{\nabla v+(\nabla v)^\mathsf{T}}{2}.
$$

壁面では[無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip) $v=V_{\mathrm{wall}}$ を課す。この条件は、前講の理想流における法線成分だけの非貫通条件より強い。以下の「定常」「軸対称」「完全発達」は速度場の**解の形に対する仮定**であり、有限長の入口・出口の発達流まで自動的に記述するわけではない。

粘性係数の単位は Pa s、$[p]=\mathrm{Pa}$、$[v]=\mathrm{m/s}$、$[Q]=\mathrm{m^3/s}$ である。圧力差 $\Delta p=p(0)-p(L)>0$ は長さ $L>0$ にわたる圧力降下、$G=\Delta p/L>0$ は単位長さ当たりの圧力降下（Pa/m）とする。

## 1. 円管ではなぜ放物線が出るか

静止した半径 $R>0$ の円管の十分下流を切り取り、速度が軸方向のみに向き、断面内で半径だけに依存すると仮定する。$v=w(r)e_z$ と置くと、流体粒子は同じ $r$ を保って軸に平行に進む。従って $\partial_t v=0$、$(v\cdot\nabla)v=w\partial_zv=0$、$\nabla\cdot v=\partial_z w=0$。慣性項が零なのは Reynolds 数が小さいからではなく、**この速度場の形そのもの**による。

<a id="def-fluid16-pipe-flow"></a>

<!-- formal-statement-start -->
> **定義（定常・完全発達した円管一方向流）**  
> 半径 $R>0$ の固定円管の内部で、$w\in C^2((0,R))\cap C([0,R])$ を用いて $v=w(r)e_z$ と書け、時間・$z$・$\theta$ に依存しない速度場を、定常・完全発達した円管一方向流という。軸 $r=0$ では $w$ が有界で滑らかな三次元速度場へ延長できるとし、固定壁で無滑り条件 $w(R)=0$ を課す。
<!-- formal-statement-end -->

定義を満たす候補として $w(r)=c(R^2-r^2)$（$c>0$）を選べる。実際に $w(R)=0$、$w(0)=cR^2$ は有限、$w'(0)=0$ なので軸を横切って滑らかである。さらに $\partial_z w=0$ より非圧縮でもある。ただし**圧力との運動量釣合**はまだ検証していない。

<!-- definition-example-start: def-fluid16-pipe-flow -->
**定義の確認**：$w(r)=c(R^2-r^2)$ は $r^2=x^2+y^2$ を用いると $c(R^2-x^2-y^2)$ であり、$x,y,z$ の滑らかな関数として軸に延長できる。境界 $x^2+y^2=R^2$ では全速度が零、内側では軸方向のみ、$\partial_t v=\partial_zv=0$ であり、定義の滑らかさ・完全発達・無滑りを全て満たす。
<!-- definition-example-end -->

曲率の効果を見るため、半径だけに依存するスカラー関数 $w(r)$ のラプラシアンを確認する。$\partial_xr=x/r$、$\partial_yr=y/r$ より

$$
\partial_xw=w'\frac{x}{r},\quad
\partial_x^2w=w''\frac{x^2}{r^2}
+w'\left(\frac1r-\frac{x^2}{r^3}\right).
$$

$y$ についても同様に足すと

$$
\Delta w=w''+\frac1r w'=\frac1r(rw')'.
$$

ここで $e_z$ は位置によらないので $\Delta(w e_z)=(\Delta w)e_z$ である。円管では平板の $w''$ に加えて $w'/r$ が現れる。

<a id="thm-fluid16-pipe-profile"></a>

<!-- formal-statement-start -->
> **定理（円管 Hagen–Poiseuille 流と解クラス内の一意性）**  
> $R,L,\rho,\eta,\Delta p>0$ とする。半径 $R$ の静止円管内で、体積力なしの一定密度・一定粘性係数の非圧縮 Newton 流体が[定常・完全発達した円管一方向流](#def-fluid16-pipe-flow)をなし、$p(0)-p(L)=\Delta p$ とする。この解の形の下では、Navier–Stokes 方程式と壁の無滑り条件を満たす速度と圧力は、圧力の加法定数を除いて一意に

$$
w(r)=\frac{G}{4\eta}(R^2-r^2),\qquad
p(z)=p(0)-Gz,\qquad G=\frac{\Delta p}{L}
$$

> となる。速度は軸で最大、壁で零である。
<!-- formal-statement-end -->

### 証明の見取り図

円筒形に沿った流れでは移流項は正確に零となる。軸方向の式に $r^{-1}(rw')'$ を入れ、二回積分する。**軸上の正則性**と壁での無滑りが、それぞれ積分定数を決める。

<!-- proof-start -->
### 証明

$r>0$ で定常方程式へ $v=w(r)e_z$ を代入すると、$e_r,e_\theta$ 成分から $\partial_r p=0$、$\partial_\theta p=0$、$e_z$ 成分から

$$
0=-\partial_z p+\eta\frac1r(rw')'.
$$

左辺の圧力微分は $z$ のみ、右辺の粘性項は $r$ のみの関数である。任意の $r,z$ で等しいので共通の定数とならなければならない。入口出口条件より $\partial_zp=-G$、従って

$$
(rw')'=-\frac{G}{\eta}r,\qquad
rw'=-\frac{G}{2\eta}r^2+C_1.
$$

もし $C_1\neq0$ なら $w'=-Gr/(2\eta)+C_1/r$、従って $w=-Gr^2/(4\eta)+C_1\log r+C_0$ となり $r\downarrow0$ で発散する。軸上で有界という仮定に反するので $C_1=0$。次に $w(R)=0$ から $C_0=GR^2/(4\eta)$。得られた $w$ は $r^2=x^2+y^2$ の多項式で軸まで滑らかで、連続の式も満たす。

二つの積分定数は以上の条件で尽くされたので、この指定した形の解は一意である。定常 Navier–Stokes 方程式の任意の三次元解について一意だとは主張していない。
<!-- proof-end -->

**軸の条件が必要な理由**：軸を取り除いた中空管なら $\log r$ 項は必ずしも除けない。円管の中心で $w(0)$ が有限という物理条件が、二回積分後の自由度を一つ消している。

## 2. 流量、壁面せん断力と半径の四乗則

円管の断面を通る体積流量は、既習の[体積流量の考え方](../../CTM/CTM17/index.md#def-ctm17-volume-flux)を円形断面へ拡張し、速度の面積積分として求める。半径 $r$、幅 $dr$ の円環面積は $2\pi r\,dr$ だから

$$
Q=\int_{A}v\cdot e_z\,dA
=2\pi\int_0^R w(r)r\,dr.
$$

<a id="thm-fluid16-pipe-flux"></a>

<!-- formal-statement-start -->
> **定理（円管流の流量・平均速度・壁のせん断力）**  
> [円管 Hagen–Poiseuille 流](#thm-fluid16-pipe-profile)について、体積流量、断面平均速度、軸上の最大速度はそれぞれ

$$
Q=\frac{\pi GR^4}{8\eta}
=\frac{\pi R^4\Delta p}{8\eta L},\qquad
\bar w=\frac{GR^2}{8\eta},\qquad
w_{\max}=2\bar w.
$$

> 流体の円管壁に向かう法線を $n=e_r$ とすると、壁が流体へ及ぼす軸方向の表面力密度は $t_z=-GR/2$ であり、圧力降下による軸方向の力と釣り合う。
<!-- formal-statement-end -->

### 証明の見取り図

速度は放物線だが断面の面積要素には $r$ が入るので、平板の係数とは異なる。壁の力には[Newton 応力](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)と[表面力の公式](../../CTM/CTM6/index.md#thm-ctm6-cauchy-stress)を適用する。

<!-- proof-start -->
### 証明

[速度分布](#thm-fluid16-pipe-profile)を面積積分に代入し、

$$
\begin{aligned}
Q&=\frac{\pi G}{2\eta}\int_0^R(R^2r-r^3)\,dr\\
&=\frac{\pi G}{2\eta}
\left[\frac{R^2r^2}{2}-\frac{r^4}{4}\right]_0^R
=\frac{\pi GR^4}{8\eta}.
\end{aligned}
$$

面積 $\pi R^2$ で割れば $\bar w=GR^2/(8\eta)$。$w'(r)=-Gr/(2\eta)\le0$ なので最大は $r=0$ にあり、$w(0)=GR^2/(4\eta)=2\bar w$ である。

せん断応力を求めるには $e_r$ 方向への速度変化を用いる。$v=w(r)e_z$ なので、$D_{zr}=D_{rz}=w'(r)/2$、$\sigma_{zr}=\eta w'=-Gr/2$。壁で流体領域の外向き法線 $n=e_r$ に対し[traction](../../CTM/CTM6/index.md#def-ctm6-traction)の軸成分は

$$
t_z=(\sigma n)\cdot e_z=\sigma_{zr}(R)=-\frac{GR}{2}.
$$

長さ $L$ の円筒側面積は $2\pi RL$ だから、壁面力は $F_{\mathrm{wall},z}=(-GR/2)(2\pi RL)=-G\pi R^2L$。入口と出口の圧力差による合力は $\Delta p\,\pi R^2=G\pi R^2L$。よって両者は正確に打ち消し合う。
<!-- proof-end -->

同じ圧力勾配 $G$、同じ粘性係数 $\eta$ なら**半径を二倍にすると流量は十六倍**になる。これは管径の四乗の経験的暗記ではなく、面積の $R^2$ と特徴速度の $R^2$ を掛けた結果である。ただしこの比較は、どちらの管でも完全発達した層流模型が妥当である場合に限る。

**数値例**：$\eta=10^{-3}\,\mathrm{Pa\,s}$、$R=2.0\times10^{-3}\,\mathrm m$、$L=1.0\,\mathrm m$、$\Delta p=100\,\mathrm{Pa}$ とする。$G=100\,\mathrm{Pa/m}$ だから

$$
\begin{aligned}
Q&=\frac{\pi\cdot100\cdot(2.0\times10^{-3})^4}{8\times10^{-3}}
=2.0\pi\times10^{-7}\ \mathrm{m^3/s}
\approx0.628\ \mathrm{mL/s},\\
\bar w&=\frac{100(2.0\times10^{-3})^2}{8\times10^{-3}}
=0.050\ \mathrm{m/s},\qquad w_{\max}=0.100\ \mathrm{m/s},\\
t_z&=-\frac{100(2.0\times10^{-3})}{2}=-0.100\ \mathrm{Pa}.
\end{aligned}
$$

密度が $1000\,\mathrm{kg/m^3}$ なら直径 $2R$、平均速度 $\bar w$ を代表尺度とした[Reynolds 数](../../CTM/CTM16/index.md#def-ctm16-reynolds)は $\rho\bar w(2R)/\eta=200$ となる。ただし Reynolds 数だけで入口長さや境界の乱れを検査せず、任意の装置にこの厳密分布を当てはめてよいわけではない。

## 3. 圧力の仕事が粘性散逸に変わる

定常で速度場が変わらないからといって、壁の摩擦が仕事をしないわけではない。圧力源は流体に単位時間当たり $\Delta p\,Q$ の仕事を供給し、その分だけ粘性応力がエネルギーを散逸させる。既習の[粘性散逸式](../../CTM/CTM15/index.md#thm-ctm15-viscous-dissipation)では体積当たり $2\eta D:D$ が散逸率である。

<a id="prop-fluid16-pipe-energy"></a>

<!-- formal-statement-start -->
> **命題（円管の圧力仕事と粘性散逸）**  
> [円管 Hagen–Poiseuille 流](#thm-fluid16-pipe-profile)の長さ $L$ の区間において、入口出口の速度分布が同一であれば、圧力が供給する仕事率と体積の粘性散逸率は

$$
\Delta p\,Q
=\int_0^L\int_A2\eta D:D\,dA\,dz
=\frac{\pi G^2R^4L}{8\eta}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

速度勾配の独立な非零成分は半径方向と軸方向の混合二成分だけなので、$2D:D=(w')^2$ に簡約できる。これを円環ごとに積分すれば圧力仕事と一致する。

<!-- proof-start -->
### 証明

$D_{rz}=D_{zr}=w'/2$ 以外の $D$ の成分は零だから $D:D=2(w'/2)^2=(w')^2/2$。ゆえに

$$
\begin{aligned}
\int_0^L\int_A2\eta D:D\,dA\,dz
&=2\pi L\eta\int_0^R(w')^2r\,dr\\
&=\frac{2\pi L G^2}{4\eta}\int_0^R r^3\,dr
=\frac{\pi L G^2R^4}{8\eta}.
\end{aligned}
$$

一方、[流量公式](#thm-fluid16-pipe-flux)と $\Delta p=GL$ により $\Delta p\,Q=GL\cdot\pi GR^4/(8\eta)$ で同じ値となる。単位は $\mathrm{Pa}\,\mathrm{m^3/s}=\mathrm W$ である。
<!-- proof-end -->

## 4. 同心円筒では「回転する壁」が流れを作る

今度は半径 $0<a<b$ の同心円筒二枚の間に流体を満たし、内壁・外壁をそれぞれ一定角速度 $\Omega_i,\Omega_o$（単位 s$^{-1}$）で回す。軸方向の圧力差はなく、速度が円周方向のみの $v=w(r)e_\theta$ で定常・軸対称、$z$ にも依存しない形を考える。$r=a,b$ では[無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip)により $w(a)=a\Omega_i$、$w(b)=b\Omega_o$ となる。これは速度が円周方向なので、角速度と接線速度を **半径で変換**する点が重要である。

<a id="def-fluid16-cylindrical-couette"></a>

<!-- formal-statement-start -->
> **定義（同心円筒 Couette 流の解クラス）**  
> $0<a<b$ の円筒間領域 $a<r<b$ において、速度が $v=w(r)e_\theta$、$w\in C^2((a,b))\cap C([a,b])$ と表され、定常・軸対称・軸方向一様で、内外壁速度を $a\Omega_i e_\theta$、$b\Omega_o e_\theta$ とする流れのクラスを同心円筒 Couette 流の解クラスとする。流体の密度と粘性係数は一定正値とし、体積力はない。
<!-- formal-statement-end -->

例えば両壁が同じ角速度 $\Omega$ で回るとき $w(r)=\Omega r$ を選ぶと、$w(a)=a\Omega$、$w(b)=b\Omega$、速度は $v=\Omega(-y,x,0)$ だから滑らかであり、$\nabla\cdot v=0$ も成立する。これは剛体とともに回る流れである。ただし運動量方程式に必要な径方向圧力は後に求める。

<!-- definition-example-start: def-fluid16-cylindrical-couette -->
**定義の確認**：$w=\Omega r$ は $C^2$、時間・$\theta$・$z$ に依存せず、二つの壁の速度と一致する。直交成分 $v_x=-\Omega y$、$v_y=\Omega x$ に対して $\nabla\cdot v=\partial_x(-\Omega y)+\partial_y(\Omega x)=0$。この直接例は境界条件と非圧縮性を満たすが、圧力を指定するまでは全方程式の解だとは主張しない。
<!-- definition-example-end -->

円周方向の単位ベクトルは角度とともに向きが変わる。ここが平板 Couette 流との決定的な違いである。具体的には

$$
(v\cdot\nabla)v=\frac{w}{r}\partial_\theta(w e_\theta)
=-\frac{w^2}{r}e_r.
$$

一方、ベクトルラプラシアンでは $e_\theta$ 自身の角度微分が寄与する。$w$ は $\theta$ に依存しないが $\partial_\theta^2e_\theta=-e_\theta$ だから

$$
\Delta(w e_\theta)
=\left(w''+\frac{w'}r-\frac{w}{r^2}\right)e_\theta.
$$

すなわち移流は**径方向の向心加速度**を残し、粘性は $-w/r^2$ を加える。

<a id="thm-fluid16-couette-profile"></a>

<!-- formal-statement-start -->
> **定理（同心円筒 Couette 流の速度と径方向圧力）**  
> [同心円筒 Couette 流の解クラス](#def-fluid16-cylindrical-couette)において $0<a<b$、$\rho,\eta>0$、$\Omega_i,\Omega_o\in\mathbb R$ とする。非圧縮 Navier–Stokes 方程式の速度解はこのクラス内で一意に

$$
w(r)=Ar+\frac Br,\qquad
A=\frac{b^2\Omega_o-a^2\Omega_i}{b^2-a^2},\qquad
B=\frac{a^2b^2(\Omega_i-\Omega_o)}{b^2-a^2}
$$

> で与えられる。圧力は定数 $p(a)$ を除いて一意であり、$\partial_zp=\partial_\theta p=0$ と

$$
\frac{dp}{dr}=\rho\frac{w(r)^2}{r}
$$

> を満たす。回転による径方向の圧力勾配を零とは置けない。
<!-- formal-statement-end -->

### 証明の見取り図

円周方向の成分は移流項を持たないので、二階の常微分方程式を解いて壁の速度を代入する。径方向の成分は向心加速度と圧力の釣合であり、速度を求めた後に圧力を積分する。両方を満たして初めて Navier–Stokes 方程式の解となる。

<!-- proof-start -->
### 証明

円周方向では圧力の角度微分が零（軸対称の条件）なので

$$
w''+\frac{w'}r-\frac{w}{r^2}=0.
$$

$w=r^k$ と試すと $[k(k-1)+k-1]r^{k-2}=(k^2-1)r^{k-2}$ より $k=1,-1$。線形二階常微分方程式の二つの独立解なので、一般解は $w=Ar+B/r$ である。壁条件を代入すると

$$
Aa+\frac Ba=a\Omega_i,\qquad
Ab+\frac Bb=b\Omega_o.
$$

各式を半径で割れば $A+B/a^2=\Omega_i$、$A+B/b^2=\Omega_o$。差を取ると

$$
B\left(\frac1{a^2}-\frac1{b^2}\right)=\Omega_i-\Omega_o.
$$

$a<b$ より左辺の係数は正なので $B=a^2b^2(\Omega_i-\Omega_o)/(b^2-a^2)$。これを $A=\Omega_o-B/b^2$ に代入すると記載した $A$ を得る。$\nabla\cdot(w e_\theta)=0$ も成り立つ。

径方向の成分は $\rho(-w^2/r)=-dp/dr$ だから $dp/dr=\rho w^2/r$。軸方向の式は $dp/dz=0$。$a>0$ なので $B/r$ は全領域で滑らかである。壁条件で $A,B$ が一意に決まったため速度も一意であり、圧力は積分定数の分だけ不定である。
<!-- proof-end -->

内外壁が同時に同じ速さで回る場合は $\Omega_i=\Omega_o=\Omega$ だから $B=0$、$A=\Omega$ となる。すると $w=\Omega r$ だが、径方向圧力は $dp/dr=\rho\Omega^2r$ であり、圧力は外ほど高くなる。速度にせん断がなくても向心加速度は消えない。

<a id="prop-fluid16-couette-pressure"></a>

<!-- formal-statement-start -->
> **命題（同心円筒の圧力分布）**  
> [同心円筒 Couette 流](#thm-fluid16-couette-profile)において、$a\le r\le b$ での圧力差は

$$
p(r)-p(a)=\rho\left[
\frac{A^2}{2}(r^2-a^2)
+2AB\log\frac ra
+\frac{B^2}{2}\left(\frac1{a^2}-\frac1{r^2}\right)
\right].
$$

> 従って $dp/dr=\rho w^2/r\ge0$ であり、外壁側の圧力は内壁側より低くならない。
<!-- formal-statement-end -->

### 証明の見取り図

速度を二乗して $r$ で割るだけでは積分は終わらない。$A^2r$、$2AB/r$、$B^2/r^3$ を別々に積分して、対数項の次元が正しいことも確認する。

<!-- proof-start -->
### 証明

[径方向の運動量式](#thm-fluid16-couette-profile)に $w=Ar+B/r$ を代入すると

$$
\frac1\rho\frac{dp}{dr}
=\frac{(Ar+B/r)^2}{r}
=A^2r+\frac{2AB}{r}+\frac{B^2}{r^3}.
$$

$a$ から $r$ まで積分して

$$
\begin{aligned}
\frac{p(r)-p(a)}{\rho}
&=\left[\frac{A^2s^2}{2}+2AB\log s-\frac{B^2}{2s^2}\right]_{s=a}^{s=r}\\
&=\frac{A^2}{2}(r^2-a^2)+2AB\log(r/a)
+\frac{B^2}{2}(a^{-2}-r^{-2}).
\end{aligned}
$$

$\log(r/a)$ は無次元の比を取っている。右辺は $[\mathrm{m^2/s^2}]$ で、$\rho$ を掛けると圧力の単位になる。
<!-- proof-end -->

## 5. 円筒壁のトルクはどこへ伝わるか

円筒間の速度勾配に対して、せん断応力は単純な $\eta w'$ ではない。円周方向の単位ベクトルが回転するため、Newton 応力の $r\theta$ 成分は

$$
\sigma_{r\theta}=\eta\left(w'-\frac wr\right).
$$

この式は、$\partial_r(we_\theta)=w'e_\theta$、一方で単位円周方向へ $\theta$ を変えたとき $\partial_\theta(we_\theta)=-we_r$ となることを、[変形速度テンソル](../../CTM/CTM4/index.md#def-ctm4-rate-of-deformation-spin)の対称和に代入して得る。従って回転剛体流 $w=\Omega r$ は $w'-w/r=0$ でせん断を生じない。

<a id="thm-fluid16-couette-torque"></a>

<!-- formal-statement-start -->
> **定理（同心円筒 Couette 流のせん断応力・トルク・散逸）**  
> [同心円筒 Couette 流](#thm-fluid16-couette-profile)の長さ $L>0$ の区間（端面の影響を無視する）では

$$
\sigma_{r\theta}(r)=-\frac{2\eta B}{r^2}.
$$

> 壁が流体へ及ぼす $z$ 軸まわりのトルクは内壁 $T_i=4\pi\eta BL$、外壁 $T_o=-4\pi\eta BL$ である。外部の二つの回転駆動源が流体に供給する仕事率は

$$
T_i\Omega_i+T_o\Omega_o
=4\pi\eta BL(\Omega_i-\Omega_o)
=4\pi\eta L B^2\left(\frac1{a^2}-\frac1{b^2}\right)\ge0.
$$

> この値は流体内部の粘性散逸率 $\int 2\eta D:D\,dV$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

内壁で**流体領域の外向き法線は $-e_r$**、外壁では $+e_r$。この法線の符号を入れて円周方向の力を計算し、腕の長さ $r$ を掛けてトルクに直す。散逸は $r$ にわたる $r^{-4}$ の積分で独立に検算する。

<!-- proof-start -->
### 証明

[速度式](#thm-fluid16-couette-profile)を微分すると $w'=A-B/r^2$、$w/r=A+B/r^2$ であり、$\sigma_{r\theta}=\eta(w'-w/r)=-2\eta B/r^2$。

内壁で $n=-e_r$ を採用すると壁が流体に及ぼす円周方向の traction は $-\sigma_{r\theta}(a)=2\eta B/a^2$。側面積 $2\pi a L$ に掛けた力に腕の長さ $a$ を掛けて

$$
T_i=a\left(\frac{2\eta B}{a^2}\right)(2\pi a L)
=4\pi\eta BL.
$$

外壁で $n=+e_r$ だから traction は $\sigma_{r\theta}(b)=-2\eta B/b^2$、従って $T_o=-4\pi\eta BL$。トルクの釣合 $T_i+T_o=0$ が確認できる。

仕事率は $T_i\Omega_i+T_o\Omega_o=4\pi\eta BL(\Omega_i-\Omega_o)$。[境界条件から得た式](#thm-fluid16-couette-profile)で $\Omega_i-\Omega_o=B(a^{-2}-b^{-2})$ だから非負である。せん断の独立成分は $D_{r\theta}=D_{\theta r}=-B/r^2$ であり、

$$
\begin{aligned}
\int 2\eta D:D\,dV
&=2\pi L\int_a^b\eta\left(w'-\frac wr\right)^2r\,dr\\
&=8\pi\eta LB^2\int_a^b r^{-3}\,dr\\
&=4\pi\eta LB^2(a^{-2}-b^{-2}).
\end{aligned}
$$

これは壁の仕事率と一致する。$[B]=\mathrm{m^2/s}$ なので $[\eta BL]=\mathrm{N\,m}$、トルクの単位も正しい。
<!-- proof-end -->

**反例として覚えるべき点**：$\Omega_i=\Omega_o$ なら $B=0$、全せん断力・トルク・散逸は零だが、[圧力式](#prop-fluid16-couette-pressure)は $p(r)-p(a)=\rho\Omega^2(r^2-a^2)/2$ で一般に零ではない。**圧力勾配と粘性せん断は異なる機構**である。

## 6. 二つの解を比較し、限界を押さえる

円管 Poiseuille 流は**固定壁と軸方向圧力差**で駆動され、円管中心の滑らかさが対数項を消した。同心円筒 Couette 流は**動く二つの円筒壁**で駆動され、$a>0$ のため $B/r$ 項を許す。円管での $r^{-1}(rw')'$ と円筒回転での $w''+w'/r-w/r^2$ は、ベクトル方向の違いに由来する。

狭い隙間 $d=b-a$ に対し $d/a\ll1$ で、内外の接線速度 $U_i=a\Omega_i$、$U_o=b\Omega_o$ を一定に保つ場合は、曲率を無視すると速度はほぼ壁間の線形補間となる。厳密式を $r=a+y$、$0\le y\le d$ に代入し、$r^2$ が $a^2+2ay$ に近いことを使うと、$w$ が $U_i+(U_o-U_i)y/d$ に近づく。[平板 Couette 流](../../CTM/CTM16/index.md#thm-ctm16-couette-profile)との接続である。

本講の二つの解は、指定した速度形状の下で移流を全て捨てた**近似解ではなく定常 Navier–Stokes 式の厳密解**である。ただし実際にこの速度形が生じ続けるかは別問題である。入口発達、粗い壁、回転円筒の遠心不安定性、乱流化、端部の影響などはここで証明していない。厳密解の存在と、その実験的な安定性を同一視しない。

## 7. 演習

断りがなければ体積力なし、$\rho,\eta>0$ は一定、流体は非圧縮 Newton 流体で、壁には無滑りを課す。円管では $v=w(r)e_z$、同心円筒では $v=w(r)e_\theta$ の定常・完全発達した解クラス内に限る。

### Level A

### A1. 軸における正則性

円管 $0\le r\le R$ で $w''+w'/r=-G/\eta$（$r>0$）を二回積分せよ。$w$ が軸で有界、$w(R)=0$ から積分定数を決定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

両辺に $r$ を掛けると $(rw')'=-Gr/\eta$。積分で $rw'=-Gr^2/(2\eta)+C_1$、$w'=-Gr/(2\eta)+C_1/r$。もう一度積分すると $w=-Gr^2/(4\eta)+C_1\log r+C_0$。$r\downarrow0$ で $\log r\to-\infty$ なので有界性より $C_1=0$。$w(R)=0$ から $C_0=GR^2/(4\eta)$。従って $w=G(R^2-r^2)/(4\eta)$、かつ $w'(0)=0$ で軸上も滑らかである。
<!-- solution-end -->

### A2. 円管の平均速度

円管の速度 $w=G(R^2-r^2)/(4\eta)$ が与えられた。体積流量 $Q$ と $\bar w=Q/(\pi R^2)$ を求め、最大速度との比を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

面積要素は $dA=r\,dr\,d\theta$ なので $Q=2\pi\int_0^Rw(r)r\,dr$。代入すると

$$
Q=\frac{\pi G}{2\eta}\int_0^R(R^2r-r^3)\,dr
=\frac{\pi G}{2\eta}\left(\frac{R^4}{2}-\frac{R^4}{4}\right)
=\frac{\pi GR^4}{8\eta}.
$$

よって $\bar w=GR^2/(8\eta)$。$w'(r)=-Gr/(2\eta)\le0$ だから最大は $r=0$ の $GR^2/(4\eta)$ で、$w_{\max}/\bar w=2$ である。
<!-- solution-end -->

### A3. 円筒壁の速度は角速度ではない

$a=1\,\mathrm{cm}$、$b=2\,\mathrm{cm}$、$\Omega_i=10\,\mathrm{s^{-1}}$、$\Omega_o=0$ とする。$w=Ar+B/r$ の $A,B$ を求め、二つの壁速度と一致することを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$m$ 単位で $a=0.01$、$b=0.02$ である。[速度の係数式](#thm-fluid16-couette-profile)より

$$
A=\frac{0-(0.01)^2\cdot10}{(0.02)^2-(0.01)^2}
=-\frac{10}{3}\ \mathrm{s^{-1}},
\quad
B=\frac{(0.01)^2(0.02)^2\cdot10}{(0.02)^2-(0.01)^2}
=\frac1{750}\ \mathrm{m^2/s}.
$$

内壁では $w(a)=(-10/3)(0.01)+(1/750)/0.01=-1/30+2/15=0.10\,\mathrm{m/s}=a\Omega_i$。外壁では $w(b)=-1/15+(1/750)/0.02=-1/15+1/15=0=b\Omega_o$。半径を掛けずに $w(a)=\Omega_i$ としてはいけない。
<!-- solution-end -->

### A4. 剛体回転と圧力

$\Omega_i=\Omega_o=\Omega$ とするとき、$w(r)$、$\sigma_{r\theta}$、$p(r)-p(a)$ を求めよ。$\Omega\ne0$ の場合、圧力は一定か。

- Level: A

<!-- solution-start -->
#### 詳細解答

壁条件の差から $B(a^{-2}-b^{-2})=\Omega_i-\Omega_o=0$、$a<b$ より $B=0$。従って $A=\Omega$、$w=\Omega r$。$w'-w/r=\Omega-\Omega=0$ なので $\sigma_{r\theta}=0$。ただし径方向は $dp/dr=\rho w^2/r=\rho\Omega^2r$ だから

$$
p(r)-p(a)=\rho\Omega^2\int_a^r s\,ds
=\frac{\rho\Omega^2}{2}(r^2-a^2).
$$

$\Omega\ne0$ で $r>a$ なら正であり、せん断応力が零でも圧力は一定ではない。
<!-- solution-end -->

### Level B

### B1. 圧力・壁面力・仕事率の三重検算

円管の長さ $L$ で圧力勾配 $-G$、流速 $w=G(R^2-r^2)/(4\eta)$ が与えられる。壁が流体へ及ぼす全軸方向力と圧力の合力を求め、さらに $\int 2\eta D:D\,dV=\Delta p Q$ を直接積分で確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

流体領域の側壁外向き法線は $e_r$。[Newton 応力](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)から $t_z=\eta w'(R)=-GR/2$。壁面積は $2\pi RL$ だから $F_{\mathrm{wall},z}=-G\pi R^2L$。圧力の合力は $(p(0)-p(L))\pi R^2=GL\pi R^2$ で和は零。

非零の変形速度成分は $D_{rz}=D_{zr}=w'/2$ なので $2\eta D:D=\eta(w')^2=\eta G^2r^2/(4\eta^2)$。従って

$$
\int 2\eta D:D\,dV
=2\pi L\int_0^R\frac{G^2r^2}{4\eta}r\,dr
=\frac{\pi LG^2R^4}{8\eta}.
$$

他方 $\Delta p Q=(GL)\cdot(\pi GR^4/(8\eta))$ で一致する。壁での力、圧力の力、散逸率はそれぞれ符号と次元が異なるので混同しない。
<!-- solution-end -->

### B2. 同心円筒の向心加速度

$a<r<b$ で $v=(Ar+B/r)e_\theta$ とする。$(v\cdot\nabla)v$ と $\Delta v$ を求め、圧力差 $p(r)-p(a)$ を積分で導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

$e_\theta$ 方向の微分は $r^{-1}\partial_\theta$、$\partial_\theta e_\theta=-e_r$ であるため

$$
(v\cdot\nabla)v=\frac{w}{r}\partial_\theta(we_\theta)
=-\frac{w^2}{r}e_r.
$$

ラプラシアンは $(w''+w'/r-w/r^2)e_\theta$。$w=Ar+B/r$ なら $w'=A-B/r^2$、$w''=2B/r^3$ だから $w''+w'/r-w/r^2=(2B-B-B)/r^3=0$。径方向の運動量式は $dp/dr=\rho w^2/r$。これに $w=Ar+B/r$ を入れて

$$
\frac{p(r)-p(a)}{\rho}
=\int_a^r\left(A^2s+\frac{2AB}{s}+\frac{B^2}{s^3}\right)ds
=\frac{A^2(r^2-a^2)}2+2AB\log(r/a)
+\frac{B^2}{2}(a^{-2}-r^{-2}).
$$

$dp/dr\ge0$ は積分中の $w^2/r$ から判断する。$AB$ の符号だけを見て判断してはいけない。
<!-- solution-end -->

### B3. 円筒間のトルクと散逸

同心円筒の内壁を $\Omega_i=\Omega>0$、外壁を $\Omega_o=0$ で回し、$0<a<b$ とする。内壁が流体へ及ぼすトルクと、長さ $L$ の区間の粘性散逸率を求め、非負であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[円筒 Couette の係数](#thm-fluid16-couette-profile)は $B=a^2b^2\Omega/(b^2-a^2)>0$。内壁で流体領域の法線は $-e_r$ なので $t_\theta=-\sigma_{r\theta}(a)=2\eta B/a^2$。よって

$$
T_i=a(2\pi aL)\frac{2\eta B}{a^2}
=\frac{4\pi\eta L a^2b^2\Omega}{b^2-a^2}>0.
$$

外壁は静止し仕事をしないので、供給仕事率は $T_i\Omega=4\pi\eta L a^2b^2\Omega^2/(b^2-a^2)$。独立に $2\eta D:D=\eta(w'-w/r)^2=4\eta B^2/r^4$ を積分すると

$$
2\pi L\int_a^b\frac{4\eta B^2}{r^4}r\,dr
=4\pi\eta LB^2(a^{-2}-b^{-2})
=\frac{4\pi\eta L a^2b^2\Omega^2}{b^2-a^2}.
$$

正値性は $\eta>0$、$a<b$、$\Omega>0$ による。
<!-- solution-end -->

### B4. 圧力降下を保った管径変更

同じ長さ・粘性係数・圧力降下の円管を半径 $R$ から $2R$ に変える。新旧の流量、平均速度、壁面せん断応力の絶対値の比を求めよ。結果が適用される条件も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$G=\Delta p/L$ は不変。[流量公式](#thm-fluid16-pipe-flux)で $Q\propto R^4$ だから $Q_{\mathrm{new}}/Q_{\mathrm{old}}=2^4=16$。平均速度は $\bar w=GR^2/(8\eta)$ より比 $2^2=4$。壁面せん断応力は $|t_z|=GR/2$ より比 $2$ である。

しかし管径を変えると代表長さ $2R$ と平均速度がともに増え、Reynolds 数は同じ $\rho,\eta$ なら $4\times2=8$ 倍になる。元の円管が層流でも新しい管で完全発達層流が維持されるとは限らない。いずれもその解クラスが妥当である場合に限った比較である。
<!-- solution-end -->

### Level C

### C1. ポンプと回転装置のエネルギー収支

次の二つの装置はいずれも定常・完全発達層流を保つと仮定する。

1. 半径 $R$、長さ $L$ の静止円管に粘性係数 $\eta>0$ の流体を流し、入口出口の圧力差を $\Delta p>0$ に保つ。
2. 半径 $a<b$、長さ $L$ の同心円筒の内壁を角速度 $\Omega>0$ で回し、外壁を固定する。流体の粘性係数は同じ $\eta$ とする。端面の影響は無視する。

(1) 円管の速度分布と $Q$ を導き、圧力仕事率 $\Delta p Q$ と粘性散逸の一致を直接積分で示せ。

(2) 同心円筒の $w(r)$ と壁のトルクを導き、外部モーターが必要とする仕事率を求めよ。二壁のトルクの向きを区別せよ。

(3) $\Delta p,R,a,b,\Omega,L,\eta$ を用いて両装置の必要仕事率の比を求め、どのパラメータを固定した比較か説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1) 円管。** $G=\Delta p/L$ と置く。[円筒方向の方程式](#thm-fluid16-pipe-profile)から $(rw')'=-Gr/\eta$ を得る。積分後 $w=-Gr^2/(4\eta)+C_1\log r+C_0$。軸上の有界性で $C_1=0$、壁の無滑りで $C_0=GR^2/(4\eta)$。よって

$$
w(r)=\frac{\Delta p}{4\eta L}(R^2-r^2),\qquad
Q=2\pi\int_0^Rwr\,dr=\frac{\pi R^4\Delta p}{8\eta L}.
$$

$D_{rz}=D_{zr}=w'/2$ だから散逸率は

$$
2\pi L\eta\int_0^R(w')^2r\,dr
=\frac{\pi L G^2R^4}{8\eta}
=\frac{\pi R^4(\Delta p)^2}{8\eta L}
=\Delta p Q.
$$

**(2) 円筒。** 円周方向の式は $w''+w'/r-w/r^2=0$。二つの独立解 $r$ と $r^{-1}$ により $w=Ar+B/r$。壁条件 $w(a)=a\Omega$、$w(b)=0$ を解けば

$$
A=-\frac{a^2\Omega}{b^2-a^2},\qquad
B=\frac{a^2b^2\Omega}{b^2-a^2}.
$$

$\sigma_{r\theta}=\eta(w'-w/r)=-2\eta B/r^2$ なので、内壁法線 $-e_r$ から求めた内壁の流体へのトルクは $T_i=+4\pi\eta BL$、外壁法線 $+e_r$ からのトルクは $T_o=-4\pi\eta BL$。内壁の正回転方向に供給される仕事率は

$$
P_{\mathrm{cyl}}=T_i\Omega
=\frac{4\pi\eta L a^2b^2\Omega^2}{b^2-a^2}.
$$

**(3) 比と固定条件。** $P_{\mathrm{pipe}}=\pi R^4(\Delta p)^2/(8\eta L)$ なので

$$
\frac{P_{\mathrm{cyl}}}{P_{\mathrm{pipe}}}
=\frac{32\eta^2L^2a^2b^2\Omega^2}
{(b^2-a^2)R^4(\Delta p)^2}.
$$

この比は、設問で指定した圧力差と回転角速度、幾何寸法、粘性係数を**それぞれ固定した**比較である。円管流量 $Q$ や円筒トルクを別途固定する比較では式が変わる。圧力駆動と壁運動駆動を同じ「粘性抵抗係数」でまとめず、どこから仕事が入るか区別する。
<!-- solution-end -->

## 8. 要点と次への接続

- 固定円管では $w(r)=G(R^2-r^2)/(4\eta)$、$Q=\pi GR^4/(8\eta)$、壁が流体へ及ぼすせん断力密度は $-GR/2$。**軸の正則性**が対数解を除く。
- 同心円筒では $w(r)=Ar+B/r$、壁面せん断応力は $-2\eta B/r^2$。**径方向の向心加速度**があるため $dp/dr=\rho w^2/r$ を忘れない。
- 両者で入力仕事率は粘性散逸に一致する。解の厳密性と流れの安定性、入口の発達領域は別の問題である。

次の FLUID17 では時間変化する壁を動かし、定常の二回積分ではなく運動量が時間とともにどこまで拡散するかを考える。
