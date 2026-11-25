# MQFC2 作用素値分布と共通稠密定義域

前講の[緩増加分布](../MQFC1/index.md#def-mqfc1-tempered)は試験関数を数値へ写しました。量子場では測定の重みを指定した後にも状態を変える作用が残ります。したがって試験関数を作用素へ写し、その行列要素が分布になるようにしたいのです。しかし作用素が非有界なら、二つの場を続けて作用させられるとは限りません。今回は積を定義できる領域を確保し、その上で自由場の連続性を粒子数ごとの評価から導きます。

内積は[QM5の随伴の規約](../../../解析系/QM/QM5/index.md#def-qm5-unbounded-adjoint)に合わせて第1引数で線形、第2引数で共役線形とします。時空は3+1次元、計量は $(-,+,+,+)$、$c=\hbar=1$ とします。

## 1. どの状態に場を繰り返し作用させられるか

Hilbert空間 $\mathcal H$ の線形部分空間 $D$ が稠密であるとは、その閉包が $\mathcal H$ であることです。各場が $D$ の元を再び $D$ へ送る（不変性）なら、有限回の積が同じ領域上で意味を持ちます。[共通不変領域上の交換関係](../../../解析系/QM/QM8/index.md#def-qm8-ccr-common-domain)と同じ要請です。

[Schwartz空間と半ノルム](../MQFC1/index.md#def-mqfc1-schwartz)を試験関数の空間とし、数値分布の連続性を使うには、入力試験関数を変え、二つの状態を固定して複素数の変化を測ります。共通領域上の線形自己写像全体を $\operatorname{End}(D)$ と書きます。ここではノルム有界性を要求しません。$\bar f$ は試験関数の各点での複素共役です。実数値の試験関数では場を内積の反対側へ移しても同じ作用素になるよう、複素試験関数では共役を伴う随伴条件を課します。これは[対称作用素](../../../解析系/QM/QM5/index.md#def-qm5-symmetric)の条件を複素線形な場へ広げたものです。

<a id="def-mqfc2-field-domain"></a>

<!-- formal-statement-start -->
> **定義（共通不変領域上の作用素値緩増加分布）**  
> 複素Hilbert空間 $\mathcal H$ と稠密な線形部分空間 $D$ に対し、複素線形写像

$$
\Phi:\mathcal S(\mathbb R^4)\longrightarrow\operatorname{End}(D)
$$

> が、任意の $\psi,\chi\in D$ について次の写像が緩増加分布であるという条件を満たすとき、共通不変領域上の作用素値緩増加分布とする。

$$
f\longmapsto\langle\Phi(f)\psi,\chi\rangle.
$$

> 実スカラー場に対応する随伴条件は、全ての試験関数と領域内の状態について

$$
\langle\Phi(f)\psi,\chi\rangle
=\langle\psi,\Phi(\bar f)\chi\rangle
$$

> が成立することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc2-field-domain -->
### 直接例：非有界な対角作用素

**定義の確認**。領域の稠密性・不変性・複素線形性・連続性と随伴条件を順に調べます。

$\mathcal H=\ell^2(\mathbb N)$、$D$ を有限個の成分しか非零でない列全体とします。$e_n$ は第 $n$ 成分だけが $1$ の標準単位ベクトルです。内積は $\langle\psi,\chi\rangle=\sum_{n\ge1}\psi_n\bar\chi_n$ です。任意の $\psi\in\mathcal H$ の第 $N$ 成分までを残した有限列を $\psi^{[N]}$ とすると

$$
\|\psi-\psi^{[N]}\|^2=\sum_{n>N}|\psi_n|^2\longrightarrow0
$$

なので $D$ は稠密です。[QM5の最小対角作用素](../../../解析系/QM/QM5/index.md#prop-qm5-minimal-diagonal-adjoint)と同じ $T:D\to D$ を、各成分を $n$ 倍する式で定めます。

$$
T\psi=(n\psi_n)_{n\ge1},
\qquad
\Phi(f)=f(0)T.
$$

ここで $0$ は時空原点です。有限列 $\psi=\sum_{n=1}^N\psi_n e_n$ は $T\psi=\sum_{n=1}^N n\psi_n e_n$ へ写るため、不変性が確認できます。$f,g$ を試験関数、$\alpha,\beta$ を複素数とすると点評価の線形性により $\Phi(\alpha f+\beta g)=\alpha\Phi(f)+\beta\Phi(g)$ です。固定した二状態について

$$
|\langle\Phi(f)\psi,\chi\rangle|
\le p_{0,0}(f)\|T\psi\|\|\chi\|
$$

となるので[緩増加分布](../MQFC1/index.md#def-mqfc1-tempered)の条件を満たします。対角表示で随伴条件を確かめられるのは、基底 $e_n$ が正規直交し、$Te_n=ne_n$ の係数 $n$ が実数だからです。実際、有限和で

$$
\begin{aligned}
\langle T\psi,\chi\rangle
&=\sum_{n\ge1}n\psi_n\bar\chi_n\\
&=\sum_{n\ge1}\psi_n\overline{n\chi_n}
=\langle\psi,T\chi\rangle.
\end{aligned}
$$

第2引数の共役線形性により

$$
\begin{aligned}
\langle\psi,\Phi(\bar f)\chi\rangle
&=\langle\psi,\overline{f(0)}T\chi\rangle\\
&=f(0)\langle\psi,T\chi\rangle
=\langle\Phi(f)\psi,\chi\rangle.
\end{aligned}
$$

これで随伴条件も確認できました。第 $n$ 単位ベクトルで $\|Te_n\|=n$ となるため、$f(0)\ne0$ なら作用素ノルムは有限ではありません。
<!-- definition-example-end -->

稠密であるだけでは積は保証されません。例えば同じ $D$ で $B\psi=\psi_1 v$、$v_n=1/n$ とします。

$$
\|v\|^2=\sum_{n\ge1}n^{-2}<\infty,
\qquad
\|B\psi\|=|\psi_1|\|v\|\le\|\psi\|\|v\|.
$$

従って $B:D\to\ell^2$ は有界です。しかし $Be_1=v\notin D$ なので上の $TBe_1$ は定義されません。さらに成分式で延長しようとしても $(nv_n)_n=(1,1,\dots)$ は二乗可積分ではありません。不変性が積の定義を保証していたことが分かります。

## 2. 随伴条件が保証すること

作用素の随伴は、内積を移せる最大の定義域を持ちます。作用素 $A$ の定義域を $\operatorname{Dom}A$（QM5での $D(A)$）、随伴を $A^*$ と書きます。ここでは[稠密定義作用素の随伴](../../../解析系/QM/QM5/index.md#def-qm5-unbounded-adjoint)を使い、共通領域での等式と作用素全体の等式を区別します。グラフの閉包が再び作用素のグラフになる性質を可閉性といい、実試験関数では[対称作用素](../../../解析系/QM/QM5/index.md#def-qm5-symmetric)になることも確認します。

<a id="prop-mqfc2-closable-field"></a>

<!-- formal-statement-start -->
> **命題（場の随伴包含と可閉性）**  
> $\Phi$ が複素Hilbert空間の共通稠密不変領域 $D$ 上の作用素値緩増加分布で、実スカラー場の随伴条件を満たすとする。各試験関数に対し

$$
\Phi(\bar f)\subseteq\Phi(f)^*
$$

> が作用素の包含（定義域の包含およびそこでの値の一致）として成立する。各 $\Phi(f)$ は可閉であり、実試験関数に対して対称である。
<!-- formal-statement-end -->

### 証明の見取り図

内積等式から随伴の定義域に $D$ が入ります。さらにグラフの極限で入力が零になったなら、出力の極限は $D$ の全状態に直交するので零です。

<!-- proof-start -->
### 証明

$\chi\in D$ を固定すると任意の $\psi\in D$ に対し随伴条件の右辺は $\langle\psi,\Phi(\bar f)\chi\rangle$ です。[随伴の定義](../../../解析系/QM/QM5/index.md#def-qm5-unbounded-adjoint)により $\chi\in\operatorname{Dom}\Phi(f)^*$ かつ $\Phi(f)^*\chi=\Phi(\bar f)\chi$ です。

次に $\psi_k\in D$、$\psi_k\to0$、$\Phi(f)\psi_k\to y$ と仮定すると、

$$
\langle y,\chi\rangle
=\lim_k\langle\psi_k,\Phi(\bar f)\chi\rangle=0
\qquad(\chi\in D).
$$

$D$ は稠密なので $y=0$ です。従ってグラフの閉包には $(0,y)$ で $y\ne0$ の点が存在しません。閉包は線形部分空間なので、同じ入力に二つの出力があれば差がそのような点になります。よってグラフの閉包は作用素のグラフであり、可閉です。実 $f$ なら $\bar f=f$ なので[対称作用素の条件](../../../解析系/QM/QM5/index.md#def-qm5-symmetric)を満たします。
<!-- proof-end -->

[自己共役作用素](../../../解析系/QM/QM5/index.md#def-qm5-self-adjoint)では定義域も随伴と一致する必要があります。上の包含から自己共役性や閉包の自己共役性を結論してはいけません。例えば第1節の対角作用素は、[最小対角作用素の随伴](../../../解析系/QM/QM5/index.md#prop-qm5-minimal-diagonal-adjoint)により随伴が有限列より広い領域を持ちます（演習B1で再計算します）。ただしこの例は[QM5の本質的自己共役性の直接例](../../../解析系/QM/QM5/index.md#def-qm5-essential-self-adjoint)と同じであり、閉包は自己共役です。元の作用素の自己共役性と閉包の自己共役性は区別します。

## 3. 自由場を粒子数で制御する

[ボースFock空間と有限粒子領域](../../QFT/QFT4/index.md#def-qft4-fock-space)を使います。質量 $m>0$ とし、

$$
\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2},\quad
d\mu(\boldsymbol p)=\frac{d^3p}{(2\pi)^3},\quad
\mathfrak h=L^2(\mathbb R^3,d\mu)
$$

と置きます。対称な $n$ 粒子波動関数のHilbert空間を $\mathfrak h^{\otimes_s n}$ と書きます。添字 $s$ は粒子変数の任意の置換に不変な部分空間を表し、零粒子成分は $\mathbb C$ とします。

$$
\mathcal F=\bigoplus_{n=0}^{\infty}\mathfrak h^{\otimes_s n},
\qquad
\Omega=(1,0,0,\dots).
$$

状態は粒子数別の列であり、そのノルムは各成分のノルム二乗の和で定まります。

$$
\psi=(\psi_0,\psi_1,\ldots),
\qquad
\|\psi\|^2=\sum_{n\ge0}\|\psi_n\|^2.
$$

$\Omega$ はノルム1の真空ベクトルです。$D_{\mathcal S}$ は有限個の成分だけが非零で、各成分が対称Schwartz関数（零粒子では複素数）である状態の空間です。QFT4での $\mathcal D_{\mathcal S}$ と同じ領域です。

各粒子数でのSchwartz関数による近似を置換の平均で対称化しても、対称な目標への誤差は元の誤差以下です。これと直和の末尾切捨てにより稠密です。以下、$D_{\le L}$ は $D_{\mathcal S}$ のうち $L$ 粒子以下の状態の部分空間です。

[生成・消滅演算子](../../QFT/QFT4/index.md#def-qft4-ladder-operators)をそれぞれ $a^\dagger(u),a(u)$ と書きます。波束 $u\in\mathcal S(\mathbb R^3)$ に対して生成は $u$ に線形、消滅は共役線形です。

両者は状態 $\psi$ に線形であり、QFT4の定義と同じく $D_{\mathcal S}$ を保ちます。$\dagger$ はここでの共通領域上の内積による随伴関係を表します。

例えば消滅で $n+1$ 粒子から $n$ 粒子へ移る成分は

$$
(a(u)\psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)
=\sqrt{n+1}\int\bar u(\boldsymbol q)
\psi_{n+1}(\boldsymbol q,\boldsymbol p_1,\ldots,\boldsymbol p_n)d\mu(\boldsymbol q).
$$

$a^\dagger(u)$ は $n$ 粒子から $n+1$ 粒子へ新しい波束を対称化して加えます。二つの作用を何回繰り返しても粒子数の上限は有限のままです。

<a id="prop-mqfc2-sector-bound"></a>

<!-- formal-statement-start -->
> **命題（有限粒子領域での作用素評価）**  
> 一粒子空間を $L^2(\mathbb R^3,d\mu)$ とするボースFock空間において、$D_{\le L}$ を高々 $L$ 粒子の対称Schwartz成分を持つ領域とする。$u$ をSchwartz波束、$L$ を非負整数とする。任意の $\psi\in D_{\le L}$ に対し

$$
\begin{aligned}
\|a(u)\psi\|&\le\sqrt L\|u\|\|\psi\|,\\
\|a^\dagger(u)\psi\|&\le\sqrt{L+1}\|u\|\|\psi\|.
\end{aligned}
$$

> 両作用の結果は $D_{\le L+1}$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

消滅では各粒子数成分の積分をCauchy–Schwarzの不等式で抑え、生成では交換関係の残り一項が上限を一つ増やします。

<!-- proof-start -->
### 証明

消滅の成分式で残る粒子変数 $\boldsymbol p_1,\ldots,\boldsymbol p_n$ を固定し、積分変数 $\boldsymbol q$ についてCauchy–Schwarzの不等式を使うと

$$
|(a(u)\psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)|^2
\le(n+1)\|u\|^2\int|\psi_{n+1}(\boldsymbol q,\boldsymbol p_1,\ldots,\boldsymbol p_n)|^2d\mu(\boldsymbol q).
$$

残る粒子変数について積測度で積分し、直和ノルムを取ります。波動関数は二乗可積分であり、その絶対値二乗は非負かつ可積分なので積分の順序を変えられます。

$$
\begin{aligned}
\|(a(u)\psi)_n\|^2
&\le(n+1)\|u\|^2\|\psi_{n+1}\|^2,\\
\|a(u)\psi\|^2
&\le\|u\|^2\sum_{j=1}^{L}j\|\psi_j\|^2\\
&\le L\|u\|^2\|\psi\|^2.
\end{aligned}
$$

次に[生成・消滅演算子の交換関係](../../QFT/QFT4/index.md#thm-qft4-fock-ccr)を同じ波束 $u$ に適用します。共通領域上で $a(u)a^\dagger(u)=a^\dagger(u)a(u)+\|u\|^2 I$ です。[生成・消滅演算子の随伴関係](../../QFT/QFT4/index.md#def-qft4-ladder-operators)を使うと

$$
\begin{aligned}
\|a^\dagger(u)\psi\|^2
&=\langle\psi,a(u)a^\dagger(u)\psi\rangle\\
&=\|a(u)\psi\|^2+\|u\|^2\|\psi\|^2\\
&\le(L+1)\|u\|^2\|\psi\|^2.
\end{aligned}
$$

平方根を取れば主張を得ます。生成・消滅の成分式から粒子数は高々一つ増え、Schwartz性も保たれるので、結果の領域も従います。
<!-- proof-end -->

単位波束 $u$ を一つ固定し、$n$ 粒子成分だけが $u^{\otimes n}$ の単位ベクトルを $\psi^{(n)}$ とすると、消滅の成分式より $\|a(u)\psi^{(n)}\|=\sqrt n$ です。この増大は上の評価で粒子数の上限が必要であることを示します。

## 4. 時空試験関数から自由場を作る

[実自由量子場のsmearing](../../QFT/QFT4/index.md#def-qft4-smeared-field)を複素試験関数に対して用います。Fourier変換の時間周波数の符号を

$$
\widetilde f(E,\boldsymbol p)
=\int f(t,\boldsymbol x)e^{iEt-i\boldsymbol p\cdot\boldsymbol x}\,dt\,d^3x
$$

とし、正エネルギー質量殻（$E=\omega_{\boldsymbol p}$ を満たす点の集合）への制限を

$$
u_f(\boldsymbol p)=
\frac{\widetilde f(\omega_{\boldsymbol p},\boldsymbol p)}
{\sqrt{2\omega_{\boldsymbol p}}}
$$

とします。これは[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier)で時間周波数だけ符号を反転した変換です。$E$ は時間周波数、$\boldsymbol p$ は空間周波数です。

$\partial_{p_j}$ は運動量の第 $j$ 成分での微分ですが、質量殻へ制限した後には $E$ も $\boldsymbol p$ に依存します。$F=\widetilde f$、$g(\boldsymbol p)=F(\omega_{\boldsymbol p},\boldsymbol p)$ と一時的に書けば、連鎖律により

$$
\partial_{p_j}g
=(\partial_E F)(\omega_{\boldsymbol p},\boldsymbol p)
\frac{p_j}{\omega_{\boldsymbol p}}
+(\partial_{p_j}F)(\omega_{\boldsymbol p},\boldsymbol p).
$$

右辺の $F$ の偏微分は独立な四変数で微分してから質量殻へ制限した値です。さらに積の微分により

$$
\partial_{p_j}u_f
=(2\omega_{\boldsymbol p})^{-1/2}\partial_{p_j}g
-\frac{p_j}{2\omega_{\boldsymbol p}^{2}}
(2\omega_{\boldsymbol p})^{-1/2}g.
$$

$m>0$ のため $\omega_{\boldsymbol p}\ge m$ であり、$\omega_{\boldsymbol p}$ と $(2\omega_{\boldsymbol p})^{-1/2}$ の任意階の導関数は高々多項式増大です。実際、実数 $b$ に対する微分は

$$
\partial_{p_j}(\omega_{\boldsymbol p}^{b})
=b p_j\omega_{\boldsymbol p}^{b-2}
$$

です。これと積の微分を繰り返すと多項式とエネルギーの冪の積の有限和になります。負の冪には下界 $m$ を使えます。

高階の $\partial^\alpha u_f$ も $F$ の導関数を質量殻へ制限した値と多項式増大因子の積の有限和です。質量殻上のEuclidノルムは $|\boldsymbol p|$ 以上なので、各因子の増大次数より十分大きなSchwartz減衰次数を選べます。従って任意の非負整数 $N$ と多重指数 $\alpha$ について

$$
\sup_{\boldsymbol p}(1+|\boldsymbol p|)^N|\partial^\alpha u_f(\boldsymbol p)|<\infty
$$

が成立し、$u_f$ はSchwartz級です。

場の式は

$$
\Phi(f)=a(u_{\bar f})+a^\dagger(u_f)
\quad\text{on }D_{\mathcal S}.
$$

消滅演算子が共役線形なので、第一項に $u_{\bar f}$ が入って初めて全体が $f$ に複素線形になります。例えば $u_{\overline{\alpha f+\beta g}}=\bar\alpha u_{\bar f}+\bar\beta u_{\bar g}$ であり、消滅側でもう一度係数を共役にするため $\Phi(\alpha f+\beta g)=\alpha\Phi(f)+\beta\Phi(g)$ です。

<a id="thm-mqfc2-free-field-estimate"></a>

<!-- formal-statement-start -->
> **定理（自由場の共通領域とSchwartz評価）**  
> $m>0$ の実自由スカラー場を上の質量殻写像と生成・消滅演算子で構成する。定数 $C_m>0$ と非負整数 $N,M$ を、試験関数・状態・粒子数上限によらず固定して選べる。任意の非負整数 $L$、$\psi\in D_{\le L}$、$f\in\mathcal S(\mathbb R^4)$ に対して

$$
\begin{aligned}
\Phi(f)\psi&\in D_{\le L+1},\\
\|\Phi(f)\psi\|&\le C_m(\sqrt L+\sqrt{L+1})p_{N,M}(f)\|\psi\|
\end{aligned}
$$

> が成り立つ。ここで $p_{N,M}$ はSchwartz半ノルムである。従って $\Phi$ は $D_{\mathcal S}$ 上の作用素値緩増加分布であり、実スカラー場の随伴条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

質量殻上の波束のノルムを時空のSchwartz半ノルムで制御し、前節の粒子数評価に代入します。随伴は生成項と消滅項を入れ替えて確認します。

<!-- proof-start -->
### 証明

整数 $k=3$ を選びます。[Fourier変換の連続性](../MQFC1/index.md#thm-mqfc1-fourier)によりある $C,N,M$ に対して

$$
|\widetilde f(E,\boldsymbol p)|
\le Cp_{N,M}(f)(1+\sqrt{E^2+|\boldsymbol p|^2})^{-3}.
$$

従って $E=\omega_{\boldsymbol p}$ を代入し、$\omega_{\boldsymbol p}\ge m$ を使うと

$$
\begin{aligned}
\|u_f\|^2
&=\int\frac{|\widetilde f(\omega_{\boldsymbol p},\boldsymbol p)|^2}{2\omega_{\boldsymbol p}}\,d\mu(\boldsymbol p)\\
&\le\frac{C^2p_{N,M}(f)^2}{2m}
\int (1+|\boldsymbol p|)^{-6}d\mu(\boldsymbol p).
\end{aligned}
$$

最後の積分は原点付近で有界、無限遠では半径積分の被積分関数が $r^{-4}$ 以下なので有限です。その平方根と係数をまとめて $C_m$ とすれば $\|u_f\|\le C_mp_{N,M}(f)$ です。共役は半ノルムを変えないので $u_{\bar f}$ も同じ評価を満たします。

[有限粒子領域での作用素評価](#prop-mqfc2-sector-bound)により

$$
\begin{aligned}
\|\Phi(f)\psi\|
&\le\|a(u_{\bar f})\psi\|+\|a^\dagger(u_f)\psi\|\\
&\le(\sqrt L\|u_{\bar f}\|+\sqrt{L+1}\|u_f\|)\|\psi\|.
\end{aligned}
$$

先の波束評価を代入して目的の不等式を得ます。領域の不変性は同じ命題から従います。固定した $\psi,\chi$ に対し $|\langle\Phi(f)\psi,\chi\rangle|\le\|\Phi(f)\psi\|\|\chi\|$ なので[作用素値緩増加分布の定義](#def-mqfc2-field-domain)の連続性を満たします。

最後に[生成・消滅の随伴関係](../../QFT/QFT4/index.md#def-qft4-ladder-operators)から

$$
\begin{aligned}
\langle\Phi(f)\psi,\chi\rangle
&=\langle\psi,a^\dagger(u_{\bar f})\chi\rangle
+\langle\psi,a(u_f)\chi\rangle\\
&=\langle\psi,\Phi(\bar f)\chi\rangle.
\end{aligned}
$$

従って随伴条件も成立します。
<!-- proof-end -->

真空に作用させると消滅項が零になり、一粒子成分 $u_f$ だけが残ります。例えば実Gaussian $f(t,\boldsymbol x)=e^{-t^2-|\boldsymbol x|^2}$ なら、[GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)で $a=1$ を使います。時間の周波数には $-E$、空間の周波数には $p_j$ を代入します。各積分は絶対収束するので四つの積に分けられ、規格化係数は $(\sqrt\pi)^4=\pi^2$ です。よって

$$
\widetilde f(E,\boldsymbol p)=\pi^2e^{-(E^2+|\boldsymbol p|^2)/4},\qquad
u_f(\boldsymbol p)=\frac{\pi^2e^{-(m^2+2|\boldsymbol p|^2)/4}}{\sqrt{2\omega_{\boldsymbol p}}}.
$$

従って $u_f$ は全運動量で正です。このとき真空から生成される状態は有限ノルムで非零となります。

## 5. 積と真空期待値

同じ不変領域で場を何度も作用させられるので、真空期待値を

$$
W_n(f_1,\dots,f_n)
=\langle\Phi(f_1)\cdots\Phi(f_n)\Omega,\Omega\rangle
$$

と置きます。右端から順に作用させます。各因子の入力は違っても、直前の出力が必ず共通領域に入ります。これを試験関数の有限族に関する連続性へ結び付けます。

<a id="thm-mqfc2-product-bound"></a>

<!-- formal-statement-start -->
> **定理（自由場の有限積と真空期待値の連続性）**  
> 上の質量正の自由場に対し、非負整数 $L$、正整数 $n$、$\psi\in D_{\le L}$、時空Schwartz関数 $f_1,\ldots,f_n$ を取る。$p=p_{N,M}$ とし、第4節の定数を $C_m$ とする。このとき

$$
\begin{aligned}
\|\Phi(f_1)\cdots\Phi(f_n)\psi\|
&\le (2C_m)^n
\sqrt{\frac{(L+n)!}{L!}}\|\psi\|
\prod_{j=1}^{n}p(f_j).
\end{aligned}
$$

> 真空期待値 $W_n$ は各引数に複素線形であり、Schwartz空間の有限直積上で同時連続である。
<!-- formal-statement-end -->

### 証明の見取り図

作用を一度行うたびに粒子数上限が一つ増えるので、その時点の上限で評価し直します。

<!-- proof-start -->
### 証明

右から $k$ 個作用させた状態を $\psi^{[k]}$ とします。

$$
\psi^{[0]}=\psi,\qquad
\psi^{[k+1]}=\Phi(f_{n-k})\psi^{[k]}
\quad(k=0,\dots,n-1).
$$

各段階で $\psi^{[k]}\in D_{\le L+k}$ です。[自由場のSchwartz評価](#thm-mqfc2-free-field-estimate)を次の因子 $f_{n-k}$ に適用すると、

$$
\|\psi^{[k+1]}\|
\le 2C_m\sqrt{L+k+1}\,p(f_{n-k})\|\psi^{[k]}\|.
$$

これを $k=0$ から $n-1$ まで掛け合わせます。平方根の積の中身は

$$
\prod_{k=0}^{n-1}(L+k+1)=\frac{(L+n)!}{L!}.
$$

従って目的の評価が得られます。$L=0,\psi=\Omega$ として内積の絶対値をノルムで抑えると

$$
|W_n(f_1,\dots,f_n)|
\le (2C_m)^n\sqrt{n!}\prod_{j=1}^{n}p(f_j).
$$

複素線形性は各場の複素線形性と内積の規約から従います。同時連続性は、引数を一つずつ置き換えることで示します。$g_1,\ldots,g_n$ を別の試験関数の組とすると、多重線形性から

$$
\begin{aligned}
&W_n(g_1,\ldots,g_n)-W_n(f_1,\ldots,f_n)\\
&=\sum_{j=1}^n
W_n(g_1,\ldots,g_{j-1},g_j-f_j,f_{j+1},\ldots,f_n).
\end{aligned}
$$

固定した組 $(f_1,\ldots,f_n)$ に対し $p(g_j-f_j)<\delta\le1$ を全ての $j$ で課します。$R=1+\max_j p(f_j)$ と置くと $p(g_j)\le R$ かつ $p(f_j)\le R$ です。先ほどの期待値評価を各項に使うと差の絶対値は

$$
n(2C_m)^n\sqrt{n!}\,R^{n-1}\delta
$$

以下です。任意の正の誤差に対して $\delta$ を十分小さくすれば、その誤差未満にできます。[Schwartz半ノルムによる近傍](../MQFC1/index.md#def-mqfc1-schwartz)の定義から任意の点で同時連続です。
<!-- proof-end -->

この結果は分離した試験関数に対する期待値の連続性です。一般の多変数試験関数へ分布として延長するためには別途核定理などが必要であり、本章ではその一般定理を証明していません。

真空の一粒子成分と[随伴条件](#thm-mqfc2-free-field-estimate)を用いると二点の正値性を直接確認できます。

$$
\begin{aligned}
W_2(\bar f,g)
&=\langle\Phi(g)\Omega,\Phi(f)\Omega\rangle\\
&=\int u_g(\boldsymbol p)\overline{u_f(\boldsymbol p)}\,d\mu(\boldsymbol p).
\end{aligned}
$$

従って $W_2(\bar f,f)=\|u_f\|^2\ge0$ です。[有限個の試験関数による正値性判定](../MQFC1/index.md#prop-mqfc1-gram)と同じ機構で、有限族の任意の複素係数に対する二次形式は $\|\sum_j c_j u_{f_j}\|^2$ となります。これは次講の公理に現れる正値性の最小の例です。

## 6. 演習

### 演習 MQFC2-A1：共通領域と積

- Level: A
- 目安時間: 10分

有限列の領域 $D\subset\ell^2(\mathbb N)$ で $Te_n=ne_n$、$\Phi(f)=f(0)T$ とする。$\Phi(f)\Phi(g)e_n$ を求め、$D$ が不変である理由を述べよ。

<!-- solution-start -->
#### 詳細解答

まず $\Phi(g)e_n=g(0)ne_n$ です。このベクトルは有限列なので次の作用が定義され、

$$
\Phi(f)\Phi(g)e_n=f(0)g(0)n^2e_n.
$$

任意の有限列は有限個の $e_n$ の線形結合で、$T$ は各 $e_n$ を同じ位置の倍数へ送ります。従って有限列のままであり、積も $D$ を保ちます。
<!-- solution-end -->

### 演習 MQFC2-A2：消滅と生成の複素線形性

- Level: A
- 目安時間: 10分

$u_f$ が $f$ に線形、$a(u)$ が $u$ に共役線形、$a^\dagger(u)$ が線形であるとする。$\Phi(if)$ を計算せよ。また $a(u_f)+a^\dagger(u_f)$ では何が失敗するか。

<!-- solution-start -->
#### 詳細解答

$\overline{if}=-i\bar f$ なので $u_{\overline{if}}=-iu_{\bar f}$ です。消滅側で係数を共役にすると

$$
\Phi(if)=i a(u_{\bar f})+i a^\dagger(u_f)=i\Phi(f).
$$

一方、誤った式では消滅側が $-ia(u_f)$、生成側が $ia^\dagger(u_f)$ となります。消滅作用が零でない状態では $i$ 倍と一致せず、複素線形性が失われます。
<!-- solution-end -->

### 演習 MQFC2-A3：一粒子への消滅作用

- Level: A
- 目安時間: 10分

単位波束 $u\in\mathcal S(\mathbb R^3)$ とし、一粒子成分だけが $u$ の状態 $\psi$ を取る。$a(u)\psi$ とそのノルムを求めよ。

<!-- solution-start -->
#### 詳細解答

[消滅演算子の定義](../../QFT/QFT4/index.md#def-qft4-ladder-operators)の $n=0$ を使うと

$$
(a(u)\psi)_0=\sqrt1\int\bar u(\boldsymbol q)u(\boldsymbol q)d\mu(\boldsymbol q)=1.
$$

$n\ge1$ では入力の $n+1$ 粒子成分が零なので出力も零です。従って $a(u)\psi=\Omega$、ノルムは1です。[有限粒子領域の評価](#prop-mqfc2-sector-bound)の $L=1$ の上界に等しくなります。
<!-- solution-end -->

### 演習 MQFC2-A4：真空一粒子と二点量

- Level: A
- 目安時間: 10分

自由場 $\Phi(f)=a(u_{\bar f})+a^\dagger(u_f)$ に対し、$W_1(f)$ と $W_2(\bar f,f)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

消滅項は真空を零へ送り、生成項は一粒子成分 $u_f$ だけを作ります。零粒子成分とは直交するので $W_1(f)=0$ です。[自由場の随伴条件](#thm-mqfc2-free-field-estimate)を使って左の場を内積の右へ移すと

$$
W_2(\bar f,f)=\langle\Phi(f)\Omega,\Phi(f)\Omega\rangle=\|u_f\|^2.
$$

これは非負で、$u_f=0$ のときに限り零です。
<!-- solution-end -->

### 演習 MQFC2-B1：随伴の最大定義域

- Level: B
- 目安時間: 20分

第1節の有限列領域の $T$ の随伴の定義域と作用を求め、$T$ が自己共役でないことを示せ。

<!-- solution-start -->
#### 詳細解答

[稠密定義作用素の随伴](../../../解析系/QM/QM5/index.md#def-qm5-unbounded-adjoint)の定義から、$\chi\in\operatorname{Dom}T^*$ であるには、ある $z\in\ell^2$ が全ての有限列 $\psi$ について内積等式を満たす必要があります。

$$
\langle T\psi,\chi\rangle=\langle\psi,z\rangle.
$$

$\psi=e_n$ とすれば $n\bar\chi_n=\bar z_n$、すなわち $z_n=n\chi_n$ です。

逆に $(n\chi_n)_n\in\ell^2$ ならこの列を $z$ に選ぶと、有限和で内積等式が成立します。よって

$$
\operatorname{Dom}T^*=\{\chi\in\ell^2:\sum_{n\ge1}n^2|\chi_n|^2<\infty\},\quad
(T^*\chi)_n=n\chi_n.
$$

例えば $\chi_n=n^{-2}$ はこの領域に属する無限列です。元の $D$ に属さないため、[自己共役性の条件](../../../解析系/QM/QM5/index.md#def-qm5-self-adjoint)である定義域の一致が失敗します。
<!-- solution-end -->

### 演習 MQFC2-B2：非零試験関数が零の場を作る

- Level: B
- 目安時間: 20分

質量 $m>0$ とし、$\partial_t$ は空間位置を固定した時間微分、$\Delta=\sum_{j=1}^3\partial_{x_j}^2$ は時間を固定した空間Laplacianとする。$h(t,\boldsymbol x)=e^{-t^2-|\boldsymbol x|^2}$、$f=(\partial_t^2-\Delta+m^2)h$ と置く。$f$ が非零であるにもかかわらず $\Phi(f)=0$ になることを示せ。

<!-- solution-start -->
#### 詳細解答

時間と空間の偏微分をそれぞれ二回行います。

$$
\partial_t^2h=(4t^2-2)h,
\qquad
\partial_{x_j}^2h=(4x_j^2-2)h.
$$

原点では時間の二階微分は $-2$、空間3方向の和は $-6$ なので $f(0)=4+m^2>0$ です。各微分は多項式とGaussianの積であり、$f$ は実Schwartz関数です。第4節のFourier変換では、時間と空間で指数の符号が逆です。Schwartz減衰で境界項が零になるため、時間または空間の各変数について部分積分すると

$$
\widetilde{\partial_t h}=-iE\widetilde h,
\qquad
\widetilde{\partial_{x_j} h}=ip_j\widetilde h.
$$

同じ操作をもう一度行えば時間側は $(-iE)^2=-E^2$、空間側は $(ip_j)^2=-p_j^2$ です。従って

$$
\widetilde f(E,\boldsymbol p)
=(-E^2+|\boldsymbol p|^2+m^2)\widetilde h(E,\boldsymbol p).
$$

$E=\omega_{\boldsymbol p}$ を代入すると係数が零です。従って $u_f=0$、さらに $f$ は実なので $u_{\bar f}=0$ です。[自由場のsmearing](../../QFT/QFT4/index.md#def-qft4-smeared-field)の式で両項が零になり、共通領域上で $\Phi(f)=0$ です。非零の試験関数が必ず非零作用素を与えるわけではありません。
<!-- solution-end -->

### 演習 MQFC2-B3：二点行列の零方向

- Level: B
- 目安時間: 20分

自由場で有限族 $f_1,\ldots,f_n$ に対し $G_{ij}=W_2(\bar f_i,f_j)$ と置く。複素係数の列ベクトル $c\in\mathbb C^n$ の共役転置を $c^*$ とする。$c^*Gc$ を求め、その零条件を述べよ。$f_2=if_1$ の場合の非零の零方向も求めよ。

<!-- solution-start -->
#### 詳細解答

有限族を $f_1,\ldots,f_n$ とし、$c=(c_1,\ldots,c_n)^{\mathsf T}\in\mathbb C^n$ を列ベクトル、$c^*$ を共役転置とします。

[自由場の随伴条件](#thm-mqfc2-free-field-estimate)と真空への作用から $G_{ij}=\langle u_{f_j},u_{f_i}\rangle$ です。したがって $G_{ji}=\overline{G_{ij}}$ でHermite行列です。[有限族による正値性判定](../MQFC1/index.md#prop-mqfc1-gram)と同じ二次形式を調べます。内積の第1引数が線形であるため

$$
\begin{aligned}
c^*Gc
&=\sum_{i,j}\bar c_i c_j\langle u_{f_j},u_{f_i}\rangle\\
&=\left\|\sum_j c_j u_{f_j}\right\|^2.
\end{aligned}
$$

従って正半定値で、零条件は $\sum_j c_j u_{f_j}=0$ です。$f_2=if_1$ なら $u_{f_2}=iu_{f_1}$ なので $c_1=-i,c_2=1$ とすれば波束の和が零です。係数ベクトルは非零でも二次形式が零になることがあります。
<!-- solution-end -->

### 演習 MQFC2-C1：三つの場の積を評価する

- Level: C
- 目安時間: 30分

[自由場のSchwartz評価](#thm-mqfc2-free-field-estimate)で $p=p_{N,M}$ とする。任意の二粒子以下の状態 $\psi\in D_{\le2}$ と試験関数 $f,g,h$ に対し、$\Phi(f)\Phi(g)\Phi(h)\psi$ の粒子数上限とノルムの具体的な上界を導出せよ。また $\psi=\Omega$ のとき三点真空期待値が零になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

[自由場のSchwartz評価](#thm-mqfc2-free-field-estimate)を右から適用します。まず $h$ の作用後は高々3粒子なので

$$
\|\Phi(h)\psi\|\le 2C_m\sqrt3\,p(h)\|\psi\|.
$$

次は上限3を使います。

$$
\|\Phi(g)\Phi(h)\psi\|
\le 2C_m\sqrt4\,p(g)\|\Phi(h)\psi\|.
$$

最後の入力は高々4粒子で、出力は高々5粒子です。

$$
\begin{aligned}
\|\Phi(f)\Phi(g)\Phi(h)\psi\|
&\le 2C_m\sqrt5\,p(f)\|\Phi(g)\Phi(h)\psi\|\\
&\le 8 C_m^3\sqrt{60}\,p(f)p(g)p(h)\|\psi\|.
\end{aligned}
$$

この係数は[自由場の有限積と真空期待値の連続性](#thm-mqfc2-product-bound)の $L=2,n=3$ で $5!/2!=60$ とした値と一致します。

真空から始める場合、第一の場の作用後は一粒子だけです。第二の作用では一粒子を消して零粒子にするか、生成して二粒子にします。第三の作用では零粒子から一粒子、二粒子から一粒子または三粒子となります。よって最終状態には零粒子成分がありません。直和の異なる粒子数成分は直交するため、真空との内積は零であり $W_3(f,g,h)=0$ です。
<!-- solution-end -->

## 7. 次の講義

共通稠密不変領域のおかげで場の作用素を有限回合成でき、その粒子数ごとの評価が真空期待値の連続性を支えることを確認しました。MQFC3ではこれらの性質に時空対称性、局所性、エネルギーの条件などを加え、Wightman公理として整理します。
