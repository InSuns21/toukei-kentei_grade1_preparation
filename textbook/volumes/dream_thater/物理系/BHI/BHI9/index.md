# BHI9 Mathurのsmall-corrections制約

<!-- definition-example-audit: strict -->

## 1. 「一対を少し修正する」だけでPage曲線は折り返すか

[BHI3の独立な対生成模型](../BHI3/index.md#thm-bhi3-entropy-growth)では、外へ出た放射の精細エントロピーが一段ごとに増えました。一方、[BHI6のユニタリ蒸発の必要条件](../BHI6/index.md#thm-bhi6-turnover-necessary)は、途中で混合化した放射が最後に純粋になるためには、いつか放射エントロピーが**減らなければならない**ことを示します。この二つの要請はどれほど強く衝突するのでしょうか。

「対が厳密なBell状態ではない」「新しい対が以前の放射と少し相関する」という修正を考えます。ここで重要なのは、**何をどの意味で小さいとするか**です。今回の問いは、放出したばかりの外部モードとその内部相手の**二部縮約状態**がほぼ純粋なBell対のままであれば、古い放射との相関をどれだけ巧妙に選んでも増分を負にできるか、です。

以下は有限次元の量子情報模型です。系を指定せずに曲がった時空の場の局所代数へ適用した結果ではありません。エントロピーは $S(X)=-\operatorname{Tr}(\rho_X\ln\rho_X)$（単位 nat）で、$0\ln0=0$ とします。[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)で使ったbit値の $\ln2$ 倍です。

## 2. 放出前と放出後の系を固定する

放出前に遠方へ逃れたすべての放射を $R$、今回新しく外へ出る量子ビットを $b$、その内側の相手量子ビットを $c$ とします。放出後の全放射は $Rb$ です。$b,c$ 以外の残存ブラックホール側の自由度を $E$ とします。$E$ は放出後に残る**物理的な系**を指し、第4節で任意の混合状態を純粋化するために導入する補助系 $D$ と同一視しません。略記 $XY$ は $\mathcal H_X\otimes\mathcal H_Y$、$\rho_{XY}$ は[QINF3の部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)で全体から他の系を除いた状態です。

放出前の残存側全体を $B_{\rm old}$ と書きます。次の状態分割が本講義の作業場です。

| 区分 | 一歩前 | 一歩後 |
| --- | --- | --- |
| 遠方放射 | $R$ | $Rb$ |
| 残存側 | $B_{\rm old}$ | $cE$ |
| 一歩の精細エントロピー | $S(R)$ | $S(Rb)$ |

**同じ古い放射 $R$ はこの一歩で操作しない**と仮定します。古い放射へ後から直接作用する機構がある場合には、ここで比較する前後の $\rho_R$ が一致するかを改めて調べる必要があります。

<a id="def-bhi9-emission-increment"></a>

<!-- formal-statement-start -->
> **定義（外部放射の一歩増分）**
>
> 有限次元三部状態 $\rho_{Rbc}$ に対し、古い放射 $R$ を保持したまま新しい量子ビット $b$ を放射側へ追加したときの精細エントロピー増分を

$$
\Delta_R(b):=S(Rb)-S(R)=S(b|R)
$$

> と定める。右端の条件付きエントロピーは[QINF18の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-conditional)である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi9-emission-increment -->
**定義の確認**：$R,b$ がそれぞれqubitで $\rho_{Rb}=\lvert\Phi\rangle\langle\Phi\rvert$、
$\lvert\Phi\rangle=(\lvert00\rangle+\lvert11\rangle)/\sqrt2$ とします。$Rb$ の全状態は純粋なので $S(Rb)=0$、部分トレースは $\rho_R=I_2/2$ なので $S(R)=\ln2$ です。したがって $\Delta_R(b)=-\ln2$。放出モード $b$ は単独では最大混合でも、古い放射 $R$ との量子相関によって**全放射の精細エントロピーは減り得る**ことが、定義から確認できます。
<!-- definition-example-end -->

[BHI6の放出増分と相関条件](../BHI6/index.md#prop-bhi6-emission-increment)から、負の増分には $I(R:b)>S(b)$ が必要です。しかしこの条件だけでは、今回の内外対 $bc$ の状態がHawking対に近いかは分かりません。そこで、内外対の**共同状態**を測ります。

## 3. 内外対への小補正をどう測るか

比較基準となるHawking対の二準位玩具模型は、[BHI2の内外対](../BHI2/index.md#def-bhi2-pair)の最大もつれの場合です。位相を固定して

$$
\lvert\Phi\rangle_{bc}
=\frac{\lvert0\rangle_b\lvert0\rangle_c+\lvert1\rangle_b\lvert1\rangle_c}{\sqrt2},
\qquad
\Phi_{bc}:=\lvert\Phi\rangle\langle\Phi\rvert
$$

と書きます。部分トレースで $\Phi_c=I_2/2$、$S(c)_\Phi=\ln2$、$S(bc)_\Phi=0$ です。$bc$ 全体は純粋で、その一方 $c$ 単独は最大混合、という組合せが核心です。

<a id="def-bhi9-entropy-smallness"></a>

<!-- formal-statement-start -->
> **定義（エントロピーによるsmall-corrections条件）**
>
> 有限次元状態 $\rho_{Rbc}$ で $b,c$ が各二次元とする。数 $\varepsilon\ge0$ について、その放出一歩の内外対が **$\varepsilon$-小補正条件**を満たすとは、次の両方が成立することをいう。

$$
S(bc)\le\varepsilon,\qquad
S(c)\ge\ln2-\varepsilon.
$$

> 条件は$\rho_{bc}$と$\rho_c$への条件であり、$\rho_{Rbc}=\rho_R\otimes\rho_{bc}$ のような新規対と古い放射の独立性は仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi9-entropy-smallness -->
**定義の確認**：任意の $\rho_R$ と $\Phi_{bc}$ の積 $\rho_R\otimes\Phi_{bc}$ を取ります。$\rho_{bc}=\Phi_{bc}$ は階数1の射影で $S(bc)=0$、$\rho_c=I_2/2$ は固有値 $(1/2,1/2)$ なので $S(c)=\ln2$。ゆえに**二条件とも** $\varepsilon=0$ で満たされます。$\varepsilon>0$ の非積状態を第6節で実際に構成します。
<!-- definition-example-end -->

注意すべきは、$S(b)\simeq\ln2$ **だけ**をsmall-corrections条件としない点です。$b$ は古い放射 $R$ とBell対を作る場合も単独では最大混合です。その状態では内部相手 $c$ との純粋対は存在しません。

## 4. 強劣加法性から放出増分の下界を得る

必要な量子情報の道具は[QINF19の強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)です。通常の形 $S(AB)+S(BC)\ge S(B)+S(ABC)$ を、**純粋化を介して**今回欲しい形へ変えます。これを弱単調性と呼びます。

<a id="lem-bhi9-weak-monotonicity"></a>

<!-- formal-statement-start -->
> **補題（内外対を使う弱単調性）**
>
> 有限次元三部密度演算子 $\rho_{Rbc}$ について、

$$
S(Rb)+S(bc)\ge S(R)+S(c),
$$

> したがって

$$
\boxed{\Delta_R(b)\ge S(c)-S(bc)}
$$

> が成り立つ。$R$ と $bc$ が独立である必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

三部状態を補助系 $D$ によって純粋化すると、$RD$ と $bc$、$RbD$ と $c$ の縮約エントロピーがそれぞれ一致します。[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)の三部を **$b,R,D$ の順**に選ぶと、求める不等式が現れます。単に「強劣加法性より」と書いて符号を飛ばさず、どの系を代入するか確認しましょう。

<!-- proof-start -->
### 証明

有限次元の $\rho_{Rbc}$ を純粋化する補助Hilbert空間 $D$ と規格化ベクトル $\lvert\Psi\rangle_{RbcD}$ を取ります。[QINF17の純粋二部系の縮約エントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)により、全体系が純粋であるとき互いに補な部分系のエントロピーは一致します。具体的には

$$
S(RD)=S(bc),\qquad S(RbD)=S(c).
$$

[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)に $A=b,B=R,C=D$ を代入すると

$$
S(bR)+S(RD)\ge S(R)+S(bRD).
$$

今得た二つの純粋系の恒等式を代入し、$S(bR)=S(Rb)$ を使うと

$$
S(Rb)+S(bc)\ge S(R)+S(c).
$$

両辺から $S(R)+S(bc)$ を引けば

$$
S(Rb)-S(R)\ge S(c)-S(bc)
$$

です。左辺は[一歩増分の定義](#def-bhi9-emission-increment)そのものです。
<!-- proof-end -->

<a id="thm-bhi9-small-corrections"></a>

<!-- formal-statement-start -->
> **定理（Mathur型small-correctionsの増分下界）**
>
> $R,b,c$ を有限次元三部系とし、$b,c$ はそれぞれ二次元であるとする。古い放射 $R$ は放出前後で同一の系として保たれ、放出後の状態 $\rho_{Rbc}$ が[ $\varepsilon$-小補正条件](#def-bhi9-entropy-smallness)を満たすとする。このとき

$$
\boxed{S(Rb)-S(R)\ge\ln2-2\varepsilon.}
$$

> 特に $0\le\varepsilon<(\ln2)/2$ なら増分は必ず正であり、古い放射と新しい対の独立性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

前の補題は古い放射の詳細をすべて消して、$S(c)-S(bc)$ だけで増分を下から挟みます。小補正条件の**二本**を別々に代入すれば定数 $2\varepsilon$ が現れます。

<!-- proof-start -->
### 証明

[弱単調性の補題](#lem-bhi9-weak-monotonicity)を $\rho_{Rbc}$ に適用すると

$$
\Delta_R(b)\ge S(c)-S(bc).
$$

[小補正条件](#def-bhi9-entropy-smallness)は $S(c)\ge\ln2-\varepsilon$ と $S(bc)\le\varepsilon$ です。従って

$$
\Delta_R(b)
\ge(\ln2-\varepsilon)-\varepsilon
=\ln2-2\varepsilon.
$$

$\varepsilon<(\ln2)/2$ なら右辺が正なので、$\Delta_R(b)>0$ です。証明で使ったのは有限次元の強劣加法性と**二つの局所的エントロピー評価**だけで、$\rho_{Rbc}$ の因数分解は使っていません。
<!-- proof-end -->

この下界は「小さい補正を何度も加えても、いつまでもHawking型の近純粋な対を放出する限り、放射エントロピーは増え続ける」という主張です。一歩の誤差が小さいことを、全履歴が何かの理想状態にノルムで近いことと混同する必要はありません。

## 5. トレース距離で「ほぼBell対」を確定する

前節の $\varepsilon$ はエントロピーを直接測った量です。より物理的には「対の縮約状態がBell対からトレース距離で近い」と指定することがあります。二つの密度演算子の**トレース距離**を

$$
T(\rho,\sigma)=\frac12\|\rho-\sigma\|_1,\qquad
\|X\|_1=\operatorname{Tr}\sqrt{X^\dagger X}
$$

とします。ここで $\rho,\sigma$ は同じ有限次元空間上の密度演算子です。距離の $1/2$ と部分トレースの扱いを確かめます。

$X=\rho-\sigma$ はトレース零のHermitian行列です。その正・負固有空間に対応する正値部分を $X_+,X_-$ とすると、$X=X_+-X_-$、$X_+X_-=0$ で、

$$
\operatorname{Tr}X_+=\operatorname{Tr}X_-=\frac12\|X\|_1=T(\rho,\sigma)
$$

となります。$0\le M\le I$ を満たす作用素 $M$ について、$0\le\operatorname{Tr}(MX_\pm)\le\operatorname{Tr}X_\pm$ なので

$$
-T(\rho,\sigma)\le\operatorname{Tr}(MX)\le T(\rho,\sigma).
$$

正固有空間への射影を $M$ に選ぶと右側の等号を達成するため、

$$
T(\rho,\sigma)=\max_{0\le M\le I}\operatorname{Tr}\bigl[M(\rho-\sigma)\bigr].
$$

特に任意の射影 $P$ は $0\le P\le I$ を満たすので、$|\operatorname{Tr}P(\rho-\sigma)|\le T(\rho,\sigma)$ です。また、[部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)から、系 $b$ を捨てる場合、残る系 $c$ 上の $0\le M_c\le I_c$ について

$$
\operatorname{Tr}\!\bigl[M_c(\rho_c-\sigma_c)\bigr]
=\operatorname{Tr}\!\bigl[(I_b\otimes M_c)(\rho_{bc}-\sigma_{bc})\bigr]
\le T(\rho_{bc},\sigma_{bc})
$$

です。左辺を $M_c$ 全体で最大化すると、**部分トレースではトレース距離が増えない**ことも分かります。

二値エントロピー関数は

$$
h_2(x)=-x\ln x-(1-x)\ln(1-x),\qquad
0\le x\le1
$$

です。端点は連続的に定めます。$h_2(1/2)=\ln2$、$h_2$ は $[1/2,1]$ で単調減少です。

<a id="def-bhi9-trace-smallness"></a>

<!-- formal-statement-start -->
> **定義（Bell対に対するトレース距離補正）**
>
> 有限次元状態 $\rho_{Rbc}$（$b,c$ はqubit）が $\delta$-近Bell条件を満たすとは、$0\le\delta\le1/2$ に対して、内外対の縮約が

$$
T(\rho_{bc},\Phi_{bc})\le\delta
$$

> を満たすことをいう。距離を測る対象は**共同状態 $\rho_{bc}$**であり、$\rho_b$ だけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi9-trace-smallness -->
**定義の確認**：$0\le\eta\le1/2$ とし、Bell状態に直交する $\lvert01\rangle$ を使って

$$
\rho_{bc}=(1-\eta)\Phi_{bc}+\eta\lvert01\rangle\langle01\rvert
$$

と置きます。両射影が直交するので $\rho_{bc}-\Phi_{bc}$ の非零固有値は $-\eta,\eta$ です。よって $\|\rho_{bc}-\Phi_{bc}\|_1=2\eta$、すなわち $T=\eta$。正性、トレース1、共同状態への距離の**すべて**を確認し、$\delta=\eta$ で定義を満たします。この状態の古い放射との相関は次の定理では制限しません。
<!-- definition-example-end -->

<a id="thm-bhi9-trace-bound"></a>

<!-- formal-statement-start -->
> **定理（トレース距離からの増分保証）**
>
> $R,b,c$ は有限次元、$b,c$ はqubitとし、$\rho_{Rbc}$ の縮約が[ $\delta$-近Bell条件](#def-bhi9-trace-smallness)を満たすとする。$0\le\delta\le1/2$ に対して

$$
\boxed{
\Delta_R(b)\ge
h_2\!\left(\frac12+\delta\right)-h_2(\delta)-\delta\ln3.
}
$$

> 特に右辺が正である $\delta$ では、$\rho_{Rbc}$ がどんな相関を持っていても放射エントロピーは減少しない。
<!-- formal-statement-end -->

### 証明の見取り図

トレース距離の仮定を **$S(c)$ の下界**と **$S(bc)$ の上界**に変換してから[弱単調性](#lem-bhi9-weak-monotonicity)へ代入します。$bc$ は四次元なので、Bell状態に直交する空間は三次元です。この $3$ が $\ln3$ の起源です。

<!-- proof-start -->
### 証明

まず部分トレースの距離収縮から

$$
T(\rho_c,I_2/2)
=T(\operatorname{Tr}_b\rho_{bc},\operatorname{Tr}_b\Phi_{bc})
\le\delta.
$$

qubit密度演算子 $\rho_c$ の固有値は $1/2+x,1/2-x$（$0\le x\le1/2$）と書けます。$I_2/2$ との差の固有値は $x,-x$ なので、距離は $x$ そのものです。従って $x\le\delta$、$h_2$ の単調性から

$$
S(c)=h_2(1/2+x)\ge h_2(1/2+\delta).
$$

次に $P=\Phi_{bc}$（階数1射影）、$Q=I_{bc}-P$（階数3射影）、$q=\operatorname{Tr}(Q\rho_{bc})$ とします。射影の距離評価を $Q$ に適用すると

$$
0\le q=|\operatorname{Tr}Q(\rho_{bc}-\Phi_{bc})|\le\delta.
$$

$\rho_{bc}$ の $P,Q$ 間の非対角ブロックを消す写像を $\mathcal P(\rho)=P\rho P+Q\rho Q$ とします。$P+Q=I$、$PQ=0$ なので $U=P-Q$ は $U^\dagger U=I$ を満たし、

$$
\mathcal P(\rho)=\frac12(\rho+U\rho U^\dagger)
$$

です。混合してもエントロピーが減らないことを、既習の[QINF18の対数比較補題](../../../応用系/QINF/QINF18/index.md#lem-qinf18-log)で確認します。$\tau=\mathcal P(\rho_{bc})$ とおくと、$\tau=(\rho_{bc}+U\rho_{bc}U^\dagger)/2$ は正値です。$\tau$ の核にあるベクトルではこの二つの正値項の期待値がともに零となり、$\rho_{bc}$ もそのベクトルを零へ写します。従って $\operatorname{supp}\rho_{bc}\subseteq\operatorname{supp}\tau$ であり、対数比較補題の台条件を満たします。

$\tau$ は $P,Q$ に関してブロック対角なので、$\ln\tau$ もその台の上でブロック対角です。よって非対角ブロックはトレースに寄与せず、

$$
\operatorname{Tr}(\rho_{bc}\ln\tau)
=\operatorname{Tr}(\tau\ln\tau).
$$

対数比較補題を自然対数へ換算すると

$$
\begin{aligned}
0&\le\operatorname{Tr}(\rho_{bc}\ln\rho_{bc})
-\operatorname{Tr}(\rho_{bc}\ln\tau)\\
&=S(\tau)-S(\rho_{bc}),
\end{aligned}
$$

従って $S(\rho_{bc})\le S(\tau)$ です。$\tau$ は重み $1-q$ の一次元ブロックと重み $q$ の三次元ブロックに分かれます。$q>0$ なら後者の規格化状態を $\omega=Q\rho_{bc}Q/q$ と置き、ブロックの固有値を使えば

$$
S(\tau)=h_2(q)+qS(\omega)\le h_2(q)+q\ln3
$$

です。最後の不等式は[QINF17のエントロピー次元上界](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)を三次元ブロックに適用しました。従って

$$
S(bc)\le h_2(q)+q\ln3.
$$

$q=0$ では三次元ブロックの項を0と読めば同じ式です。関数 $f(q)=h_2(q)+q\ln3$ の導関数は、$0<q<1$ で

$$
f'(q)=\ln\frac{3(1-q)}q.
$$

従って $f$ は $0\le q\le3/4$ で単調増加し、$q\le\delta\le1/2$ から

$$
S(bc)\le h_2(\delta)+\delta\ln3.
$$

最後に[弱単調性](#lem-bhi9-weak-monotonicity)へ二つの評価を代入します。

$$
\Delta_R(b)\ge S(c)-S(bc)
\ge h_2(1/2+\delta)-h_2(\delta)-\delta\ln3.
$$
<!-- proof-end -->

たとえば $\delta=0.1$ の場合、右辺は

$$
h_2(0.6)-h_2(0.1)-0.1\ln3
\simeq0.673012-0.325083-0.109861
\simeq0.238068\ {\rm nat}>0.
$$

ここには、古い放射との**独立性の仮定が一切ない**ことが重要です。トレース距離の小ささから、前節で用いたエントロピー小補正条件も、$\varepsilon=\max\{\ln2-h_2(1/2+\delta),h_2(\delta)+\delta\ln3\}$ を選べば従います。ただし二条件を同じ粗い $\varepsilon$ で束ねると、上の直接評価より弱くなる場合があります。

## 6. 相関した新規対の例と「局所的に熱的」の反例

小補正の定義は $R$ と $bc$ の独立性を要求しません。その違いを、厳密に計算できる三量子ビットで確認します。

$0\le\eta\le1/2$ とし、

$$
\lvert\Psi_\eta\rangle_{Rbc}
=\sqrt{1-\eta}\,\lvert0\rangle_R\lvert\Phi\rangle_{bc}
+\sqrt\eta\,\lvert1\rangle_R\lvert01\rangle_{bc}
$$

を取ります。二つの項は正規直交するため、全状態は規格化された純粋状態です。[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)で $R$ を跡消去すると、$\langle0|1\rangle_R=0$ により交差項が消え、第5節の $\rho_{bc}=(1-\eta)\Phi_{bc}+\eta|01\rangle\langle01|$ が出ます。二つの直交射影の重みがそのまま非零固有値 $1-\eta,\eta$ です。また、$b$ を跡消去すると

$$
\rho_c=\frac{1-\eta}{2}I_2+\eta|1\rangle\langle1|
=\operatorname{diag}\!\left(\frac{1-\eta}{2},\frac{1+\eta}{2}\right).
$$

よって

$$
S(bc)=h_2(\eta),\qquad
S(c)=h_2\!\left(\frac{1+\eta}{2}\right).
$$

さらに全体系 $Rbc$ が純粋なため、相補系のエントロピー一致から $S(Rb)=S(c)$、$S(R)=S(bc)$ です。ゆえに

$$
\boxed{\Delta_R(b)=h_2((1+\eta)/2)-h_2(\eta).}
$$

この例では**弱単調性の下界に等号が成立**します。$\eta=0.1$ なら $S(c)\simeq0.688139$、$S(bc)\simeq0.325083$、$\Delta\simeq0.363056>0$。$\rho_{Rbc}$ は $R$ と $bc$ の積ではないにもかかわらず、小補正の一歩は増加します。

これに対し、$\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ を取ると、$b$ は完全に熱的な局所状態 $\rho_b=I_2/2$ ですが、

$$
\rho_{bc}=I_2/2\otimes\lvert0\rangle\langle0\rvert,\qquad
S(c)=0,\quad S(bc)=\ln2,\quad
\Delta_R(b)=-\ln2.
$$

このとき[小補正条件](#def-bhi9-entropy-smallness)の二つは $\varepsilon<\ln2$ では成立しません。失われた仮定は**内外の共同状態の近純粋性**です。局所放射の熱性だけを確認して「small correctionsなのにPage曲線が下がった」という反証にはなりません。

## 7. 逐次蒸発と矛盾の成立範囲

$R_0$ を空の放射、$R_k=R_{k-1}b_k$ とし、各放出の内部相手を $c_k$ とします。各段階で古い放射をそのまま保持し、$R_{k-1}b_kc_k$ の状態へ第4節の定理を適用できると仮定します。

<a id="prop-bhi9-cumulative-bound"></a>

<!-- formal-statement-start -->
> **命題（逐次小補正の累積下界と終期純粋性）**
>
> $N\ge1$ の有限段階に対し、各 $k=1,\ldots,N$ で $b_k,c_k$ がqubitであり、$S(b_kc_k)\le\varepsilon_k$、$S(c_k)\ge\ln2-\varepsilon_k$、$\varepsilon_k\ge0$ とする。放出前後の古い放射 $R_{k-1}$ の縮約状態は一致するものとする。このとき

$$
S(R_N)-S(R_0)\ge N\ln2-2\sum_{k=1}^N\varepsilon_k.
$$

> 特に $R_0$ が自明な系で、全放出で $0\le\varepsilon_k\le\varepsilon_*<(\ln2)/2$ なら $S(R_N)\ge N(\ln2-2\varepsilon_*)>0$。したがって、この $N$ 段が**閉じた純粋初期状態からの等長発展で、終期の残存Hilbert空間が一次元**である模型とは両立しない。
<!-- formal-statement-end -->

### 証明の見取り図

各段階の不等式を足すと、中間の放射エントロピーは望遠鏡和で消えます。終期の残存側が一次元なら、[純粋蒸発模型のエントロピー収支と残存次元上界](../BHI6/index.md#thm-bhi6-entropy-budget)から放射は純粋で、エントロピー0でなければなりません。

<!-- proof-start -->
### 証明

[一歩のMathur型下界](#thm-bhi9-small-corrections)を各段階の $R=R_{k-1}$、$b=b_k$、$c=c_k$ に適用すると

$$
S(R_k)-S(R_{k-1})\ge\ln2-2\varepsilon_k.
$$

$k=1$ から $N$ まで辺々加えると、

$$
\begin{aligned}
\sum_{k=1}^N[S(R_k)-S(R_{k-1})]
&=S(R_N)-S(R_0),\\
\sum_{k=1}^N(\ln2-2\varepsilon_k)
&=N\ln2-2\sum_{k=1}^N\varepsilon_k.
\end{aligned}
$$

一様条件 $\varepsilon_k\le\varepsilon_*$ なら右辺は $N(\ln2-2\varepsilon_*)>0$ です。$R_0$ が自明なら $S(R_0)=0$。一方、[BHI6の純粋蒸発のエントロピー収支](../BHI6/index.md#thm-bhi6-entropy-budget)は、初期純粋性・毎段階の等長性・残存側の終期次元1から $S(R_N)=0$ を与えます。同じ値に厳密な正下界と零が同時には成立しないので、その条件群は両立しません。
<!-- proof-end -->

ここで矛盾するのは、**(i)全段階で共同状態 $b_kc_k$ がほぼ純粋なBell対、(ii)古い放射を保持した局所的な逐次放出、(iii)純粋な初期状態と閉じた等長時間発展、(iv)終期に放射以外が残らない**、という条件をまとめて採用した場合です。Page時刻以降に小補正条件が破れたり、追加自由度や非局所的な作用で分割が変わったりするなら、この下界をそのまま使うことはできません。どの仮定を変えればよいかの物理的選択は次講以降の課題です。

## 8. 演習と詳細解答

各問のエントロピーはnatとし、指定のない系は有限次元です。二値エントロピーは第5節の $h_2$ を使います。

### Level A：定義とエントロピーの符号

<a id="ex-bhi9-a01"></a>
#### BHI9-A01 独立なBell対の一歩
- Level: A

任意の状態 $\rho_R$ とBell対 $\Phi_{bc}$ の積で、$S(bc),S(c),S(Rb)-S(R)$ を求め、[小補正条件](#def-bhi9-entropy-smallness)と下界の等号を検査せよ。

<!-- solution-start -->
**詳細解答**：Bell対の非零固有値は1個の1なので $S(bc)=0$。部分トレースで $\rho_c=I_2/2$、ゆえに $S(c)=\ln2$。独立性より $\rho_{Rb}=\rho_R\otimes I_2/2$ だから、[QINF17のエントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)を使い $S(Rb)=S(R)+\ln2$。増分は $\ln2$ で、$\varepsilon=0$ の下界 $\ln2-2\cdot0=\ln2$ と一致する。
<!-- solution-end -->

<a id="ex-bhi9-a02"></a>
#### BHI9-A02 非最大もつれ純粋対
- Level: A

$R$ と独立な純粋対 $\lvert\psi_q\rangle_{bc}=\sqrt q\lvert00\rangle+\sqrt{1-q}\lvert11\rangle$（$0<q<1$）について、$S(bc),S(c),\Delta_R(b)$ を求めよ。定義の $\varepsilon$ に選べる最小値も示せ。

<!-- solution-start -->
**詳細解答**：$\lvert\psi_q\rangle$ は直交二項でノルムの二乗が $q+(1-q)=1$ なので $S(bc)=0$。$\rho_b,\rho_c$ の固有値はともに $q,1-q$ だから $S(c)=S(b)=h_2(q)$。$R$ との積から $\Delta_R(b)=S(b)=h_2(q)$。二条件は $0\le\varepsilon$ と $h_2(q)\ge\ln2-\varepsilon$ なので最小 $\varepsilon_{\min}=\ln2-h_2(q)$。$q=1/2$ のときだけ $\varepsilon_{\min}=0$ となる。
<!-- solution-end -->

<a id="ex-bhi9-a03"></a>
#### BHI9-A03 数値的な増分保証
- Level: A

ある一歩で $S(bc)\le0.12$ nat、$S(c)\ge\ln2-0.10$ nat と分かった。$\Delta_R(b)$ の最も直接的な下界を求め、$\varepsilon=0.12$ にまとめる評価と比べよ。

<!-- solution-start -->
**詳細解答**：[弱単調性](#lem-bhi9-weak-monotonicity)は $\Delta_R(b)\ge S(c)-S(bc)$ を与える。下界へ二条件を代入すると $\Delta_R(b)\ge\ln2-0.10-0.12=\ln2-0.22\simeq0.473147$ nat。一つの $\varepsilon=0.12$ にまとめても $\Delta_R(b)\ge\ln2-0.24\simeq0.453147$ nat だが、前者より0.02 nat弱い。元の二つの誤差を区別する方が精密である。
<!-- solution-end -->

<a id="ex-bhi9-a04"></a>
#### BHI9-A04 局所最大混合だけでは不十分
- Level: A

$\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ に対し $\rho_b,\rho_{bc}$ の固有値、$S(c),S(bc),\Delta_R(b)$ を計算せよ。$\varepsilon<\ln2$ の小補正条件に入るか。

<!-- solution-start -->
**詳細解答**：Bell対の部分トレースから $\rho_b=I_2/2$ で、固有値は $(1/2,1/2)$ です。$c$ は $|0\rangle$ の純粋状態なので、

$$
\rho_{bc}=\frac{I_2}{2}\otimes|0\rangle\langle0|,
\qquad \operatorname{spec}(\rho_{bc})=(1/2,1/2,0,0).
$$

従って $S(c)=0$、$S(bc)=\ln2$ です。反対に $Rb$ はBell純粋対だから $S(Rb)=0$、その片側 $R$ は最大混合で $S(R)=\ln2$。よって

$$
\Delta_R(b)=S(Rb)-S(R)=-\ln2.
$$

$0\le\varepsilon<\ln2$ では $S(bc)\le\varepsilon$ と $S(c)\ge\ln2-\varepsilon$ の**両条件**が破れます。
<!-- solution-end -->

<a id="ex-bhi9-a05"></a>
#### BHI9-A05 「正」を保証できる範囲
- Level: A

小補正条件を $\varepsilon=0.2$ nat または $\varepsilon=0.35$ nat で満たすとする。各下界を計算し、何が保証されるかを述べよ。

<!-- solution-start -->
**詳細解答**：[Mathur型下界](#thm-bhi9-small-corrections)から $\varepsilon=0.2$ なら $\Delta\ge\ln2-0.4\simeq0.293147>0$。$\varepsilon=0.35$ なら $\Delta\ge\ln2-0.7\simeq-0.006853$。後者では下界が負でも実際の増分が負と決まるわけではなく、**符号を保証できなくなる**だけである。しきい値は $\varepsilon=(\ln2)/2\simeq0.346574$。
<!-- solution-end -->

### Level B：不等式の導出と相関例

<a id="ex-bhi9-b01"></a>
#### BHI9-B01 弱単調性を純粋化から再導出
- Level: B

任意の $\rho_{Rbc}$ を $D$ で純粋化し、強劣加法性の $A,B,C$ への割り当てと相補エントロピーの等式をすべて書き、$\Delta_R(b)\ge S(c)-S(bc)$ を証明せよ。

<!-- solution-start -->
**詳細解答**

純粋状態 $\lvert\Psi\rangle_{RbcD}$ を取り、全体を $RD|bc$ と $RbD|c$ に分けます。[純粋二部系のエントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)から

$$
S(RD)=S(bc),\qquad S(RbD)=S(c)
$$

を得ます。次に[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)へ $A=b,B=R,C=D$ を代入します。

$$
S(bR)+S(RD)\ge S(R)+S(bRD).
$$

純粋系の二等式をそれぞれ左辺第2項と右辺第2項へ代入して

$$
S(Rb)+S(bc)\ge S(R)+S(c).
$$

両辺から $S(R)+S(bc)$ を引けば $\Delta_R(b)\ge S(c)-S(bc)$ です。**中央に置いた系は $R$** であって $b$ ではありません。
<!-- solution-end -->

<a id="ex-bhi9-b02"></a>
#### BHI9-B02 相関を持つ内外対の距離と下界
- Level: B

第6節の $\lvert\Psi_\eta\rangle$ を $\eta=1/10$ として、(1) $\rho_{bc}$ とBell対のトレース距離、(2) $S(R)$ と $S(Rb)$、(3) [トレース距離の下界](#thm-bhi9-trace-bound)と実際の増分を比較せよ。

<!-- solution-start -->
**詳細解答**：$R$ の計算基底の直交性から交差項が消え、

$$
\rho_{bc}=0.9\Phi_{bc}+0.1|01\rangle\langle01|.
$$

$\Phi_{bc}$ と $|01\rangle$ は直交するので、$\rho_{bc}-\Phi_{bc}$ の非零固有値は $-0.1,0.1$ です。[トレース距離の定義](#def-bhi9-trace-smallness)とその直前の式から

$$
T(\rho_{bc},\Phi_{bc})
=\frac12(|-0.1|+|0.1|)=0.1.
$$

全体は純粋なので、[相補系の縮約エントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)を $R|bc$ と $Rb|c$ の分割に適用します。

$$
\begin{aligned}
S(R)&=S(bc)=h_2(0.1)\simeq0.325083,\\
S(Rb)&=S(c)=h_2(0.55)\simeq0.688139.
\end{aligned}
$$

従って実際の増分は $S(Rb)-S(R)\simeq0.363056$ nat です。一方、[トレース距離の下界](#thm-bhi9-trace-bound)に $\delta=0.1$ を代入すると

$$
h_2(0.6)-h_2(0.1)-0.1\ln3
\simeq0.238068\ {\rm nat}.
$$

$0.363056\ge0.238068>0$ であり、距離のみから得る一様下界はこの例では等号になりません。
<!-- solution-end -->

<a id="ex-bhi9-b03"></a>
#### BHI9-B03 段階ごとに異なる誤差
- Level: B

$R_0$ は自明、三段階で $\varepsilon_1=0.05,\varepsilon_2=0.10,\varepsilon_3=0.20$ nat とする。$S(R_3)$ の下界を求め、最後に放射だけが残る閉じた純粋蒸発模型との両立性を判定せよ。

<!-- solution-start -->
**詳細解答**：[一歩のMathur型下界](#thm-bhi9-small-corrections)を $k=1,2,3$ の各段階に適用すると、古い放射を保持する仮定の下で

$$
S(R_k)-S(R_{k-1})\ge\ln2-2\varepsilon_k
$$

です。三式を足すと中間の $S(R_1),S(R_2)$ が消えて、

$$
\begin{aligned}
S(R_3)-S(R_0)
&\ge 3\ln2-2(0.05+0.10+0.20)\\
&=3\ln2-0.70\simeq1.379442\ {\rm nat}.
\end{aligned}
$$

$R_0$ は自明なので $S(R_0)=0$。しかし閉じた純粋初期状態から等長発展し最終残存系が一次元なら、[BHI6の終期純粋性](../BHI6/index.md#thm-bhi6-entropy-budget)により $S(R_3)=0$ です。よって両立しません。これは**三段階のすべてで小補正条件を満たす**ことを前提にした矛盾です。
<!-- solution-end -->

<a id="ex-bhi9-b04"></a>
#### BHI9-B04 近Bellと局所熱性の差
- Level: B

(1) $\rho_{bc}=\Phi_{bc}$ と $\rho_R$ が任意に相関し得るかを議論せよ。(2) $\rho_b=I_2/2$ だけを仮定すると、増分の符号を決められないことを符号の異なる二つの純粋三部状態で示せ。

<!-- solution-start -->
**詳細解答**

**純粋な共同状態の場合**：$\rho_{bc}=\Phi_{bc}$ が階数1の純粋状態なら、[BHI3の純粋な新規対の因数分解](../BHI3/index.md#prop-bhi3-pure-pair-rigidity)が使えます。$R$ を含む任意の拡張は

$$
\rho_{Rbc}=\rho_R\otimes\Phi_{bc}
$$

と因数分解し、古い放射との相関はありません。第6節のように補正が小さいが零ではない場合には、相関は許されます。

**局所最大混合の比較**：第一の純粋三部状態を $\lvert0\rangle_R\otimes\lvert\Phi\rangle_{bc}$ とすると、$b$ は最大混合で $\Delta=+\ln2$ です。第二の純粋三部状態を $\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ とすると、同じ $\rho_b=I_2/2$ なのに $\Delta=-\ln2$ です。両者の違いは $b$ の**純粋化相手**が $c$ か $R$ かにあります。
<!-- solution-end -->

### Level C：一般化と仮定の監査

<a id="ex-bhi9-c01"></a>
#### BHI9-C01 $d$ 準位対でのsmall-corrections不等式
- Level: C

整数 $d\ge2$ とし、$R,b,c$ を有限次元系、$\dim b=\dim c=d$ とします。最大もつれ状態を

$$
\lvert\Phi_d\rangle=\frac1{\sqrt d}\sum_{j=0}^{d-1}\lvert j\rangle_b\lvert j\rangle_c
$$

と置きます。各放出で次の条件が成立するとします。

$$
S(b_kc_k)\le\varepsilon_k,\qquad
S(c_k)\ge\ln d-\varepsilon_k.
$$

1. 一歩の放射エントロピー増分の下界を導け。
2. $N$ 段階の累積下界を導け。
3. $d=3$、全段階で $\varepsilon_k=0.2$ nat のとき、毎段階で増加が保証されることを示せ。
4. 終期純粋性との両立不能をいうために追加する仮定を列挙せよ。

<!-- solution-start -->
**詳細解答**

**一歩の増分**：[弱単調性](#lem-bhi9-weak-monotonicity)は量子ビット数に依存しないため、$d$ 次元でも

$$
\Delta_k\ge S(c_k)-S(b_kc_k)
$$

です。最大もつれ対の縮約 $\rho_c=I_d/d$ は $1/d$ の固有値を $d$ 個持ち、エントロピーは

$$
-\sum_{j=1}^{d}\frac1d\ln\frac1d=\ln d
$$

です。問題の小補正条件を二つとも使うと

$$
\boxed{\Delta_k\ge\ln d-2\varepsilon_k}.
$$

**累積評価**：$R_k=R_{k-1}b_k$ とし、古い放射の状態を各段階で保持します。望遠鏡和により

$$
\begin{aligned}
S(R_N)-S(R_0)
&=\sum_{k=1}^N[S(R_k)-S(R_{k-1})]\\
&\ge\sum_{k=1}^N(\ln d-2\varepsilon_k)
=N\ln d-2\sum_{k=1}^N\varepsilon_k.
\end{aligned}
$$

**三準位の例**：$d=3$、$\varepsilon_k=0.2$ を代入すると、一歩ごとの増分は

$$
\Delta_k\ge\ln3-0.4\simeq0.698612\ {\rm nat}>0.
$$

**終期での両立性**：$R_0$ が自明、初期全系が純粋、各放出が閉じた系の等長発展、終期残存系が一次元であれば、[BHI6の純粋蒸発のエントロピー収支](../BHI6/index.md#thm-bhi6-entropy-budget)により $S(R_N)=0$ です。一方、全段階で上の小補正条件を保てば

$$
S(R_N)\ge N(\ln3-0.4)>0,
$$

となり矛盾します。終期に残存系・環境が残る場合、小補正を途中で破る場合、または古い放射へ非局所的に作用する場合には、この結論の前提が欠けています。
<!-- solution-end -->

## 9. この制約が示すこと

Mathur型の論証は、放射の局所的な見た目を少し変えるだけでは情報回復に必要な負のエントロピー増分を得られない、という仮定を明示した不等式です。小補正の大きさは、共同状態のエントロピーまたはトレース距離で明示し、古い放射との独立性を勝手に追加しませんでした。

この議論が示すのは、半古典的な対生成模型と純粋な終期放射を同時に要求したとき、少なくともどこかで近Bell対の条件などを変更する必要があることです。次の **BHI10** では、早期放射・後期外部モード・内部パートナーの三者について、AMPSのエンタングルメント条件がどの不等式で衝突するのかを調べます。

**参考文献**：S. D. Mathur, [*The Information Paradox: A Pedagogical Introduction*](https://arxiv.org/abs/0909.1038)（small correctionsの議論）；D. Harlow, [*Jerusalem Lectures on Black Holes and Quantum Information*](https://doi.org/10.1103/RevModPhys.88.015002)（情報問題の仮定の整理）。
