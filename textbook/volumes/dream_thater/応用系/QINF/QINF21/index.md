# QINF21 Holevo情報と測定の限界

## 1. 区別できる量と、取り出せる古典情報は違う

[量子相対エントロピーのデータ処理不等式](../QINF20/index.md#thm-qinf20-dpi)により、量子状態を雑音や測定へ通しても二状態の相対エントロピーは増えません。しかし通信では、送り手は一つの状態を固定するのではなく、古典ラベル $x$ ごとに別の量子状態を選びます。受け手は状態そのものを知るのではなく、手元で測定して古典的な結果 $y$ を得ます。

たとえば $x=0$ なら $|0\rangle$、$x=1$ なら $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を等確率で送るとします。この二状態は直交しないため、[QINF10の二状態識別](../QINF10/index.md#prop-qinf10-pure-states)では誤りをゼロにできません。一方、識別の**平均誤り確率**と、測定結果がラベルについて教える**相互情報量**は別の量です。後者にどのような普遍的上限があるかを調べます。

以下、量子系 $Q$ は有限次元複素Hilbert空間 $H_Q$、古典ラベル集合 $\mathcal X$ と測定結果集合 $\mathcal Y$ は有限集合とします。対数は底2、情報量の単位はビットで、零固有値には[QINF17の規約](../QINF17/index.md#def-qinf17-entropy) $0\log_2 0=0$ を用います。

## 2. ラベルと量子状態を同時に保つ

まず送信者が何を選ぶかを定式化します。[QINF2の有限量子アンサンブル](../QINF2/index.md#def-qinf2-ensemble-density)は純粋状態ベクトルを確率で選ぶ構成でした。ここでは個々の準備状態が混合状態でもよい形に拡張し、それとは別に**どの状態を選んだか**という古典ラベルを保持します。

<a id="def-qinf21-ensemble"></a>

<!-- formal-statement-start -->
> **定義（密度演算子アンサンブル）**
> 有限集合 $\mathcal X$、確率 $p_x\ge0$（$\sum_{x\in\mathcal X}p_x=1$）、同一の有限次元Hilbert空間 $H_Q$ 上の密度演算子 $\rho_x\ge0$（$\operatorname{Tr}\rho_x=1$）の組 $\mathcal E=\{(p_x,\rho_x):x\in\mathcal X\}$ を**密度演算子アンサンブル**と呼ぶ。その**平均状態**を

$$
\overline\rho=\sum_{x\in\mathcal X}p_x\rho_x
$$

> とする。確率0のラベルは除いても平均状態と以下の情報量は変わらない。
<!-- formal-statement-end -->

送信者が選んだ $x$ を直交する基底 $|x\rangle_X$ に保存すれば、ラベルを残したまま量子状態を扱えます。$H_X$ は $\{|x\rangle_X\}_{x\in\mathcal X}$ を基底とする $|\mathcal X|$ 次元空間です。

<a id="def-qinf21-cq-state"></a>

<!-- formal-statement-start -->
> **定義（古典量子状態）**
> 有限量子アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ に対し、$H_X\otimes H_Q$ 上の**古典量子状態**（cq状態）を

$$
\omega_{XQ}=\sum_x p_x|x\rangle\langle x|_X\otimes\rho_x
$$

> と定義する。$X$ の基底 $|x\rangle$ は古典ラベルを表すもので、量子系 $Q$ の状態を測った結果という意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf21-ensemble, def-qinf21-cq-state -->
### 定義の確認：$|0\rangle$ と $|+\rangle$ を等確率で送る

**定義の確認**として、状態・確率・周辺状態の条件を順に調べます。

$\mathcal X=\{0,1\}$、$p_0=p_1=1/2$、$\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$ とします。$|0\rangle,|+\rangle$ は規格化ベクトルなので、$\rho_0,\rho_1$ は自己共役・正半定値・トレース1です。確率は非負で和1、両状態は同じ二次元空間上にあるためアンサンブルの全条件を満たします。

計算基底 $|0\rangle,|1\rangle$ での平均状態は

$$
\overline\rho=\frac12
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\frac12\begin{pmatrix}1/2&1/2\\1/2&1/2\end{pmatrix}
=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix}.
$$

$\omega_{XQ}$ は $X$ の二つのラベルに沿うブロック対角行列です。各ブロック $p_x\rho_x$ は正半定値なので $\omega_{XQ}\ge0$ であり、トレースは $\sum_xp_x\operatorname{Tr}\rho_x=1$。さらに[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を各項へ施すと

$$
\omega_X=\sum_xp_x|x\rangle\langle x|,
\qquad \omega_Q=\sum_xp_x\rho_x=\overline\rho.
$$

$X$ だけを読むと選んだラベルの分布、$Q$ だけを見るとラベルを忘れた平均状態になります。この二つを混同しないことが以後の情報量の鍵です。
<!-- definition-example-end -->

## 3. 平均状態が保持する情報量を定義する

アンサンブルの混合には二種類あります。各 $\rho_x$ 自身が混合していることと、送信者がどの $x$ を選んだかを知らないことです。その差を[既習のvon Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)で測ります。

<a id="def-qinf21-holevo"></a>

<!-- formal-statement-start -->
> **定義（Holevo情報）**
> 有限量子アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ と平均状態 $\overline\rho=\sum_xp_x\rho_x$ に対して、**Holevo情報**を

$$
\chi(\mathcal E)=S(\overline\rho)-\sum_xp_xS(\rho_x)
$$

> と定義する。$p_x=0$ の項は0とし、各エントロピーは底2とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf21-holevo -->
### 定義の確認：直交する二つの純粋状態

**定義の確認**として、正規化と固有値を調べます。

$p_0=1/4,p_1=3/4$、$\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$ を考えます。両状態は正半定値・トレース1のrank 1射影なので $S(\rho_0)=S(\rho_1)=0$ です。平均状態 $\overline\rho=\operatorname{diag}(1/4,3/4)$ も正半定値・トレース1で、その固有値を使うと

$$
\chi(\mathcal E)=S(\overline\rho)
=-\tfrac14\log_2\tfrac14-\tfrac34\log_2\tfrac34
=h_2(1/4).
$$

ここで $h_2(t)=-t\log_2t-(1-t)\log_2(1-t)$（端点の零項は0）は[INFO1の二値エントロピー](../../INFO/INFO1/index.md#def-info1-entropy)です。この例では計算基底測定でラベルが確実に分かるため、後で得られる上限は実際に達成されます。
<!-- definition-example-end -->

差の式が負にならない理由や、古典ラベルとの関係は次のブロック計算から分かります。

<a id="lem-qinf21-cq-entropy"></a>

<!-- formal-statement-start -->
> **補題（古典量子状態のブロックエントロピー）**
> 有限量子アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ の古典量子状態 $\omega_{XQ}=\sum_xp_x|x\rangle\langle x|\otimes\rho_x$ と周辺状態 $\omega_X,\omega_Q=\overline\rho$ について、$H(p)=-\sum_xp_x\log_2p_x$ とすると

$$
S(\omega_{XQ})=H(p)+\sum_xp_xS(\rho_x),
\qquad I(X:Q)_\omega=\chi(\mathcal E).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\omega_{XQ}$ は直交する $X$ のラベルごとにブロック $p_x\rho_x$ を持ちます。したがって固有値は $p_x$ と $\rho_x$ の固有値の積です。各ブロックの対数を展開すると、ラベルのShannonエントロピーと条件付き量子エントロピーの平均に分かれます。[量子相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)に代入すると、ラベルだけの項は打ち消し合います。

<!-- proof-start -->
### 証明

各 $\rho_x$ の正規直交固有基底を $|u_{xj}\rangle$、固有値を $r_{xj}\ge0$ とします。$\sum_jr_{xj}=1$ です。$|x\rangle\otimes|u_{xj}\rangle$ は $H_X\otimes H_Q$ の正規直交基底になり、$\omega_{XQ}$ を作用させると

$$
\omega_{XQ}(|x\rangle\otimes|u_{xj}\rangle)
=p_xr_{xj}(|x\rangle\otimes|u_{xj}\rangle).
$$

$p_xr_{xj}=0$ の寄与は0とするので、正の項だけで対数を分けると

$$
\begin{aligned}
S(\omega_{XQ})
&=-\sum_{x,j:p_xr_{xj}>0}p_xr_{xj}\log_2(p_xr_{xj})\\
&=-\sum_{x:p_x>0}p_x\log_2p_x\sum_jr_{xj}
-\sum_{x:p_x>0}p_x\sum_{j:r_{xj}>0}r_{xj}\log_2r_{xj}\\
&=H(p)+\sum_xp_xS(\rho_x).
\end{aligned}
$$

$\omega_X$ は対角成分 $p_x$ の状態、$\omega_Q=\overline\rho$ なので $S(\omega_X)=H(p)$、$S(\omega_Q)=S(\overline\rho)$。[量子相互情報量](../QINF18/index.md#def-qinf18-mutual)へこれらを代入すれば

$$
I(X:Q)_\omega
=H(p)+S(\overline\rho)
-\left(H(p)+\sum_xp_xS(\rho_x)\right)
=\chi(\mathcal E).
$$

有限和だけを使った計算なので、非可換な $\rho_x$ が混在していても成立します。$\square$
<!-- proof-end -->

この補題が示すのは、$\chi$ が測定前の**ラベル $X$ と量子系 $Q$ の相互情報量**だということです。受け手が測定して得る量とはまだ区別しなければなりません。

<a id="prop-qinf21-range"></a>

<!-- formal-statement-start -->
> **命題（Holevo情報の範囲と零の等号条件）**
> 有限アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ について

$$
0\le\chi(\mathcal E)\le H(p)\le\log_2|\mathcal X|.
$$

> $\chi(\mathcal E)=0$ となるのは、$p_x>0$ である全てのラベルの状態 $\rho_x$ が同じとき、かつそのときに限る。$\rho_x$ の台が互いに直交する場合は $\chi(\mathcal E)=H(p)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

下限は相互情報量の非負性です。上限では、古典ラベルの完全なコピー $X'$ から $\rho_x$ を準備する量子チャネルを考えます。元のコピーが持つ $H(p)$ を、[局所チャネルのデータ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)では増やせないことを使います。零の等号には相対エントロピーの等号条件が役立ちます。

<!-- proof-start -->
### 証明

[QINF20の相互情報量の相対エントロピー表示](../QINF20/index.md#cor-qinf20-mutual-dpi)と[非負性・等号条件](../QINF20/index.md#prop-qinf20-nonnegative)を適用します。補題から $\chi=I(X:Q)=D(\omega_{XQ}\|\omega_X\otimes\omega_Q)\ge0$ です。相対エントロピーが0なら $\omega_{XQ}=\omega_X\otimes\omega_Q$ であり、両辺の $|x\rangle\langle x|$ ブロックを比較して

$$
p_x\rho_x=p_x\overline\rho.
$$

$p_x>0$ なら $\rho_x=\overline\rho$、逆に全て同一なら $\omega_{XQ}=\omega_X\otimes\overline\rho$ で相互情報量0です。

上限のために、別の古典レジスタ $X'$ にコピーを保存した状態

$$
\tau_{XX'}=\sum_xp_x|xx\rangle\langle xx|
$$

を考えます。周辺状態はどちらも確率 $p$ の対角状態、全体の非零固有値も $p_x$ なので

$$
I(X:X')_\tau=H(p)+H(p)-H(p)=H(p).
$$

$X'$ を測定してラベル $x$ に応じて $\rho_x$ を準備する写像 $\Lambda$ は量子チャネルです。実際、$\rho_x=\sum_jr_{xj}|u_{xj}\rangle\langle u_{xj}|$ と分解して $K_{xj}=\sqrt{r_{xj}}|u_{xj}\rangle\langle x|$ とすれば、$\sum_{xj}K_{xj}^\dagger K_{xj}=\sum_x|x\rangle\langle x|=I_{X'}$ で、[Krausの条件](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たします。このとき

$$
(\operatorname{id}_X\otimes\Lambda)(\tau_{XX'})=\omega_{XQ}.
$$

よって[相互情報量のデータ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)から $\chi=I(X:Q)\le I(X:X')=H(p)$。[Shannonエントロピーの最大値](../../INFO/INFO1/index.md#thm-info1-entropy-bounds)から $H(p)\le\log_2|\mathcal X|$ です。

最後に $\rho_x$ の台が互いに直交すれば、$\overline\rho$ は直交ブロック $p_x\rho_x$ の直和です。上のブロック固有値の計算を $Q$ 単独へ適用すると $S(\overline\rho)=H(p)+\sum_xp_xS(\rho_x)$、ゆえに $\chi=H(p)$ です。$\square$
<!-- proof-end -->

この上限は「一つの量子系を受け取れば必ず $\chi$ ビットを読み出せる」という意味ではありません。次に、**実際の測定結果**を別の古典変数として扱います。

## 4. 測定を古典通信路として書き、Holevo界を証明する

[POVMとBorn則](../QINF5/index.md#def-qinf5-povm)より、$Q$ の有限結果測定は正半定値作用素 $M_y\ge0$、$\sum_{y\in\mathcal Y}M_y=I_Q$ で与えられます。入力ラベル $x$ の下で結果 $y$ が出る確率、その周辺確率、結合確率を順に

$$
q(y|x)=\operatorname{Tr}(M_y\rho_x),
\qquad q_y=\sum_xp_xq(y|x),
\qquad p_{xy}=p_xq(y|x)
$$

と置きます。$q(y|x)\ge0$ は正値性から従い、$\sum_yq(y|x)=\operatorname{Tr}\rho_x=1$ です。従って $p_{xy}$ は非負で全和1の古典同時分布です。

<a id="def-qinf21-accessible"></a>

<!-- formal-statement-start -->
> **定義（可アクセス情報量）**
> 有限アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ と有限結果POVM $\{M_y\}$ が定める古典同時分布 $p_{xy}=p_x\operatorname{Tr}(M_y\rho_x)$ について、測定後の古典相互情報量を

$$
I(X:Y)_M
=\sum_{x,y:p_{xy}>0}p_{xy}\log_2\frac{p_{xy}}{p_xq_y}
$$

> とする。全ての有限結果POVMにわたる上限

$$
I_{\mathrm{acc}}(\mathcal E):=\sup_{\{M_y\}} I(X:Y)_M
$$

> をアンサンブルの**可アクセス情報量**と定義する。式の和では正の $p_{xy}$ の項だけを数え、$p_xq_y=0$ の項は現れない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf21-accessible -->
### 定義の確認：直交状態を計算基底で測る

**定義の確認**として、POVMの条件と測定後の結合確率を直接検算します。

§3の直交アンサンブルに $M_0=|0\rangle\langle0|$、$M_1=|1\rangle\langle1|$ を使います。各 $M_y$ は射影なので正半定値で和は $I_2$。Born則で $q(y|x)=\delta_{xy}$、$p_{00}=1/4,p_{11}=3/4$、その他は0、周辺 $q=(1/4,3/4)$ です。よって

$$
I(X:Y)_M
=\frac14\log_2\frac{1/4}{(1/4)^2}
+\frac34\log_2\frac{3/4}{(3/4)^2}
=h_2(1/4)=\chi(\mathcal E).
$$

測定結果を見ればラベルを誤りなく再現できます。測定を列挙する際は、どの測定を選んだかと、その測定に対する相互情報量を区別してください。
<!-- definition-example-end -->

<a id="thm-qinf21-holevo-bound"></a>

<!-- formal-statement-start -->
> **定理（Holevo界）**
> 有限次元系 $Q$ の任意の有限アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ と、任意の有限結果POVM $\{M_y\}$ に対し、その測定結果 $Y$ が入力ラベル $X$ について持つ古典相互情報量は

$$
I(X:Y)_M\le\chi(\mathcal E)
=S\!\left(\sum_xp_x\rho_x\right)-\sum_xp_xS(\rho_x).
$$

> 従って $I_{\mathrm{acc}}(\mathcal E)\le\chi(\mathcal E)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

古典ラベル $X$ はそのままにし、量子系 $Q$ にだけ「測定して古典結果 $Y$ を記録するチャネル」を作用させます。測定前の $I(X:Q)$ が[ブロックエントロピー補題](#lem-qinf21-cq-entropy)で $\chi$ に等しく、測定後の $I(X:Y)$ が[局所データ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)で増えないことが核心です。

<!-- proof-start -->
### 証明

まず測定結果を直交ラベルで記録する写像を

$$
\mathcal M(\tau)=\sum_y\operatorname{Tr}(M_y\tau)|y\rangle\langle y|_Y
$$

と定めます。$M_y$ の固有分解を $M_y=\sum_km_{yk}|v_{yk}\rangle\langle v_{yk}|$ とし、$K_{yk}=\sqrt{m_{yk}}|y\rangle\langle v_{yk}|$ と置くと

$$
\begin{aligned}
\sum_{y,k}K_{yk}^\dagger K_{yk}&=\sum_yM_y=I_Q,\\
\sum_{y,k}K_{yk}\tau K_{yk}^\dagger
&=\sum_y\operatorname{Tr}(M_y\tau)|y\rangle\langle y|.
\end{aligned}
$$

よって[KrausによるCPTP判定](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\mathcal M$ は量子チャネルです。$\Psi=\operatorname{id}_X\otimes\mathcal M$ を cq 状態へ施すと

$$
\begin{aligned}
\omega_{XY}
&=\Psi(\omega_{XQ})\\
&=\sum_xp_x|x\rangle\langle x|\otimes
\sum_y\operatorname{Tr}(M_y\rho_x)|y\rangle\langle y|\\
&=\sum_{x,y}p_{xy}|xy\rangle\langle xy|.
\end{aligned}
$$

従って $\omega_{XY}$ は確率 $p_{xy}$ に対角な古典同時分布で、周辺も $\omega_X=\operatorname{diag}(p_x)$、$\omega_Y=\operatorname{diag}(q_y)$ です。[対角状態のShannonエントロピー一致](../QINF17/index.md#prop-qinf17-classical)と[INFO2の相互情報量表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)から

$$
I(X:Y)_{\omega_{XY}}=\sum_{x,y:p_{xy}>0}p_{xy}\log_2\frac{p_{xy}}{p_xq_y}=I(X:Y)_M.
$$

ここで $p_{xy}>0$ なら $p_x>0,q_y>0$ なので比の分母が0になる項はありません。最後に、$\Psi$ は $Q$ 側の局所チャネルですから[相互情報量のデータ処理不等式](../QINF20/index.md#cor-qinf20-mutual-dpi)と[補題](#lem-qinf21-cq-entropy)により

$$
I(X:Y)_M=I(X:Y)_{\omega_{XY}}
\le I(X:Q)_{\omega_{XQ}}=\chi(\mathcal E).
$$

全ての有限POVMで成立する共通上界なので、測定について上限を取っても $I_{\mathrm{acc}}\le\chi$ です。$\square$
<!-- proof-end -->

この証明は、受け手が一回だけ測定する有限アンサンブルの情報制約です。長い符号語を使う通信路の達成可能性や容量をこの不等式だけから結論するものではありません。それらは後続のQINF23で学びます。

## 5. いつHolevo界に届くか

もし全ての $\rho_x$ が同じ基底で対角化できるなら、その基底を測定した結果は通常の古典通信路になり、測定前に保持していたラベルの相関を失いません。有限次元では、密度演算子が互いに可換なら共通正規直交固有基底を取れます。

<a id="prop-qinf21-commuting"></a>

<!-- formal-statement-start -->
> **命題（可換アンサンブルにおけるHolevo界の達成）**
> 有限アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ の全ての状態 $\rho_x$ が互いに可換なら、共通正規直交固有基底の射影測定で

$$
I(X:Y)_M=\chi(\mathcal E),
\qquad I_{\mathrm{acc}}(\mathcal E)=\chi(\mathcal E)
$$

> が成立する。特に各状態の台が互いに直交する場合は、測定結果から正の確率を持つラベルを確実に識別でき、値は $H(p)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

共通固有基底の成分 $r_{y|x}$ をそのまま古典通信路の条件付き確率として使います。平均状態の固有値は出力の周辺分布 $q_y$ と一致します。したがってエントロピーの差と古典相互情報量の差が一致します。

<!-- proof-start -->
### 証明

共通正規直交固有基底を $|y\rangle$ とし、$\rho_x=\sum_yr_{y|x}|y\rangle\langle y|$ と書きます。各 $r_{y|x}\ge0$ で $\sum_yr_{y|x}=1$ です。$M_y=|y\rangle\langle y|$ は正半定値で和が $I_Q$ なのでPOVMです。その結果は

$$
q(y|x)=r_{y|x},\qquad q_y=\sum_xp_xr_{y|x}.
$$

平均状態も $\overline\rho=\sum_yq_y|y\rangle\langle y|$ だから、[対角状態のエントロピー](../QINF17/index.md#prop-qinf17-classical)より

$$
S(\overline\rho)=H(q),\qquad S(\rho_x)=H(r_{\cdot|x}).
$$

[INFO1の古典エントロピー連鎖律](../../INFO/INFO1/index.md#thm-info1-chain-rule)で $H(Y|X)=\sum_xp_xH(r_{\cdot|x})$ と計算すれば

$$
I(X:Y)_M=H(Y)-H(Y|X)
=H(q)-\sum_xp_xH(r_{\cdot|x})=\chi(\mathcal E).
$$

[Holevo界](#thm-qinf21-holevo-bound)は全測定でこれを超えられないので上限そのものを達成します。台が互いに直交する場合、測定で得た $y$ は一意のラベル $x$ の台に属し、$H(X|Y)=0$。従って $I(X:Y)=H(p)$ です。$\square$
<!-- proof-end -->

### 可換でも、ラベルを必ず当てられるわけではない

$p_0=p_1=1/2$、$\rho_0=\operatorname{diag}(3/4,1/4)$、$\rho_1=\operatorname{diag}(1/4,3/4)$ とすると、平均状態は $I_2/2$ で $S(\overline\rho)=1$、各 $S(\rho_x)=h_2(1/4)$ です。よって

$$
\chi=1-h_2(1/4)\simeq0.188722.
$$

計算基底測定では $q(y=x|x)=3/4$、$q(y\ne x|x)=1/4$ の古典二値対称通信路になります。$Y$ は一様なので

$$
I(X:Y)=H(Y)-H(Y|X)=1-h_2(1/4)=\chi.
$$

測定結果が毎回正しくラベルを答えるわけではありません。それでも**可換な量子状態について測定により情報を余計に失わない**という意味でHolevo界を達成します。

## 6. 非直交二状態：誤り確率と相互情報量を並べる

§2の等確率アンサンブル $\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$ に戻ります。二つは純粋なので $S(\rho_0)=S(\rho_1)=0$ ですが、平均状態は非対角であり、その固有値を計算する必要があります。

$$
\overline\rho=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix},
\qquad\operatorname{Tr}\overline\rho=1,
\qquad\det\overline\rho=\frac3{16}-\frac1{16}=\frac18.
$$

特性方程式 $\lambda^2-\lambda+1/8=0$ の解は

$$
\lambda_\pm=\frac{1\pm1/\sqrt2}{2},
\qquad\chi=h_2(\lambda_-)=0.600876\ldots.
$$

一方、計算基底 $\{|0\rangle,|1\rangle\}$ で測定すると $q(0|0)=1$、$q(0|1)=1/2$ で、出力分布は $q=(3/4,1/4)$。従って

$$
I(X:Y)_{\mathrm{computational}}
=h_2(1/4)-\tfrac12=0.311278\ldots.
$$

さらに[QINF10のHelstrom測定](../QINF10/index.md#thm-qinf10-helstrom)を選ぶと、最小誤りを実現する射影 $E_0,E_1$ があり、$e=(1-1/\sqrt2)/2$ と置けば条件付き確率は

$$
\begin{array}{c|cc}
&Y=0&Y=1\\\hline
X=0&1-e&e\\
X=1&e&1-e
\end{array}
$$

となります。両入力が等確率なので出力も一様です。従って

$$
P_{\mathrm e}^{\mathrm{Helstrom}}=e=0.146447\ldots,
\qquad I(X:Y)_{\mathrm{Helstrom}}=1-h_2(e)=0.399124\ldots.
$$

この例では $h_2(e)=\chi$ なので、比較は

$$
0.311278\ldots<0.399124\ldots<0.600876\ldots=\chi.
$$

Helstrom測定が**誤り確率**を最小にすることは証明済みですが、そこから直ちに**相互情報量**も全POVMの中で最大と結論してはいけません。ここでは二つの具体的POVMの値を計算したのであり、$I_{\mathrm{acc}}$ の厳密値をこの比較だけで確定したわけではありません。Holevo界はどちらにも成立します。

## 7. 送信前の雑音はHolevo情報を増やさない

測定前に量子系へ雑音が入った場合にも、[データ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)の向きは変わりません。入力状態ごとに別々の量子チャネルを選ぶのではなく、**同じ**チャネルを全ての状態へ施す場合を考えます。

<a id="prop-qinf21-channel"></a>

<!-- formal-statement-start -->
> **命題（送信前の量子チャネルでHolevo情報は増えない）**
> 有限アンサンブル $\mathcal E=\{(p_x,\rho_x)\}$ と、全状態に共通に作用する有限次元量子チャネル $\Phi$ に対し、出力アンサンブルを $\Phi\mathcal E=\{(p_x,\Phi(\rho_x))\}$ とすると

$$
\chi(\Phi\mathcal E)\le\chi(\mathcal E).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi$ はラベル $X$ を変えずに系 $Q$ のみに作用します。前後のHolevo情報を[ブロックエントロピーの補題](#lem-qinf21-cq-entropy)で量子相互情報量へ読み替え、局所チャネルの単調性を使います。

<!-- proof-start -->
### 証明

$\omega_{XQ}=\sum_xp_x|x\rangle\langle x|\otimes\rho_x$ と置き、出力系を $Q'$ と書きます。$\Psi=\operatorname{id}_X\otimes\Phi$ はCPTPなので、$\omega_{XQ'}'=\Psi(\omega_{XQ})=\sum_xp_x|x\rangle\langle x|\otimes\Phi(\rho_x)$ も正半定値・トレース1で、出力アンサンブルのcq状態です。[補題](#lem-qinf21-cq-entropy)、[局所データ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)を順に適用すると

$$
\chi(\Phi\mathcal E)=I(X:Q')_{\omega'}
\le I(X:Q)_\omega=\chi(\mathcal E).
$$

各状態のエントロピーが雑音で増えるか減るかを個別に仮定する必要はありません。比較するのは、平均状態と個々の状態を組にした情報量です。$\square$
<!-- proof-end -->

### 例：位相消失でラベルが消える

二状態 $|+\rangle,|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ を等確率で送ると、両状態は直交し、平均状態は $I_2/2$、入力の $\chi=1$ です。一方、計算基底での位相消失チャネル

$$
\mathcal D(\tau)=|0\rangle\langle0|\tau|0\rangle\langle0|
+|1\rangle\langle1|\tau|1\rangle\langle1|
$$

は、両状態を同じ $I_2/2$ に写します。[Kraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)は二つの射影の和が $I_2$ なので成立します。出力は全て同一で、[零の等号条件](#prop-qinf21-range)から $\chi(\mathcal D\mathcal E)=0$。これは $X$ の情報が位相に符号化されていた例です。

測定した後で結果 $Y$ を古典的に粗視化する場合も、[古典データ処理](../../INFO/INFO2/index.md#thm-info2-mutual-dpi)により $I(X:Y)$ は増えません。量子チャネルを先に通す操作と、測定結果を後で加工する操作は区別しますが、情報損失の向きは同じです。

## 8. 演習：測定前後の情報量を計算する

### Level A：定義と有限行列の基本確認

<a id="ex-qinf21-a01"></a>
### QINF21-A01 同じ状態を異なるラベルで送る

- Level: A

$X\in\{0,1\}$ の確率を $p_0=1/3,p_1=2/3$ とし、送るqubit状態をどちらも $\rho_0=\rho_1=|0\rangle\langle0|$ とする。古典量子状態 $\omega_{XQ}$ と周辺状態を構成し、$\chi$ および任意の有限結果POVMによる $I(X:Y)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$|0\rangle$ は規格化ベクトルなので $\rho_0=\rho_1$ は正半定値・トレース1です。$p_0,p_1$ は非負で和1だから[有限アンサンブル](#def-qinf21-ensemble)の条件を満たします。[cq状態の定義](#def-qinf21-cq-state)に代入すると

$$
\omega_{XQ}=\left(\tfrac13|0\rangle\langle0|_X
+\tfrac23|1\rangle\langle1|_X\right)\otimes|0\rangle\langle0|_Q.
$$

各因子は密度演算子で、$\omega_X=\operatorname{diag}(1/3,2/3)$、$\omega_Q=\overline\rho=|0\rangle\langle0|$ です。各 $S(\rho_x)=0$、$S(\overline\rho)=0$ より[Holevo情報](#def-qinf21-holevo)は $\chi=0$。

任意のPOVM $\{M_y\}$ について $q(y|0)=\operatorname{Tr}(M_y\rho_0)=\operatorname{Tr}(M_y\rho_1)=q(y|1)$。これを $q_y$ と書くと $p_{xy}=p_xq_y$ ですから、正の項の対数比は全て1で $I(X:Y)=0$。上限が0であるだけでなく、直接に測定結果とラベルの独立性を確認できました。
<!-- solution-end -->

<a id="ex-qinf21-a02"></a>
### QINF21-A02 非一様な事前確率でも直交なら届く

- Level: A

$p_0=1/4,p_1=3/4$、$\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$ とする。$\chi$、計算基底POVMの $q(y|x)$、$I(X:Y)$ を計算し、[Holevo界](#thm-qinf21-holevo-bound)の等号を検証せよ。

<!-- solution-start -->
### 詳細解答

二つのrank 1射影は正半定値・トレース1で、平均状態は $\overline\rho=\operatorname{diag}(1/4,3/4)$。各純粋状態のエントロピーは0、平均の固有値は $1/4,3/4$ なので

$$
\chi=S(\overline\rho)=h_2(1/4).
$$

$M_0=|0\rangle\langle0|$、$M_1=|1\rangle\langle1|$ は $M_y\ge0$、$M_0+M_1=I_2$ を満たします。$q(y|x)=\operatorname{Tr}(M_y\rho_x)=\delta_{xy}$ なので $Y=X$、$H(X|Y)=0$ です。[古典相互情報量](#def-qinf21-accessible)は

$$
I(X:Y)=H(X)-H(X|Y)=h_2(1/4)=\chi.
$$

これは[可換アンサンブルの命題](#prop-qinf21-commuting)のうち、台が直交する場合です。
<!-- solution-end -->

<a id="ex-qinf21-a03"></a>
### QINF21-A03 混合している可換アンサンブル

- Level: A

$p_0=p_1=1/2$、$\rho_0=\operatorname{diag}(3/4,1/4)$、$\rho_1=\operatorname{diag}(1/4,3/4)$ とする。$\chi$ を計算し、計算基底POVMではその値が得られることを確かめよ。また、結果を全て一つのラベルにまとめると情報量がどうなるか示せ。

<!-- solution-start -->
### 詳細解答

各 $\rho_x$ は非負の対角成分を持ち、トレース1なので密度演算子です。平均状態は $\overline\rho=I_2/2$ です。したがって

$$
\chi=S(I_2/2)-\tfrac12S(\rho_0)-\tfrac12S(\rho_1)
=1-h_2(1/4).
$$

計算基底で測ると $q(0|0)=q(1|1)=3/4$、$q(1|0)=q(0|1)=1/4$。周辺出力は $q_0=q_1=1/2$、条件付きエントロピーは両ラベルで $h_2(1/4)$ だから

$$
I(X:Y)=H(Y)-H(Y|X)=1-h_2(1/4)=\chi.
$$

二結果を一つに統合する測定は $M_*=M_0+M_1=I_2$ の一結果POVMです。$q(*|x)=1$ は $x$ に依存せず、$H(Y)=H(Y|X)=0$ なので $I(X:Y)=0$。測定結果の粗視化で情報が失われることも確認できます。
<!-- solution-end -->

<a id="ex-qinf21-a04"></a>
### QINF21-A04 事前確率を変えた非直交純粋状態

- Level: A

$p_0=1/4,p_1=3/4$、$\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$ の平均状態、固有値、Holevo情報を求めよ。$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ とする。

<!-- solution-start -->
### 詳細解答

各 $\rho_x$ はrank 1射影で $S(\rho_x)=0$。[平均状態の定義](#def-qinf21-ensemble)を行列表現へ代入すると

$$
\overline\rho=\tfrac14\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\tfrac34\begin{pmatrix}1/2&1/2\\1/2&1/2\end{pmatrix}
=\begin{pmatrix}5/8&3/8\\3/8&3/8\end{pmatrix}.
$$

対角成分の和は1、行列式は $(5/8)(3/8)-(3/8)^2=3/32>0$ です。$\lambda^2-\lambda+3/32=0$ を解くと

$$
\lambda_\pm=\frac{1\pm\sqrt{1-4(3/32)}}{2}
=\frac{1\pm\sqrt{5/8}}{2}.
$$

両固有値は正で和1なので $\overline\rho$ は密度演算子です。よって

$$
\chi=h_2\!\left(\frac{1-\sqrt{5/8}}2\right).
$$

等確率のときとは固有値が異なります。純粋状態のエントロピーが0でも、平均状態の固有値を事前確率込みで計算する必要があります。
<!-- solution-end -->

<a id="ex-qinf21-a05"></a>
### QINF21-A05 状態を見ない二結果POVM

- Level: A

任意の有限アンサンブルと $0\le t\le1$ に対し、$M_0=tI_Q$、$M_1=(1-t)I_Q$ とする。POVMの条件を確認し、測定結果 $Y$ の分布と $I(X:Y)$ を求めよ。$t=0,1$ も含めること。

<!-- solution-start -->
### 詳細解答

$M_0,M_1$ は非負の定数と恒等作用素の積なので正半定値で、和は $I_Q$ です。任意の密度演算子 $\rho_x$ はトレース1だから

$$
q(0|x)=\operatorname{Tr}(tI_Q\rho_x)=t,
\qquad q(1|x)=1-t.
$$

従って $q_0=t,q_1=1-t$、$p_{xy}=p_xq_y$ で、正の項に対する比 $p_{xy}/(p_xq_y)$ は1です。[可アクセス情報量の定義](#def-qinf21-accessible)の内側にあるこの測定の相互情報量は $I(X:Y)=0$。$t=0$ または1でも、確率0の結果は和から除くため同じ結論です。
<!-- solution-end -->

### Level B：測定と相関をつなぐ

<a id="ex-qinf21-b01"></a>
### QINF21-B01 ブロックエントロピーを固有値で再構成する

- Level: B

$p_0=p_1=1/2$、$\rho_0=|0\rangle\langle0|$、$\rho_1=I_2/2$ とする。次を確かめよ。

1. cq状態 $\omega_{XQ}$ の固有値と $S(\omega_{XQ})$。
2. $I(X:Q)=\chi$ を両側から計算すること。
3. 計算基底測定の $I(X:Y)$ が $\chi$ に等しいこと。

<!-- solution-start -->
### 詳細解答

**1. cq状態。** 両入力状態は正半定値・トレース1で、確率も規格化されています。[cq状態の定義](#def-qinf21-cq-state)に代入すると $X=0$ のブロックは $\frac12\operatorname{diag}(1,0)$、$X=1$ のブロックは $\frac12(I_2/2)=\operatorname{diag}(1/4,1/4)$ です。従って全体の固有値は $(1/2,0,1/4,1/4)$ で、その和は1、全て非負です。

$$
S(\omega_{XQ})=-\tfrac12\log_2\tfrac12
-2\cdot\tfrac14\log_2\tfrac14=\tfrac32.
$$

**2. 二通りの情報量。** $\omega_X=I_2/2$、$\omega_Q=\overline\rho=\frac12\rho_0+\frac12\rho_1=\operatorname{diag}(3/4,1/4)$ です。$S(\omega_X)=1$、$S(\omega_Q)=h_2(1/4)$ なので、[相互情報量](../QINF18/index.md#def-qinf18-mutual)と[Holevo情報](#def-qinf21-holevo)は

$$
\begin{aligned}
I(X:Q)&=1+h_2(1/4)-3/2=h_2(1/4)-1/2,\\
\chi&=h_2(1/4)-\tfrac12S(\rho_0)-\tfrac12S(\rho_1)
=h_2(1/4)-1/2
\end{aligned}
$$

と一致します。最後に $S(\rho_0)=0,S(\rho_1)=1$ を代入しました。

**3. 測定。** $M_y=|y\rangle\langle y|$ は二結果の射影POVMです。$q(0|0)=1,q(0|1)=1/2$、出力分布は $q=(3/4,1/4)$ です。従って $H(Y)=h_2(1/4)$、$H(Y|X)=\frac12\cdot0+\frac12\cdot1=1/2$ で、$I(X:Y)=h_2(1/4)-1/2=\chi$。[可換アンサンブルの達成命題](#prop-qinf21-commuting)を具体的に確かめました。
<!-- solution-end -->

<a id="ex-qinf21-b02"></a>
### QINF21-B02 Helstrom測定の結果を通信路として読む

- Level: B

$p_0=p_1=1/2$、$\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$ とする。$\Delta=(\rho_0-\rho_1)/2$ とし、$E_0=(I_2+2\sqrt2\Delta)/2$、$E_1=I_2-E_0$ を定める。

1. $\Delta^2=I_2/8$ を示し、$E_0,E_1$ がPOVMであることを確認せよ。
2. $q(y|x)=\operatorname{Tr}(E_y\rho_x)$、最小誤り確率、$I(X:Y)$ を求めよ。
3. $\chi$ との不等式を検算し、この計算だけでは可アクセス情報量の最適値を証明していない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**1. 射影性。** $|+\rangle\langle+|=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ を代入すると

$$
\Delta=\tfrac14\begin{pmatrix}1&-1\\-1&-1\end{pmatrix},
\qquad\Delta^2=\tfrac1{16}\begin{pmatrix}2&0\\0&2\end{pmatrix}=I_2/8.
$$

$A=2\sqrt2\Delta$ と置けば $A=A^\dagger,A^2=I_2$。従って $E_0=(I+A)/2$ は $E_0^2=(I+2A+A^2)/4=E_0$ を満たす自己共役射影です。$E_1=(I-A)/2$ も同様で、双方は正半定値、和は $I_2$。よってPOVMです。

**2. 条件付き確率。** $e=(1-1/\sqrt2)/2$ と置きます。$E_0$ の $(0,0)$ 成分は $(1+1/\sqrt2)/2=1-e$ だから $q(0|0)=1-e$。一方 $|+\rangle$ での期待値は

$$
q(0|1)=\langle+|E_0|+\rangle
=\tfrac12\!\left(1-\tfrac1{\sqrt2}\right)=e.
$$

補集合 $E_1=I-E_0$ より $q(1|0)=e,q(1|1)=1-e$ です。$Y$ も一様となり、[Helstrom界](../QINF10/index.md#thm-qinf10-helstrom)が保証する最小誤りは、結果をラベルと解釈したとき

$$
P_{\mathrm e}=\tfrac12q(1|0)+\tfrac12q(0|1)=e,
\qquad I(X:Y)=1-h_2(e).
$$

**3. 上界。** 平均状態の固有値は $1-e,e$ なので $\chi=h_2(e)$ です。数値は $I(X:Y)=0.399124\ldots$、$\chi=0.600876\ldots$ で $I(X:Y)<\chi$。[Holevo界](#thm-qinf21-holevo-bound)と矛盾しません。ただし[Helstrom界](../QINF10/index.md#thm-qinf10-helstrom)が最適化するのは**平均誤り確率**で、[可アクセス情報量](#def-qinf21-accessible)が最適化する**相互情報量**とは目的関数が異なります。この一測定の計算だけでは $\sup_M I(X:Y)_M$ を確定できません。
<!-- solution-end -->

<a id="ex-qinf21-b03"></a>
### QINF21-B03 異なるラベルに同じ状態が対応する

- Level: B

$\mathcal X=\{0,1,2\}$、$p=(1/4,1/4,1/2)$、$\rho_0=\rho_1=|0\rangle\langle0|$、$\rho_2=|1\rangle\langle1|$ とする。$H(X)$ と $\chi$ を計算し、計算基底測定で $I(X:Y)=\chi$ となることを示せ。なぜ $H(X)$ には届かないのかも説明せよ。

<!-- solution-start -->
### 詳細解答

全ての状態はrank 1射影で正半定値・トレース1、確率は非負で総和1です。古典ラベルのShannonエントロピーは

$$
H(X)=-2\cdot\tfrac14\log_2\tfrac14
-\tfrac12\log_2\tfrac12=\tfrac32.
$$

平均状態は $\overline\rho=(p_0+p_1)|0\rangle\langle0|+p_2|1\rangle\langle1|=I_2/2$ なので $S(\overline\rho)=1$、各 $S(\rho_x)=0$。従って $\chi=1<3/2$ です。計算基底POVM $M_y=|y\rangle\langle y|$ では $q(0|0)=q(0|1)=1,q(1|2)=1$、結果 $Y$ の分布は $(1/2,1/2)$ です。$Y$ は $X$ の関数で $H(Y|X)=0$ だから

$$
I(X:Y)=H(Y)-H(Y|X)=1=\chi.
$$

結果0からは元のラベルが0か1か分からず、条件付き分布はそれぞれ確率1/2です。$H(X|Y)=p(Y=0)\cdot1+p(Y=1)\cdot0=1/2$ で、$I(X:Y)=H(X)-H(X|Y)=3/2-1/2=1$ とも検算できます。同じ状態で符号化した二つのラベルは量子測定でも区別できません。
<!-- solution-end -->

<a id="ex-qinf21-b04"></a>
### QINF21-B04 位相消失で消えるアンサンブル情報

- Level: B

$p_+=p_-=1/2$、$\rho_\pm=|\pm\rangle\langle\pm|$、$|\pm\rangle=(|0\rangle\pm|1\rangle)/\sqrt2$ とする。計算基底射影 $P_j=|j\rangle\langle j|$ による $\mathcal D(\tau)=P_0\tau P_0+P_1\tau P_1$ について次を示せ。

1. $\mathcal D$ はCPTPであり、$\mathcal D(\rho_\pm)=I_2/2$ である。
2. 雑音の前後のHolevo情報と、雑音後の任意の有限POVMの $I(X:Y)$ を求めよ。

<!-- solution-start -->
### 詳細解答

**1. 出力状態。** $P_j^\dagger P_j=P_j$ かつ $P_0+P_1=I_2$ なので、[Krausの条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\mathcal D$ はCPTPです。$\rho_\pm=\frac12\begin{pmatrix}1&\pm1\\\pm1&1\end{pmatrix}$ の非対角項は $P_j\rho_\pm P_j$ では消え、

$$
\mathcal D(\rho_+)=\mathcal D(\rho_-)
=\tfrac12\begin{pmatrix}1&0\\0&1\end{pmatrix}=I_2/2.
$$

**2. 情報量。** 雑音前の二状態は内積 $\langle+|-\rangle=0$ を持つ直交純粋状態で平均 $I_2/2$、従って $\chi_{\mathrm{before}}=1-0=1$。雑音後は平均も個々も $I_2/2$ なので $\chi_{\mathrm{after}}=1-(1/2)\cdot1-(1/2)\cdot1=0$ です。任意の有限POVM $M_y$ について $q(y|+)=\operatorname{Tr}(M_yI_2/2)=q(y|-)$ ですから $p_{xy}=p_xq_y$、従って $I(X:Y)=0$。これは[チャネル単調性](#prop-qinf21-channel)の厳密な減少例です。
<!-- solution-end -->

### Level C：測定と事前雑音を統合する

<a id="ex-qinf21-c01"></a>
### QINF21-C01 量子アンサンブルから古典通信路への二つの経路

- Level: C

入力ラベル $X\in\{0,1\}$ を等確率とし、$\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$ を送る。$Q$ に何もしない経路Aと、計算基底位相消失チャネル $\mathcal D(\tau)=P_0\tau P_0+P_1\tau P_1$（$P_j=|j\rangle\langle j|$）を通す経路Bを比較する。

1. 経路Aの $\overline\rho$ の固有値とHolevo情報 $\chi_A$ を求めよ。
2. 経路Bの各出力状態と平均状態を求め、$\mathcal D$ がCPTPであることを確認して $\chi_B$ を求めよ。
3. 経路Bの出力に計算基底POVMを使い、$I(X:Y)$ を計算してHolevo界の等号を確かめよ。
4. 経路AでHelstrom測定を使ったときの $I(X:Y)$ と比較し、$\chi_B\le\chi_A$、および誤り確率と相互情報量の最適化の違いを説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 雑音前。** 二つの入力状態は規格化純粋状態への射影なので密度演算子で、$S(\rho_0)=S(\rho_1)=0$ です。平均は

$$
\overline\rho_A=\frac12\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\frac12\begin{pmatrix}1/2&1/2\\1/2&1/2\end{pmatrix}
=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix}.
$$

トレース1、行列式1/8から特性方程式 $\lambda^2-\lambda+1/8=0$ となり、固有値は $\lambda_\pm=(1\pm1/\sqrt2)/2$ です。$e=(1-1/\sqrt2)/2$ と置けば[Holevo情報](#def-qinf21-holevo)は

$$
\chi_A=h_2(e)=0.600876\ldots.
$$

**2. 雑音後。** 二つの射影 $P_0,P_1$ は正半定値で $P_0+P_1=I_2$。Kraus作用素として $\sum_jP_j^\dagger P_j=I_2$ を満たすので[QINF7のCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)が使えます。作用させると

$$
\begin{aligned}
\rho_0'&=\mathcal D(\rho_0)=\operatorname{diag}(1,0),\\
\rho_1'&=\mathcal D(\rho_1)=I_2/2,\\
\overline\rho_B&=(\rho_0'+\rho_1')/2
=\operatorname{diag}(3/4,1/4).
\end{aligned}
$$

各出力は正半定値・トレース1で、$S(\rho_0')=0,S(\rho_1')=1,S(\overline\rho_B)=h_2(1/4)$ です。したがって

$$
\chi_B=h_2(1/4)-1/2=0.311278\ldots.
$$

**3. 古典結果。** $M_0=P_0,M_1=P_1$ はPOVMで、$q(0|0)=1$、$q(0|1)=1/2$。出力確率は $q=(3/4,1/4)$ なので $H(Y)=h_2(1/4)$、$H(Y|X)=(0+1)/2=1/2$。従って

$$
I(X:Y)_B=h_2(1/4)-1/2=\chi_B.
$$

出力の二状態は可換であり、[可換アンサンブルの等号命題](#prop-qinf21-commuting)が成立する理由も確認できました。

**4. 二経路の比較。** 経路Aの[Helstrom測定](../QINF10/index.md#thm-qinf10-helstrom)では誤り確率 $e$ の二値対称通信路を得るため、出力は一様で

$$
I(X:Y)_{A,\mathrm{Helstrom}}=1-h_2(e)=0.399124\ldots.
$$

数値を並べると

$$
I(X:Y)_B=\chi_B=0.311278\ldots
<I(X:Y)_{A,\mathrm{Helstrom}}=0.399124\ldots
<\chi_A=0.600876\ldots.
$$

[Holevo情報のチャネル単調性](#prop-qinf21-channel)から $\chi_B\le\chi_A$ であり、この例では厳密です。ただしHelstrom測定の最適性は最小誤りに関するものです。[可アクセス情報量](#def-qinf21-accessible)の最適化については、ここで比較した測定だけから厳密な最大値を主張していません。$\square$
<!-- solution-end -->

## 9. まとめと次の問い

- [有限アンサンブル](#def-qinf21-ensemble)から[古典量子状態](#def-qinf21-cq-state)を構成すると、[ブロック固有値の計算](#lem-qinf21-cq-entropy)により $\chi(\mathcal E)=I(X:Q)$ と分かります。
- [Holevo界](#thm-qinf21-holevo-bound)は、任意の有限POVMによる測定後の古典相互情報量が測定前の $\chi$ を超えないという主張です。測定をCPTP写像として構成し、[データ処理](../QINF20/index.md#cor-qinf20-mutual-dpi)で証明しました。
- [可換アンサンブル](#prop-qinf21-commuting)では共通固有基底測定が上限を達成します。非直交二状態では測定ごとの値が異なり、最小誤り確率と相互情報量を混同できません。さらに[送信前の雑音](#prop-qinf21-channel)も $\chi$ を増やしません。

QINF22では「量子状態列をどう圧縮するか」、QINF23では「長い符号語による古典通信をどこまで達成できるか」へ進みます。Holevo界の一回測定の上限と、通信路容量の達成可能性は区別したまま接続します。
