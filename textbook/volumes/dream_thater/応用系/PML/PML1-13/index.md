# PML1-13 SGDを局所OU過程で近似できるのはいつか

<!-- definition-example-audit: strict -->

[PML1-12の復元抽出SGDの条件付き共分散](../PML1-12/index.md#prop-pml1-12-replacement-moments)から、一歩の更新雑音の条件付き共分散は $\eta^2C(\theta)/b$ である。しかし、一歩の分散が分かることと、長時間のパラメータ分布が分かることは別問題である。特に最適点の近くでは、損失の勾配が元の位置へ戻す力となり、雑音がその周囲へ押し広げる。この釣合いを計算してみよう。

本講で扱うのは、**局所的に曲率が正で、勾配の散布がほぼ一定で、十分小さい学習率の固定バッチSGD**である。中心となる式は、線形化されたドリフトと雑音から得る *Lyapunov方程式* である。同時に、線形な離散更新と連続時間のOrnstein–Uhlenbeck（OU）過程を区別し、Gaussian近似が正当化される範囲を明確にする。

## 1. 最適点の周りで何を近似するか

パラメータ $\theta\in\mathbb R^d$、平均損失 $F=N^{-1}\sum_i f_i$、学習率 $\eta>0$、復元抽出のバッチサイズ $1\le b\le N$ は前講と同じである。$\theta_\star$ を $\nabla F(\theta_\star)=0$ を満たす点とする。$\theta_n-\theta_\star$ の大きさと方向を追うため、列ベクトル $x_n=\theta_n-\theta_\star$ を使う。

$F$ が $\theta_\star$ 近傍で二回連続微分可能なら、勾配の変化はHessian（勾配のJacobi行列）で表せる。$H=\nabla^2F(\theta_\star)$ とする。標準基底で $1\le r,s\le d$ とすると、Hessianの成分と、それが変位 $x$ に作用した第 $r$ 成分は

$$
H_{rs}=\partial_{\theta_s}(\partial_{\theta_r}F)(\theta_\star),
\qquad
(Hx)_r=\sum_{s=1}^dH_{rs}x_s
$$

と書ける。線分を動かす変数 $s\in[0,1]$ について、各成分の関数 $g_r(s)=\partial_{\theta_r}F(\theta_\star+sx)$ を考える。連鎖律より

$$
g_r'(s)=\sum_{k=1}^d\partial_{\theta_k}(\partial_{\theta_r}F)(\theta_\star+sx)x_k
$$

である。各 $r$ について $g_r(1)-g_r(0)=\int_0^1g_r'(s)\,ds$ と積分し、$\nabla F(\theta_\star)=0$ を代入して

$$
\nabla F(\theta_\star+x)
=\int_0^1\nabla^2F(\theta_\star+sx)x\,ds
=Hx+\int_0^1(\nabla^2F(\theta_\star+sx)-H)x\,ds.
$$

ここで最初の項 $Hx$ が線形近似、残りが局所誤差である。[対称正定値行列の定義](../../../基礎科目/F0/F0-00F1/index.md#def-f0-00f1-positive-semidefinite)により、任意の非零 $v$ に対して $v^{\mathsf T}Hv>0$ なら全固有値が正で、$-Hx$ は全方向で原点へ戻す力となる。

<a id="def-pml1-13-local-model"></a>

<!-- formal-statement-start -->
> **定義（SGDの局所線形モデル）**  
> $d\ge1$、$\eta>0$、整数 $1\le b\le N$ とする。$F:\mathbb R^d\to\mathbb R$ が停留点 $\theta_\star$ 近傍で $C^2$ 級で、$H=\nabla^2F(\theta_\star)$ は対称正定値であるとする。また個別勾配の[散布行列](../PML1-12/index.md#def-pml1-12-gradient-scatter) $C(\theta)$ が $\theta_\star$ で有限であるとし、$C_\star=C(\theta_\star)$ と置く。初期値 $X_0$ と独立で、時刻間でも独立同分布な平均ゼロ・共分散 $C_\star/b$ のベクトル $\varepsilon_{n+1}$ を用意し、

$$
X_{n+1}=(I_d-\eta H)X_n-\eta\varepsilon_{n+1}
$$

> と更新する。この原点中心の線形漸化式を**局所線形SGDモデル**と呼ぶ。元のSGDの $x_n$ に対する勾配を $Hx_n$ で、状態依存雑音を固定した $\varepsilon_{n+1}$ で置換した模型である。
<!-- formal-statement-end -->

この定義は**元のSGDとの等式ではない**。$F$ が二次式かつ個別勾配の偏差がパラメータに依存しない特殊な場合には、一致する。その例から入る。

<!-- definition-example-start: def-pml1-13-local-model -->
**定義の確認**：一次元で $N=2$、$b=1$ とし、

$$
f_1(\theta)=\theta^2+\theta,\qquad f_2(\theta)=\theta^2-\theta
$$

とする。平均損失 $F(\theta)=\theta^2$ の最適点は $\theta_\star=0$、$H=F''(0)=2>0$。個別勾配は $2\theta\pm1$、全勾配は $2\theta$ であり、偏差はそれぞれ $\pm1$、従って $C(\theta)=1$ は一定である。

初期値を $X_0=0$ とすれば新しい抽出雑音と独立である。復元抽出SGDは $X_{n+1}=(1-2\eta)X_n-\eta\varepsilon_{n+1}$ となり、$\varepsilon_{n+1}=\pm1$ は各確率 $1/2$ で独立に選ばれる。平均0、分散1なので定義の全条件を満たす。ここでは局所模型が元のSGDに**厳密に一致**する。ただし一歩の雑音は二点分布であってGaussianではない。
<!-- definition-example-end -->

実際の一般的な損失については、$\nabla F(\theta_\star+x)$ の $Hx$ からのずれと、$C(\theta_\star+x)$ の $C_\star$ からのずれを別々に検査する。

## 2. なぜOU過程が候補になるか

[PML1-11の二次Langevinモデル](../PML1-11/index.md#thm-pml1-11-exact-ou-step)と同じ発想で、連続時間において線形の復元力 $-HU_t$ と一定のGaussian雑音を持つ過程を考える。ここで $W_t$ は[多次元ブラウン運動の定義](../../../解析系/STO/STO7/index.md#def-sto7-vector-brownian)に従う、独立な成分から成る $d$ 次元標準ブラウン運動である。以下の $dW_t$ は通常の時間微分ではなく、区間ごとのブラウン増分をItô積分する記法とする。

$C_\star$ は[散布行列の定義](../PML1-12/index.md#def-pml1-12-gradient-scatter)から対称半正定値なので、直交行列 $R$（$R^{\mathsf T}R=I_d$）と固有値 $c_i\ge0$ によって $C_\star=R\operatorname{diag}(c_1,\ldots,c_d)R^{\mathsf T}$ と表せる。各固有方向の分散 $c_i$ を平方根に分け、

$$
B=R\operatorname{diag}(\sqrt{c_1},\ldots,\sqrt{c_d})R^{\mathsf T},
\qquad
BB^{\mathsf T}=R\operatorname{diag}(c_1,\ldots,c_d)R^{\mathsf T}=C_\star
$$

と作る。この $B$ は $d\times d$ 行列で、零固有値があっても構成できる。

<a id="def-pml1-13-ou-surrogate"></a>

<!-- formal-statement-start -->
> **定義（局所OU代理過程）**  
> 対称正定値行列 $H\in\mathbb R^{d\times d}$、対称半正定値行列 $C_\star\in\mathbb R^{d\times d}$、$\eta>0$、整数 $b\ge1$ と $BB^{\mathsf T}=C_\star$ を与える。ブラウン運動から独立な初期値 $U_0$ に対し、

$$
dU_t=-HU_t\,dt+\sqrt{\frac{\eta}{b}}B\,dW_t
$$

> を満たす連続過程を**局所OU代理過程**と呼ぶ。時刻 $t_n=n\eta$ をSGDの更新時刻に対応させる。$\eta$ はこの代理過程の**雑音係数を定めるパラメータ**でもあり、連続時間の物理的温度を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-13-ou-surrogate -->
**定義の確認**：第1節の $H=2$、$C_\star=1$、$b=1$ の例では $B=1$ を選び、初期値を $U_0=0$ とする。$U_0$ は定数だからブラウン運動と独立であり、方程式は

$$
dU_t=-2U_t\,dt+\sqrt{\eta}\,dW_t
$$

となる。$H>0$、$BB^{\mathsf T}=1=C_\star$、係数は一定、初期値はブラウン運動と独立という条件をすべて満たす。[Euler–Maruyama法](../PML1-11/index.md#def-pml1-11-euler-maruyama)では、時間積分 $\int_{n\eta}^{(n+1)\eta}(-2U_s)\,ds$ を $-2\eta U_{n\eta}^{\mathrm{EM}}$ で近似し、ブラウン増分は正確に

$$
W_{(n+1)\eta}-W_{n\eta}=\sqrt{\eta}\,\xi_{n+1},
\qquad \xi_{n+1}\sim N(0,1)
$$

と表せる。したがって雑音増分は $\sqrt{\eta}\sqrt{\eta}\,\xi_{n+1}=\eta\xi_{n+1}$ となり、

$$
U_{(n+1)\eta}^{\mathrm{EM}}
=(1-2\eta)U_{n\eta}^{\mathrm{EM}}
+\eta\xi_{n+1},\qquad \xi_{n+1}\sim N(0,1)
$$

であり、雑音の**一歩の分散**は $\eta^2$。元のSGDも分散は $\eta^2$ だが、$\pm\eta$ の二点分布である点は違う。
<!-- definition-example-end -->

連続OU過程そのものの厳密一歩遷移は $e^{-H\eta}$ で減衰し、雑音共分散にも行列指数が入る。上の $(I_d-\eta H)$ は**Euler近似**であることに注意したい。

## 3. 連続OUの長時間共分散を求める

平均ゼロのGaussianベクトルでも、方向ごとの分散や相関は一つの数にまとまらない。$\Sigma=\operatorname{Cov}(U)$ は $d\times d$ 対称行列である。OUの定常共分散とは、分布が時間で変わらない状態での $\Sigma$ を指す。次の結果では、その行列を積分と代数方程式の両方で求める。

<a id="thm-pml1-13-ou-covariance"></a>

<!-- formal-statement-start -->
> **定理（正定値ドリフトを持つOUの定常Gaussian分布）**  
> $H=H^{\mathsf T}\succ0$、$C_\star=C_\star^{\mathsf T}\succeq0$、$\eta>0$、$b\ge1$、$BB^{\mathsf T}=C_\star$ とし、[局所OU代理過程](#def-pml1-13-ou-surrogate)を考える。定常分布はただ一つ存在し、平均ゼロの（退化も許す）Gaussian分布 $N(0,\Sigma_{\mathrm{OU}})$ である。その共分散は

$$
\Sigma_{\mathrm{OU}}
=\frac{\eta}{b}\int_0^\infty e^{-Ht}C_\star e^{-Ht}\,dt
$$

> であり、次の**連続Lyapunov方程式**の唯一の対称解である。

$$
H\Sigma_{\mathrm{OU}}+\Sigma_{\mathrm{OU}}H
=\frac{\eta}{b}C_\star.
$$
<!-- formal-statement-end -->

### 証明の見取り図

行列指数による積分表示から平均と共分散を求める。$H$ の最小固有値が正なので $e^{-Ht}$ が指数的に減衰し、無限時間の共分散積分が収束する。最後に積分の被積分関数を微分するとLyapunov方程式が出る。

<!-- proof-start -->
### 証明

[STO7の積の公式](../../../解析系/STO/STO7/index.md#cor-sto7-product-rule)を各成分に適用する。滑らかな決定論的行列 $e^{Ht}$ は有限変動なので、$U_t$ との共変分項はゼロである。$V_t=e^{Ht}U_t$ とすると

$$
dV_t=e^{Ht}HU_t\,dt+e^{Ht}dU_t
=\sqrt{\frac{\eta}{b}}e^{Ht}B\,dW_t.
$$

初期値まで積分し、両辺に $e^{-Ht}$ を掛けて

$$
U_t=e^{-Ht}U_0+
\sqrt{\frac{\eta}{b}}\int_0^t e^{-H(t-s)}B\,dW_s
$$

を得る。確率積分は平均0で、[ブラウン運動の増分とItô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)に基づいて共分散は

$$
\frac{\eta}{b}\int_0^t e^{-H(t-s)}BB^{\mathsf T}e^{-H(t-s)}\,ds
=\frac{\eta}{b}\int_0^t e^{-Hu}C_\star e^{-Hu}\,du
$$

となる。ここでは $C_\star$ の固有基底 $R$ とは別に、$H=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_d)Q^{\mathsf T}$（$\lambda_i>0$）と直交対角化する。すると $\|e^{-Ht}\|_{\mathrm{op}}\le e^{-\lambda_{\min}t}$ なので積分は有限である。

決定論的初期値から出発すると、上の確率積分は[決定論的ブラウン積分のGaussian性](../../../解析系/STO/STO6/index.md#prop-sto6-deterministic-gaussian)から多次元でもGaussianである。実際、任意の $v\in\mathbb R^d$ に対し、左から掛けたスカラー積分は

$$
v^{\mathsf T}\int_0^t e^{-H(t-s)}B\,dW_s
=\sum_{\ell=1}^d\int_0^t
\bigl(v^{\mathsf T}e^{-H(t-s)}B\bigr)_\ell\,dW_s^\ell
$$

であり、右辺は互いに独立なブラウン成分の決定論的積分の和なのでGaussianとなる。すべての一次元射影がGaussianであるから積分ベクトルは多次元Gaussianである。平均は $e^{-Ht}U_0\to0$、共分散は表示積分へ収束する。任意の初期分布に対しても、初期値の寄与 $e^{-Ht}U_0$ は確率収束で0となるので同じ極限分布を持つ。

$\Sigma_{\mathrm{OU}}$ の積分の両側へ $H$ を掛けて足すと、

$$
\begin{aligned}
H\Sigma_{\mathrm{OU}}+\Sigma_{\mathrm{OU}}H
&=-\frac{\eta}{b}\int_0^\infty
\frac{d}{dt}\bigl(e^{-Ht}C_\star e^{-Ht}\bigr)\,dt\\
&=\frac{\eta}{b}
\left(C_\star-\lim_{t\to\infty}e^{-Ht}C_\star e^{-Ht}\right)
=\frac{\eta}{b}C_\star.
\end{aligned}
$$

唯一性は $HD+DH=0$ とおいた差 $D$ を $H$ の固有基底で書くと $(\lambda_i+\lambda_j)\widetilde D_{ij}=0$ となるため従う。$\lambda_i+\lambda_j>0$ なので $D=0$。この共分散のGaussian分布から始めたとき、上の有限時刻共分散は

$$
e^{-Ht}\Sigma_{\mathrm{OU}}e^{-Ht}
+\frac{\eta}{b}\int_0^t e^{-Hu}C_\star e^{-Hu}\,du
=\Sigma_{\mathrm{OU}}
$$

である。等号は積分を $[t,\infty)$ と $[0,t]$ に分ければ確認できる。従って実際に不変であり、どの初期分布からもこの分布へ収束するので定常分布は一意である。
<!-- proof-end -->

$\widetilde C=Q^{\mathsf T}C_\star Q$、$\widetilde\Sigma=Q^{\mathsf T}\Sigma_{\mathrm{OU}}Q$ と書くと、Lyapunov方程式を成分ごとに解ける。

$$
(\lambda_i+\lambda_j)\widetilde\Sigma_{ij}
=\frac{\eta}{b}\widetilde C_{ij},
\qquad
\boxed{\widetilde\Sigma_{ij}
=\frac{\eta\,\widetilde C_{ij}}{b(\lambda_i+\lambda_j)}}.
$$

したがって**同じ雑音強度 $\widetilde C_{ii}>0$ の方向同士を比較すれば**、曲率 $\lambda_i$ が小さいほど定常分散 $\widetilde\Sigma_{ii}=\eta\widetilde C_{ii}/(2b\lambda_i)$ は大きくなる。雑音強度も方向で違う場合に曲率だけで大小は決められない。非対角の $\widetilde C_{ij}$ も一般に残るので、曲率と雑音が同じ固有基底で対角化されるとは限らない。

**直接計算**：$H=\operatorname{diag}(1,3)$、$C_\star=\operatorname{diag}(4,2)$、$b=2$ とする。独立な方向ごとに

$$
\Sigma_{\mathrm{OU}}
=\operatorname{diag}\left(\frac{\eta\cdot4}{2\cdot2},
\frac{\eta\cdot2}{2\cdot6}\right)
=\operatorname{diag}\left(\eta,\frac{\eta}{6}\right).
$$

第1方向は曲率が小さいだけでなく雑音も強く、定常分散は第2方向の6倍になる。

## 4. 元の離散更新とどこまで一致するか

第1節の線形漸化式に戻る。$A=I_d-\eta H$ と置けば $X_{n+1}=AX_n-\eta\varepsilon_{n+1}$。$H$ の固有値は $\lambda_i>0$ なので、更新が全方向で収縮する必要十分条件は

$$
|1-\eta\lambda_i|<1\quad(\text{全 }i),
\qquad\text{すなわち}\qquad 0<\eta<\frac2{\lambda_{\max}(H)}.
$$

この条件の下で、二乗平均収束する過去の雑音の無限和から、離散更新の不変分布を構成できる。

<a id="thm-pml1-13-discrete-covariance"></a>

<!-- formal-statement-start -->
> **定理（線形SGDの定常共分散と有限学習率補正）**  
> $H=H^{\mathsf T}\succ0$、$C_\star=C_\star^{\mathsf T}\succeq0$、$b\ge1$、$0<\eta<2/\lambda_{\max}(H)$ とする。$\varepsilon_n$ は初期値から独立な独立同分布列で $\mathbb E\varepsilon_n=0$、$\operatorname{Cov}(\varepsilon_n)=C_\star/b$、二乗可積分とする。[局所線形SGDモデル](#def-pml1-13-local-model)と同形の更新 $X_{n+1}=(I_d-\eta H)X_n-\eta\varepsilon_{n+1}$ は有限二次モーメントを持つ唯一の定常分布を有し、その平均は0、共分散 $\Sigma_\eta$ は次の**離散Lyapunov方程式**を満たす。

$$
\Sigma_\eta=(I_d-\eta H)\Sigma_\eta(I_d-\eta H)
+\frac{\eta^2}{b}C_\star.
$$

> $H$ の直交固有基底での成分は、$\widetilde C=Q^{\mathsf T}C_\star Q$ と書けば

$$
\boxed{
(\widetilde\Sigma_\eta)_{ij}
=\frac{\eta\,\widetilde C_{ij}}
{b(\lambda_i+\lambda_j-\eta\lambda_i\lambda_j)}
}.
$$

> これは一般にGaussian分布ではない。$\eta\downarrow0$ で、共分散の各成分の連続OU値との差は $O(\eta^2)$ である（$H,C_\star,b$ は固定）。
<!-- formal-statement-end -->

### 証明の見取り図

一歩の共分散は前講と同じだが、**定常共分散**はその一歩分だけではない。過去から残る $A\Sigma A$ と新しい $\eta^2C_\star/b$ を足し、成分ごとの等式を解く。

<!-- proof-start -->
### 証明

$A=I_d-\eta H$ とすると $\|A\|_{\mathrm{op}}=\max_i|1-\eta\lambda_i|=:r<1$。互いに独立な過去の雑音 $\varepsilon_0,\varepsilon_{-1},\ldots$ を用意し、

$$
X_\infty=-\eta\sum_{j=0}^\infty A^j\varepsilon_{-j}
$$

と定める。平均ゼロ・独立性から、$m$ 項以降の和の二乗平均は

$$
\mathbb E\left\|\eta\sum_{j=m}^k A^j\varepsilon_{-j}\right\|^2
=\frac{\eta^2}{b}\sum_{j=m}^k\operatorname{tr}
(A^jC_\star A^j)
\le\frac{\eta^2\operatorname{tr}C_\star}{b}
\sum_{j=m}^\infty r^{2j}\longrightarrow0.
$$

よって和は $L^2$ で収束し、定常解を作る。独立な現在の雑音と過去の和から、

$$
\begin{aligned}
\Sigma_\eta
&=\frac{\eta^2}{b}\sum_{j=0}^\infty A^jC_\star A^j,\\
A\Sigma_\eta A+\frac{\eta^2}{b}C_\star
&=\frac{\eta^2}{b}\sum_{j=1}^\infty A^jC_\star A^j
+\frac{\eta^2}{b}C_\star=\Sigma_\eta.
\end{aligned}
$$

同じ雑音で二つの初期値から更新すると差は $A^n(X_0-Y_0)$ なので、$L^2$ で0へ収束する。従って有限二次モーメントの定常分布は一意である。定常平均 $m$ も $m=Am$ より $Hm=0$、従って0である。

$H=Q\operatorname{diag}(\lambda_i)Q^{\mathsf T}$ によって変換すれば、$A$ の対角成分は $a_i=1-\eta\lambda_i$ となる。$(i,j)$ 成分では

$$
(\widetilde\Sigma_\eta)_{ij}
=a_ia_j(\widetilde\Sigma_\eta)_{ij}
+\frac{\eta^2}{b}\widetilde C_{ij}.
$$

$|a_ia_j|<1$ で分母は正だから、

$$
1-a_ia_j
=\eta(\lambda_i+\lambda_j-\eta\lambda_i\lambda_j)>0
$$

で割ると表示式が得られる。[OUの共分散公式](#thm-pml1-13-ou-covariance)との差を同じ基底で引くと、

$$
(\widetilde\Sigma_\eta-\widetilde\Sigma_{\mathrm{OU}})_{ij}
=\frac{\eta^2\widetilde C_{ij}\lambda_i\lambda_j}
{b(\lambda_i+\lambda_j)(\lambda_i+\lambda_j-\eta\lambda_i\lambda_j)}.
$$

$H$ と $b,C_\star$ を固定して $\eta\to0$ とすると分母は正の定数へ近づくため、各成分で $O(\eta^2)$ である。ここでは雑音分布にGaussian性を仮定しておらず、不変分布も一般にはGaussianでない。
<!-- proof-end -->

一次元で曲率 $h>0$、雑音分散 $c/b$ とすると、とくに分かりやすい。

$$
\Sigma_{\mathrm{OU}}=\frac{\eta c}{2bh},
\qquad
\Sigma_\eta=\frac{\eta c}{b(2h-\eta h^2)}.
$$

比は $\Sigma_\eta/\Sigma_{\mathrm{OU}}=1/(1-\eta h/2)$（$c>0$）である。小さい学習率で近いが、安定限界 $\eta h\uparrow2$ では離散共分散が発散する。連続OUの共分散をそのまま有限学習率のSGDへ当てはめてはいけない。

**数値例**：第1節の $h=2,c=b=1$ に $\eta=1/4$ を入れると

$$
\Sigma_{\mathrm{OU}}=\frac1{16},
\qquad
\Sigma_\eta=\frac{1/4}{4-1}=\frac1{12}.
$$

差は $1/48$ である。さらにSGDの定常分布は $\pm1$ の過去の雑音の重み付き和で、一般にはGaussianではない。一方で連続OUの定常分布は厳密にGaussianである。

## 5. 「局所」という仮定の中身

ここまでは線形模型の**厳密な**定理だった。一般のSGDでは $\zeta_{n+1}$ の条件付き共分散は [前講の定理](../PML1-12/index.md#prop-pml1-12-replacement-moments)から $C(\theta_n)/b$ で、$\theta_n$ に依存する。線形化誤差を式で分離して初めて、近似の使い道が分かる。

<a id="prop-pml1-13-local-remainders"></a>

<!-- formal-statement-start -->
> **命題（勾配線形化と雑音共分散の局所誤差）**  
> $\nabla F(\theta_\star)=0$ とし、$\theta_\star$ を中心とする凸な近傍 $D$ で $F$ は $C^2$ 級とする。Hessianが $D$ 上で $L$-Lipschitzであるとする。すると $\theta_\star+x\in D$ で $0\le s\le1$ に対し

$$
\|\nabla^2F(\theta_\star+sx)-H\|_{\mathrm{op}}
\le Ls\|x\|,\qquad H=\nabla^2F(\theta_\star)
$$

> が成立するとする。$C$ が同じ近傍で $\|C(\theta_\star+x)-C_\star\|_{\mathrm{op}}\le L_C\|x\|$ を満たすなら、元の復元抽出SGDで $x_n=\theta_n-\theta_\star$ がこの近傍にある間、

$$
\|\nabla F(\theta_\star+x_n)-Hx_n\|
\le\frac L2\|x_n\|^2
$$

> かつ一歩の条件付き雑音共分散と固定共分散の差について

$$
\left\|
\frac{\eta^2}{b}C(\theta_n)-\frac{\eta^2}{b}C_\star
\right\|_{\mathrm{op}}
\le\frac{\eta^2L_C}{b}\|x_n\|
$$

> が成立する。これらは**局所的一歩誤差の評価**であり、反復列が $D$ に留まることや定常分布のGaussian近似を単独で保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

勾配は線分上のHessianの積分で表し、定数行列 $H$ の寄与を引く。雑音については前講の共分散公式にLipschitz評価を代入する。

<!-- proof-start -->
### 証明

線分 $\theta_\star+s x$ は $D$ に含まれる。各成分への微積分の基本定理と連鎖律から

$$
\nabla F(\theta_\star+x)-\nabla F(\theta_\star)
=\int_0^1\nabla^2F(\theta_\star+sx)x\,ds.
$$

停留点条件 $\nabla F(\theta_\star)=0$ を使い、$Hx=\int_0^1Hx\,ds$ を差し引く。

$$
\begin{aligned}
\|\nabla F(\theta_\star+x)-Hx\|
&\le\int_0^1\|\nabla^2F(\theta_\star+sx)-H\|_{\mathrm{op}}\|x\|\,ds\\
&\le\int_0^1Ls\|x\|^2\,ds
=\frac L2\|x\|^2.
\end{aligned}
$$

さらに[復元抽出SGDの共分散式](../PML1-12/index.md#prop-pml1-12-replacement-moments)を状態 $\theta_n$ に適用すれば、一歩の更新雑音の共分散は $\eta^2 C(\theta_n)/b$。定数 $\eta^2/b$ を括り出し、$C$ のLipschitz評価を使うと第二式を得る。
<!-- proof-end -->

この誤差は小さい $x_n$ で抑えられるが、**局所滞在**は別途検証する必要がある。とくに非凸損失では、別の谷へ脱出することもある。近似を使うときの確認順序は次の通りである。

1. $\nabla F(\theta_\star)=0$ と $H\succ0$ を確認し、どの近傍で二次近似を使うか指定する。
2. $0<\eta<2/\lambda_{\max}(H)$ と、軌道がその近傍に留まる時間範囲を検査する。
3. $C_\star$ と $C(\theta)$ の変化、ノイズ分布の裾・時間相関を確認する（本講の復元抽出は各歩で新しく独立に抽出する）。
4. 離散SGDの共分散なら[離散Lyapunov方程式](#thm-pml1-13-discrete-covariance)、連続OU代理の共分散なら[連続Lyapunov方程式](#thm-pml1-13-ou-covariance)を使い分ける。
5. 分布までGaussianと扱うなら、**小さな独立雑音の多数回の蓄積**を裏付ける極限定理や追加の近似根拠を別途確認する。共分散一致だけでは足りない。

正定値 $H$ と一定の非零 $C_\star$、固定 $b$ のもとで、[正定値ドリフトを持つOUの定常Gaussian分布](#thm-pml1-13-ou-covariance)では $\Sigma_{\mathrm{OU}}=O(\eta)$ で、標準偏差は $O(\sqrt\eta)$。これは近傍の幅の目安になるが、元の非線形SGDの全時間について同じ評価を自動的に与えるものではない。

## 6. 近似が破綻する機構を二つ確認する

**平坦方向に雑音がある場合**：$H=\operatorname{diag}(1,0)$、$C_\star=\operatorname{diag}(0,1)$、$b=1$ とする。第2方向の線形更新は $X_{n+1,2}=X_{n,2}-\eta\varepsilon_{n+1,2}$ であり、独立な平均ゼロ・分散1の雑音なら

$$
\operatorname{Var}(X_{n,2})
=\operatorname{Var}(X_{0,2})+n\eta^2
$$

となる（初期値と雑音は独立）。ここでは第2方向に戻す力がなく、定常共分散は存在しない。**正定値性が定常分散の議論を支えていた**のである。

**状態依存雑音が最適点で消える場合**：[PML1-12の状態依存例](../PML1-12/index.md#def-pml1-12-gradient-scatter)として、$f_1(\theta)=\theta^2/2$、$f_2(\theta)=3\theta^2/2$ を考える。$g(\theta)=2\theta$、$H=2$、$C(\theta)=\theta^2$ なので $C_\star=0$。凍結OU代理は雑音のない減衰を示し、元のSGDも $\theta=0$ では動かない。しかし $\theta\ne0$ で雑音は非零である。**$H\succ0$ だけでは一定温度の揺らぎが出るとは限らない**。

## 7. 演習 Level A

<a id="ex-pml1-13-a01"></a>
### PML1-13-A01 二つの損失を線形SGDへ

- Level: A

$f_1(\theta)=\tfrac32\theta^2+2\theta$、$f_2(\theta)=\tfrac32\theta^2-2\theta$、$b=1$ の復元抽出SGDで、$\theta_\star,H,C_\star$、更新式を求めよ。

<!-- solution-start -->
#### 詳細解答

平均は $F(\theta)=3\theta^2/2$、よって $F'(\theta)=3\theta$。停留点 $\theta_\star=0$ で $H=F''(0)=3>0$。個別勾配は $3\theta+2$ と $3\theta-2$ なので、全勾配からの偏差は $\pm2$。従って

$$
C_\star=\frac{2^2+(-2)^2}{2}=4.
$$

$\varepsilon_{n+1}$ は等確率で $\pm2$、更新は

$$
X_{n+1}=(1-3\eta)X_n-\eta\varepsilon_{n+1}.
$$

損失が二次式で偏差が一定なので、この線形更新は元のSGDに一致する。
<!-- solution-end -->

<a id="ex-pml1-13-a02"></a>
### PML1-13-A02 OU共分散を積分する

- Level: A

一次元で $h=4$、$c=6$、$b=3$ のOU代理過程の定常分散を積分表示から求めよ。

<!-- solution-start -->
#### 詳細解答

[正定値ドリフトを持つOUの定常Gaussian分布](#thm-pml1-13-ou-covariance)を一次元へ適用すると

$$
\Sigma_{\mathrm{OU}}
=\frac{\eta}{3}\int_0^\infty 6e^{-8t}\,dt.
$$

$\int_0^\infty e^{-8t}\,dt=[-e^{-8t}/8]_0^\infty=1/8$ なので、

$$
\Sigma_{\mathrm{OU}}=\frac{\eta}{3}\cdot\frac68=\frac{\eta}{4}.
$$

Lyapunov方程式 $2h\Sigma=\eta c/b$ でも $8\Sigma=2\eta$ となり一致する。
<!-- solution-end -->

<a id="ex-pml1-13-a03"></a>
### PML1-13-A03 安定な学習率

- Level: A

$H=\operatorname{diag}(2,5)$ に対して、局所線形SGDの収縮が成立する学習率の範囲を求めよ。$\eta=1/2$ では何が起きるか。

<!-- solution-start -->
#### 詳細解答

$A=I-\eta H$ の固有値は $1-2\eta$ と $1-5\eta$。両方の絶対値が1未満である条件は

$$
0<\eta<\min\left(\frac22,\frac25\right)=\frac25.
$$

$\eta=1/2$ では $A$ の固有値は $0$ と $-3/2$。第2成分の振幅が一歩ごとに $3/2$ 倍となり、[離散共分散定理](#thm-pml1-13-discrete-covariance)の仮定が破れる。第2方向に雑音がある場合、定常分散を有限値に保てない。
<!-- solution-end -->

<a id="ex-pml1-13-a04"></a>
### PML1-13-A04 離散と連続の定常分散

- Level: A

一次元 $h=2,c=4,b=1,\eta=1/4$ の場合、OUと離散SGDの定常分散を求め、両者の比を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\eta h=1/2<2$ なので離散更新は安定である。[正定値ドリフトを持つOUの定常Gaussian分布](#thm-pml1-13-ou-covariance)から

$$
\Sigma_{\mathrm{OU}}=\frac{(1/4)\cdot4}{2\cdot2}=\frac14.
$$

[離散Lyapunov方程式](#thm-pml1-13-discrete-covariance)を使うと

$$
\Sigma_\eta=\frac{(1/4)\cdot4}{2\cdot2-(1/4)\cdot2^2}
=\frac1{3}.
$$

比は $(1/3)/(1/4)=4/3$。定常共分散では有限学習率の補正が必要になる。
<!-- solution-end -->

<a id="ex-pml1-13-a05"></a>
### PML1-13-A05 近傍の勾配誤差

- Level: A

$F(\theta)=\theta^2+\theta^3/3$ の $\theta_\star=0$ で、$F'(\theta)-H\theta$ を求め、$|\theta|\le1/4$ での[局所誤差評価](#prop-pml1-13-local-remainders)と照合せよ。

<!-- solution-start -->
#### 詳細解答

$F'(\theta)=2\theta+\theta^2$、$F''(\theta)=2+2\theta$ だから $H=F''(0)=2$。従って残差は

$$
F'(\theta)-H\theta=\theta^2,\qquad
|F'(\theta)-H\theta|=|\theta|^2.
$$

近傍で $|F''(\theta)-F''(0)|=2|\theta|$、Lipschitz定数は $L=2$。命題の上界は $(L/2)|\theta|^2=|\theta|^2$ となり、この例では等号が成り立つ。局所で二次の誤差を持つことを直接確かめられた。
<!-- solution-end -->

## 8. 演習 Level B

<a id="ex-pml1-13-b01"></a>
### PML1-13-B01 非対角雑音を持つLyapunov方程式

- Level: B

$H=\operatorname{diag}(1,2)$、$C_\star=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$b=1$ とする。連続OUの定常共分散を求め、元のLyapunov方程式に代入して検算せよ。

<!-- solution-start -->
#### 詳細解答

$C_\star$ は固有値 $3,1$ を持つため対称正定値である。$H$ はすでに対角行列で、その固有値は $\lambda_1=1,\lambda_2=2$。[正定値ドリフトを持つOUの定常Gaussian分布](#thm-pml1-13-ou-covariance)から

$$
\begin{aligned}
\Sigma_{11}&=\frac{2\eta}{1+1}=\eta,&
\Sigma_{12}&=\frac{\eta}{1+2}=\frac\eta3,\\
\Sigma_{21}&=\frac\eta3,&
\Sigma_{22}&=\frac{2\eta}{2+2}=\frac\eta2.
\end{aligned}
$$

ゆえに $\Sigma_{\mathrm{OU}}=\eta\begin{pmatrix}1&1/3\\1/3&1/2\end{pmatrix}$。左辺を別々に掛けると

$$
H\Sigma_{\mathrm{OU}}=\eta
\begin{pmatrix}1&1/3\\2/3&1\end{pmatrix},
\qquad
\Sigma_{\mathrm{OU}}H=\eta
\begin{pmatrix}1&2/3\\1/3&1\end{pmatrix}.
$$

和は $\eta\begin{pmatrix}2&1\\1&2\end{pmatrix}=\eta C_\star/b$ となる。非対角の共分散を消してしまうと方程式が成り立たない。
<!-- solution-end -->

<a id="ex-pml1-13-b02"></a>
### PML1-13-B02 非Gaussian定常分布の検出

- Level: B

第1節の $\varepsilon_n=\pm1$（確率各 $1/2$）、$h=2$、$b=1$ の厳密なSGDに $\eta=1/2$ を用いる。定常分布を求め、同じ一歩の平均・共分散を持つGaussian更新との違いを説明せよ。

<!-- solution-start -->
#### 詳細解答

$A=1-\eta h=1-1=0$ なので更新は

$$
X_{n+1}=-\frac12\varepsilon_{n+1}.
$$

初期値に依らず一歩目から $X_n=\pm1/2$ を各確率 $1/2$ で取る。定常平均は0、分散は

$$
\frac12\left(\frac12\right)^2+
\frac12\left(-\frac12\right)^2=\frac14.
$$

[離散Lyapunov定理](#thm-pml1-13-discrete-covariance)でも $\Sigma_\eta=\eta c/(2h-\eta h^2)=(1/2)/(4-2)=1/4$ で一致する。一方、同じ $A=0$、同じ雑音分散 $1/4$ でGaussian雑音に置き換えると、定常分布は $N(0,1/4)$ となる。前者は二点に確率が集中し、後者は連続分布だから同一でない。共分散一致からGaussian分布を結論できない。
<!-- solution-end -->

<a id="ex-pml1-13-b03"></a>
### PML1-13-B03 不安定方向の分散を追う

- Level: B

$H=\operatorname{diag}(3,0)$、$C_\star=I_2$、$b=1$、$\eta=1/4$、$X_0=0$ とする。独立な平均0・分散1の各成分の雑音を用いた更新で、第1・第2成分の $n$ 歩後の分散を求め、定常共分散の存在を判定せよ。

<!-- solution-start -->
#### 詳細解答

$A=I-\eta H=\operatorname{diag}(1/4,1)$。各成分の雑音分散は $\eta^2=1/16$ で、独立な新しい雑音を加えるたびに分散が足される。第1成分の分散 $v_n$ は

$$
v_{n+1}=\frac1{16}v_n+\frac1{16},\qquad v_0=0.
$$

等比級数から

$$
v_n=\frac1{16}\sum_{j=0}^{n-1}\left(\frac1{16}\right)^j
=\frac1{15}\left(1-16^{-n}\right)
\longrightarrow\frac1{15}.
$$

第2成分は $w_{n+1}=w_n+1/16$、$w_0=0$ なので $w_n=n/16$ と発散する。従って全体の有限な定常共分散は存在しない。失われた仮定は $H\succ0$ であり、第2方向の復元力がないために雑音が累積する。
<!-- solution-end -->

## 9. 演習 Level C

<a id="ex-pml1-13-c01"></a>
### PML1-13-C01 具体的なSGDからOU近似まで通す

- Level: C

一次元で $f_1(\theta)=\theta^2+\theta$、$f_2(\theta)=\theta^2-\theta$、復元抽出 $b=1$、$\eta=1/10$ とする。

1. $\theta_\star,H,C_\star$ を求め、元のSGDが局所線形モデルと厳密に一致することを示せ。
2. 連続OU代理の定常分散、離散SGDの定常分散、および差を求めよ。
3. 学習率を変えながら $\eta\downarrow0$ としたとき、分散それぞれの次数と差の次数を式から確認せよ。
4. この例で「定常分布が厳密にGaussianである」と言えるか。$X_n$ の取り得る範囲を示して判定せよ。

<!-- solution-start -->
#### 詳細解答

**1.** 平均損失は

$$
F(\theta)=\frac12[(\theta^2+\theta)+(\theta^2-\theta)]=\theta^2.
$$

$F'(0)=0$、$H=F''(0)=2>0$。個別勾配は $2\theta+1,2\theta-1$ なので偏差は $+1,-1$、$C_\star=(1^2+(-1)^2)/2=1$。更新は

$$
X_{n+1}=(1-2\eta)X_n-\eta\varepsilon_{n+1},
\quad \mathbb P(\varepsilon_{n+1}=1)=\mathbb P(\varepsilon_{n+1}=-1)=\frac12.
$$

これは[局所線形モデルの定義](#def-pml1-13-local-model)に合致し、二次勾配・定数散布が元の損失で厳密なので近似誤差はない。

**2.** $0<\eta=1/10<2/H=1$ なので離散更新は安定。[連続OUの定常分散](#thm-pml1-13-ou-covariance)は

$$
\Sigma_{\mathrm{OU}}=\frac{\eta C_\star}{2bH}
=\frac{1/10}{2\cdot1\cdot2}=\frac1{40}.
$$

[離散Lyapunov方程式](#thm-pml1-13-discrete-covariance)から

$$
\Sigma_\eta=\frac{\eta C_\star}{b(2H-\eta H^2)}
=\frac{1/10}{4-4/10}=\frac1{36}.
$$

従って差は $1/36-1/40=4/1440=1/360$。

**3.** $0<\eta<1$ の範囲で

$$
\Sigma_{\mathrm{OU}}=\frac\eta4,\qquad
\Sigma_\eta=\frac{\eta}{4-4\eta}
=\frac{\eta}{4(1-\eta)}.
$$

差を同じ分母に揃えると

$$
\Sigma_\eta-\Sigma_{\mathrm{OU}}
=\frac{\eta}{4}\left(\frac1{1-\eta}-1\right)
=\frac{\eta^2}{4(1-\eta)}.
$$

したがって両分散は $O(\eta)$、差は $O(\eta^2)$。これは分散についての近似次数であり、分布一致の主張ではない。

**4.** $\varepsilon=\pm1$ なので

$$
X_\infty=-\eta\sum_{j=0}^\infty(1-2\eta)^j\varepsilon_{-j}
$$

である。$\eta=1/10$ では係数 $1-2\eta=4/5$ は正で、各 $|\varepsilon_{-j}|=1$。絶対値は

$$
|X_\infty|\le\eta\sum_{j=0}^\infty(4/5)^j
=\frac{1/10}{1-4/5}=\frac12.
$$

一方、分散が正のGaussian分布はどんな有限区間の外にも正の確率を割り当てる。従ってこの定常分布は厳密にはGaussianでない。OU代理のGaussian分布は、共分散と近似機構を理解する道具として区別して扱う。
<!-- solution-end -->

## 10. 判定のまとめと次講

SGDをOU過程へ近似するときは、最適点、正定値曲率、局所の勾配と散布、学習率の安定域を**個別に確認**する。線形模型なら、連続OUは $H\Sigma+\Sigma H=\eta C_\star/b$、離散更新は $\Sigma=A\Sigma A^{\mathsf T}+\eta^2C_\star/b$ に従い、有限学習率の差を計算できる。

元の非線形・非GaussianなSGDの長時間分布には、局所滞在性、十分な小雑音の蓄積、外部への脱出といった追加の検討が必要である。次講 PML1-14 は、このOU／平衡という近似を破る具体例を体系的に比較する。
