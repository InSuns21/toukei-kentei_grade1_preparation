# AQFT10 無限自由度と非同値表現

[AQFT8の自由場Fock表現](../AQFT8/index.md#def-aqft8-fock-weyl)では一つの真空から観測量を表し、[AQFT9](../AQFT9/index.md#def-aqft9-local-vn-net)では状態ごとにGNS表現と局所von Neumann環を構成しました。有限個の位置・運動量なら、[QM8のStone–von Neumann定理](../../QM/QM8/index.md#thm-qm8-stone-von-neumann)は**規則的で既約**なWeyl表現の一意性を保証します。ではモードを無限個に増やしても、真空を単にユニタリ変換すればすべての状態を表せるでしょうか。

本講では一つの具体的な**可算無限モードのCCR模型**を最後まで計算します。各有限モードでは必ず実現できる変位が、無限個のモードでは二乗可和性を失い、元のFock表現上の**正規状態にさえならない**ことを示します。これは相互作用する量子場の存在定理ではありません。Minkowski自由Klein–Gordon場に戻る際には、この模型の結論と時空的局所性を区別します。

## 1. 有限モードでは何が保証されるか

[QM8のStone–von Neumann定理](../../QM/QM8/index.md#thm-qm8-stone-von-neumann)が対象とするのは、自由度が有限で、Weylの一パラメータユニタリ群が強連続であり、表現が既約である場合です。**規則性を外した表現、既約性を外した直和表現、無限モードの表現**には、そのまま適用できません。

具体的な比較のため、一粒子Hilbert空間を $\mathfrak h=\ell^2(\mathbb N;\mathbb C)$ とし、標準正規直交基底を $e_1,e_2,\ldots$ とします。まず有限個の座標だけが非零であるベクトルの実線形空間

$$
\mathcal V_{\mathrm{fin}}=\mathbb C^{(\mathbb N)}
=\{z=(z_j):z_j=0\text{ は有限個を除いて成立}\}
$$

を扱います。[AQFT6のWeyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)と同じ符号で、実交代形式は

$$
\sigma(z,w)=2\operatorname{Im}\sum_{j\ge1}\overline{z_j}w_j
$$

です。和は有限和です。$z$ は複素座標で表していますが、$\mathcal V_{\mathrm{fin}}$ は**実**ベクトル空間です。$\sigma$ は非退化です。実際 $\sigma(z,w)=0$ が全ての $w$ に対して成立すれば、$w=iz$ を選んで $\sigma(z,iz)=2\|z\|^2=0$、したがって $z=0$ です。

対称Fock空間 $\mathcal F=\mathcal F_s(\mathfrak h)$ の零粒子ベクトルを $\Omega$ とします。生成・消滅演算子 $a^\dagger(z)$、$a(z)$ はそれぞれ線形・反線形で、有限粒子上で $[a(z),a^\dagger(w)]=\sum_j\overline{z_j}w_j$ を満たします。[AQFT8の表現](../AQFT8/index.md#def-aqft8-fock-weyl)の $W_{\mathcal F}(h)=e^{i(a(h)+a^\dagger(h))}$ に $h=-iz$ を代入した変位ユニタリを

$$
D(z):=\exp\bigl(a^\dagger(z)-a(z)\bigr)=W_{\mathcal F}(-iz)
$$

と書きます。指数は自己共役な場の $i$ 倍から定まる有界ユニタリであり、右辺は生成・消滅演算子の形式的な級数の定義ではありません。[AQFT8のWeyl積](../AQFT8/index.md#prop-aqft8-fock-weyl)に $h=-iz,k=-iw$ を代入すると

$$
D(z)D(w)
=e^{-i\operatorname{Im}\sum_j\overline{z_j}w_j}D(z+w)
=e^{-i\sigma(z,w)/2}D(z+w),
\qquad D(z)^*=D(-z)
$$

となります。また真空期待値は $\langle\Omega,D(z)\Omega\rangle=e^{-\|z\|^2/2}$ です。

<a id="def-aqft10-finite-mode-algebra"></a>

<!-- formal-statement-start -->
> **定義（有限支持CCR代数と有限モード代数）**  
> $\mathcal V_{\mathrm{fin}}$ の上記の交代形式とWeyl関係から得られる単位的C*環を $\mathfrak A$ とし、最初の $N$ 座標に支持を持つWeyl元が生成する部分環を $\mathfrak A_N$ とする。
$$
\mathfrak A_N
=C^*\{W(z):z_j=0\ (j>N)\},\qquad
\mathfrak A=\overline{\bigcup_{N\ge1}\mathfrak A_N}^{\|\cdot\|}.
$$
> $\pi_0(W(z))=D(z)$ を真空Fock表現とし、$\omega_0(W(z))=e^{-\|z\|^2/2}$ をその真空状態とする。ここでC*ノルムは[AQFT6の具体的なWeyl代数構成](../AQFT6/index.md#prop-aqft6-twisted-translation)を用い、[AQFT7の表現ノルム評価](../AQFT7/index.md#thm-aqft7-quasifree-state)によって $\pi_0$ が連続に延長する。
<!-- formal-statement-end -->

この定義の重要な点は、**元の代数の各元は有限モード観測量でノルム近似できる**一方、無限個のモードに一度に作用する変位 $D(\alpha)$ は、$\alpha\notin\ell^2$ なら最初からFock空間上のユニタリとして定義されないことです。

<!-- definition-example-start: def-aqft10-finite-mode-algebra -->
### 直接例：最初の二つのモード

**定義の確認**。二モードの座標を使って交代形式・Weyl位相・有限部分環への所属を順に確かめます。

$z=e_1$、$w=ie_1$ とすると $\sigma(z,w)=2$ です。従って

$$
D(e_1)D(ie_1)=e^{-i}D((1+i)e_1),\quad
D(ie_1)D(e_1)=e^{i}D((1+i)e_1).
$$

これは[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)の符号を直接検証します。$z=e_1,w=e_2$ では $\sigma(z,w)=0$ なので異なる二モードのユニタリは可換です。$D(e_1),D(ie_1),D(e_2),D(ie_2)$ は $\pi_0(\mathfrak A_2)$ に属し、各座標の任意の実線形結合が含まれます。有限支持の全ての $z$ はいずれかの $\mathfrak A_N$ に入るので、定義の和集合は $\mathfrak A$ を生成します。
<!-- definition-example-end -->

## 2. 変位状態を先に有限次元で作る

任意の複素数列 $\alpha=(\alpha_j)_{j\ge1}$ を一つ選びます。$\alpha$ が $\ell^2$ に属するとは、$\sum_j|\alpha_j|^2<\infty$ であることです。まだこの条件を課しません。$\alpha^{(N)}=\sum_{j=1}^N\alpha_j e_j$ は常に $\ell^2$ に属するため、有限変位ベクトル $\Psi_N=D(\alpha^{(N)})\Omega$ はノルム1で存在します。

<a id="def-aqft10-coherent-shift-state"></a>

<!-- formal-statement-start -->
> **定義（有限支持CCR上の変位状態）**  
> 複素数列 $\alpha$ に対し、有限支持の $z$ について次のWeyl期待値を持つ状態を $\omega_\alpha$ と呼ぶ。
$$
\omega_\alpha(W(z))
=\exp\left(
-\frac{\|z\|^2}{2}
+\sum_j(z_j\overline{\alpha_j}-\overline{z_j}\alpha_j)
\right).
$$
> 和は $z$ の支持上の有限和であり、$\alpha\in\ell^2$ は要求しない。
<!-- formal-statement-end -->

式の後半は純虚数です。位相を与えるだけなので期待値の絶対値は真空と同じですが、状態が同じとは限りません。**まず有限モードで存在と正値性を証明する**ことが必要です。

<!-- definition-example-start: def-aqft10-coherent-shift-state -->
### 直接例：一モードの位相と正値性

**定義の確認**。真空からの変位でWeyl期待値の位相と、有限モードでの正値性を直接計算します。

$\alpha_1=c\in\mathbb R$、$\alpha_j=0$（$j>1$）とします。$z=t e_1$（$t\in\mathbb R$）なら位相項が消え、

$$
\omega_\alpha(W(te_1))=e^{-t^2/2}.
$$

一方 $z=it e_1$ では $z_1\bar\alpha_1-\bar z_1\alpha_1=2itc$ なので

$$
\omega_\alpha(W(it e_1))=e^{-t^2/2+2itc}.
$$

$D(c e_1)\Omega$ のベクトル状態をWeyl積で計算すると実際この式になります。従って $\omega_\alpha(1)=1$ であり、任意の $A\in\mathfrak A_1$ に対し $\omega_\alpha(A^*A)=\|\,\pi_0(A)D(ce_1)\Omega\,\|^2\ge0$ です。単に指数の絶対値が1以下というだけで正値性を推測していません。
<!-- definition-example-end -->

<a id="prop-aqft10-shift-existence"></a>

<!-- formal-statement-start -->
> **命題（無限列でも変位状態は存在する）**  
> 上記の任意の複素数列 $\alpha$ に対して $\omega_\alpha$ は $\mathfrak A$ 上の一意な状態を定める。各 $N$ への制限は、有限変位ベクトル $\Psi_N$ のベクトル状態に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

有限個のWeyl元なら、変位を十分多くのモードへ伸ばしても期待値は変わりません。有限ベクトル状態の正値性と一様ノルム評価を、ノルム稠密な有限Weyl多項式から全代数へ延長します。

<!-- proof-start -->
### 証明

まず有限支持の $z$ に対し、[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)を二度適用して

$$
D(-\alpha^{(N)})D(z)D(\alpha^{(N)})
=e^{\sum_{j\le N}(z_j\bar\alpha_j-\bar z_j\alpha_j)}D(z)
$$

を得ます。例えば最初の積の位相は $e^{-i\sigma(-\alpha^{(N)},z)/2}$、次の積の位相は $e^{-i\sigma(z-\alpha^{(N)},\alpha^{(N)})/2}$ であり、積をまとめると表示した指数になります。従って $\omega_{\alpha,N}(A):=\langle\Psi_N,\pi_0(A)\Psi_N\rangle$ は $\mathfrak A$ 上の状態で、

$$
\omega_{\alpha,N}(W(z))
=e^{-\|z\|^2/2}
e^{\sum_{j\le N}(z_j\bar\alpha_j-\bar z_j\alpha_j)}.
$$

$A=\sum_{k=1}^m c_k W(z^{(k)})$ を有限Weyl多項式とすると、全ての $z^{(k)}$ の支持が $\{1,\ldots,M\}$ に含まれるよう $M$ を取れます。このとき $N\ge M$ なら $\omega_{\alpha,N}(A)$ は $N$ に依存しません。その安定値を $\omega_\alpha(A)$ とします。

$\omega_{\alpha,N}$ はノルム1の状態なので $|\omega_\alpha(A)|\le\|A\|$、$\omega_\alpha(A^*A)\ge0$、$\omega_\alpha(1)=1$ です。有限多項式が $\mathfrak A$ にノルム稠密であるため、例えば $A_m\to A$ なら $|\omega_\alpha(A_m)-\omega_\alpha(A_n)|\le\|A_m-A_n\|$ より極限が存在し、近似列に依存しません。さらに $A_m^*A_m\to A^*A$ なので正値性も維持されます。一意性は有限Weyl多項式への一致と連続性から従います。
<!-- proof-end -->

<a id="prop-aqft10-square-summable"></a>

<!-- formal-statement-start -->
> **命題（二乗可和な変位はFockユニタリで実装できる）**  
> $\alpha\in\ell^2(\mathbb N)$ なら $D(\alpha)$ がFock空間上に存在し、
$$
\omega_\alpha(A)
=\langle D(\alpha)\Omega,\pi_0(A)D(\alpha)\Omega\rangle
\quad(A\in\mathfrak A).
$$
> 従って $\omega_\alpha$ のGNS表現は真空Fock表現 $\pi_0$ とユニタリ同値である。
<!-- formal-statement-end -->

### 証明の見取り図

有限変位ベクトルの収束には位相だけでなく**ノルム**を検査します。最後のGNS同値には、変位ベクトルが $\pi_0(\mathfrak A)$ に対して巡回であることも必要です。

<!-- proof-start -->
### 証明

$\alpha^{(N)}\to\alpha$ は $\ell^2$ ノルム収束です。[Fock Weyl関係と真空特性汎関数](../AQFT8/index.md#prop-aqft8-fock-weyl)から、位相のない互いに直交な座標差に対し

$$
\langle\Psi_M,\Psi_N\rangle
=e^{-\|\alpha^{(N)}-\alpha^{(M)}\|^2/2}
\quad(N\ge M),
$$

ゆえに $\|\Psi_N-\Psi_M\|^2=2(1-e^{-\|\alpha^{(N)}-\alpha^{(M)}\|^2/2})\to0$ です。Fock空間の完備性から $\Psi_N$ は $\Psi=D(\alpha)\Omega$ へノルム収束します。Weyl表示の強連続性によっても同じ結論が得られます。

有限支持Weyl元の期待値は[前命題](#prop-aqft10-shift-existence)の式に一致し、ノルム稠密性から全 $\mathfrak A$ で一致します。さらに $D(\alpha)\pi_0(W(z))D(\alpha)^*$ は単なる位相倍の $\pi_0(W(z))$ なので、$\pi_0(\mathfrak A)\Psi$ の閉線形包は $D(\alpha)\pi_0(\mathfrak A)\Omega$ の閉線形包と同じです。[AQFT8の真空Fock巡回性](../AQFT8/index.md#prop-aqft8-gns-fock)から後者は $\mathcal F$。よって[OA5のGNS一意性](../../OA/OA5/index.md#thm-oa5-gns-uniqueness)が両表現のユニタリ同値を与えます。
<!-- proof-end -->

## 3. 変位の総量が無限大なら何が破れるか

例えば $\alpha_j=c\ne0$ がすべての $j$ で一定なら

$$
\|\alpha^{(N)}\|^2=N|c|^2\to\infty,\qquad
|\langle\Omega,\Psi_N\rangle|=e^{-N|c|^2/2}\to0.
$$

ただし、**重なりが零へ向かうことだけでは非同値性を証明できません**。一つのHilbert空間にも互いにほぼ直交する単位ベクトルの列はあります。ここでは[AQFT9の正規性と表現の区別](../AQFT9/index.md#prop-aqft9-nonnormal-extension)を使い、より強い矛盾を作ります。

[QM8の有限自由度Stone–von Neumann定理](../../QM/QM8/index.md#thm-qm8-stone-von-neumann)および有限個のモードのテンソル積構成から、Fock空間の分解

$$
\mathcal F_s(\ell^2)
\cong \mathcal F_s(\mathbb C^N)\otimes
\mathcal F_s(\ell^2(\{N+1,N+2,\ldots\}))
$$

のもとで $\pi_0(\mathfrak A_N)''=B(\mathcal F_s(\mathbb C^N))\otimes I$ です。各モードのWeyl表示が規則的で既約なので、その可換子がスカラーになることを一モードずつ使えば、この等式を得ます。

最初の $N$ モードを変位した規格化ベクトルを $\Psi_{\alpha,N}=D(\alpha^{(N)})\Omega_{\le N}$ とします。最初の $N$ モードが**正確にそのコヒーレントベクトルにある**ことを検査する射影を

$$
R_N:=|\Psi_{\alpha,N}\rangle\langle\Psi_{\alpha,N}|
\otimes I_{>N}\ \in \pi_0(\mathfrak A_N)''
$$

と定義します。これは元のC*環の元だと主張するのではなく、**Fock表現における有限モードのvon Neumann閉包の射影**です。

<a id="lem-aqft10-coherent-projection-limit"></a>

<!-- formal-statement-start -->
> **補題（発散する変位の射影列）**  
> $\sum_{j\ge1}|\alpha_j|^2=\infty$ なら、上記の射影は $R_{N+1}\le R_N$ を満たし、$N\to\infty$ で $R_N\to0$ が強作用素位相で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

射影の単調性だけでは極限が零か分かりません。有限モードにだけ励起を持つ稠密なベクトル族に作用させ、**未励起の尾部**から出るコヒーレント重なりの積でノルムを評価します。

<!-- proof-start -->
### 証明

Fock空間のテンソル分解では $\Psi_{\alpha,N+1}=\Psi_{\alpha,N}\otimes D(\alpha_{N+1}e_{N+1})\Omega_{N+1}$ です。このベクトルへの射影は $\Psi_{\alpha,N}$ への射影より狭い範囲を選ぶため、$R_{N+1}\le R_N$ です。

$\xi$ を最初の $M$ モードだけに励起を持つベクトルとします。すなわち $\xi=\xi_{\le M}\otimes\Omega_{>M}$ です。$N>M$ のとき

$$
\begin{aligned}
\|R_N\xi\|
&=|\langle\Psi_{\alpha,N},\,
\xi_{\le M}\otimes\Omega_{M<j\le N}\rangle|\\
&=|\langle\Psi_{\alpha,M},\xi_{\le M}\rangle|
\prod_{j=M+1}^N|\langle D(\alpha_j e_j)\Omega_j,\Omega_j\rangle|\\
&\le \|\xi\|\exp\left(-\frac12\sum_{j=M+1}^N|\alpha_j|^2\right)\longrightarrow0.
\end{aligned}
$$

最後の極限は非負項級数の尾部が発散するためです。有限モード励起ベクトルは $\mathcal F_s(\ell^2)$ に稠密です。各 $R_N$ は射影で $\|R_N\|\le1$ なので、任意の $\eta$ とその稠密近似 $\xi$ について $\|R_N\eta\|\le\|\eta-\xi\|+\|R_N\xi\|$。近似に伴うノルム差を先に任意に小さくすれば、全ての $\eta$ で $R_N\eta\to0$ です。
<!-- proof-end -->

<a id="thm-aqft10-inequivalent-gns"></a>

<!-- formal-statement-start -->
> **定理（非二乗可和変位状態のGNS非同値性）**  
> 有限支持Weyl C*環 $\mathfrak A$ とその真空Fock表現 $\pi_0$ を上のように固定する。複素数列 $\alpha$ が次の条件を満たすとする。

$$
\sum_{j\ge1}|\alpha_j|^2=\infty
$$

> このとき状態 $\omega_\alpha$ は $\pi_0(\mathfrak A)''$ 上の正規状態には延長できない。特に $\omega_\alpha$ のGNS表現は $\pi_0$ とユニタリ同値ではない。これに対し $\alpha\in\ell^2$ なら[二乗可和変位の命題](#prop-aqft10-square-summable)によりユニタリ同値である。
<!-- formal-statement-end -->

### 証明の見取り図

仮に元のFock表現に正規な延長があるなら、各有限モード代数への制限は同じコヒーレントベクトル状態です。そのため各 $R_N$ の期待値は1になります。しかし[補題](#lem-aqft10-coherent-projection-limit)の強収束と正規性は期待値が0へ行くことを強制します。

<!-- proof-start -->
### 証明

正規延長 $\varphi$ が $\pi_0(\mathfrak A)''$ 上に存在すると仮定します。$\varphi(\pi_0(A))=\omega_\alpha(A)$（$A\in\mathfrak A$）です。$N$ を一つ固定します。$\varphi$ を $\pi_0(\mathfrak A_N)''=B(\mathcal F_s(\mathbb C^N))\otimes I$ に制限すると正規です。一方、有限モードの $\Psi_{\alpha,N}$ のベクトル状態も正規で、[無限列でも変位状態は存在する命題](#prop-aqft10-shift-existence)より両者は $\pi_0(\mathfrak A_N)$ 上で一致します。

[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)によれば、$\pi_0(\mathfrak A_N)$ はその二重可換子の弱作用素位相で稠密です。また一様ノルム有界な近似では[VN4の位相比較](../../VN/VN4/index.md#prop-vn4-wot-ultraweak)によりultraweakにも収束します。従って両**正規**汎関数は二重可換子上でも一致します。とくに

$$
\varphi(R_N)
=\langle\Psi_{\alpha,N},R_N\Psi_{\alpha,N}\rangle=1.
$$

一方、[補題](#lem-aqft10-coherent-projection-limit)から $R_N\downarrow0$ です。[VN5の正規汎関数の定義](../../VN/VN5/index.md#def-vn5-normal-functional)に従い、正規状態は単調な射影列の極限を保つので $\varphi(R_N)\downarrow\varphi(0)=0$ のはずです。これは $\varphi(R_N)=1$ と矛盾します。

最後に、GNS表現 $\pi_\alpha$ が $\pi_0$ とユニタリ同値であれば、あるユニタリ $U:\mathcal H_{\omega_\alpha}\to\mathcal F$ により $U\pi_\alpha(A)U^*=\pi_0(A)$ が成立します。このとき $\eta=U\Omega_\alpha$ とおけば $\omega_\alpha(A)=\langle\eta,\pi_0(A)\eta\rangle$ です。ベクトル状態 $X\mapsto\langle\eta,X\eta\rangle$ は[AQFT9の正規ベクトル状態](../AQFT9/index.md#prop-aqft9-local-normal-state)と同じ理由で $\pi_0(\mathfrak A)''$ 上で正規です。上で否定した延長を作ってしまうので、ユニタリ同値も不可能です。
<!-- proof-end -->

**どこが無限次元特有か。** 任意の固定した $N$ では $\Psi_{\alpha,N}$ は正しいFockベクトルで、有限モードの規則的既約表現の同値性は一度も壊れていません。破れるのは**全ての $N$ を同時に一つの正規ベクトル状態で実現する**段階です。これがStone–von Neumannの有限次元結論と矛盾しない理由です。

## 4. van Hove型の線形源模型に戻す

変位 $\alpha$ は人工的に選んだ数列だけではありません。独立な振動子の位置に線形な外部源を加えると、平方完成によって同じ量が現れます。以下でいう**基底状態**は、[MQ2の定義](../../../物理系/MQ/MQ2/index.md#def-mq2-ground-state)のとおり、Hamiltonianのスペクトル下端を固有値として実現する規格化ベクトルです。以下では $\hbar=1$、$\omega_j>0$、$h_j\in\mathbb R$ とし、最初の $N$ モードのHamiltonianを、零点エネルギーを除いて

$$
H_N=\sum_{j=1}^N
\left\{\omega_j a_j^\dagger a_j
-\frac{h_j}{\sqrt{2\omega_j}}(a_j+a_j^\dagger)\right\}
$$

とします。有限個の振動子に関する式なので、有限粒子共通定義域で平方完成し、通常の自己共役作用素の閉包で扱えます。

<a id="prop-aqft10-van-hove-displacement"></a>

<!-- formal-statement-start -->
> **命題（線形源Hamiltonianの平方完成と変位）**  
> 各 $\omega_j>0$、$h_j\in\mathbb R$ を固定し、
$$
\alpha_j=\frac{h_j}{\sqrt2\,\omega_j^{3/2}}
$$
> とおく。任意の有限 $N$ について
$$
H_N=\sum_{j=1}^N\omega_j
(a_j^\dagger-\alpha_j)(a_j-\alpha_j)
-\sum_{j=1}^N\frac{h_j^2}{2\omega_j^2}.
$$
> 最低エネルギーは $-\sum_{j\le N}h_j^2/(2\omega_j^2)$、規格化基底状態は $D(\alpha^{(N)})\Omega$ である。無限モード状態の真空Fock表現での実装可否は
$$
\sum_{j\ge1}\frac{h_j^2}{2\omega_j^3}<\infty
$$
> で判定され、発散すれば[非同値性定理](#thm-aqft10-inequivalent-gns)が適用される。
<!-- formal-statement-end -->

### 証明の見取り図

位置変数の源結合を生成・消滅演算子で書いた後、**線形項と定数項の両方**を比較します。有限モードの基底状態を求める操作と、無限モードの極限で元のFock表現に残るかという問題を分けます。

<!-- proof-start -->
### 証明

各 $j$ について $\alpha_j$ は実数なので

$$
\begin{aligned}
\omega_j(a_j^\dagger-\alpha_j)(a_j-\alpha_j)
&=\omega_ja_j^\dagger a_j
-\omega_j\alpha_j(a_j+a_j^\dagger)
+\omega_j\alpha_j^2\\
&=\omega_ja_j^\dagger a_j
-\frac{h_j}{\sqrt{2\omega_j}}(a_j+a_j^\dagger)
+\frac{h_j^2}{2\omega_j^2}.
\end{aligned}
$$

これを全 $j\le N$ で足して定数を引けば表示式になります。各 $(a_j-\alpha_j)^\dagger(a_j-\alpha_j)$ は非負です。[Fock Weyl関係と真空特性汎関数](../AQFT8/index.md#prop-aqft8-fock-weyl)の証明で用いた指数ベクトル $\varepsilon(v)$ に対して $a_j\varepsilon(v)=v_j\varepsilon(v)$ です。$D(\alpha^{(N)})\Omega=e^{-\|\alpha^{(N)}\|^2/2}\varepsilon(\alpha^{(N)})$ なので

$$
\begin{aligned}
(a_j-\alpha_j)D(\alpha^{(N)})\Omega
&=e^{-\|\alpha^{(N)}\|^2/2}
(a_j-\alpha_j)\varepsilon(\alpha^{(N)})\\
&=e^{-\|\alpha^{(N)}\|^2/2}
(\alpha_j-\alpha_j)\varepsilon(\alpha^{(N)})=0.
\end{aligned}
$$

従ってこのベクトルが下界を達成します。有限 $N$ の全モードの真空の一意性から基底状態は位相を除き一意です。$N\to\infty$ で $\sum_j|\alpha_j|^2=\sum_jh_j^2/(2\omega_j^3)$ が有限なら[二乗可和の命題](#prop-aqft10-square-summable)が適用され、発散なら[非同値性定理](#thm-aqft10-inequivalent-gns)が適用されます。無限和のHamiltonianそのものが自己共役作用素として存在するとは、この計算では主張していません。
<!-- proof-end -->

**発散する直接例。** $\omega_j=h_j=1$ なら $\alpha_j=1/\sqrt2$ で

$$
\sum_{j=1}^N|\alpha_j|^2=N/2,\quad
E_N=-N/2,\quad
\langle\Omega,D(\alpha^{(N)})\Omega\rangle=e^{-N/4}.
$$

どの有限 $N$ でも $D(\alpha^{(N)})$ はユニタリです。しかし無限モードの状態は、単なるエネルギーの定数項を引き直しても元の真空Fock空間へ正規な状態として実装できません。エネルギー発散と**表現非同値**は概念上別であり、後者の根拠は第3節の射影列の証明です。

**収束する対照例。** $\omega_j=1$、$h_j=2^{-j}$ なら

$$
\sum_{j\ge1}|\alpha_j|^2
=\frac12\sum_{j\ge1}4^{-j}=\frac16.
$$

ゆえに $D(\alpha)$ が存在して、極限状態は真空表現とユニタリ同値です。両例の差はモード数がどちらも無限であることではなく、**必要な変位の二乗可和性**にあります。

## 5. 量子場の局所netと混同しない

ここでの $\mathfrak A_N$ は**最初の $N$ 個の振動子を選ぶ代数**です。$N$ はMinkowski時空の領域 $O$ ではなく、$\mathfrak A_N$ の包含を[AQFT2のEinstein局所性](../AQFT2/index.md#def-aqft2-locality)や場の空間的分離と同一視してはいけません。一方、Weyl元からC*代数を作り、状態を取り、[AQFT9のGNS局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net)へ進む論理は共通です。

自由Klein–Gordon場では一粒子空間が連続運動量の関数空間になり、正周波数分解と真空が[AQFT8](../AQFT8/index.md#def-aqft8-positive-frequency)で与えられました。異なる場の状態を比較する際には「有限の測定で値が定まるか」と「**同じHilbert空間上の正規状態として表せるか**」を分ける必要があります。非同値表現の存在だけから、局所von Neumann環のType III性・Reeh–Schlieder性・一般相互作用模型の存在は導けません。

## 6. 演習と詳細解答

### Level A：定義・符号・基礎計算

<a id="ex-aqft10-a01"></a>
#### AQFT10-A01 交代形式の非退化性
- Level: A

$\mathcal V_{\mathrm{fin}}$ と $\sigma(z,w)=2\operatorname{Im}\sum_j\bar z_jw_j$ について、交代性と非退化性を直接示せ。

<!-- solution-start -->
**詳細解答。** $\sum_j\bar z_j z_j=\|z\|^2$ は実数だから $\sigma(z,z)=0$。また $\overline{\sum_j\bar z_jw_j}=\sum_j\bar w_jz_j$ なので $\sigma(w,z)=-\sigma(z,w)$。$\sigma(z,w)=0$ が全 $w$ で成立すると仮定し、有限支持を保つ $w=iz$ を代入すると $\sigma(z,iz)=2\operatorname{Im}(i\|z\|^2)=2\|z\|^2=0$。従って $z=0$ です。
<!-- solution-end -->

<a id="ex-aqft10-a02"></a>
#### AQFT10-A02 変位Weyl積の位相
- Level: A

$z=e_1,w=2ie_1$ に対して $\sigma(z,w)$ と $D(z)D(w)$、$D(w)D(z)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\sum_j\bar z_jw_j=2i$ なので $\sigma(z,w)=4$。よって[Weyl積](../AQFT6/index.md#def-aqft6-weyl-ccr)により

$$
D(z)D(w)=e^{-2i}D((1+2i)e_1),\quad
D(w)D(z)=e^{2i}D((1+2i)e_1).
$$

位相は逆符号であり、$e^{-2i}\ne e^{2i}$ なので二つの作用素は可換ではありません。
<!-- solution-end -->

<a id="ex-aqft10-a03"></a>
#### AQFT10-A03 一モード状態の位相
- Level: A

$\alpha_1=2$、$z=3ie_1$ のとき $\omega_\alpha(W(z))$ を求め、絶対値が1以下であることを示せ。

<!-- solution-start -->
**詳細解答。** $\|z\|^2=9$、$z_1\bar\alpha_1-\bar z_1\alpha_1=6i-(-6i)=12i$ です。従って

$$
\omega_\alpha(W(3ie_1))=e^{-9/2+12i},
\qquad |\omega_\alpha(W(3ie_1))|=e^{-9/2}<1.
$$

この評価だけでは状態の正値性を証明できず、[存在命題](#prop-aqft10-shift-existence)の有限ベクトル状態からの構成が必要です。
<!-- solution-end -->

<a id="ex-aqft10-a04"></a>
#### AQFT10-A04 二乗可和性の判定
- Level: A

$\alpha_j=j^{-1}$ と $\beta_j=j^{-1/2}$ のそれぞれが $\ell^2$ に属するか判定し、有限変位真空の重なりの極限を述べよ。

<!-- solution-start -->
**詳細解答。** $\sum_j|\alpha_j|^2=\sum_jj^{-2}<\infty$ なので $\alpha\in\ell^2$、$\sum_j|\beta_j|^2=\sum_jj^{-1}=\infty$ なので $\beta\notin\ell^2$ です。[AQFT8の真空期待値](../AQFT8/index.md#prop-aqft8-fock-weyl)から重なりは $e^{-\|\alpha^{(N)}\|^2/2}$ と $e^{-\|\beta^{(N)}\|^2/2}$。前者は $e^{-\frac12\sum_jj^{-2}}>0$ に、後者は0に収束します。後者の**非同値性**は重なりだけでなく[第3節の定理](#thm-aqft10-inequivalent-gns)で証明されます。
<!-- solution-end -->

<a id="ex-aqft10-a05"></a>
#### AQFT10-A05 線形源の平方完成
- Level: A

一モードで $\omega=2,h=4$ とするとき、変位 $\alpha$、平方完成の定数項、基底エネルギーを求めよ。

<!-- solution-start -->
**詳細解答。** 定義より $\alpha=4/(\sqrt2\,2^{3/2})=1$。そこで

$$
H=2a^\dagger a-\frac4{\sqrt4}(a+a^\dagger)
=2a^\dagger a-2(a+a^\dagger)
=2(a^\dagger-1)(a-1)-2.
$$

基底状態は $D(1)\Omega$ で、非負な第一項が零になるためエネルギーは $-2=-h^2/(2\omega^2)$ です。
<!-- solution-end -->

### Level B：証明の接続と限界の判定

<a id="ex-aqft10-b01"></a>
#### AQFT10-B01 有限モード制限から全状態を構成
- Level: B

$\alpha_j=1$（すべての $j$）とする。$\omega_{\alpha,N}(A)=\langle D(\alpha^{(N)})\Omega,\pi_0(A)D(\alpha^{(N)})\Omega\rangle$ が、任意の有限Weyl多項式について十分大きい $N$ で安定することを示し、ノルム閉包へ正の状態として延長する理由を述べよ。

<!-- solution-start -->
**詳細解答。** $A=\sum_{k=1}^m c_kW(z^{(k)})$ とし、全ての $z^{(k)}$ の支持が最初の $M$ 座標内に入るよう $M$ を取ります。$N\ge M$ では各期待値が

$$
\omega_{\alpha,N}(W(z^{(k)}))
=\exp\left(-\|z^{(k)}\|^2/2+
\sum_{j\le M}(z_j^{(k)}-\overline{z_j^{(k)}})\right)
$$

となるので $N$ に依存しません。線形性から $A$ も安定します。任意の有限多項式 $B$ に対して $N$ をその支持より大きく取ると $\omega_\alpha(B^*B)=\omega_{\alpha,N}(B^*B)\ge0$ です。$|\omega_\alpha(B)|\le\|B\|$ と $\omega_\alpha(1)=1$ は各有限ベクトル状態から従います。ノルム近似 $B_m\to A$ に対して値はCauchy列になり、$B_m^*B_m\to A^*A$ から延長後も正です。よって $\alpha\notin\ell^2$ でも$\mathfrak A$ 上の状態が存在します。
<!-- solution-end -->

<a id="ex-aqft10-b02"></a>
#### AQFT10-B02 射影が消えるのに期待値が1
- Level: B

$\alpha_j=j^{-1/2}$ とし、第3節の $R_N$ について、有限モード励起 $\xi=\xi_{\le M}\otimes\Omega_{>M}$ に対して $\|R_N\xi\|\to0$ を確認せよ。また $\omega_\alpha$ の仮想的なFock正規延長がなぜ存在できないか述べよ。

<!-- solution-start -->
**詳細解答。** $\sum_{j=M+1}^N|\alpha_j|^2=\sum_{j=M+1}^Nj^{-1}\to\infty$ です。[射影列補題](#lem-aqft10-coherent-projection-limit)の内積計算から

$$
\|R_N\xi\|
\le \|\xi\|\exp\left(-\frac12\sum_{j=M+1}^N\frac1j\right)\to0.
$$

有限モード励起は稠密、$\|R_N\|\le1$ なので強収束 $R_N\to0$。仮に正規延長 $\varphi$ があれば、有限モード制限はコヒーレント状態に一致するため $\varphi(R_N)=1$。しかし正規性と $R_N\downarrow0$ は $\varphi(R_N)\to0$ を要求し、矛盾します。$\omega_\alpha$ が**存在しない**のではなく、**固定したFock閉包に正規延長できない**という結論です。
<!-- solution-end -->

<a id="ex-aqft10-b03"></a>
#### AQFT10-B03 基底エネルギー発散と表現同値性
- Level: B

$\omega_j=j^2$、$h_j=j^{3/2}$（$j\ge1$）とする。線形源の変位の二乗和と、有限基底エネルギーの定数項を計算せよ。エネルギーが $-\infty$ に向かってもFock実装が可能な理由を説明せよ。

<!-- solution-start -->
**詳細解答。** [平方完成命題](#prop-aqft10-van-hove-displacement)の変位係数は

$$
\alpha_j=\frac{j^{3/2}}{\sqrt2\,(j^2)^{3/2}}
=\frac1{\sqrt2\,j^{3/2}},
\qquad
\sum_{j\ge1}|\alpha_j|^2
=\frac12\sum_{j\ge1}\frac1{j^3}<\infty.
$$

従って[二乗可和な変位はFockユニタリで実装できる命題](#prop-aqft10-square-summable)により、極限変位状態は真空Fock表現とユニタリ同値です。一方、有限 $N$ での最低エネルギーは

$$
E_N=-\sum_{j=1}^N\frac{h_j^2}{2\omega_j^2}
=-\frac12\sum_{j=1}^N\frac{j^3}{j^4}
=-\frac12\sum_{j=1}^N\frac1j\longrightarrow-\infty.
$$

エネルギーの式には $\omega_j^{-2}$、二乗変位には $\omega_j^{-3}$ が掛かります。大きい周波数ほど両者の収束条件が違うため、エネルギーの定数項の発散から表現の非同値を推論できません。また無限和のHamiltonianの存在・下界は別問題です。
<!-- solution-end -->

<a id="ex-aqft10-b04"></a>
#### AQFT10-B04 Stone–von Neumannの仮定の検査
- Level: B

有限モードのFock表現、同じ表現の二つの直和、非二乗可和な $\alpha$ による無限モード変位状態のGNS表現について、[QM8のStone–von Neumann定理](../../QM/QM8/index.md#thm-qm8-stone-von-neumann)をどの範囲に適用できるか説明せよ。

<!-- solution-start -->
**詳細解答。** 有限モードFock表現は有限個の正準対を持ち、Weylパラメータに強連続、かつ有限モードの全Weyl演算子が生成する代数の可換子はスカラーなので既約です。よって定理の有限次元版の射程に入ります。二つの直和は規則的でも、一方の直和成分への射影が非自明な可換子に属するため既約ではありません。無限モード変位GNSは各有限部分では規則的既約な表現と同値であっても、全モードを一つにした空間は有限自由度ではありません。したがって定理の前提が外れ、[非同値性定理](#thm-aqft10-inequivalent-gns)と矛盾しません。規則性だけで無限モードの一意性を主張してはいけません。
<!-- solution-end -->

### Level C：存在・実装・非同値性をまとめる

<a id="ex-aqft10-c01"></a>
#### AQFT10-C01 van Hove型模型の三段階判定
- Level: C

独立なモードについて $\omega_j=1$、$h_j=j^{-s}$（$s\ge0$）とし、最初の $N$ モードの $H_N$ と、変位状態 $\omega_\alpha$ を考える。

1. $H_N$ の平方完成、基底状態、真空との重なりを求めよ。
2. $s>1/2$ と $0\le s\le1/2$ に分け、変位状態の存在とFock実装可能性を区別せよ。
3. 実装不可能な範囲について、単なる重なりの極限ではなく射影列を用いてGNS非同値性を証明せよ。最後に、この模型から局所von Neumann環のType III性が導けない理由も述べよ。

<!-- solution-start -->
**詳細解答。** **（1）** $\alpha_j=j^{-s}/\sqrt2$ とおくと、各モードの平方完成から

$$
H_N=\sum_{j=1}^N(a_j^\dagger-\alpha_j)(a_j-\alpha_j)
-\frac12\sum_{j=1}^Nj^{-2s}.
$$

各平方項は非負で、$D(\alpha^{(N)})\Omega$ に作用すると零です。従って基底エネルギーは $-\frac12\sum_{j\le N}j^{-2s}$。真空との重なりは[AQFT8のWeyl真空期待値](../AQFT8/index.md#prop-aqft8-fock-weyl)から

$$
\langle\Omega,D(\alpha^{(N)})\Omega\rangle
=\exp\left(-\frac14\sum_{j=1}^Nj^{-2s}\right).
$$

**（2）** 任意の $s\ge0$ と任意の有限支持 $z$ について[変位状態の存在命題](#prop-aqft10-shift-existence)により $\omega_\alpha$ は存在します。$s>1/2$ なら $\sum_j|\alpha_j|^2=\frac12\sum_jj^{-2s}<\infty$ なので $D(\alpha)\Omega$ が存在し、GNSはFock表現とユニタリ同値です。$0\le s\le1/2$ では級数が発散するため、この実装はできません。

**（3）** 非実装側では $R_N=|D(\alpha^{(N)})\Omega_{\le N}\rangle\langle D(\alpha^{(N)})\Omega_{\le N}|\otimes I$ と置きます。$N>M$ で $\xi=\xi_{\le M}\otimes\Omega_{>M}$ に対して

$$
\|R_N\xi\|\le\|\xi\|
\exp\left(-\frac14\sum_{j=M+1}^Nj^{-2s}\right)\to0.
$$

稠密性と一様有界性から $R_N\downarrow0$ がSOTで成立します。仮に正規延長 $\varphi$ があれば、有限モードWeyl代数上で $\omega_\alpha$ と一致する正規汎関数はその二重可換子上でも一致するので $\varphi(R_N)=1$。正規性は $R_N\downarrow0$ から $\varphi(R_N)\to0$ を要求し、矛盾です。この矛盾により[非同値性定理](#thm-aqft10-inequivalent-gns)の仮定と結論を具体的な $s$ で再構成できました。

最後に $j$ は振動子の番号で、Minkowski領域の因果補集合や局所netの公理は導入していません。[AQFT2の局所性](../AQFT2/index.md#def-aqft2-locality)も局所Type III性も、この数列の級数判定だけからは出ません。
<!-- solution-end -->

## 7. 到達点と次講

有限モードの規則的既約Weyl表現の一意性は、**無限個のモードの状態がすべて同じFock表現に正規に実現できる**という主張ではありません。変位の二乗可和性が有限モードの同値性を無限極限へ運べる条件であることを、具体的なコヒーレント状態・射影列・van Hove型Hamiltonianで検算しました。

次のAQFT11では、非同値表現の存在とは別に、**正エネルギー真空**が平行移動の複素解析性へどのように結び付くかを調べ、Reeh–Schlieder定理への準備をします。
