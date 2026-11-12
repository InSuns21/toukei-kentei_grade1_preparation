# CTM9 仕事と熱はエネルギー収支でどう結ばれるか

[CTM7 の運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)は、物体がどのように加速するかを決める。[CTM8 の仕事共役](../CTM8/index.md#thm-ctm8-work-conjugacy)は、応力が変形に対して行う仕事率を三通りに計算できることを示した。しかし、同じ力で物体を変形させても、運動が速くなるだけとは限らない。温まったり、内部にエネルギーが蓄えられたりする。

この差を数量化するため、まず**力学的な運動エネルギー以外のエネルギー**を導入し、物質領域に出入りする仕事と熱をすべて数える。そして全エネルギーの収支から、すでに分かっている運動エネルギーの収支を差し引く。こうして材料の内部で何が起こるかを表す式を得る。

## 0. 物体・記号・次元と符号

[CTM1 の運動写像](../CTM1/index.md#def-ctm1-motion-configuration)を $\chi:\Omega_0\times I\to\mathbb R^3$ とする。各時刻に $\chi_t$ は向きを保つ $C^2$ 級微分同相で、$x=\chi(X,t)$、$\Omega_t=\chi_t(\Omega_0)$ である。区分的 $C^1$ 境界を持つ任意の有界物質領域 $U_t=\chi_t(U_0)$ を考える。導出に必要な場は連続微分可能で、時間微分と体積積分、発散定理、変数変換を適用できるとする。

- [CTM5 の密度と質量保存](../CTM5/index.md#prop-ctm5-density-jacobian)：$\rho(x,t)>0$、$\rho_0(X)=J\rho(\chi(X,t),t)>0$、$J=\det F>0$、$F=D_X\chi$。単位は密度が kg/m$^3$、$F,J$ は無次元。
- [CTM4 の速度勾配と変形速度](../CTM4/index.md#def-ctm4-rate-of-deformation-spin)：$v(x,t)=\partial_t\chi(X,t)$、$L=\nabla_xv$、$D=(L+L^T)/2$。$D$ の単位は s$^{-1}$。
- [CTM6 の面力](../CTM6/index.md#def-ctm6-traction)：現在配置の外向き単位法線 $n$ に対し、単位現在面積の力は $\sigma n$。$\sigma$ は Pa = N/m$^2$、$b$ は単位質量当たりの体積力 N/kg。古典的 Cauchy 連続体に対する[角運動量の帰結](../CTM7/index.md#prop-ctm7-angular-stress)から $\sigma=\sigma^T$ とする。
- [VC9 の物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)を、この章の空間速度 $v$ に対して $D_tf:=\partial_t f+v\cdot\nabla_x f$ と書く。$\partial_t f$ は現在位置 $x$ を固定した微分、$D_tf$ は同じ物質点に沿う変化率で、ベクトル場には成分ごとに作用する。$D_tv$ は物質加速度である。$\operatorname{div}_x$ は現在座標の発散、$\operatorname{Div}_X$ は基準座標の発散。
- 時間は s、仕事・エネルギーは J = N m、仕事率・熱流率は W = J/s。内積 $A:B=\sum_{i,j}A_{ij}B_{ij}$ を使う。
- $e_i$（$i=1,2,3$）は $\mathbb R^3$ の固定直交座標の標準基底であり、例えば $e_1=(1,0,0)^T$、$e_2=(0,1,0)^T$。物質ラベルと現在位置の両方をこの座標で成分表示する。

この講でいう**温度** $T(x,t)>0$ は、熱的な状態を表す絶対温度（単位 K）である。温度と内部エネルギーの関係はまだ仮定しない。「温度が高いから必ずある向きへ熱が流れる」とする法則も、後で導入する材料固有の規則である。

ここで空間表示の $D_tf$ と、基準表示の $\partial_t(f\circ\chi)$ の対応を確認する。滑らかなスカラー場 $f(x,t)$ に対し、$X$ を固定し $x=\chi(X,t)$ を動かして[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を使えば、

$$
\begin{aligned}
\partial_t(f\circ\chi)(X,t)
&=(\partial_t f)(\chi(X,t),t)
+\sum_{i=1}^{3}(\partial_{x_i}f)(\chi(X,t),t)\,\partial_t\chi_i(X,t)\\
&=(\partial_t f+v\cdot\nabla_x f)(\chi(X,t),t)
=(D_tf)(\chi(X,t),t).
\end{aligned}
$$

最後の等式では $v(\chi(X,t),t)=\partial_t\chi(X,t)$ を使った。この対応は $f=e$ の内部エネルギーだけでなく、$f=k$ の運動エネルギーでも成立する。

## 1. エネルギーを分け、熱の出入りに符号を付ける

質量 $m$ の塊が速さ $|v|$ で動くとき、運動エネルギーは $m|v|^2/2$ である。連続体では、単位質量当たりの運動エネルギーを $k=|v|^2/2$（J/kg）と置く。伸びや内部の熱的状態などに伴う、それ以外のエネルギーを単位質量当たりの**比内部エネルギー** $e$（J/kg）で表す。全エネルギーの密度は $\rho(k+e)$（J/m$^3$）となる。

また、物体の小さな面を通る**熱流束** $q(x,t)$ は、ある方向の単位面積・単位時間当たりに運ばれる熱エネルギーのベクトル（W/m$^2$）である。外向き法線 $n$ に対し $q\cdot n>0$ は外へ出る熱、$q\cdot n<0$ は内へ入る熱である。面を通らない局所的な加熱は、単位質量当たりの**熱供給率** $r(x,t)$（W/kg）で表す。$r>0$ が加熱、$r<0$ が冷却である。

<a id="def-ctm9-internal-energy"></a>

<!-- formal-statement-start -->
### 定義（比内部エネルギーと全エネルギー）

三次元の物質領域 $U_t$ で、現在の質量密度 $\rho(x,t)>0$、速度 $v(x,t)$、比内部エネルギー $e(x,t)$（J/kg）が与えられたとする。単位質量当たりの運動エネルギーを $k=|v|^2/2$ とし、領域の内部エネルギー $E_{\mathrm{int}}$、運動エネルギー $K$、全エネルギー $E_{\mathrm{tot}}$ を

$$
E_{\mathrm{int}}(t)=\int_{U_t}\rho e\,dV,\qquad
K(t)=\int_{U_t}\rho k\,dV,\qquad
E_{\mathrm{tot}}(t)=K(t)+E_{\mathrm{int}}(t)
$$

で定める。各量の単位は J である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm9-internal-energy -->
### **定義の確認**：一様な物体のエネルギーを数える

体積 $V=2$ m$^3$、密度 $\rho=3$ kg/m$^3$、速さ $|v|=4$ m/s、比内部エネルギー $e=10$ J/kg が一様な物体を考える。質量は $\rho V=6$ kg、$k=4^2/2=8$ J/kg だから、$K=6\cdot8=48$ J、$E_{\mathrm{int}}=6\cdot10=60$ J、$E_{\mathrm{tot}}=108$ J。積分式の単位は $(\mathrm{kg/m^3})(\mathrm{J/kg})\mathrm{m^3}=\mathrm J$ となり、三量の関係も確かめられる。
<!-- definition-example-end -->

<a id="def-ctm9-heat-transport"></a>

<!-- formal-statement-start -->
### 定義（熱流束と熱供給率）

現在配置の物質領域 $U_t\subset\mathbb R^3$ に対し、熱流束 $q:\Omega_t\times I\to\mathbb R^3$（W/m$^2$）と、比熱供給率 $r:\Omega_t\times I\to\mathbb R$（W/kg）を与える。外向き単位法線 $n$ の境界を通る**外から内部への正味熱入力率**と体積内の熱入力率を、それぞれ

$$
H_{\partial U}(t):=-\int_{\partial U_t}q\cdot n\,dS,
\qquad
H_U(t):=\int_{U_t}\rho r\,dV
$$

と定める。どちらも単位は W であり、正なら領域へエネルギーが入る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm9-heat-transport -->
### **定義の確認**：二枚の面の符号

面積 $A>0$、厚さ $L>0$ の静止した直方体で $q=q_*e_1$、$q_*>0$ W/m$^2$、$r=0$ とする。左端の法線は $-e_1$、右端は $+e_1$ なので、左端で $q\cdot n=-q_*$（熱が入る）、右端で $q\cdot n=q_*$（熱が出る）。両面の積分和は $-q_*A+q_*A=0$、側面の積はゼロ。したがって $H_{\partial U}=0$ であり、熱は通過しても**正味では蓄積しない**。さらに一様密度 $\rho_*$ と $r_*>0$ を与えれば $H_U=\rho_*r_*AL>0$ である。法線・符号・単位・面と体積の両入力を確認した。
<!-- definition-example-end -->

## 2. 全エネルギーを保存するとはどういうことか

[CTM7 の運動量原理](../CTM7/index.md#principle-ctm7-material-balances)と同様に、全エネルギーについても物理的な収支原理を課す。運動量保存だけから証明されるものではなく、外力の仕事と熱の授受をエネルギー変化へ結び付ける追加の原理である。

<a id="principle-ctm9-total-energy"></a>

<!-- formal-statement-start -->
### 原理（物質領域の全エネルギー収支）

質量が保存される三次元の古典的 Cauchy 連続体と、任意の有界で区分的 $C^1$ 境界をもつ物質領域 $U_t$ を考える。現在密度 $\rho>0$、速度 $v$、対称 Cauchy 応力 $\sigma$、単位質量当たりの体積力 $b$、比内部エネルギー $e$、熱流束 $q$、比熱供給率 $r$ が上記積分を微分できる滑らかさを持つとする。外向き単位法線を $n$ としたとき、この全エネルギー収支原理を

$$
\boxed{
\frac{d}{dt}\int_{U_t}\rho\left(\frac{|v|^2}{2}+e\right)dV
=\int_{\partial U_t}(\sigma n)\cdot v\,dS
+\int_{U_t}\rho b\cdot v\,dV
-\int_{\partial U_t}q\cdot n\,dS
+\int_{U_t}\rho r\,dV
}
$$

とする。右辺は順に境界面力の仕事率、体積力の仕事率、境界からの熱入力率、体積内の熱入力率である。
<!-- formal-statement-end -->

例えば外から押されて境界が動けば $(\sigma n)\cdot v$ が正にも負にもなる。一方、熱流束は**外向きに定義**したので、熱が外へ流れるほど右辺は減少する。これらを先に別々に数えると、後の符号誤りを防げる。

## 3. 運動エネルギーの式を独立に導く

全エネルギーの変化には、加速による運動エネルギーの変化が含まれている。[局所運動量方程式](../CTM7/index.md#thm-ctm7-material-momentum)に速度 $v$ を内積として掛け、応力の力がどこへ使われたかを分離する。

<a id="thm-ctm9-kinetic-balance"></a>

<!-- formal-statement-start -->
### 定理（運動エネルギーの局所・積分収支）

三次元の滑らかな質量保存流 $\rho>0,v$ と、滑らかな対称応力 $\sigma=\sigma^T$、体積力 $b$ が

$$
\rho D_tv=\operatorname{div}_x\sigma+\rho b
$$

を満たすとする。$k=|v|^2/2$、$D=(\nabla_xv+\nabla_xv^T)/2$ とおくと、各点で

$$
\boxed{\rho D_tk=\operatorname{div}_x(\sigma^Tv)-\sigma:D+\rho b\cdot v}
$$

が成り立つ。任意の滑らかな物質領域 $U_t$ では

$$
\boxed{
\frac{d}{dt}\int_{U_t}\rho k\,dV
=\int_{\partial U_t}(\sigma n)\cdot v\,dS
-\int_{U_t}\sigma:D\,dV+\int_{U_t}\rho b\cdot v\,dV
}
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

速度を掛けると左辺が運動エネルギーの時間微分になる。右辺の応力発散に積の微分を適用すると、境界から流入する機械的な仕事と、内部で行われる $\sigma:D$ の仕事率に分かれる。応力の対称性により回転成分は仕事をしない。

<!-- proof-start -->
### 証明

まず各成分について $D_tk=D_t(\sum_iv_i^2/2)=\sum_iv_iD_tv_i$ である。[CTM7 の局所運動量方程式](../CTM7/index.md#thm-ctm7-material-momentum)へ $v_i$ を掛けて和を取る。

$$
\rho D_tk=\sum_{i,j}v_i\partial_{x_j}\sigma_{ij}+\rho b\cdot v.
$$

積の微分を省略せずに開くと

$$
\begin{aligned}
\sum_{i,j}v_i\partial_{x_j}\sigma_{ij}
&=\sum_{i,j}\partial_{x_j}(\sigma_{ij}v_i)
-\sum_{i,j}\sigma_{ij}\partial_{x_j}v_i\\
&=\operatorname{div}_x(\sigma^Tv)-\sigma:L.
\end{aligned}
$$

[変形速度テンソルとスピンテンソル](../CTM4/index.md#def-ctm4-rate-of-deformation-spin)より $L=D+W$、$W^T=-W$。[古典的応力の対称性](../CTM7/index.md#prop-ctm7-angular-stress)で $\sigma_{ij}=\sigma_{ji}$ なので

$$
\sigma:W=\sum_{i<j}(\sigma_{ij}W_{ij}+\sigma_{ji}W_{ji})
+\sum_i\sigma_{ii}W_{ii}=0.
$$

従って $\sigma:L=\sigma:D$ で局所式を得る。[物質領域 Reynolds 輸送定理](../CTM5/index.md#thm-ctm5-material-reynolds)に質量保存を組み合わせると、任意の比エネルギー $f$ に対して

$$
\frac{d}{dt}\int_{U_t}\rho f\,dV
=\int_{U_t}\rho D_tf\,dV
$$

である。$f=k$ を代入して局所式を積分し、[Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を $\sigma^Tv$ に適用する。境界では $(\sigma^Tv)\cdot n=v\cdot(\sigma n)$ であり、積分式が従う。 $\square$
<!-- proof-end -->

ここで $\sigma:D$ は単位**現在体積**当たりの応力仕事率（W/m$^3$）である。運動エネルギー式ではマイナス符号で現れ、内部エネルギー式ではプラス符号になる。これは仕事を二度数えないための帳尻である。

## 4. 全エネルギーから運動を差し引く

<a id="thm-ctm9-internal-energy"></a>

<!-- formal-statement-start -->
### 定理（内部エネルギーの局所収支）

三次元の古典的 Cauchy 連続体で、質量保存、局所運動量収支、対称応力 $\sigma=\sigma^T$、[物質領域の全エネルギー収支](#principle-ctm9-total-energy)が任意の滑らかな物質領域で成立するとする。$\rho>0$、$v,\sigma,e,q,r$ は微分・積分・発散定理が適用できるだけ滑らかである。$D=\operatorname{sym}\nabla_xv$ とすると、各点で

$$
\boxed{\rho D_te=\sigma:D-\operatorname{div}_xq+\rho r}
$$

が成立する。逆に、同じ仮定でこの局所式が成立すれば、運動量収支と合わせて任意の物質領域の全エネルギー収支が成立する。各項の単位は W/m$^3$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[物質領域の全エネルギー収支](#principle-ctm9-total-energy)から [運動エネルギーの局所・積分収支](#thm-ctm9-kinetic-balance)を引く。面力と体積力による仕事率は相殺し、内部での応力仕事率と二種類の熱入力だけが残る。任意領域の積分等式を局所化する。

<!-- proof-start -->
### 証明

[物質領域の全エネルギー収支](#principle-ctm9-total-energy)の左辺を $K+E_{\mathrm{int}}$ に分け、[運動エネルギーの積分収支](#thm-ctm9-kinetic-balance)を差し引く。境界面力仕事率 $\int_{\partial U_t}(\sigma n)\cdot v$ と体積力仕事率 $\int_{U_t}\rho b\cdot v$ が両辺で正確に打ち消されるので

$$
\frac{d}{dt}\int_{U_t}\rho e\,dV
=\int_{U_t}\sigma:D\,dV
-\int_{\partial U_t}q\cdot n\,dS
+\int_{U_t}\rho r\,dV.
$$

[質量保存下の Reynolds 輸送定理](../CTM5/index.md#thm-ctm5-material-reynolds)を左辺の $f=e$ に適用し、[Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を $q$ に適用する。

$$
\int_{U_t}\left(\rho D_te-\sigma:D+\operatorname{div}_xq-\rho r\right)dV=0.
$$

$U_t$ は任意で括弧内が連続だから、もしある点で非ゼロなら、その近傍の小球では符号が一定で積分がゼロにならない。従って括弧内は各点でゼロである。逆向きは局所式を積分して発散定理と輸送定理を逆順に使い、運動エネルギー積分式を足せばよい。 $\square$
<!-- proof-end -->

各項の役割を区別しよう。$\rho D_te$ は蓄積率、$\sigma:D$ は機械的な仕事による変化、$-\operatorname{div}_xq$ は**熱流入 − 熱流出**、$\rho r$ は面を経由しない加熱である。$q\ne0$ でも発散がゼロなら、熱が単に通り抜けているだけなので局所的な熱入力はゼロである。

### 境界条件は熱入力そのものを指定する

壁が断熱なら $q\cdot n=0$ を課す。境界から一定の熱を入れたいなら、外向き法線で $q\cdot n=-h$（$h>0$ W/m$^2$）と書く。逆に $q\cdot n=+h$ は冷却である。温度 $T$ を境界で指定する条件も考えられるが、それだけでは $q$ を求められない。$q$ と温度勾配の関係、$e$ と温度の関係は**別に選ぶ構成則**であり、この収支原理だけから自動的に決まらない。

### **計算例**：熱だけを与え、温度を上げる

静止物体で $v=0$、$\sigma:D=0$、$q=0$、一様な $\rho=\rho_*>0$ と $r=r_*>0$ を仮定する。局所式は $\rho_*\partial_te=\rho_*r_*$ なので、$e(t)=e(0)+r_*t$。さらに**模型の仮定として**一定の比熱容量 $c>0$（J/(kg K)）と参照温度 $T_{\rm ref}$ を使い

$$
e=c(T-T_{\rm ref})
$$

と置く場合に限り、$c\,\partial_tT=r_*$、従って $T(t)=T(0)+(r_*/c)t$ となる。例えば $r_*=20$ W/kg、$c=500$ J/(kg K) なら温度上昇率は $0.04$ K/s。質量密度を二重に掛けないことにも注意する。

## 5. 同じ収支を基準配置で検算する

固体の変形を記述するとき、熱流束も基準領域で表せる。[CTM2 の Nanson 面積変換](../CTM2/index.md#thm-ctm2-nanson)から

$$
(q\circ\chi)\cdot n\,da
=(q\circ\chi)\cdot JF^{-T}N\,dA
=\left(JF^{-1}(q\circ\chi)\right)\cdot N\,dA.
$$

このため基準面積当たりの外向き熱流束を $Q=JF^{-1}(q\circ\chi)$（W/m$^2$）と置く。$Q$ は基準法線 $N$ と内積を取る量で、同じ物理的な熱を表す。力の [第一 Piola 応力](../CTM8/index.md#def-ctm8-first-piola) $P=J(\sigma\circ\chi)F^{-T}$ とは行列の掛かる位置が違う。以下、$\dot F=\partial_tF(X,t)$ は物質ラベル $X$ を固定した時間微分であり、[速度勾配と変形勾配の時間変化](../CTM4/index.md#prop-ctm4-velocity-deformation)に対応する。

<a id="prop-ctm9-reference-energy"></a>

<!-- formal-statement-start -->
### 命題（基準配置での内部エネルギー収支）

三次元の向きを保つ滑らかな運動写像 $\chi$ で $F=D_X\chi$ が可逆、$J=\det F>0$ とし、質量保存により $\rho_0=J(\rho\circ\chi)>0$ は時間不変とする。滑らかな Cauchy 応力 $\sigma=\sigma^T$、比内部エネルギー $e$、現在熱流束 $q$、比熱供給率 $r$ が内部エネルギー局所収支を満たすとする。$P=J(\sigma\circ\chi)F^{-T}$、$Q=JF^{-1}(q\circ\chi)$ と置くと

$$
\boxed{
\rho_0\partial_t(e\circ\chi)=P:\dot F-\operatorname{Div}_XQ+\rho_0(r\circ\chi)
}
$$

が成り立つ。ここで $\partial_t$ は $X$ を固定した時間微分である。各項は基準体積当たりの W/m$^3$。
<!-- formal-statement-end -->

### 証明の見取り図

体積倍率 $J$ を局所式に掛ける。物質微分は $X$ 固定の微分になり、応力仕事は CTM8 の仕事共役で置き換える。熱の発散は同じ面を基準・現在の両側で積分して変換する。

<!-- proof-start -->
### 証明

[現在配置の内部エネルギー収支](#thm-ctm9-internal-energy)を $x=\chi(X,t)$ で評価して $J$ を掛けると

$$
J\rho(D_te)\circ\chi
=J(\sigma:D)\circ\chi-J(\operatorname{div}_xq)\circ\chi+J\rho(r\circ\chi).
$$

質量保存から左辺は $\rho_0\partial_t(e\circ\chi)$、末項は $\rho_0(r\circ\chi)$ になる。[Piola 応力の仕事共役](../CTM8/index.md#thm-ctm8-work-conjugacy)より中央の機械項は $J(\sigma:D)\circ\chi=P:\dot F$。

熱の発散は、任意の物質領域 $U_0$ に対して [Nanson の公式](../CTM2/index.md#thm-ctm2-nanson)と [Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を順に使うと

$$
\begin{aligned}
\int_{U_0}\operatorname{Div}_XQ\,dV
&=\int_{\partial U_0}Q\cdot N\,dA\\
&=\int_{\partial U_t}q\cdot n\,da\\
&=\int_{U_t}\operatorname{div}_xq\,dv\\
&=\int_{U_0}J(\operatorname{div}_xq)\circ\chi\,dV.
\end{aligned}
$$

両辺の被積分関数は連続、領域は任意だから $\operatorname{Div}_XQ=J(\operatorname{div}_xq)\circ\chi$。これを上式へ代入すれば結論を得る。 $\square$
<!-- proof-end -->

### **変換の確認**：一軸伸長で熱流束と仕事率を往復する

$F=\operatorname{diag}(\lambda,1,1)$、$\lambda>0$、$\dot F=\operatorname{diag}(\dot\lambda,0,0)$、$\sigma=\operatorname{diag}(p,0,0)$、$q=q_*e_1$（空間一定）とする。$J=\lambda$、$F^{-1}=\operatorname{diag}(1/\lambda,1,1)$ なので $P=\operatorname{diag}(p,0,0)$、$Q=q_*e_1$、$\operatorname{Div}_XQ=0$。現在側では $D_{11}=\dot\lambda/\lambda$ で

$$
P:\dot F=p\dot\lambda
=J\sigma:D=\lambda p\,\frac{\dot\lambda}{\lambda},
\qquad
\operatorname{Div}_XQ=J\operatorname{div}_xq=0.
$$

単位基準面積の熱流束と、単位**基準体積**の仕事率の両方が整合する。
## 6. 典型的な取り違え

- 外向き $q\cdot n>0$ は**物体から出る**。全エネルギー収支で熱流束の項を $+\int q\cdot n$ とすると加熱と冷却が逆転する。
- $\sigma:D$ は現在単位体積当たり、$P:\dot F$ は基準単位体積当たりであり、後者に $J$ を再び掛けない。
- 温度 $T$ と比内部エネルギー $e$ は別の量で、$e=cT$ という関係をエネルギー収支の結論として勝手に導入しない。
- $\sigma:D$ は負にもなりうる。第二法則による散逸の非負性や、材料が弾性エネルギーをどう貯蔵するかは、この収支式だけでは判定できない。

## 演習

### Level A

### A1. 断熱と熱の流入の符号

直方体の左面・右面はともに面積 $A$。右向きに一定の熱流束 $q_*>0$（W/m$^2$）があり、側面熱流束はゼロとする。(i) 左右の $q\cdot n$ を求めよ。(ii) 正味境界熱入力率を計算せよ。(iii) 右面だけから追加で $h>0$ W/m$^2$ の熱を外へ逃すとき、正味入力率はどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

(i) 右向きを $e_1$ とすれば $q=q_*e_1$。左面の外向き法線は $-e_1$ なので $q\cdot n=-q_*$、右面は $+e_1$ で $q\cdot n=q_*$。(ii) [熱流束の定義](#def-ctm9-heat-transport)から $H_{\partial U}=-[(-q_*A)+(q_*A)]=0$。(iii) 右面の流出を $q_*+h$ にすれば $H_{\partial U}=-[-q_*A+(q_*+h)A]=-hA$ W。負の符号は外へ失う熱を表す。
<!-- solution-end -->

### A2. 応力が回転に仕事をしないこと

$\sigma=\operatorname{diag}(p,0,0)$（Pa）、$L=\begin{pmatrix}a&-\omega&0\\\omega&0&0\\0&0&0\end{pmatrix}$（s$^{-1}$）とする。$D$ と $\sigma:D$ を求め、$\omega$ が結果に現れないことを確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[変形速度の定義](../CTM4/index.md#def-ctm4-rate-of-deformation-spin)から $L^T=\begin{pmatrix}a&\omega&0\\-\omega&0&0\\0&0&0\end{pmatrix}$。従って $D=(L+L^T)/2=\operatorname{diag}(a,0,0)$。成分の二重内積より $\sigma:D=pa$ W/m$^3$。非対角の $\omega$ は反対称部分にしか現れず、[運動エネルギー収支の証明](#thm-ctm9-kinetic-balance)の $\sigma:W=0$ と一致する。
<!-- solution-end -->

### A3. 比熱容量を仮定した加熱

静止・断熱・応力仕事ゼロの均質な物体で $r=30$ W/kg とする。模型として $e=c(T-T_{\rm ref})$、$c=600$ J/(kg K) を仮定する。$T(0)=280$ K のとき $T(10\ \mathrm s)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[内部エネルギーの局所収支](#thm-ctm9-internal-energy)の $D_te=\partial_te$、$\sigma:D=0$、$\operatorname{div}_xq=0$ を代入すると $\rho\partial_te=\rho r$。$\rho>0$ なので $\partial_te=r$。模型の微分で $\partial_te=c\partial_tT$、よって $\partial_tT=30/600=0.05$ K/s。積分して $T(10)=280+0.05\cdot10=280.5$ K。$c$ は物性の仮定であり全エネルギー収支そのものではない。
<!-- solution-end -->

### A4. 基準面を通る熱流束

$F=\operatorname{diag}(2,3,1)$、$q=(4,5,0)^T$ W/m$^2$ は現在配置で一様とする。$J$ と $Q=JF^{-1}q$ を求め、基準面 $N=e_1,e_2$ から外へ出る熱流率を単位基準面積当たりで示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$J=2\cdot3\cdot1=6>0$、$F^{-1}=\operatorname{diag}(1/2,1/3,1)$ である。現在側の一様な $q$ を基準側に引き戻すと、

$$
Q=JF^{-1}q
=6(2,5/3,0)^T=(12,10,0)^T\quad\text{W/m}^2.
$$

基準面 $N=e_1,e_2$ からの外向き流率密度は、それぞれ $Q\cdot e_1=12$、$Q\cdot e_2=10$ W/m$^2$ である。これが面積での判定と一致する理由も確かめよう。[Nanson の公式](../CTM2/index.md#thm-ctm2-nanson)による現在面の面積倍率は $|JF^{-T}N|$ だから、

$$
JF^{-T}e_1=3e_1,\qquad JF^{-T}e_2=2e_2.
$$

したがって現在面での熱流束の法線成分と面積倍率を掛けると、$4\cdot3=12$、$5\cdot2=10$ となる。これは $Q\cdot N$ が表す**単位基準面積当たりの流率**に等しい。
<!-- solution-end -->

### Level B

### B1. 単純せん断の機械的な内部エネルギー増分

密度一定 $\rho_*>0$、運動 $\chi(X,t)=(X_1+\gamma_0tX_2,X_2,X_3)$（$\gamma_0>0$ s$^{-1}$）、応力 $\sigma_{12}=\sigma_{21}=\tau>0$ Pa、他の成分ゼロ、熱流束 $q=0$、供給率 $r=r_*$（一定）とする。応力仕事率と $e(t)-e(0)$ を求め、外力 $b=0$ で運動量収支も満たされることを確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

速度は $v=(\gamma_0x_2,0,0)$。よって $L_{12}=\gamma_0$、他はゼロ、$D_{12}=D_{21}=\gamma_0/2$。応力対称性から

$$
\sigma:D=\tau\frac{\gamma_0}{2}+\tau\frac{\gamma_0}{2}=\tau\gamma_0.
$$

[局所内部エネルギー式](#thm-ctm9-internal-energy)に代入すると $\rho_*D_te=\tau\gamma_0+\rho_*r_*$。右辺は空間・時間に依存しないので、各物質点の初期値から

$$
e(X,t)-e(X,0)=\left(\frac{\tau\gamma_0}{\rho_*}+r_*\right)t.
$$

運動は $X$ を固定すると $\partial_t^2\chi=0$、つまり $D_tv=0$。$\sigma$ は空間一様なので $\operatorname{div}_x\sigma=0$。従って[局所運動量式](../CTM7/index.md#thm-ctm7-material-momentum)は $0=0+\rho_*b$、$b=0$ で成立する。温度上昇は $e$ と $T$ の構成関係なしには確定しない。
<!-- solution-end -->

### B2. 熱が出入りする棒の全体と局所を照合する

静止した直方体 $0<x_1<L$、横断面積 $A$、密度 $\rho_*>0$ で、応力仕事率ゼロ、$q=(q_*+ax_1)e_1$、$q_*,a$ は時刻一定、$r=r_*$ とする。$q_*$ の単位は W/m$^2$、$a$ は W/m$^3$。(i) $D_te$ を求めよ。(ii) 左右の熱流率を積分し、全体の内部エネルギー変化率が局所式の積分と一致することを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(i) $\operatorname{div}_xq=\partial_{x_1}(q_*+ax_1)=a$。従って [内部エネルギー式](#thm-ctm9-internal-energy)より $\rho_*\partial_te=-a+\rho_*r_*$、すなわち $\partial_te=r_*-a/\rho_*$（J/(kg s)）。(ii) 左面の外向き法線は $-e_1$ なので外向き流量は $-q_*A$、右面では $(q_*+aL)A$。正味の外向き熱は $aLA$、熱入力は $-aLA$。体積源は $\rho_*r_*LA$ だから、全体式では

$$
\frac{dE_{\rm int}}{dt}=-aLA+\rho_*r_*LA.
$$

局所式を全体積 $LA$ で積分しても $(\rho_*r_*-a)LA$。両者は一致し、一定成分 $q_*$ は左右を通過するだけなので蓄積に寄与しない。
<!-- solution-end -->

### B3. 剛体回転中に仕事と熱が通過する場合

$\chi(X,t)=R(t)X$、$R(t)\in SO(3)$ は $C^2$ 級、密度は運動に沿って一定、$\sigma=-pI_3$（$p$ は一定 Pa）、$q=q_0$（空間一様な定ベクトル、W/m$^2$）、$r=0$ とする。各時刻の $\sigma:D$、$\operatorname{div}_xq$、$Q=JF^{-1}q$、$\operatorname{Div}_XQ$、$D_te$ を求めよ。必要な体積力は運動量方程式で与えてよい。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず $F=R$、$J=\det R=1$、$\dot F=\dot R$ である。$R^TR=I_3$ より $X=R^Tx$ である。同じ物質点の速度を現在座標で書き直し、$x$ で微分すると、

$$
v(x,t)=\partial_t\chi(R^Tx,t)=\dot RR^Tx,\qquad
L=\nabla_xv=\dot RR^T.
$$

次に $RR^T=I_3$ を時間で微分する。この微分は $X$ 固定の $F$ の微分と区別し、$R(t)$ の通常の時間微分として行う。

$$
\dot RR^T+R\dot R^T=0,\qquad
L^T=R\dot R^T=-\dot RR^T=-L.
$$

ゆえに $L$ は反対称、$D=(L+L^T)/2=0$。[CTM3 の線素長さの判定](../CTM3/index.md#prop-ctm3-length-criterion)とも整合する。したがって $\sigma:D=0$ であり、回転だけでは応力による内部仕事率を生まない。

現在熱流束 $q_0$ は空間一定だから $\operatorname{div}_xq_0=0$。基準熱流束は

$$
Q=JF^{-1}q_0=R^Tq_0.
$$

$Q$ は時刻だけに依存し、$\operatorname{Div}_XQ=0$。[局所内部エネルギー収支](#thm-ctm9-internal-energy)へ代入すると $\rho D_te=0$、$\rho>0$ より $D_te=0$。

なお回転を維持する体積力は [運動量方程式](../CTM7/index.md#thm-ctm7-material-momentum)から $b=D_tv$ と選べる。これは $\operatorname{div}\sigma=0$ による。回転を支持する力の仕事と内部への応力仕事は区別される。
<!-- solution-end -->

### Level C

### C1. 伸長する直方体で、境界仕事と熱をすべて検算する

基準直方体 $U_0=(0,L_1)\times(0,L_2)\times(0,L_3)$（$L_i>0$ m）を

$$
\chi(X,t)=((1+\kappa t)X_1,X_2,X_3),\quad t\ge0,\quad \kappa>0\ \mathrm{s}^{-1}
$$

で動かす。$\rho_0>0$ kg/m$^3$ は基準で一様、$\sigma=\operatorname{diag}(p,0,0)$（$p>0$ Pa）、$b=0$、$q(x,t)=\alpha x_1e_1$（$\alpha>0$ W/m$^3$）、$r=r_*$（一定 W/kg）とする。初期比内部エネルギーは $e(X,0)=e_0$（一定 J/kg）。

(i) $F,J,\rho,v,D,P,Q$ を求めよ。(ii) 運動量方程式を確かめ、運動エネルギー全体の時間変化率を計算せよ。(iii) 局所内部エネルギー式から $e(X,t)$ を求めよ。(iv) 基準面の外向き応力仕事率、熱流出率、体積熱供給率を別々に積分し、全エネルギー収支と基準配置の局所式を照合せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) $\lambda(t)=1+\kappa t>0$ と置く。$F=\operatorname{diag}(\lambda,1,1)$、$J=\lambda$、逆変換は $X_1=x_1/\lambda$ なので運動は向きを保つ微分同相である。[質量密度変換](../CTM5/index.md#prop-ctm5-density-jacobian)から $\rho=\rho_0/\lambda$。各物質点で $v(\chi(X,t),t)=\kappa X_1e_1$、現在座標では $v(x,t)=(\kappa/\lambda)x_1e_1$。したがって $D=\operatorname{diag}(\kappa/\lambda,0,0)$。

[第一 Piola 応力](../CTM8/index.md#def-ctm8-first-piola)を代入すると $P=J\sigma F^{-T}=\operatorname{diag}(p,0,0)$。基準熱流束は $Q=JF^{-1}q\circ\chi$ なので

$$
q(\chi(X,t),t)=\alpha\lambda X_1e_1,\quad
JF^{-1}=\operatorname{diag}(1,\lambda,\lambda),\quad
Q=\alpha\lambda X_1e_1.
$$

(ii) 固定した $X$ における $\partial_t v(\chi(X,t),t)=0$、つまり物質加速度はゼロである。空間一定の $\sigma$ について $\operatorname{div}\sigma=0$、$b=0$ だから [運動量式](../CTM7/index.md#thm-ctm7-material-momentum)は成立する。運動エネルギーを基準領域へ戻せば

$$
K(t)=\frac12\int_{U_0}\rho_0\kappa^2X_1^2\,dV
=\frac{\rho_0\kappa^2}{2}L_2L_3\int_0^{L_1}X_1^2dX_1
=\frac{\rho_0\kappa^2L_1^3L_2L_3}{6}.
$$

時間に依存せず、$dK/dt=0$。外部仕事はゼロでないが、その全量が内部仕事に回ることになる。

(iii) 現在側 $\operatorname{div}_xq=\partial_{x_1}(\alpha x_1)=\alpha$、応力仕事は $\sigma:D=p\kappa/\lambda$。よって

$$
\frac{\rho_0}{\lambda}\partial_te
=\frac{p\kappa}{\lambda}-\alpha+\frac{\rho_0}{\lambda}r_*,
\qquad
\partial_te=\frac{p\kappa-\alpha\lambda}{\rho_0}+r_*.
$$

$t$ について $\lambda(t)=1+\kappa t$ を代入して積分すると

$$
\boxed{e(X,t)=e_0+\left(\frac{p\kappa}{\rho_0}+r_*\right)t
-\frac{\alpha}{\rho_0}\left(t+\frac{\kappa t^2}{2}\right)}.
$$

右辺は $X$ に依存しない。すべての項は J/kg であり、特に $\alpha\lambda/\rho_0$ の単位は W/kg である。

(iv) 基準体積を $V_0=L_1L_2L_3$ と置く。変形後の右端面では $n=e_1$、面積 $L_2L_3$、速度 $\kappa L_1e_1$、traction は $pe_1$。従って境界面力の仕事率は $p\kappa L_1L_2L_3=p\kappa V_0$ W。左端面は $v=0$、他の面は $\sigma n=0$ で寄与しない。

右端面で $q\cdot n=\alpha\lambda L_1$、左端では $q=0$、残りの面では $q\cdot n=0$ だから、外へ出る熱流率は $\alpha\lambda V_0$ W。熱供給率は質量保存を使って $\int_{U_t}\rho r_*dv=\rho_0r_*V_0$ W となる。

全エネルギーの左辺は $dK/dt=0$ に加え、

$$
\frac{dE_{\rm int}}{dt}
=\rho_0V_0\partial_te
=V_0(p\kappa-\alpha\lambda+\rho_0r_*).
$$

全エネルギー収支の右辺も境界仕事 $p\kappa V_0$、境界熱入力 $-\alpha\lambda V_0$、体積源 $+\rho_0r_*V_0$ の和で一致する。

さらに基準局所式では $P:\dot F=p\kappa$、$\operatorname{Div}_XQ=\partial_{X_1}(\alpha\lambda X_1)=\alpha\lambda$、左辺 $\rho_0\partial_te=p\kappa-\alpha\lambda+\rho_0r_*$。従って [基準配置のエネルギー収支](#prop-ctm9-reference-energy)にも一致する。熱流出にマイナス、応力仕事にプラス、体積源にプラスを置くのが決定的である。
<!-- solution-end -->

## まとめ

[運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)が運動エネルギーの式を与え、全エネルギー収支原理を追加すると、両者の差から内部エネルギー式が導かれる。内部エネルギーへの入力は応力仕事、境界を通る熱の正味流入、体積熱源の三つである。基準配置に戻すと応力仕事は $P:\dot F$、熱流束は $Q=JF^{-1}q\circ\chi$ となる。

ただし、ここまでの収支だけでは、**どの温度・変形に対してどんな応力や熱流束が実際に生じるか**は決まらない。その制約と材料の応答は次の講義で考える。
