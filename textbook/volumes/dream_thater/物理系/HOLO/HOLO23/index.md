# HOLO23 FLM量子補正：古典面の向こう側にある量子情報

[HOLO22の古典HRT処方](../HOLO22/index.md#def-holo22-hrt-surface)は、境界領域 $A$ に対するエントロピーの主項を、空間的余次元2極値面 $\gamma_A$ の面積から求めました。しかし古典面積が同じでも、バルク量子場の状態を変えれば、面の両側をまたぐ量子相関は変化します。その情報は面積だけでは識別できません。

本講では、**古典RT/HRT面をまず決め、その面の一方のバルク領域で量子場の縮約密度行列を作る**という Faulkner–Lewkowycz–Maldacena（FLM）の考え方を学びます。量子場の寄与は一般にUV発散するため、「面積に裸のエントロピーを足して完成」とはしません。有限cutoffの模型で定義と計算を確認し、重力結合と局所反項まで含めて何を比較すべきか明確にします。

ここでは $\hbar=1$、Lorentz計量は $(-,+,\ldots,+)$、AdS曲率半径を固定した小さな重力結合 $G_N>0$ の半古典展開を用います。$O(G_N^{-1})$ は古典面積の次数、$O(G_N^0)$ は1ループの次数です。境界のUV cutoffとバルク量子場の短距離cutoffは**別のもの**として扱います。FLMは適切な双対性・状態・鞍点・繰り込みを前提とする処方であり、一般のAdS/CFTを無条件に証明する定理ではありません。

## 1. 境界領域に対応するバルク領域を決める

[境界領域の正則化エントロピーデータ](../HOLO17/index.md#def-holo17-boundary-data)では、有限cutoffでヒルベルト空間を領域と補領域に分け、領域外の自由度について部分トレースを取りました。バルクでも同じ操作を行うには、まず「どちら側」を残すかを確定しなければなりません。

境界の空間領域 $A$ と、[HRT候補のアンカー・相同条件](../HOLO22/index.md#def-holo22-hrt-surface)を満たす古典極値面 $\gamma_A^{(0)}$ を固定します。適切なバルクCauchy断面 $\mathcal C$ 上で、$A$ と $\gamma_A^{(0)}$ に挟まれた空間領域を $\Sigma_A$ とし、$\partial\Sigma_A=A\cup\gamma_A^{(0)}$ と書きます。端で向きの符号を付けると $\partial\Sigma_A=A-\gamma_A^{(0)}$ となりますが、ここでは**領域の境界を構成する集合**という意味で $\cup$ を使います。曲面が複数ある場合、同一の境界状態と相同条件の下で古典処方が選ぶ一つを固定します。

バルク量子場の全断面の密度行列を $\rho_{\rm bulk}$ と書きます。有限cutoffで自由度が因子分解する模型では、$\mathcal H_{\rm bulk}=\mathcal H_{\Sigma_A}\otimes\mathcal H_{\Sigma_A^c}$ と置けます。連続体QFTや重力のゲージ拘束がある場合には一般にこの単純な因子分解を前提にできません。**以下の行列の計算はcutoff付き模型のもの**であり、連続体では正則化された領域代数・境界自由度の選択を追加で指定します。

<a id="def-holo23-bulk-entropy"></a>

<!-- formal-statement-start -->
> **定義（古典面に対応するバルク領域エントロピー）**  
> 境界領域 $A$、古典RT/HRT面 $\gamma_A^{(0)}$、これと $A$ に挟まれた断面領域 $\Sigma_A$ を固定する。有限cutoffで $\mathcal H_{\rm bulk}=\mathcal H_{\Sigma_A}\otimes\mathcal H_{\Sigma_A^c}$ が成り立ち、$\rho_{\rm bulk}\ge0$、$\operatorname{Tr}\rho_{\rm bulk}=1$ とする。縮約密度行列と、その無次元のvon Neumannエントロピーを
>
$$
\rho_{\Sigma_A}=\operatorname{Tr}_{\Sigma_A^c}\rho_{\rm bulk},
\qquad
S_{\rm bulk}^{(a)}(\Sigma_A)
=-\operatorname{Tr}_{\Sigma_A}
 \bigl(\rho_{\Sigma_A}\log\rho_{\Sigma_A}\bigr)
$$
>
> と定義する。$a>0$ はバルク短距離cutoffであり、固有値0の項には $0\log0=0$ を採用する。$\Sigma_A$ は面の位置と相同条件を指定した後に決まる。一般の連続体で $a\to0$ の裸の値が有限であるとは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo23-bulk-entropy -->
**定義の確認：面をまたぐBell対。** $\Sigma_A$ 側にqubit $L$、補領域側にqubit $R$ を置き、規格直交基底 $|0\rangle,|1\rangle$ を選びます。状態
$$
|\Psi\rangle=(|0\rangle_L|0\rangle_R+|1\rangle_L|1\rangle_R)/\sqrt2
$$
の密度行列は $\rho_{\rm bulk}=|\Psi\rangle\langle\Psi|$ です。例えば $|00\rangle\langle11|$ の $R$ に関する部分トレースは $\langle1|0\rangle_R|0\rangle_L\langle1|_L=0$ であり、対角二項だけが残ります。したがって
$$
\rho_{\Sigma_A}=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|,
\qquad
\operatorname{Tr}\rho_{\Sigma_A}=1,\qquad
S_{\rm bulk}=-2\frac12\log\frac12=\log2.
$$
正値性は固有値 $1/2,1/2$ で、トレース1も直接確認できます。対照として積状態 $|00\rangle$ を使えば $\rho_{\Sigma_A}=|0\rangle\langle0|$、固有値 $1,0$ なので $S_{\rm bulk}=0$ です。**同じ分割のまま状態だけを変える**とバルクのエントロピーが変わることが、面積に量子補正が必要になる理由です。
<!-- definition-example-end -->

この二qubit模型の境界は数学的な「自由度の分割」であって、実際のAdS空間の幾何学的な面積を与えるものではありません。幾何学的な $\gamma_A$ は別に指定する必要があります。

## 2. レプリカ微分が部分トレースのエントロピーを再現する

[HOLO21の正規化された重力レプリカ量](../HOLO21/index.md#def-holo21-gravity-replica)で用いた「複製した分配関数から元の分配関数の $n$ 乗を割る」という操作は、有限次元の密度行列でもそのまま確認できます。整数 $n\ge2$ で $\operatorname{Tr}(\rho_{\Sigma_A}^n)$ を計算すると、cutoff付き模型のレプリカ境界条件を代数的に表せます。

<a id="prop-holo23-replica-entropy"></a>

<!-- formal-statement-start -->
> **命題（有限次元のレプリカ微分）**  
> 有限次元密度行列 $\rho$ の固有値を $p_i\ge0$、$\sum_i p_i=1$ とする。実数 $n$ を1の近傍で動かし、零固有値の寄与を0と定義した
>
$$
M(n)=\operatorname{Tr}\rho^n=\sum_{p_i>0}p_i^n
$$
>
> に対して、$M(1)=1$ かつ
>
$$
-\left.\frac{d}{dn}\log M(n)\right|_{n=1}
=-\sum_i p_i\log p_i=S(\rho).
$$
>
> 整数 $n$ の値しか分からない一般の重力経路積分に、この微分を適用するには別途適切な解析接続が必要である。
<!-- formal-statement-end -->

**証明の見取り図**：固有値を固定して複製数 $n$ のみを変えると、各 $p_i^n$ の導関数は $p_i^n\log p_i$ です。$n=1$ では分母が1になります。

<!-- proof-start -->
### 証明

有限個の正の固有値について $d(p_i^n)/dn=p_i^n\log p_i$ と微分できるため、
$$
M'(n)=\sum_{p_i>0}p_i^n\log p_i.
$$
連鎖律で $(d/dn)\log M(n)=M'(n)/M(n)$、ここで $M(1)=\sum_i p_i=1$ だから
$$
-\left.\frac{M'(n)}{M(n)}\right|_{n=1}
=-\sum_{p_i>0}p_i\log p_i.
$$
有限個の零固有値については $0\log0=0$ の約束で補うと定義の式になります。微分する変数は **複製数 $n$** であり、確率 $p_i$ や面 $\gamma_A^{(0)}$ は固定しています。
<!-- proof-end -->

**定義例の再計算**：Bell対では $M(n)=2(1/2)^n=2^{1-n}$、$\log M(n)=(1-n)\log2$ です。従って $-\partial_n\log M(n)|_{n=1}=\log2$。積状態では $M(n)=1$ で0になります。

一般にcutoff付きの量子場のレプリカ分配関数を $Z_n^{\rm matter}$、単一枚を $Z_1^{\rm matter}$ と書き、同じ幾何・同じ正規化の下で
$$
\operatorname{Tr}\rho_{\Sigma_A}^n
=\frac{Z_n^{\rm matter}}{(Z_1^{\rm matter})^n}
$$
と同定できるなら、
$$
S_{\rm bulk}^{(a)}
=-\left.\frac{\partial}{\partial n}
 \bigl[\log Z_n^{\rm matter}-n\log Z_1^{\rm matter}\bigr]\right|_{n=1}.
$$
これは有限cutoffでのレプリカ恒等式と、適切な $n\to1$ 接続を前提とした**量子場の寄与**です。重力側では、[HOLO21の円錐局在曲率による古典面積項](../HOLO21/index.md#prop-holo21-area-term)が別の $O(G_N^{-1})$ 寄与を与えます。両者を同じ次数とみなさないことが重要です。

## 3. FLMの主張と展開次数

面積に量子場の寄与を足す前に、どの「面積」を使うのかを整理します。$g_0$ を古典方程式の解、$g_{\rm sc}=g_0+G_Nh+O(G_N^2)$ を1ループの反作用（backreaction）を考慮した計量とします。$h$ は $G_N\to0$ で有限の計量摂動です。古典面の面積を $A_0=\operatorname{Area}_{g_0}(\gamma_A^{(0)})$ と書きます。

<a id="def-holo23-flm"></a>

<!-- formal-statement-start -->
> **処方（FLMの一次量子補正：条件付き）**  
> 半古典重力双対、対象領域の古典RT/HRT面 $\gamma_A^{(0)}$ の存在と適切な選択、バルクの量子状態、cutoffと局所反項の整合、鞍点まわりの摂動展開を仮定する。境界エントロピーの $G_N$ 展開は模式的に
>
$$
S_{\partial}(A)
=\frac{A_0}{4G_N}
+\underbrace{\frac{\delta_g A}{4G_N}
+S_{\rm bulk}^{(a)}(\Sigma_A)
+S_{\rm local}^{(1)}(a)}_{\text{$O(G_N^0)$：繰り込みと同じ規約で合わせる}}
+O(G_N).
$$
>
> $\delta_g A=\operatorname{Area}_{g_{\rm sc}}(\gamma_A^{(0)})-A_0=O(G_N)$ は**同じ古典面の位置を固定した計量反作用による**面積変化である。$S_{\rm local}^{(1)}$ はゲージ場・重力・非極小結合などの局所面項と反項を含み得る。$S_{\rm bulk}^{(a)}$ は[バルク領域エントロピー](#def-holo23-bulk-entropy)であり、単独でcutoffを外せるとは限らない。上式は次数と寄与の整理で、一般背景での無条件な等式の証明ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo23-flm -->
**処方の確認：同じ古典面積の二状態。** 面の規約を固定して $A_0=8G_Ns$（$s>0$ は無次元）、反作用と局所面項の差が無いと仮定する二状態を考えます。状態Iで上のBell対、状態IIで積状態を置けば、古典面積項はいずれも $A_0/(4G_N)=2s$ です。量子場の差は
$$
S_{\partial}^{\rm I}-S_{\partial}^{\rm II}
=(\log2-0)+O(G_N)
$$
です。ここで**面積が8$G_Ns$と表せることは幾何モデルの仮定**で、Bell対から面積の値を導いたわけではありません。状態差で反作用も変わる一般の重力模型では、その $O(1)$ の面積差を一緒に評価しなければこの式は使えません。
<!-- definition-example-end -->

[古典HRT面の二法線方向の停留条件](../HOLO22/index.md#prop-holo22-expansion-equivalence)は、面の位置を $O(G_N)$ 動かしても古典面積の一次変化が零になる理由を与えます。ただし**計量そのものの変化による面積変化は零とは限りません**。また古典面が複数競合して主項が縮退する場合は、各候補の $O(1)$ 項も比較して選択し直す必要があります。

