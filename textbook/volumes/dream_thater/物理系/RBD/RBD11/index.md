# RBD11 固定点を持つ重い対称こま

<!-- definition-example-audit: strict -->

[RBD10のPoinsotの不変平面](../RBD10/index.md#thm-rbd10-invariable-plane)は、外トルクが零なら空間角運動量全体が一定という性質を用いました。支点を固定したこまには重力が働くので、この平面は一般には固定されません。それでも**鉛直まわりの角運動量と、物体対称軸まわりの角運動量**は保存します。二つを使えば、傾きだけの一変数の運動へ帰着できます。

この講では「固定点まわりの慣性を使う理由」「鉛直・物体軸の二方向で角運動量が保存する理由」「Euler角が壊れる極で何が残るか」を一つずつ確かめます。定常歳差や小振幅の章動の分類は次のRBD12で扱い、ここではその入力となる**厳密な傾きの式と許容域**を導きます。

## 1. こまの支点・重心・物体軸を決める

空間の固定点を $O$、鉛直上向きの単位ベクトルを $e_z=(0,0,1)^{\mathsf T}$ とします。重力加速度の大きさを $g>0$、全質量を $M>0$ とし、重力は $-Mg e_z$ の向きです。物体の対称軸に沿って $O$ から重心 $C$ まで距離 $l>0$ があるとします。物体系の右手直交基底を $(e_1,e_2,e_3)$、物体成分から空間成分への回転を $R(t)\in SO(3)$ とします。

物体軸の空間方向は $n(t)=R(t)e_3$ で、重心位置は $r_{OC}=ln$ です。**重心と支点は一致しません**。支点の位置は時間一定、支点反力の作用点速度は零、支点反力の $O$ まわりのトルクは零と仮定します。回転は滑らかで、支点は摩擦のない理想的な球継手とします。重力場は一様、質量分布は剛体に固定され、全二次質量モーメントは有限です。

[RBD6の平行軸のテンソル公式](../RBD6/index.md#thm-rbd6-parallel-axis-tensor)では、物体系で重心まわりの慣性テンソルを $J_C$、支点まわりを $J_O$ とすると

$$
J_O=J_C+M\bigl(l^2\mathrm{Id}_3-l^2e_3e_3^{\mathsf T}\bigr)
=J_C+Ml^2\operatorname{diag}(1,1,0)
$$

です。従って二つの横主慣性モーメントだけが $Ml^2$ ずつ増えます。

以下の「対称」は**支点まわり**の慣性テンソルが同じ横主慣性値を持つことを意味します。重心が軸上にあるという条件とは別です。

<a id="def-rbd11-heavy-top"></a>

<!-- formal-statement-start -->
### 定義（固定点を持つ重い対称こま）

質量 $M>0$、重力加速度 $g>0$、距離 $l>0$ の三次元剛体について、次を仮定する。

**（H1）固定支点**：空間で固定された支点 $O$ があり、理想支点反力の $O$ まわりのトルクは零である。

**（H2）重心位置**：物体の重心は $O$ から物体第三軸方向の $le_3$ にある。

**（H3）対称慣性**：重心方向に選んだ第三軸 $e_3$ が $O$ まわりの主慣性軸であり、これに直交する $e_1,e_2$ と合わせた正向き直交主軸基底で、$O$ まわりの物体系慣性テンソルは

$$
\boxed{J_{O,b}=\operatorname{diag}(I,I,J),\qquad I>0,\ J>0}
$$

となる。
**（H4）外力**：外力は支点反力と、一様重力 $-Mg e_z$ のみで、その他の外力・偶力はない。

この系を**固定点を持つ重い対称こま**という。軸 $n=Re_3$ と鉛直上向き $e_z$ の角を $\theta\in[0,\pi]$ とし、重力ポテンシャルの零点を重心が支点と同じ高さにある場合に取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd11-heavy-top -->
### 直接例：細い質量なしの軸で支えられた均質円板

**定義の確認**：固定点、軸上の重心、二つの等しい正の横主慣性値、支点反力と一様重力だけという四条件を、円板と連結軸の構成から調べます。

半径 $r>0$、質量 $M>0$ の一様薄円板の中心を $C$ とし、その法線方向に質量のない剛直な長さ $l>0$ の軸を延ばして先端を理想的に支点 $O$ とします。円板の質量だけを考えます。[RBD6の一様薄円板の慣性テンソル](../RBD6/index.md#prop-rbd6-uniform-disc)では、中心まわりに

$$
J_C=\operatorname{diag}\left(\frac{Mr^2}{4},\frac{Mr^2}{4},\frac{Mr^2}{2}\right).
$$

軸を第三主軸に選び、[平行軸公式](../RBD6/index.md#thm-rbd6-parallel-axis-tensor)の移動ベクトル $le_3$ を代入すると

$$
J_O=\operatorname{diag}\left(\frac{Mr^2}{4}+Ml^2,\frac{Mr^2}{4}+Ml^2,\frac{Mr^2}{2}\right).
$$

この行列は、円板面内の二軸 $e_1,e_2$ と法線軸 $e_3$ に関する表示です。各列が各基底ベクトルの像を与えるので、

$
J_Oe_1=\left(\frac{Mr^2}{4}+Ml^2\right)e_1,\quad
J_Oe_2=\left(\frac{Mr^2}{4}+Ml^2\right)e_2,\quad
J_Oe_3=\frac{Mr^2}{2}e_3
$

となります。第三軸が主軸であることと、横二軸の主慣性値が等しいことを同じ表示で判定できるのは、[平行軸公式](../RBD6/index.md#thm-rbd6-parallel-axis-tensor)の補正 $Ml^2\operatorname{diag}(1,1,0)$ がこの基底で対角だからです。

従って $I=M(r^2/4+l^2)>0$、$J=Mr^2/2>0$ で、二つの横成分が等しい条件を確かめました。重心は軸上の $le_3$ にあり、支点を空間固定の理想継手とすれば反力は $O$ で作用します。一様重力だけを加えれば定義の四条件を満たします。例えば $M=2,r=l=1$ なら $I=5/2,J=1$ です。**この $I$ を重心まわりの $1/2$ で置き換えると、傾きの運動方程式が誤ります。**
<!-- definition-example-end -->

### 重力の向きとポテンシャルの符号

[RBD4のZYZ Euler角](../RBD4/index.md#def-rbd4-zyz-euler)の規約を引き継ぎ、$R=R_z(\phi)R_y(\theta)R_z(\psi)$ とします。[RBD4で求めた軸の像](../RBD4/index.md#def-rbd4-zyz-euler)から

$$
n=(\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta)^{\mathsf T},\qquad
r_{OC}=ln.
$$

よって重心の高さは $z_C=l\cos\theta$。重力の仕事はポテンシャルの減少に等しいので、零点を上記の位置で取ると

$$
\boxed{U(\theta)=Mgl\cos\theta}.
$$

$\theta=0$ なら重心が最も高く $U=Mgl$、$\theta=\pi$ なら最も低く $U=-Mgl$ です。下向きの重力を採ったのに $-Mgl\cos\theta$ と書かないようにします。

重力トルクは、[RBD7の外力の作用点とトルク](../RBD7/index.md#def-rbd7-resultant-torque)の定義を固定点 $O$ へ適用して

$$
\boxed{\tau_{O,s}=r_{OC}\times(-Mg e_z)=-Mgl\,n\times e_z}.
$$

このトルクは鉛直軸の成分を持ちません。すなわち $e_z\cdot\tau_{O,s}=0$ です。一方、$0<\theta<\pi$ なら大きさは $Mgl\sin\theta>0$ なので、**無トルクではありません**。

## 2. 三つのEuler角から運動エネルギーを作る

角度関数は一旦 $0<\theta<\pi$ の正則域で $C^2$ 級とし、上点は時刻 $t$ での微分を表します。角速度は支点 $O$ から見た剛体の角速度です。支点が固定されているため全運動エネルギーは支点まわりの回転エネルギー

$$
T=\frac12\omega_b^{\mathsf T}J_{O,b}\omega_b
$$

であり、重心の並進エネルギーを別途足してはいけません。

[RBD4のEuler角速度の変換命題](../RBD4/index.md#prop-rbd4-angular-velocity)をこの $R$ へ適用すると

$$
\begin{aligned}
\omega_1&=-\dot\phi\sin\theta\cos\psi+\dot\theta\sin\psi,\\
\omega_2&=\dot\phi\sin\theta\sin\psi+\dot\theta\cos\psi,\\
\omega_3&=\dot\psi+\dot\phi\cos\theta.
\end{aligned}
$$

横二成分を二乗して加えると、$\dot\phi\dot\theta$ の交差項は

$$
2\dot\phi\dot\theta\sin\theta
(-\cos\psi\sin\psi+\sin\psi\cos\psi)=0
$$

となり、

$$
\begin{aligned}
\omega_1^2+\omega_2^2
&=\dot\phi^2\sin^2\theta(\cos^2\psi+\sin^2\psi)
+\dot\theta^2(\sin^2\psi+\cos^2\psi)\\
&=\dot\theta^2+\dot\phi^2\sin^2\theta.
\end{aligned}
$$

ここで $u:=\dot\psi+\dot\phi\cos\theta$ とおきます。$u$ は第三物体軸方向の**角速度成分**で、一般には $\dot\psi$ そのものではありません。

<a id="prop-rbd11-kinetic-lagrangian"></a>

<!-- formal-statement-start -->
### 命題（固定点対称こまの運動エネルギーと力学的ラグランジアン）

[本章の定義](#def-rbd11-heavy-top)を満たし、$0<\theta<\pi$ で $C^2$ 級のZYZ Euler角 $(\phi,\theta,\psi)$ を用いると、運動エネルギー $T$ と力学的ラグランジアン $\mathcal L=T-U$ は

$$
\boxed{T=\frac I2(\dot\theta^2+\dot\phi^2\sin^2\theta)
+\frac J2(\dot\psi+\dot\phi\cos\theta)^2},
$$

$$
\boxed{\mathcal L=\frac I2(\dot\theta^2+\dot\phi^2\sin^2\theta)
+\frac J2(\dot\psi+\dot\phi\cos\theta)^2-Mgl\cos\theta}.
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

支点まわりの主慣性値 $I,I,J$ を使い、横角速度の二乗と対称軸成分の二乗に分けます。重力ポテンシャルは $C$ の高さだけから決まります。

<!-- proof-start -->
### 証明

[支点まわりの慣性テンソル](#def-rbd11-heavy-top)から $T=(I/2)(\omega_1^2+\omega_2^2)+(J/2)\omega_3^2$。[Euler角の角速度公式](../RBD4/index.md#prop-rbd4-angular-velocity)へ代入し、上で展開した横成分の交差項相殺と $\omega_3=u$ を用いると表示の $T$ を得ます。重力ポテンシャルは $U=Mgl(e_z\cdot n)$ で、$e_z\cdot n=\cos\theta$。従って $\mathcal L=T-U$ は主張の式です。理想支点反力は支点の速度が零なので仕事をしません。
<!-- proof-end -->

この式には $\phi$ と $\psi$ が**角度そのものとしては登場せず、時間微分だけが登場**します。この観察が次の二つの運動量保存の入口です。

## 3. 二つの循環座標と保存運動量

[AMECH4の循環座標の定義](../../AMECH/AMECH4/index.md#def-amech4-cyclic-coordinate)では、力学的ラグランジアンがある座標自体に依存しないとき、その座標は循環座標になります。本章の $\mathcal L$ は $\phi,\psi$ を含まず $\dot\phi,\dot\psi$ だけに依存するので、**$\phi$ と $\psi$ は循環座標**です。これに対応する[一般化運動量](../../AMECH/AMECH4/index.md#def-amech4-generalized-momentum)を計算します。

まず $u=\dot\psi+\dot\phi\cos\theta$ です。一般化運動量の偏微分では、時刻に関する全微分 $d/dt$ と異なり、$\theta$ ともう一方の速度変数を固定します。従って $\partial u/\partial\dot\psi=1$、$\partial u/\partial\dot\phi=\cos\theta$ です。そこで

$$
\begin{aligned}
p_\psi&=\frac{\partial\mathcal L}{\partial\dot\psi}=Ju,\\
p_\phi&=\frac{\partial\mathcal L}{\partial\dot\phi}
=I\dot\phi\sin^2\theta+Ju\cos\theta.
\end{aligned}
$$

第一式は物体第三軸方向の支点まわり角運動量 $J\omega_3$、第二式は鉛直軸方向の支点まわり角運動量です。第二式の物理的意味も単なる名前ではなく、成分で確かめましょう。

空間の鉛直方向を物体系へ写すと、[RBD4の回転行列](../RBD4/index.md#def-rbd4-zyz-euler)の転置から

$$
R^{\mathsf T}e_z=(-\sin\theta\cos\psi,\ \sin\theta\sin\psi,\ \cos\theta)^{\mathsf T}.
$$

これと $\omega_b$ の内積を取り、横成分を $I$、第三成分を $J$ で重み付けすると

$$
\begin{aligned}
e_z\cdot L_{O,s}
&=(R^{\mathsf T}e_z)\cdot(J_{O,b}\omega_b)\\
&=I\left[\dot\phi\sin^2\theta(\cos^2\psi+\sin^2\psi)
+\dot\theta\sin\theta(-\cos\psi\sin\psi+\sin\psi\cos\psi)\right]+Ju\cos\theta\\
&=I\dot\phi\sin^2\theta+Ju\cos\theta=p_\phi.
\end{aligned}
$$

<a id="thm-rbd11-momenta-energy"></a>

<!-- formal-statement-start -->
### 定理（二つの保存運動量と全エネルギー）

[本章の固定点対称こま](#def-rbd11-heavy-top)が理想支点で滑らかに運動し、$0<\theta<\pi$ では[本章の力学的ラグランジアン](#prop-rbd11-kinetic-lagrangian)に対するEuler–Lagrange方程式を満たすとする。このとき定数 $h,k,E\in\mathbb R$ が存在して

$$
\boxed{
k=p_\psi=J(\dot\psi+\dot\phi\cos\theta)
}
$$

$$
\boxed{
h=p_\phi=I\dot\phi\sin^2\theta+k\cos\theta
}
$$

$$
\boxed{
E=\frac I2(\dot\theta^2+\dot\phi^2\sin^2\theta)
+\frac{k^2}{2J}+Mgl\cos\theta
}
$$

が時間一定となる。$h=e_z\cdot L_{O,s}$ は鉛直角運動量、$k=e_3\cdot L_{O,b}$ は物体対称軸まわり角運動量である。これらの物理的な保存はEuler角が特異な $\theta=0,\pi$ に達しても成立する。
<!-- formal-statement-end -->

### 証明の見取り図

座標からは[循環座標の保存定理](../../AMECH/AMECH4/index.md#thm-amech4-cyclic-momentum)と[時間に陽に依存しない力学的ラグランジアンのエネルギー収支](../../AMECH/AMECH4/index.md#prop-amech4-energy-balance)を用います。さらにトルクの向きを空間・物体で調べれば、角度座標が重複する極でも保存が破れない理由が分かります。

<!-- proof-start -->
### 証明

[AMECH2の保存力系のLagrange方程式](../../AMECH/AMECH2/index.md#thm-amech2-lagrange-conservative)を、一般化座標 $q=(\phi,\theta,\psi)$ と $\mathcal L=T-U$ に適用します。支点は固定・理想的なので拘束反力の仮想仕事は零です。$\partial\mathcal L/\partial\phi=\partial\mathcal L/\partial\psi=0$ だから、[AMECH4の循環座標保存](../../AMECH/AMECH4/index.md#thm-amech4-cyclic-momentum)の式 $d(\partial\mathcal L/\partial\dot q_j)/dt=\partial\mathcal L/\partial q_j$ の右辺がそれぞれ零になり、$p_\phi=h$、$p_\psi=k$ は定数です。

[AMECH4のLagrangian energy](../../AMECH/AMECH4/index.md#def-amech4-lagrangian-energy)を本章の三座標へ適用すると

$$
E_{\mathcal L}=\dot\phi p_\phi+\dot\theta p_\theta+\dot\psi p_\psi-\mathcal L.
$$

$p_\theta=I\dot\theta$ と上記の二運動量を代入して

$$
\begin{aligned}
\dot\phi p_\phi+\dot\theta p_\theta+\dot\psi p_\psi
&=I\dot\phi^2\sin^2\theta+Ju\dot\phi\cos\theta
+I\dot\theta^2+Ju\dot\psi\\
&=I(\dot\theta^2+\dot\phi^2\sin^2\theta)+Ju^2
=2T.
\end{aligned}
$$

従って $E_{\mathcal L}=2T-(T-U)=T+U$ です。$\partial\mathcal L/\partial t=0$ なので[AMECH4のエネルギー収支命題](../../AMECH/AMECH4/index.md#prop-amech4-energy-balance)より $dE_{\mathcal L}/dt=0$。さらに $Ju=k$ より表示の $E$ が得られます。

座標に頼らない確認もします。[RBD7の固定基準点の角運動量収支](../RBD7/index.md#thm-rbd7-moving-origin)で固定点 $O$ を指定すると

$$
\frac{dL_{O,s}}{dt}=\tau_{O,s}=-Mgl\,n\times e_z.
$$

鉛直との内積は $d(e_z\cdot L_{O,s})/dt=0$。物体第三軸の保存も、固定点の収支から直接確認します。$O$ は動かず、支点まわりの慣性テンソル $J_{O,b}$ は物体座標で一定です。[RBD3の姿勢時間微分公式](../RBD3/index.md#prop-rbd3-angular-conjugacy) $\dot R=R\widehat\omega_b$ と積の微分により

$
\begin{aligned}
L_{O,s}&=R(J_{O,b}\omega_b),\\
R^{\mathsf T}\frac{dL_{O,s}}{dt}
&=\omega_b\times(J_{O,b}\omega_b)+J_{O,b}\dot\omega_b
=\tau_{O,b}.
\end{aligned}
$

これは [RBD7の物体系Euler方程式](../RBD7/index.md#thm-rbd7-newton-euler)を重心ではなく固定支点 $O$ まわりの角運動量収支へ適用した形です。重力トルク $(le_3)\times(R^{\mathsf T}(-Mg e_z))$ は $e_3$ に直交します。また $J_{O,b}=\operatorname{diag}(I,I,J)$ から第三成分の交差項は $I\omega_1\omega_2-I\omega_2\omega_1=0$。よって $J\dot\omega_3=\tau_{O,b,3}=0$、つまり $k$ は一定です。理想支点の仕事率は零、重力は保存力なのでエネルギーも一定。これらは $R,\omega$ と物理的な力の式であり、Euler角の正則域に依存しません。
<!-- proof-end -->

### 直接計算：鉛直軸へ回っても全角運動量は固定されない

一時刻に $n=(\sin\theta,0,\cos\theta)$ と置けば

$$
\tau_{O,s}=(0,Mgl\sin\theta,0).
$$

$0<\theta<\pi$ では一般に $L_{O,s}$ の水平方向成分が変化します。一方 $e_z\cdot\tau_{O,s}=0$ なので $h$ は変わりません。**「鉛直成分が保存」と「角運動量ベクトルが保存」は異なる命題**です。

## 4. 傾きだけの一変数のエネルギー式へ

定数 $h,k$ が既知なら、正則域 $0<\theta<\pi$ で運動量の二式を逆に解けます。まず $k=Ju$、$h=I\dot\phi\sin^2\theta+k\cos\theta$ だから

$$
\boxed{\dot\phi=\frac{h-k\cos\theta}{I\sin^2\theta}},
\qquad
\boxed{\dot\psi=\frac{k}{J}-\dot\phi\cos\theta}.
$$

$E$ へ $\dot\phi$ を代入すると、横回転の項は

$$
\frac I2\dot\phi^2\sin^2\theta
=\frac I2\frac{(h-k\cos\theta)^2}{I^2\sin^4\theta}\sin^2\theta
=\frac{(h-k\cos\theta)^2}{2I\sin^2\theta}.
$$

固定した $k$ に対応する自転エネルギー $k^2/(2J)$ を全エネルギーから差し引きます。残る $\theta$ 依存の項を、次に定義する有効ポテンシャルへまとめます。これは元の重力ポテンシャルとは異なり、歳差に使う運動エネルギーの一部も含みます。

<a id="def-rbd11-effective-potential"></a>

<!-- formal-statement-start -->
### 定義（重い対称こまの有効ポテンシャル）

[本章の対称こま](#def-rbd11-heavy-top)で $I,J,M,g,l>0$、保存角運動量 $h,k\in\mathbb R$ を固定する。$0<\theta<\pi$ における**有効ポテンシャル**と**傾き用のエネルギー**を

$$
\boxed{V_{\mathrm{eff}}(\theta;h,k)=
\frac{(h-k\cos\theta)^2}{2I\sin^2\theta}+Mgl\cos\theta},
$$

$$
\boxed{\varepsilon=E-\frac{k^2}{2J}}
$$

と定める。$V_{\mathrm{eff}}$ の定義域はまず開区間 $(0,\pi)$ とし、両端は極限が有限な場合だけ別途延長を検討する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd11-effective-potential -->
### 直接例：同じ傾きでも鉛直運動量で許容性が変わる

**定義の確認**：$I,J>0$ と実数 $h,k$ を指定し、定義域 $0<\theta<\pi$ の三点で式の分母が正であることを確認してから評価します。

$I=2,J=1,Mgl=3,h=0,k=2$ とします。ここでは $I,J>0$、$0<\theta<\pi$、$h,k$ は実数で、定義の条件を満たします。$\theta=\pi/2$ なら

$$
V_{\mathrm{eff}}(\pi/2)=\frac{(0-2\cdot0)^2}{4\cdot1}+3\cdot0=0.
$$

$\theta=\pi/3$ なら $\cos\theta=1/2,\sin^2\theta=3/4$ なので

$$
V_{\mathrm{eff}}(\pi/3)
=\frac{(-1)^2}{4(3/4)}+\frac32
=\frac13+\frac32=\frac{11}{6}.
$$

$\theta=2\pi/3$ なら

$$
V_{\mathrm{eff}}(2\pi/3)
=\frac{(+1)^2}{4(3/4)}-\frac32
=\frac13-\frac32=-\frac76.
$$

元の重力ポテンシャル $3\cos\theta$ だけでは $1/3$ の付加項を見落とします。$\varepsilon=1$ とした場合、$\pi/3$ は到達できず、$2\pi/3$ はエネルギー上は許容されます。
<!-- definition-example-end -->

<a id="thm-rbd11-reduced-theta"></a>

<!-- formal-statement-start -->
### 定理（傾きの一変数帰着と許容域）

[本章の固定点対称こま](#def-rbd11-heavy-top)で $0<\theta<\pi$ を満たす滑らかな運動を考える。[二つの保存運動量と全エネルギー](#thm-rbd11-momenta-energy)を $h,k,E$、[有効ポテンシャル](#def-rbd11-effective-potential)を $V_{\mathrm{eff}}$、$\varepsilon=E-k^2/(2J)$ とする。このとき

$$
\boxed{\frac I2\dot\theta^2+V_{\mathrm{eff}}(\theta;h,k)=\varepsilon},
$$

$$
\boxed{\dot\theta^2=\frac{2}{I}\bigl(\varepsilon-V_{\mathrm{eff}}(\theta;h,k)\bigr)}.
$$

従って運動する傾きは

$$
\boxed{\mathcal A_{\varepsilon,h,k}
=\{\theta\in(0,\pi): V_{\mathrm{eff}}(\theta;h,k)\le\varepsilon\}}
$$

に属する。正則域内の端点 $\theta_*$ で $V_{\mathrm{eff}}(\theta_*)=\varepsilon$ なら $\dot\theta=0$ となる。さらに正則域で

$$
\boxed{I\ddot\theta=-\frac{d}{d\theta}V_{\mathrm{eff}}(\theta;h,k)}
$$

が成り立つ。$\theta=0,\pi$ での式の適用は本定理に含めない。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギー中の歳差速度を $h,k$ で消去し、残る非負の運動エネルギーから許容不等式を得ます。二階の式は、単にエネルギー式を $\dot\theta$ で割るのではなく、[Lagrange方程式](../../AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)を使って静止点でも正当化します。

<!-- proof-start -->
### 証明

[保存エネルギー](#thm-rbd11-momenta-energy)に上の $\dot\phi$ を代入し、$k^2/(2J)$ を移項すると

$$
E-\frac{k^2}{2J}
=\frac I2\dot\theta^2+
\frac{(h-k\cos\theta)^2}{2I\sin^2\theta}+Mgl\cos\theta
$$

です。[定義](#def-rbd11-effective-potential)により第一式が得られます。$I>0$ なので両辺を $2/I$ 倍し第二式を得ます。左辺 $\dot\theta^2\ge0$ なので $\varepsilon-V_{\mathrm{eff}}\ge0$ が必要です。等号なら $\dot\theta^2=0$、従って $\dot\theta=0$ です。

二階の式も検証します。[本章の力学的ラグランジアン](#prop-rbd11-kinetic-lagrangian)について $\partial\mathcal L/\partial\dot\theta=I\dot\theta$、また $u=\dot\psi+\dot\phi\cos\theta$ の $\theta$ 微分は $-\dot\phi\sin\theta$ です。従って

$$
\frac{\partial\mathcal L}{\partial\theta}
=I\dot\phi^2\sin\theta\cos\theta
-Ju\dot\phi\sin\theta+Mgl\sin\theta.
$$

[AMECH2のLagrange方程式](../../AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)より

$$
I\ddot\theta=I\dot\phi^2\sin\theta\cos\theta
-k\dot\phi\sin\theta+Mgl\sin\theta.
$$

$A(\theta)=h-k\cos\theta$ と置くと $A'(\theta)=k\sin\theta$ です。従って分数の微分は

$$
\begin{aligned}
\frac{d}{d\theta}\frac{A(\theta)^2}{2I\sin^2\theta}
&=\frac{AA'}{I\sin^2\theta}
-\frac{A^2\cos\theta}{I\sin^3\theta}\\
&=\frac{kA}{I\sin\theta}
-\frac{A^2\cos\theta}{I\sin^3\theta}.
\end{aligned}
$$

一方、上の二階式へ $\dot\phi=A/(I\sin^2\theta)$ を代入すれば

$$
I\ddot\theta=
\frac{A^2\cos\theta}{I\sin^3\theta}
-\frac{kA}{I\sin\theta}+Mgl\sin\theta
=-V'_{\mathrm{eff}}(\theta).
$$

これは $\dot\theta=0$ の瞬間にも成立し、エネルギー微分から $\dot\theta$ を約分する危険を避けています。
<!-- proof-end -->

### 角度が分かれば元の姿勢も追える

正則域で $\theta(t)$ の向き $\dot\theta=\pm\sqrt{(2/I)(\varepsilon-V_{\mathrm{eff}})}$ を初期値で選び、$\dot\phi$、$\dot\psi$ を上の二つの式から積分すれば、[RBD4の姿勢行列](../RBD4/index.md#def-rbd4-zyz-euler)で $R(t)$ を復元できます。折返し点では符号を初期値問題の二階式に従って連続させます。**許容集合が一つの区間であるとは限らず**、初期値から連続して到達する成分が実際の運動域です。RBD12では $V'_{\mathrm{eff}}=0$ の場合を定常歳差や章動と結び付けます。

## 5. 鉛直軸上の $\sin\theta=0$ で何が起きるか

上の逆変換は $\sin^2\theta$ で割っていますが、[RBD4のEuler角の座標特異性](../RBD4/index.md#prop-rbd4-coordinate-singularity)によって $\theta=0,\pi$ では角度の組が重複します。**物体が壊れたり、角速度が必ず無限大になったりするわけではありません。** 極で成立する二つの角運動量成分の関係を、割り算をする前の式から求めます。

<a id="prop-rbd11-pole-conditions"></a>

<!-- formal-statement-start -->
### 命題（鉛直姿勢への到達に必要な運動量条件）

[本章の固定点対称こま](#def-rbd11-heavy-top)が有限の角速度を持ち、二つの一定な角運動量成分を $h,k$ とする。物体軸が鉛直上向き $n=e_z$ となる瞬間には $h=k$ が必要であり、鉛直下向き $n=-e_z$ となる瞬間には $h=-k$ が必要である。

$0<\theta<\pi$ において $h\ne k$ なら $\theta\downarrow0$ で $V_{\mathrm{eff}}(\theta)\to+\infty$、$h\ne-k$ なら $\theta\uparrow\pi$ で $V_{\mathrm{eff}}(\theta)\to+\infty$ となる。例外的に $h=k$ の北極側、$h=-k$ の南極側では、それぞれ有効ポテンシャルが有限極限を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

鉛直姿勢では空間の鉛直方向と物体第三軸が一致（あるいは反対）します。よって同一の角運動量ベクトルの二つの射影の間に条件が生まれます。極限では半角公式で分子と分母の消え方を比較します。

<!-- proof-start -->
### 証明

[保存運動量の物理的意味](#thm-rbd11-momenta-energy)から、$n=e_z$ なら

$$
h=e_z\cdot L_{O,s}=n\cdot L_{O,s}=e_3\cdot L_{O,b}=k.
$$

$n=-e_z$ なら同じ内積で $h=-k$ です。これは極でのEuler角の値を選ばない議論です。

正則域で $V_{\mathrm{eff}}=(h-k\cos\theta)^2/(2I\sin^2\theta)+Mgl\cos\theta$。$\theta\downarrow0$ で分子は $(h-k)^2$ に、分母は $0$ に近づくので $h\ne k$ のとき第一項は $+\infty$ になります。$\theta\uparrow\pi$ でも同じく分子が $(h+k)^2$ となり、$h\ne-k$ なら発散します。

$h=k$ のとき $1-\cos\theta=2\sin^2(\theta/2)$ と $\sin\theta=2\sin(\theta/2)\cos(\theta/2)$ を使うと

$$
\frac{(k-k\cos\theta)^2}{2I\sin^2\theta}
=\frac{k^2}{2I}\tan^2\frac\theta2
\longrightarrow0\qquad(\theta\downarrow0).
$$

従って $V_{\mathrm{eff}}\to Mgl$ です。$h=-k$ なら同様に

$$
\frac{(-k-k\cos\theta)^2}{2I\sin^2\theta}
=\frac{k^2}{2I}\cot^2\frac\theta2
\longrightarrow0\qquad(\theta\uparrow\pi)
$$

となり、$V_{\mathrm{eff}}\to-Mgl$ です。
<!-- proof-end -->

### 直接確認：北極に達する可能性と、座標の限界

$k=h=2$、$I=2$、$Mgl=3$ なら北極へ近づく遠心項は $(k^2/(2I))\tan^2(\theta/2)=\tan^2(\theta/2)\to0$。$\varepsilon\ge3$ ならエネルギー不等式は北極への到達を排除しません。ただし **$h=k$ は必要条件であって到達の十分条件ではありません**。初期の運動域やエネルギーも必要です。南極側では $h\ne-k$ なので発散します。

もし $\theta=0$ を通過するなら、極で $\phi,\psi$ を別々の滑らかな座標として使うことはできません。[RBD3の姿勢更新](../RBD3/index.md#prop-rbd3-angular-conjugacy) $\dot R=R\widehat\omega_b$ など非特異な姿勢表示へ戻します。極で無理に $\sin^2\theta$ で割った式を評価してはいけません。
### 本章の結論を使う際の境界

全角運動量ベクトルが一定なのは外トルクが零のときの[RBD9の自由剛体の保存則](../RBD9/index.md#prop-rbd9-free-invariants)です。重いこまでは **鉛直・体軸の二成分**だけが一定です。また $l=0$ なら重力トルクは消え、重心が支点に一致する別模型へ退化します。理想支点が時間変化する、外部に摩擦トルクがある、重心が対称軸からずれる、といった場合には、循環座標や二つの角運動量保存の仮定を再確認する必要があります。

---

# 演習

## Level A

### 問題 A1：重心と支点の慣性を区別する

一様薄円板の質量を $M=2$、半径を $r=1$、円板中心と固定支点の距離を $l=1$ とする（単位は整合しているとする）。軸が円板法線に一致し、連結軸に質量がないとき、重心まわりと支点まわりの主慣性値を求めよ。$Mgl$ は $g=10$ のときいくらか。

- Level: A

<!-- solution-start -->
### 詳細解答

[RBD6の一様薄円板](../RBD6/index.md#prop-rbd6-uniform-disc)より $I_C=Mr^2/4=2/4=1/2$、$J_C=Mr^2/2=1$ です。[RBD6の平行軸公式](../RBD6/index.md#thm-rbd6-parallel-axis-tensor)で $Ml^2=2$ を横二成分へ足すので

$$
J_{O,b}=\operatorname{diag}(1/2+2,1/2+2,1)
=\operatorname{diag}(5/2,5/2,1).
$$

従って $I=5/2,J=1$、いずれも正です。また $Mgl=2\cdot10\cdot1=20$。重心まわりの $I_C=1/2$ をそのまま傾きの式へ代入してはいけません。
<!-- solution-end -->

### 問題 A2：重力トルクの方向

$n=(\sin\theta,0,\cos\theta)^{\mathsf T}$、$r_{OC}=ln$ とし、重力を $-Mg e_z$ とする。支点まわりのトルクの三成分と、鉛直成分が零になる理由を示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

[作用点によるトルク](../RBD7/index.md#def-rbd7-resultant-torque)を使って

$$
\begin{aligned}
\tau_{O,s}
&=(l\sin\theta,0,l\cos\theta)\times(0,0,-Mg)\\
&=(0,Mgl\sin\theta,0).
\end{aligned}
$$

従って $e_z\cdot\tau_{O,s}=0$。これは $n$ がこの断面内にある場合の成分例ですが、一般の $n$ でも $e_z\cdot(n\times e_z)=0$ です。$0<\theta<\pi$ ではトルク全体は零ではありません。
<!-- solution-end -->

### 問題 A3：循環座標の二運動量とエネルギー

$I=2,J=1,Mgl=3$、$\theta=\pi/2$、$\dot\theta=1$、$\dot\phi=3$、$\dot\psi=4$ の瞬間について $p_\phi,p_\psi,E$ を計算せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\cos(\pi/2)=0$、$\sin^2(\pi/2)=1$ より $u=\dot\psi+\dot\phi\cos\theta=4$ です。[二つの保存運動量と全エネルギー](#thm-rbd11-momenta-energy)に代入して

$$
k=Ju=1\cdot4=4,\qquad
h=I\dot\phi\sin^2\theta+k\cos\theta=2\cdot3=6.
$$

運動エネルギーは

$$
T=\frac22(1^2+3^2)+\frac12(4^2)=10+8=18.
$$

重力ポテンシャルは $U=3\cos(\pi/2)=0$ なので $E=18$ です。$\dot\psi=4$ が偶然 $u$ に等しいのは $\cos\theta=0$ のためです。
<!-- solution-end -->

### 問題 A4：有効ポテンシャルの三点比較

$I=2,J=1,Mgl=3,h=0,k=2$ とする。$V_{\mathrm{eff}}$ を $\theta=\pi/3,\pi/2,2\pi/3$ で計算し、$\varepsilon=1$ のとき各角度がエネルギー上許容されるか判定せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[有効ポテンシャルの定義](#def-rbd11-effective-potential)より

$$
V_{\mathrm{eff}}(\theta)=\frac{(0-2\cos\theta)^2}{4\sin^2\theta}+3\cos\theta
=\frac{\cos^2\theta}{\sin^2\theta}+3\cos\theta.
$$

$\pi/3$ では $1/3+3/2=11/6>1$ で不可、$\pi/2$ では $0\le1$ で可、$2\pi/3$ では $1/3-3/2=-7/6\le1$ で可です。これは許容性の判定であり、異なる許容成分の間を連続して移れるとは限りません。
<!-- solution-end -->

### 問題 A5：極での運動量条件

$h=2,k=2$ のとき北極と南極のどちらが有限な有効ポテンシャルの候補になるか答えよ。$h=-2,k=2$ のときはどう変わるか。

- Level: A

<!-- solution-start -->
### 詳細解答

[極の必要条件](#prop-rbd11-pole-conditions)では北極に $h=k$、南極に $h=-k$ が必要です。$h=k=2$ では北極条件を満たし南極条件は $2\ne-2$ で失敗するため南極側は発散します。逆に $h=-2,k=2$ なら南極条件だけを満たします。条件を満たした側でもエネルギーと連続した軌道の可到達性を別に確認する必要があります。
<!-- solution-end -->

## Level B

### 問題 B1：角運動量の成分を力学から導く

固定点 $O$ にある重い対称こまについて、$h=e_z\cdot L_{O,s}$ が保存し $k=e_3\cdot L_{O,b}$ が保存することを、力学的ラグランジアンの循環座標という語を使わず、支点まわりの角運動量収支から証明せよ。全ベクトルはなぜ一般に保存しないか。

- Level: B

<!-- solution-start -->
### 詳細解答

支点が固定されているので、[RBD7の基準点まわり角運動量収支](../RBD7/index.md#thm-rbd7-moving-origin)に $O$ を代入します。反力は $O$ に作用しトルクを持ちません。従って

$$
\dot L_{O,s}=r_{OC}\times(-Mg e_z)=-Mgl\,n\times e_z.
$$

$e_z$ は空間に固定されたベクトルなので

$$
\dot h=\frac{d}{dt}(e_z\cdot L_{O,s})
=e_z\cdot\dot L_{O,s}
=-Mgl\,e_z\cdot(n\times e_z)=0.
$$

次に物体系の角運動量は $L_{O,b}=J_{O,b}\omega_b=(I\omega_1,I\omega_2,J\omega_3)$ です。$O$ が固定点なので $L_{O,s}=R L_{O,b}$。[RBD3の角速度と姿勢の関係](../RBD3/index.md#prop-rbd3-angular-conjugacy) $\dot R=R\widehat\omega_b$ を用いて積を微分すると

$
\begin{aligned}
R^{\mathsf T}\dot L_{O,s}
&=R^{\mathsf T}(\dot R L_{O,b}+R\dot L_{O,b})\\
&=\omega_b\times L_{O,b}+J_{O,b}\dot\omega_b
=\tau_{O,b}.
\end{aligned}
$

従って [RBD7のEuler方程式](../RBD7/index.md#thm-rbd7-newton-euler)と同じ形の固定支点版

$
J_{O,b}\dot\omega_b+\omega_b\times(J_{O,b}\omega_b)=\tau_{O,b}
$

を、重心まわりの $J_C$ と混同せず得ます。

第三成分の交差項は

$$
(\omega_b\times J_{O,b}\omega_b)_3
=I\omega_1\omega_2-I\omega_2\omega_1=0
$$

です。また $\tau_{O,b}=(le_3)\times(R^{\mathsf T}(-Mg e_z))$ なので第三成分は零です。ゆえに $J\dot\omega_3=0$、$k=J\omega_3$ は一定です。対して $0<\theta<\pi$ では $|\tau_{O,s}|=Mgl\sin\theta>0$ だから、$\dot L_{O,s}\ne0$ で全ベクトルは一定ではありません。
<!-- solution-end -->

### 問題 B2：零の傾き速度は静止とは限らない

$I=2,J=1,Mgl=3,h=0,k=2$ とし、$\theta(0)=\pi/2$、$\dot\theta(0)=0$ とする。$\varepsilon$ と $\ddot\theta(0)$ を求め、傾きがその瞬間以降どちらへ動くかを示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

[エネルギー帰着](#thm-rbd11-reduced-theta)と[有効ポテンシャルの直接例](#def-rbd11-effective-potential)から $V_{\mathrm{eff}}(\pi/2)=0$。$\dot\theta(0)=0$ なので $\varepsilon=0$ です。正則域の逆変換では

$$
\dot\phi(0)=\frac{0-2\cos(\pi/2)}{2\sin^2(\pi/2)}=0.
$$

[傾きの二階式](#thm-rbd11-reduced-theta)の導出中の式へ $\theta=\pi/2,\dot\phi=0$ を代入すると

$$
I\ddot\theta(0)
=I\dot\phi(0)^2\sin\theta\cos\theta
-k\dot\phi(0)\sin\theta+Mgl\sin\theta
=3.
$$

従って $\ddot\theta(0)=3/2>0$。滑らかな運動のTaylor展開で $\theta(t)=\pi/2+(3/4)t^2+o(t^2)$ だから、十分小さい正の $t$ では $\theta(t)>\pi/2$ です。$\dot\theta=0$ は傾きの時間変化が瞬間的に零というだけで、静的平衡ではありません。エネルギー式を $\dot\theta$ で約分するとこの結論を失います。
<!-- solution-end -->

### 問題 B3：極での有限極限を半角公式で検算する

$I>0,Mgl>0$、$h=k\ne0$ とする。北極側で $V_{\mathrm{eff}}$ が有限となることを示し、その値を求めよ。エネルギー上、北極到達が可能となるための必要条件を $\varepsilon$ で表せ。南極側の挙動も述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[有効ポテンシャル](#def-rbd11-effective-potential)に $h=k$ を代入して

$$
V_{\mathrm{eff}}(\theta)
=\frac{k^2(1-\cos\theta)^2}{2I\sin^2\theta}
+Mgl\cos\theta.
$$

半角公式 $1-\cos\theta=2\sin^2(\theta/2)$、$\sin\theta=2\sin(\theta/2)\cos(\theta/2)$ から

$$
\frac{k^2(1-\cos\theta)^2}{2I\sin^2\theta}
=\frac{k^2}{2I}\tan^2\frac\theta2\to0.
$$

よって $\lim_{\theta\downarrow0}V_{\mathrm{eff}}=Mgl$。[許容条件](#thm-rbd11-reduced-theta)より $\varepsilon\ge Mgl$ は北極到達の必要条件です。$\theta\uparrow\pi$ では $h+k=2k\ne0$、分子が $4k^2$ に近づき分母が零に近づくため $V_{\mathrm{eff}}\to+\infty$。同一の有限エネルギーでは南極へ到達できません。必要条件が成立しても北極を通過することまでは保証しません。
<!-- solution-end -->

### 問題 B4：自転・歳差のない特別な場合

$h=k=0$、初期傾き $0<\theta_0<\pi$ とし、正則域で運動するとする。$\dot\phi,\dot\psi$、有効ポテンシャル、傾きの二階方程式を求め、$\theta=\pi/2$、$\dot\theta=0$ の瞬間の加速度の符号を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

[二つの保存運動量からの逆変換](#thm-rbd11-reduced-theta)の正則域では $I\sin^2\theta>0$ なので

$$
\dot\phi=\frac{0-0\cos\theta}{I\sin^2\theta}=0,\qquad
\dot\psi=\frac0J-\dot\phi\cos\theta=0.
$$

[有効ポテンシャル](#def-rbd11-effective-potential)は $V_{\mathrm{eff}}=Mgl\cos\theta$ です。従って[本章の二階式](#thm-rbd11-reduced-theta)は

$$
I\ddot\theta=-\frac{d}{d\theta}(Mgl\cos\theta)=Mgl\sin\theta.
$$

$\theta=\pi/2$ では $\ddot\theta=Mgl/I>0$、すなわち下向きへ倒れ始めます。支点は固定でも重力トルクが働くので、速度が一瞬零だからといって加速度は零ではありません。
<!-- solution-end -->

## Level C

### 問題 C1：保存する角運動量から傾きの可到達域と姿勢速度を復元する

固定点対称こまの定数を $I=2,J=1,Mgl=3$ とし、正則域での初期条件を

$$
\theta(0)=\frac\pi2,\quad
\dot\theta(0)=1,\quad
\dot\phi(0)=0,\quad
\dot\psi(0)=2
$$

とする。次を示せ。

1. $k,h,E,\varepsilon$ を計算し、$h$ の物理的意味を説明する。
2. $\theta=\pi/3$ と $\theta=2\pi/3$ の可否をエネルギーから判定する。
3. $\theta=2\pi/3$ を通る瞬間の $\dot\phi,\dot\psi$、および $\dot\theta^2$ を導出する。
4. この運動は有限エネルギーで北極・南極へ到達できるか。座標特異性と物理的な非到達性を区別して説明する。

- Level: C

<!-- solution-start -->
### 詳細解答

**1. 初期値から定数を構成する。** 初期の $\cos\theta=0,\sin^2\theta=1$ と、[二つの保存運動量と全エネルギー](#thm-rbd11-momenta-energy)により

$$
u(0)=\dot\psi(0)+\dot\phi(0)\cos\theta(0)=2,
$$

$$
k=Ju(0)=1\cdot2=2,\qquad
h=I\dot\phi(0)\sin^2\theta(0)+k\cos\theta(0)=0.
$$

[本章の鉛直角運動量の成分計算](#thm-rbd11-momenta-energy)より $h=e_z\cdot L_{O,s}$ です。これは全角運動量ベクトルのノルムや物体軸成分とは異なります。エネルギーは

$$
E=\frac I2(\dot\theta(0)^2+\dot\phi(0)^2\sin^2\theta(0))
+\frac{k^2}{2J}+Mgl\cos\theta(0)
=1+2+0=3,
$$

$$
\varepsilon=E-\frac{k^2}{2J}=3-2=1.
$$

**2. 許容域を検査する。** [有効ポテンシャル](#def-rbd11-effective-potential)は

$$
V_{\mathrm{eff}}(\theta)=
\frac{(0-2\cos\theta)^2}{4\sin^2\theta}+3\cos\theta
=\frac{\cos^2\theta}{\sin^2\theta}+3\cos\theta.
$$

$\theta=\pi/3$ では $V_{\mathrm{eff}}=11/6>1=\varepsilon$ で非許容。一方 $\theta=2\pi/3$ では $V_{\mathrm{eff}}=-7/6<1$ なので許容です。さらに「$\theta=2\pi/3$ で許容」という一点だけで、初期位置からそこへ達することまでは結論できません。途中の角度も確認します。区間 $\pi/2\le\theta\le2\pi/3$ で $x=-\cos\theta$ と置けば $0\le x\le1/2$ であり、

$
V_{\mathrm{eff}}=\frac{x^2}{1-x^2}-3x,\qquad
\frac{dV_{\mathrm{eff}}}{dx}=\frac{2x}{(1-x^2)^2}-3
\le\frac{1}{(3/4)^2}-3=-\frac{11}{9}<0.
$

従ってこの全区間で $V_{\mathrm{eff}}(\theta)\le V_{\mathrm{eff}}(\pi/2)=0<\varepsilon=1$ です。[傾きの一変数帰着](#thm-rbd11-reduced-theta)より $\dot\theta^2=(2/I)(\varepsilon-V_{\mathrm{eff}})\ge1$ であり、途中に折返し点はありません。初速 $\dot\theta(0)=1>0$ が連続するので $\dot\theta$ の符号は正のまま、実際に $\theta=2\pi/3$ を通過します。

**3. 正則域で角度速度を復元する。** $\theta=2\pi/3$ では $\cos\theta=-1/2,\sin^2\theta=3/4$。[保存運動量からの逆変換](#thm-rbd11-reduced-theta)から

$$
\dot\phi=
\frac{h-k\cos\theta}{I\sin^2\theta}
=\frac{0-2(-1/2)}{2(3/4)}
=\frac{1}{3/2}=\frac23,
$$

$$
\dot\psi=\frac{k}{J}-\dot\phi\cos\theta
=2-\frac23\left(-\frac12\right)
=\frac73.
$$

傾きの二乗速度は、[エネルギー帰着](#thm-rbd11-reduced-theta)に代入して

$$
\dot\theta^2=\frac{2}{I}(\varepsilon-V_{\mathrm{eff}})
=1\left(1-\left(-\frac76\right)\right)=\frac{13}{6}.
$$

この段階では二乗からは符号を決められません。軌道の向きは初期速度と二階の方程式から決めます。

**4. 極の可到達性。** [極の必要条件](#prop-rbd11-pole-conditions)によれば北極へは $h=k$、南極へは $h=-k$ が必要です。ここでは $h=0,k=2$ なので両方とも満たしません。実際、極に近づくと遠心項が正の無限大となり、有限な $\varepsilon=1$ の許容域から排除されます。これは単にEuler角が重複するために式が使えなくなったという話ではなく、この初期値で**実際に両極へ到達できない**という物理的な判定です。
<!-- solution-end -->
