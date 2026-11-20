# PML1-14 SGD=熱平衡という比喩が壊れる例は何か

<!-- definition-example-audit: strict -->

[PML1-12のミニバッチ共分散](../PML1-12/index.md#prop-pml1-12-replacement-moments)から、SGDの一歩の雑音は一般に方向と位置によって強さが異なる。[PML1-13のOU代理](../PML1-13/index.md#def-pml1-13-ou-surrogate)は、その雑音を最適点の近くで一定に凍結し、長時間の分布を計算可能にした。しかし定常分布があるというだけで、損失をエネルギーとみなした熱平衡になったわけではない。

この講義では四つの違いを手計算で見分ける。**分布が不変であること、時間反転に対して可逆であること、損失のGibbs分布になること、元の離散SGDと分布まで一致すること**は、互いに区別すべき主張である。最後に、状態に依存する雑音が消える模型も調べる。

## 1. 比較する確率模型と「平衡」の意味

有限データの損失 $f_i:\mathbb R^d\to\mathbb R$ の平均を $F=N^{-1}\sum_{i=1}^N f_i$ とする。毎回独立に添字を復元抽出する[SGDの定義](../PML1-12/index.md#def-pml1-12-minibatch-sgd)と[散布行列の定義](../PML1-12/index.md#def-pml1-12-gradient-scatter)を使うと、更新を次のように分けられる。

$$
\theta_{n+1}
=\theta_n-\eta\nabla F(\theta_n)-\eta\zeta_{n+1},
\quad
\mathbb E[\zeta_{n+1}\mid\theta_n]=0,
\quad
\operatorname{Cov}(\zeta_{n+1}\mid\theta_n)
=\frac{C(\theta_n)}b.
$$

ここで $b\ge1$ はバッチサイズ、$\eta>0$ は学習率である。$\theta_\star$ が停留点で、$H=\nabla^2F(\theta_\star)$ が対称正定値、$C_\star=C(\theta_\star)$ が対称半正定値なら、前講では $x=\theta-\theta_\star$ について線形模型を作った。以下では、まずこの線形模型の**連続OU代理**を調べる。

$$
dU_t=-HU_t\,dt+\sqrt{\frac{\eta}{b}}B\,dW_t,
\qquad BB^{\mathsf T}=C_\star.
$$

$W_t$ は $d$ 次元標準ブラウン運動、$B$ は $d\times d$ 定数行列とし、ブラウン運動と初期値は独立とする。$H,C_\star$ も定数行列である。この式は、SGDそのものの等式でなく、時間刻み $t_n=n\eta$ に対応した近似模型である。

[OUの定常Gaussian分布とLyapunov方程式](../PML1-13/index.md#thm-pml1-13-ou-covariance)によれば、$H\succ0$ なら一意な定常Gaussian分布 $N(0,\Sigma)$ があり、その共分散は

$$
H\Sigma+\Sigma H=\frac{\eta}{b}C_\star,
\qquad
\Sigma=\frac{\eta}{b}\int_0^\infty
e^{-Ht}C_\star e^{-Ht}\,dt
$$

を満たす。$C_\star\succ0$ なら $\Sigma\succ0$ となり、この分布のGaussian確率密度は各点で正である。

他方、[連続状態のGibbs密度](../PML1-09/index.md#def-pml1-09-continuous-gibbs)を停留点の二次損失

$$
F_{\mathrm{quad}}(x)=\frac12x^{\mathsf T}Hx
$$

に適用すると、温度パラメータ $T>0$ の密度は

$$
\rho_T(x)=Z_T^{-1}\exp\left(
-\frac{x^{\mathsf T}Hx}{2T}\right),
\qquad
Z_T=\frac{(2\pi T)^{d/2}}{\sqrt{\det H}}
$$

となる。正定値行列を $H=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_d)Q^{\mathsf T}$（$Q^{\mathsf T}Q=I_d$、$\lambda_i>0$）と直交対角化する。$z\in\mathbb R^d$ を使って $x=Q\operatorname{diag}(\sqrt{T/\lambda_1},\ldots,\sqrt{T/\lambda_d})z$ と置けば、

$
\frac{x^{\mathsf T}Hx}{2T}=\frac12\sum_{i=1}^d z_i^2,
\qquad
\left|\det\frac{\partial x}{\partial z}\right|
=\frac{T^{d/2}}{\sqrt{\det H}}.
$

標準Gaussian積分とこのJacobianから上の $Z_T$ が得られる。さらに $z\sim N(0,I_d)$ をこの変換で写すと、$x$ の共分散は $Q\operatorname{diag}(T/\lambda_1,\ldots,T/\lambda_d)Q^{\mathsf T}=TH^{-1}$ である。

以下でいう**損失Gibbs性**とは「ある単一の $T>0$ でOU定常分布がこの $\rho_T$ に一致する」という意味である。確率過程の[不変確率分布](../PML1-09/index.md#def-pml1-09-invariant)や[時間一様Markov過程の詳細釣合い](../PML1-10/index.md#def-pml1-10-detailed-balance)とは、判定条件が違う。

## 2. 異方性雑音は損失Gibbs分布を壊す

まず最小例を計算する。二次損失と固定雑音共分散を

$$
H=\begin{pmatrix}1&0\\0&2\end{pmatrix},
\qquad
C_\star=\begin{pmatrix}4&0\\0&2\end{pmatrix},
\qquad b=1
$$

とする。第1方向の復元力は弱いが雑音は強く、第2方向では復元力が強い。前講の[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)を各成分へ代入すると

$$
\Sigma_{11}=\frac{\eta\cdot4}{2\cdot1}=2\eta,
\qquad
\Sigma_{22}=\frac{\eta\cdot2}{2\cdot2}=\frac{\eta}{2}.
$$

もし損失Gibbs性が成り立つなら $\Sigma=TH^{-1}$ なので、第1成分からは $T=2\eta$、第2成分からは $T=\eta$ が必要である。$\eta>0$ では両立しない。つまり「方向ごとに異なる温度」を割り当てて形だけ合わせても、**一つの損失と一つの温度のGibbs分布にはならない**。

この例に含まれる一般条件を証明しよう。

<a id="thm-pml1-14-gibbs-criterion"></a>

<!-- formal-statement-start -->
> **定理（OU代理の損失Gibbs一致条件）**  
> $d\ge1$、$\eta>0$、整数 $b\ge1$、対称正定値 $H\in\mathbb R^{d\times d}$、対称半正定値 $C_\star\in\mathbb R^{d\times d}$ を与える。OU代理
>
$$
> dU_t=-HU_t\,dt+\sqrt{\eta/b}\,B\,dW_t,
> \qquad BB^{\mathsf T}=C_\star
$$
>
> の一意な定常分布が、二次損失 $F_{\mathrm{quad}}(x)=x^{\mathsf T}Hx/2$ に対する温度 $T>0$ のGibbs密度に一致するための必要十分条件は
>
$$
> C_\star=\frac{2bT}{\eta}I_d
$$
>
> である。特に、ある正の温度での一致が可能であることと、$C_\star=cI_d$ を満たす定数 $c>0$ が存在することは同値であり、このとき $T=\eta c/(2b)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Gibbs密度の共分散は $TH^{-1}$ である。一方、OU定常分布の共分散はLyapunov方程式を満たす。その方程式へ $TH^{-1}$ を代入し、得られた条件が十分でもあることを確かめる。

<!-- proof-start -->
### 証明

まず[OUの定常分布定理](../PML1-13/index.md#thm-pml1-13-ou-covariance)を $H,C_\star,\eta,b$ に適用すると、定常分布は平均0のGaussianで、共分散 $\Sigma$ は一意に定まる。$H\succ0$ の二次損失についてGibbs密度は $N(0,TH^{-1})$ である。両Gaussianが一致することは、その共分散が等しいことと同値である。

必要性を示すため $\Sigma=TH^{-1}$ をLyapunov方程式へ代入する。

$$
\begin{aligned}
H(TH^{-1})+(TH^{-1})H
&=TI_d+TI_d\\
&=2TI_d
=\frac{\eta}{b}C_\star.
\end{aligned}
$$

$\eta/b>0$ で割れば指定の条件を得る。逆に $C_\star=(2bT/\eta)I_d$ なら $\Sigma_0=TH^{-1}$ はまさにこの方程式の解である。共分散解の一意性により $\Sigma=\Sigma_0$ となるから定常Gaussian分布はGibbs密度に一致する。

最後に $C_\star=cI_d$、$c>0$ とおけば $2bT/\eta=c$ から $T=\eta c/(2b)$ を得る。$C_\star=0$ の場合は定常分布が原点の点質量であり、正の温度のGibbs密度とは一致しない。
<!-- proof-end -->

この定理は**ドリフトが $-Hx$ で移動度が単位行列**の場合の条件である。移動度や座標を変えた別のモデルに、$C_\star\propto I_d$ という形だけを無条件に移してはいけない。また、OUの定常密度がGibbsになったとしても、元のSGDの雑音分布までGaussianになったわけではない。

## 3. Gibbs性がなくても可逆、Gibbs性がなくても定常

次はもう一段微妙な違いである。前節の対角例は損失Gibbs性を失うが、各座標は独立な一次元OUである。時間を逆転しても二時刻の統計は変わらず、詳細釣合いは成立する。**異方性だけでは不可逆性の証明にならない**。

不可逆になるかどうかは、復元力の主方向と雑音の相関の方向が整合するかに依存する。[時間一様Markov過程の詳細釣合い](../PML1-10/index.md#def-pml1-10-detailed-balance)によれば、定常過程の $(U_0,U_t)$ と $(U_t,U_0)$ の同時分布がすべての $t\ge0$ で一致すれば可逆である。

OUの解は

$$
U_t=e^{-Ht}U_0+
\sqrt{\frac{\eta}{b}}\int_0^t e^{-H(t-s)}B\,dW_s.
$$

右辺の確率積分は $U_0$ と独立で平均0なので、定常初期値 $U_0\sim N(0,\Sigma)$ に対し

$$
\mathbb E[U_tU_0^{\mathsf T}]=e^{-Ht}\Sigma,
\qquad
\mathbb E[U_0U_t^{\mathsf T}]=\Sigma e^{-Ht}.
$$

この二つの行列が等しいかを直接検査できる。

<a id="thm-pml1-14-reversibility"></a>

<!-- formal-statement-start -->
> **定理（対称ドリフトOUの可逆性判定）**  
> $d\ge1$ とし、$H,C_\star\in\mathbb R^{d\times d}$ は対称正定値とする。
> 整数 $b\ge1$、学習率 $\eta>0$ を与える。OU代理を定常Gaussian分布 $N(0,\Sigma)$ から始めると、次の三条件は同値である。
>
> 1. OU過程が定常分布に関して詳細釣合いを満たす。
> 2. $H\Sigma=\Sigma H$ が成立する。
> 3. $HC_\star=C_\star H$ が成立する。
>
> さらに $D=\eta C_\star/(2b)$ と置くと、定常密度 $p$ の確率流は
>
$$
> J(x)=\bigl(-Hx+D\Sigma^{-1}x\bigr)p(x)
> =\frac12(\Sigma H-H\Sigma)\Sigma^{-1}x\,p(x)
$$
>
> である。従ってこれらの条件が成立するとき、かつそのときに限り、$J(x)$ は全点で0となる。
<!-- formal-statement-end -->

### 証明の見取り図

定常OUはGaussianだから、二時刻の結合分布は平均と共分散で決まる。時間順序の交換は交差共分散の交換に相当する。次にLyapunov方程式を使い、$H$ と $\Sigma$ の可換性を $H$ と $C_\star$ の可換性へ直す。

<!-- proof-start -->
### 証明

$H,C_\star\succ0$ から[OUの定常分布定理](../PML1-13/index.md#thm-pml1-13-ou-covariance)で $\Sigma\succ0$ が存在する。定常過程の二時刻の結合分布は中心Gaussianであり、その共分散は

$$
\operatorname{Cov}\begin{pmatrix}U_0\\U_t\end{pmatrix}
=
\begin{pmatrix}
\Sigma&\Sigma e^{-Ht}\\
e^{-Ht}\Sigma&\Sigma
\end{pmatrix}.
$$

同じ結合分布を二時刻交換しても保つことは、$e^{-Ht}\Sigma=\Sigma e^{-Ht}$ が全ての $t\ge0$ で成り立つことと同値である。ここで結合分布の交換対称性は、定常遷移核の[時間一様Markov過程の詳細釣合い](../PML1-10/index.md#def-pml1-10-detailed-balance)そのものである。等式を $t=0$ で右微分すると $-H\Sigma=-\Sigma H$ となる。逆に $H\Sigma=\Sigma H$ なら行列指数の級数の各項と $\Sigma$ が可換なので、全ての $t$ で二時刻の交換対称性が成立する。これで1と2が同値である。

[連続Lyapunov方程式](../PML1-13/index.md#thm-pml1-13-ou-covariance)は

$$
H\Sigma+\Sigma H=\frac{\eta}{b}C_\star.
$$

2を仮定すれば右辺は $2H\Sigma$ だから、$C_\star=(2b/\eta)H\Sigma$ は $H$ と可換であり3が従う。逆に3を仮定すれば、$H$ と $C_\star$ は行列指数 $e^{-Ht}$ とも可換である。積分表示

$$
\Sigma=\frac{\eta}{b}\int_0^\infty
e^{-Ht}C_\star e^{-Ht}\,dt
$$

の被積分行列は $H$ と可換なので $\Sigma$ も可換であり2を得る。

最後にGaussian密度の微分を計算すると $\nabla p(x)=-\Sigma^{-1}x\,p(x)$。Fokker–Planck方程式での確率流は、[確率流の定義](../PML1-09/index.md#def-pml1-09-zero-flux)に定数拡散行列 $D$ を代入した

$$
J(x)=(-Hx)p(x)-D\nabla p(x)
$$

である。Lyapunov方程式から $D=(H\Sigma+\Sigma H)/2$ を代入すると

$$
D\Sigma^{-1}-H
=\frac12(\Sigma H-H\Sigma)\Sigma^{-1}
$$

を得る。$p(x)>0$、$\Sigma$ は可逆だから、この線形流がすべての $x$ で0となる条件は $\Sigma H-H\Sigma=0$ と同値である。
<!-- proof-end -->

**具体的に回る確率流**を作ろう。$b=1$ とし

$$
H=\begin{pmatrix}1&0\\0&2\end{pmatrix},
\qquad
C_\star=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

$C_\star$ の固有値は $3,1$ で正である。$H$ は既に標準基底で対角で、固有値は $\lambda_1=1,\lambda_2=2$ となる。[OUの連続Lyapunov方程式](../PML1-13/index.md#thm-pml1-13-ou-covariance) の $(i,j)$ 成分を取ると、

$
(H\Sigma+\Sigma H)_{ij}
=(\lambda_i+\lambda_j)\Sigma_{ij}
=\frac{\eta}{b}C_{\star,ij}
\qquad (i,j\in\{1,2\})
$

となる。これは $H\Sigma$ では第 $i$ 行、$\Sigma H$ では第 $j$ 列へそれぞれ固有値が掛かるためである。$b=1$ を代入すると $\Sigma_{11}=\eta$、$\Sigma_{12}=\eta/3$、$\Sigma_{22}=\eta/2$ を得る。$D=\eta C_\star/(2b)$ と併せて表示すれば

$$
\Sigma=\eta\begin{pmatrix}1&1/3\\1/3&1/2\end{pmatrix},
\qquad
D=\eta\begin{pmatrix}1&1/2\\1/2&1\end{pmatrix}.
$$

$H\Sigma$ の $(1,2)$ 成分は $\eta/3$、$\Sigma H$ の同成分は $2\eta/3$ だから一致しない。さらに $t>0$ で

$$
\mathbb E[U_{t,1}U_{0,2}]=\frac{\eta}{3}e^{-t},
\qquad
\mathbb E[U_{0,1}U_{t,2}]=\frac{\eta}{3}e^{-2t}
$$

は異なる。従ってこの定常OUは**分布を保ちながら不可逆**であり、確率流はゼロでない。この非零流は[前講までに扱った非可逆OUの例](../PML1-10/index.md#thm-pml1-10-rotating-ou)と同じ論点を、SGDの異方的な勾配雑音から生み出したものである。

定常密度 $p$ は時間的に一定でも、確率は状態空間内で巡回できる。実際、$A=(\Sigma H-H\Sigma)/2$ は反対称行列で、$J=A\Sigma^{-1}x\,p$ である。積の微分を各座標に施すと

$$
\nabla\cdot J
=\{\operatorname{tr}(A\Sigma^{-1})
-x^{\mathsf T}\Sigma^{-1}A\Sigma^{-1}x\}p=0.
$$

前項は対称行列 $\Sigma^{-1}$ と反対称行列 $A$ の積の跡なので0、後項は反対称行列による二次形式なので0である。**流れがゼロであること**と**流れの発散がゼロであること**を取り違えてはいけない。

## 4. Gibbs型のOUと有限学習率のSGDを区別する

今度は等方的な一次元雑音で、[第2節のGibbs一致条件](#thm-pml1-14-gibbs-criterion)を満たす場合に戻る。$N=2,b=1$ として

$$
f_1(x)=x^2+x,\qquad f_2(x)=x^2-x
$$

を考える。平均損失 $F(x)=x^2$、停留点 $x_\star=0$、曲率 $h=2$、個別勾配偏差は $+1,-1$ で、散布 $C_\star=1$ である。[復元抽出SGD](../PML1-12/index.md#def-pml1-12-minibatch-sgd)は近似でなく厳密に

$$
X_{n+1}=(1-2\eta)X_n-\eta\varepsilon_{n+1},
\qquad
\mathbb P(\varepsilon_n=1)=\mathbb P(\varepsilon_n=-1)=\frac12
$$

となる。$\varepsilon_n$ は各時刻独立とする。

<a id="prop-pml1-14-discrete-counterexample"></a>

<!-- formal-statement-start -->
> **命題（有限学習率と非Gaussian定常分布の反例）**  
> 上の二損失から作る一次元SGDで $0<\eta<1$ とする。この更新には有限二次モーメントの一意な定常分布があり、平均0・分散
>
$$
> v_{\mathrm{SGD}}=\frac{\eta}{4(1-\eta)}
$$
>
> を持つ。対応するOU代理の定常分布は正の温度 $T=\eta/2$ の損失Gibbs分布 $N(0,\eta/4)$ である。特に $\eta=1/2$ の離散SGDの定常分布は
>
$$
> \frac12\delta_{-1/2}+\frac12\delta_{1/2}
$$
>
> であり、OUのGaussian分布と一致しない。$0<\eta\le1/2$ では離散定常分布の台は区間 $[-1/2,1/2]$ に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

係数 $a=1-2\eta$ は $|a|<1$ を満たす。過去の独立雑音を足して定常解を作り、等比級数から分散を計算する。$\eta=1/2$ では一歩前の値が完全に消えるので分布そのものも求まる。

<!-- proof-start -->
### 証明

$a=1-2\eta$ とすると $0<\eta<1$ から $|a|<1$。過去に独立な $\pm1$ の雑音を用意すると、定常解

$$
X_\infty=-\eta\sum_{j=0}^\infty a^j\varepsilon_{-j}
$$

は絶対収束する。二乗可積分性、定常性、一意性は[線形SGDの定常分布定理](../PML1-13/index.md#thm-pml1-13-discrete-covariance)の一次元の場合であるが、ここでは分散を直接計算する。異なる時刻の雑音の積の期待値は0で、各雑音の分散は1だから

$$
\begin{aligned}
\operatorname{Var}(X_\infty)
&=\eta^2\sum_{j=0}^\infty a^{2j}\\
&=\frac{\eta^2}{1-(1-2\eta)^2}\\
&=\frac{\eta^2}{4\eta-4\eta^2}
=\frac{\eta}{4(1-\eta)}.
\end{aligned}
$$

[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)へ $h=2,C_\star=b=1$ を入れると $v_{\mathrm{OU}}=\eta/(2\cdot2)=\eta/4$。一次元の等方雑音なので[損失Gibbs一致条件](#thm-pml1-14-gibbs-criterion)から $T=\eta/2$ である。しかし $\eta>0$ では $v_{\mathrm{SGD}}/v_{\mathrm{OU}}=1/(1-\eta)>1$ だから、少なくとも分散が一致しない。

$\eta=1/2$ では $a=0$ であり、$X_{n+1}=-\varepsilon_{n+1}/2$ は一歩で $\pm1/2$ の二点分布になる。$0<\eta\le1/2$ なら $0\le a<1$ なので、絶対収束級数を項別に評価して

$$
|X_\infty|
\le\eta\sum_{j=0}^\infty a^j
=\frac{\eta}{1-(1-2\eta)}
=\frac12
$$

を得る。正の分散を持つGaussian分布は、任意の有限区間の外に正の確率を割り当てる。一方、上で構成した離散過程の定常法則は $[-1/2,1/2]$ に集中するので、両者は一致しない。
<!-- proof-end -->

$\eta=1/4$ なら $v_{\mathrm{SGD}}=1/12$、$v_{\mathrm{OU}}=1/16$ で、その差は $1/48$ である。$\eta\downarrow0$ では差が

$$
v_{\mathrm{SGD}}-v_{\mathrm{OU}}
=\frac{\eta^2}{4(1-\eta)}=O(\eta^2)
$$

へ小さくなるが、**任意の有限な学習率で分布が厳密に等しくなる**ことを意味しない。この違いは、[PML1-11のLangevin離散化による定常分布の偏り](../PML1-11/index.md#prop-pml1-11-gibbs-bias)とも対応する。

## 5. 雑音が位置で消えると「一定温度」自体が壊れる

ここまでのOU代理は、雑音の散布を停留点で固定していた。実際のSGDでは同じデータを使っていても、$C(\theta)$ は $\theta$ で変化する。[局所誤差の評価](../PML1-13/index.md#prop-pml1-13-local-remainders)は一歩の変化を抑えるが、固定した正の温度があることまでは保証しない。

二つの個別損失を

$$
f_1(x)=\frac12x^2,\qquad
f_2(x)=\frac32x^2
$$

とする。平均損失 $F(x)=x^2$、全勾配は $2x$、個別勾配は $x,3x$ だから、偏差は $-x,+x$。従って散布は $C(x)=x^2$ であり、最適点 $x_\star=0$ で $C_\star=0$ となる。

<a id="prop-pml1-14-multiplicative-collapse"></a>

<!-- formal-statement-start -->
> **命題（状態依存雑音の消失と点質量への収束）**  
> 上の二次損失から作る独立な復元抽出 $b=1$ のSGDで、初期値 $X_0$ は有限な実数値確率変数とし、以後の抽出から独立とする。学習率 $0<\eta<2/3$ なら $X_n\to0$ がほとんど確実に成立し、唯一の不変確率分布は点質量 $\delta_0$ である。特に、正の一定温度 $T$ の損失Gibbs密度とは一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの損失の微分は $x$ と $3x$ なので、一歩の更新は二種類の係数による掛け算である。どちらの係数も絶対値が1未満なら軌道は必ず原点へ収縮する。不変分布は収束先へ集中せざるを得ない。

<!-- proof-start -->
### 証明

復元抽出では各時刻に確率 $1/2$ ずつどちらかの勾配を選ぶため、更新は

$$
X_{n+1}=
\begin{cases}
(1-\eta)X_n,&\text{確率 }1/2,\\
(1-3\eta)X_n,&\text{確率 }1/2.
\end{cases}
$$

$0<\eta<2/3$ なら $|1-\eta|<1$、$|1-3\eta|<1$。従って

$$
r=\max\{|1-\eta|,|1-3\eta|\}<1,
\qquad |X_n|\le r^n|X_0|
$$

が各標本路で成立する。$X_0$ が有限値を取るので $X_n\to0$ がほとんど確実に成り立つ。原点から出発すれば更新後も原点なので、$\delta_0$ は不変である。

他に不変確率分布 $\mu$ があると仮定し、$X_0\sim\mu$ で開始する。不変性から各 $X_n$ の分布は $\mu$ で同じである。任意の有界連続関数 $\varphi$ を取り、$M=\sup_x|\varphi(x)|<\infty$ とする。原点での連続性により、任意の $\varepsilon>0$ に対して、$|x|<\delta$ なら $|\varphi(x)-\varphi(0)|<\varepsilon$ となる $\delta>0$ がある。$X_0$ は有限値なので、十分大きい $R>0$ を選んで $\mathbb P(|X_0|>R)<\varepsilon$ とできる。$r^nR<\delta$ となる $n$ では、$|X_0|\le R$ のとき $|X_n|<\delta$ である。したがって

$$
|\mathbb E[\varphi(X_n)]-\varphi(0)|
\le\varepsilon+2M\mathbb P(|X_0|>R)
\le (1+2M)\varepsilon.
$$

$\varepsilon$ は任意だから、

$$
\int_{\mathbb R}\varphi(x)\,\mu(dx)
=\mathbb E[\varphi(X_n)]
\longrightarrow\varphi(0).
$$

従って $\mu=\delta_0$ であり、一意性も分かる。$F(x)=x^2$ の正温度Gibbs密度は正規化可能なGaussian密度で、点質量ではないから一致しない。
<!-- proof-end -->

この例では平均損失自体は**厳密な二次式**で、勾配の線形化誤差は0である。それでも固定雑音を持つ正温度の模型にはならない。原因は非線形な損失でなく、**標本ごとの勾配のばらつきが位置とともに消える**ことである。$\eta=1/2$ では二つの係数が $1/2,-1/2$ となり、各標本路で $|X_n|=2^{-n}|X_0|$ を直接確認できる。

## 6. 四つの判定を混ぜない

| 問うこと | この講の検査法 | 成立しない例 |
| --- | --- | --- |
| 定常分布は存在するか | $H\succ0$ のOU、または離散更新の収縮を確認 | 平坦方向へ雑音が蓄積する[PML1-13の例](../PML1-13/index.md#thm-pml1-13-discrete-covariance)の仮定外 |
| 損失のGibbs分布か | OUなら $C_\star=(2bT/\eta)I_d$ を確認 | 第2節の異方性雑音 |
| 詳細釣合いはあるか | OUなら $HC_\star=C_\star H$ を確認 | 第3節の非可換雑音 |
| 元のSGDと分布まで一致するか | 離散学習率と雑音の法則を検査 | 第4節の二点分布 |

前二節から特に重要なのは、**非Gibbsだが可逆**な例（対角 $H,C_\star$）と、**不変Gaussianだが非可逆**な例（非可換 $H,C_\star$）が両方作れることである。さらに有限学習率と位置依存雑音は、OU代理を元のSGDと同一視する別の飛躍を崩す。

## 7. 演習 Level A

<a id="ex-pml1-14-a01"></a>
### PML1-14-A01 単一温度を復元する

- Level: A

$H=\operatorname{diag}(1,3)$、$C_\star=2I_2$、$b=2$、$\eta=1/5$ のOU代理が損失Gibbs分布を持つことを確認し、温度と定常共分散を求めよ。

<!-- solution-start -->
#### 詳細解答

$H$ の固有値は $1,3>0$、$C_\star=2I_2\succ0$ である。[Gibbs一致条件](#thm-pml1-14-gibbs-criterion)の $c=2$ に対し

$$
T=\frac{\eta c}{2b}=\frac{(1/5)2}{4}=\frac1{10}.
$$

従ってGibbs共分散は

$$
TH^{-1}=\frac1{10}\operatorname{diag}(1,1/3)
=\operatorname{diag}(1/10,1/30).
$$

[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)に各曲率を入れても $\Sigma_{11}=\eta 2/(2b\cdot1)=1/10$、$\Sigma_{22}=\eta 2/(2b\cdot3)=1/30$ となる。
<!-- solution-end -->

<a id="ex-pml1-14-a02"></a>
### PML1-14-A02 非Gibbsと可逆性を分ける

- Level: A

$H=\operatorname{diag}(1,2)$、$C_\star=\operatorname{diag}(4,2)$、$b=1$、$\eta=1/5$ について、定常共分散を求め、損失Gibbs性と詳細釣合いをそれぞれ判定せよ。

<!-- solution-start -->
#### 詳細解答

$H,C_\star$ は対称正定値である。[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)から

$$
\Sigma=\operatorname{diag}\left(
\frac{(1/5)4}{2},\frac{(1/5)2}{4}\right)
=\operatorname{diag}(2/5,1/10).
$$

Gibbsなら $H\Sigma=TI_2$ だが $H\Sigma=\operatorname{diag}(2/5,1/5)$ なので単一温度 $T$ はない。一方、$HC_\star=C_\star H$ は対角行列同士なので成立する。[可逆性判定](#thm-pml1-14-reversibility)より、**非Gibbsだが詳細釣合いは成立**する。
<!-- solution-end -->

<a id="ex-pml1-14-a03"></a>
### PML1-14-A03 二時刻の順序を交換する

- Level: A

$H=\operatorname{diag}(1,2)$、$C_\star=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$b=1$ のOUで、定常時の $\mathbb E[U_{t,1}U_{0,2}]$ と $\mathbb E[U_{0,1}U_{t,2}]$ を求め、$t>0$ の可逆性を判定せよ。

<!-- solution-start -->
#### 詳細解答

$C_\star$ の固有値は $3,1>0$ なので定常共分散は正定値。[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)から $\Sigma_{12}=\eta C_{\star,12}/(1+2)=\eta/3$。$H$ が対角なので $e^{-Ht}=\operatorname{diag}(e^{-t},e^{-2t})$。第3節の二時刻共分散へ代入すると

$$
\mathbb E[U_{t,1}U_{0,2}]=\frac{\eta e^{-t}}3,
\quad
\mathbb E[U_{0,1}U_{t,2}]=\frac{\eta e^{-2t}}3.
$$

$t>0$ では両者が異なるため二時刻結合分布は交換対称でない。[可逆性判定](#thm-pml1-14-reversibility)より詳細釣合いは成立しない。
<!-- solution-end -->

<a id="ex-pml1-14-a04"></a>
### PML1-14-A04 有限学習率の差を数値化する

- Level: A

第4節の二損失によるSGDで $\eta=1/4$ とする。離散定常分散、OU定常分散、比、差を計算せよ。

<!-- solution-start -->
#### 詳細解答

更新係数は $a=1-2(1/4)=1/2$。一歩雑音分散は $\eta^2=1/16$ なので、離散定常分散 $v$ は $v=a^2v+1/16$ を満たす。

$$
v(1-1/4)=1/16,\quad
v=\frac{1/16}{3/4}=\frac1{12}.
$$

一方、[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)から $v_{\mathrm{OU}}=\eta/(2h)=1/16$。比は $(1/12)/(1/16)=4/3$、差は $1/12-1/16=(4-3)/48=1/48$ である。
<!-- solution-end -->

<a id="ex-pml1-14-a05"></a>
### PML1-14-A05 乗法雑音が消える速さ

- Level: A

第5節の二次損失を $b=1,\eta=1/2$ で学習する。各更新の係数を求め、任意の有限な $X_0$ について $|X_n|$ と収束先を示せ。

<!-- solution-start -->
#### 詳細解答

$f_1'(x)=x$ から第1更新の係数は $1-\eta=1/2$、$f_2'(x)=3x$ から第2更新の係数は $1-3\eta=-1/2$。したがってどの添字を選んでも絶対値は半分で

$$
|X_{n+1}|=\frac12|X_n|,
\qquad |X_n|=2^{-n}|X_0|\longrightarrow0.
$$

符号は選択に依存するが、大きさは各標本路で決定的に減少する。$\delta_0$ が唯一の不変分布となることは[第5節の命題](#prop-pml1-14-multiplicative-collapse)に一致する。
<!-- solution-end -->

## 8. 演習 Level B

<a id="ex-pml1-14-b01"></a>
### PML1-14-B01 定常確率流を実際に求める

- Level: B

第3節の非可換例 $H=\operatorname{diag}(1,2)$、$C_\star=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$b=1$ で、$\Sigma^{-1}$ と $J(x)/p(x)$ を行列で求め、$J(1,0)\ne0$ を示せ。

<!-- solution-start -->
#### 詳細解答

$\Sigma=\eta S$ とし $S=\begin{pmatrix}1&1/3\\1/3&1/2\end{pmatrix}$ と置く。$\det S=1/2-1/9=7/18>0$ なので

$$
\Sigma^{-1}=\frac1\eta S^{-1}
=\frac1\eta\begin{pmatrix}9/7&-6/7\\-6/7&18/7\end{pmatrix}.
$$

第3節の[確率流公式](#thm-pml1-14-reversibility)では $D=\eta\begin{pmatrix}1&1/2\\1/2&1\end{pmatrix}$ だから

$$
D\Sigma^{-1}
=\begin{pmatrix}6/7&3/7\\-3/14&15/7\end{pmatrix}.
$$

従って

$$
\frac{J(x)}{p(x)}
=(D\Sigma^{-1}-H)x
=\begin{pmatrix}-1/7&3/7\\-3/14&1/7\end{pmatrix}x.
$$

$x=(1,0)^{\mathsf T}$ では $J(1,0)=p(1,0)(-1/7,-3/14)^{\mathsf T}\ne0$。Gaussian密度は全点で正である。定常性とゼロ確率流が異なることが確認できる。
<!-- solution-end -->

<a id="ex-pml1-14-b02"></a>
### PML1-14-B02 二点雑音とGaussian雑音を比較する

- Level: B

第4節のモデルで $\eta=1/2$ とする。元のSGDと、雑音だけを同じ平均0・分散1のGaussianに置き換えた線形更新と、連続OU代理の三つについて、定常分布と分散を比較せよ。

<!-- solution-start -->
#### 詳細解答

二つの離散更新では平均の更新係数が $a=1-2\eta=0$ となり、一歩前の値が消える。連続OUでは代わりに $\mathbb E[U_t\mid U_0]=e^{-2t}U_0$ という時間 $t$ に対する減衰がある。元のSGDは $\varepsilon=\pm1$ なので $X_{n+1}=\mp1/2$、定常分布は $(\delta_{-1/2}+\delta_{1/2})/2$、分散は $1/4$ である。

Gaussian雑音 $\xi\sim N(0,1)$ を代入した離散更新は $X_{n+1}=-\xi/2$ なので、定常分布は $N(0,1/4)$。一歩の分散は同じでも二点分布とGaussian分布は一致しない。

連続OUは $dU_t=-2U_t\,dt+\sqrt{1/2}\,dW_t$ で、[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)により分散は $(1/2)/(2\cdot2)=1/8$、定常分布は $N(0,1/8)$。したがって**一歩雑音の法則の差**と**連続・離散の分散差**は別々の不一致である。
<!-- solution-end -->

<a id="ex-pml1-14-b03"></a>
### PML1-14-B03 定常分布が等方的でもGibbsとは限らない

- Level: B

$H=\operatorname{diag}(1,4)$、$C_\star=\operatorname{diag}(2,8)$、$b=2$、$\eta=1/10$ とする。OUの定常共分散が等方的であることを示したうえで、損失Gibbs性と可逆性を判定せよ。

<!-- solution-start -->
#### 詳細解答

$H\succ0$、$C_\star\succ0$ を確認できる。[正定値ドリフトを持つOUの定常Gaussian分布](../PML1-13/index.md#thm-pml1-13-ou-covariance)の対角成分へ代入すると

$$
\Sigma_{11}=\frac{(1/10)2}{2\cdot2\cdot1}=\frac1{20},
\qquad
\Sigma_{22}=\frac{(1/10)8}{2\cdot2\cdot4}=\frac1{20}.
$$

従って $\Sigma=I_2/20$ は等方的である。しかし損失の曲率を掛けると $H\Sigma=\operatorname{diag}(1/20,1/5)$ で、単一の $TI_2$ と一致しない。ゆえに[損失Gibbs一致条件](#thm-pml1-14-gibbs-criterion)は満たされない。一方 $H,C_\star$ は可換なので[可逆性判定](#thm-pml1-14-reversibility)から詳細釣合いは成立する。**共分散が等方的**という条件は**損失Gibbs性**の代わりにならない。
<!-- solution-end -->

## 9. 演習 Level C

<a id="ex-pml1-14-c01"></a>
### PML1-14-C01 OUの平衡判定と離散補正を一続きで検算する

- Level: C

$d=2$、$b=1$、$\eta=1/4$、$H=\operatorname{diag}(1,2)$、$C_\star=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ とする。対称正定値 $H,C_\star$ と、有限二次モーメントの初期値 $X_0$ から独立で、各時刻間でも独立同分布な平均0・共分散 $C_\star$ の雑音 $\varepsilon_n$（$n\ge1$）による線形離散代理

$$
X_{n+1}=(I_2-\eta H)X_n-\eta\varepsilon_{n+1}
$$

を考える。雑音はGaussianである必要はない。

1. OU代理の定常共分散 $\Sigma_{\mathrm{OU}}$ を求め、Lyapunov方程式へ代入して検算せよ。
2. OU代理について、単一温度の損失Gibbs性と詳細釣合いをそれぞれ判定し、非可逆性の根拠となる二時刻交差共分散を示せ。
3. 離散代理の収縮条件を確認し、その定常共分散 $\Sigma_\eta$ を求めよ。
4. $\Sigma_\eta-\Sigma_{\mathrm{OU}}$ を求め、連続OUの共分散をそのまま離散更新へ代入できない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** $H$ の固有値は $1,2>0$。$C_\star$ の固有値は $3,1>0$ なので、[OU定常Gaussian分布定理](../PML1-13/index.md#thm-pml1-13-ou-covariance)が適用できる。$H$ は既に対角なので、同定理の成分表示に $\lambda_1=1,\lambda_2=2$ を入れる。

$$
(\Sigma_{\mathrm{OU}})_{ij}
=\frac{\eta C_{\star,ij}}{\lambda_i+\lambda_j},
\qquad
\Sigma_{\mathrm{OU}}
=\begin{pmatrix}1/4&1/12\\1/12&1/8\end{pmatrix}.
$$

実際に左右から $H$ を掛けると

$$
H\Sigma_{\mathrm{OU}}
=\begin{pmatrix}1/4&1/12\\1/6&1/4\end{pmatrix},
\qquad
\Sigma_{\mathrm{OU}}H
=\begin{pmatrix}1/4&1/6\\1/12&1/4\end{pmatrix}.
$$

和は $\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}=\eta C_\star/b$ であり、Lyapunov方程式を満たす。

**2.** [Gibbs一致条件](#thm-pml1-14-gibbs-criterion)は $C_\star=cI_2$ を要求するが非対角成分が1なので不成立。別の直接判定でも $H\Sigma_{\mathrm{OU}}$ は対角行列 $TI_2$ でない。さらに

$$
HC_\star=\begin{pmatrix}2&1\\2&4\end{pmatrix},
\qquad
C_\star H=\begin{pmatrix}2&2\\1&4\end{pmatrix}
$$

であり異なるため、[可逆性判定](#thm-pml1-14-reversibility)から詳細釣合いも不成立である。$\Sigma_{\mathrm{OU},12}=1/12$ を使うと

$$
\mathbb E[U_{t,1}U_{0,2}]=\frac{e^{-t}}{12},
\qquad
\mathbb E[U_{0,1}U_{t,2}]=\frac{e^{-2t}}{12}
$$

であり、$t>0$ で交換対称性が破れることも直接分かる。

**3.** $A=I_2-\eta H=\operatorname{diag}(3/4,1/2)$ だから $\|A\|_{\mathrm{op}}=3/4<1$。独立雑音の有限二次モーメントと合わせて[離散Lyapunov方程式](../PML1-13/index.md#thm-pml1-13-discrete-covariance)が適用できる。その成分表示は

$$
(\Sigma_\eta)_{ij}
=\frac{\eta C_{\star,ij}}
{\lambda_i+\lambda_j-\eta\lambda_i\lambda_j}.
$$

分母と分子を成分ごとに書き出すと

$$
\begin{aligned}
(\Sigma_\eta)_{11}&=\frac{(1/4)2}{2-1/4}=\frac27,\\
(\Sigma_\eta)_{12}&=\frac{(1/4)1}{3-1/2}=\frac1{10},\\
(\Sigma_\eta)_{22}&=\frac{(1/4)2}{4-1}=\frac16.
\end{aligned}
$$

従って $\Sigma_\eta=\begin{pmatrix}2/7&1/10\\1/10&1/6\end{pmatrix}$ である。

**4.** 対応する成分を引いて

$$
\Sigma_\eta-\Sigma_{\mathrm{OU}}
=\begin{pmatrix}
2/7-1/4&1/10-1/12\\
1/10-1/12&1/6-1/8
\end{pmatrix}
=\begin{pmatrix}1/28&1/60\\1/60&1/24\end{pmatrix}.
$$

OUは連続Lyapunov方程式 $H\Sigma+\Sigma H=\eta C_\star/b$ に従うが、離散更新の定常共分散は $A\Sigma A^{\mathsf T}+\eta^2 C_\star/b=\Sigma$ に従う。後者を展開すると $\eta^2H\Sigma H$ の項が残るため、有限 $\eta$ の差を捨てられない。これは**同じ一歩の平均と共分散を近似で合わせても、長時間の共分散まで一致するとは限らない**ことの数値的な証拠である。
<!-- solution-end -->

## 10. 次の講義へ

この講で扱ったのは、損失の二次近似と雑音の散布が決まっても、定常性・可逆性・Gibbs性・離散分布は別々の条件を要する、ということである。特にSGDの熱平衡という比喩は、**どの確率過程の、どの分布を、どの時間尺度で比較するか**を指定して初めて数式として検査できる。

次の PML1-15 では、物理的な**対称性**を、群が状態へ作用する仕組みから定義し、不変性と同変性を具体例から区別する。
