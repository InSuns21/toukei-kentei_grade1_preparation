# CDYN4 周期変分方程式とFloquet乗数

[CDYN3の時間位相](../CDYN3/index.md#def-cdyn3-orbit-phase)によって、周期軌道上の運動は毎秒同じ位相だけ進む時計として記述できました。しかし、時計が正確に一周しても、少し外側へずれた解が元の周期軌道へ戻ってくるとは限りません。周回のたびにずれが半分になる円運動も、二倍になる円運動もあります。軌道**に沿って進む方向**と、軌道**から離れる方向**を分けて測る必要があります。

そのために[ODE8の流れの初期値微分](../ODE8/index.md#lem-ode8-flow-variational)を周期軌道へ適用し、一周前後の小さな変位を比較します。周期的な係数を持つ線形微分方程式を考え、その一周写像の固有値を調べるのが今回の主題です。

## 1. ずれを追うための基本行列

まず、連続な行列値関数 $A:\mathbb R\to\mathbb R^{n\times n}$ が周期 $T>0$ を持ち、$A(t+T)=A(t)$ を満たす線形系

$$
y'(t)=A(t)y(t)
$$

を考えます。各時刻 $t$ での解ベクトルは、初期ベクトル $y(0)$ に線形に依存します。この対応を一つの行列に集めれば、基底ベクトルをそれぞれ別々に解く手間がなくなります。

例えば $A(t)=\operatorname{diag}(-2,1)$ なら、$y_1(t)=e^{-2t}y_1(0)$、$y_2(t)=e^ty_2(0)$。初期ベクトルを一緒に運ぶ行列は $\operatorname{diag}(e^{-2t},e^t)$ です。

<a id="def-cdyn4-fundamental-matrix"></a>

<!-- formal-statement-start -->
### 定義（正規化基本行列）

$A:\mathbb R\to\mathbb R^{n\times n}$ を連続とする。行列関数 $X:\mathbb R\to\mathbb R^{n\times n}$ が

$$
X'(t)=A(t)X(t),\qquad X(0)=I_n
$$

を満たすとき、これを初期時刻0における**正規化基本行列**とする。$X(t)$ の第 $j$ 列は初期値 $e_j$ を持つ線形系の解である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn4-fundamental-matrix -->

**定義の確認**　上の定係数系では

$$
X(t)=\begin{pmatrix}e^{-2t}&0\\0&e^t\end{pmatrix},\qquad
X'(t)=\begin{pmatrix}-2e^{-2t}&0\\0&e^t\end{pmatrix}=A(t)X(t).
$$

また $X(0)=I_2$ です。二つの列はそれぞれ初期値 $(1,0)^\mathsf T$、$(0,1)^\mathsf T$ に対応します。
<!-- definition-example-end -->

正規化基本行列は任意の時刻で逆行列を持ちます。実際、ある $t_0$ で $X(t_0)v=0$ と仮定すると、$X(t)v$ と恒等的に0である解は時刻 $t_0$ で一致します。線形ODEの解の一意性によって時刻0でも $v=X(0)v=0$。よって $\ker X(t_0)=\{0\}$ であり、正方行列 $X(t_0)$ は可逆です。特に初期時刻 $s$ から $t$ への解の移動は

$$
y(t)=X(t)X(s)^{-1}y(s)
$$

と表せます。$s$ に代入すると $y(s)$ に戻り、微分すると $A(t)y(t)$ となるので、この式は確かに所望の初期値問題を解きます。

## 2. 一周期写像を作る

次に周期係数を利用します。時刻0の変位を一周後の時刻 $T$ へ送る行列は $X(T)$ です。例えば前節の定係数系を周期 $T=3$ とみなせば、第一方向は $e^{-6}$ 倍、第二方向は $e^3$ 倍となります。係数が定数でも「どの時間幅を一周と数えるか」は指定する必要があります。

<a id="def-cdyn4-monodromy"></a>

<!-- formal-statement-start -->
### 定義（モノドロミー行列とFloquet乗数）

$A:\mathbb R\to\mathbb R^{n\times n}$ が連続で $T$ 周期、$T>0$ とする。$X(0)=I_n$ を満たす正規化基本行列について

$$
M=X(T)
$$

を**モノドロミー行列**（一周期写像）と呼び、複素数体上で数えた $M$ の固有値を**Floquet乗数**と呼ぶ。固有値は代数的重複度を含めて数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn4-monodromy -->

**定義の確認**　$A(t)=\operatorname{diag}(-2,1)$、$T=3$ では $M=\operatorname{diag}(e^{-6},e^3)$ です。特性多項式を展開すると

$$
\det(\lambda I_2-M)=(\lambda-e^{-6})(\lambda-e^3).
$$

よってFloquet乗数は $e^{-6},e^3$ です。片方のずれは減少しますが、もう片方は増加します。
<!-- definition-example-end -->

<a id="thm-cdyn4-period-shift"></a>

<!-- formal-statement-start -->
### 定理（基本行列の周期シフトと周回の累積）

$A:\mathbb R\to\mathbb R^{n\times n}$ が連続で $T$ 周期、$X'=AX$、$X(0)=I_n$ とし、$M=X(T)$ と置く。このとき任意の $t\in\mathbb R$ と整数 $k$ に対し

$$
X(t+T)=X(t)M,\qquad
X(t+kT)=X(t)M^k
$$

が成り立つ。特に $X(kT)=M^k$。また、観測開始時刻を $s$ に変えた一周期写像は

$$
M_s=X(s+T)X(s)^{-1}=X(s)MX(s)^{-1}
$$

であり、$M_s$ と $M$ は同じFloquet乗数を持つ。
<!-- formal-statement-end -->

**証明の見取り図**　$X(t+T)$ と $X(t)M$ は、どちらも同じ係数行列 $A(t)$ の微分方程式を解き、時刻0で $M$ を取ります。従って解の一意性で一致します。原点を動かした一周期写像は行列の相似変換になるので、固有値は変わりません。

<!-- proof-start -->
### 証明

$Y(t)=X(t+T)$ と置きます。係数の周期性より

$$
Y'(t)=X'(t+T)=A(t+T)X(t+T)=A(t)Y(t),\qquad
Y(0)=X(T)=M.
$$

一方 $Z(t)=X(t)M$ と置くと、積の微分で

$$
Z'(t)=X'(t)M=A(t)X(t)M=A(t)Z(t),\qquad
Z(0)=I_nM=M.
$$

$Y,Z$ は同じ線形初期値問題の解なので一意性から $Y(t)=Z(t)$ です。これが第一の等式です。$M$ は $X(T)$ として可逆です。$k\ge0$ について第一式を繰り返し適用して $X(t+kT)=X(t)M^k$。$k=-1$ は $X(t)=X(t-T)M$ の両辺へ $M^{-1}$ を右から掛けて得られ、負の整数にも帰納的に拡張できます。

時刻 $s$ の変位 $v$ は、時刻0の初期ベクトル $X(s)^{-1}v$ に対応します。従って一周後は $X(s+T)X(s)^{-1}v$。周期シフト式に $t=s$ を代入すると

$$
X(s+T)X(s)^{-1}
=X(s)MX(s)^{-1}.
$$

$X(s)$ が可逆なのでこの2行列は相似です。特性多項式も

$$
\det(\lambda I-M_s)
=\det\{X(s)(\lambda I-M)X(s)^{-1}\}
=\det(\lambda I-M)
$$

となり、乗数は観測開始時刻によらず一致します。$\square$
<!-- proof-end -->

ここで**係数の周期性**が使われた場所は $A(t+T)=A(t)$ の一行だけです。この仮定がなければ $X(t+T)$ が $A(t)$ の方程式を解く保証はありません。また、$M^k$ は同じ初期時刻からちょうど $k$ 周後を表すものであり、一般の途中時刻を単純に $M^k$ と書くことはできません。

## 3. 自律系の周期軌道に沿った変分方程式

ここから[CDYN3の周期軌道](../CDYN3/index.md#thm-cdyn3-well-defined)へ戻ります。$F:U\to\mathbb R^n$ を開集合 $U$ 上の $C^1$ ベクトル場とし、非定常な $T$ 周期解 $\gamma:\mathbb R\to U$ を取ります。微小な初期値変位 $h$ の時間発展は、[ODE8の変分方程式](../ODE8/index.md#lem-ode8-flow-variational)により

$$
y'=A(t)y,\qquad A(t)=DF(\gamma(t))
$$

で一次近似されます。$\gamma(t+T)=\gamma(t)$ なので $A(t+T)=A(t)$。つまり周期係数系が自然に現れます。

<a id="thm-cdyn4-tangent-unit"></a>

<!-- formal-statement-start -->
### 定理（自律系の接線方向の乗数は1）

$U\subset\mathbb R^n$ を開集合、$F\in C^1(U,\mathbb R^n)$、$\gamma:\mathbb R\to U$ を非定常な $T$ 周期解（$T>0$）とする。$A(t)=DF(\gamma(t))$ とし、$X'=A(t)X$、$X(0)=I_n$、$M=X(T)$ と置く。このとき $\gamma'(t)$ は変分方程式の非零な $T$ 周期解であり、

$$
M\gamma'(0)=\gamma'(0)
$$

が成り立つ。従って $1$ は $M$ のFloquet乗数である。
<!-- formal-statement-end -->

**証明の見取り図**　同じ周期軌道上で出発時刻だけ少しずらすと、解が少し先へ進みます。その変位の一次成分は $\gamma'(t)$ です。一周すると同じ軌道の速度ベクトルに戻るため、この方向の倍率は1です。

<!-- proof-start -->
### 証明

$\gamma'(t)=F(\gamma(t))$ の両辺を時刻 $t$ で微分します。$F\in C^1$ なので連鎖律が使え、

$$
\gamma''(t)
=\frac{d}{dt}F(\gamma(t))
=DF(\gamma(t))\,\gamma'(t)
=A(t)\gamma'(t).
$$

従って $u(t)=\gamma'(t)$ はまさに $u'=A(t)u$ の解です。この方程式の初期時刻0からの解は $u(t)=X(t)u(0)$ と表せます。

一方、$\gamma(t+T)=\gamma(t)$ を時刻 $t$ で微分すると $\gamma'(t+T)=\gamma'(t)$ です。特に

$$
X(T)\gamma'(0)=u(T)=\gamma'(T)=\gamma'(0).
$$

$\gamma'(0)\ne0$ も重要です。もし $\gamma'(0)=F(\gamma(0))=0$ なら、定数解 $x(t)=\gamma(0)$ と $\gamma(t)$ は同じ初期値を持ちます。$F\in C^1$ による局所一意性から全時刻で一致し、非定常性に反します。よって $\gamma'(0)$ は非零の固有ベクトル、対応する固有値は1です。$\square$
<!-- proof-end -->

この1は**安定性を意味する1ではありません**。軌道に沿った出発位相のずれは元へ戻らない（ずれたまま回り続ける）という意味です。軌道全体への近づき方を見るには、接線方向以外の変位を調べます。また証明は自律系に依存します。単に係数が周期的な非自律系 $y'=A(t)y$ に、固有値1があるとは限りません。

## 4. 横方向の乗数が実際に現れる模型

平面の具体例で、接線方向と横方向を計算しましょう。$a\in\mathbb R$、$\omega>0$ を定数として

$$
\begin{aligned}
x'&=a(1-x^2-y^2)x-\omega y,\\
y'&=\omega x+a(1-x^2-y^2)y
\end{aligned}
$$

を考えます。多項式ベクトル場なので $C^1$ です。極座標 $x=r\cos\theta,\ y=r\sin\theta$ を $r>0$ で使うと、位相の進行と半径の増減が分かれます。

$xx'+yy'=a(1-r^2)r^2$ なので、$r'=(xx'+yy')/r=ar(1-r^2)$。また

$$
\theta'=\frac{xy'-yx'}{r^2}
=\frac{\omega(x^2+y^2)}{r^2}=\omega.
$$

従って $r=1$ が不変で、$\gamma(t)=(\cos\omega t,\sin\omega t)$ は最小正周期 $T=2\pi/\omega$ の非定常軌道です。

<a id="prop-cdyn4-radial-multiplier"></a>

<!-- formal-statement-start -->
### 命題（半径方向と接線方向の二つの乗数）

$a\in\mathbb R$、$\omega>0$ とし、上記平面自律系の単位円周期解 $\gamma$ を考える。周期 $T=2\pi/\omega$ のモノドロミー行列は、初期点 $\gamma(0)=(1,0)$ の半径・接線基底で

$$
M=\begin{pmatrix}e^{-2aT}&0\\0&1\end{pmatrix}
$$

となる。よってFloquet乗数は $e^{-2aT}$ と $1$ であり、前者は横方向、後者は接線方向に対応する。
<!-- formal-statement-end -->

**計算の着眼点**　半径は $r'=ar(1-r^2)$、角度は $\theta'=\omega$。周期軌道上の値 $r=1$ の周囲で微分すると、半径の一次変動だけが $-2a$ 倍の係数を受けます。

<!-- proof-start -->
### 証明

$r'=g(r)=ar-ar^3$ の導関数は $g'(r)=a-3ar^2$ なので、$r=1$ で $g'(1)=-2a$ です。変分を $\eta=\delta r$、$\zeta=\delta\theta$ とすれば、極座標での変分方程式は

$$
\eta'=-2a\eta,\qquad \zeta'=0.
$$

初期値 $(\eta_0,\zeta_0)$ からは $\eta(t)=e^{-2at}\eta_0$、$\zeta(t)=\zeta_0$ です。直交する半径・接線単位ベクトルを

$$
e_r(t)=(\cos\omega t,\sin\omega t),\qquad
e_\theta(t)=(-\sin\omega t,\cos\omega t)
$$

と置くと、座標写像 $(r,\theta)\mapsto (r\cos\theta,r\sin\theta)$ の微分は $\delta(x,y)=e_r(t)\delta r+r e_\theta(t)\delta\theta$。周期軌道上は $r=1$ なので

$$
\delta(x(t),y(t))
=e^{-2at}\eta_0 e_r(t)+\zeta_0 e_\theta(t).
$$

初期点では $e_r(0)=(1,0)$、$e_\theta(0)=(0,1)$。一周後は $e_r(T)=e_r(0)$、$e_\theta(T)=e_\theta(0)$ なので、初期値 $(\eta_0,\zeta_0)$ を送る行列は表示した対角行列です。$\square$
<!-- proof-end -->

$a>0$ なら $0<e^{-2aT}<1$ で半径ずれは一周ごとに縮みます。実際 $0<r<1$ では $r'=ar(1-r^2)>0$、$r>1$ では $r'<0$ なので、十分近くの解は半径 $1$ へ近づきます。一方、角度の原点差は一定なので**位相まで一致するわけではない**。$a<0$ なら半径方向に小さなずれが増え、軌道は横方向に不安定です。$a=0$ ではすべての $r>0$ が等速の周期円を作り、乗数は二つとも1。単位円に引き込まれることはありません。

### 発散との照合

[ODE11の平面周期軌道の乗数公式](../ODE11/index.md#thm-ode11-planar-multiplier)では、平面自律系の非自明乗数は発散の一周積分で求められます。上の模型の発散を各成分で微分すると

$$
\begin{aligned}
\frac{\partial x'}{\partial x}&=a(1-r^2)-2ax^2,\\
\frac{\partial y'}{\partial y}&=a(1-r^2)-2ay^2,\\
\operatorname{div}F&=2a(1-r^2)-2ar^2=2a-4ar^2.
\end{aligned}
$$

単位円上は $r=1$ ですから $\operatorname{div}F=-2a$、よって $\exp(\int_0^T\operatorname{div}F(\gamma(t))dt)=e^{-2aT}$。直接求めた横方向の乗数と一致します。この一致は具体模型の検算であり、ODE11の一般定理を新たに無条件で再証明したものではありません。

## 5. 乗数の読み方で間違えやすいこと

まず、連続時間の**一周**とは軌道の最小正周期（または特に指定した基本周期）です。$M^2$ の固有値は各乗数の二乗であり、元の一周の乗数と混同してはいけません。例えば半径の倍率が $1/2$ なら、二周後は $1/4$ です。

次に、固有値の絶対値が1に等しい場合、一次近似だけでは横方向の非線形安定性は決まりません。特に接線方向の1は自律的な周期軌道なら避けられません。平面で**非自明乗数**が $|\rho|<1$ なら[ODE11のPoincaré写像の議論](../ODE11/index.md#def-ode11-multiplier)を使って軌道への局所的な引込みを示せますが、解が指定した位相へ戻るとは主張していません。$|\rho|>1$ の場合は軌道から離れる向きがあります。$\rho=1$ なら高次項を調べる必要があります。

また、一般の $n$ 次元行列では一つの乗数だけで安定性を判定しないこと、固有値が重複する場合にはJordan構造も重要であることに注意します。この章では一般Floquet正規形 $X(t)=P(t)e^{Bt}$（$P$ が周期的）の完全構成を利用しません。周期シフト式と具体模型の変分計算だけで必要な結論を導いています。

### 一周後に半径ずれが角度へ混ざる例

単純な対角化だけを見ていると、すべての系で半径方向と接線方向が独立だと思いがちです。$r>0$ の環状領域で

$$
r'=-k(r-1),\qquad
\theta'=\omega+c(r-1)
$$

（$k>0$、$\omega>0$、$c\in\mathbb R$）を考えると、$r=1$ は周期 $T=2\pi/\omega$ の軌道です。変分を $\eta=\delta r,\zeta=\delta\theta$ と置けば

$$
\eta'=-k\eta,\qquad \zeta'=c\eta.
$$

まず $\eta(t)=e^{-kt}\eta_0$ を積分し、これを第二式に代入すると

$$
\zeta(t)-\zeta_0
=c\eta_0\int_0^t e^{-ks}ds
=\frac{c}{k}(1-e^{-kt})\eta_0.
$$

よって初期点の半径・接線基底での一周期写像は

$$
M=\begin{pmatrix}
e^{-kT}&0\\
\frac{c}{k}(1-e^{-kT})&1
\end{pmatrix}.
$$

対角成分から固有値は $e^{-kT},1$ です。半径変位は減っても**途中で位相差を蓄積する**ことが行列の左下の成分から分かります。接線方向1の固有ベクトル $(0,1)^\mathsf T$ は依然として残ります。角度と半径が結合した場合も、何が一周で不変かを行列から確かめる必要があります。

## 6. 演習と詳細解答

Level Aは定義と方向の解釈、Level Bは周期シフトと連鎖・座標変換を再構成します。Level Cは非線形系から変分、乗数、発散、安定性までを独力で接続します。

### A1. 一周の長さを固定する

$y'=\operatorname{diag}(-1,2)y$ の正規化基本行列と、$T=2$ と指定したときのFloquet乗数を求めよ。

- Level: A
- ID: CDYN4-A1

<!-- solution-start -->
**詳細解答**　成分方程式は $y_1'=-y_1$、$y_2'=2y_2$ です。初期基底 $e_1,e_2$ を解けば $X(t)=\operatorname{diag}(e^{-t},e^{2t})$、$X(0)=I_2$。一周行列は $M=X(2)=\operatorname{diag}(e^{-2},e^4)$ です。$\det(\lambda I-M)=(\lambda-e^{-2})(\lambda-e^4)$ より乗数は $e^{-2},e^4$。
<!-- solution-end -->

### A2. 周期係数でも積分で解ける

$y_1'=(-1+\cos t)y_1$、$y_2'=(2+\sin t)y_2$（$T=2\pi$）のFloquet乗数を求めよ。

- Level: A
- ID: CDYN4-A2

<!-- solution-start -->
**詳細解答**　対角系なので各成分を別々に積分します。初期値1の第一成分は $\exp(\int_0^t(-1+\cos s)ds)=e^{-t+\sin t}$、第二成分は $\exp(\int_0^t(2+\sin s)ds)=e^{2t+1-\cos t}$。時刻0ではいずれも1。$t=2\pi$ で $\sin2\pi=0$、$\cos2\pi=1$ だから $M=\operatorname{diag}(e^{-2\pi},e^{4\pi})$。固有値はこの対角成分です。
<!-- solution-end -->

### A3. 回転するだけの変分

$\omega>0$ とし、$y_1'=-\omega y_2$、$y_2'=\omega y_1$ の $T=2\pi/\omega$ におけるモノドロミー行列を求めよ。

- Level: A
- ID: CDYN4-A3

<!-- solution-start -->
**詳細解答**　初期値 $e_1$ に対する解は $(\cos\omega t,\sin\omega t)^\mathsf T$、$e_2$ に対する解は $(-\sin\omega t,\cos\omega t)^\mathsf T$。二列を並べると $X(t)=\begin{pmatrix}\cos\omega t&-\sin\omega t\\\sin\omega t&\cos\omega t\end{pmatrix}$。$X(0)=I_2$ で微分も指定の方程式を満たします。$\omega T=2\pi$ より $M=X(T)=I_2$、乗数は1が二つです。
<!-- solution-end -->

### A4. 軌道の速度ベクトルが一周で戻る

$F(x,y)=(y,-x)$、$\gamma(t)=(\cos t,-\sin t)$ とする。$\gamma'$ が変分方程式を解き、$M\gamma'(0)=\gamma'(0)$ を確かめよ。

- Level: A
- ID: CDYN4-A4

<!-- solution-start -->
**詳細解答**　$DF=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ です。$\gamma'(t)=(-\sin t,-\cos t)$、$\gamma''(t)=(-\cos t,\sin t)$。$DF\gamma'(t)=(-\cos t,\sin t)=\gamma''(t)$ なので変分方程式を満たします。$T=2\pi$、$\gamma'(T)=\gamma'(0)=(0,-1)\ne0$。解を運ぶ基本行列 $X$ により $M\gamma'(0)=X(T)\gamma'(0)=\gamma'(T)=\gamma'(0)$ です。
<!-- solution-end -->

### A5. 周回回数と倍率

一周行列が $M=\operatorname{diag}(1,\frac13)$ で、接線方向が第一成分、横方向が第二成分だとする。初期変位 $(2,9)^\mathsf T$ の三周後の線形変位と、その横方向の倍率を求めよ。

- Level: A
- ID: CDYN4-A5

<!-- solution-start -->
**詳細解答**　第2節で示した $X(kT)=M^k$ に $k=3$ を代入すると、三周後は $M^3(2,9)^\mathsf T$ です。$M^3=\operatorname{diag}(1,(1/3)^3)=\operatorname{diag}(1,1/27)$、従って変位は $(2,1/3)^\mathsf T$。横方向は初期の $9$ から $1/3$ になったので倍率は $(1/3)/9=1/27$ です。接線方向は三周しても2のままです。
<!-- solution-end -->

### B1. 周期シフトを式から導く

連続で $T$ 周期の $2\times2$ 行列値関数 $A(t)$ に対して、$X'=A(t)X$、$X(0)=I$ とする。$X(t+T)=X(t)X(T)$ を示し、時刻 $s$ から一周の行列が $X(s)X(T)X(s)^{-1}$ であることを証明せよ。

- Level: B
- ID: CDYN4-B1

<!-- solution-start -->
**詳細解答**　$Y(t)=X(t+T)$ と $Z(t)=X(t)X(T)$ を作ります。周期性により $Y'=A(t+T)X(t+T)=A(t)Y$、$Z'=A(t)Z$。初期値も $Y(0)=X(T)=Z(0)$ なので線形方程式の一意性から $Y=Z$。また $X(s)$ が可逆なのは、$X(s)v=0$ を満たす解 $X(t)v$ が時刻 $s$ で零となれば一意性によって全時刻零、特に $v=X(0)v=0$ だからです。従って時刻 $s$ の初期値 $w$ は $X(t)X(s)^{-1}w$ で運ばれ、一周後の行列は $X(s+T)X(s)^{-1}=X(s)X(T)X(s)^{-1}$ です。
<!-- solution-end -->

### B2. 連続時間の単位円が引き込む条件

$a>0$、$\omega>0$ として $r'=ar(1-r^2)$、$\theta'=\omega$（$r>0$）を考える。$r=1$ の横方向の一周倍率を求め、近くの $r(0)<1$、$r(0)>1$ からそれぞれ $r=1$ へ近づく向きを証明せよ。

- Level: B
- ID: CDYN4-B2

<!-- solution-start -->
**詳細解答**　$r=1$ は $r'=0$ で、角度は毎秒 $\omega$ 進むので $T=2\pi/\omega$。$g(r)=ar-ar^3$ について $g'(1)=a-3a=-2a$、従って横変分は $\eta'=-2a\eta$、一周後の倍率は $e^{-2aT}=e^{-4\pi a/\omega}$ です。$0<r<1$ では $r>0$、$1-r^2>0$ で $r'>0$。$r>1$ なら $1-r^2<0$ なので $r'<0$。一意性から平衡値1を有限時刻で横断せず、いずれの側でも1へ向かいます。単調有界な半径の極限 $L$ が1以外なら $g(L)\ne0$ によって一定の増減が続き極限に矛盾するため $L=1$ です。
<!-- solution-end -->

### B3. 非自律の周期係数に1は強制されない

$y_1'=(1+\sin t)y_1$、$y_2'=(-2+\cos t)y_2$ の係数は $2\pi$ 周期である。一周期の乗数を求め、自律的な非定常周期軌道の接線乗数定理をこの系へ適用できない理由を述べよ。

- Level: B
- ID: CDYN4-B3

<!-- solution-start -->
**詳細解答**　初期値1に対する解は $y_1(t)=\exp(\int_0^t(1+\sin s)ds)=e^{t+1-\cos t}$ と $y_2(t)=\exp(\int_0^t(-2+\cos s)ds)=e^{-2t+\sin t}$ です。両方とも時刻0で1。$T=2\pi$ を入れると $M=\operatorname{diag}(e^{2\pi},e^{-4\pi})$。どちらも1ではありません。接線方向の乗数1の証明は、**非定常な周期解 $\gamma$ を持つ自律方程式**から $\gamma'=F(\gamma)$ を微分し、非零の周期的変分解を作るものでした。本問は任意の周期係数線形系として与えられ、そのような自律系の周期軌道という仮定がないため、結論を転用できません。
<!-- solution-end -->

### B4. 半径変位から位相差が蓄積する

環状領域 $r>0$ で $r'=-2(r-1)$、$\theta'=3+4(r-1)$ とする。$r=1$ の周期と、初期点での $(\delta r,\delta\theta)$ に関する一周期行列、Floquet乗数を求めよ。

- Level: B
- ID: CDYN4-B4

<!-- solution-start -->
**詳細解答**　$r=1$ 上では $\theta'=3$ なので $T=2\pi/3$。変分を $\eta,\zeta$ とすると $\eta'=-2\eta$、$\zeta'=4\eta$。第一式から $\eta(t)=e^{-2t}\eta_0$。これを第二式へ代入して

$$
\zeta(t)=\zeta_0+4\eta_0\int_0^t e^{-2s}ds
=\zeta_0+2(1-e^{-2t})\eta_0.
$$

よって初期点と一周後で同じ半径・接線基底を用いた行列は

$$
M=\begin{pmatrix}e^{-4\pi/3}&0\\2(1-e^{-4\pi/3})&1\end{pmatrix}.
$$

$\det(\lambda I-M)=(\lambda-e^{-4\pi/3})(\lambda-1)$ なので乗数は $e^{-4\pi/3}$ と1。下左の成分は半径の初期ずれが角度のずれを作ることを表します。
<!-- solution-end -->

### C1. 非線形円運動のFloquet乗数を二つの方法で照合する

実数 $a$ と $\omega>0$ に対して平面系

$$
x'=a(1-x^2-y^2)x-\omega y,\qquad
y'=\omega x+a(1-x^2-y^2)y
$$

を考える。(a) 単位円上の周期解と最小正周期を求めよ。(b) 半径・接線方向の変分方程式からモノドロミー行列と乗数を求めよ。(c) 発散を直接微分で計算して、[ODE11の平面周期軌道の乗数公式](../ODE11/index.md#thm-ode11-planar-multiplier)と照合せよ。(d) $a>0,a<0,a=0$ を区別し、軌道への引込みと位相差が消えることを混同しないよう説明せよ。

- Level: C
- ID: CDYN4-C1

<!-- solution-start -->
**詳細解答**

(a) $r^2=x^2+y^2$ とすると $(r^2)'=2xx'+2yy'=2ar^2(1-r^2)$。$r>0$ で $2rr'=2ar^2(1-r^2)$ を $2r$ で割り、$r'=ar(1-r^2)$。偏角の微分は $(xy'-yx')/r^2=\omega$。従って $r=1$ は不変、$\gamma(t)=(\cos\omega t,\sin\omega t)$ が周期解で、$\omega>0$ により最小正周期は $T=2\pi/\omega$ です。

(b) $g'(r)=a(1-3r^2)$ なので $g'(1)=-2a$。角度方程式は $r$ に依存せず、$\eta=\delta r,\zeta=\delta\theta$ に対し $\eta'=-2a\eta,\ \zeta'=0$。解は $\eta(t)=e^{-2at}\eta_0$、$\zeta(t)=\zeta_0$。初期点と一周後では $e_r,e_\theta$ が一致します。従って $M=\operatorname{diag}(e^{-2aT},1)$、乗数は $e^{-4\pi a/\omega},1$ です。

(c) 第一成分を $x$ で微分すると $a(1-r^2)-2ax^2$、第二成分を $y$ で微分すると $a(1-r^2)-2ay^2$。和は $2a(1-r^2)-2ar^2=2a-4ar^2$。周期軌道は $r=1$ なので一周の積分は $\int_0^T(-2a)dt=-2aT$。指数を取れば $\exp(-2aT)$ となり、(b) の非自明乗数と一致します。ODE11の定理は平面 $C^1$ 自律系の非定常周期軌道へ適用しており、仮定が成立します。

(d) $a>0$ では横乗数が $(0,1)$ にあり、半径が1へ向かうことは $r'$ の符号からも分かります。ただし $\theta'=\omega$ なので初期角度差は一定で、二つの解の位相まで一致するわけではありません。$a<0$ なら $e^{-2aT}>1$ で横方向に反発します。$a=0$ なら $r'=0$ で初期半径が保存され、周囲のどの円も同じ周期で運動します。二つの乗数が1で、単位円への引込みはありません。$a=0$ の結果だけから、一般の乗数1の非線形安定性を判定することはできません。
<!-- solution-end -->

**次への問い**　周期軌道の「一周後にどうずれるか」を乗数で表せるようになりました。次は外部から周期的に揺らす力を加えたとき、定常振幅が周波数によりどう変わるかを調べます。CDYN5では強制振動・減衰を具体的な二階方程式で計算します。
