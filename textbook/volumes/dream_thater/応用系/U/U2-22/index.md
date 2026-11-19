# U2-22 ランドマーク型 EKF-SLAM：交差共分散の役割

[前講の軌跡・地図の同時事後](../U2-21/index.md#def-u2-21-joint-posterior)は、ロボットの位置と地図を別々に推定してから貼り合わせる方法では相関を失うと教えました。しかし全軌跡・全地図の事後をそのまま保持するのは高価です。そこで、**現在の姿勢と目印の座標を一つの状態に並べ、平均と共分散で近似**するのがランドマーク型拡張 Kalman フィルタによる SLAM（EKF-SLAM）です。

核心となる問いは「いま見た目印以外の座標も、なぜ変わるのか」です。答えは、ロボットと各目印の誤差が**同じ観測履歴から相関している**ことにあります。本講は既知のデータ対応、局所的に有効な線形化、固定された世界座標の事前を仮定します。[誤対応の確率的処理](../U2-19/index.md#thm-u2-19-association-posterior)と[共通座標変換のゲージ自由度](../U2-21/index.md#def-u2-21-gauge)を無条件に解決する方法ではありません。

<!-- definition-example-audit: strict -->

## 1. 姿勢と未知の目印を同じ確率変数にする

[平面姿勢](../U2-06/index.md#def-u2-06-planar-pose)は $g=(x,y,\theta)^{\mathsf T}$、固定したランドマークは $m_j=(a_j,b_j)^{\mathsf T}$ です。位置と地図の単位は m、角度は rad とします。目印の番号は実物に一対一で対応し、観測時にどの番号を見たかを正しく判定できているものとします。

平均は推定値、分散共分散行列は推定誤差の二次モーメントです。対角ブロックは姿勢または各目印の不確実性、非対角ブロックは**同時にずれやすい方向**を表します。角度は円周上の変数ですが、ここでは[角度差の正規化](../U2-06/index.md#def-u2-06-angle-wrap)の切替点をまたがない一つの局所座標枝で誤差を表します。したがって以下の Gaussian は大域的な厳密分布ではなく局所近似です。

<a id="def-u2-22-augmented-state"></a>

<!-- formal-statement-start -->
> **定義（ランドマーク型 SLAM の増補状態）**  
> $k\ge0$ 個の識別済みで静止する平面ランドマークについて、局所座標での状態と平均を

$$
s=(g^{\mathsf T},m_1^{\mathsf T},\ldots,m_k^{\mathsf T})^{\mathsf T}
\in\mathbb R^{n},\qquad n=3+2k
$$

> と定める。観測履歴を条件とする近似分布を $N(\hat s,P)$ と書き、$P\in\mathbb R^{n\times n}$ は対称正定値とする。姿勢を先頭に並べたブロック表示を

$$
P=\begin{pmatrix}P_{gg}&P_{gm}\\P_{mg}&P_{mm}\end{pmatrix},
\qquad P_{mg}=P_{gm}^{\mathsf T}
$$

> とし、$P_{gg}$ は $3\times3$、$P_{gm}$ は $3\times2k$、$P_{mm}$ は $2k\times2k$ とする。$P_{gm}$ と $P_{mm}$ の非対角部分を含めて保存する近似を**増補状態の Gaussian 近似**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-22-augmented-state -->
**定義の確認**：目印2個なら状態は $(x,y,\theta,a_1,b_1,a_2,b_2)^{\mathsf T}$ の7次元です。例えば $P=I_7$ は全ての対角要素が1で、対称かつ任意の非零 $v$ に対して $v^{\mathsf T}Pv=\sum_{i=1}^7v_i^2>0$ なので正定値です。$P_{gg}=I_3$、$P_{gm}=0_{3\times4}$、$P_{mm}=I_4$ と行列の各位置を確認できます。ただし、この例で交差項が0なのは**特別な事前**の仮定であり、観測後も0とは限りません。
<!-- definition-example-end -->

[前講の同時事後から周辺を求める定理](../U2-21/index.md#thm-u2-21-marginals)と同様に、ここでも地図だけの平均・共分散を取り出すことはできます。しかし周辺ブロックだけ残して $P_{gm}$ を捨てれば、元の同時 Gaussian は復元できません。

## 2. 動かすのはロボットだけでも、交差項は動く

既知入力 $u_t$ の下でロボットは $g_t=f(g_{t-1},u_t,\xi_t)$ に従い、地図 $m$ は静止するとします。$f$ は微分可能な局所運動写像、$\xi_t\in\mathbb R^d$ は平均0・共分散 $M_t\succeq0$ の過程雑音で、直前の増補状態の誤差と独立です。誤差を一次 Taylor 展開した行列を

$$
F_t=D_gf(\hat g_{t-1}^{+},u_t,0)\in\mathbb R^{3\times3},\qquad
G_t=D_{\xi}f(\hat g_{t-1}^{+},u_t,0)\in\mathbb R^{3\times d}
$$

と置きます。上付き $+$ は直前の観測後、$-$ は今回の観測前です。微分点は前時刻の推定姿勢であり、[EKF の局所線形化点](../U2-09/index.md#def-u2-09-linearization-points)に従います。

<a id="prop-u2-22-prediction"></a>

<!-- formal-statement-start -->
> **命題（増補状態の一次予測と交差共分散）**  
> [増補状態](#def-u2-22-augmented-state)の共分散 $P_{t-1}^{+}\succ0$ と、上記の微分可能な運動・独立な過程雑音を仮定する。地図は静止し、新規目印の追加は行わない。このとき一次線形化した平均と共分散の予測は

$$
\hat s_t^-=(f(\hat g_{t-1}^+,u_t,0)^{\mathsf T},\hat m_{t-1}^{+\mathsf T})^{\mathsf T},
\qquad P_t^-=A_tP_{t-1}^+A_t^{\mathsf T}+B_tM_tB_t^{\mathsf T},
$$

> ただし $A_t=\operatorname{diag}(F_t,I_{2k})$、$B_t=(G_t^{\mathsf T},0_{d\times2k})^{\mathsf T}$ であり、特に

$$
P_{gm,t}^-=F_tP_{gm,t-1}^+,\qquad
P_{mm,t}^-=P_{mm,t-1}^+
$$

> が成り立つ。これらは非線形模型の厳密共分散ではなく、**一次誤差模型の共分散**である。
<!-- formal-statement-end -->

**証明の見取り図**：[独立誤差の一次伝播](../U2-09/index.md#prop-u2-09-first-order-prediction)を、静止する地図を含む拡大ベクトルに適用し、行列積の右上・右下を取り出します。

<!-- proof-start -->
### 証明

直前の推定誤差を $\delta s=(\delta g^{\mathsf T},\delta m^{\mathsf T})^{\mathsf T}$ とします。平均値で一次 Taylor 展開すると

$$
\delta g_t^-\simeq F_t\delta g_{t-1}^+ +G_t\xi_t,
\qquad
\delta m_t^-=\delta m_{t-1}^+.
$$

よって $\delta s_t^-\simeq A_t\delta s_{t-1}^++B_t\xi_t$。雑音と旧誤差の独立性、雑音平均0から交差期待値が消え、[独立誤差の一次伝播](../U2-09/index.md#prop-u2-09-first-order-prediction)と同じ展開で $P_t^-=A_tP_{t-1}^+A_t^{\mathsf T}+B_tM_tB_t^{\mathsf T}$ を得ます。右上を掛けると

$$
(A_tP^+A_t^{\mathsf T})_{gm}=F_tP_{gm}^+I_{2k}^{\mathsf T}=F_tP_{gm}^+.
$$

雑音行列 $B_t$ の地図行は全て0なので、雑音の交差ブロックは0です。右下は $I_{2k}P_{mm}^+I_{2k}^{\mathsf T}=P_{mm}^+$ となります。
<!-- proof-end -->

**具体例**：$k=1$ として $F_t=\operatorname{diag}(2,1,1)$、旧 $P_{gm}=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix}$ とすれば、新交差ブロックは

$$
F_tP_{gm}=\begin{pmatrix}2&0\\0&2\\0&0\end{pmatrix}.
$$

$F_t$ はここでは任意の局所線形運動の例で、平面剛体運動の全てを表すものではありません。地図の座標自体は動かなくても、姿勢との**誤差の結び付き**は変わります。

## 3. 観測は二つの状態ブロックを同時に見る

[既知ランドマークの測距・方位予測](../U2-08/index.md#def-u2-08-range-bearing)は、既知の地図座標を入力していました。本講では同じ関数の**地図座標も未知変数**として微分します。目印 $j$ の測定は2成分（距離 m、方位 rad）で、独立な観測雑音の共分散は $R_j\succ0$（$2\times2$）とします。

姿勢 $\hat g^-=(x,y,\theta)$、目印 $\hat m_j^-=(a,b)$ に対し、$d_x=a-x$、$d_y=b-y$、$q=d_x^2+d_y^2>0$、$r=\sqrt q$ とします。角度残差が wrap の切替点にない局所枝でだけ通常の偏微分を使います。

<a id="def-u2-22-landmark-jacobian"></a>

<!-- formal-statement-start -->
> **定義（増補状態に対する測距・方位の観測行列）**  
> $k\ge1$、$1\le j\le k$、$q>0$ とする。予測観測を

$$
h_j(s)=
\begin{pmatrix}
\sqrt{(a_j-x)^2+(b_j-y)^2}\\
\operatorname{wrap}(\operatorname{atan2}(b_j-y,a_j-x)-\theta)
\end{pmatrix}
$$

> とし、観測行列 $H_j=D_sh_j(\hat s^-)\in\mathbb R^{2\times(3+2k)}$ を局所枝での Jacobi 行列と定義する。その姿勢・該当目印の列ブロックは

$$
H_g=\begin{pmatrix}
-d_x/r&-d_y/r&0\\
d_y/q&-d_x/q&-1
\end{pmatrix},
\qquad
H_{m_j}=\begin{pmatrix}
d_x/r&d_y/r\\
-d_y/q&d_x/q
\end{pmatrix}
$$

> で、ほかの目印の列は零行列とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-22-landmark-jacobian -->
**定義の確認**：$\hat g^-=(0,0,0)$、$\hat m_1^-=(3,4)$ とすると $d=(3,4)$、$q=25>0$、$r=5$、予測は $(5,\operatorname{atan2}(4,3))$ です。成分ごとの微分に上の比を代入して

$$
H_g=\begin{pmatrix}-3/5&-4/5&0\\4/25&-3/25&-1\end{pmatrix},
\qquad
H_{m_1}=\begin{pmatrix}3/5&4/5\\-4/25&3/25\end{pmatrix}
$$

となります。$H_j$ の列数は目印1個なら5、2個なら7で、2個目に関係しない列は0です。$q>0$ と角度の局所枝の条件を確認し、距離の微分と角度の微分を混ぜません。
<!-- definition-example-end -->

<a id="prop-u2-22-jacobian-derivation"></a>

<!-- formal-statement-start -->
> **命題（距離・方位の全状態微分）**  
> 上記の $q>0$ と局所枝の条件の下で、[観測行列](#def-u2-22-landmark-jacobian)は全状態に関する一次微分を正しく表す。特に対応目印以外の座標での微分は0である。
<!-- formal-statement-end -->

**証明の見取り図**：[既知目印の観測微分](../U2-08/index.md#prop-u2-08-observation-jacobian)の姿勢微分に加え、変位 $d=m_j-p$ の目印側の符号を確かめます。

<!-- proof-start -->
### 証明

$r=(d_x^2+d_y^2)^{1/2}$ なので、$q>0$ の下で $\partial r/\partial d_x=d_x/r$、$\partial r/\partial d_y=d_y/r$ です。$\alpha=\operatorname{atan2}(d_y,d_x)$ の局所微分は

$$
d\alpha=\frac{-d_y\,dd_x+d_x\,dd_y}{q}.
$$

$dd_x=da-dx$、$dd_y=db-dy$ を代入し、$d\beta=d\alpha-d\theta$ とすると、姿勢列は $(-d_x/r,-d_y/r,0)$ と $(d_y/q,-d_x/q,-1)$、目印列は $(d_x/r,d_y/r)$ と $(-d_y/q,d_x/q)$ です。他の $m_\ell$（$\ell\ne j$）は $h_j$ の引数の式に登場せず、対応偏微分は0となります。wrap の枝が変わる点ではこの通常微分を使用していません。
<!-- proof-end -->

## 4. 一つの観測が地図全体を更新する

測定 $z_j=(r_j^{\rm obs},\beta_j^{\rm obs})^{\mathsf T}$ に対し、innovation $\nu_j$ は距離の差と wrap した角度差から作ります。状態は観測前 $N(\hat s^-,P^-)$、雑音は平均0・正定値共分散 $R_j$ の Gaussian で状態と独立と仮定します。以下の数式は予測点で固定した線形模型に対する更新であり、実際の非線形事後が必ず Gaussian になるという主張ではありません。

<a id="thm-u2-22-ekf-update"></a>

<!-- formal-statement-start -->
> **定理（ランドマーク型 EKF-SLAM の観測更新）**  
> $P^-\succ0$、$R_j\succ0$、$q>0$、正しい目印対応と有効な局所角度枝を仮定する。[観測行列](#def-u2-22-landmark-jacobian)を $H=H_j$ と置く。一次線形化した模型では

$$
\nu_j=\begin{pmatrix}r_j^{\rm obs}-r(\hat s^-)\\
\operatorname{wrap}(\beta_j^{\rm obs}-\beta(\hat s^-))\end{pmatrix},
\quad S=HP^-H^{\mathsf T}+R_j,
\quad K=P^-H^{\mathsf T}S^{-1}
$$

> で $S\succ0$ となり、更新は

$$
\hat s^+=\hat s^-+K\nu_j,\qquad
P^+=(I_n-KH)P^-(I_n-KH)^{\mathsf T}+KR_jK^{\mathsf T}
$$

> で与えられる。角度平均は更新後に局所枝の規約に従って正規化する。同じ線形模型の厳密演算では

$$
P^+=P^--P^-H^{\mathsf T}S^{-1}HP^-.
$$

> $H$ の列が0である未観測目印も、$P^-H^{\mathsf T}$ の対応行が非零なら平均・共分散が更新される。
<!-- formal-statement-end -->

**証明の見取り図**：観測の一次誤差は $H\delta s+\varepsilon$ です。$R_j\succ0$ が innovation 共分散の可逆性を保証します。[Kalman 更新](../U2-05/index.md#thm-u2-05-update)と[Joseph 形](../U2-05/index.md#prop-u2-05-joseph)を適用し、未観測目印の行を取り出します。

<!-- proof-start -->
### 証明

観測関数を $\hat s^-$ の周りで一次展開すると、予測残差のランダム部分は $H(s-\hat s^-)+\varepsilon$ です。状態誤差と観測雑音が独立なので、共分散は $S=HP^-H^{\mathsf T}+R_j$ となります。任意の $v\in\mathbb R^2\setminus\{0\}$ に対して

$$
v^{\mathsf T}Sv=(H^{\mathsf T}v)^{\mathsf T}P^-(H^{\mathsf T}v)+v^{\mathsf T}R_jv>0.
$$

第一項は非負、第二項は正なので $S$ は可逆です。[Kalman 更新定理](../U2-05/index.md#thm-u2-05-update)の状態次元を $n$、観測次元を2として代入すれば平均式を得ます。更新誤差は $(I_n-KH)\delta s-K\varepsilon$ なので、独立性を使って Joseph 形を得ます。

これを展開すると

$$
P^+=P^--KHP^--P^-H^{\mathsf T}K^{\mathsf T}
+K(HP^-H^{\mathsf T}+R_j)K^{\mathsf T}.
$$

$KS=P^-H^{\mathsf T}$ および $SK^{\mathsf T}=HP^-$ を代入すると、最後の項は $KSK^{\mathsf T}=P^-H^{\mathsf T}S^{-1}HP^-$。二つの減算項と相殺して最終式になります。$P^+$ は Joseph 形により対称半正定値です。

最後に未観測目印 $\ell\ne j$ の行を取り出すと、$H_{m_\ell}=0$ でも

$$
K_{m_\ell}=(P_{m_\ell g}^-H_g^{\mathsf T}
+P_{m_\ell m_j}^-H_{m_j}^{\mathsf T})S^{-1}
$$

です。交差共分散が非零ならこの利得は非零になり得ます。これが他の目印を動かす仕組みです。
<!-- proof-end -->

**一つの数値例**：一次元の相対観測 $z=a-x+\varepsilon$ は、上の2次元観測を理解するための線形部分模型です。初期状態 $(x,a,b)$ の平均を $(0,2,5)$、共分散を $I_3$、観測雑音分散を1とします。まず $a$ を $z_a=3$ で観測すると

$$
H_a=(-1,1,0),\quad S_a=3,\quad
K_a=(-1/3,1/3,0)^{\mathsf T}.
$$

[観測更新](#thm-u2-22-ekf-update)を使うと

$$
\hat s^+=(-1/3,7/3,5)^{\mathsf T},\qquad
P^+=\begin{pmatrix}2/3&1/3&0\\1/3&2/3&0\\0&0&1\end{pmatrix}.
$$

$x$ と $a$ の間に $1/3$ の共分散が**観測から生成**されました。続いて別の目印 $b$ を $z_b=6$ で観測します。このとき予測 $b-x=16/3$、innovation は $2/3$ です。$H_b=(-1,0,1)$ なので

$$
S_b=8/3,\qquad
K_b=(-1/4,-1/8,3/8)^{\mathsf T},
$$

$$
\hat s^{++}=(-1/2,9/4,21/4)^{\mathsf T},\qquad
P^{++}=\begin{pmatrix}
1/2&1/4&1/4\\
1/4&5/8&1/8\\
1/4&1/8&5/8
\end{pmatrix}.
$$

目印 $a$ の測定値は2回目には使っていないのに、推定値が $7/3$ から $9/4$ へ変化しています。$P_{ax}=1/3$ を経由する利得 $-1/8$ が原因であり、**地図の点同士も観測を通じて連動**します。

## 5. 新しい目印を見つけたとき：増補は共分散ごと行う

まだ地図にない目印を初めて測距・方位で見つけたとします。観測された距離 $\rho>0$、方位 $\gamma$ と推定姿勢 $(\hat x,\hat y,\hat\theta)$ から、目印の推定世界座標を逆算できます。この操作は[測距・方位の定義](../U2-08/index.md#def-u2-08-range-bearing)の幾何学的な逆です。初観測で目印の世界座標が**正確に決定**されるのではなく、姿勢誤差とセンサー誤差を伝えます。

目印に独立した有限分散の既知事前が与えられていない、標準的なランドマーク追加の一次近似だけを扱います。新観測が既存の姿勢・地図を追加で条件付けて更新する正確な Bayes 操作とは区別します。

<a id="def-u2-22-landmark-birth"></a>

<!-- formal-statement-start -->
> **定義（逆観測によるランドマーク追加）**  
> 旧増補状態 $s\in\mathbb R^n$ に対し、$\rho>0$ の新しい測距・方位観測 $(\rho,\gamma)$ が得られたとする。$\psi=\hat\theta+\gamma$ と置き、新しい目印の平均を

$$
\hat m_{\rm new}=
\begin{pmatrix}\hat x+\rho\cos\psi\\\hat y+\rho\sin\psi\end{pmatrix}
$$

> とする。逆観測写像の姿勢・測定値に関する Jacobi 行列を

$$
J_g=\begin{pmatrix}
1&0&-\rho\sin\psi\\0&1&\rho\cos\psi
\end{pmatrix},\qquad
J_z=\begin{pmatrix}
\cos\psi&-\rho\sin\psi\\
\sin\psi&\rho\cos\psi
\end{pmatrix}
$$

> とし、独立な初観測誤差の共分散 $R_{\rm new}\succ0$ を用いて一次増補共分散を

$$
P_{\rm aug}=
\begin{pmatrix}
P&P_{sg}J_g^{\mathsf T}\\
J_gP_{gs}&J_gP_{gg}J_g^{\mathsf T}+J_zR_{\rm new}J_z^{\mathsf T}
\end{pmatrix}
$$

> と定める。$P_{sg}$ は旧 $P$ の先頭3列、$P_{gs}=P_{sg}^{\mathsf T}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-22-landmark-birth -->
**定義の確認**：$\hat g=(0,0,0)$、$\rho=2,\gamma=0$、$P_{gg}=\operatorname{diag}(1,1,1/4)$、$R_{\rm new}=\operatorname{diag}(1/4,1/16)$ とします。距離は正、両共分散は正定値です。$J_g=\begin{pmatrix}1&0&0\\0&1&2\end{pmatrix}$、$J_z=\begin{pmatrix}1&0\\0&2\end{pmatrix}$ となり、新目印の平均は $(2,0)$、姿勢との交差共分散は

$$
P_{gm_{\rm new}}=P_{gg}J_g^{\mathsf T}
=\begin{pmatrix}1&0\\0&1\\0&1/2\end{pmatrix}.
$$

新目印の共分散は $J_gP_{gg}J_g^{\mathsf T}+J_zR_{\rm new}J_z^{\mathsf T}=\operatorname{diag}(5/4,9/4)$。特に $x$ と目印の $a$ 座標の共分散は1で、相対座標の分散は $1+5/4-2=1/4$。これは初観測の距離雑音分散そのものです。
<!-- definition-example-end -->

<a id="prop-u2-22-birth-covariance"></a>

<!-- formal-statement-start -->
> **命題（追加目印の誤差伝播と正定値性）**  
> 旧状態の局所誤差共分散を $P\succ0$、新観測雑音の共分散を $R_{\rm new}\succ0$ とし、両者を独立と仮定する。$\rho>0$ で[逆観測の増補](#def-u2-22-landmark-birth)を行うと、その $P_{\rm aug}$ は一次誤差模型の共分散であり、対称正定値となる。
<!-- formal-statement-end -->

**証明の見取り図**：新座標の誤差は旧姿勢誤差と独立な測定誤差の線形結合です。任意の旧状態係数と新目印係数で二次形式を作り、$J_z$ の可逆性で零方向がないことを示します。

<!-- proof-start -->
### 証明

センサー雑音を $\varepsilon_z$ とします。観測 $z_{\rm obs}=h(g,m_{\rm new})+\varepsilon_z$ の逆写像を、真の相対測定 $z_{\rm obs}-\varepsilon_z$ の近傍で一次展開すると、新目印の誤差は $\delta m_{\rm new}\simeq J_g\delta g-J_z\varepsilon_z$。$\varepsilon_z$ と旧状態誤差 $\delta s$ が独立なので

$$
\operatorname{Cov}(\delta s,\delta m_{\rm new})=P_{sg}J_g^{\mathsf T},\qquad
\operatorname{Cov}(\delta m_{\rm new})=J_gP_{gg}J_g^{\mathsf T}+J_zR_{\rm new}J_z^{\mathsf T}.
$$

これが定義の全ブロックです。任意の $v\in\mathbb R^n,w\in\mathbb R^2$ に対し増補誤差の線形結合の分散は

$$
\operatorname{Var}(v^{\mathsf T}\delta s+w^{\mathsf T}\delta m_{\rm new})
=(v+E_g^{\mathsf T}J_g^{\mathsf T}w)^{\mathsf T}P
(v+E_g^{\mathsf T}J_g^{\mathsf T}w)
+w^{\mathsf T}J_zR_{\rm new}J_z^{\mathsf T}w.
$$

ここで $E_g:\mathbb R^n\to\mathbb R^3$ は先頭3成分を取り出す行列です。$\det J_z=\rho>0$ だから $w\ne0$ なら第二項が正です。$w=0$ で $v\ne0$ なら第一項は $v^{\mathsf T}Pv>0$ です。したがって任意の非零 $(v,w)$ に対して二次形式は正となり、$P_{\rm aug}\succ0$ です。
<!-- proof-end -->

同じランドマークを再び見た際は新しい状態成分を重複追加せず、[既存目印の更新](#thm-u2-22-ekf-update)を行います。目印の番号を誤った場合、上の Jacobian 自体は計算できても、別物を同一物として更新する**モデル誤指定**が生じます。

## 6. 交差共分散を0へ強制すると、なぜ過信するか

交差共分散は見た目には「余計な数字」ですが、相対観測の分散は二つの**周辺分散の和ではありません**。一次元で $z=a-x+\varepsilon$ とすると、観測雑音と状態が独立な場合

$$
\operatorname{Var}(z)
=\operatorname{Var}(a)+\operatorname{Var}(x)
-2\operatorname{Cov}(x,a)+\operatorname{Var}(\varepsilon).
$$

相関を失えば $S$ と $K$ の両方が変わり、次の推定値・共分散も誤ります。失われたのは「各変数の分散が正」という条件ではなく、**同時状態の正しい二次モーメント**です。

<a id="prop-u2-22-overconfidence"></a>

<!-- formal-statement-start -->
> **命題（交差共分散を消した後の再観測による過信例）**  
> 一次元の状態 $(x,a)$ の平均を固定し、共分散を

$$
P=\begin{pmatrix}1&1\\1&5/4\end{pmatrix}
$$

> とする。独立な雑音分散 $R=1/4$ で相対観測 $z=a-x+\varepsilon$ を一度行う。正しい Gaussian 更新後のランドマーク分散は $9/8$ である。一方、観測直前に交差成分だけを強制的に0にした

$$
P_{\rm wrong}=\operatorname{diag}(1,5/4)
$$

> で同じ式を適用すると報告分散は $5/8$ となり、正しい値より小さい。
<!-- formal-statement-end -->

**証明の見取り図**：[観測更新](#thm-u2-22-ekf-update)を線形な $H=(-1,1)$ に代入し、共分散の交差項を残す場合と消す場合を比較します。

<!-- proof-start -->
### 証明

$P$ は主座小行列式が $1>0$、行列式が $5/4-1=1/4>0$ なので正定値です。正しい innovation 共分散と状態・innovation の共分散は

$$
S=HPH^{\mathsf T}+1/4=1+5/4-2+1/4=1/2,
\qquad PH^{\mathsf T}=(0,1/4)^{\mathsf T}.
$$

従って $K=(0,1/2)^{\mathsf T}$、[共分散減算形](#thm-u2-22-ekf-update)から

$$
P^+=P-\frac{(PH^{\mathsf T})(HP)}S
=\begin{pmatrix}1&1\\1&9/8\end{pmatrix}.
$$

誤って交差成分を捨てると $S_{\rm wrong}=1+5/4+1/4=5/2$、$P_{\rm wrong}H^{\mathsf T}=(-1,5/4)^{\mathsf T}$ です。新目印分散として報告される値は

$$
\frac54-\frac{(5/4)^2}{5/2}
=\frac54-\frac58=\frac58<\frac98.
$$

誤実装は $x,a$ の事前を独立だと偽っており、同じ相対観測が両変数を新たに拘束する量を過大評価しています。この二つの更新が同じ確率模型の事後であると考えてはいけません。
<!-- proof-end -->

この $P$ は[逆観測で追加した目印](#def-u2-22-landmark-birth)の $x,a$ 部分と一致します。追加時からある相関を消すと、**新観測にない絶対座標情報まで獲得したかのような結果**になります。なお相関を捨てる誤りが常に全方向の分散を小さくするわけではありません。ある方向では逆に過大評価し得ます。過信という結論は上の数値例についてのものです。

また、[ゲージ不変性](../U2-21/index.md#prop-u2-21-gauge-invariance)から、絶対的な位置・向きの基準がない相対観測だけでは大域座標を決められません。本講の正定値事前は座標の原点・方向の不確実性を有限に設定した**基準事前**です。無情報な一様事前を通常の可逆な共分散行列と見なしたり、角度枝が切り替わる巨大誤差を単一 Gaussian に押し込んだりしてはなりません。

## 7. 演習：交差項を紙上で追う

### Level A：状態・微分・増補を確かめる

<a id="ex-u2-22-a01"></a>

**A1. ブロックの次元**  
- Level: A

ランドマークを3個保持する場合の状態次元 $n$ と、$P_{gg}$、$P_{gm}$、$P_{mm}$、一回の測距・方位の $H$ の行列サイズを求めよ。$H$ の非零列が何列かも答えよ。

<!-- solution-start -->
**詳細解答**：[増補状態](#def-u2-22-augmented-state)より $n=3+2\cdot3=9$ です。姿勢3成分、地図6成分なので $P_{gg}$ は $3\times3$、$P_{gm}$ は $3\times6$、$P_{mm}$ は $6\times6$ です。一回の観測は距離と方位の2成分だから $H$ は $2\times9$。[観測行列](#def-u2-22-landmark-jacobian)は姿勢3列と対応した目印2列の合計5列にしか非零が現れず、残り4列は零列です（各列が実際に非零とは限らないため「非零となり得る列」の数です）。
<!-- solution-end -->

<a id="ex-u2-22-a02"></a>

**A2. 四分円の Jacobian**  
- Level: A

姿勢 $(0,0,0)$、一つの目印 $(3,4)$ について、$q,r$ と測距・方位 Jacobian の姿勢部分・目印部分を求めよ。距離が0だったらどの式が破綻するか説明せよ。

<!-- solution-start -->
**詳細解答**：変位は $(3,4)$ なので $q=3^2+4^2=25$、$r=5$ です。[観測行列](#def-u2-22-landmark-jacobian)へ $d_x=3,d_y=4$ を代入すると

$$
H_g=\begin{pmatrix}-3/5&-4/5&0\\4/25&-3/25&-1\end{pmatrix},
\quad
H_m=\begin{pmatrix}3/5&4/5\\-4/25&3/25\end{pmatrix}.
$$

距離0なら $r=0,q=0$ となり、$d/r$ と $d/q$ が定義できません。方向角 $\operatorname{atan2}(0,0)$ 自体も定まらないため、単に数式の分母だけの問題ではありません。
<!-- solution-end -->

<a id="ex-u2-22-a03"></a>

**A3. 予測時の交差ブロック**  
- Level: A

$F=\operatorname{diag}(2,1,1)$、$P_{gm}=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix}$、静止する目印1個について $P_{gm}^-$ と $P_{mm}^-$ を求めよ。運動雑音は姿勢にのみ入るとする。

<!-- solution-start -->
**詳細解答**：[一次予測](#prop-u2-22-prediction)の右上は $FP_{gm}$。第一行は2倍、第二行と第三行はそのままなので

$$
P_{gm}^-=\begin{pmatrix}2&0\\0&2\\0&0\end{pmatrix}.
$$

右下は $P_{mm}^-=P_{mm}^+$ です。過程雑音の地図行が0なので、地図共分散への雑音の直接加算はありません。目印の座標が固定でも姿勢との交差項は固定されないことが分かります。
<!-- solution-end -->

<a id="ex-u2-22-a04"></a>

**A4. 目印の初回登録**  
- Level: A

姿勢平均 $(0,0,0)$、姿勢共分散 $\operatorname{diag}(1,1,1/4)$ で距離2、方位0の新目印を観測した。観測雑音共分散は $\operatorname{diag}(1/4,1/16)$ とする。新目印の平均・共分散、および姿勢との交差共分散を求めよ。

<!-- solution-start -->
**詳細解答**：$2>0$ なので[逆観測](#def-u2-22-landmark-birth)を適用できます。$\psi=0$ から $\hat m=(2,0)$、$J_g=\begin{pmatrix}1&0&0\\0&1&2\end{pmatrix}$、$J_z=\operatorname{diag}(1,2)$ です。

$$
P_{gm}=P_{gg}J_g^{\mathsf T}
=\begin{pmatrix}1&0\\0&1\\0&1/2\end{pmatrix}.
$$

新目印分散の第一成分は $1+1/4=5/4$、第二は $1+2^2(1/4)+2^2(1/16)=9/4$、対角以外は0です。ゆえに $P_{mm}=\operatorname{diag}(5/4,9/4)$ となります。姿勢と観測の誤差が独立という仮定が共分散の和に使われました。
<!-- solution-end -->

<a id="ex-u2-22-a05"></a>

**A5. 最初の線形観測**  
- Level: A

一次元状態 $(x,a)$ の平均 $(0,2)$、共分散 $I_2$、観測 $z=a-x+\varepsilon$、$\varepsilon\sim N(0,1)$ を考える。実測 $z=3$ の innovation、$S$、$K$、更新平均、更新共分散を求めよ。

<!-- solution-start -->
**詳細解答**：予測値は $2-0=2$ だから innovation は $3-2=1$。$H=(-1,1)$ なので[EKF 更新](#thm-u2-22-ekf-update)はこの線形模型では厳密で、

$$
S=H I_2 H^{\mathsf T}+1=1+1+1=3,\quad
K=I_2H^{\mathsf T}/3=(-1/3,1/3)^{\mathsf T}.
$$

平均は $(0,2)^{\mathsf T}+K=(-1/3,7/3)^{\mathsf T}$。分散は $I_2-(1/3)H^{\mathsf T}H$ で、

$$
P^+=\begin{pmatrix}2/3&1/3\\1/3&2/3\end{pmatrix}.
$$

相関は非零になり、どちらの周辺分散も $1$ から $2/3$ に減りました。
<!-- solution-end -->

### Level B：交差項を残して更新を証明・比較する

<a id="ex-u2-22-b01"></a>

**B1. 見ていない目印が動く**  
- Level: B

$(x,a,b)$ の予測平均 $(-1/3,7/3,5)$、共分散 $P=\begin{pmatrix}2/3&1/3&0\\1/3&2/3&0\\0&0&1\end{pmatrix}$ を与える。雑音分散1の観測 $z_b=b-x+\varepsilon$ で値6を得た。$S,K$、更新平均・共分散を計算し、$a$ が動く理由を述べよ。

<!-- solution-start -->
**詳細解答**：$H=(-1,0,1)$、予測観測は $5-(-1/3)=16/3$、innovation は $6-16/3=2/3$ です。まず

$$
PH^{\mathsf T}=(-2/3,-1/3,1)^{\mathsf T},
\quad S=HPH^{\mathsf T}+1=2/3+1+1=8/3.
$$

したがって $K=(-1/4,-1/8,3/8)^{\mathsf T}$。[更新定理](#thm-u2-22-ekf-update)で $K(2/3)$ を平均へ加えると

$$
\hat s^+=(-1/2,9/4,21/4)^{\mathsf T}.
$$

共分散の減算項は $K(HP)$ だから、各成分を引くと

$$
P^+=\begin{pmatrix}
1/2&1/4&1/4\\1/4&5/8&1/8\\1/4&1/8&5/8
\end{pmatrix}.
$$

$a$ の利得 $-1/8$ は $P_{ax}=1/3$ に由来します。$H$ の $a$ 列は0でも、$PH^{\mathsf T}$ の $a$ 行は0ではありません。
<!-- solution-end -->

<a id="ex-u2-22-b02"></a>

**B2. 誤った独立化で過信を再現**  
- Level: B

状態 $(x,a)$ の共分散 $P=\begin{pmatrix}1&1\\1&5/4\end{pmatrix}$、観測 $z=a-x+\varepsilon$、雑音分散 $1/4$ とする。正しい $S,K,P^+_{aa}$ を求め、非対角項だけ0にした $P_{\rm wrong}$ で再計算した値と比べよ。

<!-- solution-start -->
**詳細解答**：[過信の命題](#prop-u2-22-overconfidence)と同じ設定です。$H=(-1,1)$ から $PH^{\mathsf T}=(0,1/4)^{\mathsf T}$、$S=1/2$。よって $K=(0,1/2)^{\mathsf T}$ で、

$$
P_{aa}^+=5/4-(1/4)^2/(1/2)=5/4-1/8=9/8.
$$

一方 $P_{\rm wrong}=\operatorname{diag}(1,5/4)$ では $S_{\rm wrong}=5/2$、$K_{\rm wrong}=(-2/5,1/2)^{\mathsf T}$ となります。報告分散は

$$
5/4-(5/4)^2/(5/2)=5/4-5/8=5/8.
$$

差は $9/8-5/8=1/2$ です。相対変位の事前分散を本来の $1/4$ ではなく $9/4$ と誤って扱い、既存の共有位置誤差を消去したことが原因です。
<!-- solution-end -->

<a id="ex-u2-22-b03"></a>

**B3. Joseph 形と分散の非負性**  
- Level: B

$P^-\succeq0$、$R\succ0$、$H$ は適合次元、$S=HP^-H^{\mathsf T}+R$、$K=P^-H^{\mathsf T}S^{-1}$ とする。Joseph 形が半正定値であることと、減算形 $P^-=P^++P^-H^{\mathsf T}S^{-1}HP^-$ が成り立つことを示せ。

<!-- solution-start -->
**詳細解答**：$R\succ0$ より非零 $v$ に対して $v^{\mathsf T}Sv\ge v^{\mathsf T}Rv>0$ となり逆行列が存在します。[Joseph 形](../U2-05/index.md#prop-u2-05-joseph)を任意の $w$ で挟むと

$$
w^{\mathsf T}P^+w=
((I-KH)^{\mathsf T}w)^{\mathsf T}P^-((I-KH)^{\mathsf T}w)
+(K^{\mathsf T}w)^{\mathsf T}R(K^{\mathsf T}w)\ge0.
$$

減算形は $KSK^{\mathsf T}=P^-H^{\mathsf T}S^{-1}HP^-$ と $KHP^-=P^-H^{\mathsf T}K^{\mathsf T}=KSK^{\mathsf T}$ を使って Joseph 形を展開し、$P^+=P^--KSK^{\mathsf T}$ を得ることと同値です。両辺へ $KSK^{\mathsf T}$ を加えると設問の式になります。
<!-- solution-end -->

<a id="ex-u2-22-b04"></a>

**B4. 同じ目印をもう一度観測する**  
- Level: B

初回観測後の共分散を $P=\begin{pmatrix}2/3&1/3\\1/3&2/3\end{pmatrix}$ とし、$z=a-x+\varepsilon$、雑音分散1で**独立な新しい観測**を行う。正しい $S,K$ と両周辺の事後分散を求めよ。続いて $P$ の交差項を0にして計算した報告分散と比較せよ。

<!-- solution-start -->
**詳細解答**：$H=(-1,1)$ なので $PH^{\mathsf T}=(-1/3,1/3)^{\mathsf T}$、$S=2/3+2/3-2(1/3)+1=5/3$。よって $K=(-1/5,1/5)^{\mathsf T}$ です。[減算形](#thm-u2-22-ekf-update)を使うと

$$
P^+=\begin{pmatrix}2/3&1/3\\1/3&2/3\end{pmatrix}
-\frac{1}{5/3}
\begin{pmatrix}1/9&-1/9\\-1/9&1/9\end{pmatrix}
=\begin{pmatrix}3/5&2/5\\2/5&3/5\end{pmatrix}.
$$

交差項を0にすると $S_{\rm wrong}=2/3+2/3+1=7/3$、利得は $(-2/7,2/7)^{\mathsf T}$。報告分散は両方とも $2/3-(2/3)^2/(7/3)=2/3-4/21=10/21$。これは正しい $3/5$ より小さく、過信です。なお観測は同じ記録の複製ではなく、独立な新しい測定と仮定しました。
<!-- solution-end -->

### Level C：モデル化から検算まで一続きで行う

<a id="ex-u2-22-c01"></a>

**C1. 二つの目印への逐次更新**  
- Level: C

一次元の $(x,a,b)$ について、初期平均 $(0,2,5)$、初期共分散 $I_3$ とする。相対観測 $z_j=m_j-x+\varepsilon_j$ で、二回の雑音は互いに独立な $N(0,1)$ とする。まず $z_a=3$、次に $z_b=6$ を得た。

1. 各回の innovation、$S$、$K$、更新平均と共分散を求めよ。
2. 二回目に $a$ の観測がないのに $a$ が更新される機構を示せ。
3. 一回目の後に $P_{xa}$ を0にしてしまうと、二回目の $a$ の更新はどうなるか。

<!-- solution-start -->
**詳細解答**：初回は $H_a=(-1,1,0)$、予測値2、innovation1。$S_a=3$、$K_a=(-1/3,1/3,0)^{\mathsf T}$ だから

$$
\hat s_1=(-1/3,7/3,5)^{\mathsf T},\qquad
P_1=\begin{pmatrix}2/3&1/3&0\\1/3&2/3&0\\0&0&1\end{pmatrix}.
$$

二回目は $H_b=(-1,0,1)$。予測 $16/3$ と実測6の差は $2/3$。$P_1H_b^{\mathsf T}=(-2/3,-1/3,1)^{\mathsf T}$ なので $S_b=8/3$、$K_b=(-1/4,-1/8,3/8)^{\mathsf T}$。各成分に残差を掛けた増分は $(-1/6,-1/12,1/4)$ です。従って

$$
\hat s_2=(-1/2,9/4,21/4)^{\mathsf T},
\qquad
P_2=\begin{pmatrix}1/2&1/4&1/4\\1/4&5/8&1/8\\1/4&1/8&5/8\end{pmatrix}.
$$

$a$ について、観測行列の係数は0ですが $P_{ax}=1/3$ により $(P_1H_b^{\mathsf T})_a=-1/3$ です。そこで $a$ は $(-1/8)(2/3)=-1/12$ だけ動きました。交差項だけ0にすると $(P_1H_b^{\mathsf T})_a=0$ となって利得 $K_a=0$、二回目の $a$ は $7/3$ のままです。ただしこの操作は正しい同時事後を保存していません。
<!-- solution-end -->

<a id="ex-u2-22-c02"></a>

**C2. 逆観測で生じる相関と再観測の診断**  
- Level: C

平面姿勢の局所 Gaussian は平均 $(0,0,0)$、共分散 $\operatorname{diag}(1,1,1/4)$。未登録の目印を測距2・方位0で観測し、初観測雑音の共分散を $\operatorname{diag}(1/4,1/16)$ とする。その後、同じ目印の**水平相対座標** $a-x$ だけを雑音分散 $1/4$ の独立な新センサーで観測する。二回目の観測値は2とする。

1. 初観測後の目印平均と $x,a$ 部分の共分散を一次近似で求めよ。
2. 二回目の $S,K$ と $x,a$ の更新共分散を求めよ。測定値が平均へ与える影響も確認せよ。
3. 初観測後に $P_{xa}$ を0と偽って同じ更新を行うと、目印の分散はどう報告されるか。なぜ過信なのか説明せよ。

<!-- solution-start -->
**詳細解答**：[逆観測によるランドマーク追加](#def-u2-22-landmark-birth)で $\psi=0$、$J_g=\begin{pmatrix}1&0&0\\0&1&2\end{pmatrix}$、$J_z=\operatorname{diag}(1,2)$。目印平均は $(2,0)$、$P_{gm}=\begin{pmatrix}1&0\\0&1\\0&1/2\end{pmatrix}$、$P_{mm}=\operatorname{diag}(5/4,9/4)$ です。従って $x,a$ 部分は

$$
P=\begin{pmatrix}1&1\\1&5/4\end{pmatrix},\qquad
\hat u=(0,2)^{\mathsf T}.
$$

二回目の観測関数は $a-x$ だから $H=(-1,1)$。実測2と予測2が一致し、innovation は0です。$PH^{\mathsf T}=(0,1/4)^{\mathsf T}$、$S=1/2$、$K=(0,1/2)^{\mathsf T}$ なので平均は $(0,2)$ のまま、共分散は

$$
P^+=P-KHP
=\begin{pmatrix}1&1\\1&9/8\end{pmatrix}.
$$

新しい測定により目印の相対座標の不確実性は減りますが、ロボットの絶対位置の分散1は減りません。

誤って $P_{\rm wrong}=\operatorname{diag}(1,5/4)$ にすると $S_{\rm wrong}=5/2$、利得は $(-2/5,1/2)^{\mathsf T}$。報告される目印分散は $5/8$ となります。正しい $9/8$ より $1/2$ 小さい値です。初観測が与えたのは**相対位置**の情報で、未知のロボット絶対位置と新目印座標に共通するずれを取り除いてはいません。相関を消す誤実装がこの共通誤差を忘れ、二回目の観測から絶対位置の精度まで得たように見せたことが過信の原因です。
<!-- solution-end -->

## 8. まとめと次講

EKF-SLAM は平均の長いベクトルだけでなく、姿勢・各目印・目印同士の**共分散ブロック全体**を保存します。予測では地図そのものは静止しても姿勢との交差項が変わり、観測では一つの目印が他の目印まで更新します。新規登録時も、姿勢誤差に由来する交差共分散を同時に作らなければなりません。

ただし一次線形化・Gaussian 近似・既知対応・座標基準の仮定は残り、地図の目印数が増えると共分散は $(3+2k)\times(3+2k)$ の密行列になり得ます。次講 **U2-23「因子グラフ：運動・観測・地図をつなぐ」**では、全ての相関を一つの密行列で扱う代わりに、運動と観測の拘束を小さな因子として表現します。
