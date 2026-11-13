# CTM12 線形弾性の境界値問題をどう立てるか

[CTM11 の等方 Hooke 則](../CTM11/index.md#thm-ctm11-hooke)は、ある点のひずみからその点の応力を計算する法則だった。しかし材料の係数だけでは、長い棒の右端を引いたときの各点の変位は決まらない。力の釣合、物体の形、表面の固定・荷重条件を一緒に指定して初めて「変位を求める問題」になる。

今回は静止した小変形の弾性体を扱う。まず支配方程式と二種類の境界条件を導き、次に棒とせん断板の**全ての面**で変位・応力・面力を照合する。最後にエネルギーから、固定がないと同じひずみのまま物体全体を動かせる理由と、一意性が回復する条件を証明する。一般の偏微分方程式の存在定理は仮定しない。

## 0. 設定：何が既知で何が未知か

応力のない基準配置 $\Omega\subset\mathbb R^3$ は連結な有界開集合で、境界は区分的に $C^1$ 級とする。面の交線・角は面積零として扱う。位置を $X=(X_1,X_2,X_3)$、未知の変位を $u(X)$（m）とし、その空間微分 $D_Xu=\nabla u$（変位勾配）が十分小さい **微小変形** $\|\nabla u\|\ll1$ を仮定する。必要な微分のある古典解として、以下では $u\in C^2(\Omega;\mathbb R^3)\cap C^1(\overline\Omega;\mathbb R^3)$ を考え、境界積分に必要な正則性も仮定する。

[CTM3 で定義した微小ひずみ](../CTM3/index.md#def-ctm3-infinitesimal-strain)と [CTM11 の Hooke 則](../CTM11/index.md#thm-ctm11-hooke)を使う。

基準配置の標準直交基底を $e_1,e_2,e_3$ とし、変位の第 $i$ 成分および基準座標 $X_j$ についての偏微分を

$$
u_i=u\cdot e_i,\qquad
\partial_j:=\frac{\partial}{\partial X_j}
$$

と記す。これは空間微分であって時刻についての微分ではない。変位勾配の第 $j$ 列が $e_j$ 方向への変化であることは

$$
D_Xu\,e_j=\sum_{i=1}^3(\partial_j u_i)e_i,\qquad
(\nabla u)_{ij}=\partial_j u_i
$$

から分かる。以下、同じ項で繰り返す成分添字は $1,2,3$ の和を表す。$I_3$ は三次単位行列、$\delta_{ij}$ はその $(i,j)$ 成分（$i=j$ なら $1$、それ以外なら $0$）である。$\lambda,\mu$ は空間的に一定の Lamé 係数（Pa）である。

$$
\varepsilon_{ij}(u)=\frac12(\partial_j u_i+\partial_i u_j),\qquad
\sigma_{ij}(u)=\lambda(\partial_k u_k)\delta_{ij}
+\mu(\partial_j u_i+\partial_i u_j).
$$

特に添字 $k$ は $1,2,3$ で総和を取る。係数が **空間的に一定**であることは後の微分計算で使う。[CTM11 の正定値条件](../CTM11/index.md#prop-ctm11-split)に従い

$$
\mu>0,\qquad K=\lambda+\frac{2\mu}{3}>0
$$

を仮定する（$\lambda$ 自体が正とは限らない）。体積力密度を $f(X)$（N/m$^3$）、境界外向き単位法線を $n$、表面力密度を $\bar t$（N/m$^2$）とする。静力学なので加速度は零で、体積力は基準位置で評価する一次近似である。

境界を、変位を指定する相対的に開いた部分 $\Gamma_D$ と表面力を指定する部分 $\Gamma_N$ に分け、共通部分は面積零、両者の閉包が $\partial\Omega$ を覆うとする。境界上の与えられた変位を $\bar u$ と書く。同じ面の同じ成分に独立な変位と表面力を重ねて課すことはしない。今回は各面でベクトル全体を指定する形に限定する。

## 1. 力の釣合と境界条件を一つの問題にする

[CTM7 の局所運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)は $\rho a=\operatorname{div}\sigma+\rho b$ である。ここで加速度 $a=0$、$f=\rho b$ とおくと静的釣合は

$$
\operatorname{div}\sigma+f=0,\qquad
(\operatorname{div}\sigma)_i=\partial_j\sigma_{ij}.
$$

[Cauchy の応力定理](../CTM6/index.md#thm-ctm6-cauchy-stress)から、外向き面の物体に作用する traction は $\sigma n$ であり、変位と独立に与える外部荷重 $\bar t$ に等しい必要がある。

境界では、変位そのものを指定する方法と、面が受ける外力を指定する方法を区別する。前者は拘束、後者は荷重や自由表面を表す。表面力の指定は力の向きを持つ**ベクトルの指定**であり、応力行列の全成分を零にすることではない。

<a id="def-ctm12-boundary-data"></a>

<!-- formal-statement-start -->
### 定義（Dirichlet 境界条件と Neumann 境界条件）

変位 $u$ と応力 $\sigma(u)$ を持つ物体の境界で、次の二種類の条件を定める。

- **Dirichlet 境界条件（変位指定）**：$\Gamma_D$ 上で $u=\bar u$ とする。
- **Neumann 境界条件（表面力指定）**：$\Gamma_N$ 上で $\sigma(u)n=\bar t$ とする。

それぞれ固定面では $\bar u=0$、自由表面では $\bar t=0$ とする。後者は $\sigma=0$ という全行列の指定ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm12-boundary-data -->
### **定義の確認**：同じ棒の左右で異なる量を指定する

$L,H,T>0$ とした直方体 $\Omega=(0,L)\times(0,H)\times(0,T)$ に、小さい無次元定数 $a$ を使って $u(X)=aX_1e_1$ を与える。$u_1=aX_1$ の $\partial_1$ 微分だけが $a$ で、他の成分微分は零だから、基準座標の標準基底で

$$
\nabla u=\operatorname{diag}(a,0,0),\qquad
\varepsilon(u)=\operatorname{diag}(a,0,0),\qquad
\operatorname{tr}\varepsilon=a.
$$

これを [Hooke 則](../CTM11/index.md#thm-ctm11-hooke)の $\sigma=\lambda(\operatorname{tr}\varepsilon)I_3+2\mu\varepsilon$ に代入し、対角成分ごとに足すと

$$
\sigma=\operatorname{diag}((\lambda+2\mu)a,\lambda a,\lambda a).
$$

左面 $X_1=0$ では変位が零なので、$\bar u=0$ の Dirichlet 条件を満たす。

右面 $X_1=L$ は法線 $e_1$ を持ち、$\sigma e_1=(\lambda+2\mu)ae_1$ となる。この値を $\bar t$ とした Neumann 条件を満たす。左右二面の確認であり、四側面の条件までは自動的に保証しない。
<!-- definition-example-end -->

<a id="def-ctm12-bvp"></a>

<!-- formal-statement-start -->
### 定義（線形弾性の混合境界値問題）

上記の $\Omega,\Gamma_D,\Gamma_N$、定数 $\lambda,\mu$、既知の $f,\bar u,\bar t$ に対し、未知の変位 $u$ が領域内で静的釣合、境界上でそれぞれ所定の変位と表面力を満たす問題を、**静的線形弾性の混合境界値問題**という。古典解は

$$
\begin{cases}
\operatorname{div}\sigma(u)+f=0 & \text{in }\Omega,\\
u=\bar u & \text{on }\Gamma_D,\\
\sigma(u)n=\bar t & \text{on }\Gamma_N
\end{cases}
$$

を満たす上記正則性の変位場である。$\sigma(u)=\lambda(\operatorname{div}u)I_3+2\mu\varepsilon(u)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm12-bvp -->
### **定義の確認**：一様に引く棒の全境界

$0<X_1<L$、$0<X_2<H$、$0<X_3<T$ の直方体を考える。Young 率 $E_Y>0$ と Poisson 比 $-1<\nu<1/2$ を [CTM11 の弾性定数変換](../CTM11/index.md#thm-ctm11-elastic-constants)に従って選び、$p$（Pa）を小さい正の引張応力、$a=p/E_Y$（無次元）とする。候補は

$$
u(X)=(aX_1,-\nu aX_2,-\nu aX_3).
$$

変位の各成分をそれぞれ $X_1,X_2,X_3$ で微分すると、非零の成分微分は $\partial_1u_1=a$、$\partial_2u_2=\partial_3u_3=-\nu a$ だけである。従って $\varepsilon=\operatorname{diag}(a,-\nu a,-\nu a)$、$\operatorname{tr}\varepsilon=(1-2\nu)a$。先ほどの [弾性定数変換](../CTM11/index.md#thm-ctm11-elastic-constants)で

$$
2\mu=\frac{E_Y}{1+\nu},\qquad
\lambda=\frac{E_Y\nu}{(1+\nu)(1-2\nu)}
$$

と置けば、[Hooke 則](../CTM11/index.md#thm-ctm11-hooke)の各対角成分は

$$
\begin{aligned}
\sigma_{11}&=\{\lambda(1-2\nu)+2\mu\}a=E_Ya=p,\\
\sigma_{22}=\sigma_{33}
&=\{\lambda(1-2\nu)-2\mu\nu\}a=0.
\end{aligned}
$$

従って $\sigma=\operatorname{diag}(p,0,0)$ は一定で、$f=0$ とすれば領域内の発散は零。左面 $X_1=0$ を $\Gamma_D$ とし、実際の $u$ と同じ $\bar u=(0,-\nu aX_2,-\nu aX_3)$ を与える。残る五面を $\Gamma_N$ とすると、右面 $X_1=L$ では $n=e_1$ より $\bar t=\sigma e_1=pe_1$、四側面では $n=\pm e_2,\pm e_3$ より $\bar t=\sigma n=0$。定義の三条件を**全て**満たす。

左面は横方向に自由収縮するよう変位を処方しており、全面を $u=0$ にする通常の完全固定端と同じではない。条件を一箇所変えたら同じ候補解をそのまま使えない。
<!-- definition-example-end -->

この棒の境界条件を文字で描くと、力の向きと面の役割が分かる。

~~~text
X1=0                    X1=L
| 指定変位 |==========>| 表面力 +p e1 |
  ΓD                       ΓN
側面 X2=0,H と X3=0,T: 表面力 0
~~~

### 変位の方程式への代入

定数係数なので $\partial_j$ を Hooke 則の各項へ順番に作用させる。

$$
\begin{aligned}
\partial_j\sigma_{ij}
&=\lambda\partial_j\{(\partial_k u_k)\delta_{ij}\}
 +\mu\partial_j(\partial_j u_i+\partial_i u_j)\\
&=\lambda\partial_i(\partial_k u_k)
 +\mu\sum_j\partial_j^2u_i
 +\mu\partial_i(\partial_j u_j).
\end{aligned}
$$

最後の等号では $C^2$ 正則性により混合偏微分を交換した。$\Delta u$ は各成分の Laplace 作用素を意味する。従って

<a id="thm-ctm12-navier-lame"></a>

<!-- formal-statement-start -->
### 定理（静的 Navier–Lamé 方程式）

連結な三次元領域 $\Omega$ で、$\lambda,\mu$ が一定、$u\in C^2(\Omega;\mathbb R^3)$、$\sigma=\lambda(\operatorname{div}u)I_3+2\mu\varepsilon(u)$ とする。このとき静的釣合 $\operatorname{div}\sigma+f=0$ は次の変位方程式と同値である。

$$
\boxed{\mu\Delta u+(\lambda+\mu)\nabla(\operatorname{div}u)+f=0.}
$$

境界条件はこの式と独立に、変位または応力から作った traction で課す。
<!-- formal-statement-end -->

### 証明の見取り図

応力の行列の第 $i$ 行を $j$ で発散させる。$\lambda$ の項から勾配が一つ、$\mu$ の二項から Laplace 作用素と勾配が一つずつ現れる。境界では発散の式だけでは法線方向の力を指定できないので、もとの $\sigma n$ を使う。

<!-- proof-start -->
### 証明

$i=1,2,3$ を一つ固定する。$\lambda,\mu$ が定数であることから

$$
\partial_j[\lambda(\partial_k u_k)\delta_{ij}]
=\lambda\partial_i(\partial_k u_k).
$$

また

$$
\partial_j[\mu(\partial_j u_i+\partial_i u_j)]
=\mu\Delta u_i+\mu\partial_i(\partial_j u_j).
$$

両者を足して

$$
(\operatorname{div}\sigma)_i
=\mu(\Delta u)_i+(\lambda+\mu)(\nabla\operatorname{div}u)_i
$$

を得る。各成分について $+f_i=0$ とおけば表示式、逆に表示式なら各成分の静的釣合が成立する。$\square$
<!-- proof-end -->

### どの係数なら誤らないか

単位は $\mu\Delta u$ が Pa/m = N/m$^3$、$(\lambda+\mu)\nabla\operatorname{div}u$ も N/m$^3$、$f$ も N/m$^3$。もし $\mu$ や $\lambda$ が位置に依存すれば、例えば $\partial_j(\mu\partial_j u_i)$ には $(\partial_j\mu)(\partial_j u_i)$ が加わる。この定理をそのまま不均質材料に適用してはならない。

## 2. せん断板で外力の向きを取り違えない

厚さ $T$、長さ $L$、高さ $H$ の直方体に

$$
u(X)=(\gamma X_2,0,0),\qquad |\gamma|\ll1
$$

を与える。上面は右へ $\gamma H$ 動く。ここで $e_i\otimes e_j$ はベクトル $v$ を $(e_j\cdot v)e_i$ へ写す行列で、$e_1\otimes e_2$ は $(1,2)$ 成分だけが $1$ である。$u_1$ の $X_2$ 微分だけが非零なので

$$
\partial_2u_1=\gamma,\qquad
\nabla u=\gamma e_1\otimes e_2
$$

となる。これを [微小ひずみの定義](../CTM3/index.md#def-ctm3-infinitesimal-strain)で対称化し、[Hooke 則](../CTM11/index.md#thm-ctm11-hooke)へ代入すると

$$
\varepsilon_{12}=\varepsilon_{21}=\frac\gamma2,\quad
\operatorname{div}u=0,\quad
\sigma=\mu\gamma(e_1\otimes e_2+e_2\otimes e_1).
$$

$\sigma$ が一定で $f=0$ なら $\operatorname{div}\sigma=0$。**ただし平衡していることと、特定の面が自由であることは別**である。法線にそれぞれ掛けると

| 面 | 外向き法線 | 必要な traction |
| --- | --- | --- |
| 上面 $X_2=H$ | $e_2$ | $\mu\gamma e_1$ |
| 下面 $X_2=0$ | $-e_2$ | $-\mu\gamma e_1$（ここを $u=0$ と指定すれば反力） |
| 右側 $X_1=L$ | $e_1$ | $\mu\gamma e_2$ |
| 左側 $X_1=0$ | $-e_1$ | $-\mu\gamma e_2$ |
| 前後 $X_3=0,T$ | $\mp e_3$ | $0$ |

下面全体を $\Gamma_D$ とし $u=0$、それ以外を $\Gamma_N$ として表の荷重を与えれば厳密な古典解となる。上面の荷重と側面の荷重を両方指定しなければならない。

~~~text
       上面 X2=H:   → μγ e1
       +---------------------+
左側   |       せん断板       |  右側
 ↓     |   u1=γ X2           |   ↑
-μγ e2 +---------------------+ +μγ e2
       下面 X2=0: u=0（反力 ←）
~~~

単純せん断で右左の面を無荷重としたいなら、これと同じ一様ひずみ場は解にならない。例えば右側の法線 $n=e_1$ で $\sigma n=\mu\gamma e_2\ne0$ だからである。境界条件の欠落が、内部の釣合だけでは検出できない例となる。

## 3. 釣合だけでは変位が一つに決まらない

変位に一定の平行移動 $a$ や小さい剛体回転を足しても、微小ひずみが変わらない。回転の一次近似は $BX$（$B^T=-B$）と書ける。そこで **剛体変位** を $r(X)=a+BX$ と呼ぶ。$a$ の単位は m、$B$ は無次元、$B$ は一定の反対称行列である。

<a id="def-ctm12-rigid"></a>

<!-- formal-statement-start -->
### 定義（微小剛体変位）

連結な領域 $\Omega\subset\mathbb R^3$ 上の変位 $r$ が、定数ベクトル $a\in\mathbb R^3$ と定数行列 $B\in\mathbb R^{3\times3}$ を使って

$$
r(X)=a+BX,\qquad B^T=-B
$$

と書けるとき、$r$ を微小剛体変位という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm12-rigid -->
### **定義の確認**：平行移動と軸周り回転

$r(X)=(c,0,0)+\omega(-X_2,X_1,0)$ とする。ここで $a=(c,0,0)$、$B_{12}=-\omega$、$B_{21}=\omega$ 以外は零なので $B^T=-B$ が全成分で成立する。$\nabla r=B$ で

$$
\varepsilon(r)=\frac12(B+B^T)=0.
$$

従って [CTM11 の Hooke 則](../CTM11/index.md#thm-ctm11-hooke)から $\sigma(r)=0$。$r$ は任意の定数 $c,\omega$ について、外力と境界 traction を変えずに追加できる（ただし変位指定を破る場合は追加できない）。
<!-- definition-example-end -->

逆に、対称勾配が零となる $C^2$ 変位は**必ず**この六自由度（平行移動三、微小回転三）の形である。

<a id="lem-ctm12-rigidity"></a>

<!-- formal-statement-start -->
### 補題（零ひずみの剛体変位性）

連結な開集合 $\Omega\subset\mathbb R^3$ と $w\in C^2(\Omega;\mathbb R^3)$ に対し、$\varepsilon(w)=0$ が $\Omega$ の全点で成立することと、$w=a+BX$（定数 $a,B$、$B^T=-B$）であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

零ひずみの式 $\partial_jw_i=-\partial_iw_j$ をもう一度微分する。偏微分の順番を交換して各二階偏微分が零と分かるので、勾配は領域内で一定となる。

<!-- proof-start -->
### 証明

$w=a+BX$、$B^T=-B$ なら $\varepsilon(w)=0$ は定義から分かる。逆向きを証明する。$\varepsilon_{ij}(w)=0$ とすると、各添字 $i,j,k$ に対して

$$
\begin{aligned}
2\{\partial_i\varepsilon_{jk}
+\partial_j\varepsilon_{ik}
-\partial_k\varepsilon_{ij}\}
&=\partial_i\partial_kw_j+\partial_i\partial_jw_k\\
&\quad+\partial_j\partial_kw_i+\partial_j\partial_iw_k\\
&\quad-\partial_k\partial_jw_i-\partial_k\partial_iw_j\\
&=2\partial_i\partial_j w_k.
\end{aligned}
$$

左辺は零、$C^2$ 性から右辺の同じ混合偏微分をまとめられる。従って全ての $\partial_i\partial_jw_k=0$。各 $\partial_jw_k$ は連結開集合上で勾配が零なので定数、すなわち $\nabla w=B$ が一定である。$w-BX$ も勾配が零なので定数 $a$。最後に $\varepsilon(w)=0$ を代入すると $(B+B^T)/2=0$。$\square$
<!-- proof-end -->

$\Gamma_D=\varnothing$ で $u$ が解なら、任意の小さい剛体変位 $r$ に対して $u+r$ も釣合・Neumann 条件を満たす。つまり**純 Neumann 問題は解が存在しても一般に一意でない**。この非一意性は数値計算の誤差ではなく物理的な自由運動の反映である。

さらに外力が純 Neumann 問題の解を許すには、合力だけでなく**合トルク**も零でなければならない。これは解の存在に対する必要条件であって、ここでは十分条件と主張しない。

<a id="prop-ctm12-force-torque"></a>

<!-- formal-statement-start -->
### 命題（純表面力指定の合力・合トルク必要条件）

$\Gamma_D=\varnothing$、$\Gamma_N=\partial\Omega$ とし、滑らかな対称応力 $\sigma$ が $\operatorname{div}\sigma+f=0$、$\sigma n=\bar t$ を満たすとする。このとき任意の基準点 $X_0$ に対し

$$
\int_\Omega f\,dV+\int_{\partial\Omega}\bar t\,dS=0,
$$

$$
\int_\Omega (X-X_0)\times f\,dV+
\int_{\partial\Omega}(X-X_0)\times\bar t\,dS=0
$$

が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

運動量の局所形を体積積分すると合力が出る。トルクは三次元ベクトル積の中へ微分を入れると応力の反対称部分が現れるが、[CTM7 の応力対称性](../CTM7/index.md#prop-ctm7-angular-stress)によってその項が消える。

<!-- proof-start -->
### 証明

成分ごとの発散定理を $\partial_j\sigma_{ij}=-f_i$ に適用すると

$$
\int_{\partial\Omega}\sigma_{ij}n_j\,dS
=\int_\Omega\partial_j\sigma_{ij}\,dV
=-\int_\Omega f_i\,dV.
$$

これが合力の式。次に $y=X-X_0$ と置き、Levi-Civita 記号 $\epsilon_{kil}$ を使う。この記号は $(k,i,l)$ が $(1,2,3)$ の偶置換なら $+1$、奇置換なら $-1$、添字に重複があれば $0$ と定める。$k$ 番目のトルク成分に対し積の微分を行えば

$$
\begin{aligned}
\partial_j(\epsilon_{kil}y_i\sigma_{lj})
&=\epsilon_{kil}\delta_{ij}\sigma_{lj}
+\epsilon_{kil}y_i\partial_j\sigma_{lj}\\
&=\epsilon_{kil}\sigma_{li}
-\epsilon_{kil}y_i f_l\\
&=-\epsilon_{kil}y_i f_l.
\end{aligned}
$$

二行目の最初の項は $\sigma_{li}=\sigma_{il}$ が対称で、$\epsilon_{kil}$ が $i,l$ で反対称だから零。発散定理の境界側は $\int_{\partial\Omega}(y\times\sigma n)_k\,dS$。これを移項すればトルクの式を得る。$\square$
<!-- proof-end -->

たとえば $f=0$、境界の一面だけに一定で非零の traction を与え、他の全表面を零とすると、合力が一般に非零になり解は存在できない。固定面を設ければそこに反力が生じて合力を補えるが、純 Neumann 問題ではその反力がない。

## 4. エネルギーが一意性を保証する範囲

[CTM11 の蓄積エネルギー](../CTM11/index.md#thm-ctm11-hooke)を同じ材料の全体積にわたって足す。$W(\varepsilon)=\lambda(\operatorname{tr}\varepsilon)^2/2+\mu\varepsilon:\varepsilon$ は Pa だから $\int_\Omega W\,dV$ は J になる。変位 $v$ に対する**全ポテンシャルエネルギー**を、蓄積エネルギーから与えた外力の仕事を引いた

$$
\Pi(v)=\int_\Omega W(\varepsilon(v))\,dV
-\int_\Omega f\cdot v\,dV
-\int_{\Gamma_N}\bar t\cdot v\,dS
$$

とする（$f,\bar t$ は変位に依存しない死荷重とする）。$\Gamma_D$ 上では $v=\bar u$ を保つため、比較変位 $h$ はそこで零となる。これは数学的には許容変位の差を表す。変分パラメータ $s\in\mathbb R$ を動かし、各空間点 $X$ を固定したまま $v+sh$ を比較するとき、**第一変分**は

$$
\delta\Pi(v)[h]:=\left.\frac{d}{ds}\Pi(v+sh)\right|_{s=0}
$$

である。$d/ds$ は変分パラメータの通常の微分で、前節までの $\partial_j=\partial/\partial X_j$ は空間座標の偏微分である。$s$ は無次元とし、$h$ は $v$ と同じ変位の単位（m）を持つ。

<a id="prop-ctm12-energy-variation"></a>

<!-- formal-statement-start -->
### 命題（ポテンシャルエネルギーの第一変分と静的釣合）

$\Omega,\Gamma_D,\Gamma_N$ を上記のようにとり、$\lambda,\mu$ を一定、$f,\bar t$ を変位に依存しないものとする。境界で $v=\bar u$ を満たす十分滑らかな変位 $v$ と、$\Gamma_D$ 上で $h=0$ を満たす十分滑らかな変分 $h$ に対し

$$
\delta\Pi(v)[h]=
\int_\Omega\sigma(v):\varepsilon(h)\,dV
-\int_\Omega f\cdot h\,dV
-\int_{\Gamma_N}\bar t\cdot h\,dS.
$$

古典解 $u$ は全ての許容 $h$ に対し $\delta\Pi(u)[h]=0$ を満たす。逆に、十分滑らかな $u$ がこの等式を全ての許容 $h$ で満たすなら、内部の静的釣合と $\Gamma_N$ の traction 条件が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\varepsilon(v+sh)=\varepsilon(v)+s\varepsilon(h)$ として二次エネルギーを $s$ で微分する。応力の対称性と積分の部分積分で、体積側の残差と境界側の残差を別々に取り出す。

<!-- proof-start -->
### 証明

二次式を $s$ で微分する。先に宣言した通り $s$ は無次元である。

$$
\frac{d}{ds}W(\varepsilon(v)+s\varepsilon(h))\bigg|_{s=0}
=\lambda(\operatorname{tr}\varepsilon(v))(\operatorname{tr}\varepsilon(h))
+2\mu\varepsilon(v):\varepsilon(h)
=\sigma(v):\varepsilon(h).
$$

荷重は $v$ に依存しないため、それぞれの仕事の微分は $f\cdot h$ と $\bar t\cdot h$。これで表示した変位方向への微分公式を得る。$\sigma(v)$ は対称なので、微小ひずみの二項を成分で展開すれば

$$
\begin{aligned}
\sigma(v):\varepsilon(h)
&=\frac12\sigma_{ij}(v)(\partial_jh_i+\partial_ih_j)\\
&=\frac12(\sigma_{ij}(v)+\sigma_{ji}(v))\partial_jh_i\\
&=\sigma_{ij}(v)\partial_jh_i.
\end{aligned}
$$

二行目では総和のダミー添字 $i,j$ を入れ替えた。積の微分を成分で行うと

$$
\partial_j(\sigma_{ij}(v)h_i)
=(\partial_j\sigma_{ij}(v))h_i
+\sigma_{ij}(v)\partial_jh_i.
$$

発散定理を用い $\Gamma_D$ 上で $h=0$ とすると

$$
\delta\Pi(v)[h]=
-\int_\Omega(\operatorname{div}\sigma(v)+f)\cdot h\,dV
+\int_{\Gamma_N}(\sigma(v)n-\bar t)\cdot h\,dS.
$$

従って古典解は停留する。逆に、まず内部に台をもつ $h$ を任意に選べば内部残差が零、次に $\Gamma_N$ の内部に台をもつ境界トレースを許す $h$ を選べば境界残差が零となる（連続な残差に基本補題を適用）。$\square$
<!-- proof-end -->

### 一意性を証明する

同じデータを満たす二つの古典解を $u^{(1)},u^{(2)}$ とし、$w=u^{(1)}-u^{(2)}$ を取る。$w$ の方程式は同次化される。$w=0$ が $\Gamma_D$ で、$\sigma(w)n=0$ が $\Gamma_N$ で成立し、領域内で $\operatorname{div}\sigma(w)=0$ となる。

<a id="thm-ctm12-uniqueness"></a>

<!-- formal-statement-start -->
### 定理（固定条件を持つ線形弾性問題の一意性）

$\Omega$ を連結な有界区分的 $C^1$ 領域とし、材料係数に次の正定値条件を課す。

$$
\mu>0,\qquad K=\lambda+\frac{2\mu}{3}>0.
$$

$\Gamma_D$ が三つの非共線な境界点を含む開いた面片を持ち、同じデータ $f,\bar u,\bar t$ を満たす二つの古典解が存在すると仮定する。このとき二つの変位場は一致する。

$\Gamma_D=\varnothing$ なら、二つの古典解の差は微小剛体変位に限られる。
<!-- formal-statement-end -->

### 証明の見取り図

二解の差 $w$ を平衡式に代入し、$w$ と掛けて体積で積分する。境界項は Dirichlet 面で $w=0$、Neumann 面で traction が零なので消える。[CTM11 の正定値条件](../CTM11/index.md#prop-ctm11-split)から $\varepsilon(w)=0$、さらに[零ひずみの剛体変位補題](#lem-ctm12-rigidity)で $w=a+BX$。開いた固定面片上で零となる剛体変位は零しかない。

<!-- proof-start -->
### 証明

差の応力は線形性より $\sigma(w)=\sigma(u^{(1)})-\sigma(u^{(2)})$ である。積の微分と発散定理を $w_i\sigma_{ij}(w)$ に適用すると

$$
\begin{aligned}
\int_\Omega\sigma(w):\varepsilon(w)\,dV
&=\int_\Omega\sigma_{ij}(w)\partial_jw_i\,dV\\
&=\int_{\partial\Omega}w\cdot\sigma(w)n\,dS
-\int_\Omega w\cdot\operatorname{div}\sigma(w)\,dV\\
&=0.
\end{aligned}
$$

最後の境界積分は $\Gamma_D$ では $w=0$、$\Gamma_N$ では $\sigma(w)n=0$ で零。内部積分も静的釣合の差により零である。[CTM11 のエネルギー分解](../CTM11/index.md#prop-ctm11-split)を $w$ のひずみに適用すると

$$
\sigma(w):\varepsilon(w)
=2\mu\,\varepsilon_{\rm dev}(w):\varepsilon_{\rm dev}(w)
+K(\operatorname{tr}\varepsilon(w))^2\ge0.
$$

$\mu,K>0$、連続性、および積分が零であることから、$\varepsilon_{\rm dev}(w)=0$ かつ $\operatorname{tr}\varepsilon(w)=0$ が各点で成立し、$\varepsilon(w)=0$。そこで[零ひずみの剛体変位性](#lem-ctm12-rigidity)から $w(X)=a+BX$、$B^T=-B$。

$\Gamma_D$ の開いた面片には非共線な三点 $X^{(1)},X^{(2)},X^{(3)}$ が取れる。各点で $w=0$ なので

$$
B(X^{(2)}-X^{(1)})=0,\qquad
B(X^{(3)}-X^{(1)})=0.
$$

三次元の反対称行列は、ある $\omega=(\omega_1,\omega_2,\omega_3)$ を使って

$$
B=\begin{pmatrix}
0&-\omega_3&\omega_2\\
\omega_3&0&-\omega_1\\
-\omega_2&\omega_1&0
\end{pmatrix},
\qquad Bv=\omega\times v
$$

と表せる。$Bv=0$ なら $\omega$ と $v$ は平行（または $\omega=0$）。独立な二ベクトルを同時に零へ送るには $\omega=0$、ゆえに $B=0$。一つの点の条件から $a=0$ となる。純 Neumann のときは固定面を使わない直前までの議論により $w=a+BX$ だけが残る。$\square$
<!-- proof-end -->

ここで証明したのは**解があれば一意**という主張で、任意の境界値・領域に古典解が存在するという証明ではない。滑らかでない角の近くでは古典解の正則性が失われることがあり、弱解・存在定理は別の理論を要する。

また正定値性を失うと上の積分から零ひずみを導けない。例えば $\mu=0$ では跡零のせん断ひずみが $\sigma:\varepsilon=0$ になり得る。**剛体変位しか残らない**という証明の核心がここで壊れる。

### エネルギー最小化の意味

古典解 $u$ と同じ $\bar u$ を持つ許容変位 $v=u+h$ に対し、一次変分の停留性を使って二次式を展開すると

$$
\begin{aligned}
\Pi(u+h)-\Pi(u)
&=\delta\Pi(u)[h]+\int_\Omega W(\varepsilon(h))\,dV\\
&=\int_\Omega W(\varepsilon(h))\,dV\ge0.
\end{aligned}
$$

$W\ge0$ は [CTM11 の正定値性](../CTM11/index.md#prop-ctm11-split)による。$\Gamma_D$ が上記の固定面片を含めば、等号のとき $h$ は零であり $u$ が唯一の最小化変位となる。純 Neumann では剛体変位を足しても同じ値なので、最小化だけでは絶対位置を決められない。

## 5. 荷重のある棒を端から解く

別の手計算例として、$\Omega=(0,L)\times(0,H)\times(0,T)$ に単位体積当たり一定の力 $f=qe_1$（$q>0$ N/m$^3$）を加え、**横変位を零とする一次元ひずみ模型**

$$
u=(\phi(X_1),0,0)
$$

を選ぶ。プライムは一つの物質座標 $X_1$ による通常微分を表す。

$$
\phi'=\frac{d\phi}{dX_1},\qquad
\phi''=\frac{d^2\phi}{dX_1^2},\qquad
\partial_1u_1=\phi'(X_1),\quad
\partial_2u_1=\partial_3u_1=0.
$$

[微小ひずみの定義](../CTM3/index.md#def-ctm3-infinitesimal-strain)で対称化し、[Hooke 則](../CTM11/index.md#thm-ctm11-hooke)を成分ごとに代入すると

$$
\varepsilon=\operatorname{diag}(\phi',0,0),\qquad
\sigma=\operatorname{diag}((\lambda+2\mu)\phi',\lambda\phi',\lambda\phi').
$$

$M=\lambda+2\mu=K+4\mu/3>0$（Pa）と置く。発散では $\partial_j\sigma_{ij}$ の $j$ で和を取り、第1成分は $\partial_1\sigma_{11}=M\phi''$、他の二成分は零である。釣合の第一成分は

$$
M\phi''+q=0.
$$

左端 $X_1=0$ で全変位零、右端 $X_1=L$ で無荷重 $\sigma e_1=0$ とすれば $\phi(0)=0$、$\phi'(L)=0$。二回積分して

$$
\phi'(X_1)=\frac qM(L-X_1),\qquad
\boxed{\phi(X_1)=\frac qM\left(LX_1-\frac{X_1^2}{2}\right)}.
$$

確認：$\phi''=-q/M$ だから $\operatorname{div}\sigma+f=0$。右面は $\phi'(L)=0$ なので traction 零、左面で $\phi(0)=0$。しかし側面 $n=\pm e_2,\pm e_3$ では

$$
\sigma n=\pm\lambda\frac qM(L-X_1)e_2
\quad\text{または}\quad
\pm\lambda\frac qM(L-X_1)e_3.
$$

従ってこの変位場を**三次元の厳密解として**使うなら、四側面にも上式の traction を処方しなければならない。全側面を自由にする通常の細長い棒とは異なる境界値問題である。次元は $qL^2/M$ が m、$M\phi''$ が N/m$^3$。$qL/M\ll1$ を満たして微小変形を保つ。

## 演習

各問は断りのない限り本章の一様な等方線形弾性、$\mu,K>0$、小変形を仮定する。候補変位については、内部釣合だけでなく境界の各法線を必ず確認せよ。

### Level A

### A1. 応力の発散を成分から計算する

$u=(cX_1^2,0,0)$、$c$ の単位を m$^{-1}$ とする。$\varepsilon,\sigma,\operatorname{div}\sigma$ と釣合に必要な $f$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\partial_1u_1=2cX_1$ 以外の変位微分は零。従って

$$
\varepsilon=\operatorname{diag}(2cX_1,0,0),\quad
\sigma=\operatorname{diag}(2(\lambda+2\mu)cX_1,2\lambda cX_1,2\lambda cX_1).
$$

第 $i$ 成分の発散は $\sum_j\partial_j\sigma_{ij}$。対角応力の $\sigma_{22},\sigma_{33}$ は $X_1$ に依存するが、発散では $\partial_2\sigma_{22}$、$\partial_3\sigma_{33}$ を使うので零。よって

$$
\operatorname{div}\sigma=(2(\lambda+2\mu)c,0,0),
\quad
f=-2(\lambda+2\mu)c\,e_1.
$$

$[\lambda c]=$ Pa/m = N/m$^3$ で整合する。
<!-- solution-end -->

### A2. 面力を法線から読む

$\sigma=\begin{pmatrix}p&s&0\\s&0&0\\0&0&0\end{pmatrix}$（Pa）について、$n=e_1,-e_1,e_2,-e_2$ の traction を列挙し、$p$ と $s$ のどちらがどの面の法線成分になるか確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[CTM6 の traction の法則](../CTM6/index.md#thm-ctm6-cauchy-stress)へ各法線を代入する。

$$
\sigma e_1=(p,s,0),\quad \sigma(-e_1)=(-p,-s,0),
$$

$$
\sigma e_2=(s,0,0),\quad \sigma(-e_2)=(-s,0,0).
$$

$e_1$ 面では法線応力 $n\cdot\sigma n=p$、接線方向 $e_2$ の成分は $s$。$e_2$ 面では法線応力は零、接線 $e_1$ に $s$ がかかる。行列全体が零でなくても自由面の traction が零になる場合がある。
<!-- solution-end -->

### A3. 剛体変位を判定する

$r=(c-\omega X_2,\omega X_1,d)$、$v=(bX_1,0,0)$ とする。各々の対称勾配を計算し、$b\ne0$ の $v$ が剛体変位でない理由を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$r=a+BX$ の $a=(c,0,d)$、$B_{12}=-\omega,B_{21}=\omega$、他成分零なので $B+B^T=0$、$\varepsilon(r)=0$。これに対して $\nabla v=\operatorname{diag}(b,0,0)$ は対称で $\varepsilon(v)=\operatorname{diag}(b,0,0)\ne0$。[零ひずみの補題](#lem-ctm12-rigidity)により、$b\ne0$ では $v$ を剛体変位とは書けない。
<!-- solution-end -->

### A4. 正定値エネルギーの係数

$W=\lambda(\operatorname{tr}\varepsilon)^2/2+\mu\varepsilon:\varepsilon$ とする。$\varepsilon=aI_3$、$\varepsilon=\operatorname{diag}(a,-a,0)$ の二つで $W$ を求め、$\lambda=-\mu$ が正定値性を壊すことを示せ（$\mu>0$, $a\ne0$）。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\varepsilon=aI_3$ は $\operatorname{tr}\varepsilon=3a$、$\varepsilon:\varepsilon=3a^2$ なので

$$
W=\frac{\lambda}{2}(3a)^2+3\mu a^2
=\frac32(3\lambda+2\mu)a^2.
$$

跡零の第二例では $\varepsilon:\varepsilon=2a^2$ だから $W=2\mu a^2>0$。$\lambda=-\mu$ では第一例の $W=-3\mu a^2/2<0$。つまりせん断方向が正でも、体積方向の [CTM11 の正定値条件](../CTM11/index.md#prop-ctm11-split)の $K=\lambda+2\mu/3>0$ が破れている。
<!-- solution-end -->

### Level B

### B1. 一様引張り棒の境界条件を検査する

$u=(aX_1,-\nu aX_2,-\nu aX_3)$、$a=p/E_Y$ とし、$f=0$、右端と四側面に自然条件を与える。全ての面の traction、左面の変位指定 $\bar u$、および完全固定 $u=0$ との違いを書け。

- Level: B

<!-- solution-start -->
#### 詳細解答

[CTM11 の弾性定数変換](../CTM11/index.md#thm-ctm11-elastic-constants)によれば、この一軸応力設定で

$$
\sigma=\operatorname{diag}(E_Ya,0,0)=\operatorname{diag}(p,0,0).
$$

応力は一定なので発散零。右面 $n=e_1$ は $pe_1$、左面 $n=-e_1$ の反力は $-pe_1$ である。四側面の $n=\pm e_2,\pm e_3$ については traction が零となる。

左面では $X_1=0$ なので $\bar u=(0,-\nu aX_2,-\nu aX_3)$。$\nu a\ne0$ で横座標が非零なら、この面の横変位は零でない。従って左面を全面 $u=0$ へ変更した問題に、同じ候補を代入してはならない。
<!-- solution-end -->

### B2. せん断板の側面を自由にできるか

$u=(\gamma X_2,0,0)$、$\gamma>0$ の一様せん断場について、下面固定、上面 $\bar t=\mu\gamma e_1$、残りの全側面自由とした問題を考える。なぜこの $u$ は解でないか。側面へ何を加えれば解になるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\varepsilon_{12}=\varepsilon_{21}=\gamma/2$、$\operatorname{tr}\varepsilon=0$ より $\sigma_{12}=\sigma_{21}=\mu\gamma$、他は零。従って発散は零、下面で $u=0$、上面の $n=e_2$ に対し $\sigma n=\mu\gamma e_1$ は正しい。一方 $X_1=L$ の $n=e_1$ では $\sigma n=\mu\gamma e_2\ne0$、$X_1=0$ の $n=-e_1$ では $-\mu\gamma e_2\ne0$ だから自由境界に反する。これら二面にそれぞれ $\bar t=+\mu\gamma e_2$、$-\mu\gamma e_2$ を指定すればよい。$X_3=0,T$ は traction 零のままでよい。側面の荷重抜けは内部の釣合式だけを検証しても発見できない。
<!-- solution-end -->

### B3. 体積力で曲がる変位を求める

$u=(\phi(X_1),0,0)$、$f=qe_1$（$q>0$）で $\phi(0)=0$、右端 $X_1=L$ の traction は零とする。$\phi$ を求め、四側面の必要な traction と微小変形の条件を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\varepsilon=\operatorname{diag}(\phi',0,0)$、$\sigma=\operatorname{diag}(M\phi',\lambda\phi',\lambda\phi')$、$M=\lambda+2\mu>0$。領域内の釣合は $M\phi''+q=0$。一度積分すると $\phi'=-qX_1/M+C$、右端では $\sigma e_1=M\phi'e_1=0$ なので $C=qL/M$。もう一度積分して $\phi=-qX_1^2/(2M)+qLX_1/M+D$、左端変位零で $D=0$。側面 $X_2=H,0$ には $\pm\lambda q(L-X_1)e_2/M$、$X_3=T,0$ には $\pm\lambda q(L-X_1)e_3/M$ が必要。最大の勾配は $\|\nabla u\|_{\max}=qL/M$ なので $qL/M\ll1$ を課す。各応力は Pa、面力は Pa、変位は m である。
<!-- solution-end -->

### B4. 剛体モードと合力条件

純 Neumann 問題で $f=0$、ある一面 $S$ の面積を $A>0$ として、そこだけに一様な $\bar t=pe_1$（$p>0$）、他の境界には零を指定した。解が存在しない理由と、仮に釣合条件を満たす純 Neumann 問題が解けた場合にも非一意である理由を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[合力・合トルク必要条件](#prop-ctm12-force-torque)の第一式について、今回の全外力は

$$
\int_\Omega f\,dV+\int_{\partial\Omega}\bar t\,dS
=0+pAe_1\ne0.
$$

$pA>0$ だから合力が零にならず、古典解は存在しない。

別の面で荷重を釣り合わせて必要条件を満たした場合でも、解 $u$ があれば $u+r$ も解になる。微小剛体変位なら $\varepsilon(r)=0$、従って $\sigma(r)=0$ なので

$$
\operatorname{div}\sigma(u+r)=\operatorname{div}\sigma(u),\qquad
\sigma(u+r)n=\sigma(u)n.
$$

Dirichlet 面が無いので追加した剛体変位を拘束できない。なお合力・合トルク必要条件の成立だけで、解の存在が保証されるわけではない。
<!-- solution-end -->

### Level C

### C1. 引張りとせん断を同時に受ける直方体

$\Omega=(0,L)\times(0,H)\times(0,T)$、$p>0$（Pa）、小さい $\gamma$ とし、$E_Y>0$、$-1<\nu<1/2$、$\mu>0$ は [CTM11 の弾性定数](../CTM11/index.md#thm-ctm11-elastic-constants)で整合するものとする。$a=p/E_Y$ と置き

$$
u(X)=(aX_1+\gamma X_2,-\nu aX_2,-\nu aX_3)
$$

を候補とする。$f=0$、左面 $X_1=0$ に上式の変位を指定し、それ以外の面に自然条件を課す。

1. $\varepsilon,\sigma,\operatorname{div}\sigma$ を求めよ。
2. 左面の指定変位と、右面・上下側面・前後側面のすべての traction を求めよ。右面にはせん断方向の面力が存在するか。
3. 単位体積当たりの弾性エネルギー $W$ と $\sigma:\varepsilon$ を計算し、$2W=\sigma:\varepsilon$ を確認せよ。
4. これと同じ内部式に、右面は $pe_1$ のみ、ほかの側面は自由という条件を指定したら、どの面で破綻するか。
5. 全 Dirichlet 面を残し、同じ荷重で別解があると仮定する。一意性定理を適用する際の仮定と結論を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず偏微分行列は

$$
\nabla u=
\begin{pmatrix}
a&\gamma&0\\
0&-\nu a&0\\
0&0&-\nu a
\end{pmatrix},\qquad
\varepsilon=\begin{pmatrix}
a&\gamma/2&0\\
\gamma/2&-\nu a&0\\
0&0&-\nu a
\end{pmatrix}.
$$

跡は $(1-2\nu)a$。[CTM11 の Hooke 則](../CTM11/index.md#thm-ctm11-hooke)と[一軸応力の係数変換](../CTM11/index.md#thm-ctm11-elastic-constants)より、対角部分は $\operatorname{diag}(p,0,0)$ であり、せん断部分は $2\mu(\gamma/2)=\mu\gamma$ となる。従って

$$
\sigma=
\begin{pmatrix}
p&\mu\gamma&0\\
\mu\gamma&0&0\\
0&0&0
\end{pmatrix},\qquad
\operatorname{div}\sigma=0
$$

で、$f=0$ と釣合う。左面 $X_1=0$ の指定変位は $(\gamma X_2,-\nu aX_2,-\nu aX_3)$。各面の外向き法線に応力行列を掛けると

$$
\begin{array}{ll}
X_1=L:\ \sigma e_1=pe_1+\mu\gamma e_2,&
X_1=0:\ \sigma(-e_1)=-pe_1-\mu\gamma e_2,\\
X_2=H:\ \sigma e_2=\mu\gamma e_1,&
X_2=0:\ \sigma(-e_2)=-\mu\gamma e_1,\\
X_3=T,0:\ \sigma(\pm e_3)=0.&
\end{array}
$$

左面は変位境界なので、ここに書いた traction は処方荷重ではなく支持反力として現れる値である。右面に $e_2$ 方向の面力がある点が重要である。

エネルギーは一軸成分と純せん断成分に分けられ、$\varepsilon:\varepsilon=a^2+2\nu^2a^2+\gamma^2/2$。$\sigma:\varepsilon$ は対角の $pa$ と非対角二箇所の $2(\mu\gamma)(\gamma/2)$ の和だから

$$
\sigma:\varepsilon=pa+\mu\gamma^2,\qquad
W=\frac12pa+\frac12\mu\gamma^2.
$$

独立に $W=\lambda(1-2\nu)^2a^2/2+\mu\{(1+2\nu^2)a^2+\gamma^2/2\}$ へ換算すると、[弾性定数関係](../CTM11/index.md#thm-ctm11-elastic-constants)を用いて $a^2$ の係数が $E_Y/2$ となり $E_Ya^2/2=pa/2$ と一致する。

右面 $pe_1$ のみなら不足は $\mu\gamma e_2$、$X_2=H,0$ を自由にすればそれぞれ $\pm\mu\gamma e_1$ が不足する。$X_3$ 面は元から零である。$\gamma\ne0$ では少なくとも三面で候補が境界条件に反する。

最後に $\mu>0$ と $-1<\nu<1/2$ から $K=E_Y/[3(1-2\nu)]>0$、$\Omega$ は連結、左面は開いた非共線三点を含む Dirichlet 面片、データは同一なので[一意性定理](#thm-ctm12-uniqueness)を適用できる。仮定した別の古典解は候補 $u$ と一致する。これは存在を新たに証明したのではなく、今回すでに候補解を構成しているため、一意であると言えるのである。
<!-- solution-end -->

## 次への接続

静力学で必要だったのは $\operatorname{div}\sigma+f=0$ と境界条件である。次の **CTM13** では [CTM7 の運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)の加速度 $\rho\partial_t^2u$ を零にせず、同じ Hooke 則を代入する。すると時間的な振動が伝わり、変位の発散と回転に対応する縦波・横波が分かれる。
