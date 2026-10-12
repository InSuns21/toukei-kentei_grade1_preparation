# SREL3 四元速度・四元運動量と質量殻

<!-- definition-example-audit: strict -->

[SREL2 の固有時](../SREL2/index.md#def-srel2-proper-time)は、一本の時計がどの慣性系でも同じ値だけ刻む量でした。ところが通常の速度 $\boldsymbol v=d\boldsymbol r/dt$ は慣性系を変えると値も変わります。時計が刻む時間を分母にして時空の四成分を微分すれば、慣性系間で一貫して扱える「速度」を作れるのではないでしょうか。

この章では、固有時による微分で時空の四成分を持つ速度を構成し、その変化を調べます。続いて粒子の静止質量を掛けてエネルギーと運動量を結び、両者の間に成り立つ質量殻条件を導きます。**四成分を持つからといって、光速を超える運動を意味するわけではありません。** 通常の空間速度とは、成分も分母の時間も異なります。

## 1. 固有時で世界線を微分する

時空を $\mathbb R^4$、事象を $X=(ct,\boldsymbol r)$ とし、真空中の光速を $c>0$、[Minkowski計量](../SREL2/index.md#def-srel2-minkowski-metric)を

$$
g(V,W)=V^0W^0-\boldsymbol V\cdot\boldsymbol W
$$

とします。符号は $(+,-,-,-)$ で統一し、上付き $0,1,2,3$ は成分の番号を表します。時間は未来向き、世界線は必要な区間で $C^2$、空間速度は常に $|\boldsymbol v(t)|<c$ とします。区分的運動では各滑らかな区間ごとに微分します。

座標時間 $t$ ではなく、時計自身の固有時 $\tau$ を用います。[固有時の定義](../SREL2/index.md#def-srel2-proper-time)を局所的に微分すると

$$
\frac{d\tau}{dt}=\sqrt{1-\frac{|\boldsymbol v|^2}{c^2}},
\qquad
\frac{dt}{d\tau}=\gamma(\boldsymbol v)
:=\frac{1}{\sqrt{1-|\boldsymbol v|^2/c^2}}.
$$

$\gamma$ の中身は正なので $t\mapsto\tau$ は狭義増加し、局所的に逆関数を持ちます。速度が時間依存しても、右辺の $\gamma$ はその時点の速度から求めます。これは二つの**慣性系間の相対速度**についての $\gamma$ と形は同じですが、粒子の瞬間速度を代入しています。

四元の微分をする前に、静止する粒子を考えましょう。その粒子の世界線は $X(t)=(ct,\boldsymbol r_0)$、固有時は $\tau=t+\text{定数}$ なので、微分した四成分は $(c,0,0,0)$ です。動く粒子でも、同じ操作を使います。

<a id="def-srel3-four-velocity"></a>

<!-- formal-statement-start -->
> **定義（四元速度）**  
> $C^1$ で未来向き時間的な世界線 $X(\tau)=(ct(\tau),\boldsymbol r(\tau))$ に沿って、固有時で微分した四ベクトルを**四元速度**という。

$$
U^\mu=\frac{dX^\mu}{d\tau},\qquad
U=(\gamma c,\gamma\boldsymbol v),
\quad
\boldsymbol v=\frac{d\boldsymbol r}{dt},
\quad
\gamma=(1-|\boldsymbol v|^2/c^2)^{-1/2}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel3-four-velocity -->
### 例：速さが $3c/5$ の粒子

**定義の確認**：世界線が時間的で固有時微分が定義できることを最初に確かめます。粒子の速度を $\boldsymbol v=(3c/5,0,0)$ とします。$|\boldsymbol v|<c$ が成立し、$\gamma=1/\sqrt{1-9/25}=5/4$ です。従って定義へ代入すると

$$
U=\left(\frac{5c}{4},\frac{3c}{4},0,0\right),
\quad
g(U,U)=\frac{25c^2}{16}-\frac{9c^2}{16}=c^2.
$$

各空間成分は $dx/d\tau$ であって $dx/dt$ ではありません。$U^1=3c/4$ が $v_x=3c/5$ と異なる理由は、分母が固有時になったからです。
<!-- definition-example-end -->

## 2. 四元速度が共通の幾何を持つ理由

四元速度は慣性系を変えたとき単に四成分が再表示されます。固有時が不変だから、分母の変換を別に考える必要がありません。

<a id="thm-srel3-four-velocity"></a>

<!-- formal-statement-start -->
> **定理（四元速度のLorentz共変性と規格化）**  
> 未来向き時間的な $C^1$ 世界線上で定めた四元速度 $U$ に対し、未来方向を保存するLorentz変換 $\Lambda$ と空間回転による慣性系の変更では $U'=\Lambda U$ が成り立つ。また、どの慣性系でも

$$
g(U,U)=c^2,\qquad U^0>0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[固有時の慣性系不変性](../SREL2/index.md#thm-srel2-proper-time-invariance)から、同じ $\tau$ で $X'=\Lambda X+a$ を微分できます。ノルムについては、[時空間隔のLorentz不変性](../SREL2/index.md#thm-srel2-interval-invariance)を世界線の微分ベクトルへ適用するか、速度表示を直接代入します。

<!-- proof-start -->
### 証明

$\Lambda$ は一定の線形変換、$a$ は一定の原点移動です。固有時の不変性と連鎖律から

$$
U'=\frac{dX'}{d\tau}
=\frac{d(\Lambda X+a)}{d\tau}
=\Lambda\frac{dX}{d\tau}=\Lambda U.
$$

次に [四元速度の定義](#def-srel3-four-velocity)を計量に代入し、

$$
\begin{aligned}
g(U,U)&=(\gamma c)^2-|\gamma\boldsymbol v|^2\\
&=\gamma^2(c^2-|\boldsymbol v|^2)\\
&=\frac{c^2-|\boldsymbol v|^2}{1-|\boldsymbol v|^2/c^2}=c^2.
\end{aligned}
$$

を得ます。$U^0=\gamma c>0$ です。さらにLorentz変換が $g$ を保つので、別の系でも $g(U',U')=g(U,U)=c^2$ です。
<!-- proof-end -->

この規格化は単なる運動例ではなく、**どんな未来向き時間的運動でも常に成立する式**です。速度が変化しても $U$ は同じ双曲面上を動きます。ただし粒子が光速になると $d\tau/dt=0$ で、四元速度の定義は使えません。

## 3. 加速度を四元で表す

速度の変化を測るにも、分母に固有時を使います。ここでは四元速度の変化と、瞬間静止系で測る加速度の大きさとを区別します。一定の座標加速度がそのまま一定の固有加速度になるとは限りません。

<a id="def-srel3-four-acceleration"></a>

<!-- formal-statement-start -->
> **定義（四元加速度と固有加速度）**  
> 未来向き時間的な $C^2$ 世界線の四元速度 $U$ に対し、四元加速度を $A=dU/d\tau$ と定める。$-g(A,A)\ge0$ のもとで、その非負の平方根を固有加速度の大きさ $\alpha$ と定める。

$$
A^\mu=\frac{dU^\mu}{d\tau},
\qquad
\alpha=\sqrt{-g(A,A)}.
$$
<!-- formal-statement-end -->

平方根の中が非負であることは、次の直交性と静止系の存在から証明します。定義を行列や成分だけの飾りにしないため、一方向に動く例を手で計算します。

<!-- definition-example-start: def-srel3-four-acceleration -->
### 例：瞬間的に静止する点

**定義の確認**：瞬間静止系でも四元加速度を定義でき、平方が非正になることを成分で確かめます。ある時点に粒子が $\boldsymbol v=\boldsymbol0$ で、座標加速度 $d\boldsymbol v/dt=(a,0,0)$ を持つとします。この点では

$$
\gamma=1,\qquad
\frac{d\gamma}{dt}
=\gamma^3\frac{\boldsymbol v\cdot(d\boldsymbol v/dt)}{c^2}
=0.
$$

よって

$$
A=\gamma\frac{d}{dt}(\gamma c,\gamma\boldsymbol v)
=(0,a,0,0),
\qquad
-g(A,A)=a^2.
$$

この点で $\alpha=|a|$ となります。「静止」はこの瞬間だけの条件で、加速度を持つ粒子が全時刻に同じ慣性系に静止するという意味ではありません。
<!-- definition-example-end -->

<a id="prop-srel3-orthogonality"></a>

<!-- formal-statement-start -->
> **命題（四元加速度の直交性）**  
> 未来向き時間的 $C^2$ 世界線の四元速度 $U$ と四元加速度 $A$ は

$$
g(U,A)=0
$$

> を満たす。また $g(A,A)\le0$ なので、固有加速度 $\alpha$ は実数である。$A=0$ のとき、またそのときに限り $\alpha=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[四元速度の規格化](#thm-srel3-four-velocity)を固有時で微分し、計量の双線形性を使います。非正性はその瞬間の静止系で $U=(c,\boldsymbol0)$ と置くと見えます。

<!-- proof-start -->
### 証明

すべての $\tau$ で $g(U(\tau),U(\tau))=c^2$ です。計量の係数は一定で対称だから、積の微分法則により

$$
0=\frac d{d\tau}g(U,U)
=g(A,U)+g(U,A)=2g(U,A).
$$

従って $g(U,A)=0$ です。ここから $g(A,A)\le0$ を導くには、**その瞬間にだけ**粒子が静止する慣性系を作ります。$\boldsymbol v=\boldsymbol0$ なら元の系がそのまま使えます。$\boldsymbol v\ne\boldsymbol0$ なら、[SREL2の慣性系の構成](../SREL2/index.md#prop-srel2-inertial-max-proper-time)と同じように空間軸を瞬間速度の方向へ回し、その方向を $x$ 軸、速さを $w=|\boldsymbol v|<c$ とします。これは時刻ごとに動く座標系を導入する操作ではなく、**調べている一点で一定の速度 $w$ を選び、そこに一つの慣性系を固定する操作**です。

この軸での四元速度は $U=(\gamma_wc,\gamma_ww,0,0)$ です。[一次元Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)を四元速度へ作用させると、$\gamma_w^2(1-w^2/c^2)=1$ を使って

$$
\begin{aligned}
U_*^0
&=\gamma_w\left(\gamma_wc-\frac wc\gamma_ww\right)
=\gamma_w^2c(1-w^2/c^2)=c,\\
U_*^1
&=\gamma_w\left(\gamma_ww-\frac wc\gamma_wc\right)=0,\\
U_*^2&=U_*^3=0.
\end{aligned}
$$

この慣性系では $U_*=(c,\boldsymbol0)$ なので直交条件は

$$
0=g(U_*,A_*)=cA_*^0
\quad\Longrightarrow\quad A_*^0=0.
$$

よって

$$
g(A_*,A_*)=-|\boldsymbol A_*|^2\le0.
$$

[時空間隔のLorentz不変性](../SREL2/index.md#thm-srel2-interval-invariance)からこの値はどの慣性系でも同じです。$g(A,A)=0$ は $|\boldsymbol A_*|=0$、つまり $A_*=0$ と同値であり、Lorentz変換は可逆なので $A=0$ と同値です。
<!-- proof-end -->

<a id="prop-srel3-proper-accel-1d"></a>

<!-- formal-statement-start -->
> **命題（一次元運動の固有加速度）**  
> $x$ 軸方向を動く未来向き $C^2$ 世界線について、座標速度を $v=dx/dt$、座標加速度を $a=dv/dt$、$|v|<c$ とする。その瞬間の四元加速度と固有加速度は

$$
A=\left(\gamma^4\frac{va}{c},\gamma^4a,0,0\right),
\qquad
\alpha=\gamma^3|a|,
\quad \gamma=(1-v^2/c^2)^{-1/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

四元速度の二成分 $\gamma c,\gamma v$ を時間 $t$ で微分した後、$d/d\tau=\gamma\,d/dt$ とします。$\gamma$ 自身が速度に依存する点を省くと誤答になります。

<!-- proof-start -->
### 証明

合成関数の微分から

$$
\frac{d\gamma}{dt}
=\frac12(1-v^2/c^2)^{-3/2}\frac{2va}{c^2}
=\gamma^3\frac{va}{c^2}.
$$

時間成分は

$$
A^0=\gamma\frac{d(\gamma c)}{dt}
=\gamma^4\frac{va}{c}.
$$

空間成分は、積の微分と $\gamma^2(1-v^2/c^2)=1$ から

$$
\begin{aligned}
A^1&=\gamma\frac{d(\gamma v)}{dt}\\
&=\gamma(\gamma a+v\gamma^3va/c^2)\\
&=\gamma^2a+\gamma^4(v^2/c^2)a\\
&=\gamma^4a(1-v^2/c^2+v^2/c^2)=\gamma^4a.
\end{aligned}
$$

従って

$$
\begin{aligned}
-g(A,A)&=(A^1)^2-(A^0)^2\\
&=\gamma^8a^2(1-v^2/c^2)
=\gamma^6a^2.
\end{aligned}
$$

非負の平方根を取ると $\alpha=\gamma^3|a|$ です。
<!-- proof-end -->

**適用の限界：** この $\gamma^3$ の式は速度と加速度が平行な一次元運動に対して導きました。三次元で加速度が横向きのときには、同じ $\gamma^3|\boldsymbol a|$ を無条件に使ってはいけません。

## 4. 粒子のエネルギーと運動量を四元でまとめる

古典力学では、同じ粒子の質量 $m$ が変わらないなら運動量は $m\boldsymbol v$ でした。しかし、$\boldsymbol v$ はLorentz変換に対して四成分の線形変換をしません。そこで四元速度に、粒子自身の**静止質量**を掛けます。

本節では静止質量 $m>0$ が一定の質点を考えます。粒子が相互作用して速度が変化することは許しますが、個々の粒子の静止質量が固定されているモデルです。座標系を変えたときの値を表すダッシュと、固有時による微分記号を混同しないでください。

<a id="def-srel3-four-momentum"></a>

<!-- formal-statement-start -->
> **定義（四元運動量・全エネルギー・三次元運動量）**  
> 静止質量 $m>0$ を一定とする未来向き時間的な粒子の四元運動量を $P=mU$ とし、その時間・空間成分により全エネルギー $E$ と三次元運動量 $\boldsymbol p$ を定める。

$$
P=(E/c,\boldsymbol p)
=m(\gamma c,\gamma\boldsymbol v),
\qquad
E=\gamma mc^2,\quad
\boldsymbol p=\gamma m\boldsymbol v.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel3-four-momentum -->
### 例：静止系と速さ $3c/5$ の系

**定義の確認**：静止質量 $m>0$ を一定に保ったまま、四元運動量の各成分を計算します。静止系では $\boldsymbol v=\boldsymbol0$ なので $P=(mc,\boldsymbol0)$、$E=mc^2$ です。速さが $3c/5$ の系では $\gamma=5/4$ で

$$
P=\left(\frac54mc,\frac34mc,0,0\right),
\qquad
E=\frac54mc^2,\quad p_x=\frac34mc.
$$

全エネルギーは静止していても零にはなりません。後で差 $E-mc^2$ を運動エネルギーとして取り出します。
<!-- definition-example-end -->

<a id="def-srel3-mass-shell"></a>

<!-- formal-statement-start -->
> **定義（質量殻と正エネルギー枝）**  
> $m\ge0$ に対し、四元運動量 $P=(E/c,\boldsymbol p)$ が満たす二次曲面

$$
g(P,P)=m^2c^2
$$

> を質量 $m$ の**質量殻**という。物理的に未来向きの粒子については $E>0$ の枝を選ぶ。$m=0$ のときは零でない光的四元運動量について $E>0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel3-mass-shell -->
### 例：静止質量の正エネルギー枝

**定義の確認**：質量殻の等式と未来向きの正エネルギー条件を両方検査します。静止粒子では $P=(mc,\boldsymbol0)$ なので $g(P,P)=m^2c^2$、かつ $E=mc^2>0$ です。代数方程式だけなら $E=-mc^2$ も可能ですが、未来向きの条件を満たすのは正の枝だけです。質量殻は同じ式でも枝の条件を落としてはいけません。
<!-- definition-example-end -->

<a id="thm-srel3-mass-shell"></a>

<!-- formal-statement-start -->
> **定理（質量殻関係式）**  
> 静止質量 $m>0$ が一定で $|\boldsymbol v|<c$ の粒子に対し、上の四元運動量は

$$
E^2=c^2|\boldsymbol p|^2+m^2c^4,
\qquad
E=+\sqrt{c^2|\boldsymbol p|^2+m^2c^4}
$$

> を満たす。逆に任意の $\boldsymbol p\in\mathbb R^3$ と $m>0$ に対して、正の平方根から定めた $P$ は未来向き時間的な四元運動量であり、速度は $\boldsymbol v=c^2\boldsymbol p/E$ と一意に復元できる。
<!-- formal-statement-end -->

### 証明の見取り図

まず [四元速度の規格化](#thm-srel3-four-velocity)に $m^2$ を掛けます。逆向きには平方根の正値から $|\boldsymbol v|<c$ を確かめ、実際に $P=mU$ の形に戻せることを検算します。

<!-- proof-start -->
### 証明

[四元運動量](#def-srel3-four-momentum)は $P=mU$ と定義したので

$$
g(P,P)=m^2g(U,U)=m^2c^2.
$$

これを成分で書くと

$$
\frac{E^2}{c^2}-|\boldsymbol p|^2=m^2c^2
\quad\Longleftrightarrow\quad
E^2=c^2|\boldsymbol p|^2+m^2c^4.
$$

$E=\gamma mc^2>0$ なので正の平方根を取ります。

逆に $E=\sqrt{c^2|\boldsymbol p|^2+m^2c^4}$ とし $\boldsymbol v=c^2\boldsymbol p/E$ と置くと

$$
\begin{aligned}
1-\frac{|\boldsymbol v|^2}{c^2}
&=1-\frac{c^2|\boldsymbol p|^2}{E^2}\\
&=\frac{E^2-c^2|\boldsymbol p|^2}{E^2}
=\frac{m^2c^4}{E^2}>0.
\end{aligned}
$$

従って $|\boldsymbol v|<c$、$\gamma=E/(mc^2)$ です。すると

$$
m(\gamma c,\gamma\boldsymbol v)
=\left(E/c,\frac{E}{c^2}\frac{c^2\boldsymbol p}{E}\right)
=(E/c,\boldsymbol p)=P.
$$

また復元式が一意なので、同じ正エネルギーの $P$ に別の速度を対応させることはできません。
<!-- proof-end -->

この平方根は「エネルギーと運動量が独立には選べない」という拘束を表します。三次元の運動量を決めれば、一定の質量では全エネルギーはただ一つに決まります。

## 5. 慣性系を変えるとエネルギー・運動量はどう見えるか

計量を保つ変換なら、質量殻も保ちます。時間と位置が混ざるのと同じように、エネルギーと運動量も混ざります。

<a id="prop-srel3-energy-momentum-transform"></a>

<!-- formal-statement-start -->
> **命題（エネルギー運動量のLorentz変換）**  
> $S'$ が $S$ に対して $x$ 軸方向へ速度 $w$（$|w|<c$）で動くとする。静止質量一定の粒子の四元運動量 $P=(E/c,p_x,p_y,p_z)$ に対して

$$
\begin{aligned}
E'&=\gamma_w(E-wp_x),\\
p'_x&=\gamma_w(p_x-wE/c^2),\\
p'_y&=p_y,\qquad p'_z=p_z,
\end{aligned}
\qquad
\gamma_w=(1-w^2/c^2)^{-1/2}.
$$

> が成り立ち、$E'^2-c^2|\boldsymbol p'|^2=E^2-c^2|\boldsymbol p|^2$ が保存される。
<!-- formal-statement-end -->

### 証明の見取り図

四元運動量は定数スカラー $m$ と四元速度の積です。そこで [Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)を、座標差の代わりに $P$ の四成分へ適用します。変換速度 $w$ と粒子の速度 $\boldsymbol v$ は別物として扱います。

<!-- proof-start -->
### 証明

[四元速度の変換則](#thm-srel3-four-velocity)を $m$ 倍すると $P'=\Lambda P$ です。時間成分の変換は

$$
\frac{E'}c
=\gamma_w\left(\frac Ec-\frac wc p_x\right)
$$

なので、両辺を $c$ 倍して $E'=\gamma_w(E-wp_x)$ を得ます。空間の進行方向成分は

$$
p'_x=\gamma_w\left(p_x-\frac wc\frac Ec\right)
=\gamma_w(p_x-wE/c^2).
$$

横方向成分は変わりません。平方の展開で交差項が消えることも確かめます。$\beta=w/c$、$Q=E/c$、$r=p_x$ と置くと $|\beta|<1$ で、

$$
\begin{aligned}
\frac{E'^2}{c^2}-(p'_x)^2
&=\gamma_w^2\left[(Q-\beta r)^2-(r-\beta Q)^2\right]\\
&=\gamma_w^2\left[Q^2-2\beta Qr+\beta^2r^2
-r^2+2\beta Qr-\beta^2Q^2\right]\\
&=\gamma_w^2(1-\beta^2)(Q^2-r^2)\\
&=Q^2-r^2
=\frac{E^2}{c^2}-p_x^2.
\end{aligned}
$$

$p_y,p_z$ の平方をさらに引けば質量殻が保存されます。
<!-- proof-end -->

たとえば粒子が $S$ に静止していれば $E=mc^2$、$p_x=0$ です。この粒子を速度 $w$ の系から観測すると

$$
E'=\gamma_w mc^2,\qquad
p'_x=-\gamma_w mw.
$$

これは粒子が $S'$ から見ると速度 $-w$ で動くことに一致します。符号を確認せずに $p'_x=+\gamma_wmw$ と書くのは典型的な誤りです。

## 6. 古典的なエネルギーへの戻り方

古典力学で使う運動エネルギーは、**粒子を静止状態からその速度まで動かしたときの全エネルギーの増分**として取り出せます。

<a id="prop-srel3-kinetic-energy"></a>

<!-- formal-statement-start -->
> **命題（運動エネルギーと低速極限）**  
> 静止質量 $m>0$、速度 $|\boldsymbol v|<c$ の粒子の運動エネルギーを $K=E-mc^2$ と置くと

$$
K=mc^2(\gamma-1)
=\frac{|\boldsymbol p|^2c^2}{E+mc^2}\ge0.
$$

> また $|\boldsymbol v|/c\to0$ では

$$
\frac{K}{\tfrac12m|\boldsymbol v|^2}\longrightarrow1
\quad(\boldsymbol v\ne\boldsymbol0),
\qquad
\frac{\boldsymbol p-m\boldsymbol v}{m|\boldsymbol v|}
\longrightarrow\boldsymbol0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

質量殻を差の平方として因数分解し、$\gamma$ の式を有理化します。Taylor展開の結論を暗記せず、先に分母がどこへ収束するかを見ます。

<!-- proof-start -->
### 証明

[質量殻関係式](#thm-srel3-mass-shell)から

$$
(E-mc^2)(E+mc^2)=E^2-m^2c^4=c^2|\boldsymbol p|^2.
$$

$E+mc^2>0$ なので割って $K=c^2|\boldsymbol p|^2/(E+mc^2)$ を得ます。また $E=\gamma mc^2$ だから $K=mc^2(\gamma-1)\ge0$ です。

$q=|\boldsymbol v|^2/c^2\in[0,1)$ と置くと、有理化により

$$
\begin{aligned}
\gamma-1
&=\frac1{\sqrt{1-q}}-1\\
&=\frac{1-\sqrt{1-q}}{\sqrt{1-q}}\\
&=\frac{q}{\sqrt{1-q}\bigl(1+\sqrt{1-q}\bigr)}.
\end{aligned}
$$

$\boldsymbol v\ne0$ なら $q>0$ なので

$$
\frac{K}{\tfrac12m|\boldsymbol v|^2}
=\frac{2}{\sqrt{1-q}\bigl(1+\sqrt{1-q}\bigr)}
\longrightarrow\frac2{1(1+1)}=1.
$$

三次元運動量は $\boldsymbol p=\gamma m\boldsymbol v$ ですから

$$
\left|\frac{\boldsymbol p-m\boldsymbol v}{m|\boldsymbol v|}\right|
=|\gamma-1|\longrightarrow0
$$

も成立します。
<!-- proof-end -->

ここで示したのは低速での**近似の極限**です。$\boldsymbol v=0$ で比の分母が零になるので、その点に値を代入して証明したわけではありません。

## 7. 質量ゼロの粒子はどう扱うか

質量殻の代数式自体は $m=0$ にも拡張でき、$E>0$ を選ぶと

$$
E^2=c^2|\boldsymbol p|^2,\qquad E=c|\boldsymbol p|,
\qquad P\ne0.
$$

たとえば $P=(q,q,0,0)$、$q>0$ を取ると $g(P,P)=q^2-q^2=0$、$E=cq>0$ です。これは光的な四元運動量の直接例です。零ベクトルを除くため $q>0$ が必要です。

**注意：** この $P$ を $mU$ で作ってはいけません。質量 $m=0$ を $mU$ に代入すると、有限の $U$ では零ベクトルしか得られません。

質量殻の代数式だけでは世界線の形は決まりません。質量ゼロ粒子が光的世界線をたどるモデルでは、[固有時の定義](../SREL2/index.md#def-srel2-proper-time)から

$$
g(dX,dX)=0,\qquad
d\tau=\frac{\sqrt{g(dX,dX)}}{c}=0
$$

となるため、$dX/d\tau$ を通常の時間的世界線と同じようには定義できません。非零の光的四元運動量は別に与える必要があります。質量を持つ粒子の静止系を作った証明も、光的ベクトルには転用できません。

本章までの関係は運動量の運動学的な制約です。外力があるとき、どんな方程式で $P$ が変化するかはまだ決めていません。次章では質点の作用と運動方程式を考え、今得た四元運動量を動力学へ接続します。

---

# 演習

## Level A

### A1. 四元速度の成分とノルム

一次元速度 $v=4c/5$ の時間的世界線について、四元速度 $U$ と $g(U,U)$ を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|v|<c$ を確認します。[四元速度](#def-srel3-four-velocity)の $\gamma$ は

$$
\gamma=(1-16/25)^{-1/2}=\frac53.
$$

従って

$$
U=\left(\frac{5c}{3},\frac{4c}{3},0,0\right),
\qquad
g(U,U)=\frac{25c^2}{9}-\frac{16c^2}{9}=c^2.
$$

四元速度の空間成分は $4c/3$ ですが、粒子の空間速度は $4c/5$ です。両者を混同しません。
<!-- solution-end -->

### A2. 固有時から四元速度へ

$0\le t\le 10\,\mathrm s$ で $\boldsymbol r(t)=(3ct/5,0,0)$ と動く粒子について $d\tau/dt$、区間の固有時増分、$dX/d\tau$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

速度は一定で $3c/5<c$ です。[固有時の定義](../SREL2/index.md#def-srel2-proper-time)から

$$
\frac{d\tau}{dt}=\sqrt{1-\frac9{25}}=\frac45,
\qquad
\Delta\tau=\int_0^{10\,\mathrm s}\frac45\,dt=8\,\mathrm s.
$$

$\gamma=dt/d\tau=5/4$ なので、連鎖律で

$$
\frac{dX}{d\tau}
=\frac{dX}{dt}\frac{dt}{d\tau}
=(c,3c/5,0,0)\frac54
=(5c/4,3c/4,0,0).
$$

$10\,\mathrm s$ は座標時間、$8\,\mathrm s$ は固有時です。
<!-- solution-end -->

### A3. 静止質量とエネルギー

静止質量 $m>0$ の粒子が $x$ 方向に速度 $3c/5$ で動くとき、$(E,p_x)$ と運動エネルギー $K$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\gamma=5/4$ を [四元運動量の定義](#def-srel3-four-momentum)へ代入します。

$$
E=\frac54mc^2,\qquad
p_x=\frac54m\frac{3c}{5}=\frac34mc.
$$

[運動エネルギー](#prop-srel3-kinetic-energy)は静止エネルギーを引いた差なので

$$
K=E-mc^2=\left(\frac54-1\right)mc^2=\frac14mc^2.
$$

$E$ と $K$ の違いは $mc^2$ の項です。
<!-- solution-end -->

### A4. 質量殻の正の枝

$m>0$、$\boldsymbol p=(3mc/4,0,0)$ と与えられた粒子の全エネルギーと速度を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[質量殻関係式](#thm-srel3-mass-shell)の正の枝に代入し、

$$
E=\sqrt{c^2\frac{9m^2c^2}{16}+m^2c^4}
=\sqrt{\frac{25}{16}m^2c^4}
=\frac54mc^2.
$$

速度の復元式に入れると

$$
v_x=\frac{c^2p_x}{E}
=\frac{c^2(3mc/4)}{5mc^2/4}
=\frac{3c}{5}<c.
$$

負のエネルギー枝を選ばなかった理由は未来向きという条件です。
<!-- solution-end -->

### A5. 光的な運動量と固有時

$m=0$、$P=(2q,0,2q,0)$（$q>0$ は運動量の単位を持つ）について、全エネルギー、$g(P,P)$、四元速度 $dX/d\tau$ が同じ方法で作れない理由を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

時間成分が $E/c=2q$ なので $E=2cq>0$ です。計量を直接計算すると

$$
g(P,P)=(2q)^2-(2q)^2=0
$$

となり、正エネルギーで非零の光的四元運動量です。ここまでの質量殻の式だけでは世界線は決まりませんが、質量ゼロ粒子が光的経路をたどるモデルでは、[固有時](../SREL2/index.md#def-srel2-proper-time)について

$$
g(dX,dX)=0,\qquad
d\tau=\frac{\sqrt{g(dX,dX)}}{c}=0
$$

となり、$dX/d\tau$ を通常の意味では定義できません。また $mU$ に $m=0$ を入れても、有限の $U$ なら $P=0$ になり、指定された $P\ne0$ を作れません。
<!-- solution-end -->

## Level B

### B1. 加速度の直交性を成分で検証する

一次元時間的な $C^2$ 世界線の座標速度を $v(t)$、座標加速度を $a(t)$ とする。$U=(\gamma c,\gamma v)$、$A=dU/d\tau$ の成分を計算し、$g(U,A)=0$ と $\alpha=\gamma^3|a|$ を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$d/d\tau=\gamma d/dt$、$d\gamma/dt=\gamma^3va/c^2$ を使います。[四元加速度の定義](#def-srel3-four-acceleration)へ代入すると

$$
\begin{aligned}
A^0&=\gamma c\,d\gamma/dt=\gamma^4va/c,\\
A^1&=\gamma[(d\gamma/dt)v+\gamma a]\\
&=\gamma^4v^2a/c^2+\gamma^2a\\
&=\gamma^4a\left(\frac{v^2}{c^2}+1-\frac{v^2}{c^2}\right)
=\gamma^4a.
\end{aligned}
$$

従って

$$
\begin{aligned}
g(U,A)
&=\gamma c\cdot\gamma^4va/c-\gamma v\cdot\gamma^4a\\
&=\gamma^5va-\gamma^5va=0,\\
-g(A,A)
&=\gamma^8a^2\left(1-\frac{v^2}{c^2}\right)
=\gamma^6a^2.
\end{aligned}
$$

正の平方根から $\alpha=\gamma^3|a|$ です。一次元に制限したことが二成分表示と最後の単純な係数を保証しています。
<!-- solution-end -->

### B2. 四元運動量をboostする

$S$ で粒子が静止し $P=(mc,0,0,0)$、$m>0$ とする。$S'$ は $S$ に対し $x$ 正方向へ $w=3c/5$ で動く。$(E',p'_x)$ を求め、質量殻が保たれることを確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$S$ では $E=mc^2$、$p_x=0$、$\gamma_w=5/4$ です。[エネルギー運動量変換](#prop-srel3-energy-momentum-transform)へ代入して

$$
\begin{aligned}
E'&=\frac54(E-wp_x)=\frac54mc^2,\\
p'_x&=\frac54(p_x-wE/c^2)
=-\frac54\frac{3c}{5}m=-\frac34mc.
\end{aligned}
$$

直接計算すると

$$
E'^2-c^2(p'_x)^2
=\left(\frac{25}{16}-\frac9{16}\right)m^2c^4
=m^2c^4.
$$

負の運動量は、$S'$ から見ると静止粒子が負方向へ動くことに対応します。
<!-- solution-end -->

### B3. 有理化で低速近似を導く

静止質量 $m>0$、速さ $0<v<c$ の粒子について、$K=mc^2(\gamma-1)$ の比 $K/(\tfrac12mv^2)$ を平方根のまま求め、$v/c\to0$ の極限を導け。なぜ $v=0$ をその比へ直接代入できないかも述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$q=v^2/c^2$ とすると $0<q<1$ で、

$$
\begin{aligned}
\gamma-1
&=\frac{1-\sqrt{1-q}}{\sqrt{1-q}}\\
&=\frac{(1-\sqrt{1-q})(1+\sqrt{1-q})}
{\sqrt{1-q}(1+\sqrt{1-q})}\\
&=\frac{q}{\sqrt{1-q}(1+\sqrt{1-q})}.
\end{aligned}
$$

したがって

$$
\frac{K}{\tfrac12mv^2}
=\frac{mc^2q}{\tfrac12mv^2\sqrt{1-q}(1+\sqrt{1-q})}
=\frac{2}{\sqrt{1-q}(1+\sqrt{1-q})}\longrightarrow1.
$$

$v=0$ では $K=0$ かつ $\tfrac12mv^2=0$ なので比は $0/0$ で未定義です。極限の値1と代入値を混同しません。
<!-- solution-end -->

## Level C

### C1. 一つの粒子を二つの慣性系で調べる

静止質量 $m>0$ の粒子が $S$ で $x$ 方向へ速度 $v=3c/5$ で等速運動する。$S'$ は $S$ に対して同じ方向へ $w=4c/5$ で動く。次を求め、同じ物理量の表示を比較せよ。

1. $S$ における四元速度、全エネルギー、運動量、質量殻。
2. $S'$ における全エネルギーと運動量をLorentz変換で求める。
3. $S'$ での粒子の速度をエネルギー運動量から復元し、一次元速度変換とも照合する。
4. $S'$ の計量で質量殻を再計算し、計算値が異なってよい量と異なってはいけない量を述べる。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $v=3c/5$ なので $\gamma_v=5/4$ です。[四元速度](#def-srel3-four-velocity)と[四元運動量](#def-srel3-four-momentum)から

$$
\begin{aligned}
U&=(5c/4,3c/4,0,0),\\
E&=5mc^2/4,\qquad p_x=3mc/4.
\end{aligned}
$$

[質量殻関係式](#thm-srel3-mass-shell)を成分でも検算すると

$$
E^2-c^2p_x^2
=(25/16-9/16)m^2c^4=m^2c^4.
$$

(2) $w=4c/5$ なので $\gamma_w=5/3$ です。[エネルギー運動量変換](#prop-srel3-energy-momentum-transform)へ代入すると

$$
\begin{aligned}
E'&=\frac53\left(\frac54mc^2-\frac{4c}{5}\frac34mc\right)\\
&=\frac53\left(\frac{25-12}{20}\right)mc^2
=\frac{13}{12}mc^2,\\
p'_x&=\frac53\left(\frac34mc-\frac{4c}{5}\frac{5m}{4}\right)\\
&=\frac53\left(\frac34-1\right)mc
=-\frac5{12}mc.
\end{aligned}
$$

(3) 正の $E'$ と $m>0$ があるので、[速度の復元式](#thm-srel3-mass-shell)を適用できます。

$$
v'=\frac{c^2p'_x}{E'}
=\frac{c^2(-5mc/12)}{13mc^2/12}
=-\frac{5c}{13}.
$$

別の方法では、[一次元速度変換](../SREL1/index.md#thm-srel1-velocity)へ $v_{\mathrm{particle}}=3c/5$、$w=4c/5$ を代入して

$$
v'=\frac{3c/5-4c/5}{1-(3/5)(4/5)}
=\frac{-c/5}{13/25}=-\frac{5c}{13}
$$

と一致します。変換する系の速度と粒子の速度を取り違えていない確認にもなります。

(4) 最後に直接代入して

$$
E'^2-c^2(p'_x)^2
=\left(\frac{169}{144}-\frac{25}{144}\right)m^2c^4
=m^2c^4.
$$

全エネルギーは $5mc^2/4$ から $13mc^2/12$、運動量は $3mc/4$ から $-5mc/12$ へ変わります。一方、質量殻の値 $m^2c^4$ と粒子の静止質量 $m$ は両慣性系で不変です。
<!-- solution-end -->
