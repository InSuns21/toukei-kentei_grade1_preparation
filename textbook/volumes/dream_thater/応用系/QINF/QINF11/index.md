# QINF11 トレース距離・忠実度

## 1. 状態が「近い」とは、何が似ていることか

[QINF10のHelstrom界](../QINF10/index.md#thm-qinf10-helstrom)では、二つの準備を一回の測定で区別する最小誤りが、二つの密度行列の差の[有限次元トレースノルム](../QINF10/index.md#def-qinf10-trace-norm)で決まりました。この差が小さければ、測定を工夫しても準備を見分けにくいことになります。一方、状態が共通の純粋状態にどれほどよく重なるかは、異なる量で測れます。

- 一つ目の尺度は、あらゆる測定で観測できる確率差の最大値を捉えます。
- **忠実度**は、同じ系を大きな純粋系の一部分と見たとき、二つの精製をどれだけ重ねられるかを捉えます。

以下、すべてのHilbert空間は正の有限次元を持つ複素Hilbert空間とします。$\rho,\sigma$ は同じ $H$ 上の[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)（自己共役、非負、トレース1）、$I_H$ は単位作用素、$\dagger$ は随伴です。作用素の非負平方根はスペクトル分解で作り、$\|X\|_1=\operatorname{Tr}\sqrt{X^\dagger X}$ は[有限次元トレースノルム](../QINF10/index.md#def-qinf10-trace-norm)です。

## 2. トレース距離：測定で見える最大の差

等事前確率の二状態識別で現れる差のノルムを、確率の大きさ $0$ から $1$ に正規化します。密度演算子の差はトレース0の自己共役行列なので、その正固有値の和と負固有値の絶対値の和は一致します。この事実が係数 $1/2$ の理由です。

<a id="def-qinf11-trace-distance"></a>

<!-- formal-statement-start -->
> **定義（トレース距離）**
> 同じ有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho,\sigma$ に対し、**トレース距離**を

$$
T(\rho,\sigma)=\frac12\|\rho-\sigma\|_1
$$

> と定める。ここで $\|\cdot\|_1$ は[有限次元トレースノルム](../QINF10/index.md#def-qinf10-trace-norm)であり、$0\le T(\rho,\sigma)\le1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf11-trace-distance -->
### 定義の確認：直交・同一・非直交

**定義の確認**として、状態の非負性・正規化を確かめてから、差の固有値を用いて距離を計算します。以下、計算基底 $|0\rangle,|1\rangle$ で行列を表し、$\operatorname{diag}(a,b)$ はこの基底での対角作用素を表す記法です。具体的には

$$
\operatorname{diag}(a,b)=a|0\rangle\langle0|+b|1\rangle\langle1|.
$$

自己共役な差 $A$ を固有基底で表示すると、$\sqrt{A^2}$ の固有値は元の固有値 $\lambda_i$ の絶対値です。したがって[有限次元トレースノルムの定義](../QINF10/index.md#def-qinf10-trace-norm)から

$$
\|A\|_1=\operatorname{Tr}\sqrt{A^2}=\sum_i|\lambda_i|
$$

と計算できます。

計算基底で $\rho=|0\rangle\langle0|$、$\sigma=|1\rangle\langle1|$ とすると、それぞれ非負・トレース1なので状態です。差は $\operatorname{diag}(1,-1)$、その絶対値は $I_2$ で、$T=1$ となります。一方 $\rho=\sigma$ なら差は零で $T=0$ です。

非直交の例として $\rho=|0\rangle\langle0|$、$\sigma=|+\rangle\langle+|$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を取ります。$\langle+|+\rangle=1$ なので、$\sigma$ も非負・トレース1の純粋状態です。この基底で射影 $|+\rangle\langle+|$ の $(i,j)$ 成分は $\langle i|+\rangle\langle+|j\rangle$ となるため、差の行列は

$$
\rho-\sigma=\frac12
\begin{pmatrix}1&-1\\-1&-1\end{pmatrix},
\qquad
(\rho-\sigma)^2=\frac12I_2.
$$

差の固有値は $\pm1/\sqrt2$ です。[有限次元トレースノルム](../QINF10/index.md#def-qinf10-trace-norm)から $T=1/\sqrt2$ と分かります。平方を計算したのは、自己共役行列の固有値の絶対値が $\sqrt{(\rho-\sigma)^2}$ の固有値に等しいためです。
<!-- definition-example-end -->

距離が大きいほど測定結果を区別できる、という直観を厳密にします。効果作用素とは、[POVMの定義](../QINF5/index.md#def-qinf5-povm)に現れる $0\le E\le I_H$ の作用素です。二値測定 $(E,I-E)$ の「結果0」が起こる確率は $\operatorname{Tr}(E\rho)$ です。

<a id="thm-qinf11-operational-distance"></a>

<!-- formal-statement-start -->
> **定理（トレース距離の測定特徴づけ）**
> 有限次元複素Hilbert空間 $H$ 上の任意の密度演算子 $\rho,\sigma$ に対し、

$$
T(\rho,\sigma)
=\max_{0\le E\le I_H}
\left|\operatorname{Tr}\{E(\rho-\sigma)\}\right|.
$$

> 最大値は $\rho-\sigma$ の正固有空間への射影で実現できる。したがって、等事前確率の二状態識別での最小平均誤り確率は

$$
P_{\mathrm e}^{*}=\frac{1-T(\rho,\sigma)}2
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

差 $A=\rho-\sigma$ は自己共役・トレース0です。[正部分の変分原理](../QINF10/index.md#lem-qinf10-variational)を適用し、$\operatorname{Tr}A_+=\operatorname{Tr}A_-=\|A\|_1/2$ を使います。誤り式は[Helstrom界](../QINF10/index.md#thm-qinf10-helstrom)の等事前確率の場合です。

<!-- proof-start -->
### 証明

$A=\rho-\sigma$ と置き、その正・負部分を $A_+,A_-$ とします。状態は両方トレース1なので

$$
\operatorname{Tr}A=0
=\operatorname{Tr}A_+-\operatorname{Tr}A_-,
\qquad
\|A\|_1=\operatorname{Tr}A_++\operatorname{Tr}A_-.
$$

よって両部分のトレースは $\|A\|_1/2$ に等しい。[正部分の変分原理](../QINF10/index.md#lem-qinf10-variational)は $\max_{0\le E\le I}\operatorname{Tr}(EA)=\operatorname{Tr}A_+$ を与えます。$-A$ に同じ原理を適用すれば

$$
\max_{0\le E\le I}-\operatorname{Tr}(EA)
=\operatorname{Tr}A_-=\frac12\|A\|_1.
$$

従って絶対値の最大も $T$ です。$A$ の正固有空間への射影は許された効果作用素で、等号を実現します。等事前確率 $(1/2,1/2)$ を[Helstrom界](../QINF10/index.md#thm-qinf10-helstrom)の $\Delta=(\rho-\sigma)/2$ に代入すると

$$
P_{\mathrm e}^{*}
=\frac12\left(1-\left\|\frac{\rho-\sigma}{2}\right\|_1\right)
=\frac{1-T(\rho,\sigma)}2
$$

です。$\square$
<!-- proof-end -->

この定理から $0\le T\le1$ が確認できます。任意の効果作用素について二つの確率はともに $[0,1]$ にあり、その差の絶対値は1以下です。また $T=0$ なら $\|\rho-\sigma\|_1=0$、すなわち $\rho=\sigma$。対称性は差の符号を変えてもノルムが同じことによります。三角不等式は、任意の効果作用素 $E$ について

$$
\operatorname{Tr}E(\rho-\tau)
=\operatorname{Tr}E(\rho-\sigma)+\operatorname{Tr}E(\sigma-\tau)
\le T(\rho,\sigma)+T(\sigma,\tau)
$$

とし、[測定特徴づけ](#thm-qinf11-operational-distance)で左辺の最大を取れば得られます。したがって $T$ は状態集合上の距離です。

次に、雑音の前後でこの最大確率差が増えるかを調べます。[量子チャネル](../QINF7/index.md#def-qinf7-channel)は完全正でトレース保存の線形写像です。出力側の測定は、入力側の測定として引き戻せることが鍵です。

<a id="thm-qinf11-trace-contractivity"></a>

<!-- formal-statement-start -->
> **定理（トレース距離のデータ処理不等式）**
> 有限次元複素Hilbert空間 $H_A,H_B$ 間の量子チャネル $\Phi:L(H_A)\to L(H_B)$ と入力状態 $\rho,\sigma$ に対し、

$$
T(\Phi(\rho),\Phi(\sigma))\le T(\rho,\sigma).
$$

> すなわち、同じ物理的操作によって二状態の最適識別可能性は高くならない。
<!-- formal-statement-end -->

### 証明の見取り図

出力効果作用素 $F$ を[チャネルの双対作用](../QINF7/index.md#prop-qinf7-adjoint)で入力 $E=\Phi^*(F)$ へ引き戻します。$\Phi^*$ の正値性と単位作用素の保存により $0\le E\le I_A$ です。

<!-- proof-start -->
### 証明

任意の $0\le F\le I_B$ を取ります。チャネルの[Kraus表示と完全性](../QINF7/index.md#thm-qinf7-kraus-cptp)を $\Phi(X)=\sum_kK_kXK_k^\dagger$、$\sum_kK_k^\dagger K_k=I_A$ と書けば、双対写像は

$$
E=\Phi^*(F)=\sum_kK_k^\dagger F K_k.
$$

任意の $v\in H_A$ に対し $\langle v|E|v\rangle=\sum_k\langle K_kv|F|K_kv\rangle\ge0$。また

$$
I_A-E=\sum_kK_k^\dagger(I_B-F)K_k\ge0
$$

なので $0\le E\le I_A$。トレースの巡回性と[測定特徴づけ](#thm-qinf11-operational-distance)により

$$
\begin{aligned}
|\operatorname{Tr}F(\Phi(\rho)-\Phi(\sigma))|
&=|\operatorname{Tr}\Phi^*(F)(\rho-\sigma)|\\
&=|\operatorname{Tr}E(\rho-\sigma)|\\
&\le T(\rho,\sigma).
\end{aligned}
$$

左辺を出力の全効果作用素 $F$ にわたって最大化すると所望の不等式です。$\square$
<!-- proof-end -->

## 3. 忠実度：同じ純粋な準備にどこまで重ねられるか

トレース距離が「区別しやすさ」を測るのに対し、忠実度は「重なり」を測ります。純粋状態 $|\psi\rangle,|\phi\rangle$ なら絶対内積 $|\langle\psi|\phi\rangle|$ が自然ですが、混合状態には一つの状態ベクトルがありません。そこで密度演算子の**非負平方根**を使います。

<a id="def-qinf11-fidelity"></a>

<!-- formal-statement-start -->
> **定義（平方根忠実度と二乗忠実度）**
> 同じ有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho,\sigma$ に対し、**平方根忠実度**を

$$
f(\rho,\sigma)
=\operatorname{Tr}\sqrt{\sqrt{\rho}\,\sigma\sqrt{\rho}}
=\|\sqrt{\rho}\sqrt{\sigma}\|_1
$$

> と定める。**二乗忠実度**は $F(\rho,\sigma)=f(\rho,\sigma)^2$ とする。この章では記号 $f$ を平方根版、$F$ を二乗版に固定する。
<!-- formal-statement-end -->

二つの式が等しい理由を確認します。$X=\sqrt{\sigma}\sqrt{\rho}$ と置くと $X^\dagger X=\sqrt{\rho}\sigma\sqrt{\rho}$ です。[有限次元トレースノルム](../QINF10/index.md#def-qinf10-trace-norm)の定義から $f=\|X\|_1$。$X$ と $X^\dagger$ は同じ特異値を持つため、$\|X\|_1=\|\sqrt{\rho}\sqrt{\sigma}\|_1$ です。行列積 $\sqrt{\rho}\sqrt{\sigma}$ が自己共役とは限らず、単純な $\operatorname{Tr}(\sqrt{\rho}\sqrt{\sigma})$ で置き換えてはいけません。

<!-- definition-example-start: def-qinf11-fidelity -->
### 定義の確認：純粋な入力と混合した比較対象

**定義の確認**では、純粋射影の非負平方根から始め、混合状態に対する $f$ と $F$ の計算が定義そのものと一致することを示します。

$\rho=|\psi\rangle\langle\psi|$ が純粋で $|\psi\rangle$ が単位ベクトルなら、$\rho^2=\rho$ なので $\sqrt{\rho}=\rho$ です。$\sigma$ が任意の密度演算子のとき

$$
\sqrt{\rho}\sigma\sqrt{\rho}
=\langle\psi|\sigma|\psi\rangle\,|\psi\rangle\langle\psi|.
$$

係数 $a=\langle\psi|\sigma|\psi\rangle$ は非負で、$0\le a\le1$（密度演算子の固有値は非負で和1）。この作用素の非負平方根は $\sqrt a\,|\psi\rangle\langle\psi|$ で、トレースは $\sqrt a$。従って

$$
f(|\psi\rangle\langle\psi|,\sigma)
=\sqrt{\langle\psi|\sigma|\psi\rangle},
\qquad F=\langle\psi|\sigma|\psi\rangle.
$$

$\sigma=|\phi\rangle\langle\phi|$ も純粋なら $f=|\langle\psi|\phi\rangle|$、$F=|\langle\psi|\phi\rangle|^2$ です。例えば $|0\rangle$ と $|+\rangle$ は $f=1/\sqrt2$、$F=1/2$。$F$ と $f$ の数値を混同すると後の上下界が壊れます。
<!-- definition-example-end -->

## 4. 精製による最適重なり

[精製](../QINF4/index.md#def-qinf4-purification)は状態 $\rho$ を $H\otimes H_R$ の単位ベクトルとして表し、$R$ の部分トレースで $\rho$ を再現する方法でした。同じ状態の精製は補助系の[等長写像の自由度](../QINF4/index.md#thm-qinf4-isometric-freedom)で結ばれます。この自由度を、異なる状態の二つの精製を最大限重ねるために使います。

まず行列の特異値から「ユニタリを掛けてトレースを最大化する」補題を確かめます。

<a id="lem-qinf11-unitary-optimization"></a>

<!-- formal-statement-start -->
> **補題（ユニタリ最適化とトレースノルム）**
> 正の整数 $d$ に対して、$d\times d$ 複素行列 $X$ には

$$
\max_{U^\dagger U=UU^\dagger=I_d}|\operatorname{Tr}(XU)|=\|X\|_1
$$

> が成り立つ。最大はユニタリ行列 $U$ で実現される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[複素特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)を $X=\sum_{j=1}^d s_j|u_j\rangle\langle v_j|$（$s_j\ge0$、両側の基底は正規直交）と書きます。任意のユニタリ $U$ について

$$
|\operatorname{Tr}(XU)|
=\left|\sum_j s_j\langle v_j|Uu_j\rangle\right|
\le\sum_j s_j|\langle v_j|Uu_j\rangle|
\le\sum_j s_j=\|X\|_1.
$$

最後はCauchy–Schwarz不等式と $\|Uu_j\|=\|v_j\|=1$ によります。$Uu_j=v_j$ となるユニタリを二つの正規直交基底間で定めると、すべての内積が1となり上界を実現します。零特異値に対応する基底も延長してよいので、$X$ が非可逆でも成立します。$\square$
<!-- proof-end -->

<a id="thm-qinf11-uhlmann"></a>

<!-- formal-statement-start -->
> **定理（Uhlmannの精製忠実度定理）**
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho,\sigma$ と、$\dim H_R\ge\dim H$ の補助系を取る。それぞれの精製 $|\Psi_\rho\rangle,|\Psi_\sigma\rangle\in H\otimes H_R$ の組を動かすと、

$$
f(\rho,\sigma)
=\max_{\Psi_\rho,\Psi_\sigma}
|\langle\Psi_\rho|\Psi_\sigma\rangle|.
$$

> 一方の精製を固定して他方だけを動かしても同じ最大値を得る。最大値は有限次元で達成される。
<!-- formal-statement-end -->

### 証明の見取り図

正規直交基底 $|i\rangle$ を一つ固定し、$|\Omega\rangle=\sum_i|i\rangle\otimes|i\rangle$ を用いて正準精製を作ります。補助系のユニタリ自由度を使うと重なりは行列のトレースになり、[ユニタリ最適化補題](#lem-qinf11-unitary-optimization)で忠実度が現れます。

<!-- proof-start -->
### 証明

$d=\dim H$ とし、まず $H_R\cong\mathbb C^d$ を選びます。$H$ と $H_R$ に添字 $1\le i\le d$ を対応させた正規直交基底 $|i\rangle$ と $|i\rangle_R$ を取り、$|\Omega\rangle=\sum_{i=1}^d|i\rangle\otimes|i\rangle_R$ と置きます。このベクトル自体はノルム $\sqrt d$ の非規格化ベクトルですが、

$$
|\Psi_\rho\rangle=(\sqrt\rho\otimes I_R)|\Omega\rangle,
\quad
|\Psi_\sigma\rangle=(\sqrt\sigma\otimes I_R)|\Omega\rangle
$$

は正規化されています。実際、$\|\Psi_\rho\|^2=\operatorname{Tr}\rho=1$ であり、補助系を基底で部分トレースすると

$$
\operatorname{Tr}_R|\Psi_\rho\rangle\langle\Psi_\rho|
=\sum_i\sqrt\rho|i\rangle\langle i|\sqrt\rho=\rho
$$

です。$\sigma$ についても同じ計算で精製の条件を満たします。[同一縮約を持つ精製の等長写像による関係](../QINF4/index.md#thm-qinf4-isometric-freedom)を同じ次元 $d$ の補助系に適用すると、$\sigma$ の任意の精製は $(I\otimes U)|\Psi_\sigma\rangle$ と書けます。$\rho$ の精製も補助系のユニタリで正準精製に移せるので、一方を固定してよいわけです。

補助系側の基底で $U_{ij}={}_R\langle i|U|j\rangle_R$ と書き、$U^{\mathsf T}$ をこの行列表現の転置と定めます。行列成分で内積を展開すると

$$
\begin{aligned}
\langle\Psi_\rho|(I\otimes U)|\Psi_\sigma\rangle
&=\sum_{i,j}\langle i|\sqrt\rho\sqrt\sigma|j\rangle\,\langle i|U|j\rangle\\
&=\operatorname{Tr}(\sqrt\rho\sqrt\sigma\,U^{\mathsf T}).
\end{aligned}
$$

転置した $U^{\mathsf T}$ もユニタリです。$U$ を全ユニタリにわたって動かせば $U^{\mathsf T}$ も全ユニタリを動きます。[補題](#lem-qinf11-unitary-optimization)から最大絶対値は $\|\sqrt\rho\sqrt\sigma\|_1=f(\rho,\sigma)$ です。

$\dim H_R>d$ の場合は正準精製をそれぞれ等長写像 $J_\rho,J_\sigma:\mathbb C^d\to H_R$ によって埋め込みます。[同一縮約を持つ精製の等長写像による関係](../QINF4/index.md#thm-qinf4-isometric-freedom)により、任意の精製はこの形に書けます。二つの重なりは上式の $U$ を $C=J_\rho^\dagger J_\sigma$ に置き換えたものです。等長性から $\|C\|_\infty\le1$ であり、[補題の特異値分解](#lem-qinf11-unitary-optimization)と同じ計算で

$$
|\operatorname{Tr}(\sqrt\rho\sqrt\sigma\,C^{\mathsf T})|
\le\sum_j s_j\|C\|_\infty
\le f(\rho,\sigma).
$$

逆に、最適なユニタリ $U$ を小さい補助系上で実現し、その両精製を同じ等長写像で $H_R$ へ埋め込めば等号です。従って補助系を拡大しても最大値は変わりません。$\square$
<!-- proof-end -->

この定理により $0\le f\le1$（単位ベクトルの内積の絶対値の範囲）、さらに $f(\rho,\rho)=1$ です。交換 $\rho\leftrightarrow\sigma$ で内積の絶対値は変わらず、$f$ は対称です。$f=1$ の場合は、重なりが1の二単位ベクトルは位相以外同じなので、部分トレースも一致して $\rho=\sigma$ です。$f=0$ はすべての精製の内積が0となることを意味します。

## 5. 雑音で忠実度は減少しない

一方の指標 $T$ はチャネルの下で小さくなりました。忠実度は「似ているほど大きい」ため、逆向きに変化します。

<a id="thm-qinf11-fidelity-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（忠実度のデータ処理不等式）**
> 有限次元量子チャネル $\Phi:L(H_A)\to L(H_B)$ と密度演算子 $\rho,\sigma$ に対して、

$$
f(\Phi(\rho),\Phi(\sigma))\ge f(\rho,\sigma),
\qquad
F(\Phi(\rho),\Phi(\sigma))\ge F(\rho,\sigma).
$$

> すなわち共通の量子操作は、最適化した精製の重なりを減らさない。
<!-- formal-statement-end -->

### 証明の見取り図

[有限次元Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)の等長写像を、[Uhlmann定理](#thm-qinf11-uhlmann)で最適化した二つの精製の入力系に施します。等長性が内積を保つ一方、出力で精製を再最適化する余地があります。

<!-- proof-start -->
### 証明

[Uhlmann定理](#thm-qinf11-uhlmann)で $|\Psi_\rho\rangle,|\Psi_\sigma\rangle\in H_A\otimes H_R$ を選び、位相を合わせて内積を $f(\rho,\sigma)$ とします。[Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)から、$\Phi(X)=\operatorname{Tr}_E(VXV^\dagger)$ を満たす等長写像 $V:H_A\to H_B\otimes H_E$ が取れます。

$$
|\widehat\Psi_\rho\rangle=(V\otimes I_R)|\Psi_\rho\rangle,
\qquad
|\widehat\Psi_\sigma\rangle=(V\otimes I_R)|\Psi_\sigma\rangle
$$

は、補助系 $E\otimes R$ を捨てれば $\Phi(\rho),\Phi(\sigma)$ となる精製です。$V^\dagger V=I_A$ より

$$
\langle\widehat\Psi_\rho|\widehat\Psi_\sigma\rangle
=\langle\Psi_\rho|(V^\dagger V\otimes I_R)|\Psi_\sigma\rangle
=f(\rho,\sigma).
$$

出力状態の精製の中には、この組が少なくとも一組あります。[Uhlmannの最大化](#thm-qinf11-uhlmann)はその組以上の重なりを与えるので $f(\Phi\rho,\Phi\sigma)\ge f(\rho,\sigma)$ です。両辺非負だから二乗して $F$ の不等式も従います。$\square$
<!-- proof-end -->

## 6. 二つの指標を同じ尺度で比較する

忠実度 $f$ は1が「同じ」、トレース距離 $T$ は0が「同じ」です。片方を知ればもう片方をどこまで縛れるでしょうか。証明のため、まず可換な状態と純粋状態の計算をまとめます。

<a id="prop-qinf11-commuting"></a>

<!-- formal-statement-start -->
> **命題（可換状態の距離と忠実度）**
> 同じ有限次元複素Hilbert空間上の可換な密度演算子 $\rho,\sigma$ が共通正規直交基底で $\rho=\operatorname{diag}(p_1,\ldots,p_d)$、$\sigma=\operatorname{diag}(q_1,\ldots,q_d)$ と表されるとする。$p_i,q_i\ge0$、各列の総和は1であり、

$$
T(\rho,\sigma)=\frac12\sum_i|p_i-q_i|,
\qquad
f(\rho,\sigma)=\sum_i\sqrt{p_iq_i}.
$$

> 特に $p_i,q_i$ はその基底で測った古典確率分布である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

同時対角化の理由を確かめます。$\rho v=\lambda v$ を満たす $v$ に対し、可換性から

$$
\rho(\sigma v)=\sigma(\rho v)=\lambda\sigma v
$$

なので、$\rho$ の各固有空間は $\sigma$ で保たれます。$\sigma$ はその各固有空間への制限でも自己共役です。[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)で各固有空間内に正規直交固有基底を選び、合わせれば共通固有基底が得られます。

この基底では $\rho-\sigma=\operatorname{diag}(p_i-q_i)$ です。[有限次元トレースノルム](../QINF10/index.md#def-qinf10-trace-norm)の定義を固有値 $p_i-q_i$ に適用すると

$$
T(\rho,\sigma)=\frac12\|\rho-\sigma\|_1
=\frac12\sum_i|p_i-q_i|.
$$

一方、同じ基底で非負平方根を取ると

$$
\sqrt\rho=\operatorname{diag}(\sqrt{p_i}),
\qquad \sqrt\rho\,\sigma\sqrt\rho=\operatorname{diag}(p_iq_i).
$$

右辺の対角成分はすべて非負です。さらに平方根を取ってトレースを求めれば

$$
f(\rho,\sigma)=\operatorname{Tr}\operatorname{diag}(\sqrt{p_iq_i})
=\sum_i\sqrt{p_iq_i}.
$$

これで二つの式が得られました。$\square$
<!-- proof-end -->

### 直接例：二値分布では距離は単なる確率差

$\rho=\operatorname{diag}(3/4,1/4)$ と $\sigma=\operatorname{diag}(1/4,3/4)$ はそれぞれ非負・トレース1で可換です。測定基底を固定すると二つの古典確率分布が $(3/4,1/4)$ と $(1/4,3/4)$ になります。

$$
T=\tfrac12(|3/4-1/4|+|1/4-3/4|)=\frac12,
\qquad
f=2\sqrt{\frac3{16}}=\frac{\sqrt3}{2},
\quad F=\frac34.
$$

ここで二値測定の「結果0」の確率差は $|3/4-1/4|=1/2$。これが[測定特徴づけ](#thm-qinf11-operational-distance)の最大値です。

<a id="prop-qinf11-pure-distance"></a>

<!-- formal-statement-start -->
> **命題（純粋状態のトレース距離）**
> 有限次元複素Hilbert空間の単位ベクトル $|\psi\rangle,|\phi\rangle$ に対して、

$$
T(|\psi\rangle\langle\psi|,|\phi\rangle\langle\phi|)
=\sqrt{1-|\langle\psi|\phi\rangle|^2}.
$$

<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$c=|\langle\psi|\phi\rangle|\in[0,1]$ とします。位相を取り直し、$c<1$ なら正規直交ベクトル $|\psi\rangle,|e\rangle$ を用いて $|\phi\rangle=c|\psi\rangle+s|e\rangle$、$s=\sqrt{1-c^2}$ と書けます。この二次元部分空間で差は

$$
A=|\psi\rangle\langle\psi|-|\phi\rangle\langle\phi|
=\begin{pmatrix}s^2&-cs\\-cs&-s^2\end{pmatrix},
\qquad A^2=s^2I_2.
$$

外側では $A=0$。二次元部分のトレースは0、固有値は $\pm s$ なので $\|A\|_1=2s$、従って $T=s$。$c=1$ なら二つの射影は同じで $T=0$ です。$\square$
<!-- proof-end -->

一般の状態について下側の不等式を示すときは、忠実度の値を**実際の測定確率**として再現する補題が便利です。量子状態の測定で古典分布へ変換する写像は、[Kraus表示](../QINF7/index.md#thm-qinf7-kraus-cptp)を持つ量子チャネルです。

<a id="lem-qinf11-fidelity-measurement"></a>

<!-- formal-statement-start -->
> **補題（忠実度を実現する測定）**
> 有限次元複素Hilbert空間上の密度演算子 $\rho>0$（全固有値が正）と任意の密度演算子 $\sigma$ に対し、ある正規直交基底の射影測定で得られる確率 $p_i,q_i$ は

$$
\sum_i\sqrt{p_iq_i}=f(\rho,\sigma)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$\rho$ の逆平方根が存在するので、正値行列 $M$ を $\sigma=M\rho M$ となるように構成します。$M$ の固有基底で測れば二つの結果確率が固有値の二乗で結ばれます。

<!-- proof-start -->
### 証明

$A=\sqrt{\sqrt\rho\,\sigma\sqrt\rho}\ge0$、$M=\rho^{-1/2}A\rho^{-1/2}\ge0$ と置きます。$\rho$ が可逆なので

$$
M\rho M
=\rho^{-1/2}A^2\rho^{-1/2}
=\rho^{-1/2}\sqrt\rho\,\sigma\sqrt\rho\,\rho^{-1/2}
=\sigma.
$$

$M=\sum_i m_i|i\rangle\langle i|$（$m_i\ge0$）という正規直交固有基底で測ります。$p_i=\langle i|\rho|i\rangle$、$q_i=\langle i|\sigma|i\rangle$ とすると、上の積の関係から $q_i=m_i^2p_i$ です。従って

$$
\sum_i\sqrt{p_iq_i}
=\sum_i m_i p_i
=\operatorname{Tr}(M\rho)
=\operatorname{Tr}A
=f(\rho,\sigma).
$$

最後から二番目の等号は $\operatorname{Tr}(\rho^{-1/2}A\rho^{1/2})=\operatorname{Tr}A$ というトレースの巡回性です。$p_i,q_i$ は非負で和1なので、求める測定確率です。$\square$
<!-- proof-end -->

<a id="thm-qinf11-fvdg"></a>

<!-- formal-statement-start -->
> **定理（Fuchs–van de Graaf不等式）**
> 同じ有限次元複素Hilbert空間上の任意の密度演算子 $\rho,\sigma$ に対し、

$$
1-f(\rho,\sigma)
\le T(\rho,\sigma)
\le\sqrt{1-f(\rho,\sigma)^2}.
$$

> 二乗忠実度 $F=f^2$ を使う場合は

$$
1-\sqrt{F(\rho,\sigma)}
\le T(\rho,\sigma)
\le\sqrt{1-F(\rho,\sigma)}
$$

> と書く。一般に両不等式が同時に等号となる必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

上界は[Uhlmann定理](#thm-qinf11-uhlmann)で重なり最大の二精製を選び、その[純粋状態の距離公式](#prop-qinf11-pure-distance)と[部分トレースの縮小性](#thm-qinf11-trace-contractivity)を使います。下界は[忠実度を実現する測定](#lem-qinf11-fidelity-measurement)で古典確率分布へ下ろして証明し、非可逆状態へ連続性で延長します。

<!-- proof-start -->
### 証明

**上界。** [Uhlmann定理](#thm-qinf11-uhlmann)により内積の絶対値が $f(\rho,\sigma)$ に等しい精製 $|\Psi_\rho\rangle,|\Psi_\sigma\rangle$ を選びます。補助系を捨てる写像は[部分トレースという量子チャネル](../QINF7/index.md#thm-qinf7-kraus-cptp)なので、[トレース距離の縮小性](#thm-qinf11-trace-contractivity)から

$$
\begin{aligned}
T(\rho,\sigma)
&\le T(|\Psi_\rho\rangle\langle\Psi_\rho|,
|\Psi_\sigma\rangle\langle\Psi_\sigma|)\\
&=\sqrt{1-|\langle\Psi_\rho|\Psi_\sigma\rangle|^2}
=\sqrt{1-f(\rho,\sigma)^2}.
\end{aligned}
$$

二段目の等号は[純粋状態のトレース距離](#prop-qinf11-pure-distance)の命題によります。

**下界（$\rho>0$）。** [測定補題](#lem-qinf11-fidelity-measurement)で $f(\rho,\sigma)=\sum_i\sqrt{p_iq_i}$ となる射影測定を取ります。$a,b\ge0$ なら $\sqrt{ab}\ge\min(a,b)$ なので

$$
\begin{aligned}
1-f(\rho,\sigma)
&\le1-\sum_i\min(p_i,q_i)\\
&=\frac12\sum_i|p_i-q_i|\\
&=T(\operatorname{diag}p,\operatorname{diag}q)
\le T(\rho,\sigma).
\end{aligned}
$$

中間の等式は $\min(a,b)=(a+b-|a-b|)/2$ と $\sum_i p_i=\sum_iq_i=1$ によります。最後は[可換状態の公式](#prop-qinf11-commuting)と[測定チャネル下の縮小性](#thm-qinf11-trace-contractivity)です。

**下界（一般の $\rho$）。** $\rho_\varepsilon=(1-\varepsilon)\rho+\varepsilon I_H/d$（$d=\dim H$、$0<\varepsilon<1$）と置けば $\rho_\varepsilon>0$ でトレース1です。したがって既に証明した不等式

$$
1-f(\rho_\varepsilon,\sigma)\le T(\rho_\varepsilon,\sigma)
$$

が成り立ちます。$\varepsilon\to0$ のとき $\rho_\varepsilon\to\rho$。有限次元で行列の非負平方根と $\|\cdot\|_1$ は連続なので、[平方根忠実度](#def-qinf11-fidelity)と[トレース距離](#def-qinf11-trace-distance)の両辺を極限に移せます。これで特異な $\rho$ も含めて成立します。$\square$
<!-- proof-end -->

この不等式は境界で鋭くなります。同一状態なら $(T,f)=(0,1)$、直交する純粋状態なら $(1,0)$。非直交な純粋状態では[純粋状態のトレース距離](#prop-qinf11-pure-distance)から上界が等号です。一方、可換な混合状態では量子と古典の式を直接比べられます。

## 7. 具体的な雑音と解釈

同じ量子チャネルを双方へ施すと、[距離は増加せず](#thm-qinf11-trace-contractivity)、[忠実度は減少しません](#thm-qinf11-fidelity-monotonicity)。これは両方を同じ方向に動かすという意味ではありません。たとえば恒等チャネルやユニタリ共役では両者とも等号、完全リセット $\Phi(X)=\operatorname{Tr}(X)|0\rangle\langle0|$ では任意の二入力が同じ出力になり、$T=0,f=1$ です。

振幅減衰の例は演習Cで系統的に扱います。[Kraus表示の条件](../QINF7/index.md#thm-qinf7-kraus-cptp)でチャネル性を確かめ、出力状態を具体的に計算してから指標の変化を評価します。単調性の定理だけでは、**どの程度**情報を失うかまでは教えてくれません。

## 8. 演習：定義の計算から雑音模型の統合へ

以下の問題で特記しない場合は $H=\mathbb C^2$、計算基底は $|0\rangle,|1\rangle$ とし、$\operatorname{diag}(a,b)$ はこの基底での対角行列とします。平方根忠実度は $f$、二乗忠実度は $F=f^2$ です。

<a id="ex-qinf11-a01"></a>
### QINF11-A01 可換状態の距離を測定で確認する

- Level: A

$\rho=\operatorname{diag}(4/5,1/5)$、$\sigma=\operatorname{diag}(1/5,4/5)$ に対し、$T,f,F$ を求めよ。二結果POVMを一つ挙げ、実際に確率差 $T$ を実現することも示せ。

<!-- solution-start -->
### 詳細解答

各行列は対角成分が非負で和1だから密度演算子です。[可換状態の公式](#prop-qinf11-commuting)に $p=(4/5,1/5)$、$q=(1/5,4/5)$ を代入すると

$$
T=\frac12\left(\left|\frac45-\frac15\right|+
\left|\frac15-\frac45\right|\right)=\frac35,
$$

$$
f=\sqrt{\frac45\cdot\frac15}+\sqrt{\frac15\cdot\frac45}
=\frac45,\qquad F=\frac{16}{25}.
$$

$E=|0\rangle\langle0|$、$I-E=|1\rangle\langle1|$ は互いに直交する非負射影で和 $I_2$ のPOVMです。この測定で「結果0」の確率はそれぞれ $4/5$、$1/5$ なので、差は $3/5$。従って[測定特徴づけ](#thm-qinf11-operational-distance)の最大を実現します。
<!-- solution-end -->

<a id="ex-qinf11-a02"></a>
### QINF11-A02 純粋状態の角度と識別誤り

- Level: A

$0\le\theta\le\pi/2$、$|\psi_\theta\rangle=\cos\theta|0\rangle+\sin\theta|1\rangle$ とする。$\rho=|0\rangle\langle0|$、$\sigma_\theta=|\psi_\theta\rangle\langle\psi_\theta|$ の $T,f,F$ と等事前確率の最小識別誤りを求め、両端で検算せよ。

<!-- solution-start -->
### 詳細解答

$\|\psi_\theta\|^2=\cos^2\theta+\sin^2\theta=1$ なので、$\sigma_\theta$ はrank 1の正射影でトレース1です。内積 $\langle0|\psi_\theta\rangle=\cos\theta\ge0$ だから、[平方根忠実度](#def-qinf11-fidelity)の純粋状態での計算と[純粋状態のトレース距離](#prop-qinf11-pure-distance)から

$$
f=\cos\theta,\quad F=\cos^2\theta,\quad
T=\sqrt{1-\cos^2\theta}=\sin\theta.
$$

[等事前確率のHelstrom式](#thm-qinf11-operational-distance)により

$$
P_{\mathrm e}^{*}=\frac{1-\sin\theta}{2}.
$$

$\theta=0$ では両状態が等しく $(T,f,P_{\mathrm e}^{*})=(0,1,1/2)$、$\theta=\pi/2$ では直交して $(1,0,0)$。いずれも直接測定の挙動と一致します。
<!-- solution-end -->

<a id="ex-qinf11-a03"></a>
### QINF11-A03 純粋対混合の忠実度

- Level: A

$\rho=|0\rangle\langle0|$、$\sigma=\operatorname{diag}(1/4,3/4)$ とする。$f,F,T$ を求め、[Fuchs–van de Graaf界](#thm-qinf11-fvdg)を数値で検査せよ。

<!-- solution-start -->
### 詳細解答

$\sigma$ は非負・トレース1です。[純粋対混合の定義確認](#def-qinf11-fidelity)より

$$
\langle0|\sigma|0\rangle=\frac14,
\quad f=\sqrt{\frac14}=\frac12,
\quad F=\frac14.
$$

$\rho-\sigma=\operatorname{diag}(3/4,-3/4)$ は自己共役で、その固有値の絶対値和は $3/2$。従って $T=(1/2)(3/2)=3/4$ です。不等式の両端は

$$
1-f=\frac12\le\frac34=T
\le\sqrt{1-f^2}=\frac{\sqrt3}{2}.
$$

右側は二乗して $9/16\le3/4$ と確認できます。二乗忠実度 $F=1/4$ をそのまま左端の $f$ へ代入してはいけません。
<!-- solution-end -->

<a id="ex-qinf11-a04"></a>
### QINF11-A04 正準精製の重なりを計算する

- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\operatorname{diag}(1/4,3/4)$ について、基底 $|0\rangle,|1\rangle$ での正準精製を $H\otimes H_R$（$H_R=\mathbb C^2$）に書き、各縮約・正規化を確認せよ。その内積が $f(\rho,\sigma)$ に等しいことも示せ。

<!-- solution-start -->
### 詳細解答

各状態は非負で固有値和1です。[Uhlmann定理の正準構成](#thm-qinf11-uhlmann)で $\sqrt\rho=\operatorname{diag}(\sqrt3/2,1/2)$、$\sqrt\sigma=\operatorname{diag}(1/2,\sqrt3/2)$ を使えば

$$
|\Psi_\rho\rangle=\frac{\sqrt3}{2}|00\rangle+\frac12|11\rangle,
\quad
|\Psi_\sigma\rangle=\frac12|00\rangle+\frac{\sqrt3}{2}|11\rangle.
$$

直交する二項のノルム二乗を足すと各々 $3/4+1/4=1$。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で $R$ の交差項 $|0\rangle\langle1|$ と $|1\rangle\langle0|$ は消えるので、縮約はそれぞれ $\operatorname{diag}(3/4,1/4)$ と $\operatorname{diag}(1/4,3/4)$ です。内積は

$$
\langle\Psi_\rho|\Psi_\sigma\rangle
=\frac{\sqrt3}{2}\frac12+\frac12\frac{\sqrt3}{2}
=\frac{\sqrt3}{2}.
$$

同時対角化から[可換状態の忠実度](#prop-qinf11-commuting)も $\sqrt{3/16}+\sqrt{3/16}=\sqrt3/2$。この例では補助系ユニタリを追加せずに最大重なりを達成しています。
<!-- solution-end -->

<a id="ex-qinf11-b01"></a>
### QINF11-B01 位相緩和で縮小性と等号を区別する

- Level: B

$Z=\operatorname{diag}(1,-1)$、$\mathcal D(X)=(X+ZXZ)/2$ とする。入力 $\rho=|0\rangle\langle0|$、$\sigma=|+\rangle\langle+|$ に対して入力と出力の $T,f$ を求めよ。さらに $|+\rangle\langle+|$ と $|-\rangle\langle-|$ を入力対にした場合と比較せよ。$|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ とする。

<!-- solution-start -->
### 詳細解答

$K_0=I_2/\sqrt2,K_1=Z/\sqrt2$ とすれば $\sum K_i^\dagger K_i=I_2$ なので、[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)により $\mathcal D$ はチャネルです。$Z|0\rangle=|0\rangle$、$Z|+\rangle=|-\rangle$ より

$$
\mathcal D(\rho)=|0\rangle\langle0|,
\quad
\mathcal D(\sigma)=\frac12\bigl(|+\rangle\langle+|+|-\rangle\langle-|\bigr)=I_2/2.
$$

入力の二純粋状態については $f_{\rm in}=|\langle0|+\rangle|=1/\sqrt2$、[純粋状態のトレース距離](#prop-qinf11-pure-distance)から $T_{\rm in}=1/\sqrt2$。出力の差は $\operatorname{diag}(1/2,-1/2)$ で $T_{\rm out}=1/2$。また[平方根忠実度](#def-qinf11-fidelity)の純粋入力での計算より $f_{\rm out}=\sqrt{\langle0|I_2/2|0\rangle}=1/\sqrt2$ です。

つまり距離は厳密に縮みますが、忠実度の単調性は等号です。別の入力対 $|+\rangle,|-\rangle$ は直交するので $T_{\rm in}=1,f_{\rm in}=0$。両方とも $\mathcal D$ で $I_2/2$ に写るため $T_{\rm out}=0,f_{\rm out}=1$。こちらは二つの単調性がともに厳密です。
<!-- solution-end -->

<a id="ex-qinf11-b02"></a>
### QINF11-B02 二つの独立なコピーの忠実度

- Level: B

有限次元の状態 $\rho,\sigma$ および $\tau,\omega$ に対し、平方根忠実度が

$$
f(\rho\otimes\tau,\sigma\otimes\omega)
=f(\rho,\sigma)f(\tau,\omega)
$$

を満たすことを示せ。特に $|0\rangle$ と $|+\rangle$ の二つのコピーで $f,F,T$ を計算し、一つのコピーと比較せよ。

<!-- solution-start -->
### 詳細解答

半正定値行列のスペクトル分解から $\sqrt{\rho\otimes\tau}=\sqrt\rho\otimes\sqrt\tau$ です。実際、$\rho$ と $\tau$ の固有値が $\lambda_i,\mu_j$ ならテンソル積の固有値は $\lambda_i\mu_j\ge0$ で、その非負平方根は $\sqrt{\lambda_i}\sqrt{\mu_j}$。従って[忠実度の定義](#def-qinf11-fidelity)の積は

$$
\sqrt{\rho\otimes\tau}\sqrt{\sigma\otimes\omega}
=(\sqrt\rho\sqrt\sigma)\otimes(\sqrt\tau\sqrt\omega).
$$

左因子 $A=\sqrt\rho\sqrt\sigma$ の特異値を $s_i$、右因子 $B=\sqrt\tau\sqrt\omega$ の特異値を $t_j$ とします。[複素特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)は、左右からユニタリ行列を掛ける次の表示です。

$$
A=U\operatorname{diag}(s_i)V^\dagger,
\qquad B=P\operatorname{diag}(t_j)Q^\dagger.
$$

このとき

$$
A\otimes B=(U\otimes P)\bigl(\operatorname{diag}(s_i)\otimes\operatorname{diag}(t_j)\bigr)(V\otimes Q)^\dagger.
$$

両側のテンソル積もユニタリで、中央は対角成分がすべて $s_it_j\ge0$ の対角行列です。したがってテンソル積の特異値は $s_it_j$ であり、

$$
\|(\sqrt\rho\sqrt\sigma)\otimes(\sqrt\tau\sqrt\omega)\|_1
=\sum_{i,j}s_it_j
=\left(\sum_i s_i\right)\left(\sum_j t_j\right).
$$

各和がそれぞれの $f$ なので乗法公式が示されました。

$|\psi\rangle=|0\rangle$、$|\phi\rangle=|+\rangle$ は $|\langle\psi|\phi\rangle|=1/\sqrt2$ です。二コピーの純粋状態では内積が $(1/\sqrt2)^2=1/2$。従って

$$
f_2=\frac12,\quad F_2=\frac14,\quad
T_2=\sqrt{1-\left(\frac12\right)^2}=\frac{\sqrt3}{2}.
$$

一コピーでは $f_1=1/\sqrt2$、$F_1=1/2$、$T_1=1/\sqrt2$。二コピーで忠実度が減り、距離が増えるのは、**二コピーは一コピーからのチャネル出力ではなく、識別に使える入力資源を追加した状態**だからです。データ処理不等式とは矛盾しません。
<!-- solution-end -->

<a id="ex-qinf11-b03"></a>
### QINF11-B03 可換な鏡像状態で上界の等号を判定する

- Level: B

$0\le p\le1$ とし、$\rho_p=\operatorname{diag}(p,1-p)$、$\sigma_p=\operatorname{diag}(1-p,p)$ を考える。$T,f$ を求め、[Fuchs–van de Graaf不等式](#thm-qinf11-fvdg)の上界が常に等号であることを示せ。下界も等号になる $p$ をすべて求めよ。

<!-- solution-start -->
### 詳細解答

各行列の成分は非負で総和1なので密度演算子です。[可換状態の公式](#prop-qinf11-commuting)から

$$
T=\frac12\bigl(|2p-1|+|1-2p|\bigr)=|2p-1|,
\qquad
f=2\sqrt{p(1-p)}.
$$

$f^2=4p(1-p)$ なので

$$
1-f^2=1-4p+4p^2=(2p-1)^2=T^2,
$$

従って上界 $T\le\sqrt{1-f^2}$ はすべての $p$ で等号です。

下界の等号条件は $|2p-1|=1-2\sqrt{p(1-p)}$。$a=|2p-1|\in[0,1]$ と置けば $2\sqrt{p(1-p)}=\sqrt{1-a^2}$ なので、$a+\sqrt{1-a^2}=1$ が条件です。両項は非負で

$$
(a+\sqrt{1-a^2})^2
=1+2a\sqrt{1-a^2}
$$

より $a\sqrt{1-a^2}=0$、従って $a=0$ または $a=1$。つまり $p=1/2$（同一状態）または $p=0,1$（直交状態）の場合だけ下界も等号です。
<!-- solution-end -->

<a id="ex-qinf11-b04"></a>
### QINF11-B04 忠実度だけで識別誤りをどこまで評価できるか

- Level: B

未知の二状態 $\rho,\sigma$ が等事前確率で与えられ、平方根忠実度 $f(\rho,\sigma)=c$（$0\le c\le1$）だけが分かっているとする。最小識別誤り確率 $P_{\mathrm e}^*$ の上下界を $c$ で表し、$c=3/5$ の場合の値を求めよ。下界を達成する非直交純粋状態の組を一つ構成せよ。

<!-- solution-start -->
### 詳細解答

[Helstromとの対応](#thm-qinf11-operational-distance)から $P_{\mathrm e}^*=(1-T)/2$ です。[Fuchs–van de Graaf界](#thm-qinf11-fvdg)を代入すると

$$
1-c\le T\le\sqrt{1-c^2}
$$

なので、$1-T$ は逆向きに挟まれ、

$$
\frac{1-\sqrt{1-c^2}}2
\le P_{\mathrm e}^*\le\frac c2.
$$

$c=3/5$ なら $\sqrt{1-c^2}=4/5$ で

$$
\frac1{10}\le P_{\mathrm e}^*\le\frac3{10}.
$$

下界を達成する組には $\rho=|0\rangle\langle0|$ と $\sigma=|\phi\rangle\langle\phi|$、

$$
|\phi\rangle=\frac35|0\rangle+\frac45|1\rangle
$$

を取れます。$|\phi\rangle$ はノルム1で、純粋状態の忠実度は $|\langle0|\phi\rangle|=3/5$。さらに[純粋状態の距離](#prop-qinf11-pure-distance)は $4/5$ なので、最小誤りは $(1-4/5)/2=1/10$ と下界に等しくなります。上界側は忠実度だけでは、一般に等号が達成されるかまでは指定できません。
<!-- solution-end -->

<a id="ex-qinf11-c01"></a>
### QINF11-C01 振幅減衰下の識別可能性と重なり

- Level: C

$0\le\gamma\le1$ とする。qubitの振幅減衰チャネル

$$
\mathcal A_\gamma(X)=K_0XK_0^\dagger+K_1XK_1^\dagger,
\quad
K_0=\begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix},
\quad
K_1=\begin{pmatrix}0&\sqrt\gamma\\0&0\end{pmatrix}
$$

を考える。入力 $\rho_0=|0\rangle\langle0|$ と $\rho_1=|+\rangle\langle+|$ が等事前確率で選ばれる。

1. Krausの完全性からチャネル性を検証し、出力状態 $\sigma_0,\sigma_1$ を行列で求めよ。
2. 出力の $T(\sigma_0,\sigma_1)$、$f(\sigma_0,\sigma_1)$、$F(\sigma_0,\sigma_1)$ と最小識別誤りを計算せよ。
3. $\gamma$ に関する単調性、端点 $\gamma=0,1$、$\gamma=1/2$ の数値を検査せよ。
4. 二つの指標が[Fuchs–van de Graaf界](#thm-qinf11-fvdg)を満たすことを全区間で直接示し、上界で等号となる $\gamma$ を求めよ。

<!-- solution-start -->
### 詳細解答

**1. チャネル性と出力。** $K_0^\dagger K_0=\operatorname{diag}(1,1-\gamma)$、$K_1^\dagger K_1=\operatorname{diag}(0,\gamma)$ なので和は $I_2$ です。$\gamma\in[0,1]$ では平方根が実非負で、[Kraus判定](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\mathcal A_\gamma$ は完全正・トレース保存です。

$K_0|0\rangle=|0\rangle$、$K_1|0\rangle=0$ なので $\sigma_0=|0\rangle\langle0|$。一方、$K_0|+\rangle=(|0\rangle+\sqrt{1-\gamma}|1\rangle)/\sqrt2$、$K_1|+\rangle=\sqrt{\gamma/2}|0\rangle$ です。二つの外積を足すと

$$
\sigma_1=\frac12
\begin{pmatrix}1+\gamma&\sqrt{1-\gamma}\\
\sqrt{1-\gamma}&1-\gamma\end{pmatrix},
\quad
\sigma_0=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

$\sigma_1$ は二つの外積の和だから非負、トレースは $(1+\gamma+1-\gamma)/2=1$。これで出力が密度演算子であることも直接確認できました。

**2. 距離・忠実度・識別誤り。** 差は自己共役でトレース0です。

$$
A=\sigma_0-\sigma_1
=\frac12\begin{pmatrix}1-\gamma&-\sqrt{1-\gamma}\\
-\sqrt{1-\gamma}&-(1-\gamma)\end{pmatrix}.
$$

$a=1-\gamma$、$b=\sqrt{1-\gamma}$ とすると

$$
A^2=\frac14\begin{pmatrix}a^2+b^2&-ab+ab\\-ab+ab&a^2+b^2\end{pmatrix}
=\frac{(1-\gamma)(2-\gamma)}4I_2.
$$

固有値の絶対値は $\sqrt{(1-\gamma)(2-\gamma)}/2$ が二つ。従って[トレース距離の定義](#def-qinf11-trace-distance)より

$$
T(\sigma_0,\sigma_1)
=\frac12\sqrt{(1-\gamma)(2-\gamma)}.
$$

$\sigma_0$ が純粋なので[忠実度の直接公式](#def-qinf11-fidelity)は $\langle0|\sigma_1|0\rangle=(1+\gamma)/2$ を使い、

$$
f(\sigma_0,\sigma_1)=\sqrt{\frac{1+\gamma}{2}},
\qquad F(\sigma_0,\sigma_1)=\frac{1+\gamma}{2}.
$$

[Helstromとの対応](#thm-qinf11-operational-distance)から誤りは

$$
P_{\mathrm e}^*(\gamma)
=\frac12-\frac14\sqrt{(1-\gamma)(2-\gamma)}.
$$

**3. 単調性と端点。** $(1-\gamma)(2-\gamma)$ は $\gamma\in[0,1]$ で非負、導関数は $2\gamma-3<0$。よって $T$ は非増加、$f$ は $(1+\gamma)/2$ の非減少性から非減少で、誤り $P_{\mathrm e}^*$ は非減少です。

$$
\begin{array}{c|c|c|c}
\gamma&T&f&P_{\mathrm e}^*\\ \hline
0&1/\sqrt2&1/\sqrt2&(1-1/\sqrt2)/2\\
1/2&\sqrt3/4&\sqrt3/2&1/2-\sqrt3/8\\
1&0&1&1/2
\end{array}
$$

最後の行は両出力が $|0\rangle\langle0|$ になることと一致します。

**4. 上下界。** 上界の二乗を比較すると

$$
T^2=\frac{(1-\gamma)(2-\gamma)}4,
\quad 1-f^2=\frac{1-\gamma}{2},
$$

$$
(1-f^2)-T^2
=\frac{\gamma(1-\gamma)}4\ge0.
$$

よって $T\le\sqrt{1-f^2}$、等号は $\gamma=0,1$ に限ります。下界 $1-f\le T$ は[一般定理](#thm-qinf11-fvdg)からも従いますが、ここでは数式だけで確認します。$f\in[1/\sqrt2,1]$ なので $1-f\ge0$ です。$T^2-(1-f)^2$ の符号を調べるか、上の具体値で

$$
T^2=\frac{(1-\gamma)(2-\gamma)}4
=\frac{(1-\gamma)}2\cdot\frac{(2-\gamma)}2.
$$

$x=1-\gamma\in[0,1]$ と置けば $T=\frac12\sqrt{x(1+x)}$、$f=\sqrt{1-x/2}$ です。$1-f=x/[2(1+f)]$（有理化）であり、$x>0$ なら

$$
\frac{1-f}{T}
=\frac{\sqrt x}{(1+f)\sqrt{1+x}}
\le1,
$$

なぜなら $\sqrt x\le\sqrt{1+x}$ かつ $1+f\ge1$ だからです。$x=0$ では両辺0。以上より全区間で下界も成り立ちます。
<!-- solution-end -->

## 9. まとめと次の問い

- $T=\frac12\|\rho-\sigma\|_1$ は二値測定確率の最大差であり、等事前確率の最小誤りは $(1-T)/2$。
- 平方根忠実度 $f=\|\sqrt\rho\sqrt\sigma\|_1$ は、最適化した精製の内積の絶対値（Uhlmann定理）。二乗忠実度は $F=f^2$。
- 量子チャネルで $T$ は増加せず、$f$ と $F$ は減少しません。距離と重なりは同じ雑音を別の観点から見ています。
- $1-f\le T\le\sqrt{1-f^2}$。純粋状態では右端が等号となり、古典的な可換状態でも直接検算できます。

次のQINF12では、「完全に区別しにくい未知状態を、同じ入力のまま二つ以上に複製できるか」という操作上の制約に進みます。
