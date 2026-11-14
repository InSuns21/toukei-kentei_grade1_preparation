# U3-41 ジャンプ拡散と非完備市場

## この講義で問うこと

[前講の局所ボラティリティと確率ボラティリティ](../U3-40/index.md#def-u3-40-stochastic-vol)では、株価は連続に動きました。しかし企業の決算発表などで、連続な Brown 運動だけでは記述しにくい価格の急変を考えたくなります。そこで、連続な変動に**離散的な価格ジャンプ**を加えます。

新しい問いは三つです。(1) ジャンプを加えたとき、期待株価を正しい金利・配当と一致させるために何を補正するか。(2) ジャンプを含むオプション価格を期待値と積分微分方程式（PIDE）の両方でどう計算するか。(3) 株式と預金しか取引できないとき、どのリスクを複製できず、なぜ無裁定だけでは価格が一意にならないか。

時刻は年、株価・権利行使価格・オプション価格は円、$r,q,\lambda$ は年$^{-1}$、$\sigma$ は年$^{-1/2}$ とします。$T>0$, $s_0>0$, $r\in\mathbb R$, $q\ge0$, $\sigma\ge0$ を定数とし、配当利回り $q$ の株式と、$B_t=e^{rt}$ 円の預金のみ取引でき、摩擦と売買制限はないとします。$Q$ は[既習の同値マルチンゲール測度](../U3-15/index.md#def-u3-15-emm)のうち、今回の価格付けに採用した一つです。実確率 $P$ と無条件に同一視しません。

## 1. ジャンプをどの確率で何回起こすか

連続変動を表す [Brown 運動と SDE](../../../解析系/STO/STO9/index.md#def-sto9-sde)に加えて、ジャンプ回数 $N_t$ を数える過程を考えます。短時間 $h$ に1回起こる確率をおよそ $\lambda h$ とする定数 $\lambda>0$ が**ジャンプ強度**です。「起こる確率」と「起きたときに何倍になるか」は別の入力です。

<a id="def-u3-41-poisson"></a>

<!-- formal-statement-start -->
> **定義（Poisson ジャンプ回数過程）**  
> $N_0=0$、$N_t$ は非減少の整数値で、互いに交わらない時間区間の増分が独立、かつ $0\le s<t$ に対して各 $n=0,1,\ldots$ の確率が

$$
Q(N_t-N_s=n)=e^{-\lambda(t-s)}
\frac{\{\lambda(t-s)\}^{n}}{n!}
$$

> となる過程を、強度 $\lambda>0$ の Poisson 過程という。ジャンプ時には $N$ が1ずつ増えるものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-41-poisson -->
**定義の確認**：$\lambda=0.4$ 年$^{-1}$、期間 $T=1$ 年なら $Q(N_T=0)=e^{-0.4}$、$Q(N_T=1)=0.4e^{-0.4}$、$Q(N_T\ge2)=1-1.4e^{-0.4}$ です。確率は非負で、級数 $\sum_{n=0}^\infty0.4^n/n!=e^{0.4}$ により合計1です。別々の時間区間では、定義により増分を独立に生成します。
<!-- definition-example-end -->

短時間 $h$ では $e^{-\lambda h}=1-\lambda h+O(h^2)$、$\lambda h e^{-\lambda h}=\lambda h+O(h^2)$ なので、0回・1回・2回以上の確率は順に $1-\lambda h+O(h^2)$、$\lambda h+O(h^2)$、$O(h^2)$ です。

ジャンプごとの正の倍率を $Y_1,Y_2,\ldots$ とし、これらは互いに独立で同じ確率分布を持ち、$E_Q[Y_1]<\infty$、さらに Brown 運動 $W$ および $N$ とも独立であるとします。$\kappa=E_Q[Y_1-1]$ は**1回あたりの平均相対ジャンプ幅**です。たとえば $Y\equiv1.25$ ならジャンプのたびに株価は1.25倍になり、$\kappa=0.25$ です。

<a id="def-u3-41-jump-model"></a>

<!-- formal-statement-start -->
> **定義（独立印付き Poisson ジャンプ拡散モデル）**  
> $W$ を $Q$-Brown 運動、$N$ を強度 $\lambda>0$ の Poisson 過程、$Y_j>0$ を独立な倍率列とし、これらを互いに独立とする。情報はこれらの生成する通常のフィルトレーション $(\mathcal F_t)$ とし、$\kappa=E_Q[Y_1-1]$ が有限とする。$t\in[0,T]$ の株価を

$$
S_t=s_0\exp\left\{
\left(r-q-\lambda\kappa-\frac{\sigma^2}{2}\right)t
+\sigma W_t\right\}\prod_{j=1}^{N_t}Y_j
$$

> と定める。空積は1とする。これを本講のジャンプ拡散モデルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-41-jump-model -->
**定義の確認**：$s_0=100$ 円、$r=q=0$、$\lambda=0.2$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$Y_j\equiv1.5$ とすると $\kappa=0.5$ です。ジャンプのない区間では $S_t=100e^{-0.12t+0.2W_t}$、1回起きるとその瞬間に株価が1.5倍になります。倍率が正なので株価は正、同一経路のジャンプ直前と直後の比は $S_t/S_{t-}=1.5$ です。ジャンプ回数は Poisson、倍率は独立同分布（ここでは定数の退化分布）で、定義の各条件を満たしています。
<!-- definition-example-end -->

ジャンプ時刻の直前の値を $S_{t-}$ と書きます。$N$ が時刻 $t$ に1増えるとき、$\Delta S_t=S_t-S_{t-}=S_{t-}(Y_{N_t}-1)$ です。ジャンプ以外の時間では通常の [Itô 過程](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)として進みます。したがって上の明示式は、$b=r-q-\lambda\kappa$ とおけば、次の積分形にも書けます。

$$
S_t=s_0+\int_0^t bS_{u-}\,du
+\int_0^t\sigma S_{u-}\,dW_u
+\sum_{\tau_j\le t}S_{\tau_j-}(Y_j-1).
$$

最後はジャンプ時刻 $\tau_j$ での有限個の跳躍を足したもので、$dN$ を掛ける略記をしなくても意味が確定します。**同じ Brown 部分を持つ二経路の比**を見れば、0.5年に倍率1.5のジャンプが1回あった経路では、その直前まで比1、直後から比1.5です。連続な価格経路と違って瞬間的に段差ができます。

## 2. なぜドリフトから $\lambda\kappa$ を引くのか

株価が平均で上がることと、割引した**配当込み総収益**が評価用確率でマルチンゲールになることは、同じではありません。[連続配当の割引規約](../U3-19/index.md#thm-u3-19-bsm-dividend)を引き継ぎ、ジャンプによる平均増分を相殺します。

<a id="prop-u3-41-compensator"></a>

<!-- formal-statement-start -->
> **命題（Poisson 補償と割引総収益）**  
> [本講のジャンプ拡散モデル](#def-u3-41-jump-model)で $E_Q[Y_1]<\infty$ とする。$0\le t\le T$ に対して

$$
E_Q[S_t]=s_0e^{(r-q)t},
\qquad
E_Q[e^{-(r-q)t}S_t\mid\mathcal F_s]
=e^{-(r-q)s}S_s\quad(s\le t)
$$

> が成り立つ。株式の配当を加えた割引総収益の増分は

$$
d(e^{-rt}S_t)+qe^{-rt}S_{t-}\,dt
=e^{-rt}S_{t-}\sigma\,dW_t+
e^{-rt}S_{t-}\{(Y-1)\,dN_t-\lambda\kappa\,dt\}
$$

> と書ける。右辺の印付きジャンプ項は $\sum_{\tau_j\le t}(Y_j-1)$ の補償を意味し、平均増分がゼロである。
<!-- formal-statement-end -->

**証明の見取り図**：Brown の指数の期待値は1、独立な倍率の積の条件付き期待値は $(1+\kappa)^{N_t}$ です。Poisson の母関数でジャンプの期待を計算し、ドリフト補正と打ち消します。

<!-- proof-start -->
### 証明

$W_t\sim N(0,t)$ だから $E_Q[e^{\sigma W_t-\sigma^2t/2}]=1$。また $N_t=n$ の条件付きで倍率積の期待値は $(E_Q[Y_1])^n=(1+\kappa)^n$ です。したがって

$$
\begin{aligned}
E_Q\left[\prod_{j=1}^{N_t}Y_j\right]
&=\sum_{n=0}^\infty e^{-\lambda t}
\frac{(\lambda t)^n}{n!}(1+\kappa)^n\\
&=e^{-\lambda t}e^{\lambda t(1+\kappa)}
=e^{\lambda\kappa t}.
\end{aligned}
$$

独立性を使って株価の期待値は

$$
E_Q[S_t]=s_0e^{(r-q-\lambda\kappa)t}\cdot1\cdot
e^{\lambda\kappa t}=s_0e^{(r-q)t}.
$$

$s$ 時点までの情報を固定したとき、$(s,t]$ の Brown 増分・Poisson 増分・新しい印は過去と独立で、同じ期待値計算を期間 $t-s$ に適用できます。従って条件付き期待値の等式も成立します。

最後にジャンプのない区間で [Itô の積の公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $e^{-rt}S_t$ に適用すると $dt$ 係数は $(b-r)S_{t-}=(-q-\lambda\kappa)S_{t-}$。ジャンプ時刻には割引因子が連続なので $e^{-rt}S_{t-}(Y-1)$ を加えます。両辺に $qe^{-rt}S_{t-}dt$ を足すと表示式になります。区間 $(t,t+h]$ の印付きジャンプ和の条件付き平均は $\lambda h\kappa$ 倍の時点 $t$ の保有係数に対応し、これが補償項の理由です。
<!-- proof-end -->

たとえば $E[Y]=1.5$、$\lambda=0.2$ なら $\lambda\kappa=0.1$ 年$^{-1}$ です。金利・配当がゼロでも、ジャンプ以外の連続ドリフトを $-0.1$ だけ下げる必要があります。**ジャンプ確率をゼロにするのではありません。** 生じる平均上昇を連続部分で相殺します。

## 3. 価格付けは PDE から PIDE へ

[Black–Scholes PDE](../U3-16/index.md#thm-u3-16-bsm-necessity)では、短時間の株価変化は局所微分で扱えました。今は一回のジャンプで $s$ が $sY$ に飛ぶため、価格 $v(t,sY)$ を評価する**非局所項**が必要です。以降、満期支払 $g(S_T)$ は可積分で、指定した $Q$ で評価します。

<a id="prop-u3-41-pide"></a>

<!-- formal-statement-start -->
> **命題（ジャンプ拡散の価格 PIDE）**  
> [ジャンプ拡散モデル](#def-u3-41-jump-model)を考え、価格関数を

$
v(t,s)=E_Q[e^{-r(T-t)}g(S_T)\mid S_t=s]
$

> と定める。$t<T$、$s>0$ で $v$ は $C^{1,2}$ 級、満期で $g$ に接続し、以下の期待値・極限交換が正当化されるとする。すると

$$
\begin{aligned}
0={}&v_t+(r-q-\lambda\kappa)s v_s
+\frac{\sigma^2s^2}{2}v_{ss}-rv\\
&+\lambda E_Q[v(t,sY_1)-v(t,s)] ,
\qquad v(T,s)=g(s).
\end{aligned}
$$

> 同じ式は補償された形

$$
0=v_t+(r-q)s v_s+\frac{\sigma^2s^2}{2}v_{ss}
-rv+\lambda E_Q[v(t,sY_1)-v(t,s)-(Y_1-1)s v_s]
$$

> にも書ける。
<!-- formal-statement-end -->

**証明の見取り図**：時間幅 $h$ でジャンプが0回、1回、2回以上に分け、後者が $O(h^2)$ であることを使います。連続部分には [Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を適用し、1回ジャンプの寄与を加えます。

<!-- proof-start -->
### 証明

$S_t=s$ として $b=r-q-\lambda\kappa$ と置きます。区間 $(t,t+h]$ にジャンプがなければ、$S$ は $dS=bSdt+\sigma SdW$ に従い、Itô 公式と期待値を取る操作から

$$
E_Q[v(t+h,S_{t+h})\mid S_t=s,N_{t+h}-N_t=0]
=v(t,s)+h\left(v_t+bs v_s+
\frac12\sigma^2s^2v_{ss}\right)+o(h).
$$

一回ジャンプした場合は $Y$ が $s$ に掛かるので、条件付き期待値の主項は $E_Q[v(t,sY_1)]+o(1)$ です。二回以上の事象の寄与は、仮定した十分な成長・可積分性の下で $o(h)$ です。確率 $1-\lambda h+O(h^2)$、$\lambda h+O(h^2)$ を掛けると

$$
\begin{aligned}
E_Q[v(t+h,S_{t+h})\mid S_t=s]
={}&v(t,s)+h\left(v_t+bs v_s+
\frac12\sigma^2s^2v_{ss}\right)\\
&+\lambda h\{E_Q[v(t,sY_1)]-v(t,s)\}+o(h).
\end{aligned}
$$

[リスク中立期待値による評価](../U3-17/index.md#def-u3-17-valuation)と条件付き期待値の塔の性質より、$v(t,s)=e^{-rh}E_Q[v(t+h,S_{t+h})\mid S_t=s]$ です。$e^{-rh}=1-rh+o(h)$ を代入し、$v(t,s)$ を引き $h$ で割って $h\downarrow0$ とすると第一の式を得ます。第二の式は $b=(r-q)-\lambda E[Y_1-1]$ を第一式へ代入して項をまとめたものです。
<!-- proof-end -->

**検算1**：$g(s)=1$ なら $v(t,s)=e^{-r(T-t)}$。$v_t=rv$、$v_s=v_{ss}=0$、非局所差も0なので PIDE の左辺は $rv-rv=0$ です。

**検算2**：$g(s)=s$ なら $v(t,s)=se^{-q(T-t)}$。$v_t=qv$, $v_s=e^{-q(T-t)}$、非局所項は $\lambda\kappa v$ です。第一式の左辺は $qv+(r-q-\lambda\kappa)v-rv+\lambda\kappa v=0$ です。

これは**指定した $Q$ による期待価格の方程式**です。取引可能な資産だけで $g$ を複製した証明ではありません。ジャンプを局所的な二階微分で置き換えると、一般に価格を変えてしまいます。

## 4. なぜ非完備となり、なぜ評価測度を選ぶ必要があるか

[完備市場と複製の意味](../U3-04/index.md#def-u3-04-completeness)では、任意の対象請求権を取引戦略で再現できるかが問題でした。ジャンプが加わると、株価の連続ノイズとジャンプノイズが同時に動きます。株式は一銘柄しかないので、その保有数量一つで両方を独立には調整できません。

ここでは論拠を厳密にするため、**倍率を一定 $Y_j\equiv a>0$、$a\ne1$、$\sigma>0$** に絞ります。$N$ と $W$ は独立、$\lambda>0$ です。平方可積分な自己金融利得に限定します。

<a id="thm-u3-41-incomplete"></a>

<!-- formal-statement-start -->
> **定理（Brown リスクとジャンプリスクが共存する市場の非完備性）**  
> $T>0,\lambda>0,\sigma>0,a>0,a\ne1$ の本講の定数倍率モデルで、取引可能なのが配当付き株式と預金のみとする。配当込みの割引自己金融収益が平方可積分な確率積分として定義される戦略を考える。このとき有界請求権

$$
H=\mathbf1_{\{N_T=0\}}
$$

> は複製できない。従ってこの請求権を含む市場は非完備である。
<!-- formal-statement-end -->

**証明の見取り図**：請求権は Poisson 回数だけを見ます。その割引期待値過程には Brown 変動がありません。株式の動的利得で Brown 変動を消すには $\Delta=0$ とするしかなく、その場合には Poisson の支払も再現できないと示します。

<!-- proof-start -->
### 証明

$t\le T$ とし、$M_t=E_Q[H\mid\mathcal F_t]$ と置きます。$N_t=0$ のとき未来にもジャンプがなければ $H=1$、$N_t\ge1$ なら $H=0$ なので、独立増分より

$$
M_t=\mathbf1_{\{N_t=0\}}e^{-\lambda(T-t)}.
$$

$M_0=e^{-\lambda T}$、$M_T=H$ です。ジャンプがない間は時間微分が $\lambda M_{t-}dt$、最初のジャンプで増分は $-M_{t-}$ なので、補償 Poisson 過程 $\widetilde N_t=N_t-\lambda t$ を用いて

$$
dM_t=-M_{t-}\,d\widetilde N_t.
$$

したがって $M$ は Brown 運動との二次共変動がゼロです（$W$ は連続、$M$ は有限変動の連続部分と不連続ジャンプだけを持つ）。

一方、株式を予測可能な $\Delta_t$ 単位保有するとき、配当を含む割引利得は [補償命題](#prop-u3-41-compensator)より

$$
d\widetilde V_t=
\Delta_t e^{-rt}S_{t-}\sigma\,dW_t
+\Delta_t e^{-rt}S_{t-}(a-1)\,d\widetilde N_t.
$$

もし $V_T=H$ を複製できれば、$\widetilde V$ は平方可積分な $Q$-マルチンゲールなので

$$
\widetilde V_t=E_Q[e^{-rT}H\mid\mathcal F_t]=e^{-rT}M_t.
$$

右辺と $W$ との二次共変動は0、左辺のそれは $\int_0^t\Delta_u e^{-ru}S_{u-}\sigma\,du$ です。全 $t$ で等しいので被積分関数は $du\times Q$-ほとんど至る所ゼロ。$S_{u-}>0$ と $\sigma>0$ から $\Delta_u=0$ です。従って $\widetilde V_t$ は定数ですが、$M_T=H$ は確率 $e^{-\lambda T}\in(0,1)$ で1を取り、そうでなければ0を取る非定数です。矛盾します。
<!-- proof-end -->

この反例で $\sigma>0$ を除くと、上の「Brown 方向を消すなら $\Delta=0$」の論拠は使えません。**ジャンプが存在するだけで必ず非完備になる**とは主張していません。

### 同じ株式に対する無裁定評価が複数ある

「リスク中立測度」は単にドリフトを $r-q$ に置く操作ではありません。ジャンプ強度自体も、$P$ から $Q$ へ変更し得ます。[Girsanov の測度変更](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)の Brown 部分を用い、Poisson 部分の確率比を明示すると、一意でないことを直接確かめられます。

<a id="prop-u3-41-many-measures"></a>

<!-- formal-statement-start -->
> **命題（非一意な同値マルチンゲール測度）**  
> 有限期間 $[0,T]$ において $P$ の下で、$W^P$ と強度 $\lambda_0>0$ の $N$ が独立、倍率は一定 $a>0,a\ne1$、$\sigma>0$、株価は

$$
\frac{dS_t}{S_{t-}}=b\,dt+\sigma\,dW_t^P+(a-1)\,dN_t
$$

> とする。任意の $\lambda>0$ に対し

$$
\theta_\lambda=\frac{b+\lambda(a-1)-(r-q)}{\sigma}
$$

> と定め、$Q_\lambda$ の $P$ に対する満期密度を

$$
\frac{dQ_\lambda}{dP}
=\exp\left(-\theta_\lambda W_T^P-\frac12\theta_\lambda^2T\right)
\,e^{(\lambda_0-\lambda)T}
\left(\frac{\lambda}{\lambda_0}\right)^{N_T}
$$

> とすると、$Q_\lambda$ は $P$ と同値で、株式の配当込み割引総収益は $Q_\lambda$ の下でマルチンゲールになる。一方、取引されない $H=\mathbf1_{\{N_T=0\}}$ の割引期待値は

$$
\pi_\lambda(H)=e^{-rT}e^{-\lambda T}
$$

> となり、$\lambda$ によって異なる。
<!-- formal-statement-end -->

**証明の見取り図**：Brown と Poisson の密度を別々に計算します。両者の積も期待値1で正です。新しい測度の下で株価の平均ドリフトが金利から配当を引いた値になるよう $\theta_\lambda$ を選びます。

<!-- proof-start -->
### 証明

正規分布の指数モーメントより Brown 密度の $P$-期待値は1です。Poisson 密度の期待値も

$$
\begin{aligned}
E_P\left[e^{(\lambda_0-\lambda)T}
(\lambda/\lambda_0)^{N_T}\right]
&=e^{(\lambda_0-\lambda)T}e^{-\lambda_0T}
\sum_{n=0}^\infty\frac{(\lambda T)^n}{n!}\\
&=e^{(\lambda_0-\lambda)T}e^{-\lambda_0T}e^{\lambda T}=1.
\end{aligned}
$$

独立性で積の期待値も1です。密度は有限期間で厳密に正なので $Q_\lambda\sim P$。Brown 指数変換で $W_t^{Q_\lambda}=W_t^P+\theta_\lambda t$ が Brown 運動となり、Poisson の独立増分の同時確率に上の尤度比を掛ければ $N$ の強度は $\lambda$ となります。密度が積に分かれるので両者の独立性は保たれます。

$dW^P=dW^{Q_\lambda}-\theta_\lambda dt$ を株価に代入すると連続ドリフトは $b-\sigma\theta_\lambda=r-q-\lambda(a-1)$。従って [補償命題](#prop-u3-41-compensator)と同じ計算で配当込み割引総収益は真のマルチンゲールです。最後に $Q_\lambda(N_T=0)=e^{-\lambda T}$ より $\pi_\lambda(H)$ を得ます。
<!-- proof-end -->

これは $H$ の取引価格が任意に決まってよいという意味ではありません。追加のジャンプリスク商品が取引されれば、それらの価格・無裁定条件が $Q$ の選択を制限します。株式と預金だけでは選択が固定されない、という意味です。

### 有限3状態による独立の検算

1期間、無金利・無配当で $S_0=100$ 円、終端株価を $80,100,140$ 円とします。確率を順に $1/2,1/4,1/4$ とすると期待株価は $40+25+35=100$ 円です。3状態すべてに正の確率を持つので、この価格付けに裁定はありません。

ただし株式 $\Delta$ 単位と預金 $b$ 円の満期価値は $80\Delta+b,100\Delta+b,140\Delta+b$ という**二つの自由度**しかありません。上昇状態だけで1円払う請求権 $(0,0,1)$ を複製するなら、初めの二式から $\Delta=0,b=0$ となり、第三式の1円に矛盾します。

一般の正の評価確率を $p_-,p_0,p_+$ とすると、$E[S_T]=100$ は $-20p_-+40p_+=0$、つまり $p_-=2p_+$、$p_0=1-3p_+$ です。$0<p_+<1/3$ の任意の選択が株価価格と整合しますが、上昇状態デジタルの価格は $p_+$ 円と異なります。これは連続時間ジャンプ拡散そのものではなく、**非複製と非一意性の線形代数的な模型**です。

## 5. Poisson 混合で call を計算する

具体的な数値価格を出すため、さらに $\log Y_j$ が平均 $\mu_J\in\mathbb R$、分散 $\delta_J^2\ge0$ の正規分布に従うと仮定します。これは「倍率 $Y$ が対数正規分布」の意味で、$Y>0$ を保ちます。ここでは $\sigma>0$ とします。

<a id="prop-u3-41-merton-mixture"></a>

<!-- formal-statement-start -->
> **命題（対数正規ジャンプ倍率による call の Poisson 混合）**  
> 上のジャンプ拡散で $\log Y_j\sim N(\mu_J,\delta_J^2)$、$\sigma>0$ とする。$\kappa=e^{\mu_J+\delta_J^2/2}-1$、$n=0,1,\dots$ とおき、

$$
m_n=\log s_0+(r-q-\lambda\kappa-\sigma^2/2)T+n\mu_J,
\quad v_n=\sigma^2T+n\delta_J^2
$$

> と定める。標準正規分布関数を $\Phi$ とすると、行使価格 $K>0$ の欧州型 call 価格は

$$
C_0=e^{-rT}\sum_{n=0}^{\infty}
e^{-\lambda T}\frac{(\lambda T)^n}{n!}
\left[e^{m_n+v_n/2}\Phi(d_{1,n})-K\Phi(d_{2,n})\right],
$$

$$
d_{2,n}=\frac{m_n-\log K}{\sqrt{v_n}},
\qquad d_{1,n}=d_{2,n}+\sqrt{v_n}.
$$

> $n=0,\ldots,L$ で打ち切った価格を $C_0^{(L)}$ とすると、$r,q\in\mathbb R$ で

$$
0\le C_0-C_0^{(L)}
\le s_0e^{-qT}\,
Q\{\operatorname{Pois}(\lambda T(1+\kappa))>L\}.
$$

> 右辺の Poisson 分布は誤差評価用であり、モデルの $N_T$ とは異なるパラメータを持つ。
<!-- formal-statement-end -->

**証明の見取り図**：$N_T=n$ に条件付けると、Brown の正規変数と $n$ 個の対数倍率の和は正規分布です。その call 期待値を正規積分で計算してから Poisson 確率で平均します。

<!-- proof-start -->
### 証明

[ジャンプ拡散の定義式](#def-u3-41-jump-model)の対数を取ると

$$
\log S_T=\log s_0+(r-q-\lambda\kappa-\sigma^2/2)T
+\sigma W_T+\sum_{j=1}^{N_T}\log Y_j.
$$

$N_T=n$ を固定すると、互いに独立な正規変数の和なので $\log S_T\sim N(m_n,v_n)$。$X\sim N(m,v)$、$v>0$ とし、$c=(\log K-m)/\sqrt v$ とおくと

$$
\begin{aligned}
E[(e^X-K)_+]
&=\int_c^\infty
(e^{m+\sqrt v z}-K)\phi(z)\,dz\\
&=e^{m+v/2}\int_c^\infty\phi(z-\sqrt v)\,dz
-K\{1-\Phi(c)\}\\
&=e^{m+v/2}\Phi((m+v-\log K)/\sqrt v)
-K\Phi((m-\log K)/\sqrt v).
\end{aligned}
$$

二行目で $\phi(z)e^{\sqrt v z}=e^{v/2}\phi(z-\sqrt v)$ と平方完成しました。$m=m_n,v=v_n$ を代入し、各 $n$ の条件付き期待値に $Q(N_T=n)$ を掛け、$n=0,1,\ldots$ で和を取ると混合式を得ます。

打切りの残差は非負で、$(S_T-K)_+\le S_T$ から

$$
C_0-C_0^{(L)}
\le e^{-rT}E_Q[S_T\mathbf1_{\{N_T>L\}}].
$$

倍率積の $N_T=n$ 条件付き期待値は $(1+\kappa)^n$ です。Brown 因子の平均1を用い、

$$
\begin{aligned}
e^{-rT}E_Q[S_T\mathbf1_{\{N_T>L\}}]
&=s_0e^{-qT-\lambda\kappa T}
\sum_{n>L}e^{-\lambda T}
\frac{\{\lambda T(1+\kappa)\}^n}{n!}\\
&=s_0e^{-qT}
Q\{\operatorname{Pois}(\lambda T(1+\kappa))>L\},
\end{aligned}
$$

となります。最後の等号は $-\lambda\kappa T-\lambda T=-\lambda T(1+\kappa)$ を使いました。
<!-- proof-end -->

$\lambda\to0$ なら $N_T=0$ の確率が1へ近付き、$m_0=\log s_0+(r-q-\sigma^2/2)T$、$v_0=\sigma^2T$ の [配当付き Black–Scholes 公式](../U3-19/index.md#thm-u3-19-bsm-dividend)に戻ります。これも実装の重要な境界テストです。

### 数値で確認する

次の実験は $s_0=K=100$ 円、$T=1$ 年、$r=0.03$ 年$^{-1}$、$q=0.01$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$\lambda=0.40$ 年$^{-1}$、$\mu_J=-0.08$、$\delta_J=0.18$ を使います。$\mu_J,\delta_J$ は**対数倍率**の無次元量です。標本ごとに Poisson ジャンプ回数、独立な標準正規 Brown 増分、独立な正規対数倍率を発生させ、**時間格子なしの厳密な満期標本**を作ります。これにより離散化バイアスと Monte Carlo 標本誤差を混同しません。

[Monte Carlo 推定量と標準誤差](../U3-26/index.md#prop-u3-26-unbiased-sample-variance)に従い、解析混合価格と固定シードの標本価格、標準誤差、平均割引株価を同時に出します。標本価格と解析価格の差が必ずゼロになるわけではなく、独立標本数に応じた揺らぎを評価します。

~~~python-file-lab
# lab-id: U3-41-JUMP-CALL
# lab-title: Poisson 混合価格と厳密ジャンプ拡散 Monte Carlo
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-41/assets/jump_diffusion.py
# timeout-ms: 30000
# lab-preset: 標準設定：混合式・MC・標準誤差 | --samples 20000
# lab-preset: 標本数を4倍にして誤差比較 | --samples 80000
# lab-preset: ジャンプ強度を0にした Black–Scholes 極限 | --samples 20000 --intensity 0
~~~

この計算は架空モデルの再現実験であり、実市場のジャンプ強度・プレミアムを推定したものではありません。データでジャンプ強度を推定する作業と、価格付けに採用する $Q$ の強度を選ぶ作業は分ける必要があります。

## 6. 演習と詳細解答

### Level A：モデルの入力と補償を確かめる

<a id="ex-u3-41-a1"></a>
### U3-41-A1：Poisson 確率
- Level: A

$\lambda=0.5$ 年$^{-1}$、$T=2$ 年とする。0回、1回、2回以上の確率を求め、合計が1になることを示せ。

<!-- solution-start -->
**詳細解答**：[Poisson 過程の定義](#def-u3-41-poisson)で $\lambda T=1$ なので、$p_0=e^{-1}$、$p_1=e^{-1}$、$p_{\ge2}=1-p_0-p_1=1-2e^{-1}$ です。$e>2$ だから最後も正で、三つを加えると $e^{-1}+e^{-1}+1-2e^{-1}=1$ です。
<!-- solution-end -->

<a id="ex-u3-41-a2"></a>
### U3-41-A2：補償ドリフト
- Level: A

$r=0.03,q=0.01,\lambda=0.4$ 年$^{-1}$、$Y\equiv1.25$ とする。$\kappa$ と株価の連続ドリフト率 $b$ を計算せよ。

<!-- solution-start -->
**詳細解答**：倍率は定数なので $\kappa=E[Y-1]=0.25$。ジャンプによる平均増分は $\lambda\kappa=0.4\cdot0.25=0.10$ 年$^{-1}$ です。[補償付き定義](#def-u3-41-jump-model)により $b=r-q-\lambda\kappa=0.03-0.01-0.10=-0.08$ 年$^{-1}$。$r-q=0.02$ を連続ドリフトへ直接置くと、ジャンプ期待分を二重に数えます。
<!-- solution-end -->

<a id="ex-u3-41-a3"></a>
### U3-41-A3：倍率とジャンプの直前直後
- Level: A

ジャンプ直前に $S_{t-}=80$ 円、倍率 $Y=1.5$ とする。直後株価、ジャンプ増分、ジャンプを伴わない Brown 部分でこの不連続を表せない理由を答えよ。

<!-- solution-start -->
**詳細解答**：[モデルの跳躍関係](#def-u3-41-jump-model)で $S_t=80\cdot1.5=120$ 円、$\Delta S_t=80(1.5-1)=40$ 円です。Brown 運動の標本路は連続なので、$S_{t-}=80$ から時刻を進めずに40円の段差を作るには $Y$ のジャンプ項が必要です。
<!-- solution-end -->

<a id="ex-u3-41-a4"></a>
### U3-41-A4：PIDE の線形支払検算
- Level: A

$r=0.04,q=0.02$、倍率の平均超過分 $\kappa=0.3$ とし、$g(s)=s$ を価格付けする。$v(t,s)$ を書き、[PIDE](#prop-u3-41-pide)の各項を代入して0になることを示せ。

<!-- solution-start -->
**詳細解答**：[Poisson 補償と割引総収益](#prop-u3-41-compensator)から $v(t,s)=se^{-0.02(T-t)}$。$v_t=0.02v$、$sv_s=v$、$v_{ss}=0$。ジャンプ項は $\lambda E[v(t,sY)-v(t,s)]=\lambda\kappa v=0.3\lambda v$ です。PIDE 左辺は

$$
0.02v+(0.04-0.02-0.3\lambda)v-0.04v+0.3\lambda v=0.
$$

補償項と非局所項はここでは相殺されます。
<!-- solution-end -->

<a id="ex-u3-41-a5"></a>
### U3-41-A5：対数正規倍率の平均
- Level: A

$\log Y\sim N(-0.1,0.2^2)$ のとき、$E[Y]$ と $\kappa$ を求め、$\kappa$ が $\mu_J$ と一致しない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$Z=\log Y$ に対して正規モーメントを平方完成すると $E[e^Z]=e^{\mu_J+\delta_J^2/2}$。[混合命題](#prop-u3-41-merton-mixture)へ代入して $E[Y]=e^{-0.1+0.04/2}=e^{-0.08}$、$\kappa=e^{-0.08}-1$ です。$\mu_J=-0.1$ は対数の平均、$\kappa$ は倍率の平均超過分であり、指数関数の非線形性により異なります。
<!-- solution-end -->

### Level B：証明の主要部分を再構成する

<a id="ex-u3-41-b1"></a>
### U3-41-B1：ジャンプ積の期待値
- Level: B

$N_T\sim\operatorname{Pois}(\lambda T)$、独立倍率列 $Y_j$ は正で $E[Y_j]=m<\infty$ とする。$E[\prod_{j=1}^{N_T}Y_j]$ を定義から求め、株価の補償項を導け。

<!-- solution-start -->
**詳細解答**：$N_T=n$ で条件付けると、独立性により $E[\prod_{j=1}^nY_j\mid N_T=n]=m^n$ です。Poisson の確率を掛けて

$$
\sum_{n=0}^\infty e^{-\lambda T}\frac{(\lambda T)^n}{n!}m^n
=e^{-\lambda T}e^{\lambda Tm}=e^{\lambda T(m-1)}.
$$

従って $S_T=s_0e^{(b-\sigma^2/2)T+\sigma W_T}\prod_jY_j$ の平均は $s_0e^{\{b+\lambda(m-1)\}T}$。これが $s_0e^{(r-q)T}$ と一致するには $b=r-q-\lambda(m-1)=r-q-\lambda\kappa$ が必要です。
<!-- solution-end -->

<a id="ex-u3-41-b2"></a>
### U3-41-B2：非局所項を含む PIDE
- Level: B

ジャンプ倍率が一定 $a>0$、$v(t,s)=s^2e^{c(T-t)}$ とする。$r,q,\sigma,\lambda,a$ を定数として [PIDE](#prop-u3-41-pide)から $c$ を導け。

<!-- solution-start -->
**詳細解答**：$v_t=-cv$、$sv_s=2v$、$s^2v_{ss}=2v$、$v(t,as)-v(t,s)=(a^2-1)v$ です。$\kappa=a-1$ を代入すると左辺は

$$
[-c+2(r-q-\lambda(a-1))+\sigma^2-r+\lambda(a^2-1)]v.
$$

$v>0$ なので係数が0となる条件は

$$
c=r-2q+\sigma^2+\lambda\{a^2-1-2(a-1)\}
=r-2q+\sigma^2+\lambda(a-1)^2.
$$

別法として $E[S_T^2\mid S_t=s]$ を正規指数モーメントと Poisson 母関数から計算しても同じ指数を得ます。$\lambda(a-1)^2$ はジャンプ分散が追加する項です。
<!-- solution-end -->

<a id="ex-u3-41-b3"></a>
### U3-41-B3：評価測度の非一意性
- Level: B

[非一意な評価測度命題](#prop-u3-41-many-measures)で $r=q=0$, $\sigma=0.2$, $a=1.5$, $b=0$, $\lambda_0=0.4$ とする。$\lambda=0.2$ と $\lambda=0.6$ に対して $\theta_\lambda$、$H=\mathbf1_{\{N_1=0\}}$ の価格を比較せよ。

<!-- solution-start -->
**詳細解答**：$\theta_\lambda=[0+\lambda(0.5)-0]/0.2=2.5\lambda$ なので、順に $\theta_{0.2}=0.5$ と $\theta_{0.6}=1.5$ です。双方 $\lambda>0$ で密度は正、Brown 密度・Poisson 尤度比の期待値は1です。$T=1$ のデジタル価格は順に $e^{-0.2}$ 円と $e^{-0.6}$ 円です。どちらの測度も株式の配当込み割引平均を不変に保ちますが、複製できない請求権の価格は異なります。
<!-- solution-end -->

<a id="ex-u3-41-b4"></a>
### U3-41-B4：混合価格の打切り誤差
- Level: B

$\lambda T=0.4$、$E[Y]=1.25$、$q=0$、$s_0=100$ 円の call 混合式を $n\le1$ で打ち切る。価格残差の非負性と上界を、Poisson 級数を使って具体的に表せ。

<!-- solution-start -->
**詳細解答**：[$L=1$ の混合打切り境界](#prop-u3-41-merton-mixture)の調整後平均は $\lambda T E[Y]=0.4\cdot1.25=0.5$ です。各条件付き call 価値は非負なので残差も非負。上界は

$$
100\,Q\{\operatorname{Pois}(0.5)>1\}
=100\left[1-e^{-0.5}(1+0.5)\right]\ {\rm 円}.
$$

この値は「真の価格誤差の絶対値」の**保証上界**であり、実際の誤差を表す等号ではありません。標本誤差は混合級数の打切りとは別です。
<!-- solution-end -->

### Level C：複製・評価と数値誤差をまとめて扱う

<a id="ex-u3-41-c1"></a>
### U3-41-C1：ジャンプ価格モデルの無裁定チェック
- Level: C

満期 $T=1$ 年、株価初期値 $100$ 円、$r=q=0$、$\lambda=0.2$ 年$^{-1}$、$\sigma=0.2$ 年$^{-1/2}$、定数倍率 $a=2$ のジャンプ拡散を考える。

1. 補償付き株価の明示式を求め、$E_Q[S_T]=100$ 円を Poisson 級数から証明せよ。
2. $g(s)=s^2/(100\,\text{円})$ の価格を PIDE と条件付き期待値の二方法で求め、係数が一致することを示せ。
3. 株式と預金だけでは $H=\mathbf1_{\{N_1=0\}}$ を複製できない理由を、Brown 方向の二次共変動とジャンプ後の支払の双方から説明せよ。
4. $\lambda$ を変えても株式を評価マルチンゲールに保てる理由と、call を Poisson 混合で数値評価するときの「標本誤差」と「級数打切り誤差」の違いを述べよ。

<!-- solution-start -->
**詳細解答**：

1. $\kappa=2-1=1$、$\lambda\kappa=0.2$、$\sigma^2/2=0.02$ です。[モデルの明示式](#def-u3-41-jump-model)から

$$
S_t=100\exp(-0.22t+0.2W_t)\,2^{N_t}.
$$

Brown 指数の平均は $e^{0.02t}$、Poisson 母関数は $E[2^{N_t}]=e^{0.2t(2-1)}=e^{0.2t}$ です。よって $E[S_T]=100e^{-0.22}\cdot e^{0.02}\cdot e^{0.2}=100$ 円です。

2. [平方支払の計算](#prop-u3-41-pide)を $v(t,s)=s^2e^{c(1-t)}$ に適用すると $c=r-2q+\sigma^2+\lambda(a-1)^2=0.04+0.2=0.24$。従って $V_0=(100^2/100)e^{0.24}=100e^{0.24}$ 円です。一方、明示式の二乗を取り、Brown 二次モーメント $E[e^{0.4W_1}]=e^{0.08}$、Poisson 母関数 $E[4^{N_1}]=e^{0.2(4-1)}=e^{0.6}$ より

$$
E[S_1^2]=10000e^{-0.44}\cdot e^{0.08}\cdot e^{0.6}
=10000e^{0.24}.
$$

この期待値を契約上の分母100円で割ると $100e^{0.24}$ 円となり、両方法が一致します。

3. [非完備性定理](#thm-u3-41-incomplete)で $M_t=\mathbf1_{\{N_t=0\}}e^{-0.2(1-t)}$、$dM_t=-M_{t-}d(N_t-0.2t)$ となり、$[M,W]=0$ です。株式利得の Brown 係数は $\Delta_t e^{-rt}\sigma S_{t-}$。$r=0,\sigma=0.2,S_{t-}>0$ なので一致のため $\Delta=0$ が必要ですが、定数の預金だけでは $H=0$ または1の支払を再現できません。

4. $\lambda>0$ を別の値にしても [評価測度の構成](#prop-u3-41-many-measures)に従って Brown ドリフトを調整すれば、株式の配当込み割引総収益の平均を保てます。新しい $Q$ の選択は商品の価格に影響します。一方、指定した一つの $Q$ の下で MC の標本数 $n$ を増やすと標準誤差は典型的に $n^{-1/2}$ で減ります。[混合打切り境界](#prop-u3-41-merton-mixture)は Poisson の最大項数 $L$ で決まり、MC の標本数を増やしても改善しません。
<!-- solution-end -->

## この講義で得たこと

ジャンプ拡散では、$E[Y-1]$ と強度 $\lambda$ の積を連続ドリフトから差し引くと、配当込み割引総収益が指定した $Q$ でマルチンゲールになります。ジャンプは非局所的な価格変化を生むため、評価方程式は通常の PDE ではなく PIDE です。Brown 変動とジャンプ変動が同時にある市場では、株式一銘柄の保有だけでは両方のリスクを独立にヘッジできず、無裁定だけでは非複製請求権の価格を一つに定められません。

次講は、割引率そのものが時間構造を持つ金利曲線と債券の価格付けへ進みます。
