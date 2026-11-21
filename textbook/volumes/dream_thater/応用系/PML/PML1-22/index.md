# PML1-22 物理制約付きモデルは本当に優れるか

## 1. データへの適合と物理法則への適合は別の問い

[PML1-21 の有限データ同定](../PML1-21/index.md#def-pml1-21-design)では、観測点に合う運動方程式が、観測していない状態で正しいとは限らなかった。他方、[Hamiltonian neural network（HNN）](../PML1-18/index.md#def-pml1-18-hnn)では、運動方程式を正準形に限定すると、学習済み Hamiltonian が連続時間に沿って保存される。[正則な Lagrangian neural network（LNN）](../PML1-19/index.md#def-pml1-19-lnn)は、正則な Lagrangian から加速度を作る。

では、構造を制限した方が予測は必ず正確になるだろうか。構造は学習時の候補を減らすので、**観測に紛れた物理的に不自然な成分を除ける**一方、**実際にある散逸も除いてしまう**可能性がある。本講はこの両方を、正確な計算と再実行できる比較実験で確かめる。

実験全体で状態を $z=(q,p)^{\mathsf T}\in\mathbb R^2$ とし、質量を $1$、時間を無次元とする。LNN では速度 $v$ を用いるが、質量を $1$ に固定して **$p=v$ と同一視する場合に限り**、他のモデルと同じ状態に比較できる。真の基準系は調和振動子

$$
\dot z=Jz,\qquad
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix},\qquad
H_0(z)=\frac{q^2+p^2}{2}
$$

である。$J^{\mathsf T}=-J$、$J^{\mathsf T}J=I_2$、$J^2=-I_2$ は実際に行列積で確かめられる。時刻 $t$ の真の軌道は

$$
z_\ast(t)=
\begin{pmatrix}\cos t&\sin t\\-\sin t&\cos t\end{pmatrix}z_0.
$$

初期値を $z_0=(1,0)^{\mathsf T}$ とすれば $H_0(z_\ast(t))=1/2$ である。この正解を**訓練に使わず**、予測の検証に用いる。

## 2. 三つのモデルが何を学ぶか

### 2.1 通常NNは速度の二成分を直接出す

最も小さい比較対象として、入力 $z$、出力 $\widehat f(z)$ を持ち、活性化関数が恒等写像でバイアスのない**一層の線形ニューラルネットワーク（線形NN）**を用いる。学習する重みは $W\in\mathbb R^{2\times2}$ の4成分である。一般の非線形NNを検証したと誤解しないため、以後も「線形NN」と明記する。

### 2.2 HNNはスカラー関数から速度を作る

