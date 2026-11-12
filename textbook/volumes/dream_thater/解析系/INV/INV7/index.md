# INV7 正則化パラメータをどう選ぶか

<!-- definition-example-audit: strict -->

[INV6の収束率定理](../INV6/index.md#thm-inv6-apriori-rate)は、真の解の滑らかさ指数 $\nu$ とその大きさの上界 $M$ が分かれば、観測ノイズの水準 $\delta$ に応じて Tikhonov のパラメータ $\alpha$ を選べると教えました。しかし実際には $\nu$ も $M$ も未知であることが多く、観測値から選択を行いたくなります。

ここでは、**復元したデータと観測値の差が、測定誤差より小さくなりすぎるまで合わせ込まない**という方法を考えます。さらに、計算機で用いる近似作用素の誤差を観測ノイズと区別します。残差を小さくすれば必ず良い復元になるわけではありません。適切な停止位置を決めるのが本講の中心問題です。

以下、実 Hilbert 空間 $X,Y$ とコンパクト線形作用素 $A:X\to Y$ を考えます。厳密データ $y=Ax^\dagger\in\mathcal R(A)$ に対し、$x^\dagger$ は[最小ノルム解](../INV4/index.md#def-inv4-pseudoinverse-domain)であり、$\|y^\delta-y\|_Y\le\delta$ とします。$\delta>0$ で、観測ノイズの上界 $\delta$ は**実際に保証された値**とします。

[Tikhonov最小点の存在・一意性と正規方程式](../INV5/index.md#thm-inv5-tikhonov-minimizer)より、$\alpha>0$ の復元値は一意に

$$
x_\alpha^\delta=(A^*A+\alpha I)^{-1}A^*y^\delta
=\operatorname*{arg\,min}_{x\in X}
\bigl(\|Ax-y^\delta\|_Y^2+\alpha\|x\|_X^2\bigr)
$$

で定まります。誤差分解の[既習の上界](../INV6/index.md#thm-inv6-tikhonov-error)は $\delta/(2\sqrt\alpha)$ とバイアスの競合を示しますが、バイアスを実測できないときの選択はまだ残っています。

## 1. 残差は $\alpha$ とともにどう動くか

最初に、復元した $x_\alpha^\delta$ を前向き作用素に戻して測った量

$$
\rho_\delta(\alpha):=\|Ax_\alpha^\delta-y^\delta\|_Y
$$

を調べます。これは未知の真の解との差 $\|x_\alpha^\delta-x^\dagger\|_X$ とは**別の量**です。

[完全特異系](../INV3/index.md#def-inv3-singular-system) $(\sigma_j,u_j,v_j)_{j\in J}$ を使い、$Y_0=\overline{\mathcal R(A)}$ と $Y_0^\perp=\ker A^*$ にデータを直交分解します。$P_\perp$ を $\ker A^*$ への直交射影、$b_j=\langle y^\delta,u_j\rangle_Y$ とすると、

$$
y^\delta=\sum_{j\in J}b_ju_j+P_\perp y^\delta.
$$

[特異値フィルタ表示](../INV5/index.md#thm-inv5-spectral-filters)から

$$
Ax_\alpha^\delta
=\sum_{j\in J}\frac{\sigma_j^2}{\sigma_j^2+\alpha}b_ju_j,
\qquad
Ax_\alpha^\delta-y^\delta
=-\sum_{j\in J}\frac{\alpha}{\sigma_j^2+\alpha}b_ju_j-P_\perp y^\delta.
$$

直交性により、残差の二乗は

$$
\boxed{\quad
\rho_\delta(\alpha)^2
=\|P_\perp y^\delta\|_Y^2+
\sum_{j\in J}
\left(\frac{\alpha}{\sigma_j^2+\alpha}\right)^2|b_j|^2.
\quad}
$$

各正特異値方向の係数は $\alpha$ とともに $0$ から $1$ へ厳密に増えます。$\ker A^*$ 方向はどの $\alpha$ でも復元できないため、一定の残差として残ります。

<a id="prop-inv7-residual-range"></a>

<!-- formal-statement-start -->
> **命題（Tikhonov残差の値域）**  
> 実 Hilbert 空間間のコンパクト線形作用素 $A:X\to Y$ と $z\in Y$ に対し、
> $x_\alpha=(A^*A+\alpha I)^{-1}A^*z$、$\rho_z(\alpha)=\|Ax_\alpha-z\|_Y$ とする。$\rho_z$ は $\alpha>0$ で連続かつ非減少であり、

$$
\lim_{\alpha\downarrow0}\rho_z(\alpha)=\|P_{\ker A^*}z\|_Y,
\qquad
\lim_{\alpha\uparrow\infty}\rho_z(\alpha)=\|z\|_Y.
$$

> $z$ の $\overline{\mathcal R(A)}$ への射影が零でなければ、$\rho_z$ は厳密に増加する。特に両端点の間の値 $r$ に対し $\rho_z(\alpha)=r$ はただ一つの正の解を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

上の二乗和で各項の増加を確認します。和と極限の交換は、各係数が $1$ 以下で $\sum_j|b_j|^2<\infty$ となることを使い、有限項と残りの尾部に分ければ正当化できます。

<!-- proof-start -->
### 証明

任意の $\alpha>0$ に対し $0\le\alpha/(\sigma_j^2+\alpha)\le1$ です。正の $\alpha_0$ の近くで各項は連続であり、任意の $\varepsilon>0$ に対して $N$ を十分大きく選べば、尾部は一様に

$$
0\le\sum_{j>N}
\left(\frac{\alpha}{\sigma_j^2+\alpha}\right)^2|b_j|^2
\le\sum_{j>N}|b_j|^2<\varepsilon
$$

です（有限個の $J$ では尾部は空）。したがって有限和の連続性から級数全体が連続になります。同じ尾部評価と有限項ごとの極限を合わせると、$\alpha\downarrow0$ で和は $0$、$\alpha\uparrow\infty$ で $\sum_j|b_j|^2$ に収束します。[閉部分空間の直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)を $Y_0$ に適用すると $\sum_j|b_j|^2+\|P_{\ker A^*}z\|^2=\|z\|^2$ なので両端の式を得ます。

$0<\alpha<\beta$ なら各 $j$ で

$$
\frac{\alpha}{\sigma_j^2+\alpha}
<\frac{\beta}{\sigma_j^2+\beta}
$$

です。$b_j\ne0$ が一つでもあれば二乗和は厳密に増加します。$z$ の $Y_0$ 成分が非零であることは、完全特異系によりそのような $j$ があることと同値です。端点の間の $r$ には中間値の定理で存在が、厳密単調性で一意性が従います。$\square$
<!-- proof-end -->

この命題を手で確かめます。$A=\operatorname{diag}(2,0):\mathbb R^2\to\mathbb R^2$、$z=(4,1)$ の場合、標準基底の第1方向にだけ非零特異値 $2$ があり、第2方向は $\ker A^*$ です。よって

$$
\rho_z(\alpha)^2
=1+\left(\frac{4\alpha}{4+\alpha}\right)^2,
\qquad
\lim_{\alpha\downarrow0}\rho_z(\alpha)=1,
\qquad
\lim_{\alpha\uparrow\infty}\rho_z(\alpha)=\sqrt{17}.
$$

残差を $1$ 未満にするパラメータは**存在しません**。これは最適化の失敗でなく、観測不能方向があるためです。

## 2. Morozovの不一致原理：ノイズに見合う残差を選ぶ

測定誤差の上界が $\delta$ であれば、残差を $\delta$ よりはるかに小さくしてまで観測値を追うのは危険です。そこで定数 $\tau>1$ を先に決め、残差を $\tau\delta$ に合わせる選び方を採用します。この選び方を次で定式化します。$\tau>1$ は後で最小ノルム解への収束を証明するためにも重要です。

<a id="def-inv7-discrepancy"></a>

<!-- formal-statement-start -->
> **定義（Morozovの不一致原理）**  
> 実 Hilbert 空間間のコンパクト線形作用素 $A:X\to Y$、データ $y^\delta\in Y$、保証されたノイズ上界 $\delta>0$、固定定数 $\tau>1$ に対し、Tikhonov解 $x_\alpha^\delta$ のパラメータ $\alpha>0$ を

$$
\|Ax_\alpha^\delta-y^\delta\|_Y=\tau\delta
$$

> を満たすように選ぶ方法を Morozovの不一致原理という。方程式が正の解を持たない場合、この等式に基づく選択は定義されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv7-discrepancy -->
### 例：一次元でパラメータを実際に解く

**定義の確認**：$A=I:\mathbb R\to\mathbb R$、$y^\delta=2$、$\delta=1/2$、$\tau=2$ とします。$x_\alpha^\delta=2/(1+\alpha)$ だから

$$
\rho_\delta(\alpha)
=\left|\frac{2}{1+\alpha}-2\right|
=\frac{2\alpha}{1+\alpha}.
$$

右辺を $\tau\delta=1$ に合わせると $2\alpha=1+\alpha$、すなわち $\alpha=1$ です。代入すると $x_1^\delta=1$、残差は $|1-2|=1$ であり、$\tau\delta$ に等しいことを直接確認できます。一般にこの一次元例で $0<r<|y^\delta|$ に対する解は $\alpha=r/(|y^\delta|-r)$ です。
<!-- definition-example-end -->

無条件に選べるわけではありません。小さい観測値については最大残差 $\|y^\delta\|$ が $\tau\delta$ 以下になり、正の $\alpha$ では等式を満たせません。この場合はデータから $\alpha$ を決めるだけの情報がないため、別の停止規則や事前選択を用います。

<a id="thm-inv7-morozov-existence"></a>

<!-- formal-statement-start -->
> **定理（Morozovパラメータの存在・一意性）**  
> $A:X\to Y$ を実 Hilbert 空間間のコンパクト線形作用素とし、$y=Ax^\dagger\in\mathcal R(A)$、$\|y^\delta-y\|_Y\le\delta$、$\delta>0$、$\tau>1$ とする。もし

$$
\|y^\delta\|_Y>\tau\delta
$$

> なら、方程式 $\|Ax_\alpha^\delta-y^\delta\|_Y=\tau\delta$ を満たす $\alpha>0$ がただ一つ存在する。特に $y\ne0$ なら十分小さい $\delta>0$ でこの条件が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

真のデータ $y$ は値域にあるため、観測不能な方向はノイズ由来です。残差の下端が $\delta$ 以下、上端が $\tau\delta$ より大きいと示して、第1節の命題に戻します。

<!-- proof-start -->
### 証明

$P_\perp=P_{\ker A^*}$ とおきます。$y=Ax^\dagger$ は $\ker A^*$ に直交するので $P_\perp y=0$ です。従って直交射影のノルムが $1$ 以下であることから

$$
\|P_\perp y^\delta\|_Y
=\|P_\perp(y^\delta-y)\|_Y
\le\|y^\delta-y\|_Y\le\delta<\tau\delta.
$$

上端 $\|y^\delta\|_Y$ は仮定により $\tau\delta$ より大きいので、[残差の値域](#prop-inv7-residual-range)から存在します。また $\|y^\delta\|>\tau\delta>\|P_\perp y^\delta\|$ だから $Y_0$ 成分は非零であり、同命題の厳密単調性によって一意です。

最後に $\|y^\delta\|\ge\|y\|-\delta$ です。$y\ne0$ のとき

$$
0<\delta<\frac{\|y\|_Y}{\tau+1}
\quad\Longrightarrow\quad
\|y^\delta\|\ge\|y\|-\delta>\tau\delta,
$$

なので十分小さいノイズで条件を満たします。$\square$
<!-- proof-end -->

ここで存在を示したのは $\tau\delta$ が上端と下端の**開区間**にある場合です。等号の端点では $\alpha=0$ または $\alpha=\infty$ への極限を要求することになり、有限の正のパラメータがあるとは限りません。

## 3. なぜ残差に合わせるだけで収束するのか

[INV6の事前選択](../INV6/index.md#thm-inv6-apriori-rate)と異なり、Morozovの選択では滑らかさ指数 $\nu$ を使いません。代わりに、Tikhonov最小点が**真の解よりも大きなノルムを持てない**ことが決定打となります。誤差上界 $\delta/\sqrt\alpha$ が零になることを示す方法とは別の証明です。

<a id="thm-inv7-morozov-convergence"></a>

<!-- formal-statement-start -->
> **定理（Morozov選択の強収束）**  
> 実 Hilbert 空間 $X,Y$、コンパクト線形作用素 $A:X\to Y$、非零の厳密データ $y\in\mathcal R(A)$、最小ノルム解 $x^\dagger=A^\dagger y$ を取る。$\tau>1$ を固定し、各十分小さい $\delta>0$ で $\|y^\delta-y\|_Y\le\delta$ とする。[Morozovの不一致原理](#def-inv7-discrepancy)に従って選んだ $\alpha_\delta$ と復元値 $x_{\alpha_\delta}^\delta$ は

$$
\alpha_\delta\longrightarrow0,
\qquad
\|x_{\alpha_\delta}^\delta-x^\dagger\|_X\longrightarrow0
\quad(\delta\downarrow0)
$$

> を満たす。この結論に source condition は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

復元値は目的関数の最小点なので、候補として真の解 $x^\dagger$ を代入します。不一致原理の残差 $\tau\delta$ と真の解の残差 $\delta$ の差から、復元値のノルムを抑えます。さらに、最小ノルム解を随伴作用素の像で近似すると、復元誤差と真の解の内積が零へ向かいます。最後にノルム二乗の恒等式を使って強収束へ進みます。

<!-- proof-start -->
### 証明

**第1段階（ノルム上界）**。$\alpha=\alpha_\delta$、$x_\delta=x_{\alpha_\delta}^\delta$ と略記します。[Tikhonov最小点の性質](../INV5/index.md#thm-inv5-tikhonov-minimizer)を候補 $x^\dagger$ に適用すると

$$
\|Ax_\delta-y^\delta\|_Y^2+\alpha_\delta\|x_\delta\|_X^2
\le\|Ax^\dagger-y^\delta\|_Y^2
+\alpha_\delta\|x^\dagger\|_X^2.
$$

左の残差は $\tau\delta$、右の残差は $\|y-y^\delta\|\le\delta$ です。従って

$$
(\tau^2-1)\delta^2+
\alpha_\delta\|x_\delta\|_X^2
\le\alpha_\delta\|x^\dagger\|_X^2,
\qquad
\|x_\delta\|_X\le\|x^\dagger\|_X.
$$

$\alpha_\delta>0$ と $\tau>1$ を使って最後の不等式を得ました。特に復元値は一様有界です。

**第2段階（正しい方程式への接近）**。三角不等式と残差条件で

$$
\|Ax_\delta-y\|_Y
\le\|Ax_\delta-y^\delta\|_Y+\|y^\delta-y\|_Y
\le(\tau+1)\delta\longrightarrow0.
$$

**第3段階（最小ノルム解への強収束）**。$u_\delta=x_\delta-x^\dagger$、$M=\|x^\dagger\|_X$ とおきます。第1段階のノルム上界から

$$
\|u_\delta\|_X
\le\|x_\delta\|_X+\|x^\dagger\|_X\le2M.
$$

ここで随伴作用素の像が、最小ノルム解をどこまで近似できるか確認します。随伴の定義より、任意の $k\in X$ について

$$
\begin{aligned}
k\perp\mathcal R(A^*)
&\Longleftrightarrow
\langle k,A^*q\rangle_X=0\quad(\forall q\in Y)\\
&\Longleftrightarrow
\langle Ak,q\rangle_Y=0\quad(\forall q\in Y)\\
&\Longleftrightarrow Ak=0.
\end{aligned}
$$

したがって $(\mathcal R(A^*))^\perp=\ker A$ です。[閉部分空間の直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)を使うと

$$
\overline{\mathcal R(A^*)}=(\ker A)^\perp.
$$

[最小ノルム解](../INV4/index.md#def-inv4-pseudoinverse-domain) $x^\dagger$ は $(\ker A)^\perp$ に属するので、どんな $\varepsilon>0$ に対しても $q\in Y$ を選んで

$$
\|x^\dagger-A^*q\|_X<\varepsilon
$$

とできます。第2段階の $\|Au_\delta\|=\|Ax_\delta-y\|\le(\tau+1)\delta$ と随伴の定義を用いると

$$
\begin{aligned}
|\langle u_\delta,x^\dagger\rangle_X|
&\le|\langle u_\delta,x^\dagger-A^*q\rangle_X|
+|\langle u_\delta,A^*q\rangle_X|\\
&\le\|u_\delta\|_X\|x^\dagger-A^*q\|_X
+|\langle Au_\delta,q\rangle_Y|\\
&\le2M\varepsilon+(\tau+1)\delta\|q\|_Y.
\end{aligned}
$$

$\varepsilon$ を固定したまま $\delta\downarrow0$ とし、その後 $\varepsilon\downarrow0$ とすれば

$$
\langle u_\delta,x^\dagger\rangle_X\longrightarrow0.
$$

最後に $\|x_\delta\|\le\|x^\dagger\|$ を使い、ノルム二乗を展開します。

$$
\begin{aligned}
0\le\|u_\delta\|_X^2
&=\|x_\delta\|_X^2-\|x^\dagger\|_X^2
-2\langle u_\delta,x^\dagger\rangle_X\\
&\le-2\langle u_\delta,x^\dagger\rangle_X
\longrightarrow0.
\end{aligned}
$$

これで部分列を取らずに $\|x_\delta-x^\dagger\|_X=\|u_\delta\|_X\to0$ を示しました。

**第4段階（パラメータが零へ近づく）**。任意の $\beta>0$ を固定します。[残差表示](#prop-inv7-residual-range)を厳密データ $y\ne0$ に用いると $\rho_y(\beta)>0$ です。$\rho_z(\beta)=\|\beta(AA^*+\beta I)^{-1}z\|$ は $z$ に関して $1$-Lipschitz です。これは特異系で残差作用素の各倍率が $[0,1]$ に入ることから従います。従って

$$
\rho_{y^\delta}(\beta)\ge\rho_y(\beta)-\delta.
$$

もし $\alpha_\delta\ge\beta$ なら、残差の単調性により

$$
\tau\delta=\rho_{y^\delta}(\alpha_\delta)
\ge\rho_{y^\delta}(\beta)
\ge\rho_y(\beta)-\delta.
$$

しかし $\delta<\rho_y(\beta)/(\tau+1)$ ではこれは不可能です。よって十分小さい $\delta$ に対し $\alpha_\delta<\beta$。$\beta>0$ は任意なので $\alpha_\delta\to0$ です。$\square$
<!-- proof-end -->

重要なのは**強収束を示すために $\delta/\sqrt{\alpha_\delta}\to0$ を仮定していない**点です。残差方程式と最小ノルム性を組み合わせると、これとは別の論理で収束が示せます。なおデータが $y=0$ の場合、$\|y^\delta\|\le\delta<\tau\delta$ なので、ここでの等式選択は存在しません。その場合は例えば一定の $\alpha>0$ を用いれば[ノイズ項の上界](../INV6/index.md#thm-inv6-tikhonov-error)から復元値は零へ近づきます。

## 4. ノイズを過小評価すると何が壊れるか

次は一方向だけの問題ですが、失敗機構は無限次元でも同じです。$A:\mathbb R\to\mathbb R$ を $Ax=sx$（$s>0$）とし、$y^\delta=z>0$ とします。[特異値フィルタ](../INV5/index.md#thm-inv5-spectral-filters)から

$$
x_\alpha^\delta=\frac{sz}{s^2+\alpha},
\qquad
\rho_\delta(\alpha)=\frac{\alpha z}{s^2+\alpha}.
$$

残差目標を $0<r<z$ とすると

$$
\alpha=\frac{rs^2}{z-r},
\qquad
x_\alpha^\delta=\frac{z-r}{s}.
$$

ここで $s=0.01$、真の解 $x^\dagger=1$、厳密データ $y=0.01$、観測 $z=0.02$ とします。実際のノイズは $|z-y|=0.01$ です。$\tau=1.2$ として計算すると次のようになります。

| 選択に使った上界 | 残差目標 $r$ | 復元値 $(z-r)/s$ | 真の解への誤差 |
| --- | ---: | ---: | ---: |
| 正しい $\delta=0.01$ | $0.012$ | $0.8$ | $0.2$ |
| 過小な $\delta_{\mathrm{fake}}=0.0001$ | $0.00012$ | $1.988$ | $0.988$ |

過小評価した側でも、指定した残差方程式は厳密に解けています。しかし**本当のノイズは偽の上界を満たさない**ため、収束定理の第1段階の $\|y-y^\delta\|\le\delta$ が破綻します。小さな特異値 $s$ で割ったノイズがほぼそのまま解へ残ります。残差をより小さくしたのに復元誤差は大きくなりました。

一方、ノイズ上界を過大に見積もり $\tau\delta\ge\|y^\delta\|$ とすると、正の解が消えることもあります。過小評価と過大評価は失敗の種類が違います。

## 5. 作用素を近似するときの誤差は別に数える

実際の計算では、連続的な前向き作用素 $A$ の代わりに離散化・近似した $A_h$ を使います。$h$ は格子幅など近似の細かさを表す記号で、ここでは作用素ノルムで

$$
\|A_h-A\|_{X\to Y}\le\eta_h
$$

という保証を仮定します。**観測ノイズ** $\delta$ と、作用素ノルムで測った**モデルのずれ** $\eta_h$ は同じ数ではありません。さらに $\eta_h$ だけでは $A_hx^\dagger$ の誤差上界になりません。真の解に作用させた差には $\|x^\dagger\|$ が掛かるからです。

<a id="def-inv7-effective-noise"></a>

<!-- formal-statement-start -->
> **定義（作用素近似に対する有効誤差上界）**  
> 実 Hilbert 空間間の有界線形作用素 $A,A_h:X\to Y$、$y=Ax^\dagger$、$\|y^\delta-y\|_Y\le\delta$、$\|A_h-A\|_{X\to Y}\le\eta_h$、$\|x^\dagger\|_X\le B$（$B>0$）を仮定する。このとき

$$
\varepsilon_h:=\delta+\eta_hB
$$

> を、この近似モデルに対する有効誤差上界という。$\varepsilon_h$ は $y^\delta$ と $A_hx^\dagger$ のずれに対する保証値であり、観測ノイズそのものではない。
<!-- formal-statement-end -->

適用条件から直ちに

$$
\begin{aligned}
\|A_hx^\dagger-y^\delta\|_Y
&\le\|(A_h-A)x^\dagger\|_Y+\|Ax^\dagger-y^\delta\|_Y\\
&\le\eta_h\|x^\dagger\|_X+\delta
\le\varepsilon_h.
\end{aligned}
$$

となります。ここでは $\delta$ と $\eta_hB$ が別々に現れるため、どちらの仮定がどの誤差を制御するか見えます。

<!-- definition-example-start: def-inv7-effective-noise -->
### 例：観測が正確でも離散化誤差は残る

**定義の確認**：$X=Y=\mathbb R$、$A=1$、$A_h=1.1$（スカラー倍作用素）、$x^\dagger=2$、$y=2$、$y^\delta=2.1$ とします。実際に $\delta=0.1$、$\eta_h=|1.1-1|=0.1$、$B=2$ を選べます。よって $\varepsilon_h=0.1+0.1\cdot2=0.3$。直接計算すると

$$
|A_hx^\dagger-y^\delta|=|2.2-2.1|=0.1\le0.3,
$$

であり、定義が狙った保証を確かめられます。上界は必ずしも等号で達成されません。

さらに $A=s$、$A_h=2s$（$s>0$）、$x^\dagger=1$、$y^\delta=y=s$ とすれば、観測ノイズは零でも $\eta_h=s$、$|A_hx^\dagger-y^\delta|=s$ です。$\delta=0$ だけを使って近似モデルを無理に逆にすると $x=1/2$ を得て真の解 $1$ から外れます。
<!-- definition-example-end -->

有効誤差 $\varepsilon_h$ を使った Tikhonov最小化

$$
x_{\alpha,h}^\delta
=\operatorname*{arg\,min}_{x\in X}
\bigl(\|A_hx-y^\delta\|_Y^2+\alpha\|x\|_X^2\bigr)
$$

において、不一致原理を $\|A_hx_{\alpha,h}^\delta-y^\delta\|=\tau\varepsilon_h$ として使います。ここからも収束の論理を確認できます。

<a id="thm-inv7-discretized-convergence"></a>

<!-- formal-statement-start -->
> **定理（作用素近似を含む不一致原理の強収束）**  
> 実 Hilbert 空間 $X,Y$、コンパクト線形作用素 $A:X\to Y$、非零の $y=Ax^\dagger$ と最小ノルム解 $x^\dagger$ を取る。コンパクト線形作用素 $A_h:X\to Y$ が $\|A_h-A\|\le\eta_h\to0$ を満たし、$\|x^\dagger\|\le B$（$B>0$）が分かっているとする。データは $\|y^\delta-y\|\le\delta$ であり、$\varepsilon_h=\delta+\eta_hB>0$ が零へ近づくとする。定数 $\tau>1$ を固定する。十分小さい $\varepsilon_h$ で一意に存在する解 $\alpha_{h,\delta}>0$ を

$$
\|A_hx_{\alpha_{h,\delta},h}^\delta-y^\delta\|_Y
=\tau\varepsilon_h
$$

> によって選ぶと、

$$
\|x_{\alpha_{h,\delta},h}^\delta-x^\dagger\|_X\longrightarrow0
\qquad(\varepsilon_h\downarrow0).
$$

> この主張は作用素ノルム近似と既知の $B$ に依存する。メッシュを粗くしたままでの収束や、$\delta$ だけを使った停止則を保証するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

先ほどの定理の最小化比較を、今度は $A_h$ に対して行います。真の解は近似モデルでは厳密解でないものの、残差が $\varepsilon_h$ 以下であると分かっています。強収束のためには、さらに $A_hx$ と $Ax$ の違いが有界な復元列に沿って消えることを確かめます。

<!-- proof-start -->
### 証明

まず $A_h$ の[残差の値域](#prop-inv7-residual-range)を用います。$\operatorname{dist}(y^\delta,\overline{\mathcal R(A_h)})$ は $\|y^\delta-A_hx^\dagger\|\le\varepsilon_h$ 以下です。下端は $\varepsilon_h<\tau\varepsilon_h$、上端は $\|y^\delta\|\ge\|y\|-\delta>\tau\varepsilon_h$（$\varepsilon_h\to0$ かつ $y\ne0$ より十分小さいとき）です。よって正のパラメータが一意に存在します。

$x_{h,\delta}=x_{\alpha_{h,\delta},h}^\delta$ と略します。最小化問題へ $x^\dagger$ を代入すれば

$$
\tau^2\varepsilon_h^2
+\alpha_{h,\delta}\|x_{h,\delta}\|_X^2
\le\|A_hx^\dagger-y^\delta\|_Y^2
+\alpha_{h,\delta}\|x^\dagger\|_X^2
\le\varepsilon_h^2+\alpha_{h,\delta}\|x^\dagger\|_X^2.
$$

従って $\|x_{h,\delta}\|\le\|x^\dagger\|$ です。この有界性を用いて、元の前向き作用素に関する誤差を三つに分けると

$$
\begin{aligned}
\|Ax_{h,\delta}-y\|_Y
&\le\|(A-A_h)x_{h,\delta}\|_Y
+\|A_hx_{h,\delta}-y^\delta\|_Y
+\|y^\delta-y\|_Y\\
&\le\eta_h\|x^\dagger\|_X
+\tau\varepsilon_h+\delta
\longrightarrow0.
\end{aligned}
$$

ここからは第3節の随伴近似を、この近似モデルに改めて適用します。$u_{h,\delta}=x_{h,\delta}-x^\dagger$、$M=\|x^\dagger\|$ とおけば $\|u_{h,\delta}\|\le2M$、さらに上で導いた三項の誤差評価から

$$
\|Au_{h,\delta}\|_Y
\le\eta_hM+\tau\varepsilon_h+\delta\longrightarrow0.
$$

任意の $\varepsilon>0$ を固定します。$x^\dagger\in(\ker A)^\perp=\overline{\mathcal R(A^*)}$ なので、$q\in Y$ を $\|x^\dagger-A^*q\|<\varepsilon$ となるよう選べます。随伴の定義と Cauchy--Schwarz の不等式より

$$
\begin{aligned}
|\langle u_{h,\delta},x^\dagger\rangle_X|
&\le\|u_{h,\delta}\|_X\|x^\dagger-A^*q\|_X
+|\langle Au_{h,\delta},q\rangle_Y|\\
&\le2M\varepsilon+
(\eta_hM+\tau\varepsilon_h+\delta)\|q\|_Y.
\end{aligned}
$$

$h,\delta$ による誤差が零へ向かってから $\varepsilon\downarrow0$ とすれば $\langle u_{h,\delta},x^\dagger\rangle_X\to0$ です。最後に

$$
0\le\|u_{h,\delta}\|_X^2
=\|x_{h,\delta}\|_X^2-\|x^\dagger\|_X^2
-2\langle u_{h,\delta},x^\dagger\rangle_X
\le-2\langle u_{h,\delta},x^\dagger\rangle_X\to0
$$

です。従って $\|x_{h,\delta}-x^\dagger\|_X\to0$ が従います。$\square$

<!-- proof-end -->

有限次元で単に $A_h$ の逆行列が計算できることと、上で証明した**元の方程式 $Ax=y$ の解への収束**とは別の問題です。離散化を細かくすること、ノイズが小さくなること、近似作用素の誤差を保証することがすべて必要です。

## 6. 選択法を使い分ける

| 方法 | 主に必要な情報 | 得られること・注意点 |
| --- | --- | --- |
| [事前選択](../INV6/index.md#thm-inv6-apriori-rate) | ノイズ上界 $\delta$、source conditionの指数と大きさの上界 | 明示的な収束率を計算できる。滑らかさ情報を誤れば保証が崩れる |
| Morozovの不一致原理 | 正しい誤差上界 $\delta$（近似なら $\delta+\eta_h B$）、$\tau>1$ | 滑らかさを知らずに強収束を証明できる。残差目標が到達可能であることが必要 |
| 一般化交差検証（GCV） | 線形モデルとノイズの統計的性質・予測誤差の指標 | 予測能力を基準に候補を比較する。ここでの決定論的誤差保証とは異なる |
| L曲線 | 残差ノルムと復元ノルムの対 | 曲がり角を探索する発見的方法で、曲がり角の存在や正しい $\alpha$ は一般には保証されない |

GCVとL曲線の概念的な比較はここまでとし、確率的仮定が必要な最適性定理を暗黙に援用しません。最も重要なのは、**何の誤差をどのノルムで保証しているのか**を選択則より先に確定することです。

## 7. 演習：選択則を自力で導き、壊してみる

### Level A：残差と有効誤差を計算する

<a id="ex-inv7-a01"></a>

### INV7-A01 一次元Tikhonovの残差
- Level: A

$A=2:\mathbb R\to\mathbb R$、$y^\delta=6$、$\alpha>0$ とする。$x_\alpha^\delta$ と $\rho_\delta(\alpha)$ を求め、残差の両端の極限を確認せよ。

<!-- solution-start -->
#### 詳細解答

[Tikhonov最小点の存在・一意性と正規方程式](../INV5/index.md#thm-inv5-tikhonov-minimizer)より $(4+\alpha)x=2\cdot6=12$ なので $x_\alpha^\delta=12/(4+\alpha)$。従って

$$
\rho_\delta(\alpha)
=\left|\frac{24}{4+\alpha}-6\right|
=\frac{6\alpha}{4+\alpha}.
$$

$\alpha\downarrow0$ で $0$、$\alpha\uparrow\infty$ で $6=\|y^\delta\|$ となります。ここでは $A$ が全射なので $\ker A^*=\{0\}$ で、[残差の値域](#prop-inv7-residual-range)とも一致します。
<!-- solution-end -->

<a id="ex-inv7-a02"></a>

### INV7-A02 観測不能方向の残差
- Level: A

$A=\operatorname{diag}(2,0)$、$z=(4,1)$ とする。$x_\alpha$ を求め、残差が $1$ 未満にならない理由を核・値域を使って説明せよ。

<!-- solution-start -->
#### 詳細解答

正規方程式は $(\operatorname{diag}(4,0)+\alpha I)x=(8,0)$ なので

$$
x_\alpha=\left(\frac{8}{4+\alpha},0\right),
\quad
Ax_\alpha-z=\left(-\frac{4\alpha}{4+\alpha},-1\right).
$$

従って残差二乗は $16\alpha^2/(4+\alpha)^2+1>1$ です。$\mathcal R(A)=\operatorname{span}\{e_1\}$、$\ker A^*=\operatorname{span}\{e_2\}$ で、$z$ の第2成分は常に復元不能なためです。
<!-- solution-end -->

<a id="ex-inv7-a03"></a>

### INV7-A03 不一致方程式を解く
- Level: A

$A=I:\mathbb R\to\mathbb R$、$y^\delta=3$、$\delta=1/2$、$\tau=2$ とする。Morozovパラメータと復元値を求め、残差方程式を再確認せよ。

<!-- solution-start -->
#### 詳細解答

残差は $3\alpha/(1+\alpha)$、目標は $\tau\delta=1$ です。従って

$$
\frac{3\alpha}{1+\alpha}=1
\quad\Longleftrightarrow\quad
3\alpha=1+\alpha
\quad\Longleftrightarrow\quad
\alpha=\frac12.
$$

復元値は $x_{1/2}^\delta=3/(3/2)=2$ で、$|2-3|=1=\tau\delta$ を満たします。また $0<1<3$ なので[存在条件](#thm-inv7-morozov-existence)にも合います。
<!-- solution-end -->

<a id="ex-inv7-a04"></a>

### INV7-A04 観測ノイズと作用素誤差
- Level: A

$A=\operatorname{diag}(1,1/2)$、$A_h=\operatorname{diag}(1,3/5)$、$x^\dagger=(0,2)$、$y=Ax^\dagger$、$y^\delta=(0,21/20)$ とする。$\delta=1/20$、$B=2$ が正しい保証であることを確かめ、$\eta_h$ と $\varepsilon_h$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$y=(0,1)$ より $\|y^\delta-y\|=1/20=\delta$ です。$A_h-A=\operatorname{diag}(0,1/10)$ だから、標準 Euclid ノルムについて作用素ノルムは $\eta_h=1/10$。さらに $\|x^\dagger\|=2=B$ です。[有効誤差の定義](#def-inv7-effective-noise)から

$$
\varepsilon_h=\frac1{20}+\frac1{10}\cdot2=\frac14.
$$

実際の近似モデルの残差は

$$
\|A_hx^\dagger-y^\delta\|
=\left|\frac65-\frac{21}{20}\right|
=\frac3{20}\le\frac14.
$$

上界と実際の残差は一致する必要がありません。
<!-- solution-end -->

<a id="ex-inv7-a05"></a>

### INV7-A05 事前選択との接続
- Level: A

[INV6の誤差上界](../INV6/index.md#thm-inv6-tikhonov-error)で $\nu=1/2$、$\|w\|\le M=4$、$\delta=0.04$ とする。[INV6の事前選択式](../INV6/index.md#thm-inv6-apriori-rate)から $\alpha$ とノイズ項・バイアス項を別々に求めよ。

<!-- solution-start -->
#### 詳細解答

$2\nu+1=2$ なので $\alpha=(\delta/M)^{2/2}=0.04/4=0.01$。従って $\sqrt\alpha=0.1$ で

$$
\frac{\delta}{2\sqrt\alpha}=\frac{0.04}{0.2}=0.2,
\qquad
M\alpha^{1/2}=4\cdot0.1=0.4.
$$

合計上界は $0.6$。これは[事前選択](../INV6/index.md#thm-inv6-apriori-rate)の結果であり、実測残差を $\tau\delta$ に等しくしたわけではありません。
<!-- solution-end -->

### Level B：存在と収束の仮定を使う

<a id="ex-inv7-b01"></a>

### INV7-B01 非全射の場合の唯一の選択
- Level: B

$A=\operatorname{diag}(1,0)$、$y=(3,0)$、$y^\delta=(3,1)$、$\delta=1$、$\tau=1.1$ とする。ノイズ条件を確かめ、不一致原理の $\alpha>0$ が一意に存在することを示し、$\alpha$ を式で求めよ。

<!-- solution-start -->
#### 詳細解答

$y=Ax^\dagger$ を満たす最小ノルム解は $x^\dagger=(3,0)$。$\|y^\delta-y\|=1=\delta$ です。第2方向は $\ker A^*$ に属するので残差二乗は

$$
\rho_\delta(\alpha)^2
=1+\left(\frac{3\alpha}{1+\alpha}\right)^2.
$$

下端は $1$、上端は $\sqrt{10}$。$1<\tau\delta=1.1<\sqrt{10}$ なので[残差命題](#prop-inv7-residual-range)から一意の解があります。式を解くと

$$
\frac{3\alpha}{1+\alpha}
=\sqrt{1.1^2-1}=\sqrt{0.21},
\qquad
\alpha=\frac{\sqrt{0.21}}{3-\sqrt{0.21}}.
$$

分母は正であり、この値は確かに正です。
<!-- solution-end -->

<a id="ex-inv7-b02"></a>

### INV7-B02 強収束の鍵となるノルム比較
- Level: B

$y=Ax^\dagger$、$\|y^\delta-y\|\le\delta$、$\tau>1$ で Tikhonov最小点の残差が $\tau\delta$ に等しいとする。最小化性から $\|x_\alpha^\delta\|\le\|x^\dagger\|$ と、さらに $\delta^2/\alpha$ に対する上界を導け。これだけで $\delta/\sqrt\alpha\to0$ と結論できるか。

<!-- solution-start -->
#### 詳細解答

[最小化定理](../INV5/index.md#thm-inv5-tikhonov-minimizer)を $x^\dagger$ と比較し、

$$
\tau^2\delta^2+\alpha\|x_\alpha^\delta\|^2
\le\delta^2+\alpha\|x^\dagger\|^2
$$

を得ます。$\alpha>0$ で割ると

$$
\|x_\alpha^\delta\|^2
+\frac{(\tau^2-1)\delta^2}{\alpha}
\le\|x^\dagger\|^2.
$$

従って

$$
\|x_\alpha^\delta\|\le\|x^\dagger\|,
\qquad
\frac{\delta^2}{\alpha}
\le\frac{\|x^\dagger\|^2}{\tau^2-1}.
$$

右辺は一般に零へ向かわないので、**有界性だけから $\delta/\sqrt\alpha\to0$ は示せません**。それでも[強収束定理](#thm-inv7-morozov-convergence)は最小ノルム性と弱収束部分列を使って強収束を証明しています。
<!-- solution-end -->

<a id="ex-inv7-b03"></a>

### INV7-B03 近似モデルの有限次元テスト
- Level: B

$A=1$、$A_h=1.1$、$x^\dagger=2$、$y^\delta=2.1$、$\delta=0.1$、$\eta_h=0.1$、$B=2$、$\tau=1.5$ とする。近似モデルでの有効誤差、不一致原理の $\alpha$、復元値を求め、最小ノルム比較の予想と照合せよ。

<!-- solution-start -->
#### 詳細解答

[有効誤差](#def-inv7-effective-noise)は $\varepsilon_h=0.1+0.1\cdot2=0.3$、残差目標は $r=1.5\cdot0.3=0.45$ です。$r<|y^\delta|=2.1$ なので選択可能です。スカラー作用素 $s=1.1$ に対し第4節の式を代入すると

$$
\alpha=\frac{r s^2}{|y^\delta|-r}
=\frac{0.45\cdot1.21}{2.1-0.45}
=\frac{0.5445}{1.65}=0.33.
$$

復元値は

$$
x_{\alpha,h}^\delta
=\frac{s y^\delta}{s^2+\alpha}
=\frac{1.1\cdot2.1}{1.21+0.33}
=\frac{2.31}{1.54}=1.5.
$$

直接に $|1.1\cdot1.5-2.1|=0.45$、$\|x_{\alpha,h}^\delta\|=1.5\le\|x^\dagger\|=2$ を確認できます。単一の粗い近似の復元が真の解に等しいと主張したわけではありません。
<!-- solution-end -->

<a id="ex-inv7-b04"></a>

### INV7-B04 等式が解けないデータ
- Level: B

$A=I:\mathbb R\to\mathbb R$、$y=0$、$\|y^\delta\|\le\delta$、$\tau>1$ とする。Morozovの残差方程式が正の $\alpha$ を持たないことを示せ。また $\alpha=1$ と固定した Tikhonov解の誤差が零へ収束することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$y^\delta$ は $|y^\delta|\le\delta$ を満たします。$x_\alpha^\delta=y^\delta/(1+\alpha)$ より

$$
\rho_\delta(\alpha)
=\frac{\alpha}{1+\alpha}|y^\delta|
<|y^\delta|
\le\delta<\tau\delta.
$$

従って等式を満たす正の $\alpha$ はありません。真の最小ノルム解は $x^\dagger=0$ なので $\alpha=1$ とすると

$$
|x_1^\delta-x^\dagger|=\frac{|y^\delta|}{2}\le\frac\delta2\longrightarrow0.
$$

[存在定理](#thm-inv7-morozov-existence)の $\|y^\delta\|>\tau\delta$ が欠けていますが、収束できないという意味ではありません。
<!-- solution-end -->

### Level C：有限ランク近似で収束論理を完成する

<a id="ex-inv7-c01"></a>

### INV7-C01 $\ell^2$ 対角問題を離散化して復元する
- Level: C

$X=Y=\ell^2$、$(Ax)_j=x_j/j$（$j\ge1$）とする。$n\ge4$ ごとに $(A_nx)_j=x_j/j$（$j\le n$）、$(A_nx)_j=0$（$j>n$）と置く。$x^\dagger=e_1+e_2$、$y=Ax^\dagger$、$y^{(n)}=y+n^{-1}e_n$、$\delta_n=n^{-1}$、$B=\sqrt2$、$\tau=3/2$ とする。

(1) $A_n$ は有限ランクで $\|A_n-A\|=1/(n+1)$、$\|y^{(n)}-y\|=\delta_n$ を示せ。(2) $\varepsilon_n=\delta_n+B/(n+1)$ に対する不一致方程式が $n\ge4$ で一意に解けることを示せ。(3) 得られる復元値 $x_n$ が $x^\dagger$ に強収束することを、ノルムと前向き残差を使って再証明せよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $A_n$ の値域は $\operatorname{span}\{e_1,\ldots,e_n\}$ に含まれるため有限ランクです。$A-A_n$ は $j>n$ の成分に $1/j$ を掛ける作用素なので、任意の $\|x\|=1$ に対し

$$
\|(A-A_n)x\|^2=\sum_{j>n}\frac{|x_j|^2}{j^2}
\le\frac1{(n+1)^2}\sum_{j>n}|x_j|^2
\le\frac1{(n+1)^2}.
$$

$x=e_{n+1}$ では等号となるので $\|A-A_n\|=1/(n+1)$ です。また $y=e_1+\tfrac12e_2$、$y^{(n)}-y=n^{-1}e_n$ だからノイズノルムは $1/n$ です。$\|x^\dagger\|=\sqrt2=B$ で、$A$ は単射（全座標の係数 $1/j$ が正）なので $x^\dagger$ は最小ノルム解です。

**(2)** [有効誤差](#def-inv7-effective-noise)は

$$
\varepsilon_n=\frac1n+\frac{\sqrt2}{n+1}>0.
$$

$n\ge4$ なら $\varepsilon_n\le1/4+\sqrt2/5<0.533$ で、$\tau\varepsilon_n<0.800$ です。一方、$n\ge4$ により $e_n\perp e_1,e_2$ で

$$
\|y^{(n)}\|^2=1+\frac14+\frac1{n^2}\ge\frac54,
\qquad
\|y^{(n)}\|\ge\frac{\sqrt5}{2}>1.
$$

よって $\|y^{(n)}\|>\tau\varepsilon_n$。さらに $y^{(n)}\in\mathcal R(A_n)$（$n$ までの有限個の座標からなる）なので残差の下端は零です。[残差の値域](#prop-inv7-residual-range)から解 $\alpha_n>0$ は一意です。

**(3)** $x_n$ を不一致原理で選んだ Tikhonov最小点とすると、$A_nx^\dagger=y$、$\|y^{(n)}-A_nx^\dagger\|=1/n\le\varepsilon_n$ です。最小化性を $x^\dagger$ と比較し、

$$
\tau^2\varepsilon_n^2+\alpha_n\|x_n\|^2
\le\varepsilon_n^2+\alpha_n\|x^\dagger\|^2
$$

から $\|x_n\|\le\sqrt2$ を得ます。さらに

$$
\begin{aligned}
\|Ax_n-y\|
&\le\|(A-A_n)x_n\|
+\|A_nx_n-y^{(n)}\|
+\|y^{(n)}-y\|\\
&\le\frac{\sqrt2}{n+1}
+\frac32\left(\frac1n+\frac{\sqrt2}{n+1}\right)
+\frac1n\longrightarrow0.
\end{aligned}
$$

この対角作用素は自己共役で、$q=e_1+2e_2$ と置けば $A^*q=Aq=e_1+e_2=x^\dagger$ です。$u_n=x_n-x^\dagger$ と置き、随伴の定義を使うと

$$
|\langle u_n,x^\dagger\rangle|
=|\langle Au_n,q\rangle|
\le\|Ax_n-y\|\|q\|
=\sqrt5\,\|Ax_n-y\|\longrightarrow0.
$$

先ほどのノルム上界 $\|x_n\|\le\sqrt2=\|x^\dagger\|$ から

$$
\begin{aligned}
0\le\|u_n\|^2
&=\|x_n\|^2-\|x^\dagger\|^2
-2\langle u_n,x^\dagger\rangle\\
&\le-2\langle u_n,x^\dagger\rangle\longrightarrow0.
\end{aligned}
$$

従って $\|x_n-x^\dagger\|\to0$ です。この例では随伴を使った近似を厳密等式 $x^\dagger=A^*q$ として実行でき、弱収束の一般定理を使わずに結論できます。

<!-- solution-end -->

---

今回の収束証明は、**正しい残差上界・復元ノルムの制御・元の前向き問題への接近**の三つを組み合わせたものです。次のINV8「一般変分正則化の解は存在するか」では二乗ノルムに限らない罰則を使い、最小点の存在・安定性を改めて検討します。
