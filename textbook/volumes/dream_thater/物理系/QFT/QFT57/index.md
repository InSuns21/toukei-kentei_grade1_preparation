# QFT57 局所領域の縮約状態・格子正則化とエンタングルメント

<!-- definition-example-audit: strict -->

[QFT56の点分離cutoff](../QFT56/index.md#def-qft56-interval-cutoff)では、区間の端点を連続体で無限に拡大しないよう短距離の尺度を残しました。しかし、相関関数を切り出すことと、**その区間だけの量子状態を作ること**は同じ操作でしょうか。有限個の量子系なら[QINF3の部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)で答えられます。一方、連続場の任意に小さい領域を有限次元の部分系と呼ぶには注意が要ります。

この章では格子上の有限個の局所自由度から出発し、局所観測量、縮約密度演算子、純粋な全系に対する領域エントロピーをつなぎます。二つの結合振動子の[基底状態](../../../物理系/MQ/MQ2/index.md#def-mq2-ground-state)を積分して、場の離散模型でも局所状態が混合になることを計算します。最後に整数べき $\operatorname{Tr}\rho_A^n$ を導き、次章のレプリカ法で**何がまだ証明されていないか**を確認します。

規約を固定します。$\hbar=1$、自然対数を用い、エントロピーの単位は nat です。[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)は底2（bit）で定義されているため、ここでの $S_{\mathrm{nat}}=(\ln2)S_{\mathrm{QINF17}}$ です。有限格子のHilbert空間は明記したテンソル積に限り、連続体への極限は別の問題として扱います。相対論的量子場の局所代数に一般的な密度行列があるとは仮定しません。

## 1. 格子の部分系：何を「領域だけの観測」と呼ぶか

長さ $L>0$ の一次元空間を格子幅 $a=L/N$（整数 $N\ge2$）に分け、各サイト $j$ に有限次元Hilbert空間 $H_j$ を置きます。たとえば $H_j=\mathbb C^2$ なら各サイトは二準位です。サイト集合 $\Lambda=\{1,\ldots,N\}$ の部分集合 $A$ を観測領域、$B=\Lambda\setminus A$ を観測しない領域とします。因子の順番を固定すれば、全空間は $H_A\otimes H_B$ と書き直せます。

<a id="def-qft57-local-lattice"></a>

<!-- formal-statement-start -->
> **定義（有限格子の局所領域と局所観測量）**
> $N<\infty$、各 $1\le j\le N$ で $1\le\dim H_j<\infty$ とする。サイト集合 $A\subset\Lambda$、$B=\Lambda\setminus A$ に対し

$$
H_A=\bigotimes_{j\in A}H_j,\qquad
H_B=\bigotimes_{j\in B}H_j,\qquad
H=H_A\otimes H_B
$$

> と因子を並べ替えた表示を選ぶ。$A$ に局在する観測量は $O_A\otimes I_B$（$O_A=O_A^\dagger$）と書けるものとする。局所演算子全体は $\mathcal A_a(A)=\{X_A\otimes I_B:X_A\in L(H_A)\}$ である。
<!-- formal-statement-end -->

**定義の意味**：$A$ の演算子は $B$ に作用しません。$A$ に $r$ 個の二準位サイトがあれば $H_A$ の次元は $2^r$ ですが、$N\to\infty$ の後にも「次元が $2^r$ の同じ行列空間」を保持できるわけではありません。

<!-- definition-example-start: def-qft57-local-lattice -->
**定義の確認**：三サイトの順番を $1,2,3$ として $A=\{1,3\}$、$B=\{2\}$ と置きます。$Z=\operatorname{diag}(1,-1)$ をサイト1、$X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ をサイト3に作用させると、局所観測量は $Z\otimes I_2\otimes X$ です。両行列は自己共役で、$Z\otimes X$ を $H_A$ 上に置いたものと一致します。サイト2だけの $I_1\otimes Z\otimes I_3$ と可換です。これは定義に書かれた支持条件を実際に検査しています。
<!-- definition-example-end -->

有限格子で全系の状態 $\rho$ が与えられたら、[密度演算子](../../../応用系/QINF/QINF2/index.md#def-qinf2-ensemble-density)の条件により $\rho\ge0$、$\operatorname{Tr}\rho=1$ です。領域を観測するには、全系の期待値 $\operatorname{Tr}(\rho(O_A\otimes I_B))$ が再現できれば十分です。

<a id="def-qft57-regulated-reduction"></a>

<!-- formal-statement-start -->
> **定義（cutoff付き領域縮約状態）**
> 有限格子幅 $a>0$ で $H=H_A\otimes H_B$ と分解され、全系の密度演算子 $\rho^{(a)}$ があるとき、領域 $A$ のcutoff付き縮約状態を

$$
\rho_A^{(a)}:=\operatorname{Tr}_{H_B}\rho^{(a)}
$$

> とする。これは有限格子の部分トレースであり、連続体の局所領域 $A$ に密度演算子 $\rho_A$ が存在するという主張を含まない。
<!-- formal-statement-end -->

これは[QINF3の縮約状態の定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を格子の幾何に適用したものです。新しい部分トレースを発明したわけではありません。

<!-- definition-example-start: def-qft57-regulated-reduction -->
**定義の確認**：$N=2$、$A=\{1\}$、$|\Psi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とします。$\rho^{(a)}=|\Psi\rangle\langle\Psi|$ は正値、トレース1です。サイト2の基底 $|0\rangle,|1\rangle$ で部分トレースを取ると、非対角の $|0\rangle\langle1|$、$|1\rangle\langle0|$ はトレース零なので

$$
\rho_A^{(a)}=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|=I_2/2.
$$

$\rho_A^{(a)}$ は正値でトレース1、$\operatorname{Tr}(\rho_A^{(a)}Z)=0$ です。全系が純粋でも部分系は混合でありえます。
<!-- definition-example-end -->

### 局所期待値を格子の添字で検算する

[QINF3の期待値による部分トレースの一意性定理](../../../応用系/QINF/QINF3/index.md#thm-qinf3-expectation-uniqueness)を有限格子へ適用すると、有限次元の $H_A,H_B$、全系の密度演算子 $\rho$、任意の $O_A\in L(H_A)$ に対し、$\rho_A=\operatorname{Tr}_B\rho$ は正値・トレース1で、局所期待値は

$$
\operatorname{Tr}_{A\otimes B}\!\bigl[\rho(O_A\otimes I_B)\bigr]
=\operatorname{Tr}_A(\rho_AO_A).
$$

と再現できます。既習定理を重複して新定理とせず、観測しない側の基底の添字を等しく置く手順だけをここで再計算します。

$H_A,H_B$ の正規直交基底を $|i\rangle_A,|\mu\rangle_B$ とし、$\rho_{i\mu,j\nu}=\langle i\mu|\rho|j\nu\rangle$ と書きます。部分トレースの成分は $(\rho_A)_{ij}=\sum_\mu\rho_{i\mu,j\mu}$ です。トレースの定義を展開すると

$$
\begin{aligned}
\operatorname{Tr}\bigl[\rho(O_A\otimes I_B)\bigr]
&=\sum_{i,\mu,j,\nu}\rho_{i\mu,j\nu}(O_A)_{ji}\delta_{\nu\mu}\\
&=\sum_{i,j}\left(\sum_\mu\rho_{i\mu,j\mu}\right)(O_A)_{ji}
=\operatorname{Tr}(\rho_AO_A).
\end{aligned}
$$

任意の $|v\rangle\in H_A$ では、正規直交基底の各項が非負なので $\langle v|\rho_A|v\rangle=\sum_\mu\langle v\mu|\rho|v\mu\rangle\ge0$ です。また $\operatorname{Tr}\rho_A=\sum_{i,\mu}\rho_{i\mu,i\mu}=1$。一意性は $O_A=|j\rangle\langle i|$ と取れば等式右辺が $(\rho_A)_{ij}$ をすべて決定することから従います。

この検算は**同一cutoffでの**演算子期待値の再現です。$a\downarrow0$ における局所代数・状態の極限が存在するか、極限を密度行列で表せるかは述べていません。

## 2. 場の最小模型：結合した二つの振動子

二準位の例だけでは、場の自由度と結びつきません。自由スカラー場を空間格子で近似すると、サイトの場 $q_j$ と共役運動量 $p_j$ が各点の振動子になり、隣接点の場の差から結合 $(q_j-q_{j+1})^2$ が現れます。有限格子でも各振動子のHilbert空間は無限次元なので、[QINF3の有限次元定理](../../../応用系/QINF/QINF3/index.md#thm-qinf3-expectation-uniqueness)をそのまま適用したことにはしません。以下では正規化可能なGaussian基底状態の積分を直接行います。

$\omega_0>0$、$\kappa\ge0$ とし、$[q_i,p_j]=i\delta_{ij}$、他の基本交換子は零とします。和差によるモード座標 $Q_\pm=(q_1\pm q_2)/\sqrt2$、$P_\pm=(p_1\pm p_2)/\sqrt2$ へ変えると次が成り立ちます。

<a id="prop-qft57-two-oscillators"></a>

<!-- formal-statement-start -->
> **命題（二サイト自由場の基底状態と局所共分散）**
> $\omega_0>0$、$\kappa\ge0$ の二振動子Hamiltonianを

$$
H=\frac12(p_1^2+p_2^2)+\frac{\omega_0^2}{2}(q_1^2+q_2^2)
+\frac\kappa2(q_1-q_2)^2
$$

> とする。$\omega_+=\omega_0$、$\omega_-=\sqrt{\omega_0^2+2\kappa}$ と置くと、正規化された基底波動関数と第一サイトの分散は

$$
\begin{aligned}
\psi_0(q_1,q_2)&=\frac{(\omega_+\omega_-)^{1/4}}{\sqrt\pi}
\exp\!\left[-\frac12(\omega_+Q_+^2+\omega_-Q_-^2)\right],\\
\langle q_1^2\rangle&=\frac14\left(\frac1{\omega_+}+\frac1{\omega_-}\right),\\
\langle p_1^2\rangle&=\frac14(\omega_++\omega_-),\qquad
\frac12\langle q_1p_1+p_1q_1\rangle=0.
\end{aligned}
$$

> $\kappa=0$ のとき波動関数は積、$\kappa>0$ のときは積に分解できない。
<!-- formal-statement-end -->

### 証明の見取り図

座標を和と差へ変えるとHamiltonianが二つの独立した調和振動子になります。各正規モードのGaussianを掛け、元のサイトへ戻して二点間の交差項を調べます。

<!-- proof-start -->
### 証明

$q_1=(Q_++Q_-)/\sqrt2$、$q_2=(Q_+-Q_-)/\sqrt2$ だから

$$
q_1^2+q_2^2=Q_+^2+Q_-^2,\qquad
(q_1-q_2)^2=2Q_-^2.
$$

同じ直交変換を運動量にも施すと、$H=(P_+^2+\omega_+^2Q_+^2)/2+(P_-^2+\omega_-^2Q_-^2)/2$ です。各モードの基底波動関数 $(\omega/\pi)^{1/4}e^{-\omega Q^2/2}$ を掛けた表示式は、変換のJacobianの絶対値が1なので正規化されています。[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)から $\langle Q_\pm^2\rangle=1/(2\omega_\pm)$、$\langle P_\pm^2\rangle=\omega_\pm/2$、異なるモードの交差期待値は零です。これを $q_1,p_1$ の線形結合に戻せば示した分散となります。実の偶Gaussianでは対称化された $qp$ 期待値も零です。

最後に $A=(\omega_++\omega_-)/2$、$B=(\omega_+-\omega_-)/2$ と置くと

$$
\psi_0(q_1,q_2)=\frac{(\omega_+\omega_-)^{1/4}}{\sqrt\pi}
\exp\!\left[-\frac A2(q_1^2+q_2^2)-Bq_1q_2\right].
$$

もし非零のGaussianが $f(q_1)g(q_2)$ に分解できれば $\partial_{q_1}\partial_{q_2}\log\psi_0=0$ ですが、ここでは $-B$ です。$\kappa>0$ なら $\omega_->\omega_+$ で $B\ne0$、積にはなりません。逆に $\kappa=0$ では $B=0$、二つの基底Gaussianの積です。
<!-- proof-end -->

**具体的な数値**：$\omega_0=1$、$\kappa=3/2$ なら $\omega_+=1$、$\omega_-=2$ です。第一サイトで $\langle q_1^2\rangle=3/8$、$\langle p_1^2\rangle=3/4$、積は $9/32>1/4$ となります。全系が基底純粋状態でも、局所的には真空の揺らぎと相関が残ります。

さらにこの例では縮約状態の純粋性を**部分トレースの積分から**計算できます。連続変数の位置基底を用いる以下の積分は、$\omega_0>0$ の正規化可能な波動関数の範囲で実行します。

<a id="thm-qft57-oscillator-purity"></a>

<!-- formal-statement-start -->
> **定理（二振動子の縮約純粋性）**
> 上の二振動子の正規化基底状態 $\psi_0$ について、第一サイトの縮約核を次で定める。

$$
\rho_1(x,x')=\int_\mathbb R\psi_0(x,y)\overline{\psi_0(x',y)}\,dy.
$$

> この核はトレース1の正値作用素を定め、その純粋性は

$$
\operatorname{Tr}\rho_1^2
=\frac{2\sqrt{\omega_+\omega_-}}{\omega_++\omega_-}\le1.
$$

> 等号は $\kappa=0$ の場合に限る。$\kappa>0$ なら第一サイトは混合状態である。
<!-- formal-statement-end -->

### 証明の見取り図

$y$ を積分すると $x,x'$ の二変数Gaussian核になります。その核を二回掛けて $x,x'$ でも積分すると、結合が零のときだけ純粋性1へ戻ることを確かめられます。

<!-- proof-start -->
### 証明

$A=(\omega_++\omega_-)/2>0$、$B=(\omega_+-\omega_-)/2$ とおくと $A^2-B^2=\omega_+\omega_->0$ です。[前命題の波動関数](#prop-qft57-two-oscillators)の積を作り、$y$ の平方完成をすると

$$
\begin{aligned}
\rho_1(x,x')
&=\frac{\sqrt{A^2-B^2}}\pi e^{-A(x^2+x'^2)/2}
\int_\mathbb R e^{-Ay^2-B(x+x')y}\,dy\\
&=K\exp[-u(x^2+x'^2)+vxx'],\\
K&=\sqrt{\frac{A^2-B^2}{\pi A}},\quad
u=\frac A2-\frac{B^2}{4A},\quad v=\frac{B^2}{2A}.
\end{aligned}
$$

積分は $-Ay^2-Bsy=-A(y+Bs/(2A))^2+B^2s^2/(4A)$ と変形し、$s=x+x'$ を代入したものです。対角核は $\rho_1(x,x)=K\exp[-(A^2-B^2)x^2/A]$ なので積分するとトレース1です。任意の $f\in L^2(\mathbb R)$ では

$$
\int\!\int\overline{f(x)}\rho_1(x,x')f(x')\,dx\,dx'
=\int_\mathbb R\left|\int_\mathbb R\overline{f(x)}\psi_0(x,y)\,dx\right|^2dy\ge0
$$

より正値です。純粋性を核の積として計算し、$4u^2-v^2=A^2-B^2$ を使うと

$$
\begin{aligned}
\operatorname{Tr}\rho_1^2
&=K^2\iint e^{-2u(x^2+x'^2)+2vxx'}\,dx\,dx'\\
&=\frac{A^2-B^2}{\pi A}\frac\pi{\sqrt{4u^2-v^2}}
=\frac{\sqrt{A^2-B^2}}A\\
&=\frac{2\sqrt{\omega_+\omega_-}}{\omega_++\omega_-}.
\end{aligned}
$$

最終式は $\omega_++\omega_-\ge2\sqrt{\omega_+\omega_-}$ により1以下、等号条件は $\omega_+=\omega_-$、すなわち $\kappa=0$ です。純粋状態の射影 $\rho_1=|f\rangle\langle f|$ なら $\rho_1^2=\rho_1$ かつ $\operatorname{Tr}\rho_1^2=1$ なので、$\kappa>0$ のとき $\operatorname{Tr}\rho_1^2<1$ は混合状態であることを示します。無限次元について[QINF2の有限次元の純粋性定理](../../../応用系/QINF/QINF2/index.md#thm-qinf2-purity-rank)を無条件に延長したわけではありません。
<!-- proof-end -->

## 3. 境界をまたぐBell対：エントロピーはどこから来るか

振動子では結合があるだけで局所純粋性が失われました。ここでは有限次元へ戻り、**どの自由度が切断面をまたいでいるか**を数えるモデルを作ります。場のCFTのエントロピー係数をこの模型から推測するのが目的ではありません。

<a id="def-qft57-crossing-pairs"></a>

<!-- formal-statement-start -->
> **定義（切断面をまたぐ独立Bell対模型）**
> 有限格子の領域 $A$ と補領域 $B$ の間に、互いに異なる $M\ge0$ 組の二準位自由度 $(a_j,b_j)$ を選ぶ。$a_j\in A$、$b_j\in B$ とし、各組のBell状態を

$$
|\Phi\rangle_j=\frac{|0_{a_j}0_{b_j}\rangle+|1_{a_j}1_{b_j}\rangle}{\sqrt2}
$$

> とする。残りの自由度の純粋積状態を $|\chi_A\rangle|\chi_B\rangle$ とし、全系の状態を

$$
|\Psi_M\rangle=\bigotimes_{j=1}^M|\Phi\rangle_j
\otimes|\chi_A\rangle\otimes|\chi_B\rangle
$$

> とする。テンソル積の因子は必要に応じて $A$ 側と $B$ 側へ並べ替える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft57-crossing-pairs -->
**定義の確認**：$M=2$ なら四つの二準位があり、$|\Psi_2\rangle=(|00\rangle_{a_1b_1}+|11\rangle_{a_1b_1})(|00\rangle_{a_2b_2}+|11\rangle_{a_2b_2})/2$ です。四つの項は直交し、規格化は $4(1/2)^2=1$。どの組も片側が $A$、他方が $B$ にあるので、まさに二つの独立した切断面横断対です。
<!-- definition-example-end -->

<a id="thm-qft57-crossing-entropy"></a>

<!-- formal-statement-start -->
> **定理（独立Bell対の局所エントロピーと整数モーメント）**
> 上の $|\Psi_M\rangle$ を全系の純粋状態とする。$A$ の縮約状態は

$$
\rho_A=\frac{I_{2^M}}{2^M}\otimes|\chi_A\rangle\langle\chi_A|,
\quad S_A:=-\operatorname{Tr}(\rho_A\ln\rho_A)=M\ln2.
$$

> 任意の整数 $n\ge2$ に対して $\operatorname{Tr}\rho_A^n=2^{M(1-n)}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各Bell対で $B$ の二つの基底をトレースすると $I_2/2$ が残ります。独立した組はそのテンソル積になるため、固有値は $2^{-M}$ が $2^M$ 回現れます。

<!-- proof-start -->
### 証明

一組では $|\Phi\rangle\langle\Phi|$ の四項を展開して $\operatorname{Tr}_{b_j}|0\rangle\langle1|=0$、$\operatorname{Tr}_{b_j}|r\rangle\langle r|=1$（$r=0,1$）を使うと、$\rho_{a_j}=I_2/2$ です。[QINF3の部分トレースの積性](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)を $M$ 組へ繰り返し適用して $\rho_A=(I_2/2)^{\otimes M}\otimes|\chi_A\rangle\langle\chi_A|$ を得ます。純粋因子の零以外の固有値は1なので、$\rho_A$ の非零固有値は $2^{-M}$ が $2^M$ 個です。よって

$$
\begin{aligned}
\operatorname{Tr}\rho_A^n&=2^M(2^{-M})^n=2^{M(1-n)},\\
S_A&=-2^M2^{-M}\ln(2^{-M})=M\ln2.
\end{aligned}
$$

$M=0$ の場合も純粋状態に対して $S_A=0$、モーメント1となります。
<!-- proof-end -->

この模型では切断面をまたぐ対の個数が重要ですが、格子幅を小さくしたときの $M(a)$ は模型の構成が決めるものです。たとえば $M(a)=\lfloor\log_2(L/a)\rfloor$ と恣意的に増やせば $S_A$ は $\ln(L/a)$ に近づきますが、**この構成だけでは二次元CFTの中心電荷や普遍係数を求めたことにはなりません**。その係数を求めるには後続章の場の経路積分・分岐幾何・twist演算子が必要です。

## 4. cutoffを外すと何が壊れるか

有限格子の部分系分解には、すべてのサイトのHilbert空間をテンソル積に並べられるという前提がありました。連続体の量子場では、点ごとの場は[QFT3の場のsmearing](../QFT3/index.md#def-qft3-smearing)と同様、平滑化した観測量として扱う必要があります。境界近傍の任意の短波長の相関まで取り込むと、有限格子の局所密度行列・エントロピーが収束するとは限りません。

<a id="def-qft57-cutoff-entropy"></a>

<!-- formal-statement-start -->
> **定義（cutoff依存の領域エントロピー）**
> 各 $a>0$ において有限次元格子の分解 $H^{(a)}=H_A^{(a)}\otimes H_B^{(a)}$ と密度演算子 $\rho^{(a)}$ が指定されているとする。$\rho_A^{(a)}=\operatorname{Tr}_B\rho^{(a)}$ の非零固有値を $\lambda_k^{(a)}$ として

$$
S_A(a):=-\sum_{\lambda_k^{(a)}>0}\lambda_k^{(a)}\ln\lambda_k^{(a)}
$$

> と定める。これは格子cutoff $a$ に依存する有限次元量であり、$\lim_{a\downarrow0}S_A(a)$ の存在や、連続体の部分トレースによる表現は定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft57-cutoff-entropy -->
**定義の確認**：$a=L/8$ の格子で二つのBell対が横断し、残りが積なら $\rho_A^{(a)}$ の非零固有値は $1/4$ が四つです。正値・規格化 $4/4=1$ を確認して $S_A(a)=-4(1/4)\ln(1/4)=2\ln2$。$a=L/16$ で三対に設計変更すれば $S_A(a)=3\ln2$ です。$a$ を指定しないまま「領域のエントロピーは $2\ln2$」と断定できません。
<!-- definition-example-end -->

ここで二種類の「境界」を区別します。[QFT56のDirichlet・Neumann条件](../QFT56/index.md#def-qft56-half-plane-boundaries)は**場が存在する空間の物理的な壁**で課す条件です。これに対して $A$ と $B$ の間の切断面は、同じ全系のどこを観測対象とするかの**仮想的な分割**です。切断面に $\phi=0$ を課してしまうと、元の理論を別の境界値問題に置き換えてしまいます。

連続相対論的QFTの多くの標準的な真空表現では、有界領域の局所可観測量のvon Neumann代数はType IIIとなり、有限格子の $H_A\otimes H_B$ と $\rho_A$ をそのまま保つことはできません。この一般論の仮定・証明はAQFTの範囲です。ここで確実に主張できるのは、**cutoffを保持した有限格子では部分トレースが計算できる**ことと、**cutoffを外した極限で同じ表現を無条件に使う根拠はない**ことです。格子エントロピーの発散と、局所観測量の期待値の連続極限が存在することは両立しえます。

## 5. レプリカ法の準備：整数べきから何が分かるか

領域密度演算子がある有限cutoffでは、$\operatorname{Tr}(\rho_A^2)$ は純粋性、$\operatorname{Tr}(\rho_A^n)$ はより一般の固有値情報を持ちます。この整数 $n$ を**複数の複製**の数として扱うのが次の道筋です。ただし、整数で分かった値を微分するには、実数の $n$ への拡張が必要です。

<a id="def-qft57-replica-moments"></a>

<!-- formal-statement-start -->
> **定義（有限cutoffのレプリカモーメントとRényiエントロピー）**
> 有限次元の密度演算子 $\rho_A$ の正の固有値を $\lambda_1,\ldots,\lambda_r$ とする。実数 $n>0$ について

$$
Z_A(n):=\operatorname{Tr}(\rho_A^n)=\sum_{k=1}^r\lambda_k^n,
\qquad S_n(A):=\frac{\ln Z_A(n)}{1-n}\quad(n\ne1)
$$

> と定義する。整数 $n\ge2$ の $Z_A(n)$ を整数レプリカモーメントという。正の固有値の有限和による実数拡張は、ここでは密度演算子が既知のため正当化できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft57-replica-moments -->
**定義の確認**：$\rho_A=\operatorname{diag}(3/4,1/4,0)$ なら正値・トレース1です。$Z_A(2)=9/16+1/16=5/8$、$S_2=-\ln(5/8)=\ln(8/5)$。零固有値を正の固有値の和から除いているので、$n>0$ で $0^n$ の曖昧さもありません。
<!-- definition-example-end -->

<a id="thm-qft57-replica-derivative"></a>

<!-- formal-statement-start -->
> **定理（有限次元のレプリカ微分公式）**
> 有限次元の密度演算子 $\rho_A$ から正の固有値の和で定めた $Z_A(n)$ は $n>0$ で微分可能、$Z_A(1)=1$ であり、自然対数のvon Neumannエントロピーは

$$
S_A=-\left.\frac{d}{dn}\ln Z_A(n)\right|_{n=1}
=\lim_{n\to1}S_n(A).
$$

> ただし、整数 $n=2,3,\ldots$ の値だけを与えられた場合、この微分を求める解析接続は一般に一意とはいえない。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の正の固有値のべきは微分できます。しかし整数列の値を一致させるだけなら、整数で零になる関数を自由に加えられます。その二点を分けて証明します。

<!-- proof-start -->
### 証明

$\lambda_k>0$ の有限和なので、各項について $d\lambda_k^n/dn=\lambda_k^n\ln\lambda_k$ です。従って

$$
Z_A(1)=\sum_k\lambda_k=1,\qquad
Z_A'(1)=\sum_k\lambda_k\ln\lambda_k=-S_A.
$$

$d(\ln Z_A)/dn=Z_A'/Z_A$ に $n=1$ を代入すると第一式です。$f(n)=\ln Z_A(n)$ は微分可能で $f(1)=0$ だから $\lim_{n\to1}f(n)/(1-n)=-f'(1)$ となり第二式も従います。

一方、整数でのデータに一致する一つの解析関数を $F(n)$ とすると、任意の実定数 $c$ に対して $\widetilde F(n)=F(n)+c\sin(\pi n)$ もすべての整数で一致し、$\widetilde F(1)=F(1)$ ですが、$\widetilde F'(1)=F'(1)-c\pi$ です。$F$ が $1$ の近傍で正なら十分小さい $c$ で $\widetilde F$ も正にできます。よって整数での一致と局所的な解析性だけでは、$n=1$ の微分は決まりません。密度演算子の固有値の和という追加構造があれば、その拡張を選べます。
<!-- proof-end -->

**次章への接続**：レプリカ経路積分では、整数 $n$ における $Z_A(n)$ を、$A$ の切断に沿って貼り合わせた $n$ 枚の幾何に結びつけます。その操作がcutoff付きの密度演算子のトレースと一致すること、規格化 $Z_A(1)=1$、境界・赤外条件、そして $n\to1$ の解析接続をどう選ぶかは、それぞれ検証すべき別の段階です。

## 6. 演習：局所状態とcutoffを自力で確かめる

<a id="ex-qft57-a01"></a>

### QFT57-A01 三サイトの局所観測量

- Level: A
- 対応目標: 格子の局所演算子と部分トレース

$H=(\mathbb C^2)^{\otimes3}$、$A=\{1,3\}$、$B=\{2\}$ とする。$|\Psi\rangle=(|000\rangle+|111\rangle)/\sqrt2$ の $\rho_A$ と、$Z_1\otimes I_2\otimes Z_3$ の期待値を求めよ。

<!-- solution-start -->
### 詳細解答

$A$ の基底を $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ と取ると、全系は $(|00\rangle_A|0\rangle_B+|11\rangle_A|1\rangle_B)/\sqrt2$ です。$B$ の直交基底で交差項のトレースは0となるので $\rho_A=(|00\rangle\langle00|+|11\rangle\langle11|)/2$。正値・トレース1であり、$Z\otimes Z$ は $|00\rangle$ と $|11\rangle$ の両方に固有値 $+1$ で作用します。従って $\operatorname{Tr}(\rho_A(Z\otimes Z))=1$。全系の各項でも同じ値なので[QINF3の局所期待値定理](../../../応用系/QINF/QINF3/index.md#thm-qinf3-expectation-uniqueness)と一致します。
<!-- solution-end -->

<a id="ex-qft57-a02"></a>

### QFT57-A02 Bell対の局所混合

- Level: A
- 対応目標: 純粋な全系と混合した部分系

$|\Psi\rangle=\sqrt{3/4}|00\rangle+\sqrt{1/4}|11\rangle$ の $A$ 側について、縮約密度行列、純粋性 $\operatorname{Tr}\rho_A^2$、自然対数エントロピーを求めよ。

<!-- solution-start -->
### 詳細解答

第二系の $\langle0|1\rangle=0$ により $\rho_A=\operatorname{diag}(3/4,1/4)$。対角成分は非負、和1で密度行列です。平方も対角なので $\operatorname{Tr}\rho_A^2=9/16+1/16=5/8<1$。エントロピーは $S_A=-(3/4)\ln(3/4)-(1/4)\ln(1/4)$。全系は単位ベクトルの射影なので純粋ですが、部分系は混合です。
<!-- solution-end -->

<a id="ex-qft57-a03"></a>

### QFT57-A03 横断する対の数

- Level: A
- 対応目標: 独立Bell対の縮約スペクトル

$M=3$ の[独立Bell対模型](#def-qft57-crossing-pairs)で、$\rho_A$ の非零固有値の種類・重複度、$S_A$、$\operatorname{Tr}\rho_A^3$ を求めよ。

<!-- solution-start -->
### 詳細解答

一対の縮約は $I_2/2$ で、三対のテンソル積は $I_8/8$ です。非零固有値は $1/8$ が8個なので、トレースは $8/8=1$。$S_A=-8(1/8)\ln(1/8)=3\ln2$、$\operatorname{Tr}\rho_A^3=8(1/8)^3=1/64$ です。$2^{3(1-3)}=2^{-6}$ とも一致します。
<!-- solution-end -->

<a id="ex-qft57-a04"></a>

### QFT57-A04 二振動子の正規モード

- Level: A
- 対応目標: 結合振動子の局所揺らぎ

$\omega_0=1$、$\kappa=3/2$ の[二振動子模型](#prop-qft57-two-oscillators)の $\omega_\pm$、$\langle q_1^2\rangle$、$\langle p_1^2\rangle$、$\operatorname{Tr}\rho_1^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\omega_+=1$、$\omega_-=\sqrt{1+3}=2$ です。分散は $(1+1/2)/4=3/8$、$(1+2)/4=3/4$。純粋性は[二振動子の縮約純粋性](#thm-qft57-oscillator-purity)に適用すると $2\sqrt{1\cdot2}/(1+2)=2\sqrt2/3<1$。積が $9/32$ なのも $\kappa>0$ の混合状態と整合します。
<!-- solution-end -->

<a id="ex-qft57-a05"></a>

### QFT57-A05 物理的な壁と仮想的な切断面

- Level: A
- 対応目標: 境界条件と領域分割の区別

三サイトの実変数 $q_1,q_2,q_3$ について、$A=\{1,2\}$、$B=\{3\}$ とする。(1) $A$ を選ぶと $q_2=0$ を課す必要があるか。(2) 別途 $q_3=0$ の固定境界条件を課す操作と、$B$ を部分トレースで捨てる操作は同じか。理由を述べよ。

<!-- solution-start -->
### 詳細解答

(1) 不要です。領域を選ぶ操作はどの演算子 $O_A\otimes I_B$ を観測するかを制限するだけです。切断面の隣のサイト $2$ の場の値は自由に揺らいで構いません。(2) 違います。$q_3=0$ は許される全系状態やHamiltonianの境界条件を変更します。部分トレースはもとの全系の $\rho$ を保持して、$B$ の基底を和に取って $\rho_A$ を作ります。[QFT56の境界条件の定義](../QFT56/index.md#def-qft56-half-plane-boundaries)と前節の縮約は別操作です。
<!-- solution-end -->

<a id="ex-qft57-b01"></a>

### QFT57-B01 二振動子の縮約Gaussian核

- Level: B
- 対応目標: 局所純粋性を積分から再導出

$A=(\omega_++\omega_-)/2$、$B=(\omega_+-\omega_-)/2$、$A>|B|$ とおく。$\psi(x,y)=C\exp[-A(x^2+y^2)/2-Bxy]$、$C=(A^2-B^2)^{1/4}/\sqrt\pi$ の縮約核を導き、$\operatorname{Tr}\rho_1^2=\sqrt{A^2-B^2}/A$ を示せ。

<!-- solution-start -->
### 詳細解答

$\psi(x,y)\psi(x',y)$ の指数は $-A(x^2+x'^2)/2-Ay^2-B(x+x')y$ です。$s=x+x'$ とおけば $-Ay^2-Bsy=-A(y+Bs/(2A))^2+B^2s^2/(4A)$ なので、$y$ 積分は $\sqrt{\pi/A}\,e^{B^2s^2/(4A)}$。よって $\rho_1(x,x')=K e^{-u(x^2+x'^2)+vxx'}$、$K=\sqrt{(A^2-B^2)/(\pi A)}$、$u=A/2-B^2/(4A)$、$v=B^2/(2A)$。純粋性積分の二次形式の行列は $\begin{pmatrix}2u&-v\\-v&2u\end{pmatrix}$ で、行列式 $(2u)^2-v^2=A^2-B^2>0$。従って二次元Gaussian積分は $\pi/\sqrt{A^2-B^2}$、$K^2$ を掛けて $\operatorname{Tr}\rho_1^2=\sqrt{A^2-B^2}/A$。$A\ge\sqrt{A^2-B^2}$ なので1以下です。
<!-- solution-end -->

<a id="ex-qft57-b02"></a>

### QFT57-B02 cutoffと対の増加

- Level: B
- 対応目標: 正則化依存と普遍係数の区別

$a_k=L/2^k$（$k=1,2,\ldots$）ごとに $M(a_k)=k$ 組の独立Bell対が切断面をまたぐ模型を作る。$S_A(a_k)$ と $S_A(a_{k+1})-S_A(a_k)$ を求め、この結果から中心電荷 $c$ を決めてよいか述べよ。

<!-- solution-start -->
### 詳細解答

[独立Bell対の定理](#thm-qft57-crossing-entropy)で $S_A(a_k)=k\ln2=\ln(L/a_k)$、一段細分化で $M$ が1増すため差は $\ln2$ です。しかし $M(a_k)=2k$ と作れば差も係数も二倍になります。この結果は人工的な横断対数え上げの帰結であって、CFTの局所場の相関・対称性・中心電荷を計算していません。よって $c$ を決める根拠にはなりません。
<!-- solution-end -->

<a id="ex-qft57-b03"></a>

### QFT57-B03 整数レプリカと微分

- Level: B
- 対応目標: 微分公式と解析接続の追加仮定

$\rho=\operatorname{diag}(p,1-p)$、$0<p<1$ とする。(1) $Z(n)$ と $S$ を求めよ。(2) $\widetilde Z(n)=Z(n)+\epsilon\sin(\pi n)$ を考え、整数値と $n=1$ の導関数を比較せよ。

<!-- solution-start -->
### 詳細解答

(1) $Z(n)=p^n+(1-p)^n$、$Z(1)=1$ です。微分は $Z'(1)=p\ln p+(1-p)\ln(1-p)$ だから、[有限次元のレプリカ微分公式](#thm-qft57-replica-derivative)により $S=-p\ln p-(1-p)\ln(1-p)$。(2) 整数 $n$ では $\sin(\pi n)=0$ で全値が一致し、$\widetilde Z(1)=1$ です。しかし $\widetilde Z'(1)=Z'(1)+\epsilon\pi\cos\pi=Z'(1)-\epsilon\pi$。$\epsilon\ne0$ なら異なり、整数レプリカだけからエントロピーを微分で一意には決められません。これは $\widetilde Z$ が別の密度行列のモーメントだという主張ではありません。
<!-- solution-end -->

<a id="ex-qft57-b04"></a>

### QFT57-B04 規格化と局所相関の差

- Level: B
- 対応目標: エントロピー発散と期待値の両立

$A$ の観測対象を一つの二準位サイト $a_0$ とし、その状態を常に $|0\rangle\langle0|$ とする。同時に、$A,B$ 間の独立Bell対を $M=k$ 個含む純粋な全系を構成する。$Z_{a_0}$ の期待値と $S_A$ を求め、どちらが $k\to\infty$ で発散するか示せ。

<!-- solution-start -->
### 詳細解答

全系を $|0\rangle_{a_0}\otimes|\Psi_k\rangle$ とすればよいです。$a_0$ の縮約は $|0\rangle\langle0|$ で $\langle Z_{a_0}\rangle=\langle0|Z|0\rangle=1$ と $k$ に依存しません。一方、$A$ に $a_0$ と全ての $k$ 個の対の片側を入れれば $\rho_A=|0\rangle\langle0|\otimes I_{2^k}/2^k$ となり $S_A=k\ln2\to\infty$ です。局所観測量の有限な期待値と領域エントロピーの発散が矛盾しないことの有限模型による直接例です。
<!-- solution-end -->

<a id="ex-qft57-c01"></a>

### QFT57-C01 格子局所状態からレプリカ入口まで

- Level: C
- 対応目標: 縮約・純粋性・エントロピー・解析接続の統合

二サイトの純粋状態 $|\Psi_p\rangle=\sqrt p|00\rangle+\sqrt{1-p}|11\rangle$（$0<p<1$）を出発点とする。さらにこの状態の独立コピーを $M$ 組作り、各組の第一サイトだけを $A$ とする。(1) $\rho_A$ の固有値を重複度まで決め、(2) $\operatorname{Tr}\rho_A^n$ と $S_A$ を導き、(3) $p=1/2$ と $p\to1$ の両極限を検算し、(4) この整数レプリカデータを無条件に連続場の区間エントロピーと呼べない理由を二つ述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 縮約とスペクトル。** 一対を第二サイトでトレースすると $\rho_{a}=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|$ です。二項は非負で和1。$M$ 対は積状態なので $\rho_A=\rho_a^{\otimes M}$。$A$ の計算基底のうち1が $r$ 個あるものは固有値 $p^{M-r}(1-p)^r$ を持ち、そのような基底は $\binom Mr$ 個あります。よって固有値の和は二項定理で $\sum_{r=0}^M\binom Mrp^{M-r}(1-p)^r=(p+1-p)^M=1$ です。

**(2) モーメントとエントロピー。** 各固有値の $n$ 乗を同じ重複度で足すと

$$
\begin{aligned}
Z_A(n)&=\sum_{r=0}^M\binom Mr p^{n(M-r)}(1-p)^{nr}
=[p^n+(1-p)^n]^M,\\
\left.\frac{d}{dn}\ln Z_A(n)\right|_{n=1}
&=M\frac{p\ln p+(1-p)\ln(1-p)}{p+(1-p)},\\
S_A&=-M[p\ln p+(1-p)\ln(1-p)].
\end{aligned}
$$

有限次元なので正の固有値から微分した[レプリカ公式](#thm-qft57-replica-derivative)の条件が満たされています。

**(3) 両極限。** $p=1/2$ なら $\rho_A=I_{2^M}/2^M$、$Z_A(n)=2^{M(1-n)}$、$S_A=M\ln2$ と[独立Bell対の定理](#thm-qft57-crossing-entropy)に一致します。$p\to1$ では $p\ln p\to0$、$(1-p)\ln(1-p)\to0$ なので $S_A\to0$、また $Z_A(n)\to1$。各対は $|00\rangle$ の積へ近づくので整合します。

**(4) 連続場との距離。** この計算には有限個の二準位対への厳密なテンソル積分解が必要ですが、連続場の局所代数に同じ分解・密度演算子があるとは限りません。さらに場のレプリカ経路積分は整数 $n$ の分岐幾何を与えても、$n\to1$ の解析接続をそれだけで一意化しません。加えて $M(a)$ の増え方は任意であり、CFTの普遍係数も導出していません。
<!-- solution-end -->

## 7. 次に何を学ぶか

有限cutoffで局所密度演算子を作ること、自由場の離散模型でも縮約が混合になること、エントロピーが観測領域の選び方と短距離の自由度に依存することを確認しました。次のレプリカ法では、$\rho_A^n$ のトレースを**整数枚の幾何の貼り合わせ**へ変換し、twist演算子によって二次元CFTの単一区間へ適用するところまで進めます。そこで初めて中心電荷と係数の関係を検算します。有限cutoffの結果、連続体の形式的処方、そして解析接続の仮定を混ぜないことが重要です。
