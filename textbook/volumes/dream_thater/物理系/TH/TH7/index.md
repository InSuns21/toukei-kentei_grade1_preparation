# TH7 化学ポテンシャル・多成分系・相平衡

[TH4の化学ポテンシャル](../TH4/index.md#def-th4-chemical-potential)は一種類の物質を少し増やすときのエネルギーの変化率でした。しかし、水と塩のように二種類の物質が共存するとき、どちらを移したかによって変化率は異なります。また、液体と気体が共存するときは、温度と圧力だけでなく、**物質をどちらの相へ移すと自由エネルギーが下がるか**を問わなければなりません。

本章では「物質移動の方向を決める傾き」を成分ごとに定義し、その傾きが等しくなる条件から相平衡・化学反応平衡へ進みます。続いて共存線の傾きを求め、混合による安定化と第三法則の適用限界を考えます。

以下、$T>0$、$p>0$、気体定数 $R>0$ とします。巨視的な平衡系の相内では局所的に滑らかな状態関数があり、界面エネルギー、外場、長距離相互作用を無視します。温度・圧力が共通の均一相、相の間の物質交換、化学反応は**別の制約**として扱います。物質量 $N_i$ は mol 単位です。微分可能性と安定性が失われる点では以下の局所公式を無条件には使いません。

## 1. 成分ごとに変わる化学ポテンシャル

一成分の[拡張基本関係](../TH4/index.md#def-th4-chemical-potential)では物質量の変化は $dN$ 一つでした。成分が $r$ 個なら、相互に独立な物質量 $N_1,\ldots,N_r$ を座標にし、他成分を固定した偏微分を区別する必要があります。化学ポテンシャルを「物質一 mol の内部エネルギー」と取り違えると、他の成分に依存する変化を見落とします。

<a id="def-th7-component-mu"></a>

<!-- formal-statement-start -->
> **定義（多成分系の化学ポテンシャル）**  
> $r\geq2$ とし、開領域上の $C^1$ 級平衡基本関係 $U(S,V,N_1,\ldots,N_r)$ を考える。$S,V,N_j$（$j\ne i$）を固定した偏微分
>
$$
\mu_i=\left(\frac{\partial U}{\partial N_i}\right)_{S,V,N_{j\ne i}}
$$
>
> を第 $i$ 成分の化学ポテンシャルという。$T=U_S$、$p=-U_V$ とおけば、多成分基本関係の全微分は
>
$$
dU=T\,dS-p\,dV+\sum_{i=1}^{r}\mu_i\,dN_i
$$
>
> である。これは平衡状態空間の微分であって、任意の非平衡流入をこの式だけで記述する主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th7-component-mu -->
### 例：二成分の係数を直接確かめる

**定義の確認**：$N=N_1+N_2$、$A,B>0$、$c_1,c_2$ は定数とし、$S,V,N_1,N_2>0$ 上で

$$
U=A\frac{S^2}{N}+B\frac{N^2}{V}+c_1N_1+c_2N_2
$$

とします。$N_1$ を変えると $N$ も変わるので、$\partial N/\partial N_1=1$ を忘れてはいけません。成分ごとに偏微分すると

$$
\begin{aligned}
T&=\frac{2AS}{N},\\
p&=\frac{BN^2}{V^2},\\
\mu_1&=-\frac{AS^2}{N^2}+\frac{2BN}{V}+c_1,\\
\mu_2&=-\frac{AS^2}{N^2}+\frac{2BN}{V}+c_2.
\end{aligned}
$$

たとえば $c_1\ne c_2$ なら、同じ $S,V,N$ でもどちらの成分を加えるかで変化率が異なります。偏微分に各 $dS,dV,dN_i$ を掛けて足せば $dU$ に戻り、定義の条件を直接確認できます。
<!-- definition-example-end -->

## 2. 示量性からEuler関係式とGibbs–Duhem関係式へ

[TH5の一成分Euler関係式](../TH5/index.md#thm-th5-euler)では、基本関係を倍に拡大して微分しました。多成分系でも、**組成比を保ったまま**全成分を同時に拡大すれば同じ構成が使えます。どれか一成分だけを増やす操作とは区別してください。

<a id="thm-th7-multicomponent-euler"></a>

<!-- formal-statement-start -->
> **定理（多成分Euler関係式）**  
> $U(S,V,N_1,\ldots,N_r)$ は正の錐状領域で $C^1$ 級、すべての示量変数について一次同次であるとする。すなわち、許される任意の $\lambda>0$ に対し
>
$$
U(\lambda S,\lambda V,\lambda N_1,\ldots,\lambda N_r)
=\lambda U(S,V,N_1,\ldots,N_r)
$$
>
> が成り立つ。このとき
>
$$
U=TS-pV+\sum_i\mu_iN_i,\qquad
G=\sum_i\mu_iN_i
$$
>
> である。ただし $G=U-TS+pV$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

一変数の拡大率 $\lambda$ を用い、$\lambda=1$ での導関数を二通りに計算します。最後に[TH5のGibbsポテンシャルの定義](../TH5/index.md#def-th5-potentials)を用います。

<!-- proof-start -->
### 証明

状態を固定して $f(\lambda)=U(\lambda S,\lambda V,\lambda N_1,\ldots,\lambda N_r)$ と置きます。一次同次性から $f(\lambda)=\lambda U(S,V,N_1,\ldots,N_r)$ なので

$$
f'(1)=U(S,V,N_1,\ldots,N_r).
$$

一方、連鎖律の入力は $(\lambda S,\lambda V,\lambda N_1,\ldots,\lambda N_r)$、評価点は $\lambda=1$ です。

$$
\begin{aligned}
f'(\lambda)
&=U_S(\lambda\cdot)S+U_V(\lambda\cdot)V
 +\sum_i U_{N_i}(\lambda\cdot)N_i,\\
f'(1)
&=TS-pV+\sum_i\mu_iN_i.
\end{aligned}
$$

二つの $f'(1)$ を等置し、さらに $G=U-TS+pV$ へ代入します。

$$
G=(TS-pV+\sum_i\mu_iN_i)-TS+pV
=\sum_i\mu_iN_i.
$$

一次同次性がない小系や界面寄与の大きな系には、この等式を仮定なく適用できません。
<!-- proof-end -->

<a id="thm-th7-gibbs-duhem"></a>

<!-- formal-statement-start -->
> **定理（多成分Gibbs–Duhem関係式）**  
> 前定理の仮定に加えて $U$ が $C^2$ 級であるなら、平衡状態空間の許される微小変化に沿って
>
$$
S\,dT-V\,dp+\sum_iN_i\,d\mu_i=0
$$
>
> が成り立つ。特に $T,p$ を固定した二成分系では
>
$$
N_1\,d\mu_1+N_2\,d\mu_2=0
$$
>
> となり、二つの化学ポテンシャルを独立に選ぶことはできない。
<!-- formal-statement-end -->

### 証明の見取り図

[Euler関係式](#thm-th7-multicomponent-euler)を積の法則で微分し、多成分基本関係と比較します。単に $\mu_i$ が一定だという結論ではありません。

<!-- proof-start -->
### 証明

[Euler関係式](#thm-th7-multicomponent-euler)を全微分すると

$$
\begin{aligned}
dU={}&T\,dS+S\,dT-p\,dV-V\,dp\\
&+\sum_i\bigl(\mu_i\,dN_i+N_i\,d\mu_i\bigr).
\end{aligned}
$$

[多成分基本関係](#def-th7-component-mu)の $dU=T\,dS-p\,dV+\sum_i\mu_i\,dN_i$ を同じ変化について差し引きます。$dS,dV,dN_i$ の係数が相殺され、

$$
0=S\,dT-V\,dp+\sum_iN_i\,d\mu_i.
$$

$T,p$ がともに固定なら $dT=dp=0$。二成分の場合は和を展開して第二式を得ます。
<!-- proof-end -->

## 3. 物質を移しても自由エネルギーが下がらない条件

[TH6のGibbs自由エネルギーの最小原理](../TH6/index.md#thm-th6-free-energy-minimum)は、一定温度・一定圧力の浴のもとで状態の自由エネルギーが下がる向きを判定しました。物質が二つの相の間を移動できるなら、「片方の量が増えた分、もう片方の量が減る」という制約をまず代入します。相の温度・圧力は共通で、各相は局所均一、相ごとの $G^\alpha,G^\beta$ が物質量について微分可能とします。

<a id="def-th7-transfer-coordinate"></a>

<!-- formal-statement-start -->
> **定義（相間物質移動の座標）**  
> 全成分の総物質量 $N_i^{\mathrm{tot}}=N_i^\alpha+N_i^\beta$ を固定した二相系で、成分 $i$ を相 $\beta$ から相 $\alpha$ へ $\xi$ mol 移すとき
>
$$
N_i^\alpha(\xi)=N_i^\alpha(0)+\xi,\qquad
N_i^\beta(\xi)=N_i^\beta(0)-\xi
$$
>
> と置く。他成分は固定する。$\xi$ の許容区間は両相の物質量と相の存在条件で決まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th7-transfer-coordinate -->
### 例：総量保存と端点を確かめる

**定義の確認**：成分1が相 $\alpha$ に2 mol、相 $\beta$ に3 mol あるなら、移動後の量は $2+\xi$ と $3-\xi$ mol、合計は常に5 mol です。両相の量を正に保つ開区間は $-2<\xi<3$ です。$\xi=3$ で相 $\beta$ の成分1が尽きると内部点での停留条件ではなく端点の片側微分を使います。
<!-- definition-example-end -->

<a id="thm-th7-phase-equilibrium"></a>

<!-- formal-statement-start -->
> **定理（相間移動の平衡条件）**  
> 二相 $\alpha,\beta$ を共通の $T,p$ に保ち、成分 $i$ のみを両相間で可逆的に移せるとする。$G^\alpha(T,p,\boldsymbol N^\alpha)$ と $G^\beta(T,p,\boldsymbol N^\beta)$ は内部の許容状態で $C^2$ 級とする。総量固定の下で全Gibbs自由エネルギーが内部局所最小なら、
>
$$
\mu_i^\alpha=\mu_i^\beta
$$
>
> が必要である。逆に、この等値条件を満たす内部停留点で、移動座標に沿う二階微分が正なら、この交換方向で厳密局所最小となる。複数成分が独立に移動できる場合、条件は移動可能な各成分について課される。
<!-- formal-statement-end -->

### 証明の見取り図

移動座標を $G^\alpha+G^\beta$ に入れ、一階微分の消失と二階微分の符号を分けて使います。化学ポテンシャルの等値は停留条件であり、それだけで大域安定性は保証しません。

<!-- proof-start -->
### 証明

[移動座標](#def-th7-transfer-coordinate)を $\mathcal G(\xi)=G^\alpha(T,p,\boldsymbol N^\alpha(\xi))+G^\beta(T,p,\boldsymbol N^\beta(\xi))$ に代入します。[多成分基本関係](#def-th7-component-mu)と[TH5のGibbsポテンシャルの定義](../TH5/index.md#def-th5-potentials) $G=U-TS+pV$ を全微分し、共通 $T,p$ を固定すると、各相で $dG^\gamma=\sum_j\mu_j^\gamma\,dN_j^\gamma$ です。従って連鎖律から

$$
\begin{aligned}
\mathcal G'(\xi)
&=\mu_i^\alpha\frac{dN_i^\alpha}{d\xi}
+\mu_i^\beta\frac{dN_i^\beta}{d\xi}\\
&=\mu_i^\alpha-\mu_i^\beta.
\end{aligned}
$$

内部点 $\xi=0$ が局所最小なら $\mathcal G'(0)=0$ だから $\mu_i^\alpha=\mu_i^\beta$ です。さらに、停留条件 $\mathcal G'(0)=0$ を確かめた点では、$C^2$ 級のTaylor展開から

$$
\mathcal G(\xi)-\mathcal G(0)
=\tfrac12\mathcal G''(0)\xi^2+o(\xi^2)
$$

となります。一階微分が零かつ $\mathcal G''(0)>0$ なら、十分小さい非零の $\xi$ で差は正です。逆に境界点では $\xi$ の正負がともに許されるとは限らず、等値条件を機械的に課せません。
<!-- proof-end -->

## 4. 共存線の傾きは何から決まるか

純物質の液相・気相のように、**同じ一成分**が二相を作る場合を考えます。各相のモルGibbs自由エネルギーは[一成分Euler関係式](../TH5/index.md#thm-th5-euler)から $g^\gamma=\mu^\gamma$ です。[一成分Gibbs–Duhem関係式](../TH5/index.md#thm-th5-gibbs-duhem)により、各相の単相領域ではモルエントロピー $s^\gamma=S^\gamma/N^\gamma$、モル体積 $v^\gamma=V^\gamma/N^\gamma$ を使い

$$
d\mu^\gamma=-s^\gamma\,dT+v^\gamma\,dp
$$

と書けます。この式はそれぞれの相の**滑らかな枝**に対する微分です。相をまたぐ単一の滑らかな状態関数を仮定する必要はありません。

<a id="thm-th7-clapeyron"></a>

<!-- formal-statement-start -->
> **定理（Clapeyron式）**  
> 一成分の二相 $\alpha,\beta$ の化学ポテンシャルが、ある $(T_0,p_0)$ の近傍で各相ごとに $C^1$ 級であるとする。$T_0>0$、共存条件 $\mu^\alpha=\mu^\beta$ が成立し、$\Delta v=v^\beta-v^\alpha\ne0$ とする。さらに、$(T_0,p_0)$ を通る $C^1$ 級の共存曲線 $p=p(T)$ が存在すると仮定する。この曲線上で
>
$$
\frac{dp}{dT}
=\frac{s^\beta-s^\alpha}{v^\beta-v^\alpha}
=\frac{L_{\alpha\to\beta}}{T\,(v^\beta-v^\alpha)}
$$
>
> となる。ただし $L_{\alpha\to\beta}=h^\beta-h^\alpha$ は転移で吸収するモル潜熱、$h^\gamma=u^\gamma+pv^\gamma$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

[相平衡の等値条件](#thm-th7-phase-equilibrium)で $\mu^\beta-\mu^\alpha=0$ とし、曲線上で全微分を取ります。モル体積差が零でないことが、圧力を温度の関数に解くための条件です。潜熱の式には共存時の $\Delta g=0$ を使います。

<!-- proof-start -->
### 証明

$\Phi(T,p)=\mu^\beta(T,p)-\mu^\alpha(T,p)$ とします。単相の[Gibbs–Duhem関係式](../TH5/index.md#thm-th5-gibbs-duhem)から

$$
\Phi_T=-(s^\beta-s^\alpha)=-\Delta s,\qquad
\Phi_p=v^\beta-v^\alpha=\Delta v.
$$

$\Phi(T_0,p_0)=0$、$\Phi_p(T_0,p_0)\ne0$ です。仮定した $C^1$ 級共存曲線上で $\Phi(T,p(T))=0$ を微分すると

$$
0=\Phi_T+\Phi_p\frac{dp}{dT}
=-\Delta s+\Delta v\frac{dp}{dT}.
$$

ゆえに $dp/dT=\Delta s/\Delta v$ です。[TH5の熱力学ポテンシャル](../TH5/index.md#def-th5-potentials)の定義からモル当たり $g=h-Ts$。同じ $(T,p)$ で $\Delta g=\mu^\beta-\mu^\alpha=0$ ですから

$$
0=\Delta h-T\Delta s,\qquad
L_{\alpha\to\beta}=\Delta h=T\Delta s.
$$

これを第一の傾きへ代入して第二の表示を得ます。$\Delta v=0$ なら、上の商の分母が零となり、$dp/dT$ を上式で割り算できません。
<!-- proof-end -->

### 例：蒸発の傾きを判断する

液相を $\alpha$、気相を $\beta$ とし、$L>0$、$v^\beta>v^\alpha$ なら $dp/dT>0$ です。液相から気相への移行はエントロピーと体積を増やすため、沸騰圧は温度とともに上がります。ただし気体を理想気体と近似して $v^\beta\simeq RT/p$、$v^\alpha\ll v^\beta$ とおく **Clausius–Clapeyron近似** は、厳密な[Clapeyron式](#thm-th7-clapeyron)からさらに仮定を加えたものです。そのときに限って

$$
\frac{d\ln p}{dT}\simeq\frac{L}{RT^2}.
$$

潜熱 $L$ が温度によって変わらないとさらに近似すれば、二温度 $T_1,T_2$ に対し

$$
\ln\frac{p_2}{p_1}\simeq-\frac{L}{R}
\left(\frac1{T_2}-\frac1{T_1}\right).
$$

## 5. 混合はなぜ自由エネルギーを下げるか

相の数ではなく、**同じ均一相の中に何種類の成分があるか**に注目します。混合の効果は一般には相互作用に依存するので、ここでは理想混合模型を明示して計算します。固定した $T,p$、二成分の正の物質量、$N=N_1+N_2$、モル分率 $x_i=N_i/N$ を考えます。

<a id="def-th7-ideal-mixing"></a>

<!-- formal-statement-start -->
> **定義（理想混合のGibbs自由エネルギー）**  
> $T>0$、$N_1,N_2>0$、$x_i=N_i/(N_1+N_2)$ とする。与えられた純成分の基準化学ポテンシャル $\mu_i^*(T,p)$ を使い、理想混合模型を
>
$$
G=\sum_{i=1}^2N_i\mu_i^*(T,p)
+RT\sum_{i=1}^2N_i\ln x_i
$$
>
> と定義する。$x_i=0$ の式は、必要なら $x\ln x\to0$ の連続拡張で読む。この模型は非理想相互作用を含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th7-ideal-mixing -->
### 例：等モル混合で符号を確かめる

**定義の確認**：$N_1=N_2=n>0$ なら $x_1=x_2=1/2$ なので、純物質の分離状態 $G_{\mathrm{sep}}=n\mu_1^*+n\mu_2^*$ と比較して

$$
G-G_{\mathrm{sep}}
=RT\left(n\ln\tfrac12+n\ln\tfrac12\right)
=-2nRT\ln2<0.
$$

全量を倍にすれば差も倍になり、示量性にも合います。
<!-- definition-example-end -->

<a id="prop-th7-mixing-chemical-potential"></a>

<!-- formal-statement-start -->
> **命題（理想混合の化学ポテンシャルと混合エントロピー）**  
> 前定義の模型で、$T,p$ と他成分の物質量を固定して $G$ を偏微分すると
>
$$
\mu_i=\mu_i^*+RT\ln x_i.
$$
>
> 純成分の分離状態と比較した混合自由エネルギーと混合エントロピーは
>
$$
\Delta_{\mathrm{mix}}G=RT\sum_iN_i\ln x_i\le0,\qquad
\Delta_{\mathrm{mix}}S=-R\sum_iN_i\ln x_i\ge0.
$$
>
> ここで純成分基準と同じ $T,p$ で比較し、理想混合項以外の混合寄与はないものとする。
<!-- formal-statement-end -->

### 証明の見取り図

$N_i\ln x_i$ をその項だけで微分すると誤ります。$x_1,x_2$ は両方とも全量 $N$ に依存するので、任意の基準物質量 $N_*>0$ を導入し、和を無次元量の対数で書いてから微分します。$N_*$ は最後に相殺されます。

<!-- proof-start -->
### 証明

$N=N_1+N_2$ より

$$
\sum_iN_i\ln x_i
=\sum_iN_i\ln\frac{N_i}{N_*}-N\ln\frac{N}{N_*}.
$$

$N_j$（$j\ne i$）を固定すると $\partial N/\partial N_i=1$ ですから

$$
\begin{aligned}
\frac{\partial}{\partial N_i}\sum_jN_j\ln x_j
&=\left(\ln\frac{N_i}{N_*}+1\right)
-\left(\ln\frac{N}{N_*}+1\right)\\
&=\ln\frac{N_i}{N}=\ln x_i.
\end{aligned}
$$

従って $G_{N_i}=\mu_i^*+RT\ln x_i$。各 $x_i$ は $0<x_i<1$ なので $\ln x_i<0$、ゆえに $\Delta_{\mathrm{mix}}G\le0$ です。さらに $\mu_i^*$ を固定された $(T,p)$ の滑らかな基準状態関数として、[自然変数の関係](../TH5/index.md#prop-th5-natural-variables) $S=-G_T|_{p,\boldsymbol N}$ を混合前後に適用します。$x_i$ は $T$ を固定した物質量座標のみの関数だから

$$
\begin{aligned}
\Delta_{\mathrm{mix}}S
&=-\left(\frac{\partial\,\Delta_{\mathrm{mix}}G}{\partial T}\right)_{p,\boldsymbol N}\\
&=-R\sum_iN_i\ln x_i\ge0.
\end{aligned}
$$

$\Delta_{\mathrm{mix}}H=\Delta_{\mathrm{mix}}G+T\Delta_{\mathrm{mix}}S=0$ もこの模型の帰結です。非理想混合では混合エンタルピーを零にできるとは限りません。
<!-- proof-end -->

### 混合曲率と安定性の関係

総量 $N$ を固定し、$N_1=Nx,N_2=N(1-x)$（$0<x<1$）とした組成関数は

$$
G(x)=N\{x\mu_1^*+(1-x)\mu_2^*
+RT[x\ln x+(1-x)\ln(1-x)]\}.
$$

一階微分と二階微分を順に取ると

$$
\begin{aligned}
G'(x)&=N\{\mu_1^*-\mu_2^*+RT\ln[x/(1-x)]\},\\
G''(x)&=NRT\left(\frac1x+\frac1{1-x}\right)>0.
\end{aligned}
$$

従って理想混合項は組成差を増やす変化に正の曲率を与えます。ただし**化学反応を許さなければ組成 $x$ は勝手に変わりません**。曲率は許容される移動や反応と組み合わせて平衡判定に使います。

## 6. 化学反応の平衡は一つの方向微分

化学反応では各成分の物質量が独立に変わるのではなく、反応式の係数が変化の比を決めます。反応物を負、生成物を正とする化学量論係数 $\nu_i$ を固定し、物質量の変化を表す一つのパラメータ $\xi$ を導入します。以下は一つの反応が進む単相・一定 $T,p$ の系です。

<a id="def-th7-reaction-extent"></a>

<!-- formal-statement-start -->
> **定義（反応進行度）**  
> 反応の各成分の化学量論係数を $\nu_i$ とし、基準物質量 $N_{i,0}$ からの変化を
>
$$
N_i(\xi)=N_{i,0}+\nu_i\xi
$$
>
> と置く。$\xi$ を反応進行度という。許容される $\xi$ は $N_i(\xi)\ge0$ および相の存在条件を満たす範囲とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th7-reaction-extent -->
### 例：反応式の係数を検算する

**定義の確認**：$A\rightleftharpoons B$ で $\nu_A=-1,\nu_B=1$ とすれば、初期量 $N_{A,0}=3$ mol、$N_{B,0}=1$ mol に対して $N_A=3-\xi$、$N_B=1+\xi$。総量は4 molで一定、両量が正の範囲は $-1<\xi<3$ です。端点は反応の向きに対する片側変化しか許されません。
<!-- definition-example-end -->

<a id="thm-th7-reaction-equilibrium"></a>

<!-- formal-statement-start -->
> **定理（化学反応平衡の条件）**  
> $T,p$ を固定し、許容される反応進行度の内部区間で $G(T,p,N_1(\xi),\ldots,N_r(\xi))$ が $C^2$ 級とする。内部局所最小では反応Gibbsエネルギー
>
$$
\Delta_{\mathrm r}G:=\sum_i\nu_i\mu_i=0
$$
>
> が必要である。停留点で
>
$$
\frac{d^2G}{d\xi^2}
=\sum_{i,j}\nu_i
\left(\frac{\partial\mu_i}{\partial N_j}\right)_{T,p,N_{k\ne j}}\nu_j>0
$$
>
> なら反応方向について厳密局所最小である。複数の独立反応がある場合は、許容反応部分空間での曲率を判定する。
<!-- formal-statement-end -->

### 証明の見取り図

[反応進行度](#def-th7-reaction-extent)で変わる量は $dN_i=\nu_i\,d\xi$ です。[相平衡で用いた自由エネルギーの微分](#thm-th7-phase-equilibrium)と同じ考え方を反応方向へ適用します。

<!-- proof-start -->
### 証明

[Gibbsポテンシャルの自然変数の微分](../TH5/index.md#prop-th5-natural-variables)を[多成分化学ポテンシャル](#def-th7-component-mu)へ拡張すると、$T,p$ 固定で $dG=\sum_i\mu_i\,dN_i$ です。また $dN_i/d\xi=\nu_i$ なので、連鎖律から

$$
\frac{dG}{d\xi}
=\sum_i\mu_i\frac{dN_i}{d\xi}
=\sum_i\nu_i\mu_i.
$$

$\xi$ が許容区間の内部の局所最小なら第一導関数は零です。もう一度微分して、$\nu_i$ が $\xi$ に依存しないことに注意すると

$$
\begin{aligned}
\frac{d^2G}{d\xi^2}
&=\sum_i\nu_i\frac{d\mu_i}{d\xi}\\
&=\sum_{i,j}\nu_i
\frac{\partial\mu_i}{\partial N_j}
\frac{dN_j}{d\xi}\\
&=\sum_{i,j}\nu_i
\frac{\partial\mu_i}{\partial N_j}\nu_j.
\end{aligned}
$$

一階微分が零、二階微分が正ならTaylor展開の二次項が正なので、十分小さい非零の反応進行度変化に対して $G$ は増加します。零曲率なら高次項を調べる必要があり、境界平衡なら片側微分で判定します。
<!-- proof-end -->

### 例：理想混合の $A\rightleftharpoons B$

[理想混合の化学ポテンシャル](#prop-th7-mixing-chemical-potential)を使うと、$\nu_A=-1,\nu_B=1$ より

$$
\Delta_{\mathrm r}G
=\mu_B^*-\mu_A^*+RT\ln\frac{x_B}{x_A}.
$$

$N_A,N_B>0$ で平衡なら

$$
\frac{N_B}{N_A}
=\exp\left(-\frac{\mu_B^*-\mu_A^*}{RT}\right).
$$

さらに $\xi$ を一つ増やせば $dN_A/d\xi=-1$、$dN_B/d\xi=1$、$dN/d\xi=0$。ゆえに

$$
\frac{d^2G}{d\xi^2}
=RT\left(\frac1{N_A}+\frac1{N_B}\right)>0.
$$

この模型では内部停留点が安定です。指数比だけを暗記するより、**反応進行度への微分と曲率**の二段階を確認してください。

## 7. 第三法則は何を保証し、何を保証しないか

ここまで使ったエントロピーは[TH4の可逆熱積分による状態量](../TH4/index.md#def-th4-entropy)でした。この方法だけでは加法定数が確定しません。絶対零度に近づく実在物質の振る舞いについて追加する経験的原理が、第三法則です。前節までの平衡・Clapeyron式の導出に第三法則を仮定したわけではありません。

<a id="principle-th7-third-law"></a>

<!-- formal-statement-start -->
> **原理（第三法則の完全結晶表示）**  
> 適切な平衡極限において、完全結晶について最低エネルギーをとる微視的配置が一つだけ存在し、残留配置エントロピーがない場合、エントロピーの基準を
>
$$
\lim_{T\downarrow0}S(T)=0
$$
>
> と取る。これは対象・極限・最低エネルギー配置の一意性を仮定した第三法則の表示であり、あらゆる物質・準安定状態でエントロピーが零になるという主張ではない。
<!-- formal-statement-end -->

同じ仮定の下で熱容量から絶対エントロピーを求めるには、[定圧熱容量の定義](../TH6/index.md#def-th6-response) $C_p=T(\partial S/\partial T)_{p,\boldsymbol N}$ を可逆な等圧単相経路へ適用します。$C_p(T)/T$ の零温度からの積分が収束する必要があり、途中で相転移を横切る場合はそのエントロピー跳躍も加えます。たとえば $C_p(T)=aT^3$（$a>0$）の範囲では

$$
S(T)-S(0)=\int_0^T\frac{C_p(t)}t\,dt
=\int_0^Ta t^2\,dt=\frac{aT^3}{3}.
$$

一方、1 mol の独立な構成単位がそれぞれ $q>1$ 通りの等価な配向を保持する、と**仮定した配置エントロピー模型**では、残留モルエントロピーを $s_{\mathrm{res}}=R\ln q>0$ と置けます。$q$ は各構成単位の選択肢の数であり、試料全体の配置数をそのまま $R\ln q$ の $q$ に代入するものではありません。この式の微視的導出は統計力学で扱います。ここでは「完全結晶・最低エネルギー配置の一意性」という仮定が失われるため、第三法則の表示と矛盾しないことを確認します。また $T=0$ での到達可能性や反応速度まで、この表示だけで証明したことにはなりません。

## 8. 演習：物質量の拘束を式に入れる

### Level A：定義から一度微分する

#### TH7-A1 多成分の偏微分

$N=N_1+N_2$、$U=aS^2/N+bN^2/V+c_1N_1+c_2N_2$、$a,b>0$ とする。$T,p,\mu_1,\mu_2$ を計算せよ。

- Level: A
- ID: TH7-A1

<!-- solution-start -->
**詳細解答**　[多成分化学ポテンシャルの定義](#def-th7-component-mu)に従います。$S,V,N_2$ を固定して $N_1$ を微分すると $\partial N/\partial N_1=1$ です。

$$
\begin{aligned}
U_S&=2aS/N,\\
U_V&=-bN^2/V^2,\\
U_{N_1}&=-aS^2/N^2+2bN/V+c_1,\\
U_{N_2}&=-aS^2/N^2+2bN/V+c_2.
\end{aligned}
$$

従って $T=2aS/N$、$p=bN^2/V^2$、$\mu_1,\mu_2$ は下二式です。$p=-U_V$ の負号を忘れないことが要点です。
<!-- solution-end -->

#### TH7-A2 二成分Gibbs–Duhem関係

固定 $T,p$ における二成分混合物の $N_1=2$ mol、$N_2=3$ mol とする。微小状態変化に沿って $d\mu_1=0.30$ J/mol なら $d\mu_2$ を求めよ（一次の微小変化として扱う）。

- Level: A
- ID: TH7-A2

<!-- solution-start -->
**詳細解答**　[多成分Gibbs–Duhem関係式](#thm-th7-gibbs-duhem)に $dT=dp=0$ を代入すると

$$
2\,d\mu_1+3\,d\mu_2=0.
$$

したがって $d\mu_2=-(2/3)\times0.30=-0.20$ J/mol です。ここで $N_i$ はこの微小変化を評価する状態の物質量です。
<!-- solution-end -->

#### TH7-A3 相間物質移動の符号

固定 $T,p$ で相 $\alpha,\beta$ に同じ成分があり、$\mu^\alpha=9$ J/mol、$\mu^\beta=5$ J/mol とする。$\beta$ から $\alpha$ へ正の $\xi$ を移すと $G$ は一次で増加するか、減少するか。

- Level: A
- ID: TH7-A3

<!-- solution-start -->
**詳細解答**　[相間移動の平衡条件の証明](#thm-th7-phase-equilibrium)と同じ座標で

$$
\frac{d\mathcal G}{d\xi}=\mu^\alpha-\mu^\beta
=9-5=4\ {\rm J/mol}>0.
$$

正の小さな移動は $G$ を増やします。従って自発的な低下方向は逆向き、すなわち $\alpha$ から $\beta$ です。値が異なるので内部平衡ではありません。
<!-- solution-end -->

#### TH7-A4 Clapeyron式の符号と数値

$T=300$ K において $\Delta s=20$ J/(mol K)、$\Delta v=0.010$ m$^3$/mol とする。共存線の $dp/dT$ と潜熱 $L$ を求めよ。

- Level: A
- ID: TH7-A4

<!-- solution-start -->
**詳細解答**　$\Delta v\ne0$ なので[Clapeyron式](#thm-th7-clapeyron)を適用します。

$$
\frac{dp}{dT}
=\frac{20}{0.010}
=2000\ {\rm Pa/K},\qquad
L=T\Delta s=300\times20=6000\ {\rm J/mol}.
$$

$1\ {\rm J/m^3}=1\ {\rm Pa}$ により圧力の単位が合います。両差が正なので傾きも正です。
<!-- solution-end -->

#### TH7-A5 理想混合の自由エネルギー

$N_1=N_2=1$ mol の理想二成分混合物について $\Delta_{\mathrm{mix}}G$ と $\Delta_{\mathrm{mix}}S$ を $R,T$ で表せ。

- Level: A
- ID: TH7-A5

<!-- solution-start -->
**詳細解答**　$x_1=x_2=1/2$ です。[理想混合の命題](#prop-th7-mixing-chemical-potential)へ各項を別々に代入すると

$$
\begin{aligned}
\Delta_{\mathrm{mix}}G
&=RT\{\ln(1/2)+\ln(1/2)\}=-2RT\ln2,\\
\Delta_{\mathrm{mix}}S
&=-R\{\ln(1/2)+\ln(1/2)\}=2R\ln2.
\end{aligned}
$$

$\ln2>0$ より自由エネルギー変化は負、エントロピー変化は正です。
<!-- solution-end -->

### Level B：制約と微分を接続する

#### TH7-B1 組成関数の凸性

$N>0$ を固定し、$\mu_1^*=\mu_2^*$ の理想混合物について、$G(x)$ が $0<x<1$ に唯一の最小を持つことを示せ。

- Level: B
- ID: TH7-B1

<!-- solution-start -->
**詳細解答**　[理想混合の定義](#def-th7-ideal-mixing)に $N_1=Nx$、$N_2=N(1-x)$ を代入し、基準項は共通の定数 $N\mu_1^*$ になります。

$$
G(x)=N\mu_1^*+NRT\{x\ln x+(1-x)\ln(1-x)\}.
$$

一階微分で $G'(x)=NRT\ln(x/(1-x))$、その零点は $x/(1-x)=1$、すなわち $x=1/2$ のみです。二階微分は

$$
G''(x)=NRT\left(\frac1x+\frac1{1-x}\right)>0
$$

なので $G'$ は狭義増加、唯一の停留点は全区間での厳密最小です。これを実際の平衡組成と解釈するには、組成変化を許す操作も必要です。
<!-- solution-end -->

#### TH7-B2 相が消える境界

一成分の移動座標を $N^\alpha=2+\xi$、$N^\beta=3-\xi$ とする。許容区間を両量非負として、$\xi=3$ が平衡のとき、$\mu^\alpha=\mu^\beta$ が必ず必要か。一次微分の符号で説明せよ。

- Level: B
- ID: TH7-B2

<!-- solution-start -->
**詳細解答**　非負条件 $2+\xi\ge0$、$3-\xi\ge0$ より $-2\le\xi\le3$ です。$\xi=3$ では正の方向に進めず、許される微小変化は $d\xi<0$ のみです。$\mathcal G$ の左微分が有限に存在し、両相の化学ポテンシャルが片側極限として定義できる場合、[移動の微分](#thm-th7-phase-equilibrium)は

$$
d\mathcal G=(\mu^\alpha-\mu^\beta)\,d\xi.
$$

端点から内側へ動くと $G$ が減らない必要条件は $d\mathcal G\ge0$ だから、$d\xi<0$ と合わせて $\mu^\alpha-\mu^\beta\le0$ です。等値は必要ではありません。ただし相 $\beta$ が消失した点で $\mu^\beta$ の枝を評価できない場合、片側微分の極限で判定する必要があります。内部点の微分可能性を仮定した等値条件をそのまま転用できません。
<!-- solution-end -->

#### TH7-B3 反応の平衡比と曲率

理想混合模型の $A\rightleftharpoons B$ について $\mu_B^*-\mu_A^*=RT\ln4$、$N_A+N_B=10$ mol とする。内部平衡の $N_A,N_B$ と、その点の $d^2G/d\xi^2$ を求めよ。

- Level: B
- ID: TH7-B3

<!-- solution-start -->
**詳細解答**　[反応平衡の条件](#thm-th7-reaction-equilibrium)と[理想混合の化学ポテンシャル](#prop-th7-mixing-chemical-potential)により

$$
\begin{aligned}
0&=\mu_B-\mu_A\\
&=RT\ln4+RT\ln(N_B/N_A)\\
&=RT\ln(4N_B/N_A).
\end{aligned}
$$

$RT>0$ なので $4N_B/N_A=1$、従って $N_A=4N_B$。総量から $N_B=2$ mol、$N_A=8$ mol です。反応進行度で $dN_A/d\xi=-1$、$dN_B/d\xi=1$ だから

$$
\frac{d^2G}{d\xi^2}
=RT\left(\frac{1}{8\ {\rm mol}}+\frac{1}{2\ {\rm mol}}\right)
=\frac{5RT}{8\ {\rm mol}}>0.
$$

各 $N_i$ を mol 単位の物質量として代入しました。$RT$ の単位は J/mol、括弧内は mol$^{-1}$ なので、曲率の単位は J/mol$^2$ です。
<!-- solution-end -->

#### TH7-B4 第三法則と熱容量

基準圧力で $C_p(T)=aT^3$（$a>0$）とし、$S(0)=0$ の条件を満たす完全結晶を考える。$S(T)$ を求め、$C_p(T)=b>0$ を零温度まで延長する模型と比較せよ。

- Level: B
- ID: TH7-B4

<!-- solution-start -->
**詳細解答**　[定圧熱容量の定義](../TH6/index.md#def-th6-response)によって、可逆等圧加熱では $dS=C_p(T)\,dT/T$。基準 $S(0)=0$ から

$$
S(T)=\int_0^T\frac{at^3}{t}\,dt
=a\int_0^Tt^2\,dt
=\frac{aT^3}{3}\longrightarrow0.
$$

一方、$C_p=b$ を $T=0$ まで延長すると形式上の積分は $\int_0^T b/t\,dt$ ですが、この広義積分は発散します。実際 $\varepsilon>0$ で切れば

$$
\int_\varepsilon^T\frac bt\,dt
=b(\ln T-\ln\varepsilon)\longrightarrow+\infty
\quad(\varepsilon\downarrow0).
$$

従って一定正熱容量模型を第三法則の完全結晶条件と同時に零温度まで適用することはできず、模型の適用範囲を変更する必要があります。
<!-- solution-end -->

### Level C：相平衡・潜熱・化学反応をつなぐ

#### TH7-C1 共存線と許容方向の微分

一成分の二相 $\alpha,\beta$ はある $(T_0,p_0)$ で共存し、$s^\alpha=10$、$s^\beta=30$ J/(mol K)、$v^\alpha=0.001$、$v^\beta=0.011$ m$^3$/mol とする。$T_0=400$ K とする。



1. この点の共存線の傾きと潜熱を求めよ。
2. 温度を $dT>0$ だけ変えるとき、共存を維持するための一次の $dp$ を求めよ。
3. 初期共存点のまま $p=p_0$ を固定して $T$ だけ上げたとき、どちらの相の化学ポテンシャルがより小さくなるかを一階で判定せよ。
4. この条件が化学反応平衡の $\sum_i\nu_i\mu_i=0$ と同じ「許容方向の微分」で表せることを説明せよ。

- Level: C
- ID: TH7-C1

<!-- solution-start -->
**詳細解答**　各相は初期共存点の近傍で滑らかな単相枝を持つとします。(1) [Clapeyron式](#thm-th7-clapeyron)に用いる差は

$$
\Delta s=30-10=20,\qquad
\Delta v=0.011-0.001=0.010.
$$

従って

$$
\frac{dp}{dT}=\frac{20}{0.010}
=2000\ {\rm Pa/K},\qquad
L=T_0\Delta s=400\times20=8000\ {\rm J/mol}.
$$

(2) 共存線上では $d\mu^\beta-d\mu^\alpha=0$ なので

$$
0=-\Delta s\,dT+\Delta v\,dp
=-20\,dT+0.010\,dp.
$$

よって一次の関係は $dp=2000\,dT$ です。温度変化を K、圧力変化を Pa として解釈します。

(3) $dp=0$ なら同じ式の左辺は

$$
d(\mu^\beta-\mu^\alpha)
=-20\,dT<0.
$$

初期点では $\mu^\beta-\mu^\alpha=0$ でしたから、十分小さい正の $dT$ に対し $\mu^\beta<\mu^\alpha$ となります。従って物質を $\alpha$ から $\beta$ へ移すとGibbs自由エネルギーが下がります。

(4) [相間移動の座標](#def-th7-transfer-coordinate)で $\alpha\to\beta$ の移動を $\xi$ とすれば $dN^\alpha/d\xi=-1$、$dN^\beta/d\xi=1$ です。したがって[反応平衡の方向微分](#thm-th7-reaction-equilibrium)と全く同様に

$$
\frac{dG_{\rm total}}{d\xi}
=(-1)\mu^\alpha+(1)\mu^\beta
=\mu^\beta-\mu^\alpha.
$$

共存時にはこれが零、(3) の温度変化後には負です。化学量論ベクトル $(-1,1)$ と相間移動の保存制約は、同じ線形代数的形を持ちます。ただし共存線に沿う $dp/dT$ の計算と、固定した $T,p$ での物質移動は**別の微分操作**であることを区別します。
<!-- solution-end -->

## 9. 次への道筋

多成分の化学ポテンシャルは、混合・移動・反応を一つの「許容方向のGibbs自由エネルギーの微分」にまとめました。しかし相の種類そのものが変わる境界では滑らかな枝の選択が変わり、体積・エントロピーの飛びや連続的な対称性の変化が現れます。TH8では相転移の次数、磁化と外場、Landau自由エネルギーへ進みます。
