# MFL5 局所主成分分析と接空間推定

<!-- definition-example-audit: strict -->

## 1. 点群の「よく伸びる方向」は接方向か

[MFL4の標本被覆](../MFL4/index.md#prop-mfl4-covering)は、真の多様体の近くに標本を配置できる条件を与えた。しかし点が近くにあっても、そこから接線・接平面をどう計算するかは別の問題である。[MFL2の接空間](../MFL2/index.md#def-mfl2-tangent-gram)は微分 $DF$ から定義したが、観測点には通常パラメータ表示 $F$ が付いていない。

直線上の近傍点は直線に沿ってばらつき、法線方向にはばらつかない。曲がった多様体では法線方向にも少しばらつく。そこで近傍点を中心化し、ばらつきが大きい $d$ 方向を選ぶ。これは **主成分分析（Principal Component Analysis; PCA）** を近傍ごとに行う **局所主成分分析（Local PCA）** である。[主成分分析と共分散の固有空間](../../ML/ML1-19/index.md#thm-ml1-19-pca-spectral)の定理を局所に使うものであり、ここで新しく証明すべきことは「その方向が接空間にどれだけ近いか」である。

周囲の空間の次元を $D$、真の接空間の次元を $1\le d<D$、全標本数を $n$、局所標本数を $m$ とする。$d$ は本章では既知とし、その推定は MFL6 で扱う。ノルムは Euclid ノルム、行列の $\|A\|_{\mathrm{op}}=\max_{\|v\|=1}\|Av\|$ は作用素ノルム、$\|A\|_F^2=\sum_{ij}A_{ij}^2$ は Frobenius ノルムである。

### 半径を先に決め、平均を後で求める

観測点 $y_*$ と半径 $r>0$ に対し、$\|Y_i-y_*\|<r$ となる標本の添字集合を $I_r(y_*)$ と呼ぶ。中心 $y_*$ は近傍の**選択**に使う。一方、PCA の共分散は選ばれた点の**標本平均**で中心化する。二つの中心を混同しない。

<a id="def-mfl5-local-pca"></a>

<!-- formal-statement-start -->
> **定義（局所共分散とLocal PCA）**
> $y_*\in\mathbb R^D$、$r>0$ とし、$I=\{i:\|Y_i-y_*\|<r\}$ の要素数を $m\ge2$ とする。局所平均と局所共分散を

$$
\bar Y_I=\frac1m\sum_{i\in I}Y_i,\qquad
\widehat C_I=\frac1m\sum_{i\in I}(Y_i-\bar Y_I)(Y_i-\bar Y_I)^{\mathsf T}
$$

> とする。$\widehat C_I$ の大きい方から $d$ 個の固有値に対応する正規直交固有ベクトルを列に持つ $D\times d$ 行列 $\widehat U$ により、推定接空間を $\widehat T=\operatorname{im}\widehat U$、その直交射影を $\widehat P=\widehat U\widehat U^{\mathsf T}$ と定義する。$\lambda_d(\widehat C_I)=\lambda_{d+1}(\widehat C_I)$ の場合は、$d$ 次元の選択が一意とは限らない。
<!-- formal-statement-end -->

分母を $m-1$ にした不偏標本共分散でも、$m\ge2$ なら全固有値が同じ正数倍になるだけで固有ベクトルは変わらない。局所平均を引く理由は、[PCAの中心化の定義](../../ML/ML1-19/index.md#def-ml1-19-centered-data)と同じで、原点からの距離でなく局所変動を測るためである。

<!-- definition-example-start: def-mfl5-local-pca -->
**定義の確認**。$D=2,d=1$、$y_*=(0,0)$、$r=2$ とし、局所点を $(-1,0),(0,0),(1,0)$ とする。3点はすべて開球に入り、$m=3$、$\bar Y_I=(0,0)$ である。各偏差の外積を足すと

$$
\widehat C_I=\frac13\left[
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\begin{pmatrix}0&0\\0&0\end{pmatrix}
+\begin{pmatrix}1&0\\0&0\end{pmatrix}\right]
=\begin{pmatrix}2/3&0\\0&0\end{pmatrix}.
$$

したがって上位固有値は $2/3$、単位固有ベクトルは $e_1=(1,0)^{\mathsf T}$（符号は任意）。$\widehat T=\operatorname{span}(e_1)$、$\widehat P=\operatorname{diag}(1,0)$。標本の法線成分はすべて0なので、2番目の固有値も0と直接確認できる。
<!-- definition-example-end -->

## 2. 推定した部分空間の誤差をどう測るか

一本の接線を $v$ と $-v$ のどちらで表示しても同じ接線である。$d\ge2$ では同じ接平面の正規直交基底を回転しても同じ接平面になる。従ってベクトルの成分差ではなく、[接空間への直交射影](../MFL2/index.md#def-mfl2-projection)を比較する。

<a id="def-mfl5-projection-distance"></a>

<!-- formal-statement-start -->
> **定義（接空間の射影距離）**
> $T,\widehat T\subset\mathbb R^D$ をともに $d$ 次元の線形部分空間とし、それぞれの直交射影を $P,\widehat P$ とする。射影距離を

$$
\operatorname{err}(\widehat T,T)=\|\widehat P-P\|_{\mathrm{op}}
$$

> と定める。これは基底の選択に依存せず、0以上1以下である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl5-projection-distance -->
**定義の確認**。$D=2,d=1$ で $T=\operatorname{span}(e_1)$、$\widehat T=\operatorname{span}((\cos\theta,\sin\theta)^{\mathsf T})$ とする。$P=\operatorname{diag}(1,0)$ と置き、単位ベクトル $v$ に対して $\widehat Pv=(v\cdot u)u$、$u=(\cos\theta,\sin\theta)$ だから

$$
\widehat P-P=\begin{pmatrix}-\sin^2\theta&\sin\theta\cos\theta\\
\sin\theta\cos\theta&\sin^2\theta\end{pmatrix},
\qquad (\widehat P-P)^2=\sin^2\theta I_2.
$$

対称行列の固有値の絶対値は $|\sin\theta|$ であるから、射影距離は $|\sin\theta|$。例えば $\theta=\pi/6$ なら $1/2$ で、$u$ を $-u$ に替えても変わらない。$\theta=0$ のときだけ0である。
<!-- definition-example-end -->

射影距離が1以下であることは、直交射影について $\|Pv\|^2+\|(I-P)v\|^2=\|v\|^2$ と

$$
\|(P-\widehat P)v\|^2
=\|P(I-\widehat P)v\|^2+\|(I-P)\widehat Pv\|^2
\le\|(I-\widehat P)v\|^2+\|\widehat Pv\|^2=\|v\|^2
$$

から従う。最初の等式では $P-\widehat P=P(I-\widehat P)-(I-P)\widehat P$ と分解し、二項が直交することを使った。

## 3. 曲率は共分散のどの成分に入るか

$x\in M$ を固定し、$T=T_xM$ とする。[MFL2の二次局所近似](../MFL2/index.md#prop-mfl2-second-order)の考え方では、真の近傍点 $Z$ から $x$ を引いたベクトルを接方向 $U=P(Z-x)$ と法線方向 $V=(I-P)(Z-x)$ に分けられる。以下の命題は、近傍を選んだ後の **$Z$ の分布**についての仮定である。局所的な正規座標グラフで法線が二次に抑えられる場合を想定するが、任意の多様体・半径に自動適用できると主張しない。

<a id="prop-mfl5-curvature-covariance"></a>

<!-- formal-statement-start -->
> **命題（曲率が作る共分散ブロック誤差）**
> $1\le d<D$、$T\subset\mathbb R^D$ を $d$ 次元部分空間、$P$ をその直交射影とする。$\mathbb R^D$ 値確率変数 $Z$ と固定点 $x$ について $U=P(Z-x)$、$V=(I-P)(Z-x)$ がほとんど確実に

$$
\|U\|\le r,\qquad\|V\|\le\kappa r^2
$$

> を満たすとする（$r>0,\kappa\ge0$）。接方向の共分散 $A=\operatorname{Cov}(U)|_T$ が $T$ 上の単位ベクトル $v$ すべてについて $v^{\mathsf T}Av\ge ar^2$ を満たすと仮定する（$a>0$）。周囲の分解 $\mathbb R^D=T\oplus T^\perp$ で

$$
C_0=\begin{pmatrix}A&0\\0&0\end{pmatrix},\qquad
C_X=\operatorname{Cov}(Z)
$$

> とすると、

$$
\|C_X-C_0\|_{\mathrm{op}}\le 2\kappa r^3+\kappa^2r^4.
$$
<!-- formal-statement-end -->

### 証明の見取り図

接方向と法線方向の交差共分散は「接 $r$ × 法線 $\kappa r^2$」、法線自身の共分散は「法線の二乗」で抑える。中心化を忘れると交差項が違うため、各成分を平均を引いた変数で評価する。

<!-- proof-start -->
### 証明

$U'=U-EU$、$V'=V-EV$ と置く。任意の確率変数 $W$ と固定ベクトル $c$ に対し $E\|W-EW\|^2=E\|W-c\|^2-\|EW-c\|^2$ だから、$c=0$ を適用して

$$
E\|U'\|^2\le r^2,\qquad E\|V'\|^2\le\kappa^2r^4.
$$

ブロック行列は

$$
C_X-C_0=
\begin{pmatrix}0&B\\B^{\mathsf T}&N\end{pmatrix},\quad
B=E[U'(V')^{\mathsf T}],\quad N=E[V'(V')^{\mathsf T}].
$$

単位ベクトル $s\in T,t\in T^\perp$ に対し、Cauchy–Schwarz の不等式で

$$
|s^{\mathsf T}Bt|=|E[(s\cdot U')(t\cdot V')]|\le
\sqrt{E\|U'\|^2E\|V'\|^2}\le\kappa r^3.
$$

よって $\|B\|_{\mathrm{op}}\le\kappa r^3$。また $t^{\mathsf T}Nt=E(t\cdot V')^2\le\kappa^2r^4$ なので $\|N\|_{\mathrm{op}}\le\kappa^2r^4$。交差ブロックの左右の片側行列と法線ブロックを足した表示から、作用素ノルムの三角不等式で

$$
\|C_X-C_0\|_{\mathrm{op}}
\le\left\|\begin{pmatrix}0&B\\0&0\end{pmatrix}\right\|_{\mathrm{op}}
+\left\|\begin{pmatrix}0&0\\B^{\mathsf T}&0\end{pmatrix}\right\|_{\mathrm{op}}+\|N\|_{\mathrm{op}}
\le2\kappa r^3+\kappa^2r^4.
$$

$a>0$ はまだこの上界には使っていない。次に接方向と法線方向を**区別するための固有値ギャップ**として必要になる。$\square$
<!-- proof-end -->

### 片側の放物線で曲率バイアスを実算する

$D=2,d=1,x=(0,0)$ で $Z=(U,\kappa U^2/2)$、$U\sim\mathrm{Uniform}[0,r]$ とする。真の接方向は $e_1$。$EU=r/2$、$EU^2=r^2/3$、$EU^3=r^3/4$、$EU^4=r^4/5$ から

$$
\begin{aligned}
\operatorname{Var}(U)&=r^2/3-r^2/4=r^2/12,\\
\operatorname{Cov}(U,\kappa U^2/2)&=\frac\kappa2(r^3/4-r^3/6)=\kappa r^3/24,\\
\operatorname{Var}(\kappa U^2/2)&=\frac{\kappa^2}{4}(r^4/5-r^4/9)=\kappa^2r^4/45.
\end{aligned}
$$

従って $C_X=\begin{pmatrix}r^2/12&\kappa r^3/24\\\kappa r^3/24&\kappa^2r^4/45\end{pmatrix}$。$r^2/12>\kappa^2r^4/45$ のとき、上位固有方向の $e_1$ からの符号付き角 $\theta\in(-\pi/4,\pi/4)$ は、二次形式を回転基底で対角化する条件から

$$
\tan(2\theta)=\frac{2C_{12}}{C_{11}-C_{22}}
=\frac{\kappa r^3/12}{r^2/12-\kappa^2r^4/45},
\qquad\theta=\frac{\kappa r}{2}+O((\kappa r)^3)
$$

となる（$\kappa r\to0$）。**曲率があるだけで角度がずれるのではない。** $U\sim\mathrm{Uniform}[-r,r]$ なら $EU=EU^3=0$ なので交差共分散は0であり、$\kappa^2r^2<15$ では上位方向が厳密に $e_1$ となる。密度・近傍の非対称性もバイアスに効く。

## 4. 固有値の間隔が誤差を角度に変える

「共分散行列が近い」だけでは「上位 $d$ 次元部分空間が近い」とは言えない。接方向の分散が法線方向と区別できる大きさであることが必要である。固有値を大きい順に $\lambda_1\ge\cdots\ge\lambda_D$ と書き、$\lambda_d-\lambda_{d+1}$ を **固有値ギャップ** と呼ぶ。

<a id="prop-mfl5-eigenspace-stability"></a>

<!-- formal-statement-start -->
> **命題（共分散摂動からの接空間距離評価）**
> $C_0$ を $T\oplus T^\perp$ 上の $\operatorname{diag}(A,0)$ とし、$T$ の次元を $d$、$A$ のすべての固有値を $\alpha>0$ 以上とする。$\widehat C=C_0+E$ を対称行列、$e=\|E\|_{\mathrm{op}}$ とする。$P$ を $T$ への直交射影、$\widehat P$ を $\widehat C$ の上位 $d$ 固有空間への直交射影とすると、どの上位空間の選択についても

$$
\|\widehat P-P\|_F\le\frac{2\sqrt{2d}\,e}{\alpha},\qquad
\|\widehat P-P\|_{\mathrm{op}}\le\min\left\{1,\frac{2\sqrt{2d}\,e}{\alpha}\right\}.
$$

> さらに $e<\alpha/2$ なら $\lambda_d(\widehat C)-\lambda_{d+1}(\widehat C)\ge\alpha-2e>0$ となり、上位 $d$ 次元部分空間は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

[主成分分析と共分散の固有空間](../../ML/ML1-19/index.md#thm-ml1-19-pca-spectral)の定理で、上位固有空間はその空間で受け取る分散の総和を最大にする。真の空間から傾くと $C_0$ の分散を失うが、摂動 $E$ がその損失を補える大きさには限りがある。

<!-- proof-start -->
### 証明

$P,Q=\widehat P$ はどちらも階数 $d$ の直交射影である。$\operatorname{tr}(H)=\sum_jH_{jj}$ は行列の対角成分の総和で、正規直交基底を替えても値は変わらない。$T$ の正規直交固有基底 $v_1,\ldots,v_d$ で $C_0v_j=\lambda_jv_j$、$\lambda_j\ge\alpha$ と書けば

$$
\begin{aligned}
\operatorname{tr}((P-Q)C_0)
&=\sum_{j=1}^d\lambda_j(1-v_j^{\mathsf T}Qv_j)\\
&\ge\alpha\sum_{j=1}^d(1-\|Qv_j\|^2)
=\alpha(d-\operatorname{tr}(PQ)).
\end{aligned}
$$

ここで $0\le\|Qv_j\|^2\le1$。また $P^2=P,Q^2=Q$ より

$$
\|P-Q\|_F^2=\operatorname{tr}(P+Q-PQ-QP)=2d-2\operatorname{tr}(PQ).
$$

一方、[主成分分析と共分散の固有空間](../../ML/ML1-19/index.md#thm-ml1-19-pca-spectral)の最大化計算は一般の対称行列にも成り立つ。実際、$\widehat C$ の固有値を $\mu_1\ge\cdots\ge\mu_D$、正規直交固有ベクトルを $w_j$ とすれば、任意の階数 $d$ 射影 $R$ について

$$
\operatorname{tr}(R\widehat C)=\sum_{j=1}^D\mu_j\|Rw_j\|^2,
\qquad0\le\|Rw_j\|^2\le1,\quad\sum_j\|Rw_j\|^2=d.
$$

重みを最大の固有値から順に1ずつ割り当てると和が最大になるため、$R=Q$ で最大値を取る。特に $\operatorname{tr}(Q\widehat C)\ge\operatorname{tr}(P\widehat C)$。従って

$$
\frac\alpha2\|P-Q\|_F^2
\le\operatorname{tr}((P-Q)C_0)
\le\operatorname{tr}((Q-P)E).
$$

$Q-P$ は対称で階数が高々 $2d$。その非零固有値を $s_j$、正規直交固有ベクトルを $w_j$ とすると、$|w_j^{\mathsf T}Ew_j|\le e$ と Cauchy–Schwarz より

$$
|\operatorname{tr}((Q-P)E)|
\le e\sum_j|s_j|
\le e\sqrt{2d}\left(\sum_js_j^2\right)^{1/2}
=e\sqrt{2d}\|P-Q\|_F.
$$

$P\ne Q$ なら $\|P-Q\|_F$ で割り、等しければ結論は自明。作用素ノルムは Frobenius ノルム以下で、さらに[射影距離の評価](#def-mfl5-projection-distance)から1以下となる。

最後に任意の単位 $v$ で $|v^{\mathsf T}Ev|\le e$。固有値の最大最小特性（各 $k$ 次元部分空間での Rayleigh 商の下限を最大化する式）にこれを代入すれば、$\widehat C$ の各順序付き固有値と $C_0$ の対応固有値の差の絶対値は高々 $e$。よって

$$
\lambda_d(\widehat C)\ge\alpha-e,
\qquad\lambda_{d+1}(\widehat C)\le0+e,
$$

からギャップ評価を得る。$\square$
<!-- proof-end -->

この上界は定数・次元依存が最適であることを主張しない。重要なのは **分母が接方向の分散 $\alpha\asymp r^2$、分子が曲率・ノイズ・標本の共分散誤差** となる構造である。$a r^2$ が小さい（細長い方向を十分見ていない）と推定は不安定になる。

## 5. 観測ノイズと有限標本を分けて評価する

ノイズを含む $Y=Z+\xi$ について、$Z$ の近傍を**先に固定した分布**から取り、各組 $(Z_i,\xi_i)$ が独立同分布とする。$\xi$ と $Z$ の独立性は以下の有界誤差には不要だが、各組の独立性は有限標本集中で必要である。$\|Z-x\|\le r$、$\|\xi\|\le\eta$ がほとんど確実に成り立つと仮定する。

<a id="prop-mfl5-noise-covariance"></a>

<!-- formal-statement-start -->
> **命題（有界ノイズによる共分散誤差）**
> $Z,\xi$ を二乗可積分な $\mathbb R^D$ 値確率変数、$x\in\mathbb R^D$、$r>0$、$\eta\ge0$ とする。$\|Z-x\|\le r$、$\|\xi\|\le\eta$ がほとんど確実で $Y=Z+\xi$ なら、

$$
\|\operatorname{Cov}(Y)-\operatorname{Cov}(Z)\|_{\mathrm{op}}
\le2r\eta+\eta^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

共分散の展開は二つの交差項と一つのノイズ分散項になる。平均がゼロという追加仮定をせずに、それぞれの中心化二乗平均を抑える。

<!-- proof-start -->
### 証明

$Z'=Z-EZ$、$\xi'=\xi-E\xi$ とする。$Y-EY=Z'+\xi'$ なので

$$
\operatorname{Cov}(Y)-\operatorname{Cov}(Z)
=E[Z'(\xi')^{\mathsf T}]+E[\xi'(Z')^{\mathsf T}]+E[\xi'(\xi')^{\mathsf T}].
$$

固定点 $x$ について $E\|Z'\|^2\le E\|Z-x\|^2\le r^2$、同じく $E\|\xi'\|^2\le\eta^2$。単位 $u,v$ による各交差項の双線形形式へ Cauchy–Schwarz を適用してその作用素ノルムを $r\eta$ 以下とし、最後の項は $\eta^2$ 以下。三角不等式より結論。$\square$
<!-- proof-end -->

### 標本誤差を具体的な確率で抑える

局所標本数 $m$ が増えると、固定された $Y$ の分布の共分散を推定できる。ただし $D$ が大きいと各成分を同時に推定するのは難しい。次は扱いやすいが保守的な、成分別 Hoeffding 評価である。

<a id="prop-mfl5-sample-covariance"></a>

<!-- formal-statement-start -->
> **命題（有界な独立局所標本の共分散集中）**
> $m\ge2$、$0<\delta<1$、$D\ge2$ とし、$Y_1,\ldots,Y_m$ を同じ $\mathbb R^D$ 値分布からの独立同分布標本とする。固定 $x\in\mathbb R^D$ と $R>0$ について $\|Y_i-x\|\le R$ がほとんど確実であるとする。$\widehat C=m^{-1}\sum_i(Y_i-\bar Y)(Y_i-\bar Y)^{\mathsf T}$、$C=\operatorname{Cov}(Y_1)$ とすると、確率 $1-\delta$ 以上で

$$
\|\widehat C-C\|_{\mathrm{op}}\le
R^2\left[
D\sqrt{\frac{2\log(4D^2/\delta)}m}
+2\sqrt D\sqrt{\frac{2\log(4D/\delta)}m}
\right]=:s_{m,D,\delta}(R).
$$
<!-- formal-statement-end -->

### 証明の見取り図

共分散を「二次モーメント $-$ 平均の外積」として書く。各成分と各平均を有界な独立標本の和として抑え、最後に作用素ノルムへ戻す。

<!-- proof-start -->
### 証明

$W_i=Y_i-x$、$\mu=EW_1$ と置く。$\|W_i\|\le R$ から、各成分は $[-R,R]$、各積 $W_{ij}W_{ik}$ は $[-R^2,R^2]$ に入る。独立な $H_i\in[a,b]$ に対する[Hoeffdingの両側不等式](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)は

$$
P\left(\left|\frac1m\sum_iH_i-EH_i\right|>t\right)
\le2\exp\left(-\frac{2mt^2}{(b-a)^2}\right)
$$

である。これを $[a,b]=[-R^2,R^2]$ の $D^2$ 個の成分積へ個別に適用し、$t=R^2\sqrt{2\log(4D^2/\delta)/m}$ と置く。[和事象評価](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)により、いずれかの成分積で不等式が破れる確率は高々 $\delta/2$。この事象の外では

$$
\left\|\frac1m\sum_iW_iW_i^{\mathsf T}-E[WW^{\mathsf T}]\right\|_{\mathrm{op}}
\le D R^2\sqrt{\frac{2\log(4D^2/\delta)}m},
$$

なぜなら任意の行列の作用素ノルムは Frobenius ノルム以下であり、$D^2$ 個の成分の各絶対値が $t$ 以下なら Frobenius ノルムは高々 $Dt$ だからである。

同じ不等式を $D$ 個の平均成分へ適用し、$t'=R\sqrt{2\log(4D/\delta)/m}$ とすれば、確率 $1-\delta/2$ 以上で $\|\bar W-\mu\|\le\sqrt D\,t'$。また $\|\bar W\|,\|\mu\|\le R$ なので

$$
\begin{aligned}
\|\bar W\bar W^{\mathsf T}-\mu\mu^{\mathsf T}\|_{\mathrm{op}}
&=\|(\bar W-\mu)\bar W^{\mathsf T}+\mu(\bar W-\mu)^{\mathsf T}\|_{\mathrm{op}}\\
&\le(\|\bar W\|+\|\mu\|)\|\bar W-\mu\|\le2R\sqrt D\,t'.
\end{aligned}
$$

$\widehat C=m^{-1}\sum_iW_iW_i^{\mathsf T}-\bar W\bar W^{\mathsf T}$、$C=E[WW^{\mathsf T}]-\mu\mu^{\mathsf T}$ を引き算し、二つの成功事象の共通部分を取れば結論。$\square$
<!-- proof-end -->

局所分布を真の点 $x$ を中心とする**固定** Euclid 球 $B_r(x)$ への条件付き分布とし、その標本が独立同分布なら、上の三命題をまとめられる。曲率命題の $\kappa,a$ もこの条件付き分布について成り立つものとする。

<a id="prop-mfl5-local-pca-bound"></a>

<!-- formal-statement-start -->
> **命題（Local PCAの有限標本接空間誤差）**
> $1\le d<D$、$m\ge2$、$0<\delta<1$。固定 $x\in M$ の真の Euclid 半径 $r$ 近傍から独立同分布に抽出した $Z_1,\ldots,Z_m$ が、$T_xM$ への射影 $U_i$ と法線成分 $V_i$ について $\|U_i\|\le r$、$\|V_i\|\le\kappa r^2$、$\lambda_{\min}(\operatorname{Cov}(U_i)|_{T_xM})\ge ar^2>0$ を満たすとする。各組 $(Z_i,\xi_i)$ は独立同分布、$\|Z_i-x\|\le r$、$\|\xi_i\|\le\eta$ がほとんど確実で、$Y_i=Z_i+\xi_i$ とする。$Y_i$ の局所共分散の上位 $d$ 空間を $\widehat T$ とし、

$$
e_*:=2\kappa r^3+\kappa^2r^4+2r\eta+\eta^2+s_{m,D,\delta}(r+\eta)
$$

> と置く。このとき確率 $1-\delta$ 以上で

$$
\operatorname{err}(\widehat T,T_xM)
\le\min\left\{1,\frac{2\sqrt{2d}\,e_*}{ar^2}\right\}.
$$

> さらに $e_*<ar^2/2$ なら、同じ事象で上位 $d$ 固有空間は一意であり、その固有値ギャップは $ar^2-2e_*$ 以上である。
<!-- formal-statement-end -->

### 証明の見取り図

真の接方向だけを持つ $C_0$ を基準とし、曲率・ノイズ・標本の三段階で共分散を比較する。最後に[固有空間摂動評価](#prop-mfl5-eigenspace-stability)へ代入する。

<!-- proof-start -->
### 証明

$C_X=\operatorname{Cov}(Z_1)$、$C_Y=\operatorname{Cov}(Y_1)$ とする。[曲率の共分散評価](#prop-mfl5-curvature-covariance)と[有界ノイズの評価](#prop-mfl5-noise-covariance)により、

$$
\|C_X-C_0\|_{\mathrm{op}}\le2\kappa r^3+\kappa^2r^4,
\qquad\|C_Y-C_X\|_{\mathrm{op}}\le2r\eta+\eta^2.
$$

$\|Y_i-x\|\le r+\eta$ だから [標本共分散集中](#prop-mfl5-sample-covariance)を $R=r+\eta$ に適用すると、確率 $1-\delta$ 以上で $\|\widehat C-C_Y\|_{\mathrm{op}}\le s_{m,D,\delta}(r+\eta)$。三角不等式で $\|\widehat C-C_0\|_{\mathrm{op}}\le e_*$。$C_0$ の接方向固有値下界は $ar^2$ だから、[固有空間摂動評価](#prop-mfl5-eigenspace-stability)の $\alpha=ar^2$ と置けば両結論が出る。$\square$
<!-- proof-end -->

**読み方**。$r$ を小さくすると曲率項を $r^2$ で割った $O(\kappa r)$ は減る。一方、固定 $\eta>0$ の項は $O(\eta/r+\eta^2/r^2)$ と増え、標本項は有界標本のこの評価では概ね $O((1+\eta/r)^2\sqrt{\log(D/\delta)/m})$ となる。$m$ 自体も通常は $r$ を小さくすると減る。従って **$r\to0$ と $m\to\infty$ を言うだけでは成功しない**。$e_*<ar^2/2$ は推定を保証する十分条件であって必要条件ではない。

### 元の $n$ 個から選ぶときの局所点数

真の中心 $x$ に対し $K=\#\{i:\|X_i-x\|<r\}$ とし、$q=P_X(B_r(x))$ とする。独立標本なら $K$ は二項分布、$EK=nq$、$\operatorname{Var}(K)=nq(1-q)$。$m_0<nq$ について、[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を $|K-nq|\ge nq-m_0$ に適用すれば

$$
P(K<m_0)\le\frac{nq(1-q)}{(nq-m_0)^2}.
$$

条件 $K=m\ge m_0$ の下では、**真の固定球で選んだ**点は条件付き分布からの独立標本であり、上の集中評価を局所点数 $m$ に適用できる。[MFL4の最小小球確率](../MFL4/index.md#def-mfl4-small-ball)は $q$ の下界を与える。ただし $q=0$ の場合や観測で近傍を選ぶ場合に、同じ保証を機械的に移すことはできない。

## 6. 観測近傍のずれと識別失敗

実装では真の $x$ ではなく観測中心 $y_*=x+\xi_*$ を使う。このとき局所集合自体が変わる。

<a id="prop-mfl5-neighborhood-sandwich"></a>

<!-- formal-statement-start -->
> **命題（観測近傍と真の近傍の包含）**
> $Y_i=X_i+\xi_i$、$y_*=x+\xi_*$、$\|\xi_i\|,\|\xi_*\|\le\eta$ とする。$r>2\eta$ のとき

$$
\{i:\|X_i-x\|<r-2\eta\}
\subset\{i:\|Y_i-y_*\|<r\}
\subset\{i:\|X_i-x\|<r+2\eta\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一つの距離には二つの観測誤差 $\xi_i,\xi_*$ が入る。三角不等式と逆三角不等式を両方向に使う。

<!-- proof-start -->
### 証明

任意の $i$ について

$$
\bigl|\|Y_i-y_*\|-\|X_i-x\|\bigr|
\le\|(Y_i-y_*)-(X_i-x)\|
=\|\xi_i-\xi_*\|\le2\eta.
$$

真の距離が $r-2\eta$ より小さければ観測距離は $r$ より小さく、観測距離が $r$ より小さければ真の距離は $r+2\eta$ より小さい。各添字の包含を得る。$\square$
<!-- proof-end -->

この包含は標本数の上限・下限の判断には使えるが、観測で選んだ集合が「真の半径 $r$ 球からの独立同分布標本」であるとは保証しない。境界付近の選択にはノイズが関与し、偏った局所共分散を作る。実際の保証には追加の選択バイアス評価が必要である。

**固定ノイズで失敗する例**。$Z=(U,0)$、$U\sim\mathrm{Uniform}[-r,r]$ を真の直線上の点、$\xi=(0,V)$、$V\sim\mathrm{Uniform}[-\eta,\eta]$ を独立な法線ノイズとする。真の接線は $e_1$ だが

$$
\operatorname{Cov}(Y)=\begin{pmatrix}r^2/3&0\\0&\eta^2/3\end{pmatrix}.
$$

$\eta>r$ なら母集団でさえ上位方向は法線 $e_2$ で、射影距離は1。$\eta=r$ なら固有値ギャップは0で上位方向が一意でない。これは標本数を増やすだけでは直らない。$η$ が有界でも、**相対的な大きさ** と **ノイズの方向** が肝心である。

## 7. 再現実験：曲率・片側サンプリング・ノイズ

`local_pca_lab.py` は放物線 $Z=(U,\kappa U^2/2)$ を用い、左右対称または片側の $U$ を生成する。$U$ の範囲は**パラメータの区間**であり、真の Euclid 球で選んだ点群ではないことを明示する。独立な有界な各座標ノイズを加え、局所平均・$2\times2$ 共分散・固有値ギャップ・真の $e_1$ との射影距離を、NumPyなしで毎回計算する。

```bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL5/local_pca_lab.py --self-test
python3 textbook/volumes/dream_thater/応用系/MFL/MFL5/local_pca_lab.py --n 500 --radius 0.4 --curvature 2 --side one --noise 0.02 --seed 2026
python3 textbook/volumes/dream_thater/応用系/MFL/MFL5/local_pca_lab.py --n 500 --radius 0.4 --curvature 2 --side symmetric --noise 0 --seed 2026
```

最初の例と後の例では交差共分散の母集団値が異なる。出力の `angle_deg` は上位固有方向と真の接線の**鋭角**であり、固有ベクトルの符号反転で変わらない。理論的な有限標本保証の検証ではなく、乱数の初期値を固定した一試行である。$\kappa,r,\eta,n$ を変え、固有値ギャップが小さいときの不安定性も確認する。

## 演習

### MFL5-A01 直線標本のLocal PCA

- Level: A
- 問題: $(-2,1),(0,1),(2,1)$ を同じ局所近傍に含めたとき、平均、分母 $m$ の共分散、上位固有空間と射影を計算せよ。真の直線を $y=1$ とする。

**詳細解答**。$m=3$ で $\bar Y=(0,1)$。偏差は $(-2,0),(0,0),(2,0)$ だから

$$
\widehat C=\frac13\begin{pmatrix}4+0+4&0\\0&0\end{pmatrix}
=\operatorname{diag}(8/3,0).
$$

固有値は $8/3,0$、ギャップは $8/3$。上位方向は $e_1$ で $\widehat P=\operatorname{diag}(1,0)$。[接空間への射影](../MFL2/index.md#def-mfl2-projection)で求める真の直線の接方向も $e_1$ なので、[射影距離](#def-mfl5-projection-distance)は0。

### MFL5-A02 傾いた方向を射影で比較する

- Level: A
- 問題: $T=\operatorname{span}(e_1)$、$\widehat T=\operatorname{span}((\sqrt3/2,1/2))$ で、それぞれの射影行列、差の固有値、射影距離を求めよ。

**詳細解答**。$u=(\sqrt3/2,1/2)^{\mathsf T}$ は $\|u\|^2=3/4+1/4=1$ なので $\widehat P=uu^{\mathsf T}$。

$$
P=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad
\widehat P-P=\begin{pmatrix}-1/4&\sqrt3/4\\\sqrt3/4&1/4\end{pmatrix}.
$$

跡が0、行列式が $-1/16-3/16=-1/4$ なので特性方程式は $\lambda^2-1/4=0$。固有値は $\pm1/2$、従って作用素ノルムは $1/2$。$u$ を $-u$ に替えても $uu^{\mathsf T}$ は不変。

### MFL5-A03 接・法線のモーメントを分ける

- Level: A
- 問題: $U\sim\mathrm{Uniform}[-r,r]$、$Z=(U,\kappa U^2/2)$、$r>0$ とする。$EZ$、$\operatorname{Cov}(Z)$ を求め、上位固有方向が $e_1$ となる十分かつ必要な不等式（固有値が異なる場合）を求めよ。

**詳細解答**。対称性より $EU=EU^3=0$、$EU^2=r^2/3$、$EU^4=r^4/5$。従って $EZ=(0,\kappa r^2/6)$。交差共分散は $(\kappa/2)(EU^3-EU\,EU^2)=0$ であり、

$$
\operatorname{Cov}(Z)
=\operatorname{diag}\left(r^2/3,\frac{\kappa^2}{4}(r^4/5-r^4/9)\right)
=\operatorname{diag}(r^2/3,\kappa^2r^4/45).
$$

第1固有値が接方向に対応するには $r^2/3>\kappa^2r^4/45$、すなわち $\kappa^2r^2<15$ が必要十分。等号ではギャップ0、逆では法線が優先される。

### MFL5-A04 観測中心を使うと半径はどう変わるか

- Level: A
- 問題: すべての観測誤差のノルムが $\eta=0.1$ 以下、観測近傍半径が $r=0.5$ のとき、必ず観測近傍に入る真の距離と、観測近傍に入った点の真の距離の上界を求めよ。

**詳細解答**。[近傍包含命題](#prop-mfl5-neighborhood-sandwich)で $r-2\eta=0.3$、$r+2\eta=0.7$。真の中心から距離 $<0.3$ の点は必ず選ばれ、選ばれた点は真の距離 $<0.7$ である。$0.3\le\|X_i-x\|<0.7$ の点が選ばれるかどうかはノイズの向きで変わる。$m$ と選択後の分布を真の半径0.5のものと同一視してはいけない。

### MFL5-B01 曲率バイアスの角度次数

- Level: B
- 問題: $U\sim\mathrm{Uniform}[0,r]$、$Z=(U,\kappa U^2/2)$、$\kappa>0$ とする。共分散の非対角項を積分から求め、$r\to0$ で上位固有方向の角度が $\kappa r/2+O(r^3)$ となることを示せ。

**詳細解答**。$EU=r/2$、$EU^2=r^2/3$、$EU^3=r^3/4$ から

$$
\operatorname{Cov}(U,\kappa U^2/2)
=\frac\kappa2\left(\frac1r\int_0^r u^3\,du-\frac r2\cdot\frac{r^2}3\right)
=\frac\kappa2\left(\frac{r^3}4-\frac{r^3}6\right)
=\frac{\kappa r^3}{24}.
$$

対角項は $a=r^2/12$、$c=\kappa^2r^4/45$。固有方向を $(\cos\theta,\sin\theta)$ として対角化したとき、交差成分が0になる条件は $(c-a)\sin\theta\cos\theta+b(\cos^2\theta-\sin^2\theta)=0$ である。従って $\tan2\theta=2b/(a-c)$。$2b/(a-c)=\kappa r/(1-(4/15)\kappa^2r^2)=\kappa r+O(r^3)$、$\arctan t=t+O(t^3)$ から $2\theta=\kappa r+O(r^3)$。片側標本の交差共分散が角度の一次項を生む。

### MFL5-B02 ギャップがあるかを有限標本の境界から判定する

- Level: B
- 問題: $d=1$、$\alpha=1$、$\|E\|_{\mathrm{op}}\le0.1$ とする。$C_0=\operatorname{diag}(1,0)$ からの $\widehat C=C_0+E$ について、上位固有値のギャップと $\|\widehat P-P\|_{\mathrm{op}}$ の本章の保証値を求めよ。$E$ の具体的な成分を知らずに誤差0と断定できるか。

**詳細解答**。[固有空間摂動命題](#prop-mfl5-eigenspace-stability)の $e=0.1,\alpha=1$ で $e<\alpha/2$ を満たすので、ギャップは少なくとも $1-2(0.1)=0.8$。射影距離は

$$
\|\widehat P-P\|_{\mathrm{op}}
\le2\sqrt2\,(0.1)=0.2\sqrt2\approx0.283.
$$

これは上界であって等号や0を主張しない。例えば $E=\begin{pmatrix}0&0.1\\0.1&0\end{pmatrix}$ の場合、$\widehat C$ の交差成分が非零なので $e_1$ は固有ベクトルでなく、射影距離は正になる。

### MFL5-B03 近傍点数と独立性

- Level: B
- 問題: $X_1,\ldots,X_n$ が独立で $P(\|X_i-x\|<r)=q$ とする。$K$ の期待値・分散を導き、$m_0<nq$ のとき $P(K<m_0)$ の上界を導け。同じ一つの標本を $n$ 回複製した場合、なぜ同じ証明が使えないか。

**詳細解答**。$H_i=\mathbf1_{\{\|X_i-x\|<r\}}$ とすれば $K=\sum_iH_i$。$EH_i=q$、$H_i^2=H_i$ より $\operatorname{Var}(H_i)=q-q^2=q(1-q)$。独立性で共分散の交差和が消えるので $EK=nq$、$\operatorname{Var}(K)=nq(1-q)$。$K<m_0$ なら $|K-nq|>nq-m_0$ だから、[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)で

$$
P(K<m_0)\le P(|K-nq|\ge nq-m_0)
\le\frac{nq(1-q)}{(nq-m_0)^2}.
$$

全点を一つの $X_1$ の複製とすれば $K=nH_1$、$\operatorname{Var}(K)=n^2q(1-q)$ で、独立和の分散公式が壊れる。$n$ だけ大きくしても「別々の局所情報」は増えていない。

### MFL5-B04 固定法線ノイズの相転換

- Level: B
- 問題: $U\sim\mathrm{Uniform}[-r,r]$、$V\sim\mathrm{Uniform}[-\eta,\eta]$ を独立とし、$Y=(U,V)$ とする。$r>\eta$、$r=\eta$、$r<\eta$ の三場合で母集団 PCA の上位1次元部分空間と真の $e_1$ への射影距離を調べよ。

**詳細解答**。$EU=EV=0$。独立性から $EUV=EU\,EV=0$。区間 $[-r,r]$ に一様な $U$ の二次モーメントは $(2r)^{-1}\int_{-r}^{r}u^2\,du=r^2/3$ で、$V$ は同じ計算で $\eta^2/3$。従って $C=\operatorname{diag}(r^2/3,\eta^2/3)$。$r>\eta$ では上位方向は $e_1$、誤差0。$r<\eta$ では上位方向は $e_2$ で、二つの射影の差は $\operatorname{diag}(1,-1)$ の符号を除く形だから誤差1。$r=\eta$ なら $C=(r^2/3)I_2$ で全方向が上位固有方向、誤差は選択により0から1まで変わる。標本数の極限でもこの母集団の区別不能性は消えない。

### MFL5-C01 半径とノイズの両立条件

- Level: C
- 問題: $d=1,D=2$ の固定真近傍模型で、$a>0,\kappa>0$、有界ノイズ $\eta\ge0$ を仮定し、局所標本数 $m$ の値を固定とする。本章の誤差上界を $r$ で割って、曲率・ノイズ・標本の三つの項がどのように変化するか示せ。$\eta>0$ が固定のまま $r\downarrow0$ としたとき、この上界から接線一致は言えるか。また $\eta=0$、$m\to\infty$、$r\to0$ について、上界が0に向かう十分条件を一つ示せ。

**詳細解答**。[Local PCAの有限標本命題](#prop-mfl5-local-pca-bound)で $d=1$、$R=r+\eta$ とし $L_{m,\delta}=2\sqrt{2\log(16/\delta)/m}+2\sqrt2\sqrt{2\log(8/\delta)/m}$ と置く。$D=2$ なので $s_{m,2,\delta}(R)=R^2L_{m,\delta}$ である。射影距離の（1による切り詰め前の）上界は

$$
\frac{2\sqrt2}{a}
\left(2\kappa r+\kappa^2r^2+\frac{2\eta}{r}+\frac{\eta^2}{r^2}
+\left(1+\frac\eta r\right)^2L_{m,\delta}\right).
$$

$\eta>0$ 固定では $\eta^2/r^2\to\infty$ となり、上界は0へ向かわない（これは真の誤差が必ず1という主張ではない）。$\eta=0$ なら右辺は $(2\sqrt2/a)(2\kappa r+\kappa^2r^2+L_{m,\delta})$。例えば $r_j=1/j$、$m_j=j^2$、$\delta=0.05$ とすれば $r_j\to0$、$L_{m_j,\delta}=O(1/j)$ となり0へ収束する。ただし各 $j$ で同じ $a>0$ の接方向分散下界を持つ真近傍分布を構成できること、$m_j$ 個の局所標本を確保することは別途必要である。

### MFL5-C02 ギャップなしでは極小摂動でも軸が飛ぶ

- Level: C
- 問題: $d=1,D=2$ とし $C_0=I_2$ を考える。$\varepsilon>0$ について $C^{(1)}=C_0+\operatorname{diag}(\varepsilon,0)$、$C^{(2)}=C_0+\operatorname{diag}(0,\varepsilon)$ とする。それぞれの $C_0$ からの作用素ノルム誤差と上位固有空間間の射影距離を求め、接空間推定にギャップ仮定が必要な理由を述べよ。

**詳細解答**。両方の摂動行列は固有値 $\varepsilon,0$ を持つため $\|C^{(j)}-C_0\|_{\mathrm{op}}=\varepsilon$。ところが $C^{(1)}=\operatorname{diag}(1+\varepsilon,1)$ の上位空間は $e_1$、$C^{(2)}=\operatorname{diag}(1,1+\varepsilon)$ の上位空間は $e_2$。対応する射影 $P_1=\operatorname{diag}(1,0)$、$P_2=\operatorname{diag}(0,1)$ だから

$$
\|P_1-P_2\|_{\mathrm{op}}=\|\operatorname{diag}(1,-1)\|_{\mathrm{op}}=1.
$$

$\varepsilon\to0$ としても二つの推定方向は直交したままである。$C_0$ の第1・第2固有値が同じため「本当の上位1方向」という対象自体が一意でなく、行列誤差だけでは選択した方向を制御できない。[固有空間摂動命題](#prop-mfl5-eigenspace-stability)は $C_0=\operatorname{diag}(A,0)$、$A\succeq\alpha I$ という**正のギャップ**を仮定するので、この例と矛盾しない。

## 8. 次章へ

Local PCA は、既知の $d$ を選んで局所共分散の上位空間を取れば接空間に近づくための十分条件を与えた。接方向分散 $ar^2$ と法線分散 $O(\kappa^2r^4)$ の区別は、逆に **内在次元を固有値から推定する** 手がかりにもなる。ただし閾値・密度・境界・ノイズに依存するため、「小さい固有値の数＝余次元」は無条件には成立しない。MFL6 では小球質量の $r^d$ 則と合わせて次元・曲率の推定を検討する。
