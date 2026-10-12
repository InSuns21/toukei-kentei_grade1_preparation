# GMECH7 Euler剛体の幾何学的力学

前章では、角運動量を $\mathbb R^3\simeq\mathfrak{so}(3)^*$ の点として見れば、その長さが決める球面が[余随伴シンプレクティック葉](../GMECH6/index.md#thm-gmech6-leaves)になると分かりました。しかし「球面上を動く」という情報だけでは、どの曲線を、どちら向きに進むかは決まりません。自由に回転する剛体では慣性モーメントが運動を選び、**球面とエネルギー楕円体の交線**が実際の軌道を決めます。

ここでは、物体に固定した座標系でEuler方程式を導き、前章のLie–Poisson構造と結びつけます。空間に固定した角運動量は一定なのに、物体座標の三成分が動く理由、正負二つのPoisson括弧の使い分け、そして中間主軸に現れるセパラトリクスまで、同じ方程式から確認します。

## 1. 物体座標では角運動量が動く

剛体の重心を原点に取り、姿勢を $R(t)\in SO(3)$ で表します。$R$ は**物体座標から空間座標への回転**であり、物体座標のベクトル $v$ は空間では $Rv$ です。速度 $\dot R$ そのものは一般に回転行列ではありませんが、$R^{\mathsf T}R=1$ を微分すると

$$
\dot R^{\mathsf T}R+R^{\mathsf T}\dot R=0
$$

となるので、$R^{\mathsf T}\dot R$ は反対称行列です。ベクトル $a$ に $a\times v$ を対応させる反対称行列を $\widehat a$ と書けば、物体角速度 $\Omega$ は

$$
R^{\mathsf T}\dot R=\widehat\Omega,
\qquad \widehat\Omega v=\Omega\times v,
\qquad \dot R=R\widehat\Omega
$$

で一意に決まります。

[MECH8の剛体の慣性テンソル](../../../物理系/MECH/MECH8/index.md#def-mech8-inertia-tensor)を用い、主慣性軸を物体座標の基底に選んで対角化します。重心のまわりに回転する非退化な剛体を扱い、主慣性モーメントを $I_1,I_2,I_3>0$ とします。物体座標の運動エネルギーを

$$
L(\Omega)=\frac12\Omega\cdot I\Omega
=\frac12\sum_{i=1}^3 I_i\Omega_i^2,
\qquad I=\operatorname{diag}(I_1,I_2,I_3)
$$

とします。

<a id="def-gmech7-body-momentum"></a>

<!-- formal-statement-start -->
> **定義（Euler剛体の物体角運動量とエネルギー）**  
> $R\in SO(3)$、$I=\operatorname{diag}(I_1,I_2,I_3)$（各 $I_i>0$）に対して、物体角運動量 $M$ とそのHamiltonian $H$ を次で定める。

$$
M=I\Omega,
\qquad
H(M)=\frac12 M\cdot I^{-1}M
=\frac12\left(\frac{M_1^2}{I_1}+\frac{M_2^2}{I_2}+\frac{M_3^2}{I_3}\right).
$$

> 空間角運動量は $J=RM$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech7-body-momentum -->
### 直接例：角速度と角運動量は通常平行でない

**定義の確認**：$I=(1,2,3)$、$\Omega=(2,1,1)$ とすると $M=I\Omega=(2,2,3)$ です。そこで

$$
L=\frac12(1\cdot2^2+2\cdot1^2+3\cdot1^2)=\frac92,
$$

$$
H=\frac12\left(\frac{2^2}{1}+\frac{2^2}{2}+\frac{3^2}{3}\right)=\frac92.
$$

$M$ と $\Omega$ は平行ではありません。これは向きが異なる三つの主軸が同じ角速度への寄与を異なる倍率で受けるからです。
<!-- definition-example-end -->

## 2. 変分からEuler方程式を導く

外力トルクがないときの運動を、作用積分 $\int L(\Omega)\,dt$ の停留条件から導きます。[MECH8のEulerの剛体方程式](../../../物理系/MECH/MECH8/index.md#thm-mech8-euler-equations)は回転基底の時間微分から得られます。ここでは新たに、その**停留作用との同値性**を示します。通常の独立な $\delta\Omega$ を勝手に使うことはできません。$\Omega$ は回転行列 $R$ から決まるので、姿勢の変分に対応した制約があります。

<a id="thm-gmech7-euler"></a>

<!-- formal-statement-start -->
> **定理（自由剛体のEuler変分原理）**  
> $R:[a,b]\to SO(3)$ を滑らかな姿勢曲線、$I=\operatorname{diag}(I_1,I_2,I_3)$（各 $I_i>0$）を一定の慣性テンソルとし、端点の姿勢を固定する。外力トルクがないとき、$R$ が $\int_a^b \frac12\Omega\cdot I\Omega\,dt$ を停留させることと、$M=I\Omega$ が次のEuler方程式を満たすことは同値である。

$$
\dot M=M\times I^{-1}M=M\times\Omega.
$$

> 成分表示は添字 $(i,j,k)=(1,2,3),(2,3,1),(3,1,2)$ に対して次の通りである。

$$
\dot M_i=\left(\frac1{I_k}-\frac1{I_j}\right)M_jM_k.
$$

> この条件が成立するとき、さらに $J=RM$ は時間によらず一定である。
<!-- formal-statement-end -->

### 証明の見取り図

姿勢を微小回転させたときの角速度の変化を計算します。得られる $\delta\Omega$ は時間微分と交換子の和になり、部分積分によってEuler方程式が出ます。最後に空間角運動量を直接微分し、物体座標の変化が座標系自身の回転を相殺することを確かめます。

<!-- proof-start -->
### 証明

端点を固定した滑らかな変分 $R_s(t)\in SO(3)$（$R_0=R$）を考え、$s=0$ での変分を $\delta$ と書きます。$R^{\mathsf T}\delta R$ は反対称なので

$$
R^{\mathsf T}\delta R=\widehat\eta,
\qquad \delta R=R\widehat\eta,
\qquad \eta(a)=\eta(b)=0
$$

となる $\eta(t)\in\mathbb R^3$ を取れます。逆行列の変分は $\delta(R^{-1})=-R^{-1}(\delta R)R^{-1}$ です。従って

$$
\begin{aligned}
\delta(R^{-1}\dot R)
&=-R^{-1}(\delta R)R^{-1}\dot R+R^{-1}\delta\dot R\\
&=-\widehat\eta\,\widehat\Omega
 +R^{-1}\frac{d}{dt}(R\widehat\eta)\\
&=-\widehat\eta\,\widehat\Omega
  +\widehat\Omega\,\widehat\eta+\frac{d}{dt}\widehat\eta\\
&=\widehat{\dot\eta}+
 [\widehat\Omega,\widehat\eta].
\end{aligned}
$$

$\widehat a\widehat b-\widehat b\widehat a=\widehat{a\times b}$ は任意の $v$ に作用させてベクトル三重積から確認できます。よって

$$
\delta\Omega=\dot\eta+\Omega\times\eta.
$$

$M=I\Omega$ と $I^{\mathsf T}=I$ を使えば $\delta L=M\cdot\delta\Omega$ です。端点で $\eta=0$ となるため部分積分に境界項はなく、

$$
\begin{aligned}
\delta\int_a^b L\,dt
&=\int_a^b M\cdot(\dot\eta+\Omega\times\eta)\,dt\\
&=\int_a^b\bigl(-\dot M+M\times\Omega\bigr)\cdot\eta\,dt.
\end{aligned}
$$

$\eta$ は区間内部で任意の滑らかな変分を取れるので、停留条件から $\dot M=M\times\Omega$ です。第一成分を展開すると

$$
\dot M_1=M_2\Omega_3-M_3\Omega_2
=\left(\frac1{I_3}-\frac1{I_2}\right)M_2M_3
$$

となり、残り二成分は循環置換で得ます。

空間角運動量を微分すると、$\dot R=R\widehat\Omega$ と得られた運動方程式から

$$
\begin{aligned}
\dot J
&=\dot R M+R\dot M\\
&=R(\Omega\times M+M\times\Omega)=0.
\end{aligned}
$$

従って $J$ は保存されます。逆に $\dot M=M\times\Omega$ が成り立てば、上で得た任意の端点固定変分の式の被積分関数が恒等的に零となるので作用は停留します。これで同値性も確認できました。
<!-- proof-end -->

この結果は「運動量保存なら $\dot M=0$」という直感と矛盾しません。保存されるのは**空間座標の** $J$ であり、**物体座標の** $M=R^{\mathsf T}J$ は物体とともに動く座標系で測った成分です。たとえ $J$ が一定でも $R$ が変われば $M$ は一般に変わります。

## 3. 負のLie–Poisson括弧を選ぶ理由

[GMECH6の正・負Lie–Poisson括弧の定義](../GMECH6/index.md#def-gmech6-lie-poisson)では、$\mathfrak{so}(3)\simeq\mathbb R^3$ のLie括弧を外積と見なし、正の括弧なら $\dot M=\nabla H\times M$ となりました。しかし第2節の物体座標のEuler方程式は逆順の $M\times\nabla H$ です。ここで符号を曖昧にすると、軌道が同じでも回る向きが逆になります。

<a id="thm-gmech7-lie-poisson"></a>

<!-- formal-statement-start -->
> **定理（Euler方程式のLie–Poisson表示）**  
> $\mathfrak{so}(3)^*\simeq\mathbb R^3$ に負のLie–Poisson括弧

$$
\{F,G\}_-(M)=-M\cdot\bigl(\nabla F(M)\times\nabla G(M)\bigr)
$$

> を入れ、$H(M)=\frac12M\cdot I^{-1}M$（$I_i>0$）とする。このとき各座標 $M_i$ のHamilton方程式は

$$
\dot M_i=\{M_i,H\}_-,
\qquad \dot M=M\times I^{-1}M
$$

> であり、自由剛体のEuler方程式と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

座標関数の勾配を標準基底にして括弧の定義へ入れます。三重積の循環性で外積の順序を確認します。括弧の符号は既習の正の括弧をそのまま引用せず、今回は明示的に反転します。

<!-- proof-start -->
### 証明

$F(M)=M_i$ なら $\nabla F=e_i$、$\nabla H=I^{-1}M=\Omega$ です。従って

$$
\begin{aligned}
\{M_i,H\}_-
&=-M\cdot(e_i\times\Omega)\\
&=-e_i\cdot(\Omega\times M)\\
&=e_i\cdot(M\times\Omega).
\end{aligned}
$$

すべての $i=1,2,3$ で成り立つので、ベクトルの等式 $\dot M=M\times I^{-1}M$ を得ます。これは[前章のHamilton方程式と正負の符号規約](../GMECH6/index.md#thm-gmech6-flow)とも整合します。
<!-- proof-end -->

例えば座標関数では $\{M_1,M_2\}_-=-M_3$ です。正の括弧では $+M_3$ なので、「剛体だから正を採用する」という決まりはありません。**角速度を物体座標で定義し、変分から得た方程式に合う方を選んだ**のです。

## 4. 保存量から球面とエネルギー曲線へ

第2節で得た $J$ の保存から、直交行列 $R$ が長さを保存することを使えば $|M|=|R^{\mathsf T}J|=|J|$ は一定です。Poisson構造の言葉では、[GMECH6のCasimirの定義と直接例](../GMECH6/index.md#def-gmech6-casimir)の $C(M)=|M|^2/2$ です。

<a id="thm-gmech7-conserved"></a>

<!-- formal-statement-start -->
> **定理（角運動量球面とエネルギーの保存）**  
> $I_i>0$ を一定とし、自由Euler方程式 $\dot M=M\times I^{-1}M$ の滑らかな解を考える。この解に沿って

$$
C(M)=\frac12|M|^2,
\qquad H(M)=\frac12M\cdot I^{-1}M
$$

> は一定である。$M(0)\ne0$ なら解は初期値で定まる球面 $S_r^2=\{M:|M|=r\}$ とエネルギー等位面 $\{H=E\}$ の交わりにとどまる。
<!-- formal-statement-end -->

### 証明の見取り図

外積が両方の入力と直交することを使います。保存する $C$ と $H$ は独立な意味を持ち、$C$ が球面を、$H$ が球面内の曲線を選びます。

<!-- proof-start -->
### 証明

$M$ を変数とする勾配は $\nabla C=M$、$\nabla H=I^{-1}M=\Omega$ です。連鎖律をEuler方程式に適用すると

$$
\begin{aligned}
\frac{d}{dt}C(M(t))
&=\nabla C\cdot\dot M
=M\cdot(M\times\Omega)=0,\\
\frac{d}{dt}H(M(t))
&=\nabla H\cdot\dot M
=\Omega\cdot(M\times\Omega)=0.
\end{aligned}
$$

よって両者は初期値のままです。$C=r^2/2$ が球面を、$H=E$ がエネルギー等位面を表すため、解は両者の交線から出ません。
<!-- proof-end -->

球面の全ての点を一本の軌道が通るわけではありません。非零球面は[余随伴軌道のシンプレクティック構造](../GMECH6/index.md#thm-gmech6-kks)を持つ二次元空間であり、その上で一つのHamiltonian $H$ を指定して初めて一次元の軌道候補が得られます。$M=0$ は単独の零次元葉かつ静止解です。

## 5. 相異なる三つの慣性モーメントの位相図

ここからは $0<I_1<I_2<I_3$ とし、$r>0$ を固定します。したがって $1/I_1>1/I_2>1/I_3$ です。球面上の[平衡点](../../../物理系/MECH/MECH5/index.md#def-mech5-equilibrium)を探す際、エネルギーの最小・最大・鞍点が、どの軸のまわりで曲線が閉じるかを決めます。

<a id="thm-gmech7-axes"></a>

<!-- formal-statement-start -->
> **定理（主軸回転とエネルギーの臨界値）**  
> $0<I_1<I_2<I_3$、$r>0$ のEuler剛体では、$S_r^2$ 上の $H$ の臨界点とEuler方程式の平衡点はともに $\pm re_1,\pm re_2,\pm re_3$ の6点である。各軸のエネルギーを $E_i=r^2/(2I_i)$ とすると

$$
E_3<E_2<E_1.
$$

> $\pm re_3$ は厳密な極小、$\pm re_1$ は厳密な極大、$\pm re_2$ は鞍点である。
<!-- formal-statement-end -->

### 証明の見取り図

球面への制限で臨界点なら $\nabla H$ が球面の法線 $M$ と平行です。慣性モーメントが互いに異なるので非零成分は一つしか残れません。極値の種類は主軸の近くで球面条件を代入し、エネルギーの差を正負の二次式として読み取ります。

<!-- proof-start -->
### 証明

球面上の接平面は $T_MS_r^2=\{v:M\cdot v=0\}$ です。制限 $H|_{S_r^2}$ の臨界点では $\nabla H=I^{-1}M$ が法線 $M$ と平行で、ある $\lambda\in\mathbb R$ について

$$
\left(\frac1{I_i}-\lambda\right)M_i=0
\qquad (i=1,2,3)
$$

となります。相異なる $1/I_i$ のため、非零の $M_i$ は高々一つです。$|M|=r$ なので臨界点は列挙した6点に限られます。逆にEuler方程式の平衡条件 $M\times I^{-1}M=0$ は二ベクトルが平行であることと同値なので平衡点も同じ6点です。

例えば $+re_2$ 付近で $M_1=u,M_3=v$ とし、球面条件から $M_2=\sqrt{r^2-u^2-v^2}$ と取ると

$$
\begin{aligned}
H(M)-E_2
&=\frac12\left(
\frac{u^2}{I_1}+\frac{r^2-u^2-v^2}{I_2}
+\frac{v^2}{I_3}-\frac{r^2}{I_2}\right)\\
&=\frac12\left[
\left(\frac1{I_1}-\frac1{I_2}\right)u^2+
\left(\frac1{I_3}-\frac1{I_2}\right)v^2\right].
\end{aligned}
$$

$u$ 方向の係数は正、$v$ 方向は負です。従って $+re_2$ は鞍点であり、$-re_2$ でも $M_2=-\sqrt{r^2-u^2-v^2}$ とするだけで同じ式になります。$e_3$ を中心とする局所座標では残り二係数がともに正なので厳密な極小、$e_1$ を中心とするとともに負なので厳密な極大です。
<!-- proof-end -->

ここで注意したいのは、「エネルギーの極値・鞍点」という球面上の分類と、「摂動に対して安定か」という力学的性質は別の問いだということです。後者の一般的な定式化はGMECH8で扱います。

<a id="thm-gmech7-phase-curves"></a>

<!-- formal-statement-start -->
> **定理（Euler剛体の縮約位相図）**  
> $0<I_1<I_2<I_3$、$r>0$ とする。球面 $S_r^2$ 上のエネルギー等位集合は、$E_3<E<E_2$ では $\pm e_3$ 側に分かれた二つの滑らかな閉曲線、$E_2<E<E_1$ では $\pm e_1$ 側に分かれた二つの滑らかな閉曲線になる。各閉曲線上のEuler流は非零速度で周回する。$E=E_2$ では等位集合は

$$
M_3=\pm
\sqrt{\frac{1/I_1-1/I_2}{1/I_2-1/I_3}}\,M_1
$$

> という二平面と球面の交わり、すなわち $\pm re_2$ で交差する二つの大円である。その交点は平衡点で、残りの円弧はセパラトリクスとなる。
<!-- formal-statement-end -->

### 証明の見取り図

まず球面条件をエネルギーへ代入して楕円の方程式へ変形します。臨界値の間なら楕円の内部で平方根の符号を一定に選べるため、上下二本の閉曲線が得られます。臨界値 $E_2$ では二次式が因数分解し、二つの大円が主軸の平衡点で交差します。

<!-- proof-start -->
### 証明

$|M|^2=r^2$ から $M_3^2=r^2-M_1^2-M_2^2$ を消去すると

$$
2E-\frac{r^2}{I_3}
=\left(\frac1{I_1}-\frac1{I_3}\right)M_1^2+
 \left(\frac1{I_2}-\frac1{I_3}\right)M_2^2.
$$

$E_3<E<E_2$ なら左辺は正で、しかも $r^2(1/I_2-1/I_3)$ より小さいです。右辺の二係数は正で、前者の方が大きいので、楕円上で

$$
M_1^2+M_2^2\le
\frac{2E-r^2/I_3}{1/I_2-1/I_3}<r^2
$$

となります。ゆえに $M_3=\pm\sqrt{r^2-M_1^2-M_2^2}$ の符号をそれぞれ固定でき、各符号が一つの滑らかな閉曲線を与えます。

同じ手順で今度は $M_1^2=r^2-M_2^2-M_3^2$ を消去すると

$$
\frac{r^2}{I_1}-2E
=\left(\frac1{I_1}-\frac1{I_2}\right)M_2^2+
 \left(\frac1{I_1}-\frac1{I_3}\right)M_3^2.
$$

$E_2<E<E_1$ の場合は同様に $M_2^2+M_3^2<r^2$ であり、今度は $M_1$ の正負によって二つの閉曲線を得ます。

非臨界エネルギーでは[主軸の臨界点の特徴付け](#thm-gmech7-axes)により $\nabla H$ は球面の法線 $M$ と平行ではありません。よって $M\times\nabla H\ne0$ で、各閉曲線上の速度は消えません。コンパクトな滑らかな閉曲線上の非零の連続ベクトル場なので、軌道は一方向へ有限時間で一周し、その後繰り返します。

$E=E_2$ に対して $M_2^2=r^2-M_1^2-M_3^2$ を代入すると

$$
0=\left(\frac1{I_1}-\frac1{I_2}\right)M_1^2
-\left(\frac1{I_2}-\frac1{I_3}\right)M_3^2.
$$

両係数は正なので因数分解でき、主張する二平面が現れます。いずれも原点を通り $M_2$ 軸を含むため、球面との交線は大円です。両平面の共通直線が $M_2$ 軸なので、交点は $\pm re_2$ です。そこではEulerベクトル場が零になり、残りの円弧は解の一意性により有限時刻では平衡点に到達しません。従ってそれぞれの円弧が平衡点を漸近的な端点とするセパラトリクスです。
<!-- proof-end -->

この球面上の図が **縮約位相図（reduced phase portrait）** です。三次元の角運動量空間を眺めるだけでは分からなかった「各エネルギーで何本の周期軌道があるか」が、球面と楕円体の交わりとして読めます。ここで得た $M(t)$ は物体座標の運動であり、姿勢 $R(t)$ 全体を得るには $\dot R=R\widehat{I^{-1}M(t)}$ の再構成も必要です。

## 6. 数値例：二つの大円と中間軸の反転

$I=(1,2,3)$、$|M|=1$ とすると、Euler方程式は

$$
\dot M_1=-\frac16M_2M_3,\qquad
\dot M_2=\frac23M_3M_1,\qquad
\dot M_3=-\frac12M_1M_2.
$$

臨界エネルギーは $E_3=1/6$、$E_2=1/4$、$E_1=1/2$ です。中間軸のエネルギー $E=1/4$ に固定すると、[セパラトリクスの式](#thm-gmech7-phase-curves)は $M_3=\pm\sqrt3\,M_1$ になります。正符号の大円のうち $M_1>0$ の円弧では、

$$
M_1^2=\frac{1-M_2^2}{4},
\qquad
\dot M_2=\frac{2\sqrt3}{3}M_1^2
=\frac{\sqrt3}{6}(1-M_2^2).
$$

$t=0$ に $M_2=0$ を通る解を積分すると

$$
M_2(t)=\tanh\left(\frac{\sqrt3}{6}t\right),
$$

$$
M_1(t)=\frac12\operatorname{sech}\left(\frac{\sqrt3}{6}t\right),
\qquad
M_3(t)=\frac{\sqrt3}{2}\operatorname{sech}\left(\frac{\sqrt3}{6}t\right).
$$

例えば $t\to-\infty$ では $(0,-1,0)$、$t\to+\infty$ では $(0,1,0)$ に近づきます。この軌道は**周期軌道ではありません**。両端の平衡点に向かって速度が遅くなり、有限時間でそこに到達することはありません。エネルギーを $1/4$ からほんの少しずらすと、代わりに最小軸または最大軸の周囲を回る閉曲線に移ります。

この機構は中間主軸まわりの回転が特別な位置にあることを示します。線形化による不安定性の検証と、エネルギーを使った安定性判定は次章で体系化します。

## 7. 演習

### Level A

<a id="ex-gmech7-a01"></a>
**A1. 物体角運動量とエネルギー。** $I=(1,2,4)$、$\Omega=(2,-1,1)$ とする。$M$、$H$、$C=|M|^2/2$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [物体角運動量とエネルギーの定義](#def-gmech7-body-momentum)に各成分を代入すると

$$
M=I\Omega=(2,-2,4).
$$

従って

$$
H=\frac12\left(\frac{2^2}{1}+\frac{(-2)^2}{2}+\frac{4^2}{4}\right)
=\frac12(4+2+4)=5,
$$

$$
C=\frac12\bigl(2^2+(-2)^2+4^2\bigr)
=\frac12(4+4+16)=12.
$$

$H$ と $C$ は異なる二次形式であり、一般には値も一致しません。
<!-- solution-end -->

<a id="ex-gmech7-a02"></a>
**A2. Euler方程式の成分。** $I=(1,2,3)$、$M=(1,2,3)$ における $\dot M$ を求め、$M\cdot\dot M=0$ を検算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [Euler方程式](#thm-gmech7-euler)へ $1/I=(1,1/2,1/3)$ を代入すると

$$
\begin{aligned}
\dot M_1&=(1/3-1/2)(2)(3)=-1,\\
\dot M_2&=(1-1/3)(3)(1)=2,\\
\dot M_3&=(1/2-1)(1)(2)=-1.
\end{aligned}
$$

従って $\dot M=(-1,2,-1)$ です。内積は $1(-1)+2(2)+3(-1)=-1+4-3=0$ なので、運動量球面への接性を確認できました。
<!-- solution-end -->

<a id="ex-gmech7-a03"></a>
**A3. 括弧の符号。** 負のLie–Poisson括弧で $\{M_1,M_2\}_-$ と $\{M_1,H\}_-$ を計算せよ。ただし $H=\frac12\sum_i M_i^2/I_i$ とする。

- Level: A

<!-- solution-start -->
**詳細解答。** [負のLie–Poisson表示](#thm-gmech7-lie-poisson)より、$\nabla M_1=e_1$、$\nabla M_2=e_2$ なので

$$
\{M_1,M_2\}_-=-M\cdot(e_1\times e_2)=-M_3.
$$

また $\nabla H=(M_1/I_1,M_2/I_2,M_3/I_3)$ として

$$
\begin{aligned}
\{M_1,H\}_-
&=-M\cdot(e_1\times\nabla H)\\
&=-M\cdot(0,-M_3/I_3,M_2/I_2)\\
&=\left(\frac1{I_3}-\frac1{I_2}\right)M_2M_3.
\end{aligned}
$$

これはEuler方程式の第一成分です。正の括弧へ勝手に入れ替えると二つとも符号が反転します。
<!-- solution-end -->

<a id="ex-gmech7-a04"></a>
**A4. 三つの臨界エネルギー。** $I=(1,2,3)$、$r=2$ の球面で $E_1,E_2,E_3$ を求め、各エネルギーを生む主軸を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [主軸回転と臨界値](#thm-gmech7-axes)より $E_i=r^2/(2I_i)$ です。$r^2=4$ を代入すると

$$
E_1=\frac4{2\cdot1}=2,\qquad
E_2=\frac4{2\cdot2}=1,\qquad
E_3=\frac4{2\cdot3}=\frac23.
$$

$E_1$ は $\pm2e_1$ の極大、$E_2$ は $\pm2e_2$ の鞍点、$E_3$ は $\pm2e_3$ の極小に対応します。
<!-- solution-end -->

### Level B

<a id="ex-gmech7-b01"></a>
**B1. 物体角運動量と空間角運動量。** $R^{\mathsf T}\dot R=\widehat\Omega$、$M=I\Omega$ とする。$J=RM$ が一定なら、$\dot M=M\times\Omega$ を直接導け。またこの条件から $|M|$ が一定であることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\dot R=R\widehat\Omega$ だから積の微分により

$$
\begin{aligned}
0=\dot J&=\dot R M+R\dot M\\
&=R(\widehat\Omega M+\dot M)\\
&=R(\Omega\times M+\dot M).
\end{aligned}
$$

$R$ は可逆なので $\dot M=-\Omega\times M=M\times\Omega$ です。さらに $R^{\mathsf T}R=1$ により

$$
|J|^2=(RM)\cdot(RM)
=M^{\mathsf T}R^{\mathsf T}RM=|M|^2.
$$

左辺は時間によらないため右辺も一定です。[保存量の定理](#thm-gmech7-conserved)と同じ結論を、空間座標から再導出できました。
<!-- solution-end -->

<a id="ex-gmech7-b02"></a>
**B2. 中間主軸の鞍点。** $0<I_1<I_2<I_3$、$|M|=r>0$ とする。$\pm re_2$ の近くで $H-E_2$ を球面上の二つの独立変数によって表し、極大でも極小でもないことを証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $M_1=u$、$M_3=v$ とおき、$M_2=\pm\sqrt{r^2-u^2-v^2}$ を取ります。$M_2^2=r^2-u^2-v^2$ を代入すると

$$
\begin{aligned}
H-E_2
&=\frac12\left(\frac{u^2}{I_1}+
\frac{r^2-u^2-v^2}{I_2}+\frac{v^2}{I_3}
-\frac{r^2}{I_2}\right)\\
&=\frac12\left[
(1/I_1-1/I_2)u^2+(1/I_3-1/I_2)v^2\right].
\end{aligned}
$$

$I_1<I_2<I_3$ から最初の係数は正、二番目は負です。$v=0$、$u\ne0$ の近傍点では $H>E_2$、$u=0$、$v\ne0$ では $H<E_2$ です。従って両符号の点の任意の近傍に高エネルギー点と低エネルギー点が存在し、鞍点と判定されます。
<!-- solution-end -->

<a id="ex-gmech7-b03"></a>
**B3. 楕円の二つの枝。** $I=(1,2,3)$、$|M|=1$、$E=1/5$ とする。エネルギー等位集合の $M_1M_2$ 平面への射影を求め、$M_3$ の符号が変わらないことを式で示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $H=1/5$ と $M_3^2=1-M_1^2-M_2^2$ を使うと

$$
\begin{aligned}
\frac25
&=M_1^2+\frac12M_2^2+\frac13M_3^2\\
&=\frac13+\frac23M_1^2+\frac16M_2^2.
\end{aligned}
$$

両辺から $1/3$ を引いて15倍すれば

$$
1=10M_1^2+\frac52M_2^2.
$$

この楕円上では $M_1^2\le1/10$、$M_2^2\le2/5$ なので

$$
M_1^2+M_2^2\le\frac12<1,
\qquad
M_3=\pm\sqrt{1-M_1^2-M_2^2}\ne0.
$$

よって符号ごとに一つずつ球面上の閉曲線が得られ、途中で $M_3=0$ を通って接続することはありません。
<!-- solution-end -->

<a id="ex-gmech7-b04"></a>
**B4. 中間軸の線形化。** $0<I_1<I_2<I_3$、$r>0$ とする。$M_*=re_2$ の近くで $u=M_1$、$v=M_3$ の線形化を求め、固有値が実数で符号が逆であることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** [Euler方程式](#thm-gmech7-euler)で $M_2=r+O(u^2+v^2)$ と置き、一次項を抜き出すと

$$
\begin{pmatrix}\dot u\\\dot v\end{pmatrix}
=r\begin{pmatrix}
0&1/I_3-1/I_2\\
1/I_2-1/I_1&0
\end{pmatrix}
\begin{pmatrix}u\\v\end{pmatrix}.
$$

この行列を $A$ とすると $\operatorname{tr}A=0$、固有方程式は

$$
\lambda^2
=r^2(1/I_3-1/I_2)(1/I_2-1/I_1).
$$

二因子はともに負なので積は正です。ゆえに

$$
\lambda_\pm
=\pm r\sqrt{(1/I_2-1/I_3)(1/I_1-1/I_2)}
$$

は非零の実数で符号が逆です。$I=(1,2,3)$ なら $\lambda_\pm=\pm r/\sqrt{12}$ です。正の固有値に沿って微小摂動が線形近似で増幅するため、中間主軸の反転を特徴付けます。
<!-- solution-end -->

### Level C

<a id="ex-gmech7-c01"></a>
**C1. セパラトリクスの完全再導出。** $I=(1,2,3)$、$|M|=1$、$H=1/4$ とする。(i) エネルギー等位集合が二つの大円であることを示せ。(ii) $M_1(0)=1/2$、$M_2(0)=0$、$M_3(0)=\sqrt3/2$ から出発する解を求めよ。(iii) 解の両側の時間極限を計算し、周期軌道との違いを述べよ。

- Level: C

<!-- solution-start -->
**詳細解答。**

**(i) 等位集合の決定。** $H=1/4$ と $|M|=1$ を使うと

$$
\begin{aligned}
\frac12
&=M_1^2+\frac12M_2^2+\frac13M_3^2\\
&=M_1^2+\frac12(1-M_1^2-M_3^2)+\frac13M_3^2\\
&=\frac12+\frac12M_1^2-\frac16M_3^2.
\end{aligned}
$$

従って $3M_1^2=M_3^2$、すなわち $M_3=\pm\sqrt3 M_1$ です。これらはともに原点を通る平面であり、$|M|=1$ との交わりは二つの大円です。交点は $M_1=M_3=0$、$M_2=\pm1$ になります。

**(ii) 解の導出。** 初期点は $M_3=\sqrt3 M_1$ かつ $M_1>0$ の枝にあります。[Euler方程式](#thm-gmech7-euler)にこの関係を入れると

$$
\dot M_2=\frac23M_3M_1=\frac{2\sqrt3}{3}M_1^2.
$$

球面条件から

$$
1=M_1^2+M_2^2+M_3^2
=4M_1^2+M_2^2,
\qquad M_1^2=\frac{1-M_2^2}{4}.
$$

両式を合わせると

$$
\frac{dM_2}{dt}=\frac{\sqrt3}{6}(1-M_2^2).
$$

$|M_2|<1$ の範囲で変数分離すると

$$
\int_0^{M_2(t)}\frac{ds}{1-s^2}
=\frac{\sqrt3}{6}\int_0^t du,
\qquad
\frac12\log\frac{1+M_2(t)}{1-M_2(t)}
=\frac{\sqrt3}{6}t.
$$

よって $M_2(t)=\tanh(\sqrt3 t/6)$ です。$M_1>0$ を保つ枝にいるため

$$
M_1(t)=\frac12\sqrt{1-M_2(t)^2}
=\frac12\operatorname{sech}\left(\frac{\sqrt3}{6}t\right),
$$

$$
M_3(t)=\sqrt3\,M_1(t)
=\frac{\sqrt3}{2}\operatorname{sech}\left(\frac{\sqrt3}{6}t\right).
$$

残る第一・第三成分も実際に満たすか検算します。$k=\sqrt3/6$、$s=\operatorname{sech}(kt)$、$q=\tanh(kt)$ と置くと

$$
\dot M_1=-\frac{k}{2}sq
=-\frac16\,q\,\frac{\sqrt3}{2}s
=-\frac16M_2M_3,
$$

$$
\dot M_3=-\frac{\sqrt3 k}{2}sq
=-\frac12\,\frac12s\,q
=-\frac12M_1M_2,
$$

であり、三成分ともEuler方程式と一致します。

**(iii) 両端の時間極限。** $\tanh(kt)\to\pm1$、$\operatorname{sech}(kt)\to0$ なので

$$
\lim_{t\to-\infty}M(t)=(0,-1,0),
\qquad
\lim_{t\to+\infty}M(t)=(0,1,0).
$$

この二点は[主軸平衡点の定理](#thm-gmech7-axes)にある中間軸の平衡点です。有限時刻で到達せず、同じ閉曲線を周回し続ける周期軌道とも異なります。これが異なる平衡点を結ぶヘテロクリニック軌道です。
<!-- solution-end -->

## 8. 次章へ

一つの $SO(3)$ の剛体だけで、運動量写像からLie–Poisson括弧、余随伴軌道、Casimir、Hamiltonianの等位線までがつながりました。球面上でエネルギーの極大・極小になる軸と鞍点になる軸は区別できましたが、一般の対称系で「対称性を除いた安定性」をどう定義するかはまだ残っています。GMECH8ではこの問題を相対平衡とenergy–momentum法へ一般化します。
