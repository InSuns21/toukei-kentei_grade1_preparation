# HOLO30 作用素代数量子誤り訂正

<!-- definition-example-audit: strict -->

[HOLO29の三つの二領域表現](../HOLO29/index.md#thm-holo29-three-representations)では、論理qutritの**すべての線形作用素**を、異なる境界部分領域に載せられました。しかし重力で幾何に対応する「面積」が状態とともに変わるとき、異なる幾何をつなぐ作用素まで同じ領域から測れるとは限りません。[HOLO28の直和コード](../HOLO28/index.md#def-holo28-sector-area)には既にこの兆候が現れています。

本講では「回復すべき情報を全論理状態から**観測量の部分代数**へ絞る」と何が変わるかを、有限行列だけから解きます。特に、二つの領域で共通に読める中心（セクターのラベル）と、片側だけで読める非可換な量子情報を分離します。最後に、エントロピーの**面積型中心項**を導きます。一般の連続場の局所作用素代数や重力の完全な復号を証明するものではありません。

## 0. 何をどこまで仮定するか

以後のHilbert空間はすべて**複素有限次元**で、対数は自然対数、エントロピーの単位は nat とします。$I_H$ は空間 $H$ の恒等作用素、$\mathcal B(H)$ は $H$ 上の線形作用素全体、$X^\dagger$ は随伴です。物理系を $A,\bar A$ と書き、そのHilbert空間を $H_A,H_{\bar A}$ とします。符号化は等長写像

$$
V:H_{\mathrm{code}}\longrightarrow H_A\otimes H_{\bar A},
\qquad V^\dagger V=I_{\mathrm{code}}
$$

です。$A$ を保持して $\bar A$ を失う問題を考えます。$V$ の像に限った作用の等式と、物理空間全体の演算子等式を区別します。行列の対数・相対エントロピーについては[HOLO28のモジュラーHamiltonian](../HOLO28/index.md#def-holo28-modular-hamiltonian)と[QINF20の量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)を使います。ただしQINF20は底2の対数を使うので、本講で自然対数を使う値との対応は

$$
D_{\mathrm{nat}}(\rho\Vert\sigma)
=(\log 2)D_{\mathrm{bit}}(\rho\Vert\sigma)
$$

です。台の包含条件は対数の底を変えても同じです。

## 1. 失われても測りたいものを「代数」で指定する

一つのqutritの全行列を復元する方法では、「セクター番号は読めるが、番号を変える量子操作は復元できない」という状況を記述しにくくなります。そこで、足し算・掛け算・随伴を行っても閉じる観測量の集まりを先に選びます。例えば2次元空間の対角行列全体はこの性質を持ちますが、非対角行列は含みません。

<a id="def-holo30-observable-algebra"></a>

<!-- formal-statement-start -->
> **定義（有限次元の観測量代数と中心）**  
> 有限次元Hilbert空間 $H$ に対し、$\mathcal M\subseteq\mathcal B(H)$ が和・複素数倍・積・随伴で閉じ、$I_H$ を含むとき、$\mathcal M$ を（単位的な）観測量の $*$-代数と呼ぶ。$\mathcal B(H)$ 内の可換子代数を

$$
\mathcal M'=\{T\in\mathcal B(H):TO=OT\ \text{for every }O\in\mathcal M\}
$$

> とし、$\mathcal Z(\mathcal M)=\mathcal M\cap\mathcal M'$ を中心と呼ぶ。中心にある観測量は $\mathcal M$ のすべての観測量と可換である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo30-observable-algebra -->
**定義の確認**。 $H=\mathbb C^2$ の標準正規直交基底 $|0\rangle,|1\rangle$ で行列を表し、$\mathcal M$ をすべての対角行列とします。二つの対角行列の和・複素数倍・積・随伴は再び対角行列で、$I_2=\operatorname{diag}(1,1)$ も入ります。可換子の定義は、各 $O\in\mathcal M$ に対し $TO=OT$ を調べることです。特に $P_0=|0\rangle\langle0|=\operatorname{diag}(1,0)\in\mathcal M$ と $T=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ について

$$
TP_0=\begin{pmatrix}a&0\\c&0\end{pmatrix},
\qquad
P_0T=\begin{pmatrix}a&b\\0&0\end{pmatrix}
$$

なので $b=c=0$ です。逆に任意の対角行列はすべての対角行列と可換であるため、$\mathcal M'=\mathcal M$、中心も $\mathcal M$ です。対照的に $\mathcal M=\mathcal B(\mathbb C^2)$ なら、すべての行列と可換な $T$ は $T=\lambda I_2$ のみです（対角射影との可換性で非対角項が消え、$|0\rangle\langle1|$ との可換性で二対角成分が等しくなります）。
<!-- definition-example-end -->

中心が大きいとは、**互いに区別できる古典的ラベル**があるということです。一方で中心の非対角方向を自由に操作できるという意味ではありません。

## 2. 直和セクターを行列で組み立てる

有限個のラベル $\alpha$ ごとに「$A$ 側へ渡したい自由度」$a_\alpha$ と、「補領域側に残す自由度」$b_\alpha$ を分けます。直和は異なるラベル間の重ね合わせを持つHilbert空間ですが、以下の観測量代数は**ラベルを変えないブロック対角行列**だけです。各ブロックの内部では $a_\alpha$ を任意に操作できます。

<a id="def-holo30-direct-sum-code"></a>

<!-- formal-statement-start -->
> **定義（直和セクターの論理代数）**  
> 有限集合 $\Lambda$ と、零でない有限次元Hilbert空間 $H_{a_\alpha},H_{b_\alpha}$ を選び、

$$
H_{\mathrm{code}}
=\bigoplus_{\alpha\in\Lambda}
(H_{a_\alpha}\otimes H_{b_\alpha}),\qquad
\mathcal M
=\bigoplus_{\alpha\in\Lambda}
\bigl(\mathcal B(H_{a_\alpha})\otimes I_{b_\alpha}\bigr)
$$

> と定める。$P_\alpha$ を第 $\alpha$ ブロックへの直交射影とする。$\mathcal M$ は $a_\alpha$ の観測量を表し、$P_\alpha$ はセクター番号が $\alpha$ かどうかを判定する観測量である。
<!-- formal-statement-end -->

各 $P_\alpha$ は $P_\alpha^2=P_\alpha=P_\alpha^\dagger$、$P_\alpha P_\beta=0$（$\alpha\ne\beta$）、$\sum_\alpha P_\alpha=I$ を満たします。任意の $O=\bigoplus_\beta(O_{a_\beta}\otimes I_{b_\beta})$ に対して、$P_\alpha O=OP_\alpha$ は各ブロックで確認できます。

<a id="prop-holo30-center-commutant"></a>

<!-- formal-statement-start -->
> **命題（直和論理代数の中心と可換子）**  
> 上の有限次元直和代数 $\mathcal M$ に対して、

$$
\mathcal Z(\mathcal M)=
\left\{\sum_\alpha z_\alpha P_\alpha:z_\alpha\in\mathbb C\right\},
\qquad
\mathcal M'=\bigoplus_\alpha
\bigl(I_{a_\alpha}\otimes\mathcal B(H_{b_\alpha})\bigr).
$$

> 特に、中心射影は $\mathcal M$ と $\mathcal M'$ の両方に属する。異なるセクター間を写す非零の作用素は、一般に $\mathcal M$ にも $\mathcal M'$ にも属さない。
<!-- formal-statement-end -->

**証明の見取り図。** 条件 $TO=OT$ を満たす候補 $T$ をセクター間の行列ブロック $P_\alpha TP_\beta$ で分けます。まず $P_\alpha$ との可換性で異なるブロック間の移動を禁止し、その後に各ブロックのすべての $a_\alpha$ 行列との可換性を調べます。

<!-- proof-start -->
### 証明

$T\in\mathcal M'$ とします。$P_\alpha\in\mathcal M$ なので $TP_\alpha=P_\alpha T$。$\alpha\ne\beta$ なら

$$
P_\alpha TP_\beta=P_\alpha P_\beta T=0
$$

であり、$T=\bigoplus_\alpha T_\alpha$ はブロック対角です。$\alpha$ ブロックの正規直交基底 $|i\rangle_a$ を選び、

$$
T_\alpha=\sum_{i,j}|i\rangle\langle j|_a\otimes T_{ij}
$$

と展開します。ここで $T_{ij}$ は $H_{b_\alpha}$ 上の作用素で、基底の行列要素を取って

$$
T_{ij}=(\langle i|_a\otimes I_b)T_\alpha(|j\rangle_a\otimes I_b)
$$

と定まります。$E_{kk}=|k\rangle\langle k|_a$ と置くと、$E_{kk}\otimes I_b$ との可換性は

$$
(E_{kk}\otimes I_b)T_\alpha
=\sum_j|k\rangle\langle j|_a\otimes T_{kj},
\qquad
T_\alpha(E_{kk}\otimes I_b)
=\sum_i|i\rangle\langle k|_a\otimes T_{ik}
$$

を等置する条件です。異なる行列単位の係数を比べると $T_{ij}=0$（$i\ne j$）。次に $E_{ij}=|i\rangle\langle j|_a$（$i\ne j$）について

$$
T_\alpha(E_{ij}\otimes I_b)=E_{ij}\otimes T_{ii},
\qquad
(E_{ij}\otimes I_b)T_\alpha=E_{ij}\otimes T_{jj}
$$

なので、可換性は $T_{ii}=T_{jj}$ を与えます。$a_\alpha$ が1次元の場合も同じ結論は直ちに成立します。よって $T_\alpha=I_{a_\alpha}\otimes T_{b_\alpha}$ です。逆向きの可換性はテンソル積の異なる因子が可換であることから従います。

中心の元は同時に $\mathcal M$ に属するので、各ブロックで $O_{a_\alpha}\otimes I_b=I_a\otimes T_b$ です。両辺の $a,b$ の基底行列要素を比較すると、どちらも $z_\alpha I_a\otimes I_b$ でなければなりません。従って中心は $\sum_\alpha z_\alpha P_\alpha$ です。
<!-- proof-end -->

<!-- definition-example-start: def-holo30-direct-sum-code -->
**定義の確認**（二セクター）。 両ブロックで $H_{a_\alpha}=H_{b_\alpha}=\mathbb C^2$ とし、$\Lambda=\{0,1\}$ とします。$H_{\mathrm{code}}$ は8次元、$\mathcal M=\{\operatorname{diag}(O_0\otimes I_2,O_1\otimes I_2)\}$ です。積・随伴を取ってもこの形を保ち、$O_0=O_1=I_2$ は単位元です。$P_0=\operatorname{diag}(I_4,0_4)$ と $P_1=\operatorname{diag}(0_4,I_4)$ はすべてのこの行列と可換なので中心に属します。例えば $|0,a=0,b=0\rangle\langle1,a=0,b=0|$ はセクターを移し、$P_0$ と可換でないため $\mathcal M$ には入りません。
<!-- definition-example-end -->

## 3. 境界の片側で作用素を復元する

[HOLO29の部分領域上の論理演算子表現](../HOLO29/index.md#def-holo29-pair-representation)は、一つの演算子 $O$ に対し、物理領域に局在する $O_A$ が $O_A V=VO$ を満たすという条件でした。ここでは**代数の全元を同時に**この条件で表現します。和・積・随伴も保つ表現を選ぶと、演算子の測定と合成が一つの固定した符号上で整合します。

<a id="def-holo30-algebra-reconstruction"></a>

<!-- formal-statement-start -->
> **定義（領域上の論理代数の完全再構成）**  
> 有限次元等長写像 $V:H_{\mathrm{code}}\to H_A\otimes H_{\bar A}$ と単位的な $*$-代数 $\mathcal M\subseteq\mathcal B(H_{\mathrm{code}})$ を固定する。単位・和・積・随伴を保つ写像 $\pi_A:\mathcal M\to\mathcal B(H_A)$ が存在し、すべての $O\in\mathcal M$ に対して

$$
(\pi_A(O)\otimes I_{\bar A})V=VO
$$

> を満たすとき、$\mathcal M$ は領域 $A$ から完全再構成可能であるという。$\pi_A$ は符号状態に依存しない。$H_A$ に未使用の直交補空間がある場合も、そこでの表現を含めて単位的に定めるものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo30-algebra-reconstruction -->
**定義の確認**（恒等埋め込み）。 $H_{\mathrm{code}}=H_a\otimes H_b$、$H_A=H_a$、$H_{\bar A}=H_b$ とし、$V=I_{H_a\otimes H_b}$ を同じ因子順序の恒等埋め込みとします。$\mathcal M=\mathcal B(H_a)\otimes I_b$ とすると $\pi_A(O_a\otimes I_b)=O_a$ です。二つの演算子 $O_a,T_a$ について $\pi_A(OT)=O_aT_a=\pi_A(O)\pi_A(T)$、$\pi_A(O^\dagger)=O_a^\dagger$ であり、任意の $|u\rangle_a|v\rangle_b$ 上で $(O_a\otimes I_b)V=V(O_a\otimes I_b)$ が成立します。一方 $b$ だけを変える作用素は一般にこの代数には含まれません。
<!-- definition-example-end -->

一般の符号では、保持系 $A$ から**論理状態全体**を復号できる必要はありません。ここで求めるのは $\mathcal M$ の観測統計の回復です。例えば $a$ の状態は回復できても、$b$ の未知の状態まで回復することは要求しません。

## 4. 中心と両側再構成を持つ有限コード

具体的な符号を構成します。各セクターで正整数 $d_\alpha$ を選び、$A$ 側の補助系 $e_{A,\alpha}$ と $\bar A$ 側の補助系 $e_{B,\alpha}$ をともに $d_\alpha$ 次元とします。物理Hilbert空間を

$$
H_A=\bigoplus_\alpha(H_{a_\alpha}\otimes H_{e_{A,\alpha}}),\qquad
H_{\bar A}=\bigoplus_\alpha(H_{b_\alpha}\otimes H_{e_{B,\alpha}})
$$

とします。異なる $\alpha$ の物理ブロックは直交します。符号化は各 $\alpha$ で最大エンタングル状態

$$
|\Phi_{d_\alpha}\rangle=
\frac1{\sqrt{d_\alpha}}\sum_{r=1}^{d_\alpha}
|r\rangle_{e_{A,\alpha}}|r\rangle_{e_{B,\alpha}}
$$

を追加する写像です。$|u\rangle_{a_\alpha}|v\rangle_{b_\alpha}$ を $|u\rangle_{a_\alpha}|\Phi_{d_\alpha}\rangle|v\rangle_{b_\alpha}$ に写し、$A,\bar A$ の順に因子を並べ替えます。$|\Phi_{d_\alpha}\rangle$ のノルムは1、異なるブロックの像は両物理領域で直交するので、$V^\dagger V=I_{\mathrm{code}}$ です。

| セクター | $A$ が持つもの | $\bar A$ が持つもの | 両側にある情報 |
| --- | --- | --- | --- |
| $\alpha$ | $a_\alpha$ と補助半分 $e_{A,\alpha}$ | $b_\alpha$ と補助半分 $e_{B,\alpha}$ | セクター射影 $P_\alpha$ |
| 異なる $\alpha$ の関係 | $A$ 内では直交ブロック | $\bar A$ 内でも直交ブロック | ラベル間の位相は各片側で消える |

<a id="thm-holo30-complementary-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（直和コードの相補的代数再構成）**  
> 上記の有限次元符号 $V$ と第2節の $\mathcal M$ に対し、$\mathcal M$ は $A$ 上で、$\mathcal M'$ は $\bar A$ 上で完全再構成可能である。中心 $\mathcal Z(\mathcal M)$ の各 $P_\alpha$ は両物理領域で再構成できる。一方、$\alpha\ne\beta$ の間の非零の行列ブロック $P_\alpha TP_\beta$ は、$A$ 上にも $\bar A$ 上にも符号上の表現を持たない。
<!-- formal-statement-end -->

**証明の見取り図。** $A$ 上では $O_{a_\alpha}$ をそのまま作用させ、$\bar A$ 上では $T_{b_\alpha}$ をそのまま作用させます。セクターラベルは各物理因子の直和ブロックに刻まれています。非対角のセクター間操作は、反対側のラベルも同時に変える必要があるため、片側の操作では実現できません。

<!-- proof-start -->
### 証明

$O=\bigoplus_\alpha(O_{a_\alpha}\otimes I_{b_\alpha})\in\mathcal M$ に対し、$A$ 上で

$$
\pi_A(O)=\bigoplus_\alpha(O_{a_\alpha}\otimes I_{e_{A,\alpha}})
$$

と定めます。各ブロックの $O_{a_\alpha}$ が最大エンタングル状態の補助因子に作用しないことから、基底ベクトルごとに

$$
(\pi_A(O)\otimes I_{\bar A})
V(|u\rangle_{a_\alpha}|v\rangle_{b_\alpha})
=V(O_{a_\alpha}|u\rangle_{a_\alpha}|v\rangle_{b_\alpha})
$$

が成立します。$\pi_A(I)=I_A$ であり、和・積・随伴の保存は各ブロックの行列演算から従います。線形性で任意のコードベクトルについて再構成条件を得ます。

[第2節の命題](#prop-holo30-center-commutant)で求めた作用素の集合は $\mathcal M'=\bigoplus_\alpha(I_{a_\alpha}\otimes\mathcal B(H_{b_\alpha}))$ です。$\bar A$ 上で $\pi_{\bar A}(T)=\bigoplus_\alpha(T_{b_\alpha}\otimes I_{e_{B,\alpha}})$ とすれば、同じ基底計算で $(I_A\otimes\pi_{\bar A}(T))V=VT$ です。特に $\pi_A(P_\alpha)$ と $\pi_{\bar A}(P_\alpha)$ はそれぞれ物理領域の第 $\alpha$ ブロック射影です。

最後に $\alpha\ne\beta$ で $P_\alpha TP_\beta\ne0$ と仮定します。物理 $A$ の任意の $X_A$ は、$\bar A$ のセクターを変えません。入力が $\beta$ ブロックなら $(X_A\otimes I)V$ は $\bar A$ の $\beta$ ブロックに残ります。他方 $VT$ の $\alpha$ 成分は $\bar A$ の $\alpha$ ブロックにあり、互いに直交します。よって $(X_A\otimes I)V=VT$ は不可能です。$A$ と $\bar A$ を交換しても同じです。
<!-- proof-end -->

**小さい直接例。** 両セクターで $a_\alpha=b_\alpha=\mathbb C^2$ とし、$d_0=1,d_1=2$ とします。論理空間は8次元、物理 $A,\bar A$ はともに $2+4=6$ 次元です。$A$ の物理作用素

$$
Z_A=\operatorname{diag}(Z\otimes I_1,Z\otimes I_2),
\qquad Z=\operatorname{diag}(1,-1)
$$

は $Z_{\mathrm{logic}}=\operatorname{diag}(Z\otimes I_2,Z\otimes I_2)$ を表現します。$A$ のブロック射影 $\operatorname{diag}(I_2,0_4)$ と $\bar A$ の $\operatorname{diag}(I_2,0_4)$ はいずれも論理 $P_0$ を表します。ところが $|0,0,0\rangle\langle1,0,0|$ というセクター間の遷移は、$\bar A$ のセクターラベルも変えるので $A$ に局在できません。

**中心の複製は量子複製ではない。** 両側が同時に測れるのは可換な $P_\alpha$ です。例えば状態 $\sqrt p\,|0,u,v\rangle+\sqrt{1-p}\,|1,u',v'\rangle$ のラベルの確率 $p,1-p$ は双方で読めても、相対位相を表す非対角作用素はどちらにも載りません。この区別が、全ての非可換な未知量子情報を二度複製するという[HOLO29の複製禁止との整合性](../HOLO29/index.md#thm-holo29-three-representations)を保ちます。

### 補領域に残る情報についての制約

$A$ にある論理代数が再構成可能なら、失った側のあらゆる観測量は、その論理代数と可換なものとしてしかコード内に作用できません。これが作用素代数型の消失訂正を判定するときの第一歩です。

<a id="prop-holo30-complementary-commutation"></a>

<!-- formal-statement-start -->
> **命題（完全再構成の補領域可換性）**  
> 有限次元等長符号 $V:H_{\mathrm{code}}\to H_A\otimes H_{\bar A}$ において、単位的 $*$-代数 $\mathcal M$ が $A$ で完全再構成可能なら、任意の $Y\in\mathcal B(H_{\bar A})$ と任意の $O\in\mathcal M$ について

$$
\left[V^\dagger(I_A\otimes Y)V,O\right]=0.
$$

> すなわち、失った側の物理観測量をコードへ圧縮すると $\mathcal M'$ に属する。
<!-- formal-statement-end -->

**証明の見取り図。** $A$ の代表作用素と $\bar A$ の任意の作用素は物理空間で可換です。再構成の等式を作用素とその随伴の両方へ適用し、符号空間上で比較します。

<!-- proof-start -->
### 証明

[再構成の定義](#def-holo30-algebra-reconstruction)から $\pi_A(O)V=VO$（物理的な恒等因子は省略）です。$*$ の保存を $O^\dagger$ に適用して随伴を取ると、$V^\dagger\pi_A(O)=OV^\dagger$ も得ます。$W=I_A\otimes Y$ とおくと $W\pi_A(O)=\pi_A(O)W$ なので

$$
\begin{aligned}
V^\dagger W V O
&=V^\dagger W\pi_A(O)V\\
&=V^\dagger\pi_A(O)WV\\
&=O\,V^\dagger W V.
\end{aligned}
$$

これで $V^\dagger WV\in\mathcal M'$ を得ます。逆方向（可換性から復号を作る）の一般定理は、この必要条件だけから自動的に証明されたものではありません。本節の直和符号では代表作用素を上で実際に構成したので、十分性もこの模型について確認済みです。
<!-- proof-end -->

## 5. セクターごとの面積型エントロピー

[HOLO28の面積型中心作用素](../HOLO28/index.md#def-holo28-sector-area)は、各ブロックで固定した $\log d_\alpha$ の和です。その式は直和の情報を持つ符号のエントロピーとして、どの条件で現れるのでしょうか。

論理状態 $\rho$ の第 $\alpha$ ブロックの重みを $p_\alpha=\operatorname{Tr}(P_\alpha\rho)$ とし、$p_\alpha>0$ のとき

$$
\rho_{a_\alpha}
=\frac{\operatorname{Tr}_{b_\alpha}(P_\alpha\rho P_\alpha)}{p_\alpha}
$$

と定めます。$p_\alpha=0$ なら $p_\alpha S(\rho_{a_\alpha})=0$ と解釈します。中心射影の確率分布に関するShannonエントロピーを $H(p)=-\sum_\alpha p_\alpha\log p_\alpha$（$0\log0=0$）とします。なぜ $b_\alpha$ を捨てて $\rho_{a_\alpha}$ を並べればよいかは、任意の $O=\bigoplus_\alpha(O_{a_\alpha}\otimes I_{b_\alpha})\in\mathcal M$ に対する期待値で確かめられます。

$$
\operatorname{Tr}_{H_{\mathrm{code}}}(\rho O)
=\sum_\alpha\operatorname{Tr}_{a_\alpha b_\alpha}
\bigl(P_\alpha\rho P_\alpha(O_{a_\alpha}\otimes I_{b_\alpha})\bigr)
=\sum_\alpha p_\alpha\operatorname{Tr}_{a_\alpha}(\rho_{a_\alpha}O_{a_\alpha}).
$$

第1の等号は $O$ がブロック対角であること、第2は部分トレースの定義によります。したがって $\mathcal M$ の全期待値は $p_\alpha\rho_{a_\alpha}$ だけから決まり、表現先を $\bigoplus_\alpha H_{a_\alpha}$ とする密度行列で代数の状態を記述できます。観測量代数の状態のエントロピーを次式で表します。

<a id="def-holo30-algebra-entropy"></a>

<!-- formal-statement-start -->
> **定義（有限直和代数の状態エントロピー）**  
> $H_{\mathrm{code}}=\bigoplus_\alpha(H_{a_\alpha}\otimes H_{b_\alpha})$ と $\mathcal M=\bigoplus_\alpha(\mathcal B(H_{a_\alpha})\otimes I_{b_\alpha})$ を固定する。密度行列 $\rho$ の $\mathcal M$ に対する制限状態は $H_{\mathcal M}:=\bigoplus_\alpha H_{a_\alpha}$ 上の $\rho_{\mathcal M}=\bigoplus_\alpha p_\alpha\rho_{a_\alpha}$ で表し、そのエントロピーを

$$
S_{\mathcal M}(\rho)
=-\operatorname{Tr}(\rho_{\mathcal M}\log\rho_{\mathcal M})
=H(p)+\sum_\alpha p_\alpha S(\rho_{a_\alpha})
$$

> とする。この表現行列は $H_{\mathrm{code}}$ 全体上の $\rho$ と同一視しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo30-algebra-entropy -->
**定義の確認**。 二セクターで $a_0=a_1=\mathbb C$、$p_0=1/4,p_1=3/4$ とすれば $\rho_{\mathcal M}=\operatorname{diag}(1/4,3/4)$。正半定値、トレース1で、固有値から $S_{\mathcal M}(\rho)=-\frac14\log\frac14-\frac34\log\frac34=H(1/4,3/4)$ です。$b_\alpha$ の状態や二つのセクター間の相対位相は、$\mathcal M$ の期待値に影響せず、このエントロピーにも現れません。
<!-- definition-example-end -->

<a id="thm-holo30-algebraic-rt"></a>

<!-- formal-statement-start -->
> **定理（有限直和コードの量子RT型恒等式）**  
> 第4節の有限次元等長符号で、任意のコード密度行列 $\rho$ を符号化した $A$ 側の状態を $\rho_A=\operatorname{Tr}_{\bar A}(V\rho V^\dagger)$ とする。面積型中心作用素を

$$
\mathcal L=\sum_\alpha(\log d_\alpha)P_\alpha
$$

> と定めれば、セクター間のコヒーレンスがある $\rho$ についても

$$
S(\rho_A)=S_{\mathcal M}(\rho)+\operatorname{Tr}(\rho\mathcal L).
$$

> また二つのコード状態 $\rho,\sigma$ について、$\operatorname{supp}(\rho_{\mathcal M})\subseteq\operatorname{supp}(\sigma_{\mathcal M})$ なら、直和代数上の相対エントロピーを用いて

$$
D(\rho_A\Vert\sigma_A)
=D(\rho_{\mathcal M}\Vert\sigma_{\mathcal M})
$$

> が成り立つ。右辺は各ブロックの $p_\alpha\rho_{a_\alpha}$ と $q_\alpha\sigma_{a_\alpha}$ から計算する。台包含が破れる場合には両辺を $+\infty$ と定める。
<!-- formal-statement-end -->

**証明の見取り図。** 両側に残したセクターラベルが直交するので、$\bar A$ をトレースすると交差項が消えます。各 $A$ ブロックには $\rho_{a_\alpha}$ と最大混合補助状態 $I_{d_\alpha}/d_\alpha$ が現れます。エントロピーの固有値を一つずつ数えると、古典的な $H(p)$、代数のエントロピー、補助系の $\log d_\alpha$ が分かれます。

<!-- proof-start -->
### 証明

$\rho$ をセクターの直和ブロック $\rho_{\alpha\beta}=P_\alpha\rho P_\beta$ に分解します。$\alpha\ne\beta$ では符号化後の $\bar A$ の両側が直交するセクターに属します。実際、$\bar A$ の正規直交基底 $|k,\gamma\rangle_{\bar A}$ をセクター $\gamma$ ごとに取ると、部分トレースの各項

$$
(I_A\otimes\langle k,\gamma|)V\rho_{\alpha\beta}V^\dagger
(I_A\otimes|k,\gamma\rangle)
$$

は $\gamma=\alpha$ と $\gamma=\beta$ を同時に満たさない限り零です。よって $\operatorname{Tr}_{\bar A}(V\rho_{\alpha\beta}V^\dagger)=0$。対角ブロックでは、補助状態の部分トレース $\operatorname{Tr}_{e_{B,\alpha}}|\Phi_{d_\alpha}\rangle\langle\Phi_{d_\alpha}|=d_\alpha^{-1}\sum_{r=1}^{d_\alpha}|r\rangle\langle r|=I_{d_\alpha}/d_\alpha$ を使うと

$$
\operatorname{Tr}_{\bar A}(V\rho_{\alpha\alpha}V^\dagger)
=p_\alpha\rho_{a_\alpha}\otimes\frac{I_{d_\alpha}}{d_\alpha}
$$

です。従って

$$
\rho_A=\bigoplus_\alpha
\left(p_\alpha\rho_{a_\alpha}\otimes
\frac{I_{d_\alpha}}{d_\alpha}\right).
$$

$\rho_{a_\alpha}$ の固有値を $r_{\alpha j}$ とすると、$A$ 側の非零固有値は $p_\alpha r_{\alpha j}/d_\alpha$ がそれぞれ $d_\alpha$ 回ずつ現れます。よって

$$
\begin{aligned}
S(\rho_A)
&=-\sum_{\alpha,j}d_\alpha
\frac{p_\alpha r_{\alpha j}}{d_\alpha}
\log\frac{p_\alpha r_{\alpha j}}{d_\alpha}\\
&=-\sum_\alpha p_\alpha\log p_\alpha
-\sum_{\alpha,j}p_\alpha r_{\alpha j}\log r_{\alpha j}
+\sum_\alpha p_\alpha\log d_\alpha\\
&=H(p)+\sum_\alpha p_\alpha S(\rho_{a_\alpha})
+\sum_\alpha p_\alpha\log d_\alpha.
\end{aligned}
$$

ここで $\sum_jr_{\alpha j}=1$ を使いました。最後の和は $\operatorname{Tr}(\rho\mathcal L)$、前二項は $S_{\mathcal M}(\rho)$ です。

次に $\sigma$ のセクター確率を $q_\alpha$、状態を $\sigma_{a_\alpha}$ とします。台包含の下で、$\sigma_A$ の対数は各支持空間で

$$
\log\sigma_A\big|_\alpha
=\log(q_\alpha\sigma_{a_\alpha})\otimes I_{d_\alpha}
-(\log d_\alpha)(I_{a_\alpha}\otimes I_{d_\alpha})
$$

です。これを $D(\rho_A\Vert\sigma_A)=\operatorname{Tr}\rho_A(\log\rho_A-\log\sigma_A)$ に代入すると、二つの $\log d_\alpha$ が相殺され、

$$
D(\rho_A\Vert\sigma_A)
=\sum_{\alpha:p_\alpha>0}p_\alpha\log\frac{p_\alpha}{q_\alpha}
+\sum_{\alpha:p_\alpha>0}p_\alpha
D(\rho_{a_\alpha}\Vert\sigma_{a_\alpha}).
$$

一方、$\rho_{\mathcal M},\sigma_{\mathcal M}$ のブロック固有値と対数を直接比べても同じ式です。$q_\alpha=0<p_\alpha$、または $p_\alpha>0$ で $\rho_{a_\alpha}$ の台が $\sigma_{a_\alpha}$ の台に含まれなければ、双方に同じ支持の不一致が生じ、相対エントロピーはともに $+\infty$ です。
<!-- proof-end -->

**二セクターの数値検算。** 第4節の $d_0=1,d_1=2$ とし、論理入力を正規化された純粋な重ね合わせ

$$
|\psi\rangle=\sqrt p\,|0,0_a,0_b\rangle+
\sqrt{1-p}\,|1,+_a,0_b\rangle,\qquad
|+_a\rangle=\frac{|0_a\rangle+|1_a\rangle}{\sqrt2}
$$

とします。両項は別セクターで直交するため $\langle\psi|\psi\rangle=1$。$A$ の状態は $p|0_a\rangle\langle0_a|$（第0ブロック）と $(1-p)|+_a\rangle\langle+_a|\otimes I_2/2$（第1ブロック）の直和で、非零固有値は $p,(1-p)/2,(1-p)/2$ です。従って

$$
S(\rho_A)=H(p,1-p)+(1-p)\log2
=S_{\mathcal M}(\rho)+\langle\mathcal L\rangle_\rho.
$$

例えば $p=1/2$ なら $S_{\mathcal M}=\log2$、$\langle\mathcal L\rangle=(\log2)/2$、$S(\rho_A)=3\log2/2$。純粋な**全コード状態**のエントロピーは0ですが、代数へ制限した状態のエントロピーは0ではありません。

## 6. 重力への読み替えと失敗する条件

有限コードの $P_\alpha$ は幾何に対応する超選択セクターの模型です。各セクターの $\log d_\alpha$ を、適切に繰り込んだ面積項に見立てれば、第5節の等式は量子RTに似た形になります。しかし重力の面積を $\log d_\alpha$ と**恒等視**する必要も根拠もありません。[FLMの量子補正](../HOLO23/index.md#def-holo23-flm)や[QESの極値化](../HOLO24/index.md#def-holo24-generalized-entropy)には、動的な幾何・反項・近似次数という追加条件があります。[HOLO28のJLMS条件付き辞書](../HOLO28/index.md#def-holo28-jlms-dictionary)が要求する固定コードと共通のくさびも引き継ぎます。

特に次の区別が必要です。

- **有限模型で証明したこと：** 既知の等長符号と物理系の直和分割に対する完全な代数再構成、相補代数、中心、エントロピー・相対エントロピーの恒等式。
- **重力で別途必要なこと：** 境界領域とバルクの対応する観測量代数、適切なコード部分空間、状態をまたぐ共通のくさび、$1/N$ 誤差の制御、面積・edge mode・局所反項の整合。
- **この模型からは従わないこと：** 任意のCFTが局所重力双対を持つこと、境界上の完全に無限次元な局所作用素代数が有限の密度行列に分解すること、任意の状態で一つの復号器が存在すること。

例えば直和ブロックを**物理 $\bar A$ 側で区別できないように**変更すると、証明で使った $\operatorname{Tr}_{\bar A}(V\rho_{\alpha\beta}V^\dagger)=0$ が成立しなくなる可能性があります。すると第5節のブロック対角の固有値計算もそのまま使えません。また、$\mathcal M$ を全行列代数 $\mathcal B(H_{\mathrm{code}})$ に拡大すると、セクター間の遷移まで回復せよという要求になり、第4節の物理的な直交性がそれを妨げます。

一般の連続量子場で現れる Type III の作用素代数は、ここで使用した「有限個の行列ブロックと密度行列」の模型にはなりません。無限次元の局所作用素代数とモジュラー理論は、対応するAQFT系列で扱う問題です。

## 7. 演習と詳細解答

断らない限り、本講の記号 $H_{\mathrm{code}},\mathcal M,P_\alpha,V,\rho_A,S_{\mathcal M}$ を用います。対数は自然対数、各Hilbert空間は有限次元です。

### Level A：代数・中心・再構成の確認

<a id="ex-holo30-a01"></a>
### 演習 HOLO30-A01：中心を手で求める
- Level: A

$H=\mathbb C^2$ で $\mathcal M=\{\operatorname{diag}(x,y):x,y\in\mathbb C\}$ とする。$\mathcal M$ が $*$-代数であることを示し、$\mathcal M'$ と中心を求めよ。

<!-- solution-start -->
**詳細解答。** 二つの対角行列の和・積・複素数倍・随伴は対角で、$I_2$ を含む。$T=\left(\begin{smallmatrix}a&b\\c&d\end{smallmatrix}\right)$ が $P_0=\operatorname{diag}(1,0)$ と可換なら

$$
TP_0=\begin{pmatrix}a&0\\c&0\end{pmatrix},\qquad
P_0T=\begin{pmatrix}a&b\\0&0\end{pmatrix}.
$$

よって $b=c=0$。逆に対角行列はすべての対角行列と可換なので $\mathcal M'=\mathcal M$、$\mathcal Z(\mathcal M)=\mathcal M$。
<!-- solution-end -->

<a id="ex-holo30-a02"></a>
### 演習 HOLO30-A02：全行列代数との違い
- Level: A

$H=\mathbb C^2$、$\mathcal M=\mathcal B(H)$ とする。$\mathcal M'$ と $\mathcal Z(\mathcal M)$ を求め、A01との相違を説明せよ。

<!-- solution-start -->
**詳細解答。** A01の計算から、可換な $T$ は対角です。さらに $E_{01}=|0\rangle\langle1|$ との可換性を課すと、$T=\operatorname{diag}(a,d)$ に対して $TE_{01}=aE_{01}$、$E_{01}T=dE_{01}$ なので $a=d$。従って $T=aI_2$。これは全行列と可換であるから $\mathcal M'=\mathbb CI_2$、中心も $\mathbb CI_2$。A01では二つの中心射影があり、今回は非自明なセクターラベルがない。
<!-- solution-end -->

<a id="ex-holo30-a03"></a>
### 演習 HOLO30-A03：最大エンタングル補助系
- Level: A

$d=2$ とし $|\Phi_2\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とする。規格化と、片側の部分トレースが $I_2/2$ になることを確かめよ。

<!-- solution-start -->
**詳細解答。** 標準基底は直交するのでノルム二乗は $1/2+1/2=1$。射影を展開すると

$$
|\Phi_2\rangle\langle\Phi_2|
=\frac12\bigl(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|\bigr).
$$

第二因子の部分トレースでは $\operatorname{Tr}(|0\rangle\langle1|)=0$、$\operatorname{Tr}(|0\rangle\langle0|)=\operatorname{Tr}(|1\rangle\langle1|)=1$ です。従って第一因子に残るのは $(|0\rangle\langle0|+|1\rangle\langle1|)/2=I_2/2$ です。
<!-- solution-end -->

<a id="ex-holo30-a04"></a>
### 演習 HOLO30-A04：二セクターの射影
- Level: A

$a_\alpha=b_\alpha=\mathbb C^2$（$\alpha=0,1$）の論理空間で $P_0=\operatorname{diag}(I_4,0_4)$ とする。$P_0$ が中心に属し、$T=|0,0,0\rangle\langle1,0,0|$ と可換でないことを示せ。

<!-- solution-start -->
**詳細解答。** $P_0$ は各ブロックの恒等または零だから、任意の $O=\operatorname{diag}(O_0\otimes I_2,O_1\otimes I_2)$ に対し $P_0O=OP_0$。また $P_0\in\mathcal M$ なので中心に属します。一方 $P_0T=T$、$TP_0=0$（$T$ の入力はセクター1）。従って $[P_0,T]=T\ne0$ です。
<!-- solution-end -->

<a id="ex-holo30-a05"></a>
### 演習 HOLO30-A05：片側の中心表現
- Level: A

第4節の二セクター符号で $d_0=1,d_1=2$、$a_\alpha=b_\alpha=\mathbb C^2$ とする。$A$ 上と $\bar A$ 上の $P_1$ の表現行列のサイズと非零対角成分数を求めよ。

<!-- solution-start -->
**詳細解答。** 各物理側の空間は $(2\cdot1)+(2\cdot2)=6$ 次元。第0ブロックが2次元、第1ブロックが4次元なので、両側とも $\pi(P_1)=\operatorname{diag}(0_2,I_4)$ という $6\times6$ 行列です。非零対角成分は4個。両領域の $\alpha=1$ ブロックに作用させると、任意の符号語上で論理 $P_1$ の作用と一致します。
<!-- solution-end -->

### Level B：情報の局在とエントロピーの計算

<a id="ex-holo30-b01"></a>
### 演習 HOLO30-B01：片側だけで回復できない作用
- Level: B

第4節の二セクター符号で $T=|0,0,0\rangle\langle1,0,0|$ を論理作用素とする。$A$ のどんな作用素 $X_A$ も $(X_A\otimes I_{\bar A})V=VT$ を満たせないことを、入力 $|1,0,0\rangle$ に作用させて示せ。

<!-- solution-start -->
**詳細解答。** $V|1,0,0\rangle$ は $\bar A$ の第1ブロック内にあります。$I_{\bar A}$ はそのラベルを変えないので、任意の $X_A$ に対し $(X_A\otimes I_{\bar A})V|1,0,0\rangle$ の $\bar A$ の成分は第1ブロックだけです。他方 $T|1,0,0\rangle=|0,0,0\rangle$ なので $VT|1,0,0\rangle=V|0,0,0\rangle$ は $\bar A$ の第0ブロックにあり、ノルム1です。直交する両ブロックに属する二つのベクトルは等しくなれません。$\bar A$ 側の一作用素にも同様の議論が $A$ のラベルを使って適用できます。
<!-- solution-end -->

<a id="ex-holo30-b02"></a>
### 演習 HOLO30-B02：非一様なセクター確率
- Level: B

$d_0=1,d_1=2$ とし、$p=(1/4,3/4)$、$a_0$ の密度行列は $\operatorname{diag}(3/4,1/4)$、$a_1$ の密度行列は $I_2/2$ とする。$S_{\mathcal M}(\rho)$、$\langle\mathcal L\rangle_\rho$、$S(\rho_A)$ を求めよ。$h(x)=-x\log x-(1-x)\log(1-x)$ とする。

<!-- solution-start -->
**詳細解答。** 定義からセクターの古典エントロピーは $h(1/4)$。第0ブロックの状態のエントロピーは $h(1/4)$、第1ブロックは $\log2$ です。従って

$$
S_{\mathcal M}(\rho)=h(1/4)+\frac14h(1/4)+\frac34\log2.
$$

面積型作用素の固有値は $0,\log2$ なので

$$
\langle\mathcal L\rangle_\rho
=\frac14\cdot0+\frac34\log2=\frac34\log2.
$$

[量子RT型恒等式](#thm-holo30-algebraic-rt)へ代入して

$$
S(\rho_A)=\frac54h(1/4)+\frac32\log2.
$$

直接確認すれば $\rho_A$ の固有値は第0ブロックで $3/16,1/16$、第1ブロックで $3/16$ が4回（$a_1$ と補助系の各2次元）です。合計 $3/16+1/16+4(3/16)=1$ で、上のエントロピー式と一致します。
<!-- solution-end -->

<a id="ex-holo30-b03"></a>
### 演習 HOLO30-B03：中心確率と相対エントロピー
- Level: B

$a_\alpha=b_\alpha=\mathbb C$、$d_0=1,d_1=2$、$p=(1/2,1/2)$、$q=(1/4,3/4)$ とする。$\rho_A,\sigma_A$ の固有値と $D(\rho_A\Vert\sigma_A)$ を求め、直和代数の相対エントロピーと比較せよ。

<!-- solution-start -->
**詳細解答。** $A$ の第0ブロックは1次元、第1は2次元なので、$\rho_A$ の固有値は $1/2,1/4,1/4$、$\sigma_A$ の固有値は $1/4,3/8,3/8$。いずれも正で台条件は満たされます。従って

$$
\begin{aligned}
D(\rho_A\Vert\sigma_A)
&=\frac12\log\frac{1/2}{1/4}
+2\cdot\frac14\log\frac{1/4}{3/8}\\
&=\frac12\log2+\frac12\log(2/3)
=\frac12\log(4/3).
\end{aligned}
$$

代数上は $\rho_{\mathcal M}=\operatorname{diag}(1/2,1/2)$、$\sigma_{\mathcal M}=\operatorname{diag}(1/4,3/4)$。直接の相対エントロピーは $\frac12\log2+\frac12\log(2/3)$ と一致します。中心の面積型項は二つの対数差から消えました。
<!-- solution-end -->

<a id="ex-holo30-b04"></a>
### 演習 HOLO30-B04：必要条件を具体的に検査する
- Level: B

$H_{\mathrm{code}}=H_a\otimes H_b$、$V=I$、$H_A=H_a,H_{\bar A}=H_b$ とし、$\mathcal M=\mathcal B(H_a)\otimes I_b$ とする。$\bar A$ の任意の $Y_b$ について補領域可換条件を確かめ、$\mathcal M$ を全行列代数へ拡大した場合の反例を一つ挙げよ。$H_a=H_b=\mathbb C^2$ としてよい。

<!-- solution-start -->
**詳細解答。** $V=I$ なので $V^\dagger(I_a\otimes Y_b)V=I_a\otimes Y_b$ です。任意の $O_a\otimes I_b$ と積を比較すると

$$
(I_a\otimes Y_b)(O_a\otimes I_b)=O_a\otimes Y_b
=(O_a\otimes I_b)(I_a\otimes Y_b),
$$

したがって可換です。全行列代数へ拡大して $O=I_a\otimes X_b$、$Y_b=Z_b$（$X|0\rangle=|1\rangle,X|1\rangle=|0\rangle$、$Z=\operatorname{diag}(1,-1)$）を選ぶと $ZX=-XZ$ です。よって $[I_a\otimes Z_b,I_a\otimes X_b]=2I_a\otimes ZX\ne0$。必要条件が破れ、$b$ の全情報を $A$ だけから復元することはできません。
<!-- solution-end -->

### Level C：代数・補領域・面積を一緒に監査する

<a id="ex-holo30-c01"></a>
### 演習 HOLO30-C01：二セクターの完全な情報配置
- Level: C

$a_\alpha=b_\alpha=\mathbb C^2$、$d_0=1,d_1=2$ とする第4節の符号を用いる。次を示せ。(i) コード・両物理因子の次元、$\mathcal M,\mathcal M'$ と中心を記す。(ii) $\mathcal M$ と $\mathcal M'$ の局所表現を与え、セクター間遷移の表現不能性を説明する。(iii) $|\psi\rangle=\sqrt{1/3}|0,0,0\rangle+\sqrt{2/3}|1,+,0\rangle$ の $A$ 縮約状態の非零固有値を求め、エントロピー公式を両辺から検算する。(iv) 中心情報を両側で測れることが量子複製を意味しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** (i) 各論理ブロックの次元は $2\cdot2=4$、よって $\dim H_{\mathrm{code}}=8$。物理片側は $2\cdot1+2\cdot2=6$ 次元で、全物理空間は $6\cdot6=36$ 次元です。代数は

$$
\mathcal M=\bigoplus_{\alpha=0,1}(\mathcal B(\mathbb C^2)\otimes I_2),\quad
\mathcal M'=\bigoplus_{\alpha=0,1}(I_2\otimes\mathcal B(\mathbb C^2)),\quad
\mathcal Z(\mathcal M)=\{z_0P_0+z_1P_1\}.
$$

中心の式は[直和代数の中心命題](#prop-holo30-center-commutant)で、射影と各ブロックの行列単位との可換性を検算しているから使えます。

(ii) $O=\bigoplus_\alpha(O_{a_\alpha}\otimes I_2)$ に対し $\pi_A(O)=\operatorname{diag}(O_{a_0},O_{a_1}\otimes I_2)$、$T=\bigoplus_\alpha(I_2\otimes T_{b_\alpha})$ に対し $\pi_{\bar A}(T)=\operatorname{diag}(T_{b_0},T_{b_1}\otimes I_2)$。各行列は $6\times6$、第4節の符号化式に作用させると両側でそれぞれ $VO,VT$ に等しい。セクター間遷移は反対側の直交ラベルを変えられず表現できません。

(iii) 入力の二項は直交し、係数の二乗和 $1/3+2/3=1$。物理 $A$ の非零固有値は第0ブロックが $1/3$、第1ブロックは $(2/3)/2=1/3$ が2回で、3つの $1/3$ です。従って $S(\rho_A)=\log3$。一方 $a_0,a_1$ の各状態は純粋なので

$$
S_{\mathcal M}(\rho)=h(1/3),\qquad
\langle\mathcal L\rangle_\rho=\frac23\log2.
$$

ここで

$$
h(1/3)=-\frac13\log(1/3)-\frac23\log(2/3)
=\log3-\frac23\log2
$$

だから和は $\log3$ と一致します。

(iv) 両側の $P_0,P_1$ は可換であり、読み取るのは確率 $1/3,2/3$ という古典的なラベル情報です。非可換なセクター間遷移や、任意の未知の8次元量子状態を両側で回復する能力はありません。特に $A$ には $\mathcal M$、$\bar A$ には $\mathcal M'$ が回復され、両者の重なりは中心だけです。従って[HOLO29の完全消失回復の議論](../HOLO29/index.md#def-holo29-region-recovery)を全8次元状態へ不当に拡張する複製は生じません。
<!-- solution-end -->

## 8. まとめと次講

- 消失後に必要なのは、常に全論理Hilbert空間の状態ではなく、**選んだ論理代数の全観測量を一貫して再構成すること**です。
- 中心の射影 $P_\alpha$ は互いに可換なセクター情報であり、$A,\bar A$ に共通していても量子複製禁止に反しません。
- 有限直和符号では $S(\rho_A)=S_{\mathcal M}(\rho)+\langle\mathcal L\rangle_\rho$、$D(\rho_A\Vert\sigma_A)=D(\rho_{\mathcal M}\Vert\sigma_{\mathcal M})$ を**厳密に**導けます。ただし一般重力への適用には半古典コードと幾何の仮定が追加で必要です。

次のHOLO31では、符号化の因子分解を図形的に見せるテンソル網・HaPPY模型へ進みます。離散的なcutと復元領域の対応を実際に構成します。
