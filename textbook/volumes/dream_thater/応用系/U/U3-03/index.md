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

