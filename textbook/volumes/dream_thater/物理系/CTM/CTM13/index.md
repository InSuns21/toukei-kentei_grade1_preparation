# CTM13 弾性体の波はなぜ縦波・横波に分かれるか

[CTM12 の静的 Navier–Lamé 方程式](../CTM12/index.md#thm-ctm12-navier-lame)では、応力の発散と体積力の釣合から変位を求めた。しかし変位が時間とともに変わると、材料粒子の加速度も釣合に入る。局所的に押した物体の変形は、どの速さで、どの方向へ伝わるだろうか。

重要なのは、**進行方向に伸び縮みする運動**と、**進行方向と直交してずれる運動**とでは、働く弾性係数が異なることである。応力の式を運動方程式に代入し、実際に振幅の方向で分けて確かめる。本章では無限一様媒質の平面波を中心に、初期条件・有限物体の境界条件・エネルギーまで扱う。一般の偏微分方程式の存在定理、曲面波の全体的な分解、異方性と分散媒質の理論は仮定しない。

## 0. 基準配置・小変形・記号

応力のない基準配置を $\mathbb R^3$ とし、基準位置 $X=(X_1,X_2,X_3)$、時刻 $t\in\mathbb R$、変位 $u(X,t)\in\mathbb R^3$（m）を用いる。実際の位置は $x=X+u$ である。$\|\nabla_Xu\|\ll1$ の範囲で一次の運動学と応力を用い、時間依存を含む場合も二次以上の変形項を無視する。必要な二階微分が連続な古典解のみを対象とする。

基準質量密度 $\rho_0>0$（kg/m$^3$）および Lamé 係数 $\lambda,\mu$（Pa=N/m$^2$）は位置・時刻によらない定数とする。[CTM11 の正定値条件](../CTM11/index.md#prop-ctm11-split)として

$$
\mu>0,\qquad K:=\lambda+\frac{2\mu}{3}>0
$$

を仮定する。とくに $\lambda$ 単独の正値は要求しない。[微小ひずみ](../CTM3/index.md#def-ctm3-infinitesimal-strain)と [等方 Hooke 則](../CTM11/index.md#thm-ctm11-hooke)は

$$
\varepsilon_{ij}(u)=\frac12(\partial_j u_i+\partial_i u_j),
\qquad
\sigma_{ij}(u)=\lambda(\partial_\ell u_\ell)\delta_{ij}
+\mu(\partial_j u_i+\partial_i u_j)
$$

である。ここで $\partial_j=\partial/\partial X_j$ とし、重複添字は $1,2,3$ について和を取る。$I_3$ は単位行列、$a\cdot b$ は内積、$A:B=\sum_{i,j}A_{ij}B_{ij}$ である。$\nabla(\operatorname{div}u)$ は成分 $\partial_i(\sum_j\partial_j u_j)$ のベクトル、$\Delta u$ は各成分に Laplace 作用素を施したベクトルである。

この章の波の基本設定では体積力を零とする。局所的な波をまず無限媒質で検討するため、境界条件はない。一方、有限物体を考える節では、[CTM12 の変位・表面力境界条件](../CTM12/index.md#def-ctm12-boundary-data)を時間ごとに与え、初期変位と初期速度を別に指定する。無限媒質の波を任意の有限物体にそのまま当てはめることはしない。

## 1. 静的釣合に慣性を戻す

[CTM7 の局所運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)の加速度項を残す。基準密度が一定で初期状態が静止している小変形近似では、材料粒子の加速度を $u_{tt}$ とし、一次の精度で $\rho_0u_{tt}=\operatorname{div}\sigma$ を得る。力の単位は左右とも N/m$^3$ である。

成分 $i$ の発散を実際に計算すると

$$
\begin{aligned}
\partial_j\sigma_{ij}
&=\partial_j\{\lambda(\partial_\ell u_\ell)\delta_{ij}
+\mu(\partial_j u_i+\partial_i u_j)\}\\
&=\lambda\partial_i(\partial_\ell u_\ell)
+\mu\partial_j\partial_j u_i
+\mu\partial_i\partial_j u_j\\
&=(\lambda+\mu)\partial_i(\operatorname{div}u)+\mu\Delta u_i.
\end{aligned}
$$

ここでは係数一定と二階偏微分の交換を使った。静的な場合はこの右辺と体積力の和が零になるが、動的な場合は加速度を駆動する。

<a id="thm-ctm13-dynamic-navier-lame"></a>

<!-- formal-statement-start -->
### 定理（動的 Navier–Lamé 方程式）

$\rho_0>0$、$\mu>0$、$K=\lambda+2\mu/3>0$ が定数で、応力のない基準状態からの十分小さい変位 $u:\mathbb R^3\times\mathbb R\to\mathbb R^3$ が $C^2$ 級であり、体積力が零、応力が上記の等方 Hooke 則に従うとする。線形化した局所運動量保存は次式と同値である。

$$
\boxed{\rho_0\partial_t^2u=(\lambda+\mu)\nabla(\operatorname{div}u)+\mu\Delta u.}
$$

有限領域ではこの内部方程式に加えて、初期変位・初期速度と各境界の変位または traction を与える。
<!-- formal-statement-end -->

### 証明の見取り図

[運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)に慣性を残し、[Hooke 則](../CTM11/index.md#thm-ctm11-hooke)の応力の発散を成分ごとに展開する。係数が位置に依存すると積の微分項が増えるため、この形は均質な場合に限られる。

<!-- proof-start -->
### 証明

線形近似の慣性は $\rho_0\partial_t^2u_i$、外力密度は零なので、第 $i$ 成分の運動量収支は $\rho_0\partial_t^2u_i=\partial_j\sigma_{ij}$ である。上の発散計算へ $\sigma_{ij}$ を代入して

$$
\rho_0\partial_t^2u_i
=(\lambda+\mu)\partial_i\partial_j u_j+\mu\partial_j\partial_j u_i
$$

となる。$i=1,2,3$ をまとめれば主張のベクトル式である。逆にベクトル式が成立するなら各成分式を読み戻せば、定義した $\sigma$ について $\rho_0u_{tt}=\operatorname{div}\sigma$ である。□
<!-- proof-end -->

## 2. 波の進行方向と変位の方向を別々に考える

水面の模様が右へ動いても、水そのものの運動方向は必ずしも右ではない。固体でも、**波面が伝わる方向**と**物質点が揺れる方向**は別の情報である。

単位ベクトル $n\in\mathbb R^3$（$|n|=1$）を波の進行方向、$k>0$（rad/m）を波数、$\omega>0$（rad/s）を角周波数、定数ベクトル $A\in\mathbb R^3\setminus\{0\}$（m）を振幅とする。位相 $\theta=k\,n\cdot X-\omega t$ が一定の平面は、時間 $\Delta t$ 後に $n$ 方向へ距離 $(\omega/k)\Delta t$ 動く。

<a id="def-ctm13-plane-wave"></a>

<!-- formal-statement-start -->
### 定義（単色平面弾性波）

上の $n,k,\omega,A$ を用いて、実変位場が

$$
u(X,t)=A\cos(k\,n\cdot X-\omega t)
$$

の形で表されるとき、単色平面弾性波の候補とする。$A$ は偏りの方向と振幅を表すベクトル、$c=\omega/k>0$ は位相速度の大きさである。支配方程式を満たすか否かは次に判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm13-plane-wave -->
### **定義の確認**：$X_1$ 方向に進む二つの揺れ

$n=e_1$、$A=ae_1$（$a>0$）なら $u=ae_1\cos(kX_1-\omega t)$ で、同じ位相の面は $X_1=(\theta+\omega t)/k$ と動き、粒子の変位も $e_1$ 方向である。

これに対し $A=ae_2$ とすれば、位相面はやはり $X_1$ 方向へ動くが、粒子の変位は $e_2$ 方向である。両者とも定義の形・$|n|=1$・$k,\omega,a>0$ を満たす。ただし $\omega$ を自由に決められるわけではなく、次節の運動方程式に代入して許された値を探す。
<!-- definition-example-end -->

平面波を代入すると

$$
\begin{aligned}
u_{tt}&=-\omega^2 A\cos\theta,\\
\operatorname{div}u&=-k(n\cdot A)\sin\theta,\\
\nabla(\operatorname{div}u)&=-k^2n(n\cdot A)\cos\theta,\\
\Delta u&=-k^2A\cos\theta.
\end{aligned}
$$

これを [動的 Navier–Lamé 方程式](#thm-ctm13-dynamic-navier-lame)の両辺へ代入し、すべての $X,t$ で成り立つように $\cos\theta$ の係数を比較する（$\cos\theta$ が零でない点は存在する）。その結果

$$
\rho_0\omega^2 A
=k^2\{\mu A+(\lambda+\mu)n(n\cdot A)\}
$$

という **三次元の行列の固有方向問題**になる。右辺は振幅ベクトル $A$ に線形に作用しているので、行列で表す価値がある。

<a id="def-ctm13-acoustic-tensor"></a>

<!-- formal-statement-start -->
### 定義（等方弾性の音響テンソル）

$\lambda,\mu$ を一定とし、単位方向 $n$ に対し、$\mathbb R^3$ 上の線形写像 $Q(n)$ を

$$
Q(n)a=\mu a+(\lambda+\mu)n(n\cdot a)
$$

で定める。標準直交基底での行列は

$$
Q(n)=\mu I_3+(\lambda+\mu)nn^T
$$

であり、これを等方線形弾性体の**音響テンソル**という。平面波の条件は $Q(n)A=\rho_0c^2A$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm13-acoustic-tensor -->
### **定義の確認**：$n=e_1$ で対角行列になる理由

$n=e_1$ では $nn^T$ が $e_1$ への射影であり、$nn^Te_1=e_1$、$nn^Te_2=nn^Te_3=0$ となる。したがって定義の写像へ基底を入力すると

$$
Q(e_1)e_1=(\lambda+2\mu)e_1,\qquad
Q(e_1)e_2=\mu e_2,\qquad
Q(e_1)e_3=\mu e_3.
$$

列にこの三つを並べた行列は $Q(e_1)=\operatorname{diag}(\lambda+2\mu,\mu,\mu)$ であり、対称性と定義上の各作用を実際に確認できる。単なる数値上の対角化ではなく、$n$ に沿う軸とその直交平面を選んだ結果である。
<!-- definition-example-end -->

## 3. なぜ二種類の速さになるのか

任意の振幅 $A$ は、進行方向に平行な部分と垂直な部分へ分けられる。これは $|n|=1$ のため

$$
A_L=(n\cdot A)n,\qquad
A_T=A-(n\cdot A)n,\qquad
n\cdot A_T=0
$$

となることから直接確かめられる。添字 $L$ は longitudinal（縦）、$T$ は transverse（横）である。

<a id="def-ctm13-polarization"></a>

<!-- formal-statement-start -->
### 定義（縦波・横波の偏り）

単色平面弾性波で、非零振幅 $A$ が進行方向 $n$ に平行なときを**縦波（P 波）**、$A\cdot n=0$ のときを**横波（S 波）**という。混合した振幅は $A=A_L+A_T$ と一意に直交分解できるが、一般に二成分の固有角周波数は異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm13-polarization -->
### **定義の確認**：斜めの振幅を投影する

$n=e_1$、$A=a(e_1+2e_2)$（$a>0$）なら $A_L=ae_1$、$A_T=2ae_2$。実際、$A_L$ は $n$ と平行、$n\cdot A_T=0$、$A_L\cdot A_T=0$、$A_L+A_T=A$ を満たす。ただしこの二成分を同じ $\omega$ のまま足して方程式の解にすることは、通常できない（次の定理）。
<!-- definition-example-end -->

<a id="thm-ctm13-wave-speeds"></a>

<!-- formal-statement-start -->
### 定理（縦波・横波の波速）

$\rho_0>0$、$\mu>0$、$K=\lambda+2\mu/3>0$ が空間・時間に依存しない等方線形弾性体を考える。$k>0$、$|n|=1$、$A\ne0$ について、単色平面波 $u=A\cos(k\,n\cdot X-\omega t)$ が体積力零の動的 Navier–Lamé 方程式を満たす必要十分条件は、$A_L,A_T$ の非零成分それぞれに次の条件が成り立つことである。

$$
\omega^2 A_L=k^2c_L^2A_L,\qquad
\omega^2 A_T=k^2c_T^2A_T,
$$

ここで

$$
\boxed{c_L=\sqrt{\frac{\lambda+2\mu}{\rho_0}},\qquad
c_T=\sqrt{\frac{\mu}{\rho_0}}.}
$$

また $c_L>c_T>0$ である。したがって一つの単色平面波の非零振幅は、縦波または横波のいずれかの偏りを持つ。横方向には独立な二つの偏りを選べるが、速さは同じである。
<!-- formal-statement-end -->

### 証明の見取り図

音響テンソルは、$n$ に沿う成分に $\lambda+2\mu$、直交する成分に $\mu$ を掛ける。式を二方向に射影すると異なる二つの波速が現れる。正定値条件を使い、波速が実数で、かつ異なることまで確かめる。

<!-- proof-start -->
### 証明

[音響テンソル](#def-ctm13-acoustic-tensor)の式へ $A=A_L+A_T$ を代入する。$n\cdot A_L=n\cdot A$ および $n\cdot A_T=0$ なので

$$
\begin{aligned}
Q(n)A
&=\mu(A_L+A_T)+(\lambda+\mu)n(n\cdot A_L)\\
&=(\lambda+2\mu)A_L+\mu A_T.
\end{aligned}
$$

[動的方程式](#thm-ctm13-dynamic-navier-lame)へ平面波を代入して得た $Q(n)A=\rho_0(\omega/k)^2 A$ を、$n$ 方向への射影と直交射影に分けると

$$
\{\rho_0\omega^2-k^2(\lambda+2\mu)\}A_L=0,
\qquad
\{\rho_0\omega^2-k^2\mu\}A_T=0.
$$

これは主張の二条件と同値である。逆に両条件が成立すれば二式を足して $Q(n)A=\rho_0(\omega/k)^2A$ が復元でき、元の PDE を満たす。

[CTM11 の正定値条件](../CTM11/index.md#prop-ctm11-split)から

$$
\lambda+2\mu=K+\frac{4\mu}{3}>0,\qquad
(\lambda+2\mu)-\mu=K+\frac{\mu}{3}>0.
$$

$\rho_0>0$ だから $c_L>c_T>0$ が従う。もし $A_L$ と $A_T$ がともに非零なら同一の $\omega^2/k^2$ が異なる $c_L^2,c_T^2$ に等しくなり矛盾する。横方向は $n^\perp$ という二次元平面なので、独立な偏りは二つある。□
<!-- proof-end -->

### 速度を数字で照合する

$\rho_0=2000$ kg/m$^3$、$\lambda=2$ GPa、$\mu=3$ GPa とする。$K=4$ GPa $>0$ であり、

$$
c_L=\sqrt{\frac{8\times10^9}{2000}}=2000\ \mathrm{m/s},\qquad
c_T=\sqrt{\frac{3\times10^9}{2000}}\simeq1224.7\ \mathrm{m/s}.
$$

$\mathrm{Pa}/(\mathrm{kg/m^3})=\mathrm{m^2/s^2}$ なので、平方根を取ると速度の単位になる。周波数 $f=\omega/(2\pi)$（Hz）に対し、位相が $2\pi$ 進む空間距離（波長）を $\Lambda=2\pi/k$ と書けば

$$
c=\frac{\omega}{k}=f\Lambda,\qquad T=\frac{1}{f}.
$$

$k$（波数）と $K$（体積弾性率）、$\lambda$（Lamé 係数）と $\Lambda$（波長）を混同しない。

## 4. 方程式自体は何を縦横に分けるか

今までは特定の単色波を代入して解いた。一般の滑らかな変位場にも、発散と回転を取れば、どの成分がどの係数で伝わるかを確認できる。

**体積の一次変化**は $\vartheta:=\operatorname{div}u$ で測り、局所的な回転成分は $\zeta:=\operatorname{curl}u$ で測る。[微小ひずみと体積変化の関係](../CTM11/index.md#def-ctm11-isotropic-linear-elastic)を念頭に置く。$\operatorname{curl}u=(\partial_2u_3-\partial_3u_2,\partial_3u_1-\partial_1u_3,\partial_1u_2-\partial_2u_1)$ とここでは成分で定義して用いる。

<a id="prop-ctm13-div-curl"></a>

<!-- formal-statement-start -->
### 命題（発散と回転の伝播方程式）

係数一定の動的 Navier–Lamé 方程式を満たす、空間・時間について必要な三階導関数が連続な変位場 $u$ に対し、$\vartheta=\operatorname{div}u$ と $\zeta=\operatorname{curl}u$ はそれぞれ

$$
\partial_t^2\vartheta=c_L^2\Delta\vartheta,\qquad
\partial_t^2\zeta=c_T^2\Delta\zeta
$$

を満たす（ベクトル $\zeta$ の式は成分ごと）。この必要条件だけから、与えられた境界値問題の変位解が一意に再構成できるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

発散は勾配の発散を Laplace 作用素に変え、回転は勾配の回転を消す。二つの演算の作用と偏微分交換を成分で示す。

<!-- proof-start -->
### 証明

[動的方程式](#thm-ctm13-dynamic-navier-lame)の第 $i$ 成分に $\partial_i$ を掛けて和を取ると

$$
\begin{aligned}
\rho_0\partial_t^2(\partial_i u_i)
&=(\lambda+\mu)\partial_i\partial_i(\partial_j u_j)
+\mu\partial_i\partial_j\partial_j u_i\\
&=(\lambda+\mu)\Delta\vartheta+\mu\Delta\vartheta
=(\lambda+2\mu)\Delta\vartheta.
\end{aligned}
$$

一方、回転の第1成分について

$$
\begin{aligned}
\rho_0(\zeta_1)_{tt}
&=\partial_2(\rho_0u_{3,tt})-\partial_3(\rho_0u_{2,tt})\\
&=(\lambda+\mu)\{\partial_2\partial_3\vartheta-\partial_3\partial_2\vartheta\}
+\mu\{\partial_2\Delta u_3-\partial_3\Delta u_2\}\\
&=\mu\Delta(\partial_2u_3-\partial_3u_2)=\mu\Delta\zeta_1.
\end{aligned}
$$

第2、第3成分は添字を循環させれば同じ交換計算であり、$\rho_0>0$ で割って結論を得る。有限領域では $\vartheta,\zeta$ だけに対する境界条件はもとの $u$ の境界条件と同じ情報とは限らない。□
<!-- proof-end -->

同一方向 $n$ の波の初期振幅 $A=A_L+A_T$ を考えるなら、初期速度零の場合の具体的な重ね合わせは

$$
u(X,t)=A_L\cos(k\,n\cdot X)\cos(c_Lkt)
+A_T\cos(k\,n\cdot X)\cos(c_Tkt)
$$

である。$\cos(k\,n\cdot X)\cos(ckt)$ は左右に進む二波の和であり、**一つの角周波数を持つ右向き単色波とは別物**である。線形 PDE なので二つを足せるが、一般に縦横で振動周期は異なる。

## 5. 波はエネルギーをどう運ぶか

[CTM11 の弾性エネルギー](../CTM11/index.md#thm-ctm11-hooke)は単位基準体積当たり

$$
W(\varepsilon)=\frac{\lambda}{2}(\operatorname{tr}\varepsilon)^2+\mu\varepsilon:\varepsilon
$$

であり、時間変化する変位について運動エネルギー密度を $\rho_0|u_t|^2/2$ とする。両者とも単位は J/m$^3$ = Pa である。力が作用しても「各点のエネルギーが一定」なのではない。周囲の点から応力の仕事が流れ込むことを式で示す。

<a id="def-ctm13-elastic-energy-flux"></a>

<!-- formal-statement-start -->
### 定義（弾性波の全エネルギー密度と流束）

係数一定の等方線形弾性体と滑らかな変位 $u$ に対し、単位基準体積当たりの全エネルギー密度 $e$（J/m$^3$）とエネルギー流束 $j$（W/m$^2$）を

$$
e=\frac{\rho_0}{2}|u_t|^2+W(\varepsilon(u)),
\qquad
j=-\sigma(u)u_t
$$

で定める。$j$ はベクトルであり、対称応力行列 $\sigma$ が速度 $u_t$ に作用したものの負号である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm13-elastic-energy-flux -->
### **定義の確認**：一方向横波の瞬間値

$u=ae_2\cos(kX_1-\omega t)$ とすると、$\theta=kX_1-\omega t$ として

$$
u_t=a\omega e_2\sin\theta,\quad
\varepsilon=-\frac{ak}{2}(e_1e_2^T+e_2e_1^T)\sin\theta.
$$

$\operatorname{tr}\varepsilon=0$ かつ $\varepsilon:\varepsilon=(ak)^2\sin^2\theta/2$ より $W=\mu a^2k^2\sin^2\theta/2$ である。応力は $\sigma=-\mu ak(e_1e_2^T+e_2e_1^T)\sin\theta$ だから $j=-\sigma u_t=\mu a^2k\omega\sin^2\theta\,e_1$。定義の両項が正確に計算され、エネルギーは $e_1$ 方向へ流れる。$\omega=c_Tk$ のときだけ、この候補は運動方程式の解になる。
<!-- definition-example-end -->

<a id="prop-ctm13-energy-balance"></a>

<!-- formal-statement-start -->
### 命題（弾性波の局所エネルギー保存）

$\rho_0>0$、$\mu>0$、$K>0$ が一定で、体積力零の動的 Navier–Lamé 方程式を満たす十分滑らかな変位 $u$ について、上記 $e,j$ は

$$
\boxed{\partial_t e+\operatorname{div}j=0}
$$

を満たす。さらに任意の単色平面縦波・横波の実解 $u=am\cos(k\,n\cdot X-\omega t)$（$|m|=1$, $a>0$）に対し、$e\ge0$、$j=ce\,n$ であり、時間平均した全エネルギー密度は $\langle e\rangle=\rho_0\omega^2a^2/2$ である。ここで $c=c_L$ または $c_T$ は対応する波速である。
<!-- formal-statement-end -->

### 証明の見取り図

加速度の方程式に速度を内積として掛ける。積の微分で出る応力の仕事を、弾性エネルギーの時間微分と発散に分ける。縦波・横波に対してひずみを直接代入して、蓄積エネルギーと流束を照合する。

<!-- proof-start -->
### 証明

運動方程式と積の微分から、第 $i$ 成分の速度 $v_i=\partial_tu_i$ を掛け和を取ると

$$
\begin{aligned}
\partial_t\left(\frac{\rho_0}{2}|v|^2\right)
&=v_i\partial_j\sigma_{ij}\\
&=\partial_j(v_i\sigma_{ij})-\sigma_{ij}\partial_jv_i.
\end{aligned}
$$

[Hooke 則](../CTM11/index.md#thm-ctm11-hooke)では $\sigma_{ij}=\sigma_{ji}$ であるから、最後の項は $\sigma:\varepsilon(v)$ と等しい。$\varepsilon$ は $u$ の線形関数なので $\varepsilon(v)=\partial_t\varepsilon(u)$。したがって

$$
\begin{aligned}
\sigma:\partial_t\varepsilon
&=\lambda(\operatorname{tr}\varepsilon)(\operatorname{tr}\partial_t\varepsilon)
+2\mu\varepsilon:\partial_t\varepsilon\\
&=\partial_t\left\{\frac{\lambda}{2}(\operatorname{tr}\varepsilon)^2
+\mu\varepsilon:\varepsilon\right\}
=\partial_tW.
\end{aligned}
$$

よって $\partial_t(\rho_0|v|^2/2+W)=\partial_j(\sigma_{ij}v_i)$。$\sigma^T=\sigma$ であるため $\partial_j(\sigma_{ij}v_i)=\operatorname{div}(\sigma v)$、すなわち $\partial_te+\operatorname{div}(-\sigma v)=0$。

縦波 $m=n$ の場合は $\varepsilon=-ak\,nn^T\sin\theta$、$\operatorname{tr}\varepsilon=-ak\sin\theta$ なので

$$
W_L=\frac{\lambda+2\mu}{2}a^2k^2\sin^2\theta
=\frac{\rho_0\omega^2a^2}{2}\sin^2\theta.
$$

横波 $m\cdot n=0$ の場合は $\varepsilon=-ak(mn^T+nm^T)\sin\theta/2$、跡が零、$\varepsilon:\varepsilon=a^2k^2\sin^2\theta/2$ なので

$$
W_T=\frac{\mu}{2}a^2k^2\sin^2\theta
=\frac{\rho_0\omega^2a^2}{2}\sin^2\theta.
$$

各等式の最後は [波速の定理](#thm-ctm13-wave-speeds)の $\rho_0\omega^2=k^2(\lambda+2\mu)$ または $k^2\mu$ を使った。どちらも運動エネルギー密度が $\rho_0\omega^2a^2\sin^2\theta/2$ だから $e=\rho_0\omega^2a^2\sin^2\theta\ge0$。

一方、縦波では $\sigma=-ak\{\lambda I_3+2\mu nn^T\}\sin\theta$、横波では $\sigma=-\mu ak(mn^T+nm^T)\sin\theta$。それぞれ $v=a\omega m\sin\theta$ を掛けると

$$
j_L=(\lambda+2\mu)a^2k\omega\sin^2\theta\,n,\qquad
j_T=\mu a^2k\omega\sin^2\theta\,n.
$$

$k^2(\lambda+2\mu)=\rho_0\omega^2$ または $k^2\mu=\rho_0\omega^2$ を代入すると、どちらも $j=(\omega/k)e\,n=ce\,n$。周期平均 $\langle\sin^2\theta\rangle=1/2$ から $\langle e\rangle=\rho_0\omega^2a^2/2$ となる。□
<!-- proof-end -->

体積 $\Omega$ を固定し、境界が滑らかなら発散定理により

$$
\frac{d}{dt}\int_\Omega e\,dV=-\int_{\partial\Omega}j\cdot n_{\partial\Omega}\,dS
=\int_{\partial\Omega}(\sigma n_{\partial\Omega})\cdot u_t\,dS.
$$

ここで右辺は境界 traction がする仕事率である。[CTM12 の表面力条件](../CTM12/index.md#def-ctm12-boundary-data)を時間依存に拡張したときも符号を確認できる。なお、**進行波**では運動・弾性エネルギーが各点で等しいが、**定在波**では一般に各点で等しくない。上記の「進行波の平均式」を任意の場へ流用しない。

## 6. 有限物体では境界で何が変わるか

無限媒質で縦波の速度が $c_L$ だったことは、すべての棒の長手方向波速が $c_L$ になることを意味しない。例えば $u=w(X_1,t)e_1$ としても、Hooke 則は

$$
\sigma=\operatorname{diag}((\lambda+2\mu)\partial_1w,\lambda\partial_1w,\lambda\partial_1w)
$$

を与える。側面 $n=\pm e_2,\pm e_3$ には $\pm\lambda(\partial_1w)n$ が作用し、一般には自由側面の traction $\sigma n=0$ を満たさない。**細い自由側面の棒**の一次元近似では横収縮を許し Young 率 $E_Y$ による速度 $\sqrt{E_Y/\rho_0}$ が現れるが、これは三次元の平面縦波に追加の棒近似を課した別の模型であり、本章の $c_L$ と同一視しない。

有限物体の解の実例として、$0<X_1<L$, $0<X_2<H$, $0<X_3<D$ を考え、$k=\pi/L$, $\omega=c_Tk$、$a>0$ を十分小さく取る。横向きの**定在波**を

$$
u(X,t)=a\,e_2\sin(kX_1)\cos(\omega t)
$$

とする。$u_{tt}=-\omega^2u$、$\Delta u=-k^2u$、$\operatorname{div}u=0$ なので [動的方程式](#thm-ctm13-dynamic-navier-lame)を満たす。初期条件は $u(X,0)=a\sin(kX_1)e_2$、$u_t(X,0)=0$。$X_1=0,L$ の二端面では $u=0$ を Dirichlet 指定とする。

一方、応力は

$$
\sigma=\mu ak\cos(kX_1)\cos(\omega t)(e_1e_2^T+e_2e_1^T).
$$

そこで $X_2=0,H$ の面では、外向き法線をそれぞれ $-e_2,+e_2$ とし、表面力を

$$
\bar t=\mp\mu ak\cos(kX_1)\cos(\omega t)\,e_1
$$

と処方する。$X_3=0,D$ の面では $\sigma(\pm e_3)=0$ なので自由表面にできる。二端面における traction は拘束反力であり、零に指定する必要はない。こうして初期条件、内部方程式、各面の境界条件を同時に検算した。**側面をすべて自由に変えると、この候補は一般には解でなくなる**。境界条件を省いて振動の形だけを引用してはいけない。

## 7. 演習

断りのない限り一様三次元等方線形弾性、$\rho_0>0$、$\mu>0$、$K>0$、微小変形・体積力零を仮定する。波数 $k$、角周波数 $\omega$ はともに正である。全問で式の出発点と使用した仮定を明記せよ。

### Level A

### A1. 動的方程式の成分を取り出す

$u=(w(X_1,t),0,0)$ について、$\sigma_{11}$、$\sigma_{22}$、$\operatorname{div}\sigma$ を計算し、体積力零の運動方程式を求めよ。$\sigma_{22}$ が一般には零でない理由も述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\nabla u=\operatorname{diag}(w_{X_1},0,0)$ なので、[Hooke 則](../CTM11/index.md#thm-ctm11-hooke)から $\operatorname{tr}\varepsilon=w_{X_1}$、$\varepsilon=\operatorname{diag}(w_{X_1},0,0)$ である。よって

$$
\sigma=\operatorname{diag}((\lambda+2\mu)w_{X_1},\lambda w_{X_1},\lambda w_{X_1}).
$$

発散の第 $i$ 成分は $\partial_j\sigma_{ij}$。したがって $\operatorname{div}\sigma=((\lambda+2\mu)w_{X_1X_1},0,0)$（$\sigma_{22}$ を $X_1$ で微分して発散へ加えてはいけない）。[動的方程式](#thm-ctm13-dynamic-navier-lame)は $\rho_0w_{tt}=(\lambda+2\mu)w_{X_1X_1}$ である。横方向のひずみは零だが、横方向の応力は一般に $\lambda w_{X_1}\ne0$ となる。側面自由という条件を別に満たすわけではない。
<!-- solution-end -->

### A2. 音響テンソルの二つの固有値

$n=e_2$ とする。[音響テンソル](#def-ctm13-acoustic-tensor)の行列を標準基底で書き、$A=ae_2$ と $A=ae_3$（$a\ne0$）の固有値を別々に求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$n=e_2$ なら $nn^T=\operatorname{diag}(0,1,0)$ なので

$$
Q(e_2)=\mu I_3+(\lambda+\mu)e_2e_2^T
=\operatorname{diag}(\mu,\lambda+2\mu,\mu).
$$

$Q(e_2)(ae_2)=(\lambda+2\mu)ae_2$ は縦偏りで、固有値 $\lambda+2\mu$。$Q(e_2)(ae_3)=\mu ae_3$ は横偏りで、固有値 $\mu$。$a\ne0$ なのでどちらも非零固有ベクトルである。$e_1$ 方向も横偏りで同じ固有値となる。
<!-- solution-end -->

### A3. 波速・周波数・波長を照合する

$\lambda=2$ GPa、$\mu=3$ GPa、$\rho_0=2000$ kg/m$^3$ の媒質で、周波数 $f=50$ Hz の縦波と横波の速さ、波長、周期を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$K=\lambda+2\mu/3=4$ GPa $>0$ で [波速の定理](#thm-ctm13-wave-speeds)を適用できる。

$$
c_L=\sqrt{(2+2\cdot3)\times10^9/2000}=2000\ \mathrm{m/s},\quad
c_T=\sqrt{3\times10^9/2000}\simeq1224.7\ \mathrm{m/s}.
$$

波長は $\Lambda=c/f$ より $\Lambda_L=2000/50=40$ m、$\Lambda_T\simeq1224.7/50\simeq24.49$ m。周期は共通に $T=1/50=0.020$ s。$\mathrm{Pa}/\rho_0=\mathrm{m^2/s^2}$ で次元も合う。速さが違っても、指定された周波数は同じである。
<!-- solution-end -->

### A4. 横波のひずみエネルギー

$u=ae_2\cos(kX_1-\omega t)$ で $\omega=c_Tk$ とする。非零のひずみ成分と $W$ を計算し、$W\ge0$ と周期平均 $\langle W\rangle$ を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\partial_1u_2=-ak\sin\theta$ だけが非零の変位勾配で、$\theta=kX_1-\omega t$ とおくと

$$
\varepsilon_{12}=\varepsilon_{21}=-\frac{ak}{2}\sin\theta,\qquad
\operatorname{tr}\varepsilon=0.
$$

従って $\varepsilon:\varepsilon=2(ak/2)^2\sin^2\theta=a^2k^2\sin^2\theta/2$。[弾性エネルギー](../CTM11/index.md#thm-ctm11-hooke)に代入すると

$$
W=\mu\varepsilon:\varepsilon
=\frac{\mu a^2k^2}{2}\sin^2\theta\ge0,\qquad
\langle W\rangle=\frac{\mu a^2k^2}{4}.
$$

最後は固定 $X$ で $\omega>0$ の一周期にわたる $\sin^2$ の平均が $1/2$ であることを用いた。
<!-- solution-end -->

### Level B

### B1. 初期振幅を二つの波へ分ける

$n=e_1$, $k>0$ とし、全空間の初期条件を $u(X,0)=a(e_1+2e_2)\cos(kX_1)$、$u_t(X,0)=0$ とする（$a>0$）。各偏りの角周波数を求め、動的方程式を満たす明示解を構成し、初期条件を確認せよ。$e_1+2e_2$ に単一の角周波数を割り当てられるかも答えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[偏りの分解](#def-ctm13-polarization)で $A_L=ae_1$、$A_T=2ae_2$ とし、[波速の定理](#thm-ctm13-wave-speeds)から $\omega_L=kc_L$、$\omega_T=kc_T$。それぞれの進行波・後退波の和は独立な解なので

$$
u(X,t)=a\cos(kX_1)\{e_1\cos(kc_Lt)+2e_2\cos(kc_Tt)\}
$$

を候補とする。$e_1$ 成分について $\rho_0\partial_t^2u_1=-\rho_0k^2c_L^2u_1$、$(\lambda+\mu)\nabla\operatorname{div}u+\mu\Delta u$ の第1成分は $-k^2(\lambda+2\mu)u_1$ なので一致する。第2成分は発散への寄与が零で、右辺は $-\mu k^2u_2=-\rho_0k^2c_T^2u_2$。第3成分は零。$t=0$ で各 $\cos$ は1、各時間微分は $\sin0=0$ なので初期条件を満たす。$c_L>c_T$ だから一つの非零角周波数の平面波に二つの偏りを混ぜられない。
<!-- solution-end -->

### B2. 発散と回転が測るもの

$n=e_1$ として、$u_L=ae_1\cos(kX_1-\omega_Lt)$、$u_T=be_2\cos(kX_1-\omega_Tt)$（$a,b\ne0$）を考える。両者の発散と回転を求め、それぞれ [発散と回転の伝播方程式](#prop-ctm13-div-curl)のどちらを担うか確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\theta_L=kX_1-\omega_Lt$, $\theta_T=kX_1-\omega_Tt$ とおく。縦波では $\partial_1(u_L)_1=-ak\sin\theta_L$ なので $\operatorname{div}u_L=-ak\sin\theta_L$、一方 $\operatorname{curl}u_L=0$。発散に二回の時間微分を施すと $-\omega_L^2\operatorname{div}u_L$、二回の $X_1$ 微分では $-k^2\operatorname{div}u_L$ となり、$\omega_L^2=c_L^2k^2$ によって縦波方程式を満たす。

横波では $\operatorname{div}u_T=0$、$\operatorname{curl}u_T=(0,0,-bk\sin\theta_T)$。非零の第3成分へ $\partial_t^2$ と $\Delta$ を作用させると、それぞれ $-\omega_T^2\zeta_3$ と $-k^2\zeta_3$ になる。$\omega_T^2=c_T^2k^2$ から横波方程式を満たす。これは必要条件の確認であり、任意の境界を持つ問題の解をこれだけで決めたわけではない。
<!-- solution-end -->

### B3. 定在横波はどの側面を自由にできるか

$0<X_1<L$, $0<X_2<H$, $0<X_3<D$ で $u=a e_2\sin(\pi X_1/L)\cos(\pi c_Tt/L)$ とする。領域内の動的方程式、$X_1$ 二端面の変位、$X_2$ と $X_3$ の各側面の traction、および $t=0$ の初期速度を計算せよ。全側面自由の仮定が成り立つか判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$k=\pi/L$、$\omega=c_Tk$ とする。$\operatorname{div}u=0$、$\Delta u=-k^2u$、$u_{tt}=-\omega^2u$ より

$$
\rho_0u_{tt}=-\rho_0\omega^2u=-\mu k^2u=\mu\Delta u,
$$

なので [動的方程式](#thm-ctm13-dynamic-navier-lame)を満たす。$X_1=0,L$ で $\sin(kX_1)=0$、よって $u=0$。ひずみの非零成分は $\varepsilon_{12}=\varepsilon_{21}=ak\cos(kX_1)\cos(\omega t)/2$ で、応力は $\sigma_{12}=\sigma_{21}=\mu ak\cos(kX_1)\cos(\omega t)$ となる。ゆえに

$$
\sigma(\pm e_2)=\pm\mu ak\cos(kX_1)\cos(\omega t)e_1,\qquad
\sigma(\pm e_3)=0.
$$

$X_2=0$ と $H$ では法線がそれぞれ $-e_2$ と $+e_2$ なので符号も逆になる。初期速度は $u_t(X,0)=-a\omega e_2\sin(kX_1)\sin0=0$。$X_3$ の二面は自由にできるが、$X_2$ の二面は一般には零 traction でなく、全側面自由にはできない。
<!-- solution-end -->

### B4. 波速が正でも弾性エネルギーは正か

$\mu>0$、$\lambda=-\mu$ とする。形式的に求めた $c_L^2,c_T^2$ はどうなるか。$\varepsilon=aI_3$（$a\ne0$）の $W$ を計算し、なぜ本章の材料条件に反するか述べよ。続けて $\lambda=-\mu/2$ の場合を比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\lambda=-\mu$ なら $c_L^2=(\lambda+2\mu)/\rho_0=\mu/\rho_0=c_T^2>0$。しかし $K=\lambda+2\mu/3=-\mu/3<0$ である。$\varepsilon=aI_3$ の跡は $3a$、$\varepsilon:\varepsilon=3a^2$ より

$$
W=\frac{\lambda}{2}9a^2+3\mu a^2
=\frac32(3\lambda+2\mu)a^2=-\frac32\mu a^2<0.
$$

従って単純な平面波の速度二乗が正でも、[CTM11 の全ひずみでの正定値条件](../CTM11/index.md#prop-ctm11-split)は保証されない。$\lambda=-\mu/2$ では $K=-\mu/2+2\mu/3=\mu/6>0$、$c_L^2=3\mu/(2\rho_0)>c_T^2=\mu/\rho_0$ で、本章の仮定を満たす。$\lambda$ 自体の符号ではなく $K$ と $\mu$ の符号を判定すべきである。
<!-- solution-end -->

### Level C

### C1. 速度測定から材料係数を逆算し、初期波を構成する

均質な等方線形弾性体で $\rho_0=2400$ kg/m$^3$、三次元の無限媒質で測定した縦波速 $c_L=3000$ m/s、横波速 $c_T=1500$ m/s とする。

1. $\lambda,\mu,K$ を求め、正定値条件を検証せよ。
2. [CTM11 の弾性定数変換](../CTM11/index.md#thm-ctm11-elastic-constants)を使い、Young率 $E_Y$ と Poisson 比 $\nu$ を求めよ。
3. $n=e_1$、$k>0$、$a>0$ とし、全空間の初期条件 $u(X,0)=a(e_1+e_2)\cos(kX_1)$、$u_t(X,0)=0$ を満たす変位解を示し、内部方程式を成分別に検査せよ。
4. $t=0$ における弾性エネルギー密度 $W(X,0)$ を求め、$X_1$ 方向に波長 $2\pi/k$ で平均した値が非負であることを確認せよ。初期の運動エネルギーについても述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** [波速の定理](#thm-ctm13-wave-speeds)の二式から、先に横波で $\mu=\rho_0c_T^2$ を求める。

$$
\mu=2400\cdot(1500)^2=5.4\times10^9\ \mathrm{Pa}=5.4\ \mathrm{GPa}.
$$

縦波の式で $\lambda=\rho_0c_L^2-2\mu$ として

$$
\lambda=2400\cdot(3000)^2-10.8\times10^9
=10.8\times10^9\ \mathrm{Pa}.
$$

したがって $K=\lambda+2\mu/3=10.8+3.6=14.4$ GPa $>0$、$\mu=5.4$ GPa $>0$。基準密度も正だから正定値条件が満たされる。

**(2)** [CTM11 の定数関係](../CTM11/index.md#thm-ctm11-elastic-constants)の適用条件は $\mu>0$ と $3\lambda+2\mu>0$ で、(1) から満たされる。そこで

$$
E_Y=\frac{\mu(3\lambda+2\mu)}{\lambda+\mu}
=\frac{5.4(3\cdot10.8+2\cdot5.4)}{10.8+5.4}\ \mathrm{GPa}
=14.4\ \mathrm{GPa},
$$

$$
\nu=\frac{\lambda}{2(\lambda+\mu)}
=\frac{10.8}{2(10.8+5.4)}=\frac13.
$$

$-1<\nu<1/2$ も検証できる。

**(3)** [偏りの定義](#def-ctm13-polarization)から $A_L=ae_1$、$A_T=ae_2$、それぞれの角周波数は $kc_L$ と $kc_T$。したがって

$$
u=a\cos(kX_1)\{e_1\cos(3000kt)+e_2\cos(1500kt)\}.
$$

$u_1$ については $\operatorname{div}u=\partial_1u_1$ だから、[動的方程式](#thm-ctm13-dynamic-navier-lame)の第1成分は

$$
\rho_0(u_1)_{tt}=(\lambda+2\mu)\partial_1^2u_1
=-k^2(\lambda+2\mu)u_1=-\rho_0(3000k)^2u_1.
$$

第2成分では $\partial_2(\operatorname{div}u)=0$、$\Delta u_2=-k^2u_2$ なので $\rho_0(u_2)_{tt}=-\mu k^2u_2=-\rho_0(1500k)^2u_2$。第3成分は両辺零。$t=0$ で $\cos(0)=1$ により指定変位を再現し、$u_t$ は各項が $\sin(0)=0$ を含むので零。よって内部方程式と初期条件の両方を満たす。

**(4)** $t=0$ では $\partial_1u_1=-ak\sin(kX_1)$、$\partial_1u_2=-ak\sin(kX_1)$、他の変位勾配は零である。従って

$$
\varepsilon_{11}=-ak\sin(kX_1),\quad
\varepsilon_{12}=\varepsilon_{21}=-\frac{ak}{2}\sin(kX_1),
$$

$$
\operatorname{tr}\varepsilon=-ak\sin(kX_1),\qquad
\varepsilon:\varepsilon=\frac32a^2k^2\sin^2(kX_1).
$$

[弾性エネルギー](../CTM11/index.md#thm-ctm11-hooke)へ代入すれば

$$
W(X,0)=\frac{a^2k^2}{2}(\lambda+3\mu)\sin^2(kX_1)
=\frac{27.0\times10^9}{2}a^2k^2\sin^2(kX_1)\ \mathrm{Pa}.
$$

$\lambda+3\mu=10.8+16.2=27.0$ GPa である。長さ $2\pi/k$ にわたる $\sin^2$ の空間平均は $1/2$ なので

$$
\langle W(\cdot,0)\rangle_{X_1}
=\frac{a^2k^2}{4}(\lambda+3\mu)
=6.75\times10^9a^2k^2\ \mathrm{Pa}\ge0.
$$

$a$ は m、$k$ は m$^{-1}$ なので $a^2k^2$ は無次元である。初期速度が零だから運動エネルギー密度も $t=0$ で零であり、**進行波に関する運動・弾性エネルギーの瞬間的等分配**をこの初期条件へ適用してはならない。
<!-- solution-end -->

## 次への接続

本章では、係数一定・小変形・等方性のもとで応力の方向別の作用を分離した。この後の [CTM14](../CTM14/index.md) では大きな変形に移り、同じ材料でも変形勾配 $F$ からエネルギーと応力を構成する。そこでの波の線形化や、ひずみが大きい状況での伝播は、本章の速度公式を無条件に流用できない。
