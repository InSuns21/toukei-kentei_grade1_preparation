# HOLO17 境界領域のエントロピー

[HOLO16の熱場二重状態](../HOLO16/index.md#prop-holo16-partial-trace)は、左右二つの境界系の**片側全体**を縮約すると熱状態になることを示しました。ところが、次講で曲面を張るのは一つの境界の**空間的な区間**です。「右の境界全部」と「右の境界の一部分」では、消す自由度が異なります。

本章の問いは、**重力の面積と比較しようとする境界のエントロピーは、そもそも何の状態の何の量なのか**です。有限格子では密度行列を直接計算し、連続体ではUV正則化と場の局所代数の限界を分けます。区間の普遍係数は[QFT59](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)で既に導かれているので、ここでは必要条件、入力データ、検算方法を整理します。RT公式やバルク測地線との等式は**まだ仮定しません**。

## 1. 一つの境界を空間的に二分する

空間的な境界時間断面を選び、その一部分を $A$、同じ断面での補領域を $A^c$ と書きます。規則的な有限格子のサイト集合 $V$ では、各サイトの有限次元Hilbert空間 $\mathcal H_x$ を用いて

$$
\mathcal H_{\epsilon}=\bigotimes_{x\in V}\mathcal H_x
=\mathcal H_{A,\epsilon}\otimes\mathcal H_{A^c,\epsilon},
\qquad
\mathcal H_{A,\epsilon}=\bigotimes_{x\in A}\mathcal H_x
$$

と分解できます。$\epsilon>0$ は格子間隔に代表されるUV cutoffです。これは[QFT57の有限格子局所領域](../../QFT/QFT57/index.md#def-qft57-local-lattice)の具体化です。**格子の外縁に物理的な境界条件を置くこと**と、サイトを $A$ と $A^c$ に分けるために**内部に仮想的な切断面を置くこと**は別です。全体が円周上の格子であっても、区間 $A$ には通常二つの切断端点があります。後で用いる二次元CFTの $\epsilon$ は端点付近の短距離cutoffを表し、ここでの格子間隔と数値的に等しいとは仮定しません。異なる正則化を比較するときは、長さ尺度と非普遍定数の対応を別に指定します。

全体の密度演算子を $\rho_{\epsilon}$ とすると、[部分トレースによる縮約](../../QFT/QFT57/index.md#def-qft57-regulated-reduction)で

$$
\rho_{A,\epsilon}=\operatorname{Tr}_{A^c}\rho_\epsilon,
\qquad
\operatorname{Tr}(\rho_{A,\epsilon}O_A)
=\operatorname{Tr}\bigl(\rho_\epsilon(O_A\otimes I_{A^c})\bigr)
$$

を得ます。右の等式は「領域 $A$ の観測量は $\rho_{A,\epsilon}$ だけで評価できる」という操作的意味です。

量子エントロピーそのものは[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)と、[QFT57のcutoff依存エントロピー](../../QFT/QFT57/index.md#def-qft57-cutoff-entropy)が正本です。ここからは自然対数（単位 nat）を使い、底2の値との換算は $S_{\rm nat}=(\ln2)S_{\rm bit}$ とします。

<a id="def-holo17-boundary-data"></a>

<!-- formal-statement-start -->
> **定義（境界領域の正則化エントロピーデータ）**  
> 有限個の有限次元サイトからなる境界格子、全体状態 $\rho_\epsilon$、同時刻のサイト領域 $A$、UV cutoff $\epsilon>0$ を固定する。この組について、縮約状態 $\rho_{A,\epsilon}$ と、自然対数を使った次の値をまとめて境界領域の正則化エントロピーデータとする。零固有値の寄与は $0\ln0:=0$ とする。

$$
S_\epsilon(A)=-\operatorname{Tr}\bigl(\rho_{A,\epsilon}\ln\rho_{A,\epsilon}\bigr),
\qquad
M_{n,\epsilon}(A)=\operatorname{Tr}(\rho_{A,\epsilon}^{\,n})
\quad(n\in\mathbb N,\ n\ge2).
$$

> $S_\epsilon(A)$ は有限cutoffのvon Neumannエントロピー、$M_{n,\epsilon}(A)$ は整数レプリカモーメントである。連続体極限や重力の面積との等式は、この定義には含めない。
<!-- formal-statement-end -->

この定義は新しいエントロピー関数を作ったものではありません。既習の二つの量を、**状態・領域・cutoff・対数の底を明示した入力の組**として使う約束です。

<!-- definition-example-start: def-holo17-boundary-data -->
**定義の確認**：切断面をまたぐBell対。 $A=\{a\}$、$A^c=\{b\}$ の各サイトをqubitとし、状態を

$$
|\Psi\rangle=\frac{|0_a0_b\rangle+|1_a1_b\rangle}{\sqrt2},
\qquad \rho_\epsilon=|\Psi\rangle\langle\Psi|
$$

とします。サイト $a$ の正規直交基底を $(|0_a\rangle,|1_a\rangle)$ と選びます。[有限格子の部分トレース](../../QFT/QFT57/index.md#def-qft57-regulated-reduction)をサイト $b$ の基底で展開すると、縮約行列の $(i,j)$ 成分は

$$
\langle i_a|\rho_{A,\epsilon}|j_a\rangle
=\sum_{k=0}^{1}\langle i_a k_b|\rho_\epsilon|j_a k_b\rangle
\qquad(i,j\in\{0,1\}).
$$

交差項では $\langle0_b|1_b\rangle=0$ なので非対角成分は消え、対角成分はともに $1/2$ です。したがってこの基底で表した行列と演算子は

$$
[\rho_{A,\epsilon}]_{(|0_a\rangle,|1_a\rangle)}
=\begin{pmatrix}1/2&0\\0&1/2\end{pmatrix},
\qquad
\rho_{A,\epsilon}=\frac12|0_a\rangle\langle0_a|
+\frac12|1_a\rangle\langle1_a|=\frac{I_2}{2}.
$$

二つの対角成分が非負なので正値、和が1なのでトレース1です。固有値はこの基底の対角成分 $1/2,1/2$ であり、定義のエントロピーとモーメントに代入すると

$$
S_\epsilon(A)=-2\cdot\frac12\ln\frac12=\ln2,
\qquad
M_{n,\epsilon}(A)=2(1/2)^n=2^{1-n}.
$$

全体は純粋で $S(\rho_\epsilon)=0$ なのに、領域は混合状態になりました。**切断面を横切る相関**が両者の違いを作ります。
<!-- definition-example-end -->

## 2. TFDの「片側全体」と、片側内部の「区間」

[HOLO16の部分跡命題](../HOLO16/index.md#prop-holo16-partial-trace)は $L$ と $R$ という二つの境界系の分割に関するものです。一方、今度は右境界をさらに $R=A\cup B$ と分割します。有限格子なら $\mathcal H_R=\mathcal H_A\otimes\mathcal H_B$ とでき、右側だけにある部分領域の状態は左境界だけでなく右側の $B$ も捨てて得ます。

<a id="prop-holo17-tfd-subregion"></a>

<!-- formal-statement-start -->
> **命題（TFD片側の空間部分領域への縮約）**  
> 有限次元 $\mathcal H_R=\mathcal H_A\otimes\mathcal H_B$ と、同型な左系 $\mathcal H_L$、自己共役 $H_R$、$\beta>0$ を取る。$Z=\operatorname{Tr}e^{-\beta H_R}>0$ とし、[HOLO16の定義](../HOLO16/index.md#def-holo16-tfd)のTFDを用いる。このとき

$$
\rho_A=\operatorname{Tr}_{LB}|\mathrm{TFD}_\beta\rangle
\langle\mathrm{TFD}_\beta|
=\operatorname{Tr}_B\left(\frac{e^{-\beta H_R}}{Z}\right).
$$

> 一般に $S(\rho_A)$ と、右側全体の熱力学エントロピー $S(\rho_R)$ は一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

左境界を消した後で右境界の $B$ を消します。部分トレースを取る順序は、直積基底での有限和の順序を入れ替えるだけです。したがって、左側だけを消した結果を空間区間の答えだと思ってはいけません。

<!-- proof-start -->
### 証明

$\{|l\rangle_L\}$ と $\{|b\rangle_B\}$ を正規直交基底とし、全体の演算子を $X=|\mathrm{TFD}\rangle\langle\mathrm{TFD}|$ とおきます。任意の $|a\rangle,|a'\rangle\in\mathcal H_A$ に対し、部分トレースの定義から

$$
\langle a|\operatorname{Tr}_{LB}X|a'\rangle
=\sum_{l,b}\langle l,a,b|X|l,a',b\rangle
=\sum_b\langle a,b|\operatorname{Tr}_L X|a',b\rangle.
$$

最後の式は $\langle a|\operatorname{Tr}_B(\operatorname{Tr}_LX)|a'\rangle$ です。ここで[TFD片側縮約](../HOLO16/index.md#prop-holo16-partial-trace)の結果 $\operatorname{Tr}_L X=e^{-\beta H_R}/Z$ を代入すれば等式が従います。一致しない例は直後の四準位模型で構成します。
<!-- proof-end -->

**具体例：零Hamiltonianの右二qubit。** $\mathcal H_R=\mathbb C^2_A\otimes\mathbb C^2_B$、$H_R=0$ なら $Z=4$ です。TFD全体は4準位の最大エンタングル状態ですが

$$
\rho_R=I_4/4,\qquad
\rho_A=\operatorname{Tr}_B(I_4/4)=I_2/2.
$$

よって $S(\rho_R)=\ln4=2\ln2$、$S(\rho_A)=\ln2$。この例は有限次元の**部分跡**の計算であり、バルク幾何と面積の対応を用いません。

## 3. Rényi量からvon Neumann量へ

整数モーメント $M_{n,\epsilon}$ の対数を使う[QFT57のRényiエントロピー](../../QFT/QFT57/index.md#def-qft57-replica-moments)は

$$
S_{n,\epsilon}(A)=\frac{\ln M_{n,\epsilon}(A)}{1-n}
\qquad(n=2,3,\ldots)
$$

です。例えば上のBell対では $M_n=2^{1-n}$ を代入して、すべての整数 $n\ge2$ で $S_n=\ln2$ となります。一方、純粋な積状態の領域は固有値が $(1,0,\ldots)$ なので $M_n=1$、$S_n=0$ です。

有限次元では $n$ を実数 $n>0$ に拡張した**具体的な**スペクトル和 $\sum_jp_j^n$ が存在し、[有限次元レプリカ微分公式](../../QFT/QFT57/index.md#thm-qft57-replica-derivative)が適用できます。単に「整数で同じ式が成り立つ」だけでは十分ではありません。実際、$F(n)=\ln\sum_jp_j^n$ とすると $F(1)=0$、有限個の和を微分して

$$
F'(1)=
\frac{\sum_jp_j\ln p_j}{\sum_jp_j}
=\sum_jp_j\ln p_j,\qquad
\lim_{n\to1}\frac{F(n)}{1-n}=-F'(1)=S_\epsilon(A).
$$

零固有値は $n>0$ で $0^n=0$ と扱い、微分への寄与も0です。連続体の経路積分では、整数枚のシートの構成はできても、**$n=1$ 近傍の物理的な解析接続とcutoff補正の微分制御**は別途必要です。これは[QFT58の解析接続条件](../../QFT/QFT58/index.md#prop-qft58-conditional-entropy)と[QFT59の条件付き定理](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)が担当する論点です。

**整数点の任意の解析補間と、密度行列に由来するモーメントは違います。** 有限次元密度行列の**全整数**モーメント $M_n=\sum_{j=1}^r p_j^n$ が厳密に既知なら、正の固有値のうち最大のもの $p_*$ とその重複度 $m_*$ は

$$
p_*=\lim_{n\to\infty}M_n^{1/n},
\qquad
m_*=\lim_{n\to\infty}\frac{M_n}{p_*^n}
$$

で復元できます。実際、$p_*$ より小さい固有値を $q_j$ とすれば $M_n=p_*^n(m_*+\sum_j(q_j/p_*)^n)$ で、和は0へ収束します。$M_n-m_*p_*^n$ に同じ操作を繰り返すと、有限個の正の固有値をすべて復元でき、$S=-\sum_jp_j\ln p_j$ も一意に決まります。これは**有限次元で全整数データを厳密に知り、スペクトル和という構造を課した場合**の話です。整数レプリカ経路積分で与えられた値を、制約のない解析関数に補間するだけでは微分は決まらず、連続体やcutoff極限にこの議論を無条件に移せません。

## 4. UV cutoffが必要な理由とType IIIの境界

有限格子では $\rho_{A,\epsilon}$ は正のトレース1行列で、$0\le S_\epsilon(A)\le\ln\dim\mathcal H_{A,\epsilon}$ が成立します（[QINF17の上下限定理](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)をnatに換算）。しかし $\epsilon\downarrow0$ では、サイト数も、切断面の近くにある短波長の相関も増え得ます。「cutoffを外した密度行列が同じHilbert空間上に収束する」ことは、この有限次元の上限からは全く従いません。

[QFT57の切断Bell対模型](../../QFT/QFT57/index.md#thm-qft57-crossing-entropy)は仕組みを可視化します。$m$ 個の独立Bell対が $A$ と $A^c$ を横切れば、縮約密度行列は $I_{2^m}/2^m$ で

$$
\operatorname{Tr}\rho_A^n=2^{m(1-n)},\qquad
S_n(A)=S(A)=m\ln2.
$$

ここで $m=m(\epsilon)$ が増えるなら $S_\epsilon(A)$ も増えます。ただし**独立Bell対の個数だけで二次元CFTの普遍的な対数係数が導かれるわけではありません**。対数係数は場の相関・共形対称性・twist演算子の解析から得ます。

もっと根本的に、通常の連続体相対論的QFTでは、有界な領域に対応する局所観測量代数がType III因子になる典型的な場合があります。Type III因子には非零の有限な正規トレースが存在せず、格子で使ったような領域Hilbert空間の**標準的なテンソル因子分解と跡クラス密度行列**を、一般にはそのまま移せません。したがって裸の「局所密度行列のvon Neumannエントロピー」を無条件に有限な演算子トレースとして定義しません。Type III性自体の一般定理やその仮定別の証明はここで扱わず、正則化模型と連続体局所代数を混同しないための適用境界として用います。ゲージ理論では有限格子でも制約によって素朴な因子分解が失敗し得るため、物理的な演算子代数・境界自由度の選択を明示する必要があります。

**二つの極限は別物です。** $\epsilon>0$ 固定で有限次元のエントロピーを計算することと、$\epsilon\to0$ でその有限値が保たれることは同値ではありません。RTで比較する量は、指定した境界状態・領域・正則化と、重力側の境界cutoffの対応を含みます。

## 5. 二次元CFTの区間が教える普遍係数

無限直線の上のユニタリな二次元CFTの真空、単一区間 $A=[0,\ell]$、$\ell\gg\epsilon$、左右の中心電荷が等しい $c_L=c_R=c>0$ を考えます。[QFT58のtwistウェイト](../../QFT/QFT58/index.md#thm-qft58-twist-weight)から各端点の複製理論の次元は

$$
\Delta_n=\frac{c}{12}\left(n-\frac1n\right)
$$

となります（元のCFTの左・右それぞれの中央電荷を $c$ とした規約です）。[QFT59の区間モーメント](../../QFT/QFT59/index.md#prop-qft59-renyi-interval)は、UV項と非普遍規格化を分けて

$$
M_{n,\epsilon}(A)
=C_n\left(\frac{\ell}{\epsilon}\right)^{-2\Delta_n}
\,[1+\text{制御されたcutoff補正}]
$$

という形です。主項で対数を取って $1-n$ で割ると

$$
\frac{-2\Delta_n}{1-n}
=\frac{c}{6}\frac{n-1/n}{n-1}
=\frac{c}{6}\left(1+\frac1n\right),
$$

したがって

$$
S_{n,\epsilon}(A)=
\frac{c}{6}\left(1+\frac1n\right)\ln\frac{\ell}{\epsilon}
+k_n+\text{補正},\qquad
k_n=\frac{\ln C_n}{1-n}.
$$

これは特定の**平面真空・単一区間・規格化・cutoff**の普遍主項であって、任意の状態や任意の領域の厳密等式ではありません。[QFT59の条件付きvon Neumann定理](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)の物理的な $n\to1$ 接続と補正の制御を仮定すれば

$$
S_\epsilon(A)=\frac c3\ln\frac{\ell}{\epsilon}
+k_1+\text{補正}.
$$

**検算その1：長さを倍にする。** 同じCFT、同じ真空、同じcutoffと両端点の規約で $\ell$ と $2\ell$ を比較すると、補正を無視できるスケーリング領域では

$$
S_\epsilon(2\ell)-S_\epsilon(\ell)\longrightarrow\frac c3\ln2.
$$

$k_1$ が消えるので、**絶対的なエントロピーの定数より長さ差の係数**が普遍的です。この違いは[QFT59のcutoff尺度変更](../../QFT/QFT59/index.md#prop-qft59-cutoff-shift)とも整合します。

**検算その2：状態と幾何を変える。** 空間が無限直線で逆温度 $\beta>0$ の熱状態なら、[QFT60の円筒結果](../../QFT/QFT60/index.md#thm-qft60-conditional-von-neumann)を条件付きで適用して

$$
S_{\beta,\epsilon}(\ell)=
\frac c3\ln\left[\frac{\beta}{\pi\epsilon}
\sinh\left(\frac{\pi\ell}{\beta}\right)\right]+k_1+\text{補正}
$$

です。ここで $\beta$ は境界の時間座標と同じ長さ単位を使い、無限直線の熱円筒を仮定しています。純粋な円周真空（円周長 $R$）では、同じ参照先の別の条件により $\sinh$ を $\sin$ に換え、

$$
S_{R,\epsilon}(\ell)=
\frac c3\ln\left[\frac{R}{\pi\epsilon}
\sin\left(\frac{\pi\ell}{R}\right)\right]+k_1+\text{補正},
\qquad 0<\ell<R.
$$

これらを混ぜません。**有限温度か、純粋な円周真空か**によって同じ長さ $\ell$ にも異なるエントロピーが出ます。さらに熱状態の空間が有限円周のトーラスなら、単純に二つの式を掛け合わせてよいわけではありません。対応する相関関数と熱力学的条件が必要です。

## 6. 重力側へ渡す直前の確認表

| 確認事項 | 境界側で固定する量 | 間違えやすい点 |
| --- | --- | --- |
| 何を捨てるか | 同時刻の空間領域 $A^c$ | TFDの左境界全体と取り違える |
| 何を測るか | $\rho_{A,\epsilon}$ の固有値、$S_\epsilon$、$M_{n,\epsilon}$ | 全体が純粋なら部分系も純粋と思う |
| 何を正則化するか | UV cutoff $\epsilon$ と局所演算子代数 | 連続体のType III代数を有限行列と同一視する |
| どの状態か | 平面真空、熱直線、純粋円周など | $\sin$ と $\sinh$ を無条件に交換する |
| 何が普遍か | $c/3$ などの対数係数・比較差の主項 | 非普遍定数まで重力の絶対値と断定する |
| どこまで証明したか | 境界の量子論と既習CFTの結果 | ここだけでRTの面積公式を証明したとする |

次のHOLO18で、静的 $AdS_3$ の測地線長とこの区間の**普遍主項**を比較します。今は幾何から導出したのではなく、境界の側の入力だけを確立しました。

## 7. 演習：何をトレースし、何を極限へ渡すか

### Level A：縮約と係数を確認する

<a id="ex-holo17-a01"></a>
**A1. Bell対の部分系。** $|\Psi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を $A,B$ の二qubitに置く。$\rho_A$ を基底表示で計算し、$S(A)$ と $M_2(A)$ を求めよ。
- Level: A
<!-- solution-start -->
**詳細解答。** [部分トレースの定義](../../QFT/QFT57/index.md#def-qft57-regulated-reduction)を $B$ の基底 $|0\rangle,|1\rangle$ に適用する。まず

$$
\rho_{AB}=\frac12\bigl(
|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|
\bigr).
$$

$B$ の交差項は $\langle0|1\rangle_B=0$ により消えるので、$A$ の基底 $(|0\rangle,|1\rangle)$ では

$$
\rho_A=\frac12\bigl(|0\rangle\langle0|+|1\rangle\langle1|\bigr)
=\operatorname{diag}(1/2,1/2).
$$

正の固有値は $1/2,1/2$、その和は1である。自然対数による[本章のエントロピーデータ](#def-holo17-boundary-data)へ代入して

$$
S(A)=-2\cdot\frac12\ln\frac12=\ln2,\qquad
M_2(A)=2(1/2)^2=\frac12.
$$
<!-- solution-end -->

<a id="ex-holo17-a02"></a>
**A2. 零固有値とRényi。** $\rho=\operatorname{diag}(3/4,1/4,0)$ は密度行列か確かめ、$M_2$、$S_2$、$S$ をnatで求めよ。
- Level: A
<!-- solution-start -->
**詳細解答。** 与えられた $\rho$ は実対角行列だから自己共役で、対角成分 $3/4,1/4,0$ はすべて非負である。したがって正値であり、

$$
\operatorname{Tr}\rho=\frac34+\frac14+0=1
$$

なので密度行列である。[本章のモーメントとエントロピー](#def-holo17-boundary-data)を正の固有値に適用すると

$$
M_2=\left(\frac34\right)^2+\left(\frac14\right)^2
=\frac{9+1}{16}=\frac58,\qquad
S_2=\frac{\ln(5/8)}{1-2}=\ln\frac85,
$$

$$
S=-\frac34\ln\frac34-\frac14\ln\frac14.
$$

零固有値は $0\ln0:=0$ と扱う。$\ln0$ を単独で評価してはならない。
<!-- solution-end -->

<a id="ex-holo17-a03"></a>
**A3. 局所演算子の支持。** 三qubit格子の $A=\{1,2\}$ について $Z_1Z_2$ と $Z_1Z_3$ のうち $A$ に支持されるものを判定し、恒等演算子を明記せよ。$Z_j$ は第 $j$ サイトのPauli $Z$ とする。
- Level: A
<!-- solution-start -->
**詳細解答。** [QFT57の局所作用素の支持条件](../../QFT/QFT57/index.md#def-qft57-local-lattice)では、$A=\{1,2\}$ に支持される演算子は $O_A\otimes I_3$ と表せる。ここで

$$
\mathcal H=\mathcal H_1\otimes\mathcal H_2\otimes\mathcal H_3,
\qquad \mathcal H_A=\mathcal H_1\otimes\mathcal H_2.
$$

$Z_j$ は第 $j$ 因子にのみ $Z=\operatorname{diag}(1,-1)$ を作用させる記法で、ほかの因子には恒等演算子を作用させる。従って

$$
Z_1Z_2=(Z\otimes Z)\otimes I_3,\qquad
Z_1Z_3=Z\otimes I_2\otimes Z.
$$

前者は支持条件を満たし、後者は満たさない。別の確認として、[QFT57の例にあるPauli $X$](../../QFT/QFT57/index.md#def-qft57-local-lattice)を用い $X_3=I_1\otimes I_2\otimes X$ とすれば、$ZX=-XZ$ なので $[Z_1Z_3,X_3]\ne0$ である。$O_A\otimes I_3$ なら全ての $X_3$ と可換なので、これは支持しないことの検算にもなる。
<!-- solution-end -->

<a id="ex-holo17-a04"></a>
**A4. TFDと右境界の区間。** $\mathcal H_R=\mathbb C^2_A\otimes\mathbb C^2_B$、$H_R=0$ とする。TFDの規格化係数、$\rho_R$、$\rho_A$ とそれぞれのエントロピーを求めよ。
- Level: A
<!-- solution-start -->
**詳細解答。** 右側の四つの基底 $|ab\rangle_R$（$a,b\in\{0,1\}$）はすべてエネルギー0を持つ。$Z=\operatorname{Tr}e^{-\beta H_R}=\operatorname{Tr}I_4=4$ だから、[HOLO16のTFD定義](../HOLO16/index.md#def-holo16-tfd)より

$$
|\mathrm{TFD}_\beta\rangle
=\frac12\sum_{a,b=0}^1|ab\rangle_L\otimes|ab\rangle_R.
$$

[TFD片側縮約](../HOLO16/index.md#prop-holo16-partial-trace)で左側を消し、次に $B$ の二つの基底でトレースすると

$$
\rho_R=\frac{I_4}{4}=\frac{I_A\otimes I_B}{4},
\qquad
\rho_A=\operatorname{Tr}_B\rho_R
=\frac{I_A}{4}\operatorname{Tr}I_B=\frac{I_2}{2}.
$$

$\rho_R$ の固有値は $1/4$ が4個、$\rho_A$ は $1/2$ が2個なので

$$
S(\rho_R)=-4\cdot\frac14\ln\frac14=\ln4,
\qquad
S(\rho_A)=-2\cdot\frac12\ln\frac12=\ln2.
$$
<!-- solution-end -->

<a id="ex-holo17-a05"></a>
**A5. 切断Bell対の個数。** 切断面を横切る独立なBell対が $m=3$ 個あり、他の自由度は領域をまたがない純粋な積状態とする。$\rho_A$ の非零固有値、$M_n$、$S_n$、$S$ を求めよ。
- Level: A
<!-- solution-start -->
**詳細解答。** 一対のBell状態を片側で縮約すると $I_2/2$ である。三対が独立なので、[切断Bell対の局所エントロピー定理](../../QFT/QFT57/index.md#thm-qft57-crossing-entropy)を $m=3$ に適用すると、領域をまたがない純粋因子 $|\chi_A\rangle$ を含めて

$$
\rho_A=\left(\frac{I_2}{2}\right)^{\otimes3}
\otimes|\chi_A\rangle\langle\chi_A|
=\frac{I_8}{8}\otimes|\chi_A\rangle\langle\chi_A|.
$$

非零固有値 $1/8$ が8個あり、その和は1である。したがって

$$
M_n=8\left(\frac18\right)^n=8^{1-n},
\qquad
S_n=\frac{(1-n)\ln8}{1-n}=\ln8,
$$

$$
S=-8\cdot\frac18\ln\frac18=3\ln2.
$$

純粋因子に伴う零固有値の寄与は0とする。
<!-- solution-end -->

### Level B：条件・極限・比較量を結ぶ

<a id="ex-holo17-b01"></a>
**B1. 相互情報の有限模型。** $A,B$ はBell対、$C$ は独立な純粋qubitとする。$I(A:B)=S(A)+S(B)-S(AB)$ と $I(A:C)$ を求め、全体の純粋性から各領域の純粋性を推論できない理由を述べよ。
- Level: B
<!-- solution-start -->
**詳細解答。** 全状態は $|\Phi\rangle_{AB}\otimes|0\rangle_C$ で純粋である。しかし $AB$ のBell対の片側をトレースすると

$$
\rho_A=\rho_B=\frac{I_2}{2},\qquad
S(A)=S(B)=\ln2,\qquad S(AB)=0.
$$

問題文の相互情報の定義を用いれば

$$
I(A:B)=S(A)+S(B)-S(AB)=2\ln2.
$$

一方、$\rho_{AC}=(I_2/2)_A\otimes|0\rangle\langle0|_C$。ここで[テンソル積のエントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)を用いると

$$
S(AC)=S(A)+S(C)=\ln2+0=\ln2,
$$

$$
I(A:C)=S(A)+S(C)-S(AC)=0.
$$

全体の純粋性は部分系の純粋性を意味しない。補領域との相関によって $A$ と $B$ はそれぞれ混合するが、独立な $C$ とは相互情報がない。
<!-- solution-end -->

<a id="ex-holo17-b02"></a>
**B2. cutoff尺度の再表示。** $S_n(\ell)=K_n\ln(\ell/\epsilon)+k_n$、$K_n=c(1+1/n)/6$ とする。$\epsilon'=a\epsilon$（$a>0$）で同じ物理値を記すための $k_n'$ を求め、二つの長さ $\ell_1,\ell_2$ の差が変わらないことを示せ。
- Level: B
<!-- solution-start -->
**詳細解答。** $\epsilon'=a\epsilon$（$a>0$）なので

$$
\ln\frac{\ell}{\epsilon'}
=\ln\frac{\ell}{\epsilon}-\ln a.
$$

同じ物理量を $K_n\ln(\ell/\epsilon')+k_n'$ と記すには、[QFT59のcutoff尺度変更命題](../../QFT/QFT59/index.md#prop-qft59-cutoff-shift)のように

$$
K_n\left(\ln\frac{\ell}{\epsilon}-\ln a\right)+k_n'
=K_n\ln\frac{\ell}{\epsilon}+k_n
\quad\Longrightarrow\quad
k_n'=k_n+K_n\ln a
$$

と補償する。同一状態・同一の端点規格化で二つの長さを比べれば

$$
S_n(\ell_2)-S_n(\ell_1)
=K_n\left(\ln\frac{\ell_2}{\epsilon}
-\ln\frac{\ell_1}{\epsilon}\right)
=K_n\ln\frac{\ell_2}{\ell_1}.
$$

新しい表示でも $k_n'$ は差で消える。この等式は長さ依存のcutoff補正を無視したスケーリング主項についてのものである。
<!-- solution-end -->

<a id="ex-holo17-b03"></a>
**B3. レプリカ微分の適用条件。** 有限次元 $\rho$ の正の固有値を $p_1,\dots,p_r$ とし、$F(t)=\ln\sum_{j=1}^rp_j^t$（$t>0$）とする。$F(1)$ と $F'(1)$ を計算し、$S=\lim_{t\to1}F(t)/(1-t)$ を示せ。なぜ整数 $t\ge2$ の値だけでは一般の場の理論のこの極限が証明されないか説明せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** 正の固有値は有限個で、$\sum_{j=1}^rp_j=1$ だから $F(1)=\ln1=0$。$p_j>0$ より $d(p_j^t)/dt=p_j^t\ln p_j$ と微分でき、対数の連鎖律から

$$
F'(t)=\frac{\sum_{j=1}^rp_j^t\ln p_j}
{\sum_{j=1}^rp_j^t},\qquad
F'(1)=\sum_{j=1}^rp_j\ln p_j.
$$

$t=1$ の近傍で

$$
F(t)=F(1)+F'(1)(t-1)+o(t-1)
$$

なので

$$
\lim_{t\to1}\frac{F(t)}{1-t}
=-F'(1)=-\sum_{j=1}^rp_j\ln p_j=S.
$$

零固有値は $t>0$ で寄与せず、$\ln0$ を使う必要はない。これは[有限次元レプリカ微分公式](../../QFT/QFT57/index.md#thm-qft57-replica-derivative)を正のスペクトル和から再計算したものである。

一般の場の理論で整数レプリカ分配関数だけが与えられても、この有限スペクトル和の実数 $t$ への拡張が正当化されたことにはならない。物理的な解析接続とcutoff補正の微分制御を別途示す必要がある。
<!-- solution-end -->

<a id="ex-holo17-b04"></a>
**B4. 熱区間の二つの尺度。** $S_\beta(\ell)=\frac c3\ln[(\beta/\pi\epsilon)\sinh(\pi\ell/\beta)]+k_1$ の主項で、$\ell/\beta\ll1$ と $\ell/\beta\gg1$ の漸近形を求めよ。真空区間の対数項と熱エントロピーの体積項を区別せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** $x=\pi\ell/\beta>0$ と置き、$\epsilon\ll\ell$ のCFTスケーリング領域で主項を計算する。

$x\ll1$ なら $\sinh x=x+x^3/6+O(x^5)$ であり、$\ln(1+u)=u+O(u^2)$ を $u=x^2/6+O(x^4)$ に適用して

$$
\begin{aligned}
\ln\left[\frac{\beta}{\pi\epsilon}\sinh x\right]
&=\ln\frac{\ell}{\epsilon}
+\ln\left(1+\frac{x^2}{6}+O(x^4)\right)\\
&=\ln\frac{\ell}{\epsilon}+\frac{x^2}{6}+O(x^4).
\end{aligned}
$$

ゆえに

$$
S_\beta(\ell)=\frac c3\ln\frac{\ell}{\epsilon}+k_1
+\frac c{18}\left(\frac{\pi\ell}{\beta}\right)^2
+O\left((\ell/\beta)^4\right).
$$

$x\gg1$ なら $\sinh x=e^x(1-e^{-2x})/2$ で、$\ln(1-e^{-2x})=O(e^{-2x})$ より

$$
\begin{aligned}
\ln\left[\frac{\beta}{\pi\epsilon}\sinh x\right]
&=x+\ln\frac{\beta}{2\pi\epsilon}
+\ln(1-e^{-2x})\\
&=x+\ln\frac{\beta}{2\pi\epsilon}+O(e^{-2x}).
\end{aligned}
$$

従って

$$
S_\beta(\ell)=\frac{\pi c}{3\beta}\ell
+\frac c3\ln\frac{\beta}{2\pi\epsilon}+k_1
+O(e^{-2\pi\ell/\beta}).
$$

短区間では真空の対数が主項、長区間では $\ell$ に比例する熱エントロピー密度の項が主項となる。ここでは元のCFT式に付随するcutoff補正は別途制御されていると仮定して省略した。
<!-- solution-end -->

### Level C：境界入力の統合判定

<a id="ex-holo17-c01"></a>
**C1. 二つの長さとレプリカ接続。** 左右中央電荷がともに $c=3$ の二次元CFTの無限直線真空について、$\epsilon\ll\ell$ とする。cutoff補正を無視できるスケーリング主項として、次を順に検討せよ。

- $\ell$ と $2\ell$ の区間の $S_2$ の差を求める。
- 両区間のvon Neumannエントロピーの差を求める。
- cutoffを $2\epsilon$ という表示へ変えたとき両差はどうなるか答える。
- 整数レプリカ値に一致する任意の解析補間の $n=1$ 微分は一意でないことを、整数で消える解析関数で示せ。また、有限次元で全整数モーメントが厳密に既知のときと区別せよ。
- これらの式だけでRT公式が証明されるか判定する。

- Level: C
<!-- solution-start -->
**詳細解答。** ここでは$\epsilon\ll\ell$のスケーリング主項に限り、同じ状態・端点規格化を使う。

1. [QFT59のRényi普遍項](../../QFT/QFT59/index.md#prop-qft59-renyi-interval)の係数 $K_n=c(1+1/n)/6$ に $c=3,n=2$ を代入すると

   $$
   K_2=\frac36\left(1+\frac12\right)=\frac34,
   \qquad
   \Delta S_2=K_2\ln\frac{2\ell}{\ell}=\frac34\ln2.
   $$

2. [物理的な $n\to1$ 接続と補正制御](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)を仮定する。係数は $K_1=c(1+1)/6=c/3=1$ なので

   $$
   \Delta S=K_1\ln\frac{2\ell}{\ell}=\ln2.
   $$

   これは整数の式へ無条件に $n=1$ を代入したのではなく、追加の解析接続仮定を使った結論である。

3. $\epsilon'=2\epsilon$ と再表示すれば[cutoff尺度変更命題](../../QFT/QFT59/index.md#prop-qft59-cutoff-shift)から $k_n'=k_n+K_n\ln2$。各長さで同じ定数が加わるため

   $$
   \Delta S_2=\frac34\ln2,\qquad \Delta S=\ln2
   $$

   は変わらない。

4. 整数点に一致する任意の解析補間 $F_0(n)$ に、実数 $\alpha$ を用いて

   $$
   F_\alpha(n)=F_0(n)+\alpha\sin(\pi n)
   $$

   を加えられる。全整数 $n$ で $\sin(\pi n)=0$ だが、

   $$
   F_\alpha'(1)=F_0'(1)-\pi\alpha,\qquad
   -F_\alpha'(1)=-F_0'(1)+\pi\alpha.
   $$

   よって**解析関数で整数点を補間するという条件だけ**では $n=1$ の微分は一意でない。しかし任意の $F_\alpha$ が密度行列のスペクトル和を実現するわけではない。有限次元で**全整数**の正確なモーメントが密度行列のものだと分かれば、§3で示した最大固有値とその重複度の逐次復元で $S$ は決まる。場のレプリカ幾何では物理的補間と誤差微分の制御が別に要る。

5. ここで算出したのは境界CFTのエントロピー差である。バルク測地線、Newton定数、Brown–Henneaux関係、RTを適用できる半古典状態を構成していないので、これらの式だけでRT公式は証明されない。
<!-- solution-end -->

## 8. 次の講義への接続

HOLO18では境界区間 $[0,\ell]$ に対応する静的 $AdS_3$ の候補測地線を求め、切断半径と $\epsilon$ を対応させます。本講で確立したのは**境界側の量の意味、計算条件、比較の基準**です。面積と等号で結ぶ前に、両側の正則化・状態・近似が揃っているかを点検します。
