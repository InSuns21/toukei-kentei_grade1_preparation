# QFT36 電弱混合・W／Z／光子の質量と荷電・中性電流

[QFT35の表現と積群共変微分](../QFT35/index.md#def-qft35-product-derivative)からは、色・弱・超電荷のゲージ場にどのように物質場が結合するかが分かりました。しかしそのままでは、弱ゲージ場のどの組合せが重い $W,Z$ となり、どれが無質量の光子として残るかは分かりません。必要なのは、**Higgs真空に共変微分を作用させ、その二乗から質量を読み取る**計算です。

本講では、電弱部分 $SU(2)_L\times U(1)_Y$ を取り出し、質量行列を導出して直交変換で対角化します。さらに、同じ変換をフェルミオン相互作用へ適用して、光子・$Z$・$W^\pm$ の結合を一つの規約で導きます。色の $SU(3)_c$ はHiggsに作用しないので、この計算によってグルーオンは質量を得ません。

時空は $3+1$ 次元Minkowski空間、計量は $\eta=\operatorname{diag}(-1,1,1,1)$、単位は $\hbar=c=1$ とします。[QFT35の電荷規約](../QFT35/index.md#def-qft35-hypercharge)を用い、弱生成子と共変微分を

$$
T^I=\frac{\sigma^I}{2},\qquad Q=T^3+Y,\qquad
D_\mu=\partial_\mu-igW_\mu^IT^I-ig'YB_\mu
$$

とします。結合 $g,g'$ は正、ゲージポテンシャル $W_\mu^I,B_\mu$ は実場です。[QFT35の共変微分の記法](../QFT35/index.md#def-qft35-product-derivative)と同じく、$\partial_\mu=\partial/\partial x^\mu$ は時空座標による偏微分、$I=1,2,3$ は弱生成子の添字で、反復する $I$ は和を取ります。

上下に反復するLorentz添字 $\mu=0,1,2,3$ は計量 $\eta$ で縮約します。例えば $(W^I)^2$ は $W_\mu^I W^{I\mu}$ の略記であり、二重項の $\dagger$ は内部複素成分のHermitian共役です。計量 $(-+++)$ ではスカラー場の正準運動項を $-(D_\mu H)^\dagger D^\mu H$、フェルミオンの正準運動項を $\bar\psi\gamma^\mu D_\mu\psi$ とします。$\gamma^\mu$ とDirac随伴は[QFT7の規約](../QFT7/index.md#def-qft7-adjoint-action)に従います。古典的に滑らかな場、境界項が消える条件、正準規格化したゲージ運動項を仮定し、**木レベル**だけを扱います。

## 1. 二重項の真空が決める質量項

Higgs二重項 $H=(H^+,H^0)^T$ は $(\mathbf1,\mathbf2)_{1/2}$ に属します。$SU(2)$ の二つの成分を等価に扱う真空から一方向を選んだ代表として、[QFT35で確かめた中性の真空方向](../QFT35/index.md#prop-qft35-doublet-charges)を使います。局所的なゲージ選択で

$$
H_0=\frac1{\sqrt2}\binom0v,\qquad v>0
$$

とします。例えば $V(H)=-\mu^2H^\dagger H+\lambda(H^\dagger H)^2$（$\mu^2,\lambda>0$）なら、$H^\dagger H=v^2/2$ で極小となる条件は $v^2=\mu^2/\lambda$ です。これはゲージ不変なノルムを固定した代表であり、局所ゲージ冗長性そのものが物理的対称性として破れたという主張ではありません。[QFT34のAbelian Higgs模型](../QFT34/index.md#def-qft34-abelian-higgs)と同様、質量は正準運動項 $-(D_\mu H)^\dagger D^\mu H$ の二次項に現れます。負号は時間微分のエネルギーを正に保つために必要で、質量二乗行列の固有値は正のままです。

二重項の内部基底 $e_1=(1,0)^T,e_2=(0,1)^T$ で、[基本表現の生成子](../QFT35/index.md#def-qft35-product-derivative)を具体的に表示すると

$$
\sigma^1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma^2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma^3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

$T^I=\sigma^I/2$、超電荷は両成分に同じ $Y_H I_2=I_2/2$ を作用させます。これらを $H_0=(v/\sqrt2)e_2$ に掛けると

$$
\begin{aligned}
T^1H_0&=\frac{v}{2\sqrt2}\binom10,&
T^2H_0&=\frac{v}{2\sqrt2}\binom{-i}0,\\
T^3H_0&=-\frac{v}{2\sqrt2}\binom01,&
YH_0&=\frac{v}{2\sqrt2}\binom01.
\end{aligned}
$$

上成分では $W^1,W^2$、下成分では $W^3,B$ が組になり、二乗の際にそれぞれの**複素絶対値**を取ります。これを明示することが、係数2を落とさない近道です。

<a id="thm-qft36-mass-matrix"></a>

<!-- formal-statement-start -->
> **定理（Higgs真空からの電弱ゲージ場質量行列）**
> $SU(2)_L\times U(1)_Y$ の結合 $g,g'>0$、基本生成子 $T^I=\sigma^I/2$、超電荷 $Y_H=1/2$ の複素二重項 $H$ に対し、真空代表 $H_0=(0,v/\sqrt2)^T$、$v>0$ を選ぶ。正準運動項 $-(D_\mu H)^\dagger D^\mu H$ のゲージ場に関する二次項は

$$
\mathcal L_{\mathrm{mass}}
=-\frac{v^2}{8}\Big[g^2\big(W_\mu^1W^{1\mu}+W_\mu^2W^{2\mu}\big)
+(gW_\mu^3-g'B_\mu)(gW^{3\mu}-g'B^\mu)\Big].
$$

> 中性基底 $(W_\mu^3,B_\mu)$ で $\mathcal L_{\mathrm{mass,neutral}}=-\frac12(W_\mu^3,B_\mu)M_0^2(W^{3\mu},B^\mu)^T$ と書くと

$$
M_0^2=\frac{v^2}{4}
\begin{pmatrix}g^2&-gg'\\-gg'&g'^2\end{pmatrix}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二重項の上・下成分へ別々に行列を作用させます。上下が直交するため混合しませんが、下成分内では二つのゲージ場が干渉し、負の非対角要素が残ります。

<!-- proof-start -->
### 証明

定数 $H_0$ は $\partial_\mu H_0=0$ なので、[積群共変微分の定義](../QFT35/index.md#def-qft35-product-derivative)へ前述の四つの行列作用を代入すると

$$
D_\mu H_0
=-\frac{iv}{2\sqrt2}
\binom{g(W_\mu^1-iW_\mu^2)}{-gW_\mu^3+g'B_\mu}.
$$

各 $W_\mu^I$ と $B_\mu$ は実場です。固定したLorentz添字について

$$
|W_\mu^1-iW_\mu^2|^2
=(W_\mu^1)^2+(W_\mu^2)^2
$$

となり、上・下成分のHermitian内積に交差項はありません。したがって

$$
-(D_\mu H_0)^\dagger D^\mu H_0
=-\frac{v^2}{8}
\left[g^2(W_\mu^1W^{1\mu}+W_\mu^2W^{2\mu})
+(gW_\mu^3-g'B_\mu)(gW^{3\mu}-g'B^\mu)\right].
$$

中性部分の角括弧を展開すると $g^2(W^3)^2-2gg'W^3B+g'^2B^2$ です。実ベクトルの質量二次形式の標準形にある係数 $-1/2$ を取り出すので、正の質量二乗行列の共通係数は $v^2/4$ となります。
<!-- proof-end -->

例えば $W_\mu^3=B_\mu$、$g=g'$ なら中性項は消えます。逆に $W_\mu^3=-B_\mu$ なら同じ結合 $g$ で中性項は $v^2g^2(W_\mu^3)^2/2$ です。質量の有無は「どの場が存在するか」ではなく、**その線形結合が真空を動かすか**に依存します。

## 2. 荷電場と中性場をどう取り直すか

最初の二つの実場は複素共役な組にまとめると荷電状態を表します。中性の二つは $M_0^2$ の固有方向へ回転します。$g,g'>0$ なので角 $\theta_W$ を $0<\theta_W<\pi/2$ に一意に選べます。これは**電弱混合角**です。

<a id="def-qft36-mixing"></a>

<!-- formal-statement-start -->
> **定義（電弱混合角と質量固有場）**
> $g,g'>0$ とし、$\tan\theta_W=g'/g$、$0<\theta_W<\pi/2$ を満たす角を電弱混合角とする。$s_W=\sin\theta_W$、$c_W=\cos\theta_W$ と書く。実ゲージ場 $W_\mu^{1,2,3},B_\mu$ から

$$
\begin{aligned}
W_\mu^\pm&=\frac{W_\mu^1\mp iW_\mu^2}{\sqrt2},\\
\binom{Z_\mu}{A_\mu}
&=\begin{pmatrix}c_W&-s_W\\s_W&c_W\end{pmatrix}
\binom{W_\mu^3}{B_\mu},\\
s_W&=\frac{g'}{\sqrt{g^2+g'^2}},\qquad
c_W=\frac{g}{\sqrt{g^2+g'^2}}
\end{aligned}
$$

> と定義する。$A_\mu$ は光子、$Z_\mu$ は中性重ゲージ場、$W_\mu^\pm$ は互いに複素共役な荷電ゲージ場を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft36-mixing -->
### 例：等しい結合では45度回転

**定義の確認**：$g'=g>0$ のとき $s_W=c_W=1/\sqrt2$、$\theta_W=\pi/4$ であり、

$$
A_\mu=\frac{W_\mu^3+B_\mu}{\sqrt2},\qquad
Z_\mu=\frac{W_\mu^3-B_\mu}{\sqrt2}.
$$

この場合の $R=2^{-1/2}\begin{pmatrix}1&-1\\1&1\end{pmatrix}$ は、中性場の係数ベクトル $(W^3,B)^T$ を $(Z,A)^T$ に写す直交回転です。行の内積から $RR^T=I_2$、また $\det R=(1+1)/2=1$ なので二つの中性場の独立性と規格化を保ちます。さらに前節の[質量二次形式](#thm-qft36-mass-matrix)をこの基底へ移すと

$$
RM_0^2R^T=\frac{v^2g^2}{4}
\begin{pmatrix}2&0\\0&0\end{pmatrix}
$$

となり、$Z$ 方向が正の質量、$A$ 方向が質量零であることも確かめられます。荷電場は実場の定義から $W^-=(W^+)^*$ であり、$W^1,W^2$ の実二自由度を複素二自由度として重複計数しません。
<!-- definition-example-end -->

「荷電」の符号も確かめておきます。弱二重項の上・下成分を移す昇降生成子を、先ほどの $2\times2$ 行列から

$$
T^+=T^1+iT^2=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
T^-=T^1-iT^2=\begin{pmatrix}0&0\\1&0\end{pmatrix}
$$

と定義します。これに対応するゲージ接続の荷電部分は

$$
W_\mu^1T^1+W_\mu^2T^2
=\frac1{\sqrt2}(W_\mu^+T^++W_\mu^-T^-)
$$

です。[QFT35の電荷演算子](../QFT35/index.md#def-qft35-hypercharge) $Q=T^3+Y$ は $QH_0=(-1/2+1/2)H_0=0$ なので真空を固定します。$Y$ は弱生成子と交換し、上の行列を左右から掛けると $T^3T^\pm-T^\pm T^3=\pm T^\pm$ です。従って定数パラメータ $\alpha$ の残存変換は

$$
e^{i\alpha Q}T^\pm e^{-i\alpha Q}=e^{\pm i\alpha}T^\pm.
$$

ゲージ接続がこの随伴作用で変換されるため、$W^+T^+$、$W^-T^-$ の係数は順に $e^{+i\alpha}$、$e^{-i\alpha}$ 倍となります。従って $W^\pm$ の電磁電荷は確かに $\pm1$ です。これは零でない真空を固定した残存変換に関する主張で、任意のゲージ変換に対し場そのものが不変だという意味ではありません。

対角化を行う前に、光子候補の方向 $(g',g)$ が質量行列の零方向か、もう一方 $(g,-g')$ が正方向かを確かめます。

<a id="thm-qft36-neutral-spectrum"></a>

<!-- formal-statement-start -->
> **定理（中性質量行列の対角化と無質量光子）**
> [質量行列](#thm-qft36-mass-matrix)の仮定 $v,g,g'>0$ の下、[電弱混合角と質量固有場](#def-qft36-mixing)の変換で質量項は

$$
\mathcal L_{\mathrm{mass}}
=-m_W^2 W_\mu^+W^{-\mu}
-\frac12m_Z^2Z_\mu Z^\mu,
$$

> となり、木レベル質量は

$$
m_W^2=\frac{g^2v^2}{4},\qquad
m_Z^2=\frac{(g^2+g'^2)v^2}{4},\qquad
m_A^2=0.
$$

> 正準規格化されたゲージ場運動項の自由二次部分もこの直交変換で正準形を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

荷電部分の二つの実二次項を $2W^+W^-$ に変えます。中性部分は零固有ベクトルと正固有ベクトルを規格化し、どちらも元の質量行列へ代入して検算します。運動項は直交変換で不変です。

<!-- proof-start -->
### 証明

$W^+=(W^1-iW^2)/\sqrt2$、$W^-=(W^1+iW^2)/\sqrt2$ だから

$$
W_\mu^+W^{-\mu}
=\frac12\left(W_\mu^1W^{1\mu}+W_\mu^2W^{2\mu}\right).
$$

よって[二次質量項](#thm-qft36-mass-matrix)の荷電部分は $-g^2v^2W^+W^-/4$ です。中性行列を $M_0^2=v^2K/4$ と書くと

$$
K\binom{g'}g=\binom{g^2g'-gg'g}{-gg'g'+g'^2g}=\binom00,
$$

$$
K\binom g{-g'}
=\binom{g(g^2+g'^2)}{-g'(g^2+g'^2)}
=(g^2+g'^2)\binom g{-g'}.
$$

二本は直交し、長さはともに $\sqrt{g^2+g'^2}$ です。[混合角の定義](#def-qft36-mixing)によって規格化した固有ベクトルを並べると

$$
R=\begin{pmatrix}c_W&-s_W\\s_W&c_W\end{pmatrix},
\qquad
RM_0^2R^T
=\begin{pmatrix}v^2(g^2+g'^2)/4&0\\0&0\end{pmatrix}.
$$

ここでは $(Z,A)=R(W^3,B)$ の順にしたので、正固有値が左上です。実中性場の自由二次運動項は

$$
-\frac14\left[
(\partial_\mu W_\nu^3-\partial_\nu W_\mu^3)^2
+(\partial_\mu B_\nu-\partial_\nu B_\mu)^2\right].
$$

$R$ が位置に依存しない直交行列なので、同じ式は $Z,A$ のそれぞれのMaxwell型運動項へ移り、交差項は残りません。非可換場の三点・四点自己相互作用はこの**自由二次項**には入りません。
<!-- proof-end -->

なぜ光子が質量零なのかも、行列の偶然ではありません。[QFT35の電荷演算子](../QFT35/index.md#def-qft35-hypercharge)では、Higgs下成分に $T^3=-1/2$、$Y=1/2$ が作用するため $QH_0=0$ です。したがって残る局所 $U(1)_{\mathrm{em}}$ の方向に作用するゲージ場の線形結合は質量を得ません。逆に、真空が中性でない模型や追加スカラーの表現・真空を変えた模型では、同じ質量比を無条件に使えません。

## 3. 光子はなぜ電荷 $Q$ に結合するか

場の質量を対角化しただけでは、その場がどの物質粒子と相互作用するかは決まりません。[QFT35の場の表現一覧](../QFT35/index.md#def-qft35-representation)に戻り、$W^3,B$ を今の $Z,A$ に置き換えます。逆変換は

$$
W_\mu^3=c_WZ_\mu+s_WA_\mu,\qquad
B_\mu=-s_WZ_\mu+c_WA_\mu.
$$

光子の前に立つ係数は二通りの成分を持ちますが、それらは同じ定数になります。

$$
gs_W=g'c_W
=\frac{gg'}{\sqrt{g^2+g'^2}}
\equiv e>0.
$$

この $e$ が正の素電荷の大きさです。中性場・荷電場と物質電流の結合を、最初に規約として固定します。荷電部分には前節で行列表示を確認した $T^\pm=T^1\pm iT^2$ を用います。

<a id="def-qft36-currents"></a>

<!-- formal-statement-start -->
> **定義（電弱電流の結合規約）**
> $SU(2)_L$ 表現と超電荷 $Y$ を持つフェルミオン場 $\psi$ に対し、内部生成子 $T^I$ と $Q=T^3+Y$ を作用させる。$g,g'>0$、[混合角](#def-qft36-mixing)、$e=gs_W=g'c_W$ の下で、質量固有場との相互作用に現れる荷電演算子と中性演算子を

$$
\begin{aligned}
G_A&=eQ,\\
G_Z&=\frac{g}{c_W}(T^3-s_W^2Q),\\
G_+&=\frac{g}{\sqrt2}T^+,\qquad
G_-=\frac{g}{\sqrt2}T^-
\end{aligned}
$$

> とする。基本弱二重項では $T^\pm$ は上下成分を互いに移す。弱一重項では $T^3=T^\pm=0$ とする。[QFT7のDirac電流](../QFT7/index.md#thm-qft7-current)に合わせ、物理的なゲージ電流は $-i\bar\psi\gamma^\mu G_X\psi$ としてこれらの演算子を挟んで定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft36-currents -->
### 例：右巻き電子は荷電電流を持たない

**定義の確認**：[QFT35の表現ラベル](../QFT35/index.md#def-qft35-representation)で $e_R$ は $(\mathbf1,\mathbf1)_{-1}$ です。弱一重項なので $T^3=T^\pm=0$、$Q=-1$。従って

$$
G_A(e_R)=-e,\qquad
G_Z(e_R)=\frac{g}{c_W}s_W^2,\qquad
G_+(e_R)=G_-(e_R)=0.
$$

光子結合は左右で同じ電荷を読み、荷電弱相互作用には右巻き一重項が参加しないことを、定義の各代入条件から確かめました。
<!-- definition-example-end -->

<a id="thm-qft36-fermion-couplings"></a>

<!-- formal-statement-start -->
> **定理（電弱質量固有場のフェルミオン結合）**
> 滑らかなフェルミオン場 $\psi$ が標準模型のユニタリ内部表現 $(R_3,R_2)_Y$ に属し、$D_\mu=\partial_\mu-igW_\mu^IT^I-ig'YB_\mu$ とする。[QFT7の随伴と作用](../QFT7/index.md#def-qft7-adjoint-action)によるスピノル運動項 $\overline\psi\gamma^\mu D_\mu\psi$ の電弱ゲージ相互作用は

$$
\begin{aligned}
\mathcal L_{\mathrm{int,EW}}
=-i\overline\psi\gamma^\mu\bigg[
&eQ A_\mu
+\frac{g}{c_W}(T^3-s_W^2Q)Z_\mu\\
&+\frac{g}{\sqrt2}(T^+W_\mu^++T^-W_\mu^-)
\bigg]\psi.
\end{aligned}
$$

> と書ける。とくに標準模型の弱二重項 $(f_u,f_d)^T_L$ には荷電電流 $-ig(\overline f_{uL}\gamma^\mu f_{dL}W_\mu^++\overline f_{dL}\gamma^\mu f_{uL}W_\mu^-)/\sqrt2$ があり、弱一重項にはない。色の $SU(3)$ 作用はここでは別項として保つ。
<!-- formal-statement-end -->

### 証明の見取り図

中性相互作用を $Z,A$ へ回転し、$e=gs_W=g'c_W$ と $Y=Q-T^3$ を使います。荷電相互作用では、$W^1T^1+W^2T^2$ を昇降演算子と複素場の積に書き直します。

<!-- proof-start -->
### 証明

[積群共変微分](../QFT35/index.md#def-qft35-product-derivative)の符号により、$\gamma^\mu D_\mu$ からゲージ結合には $-i\gamma^\mu(gW_\mu^IT^I+g'YB_\mu)$ が現れます。$(-+++)$ の[実電流の定義](../QFT7/index.md#thm-qft7-current)と同じ $-i$ が必須で、これは電荷 $eQ$ の符号を反転する操作ではありません。中性部分の括弧内へ上記逆変換を代入すると

$$
\begin{aligned}
gT^3W^3+g'YB
&=(gs_WT^3+g'c_WY)A\\
&\quad +(gc_WT^3-g's_WY)Z\\
&=e(T^3+Y)A+\frac{g}{c_W}(c_W^2T^3-s_W^2Y)Z\\
&=eQA+\frac{g}{c_W}(T^3-s_W^2Q)Z.
\end{aligned}
$$

最後の二行目では $g's_W=(g/c_W)s_W^2$ と $gc_W=(g/c_W)c_W^2$ を用い、三行目では $c_W^2+s_W^2=1$ を用いました。荷電部分は

$$
\begin{aligned}
T^1W^1+T^2W^2
&=\frac12\big[(T^1+iT^2)(W^1-iW^2)\\
&\qquad +(T^1-iT^2)(W^1+iW^2)\big]\\
&=\frac1{\sqrt2}(T^+W^++T^-W^-).
\end{aligned}
$$

基本弱二重項では $T^+f_L=(f_{dL},0)^T$、$T^-f_L=(0,f_{uL})^T$ です。$\overline f_L$ で挟むと主張の二項を得ます。一重項ではすべての $T^I$ が零なので荷電項が消えます。
<!-- proof-end -->

たとえば左レプトン二重項 $(\nu_L,e_L)^T$ では $Q=(0,-1)$、$T^3=(1/2,-1/2)$ なので

| 場 | $Q$ | $T^3$ | $Z$ の係数を $g/c_W$ で割った値 |
| --- | ---: | ---: | --- |
| $\nu_L$ | $0$ | $1/2$ | $1/2$ |
| $e_L$ | $-1$ | $-1/2$ | $-1/2+s_W^2$ |
| $e_R$ | $-1$ | $0$ | $s_W^2$ |
| $u_L$ | $2/3$ | $1/2$ | $1/2-(2/3)s_W^2$ |
| $d_L$ | $-1/3$ | $-1/2$ | $-1/2+(1/3)s_W^2$ |

光子は左右どちらの同じ電荷成分にも $eQ$ で結合する一方、$Z$ は $T^3$ も見るため左右で異なります。標準模型には三世代がありますが、この段階では世代間混合行列を挿入していません。世代のYukawa質量対角化と混合は次の問いです。

## 4. 木レベルの質量比、Higgs結合、自由度

中性質量が $m_Z$、荷電質量が $m_W$ と決まったので、両者は独立に設定できません。さらに、ゲージを局所的に選んで $H=(0,(v+h)/\sqrt2)^T$ としたとき、$h$ は動径の実スカラー揺らぎであり、同じ式の $v$ が $v+h$ に置き換わります。

<a id="prop-qft36-tree-relations"></a>

<!-- formal-statement-start -->
> **命題（木レベル質量比とHiggs結合）**
> $SU(2)_L$ の超電荷 $1/2$ の複素Higgs二重項が $H=(0,(v+h)/\sqrt2)^T$、$v>0$ の局所ゲージ表示を持ち、正準運動項 $-(D_\mu H)^\dagger D^\mu H$ を採用する木レベルの標準模型では、

$$
\frac{m_W}{m_Z}=c_W,\qquad
\rho_{\mathrm{tree}}:=\frac{m_W^2}{m_Z^2c_W^2}=1.
$$

> また、$h$ の非微分相互作用は

$$
\mathcal L_{\mathrm{vector,scalar}}
=-m_W^2\left(1+\frac hv\right)^2W_\mu^+W^{-\mu}
-\frac12m_Z^2\left(1+\frac hv\right)^2Z_\mu Z^\mu.
$$
<!-- formal-statement-end -->

### 証明の見取り図

質量の比は二つの固有値を割り、混合角の定義に戻ります。$h$ との結合は質量を与えた二乗を $(v+h)^2$ にしただけなので、同じ係数で連動します。

<!-- proof-start -->
### 証明

[木レベルの質量固有値](#thm-qft36-neutral-spectrum)を用いると

$$
\frac{m_W^2}{m_Z^2}
=\frac{g^2v^2/4}{(g^2+g'^2)v^2/4}
=\frac{g^2}{g^2+g'^2}=c_W^2.
$$

質量を正の平方根に選んで $m_W/m_Z=c_W$ を得ます。また $H$ の定数下成分 $v/\sqrt2$ を $(v+h)/\sqrt2$ へ置けば、ゲージ場と $h$ の微分を含まない部分に限り

$$
-(D_\mu H)^\dagger D^\mu H\supset
-\frac{(v+h)^2}{8}\big[g^2\{(W^1)^2+(W^2)^2\}
+(gW^3-g'B)^2\big].
$$

前二節と同じ対角化を行うと主張の式となります。展開すれば、$hW^+W^-$ のラグランジアン係数は $-2m_W^2/v$、$hZZ$ の係数は $-m_Z^2/v$ です。二つの同種 $Z$ を含む頂点規則を読む際にはさらに組合せ係数が付くため、ラグランジアン係数と頂点因子を混同しません。
<!-- proof-end -->

この比 $\rho=1$ は**一つのHiggs二重項と木レベル**という条件付きです。追加の高次 $SU(2)$ 表現を持つスカラー真空や量子補正があれば変わり得ます。「光子が無質量」という残存ゲージ対称性の議論と、「$m_W/m_Z=c_W$」という特定の場の内容に依存する関係は、同じ強さの主張ではありません。

最後に物理自由度を数えます。Higgs二重項は実成分4個、質量零の電弱ゲージ場4本は各2偏極で計8個、合計12個です。真空の局所表示で3個の角度方向をゲージ場の縦偏極として扱うと、重い $W^+,W^-,Z$ はそれぞれ3偏極で計9、光子2、動径Higgs1で再び12となります。[QFT34のProca偏極の導出](../QFT34/index.md#thm-qft34-massive-polarizations)と対応します。これは摂動的な物理偏極の計数であり、任意の場配置で一つのユニタリゲージが大域的に滑らかに取れることや、量子論の全Hilbert空間を構成したことを意味しません。

## 5. 演習：真空から測定可能な結合へ

### 演習 QFT36-A1：質量行列の非対角成分

- Level: A
- 問題：$g,g',v>0$ の下で $H_0=(0,v/\sqrt2)^T$、$Y_H=1/2$ とする。$D_\mu H_0$ の下成分を導き、$W_\mu^3B^\mu$ のラグランジアン係数を求めよ。

<!-- solution-start -->
**詳細解答**：[Higgsに作用する生成子](#thm-qft36-mass-matrix)で $T^3H_0=(0,-v/(2\sqrt2))^T$、$Y_HH_0=(0,v/(2\sqrt2))^T$ です。従って下成分は $-iv(-gW^3+g'B)/(2\sqrt2)$ です。正準運動項にはそのHermitian縮約の**負号**が付くので、ラグランジアンの交差項は

$$
-\frac{v^2}{8}(-2gg'W_\mu^3B^\mu)
=+\frac{v^2gg'}4W_\mu^3B^\mu.
$$

よってラグランジアンの交差項係数は $+v^2gg'/4$。質量二乗行列の非対角要素は $-v^2gg'/4$ であり、二次形式の全体の $-1/2$ と二つの交差項を掛けると $+v^2gg'/4$ に戻ります。
<!-- solution-end -->

### 演習 QFT36-A2：荷電場の規格化

- Level: A
- 問題：実場 $W^1,W^2$ に対し $W^\pm=(W^1\mp iW^2)/\sqrt2$ とする。$(W^1)^2+(W^2)^2$ を $W^+W^-$ で表し、$\mathcal L=-(g^2v^2/8)[(W^1)^2+(W^2)^2]$ から質量二乗を求めよ。Lorentz添字は共通に縮約する。

<!-- solution-start -->
**詳細解答**：実場の積は交換するので

$$
W^+W^-=\frac12(W^1-iW^2)(W^1+iW^2)
=\frac12[(W^1)^2+(W^2)^2].
$$

従って $\mathcal L=-(g^2v^2/4)W^+W^-$ となり、計量 $(-+++)$ における複素ベクトルの質量項 $-m_W^2W^+W^-$ と比較して $m_W^2=g^2v^2/4$ です。実場二本の二次項の係数 $1/2$ を、複素場の質量項へもう一度付けてはいけません。
<!-- solution-end -->

### 演習 QFT36-A3：零固有値の判定

- Level: A
- 問題：$g,g'>0$ とし、次の実対称行列 $K$ の行列式、跡、零固有ベクトルを求め、零固有ベクトルを規格化せよ。

$$
K=\begin{pmatrix}g^2&-gg'\\-gg'&g'^2\end{pmatrix}.
$$

<!-- solution-start -->
**詳細解答**：行列式は $g^2g'^2-(-gg')^2=0$、跡は $g^2+g'^2>0$。したがって固有値は $0$ と $g^2+g'^2$ です。$K(x,y)^T=0$ の第1行は $g^2x=gg'y$、すなわち $gx=g'y$。例えば $(x,y)=(g',g)$ と置けば第2行も $-gg'g'+g'^2g=0$。長さは $\sqrt{g^2+g'^2}$ なので

$$
u_A=\frac1{\sqrt{g^2+g'^2}}\binom{g'}g
$$

が単位零固有ベクトルです。
<!-- solution-end -->

### 演習 QFT36-A4：光子結合の一致

- Level: A
- 問題：$\tan\theta_W=g'/g$、$g,g'>0$ とする。$e=gs_W=g'c_W$ を確かめ、$T^3=1/2,Y=1/6$ を持つ左上型クォークの光子結合係数を求めよ。

<!-- solution-start -->
**詳細解答**：角は第1象限なので $s_W=g'/\sqrt{g^2+g'^2}$、$c_W=g/\sqrt{g^2+g'^2}$。従って両積は $gg'/\sqrt{g^2+g'^2}$ です。[電荷演算子](../QFT35/index.md#def-qft35-hypercharge)から $Q=1/2+1/6=2/3$。光子係数は

$$
gs_WT^3+g'c_WY=e\left(\frac12+\frac16\right)=\frac{2e}{3}.
$$
<!-- solution-end -->

### 演習 QFT36-A5：右巻き電子の $Z$ 結合

- Level: A
- 問題：弱一重項 $e_R$ の超電荷が $Y=-1$ のとき、$Q$、$Z$ の結合係数、$W^\pm$ の結合係数を求めよ。

<!-- solution-start -->
**詳細解答**：一重項なので $T^3=T^\pm=0$。[QFT35の電荷規約](../QFT35/index.md#def-qft35-hypercharge)で $Q=Y=-1$ です。[電流の定義](#def-qft36-currents)を適用して

$$
G_Z=\frac{g}{c_W}(0-s_W^2(-1))=\frac{gs_W^2}{c_W},
\qquad G_\pm=0.
$$

荷電相互作用は左二重項の昇降作用が必要なため、一重項にはありません。
<!-- solution-end -->

### 演習 QFT36-B1：正準運動項と直交回転

- Level: B
- 問題：自由二次の中性ゲージ運動項を $-\frac14(F_{W^3,\mu\nu}F_{W^3}^{\mu\nu}+F_{B,\mu\nu}F_B^{\mu\nu})$ とする。次の定数直交行列 $R$ で $(Z,A)^T=R(W^3,B)^T$ としたとき、交差運動項が消えることを展開で確認し、$R$ が非直交なら何が起きるか答えよ。

$$
R=\begin{pmatrix}c_W&-s_W\\s_W&c_W\end{pmatrix},
\qquad c_W^2+s_W^2=1.
$$

<!-- solution-start -->
**詳細解答**：線形な自由場強度は $F_Z=c_WF_{W^3}-s_WF_B$、$F_A=s_WF_{W^3}+c_WF_B$。従って

$$
\begin{aligned}
F_Z^2+F_A^2
&=(c_W^2+s_W^2)F_{W^3}^2+(s_W^2+c_W^2)F_B^2\\
&\quad +(-2c_Ws_W+2s_Wc_W)F_{W^3}F_B\\
&=F_{W^3}^2+F_B^2.
\end{aligned}
$$

$R^TR\ne I$ なら一般に $R$ で逆変換した運動項へ非対角係数や非単位の対角係数が残ります。質量行列を対角化するだけで正準規格化も保証されるわけではありません。
<!-- solution-end -->

### 演習 QFT36-B2：左右の中性電流

- Level: B
- 問題：$e_L$ は $T^3=-1/2,Y=-1/2$、$e_R$ は $T^3=0,Y=-1$ とする。光子と $Z$ の結合係数をそれぞれ求め、左右の差を計算せよ。$0<s_W^2<1$ とする。

<!-- solution-start -->
**詳細解答**：両方とも $Q=T^3+Y=-1$ であり、光子結合は $G_A=-e$ です。[中性電流規約](#def-qft36-currents)では

$$
G_Z(e_L)=\frac{g}{c_W}\left(-\frac12+s_W^2\right),\qquad
G_Z(e_R)=\frac{g}{c_W}s_W^2.
$$

差は

$$
G_Z(e_L)-G_Z(e_R)=-\frac{g}{2c_W}.
$$

$Z$ には左カイラル成分だけの $T^3$ が加わるため差が生じます。これは $s_W$ の特定数値によらず非零です。
<!-- solution-end -->

### 演習 QFT36-B3：真空中性条件を変えたら

- Level: B
- 問題：一つの複素弱二重項の下成分だけが非零の真空を持つが、その二重項の超電荷を任意の実数 $y$ とする。ここでは生成子の局所的な作用だけを考え、$U(1)$ を一周する変換で位相が元に戻るという大域条件は課さない。中性二次質量項と零固有方向を求めよ。$y=0$ の場合も考え、標準模型の $Q=T^3+Y$ が無条件に残るか判定せよ。

<!-- solution-start -->
**詳細解答**：下成分への作用は $T^3=-1/2$、$Y=y$ です。従って共変微分の下成分は $-iv(-gW^3/2+g'yB)/\sqrt2$、その二乗は

$$
\mathcal L_{\mathrm{neutral}}=-\frac{v^2}{8}(gW^3-2g'yB)^2.
$$

質量行列は

$$
M_y^2=\frac{v^2}{4}\begin{pmatrix}g^2&-2gg'y\\-2gg'y&4g'^2y^2\end{pmatrix}.
$$

行列の零固有方向は $(2g'y,g)$ です。$y=0$ なら $(0,g)$、すなわち純粋な $B$ です。$y\ne0$ では残る生成子は

$$
Q_y=T^3+\frac{1}{2y}Y
$$

となり、$y=1/2$ のときに限り標準模型の $Q=T^3+Y$ と同じ正規化になります。$y=0$ では下成分の $T^3=-1/2$ を超電荷で打ち消せず、残るのは $Y$ の $U(1)$ 作用です。零固有値の存在と電磁電荷の具体的な同定は区別が必要です。
<!-- solution-end -->

### 演習 QFT36-B4：動径Higgsの三点結合

- Level: B
- 問題：$H=(0,(v+h)/\sqrt2)^T$ とする。ゲージ場二本と $h$ 一本を含むラグランジアン項の係数、およびゲージ場二本と $h$ 二本を含む項の係数を $m_W,m_Z,v$ で表せ。$Z$ が実場、$W^-=(W^+)^*$ である点に注意せよ。

<!-- solution-start -->
**詳細解答**：[木レベルHiggs結合](#prop-qft36-tree-relations)の $(1+h/v)^2=1+2h/v+h^2/v^2$ を展開します。$W$ 項では

$$
\mathcal L\supset -\frac{2m_W^2}{v}hW^+W^--\frac{m_W^2}{v^2}h^2W^+W^-.
$$

$Z$ 項は最初に $1/2$ があるので

$$
\mathcal L\supset -\frac{m_Z^2}{v}hZ^2-\frac{m_Z^2}{2v^2}h^2Z^2.
$$

これはラグランジアンに書いた係数です。対称な外線の交換数を数えて頂点規則に直す操作は別であり、二本の $Z$ による階乗をこの時点で再度割りません。
<!-- solution-end -->

### 演習 QFT36-C1：電弱模型を真空から再構成する

- Level: C
- 問題：$SU(2)_L\times U(1)_Y$ の結合 $g,g'>0$、二重項 $H$ の超電荷 $1/2$、真空 $H_0=(0,v/\sqrt2)^T$、$v>0$、左レプトン二重項 $L_L=(\nu_L,e_L)^T$ の超電荷 $-1/2$、右電子 $e_R$ の超電荷 $-1$ とする。ゲージ運動項は正準規格化済みとする。次を一続きで導け。
  1. $H_0$ の共変微分と $W^\pm$、$(W^3,B)$ の質量項。
  2. 規格化された $A,Z$、三種類のゲージ場の質量、$m_W^2/(m_Z^2c_W^2)$。
  3. $\nu_L,e_L,e_R$ の $A,Z$ 結合係数と $\overline\nu_L\gamma^\mu e_LW_\mu^+$ の係数。
  4. 真空前後の電弱ゲージ場とHiggsの摂動的自由度総数。量子補正についてこの計算だけでは断定できないことを一つ述べよ。

<!-- solution-start -->
**詳細解答**：まず [Higgs共変微分](../QFT35/index.md#def-qft35-product-derivative)の基本表現を、指定された $H_0$ に作用させます。行列の上下成分を計算すると

$$
\begin{aligned}
T^1H_0&=\frac{v}{2\sqrt2}\binom10,&
T^2H_0&=\frac{v}{2\sqrt2}\binom{-i}0,\\
T^3H_0&=-\frac{v}{2\sqrt2}\binom01,&
YH_0&=\frac{v}{2\sqrt2}\binom01.
\end{aligned}
$$

従って

$$
D_\mu H_0=-\frac{iv}{2\sqrt2}
\binom{g(W_\mu^1-iW_\mu^2)}{-gW_\mu^3+g'B_\mu}.
$$

Hermitianノルムと $W^\pm=(W^1\mp iW^2)/\sqrt2$ から

$$
\mathcal L_{\mathrm{mass}}
=-\frac{g^2v^2}{4}W_\mu^+W^{-\mu}
-\frac{v^2}{8}(gW_\mu^3-g'B_\mu)^2.
$$

中性質量行列は

$$
M_0^2=\frac{v^2}{4}
\begin{pmatrix}g^2&-gg'\\-gg'&g'^2\end{pmatrix}
$$

です。この行列は行列式零、跡 $v^2(g^2+g'^2)/4$ です。括弧内の行列を $K$ とおくと、各行への代入により

$$
K\binom{g'}g=\binom00,\qquad
K\binom g{-g'}=(g^2+g'^2)\binom g{-g'}
$$

を得ます。二本は直交し、ともに長さ $\sqrt{g^2+g'^2}$ なので、規格化固有ベクトルは $(g',g)/\sqrt{g^2+g'^2}$ と $(g,-g')/\sqrt{g^2+g'^2}$ です。よって

$$
\begin{aligned}
A_\mu&=s_WW_\mu^3+c_WB_\mu,&
Z_\mu&=c_WW_\mu^3-s_WB_\mu,\\
m_A^2&=0,&m_Z^2&=\frac{v^2(g^2+g'^2)}4,&
m_W^2&=\frac{g^2v^2}4.
\end{aligned}
$$

$c_W^2=g^2/(g^2+g'^2)$ なので比 $m_W^2/(m_Z^2c_W^2)=1$ です。次に逆変換 $W^3=c_WZ+s_WA$、$B=-s_WZ+c_WA$ をフェルミオン運動項へ代入します。$e=gs_W=g'c_W$ と $Q=T^3+Y$ より [質量固有場の結合](#thm-qft36-fermion-couplings)は $G_A=eQ$、$G_Z=(g/c_W)(T^3-s_W^2Q)$、$G_+=gT^+/\sqrt2$ となります。

レプトンを順に代入すると

| 場 | $T^3$ | $Q$ | $G_A$ | $G_Z$ |
| --- | ---: | ---: | ---: | --- |
| $\nu_L$ | $1/2$ | $0$ | $0$ | $g/(2c_W)$ |
| $e_L$ | $-1/2$ | $-1$ | $-e$ | $(g/c_W)(-1/2+s_W^2)$ |
| $e_R$ | $0$ | $-1$ | $-e$ | $gs_W^2/c_W$ |

$T^+$ の行列要素 $(T^+)_{12}=1$ から、レプトン荷電電流の係数は

$$
-\frac{ig}{\sqrt2}\overline\nu_L\gamma^\mu e_LW_\mu^+
$$

です。係数にある $-i$ は[Dirac随伴の規約](../QFT7/index.md#def-qft7-adjoint-action)から生じ、物理的な電荷や結合の大きさを変えません。最後に真空前は無質量ゲージ場4本×2と複素Higgs二重項4実成分で $8+4=12$。真空後は重いゲージ場3本×3、光子2、動径Higgs1で $9+2+1=12$。これは物理偏極の摂動的計数です。量子補正による質量・混合角の定義方式や $\rho$ の補正量は、この木レベル計算だけでは決まりません。
<!-- solution-end -->

## 6. まとめと次の問い

Higgs二重項の共変微分を真空で二乗すると、荷電方向には $m_W=gv/2$、中性方向には階数1の質量行列が現れます。これを直交対角化することで、重い $Z$ と質量零の光子が得られます。全物質場への光子結合が $eQ$ になるのは、混合角の条件 $gs_W=g'c_W$ と同じ電荷演算子 $Q=T^3+Y$ が両方を整合させるためです。

一方、Higgs二重項とフェルミオンのYukawa結合から実際の質量をどう読み、三世代の回転がなぜ荷電電流に混合行列を残すのかは、さらに別の計算を必要とします。次はその世代構造に進みます。
