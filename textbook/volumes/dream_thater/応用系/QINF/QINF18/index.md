# QINF18 条件付きエントロピーと相互情報量

## 1. 局所の混合だけでは「共有する情報」は分からない

[QINF17のvon Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)は、密度演算子の固有値から混合の大きさを測ります。ところが二qubitのBell純粋状態と、二つの独立な最大混合qubitは、どちらも片側だけなら $I_2/2$ です。局所エントロピーは両側とも1ビットでも、全体は前者で純粋、後者で4次元の最大混合状態です。

そこで、系 $B$ を手元に持ったとき $A$ の不確かさがどう変わるか、そして $A,B$ がどれだけの情報を共有しているかを、**全体と局所のエントロピーの差**で調べます。古典の[条件付きエントロピー](../../INFO/INFO1/index.md#def-info1-conditional-entropy)は非負ですが、量子では負になる例があり、その理由が本章の中心問いです。

以下では有限次元の複素Hilbert空間 $H_A,H_B$ を取り、二部系の密度演算子を $\rho_{AB}$ とします。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)による縮約を $\rho_A=\operatorname{Tr}_B\rho_{AB}$、$\rho_B=\operatorname{Tr}_A\rho_{AB}$ と書きます。略記 $S_A=S(\rho_A)$、$S_B=S(\rho_B)$、$S_{AB}=S(\rho_{AB})$ を用い、対数の底は2、$0\log_2 0=0$ とします。

## 2. 条件付きエントロピー：全体から既知の側を差し引く

