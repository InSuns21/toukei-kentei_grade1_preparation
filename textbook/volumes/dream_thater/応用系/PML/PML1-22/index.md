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
e_1=\begin{pmatrix}1\\0\end{pmatrix},\
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

