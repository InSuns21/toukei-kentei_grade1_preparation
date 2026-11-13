# U3-15 連続時間のリスク中立測度とヘッジ

[U3-14 の幾何 Brown 運動](../U3-14/index.md#thm-u3-14-explicit-gbm)では、実世界の確率 $P$ の下で株価の平均増加率 $\mu$ を指定しました。一方、[二項モデルの割引マルチンゲール](../U3-03/index.md#thm-u3-03-stock-martingale)では、将来の支払額を評価するための確率を実際の上昇頻度とは分けました。

この考えを連続時間へ移すには、単に SDE の $\mu$ を $r$ に置き換えるだけでは不十分です。同じ標本路に**別の確率の重み**を与え、割引株価がその確率の下でマルチンゲールになることを確かめる必要があります。本講ではその測度を構成し、複製可能な請求権と自己金融ヘッジの価格に接続します。一般の Black–Scholes–Merton PDE の導出は次講で扱います。

## 1. 現金を基準に価格を測る

満期 $T>0$ を固定します。$(\Omega,\mathcal F_T,(\mathcal F_t)_{0\le t\le T},P)$ 上の標準 Brown 運動 $W^P$ を用います。$\mathcal F_t$ は通常の条件を満たし、$W^P$ はこのフィルトレーションに関する Brown 運動です。株式は無配当、初期価格 $S_0=s_0>0$ 円、預金口座の初期価値は $B_0=1$ 円とします。定数係数は

$$
\mu,r\in\mathbb R\quad(\text{年}^{-1}),\qquad
\sigma>0\quad(\text{年}^{-1/2})
$$

です。$P$ の下の市場モデルを次で固定します。

$$
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t^P,
\qquad B_t=e^{rt},\qquad 0\le t\le T.
$$

株価が正で SDE が強い意味で解けることは、[GBM の陽解と正値性](../U3-14/index.md#thm-u3-14-explicit-gbm)によります。ここで $r$ は連続複利の無リスク金利で、配当・取引費用・資金調達制約は置きません。

異なる時刻の円建て価格を比較するには、預金を基準にした**割引価格**を用います。$B_t>0$ を基準資産（numeraire、ニュメレール）にすると、株式1単位の基準資産建て価値は $S_t/B_t$ です。

<a id="def-u3-15-numeraire"></a>

<!-- formal-statement-start -->
> **定義（ニュメレールと割引価格）**  
> $[0,T]$ 上で常に正の価値を持つ取引可能な資産 $N_t>0$ を**ニュメレール**という。取引可能な資産 $X$ の $N$ 建て価格は $X_t/N_t$ である。本講では $N=B$ とし、

$$
\widetilde S_t:=\frac{S_t}{B_t}=e^{-rt}S_t
$$

> を株式の割引価格とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-15-numeraire -->
**定義の確認**：預金 $B_t=e^{rt}$ は全時刻で正、取引可能で、1円を時刻0に預けると $t$ 年後に $e^{rt}$ 円になる資産です。したがってニュメレールの正値性と取引可能性をともに満たします。$S_0=100$ 円、$r=0.03$ 年$^{-1}$、$t=1$ 年なら $B_1=e^{0.03}$ 円であり、価格 $S_1=110$ 円の株式は預金単位で $110/e^{0.03}\approx106.749$ です。ここでは $S_1$ の値を例として与えたのであって、将来価格を確定できるという意味ではありません。
<!-- definition-example-end -->

ニュメレールを選ぶことと、確率測度を選ぶことは**異なる操作**です。単に $B$ で割っても、$P$ の下で $\widetilde S$ がマルチンゲールになるとは限りません。

## 2. 何を「リスク中立測度」と呼ぶのか

まず、[同値な確率測度](../../../解析系/STO/STO10/index.md#def-sto10-equivalent-measures)とは、確率0の事象が両方向で一致する二つの測度です。$P\sim Q$ と書きます。この条件なら、ある経路が実確率の下で起こり得るかどうかを変えず、経路の重みだけを変えられます。

<a id="def-u3-15-emm"></a>

<!-- formal-statement-start -->
> **定義（預金基準の同値マルチンゲール測度）**  
> 上記の無配当市場で $Q$ が $\mathcal F_T$ 上の確率測度であり、(i) $Q\sim P$、(ii) 株式の割引価格 $\widetilde S=S/B$ が $(\mathcal F_t)$ に関する**真の $Q$-マルチンゲール**、すなわち各 $t$ で $E_Q[|\widetilde S_t|]<\infty$ かつ

$$
E_Q[\widetilde S_t\mid\mathcal F_u]=\widetilde S_u
\qquad(0\le u\le t\le T)
$$

> を満たすとき、$Q$ をこの市場の**預金基準の同値マルチンゲール測度**（リスク中立測度）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-15-emm -->
**定義の確認**（すでにドリフトが金利に一致する場合）：$\mu=r$ のモデルで $Q=P$ と置きます。同じ測度は自明に同値です。[GBM の条件付き平均](../U3-14/index.md#prop-u3-14-conditional)の $p=1$ を用いると

$$
E_P[\widetilde S_t\mid\mathcal F_u]
=e^{-rt}S_u e^{r(t-u)}
=e^{-ru}S_u=\widetilde S_u.
$$

正の株価は [GBM のモーメント公式](../U3-14/index.md#prop-u3-14-moments)により可積分なので、(ii) の**真の**マルチンゲール条件も満たします。$\mu\ne r$ でも同値測度を構成できることを次に示します。
<!-- definition-example-end -->

これは「投資家がリスクを気にしなくなる」仮説ではありません。**評価用の確率**であって、将来の実現頻度を予測する $P$ と区別します。また、一般には正の**局所**マルチンゲールというだけでは条件 (ii) を満たしません。

## 3. Girsanov による測度の構成

金融モデルで必要なのは、$P$ のドリフト $\mu$ と金利 $r$ の差を Brown 運動の方向へ移すことです。定数

$$
\theta:=\frac{\mu-r}{\sigma}
$$

を**市場価格リスク**（Brown 運動のドリフト変換係数）として用います。単位は年$^{-1/2}$ です。$\sigma>0$ なのでこの比は定義できます。

<a id="thm-u3-15-risk-neutral-measure"></a>

<!-- formal-statement-start -->
> **定理（定数係数 GBM のリスク中立測度の構成）**  
> $T>0,s_0>0,\mu,r\in\mathbb R,\sigma>0$ とする。$P$ の下で $W^P$ が Brown 運動で、無配当株式と預金が

$$
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t^P,\quad S_0=s_0,\qquad B_t=e^{rt}
$$

> を満たすとする。$\theta=(\mu-r)/\sigma$ とし、

$$
Z_t:=\exp\left(-\theta W_t^P-\frac12\theta^2t\right),
\quad Q(A):=E_P[Z_T\mathbf1_A]\quad(A\in\mathcal F_T)
$$

> とおく。このとき $Q$ は $P$ と同値な確率測度であり、

$$
W_t^Q:=W_t^P+\theta t
$$

> は $Q$-Brown 運動である。$Q$ の下で

$$
dS_t=rS_t\,dt+\sigma S_t\,dW_t^Q
$$

> が成り立ち、$S/B$ は真の $Q$-マルチンゲールとなる。したがって $Q$ は預金基準の同値マルチンゲール測度である。
<!-- formal-statement-end -->

**見取り図**：$Z_T$ が「経路ごとの確率の付け替え」で、$W^Q=W^P+\theta t$ がその付け替えの下で Brown 運動になるという主張です。$P$ の SDE に $dW^P=dW^Q-\theta\,dt$ を代入すると $\mu-\sigma\theta=r$ になります。最後に陽解と条件付き期待値を使って、局所ではないマルチンゲール性まで検証します。

<!-- proof-start -->
### 証明

$\theta$ は定数なので、[STO10 の Novikov 条件](../../../解析系/STO/STO10/index.md#thm-sto10-novikov)を実際に確認できます。

$$
E_P\left[\exp\left(\frac12\int_0^T\theta^2\,du\right)\right]
=e^{\theta^2T/2}<\infty.
$$

[STO10 の Girsanov 定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)へ $\theta_u=\theta$ を代入すると、$Z_t$ は $E_P[Z_T\mid\mathcal F_t]$ に一致する真のマルチンゲールで $E_P[Z_T]=1$ です。従って $Q$ は確率測度です。$Z_T>0$ が $P$-ほとんど確実に成り立つため、$Q(A)=0$ なら $P(A)=0$ となり、$Q\sim P$ です。同定した $W^Q=W^P+\theta t$ は $Q$ の下で Brown 運動です。

確率測度が同値なので、$P$ の下で成立する積分形の恒等式は $Q$ の下でも成立します。その恒等式に $dW_t^P=dW_t^Q-\theta\,dt$ を代入すると

$$
\begin{aligned}
dS_t
&=\mu S_t\,dt+\sigma S_t(dW_t^Q-\theta\,dt)\\
&=(\mu-\sigma\theta)S_t\,dt+\sigma S_t\,dW_t^Q\\
&=\left(\mu-\sigma\frac{\mu-r}{\sigma}\right)S_t\,dt+\sigma S_t\,dW_t^Q\\
&=rS_t\,dt+\sigma S_t\,dW_t^Q.
\end{aligned}
$$

ここで $Q$ の下で [GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)を $r,\sigma,W^Q$ に適用すれば

$$
S_t=S_u\exp\left[\left(r-\frac12\sigma^2\right)(t-u)
+\sigma(W_t^Q-W_u^Q)\right]
$$

が $0\le u\le t\le T$ について成立します。$Q$-Brown 運動の未来増分は $\mathcal F_u$ と独立で正規 $N(0,t-u)$ に従うので、[GBM の条件付きモーメント](../U3-14/index.md#prop-u3-14-conditional)に $p=1,\mu=r$ を代入して

$$
\begin{aligned}
E_Q[e^{-rt}S_t\mid\mathcal F_u]
&=e^{-rt}S_u e^{(r-\sigma^2/2)(t-u)}
  E_Q[e^{\sigma(W_t^Q-W_u^Q)}]\\
&=e^{-rt}S_u e^{(r-\sigma^2/2)(t-u)}
  e^{\sigma^2(t-u)/2}\\
&=e^{-ru}S_u=\widetilde S_u.
\end{aligned}
$$

最後の計算に現れた正規指数モーメントは有限で、[GBM のモーメント公式](../U3-14/index.md#prop-u3-14-moments)も $E_Q[|\widetilde S_t|]=s_0$ を与えます。従って局所マルチンゲールに留まらず真の $Q$-マルチンゲールです。
<!-- proof-end -->

**数値例**：$s_0=100$ 円、$\mu=0.08$、$r=0.03$、$\sigma=0.20$、$T=1$ 年とすると

$$
\theta=\frac{0.08-0.03}{0.20}=0.25,\qquad
Z_1=e^{-0.25W_1^P-0.03125}.
$$

$W_1^P=1$ の経路には $Z_1=e^{-0.28125}\approx0.7548$、$W_1^P=-1$ の経路には $Z_1=e^{0.21875}\approx1.2445$ の重みが付きます。$P$ では強い上昇傾向を仮定していたため、$Q$ は相対的に上昇側の重みを下げています。これらは**密度の値**であり、個別経路の確率ではありません。

## 4. $P$ と $Q$ を混同しないための検算

[GBM の条件付き平均](../U3-14/index.md#prop-u3-14-conditional)から、$P$ では

$$
E_P[e^{-rT}S_T]=s_0e^{(\mu-r)T}
$$

です。しかし、構成した $Q$ では定理により

$$
E_Q[e^{-rT}S_T]=s_0.
$$

重み付き期待値としても直接再計算できます。[同値測度の密度](../../../解析系/STO/STO10/index.md#def-sto10-equivalent-measures)を使えば $E_Q[X]=E_P[Z_TX]$ です。$W_T^P\sim N(0,T)$ と [GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)から

$$
\begin{aligned}
Z_Te^{-rT}S_T
&=s_0\exp\left[
(\sigma-\theta)W_T^P+
\left(\mu-r-\frac{\sigma^2+\theta^2}{2}\right)T
\right],\\
E_P[Z_Te^{-rT}S_T]
&=s_0\exp\left[
\mu-r-\frac{\sigma^2+\theta^2}{2}
+\frac{(\sigma-\theta)^2}{2}
\right]T\\
&=s_0\exp[(\mu-r-\sigma\theta)T]=s_0.
\end{aligned}
$$

したがって上の数値例では、$P$ の割引株価平均が $100e^{0.05}\approx105.127$ 円でも、$Q$ では100円です。

| 計算対象（$T=1$ 年） | 実確率 $P$ | 評価測度 $Q$ |
| --- | ---: | ---: |
| 株価ドリフト | $0.08$ | $0.03$ |
| 対数収益率の平均 | $0.06$ | $0.01$ |
| $E[S_T]$ | $100e^{0.08}\approx108.329$ 円 | $100e^{0.03}\approx103.045$ 円 |
| $E[e^{-rT}S_T]$ | $100e^{0.05}\approx105.127$ 円 | $100$ 円 |

ここで物理的な標本路が変わったのではなく、その標本路への重みが変わりました。リスク管理の将来損失分布を $Q$ の表からそのまま読み取ることはできません。

## 5. 複製可能な請求権の価格と自己金融ヘッジ

[U3-04 の離散時間の自己金融戦略](../U3-04/index.md#def-u3-04-self-financing)は「保有量を調整するための費用を外部から追加しない」条件でした。連続時間では、株数 $\Delta_t$ と預金口座の保有単位数 $\psi_t$ を適合な予測可能過程として、ポートフォリオ価値を $V_t=\Delta_t S_t+\psi_tB_t$ と書きます。保有量の変化に資金を外部投入しないことを、確率積分として表します。

<a id="def-u3-15-self-financing"></a>

<!-- formal-statement-start -->
> **定義（連続時間の自己金融戦略）**  
> 無配当の株式 $S$ と預金 $B$ に対する予測可能な保有量 $(\Delta_t,\psi_t)$ が、必要な確率積分を定義でき、価値過程 $V_t=\Delta_tS_t+\psi_tB_t$ について

$$
V_t=V_0+\int_0^t\Delta_u\,dS_u+\int_0^t\psi_u\,dB_u
\qquad(0\le t\le T)
$$

> を満たすとき、戦略を自己金融という。上式は $dV_t=\Delta_t\,dS_t+\psi_t\,dB_t$ と略記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-15-self-financing -->
**定義の確認**：一定の株数 $a$ と一定の預金単位数 $b$ を保有するとき $\Delta_t=a,\psi_t=b,V_t=aS_t+bB_t$ は適合です。連続かつ予測可能で積分可能な定数戦略なので

$$
V_t-V_0=a(S_t-S_0)+b(B_t-B_0)
=\int_0^t a\,dS_u+\int_0^t b\,dB_u.
$$

初期価値は $as_0+b$ 円、満期価値は $aS_T+bB_T$ 円となり、自己金融条件を全て満たします。$a,b$ を任意の決定論的な**時間変化**として勝手に代入するだけでは、保有量調整の費用が生じるため自己金融とは限りません。
<!-- definition-example-end -->

次は株式・預金を割引すると自己金融条件が簡潔になる理由です。

<a id="prop-u3-15-discounted-wealth"></a>

<!-- formal-statement-start -->
> **命題（自己金融条件の割引形）**  
> 第1節の $B_t=e^{rt}$ と連続時間の自己金融戦略を考える。$\widetilde V_t=V_t/B_t$ とすれば、

$$
\widetilde V_t=\widetilde V_0+
\int_0^t\Delta_u\,d\widetilde S_u.
$$

> 特に $Q$ の下で

$$
E_Q\!\left[\int_0^T\Delta_u^2\sigma^2\widetilde S_u^2\,du\right]<\infty
$$

> が成り立つとき、$\widetilde V$ は真の $Q$-マルチンゲールとなる。
<!-- formal-statement-end -->

**見取り図**：預金は割引すると常に1です。自己金融なら割引後の価値変化は株式の割引後の値動きに対する保有株数分だけで、追加資金の出入りはありません。最後の二乗可積分条件は「局所マルチンゲールだから期待値が不変」という飛躍を防ぎます。

<!-- proof-start -->
### 証明

[STO7 の積の Itô 法則](../../../解析系/STO/STO7/index.md#cor-sto7-product-rule)を、有限変動の $B^{-1}$ と $V$ の積に適用します。$dB_t=rB_tdt$ かつ $d(B_t^{-1})=-rB_t^{-1}dt$ であり、有限変動因子との二次共変分は0です。したがって自己金融条件を代入すると

$$
\begin{aligned}
d(V_t/B_t)
&=B_t^{-1}dV_t-rB_t^{-1}V_t\,dt\\
&=B_t^{-1}(\Delta_t\,dS_t+\psi_t rB_t\,dt)
-rB_t^{-1}(\Delta_tS_t+\psi_tB_t)\,dt\\
&=\Delta_tB_t^{-1}(dS_t-rS_t\,dt)\\
&=\Delta_t\,d(S_t/B_t).
\end{aligned}
$$

この等式を積分すれば割引形を得ます。[リスク中立測度の構成](#thm-u3-15-risk-neutral-measure)の下で $d\widetilde S_t=\sigma\widetilde S_t\,dW_t^Q$ です。ゆえに

$$
\widetilde V_t=\widetilde V_0+
\int_0^t\Delta_u\sigma\widetilde S_u\,dW_u^Q.
$$

仮定の二乗可積分性により右辺の確率積分は [Itô 等長性と $L^2$ 積分の構成](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)から二乗可積分な真の $Q$-マルチンゲールです。従って $E_Q[\widetilde V_t\mid\mathcal F_u]=\widetilde V_u$ が成り立ちます。
<!-- proof-end -->

<a id="thm-u3-15-replication-price"></a>

<!-- formal-statement-start -->
> **定理（複製可能な満期請求権の価格）**  
> 第3節の市場とリスク中立測度 $Q$ を考える。$\mathcal F_T$-可測な満期支払額 $H$（円）があり、自己金融戦略 $(\Delta,\psi)$ が $V_T=H$ を $Q$-ほとんど確実に満たすとする。さらに

$$
E_Q\!\left[\int_0^T\Delta_u^2\sigma^2\widetilde S_u^2\,du\right]<\infty
$$

> が成立するとする。このとき各 $t\in[0,T]$ で

$$
\boxed{V_t=B_tE_Q[H/B_T\mid\mathcal F_t].}
$$

> 特に初期複製費用は $V_0=B_0E_Q[H/B_T]$（$\mathcal F_0$ が自明な場合）である。
<!-- formal-statement-end -->

**見取り図**：満期に $H$ を実現する自己金融戦略がすでに存在するなら、その割引価値が真のマルチンゲールなので、途中価値は満期の割引支払額の条件付き期待値に一致します。**期待値の式だけから、任意の $H$ を複製できるとは主張していません。**

<!-- proof-start -->
### 証明

[自己金融条件の割引形](#prop-u3-15-discounted-wealth)と二乗可積分性により、$\widetilde V_t=V_t/B_t$ は真の $Q$-マルチンゲールです。$V_T=H$ を代入し、マルチンゲールの定義から

$$
\frac{V_t}{B_t}
=E_Q\left[\frac{V_T}{B_T}\Bigm|\mathcal F_t\right]
=E_Q\left[\frac{H}{B_T}\Bigm|\mathcal F_t\right].
$$

$B_t>0$ を掛けて結論を得ます。$Q\sim P$ なので、満期複製のほとんど確実な等式は $P$ の下でも成立します。
<!-- proof-end -->

**一定保有の具体例**：$H=2S_T+5B_T$ 円なら、2株と預金5単位の戦略が複製します。定理の右辺は

$$
\begin{aligned}
B_tE_Q[2S_T/B_T+5\mid\mathcal F_t]
&=2B_tE_Q[\widetilde S_T\mid\mathcal F_t]+5B_t\\
&=2S_t+5B_t.
\end{aligned}
$$

最後は [割引株価の真のマルチンゲール性](#thm-u3-15-risk-neutral-measure)を使いました。二乗可積分条件は $\Delta=2$ と [GBM の二次モーメント](../U3-14/index.md#prop-u3-14-moments)から満たされます。

## 6. 非線形な支払額を動的にヘッジする小例

単に一定株数を持つだけでは複製できない例として、固定額 $K>0$ 円を用い、満期に

$$
H=\frac{S_T^2}{K}\quad(\text{円})
$$

を支払う請求権を考えます。$S_T^2$ をそのまま円の支払額と書くと単位が円$^2$ になってしまうので、$K$ で割ります。ここではこの商品だけを直接計算します。一般的な PDE の導出は次講の仕事です。

<a id="prop-u3-15-quadratic-hedge"></a>

<!-- formal-statement-start -->
> **命題（二乗支払額の複製価格と動的ヘッジ）**  
> 第3節の無配当・定数係数市場で $K>0$ を固定し、$H=S_T^2/K$ とする。$\tau=T-t$ とおき、

$$
v(t,s)=\frac{s^2}{K}e^{(r+\sigma^2)(T-t)},\qquad
\Delta_t=\frac{2S_t}{K}e^{(r+\sigma^2)(T-t)},\qquad
\psi_t=\frac{v(t,S_t)-\Delta_tS_t}{B_t}
$$

> と定める。このとき $(\Delta,\psi)$ は自己金融で $V_t=v(t,S_t)$、$V_T=H$ を複製する。特に

$$
v(0,s_0)=\frac{s_0^2}{K}e^{(r+\sigma^2)T}.
$$
<!-- formal-statement-end -->

**見取り図**：まず $Q$ の下で [GBM の二次条件付きモーメント](../U3-14/index.md#prop-u3-14-conditional)を計算すると、割引期待値が $v(t,S_t)$ と一致します。しかし、それだけでは複製戦略を作ったことにはなりません。[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)から $d(v/B)$ の雑音係数を取り出し、株式の割引値動きに合わせて**自己金融を別途確認**します。

<!-- proof-start -->
### 証明

$Q$ の下の GBM はドリフト $r$ であるため、[GBM の条件付きモーメント公式](../U3-14/index.md#prop-u3-14-conditional)で $p=2$、$u=t$、終点 $T$ を選ぶと

$$
E_Q[S_T^2\mid\mathcal F_t]
=S_t^2 e^{(2r+\sigma^2)(T-t)}.
$$

したがって

$$
B_tE_Q[B_T^{-1}H\mid\mathcal F_t]
=e^{-r(T-t)}\frac{S_t^2}{K}e^{(2r+\sigma^2)(T-t)}
=v(t,S_t).
$$

次にこの候補が**実際に**自己金融であるか検証します。$a=r+\sigma^2$ と置くと

$$
v_t(t,s)=-av(t,s),\quad
v_s(t,s)=\frac{2s}{K}e^{a(T-t)},\quad
v_{ss}(t,s)=\frac2K e^{a(T-t)}.
$$

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $Q$-SDE $dS=rS\,dt+\sigma S\,dW^Q$ に適用し、

$$
\begin{aligned}
dv(t,S_t)
&=\left(v_t+rS_tv_s+\frac12\sigma^2S_t^2v_{ss}\right)dt
+\sigma S_tv_s\,dW_t^Q\\
&=\left(-av+2rv+\sigma^2v\right)dt
+\sigma S_t\Delta_t\,dW_t^Q\\
&=rv\,dt+\sigma S_t\Delta_t\,dW_t^Q
\end{aligned}
$$

を得ます。$a=r+\sigma^2$ を代入した最後の行では $-a+2r+\sigma^2=r$ です。割引すると

$$
d(e^{-rt}v(t,S_t))
=e^{-rt}\sigma S_t\Delta_t\,dW_t^Q
=\Delta_t\,d(e^{-rt}S_t).
$$

$\psi_t=(v-\Delta S)/B$ と置いたので恒等的に $V=\Delta S+\psi B=v$ です。前節の [割引自己金融条件](#prop-u3-15-discounted-wealth)の導出を逆にたどると、$dV=\Delta\,dS+\psi\,dB$ が成立します。$\Delta,\psi$ は連続適合で予測可能です。有限時間上の対数正規株価の全次数のモーメントが有限なので、$\Delta_t^2\sigma^2\widetilde S_t^2$ の期待積分も有限です。最後に $t=T$ を入れると $v(T,S_T)=S_T^2/K=H$ です。
<!-- proof-end -->

**数値例**：$s_0=K=100$ 円、$r=0.03$、$\sigma=0.20$、$T=1$ 年では

$$
v(0,100)=100e^{0.07}\approx107.251\text{ 円},\quad
\Delta_0=2e^{0.07}\approx2.1450\text{ 株},
\quad\psi_0=-100e^{0.07}.
$$

預金口座の保有は**負**で、借入れによって約2.145株を保有します。借入れを許さない市場ではこの複製はそのまま実行できず、無制約市場の仮定が効いています。

## 7. 仮定が欠けるとどこで失敗するか

- **$\sigma=0$ の境界**：$\mu\ne r$ なら、$S_t=s_0e^{\mu t}$、$B_t=e^{rt}$ と確定的に増加率が異なります。$\mu>r$ なら初期費用0で株式1株を買い $s_0$ 円を預金から借りると、満期利益 $s_0(e^{\mu T}-e^{rT})>0$ が確定します。$\mu<r$ なら逆の売買で正の利益です。$\theta=(\mu-r)/\sigma$ を定義できないことは単なる式の欠陥ではなく、同じ確定価格経路を確率の重み替えでは直せないという問題です。$\mu=r,\sigma=0$ なら $Q=P$ が成立します。
- **同値性の必要性**：$Z_T>0$ でなくなると、$P$ で可能な事象を $Q$ が確率0にしてしまうことがあります。価格付け時に見落とす経路が生じるため、同値マルチンゲール測度の条件を満たしません。
- **局所と真のマルチンゲールの差**：一般の SDE や制約付き戦略で確率積分が真のマルチンゲールになる保証はなく、複製価格の条件付き期待値表示は二乗可積分性などを確かめて使います。
- **配当・取引費用・複数リスク源**：本講は無配当1株と1預金、1 Brown 運動に限定しています。配当があれば「値上がりだけの割引株価」ではなく配当込みの利得を扱います。複数の雑音や取引制約では同値マルチンゲール測度の存在・一意性と完全性を別途検査する必要があります。

## 8. 数値で検証する

$T=1$ 年、$s_0=100$ 円、$\mu=0.08$、$r=0.03$、$\sigma=0.20$ を共通設定とします。次の表の式は正規分布の指数モーメントから**独立に**導かれ、乱数の実験値ではありません。

| 検証量 | 理論値 |
| --- | ---: |
| $\theta$ | $0.25$ |
| $E_P[Z_T]$ | $1$ |
| $E_P[Z_Te^{-rT}S_T]$ | $100$ 円 |
| $E_P[e^{-rT}S_T]$ | $100e^{0.05}\approx105.127$ 円 |
| $\operatorname{Var}_P(Z_T)$ | $e^{0.0625}-1$ |
| $v(0,100)$ for $H=S_T^2/100$ | $100e^{0.07}\approx107.251$ 円 |

[再現用 Python](assets/risk_neutral_check.py) は標準正規密度に対する数値積分とシード固定の標本平均を用い、$E_P[Z_T]=1$、割引株価の $Q$-期待値、二乗支払額の複製価格を照合します。[テスト](assets/tests/test_risk_neutral_check.py)と[実行方法](assets/README.md)も添付します。標本平均には統計誤差があるため、乱数推定値を理論値へ厳密一致させてはいけません。数値積分には区間切断・台形近似の誤差があり、両者を区別します。比較表で $P$ と $Q$ の違いを説明できるため、新しい図は追加しません。

## 9. 演習と詳細解答

以下は明記しない限り本講の無配当・定数係数・有限満期モデル（時刻は年、通貨は円、$B_0=1$、$\sigma>0$）で、確率測度 $P$ の下の株価 SDE から開始します。

<a id="ex-u3-15-a1"></a>
### A1：市場価格リスクの符号
- Level: A

$\mu=0.10,r=0.02,\sigma=0.40,T=2$ とする。$\theta$、$Z_T$、$W_t^Q$ と $Q$ の下の株価ドリフトを求めよ。

<!-- solution-start -->
**詳細解答**：$\sigma>0$ だから $\theta=(0.10-0.02)/0.40=0.20$。従って [測度構成定理](#thm-u3-15-risk-neutral-measure)へ代入すると

$$
Z_T=\exp(-0.20W_2^P-\tfrac12(0.20)^2\cdot2)
=e^{-0.20W_2^P-0.04},\qquad W_t^Q=W_t^P+0.20t.
$$

$P$ の式 $dS=0.10Sdt+0.40SdW^P$ に $dW^P=dW^Q-0.20dt$ を代入するとドリフト係数は $0.10-0.40(0.20)=0.02=r$ です。$W^Q$ の符号を負にすると逆方向へ動いてしまいます。
<!-- solution-end -->

<a id="ex-u3-15-a2"></a>
### A2：二つの割引平均
- Level: A

$s_0=100,\mu=0.08,r=0.03,\sigma=0.20,T=1$ とする。$E_P[e^{-rT}S_T]$ と $E_Q[e^{-rT}S_T]$ を求めよ。ここで $Q$ は第3節の構成とする。

<!-- solution-start -->
**詳細解答**：[GBM の平均](../U3-14/index.md#prop-u3-14-moments)から $E_P[S_T]=100e^{0.08}$ なので、預金で割ると $E_P[e^{-0.03}S_T]=100e^{0.05}$ 円。[リスク中立測度](#thm-u3-15-risk-neutral-measure)ではドリフトが $r$ になり、同じ公式を $Q$ に適用して $E_Q[S_T]=100e^{0.03}$。よって $E_Q[e^{-0.03}S_T]=100$ 円。実際の平均と評価の平均は一致する必要がありません。
<!-- solution-end -->

<a id="ex-u3-15-a3"></a>
### A3：Novikov 条件を確認する
- Level: A

$\mu-r=-0.03,\sigma=0.15,T=4$ とする。$\theta$ と Novikov 条件の左辺を計算し、$Q\sim P$ が得られる理由を述べよ。

<!-- solution-start -->
**詳細解答**：$\theta=-0.03/0.15=-0.20$。従って [Novikov 条件](../../../解析系/STO/STO10/index.md#thm-sto10-novikov)の期待値は

$$
E_P\!\left[e^{\frac12\int_0^4\theta^2du}\right]
=e^{\frac12(0.04)(4)}=e^{0.08}<\infty.
$$

[STO10 の Girsanov 定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)から $E_P[Z_4]=1$。指数密度 $Z_4=e^{-\theta W_4^P-\theta^2(4)/2}$ は全ての経路で正です。従って $Q(A)=E_P[Z_4\mathbf1_A]$ は全確率1を持ち、$Q(A)=0$ と $P(A)=0$ は同値です。
<!-- solution-end -->

<a id="ex-u3-15-a4"></a>
### A4：一定保有の複製
- Level: A

$s_0=80,r=0.04,T=2$ のとき、満期支払額 $H=3S_T-10B_T$ を複製する戦略、初期価値、時点 $t$ の価値を求めよ。

<!-- solution-start -->
**詳細解答**：[連続時間の自己金融戦略](#def-u3-15-self-financing)で定数保有 $\Delta_t=3,\psi_t=-10$ とすれば $V_t=3S_t-10B_t$。積分形の自己金融条件は $V_t-V_0=3(S_t-S_0)-10(B_t-B_0)$ で満たされます。初期価値は $V_0=3\cdot80-10=230$ 円、各時点の価値は $3S_t-10e^{0.04t}$ 円、満期で所定の $H$ を得ます。負の預金保有は借入れを表します。
<!-- solution-end -->

<a id="ex-u3-15-a5"></a>
### A5：測度を変えずに割り引く
- Level: A

$\mu=0.09,r=0.03,\sigma=0.20$ とする。$P$ の下で $E_P[\widetilde S_1\mid\mathcal F_0]$ を計算し、$\widetilde S$ が $P$-マルチンゲールではないことを示せ。

<!-- solution-start -->
**詳細解答**：[条件付き平均公式](../U3-14/index.md#prop-u3-14-conditional)に $\mu=0.09$、$u=0,t=1$ を入れると $E_P[S_1]=s_0e^{0.09}$。$\widetilde S_1=e^{-0.03}S_1$ より $E_P[\widetilde S_1]=s_0e^{0.06}\ne s_0=\widetilde S_0$。$s_0>0$ なので差は厳密に正です。従って $P$ のまま割り引く操作だけではマルチンゲールになりません。
<!-- solution-end -->

<a id="ex-u3-15-b1"></a>
### B1：密度過程を使う条件付き期待値
- Level: B

$Z_t=E_P[Z_T\mid\mathcal F_t]>0$ かつ $dQ=Z_T\,dP$ とする。$Q$-可積分な確率変数 $X$ に対して

$$
E_Q[X\mid\mathcal F_t]
=\frac{E_P[Z_TX\mid\mathcal F_t]}{Z_t}
$$

を示せ。これを $X=e^{-rT}S_T$ に適用し、何が検証できるか述べよ。

<!-- solution-start -->
**詳細解答**：[密度過程の定義](../../../解析系/STO/STO10/index.md#def-sto10-density-process)で $Z_t>0$ です。右辺を $Y$ と置き、任意の $A\in\mathcal F_t$ に対して

$$
\begin{aligned}
E_Q[\mathbf1_A Y]
&=E_P[Z_T\mathbf1_A Y]
=E_P[Z_t\mathbf1_A Y]\\
&=E_P[\mathbf1_A E_P[Z_TX\mid\mathcal F_t]]
=E_P[\mathbf1_A Z_TX]
=E_Q[\mathbf1_A X].
\end{aligned}
$$

最初と最後は測度変換、二行目の $Z_T\to Z_t$ は $Y\mathbf1_A$ が $\mathcal F_t$-可測なこと（非有界なら切断で近似）、次は条件付き期待値の定義です。$Y$ は $\mathcal F_t$-可測かつ $Q$-可積分なので、条件付き期待値の特徴付けから結論が出ます。$X=e^{-rT}S_T$ とすれば、[割引株価の $Q$-マルチンゲール性](#thm-u3-15-risk-neutral-measure)から右辺は $e^{-rt}S_t$ に一致します。
<!-- solution-end -->

<a id="ex-u3-15-b2"></a>
### B2：拡散が消えたときの確定裁定
- Level: B

$s_0=100,\sigma=0,T=1,r=0.03,\mu=0.01$ とする。初期費用0で満期利益が必ず正になる戦略を示し、測度変換で問題を解決できない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：$\sigma=0$ では $S_t=100e^{0.01t}$、$B_t=e^{0.03t}$ と確定します。株式を1株空売り（$\Delta=-1$）し、受取った100円を預金へ入れる（$\psi=100$）と初期価値は $-100+100=0$ 円です。満期は

$$
V_1=-100e^{0.01}+100e^{0.03}
=100(e^{0.03}-e^{0.01})>0.
$$

指数関数は狭義単調で $0.03>0.01$ なので正です。同じ確定値の経路の重みを変えても $\widetilde S_t=100e^{-0.02t}$ は定数の非一定関数のままで、マルチンゲールにはなりません。$\theta=(\mu-r)/\sigma$ も定義不能です。
<!-- solution-end -->

<a id="ex-u3-15-b3"></a>
### B3：二乗支払額のヘッジ比率の導出
- Level: B

$H=S_T^2/K$、$K>0$ とし、$v(t,s)=s^2e^{(r+\sigma^2)(T-t)}/K$ を与える。$Q$ の下の Itô 公式から $d(v(t,S_t)/B_t)=\Delta_t\,d(S_t/B_t)$ を示し、$\Delta_t$ と $\psi_t$ を求めよ。

<!-- solution-start -->
**詳細解答**：$a=r+\sigma^2$ とおき、[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)に必要な偏微分を順に計算します。

$$
v_t=-av,\quad v_s=2se^{a(T-t)}/K,\quad
v_{ss}=2e^{a(T-t)}/K.
$$

[リスク中立測度構成](#thm-u3-15-risk-neutral-measure)により $dS=rSdt+\sigma SdW^Q$ です。従って

$$
dv=(-av+2rv+\sigma^2v)dt+\sigma Sv_s\,dW^Q
=rv\,dt+\sigma Sv_s\,dW^Q.
$$

積の法則で $d(e^{-rt}v)=e^{-rt}(dv-rvdt)=e^{-rt}\sigma Sv_s\,dW^Q$、一方 $d(e^{-rt}S)=e^{-rt}\sigma S\,dW^Q$ です。係数が一致するには $\Delta_t=v_s(t,S_t)=2S_te^{a(T-t)}/K$ と置けばよく、価値の恒等式 $v=\Delta S+\psi B$ から $\psi_t=(v-\Delta_tS_t)/B_t=-v(t,S_t)/B_t$ です。よって [割引自己金融条件](#prop-u3-15-discounted-wealth)を満たします。
<!-- solution-end -->

<a id="ex-u3-15-b4"></a>
### B4：実確率と評価測度の上昇確率
- Level: B

$s_0=K=100,\mu=0.08,r=0.03,\sigma=0.20,T=1$ とする。$P(S_T>K)$ と $Q(S_T>K)$ を標準正規分布の累積分布関数 $\Phi$ で表し、差が生じる理由を説明せよ。

<!-- solution-start -->
**詳細解答**：[GBM の対数正規分布](../U3-14/index.md#prop-u3-14-lognormal-law)により、$P$ での $\log(S_1/100)$ は $N(0.08-0.20^2/2,0.20^2)=N(0.06,0.04)$ です。従って $P(S_1>100)=P(Z>-0.30)=\Phi(0.30)\approx0.6179$（$Z\sim N(0,1)$）。[リスク中立変換](#thm-u3-15-risk-neutral-measure)ではドリフトが $r$ に替わり、$Q$ での対数平均は $0.03-0.02=0.01$ なので $Q(S_1>100)=\Phi(0.01/0.20)=\Phi(0.05)\approx0.5199$。$\sigma$ と標本路空間を同じに保ち、経路の重みを変更したため差が出ます。
<!-- solution-end -->

<a id="ex-u3-15-c1"></a>
### C1：$P$ から測度を構成し、非線形支払額を複製する
- Level: C

$s_0=100$ 円、$T=1$ 年、$\mu=0.08$、$r=0.03$、$\sigma=0.20$、$K=100$ 円とし、満期請求権 $H=S_T^2/K$ を考える。 (i) $Z_T$ と $W^Q$ を構成し Novikov 条件と同値性を検証せよ。 (ii) $Q$ 下の割引期待値から時点 $t$ の価格関数を求めよ。 (iii) 株式・預金の自己金融保有量を求め、満期複製を検証せよ。 (iv) $P$ 下の単純な割引期待値を価格にしてはいけない理由を計算で示せ。

<!-- solution-start -->
**詳細解答**：

(i) $\theta=(0.08-0.03)/0.20=0.25$ なので

$$
Z_T=e^{-0.25W_1^P-0.03125},\qquad W_t^Q=W_t^P+0.25t.
$$

[Novikov 条件](../../../解析系/STO/STO10/index.md#thm-sto10-novikov)の左辺は $e^{\theta^2T/2}=e^{0.03125}<\infty$ です。[Girsanov 定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)で $E_P[Z_T]=1$ となり、$Z_T>0$ だから $P\sim Q$。$Q$ の SDE は $dS=0.03Sdt+0.20SdW^Q$ です。

(ii) [GBM の条件付き二次モーメント](../U3-14/index.md#prop-u3-14-conditional)で $\tau=1-t$ として

$$
E_Q[S_1^2\mid\mathcal F_t]
=S_t^2e^{(2\cdot0.03+0.20^2)\tau}=S_t^2e^{0.10\tau}.
$$

割引して $v(t,s)=s^2e^{(0.03+0.04)(1-t)}/100$ 円です。初期価格は $v(0,100)=100e^{0.07}\approx107.251$ 円。

(iii) $v_s=2se^{0.07(1-t)}/100$、$v_t=-0.07v$、$v_{ss}=2e^{0.07(1-t)}/100$ です。[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)で

$$
\begin{aligned}
dv&=(-0.07v+0.03\cdot2v+\tfrac12\cdot0.04\cdot2v)dt
+0.20S_tv_s\,dW^Q\\
&=0.03vdt+0.20S_tv_s\,dW^Q.
\end{aligned}
$$

割引して $d(v/B)=v_s\,d(S/B)$。よって [自己金融条件の割引形](#prop-u3-15-discounted-wealth)により $\Delta_t=2S_te^{0.07(1-t)}/100$ 株、$\psi_t=(v-\Delta S)/B=-v/B$ 単位の預金を保有すれば自己金融です。$\Delta_0=2e^{0.07}$ 株、$\psi_0=-100e^{0.07}$ で、$t=1$ には $v(1,S_1)=S_1^2/100=H$。[GBM のモーメント](../U3-14/index.md#prop-u3-14-moments)で必要な二乗可積分性も成立します。

(iv) $P$ の下では [二次モーメント](../U3-14/index.md#prop-u3-14-moments)により

$$
E_P[e^{-0.03}S_1^2/100]
=100e^{(2\cdot0.08+0.04-0.03)}
=100e^{0.17}.
$$

これは $Q$ の $100e^{0.07}$ と一致しません。$P$ の平均には実世界のドリフト $\mu$ が残っており、(iii) で実際に複製できる費用とは異なります。$Q$ による価格付けは単なる記号の交換ではなく、同値な測度を作り、割引マルチンゲールと複製を照合した結果です。
<!-- solution-end -->

**次講への接続**：本講では二乗支払額という一つの $v(t,s)$ について自己金融を直接確かめました。次講では任意の十分滑らかな $v$ とヘッジ比率を扱い、保有額の調整で Brown 運動の係数を相殺する条件から Black–Scholes–Merton 方程式を導きます。
