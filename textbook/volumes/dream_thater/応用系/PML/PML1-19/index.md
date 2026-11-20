# PML1-19 Lagrangian NNに可逆な質量行列が必要なのはなぜか

## 1. 位置・速度から加速度を作るまでの一手

前講の[正準 Hamiltonian neural network](../PML1-18/index.md#def-pml1-18-hnn)は、学習したスカラー関数の勾配に固定した反対称行列を掛け、位置と運動量の一階の時間発展を直接定めた。では、学習した Lagrangian $L_\theta(q,v)$ を使い、位置と速度の時間発展を作るには何が必要だろう。

[AMECH2 の Lagrange 方程式](../../../物理系/AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)では、運動は

$$
\frac{d}{dt}\frac{\partial L}{\partial v_i}
-\frac{\partial L}{\partial q_i}=0,
\qquad v=\dot q,\quad i=1,\ldots,d
$$

によって特徴付けられる。しかし、この式の左辺を時間微分すると、未知の加速度 $\ddot q$ が係数行列とともに現れる。**その行列を逆にできなければ、一般には現在の $(q,v)$ から一意の加速度を計算できない。** これが Lagrangian neural network（LNN）の中心課題である。

[AMECH5 の正則 Lagrangian](../../../物理系/AMECH/AMECH5/index.md#def-amech5-regular-lagrangian)は速度 Hessian の可逆性を用いて定義されている。この講義では、それが Legendre 変換だけでなく、加速度を算出する操作そのものに必要となる理由を確かめる。

以後、自由度 $d\ge1$、開集合 $U\subset\mathbb R^d\times\mathbb R^d$、位置 $q\in\mathbb R^d$ と速度 $v\in\mathbb R^d$ を用いる。添字は $1,\ldots,d$ を走る。$L_\theta:U\to\mathbb R$ の学習パラメータ $\theta$ は、予測軌道を計算する間は固定する。初めは $L_\theta$ を $C^3$ 級とし、必要な箇所では仮定を弱める。勾配 $\nabla_qL$ と $\nabla_vL$ は列ベクトルで、微分する際にはもう一方の変数を固定する。

## 2. Euler--Lagrange 方程式を加速度について解く

一見して分かりにくいのは、速度に関する偏微分 $\partial L/\partial v_i$ を、軌道に沿ってさらに時間微分する箇所である。位置も速度も時刻とともに動くので、[多変数の連鎖律](../../../基礎科目/RA/RA3/index.md#prop-ra3-chain-rule)を成分ごとに使う。

$$
\begin{aligned}
\frac{d}{dt}\frac{\partial L_\theta}{\partial v_i}(q(t),v(t))
&=\sum_{j=1}^d\frac{\partial^2L_\theta}{\partial q_j\partial v_i}\dot q_j
+\sum_{j=1}^d\frac{\partial^2L_\theta}{\partial v_j\partial v_i}\dot v_j\\
&=\sum_{j=1}^d\frac{\partial^2L_\theta}{\partial q_j\partial v_i}v_j
+\sum_{j=1}^d\frac{\partial^2L_\theta}{\partial v_j\partial v_i}a_j,
\qquad a=\dot v=\ddot q .
\end{aligned}
$$

この二つの係数を行列でまとめる。速度 Hessian $W_\theta$ と混合微分行列 $C_\theta$ を

$$
(W_\theta)_{ij}=\frac{\partial^2L_\theta}{\partial v_i\partial v_j},
\qquad
(C_\theta)_{ij}=\frac{\partial^2L_\theta}{\partial v_i\partial q_j}
$$

と置く。どちらも $d\times d$ 行列で、$W_\theta$ は $C^2$ 級の仮定から対称である。運動方程式は

$$
W_\theta(q,v)a+C_\theta(q,v)v-\nabla_qL_\theta(q,v)=0.
$$

従って、$W_\theta$ が可逆な状態であれば、加速度を列ベクトルとして

$$
a=F_\theta(q,v)
:=W_\theta(q,v)^{-1}
\left(\nabla_qL_\theta(q,v)-C_\theta(q,v)v\right)
$$

と定められる。未知の $a$ が一箇所に集まり、逆行列で取り出せた。

この構成を採用したネットワークを、ここでは **LNN** と呼ぶ。学習するのは実数値の $L_\theta$ であり、出力する加速度を自由なベクトルネットとして別に学習するのではない。

<a id="def-pml1-19-lnn"></a>

<!-- formal-statement-start -->
> **定義（正則な Lagrangian neural network）**  
> $d\ge1$、開集合 $U\subset\mathbb R^{2d}$、固定パラメータ $\theta$、$L_\theta\in C^3(U)$ を与える。すべての $(q,v)\in U$ で速度 Hessian $W_\theta(q,v)=\nabla^2_{vv}L_\theta(q,v)$ が可逆なら、正則な LNN の加速度写像を

$$
F_\theta(q,v)
=W_\theta(q,v)^{-1}
\bigl(\nabla_qL_\theta(q,v)-C_\theta(q,v)v\bigr),
\qquad
C_\theta=\left(\frac{\partial^2L_\theta}{\partial v_i\partial q_j}\right)_{ij}
$$

> と定める。対応する連続時間モデルは $\dot q=v,\ \dot v=F_\theta(q,v)$ である。
<!-- formal-statement-end -->

定義では $U$ の全点で可逆性を要求する。特定の初期値付近だけで逆行列が存在する場合には、その開近傍へ領域を制限すれば同じ構成を使える。[速度 Hessian による正則性](../../../物理系/AMECH/AMECH5/index.md#def-amech5-regular-lagrangian)の判定を、加速度の明示公式へつなげた定義である。

<!-- definition-example-start: def-pml1-19-lnn -->
### 例：一定質量の調和振動子

$d=1$、$U=\mathbb R^2$、$m,k>0$、$L_\theta(q,v)=mv^2/2-kq^2/2$、$\theta=(m,k)$ とする。多項式なので $C^3$ 級である。偏微分を順に計算すると

$$
\partial_vL_\theta=mv,\qquad
W_\theta=\partial_v^2L_\theta=m,\qquad
C_\theta=\partial_q\partial_vL_\theta=0,\qquad
\partial_qL_\theta=-kq.
$$

$m>0$ なので $W_\theta$ は可逆であり、定義式は

$$
F_\theta(q,v)=m^{-1}(-kq-0\cdot v)=-\frac{k}{m}q
$$

となる。$\dot q=v,\ \dot v=-kq/m$ は $m\ddot q+kq=0$ を再現する。領域・滑らかさ・可逆性・混合微分・固定パラメータをすべて確かめた。
<!-- definition-example-end -->

## 3. 可逆性は何を保証するか

可逆行列を掛ければ形式的に加速度を求められるが、運動の存在や一意性と結び付くことも示したい。

<a id="thm-pml1-19-acceleration"></a>

<!-- formal-statement-start -->
> **定理（正則 LNN の加速度と局所運動）**  
> $U\subset\mathbb R^{2d}$ を開集合、$L_\theta\in C^3(U)$ を時刻に陽に依存しない固定関数とし、すべての $(q,v)\in U$ で $W_\theta=\nabla^2_{vv}L_\theta$ が可逆とする。このとき Euler--Lagrange 方程式に従う $C^2$ 級の位置曲線と、一階系

$$
\dot q=v,\qquad
\dot v=F_\theta(q,v)
$$

> に従う $C^1$ 級の状態曲線は対応する。さらに任意の初期状態 $(q_0,v_0)\in U$ から、初期状態を含む十分短い時間区間上に一意の局所解が存在する。
<!-- formal-statement-end -->

**証明の見取り図。** 連鎖律で得た $W_\theta a=\nabla_qL_\theta-C_\theta v$ と可逆性から両方向の含意が従う。局所解については $L_\theta\in C^3$ から $F_\theta$ が $C^1$ 級となることを確認し、常微分方程式の局所存在一意性を適用する。長時間解の存在までは主張しない。

<!-- proof-start -->
### 証明

任意の $C^2$ 級位置曲線 $q(t)$ について $v(t)=\dot q(t)$ と置く。上節で導いた連鎖律を Euler--Lagrange 方程式に代入すると

$$
0=\frac{d}{dt}\nabla_vL_\theta-\nabla_qL_\theta
=W_\theta(q,v)\dot v+C_\theta(q,v)v-\nabla_qL_\theta(q,v).
$$

$W_\theta(q,v)$ は各点で可逆だから、左から $W_\theta^{-1}$ を掛けて $\dot v=F_\theta(q,v)$ を得る。逆に $\dot q=v,\ \dot v=F_\theta(q,v)$ を満たす状態曲線に $W_\theta$ を掛ければ

$$
W_\theta\dot v=\nabla_qL_\theta-C_\theta v
$$

となり、連鎖律を逆に使うと Euler--Lagrange 方程式を得る。

$L_\theta\in C^3(U)$ なので $\nabla_qL_\theta,C_\theta,W_\theta$ は少なくとも $C^1$ 級である。行列式は $U$ 上で非零で、逆行列の各成分は余因子と行列式の商であるから $W_\theta^{-1}$ も $C^1$ 級である。従って $(q,v)\mapsto(v,F_\theta(q,v))$ は $U$ 上 $C^1$ 級で、局所 Lipschitz 連続である。[Picard--Lindelöf の局所存在一意性定理](../../../解析系/ODE/ODE1/index.md#thm-ode1-picard-lindelof)を[ベクトル値の自律系へ拡張する手順](../../../解析系/ODE/ODE4/index.md#def-ode4-nonlinear-autonomous-system)では、有限次元の $C^1$ 級ベクトル場が局所 Lipschitz 連続となることを確かめ、Picard 反復を Euclid ノルムで評価する。ここでもその条件を満たしたから、初期点 $(q_0,v_0)$ から一意の局所解を得る。
<!-- proof-end -->

**重要な境界。** 速度 Hessian の可逆性は一般の Lagrangian に対する**正定値性**を要求しない。例えば一次元 $L=-v^2/2-q^2/2$ では $W=-1$ は可逆で、$\ddot q=q$ と加速度を定められる。ただし正の運動エネルギーを表す質量としての解釈は別問題である。「正則だから物理的に安定」とは結論できない。

## 4. 退化すると何が起こるか

行列 $W$ が特異なら、線形方程式 $Wa=g$ の解の存在・一意性をそのまま保証できない。ここで $g=\nabla_qL-Cv$ である。$g$ が $W$ の列空間に入らないと加速度は存在せず、入っていても核に沿う成分は決まらない。

<a id="prop-pml1-19-singular"></a>

<!-- formal-statement-start -->
> **命題（特異速度 Hessian と加速度の不定性）**  
> $L\in C^2(U)$ を与え、状態 $(q,v)\in U$ において $W=\nabla^2_{vv}L(q,v)$ が特異とする。$g=\nabla_qL(q,v)-C(q,v)v$ と置く。この点で Euler--Lagrange 方程式が要求する加速度は $Wa=g$ の解である。$g\notin\operatorname{im}W$ なら解はなく、$g\in\operatorname{im}W$ なら、ある解 $a_0$ に対し全解は $a_0+\ker W$ で表され、一意ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

連鎖律から $Wa=g$ が必要である。像 $\operatorname{im}W=\{Wx:x\in\mathbb R^d\}$ の定義により、$g$ が像に入らなければ解は存在しない。像に入れば $Wa_0=g$ となる $a_0$ が一つ存在する。任意の $a$ に対して

$$
Wa=g\ \Longleftrightarrow\ W(a-a_0)=0
\ \Longleftrightarrow\ a-a_0\in\ker W.
$$

特異な正方行列には非零の核ベクトル $n$ があるから、$a_0$ と $a_0+n$ は異なる解である。
<!-- proof-end -->

**直接例1：決まらない加速度。** $q=(q_1,q_2)$、$v=(v_1,v_2)$、$L=v_1^2/2$ なら

$$
W=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad C=0,\qquad \nabla_qL=0,
\qquad
\ddot q_1=0,\quad 0=0.
$$

$q_2(t)$ には任意の $C^2$ 級関数を選べる。$q_2(0),\dot q_2(0)$ を同じにしても、$q_2(t)=q_2(0)+\dot q_2(0)t$ と $q_2(t)=q_2(0)+\dot q_2(0)t+t^2$ は異なる。単なる数値的な逆行列計算の失敗ではなく、同じ初期条件から複数の運動が出る。

**直接例2：そもそも解けない状態。** $L=v_1^2/2-q_2^2/2$ では $W$ は上と同じだが

$$
g=\nabla_qL=\begin{pmatrix}0\\-q_2\end{pmatrix}.
$$

$Wa=g$ の第2成分は $0=-q_2$ を要求する。$q_2\neq0$ なら加速度は存在しない。$q_2=0$ でも運動として制約を維持するには $v_2=0$ が必要になる。**点ごとの線形方程式の可解性と、時間全体にわたる曲線の可解性も区別**しなければならない。特異 Lagrangian の制約付き力学そのものは、本講の正則 LNN の範囲外である。

## 5. 「質量行列」が本当に質量を表す場合

自然な力学系では位置に応じて変わる対称行列 $M(q)$ を用いて、運動エネルギー $T(q,v)=v^{\mathsf T}M(q)v/2$ を表す。[力学的 Lagrangian](../../../物理系/AMECH/AMECH2/index.md#def-amech2-mechanical-lagrangian)は $L=T-V$ の形であり、$M(q)$ が正定値なら正の運動エネルギーを与える。一般の LNN の $W_\theta$ と違い、この形では $W=M$ が速度によらない。

<a id="def-pml1-19-natural-mass"></a>

<!-- formal-statement-start -->
> **定義（正定値質量行列型 LNN）**  
> $Q\subset\mathbb R^d$ を開集合とし、$M_\theta:Q\to\mathbb R^{d\times d}$ を対称 $C^2$ 級行列値関数、$V_\theta:Q\to\mathbb R$ を $C^3$ 級関数とする。すべての $q\in Q$ と非零 $x\in\mathbb R^d$ に対して $x^{\mathsf T}M_\theta(q)x>0$ と仮定し、

$$
L_\theta(q,v)=\frac12v^{\mathsf T}M_\theta(q)v-V_\theta(q)
$$

> と定めるものを正定値質量行列型 LNN と呼ぶ。ここでは $M_\theta(q)$ を質量行列と呼ぶ。
<!-- formal-statement-end -->

正定値行列に零固有値はないので、速度 Hessian $W=M$ は各点で可逆である。[正則 LNN](#def-pml1-19-lnn)の加速度公式を適用できる。厳密には、この定義の $M\in C^2$ から保証される $L$ の滑らかさは $C^2$ であり、先の[局所運動定理](#thm-pml1-19-acceleration)の $L\in C^3$ という十分条件とは異なる。しかし下で求める $F$ は $M\in C^2$ と $V\in C^3$ によって $C^1$ 級となるため、局所存在一意性の結論は同じように成立する。

<!-- definition-example-start: def-pml1-19-natural-mass -->
### 例：位置依存の正の質量

$d=1$、$Q=\mathbb R$、$M(q)=1+q^2$、$V(q)=q^2/2$ とする。$M,V$ は滑らかで、$x\neq0$ に対して $x^2(1+q^2)>0$ である。従って定義の全条件を満たし、

$$
L(q,v)=\frac12(1+q^2)v^2-\frac12q^2,\qquad
W(q,v)=1+q^2>0
$$

となる。**行列を使う理由**は、速度に関する二次形式の係数がちょうど二階微分 $W$ に現れるからである。一次元で可逆性は $1+q^2\neq0$ という判定に帰着する。
<!-- definition-example-end -->

実際に位置依存質量を使うと、加速度にはポテンシャルの勾配以外の項が生じる。$M=M(q)$ と $V=V(q)$ を用い、成分ごとに

$$
\frac{\partial L}{\partial v_i}=\sum_jM_{ij}v_j,
\qquad
\frac{d}{dt}\frac{\partial L}{\partial v_i}
=\sum_j M_{ij}a_j+\sum_{j,k}(\partial_{q_k}M_{ij})v_kv_j,
$$

$$
\frac{\partial L}{\partial q_i}
=\frac12\sum_{j,k}(\partial_{q_i}M_{jk})v_jv_k-\partial_{q_i}V.
$$

を得る。この差を零と置いて

$$
\sum_jM_{ij}a_j
=-\partial_{q_i}V
-\sum_{j,k}\left(\partial_{q_k}M_{ij}
-\frac12\partial_{q_i}M_{jk}\right)v_jv_k.
$$

従って、$M$ が可逆ならこの右辺に $M^{-1}$ を掛ける。一次元で $m(q)=1+q^2$ なら

$$
m(q)a+\frac12m'(q)v^2+V'(q)=0,
\qquad
a=-\frac{qv^2+q}{1+q^2}.
$$

具体的に $(q,v)=(1,2)$ では $a=-(2^2+1)/2=-5/2$ となる。$-V'(q)/m(q)=-1/2$ だけでは足りず、質量の位置変化に伴う $-2$ が必要になる。

### 正定値性をネットワーク設計で保証する

ネットワークが滑らかな $d\times r$ 行列 $B_\theta(q)$ を出力するなら、固定した $\varepsilon>0$ に対し

$$
M_\theta(q)=B_\theta(q)B_\theta(q)^{\mathsf T}+\varepsilon I_d
$$

と設計できる。任意の非零ベクトル $x$ について

$$
x^{\mathsf T}M_\theta x
=x^{\mathsf T}BB^{\mathsf T}x+\varepsilon x^{\mathsf T}x
=\|B^{\mathsf T}x\|^2+\varepsilon\|x\|^2>0.
$$

従って最小固有値は少なくとも $\varepsilon$ となり、すべての位置で逆行列が存在する。これは**構造上の保証**であり、学習した $M_\theta$ が真の質量であることや予測軌道が真値と一致することまで保証しない。ニューラルネットの活性化関数や合成によって、必要な $C^2$・$C^3$ 級の滑らかさも別途確認する。

## 6. 観測された加速度にどう合わせるか

位置・速度と加速度を測った有限データを $(q_n,v_n,a_n)$、$n=1,\ldots,N$ とする。$N\ge1$、$(q_n,v_n)\in U$、$a_n\in\mathbb R^d$ とし、各サンプルは同じ固定パラメータのモデルを学習するために用いる。

**加速度損失**は明示的に逆行列を用いる。このとき学習データの各状態で $W_\theta$ が可逆でなければならない。一方、**Euler--Lagrange 残差損失**は直接 $W_\theta a_n+C_\theta v_n-\nabla_qL_\theta$ を小さくする。両者は特異な方向で大きく異なり得る。

<a id="def-pml1-19-losses"></a>

<!-- formal-statement-start -->
> **定義（LNN の加速度損失と方程式残差損失）**  
> $N\ge1$、観測データ $(q_n,v_n,a_n)$、固定した候補 $L_\theta\in C^2(U)$ を与える。各観測状態で $W_\theta$ が可逆な場合、加速度損失を

$$
\mathcal L_{\mathrm{acc}}(\theta)
=\frac1N\sum_{n=1}^N\|F_\theta(q_n,v_n)-a_n\|^2
$$

> と定める。可逆性によらず、方程式残差損失を

$$
\mathcal L_{\mathrm{EL}}(\theta)
=\frac1N\sum_{n=1}^N
\|W_\theta(q_n,v_n)a_n+C_\theta(q_n,v_n)v_n-\nabla_qL_\theta(q_n,v_n)\|^2
$$

> と定める。いずれも非負の実数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-19-losses -->
### 例：小さな残差でも加速度誤差が大きい

$d=N=1$、$\varepsilon>0$、$L_\varepsilon(q,v)=\varepsilon(v^2/2+q)$ とし、観測加速度を $a_1=0$ とする。$q_1,v_1$ は任意でよい。$W_\varepsilon=\varepsilon$、$C_\varepsilon=0$、$\partial_qL_\varepsilon=\varepsilon$ だから、加速度予測は $F_\varepsilon=1$ である。よって

$$
\mathcal L_{\mathrm{acc}}=|1-0|^2=1,
\qquad
\mathcal L_{\mathrm{EL}}=|\varepsilon\cdot0-\varepsilon|^2=\varepsilon^2.
$$

$\varepsilon\to0^+$ としても加速度誤差は減らないが、残差損失は零に近づく。残差損失は Lagrangian を小さい定数倍することに影響される。従って**残差の絶対値だけで良い加速度予測と判定してはいけない**。定義の両損失を直接計算して確認した。
<!-- definition-example-end -->

この例の本質を線形代数で一般化できる。

<a id="prop-pml1-19-residual-bound"></a>

<!-- formal-statement-start -->
> **命題（逆行列による加速度誤差の増幅）**  
> 一つの状態 $(q,v)$ で $W_\theta$ が可逆とし、観測加速度 $a_{\mathrm{obs}}$ と予測 $F_\theta$ の差を $e=a_{\mathrm{obs}}-F_\theta(q,v)$ と置く。方程式残差を $r=W_\theta a_{\mathrm{obs}}+C_\theta v-\nabla_qL_\theta$ とすると、$r=W_\theta e$ であり、

$$
\|e\|_2\le\|W_\theta^{-1}\|_2\|r\|_2 .
$$

> さらに $W_\theta$ が対称正定値で $x^{\mathsf T}W_\theta x\ge\mu\|x\|_2^2$（すべての $x$ に対して、$\mu>0$）なら、$\|e\|_2\le\|r\|_2/\mu$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[正則 LNN の定義](#def-pml1-19-lnn)より $W_\theta F_\theta=\nabla_qL_\theta-C_\theta v$ である。従って

$$
r=W_\theta a_{\mathrm{obs}}-(\nabla_qL_\theta-C_\theta v)
=W_\theta(a_{\mathrm{obs}}-F_\theta)=W_\theta e.
$$

可逆性から $e=W_\theta^{-1}r$、行列の作用素ノルムの定義から $\|e\|_2\le\|W_\theta^{-1}\|_2\|r\|_2$。対称正定値行列は直交固有基底を持ち、各固有値 $\lambda_i$ は $\lambda_i\ge\mu>0$ を満たす。逆行列の固有値は $1/\lambda_i$ だから $\|W_\theta^{-1}\|_2=\max_i1/\lambda_i\le1/\mu$ となる。
<!-- proof-end -->

## 7. Lagrangian からの保存量と HNN との接点

時刻に陽に依存しない Lagrangian に対し、エネルギー型関数を

$$
E_\theta(q,v)=v^{\mathsf T}\nabla_vL_\theta(q,v)-L_\theta(q,v)
$$

と置く。これは[AMECH5 の Hamiltonian](../../../物理系/AMECH/AMECH5/index.md#def-amech5-hamiltonian)を速度で書いた式に対応する。$W$ の可逆性は、$v$ と $p=\nabla_vL$ を局所的に入れ替えるときの条件である。

<a id="prop-pml1-19-energy"></a>

<!-- formal-statement-start -->
> **命題（LNN の連続時間エネルギー収支）**  
> $L_\theta\in C^2(U)$ を時刻に陽に依存しない固定関数とし、$C^2$ 級曲線 $q(t)$ が $v=\dot q$ として $U$ 内にあり、Euler--Lagrange 方程式に従うとする。このとき $E_\theta(q(t),v(t))$ は一定である。速度 Hessian の可逆性はこの保存の**代数的な証明自体には不要**である。
<!-- formal-statement-end -->

**証明の見取り図。** $v^{\mathsf T}\nabla_vL-L$ を微分すると、$a$ の項と $L$ の速度微分が相殺し、Euler--Lagrange 方程式の残差だけが残る。

<!-- proof-start -->
### 証明

連鎖律と積の微分則により

$$
\begin{aligned}
\frac{dE_\theta}{dt}
&=\dot v^{\mathsf T}\nabla_vL_\theta
+v^{\mathsf T}\frac{d}{dt}\nabla_vL_\theta
-\nabla_qL_\theta^{\mathsf T}\dot q
-\nabla_vL_\theta^{\mathsf T}\dot v\\
&=v^{\mathsf T}\left(\frac{d}{dt}\nabla_vL_\theta-\nabla_qL_\theta\right)=0 .
\end{aligned}
$$

第2等号では $\dot q=v$ と実数の内積の対称性を使った。最後の括弧は軌道が満たす Euler--Lagrange 方程式により零である。よって $E_\theta$ は時間区間上で一定である。
<!-- proof-end -->

特に $L=v^{\mathsf T}Mv/2-V$ で $M$ が速度によらないとき、$\nabla_vL=Mv$ だから

$$
E=v^{\mathsf T}Mv-\left(\frac12v^{\mathsf T}Mv-V\right)
=\frac12v^{\mathsf T}Mv+V .
$$

正則性があれば[AMECH5 の局所速度回収](../../../物理系/AMECH/AMECH5/index.md#prop-amech5-local-inversion)で $(q,p)$ 座標へ移し、Hamiltonian を構成できる。しかし、連続保存の証明と、実際に数値積分した一歩が保存することは別である（前講の[陽的 Euler ドリフト命題](../PML1-18/index.md#prop-pml1-18-euler)を参照）。また、モデルのエネルギー保存は真のエネルギーへの一致を意味しない。

## 8. 演習 Level A：まず行列と微分を手で確認する

<a id="ex-pml1-19-a01"></a>

### PML1-19-A01 一次元の加速度を導く
- Level: A

$m,k>0$ とし、$L(q,v)=mv^2/2-kq^2/2$ とする。$W,C,\partial_qL,F$ を順に求め、$(q,v)=(2,3)$ の加速度を答えよ。

<!-- solution-start -->
#### 詳細解答

$\partial_vL=mv$ なので $W=\partial_v(mv)=m$、$C=\partial_q(mv)=0$。また $\partial_qL=-kq$。$m>0$ より逆数が存在するため

$$
F=W^{-1}(\partial_qL-Cv)=\frac1m(-kq-0)=-\frac km q.
$$

従って $F(2,3)=-2k/m$。速度 $v=3$ がこの一定質量のモデルの加速度に現れないことも確かめられる。
<!-- solution-end -->

<a id="ex-pml1-19-a02"></a>

### PML1-19-A02 混合微分が消えない例
- Level: A

$L(q,v)=\frac12(1+q^2)v^2-\frac12q^2$ に対して $W,C,\partial_qL$ を求め、$F(1,2)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$$
\partial_vL=(1+q^2)v,\quad W=1+q^2,\quad C=2qv,
\quad \partial_qL=qv^2-q.
$$

従って $Cv=2qv^2$ であり、

$$
F(q,v)=\frac{(qv^2-q)-2qv^2}{1+q^2}
=-\frac{q(v^2+1)}{1+q^2}.
$$

$q=1,v=2$ を代入すると $F(1,2)=-(4+1)/2=-5/2$。$C$ を落とすと誤答になる。
<!-- solution-end -->

<a id="ex-pml1-19-a03"></a>

### PML1-19-A03 特異行列の像と核
- Level: A

$W=\begin{pmatrix}2&0\\0&0\end{pmatrix}$ とする。$Wa=(4,0)^{\mathsf T}$ と $Wa=(4,1)^{\mathsf T}$ をそれぞれ解き、存在・一意性を判定せよ。

<!-- solution-start -->
#### 詳細解答

$a=(a_1,a_2)^{\mathsf T}$ とすると $Wa=(2a_1,0)^{\mathsf T}$ である。第1の式は $2a_1=4$、$0=0$ より $a=(2,s)^{\mathsf T}$（$s\in\mathbb R$）が全解で、一意ではない。第2の式は第2成分で $0=1$ を要求するため解がない。像は $\{(x,0)^{\mathsf T}:x\in\mathbb R\}$、核は $\{(0,s)^{\mathsf T}:s\in\mathbb R\}$ である。
<!-- solution-end -->

<a id="ex-pml1-19-a04"></a>

### PML1-19-A04 正定値構成を検査
- Level: A

$B(q)=(q,1)^{\mathsf T}\in\mathbb R^{2\times1}$、$\varepsilon=1/2$ とし、$M(q)=BB^{\mathsf T}+\varepsilon I_2$ を求めよ。すべての $q\in\mathbb R$ で $M(q)$ が可逆であることを、任意の非零 $x$ を用いて証明せよ。

<!-- solution-start -->
#### 詳細解答

$$
BB^{\mathsf T}=\begin{pmatrix}q^2&q\\q&1\end{pmatrix},
\qquad
M=\begin{pmatrix}q^2+1/2&q\\q&3/2\end{pmatrix}.
$$

$x=(x_1,x_2)^{\mathsf T}$ に対し

$$
x^{\mathsf T}Mx=(qx_1+x_2)^2+\frac12(x_1^2+x_2^2)>0\qquad(x\neq0).
$$

よって正定値であり、$Mx=0$ なら $x^{\mathsf T}Mx=0$ から $x=0$。核が零の $2\times2$ 行列なので可逆である。
<!-- solution-end -->

<a id="ex-pml1-19-a05"></a>

### PML1-19-A05 残差損失と加速度損失
- Level: A

$L_\varepsilon(q,v)=\varepsilon(v^2/2+q)$（$\varepsilon>0$）、観測加速度 $a=2$ の一標本を考える。二つの損失を求め、$\varepsilon\to0^+$ の極限で比較せよ。

<!-- solution-start -->
#### 詳細解答

$W=\varepsilon$、$C=0$、$\partial_qL=\varepsilon$ なので $F=1$。加速度損失は $(1-2)^2=1$。残差は $\varepsilon\cdot2-\varepsilon=\varepsilon$ なので残差損失は $\varepsilon^2$。従って $\varepsilon\to0^+$ で前者は $1$ のまま、後者は $0$ に収束する。小さくなったのは残差の尺度であり、加速度誤差ではない。
<!-- solution-end -->

## 9. 演習 Level B：構造と誤差の関係を再構成する

<a id="ex-pml1-19-b01"></a>

### PML1-19-B01 二自由度の連成質量
- Level: B

$M=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$V(q)=(q_1^2+q_2^2)/2$ とし、$L(q,v)=v^{\mathsf T}Mv/2-V(q)$ とする。$M$ の正定値性を確認し、加速度写像 $F(q,v)$ を導いて $q=(1,0)^{\mathsf T}$ で求めよ。

<!-- solution-start -->
#### 詳細解答

任意の $x=(x_1,x_2)^{\mathsf T}$ について

$$
x^{\mathsf T}Mx=2x_1^2+2x_1x_2+2x_2^2
=(x_1+x_2)^2+x_1^2+x_2^2>0\quad(x\neq0).
$$

従って $M$ は正定値で $\det M=4-1=3$、逆行列は

$$
M^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

$M$ は一定なので $C=0$、$\nabla_qL=-q$ である。よって

$$
F(q,v)=-M^{-1}q
=-\frac13\begin{pmatrix}2q_1-q_2\\-q_1+2q_2\end{pmatrix}.
$$

$q=(1,0)^{\mathsf T}$ では $F=(-2/3,1/3)^{\mathsf T}$。
<!-- solution-end -->

<a id="ex-pml1-19-b02"></a>

### PML1-19-B02 退化した Lagrangian の二種類の失敗
- Level: B

$L_0(q,v)=v_1^2/2$、$L_1(q,v)=v_1^2/2-q_2^2/2$ を $\mathbb R^2\times\mathbb R^2$ で考える。各 Euler--Lagrange 方程式を求め、$q_2(0)=1,v_2(0)=0$ という初期条件からの運動の有無を判定せよ。$L_0$ では異なる二つの運動を示せ。

<!-- solution-start -->
#### 詳細解答

両モデルで $\nabla_vL=(v_1,0)^{\mathsf T}$、$W=\operatorname{diag}(1,0)$、$C=0$ である。$L_0$ は $\nabla_qL_0=0$ だから $\ddot q_1=0$、$0=0$ となる。$q_1(0)=\alpha,v_1(0)=\beta$ も固定すると、$q_1(t)=\alpha+\beta t$、$q_2(t)=1$ と $q_2(t)=1+t^2$ はいずれも指定初期条件を満たす別の運動である。

$L_1$ では $\nabla_qL_1=(0,-q_2)^{\mathsf T}$、従って $\ddot q_1=0$ と $0=-q_2$ が必要である。初期値 $q_2(0)=1$ は直ちに後式に反するため、その初期条件を通る $C^2$ 級解は存在しない。特異性から直ちに「必ず解なし」でも「必ず無数の解」でもないことが分かる。
<!-- solution-end -->

<a id="ex-pml1-19-b03"></a>

### PML1-19-B03 時刻によらないエネルギーを再導出
- Level: B

$m,k>0$ の $L(q,v)=mv^2/2-kq^2/2$ と、任意の $C^2$ 級 Euler--Lagrange 軌道を考える。$E=v\partial_vL-L$ を直接計算し、運動方程式を代入して $dE/dt=0$ を示せ。また、真のエネルギーが $E_\ast=(v^2+q^2)/2$ の場合、$m\neq k$ のモデル軌道上で $dE_\ast/dt$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\partial_vL=mv$ だから

$$
E=mv^2-\left(\frac m2v^2-\frac k2q^2\right)
=\frac m2v^2+\frac k2q^2.
$$

Euler--Lagrange 方程式は $m\dot v+kq=0$ で、$\dot q=v$ だから

$$
\frac{dE}{dt}=mv\dot v+kq\dot q
=v(-kq)+kqv=0.
$$

一方、$E_\ast$ の微分は

$$
\frac{dE_\ast}{dt}=v\dot v+q\dot q
=v\left(-\frac kmq\right)+qv
=\left(1-\frac km\right)qv.
$$

$m\neq k$ かつ $qv\neq0$ の点では真のエネルギーは変化し、モデルエネルギーの保存とは別である。
<!-- solution-end -->

<a id="ex-pml1-19-b04"></a>

### PML1-19-B04 残差を加速度誤差へ変換
- Level: B

$W=\operatorname{diag}(1/10,2)$、$C=0$、$\nabla_qL=(1/10,0)^{\mathsf T}$ という一状態での微分値を与える。$a_{\mathrm{obs}}=(0,1)^{\mathsf T}$ のとき、$F,e=a_{\mathrm{obs}}-F,r=Wa_{\mathrm{obs}}-\nabla_qL$ と各二乗ノルムを求めよ。$\|e\|_2\le\|W^{-1}\|_2\|r\|_2$ を数値で検算せよ。

<!-- solution-start -->
#### 詳細解答

$$
W^{-1}=\operatorname{diag}(10,1/2),\quad
F=W^{-1}\begin{pmatrix}1/10\\0\end{pmatrix}
=\begin{pmatrix}1\\0\end{pmatrix}.
$$

従って $e=(-1,1)^{\mathsf T}$、$\|e\|_2^2=1+1=2$。残差は

$$
r=\begin{pmatrix}0\\2\end{pmatrix}
-\begin{pmatrix}1/10\\0\end{pmatrix}
=\begin{pmatrix}-1/10\\2\end{pmatrix},
\qquad
\|r\|_2^2=\frac1{100}+4=\frac{401}{100}.
$$

$\|W^{-1}\|_2=10$ なので上界は $\sqrt2\le10\sqrt{401}/10=\sqrt{401}$ で成立する。実際、$W^{-1}r=(-1,1)^{\mathsf T}=e$ であり、方向によって誤差が異なる倍率で増幅される。
<!-- solution-end -->

## 10. 演習 Level C：モデル構成から保存と退化まで

<a id="ex-pml1-19-c01"></a>

### PML1-19-C01 可変質量モデルを学習器として検査する
- Level: C

$d=1$、$\alpha\ge0$、$k>0$ とし、滑らかな候補

$$
L_{\alpha,k}(q,v)=\frac12(1+\alpha q^2)v^2-\frac k2q^2
$$

を考える。観測点 $(q,v,a)=(1,2,-3)$ が一つあるとする。

1. 速度 Hessian、混合微分、加速度予測を一般の $(q,v)$ で求め、領域 $\mathbb R^2$ 上の正則性を示せ。
2. 観測点の加速度損失と方程式残差損失を $\alpha,k$ で表せ。二つの損失が同じ値になるとは限らない理由を説明せよ。
3. 加速度が観測に一致するパラメータを一組求めよ（$\alpha\ge0,k>0$ を満たすこと）。その組で $(q,v)=(1,2)$ の加速度を再検算せよ。
4. $E=v\partial_vL-L$ を求め、連続時間のモデル軌道上で保存することを直接示せ。
5. $1+\alpha q^2$ を $\alpha q^2$ へ変更し、$\alpha>0$ を保った場合、$q=0$ の速度 Hessian と Euler--Lagrange 方程式を調べよ。なぜ同じ加速度写像を全状態で定義できなくなるか答えよ。

<!-- solution-start -->
#### 詳細解答

**(1)** まず

$$
\partial_vL=(1+\alpha q^2)v,\quad
W=1+\alpha q^2,\quad
C=2\alpha qv,\quad
\partial_qL=\alpha qv^2-kq.
$$

従って

$$
W F=\partial_qL-Cv
=(\alpha qv^2-kq)-2\alpha qv^2
=-\alpha qv^2-kq,
$$

$$
F_{\alpha,k}(q,v)=-\frac{\alpha qv^2+kq}{1+\alpha q^2}.
$$

$\alpha\ge0$ なので全ての $q$ で $W\ge1>0$。$L$ は多項式で $C^3$ 級だから、全 $\mathbb R^2$ で正則 LNN の条件を満たす。

**(2)** 観測点で $W=1+\alpha$、$F=-(4\alpha+k)/(1+\alpha)$ となる。よって加速度損失は

$$
\mathcal L_{\mathrm{acc}}
=\left(-\frac{4\alpha+k}{1+\alpha}+3\right)^2
=\left(\frac{3-\alpha-k}{1+\alpha}\right)^2.
$$

観測加速度 $-3$ を Euler--Lagrange 式へ代入した残差は

$$
r=(1+\alpha)(-3)-(-4\alpha-k)
=\alpha+k-3.
$$

従って $\mathcal L_{\mathrm{EL}}=(\alpha+k-3)^2$。二者は $r=W(a_{\mathrm{obs}}-F)$ の関係にあるため、二乗ノルムの重み $W^2$ が異なる。

**(3)** 両損失を零にするには $\alpha+k=3$ が必要十分である。例えば $\alpha=1,k=2$ は条件を満たし、

$$
F_{1,2}(1,2)=-\frac{1\cdot1\cdot4+2\cdot1}{1+1}=-3
$$

となる。1標本だけでは $\alpha=0,k=3$ も同じ加速度を出すため、パラメータは一意には識別できない。

**(4)**

$$
E=v(1+\alpha q^2)v
-\left(\frac12(1+\alpha q^2)v^2-\frac k2q^2\right)
=\frac12(1+\alpha q^2)v^2+\frac k2q^2.
$$

軌道上の時間微分は

$$
\frac{dE}{dt}
=\alpha qv^3+(1+\alpha q^2)v\dot v+kqv
=v\left((1+\alpha q^2)F+\alpha qv^2+kq\right).
$$

(1) の $F=-(\alpha qv^2+kq)/(1+\alpha q^2)$ を代入すると括弧は零、従って $dE/dt=0$。この連続時間保存は観測点数や訓練精度に依らない。

**(5)** 変更後の

$$
\widetilde L(q,v)=\frac12\alpha q^2v^2-\frac k2q^2
$$

では $\widetilde W=\alpha q^2$、$\widetilde C=2\alpha qv$、$\partial_q\widetilde L=\alpha qv^2-kq$ だから、Euler--Lagrange 方程式は

$$
\alpha q^2a=-\alpha qv^2-kq.
$$

$q=0$ では $0=0$ であり、その点で加速度 $a$ をこの式から一意には決められない。$q\neq0$ なら

$$
a=-\frac{\alpha v^2+k}{\alpha q}
$$

と書けるが、$q\to0$ で一般には発散する。したがって $\mathbb R^2$ 全域の滑らかな加速度写像を得ることはできない。**同じ一点での方程式の可解性**だけでは、近傍まで一意の運動を定める正則性を回復できない。
<!-- solution-end -->

## 11. 次の講義へ

LNN が固定するのは、速度 Hessian と混合微分を含む Euler--Lagrange 方程式から加速度を導く構造である。正則性は加速度の局所的な一意性を支えるが、真値との一致や有限刻みの保存を保証するわけではない。次の PML1-20 では、連続時間の保存量と数値積分の保存量がどこで分かれるかを調べる。
