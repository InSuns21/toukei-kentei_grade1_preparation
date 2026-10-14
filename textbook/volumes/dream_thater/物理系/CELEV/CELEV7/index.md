# CELEV7 周期軌道の第二変分・Floquetと安定性

<!-- definition-example-audit: strict -->

[CELEV6の正多角形舞踏解](../CELEV6/index.md#thm-celev6-regular-polygon)と[CELEV5の8の字解](../CELEV5/index.md#thm-celev5-eight-shape)で、衝突しない周期軌道が存在することを学びました。では、初期位置や初期速度をわずかにずらしても、近くを運動し続けるのでしょうか。**存在**と**安定**は別の問いです。

[CELEV1の作用](../CELEV1/index.md#def-celev1-extended-action)を二回変分すれば、軌道が作用の極小かどうかを調べられます。一方、Newton方程式を軌道に沿って線形化し、一周期後に微小誤差がどう変わるかを追えば力学的な安定性を調べられます。両者には同じ二階微分が現れますが、**周期境界条件での二次形式の符号**と**初期値問題の時間発展**では判定対象が違います。

本章では第二変分、Jacobi型方程式、モノドロミー行列、Floquet乗数を実際に導き、対称性が必ず作る中立方向を確認します。重心・回転・時間移動の自由度を一律に「消す」のではなく、どの拘束の下で何を測っているのかまで区別します。

## 1. 非衝突周期軌道に沿った第二変分

$n\ge2$、$m_i,G,T>0$ を固定します。以下の議論では、重心零の $C^\infty$ 級、非衝突 $T$ 周期Newton解 $q(t)=(q_1(t),\ldots,q_n(t))\in(\mathbb R^2)^n$ を**既に一つ持っている**と仮定します。存在の議論をここで繰り返すのではありません。非衝突性と周期性から、コンパクトな $[0,T]$ で全粒子間距離は正の下限を持ちます。

質量行列と重心零の配置部分空間を

$$
M=\operatorname{diag}(m_1I_2,\ldots,m_nI_2),\qquad
X=\left\{x\in(\mathbb R^2)^n:\sum_i m_ix_i=0\right\}
$$

と書きます。$M$ は $2n\times2n$ の正定値対角ブロック行列です。周期的な微小変位には、[CELEV1の周期ループ](../CELEV1/index.md#def-celev1-periodic-loop)と同じく $H^1_{\mathrm{per}}([0,T];X)$ を使います。これは $H^1$ 曲線 $\eta$ で $\eta(0)=\eta(T)$ を満たすものです。変分 $q+\varepsilon\eta$ の速度まで端点一致を定義で課す必要はありません。

Newtonの正の重力ポテンシャル

$$
U(x)=G\sum_{i<j}\frac{m_im_j}{|x_i-x_j|}
$$

の符号に注意してください。[CELE2のHamiltonian](../../CELE/CELE2/index.md#def-cele2-newton-nbody)は運動エネルギーから $U$ を引きますが、作用は運動エネルギーに $U$ を**足す**ものでした。二回変分してもこの正符号を保持します。

「第二変分」とは、作用を $\varepsilon$ について二回微分した値です。まず一対の粒子だけを考えると、相対位置を $r=x_i-x_j$、変位差を $h=\eta_i-\eta_j$ として

$$
\left.\frac{d}{d\varepsilon}|r+\varepsilon h|^{-1}\right|_{\varepsilon=0}
=-\frac{r\cdot h}{|r|^3}.
$$

分子と分母をさらに微分すると

$$
\left.\frac{d^2}{d\varepsilon^2}|r+\varepsilon h|^{-1}\right|_{\varepsilon=0}
=\frac{3(r\cdot h)^2}{|r|^5}-\frac{|h|^2}{|r|^3}.
$$

この式を全粒子対について足し、運動項も二回微分します。

<a id="def-celev7-second-variation"></a>
<!-- formal-statement-start -->
> **定義（周期軌道における第二変分）**  
> $q$ を上記の非衝突 $T$ 周期Newton解、$\eta,\xi\in H^1_{\mathrm{per}}([0,T];X)$ とする。作用 $\mathcal A_T$ の第二変分を双線形形式

$$
B_q(\eta,\xi)=\int_0^T
\left(\dot\eta^{\mathsf T}M\dot\xi+
\eta^{\mathsf T}D^2U(q(t))\xi\right)\,dt
$$

> と定める。対応する二次形式を $Q_q(\eta)=B_q(\eta,\eta)$ と書く。$D^2U$ は非衝突配置上のポテンシャルの $2n\times2n$ 対称Hessianである。
<!-- formal-statement-end -->

Hessianという記号を暗算の道具にしないために、ここでは成分式も固定します。$r_{ij}=q_i-q_j$、$h_{ij}=\eta_i-\eta_j$ とすれば

$$
Q_q(\eta)=\int_0^T\left[
\sum_i m_i|\dot\eta_i|^2+
G\sum_{i<j}m_im_j
\left\{
\frac{3(r_{ij}\cdot h_{ij})^2}{|r_{ij}|^5}
-\frac{|h_{ij}|^2}{|r_{ij}|^3}
\right\}\right]dt.
$$

この表示は質量による重心拘束を加えた変分にもそのまま使えます。$q$ が非衝突であるため、十分小さな $\varepsilon$ について $q+\varepsilon\eta$ も非衝突です。一次元 $H^1$ の連続代表は有界であり、距離の正の下限を使えるため、積分内の二回微分と積分の交換も正当化されます。

<!-- definition-example-start: def-celev7-second-variation -->
### 例：一対の粒子では半径方向と直交方向で符号が異なる

**定義の確認**。ある時刻の一対の相対位置が $r=(d,0)$、$d>0$、変位差が $h=(a,b)$ であるとします。直接代入すると

$$
\frac{3(r\cdot h)^2}{|r|^5}-\frac{|h|^2}{|r|^3}
=\frac{3d^2a^2}{d^5}-\frac{a^2+b^2}{d^3}
=\frac{2a^2-b^2}{d^3}.
$$

よって相対的な半径方向には正、直交方向には負の曲率があります。これは**その時刻のポテンシャル項の符号**であって、周期全体の $Q_q$ の符号ではありません。後者には速度項と全時刻の積分が必要です。
<!-- definition-example-end -->

### 停留性と極小性の差

[CELEV1の周期停留条件](../CELEV1/index.md#prop-celev1-periodic-stationarity)を用いると、Newton周期解では $\delta\mathcal A_T(q)[\eta]=0$ です。したがってTaylor展開の二次項は

$$
\mathcal A_T(q+\varepsilon\eta)
=\mathcal A_T(q)+\frac{\varepsilon^2}{2}Q_q(\eta)+o(\varepsilon^2).
$$

<a id="prop-celev7-minimum-necessary"></a>
<!-- formal-statement-start -->
> **命題（周期作用の局所極小の必要条件）**  
> 非衝突周期Newton解 $q$ が、$H^1_{\mathrm{per}}([0,T];X)$ におけるすべての十分小さな許容摂動に関して作用の局所極小なら、任意の $\eta\in H^1_{\mathrm{per}}([0,T];X)$ に対し $Q_q(\eta)\ge0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

局所極小であるなら $\varepsilon=0$ が各方向の一変数関数の極小です。その二階微分は非負になります。ただし**非負は必要条件であって十分条件ではありません**。高次項で増減が決まる場合があるからです。

<!-- proof-start -->
### 証明

$\eta$ を固定します。非衝突性から $|\varepsilon|$ を十分小さくすると $q+\varepsilon\eta$ は作用の定義域にあります。実数変数の関数 $f(\varepsilon)=\mathcal A_T(q+\varepsilon\eta)$ は二回微分可能です。局所極小より、$\varepsilon>0$ と $\varepsilon<0$ の両側に対して $f(\varepsilon)\ge f(0)$、かつ停留性から $f'(0)=0$ です。Taylor展開で

$$
0\le f(\varepsilon)-f(0)
=\frac{\varepsilon^2}{2}f''(0)+o(\varepsilon^2)
$$

となるので、$\varepsilon^2/2$ で割り $\varepsilon\to0$ とすれば $f''(0)=Q_q(\eta)\ge0$ です。$\square$
<!-- proof-end -->

**注意：対称制約を忘れない。** [CELEV4の同変ループ](../CELEV4/index.md#def-celev4-equivariant-loop)という部分空間 $\mathcal E$ 上で極小であっても、この命題が保証するのは $\eta\in\mathcal E$ に対する $Q_q(\eta)\ge0$ だけです。対称性を壊す方向の二次形式は、別に調べる必要があります。

## 2. 同じHessianからJacobi型方程式へ

作用の二次形式が比較するのは**周期端点を満たす曲線全体**です。では初期速度の誤差を与えたとき、その後どう増幅されるのでしょうか。今度は初期値問題を線形化します。

非衝突Newton方程式は $M\ddot q=\nabla U(q)$ です。$q+\varepsilon\eta$ を形式的に代入し、$\nabla U(q+\varepsilon\eta)=\nabla U(q)+\varepsilon D^2U(q)\eta+O(\varepsilon^2)$ と展開します。零次のNewton方程式を引いて $\varepsilon$ の一次まで残すと、変位 $\eta$ の線形方程式が得られます。

<a id="def-celev7-jacobi"></a>
<!-- formal-statement-start -->
> **定義（周期軌道に沿うJacobi型変分方程式）**  
> 非衝突 $T$ 周期Newton解 $q$ に沿い、重心零の変位 $\eta(t)\in X$ に対する線形方程式

$$
M\ddot\eta(t)=D^2U(q(t))\eta(t)
$$

> をJacobi型変分方程式と呼ぶ。これは初期データ $\eta(0),\dot\eta(0)$ を任意に与える初期値問題であり、$\eta(T)=\eta(0)$ を**初めからは課さない**。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev7-jacobi -->
### 例：二体の力の線形化を成分で確かめる

**定義の確認**。一対の粒子の相対位置 $r=(d,0)$、$d>0$ を固定し、関数 $f(r)=r/|r|^3$ を考えます。方向 $h=(a,b)$ での微分は

$$
Df(r)h=\frac{h}{|r|^3}-\frac{3r(r\cdot h)}{|r|^5}
=\frac1{d^3}(-2a,b).
$$

粒子1に働く加速度は $-Gm_2f(q_1-q_2)$ だから、その一次変化は

$$
\delta\ddot q_1
=-Gm_2\,Df(r)(\eta_1-\eta_2)
=\frac{Gm_2}{d^3}(2a,-b).
$$

二番目の粒子では加速度が $Gm_1f(q_1-q_2)$ となるため、同じ差ベクトル $h$ に沿って

$$
\delta\ddot q_2
=Gm_1\,Df(r)(\eta_1-\eta_2)
=-\frac{Gm_1}{d^3}(2a,-b)
$$

です。一番目の粒子と合わせると

$$
m_1\delta\ddot q_1+m_2\delta\ddot q_2=0.
$$

この質量付きの和が零になることは、線形化した加速度が重心零空間 $X$ に留まることの二体での直接確認です。また各加速度の式は、第1節の対ポテンシャルHessianから求めた力の一次変化をそれぞれの質量で割ったものと一致します。位置を微分する方向が**差ベクトル**であることと、Newtonの引力の符号の両方を確認しました。
<!-- definition-example-end -->

### 変分方程式と第二変分の関係

滑らかな周期変分 $\eta,\xi$ に対して、[周期第一変分の端点計算](../CELEV1/index.md#prop-celev1-first-variation)を用いれば

$$
B_q(\eta,\xi)
=\left[\eta^{\mathsf T}M\dot\xi\right]_0^T+
\int_0^T\eta^{\mathsf T}
\left(-M\ddot\xi+D^2U(q)\xi\right)dt.
$$

$\xi$ と $\dot\xi$ が周期的なら端点項は消えます。従ってJacobi方程式を満たす**周期的な** $\xi$ は $B_q(\eta,\xi)=0$ となります。ただし一般のJacobi初期値解は周期的とは限らず、この計算で周期端点を勝手に付け足せません。

## 3. モノドロミー行列を一周期の初期値写像として作る

[CDYN4の正規化基本行列・Floquet乗数の定義](../../../解析系/CDYN/CDYN4/index.md#def-cdyn4-monodromy)は一般の周期線形系のものです。ここではNewtonの重心零拘束に適合した座標でその定義を具体化します。線形二階方程式を一次系へ変えるとき、重心零という線形拘束を座標の上でも保持します。$X$ の基底を列に持つ $2n\times d$ 行列 $E$（$d=2n-2$）を選び、変位を $\eta=Eu$ と表します。$E$ の列は独立なので、制限質量行列と制限Hessian

$$
M_X=E^{\mathsf T}ME,\qquad
H_X(t)=E^{\mathsf T}D^2U(q(t))E
$$

はともに $d\times d$ で、$M_X$ は正定値、$H_X(t)$ は対称です。

この行列表示が元のJacobi方程式と同値になる理由も確かめます。$U$ は全粒子の同じ並進で変化しないので、任意の非衝突配置 $x$ と任意の方向 $h$ について

$$
\sum_i\nabla_{x_i}U(x)=0,
\qquad
\sum_i\bigl(D^2U(x)h\bigr)_i=0
$$

です。第二式は第一式を $x$ について方向微分して得られます。したがって $h\in X$ なら

$$
\sum_i m_i\bigl(M^{-1}D^2U(x)h\bigr)_i
=\sum_i\bigl(D^2U(x)h\bigr)_i=0,
$$

すなわち $M^{-1}D^2U(x)$ は $X$ を $X$ に写します。

$\eta=Eu$ をJacobi方程式に代入し、$E^{\mathsf T}$ で左から掛けると

$$
M_X\ddot u=H_X(t)u.
$$

逆にこの座標方程式を満たす $u$ から

$$
v=E\ddot u-M^{-1}D^2U(q)Eu
$$

を作ると、上の並進不変性から $v\in X$ であり、座標方程式から $E^{\mathsf T}Mv=0$ です。$v\in X$ なので $v=Ea$ と書け、$M_Xa=E^{\mathsf T}MEa=0$。$M_X$ の正定値性より $a=0$、従って $v=0$ です。これで単なる射影ではなく、**重心零のJacobi方程式と座標方程式が同値**であることが分かりました。

その正準運動量を $p=M_X\dot u$ とすると、次の**具体的な**一次系が得られます。

$$
z(t)=\binom{u(t)}{p(t)},\qquad
\dot z(t)=A(t)z(t),\qquad
A(t)=
\begin{pmatrix}
0&M_X^{-1}\\
H_X(t)&0
\end{pmatrix},
\qquad A(t+T)=A(t).
$$

従って $z$ は $2d=4n-4$ 成分です。この節以降の一次系の証明では、式を読みやすくするため制限後の $M_X,H_X$ をそれぞれ $M,H$ と略記し、一次系の位置変分 $u$ を $\eta$ と書きます。元の $2n$ 成分に対するHessianと、制限された $d$ 成分に対するHessianを混同しないための約束です。

初期値 $z(0)=v$ を与えると、線形微分方程式の一意解が時刻 $t$ に決まります。標準基底ベクトルをそれぞれ初期値として解いた列を並べれば、一つの行列 $\Phi(t)$ によって $z(t)=\Phi(t)v$ と書けます。

<a id="def-celev7-monodromy"></a>
<!-- formal-statement-start -->
> **定義（基本解行列・モノドロミー行列・Floquet乗数）**  
> 非衝突 $T$ 周期Newton軌道について、重心並進を除いたJacobi一次系 $\dot z=A(t)z$ を考える。次の初期値問題の行列解を基本解行列とする。

$$
\dot\Phi(t)=A(t)\Phi(t),\qquad \Phi(0)=I.
$$

> 一周期後の行列を

$$
\mathcal M=\Phi(T)
$$

> と置いてモノドロミー行列と呼び、その複素固有値をFloquet乗数と呼ぶ。固有値は代数的重複度込みで数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev7-monodromy -->
### 例：調和振動子で一周期の写像を手で計算する

**定義の確認**。一自由度の模型 $\ddot x=-\omega^2x$（$\omega>0$）について $z=(x,\dot x)^{\mathsf T}$ とすると、

$$
\Phi(t)=
\begin{pmatrix}
\cos\omega t&\sin(\omega t)/\omega\\
-\omega\sin\omega t&\cos\omega t
\end{pmatrix}.
$$

$t=0$ で $\Phi(0)=I$。各成分を微分すると $\dot\Phi=\bigl(\begin{smallmatrix}0&1\\-\omega^2&0\end{smallmatrix}\bigr)\Phi$ を満たします。任意の比較期間 $T>0$ のモノドロミーは $\Phi(T)$ で、固有方程式は

$$
\lambda^2-2\cos(\omega T)\lambda+1=0,
\qquad\lambda=e^{\pm i\omega T}.
$$

この例は線形代数上の最小模型であり、重力系の全体を調和振動子だと仮定していません。
<!-- definition-example-end -->

### 一周期ごとの積の規則

[CDYN4の周期シフト定理](../../../解析系/CDYN/CDYN4/index.md#thm-cdyn4-period-shift)を本章の $A(t)$ に適用します。非衝突周期軌道から作ったHessianが $T$ 周期なので、係数も $A(t+T)=A(t)$ を満たします。$\Phi(t+T)$ と $\Phi(t)\mathcal M$ を比較します。両者は同じ微分方程式を満たし、$t=0$ でともに $\mathcal M$ です。解の一意性から

$$
\Phi(t+T)=\Phi(t)\mathcal M,\qquad
\Phi(kT)=\mathcal M^k\quad(k=0,1,\ldots).
$$

したがってFloquet乗数は、**一周期後の微小誤差の増幅率**を測ります。連続時間全体の有界性を知るには、周期間の行列 $\Phi(s)$（$0\le s\le T$）も見る必要がありますが、これはコンパクト区間上連続なので有界です。

## 4. Hamilton系だから乗数には逆数対称性がある

非衝突Newton系の線形化はHamilton型です。対称Hessianという性質から、相空間で保存される交代形式を直接証明できます。$z=(\eta,\pi)$、$w=(\xi,\rho)$ に対して

$$
\Omega(z,w)=\eta^{\mathsf T}\rho-\pi^{\mathsf T}\xi
$$

と置きます。これは位置・運動量空間での符号付き面積に相当する双線形形式です。$\Omega(w,z)=-\Omega(z,w)$、従って $\Omega(z,z)=0$ となるので**交代的**です。また任意の $w$ に対して $\Omega(z,w)=0$ なら $z=0$ となる性質（**非退化性**）もあります。

この二つの条件を行列で確かめます。位置・運動量の成分を並べると

$$
\Omega(z,w)=z^{\mathsf T}Jw,\qquad
J=\begin{pmatrix}0&I_d\\-I_d&0\end{pmatrix},
\qquad J^{\mathsf T}=-J,\quad J^2=-I_{2d}.
$$

$J$ は可逆なので、$z^{\mathsf T}Jw=0$ が全ての $w$ で成り立てば $z^{\mathsf T}J=0$、従って $z=0$ です。この $J$ が表しているのは**制限後の $2d$ 次元位相空間**の交代形式であり、元の $2n$ 成分の配置空間に掛ける行列ではありません。

<a id="thm-celev7-symplectic"></a>
<!-- formal-statement-start -->
> **定理（Jacobi流の交代形式保存と乗数の逆数対称性）**  
> 非衝突 $T$ 周期Newton軌道に沿う重心零Jacobi方程式の基本解行列 $\Phi$ は

$$
\Phi(t)^{\mathsf T}J\Phi(t)=J
$$

> を満たす。従って $\mathcal M=\Phi(T)$ は可逆で $\det\mathcal M=1$、Floquet乗数は代数的重複度を込めて $\lambda$ と $\lambda^{-1}$ の対で現れる。係数は実数なので、非実乗数は共役 $\bar\lambda$ も伴う。
<!-- formal-statement-end -->

### 証明の見取り図

二つのJacobi初期値解を用意し、$\Omega$ を時間微分します。質量行列の対称性と $D^2U$ の対称性のため二種類の項が対消滅します。基本解行列による保存式を得たら、逆行列と転置行列の関係を求めると、固有値が逆数の対となることが分かります。

<!-- proof-start -->
### 証明

$\dot\eta=M^{-1}\pi$、$\dot\pi=H(t)\eta$、$\dot\xi=M^{-1}\rho$、$\dot\rho=H(t)\xi$ とします。ただしここでの $H(t)=H_X(t)=E^{\mathsf T}D^2U(q(t))E$ は、**第3節で重心零空間に制限した $d\times d$ の実対称行列**です。積の微分を展開して

$$
\begin{aligned}
\frac{d}{dt}\Omega(z,w)
&=\dot\eta^{\mathsf T}\rho+\eta^{\mathsf T}\dot\rho
-\dot\pi^{\mathsf T}\xi-\pi^{\mathsf T}\dot\xi\\
&=\pi^{\mathsf T}M^{-1}\rho+\eta^{\mathsf T}H\xi
-\eta^{\mathsf T}H^{\mathsf T}\xi-\pi^{\mathsf T}M^{-1}\rho=0.
\end{aligned}
$$

初期値 $v,w$ から始まる解は $\Phi(t)v,\Phi(t)w$ です。従って任意の $v,w$ に対し

$$
v^{\mathsf T}\Phi(t)^{\mathsf T}J\Phi(t)w
=v^{\mathsf T}Jw.
$$

ゆえに保存式が成立します。$\Phi$ の可逆性は[CDYN4の正規化基本行列](../../../解析系/CDYN/CDYN4/index.md#def-cdyn4-fundamental-matrix)の初期値一意性から従い、$J$ の可逆性は上で示した $J^2=-I_{2d}$ から従います。行列式を取ると $(\det\Phi)^2=1$、連続性と $\det\Phi(0)=1$ から $\det\Phi(t)=1$ です。

次に $\mathcal M^{\mathsf T}J\mathcal M=J$ の両辺を変形して

$$
\mathcal M^{-1}=J^{-1}\mathcal M^{\mathsf T}J
$$

を得ます。右辺は $\mathcal M^{\mathsf T}$ と相似であるため、$\mathcal M^{-1}$ と $\mathcal M$ は同じ固有値を重複度込みで持ちます。他方、逆行列の固有値は $\lambda^{-1}$ です。よって逆数対称性が従います。また $\mathcal M$ の成分は実数なので特性多項式は実係数であり、非実根は複素共役と組になります。$\square$
<!-- proof-end -->

たとえば $|\lambda|>1$ なら対となる $|\lambda^{-1}|<1$ があり、膨張方向と収縮方向が同居します。逆数の関係を無視して、全ての乗数が単位円の**内側**だから安定だと判定することはHamilton系ではできません。

## 5. 線形有界性、第二変分、非線形安定性は別物

まず線形化方程式の解の有界性だけを判定します。[LA4のJordan標準形定理](../../../基礎科目/LA/LA4/index.md#thm-la4-jordan-form)を複素行列 $\mathcal M$ に適用すると、固有値 $\lambda$ に属するブロックは $J_\lambda=\lambda I+N$（$N$ は冪零）と書けます。$N\ne0$ のブロックでは $(\lambda I+N)^k$ に $k\lambda^{k-1}N$ の項が現れるため、固有値の絶対値が1でも増幅が起こり得ます。ここで必要なのは固有値の位置だけでなくJordanブロックの大きさです。

<a id="thm-celev7-floquet-criterion"></a>
<!-- formal-statement-start -->
> **定理（Hamilton周期線形系の有界性判定）**  
> 第4節の重心零Jacobi方程式について、**各初期値から出発する解が $t\ge0$ にわたって有界**であること（同値に、初期値のノルムが1以下の解に共通の時間一様な上界があること）と、次の二条件は同値である。
>
> (i) モノドロミー行列の全てのFloquet乗数が $|\lambda|=1$ を満たす。
>
> (ii) モノドロミー行列は複素数体上で対角化可能である（単位円上に非自明なJordanブロックがない）。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi(kT)=\mathcal M^k$ なので周期ごとの有界性は行列のべきの有界性です。対角化でき、全固有値が単位円上ならべきは有界です。逆に膨張固有値は無界性を生み、単位円上のJordanブロックも多項式的な増大を生みます。Hamilton系では逆数対称性から、単位円外の固有値を全て収縮側に置くことはできません。

<!-- proof-start -->
### 証明

$t=kT+s$、$0\le s<T$ と書けば第3節の周期積の規則より

$$
\Phi(t)=\Phi(s)\mathcal M^k.
$$

連続な $\Phi(s)$ は $[0,T]$ 上で有界です。従って $\mathcal M^k$ が有界なら全ての変分解は有界です。逆に全初期値からの解が有界なら、標準基底の各初期値に対する $\Phi(kT)$ の列が有界なので、有限次元性から $\mathcal M^k$ は有界です。

$\mathcal M=SDS^{-1}$、$D=\operatorname{diag}(\lambda_1,\ldots,\lambda_{2d})$ と対角化でき、全 $|\lambda_j|=1$ なら

$$
\|\mathcal M^k\|\le\|S\|\|S^{-1}\|\|D^k\|
$$

で $\|D^k\|=1$（Euclid作用素ノルム）だから有界です。反対に $|\lambda|>1$ の固有ベクトル $v$ があれば $\mathcal M^kv=\lambda^kv$ は無界です。$|\lambda|<1$ しか単位円外に無い可能性は、[逆数対称性](#thm-celev7-symplectic)により排除されます。

残る場合として単位円上にJordanブロック $J_\lambda=\lambda I+N$（$N\ne0$、冪零）があれば、長さ2のJordan連鎖 $Nv_2=v_1$、$Nv_1=0$ を選べます。二項展開により

$$
J_\lambda^kv_2
=\lambda^kv_2+k\lambda^{k-1}v_1
$$

となるので有界ではありません。したがって全ブロックが長さ1でなければならず、対角化可能です。$\square$
<!-- proof-end -->

### 例：乗数が1でもJordanブロックがあると線形有界とは限らない

$\dot x=p,\ \dot p=0$ なら、任意の $T>0$ で

$$
\mathcal M=\begin{pmatrix}1&T\\0&1\end{pmatrix},
\qquad
\mathcal M^k=\begin{pmatrix}1&kT\\0&1\end{pmatrix}.
$$

固有値は重複度2の $1$ ですが、初期値 $(x(0),p(0))=(0,1)$ から $x(kT)=kT$。これは第4節の交代形式を保存する線形Hamilton系でも起こります。


### 正の第二変分なのに不安定になる例

最も重要な誤解を一つの一自由度模型で潰します。

$$
\mathcal A_T[x]=\int_0^T\left(\frac12\dot x^2+\frac{a^2}{2}x^2\right)dt,\qquad a>0.
$$

周期ループ $x\equiv0$ は厳密な大域極小で、その第二変分は

$$
Q_0(\eta)=\int_0^T(\dot\eta^2+a^2\eta^2)\,dt>0
\quad(\eta\ne0).
$$

しかしEuler–Lagrange方程式は $\ddot x=a^2x$。微小摂動 $x(0)=\varepsilon,\dot x(0)=a\varepsilon$ の解は $x(t)=\varepsilon e^{at}$ で増大します。モノドロミーの乗数は $e^{\pm aT}$ です。**作用極小と力学的不安定は実際に両立します。** これは重力ポテンシャルそのものではない比較模型ですが、論理上「第二変分が正ならFloquet安定」という推論が成り立たないことを示しています。

逆に $\mathcal A_T[x]=\int_0^T(\dot x^2-\omega^2x^2)\,dt/2$ では $\ddot x=-\omega^2x$ なので全初期値解は有界です。しかし定数変分 $\eta\equiv1$ を入れると $Q_0(\eta)=-\omega^2T<0$ です。線形有界性は周期作用の局所極小性も保証しません。

**非線形安定性**では、有限の（ただし小さい）摂動を入れた元の非線形Newton解が軌道近傍に留まるかを問います。線形化が有界というだけでは、高次項の長時間累積を制御できず、非線形安定性を結論できません。[CELE7の共鳴とKAMの導入](../../CELE/CELE7/index.md#def-cele7-resonant-angle)に接続する議論では、非共鳴・非退化性など追加条件が問題になります。本章は一般のKAM定理を新たに主張しません。

## 6. 周期軌道をずらすと乗数1が現れる

Newton方程式は時間を平行移動しても、平面全体を回転しても同じ形を保ちます。したがって、一つの周期解の[時間位相](../../../解析系/CDYN/CDYN3/index.md#def-cdyn3-orbit-phase)または**全体の向き**を少し変えた解の族が存在します。この解の族をパラメータ微分すると、Jacobi方程式の具体解になります。

平面で $J_2=\bigl(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\bigr)$ を90度回転とし、粒子全部に同じ $J_2$ を作用させることを $J_{\rm rot}$ と書きます。

<a id="prop-celev7-neutral-modes"></a>
<!-- formal-statement-start -->
> **命題（時間移動・回転による中立モード）**  
> 重心零の非衝突 $T$ 周期Newton解 $q$ に対し、次の二つの変位はJacobi型変分方程式の周期解となる。

$$
\eta_{\rm time}=\dot q,\qquad
\eta_{\rm rot}=J_{\rm rot}q.
$$

> 非零の初期データを持つ各方向は、モノドロミー行列の乗数 $1$ に属する固有ベクトルを与える。ただし両者が線形独立とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

時間移動は $q(t+s)$、回転は $R_\theta q(t)$ という真のNewton解の族を作ります。力の時間独立性と回転共変性を確かめ、$s=0$、$\theta=0$ で微分します。周期性も同時に微分できるので一周期後に同じ変位・速度となります。

<!-- proof-start -->
### 証明

時間独立なNewton方程式 $M\ddot q(t+s)=\nabla U(q(t+s))$ を $s$ で微分して $s=0$ とすると

$$
M\frac{d^2}{dt^2}\dot q(t)
=D^2U(q(t))\dot q(t)
$$

を得ます。$q(t+T)=q(t)$ を微分すれば $\dot q,\ddot q$ も周期的です。

また $U(R_\theta x)=U(x)$ は粒子間距離の回転不変性によるものです。勾配には $\nabla U(R_\theta x)=R_\theta\nabla U(x)$ が成立し、$R_\theta q(t)$ もNewton解となります。この方程式を $\theta=0$ で微分して

$$
M\frac{d^2}{dt^2}(J_{\rm rot}q)
=D^2U(q)J_{\rm rot}q
$$

を得ます。回転によって重心零条件も保たれ、$J_{\rm rot}q$ とその速度は周期的です。対応する位相空間の初期ベクトル $v$ は $\Phi(T)v=v$ を満たします。$\dot q$ と $J_{\rm rot}q$ が比例すれば一つの方向しか作らないことに注意します。$\square$
<!-- proof-end -->

### 例：円形二体軌道では二つのモードが重なる

[CELEV6の正二角形Newton解](../CELEV6/index.md#thm-celev6-regular-polygon)では

$$
q_1(t)=R(\cos\omega t,\sin\omega t),\qquad
q_2(t)=-q_1(t),\quad
\omega^2=\frac{Gm}{4R^3}.
$$

各粒子について $\dot q_i=\omega J_2q_i$ なので、時間移動方向と回転方向は $\eta_{\rm time}=\omega\eta_{\rm rot}$ と**同一直線上**です。乗数1の固有ベクトルが「必ず2本ある」と数えるのは誤りです。重複度や一般化固有ベクトルは別に調べる必要があります。


### どの自由度を除いた安定性なのか

1. **重心並進**：総運動量・重心の保存により独立に分かれる並進モードは、すでに $X$ への制限で除きました。全空間のモノドロミーと重心零のものを比較するときは次元の違いに注意します。
2. **時間位相**：自律系では軌道上を少し先回りする変位が中立です。軌道そのものへの距離を調べる場合、時間位相の違いを同一視することがあります。ただしこの操作は単に行列の固有値1を削除することではありません。
3. **回転**：回転方向が独立なら、全体の向きを同一視することがあります。一定角運動量の水準集合上で回転群による縮約を行う場合は、作用の自由性や水準集合の正則性を確認します。
4. **横断面**：エネルギー面内で流れに横断する断面を選び、周期軌道の一周後に断面へ戻す写像の微分を調べます。これがPoincaré帰還写像による安定性判定です。エネルギー面と断面が滑らかな場合に限る操作で、拘束によって許容方向が変わります。

対称ループに制限した $Q_q$ と全変分の $Q_q$ を比較する際も同じです。**軌道の存在を得るための対称性**と、**対称性を壊す初期値摂動に対する安定性**は同じ検査ではありません。[VAR11の臨界点](../../../解析系/VAR/VAR11/index.md#def-var11-critical)やminimaxによる非極小型軌道を扱う場合も、発展事項である[VAR12のMorse指数](../../../解析系/VAR/VAR12/index.md#def-var12-index-nullity)（負方向の最大次元）とFloquet乗数を同じ指標として読んではいけません。

## 7. 演習：変分の符号から時間発展まで

### Level A

<a id="ex-celev7-a01"></a>
**A1. 逆距離のHessian。** $r=(d,0)$、$h=(a,b)$（$d>0$）について $d^2|r+\varepsilon h|^{-1}/d\varepsilon^2$ を $\varepsilon=0$ で計算し、$a$ と $b$ の符号差を説明せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$f(\varepsilon)=[(d+\varepsilon a)^2+\varepsilon^2b^2]^{-1/2}$ とおくと

$$
f'(\varepsilon)=-[(d+\varepsilon a)a+\varepsilon b^2]
[(d+\varepsilon a)^2+\varepsilon^2b^2]^{-3/2}.
$$

もう一度微分し $\varepsilon=0$ を代入して

$$
f''(0)=-(a^2+b^2)d^{-3}+3d^2a^2d^{-5}
=\frac{2a^2-b^2}{d^3}.
$$

半径方向 $b=0$ では正、直交方向 $a=0$ では負です。ただし作用の第二変分には運動項と時間積分があるため、この瞬間の符号だけで作用極小を判定できません。
<!-- solution-end -->

<a id="ex-celev7-a02"></a>
**A2. 作用の二次項。** $L(x,\dot x)=\frac12\dot x^2+\frac c2x^2$、$c\in\mathbb R$ とする。周期解 $x\equiv0$ に沿う第二変分と線形化方程式を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$x=\varepsilon\eta$ を代入すると

$$
\mathcal A_T[\varepsilon\eta]
=\frac{\varepsilon^2}{2}\int_0^T(\dot\eta^2+c\eta^2)\,dt,
\qquad Q_0(\eta)=\int_0^T(\dot\eta^2+c\eta^2)\,dt.
$$

Euler–Lagrange方程式は $\frac{d}{dt}(\partial L/\partial\dot x)-\partial L/\partial x=\ddot x-cx=0$ だから、変分方程式は $\ddot\eta=c\eta$ です。第二変分における $+c$ と運動方程式の右辺の $+c$ は同じ符号に由来します。
<!-- solution-end -->

<a id="ex-celev7-a03"></a>
**A3. 時間移動による零モード。** $\ddot q=F(q)$ が自律方程式で、$F$ が $C^1$、$q$ が非定数の $C^3$ 級周期解とする。$\eta=\dot q$ が線形化方程式を満たすことを示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

もとの方程式の両辺を時間微分すると $\dddot q=DF(q)\dot q$ です。$\eta=\dot q$ なら $\ddot\eta=\dddot q$ だから

$$
\ddot\eta=DF(q(t))\eta.
$$

さらに $q(t+T)=q(t)$ の微分より $\eta(t+T)=\eta(t)$ と $\dot\eta(t+T)=\dot\eta(t)$ です。$q$ が非定数なら $\dot q$ は恒等的には零でないので、その初期データを適切な位相で取ると乗数1の固有ベクトルを得ます。[時間移動の命題](#prop-celev7-neutral-modes)の一般模型です。
<!-- solution-end -->

<a id="ex-celev7-a04"></a>
**A4. 振動子のFloquet乗数。** $\ddot x=-4x$ を期間 $T=\pi/3$ ごとに観察する。モノドロミー行列と二つの乗数を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[基本解行列の例](#def-celev7-monodromy)で $\omega=2$ と置くと

$$
\mathcal M=
\begin{pmatrix}
\cos(2\pi/3)&\frac12\sin(2\pi/3)\\
-2\sin(2\pi/3)&\cos(2\pi/3)
\end{pmatrix}
=\begin{pmatrix}-1/2&\sqrt3/4\\-\sqrt3&-1/2\end{pmatrix}.
$$

$\operatorname{tr}\mathcal M=-1$、$\det\mathcal M=1$ から $\lambda^2+\lambda+1=0$、すなわち $\lambda=(-1\pm i\sqrt3)/2$ です。両方の絶対値は1です。
<!-- solution-end -->

<a id="ex-celev7-a05"></a>
**A5. 逆数対称性。** 実行列のHamilton線形モノドロミーに $\lambda=2$ が乗数として現れた。少なくともどの乗数が必ず現れ、線形有界性について何が言えるか。

- Level: A

<!-- solution-start -->
### 詳細解答

[Jacobi流の交代形式保存と乗数の逆数対称性](#thm-celev7-symplectic)から $1/2$ も同じ重複度で乗数として現れます。実数 $2$ の共役は $2$ 自身なので、共役性から別の値は増えません。$2$ に属する固有ベクトル $v\ne0$ では $\mathcal M^kv=2^kv$ だから無界です。よって[有界性判定](#thm-celev7-floquet-criterion)は失敗します。
<!-- solution-end -->

### Level B

<a id="ex-celev7-b01"></a>
**B1. Wronskian型保存則。** $\dot\eta=M^{-1}\pi,\ \dot\pi=H(t)\eta$、$\dot\xi=M^{-1}\rho,\ \dot\rho=H(t)\xi$ で $M=M^{\mathsf T}>0$、$H(t)=H(t)^{\mathsf T}$ とする。$\eta^{\mathsf T}\rho-\pi^{\mathsf T}\xi$ の保存を導き、行列式についての結論を述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

積の微分で

$$
\begin{aligned}
\frac d{dt}(\eta^{\mathsf T}\rho-\pi^{\mathsf T}\xi)
&=(M^{-1}\pi)^{\mathsf T}\rho+\eta^{\mathsf T}H\xi\\
&\quad-(H\eta)^{\mathsf T}\xi-\pi^{\mathsf T}M^{-1}\rho\\
&=\pi^{\mathsf T}(M^{-1})^{\mathsf T}\rho-\pi^{\mathsf T}M^{-1}\rho
+\eta^{\mathsf T}(H-H^{\mathsf T})\xi=0.
\end{aligned}
$$

任意の初期ベクトルに成り立つので $\Phi^{\mathsf T}J\Phi=J$。行列式を取れば $(\det\Phi)^2=1$、$\det\Phi(0)=1$ と連続性により $\det\Phi(t)=1$、特に $\det\mathcal M=1$ です。
<!-- solution-end -->

<a id="ex-celev7-b02"></a>
**B2. 対称制約つき極小の落とし穴。** $\Phi(x,y)=x^2-y^2$ のもとで、鏡映 $(x,y)\mapsto(x,-y)$ で不変な集合 $\mathcal E=\{(x,0)\}$ を考える。原点の第二変分を全平面と $\mathcal E$ で比較せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$\Phi(0,0)=0$、勾配も原点で零です。二次形式は

$$
D^2\Phi(0,0)[(a,b),(a,b)]=2a^2-2b^2.
$$

$\mathcal E$ の接方向では $b=0$ なので $2a^2\ge0$、しかも $\Phi(x,0)=x^2\ge0$ で原点は制約集合上の厳密な極小です。一方、全平面では方向 $(0,1)$ を取ると第二変分は $-2<0$、実際 $\Phi(0,y)=-y^2<0$ です。[局所極小の必要条件](#prop-celev7-minimum-necessary)を使う際、どの許容変分空間で極小かを取り違えると誤判定します。
<!-- solution-end -->

<a id="ex-celev7-b03"></a>
**B3. 正定値な第二変分でも指数不安定。** $\mathcal A_T[x]=\frac12\int_0^T(\dot x^2+a^2x^2)dt$、$a>0$ について、(i) $x=0$ が周期ループ上の極小であること、(ii) 線形化方程式の乗数と不安定性を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

(i) 積分の被積分関数は非負であり、$x\equiv0$ で零です。$a>0$ なので $x\not\equiv0$ なら少なくとも $a^2x^2$ の積分が正となり、厳密な大域極小です。第二変分も $Q_0(\eta)=\int_0^T(\dot\eta^2+a^2\eta^2)dt>0$ です。

(ii) Euler–Lagrange方程式は $\ddot x-a^2x=0$。初期値 $(x(0),\dot x(0))=(x_0,v_0)$ への解は

$$
x(t)=\frac12(x_0+v_0/a)e^{at}
+\frac12(x_0-v_0/a)e^{-at}.
$$

従って初期データ $(1,a)$ と $(1,-a)$ はそれぞれ $e^{aT}$ と $e^{-aT}$ の固有方向です。前者の絶対値は1より大きく、微小誤差は指数的に増えます。第二変分の正値性だけでは線形有界性を導けません。
<!-- solution-end -->

<a id="ex-celev7-b04"></a>
**B4. 安定でも作用は極小とは限らない。** $\mathcal A_T[x]=\frac12\int_0^T(\dot x^2-\omega^2x^2)dt$、$\omega>0$、$T=2\pi/\omega$ について、線形化の乗数と、周期変分 $\eta\equiv1$ の第二変分を比較せよ。また $\eta=\cos\omega t$ の第二変分を求めよ。

- Level: B

<!-- solution-start -->
### 詳細解答

Euler–Lagrange方程式は $\ddot x+\omega^2x=0$ です。一周期の基本解は

$$
\mathcal M=
\begin{pmatrix}\cos2\pi&\sin2\pi/\omega\\-\omega\sin2\pi&\cos2\pi\end{pmatrix}=I.
$$

両乗数は1で、行列は対角化可能です。従って線形解は有界です。ところが定数変分を入れると

$$
Q_0(1)=\int_0^T(0-\omega^2)dt=-\omega^2T<0
$$

なので局所極小の必要条件を満たしません。さらに $\eta=\cos\omega t$ では $\dot\eta=-\omega\sin\omega t$ なので

$$
Q_0(\eta)=\omega^2\int_0^T(\sin^2\omega t-\cos^2\omega t)dt
=-\omega^2\int_0^T\cos(2\omega t)dt=0.
$$

周期Jacobi解は第二変分の零方向になりますが、負方向も共存し得ます。
<!-- solution-end -->

### Level C

<a id="ex-celev7-c01"></a>
**C1. 正二角形舞踏解の変分を点検する。** 二粒子の質量を $m>0$、重力定数と半径を $G,R>0$ とし、次のNewton周期軌道を与える。

$$
\begin{gathered}
m_1=m_2=m,\qquad
q_1(t)=R(\cos\omega t,\sin\omega t),\qquad
q_2(t)=-q_1(t),\\
\omega^2=\frac{Gm}{4R^3},\qquad
T=\frac{2\pi}{\omega}.
\end{gathered}
$$

(i) Newton方程式への適合を確かめよ。

(ii) 周期摂動 $\eta_i=q_i$ の第二変分 $Q_q(\eta)$ を計算せよ。

(iii) $\xi_i=J_2q_i$ が第二変分の零方向であることを、回転不変性と[Jacobi型変分方程式](#def-celev7-jacobi)から説明せよ。

(iv) (ii)(iii) だけで線形安定性が判定できない理由を述べよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(i) 相対位置は $q_1-q_2=2q_1$、距離は $2R$ です。[Newton方程式](../../CELE/CELE2/index.md#prop-cele2-nbody-equations)を平面二体へ制限すると

$$
\ddot q_1=Gm\frac{q_2-q_1}{|q_2-q_1|^3}
=-Gm\frac{2q_1}{(2R)^3}
=-\frac{Gm}{4R^3}q_1=-\omega^2q_1.
$$

2番についても符号を反転して成立します。距離 $2R>0$ なので衝突はありません。

(ii) $\eta=q$ だから $\dot\eta=\dot q$。速度項は $\sum_i m|\dot q_i|^2=2m\omega^2R^2$ です。重力項は一対のみで、$r=q_1-q_2$、$h=\eta_1-\eta_2=r$。第1節のHessian式を代入すると

$$
Gm^2\left(\frac{3|r|^4}{|r|^5}-\frac{|r|^2}{|r|^3}\right)
=\frac{2Gm^2}{|r|}=\frac{Gm^2}{R}.
$$

また $\omega^2=Gm/(4R^3)$ より $2m\omega^2R^2=Gm^2/(2R)$。どちらも一定なので

$$
Q_q(q)=T\left(\frac{Gm^2}{2R}+\frac{Gm^2}{R}\right)
=\frac{3Gm^2T}{2R}>0.
$$

(iii) $R_\theta q$ はどの $\theta$ でもNewton解であり、$R_\theta q$ の周期端点と作用は変わりません。$\theta=0$ で微分すると $\xi=J_{\rm rot}q$ が周期Jacobi解となります。[中立モード命題](#prop-celev7-neutral-modes)の証明と、周期端点での部分積分により

$$
Q_q(\xi)=B_q(\xi,\xi)
=\left[\xi^{\mathsf T}M\dot\xi\right]_0^T+
\int_0^T\xi^{\mathsf T}(-M\ddot\xi+D^2U(q)\xi)dt=0.
$$

(iv) 計算したのは二つの具体的な周期方向だけです。全ての周期方向について $Q_q\ge0$ かどうかすら判定しておらず、初期値問題のモノドロミーの全固有値・Jordan構造も求めていません。さらに $\dot q=\omega J_{\rm rot}q$ なので時間移動と回転の中立方向は独立ではありません。正・零の二方向だけから線形・非線形安定性を宣言することはできません。
<!-- solution-end -->

## 8. 何を計算すれば判定したことになるか

実際の周期軌道についてFloquet乗数を求めるには、まず衝突を避ける既知の周期Newton解 $q$ を用意し、各時刻の $D^2U(q(t))$ を作ります。次に独立な初期方向すべてについてJacobi方程式を一周期だけ積分して $\Phi(T)$ を組み立て、重心などどの拘束を除いた行列かを記録した上で固有値とJordan構造を調べます。乗数が数値的に1に近いだけで、厳密な中立モードや単位円上の固有値だとは断定できません。

[VAR11のminimax](../../../解析系/VAR/VAR11/index.md#thm-var11-mountain-pass)に由来する作用の臨界点でも、最小点でも、線形化の工程は同じです。しかしMorse指数、対称制約下の極小性、Floquet乗数、非線形安定性は**別々の欄に記録する量**です。8の字解の一般の線形安定性を、本章の抽象論だけから保証したわけではありません。

次のCELEV8では離散作用の最適化と、Newton方程式を直接積分する数値計算を分けます。そこで求める周期閉合残差やFloquet乗数の近似値も、誤差評価を欠く限り厳密な存在証明や無限時間安定性の保証ではありません。
