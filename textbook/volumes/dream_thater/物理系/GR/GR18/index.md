# GR18 Schwarzschild光線軌道と光の屈曲

<!-- definition-example-audit: strict -->

[GR16で導いたSchwarzschild真空解](../GR16/index.md#thm-gr16-schwarzschild)は時計の進み方だけでなく、光路も決めます。[GR17の重力赤方偏移](../GR17/index.md#thm-gr17-redshift)では、光が二地点を結ぶ間に何が保存するかを調べました。しかし、光が**どの方向へ進み、どれだけ曲がるか**は周波数比だけでは分かりません。

平坦時空なら、遠方から来て十分離れたところへ去る光は直線を描き、入射方向と出射方向は一致します。中心質量の外側では、時間並進に加え回転の対称性を用い、光的条件を半径方向の運動へ還元します。さらに弱い重力場で散乱する光について、屈曲角を途中式から求めます。

以下では質量 $M>0$、$G,c>0$、$r_s=2GM/c^2>0$ とします。外部領域 $r>r_s$ で、[Schwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)を

$$
ds^2=-f(r)(dx^0)^2+\frac{dr^2}{f(r)}
+r^2(d\theta^2+\sin^2\theta\,d\phi^2),
\qquad x^0=ct,\quad f(r)=1-\frac{r_s}{r}>0
$$

と書きます。符号は $(-,+,+,+)$ です。[GR3の光的アフィン測地線](../GR3/index.md#prop-gr3-null-affine-action)を、非零の接ベクトル $k=dx/d\lambda$ とアフィンパラメータ $\lambda$ で表し、$g(k,k)=0$、$\nabla_k k=0$ とします。$\lambda$ の規格化自体は観測量ではありません。

## 1. 光を「四つの方程式」から「一つの軌道」へ

中心を通る一つの平面を選ぶと、球対称性によりその平面内で始まる測地線はそこに留まります。これを座標の選択だけで済ませず、角度方向の方程式で確かめます。光線を含む平面を $\theta=\pi/2$ に取ると、測地線の二次形式の角度部分は $r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)$ です。点は $\lambda$ による微分を表します。$\theta$ のEuler–Lagrange方程式は

$$
\frac{d}{d\lambda}(r^2\dot\theta)
=r^2\sin\theta\cos\theta\,\dot\phi^2.
$$

初期値 $\theta=\pi/2$、$\dot\theta=0$ を入れると、右辺は零で $\dot\theta=0$ が解です。$r>r_s$ の滑らかな方程式の局所解の一意性により、この初期値の光線は赤道面に留まります。以後、赤道面で計算します。

計量は $x^0$ と $\phi$ に依存しません。[GR14の座標表示によるKilling判定](../GR14/index.md#prop-gr14-killing-coordinate-test)と[測地線保存定理](../GR14/index.md#thm-gr14-killing-charge)をそれぞれ $\partial_{x^0}$、$\partial_\phi$ に適用します。便宜上、正方向に回る未来向き光線に対して

$$
\mathcal E:=-g(k,\partial_{x^0})=f(r)\dot x^0>0,
\qquad
\mathcal L:=g(k,\partial_\phi)=r^2\dot\phi>0
$$

を定数とします。$\mathcal E$ と $\mathcal L$ は同一のアフィン規格化で定めた量であり、光子の物理エネルギーを表す際には波数や四元運動量への換算が必要です。$\mathcal L=0$ の半径方向光線は別に扱い、以下の散乱軌道では $\mathcal L>0$ とします。

ここで無限遠での直線からのずれを比較するための長さを作ります。平坦な極限 $f\to1$ なら、保存量比は直線が原点を最も近く通る距離になります。この遠方散乱の基準となる長さが**衝突パラメータ**です。

<a id="def-gr18-impact-parameter"></a>

<!-- formal-statement-start -->
> **定義（光線の衝突パラメータ）**  
> $M>0$ のSchwarzschild静的外部 $r>r_s$ を進む、赤道面内の未来向き非半径方向アフィン光的測地線について、無限遠で規格化した時間並進と軸回転から定まる保存量 $\mathcal E>0$、$\mathcal L>0$ を用い、

$$
b:=\frac{\mathcal L}{\mathcal E}>0.
$$

>
> を **衝突パラメータ**とする。光線の向きを逆に取る場合は $|\mathcal L|/\mathcal E$ を用いる。
<!-- formal-statement-end -->

$\mathcal E$ と $\mathcal L$ はアフィンパラメータを定数倍で変えると共に同じ倍率で変化するため、比 $b$ は不変です。$\lambda$ の単位を任意に取っても、$x^0$ と $r$ は長さ、$\phi$ は無次元なので、保存量の次元は

$$
[\mathcal E]=\frac{\mathrm{length}}{[\lambda]},
\qquad
[\mathcal L]=\frac{\mathrm{length}^2}{[\lambda]},
\qquad [b]=\mathrm{length}
$$

となります。保存量比の次元が長さになることは、アフィンパラメータの規格化に依存しません。

<!-- definition-example-start: def-gr18-impact-parameter -->
**定義の確認**（平坦極限）。$M=0$ の極限を取り、最近接距離 $d>0$ の直線を平坦な直交座標で $x^0=s$、$X=s$、$Y=d$ と表します。このとき

$$
r(s)=\sqrt{s^2+d^2},
\qquad
\phi(s)=\operatorname{atan2}(d,s).
$$

接ベクトル $k=(1,1,0,0)$ は非零で、$g(k,k)=-1+1=0$、各座標成分の二階微分も零です。ゆえに $s$ はアフィンパラメータであり、光的アフィン測地線という入力条件を確認できます。

角度の増加する向きに合わせて $\mathcal L$ の符号を取ると

$$
\frac{d\phi}{ds}=-\frac{d}{s^2+d^2},
\qquad
\left|r^2\frac{d\phi}{ds}\right|=d,
\qquad \mathcal E=1.
$$

従って $b=|\mathcal L|/\mathcal E=d$ です。ここでの平坦極限は衝突パラメータの幾何学的意味の検証であり、$M>0$ での定義と混同しません。
<!-- definition-example-end -->

光的条件に $k$ の保存量表示を代入すると、半径方向の運動を求められます。

<a id="prop-gr18-null-radial"></a>

<!-- formal-statement-start -->
> **命題（光的測地線の半径方向一階積分）**  
> 正質量Schwarzschild外部の赤道面で、未来向きアフィン光的測地線の保存量を $\mathcal E=f\dot x^0>0$、$\mathcal L=r^2\dot\phi>0$ とする。このとき

$$
\boxed{\dot r^{\,2}=\mathcal E^2-f(r)\frac{\mathcal L^2}{r^2}
=\mathcal E^2\left(1-\frac{b^2f(r)}{r^2}\right).}
$$

> 半径方向の折返し点 $r_0>r_s$ があるなら、$\dot r=0$ なので $b^2=r_0^2/f(r_0)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

光的条件の時間・角度成分を保存量で消去し、半径成分の二乗を孤立させます。折返し点では速度の二乗が零になります。

<!-- proof-start -->
### 証明

$\theta=\pi/2$、$\dot\theta=0$ を使った光的条件は

$$
0=g(k,k)
=-f\dot{x}^{0\,2}+\frac{\dot r^2}{f}+r^2\dot\phi^2.
$$

$\dot x^0=\mathcal E/f$、$\dot\phi=\mathcal L/r^2$ を代入すると

$$
0=-\frac{\mathcal E^2}{f}+\frac{\dot r^2}{f}
+\frac{\mathcal L^2}{r^2}.
$$

この領域では $f>0$ なので両辺に $f$ を掛け、$\dot r^2=\mathcal E^2-f\mathcal L^2/r^2$ を得ます。$b=\mathcal L/\mathcal E$ を代入すれば第二表示です。折返し点 $\dot r=0$ で $\mathcal E^2=f(r_0)\mathcal L^2/r_0^2$、両保存量の正値性から $b^2=r_0^2/f(r_0)$ です。$\square$
<!-- proof-end -->

この式は、径方向の運動を「定数 $\mathcal E^2$ と半径によって変わる項」の差として見る道具になります。ただし、この一階積分だけで軌道が閉じるとはいえず、角度に沿ってどのように変化するかを調べる必要があります。

## 2. 逆半径で光路の曲がりを記述する

$\mathcal L>0$ より $\dot\phi=\mathcal L/r^2>0$ です。したがって軌道上で角度 $\phi$ を媒介変数とし、$u(\phi)=1/r(\phi)$ を置けます。連鎖律を二段階に分けると

$$
\frac{du}{d\phi}
=-\frac{1}{r^2}\frac{dr}{d\phi}
=-\frac{1}{r^2}\frac{\dot r}{\dot\phi}
=-\frac{\dot r}{\mathcal L}.
$$

したがって[半径方向一階積分](#prop-gr18-null-radial)に代入して

$$
\left(\frac{du}{d\phi}\right)^2
=\frac{\mathcal E^2}{\mathcal L^2}-\frac{f(r)}{r^2}
=\frac1{b^2}-u^2+r_su^3
$$

を得ます。これを微分すると軌道に対する二階方程式が現れます。

<a id="prop-gr18-orbit-equation"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild光線軌道方程式）**  
> 前命題の条件下、非半径方向の光的測地線を $u(\phi)=1/r(\phi)$ で表す。このとき

$$
\boxed{\frac{d^2u}{d\phi^2}+u
=\frac{3r_s}{2}u^2=\frac{3GM}{c^2}u^2.}
$$

> 併せて一階積分 $(u')^2+u^2-r_su^3=b^{-2}$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

一階積分を微分して、非定常な区間では $u'$ を消去します。折返し点はその前後の連続性で含め、半径一定の例は後で測地線条件と別途照合します。

<!-- proof-start -->
### 証明

一階積分を $\phi$ で微分すると

$$
2u'u''=-2uu'+3r_su^2u',
\qquad
2u'\left(u''+u-\frac{3r_s}{2}u^2\right)=0.
$$

$u'\ne0$ の開区間で割ると主張を得ます。非定数の滑らかな光路の孤立した折返し点では、$u,u''$ の連続性により同じ式が成立します。万一 $u'$ が開区間全体で零なら半径一定の測地線なので、後述の[円軌道条件](#prop-gr18-photon-sphere)で独立に確かめます。$(u')^2+u^2-r_su^3=b^{-2}$ は前段の一階積分を移項したものです。$\square$
<!-- proof-end -->

**具体例。** $r_s\to0$ では $u''+u=0$。$b>0$ の平坦な直線に対し、最近接点を $\phi=0$ と取ると $u=\cos\phi/b$ です。$\phi=\pm\pi/2$ で $u=0$、すなわち無限遠です。Schwarzschildで右辺が正になると、同じ角度だけ進んでも $u$ が変わり、光は元の直線から曲がります。

## 3. 光子球と、散乱・落下を分ける境界

[半径方向一階積分](#prop-gr18-null-radial)で変化する項のうち、$W(r):=f(r)/r^2$ に注目します。これは光線の向きによらず、中心質量と半径だけで決まります。$r>r_s$ で

$$
W(r)=\frac1{r^2}-\frac{r_s}{r^3},
\qquad
W'(r)=-\frac2{r^3}+\frac{3r_s}{r^4}
=\frac{-2r+3r_s}{r^4}.
$$

従って $W$ は $r=3r_s/2$ で最大となり、そこで $W=4/(27r_s^2)$ です。ここで「半径一定で回る光」が本当に測地線になるかも確かめます。

<a id="def-gr18-photon-sphere"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschild光子球）**  
> 正質量Schwarzschild時空の外部 $r>r_s$ において、半径 $r_{\mathrm{ph}}=3r_s/2=3GM/c^2$ にある二次元球面を **光子球**という。その球面上には半径一定の光的測地線が存在する。
<!-- formal-statement-end -->

球面「そのものが一条の光線」なのではありません。空間的な球面上の大円を光線が周回する、という意味です。存在性は次の命題で計算します。

<a id="prop-gr18-photon-sphere"></a>

<!-- formal-statement-start -->
> **命題（光子球と臨界衝突パラメータ）**  
> $M>0$ のSchwarzschild静的外部における非半径方向光的測地線について、半径一定の光路が成立する半径は $r_{\mathrm{ph}}=3r_s/2$ のみである。対応する保存量比は

$$
\boxed{b_c=\frac{3\sqrt3}{2}r_s=\frac{3\sqrt3\,GM}{c^2}.}
$$

> 無限遠から入射する光線では、$b>b_c$ のとき外側の折返し点 $r_0>r_{\mathrm{ph}}$ があり、$b<b_c$ のとき静的外部で折返し点を持たない。$b=b_c$ は円軌道へ漸近する臨界の場合である。
<!-- formal-statement-end -->

### 証明の見取り図

半径一定の光路には半径速度と半径加速度がともに零である必要があります。保存量による一階式の右辺が零かつ接する条件を使って半径を求めます。

<!-- proof-start -->
### 証明

半径一定の光路では $\dot r=0$ なので、まず $\mathcal E^2=\mathcal L^2 W(r)$ です。さらに半径方向の測地線方程式が要求する加速度を確認します。赤道面の測地線の作用を $2\mathscr L=-f\dot{x}^{0\,2}+\dot r^2/f+r^2\dot\phi^2$ と置くと、$\dot r=0$ での $r$ のEuler–Lagrange方程式は

$$
0=\frac{\partial\mathscr L}{\partial r}
=-\frac{f'}{2}\dot{x}^{0\,2}+r\dot\phi^2.
$$

保存量を代入して

$$
0=-\frac{f'}2\frac{\mathcal E^2}{f^2}
+\frac{\mathcal L^2}{r^3}
=\frac{\mathcal L^2}{2f}\left(\frac{2f}{r^3}-\frac{f'}{r^2}\right)
=-\frac{\mathcal L^2}{2f}W'(r).
$$

$\mathcal L>0$、$f>0$ なので $W'(r)=0$、すなわち $r=3r_s/2$ が必要です。ここで $f=1/3$、$W=4/(27r_s^2)$。$\mathcal E^2=\mathcal L^2 W$ から $b_c^2=27r_s^2/4$、$b_c>0$ より主張の値です。逆にこの半径で $\dot r=0$、$\mathcal E^2=\mathcal L^2W$ を選べば光的条件と半径のEuler–Lagrange方程式がともに成立し、他成分は保存式から満たされるので円形の光的測地線を構成できます。

散乱条件は $\dot r^2=\mathcal E^2[1-b^2W(r)]$ の符号から判定します。$W$ は静的外部の両端、すなわち $r\downarrow r_s$ と $r\to\infty$ に向かって零となります。中間に唯一の最大値 $W_{\max}=1/b_c^2$ を持ちます。

$b>b_c$ なら $1/b^2<W_{\max}$ なので、$W(r)=1/b^2$ の根は光子球の内側と外側に二つあります。無限遠から来る軌道が最初に当たる外側根が折返し点 $r_0$ です。

$b<b_c$ なら $b^2W(r)<1$ が全外部で成立するため、半径速度の二乗は正で折返し点がありません。

$b=b_c$ では外側根と内側根が重なります。二重根近傍では $|\dot r|$ は $|r-r_{\mathrm{ph}}|$ に比例するため、有限のアフィン変化では円軌道に到達せず漸近します。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-gr18-photon-sphere -->
**定義の確認**。$r=3r_s/2$ では $f=1-2/3=1/3>0$ なので静的外部の内部です。$b_c=(3r_s/2)/\sqrt{1/3}=(3\sqrt3/2)r_s$ という折返し条件を満たし、かつ $W'=0$ なので半径加速度も零です。$\dot r=0$ だけなら単なる折返し点であり、円軌道と判定してはいけません。
<!-- definition-example-end -->

**なぜ不安定か。** $W'$ は光子球より小さい半径で正、大きい半径で負です。従って $W$ は極大であり、円軌道を外側へ少しずらすと半径方向の運動を許す領域へ逃れられます。この不安定性を、円軌道が「どんな外乱にも保たれる」安定な惑星軌道と取り違えないでください。

## 4. 散乱角を定義し、弱場で導く

遠くから光が来て再び無限遠へ去る場合に限り、入射方向と出射方向が比較できます。非半径方向の光路の外側折返し点を $r_0>r_{\mathrm{ph}}$ とすると、往路と復路は時間反転で対称です。[一階積分](#prop-gr18-null-radial)で角度を半径に換算すると

$$
\left|\frac{d\phi}{dr}\right|
=\frac{\mathcal L/r^2}{\mathcal E\sqrt{1-b^2f(r)/r^2}}
=\frac{b}{r^2\sqrt{1-b^2f(r)/r^2}}.
$$

平坦な散乱なら光路に沿う角度の総変化は $\pi$ です。曲がった時空で追加される角度を定義します。

<a id="def-gr18-deflection-angle"></a>

<!-- formal-statement-start -->
> **定義（遠方散乱における光の屈曲角）**  
> 正質量Schwarzschild外部で無限遠から入射し、$b>b_c$ の外側折返し点 $r_0>r_{\mathrm{ph}}$ を経て再び無限遠へ達する光的測地線の **屈曲角**を

$$
\boxed{\Delta\phi
:=2\int_{r_0}^{\infty}
\frac{b\,dr}{r^2\sqrt{1-b^2f(r)/r^2}}-\pi,\qquad
b=\frac{r_0}{\sqrt{f(r_0)}}}
$$

> で定める。角度の単位はラジアンとする。
<!-- formal-statement-end -->

この積分の下端では平方根の中身が零になりますが、$r_0>r_{\mathrm{ph}}$ では根は単純なので被積分関数は $(r-r_0)^{-1/2}$ 程度で積分可能です。無限遠では被積分関数は $O(r^{-2})$ なので、積分は収束します。

<!-- definition-example-start: def-gr18-deflection-angle -->
**定義の確認**（平坦時空で零）。 $r_s=0$ とすれば $f=1$、$r_0=b$ です。置換 $y=b/r$ により
$$
\int_b^\infty\frac{b\,dr}{r^2\sqrt{1-b^2/r^2}}
=\int_0^1\frac{dy}{\sqrt{1-y^2}}
=\frac{\pi}{2}.
$$
よって $\Delta\phi=2(\pi/2)-\pi=0$。この基準があるので、単なる角度変化 $\pi$ を屈曲と呼ぶ誤りを避けられます。
<!-- definition-example-end -->

**どのように近似するか。** 積分をいきなりテイラー展開すると下端 $r_0$ も $r_s$ に依存し、分母がそこで零になるため扱いに注意が必要です。代わりに、[軌道方程式](#prop-gr18-orbit-equation)を $\varepsilon=r_s/b\ll1$ の摂動として解けば、遠方へ出る角度を直接求められます。

<a id="thm-gr18-weak-bending"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschild光線の弱場屈曲角）**  
> 正質量Schwarzschild外部で無限遠から入り再び無限遠へ出る光的測地線を考え、無限遠で定義した衝突パラメータ $b$ が $r_s/b\ll1$ を満たすとする。一次の屈曲角は

$$
\boxed{\Delta\phi
=\frac{2r_s}{b}+O\left(\frac{r_s^2}{b^2}\right)
=\frac{4GM}{c^2b}
+O\left(\frac{G^2M^2}{c^4b^2}\right).}
$$

> $O$ 記号は $r_s/b\to0^+$ における無次元角度の誤差を表す。
<!-- formal-statement-end -->

### 証明の見取り図

平坦な軌道 $u_0=\cos\phi/b$ を出発点に一次の補正を求めます。最近接点を $\phi=0$ に固定し、一階積分で積分定数を定めます。補正後に $u=0$ となる遠方角度が両側でどれだけ動いたかを調べます。

<!-- proof-start -->
### 証明

$\phi=0$ を最近接点とし、$u'(0)=0$ とします。$\varepsilon=r_s/b$ と $y(\phi)=bu(\phi)$ を置き、まず摂動展開の誤差を確かめます。[軌道方程式](#prop-gr18-orbit-equation)と一階積分は

$$
y''+y=\frac{3\varepsilon}{2}y^2,
\qquad y'(0)=0,
\qquad y(0)^2-\varepsilon y(0)^3=1
$$

です。$a_\varepsilon:=y(0)>0$ のうち $\varepsilon\to0$ で $1$ に近づく根を選びます。最後の式を因数分解すると

$$
(a_\varepsilon-1)(a_\varepsilon+1)=\varepsilon a_\varepsilon^3,
\qquad
a_\varepsilon-1
=\frac{\varepsilon a_\varepsilon^3}{a_\varepsilon+1}
=\frac{\varepsilon}{2}+O(\varepsilon^2).
$$

二階方程式を初期値から積分すると、$\phi$ が負でも成り立つ積分方程式

$$
y(\phi)=a_\varepsilon\cos\phi
+\frac{3\varepsilon}{2}
\int_0^\phi\sin(\phi-t)y(t)^2\,dt
$$

を得ます。$|\phi|\leq2$ に固定します。$\varepsilon$ が十分小さければ $a_\varepsilon\leq5/4$ です。$y$ が $|y|\leq2$ を満たす区間では、積分区間の長さが高々 $2$、$|\sin(\phi-t)|\leq1$ だから、上の式から

$$
|y(\phi)|\leq\frac54+\frac{3\varepsilon}{2}\cdot2\cdot2^2
=\frac54+12\varepsilon<2
\qquad(0<\varepsilon<1/20)
$$

となります。初期値は $|a_\varepsilon|<2$ です。仮に $[-2,2]$ の途中で $|y|=2$ に初めて達したとすると、その時点までは $|y|\leq2$ なので、直前の評価は到達点でも $|y|<2$ を与え、矛盾します。従って $|y|\leq2$ はこの区間全体で成立します。積分方程式へ戻れば

$$
|y(\phi)-\cos\phi|
\leq |a_\varepsilon-1|+12\varepsilon
=O(\varepsilon),
$$

さらに $|y(t)^2-\cos^2t|\leq3|y(t)-\cos t|=O(\varepsilon)$ です。従って

$$
y(\phi)=\cos\phi+\varepsilon
\left\{\frac12\cos\phi+
\frac32\int_0^\phi\sin(\phi-t)\cos^2t\,dt\right\}
+O(\varepsilon^2)
$$

が $|\phi|\leq2$ で一様に成立します。同じ積分式を一度微分すれば $y'$ についても一様な一次展開が得られます。したがって無限遠に対応する $\phi=\pm\pi/2$ の近くでも誤差を制御できます。

括弧内を $w(\phi)$ と書くと、$u=y/b$ から

$$
u(\phi)=\frac{\cos\phi}{b}
+\frac{r_s}{b^2}w(\phi)
+O\left(\frac{r_s^2}{b^3}\right)
$$

です。以下では $w$ を微分方程式から具体的に求めます。これを[軌道方程式](#prop-gr18-orbit-equation)に代入し、$r_s$ の一次項を比較します。左辺の零次は $(\cos\phi)''+\cos\phi=0$、右辺は

$$
\frac{3r_s}{2}\left(\frac{\cos\phi}{b}\right)^2
=\frac{r_s}{b^2}\frac34(1+\cos2\phi)
$$

なので、

$$
w''+w=\frac34(1+\cos2\phi).
$$

定数項には $3/4$、$\cos2\phi$ の項には $(d^2/d\phi^2+1)\cos2\phi=-3\cos2\phi$ を用いて、

$$
w(\phi)=\frac34-\frac14\cos2\phi
+A\cos\phi+B\sin\phi
$$

を得ます。最近接点での $u'(0)=0$ は $B=0$ を与えます。残る $A$ は、一階積分

$$
(u')^2+u^2-r_su^3=\frac1{b^2}
$$

を $\phi=0$ で使って決めます。$u(0)=b^{-1}+(r_s/b^2)(1/2+A)+O(r_s^2/b^3)$ と $u'(0)=0$ を代入すると、左辺は

$$
\frac1{b^2}+\frac{r_s}{b^3}(1+2A)
-\frac{r_s}{b^3}
+O\left(\frac{r_s^2}{b^4}\right)
=\frac1{b^2}+\frac{2Ar_s}{b^3}
+O\left(\frac{r_s^2}{b^4}\right).
$$

従って $A=0$ です。よって

$$
u(\phi)=\frac{\cos\phi}{b}
+\frac{r_s}{4b^2}(3-\cos2\phi)
+O\left(\frac{r_s^2}{b^3}\right).
$$

上の一様な展開から $y(\pi/2)=\varepsilon+O(\varepsilon^2)$、$y'(\pi/2)=-1+O(\varepsilon)$ です。したがって $\varepsilon$ が十分小さいと、$\pi/2$ の近傍で $y$ は単調減少し、零点が一意に存在します。零点までの角度変化は $O(\varepsilon)$ です。この出射方向を $\phi=\pi/2+\delta$ と書き、$u=0$ を課します。$\delta=O(r_s/b)$ として $\cos(\pi/2+\delta)=-\delta+O(\delta^3)$、$\cos(\pi+2\delta)=-1+O(\delta^2)$ を代入すると

$$
0=-\frac{\delta}{b}+\frac{r_s}{b^2}
+O\left(\frac{r_s^2}{b^3}\right),
\qquad
\delta=\frac{r_s}{b}
+O\left(\frac{r_s^2}{b^2}\right).
$$

$\phi\mapsto-\phi$ の対称性により入射側は $-\pi/2-\delta$。従って全角度変化は $\pi+2\delta$、定義により $\Delta\phi=2\delta=2r_s/b+O((r_s/b)^2)$。最後に $r_s=2GM/c^2$ を代入すると係数 $4GM/(c^2b)$ になります。$\square$
<!-- proof-end -->

**数値を含む例。** $b=100r_s$ なら一次項は $2r_s/b=0.02$ ラジアンです。誤差は $O(10^{-4})$ ラジアンの次数であり、係数まで保証した誤差限界ではありません。$b=2r_s$ のような強場へこの近似をそのまま外挿してはいけません。実際、$b<b_c\approx2.598r_s$ ならそもそも無限遠へ再び戻る散乱軌道がありません。

## 5. 局所的な入射角と無限遠の衝突パラメータ

遠方での $b$ を、静止観測者が自分の位置で測る方向と結びます。[GR4の局所直交枠](../GR4/index.md#def-gr4-observer-frame)に従い、赤道面で

$$
e_{\hat0}=\frac1{\sqrt f}\partial_{x^0},\qquad
e_{\hat r}=\sqrt f\,\partial_r,\qquad
e_{\hat\phi}=\frac1r\partial_\phi
$$

を取ります。計量に代入すれば $g(e_{\hat0},e_{\hat0})=-1$、$g(e_{\hat r},e_{\hat r})=g(e_{\hat\phi},e_{\hat\phi})=1$、異なる基底の内積は零です。静止観測者の四元速度は $U=ce_{\hat0}$ です。

光の接ベクトルを局所枠で $k=k^{\hat0}e_{\hat0}+k^{\hat r}e_{\hat r}+k^{\hat\phi}e_{\hat\phi}$ と展開します。[GR4で定義した観測者の測定成分](../GR4/index.md#def-gr4-measured-components)は、時間方向の内積には負号を付け、空間方向にはそのまま内積を取って求めます。したがって

$$
k^{\hat0}=-g(k,e_{\hat0})=\frac{\mathcal E}{\sqrt f},\qquad
k^{\hat\phi}=g(k,e_{\hat\phi})=\frac{\mathcal L}{r}.
$$

光的条件は $(k^{\hat0})^2=(k^{\hat r})^2+(k^{\hat\phi})^2$ です。局所的に光の空間進行方向と**外向きの半径方向**のなす角を $\alpha$（$0\leq\alpha\leq\pi$）とすると、角運動量の向き $\mathcal L>0$ に対し

$$
\sin\alpha
=\frac{|k^{\hat\phi}|}{k^{\hat0}}
=\frac{\mathcal L/r}{\mathcal E/\sqrt f}
=\frac{b\sqrt{f(r)}}{r}.
$$

ただし $\sin\alpha$ のみでは入射と出射を区別できません。半径方向の測定成分も基底射影から求めると、

$$
k^{\hat r}=g(k,e_{\hat r})=\frac{\dot r}{\sqrt f},
\qquad
\cos\alpha=\frac{k^{\hat r}}{k^{\hat0}}
=\frac{\dot r}{\mathcal E}.
$$

[半径方向一階積分](#prop-gr18-null-radial)を使えば、$\sin^2\alpha+\cos^2\alpha=b^2f/r^2+\dot r^2/\mathcal E^2=1$ と検算できます。入射時は $\dot r<0$ で $\alpha>\pi/2$、出射時は $\dot r>0$ で $\alpha<\pi/2$ です。

これにより、$b$ は単なる座標上の距離ではなく、静止観測者の局所測定と対応する保存量比だと分かります。外側折返し点では半径成分が零、$\alpha=\pi/2$ なので $b=r_0/\sqrt{f(r_0)}$ を再現します。$r\to\infty$ では $f\to1$ なので $b\sim r\sin\alpha$ となり、平坦時空の直線からの距離へつながります。

**近似と定理の射程。** 屈曲角は無限遠の二方向を比べる定義です。有限距離の発光者・観測者の角度には、その場所での測定枠や光路に沿った幾何を追加で指定します。また「二倍のNewton予測」という通称だけでは証明になりません。本章の $4GM/(c^2b)$ は光的条件・時間と空間の計量係数・保存量を揃えて導いたものです。地平線を横切る軌道の大域的延長は後続のGR IIで扱います。

## 6. 演習：光的条件から観測角まで

### Level A

<a id="ex-gr18-a01"></a>
#### GR18-A01 保存量を使って径方向を消去する
- Level: A

赤道面のSchwarzschild計量で、$\mathcal E=f\dot x^0$、$\mathcal L=r^2\dot\phi$ を保存量とする未来向きの光的アフィン測地線について、$\dot r^2$ を表せ。$f>0$ の仮定が必要な場所も述べよ。

<!-- solution-start -->
**詳細解答。** 光的条件は $-f\dot x^{0\,2}+\dot r^2/f+r^2\dot\phi^2=0$ です。保存式を代入して $-\mathcal E^2/f+\dot r^2/f+\mathcal L^2/r^2=0$ を得ます。$r>r_s$ では $f>0$ なので $f$ 倍して $\dot r^2=\mathcal E^2-f\mathcal L^2/r^2$。ここでは $\dot x^0$ を求める際に $f$ で割ること、また静的座標のこの表示を用いることに $f>0$ が必要です。[半径方向一階積分](#prop-gr18-null-radial)を自分で再構成しました。
<!-- solution-end -->

<a id="ex-gr18-a02"></a>
#### GR18-A02 最近接半径から衝突パラメータへ
- Level: A

散乱光線の最近接半径を $r_0=4r_s$ とする。$f(r_0)>0$ を確認し、衝突パラメータ $b$ を $r_s$ で表せ。

<!-- solution-start -->
**詳細解答。** $f(4r_s)=1-1/4=3/4>0$。折返し点で $\dot r=0$ なので[一階積分](#prop-gr18-null-radial)から $\mathcal E^2=f(r_0)\mathcal L^2/r_0^2$。$b=\mathcal L/\mathcal E>0$ より $b=r_0/\sqrt{f(r_0)}=4r_s/(\sqrt3/2)=8r_s/\sqrt3$ です。$b>r_0$ は $f(r_0)<1$ のためであり、二つの長さを同一視しません。
<!-- solution-end -->

<a id="ex-gr18-a03"></a>
#### GR18-A03 円軌道には何が二条件必要か
- Level: A

$W(r)=r^{-2}-r_sr^{-3}$ の微分から光子球半径と $W_{\max}$ を計算し、臨界衝突パラメータを求めよ。単に $\dot r=0$ だけでは円軌道といえない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $W'=(-2r+3r_s)/r^4$ で、$W'=0$ の解は $r=3r_s/2>r_s$ だけです。$W$ はその前で増加、その後で減少するため最大です。代入すれば $W_{\max}=(1-2/3)/(9r_s^2/4)=4/(27r_s^2)$。円軌道での $\mathcal E^2=\mathcal L^2W_{\max}$ から $b_c=1/\sqrt{W_{\max}}=3\sqrt3\,r_s/2$。[光子球の命題](#prop-gr18-photon-sphere)のように半径方向の測地線方程式が要求する $W'=0$ も必要です。$\dot r=0$ だけなら普通の散乱光線の最近接点でも成立します。
<!-- solution-end -->

<a id="ex-gr18-a04"></a>
#### GR18-A04 平坦な光線を角度で表す
- Level: A

$r_s=0$ の極限で $u''+u=0$、最近接点 $\phi=0$、$\mathcal L/\mathcal E=b>0$ とする。軌道 $u(\phi)$ と入射・出射の無限遠角度を求め、屈曲角を示せ。

<!-- solution-start -->
**詳細解答。** 一般解は $u=C\cos\phi+D\sin\phi$。最近接点では $u'(0)=D=0$。一階積分 $(u')^2+u^2=b^{-2}$ を $\phi=0$ に適用すると $C^2=b^{-2}$。$u(0)>0$ なので $C=1/b$。従って $u=\cos\phi/b$。$u=0$ の近傍の境界は $\phi=-\pi/2$、$\pi/2$、全角度変化は $\pi$ です。[屈曲角の定義](#def-gr18-deflection-angle)より $\Delta\phi=\pi-\pi=0$ です。
<!-- solution-end -->

<a id="ex-gr18-a05"></a>
#### GR18-A05 弱場の無次元小量を確認する
- Level: A

$b=100r_s$ の遠方散乱で $\varepsilon=r_s/b$ と屈曲角の一次項を計算し、なぜ $b=2r_s$ へ同じ式を適用できないか説明せよ。

<!-- solution-start -->
**詳細解答。** $\varepsilon=1/100=0.01$ は無次元です。[Schwarzschild光線の弱場屈曲角](#thm-gr18-weak-bending)により一次は $2\varepsilon=0.02$ ラジアン、残差は $O(10^{-4})$ の次数です。$b=2r_s$ なら $\varepsilon=1/2$ で小さくなく、さらに[臨界値](#prop-gr18-photon-sphere)の $b_c=(3\sqrt3/2)r_s>2r_s$ を下回ります。散乱軌道が存在しないのに散乱角を計算するのが根本的な誤りです。
<!-- solution-end -->

### Level B

<a id="ex-gr18-b01"></a>
#### GR18-B01 軌道方程式を連鎖律から復元する
- Level: B

$\dot r^2=\mathcal E^2-f\mathcal L^2/r^2$、$\dot\phi=\mathcal L/r^2>0$ とする。$u=1/r$ について一階式と二階式を導け。折返し点で単純に $u'$ を割らない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $du/d\phi=(-1/r^2)(\dot r/\dot\phi)=-\dot r/\mathcal L$ なので $(u')^2=\mathcal E^2/\mathcal L^2-f/r^2=1/b^2-u^2+r_su^3$。微分して $2u'u''=-2uu'+3r_su^2u'$。$u'\ne0$ では $u''+u=(3r_s/2)u^2$ を得ます。[軌道方程式](#prop-gr18-orbit-equation)の折返し点では $u'=0$ なのでこの除算はできません。非定数の滑らかな軌道での孤立した折返し点へは連続性によって延長し、定数軌道なら半径方向の測地線方程式も別に確かめます。
<!-- solution-end -->

<a id="ex-gr18-b02"></a>
#### GR18-B02 摂動解の積分定数と屈曲係数
- Level: B

$u=b^{-1}\cos\phi+(r_s/b^2)w(\phi)+O(r_s^2/b^3)$ を軌道方程式に代入し、$w''+w$ を求めよ。最近接点 $\phi=0$ と一階積分を用いて積分定数を決め、一次の屈曲角を再導出せよ。

<!-- solution-start -->
**詳細解答。** 右辺の一次は $(3r_s/2b^2)\cos^2\phi$ なので $w''+w=3(1+\cos2\phi)/4$。一般解は $w=3/4-\cos2\phi/4+A\cos\phi+B\sin\phi$。$u'(0)=0$ から $B=0$。$u(0)=1/b+(r_s/b^2)(1/2+A)+O(r_s^2/b^3)$ を $(u')^2+u^2-r_su^3=b^{-2}$ に入れると一次係数 $2Ar_s/b^3=0$ なので $A=0$。$u(\pi/2+\delta)=0$、$\delta=O(r_s/b)$ とすると $0=-\delta/b+r_s/b^2+O(r_s^2/b^3)$、従って $\delta=r_s/b+O((r_s/b)^2)$。両側の遠方角度が対称なので[定理](#thm-gr18-weak-bending)の $\Delta\phi=2r_s/b+O((r_s/b)^2)=4GM/(c^2b)+O((r_s/b)^2)$ となります。
<!-- solution-end -->

<a id="ex-gr18-b03"></a>
#### GR18-B03 臨界値の両側の光路
- Level: B

$M>0$ の外部に無限遠から入射する光線に対し、$b=3r_s$、$b=2r_s$ のどちらが外側折返し点を持つか判定し、理由を $W_{\max}$ の値から説明せよ。

<!-- solution-start -->
**詳細解答。** [臨界衝突パラメータ](#prop-gr18-photon-sphere)は $b_c=(3\sqrt3/2)r_s$ で、$2r_s<b_c<3r_s$ です。$b=3r_s$ なら $1/b^2=1/(9r_s^2)<4/(27r_s^2)=W_{\max}$。$W$ は極大の外側で単調減少するため $W(r_0)=1/b^2$ を満たす一意の $r_0>3r_s/2$ があり、無限遠からの光線はそこへ来て折り返します。$b=2r_s$ なら $1/b^2=1/(4r_s^2)>4/(27r_s^2)$ なので全外部で $W(r)<1/b^2$、$\dot r^2>0$ となって折返し点はありません。これは静的外部内での判定であり、地平線通過後の座標延長はここでは扱いません。
<!-- solution-end -->

<a id="ex-gr18-b04"></a>
#### GR18-B04 屈曲角積分の収束を示す
- Level: B

$b>b_c$ の外側折返し点 $r_0$ について $\Delta\phi$ の積分式を導き、下端と無限遠で収束する理由を示せ。

<!-- solution-start -->
**詳細解答。** $\dot\phi=\mathcal L/r^2$ と $\dot r=\pm\mathcal E\sqrt{1-b^2f/r^2}$ から、角度変化の絶対値は $|d\phi/dr|=b/[r^2\sqrt{1-b^2f/r^2}]$。入射と出射の寄与は等しいので $\Delta\phi=2\int_{r_0}^\infty|d\phi/dr|dr-\pi$。[定義](#def-gr18-deflection-angle)に一致します。$F(r)=1-b^2W(r)$ とすると $F(r_0)=0$、$F'(r_0)=-b^2W'(r_0)>0$（$r_0>r_{\mathrm{ph}}$）。従って $F(r)=F'(r_0)(r-r_0)+O((r-r_0)^2)$ となり下端の被積分関数は $O((r-r_0)^{-1/2})$、積分可能です。無限遠では $F(r)\to1$、被積分関数は $b/r^2(1+O(r^{-2}))$ であり、これも積分可能です。$b=b_c$ なら下端は二重根となり、この説明は使えません。
<!-- solution-end -->

### Level C

<a id="ex-gr18-c01"></a>
#### GR18-C01 保存量・局所角・屈曲近似を統合する
- Level: C

正質量Schwarzschild静的外部で、無限遠から赤道面を進んできて $r_0=20r_s$ で折り返す光的アフィン測地線を考える。角運動量の向きは $\mathcal L>0$ とする。

1. $\mathcal E,\mathcal L$ の保存の根拠を挙げ、$\dot r$ の式を導け。
2. $r_0$ が光子球より外かを確認し、衝突パラメータ $b$ を求めよ。
3. $r=r_0$ の静止観測者が見る光の半径方向との角度 $\alpha$ を局所直交枠から求めよ。
4. $r_s/b$ を算出し、弱場一次近似による屈曲角を式で求めよ。誤差の次数を示せ。
5. 同じ計算を $r_0=3r_s/2$ に置き換えると、どの段階で「散乱して戻る」という仮定が壊れるか説明せよ。

<!-- solution-start -->
**詳細解答。**

(1) $\partial_{x^0}$ と $\partial_\phi$ は計量が対応座標に依存しないので[座標Killing判定](../GR14/index.md#prop-gr14-killing-coordinate-test)でKilling場です。アフィン測地線に対する[Killing場による測地線保存量](../GR14/index.md#thm-gr14-killing-charge)から $\mathcal E=f\dot x^0$、$\mathcal L=r^2\dot\phi$ は一定です。$g(k,k)=0$ に代入すると
$$
-\frac{\mathcal E^2}{f}+\frac{\dot r^2}{f}
+\frac{\mathcal L^2}{r^2}=0,
\qquad
\dot r^2=\mathcal E^2\left(1-\frac{b^2f}{r^2}\right).
$$

(2) $r_0=20r_s>3r_s/2$ なので光子球の外です。$f(r_0)=1-1/20=19/20>0$ で、折返し条件は $b=r_0/\sqrt{f(r_0)}$。従って
$$
b=20r_s\sqrt{\frac{20}{19}}>0,
\qquad
\frac{r_s}{b}=\frac1{20}\sqrt{\frac{19}{20}}.
$$
$b>b_c$ は、光子球外側では $W(r_0)<W_{\max}$ なので $1/b^2=W(r_0)<1/b_c^2$ からも分かります。

(3) [GR4の局所直交枠による測定成分](../GR4/index.md#def-gr4-measured-components)をSchwarzschild静止観測者へ適用します。$r_0>r_s$ で $f(r_0)>0$ なので直交枠を規格化できます。その測定成分は

$$
k^{\hat0}=\frac{\mathcal E}{\sqrt f},
\qquad
k^{\hat\phi}=\frac{\mathcal L}{r},
\qquad
k^{\hat r}=\frac{\dot r}{\sqrt f}
$$

です。これを角度の定義へ代入すると

$$
\sin\alpha=\frac{|k^{\hat\phi}|}{k^{\hat0}}
=\frac{b\sqrt f}{r},
\qquad
\cos\alpha=\frac{k^{\hat r}}{k^{\hat0}}
=\frac{\dot r}{\mathcal E}.
$$

$r=r_0$ では (2) の $b$ により $\sin\alpha=1$、折返し条件 $\dot r=0$ より $\cos\alpha=0$ です。よって $\alpha=\pi/2$、光は接線方向を向きます。折返しの前後で $\dot r$ の符号が負から正へ変わるので、入射方向と出射方向も区別できます。

(4) 小量は $\varepsilon=(1/20)\sqrt{19/20}\approx0.0487$ です。[Schwarzschild光線の弱場屈曲角](#thm-gr18-weak-bending)で
$$
\Delta\phi=\frac{2r_s}{b}
+O\left(\frac{r_s^2}{b^2}\right)
=\frac1{10}\sqrt{\frac{19}{20}}
+O\left(\frac{19}{8000}\right)
$$
ラジアンです。一次項は約 $0.0975$ ラジアン。$O$ の項は係数未指定であり「誤差が必ず $19/8000$ 以下」とは主張しません。

(5) $r_0=3r_s/2$ では $f=1/3$、$b=b_c$。ここは[半径一定の光的測地線](#prop-gr18-photon-sphere)を持つ臨界点であり、遠方から到達する光は外側の単純な折返し点を経て戻るのではなく、光子球へ漸近します。[屈曲角の定義](#def-gr18-deflection-angle)で必要な $r_0>r_{\mathrm{ph}}$ と下端の単純根性が失われ、積分は発散します。$r_0=3r_s/2$ を通常の散乱の最近接点として代入することはできません。
<!-- solution-end -->

---

Schwarzschild時空では、光の周波数の変化と光路の曲がりはどちらも計量から求まりますが、前者は静止観測者の時間規格化、後者は時間・角度の二つの保存量と光的条件を使いました。GR19では同じ対称性の道具を時間的測地線へ移し、惑星の近日点移動を求めます。
