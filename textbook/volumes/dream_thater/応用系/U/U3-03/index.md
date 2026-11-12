# U3-03 多期間二項モデルと割引マルチンゲール

<!-- definition-example-audit: strict -->

[前講のリスク中立評価式](../U3-02/index.md#prop-u3-02-risk-neutral-price)では、1期間後の二状態の受取額を平均して割り引きました。多期間でも同じ計算を後ろから反復できる理由を、条件付き期待値を使って説明します。

## 1. 経路と再結合する二項木

時点は $t=0,1,\ldots,N$（$N\ge1$）。株価初値を $S_0>0$ 円、上・下倍率を $u>d>0$、預金1期間元利倍率を $R>0$ とします。全時点・全節点で同一の倍率を使い、$0<d<R<u$ を仮定します。全枝が可能で配当・摩擦・債務不履行・空売りや借入制限はありません。[前講の無裁定定理](../U3-02/index.md#thm-u3-02-no-arbitrage)は各節点の1期間市場へ適用できます。

<a id="def-u3-03-tree"></a>

<!-- formal-statement-start -->
> **定義（多期間二項市場）**  
> 経路集合を $\Omega=\{U,D\}^N$ とし、経路 $\omega=(\omega_1,\ldots,\omega_N)$ の株価・預金を以下で定める。

$$
S_t(\omega)=S_0\prod_{j=1}^t m(\omega_j),
\qquad m(U)=u,\quad m(D)=d,\quad B_t=R^t.
$$

> 空積は1とする。時点 $t$ の金額 $X_t$ の割引値は $\widetilde X_t=X_t/R^t$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-03-tree -->
**定義の確認**：$N=2$、$S_0=100$ 円、$(u,d,R)=(6/5,9/10,21/20)$ では $0<d<R<u$。4経路の時点2の株価は $UU:144$、$UD:108$、$DU:108$、$DD:81$ 円、預金は全経路で $B_1=21/20$、$B_2=441/400$。株価108円へ2経路が**再結合**しますが、経路の履歴そのものは異なります。
<!-- definition-example-end -->

| 経路 | 時点0 | 時点1 | 時点2 |
| --- | ---: | ---: | ---: |
| $UU$ | 100 | 120 | 144 |
| $UD$ | 100 | 120 | 108 |
| $DU$ | 100 | 90 | 108 |
| $DD$ | 100 | 90 | 81 |

## 2. 時点別情報と条件付き平均

時点1で $U$ を観測すると、もう $DU,DD$ は起きません。しかし $UU$ と $UD$ の区別はまだできません。このように、時点 $t$ までの上・下の履歴が等しい経路の組を用います。

<a id="def-u3-03-information"></a>

<!-- formal-statement-start -->
> **定義（時点別情報）**  
> $\Omega=\{U,D\}^N$ で最初の $t$ 文字が一致する経路を同じ組にまとめた分割を $\mathcal P_t$、その組の合併全体からなる事象族を $\mathcal F_t$ とする。実数値関数 $X_t$ が分割の各組上で一定のとき、$X_t$ は時点 $t$ の情報に適合する（$\mathcal F_t$-可測）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-03-information -->
**定義の確認**：$N=2$ では $\mathcal P_1=\{\{UU,UD\},\{DU,DD\}\}$ です。$S_1$ は前者で120円、後者で90円と一定なので適合します。一方、$UU$ でだけ1となる関数は同じ組 $\{UU,UD\}$ の中で値が変わり、時点1には適合しません。$\mathcal P_0=\{\Omega\}$、$\mathcal P_2$ は4つの単集合です。
<!-- definition-example-end -->

[前講のリスク中立確率](../U3-02/index.md#def-u3-02-risk-neutral)を各枝に適用します。現実の経路の確率 $P$ を推定するのではなく、市場価格と整合する評価用の確率 $Q$ を構成します。

<a id="def-u3-03-path-measure"></a>

<!-- formal-statement-start -->
> **定義（多期間の評価用確率）**  
> $0<d<R<u$ とし、各上枝の確率を $q=(R-d)/(u-d)$、下枝の確率を $1-q$ とする。上枝が $k_N(\omega)$ 本の経路 $\omega$ の確率を

$$
Q(\{\omega\})=q^{k_N(\omega)}(1-q)^{N-k_N(\omega)}
$$

> と定める。この評価用確率を $Q$ と呼び、その期待値を $E_Q$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-03-path-measure -->
**定義の確認**：$u=6/5,d=9/10,R=21/20$ では $q=(21/20-9/10)/(6/5-9/10)=1/2$。$N=2$ の4経路の確率は各 $1/4>0$、和は1です。$U$ を観測した条件下の経路は $UU,UD$ で、どちらも条件付き確率 $1/2$ です。
<!-- definition-example-end -->

一般にも $0<q<1$ なので全経路は正の確率を持ち、総和は二項定理から

$$
\sum_{\omega\in\Omega}Q(\{\omega\})
=\sum_{k=0}^N{N\choose k}q^k(1-q)^{N-k}
=(q+1-q)^N=1
$$

です。

時点 $t$ の条件付き期待値 $E_Q[Y\mid\mathcal F_t]$ は、実現した履歴で始まる経路だけを条件付き確率で平均した値です。$Y$ が次の時点の情報で決まるなら、次の上枝・下枝の二つの値だけを平均すればよいことになります。

<a id="prop-u3-03-conditional-average"></a>

<!-- formal-statement-start -->
> **命題（次の一歩の条件付き平均）**  
> $t<N$ とし、$Y$ は $\mathcal F_{t+1}$-可測な実数値関数とする。時点 $t$ の任意の履歴 $h$ で、直後の上・下の値を $Y_U,Y_D$ と書けば

$$
E_Q[Y\mid\mathcal F_t](h)=qY_U+(1-q)Y_D
$$

> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

履歴 $h$ で始まる経路の集合を $A_h$ と書く。残る $N-t$ 枝の確率の和は1だから、

$$
Q(A_h)=q^{k_t(h)}(1-q)^{t-k_t(h)}>0.
$$

次が上枝の集合 $A_{hU}$ と下枝の集合 $A_{hD}$ に分割すると、$Q(A_{hU})=qQ(A_h)$、$Q(A_{hD})=(1-q)Q(A_h)$。$Y$ は各集合の中で一定なので、条件付き平均の有限和は

$$
\frac{Y_UQ(A_{hU})+Y_DQ(A_{hD})}{Q(A_h)}
=\frac{Y_UqQ(A_h)+Y_D(1-q)Q(A_h)}{Q(A_h)}
=qY_U+(1-q)Y_D.
$$

任意の履歴で成り立ち、右辺はその履歴だけで決まります。
<!-- proof-end -->

これは $Y$ が次の時点で決まる場合の公式です。満期までの全経路に依存する $H$ には、途中の価値を先に後ろから計算してから適用します。

## 3. 割引株価のマルチンゲール性

$Q$ の下で、株価の次期条件付き平均は $S_t\{qu+(1-q)d\}=RS_t$ となります。これは株価が「平均として毎期 $R$ 倍になる」という意味です。預金の確定成長を割り引いて取り除くと、現在値と次期の条件付き平均が等しくなります。この性質をマルチンゲールと呼びます。

<a id="def-u3-03-martingale"></a>

<!-- formal-statement-start -->
> **定義（離散時間マルチンゲール）**  
> 有限確率空間 $(\Omega,Q)$ 上の各時点の情報 $\mathcal F_t$ に対し、実数値確率変数列 $(M_t)_{t=0}^N$ が各時点で $\mathcal F_t$-可測、$E_Q[|M_t|]<\infty$ であり、全ての $t<N$ で

$$
E_Q[M_{t+1}\mid\mathcal F_t]=M_t
$$

> を満たすとき、$(M_t)$ を $Q$-マルチンゲールという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-03-martingale -->
**定義の確認**：上の2期間例で $M_t=S_t/R^t$ と置きます。株価は時点 $t$ の履歴のみで決まり、有限集合上で値も有限です。$U$ を観測した時点1では次期の割引株価の平均は $(144+108)/(2R^2)=126/R^2=120/R=M_1(U)$。$D$ の節点では $(108+81)/(2R^2)=(189/2)/R^2=90/R=M_1(D)$。時点0では $(120+90)/(2R)=105/R=100=M_0$ です。全ての時点・節点で条件を確かめました。
<!-- definition-example-end -->

<a id="thm-u3-03-stock-martingale"></a>

<!-- formal-statement-start -->
> **定理（割引株価のマルチンゲール性）**  
> $N\ge1$、$S_0>0$、$0<d<R<u$、各期・各節点で一定の倍率 $u,d,R$、全枝が可能な多期間二項市場とする。[評価用確率](#def-u3-03-path-measure) $Q$ の下では、

$$
\widetilde S_t=S_t/R^t,\qquad 0\le t\le N
$$

> は[マルチンゲール](#def-u3-03-martingale)である。
<!-- formal-statement-end -->

**証明の見取り図**：時点 $t$ の履歴を固定して次の上・下の株価を求め、[前講のリスク中立確率](../U3-02/index.md#prop-u3-02-risk-neutral-price)が満たす $qu+(1-q)d=R$ を代入します。

<!-- proof-start -->
### 証明

$S_t$ は最初の $t$ 枝だけで決まるので $\mathcal F_t$-可測であり、有限集合上で有限値だから可積分です。任意の履歴 $h$ で、上・下の次期株価は $uS_t(h)$ と $dS_t(h)$ です。[条件付き平均命題](#prop-u3-03-conditional-average)より

$$
E_Q[\widetilde S_{t+1}\mid\mathcal F_t](h)
=\frac{quS_t(h)+(1-q)dS_t(h)}{R^{t+1}}
$$

$$
=\frac{S_t(h)}{R^{t+1}}\{qu+(1-q)d\}
=\frac{S_t(h)}{R^{t+1}}R
=\widetilde S_t(h).
$$

[前講の1期間評価公式](../U3-02/index.md#prop-u3-02-risk-neutral-price)で $q=(R-d)/(u-d)$ とした結果から、$qu+(1-q)d=R$ です。任意の $t<N$ と履歴 $h$ で成立するので結論が従います。
<!-- proof-end -->

ここでのマルチンゲール性は評価用 $Q$ に関する主張です。実確率 $P$ で上枝確率を $p$ とすると、一般に $pu+(1-p)d\ne R$ なので、割引株価が $P$-マルチンゲールになるとは限りません。

## 4. 後退帰納法と条件付き期待値の一致

満期 $N$ の実数値受取額 $H:\Omega\to\mathbb R$ を指定します。$H$ は有限集合上の関数なので可積分です。満期では経路全体が分かり、$H$ は $\mathcal F_N$-可測です。満期値を始点に、2枝の平均を1期間ずつ割り引いて戻ります。

<a id="def-u3-03-backward-value"></a>

<!-- formal-statement-start -->
> **定義（後退帰納評価）**  
> $N\ge1$ の多期間二項市場で実数値満期請求権 $H$ を固定する。$V_N(\omega)=H(\omega)$ とし、$t=N-1,\ldots,0$ の各履歴 $h$ に対し

$$
V_t(h)=\frac{qV_{t+1}(hU)+(1-q)V_{t+1}(hD)}{R}
$$

> と定める。この列 $(V_t)$ を後退帰納評価と呼び、$V_t$ は時点 $t$ の円建て価値を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-03-backward-value -->
**定義の確認**：$N=2$、$q=1/2$、$R=21/20$ とし、満期 $UU,UD,DU,DD$ の受取額が $44,8,8,0$ 円なら、時点1で $V_1(U)=(44+8)/(2R)=520/21$ 円、$V_1(D)=(8+0)/(2R)=80/21$ 円。時点0に戻すと $V_0=(520/21+80/21)/(2R)=2000/147$ 円です。最初に $V_2=H$ を指定したので、全ての節点が定義に従っています。
<!-- definition-example-end -->

<a id="thm-u3-03-backward-conditional"></a>

<!-- formal-statement-start -->
> **定理（後退帰納と条件付き期待値の一致）**  
> $N\ge1$、$S_0>0$、$0<d<R<u$、各期一定の $u,d,R$ を持つ多期間二項市場と、その[評価用確率](#def-u3-03-path-measure) $Q$ を考える。任意の実数値満期請求権 $H:\Omega\to\mathbb R$ の[後退帰納評価](#def-u3-03-backward-value)は

$$
\frac{V_t}{R^t}=E_Q\!\left[\frac{H}{R^N}\,\middle|\,\mathcal F_t\right],
\qquad t=0,1,\ldots,N.
$$

> 特に $V_0=R^{-N}E_Q[H]$ であり、列 $(V_t/R^t)$ は $Q$-マルチンゲールである。
<!-- formal-statement-end -->

**証明の見取り図**：条件付き期待値を履歴ごとに残りの枝で有限和に展開し、その和を次期の上・下の二つへ分割します。帰納法で計算を後ろから戻すと定義の漸化式になります。

<!-- proof-start -->
### 証明

時点 $N$ では全経路が判明するので、$E_Q[H/R^N\mid\mathcal F_N]=H/R^N=V_N/R^N$ です。

時点 $t$ の履歴 $h$ を固定します。後に続く長さ $N-t$ の経路 $a$ に上枝が $k(a)$ 本あるとき、履歴 $h$ を知った上での条件付き確率は

$$
w_{N-t}(a)=q^{k(a)}(1-q)^{N-t-k(a)}
$$

です。なぜなら経路 $ha$ の確率を、正の確率 $Q(A_h)$ で割るとこの重みが残るからです。したがって、

$$
E_Q[H/R^N\mid\mathcal F_t](h)
=\frac1{R^N}\sum_{a\in\{U,D\}^{N-t}}w_{N-t}(a)H(ha).
$$

これが $V_t(h)/R^t$ に等しいことを逆向き帰納法で示します。$t+1$ で成立すると仮定して、残り経路を次の一枝で分けます。

$$
\sum_a w_{N-t}(a)H(ha)
=q\sum_z w_{N-t-1}(z)H(hUz)
+(1-q)\sum_z w_{N-t-1}(z)H(hDz).
$$

帰納法の仮定から第一の和は $R^{N-t-1}V_{t+1}(hU)$、第二の和は $R^{N-t-1}V_{t+1}(hD)$。代入して

$$
E_Q[H/R^N\mid\mathcal F_t](h)
=\frac{qV_{t+1}(hU)+(1-q)V_{t+1}(hD)}{R^{t+1}}
=\frac{V_t(h)}{R^t}.
$$

最後の等号は[後退帰納評価の定義](#def-u3-03-backward-value)です。時点0では情報が自明だから $V_0=R^{-N}E_Q[H]$ です。

さらに $M_t=V_t/R^t$ は $\mathcal F_t$-可測かつ可積分です。[次の一歩の条件付き平均](#prop-u3-03-conditional-average)と後退式から、

$$
E_Q[M_{t+1}\mid\mathcal F_t]
=\frac{qV_{t+1}(hU)+(1-q)V_{t+1}(hD)}{R^{t+1}}
=\frac{V_t(h)}{R^t}=M_t.
$$

これは任意の履歴で成り立つので[マルチンゲールの定義](#def-u3-03-martingale)を満たします。
<!-- proof-end -->

満期受取額 $H$ が途中の経路の順序に依存していてもこの定理は成立します。しかし再結合した経路を同じ状態へまとめられるとは限りません。

### 株価だけに依存する請求権の二項和

満期の受取額が $H=f(S_N)$ なら、満期株価は上枝の本数 $k$ だけで決まるので経路の順序をまとめられます。

<a id="prop-u3-03-binomial-sum"></a>

<!-- formal-statement-start -->
> **命題（満期株価だけに依存する請求権の二項和）**  
> [後退帰納定理](#thm-u3-03-backward-conditional)の仮定の下、満期株価の有限集合上の実数値関数 $f$ に対して $H=f(S_N)$ とする。このとき

$$
V_0=\frac1{R^N}\sum_{k=0}^N \binom{N}{k}
q^k(1-q)^{N-k}f(S_0u^kd^{N-k}).
$$

> 時点 $t$ の再結合節点は $t+1$ 個、全時点の節点総数は $(N+1)(N+2)/2$ 個である。全経路数は $2^N$ 本である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[後退帰納定理](#thm-u3-03-backward-conditional)により $V_0=R^{-N}\sum_{\omega\in\Omega}Q(\{\omega\})H(\omega)$。上枝が $k$ 本の経路は $\binom{N}{k}$ 本で、全て重み $q^k(1-q)^{N-k}$ と同じ受取額 $f(S_0u^kd^{N-k})$ を持ちます。$k$ ごとに項をまとめると二項和が得られます。

時点 $t$ の株価は $S_0d^t(u/d)^k$、$k=0,\ldots,t$ であり、$u/d>1$ なので異なる値です。従って節点総数は

$$
\sum_{t=0}^N(t+1)=\frac{(N+1)(N+2)}2.
$$

各節点を一度だけ評価すれば $O(N^2)$ 回の四則演算で済みます。**経路依存で履歴を消せない商品にはこの計算量を保証できません**。
<!-- proof-end -->

