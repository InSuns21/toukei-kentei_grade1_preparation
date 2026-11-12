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

