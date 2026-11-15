# U3-47 正規・t 分布と分散共分散法による VaR/ES

<!-- definition-example-audit: strict -->

## この講義で問うこと

[U3-44 の保有期間損失](../U3-44/index.md#def-u3-44-loss)は、将来のシナリオでの保有資産価値を再評価して作りました。[U3-45 の VaR](../U3-45/index.md#def-u3-45-var)と[U3-46 の ES](../U3-46/index.md#def-u3-46-es)は、その損失分布が与えられれば計算できます。しかしリスク因子が何十個もあれば、全シナリオを列挙する方法はすぐに重くなります。

ここでは因子の**変化に対して損益が線形**とみなせる場合に、平均ベクトルと分散共分散行列だけで計算する「分散共分散法」を導入します。正規分布なら分散共分散行列で損失の分布まで決まります。一方、同じ分散を持つ t 分布では裾が異なるため、**分散共分散行列が同じでも VaR/ES は同じとは限りません**。

到達目標は次のとおりです。

1. 因子変化・感応度・損益・損失の符号を統一して線形ポートフォリオの平均と分散を導く。
2. 多変量正規モデルから VaR/ES の式を証明する。
3. 共通の尺度混合で作る多変量 t モデルと自由度の条件を理解する。
4. t 分布の上側尾部積分を計算し、VaR/ES の公式を導く。
5. 同一の平均・分散で正規分布と t 分布を比較し、数値積分・標本推定で検算する。

金額は特記しない限り**万円**、保有期間は共通の1日とします。確率は損失予測の**実確率 $P$**であり、[価格付け測度 $Q$ の用途](../U3-44/index.md#def-u3-44-p-q)とは異なります。平均・分散・自由度は推定誤差のない既知のモデル入力として扱います。これらは仮想的な計算例であり、実市場の予測精度を保証しません。

## 1. シナリオの全再評価を線形化すると

将来の株価・金利などの変化を $d$ 個の**リスク因子変化** $X=(X_1,\ldots,X_d)^{\mathsf T}$ にまとめます。各 $X_i$ の単位を固定し、保有額の変化を因子の小さな変化に対して一次で近似するとき、その係数 $w_i$ は「$X_i$ が1単位増えたときの損益変化（万円）」です。例えば $X_i$ が価格の1円変化なら、$w_i$ は保有数量（株）に対応します。将来価値を厳密に再評価する[全再評価](../U3-44/index.md#def-u3-44-full-revaluation)とは異なり、この線形近似には大きな変化や非線形商品で誤差が生じます。

<a id="def-u3-47-linear-loss"></a>

<!-- formal-statement-start -->
> **定義（線形因子損失と分散共分散法）**  
> 固定した保有期間の実確率空間 $(\Omega,\mathcal F,P)$ 上で、$X\in\mathbb R^d$ を有限二次モーメントを持つ因子変化ベクトル、$w\in\mathbb R^d$ を時点0で固定した感応度ベクトル、$c\in\mathbb R$ を確定した費用・現金収支の調整額（万円、正なら費用、負なら受取）とする。線形損益を $\Pi=w^{\mathsf T}X-c$、損失を

$$
L=c-w^{\mathsf T}X
$$

> と置く。因子の平均ベクトルを $\mu=E^P[X]\in\mathbb R^d$、分散共分散行列を $\Sigma=(\operatorname{Cov}^P(X_i,X_j))_{i,j=1}^d$ とし、これらから $L$ の平均・標準偏差と分布形の仮定を用いて VaR/ES を求める方法を、ここでは**分散共分散法**と呼ぶ。$\Sigma$ は対称半正定値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-47-linear-loss -->
**定義の確認**：2因子について $w=(2,-1)^{\mathsf T}$、$c=3$ 万円、$E[X]=(1,0)^{\mathsf T}$、$\Sigma=\begin{pmatrix}4&1\\1&9\end{pmatrix}$ とします。$X_1$ の1単位上昇は損益を2万円増やし、$X_2$ の1単位上昇はショート側の損益を1万円減らします。定義へ代入すると

$$
\Pi=2X_1-X_2-3,\qquad L=3-2X_1+X_2.
$$

分散共分散行列の主小行列式は $4>0$ と $4\cdot9-1^2=35>0$ なので正定値で、二次モーメントの仮定と矛盾しません。行列が何を表すかは各 $i,j$ の $\operatorname{Cov}(X_i,X_j)$ に対応することから決まります。実際、$w^{\mathsf T}\Sigma w=21$（万円の2乗）となる計算は次節で展開します。
<!-- definition-example-end -->

この定義の $w$ を**固定することが重要**です。ショック後にポジションを変える戦略の損益や、オプションの大きな価格変化を常にこの式で表せるわけではありません。

## 2. 平均・分散と正規モデル

[保有期間損失の定義](../U3-44/index.md#def-u3-44-loss)をこの線形設定へ適用して、期待値の線形性と分散の展開を使います。$\mu_L$ を平均損失、$\sigma_L$ をその標準偏差とします。

<a id="prop-u3-47-moments"></a>

<!-- formal-statement-start -->
> **命題（線形損失の平均と分散）**  
> [線形因子損失](#def-u3-47-linear-loss) $L=c-w^{\mathsf T}X$ の仮定の下で、

$$
\mu_L=c-w^{\mathsf T}\mu,\qquad
\sigma_L^2=w^{\mathsf T}\Sigma w\ge0.
$$

> 特に $\sigma_L=0$ なら $L=\mu_L$ が $P$ についてほとんど確実に成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**：一次結合の期待値を成分別に計算し、各因子の平均からの偏差の積を開いて分散共分散行列へ戻します。

<!-- proof-start -->
### 証明

$E[X_i^2]<\infty$ なので [Cauchy--Schwarz 不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から $E[|X_iX_j|]<\infty$ です。従って成分ごとの和と期待値を交換できます。

$$
E[L]=c-\sum_{i=1}^d w_i E[X_i]
=c-\sum_{i=1}^d w_i\mu_i=c-w^{\mathsf T}\mu.
$$

平均を引いた損失は $L-\mu_L=-\sum_i w_i(X_i-\mu_i)$ です。二乗して期待値を取ると

$$
\begin{aligned}
E[(L-\mu_L)^2]
&=E\left[\sum_{i=1}^d\sum_{j=1}^d
w_iw_j(X_i-\mu_i)(X_j-\mu_j)\right]\\
&=\sum_{i,j}w_iw_j\operatorname{Cov}(X_i,X_j)
=w^{\mathsf T}\Sigma w.
\end{aligned}
$$

これは二乗の期待値だから非負です。ゼロなら非負確率変数 $(L-\mu_L)^2$ の期待値が0なので $(L-\mu_L)^2=0$ がほとんど確実です。
<!-- proof-end -->

第1節の具体例では

$$
\Sigma w=\begin{pmatrix}4&1\\1&9\end{pmatrix}
\begin{pmatrix}2\\-1\end{pmatrix}
=\begin{pmatrix}7\\-7\end{pmatrix},\quad
w^{\mathsf T}\Sigma w=(2,-1)\begin{pmatrix}7\\-7\end{pmatrix}=21,
$$

ゆえに $\mu_L=1$ 万円、$\sigma_L=\sqrt{21}$ 万円です。共分散項 $2w_1w_2\Sigma_{12}=-4$ を捨てると誤答になります。

次に標準正規密度とその累積分布を

$$
\phi(z)=\frac{1}{\sqrt{2\pi}}e^{-z^2/2},
\qquad \Phi(z)=\int_{-\infty}^{z}\phi(u)\,du
$$

と記し、$z_\alpha=\Phi^{-1}(\alpha)$（$0<\alpha<1$）とします。正規モデルで「平均と分散だけで十分」と言えるための**分布形の追加仮定**を明確にします。

<a id="def-u3-47-normal-factor"></a>

<!-- formal-statement-start -->
> **定義（多変量正規因子モデル）**  
> $Z=(Z_1,\ldots,Z_r)^{\mathsf T}$ の成分が独立な標準正規確率変数で、$A$ が $d\times r$ 実行列、$\mu\in\mathbb R^d$ のとき、

$$
X=\mu+AZ
$$

> で表せる因子ベクトルを、ここでは**多変量正規因子モデル**と呼ぶ。分散共分散行列は $\Sigma=AA^{\mathsf T}$ で、特異行列でもよい。
<!-- formal-statement-end -->

行列表示 $X=\mu+AZ$ を成分へ戻すと $X_i-\mu_i=\sum_{k=1}^r A_{ik}Z_k$ です。独立標準正規性から $E[Z_kZ_\ell]=1$（$k=\ell$）、$0$（$k\ne\ell$）なので、

$
\operatorname{Cov}(X_i,X_j)
=\sum_{k,\ell}A_{ik}A_{j\ell}E[Z_kZ_\ell]
=\sum_{k=1}^r A_{ik}A_{jk}
=(AA^{\mathsf T})_{ij}.
$

従って $d\times r$ 行列 $A$ から得る $d\times d$ 行列 $AA^{\mathsf T}$ が、定義で要求した分散共分散行列そのものです。以下の例ではこの成分対応を検算します。

<!-- definition-example-start: def-u3-47-normal-factor -->
**定義の確認**：$d=r=2$、$A=\begin{pmatrix}2&0\\1/2&\sqrt{35}/2\end{pmatrix}$、$\mu=(1,0)^{\mathsf T}$ とします。$Z_1,Z_2$ が独立に標準正規なので $X_1=1+2Z_1$、$X_2=Z_1/2+\sqrt{35}Z_2/2$ です。行列積の各成分を確かめると

$$
AA^{\mathsf T}=
\begin{pmatrix}
4&1\\
1&1/4+35/4
\end{pmatrix}
=\begin{pmatrix}4&1\\1&9\end{pmatrix}.
$$

従って第1節と同じ平均・分散共分散行列を実現しています。両因子の共分散が $1$ なのは同じ $Z_1$ を共有するためです。
<!-- definition-example-end -->

<a id="prop-u3-47-normal-projection"></a>

<!-- formal-statement-start -->
> **命題（正規因子の線形射影）**  
> [多変量正規因子モデル](#def-u3-47-normal-factor)と[線形因子損失](#def-u3-47-linear-loss)の仮定の下で、$\sigma_L^2=w^{\mathsf T}\Sigma w>0$ なら

$$
\frac{L-\mu_L}{\sigma_L}\sim N(0,1).
$$

> $\sigma_L=0$ なら $L=\mu_L$ がほとんど確実である。
<!-- formal-statement-end -->

**証明の見取り図**：行列の掛け算によって線形損失を独立標準正規変数の一次結合へ書き直し、その係数二乗和が分散となることを確認します。

<!-- proof-start -->
### 証明

$b=A^{\mathsf T}w\in\mathbb R^r$ とおけば、成分表示では

$$
\begin{aligned}
L-\mu_L
&=-w^{\mathsf T}(X-\mu)
=-w^{\mathsf T}AZ=-b^{\mathsf T}Z,\\
\|b\|^2&=w^{\mathsf T}AA^{\mathsf T}w
=w^{\mathsf T}\Sigma w=\sigma_L^2.
\end{aligned}
$$

[特性関数の定義](../U3-38/index.md#def-u3-38-characteristic)を本講の測度 $P$ で用います。[正規特性関数の導出](../U3-38/index.md#prop-u3-38-gbm-phi)に $m=0$、$v=1$ を代入すれば、独立な $Z_j\sim N(0,1)$ について $E^P[e^{itZ_j}]=e^{-t^2/2}$ です。ここで $t\in\mathbb R$ は特性関数の引数であり、時刻ではありません。独立性によって積の期待値を分解すると、$-b^{\mathsf T}Z$ の特性関数は

$$
E[e^{it(-\sum_jb_j Z_j)}]
=\prod_{j=1}^r e^{-t^2b_j^2/2}
=e^{-t^2\sigma_L^2/2}.
$$

これは平均0・分散 $\sigma_L^2$ の正規分布の特性関数です。$\sigma_L>0$ なら標準化して結論を得ます。$\sigma_L=0$ の場合は[前命題](#prop-u3-47-moments)の最後の結論を使います。
<!-- proof-end -->

## 3. 正規分布の VaR と ES を尾部積分から導く

正規分布では、VaR は「何万円までを覆うか」、ES は「その先の平均が何万円か」です。両方とも**損失が大きい側**の分位点を使います。

<a id="thm-u3-47-normal-var-es"></a>

<!-- formal-statement-start -->
> **定理（正規線形損失の VaR/ES）**  
> 実確率 $P$ の下で $L\sim N(\mu_L,\sigma_L^2)$、$\sigma_L>0$、$0<\alpha<1$、$\beta=1-\alpha$ とする。$z_\alpha=\Phi^{-1}(\alpha)$ と置けば

$$
\operatorname{VaR}_{\alpha}^{P}(L)=\mu_L+\sigma_L z_\alpha,
$$

$$
\operatorname{ES}_{\alpha}^{P}(L)
=\mu_L+\sigma_L\frac{\phi(z_\alpha)}{\beta}.
$$

> $\sigma_L=0$ なら両指標とも $\mu_L$ である。
<!-- formal-statement-end -->

**証明の見取り図**：[VaR の分位点定義](../U3-45/index.md#def-u3-45-var)を正規分布へ代入します。[ES の尾部公式](../U3-46/index.md#prop-u3-46-atom)では連続分布なので境界の原子がなく、密度積分へ帰着します。

<!-- proof-start -->
### 証明

$Y=(L-\mu_L)/\sigma_L$ は標準正規で、$\sigma_L>0$ なので単調変換によって

$$
P(L\le\ell)
=\Phi\left(\frac{\ell-\mu_L}{\sigma_L}\right).
$$

$\Phi$ は連続かつ狭義増加です。[左側分位点による Value at Risk](../U3-45/index.md#def-u3-45-var)から $F_L(\ell)\ge\alpha$ となる最小の $\ell$ は $\mu_L+\sigma_Lz_\alpha$ です。正規分布は原子を持たないので、[ES の連続分布での尾部公式](../U3-46/index.md#prop-u3-46-atom)へ $q=\mu_L+\sigma_L z_\alpha$ を代入します。

$$
\begin{aligned}
\operatorname{ES}_{\alpha}(L)
&=\frac{1}{\beta}E[L\mathbf1_{\{L>q\}}]\\
&=\frac{1}{\beta}\int_{z_\alpha}^{\infty}
(\mu_L+\sigma_Lu)\phi(u)\,du\\
&=\mu_L+\frac{\sigma_L}{\beta}
\int_{z_\alpha}^{\infty}u\phi(u)\,du.
\end{aligned}
$$

最後の等式では $\int_{z_\alpha}^{\infty}\phi(u)\,du=\beta$ を使いました。$\phi'(u)=-u\phi(u)$ かつ $\phi(u)\to0$（$u\to\infty$）だから

$$
\int_{z_\alpha}^{\infty}u\phi(u)\,du
=[-\phi(u)]_{z_\alpha}^{\infty}=\phi(z_\alpha).
$$

従って ES の式も示せました。$\sigma_L=0$ は定数損失であり、[VaR の定義](../U3-45/index.md#def-u3-45-var)・[ES の定義](../U3-46/index.md#def-u3-46-es)の双方から値は $\mu_L$ です。
<!-- proof-end -->

**直接の数値例**：$\mu_L=2$ 万円、$\sigma_L=10$ 万円、$\alpha=0.99$ のとき、$z_{0.99}=2.326348$、$\phi(z_{0.99})/0.01=2.665214$ なので

$$
\operatorname{VaR}_{0.99}=25.2635\ \text{万円},\qquad
\operatorname{ES}_{0.99}=28.6521\ \text{万円}.
$$

ES が VaR より大きいのは、この滑らかな分布では境界より大きい損失のみを平均するからです。**正規分布を仮定しないで $\sigma_L$ と $z_\alpha$ だけから VaR を求めることはできません**。

## 4. t 分布：同じ分散でも尾が違う

金融損益には、正規分布では説明しづらい大きな変化が起きることがあります。これを調べる一つの比較モデルが Student の t 分布です。ここでは**自由度 $\nu>0$** が密度の裾を決めます。

$\chi^2_\nu$ 分布は正規変数の二乗和を整数個だけ足した場合に限らず、正の実数 $\nu$ についても Gamma 分布で定義します。密度は $v>0$ で

$$
g_\nu(v)=\frac{v^{\nu/2-1}e^{-v/2}}{2^{\nu/2}\Gamma(\nu/2)},
\qquad
\Gamma(a)=\int_0^\infty t^{a-1}e^{-t}\,dt
\quad(a>0)
$$

です。これは $v$ を正規化する密度です。$\nu$ は実数で、後で分散が存在するかどうかを分けます。

<a id="def-u3-47-student-t"></a>

<!-- formal-statement-start -->
> **定義（標準 Student t 分布と位置尺度型）**  
> $Z\sim N(0,1)$、$V\sim\chi^2_\nu$ が独立で $\nu>0$ のとき

$$
T_\nu=\frac{Z}{\sqrt{V/\nu}}
$$

> を自由度 $\nu$ の標準 Student t 分布に従う変数とする。その密度と累積分布を $f_\nu,F_\nu$ と記す。

$$
f_\nu(t)
=\frac{\Gamma((\nu+1)/2)}
{\sqrt{\nu\pi}\,\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2},
\qquad
F_\nu(t)=\int_{-\infty}^{t}f_\nu(u)\,du.
$$

> $m\in\mathbb R$、$s>0$ に対して $m+sT_\nu$ を位置 $m$・**尺度 $s$** の t 分布とする。尺度 $s$ は一般には標準偏差ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-47-student-t -->
**定義の確認**：$\nu=5$ とし、独立な $Z\sim N(0,1)$ と $V\sim\chi^2_5$ を取ります。$V>0$ がほとんど確実なので分母が定義でき、$T_5=Z/\sqrt{V/5}$ は上の密度を持ちます。$m=2$ 万円、$s=10\sqrt{3/5}$ 万円なら、$L=2+sT_5$ は位置尺度型 t 損失です。次の命題により、この $s$ を選んだ理由は「標準偏差を10万円へ揃えるため」と分かります。
<!-- definition-example-end -->

**密度式の由来**：混合の分母が $V=v$ と決まったとき、$T_\nu$ は平均0・分散 $\nu/v$ の正規分布です。従って条件付き密度は $\sqrt{v/\nu}\,\phi(t\sqrt{v/\nu})$ です。[定義に現れた $\chi^2$ 密度](#def-u3-47-student-t)で平均を取ると

$$
\begin{aligned}
f_\nu(t)
&=\int_0^\infty\sqrt{\frac v\nu}
\phi\left(t\sqrt{\frac v\nu}\right)g_\nu(v)\,dv\\
&=\frac{1}{\sqrt{2\pi\nu}\,2^{\nu/2}\Gamma(\nu/2)}
\int_0^\infty v^{(\nu+1)/2-1}
e^{-(1+t^2/\nu)v/2}\,dv.
\end{aligned}
$$

$k=(\nu+1)/2>0$、$a=(1+t^2/\nu)/2>0$ として $y=av$ を代入すると

$$
\int_0^\infty v^{k-1}e^{-av}\,dv
=a^{-k}\int_0^\infty y^{k-1}e^{-y}\,dy
=a^{-k}\Gamma(k).
$$

これを上式へ代入すれば[定義の t 密度](#def-u3-47-student-t)が得られます。正規ノイズに**共通する分母が小さいと大きな値が起こりやすい**という発想が、密度の多項式的な尾を生みます。

<a id="prop-u3-47-t-moments"></a>

<!-- formal-statement-start -->
> **命題（Student t のモーメントと尺度）**  
> 上の $T_\nu$ について、$\nu>1$ のとき $E[T_\nu]=0$ かつ $E[|T_\nu|]<\infty$、$\nu>2$ のとき

$$
\operatorname{Var}(T_\nu)=\frac{\nu}{\nu-2}.
$$

> $0<\nu\le1$ では $E[|T_\nu|]=\infty$、$1<\nu\le2$ では平均は存在するが分散が有限でない。従って $\nu>2$ かつ $L=m+sT_\nu$ の標準偏差は $s\sqrt{\nu/(\nu-2)}$ である。
<!-- formal-statement-end -->

**証明の見取り図**：t 密度の大きい $|t|$ での減衰率が $|t|^{-(\nu+1)}$ なので、絶対値の1乗積分には $\nu>1$、2乗積分には $\nu>2$ が必要です。分散の値は正規と独立な $\chi^2$ の逆数の期待値から求まります。

<!-- proof-start -->
### 証明

密度 $f_\nu$ は偶関数で、$|t|\ge\sqrt{\nu}$ では正の定数 $C_1,C_2$ によって $C_1|t|^{-(\nu+1)}\le f_\nu(t)\le C_2|t|^{-(\nu+1)}$ です。従って

$$
\int_{\sqrt{\nu}}^\infty t^k f_\nu(t)\,dt
\quad\text{の有限性}\quad
\Longleftrightarrow\quad
\int_{\sqrt{\nu}}^\infty t^{k-\nu-1}\,dt<\infty
\Longleftrightarrow \nu>k
$$

が $k=1,2$ に対して成立します。$\nu>1$ なら対称性で $E[T_\nu]=0$ です。

$\nu>2$ のとき、独立性と $E[Z^2]=1$ により

$$
E[T_\nu^2]
=E[Z^2]\,\nu E[V^{-1}]
=\nu E[V^{-1}].
$$

$\chi^2$ 密度の式に $v^{-1}$ を掛けて積分し、$v=2t$ と置換すると

$$
\begin{aligned}
E[V^{-1}]
&=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}
\int_0^\infty v^{\nu/2-2}e^{-v/2}\,dv\\
&=\frac{\Gamma(\nu/2-1)}{2\Gamma(\nu/2)}
=\frac{1}{\nu-2}.
\end{aligned}
$$

ここで $\Gamma(a+1)=a\Gamma(a)$ と $\nu/2-1>0$ を使いました。従って分散は $\nu/(\nu-2)$ です。$\nu\le2$ の場合は上の非負積分が発散するため同じ「公式」を代入してはいけません。
<!-- proof-end -->

つまり**同一の分散に揃える**比較では、$\nu>2$ に限り $s=\sigma_L\sqrt{(\nu-2)/\nu}$ としなければなりません。標準 t の「尺度1」と「標準偏差1」は異なります。

## 5. 多変量 t の線形損失と相関

正規モデルで独立の因子ノイズを $AZ$ としてまとめたのと同じ発想を、t 分布へ拡張します。ただし重要なのは、**すべての因子に同じランダムな分母 $V$ を使う**ことです。因子ごとに独立の分母を使うと、一般の線形結合が同じ t 分布になるという性質は失われます。

以下の $N_r(0,I_r)$ は「$r$ 成分が独立な標準正規分布に従うベクトル」を表し、$I_r$ は $r\times r$ 単位行列です。$\mu$ はまず**位置ベクトル**であり、$\nu\le1$ では平均ベクトルとは呼べません。

<a id="def-u3-47-multivariate-t"></a>

<!-- formal-statement-start -->
> **定義（共通尺度混合の多変量 t 因子モデル）**  
> $\nu>0$、$\mu\in\mathbb R^d$、$A\in\mathbb R^{d\times r}$ とする。$Z\sim N_r(0,I_r)$ と $V\sim\chi_\nu^2$ は独立とし、

$$
X=\mu+\sqrt{\frac{\nu}{V}}AZ,\qquad
\Omega=AA^{\mathsf T}
$$

> と定める。$\Omega$ を**尺度行列**と呼ぶ。$\nu>2$ の場合の分散共分散行列は $\Sigma=\nu\Omega/(\nu-2)$ であり、一般に $\Omega$ 自身とは異なる。
<!-- formal-statement-end -->

$Z$ の各成分の平均は0、共分散は $I_r$ です。$\nu>2$ なら[逆 $\chi^2$ モーメントの計算](#prop-u3-47-t-moments)から $E[\nu/V]=\nu/(\nu-2)<\infty$ であり、$Z$ と $V$ の独立性を使って

$
\begin{aligned}
E[X]&=\mu+E[\sqrt{\nu/V}]A E[Z]=\mu,\\
\operatorname{Cov}(X)
&=E[(X-\mu)(X-\mu)^{\mathsf T}]\\
&=E[\nu/V]A E[ZZ^{\mathsf T}]A^{\mathsf T}
=\frac{\nu}{\nu-2}\,AA^{\mathsf T}.
\end{aligned}
$

と導けます。ここでは $E[\sqrt{\nu/V}]<\infty$ は $E[\nu/V]<\infty$ から [Cauchy--Schwarz 不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)で従います。これが $\Omega=AA^{\mathsf T}$ を**尺度行列**、$\Sigma=\nu\Omega/(\nu-2)$ を**共分散行列**と区別する根拠です。$\nu\le2$ では一般にこの共分散計算はできません。

<!-- definition-example-start: def-u3-47-multivariate-t -->
**定義の確認**：第2節の $A$ と $\mu$、共通の $V\sim\chi_5^2$ を使います。$A$ は $2\times2$、$Z$ は2次元、$\Omega=AA^{\mathsf T}=\begin{pmatrix}4&1\\1&9\end{pmatrix}$ は半正定値です。$\nu=5>2$ なので

$$
\Sigma=\frac{5}{3}\begin{pmatrix}4&1\\1&9\end{pmatrix}.
$$

正規モデルと同じ $A$ を使っても共分散は $5/3$ 倍になることを確認しました。正規と**同じ共分散**にするには、$A$ を $\sqrt{3/5}$ 倍すればよいと分かります。
<!-- definition-example-end -->

<a id="prop-u3-47-t-projection"></a>

<!-- formal-statement-start -->
> **命題（共通尺度 t 因子の線形射影）**  
> [多変量 t 因子モデル](#def-u3-47-multivariate-t)に対して、固定ベクトル $w\in\mathbb R^d$ と確定調整額 $c\in\mathbb R$ を取り、$L=c-w^{\mathsf T}X$ と置く。ここでは[線形損失の式](#def-u3-47-linear-loss)だけを用い、同定義の有限二次モーメント条件は仮定しない。

$$
m=c-w^{\mathsf T}\mu,\qquad
s=\sqrt{w^{\mathsf T}\Omega w}.
$$

> $s>0$ なら $L$ は $m+sT_\nu$ と同じ分布を持つ。$s=0$ なら $L=m$ がほとんど確実である。$m$ は位置パラメータであり、$\nu>1$ なら平均損失に等しい。$\nu>2$ の場合に限り

$$
\operatorname{Var}(L)=\frac{\nu}{\nu-2}s^2
=w^{\mathsf T}\Sigma w.
$$
<!-- formal-statement-end -->

**証明の見取り図**：正規射影の[命題](#prop-u3-47-normal-projection)を条件付きで使い、正規一次結合の分母だけに共通の $\chi^2$ 変数を残します。

<!-- proof-start -->
### 証明

$b=A^{\mathsf T}w$ とすれば $s^2=b^{\mathsf T}b$ です。従って

$$
L-m=-\sqrt{\frac{\nu}{V}}\,b^{\mathsf T}Z.
$$

$s>0$ なら、[正規射影の命題](#prop-u3-47-normal-projection)を $X=Z$、$A=I_r$、平均0、感応度 $w=b$、費用 $c=0$ に適用します。このとき損失 $-b^{\mathsf T}Z$ の分散は $b^{\mathsf T}b=s^2>0$ なので、$Z_*=-b^{\mathsf T}Z/s$ は標準正規です。$Z_*$ は $Z$ の関数であり $V$ は $Z$ と独立なので、$Z_*$ と $V$ も独立です。ゆえに

$$
L=m+s\frac{Z_*}{\sqrt{V/\nu}}
\stackrel{\mathrm d}=m+sT_\nu.
$$

$s=0$ のとき $b=0$ で、上式の分子は常に0です。$\nu>2$ なら[Student t の分散](#prop-u3-47-t-moments)から $\operatorname{Var}(L)=s^2\nu/(\nu-2)$ が得られ、$\Sigma=\nu AA^{\mathsf T}/(\nu-2)$ と一致します。
<!-- proof-end -->

**相関の読み方**：$\nu>2$ で $\Omega$ の各対角成分が正なら、$\Sigma$ は $\Omega$ の正の定数倍なので相関係数は同じです。ただし共通の $V$ は極端な変化を因子間で同時に起こりやすくし、相関係数だけではその依存の違いを表せません（依存性の詳しい解析は後の講義で扱います）。

## 6. t 分布の VaR/ES：条件付き積分を計算する

$0<\alpha<1$ とし、$t_{\nu,\alpha}=F_\nu^{-1}(\alpha)$、$\beta=1-\alpha$ と書きます。t 分布の密度は連続で正なので分位点は一意です。上側 $\beta$ の密度積分は、分散がなくても**平均が有限なら**計算できます。

<a id="thm-u3-47-t-var-es"></a>

<!-- formal-statement-start -->
> **定理（位置尺度型 t 損失の VaR/ES）**  
> 実確率 $P$ の下で $L\stackrel{\mathrm d}=m+sT_\nu$、$s>0$、$\nu>1$、$\alpha\in(0,1)$、$\beta=1-\alpha$ とする。このとき

$$
\operatorname{VaR}_{\alpha}^{P}(L)=m+s\,t_{\nu,\alpha},
$$

$$
\operatorname{ES}_{\alpha}^{P}(L)
=m+s\,\frac{\nu+t_{\nu,\alpha}^2}{(\nu-1)\beta}
f_\nu(t_{\nu,\alpha}).
$$

> $s=0$ の定数損失なら両者は $m$。$0<\nu\le1$ では t 分布の右尾平均が発散し、有限実数値の ES は存在しない。$\nu>2$ の場合、標準偏差 $\sigma_L$ を使うなら式中の $s$ を $\sigma_L\sqrt{(\nu-2)/\nu}$ と置き換える。
<!-- formal-statement-end -->

**証明の見取り図**：分位点は単調な位置尺度変換で得られます。[ES の連続分布での尾部公式](../U3-46/index.md#prop-u3-46-atom)を適用し、$u f_\nu(u)$ の積分を微分の逆操作で求めます。

<!-- proof-start -->
### 証明

$s>0$ なので、$L\le\ell$ と $T_\nu\le(\ell-m)/s$ は同値です。$F_\nu$ が連続で狭義増加だから[VaR の定義](../U3-45/index.md#def-u3-45-var)から $q=m+st_{\nu,\alpha}$ です。

$\nu>1$ なら[Student t のモーメントと尺度](#prop-u3-47-t-moments)から $L$ は可積分です。t 分布は原子を持たないので、[ES の尾部公式](../U3-46/index.md#prop-u3-46-atom)を $q$ へ適用して

$$
\begin{aligned}
\operatorname{ES}_{\alpha}(L)
&=\frac{1}{\beta}\int_q^\infty \ell f_L(\ell)\,d\ell\\
&=\frac{1}{\beta}\int_{t_{\nu,\alpha}}^\infty
(m+su)f_\nu(u)\,du\\
&=m+\frac{s}{\beta}
\int_{t_{\nu,\alpha}}^\infty u f_\nu(u)\,du.
\end{aligned}
$$

第2行は $\ell=m+su$、$d\ell=s\,du$、$f_L(\ell)=f_\nu((\ell-m)/s)/s$ という変数変換です。定数を $C_\nu=\Gamma((\nu+1)/2)/(\sqrt{\nu\pi}\Gamma(\nu/2))$ と置き、

$$
\frac{d}{du}\left(1+\frac{u^2}{\nu}\right)^{-(\nu-1)/2}
=-\frac{\nu-1}{\nu}u
\left(1+\frac{u^2}{\nu}\right)^{-(\nu+1)/2}
$$

を用います。$\nu>1$ だから左辺の括弧内は $u\to\infty$ で0となります。従って

$$
\begin{aligned}
\int_t^\infty uf_\nu(u)\,du
&=C_\nu\frac{\nu}{\nu-1}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu-1)/2}\\
&=\frac{\nu+t^2}{\nu-1}\,f_\nu(t).
\end{aligned}
$$

これに $t=t_{\nu,\alpha}$ を代入して結論を得ます。$0<\nu\le1$ の場合は $u f_\nu(u)$ が正の定数倍の $u^{-\nu}$ に漸近し、$t>0$ から無限大への積分が発散します。負の有限 $t$ を選んでも尾の正側で発散するため、有限の ES を置けません。
<!-- proof-end -->

$\nu$ が $1$ を下回ると VaR は有限でも ES は有限でなくなります。$\nu>1$ でも $\nu\le2$ では分散がないので、**「t 分布で分散共分散法を実施した」と言うには不適切**です。この場合にも t の位置尺度モデルと分位点計算自体は可能ですが、共分散入力の手法とは区別します。

## 7. 分散を揃えた比較：95% と 99% は異なる

平均損失 $m=2$ 万円、標準偏差 $\sigma_L=10$ 万円と固定して、正規損失と $\nu=5$ の t 損失を比べます。t の尺度は $s=10\sqrt{3/5}=7.745967$ 万円です。

| 信頼水準 | モデル | 標準化分位点 $\frac{\operatorname{VaR}-m}{\sigma_L}$ | VaR（万円） | ES（万円） |
| --- | --- | ---: | ---: | ---: |
| 95% | 正規 | 1.644854 | 18.4485 | 22.6271 |
| 95% | t（$\nu=5$） | 1.560850 | 17.6085 | 24.3868 |
| 99% | 正規 | 2.326348 | 25.2635 | 28.6521 |
| 99% | t（$\nu=5$） | 2.606464 | 28.0646 | 36.4884 |

95% の VaR だけを見ると t の方が**低く**、95% の ES と99% の VaR/ES では t の方が**高く**なります。「厚い尾だから、あらゆる水準の分位点が必ず正規より大きい」という主張は誤りです。分散を合わせるため t 分布は中心付近を縮める一方、十分遠くの裾では大きい損失を増やすからです。

同じ正規分布でも、保有期間を変えれば入力の $\mu$ と $\Sigma$ が変わります。日次標準偏差に根拠なく $\sqrt{10}$ を掛けて10日リスクを出すことも、変動率が独立同分布である等の条件を別途要します。**線形性、分布形、時間依存性、入力推定**をそれぞれ検証する必要があります。

## 8. 数値積分と標本推定で二重に検算する

公式を丸暗記せず、[$\int_q^\infty\ell f_L(\ell)d\ell/\beta$ という ES の尾部積分](../U3-46/index.md#prop-u3-46-atom)を独立に数値積分し、擬似乱数による上位標本平均と比較します。標本 VaR は順序統計量の左側分位点、標本 ES は[端数の重みを含む分位点平均](../U3-46/index.md#prop-u3-46-empirical)を使用します。標本推定値は有限標本なので閉形式と厳密には一致しません。

下の実験は Python 3 の標準ライブラリだけで動作します。t 分布の分位点は数値積分で求めた累積分布関数に二分法を適用し、ES の尾部積分には別の変数変換を使うため、閉形式をそのまま写した検算にはなっていません。乱数シードを固定しています。まずサンプル数を2万から10万へ増やすと、積分誤差と標本変動のどちらが変わるか予想してください。

~~~python-file-lab
# lab-id: U3-47-PARAMETRIC-RISK
# lab-title: 正規・t の VaR/ES：公式・積分・標本の照合
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-47/assets/parametric_risk.py
# timeout-ms: 15000
# lab-preset: 99%・標本2万 | --alpha 0.99 --samples 20000
# lab-preset: 99%・標本10万 | --alpha 0.99 --samples 100000
# lab-preset: 95%・標本10万 | --alpha 0.95 --samples 100000
~~~

ローカルの Python 3 からも実行できます。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-47/assets/parametric_risk.py --alpha 0.99 --samples 20000
~~~

積分結果は公式に近い値へ収束すべきですが、標本推定は乱数のばらつきを含みます。99% の ES は上位1%だけを使うため、2万標本では実質200個程度の観測しか尾部平均へ寄与しません。モデルが正しいと仮定した**条件付きのシミュレーション**であり、未知の真の将来分布を検証したことにはなりません。

## 9. 演習と詳細解答

### Level A：符号・尺度・分位点

<a id="ex-u3-47-a1"></a>
### U3-47-A1：共分散項の符号

- Level: A

$w=(2,-1)^{\mathsf T}$、$c=3$ 万円、$\mu=(1,0)^{\mathsf T}$、$\Sigma=\begin{pmatrix}4&1\\1&9\end{pmatrix}$ の線形損失の平均・分散と、正規仮定下の95% VaR を求めよ。$z_{0.95}=1.644854$ とする。

<!-- solution-start -->
**詳細解答**：[線形損失の平均・分散命題](#prop-u3-47-moments)を用います。$w^{\mathsf T}\mu=2$ なので平均損失は $3-2=1$ 万円です。分散は対角項と交差項に分けると

$$
\begin{aligned}
w^{\mathsf T}\Sigma w
&=2^2\cdot4+(-1)^2\cdot9
+2(2)(-1)\cdot1\\
&=16+9-4=21.
\end{aligned}
$$

正規分布仮定は問題で与えられているので[正規 VaR 定理](#thm-u3-47-normal-var-es)を適用して

$$
\operatorname{VaR}_{0.95}=1+\sqrt{21}\,(1.644854)
\approx8.5377\ \text{万円}.
$$
<!-- solution-end -->

<a id="ex-u3-47-a2"></a>
### U3-47-A2：正規 ES と平均を取り違えない

- Level: A

$L\sim N(2,10^2)$（万円）、$\alpha=0.99$ とする。$z_{0.99}=2.326348$、$\phi(z_{0.99})=0.02665214$ として VaR と ES を計算せよ。

<!-- solution-start -->
**詳細解答**：分散は $10^2$ なので標準偏差は10万円です。[正規線形損失の VaR/ES](#thm-u3-47-normal-var-es)で $\beta=0.01$ として

$$
\begin{aligned}
\operatorname{VaR}_{0.99}
&=2+10(2.326348)=25.26348,\\
\operatorname{ES}_{0.99}
&=2+10\frac{0.02665214}{0.01}
=28.65214
\end{aligned}
$$

万円です。ES は $E[L]=2$ 万円を計算したものではなく、上側1%の条件付き平均です。
<!-- solution-end -->

<a id="ex-u3-47-a3"></a>
### U3-47-A3：t の尺度を標準偏差へ揃える

- Level: A

$\nu=5$ の t 損失 $L=2+sT_5$ の標準偏差を10万円としたい。$s$ を求め、$t_{5,0.95}=2.015048$ を用いて95% VaR を計算せよ。

<!-- solution-start -->
**詳細解答**：[t のモーメント命題](#prop-u3-47-t-moments)で $\operatorname{Var}(T_5)=5/3$ です。従って $s^2(5/3)=100$ より

$$
s=10\sqrt{\frac35}\approx7.745967\ \text{万円}.
$$

[t の VaR/ES 定理](#thm-u3-47-t-var-es)の分位点式から

$$
\operatorname{VaR}_{0.95}
=2+10\sqrt{\frac35}(2.015048)
\approx17.6085\ \text{万円}.
$$

尺度 $s=10$ と置くと標準偏差が $10\sqrt{5/3}$ となり条件を満たしません。
<!-- solution-end -->

<a id="ex-u3-47-a4"></a>
### U3-47-A4：自由度が変わると何が定義できるか

- Level: A

自由度 $\nu=0.8,\ 1.5,\ 3$ の標準 t 損失それぞれについて、有限な VaR、有限な ES、有限な分散の存在を判定せよ。信頼水準は0.99とする。

<!-- solution-start -->
**詳細解答**：[t の分布の定義](#def-u3-47-student-t)ではいずれも連続・狭義増加な累積分布を持つので0.99分位点、すなわち VaR は有限です。[t モーメント命題](#prop-u3-47-t-moments)では絶対一次モーメントが有限なのは $\nu>1$、二次モーメントが有限なのは $\nu>2$ です。また[尾部積分定理](#thm-u3-47-t-var-es)の証明により $\nu\le1$ の ES は発散します。

| $\nu$ | VaR | 有限 ES | 有限分散 |
| --- | --- | --- | --- |
| 0.8 | あり | なし | なし |
| 1.5 | あり | あり | なし |
| 3 | あり | あり | あり |

$\nu=1.5$ で ES を計算できても、有限の分散共分散行列を使う方法とは呼べない点に注意します。
<!-- solution-end -->

<a id="ex-u3-47-a5"></a>
### U3-47-A5：感応度がゼロのポートフォリオ

- Level: A

正規または t 因子モデルのどちらでも $w^{\mathsf T}\Sigma w=0$（t では $\nu>2$）とする。線形損失の VaR と ES はいくらか。$c-w^{\mathsf T}\mu=m$ と置く。

<!-- solution-start -->
**詳細解答**：[線形損失の平均と分散](#prop-u3-47-moments)により $E[(L-m)^2]=0$ です。被積分量が非負なので、$L=m$ がほとんど確実です。

[左側分位点による Value at Risk](../U3-45/index.md#def-u3-45-var)の定義では、定数損失の累積分布が $m$ で0から1へ跳びます。従って任意の $\alpha\in(0,1)$ に対して

$$
\operatorname{VaR}_\alpha(L)=m.
$$

[ES の分位点積分](../U3-46/index.md#def-u3-46-es)も一定値 $m$ の積分なので

$$
\operatorname{ES}_\alpha(L)=\frac{1}{1-\alpha}\int_\alpha^1 m\,du=m.
$$

標準化でゼロの標準偏差 $\sigma_L$ を割ってはいけません。
<!-- solution-end -->

### Level B：分布変換・裾・破綻条件の検討

<a id="ex-u3-47-b1"></a>
### U3-47-B1：負の感応度でも分散は非負

- Level: B

有限二次モーメントの因子 $X\in\mathbb R^d$ と任意の実ベクトル $w$ について、$\operatorname{Var}(w^{\mathsf T}X)=w^{\mathsf T}\Sigma w\ge0$ を、共分散の定義だけから証明せよ。$\Sigma$ が特異でもよいことを説明せよ。

<!-- solution-start -->
**詳細解答**：$Y=w^{\mathsf T}X$ と置きます。$E[Y]=\sum_iw_i\mu_i$ であり、有限次元なので有限和と期待値を交換できます。さらに $E[(X_i-\mu_i)(X_j-\mu_j)]$ は [Cauchy--Schwarz 不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz) で有限です。

$$
\begin{aligned}
\operatorname{Var}(Y)
&=E\left[\left(\sum_iw_i(X_i-\mu_i)\right)^2\right]\\
&=\sum_{i,j}w_iw_jE[(X_i-\mu_i)(X_j-\mu_j)]\\
&=\sum_{i,j}w_i\Sigma_{ij}w_j=w^{\mathsf T}\Sigma w.
\end{aligned}
$$

左辺は非負確率変数の期待値で0以上です。特異 $\Sigma$ でもこの証明は行列の逆行列を一度も使いません。特定の非零 $w$ で $w^{\mathsf T}\Sigma w=0$ なら、その射影だけがほとんど確実に一定になることを意味します。[線形損失の命題](#prop-u3-47-moments)でも同じ機構を使いました。
<!-- solution-end -->

<a id="ex-u3-47-b2"></a>
### U3-47-B2：t の尾部積分を導出する

- Level: B

$\nu>1$ の t 密度 $f_\nu(u)=C_\nu(1+u^2/\nu)^{-(\nu+1)/2}$ について

$$
\int_q^\infty uf_\nu(u)\,du
=\frac{\nu+q^2}{\nu-1}f_\nu(q)
$$

を任意の実数 $q$ について示し、ES に $\nu>1$ が必要な理由を説明せよ。

<!-- solution-start -->
**詳細解答**：$h(u)=(1+u^2/\nu)^{-(\nu-1)/2}$ と置いて微分すると

$$
h'(u)
=-\frac{\nu-1}{2}\left(1+\frac{u^2}{\nu}\right)^{-(\nu+1)/2}
\frac{2u}{\nu}
=-\frac{\nu-1}{\nu C_\nu}u f_\nu(u).
$$

従って任意の有限 $R>q$ に対して

$$
\int_q^R uf_\nu(u)\,du
=-\frac{\nu C_\nu}{\nu-1}\{h(R)-h(q)\}.
$$

$\nu>1$ なら指数 $-(\nu-1)/2<0$ だから $R\to\infty$ で $h(R)\to0$ です。さらに $C_\nu h(q)=(1+q^2/\nu)f_\nu(q)$ より結論が得られます。$\nu\le1$ では $h(R)$ が0へ行くという核心が壊れ、実際に正側の $uf_\nu(u)$ の積分は発散します。[t の ES 定理](#thm-u3-47-t-var-es)に用いる積分が有限でないためです。
<!-- solution-end -->

<a id="ex-u3-47-b3"></a>
### U3-47-B3：尺度行列と分散共分散行列

- Level: B

共通尺度混合モデルの $\nu=5$、$\Omega=\operatorname{diag}(4,9)$、$w=(1,1)^{\mathsf T}$、$\mu=0$、$c=0$ を考える。損失の尺度 $s$ と標準偏差 $\sigma_L$ を求めよ。同じ標準偏差の正規モデルを使う際の入力を述べよ。

<!-- solution-start -->
**詳細解答**：[多変量 t の定義](#def-u3-47-multivariate-t)では $\Omega$ は尺度行列であって共分散ではありません。[線形 t 射影](#prop-u3-47-t-projection)により

$$
s^2=w^{\mathsf T}\Omega w=4+9=13,
\qquad
s=\sqrt{13}.
$$

$\nu=5>2$ なので $\Sigma=(5/3)\Omega$、従って

$$
\sigma_L^2=w^{\mathsf T}\Sigma w=\frac53(13)=\frac{65}{3},
\qquad
\sigma_L=\sqrt{\frac{65}{3}}.
$$

同じ標準偏差を持つ正規損失を比べるなら $N(0,65/3)$ を用います。誤って正規の分散を13とすると両モデルのリスク水準が一致せず、厚い尾だけの比較になりません。
<!-- solution-end -->

<a id="ex-u3-47-b4"></a>
### U3-47-B4：厚い尾と VaR の大小関係

- Level: B

平均0・標準偏差1の正規モデルと自由度5の t モデルについて、標準正規分位点 $z_{0.95}=1.644854$、$z_{0.99}=2.326348$、t 分位点 $t_{5,0.95}=2.015048$、$t_{5,0.99}=3.364930$ を与える。両水準での VaR の大小を比較し、「t の VaR は常に高い」が誤りである数学的理由を説明せよ。

<!-- solution-start -->
**詳細解答**：[t のモーメント命題](#prop-u3-47-t-moments)によって標準偏差1の t の尺度は $s=\sqrt{3/5}$ です。[両分布の VaR 定理](#thm-u3-47-normal-var-es)と[t の VaR 定理](#thm-u3-47-t-var-es)に代入すると

$$
\begin{array}{c|cc}
&\text{正規}&\text{t（自由度5）}\\ \hline
\alpha=0.95&1.644854&\sqrt{3/5}(2.015048)=1.560850\\
\alpha=0.99&2.326348&\sqrt{3/5}(3.364930)=2.606464
\end{array}
$$

となります。前者は t が低く後者は t が高いです。尺度を $\sqrt{3/5}<1$ に縮めて分散を揃えたため、中心寄りでは小さい分位点になり得ます。一方、[t の密度](#def-u3-47-student-t)は多項式的、正規密度は指数的に減衰するので、十分遠い右尾では t の分位点が大きくなります。尾の厚さだけでは任意の有限 $\alpha$ での大小は決まりません。
<!-- solution-end -->

### Level C：ポートフォリオ全体を比較する

<a id="ex-u3-47-c1"></a>
### U3-47-C1：二因子ポートフォリオの VaR/ES

- Level: C

因子変化 $X\in\mathbb R^2$、$w=(2,-1)^{\mathsf T}$、$c=2$ 万円、$\mu=(1,-1)^{\mathsf T}$ とする。自由度 $\nu=5$ の**共通尺度混合 t モデル**で尺度行列が

$$
\Omega=\begin{pmatrix}4&1\\1&9\end{pmatrix}
$$

であるとき、損失 $L=c-w^{\mathsf T}X$ の平均、尺度、標準偏差、99% VaR/ES を求めよ。さらに**同じ平均・分散**を持つ正規線形モデルの99% VaR/ES と比較せよ。

数値は $t_{5,0.99}=3.364930$、$f_5(t_{5,0.99})\approx0.01091$（計算時は密度式を使うこと）、$z_{0.99}=2.326348$、$\phi(z_{0.99})/0.01=2.665214$ を使用してよい。金額は万円、確率は実確率 $P$ とする。

<!-- solution-start -->
**詳細解答**：まず[線形損失の定義](#def-u3-47-linear-loss)の符号を確かめます。

$$
w^{\mathsf T}\mu=2(1)+(-1)(-1)=3,\qquad
m=c-w^{\mathsf T}\mu=2-3=-1.
$$

次に $\Omega$ は尺度行列なので、[t 射影の命題](#prop-u3-47-t-projection)の $s^2=w^{\mathsf T}\Omega w$ を計算します。

$$
\Omega w=\begin{pmatrix}7\\-7\end{pmatrix},
\qquad
s^2=(2,-1)\begin{pmatrix}7\\-7\end{pmatrix}=21,
\qquad s=\sqrt{21}.
$$

$\nu=5>2$ のため[Student t のモーメントと尺度](#prop-u3-47-t-moments)から分散は $(5/3)21=35$、標準偏差は $\sqrt{35}$ 万円です。よって $L\stackrel{\mathrm d}=-1+\sqrt{21}T_5$ です。

[t の VaR/ES 定理](#thm-u3-47-t-var-es)で $\beta=0.01$ とし、まず密度を元の定義から評価します。

$$
f_5(t)=\frac{\Gamma(3)}{\sqrt{5\pi}\Gamma(5/2)}
\left(1+\frac{t^2}{5}\right)^{-3},
\quad
\operatorname{ES}_{0.99}
=-1+\sqrt{21}\frac{5+t^2}{4(0.01)}f_5(t),
\quad t=3.364930.
$$

数値は

$$
\operatorname{VaR}_{0.99}^{t}\approx14.4200,\qquad
\operatorname{ES}_{0.99}^{t}\approx19.4036
$$

万円です。比較する正規モデルには**t の尺度行列**でなく**t の共分散行列** $\Sigma=(5/3)\Omega$ を使うので、損失は $N(-1,35)$ となります。[正規線形損失の VaR/ES](#thm-u3-47-normal-var-es)から

$$
\begin{aligned}
\operatorname{VaR}_{0.99}^{N}
&=-1+\sqrt{35}(2.326348)\approx12.7629,\\
\operatorname{ES}_{0.99}^{N}
&=-1+\sqrt{35}(2.665214)\approx14.7676
\end{aligned}
$$

万円です。両モデルの平均と標準偏差を一致させても t の99% VaR/ES は大きいと分かります。逆にこの比較は、実際のデータに t が適合することを示すものではありません。分布形の選択、$\nu$ の推定、線形近似の精度を別に検証する必要があります。
<!-- solution-end -->

## 振り返りと次講

本講の分散共分散法は、(a) 線形損益、(b) 実確率 $P$ 下の分布形、(c) 分布パラメータの既知性という仮定に依存します。正規なら平均・分散共分散行列で分位点と尾部平均が決まり、t なら**自由度**も必要です。t の分散が有限となるのは $\nu>2$、ES が有限となるのは $\nu>1$ です。これらの仮定を失えば同じ計算式を無条件には使えません。

次の U3-48 では、正規・t などの分布形を前もって固定しない**過去データに基づくシミュレーション**と、変動率変化を調整する手法へ進みます。
