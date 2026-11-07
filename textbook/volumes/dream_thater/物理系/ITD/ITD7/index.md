# ITD7 観測しない散逸はどこへ行くか：複数熱浴・粗視化・連続経路

[ITD6の全装置循環](../ITD6/index.md#thm-itd6-joint-balance)では、仕事と熱を漏れなく数えれば、周期的な装置から正の正味仕事を無償で取り出せないと分かりました。けれども、実験者が観測するのは系の状態だけで、「どの熱浴との間で遷移したか」を記録できないことがあります。観測記録でエントロピー生成が零でも、実物の熱浴では何かが起きているのでしょうか。

本章では**見えなくなった経路情報が第二法則の評価をどう変えるか**を中心の問いにします。まず遷移に熱浴のラベルを残した有限状態模型で収支を証明し、次にラベルを消した粗視化が不可逆性を過小評価することを有限和で証明します。最後に連続経路の熱の書き方を比較します。連続模型の一般的なゆらぎ定理や量子測定の理論を、有限模型の結果だけから証明したことにはしません。

共通規約は $k_{\mathrm B}>0$、自然対数、温度 $T_r>0$、$\beta_r=(k_{\mathrm B}T_r)^{-1}$ です。仕事 $W$ は系に**入る**向きを正、$Q_{\mathrm{bath}}^r$ は浴 $r$ **へ出る**熱を正にします。したがって浴から系へ入る熱は $-Q_{\mathrm{bath}}^r$ です。[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)と同じ符号で扱います。

## 1. 一つのジャンプに「どの浴か」を残す

二状態 $0,1$ のエネルギーを $E(0)=0$, $E(1)=\Delta>0$ とします。$0\to1$ は励起で、状態を上げるエネルギー $\Delta$ が浴から入ります。これは浴への熱で書けば $Q_{\mathrm{bath}}=-\Delta$ です。逆の $1\to0$ は $Q_{\mathrm{bath}}=+\Delta$ です。

複数浴がある場合、見かけ上同じ $0\to1$ でも、熱を渡した浴は異なり得ます。そこで状態 $x$ から $y$ へ浴 $r$ の作用で遷移する率を $k^r_{xy}\ge0$ とし、ジャンプに浴ラベルを添えます。

この率は、小さな $dt>0$ に対して、状態 $x$ にいるときに浴 $r$ による $x\to y$ が起こる条件付き確率の主要項が $k^r_{xy}dt$ となる係数です。全脱出率と、次のジャンプまでの待機時間 $S$ の分布は

$$
a_x=\sum_{y\ne x,r}k^r_{xy},\qquad
\Pr(S\ge s\mid X_t=x)=e^{-a_xs}\quad(s\ge0)
$$

で与えられます。浴ラベルを忘れて全遷移率

$$
k_{xy}=\sum_r k^r_{xy}
$$

だけを記録すると、どの浴が熱を渡したかは失われます。

[ITD1の局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)は離散的な接触確率の正逆比を浴熱に結び付ける条件でした。ここでは同じ条件を連続時間の**浴別ジャンプ率**に課します。短時間 $dt$ での正逆ジャンプ確率はそれぞれ $k^r_{xy}dt+o(dt)$、$k^r_{yx}dt+o(dt)$ なので、両率が正なら $dt\to0$ で確率の比は率の比へ収束します。浴別に条件を置くことが重要で、浴を合計した率 $k_{xy}$ に単一温度での釣合いを仮定するわけではありません。

<a id="def-itd7-labeled-jump"></a>

<!-- formal-statement-start -->
> **定義（浴ラベル付きジャンプ経路と浴熱）**
> 有限状態集合 $S$、固定エネルギー $E:S\to\mathbb R$、有限個の熱浴 $r\in\mathcal R$ を取る。時刻に依存しない連続時間Markovジャンプ過程で、$x\ne y$ の遷移は浴 $r$ ごとの率 $k^r_{xy}\ge0$ を持つとする。正率の遷移には逆向きも正率で存在し、各浴について局所詳細釣合い

$$
\log\frac{k^r_{xy}}{k^r_{yx}}=\beta_r\{E(x)-E(y)\}
$$

> を仮定する。有限時間 $[0,\tau]$ 内の経路 $\gamma=(x_0;t_1,r_1,x_1;\ldots;t_n,r_n,x_n)$ の浴熱を

$$
Q_{\mathrm{bath}}^r[\gamma]
=\sum_{j:r_j=r}\{E(x_{j-1})-E(x_j)\}
$$

> と定める。$t_1<\cdots<t_n$ はジャンプ時刻、$x_j$ は直後の状態である。固定エネルギーで外から仕事をしないとき、$\Delta E=-\sum_r Q_{\mathrm{bath}}^r$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd7-labeled-jump -->
### 直接例：どの浴が加熱したか

$0\xrightarrow{h}1\xrightarrow{c}0$ を考えます。最初のジャンプでは熱浴 $h$ のエネルギーが $\Delta$ 減り、次で浴 $c$ のエネルギーが $\Delta$ 増えます。定義の和に代入すれば

$$
Q_{\mathrm{bath}}^h=-\Delta,\qquad
Q_{\mathrm{bath}}^c=+\Delta,\qquad
\Delta E=0.
$$

系だけを観測した $0\to1\to0$ という経路では、二つの浴のどちらが熱を出し入れしたか確定できません。ここに観測の限界があります。

**定義の確認**：遷移率も具体的に確認します。任意の $c_r>0$ に対して $k^r_{01}=c_r e^{-\beta_r\Delta/2}$、$k^r_{10}=c_r e^{+\beta_r\Delta/2}$ とすれば、両率は正で逆向きが存在し、$k^r_{01}/k^r_{10}=e^{-\beta_r\Delta}$ です。従って $0\to1$ の $E(0)-E(1)=-\Delta$ を代入した局所詳細釣合いを満たします。
<!-- definition-example-end -->

## 2. 浴を分けた経路の第二法則

[ITD2の正逆経路比](../ITD2/index.md#def-itd2-reverse-ratio)は、経路を逆に読む際に**初期分布も逆実験用に取り直す**必要があることを教えます。ここでは計算を追えるよう、駆動のない時間一様な連続時間ジャンプ過程に限定します。時刻依存の操作を導入する場合は逆プロトコルも別に指定しなければなりません。

時刻0の分布 $p_0$ は全状態で正とし、時刻 $\tau$ の分布を $p_\tau$ とします。逆実験では同じ遷移率を使い、初期分布だけ $p_\tau$ にします。各経路の時間順とジャンプ向きを逆にしたものを $\gamma^\dagger$ と書きます。

<a id="thm-itd7-multibath-path-ratio"></a>

<!-- formal-statement-start -->
> **定理（複数熱浴の経路比と平均エントロピー生成）**
> [浴ラベル付きジャンプ過程](#def-itd7-labeled-jump)で有限の率、$\tau<\infty$、全状態で $p_0(x)>0$ を仮定する。正方向の経路測度を $P_F$、初期分布 $p_\tau$ と同じ率による逆実験の経路測度を $P_R$ とする。このとき対応する正率経路について

$$
\begin{aligned}
\sigma[\gamma]
&=\log\frac{P_F[\gamma]}{P_R[\gamma^\dagger]}\\
&=\log\frac{p_0(x_0)}{p_\tau(x_n)}
  +\sum_r\beta_r Q_{\mathrm{bath}}^r[\gamma].
\end{aligned}
$$

> また、指数平均と平均エントロピー生成は

$$
\left\langle e^{-\sigma}\right\rangle_F=1,
\qquad
\langle\sigma\rangle_F
=H(p_\tau)-H(p_0)+\sum_r\beta_r\langle Q_{\mathrm{bath}}^r\rangle\ge0.
$$

> ここで $H(p)=-\sum_xp(x)\log p(x)$ はnat単位で、$P_R[\gamma^\dagger]$ は同じジャンプ数とジャンプ時刻に関する経路密度を表す。
<!-- formal-statement-end -->

### 証明の見取り図

経路密度には初期確率、各状態で待つ確率、各浴によるジャンプ率が掛かります。時間反転した経路では**待ち時間の指数因子が相殺**し、浴ラベルごとの率比だけが残ります。最後に[ITD2の積分型ゆらぎ関係](../ITD2/index.md#thm-itd2-ift)と同じ正規化を使います。

<!-- proof-start -->
### 証明

各状態の脱出率を $a_x=\sum_{y\ne x}\sum_r k^r_{xy}$ と置き、$t_0=0$, $t_{n+1}=\tau$ とします。ジャンプ時刻とラベルに関する正方向経路密度は

$$
P_F[\gamma]=p_0(x_0)
\left\{\prod_{j=0}^{n}e^{-a_{x_j}(t_{j+1}-t_j)}\right\}
\left\{\prod_{j=1}^{n}k^{r_j}_{x_{j-1}x_j}\right\}.
$$

逆経路は各状態に同じ長さだけ滞在し、遷移 $x_j\to x_{j-1}$ を逆順に通るため、指数の積は変わりません。したがって

$$
\frac{P_F[\gamma]}{P_R[\gamma^\dagger]}
=\frac{p_0(x_0)}{p_\tau(x_n)}
  \prod_{j=1}^n\frac{k^{r_j}_{x_{j-1}x_j}}{k^{r_j}_{x_jx_{j-1}}}.
$$

対数を取って[局所詳細釣合い](#def-itd7-labeled-jump)を代入すると定理の第一式が得られます。まず任意の $x$ について、初期状態 $x$ からジャンプせずに時刻 $\tau$ に至る事象の確率は $p_0(x)e^{-a_x\tau}$ なので、

$$
p_\tau(x)\ge p_0(x)e^{-a_x\tau}>0.
$$

さらに各浴の正率ジャンプには同じ浴の正率逆ジャンプが存在します。正方向と逆方向の経路密度は、初期分布の正値性、終端分布の上の正値性、ジャンプ率の双方向支持により、時間反転で対応させると同じ支持を持ちます。従って密度比を積分して

$$
\begin{aligned}
\langle e^{-\sigma}\rangle_F
&=\int_{P_F>0}P_F(d\gamma)
  \frac{P_R(d\gamma^\dagger)}{P_F(d\gamma)}\\
&=\int P_R(d\gamma^\dagger)=1.
\end{aligned}
$$

最初と最後の対数の平均は、$x_0\sim p_0$, $x_n\sim p_\tau$ より

$$
\left\langle\log\frac{p_0(x_0)}{p_\tau(x_n)}\right\rangle
=\sum_xp_0(x)\log p_0(x)-\sum_xp_\tau(x)\log p_\tau(x)
=H(p_\tau)-H(p_0).
$$

最後に正規化した指数平均へ Jensen の不等式を用い、$e^{-\langle\sigma\rangle}\le\langle e^{-\sigma}\rangle=1$ だから $\langle\sigma\rangle\ge0$ です。
<!-- proof-end -->

**どこまで一般化できたか。** 単一浴の $\beta Q_{\mathrm{bath}}$ を $\sum_r\beta_r Q_{\mathrm{bath}}^r$ に置き換えました。温度が違う浴の熱を合計して一つの「有効温度」で割ることは、この定理からは導けません。ゼロ確率の初期状態があると、[ITD2の支持欠損の補正](../ITD2/index.md#prop-itd2-support-correction)と同様に、正逆の支持を改めて調べる必要があります。

## 3. 状態は定常でも熱は流れ続ける

二状態 $E(1)-E(0)=\Delta>0$ に、熱い浴 $h$ と冷たい浴 $c$ がそれぞれ接する模型を考えます。$\beta_h<\beta_c$ とし、各浴の励起率と緩和率を

$$
a_r=k^r_{01}=c_r e^{-\beta_r\Delta/2},\qquad
b_r=k^r_{10}=c_r e^{\beta_r\Delta/2},\qquad c_r>0
$$

と取れば $\log(a_r/b_r)=-\beta_r\Delta$ で、上の局所詳細釣合いが直接確認できます。合計率を $a=a_h+a_c$, $b=b_h+b_c$ とします。

<a id="prop-itd7-two-bath-current"></a>

<!-- formal-statement-start -->
> **命題（二状態・二熱浴の定常熱流と正の散逸）**
> 上記 $\Delta>0$、$c_h,c_c>0$、$0<\beta_h<\beta_c$ の二状態ジャンプ過程には定常分布

$$
\pi_0=\frac{b}{a+b},\qquad \pi_1=\frac{a}{a+b}
$$

> があり、熱浴 $h$ から系へ単位時間に流れる励起の正味流束は

$$
J_h=\pi_0a_h-\pi_1b_h
=\frac{a_hb_c-a_cb_h}{a+b}>0.
$$

> 浴 $c$ の流束は $J_c=-J_h$ で、系の平均エネルギーは定常である。両浴の平均エントロピー生成率は

$$
\dot\Sigma=(\beta_c-\beta_h)\Delta J_h>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

状態確率の流入と流出を釣り合わせても、浴ごとの流束をゼロにする必要はありません。熱い浴の励起と冷たい浴の緩和が組になると、系が定常のまま熱が移ります。

<!-- proof-start -->
### 証明

短時間 $dt$ の状態1への流入は $p_0(t)a\,dt+o(dt)$、状態1からの流出は $p_1(t)b\,dt+o(dt)$ です。差を $dt$ で割り $dt\to0$ とすると master 方程式 $\dot p_1=ap_0-bp_1$ を得ます。$p_0+p_1=1$ と合わせ、定常条件 $a\pi_0=b\pi_1$ を解いて提示した分布を得ます。浴別に分けて

$$
\begin{aligned}
J_h&=\frac{ba_h-ab_h}{a+b}
=\frac{(b_h+b_c)a_h-(a_h+a_c)b_h}{a+b}\\
&=\frac{a_hb_c-a_cb_h}{a+b},\qquad
J_c=\frac{ba_c-ab_c}{a+b}=-J_h.
\end{aligned}
$$

率の形から $a_hb_c/a_cb_h=e^{(\beta_c-\beta_h)\Delta}>1$ です。従って $J_h>0$。各浴の放熱は単位時間あたり $-\Delta J_r$ なので、[複数浴のエントロピー生成式](#thm-itd7-multibath-path-ratio)に定常の $\dot H=0$ を代入すると

$$
\dot\Sigma
=\beta_h(-\Delta J_h)+\beta_c(-\Delta J_c)
=(\beta_c-\beta_h)\Delta J_h>0.
$$

平均エネルギーの変化も $\Delta(J_h+J_c)=0$ です。
<!-- proof-end -->

観測者が浴ラベルを捨てると、二状態の全率 $a,b$ と定常確率 $\pi$ しか見えません。この観測過程は $\pi_0a=\pi_1b$ を満たすため、状態の正味流束は零です。**系の状態だけから推定した定常の不可逆性が零でも、浴間の熱伝導は存在する**という例になりました。

## 4. 観測を粗くすると、平均不可逆性は増えない

経路を区別していたラベルや中間状態を消す操作を考えます。まず確率論として厳密に証明するため、有限集合 $\Omega$ を完全な経路記録の集合とし、正逆の経路を同じ向きへ対応させた確率分布を $P(\omega)>0$、$R(\omega)>0$ とします。[ITD2の経路エントロピー生成](../ITD2/index.md#def-itd2-reverse-ratio)の平均は相対エントロピー $D(P\|R)$ です。ここで対数の底は自然対数です。

観測者は写像 $C:\Omega\to Y$ で完全記録を短い記録 $y=C(\omega)$ に変えます。例えば $C$ は浴ラベルを忘れて、状態列だけを残します。観測の分布は $\bar P(y)=\sum_{C(\omega)=y}P(\omega)$、$\bar R(y)$ も同様です。

<a id="def-itd7-coarse-observation"></a>

<!-- formal-statement-start -->
> **定義（粗視化された経路と隠れたエントロピー生成）**
> 正の確率分布 $P,R$ を持つ有限集合 $\Omega$ と観測写像 $C:\Omega\to Y$ に対し、観測された平均エントロピー生成を $\bar\Sigma=D(\bar P\|\bar R)$、完全な平均を $\Sigma=D(P\|R)$ とする。差

$$
\Sigma_{\mathrm{hidden}}=\Sigma-\bar\Sigma
$$

> を、観測で失った経路情報に対応する**隠れたエントロピー生成**とする。$R$ は逆実験の経路を時間反転で対応づけた確率分布である。時間反転と観測の順序が対応する場合に、$\bar R$ を観測過程の逆実験の分布と読める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd7-coarse-observation -->
### 直接例：区別できる四つの経路を二組に潰す

$\Omega=\{1,2,3,4\}$ に $P=(3,1,1,3)/8$, $R=(1,3,3,1)/8$ を与え、$C(1)=C(2)=A$, $C(3)=C(4)=B$ とします。どちらの分布でも二組の合計は $1/2$ で、$\bar P=\bar R=(1/2,1/2)$ です。従って観測上は $\bar\Sigma=0$ です。しかし完全記録では

$$
D(P\|R)=2\left\{\frac38\log3+\frac18\log\frac13\right\}
=\frac12\log3>0.
$$

**定義の確認**：両分布の四成分はすべて正で和は1、$C$ は各経路を必ず $A$ または $B$ へ写すので、粗視化の定義条件を満たします。隠れた量はすべて $\Sigma_{\mathrm{hidden}}=\tfrac12\log3$ に入ります。
<!-- definition-example-end -->

<a id="thm-itd7-coarse-kl-chain"></a>

<!-- formal-statement-start -->
> **定理（有限経路の相対エントロピー分解と粗視化下限）**
> [有限経路の粗視化](#def-itd7-coarse-observation)の仮定の下で、$\bar P(y)>0$ の各 $y$ について条件付き確率を $P(\omega\mid y)=P(\omega)/\bar P(y)$（$C(\omega)=y$）と定め、$R(\omega\mid y)$ も同様に定める。このとき

$$
D(P\|R)
=D(\bar P\|\bar R)
+\sum_y\bar P(y)D\bigl(P(\cdot\mid y)\|R(\cdot\mid y)\bigr).
$$

> 特に $0\le\bar\Sigma\le\Sigma$ であり、等号 $\bar\Sigma=\Sigma$ が成立する必要十分条件は、$\bar P(y)>0$ のすべての組で $P(\cdot\mid y)=R(\cdot\mid y)$ となることである。
<!-- formal-statement-end -->

### 証明の見取り図

一つの完全記録の確率を「どの観測組か」と「その組の中のどの完全記録か」に分解します。対数を足し算へ変え、観測組ごとに和を取るだけです。残る条件付き相対エントロピーの非負性が、見えない散逸を評価します。

<!-- proof-start -->
### 証明

$C(\omega)=y$ のとき $P(\omega)=\bar P(y)P(\omega\mid y)$、$R(\omega)=\bar R(y)R(\omega\mid y)$ です。全て正なので

$$
\log\frac{P(\omega)}{R(\omega)}
=\log\frac{\bar P(y)}{\bar R(y)}
+\log\frac{P(\omega\mid y)}{R(\omega\mid y)}.
$$

両辺に $P(\omega)$ を掛け、最初の項では $\sum_{C(\omega)=y}P(\omega)=\bar P(y)$、次の項では $P(\omega)=\bar P(y)P(\omega\mid y)$ を用いると

$$
\begin{aligned}
D(P\|R)
&=\sum_y\bar P(y)\log\frac{\bar P(y)}{\bar R(y)}\\
&\quad+\sum_y\bar P(y)\sum_{C(\omega)=y}P(\omega\mid y)
\log\frac{P(\omega\mid y)}{R(\omega\mid y)}.
\end{aligned}
$$

これが分解式です。[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)を各組の条件付き分布に適用すると、残りの項はすべて非負です。また正の分布に対して $D(p\|q)=0$ は $p=q$ と同値なので、等号条件も得られます。
<!-- proof-end -->

**観測が何を保証するか。** 観測した $\bar\Sigma$ は、完全な経路の平均エントロピー生成の**下限**です。粗視化が零を返しても、元の値が零だとは言えません。特に二浴の二状態模型では、浴ラベルを忘れた定常状態列の正逆分布は一致しますが、[浴ごとの熱流](#prop-itd7-two-bath-current)に対応する散逸は正です。

ただし上の等式は有限の完全記録集合の命題です。連続時間経路全体は有限集合ではありません。連続経路にそのまま適用したい場合は、経路測度の絶対連続性・条件付き分布の存在などを別に確認し、極限の交換を正当化しなければなりません。

## 5. 連続経路で熱を定義するときの落とし穴

連続状態の典型として、位置 $X_t\in\mathbb R$ を熱浴中で動かす過減衰Langevin模型を考えます。$B_t$ は[STO4で構成した標準Brown運動](../../../解析系/STO/STO4/index.md#thm-sto4-brownian-construction)、移動度 $\mu>0$、$D=\mu k_{\mathrm B}T$、滑らかなポテンシャル $U(x,\lambda)$ を用い、伊藤型確率微分方程式

$$
dX_t=-\mu\,\partial_xU(X_t,\lambda_t)\,dt
+\sqrt{2D}\,dB_t
$$

でモデル化します。$\lambda_t$ は有限変動の $C^1$ 外部制御、$U$ は $(x,\lambda)$ の両変数に関して $C^3$ とし、解と下の積分が存在する成長条件を仮定します。これは後で引用する[STO7の連鎖律](../../../解析系/STO/STO7/index.md#thm-sto7-stratonovich-composition)と[共変分の連鎖律](../../../解析系/STO/STO7/index.md#lem-sto7-covariation-composition)を直接適用できる十分な正則性です。

$\partial_xU$ は $\lambda$ を固定して位置 $x$ で微分し、$\partial_\lambda U$ は $x$ を固定して制御値 $\lambda$ で微分します。$\dot\lambda_t=d\lambda_t/dt$ は制御の時間微分であり、$X_t$ の時間微分ではありません。

一方、連続経路 $X_t$ はBrown運動のため通常は微分可能ではありません。単に $\partial_xU\,\dot X_t\,dt$ と書いただけでは積分の意味が一意に決まりません。

熱と仕事を**軌道のエネルギー差と整合するように**定めるには、位置の経路積分を[STO7のStratonovich積分](../../../解析系/STO/STO7/index.md#def-sto7-stratonovich-integral)（$\circ dX_t$）で扱います。

<a id="def-itd7-langevin-heat"></a>

<!-- formal-statement-start -->
> **定義（過減衰Langevin経路の仕事と浴への熱）**
> 上記の一温度・一定移動度の過減衰模型で、時区間 $[0,\tau]$ における外部仕事と浴への熱を

$$
W=\int_0^\tau\partial_\lambda U(X_t,\lambda_t)\,\dot\lambda_t\,dt,
\qquad
Q_{\mathrm{bath}}=-\int_0^\tau\partial_xU(X_t,\lambda_t)\circ dX_t
$$

> と定める。Stratonovich積分は位置の通常の連鎖律が成り立つ取り方であり、伊藤積分と区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd7-langevin-heat -->
### 直接例：固定ばねの位置が動いたとき

$U(x)=\kappa x^2/2$、$\kappa>0$ とすれば外部操作がないので $W=0$ です。[定義](#def-itd7-langevin-heat)に $\partial_xU=\kappa X_t$ を入れ、[STO7のStratonovich連鎖律](../../../解析系/STO/STO7/index.md#thm-sto7-stratonovich-composition)を用いると

$$
Q_{\mathrm{bath}}=-\int_0^\tau\kappa X_t\circ dX_t
=-\frac\kappa2(X_\tau^2-X_0^2).
$$

**定義の確認**：この二次ポテンシャル $U$ は $C^3$、$\kappa>0$、外部パラメータ変更がないため $W=0$ です。系のエネルギー変化は $\Delta U=\kappa(X_\tau^2-X_0^2)/2$ ですから、定義による第一法則 $\Delta U=W-Q_{\mathrm{bath}}$ を各経路で確認できました。
<!-- definition-example-end -->

<a id="prop-itd7-stratonovich-balance"></a>

<!-- formal-statement-start -->
> **命題（連続経路の第一法則と伊藤補正）**
> $\mu,T>0$、$D=\mu k_{\mathrm B}T$、$\lambda\in C^1([0,\tau])$、$U\in C^3(\mathbb R^2)$ とし、次の過減衰模型の解および必要な積分が存在するとする。

$$
dX_t=-\mu\partial_xU(X_t,\lambda_t)\,dt+\sqrt{2D}\,dB_t.
$$

> [過減衰Langevin経路の仕事と浴への熱](#def-itd7-langevin-heat)を用いると、ほとんど確実に

$$
U(X_\tau,\lambda_\tau)-U(X_0,\lambda_0)=W-Q_{\mathrm{bath}}.
$$

> また位置積分を伊藤積分へ直すと

$$
\int_0^\tau\partial_xU(X_t,\lambda_t)\circ dX_t
=\int_0^\tau\partial_xU(X_t,\lambda_t)\,dX_t
+D\int_0^\tau\partial_{xx}U(X_t,\lambda_t)\,dt.
$$
<!-- formal-statement-end -->

### 証明の見取り図

仕事は外部パラメータによる変化、熱は位置変化による変化です。連続経路ではStratonovich連鎖律で二つを分けます。伊藤積分へ移すときは、Brown運動による二次変動 $d[X]_t=2D\,dt$ の半分を補います。

<!-- proof-start -->
### 証明

$U$ へ[STO7のStratonovich連鎖律](../../../解析系/STO/STO7/index.md#thm-sto7-stratonovich-composition)を、位置と制御パラメータの組 $(X_t,\lambda_t)$ に適用し、$t=0$ から $\tau$ まで積分すると

$$
\begin{aligned}
U(X_\tau,\lambda_\tau)-U(X_0,\lambda_0)
&=\int_0^\tau\partial_xU(X_t,\lambda_t)\circ dX_t\\
&\quad+\int_0^\tau\partial_\lambda U(X_t,\lambda_t)\dot\lambda_t\,dt\\
&=-Q_{\mathrm{bath}}+W.
\end{aligned}
$$

次に $X_t$ の拡散係数は $\sqrt{2D}$ なので二次変動は $[X]_t=2Dt$ です。$\lambda_t$ は有限変動で $[\lambda,X]=0$、$U\in C^3$ ですから、[STO7の共変分の連鎖律](../../../解析系/STO/STO7/index.md#lem-sto7-covariation-composition)を $f(x,\lambda)=\partial_xU(x,\lambda)$ と $(X_t,\lambda_t)$ に適用して

$$
[\partial_xU(X,\lambda),X]_\tau
=\int_0^\tau\partial_{xx}U(X_t,\lambda_t)\,d[X]_t
=2D\int_0^\tau\partial_{xx}U(X_t,\lambda_t)\,dt
$$

を得ます。この共変分を[STO7の伊藤・Stratonovich変換公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)へ代入すると

$$
\begin{aligned}
\int_0^\tau f_t(X_t)\circ dX_t
&=\int_0^\tau f_t(X_t)\,dX_t
+\frac12\int_0^\tau\partial_x f_t(X_t)\,d[X]_t\\
&=\int_0^\tau\partial_xU(X_t,\lambda_t)\,dX_t
+D\int_0^\tau\partial_{xx}U(X_t,\lambda_t)\,dt.
\end{aligned}
$$

$\lambda_t$ は有限変動なので、$X_t$ との二次共変動による追加項はありません。
<!-- proof-end -->

固定ばねでは $\partial_{xx}U=\kappa$ だから、伊藤積分だけを浴熱の定義と誤認すると、$D\kappa\tau$ だけずれます。これは熱力学の符号の流儀の違いではなく、**確率積分の定義の違い**です。拡散過程の経路確率比や測定フィードバックの一般化には、さらに逆過程、確率密度と支持、境界条件等の検証が必要です。

## 6. どの結果を次の模型へ持ち越せるか

| 対象 | この章で確かめたこと | 追加で確かめる必要があること |
| --- | --- | --- |
| 複数熱浴の有限ジャンプ | 浴ラベル付き経路比と $\sum_r\beta_rQ_{\mathrm{bath}}^r$ | 時間依存駆動・化学仕事・支持欠損 |
| 状態だけの粗視化 | 有限経路で $D(\bar P\|\bar R)\le D(P\|R)$ | 連続時間経路測度への拡張、観測と時間反転の整合 |
| 連続状態Langevin | Stratonovich熱と各経路の第一法則 | 確率微分方程式の存在、経路測度比、境界処理 |
| 量子測定・量子熱力学 | 古典測定との仮定の違いを識別する入口 | 測定の反作用、量子チャネル、非可換演算 |

次の演習では、単に公式へ代入するだけでなく、どの情報を観測から消したか、どの仮定を変えると定理が使えないかを再構成します。

## 7. 演習：見える記録と浴の収支を区別する

以下では指定がなければ $\log$ は自然対数、$Q_{\mathrm{bath}}^r$ は浴への放熱を正、$\Delta>0$、$\beta_r>0$ とします。平均エントロピー生成の単位はnatです。

### Level A：符号・率・分布を手で確かめる

#### A1. 浴ラベルを持つ三ジャンプ

$E(0)=0$, $E(1)=\Delta$ とする。$0\xrightarrow{h}1\xrightarrow{c}0\xrightarrow{h}1$ について $Q_{\mathrm{bath}}^h$, $Q_{\mathrm{bath}}^c$、系のエネルギー変化を求めよ。外部仕事はない。

- Level: A
- ID: ITD7-A1

<!-- solution-start -->
**詳細解答**

各遷移での浴への熱は $E(x_{\mathrm{before}})-E(x_{\mathrm{after}})$ です。第1、3ジャンプは $h$ の励起でそれぞれ $-\Delta$、第2ジャンプは $c$ への緩和で $+\Delta$ です。従って

$$
Q_{\mathrm{bath}}^h=-2\Delta,\qquad
Q_{\mathrm{bath}}^c=+\Delta,\qquad
\Delta E=E(1)-E(0)=\Delta.
$$

第一法則は $\Delta E=0-(Q_{\mathrm{bath}}^h+Q_{\mathrm{bath}}^c)=\Delta$ と一致します。浴の熱を単純に足すだけでは、どの温度でエントロピーが変化したかを確定できません。
<!-- solution-end -->

#### A2. 手で解ける二浴の定常確率

$\Delta=1$ とし、$a_h=1$, $b_h=2$, $a_c=1$, $b_c=4$（単位は毎秒）とする。$\beta_h$, $\beta_c$ と定常分布、$J_h$, $J_c$ を求めよ。

- Level: A
- ID: ITD7-A2

<!-- solution-start -->
**詳細解答**

局所詳細釣合いは $\log(a_r/b_r)=-\beta_r\Delta$ なので $\beta_h=\log2$, $\beta_c=\log4$（$\Delta=1$ のエネルギー単位での逆温度）です。全率は $a=2$, $b=6$。従って[二浴定常流の命題](#prop-itd7-two-bath-current)の定常条件 $\pi_0a=\pi_1b$ より

$$
\pi_0=\frac68=\frac34,\quad
\pi_1=\frac28=\frac14.
$$

熱い浴の流束は $J_h=\frac34\cdot1-\frac14\cdot2=\frac14$ 毎秒です。冷たい浴では $J_c=\frac34\cdot1-\frac14\cdot4=-\frac14$ 毎秒となり、合計流束は零です。
<!-- solution-end -->

#### A3. 状態が定常なときの熱とエントロピー

A2の過程で、各浴への平均放熱率と全エントロピー生成率を求めよ。系の平均エネルギー・Shannonエントロピーは定常とする。

- Level: A
- ID: ITD7-A3

<!-- solution-start -->
**詳細解答**

浴 $r$ から系へ単位時間に入る正味エネルギーは励起の正味流束 $\Delta J_r$ であるため、浴への放熱率はその負号です。A2の $\Delta=1$, $J_h=1/4$, $J_c=-1/4$ より

$$
\dot Q_{\mathrm{bath}}^h=-\frac14,\qquad
\dot Q_{\mathrm{bath}}^c=+\frac14.
$$

$\dot H=0$ なので[複数浴のエントロピー生成式](#thm-itd7-multibath-path-ratio)を時間で割り、

$$
\dot\Sigma=(\log2)\left(-\frac14\right)
+(\log4)\left(\frac14\right)
=\frac14\log2>0
$$

を得ます。熱の総和は零でも、温度の違う浴を通して熱が移るのでエントロピー生成は正です。
<!-- solution-end -->

#### A4. 四つの経路の粗視化

$P=(3,1,1,3)/8$, $R=(1,3,3,1)/8$ とし、$\{1,2\}$ を $A$、$\{3,4\}$ を $B$ に写す。$\bar P$, $\bar R$, $D(P\|R)$、隠れたエントロピー生成を求めよ。

- Level: A
- ID: ITD7-A4

<!-- solution-start -->
**詳細解答**

二つの組の確率は両分布で $(3+1)/8=(1+3)/8=1/2$ なので $\bar P=\bar R=(1/2,1/2)$ で、$D(\bar P\|\bar R)=0$。完全な記録では

$$
\begin{aligned}
D(P\|R)
&=\frac38\log3+\frac18\log\frac13
+\frac18\log\frac13+\frac38\log3\\
&=\left(\frac68-\frac28\right)\log3
=\frac12\log3.
\end{aligned}
$$

従って[隠れた量の定義](#def-itd7-coarse-observation)より $\Sigma_{\mathrm{hidden}}=\frac12\log3$。観測分布が同じでも完全な分布の差は消えません。
<!-- solution-end -->

#### A5. ばねの熱を伊藤積分で計算する

$dX_t=-\mu\kappa X_t\,dt+\sqrt{2D}\,dB_t$、$D>0$、$\kappa>0$、$U(x)=\kappa x^2/2$ とする。$\int_0^\tau\kappa X_t\circ dX_t$ と伊藤積分との差を求め、$Q_{\mathrm{bath}}$ を両表記で書け。

- Level: A
- ID: ITD7-A5

<!-- solution-start -->
**詳細解答**

[伊藤補正の命題](#prop-itd7-stratonovich-balance)へ $\partial_xU=\kappa X_t$, $\partial_{xx}U=\kappa$ を代入すると

$$
\int_0^\tau\kappa X_t\circ dX_t
=\int_0^\tau\kappa X_t\,dX_t+D\kappa\tau.
$$

Stratonovich連鎖律では左辺は $\kappa(X_\tau^2-X_0^2)/2$ です。従って浴への熱は

$$
Q_{\mathrm{bath}}
=-\frac\kappa2(X_\tau^2-X_0^2)
=-\int_0^\tau\kappa X_t\,dX_t-D\kappa\tau.
$$

伊藤積分の符号を変えるだけでは補正が欠けます。
<!-- solution-end -->

### Level B：仮定と証明を再構成する

#### B1. 二ジャンプの経路比を出発点から

$0\xrightarrow{h}1\xrightarrow{c}0$ という二ジャンプ経路の経路密度を正逆で書き、$\sigma$ を求めよ。初期・終期の分布は $p_0,p_\tau$ で $p_0(0),p_\tau(0)>0$、両浴の対応する正逆ジャンプ率は正とする。両端状態は0とし、待機時間をそれぞれ $s_0,s_1,s_2$（和 $\tau$）とする。

- Level: B
- ID: ITD7-B1

<!-- solution-start -->
**詳細解答**

全脱出率を $a_0,a_1$ とすると、正方向の密度は

$$
P_F=p_0(0)e^{-a_0s_0}k^h_{01}e^{-a_1s_1}
k^c_{10}e^{-a_0s_2}.
$$

逆方向は $0\xrightarrow{c}1\xrightarrow{h}0$ で、対応する時間は $s_2,s_1,s_0$ です。従って

$$
P_R=p_\tau(0)e^{-a_0s_2}k^c_{01}e^{-a_1s_1}
k^h_{10}e^{-a_0s_0}.
$$

待機時間の指数因子を割り算で消すと

$$
\begin{aligned}
\sigma&=\log\frac{p_0(0)}{p_\tau(0)}
+\log\frac{k^h_{01}}{k^h_{10}}
+\log\frac{k^c_{10}}{k^c_{01}}\\
&=\log\frac{p_0(0)}{p_\tau(0)}
-\beta_h\Delta+\beta_c\Delta.
\end{aligned}
$$

系の始終エネルギーが同じでも、浴の温度差による経路比は残ります。
<!-- solution-end -->

#### B2. 浴ラベルを捨てたときの観測可能な経路比

$a=a_h+a_c$, $b=b_h+b_c$ が正の二状態Markov過程を定常分布から始める。浴ラベルを観測しない状態経路の正逆分布が等しいことを、経路密度の比から示せ。一方で $\beta_h<\beta_c$ の二浴模型では完全な平均エントロピー生成率が正である理由を述べよ。

- Level: B
- ID: ITD7-B2

<!-- solution-start -->
**詳細解答**

[二浴定常流の命題](#prop-itd7-two-bath-current)の定常条件 $\pi_0a=\pi_1b$ より、状態だけの各ジャンプ率比は $a/b=\pi_1/\pi_0$ です。状態経路の密度比で待機時間は相殺するので、$0\to1$ のたびに $a/b$、$1\to0$ のたびに $b/a$ を掛けます。どちらの向きでも $k_{xy}/k_{yx}=\pi_y/\pi_x$ だから、遷移率比の積は

$$
\prod_{j=1}^n\frac{k_{x_{j-1}x_j}}{k_{x_jx_{j-1}}}
=\prod_{j=1}^n\frac{\pi_{x_j}}{\pi_{x_{j-1}}}
=\frac{\pi_{x_n}}{\pi_{x_0}}.
$$

この望遠鏡積が初期分布比 $\pi_{x_0}/\pi_{x_n}$ と相殺するため、全状態経路で $P_F^{\mathrm{obs}}/P_R^{\mathrm{obs}}=1$、観測相対エントロピーは零です。

一方、完全経路はラベル付きの $k^r_{xy}$ を掛けるので率比が浴ごとに異なります。[二浴定常流](#prop-itd7-two-bath-current)では $J_h>0$、$J_c=-J_h$、温度差 $\beta_c-\beta_h>0$ なので $\dot\Sigma=(\beta_c-\beta_h)\Delta J_h>0$ です。観測の零は装置全体の可逆性を証明しません。
<!-- solution-end -->

#### B3. 条件付き分布から粗視化下限を再導出

正の有限分布 $P,R$ と写像 $C$ について、$P(\omega)=\bar P(y)P(\omega\mid y)$ を利用し、$D(P\|R)-D(\bar P\|\bar R)$ を求めよ。また等号成立条件を証明せよ。

- Level: B
- ID: ITD7-B3

<!-- solution-start -->
**詳細解答**

同じ観測値 $y=C(\omega)$ を持つ経路をまとめると

$$
\begin{aligned}
D(P\|R)-D(\bar P\|\bar R)
&=\sum_\omega P(\omega)
\log\frac{P(\omega\mid C(\omega))}{R(\omega\mid C(\omega))}\\
&=\sum_y\bar P(y)
\sum_{C(\omega)=y}P(\omega\mid y)
\log\frac{P(\omega\mid y)}{R(\omega\mid y)}.
\end{aligned}
$$

各内側の和は有限確率分布の相対エントロピーです。[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)によって非負で、零となるのは組内の条件付き分布が一致するとき、かつそのときに限ります。$\bar P(y)>0$ なので総和の等号は各組で一致することと同値です。
<!-- solution-end -->

#### B4. 見かけの支持が一致する反例

$\Omega=\{1,2\}$、$P=(1,0)$、$R=(0,1)$ とする。$C(1)=C(2)=A$ と観測する。粗視化前後での相対エントロピーと、積分型ゆらぎ関係を機械的に移せない理由を説明せよ。

- Level: B
- ID: ITD7-B4

<!-- solution-start -->
**詳細解答**

完全分布には $P(1)>0$ だが $R(1)=0$ の事象があるので、相対エントロピーの定義より $D(P\|R)=+\infty$ です。逆に観測上は両者とも $A$ の確率1を与えるから $D(\bar P\|\bar R)=0$ です。

完全経路の対数比は事象1で有限ではなく、[正逆経路比に基づく指数平均](../ITD2/index.md#thm-itd2-ift)を「支持が同じ」という仮定なしに通常の等式へ移すことはできません。$P$ の支持上だけで逆確率を積分すると逆測度の全質量1を回収できず、補正が必要です。観測上の支持一致は、完全経路での絶対連続性を保証しません。
<!-- solution-end -->

#### B5. 制御しているばねの第一法則

$U(x,\lambda)=\lambda x^2/2$、$\lambda_t>0$ は滑らかで、過減衰模型の解 $X_t$ が存在するとする。$W$, $Q_{\mathrm{bath}}$ を書き、伊藤積分への変換後も $\Delta U=W-Q_{\mathrm{bath}}$ が成り立つことを確かめよ。移動度 $\mu$、拡散係数 $D$ は一定とする。

- Level: B
- ID: ITD7-B5

<!-- solution-start -->
**詳細解答**

$\partial_\lambda U=X_t^2/2$、$\partial_xU=\lambda_tX_t$、$\partial_{xx}U=\lambda_t$ だから

$$
W=\frac12\int_0^\tau X_t^2\dot\lambda_t\,dt,
\qquad Q_{\mathrm{bath}}=-\int_0^\tau\lambda_tX_t\circ dX_t.
$$

[STO7のStratonovich連鎖律](../../../解析系/STO/STO7/index.md#thm-sto7-stratonovich-composition)により $d(\lambda_tX_t^2/2)=(X_t^2/2)d\lambda_t+\lambda_tX_t\circ dX_t$ です。積分すると $\Delta U=W-Q_{\mathrm{bath}}$。さらに[伊藤補正](#prop-itd7-stratonovich-balance)は $\partial_{xx}U=\lambda_t$ より

$$
Q_{\mathrm{bath}}=-\int_0^\tau\lambda_tX_t\,dX_t
-D\int_0^\tau\lambda_t\,dt.
$$

[STO7の時間依存伊藤公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $F(t,x)=\lambda_t x^2/2$ に適用しても

$$
\begin{aligned}
d\!\left(\frac{\lambda_tX_t^2}{2}\right)
&=\frac{X_t^2}{2}\dot\lambda_t\,dt
+\lambda_tX_t\,dX_t+\frac{\lambda_t}{2}d[X]_t\\
&=\frac{X_t^2}{2}\dot\lambda_t\,dt
+\lambda_tX_t\,dX_t+D\lambda_t\,dt,
\end{aligned}
$$

となり、右辺は $dW-dQ_{\mathrm{bath}}$ に一致します。
<!-- solution-end -->

### Level C：完全記録と観測記録の二重検算

#### C1. 熱浴の存在を忘れるとどうなるか

$E(0)=0$, $E(1)=1$、熱浴 $h,c$ の率を $a_h=1$, $b_h=2$, $a_c=1$, $b_c=4$ 毎秒とする。浴ごとに局所詳細釣合いを仮定し、定常状態から運転する。

1. 逆温度、定常確率、浴別流束、浴別放熱率を求め、エネルギー保存を確かめよ。
2. 状態だけを見たMarkov経路が正逆で区別できないことを示せ。
3. 完全経路の平均エントロピー生成率を浴の熱から計算し、同じ量を $J_h\log(a_hb_c/(b_ha_c))$ から再計算せよ。
4. 観測した生成率と完全な生成率が異なる原因、および両浴が同温度になった場合の変化を述べよ。

- Level: C
- ID: ITD7-C1

<!-- solution-start -->
**詳細解答**

1. $a_r/b_r=e^{-\beta_r}$ なので $\beta_h=\log2$, $\beta_c=\log4$。全率 $a=2$, $b=6$ から $\pi=(3/4,1/4)$ です。$J_h=\pi_0a_h-\pi_1b_h=3/4-2/4=1/4$、$J_c=3/4-4/4=-1/4$。浴への放熱率はそれぞれ $-J_h=-1/4$、$-J_c=+1/4$。総和が零なので $\dot U=0=-\sum_r\dot Q_{\mathrm{bath}}^r$ と一致します。
2. ラベルを忘れた系には $0\to1$ の率2、$1\to0$ の率6だけが残ります。定常状態では $\pi_0a=(3/4)2=3/2$、$\pi_1b=(1/4)6=3/2$。正逆経路密度の待機因子は同じで、各ジャンプの率比 $a/b=1/3$ または $b/a=3$ は始終の定常確率比に相殺されるため、観測経路の正逆比は1、観測の生成率は零です。
3. 浴熱からは $\dot\Sigma=(\log2)(-1/4)+(\log4)(1/4)=\frac14\log2$。独立な計算として $a_hb_c/(b_ha_c)=1\cdot4/(2\cdot1)=2$ を用いると、$J_h\log(a_hb_c/(b_ha_c))=(1/4)\log2$。二通りが一致します。
4. 観測で浴ラベル $h,c$ を消したため、熱い浴による励起と冷たい浴への緩和を区別できなくなりました。観測で得た0は[粗視化下限](#thm-itd7-coarse-kl-chain)の方向と整合します。同温度で各浴の率が同じ局所詳細釣合いを満たすなら $a_h/b_h=a_c/b_c$ となり、$a_hb_c=a_cb_h$、従って $J_h=0$。定常熱流と浴のエントロピー生成はともに零になります。この最後の結論は与えた具体的な数値率のまま温度だけ変更する意味ではなく、**率も同温度の局所詳細釣合いに合わせて変更する**場合です。
<!-- solution-end -->

## 8. 学習のまとめ

同じ「系が元に戻る」という現象でも、[全装置の循環](../ITD6/index.md#def-itd6-joint-cycle)を見ているのか、単に系の状態列だけを記録しているのかで判断が変わります。浴を区別して記録すれば、温度差による散逸は $\sum_r\beta_rQ_{\mathrm{bath}}^r$ に現れます。記録を粗くすると、その平均不可逆性は増えず、場合によっては正の散逸がすべて見えなくなります。

連続経路ではさらに、熱の積分の取り方を定義する必要があります。有限状態で証明した経路比、情報収支、全循環の第二法則を応用するには、**何を状態・浴・観測・逆実験として数えたか**をまず確定することが重要です。
