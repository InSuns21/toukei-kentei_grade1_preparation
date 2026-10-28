# QFT8 フェルミオンFock空間・反交換関係とDirac伝播関数

<!-- definition-example-audit: strict -->

[QFT7の平面波スピノル](../QFT7/index.md#def-qft7-plane-waves)には正振動数解 $u_s(p)e^{-ip\cdot x}$ と負振動数解 $v_s(p)e^{+ip\cdot x}$ が二つずつありました。しかしこれらはまだ複素数値の古典場です。後者をそのまま「負エネルギー粒子」とすれば、量子論のエネルギーに下限を持たせられません。

そこで、粒子と反粒子をともに**正のエネルギーを持つ励起**として作り、同じ一粒子状態を二回占められないという性質を実現します。[QFT4のボースFock空間](../QFT4/index.md#def-qft4-fock-space)では粒子変数を交換しても符号が変わりませんでしたが、ここでは交換すると符号が反転する波動関数を使います。その符号が、場の局所性と時間順序伝播関数にも現れます。

全章でMinkowski時空 $\mathbb R^{1,3}$、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$、自由Dirac場の質量 **$m>0$** とします。正エネルギー質量殻とFourier規約は

$$
p^\mu=(E_{\boldsymbol p},\boldsymbol p),\quad
E_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2},\quad
p\cdot x=E_{\boldsymbol p}t-\boldsymbol p\cdot\boldsymbol x,\quad
d\mu(\boldsymbol p)=\frac{d^3p}{(2\pi)^3}
$$

です。$\gamma^\mu$ は[QFT7のClifford行列](../QFT7/index.md#def-qft7-clifford)、$\bar\psi=\psi^\dagger\gamma^0$ は[Dirac随伴](../QFT7/index.md#def-qft7-adjoint-action)です。$\psi$ は今度は作用素値**分布**になります。以下の点 $x$ における式や $b_s(\boldsymbol p)$ は波束で積分するための記法であり、点での有界作用素を意味しません。真空期待値は、内積第1変数線形の規約で $\omega_0(A)=\langle A\Omega,\Omega\rangle$ と書きます。

## 1. 反対称な多粒子状態と生成・消滅演算子

一粒子の運動量波束には二つのスピン成分があり、粒子と反粒子をさらに区別します。したがって一粒子Hilbert空間を二つの直和

$$
\mathfrak h=\mathfrak h_b\oplus\mathfrak h_d,
\qquad
\mathfrak h_b=\mathfrak h_d=L^2(\mathbb R^3,d\mu;\mathbb C^2)
$$

とします。添字 $b$ が粒子、$d$ が反粒子を表し、内積 $\langle f,g\rangle=\sum_s\int f_s\overline{g_s}\,d\mu$ は[QFT4の規約](../QFT4/index.md#def-qft4-fock-space)に合わせて**第1変数線形**です。

二つの直交単位波束 $f,g$ を入れ替えるときの符号を反転させれば、状態は $f\otimes g-g\otimes f$ に比例します。同じ $f$ を二回使うと、この差は零になります。これを任意の粒子数へ広げます。

<a id="def-qft8-fermion-fock"></a>

<!-- formal-statement-start -->
> **定義（フェルミオンFock空間）**
> 複素Hilbert空間 $\mathfrak h=\mathfrak h_b\oplus\mathfrak h_d$ の $n$ 回テンソル積で、二つの粒子変数を交換すると符号が反転する部分空間を $\bigwedge^n\mathfrak h$ と書く。$\bigwedge^0\mathfrak h=\mathbb C$ とし、フェルミオンFock空間、真空および有限粒子領域を

$$
\mathcal F_a(\mathfrak h)=\bigoplus_{n=0}^\infty\bigwedge^n\mathfrak h,
\qquad \Omega=(1,0,0,\ldots),
\qquad \mathcal D_{\mathcal S}=\bigoplus_{n\,\mathrm{finite}}
\bigwedge^n\mathcal S(\mathbb R^3;\mathbb C^4)
$$

> と定義する。最後の直和は非零成分が有限個で、各波動関数が全変数についてSchwartz級であることを意味する。$n$ 粒子成分のノルムは積測度の $L^2$ ノルムとする。
<!-- formal-statement-end -->

ここで $\bigwedge^n\mathcal S$ は反対称化した有限和およびそのSchwartz閉包のうち、$n$ 変数でSchwartz級の関数全体という意味です。有限粒子Schwartz領域はFock空間に稠密で、運動量の多項式を掛ける自由エネルギーにも安定です。

<!-- definition-example-start: def-qft8-fermion-fock -->
### 例：二粒子の反対称性を直接確認する

**定義の確認**：同じ粒子種で直交する単位波束 $f,g\in\mathcal S$ を選び、二粒子成分を

$$
\Psi_2(k_1,k_2)
=\frac{f(k_1)g(k_2)-g(k_1)f(k_2)}{\sqrt2}
$$

とします。$k=(\boldsymbol p,s,\mathrm{species})$ は運動量・スピン・種類の組です。$k_1,k_2$ を交換すると $\Psi_2(k_2,k_1)=-\Psi_2(k_1,k_2)$、各項はSchwartz級です。また積を展開して積分すると

$$
\|\Psi_2\|^2=\|f\|^2\|g\|^2-|\langle f,g\rangle|^2=1.
$$

$g=f$ なら分子は恒等的に零です。異なる種の波束は $\mathfrak h_b$ と $\mathfrak h_d$ に属して直交しますが、それらを交換しても**同じ一つの反対称Fock空間内**で負号が付きます。
<!-- definition-example-end -->

次に実際の演算子を作ります。$\operatorname{Alt}_n$ を $n$ 個の変数の反対称射影、すなわち各置換の符号を掛けた和を $n!$ で割る操作とします。これは任意の $n$ 変数関数を反対称部分へ写します。

<a id="def-qft8-ladder"></a>

<!-- formal-statement-start -->
> **定義（フェルミオンの生成・消滅演算子）**
> $f\in\mathfrak h$、$\Psi\in\mathcal D_{\mathcal S}$ に対し、生成演算子 $c^\dagger(f)$ と消滅演算子 $c(f)$ を成分ごとに

$$
\begin{aligned}
(c^\dagger(f)\Psi)_{n+1}
&=\sqrt{n+1}\,\operatorname{Alt}_{n+1}(f\otimes\Psi_n),\\
(c(f)\Psi)_{n}(k_1,\ldots,k_n)
&=\sqrt{n+1}\int\overline{f(k)}
\Psi_{n+1}(k,k_1,\ldots,k_n)\,dk
\end{aligned}
$$

> で定める。$dk$ は運動量の $d\mu$ と離散スピン・種類についての和をまとめたものとする。$c^\dagger(f)$ は $f$ に線形、$c(f)$ は反線形で、互いに随伴である。$b^\dagger(f)=c^\dagger(f,0)$、$d^\dagger(g)=c^\dagger(0,g)$ とし、消滅側も同様に書く。
<!-- formal-statement-end -->

反対称化を成分表示すれば、生成側の係数は $1/\sqrt{n+1}$、各スロットへ $f$ を挿入する項の符号は $(-1)^{j-1}$ となります。消滅側は先頭スロットを $f$ で縮約します。この二操作が随伴であることは、内積で先頭スロットを積分したとき反対称性により $n+1$ 項が同じ寄与になることから確かめられます。

<!-- definition-example-start: def-qft8-ladder -->
### 例：一つのモードの二状態

**定義の確認**：単位波束 $f$ に対し $c^\dagger(f)\Omega=f$、$c(f)\Omega=0$ です。さらに生成の定義から

$$
c^\dagger(f)c^\dagger(f)\Omega
=\sqrt2\operatorname{Alt}_2(f\otimes f)=0.
$$

一方、消滅の積分を一粒子状態へ適用すれば $c(f)f=\int|f(k)|^2dk\,\Omega=\Omega$ です。$\Omega,f$ の二状態では生成と消滅が互いを行き来させ、$f$ より上の同じモードの励起は存在しません。
<!-- definition-example-end -->

<a id="thm-qft8-car"></a>

<!-- formal-statement-start -->
> **定理（外積構成による正準反交換関係）**
> $f,g\in\mathfrak h$ に対し、$\mathcal F_a(\mathfrak h)$ 上で次の正準反交換関係（CAR）が成立する。$\{A,B\}=AB+BA$ と書く。

$$
\begin{aligned}
\{c(f),c^\dagger(g)\}&=\langle g,f\rangle I,\\
\{c(f),c(g)\}&=0,\qquad
\{c^\dagger(f),c^\dagger(g)\}=0.
\end{aligned}
$$

> 特に $\bigl(c^\dagger(f)\bigr)^2=0$ であり、粒子と反粒子の異なる種類の演算子も相互に反交換する。生成・消滅演算子は $\|c(f)\|,\|c^\dagger(f)\|\le\|f\|$ の有界演算子へ延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

生成後の粒子をすぐ消す場合だけが内積を残し、それ以外の項は操作順を逆にした項と符号が反対になります。ボースの場合は交換子の**差**でしたが、ここでは反交換子の**和**が相殺を作ります。

<!-- proof-start -->
### 証明

まず $f,g$ と $\Psi_n$ をSchwartz級として成分式を使います。$c^\dagger(g)$ の $n+1$ 粒子成分を展開すると

$$
\begin{aligned}
(c^\dagger(g)\Psi)_{n+1}(k,k_1,\ldots,k_n)
=\frac1{\sqrt{n+1}}\bigg(&g(k)\Psi_n(k_1,\ldots,k_n)\\
&+\sum_{j=1}^n(-1)^j g(k_j)
\Psi_n(k,k_1,\ldots,\widehat{k_j},\ldots,k_n)\bigg).
\end{aligned}
$$

上式に消滅を適用すると、先頭の $g(k)$ は

$$
\int\overline{f(k)}g(k)\,dk\,\Psi_n
=\langle g,f\rangle\Psi_n
$$

を与えます。残る $j$ 番目の項は $(-1)^j$ の符号です。逆の順の $c^\dagger(g)c(f)\Psi$ では、縮約で $\sqrt n$、挿入で $1/\sqrt n$ が掛かり、同じ積分に符号 $(-1)^{j-1}$ が付きます。よって二順序の**和**では全 $j$ 項が消えて内積だけ残ります。

生成二個の積は、反対称化射影を続けて適用するため

$$
c^\dagger(f)c^\dagger(g)\Psi_n
=\sqrt{(n+1)(n+2)}\operatorname{Alt}_{n+2}
(f\otimes g\otimes\Psi_n)
$$

となります。$f,g$ を交換すると反対称射影が負号を与えるので生成同士のCARが従い、随伴を取れば消滅同士のCARも従います。$f=g$ では $2(c^\dagger(f))^2=0$ です。

最後に $f=g$ とした第一式の期待値を取ると

$$
\|c(f)\Psi\|^2+\|c^\dagger(f)\Psi\|^2
=\|f\|^2\|\Psi\|^2.
$$

したがって両演算子のノルムは $\|f\|$ 以下で、稠密な有限粒子領域から全Fock空間へ連続延長されます。極限後もCARは保たれます。
<!-- proof-end -->

反交換関係は同じモードへの二重占有を禁じますが、別の直交モード $f,g$ について $c^\dagger(f)c^\dagger(g)\Omega$ は零ではありません。これがPauli排他性の正確な意味です。

## 2. 粒子・反粒子を含む量子Dirac場

古典Dirac場の正振動数係数を粒子の**消滅**へ、負振動数係数を反粒子の**生成**へ置き換えます。こうすると $v_s e^{+ip\cdot x}$ の位相を保ったまま、負エネルギーの状態を作る必要がなくなります。

<a id="def-qft8-field"></a>

<!-- formal-statement-start -->
> **定義（自由量子Dirac場）**
> $m>0$ とし、[QFT7の平面波スピノル](../QFT7/index.md#def-qft7-plane-waves) $u_s(p),v_s(p)$（$s=1,2$、$p^0=E_{\boldsymbol p}>0$）を固定する。上のCARを満たす独立な粒子・反粒子モード $b_s,d_s$ から、自由Dirac場とDirac随伴場を作用素値分布として

$$
\begin{aligned}
\psi_\alpha(x)
&=\sum_{s=1}^2\int\frac{d\mu(\boldsymbol p)}{\sqrt{2E_{\boldsymbol p}}}
\left(b_s(\boldsymbol p)u_{s\alpha}(p)e^{-ip\cdot x}
+d_s^\dagger(\boldsymbol p)v_{s\alpha}(p)e^{+ip\cdot x}\right),\\
\bar\psi_\beta(x)
&=\sum_{s=1}^2\int\frac{d\mu(\boldsymbol p)}{\sqrt{2E_{\boldsymbol p}}}
\left(b_s^\dagger(\boldsymbol p)\bar u_{s\beta}(p)e^{+ip\cdot x}
+d_s(\boldsymbol p)\bar v_{s\beta}(p)e^{-ip\cdot x}\right)
\end{aligned}
$$

> と定める。運動量モードのCARは

$$
\{b_s(\boldsymbol p),b_r^\dagger(\boldsymbol q)\}
=\{d_s(\boldsymbol p),d_r^\dagger(\boldsymbol q)\}
=(2\pi)^3\delta_{sr}\delta^3(\boldsymbol p-\boldsymbol q)
$$

> であり、その他の同種・異種の反交換子は零である。
<!-- formal-statement-end -->

このデルタ式は[波束CAR](#thm-qft8-car)を関数で二重積分した意味です。$\psi_\alpha$ を $F_\alpha\in\mathcal S(\mathbb R^4)$ でsmearingすると、Fourier変換を $p^0=\pm E_{\boldsymbol p}$ に制限した急減少の二成分波束が $b,d^\dagger$ に掛かります。$m>0$ かつ $u_s,v_s$ は高々多項式増大なので、それらは $\mathfrak h$ に属し、[有界なCAR演算子](#thm-qft8-car)の和として定義できます。場の点積や同一点の積分は、この事実だけでは定義されません。

<!-- definition-example-start: def-qft8-field -->
### 例：真空から現れるのは正エネルギーの反粒子

**定義の確認**：$b_s(\boldsymbol p)\Omega=d_s(\boldsymbol p)\Omega=0$ を波束の意味で課します。真空へ $\psi(x)$ を作用させると消滅項は消え、$d_s^\dagger v_s e^{+ip\cdot x}$ だけが残ります。一方 $\bar\psi(x)\Omega$ には $b_s^\dagger\bar u_s e^{+ip\cdot x}$ が残ります。したがって場は二種類の励起を結び、[Dirac方程式](../QFT7/index.md#thm-qft7-factorization)は各指数とスピノルの組合せで成立します。

例えば運動量を局在させた波束 $g$ に対し $d^\dagger(g)\Omega$ は一反粒子状態であり、後で示すエネルギーは $\int E_{\boldsymbol p}|g(\boldsymbol p)|^2d\mu>0$ です。指数 $e^{+ip\cdot x}$ の符号をエネルギー固有値の符号と同一視しないことが重要です。
<!-- definition-example-end -->

### 2.1 正のエネルギーと保存電荷

粒子数を測る演算子は、$n$ 粒子波動関数の各引数が $b$ 種か $d$ 種かを数える操作です。自由Hamiltonianは各励起の $E_{\boldsymbol p}$ の和にします。これはFock表現のもとでの正エネルギーの選択です。

<a id="def-qft8-observables"></a>

<!-- formal-statement-start -->
> **定義（正規順序化したエネルギーと電荷）**
> $\mathcal D_{\mathcal S}$ 上で、一粒子に $E_{\boldsymbol p}$ を掛ける演算子の各粒子への和を $H$、$b$ 種へ $+1$、$d$ 種へ $-1$ を掛ける各粒子への和を $Q$ とする。運動量モードの記法では

$$
\begin{aligned}
H&=\sum_s\int d\mu(\boldsymbol p)\,E_{\boldsymbol p}
\bigl(b_s^\dagger b_s+d_s^\dagger d_s\bigr),\\
Q&=\sum_s\int d\mu(\boldsymbol p)
\bigl(b_s^\dagger b_s-d_s^\dagger d_s\bigr)
\end{aligned}
$$

> と表す。場の二次式を扱う際には生成を左へ移動し、CARの負符号を含めて真空定数を除くことをフェルミオンの正規順序とする。電荷の単位は粒子が $+1$ とする。
<!-- formal-statement-end -->

モード積分は分布の点積ではなく、有限粒子波動関数にエネルギーや電荷の重みを掛ける操作の略記です。$H,Q$ の定義域はそれぞれエネルギー和・電荷和で重み付けした二乗可積分性を満たすベクトルに拡張できます。$\mathcal D_{\mathcal S}$ は両者の共通稠密領域です。

<!-- definition-example-start: def-qft8-observables -->
### 例：一つずつの電荷を確認する

**定義の確認**：単位波束 $f\in\mathfrak h_b$、$g\in\mathfrak h_d$ を取り、$b^\dagger(f)\Omega$ と $d^\dagger(g)\Omega$ を考えます。$Q$ はそれぞれに $+1,-1$ を掛け、$H$ の期待値は $\int E|f|^2d\mu$ と $\int E|g|^2d\mu$ です。両者とも $E\ge m>0$ なので正です。

両種を一つずつ作る $b^\dagger(f)d^\dagger(g)\Omega$ は電荷零、エネルギー期待値は二つの正の積分の和になります。異種演算子の交換順にも[CAR](#thm-qft8-car)による負号があることを忘れません。
<!-- definition-example-end -->

<a id="prop-qft8-positive-charge"></a>

<!-- formal-statement-start -->
> **命題（正エネルギーと反粒子の反対電荷）**
> 上の自由Fock表現で $H\ge0$、$H\Omega=Q\Omega=0$ である。粒子一個に $Q=+1$、反粒子一個に $Q=-1$ が対応し、各波束生成演算子について

$$
[Q,b^\dagger(f)]=b^\dagger(f),\qquad
[Q,d^\dagger(g)]=-d^\dagger(g),\qquad
[Q,\psi_\alpha(F)]=-\psi_\alpha(F)
$$

> が成立する。最後の式は時空試験関数 $F$ でsmearingした場についての等式である。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーは各粒子の正の $E$ の和なので下から有界です。電荷は二種類の粒子数の**差**であり、場は粒子を一つ消すか反粒子を一つ作るため、どちらの項も電荷を一つ減らします。

<!-- proof-start -->
### 証明

反対称な $n$ 粒子波動関数で $H$ は $\sum_{j=1}^n E_{\boldsymbol p_j}$ を掛けます。$E_{\boldsymbol p_j}\ge m>0$ だから

$$
\langle H\Psi,\Psi\rangle
=\sum_{n\ge0}\int\left(\sum_{j=1}^nE_{\boldsymbol p_j}\right)|\Psi_n|^2\,dk_1\cdots dk_n\ge0.
$$

空和は零なので真空のエネルギー・電荷は零です。$Q$ は各引数の種類を数え、$b^\dagger(f)$ によって一つ $b$ が増えると固有値が $+1$、$d^\dagger(g)$ で一つ $d$ が増えると $-1$ 変わります。従って、共通有限粒子領域上の交換子は前二式です。随伴により $[Q,b(f)]=-b(f)$、$[Q,d(g)]=d(g)$ も成立します。

[場の展開](#def-qft8-field)には $b$ と $d^\dagger$ しか現れず、いずれも電荷を $-1$ だけ変えるので、その積分にも $[Q,\psi_\alpha(F)]=-\psi_\alpha(F)$ が成立します。各波束の積分は前述のSchwartz条件で定義されます。
<!-- proof-end -->

この正規順序の符号は古典Dirac場のHamiltonian密度とも整合します。$\boldsymbol\alpha=\gamma^0\boldsymbol\gamma$、$\beta=\gamma^0$ とし、有限個の運動量モードだけを残して次の密度を空間積分します。

$$
\psi^\dagger(-i\boldsymbol\alpha\cdot\boldsymbol\nabla+\beta m)\psi
$$

[正負振動数のDirac方程式](../QFT7/index.md#def-qft7-plane-waves)により一粒子Hamiltonianは $u_s(p)e^{+i\boldsymbol p\cdot\boldsymbol x}$ に $+E$、$v_s(p)e^{-i\boldsymbol p\cdot\boldsymbol x}$ に $-E$ を掛けます。空間積分が同一の運動量を選び、交差項は[QFT7の直交性の検算](../QFT7/index.md#thm-qft7-spin-sums)にある $u_s^\dagger(\boldsymbol p)v_r(-\boldsymbol p)=0$ により消えます。

$u_s^\dagger u_r=v_s^\dagger v_r=2E\delta_{sr}$ と場の $1/\sqrt{2E}$ が相殺するため、各モードから次を得ます。

$$
\begin{aligned}
H_{\rm raw}&=E(b^\dagger b-d d^\dagger)
=E(b^\dagger b+d^\dagger d)-E,\\
Q_{\rm raw}&=b^\dagger b+d d^\dagger
=b^\dagger b-d^\dagger d+1.
\end{aligned}
$$

ここで $dd^\dagger=1-d^\dagger d$ を使いました。有限モードでの真空定数を除いた式が[上の定義](#def-qft8-observables)で、連続無限モードの定数を有限値として扱ってはいません。

## 3. 等時刻CARをスピン和から再現する

Fock演算子にCARを課しただけでは、四成分の**場**が $\delta_{\alpha\beta}\delta^3$ を再現するとはまだ分かりません。係数が[QFT7のスピン和](../QFT7/index.md#thm-qft7-spin-sums)と一致することを、ここで直接検算します。

<a id="thm-qft8-equal-time"></a>

<!-- formal-statement-start -->
> **定理（Dirac場の等時刻正準反交換関係）**
> [自由量子Dirac場](#def-qft8-field)について任意の固定時刻 $t$ で、空間変数の分布として

$$
\begin{aligned}
\{\psi_\alpha(t,\boldsymbol x),\psi_\beta^\dagger(t,\boldsymbol y)\}
&=\delta_{\alpha\beta}\delta^3(\boldsymbol x-\boldsymbol y)I,\\
\{\psi_\alpha(t,\boldsymbol x),\psi_\beta(t,\boldsymbol y)\}
&=0,\qquad
\{\psi_\alpha^\dagger(t,\boldsymbol x),\psi_\beta^\dagger(t,\boldsymbol y)\}=0.
\end{aligned}
$$

> 随伴場に直すと第一式は $\{\psi_\alpha(t,\boldsymbol x),\bar\psi_\beta(t,\boldsymbol y)\}=(\gamma^0)_{\alpha\beta}\delta^3(\boldsymbol x-\boldsymbol y)I$ である。
<!-- formal-statement-end -->

### 証明の見取り図

反交換子には $bb^\dagger$ と $d^\dagger d$ の二種類だけが残ります。後者の運動量を $\boldsymbol p\mapsto-\boldsymbol p$ と変換すると、四成分スピノルの完全性が一つのFourierデルタを作ります。

<!-- proof-start -->
### 証明

[CAR](#thm-qft8-car)と[場の展開](#def-qft8-field)から、時刻をそろえた第一式の左辺は

$$
\sum_s\int\frac{d\mu(\boldsymbol p)}{2E_{\boldsymbol p}}
\left[u_{s\alpha}(p)u_{s\beta}^\dagger(p)e^{i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}
+v_{s\alpha}(p)v_{s\beta}^\dagger(p)e^{-i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}\right]I.
$$

第二項で $\boldsymbol p$ の符号を反転し $p_-=(E_{\boldsymbol p},-\boldsymbol p)$ と置きます。[QFT7のスピン和](../QFT7/index.md#thm-qft7-spin-sums)の右から $\gamma^0$ を掛けると

$$
\begin{aligned}
\sum_s u_s(p)u_s^\dagger(p)&=(\not p+mI_4)\gamma^0,\\
\sum_s v_s(p_-)v_s^\dagger(p_-)&=(\not p_--mI_4)\gamma^0.
\end{aligned}
$$

$\not p=E\gamma^0-\boldsymbol\gamma\cdot\boldsymbol p$、$\not p_-=E\gamma^0+\boldsymbol\gamma\cdot\boldsymbol p$ なので、和は

$$
\left[(\not p+mI_4)+(\not p_--mI_4)\right]\gamma^0
=2E_{\boldsymbol p}\gamma^0\gamma^0=2E_{\boldsymbol p}I_4.
$$

よって残る積分は $I_4\int e^{i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}d\mu=I_4\delta^3(\boldsymbol x-\boldsymbol y)$ です。他の二式は $bb,dd,b d^\dagger$ 等の反交換子がすべて零であることから従います。右から $\gamma^0$ を掛ければ随伴場の式も得られます。
<!-- proof-end -->

等時刻CARはボース場の $[\Phi,\Pi]=i\delta^3$ と異なり、場とそのHermite随伴を直接結びます。スピノルの四成分全てを再現するため、正・負振動数の**両方**が必要でした。

## 4. 反交換子の因果性と空間的分離

空間的に離れた二領域の場を入れ替えるとき、フェルミオンでは場の積の**差**ではなく**和（反交換子）**が消えます。この違いを、[QFT5のPauli–Jordan分布](../QFT5/index.md#def-qft5-pauli-jordan)から導きます。QFT5の記号は $C=W(z)-W(-z)$、$C=-iE$ で、$E$ は実の因果核です。

<a id="thm-qft8-locality"></a>

<!-- formal-statement-start -->
> **定理（Dirac場の因果的反交換子と局所性）**
> $m>0$ の[自由量子Dirac場](#def-qft8-field)に対し、$z=x-y$ とすると

$$
\{\psi_\alpha(x),\bar\psi_\beta(y)\}
=\left[(i\gamma^\mu\partial_{z^\mu}+mI_4)C(z)\right]_{\alpha\beta}I.
$$

> 右辺はスカラーPauli–Jordan分布 $C$ の分布微分である。特に $|\boldsymbol z|>|z^0|$ となる空間的分離では、この反交換子の分布は零である。$\psi,\psi$ と $\bar\psi,\bar\psi$ の反交換子は任意の時空点で零である。
<!-- formal-statement-end -->

### 証明の見取り図

粒子・反粒子の二つのCARを合わせると、$u$ のスピン和と $v$ のスピン和が両方**正符号**で出ます。$C$ に一次Dirac演算子を掛けると、負振動数側で微分がもう一つ負号を作り、ちょうどその和になります。微分は分布の支持を広げません。

<!-- proof-start -->
### 証明

混合した $b,b^\dagger$ と $d^\dagger,d$ 以外の反交換子は[CAR](#thm-qft8-car)により零です。[スピン和](../QFT7/index.md#thm-qft7-spin-sums)を代入すると

$$
\begin{aligned}
\{\psi_\alpha(x),\bar\psi_\beta(y)\}
=\int\frac{d\mu(\boldsymbol p)}{2E_{\boldsymbol p}}
\bigl[&(\not p+mI_4)_{\alpha\beta}e^{-ip\cdot z}\\
&+(\not p-mI_4)_{\alpha\beta}e^{+ip\cdot z}\bigr]I.
\end{aligned}
$$

一方、[QFT5の交換子表示](../QFT5/index.md#thm-qft5-commutator-cauchy)は同じFourier規格化で

$$
C(z)=\int\frac{d\mu(\boldsymbol p)}{2E_{\boldsymbol p}}
\left(e^{-ip\cdot z}-e^{+ip\cdot z}\right)
$$

です。$i\partial_{z^\mu}e^{-ip\cdot z}=p_\mu e^{-ip\cdot z}$、$i\partial_{z^\mu}e^{+ip\cdot z}=-p_\mu e^{+ip\cdot z}$ ですから

$$
\begin{aligned}
(i\gamma^\mu\partial_{z^\mu}+m)C(z)
=\int\frac{d\mu}{2E}\bigl[&(\not p+m)e^{-ip\cdot z}\\
&-(-\not p+m)e^{+ip\cdot z}\bigr].
\end{aligned}
$$

二行目の負符号を分配すると前の反交換子と一致します。[QFT5の因果核支持定理](../QFT5/index.md#thm-qft5-finite-speed)により $\operatorname{supp}C\subset\{|\boldsymbol z|\le|z^0|\}$ です。分布 $T$ がある開集合で零なら、試験関数の微分を移す定義 $\langle\partial_\mu T,F\rangle=-\langle T,\partial_\mu F\rangle$ により $\partial_\mu T$ もその開集合で零です。したがってDirac演算子を掛けても支持は光円錐内のままです。

同種の反交換子は場の展開で現れる $bb,dd,b d^\dagger$ 等が全て零なので、任意の $x,y$ で零です。結論は離れた支持を持つ時空試験関数を用いた二重smearingでも成立します。
<!-- proof-end -->

ここで使う「局所性」は、互いに空間的に分離した**奇演算子** $\psi$ 同士が反交換するという主張です。偶数個のフェルミオン場から作る局所観測量では、対応する符号が二回現れ、通常の可換性へ戻ります。ただし同一点の場の積は別途定義を要するため、この観察だけで任意の複合演算子が構成済みとは言いません。

### 例：反交換子は零でも真空相関は零ではない

等時刻で $\boldsymbol r\ne0$ とし、行列値の真空相関 $S^+(0,\boldsymbol r)=\omega_0(\psi(t,\boldsymbol x)\bar\psi(t,\boldsymbol y))$ を考えます。真空には $b b^\dagger$ の項だけが寄与し、[スピン和](../QFT7/index.md#thm-qft7-spin-sums)によって

$$
S^+(0,\boldsymbol r)
=\int\frac{d\mu(\boldsymbol p)}{2E_{\boldsymbol p}}
(\not p+mI_4)e^{i\boldsymbol p\cdot\boldsymbol r}.
$$

Clifford行列の跡は $\operatorname{tr}\gamma^\mu=0$ なので

$$
\operatorname{tr}S^+(0,\boldsymbol r)
=4m\int\frac{d\mu(\boldsymbol p)}{2E_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol r}=4mD_F(0,\boldsymbol r).
$$

[QFT6の等時刻Feynman核の正値例](../QFT6/index.md#prop-qft6-response-correlation)から、$m>0,|\boldsymbol r|>0$ で右辺は正です。従って真空二点相関は零ではありませんが、[本定理](#thm-qft8-locality)の反交換子は空間的分離で零です。相関と局所的な反交換関係を混同しません。

## 5. フェルミオンの時間順序とDirac伝播関数

二つの場の時刻を逆にするとき、ただ並べ直すだけでは[反交換関係](#thm-qft8-car)と両立しません。奇演算子を一回交換すれば負号が必要です。これはボース場の[QFT6の時間順序](../QFT6/index.md#def-qft6-feynman-two-point)との決定的な違いです。

<a id="def-qft8-timeorder"></a>

<!-- formal-statement-start -->
> **定義（フェルミオンの時間順序と伝播関数）**
> 異なる時刻 $x^0,y^0$ における二つの奇演算子について、時刻の大きいものを左に置き、順序を一回交換した場合は負号を付ける。特に

$$
T\{\psi_\alpha(x)\bar\psi_\beta(y)\}
=\theta(x^0-y^0)\psi_\alpha(x)\bar\psi_\beta(y)
-\theta(y^0-x^0)\bar\psi_\beta(y)\psi_\alpha(x).
$$

> この真空期待値をDiracのFeynman伝播関数 $S_{F,\alpha\beta}(x-y)$ とする。時間一致部分は以下の分布的延長で定める。
<!-- formal-statement-end -->

ここで $T$ は時間順序演算子、$\theta$ は[QFT6で用いた時刻切替係数](../QFT6/index.md#def-qft6-retarded-advanced)です。添字 $\alpha,\beta$ は行列値の核の成分を示し、$T$ は行列の転置ではありません。真空期待値は二つの項を区別して計算します。

<!-- definition-example-start: def-qft8-timeorder -->
### 例：二つの時刻を逆にしたときの負号

**定義の確認**：一つの正規化モード $d$ と真空 $d\Omega=0$ に対し、二つの奇演算子 $A=d^\dagger$、$B=d$ を考えます。$A$ の時刻が $B$ より早ければ定義から $T\{A B\}=-BA$ です。[CAR](#thm-qft8-car)より $dd^\dagger=1-d^\dagger d$ だから

$$
\omega_0(T\{d^\dagger d\})
=-\omega_0(dd^\dagger)=-1.
$$

時刻が逆なら $T\{d^\dagger d\}=d^\dagger d$ で真空期待値は零です。時間順序の負号は定義から生じ、後から伝播関数の式だけを覚えて付けたものではありません。
<!-- definition-example-end -->

<a id="thm-qft8-propagator"></a>

<!-- formal-statement-start -->
> **定理（Dirac時間順序伝播関数の極とデルタ源）**
> $m>0$、上の自由Fock真空と時間順序に対し、$z=x-y$、$p^0=E_{\boldsymbol p}$ とすると

$$
\begin{aligned}
S_F(z)=\int\frac{d\mu(\boldsymbol p)}{2E_{\boldsymbol p}}
\bigl[&\theta(z^0)(\not p+mI_4)e^{-ip\cdot z}\\
&-\theta(-z^0)(\not p-mI_4)e^{+ip\cdot z}\bigr].
\end{aligned}
$$

> また、[QFT6のスカラーFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point) $D_F$ を用いると、緩増加分布として

$$
S_F=(i\gamma^\mu\partial_\mu+mI_4)D_F,
\qquad
\widehat S_F(k)
=\lim_{\varepsilon\downarrow0}\frac{i(\not k+mI_4)}{k^2-m^2+i\varepsilon}.
$$

> 正エネルギー極は虚部が負の側、負エネルギー極は虚部が正の側へ寄せる。Dirac作用素について

$$
(i\gamma^\mu\partial_\mu-mI_4)S_F(z)=i\delta^4(z)I_4
$$

> が成立する。$\widehat S_F$ は $S_F(z)=\int d^4k\,(2\pi)^{-4}e^{-ik\cdot z}\widehat S_F(k)$ のFourier規約である。
<!-- formal-statement-end -->

### 証明の見取り図

正の時刻差では粒子の $bb^\dagger$、負の時刻差では反粒子の $dd^\dagger$ が寄与します。後者には時間順序による負符号が付きます。スカラー伝播関数に一次Dirac作用素を掛けると、この二種類の項がちょうど生じます。

<!-- proof-start -->
### 証明

真空条件 $b\Omega=d\Omega=0$ と[CAR](#thm-qft8-car)から

$$
\begin{aligned}
\omega_0(\psi_\alpha(x)\bar\psi_\beta(y))
&=\int\frac{d\mu}{2E}(\not p+m)_{\alpha\beta}e^{-ip\cdot z},\\
\omega_0(\bar\psi_\beta(y)\psi_\alpha(x))
&=\int\frac{d\mu}{2E}(\not p-m)_{\alpha\beta}e^{+ip\cdot z}.
\end{aligned}
$$

第一式は $bb^\dagger$、第二式は $dd^\dagger$ の項のみが残り、それぞれ[QFT7の二つのスピン和](../QFT7/index.md#thm-qft7-spin-sums)を使用しました。[時間順序の定義](#def-qft8-timeorder)へ代入すると、主張の二つの時刻領域の式が得られます。

次に[QFT6のスカラーFeynman分布](../QFT6/index.md#def-qft6-feynman-two-point)を

$$
D_F(z)=\int\frac{d\mu}{2E}
\left[\theta(z^0)e^{-ip\cdot z}+\theta(-z^0)e^{+ip\cdot z}\right]
$$

と書きます。第二項の空間運動量を反転すると、時刻零で両指数の空間積分は同じになるため、$D_F$ は時刻零で連続です。従って $i\gamma^0\partial_tD_F$ に $\delta(t)$ の接触項は出ません。二つの時間領域で指数を微分すると

$$
\begin{aligned}
(i\not\partial+m)D_F
=\int\frac{d\mu}{2E}\bigl[&\theta(t)(\not p+m)e^{-ip\cdot z}\\
&+\theta(-t)(-\not p+m)e^{+ip\cdot z}\bigr]=S_F(z).
\end{aligned}
$$

時間順序で反粒子項に必要だった負号は $-\not p+m=-(\not p-m)$ に含まれています。Fourier変換では $i\partial_\mu$ が $k_\mu$ に移るため、[QFT6の時間順序二点分布の極とデルタ源](../QFT6/index.md#thm-qft6-feynman-poles)から

$$
\widehat S_F(k)=(\not k+m)\widehat D_F(k)
=\lim_{\varepsilon\downarrow0}\frac{i(\not k+m)}{k^2-m^2+i\varepsilon}
$$

となります。分母の二根は $k^0\simeq+E-i0$ と $k^0\simeq-E+i0$ なので、極の上下も従います。

最後に[QFT7のDirac作用素の因数分解](../QFT7/index.md#thm-qft7-factorization)と $\bigl(\Box+m^2\bigr)D_F=-i\delta^4$ を使って

$$
\begin{aligned}
(i\not\partial-m)S_F
&=(i\not\partial-m)(i\not\partial+m)D_F\\
&=-(\Box+m^2)D_F=i\delta^4 I_4.
\end{aligned}
$$

独立の確認として、時間順序の両側の値の差は $S^+(0,\boldsymbol r)+S^-(0,\boldsymbol r)=\gamma^0\delta^3(\boldsymbol r)$ です。[等時刻CAR](#thm-qft8-equal-time)に一致し、$i\gamma^0\partial_t$ が跳びへ作用すると $i\gamma^0\gamma^0\delta^4=i\delta^4$ が得られます。二通りの計算で源の $i$ を照合しました。
<!-- proof-end -->

同じ「Feynman伝播関数」でも、スカラー場は $D_F$、Dirac場は行列値の $S_F$ です。特に $S_F$ 自体にはすでにFourier分子の $i$ が含まれ、$(i\not\partial-m)S_F=i\delta^4$ です。$iS_F$ と無条件に置き換えると源の係数が変わります。

## 6. 演習：粒子数の符号から伝播関数の極まで

各問題の演算子積は、有限個の正規直交モードでは通常の行列として、それ以外はSchwartz波束によるsmearingの意味で扱います。$m>0$、自然単位系、計量 $(+---)$ は共通です。

### Level A：一つの操作を正確に確認する

### 演習 QFT8-A1：一モードのPauli排他性

規格化された一モードの状態 $|0\rangle,|1\rangle=c^\dagger|0\rangle$ に対し、$c|0\rangle=0$、$c|1\rangle=|0\rangle$、$c^\dagger|1\rangle=0$ とする。基底 $(|0\rangle,|1\rangle)$ で $c,c^\dagger$ の行列を作り、$\{c,c^\dagger\}=I$、$c^2=(c^\dagger)^2=0$ を確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

基底に作用させた結果を各列に書くと

$$
c=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
c^\dagger=\begin{pmatrix}0&0\\1&0\end{pmatrix}.
$$

したがって

$$
cc^\dagger=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad
c^\dagger c=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

和は単位行列です。$c$ の非零成分は1行2列、$c^\dagger$ の非零成分は2行1列のみで、どちらも二乗すると各成分が零です。これは[CARの定理](#thm-qft8-car)の一モード表示です。
<!-- solution-end -->

### 演習 QFT8-A2：種類が違っても負符号

直交する粒子モード $b$ と反粒子モード $d$ に対し、真空 $\Omega$ とCARを仮定する。$b^\dagger d^\dagger\Omega$ と $d^\dagger b^\dagger\Omega$ の関係、および $bd^\dagger b^\dagger\Omega$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

異種モードも同じ[CAR](#thm-qft8-car)に属するので $\{b^\dagger,d^\dagger\}=0$、$\{b,d^\dagger\}=0$ です。従って

$$
d^\dagger b^\dagger\Omega=-b^\dagger d^\dagger\Omega.
$$

また $bd^\dagger=-d^\dagger b$ を使い、同種の $bb^\dagger=1-b^\dagger b$ と $b\Omega=0$ を適用すると

$$
bd^\dagger b^\dagger\Omega
=-d^\dagger bb^\dagger\Omega
=-d^\dagger(1-b^\dagger b)\Omega=-d^\dagger\Omega.
$$

異種だからと可換にすると最終符号が逆になります。
<!-- solution-end -->

### 演習 QFT8-A3：電荷と正エネルギー

一粒子モード・一反粒子モードのエネルギーがともに $E>0$ とし、$H=E(b^\dagger b+d^\dagger d)$、$Q=b^\dagger b-d^\dagger d$ とする。$\Omega$、$b^\dagger\Omega$、$d^\dagger\Omega$、$b^\dagger d^\dagger\Omega$ の $(H,Q)$ 固有値を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

真空では $b\Omega=d\Omega=0$ なので $(H,Q)=(0,0)$ です。[CAR](#thm-qft8-car)から $bb^\dagger\Omega=dd^\dagger\Omega=\Omega$、他方 $d b^\dagger\Omega=b d^\dagger\Omega=0$ です。よって粒子状態では $(E,+1)$、反粒子状態では $(E,-1)$ となります。

二粒子状態では $b^\dagger b$ と $d^\dagger d$ の固有値がそれぞれ1です。実際 $b^\dagger b(b^\dagger d^\dagger\Omega)=b^\dagger(1-b^\dagger b)d^\dagger\Omega=b^\dagger d^\dagger\Omega$ であり、$d$ 側も同じです。したがって $(H,Q)=(2E,0)$ です。
<!-- solution-end -->

### 演習 QFT8-A4：静止系で四成分の完全性

$p=(m,\boldsymbol0)$ とし、Dirac表示 $\gamma^0=\operatorname{diag}(I_2,-I_2)$、$u_s=\sqrt{2m}(e_s,0)^T$、$v_s=\sqrt{2m}(0,e_s)^T$ とする。$\sum_s(u_su_s^\dagger+v_sv_s^\dagger)/(2m)$ を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\sum_s e_se_s^\dagger=I_2$ ですから

$$
\sum_su_su_s^\dagger=2m\begin{pmatrix}I_2&0\\0&0\end{pmatrix},\qquad
\sum_sv_sv_s^\dagger=2m\begin{pmatrix}0&0\\0&I_2\end{pmatrix}.
$$

和を $2m$ で割ると $I_4$ です。これは[等時刻CARの証明](#thm-qft8-equal-time)の運動量原点での直接確認です。$u$ のみ、あるいは $v$ のみでは四成分の単位行列になりません。
<!-- solution-end -->

### 演習 QFT8-A5：時間順序の負符号

一つのフェルミオンモード $d$ で $d\Omega=0$ とする。時刻 $t_x<t_y$ の奇演算子 $A(t_x)=d^\dagger$、$B(t_y)=d$ に対し、真空期待値 $\omega_0(T\{AB\})$ を求めよ。負号を忘れた場合の誤答も示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

後の時刻の $B$ を左へ移すには奇演算子の交換を一回行うので、[時間順序の定義](#def-qft8-timeorder)から $T\{AB\}=-BA=-dd^\dagger$ です。

$$
\omega_0(T\{AB\})
=-\omega_0(1-d^\dagger d)=-1.
$$

負号を落とすと $+1$ となり、[時間順序伝播関数](#thm-qft8-propagator)の負振動数の項と矛盾します。
<!-- solution-end -->

### Level B：複数の関係をつなぐ

### 演習 QFT8-B1：反対称二粒子状態でCARを検算する

直交単位波束 $f,g$ と、$h=af+bg$（$a,b\in\mathbb C$）を考える。$|fg\rangle=c^\dagger(f)c^\dagger(g)\Omega$ とするとき、$c(f)|fg\rangle$、$c(g)|fg\rangle$、$\{c(f),c^\dagger(g)\}|fg\rangle$、$c(h)|fg\rangle$ を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[CAR](#thm-qft8-car)を一段ずつ適用します。$c(f)c^\dagger(f)=1-c^\dagger(f)c(f)$ より

$$
\begin{aligned}
c(f)|fg\rangle
&=(1-c^\dagger(f)c(f))c^\dagger(g)\Omega\\
&=c^\dagger(g)\Omega+c^\dagger(f)c^\dagger(g)c(f)\Omega
=c^\dagger(g)\Omega.
\end{aligned}
$$

$c(g)c^\dagger(f)=-c^\dagger(f)c(g)$ かつ $c(g)c^\dagger(g)\Omega=\Omega$ なので

$$
c(g)|fg\rangle=-c^\dagger(f)\Omega.
$$

最後の反交換子は $\langle g,f\rangle I=0$ です。実際、$c(f)c^\dagger(g)|fg\rangle=0$（$g$ が二回生成される）かつ $c^\dagger(g)c(f)|fg\rangle=c^\dagger(g)c^\dagger(g)\Omega=0$ です。余分に与えられた $h$ については $c(h)=\overline a c(f)+\overline b c(g)$、従って

$$
c(h)|fg\rangle=\overline a\,c^\dagger(g)\Omega-\overline b\,c^\dagger(f)\Omega
$$

です。消滅演算子の**反線形性**も確認できました。
<!-- solution-end -->

### 演習 QFT8-B2：因果核の微分から等時刻CARまで

$C=-iE$ とし、$E(0,\boldsymbol r)=0$、$\partial_tE(0,\boldsymbol r)=\delta^3(\boldsymbol r)$、$\operatorname{supp}E\subset\{|\boldsymbol r|\le|t|\}$ を仮定する。$S_{\mathrm{ac}}=(i\not\partial+m)C$ について、(1) $S_{\mathrm{ac}}(0,\boldsymbol r)$、(2) 空間的分離での値を分布の意味で求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[QFT5の因果核の初期値](../QFT5/index.md#thm-qft5-commutator-cauchy)を使います。$C(0,\boldsymbol r)=-iE(0,\boldsymbol r)=0$ なので、その空間微分も零です。一方、時間微分は $\partial_tC(0,\boldsymbol r)=-i\delta^3(\boldsymbol r)$。従って

$$
\begin{aligned}
S_{\mathrm{ac}}(0,\boldsymbol r)
&=(i\gamma^0\partial_t+i\gamma^j\partial_j+m)C\big|_{t=0}\\
&=i\gamma^0(-i\delta^3)+0+0
=\gamma^0\delta^3(\boldsymbol r).
\end{aligned}
$$

これは[随伴場との等時刻CAR](#thm-qft8-equal-time)です。空間的分離は光円錐外の開集合なので、$C$ 自身とその一次分布微分は零です。よって $S_{\mathrm{ac}}$ も零となります。[局所性定理](#thm-qft8-locality)を、初期値・支持の二面から検算しました。
<!-- solution-end -->

### 演習 QFT8-B3：古典Diracエネルギーと正規順序の符号

一つの独立な正負振動数モードに対する未正規順序のエネルギーと電荷が、$H_{\rm raw}=E(b^\dagger b-d d^\dagger)$、$Q_{\rm raw}=b^\dagger b+d d^\dagger$（$E>0$）の形で得られたとする。CARだけを使い、真空値を差し引いた $H,Q$ を求め、$d^\dagger\Omega$ に作用させよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[CAR](#thm-qft8-car)から $dd^\dagger=1-d^\dagger d$ です。これを代入すると

$$
H_{\rm raw}=E(b^\dagger b+d^\dagger d)-E,
\quad Q_{\rm raw}=b^\dagger b-d^\dagger d+1.
$$

従って真空期待値はそれぞれ $-E,+1$ であり、これを差し引けば

$$
H=E(b^\dagger b+d^\dagger d),\qquad
Q=b^\dagger b-d^\dagger d.
$$

$dd^\dagger\Omega=\Omega$、$b d^\dagger\Omega=0$ より $H d^\dagger\Omega=E d^\dagger\Omega$、$Q d^\dagger\Omega=-d^\dagger\Omega$ です。負振動数モードを負エネルギーの状態と読む必要はなく、反粒子の正のエネルギーと負の電荷が得られます。連続モードでの発散する真空定数を、有限モードの $-E,+1$ と同じ有限数とは扱いません。
<!-- solution-end -->

### 演習 QFT8-B4：静止運動量の時間順序核とデルタ源

空間Fourier変換したDirac伝播関数で $\boldsymbol p=0$ を固定し、$E=m$、$\gamma^0=\operatorname{diag}(I_2,-I_2)$ とする。$P_\pm=(I_4\pm\gamma^0)/2$ を用いて時間係数 $S_F(t,\boldsymbol p=0)$ を表し、$(i\gamma^0\partial_t-m)S_F=i\delta(t)I_4$ を分布的に検算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Dirac伝播関数の表示](#thm-qft8-propagator)では、$\not p=m\gamma^0$ なので正の時刻の係数は $(m\gamma^0+m)/(2m)=P_+$、負の時刻の係数は $-(m\gamma^0-m)/(2m)=P_-$ です。従って

$$
S_F(t,\boldsymbol0)=\theta(t)P_+e^{-imt}
+\theta(-t)P_-e^{+imt}.
$$

$\gamma^0P_+=P_+$、$\gamma^0P_-=-P_-$ です。$t>0$ では $(i\gamma^0\partial_t-m)P_+e^{-imt}=m(\gamma^0-I_4)P_+e^{-imt}=0$、$t<0$ では $-m(\gamma^0+I_4)P_-e^{+imt}=0$ です。

$\partial_t\theta(t)=\delta(t)$、$\partial_t\theta(-t)=-\delta(t)$ なので、接触項は

$$
i\gamma^0\delta(t)(P_+-P_-)
=i\gamma^0\delta(t)\gamma^0=i\delta(t)I_4.
$$

これが[伝播関数定理](#thm-qft8-propagator)の源の符号です。負時刻の前に負号を余分に付けると $P_+-P_-$ が再現されません。
<!-- solution-end -->

### Level C：Fock・局所性・伝播関数の統合

### 演習 QFT8-C1：粒子・反粒子とDirac核の完全検算

$m>0$ の自由Dirac場を考え、$u_s,v_s$ は[QFT7のスピン和](../QFT7/index.md#thm-qft7-spin-sums)を満たすものとする。$b,d$ はCARを満たし、$S_F=\omega_0(T\{\psi(x)\bar\psi(y)\})$ とする。

1. 単位粒子波束 $f$、単位反粒子波束 $g$ について $|f,g\rangle=b^\dagger(f)d^\dagger(g)\Omega$ のノルムと電荷を求めよ。また $b^\dagger(f)b^\dagger(f)\Omega$ を求めよ。
2. $p_-=(E,-\boldsymbol p)$ とし、$\sum_s[u_s(p)u_s^\dagger(p)+v_s(p_-)v_s^\dagger(p_-)]/(2E)=I_4$ をスピン和から導け。この等式が等時刻CARへどのように使われるか示せ。
3. $\{\psi(x),\bar\psi(y)\}=(i\not\partial+m)C(x-y)$ を導き、$x-y$ が空間的なときの結論を述べよ。ただし $C$ はQFT5のPauli–Jordan分布とする。
4. 時間順序の負時刻の符号、Fourier分母の二つの極の位置、$(i\not\partial-m)S_F$ のデルタ源をそれぞれ検算せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 状態。** 異種波束は $\mathfrak h_b\perp\mathfrak h_d$ なので $\{b(f),d^\dagger(g)\}=0$、$\{b(f),b^\dagger(f)\}=\{d(g),d^\dagger(g)\}=1$ です。ノルムを直接計算すると

$$
\begin{aligned}
\||f,g\rangle\|^2
&=\omega_0(d(g)b(f)b^\dagger(f)d^\dagger(g))\\
&=\omega_0(d(g)(1-b^\dagger(f)b(f))d^\dagger(g))\\
&=\omega_0(d(g)d^\dagger(g))=1.
\end{aligned}
$$

途中で $b(f)d^\dagger(g)\Omega=-d^\dagger(g)b(f)\Omega=0$ を使いました。電荷は $Q|f,g\rangle=(+1-1)|f,g\rangle=0$ です。同じ波束を二回作ると $\{b^\dagger(f),b^\dagger(f)\}=2b^\dagger(f)^2=0$ なので $b^\dagger(f)^2\Omega=0$ です。

**2. 四成分の完全性。** [QFT7のスピン和](../QFT7/index.md#thm-qft7-spin-sums)に右から $\gamma^0$ を掛けて

$$
\begin{aligned}
\sum_s u_s(p)u_s^\dagger(p)&=(E\gamma^0-\boldsymbol\gamma\cdot\boldsymbol p+m)\gamma^0,\\
\sum_s v_s(p_-)v_s^\dagger(p_-)&=(E\gamma^0+\boldsymbol\gamma\cdot\boldsymbol p-m)\gamma^0.
\end{aligned}
$$

和の運動量項と質量項は相殺し、$2E\gamma^0\gamma^0=2EI_4$ なので、指定の等式が得られます。[場の展開](#def-qft8-field)の $bb^\dagger$ と $d^\dagger d$ にCARを適用したあと、第二項の積分変数 $\boldsymbol p\mapsto-\boldsymbol p$ を使うと同一の $e^{i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}$ が掛かります。完全性を代入して $\int d\mu e^{i\boldsymbol p\cdot\boldsymbol r}=\delta^3(\boldsymbol r)$ です。

**3. 因果性。** $u$ と $v$ のスピン和による反交換子の核は

$$
\int\frac{d\mu}{2E}\bigl[(\not p+m)e^{-ip\cdot z}
+(\not p-m)e^{+ip\cdot z}\bigr].
$$

$C(z)=\int(d\mu/2E)(e^{-ip\cdot z}-e^{+ip\cdot z})$ に対して、$i\not\partial$ は正振動数指数へ $+\not p$、負振動数指数へ $-\not p$ を掛けます。従って $(i\not\partial+m)C$ はまさに上の和です。[QFT5の因果核支持定理](../QFT5/index.md#thm-qft5-finite-speed)は $C$ の支持を光円錐内に限り、微分も支持を広げないので、空間的分離では反交換子は零です。

**4. 時間順序と極。** 真空期待値の正時刻には $bb^\dagger$、負時刻には $dd^\dagger$ が寄与します。奇演算子を逆順にするため、負時刻の係数は

$$
-\theta(-t)\int\frac{d\mu}{2E}(\not p-m)e^{+ip\cdot z}
$$

です。[スカラーFeynman分布の極処方](../QFT6/index.md#thm-qft6-feynman-poles)を使えば

$$
S_F=(i\not\partial+m)D_F,
\quad \widehat S_F(k)=\frac{i(\not k+m)}{k^2-m^2+i0}.
$$

$k^0$ の二つの極は $+E-i0$ と $-E+i0$ の側から実軸へ近づきます。[QFT7の因数分解](../QFT7/index.md#thm-qft7-factorization)および[QFT6のデルタ源](../QFT6/index.md#thm-qft6-feynman-poles)により

$$
(i\not\partial-m)S_F
=-(\Box+m^2)D_F=i\delta^4I_4.
$$

この係数は[等時刻CAR](#thm-qft8-equal-time)の跳び $\gamma^0\delta^3$ に $i\gamma^0$ を掛けても得られます。したがって粒子・反粒子のCAR、因果的支持、時間順序の負号、分布的なデルタ源が同一の規約で整合します。
<!-- solution-end -->

## 7. まとめ：自由場から相互作用へ

- フェルミオンFock空間は反対称テンソル冪から構成され、生成・消滅演算子はCARを満たします。同じモードの二重占有は零です。
- 自由Dirac場は $b_su_se^{-ip\cdot x}+d_s^\dagger v_se^{+ip\cdot x}$ の形です。反粒子は負エネルギーではなく、正エネルギーと反対電荷を持つ励起です。
- 等時刻CARの $I_4\delta^3$ は $u,v$ の両スピン和が必要です。異なる時空点の反交換子は $(i\not\partial+m)C$ で、空間的分離では零です。
- 時間順序で奇演算子を交換すると負号が生じます。$S_F=(i\not\partial+m)D_F$ は正負二極のFeynman処方を受け継ぎ、Dirac作用素で $i\delta^4$ を生じます。

次の段階では相互作用を加えてDyson級数を有限次数まで展開し、ボース・フェルミオン双方の時間順序積をWickの定理で計算します。そのとき本章の反交換符号と伝播関数が内部線の計算規則になります。
