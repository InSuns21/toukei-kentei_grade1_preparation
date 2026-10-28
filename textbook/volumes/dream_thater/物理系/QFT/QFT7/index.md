# QFT7 Dirac場のLorentz変換・Clifford代数と平面波解

<!-- definition-example-audit: strict -->

[QFT6のFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)までは、各時空点の変数が一つの実数であるスカラー場を扱いました。しかし電子のようにスピン $1/2$ を持つ場は、Lorentz変換で四つの成分が混ざります。さらに、運動方程式を時間について一次にしたいという要求は、普通の数ではなく、互いに反交換する行列を必要とします。

この章ではまず行列の反交換から一次のDirac方程式を作り、回転とboostの際に場をどう変換すればよいかを導きます。最後に、任意の質量殻運動量で二つずつの正・負振動数解を具体的に構成し、後の量子場計算で使うスピン和まで証明します。

時空はMinkowski空間 $\mathbb R^{1,3}$、自然単位系 $c=\hbar=1$、質量は **$m>0$** とします。計量の符号は

$$
\eta=\operatorname{diag}(1,-1,-1,-1)
$$

です。[SREL3の質量殻](../../SREL/SREL3/index.md#def-srel3-mass-shell)上の正エネルギー運動量を

$$
p^\mu=(E,\boldsymbol p),\quad
p_\mu=(E,-\boldsymbol p),\quad
E=\sqrt{m^2+|\boldsymbol p|^2}>0
$$

と書きます。反復した上下の添字は $\mu=0,1,2,3$ について和を取り、$\partial_\mu=\partial/\partial x^\mu$ とします。四元内積と位相は

$$
p\cdot x=p_\mu x^\mu=Et-\boldsymbol p\cdot\boldsymbol x
$$

です。

四元運動量の二乗は $p^2:=p_\mu p^\mu=E^2-|\boldsymbol p|^2=m^2$ と書き、通常の三次元ベクトルの長さの二乗とは区別します。

以下の $\psi(x)\in\mathbb C^4$ はまず**古典的な複素四成分場**です。スピン成分を数えられることと、Fock空間で反交換する量子場を構成したことは別であり、その量子化は次の段階で行います。

## 1. 一次方程式を可能にするClifford関係

[Klein–Gordon方程式](../QFT1/index.md#def-qft1-klein-gordon)は $(\Box+m^2)\phi=0$ という二階の方程式でした。一次の演算子を二回作用させてこの方程式へ戻したいとします。$\partial_\mu\partial_\nu$ は入れ替えられるので、必要なのは行列積の**対称部分**が計量になることです。

<a id="def-qft7-clifford"></a>

<!-- formal-statement-start -->
> **定義（Clifford関係とDirac行列）**
> Minkowski計量 $\eta^{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)$ に対し、四つの複素 $4\times4$ 行列 $\gamma^\mu$ が

$$
\{\gamma^\mu,\gamma^\nu\}
:=\gamma^\mu\gamma^\nu+\gamma^\nu\gamma^\mu
=2\eta^{\mu\nu}I_4
$$

> を満たすとき、これをClifford関係を満たすDirac行列という。$\gamma_\mu=\eta_{\mu\nu}\gamma^\nu$、四元ベクトル $a^\mu$ に対して $\not a=\gamma^\mu a_\mu$ と書く。
<!-- formal-statement-end -->

スラッシュは四元ベクトルを行列に移す略記です。時間成分が二乗で $+I_4$、空間成分が二乗で $-I_4$ になるため、すべてを同時に対角行列にはできません。

<!-- definition-example-start: def-qft7-clifford -->
### 例：Pauli行列を四成分のブロックへ組み立てる

**定義の確認**：二成分行列を

$$
\sigma^1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma^2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma^3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

とし、$I_2$ を二次単位行列とします。各行列を掛けると $(\sigma^j)^2=I_2$、$j\ne k$ では $\sigma^j\sigma^k=-\sigma^k\sigma^j$ です。例えば $\sigma^1\sigma^2=i\sigma^3$、$\sigma^2\sigma^1=-i\sigma^3$ となります。

以下、$M^\dagger$ は複素行列 $M$ の共役転置（行列を転置して各成分を複素共役にする操作）、$[M,N]=MN-NM$ は交換子を表します。反交換子 $\{M,N\}=MN+NM$ とは区別します。

Dirac表示は

$$
\gamma^0=\begin{pmatrix}I_2&0\\0&-I_2\end{pmatrix},
\qquad
\gamma^j=\begin{pmatrix}0&\sigma^j\\-\sigma^j&0\end{pmatrix}
\quad(j=1,2,3)
$$

です。このブロックを二乗すると $(\gamma^0)^2=I_4$、$(\gamma^j)^2=-I_4$ となります。また

$$
\gamma^0\gamma^j
=\begin{pmatrix}0&\sigma^j\\\sigma^j&0\end{pmatrix},
\quad
\gamma^j\gamma^0
=\begin{pmatrix}0&-\sigma^j\\-\sigma^j&0\end{pmatrix}
$$

なので時間・空間の反交換子は零です。空間同士も

$$
\gamma^j\gamma^k+\gamma^k\gamma^j
=-\begin{pmatrix}
\sigma^j\sigma^k+\sigma^k\sigma^j&0\\
0&\sigma^j\sigma^k+\sigma^k\sigma^j
\end{pmatrix}
=-2\delta^{jk}I_4.
$$

従って全16組について定義の右辺を再現しました。さらに $(\gamma^0)^\dagger=\gamma^0$、$(\gamma^j)^\dagger=-\gamma^j$ です。後で随伴を扱う際にこの符号を使います。
<!-- definition-example-end -->

<a id="thm-qft7-factorization"></a>

<!-- formal-statement-start -->
> **定理（Dirac作用素の因数分解）**
> 上のClifford行列を固定し、$m>0$ とする。$C^2$ 級の四成分場 $\psi$ に対し

$$
(i\gamma^\mu\partial_\mu+m)
(i\gamma^\nu\partial_\nu-m)\psi
=-(\Box+m^2)\psi.
$$

> 特に一次方程式 $(i\gamma^\mu\partial_\mu-m)\psi=0$ の各成分はKlein–Gordon方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

一次演算子を掛け合わせたとき、混合微分は対称なので反交換子だけが残ります。行列の符号を $(+,-,-,-)$ に合わせると、質量殻条件 $E^2-|\boldsymbol p|^2=m^2$ と同じ符号が出ます。

<!-- proof-start -->
### 証明

行列 $\gamma^\mu$ と $m$ は定数であり、偏微分は互いに可換です。二つの演算子を展開すると、一次微分の交差項は $-im\gamma^\mu\partial_\mu+im\gamma^\mu\partial_\mu=0$ と相殺します。二階項は

$$
\begin{aligned}
-\gamma^\mu\gamma^\nu\partial_\mu\partial_\nu\psi
&=-\frac12(\gamma^\mu\gamma^\nu+\gamma^\nu\gamma^\mu)
\partial_\mu\partial_\nu\psi\\
&=-\eta^{\mu\nu}\partial_\mu\partial_\nu\psi
=-\Box\psi.
\end{aligned}
$$

二行目で[Clifford関係](#def-qft7-clifford)を使いました。これに $-m^2\psi$ を加えれば結論です。一次方程式の左辺が零なら左から $i\gamma^\mu\partial_\mu+m$ を作用させて、$(\Box+m^2)\psi=0$ となります。
<!-- proof-end -->

逆は一般には成立しません。Klein–Gordon方程式を満たす四成分関数が、選んだ**片方の**一次方程式をすべて満たすわけではありません。Dirac方程式が許す振動数とスピンの組合せを、後で具体的に数えます。

## 2. Lorentz変換はスピノルの四成分をどう混ぜるか

[QFT1のスカラー変換](../QFT1/index.md#def-qft1-real-scalar)なら $\phi'(x')=\phi(x)$ でした。Dirac場には四成分を混ぜる行列がさらに必要です。座標を $x'=\Lambda x$ と動かしたとき、一次微分と $\gamma^\mu$ の縮約がもとの形に戻ることを基準にします。

ただし、行列の相似変換だけでは $S$ を一意に選べません。例えば非零複素数 $c$ に対して

$$
(cS)^{-1}\gamma^\mu(cS)=S^{-1}\gamma^\mu S
$$

だからです。ここで四成分の正方行列 $M$ に対する $e^M$ を

$$
e^M:=\sum_{n=0}^\infty\frac{M^n}{n!}
$$

で定めます。行列積に対して $\|AB\|\le\|A\|\|B\|$ となるノルムを用いれば

$$
\sum_{n=0}^\infty\left\|\frac{M^n}{n!}\right\|
\le\sum_{n=0}^\infty\frac{\|M\|^n}{n!}
=e^{\|M\|}<\infty
$$

なので、級数は絶対収束し、積や項別計算ができます。微小な変換の積から有限の変換を構成するため、ここではClifford行列から作る生成子

$$
\Sigma^{\mu\nu}=\frac i4[\gamma^\mu,\gamma^\nu]
$$

により、恒等変換から連続的に持ち上げる行列だけを使います。

<a id="def-qft7-spinor-transform"></a>

<!-- formal-statement-start -->
> **定義（Lorentzスピノル変換）**
> $\Lambda^T\eta\Lambda=\eta$ を満たす時間・空間の向きを保つLorentz行列 $\Lambda\in SO^+(1,3)$ を考える。恒等元から $\Lambda$ への連続経路を微小変換へ分け、各微小変換に対応する行列

$$
S_{\delta\omega}
=\exp\left(-\frac i2\delta\omega_{\mu\nu}\Sigma^{\mu\nu}\right)
$$

> の連続積として $S$ を選ぶ。この持ち上げは

$$
S^{-1}\gamma^\mu S=\Lambda^\mu{}_\nu\gamma^\nu
$$

> を満たし、四成分場のスピノル変換を $\psi'(x')=S\psi(x)$、$x'=\Lambda x$ と定める。経路が異なると同じ $\Lambda$ で $S$ の符号が異なる場合がある。
<!-- formal-statement-end -->

これは $SO^+(1,3)$ 上の一価の四次元行列表現を主張するものではありません。生成子の連続積で得られる $\operatorname{Spin}^+(1,3)$ の表現です。構成を具体的に見るため、Lorentz行列を $\Lambda^\mu{}_\nu=\delta^\mu{}_\nu+\omega^\mu{}_\nu+O(\omega^2)$、$\omega_{\mu\nu}=\eta_{\mu\rho}\omega^\rho{}_\nu=-\omega_{\nu\mu}$ と展開します。

$$
S=\exp\left(-\frac i2\omega_{\mu\nu}\Sigma^{\mu\nu}\right).
$$

反対称な添字を両方足すため、単一の $(\mu,\nu)$ の寄与は二回現れます。生成子の構成が定義の変換則を満たすことは次の定理で示します。

<!-- definition-example-start: def-qft7-spinor-transform -->
### 例：z軸の回転とboostを見分ける

**定義の確認**：$z$ 軸の角 $\varphi$ の回転では、$\Lambda^1{}_2=-\sin\varphi$、$\Lambda^2{}_1=\sin\varphi$ とします。生成子は

$$
\Sigma^{12}
=\frac12\begin{pmatrix}\sigma^3&0\\0&\sigma^3\end{pmatrix},
\quad
S_R(\varphi)
=\begin{pmatrix}
e^{-i\varphi\sigma^3/2}&0\\
0&e^{-i\varphi\sigma^3/2}
\end{pmatrix}.
$$

$\sigma^3e_1=e_1$、$\sigma^3e_2=-e_2$（$e_1=(1,0)^T$、$e_2=(0,1)^T$）なので、固有値は $\pm1$ です。従って $e^{-i\varphi\sigma^3/2}=\operatorname{diag}(e^{-i\varphi/2},e^{i\varphi/2})$ と成分ごとに指数を計算でき、$S_R(2\pi)=-I_4$ となります。一方、座標の回転は $\Lambda_R(2\pi)=I_4$ です。$4\pi$ 回してようやく $S_R(4\pi)=I_4$ に戻ります。

$z$ 方向の速さパラメータ $\vartheta$ のboostは $\Lambda^0{}_3=\Lambda^3{}_0=\sinh\vartheta$、$\Lambda^0{}_0=\Lambda^3{}_3=\cosh\vartheta$ とします。$\omega_{03}=\vartheta$ なので

$$
K:=\gamma^0\gamma^3
=\begin{pmatrix}0&\sigma^3\\\sigma^3&0\end{pmatrix},
\quad K^2=I_4,\qquad
S_B(\vartheta)=e^{\vartheta K/2}
=\cosh\frac\vartheta2 I_4+\sinh\frac\vartheta2 K.
$$

実際、$\{K,\gamma^0\}=0$ と $K^2=I_4$ から

$$
S_B^{-1}\gamma^0S_B
=\cosh\vartheta\,\gamma^0+\sinh\vartheta\,\gamma^3,
$$

さらに $\{K,\gamma^3\}=0$ より $S_B^{-1}\gamma^3S_B=\sinh\vartheta\,\gamma^0+\cosh\vartheta\,\gamma^3$ です。$j=1,2$ では $[K,\gamma^j]=0$ なので変わらず、定義の全成分を確かめました。

$K^\dagger=K$ で固有値が $\pm1$ だから $\vartheta\ne0$ では $S_B^\dagger S_B=e^{\vartheta K}\ne I_4$ です。通常の正定値ノルムを保つ有限次元ユニタリ表現ではないことが、行列から分かります。
<!-- definition-example-end -->

<a id="thm-qft7-covariance"></a>

<!-- formal-statement-start -->
> **定理（スピノル変換とDirac方程式のLorentz共変性）**
> Clifford関係を満たすDirac表示の $\gamma^\mu$、$m>0$、$\Lambda\in SO^+(1,3)$ とし、恒等変換からの連続経路に沿う上記の $S$ を選ぶ。このとき $S^{-1}\gamma^\mu S=\Lambda^\mu{}_\nu\gamma^\nu$ が成立する。$C^1$ 級の場が

$$
(i\gamma^\mu\partial_\mu-m)\psi(x)=0
$$

> を満たすなら、$\psi'(x')=S\psi(\Lambda^{-1}x')$ も同じ形の方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

まず生成子と $\gamma$ の交換子をClifford関係から求め、無限小変換則を確かめます。任意の連続経路の微小変換を積めば有限の変換が得られます。その後、場の微分に連鎖律を用いて $S$ と $\Lambda^{-1}$ を消します。

<!-- proof-start -->
### 証明

Clifford関係から $[\gamma^\rho\gamma^\sigma,\gamma^\mu]$ を展開します。$\gamma^\sigma\gamma^\mu=2\eta^{\sigma\mu}I_4-\gamma^\mu\gamma^\sigma$ を二度使えば

$$
\begin{aligned}
[\gamma^\rho\gamma^\sigma,\gamma^\mu]
&=\gamma^\rho\gamma^\sigma\gamma^\mu
-\gamma^\mu\gamma^\rho\gamma^\sigma\\
&=2\eta^{\sigma\mu}\gamma^\rho
-2\eta^{\rho\mu}\gamma^\sigma.
\end{aligned}
$$

従って

$$
[\Sigma^{\rho\sigma},\gamma^\mu]
=i(\eta^{\sigma\mu}\gamma^\rho-\eta^{\rho\mu}\gamma^\sigma).
$$

$X=-i\omega_{\rho\sigma}\Sigma^{\rho\sigma}/2$ とすると、$S=I_4+X+O(\omega^2)$、$S^{-1}=I_4-X+O(\omega^2)$ です。よって

$$
\begin{aligned}
S^{-1}\gamma^\mu S
&=\gamma^\mu+[\gamma^\mu,X]+O(\omega^2)\\
&=\gamma^\mu+\omega^\mu{}_\nu\gamma^\nu+O(\omega^2).
\end{aligned}
$$

ここで反対称性 $\omega_{\rho\sigma}=-\omega_{\sigma\rho}$ を使って二項をまとめました。微小変換の積ではこの恒等式が相似変換の合成として保たれます。$SO^+(1,3)$ の各要素は恒等元からの連続経路で到達でき、その経路を微小変換へ分割して極限を取れば有限変換の式が成立します。経路を一周させると $S$ の符号が変わり得ますが、相似変換には影響しません。

次に $\partial'_\mu:=\partial/\partial x'^\mu$ と定めます。プライムは**変換後の座標**について微分する印であり、時間微分の記号ではありません。$x^\nu=(\Lambda^{-1})^\nu{}_\rho x'^\rho$、$S$ は座標に依存しない定数行列なので、連鎖律を成分ごとに書くと

$$
\frac{\partial\psi'(x')}{\partial x'^\mu}
=S\frac{\partial x^\nu}{\partial x'^\mu}
\frac{\partial\psi(x)}{\partial x^\nu}
=S(\Lambda^{-1})^\nu{}_\mu\partial_\nu\psi(x).
$$

従って

$$
\partial'_\mu\psi'(x')
=S(\Lambda^{-1})^\nu{}_\mu\partial_\nu\psi(x)
$$

を与えます。$\gamma^\mu S=S\Lambda^\mu{}_\rho\gamma^\rho$ と上の恒等式を書き換えて代入すると

$$
\begin{aligned}
(i\gamma^\mu\partial'_\mu-m)\psi'
&=S\left(i\Lambda^\mu{}_\rho
(\Lambda^{-1})^\nu{}_\mu\gamma^\rho\partial_\nu-m\right)\psi\\
&=S(i\gamma^\nu\partial_\nu-m)\psi=0.
\end{aligned}
$$

最後の等号では $\Lambda^\mu{}_\rho(\Lambda^{-1})^\nu{}_\mu=\delta^\nu{}_\rho$ を使いました。
<!-- proof-end -->

回転の $2\pi$ 符号は $\psi'(x')=S_R\psi(x)$ に現れます。他方、Hilbert空間上で量子状態を変換するユニタリ演算子は別の空間に作用します。有限次元のboost行列 $S_B$ を、[QFT4のFock空間](../QFT4/index.md#def-qft4-fock-space)のユニタリ演算子と同一視しません。

## 3. 随伴を選んでLorentz不変な作用と電流を得る

boostの $S_B$ がユニタリでない以上、$\psi^\dagger\psi$ はLorentzスカラーではありません。しかしDirac表示には $\gamma^0$ を挟むと保たれる組合せがあります。これにより四成分場の作用を作れます。

<a id="def-qft7-adjoint-action"></a>

<!-- formal-statement-start -->
> **定義（Dirac随伴とDirac作用）**
> Dirac表示の四成分 $C^1$ 場 $\psi$ に対し、行ベクトル $\bar\psi=\psi^\dagger\gamma^0$ をDirac随伴という。$m>0$、有界な開時空領域 $\Omega$ で自由Dirac作用を

$$
\mathcal S_\Omega[\psi,\bar\psi]
=\int_\Omega\bar\psi(i\gamma^\mu\partial_\mu-m)\psi\,d^4x
$$

> とする。変分では $\psi,\bar\psi$ を形式的に独立とし、境界で零となるコンパクト台変分を取る。物理的な場の上では $\bar\psi=\psi^\dagger\gamma^0$ を課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft7-adjoint-action -->
### 例：静止スピノルとboostの随伴

**定義の確認**：$\psi=(a,b,c,d)^T$ に対し

$$
\bar\psi=(a^*,b^*,-c^*,-d^*).
$$

特に $\psi=(1,0,0,0)^T$ なら $\bar\psi\psi=1$。静止スピノルを上記の $z$-boostで変換すると

$$
S_B\psi=
\begin{pmatrix}\cosh(\vartheta/2)\\0\\\sinh(\vartheta/2)\\0\end{pmatrix},
\quad
\overline{S_B\psi}\,S_B\psi
=\cosh^2\frac\vartheta2-\sinh^2\frac\vartheta2=1.
$$

一方 $(S_B\psi)^\dagger S_B\psi=\cosh\vartheta$ です。随伴の $\gamma^0$ が必要なことを直接確かめられます。作用の被積分関数は四成分の積でスカラーを作り、コンパクト台変分では境界積分が消えます。
<!-- definition-example-end -->

<a id="thm-qft7-current"></a>

<!-- formal-statement-start -->
> **定理（Dirac作用と保存電流）**
> $\Lambda\in SO^+(1,3)$ に対応するDiracスピノル変換について、$S^\dagger\gamma^0S=\gamma^0$、$\bar\psi'=\bar\psi S^{-1}$ が成立する。$\Omega'=\Lambda\Omega$ と領域も変換すれば、Dirac作用は

$$
\mathcal S_{\Omega'}[\psi',\bar\psi']
=\mathcal S_\Omega[\psi,\bar\psi]
$$

> を満たす。独立なコンパクト台変分の停留条件は

$$
(i\gamma^\mu\partial_\mu-m)\psi=0,\qquad
i(\partial_\mu\bar\psi)\gamma^\mu+m\bar\psi=0
$$

> である。これらを満たす場のDirac電流 $j^\mu=\bar\psi\gamma^\mu\psi$ は $\partial_\mu j^\mu=0$、$j^0=\psi^\dagger\psi\ge0$ を満たし、Lorentz四元ベクトルとして変換する。
<!-- formal-statement-end -->

### 証明の見取り図

普通の内積ではなく $\gamma^0$ を挟む組合せがboostでも保たれます。この性質で作用の共変性を確かめた後、$\psi$ と $\bar\psi$ の変分を別々に計算します。二つの方程式を足すと質量項が打ち消し合い、電流が保存します。

<!-- proof-start -->
### 証明

Dirac表示では $(\gamma^\mu)^\dagger=\gamma^0\gamma^\mu\gamma^0$ です。$\Sigma^{\mu\nu}=i[\gamma^\mu,\gamma^\nu]/4$ のHermite共役を取ると

$$
(\Sigma^{\mu\nu})^\dagger=\gamma^0\Sigma^{\mu\nu}\gamma^0.
$$

実の反対称パラメータ $\omega_{\mu\nu}$ で $X=-i\omega_{\mu\nu}\Sigma^{\mu\nu}/2$ と置けば $X^\dagger\gamma^0=-\gamma^0X$ です。これを繰り返すと $(X^\dagger)^n\gamma^0=\gamma^0(-X)^n$ なので、指数の冪級数に項ごとに代入して $e^{X^\dagger}\gamma^0=\gamma^0e^{-X}$ を得ます。また同じ行列の指数の積は

$$
e^{-X}e^X
=\sum_{n=0}^\infty\frac{X^n}{n!}
\sum_{k=0}^n\binom nk(-1)^k=I_4
$$

です。従って

$$
S^\dagger\gamma^0S
=e^{X^\dagger}\gamma^0e^X
=\gamma^0e^{-X}e^X=\gamma^0.
$$

積の各段階で同じ等式が保たれるので連続したLorentz変換にも成立します。これを $\bar\psi'$ の定義へ入れて

$$
\bar\psi'=\psi^\dagger S^\dagger\gamma^0
=\psi^\dagger\gamma^0S^{-1}=\bar\psi S^{-1}
$$

です。[スピノル変換則](#thm-qft7-covariance)と $d^4x'=d^4x$（$\det\Lambda=1$）を使えば、作用の密度の変換は

$$
\bar\psi'(i\gamma^\mu\partial'_\mu-m)\psi'
=\bar\psi S^{-1}S(i\gamma^\nu\partial_\nu-m)\psi
=\bar\psi(i\gamma^\nu\partial_\nu-m)\psi
$$

となります。$\Lambda\in SO^+(1,3)$ は $\det\Lambda=1$ なので、変数変換 $x'=\Lambda x$ のJacobianは1です。従って積分領域も $\Omega'=\Lambda\Omega$ に移すと

$$
\int_{\Omega'}\bar\psi'(i\gamma^\mu\partial'_\mu-m)\psi'\,d^4x'
=\int_\Omega\bar\psi(i\gamma^\nu\partial_\nu-m)\psi\,d^4x.
$$

同じ座標範囲 $\Omega$ を変換後にも固定する主張ではなく、領域ごとの作用の共変性です。

停留条件では、任意のコンパクト台の $\delta\bar\psi$ に関する変分から $(i\gamma^\mu\partial_\mu-m)\psi=0$。$\delta\psi$ に関しては

$$
\begin{aligned}
\delta_\psi\mathcal S_\Omega
&=\int_\Omega\bigl(i\bar\psi\gamma^\mu
\partial_\mu\delta\psi-m\bar\psi\delta\psi\bigr)\,d^4x\\
&=\int_\Omega
\bigl(-i(\partial_\mu\bar\psi)\gamma^\mu-m\bar\psi\bigr)
\delta\psi\,d^4x,
\end{aligned}
$$

ここで部分積分の境界項はコンパクト台条件で零です。変分の係数を零とすれば、表示した随伴方程式が出ます。

次に両方の運動方程式をそれぞれ解き直すと

$$
(\partial_\mu\bar\psi)\gamma^\mu=im\bar\psi,
\qquad
\gamma^\mu\partial_\mu\psi=-im\psi.
$$

従って積の微分は

$$
\partial_\mu j^\mu
=(\partial_\mu\bar\psi)\gamma^\mu\psi
+\bar\psi\gamma^\mu\partial_\mu\psi
=im\bar\psi\psi-im\bar\psi\psi=0.
$$

さらに $\bar\psi\gamma^0\psi=\psi^\dagger(\gamma^0)^2\psi=\psi^\dagger\psi\ge0$。[変換則](#def-qft7-spinor-transform)から

$$
j'^\mu=\bar\psi S^{-1}\gamma^\mu S\psi
=\Lambda^\mu{}_\nu j^\nu
$$

となり、四元ベクトル性も示されます。
<!-- proof-end -->

たとえば静止系の $\psi=(1,0,0,0)^T$ は $j^\mu=(1,0,0,0)$ を与え、$z$-boost後の $j'^0=\cosh\vartheta$、$j'^3=\sinh\vartheta$ は四元ベクトル変換と一致します。保存電流は古典場についての主張で、反粒子の生成消滅演算子をすでに定めたという意味ではありません。

## 4. 正・負振動数の平面波を二成分から組み立てる

[SREL3の正の質量殻](../../SREL/SREL3/index.md#def-srel3-mass-shell)上の $p=(E,\boldsymbol p)$ を固定します。[QFT3の正負振動数分解](../QFT3/index.md#def-qft3-frequency)と同じ指数 $e^{\mp ip\cdot x}$ を使いますが、今回は各周波数へ二つずつのスピン偏極が付いています。

Dirac表示のブロック行列を用いると

$$
\not p=\gamma^0E-\sum_{j=1}^3\gamma^jp_j
=\begin{pmatrix}
EI_2&-\boldsymbol\sigma\cdot\boldsymbol p\\
\boldsymbol\sigma\cdot\boldsymbol p&-EI_2
\end{pmatrix},
\qquad
\boldsymbol\sigma\cdot\boldsymbol p=\sum_j\sigma^jp_j.
$$

Pauli行列の反交換関係から

$$
(\boldsymbol\sigma\cdot\boldsymbol p)^2
=\frac12\sum_{j,k}p_jp_k(\sigma^j\sigma^k+\sigma^k\sigma^j)
=|\boldsymbol p|^2I_2.
$$

この恒等式が、非静止の解でも二成分の割り算を簡単にします。

<a id="def-qft7-plane-waves"></a>

<!-- formal-statement-start -->
> **定義（正負振動数の平面波スピノル）**
> $m>0$、$E=\sqrt{m^2+|\boldsymbol p|^2}$ とする。$\mathbb C^2$ の正規直交基底 $\chi_1,\chi_2$ と $\xi_1,\xi_2$ を選び、$A=\boldsymbol\sigma\cdot\boldsymbol p$ と置く。各 $s=1,2$ に対し

$$
u_s(p)=\sqrt{E+m}
\begin{pmatrix}
\chi_s\\ A\chi_s/(E+m)
\end{pmatrix},
\qquad
v_s(p)=\sqrt{E+m}
\begin{pmatrix}
A\xi_s/(E+m)\\ \xi_s
\end{pmatrix}
$$

> を定める。場 $u_s(p)e^{-ip\cdot x}$ を正振動数の平面波、$v_s(p)e^{+ip\cdot x}$ を負振動数の平面波と呼ぶ。運動量のラベル $p^0=E$ は**両方で正**に取る。
<!-- formal-statement-end -->

$E+m\ge2m>0$ なので分母は零になりません。ここで「正・負」は時間の指数の符号を区別し、$v_s$ の四元運動量ラベルを負のエネルギーに取り直す約束ではありません。

<!-- definition-example-start: def-qft7-plane-waves -->
### 例：静止系とz方向の運動量

**定義の確認**：$\boldsymbol p=0$ なら $E=m$、$A=0$ です。標準基底 $\chi_1=\xi_1=(1,0)^T$、$\chi_2=\xi_2=(0,1)^T$ を選ぶと

$$
u_1(0)=\sqrt{2m}\begin{pmatrix}1\\0\\0\\0\end{pmatrix},
\quad
u_2(0)=\sqrt{2m}\begin{pmatrix}0\\1\\0\\0\end{pmatrix},
\quad
v_1(0)=\sqrt{2m}\begin{pmatrix}0\\0\\1\\0\end{pmatrix},
\quad
v_2(0)=\sqrt{2m}\begin{pmatrix}0\\0\\0\\1\end{pmatrix}.
$$

$(\not p-m)u_s=0$ は静止系で $\operatorname{diag}(0,0,-2m,-2m)u_s=0$、$(\not p+m)v_s=0$ は $\operatorname{diag}(2m,2m,0,0)v_s=0$ から確かめられます。

非静止の $\boldsymbol p=(0,0,q)$ では $A=q\sigma^3$、$E^2=m^2+q^2$ です。例えば

$$
u_1(p)=
\begin{pmatrix}\sqrt{E+m}\\0\\q/\sqrt{E+m}\\0\end{pmatrix},
\qquad
v_1(p)=
\begin{pmatrix}q/\sqrt{E+m}\\0\\\sqrt{E+m}\\0\end{pmatrix}.
$$

上二成分では $(E-m)(E+m)=q^2$、下二成分では $q\sqrt{E+m}-(E+m)q/\sqrt{E+m}=0$ が使え、正負ともDirac方程式を満たします。
<!-- definition-example-end -->

<a id="thm-qft7-spin-sums"></a>

<!-- formal-statement-start -->
> **定理（平面波解の規格化とスピン和）**
> $m>0$、$p^0=E>0$、$p^2=m^2$ の下で、上記の正規直交二成分基底から作った $u_s(p),v_s(p)$ は

$$
(\not p-m)u_s=0,\qquad
(\not p+m)v_s=0,
$$

$$
u_s^\dagger u_r=v_s^\dagger v_r=2E\delta_{sr},
\qquad
\bar u_su_r=2m\delta_{sr},\quad
\bar v_sv_r=-2m\delta_{sr},\quad
\bar u_sv_r=0
$$

> を満たす。さらにスピン和は、基底の取り方に依らず

$$
\sum_{s=1}^{2}u_s(p)\bar u_s(p)=\not p+mI_4,
\qquad
\sum_{s=1}^{2}v_s(p)\bar v_s(p)=\not p-mI_4
$$

> となる。ここで $\bar u=u^\dagger\gamma^0$、$\bar v=v^\dagger\gamma^0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

四成分の上半分と下半分を分け、二成分の恒等式 $A^2=|\boldsymbol p|^2I_2$ を繰り返し使います。スピン和では個々の $\chi_s$ が消え、$\sum_s\chi_s\chi_s^\dagger=I_2$ だけが残るため、結果は運動量と質量の式へ戻ります。

<!-- proof-start -->
### 証明

$A^\dagger=A$、$A^2=|\boldsymbol p|^2I_2$ です。$(\not p-m)$ と $(\not p+m)$ のブロックはそれぞれ

$$
\not p-mI_4
=\begin{pmatrix}
(E-m)I_2&-A\\A&-(E+m)I_2
\end{pmatrix},
\quad
\not p+mI_4
=\begin{pmatrix}
(E+m)I_2&-A\\A&-(E-m)I_2
\end{pmatrix}.
$$

前者を $u_s$ に掛けると、上段は

$$
(E-m)\chi_s-\frac{A^2}{E+m}\chi_s
=\frac{E^2-m^2-|\boldsymbol p|^2}{E+m}\chi_s=0,
$$

下段は $A\chi_s-(E+m)A\chi_s/(E+m)=0$ です。後者を $v_s$ に掛けると上段は $A\xi_s-A\xi_s=0$、下段は

$$
\frac{A^2}{E+m}\xi_s-(E-m)\xi_s
=\frac{|\boldsymbol p|^2-(E^2-m^2)}{E+m}\xi_s=0.
$$

従って $u_se^{-ip\cdot x}$ と $v_se^{+ip\cdot x}$ はDirac方程式の解です。実際、前者へ $i\partial_\mu$ を作用させると $p_\mu$、後者では $-p_\mu$ が出ます。

規格化を計算します。$N^2=E+m$ と略記して

$$
\begin{aligned}
u_s^\dagger u_r
&=N^2\chi_s^\dagger
\left(I_2+\frac{A^2}{(E+m)^2}\right)\chi_r\\
&=\left(E+m+\frac{E^2-m^2}{E+m}\right)\delta_{sr}
=2E\delta_{sr},\\
\bar u_su_r
&=\left(E+m-\frac{E^2-m^2}{E+m}\right)\delta_{sr}
=2m\delta_{sr}.
\end{aligned}
$$

$v$ でも上下の成分を交換して同じ二つの平方の和と差を作るので

$$
v_s^\dagger v_r=2E\delta_{sr},\qquad
\bar v_sv_r=-2m\delta_{sr}.
$$

異種の組合せは上段と下段の $A$ が相殺し、

$$
\bar u_sv_r=N^2\left(
\chi_s^\dagger\frac{A\xi_r}{E+m}
-\frac{\chi_s^\dagger A}{E+m}\xi_r\right)=0.
$$

次に $\sum_s\chi_s\chi_s^\dagger=I_2$ を用います。$u_s\bar u_s$ をブロックで展開すると

$$
\begin{aligned}
\sum_su_s\bar u_s
&=N^2
\begin{pmatrix}
\sum_s\chi_s\chi_s^\dagger&
-\sum_s\chi_s\chi_s^\dagger A/(E+m)\\
\sum_s A\chi_s\chi_s^\dagger/(E+m)&
-\sum_s A\chi_s\chi_s^\dagger A/(E+m)^2
\end{pmatrix}\\
&=\begin{pmatrix}
(E+m)I_2&-A\\
A&-|\boldsymbol p|^2I_2/(E+m)
\end{pmatrix}\\
&=\begin{pmatrix}
(E+m)I_2&-A\\A&-(E-m)I_2
\end{pmatrix}=\not p+mI_4.
\end{aligned}
$$

最終行では $|\boldsymbol p|^2=(E-m)(E+m)$ です。同じく $\sum_s\xi_s\xi_s^\dagger=I_2$ から

$$
\begin{aligned}
\sum_sv_s\bar v_s
&=N^2
\begin{pmatrix}
A^2/(E+m)^2&-A/(E+m)\\
A/(E+m)&-I_2
\end{pmatrix}\\
&=\begin{pmatrix}
(E-m)I_2&-A\\
A&-(E+m)I_2
\end{pmatrix}
=\not p-mI_4.
\end{aligned}
$$

この導出には二成分基底の特定の向きが残らず、任意の正規直交スピン基底で同じ式が成立します。
<!-- proof-end -->

ここで $\bar u_sv_r=0$ は**同じ運動量ラベル**でのDirac随伴に関する直交性です。正定値内積 $u_s^\dagger(p)v_r(p)$ が零だと置くのは誤りです。実際、一般の $\boldsymbol p$ では $2\chi_s^\dagger A\xi_r$ となります。

## 5. スピン和は二つの部分空間を取り出す

規格化した $u$ と $v$ の列ベクトル・行ベクトルの積を足すと、質量殻上の四次元空間を二次元ずつへ分けられます。ただし $v$ 側はDirac随伴の規格化が負なので、射影子には追加の負号が必要です。

<a id="def-qft7-projectors"></a>

<!-- formal-statement-start -->
> **定義（質量殻スピン射影子）**
> $m>0$、$p^0>0$、$p^2=m^2$ の運動量について

$$
\Pi_+(p)=\frac{\not p+mI_4}{2m},
\qquad
\Pi_-(p)=\frac{mI_4-\not p}{2m}
$$

> を定める。$\Pi_+$ は $\not p$ の固有値 $+m$ の空間、$\Pi_-$ は固有値 $-m$ の空間への射影候補である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft7-projectors -->
### 例：静止系では上下二成分を選ぶ

**定義の確認**：$p=(m,\boldsymbol0)$ なら $\not p=m\gamma^0$ なので

$$
\Pi_+(m,\boldsymbol0)
=\frac{I_4+\gamma^0}{2}
=\begin{pmatrix}I_2&0\\0&0\end{pmatrix},
\quad
\Pi_-(m,\boldsymbol0)
=\frac{I_4-\gamma^0}{2}
=\begin{pmatrix}0&0\\0&I_2\end{pmatrix}.
$$

両者は二乗しても変わらず、積は零、和は $I_4$。前節の静止系 $u_s$ は上二成分、$v_s$ は下二成分にあり、像もそれぞれ二次元です。
<!-- definition-example-end -->

<a id="prop-qft7-projector-completeness"></a>

<!-- formal-statement-start -->
> **命題（スピン和から得る相補射影）**
> $m>0$、$p^0>0$、$p^2=m^2$ では、質量殻射影子は

$$
\Pi_\pm^2=\Pi_\pm,\quad
\Pi_+\Pi_-=0,\quad
\Pi_++\Pi_-=I_4,\quad
\operatorname{rank}\Pi_\pm=2
$$

> を満たす。また任意の正規直交スピン基底に対して

$$
\Pi_+=\frac1{2m}\sum_su_s\bar u_s,
\qquad
\Pi_-=-\frac1{2m}\sum_sv_s\bar v_s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Clifford関係によって質量殻上で $(\not p)^2=m^2I_4$ となります。これを射影子の積へ代入すれば相補性が分かり、階数は跡から求められます。最後の式は[スピン和の定理](#thm-qft7-spin-sums)の規格化を読み替えたものです。

<!-- proof-start -->
### 証明

$p_\mu p_\nu$ は添字について対称なので、Clifford関係から

$$
(\not p)^2
=\frac12p_\mu p_\nu\{\gamma^\mu,\gamma^\nu\}
=p_\mu p_\nu\eta^{\mu\nu}I_4
=p^2I_4=m^2I_4.
$$

例えば $\Pi_+^2$ は

$$
\Pi_+^2
=\frac{(\not p)^2+2m\not p+m^2I_4}{4m^2}
=\frac{\not p+mI_4}{2m}=\Pi_+.
$$

$\Pi_-^2$ では $\not p$ の一次項の符号だけが逆で、同じ計算から $\Pi_-^2=\Pi_-$。混合積では

$$
\Pi_+\Pi_-=
\frac{(\not p+mI_4)(mI_4-\not p)}{4m^2}
=\frac{m^2I_4-(\not p)^2}{4m^2}=0.
$$

和は分子の $\not p$ が打ち消されて $I_4$ です。ここで各射影子が取り出す**固有空間**も確かめます。質量殻条件から

$$
(\not p-mI_4)\Pi_+
=\frac{(\not p)^2-m^2I_4}{2m}=0,
\qquad
(\not p+mI_4)\Pi_-=0.
$$

従って $\Pi_+$ の像のベクトルは $\not p$ の固有値 $+m$ に属し、$\Pi_-$ の像は固有値 $-m$ に属します。逆に $w\in\mathbb C^4$ が固有ベクトルなら

$$
\begin{aligned}
\not p\,w=mw&\ \Longrightarrow\ \Pi_+w=\frac{m+m}{2m}w=w,\\
\not p\,w=-mw&\ \Longrightarrow\ \Pi_-w=\frac{m-(-m)}{2m}w=w.
\end{aligned}
$$

それぞれの像は**ちょうど**対応する固有空間です。

階数の判定に用いる跡の意味も確認します。$\Pi^2=\Pi$ なら任意の $w$ は

$$
w=\Pi w+(w-\Pi w),\qquad
\Pi(w-\Pi w)=\Pi w-\Pi^2w=0
$$

と像と核へ一意に分解され、像上の固有値は1、核上は0です。よってこの基底での対角成分の和（跡）は像の次元、すなわち階数に等しくなります。Dirac表示の四つの $\gamma^\mu$ はすべて跡が零なので、$\operatorname{tr}\not p=0$ ですから

$$
\operatorname{rank}\Pi_\pm
=\operatorname{tr}\Pi_\pm
=\frac{4m}{2m}=2.
$$

最後に[平面波のスピン和](#thm-qft7-spin-sums)を各射影子の分子へ代入すると、示した二式を得ます。$v$ の随伴ノルムは $-2m$ なので、$\Pi_-$ の式に負号が付きます。
<!-- proof-end -->

スピン和は、個別のスピン基底を追跡せずに外線の行列積をまとめるための準備です。この時点では負振動数の $v$ を「負エネルギー粒子の確率振幅」と解釈しません。反粒子を正エネルギーの量子状態として扱うには、次にフェルミオンFock空間と反交換関係が必要です。

## 6. 演習：行列・Lorentz変換・平面波を自分でつなぐ

すべて計量は $(+,-,-,-)$、$m>0$、$\gamma^\mu$ は本章のDirac表示とします。四元運動量は $p^\mu=(E,\boldsymbol p)$、$E=\sqrt{m^2+|\boldsymbol p|^2}>0$ です。二成分の標準基底は $e_1=(1,0)^T$、$e_2=(0,1)^T$ とします。

### Level A：規約と行列の基本操作

### 演習 QFT7-A1：反交換子を手で掛ける

Pauli行列 $\sigma^1,\sigma^2$ を本章の定義どおりとし、$\gamma^1,\gamma^2$ を対応するブロック行列とする。$\gamma^1\gamma^2$、$\gamma^2\gamma^1$、$(\gamma^1)^2$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\sigma^1\sigma^2=i\sigma^3$、$\sigma^2\sigma^1=-i\sigma^3$ をまず直接掛けて得ます。[Dirac行列の定義](#def-qft7-clifford)に代入すると

$$
\gamma^1\gamma^2
=\begin{pmatrix}-\sigma^1\sigma^2&0\\0&-\sigma^1\sigma^2\end{pmatrix}
=-i\begin{pmatrix}\sigma^3&0\\0&\sigma^3\end{pmatrix},
$$

$$
\gamma^2\gamma^1
=+i\begin{pmatrix}\sigma^3&0\\0&\sigma^3\end{pmatrix},
\quad
(\gamma^1)^2
=\begin{pmatrix}-(\sigma^1)^2&0\\0&-(\sigma^1)^2\end{pmatrix}
=-I_4.
$$

従って $\{\gamma^1,\gamma^2\}=0$、$\{\gamma^1,\gamma^1\}=-2I_4$ となり、計量の空間成分の符号と一致します。
<!-- solution-end -->

### 演習 QFT7-A2：一次方程式の質量殻

$\not p=\gamma^\mu p_\mu$ とする。$(\not p+mI_4)(\not p-mI_4)$ をClifford関係から計算し、$p^2=m^2$ ならこの積が零であることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

行列とスカラー $m$ は可換なので交差項が消えます。[Clifford関係](#def-qft7-clifford)により

$$
\begin{aligned}
(\not p+mI_4)(\not p-mI_4)
&=(\not p)^2-m^2I_4\\
&=\frac12p_\mu p_\nu
(\gamma^\mu\gamma^\nu+\gamma^\nu\gamma^\mu)-m^2I_4\\
&=(p_\mu p_\nu\eta^{\mu\nu}-m^2)I_4
=(p^2-m^2)I_4.
\end{aligned}
$$

質量殻条件では $p^2=m^2$ なので零行列です。これは[因数分解定理](#thm-qft7-factorization)を平面波へ適用する際の代数的な形です。
<!-- solution-end -->

### 演習 QFT7-A3：一周と二周で符号が違う

$z$ 軸の回転に対して $S_R(\varphi)=\operatorname{diag}(e^{-i\varphi\sigma^3/2},e^{-i\varphi\sigma^3/2})$ とする。$S_R(\pi)$、$S_R(2\pi)$、$S_R(4\pi)$ を求めよ。対応する三次元の空間回転と符号の差を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\sigma^3=\operatorname{diag}(1,-1)$ なので

$$
e^{-i\varphi\sigma^3/2}
=\begin{pmatrix}e^{-i\varphi/2}&0\\0&e^{i\varphi/2}\end{pmatrix}.
$$

$\varphi=\pi$ のとき $\operatorname{diag}(-i,i)=-i\sigma^3$、$2\pi$ では $-I_2$、$4\pi$ では $I_2$ です。従って

$$
S_R(\pi)=\operatorname{diag}(-i\sigma^3,-i\sigma^3),
\quad
S_R(2\pi)=-I_4,\quad S_R(4\pi)=I_4.
$$

空間座標の回転は $2\pi$ で恒等ですが、[スピノル変換](#def-qft7-spinor-transform)の持ち上げは $-I_4$ になり、二重被覆の違いを具体的に表します。
<!-- solution-end -->

### 演習 QFT7-A4：静止系の二種類の随伴ノルム

$p=(m,\boldsymbol0)$、$u_1=\sqrt{2m}(1,0,0,0)^T$、$v_1=\sqrt{2m}(0,0,1,0)^T$ とする。$u_1^\dagger u_1$、$\bar u_1u_1$、$v_1^\dagger v_1$、$\bar v_1v_1$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

正定値のHermite内積は成分絶対値の二乗和なので

$$
u_1^\dagger u_1=v_1^\dagger v_1=2m=2E.
$$

[Dirac随伴](#def-qft7-adjoint-action)の $\gamma^0=\operatorname{diag}(1,1,-1,-1)$ を挟むと、上成分の符号は正、下成分は負です。よって

$$
\bar u_1u_1=2m,\qquad \bar v_1v_1=-2m.
$$

負号は $v_1^\dagger v_1$ が負という意味ではありません。二つの内積を混同しないことが要点です。
<!-- solution-end -->

### 演習 QFT7-A5：静止解をboostして運動量を持たせる

$q=m\sinh\vartheta$、$E=m\cosh\vartheta$、$\vartheta\ge0$ とし、$K=\gamma^0\gamma^3$、$S_B=e^{\vartheta K/2}$ とする。静止解 $u_1(0)=\sqrt{2m}(1,0,0,0)^T$ に $S_B$ を掛け、$u_1(E,0,0,q)$ と一致することを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$K(1,0,0,0)^T=(0,0,1,0)^T$、$K^2=I_4$ から

$$
S_Bu_1(0)=\sqrt{2m}
\begin{pmatrix}\cosh(\vartheta/2)\\0\\\sinh(\vartheta/2)\\0\end{pmatrix}.
$$

$E+m=m(\cosh\vartheta+1)=2m\cosh^2(\vartheta/2)$ で、$q=2m\sinh(\vartheta/2)\cosh(\vartheta/2)$ です。$\vartheta\ge0$ なので $\sqrt{E+m}=\sqrt{2m}\cosh(\vartheta/2)$。従って

$$
\frac q{\sqrt{E+m}}
=\sqrt{2m}\sinh(\vartheta/2).
$$

この上下成分は[平面波スピノル](#def-qft7-plane-waves)の $u_1(p)$ と一致します。変換が非ユニタリでも、Dirac随伴による規格化は保たれます。
<!-- solution-end -->

### Level B：複数の性質をつないで検算する

### 演習 QFT7-B1：平面波のDirac電流

$p^2=m^2$、$p^0=E>0$、$u_s(p)=\sqrt{E+m}(\chi_s,A\chi_s/(E+m))^T$、$A=\boldsymbol\sigma\cdot\boldsymbol p$、$\chi_s^\dagger\chi_s=1$ とする。$j^\mu=\bar u_s\gamma^\mu u_s$ を全成分求め、運動量との比例を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Dirac作用と保存電流](#thm-qft7-current)より $j^0=u_s^\dagger u_s$ で、[規格化定理](#thm-qft7-spin-sums)を条件 $E>0$、$\chi_s^\dagger\chi_s=1$ で使うと $j^0=2E$ です。

空間成分には $\gamma^0\gamma^j=\begin{pmatrix}0&\sigma^j\\\sigma^j&0\end{pmatrix}$ を代入し、

$$
\begin{aligned}
j^j
&=u_s^\dagger\gamma^0\gamma^ju_s\\
&=(E+m)\left(
\chi_s^\dagger\sigma^j\frac{A\chi_s}{E+m}
+\frac{\chi_s^\dagger A}{E+m}\sigma^j\chi_s
\right)\\
&=\chi_s^\dagger(\sigma^jA+A\sigma^j)\chi_s
=2p_j\chi_s^\dagger\chi_s=2p_j.
\end{aligned}
$$

最後の一歩では $\{\sigma^j,A\}=2p_jI_2$ を用いました。従って $j^\mu=2p^\mu$ です。時間成分も空間成分も同じ係数なので、これは[四元ベクトル変換](#thm-qft7-current)と両立します。
<!-- solution-end -->

### 演習 QFT7-B2：boostで微分の係数が消える

$z$ 軸のLorentz boostを $\Lambda^0{}_0=\Lambda^3{}_3=\cosh\vartheta$、$\Lambda^0{}_3=\Lambda^3{}_0=\sinh\vartheta$、$\Lambda^1{}_1=\Lambda^2{}_2=1$ とし、$S=e^{\vartheta\gamma^0\gamma^3/2}$ とする。$x'=\Lambda x$、$\psi'(x')=S\psi(x)$ のとき、$i\gamma^\mu\partial'_\mu\psi'$ が $S(i\gamma^\nu\partial_\nu\psi)$ に等しいことを確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

逆boostは $\vartheta$ を $-\vartheta$ に置き換えたものです。従って連鎖律から

$$
\begin{aligned}
\partial'_0\psi'&=S(\cosh\vartheta\,\partial_0-\sinh\vartheta\,\partial_3)\psi,\\
\partial'_3\psi'&=S(-\sinh\vartheta\,\partial_0+\cosh\vartheta\,\partial_3)\psi.
\end{aligned}
$$

[スピノル変換の直接例](#def-qft7-spinor-transform)の式を $\gamma^\mu S=S(S^{-1}\gamma^\mu S)$ と書けば

$$
\begin{aligned}
\gamma^0S&=S(\cosh\vartheta\,\gamma^0+\sinh\vartheta\,\gamma^3),\\
\gamma^3S&=S(\sinh\vartheta\,\gamma^0+\cosh\vartheta\,\gamma^3).
\end{aligned}
$$

これらを時間・$z$ 方向の微分項へ代入すると、$\partial_0$ の $\gamma^0$ 係数は $\cosh^2\vartheta-\sinh^2\vartheta=1$、$\gamma^3$ 係数は $\sinh\vartheta\cosh\vartheta-\cosh\vartheta\sinh\vartheta=0$ となります。$\partial_3$ も交差項が零、$\gamma^3$ の係数が1です。$j=1,2$ は変換されないので

$$
i\gamma^\mu\partial'_\mu\psi'=S(i\gamma^\nu\partial_\nu\psi).
$$

$S$ は座標に依存しない定数行列である点も使用しました。これは[共変性定理](#thm-qft7-covariance)の一方向の具体計算です。
<!-- solution-end -->

### 演習 QFT7-B3：負振動数のスピン和

$A=\boldsymbol\sigma\cdot\boldsymbol p$、$A^2=|\boldsymbol p|^2I_2$、$v_s(p)=\sqrt{E+m}(A\xi_s/(E+m),\xi_s)^T$ とする。$\sum_s\xi_s\xi_s^\dagger=I_2$ を用い、$\sum_sv_s\bar v_s=\not p-mI_4$ をブロックで直接導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

随伴は $\bar v_s=\sqrt{E+m}(\xi_s^\dagger A/(E+m),-\xi_s^\dagger)$ です。列ベクトルと行ベクトルの積を足すと

$$
\sum_sv_s\bar v_s
=(E+m)\begin{pmatrix}
\frac A{E+m}(\sum_s\xi_s\xi_s^\dagger)\frac A{E+m}&
-\frac A{E+m}\sum_s\xi_s\xi_s^\dagger\\
(\sum_s\xi_s\xi_s^\dagger)\frac A{E+m}&
-\sum_s\xi_s\xi_s^\dagger
\end{pmatrix}.
$$

基底の完全性を代入し、$A^2=(E^2-m^2)I_2$ を使って

$$
\sum_sv_s\bar v_s
=\begin{pmatrix}
\frac{E^2-m^2}{E+m}I_2&-A\\
A&-(E+m)I_2
\end{pmatrix}
=\begin{pmatrix}(E-m)I_2&-A\\A&-(E+m)I_2\end{pmatrix}
=\not p-mI_4.
$$

$v$ 側の右上の負符号は[Dirac随伴](#def-qft7-adjoint-action)から出ます。$v^\dagger$ との行列積を使うと、この符号を誤ります。
<!-- solution-end -->

### 演習 QFT7-B4：二つの射影と普通の直交性の違い

$p^2=m^2$、$p^0=E>0$ とし、$\Pi_\pm=(mI_4\pm\not p)/(2m)$ のうち $\Pi_-=(mI_4-\not p)/(2m)$ とする。$u_s(p),v_s(p)$ について $\Pi_+u_s$、$\Pi_-v_s$、$\Pi_+v_s$ を求めよ。また $u_s^\dagger(p)v_r(-\boldsymbol p)=0$ を二成分表示から検証せよ。最後の $v_r$ の運動量引数は $(-\boldsymbol p)$、エネルギーは正の $E$ とする。

- Level: B

<!-- solution-start -->
#### 詳細解答

[平面波方程式](#thm-qft7-spin-sums)より $\not p\,u_s=mu_s$、$\not p\,v_s=-mv_s$ です。[射影子の定義](#def-qft7-projectors)へ代入すると

$$
\Pi_+u_s=\frac{m+m}{2m}u_s=u_s,\quad
\Pi_-v_s=\frac{m-(-m)}{2m}v_s=v_s,\quad
\Pi_+v_s=\frac{m+(-m)}{2m}v_s=0.
$$

最後の内積では $A(-\boldsymbol p)=-A(\boldsymbol p)$、$E(-\boldsymbol p)=E(\boldsymbol p)$ なので

$$
\begin{aligned}
u_s^\dagger(\boldsymbol p)v_r(-\boldsymbol p)
&=(E+m)\left(
\chi_s^\dagger\frac{-A\xi_r}{E+m}
+\frac{\chi_s^\dagger A}{E+m}\xi_r
\right)=0.
\end{aligned}
$$

同じ $\boldsymbol p$ を二つのスピノルへ代入した正定値内積では、一般にこの相殺は成立しません。$v$ の運動量ラベルと負振動数の指数を取り違えない練習です。
<!-- solution-end -->

### Level C：静止系からboostし、波動方程式と射影へ接続する

### 演習 QFT7-C1：一つのz方向スピノルを最後まで検算する

$m>0$、$\vartheta>0$ とし、$E=m\cosh\vartheta$、$q=m\sinh\vartheta$、$p^\mu=(E,0,0,q)$ とする。Dirac表示の $\gamma^\mu$ と標準二成分基底 $e_1,e_2$ を用いる。

1. 静止系の $u_1(0)=\sqrt{2m}(1,0,0,0)^T$、$v_1(0)=\sqrt{2m}(0,0,1,0)^T$ を $S_B=e^{\vartheta\gamma^0\gamma^3/2}$ でboostし、$\boldsymbol p=(0,0,q)$ の $u_1(p),v_1(p)$ を得よ。
2. $(\not p-m)u_1=0$、$(\not p+m)v_1=0$ と、$\bar u_1u_1=2m$、$\bar v_1v_1=-2m$ を確認せよ。
3. 正振動数解 $u_1(p)e^{-ip\cdot x}$ の電流 $j^0,j^3$ を求め、静止系からの四元ベクトル変換と比較せよ。
4. $s=1,2$ の両スピンを足して $\sum_su_s\bar u_s$ の四つのブロックを求め、$\Pi_+$ が階数2の射影であることを示せ。最後に、$v_s e^{+ip\cdot x}$ と量子論の反粒子の関係で、まだ本章が構成していないものを述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. boost。** $K=\gamma^0\gamma^3$ は上二成分と下二成分の対応位置を $\sigma^3$ で結びます。$a=\vartheta/2$ と置けば $S_B=\cosh a\,I_4+\sinh a\,K$ なので

$$
\begin{aligned}
S_Bu_1(0)&=\sqrt{2m}(\cosh a,0,\sinh a,0)^T,\\
S_Bv_1(0)&=\sqrt{2m}(\sinh a,0,\cosh a,0)^T.
\end{aligned}
$$

$E+m=2m\cosh^2a$、$q=2m\sinh a\cosh a$ を使えば

$$
u_1(p)=\frac1{\sqrt{E+m}}(E+m,0,q,0)^T,\quad
v_1(p)=\frac1{\sqrt{E+m}}(q,0,E+m,0)^T.
$$

これは[平面波スピノルの定義](#def-qft7-plane-waves)と一致します。

**2. 方程式と規格化。** 四成分のうち第1・第3成分へ作用する部分だけを書くと

$$
\not p-mI_4\ \longleftrightarrow\
\begin{pmatrix}E-m&-q\\q&-E-m\end{pmatrix},
\quad
\not p+mI_4\ \longleftrightarrow\
\begin{pmatrix}E+m&-q\\q&-E+m\end{pmatrix}.
$$

前者を $(E+m,q)^T$ へ掛けた上成分は $(E-m)(E+m)-q^2=E^2-m^2-q^2=0$、下成分は $q(E+m)-(E+m)q=0$。後者を $(q,E+m)^T$ へ掛けると上成分は $(E+m)q-q(E+m)=0$、下成分は $q^2-(E-m)(E+m)=0$ です。

Dirac随伴の符号を使うと

$$
\bar u_1u_1=\frac{(E+m)^2-q^2}{E+m}
=\frac{2m(E+m)}{E+m}=2m,
$$

$$
\bar v_1v_1=\frac{q^2-(E+m)^2}{E+m}=-2m.
$$

**3. 電流。** 平面波の指数とその複素共役は電流内で相殺します。$j^0=u_1^\dagger u_1$、$j^3=u_1^\dagger\gamma^0\gamma^3u_1$ より

$$
j^0=\frac{(E+m)^2+q^2}{E+m}=2E,
\qquad
j^3=\frac{2q(E+m)}{E+m}=2q.
$$

静止系の電流 $(2m,0,0,0)$ にLorentz boostを掛けても $(2m\cosh\vartheta,0,0,2m\sinh\vartheta)=(2E,0,0,2q)$。この一致は[保存電流の四元ベクトル性](#thm-qft7-current)を数値行列で裏付けます。

**4. スピン和と射影。** $A=q\sigma^3$、$\sum_s e_se_s^\dagger=I_2$ なので、[スピン和](#thm-qft7-spin-sums)を構成する四ブロックは

$$
\sum_su_s\bar u_s=
\begin{pmatrix}
(E+m)I_2&-q\sigma^3\\
q\sigma^3&-\frac{q^2}{E+m}I_2
\end{pmatrix}
=\not p+mI_4.
$$

$q^2/(E+m)=E-m$ を使用しました。$\Pi_+=(\not p+mI_4)/(2m)$ について

$$
\Pi_+^2-\Pi_+
=\frac{(\not p)^2-m^2I_4}{4m^2}=0
$$

です。また $\operatorname{tr}\Pi_+=2$ なので階数は2です。ここで質量殻 $E^2-q^2=m^2$ を使うことが不可欠です。

負振動数解 $v_s e^{+ip\cdot x}$ は古典方程式の独立した解ですが、正エネルギーの反粒子状態と結び付けるには**フェルミオンの生成・消滅演算子、反交換関係、真空と粒子状態**を定める必要があります。本章の行列計算だけではその量子状態は構成されません。
<!-- solution-end -->

## 7. まとめ：次はフェルミオンを量子化する

- Clifford関係は一次Dirac作用素の二乗をKlein–Gordon作用素に戻し、質量殻を固定します。
- Lorentz変換はスピノル行列 $S$ で実現されます。$2\pi$ 回転は $-I_4$ へ持ち上がり、boostの $S$ は通常の内積についてユニタリではありません。
- Dirac随伴が作用とDirac電流の共変性を与えます。古典電流の時間成分は $\psi^\dagger\psi$ です。
- 質量殻上の $u_s e^{-ip\cdot x}$ と $v_s e^{+ip\cdot x}$ は各二偏極を持ち、スピン和は $\not p+mI_4$ と $\not p-mI_4$ にまとまります。$\Pi_-$ には規格化上の負号が必要です。

次に古典的な負振動数解を反粒子の正エネルギー励起として読み替えるには、スカラー場とは異なる反交換関係とフェルミオンFock空間を構成します。ここで得た規格化とスピン和が、その構成の整合性を判定する材料になります。
