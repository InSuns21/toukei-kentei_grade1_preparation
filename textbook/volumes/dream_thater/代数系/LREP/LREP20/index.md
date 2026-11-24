# LREP20 平面波解・スピン和・helicity

<!-- definition-example-audit: strict -->

[前講の自由Dirac作用素](../LREP19/index.md#def-lrep19-dirac-operator) により、四成分の場を決める一次方程式を得ました。今回は運動量を固定すると微分方程式が四次行列の問題になることを使い、独立な解を全て作ります。解を足し合わせると基底に依存しない行列が得られ、次の粒子表現の学習につながります。

## 1. 時空の振動を四成分の代数方程式へ移す

計量は [共通規約](../../../../../dream-theater-lorentz-conventions.md) の $\eta=\operatorname{diag}(-1,1,1,1)$、$c=\hbar=1$ とします。$I=I_2$、$I_4$ は四次単位行列、$m\ge0$ は実質量、$\boldsymbol p\in\mathbb R^3$ は空間運動量です。$k=|\boldsymbol p|$、$E=\sqrt{k^2+m^2}$ とし、$E>0$ の場合を扱います。四元運動量の反変成分は $p=(p^\mu)=(E,\boldsymbol p)$、計量で添字を下げた成分は $(p_\mu)=(-E,\boldsymbol p)$ です。$E>0$ を未来向きと呼びます。質量殻の条件は

$$
\sum_{\mu=0}^3p_\mu p^\mu=-E^2+k^2=-m^2.
$$

時空点を $x=(t,\boldsymbol x)$、$\boldsymbol x=(x^1,x^2,x^3)$ と書きます。空間添字 $j$ は $1,2,3$、時空添字 $\mu,\nu$ は $0,1,2,3$ を走ります。空間部分の計量は単位行列なので $p_j=p^j$ です。列は [Diracスピノル](../LREP16/index.md#def-lrep16-dirac) の Weyl 基底（上二成分が左、下二成分が右）で表し、$e_j$ は四成分の標準基底（この添字だけは $j=1,2,3,4$）、$\dagger$ は複素共役転置、\mathsf T$ は転置です。

[ベクトル成分用行列](../LREP17/index.md#prop-lrep17-vector-matrices) と [Dirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint) は前講と同じものを使います。[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model) を $\sigma_j$ として

$$
H=G^0=\begin{pmatrix}0&-iI\\iI&0\end{pmatrix},
\qquad G^j=\begin{pmatrix}0&i\sigma_j\\i\sigma_j&0\end{pmatrix}.
$$

$$
\bar w=w^\dagger H,\qquad
G^\mu G^\nu+G^\nu G^\mu=-2\eta^{\mu\nu}I_4.
$$

時空に依存しない列を、時刻と位置に依存する複素指数で振動させます。空間運動量が非零なら固定時刻で等位相の面が平面になるため平面波と呼ばれます。空間運動量が零の空間一定の波も含めます。時間因子 $e^{-i\omega t}$ の実数 $\omega$ を周波数（角周波数）とし、空間因子 $e^{i\boldsymbol q\cdot\boldsymbol x}$ の実ベクトル $\boldsymbol q$ を空間Fourier波数とします。時間の指数の符号を反転した二種類を区別すると、粒子と反粒子のモード係数を後で構成できます。ここでの自由Dirac方程式は [自由Dirac作用素](../LREP19/index.md#def-lrep19-dirac-operator) $D_m=i\sum_\mu G^\mu\partial_\mu-mI_4$ に対する $D_m\psi=0$ です。

<a id="def-lrep20-plane-wave"></a>

<!-- formal-statement-start -->
> **定義（Dirac平面波モード）**
> $m\ge0$、$\boldsymbol p\in\mathbb R^3$、$E=\sqrt{|\boldsymbol p|^2+m^2}>0$ とし、$\theta=Et-\boldsymbol p\cdot\boldsymbol x$ とする。非零の定数列 $u,v\in\mathbb C^4$ に対し、自由Dirac方程式を満たす

$$
\psi_+(x)=u e^{-i\theta},\qquad
\psi_-(x)=v e^{i\theta}
$$

> をそれぞれ正周波数・負周波数のDirac平面波モードと呼ぶ。$p=(E,\boldsymbol p)$ はどちらにも使う未来向きのラベルである。
<!-- formal-statement-end -->

偏微分 $\partial_\mu$ は他の時空座標を固定して $x^\mu$ で微分する操作で、$\partial_0=\partial_t$ です。運動量と質量は定数なので $\partial_t\theta=E$、$\partial_j\theta=-p_j$ です。指数関数の連鎖律を使うと、例えば正周波数では

$$
i\partial_t(ue^{-i\theta})=Eu e^{-i\theta},
\qquad
i\partial_j(ue^{-i\theta})=-p_j u e^{-i\theta}.
$$

負周波数では $\partial_t e^{i\theta}=iE e^{i\theta}$、$\partial_j e^{i\theta}=-ip_j e^{i\theta}$ なので両者の符号が反転します。これは特定のモードに作用させた結果であって、微分作用素そのものが定数に等しいわけではありません。そこで $P=\sum_{j=1}^3p_j\sigma_j$ と置き、

$$
K(p)=EG^0-\sum_j p_jG^j
=\begin{pmatrix}0&-i(EI+P)\\i(EI-P)&0\end{pmatrix}
$$

と書くと、[自由Dirac作用素](../LREP19/index.md#def-lrep19-dirac-operator) への代入により、モードである条件は

$$
(K-mI_4)u=0,\qquad (K+mI_4)v=0
$$

となります。実際、$D_m\psi_+=e^{-i\theta}(K-mI_4)u$、$D_m\psi_-=e^{i\theta}(-K-mI_4)v$ であり、複素指数はどの点でも零でないので係数方程式と元の微分方程式は同値です。負周波数では全体を負倍しました。$K=-\sum_\mu p_\mu G^\mu$ です。

[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product) に同じ運動量を二度代入すると $P^2=k^2I$ であり、$P^\dagger=P$ です。従ってブロック積から

$$
K^2=
\begin{pmatrix}(EI+P)(EI-P)&0\\0&(EI-P)(EI+P)\end{pmatrix}
=m^2I_4.
$$

この恒等式は質量零でも成り立ちます。

<!-- definition-example-start: def-lrep20-plane-wave -->
**定義の確認**。 $m=2$、$\boldsymbol p=0$ とし、$\chi=(1,0)^{\mathsf T}$ を取ります。上下に二成分列を並べて $u=\binom{\chi}{i\chi}$、$v=\binom{\chi}{-i\chi}$ と置きます。行列を掛けると

$$
Hu=\binom{-i(i\chi)}{i\chi}=u,
\qquad Hv=\binom{-i(-i\chi)}{i\chi}=-v.
$$

ここで $E=2>0$ です。$K=2H$ なので $(K-2I_4)u=0$、$(K+2I_4)v=0$ です。従って空間に一定の $ue^{-2it}$ と $ve^{2it}$ は、非零の定数列と指定された周波数を持ち、全時空で自由Dirac方程式を満たします。
<!-- definition-example-end -->

平面波は全空間で絶対値が一定なので、ここでいう規格化は空間積分でなく有限次元の係数の規格化です。また負周波数の空間指数は $-i\boldsymbol p\cdot\boldsymbol x$ であり、Fourier波数は $-\boldsymbol p$ です。

## 2. 静止系から任意の運動量の係数を作る

$m>0$ では静止系で $E=m$ です。$H^2=I_4$ なので、正周波数・負周波数の静止係数はそれぞれ $H$ の固有値 $+1,-1$ に対応します。$\chi_1=(1,0)^{\mathsf T}$、$\chi_2=(0,1)^{\mathsf T}$ を使って

$$
u_s(0)=\sqrt m\begin{pmatrix}\chi_s\\i\chi_s\end{pmatrix},
\qquad v_s(0)=\sqrt m\begin{pmatrix}\chi_s\\-i\chi_s\end{pmatrix}
$$

と選びます。この係数は随伴との収縮がそれぞれ $2m,-2m$ となるように選んだものです。

静止系からの能動boostを構成します。[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product) より $P^\dagger=P$、$P^2=k^2I$ です。次の二次行列を用意します。

$$
A=\frac{(E+m)I+P}{\sqrt{2m(E+m)}},
\qquad
A^{-1}=\frac{(E+m)I-P}{\sqrt{2m(E+m)}}.
$$

分母は正です。積の分子は $((E+m)^2-k^2)I=2m(E+m)I$ なので確かに逆行列です。二乗の分子を展開すると

$$
((E+m)I\pm P)^2
=2E(E+m)I\pm2(E+m)P,
$$

ここで $(E+m)^2+k^2=2E(E+m)$ を使いました。分母で割ると

$$
A^2=\frac{EI+P}{m},
\qquad A^{-2}=\frac{EI-P}{m}.
$$

例えば $k>0$ なら $N=P/k$ とし、$\rho$ を $\cosh\rho=E/m$、$\sinh\rho=k/m$ の非負のラピディティ（boostの大きさを表す実数）とします。半角公式から

$$
\cosh(\rho/2)=\sqrt{\frac{E+m}{2m}},
\qquad
\sinh(\rho/2)=\frac{k}{\sqrt{2m(E+m)}}.
$$

従って $A=\cosh(\rho/2)I+\sinh(\rho/2)N$ です。$N$ は Hermitian で $N^2=I$、跡が零なので二つの固有値は $+1,-1$。その固有ベクトルに $A$ を作用させると固有値は $e^{\rho/2},e^{-\rho/2}$ で、ともに正、積は1です。従って $\det A=1$ です。$k=0$ なら $A=I$ です。

[四元ベクトルのエルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model) では $(E,\boldsymbol p)$ を $EI+P$ で表します（LREP10 の模型の記号 $H(x)$ と、本講の四次行列 $H$ は別物です）。[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action) において、静止運動量を表す $mI$ の像は $A(mI)A^\dagger=mA^2=EI+P$ となるため、これが目的のboostです。四成分の作用は [Diracスピノル](../LREP16/index.md#def-lrep16-dirac) の表現に従って

$$
S=\begin{pmatrix}A&0\\0&A^{-1}\end{pmatrix}
$$

です。以下の計算では、boostの具体形だけで解を検証できます。

<a id="prop-lrep20-boost-modes"></a>

<!-- formal-statement-start -->
> **命題（正質量のDiracモードの構成）**
> $m>0$、任意の $\boldsymbol p\in\mathbb R^3$ に対し上記の $E,P,A,S$ を取る。$\chi_1,\chi_2$ を $\mathbb C^2$ の任意の正規直交基底とする。このとき

$$
u_s(p)=\sqrt m\begin{pmatrix}A\chi_s\\iA^{-1}\chi_s\end{pmatrix},
\quad
v_s(p)=\sqrt m\begin{pmatrix}A\chi_s\\-iA^{-1}\chi_s\end{pmatrix}
$$

> はそれぞれ $K-mI_4$、$K+mI_4$ の核の基底である。
<!-- formal-statement-end -->

**証明の見取り図。** 静止系の行列を $S$ で共役して $K/m$ を得ます。可逆な写像で二つの核の次元も保たれます。

<!-- proof-start -->
### 証明

$A$ はHermitianで可逆です。ブロック積から

$$
SHS^{-1}=\begin{pmatrix}0&-iA^2\\iA^{-2}&0\end{pmatrix}
=\frac{K}{m}.
$$

従って $(K\mp mI_4)S=mS(H\mp I_4)$ です。$H(a,b)^{\mathsf T}=(-ib,ia)^{\mathsf T}$ なので $H$ の固有値 $+1$ の列は $b=ia$、固有値 $-1$ の列は $b=-ia$ と同値です。$a$ は任意の二成分列であり、各固有空間の次元は2です。静止基底に $S$ を掛ければ対応する核の基底となります。$\square$
<!-- proof-end -->

例えば $\boldsymbol p=(0,0,3)$、$m=4$ では $E=5$、$A=\operatorname{diag}(\sqrt2,1/\sqrt2)$ です。$\chi_1$ の正周波数係数は $(2\sqrt2,0,i\sqrt2,0)^{\mathsf T}$ であり、$K$ の上下ブロックに $EI+P=\operatorname{diag}(8,2)$、$EI-P=\operatorname{diag}(2,8)$ を代入すると上成分は $8\sqrt2$、下成分は $4i\sqrt2$ となります。元の列の4倍です。

## 3. 規格化とスピン和

[正質量のDiracモードの構成](#prop-lrep20-boost-modes) では基底の選び方は自由ですが、係数と随伴を掛けた四次行列を基底について足すと、基底の選び方が消えます。以下で $s,t$ は基底の番号 $1,2$（時刻の $t$ とは別）で、$\delta_{st}$ は $s=t$ なら1、異なれば0です。この和は後に各スピン成分を足し合わせる計算で重要です。

<a id="thm-lrep20-spin-sums"></a>

<!-- formal-statement-start -->
> **定理（Diracモードの規格化とスピン和）**
> $m>0$、$p=(E,\boldsymbol p)$ を第2節の未来向き運動量とし、正規直交基底から構成した $u_s(p),v_s(p)$ と随伴 $\bar w=w^\dagger H$ を使う。このとき

$$
\bar u_s u_t=2m\delta_{st},\qquad
\bar v_s v_t=-2m\delta_{st},\qquad
\bar u_s v_t=\bar v_s u_t=0,
$$

$$
u_s^\dagger u_t=v_s^\dagger v_t=2E\delta_{st}.
$$

> スピン和（各列とその随伴の外積の和）は

$$
\sum_{s=1}^2 u_s\bar u_s=K+mI_4,\qquad
\sum_{s=1}^2 v_s\bar v_s=K-mI_4.
$$

> 従って四成分空間で

$$
I_4=\frac1{2m}\sum_s(u_s\bar u_s-v_s\bar v_s)
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** boostは随伴との収縮を保ちます。外積では上下ブロックの積を計算し、二成分の正規直交基底の完全性を使います。

<!-- proof-start -->
### 証明

$S^\dagger HS=H$ は上下非対角ブロックが $-iAA^{-1}$ と $iA^{-1}A$ であることから従います。従って静止系と同じ収縮を得ます。静止系では $Hu_t(0)=u_t(0)$、$Hv_t(0)=-v_t(0)$ であり、

$$
u_s(0)^\dagger v_t(0)=m(1+(-i)(-i))\delta_{st}=0.
$$

同符号同士の通常の内積は $2m\delta_{st}$ なので随伴による三つの式が従います。一般運動量では通常の内積は

$$
u_s^\dagger u_t=m\chi_s^\dagger(A^2+A^{-2})\chi_t
=2E\delta_{st}
$$

となり、$v_s^\dagger v_t$ も下ブロックの位相の積 $i(-i)=1$ により同じです。

行列の和を計算します。$Q_s=\chi_s\chi_s^\dagger$ と置きます。任意の二成分列 $a$ は正規直交基底により $a=\sum_s\chi_s(\chi_s^\dagger a)$ と展開できるので、$\sum_sQ_s=I$ です。随伴は

$$
\bar u_s=\sqrt m(\chi_s^\dagger A^{-1},-i\chi_s^\dagger A),
\qquad
\bar v_s=\sqrt m(-\chi_s^\dagger A^{-1},-i\chi_s^\dagger A).
$$

外積を全てのブロックで計算すると

$$
u_s\bar u_s=m\begin{pmatrix}
AQ_sA^{-1}&-iAQ_sA\\
iA^{-1}Q_sA^{-1}&A^{-1}Q_sA
\end{pmatrix},
$$

$$
v_s\bar v_s=m\begin{pmatrix}
-AQ_sA^{-1}&-iAQ_sA\\
iA^{-1}Q_sA^{-1}&-A^{-1}Q_sA
\end{pmatrix}.
$$

和を取れば対角ブロックはそれぞれ $mI,-mI$、両者の非対角ブロックは $-imA^2,imA^{-2}$ です。第2節の二乗の式から非対角ブロックは $K$ の対応するブロックに等しいので、二つのスピン和の式が得られます。その差を $2m$ で割れば完全性の式になります。$\square$
<!-- proof-end -->

この完全性は、任意の列を $u_s,v_s$ の線形結合として復元できることを表します。負周波数の随伴による規格化が負であることと、通常の内積による長さが正であることは別の話です。

ただし、同じ空間Fourier波数 $\boldsymbol p$ を持つ時間発展の基底を作るには $u_s(p)$ と $v_s(E,-\boldsymbol p)$ を組にします。次節で、この区別がなぜ必要かを見ます。

## 4. 時間発展の固有空間とhelicity

[前講の自由Dirac方程式](../LREP19/index.md#def-lrep19-dirac-operator) に $\psi(t,\boldsymbol x)=e^{i\boldsymbol q\cdot\boldsymbol x}w(t)$ を代入します。$\boldsymbol q$ は固定した実三次元Fourier波数です。空間偏微分は $i q_j\psi$、時間偏微分は $e^{i\boldsymbol q\cdot\boldsymbol x}dw/dt$ です。指数を消して左から $H$ を掛けると

$$
i\frac{dw}{dt}=\left(\sum_j q_j HG^j+mH\right)w.
$$

$w$ は時刻のみの関数なのでここでは常微分です。$H^2=I_4$ と $HG^j=\operatorname{diag}(\sigma_j,-\sigma_j)$ から、時間発展の行列は

$$
T(\boldsymbol q)=
\begin{pmatrix}Q&-imI\\imI&-Q\end{pmatrix},
\qquad Q=\sum_j q_j\sigma_j
$$

となり、$i\,dw/dt=T(\boldsymbol q)w$ です。$T$ はHermitianです。[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product) から $Q^2=|\boldsymbol q|^2I$ なのでブロック積の非対角項は $-imQ+imQ=0$ と $imQ-imQ=0$、対角項は $(|\boldsymbol q|^2+m^2)I$ です。

<a id="prop-lrep20-energy-projectors"></a>

<!-- formal-statement-start -->
> **命題（固定Fourier波数でのエネルギー射影）**
> $m>0$、$\boldsymbol p\in\mathbb R^3$、$E=\sqrt{|\boldsymbol p|^2+m^2}$ とする。第2節のモード係数について

$$
\begin{aligned}
T(\boldsymbol p)u_s(E,\boldsymbol p)&=Eu_s(E,\boldsymbol p),\\
T(\boldsymbol p)v_s(E,-\boldsymbol p)&=-Ev_s(E,-\boldsymbol p).
\end{aligned}
$$

> 両組を $\sqrt{2E}$ で割ると合わせて正規直交基底となる。対応する直交射影（通常の複素内積に関して各固有空間の成分を取り出す写像）は

$$
\Pi_\pm(\boldsymbol p)=\tfrac12(I_4\pm T(\boldsymbol p)/E).
$$

> この射影公式自体は $m=0$、$\boldsymbol p\ne0$ の場合にも有効である。
<!-- formal-statement-end -->

**証明の見取り図。** 時間指数から固有値を読み取ります。内積を左右から計算して直交性を示し、射影の積を展開します。

<!-- proof-start -->
### 証明

$(K(p)-mI_4)u_s=0$ の左から $H$ を掛けると $Eu_s=(H\sum_jp_jG^j+mH)u_s=T(\boldsymbol p)u_s$ です。負周波数の係数に対して $p'=(E,-\boldsymbol p)$ とすると $(K(p')+mI_4)v_s(p')=0$ なので $Ev_s(p')=-T(\boldsymbol p)v_s(p')$ です。

Hermitian性により $Eu_s^\dagger v_t(p')=-Eu_s^\dagger v_t(p')$ となるため、$E>0$ から異符号間の通常の内積は0です。[規格化とスピン和](#thm-lrep20-spin-sums) の通常の内積から、同符号の二列を $\sqrt{2E}$ で割ると正規直交します。四列は互いに直交する非零列なので四次元の基底です。

$E>0$ と $T^2=E^2I_4$ から

$$
\Pi_\pm^2=\tfrac14(I_4\pm2T/E+T^2/E^2)=\Pi_\pm,
\qquad
\Pi_+\Pi_-=\tfrac14(I_4-T^2/E^2)=0.
$$

さらに $\Pi_++\Pi_-=I_4$、$\Pi_\pm^\dagger=\Pi_\pm$ です。$T\Pi_\pm=(T\pm EI_4)/2=\pm E\Pi_\pm$ なので像は対応する固有空間に入り、$Tw=\pm Ew$ なら $\Pi_\pm w=w$ なので逆も成り立ちます。異なる像の内積は $(\Pi_+a)^\dagger\Pi_-b=a^\dagger\Pi_+\Pi_-b=0$ です。ここで用いた条件は $T^\dagger=T$、$T^2=E^2I_4$、$E>0$ だけなので $m=0$、$\boldsymbol p\ne0$ の場合にも成立します。$\operatorname{tr}T=0$ から両射影の跡は2で、固有空間は各二次元です。$\square$
<!-- proof-end -->

次に運動方向に沿ったスピンを測ります。$\boldsymbol p\ne0$ とし、[helicity演算子](../LREP16/index.md#def-lrep16-helicity) を

$$
h_{\boldsymbol p}=\frac1{2k}\begin{pmatrix}P&0\\0&P\end{pmatrix}
$$

と書きます。$P$ はHermitian、$P^2=k^2I$ かつトレース0なので、固有値は $+k,-k$ です。単位固有ベクトルを $\chi_\tau$（$\tau=+1,-1$）とし、$P\chi_\tau=\tau k\chi_\tau$ とします。これらを第2節の基底に選べば

$$
\begin{aligned}
A\chi_\tau&=\sqrt{(E+\tau k)/m}\,\chi_\tau,\\
A^{-1}\chi_\tau&=\sqrt{(E-\tau k)/m}\,\chi_\tau.
\end{aligned}
$$

$m>0$ の場合について、第2節の $A$ の固有値は正なので、二乗の式から正の平方根を選びました。従って

$$
u_\tau=\begin{pmatrix}\sqrt{E+\tau k}\,\chi_\tau\\
i\sqrt{E-\tau k}\,\chi_\tau\end{pmatrix},
\qquad
v_\tau=\begin{pmatrix}\sqrt{E+\tau k}\,\chi_\tau\\
-i\sqrt{E-\tau k}\,\chi_\tau\end{pmatrix}.
$$

上下で同じ $\chi_\tau$ を使うので両係数とも $h_{\boldsymbol p}$ の固有値は $\tau/2$ です。$m>0$ なら $E>k$ なので上下とも非零であり、[chirality演算子](../LREP16/index.md#def-lrep16-chirality) $\gamma^5=\operatorname{diag}(-I,I)$ の固有列ではありません。

## 5. 質量零のWeyl方程式と符号の読み方

$m=0$、$k>0$ とします。質量項が左右のWeyl成分を結合していた [前々講までの構成](../LREP16/index.md#prop-lrep16-mass-coupling) と異なり、質量零では二つの成分の方程式が分離します。第2節のboostの式は $m$ で割るため使えません。しかし第4節の平方根の式は $m\to0+$ で有限の極限を持ちます。直接、方程式を解いて同じ結果になることを確かめます。

<a id="thm-lrep20-massless-helicity"></a>

<!-- formal-statement-start -->
> **定理（質量零モードのchiralityとhelicity）**
> $m=0$、$\boldsymbol p\ne0$、$E=k=|\boldsymbol p|$ とする。正周波数・負周波数のDirac平面波係数はともに $K(p)$ の核に属する。非零の係数 $w$ が $\gamma^5$ の固有値 $\lambda_c\in\{-1,1\}$ を持つなら

$$
h_{\boldsymbol p}w=-\tfrac{\lambda_c}{2} w.
$$

> 正周波数の空間Fourier波数は $\boldsymbol p$、負周波数では $-\boldsymbol p$ なので、後者のFourier波数に沿うhelicity演算子の固有値は $\lambda_c/2$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 質量項がなくなると左右が独立になり、Pauli行列の二つの固有空間に帰着します。

<!-- proof-start -->
### 証明

第1節で導いた係数方程式では $m=0$ なので両符号とも $K(p)w=0$ です。$w=(a,b)^{\mathsf T}$ と分けると

$$
(kI+P)b=0,\qquad(kI-P)a=0.
$$

つまり $Pa=ka$、$Pb=-kb$ です。これは $a\in\mathbb C\chi_+$、$b\in\mathbb C\chi_-$ と同値です。それぞれの部分空間は一次元であり、核は二次元です。

左列 $(a,0)^{\mathsf T}$ は $\gamma^5$ 固有値 $-1$ と $h_{\boldsymbol p}$ 固有値 $+1/2$ を持ち、右列 $(0,b)^{\mathsf T}$ はそれぞれ $+1,-1/2$ です。従って $h_{\boldsymbol p}w=-\lambda_c w/2$ が成立します。$h_{-\boldsymbol p}=-h_{\boldsymbol p}$ なので負周波数のFourier波数に対しては符号が逆になります。$\square$
<!-- proof-end -->

例えば $\boldsymbol p=(0,0,k)$ のとき、左の正周波数解は $\psi_+=\sqrt{2k}\,e_1e^{-ikt+ikz}$、右の正周波数解は $\psi_+=i\sqrt{2k}\,e_4e^{-ikt+ikz}$ です。左の係数は $h_{\boldsymbol p}$ の固有値 $+1/2$、右の係数は $-1/2$ を持ちます。この符号は本講座の左右とガンマ行列の規約によるものです。別の文献で用いるchiralityの符号をそのまま持ち込めません。

粒子と反粒子の区別には、さらにモード係数と状態の区別が必要です。[電荷共役](../LREP18/index.md#def-lrep18-charge-conjugation) は成分ごとの複素共役 $w^*$ に行列 $B$ を掛ける反線形写像 $w\mapsto Bw^*$ です。

$$
B=\begin{pmatrix}0&J\\-J&0\end{pmatrix},
\qquad J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

[電荷共役行列の恒等式](../LREP18/index.md#prop-lrep18-gamma-transpose) より $B(G^\mu)^*B^{-1}=-G^\mu$。正周波数解を共役すると指数が逆になり、$K(Bu^*)=-B(Ku)^*=-mBu^*$ となるので負周波数係数になります。

[電荷共役行列の恒等式の証明](../LREP18/index.md#prop-lrep18-gamma-transpose) と同じ Pauli 行列の積を複素共役で書くと

$$
J\sigma_1=\sigma_3=-\sigma_1J,\qquad
J\sigma_3=-\sigma_1=-\sigma_3J,
$$

$$
J\sigma_2^*=-J\sigma_2=-iI=-\sigma_2 J.
$$

よって $JP^*=-PJ$ となり、上下の非対角ブロックを比較して $h_{\boldsymbol p} B=-B h_{\boldsymbol p}^*$ です。また実対角行列 $\gamma^5$ と $B$ は反交換するので、共役はchiralityとラベル方向の係数helicityの双方を反転させます。

正エネルギーの反粒子として解釈するときは、負周波数モードそのもののFourier波数を反粒子の運動量と同一視しません。$v$ に付けたラベル $p$ は未来向きの運動量で、共役された係数の回転位相は元の係数と逆です。例えばラベル方向の回転に対し $u$ が $e^{-ih\varphi}$ を受けるなら、共役列は $e^{ih\varphi}$ を受けます。反粒子状態のスピンラベルを共役係数の固有値と同一視しない理由です。状態空間での厳密な作用は後の講義で構成します。

なお $m=0$ でも $k>0$ で固定Fourier波数の時間発展の二乗は $k^2I_4$ となりますが、$m$ で割る第3節の完全性の式は使えません。$\boldsymbol p=0$ の質量零の場合は $E=0$ であり、運動方向も周波数の区別も失われます。

## 6. 演習

### Level A

<a id="ex-lrep20-a01"></a>

#### LREP20-A01 周波数の符号
- Level: A
- ID: LREP20-A01

$m=3$、$\boldsymbol p=0$ とする。$w=e_2-ie_4$ に対し $we^{-3it}$ と $we^{3it}$ のどちらが自由Dirac方程式の解か。

<!-- solution-start -->
**詳細解答。** $Hw=ie_4-e_2=-w$ です。[Dirac平面波モード](#def-lrep20-plane-wave) の係数条件で $K=3H$ なので $(K-3I_4)w=-6w\ne0$、$(K+3I_4)w=0$ です。従って負周波数の $we^{3it}$ だけが解です。
<!-- solution-end -->

<a id="ex-lrep20-a02"></a>

#### LREP20-A02 Pauli行列と質量殻
- Level: A
- ID: LREP20-A02

$m=2$、$\boldsymbol p=(1,2,2)$ とする。$P,E$ を求め、$P^2$ と $K^2$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [Pauli行列](../LREP5/index.md#def-lrep5-pauli-model) から

$$
P=\begin{pmatrix}2&1-2i\\1+2i&-2\end{pmatrix},
\quad E=\sqrt{4+1+4+4}=\sqrt{13}.
$$

対角成分は $4+(1-2i)(1+2i)=9$、非対角成分は $2(1-2i)-2(1-2i)=0$ とその共役なので $P^2=9I$ です。第1節の $K$ を二乗すると上下の対角ブロックは $(EI+P)(EI-P)=(13-9)I=4I$、非対角ブロックは零。従って $K^2=4I_4$ です。
<!-- solution-end -->

<a id="ex-lrep20-a03"></a>

#### LREP20-A03 静止係数の随伴
- Level: A
- ID: LREP20-A03

$m=1$ で $u=(0,1,0,i)^{\mathsf T}$、$v=(0,1,0,-i)^{\mathsf T}$ とする。随伴と四つの収縮 $\bar uu,\bar uv,\bar vu,\bar vv$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint) により $\bar u=(0,1,0,-i)$、$\bar v=(0,-1,0,-i)$ です。積を取ると

$$
\bar uu=1+(-i)i=2,\quad \bar uv=1+(-i)(-i)=0,
$$

$$
\bar vu=-1+(-i)i=0,\quad \bar vv=-1+(-i)(-i)=-2.
$$

両方の通常の長さの二乗は2であることも確認できます。
<!-- solution-end -->

<a id="ex-lrep20-a04"></a>

#### LREP20-A04 方向の反転
- Level: A
- ID: LREP20-A04

$m=0$、$k>0$、$\boldsymbol p=(0,0,-k)$ とする。左成分だけの正周波数係数の基底とhelicityを求めよ。

<!-- solution-start -->
**詳細解答。** $P=-k\sigma_3$ です。[質量零モードのchiralityとhelicity](#thm-lrep20-massless-helicity) の証明の条件は $Pa=ka$、$b=0$ なので $\sigma_3a=-a$、すなわち $a$ は $(0,1)^{\mathsf T}$ の定数倍です。四成分では $e_2$ が基底です。$h_{\boldsymbol p}=\operatorname{diag}(-1,1,-1,1)/2$ より固有値は $+1/2$ です。chiralityは $-1$ であり、向きを変えてもこの対応は保たれます。
<!-- solution-end -->

### Level B

<a id="ex-lrep20-b01"></a>

#### LREP20-B01 別方向へのboost
- Level: B
- ID: LREP20-B01

$m=3$、$\boldsymbol p=(4,0,0)$ とし、$\chi=(1,-1)^{\mathsf T}/\sqrt2$ から負周波数係数を作り、係数方程式と通常の規格化を検算せよ。

<!-- solution-start -->
**詳細解答。** $E=5$、$P=4\sigma_1$ なので $P\chi=-4\chi$ です。[正質量のDiracモードの構成](#prop-lrep20-boost-modes) の $A$ の固有値は $\sqrt{(5-4)/3}=1/\sqrt3$、逆行列の固有値は $\sqrt3$。従って

$$
v=\begin{pmatrix}\chi\\-3i\chi\end{pmatrix}.
$$

$K$ の上ブロックから $-i(5I+P)(-3i\chi)=-3\chi$、下ブロックから $i(5I-P)\chi=9i\chi$ です。従って $Kv=-3v$ となります。通常の内積は $v^\dagger v=(1+9)\chi^\dagger\chi=10=2E$ です。
<!-- solution-end -->

<a id="ex-lrep20-b02"></a>

#### LREP20-B02 スピン和と核
- Level: B
- ID: LREP20-B02

$m>0$ とする。$K^2=m^2I_4$ を用いて $R_\pm=(I_4\pm K/m)/2$ が射影であることと、$R_+$ が正周波数係数、$R_-$ が負周波数係数の空間への射影であることを示せ。スピン和で表せ。

<!-- solution-start -->
**詳細解答。** 第1節のブロック積では $(EI+P)(EI-P)=m^2I$ であるため、$K^2=m^2I_4$。よって

$$
R_\pm^2=\tfrac14(I_4\pm2K/m+K^2/m^2)=R_\pm,
$$

$$
KR_\pm=\tfrac12(K\pm mI_4)=\pm mR_\pm.
$$

従って像は対応する核に含まれます。$Kw=\pm mw$ の列について $R_\pm w=w$ なので逆の包含も成立します。[規格化とスピン和](#thm-lrep20-spin-sums) により

$$
R_+=\frac{\sum_su_s\bar u_s}{2m},
\qquad R_-=-\frac{\sum_sv_s\bar v_s}{2m}.
$$

$R_\pm$ は一般には通常の内積に関する直交射影ではありません。$K$ の上下非対角ブロックは $\boldsymbol p\ne0$ なら互いの共役転置にならないからです。
<!-- solution-end -->

<a id="ex-lrep20-b03"></a>

#### LREP20-B03 固定Fourier波数の初期値
- Level: B
- ID: LREP20-B03

$m=4$、$\boldsymbol p=(0,0,3)$ とし、初期列 $w_0=e_1$ から時間発展する $\psi(t,\boldsymbol x)=e^{i3z}w(t)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $E=5$、$T e_1=3e_1+4ie_3$ です。[固定Fourier波数でのエネルギー射影](#prop-lrep20-energy-projectors) より

$$
\Pi_+e_1=\tfrac45e_1+\tfrac25ie_3,\quad
\Pi_-e_1=\tfrac15e_1-\tfrac25ie_3.
$$

それぞれ固有値 $5,-5$ なので

$$
w(t)=e^{-5it}(\tfrac45e_1+\tfrac25ie_3)
+e^{5it}(\tfrac15e_1-\tfrac25ie_3).
$$

二つの定数列をそれぞれ $a_+,a_-$ と書きます。$Ta_\pm=\pm5a_\pm$ なので

$$
i\frac{dw}{dt}=5e^{-5it}a_+-5e^{5it}a_-=Tw(t).
$$

$t=0$ で和は $e_1$ です。元の場では空間指数を固定して $\partial_t\psi=e^{i3z}dw/dt$ と偏微分します。二項は直交し、それぞれの長さの二乗は $16/25+4/25=4/5$ と $1/25+4/25=1/5$。全密度は1のままです。
<!-- solution-end -->

<a id="ex-lrep20-b04"></a>

#### LREP20-B04 電荷共役で周波数が変わる
- Level: B
- ID: LREP20-B04

$m=0$、$\boldsymbol p=(0,0,k)$、$k>0$ で $\psi=e_1 e^{-ikt+ikz}$ とする。電荷共役された解の係数・chirality・二通りの運動方向に対するhelicityを求めよ。

<!-- solution-start -->
**詳細解答。** [電荷共役](../LREP18/index.md#def-lrep18-charge-conjugation) の行列 $B$ を掛けると、$-J(1,0)^{\mathsf T}=(0,1)^{\mathsf T}$ なので $Be_1=e_4$ です。

指数は共役で $e^{ikt-ikz}$ となります。$P=k\sigma_3$ なので右成分は $Pb=-kb$ を満たし、[質量零モードの係数条件](#thm-lrep20-massless-helicity) を満たします。

[chirality演算子](../LREP16/index.md#def-lrep16-chirality) は $e_4$ に固有値 $+1$ を与えます。[helicity演算子](../LREP16/index.md#def-lrep16-helicity) を掛けると

$$
h_{\boldsymbol p}e_4=-e_4/2,\qquad
h_{-\boldsymbol p}e_4=e_4/2.
$$

後者が負周波数の空間Fourier波数に沿う演算子です。
<!-- solution-end -->

### Level C

<a id="ex-lrep20-c01"></a>

#### LREP20-C01 質量零極限と完全性
- Level: C
- ID: LREP20-C01

$k>0$ を固定し、次の運動量と二成分基底を取る。

$$
\boldsymbol p=(0,0,k),\qquad
\chi_+=(1,0)^{\mathsf T},\quad\chi_-=(0,1)^{\mathsf T}.
$$

$m>0$ の第4節の $u_\tau,v_\tau$ に対して次を求めよ。

1. 各係数 $w$ の規格化したchiralityの二次形式 $w^\dagger\gamma^5w/(w^\dagger w)$。
2. $m\to0+$ の四列の極限。
3. スピン和の極限と核の次元。正質量の完全性をそのまま使えない理由も述べよ。

<!-- solution-start -->
**詳細解答。** (1) 上下の長さの二乗は $E+\tau k,E-\tau k$ です。[chirality演算子](../LREP16/index.md#def-lrep16-chirality) は上を負、下を正とするので、両周波数の規格化した二次形式は

$$
\frac{-(E+\tau k)+(E-\tau k)}{2E}=-\frac{\tau k}{E}.
$$

$m>0$ なら絶対値は1未満です。

(2) $m\to0+$ では $E\to k$。平方根の連続性から、$\tau=+1$ では下成分が零となり

$$
u_+,v_+\longrightarrow\sqrt{2k}e_1.
$$

$\tau=-1$ では上成分が零となり

$$
u_-\longrightarrow i\sqrt{2k}e_4,\qquad
v_-\longrightarrow-i\sqrt{2k}e_4.
$$

四列の極限は二次元しか張りません。

(3) [規格化とスピン和](#thm-lrep20-spin-sums) から両スピン和の極限は $K_0$（$m=0$ の $K$）です。実際 $EI+P\to\operatorname{diag}(2k,0)$、$EI-P\to\operatorname{diag}(0,2k)$ なので

$$
K_0=\begin{pmatrix}
0&0&-2ik&0\\
0&0&0&0\\
0&0&0&0\\
0&2ik&0&0
\end{pmatrix}.
$$

非零の列は第2、第3列で互いに独立なので階数は2、核は $e_1,e_4$ の張る空間です。これは [質量零モードのchiralityとhelicity](#thm-lrep20-massless-helicity) と一致します。

$K_0^2=0$ であり、正質量では異なっていた $+m,-m$ の固有値が合流します。完全性の分子は

$$
\sum_s(u_s\bar u_s-v_s\bar v_s)=2mI_4
$$

なので零に収束し、$m=0$ を代入して割ることはできません。

一方、固定Fourier波数では $T=\operatorname{diag}(k\sigma_3,-k\sigma_3)$ に収束し、その固有値は $+k,-k$ のまま分離しているので、[エネルギー射影の式](#prop-lrep20-energy-projectors) は $m=0,k>0$ でも有効です。
<!-- solution-end -->

## 7. まとめ

- 平面波の指数を微分すると、Dirac方程式が二つの四次行列の核を求める問題になる。
- 正質量では静止系の二組の基底をboostして任意の運動量の係数が得られる。
- スピン和は基底に依存せず、質量正の場合は随伴による完全性を与える。
- 質量零では左右成分が分離し、chiralityとhelicityが結び付く。周波数・運動量ラベル・Fourier波数を区別する。

次は時空の平行移動とLorentz変換を一つの群にまとめ、正エネルギーの粒子状態がどう変換されるかを調べます。
