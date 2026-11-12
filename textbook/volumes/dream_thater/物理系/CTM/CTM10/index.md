# CTM10 どの構成則が許されるのか：第二法則と客観性

[CTM9 の内部エネルギー収支](../CTM9/index.md#thm-ctm9-internal-energy)から、物体に加えた仕事と熱がどのように内部エネルギーを変えるかは計算できる。しかし、熱が自然に高温側へ流れる法則と、低温側から高温側へ勝手に流れる法則は、**どちらも第一法則だけでは排除できない**。また、材料の応力が観測者の回転速度によって変わる法則を採用しても、形式的に運動量収支を書けてしまう。

そこで、**構成則**（材料が応力・熱流束・エネルギーをどの状態量へどう結び付けるかという追加の法則）に、次の別々の検査を課す。

1. **第二法則**：非負のエントロピー生成を満たすか。
2. **客観性**：観測者が剛体並進・回転しても、同じ物理的応答を記述するか。

これらは材料の具体式を一意に決めない。次講以降で弾性体や粘性流体を選ぶ際の、**許される模型の判定法**となる。

## 0. 対象・前提と単位

[CTM1 の運動](../CTM1/index.md#def-ctm1-motion-configuration)を、向きを保つ $C^2$ 級の写像 $\chi:\Omega_0\times I\to\mathbb R^3$ とする。変形勾配 $F$ と体積倍率 $J$ には

$$
F=D_X\chi,\qquad J=\det F>0
$$

を課す。$F$ は可逆であり、各時刻の現在配置を $\Omega_t$ と書く。

[CTM5 の質量保存](../CTM5/index.md#prop-ctm5-density-jacobian)を満たす正の密度 $\rho$ を用いる。基準密度は

$$
\rho_0(X)=J\rho(\chi(X,t),t)>0
$$

で、時間によらない。任意の有界な物質領域 $U_t=\chi_t(U_0)$ の境界は区分的 $C^1$ とし、時間微分・発散・体積積分に必要な滑らかさを仮定する。

現在配置で速度を $v$ とする。[CTM4 の変形速度](../CTM4/index.md#def-ctm4-rate-of-deformation-spin)は

$$
D=\frac{\nabla_xv+(\nabla_xv)^T}{2}
$$

である。[CTM7 の角運動量収支](../CTM7/index.md#prop-ctm7-angular-stress)により、古典的連続体の Cauchy 応力 $\sigma$ は対称とする。

$e$ は比内部エネルギー（J/kg）、$q$ は外向きを正とする熱流束（W/m$^2$）、$r$ は比熱供給率（W/kg）。すべての式は正の絶対温度 $T(x,t)$（K）でのみ考える。

導入する比エントロピー $s$ は J/(kg K)、その生成率の体積密度は W/(m$^3$ K)、自由エネルギー $\psi$ は J/kg とする。$\nabla_xT$ は K/m、熱伝導率 $\kappa$ は W/(m K) である。$D_tf=\partial_tf+v\cdot\nabla_xf$ は物質微分、$A:B=\sum_{i,j}A_{ij}B_{ij}$ は二階テンソルの二重内積である。

## 1. なぜエネルギー保存だけでは足りないのか

たとえば静止した棒で $T(x_1)=T_0+gx_1$（$0<x_1<L$、$T_0>0$、$T_0+gL>0$）とする。定数 $a$ に対し $q=a\nabla_xT$ と仮定すれば、温度の高い方向に熱を流せてしまう。$q$ が空間一定なら $\operatorname{div}_xq=0$ なので、熱源 $r=0$ のもとで[第一法則](../CTM9/index.md#thm-ctm9-internal-energy)は $\rho D_te=0$ と矛盾しない。**出入りの帳尻**だけでは、熱が流れる向きは決められないのである。

物質には熱的状態を表す **比エントロピー** $s(x,t)$（単位質量当たりのエントロピー）もあるとし、熱が温度 $T$ の境界面を通るときに運ぶエントロピー流束を $q/T$、体積加熱が運ぶエントロピー供給率を $\rho r/T$ とする。ここで「熱によるエントロピー移動」と「物体内での生成」を分ける。内部生成を負にしない、というのが本章で採用する局所平衡形の第二法則である。これ自体は第一法則からの数学的帰結ではなく、追加の物理原理である。

<a id="principle-ctm10-entropy"></a>

<!-- formal-statement-start -->
### 原理（エントロピー収支不等式・第二法則）

上記の滑らかな質量保存運動、絶対温度 $T>0$、比エントロピー $s$、熱流束 $q$、比熱供給率 $r$ を持つ古典的連続体について、任意の物質領域 $U_t$ で

$$
\frac{d}{dt}\int_{U_t}\rho s\,dV
\ \ge\
-\int_{\partial U_t}\frac{q\cdot n}{T}\,dS
+\int_{U_t}\frac{\rho r}{T}\,dV
$$

を課す。$n$ は現在配置の外向き単位法線である。右辺は外からのエントロピー供給、左辺との差が物体内での非負のエントロピー生成率である。
<!-- formal-statement-end -->

この式では $q$ の単位が W/m$^2$ なので、$q/T$ の単位は W/(m$^2$ K) になる。温度に零を代入してはならない。

<a id="thm-ctm10-local-entropy"></a>

<!-- formal-statement-start -->
### 定理（エントロピー収支の局所形）

[上記第二法則](#principle-ctm10-entropy)が任意の有界な滑らかな物質領域で成立し、$\rho,s,T,q,r$ が局所化できる連続性と微分可能性を持つとする。このとき各点で

$$
\boxed{\rho D_ts+\operatorname{div}_x(q/T)-\rho r/T\ge0}
$$

が成り立つ。逆に、この局所不等式が成立すれば、積分形も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

左辺の時間微分には[質量保存下の Reynolds 輸送定理](../CTM5/index.md#thm-ctm5-material-reynolds)を適用し、境界の熱エントロピー流束には [Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を適用する。「すべての物質領域」の仮定によって被積分関数を点ごとに比較できる。

<!-- proof-start -->
### 証明

固定時刻 $t$ において $U_t$ を任意に動かす。[Reynolds 輸送定理](../CTM5/index.md#thm-ctm5-material-reynolds)で被輸送スカラーを $f=s$ とすると

$$
\frac{d}{dt}\int_{U_t}\rho s\,dV=\int_{U_t}\rho D_ts\,dV.
$$

$T>0$ なので $q/T$ が定義でき、[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)から

$$
\int_{\partial U_t}\frac{q\cdot n}{T}\,dS
=\int_{U_t}\operatorname{div}_x(q/T)\,dV.
$$

したがって

$$
\int_{U_t}\left\{\rho D_ts+\operatorname{div}_x(q/T)-\frac{\rho r}{T}\right\}dV\ge0.
$$

括弧内がある点で負なら連続性によりその点を含む小球で一様に負となり、その小球を物質領域の現在像として選べば積分が負になる。ゆえに括弧内は各点で非負である。逆向きは局所式を領域上で積分し、上の二つの等式を逆に使う。$\square$
<!-- proof-end -->

<!-- definition-example-start: principle-ctm10-entropy -->
### **原理の確認**：一様加熱は生成ゼロでもよい

静止・断熱・応力仕事ゼロ、$\rho=\rho_*>0$ 一定、$r=r_*>0$ 一定とする。材料模型として $e=c(T-T_*)$、$s=c\log(T/T_*)$（$c>0$ J/(kg K)、$T_*>0$）を**別途仮定**する。比内部エネルギーとエントロピーは同じ物理量ではない。第一法則は $c\dot T=r_*$ を与える。これを $s$ の時間微分へ入れると

$$
\rho_*\dot s=\rho_*c\frac{\dot T}{T}
=\frac{\rho_*r_*}{T},\qquad
\operatorname{div}_x(q/T)=0.
$$

よって局所不等式は等号で成立する。具体的には $T(t)=T(0)+r_*t/c>0$ の範囲で計算し、全領域へ積分しても同じ等号が得られる。熱を受けてエントロピーが増えても、**内部生成**が必ず正である必要はない。
<!-- definition-example-end -->

## 2. 第一法則と第二法則を一本の不等式へ

エントロピーは増減できるが、材料がどれだけ機械的エネルギーを蓄えるかも知りたい。そこで、比内部エネルギーから温度と比エントロピーの積を差し引いた量を使う。これが **比 Helmholtz 自由エネルギー** $\psi$ である。

<a id="def-ctm10-free-energy"></a>

<!-- formal-statement-start -->
### 定義（比 Helmholtz 自由エネルギー）

$\rho>0$、$T>0$、比内部エネルギー $e$、比エントロピー $s$ を持つ熱的状態に対し

$$
\boxed{\psi:=e-Ts}
$$

を比 Helmholtz 自由エネルギーと定める。単位は J/kg である。基準密度 $\rho_0$ を使う場合には、基準体積当たりの自由エネルギーを $\Psi:=\rho_0(\psi\circ\chi)$（J/m$^3$）と表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm10-free-energy -->
### **定義の確認**：温度変化と積の微分

$e=c(T-T_*)$、$s=c\log(T/T_*)$ の材料模型で、$c,T_*>0$ とする。定義に代入すると

$$
\psi(T)=c(T-T_*)-cT\log(T/T_*).
$$

積の微分と $\frac{d}{dT}\log(T/T_*)=1/T$ より

$$
\frac{d\psi}{dT}
=c-c\{\log(T/T_*)+1\}=-c\log(T/T_*)=-s.
$$

各項の単位は J/(kg K) であり、$T>0$ だから対数も微分も定義できる。この $d\psi/dT=-s$ は**採用した模型における関係**であり、任意の $\psi$ に仮定なしで適用してよい一般公式ではない。
<!-- definition-example-end -->

次に自由エネルギーを使って、応力の仕事率と熱伝導によるエントロピー生成を同時に判定する。

<a id="thm-ctm10-clausius-duhem"></a>

<!-- formal-statement-start -->
### 定理（Clausius–Duhem 散逸不等式）

[CTM9 の内部エネルギー局所収支](../CTM9/index.md#thm-ctm9-internal-energy)と [本章の局所エントロピー不等式](#thm-ctm10-local-entropy)を満たす滑らかな状態で $T>0$ とする。$\psi=e-Ts$、$D=(\nabla_xv+\nabla_xv^T)/2$ なら

$$
\boxed{
\mathcal D:=
\sigma:D-\rho(D_t\psi+sD_tT)
-\frac{q\cdot\nabla_xT}{T}\ge0
}
$$

が成り立つ。$\mathcal D$ の単位は W/m$^3$ である。また $\mathcal D/T$ は局所エントロピー生成率密度であり、W/(m$^3$ K) の単位を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

熱エントロピー流束 $q/T$ の発散を積の微分で展開し、$T>0$ を掛ける。[内部エネルギー収支](../CTM9/index.md#thm-ctm9-internal-energy)で $\operatorname{div}q-\rho r$ を消す。最後に $\psi=e-Ts$ を物質微分して、蓄積する成分と散逸の成分を分離する。

<!-- proof-start -->
### 証明

$T>0$ のもとで各座標方向へ商の微分を行うと

$$
\begin{aligned}
\operatorname{div}_x(q/T)
&=\sum_{i=1}^3\partial_{x_i}(q_i/T)\\
&=\frac{\operatorname{div}_xq}{T}
-\frac{q\cdot\nabla_xT}{T^2}.
\end{aligned}
$$

これを[局所エントロピー不等式](#thm-ctm10-local-entropy)へ代入し、正数 $T$ を掛けると、不等号の向きは変わらず

$$
\rho T D_ts+\operatorname{div}_xq
-\frac{q\cdot\nabla_xT}{T}-\rho r\ge0.
$$

[内部エネルギー局所収支](../CTM9/index.md#thm-ctm9-internal-energy)は

$$
\rho D_te=\sigma:D-\operatorname{div}_xq+\rho r,
\quad\text{すなわち}\quad
\operatorname{div}_xq-\rho r=\sigma:D-\rho D_te
$$

なので、代入して

$$
\sigma:D-\rho(D_te-TD_ts)
-\frac{q\cdot\nabla_xT}{T}\ge0
$$

を得る。一方、物質微分に積の微分を使うと

$$
D_t\psi=D_te-D_t(Ts)
=D_te-TD_ts-sD_tT.
$$

すなわち $D_te-TD_ts=D_t\psi+sD_tT$ であるから、代入すれば主張を得る。この操作はすべて等価変形なので、二つの収支式のもとでは逆に辿ることもできる。$\square$
<!-- proof-end -->

散逸を形式的に二つへ分けると

$$
\mathcal D_{\rm mech}
:=\sigma:D-\rho(D_t\psi+sD_tT),\qquad
\mathcal D_{\rm heat}:=-\frac{q\cdot\nabla_xT}{T}.
$$

ただし **第二法則が要求するのは合計 $\mathcal D\ge0$** である。機械散逸と熱散逸のそれぞれを非負と課すのは、両機構が別々に散逸するという追加の構成モデル仮定になる。相互結合がある材料で独断で両者を非負に切り分けてはならない。

<a id="def-ctm10-admissible-constitutive-law"></a>

<!-- formal-statement-start -->
### 定義（熱力学的に許容される構成則）

応力 $\sigma$、熱流束 $q$、比エントロピー $s$、比自由エネルギー $\psi$ を、材料の状態量・その変化率・必要なら内部変数へ結び付ける関係を **構成則** とする。指定した状態・運動・温度履歴のクラスにおいて第一法則と第二法則と矛盾せず、上の $\mathcal D\ge0$ をすべての許された局所過程で満たすとき、その構成則はそのクラスで **熱力学的に許容される** と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm10-admissible-constitutive-law -->
### **定義の確認**：二つの熱伝導率を判定する

静止、温度一定ではなく $T>0$ の勾配を許し、材料の状態で $D_t\psi+sD_tT=0$、$\sigma:D=0$ を仮定する。$q=-\kappa\nabla_xT$、$\kappa\ge0$ なら

$$
\mathcal D=-\frac{(-\kappa\nabla_xT)\cdot\nabla_xT}{T}
=\frac{\kappa|\nabla_xT|^2}{T}\ge0.
$$

一方 $\kappa<0$ では $\nabla_xT\ne0$ を許すと $\mathcal D<0$ になり失格となる。$\kappa>0$ でも温度勾配が零なら散逸は零である。判定は「ある一例で非負」ではなく、**指定した全過程で非負**を調べる。
<!-- definition-example-end -->

## 3. Fourier 熱伝導はなぜ温度の低い方へ向かうか

熱流束と温度勾配の関係は第一法則からは決まらない。初等的な等方熱伝導の模型として **Fourier 則** を課す。ここで等方とは材料に特別な熱伝導方向がないことであり、正値性とは別の条件である。

<a id="prop-ctm10-fourier"></a>

<!-- formal-statement-start -->
### 命題（Fourier 則と熱散逸の符号）

温度 $T>0$、熱伝導率 $\kappa(x,t)\ge0$（W/(m K)）とし、現在配置で $q=-\kappa\nabla_xT$ を仮定する。このとき

$$
-\frac{q\cdot\nabla_xT}{T}
=\frac{\kappa|\nabla_xT|^2}{T}\ge0,\qquad
\frac{1}{T}\left(-\frac{q\cdot\nabla_xT}{T}\right)
=\frac{\kappa|\nabla_xT|^2}{T^2}\ge0.
$$

後者は熱伝導に対応するエントロピー生成率密度である。$\kappa>0$ なら $\nabla_xT\ne0$ の点で厳密に正となる。
<!-- formal-statement-end -->

### 証明の見取り図

$\kappa$ の符号とベクトルの内積 $\nabla T\cdot\nabla T=|\nabla T|^2$ を使う。温度で割る段階で $T>0$ が不可欠である。

<!-- proof-start -->
### 証明

$q=-\kappa\nabla_xT$ を定義式に代入して

$$
q\cdot\nabla_xT
=-\kappa(\nabla_xT)\cdot(\nabla_xT)
=-\kappa|\nabla_xT|^2\le0.
$$

正数 $T$ と $T^2$ でそれぞれ割ると主張を得る。$\kappa>0$、$\nabla_xT\ne0$ なら内積が正なので不等号は厳密となる。$\square$
<!-- proof-end -->

**熱が通過するだけでもエントロピーは生成される。** 長さ $L>0$ の静止棒で $T=T_0+gx_1>0$、$\kappa>0$ を定数とする。$q=-\kappa g e_1$ は空間一定だから $\operatorname{div}q=0$。一方

$$
\operatorname{div}_x(q/T)
=\partial_{x_1}\left(-\frac{\kappa g}{T_0+gx_1}\right)
=\frac{\kappa g^2}{(T_0+gx_1)^2}>0
\quad(g\ne0).
$$

したがって $r=0$、$D_ts=0$ としても[局所エントロピー不等式](#thm-ctm10-local-entropy)には正の生成率が残る。エネルギーの流入出が相殺されることと、不可逆性がないことは異なる。

## 4. 等温弾性材料では応力をどう選べるか

[CTM8 の第一 Piola 応力と仕事共役](../CTM8/index.md#thm-ctm8-work-conjugacy)を使うと、現在体積当たりの仕事率 $\sigma:D$ は基準体積当たりの $P:\dot F$ に変換できる。材料の熱的状態を固定した **等温過程**（$T=T_*>0$、$D_tT=0$）、熱流束なし（$q=0$）で、履歴に依存せず $F$ のみから $\Psi(F)$ が決まる材料を考える。

<a id="prop-ctm10-isothermal-elastic"></a>

<!-- formal-statement-start -->
### 命題（等温・非散逸の単純弾性構成則）

基準密度 $\rho_0>0$、向きを保つ変形勾配 $F\in GL^+(3)$、滑らかな基準体積自由エネルギー $\Psi(F)$ を持つ材料を考える。$T=T_*>0$、$q=0$、$\Psi(F)=\rho_0(\psi\circ\chi)$ で、応力は $P=J(\sigma\circ\chi)F^{-T}$ とする。このとき

$$
J(\mathcal D\circ\chi)
=\left(P-\frac{\partial\Psi}{\partial F}\right):\dot F\ge0.
$$

さらに**同じ $F$ で任意の正負の微小な $\dot F$ を独立に実現でき、どの過程でもこの不等式を要求する**場合には

$$
\boxed{P=\frac{\partial\Psi}{\partial F}}.
$$

逆にこの等式を満たすと機械散逸は零である。微分は成分ごとに $(\partial\Psi/\partial F)_{ij}=\partial\Psi/\partial F_{ij}$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

第一 Piola 応力により仕事率へ $J$ を掛け、$\rho_0$ が時間不変なことから $\rho D_t\psi$ を $\dot\Psi$ に変換する。最後の結論には、あらゆる正負の変形速度を許すという**独立変化の仮定**を使う。

<!-- proof-start -->
### 証明

[CTM8 の仕事共役](../CTM8/index.md#thm-ctm8-work-conjugacy)を $x=\chi(X,t)$ へ適用すると

$$
J(\sigma:D)\circ\chi=P:\dot F.
$$

$\Psi(F)=\rho_0\psi(\chi(X,t),t)$ と $\rho_0=J\rho\circ\chi$ から

$$
J\rho(D_t\psi)\circ\chi=\rho_0\partial_t(\psi\circ\chi)
=\frac{d}{dt}\Psi(F)
=\sum_{i,j}\frac{\partial\Psi}{\partial F_{ij}}\dot F_{ij}.
$$

等温かつ $q=0$ なら [散逸不等式](#thm-ctm10-clausius-duhem)の残る二項はこの差なので第一式が成り立つ。

$A=P-\partial\Psi/\partial F$ と置く。固定した $F$ で任意の行列 $H$ とその反対方向 $-H$ の速度を取れるなら $A:H\ge0$ と $-A:H\ge0$ がともに成り立ち $A:H=0$。特に成分が $i,j$ の位置だけ $1$ で他が $0$ の行列 $E^{ij}$ を選べば $A_{ij}=A:E^{ij}=0$。すべての成分で零だから $P=\partial\Psi/\partial F$。逆向きは代入により $\mathcal D=0$。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ctm10-free-energy -->
### **自由エネルギーから応力を作る例**：一軸伸長

この節だけの具体的模型として $a>0$（Pa）を定数とし、$C=F^TF$ に対して

$$
\Psi(F)=\frac a4(C-I_3):(C-I_3)
$$

を採用する。$C$ は[CTM3 の右 Cauchy–Green テンソル](../CTM3/index.md#def-ctm3-green-strain)である。$F= \operatorname{diag}(\lambda,1,1)$、$\lambda>0$ なら $C-I_3=\operatorname{diag}(\lambda^2-1,0,0)$ であり、

$$
\Psi(\lambda)=\frac a4(\lambda^2-1)^2,\qquad
\frac{d\Psi}{d\lambda}=a\lambda(\lambda^2-1).
$$

[等温弾性構成則](#prop-ctm10-isothermal-elastic)で $P_{11}=a\lambda(\lambda^2-1)$、他の $P_{ij}$ はこの変形に沿う仕事率へ寄与しない。実際、一般の $F$ について $\delta C=F^T\delta F+\delta F^TF$ なので

$$
\delta\Psi=\frac a2(C-I_3):\delta C
=aF(C-I_3):\delta F,
\qquad P=aF(C-I_3),
$$

となり、対角伸長では他の $P_{ij}$ は零である。[CTM8 の応力変換](../CTM8/index.md#def-ctm8-first-piola)より $J=\lambda$、$\sigma=J^{-1}PF^T$、したがって $\sigma_{11}=a\lambda(\lambda^2-1)$。一方 $D_{11}=\dot\lambda/\lambda$ なので

$$
\sigma:D=a(\lambda^2-1)\dot\lambda
=\frac{1}{J}\frac{d\Psi}{dt}.
$$

蓄積と応力仕事が等しく、散逸は零である。$F=I_3$ なら $P=0$ も確かめられる。
<!-- definition-example-end -->

この命題は等温・非散逸の**単純弾性**の条件を与えるのであって、全材料の応力を自由エネルギーの微分だけで表す主張ではない。粘性などの追加機構では正の機械散逸が現れ得る。

## 5. 客観性は第二法則とは別の条件である

[CTM4 の客観性の定義](../CTM4/index.md#def-ctm4-objectivity)は、時間依存の観測系 $x^*=c(t)+Q(t)x$、$Q(t)\in SO(3)$ のもとで、物理的な二階空間テンソル $A$ が $A^*=QAQ^T$ と変換することを要請した。そこで、構成則に現れる各引数も同じ観測者変換で比較する必要がある。

[CTM4 の変換命題](../CTM4/index.md#prop-ctm4-observer-transform)から

$$
F^*=QF,\quad D^*=QDQ^T,\quad
W^*=QWQ^T+\dot QQ^T
$$

となる。$W=(L-L^T)/2$ はスピンであり、余分な $\dot QQ^T$ が付くので一般に客観的ではない。一方 $T^*=T$、$J^*=J$ である。

<a id="def-ctm10-constitutive-objectivity"></a>

<!-- formal-statement-start -->
### 定義（構成則の客観性）

古典的連続体での応力の構成則が **客観的** であるとは、任意の滑らかな $c(t)$ と $Q(t)\in SO(3)$ に対して、同じ物理状態を二つの観測系で評価した出力が

$$
\sigma^*(x^*,t)=Q(t)\sigma(x,t)Q(t)^T
$$

を満たすことをいう。スカラー自由エネルギーについては $\psi^*(x^*,t)=\psi(x,t)$ を要求する。熱流束などの空間ベクトル量には $q^*=Qq$ を要求する。構成則を評価するときは各引数にも対応する観測者変換を施す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm10-constitutive-objectivity -->
### **定義の確認**：$D$ に比例する応力は客観的

正の粘性係数 $\eta$（Pa s）を観測系によらないスカラーとして、$\sigma=2\eta D$ を考える。[変形速度の変換則](../CTM4/index.md#prop-ctm4-observer-transform)を構成則の右辺へ代入すると

$$
\sigma^*=2\eta D^*
=2\eta QDQ^T=Q(2\eta D)Q^T=Q\sigma Q^T.
$$

任意の $Q,c$ で成立し、定義の応力変換を直接満たす。さらに $\sigma^T=\sigma$、$\sigma:D=2\eta D:D\ge0$（$D:D=\sum_{ij}D_{ij}^2$）なので、温度一定・自由エネルギー一定・熱流束零の模型なら第二法則にも整合する。ただし圧力や他の応力項を省いた単純な例であり、流体全体の方程式は後で扱う。
<!-- definition-example-end -->

<a id="prop-ctm10-energy-objectivity"></a>

<!-- formal-statement-start -->
### 命題（客観的な変形自由エネルギーの表示）

$F\in GL^+(3)=\{F\in\mathbb R^{3\times3}:\det F>0\}$ とし、基準体積自由エネルギー $\Psi(F,T)$ が任意の $Q\in SO(3)$ に対し $\Psi(QF,T)=\Psi(F,T)$ を満たすとする。このとき $\Psi$ は $C=F^TF$ と $T$ の関数として表せる。逆に $C,T$ だけで決まる $\Psi$ は客観的である。$\Psi$ が $C$ で微分可能なら、$\Psi(F,T)=\widehat\Psi(C,T)$ として

$$
\boxed{\frac{\partial\Psi}{\partial F}
=2F\frac{\partial\widehat\Psi}{\partial C}}
$$

が成り立つ。ただし $\partial\widehat\Psi/\partial C$ は対称行列上の微分を表す対称行列である。
<!-- formal-statement-end -->

### 証明の見取り図

$F_1^TF_1=F_2^TF_2$ なら $Q=F_2F_1^{-1}$ が向きを保つ直交行列であると示す。その後、$C$ の変分を $F$ の変分で書いて連鎖律を適用する。

<!-- proof-start -->
### 証明

二つの $F_i\in GL^+(3)$ が $F_1^TF_1=F_2^TF_2$ を満たすとき $Q=F_2F_1^{-1}$ と置く。積の転置を取り

$$
Q^TQ=F_1^{-T}F_2^TF_2F_1^{-1}
=F_1^{-T}F_1^TF_1F_1^{-1}=I_3.
$$

また $\det Q=\det F_2/\det F_1>0$ なので、直交行列の行列式が $\pm1$ であることから $\det Q=1$、すなわち $Q\in SO(3)$。$F_2=QF_1$ と客観性から $\Psi(F_2,T)=\Psi(F_1,T)$。したがって同一 $C$ に同一の値を割り当てる $\widehat\Psi$ を定義できる。逆向きは $(QF)^T(QF)=F^TF$ により従う。

微小変化 $H$ に対して

$$
(F+\varepsilon H)^T(F+\varepsilon H)
=C+\varepsilon(F^TH+H^TF)+\varepsilon^2H^TH.
$$

$\widehat\Psi$ の $C$ に関する微分を対称行列 $A=\partial\widehat\Psi/\partial C$ とすると、対称な $A$ の性質と二重内積の成分表示から

$$
\begin{aligned}
\delta\Psi
&=A:(F^TH+H^TF)\\
&=(FA):H+(FA^T):H
=2(FA):H.
\end{aligned}
$$

すべての $H$ で成り立つので $\partial\Psi/\partial F=2FA$。$\square$
<!-- proof-end -->

続いて「客観性」と「材料等方性」を分ける。前者は**空間で観測者を回す**話、後者は**基準物体の材料方向を回す**話である。方向依存の繊維材料でも客観的でなければならないが、等方的である必要はない。

<a id="def-ctm10-material-isotropy"></a>

<!-- formal-statement-start -->
### 定義（基準配置に関する材料等方性）

特定の基準配置を固定し、方向を区別する追加の材料内部変数を持たない超弾性材料の自由エネルギー $\Psi(F,T)$ を考える。すべての基準側回転 $H\in SO(3)$ に対し

$$
\Psi(FH,T)=\Psi(F,T)
$$

が成立するとき、その材料はその基準配置で **等方的** であるという。この右作用の条件は観測系回転 $F\mapsto QF$ に対する左作用の客観性とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm10-material-isotropy -->
### **定義の確認**：繊維方向をもつ材料は客観的でも非等方的

基準系で固定された単位繊維方向 $a_0=e_1$ と $k>0$（Pa）を与え、

$$
\Psi(F)=\frac{k}{2}\bigl(|Fa_0|^2-1\bigr)^2
$$

とする。$Q\in SO(3)$ なら $|QFa_0|^2=|Fa_0|^2$ なので **左回転について不変** である。一方 $F=\operatorname{diag}(2,1,1)$、$H$ を $e_1$ と $e_2$ を入れ替える $90^\circ$ 回転（$He_1=e_2$）とすると

$$
\Psi(F)=\frac{k}{2}(4-1)^2=\frac{9k}{2},
\qquad
\Psi(FH)=\frac{k}{2}(1-1)^2=0.
$$

右作用では値が変わるため非等方的。$F,H,Q$ はいずれも正の行列式をもち、材料方向 $a_0$ を固定して検査している。方向を回す受動的な座標変更で $a_0$ も同時に変換する話と混同しない。
<!-- definition-example-end -->

### **反例**：散逸が非負でも客観性を破る法則

$\eta>0$（Pa s）、$\tau>0$（s）を固定し、以下の**対称**応力法則を仮定する。

$$
\sigma=2\eta\left(1+\tau^2\,W:W\right)D.
$$

$W:W=\sum_{i,j}W_{ij}^2\ge0$ だから $\sigma:D=2\eta(1+\tau^2 W:W)D:D\ge0$。等温・$\psi$ 一定・$q=0$ の模型では散逸不等式を破らない。

しかし $t=0$ の観測枠で $Q(0)=I_3$、$\dot Q(0)=\omega K$（$K=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}$、$\omega\ne0$）とする。元の流れの瞬間に $D=\operatorname{diag}(a,-a,0)$（$a\ne0$）、$W=0$ だったとする。すると [CTM4 の変換則](../CTM4/index.md#prop-ctm4-observer-transform)から

$$
D^*=D,\quad W^*=\omega K,\quad
W^*:W^*=2\omega^2.
$$

新観測系で法則を直接評価した値は

$$
\sigma^*=2\eta(1+2\tau^2\omega^2)D
\ne 2\eta D
=Q(0)\sigma Q(0)^T.
$$

客観性に失敗するのは $W^*$ に観測枠自身の角速度 $\dot QQ^T$ が加わるためである。非負散逸と対称応力という**二つの検査を通っても第三の客観性には落ちる**。一方、材料等方性まで無条件に要求するのも誤りである。

## 6. 機械と熱を合わせて検算する

$T>0$、密度 $\rho>0$ の局所状態で、温度一定の機械応答を $\sigma=2\eta D$、$\eta>0$、熱流束を $q=-\kappa\nabla_xT$、$\kappa>0$ と置き、$D_t\psi+sD_tT=0$ となる状態クラスを仮定する。たとえば同時に時間・空間依存する場を許す場合には、その条件も別に確かめる必要がある。散逸率は

$$
\mathcal D=2\eta\,D:D+\frac{\kappa|\nabla_xT|^2}{T}\ge0.
$$

両項の単位を確かめると、$\eta\,D:D$ は (Pa s)$\times$s$^{-2}$ = W/m$^3$、$\kappa|\nabla T|^2/T$ は (W/(m K))$\times$(K$^2$/m$^2$)/K = W/m$^3$ で一致する。機械的変形 $D$ と温度勾配 $\nabla T$ が同時に非零なら正の散逸があり、その大きさは材料係数に依存する。

この節の $\sigma=2\eta D$ は圧力などを省いた散逸の局所例である。単に散逸率が非負という理由で、境界条件を満たす運動や温度場の存在まで自動的に保証されるわけではない。

## 7. 典型的な誤りと、この後の弾性・流体

- 第一法則はエネルギーの**量の収支**、第二法則は熱移動を含む**可能な変化の向き**を制約する。両者を同じものとしてはならない。
- 第二法則は一般には合計の $\mathcal D\ge0$ のみを課す。機械部分・熱部分ごとの非負性は追加の模型仮定である。
- $q\cdot n>0$ は境界から熱が出る符号。$q/T$ の発散と $\operatorname{div}q/T$ は温度が空間変化する場合に異なる。
- 客観性は $Q\sigma Q^T$ の**共変変換**であって、各成分が数値的に不変という意味ではない。$W$ は一般に客観的でない。
- 客観性と等方性は別条件であり、繊維材料は客観的かつ異方的でよい。

次のCTM11では弾性エネルギーと微小ひずみに対応する Hooke 則を導き、CTM14では有限変形の自由エネルギーと客観性を扱う。CTM15では粘性応力を収支式へ戻す。ここで得た二つの検査を、各材料の具体式に毎回適用する。

## 演習

各問で $T>0$ とし、指定した場は必要な滑らかさを持つものとする。$I_3$ は三次単位行列、$\operatorname{diag}$ は対角行列、$e_i$ は標準直交基底、$D$ は変形速度、$W$ はスピンを表す。未指定の構成関係を第一法則から推測しない。

### Level A

### A1. エントロピー流束の積の微分

$T(x_1)=T_0+gx_1>0$、$q=q_*e_1$（$T_0>0$、$g,q_*$ は定数）、$D_ts=r=0$ とする。$\operatorname{div}(q/T)$ を求め、局所第二法則の成否を $gq_*$ の符号で判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$q/T=(q_*/(T_0+gx_1),0,0)$ なので

$$
\operatorname{div}(q/T)
=\partial_{x_1}\left(\frac{q_*}{T_0+gx_1}\right)
=-\frac{q_*g}{(T_0+gx_1)^2}.
$$

[局所エントロピー不等式](#thm-ctm10-local-entropy)では他の二項は零だから、この値が非負である条件は $q_*g\le0$。$q_*g>0$ なら熱流は温度の高い方向で、局所生成が負となる。分母は $T^2>0$ であり符号を変えない。
<!-- solution-end -->

### A2. 温度と自由エネルギーの微分

$T>0$、$e=c(T-T_*)$、$s=c\log(T/T_*)$（$c,T_*>0$）とする。$\psi$ を求め、$d\psi/dT=-s$、$D_te=D_t\psi+TD_ts+sD_tT$ を確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[自由エネルギーの定義](#def-ctm10-free-energy)により

$$
\psi=c(T-T_*)-cT\log(T/T_*).
$$

微分すると

$$
\frac{d\psi}{dT}=c-c\log(T/T_*)-c=-s.
$$

$D_ts=(c/T)D_tT$ を使うと

$$
D_t\psi+TD_ts+sD_tT
=(-s)D_tT+cD_tT+sD_tT
=cD_tT=D_te.
$$

最後の等号は $e$ の仮定から直接得られる。これは $T>0$ の模型に関する検算である。
<!-- solution-end -->

### A3. せん断の機械散逸

$\sigma=2\eta D$、$\eta>0$ Pa s、$D_{12}=D_{21}=\gamma/2$（$\gamma$ は s$^{-1}$）、他の $D_{ij}=0$ とする。$\sigma:D$ を求め、$\gamma$ の符号を逆にした場合も調べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

成分ごとに $D:D=(\gamma/2)^2+(\gamma/2)^2=\gamma^2/2$。従って

$$
\sigma:D=(2\eta D):D=2\eta\frac{\gamma^2}{2}
=\eta\gamma^2\ge0.
$$

$\gamma\mapsto-\gamma$ でも二乗なので値は変わらない。$\eta>0$ なら $\gamma\ne0$ のとき正。単位は (Pa s)$\times$s$^{-2}$ = W/m$^3$ である。[構成則の客観性の確認](#def-ctm10-constitutive-objectivity)と併せれば、この単純な応力則は非負の機械仕事率を持つ。
<!-- solution-end -->

### A4. Fourier 熱流束と温度ゼロの問題

$T(x_1)=300+20x_1$ K（$0<x_1<1$ m）、$\kappa=2$ W/(m K) とする。$q$ と $-\frac{q\cdot\nabla T}{T}$ を求め、両者の符号と単位を説明せよ。さらに式に $T=0$ を代入してはいけない理由を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

勾配は $\nabla T=20 e_1$ K/m で、[Fourier 則](#prop-ctm10-fourier)より $q=-2\cdot20 e_1=-40e_1$ W/m$^2$。温度の高い $+e_1$ 側と逆に流れる。熱散逸は

$$
-\frac{q\cdot\nabla T}{T}
=-\frac{(-40)\cdot20}{300+20x_1}
=\frac{800}{300+20x_1}\ {\rm W/m^3}>0.
$$

$T\in(300,320)$ K なので分母は正。$T=0$ では $q/T$ と自由エネルギー導出の割り算が未定義になり、第二法則のこの形の仮定から外れる。
<!-- solution-end -->

### Level B

### B1. 等温伸長の蓄積・応力・散逸

$\rho_0>0$、$F(t)=\operatorname{diag}(\lambda(t),1,1)$、$\lambda>0$、$T=T_*>0$、$q=0$、$\Psi(F)=a(C-I_3):(C-I_3)/4$（$a>0$ Pa）、$P=\partial\Psi/\partial F$ とする。$P_{11}$、$\sigma_{11}$、$D_{11}$ と $J\mathcal D$ を計算し、伸長速度 $\dot\lambda$ の符号にかかわらず非散逸であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[CTM3 の $C=F^TF$](../CTM3/index.md#def-ctm3-green-strain)を使うと $C-I_3=\operatorname{diag}(\lambda^2-1,0,0)$、$J=\lambda$ である。$\Psi=a(\lambda^2-1)^2/4$ を $\lambda=F_{11}$ で微分すると

$$
P_{11}=\frac{d\Psi}{d\lambda}
=a\lambda(\lambda^2-1).
$$

[応力変換](../CTM8/index.md#def-ctm8-first-piola)は $\sigma=J^{-1}PF^T$ なので $\sigma_{11}=\lambda^{-1}P_{11}\lambda=P_{11}$。[速度勾配の関係](../CTM4/index.md#prop-ctm4-velocity-deformation)から $D_{11}=\dot\lambda/\lambda$。よって

$$
J\sigma:D
=\lambda\cdot a\lambda(\lambda^2-1)\cdot\frac{\dot\lambda}{\lambda}
=a\lambda(\lambda^2-1)\dot\lambda
=\frac{d\Psi}{dt}.
$$

[等温散逸式](#prop-ctm10-isothermal-elastic)へ代入すると $J\mathcal D=P:\dot F-\dot\Psi=0$。$\dot\lambda>0$ でも $\dot\lambda<0$ でも等号である。弾性エネルギーが放出されるときは応力仕事率も負になり、そのことは負の散逸を意味しない。
<!-- solution-end -->

### B2. 客観性を破る法則を数値で反証する

$D=\operatorname{diag}(1,-1,0)$ s$^{-1}$、$W=0$、$\eta=1$ Pa s、$\tau=1$ s とする。$\sigma=2\eta(1+\tau^2 W:W)D$ に対し、ある瞬間 $Q=I_3$、$\dot QQ^T=2K$ s$^{-1}$、$K=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}$ とする。元の応力と新観測系で計算した応力を求め、散逸の非負性があっても客観性を満たさないことを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

元の系では $W:W=0$ だから $\sigma=2D=\operatorname{diag}(2,-2,0)$ Pa。[CTM4 の変換式](../CTM4/index.md#prop-ctm4-observer-transform)で $D^*=D$、$W^*=2K$ s$^{-1}$ であり、$K:K=2$ なので $W^*:W^*=4\cdot2=8$ s$^{-2}$。従って新系で法則の右辺を評価すると

$$
\sigma^*=2(1+8)D=\operatorname{diag}(18,-18,0)\ {\rm Pa}.
$$

しかし[構成則の客観性](#def-ctm10-constitutive-objectivity)なら $Q\sigma Q^T=\sigma=\operatorname{diag}(2,-2,0)$ Pa でなければならない。両者は一致しない。元の系でも新系でも $\sigma:D=2\eta(1+\tau^2 W:W)D:D\ge0$ なので、この反例の失敗原因は散逸ではなく $W$ の付加スピンである。
<!-- solution-end -->

### B3. 客観性と等方性を異なる操作で確かめる

$F=\operatorname{diag}(2,1,1)$、$a_0=e_1$、$\Psi(F)=k(|Fa_0|^2-1)^2/2$（$k>0$ Pa）とする。任意の空間回転 $Q$ について $\Psi(QF)=\Psi(F)$ を示し、基準回転 $H$ が $He_1=e_2$ を満たす場合には $\Psi(FH)\ne\Psi(F)$ と示せ。また繊維方向 $a_0$ を固定した意味を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$Q^TQ=I_3$ から

$$
|QFa_0|^2=(Fa_0)^TQ^TQ(Fa_0)=|Fa_0|^2.
$$

従って $\Psi(QF)=\Psi(F)$ となり、[客観性の条件](#prop-ctm10-energy-objectivity)を満たす。

一方、$Fa_0=2e_1$ なので、基準側を回す前のエネルギーは

$$
\Psi(F)=\frac{k}{2}(4-1)^2=\frac{9k}{2}
$$

である。$H\in SO(3)$ が $He_1=e_2$ を満たすとき、$FHe_1=Fe_2=e_2$ だから $|FHe_1|^2=1$ となる。ゆえに

$$
\Psi(FH)=\frac{k}{2}(1-1)^2=0\ne\Psi(F).
$$

これは[等方性の定義](#def-ctm10-material-isotropy)に反する。$a_0$ は基準物体の実際の繊維方向を固定している。右回転 $H$ はどの材料方向を伸ばすかを入れ替える操作であり、単なる座標ラベルの変更に伴って $a_0$ も同時に変える操作ではない。
<!-- solution-end -->

### Level C

### C1. 熱流と弾性蓄積を含む局所第二法則の一括検算

基準配置の滑らかな一軸運動を考える。基準密度 $\rho_0>0$ を一定とし、伸長倍率 $\lambda(t)>0$、体積倍率 $J=\lambda$ について

$$
F=\operatorname{diag}(\lambda(t),1,1)
$$

とする。現在配置の温度と熱流束は、定数 $T_0>0$、$g$ および $\kappa>0$ を用いて

$$
T(x,t)=T_0+gx_1>0,\qquad q=-\kappa\nabla_xT
$$

とする。温度が正の領域・時間だけを対象とする。

基準体積当たりの自由エネルギー $\Psi$ と第一 Piola 応力 $P$ の構成則を、定数 $a>0$ および $C=F^TF$ によって

$$
\Psi(F)=\frac a4(C-I_3):(C-I_3),
\qquad P=\frac{\partial\Psi}{\partial F}
$$

とする。比エントロピーは $s=0$、比内部エネルギーは $e=\Psi/\rho_0$ と仮定し、熱源 $r$ は第一法則を満たすように選んでよい。

1. $P_{11},\sigma_{11},D_{11}$ と $\rho D_te$、$\sigma:D$ を計算せよ。
2. $\operatorname{div}q$ と必要な $r$ を求め、第一法則を検算せよ。
3. 局所エントロピー生成と $\mathcal D$ をそれぞれ独立に計算し、$\mathcal D/T$ と一致することを示せ。
4. $g=0$ と $g\ne0$ を比較し、温度の時間変化を含めた仮定上の注意点を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず $F$ は $\lambda>0$ より可逆、$J=\lambda>0$ なので基準・現在間の応力変換が使える。[等温弾性の計算](#prop-ctm10-isothermal-elastic)と[CTM8 の応力変換](../CTM8/index.md#def-ctm8-first-piola)から

$$
P_{11}=a\lambda(\lambda^2-1),\quad
\sigma_{11}=a\lambda(\lambda^2-1),\quad
D_{11}=\frac{\dot\lambda}{\lambda}.
$$

$e=\Psi/\rho_0$ は固定した $X$ で $\lambda$ だけの関数なので

$$
\rho D_te
=\frac{\rho_0}{\lambda}\cdot\frac{1}{\rho_0}\frac{d\Psi}{dt}
=\frac{a(\lambda^2-1)\dot\lambda}{1}
=\sigma:D.
$$

ここで $q=-\kappa g e_1$ は空間一定なので $\operatorname{div}q=0$。[内部エネルギー収支](../CTM9/index.md#thm-ctm9-internal-energy)へ上式を代入すると $\rho r=0$、したがって $\rho>0$ により $r=0$ でよい。$s=0$ なので $D_ts=0$ である。

一方、局所エントロピー生成を[第二法則の局所形](#thm-ctm10-local-entropy)から直接計算すれば

$$
\begin{aligned}
\rho D_ts+\operatorname{div}(q/T)-\rho r/T
&=\operatorname{div}\left(-\frac{\kappa g e_1}{T_0+gx_1}\right)\\
&=\frac{\kappa g^2}{(T_0+gx_1)^2}\ge0.
\end{aligned}
$$

さらに $\psi=e-Ts=e$、$D_t\psi=D_te$、$D_tT$ が非零であっても $sD_tT=0$ である。[Clausius–Duhem 式](#thm-ctm10-clausius-duhem)から

$$
\begin{aligned}
\mathcal D
&=\sigma:D-\rho D_te-\frac{q\cdot\nabla T}{T}\\
&=0-\frac{(-\kappa g e_1)\cdot(ge_1)}{T}
=\frac{\kappa g^2}{T}.
\end{aligned}
$$

確かに $\mathcal D/T=\kappa g^2/T^2$ が一致する。$g=0$ では $q=0$、生成率は零、$g\ne0$ では正である。なお $T(x,t)=T_0+gx_1$ は**空間座標に固定した温度分布**だから、運動する物質点に沿った $D_tT=\partial_tT+v\cdot\nabla T$ は一般に零ではない。本問では $\Psi$ が $T$ に依存せず $s=0$ と仮定したため、その寄与が消えた。これは特定の抽象的材料模型の整合性検算であり、一般の物質が熱膨張しない、あるいは $e$ が常に温度非依存という主張ではない。
<!-- solution-end -->
