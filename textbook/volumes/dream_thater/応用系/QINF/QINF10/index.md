# QINF10 二状態識別とHelstrom界

## 1. 一回の測定で二つの準備を見分ける

[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)が分かれば、二つの装置が作る量子状態を行列として記述できます。[POVM](../QINF5/index.md#def-qinf5-povm)が分かれば、どの測定結果がどの確率で現れるかも計算できます。しかし、**どの測定を選べば二つの準備を最もよく見分けられるか**は、まだ答えていません。

たとえば装置0が $|0\rangle$、装置1が $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を出すとします。計算基底で測って結果1が出れば装置1だと確信できますが、結果0では区別できません。測定基底を少し回転させれば、平均的にはもっと正しく当てられます。目的に合わせて測定を最適化する必要があります。

以下では有限次元複素Hilbert空間 $H$ において、候補状態を密度演算子 $\rho_0,\rho_1$ とします。準備前に候補 $j$ が選ばれる確率を $\eta_j$ と書き、$\eta_0,\eta_1\ge0$、$\eta_0+\eta_1=1$ と固定します。これらが **事前確率**です。一回だけ測定して答えを0か1に決めるとき、二種類の間違いを事前確率で重み付けした平均誤りを最小化します。

<a id="def-qinf10-binary-test"></a>

<!-- formal-statement-start -->
> **定義（二状態最小誤り識別）**
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho_0,\rho_1$ と事前確率 $\eta_0,\eta_1\ge0$（和1）を固定する。二結果POVM $(E_0,E_1)$、すなわち $E_j\ge0$、$E_0+E_1=I_H$ を選び、結果 $j$ なら状態 $\rho_j$ と判断する。平均成功確率と平均誤り確率を

$$
P_{\mathrm{s}}(E_0,E_1)
=\eta_0\operatorname{Tr}(E_0\rho_0)
 +\eta_1\operatorname{Tr}(E_1\rho_1),
$$

$$
P_{\mathrm{e}}(E_0,E_1)
=\eta_0\operatorname{Tr}(E_1\rho_0)
 +\eta_1\operatorname{Tr}(E_0\rho_1)
=1-P_{\mathrm{s}}(E_0,E_1)
$$

> とする。$P_{\mathrm{e}}$ をすべての二結果POVMにわたって最小化する問題を **二状態最小誤り識別** といい、その最小値を $P_{\mathrm{e}}^*$ と書く。
<!-- formal-statement-end -->

この定義は「必ずどちらかを答える」識別です。「分からない」という第三の回答を許す無誤り識別とは別問題です。また事前確率は量子測定の結果確率ではなく、測定する前にどちらが用意されるかを表します。

<!-- definition-example-start: def-qinf10-binary-test -->
### 定義の確認：測定しない判断もPOVMである

**定義の確認**として、測定する場合としない場合の非負性・完全性を両方とも検査します。

$\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$、$\eta_0=3/4$、$\eta_1=1/4$ とします。$E_0=|0\rangle\langle0|$、$E_1=|1\rangle\langle1|$ は自己共役な非負射影で、和は $I_2$。よって[POVMの定義](../QINF5/index.md#def-qinf5-povm)を満たします。二つの正解確率はともに1なので $P_{\mathrm{s}}=1$、$P_{\mathrm{e}}=0$ です。

対して $E_0=I_2$、$E_1=0$ もどちらも非負で和が $I_2$ のPOVMです。測定の情報を使わず、常に0と答える判断に対応し、

$$
P_{\mathrm{s}}=\tfrac34\operatorname{Tr}(I_2\rho_0)
 +\tfrac14\operatorname{Tr}(0\rho_1)=\tfrac34,
\qquad P_{\mathrm{e}}=\tfrac14.
$$

二つの条件 $E_j\ge0$ と $E_0+E_1=I$ の両方を確かめることが重要です。特に $E_0$ は射影に限らず、$0\le E_0\le I$ の任意の効果作用素でよく、$E_1=I-E_0$ が決まります。
<!-- definition-example-end -->

装置が三つ以上の結果 $F_k$ を出しても、各結果に対する最終回答が0か1なら、0と答える結果の効果作用素を足して $E_0=\sum_{k:\,\text{回答0}}F_k$ とできます。残りを $E_1$ とすれば上のモデルへ戻せます。

確率的に回答を決める場合は、結果 $k$ の後に0と答える条件付き確率を $q_k$（$0\le q_k\le1$）と置きます。このとき

$$
E_0=\sum_kq_kF_k,
\qquad E_1=\sum_k(1-q_k)F_k
$$

とまとめられます。各 $F_k$ が非負なので両効果作用素も非負です。また

$$
E_0+E_1=\sum_k\bigl(q_k+(1-q_k)\bigr)F_k=\sum_kF_k=I
$$

と元の測定の完全性が引き継がれます。したがって二値判断に関して二結果POVMへの制限は損失を生みません。

## 2. 最適測定を決める行列

$E_1=I-E_0$ と置くと、成功確率は一つの作用素の期待値へまとまります。

$$
\begin{aligned}
P_{\mathrm{s}}
&=\eta_0\operatorname{Tr}(E_0\rho_0)
 +\eta_1\operatorname{Tr}((I-E_0)\rho_1)\\
&=\eta_1+\operatorname{Tr}\{E_0(\eta_0\rho_0-\eta_1\rho_1)\}.
\end{aligned}
$$

ここで現れる差の行列は自己共役です。したがって[有限次元のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)によって正・負・零の固有値に分けられます。正固有値の方向では $E_0$ がその成分を全部拾う方が有利で、負固有値の方向では拾わない方が有利です。この符号の判断を一般化します。

<a id="def-qinf10-helstrom-operator"></a>

<!-- formal-statement-start -->
> **定義（Helstrom作用素と正負部分）**
> 有限次元複素Hilbert空間 $H$ 上の二状態 $\rho_0,\rho_1$ と事前確率 $\eta_0+\eta_1=1$ に対し、自己共役な作用素

$$
\Delta=\eta_0\rho_0-\eta_1\rho_1
$$

> を **Helstrom作用素** とする。そのスペクトル分解 $\Delta=\sum_k\lambda_k|k\rangle\langle k|$（固有値 $\lambda_k\in\mathbb R$）に対し、非負の正部分・負部分および各固有空間への直交射影を

$$
\begin{aligned}
\Delta_+&=\sum_{\lambda_k>0}\lambda_k|k\rangle\langle k|,
&P_+&=\sum_{\lambda_k>0}|k\rangle\langle k|,\\
\Delta_-&=\sum_{\lambda_k<0}(-\lambda_k)|k\rangle\langle k|,
&P_-&=\sum_{\lambda_k<0}|k\rangle\langle k|,\\
P_{\mathrm{z}}&=I-P_+-P_-.
\end{aligned}
$$

> とする。従って $\Delta=\Delta_+-\Delta_-$、$\Delta_+\Delta_-=0$ である。$P_{\mathrm{z}}$ は固有値0の空間への射影である。
<!-- formal-statement-end -->

正部分と負部分は正値作用素です。ただし $\Delta_-$ は**負の作用素ではなく**、負固有値の絶対値を集めた非負作用素です。$P_++P_-+P_{\mathrm{z}}=I$ は互いに直交する射影の和です。

<!-- definition-example-start: def-qinf10-helstrom-operator -->
### 定義の確認：符号が変わるだけで判断が反転する

**定義の確認**では、重み付き差を求め、正負部分が非負で互いに直交することを確かめます。

計算基底 $|0\rangle,|1\rangle$ で $\operatorname{diag}(a,b)=a|0\rangle\langle0|+b|1\rangle\langle1|$ と表します。$\rho_0=\operatorname{diag}(4/5,1/5)$、$\rho_1=\operatorname{diag}(3/10,7/10)$、$\eta_0=3/5$、$\eta_1=2/5$ とします。各 $\rho_j$ はこの正規直交基底で自己共役な対角行列で、固有値（対角成分）が非負、トレース（対角成分の和）が1です。ゆえに[密度演算子の定義](../QINF2/index.md#def-qinf2-ensemble-density)の各条件を満たします。事前確率も非負で和1です。よって

$$
\Delta=\begin{pmatrix}12/25-3/25&0\\0&3/25-7/25\end{pmatrix}
=\begin{pmatrix}9/25&0\\0&-4/25\end{pmatrix}.
$$

計算基底そのものが固有基底で、$\Delta_+=(9/25)|0\rangle\langle0|$、$\Delta_-=(4/25)|1\rangle\langle1|$、$P_+=|0\rangle\langle0|$、$P_-=|1\rangle\langle1|$、$P_{\mathrm{z}}=0$ です。実際に差を戻すと $\Delta_+-\Delta_-=\Delta$ となり、積は直交射影の積により0です。
<!-- definition-example-end -->

正負の固有値の絶対値を加える操作を、次の章では状態間の距離にも使います。この章では最適誤り確率を表すために必要な行列ノルムだけを先に定義します。

一般の作用素 $X$ は自己共役とは限りませんが、$X^\dagger X$ は自己共役で、任意の $|v\rangle$ に対して $\langle v|X^\dagger X|v\rangle=\|Xv\|^2\ge0$ です。[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)によって $X^\dagger X=\sum_k\mu_k|e_k\rangle\langle e_k|$（$\mu_k\ge0$）と表示でき、その非負平方根は $\sum_k\sqrt{\mu_k}|e_k\rangle\langle e_k|$ です。つまり、平方根は行列の各成分に作用させるのではなく、固有値に作用させて構成します。

<a id="def-qinf10-trace-norm"></a>

<!-- formal-statement-start -->
> **定義（有限次元トレースノルム）**
> 有限次元複素Hilbert空間 $H$ 上の任意の線形作用素 $X$ に対し、$X^\dagger X$ の非負平方根を $|X|=\sqrt{X^\dagger X}$ とし、**有限次元トレースノルム**を

$$
\|X\|_1=\operatorname{Tr}|X|
$$

> で定める。特に自己共役 $A=\sum_k\lambda_k|k\rangle\langle k|$ では $|A|=\sum_k|\lambda_k||k\rangle\langle k|$ なので $\|A\|_1=\sum_k|\lambda_k|$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf10-trace-norm -->
### 定義の確認：固有値の符号と絶対値

**定義の確認**として、平方根から計算する方法と固有値の絶対値を足す方法を照合します。

直前の $\Delta=\operatorname{diag}(9/25,-4/25)$ では、$\Delta^\dagger\Delta=\operatorname{diag}(81/625,16/625)$ です。非負平方根は $|\Delta|=\operatorname{diag}(9/25,4/25)$ で、

$$
\|\Delta\|_1=9/25+4/25=13/25
=\operatorname{Tr}\Delta_++\operatorname{Tr}\Delta_-.
$$

トレース $\operatorname{Tr}\Delta=5/25$ とは異なります。正負の打ち消しがないことが識別可能性を測る鍵です。$X^\dagger X$ に非負平方根が一意に存在することは[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)によります。
<!-- definition-example-end -->

## 3. 正の固有方向だけを採るのが最適な理由

測定効果 $E$ の条件は $0\le E\le I$ です。$E$ と $\Delta$ が可換とは限りません。そこで、任意の $E$ でも正部分以上の寄与は得られないことを、トレースで直接証明します。

<a id="lem-qinf10-variational"></a>

<!-- formal-statement-start -->
> **補題（正部分の変分原理）**
> 有限次元複素Hilbert空間 $H$ 上の自己共役な作用素 $A=A_+-A_-$ と、その正・負・零固有空間への射影 $P_+,P_-,P_{\mathrm{z}}$ を取る。このとき

$$
\max_{0\le E\le I}\operatorname{Tr}(EA)
=\operatorname{Tr}A_+.
$$

> 最大値を達成する効果作用素は、ちょうど $E=P_++K$、$0\le K\le P_{\mathrm{z}}$ の形である。
<!-- formal-statement-end -->

### 証明の見取り図

負部分は引かれるので貢献できず、正部分に掛ける $E$ は $I$ を超えません。二つの非負なトレースから上界を得て、正固有空間へ1、負固有空間へ0を割り当てれば上界へ達します。等号の場合は、各固有ベクトルで期待値がそれぞれ1または0にならなければなりません。

<!-- proof-start -->
### 証明

任意の $0\le E\le I$ に対し、$I-E\ge0$ です。正値作用素 $B,C$ では $\operatorname{Tr}(BC)=\operatorname{Tr}(B^{1/2}CB^{1/2})\ge0$ なので

$$
\operatorname{Tr}(EA)
=\operatorname{Tr}(EA_+)-\operatorname{Tr}(EA_-)
\le\operatorname{Tr}(EA_+)
\le\operatorname{Tr}A_+.
$$

最後は $\operatorname{Tr}((I-E)A_+)\ge0$ を用いました。$E=P_+$ なら $P_+A_+=A_+$、$P_+A_-=0$ なので等号が成立します。

逆に等号なら、非負の二量

$$
\operatorname{Tr}(EA_-)=0,
\qquad \operatorname{Tr}((I-E)A_+)=0
$$

がともに0です。$A$ の負固有ベクトル $|k\rangle$ について、$A_-$ の固有値 $-\lambda_k>0$ を掛けた $\langle k|E|k\rangle\ge0$ の和が0なので、それぞれ $\langle k|E|k\rangle=0$。$E\ge0$ から $\|E^{1/2}|k\rangle\|^2=0$、従って $E|k\rangle=0$ です。同様に正固有ベクトルでは $\langle k|(I-E)|k\rangle=0$ となり、$I-E\ge0$ から $(I-E)|k\rangle=0$、すなわち $E|k\rangle=|k\rangle$ です。

$E$ は自己共役なので、これらの関係から正・負固有空間と零固有空間を結ぶ非対角ブロックも0です。零固有空間上の残りのブロックを $K=P_{\mathrm{z}}EP_{\mathrm{z}}$ とすれば $0\le K\le P_{\mathrm{z}}$。よって $E=P_++K$ です。逆にこの形の $E$ は条件を満たし、$K A=0$ なので上界を達成します。
<!-- proof-end -->

零固有空間上の判断は成功確率を変えません。例えば $\Delta=0$ なら全空間が零固有空間で、どんなPOVMでも同じ成功確率です。一意な最適測定があるとは限らないわけです。

## 4. Helstrom界：最良の成功確率・最小誤り確率

ここまでで問題は $\operatorname{Tr}(E_0\Delta)$ の最大化へ還元されています。[変分原理](#lem-qinf10-variational)を $A=\Delta$ として適用すれば最適な効果作用素を作れます。さらに正部分・負部分の和を先ほどのノルムで表すと、測定を明示しなくても到達可能な誤り確率が計算できます。

<a id="thm-qinf10-helstrom"></a>

<!-- formal-statement-start -->
> **定理（二状態識別のHelstrom界）**
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho_0,\rho_1$、事前確率 $\eta_0,\eta_1\ge0$（和1）、$\Delta=\eta_0\rho_0-\eta_1\rho_1$ を取る。すべての二結果POVMに関する最適成功確率・最小誤り確率は

$$
\boxed{P_{\mathrm{s}}^*=\frac{1+\|\Delta\|_1}{2}},
\qquad
\boxed{P_{\mathrm{e}}^*=\frac{1-\|\Delta\|_1}{2}}.
$$

> Helstrom作用素の正・負・零固有空間への射影を $P_+,P_-,P_{\mathrm{z}}$ とすると、最適POVMはちょうど

$$
E_0=P_++K,
\qquad E_1=P_-+P_{\mathrm{z}}-K,
\qquad 0\le K\le P_{\mathrm{z}}
$$

> の形である。特に $E_0=P_+$、$E_1=I-P_+$ は常に一つの最適測定となる。
<!-- formal-statement-end -->

### 証明の見取り図

定義から $P_{\mathrm{s}}=\eta_1+\operatorname{Tr}(E_0\Delta)$ でした。最適化の上界と達成性は[正部分の変分原理](#lem-qinf10-variational)が与えます。最後に $\operatorname{Tr}\Delta=\eta_0-\eta_1$ と $\|\Delta\|_1=\operatorname{Tr}\Delta_++\operatorname{Tr}\Delta_-$ を連立します。

<!-- proof-start -->
### 証明

二結果POVMの完全性より $E_1=I-E_0$ であり、$E_0$ の許容範囲はちょうど $0\le E_0\le I$ です。ゆえに

$$
P_{\mathrm{s}}^*
=\eta_1+\max_{0\le E_0\le I}\operatorname{Tr}(E_0\Delta)
=\eta_1+\operatorname{Tr}\Delta_+.
$$

[変分原理](#lem-qinf10-variational)の等号条件から、最適 $E_0$ はちょうど $P_++K$ です。$E_1=I-E_0=P_-+P_{\mathrm{z}}-K$ は非負で、二つの和は $I$ です。

密度演算子のトレースは1なので、

$$
\operatorname{Tr}\Delta=\eta_0-\eta_1
=\operatorname{Tr}\Delta_+-\operatorname{Tr}\Delta_-,
$$

$$
\|\Delta\|_1
=\operatorname{Tr}\Delta_++\operatorname{Tr}\Delta_-.
$$

二式を加えると $2\operatorname{Tr}\Delta_+=\|\Delta\|_1+\eta_0-\eta_1$。したがって

$$
P_{\mathrm{s}}^*
=\eta_1+\frac{\|\Delta\|_1+\eta_0-\eta_1}{2}
=\frac{1+\|\Delta\|_1}{2}.
$$

また定義から $P_{\mathrm{e}}=1-P_{\mathrm{s}}$ なので最小値は $P_{\mathrm{e}}^*=1-P_{\mathrm{s}}^*$ です。
<!-- proof-end -->

ここには二つの境界があります。[POVMの確率条件](../QINF5/index.md#prop-qinf5-probabilities)から、$0\le E\le I$ なら $0\le\operatorname{Tr}(E\rho_j)\le1$ です。よって任意の効果作用素 $E$ に対して

$$
\operatorname{Tr}(E\Delta)
=\eta_0\operatorname{Tr}(E\rho_0)-\eta_1\operatorname{Tr}(E\rho_1)
\le\eta_0.
$$

[変分原理](#lem-qinf10-variational)で左辺を最大化すれば $\operatorname{Tr}\Delta_+\le\eta_0$ です。$-\Delta=\eta_1\rho_1-\eta_0\rho_0$ に同じ議論を適用すれば $\operatorname{Tr}\Delta_-\le\eta_1$。従って $\|\Delta\|_1\le\eta_0+\eta_1=1$ です。また $\|\Delta\|_1\ge|\operatorname{Tr}\Delta|=|\eta_0-\eta_1|$ は正負部分の非負性から従います。よって

$$
0\le P_{\mathrm{e}}^*\le\min(\eta_0,\eta_1).
$$

右辺は「常に事前確率の大きい方を答える」戦略の誤りです。最適な量子測定は、この戦略より悪くなりません。特に等事前確率 $\eta_0=\eta_1=1/2$ では

$$
P_{\mathrm{e}}^*=\frac12-\frac14\|\rho_0-\rho_1\|_1.
$$

これが次章で扱うトレース距離との接点です。**QINF11の縮小定理などは、ここでの証明に使っていません。**

### 数値例：可換な混合状態

第2節の例では $\operatorname{Tr}\Delta_+=9/25$ なので

$$
P_{\mathrm{s}}^*=\eta_1+\operatorname{Tr}\Delta_+
=\frac25+\frac9{25}=\frac{19}{25}.
$$

一方、$\|\Delta\|_1=13/25$ だったので、[Helstrom界](#thm-qinf10-helstrom)から $(1+13/25)/2=19/25$ と一致します。実測定 $E_0=|0\rangle\langle0|$、$E_1=|1\rangle\langle1|$ を直接代入しても

$$
P_{\mathrm{s}}=\frac35\cdot\frac45+\frac25\cdot\frac7{10}
=\frac{12}{25}+\frac7{25}=\frac{19}{25},
\qquad P_{\mathrm{e}}^*=\frac6{25}.
$$

## 5. 可換状態と純粋状態で何が変わるか

### 可換状態の尤度比較

二つの密度演算子が**可換**であるとは、$[\rho_0,\rho_1]:=\rho_0\rho_1-\rho_1\rho_0=0$（ここで角括弧は交換子）となることです。可換なら同時に対角化できます。実際、$\rho_0v=pv$ を満たす固有ベクトル $v$ には

$$
\rho_0(\rho_1v)=\rho_1(\rho_0v)=p(\rho_1v)
$$

が成立し、$\rho_1$ は $\rho_0$ の固有値 $p$ の固有空間を保ちます。各固有空間への $\rho_1$ の制限も自己共役です。そこへ[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)を適用して正規直交基底で対角化し、各基底を合わせれば、両者の共通固有基底が得られます。

共通基底 $|k\rangle$ でそれぞれの固有値を $p_k,q_k$ とすると

$$
\rho_0=\sum_kp_k|k\rangle\langle k|,
\qquad \rho_1=\sum_kq_k|k\rangle\langle k|
$$

と表示されます。[密度演算子の条件](../QINF2/index.md#def-qinf2-ensemble-density)から両固有値列は非負で総和1です。[POVMの確率式](../QINF5/index.md#prop-qinf5-probabilities)で基底射影 $|k\rangle\langle k|$ を測れば

$$
\operatorname{Tr}(|k\rangle\langle k|\rho_0)=p_k,
\qquad \operatorname{Tr}(|k\rangle\langle k|\rho_1)=q_k
$$

となります。つまり結果 $k$ の条件付き確率が各状態で $p_k,q_k$ です。事前確率を掛けた $\eta_0p_k,\eta_1q_k$ を比較する古典的な仮説検定へ還元されます。

<a id="prop-qinf10-commuting"></a>

<!-- formal-statement-start -->
> **命題（可換状態の尤度比較）**
> 有限次元複素Hilbert空間の密度演算子 $\rho_0,\rho_1$ が $[\rho_0,\rho_1]=0$ を満たすとする。共通正規直交固有基底で $\rho_0=\sum_kp_k|k\rangle\langle k|$、$\rho_1=\sum_kq_k|k\rangle\langle k|$ と表せば、事前確率 $\eta_0+\eta_1=1$ において、結果 $k$ が出たら $\eta_0p_k>\eta_1q_k$ なら0、逆なら1、等しければどちらでもよいという判断が最適であり、

$$
P_{\mathrm{e}}^*=\sum_k\min(\eta_0p_k,\eta_1q_k)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

同時対角化すると[Helstrom作用素](#def-qinf10-helstrom-operator)の固有値は $\eta_0p_k-\eta_1q_k$ です。符号が最適判断を決め、各 $k$ で誤りとして残るのは二つの重み付き確率の小さい方です。

<!-- proof-start -->
### 証明

共通固有基底で $\Delta=\sum_k(\eta_0p_k-\eta_1q_k)|k\rangle\langle k|$ となります。[Helstrom界](#thm-qinf10-helstrom)の最適POVMは正固有値の方向を0、負固有値の方向を1へ割り当てます。結果 $k$ を0に割り当てると、誤りへの寄与は $\eta_1q_k$、1に割り当てると $\eta_0p_k$ です。よって各 $k$ について小さい方を選べます。総和は上式となり、同じ符号選択がHelstrom界の上界を達成するので全POVM中でも最適です。
<!-- proof-end -->

状態が同じ $\rho_0=\rho_1=\rho$ なら $\Delta=(\eta_0-\eta_1)\rho$ です。すべての固有値は同符号（等事前確率なら全部0）なので、最適判断は単に事前確率の大きい方を答えるだけです。$P_{\mathrm{e}}^*=\min(\eta_0,\eta_1)$ で、**状態が同じなら測定しても情報は増えません**。

### 非直交純粋状態では測定方向が回る

二つの単位ベクトル $|u\rangle,|v\rangle$ に対応する純粋状態を区別するとします。内積の絶対値 $c=|\langle u|v\rangle|$ は0から1までです。$c=0$ なら直交して完全識別できますが、$0<c<1$ なら誤りは避けられません。

<a id="prop-qinf10-pure-states"></a>

<!-- formal-statement-start -->
> **命題（二つの純粋状態の識別公式）**
> 有限次元複素Hilbert空間 $H$ の単位ベクトル $|u\rangle,|v\rangle$ と事前確率 $\eta_0,\eta_1\ge0$（和1）を取る。$\rho_0=|u\rangle\langle u|$、$\rho_1=|v\rangle\langle v|$、$c=|\langle u|v\rangle|$ とすると、

$$
\|\eta_0\rho_0-\eta_1\rho_1\|_1
=\sqrt{1-4\eta_0\eta_1c^2},
$$

$$
P_{\mathrm{e}}^*
=\frac{1-\sqrt{1-4\eta_0\eta_1c^2}}2.
$$

> 等事前確率では $P_{\mathrm{e}}^*=(1-\sqrt{1-c^2})/2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

二状態が張る高々二次元の空間だけを調べます。直交していない二つの方向を直交基底に直すと、Helstrom作用素のトレースは $\eta_0-\eta_1$、行列式は $-\eta_0\eta_1(1-c^2)$ となります。符号の異なる二固有値の差が $\|\Delta\|_1$ です。一次元に潰れる $c=1$ と、事前確率0の場合は別に検算します。

<!-- proof-start -->
### 証明

$0\le c<1$ とします。$|v\rangle$ の位相を選べば $\langle u|v\rangle=c$ を実非負にできます。$s=\sqrt{1-c^2}>0$ と置き、

$$
|w\rangle=\frac{|v\rangle-c|u\rangle}{s},
\qquad |v\rangle=c|u\rangle+s|w\rangle.
$$

$\langle u|w\rangle=(c-c)/s=0$、$\|w\|^2=(1-c^2)/s^2=1$ なので $|u\rangle,|w\rangle$ は正規直交基底です。その張る空間で

$$
\Delta=\begin{pmatrix}
\eta_0-\eta_1c^2&-\eta_1cs\\
-\eta_1cs&-\eta_1s^2
\end{pmatrix}.
$$

従って

$$
\operatorname{Tr}\Delta=\eta_0-\eta_1,
$$

$$
\begin{aligned}
\det\Delta
&=-(\eta_0-\eta_1c^2)\eta_1s^2-\eta_1^2c^2s^2\\
&=-\eta_0\eta_1s^2=-\eta_0\eta_1(1-c^2).
\end{aligned}
$$

両事前確率が正なら行列式は負で、二固有値 $\lambda_+>0>\lambda_-$ を持ちます。二次方程式から

$$
\lambda_+-\lambda_-
=\sqrt{(\operatorname{Tr}\Delta)^2-4\det\Delta}
=\sqrt{(\eta_0-\eta_1)^2+4\eta_0\eta_1(1-c^2)}.
$$

$\eta_0+\eta_1=1$ を代入すると根号内は $1-4\eta_0\eta_1c^2$ です。張る空間の直交補空間では $\Delta=0$ なので、全空間での $\|\Delta\|_1$ は $|\lambda_+|+|\lambda_-|=\lambda_+-\lambda_-$ です。[Helstrom界](#thm-qinf10-helstrom)に代入して誤り確率の式を得ます。

$c=1$ なら二状態の密度演算子が同一なので $\Delta=(\eta_0-\eta_1)\rho_0$、そのノルムは $|\eta_0-\eta_1|=\sqrt{1-4\eta_0\eta_1}$ です。どちらかの事前確率が0でも $\Delta=\pm\rho_j$（非零側の事前確率は1）でノルム1となり、同じ公式を満たします。
<!-- proof-end -->

### 具体例：$|0\rangle$ と $|+\rangle$

$\eta_0=\eta_1=1/2$ で $\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$ とします。$|\langle0|+\rangle|^2=1/2$ なので、[純粋状態の識別公式](#prop-qinf10-pure-states)は

$$
P_{\mathrm{e}}^*=\frac12\left(1-\frac1{\sqrt2}\right)
\simeq0.14645
$$

を与えます。どんな測定をすれば実現できるでしょうか。計算基底で

$$
\Delta=\frac14\begin{pmatrix}1&-1\\-1&-1\end{pmatrix},
\qquad \Delta^2=\frac18 I_2
$$

なので、固有値は $\pm1/(2\sqrt2)$ です。正固有空間への射影は

$$
E_0=P_+=\frac12\left(I_2+2\sqrt2\,\Delta\right)
=\frac12\begin{pmatrix}
1+1/\sqrt2&-1/\sqrt2\\
-1/\sqrt2&1-1/\sqrt2
\end{pmatrix},
\qquad E_1=I_2-E_0.
$$

$\Delta^2=(1/8)I$ から $P_+^2=P_+$、$P_+^\dagger=P_+$ が従い、二固有値は1と0です。ゆえに $E_0,E_1$ は実際に二結果射影測定を構成します。対して計算基底で測り、結果0なら仮説0、結果1なら仮説1と判断した場合は

$$
P_{\mathrm{s}}=\tfrac12\cdot1+\tfrac12\cdot\tfrac12
=\tfrac34,
\qquad P_{\mathrm{e}}=\tfrac14.
$$

最適誤り約0.14645は0.25より小さく、**測定基底の選択そのものが識別性能を変える**ことが分かります。

## 6. 雑音を通してから測っても識別は改善しない

状態が測定前に同じ量子チャネル $\Phi$ を通ると、元の状態の区別が有利になることはありません。これは次章のトレース距離の一般論を待たず、すでに知っているチャネルの随伴写像から直接導けます。

<a id="prop-qinf10-channel-monotonicity"></a>

<!-- formal-statement-start -->
> **命題（チャネル下での最適識別性能の単調性）**
> 有限次元複素Hilbert空間 $H_A,H_B$、$H_A$ 上の密度演算子 $\rho_0,\rho_1$、事前確率 $\eta_0+\eta_1=1$、量子チャネル $\Phi:L(H_A)\to L(H_B)$ を取る。出力状態 $\Phi(\rho_0),\Phi(\rho_1)$ の最適成功確率は入力状態での最適成功確率以下である。

$$
P_{\mathrm{s}}^*(\Phi(\rho_0),\Phi(\rho_1))
\le P_{\mathrm{s}}^*(\rho_0,\rho_1).
$$

> 同じ事前確率について最適誤り確率の向きは逆である。
<!-- formal-statement-end -->

### 証明の見取り図

出力側でどんなPOVMを選んでも、[チャネルの随伴写像](../QINF7/index.md#prop-qinf7-adjoint)で入力側へ引き戻せます。引き戻しは非負性と完全性を保存するため、出力で達成できる成功確率は入力で選べる測定の候補の一つにすぎません。

<!-- proof-start -->
### 証明

[Kraus表示とトレース保存条件](../QINF7/index.md#thm-qinf7-kraus-cptp)により $\Phi(X)=\sum_aK_aXK_a^\dagger$、$\sum_aK_a^\dagger K_a=I_A$ と書けます。出力側の任意のPOVM $(F_0,F_1)$ に対し、入力側作用素を

$$
E_j=\Phi^*(F_j)=\sum_aK_a^\dagger F_jK_a
$$

とします。任意の $|v\rangle\in H_A$ に対し

$$
\langle v|E_j|v\rangle
=\sum_a\langle K_av|F_j|K_av\rangle\ge0
$$

なので $E_j\ge0$、また $E_0+E_1=\sum_aK_a^\dagger(F_0+F_1)K_a=I_A$ です。よって $(E_0,E_1)$ は入力側のPOVMです。トレースの循環性から

$$
\operatorname{Tr}(F_j\Phi(\rho_j))
=\sum_a\operatorname{Tr}(F_jK_a\rho_jK_a^\dagger)
=\operatorname{Tr}(E_j\rho_j).
$$

両辺を $\eta_j$ で重み付けして足すと、出力POVM $(F_0,F_1)$ の成功確率は入力POVM $(E_0,E_1)$ の成功確率と一致します。後者は入力側の最大値以下です。任意の $F_j$ について成り立つので出力側で最大化しても不等式が成立します。誤り確率は成功確率の補数です。
<!-- proof-end -->

たとえば両入力を同じ固定状態へ置き換えるチャネルなら、出力側では事前確率による推測しかできません。対照的に、区別に必要な二状態上で可逆なユニタリチャネルなら、測定を逆向きに回して最適性能を維持できます。

## 7. 演習：決定規則から最適測定まで

各問のHilbert空間は特記しない限り $H=\mathbb C^2$、基底は $|0\rangle,|1\rangle$、密度演算子のトレースは1とします。$P_{\mathrm{s}}$ と $P_{\mathrm{e}}$ は平均成功・平均誤り確率です。

<a id="ex-qinf10-a01"></a>
### QINF10-A01 直交状態を完全に区別する

- Level: A

$\rho_0=|0\rangle\langle0|$、$\rho_1=|1\rangle\langle1|$、$\eta_0=2/3$、$\eta_1=1/3$ とする。$\Delta$ とその正負固有空間、最適POVMおよび $P_{\mathrm{e}}^*$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\Delta=(2/3)|0\rangle\langle0|-(1/3)|1\rangle\langle1|$ で、固有値は $2/3,-1/3$ です。従って $P_+=|0\rangle\langle0|$、$P_-=|1\rangle\langle1|$、$P_{\mathrm{z}}=0$。二射影は非負で和 $I_2$ なので最適POVMです。[Helstrom界](#thm-qinf10-helstrom)に現れるノルムは

$$
\|\Delta\|_1=\frac23+\frac13=1,
\qquad P_{\mathrm{e}}^*=\frac{1-1}{2}=0.
$$

元の確率も $P_{\mathrm{s}}=(2/3)\operatorname{Tr}(P_+\rho_0)+(1/3)\operatorname{Tr}(P_-\rho_1)=2/3+1/3=1$ と直接確かめられます。
<!-- solution-end -->

<a id="ex-qinf10-a02"></a>
### QINF10-A02 同一状態と零固有空間

- Level: A

$\rho_0=\rho_1=I_2/2$ とする。事前確率が $(\eta_0,\eta_1)=(3/5,2/5)$ と $(1/2,1/2)$ の場合について、$\Delta$、最小誤り確率、最適POVMの自由度を比較せよ。

<!-- solution-start -->
### 詳細解答

前者では $\Delta=(3/5-2/5)I_2/2=I_2/10$ で、二固有値はともに $1/10>0$。正固有空間は全空間です。[変分原理](#lem-qinf10-variational)の等号条件より $E_0=I_2$、$E_1=0$ が唯一の最適二結果POVMで、

$$
\|\Delta\|_1=2/10=1/5,
\qquad P_{\mathrm{e}}^*=(1-1/5)/2=2/5.
$$

後者では $\Delta=0$ で、正負固有空間は零空間、$P_{\mathrm{z}}=I_2$ です。$0\le K\le I_2$ の任意の $K$ に対して $(E_0,E_1)=(K,I_2-K)$ が最適です。成功確率は

$$
P_{\mathrm{s}}=\frac12\operatorname{Tr}[(E_0+E_1)I_2/2]
=\frac12
$$

と測定に依らず、最小誤りも $1/2$ です。
<!-- solution-end -->

<a id="ex-qinf10-a03"></a>
### QINF10-A03 正部分の変分値と核の自由度

- Level: A

三次元空間の自己共役行列 $A=\operatorname{diag}(2,-3,0)$ を考える。$A_+,A_-$ と $\|A\|_1$ を計算し、$\max_{0\le E\le I_3}\operatorname{Tr}(EA)$ および最大化する全効果作用素を求めよ。

<!-- solution-start -->
### 詳細解答

固有値 $2,-3,0$ の符号から

$$
A_+=\operatorname{diag}(2,0,0),
\quad A_-=\operatorname{diag}(0,3,0),
\quad |A|=\operatorname{diag}(2,3,0).
$$

従って $\|A\|_1=2+3=5$。[正部分の変分原理](#lem-qinf10-variational)より最大値は $\operatorname{Tr}A_+=2$ です。等号条件から

$$
E=\operatorname{diag}(1,0,k),
\qquad 0\le k\le1
$$

が最大化するすべての効果作用素です。実際、固有値が $1,0,k$ なので $0\le E\le I_3$ を満たし、$\operatorname{Tr}(EA)=2\cdot1-3\cdot0+0\cdot k=2$。非対角成分は等号条件の証明により許されません。
<!-- solution-end -->

<a id="ex-qinf10-a04"></a>
### QINF10-A04 可換状態の誤りを二通りで求める

- Level: A

$\rho_0=\operatorname{diag}(3/4,1/4)$、$\rho_1=\operatorname{diag}(1/4,3/4)$、等事前確率とする。結果ごとの判断を定め、$P_{\mathrm{e}}^*$ を[可換状態の尤度比較](#prop-qinf10-commuting)と[Helstrom界](#thm-qinf10-helstrom)の両方から計算せよ。

<!-- solution-start -->
### 詳細解答

結果0では重み付き確率が $3/8$ 対 $1/8$ なので仮説0を選び、結果1では $1/8$ 対 $3/8$ なので仮説1を選びます。よって

$$
P_{\mathrm{e}}^*=\min(3/8,1/8)+\min(1/8,3/8)=1/4.
$$

一方、$\Delta=(\rho_0-\rho_1)/2=\operatorname{diag}(1/4,-1/4)$ で $\|\Delta\|_1=1/2$ です。したがって $P_{\mathrm{e}}^*=(1-1/2)/2=1/4$ と一致します。最適測定の二射影は $|0\rangle\langle0|$ と $|1\rangle\langle1|$ です。
<!-- solution-end -->

<a id="ex-qinf10-b01"></a>
### QINF10-B01 非直交純粋状態の測定を構成する

- Level: B

$\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、等事前確率とする。$\Delta$ の固有値と最適効果作用素 $E_0$ を求め、$E_0^2=E_0$ を検査せよ。計算基底で判断した場合の誤り確率とも比較せよ。

<!-- solution-start -->
### 詳細解答

$\rho_0=\begin{pmatrix}1&0\\0&0\end{pmatrix}$、$\rho_1=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ なので

$$
\Delta=\frac14\begin{pmatrix}1&-1\\-1&-1\end{pmatrix},
\qquad \Delta^2=\frac18 I_2.
$$

トレース0、固有値二乗 $1/8$ から固有値は $\pm1/(2\sqrt2)$ です。[Helstrom界](#thm-qinf10-helstrom)より正固有空間の射影を選べばよく、

$$
E_0=\frac12(I_2+2\sqrt2\,\Delta),
\qquad E_1=I_2-E_0.
$$

$B=2\sqrt2\,\Delta$ とおけば $B^2=I_2$、$B^\dagger=B$ です。このため

$$
E_0^2=\frac14(I_2+2B+B^2)
=\frac12(I_2+B)=E_0.
$$

射影なので $E_0,E_1$ はともに非負で和が $I_2$。最適誤り確率は

$$
P_{\mathrm{e}}^*=\frac{1-2/(2\sqrt2)}2
=\frac12\left(1-\frac1{\sqrt2}\right).
$$

計算基底で結果0を仮説0、結果1を仮説1とした場合、状態0で正解する確率1、状態1で正解する確率1/2なので $P_{\mathrm{e}}=1-(1/2+1/4)=1/4$。$1/(2\sqrt2)>1/4$ より最適誤りは $1/4$ より小さくなります。
<!-- solution-end -->

<a id="ex-qinf10-b02"></a>
### QINF10-B02 事前確率で最適判断が切り替わる

- Level: B

$\rho_0=\operatorname{diag}(9/10,1/10)$、$\rho_1=\operatorname{diag}(1/5,4/5)$ とし、$\eta_0=p$、$\eta_1=1-p$、$0\le p\le1$ とする。各観測結果に対する最適判断と $P_{\mathrm{e}}^*(p)$ を区分的に求めよ。境界 $p$ での最適測定の非一意性も説明せよ。

<!-- solution-start -->
### 詳細解答

共通固有基底での[可換状態の尤度比較](#prop-qinf10-commuting)に用いる二つの差は

$$
d_0=\frac9{10}p-\frac15(1-p)=\frac{11p-2}{10},
$$

$$
d_1=\frac1{10}p-\frac45(1-p)=\frac{9p-8}{10}.
$$

結果0では $p>2/11$ なら仮説0、$p<2/11$ なら仮説1です。結果1では $p>8/9$ なら仮説0、$p<8/9$ なら仮説1です。したがって最適測定は三つの領域に分かれます。

1. $0\le p<2/11$：両結果を仮説1とみなし、$E_0=0$、$E_1=I_2$、$P_{\mathrm{e}}^*=p$。
2. $2/11<p<8/9$：結果0なら仮説0、結果1なら仮説1。誤りは $p(1/10)+(1-p)(1/5)=(2-p)/10$。
3. $8/9<p\le1$：両結果を仮説0とみなし、$E_0=I_2$、$E_1=0$、$P_{\mathrm{e}}^*=1-p$。

境界 $p=2/11$ では $d_0=0$ なので結果0の割当ては自由、結果1は仮説1です。$p=8/9$ では $d_1=0$ なので結果1の割当ては自由、結果0は仮説0です。自由度は[Helstrom界](#thm-qinf10-helstrom)の $0\le K\le P_{\mathrm{z}}$ に一致します。誤り確率は各境界で連続し、$p=2/11$ なら $p=(2-p)/10=2/11$、$p=8/9$ なら $(2-p)/10=1-p=1/9$ です。
<!-- solution-end -->

<a id="ex-qinf10-b03"></a>
### QINF10-B03 非対称な事前確率でも固有空間を選ぶ

- Level: B

$|u\rangle=|0\rangle$、$|v\rangle=(\sqrt3|0\rangle+|1\rangle)/2$、$\rho_0=|u\rangle\langle u|$、$\rho_1=|v\rangle\langle v|$、$\eta_0=1/3$、$\eta_1=2/3$ とする。$\Delta$ を行列で求め、最適POVMと最小誤り確率を求めよ。純粋状態の公式と照合せよ。

<!-- solution-start -->
### 詳細解答

まず $\|v\|^2=3/4+1/4=1$、$|\langle u|v\rangle|^2=3/4$ です。射影の行列を代入すると

$$
\begin{aligned}
\Delta&=\frac13\begin{pmatrix}1&0\\0&0\end{pmatrix}
-\frac23\begin{pmatrix}3/4&\sqrt3/4\\\sqrt3/4&1/4\end{pmatrix}\\
&=-\frac16\begin{pmatrix}1&\sqrt3\\\sqrt3&1\end{pmatrix}.
\end{aligned}
$$

$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ と $|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ は固有ベクトルで、固有値はそれぞれ $-(1+\sqrt3)/6<0$、$(\sqrt3-1)/6>0$ です。よって

$$
E_0=|-\rangle\langle-|=\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
\quad E_1=|+\rangle\langle+|.
$$

二つは互いに直交する正射影で和は $I_2$ です。この場合のノルムは

$$
\|\Delta\|_1=\frac{\sqrt3-1}{6}+\frac{\sqrt3+1}{6}
=\frac1{\sqrt3},
$$

従って $P_{\mathrm{e}}^*=(1-1/\sqrt3)/2$。[純粋状態の識別公式](#prop-qinf10-pure-states)へ代入すると

$$
1-4\eta_0\eta_1|\langle u|v\rangle|^2
=1-4\cdot\frac13\cdot\frac23\cdot\frac34
=\frac13,
$$

と同じ答えが得られます。
<!-- solution-end -->

<a id="ex-qinf10-b04"></a>
### QINF10-B04 出力測定を入力へ引き戻す

- Level: B

$Z=\operatorname{diag}(1,-1)$、$\Phi(X)=(X+ZXZ)/2$、$\rho_0=|0\rangle\langle0|$、$\rho_1=|+\rangle\langle+|$、等事前確率とする。$\Phi$ が量子チャネルであることをKraus演算子から確認し、出力の最適誤り確率を求めよ。計算基底の出力測定を入力へ引き戻した効果作用素も求め、入力側の最適誤り確率と比較せよ。

<!-- solution-start -->
### 詳細解答

$K_0=I_2/\sqrt2$、$K_1=Z/\sqrt2$ とすれば $\Phi(X)=\sum_{a=0}^1K_aXK_a^\dagger$、かつ $K_0^\dagger K_0+K_1^\dagger K_1=I_2/2+I_2/2=I_2$ です。[Krausによるチャネル判定](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たします。

$Z|0\rangle=|0\rangle$、$Z|+\rangle=|-\rangle$ なので

$$
\Phi(\rho_0)=|0\rangle\langle0|,
\quad \Phi(\rho_1)=\frac12(|+\rangle\langle+|+|-\rangle\langle-|)=I_2/2.
$$

従って出力の $\Delta_{\mathrm{out}}=(\Phi(\rho_0)-\Phi(\rho_1))/2=\operatorname{diag}(1/4,-1/4)$、ノルムは $1/2$ です。[Helstrom界](#thm-qinf10-helstrom)から出力の最小誤りは $1/4$、最適測定は $F_0=|0\rangle\langle0|$、$F_1=|1\rangle\langle1|$ です。

このチャネルは $\Phi^*(F)=\frac12(F+ZFZ)$ なので、$F_j$ は $Z$ と可換であり

$$
E_j=\Phi^*(F_j)=\frac12(F_j+ZF_jZ)=F_j.
$$

引き戻した入力POVMの誤りも $1/4$ です。しかし入力では[非直交純粋状態の最適識別](#prop-qinf10-pure-states)により $(1-1/\sqrt2)/2<1/4$ まで改善できます。出力側の最適測定は入力側の最適測定に一般には一致せず、[チャネル下の単調性](#prop-qinf10-channel-monotonicity)の不等号が厳密になる具体例です。
<!-- solution-end -->

<a id="ex-qinf10-c01"></a>
### QINF10-C01 雑音の強さと最適測定方向を一緒に追う

- Level: C

$0\le t\le1/2$、$Z=\operatorname{diag}(1,-1)$ として、チャネル $\Phi_t(X)=(1-t)X+tZXZ$ を考える。二状態 $\rho_0=|0\rangle\langle0|$ と $\rho_1=|+\rangle\langle+|$ が等確率で入力され、どちらも $\Phi_t$ を通過してから識別するとする。

1. $\Phi_t$ のKraus演算子を構成し、出力状態およびHelstrom作用素 $\Delta_t$ を求めよ。
2. 最適POVM $(E_0(t),E_1(t))$ を $2\times2$ 行列で構成し、非負性・完全性を確認せよ。
3. 最小誤り確率 $P_{\mathrm{e}}^*(t)$ を導出し、$t$ が大きくなると改善しないこと、$t=0$ と $t=1/2$ での値を確認せよ。
4. 計算基底測定での誤り確率と比較し、いつ最適になるか判定せよ。

<!-- solution-start -->
### 詳細解答

**1. チャネルと二状態の出力。** $K_0=\sqrt{1-t}\,I_2$、$K_1=\sqrt t\,Z$ と置くと

$$
K_0^\dagger K_0+K_1^\dagger K_1
=(1-t)I_2+tI_2=I_2.
$$

したがって[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)が成り立ちます。$Z\rho_0Z=\rho_0$、$Z\rho_1Z=|-\rangle\langle-|$ なので、$c=1-2t\in[0,1]$ と置くと

$$
\sigma_0=\Phi_t(\rho_0)=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad \sigma_1=\Phi_t(\rho_1)
=\frac12\begin{pmatrix}1&c\\c&1\end{pmatrix}.
$$

$\sigma_1$ は自己共役でトレース1、固有値 $(1\pm c)/2\ge0$ なので出力も密度演算子です。等事前確率より

$$
\Delta_t=\frac12(\sigma_0-\sigma_1)
=\frac14\begin{pmatrix}1&-c\\-c&-1\end{pmatrix}.
$$

**2. 最適測定。** $M=\begin{pmatrix}1&-c\\-c&-1\end{pmatrix}$ とすると $M^2=(1+c^2)I_2$ です。$r=\sqrt{1+c^2}>0$ と置けば $B=M/r$ は自己共役で $B^2=I_2$、固有値は $+1,-1$。したがって

$$
E_0(t)=\frac12\left(I_2+\frac{M}{r}\right)
=\frac12\begin{pmatrix}1+1/r&-c/r\\-c/r&1-1/r\end{pmatrix},
$$

$$
E_1(t)=\frac12\left(I_2-\frac{M}{r}\right).
$$

$E_j^\dagger=E_j$、$E_j^2=(I_2\pm2B+B^2)/4=E_j$ です。各 $E_j$ は固有値0または1の射影で非負、和は $I_2$。$\Delta_t=M/4$ の正固有空間は $B$ の $+1$ 固有空間なので、[Helstrom界](#thm-qinf10-helstrom)の最適測定です。

**3. 誤りと単調性。** $\Delta_t^2=r^2I_2/16$ かつトレース0なので、その固有値は $\pm r/4$。従って

$$
\|\Delta_t\|_1=\frac r2,
\qquad
P_{\mathrm{e}}^*(t)=\frac12-\frac14\sqrt{1+(1-2t)^2}.
$$

$t$ が $0$ から $1/2$ へ増えると $c=1-2t$ は1から0へ減少し、$\sqrt{1+c^2}$ も減少するため $P_{\mathrm{e}}^*(t)$ は非減少です。端点では

$$
P_{\mathrm{e}}^*(0)=\frac12-\frac{\sqrt2}{4},
\qquad P_{\mathrm{e}}^*(1/2)=\frac12-\frac14=\frac14.
$$

**4. 計算基底との比較。** 計算基底で結果0なら仮説0、結果1なら仮説1と答え、この判断の誤り確率を $P_{\mathrm{e}}^{Z}$ と書きます。$\sigma_0$ の正解率は1、$\sigma_1$ で結果1の確率は常に $1/2$ です。よって $P_{\mathrm{e}}^{Z}=1-(1/2+1/4)=1/4$ は $t$ に依存しません。

$$
P_{\mathrm{e}}^{Z}-P_{\mathrm{e}}^*(t)
=\frac{\sqrt{1+c^2}-1}{4}\ge0.
$$

等号は $c=0$、すなわち $t=1/2$ のときだけです。この端点では $M=Z$、$E_0=|0\rangle\langle0|$ に一致します。雑音で非対角成分が完全に消えたとき初めて、計算基底での素朴な判断が最適になります。
<!-- solution-end -->

## 8. まとめと次の問い

- 二値判断は $0\le E_0\le I$ の選択に還元され、成功確率は $\eta_1+\operatorname{Tr}(E_0\Delta)$ と表せます。
- Helstrom作用素 $\Delta$ の正固有空間を仮説0、負固有空間を仮説1へ割り当て、零固有空間の判断は自由です。
- 最小平均誤り確率は $P_{\mathrm{e}}^*=(1-\|\Delta\|_1)/2$ です。同一状態では事前確率が支配し、直交状態は完全識別できます。
- 非直交純粋状態では最適測定を適切に回転させます。先に同じ量子チャネルを通しても最適識別性能は改善しません。

次のQINF11では、ここで登場した有限次元トレースノルムを**状態間の距離**として調べ、忠実度との関係やチャネル下での縮小性へ進みます。
