# QINF20 量子相対エントロピーとデータ処理

## 1. 雑音で二つの状態の区別は難しくなるのか

[QINF10の二状態識別](../QINF10/index.md#thm-qinf10-helstrom)と[QINF11のトレース距離](../QINF11/index.md#thm-qinf11-trace-contractivity)は、二つの状態を測定で区別する難しさを調べました。今度は、二つの状態の**情報的な隔たり**を対数で測り、雑音や測定でその隔たりが増えないことを示します。

[QINF18の対数比較補題](../QINF18/index.md#lem-qinf18-log)には非可換行列の非負な比較量がすでに登場しました。また[QINF19の部分トレース比較](../QINF19/index.md#lem-qinf19-partial-trace-log)は正定値な二つの行列を系の一部で比較します。しかし、実際の量子状態は純粋状態のように零固有値を持ち、量子操作には[一般の量子チャネル](../QINF7/index.md#def-qinf7-channel)が現れます。この二つの不足を本章で解決します。

以下、Hilbert空間は有限次元・複素、状態は[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)（正半定値でトレース1）、$\log$ は底2です。空間 $H$ の次元を $d=\dim H$、単位作用素を $I_H$ と書くと、最大混合状態は $I_H/d$ です。

固有値0のエントロピーへの寄与には $0\log_2 0=0$ を使いますが、**$\log_2 0$ という有限の数を定義するわけではありません**。

## 2. 量子相対エントロピーと台の条件

異なる状態の対数を引くために、零固有値がどこにあるかを先に区別します。正半定値行列 $\tau$ の**台** $\operatorname{supp}\tau$ は正固有値に対応する固有ベクトルの張る部分空間で、$\ker\tau$ の直交補空間です。[QINF18の対数比較](../QINF18/index.md#lem-qinf18-log)で使った意味と同じです。

<a id="def-qinf20-relative-entropy"></a>

<!-- formal-statement-start -->
> **定義（量子相対エントロピー）**  
> 同じ有限次元Hilbert空間 $H$ 上の密度演算子 $\rho,\sigma$ に対し、$\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ なら、**量子相対エントロピー**を

$$
D(\rho\|\sigma)
:=\operatorname{Tr}(\rho\log_2\rho)
-\operatorname{Tr}(\rho\log_2\sigma)
$$

> と定義する。第1項の零固有値の寄与は0とし、第2項は $\sigma$ の正固有値部分だけで評価する。台が含まれない場合は $D(\rho\|\sigma):=+\infty$ と定義する。第1引数と第2引数を交換しても一般に同じ値にはならない。
<!-- formal-statement-end -->

第2項の意味を式で明確にします。$\rho=\sum_i r_i|u_i\rangle\langle u_i|$、$\sigma=\sum_j s_j|v_j\rangle\langle v_j|$ を固有分解すると、台が含まれる場合は

$$
D(\rho\|\sigma)
=\sum_{i:r_i>0}r_i\log_2r_i
-\sum_{i:r_i>0}\sum_{j:s_j>0}
r_i|\langle u_i|v_j\rangle|^2\log_2s_j.
$$

実際、$s_j=0$ なら $v_j\in\ker\sigma\subseteq\ker\rho$ なので、$r_i>0$ の $u_i$ とは直交します。したがって上の和で $0\cdot(-\infty)$ を計算する必要はありません。

可換な対角行列 $\rho=\operatorname{diag}(p_i)$、$\sigma=\operatorname{diag}(q_i)$ なら台の条件は $p_i>0\Rightarrow q_i>0$。この場合は[INFO2の古典相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)に戻り、

$$
D(\rho\|\sigma)=\sum_{i:p_i>0}p_i\log_2\frac{p_i}{q_i}
$$

です。

<!-- definition-example-start: def-qinf20-relative-entropy -->
### 定義の確認：可換でない純粋状態と正定値状態

**定義の確認**として、計算基底 $|0\rangle,|1\rangle$ で $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$\rho=|+\rangle\langle+|$、$\sigma=\operatorname{diag}(3/4,1/4)$ とします。外積の $(i,j)$ 成分は $\langle i|\rho|j\rangle=\langle i|+\rangle\langle+|j\rangle$ です。これを並べると、定義に現れる二作用素の行列表示は

$$
\rho=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad \sigma=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix}.
$$

$\rho$ は規格化ベクトルの射影なので固有値 $(1,0)$、$\sigma$ は二つとも正固有値で和1です。両者は自己共役・正半定値・トレース1を満たし、$\operatorname{supp}\sigma=\mathbb C^2$ だから $\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ です。**ここで固有値を使う理由**は、台を正固有値の固有空間で判定し、対数をその固有空間上で作用させるという直前の定義にあります。

$\operatorname{Tr}(\rho\log_2\rho)=1\log_2 1=0$ です。一方、$\sigma$ の固有ベクトルは $|0\rangle,|1\rangle$ で、$|\langle0|+\rangle|^2=|\langle1|+\rangle|^2=1/2$ です。従って §2 の固有基底表示に代入すると

$$
\operatorname{Tr}(\rho\log_2\sigma)
=\tfrac12\log_2\tfrac34+\tfrac12\log_2\tfrac14,
\qquad D(\rho\|\sigma)=\tfrac12\log_2\tfrac{16}{3}.
$$

実際、上の行列積から

$$
\rho\sigma-\sigma\rho
=\begin{pmatrix}0&-1/4\\1/4&0\end{pmatrix}\ne0
$$

なので $\rho$ と $\sigma$ は可換ではありません。$\rho$ の**対角成分だけ**を $(1/2,1/2)$ とみなして古典相対エントロピーを計算すると、純粋状態の非対角成分の情報を落とします。この操作を定義そのものと取り違えないでください。
<!-- definition-example-end -->

対照的に $\rho=|1\rangle\langle1|$、$\sigma=|0\rangle\langle0|$ では、両者の台は互いに直交し、$D(\rho\|\sigma)=+\infty$ です。$\sigma$ がその方向に全く重みを持たないことを表しています。

## 3. 非負性・等長不変性：何を捨てなければ変わらないか

定義した隔たりが負になるなら、識別情報の尺度として使いづらくなります。[QINF18](../QINF18/index.md#lem-qinf18-log)ですでに証明した非可換の対数比較を、今度は名前を付けた量へ読み替えます。

<a id="prop-qinf20-nonnegative"></a>

<!-- formal-statement-start -->
> **命題（量子相対エントロピーの非負性と等号条件）**  
> 同じ有限次元Hilbert空間上の任意の二つの密度演算子 $\rho,\sigma$ について

$$
D(\rho\|\sigma)\ge0,
\qquad D(\rho\|\sigma)=0\ \Longleftrightarrow\ \rho=\sigma.
$$

> 台が含まれない場合は左辺を $+\infty$ と解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

台が含まれるなら、固有基底の重なりを重みとする[有限次元の対数比較補題](../QINF18/index.md#lem-qinf18-log)が、まさに定義の二つのトレースの差を非負とし、等号を $\rho=\sigma$ と確定します。含まれない場合は定義から無限大で、等号ではありません。

<!-- proof-start -->
### 証明

$\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ なら、[QINF18の補題](../QINF18/index.md#lem-qinf18-log)に $R=\rho,T=\sigma$ と代入します。補題は二つの行列が可換とは仮定せず、$r_i|\langle u_i|v_j\rangle|^2$ の表から $D\ge0$ と等号 iff $R=T$ を証明済みです。逆に $\rho=\sigma$ なら二つのトレースが相殺されます。台が含まれない場合 $D=+\infty>0$ なので等号ではありません。$\square$
<!-- proof-end -->

隔たりを保つ操作として、余分な出力次元へ埋め込む[等長写像](../QINF8/index.md#def-qinf8-isometry)を考えます。これは後で[Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)に使います。

<a id="lem-qinf20-isometry"></a>

<!-- formal-statement-start -->
> **補題（等長写像による相対エントロピーの不変性）**  
> 有限次元Hilbert空間間の等長写像 $V:H\to K$（$V^\dagger V=I_H$）と $H$ 上の密度演算子 $\rho,\sigma$ に対し、

$$
D(V\rho V^\dagger\|V\sigma V^\dagger)=D(\rho\|\sigma)
$$

> が成立する。いずれかの値が $+\infty$ の場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

$V$ は内積を保つので正固有値と固有基底の重なりを変えません。出力に付け加わる直交方向の零固有値は、両方の状態に共通であり寄与しません。

<!-- proof-start -->
### 証明

$\rho=\sum_i r_i|u_i\rangle\langle u_i|$、$\sigma=\sum_j s_j|v_j\rangle\langle v_j|$ とします。$V^\dagger V=I_H$ より、$\{Vu_i\}_i$、$\{Vv_j\}_j$ はそれぞれ $V(H)$ の正規直交基底です。$V\rho V^\dagger$ は $Vu_i$ 上で固有値 $r_i$ を持ち、$V(H)^\perp$ 上では0です。$V\sigma V^\dagger$ も同様です。

特に $\operatorname{supp}(V\rho V^\dagger)=V(\operatorname{supp}\rho)$ であり、$V$ が単射だから台包含の有無が一致します。台が含まれるとき、§2の固有基底表示で $|\langle Vu_i|Vv_j\rangle|^2=|\langle u_i|v_j\rangle|^2$ を使えば二つの和が項ごとに一致します。含まれなければ両辺とも $+\infty$ です。$\square$
<!-- proof-end -->

特にユニタリ $U$ に対しても $D(U\rho U^\dagger\|U\sigma U^\dagger)=D(\rho\|\sigma)$。ただし**一方の状態だけ**にユニタリを掛けたときの不変性は主張していません。

## 4. 部分トレースのデータ処理：零固有値まで閉じる

[QINF3で定義した部分トレース](../QINF3/index.md#def-qinf3-partial-trace)について、[QINF19の補題](../QINF19/index.md#lem-qinf19-partial-trace-log)は厳密に正定値な二つの行列の対数比較を、Hilbert–Schmidt空間上の逆行列圧縮と収束積分から証明しました。そこで用いた非可換行列不等式を、ここでは**証明済みの直接前提**として使います。残る本質的な論点は、台条件を保ちながら零固有値を持つ密度演算子へ拡張することです。

<a id="lem-qinf20-partial-trace"></a>

<!-- formal-statement-start -->
> **補題（零固有値を許す部分トレース単調性）**  
> 有限次元二部系 $H_X\otimes H_Y$ 上の任意の密度演算子 $\rho_{XY},\sigma_{XY}$ とその縮約 $\rho_X=\operatorname{Tr}_Y\rho_{XY}$、$\sigma_X=\operatorname{Tr}_Y\sigma_{XY}$ に対し、

$$
D(\rho_X\|\sigma_X)\le D(\rho_{XY}\|\sigma_{XY})
$$

> が成立する。右辺が有限なら左辺も有限であり、台の包含は出力でも成り立つ。右辺が $+\infty$ なら拡張実数の不等式として解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

右辺が有限なら $\rho_{XY}\le c\sigma_{XY}$ となる有限定数 $c$ が取れるため、出力の台も含まれます。双方へ同じ微小最大混合成分を足して正定値にし、[QINF19の比較補題](../QINF19/index.md#lem-qinf19-partial-trace-log)を適用します。$\log 0$ の問題は、零固有空間への重みが $O(\varepsilon)$ であることと $\varepsilon\log\varepsilon\to0$ を分けて確かめます。

<!-- proof-start -->
### 証明

**1. 台包含は部分トレース後にも保存される。** $D(\rho_{XY}\|\sigma_{XY})<\infty$ と仮定します。$P$ を $\sigma_{XY}$ の台への射影、$m>0$ を $\sigma_{XY}$ の最小の正固有値とすると $\sigma_{XY}\ge mP$。台の包含と密度行列の固有値が1以下であることから $0\le\rho_{XY}\le P$。従って

$$
0\le\rho_{XY}\le m^{-1}\sigma_{XY}.
$$

[部分トレースの正値性](../QINF3/index.md#def-qinf3-partial-trace)により $0\le\rho_X\le m^{-1}\sigma_X$。$z\in\ker\sigma_X$ なら $0\le\langle z,\rho_Xz\rangle\le0$ です。正値行列の平方根により $\rho_X^{1/2}z=0$、よって $z\in\ker\rho_X$。従って $\operatorname{supp}\rho_X\subseteq\operatorname{supp}\sigma_X$ です。

**2. 正定値にして比較する。** $d=d_Xd_Y=\dim(H_X\otimes H_Y)$ とし、$0<\varepsilon<1$ に対して

$$
\rho_{XY}^{(\varepsilon)}=(1-\varepsilon)\rho_{XY}+\varepsilon I_{XY}/d,
\quad
\sigma_{XY}^{(\varepsilon)}=(1-\varepsilon)\sigma_{XY}+\varepsilon I_{XY}/d.
$$

いずれも正定値・トレース1です。部分トレースすると $\rho_X^{(\varepsilon)}=(1-\varepsilon)\rho_X+\varepsilon I_X/d_X$ と $\sigma_X^{(\varepsilon)}=(1-\varepsilon)\sigma_X+\varepsilon I_X/d_X$ になります。[正定値行列の部分トレース比較](../QINF19/index.md#lem-qinf19-partial-trace-log)に $T=\rho_{XY}^{(\varepsilon)}$、$R=\sigma_{XY}^{(\varepsilon)}$ を入力し、両辺を $\ln2>0$ で割ると

$$
D(\rho_X^{(\varepsilon)}\|\sigma_X^{(\varepsilon)})
\le D(\rho_{XY}^{(\varepsilon)}\|\sigma_{XY}^{(\varepsilon)}).
$$

**3. 極限を正確に取る。** 一般に同じ次元 $n$ の密度行列 $A,B$ が $\operatorname{supp}A\subseteq\operatorname{supp}B$ を満たすとします。$A_\varepsilon=(1-\varepsilon)A+\varepsilon I/n$、$B_\varepsilon=(1-\varepsilon)B+\varepsilon I/n$ とします。$A_\varepsilon$ の固有値は $A$ の固有値 $a_i$ に対して $(1-\varepsilon)a_i+\varepsilon/n$ なので、$x\log_2x\to0$（$x\downarrow0$）から

$$
\operatorname{Tr}(A_\varepsilon\log_2 A_\varepsilon)
\longrightarrow \operatorname{Tr}(A\log_2A).
$$

$B$ の固有値を $b_j$、対応する単位固有ベクトルを $v_j$ とします。$B_\varepsilon$ は同じ固有ベクトルを持つので

$$
\operatorname{Tr}(A_\varepsilon\log_2 B_\varepsilon)
=\sum_j\left((1-\varepsilon)\langle v_j|A|v_j\rangle+\frac\varepsilon n\right)
\log_2\left((1-\varepsilon)b_j+\frac\varepsilon n\right).
$$

$b_j>0$ の項は連続性から $\langle v_j|A|v_j\rangle\log_2b_j$ に収束します。$b_j=0$ なら台包含により $\langle v_j|A|v_j\rangle=0$ なので、残る項は $(\varepsilon/n)\log_2(\varepsilon/n)\to0$ です。有限和だから

$$
D(A_\varepsilon\|B_\varepsilon)\longrightarrow D(A\|B).
$$

これを $(A,B)=(\rho_{XY},\sigma_{XY})$ と $(\rho_X,\sigma_X)$ の両方へ適用して比較式の極限を取り、主張を得ます。最初から右辺が $+\infty$ の場合は、左辺が有限でも無限でも不等式は自動的に成立します。$\square$
<!-- proof-end -->

この論証は、**右辺が有限な場合**の極限を保証しています。台が含まれない状態を無理に正則化して有限値へ収束すると主張する必要はありません。零固有値のある一般状態に対しては、ここまでの確認が不可欠です。

## 5. 任意の量子チャネルのデータ処理不等式

部分トレースは「環境を忘れる」操作です。[Stinespringの有限次元表現](../QINF8/index.md#thm-qinf8-stinespring)によれば、どの量子チャネルも入力を等長に大きな系へ移し、その一部を捨てる形に書けます。等長写像では相対エントロピーが変わらず、捨てると増えないので、一般の雑音に対する主張へつながります。

以下、$L(H)$ は $H$ 上の全線形作用素の空間で、[QINF7のチャネルの定義](../QINF7/index.md#def-qinf7-channel)と同じ表記です。これは[QINF19の行列空間](../QINF19/index.md#lem-qinf19-partial-trace-log)で用いた $\mathcal M(H)$ と集合として同じですが、ここではチャネルの入力・出力空間を $L(H)$ に統一します。

<a id="thm-qinf20-dpi"></a>

<!-- formal-statement-start -->
> **定理（量子相対エントロピーのデータ処理不等式）**  
> 有限次元Hilbert空間 $H_A,H_B$ を取り、$H_A$ 上の密度演算子 $\rho,\sigma$ と、完全正かつトレース保存の量子チャネル $\Phi:L(H_A)\to L(H_B)$ に対し、

$$
D(\Phi(\rho)\|\Phi(\sigma))\le D(\rho\|\sigma)
$$

> が成立する。入力の台包含が成立すれば出力の台包含も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

右辺が無限大なら不等式は直ちに成立します。有限なら §4 の順序比較で出力の台包含も確保します。一般の[Stinespring等長写像](../QINF8/index.md#thm-qinf8-stinespring) $V:H_A\to H_B\otimes H_E$ を取り、$\Phi(\tau)=\operatorname{Tr}_E(V\tau V^\dagger)$ へ、順に等長不変性と部分トレース単調性を使います。

<!-- proof-start -->
### 証明

$D(\rho\|\sigma)=+\infty$ なら自明です。有限なら §4 の証明と同様に、$\sigma$ の最小正固有値 $m$ を用いて $0\le\rho\le m^{-1}\sigma$。$\Phi$ は[完全正ゆえ正値写像](../QINF7/index.md#def-qinf7-positive-cp)なので $0\le\Phi(\rho)\le m^{-1}\Phi(\sigma)$、従って出力の台包含も成立します。

[有限次元Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)により、ある有限次元環境 $H_E$ と $V^\dagger V=I_A$ を満たす $V:H_A\to H_B\otimes H_E$ があり、任意の入力行列 $X$ に対して $\Phi(X)=\operatorname{Tr}_E(VXV^\dagger)$ です。$V\rho V^\dagger,V\sigma V^\dagger$ は正半定値・トレース1で、[等長不変性](#lem-qinf20-isometry)と[零固有値を許す部分トレース単調性](#lem-qinf20-partial-trace)から

$$
\begin{aligned}
D(\rho\|\sigma)
&=D(V\rho V^\dagger\|V\sigma V^\dagger)\\
&\ge D(\operatorname{Tr}_E V\rho V^\dagger
\|\operatorname{Tr}_E V\sigma V^\dagger)\\
&=D(\Phi(\rho)\|\Phi(\sigma)).
\end{aligned}
$$

必要な行列比較の核心は[QINF19の補題](../QINF19/index.md#lem-qinf19-partial-trace-log)と、その前段の[逆行列圧縮の証明](../QINF19/index.md#lem-qinf19-inverse-compression)にすでに閉じています。本章ではその仮定を零固有値まで拡張し、チャネル表示への代入も示しました。$\square$
<!-- proof-end -->

例えば $|+\rangle$ の状態と最大混合状態 $I_2/2$ を比較すると、入力の相対エントロピーは1です。計算基底の**位相消失チャネル**を

$$
\mathcal D(X)=P_0XP_0+P_1XP_1,
\qquad P_j=|j\rangle\langle j|\quad(j=0,1)
$$

とします。$P_0^\dagger P_0+P_1^\dagger P_1=I_2$ なので、[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たします。出力を直接計算すると

$$
\mathcal D(|+\rangle\langle+|)=I_2/2=\mathcal D(I_2/2)
$$

であり、相対エントロピーの比較は $1>0$ と厳密です。測定や雑音を受けたあと、**失われた相対エントロピーを勝手に復活させる一般操作はありません**。

## 6. 相互情報量、強劣加法性、測定への接続

二部状態 $\rho_{AB}$ に対しては、$\operatorname{supp}\rho_{AB}\subseteq\operatorname{supp}(\rho_A\otimes\rho_B)$ が成り立ちます。理由は[QINF18の部分加法性の証明](../QINF18/index.md#thm-qinf18-subadditivity)にあるように、周辺状態の核への射影 $P$ を取ると $\operatorname{Tr}[(P\otimes I)\rho_{AB}]=0$ で、正値性から $\rho_{AB}$ はその方向に台を持てないためです。$A$ と $B$ の両方についてこれを使います。

以下、[既習の量子相互情報量](../QINF18/index.md#def-qinf18-mutual)と同様に、$X=A,B,AB$ について $S_X=S(\rho_X)$ と略記します。

積行列の正固有値は局所固有値の積です。局所状態の正固有値・固有ベクトルをそれぞれ $a_i,|a_i\rangle$ および $b_j,|b_j\rangle$ とします。すると

$$
(\rho_A\otimes\rho_B)(|a_i\rangle\otimes|b_j\rangle)
=a_ib_j(|a_i\rangle\otimes|b_j\rangle),
\qquad \log_2(a_ib_j)=\log_2a_i+\log_2b_j.
$$

従って積状態の台上では

$$
\log_2(\rho_A\otimes\rho_B)
=(\log_2\rho_A)\otimes I_B+I_A\otimes(\log_2\rho_B).
$$

零固有空間では対数を作用させず、先に確かめた台包含を使います。この式のトレースを[部分トレースの局所期待値公式](../QINF3/index.md#thm-qinf3-expectation-uniqueness)で縮約すると

$$
\operatorname{Tr}\bigl[\rho_{AB}(\log_2\rho_A\otimes I_B)\bigr]
=\operatorname{Tr}(\rho_A\log_2\rho_A)
$$

で、$B$ 側も同様です。従って[量子相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)を展開すると

$$
\begin{aligned}
D(\rho_{AB}\|\rho_A\otimes\rho_B)
&=-S(\rho_{AB})-\operatorname{Tr}(\rho_A\log_2\rho_A)
-\operatorname{Tr}(\rho_B\log_2\rho_B)\\
&=S_A+S_B-S_{AB}=I(A:B)_\rho.
\end{aligned}
$$

これによって相互情報量は、「実際の共同状態」と「周辺状態だけから作る無相関な積状態」との相対エントロピーになります。以下の $\operatorname{id}_A$ は $A$ 上で何もしない恒等チャネルを表し、[完全正写像の定義](../QINF7/index.md#def-qinf7-positive-cp)での $\mathrm{id}_n$ と同じものです。$B'$ は $B$ の処理後の出力系を指します。

<a id="cor-qinf20-mutual-dpi"></a>

<!-- formal-statement-start -->
> **系（局所チャネルによる量子相互情報量の単調性）**  
> 任意の有限次元二部状態 $\rho_{AB}$ と、$B$ から $B'$ への量子チャネル $\Phi_B$ に対し、$\omega_{AB'}=(\operatorname{id}_A\otimes\Phi_B)(\rho_{AB})$ と置くと、

$$
I(A:B')_\omega\le I(A:B)_\rho.
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所チャネルは実状態 $\rho_{AB}$ と比較対象 $\rho_A\otimes\rho_B$ の双方に作用させます。後者の出力は $\rho_A\otimes\omega_{B'}$ ですから、[データ処理不等式](#thm-qinf20-dpi)がちょうど相互情報量の比較になります。

<!-- proof-start -->
### 証明

$\Psi=\operatorname{id}_A\otimes\Phi_B$ は完全正かつトレース保存であるため量子チャネルです。[データ処理不等式](#thm-qinf20-dpi)に $\rho=\rho_{AB}$ と $\sigma=\rho_A\otimes\rho_B$ を入力すると

$$
\begin{aligned}
I(A:B)_\rho
&=D(\rho_{AB}\|\rho_A\otimes\rho_B)\\
&\ge D(\Psi(\rho_{AB})\|\Psi(\rho_A\otimes\rho_B))\\
&=D(\omega_{AB'}\|\rho_A\otimes\Phi_B(\rho_B))\\
&=D(\omega_{AB'}\|\omega_A\otimes\omega_{B'})
=I(A:B')_\omega.
\end{aligned}
$$

最後から二番目では、$A$ 側を操作していないので $\omega_A=\rho_A$、部分トレースと局所チャネルの可換性から $\omega_{B'}=\Phi_B(\rho_B)$ を使いました。$\square$
<!-- proof-end -->

この系に $B=BC$、$B'=B$、$\Phi_B=\operatorname{Tr}_C$ を代入し、[条件付き相互情報量の定義](../QINF19/index.md#def-qinf19-cmi)に戻せば

$$
I(A:BC)_\rho-I(A:B)_\rho
=S_{AB}+S_{BC}-S_B-S_{ABC}
=I(A:C|B)_\rho\ge0.
$$

これが[QINF19の強劣加法性](../QINF19/index.md#thm-qinf19-ssa)です。ただし、この推論をQINF19から**独立した**証明と呼んではいけません。本章の一般データ処理の核心は、まさにQINF19が証明した行列補題に依存しています。主張の同値な見え方を結びつけたのです。

測定でも同じ向きが成り立ちます。[POVM](../QINF5/index.md#def-qinf5-povm) $\{M_y\}_y$ に対し $p_y=\operatorname{Tr}(M_y\rho)$、$q_y=\operatorname{Tr}(M_y\sigma)$ と置き、結果を直交する古典ラベル $|y\rangle$ に書く写像 $\mathcal M(\tau)=\sum_y\operatorname{Tr}(M_y\tau)|y\rangle\langle y|$ を考えます。

この写像がCPTPであることも構成から分かります。各 $M_y$ の正固有値分解を $M_y=\sum_k m_{yk}|v_{yk}\rangle\langle v_{yk}|$ とし、入力からラベル空間への作用素を $K_{yk}=\sqrt{m_{yk}}|y\rangle\langle v_{yk}|$ と定めます。すると

$$
\sum_{y,k}K_{yk}^\dagger K_{yk}=\sum_yM_y=I,
\qquad
\sum_{y,k}K_{yk}\tau K_{yk}^\dagger
=\sum_y\operatorname{Tr}(M_y\tau)|y\rangle\langle y|.
$$

従って[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たします。[データ処理不等式](#thm-qinf20-dpi)と[古典相対エントロピーの台条件](../../INFO/INFO2/index.md#def-info2-relative-entropy)を対角出力へ適用すると

$$
\sum_{y:p_y>0}p_y\log_2\frac{p_y}{q_y}
=D(\mathcal M(\rho)\|\mathcal M(\sigma))
\le D(\rho\|\sigma).
$$

この和は $p_y>0,q_y=0$ が一つでもあれば $+\infty$ とする拡張実数の式です。右辺が有限なら $q_y=0$ の場所で $p_y=0$ なので左辺も有限です。結果ラベルだけを保存する測定は、入力の識別情報を増やしません。**測定結果を条件として選別した後の正規化状態**については、成功確率を無視して同じ不等式を直接適用できるとは限りません。

## 7. いつ等号となるか：古典的な粗視化で検算する

等長変換やユニタリ変換では[補題](#lem-qinf20-isometry)により等号が成立します。入力に共通の密度演算子 $\tau$ を独立に付ける写像 $X\mapsto X\otimes\tau$ もチャネルです。実際、$\tau$ の固有分解から出力へのKraus作用素を

$$
\tau=\sum_k\lambda_k|v_k\rangle\langle v_k|,
\qquad K_k=\sqrt{\lambda_k}(I\otimes|v_k\rangle)
\quad (\lambda_k\ge0,\ \sum_k\lambda_k=1)
$$

と置けば、

$$
\sum_kK_kXK_k^\dagger=X\otimes\tau,
\qquad \sum_kK_k^\dagger K_k=\sum_k\lambda_k I=I.
$$

従って[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たし、付加後に $\tau$ を[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で捨てるチャネルもあります。[データ処理不等式](#thm-qinf20-dpi)を両方向に使うと

$$
D(\rho\|\sigma)
\ge D(\rho\otimes\tau\|\sigma\otimes\tau)
\ge D(\rho\|\sigma).
$$

従って等号です。一方、§5の位相消失の例は厳密な不等号です。**等号はチャネルだけではなく比較する二状態にも依存**します。

古典的なラベルをまとめる操作については、等号条件を完全に計算できます。有限集合 $\Omega$ 上の確率ベクトル $p=(p_i)$、$q=(q_i)$ を、各総和1かつ $p_i\ge0$、$q_i>0$ とします。ラベルを群 $b$ へ送る全射 $g:\Omega\to\mathcal B$ を考え、群の確率を

$$
P_b=\sum_{i:g(i)=b}p_i,
\qquad Q_b=\sum_{i:g(i)=b}q_i
$$

とします。$P_b>0$ の群では $Q_b>0$ でもあるので、群内の条件付き確率を $p_{i|b}=p_i/P_b$、$q_{i|b}=q_i/Q_b$ と書けます。$p_{\cdot|b},q_{\cdot|b}$ の点は、群 $g^{-1}(b)$ 内の全添字 $i$ を走らせた条件付き確率ベクトル全体を表します。

<a id="prop-qinf20-classical-coarse"></a>

<!-- formal-statement-start -->
> **命題（古典的粗視化の相対エントロピー差と等号）**  
> 上記の有限確率ベクトル $p,q$ と全射 $g$ に対し、$P_b>0$ の群内では条件付き確率 $p_{i|b}=p_i/P_b$、$q_{i|b}=q_i/Q_b$ を定める。このとき

$$
D(p\|q)-D(P\|Q)
=\sum_{b:P_b>0}P_bD(p_{\cdot|b}\|q_{\cdot|b})\ge0.
$$

> 等号となるのは、$P_b>0$ の全ての群 $b$ で $p_{i|b}=q_{i|b}$ が全ての $i\in g^{-1}(b)$ に対して成立するとき、かつそのときに限る。$P_b=0$ の群には条件を課さない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $i$ の比 $p_i/q_i$ を「群の比」と「群内条件付き確率の比」に分解します。対数が和になるので、群の情報と群内の情報を分けられます。群内の情報は[相対エントロピーの非負性](#prop-qinf20-nonnegative)から非負で、等号条件も定まります。

<!-- proof-start -->
### 証明

$P_b=0$ ならその群内の全ての $p_i$ は0で、$D(p\|q)$ への寄与も0です。$P_b>0$ なら全射と $q_i>0$ から $Q_b>0$ で、$p_i>0$ の項について

$$
\frac{p_i}{q_i}=\frac{P_b}{Q_b}\frac{p_{i|b}}{q_{i|b}},
\qquad
\log_2\frac{p_i}{q_i}=\log_2\frac{P_b}{Q_b}+\log_2\frac{p_{i|b}}{q_{i|b}}.
$$

両辺に $p_i=P_bp_{i|b}$ を掛け、$g(i)=b$ の群内で和を取ると、$\sum_i p_{i|b}=1$ より

$$
\sum_{i:g(i)=b}p_i\log_2\frac{p_i}{q_i}
=P_b\log_2\frac{P_b}{Q_b}
+P_b\sum_{i:g(i)=b}p_{i|b}\log_2\frac{p_{i|b}}{q_{i|b}}.
$$

群 $b$ を全て足すと主張の等式です。群内の二分布を対角密度演算子と見れば[非負性と等号条件](#prop-qinf20-nonnegative)が使えます。$P_b>0$ なので非負項の和が0になるのは全ての群内の二分布が一致するときだけです。$\square$
<!-- proof-end -->

例えば4ラベルを $g(1)=g(2)=0$、$g(3)=g(4)=1$ とまとめ、$q=(1/4,1/4,1/4,1/4)$、$p=(1/2,0,1/2,0)$ とすると、粗視化前は $D(p\|q)=1$、後は $P=Q=(1/2,1/2)$ なので0です。反対に $p=(3/8,3/8,1/8,1/8)$ なら各群内の二条件付き分布は共に $(1/2,1/2)$ で、粗視化しても $D(p\|q)=D(P\|Q)$ のままです。

これは**古典的粗視化**の等号判定であって、一般の非可換な量子チャネルの等号・回復写像の構造定理を証明したものではありません。その一般理論は後の情報回復の議論で慎重に扱います。

## 8. 演習：台を確認してからチャネルを適用する

全問で $\log$ は底2、$h_2(t)=-t\log_2t-(1-t)\log_2(1-t)$（$0\log_2 0=0$）は二値エントロピーです。特記しない限り $|0\rangle,|1\rangle$ はqubitの計算基底です。問題ごとに正値性・トレース・台・チャネルの仮定を確認してください。

<a id="ex-qinf20-a01"></a>
### QINF20-A01 純粋状態と最大混合状態

- Level: A

$H=\mathbb C^2$ 上の $\rho=|0\rangle\langle0|$、$\sigma=I_2/2$ の正値性・トレース・台を確認し、$D(\rho\|\sigma)$、$D(\sigma\|\rho)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\rho=\operatorname{diag}(1,0)$、$\sigma=\operatorname{diag}(1/2,1/2)$ なので両方正半定値・トレース1です。$\operatorname{supp}\rho=\operatorname{span}\{|0\rangle\}$、$\operatorname{supp}\sigma=H$。従って最初の向きは有限で、固有値表示から

$$
D(\rho\|\sigma)=1\log_2\frac1{1/2}=1.
$$

反対向きは $\operatorname{supp}\sigma\not\subseteq\operatorname{supp}\rho$（$|1\rangle$ が余る）なので、定義から $D(\sigma\|\rho)=+\infty$。相対エントロピーは対称ではありません。
<!-- solution-end -->

<a id="ex-qinf20-a02"></a>
### QINF20-A02 零固有値を割り算しない

- Level: A

$\rho=|1\rangle\langle1|$、$\sigma=|0\rangle\langle0|$ とする。(1) $D(\rho\|\sigma)$ を判定し、(2) $\sigma_\varepsilon=(1-\varepsilon)\sigma+\varepsilon I_2/2$（$0<\varepsilon<1$）に対する $D(\rho\|\sigma_\varepsilon)$ を計算して極限を求めよ。

<!-- solution-start -->
### 詳細解答

両状態はrank 1の射影で正半定値・トレース1、台は互いに直交します。従って (1) は $+\infty$ です。(2) は $\sigma_\varepsilon=\operatorname{diag}(1-\varepsilon/2,\varepsilon/2)$ で正定値となり、$\rho$ が持つ $|1\rangle$ の固有値は $\varepsilon/2$ です。よって

$$
D(\rho\|\sigma_\varepsilon)
=-\log_2(\varepsilon/2)=\log_2(2/\varepsilon)
\longrightarrow+\infty.
$$

無限大は「$\log_2 0$ を数として代入した値」ではなく、台条件に伴う定義と正則化の発散が一致したものです。
<!-- solution-end -->

<a id="ex-qinf20-a03"></a>
### QINF20-A03 古典二値分布との一致

- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=I_2/2$ に対し、$D(\rho\|\sigma)$ を $h_2(1/4)$ を使って表し、正負と等号の有無を判定せよ。

<!-- solution-start -->
### 詳細解答

$\rho,\sigma$ はともに正定値・トレース1で可換です。[定義](#def-qinf20-relative-entropy)から

$$
\begin{aligned}
D(\rho\|\sigma)
&=\tfrac34\log_2\frac{3/4}{1/2}
+\tfrac14\log_2\frac{1/4}{1/2}\\
&=\tfrac34\log_2\tfrac34+\tfrac14\log_2\tfrac14+1
=1-h_2(1/4)>0.
\end{aligned}
$$

最後の厳密な正値性は $\rho\ne\sigma$ と[非負性の等号条件](#prop-qinf20-nonnegative)からも従います。
<!-- solution-end -->

<a id="ex-qinf20-a04"></a>
### QINF20-A04 二つの状態を同時に回す

- Level: A

$U=2^{-1/2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$、$\rho=|0\rangle\langle0|$、$\sigma=I_2/2$ とする。$U$ がユニタリであることを確かめ、$D(U\rho U^\dagger\|U\sigma U^\dagger)$ を直接計算せよ。

<!-- solution-start -->
### 詳細解答

$U$ は実対称で、行列積を取ると $U^\dagger U=\frac12\begin{pmatrix}2&0\\0&2\end{pmatrix}=I_2$ です。$U|0\rangle=|+\rangle$ なので、$U\rho U^\dagger=|+\rangle\langle+|$ はrank 1、$U\sigma U^\dagger=I_2/2$ は正定値。台包含が成り立ち、

$$
D(|+\rangle\langle+|\|I_2/2)
=0-\langle+|(-I_2)|+\rangle=1.
$$

これは変換前の $D(\rho\|\sigma)=1$ と一致し、[等長不変性](#lem-qinf20-isometry)を具体的に検算します。
<!-- solution-end -->

<a id="ex-qinf20-a05"></a>
### QINF20-A05 二値対称雑音の強さ

- Level: A

$0\le t\le1$、$\rho=|0\rangle\langle0|$、$\sigma=I_2/2$ とし、$X=|0\rangle\langle1|+|1\rangle\langle0|$、$\Phi_t(\tau)=(1-t/2)\tau+(t/2)X\tau X$ とする。添字 $t$ は雑音の強さを表すパラメータで、微分ではなくチャネル族の区別に使う。CPTPを確認し、出力の相対エントロピー、$t=0,1$ での等号を求めよ。

<!-- solution-start -->
### 詳細解答

$X^\dagger X=I_2$ で、Kraus作用素 $K_0=\sqrt{1-t/2}I_2$、$K_1=\sqrt{t/2}X$ は $\sum_j K_j^\dagger K_j=(1-t/2)I_2+(t/2)I_2=I_2$。従って[QINF7の条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPです。

$$
\Phi_t(\rho)=\operatorname{diag}(1-t/2,t/2),
\qquad\Phi_t(\sigma)=I_2/2.
$$

出力の相対エントロピーは $1-h_2(t/2)$。入力は1で、$0\le h_2(t/2)\le1$ より単調性が確認できます。$t=0$ ではチャネルが恒等で等号 $1=1$、$t=1$ では出力が一致し $1\ge0$ は厳密です。中間の $0<t\le1$ でも $h_2(t/2)>0$ なので厳密です。
<!-- solution-end -->

<a id="ex-qinf20-b01"></a>
### QINF20-B01 零固有値の正則化を式で確かめる

- Level: B

$\rho=|0\rangle\langle0|$、$\sigma=\operatorname{diag}(3/4,1/4)$ とする。$0<\varepsilon<1$ に対して $\rho_\varepsilon=(1-\varepsilon)\rho+\varepsilon I_2/2$、$\sigma_\varepsilon=(1-\varepsilon)\sigma+\varepsilon I_2/2$ と置く。両者が正定値密度演算子であることを確認し、$D(\rho_\varepsilon\|\sigma_\varepsilon)$ の明示式と極限を求めよ。

<!-- solution-start -->
### 詳細解答

$\rho_\varepsilon$ の対角成分は $1-\varepsilon/2,\varepsilon/2$、$\sigma_\varepsilon$ は $3/4-\varepsilon/4,1/4+\varepsilon/4$ です。$0<\varepsilon<1$ の範囲で全て正、各二成分の和は1なので、両方とも正定値・トレース1。可換なので[定義](#def-qinf20-relative-entropy)から

$$
\begin{aligned}
D(\rho_\varepsilon\|\sigma_\varepsilon)
&=(1-\varepsilon/2)\log_2\frac{1-\varepsilon/2}{3/4-\varepsilon/4}\\
&\quad +(\varepsilon/2)\log_2\frac{\varepsilon/2}{1/4+\varepsilon/4}.
\end{aligned}
$$

第1項は $\log_2(4/3)$ に収束します。第2項は分母が $1/4$ へ、分子が0へ向かうため $x\log_2x\to0$ を使って0へ収束します。従って

$$
\lim_{\varepsilon\downarrow0}D(\rho_\varepsilon\|\sigma_\varepsilon)
=\log_2(4/3)=D(\rho\|\sigma).
$$

ここでは $\sigma$ がもともと正定値で、台包含は保たれています。台が含まれない[演習A02](#ex-qinf20-a02)の発散と混同しません。
<!-- solution-end -->

<a id="ex-qinf20-b02"></a>
### QINF20-B02 部分トレースで厳密に減る例

- Level: B

二qubit系 $AB$ 上の $\rho_{AB}=(|00\rangle\langle00|+|11\rangle\langle11|)/2$、$\sigma_{AB}=I_4/4$ とする。状態・台条件を確認し、$D(\rho_{AB}\|\sigma_{AB})$ と $D(\rho_A\|\sigma_A)$ を直接求め、[部分トレース単調性](#lem-qinf20-partial-trace)の不等号を判定せよ。

<!-- solution-start -->
### 詳細解答

$\rho_{AB}$ の計算基底での対角成分は $(1/2,0,0,1/2)$、$\sigma_{AB}$ は4個とも $1/4$ です。いずれも非負・和1、かつ $\sigma_{AB}$ は全台なので包含が成立します。$\rho_{AB}$ の非零固有値は二つとも $1/2$ で、

$$
D(\rho_{AB}\|\sigma_{AB})
=2\cdot\tfrac12\log_2\frac{1/2}{1/4}=1.
$$

[部分トレースの計算規則](../QINF3/index.md#def-qinf3-partial-trace)より

$$
\rho_A=(|0\rangle\langle0|+|1\rangle\langle1|)/2=I_2/2,
\qquad \sigma_A=\operatorname{Tr}_B(I_4/4)=I_2/2.
$$

従って $D(\rho_A\|\sigma_A)=0$、比較は $0<1$ と厳密です。消えた隔たりは $A$ だけでは分からない $AB$ の相関にあったと解釈できます。
<!-- solution-end -->

<a id="ex-qinf20-b03"></a>
### QINF20-B03 古典粗視化で失う量を分解する

- Level: B

四つの古典ラベル $i=1,2,3,4$ に対し $p=(1/2,1/4,1/4,0)$、$q=(1/4,1/4,1/4,1/4)$ とし、$g(1)=g(2)=0$、$g(3)=g(4)=1$ とまとめる。次を求めよ。

1. 粗視化前後の相対エントロピー。
2. 群内条件付き相対エントロピーの重み付き和と、[粗視化の命題](#prop-qinf20-classical-coarse)の数値的な検算。

<!-- solution-start -->
### 詳細解答

$p_i\ge0,q_i>0$、両総和1なので確率ベクトルの条件は満たされ、相対エントロピーは有限です。$p_4=0$ の項は0とし、

$$
D(p\|q)=\tfrac12\log_2 2+\tfrac14\log_2 1+\tfrac14\log_2 1=\tfrac12.
$$

群ごとの確率は $P=(3/4,1/4)$、$Q=(1/2,1/2)$。従って

$$
D(P\|Q)=\tfrac34\log_2\tfrac32+\tfrac14\log_2\tfrac12
=1-h_2(1/4).
$$

$P_0,P_1$ は正なので両群を条件付けます。群0では $p_{\cdot|0}=(2/3,1/3)$、$q_{\cdot|0}=(1/2,1/2)$。群1では $p_{\cdot|1}=(1,0)$、$q_{\cdot|1}=(1/2,1/2)$。従って群内の重み付き和は

$$
\tfrac34\{1-h_2(1/3)\}+\tfrac14\cdot1
=1-\tfrac34h_2(1/3).
$$

一方、$h_2(1/4)=2-\tfrac34\log_2 3$、$h_2(1/3)=\log_2 3-2/3$ を代入すると、$1-\tfrac34h_2(1/3)=h_2(1/4)-1/2$。これは $D(p\|q)-D(P\|Q)=1/2-(1-h_2(1/4))$ と一致します。どちらの群でも条件付き分布が異なるので等号にはなりません。
<!-- solution-end -->

<a id="ex-qinf20-b04"></a>
### QINF20-B04 三部状態で強劣加法性と照合する

- Level: B

古典ビット $A,C$ を独立・一様とし $B=A\oplus C$ とする。確率が正の4組を計算基底に対角に埋めた三qubit状態 $\rho_{ABC}$ に対し、$D(\rho_{ABC}\|\rho_A\otimes\rho_{BC})$、$D(\rho_{AB}\|\rho_A\otimes\rho_B)$ を求め、両者の差を $I(A:C|B)$ と照合せよ。

<!-- solution-start -->
### 詳細解答

可能な $(A,B,C)$ は $(0,0,0),(0,1,1),(1,1,0),(1,0,1)$ の4組で、各確率1/4です。確率は非負・総和1で、対角密度演算子は正半定値・トレース1です。$A$ は一様、$(B,C)$ は4組が一様なので

$$
\rho_A=I_2/2,
\qquad\rho_{BC}=I_4/4,
\qquad\rho_A\otimes\rho_{BC}=I_8/8.
$$

比較する積状態は正定値です。よって

$$
D(\rho_{ABC}\|I_8/8)=4\cdot\tfrac14\log_2\frac{1/4}{1/8}=1.
$$

一方 $A,B$ も独立一様なので $\rho_{AB}=I_4/4=\rho_A\otimes\rho_B$、従って2番目の相対エントロピーは0、差は1です。エントロピーを各縮約の非零固有値から再計算しても

$$
S_{AB}=2,\quad S_{BC}=2,\quad S_B=1,\quad S_{ABC}=2,
\qquad I(A:C|B)=2+2-1-2=1.
$$

これは[条件付き相互情報量の定義](../QINF19/index.md#def-qinf19-cmi)からの値であり、$\operatorname{Tr}_C$ を二状態へ同時に施した場合の[データ処理不等式](#thm-qinf20-dpi)と一致します。
<!-- solution-end -->

<a id="ex-qinf20-c01"></a>
### QINF20-C01 Bell対の情報を二段階で失う

- Level: C

$A,B$ をqubitとし、$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$\rho_{AB}=|\Phi^+\rangle\langle\Phi^+|$、$\sigma_{AB}=I_4/4$ とする。$B$ の計算基底での位相消失チャネルを $\mathcal D_B(\tau)=P_0\tau P_0+P_1\tau P_1$（$P_j=|j\rangle\langle j|$）、$\Psi=\operatorname{id}_A\otimes\mathcal D_B$ とする。

1. 二つの入力が密度演算子で台条件を満たすことを確認し、入力の相対エントロピーを求めよ。
2. $\Psi$ がCPTPであることを確かめ、$\Psi(\rho_{AB})$、$\Psi(\sigma_{AB})$ と出力の相対エントロピーを求めよ。
3. $B$ をさらに部分トレースした二つの出力を求め、相対エントロピーがどう変わるか示せ。
4. 三段階での $I(A:B)$ の値を比較し、各不等号と等号の意味を説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 入力。** $\rho_{AB}$ は規格化されたベクトルのrank 1射影だから正半定値・トレース1で、固有値は $(1,0,0,0)$。$\sigma_{AB}=I_4/4$ の固有値は全て1/4なので正定値・トレース1。従って台包含が成り立ち、

$$
D(\rho_{AB}\|\sigma_{AB})=1\log_2\frac1{1/4}=2.
$$

**2. 局所位相消失。** $K_j=I_A\otimes P_j$（$j=0,1$）は $K_0^\dagger K_0+K_1^\dagger K_1=I_A\otimes(P_0+P_1)=I_4$ を満たすので、[Kraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\Psi$ はCPTP。Bell射影を展開すると

$$
\rho_{AB}=\tfrac12(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|).
$$

交差項は $B$ の左右で $P_0|0\rangle\langle1|P_0=P_1|0\rangle\langle1|P_1=0$ となって消えます。従って

$$
\Psi(\rho_{AB})=\tfrac12(|00\rangle\langle00|+|11\rangle\langle11|),
\qquad\Psi(\sigma_{AB})=I_4/4.
$$

出力の非零固有値は $1/2$ が二つで、相対エントロピーは $2\cdot\frac12\log_2[(1/2)/(1/4)]=1$。よって最初の減少は $2>1$ です。

**3. $B$ を捨てる。** [部分トレース](../QINF3/index.md#def-qinf3-partial-trace)より

$$
\operatorname{Tr}_B\Psi(\rho_{AB})=\tfrac12(|0\rangle\langle0|+|1\rangle\langle1|)=I_2/2,
\qquad\operatorname{Tr}_B\Psi(\sigma_{AB})=I_2/2.
$$

従って最後の相対エントロピーは0、二番目の減少も $1>0$ です。各段階で比較対象は正定値なので無限大の曖昧さはありません。

**4. 相互情報量との照合。** 最初はBell純粋状態で、周辺状態はどちらも最大混合です。そのため

$$
\rho_A=\rho_B=I_2/2,\qquad
S_A=S_B=1,\qquad S_{AB}=0,\qquad I(A:B)=2.
$$

位相消失後は同じ周辺状態を持つ古典相関状態で、全体のエントロピーが $S_{AB}=1$ となるため $I(A:B)=1$。さらに $B$ を捨てた後は $A$ 以外の系がないので、相互情報量は0です。

各段階の比較対象は最初の二段階で $\rho_A\otimes\rho_B=I_4/4$、最後は $\rho_A=I_2/2$ なので、相対エントロピーの列 $2>1>0$ と一致します。前半では非対角の量子コヒーレンス、後半では古典ラベルそのものを失うという違いがあります。$\square$
<!-- solution-end -->

## 9. まとめと次の問い

- [量子相対エントロピー](#def-qinf20-relative-entropy)は二つの状態の順序を区別し、台が含まれないときは $+\infty$。可換でない状態の対角成分だけからは計算できません。
- [QINF18の対数比較](../QINF18/index.md#lem-qinf18-log)が非負性と等号、[QINF19の行列比較](../QINF19/index.md#lem-qinf19-partial-trace-log)が部分トレースでの核心不等式を担います。本章で零固有値の極限を補い、[Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)から一般の[データ処理不等式](#thm-qinf20-dpi)へ進みました。
- [量子相互情報量](#cor-qinf20-mutual-dpi)は局所操作で増えず、部分トレースへの適用が[強劣加法性](../QINF19/index.md#thm-qinf19-ssa)に一致します。次のQINF21では測定結果にどれだけ古典情報を取り出せるかを調べます。
