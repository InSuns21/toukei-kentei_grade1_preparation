# PML1-08 Langevin方程式に何のノイズが必要か

<!-- definition-example-audit: strict -->

[PML1-07 の勾配流](../PML1-07/index.md#def-pml1-07-gradient-flow)は、損失 $f$ を減らす決定論的な運動だった。現実の熱運動や確率的な探索では、小さな時間間隔にも状態が揺らぐ。単に「ノイズを加える」と言うだけでは、揺らぎの大きさ・方向・時間刻みへの依存が決まらない。ここでは**何を固定すると、どのノイズ係数が必要になるか**を、方程式と二次模型の計算で区別する。

本章では有限次元 $\mathbb R^d$（$d\ge1$）で考え、$f$ の勾配を取る変数を $x$、時間を $t$ とする。$M$ は移動の速さを方向別に決める**移動度**、$\tau>0$ は損失と同じ尺度を持つ**温度パラメータ**である。$\beta=1/\tau$ を逆温度と書く。物理的温度 $T_{\mathrm{phys}}$ を使うなら $\tau=k_{\mathrm B}T_{\mathrm{phys}}$ に相当するが、機械学習では $\tau$ は人工的に指定する場合もある。

## 1. 白色雑音は「各瞬間の普通の乱数」ではない

滑らかな勾配流の速度に、毎時刻独立の有限分散乱数をそのまま加えると、時間刻みを細かくしたときの揺らぎの意味が定まらない。連続時間で必要なのは、時刻間の**増分**に分散が時間幅に比例する確率過程である。

[STO7 の多次元ブラウン運動](../../../解析系/STO/STO7/index.md#def-sto7-vector-brownian) $W_t\in\mathbb R^r$ は、$W_0=0$、独立な時間増分をもち、$W_{t+h}-W_t$ の平均が $0$、分散共分散行列が $hI_r$ となる。したがって $h>0$ に対して

$$
W_{t+h}-W_t\sim N(0,hI_r),
\qquad
\mathbb E[(W_{t+h}-W_t)(W_{t+h}-W_t)^\mathsf T]=hI_r.
$$

$N(0,hI_r)$ は平均 $0$、分散共分散行列 $hI_r$ の正規分布を表す。この増分の大きさは典型的に $\sqrt h$ であって $h$ ではない。「白色雑音 $\dot W$」は通常の時間微分として存在しないため、本章では $dW_t$ と書き、[STO9 のブラウン確率微分方程式](../../../解析系/STO/STO9/index.md#def-sto9-sde)の**積分形**で解釈する。

## 2. 過減衰Langevin方程式のドリフトと拡散

決定論的な運動 $-\nabla f$ に、行列 $M$ で方向別の動きやすさを与えると、速度は $-M\nabla f$ となる。この決定論的な項を**ドリフト**と呼び、ブラウン増分に掛かる $d\times r$ 行列 $\Sigma$ を**拡散係数**と呼ぶ。拡散係数 $\Sigma$ 自体と、短時間増分の分散共分散行列 $\Sigma\Sigma^\mathsf T$ は区別する。

この行列積が現れる理由を確かめる。$\Delta W_t=W_{t+h}-W_t$ と置くと、$r$ 次元ブラウン増分の共分散は $hI_r$ である。拡散係数を掛けた変位 $\Sigma\Delta W_t\in\mathbb R^d$ について、転置を取る順序に注意して

$$
\begin{aligned}
\mathbb E\!\left[(\Sigma\Delta W_t)(\Sigma\Delta W_t)^\mathsf T\right]
&=\Sigma\,\mathbb E[\Delta W_t\Delta W_t^\mathsf T]\,\Sigma^\mathsf T\\
&=h\Sigma I_r\Sigma^\mathsf T
=h\Sigma\Sigma^\mathsf T.
\end{aligned}
$$

従って $\Sigma\Sigma^\mathsf T$ は**単位時間当たりのブラウン駆動部分の共分散**を表す。ドリフトによる変位は時間幅 $h$ の一次の大きさで、共分散を $h$ で割った極限では二次変動を作るブラウン項だけが残る。この対応を用いて、以下では $A=\Sigma\Sigma^\mathsf T$ を局所分散共分散行列と呼ぶ。

<a id="def-pml1-08-overdamped"></a>

<!-- formal-statement-start -->
> **定義（過減衰Langevin方程式）**  
> $f:\mathbb R^d\to\mathbb R$ を $C^2$ 級で、その勾配が大域 Lipschitz 連続である関数とする。$M\in\mathbb R^{d\times d}$ は定数の実対称正定値行列、$\Sigma\in\mathbb R^{d\times r}$ は定数行列、$W$ は $r$ 次元標準ブラウン運動とする。初期値 $X_0=x_0\in\mathbb R^d$ を固定し、

$$
dX_t=-M\nabla f(X_t)\,dt+\Sigma\,dW_t
$$

> を本章の**過減衰Langevin型方程式**という。これはすべての $t\ge0$ について

$$
X_t=x_0-\int_0^t M\nabla f(X_s)\,ds
+\int_0^t\Sigma\,dW_s
$$

> を満たす連続適合過程 $X$ を探す、という意味である。ドリフトは $b(x)=-M\nabla f(x)$、拡散係数は $\Sigma$、局所分散共分散行列は $A=\Sigma\Sigma^\mathsf T$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-08-overdamped -->
**定義の確認**：$d=r=1$、$f(x)=\lambda x^2/2$（$\lambda>0$）、$M=(m)$（$m>0$）、$\Sigma=(\nu)$ とする。$f'(x)=\lambda x$ は大域 Lipschitz 連続（定数 $\lambda$）で、$f$ は $C^2$ 級である。$M^\mathsf T=M$、非零 $v$ に対して $v^\mathsf TMv=mv^2>0$ だから正定値である。$\Sigma$ は実 $1\times1$ 行列で、$A=\nu^2$。よって

$$
dX_t=-m\lambda X_t\,dt+\nu\,dW_t
$$

は定義のすべての係数条件を満たす。$\nu=0$ もこの一般形には含まれ、その場合は[PML1-07 の定数移動度の勾配系](../PML1-07/index.md#def-pml1-07-mobility)へ戻る。
<!-- definition-example-end -->

大域 Lipschitz 条件の下では $b$ も大域 Lipschitz で、定数 $\Sigma$ は自動的に大域 Lipschitz かつ線形成長を満たす。[STO9 の大域 Lipschitz SDE の存在・一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)を、$b=-M\nabla f$、$\sigma(x)=\Sigma$、二乗可積分な確定初期値 $x_0$ に適用でき、全時刻に一意な強解が存在する。この条件を落とした一般の非凸損失では、非爆発性を無条件に主張できない。

## 3. 温度を指定するとノイズ共分散が決まる

過減衰Langevin型という方程式の**形**だけでは、$\nu$ や $\Sigma$ は決まらない。移動度 $M$ と温度 $\tau$ を与え、平衡分布を $e^{-f/\tau}$ に対応させたいときに、次の**揺動散逸の係数関係**を課す。これは熱浴の模型化に必要な条件であって、この指数形の密度が正規化可能で、その確率分布が不変になるとの結論はまだ含まない。

<a id="def-pml1-08-thermal-matching"></a>

<!-- formal-statement-start -->
> **定義（温度と移動度に整合する熱雑音）**  
> $d\ge1$、$\tau>0$、実対称正定値な定数行列 $M\in\mathbb R^{d\times d}$ に対し、定数拡散係数 $\Sigma\in\mathbb R^{d\times r}$ が

$$
\Sigma\Sigma^\mathsf T=2\tau M
$$

> を満たすとき、温度 $\tau$ と移動度 $M$ に**整合する熱雑音**という。この関係は $\Sigma$ そのものの一意性を要求せず、短時間増分の分散共分散行列を指定する。$M=I_d$ のとき $\Sigma=\sqrt{2\tau}\,I_d$ は一つの選択である。
<!-- formal-statement-end -->

正定値な $M$ では $2\tau M$ の階数は $d$ である。一方、$\Sigma\Sigma^\mathsf T$ の階数は $\Sigma$ の列数 $r$ 以下なので、熱雑音整合には $r\ge d$ が必要である。以下の例は $r=d$ とした具体的な構成である。

<!-- definition-example-start: def-pml1-08-thermal-matching -->
**定義の確認**：$d=r=2$、$M=\operatorname{diag}(1,4)$、$\tau=3$ と置く。$M$ は対称で、非零 $v$ に対して $v^\mathsf TMv=v_1^2+4v_2^2>0$。ここで

$$
\Sigma=\operatorname{diag}(\sqrt6,\sqrt{24})
$$

と取ると、$\Sigma\Sigma^\mathsf T=\operatorname{diag}(6,24)=2\tau M$ になる。実際、ブラウン増分の各成分は互いに独立で分散 $h$ なので、拡散項の二方向の増分は $(\sqrt6\,\Delta W_t^1,\sqrt{24}\,\Delta W_t^2)$ であり、その分散はそれぞれ $6h,24h$、共分散は $0$ である。これを $h$ で割った行列が、定義で比較した $\operatorname{diag}(6,24)$ にほかならない。両方向に同じ係数 $\sqrt6$ を置くと $\Sigma\Sigma^\mathsf T=6I_2$ となり、第二方向で $2\tau M$ と一致しない。
<!-- definition-example-end -->

一次元で $M=m$、$\Sigma=\nu$ なら条件は $\nu^2=2m\tau$。従って $\nu=\sqrt{2m\tau}$ または $-\sqrt{2m\tau}$ を選べる。負号はブラウン運動の符号変更であり、**分散は同じ**である。物理的な温度と移動度の双方を指定しないまま「必要な雑音の強さ」を一意に答えることはできない。

## 4. 生成作用素はドリフトと二次変動を別々に記録する

確率軌道そのものを各時刻で追う代わりに、滑らかな観測量 $\varphi(X_t)$ の期待値が短時間にどう変化するかを調べる。[STO11 の生成作用素](../../../解析系/STO/STO11/index.md#def-sto11-generator)は、その変化率を状態 $x$ の関数として取り出す道具である。

<a id="prop-pml1-08-generator"></a>

<!-- formal-statement-start -->
> **命題（過減衰Langevin型拡散の生成作用素）**  
> [過減衰Langevin型方程式](#def-pml1-08-overdamped)の係数を仮定し、$X_0=x$ とする。$\varphi\in C_c^2(\mathbb R^d)$（二階まで連続微分可能で、ある有界領域の外ではゼロの関数）に対し、生成作用素は

$$
(L\varphi)(x)
=-M\nabla f(x)\cdot\nabla\varphi(x)
+\frac12\operatorname{tr}\bigl(\Sigma\Sigma^\mathsf T\nabla^2\varphi(x)\bigr).
$$

> さらに [熱雑音の整合条件](#def-pml1-08-thermal-matching)が成り立てば、

$$
(L\varphi)(x)
=-M\nabla f(x)\cdot\nabla\varphi(x)
+\tau\operatorname{tr}\bigl(M\nabla^2\varphi(x)\bigr)
$$

> となる。ここで $\nabla^2\varphi$ は $d\times d$ Hessian 行列、$\operatorname{tr}$ は対角成分の和である。
<!-- formal-statement-end -->

### 証明の見取り図

[STO7 の多次元Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)では、一階微分にドリフトが掛かり、二階微分に二次変動が掛かる。ブラウン運動の共変分から $A=\Sigma\Sigma^\mathsf T$ が二階項に現れる。これが時間増分の平均だけを見ていては分からない修正である。

<!-- proof-start -->
### 証明

状態の座標成分を $X^i$（$1\le i\le d$）、ブラウン運動の成分を $W^\alpha$（$1\le\alpha\le r$）と書く。[STO9 の積分形SDE](../../../解析系/STO/STO9/index.md#def-sto9-sde)によると、各座標の方程式は

$$
dX^i=b_i(X)\,dt+\sum_{\alpha=1}^r\Sigma_{i\alpha}\,dW^\alpha
$$

となる。以降は $i,j$ を状態座標、$\alpha,\beta$ をブラウン運動の成分の添字とする。状態変数 $x$ についての一階・二階偏微分を

$$
\partial_i\varphi=\frac{\partial\varphi}{\partial x_i},
\qquad
\partial_{ij}\varphi=\frac{\partial^2\varphi}{\partial x_i\partial x_j}
$$

と書く。

[STO7 の多次元ブラウン運動の共変分命題](../../../解析系/STO/STO7/index.md#prop-sto7-vector-brownian-covariation)から $[W^\alpha,W^\beta]_t=\delta_{\alpha\beta}t$ である。従って

$$
d[X^i,X^j]_t
=\sum_{\alpha,\beta}\Sigma_{i\alpha}\Sigma_{j\beta}
\,d[W^\alpha,W^\beta]_t
=\sum_{\alpha=1}^r\Sigma_{i\alpha}\Sigma_{j\alpha}\,dt
=A_{ij}\,dt.
$$

[多次元Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)に $\varphi$ を代入すると

$$
d\varphi(X_t)
=\sum_i\partial_i\varphi(X_t)b_i(X_t)\,dt
+\sum_{i,\alpha}\partial_i\varphi(X_t)\Sigma_{i\alpha}\,dW_t^\alpha
+\frac12\sum_{i,j}A_{ij}\partial_{ij}\varphi(X_t)\,dt.
$$

$\varphi$ の一階・二階導関数は有界で、ドリフトは線形成長だから、固定有限時間区間の期待値積分は[STO9 の二次モーメント評価](../../../解析系/STO/STO9/index.md#prop-sto9-moment-estimate)で制御される。確率積分の期待値は $0$ である。$t$ で積分し期待値を取ると

$$
\mathbb E_x\varphi(X_t)-\varphi(x)
=\int_0^t\mathbb E_x\!\left[
 b(X_s)\cdot\nabla\varphi(X_s)
+\frac12\sum_{i,j}A_{ij}\partial_{ij}\varphi(X_s)
\right]ds.
$$

$t\downarrow0$ での極限も確認する。積分形を二つの項に分け、Cauchy--Schwarzの不等式とブラウン確率積分の等長性を適用すると

$$
\mathbb E_x\|X_t-x\|^2
\le 2t\int_0^t\mathbb E_x\|b(X_s)\|^2\,ds
+2t\|\Sigma\|_{\mathrm F}^2\longrightarrow0.
$$

右辺第一項の積分は、[STO9 の有限時間二次モーメント評価](../../../解析系/STO/STO9/index.md#prop-sto9-moment-estimate)とドリフトの線形成長条件により、$0\le t\le1$ で定数の $t^2$ 倍以下となる。ここで $\|\Sigma\|_{\mathrm F}^2$ は行列成分の二乗和である。

期待値の被積分関数

$$
G(y)=b(y)\cdot\nabla\varphi(y)
+\frac12\sum_{i,j}A_{ij}\partial_{ij}\varphi(y)
$$

は、$\varphi$ の導関数がコンパクトな台を持つので有界連続である。$X_s$ が初期点 $x$ に近づくことから、$s\downarrow0$ で $\mathbb E_xG(X_s)\to G(x)$。時間平均も同じ極限を持つため、上の積分を $t$ で割った極限は $G(x)$ となる。

この計算は[STO11 のItô拡散の生成作用素命題](../../../解析系/STO/STO11/index.md#prop-sto11-diffusion-generator)の具体的な代入でもある。最後にドリフトと共分散の値

$$
b=-M\nabla f,\qquad A=2\tau M
$$

を入れれば、命題の二式を得る。
<!-- proof-end -->

**一変数での見方**：$f(x)=\lambda x^2/2$、$M=m$、$\Sigma=\nu$ なら

$$
(L\varphi)(x)=-m\lambda x\varphi'(x)+\frac{\nu^2}{2}\varphi''(x).
$$

$\varphi(x)=x$、$x^2$ はコンパクトな台を持たないが、この線形方程式は有限時間のすべての多項式モーメントが存在するため、同じItô計算を直接適用できる。これより

$$
Lx=-m\lambda x,\qquad
L(x^2)=-2m\lambda x^2+\nu^2.
$$

すなわち平均を引き戻す項と、二乗の期待値を押し上げる項を区別できる。

## 5. 二次損失では揺らぎの大きさを厳密に測れる

定数係数の一次元模型は、Langevin方程式の重要な検算台になる。$f(x)=\lambda x^2/2$、$\lambda,m,\tau>0$ とし、熱雑音の係数を $\nu=\sqrt{2m\tau}$ と選ぶ。方程式は

$$
dX_t=-aX_t\,dt+\sqrt{2m\tau}\,dW_t,
\qquad a=m\lambda>0.
$$

平均は原点へ戻るが、揺らぎは消えない。これを計算で確認する。

<a id="thm-pml1-08-quadratic"></a>

<!-- formal-statement-start -->
> **定理（二次模型の明示解・平均・分散）**  
> $m,\lambda,\tau>0$、確定初期値 $X_0=x_0\in\mathbb R$ とする。一次元標準ブラウン運動 $W$ に対する

$$
dX_t=-m\lambda X_t\,dt+\sqrt{2m\tau}\,dW_t
$$

> の唯一の強解は

$$
X_t=e^{-m\lambda t}x_0
+\sqrt{2m\tau}\int_0^t e^{-m\lambda(t-s)}\,dW_s.
$$

> 各 $t\ge0$ で $X_t$ は正規分布に従い、

$$
\mathbb E X_t=x_0e^{-m\lambda t},
\qquad
\operatorname{Var}(X_t)=\frac{\tau}{\lambda}
\left(1-e^{-2m\lambda t}\right).
$$

> 特に $t\to\infty$ で平均は $0$、分散は $\tau/\lambda$ に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

時間とともに変わる積分因子 $e^{at}$ を掛けると、ドリフト $-aX_t$ と積の微分による $aX_t$ が打ち消し合う。残るブラウン積分について平均 $0$、[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)から分散を出す。

<!-- proof-start -->
### 証明

$a=m\lambda$、$\nu=\sqrt{2m\tau}$ とする。[STO7 の時間依存Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $g(t,x)=e^{at}x$ に適用する。$\partial_tg=ae^{at}x$、$\partial_xg=e^{at}$、$\partial_{xx}g=0$ より、

$$
d(e^{at}X_t)
=ae^{at}X_t\,dt+e^{at}(-aX_t\,dt+\nu\,dW_t)
=\nu e^{at}\,dW_t.
$$

区間 $[0,t]$ で積分すると

$$
e^{at}X_t=x_0+\nu\int_0^t e^{as}\,dW_s,
$$

従って両辺に $e^{-at}$ を掛けて明示解を得る。積分核は決定論的な二乗可積分関数であり、[STO6 の決定論的被積分過程のGaussian性](../../../解析系/STO/STO6/index.md#prop-sto6-deterministic-gaussian)により積分は中心正規分布となる。期待値は $0$ なので平均が得られる。

分散は[STO6 のItô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)を $s\mapsto\nu e^{-a(t-s)}$ に適用して、

$$
\begin{aligned}
\operatorname{Var}(X_t)
&=\nu^2\int_0^t e^{-2a(t-s)}\,ds\\
&=\nu^2\int_0^t e^{-2au}\,du\\
&=\frac{\nu^2}{2a}(1-e^{-2at})\\
&=\frac{2m\tau}{2m\lambda}(1-e^{-2m\lambda t})
=\frac{\tau}{\lambda}(1-e^{-2m\lambda t}).
\end{aligned}
$$

$a>0$ だから指数項は $t\to\infty$ で消える。強解の存在・一意性は[STO9 の大域Lipschitz存在・一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)から従う。
<!-- proof-end -->

この計算の重要な点は、**移動度 $m$ は分布の分散の極限値ではなく、そこへ近づく速さ $m\lambda$ に効く**ことである。ただし温度を固定した熱雑音整合の下での結論であり、任意のノイズ係数では成り立たない。

### ノイズを間違えると何が変わるか

<a id="prop-pml1-08-mismatch"></a>

<!-- formal-statement-start -->
> **命題（二次模型のノイズ係数の不整合）**  
> $m,\lambda>0$、$\nu\in\mathbb R$、$X_0=x_0$ とする。方程式

$$
dX_t=-m\lambda X_t\,dt+\nu\,dW_t
$$

> の分散は

$$
\operatorname{Var}(X_t)
=\frac{\nu^2}{2m\lambda}
(1-e^{-2m\lambda t}).
$$

> 従って分散の極限が $\tau/\lambda$（$\tau>0$）に等しいための必要十分条件は $\nu^2=2m\tau$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前定理の積分因子計算は $\nu$ の符号や熱雑音整合を使わない。よって $X_t=e^{-at}x_0+\nu\int_0^t e^{-a(t-s)}dW_s$。同じItô等長性で

$$
\operatorname{Var}(X_t)
=\nu^2\int_0^t e^{-2a(t-s)}\,ds
=\frac{\nu^2}{2a}(1-e^{-2at}).
$$

$a=m\lambda>0$ として極限を取り、$\nu^2/(2m\lambda)=\tau/\lambda$ の両辺に $2m\lambda$ を掛けると $\nu^2=2m\tau$。逆にこの等式を代入すれば極限は $\tau/\lambda$ となる。
<!-- proof-end -->

例えば $m=2$、$\lambda=3$、指定温度 $\tau=4$ なら正しい係数の二乗は $16$。もし誤って $\nu^2=2\tau=8$ とすると、分散の極限は $8/(2\cdot2\cdot3)=2/3$ で、本来の $\tau/\lambda=4/3$ の半分となる。移動度をノイズに反映しなかったことが原因である。

## 6. 損失の期待値さえ単調とは限らない

前章では勾配流の損失は時間とともに減少した。しかし確率軌道に対して単純に同じ式を当てはめると、二次変動由来の正の項を落としてしまう。

<a id="prop-pml1-08-energy"></a>

<!-- formal-statement-start -->
> **命題（二次Langevin模型の期待損失）**  
> $\lambda,m,\tau>0$、$f(x)=\lambda x^2/2$ とし、$X$ は[二次模型の定理](#thm-pml1-08-quadratic)の解とする。このとき

$$
\mathbb E f(X_t)
=\frac{\lambda x_0^2}{2}e^{-2m\lambda t}
+\frac{\tau}{2}(1-e^{-2m\lambda t}).
$$

> 特に $x_0=0$ の場合、$\mathbb E f(X_t)$ は $t>0$ で厳密に増加する。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathbb E X_t^2=(\mathbb E X_t)^2+\operatorname{Var}(X_t)$ を使い、前定理の平均・分散をそれぞれ代入する。確率的な探索では「勾配を下るドリフト」と「揺らぎによる二次の増加」が競合する。

<!-- proof-start -->
### 証明

[二次模型の平均・分散](#thm-pml1-08-quadratic)から

$$
\mathbb E X_t^2
=x_0^2e^{-2m\lambda t}
+\frac{\tau}{\lambda}(1-e^{-2m\lambda t}).
$$

両辺に $\lambda/2$ を掛けると主張の式である。$x_0=0$ なら

$$
\frac{d}{dt}\mathbb E f(X_t)
=\frac{\tau}{2}(2m\lambda)e^{-2m\lambda t}
=m\lambda\tau e^{-2m\lambda t}>0
$$

がすべての有限時刻で成り立つ。これは[前章の決定論的散逸恒等式](../PML1-07/index.md#thm-pml1-07-dissipation)の前提「確率雑音なし」を失ったときに、その証明の連鎖律へ二次変動補正が入るためである。
<!-- proof-end -->

一般の $f\in C^2$ についても、[過減衰Langevin型拡散の生成作用素](#prop-pml1-08-generator)の式を（適切なモーメント・可積分条件の下で）$\varphi=f$ に適用すれば

$$
Lf=-\nabla f^\mathsf TM\nabla f
+\tau\operatorname{tr}(M\nabla^2f)
$$

となる。第一項は非正だが、第二項は符号が定まらない。なお、この等式は $f$ が必ずコンパクトな台を持つという意味ではなく、一般の $f$ への適用時にはItô積分の可積分性を別途検証する必要がある。二次模型ではこの条件を満たす。

## 7. 二方向の雑音は独立でも強さが同じとは限らない

$f(x,y)=(2x^2+3y^2)/2$、$M=\operatorname{diag}(1,4)$、$\tau=3$ とすると、対応する拡散係数の一例は $\Sigma=\operatorname{diag}(\sqrt6,\sqrt{24})$。独立な二成分ブラウン運動 $W^1,W^2$ で

$$
dX_t=-2X_t\,dt+\sqrt6\,dW_t^1,
\qquad
dY_t=-12Y_t\,dt+\sqrt{24}\,dW_t^2.
$$

[二次模型の定理](#thm-pml1-08-quadratic)を各座標へ適用すると、確定初期値 $(x_0,y_0)$ に対して

$$
\begin{aligned}
\mathbb E X_t&=x_0e^{-2t},&
\operatorname{Var}(X_t)&=\frac32(1-e^{-4t}),\\
\mathbb E Y_t&=y_0e^{-12t},&
\operatorname{Var}(Y_t)&=1-e^{-24t}.
\end{aligned}
$$

二方向の極限分散は $\tau/2=3/2$ と $\tau/3=1$ で異なる。これは移動度の違いだけではなく、損失の曲率が異なるためである。一方、拡散係数を変えることで短時間の分散共分散を $2\tau M$ に合わせる点は、どちらの方向でも同じである。

本章では二次模型の極限分布まで計算した。**一般の $f$ で $e^{-f/\tau}$ に比例する密度が不変確率密度となるための正規化・境界流束・非爆発性**はPML1-09で検討する。また、本章の式をそのまま有限刻みの数値更新へ置き換えると定常分散に刻み幅依存の偏りが現れるが、それはPML1-11で扱う。

## 8. 演習 Level A

<a id="ex-pml1-08-a01"></a>
### PML1-08-A01 時間刻みとブラウン増分

- Level: A

一次元標準ブラウン運動について、長さ $h$ の増分の平均・分散・標準偏差を求めよ。$h=1/100$ と $h=1/10000$ を比較し、標準偏差が $h$ に比例しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

[STO7 の多次元ブラウン運動](../../../解析系/STO/STO7/index.md#def-sto7-vector-brownian)から、$\Delta W:=W_{t+h}-W_t$ と置けば $\Delta W\sim N(0,h)$ であり、

$$
\mathbb E\Delta W=0,\quad
\operatorname{Var}(\Delta W)=h,\quad
\operatorname{SD}(\Delta W)=\sqrt h.
$$

$h=1/100$ の標準偏差は $1/10$、$h=1/10000$ では $1/100$。時間刻みは $1/100$ 倍だが標準偏差は $1/10$ 倍である。分散が独立な時間増分で足し合わされるためには $\operatorname{Var}(\Delta W)=h$ としなければならず、その平方根が典型的な増分幅になる。
<!-- solution-end -->

<a id="ex-pml1-08-a02"></a>
### PML1-08-A02 一次元のドリフトと生成作用素

- Level: A

$f(x)=2x^2$、$M=3$、$\tau=2$ として、熱雑音整合の拡散係数の絶対値、ドリフト、生成作用素 $L\varphi$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$f'(x)=4x$ なので $b(x)=-Mf'(x)=-12x$。整合条件は $\nu^2=2m\tau=2\cdot3\cdot2=12$、従って $|\nu|=\sqrt{12}=2\sqrt3$ である。[生成作用素](#prop-pml1-08-generator)に代入して

$$
(L\varphi)(x)=(-12x)\varphi'(x)
+\frac{12}{2}\varphi''(x)
=-12x\varphi'(x)+6\varphi''(x).
$$

係数 $6$ を $12$ にしてしまう誤りはItô公式の二階項の $1/2$ を落としたことに対応する。
<!-- solution-end -->

<a id="ex-pml1-08-a03"></a>
### PML1-08-A03 二次模型の分散の極限

- Level: A

$m=1$、$\lambda=2$、$\tau=6$、$x_0=5$ の熱雑音整合模型で、$t$ 時刻の平均・分散とそれらの極限を求めよ。

<!-- solution-start -->
#### 詳細解答

[二次模型の定理](#thm-pml1-08-quadratic)で $m\lambda=2$、$\tau/\lambda=3$ なので

$$
\mathbb E X_t=5e^{-2t},\qquad
\operatorname{Var}(X_t)=3(1-e^{-4t}).
$$

指数関数が $t\to\infty$ で $0$ へ近づくので、平均の極限は $0$、分散の極限は $3$ となる。初期位置は平均に影響するが、分散は確定初期値の場合 $x_0$ に依存しない。
<!-- solution-end -->

<a id="ex-pml1-08-a04"></a>
### PML1-08-A04 間違った雑音を診断する

- Level: A

$m=5$、$\lambda=2$、指定温度 $\tau=3$ とする。誤って $\nu=2$ を採用したときの二次模型の極限分散と、整合する場合の極限分散を比較せよ。

<!-- solution-start -->
#### 詳細解答

[不整合の命題](#prop-pml1-08-mismatch)より、誤った場合の分散は

$$
\frac{\nu^2}{2m\lambda}=\frac{4}{2\cdot5\cdot2}=\frac15.
$$

整合する場合は $\nu^2=2m\tau=30$ なので、極限分散は

$$
\frac{30}{2\cdot5\cdot2}=\frac32=\frac{\tau}{\lambda}.
$$

違いは $1/5$ と $3/2$ であり、$\nu=2$ では指定した温度 $3$ の模型を再現しない。
<!-- solution-end -->

<a id="ex-pml1-08-a05"></a>
### PML1-08-A05 行列の熱雑音整合を判定する

- Level: A

$M=\operatorname{diag}(2,5)$、$\tau=1$、$\Sigma=\operatorname{diag}(2,\sqrt{10})$ の場合、移動度の正定値性と熱雑音整合をそれぞれ検査せよ。

<!-- solution-start -->
#### 詳細解答

$M$ は対称であり、非零 $v=(v_1,v_2)$ に対して

$$
v^\mathsf TMv=2v_1^2+5v_2^2>0
$$

だから正定値である。一方、

$$
\Sigma\Sigma^\mathsf T=\operatorname{diag}(4,10),
\qquad
2\tau M=\operatorname{diag}(4,10).
$$

両行列が等しいため[熱雑音の定義](#def-pml1-08-thermal-matching)を満たす。「$\Sigma=2\tau M$」という判定ではなく、必ず積 $\Sigma\Sigma^\mathsf T$ を比較する。
<!-- solution-end -->

## 9. 演習 Level B

<a id="ex-pml1-08-b01"></a>
### PML1-08-B01 異方二次模型の二つの時間尺度

- Level: B

$f(x,y)=(2x^2+3y^2)/2$、$M=\operatorname{diag}(1,4)$、$\tau=3$、初期値 $(1,2)$ で熱雑音整合する対角拡散係数を選び、$L\varphi$ と二成分の平均・分散を計算せよ。

<!-- solution-start -->
#### 詳細解答

$M$ は実対称正定値（$v^\mathsf TMv=v_1^2+4v_2^2>0$）で、$\nabla f=(2x,3y)$。整合する対角 $\Sigma$ の二乗成分は $2\tau M=\operatorname{diag}(6,24)$ なので $\Sigma=\operatorname{diag}(\sqrt6,\sqrt{24})$ を選ぶ。ドリフトは $-M\nabla f=(-2x,-12y)$。生成作用素は

$$
L\varphi=-2x\partial_x\varphi-12y\partial_y\varphi
+3\partial_{xx}\varphi+12\partial_{yy}\varphi.
$$

[二次模型の定理](#thm-pml1-08-quadratic)を各独立な座標へ適用する。第一座標は $m=1,\lambda=2,\tau=3,x_0=1$、第二座標は $m=4,\lambda=3,\tau=3,y_0=2$ だから

$$
\begin{aligned}
\mathbb E X_t&=e^{-2t},&
\operatorname{Var}(X_t)&=\frac32(1-e^{-4t}),\\
\mathbb E Y_t&=2e^{-12t},&
\operatorname{Var}(Y_t)&=1-e^{-24t}.
\end{aligned}
$$

二つの減衰率は $2,12$ であり、極限分散は $3/2,1$ である。減衰率と分散を決める物理量は同じではない。
<!-- solution-end -->

<a id="ex-pml1-08-b02"></a>
### PML1-08-B02 最小点が原点でない二次損失

- Level: B

$f(x)=(\lambda/2)(x-c)^2$、$m,\lambda,\tau>0$、$c,x_0\in\mathbb R$ について、熱雑音整合するSDEの解・平均・分散を導け。

<!-- solution-start -->
#### 詳細解答

$f'(x)=\lambda(x-c)$ なので、SDEは

$$
dX_t=-m\lambda(X_t-c)\,dt+\sqrt{2m\tau}\,dW_t.
$$

$Y_t=X_t-c$ と置くと $dY_t=-m\lambda Y_t\,dt+\sqrt{2m\tau}\,dW_t$ で、$Y_0=x_0-c$。[二次模型の定理](#thm-pml1-08-quadratic)を $Y$ に適用すれば

$$
Y_t=(x_0-c)e^{-m\lambda t}
+\sqrt{2m\tau}\int_0^t e^{-m\lambda(t-s)}\,dW_s.
$$

従って $X_t=c+Y_t$、期待値と分散は

$$
\mathbb E X_t=c+(x_0-c)e^{-m\lambda t},\qquad
\operatorname{Var}(X_t)=\frac{\tau}{\lambda}(1-e^{-2m\lambda t}).
$$

定数 $c$ の加算は分散を変えないが、平均の収束先を $c$ に移す。
<!-- solution-end -->

<a id="ex-pml1-08-b03"></a>
### PML1-08-B03 ノイズが損失を増やす例

- Level: B

$f(x)=\lambda x^2/2$、$m,\lambda,\tau>0$、$X_0=0$ とする。任意の $t>0$ に対し $\mathbb E f(X_t)>f(X_0)$ を示し、その理由を決定論的な散逸の式と比較せよ。

<!-- solution-start -->
#### 詳細解答

$X_0=0$ なので $f(X_0)=0$。[二次模型の期待損失命題](#prop-pml1-08-energy)で第一項が消え、

$$
\mathbb E f(X_t)=\frac{\tau}{2}(1-e^{-2m\lambda t}).
$$

$m\lambda t>0$ より $0<e^{-2m\lambda t}<1$ だから $\mathbb E f(X_t)>0=f(X_0)$。その微分も $m\lambda\tau e^{-2m\lambda t}>0$。決定論的には移動度 $m$ を持つ流れ $dx/dt=-mf'(x)$ に連鎖律を適用すると $df(x(t))/dt=f'(x(t))(-mf'(x(t)))=-m|f'(x(t))|^2$ となる（[勾配流の散逸恒等式](../PML1-07/index.md#thm-pml1-07-dissipation)）。しかし、確率系のItô公式では $\frac12\nu^2 f''=m\tau\lambda$ が加算される。初期点では $f'(0)=0$ なので、正の補正が勝つ。
<!-- solution-end -->

<a id="ex-pml1-08-b04"></a>
### PML1-08-B04 拡散係数の非一意性

- Level: B

$d=r=2$、$M=I_2$、$\tau>0$ とし、

$$
\Sigma_1=\sqrt{2\tau}\,I_2,\qquad
\Sigma_2=\sqrt{2\tau}
\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

両方が熱雑音整合を満たすことを示し、生成作用素が等しいのに同じブラウン運動を固定した標本路が一致するとは限らない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ と置くと

$$
RR^\mathsf T=
\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\begin{pmatrix}0&1\\-1&0\end{pmatrix}=I_2.
$$

よって

$$
\Sigma_1\Sigma_1^\mathsf T=2\tau I_2,\qquad
\Sigma_2\Sigma_2^\mathsf T=2\tau RR^\mathsf T=2\tau I_2.
$$

両者のドリフトは $-\nabla f$ で共通である。二次元の Laplace 作用素を

$$
\Delta\varphi:=\partial_{11}\varphi+\partial_{22}\varphi
$$

と定める。[過減衰Langevin型拡散の生成作用素](#prop-pml1-08-generator)に、両者共通の共分散 $2\tau I_2$ を代入すると、

$$
L\varphi=-\nabla f\cdot\nabla\varphi+\tau\Delta\varphi
$$

がどちらにも成り立つ。

しかし同じ $W$ に対し、拡散項は $\sqrt{2\tau}\,dW$ と $\sqrt{2\tau}R\,dW$ で異なる。例えば $f(x)=\|x\|^2/2$ とし、同じ初期値 $X_0=0$ とブラウン運動 $W$ の下で $\Sigma_1,\Sigma_2$ をそれぞれ用いた解を $X^{(1)},X^{(2)}$ と書く。各座標の二次模型の明示解を適用すると、時刻 $t>0$ の差は

$$
X_t^{(1)}-X_t^{(2)}
=\sqrt{2\tau}\int_0^t e^{-(t-s)}(I_2-R)\,dW_s
$$

である。$(I_2-R)(I_2-R)^\mathsf T=2I_2$ を用い、[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)から二乗平均を計算する。

$$
\begin{aligned}
\mathbb E\|X_t^{(1)}-X_t^{(2)}\|^2
&=2\tau\int_0^t e^{-2(t-s)}
  \operatorname{tr}\!\left((I_2-R)(I_2-R)^\mathsf T\right)\,ds\\
&=4\tau(1-e^{-2t})>0.
\end{aligned}
$$

生成作用素が同じことは、固定した雑音標本路ごとの一致を意味しない。
<!-- solution-end -->

## 10. 演習 Level C

<a id="ex-pml1-08-c01"></a>
### PML1-08-C01 Langevin係数の設計と誤設定の診断

- Level: C

$f(x)=3(x-2)^2/2$、移動度 $m=2$、温度 $\tau=6$ とする。初期値 $x_0=0$、標準ブラウン運動 $W$ に対して次を求めよ。

1. 熱雑音整合する拡散係数の絶対値とSDE、生成作用素。
2. 時刻 $t$ の平均と分散、およびその極限。
3. 誤って拡散係数を $\sqrt6$ とした場合の極限分散と、本来の極限分散に対する比率。
4. この例で「すべての標本路に沿って損失が単調減少する」が成り立たないことを、条件付き期待損失の短時間変化から示せ。

<!-- solution-start -->
#### 詳細解答

**1. 係数と作用素**：$f'(x)=3(x-2)$、移動度は $m=2>0$ なので、ドリフトは

$$
b(x)=-mf'(x)=-6(x-2).
$$

[熱雑音の整合条件](#def-pml1-08-thermal-matching)から $\nu^2=2m\tau=2\cdot2\cdot6=24$、$|\nu|=\sqrt{24}=2\sqrt6$。正の符号を取れば

$$
dX_t=-6(X_t-2)\,dt+\sqrt{24}\,dW_t.
$$

[過減衰Langevin型拡散の生成作用素](#prop-pml1-08-generator)の二階項は $\nu^2/2=12$ だから

$$
L\varphi(x)=-6(x-2)\varphi'(x)+12\varphi''(x).
$$

**2. 平均と分散**：$Y_t=X_t-2$ と置くと $Y_0=-2$、$dY_t=-6Y_t\,dt+\sqrt{24}\,dW_t$。[二次模型の定理](#thm-pml1-08-quadratic)から

$$
\begin{aligned}
\mathbb E X_t&=2-2e^{-6t},\\
\operatorname{Var}(X_t)&=\frac{6}{3}(1-e^{-12t})
=2(1-e^{-12t}).
\end{aligned}
$$

従って平均は $2$、分散は $2$ に収束する。$X$ の平均を得るときに、中心 $2$ を戻すのを忘れてはいけない。

**3. 誤設定**：$\nu^2=6$ になれば、[二次模型のノイズ係数の不整合](#prop-pml1-08-mismatch)より極限分散は

$$
\frac{6}{2m\lambda}
=\frac6{2\cdot2\cdot3}
=\frac12.
$$

本来の分散 $\tau/\lambda=6/3=2$ との比は $(1/2)/2=1/4$。誤った設定は指定温度の四分の一に相当する。

**4. 単調性の反証**：$Y_t=X_t-2$ で、初期値 $Y_0=-2$、$\lambda=3$ だから[期待損失の命題](#prop-pml1-08-energy)を移した中心座標に適用すると

$$
\mathbb E f(X_t)
=\frac{3\cdot(-2)^2}{2}e^{-12t}
+\frac62(1-e^{-12t})
=3+3e^{-12t}.
$$

これは初期値 $6$ から**減少**するので、初期値からの無条件の期待損失だけでは標本路ごとの単調性を反証できない。そこで任意の $s>0$ を固定し、時刻 $s$ までの情報を表す $\mathcal F_s$ に条件づける。

[STO11 の大域 Lipschitz SDE のマルコフ性](../../../解析系/STO/STO11/index.md#prop-sto11-lipschitz-sde-markov)により、$X_s=x$ を出発点とする長さ $h>0$ の過程へ[二次模型の定理](#thm-pml1-08-quadratic)を適用できる。中心座標 $Y=X-2$ の条件付き平均は $(x-2)e^{-6h}$、条件付き分散は $2(1-e^{-12h})$ だから、

$$
\begin{aligned}
\mathbb E[f(X_{s+h})\mid\mathcal F_s]
&=\frac32\left\{(X_s-2)^2e^{-12h}
      +2(1-e^{-12h})\right\}\\
&=\frac32(X_s-2)^2e^{-12h}+3(1-e^{-12h}).
\end{aligned}
$$

現在の損失との差を取ると、

$$
\mathbb E[f(X_{s+h})\mid\mathcal F_s]-f(X_s)
=\left(3-\frac32(X_s-2)^2\right)(1-e^{-12h}).
$$

従って $|X_s-2|<\sqrt2$ の事象上では、**どの $h>0$ に対しても**条件付き期待損失が増加する。右微分も

$$
\left.\frac{d}{dh}\mathbb E[f(X_{s+h})\mid\mathcal F_s]\right|_{h=0+}
=36-18(X_s-2)^2
$$

である。独立に[生成作用素の式](#prop-pml1-08-generator)へ $f'(x)=3(x-2)$、$f''(x)=3$、$b(x)=-6(x-2)$、$\nu^2=24$ を代入しても、

$$
(Lf)(x)=(-6(x-2))\,3(x-2)+\frac{24}{2}\cdot3
=-18(x-2)^2+36
$$

と一致する。二階の Itô 補正は $18$ ではなく $36$ である。

時刻 $s>0$ の $X_s$ は分散 $2(1-e^{-12s})>0$ の正規分布である。このため、$|X_s-2|<\sqrt2$ という事象の確率は正である。

もしほとんどすべての標本路で $f(X_t)$ が単調非増加なら、$f(X_{s+h})\le f(X_s)$ の条件付き期待値も非増加でなければならない。

しかし上の正の確率を持つ事象では、すべての $h>0$ に対して厳密な逆不等式が成り立つ。従って標本路の単調非増加性は否定される。

この設問では「初期値からの平均損失は減る」と「標本路ごとの損失が必ず減る」を取り違えない。
<!-- solution-end -->
