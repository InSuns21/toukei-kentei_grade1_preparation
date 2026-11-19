# FCG4 圧力射影で発散を減らすには

[FCG3の半Lagrange染料更新](../FCG3/index.md#def-fcg3-advection-step)では、**与えられた**速度で染料だけを運んだ。次のFCG5で速度そのものを時間更新するには、計算途中の速度が流体を勝手に膨張・圧縮させない仕組みが必要になる。本講の目標は、速度から勾配成分を引いて格子ごとの体積流出入を相殺する**圧力射影**を、境界まで同じ離散演算子で構成することである。

ここでは非圧縮・密度一定の2次元模型を扱う。密度 $\rho>0$ [kg/m³]、時間刻み $\Delta t>0$ [s] とし、速度は [m/s]、圧力は [Pa]、長さは [m]。圧力は運動量の時間更新における補正量であって、重力や粘性・移流による予測速度の生成はまだ扱わない。**Poisson方程式を反復しただけでは非圧縮性が厳密に実現するとは限らない**ことも、残差から検査する。

## 1. なぜセル中心だけの速度では不便なのか

領域を $[0,1]^2$ [m²] とし、各方向を $N\ge2$ 等分する。$h=1/N$ [m]、$i,j=0,\dots,N-1$。圧力標本 $p_{ij}$ をセル中心 $((i+1/2)h,(j+1/2)h)$ に置く。水平速度 $u$ は左右の**鉛直面** $(ih,(j+1/2)h)$、鉛直速度 $v$ は上下の**水平面** $((i+1/2)h,jh)$ に置く。セルを出る流束は左右・上下それぞれの面速度の符号付き差になる。これは圧力・速度を同一点に置く方式と違い、セルの流入流出を一意の共有面で数えられる配置である。

<a id="def-fcg4-mac-divergence"></a>

<!-- formal-statement-start -->
> **定義（MAC格子と離散発散）**  
> 圧力 $p_{ij}$ は $N\times N$ 個のセル中心、水平速度 $u_{i,j}$ は $i=0,\dots,N$、$j=0,\dots,N-1$ の鉛直面中心、鉛直速度 $v_{i,j}$ は $i=0,\dots,N-1$、$j=0,\dots,N$ の水平面中心に配置する。この交互配置を **MAC格子**と呼ぶ。各セルの離散発散 $D_h\boldsymbol u$ は

$$
(D_h\boldsymbol u)_{ij}
=\frac{u_{i+1,j}-u_{i,j}+v_{i,j+1}-v_{i,j}}{h}.
$$

> 固定壁での零法線流束は $u_{0,j}=u_{N,j}=0$、$v_{i,0}=v_{i,N}=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg4-mac-divergence -->
**直接例。** $h=1/2$、セル $(0,0)$ の右面速度 $u_{1,0}=3$、上面速度 $v_{0,1}=-1$ [m/s]、左・下面が零なら、面の符号を式へ代入して $(D_h\boldsymbol u)_{00}=(3-0-1+0)/(1/2)=4$ [s⁻¹]。右へ出る3と上から入る1が相殺しきれない。これは流量の絶対値の和ではない。

**定義の確認**：速度標本は鉛直・水平の各面に対応し、共有面の正負を区別して左右・上下の差を取った。壁面の法線速度が零である場合も同じ式に代入できる。
<!-- definition-example-end -->

## 2. 圧力をどこで差分し、どう速度を直すか

セル中心圧力の左右差を取れば、両者の間にある鉛直面の水平勾配が得られる。上下差は水平面の鉛直勾配となる。外壁の法線速度は指定値のままとし、壁の外へ新たな圧力標本を要求しない。

<a id="def-fcg4-gradient-projection"></a>

<!-- formal-statement-start -->
> **定義（離散圧力勾配と射影）**  
> セル中心圧力 $p$ に対し、内側の鉛直面 $1\le i<N$ と水平面 $1\le j<N$ で

$$
(G_hp)^x_{i,j}=\frac{p_{i,j}-p_{i-1,j}}h,\qquad
(G_hp)^y_{i,j}=\frac{p_{i,j}-p_{i,j-1}}h
$$

> と置く。外壁の法線勾配は零とする。壁法線速度が零の予測速度 $\boldsymbol u^\ast$ から求める射影後の速度は

$$
\boldsymbol u^{\mathrm{new}}=\boldsymbol u^\ast-\frac{\Delta t}{\rho}G_hp
$$

> であり、外壁面では零法線速度をそのまま保つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg4-gradient-projection -->
**直接例。** $h=1/2$、上下に同じ圧力を持ち、左列 $p_{0,j}=1$、右列 $p_{1,j}=-1$ [Pa] のとき、内側鉛直面の勾配は $(-1-1)/(1/2)=-4$ [Pa/m]。$\Delta t/\rho=1$ の単位付き係数を用い、予測水平速度が $-4$ [m/s] なら射影後は $-4-(-4)=0$ [m/s]。ここで数値的な係数1は、指定された $\Delta t$ と $\rho$ の比の数値であって無次元量という意味ではない。

**定義の確認**：圧力の差を隣り合うセル中心の距離 $h$ で割り、その中間の面速度だけを修正した。外壁の法線速度は固定したままである。
<!-- definition-example-end -->

## 3. 圧力Poisson方程式・壁・ゲージ

速度の発散を零へ近づけたい。第2節の式へ $D_h$ を作用させ、演算子の線形性から

$$
D_h\boldsymbol u^{\mathrm{new}}
=D_h\boldsymbol u^\ast-\frac{\Delta t}{\rho}D_hG_hp.
$$

よって右辺を零とするには $L_h=D_hG_h$ とおいて $L_hp=(\rho/\Delta t)D_h\boldsymbol u^\ast$ を解けばよい。隣のセルが存在する面だけを足すと、境界を含む任意のセルで

$$
(L_hp)_{ij}
=\frac{\sum_{(a,b)\sim(i,j)}p_{ab}-m_{ij}p_{ij}}{h^2}
$$

となる。ここで $\sim$ は上下左右の**領域内**隣接セル、$m_{ij}$ はその数（角2、辺3、内部4）。境界の欠けた方向の圧力勾配は零とする。これは壁の法線圧力差分を零に指定する境界条件である。境界での法線微分を指定する方式を**Neumann境界条件**といい、指定値が零のときを**同次**と表現する。

<a id="def-fcg4-homogeneous-neumann"></a>

<!-- formal-statement-start -->
> **定義（同次Neumann条件）**  
> 圧力セル中心と速度面中心を持つ第1節のMAC格子について、圧力の外壁法線差分を零に指定する境界条件を同次Neumann条件という。壁を挟んだ外側の仮想セル値を隣接内側セル値と等しく延長すれば、例えば左壁では

$$
(G_hp)^x_{0,j}=\frac{p_{0,j}-p_{-1,j}}h=0,
\qquad p_{-1,j}=p_{0,j}
$$

> となる。右・上・下壁にも同様の等値延長を適用する。これは壁の**法線方向のみ**の条件であり、内側面の圧力差や壁に沿った接線方向の速度を零にする条件ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg4-homogeneous-neumann -->
**直接例。** 左端セルの圧力 $p_{0,j}=3$ [Pa]、格子幅 $h=1/2$ [m] とする。壁外仮想圧力を $p_{-1,j}=3$ [Pa] に延長すれば、法線差分は $(3-3)/(1/2)=0$ [Pa/m] となる。右隣の圧力が $-1$ [Pa] であっても、内側面の勾配 $(-1-3)/(1/2)=-8$ [Pa/m] は零にする必要がない。**定義の確認**：壁方向と領域内方向を区別し、境界に指定したのが法線差分だけであることを確かめた。
<!-- definition-example-end -->

固定壁の本講ではこの壁条件で圧力射影を行う。壁の圧力値そのものを指定するわけではなく、壁外の圧力を勝手に0へ固定して差分する方法とも異なる。

<a id="def-fcg4-neumann-gauge"></a>

<!-- formal-statement-start -->
> **定義（Neumann圧力Poisson問題と圧力ゲージ）**  
> 上記のMAC格子、零法線壁速度、$\rho,\Delta t>0$ の下で、圧力 $p$ を次の系の解として求める。

$$
L_hp=b,\qquad b_{ij}=\frac{\rho}{\Delta t}(D_h\boldsymbol u^\ast)_{ij},
\qquad \sum_{ij}p_{ij}=0.
$$

> $L_h$ は[同次Neumann条件](#def-fcg4-homogeneous-neumann)を採用する。解に定数を足しても $G_h$ は変わらないので、最後の平均零条件は圧力ゲージの固定である。解が存在する必要十分条件は $\sum_{ij}b_{ij}=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg4-neumann-gauge -->
**直接例。** $N=2,h=1/2$ とし、圧力を $p_{00}=p_{11}=1$、$p_{10}=p_{01}=-1$ [Pa] と選ぶ。平均は $(1-1-1+1)/4=0$ でゲージを満たす。角セル $(0,0)$ の領域内の隣は2個だから

$$
(L_hp)_{00}=\frac{(-1)+(-1)-2(1)}{(1/2)^2}=-16\quad[\mathrm{Pa}/\mathrm{m}^2].
$$

他の3セルの右辺はそれぞれ $16,16,-16$ [Pa/m²] となり、総和は零である。**欠けた壁方向に圧力0のセルを追加しない**ことがNeumann条件の計算上の意味である。

この右辺が予測速度からも得られることを確かめる。例えば $\rho=1$ [kg/m³]、$\Delta t=0.1$ [s] とし、壁面は零、内側面の予測速度を $\boldsymbol u^\ast=(\Delta t/\rho)G_hp$ と選ぶ。$(0,0)$ の右面と上面ではいずれも圧力差が $-2$ [Pa] だから、

$
u^\ast_{1,0}=v^\ast_{0,1}
=0.1\,\frac{-2}{1/2}=-0.4\quad[\mathrm{m/s}],
$

$
(D_h\boldsymbol u^\ast)_{00}
=\frac{-0.4-0+(-0.4)-0}{1/2}=-1.6\quad[\mathrm{s}^{-1}],
\qquad b_{00}=\frac{\rho}{\Delta t}(-1.6)=-16\quad[\mathrm{Pa/m^2}].
$

残りのセルも $b=(\rho/\Delta t)D_h\boldsymbol u^\ast=D_hG_hp=L_hp$ となる。これで、単に $b$ を圧力から逆算したのではなく、**壁速度・右辺・Poisson方程式・平均零ゲージ**を一つのMAC格子上で確認した。

**定義の確認**：平均零を確認し、欠けた外側方向を加えない差分で $L_hp=b$ を実際に満たす。右辺総和零とゲージの条件の両方を確かめた。
<!-- definition-example-end -->

可解条件と一意性は次の計算から導く。勾配の差を全セルで足すと、各内側面は正負一度ずつ現れて消える。

<a id="prop-fcg4-flux-sum"></a>

<!-- formal-statement-start -->
> **命題（零流束格子の発散総和）**  
> 有限の $N\times N$ MAC格子で四辺の法線速度が零なら

$$
h^2\sum_{ij}(D_h\boldsymbol u)_{ij}=0.
$$

> したがって圧力Poisson右辺 $b=(\rho/\Delta t)D_h\boldsymbol u^\ast$ は総和零である。
<!-- formal-statement-end -->

### 証明の見取り図

水平面と鉛直面を別に足し、格子内の共有面が相殺することを確かめる。

<!-- proof-start -->
### 証明

固定した $j$ に対し $\sum_{i=0}^{N-1}(u_{i+1,j}-u_{i,j})=u_{N,j}-u_{0,j}=0$。同様に固定した $i$ で $\sum_{j=0}^{N-1}(v_{i,j+1}-v_{i,j})=v_{i,N}-v_{i,0}=0$。それぞれ $1/h$ を掛けて全セルを足すと $\sum D_h\boldsymbol u=0$、さらにセル面積 $h^2$ を掛ける。$\rho/\Delta t$ は正の定数なので $b$ の総和も零である。
<!-- proof-end -->

<a id="fact-fcg4-neumann-unique"></a>

Poissonの可解性の**十分性**は、格子演算子を有限次元行列で表せば明示できる。まずセル圧力を $k=i+Nj$ の順に並べた長さ $N^2$ のベクトル $\boldsymbol p$ とする。$(L_h\boldsymbol p)_k$ の係数行列は、セル $(i,j)$ に対応する対角成分が $-m_{ij}/h^2$、隣接するセルの列が $1/h^2$、その他が零である。共有辺の両方向に同じ係数を置くのでこの行列は対称であり、次の二次形式は隣接する圧力差の二乗に分解できる。

$
-\sum_{ij}p_{ij}(L_hp)_{ij}
=\frac1{h^2}\sum_{\text{内側の隣接セル対 }a,b}(p_a-p_b)^2\ge0.
$

各隣接対を一度だけ数える。右辺が零なら、どの隣接セル間でも $p_a=p_b$。格子が連結しているため全セルの圧力は同じ定数となり、$L_h$ の核は定数ベクトルだけである。一方、対称性から任意の $\boldsymbol z$ が核にあれば $\boldsymbol z^{\mathsf T}L_h\boldsymbol p=(L_h\boldsymbol z)^{\mathsf T}\boldsymbol p=0$。つまり像は核の直交補空間に含まれる。さらに階数・退化次数の関係により、像も総和零ベクトルの空間も次元が $N^2-1$ なので両者は一致する。したがって $\sum b=0$ なら解が存在し、平均零を指定すれば一意に決まる。$p$ へ定数を足しても隣接差は変わらない。

## 4. 反復誤差を「非圧縮性」に言い換える

実装で各圧力セルを一度に厳密に解くのは高価になり得る。Jacobi法は旧圧力値だけから各新圧力を計算する。単純なJacobi法は格子の高周波成分で振動し得るため、このラボでは緩和係数 $\omega=2/3$ を使用し、反復ごとに平均圧力を引く。

$$
\widetilde p_{ij}^{(k+1)}
=(1-\omega)p_{ij}^{(k)}
+\frac{\omega}{m_{ij}}\left(
\sum_{(a,b)\sim(i,j)}p_{ab}^{(k)}-h^2b_{ij}\right),
$$

$$
p_{ij}^{(k+1)}
=\widetilde p_{ij}^{(k+1)}
-\frac1{N^2}\sum_{a,b}\widetilde p_{ab}^{(k+1)},\qquad p^{(0)}=0.
$$

圧力を最後まで反復しない場合、何がどれだけ残るかを数式で評価できる。

<a id="def-fcg4-residual"></a>

<!-- formal-statement-start -->
> **定義（Poisson残差と離散発散診断）**  
> 第3節の $L_h,b$ と第2節の射影に対し

$$
R_{ij}=(L_hp)_{ij}-b_{ij},\qquad
E_{\mathrm P}=\max_{ij}|R_{ij}|,\qquad
E_{\mathrm D}=\max_{ij}|(D_h\boldsymbol u^{\mathrm{new}})_{ij}|
$$

> をそれぞれPoisson残差、最大Poisson残差、射影後の最大発散と呼ぶ。$E_{\mathrm P}$ は [Pa/m²]、$E_{\mathrm D}$ は [s⁻¹] の単位を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg4-residual -->
**直接例。** $N=2,h=1/2$ で平均零かつ総和零の右辺を $b_{00}=-16,b_{10}=16,b_{01}=16,b_{11}=-16$ [Pa/m²] とする。反復前の $p=0$ では $L_hp=0$ なので $R_{00}=0-(-16)=16$、他のセルは $-16,-16,16$ [Pa/m²]。したがって $E_{\mathrm P}=16$ [Pa/m²]。$\Delta t/\rho$ の数値を0.1とすると、$p=0$ では $G_hp=0$ なので $\boldsymbol u^{\mathrm{new}}=\boldsymbol u^\ast$ である。一方、$b=(\rho/\Delta t)D_h\boldsymbol u^\ast$ の定義を解けば $D_h\boldsymbol u^\ast=(\Delta t/\rho)b$。したがって

$
E_{\mathrm D}=\max_{ij}|D_h\boldsymbol u^\ast|
=\frac{\Delta t}{\rho}\max_{ij}|b_{ij}|
=0.1\cdot16=1.6\quad[\mathrm{s}^{-1}].
$

これは後の残差恒等式を先取りせず、$p=0$ と右辺の定義から直接確認できる。この時点では収束していない。

**定義の確認**：同じ $L_h$ とPoisson右辺の差を計算し、最大絶対残差を取った。射影後発散はその単位係数を掛けた値である。
<!-- definition-example-end -->

<a id="prop-fcg4-residual-identity"></a>

<!-- formal-statement-start -->
> **命題（Poisson残差と射影後発散の恒等式）**  
> 同じ $D_h,G_h$、壁面零法線速度、$L_h=D_hG_h$ を用いて圧力 $p$ から射影するなら、各セルについて

$$
(D_h\boldsymbol u^{\mathrm{new}})_{ij}
=-\frac{\Delta t}{\rho}R_{ij},\qquad
E_{\mathrm D}=\frac{\Delta t}{\rho}E_{\mathrm P}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

射影後の速度の定義に発散を作用させ、右辺の $b$ とPoisson残差の定義を順番に代入する。

<!-- proof-start -->
### 証明

[離散圧力勾配と射影](#def-fcg4-gradient-projection)から

$$
D_h\boldsymbol u^{\mathrm{new}}
=D_h\boldsymbol u^\ast-\frac{\Delta t}{\rho}D_hG_hp.
$$

[Neumann圧力Poisson問題](#def-fcg4-neumann-gauge)の $b=(\rho/\Delta t)D_h\boldsymbol u^\ast$ を代入すると $D_h\boldsymbol u^\ast=(\Delta t/\rho)b$。よって

$$
D_h\boldsymbol u^{\mathrm{new}}
=\frac{\Delta t}{\rho}(b-L_hp)
=-\frac{\Delta t}{\rho}(L_hp-b)
=-\frac{\Delta t}{\rho}R.
$$

$\Delta t/\rho>0$ なので各セルの絶対値の最大を取れば二つ目の式を得る。
<!-- proof-end -->

**重要な警告。** 初期状態の発散だけが小さくてもPoissonが収束したとは限らない。圧力の平均値だけを変えても残差は下がらない。反対に $E_{\mathrm P}$ が有限で小さくても、時間刻み・密度の係数を取り違えると射影後発散との恒等式が壊れる。反復回数だけでなく両残差と壁流束を診断する。

## 5. 小さな製造解でゲージと射影を検算する

ラボでは $N=8,h=1/8$ [m]、$\rho=1$ [kg/m³]、$\Delta t=0.1$ [s] とし、セル圧力を

$$
\phi_{ij}=\cos\bigl(\pi(i+\tfrac12)/8\bigr)
\cos\bigl(\pi(j+\tfrac12)/8\bigr)\quad[\mathrm{Pa}]
$$

とする。$\sum\phi=0$ は $\cos(\pi(N-i-\tfrac12)/N)=-\cos(\pi(i+\tfrac12)/N)$ の対称性から従う。次に**流れ関数（stream function）**を頂点上の値 $\psi_{ij}$ として導入する。これは速度そのものではなく、鉛直面の水平速度を $y$ 方向の差分、水平面の鉛直速度を負の $x$ 方向の差分で生成するための量である。ここでは

$
\psi_{ij}=0.05\sin(\pi i/8)\sin(\pi j/8)\quad[\mathrm{m}^2/\mathrm{s}]
$

とする（頂点添字 $i,j=0,\dots,8$）。上付き $s$ はこの流れ関数から作る速度場を表し、時刻や微分を表す添字ではない。頂点差から定義する面速度

$$
u^{s}_{ij}=\frac{\psi_{i,j+1}-\psi_{i,j}}h,\qquad
v^{s}_{ij}=-\frac{\psi_{i+1,j}-\psi_{i,j}}h
$$

は壁の法線成分が零で、セルごとの発散も零である。実際、

$$
h(D_h\boldsymbol u^{s})_{ij}
=\frac{\psi_{i+1,j+1}-\psi_{i+1,j}-\psi_{i,j+1}+\psi_{i,j}}h
-\frac{\psi_{i+1,j+1}-\psi_{i,j+1}-\psi_{i+1,j}+\psi_{i,j}}h=0.
$$

初期予測速度を $\boldsymbol u^\ast=\boldsymbol u^{s}+(\Delta t/\rho)G_h\phi$ と構成する。すると $D_h\boldsymbol u^\ast=(\Delta t/\rho)L_h\phi$ である。圧力Poissonの平均零解は**厳密に** $\phi$、射影後の速度は**厳密に** $\boldsymbol u^s$ となる。これは未知の物理解を装うのではなく、離散化そのものを検算するための製造解である。

<a id="prop-fcg4-hodge-test"></a>

<!-- formal-statement-start -->
> **命題（勾配・無発散分解とゲージ不変性）**  
> 連結した零法線MAC格子で、次の仮定を満たす速度場と圧力場を考える。$\phi$ は平均零であり、$\boldsymbol u^s$ は離散的に無発散とする。

$$
D_h\boldsymbol u^{s}=0,\qquad
\boldsymbol u^\ast=\boldsymbol u^s+\frac{\Delta t}{\rho}G_h\phi.
$$

> このとき、圧力Poisson問題の平均零解と射影後速度は次のとおり。

$$
p=\phi,\qquad \boldsymbol u^{\mathrm{new}}=\boldsymbol u^s.
$$

> 任意の定数 $c$ に対し、圧力を $\phi+c$ としても射影速度は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

発散の線形性、Poisson問題の平均零一意性、定数の差分が零であることを順に使う。

<!-- proof-start -->
### 証明

$\boldsymbol u^\ast=\boldsymbol u^s+(\Delta t/\rho)G_h\phi$ に $D_h$ を作用させると、仮定から $D_h\boldsymbol u^\ast=(\Delta t/\rho)D_hG_h\phi$。したがって $b=(\rho/\Delta t)D_h\boldsymbol u^\ast=L_h\phi$。$\phi$ は平均零なので[第3節のNeumann問題の平均零一意性](#fact-fcg4-neumann-unique)から $p=\phi$ である。射影定義へ代入し、

$$
\boldsymbol u^{\mathrm{new}}
=\boldsymbol u^s+\frac{\Delta t}{\rho}G_h\phi
-\frac{\Delta t}{\rho}G_h\phi=\boldsymbol u^s.
$$

任意の面で $G_h(\phi+c)=G_h\phi$ は差分の分子で $c-c=0$ となるため成立する。
<!-- proof-end -->

**反例：壁条件を取り違えるとどうなるか。** 右壁の予測水平面速度を零でなく1 [m/s]に設定したままなら、[発散総和](#prop-fcg4-flux-sum)の望遠鏡和には右壁からの流出が残る。$\sum b=0$ の可解条件が破れ、零Neumann問題に解がなくなる。壁での流束を無視して反復を続けても、圧力ゲージを調整するだけでは直せない。移動壁なら予測面速度と修正条件をその壁速度に合わせて作り直す必要がある（FCG6で扱う）。

## 6. JavaScript・GLSLの編集ラボ

<iframe src="simulation/wgl-lab.html?lesson=FCG4" title="FCG4 圧力射影のJS・GLSL編集、Poisson反復・発散・速度の独立CPU/GPU検算" loading="lazy" style="width:100%;height:1050px;border:1px solid #64748b;border-radius:7px;" allow="fullscreen"></iframe>

ラボは **1. 実験条件・課題 → 2. コード編集 → 3. 実行結果** の3タブで、JS・頂点GLSL・断片GLSLのソースをその場で編集・再実行できる。初期設定は $N=8$、緩和係数 $2/3$、Poisson反復0〜160回（デフォルト128回）。物理速度場を作るCPU処理と、結果を3枚のR8テクスチャで描くGPU処理を明示的に分離する。**左：圧力**（0.5+0.35pをR8に変換）、**中央：射影後の発散の絶対値**（|div|/20）、**右：セル中心速度の大きさ**（speed/0.25）。色は可視化の符号化であり、パネル名・数値を併記する。

**操作**：1反復・再生・一時停止・0へ復帰、ソース編集、GLSL構文エラー、停止・破棄。初期基準と変更後の計算は区別する。Poisson最大残差、射影前後の発散、両者の恒等式の差、壁法線速度、製造解 $\phi$ との差、GPU R8画素を別々に表示する。編集コードで基準と異なる色になっただけでは誤答としない。GPUが使えない端末でも独立CPU数値を示すが、WebGL検証に合格したとは表示しない。

**プログラミング課題**：JSの緩和係数を $2/3$ から $1$ へ変更し、収束の違いを数値で確かめる。圧力勾配の符号を反転させると[残差恒等式](#prop-fcg4-residual-identity)が破れることを確かめて戻す。断片GLSLの中央パネルで `float q=texelFetch(u_div,cell,0).r;` を `float q=min(1.0,2.0*texelFetch(u_div,cell,0).r);` に変更し、CPU残差はそのままで表示だけが変わることを確認する。倍率20はJSでR8テクスチャを作る段階の除数であり、GLSL中の数値ではない。

## 7. 演習と詳細解答

### Level A

<a id="ex-fcg4-a1"></a>
**A1. 配列の位置。** $N=8$ で圧力・水平速度・鉛直速度の標本数を求め、$u_{3,4}$ と $v_{3,4}$ の位置を記せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 第1節のMAC格子では、圧力はセルごとに1標本、$u$ は各鉛直面に1標本、$v$ は各水平面に1標本なので

$
N_p=N^2=64,\qquad N_u=(N+1)N=72,\qquad N_v=N(N+1)=72.
$

格子幅 $h=1/8$ [m] を第1節の面座標へ代入すると

$
u_{3,4}:\ (3/8,4.5/8),\qquad
v_{3,4}:\ (3.5/8,4/8)\quad[\mathrm{m}].
$

$u$ と $v$ の添字を同じ中心点と解釈してはいけない。
<!-- solution-end -->

<a id="ex-fcg4-a2"></a>
**A2. 発散を計算。** $h=1/4$、あるセルの左右面 $u_L=1,u_R=3$、下面 $v_B=-2$、上面 $v_T=-1$ [m/s] の離散発散を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [MAC発散](#def-fcg4-mac-divergence)へ代入して

$$
D_h\boldsymbol u=(3-1+(-1)-(-2))/(1/4)=(2+1)\cdot4=12\quad[\mathrm{s}^{-1}].
$$

上面の速度が負でも、下面との差 $-1-(-2)=1$ は正の流出寄与になる。
<!-- solution-end -->

<a id="ex-fcg4-a3"></a>
**A3. 圧力勾配とゲージ。** $h=1/2$、隣接2セルの圧力が $p_L=4,p_R=1$ [Pa] のとき内側面勾配を求め、全圧力へ10 [Pa]を加えた場合と比較せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [離散圧力勾配](#def-fcg4-gradient-projection)は $(1-4)/(1/2)=-6$ [Pa/m]。加算後の差は $(11-14)/(1/2)=-6$ [Pa/m]。定数は差分で消えるので速度射影は変わらない。
<!-- solution-end -->

<a id="ex-fcg4-a4"></a>
**A4. 残差を発散へ換算。** $\Delta t=0.1$ [s]、$\rho=1$ [kg/m³]、$E_{\mathrm P}=0.02$ [Pa/m²] のとき $E_{\mathrm D}$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [残差恒等式](#prop-fcg4-residual-identity)から $E_{\mathrm D}=(\Delta t/\rho)E_{\mathrm P}=0.1\times0.02=0.002$ [s⁻¹]。圧力残差と速度発散は同じ単位で比較してはいけない。
<!-- solution-end -->

### Level B

<a id="ex-fcg4-b1"></a>
**B1. 角セルのNeumann演算子。** $h=1/2$、$p_{00}=1,p_{10}=p_{01}=-1$ [Pa] の角セルについて $(L_hp)_{00}$ を計算せよ。$\rho/\Delta t=1$ のとき対応する発散を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 角セルには領域内の隣が二つしかない。[Neumann演算子](#def-fcg4-neumann-gauge)から

$$
(L_hp)_{00}=\frac{(-1)+(-1)-2(1)}{(1/2)^2}=\frac{-4}{1/4}=-16.
$$

Poisson右辺 $b=(\rho/\Delta t)D_h\boldsymbol u^\ast$ の係数の数値が1なら $(D_h\boldsymbol u^\ast)_{00}=-16$ [s⁻¹]。外側の仮想圧力を勝手に0とすると対角係数が増え、この結果にならない。
<!-- solution-end -->

<a id="ex-fcg4-b2"></a>
**B2. 壁流束の可解性。** $N=3,h=1/3$。左・上下壁は零で、右壁の全3面が $u_{N,j}=1$ [m/s] の場合、$h^2\sum_{ij}D_hu$ を求め、同次Neumannの圧力方程式をそのまま解けるか判定せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [発散総和の証明](#prop-fcg4-flux-sum)を壁の値を残して実行すると

$$
h^2\sum D_hu
=h\sum_{j=0}^{2}(u_{N,j}-u_{0,j})+h\sum_{i=0}^{2}(v_{i,N}-v_{i,0})
=\frac13\cdot3=1\quad[\mathrm{m}^2/\mathrm{s}].
$$

したがって $\sum D_hu=1/h^2=9$ [s⁻¹]。$L_h$ はどの圧力でも全セル和が零であるが $b$ の総和は $(\rho/\Delta t)9\ne0$、よって同次Neumann問題には解がない。壁を零に戻すか、物理的に整合する境界条件・外部流入出を設定する必要がある。
<!-- solution-end -->

<a id="ex-fcg4-b3"></a>
**B3. 緩和Jacobiの最初の1手。** $N=2,h=1/2$ の角セルで右辺 $b_{00}=-16$ [Pa/m²]、旧圧力は全セル零、$\omega=2/3$。平均除去前の新圧力を求めよ。総和零の右辺で四隅が $(-16,16,16,-16)$ の場合は平均除去後の値も答えよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 第4節の式に $m=2$、旧圧力も隣も零を代入して、

$$
\widetilde p_{00}
=\frac{2/3}{2}\left(0-\frac14(-16)\right)
=\frac13\cdot4=\frac43\quad[\mathrm{Pa}].
$$

他の三隅はそれぞれ $-4/3,-4/3,4/3$ なので新圧力の総和は零、引く平均も零。単純Jacobi $\omega=1$ ではこの盤面の高周波モードが符号を交互に変え収束しないことがあり、緩和係数は飾りではない。
<!-- solution-end -->

### Level C

<a id="ex-fcg4-c1"></a>
**C1. 2D射影の実装と描画。**

1. $N=8$ のセル圧力とMAC面速度の配列配置、壁の代入、$b$ の計算順序を記述せよ。
2. 反復でPoisson残差と射影後発散を測る関数を擬似コードで示せ。
3. 製造解の圧力と射影速度を検算せよ。
4. 断片GLSLで中央パネルの読み出し値 $q$ を $\min(1,2q)$ に変更したとき、CPU数値とGPU画素の変化を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (a) セル圧力 $p_{ij}$ と右辺 $b_{ij}$ は $i,j=0,\dots,N-1$、水平面速度は $i=0,\dots,N,\ j=0,\dots,N-1$、鉛直面速度は $i=0,\dots,N-1,\ j=0,\dots,N$ に置く。一次元配列へは次のように並べる。

$
k_p=k_b=i+Nj,\qquad
k_u=i+(N+1)j,\qquad
k_v=i+Nj.
$

最後の式は $v$ の添字域で用い、圧力配列と同じ長さを意味しない。まず壁面で $u_{0,j}=u_{N,j}=v_{i,0}=v_{i,N}=0$ とし、内部の予測面速度を設定する。[MAC発散](#def-fcg4-mac-divergence)を用いて、各セルの右辺を

$
b_{ij}=\frac{\rho}{\Delta t}\,
\frac{u^\ast_{i+1,j}-u^\ast_{i,j}+v^\ast_{i,j+1}-v^\ast_{i,j}}h
$

と計算してから圧力反復を始める。

(b) 反復ごとに旧配列から $\widetilde p$ を計算して平均を引き、新配列と交換する。$m$ は内側の隣接数で、角2・辺3・内側4。各セルで残差と射影後発散を計算する擬似コードは次のとおり。

    r = (sumInsideNeighbours(p) - m*p[i,j])/(h*h) - b[i,j]
    EPoisson = max(EPoisson, abs(r))
    projectedU = predictedU - dt/rho*gradX(p) // interior face only
    projectedV = predictedV - dt/rho*gradY(p) // interior face only
    EDiv = max(EDiv, abs(div(projectedU,projectedV)))

同じ $D_h,G_h$ を使うと[残差恒等式](#prop-fcg4-residual-identity)から $E_{\mathrm D}=(\Delta t/\rho)E_{\mathrm P}$。一致しなければ境界、単位、添字、符号または実装を検査する。

(c) 第5節の $\boldsymbol u^\ast=\boldsymbol u^s+(\Delta t/\rho)G_h\phi$ を $D_h$ に代入すると $b=L_h\phi$。$\phi$ は平均零なので[製造解の命題](#prop-fcg4-hodge-test)により厳密な圧力は $\phi$、速度は $\boldsymbol u^s$。有限回反復なら $p^{(k)}$ は $\phi$ へ近づくが一致を先取りしてはいけない。

(d) JSは中央テクスチャへ、次の量をR8として書き込む。

$
q_{\mathrm{tex}}=\frac{\operatorname{round}(255\min(1,|\mathrm{div}|/20))}{255}.
$

断片GLSLの \`float q=texelFetch(u_div,cell,0).r;\` を \`float q=min(1.0,2.0*texelFetch(u_div,cell,0).r);\` に変更すると、中央パネルの赤成分は量子化済みの $q_{\mathrm{tex}}$ の2倍（上限1）となる。**JSの除数を10に変更する操作とは量子化順序が違う**ので、一般には完全には一致しない。圧力反復、$\boldsymbol u^{\mathrm{new}}$、$b$、$E_{\mathrm P}$、$E_{\mathrm D}$、壁流束はJSが計算するため不変。赤成分は最終フレームバッファでも量子化され得る。表示差とCPU物理残差の不変性を別々に確認し、シェーダ編集後は初期画素基準を正誤判定に流用しない。
<!-- solution-end -->

## 8. 次の講義

FCG4では**所与の予測速度から発散を除く一段**を構築した。FCG5はこの処理を[FCG3の染料移流](../FCG3/index.md#def-fcg3-advection-step)や外力・粘性更新と組み合わせ、一つの2D流体ソルバーへ接続する。