[正準 HNN の定義](../PML1-18/index.md#def-pml1-18-hnn)に従い、今回は対称行列 $S$ で表した二次 Hamiltonian だけを学ぶ。$S$ が対称である理由は、二次形式の非対称部分が $z^{\mathsf T}Sz$ に寄与しないためである。

$$
S=\begin{pmatrix}a&b\\b&c\end{pmatrix},\quad
H_S(z)=\frac12z^{\mathsf T}Sz,\quad
\nabla H_S=Sz.
$$

従って $J\nabla H_S=JSz$ であり、行列を掛けると

$$
JS=\begin{pmatrix}b&c\\-a&-b\end{pmatrix}.
$$

この行列の跡は $b-b=0$。よって HNN はどんな $a,b,c$ でも、全方向を同じ割合で収縮・膨張させる速度場を表せない。これは近似の失敗ではなく、**仮説クラスがあらかじめ持つ制限**である。

### 2.3 LNNは Euler–Lagrange 方程式を満たす加速度を作る

[正則 LNN の加速度定理](../PML1-19/index.md#thm-pml1-19-acceleration)を使うため、質量 $1$、ばね係数 $k\in\mathbb R$ の模型を選ぶ。

$$
L_k(q,v)=\frac{v^2}{2}-\frac{kq^2}{2},\qquad
\frac{\partial^2L_k}{\partial v^2}=1.
$$

速度 Hessian は $1$ なので可逆であり、この模型では $k$ の符号によらず加速度を一意に求められる（安定な振動子を望む場合は $k>0$ とする）。[Euler–Lagrange 方程式](../../../物理系/AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)の左辺を計算すると、

$$
\frac d{dt}\frac{\partial L_k}{\partial v}
-\frac{\partial L_k}{\partial q}
=\frac d{dt}(v)+kq
=\ddot q+kq.
$$

$p=v$ によって $z=(q,p)^{\mathsf T}$ に移すと $\dot q=p$、$\dot p=-kq$ である。

<a id="def-pml1-22-model-classes"></a>

<!-- formal-statement-start -->
> **定義（三つの比較モデル）**  
> 状態 $z=(q,p)^{\mathsf T}\in\mathbb R^2$ に対し、線形NN、二次 HNN、質量 $1$ の二次 LNN の速度場を、それぞれ次で定める。

$$
\begin{aligned}
f_{\mathrm N,W}(z)&=Wz,
&&W\in\mathbb R^{2\times2},\\
f_{\mathrm H,S}(z)&=JSz,
&&S=S^{\mathsf T}\in\mathbb R^{2\times2},\\
f_{\mathrm L,k}(z)&=
\begin{pmatrix}0&1\\-k&0\end{pmatrix}z,
&&k\in\mathbb R.
\end{aligned}
$$

> パラメータの個数は順に $4,3,1$ である。$\mathrm L$ の式は $p=v$ の同一視に基づく。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-22-model-classes -->
**定義の確認。** $W=J$、$S=I_2$、$k=1$ とする。$S$ は対称、$L_1$ の速度 Hessian は $1\ne0$、線形NNの $W$ は実 $2\times2$ 行列である。三者すべてで

$$
f(z)=Jz=(p,-q)^{\mathsf T}
$$

となり、真の振動子が三つの候補に含まれることを確認できる。**同じ振動子が表せること**と**三つの候補全体の表現力が等しいこと**は異なる。
<!-- definition-example-end -->

## 3. 公平な比較とは何を固定することか

学習データの条件が異なれば、優劣をモデルの制約だけに帰せない。今回は四つの状態と、それぞれで観測した速度ベクトルを全モデルで共有する。

$$
z_1=e_1,\quad z_2=e_2,\quad
z_3=-e_1,\quad z_4=-e_2,\quad
e_1=\begin{pmatrix}1\\0\end{pmatrix},\qquad
e_2=\begin{pmatrix}0\\1\end{pmatrix}.
$$

観測速度を $y_i\in\mathbb R^2$ とする。各モデルのパラメータを最小二乗で学び、四点の標本平均二乗速度誤差を比較する。[PML1-21 の列フルランクによる一意性](../PML1-21/index.md#thm-pml1-21-full-rank)を使う前に、どの基底でデータ行列を作るかを確かめる。ここでは座標基底 $e_1,e_2$ をそのまま入力として用いるので、各観測を外積 $z_i z_i^{\mathsf T}$ へ変換でき、

$$
\sum_{i=1}^4z_iz_i^{\mathsf T}
=2e_1e_1^{\mathsf T}+2e_2e_2^{\mathsf T}
=2I_2
$$

となる。従って入力は二方向を識別でき、最小二乗による $W$ は一意である。

<a id="def-pml1-22-comparison-metrics"></a>

<!-- formal-statement-start -->
> **定義（共通損失と評価量）**  
> 全モデルに同じデータ $\mathcal D=\{(z_i,y_i)\}_{i=1}^4$ を与え、候補速度場 $f$ の訓練損失を

$$
R_{\mathrm{train}}(f)=
\frac14\sum_{i=1}^4\|f(z_i)-y_i\|_2^2
$$

> とする。独立に指定した真の速度場 $f_\ast$ と未使用の状態 $z_{\mathrm{test}}$ について、速度予測誤差は

$$
E_{\mathrm{test}}(f)=
\|f(z_{\mathrm{test}})-f_\ast(z_{\mathrm{test}})\|_2^2
$$

> とする。予測軌道 $\widehat z_n$ と真の連続軌道 $z_\ast(nh)$ について、同じ初期値・刻み $h>0$・更新回数 $N$ で、軌道誤差 $\|\widehat z_N-z_\ast(Nh)\|_2$ と基準エネルギーの相対誤差 $|H_0(\widehat z_N)/H_0(z_0)-1|$（$H_0(z_0)>0$）を別に報告する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-22-comparison-metrics -->
**定義の確認。** $f=Jz$、真の場も $f_\ast=Jz$、未使用点を $z_{\mathrm{test}}=(3/5,4/5)^{\mathsf T}$ とすれば、$f(z_{\mathrm{test}})=f_\ast(z_{\mathrm{test}})$ なので $E_{\mathrm{test}}=0$。一方、訓練速度にずれがあれば $R_{\mathrm{train}}>0$ はあり得る。軌道と保存量を比較するには、さらに積分方法と刻みを指定する必要がある。
<!-- definition-example-end -->

学習は各仮説クラス内の**大域的な最小二乗解**を解析式で求める。従って乱数初期化・最適化の不成功という別要因を比較から外せる。ただし、パラメータ数も演算量も同一ではない。一般の深いNN同士の「同じ学習予算」比較をしたことにはならない。

## 4. 訓練ラベルのずれを一つの行列で表す

$Jz$ に方向 $z$ の速度を付け足した

$$
W_\delta=J+\delta I_2
=\begin{pmatrix}\delta&1\\-1&\delta\end{pmatrix},
\qquad y_i=W_\delta z_i,\qquad\delta\in\mathbb R
$$

というデータを用いる。$\delta>0$ では半径方向へ外向き、$\delta<0$ では内向きの速度成分がある。$\delta$ を観測バイアスと見るか本物の散逸と見るかで、モデルの評価は反転する。

<a id="prop-pml1-22-exact-fit"></a>

<!-- formal-statement-start -->
> **命題（同一データでの三モデルの厳密な最小二乗解）**  
> 第3節の四状態と $y_i=(J+\delta I_2)z_i$ を用いる。第2節の各モデルをその訓練損失で最小化すると、すべての $\delta\in\mathbb R$ について、一意な最適パラメータと最小損失は

$$
\begin{array}{c|c|c}
\text{モデル}&\text{最小二乗解}&\min R_{\mathrm{train}}\\ \hline
\text{線形NN}&W=J+\delta I_2&0\\
\text{二次HNN}&S=I_2&\delta^2\\
\text{二次LNN}&k=1&\delta^2
\end{array}
$$

> である。後二者の最適な速度場はともに $Jz$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 四点は座標方向に均等に配置されるため、標本損失は行列の Frobenius ノルム（成分の二乗和）になる。線形NNでは観測行列そのものが解である。HNN では対称行列への射影が生じ、LNN では一成分の最小二乗になる。

<!-- proof-start -->
### 証明

任意の $2\times2$ 行列 $B$ について、$D=B-W_\delta$ とすると

$$
\begin{aligned}
R_{\mathrm{train}}(B)
&=\frac14\sum_{i=1}^4\|Dz_i\|_2^2\\
&=\frac14\left(2\|De_1\|_2^2+2\|De_2\|_2^2\right)\\
&=\frac12\sum_{r=1}^2\sum_{s=1}^2D_{rs}^2
=\frac12\|B-W_\delta\|_F^2.
\end{aligned}
$$

線形NNは全 $B=W\in\mathbb R^{2\times2}$ を許すので、唯一の最小値 $0$ を $W=W_\delta$ で取る。

HNN は $B=JS$、$S^{\mathsf T}=S$ とする。$J^{\mathsf T}J=I_2$、$J^{-1}=-J$ なので

$$
\|JS-W_\delta\|_F^2
=\|J^{\mathsf T}(JS-W_\delta)\|_F^2
=\|S+JW_\delta\|_F^2.
$$

$-JW_\delta=-J(J+\delta I_2)=I_2-\delta J$ だから、最小化する量は $\|S-(I_2-\delta J)\|_F^2$ である。$S-I_2$ は対称、$\delta J$ は反対称なので

$$
\begin{aligned}
\|S-I_2+\delta J\|_F^2
&=\|S-I_2\|_F^2+\delta^2\|J\|_F^2
  +2\delta\,\operatorname{tr}((S-I_2)^{\mathsf T}J)\\
&=\|S-I_2\|_F^2+2\delta^2.
\end{aligned}
$$

交差項がゼロなのは、対称行列 $A$ と反対称行列 $J$ について
$\operatorname{tr}(A^{\mathsf T}J)=\operatorname{tr}((A^{\mathsf T}J)^{\mathsf T})
=\operatorname{tr}(J^{\mathsf T}A)=-\operatorname{tr}(JA)
=-\operatorname{tr}(AJ)$ だからである。よって一意に $S=I_2$、最小損失は $\delta^2$。

LNN に許される行列は $B_k=\begin{pmatrix}0&1\\-k&0\end{pmatrix}$。従って

$$
B_k-W_\delta=
\begin{pmatrix}-\delta&0\\1-k&-\delta\end{pmatrix},\qquad
R_{\mathrm{train}}(B_k)
=\delta^2+\frac{(k-1)^2}{2}.
$$

係数 $(k-1)^2/2$ は非負で、ゼロは $k=1$ のときに限る。これで三者の解と損失が確定した。
<!-- proof-end -->

## 5. 構造制約の利点が逆転する二つの世界

未使用状態を $z_{\mathrm{test}}=(3/5,4/5)^{\mathsf T}$ とする。その長さは $1$、しかも訓練した四点のいずれでもない。

<a id="prop-pml1-22-generalization-reversal"></a>

<!-- formal-statement-start -->
> **命題（観測バイアスと実際の散逸で優劣が逆転する）**  
> $\gamma>0$ とする。第4節の最小二乗解について、次の二場合を分ける。
>
> **場合A（保存系に観測バイアス）**：真の速度は $f_\ast(z)=Jz$、訓練ラベルは $y_i=(J+\gamma I_2)z_i$ とする。
>
> **場合B（実際に散逸する系）**：真の速度も訓練ラベルも $f_\ast(z)=(J-\gamma I_2)z$ から正確に得る。
>
> 未使用点 $z_{\mathrm{test}}$ での速度予測誤差は次のとおり。

$$
\begin{array}{c|cc}
&\text{線形NN}&\text{二次HNN・二次LNN}\\\hline
\text{場合A}&\gamma^2&0\\
\text{場合B}&0&\gamma^2
\end{array}
$$
<!-- formal-statement-end -->

**証明の見取り図。** 最適モデルは、場合Aで $J+\gamma I_2$ と $J$、場合Bで $J-\gamma I_2$ と $J$ になる。真の速度をそれぞれ引き、未使用点の長さ $1$ を代入する。

<!-- proof-start -->
### 証明

[三モデルの最適解](#prop-pml1-22-exact-fit)に場合Aでは $\delta=\gamma$、場合Bでは $\delta=-\gamma$ を代入する。場合Aで、線形NNと真の場の差は $\gamma z$、HNN・LNNの差は $0$。ゆえに

$$
E_{\mathrm{test}}(f_{\mathrm N})=\|\gamma z_{\mathrm{test}}\|_2^2
=\gamma^2(9/25+16/25)=\gamma^2,
\qquad
E_{\mathrm{test}}(f_{\mathrm H})=E_{\mathrm{test}}(f_{\mathrm L})=0.
$$

場合Bでは線形NNが真の $J-\gamma I_2$ に一致し、HNN・LNNが $Jz$ を出す。従って前者は誤差 $0$、後二者は $\|\gamma z_{\mathrm{test}}\|_2^2=\gamma^2$。同じ四点、同じ候補クラス、同じ最小化でも、**訓練ラベルのずれの原因**によって結論が反転する。
<!-- proof-end -->

場合Aのラベルは、独立で平均0の確率雑音ではなく、状態に依存する系統的なずれである。物理的先験知識が正しいときの構造的な補正を明瞭に見るための模型であり、一般の観測雑音への平均的な汎化保証ではない。場合Bでは同じ制約が本当の散逸を排除するため、モデルのずれ（表現バイアス）になる。[HNN の発散消失命題](../PML1-18/index.md#prop-pml1-18-divergence)もこの障害を別の角度から説明する。実際、$J-\gamma I_2$ の跡は $-2\gamma\ne0$ で、HNN の $JS$ の跡は常にゼロである。

## 6. 保存されるのはどのエネルギーで、どの時間発展か

[HNN の連続時間保存定理](../PML1-18/index.md#thm-pml1-18-energy)を、$S=I_2$（実対称、$H_S\in C^\infty$）の場合に適用すれば、学習済み HNN の連続軌道では $H_0$ が保存される。LNN の $k=1$ も、速度 Hessian が $1$ で正則な自律 Lagrangian なので、[LNN の連続時間エネルギー収支](../PML1-19/index.md#prop-pml1-19-energy)から $H_0$ が保存される。

一方、線形NN の最適解 $f_{\mathrm N}(z)=W_\delta z$ に沿う $H_0$ の変化は、[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を $H_0(z)=z^{\mathsf T}z/2$ に適用して、

$$
\begin{aligned}
\frac{d}{dt}H_0(z(t))
&=(\nabla H_0)^{\mathsf T}\dot z\\
&=z^{\mathsf T}(J+\delta I_2)z\\
&=z^{\mathsf T}Jz+\delta z^{\mathsf T}z
=2\delta H_0(z).
\end{aligned}
$$

最後の等式では $z^{\mathsf T}Jz=-(z^{\mathsf T}Jz)^{\mathsf T}$ よりゼロとした。初期エネルギーが正なら $H_0(t)=e^{2\delta t}H_0(0)$。しかし場合Bの真の系も散逸するため、この増減だけを理由にNNを不適切とは言えない。また一般の HNN が保存するのは**学習した $H_S$**であり、真の $H_0$ と同一とは限らない。[真のエネルギーのモデル軌道沿いの変化](../PML1-18/index.md#prop-pml1-18-mismatch)が示すように、二つは区別する。

### 6.1 同じ陽的 Euler 法で更新すると

数値計算では[一段数値更新写像](../PML1-20/index.md#def-pml1-20-one-step)を定めなければならない。比較の最初は三モデルとも、刻み $h>0$ の陽的 Euler 法だけを使い、$z_0$ と更新回数 $N$ を共有する。

<a id="prop-pml1-22-euler-energy"></a>

<!-- formal-statement-start -->
> **命題（同一積分器でも保存則は離散化で壊れる）**  
> $h>0$、$\delta\in\mathbb R$、$z_0\ne0$ とする。連続系 $\dot z=(J+\delta I_2)z$ に陽的 Euler 法を $N$ 回適用すると、各 $n=0,\ldots,N$ で

$$
\frac{H_0(z_n)}{H_0(z_0)}
=\left((1+h\delta)^2+h^2\right)^n.
$$

> 特に、真の Hamiltonian モデル $Jz$（$\delta=0$）であっても、各一段でエネルギーは $1+h^2>1$ 倍になる。
<!-- formal-statement-end -->

**証明の見取り図。** Euler の更新行列とその転置の積を計算すると、単位行列の定数倍になる。これを $n$ 回反復する。

<!-- proof-start -->
### 証明

$A_h=I_2+h(J+\delta I_2)=(1+h\delta)I_2+hJ$ と置く。$J^{\mathsf T}=-J$、$J^2=-I_2$ より

$$
\begin{aligned}
A_h^{\mathsf T}A_h
&=((1+h\delta)I_2-hJ)((1+h\delta)I_2+hJ)\\
&=(1+h\delta)^2I_2-h^2J^2\\
&=\left((1+h\delta)^2+h^2\right)I_2.
\end{aligned}
$$

$z_{n+1}=A_hz_n$、$H_0(z)=\|z\|_2^2/2$ だから

$$
H_0(z_{n+1})=\frac12z_n^{\mathsf T}A_h^{\mathsf T}A_hz_n
=\left((1+h\delta)^2+h^2\right)H_0(z_n).
$$

同じ等式を $n$ 回掛けると結論を得る。$\delta=0$ なら倍率は $1+h^2$。
<!-- proof-end -->

従って「HNNなら数値的にもエネルギー誤差ゼロ」という結論は誤りである。[調和振動子に対する陽的 Euler のドリフト](../PML1-20/index.md#prop-pml1-20-explicit-drift)と同じ現象を確認した。積分器を symplectic Euler に変えると別の保存性が現れるが、三モデルの比較でHNNだけ積分器を変更すれば、モデル構造と数値手法の効果が交絡する。

## 7. 純Pythonで三モデルを学習・予測・検算する

次のコードは外部パッケージなしで実行できる。いずれも同じ四つの $(q,p)$、同じ速度ラベル、同じ初期値 $(1,0)$、同じ $h=0.1$、$N=100$ に統一する。学習は最小二乗の厳密解であり、深いネットワークを勾配法で訓練する実験ではない。線形NNは列方向の最小二乗、HNNは対称行列への射影、LNNは $k$ の一変数最小二乗を実装する。

~~~python
import math

states = [(1., 0.), (0., 1.), (-1., 0.), (0., -1.)]
test = (0.6, 0.8)
h, steps = 0.1, 100
z0 = (1., 0.)

def observations(delta):
    return [(p + delta*q, -q + delta*p) for q, p in states]

def fit_all(delta):
    ys = observations(delta)
    # sum_i z_i z_i^T = 2I: each NN row is a 2-variable least-squares fit.
    w = [[0.5 * sum(y[r]*z[s] for y, z in zip(ys, states))
          for s in range(2)] for r in range(2)]
    # -J W = [[-W10, -W11], [W00, W01]], projected onto symmetric S.
    raw = [[-w[1][0], -w[1][1]], [w[0][0], w[0][1]]]
    s = [[raw[0][0], (raw[0][1]+raw[1][0])/2],
         [(raw[0][1]+raw[1][0])/2, raw[1][1]]]
    b_h = [[s[1][0], s[1][1]], [-s[0][0], -s[0][1]]]
    # L = v^2/2 - k q^2/2, so least squares for p_dot = -k q.
    k = -sum(z[0]*y[1] for z, y in zip(states, ys)) / sum(z[0]**2 for z in states)
    b_l = [[0., 1.], [-k, 0.]]
    return {"linear NN": w, "HNN": b_h, "LNN": b_l}, (s, k)

def apply(b, z):
    return (b[0][0]*z[0] + b[0][1]*z[1],
            b[1][0]*z[0] + b[1][1]*z[1])

def loss(b, delta):
    return sum(sum((u-v)**2 for u, v in zip(apply(b, z), y))
               for z, y in zip(states, observations(delta))) / 4

def test_error(b, true_delta):
    actual = (test[1]+true_delta*test[0], -test[0]+true_delta*test[1])
    return sum((u-v)**2 for u, v in zip(apply(b, test), actual))

def integrate(b):
    z = z0
    for _ in range(steps):
        dz = apply(b, z)
        z = (z[0] + h*dz[0], z[1] + h*dz[1])
    return z

for world, observed_delta, true_delta in [
    ("A: biased labels, conservative truth", 0.1, 0.0),
    ("B: exact labels, dissipative truth", -0.1, -0.1),
]:
    models, (s, k) = fit_all(observed_delta)
    t = h*steps
    exact = (math.exp(true_delta*t)*math.cos(t),
             -math.exp(true_delta*t)*math.sin(t))
    print(world, "S =", s, "k =", k)
    for name, b in models.items():
        zn = integrate(b)
        trajectory_error = math.dist(zn, exact)
        energy_ratio = (zn[0]**2+zn[1]**2)/(z0[0]**2+z0[1]**2)
        print(name, "train", round(loss(b, observed_delta), 8),
              "test", round(test_error(b, true_delta), 8),
              "trajectory", round(trajectory_error, 6),
              "H0 ratio", round(energy_ratio, 6))
        if name == "linear NN":
            expected = 0.0
        else:
            expected = observed_delta**2
        assert abs(loss(b, observed_delta)-expected) < 1e-12
    assert abs(models["HNN"][0][0]) < 1e-12
    assert abs(models["HNN"][0][1]-1) < 1e-12
    assert abs(k-1) < 1e-12
~~~

実行結果は、場合Aで訓練損失が線形NNのみ $0$、HNN/LNNは $0.01$ となる一方、未使用点での真の速度誤差は線形NNのみ $0.01$ になる。場合Bでは線形NNの未使用点誤差が $0$、HNN/LNNが $0.01$ になる。場合Aの HNN/LNN は同じ $J$ を学ぶため、三モデルが同一でないとはいえ予測軌道は両者で一致する。

$h=0.1,N=100$ の場合、HNN/LNN の $H_0$ 倍率は $(1+0.1^2)^{100}=(1.01)^{100}\approx2.7048$ であり、**正しい速度場を学んでも積分器だけで保存量が増える**。一方、場合Aの線形NNでは倍率が $\{(1+0.01)^2+0.01\}^{100}=(1.0301)^{100}$ となる。学習誤差・連続模型の保存性・離散計算の保存性をそれぞれ別の列で見る。

## 8. 比較から読めることと、次に必要な実験

- **物理的制約が正しいとき**：場合Aのように観測ラベルが不適切な径方向成分を含んでいれば、候補を絞ることで未使用点の真の速度に近づける。これは本例について計算で示された利点である。
- **物理的制約が誤っているとき**：場合Bで失うのは散逸の自由度であり、訓練損失の増大と未使用点での系統的な誤差が生じる。
- **構造と解法を分ける**：全モデルに同じ積分器を用い、変えた場合は別実験として記録する。保存量が正しくても位相や軌道の誤差は残り得る。
- **性能の一般化には追加条件がいる**：モデル容量（4・3・1パラメータ）、データ数、初期化、最適化時間、異なる真の系、未見初期値、長時間予測、計算費用を変えた検証が必要である。今回の線形模型は、通常の非線形NNや任意のHNN/LNNの優劣を結論する実験ではない。

科学計算の比較では「訓練誤差が低い」「物理量を保つ」「実際の系に近い」「計算が速い」のどれを目標にするかを先に決める。次の PML2-01 からは、この区別を PDE の解、残差、境界条件、真の解誤差へ拡張する。

## 9. 演習 Level A

<a id="ex-pml1-22-a01"></a>

### PML1-22-A01 HNNの行列と保存量
- Level: A

$S=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ とする。$H_S(z)$、$JS$、その跡を求め、$S$ が対称であることと、連続系 $\dot z=JSz$ で $H_S$ が保存されることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$S^{\mathsf T}=S$ なので二次 HNN の許容パラメータであり、

$$
H_S(q,p)=\frac12(2q^2+2qp+3p^2)
=q^2+qp+\frac32p^2.
$$

$J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ を左から掛け、

$$
JS=\begin{pmatrix}1&3\\-2&-1\end{pmatrix},
\qquad\operatorname{tr}(JS)=1-1=0.
$$

$\nabla H_S=(2q+p,q+3p)^{\mathsf T}$ であり、$\dot q=q+3p,\ \dot p=-2q-p$。従って

$$
\begin{aligned}
\frac{dH_S}{dt}
&=(2q+p)(q+3p)+(q+3p)(-2q-p)\\
&=(2q+p)(q+3p)-(q+3p)(2q+p)=0.
\end{aligned}
$$

$H_S$ が $C^\infty$ 級で、$J$ が反対称であることも[HNNの保存定理](../PML1-18/index.md#thm-pml1-18-energy)の仮定を満たす。
<!-- solution-end -->

<a id="ex-pml1-22-a02"></a>

### PML1-22-A02 LNNの質量を確かめる
- Level: A

$L(q,v)=v^2/2-2q^2/2$ を考える。速度 Hessian を求め、Euler–Lagrange 方程式から加速度を計算し、$p=v$ での速度行列を書け。

<!-- solution-start -->
#### 詳細解答

$\partial_vL=v$、$\partial_v^2L=1$ で、速度 Hessian は可逆である。$\partial_qL=-2q$ なので

$$
0=\frac d{dt}(\partial_vL)-\partial_qL
=\frac d{dt}v+2q=\ddot q+2q.
$$

従って $\ddot q=-2q$。質量 $1$ のため $p=v$ であり $\dot q=p$、$\dot p=-2q$ だから、

$$
\dot z=
\begin{pmatrix}0&1\\-2&0\end{pmatrix}z.
$$

質量の同一視を忘れると、他のモデルと異なる状態変数を比較してしまう。
<!-- solution-end -->

<a id="ex-pml1-22-a03"></a>

### PML1-22-A03 訓練損失を四点から計算する
- Level: A

観測を $y_i=(J+\frac15I_2)z_i$ とし、$z_i=\pm e_1,\pm e_2$ を一回ずつ使う。候補 $f_1(z)=Jz$ と $f_2(z)=(J+\frac15I_2)z$ の訓練損失を求めよ。

<!-- solution-start -->
#### 詳細解答

$f_1(z_i)-y_i=-z_i/5$ であり、各 $z_i$ は単位ベクトルなので、各二乗誤差は $1/25$。従って

$$
R_{\mathrm{train}}(f_1)
=\frac14\left(4\cdot\frac1{25}\right)=\frac1{25}.
$$

$f_2(z_i)-y_i=0$ が四点すべてで成立するので $R_{\mathrm{train}}(f_2)=0$。この結果は、真の速度が $f_1$ と $f_2$ のどちらかをまだ決めない。
<!-- solution-end -->

<a id="ex-pml1-22-a04"></a>

### PML1-22-A04 未使用点で評価を反転させる
- Level: A

$z_{\mathrm{test}}=(3/5,4/5)^{\mathsf T}$ とする。モデル $Jz$ と $(J+\gamma I_2)z$ を、真の場がそれぞれ $Jz$、$(J+\gamma I_2)z$ の二通りで評価し、各二乗誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

$\|z_{\mathrm{test}}\|_2^2=(3/5)^2+(4/5)^2=1$。両候補の出力差は $\gamma z_{\mathrm{test}}$ なので、

$$
\|\gamma z_{\mathrm{test}}\|_2^2=\gamma^2.
$$

真の場が $Jz$ なら、$Jz$ の誤差は $0$、$J+\gamma I_2$ の誤差は $\gamma^2$。真の場が $J+\gamma I_2$ なら、前者は $\gamma^2$、後者は $0$ となる。候補間の距離だけで「真値に近い方」は決まらない。
<!-- solution-end -->

<a id="ex-pml1-22-a05"></a>

### PML1-22-A05 正しい連続モデルをEuler法で進める
- Level: A

$\dot z=Jz$、$z_0=(1,0)^{\mathsf T}$、$h=1/5$ とする。陽的 Euler 法を二歩実行し、$H_0(z_2)/H_0(z_0)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$J(1,0)^{\mathsf T}=(0,-1)^{\mathsf T}$ だから

$$
z_1=z_0+\frac15Jz_0=(1,-1/5)^{\mathsf T}.
$$

次に $Jz_1=(-1/5,-1)^{\mathsf T}$ を代入し、

$$
z_2=z_1+\frac15Jz_1
=(1-1/25,-1/5-1/5)^{\mathsf T}
=(24/25,-2/5)^{\mathsf T}.
$$

$H_0(z_0)=1/2$、$H_0(z_2)=\frac12[(24/25)^2+(2/5)^2]$ なので

$$
\frac{H_0(z_2)}{H_0(z_0)}
=\frac{576}{625}+\frac4{25}
=\frac{676}{625}
=\left(1+\frac1{25}\right)^2.
$$

[離散エネルギー倍率](#prop-pml1-22-euler-energy)の $h=1/5,n=2$ と一致する。連続系ならこの比は $1$ である。
<!-- solution-end -->

## 10. 演習 Level B

<a id="ex-pml1-22-b01"></a>

### PML1-22-B01 対称射影を任意の観測行列で導く
- Level: B

四状態を $\pm e_1,\pm e_2$ とし、観測行列が任意の実 $2\times2$ 行列 $A$ で $y_i=Az_i$ とする。二次 HNN の最小二乗で対称行列 $S$ の一意な解を求めよ。また $A=\begin{pmatrix}2&3\\-1&4\end{pmatrix}$ で計算せよ。

<!-- solution-start -->
#### 詳細解答

第4節と同じ四点の計算で、損失は $\frac12\|JS-A\|_F^2$。$J^{\mathsf T}=-J$、$J^{\mathsf T}J=I_2$ を使えば

$$
\|JS-A\|_F^2=\|S-(-JA)\|_F^2.
$$

$M=-JA$ を対称部分 $M_{\mathrm s}=(M+M^{\mathsf T})/2$ と反対称部分 $M_{\mathrm a}=(M-M^{\mathsf T})/2$ に分ける。対称な $S$ に対して Frobenius 内積 $\langle S-M_{\mathrm s},M_{\mathrm a}\rangle_F=0$ であるため、

$$
\|S-M\|_F^2
=\|S-M_{\mathrm s}\|_F^2+\|M_{\mathrm a}\|_F^2.
$$

第一項がゼロのときだけ最小なので $S=M_{\mathrm s}$ が一意解である。指定した $A$ では

$$
-JA=
\begin{pmatrix}1&-4\\2&3\end{pmatrix},
\qquad
S=\frac12
\left(
\begin{pmatrix}1&-4\\2&3\end{pmatrix}
+
\begin{pmatrix}1&2\\-4&3\end{pmatrix}
\right)
=\begin{pmatrix}1&-1\\-1&3\end{pmatrix}.
$$

実際 $S=S^{\mathsf T}$ であり、$JS=\begin{pmatrix}-1&3\\-1&1\end{pmatrix}$ は跡ゼロを満たす。$A$ の跡は $6$ なので、二次 HNN が $A$ に完全一致できないこととも整合する。
<!-- solution-end -->

<a id="ex-pml1-22-b02"></a>

### PML1-22-B02 学習したエネルギーと真のエネルギーを区別する
- Level: B

$H_S(q,p)=q^2+p^2/2$ を学習した HNN が $\dot z=J\nabla H_S$ に従うとする。$H_S$ と $H_0=(q^2+p^2)/2$ の時間微分をそれぞれ求め、初期値 $(q,p)=(1,1)$ では $H_0$ が保存されないことを示せ。

<!-- solution-start -->
#### 詳細解答

$H_S=\frac12z^{\mathsf T}\operatorname{diag}(2,1)z$ で $S$ は対称である。偏微分は $\partial_qH_S=2q,\ \partial_pH_S=p$、正準方程式は

$$
\dot q=p,\qquad\dot p=-2q.
$$

連鎖律で

$$
\frac{dH_S}{dt}
=(2q)\dot q+p\dot p
=2qp-2pq=0.
$$

一方、真の基準エネルギー $H_0$ では

$$
\frac{dH_0}{dt}
=q\dot q+p\dot p=qp-2pq=-qp.
$$

初期値 $(1,1)$ で $dH_0/dt=-1\ne0$。従って HNN 自身の $H_S$ が保存されても、基準 $H_0$ が保存されるとは限らない。[真のエネルギーとの不一致](../PML1-18/index.md#prop-pml1-18-mismatch)の具体例である。
<!-- solution-end -->

<a id="ex-pml1-22-b03"></a>

### PML1-22-B03 質量を変えると座標の比較が変わる
- Level: B

$L(q,v)=mv^2/2-kq^2/2$、$m>0$ とする。Euler–Lagrange 方程式を導き、共役運動量 $p=mv$ を用いた $(q,p)$ の一次方程式を書け。$m=2,k=2$ のとき、誤って $p=v$ と置いたモデルの $\dot q$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

$\partial_vL=mv$、$\partial_qL=-kq$ だから

$$
\frac d{dt}(mv)+kq=0
\quad\Longrightarrow\quad
m\ddot q=-kq,\qquad \ddot q=-\frac{k}{m}q.
$$

共役運動量は $p=\partial_vL=mv$ であり、$m>0$ なので $v=p/m$ と解ける。従って

$$
\dot q=\frac{p}{m},\qquad
\dot p=m\dot v=-kq,\qquad
\dot z=\begin{pmatrix}0&1/m\\-k&0\end{pmatrix}z.
$$

$m=k=2$ なら $\dot q=p/2$ だが、誤って $p=v$ と置くと $\dot q=p$ になって二倍の速度を予測する。二つのモデルが同じ座標に作用しているかを確認しなければ、誤差比較は解釈できない。
<!-- solution-end -->

<a id="ex-pml1-22-b04"></a>

### PML1-22-B04 散逸系でもEulerの誤差を分ける
- Level: B

真の場が $(J-I_2)z$、$h=1/4$ とする。陽的 Euler 一歩の $H_0$ 倍率と、正確な連続時間解を同じ時間 $h$ だけ進めたときの倍率を求めよ。二者は一致するか。

<!-- solution-start -->
#### 詳細解答

$\delta=-1$ と $h=1/4$ を[離散エネルギー倍率](#prop-pml1-22-euler-energy)に代入すると、

$$
(1+h\delta)^2+h^2
=\left(1-\frac14\right)^2+\frac1{16}
=\frac9{16}+\frac1{16}=\frac58.
$$

連続系では第6節の導出により $dH_0/dt=2\delta H_0=-2H_0$。この一次方程式を解けば $H_0(t)=H_0(0)e^{-2t}$ なので、$t=h=1/4$ の正確な倍率は $e^{-1/2}$ である。$\frac58\ne e^{-1/2}$。どちらもエネルギーは減少するが、その**減少率**は異なる。符号だけ一致しても時間積分が正確とは言えない。
<!-- solution-end -->

## 11. 演習 Level C

<a id="ex-pml1-22-c01"></a>

### PML1-22-C01 学習・構造・汎化・積分誤差の総合判定
- Level: C

状態 $z_1=e_1,z_2=e_2,z_3=-e_1,z_4=-e_2$ に対し、速度観測を $y_i=(J+\delta I_2)z_i$、$\delta=1/5$ とする。候補は本講の線形NN、二次HNN、質量 $1$ の二次LNNとする。次を示せ。

1. 四つの観測速度を明記し、三モデルの最小二乗パラメータと訓練損失を求めよ。
2. 真の場が $Jz$ で、観測ラベルに系統的なずれがある場合、未使用点 $z=(3/5,4/5)^{\mathsf T}$ での真の速度との二乗誤差を求めよ。
3. 逆に観測ラベルを $y_i=(J-\frac15I_2)z_i$ に変更し、真の場も $(J-\frac15I_2)z$ であるとする。学習結果と未使用点での順位はどう変わるか。
4. (1) の三モデルに $z_0=(1,0)^{\mathsf T}$、$h=1/10$、陽的 Euler 二歩を適用したときの $H_0$ 倍率を求めよ。正しい連続場を学んだモデルでも離散的に保存されない理由を述べよ。
5. (1)〜(4) を踏まえ、「訓練誤差が最低のモデルが最良」「物理制約付きモデルはいつも最良」の二主張に対して、それぞれ反例のどの部分が効くか説明せよ。

<!-- solution-start -->
#### 詳細解答

**(1) 四点の観測と最小化。** $J(q,p)^{\mathsf T}=(p,-q)^{\mathsf T}$ だから、$\delta=1/5$ を各点に代入すると

$$
\begin{aligned}
y_1&=(1/5,-1)^{\mathsf T},&
y_2&=(1,1/5)^{\mathsf T},\\
y_3&=(-1/5,1)^{\mathsf T},&
y_4&=(-1,-1/5)^{\mathsf T}.
\end{aligned}
$$

入力の外積の和は $2I_2$ なので、通常NNの最小二乗重みは観測行列そのもの：

$$
W=\begin{pmatrix}1/5&1\\-1&1/5\end{pmatrix}.
$$

HNNでは $-JW=I_2-\frac15J$ の対称部分が $I_2$ となるため $S=I_2$。LNNの $p$ 側の残差は $(-kq_i)-(-q_i+p_i/5)$ で、$q_i^2$ と $q_ip_i$ を合計すると $\sum q_i^2=2,\ \sum q_ip_i=0$。よって一変数最小二乗は $k=1$。訓練損失は

$$
R_{\mathrm{train}}(W)=0,\qquad
R_{\mathrm{train}}(JS)=R_{\mathrm{train}}(B_k)=1/25.
$$

**(2) 保存系の真値との比較。** 真の場は $Jz$ なので、通常NNとの差は $z/5$。未使用点の長さは $1$ であるから

$$
E_{\mathrm{test}}(W)=\frac1{25}\|z\|_2^2=\frac1{25},
\qquad
E_{\mathrm{test}}(JS)=E_{\mathrm{test}}(B_k)=0.
$$

訓練誤差がゼロのNNが、真の速度では劣る。

**(3) 実際の散逸との比較。** $\delta=-1/5$ になっても[三モデルの最小二乗解](#prop-pml1-22-exact-fit)の導出は変わらず、

$$
W=J-\frac15I_2,\quad S=I_2,\quad k=1.
$$

真の場は今回 $Wz$ であるから $E_{\mathrm{test}}(W)=0$、構造制約付きの両者は $E_{\mathrm{test}}=1/25$。物理的な散逸を候補から排除するという、(2) で有利に働いた制約が今回は欠点になる。

**(4) 離散積分。** (1) の通常NNは $\delta=1/5$、HNNとLNNは $\delta=0$ である。$h=1/10$、$n=2$ を[陽的Eulerの倍率命題](#prop-pml1-22-euler-energy)に代入すると、

$$
\begin{aligned}
\frac{H_0(z_2^{\mathrm N})}{H_0(z_0)}
&=\left[\left(1+\frac1{50}\right)^2+\frac1{100}\right]^2
=\left(\frac{2626}{2500}\right)^2
=(1.0504)^2,\\
\frac{H_0(z_2^{\mathrm H})}{H_0(z_0)}
&=\frac{H_0(z_2^{\mathrm L})}{H_0(z_0)}
=\left(1+\frac1{100}\right)^2
=(1.01)^2.
\end{aligned}
$$

HNNとLNNは真の $Jz$ を学んでいるが、Euler の更新行列 $I_2+hJ$ は直交行列ではなく、その転置との積が $(1+h^2)I_2$ となる。連続場の反対称性から従う保存性を、数値更新は継承しない。

**(5) 判定。** 「訓練誤差が最低なら最良」は (1) の $0$ と (2) の未使用点誤差 $1/25$ の逆転で否定される。「物理制約付きならいつも最良」は (3) の実散逸で否定される。(4) からは、仮に正しい構造を学習していても、別途数値積分法の誤差を検査する必要がある。したがって構造、訓練適合、真値への汎化、積分器を分けた評価が必要である。
<!-- solution-end -->

## 12. 次の講義へ

ここまで、物理法則を**モデルの形**に取り込むと、正しい法則である限り観測バイアスを除く助けになること、誤った法則を固定すると逆に真の運動から離れることを検証した。PML I の22講を通じて見てきた自由エネルギー・散逸・確率過程・対称性・保存量・同定を、以後は偏微分方程式の解法・残差・誤差に接続する。

PML2-01「何を『PDEを解く』と呼ぶか」 では、解の意味と初期・境界条件を明確にし、どの量を比較するかを定める。