古典の[連鎖律](../../INFO/INFO1/index.md#thm-info1-chain-rule)では、$H(X,Y)-H(Y)$ が「$Y$ の値を知った後の $X$ の平均的な不確かさ」を表しました。量子では「$B$ を知る」は、必ずしも $B$ を一つの基底で測った結果を得ることではありません。系 $B$ そのものを保持している場合を表す情報量として、同じ差の式を採用します。

<a id="def-qinf18-conditional"></a>

<!-- formal-statement-start -->
> **定義（量子条件付きエントロピー）**
> 有限次元二部系の密度演算子 $\rho_{AB}$ に対し、縮約を $\rho_A,\rho_B$ とする。**$B$ を条件とする $A$ の量子条件付きエントロピー**および逆向きを

$$
S(A|B)_\rho:=S(\rho_{AB})-S(\rho_B),
\qquad
S(B|A)_\rho:=S(\rho_{AB})-S(\rho_A)
$$

> と定義する。条件の向きは一般に交換できず、測定後の古典的な条件付きエントロピーとも一般には異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf18-conditional -->
### 定義の確認：独立な二つのqubit

**定義の確認**として、$\rho_{AB}=I_2/2\otimes I_2/2=I_4/4$ とします。各因子は正値・トレース1で、[積状態の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)は $\rho_A=\rho_B=I_2/2$ です。全体の固有値は4個の $1/4$、局所の固有値は各2個の $1/2$。したがって

$$
S_{AB}=2,\qquad S_A=S_B=1,
\qquad S(A|B)=S(B|A)=2-1=1.
$$

どちらも相手を保持しても情報量が減っていないので、独立という直感に一致します。ここで差は正ですが、定義そのものには非負性を要求していません。
<!-- definition-example-end -->

## 3. 相互情報量：二度数えた共有分を求める

別々に数えた $A$ と $B$ のエントロピーの和に比べ、二部全体のエントロピーが小さいなら、何らかの相関があります。この**二重計上の差**を一つの対称な量で表します。

<a id="def-qinf18-mutual"></a>

<!-- formal-statement-start -->
> **定義（量子相互情報量）**
> 有限次元二部系の密度演算子 $\rho_{AB}$ とその縮約 $\rho_A,\rho_B$ に対して、**量子相互情報量**を

$$
I(A:B)_\rho:=S(\rho_A)+S(\rho_B)-S(\rho_{AB})
$$

> と定める。これは $A,B$ の交換で値が変わらず、条件付きエントロピーを使えば $I(A:B)=S_A-S(A|B)=S_B-S(B|A)$ と表せる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf18-mutual -->
### 定義の確認：独立・古典相関・Bell対

**定義の確認**として三つの二qubit状態を比べます。局所の縮約はすべて $I_2/2$、ゆえに $S_A=S_B=1$ ですが、全体の固有値が違います。

| 二部状態 $\rho_{AB}$ | 全体の非零固有値 | $S_{AB}$ | $S(A|B)$ | $I(A:B)$ |
| --- | --- | ---: | ---: | ---: |
| $I_4/4$（独立） | $1/4$ が4個 | $2$ | $1$ | $0$ |
| $\omega=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|$ | $1/2,1/2$ | $1$ | $0$ | $1$ |
| $\Phi=|\Phi^+\rangle\langle\Phi^+|$、$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ | $1$ | $0$ | $-1$ | $2$ |

独立状態は積で、各局所エントロピーの和と全体が一致します。古典相関状態 $\omega$ は二つの直交射影の混合なので全体の固有値は $(1/2,1/2,0,0)$。Bell対 $\Phi$ はrank 1です。両者の縮約は、[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で $|00\rangle\langle11|$ の交差項が消えて $I_2/2$ になります。各列を定義の差へ代入しており、すべてビット単位です。
<!-- definition-example-end -->

**負の $-1$ は負の確率や負の物理的混合を意味しません。** Bell対では全体のエントロピー0より局所のエントロピー1が大きく、その差が負になります。一方、相互情報量2は「二つの独立な古典ビットを測って同時に取り出せる」という主張ではありません。量子状態の全体と縮約に関する情報量です。

## 4. 純粋二部系では負の値を直接求められる

一般の行列不等式を証明する前に、[Schmidt分解](../QINF6/index.md#thm-qinf6-existence)が使える純粋二部系を計算します。量子条件付きエントロピーの符号を確かめる最も短い道です。

<a id="prop-qinf18-pure"></a>

<!-- formal-statement-start -->
> **命題（純粋二部系の条件付きエントロピーと相互情報量）**
> 有限次元の正規化ベクトル $|\psi\rangle\in H_A\otimes H_B$ による純粋状態 $\rho_{AB}=|\psi\rangle\langle\psi|$ とその縮約 $\rho_A,\rho_B$ について

$$
S_A=S_B,\qquad
S(A|B)=-S_A,\qquad
S(B|A)=-S_B,\qquad
I(A:B)=2S_A
$$

> が成り立つ。両条件付きエントロピーが0となるのは、この純粋状態が積状態のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

全体はrank 1でエントロピー0です。[純粋二部系の縮約固有値の一致](../QINF17/index.md#prop-qinf17-bipartite)から両側のエントロピーは等しいので、残りは二つの定義への代入です。等号には純粋性とSchmidt rankを結びつけます。

<!-- proof-start -->
### 証明

純粋性から $\rho_{AB}$ の固有値は $(1,0,\ldots,0)$ であり、[エントロピーの零等号条件](../QINF17/index.md#thm-qinf17-entropy-bounds)より $S_{AB}=0$。Schmidt分解で非零係数の二乗を $\lambda_1,\ldots,\lambda_r$ とすれば、[両側縮約の非零固有値の一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)により $\rho_A,\rho_B$ の非零固有値はともに $\lambda_1,\ldots,\lambda_r$。ゆえに $S_A=S_B=-\sum_i\lambda_i\log_2\lambda_i$ です。定義から

$$
\begin{aligned}
S(A|B)&=S_{AB}-S_B=0-S_A=-S_A,\\
I(A:B)&=S_A+S_B-S_{AB}=2S_A.
\end{aligned}
$$

逆向きも対称です。$S_A=0$ とSchmidt rank 1は、[純粋二部状態の積状態判定](../QINF6/index.md#prop-qinf6-product)より同値なので、最後の主張も成立します。$\square$
<!-- proof-end -->

$0\le p\le1$ の状態 $|\psi_p\rangle=\sqrt p|00\rangle+\sqrt{1-p}|11\rangle$ では、$A,B$ の縮約がともに $\operatorname{diag}(p,1-p)$。二値エントロピーを $h_2(p)=-p\log_2p-(1-p)\log_2(1-p)$ とすると

$$
S(A|B)=-h_2(p),\qquad I(A:B)=2h_2(p).
$$

$p=0,1$ は積純粋状態で両量0、$p=1/2$ はBell対で $-1,2$ です。この連続的な変化は、負の値が計算規約の事故ではなく、純粋な量子相関に結びつくことを示します。

## 5. 部分加法性を有限行列から証明する

相互情報量が一般の混合状態でも非負かを知るには、全体のエントロピーが局所エントロピーの和を超えないことが必要です。ここでは後続の量子相対エントロピーや強劣加法性を仮定せず、既習のスペクトル分解と実数の $\ln t\le t-1$ だけから必要な行列比較を導きます。

まず正値行列の**台（support）**とは、正の固有値を持つ固有ベクトルが張る部分空間です。$P$ の台が $Q$ の台に含まれるとき、$Q$ の対数は $P$ の固有ベクトルに作用させる範囲でのみ考えればよく、零固有値の対数を要求しません。

<a id="lem-qinf18-log"></a>

<!-- formal-statement-start -->
> **補題（有限次元の対数比較補題）**
> 同じ有限次元複素Hilbert空間上の密度演算子 $R,T$ について、$R$ の台が $T$ の台に含まれるとする。対数を各正の固有値上だけで評価したとき

$$
\operatorname{Tr}(R\log_2 R)-\operatorname{Tr}(R\log_2 T)\ge0
$$

> が成立する。零固有値の寄与は0とする。等号が成立するのは $R=T$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

二つの行列は可換でなくても構いません。それぞれの固有基底の重なりの二乗を非負の重みとして、二つの**有限確率表**を作ります。すると行列の差は古典的な対数和となり、実数の対数不等式を項ごとに使えます。

<!-- proof-start -->
### 証明

固有基底を $\{|u_i\rangle\}_i$、$\{|v_j\rangle\}_j$、固有値を $r_i,t_j\ge0$（各総和1）とし、$m_{ij}=|\langle u_i|v_j\rangle|^2$ と置きます。正規直交基底の完全性から各 $i$ で $\sum_jm_{ij}=1$、各 $j$ で $\sum_im_{ij}=1$ です。従って

$$
a_{ij}=r_i m_{ij},\qquad b_{ij}=t_j m_{ij}
$$

は非負で、どちらも二重和は1です。$a_{ij}>0$ なら $r_i>0,m_{ij}>0$。台の包含により、$t_j=0$ の固有ベクトルは正の $r_i$ を持つ $u_i$ に直交するので、$b_{ij}>0$ でもあります。

$a_{ij}>0$ の項に $\ln(b_{ij}/a_{ij})\le b_{ij}/a_{ij}-1$ を適用し、両辺に $a_{ij}$ を掛けて和を取ると

$$
\begin{aligned}
\sum_{i,j:a_{ij}>0}a_{ij}\log_2\frac{a_{ij}}{b_{ij}}
&\ge\frac1{\ln2}\sum_{a_{ij}>0}(a_{ij}-b_{ij})\\
&=\frac{1-\sum_{a_{ij}>0}b_{ij}}{\ln2}\ge0.
\end{aligned}
$$

$m_{ij}>0$ の項では比 $a_{ij}/b_{ij}=r_i/t_j$ です。$r_i=0$ の項は0とし、台の包含による $t_j>0$ を使って

$$
\begin{aligned}
\sum_{a_{ij}>0}a_{ij}\log_2\frac{a_{ij}}{b_{ij}}
&=\sum_i r_i\log_2r_i
-\sum_{i,j:r_i>0,\,t_j>0}r_im_{ij}\log_2t_j\\
&=\operatorname{Tr}(R\log_2R)-\operatorname{Tr}(R\log_2T).
\end{aligned}
$$

等号なら、対数不等式の厳密な等号条件によって $a_{ij}=b_{ij}$（$a_{ij}>0$）であり、さらに上の最終不等式が等号なので $a_{ij}=0$ の場所でも $b_{ij}=0$。従って $m_{ij}>0$ なら $r_i=t_j$ です。任意の $u_i$ を $v_j$ で展開すると

$$
T|u_i\rangle=\sum_j t_j\langle v_j|u_i\rangle|v_j\rangle
=r_i\sum_j\langle v_j|u_i\rangle|v_j\rangle
=R|u_i\rangle.
$$

全 $i$ で一致するため $T=R$ です。逆に $R=T$ なら差は0です。$\square$
<!-- proof-end -->

<a id="thm-qinf18-subadditivity"></a>

<!-- formal-statement-start -->
> **定理（部分加法性と等号条件）**
> 任意の有限次元二部系の密度演算子 $\rho_{AB}$ とその縮約 $\rho_A,\rho_B$ について

$$
S(\rho_{AB})\le S(\rho_A)+S(\rho_B)
$$

> が成立する。等号が成立するのは $\rho_{AB}=\rho_A\otimes\rho_B$ のとき、かつそのときに限る。従って量子相互情報量は常に非負で、0となるのは積状態に限る。
<!-- formal-statement-end -->

### 証明の見取り図

比較対象を「実際の全体状態」$R=\rho_{AB}$ と「同じ縮約を持つ積状態」$T=\rho_A\otimes\rho_B$ に選びます。台の包含を正値性で確かめてから[対数比較補題](#lem-qinf18-log)を適用し、積の固有値の対数を局所和へ分けます。

<!-- proof-start -->
### 証明

$P_A$ を $\rho_A$ の台への射影とし、$Q_A=I_A-P_A$ とします。部分トレースの定義により

$$
\operatorname{Tr}[(Q_A\otimes I_B)\rho_{AB}]
=\operatorname{Tr}(Q_A\rho_A)=0.
$$

$\rho_{AB}$ は正値なので、左辺は $\rho_{AB}^{1/2}(Q_A\otimes I_B)\rho_{AB}^{1/2}$ の非負トレースです。零ならこの正値行列は0、従って $(Q_A\otimes I_B)\rho_{AB}^{1/2}=0$。同様に $B$ 側の台射影 $P_B$ を使えば $(I_A\otimes(I_B-P_B))\rho_{AB}^{1/2}=0$ です。両射影は可換なので、$\rho_{AB}$ の台は $P_AH_A\otimes P_BH_B$ に含まれます。これは $T=\rho_A\otimes\rho_B$ の台と一致します。

正の局所固有値を $p_i,q_j$ とすると、台の上では積固有基底 $|i\rangle\otimes|j\rangle$ に対して

$$
\log_2T(|i\rangle\otimes|j\rangle)
=(\log_2p_i+\log_2q_j)(|i\rangle\otimes|j\rangle).
$$

従って台の上で $\log_2T=(\log_2\rho_A)\otimes I_B+I_A\otimes(\log_2\rho_B)$ と作用し、部分トレースを使って

$$
\begin{aligned}
\operatorname{Tr}(\rho_{AB}\log_2T)
&=\operatorname{Tr}(\rho_A\log_2\rho_A)
+\operatorname{Tr}(\rho_B\log_2\rho_B)\\
&=-S_A-S_B.
\end{aligned}
$$

他方、$\operatorname{Tr}(\rho_{AB}\log_2\rho_{AB})=-S_{AB}$ です。[対数比較補題](#lem-qinf18-log)は

$$
0\le -S_{AB}+S_A+S_B=I(A:B)
$$

を与えます。等号条件は $R=T$、すなわち $\rho_{AB}=\rho_A\otimes\rho_B$ です。積状態なら逆に[エントロピーの加法性](../QINF17/index.md#prop-qinf17-tensor)により等号です。$\square$
<!-- proof-end -->

したがって相互情報量は、**相関があれば正で、相関が全くない積状態だけ0**という判定を与えます。ただし正の値だけから相関が古典的かエンタングルメント由来かは判別できません。§3の古典相関混合とBell対の値を比べてください。

## 6. Araki–Lieb不等式：全体は局所の差より小さくなれない

[部分加法性](#thm-qinf18-subadditivity)は全体のエントロピーの上限を与えました。しかしBell対のように全体が純粋で局所が混合する例があるので、下限は単純な $S_{AB}\ge S_A$ ではありません。実際に必要なのは**局所エントロピーの差の絶対値**です。

<a id="thm-qinf18-araki-lieb"></a>

<!-- formal-statement-start -->
> **定理（Araki–Lieb不等式）**
> 有限次元二部系の任意の密度演算子 $\rho_{AB}$ とその縮約 $\rho_A,\rho_B$ について

$$
|S(\rho_A)-S(\rho_B)|\le S(\rho_{AB})
$$

> が成り立つ。従って部分加法性と併せて、全体のエントロピーは両局所エントロピーの差と和の間に入る。
<!-- formal-statement-end -->

### 証明の見取り図

直接 $\rho_{AB}$ の固有値を局所の固有値と比較する代わりに、[精製の存在定理](../QINF4/index.md#thm-qinf4-existence)で補助系 $C$ を足し、$ABC$ を純粋にします。純粋状態の「相補系のエントロピーは等しい」という結果で式を書き換え、先ほど証明した部分加法性だけを適用します。

<!-- proof-start -->
### 証明

[有限次元の精製](../QINF4/index.md#thm-qinf4-existence)により、$\rho_{AB}=\operatorname{Tr}_C|\Psi\rangle\langle\Psi|_{ABC}$ となる正規化純粋状態 $|\Psi\rangle$ を取れます。[純粋二部系の縮約エントロピーの一致](../QINF17/index.md#prop-qinf17-bipartite)を三つの分割 $AB|C$、$A|BC$、$B|AC$ に適用すると

$$
S_{AB}=S_C,\qquad S_A=S_{BC},\qquad S_B=S_{AC}.
$$

$BC$ を二部系と見た[部分加法性](#thm-qinf18-subadditivity)を使うと

$$
S_A=S_{BC}\le S_B+S_C=S_B+S_{AB},
$$

従って $S_A-S_B\le S_{AB}$。同じ定理を $AC$ に使えば

$$
S_B=S_{AC}\le S_A+S_C=S_A+S_{AB},
$$

ゆえに $S_B-S_A\le S_{AB}$。この二式を同時に満たすことが絶対値の不等式です。$\square$
<!-- proof-end -->

### 等号を達成する、左右非対称な例

$A=A_1A_2$ を二qubit、$B$ を一qubitとし、$A_1B$ がBell対、$A_2$ が独立な最大混合状態である

$$
\rho_{AB}=|\Phi^+\rangle\langle\Phi^+|_{A_1B}
\otimes\frac{I_{A_2}}2
$$

を考えます。[積のエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)で $S_{AB}=0+1=1$。$B$ の縮約は $I_2/2$、$A$ の縮約は $I_{A_1}/2\otimes I_{A_2}/2=I_4/4$ なので

$$
S_A=2,\qquad S_B=1,\qquad
|S_A-S_B|=1=S_{AB}.
$$

ここでは条件付けの向きが重要で、$S(A|B)=1-1=0$ ですが $S(B|A)=1-2=-1$ です。**全体が混合状態でも条件付きエントロピーは負になり得ます。**

<a id="cor-qinf18-bounds"></a>

<!-- formal-statement-start -->
> **系（条件付きエントロピーと相互情報量の範囲）**
> 任意の有限次元二部密度演算子 $\rho_{AB}$ とその縮約について

$$
-\min\{S_A,S_B\}\le S(A|B)\le S_A,
\qquad
0\le I(A:B)\le2\min\{S_A,S_B\}
$$

> が成り立つ。従って $d_A=\dim H_A$ とすれば $-\log_2d_A\le S(A|B)\le\log_2d_A$ である。
<!-- formal-statement-end -->

### 証明の見取り図

条件付きエントロピーの上限は部分加法性、下限の一方はAraki–Lieb、もう一方はエントロピーの非負性です。相互情報量の上限にはAraki–Liebを使い、下限には部分加法性を使います。

<!-- proof-start -->
### 証明

[部分加法性](#thm-qinf18-subadditivity)より $S_{AB}-S_B\le S_A$。[Araki–Lieb不等式](#thm-qinf18-araki-lieb)から $S_{AB}\ge S_B-S_A$ なので $S_{AB}-S_B\ge-S_A$。また[エントロピーの非負性](../QINF17/index.md#thm-qinf17-entropy-bounds)から $S_{AB}-S_B\ge-S_B$。二つの下限の強い方を採用して

$$
S(A|B)\ge\max\{-S_A,-S_B\}=-\min\{S_A,S_B\}.
$$

相互情報量は、[部分加法性](#thm-qinf18-subadditivity)で $I(A:B)\ge0$、Araki–Liebで

$$
\begin{aligned}
I(A:B)&=S_A+S_B-S_{AB}\\
&\le S_A+S_B-|S_A-S_B|=2\min\{S_A,S_B\}.
\end{aligned}
$$

最後に $S_A\le\log_2d_A$ と $\min\{S_A,S_B\}\le S_A$ を用いれば、次元だけによる上下限が出ます。$\square$
<!-- proof-end -->

純粋なBell対は $S(A|B)=-1$、$I(A:B)=2$ で上下限を達成します。一方、独立な最大混合qubitでは $S(A|B)=1$、$I(A:B)=0$ です。**一般の量子条件付きエントロピーに「非負」という制約はありません**が、その負の大きさにも局所次元による上限があります。

## 7. 古典の条件付きエントロピーが負にならない理由

量子系の対角状態は古典確率の埋め込みです。この場合に限れば、条件付きの式は[古典情報理論の条件付きエントロピー](../../INFO/INFO1/index.md#def-info1-conditional-entropy)へ戻ります。二つの値を混同しないため、どの基底で何を計算しているかを確かめます。

<a id="prop-qinf18-classical"></a>

<!-- formal-statement-start -->
> **命題（古典対角状態の条件付きエントロピー）**
> 有限集合の同時確率表 $p_{xy}\ge0$、$\sum_{x,y}p_{xy}=1$ を固定し、積正規直交基底 $|x\rangle_A|y\rangle_B$ について

$$
\rho_{AB}=\sum_{x,y}p_{xy}|xy\rangle\langle xy|
$$

> とする。周辺確率を $p_x=\sum_yp_{xy}$、$q_y=\sum_xp_{xy}$ とし、$q_y>0$ で $p_{x|y}=p_{xy}/q_y$ と置く。このとき

$$
S(A|B)=\sum_{y:q_y>0}q_yH(p_{\cdot|y})\ge0,
\qquad I(A:B)=H(p_x)+H(q_y)-H(p_{xy}).
$$

> 条件付きエントロピーが0となるのは、各 $q_y>0$ について $p_{\cdot|y}$ が一点に集中するとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

対角状態の固有値は表の各成分です。周辺化は部分トレースそのものなので、差を同時確率の対数へ戻し、$p_{xy}=q_yp_{x|y}$ を使います。各条件付き分布のShannonエントロピーは非負です。

<!-- proof-start -->
### 証明

積基底について

$$
\operatorname{Tr}_B|xy\rangle\langle xy|=|x\rangle\langle x|,
\qquad
\operatorname{Tr}_A|xy\rangle\langle xy|=|y\rangle\langle y|
$$

なので $\rho_A=\sum_xp_x|x\rangle\langle x|$、$\rho_B=\sum_yq_y|y\rangle\langle y|$。固有値を[Shannonへの還元](../QINF17/index.md#prop-qinf17-classical)へ代入し、$q_y=0$ のときその行の $p_{xy}$ もすべて0であることを使えば

$$
\begin{aligned}
S(A|B)
&=-\sum_{x,y:p_{xy}>0}p_{xy}\log_2p_{xy}
+\sum_{y:q_y>0}q_y\log_2q_y\\
&=-\sum_{y:q_y>0}\sum_{x:p_{xy}>0}
p_{xy}\log_2\frac{p_{xy}}{q_y}\\
&=\sum_{y:q_y>0}q_y
\left(-\sum_{x:p_{x|y}>0}p_{x|y}\log_2p_{x|y}\right).
\end{aligned}
$$

各括弧は非負で、[Shannonエントロピーの零等号条件](../../INFO/INFO1/index.md#thm-info1-entropy-bounds)から点質量の場合に限り0です。$I(A:B)$ の式は三つの対角状態のエントロピーを定義へ代入して得られます。$\square$
<!-- proof-end -->

古典対角状態では $S(A|B)\ge0$ ですが、§4の量子純粋状態では $-h_2(p)$ が生じます。「どの基底で測定するか」を決めずに量子系を保持している点が、古典の条件付けと量子条件付きエントロピーの大切な違いです。

## 8. 演習：局所・全体・精製を往復する

各問で状態の正値性とトレースが1であること、縮約、零固有値の扱いを必要に応じて確認します。計算値が等しいことと等号成立の条件を混同しないでください。

<a id="ex-qinf18-a01"></a>
### QINF18-A01 一方だけ純粋な積状態

- Level: A

$A,B$ はqubitとし、$\rho_A=\operatorname{diag}(3/4,1/4)$、$\rho_B=|0\rangle\langle0|$ とする。$\rho_{AB}=\rho_A\otimes\rho_B$ の固有値、$S(A|B)$、$S(B|A)$、$I(A:B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\rho_A$ は対角成分が非負で総和1、$\rho_B$ はrank 1の射影なので、どちらも密度演算子です。積の固有値は $(3/4,0,1/4,0)$（積基底の順に従う）で、総和1です。二値エントロピー $h=h_2(1/4)$ と置けば

$$
S_A=h,\quad S_B=0,\quad S_{AB}=h+0=h.
$$

ここでは[積状態の加法性](../QINF17/index.md#prop-qinf17-tensor)を適用できます。定義へ代入すると

$$
S(A|B)=h-0=h,\quad S(B|A)=h-h=0,\quad I(A:B)=h+0-h=0.
$$

零固有値はエントロピーへ0だけ寄与します。
<!-- solution-end -->

<a id="ex-qinf18-a02"></a>
### QINF18-A02 対角の完全相関状態

- Level: A

二qubit密度演算子 $\omega_{AB}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|$ の縮約と三つのエントロピーを求め、$S(A|B)$、$I(A:B)$、積状態か否かを判定せよ。

<!-- solution-start -->
### 詳細解答

直交射影の非負な確率混合で、固有値 $(1/2,0,0,1/2)$、トレース1です。部分トレースで $\operatorname{Tr}_B|00\rangle\langle00|=|0\rangle\langle0|$、$\operatorname{Tr}_B|11\rangle\langle11|=|1\rangle\langle1|$ となるため $\omega_A=I_2/2$。$B$ 側も同じです。

$$
S_A=S_B=1,\quad S_{AB}=1,\quad
S(A|B)=1-1=0,\quad I(A:B)=1+1-1=1.
$$

積なら[部分加法性の等号条件](#thm-qinf18-subadditivity)で $I=0$ ですが、ここでは1です。実際、積 $\omega_A\otimes\omega_B=I_4/4$ は $\omega_{AB}$ と異なります。
<!-- solution-end -->

<a id="ex-qinf18-a03"></a>
### QINF18-A03 Bell対の負の条件付きエントロピー

- Level: A

$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$\rho_{AB}=|\Phi^+\rangle\langle\Phi^+|$ とする。射影の交差項を含めて部分トレースを行い、$S(A|B)$、$I(A:B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\langle\Phi^+|\Phi^+\rangle=1$ なので $\rho_{AB}$ は正値かつトレース1のrank 1射影です。四項に展開すると

$$
\rho_{AB}=\tfrac12(
|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|).
$$

部分トレースで交差項が

$$
\operatorname{Tr}_B|00\rangle\langle11|
=|0\rangle\langle1|\langle1|0\rangle=0
$$

となるので、$\rho_A=I_2/2$。対称性から $\rho_B=I_2/2$ です。全体は純粋ゆえ $S_{AB}=0$、局所はともに1です。

$$
S(A|B)=0-1=-1,\qquad I(A:B)=1+1-0=2.
$$

負値は全体の純粋性と局所の混合が共存した結果です。
<!-- solution-end -->

<a id="ex-qinf18-a04"></a>
### QINF18-A04 非最大エンタングル状態

- Level: A

$|\psi\rangle=\frac12|00\rangle+\frac{\sqrt3}{2}|11\rangle$ とする。正規化を確認し、縮約の固有値、$S(A|B)$、$I(A:B)$ を対数の記号式で求めよ。

<!-- solution-start -->
### 詳細解答

二つの基底ベクトルは直交し、ノルム二乗は $1/4+3/4=1$。部分トレースでは交差項が消え、両側の縮約は $\operatorname{diag}(1/4,3/4)$。したがって

$$
\begin{aligned}
h_2(1/4)
&=-\tfrac14\log_2\tfrac14-\tfrac34\log_2\tfrac34\\
&=\tfrac12-\tfrac34(\log_2 3-2)
=2-\tfrac34\log_2 3.
\end{aligned}
$$

全体はrank 1なので $S_{AB}=0$。[純粋二部系の条件付きエントロピーと相互情報量](#prop-qinf18-pure)より

$$
S(A|B)=-2+\tfrac34\log_2 3,\qquad
I(A:B)=4-\tfrac32\log_2 3.
$$

二つのSchmidt係数がともに正なので積状態ではなく、条件付きエントロピーは厳密に負です。
<!-- solution-end -->

<a id="ex-qinf18-a05"></a>
### QINF18-A05 非一様な古典条件付け

- Level: A

二値確率変数 $X,Y\in\{0,1\}$ の同時確率を $p_{00}=1/2$、$p_{01}=1/4$、$p_{11}=1/4$、$p_{10}=0$ とする。この表を積基底に対角に埋め込んだ二qubit状態について、周辺確率、$S(A|B)$、$I(A:B)$ を求めよ。系 $A$ は $X$、系 $B$ は $Y$ に対応する。

<!-- solution-start -->
### 詳細解答

表は非負で総和1です。$p_X=(3/4,1/4)$、$p_Y=(1/2,1/2)$ なので $S_A=h_2(1/4)$、$S_B=1$。全体の固有値は $(1/2,1/4,0,1/4)$ で

$$
S_{AB}=-\tfrac12\log_2\tfrac12-2\cdot\tfrac14\log_2\tfrac14
=\tfrac12+1=\tfrac32.
$$

従って

$$
S(A|B)=\tfrac32-1=\tfrac12,\qquad
I(A:B)=h_2(1/4)+1-\tfrac32=h_2(1/4)-\tfrac12.
$$

[古典対角状態の命題](#prop-qinf18-classical)でも検算できます。$Y=0$ の条件付き $X$ は確定し、$Y=1$ では $X$ は $(1/2,1/2)$ です。従って $S(A|B)=\frac12\cdot0+\frac12\cdot1=1/2$ と一致します。
<!-- solution-end -->

<a id="ex-qinf18-b01"></a>
### QINF18-B01 非可換な二状態で対数比較を検算する

- Level: B

一qubitの $R=|+\rangle\langle+|$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$T=\operatorname{diag}(3/4,1/4)$ とする。二つが非可換なことを確かめ、[対数比較補題](#lem-qinf18-log)の左辺を計算し、なぜ非負かを固有基底の重なりから説明せよ。

<!-- solution-start -->
### 詳細解答

$R=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$、$T=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix}$ で、$RT$ の右上成分は $1/8$、$TR$ の右上成分は $3/8$。従って非可換です。$T$ の二固有値は正で台は全空間、$R$ の台を含みます。

$R$ は純粋なので $\operatorname{Tr}(R\log_2R)=1\cdot\log_2 1=0$。$T$ は計算基底で対角、$|\langle0|+\rangle|^2=|\langle1|+\rangle|^2=1/2$ なので

$$
\begin{aligned}
\operatorname{Tr}(R\log_2T)
&=\tfrac12\log_2\tfrac34+\tfrac12\log_2\tfrac14\\
&=\tfrac12\log_2 3-2.
\end{aligned}
$$

差は $2-\frac12\log_2 3>0$（$\log_2 3<2$）。非可換でも、固有基底の重なり二乗を確率の重みとして平均すれば比較できます。等号条件の $R=T$ も満たしていません。
<!-- solution-end -->

<a id="ex-qinf18-b02"></a>
### QINF18-B02 部分加法性の等号を満たさない族

- Level: B

$0\le p\le1$ として二qubit状態 $\omega_p=p|00\rangle\langle00|+(1-p)|11\rangle\langle11|$ を取る。$I(A:B)$ を求め、部分加法性の等号が成立する $p$ をすべて求めよ。縮約の積と元の状態を直接比較すること。

<!-- solution-start -->
### 詳細解答

二つの直交射影の確率混合なので、$\omega_p$ は正値かつトレース1で固有値 $(p,1-p,0,0)$ を持ちます。縮約は両側とも $\operatorname{diag}(p,1-p)$ です。従って

$$
S_{AB}=S_A=S_B=h_2(p),\qquad I(A:B)=h_2(p).
$$

縮約の積は基底順 $00,01,10,11$ で

$$
\omega_A\otimes\omega_B
=\operatorname{diag}(p^2,p(1-p),p(1-p),(1-p)^2).
$$

$0<p<1$ なら中間二成分は正ですが、$\omega_p$ では0です。従って積でなく、[等号条件](#thm-qinf18-subadditivity)から厳密な不等式になります。$p=0,1$ はそれぞれ $|11\rangle$、$|00\rangle$ の積純粋状態となり $I=0$、等号成立です。$h_2(p)>0$ もこの判定と一致します。
<!-- solution-end -->

<a id="ex-qinf18-b03"></a>
### QINF18-B03 精製から三角不等式を再構成する

- Level: B

任意の有限次元 $\rho_{AB}$ の精製 $|\Psi\rangle_{ABC}$ を取る。純粋二部系の縮約エントロピーの一致と、二つの異なる部分加法性の適用箇所を指定して、$|S_A-S_B|\le S_{AB}$ を示せ。さらに $A=A_1A_2$、$\rho_{AB}=|\Phi^+\rangle\langle\Phi^+|_{A_1B}\otimes I_{A_2}/2$ で等号を検算せよ。

<!-- solution-start -->
### 詳細解答

精製は[有限次元の精製存在定理](../QINF4/index.md#thm-qinf4-existence)により取れます。全系は純粋なので、分割 $AB|C$、$A|BC$、$B|AC$ に[縮約エントロピーの一致](../QINF17/index.md#prop-qinf17-bipartite)を順に適用して

$$
S_{AB}=S_C,\qquad S_A=S_{BC},\qquad S_B=S_{AC}
$$

を得ます。$BC$ への[部分加法性](#thm-qinf18-subadditivity)で $S_A=S_{BC}\le S_B+S_C=S_B+S_{AB}$、$AC$ への部分加法性で $S_B=S_{AC}\le S_A+S_C=S_A+S_{AB}$。従って $S_A-S_B$ と $S_B-S_A$ の双方が $S_{AB}$ 以下で、絶対値の式になります。

指定例ではBell側全体のエントロピー0、余分な独立qubitのエントロピー1なので $S_{AB}=1$。$A$ の縮約は $I_2/2\otimes I_2/2$ で $S_A=2$、$B$ は $I_2/2$ で $S_B=1$。ゆえに $|2-1|=1=S_{AB}$ と等号成立です。全体が混合であることも $S_{AB}=1$ に反映されています。
<!-- solution-end -->

<a id="ex-qinf18-b04"></a>
### QINF18-B04 三部GHZ状態と条件付ける系の大きさ

- Level: B

$0<p<1$ とし、三qubit $A,B,C$ の純粋状態 $|\Psi_p\rangle=\sqrt p|000\rangle+\sqrt{1-p}|111\rangle$ を取る。$\rho_{AB}$、$\rho_{BC}$ と $\rho_A$ を求め、$S(A|B)$、$S(A|BC)$、$I(A:B)$、$I(A:BC)$ を比較せよ。$BC$ は一つの複合系として扱う。

<!-- solution-start -->
### 詳細解答

直交ベクトルの和なのでノルム二乗は $p+(1-p)=1$。射影には $\sqrt{p(1-p)}|000\rangle\langle111|$ とその随伴が現れますが、$C$ をトレースすると $\langle1|0\rangle=0$ で両方消えるため

$$
\rho_{AB}=p|00\rangle\langle00|+(1-p)|11\rangle\langle11|.
$$

$A$ をトレースした $\rho_{BC}$ も同形で、$\rho_A=\operatorname{diag}(p,1-p)$ です。従って $S_A=S_B=S_{AB}=S_{BC}=h_2(p)$。他方、全 $ABC$ は純粋で $S_{ABC}=0$ です。定義へ入れると

$$
\begin{aligned}
S(A|B)&=S_{AB}-S_B=h_2(p)-h_2(p)=0,\\
S(A|BC)&=S_{ABC}-S_{BC}=-h_2(p),\\
I(A:B)&=S_A+S_B-S_{AB}=h_2(p),\\
I(A:BC)&=S_A+S_{BC}-S_{ABC}=2h_2(p).
\end{aligned}
$$

$BC$ を保持すれば全体純粋状態の相補系として $A$ を扱えますが、$B$ だけでは $C$ を捨てた後の古典相関混合となります。これが値の違いの理由であり、強劣加法性の一般結果は使っていません。
<!-- solution-end -->

<a id="ex-qinf18-c01"></a>
### QINF18-C01 同じ二部縮約を持つ二つの三部状態

- Level: C

$0<p<1$、$|\Psi_p\rangle=\sqrt p|000\rangle+\sqrt{1-p}|111\rangle$ とし、三qubitの二つの密度演算子を

$$
P_{ABC}=|\Psi_p\rangle\langle\Psi_p|,
\qquad
\Omega_{ABC}=p|000\rangle\langle000|+(1-p)|111\rangle\langle111|
$$

とする。

1. 両者が密度演算子であることを確認し、全体および全一部・全二部縮約のエントロピーをそれぞれ求めよ。
2. 両者について $S(A|B)$、$I(A:B)$ と、$BC$ を一つの系とした $S(A|BC)$、$I(A:BC)$ を求め、差がどこで初めて現れるか説明せよ。
3. 各状態で分割 $A|BC$ の部分加法性・Araki–Lieb不等式を検算し、等号条件と積状態判定を説明せよ。$p=1/2$ での値も示せ。

<!-- solution-start -->
### 詳細解答

**（1）** $\langle000|111\rangle=0$ なので $\|\Psi_p\|^2=p+(1-p)=1$、$P$ はrank 1射影です。$\Omega$ は互いに直交するrank 1射影の非負混合でトレース1です。従っていずれも密度演算子であり、全体の非零固有値は $P$ で $(1)$、$\Omega$ で $(p,1-p)$。二値エントロピーを $h=h_2(p)>0$ とすれば

$$
S(P_{ABC})=0,\qquad S(\Omega_{ABC})=h.
$$

$P$ の射影を四項に展開した交差項 $|000\rangle\langle111|$ とその随伴は、一つでも系を部分トレースすると $\langle1|0\rangle=0$ により消えます。$\Omega$ には初めからその項がありません。従って**全一部・全二部縮約は両状態で一致**し、

$$
\rho_A=\rho_B=\rho_C=\operatorname{diag}(p,1-p),\qquad
\rho_{AB}=\rho_{AC}=\rho_{BC}
=p|00\rangle\langle00|+(1-p)|11\rangle\langle11|
$$

（各二部の基底で記述）です。一部の固有値は $(p,1-p)$、二部は $(p,1-p,0,0)$。従って六つとも $S=h$ です。

**（2）** $AB$ と $B$ の縮約は同一なので、どちらの三部状態から出発しても

$$
S(A|B)=S_{AB}-S_B=h-h=0,\qquad
I(A:B)=S_A+S_B-S_{AB}=h.
$$

ところが $A|BC$ の全体は、前者では純粋、後者では混合であり、$S_{BC}=S_A=h$ は共通です。したがって

$$
\begin{array}{c|cc}
 & S(A|BC) & I(A:BC)\\ \hline
P & 0-h=-h & h+h-0=2h\\
\Omega & h-h=0 & h+h-h=h
\end{array}
$$

となります。差は全体エントロピー $S_{ABC}$ に初めて現れます。二部の縮約だけでは三部の量子コヒーレンスを判定できません。

**（3）** 二部系 $A|BC$ に[部分加法性](#thm-qinf18-subadditivity)を適用すると $S_{ABC}\le S_A+S_{BC}=2h$。$P$ では $0<2h$、$\Omega$ では $h<2h$ とともに厳密です。等号条件の積状態にはどちらも該当しません。実際、積なら相互情報量は0ですが、(2)で $2h,h>0$ と確認しました。

[Araki–Lieb不等式](#thm-qinf18-araki-lieb)は $|S_A-S_{BC}|=|h-h|=0\le S_{ABC}$。$P$ では全体0で等号、$\Omega$ では全体 $h>0$ なので厳密です。$p=1/2$ では $h=1$、$P$ の $S(A|BC)=-1,I(A:BC)=2$、$\Omega$ の対応する値は $0,1$、共通する $S(A|B)=0,I(A:B)=1$ です。
<!-- solution-end -->

## 9. まとめと次の問い

- 量子条件付きエントロピーは $S(A|B)=S_{AB}-S_B$、量子相互情報量は $I(A:B)=S_A+S_B-S_{AB}$。どちらも全体と縮約の固有値から計算します。
- 二部純粋状態では $S_A=S_B$、$S(A|B)=-S_A$、$I(A:B)=2S_A$。Bell対の負値は局所の混合と全体の純粋性の差に由来します。
- 部分加法性 $S_{AB}\le S_A+S_B$ は、有限行列の固有基底を使う対数比較から証明でき、相互情報量は非負、0なら積状態です。
- 精製を経由すると $|S_A-S_B|\le S_{AB}$（Araki–Lieb）が得られ、条件付きエントロピーは $-\min\{S_A,S_B\}$ から $S_A$ までに入ります。
- 古典対角状態では条件付きエントロピーは条件付きShannonエントロピーの平均で非負です。量子一般の負値を、測定済みの古典的条件付き不確かさと同一視してはいけません。

次のQINF19では、第三の系を追加したときの差である**条件付き相互情報量**と強劣加法性を学びます。本章で示した二部の不等式を、三部へどう拡張するかが新しい問いです。
