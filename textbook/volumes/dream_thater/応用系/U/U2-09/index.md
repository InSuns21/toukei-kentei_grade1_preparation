# U2-09 拡張 Kalman フィルタ：どこで線形化するか

[Kalman フィルタの更新](../U2-05/index.md#thm-u2-05-update)は、状態と観測が線形で Gaussian なら厳密な条件付き分布を与えます。しかし前講の[距離・方位の観測関数](../U2-08/index.md#def-u2-08-range-bearing)は平方根と方向角を含み、[平面速度運動](../U2-07/index.md#def-u2-07-euler-approx)にも $\sin\theta,\cos\theta$ が現れます。非線形関数を Gaussian 変数に作用させた結果は、一般には Gaussian ではありません。

それでも姿勢の候補がある点の周辺に集中していれば、そこでは関数を**接線（一次 Taylor 展開）**で置き換えられます。拡張 Kalman フィルタ（extended Kalman filter, EKF）は、この局所的な近似を毎時刻作り直す推定法です。鍵になる問いは「**どの点で微分するか**」です。運動を線形化するのは前時刻の推定姿勢、観測を線形化するのは**当時刻の予測姿勢**です。観測を受け取ってから線形化点を都合よく取り直す方法とは区別します。

<!-- definition-example-audit: strict -->

## 1. 一次近似は何を近似するのか

時刻 $t\ge1$、既知入力 $u_t=(v_t,\omega_t)^T$（前進速度 m/s、角速度 rad/s）と $\Delta t>0$ 秒を固定します。[平面姿勢](../U2-06/index.md#def-u2-06-planar-pose)を列ベクトル $g=(x,y,\theta)^T$ とし、角度の内部計算は実数の連続する局所枝で行い、表示時に[角度の正規化](../U2-06/index.md#def-u2-06-angle-wrap)を行います。$[-\pi,\pi)$ の切替点で通常の微分をするのではありません。

[始点 Euler 運動](../U2-07/index.md#def-u2-07-euler-approx)を、速度に生じた小さな実数誤差 $\xi=(\xi_v,\xi_\omega)^T$ とともに書きます。

$$
f(g,u,\xi)=
\begin{pmatrix}
x+(v+\xi_v)\Delta t\cos\theta\\
y+(v+\xi_v)\Delta t\sin\theta\\
\theta+(\omega+\xi_\omega)\Delta t
\end{pmatrix}.
$$

最後の成分は局所的には wrap 前の値です。$\xi$ は**速度に加わる誤差**で、姿勢に直接足す雑音ではありません。$\xi$ は平均0、共分散 $M_t\in\mathbb R^{2\times2}$ のベクトルとし、直前の姿勢誤差から独立であると仮定します。ここでは追加の姿勢雑音は置きません。センサーについては、前講の $h(g,m)$ を、既知で正しく対応付けられたランドマーク $m=(a,b)$ に対して使用します。

一次 Taylor 展開とは、点 $a$ の近くで増分 $\delta$ に対し $k(a+\delta)\approx k(a)+Dk(a)\delta$ と置くことです。$Dk(a)$ は各出力成分を各入力成分で偏微分した **Jacobi 行列**であり、$Dk$ を計算してから必ず点 $a$ を代入します。剰余は微分可能性の下で $\|\delta\|$ より高次の小ささを持ちますが、有限の誤差では無視できるとは限りません。

<a id="def-u2-09-linearization-points"></a>

<!-- formal-statement-start -->
> **定義（EKF の局所線形化点）**  
> $f:\mathbb R^3\times\mathbb R^2\times\mathbb R^2\to\mathbb R^3$ が $(\bar g_{t-1}^{+},u_t,0)$ の近傍で微分可能、$h(\,\cdot\,,m)$ が $\bar g_t^-$ の近傍で連続する角度枝を選んだ下で微分可能とする。$q(\bar g_t^-,m)>0$ とする。前時刻の観測後推定を $\bar g_{t-1}^+$ と書き、まず
$$
\bar g_t^-=f(\bar g_{t-1}^+,u_t,0)
$$
> を計算する（角度は必要に応じ正規化する）。**運動の状態 Jacobi 行列** $F_t$ と**速度雑音 Jacobi 行列** $G_t$ は前時刻の観測後推定点で、**観測 Jacobi 行列** $H_t$ は当時刻の予測点で評価する。
$$
F_t=D_gf(\bar g_{t-1}^+,u_t,0),\qquad
G_t=D_\xi f(\bar g_{t-1}^+,u_t,0),\qquad
H_t=D_gh(\bar g_t^-,m).
$$
> それぞれの次元は $3\times3$、$3\times2$、$2\times3$ である。微分は角度の連続した局所座標で行う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-09-linearization-points -->
**定義の確認**：$\Delta t=1$、$u_t=(1,0)^T$、$\bar g_{t-1}^{+}=(-1,0,0)^T$ とすると、位置は $(-1,0)$ から $(0,0)$ に進み、$\bar g_t^-=(0,0,0)^T$ です。前時刻の $\theta=0$ に代入した $F_t$ の $(2,3)$ 成分は $v\Delta t\cos0=1$ です。一方、目印 $m=(3,4)$ では**予測後の**位置差が $(3,4)$ なので $q=25>0$、[観測の Jacobi 行列](../U2-08/index.md#prop-u2-08-observation-jacobian)は
$$
H_t=
\begin{pmatrix}
-3/5&-4/5&0\\
4/25&-3/25&-1
\end{pmatrix}.
$$
前時刻の位置 $(-1,0)$ で観測行列を評価すると距離が $\sqrt{32}$ になってしまい、予測観測 $5$ m の微分とは一致しません。定義の二つの評価点が異なることを直接確かめられます。
<!-- definition-example-end -->

具体的な $f$ を各変数で微分すると、$x$ や $y$ を変えたときの新しい位置変化はそれぞれ1、初期角度を変えたときの $x$ の増分は $-v\Delta t\sin\theta$ です。入力雑音の $\xi_v$ と $\xi_\omega$ に対する微分は別の列になります。よって

$$
F_t=
\begin{pmatrix}
1&0&-v_t\Delta t\sin\bar\theta_{t-1}^+\\
0&1&v_t\Delta t\cos\bar\theta_{t-1}^+\\
0&0&1
\end{pmatrix},
\quad
G_t=
\begin{pmatrix}
\Delta t\cos\bar\theta_{t-1}^+&0\\
\Delta t\sin\bar\theta_{t-1}^+&0\\
0&\Delta t
\end{pmatrix}.
$$

この $G_t$ は速度雑音 $M_t$ を姿勢誤差の単位へ変換します。$M_t$ の対角成分の単位は (m/s)² と (rad/s)² です。ここで $M_t$ をそのまま $3\times3$ の姿勢共分散へ加算するのは、次元も単位も誤りです。

## 2. 予測：小さな誤差の共分散を伝える

直前の観測までの履歴 $D_{t-1}$ を固定し、局所姿勢誤差 $e_{t-1}=g_{t-1}-\bar g_{t-1}^{+}$ の平均を0、共分散を $P_{t-1}^{+}\succeq0$ とします。角度差は代表値を適切に選んだ小さな局所差です。真の誤差の分布が広い場合、一本の局所枝で表せることは保証されません。

<a id="def-u2-09-ekf-prediction"></a>

<!-- formal-statement-start -->
> **定義（平面姿勢 EKF の予測）**  
> 上の $f$ と[局所線形化点](#def-u2-09-linearization-points)を用いる。$E[e_{t-1}]=0$、$\operatorname{Cov}(e_{t-1})=P_{t-1}^{+}\succeq0$、$E[\xi_t]=0$、$\operatorname{Cov}(\xi_t)=M_t\succeq0$、$e_{t-1}$ と $\xi_t$ の独立性を仮定する。**EKF の予測平均** $\bar g_t^-$ と**予測誤差共分散の一次近似** $P_t^-$ を
$$
\bar g_t^-=f(\bar g_{t-1}^+,u_t,0),\qquad
P_t^-=F_tP_{t-1}^{+}F_t^T+G_tM_tG_t^T
$$
> と計算する。角度平均は局所代表値のまわりの近似であり、厳密な円周平均であるとは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-09-ekf-prediction -->
**定義の確認**：第1節の入力で $F=\left(\begin{smallmatrix}1&0&0\\0&1&1\\0&0&1\end{smallmatrix}\right)$、$G=\left(\begin{smallmatrix}1&0\\0&0\\0&1\end{smallmatrix}\right)$ です。$P_{t-1}^+=\operatorname{diag}(0.04,0.04,0.01)$、$M=\operatorname{diag}(0.01,0.0025)$ とすると、行列の積は
$$
FP_{t-1}^+F^T=
\begin{pmatrix}
0.04&0&0\\
0&0.05&0.01\\
0&0.01&0.01
\end{pmatrix},
\qquad
GMG^T=\operatorname{diag}(0.01,0,0.0025).
$$
したがって
$$
P_t^-=
\begin{pmatrix}
0.05&0&0\\
0&0.05&0.01\\
0&0.01&0.0125
\end{pmatrix}.
$$
位置 $y$ と角度の共分散 $0.01$ は、初期向きの誤差が前進後の左右位置を変えることに対応します。各項は $3\times3$、対称であり、$FPF^T$ と $GMG^T$ の各二次形式は非負です。
<!-- definition-example-end -->

<a id="prop-u2-09-first-order-prediction"></a>

<!-- formal-statement-start -->
> **命題（独立誤差の一次伝播）**  
> $f$ が $(\bar g_{t-1}^+,u_t,0)$ で微分可能であり、姿勢の局所誤差 $e_{t-1}\in\mathbb R^3$ と速度雑音 $\xi_t\in\mathbb R^2$ が平均0、有限二次モーメントを持ち互いに独立とする。$F_t,G_t$ を[定義した評価点](#def-u2-09-linearization-points)で計算すると、一次の姿勢予測誤差 $\widetilde e_t=F_te_{t-1}+G_t\xi_t$ は平均0、共分散
$$
\operatorname{Cov}(\widetilde e_t)
=F_tP_{t-1}^+F_t^T+G_tM_tG_t^T
$$
> を持ち、右辺は対称半正定値である。これは真の非線形誤差の共分散との厳密な等号を主張しない。
<!-- formal-statement-end -->

**証明の見取り図**：状態と雑音の両方を同じ入力点で一次展開し、平均からの差の積を展開します。独立性が消すのは二つの**交差項**だけです。

<!-- proof-start -->
### 証明

局所枝で $g_{t-1}=\bar g_{t-1}^++e_{t-1}$ とし、$f$ を状態と速度雑音について一次 Taylor 展開すると
$$
f(\bar g_{t-1}^++e_{t-1},u_t,\xi_t)
=f(\bar g_{t-1}^+,u_t,0)+F_te_{t-1}+G_t\xi_t+\rho(e_{t-1},\xi_t)
$$
です。$\rho$ は $(e,\xi)\to(0,0)$ で $\|\rho\|/(\|e\|+\|\xi\|)\to0$ を満たします（局所枝から外れる点では適用しません）。この剰余を捨てた一次誤差を $\widetilde e_t$ とします。平均0性から $E[\widetilde e_t]=0$ であり、
$$
\begin{aligned}
E[\widetilde e_t\widetilde e_t^T]
={}&F_tE[e_{t-1}e_{t-1}^T]F_t^T
+G_tE[\xi_t\xi_t^T]G_t^T\\
&+F_tE[e_{t-1}\xi_t^T]G_t^T
+G_tE[\xi_te_{t-1}^T]F_t^T.
\end{aligned}
$$
独立性とそれぞれ平均0より、最後の二項は0です。残る二項に $P_{t-1}^+,M_t$ を代入すると結論です。任意の $a\in\mathbb R^3$ について
$$
a^TP_t^-a=(F_t^Ta)^TP_{t-1}^+(F_t^Ta)+(G_t^Ta)^TM_t(G_t^Ta)\ge0
$$
なので半正定値です。$\rho$ を含む真の誤差に同じ等号を適用することはできません。
<!-- proof-end -->

なぜ $P^-_{t}$ が「厳密な事前分布の共分散」ではないのでしょうか。例えば角度 $\Theta$ が揺らぐと $E[\cos\Theta]$ は一般に $\cos E[\Theta]$ と等しくありません。平均を $f(E[g],u,0)$ と置く段階から、既に非線形性の近似が入っています。

## 3. 更新：実測を得る前の予測点で観測を微分する

[観測関数](../U2-08/index.md#def-u2-08-range-bearing) $h(g,m)$ と [角度を補正した観測 観測残差](../U2-08/index.md#def-u2-08-innovation)を使います。予測姿勢 $\bar g_t^-$ で $q>0$、方位が近傍で連続に選べ、実測の方位残差が境界 $\pm\pi$ から離れているとします。実測は $z_t=(z_r,z_\beta)^T$、状態と独立で平均0、共分散 $R_t\succ0$ の観測雑音を仮定します。観測の**距離と角度を混ぜる $R_t$ の非対角成分**も理論上は許されます。

新しい観測を使ってから微分すれば、その観測を二重に使うような更新になり得ます。通常の EKF では $H_t=D_gh(\bar g_t^-,m)$ を測定値と無関係な予測点で固定し、予測観測との差を受け取ります。

<a id="def-u2-09-ekf-update"></a>

<!-- formal-statement-start -->
> **定義（距離・方位 EKF 更新）**  
> 既知の目印 $m$ に対する予測姿勢 $\bar g_t^-$、一次予測共分散 $P_t^-\succeq0$、$q(\bar g_t^-,m)>0$、観測雑音共分散 $R_t\succ0$ が与えられ、局所角度枝が使用できるとする。[観測 Jacobi 行列](../U2-08/index.md#prop-u2-08-observation-jacobian)を $H_t=D_gh(\bar g_t^-,m)$ で評価し、[U2-08 の距離・方位の観測残差](../U2-08/index.md#def-u2-08-innovation)を $\nu_t$ とする。次を EKF 更新と定める。
$$
\begin{aligned}
S_t&=H_tP_t^-H_t^T+R_t,\\
K_t&=P_t^-H_t^TS_t^{-1},\\
\bar g_t^+&=\operatorname{posewrap}(\bar g_t^-+K_t\nu_t),\\
P_t^+&=(I_3-K_tH_t)P_t^-(I_3-K_tH_t)^T+K_tR_tK_t^T.
\end{aligned}
$$
> $\operatorname{posewrap}$ は姿勢の第三成分だけを $[-\pi,\pi)$ に正規化する操作である。$S_t$ は $2\times2$ の正定値行列、$K_t$ は $3\times2$、$P_t^+$ は $3\times3$ の対称半正定値行列である。これらは**局所一次近似に基づく推定量**であり、非線形観測下の厳密な条件付き Gaussian 分布の主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-09-ekf-update -->
**定義の確認**：前節の $P_t^-$、$\bar g_t^-=(0,0,0)^T$、目印 $m=(3,4)$、$R_t=\operatorname{diag}(0.01,0.0025)$ とし、実測を $z=(5.2,\operatorname{atan2}(4,3)+0.1)^T$ とします。$q=25>0$、$\nu=(0.2,0.1)^T$、$H=\left(\begin{smallmatrix}-.6&-.8&0\\.16&-.12&-1\end{smallmatrix}\right)$ です。
$$
P^-H^T=
\begin{pmatrix}
-.030&.008\\-.040&-.016\\-.008&-.0137
\end{pmatrix},
\qquad
S=\begin{pmatrix}.060&.008\\.008&.0194\end{pmatrix}.
$$
$\det S=.060(.0194)-.008^2=.0011>0$ なので逆行列が存在します。後で第4節に全成分の積を示しますが、更新の結果は
$$
K\approx\begin{pmatrix}
-.587273&.654545\\
-.589091&-.581818\\
-.041455&-.689091
\end{pmatrix},
\qquad
\bar g_t^+=(-.052,-.176,-.0772)^T.
$$
位置と角度がともに更新され、出力は m, m, rad の単位を持ちます。$R\succ0$ と $P^-\succeq0$ から $S\succ0$ であり、定義の可逆性・次元条件も満たします。
<!-- definition-example-end -->

<a id="prop-u2-09-joseph"></a>

<!-- formal-statement-start -->
> **命題（局所 innovation 共分散と Joseph 更新）**  
> $\bar g_t^-$ の周囲で観測が $Z_t=h(\bar g_t^-,m)+H_te_t^-+\varepsilon_t$ と一次近似でき、$E[e_t^-]=E[\varepsilon_t]=0$、$\operatorname{Cov}(e_t^-)=P_t^-\succeq0$、$\operatorname{Cov}(\varepsilon_t)=R_t\succ0$、両者が独立であるとする。実数の連続角度枝で残差を扱うと、一次の観測残差の共分散は $S_t=H_tP_t^-H_t^T+R_t\succ0$ となり、任意の線形利得 $L\in\mathbb R^{3\times2}$ で補正する誤差の共分散は
$$
C(L)=(I_3-LH_t)P_t^-(I_3-LH_t)^T+LR_tL^T.
$$
> $K_t=P_t^-H_t^TS_t^{-1}$ とすると
$$
C(L)=C(K_t)+(L-K_t)S_t(L-K_t)^T
$$
> となり、$C(K_t)=P_t^--K_tS_tK_t^T$ である。Joseph 形 $C(K_t)$ は対称半正定値を保つ。
<!-- formal-statement-end -->

**証明の見取り図**：予測点における局所線形模型なら[線形 Kalman 更新](../U2-05/index.md#thm-u2-05-update)と同じ代数を使えます。ただし厳密 Gaussian の結論を非線形模型全体へ持ち越しません。

<!-- proof-start -->
### 証明

一次 観測残差 のランダムな部分は $H_te_t^-+\varepsilon_t$ です。独立かつ平均0より交差共分散は0、従って $\operatorname{Cov}=H_tP_t^-H_t^T+R_t=S_t$。非零 $a\in\mathbb R^2$ なら
$$
a^TS_ta=(H_t^Ta)^TP_t^-(H_t^Ta)+a^TR_ta>0
$$
なので $S_t$ は正定値です。利得 $L$ の補正後の一次誤差は $(I_3-LH_t)e_t^--L\varepsilon_t$ で、共分散を展開すれば
$$
C(L)=P_t^--LH_tP_t^--P_t^-H_t^TL^T+LS_tL^T.
$$
$K_tS_t=P_t^-H_t^T$、$S_tK_t^T=H_tP_t^-$ を使うと
$$
C(K_t)=P_t^--K_tS_tK_t^T.
$$
右辺を $C(L)$ から引けば
$$
\begin{aligned}
C(L)-C(K_t)
&=LS_tL^T-LS_tK_t^T-K_tS_tL^T+K_tS_tK_t^T\\
&=(L-K_t)S_t(L-K_t)^T.
\end{aligned}
$$
任意の $a$ に対し Joseph 形は $a^TC(K_t)a=\{(I-K_tH_t)^Ta\}^TP_t^-\{(I-K_tH_t)^Ta\}+(K_t^Ta)^TR_t(K_t^Ta)\ge0$。なおこの計算は**一次近似の誤差**についてのもので、非線形な真の事後共分散との一致は保証しません。
<!-- proof-end -->

## 4. 手計算で EKF を一周させる

数値はすべて時刻 $t$ におけるものです。前節と同じ例で、$P^-H^T$ と $S$ を掛ける順序を確認します。逆行列は
$$
S^{-1}=\frac1{.0011}
\begin{pmatrix}
.0194&-.008\\
-.008&.060
\end{pmatrix}.
$$
例えば利得の第1行は
$$
\begin{aligned}
K_{11}&=\{(-.030)(.0194)+(.008)(-.008)\}/.0011=-.000646/.0011,\\
K_{12}&=\{(-.030)(-.008)+(.008)(.060)\}/.0011=.000720/.0011.
\end{aligned}
$$
第2、3行も同じ二列の内積で求めると
$$
K=\frac1{11000}
\begin{pmatrix}
-6460&7200\\
-6480&-6400\\
-456&-7580
\end{pmatrix}.
$$
この分数行列は各値を小数第6位で丸める前の**正確な**利得です。実測残差の作用を成分ごとに計算すると
$$
\begin{aligned}
(K\nu)_1&=(-6460\cdot.2+7200\cdot.1)/11000=-.052,\\
(K\nu)_2&=(-6480\cdot.2-6400\cdot.1)/11000=-.176,\\
(K\nu)_3&=(-456\cdot.2-7580\cdot.1)/11000=-.0772.
\end{aligned}
$$
となります。ここで $K$ の第3行を $[-.041455,-.689091]$ とする計算は正しい一方、$P^+$ の全行列まで暗算で作る必要はありません。少なくとも $P^+$ を
$$
P^+=P^--(P^-H^T)S^{-1}(HP^-)
$$
として照合できます。実数演算での結果は
$$
P^+\approx
\begin{pmatrix}
.02714545&-.01301818&.00426909\\
-.01301818&.01712727&-.00268364\\
.00426909&-.00268364&.00272782
\end{pmatrix}.
$$
同じ行列を Joseph 形から計算して一致を検査します。丸めを途中で行うと、対称性や半正定値性を数値的に損なうことがあるため、計算では Joseph 形を推奨します。

## 5. うまくいかない例：局所接線は事後分布を知っていない

EKF が局所的に線形であるということと、**本当の事後分布が Gaussian** であるということは違います。最小反例を一次元で確認します。

<a id="prop-u2-09-nonlinear-posterior"></a>

<!-- formal-statement-start -->
> **命題（二乗観測の事後は一般に Gaussian でない）**  
> $X\sim N(0,1)$、独立な $\varepsilon\sim N(0,\sigma^2)$（$0<\sigma^2<2$）に対し、$Z=X^2+\varepsilon$ とする。観測値 $z=1$ の条件付き密度は
$$
p(x\mid z=1)\ \propto\
\exp\left[-\frac{x^2}{2}-\frac{(1-x^2)^2}{2\sigma^2}\right]
$$
> であり、原点 $x=0$ を局所最小とし、$x=\pm\sqrt{1-\sigma^2/2}$ に二つの極大を持つ。この事後密度は Gaussian 密度ではない。一方、観測 $h(x)=x^2$ を予測点 $0$ で線形化した EKF では $H=h'(0)=0$ なので利得は0となり、観測で平均も共分散も更新されない。
<!-- formal-statement-end -->

**証明の見取り図**：Bayes 則で事前密度と観測尤度を掛けます。密度の対数を微分すると、原点以外に二つの山が現れます。EKF では原点の接線が水平であるため、左右対称な二つの候補を区別できません。

<!-- proof-start -->
### 証明

Bayes 則では $p(x\mid z=1)\propto p(x)p(z=1\mid x)$ です。$X$ の密度は $\exp(-x^2/2)$ に比例し、$Z\mid X=x\sim N(x^2,\sigma^2)$ の密度は $\exp(-(1-x^2)^2/(2\sigma^2))$ に比例します。積が表示した式となり、指数が $x^4$ の負の項を含むので積分は有限で正です。

対数密度の定数を除く部分を $\ell(x)$ と書きます。微分すると
$$
\ell'(x)=-x+\frac{2x(1-x^2)}{\sigma^2}
=x\left(-1+\frac2{\sigma^2}-\frac{2x^2}{\sigma^2}\right).
$$
$\sigma^2<2$ より $\ell''(0)=-1+2/\sigma^2>0$ なので原点は局所最小です。他の停留点は $x^2=1-\sigma^2/2$ です。この点では
$$
\ell''(x)=-1+\frac2{\sigma^2}-\frac{6x^2}{\sigma^2}
=-\frac{4x^2}{\sigma^2}<0
$$
となり、左右の二点は局所極大です。Gaussian 密度は一つの峰しか持たず、二峰性の密度とは一致しません。

一方、$h'(x)=2x$ より $H=0$、$S=H^2P+R=\sigma^2>0$、$K=PH/S=0$ です。EKF の平均更新は $0+0(1-0)=0$、分散更新も $P^+=P=1$ となります。この差は数値丸めではなく**線形化で $x^2$ の変化を一次項として捉えられないこと**が原因です。
<!-- proof-end -->

また $h$ の場合だけでなく運動でも、例えば $\Theta\sim N(0,s^2)$（$s>0$）なら $\cos\Theta$ の真の平均は $e^{-s^2/2}$ なのに、予測平均で $\cos E[\Theta]=1$ と置きます。分布が広いほど差が増え、局所線形化の根拠が弱くなります（この公式自体を EKF の仮定にはしません）。

**利用前の診断**：$q=0$ で方向角の微分は定義されず、$q$ が小さいと $1/q$ の項が急変します。角度残差は必ず wrap し、真の分布が切替点をまたぐほど広がる場合は単一の局所 Gaussian 近似に注意します。滑りなどによる系統誤差・観測雑音との相関・ランドマーク誤対応があれば、独立平均0の模型が破れます。さらに巨大な 観測残差 に対しても $P^+$ は残差値に応じて自動増大しません。その診断の定量化は次講で扱います。

## 6. Python で行列・数値微分・反例を再現する

以下の一つの Python ファイルで、$F,G,H$ の解析式と中心差分、共分散の対称性、Joseph 形、利得の数値、二乗観測の二峰性を同じ入力から確認できます。角度の切替点で中心差分を使わず、ランドマークとの一致 $q=0$ も拒否します。乱数や外部ライブラリは使用しません。

~~~python-file-lab
# lab-id: U2-09-EKF
# lab-title: EKF の評価点・共分散・非線形観測の限界
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-09/assets/ekf_linearization.py
# timeout-ms: 30000
# lab-preset: 運動の Jacobi 行列を確かめる | --scenario motion
# lab-preset: 観測の Jacobi 行列を確かめる | --scenario observation
# lab-preset: EKF を一周させる | --scenario update
# lab-preset: 二峰性の反例 | --scenario nonlinear
# lab-preset: 全自己検査 | --self-test
~~~

## 7. 演習・詳細解答

### Level A：評価点、次元、符号

<a id="ex-u2-09-a01"></a>

**A1. 二つの微分点を選ぶ**

- Level: A

$\bar g_{t-1}^+=(1,2,0)$、$\Delta t=1$、$v=2,\omega=0$、目印 $m=(6,2)$ とする。始点 Euler 模型の予測姿勢と、$F,G,H$ の**評価点**を答えよ。$H$ の具体的な第1行も書け。

<!-- solution-start -->
**詳細解答**：[始点 Euler 運動](../U2-07/index.md#def-u2-07-euler-approx)では、$\cos0=1,\sin0=0$ なので、まず予測姿勢を計算します。

$$
\bar g_t^-=(1+2\cos0,\ 2+2\sin0,\ 0)=(3,2,0).
$$

[EKF の局所線形化点](#def-u2-09-linearization-points)により、$F,G$ は直前の観測後姿勢 $(1,2,0)$ と入力 $(2,0)$ で評価します。対して $H$ は、今計算した予測姿勢 $(3,2,0)$ で評価します。

目印への差は $d=(6-3,2-2)=(3,0)$ で、$q=9>0$、$r=3$ です。従って[測距・方位観測の姿勢 Jacobi 行列](../U2-08/index.md#prop-u2-08-observation-jacobian)の第1行は

$$
H_{1,:}=(-3/3,\ -0/3,\ 0)=(-1,0,0)
$$

となります。
<!-- solution-end -->

<a id="ex-u2-09-a02"></a>

**A2. 速度雑音と姿勢共分散の次元**

- Level: A

姿勢が3成分、速度雑音が2成分である。$G,M,GMG^T$ の次元を求め、速度分散 $M$ を $P$ に直接足してはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$G$ は姿勢3成分を速度雑音2成分で微分するため $3\times2$、$M$ は速度雑音2成分の共分散なので $2\times2$ です。$GM$ は $3\times2$、$GMG^T$ は $(3\times2)(2\times3)=3\times3$ です。$P$ は $3\times3$ なので $M$ との加算は行列次元から不可能です。加えて速度分散の単位は (m/s)²、(rad/s)² であり、時間係数 $\Delta t$ を含む $G$ を通して初めて m²、rad² などの姿勢共分散の単位に変わります。
<!-- solution-end -->

<a id="ex-u2-09-a03"></a>

**A3. 境界をまたぐ角度 観測残差**

- Level: A

予測方位 $179^\circ$、実測方位 $-179^\circ$ で測距差が $0.3$ m だった。$\nu$ を求め、角度の生差をそのまま更新に渡すと何が起こるか説明せよ。

<!-- solution-start -->
**詳細解答**：[角度付き観測 観測残差](../U2-08/index.md#def-u2-08-innovation)の距離成分は $0.3$ m。方位の生差は $-179^\circ-179^\circ=-358^\circ$、$360^\circ$ を加えた $2^\circ=\pi/90$ rad が $[-180^\circ,180^\circ)$ の代表値です。従って $\nu=(0.3,\pi/90)^T$（m, rad）です。$-358^\circ$ を使えば実際には2度しか違わない測定を巨大な残差として扱い、$K\nu$ が不要に大きくなることがあります。
<!-- solution-end -->

<a id="ex-u2-09-a04"></a>

**A4. 退化する観測位置**

- Level: A

予測姿勢 $(2,3,0)$、目印 $(2,3)$ で、距離・方位 EKF の $H$ を計算できるか。できない場合は $q$ と必要な模型変更を述べよ。

<!-- solution-start -->
**詳細解答**：$d=(2-2,3-3)=(0,0)$、$q=0$ です。[測距・方位予測の定義](../U2-08/index.md#def-u2-08-range-bearing)は方向角を含み $q>0$ を要求します。距離 $0$ は得られても目印への方向が一意に定まらず、$H$ の成分には $1/q$ や $1/\sqrt q$ が現れるので微分不能です。距離のみを使う別のモデルに切り替える場合も、その距離関数自体の原点での微分可能性を確認しなければなりません。少なくとも現在の2成分 EKF 更新は実施できません。
<!-- solution-end -->

<a id="ex-u2-09-a05"></a>

**A5. 接線が水平ならどうなるか**

- Level: A

一次元で事前平均 $0$、分散 $1$、観測 $h(x)=x^2$、雑音分散 $R=0.1$、実測 $z=1$ とする。予測点での $H,S,K$ と EKF 更新平均・分散を計算せよ。

<!-- solution-start -->
**詳細解答**：$h'(x)=2x$ なので $H=h'(0)=0$ です。$S=HPH^T+R=0+0.1=0.1>0$、$K=PH^TS^{-1}=1\cdot0/0.1=0$。残差は $1-h(0)=1$ ですが、更新平均は $0+0\cdot1=0$、Joseph 形の分散は $(1-0)^2\cdot1+0^2\cdot0.1=1$ です。[二峰性の反例](#prop-u2-09-nonlinear-posterior)のとおり、更新されないのは実測が無情報だからとは限りません。
<!-- solution-end -->

### Level B：導出と反例

<a id="ex-u2-09-b01"></a>

**B1. 速度模型の $F,G$ を一から導く**

- Level: B

始点 Euler 模型 $f(g,u,\xi)$ に対し、$F=D_gf$ と $G=D_\xi f$ の全成分を導け。特に $\theta=\pi/2$、$\Delta t=2$、$v=3$ を代入して各行列を書け。

<!-- solution-start -->
**詳細解答**：第1出力 $x+(v+\xi_v)\Delta t\cos\theta$ を $x,y,\theta$ で順に微分すると $1,0,-(v+\xi_v)\Delta t\sin\theta$、$\xi_v,\xi_\omega$ で微分すると $\Delta t\cos\theta,0$ です。第2出力から $0,1,(v+\xi_v)\Delta t\cos\theta$ と $\Delta t\sin\theta,0$、第3出力から $0,0,1$ と $0,\Delta t$ を得ます。$\xi=0$、$\sin(\pi/2)=1,\cos(\pi/2)=0$ を代入して
$$
F=\begin{pmatrix}1&0&-6\\0&1&0\\0&0&1\end{pmatrix},\qquad
G=\begin{pmatrix}0&0\\2&0\\0&2\end{pmatrix}.
$$
$F$ の $-6$ は角度誤差が世界 $x$ 方向の誤差を生むこと、$G$ の第2行は前進速度の誤差が世界 $y$ に出ることを表します。
<!-- solution-end -->

<a id="ex-u2-09-b02"></a>

**B2. 相関が生まれることを計算する**

- Level: B

$\bar\theta=0$、$\Delta t=1$、$v=2$ の運動で、$P^+=\operatorname{diag}(a,b,c)$（$a,b,c>0$）、$M=\operatorname{diag}(q_v,q_\omega)$（$q_v,q_\omega\ge0$）とする。$P^-$ の全要素を導き、$(2,3)$ 成分の意味を説明せよ。

<!-- solution-start -->
**詳細解答**：[運動 Jacobian](#def-u2-09-linearization-points)は $F=\left(\begin{smallmatrix}1&0&0\\0&1&2\\0&0&1\end{smallmatrix}\right)$、$G=\left(\begin{smallmatrix}1&0\\0&0\\0&1\end{smallmatrix}\right)$ です。まず
$$
FP^+=\begin{pmatrix}a&0&0\\0&b&2c\\0&0&c\end{pmatrix},
\qquad
FP^+F^T=\begin{pmatrix}a&0&0\\0&b+4c&2c\\0&2c&c\end{pmatrix}.
$$
また $GMG^T=\operatorname{diag}(q_v,0,q_\omega)$ です。従って
$$
P^-=\begin{pmatrix}a+q_v&0&0\\0&b+4c&2c\\0&2c&c+q_\omega\end{pmatrix}.
$$
$(2,3)$ 成分 $2c$ は旋回雑音と無関係に前時刻の姿勢角誤差 $c$ から生じます。初期向きがやや大きいと、2 m 前進した後の $y$ も増えるためです。
<!-- solution-end -->

<a id="ex-u2-09-b03"></a>

**B3. 二乗センサーの二峰性を検査する**

- Level: B

$X\sim N(0,1)$、$Z=X^2+\varepsilon$、$\varepsilon\sim N(0,1/2)$ が独立で実測 $z=1$ とする。厳密事後の極大点と原点の性質、EKF の予測点0での利得を求め、それらが異なる理由を述べよ。

<!-- solution-start -->
**詳細解答**：[非線形事後の命題](#prop-u2-09-nonlinear-posterior)の $\sigma^2=1/2$ に当たります。対数密度の導関数は
$$
\ell'(x)=x\{-1+2/(1/2)-2x^2/(1/2)\}=x(3-4x^2).
$$
従って停留点は $x=0,\pm\sqrt3/2$ です。$\ell''(0)=3>0$ なので原点は極小、$\ell''(\pm\sqrt3/2)=3-12(3/4)=-6<0$ なので二点は極大です。EKF は $h'(0)=0$ より $K=0$。厳密な事後は $z$ が左右対称な $|x|$ の情報を与える二峰分布ですが、原点の一次接線は両側への増減を表せないため、EKF はその情報を取り込めません。
<!-- solution-end -->

<a id="ex-u2-09-b04"></a>

**B4. 更新前に固定する微分点**

- Level: B

一次元の事前 $\bar x^-=2$、$P^-=1$、観測 $h(x)=x^2$、$R=1$、実測 $z=9$ とする。予測点で一度だけ EKF 更新し、更新後の非線形観測残差 $z-h(\bar x^+)$ を求めよ。更新後の点で $H$ を再計算することが同じ更新かどうか述べよ。

<!-- solution-start -->
**詳細解答**：予測点では $h(2)=4$、$H=h'(2)=4$、$\nu=9-4=5$、$S=4^2\cdot1+1=17$、$K=1\cdot4/17=4/17$ です。平均は
$$
\bar x^+=2+\frac4{17}\cdot5=\frac{54}{17}.
$$
更新後のモデル予測は $h(54/17)=2916/289$ なので、残差は
$$
9-\frac{2916}{289}=\frac{2601-2916}{289}=-\frac{315}{289}.
$$
これは0でありません。更新点で微分し直すと $h'(54/17)=108/17$ となり、利得も更新式も変わります。通常の一回の[EKF 更新](#def-u2-09-ekf-update)ではなく、反復線形化を伴う別の推定手続きです。反復したからといって必ず大域最適になるとも限りません。
<!-- solution-end -->

### Level C：予測から非線形観測更新まで

<a id="ex-u2-09-c01"></a>

**C1. 2次元ロボットの EKF 一周期**

- Level: C

直前の推定姿勢 $\bar g_{t-1}^+=(-1,0,0)^T$（m, m, rad）、$P_{t-1}^+=\operatorname{diag}(.04,.04,.01)$、$\Delta t=1$ s、入力 $v=1$ m/s、$\omega=0$ rad/s、独立な速度雑音共分散 $M=\operatorname{diag}(.01,.0025)$ とする。既知目印 $m=(3,4)$ m に対し、雑音共分散 $R=\operatorname{diag}(.01,.0025)$ の距離・方位観測 $z=(5.2,\operatorname{atan2}(4,3)+0.1)^T$（m, rad）が得られた。姿勢誤差と観測雑音は独立で角度の局所枝を利用できるものとする。

1. 始点 Euler 運動の $\bar g_t^-,F_t,G_t,P_t^-$ を求めよ。
2. $H_t,\nu_t,S_t,\det S_t$ を求め、$H_t$ の評価点を特定せよ。
3. $K_t,\bar g_t^+$ を計算せよ。
4. $P_t^+$ の $(1,1)$ 成分を二通りの式で検算し、Joseph 形が保持する性質を述べよ。
5. この計算が厳密 Gaussian 事後の計算と同義でない理由と、$q=0$・角度残差の条件を述べよ。

<!-- solution-start -->
**詳細解答**：

**(1)** [運動線形化](#def-u2-09-linearization-points)では $\sin0=0,\cos0=1$ より
$$
\bar g_t^-=(0,0,0)^T,\quad
F=\begin{pmatrix}1&0&0\\0&1&1\\0&0&1\end{pmatrix},\quad
G=\begin{pmatrix}1&0\\0&0\\0&1\end{pmatrix}.
$$
まず $FP_{t-1}^+F^T=\left(\begin{smallmatrix}.04&0&0\\0&.05&.01\\0&.01&.01\end{smallmatrix}\right)$、$GMG^T=\operatorname{diag}(.01,0,.0025)$ と順に掛けます。[一次誤差伝播](#prop-u2-09-first-order-prediction)により
$$
P^-=\begin{pmatrix}.05&0&0\\0&.05&.01\\0&.01&.0125\end{pmatrix}.
$$

**(2)** $H$ は**前時刻の姿勢でなく $\bar g_t^-=(0,0,0)$** で評価します。目印差は $(3,4)$、$q=25>0$ なので[観測 Jacobi 行列](../U2-08/index.md#prop-u2-08-observation-jacobian)と[角度 観測残差](../U2-08/index.md#def-u2-08-innovation)から
$$
H=\begin{pmatrix}-.6&-.8&0\\.16&-.12&-1\end{pmatrix},
\qquad \nu=(.2,.1)^T.
$$
次に $P^-H^T=\left(\begin{smallmatrix}-.03&.008\\-.04&-.016\\-.008&-.0137\end{smallmatrix}\right)$。これに $H$ を左から掛けて $R$ を加えると
$$
S=\begin{pmatrix}.060&.008\\.008&.0194\end{pmatrix},\qquad
\det S=.060(.0194)-(.008)^2=.001100>0.
$$
先頭主小行列式も $.060>0$ なので $S$ は正定値です。

**(3)** $S^{-1}=(1/.0011)\left(\begin{smallmatrix}.0194&-.008\\-.008&.06\end{smallmatrix}\right)$ です。従って $K=P^-H^TS^{-1}$ の積を作ると
$$
K=\frac1{11000}\begin{pmatrix}-6460&7200\\-6480&-6400\\-456&-7580\end{pmatrix}.
$$
残差の二成分と掛けて $K\nu=(-.052,-.176,-.0772)^T$、従って $\bar g_t^+=(-.052,-.176,-.0772)^T$ です。角度は $[-\pi,\pi)$ 内なので追加の wrap は不要です。

**(4)** [局所 innovation 共分散と Joseph 更新](#prop-u2-09-joseph)から減算形では $P^+_{11}=P^-_{11}-(KSK^T)_{11}$ です。第1行 $K_1=(-6460,7200)/11000$ と $(P^-H^T)_1=(-.03,.008)$ を使うと $KSK^T$ の $(1,1)$ は $K_1(HP^-)_{{:},1}=(-6460/11000)(-.03)+(7200/11000)(.008)=.022854545\ldots$ となり、
$$
P^+_{11}=.05-.022854545\ldots=.027145455\ldots.
$$
Joseph 形では $I-KH$ の第1行は
$$
(1,0,0)-K_1H=(.54290909\ldots,-.39127272\ldots,.65454545\ldots).
$$
これを $a$ と置くと $(P^+)_{11}=aP^-a^T+K_1RK_1^T$ です。第1項は $\approx.02262549$、第2項は $\approx.00451997$、合計 $\approx.02714545$ となります。両式で一致し、Joseph 形では共分散の対称・半正定値性を二つの非負項の和で保持します。

**(5)** 運動の三角関数と観測の平方根・方向角が非線形なので、一次展開の剰余を捨てた平均と共分散は厳密な事後モーメントとは限りません。[二乗観測の反例](#prop-u2-09-nonlinear-posterior)は非 Gaussian 事後を実際に示します。ここでは $q=25>0$、角度 観測残差 $0.1$ rad は局所枝の範囲内です。もし予測位置と目印が一致して $q=0$ なら方向角自体が未定義、予測方位と実測方位が $\pi$ の切替をまたぐなら通常の実数差を使えず、wrap と局所近似の妥当性を確認しなければなりません。
<!-- solution-end -->

## 8. この講義で身につけたこと

EKF は線形 Kalman の公式を非線形モデルへ**無条件に当てはめるものではありません**。運動の $F,G$ は直前の推定姿勢、観測の $H$ は新たな予測姿勢で評価します。$G M G^T$ は雑音を正しい座標と単位に移し、$H P^-H^T+R$ は観測を読む前の局所的な残差分散を作ります。角度は局所的に扱い、共分散は Joseph 形で更新します。線形化点が悪いときには事後が二峰となっても見落とし得る、という限界も見ました。

次講 **U2-10** では、観測残差 の二次形式による診断と、共分散を信用できない条件を詳しく調べます。
