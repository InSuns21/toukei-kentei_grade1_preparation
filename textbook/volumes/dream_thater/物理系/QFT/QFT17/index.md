# QFT17 Dirac場の最小結合・QED頂点と電子–ミューオン散乱

[QFT7のDirac場](../QFT7/index.md#def-qft7-adjoint-action)は自由フェルミオンの運動を表し、[QFT16の光子伝播関数](../QFT16/index.md#def-qft16-photon-propagator)は電磁場の内部線を与えました。両者を単に掛けるだけでは、電荷が何を意味するか、頂点にどの符号が付くか、ゲージ固定パラメータが測定量から消えるかを判断できません。

中心問いは、**局所U(1)対称性を保って荷電Dirac場と光子を結合し、電子–ミューオンの木レベル散乱を断面積まで計算するには？** です。まず共変微分の位相を検算し、相互作用の係数から頂点規則を作ります。次に質量殻のDirac方程式で外線電流の横性を証明し、スピン平均を四本のgamma行列の跡へ変換して、最後に位相空間と接続します。

以下は $3+1$ 次元Minkowski時空、$\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$、Heaviside–Lorentz単位系です。座標を $x^\mu=(t,\boldsymbol x)$ とし、Lorentz添字 $\mu=0,1,2,3$ は上下に一度ずつ現れるとき総和します。微分・内積・スラッシュ記法の対応は

$$
\partial_\mu=\frac{\partial}{\partial x^\mu},\qquad
p\cdot x=p_\mu x^\mu,\qquad
p^2=p\cdot p,\qquad
\not p=\gamma^\mu p_\mu
$$

です。$\partial_\mu$ は**他の座標を固定した偏微分**で、添字の上下は $\eta$ によります。$\gamma^\mu$ は[Clifford関係](../QFT7/index.md#def-qft7-clifford)を満たし、$\bar\psi=\psi^\dagger\gamma^0$ は[Dirac随伴](../QFT7/index.md#def-qft7-adjoint-action)です。

$A_\mu$ は実四元ポテンシャル、$F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ とします。$q$ は**符号付きの電荷**で、電子とミューオンでは $q_e=q_\mu=-e$、$e>0$ です。従って式中の頂点係数を単に「$-ie$」と覚えるのは本章の規約とは違います。

古典的な変分はコンパクト台の滑らかな変分で行います。量子場の積・Dyson展開は自由場の分布をsmearingし、有限次数の摂動係数として理解します。無限次元の相互作用理論や長距離QEDの厳密な漸近状態をこの計算だけで構成したとは主張しません。散乱振幅への同定は[QFT11の漸近状態の条件](../QFT11/index.md#def-qft11-asymptotic-s)の下で行い、まず転送運動量 $t<0$ に限定します。

## 1. 局所位相を微分すると余計な項が生じる

自由Dirac作用の偏微分に、位置ごとに異なる位相を持つ $\psi'(x)=e^{-iq\chi(x)}\psi(x)$ を代入すると

$$
\partial_\mu\psi'
=e^{-iq\chi}\left(\partial_\mu\psi-iq(\partial_\mu\chi)\psi\right)
$$

です。ここでプライム $'$ は**変換後の場**を表し、時間導関数ではありません。積の微分では

$$
\partial_\mu(e^{-iq\chi})=-iq(\partial_\mu\chi)e^{-iq\chi}
$$

を使いました。この第二項を打ち消すため、[QFT15のポテンシャルのゲージ変換](../QFT15/index.md#def-qft15-gauge)と微分を一緒に変えることにします。

$$
A'_\mu=A_\mu+\partial_\mu\chi
$$

位相の符号は電荷 $q$ の符号を含めて決める必要があります。

<a id="def-qft17-covariant-derivative"></a>

<!-- formal-statement-start -->
> **定義（電荷付きDirac場のU(1)共変微分）**  
> 開領域 $\Omega\subset\mathbb R^{1,3}$、実定数 $q$、実数値 $C^1$ ポテンシャル $A_\mu$、複素四成分 $C^1$ スピノル $\psi$ に対して

$$
D_\mu\psi=(\partial_\mu+iqA_\mu)\psi
$$

> と定める。実数値 $C^2$ 関数 $\chi$ による局所変換は

$$
\psi'=e^{-iq\chi}\psi,\qquad
\bar\psi'=e^{iq\chi}\bar\psi,\qquad
A'_\mu=A_\mu+\partial_\mu\chi
$$

> とする。$q=0$ では $D_\mu=\partial_\mu$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft17-covariant-derivative -->
### 例：純ゲージ背景での直接検算

**定義の確認**：共変微分が局所位相と両立することを手で確かめます。

$A_\mu=0$、$\psi=u e^{-ip\cdot x}$（固定四成分 $u$）、$\chi(x)=\alpha x^0$ とします。$\alpha\in\mathbb R$ は定数です。$A'_0=\alpha$、$A'_j=0$、$\psi'=e^{-iq\alpha t}u e^{-ip\cdot x}$ となり、

$$
\begin{aligned}
D'_0\psi'
&=(\partial_0+iq\alpha)\psi'\\
&=(-i p_0-iq\alpha+iq\alpha)\psi'\\
&=e^{-iq\alpha t}\partial_0\psi.
\end{aligned}
$$

空間成分でも $\partial_j\chi=0$ なので $D'_j\psi'=e^{-iq\chi}\partial_j\psi$ です。**位相、四元ポテンシャル、四成分すべての共変微分**を同じ定義で確認しました。$\chi$ を変えるだけで $\psi$ を変えなければ、この相殺は起きません。
<!-- definition-example-end -->

## 2. 最小結合した作用と保存電流

電荷が違う二種類の場も同じ光子へ結合できます。ここでは一種類の場で作用を定め、散乱では電子とミューオンの二つを足します。Dirac場のGrassmann符号を保つため、変分では $\psi$ と $\bar\psi$ を独立な場として扱います。

<a id="def-qft17-qed-action"></a>

<!-- formal-statement-start -->
> **定義（最小結合Dirac–Maxwell作用）**  
> 有界開領域 $\Omega$、$m>0$、符号付き電荷 $q\in\mathbb R$、十分滑らかな $A,\psi,\bar\psi$ に対し、共変微分を用いた作用を

$$
S_{\rm QED}[A,\psi,\bar\psi]
=\int_\Omega\left[-\frac14F_{\mu\nu}F^{\mu\nu}
+\bar\psi(i\gamma^\mu D_\mu-m)\psi\right]d^4x
$$

> と定める。$D_\mu=\partial_\mu+iqA_\mu$ を展開すると、自由Dirac部分に加わる相互作用密度は

$$
\mathcal L_{\rm int}=-q\,\bar\psi\gamma^\mu\psi A_\mu.
$$

> 二種類の異なる場では二つのDirac項（質量 $m,M$ と電荷 $q_e,q_\mu$）を加算し、Maxwell項は一つだけ置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft17-qed-action -->
### 例：静止している荷電スピノルの電流

**定義の確認**：相互作用項の係数と符号を特定の外線で確認します。

$p=(m,\boldsymbol0)$、[QFT7の平面波スピノル](../QFT7/index.md#def-qft7-plane-waves)と[規格化](../QFT7/index.md#thm-qft7-spin-sums)を使います。静止系では $E=m$、$\boldsymbol\sigma\cdot\boldsymbol p=0$ なので、正規化した二成分スピノル $\chi_s$ に対して

$$
u_s(p)=\sqrt{2m}\begin{pmatrix}\chi_s\\0\end{pmatrix},\qquad
\chi_s^\dagger\chi_s=1.
$$

Dirac表示では $\gamma^0=\operatorname{diag}(I_2,-I_2)$、$\gamma^0\gamma^j$（$j=1,2,3$）は上下の二成分を入れ替える非対角ブロック行列です。よって

$$
\bar u_s\gamma^0u_s=u_s^\dagger u_s=2m,
\qquad
\bar u_s\gamma^ju_s=u_s^\dagger\gamma^0\gamma^ju_s=0.
$$

このように四元電流の時間成分と三つの空間成分をそれぞれ確かめました。定数ポテンシャル $A_\mu=(V,0,0,0)$ では一粒子の古典的な双線形に対応する相互作用密度の係数は $-2mqV$ です。電子 $q=-e$ の場合には $+2meV$ となります。これは符号付き電荷と作用にあるマイナスが別物であることの確認です。

ここでは平面波を有限体積に制限した局所的な密度を計算したのであり、無限時空で作用が有限という主張ではありません。
<!-- definition-example-end -->

<a id="thm-qft17-u1-invariance"></a>

<!-- formal-statement-start -->
> **定理（最小結合の局所U(1)不変性）**  
> [共変微分](#def-qft17-covariant-derivative)と[最小結合作用](#def-qft17-qed-action)の正則性の下で、任意の実数値 $C^2$ 関数 $\chi$ に対する局所変換は

$$
D'_\mu\psi'=e^{-iq\chi}D_\mu\psi,\qquad
F'_{\mu\nu}=F_{\mu\nu}
$$

> を満たし、作用は次の意味で不変である。

$$
S_{\rm QED}[A',\psi',\bar\psi']=S_{\rm QED}[A,\psi,\bar\psi].
$$

> 二種類の電荷が異なる場合も、各場にそれぞれの位相を用いれば成立する。
<!-- formal-statement-end -->

### 証明の見取り図

微分した位相からの $-iq\partial_\mu\chi$ と、ポテンシャルの変化からの $+iq\partial_\mu\chi$ が相殺します。反対称微分では $\partial_\mu\partial_\nu\chi$ の対称性で消えます。

<!-- proof-start -->
### 証明

[共変微分の定義](#def-qft17-covariant-derivative)を代入すると

$$
\begin{aligned}
D'_\mu\psi'
&=(\partial_\mu+iqA_\mu+iq\partial_\mu\chi)
(e^{-iq\chi}\psi)\\
&=e^{-iq\chi}\bigl(
\partial_\mu\psi-iq(\partial_\mu\chi)\psi
+iqA_\mu\psi+iq(\partial_\mu\chi)\psi\bigr)\\
&=e^{-iq\chi}D_\mu\psi.
\end{aligned}
$$

第一行の微分作用先は括弧全体です。一方、$F'_{\mu\nu}-F_{\mu\nu}=\partial_\mu\partial_\nu\chi-\partial_\nu\partial_\mu\chi=0$。Dirac項では左から掛かる $\bar\psi'=e^{iq\chi}\bar\psi$ が位相を相殺し、質量項も $\bar\psi'\psi'=\bar\psi\psi$ です。したがって作用密度が点ごとに不変であり積分も不変です。場ごとに同じ計算を行えば二種類でも成立します。
<!-- proof-end -->

<a id="thm-qft17-eom-current"></a>

<!-- formal-statement-start -->
> **定理（結合Dirac方程式と保存電流）**  
> [最小結合作用](#def-qft17-qed-action)の停留点に対し、$\bar\psi$ 変分は

$$
(i\gamma^\mu\partial_\mu-q\gamma^\mu A_\mu-m)\psi=0
$$

> を与え、$\psi$ 変分に対応する随伴方程式と合わせて $j^\mu=q\bar\psi\gamma^\mu\psi$ は $\partial_\mu j^\mu=0$ を満たす。Maxwell方程式は

$$
\partial_\nu F^{\nu\mu}=j^\mu
$$

> となる。複数の荷電場では右辺は各 $q_a\bar\psi_a\gamma^\mu\psi_a$ の和である。
<!-- formal-statement-end -->

### 証明の見取り図

作用の $A$ に比例する項を展開してから変分します。電流保存には自由場の式をそのまま使わず、結合したDirac方程式とその随伴を一つずつ代入します。

<!-- proof-start -->
### 証明

$\bar\psi$ は微分されないので、その独立変分の係数は表示されたDirac方程式です。[QFT7のDirac随伴](../QFT7/index.md#def-qft7-adjoint-action)を用いて随伴方程式を取ると

$$
i(\partial_\mu\bar\psi)\gamma^\mu
+q\bar\psi\gamma^\mu A_\mu+m\bar\psi=0.
$$

前者を $\bar\psi$ から、後者を $\psi$ から掛けて並べれば

$$
\begin{aligned}
\bar\psi\gamma^\mu\partial_\mu\psi
&=-i\bigl(qA_\mu\bar\psi\gamma^\mu\psi+m\bar\psi\psi\bigr),\\
(\partial_\mu\bar\psi)\gamma^\mu\psi
&=+i\bigl(qA_\mu\bar\psi\gamma^\mu\psi+m\bar\psi\psi\bigr).
\end{aligned}
$$

よって二つを足した $\partial_\mu(\bar\psi\gamma^\mu\psi)$ は0です。$q$ は定数なので $\partial_\mu j^\mu=0$。また $A_\mu$ 変分では[Maxwell作用の第一変分](../QFT15/index.md#thm-qft15-euler-maxwell)から $\partial_\nu F^{\nu\mu}$ が、相互作用から $-q\bar\psi\gamma^\mu\psi$ が出ます。全てのコンパクト台変分の係数を0と置けば表示したMaxwell方程式です。
<!-- proof-end -->

この保存電流は初期値と方程式を満たす荷電場の結論です。任意の四元関数 $J^\mu$ を保存電流と呼べるわけではありません。以降の摂動計算では自由な外線スピノルの電流にこの機構が現れます。

## 3. 作用の三点項からQED頂点を得る

自由スピノルと光子の二点核は、[QFT8のDirac伝播関数](../QFT8/index.md#thm-qft8-propagator)と[QFT16の光子伝播関数](../QFT16/index.md#def-qft16-photon-propagator)です。相互作用を増やすには[QFT9のDyson級数](../QFT9/index.md#def-qft9-dyson)の各次数でこれらを収縮します。三点項の $1/3!$ はありません。$A,\psi,\bar\psi$ は互いに異なる役割を持つ因子だからです。

<a id="def-qft17-vertex"></a>

<!-- formal-statement-start -->
> **定義（QED三点頂点規則）**  
> 符号付き電荷 $q$ の相互作用 $\mathcal L_{\rm int}=-q\bar\psi\gamma^\mu\psi A_\mu$ を、$S=T\exp(i\int\mathcal L_{\rm int}\,d^4x)$ の形式的Dyson係数で展開する。光子添字を $\mu$、フェルミオン線の入射・出射スピノルを $u,\bar u$ とした一次の頂点因子を

$$
V^\mu=-iq\gamma^\mu
$$

> と定める。これは演算子 $\gamma^\mu$ を含む因子であり、スピノルで挟んだ電流 $(-iq)\bar u\gamma^\mu u$ と区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft17-vertex -->
### 例：二つの荷電種の頂点

**定義の確認**：各頂点の係数が定義の符号付き電荷に依存することを検算します。

電子・ミューオンがともに負電荷の場合、$q_e=q_\mu=-e$ です。この規約では各頂点は $-i(-e)\gamma^\mu=+ie\gamma^\mu$。電荷が逆の粒子種なら $q=+e$ で頂点は $-ie\gamma^\mu$ です。二つの頂点の積は

$$
(-iq_e)(-iq_\mu)=-q_eq_\mu.
$$

電荷を同じ符号にすると積の符号は負、反対符号なら正です。**一つの頂点の符号と二つの頂点の積**は別々に数える必要があります。
<!-- definition-example-end -->

## 4. 一光子交換と質量殻Ward恒等式

外線の電子とミューオンを識別できる二種類の場とし、入射を $p_1,p_2$、出射を $p_3,p_4$ とします。全外線は正エネルギー質量殻です。混同しやすい Mandelstam変数を散乱の前に固定します。

<a id="def-qft17-kinematics"></a>

<!-- formal-statement-start -->
> **定義（電子–ミューオン散乱の運動量と不変量）**  
> 電子の質量を $m>0$、ミューオンの質量を $M>0$ とする弾性過程

$$
e^-(p_1)+\mu^-(p_2)\longrightarrow e^-(p_3)+\mu^-(p_4)
$$

> について、$p_1+p_2=p_3+p_4$、$p_1^2=p_3^2=m^2$、$p_2^2=p_4^2=M^2$、$p_i^0>0$ とし、

$$
s=(p_1+p_2)^2,\quad
t=(p_3-p_1)^2,\quad
u=(p_4-p_1)^2,\quad
k=p_3-p_1=p_2-p_4
$$

> と置く。$s>(m+M)^2$ で真の散乱角 $0<\theta\le\pi$ を持つ重心系では $t<0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft17-kinematics -->
### 例：重心系での移行運動量

**定義の確認**：四元運動量の質量殻・保存則と不変量の条件を具体的な重心系で確認します。

$\boldsymbol p_1=p(0,0,1)$、$\boldsymbol p_3=p(\sin\theta,0,\cos\theta)$、$p>0$ とします。弾性散乱なので電子の前後のエネルギーは等しく、$k^0=0$ です。従って

$$
t=k^2=-|\boldsymbol p_3-\boldsymbol p_1|^2
=-2p^2(1-\cos\theta)<0
$$

です。また運動量保存を用いて展開すると

$$
s+t+u=2(m^2+M^2).
$$

この計算は[QFT12のMandelstam不変量](../QFT12/index.md#def-qft12-mandelstam)を異種質量へ具体化したものです。前方 $\theta=0$ だけは $t=0$ になるので、以下の $1/t$ の式から除外します。
<!-- definition-example-end -->

<a id="prop-qft17-tree-amplitude"></a>

<!-- formal-statement-start -->
> **命題（光子交換の木レベル不変振幅）**  
> 上の質量殻の異種フェルミオン散乱で、自由外線スピノルを[QFT7の規格化](../QFT7/index.md#thm-qft7-spin-sums)で取り、摂動的な漸近振幅を定義できると仮定する。$t<0$ の最低非零次数（$q_eq_\mu$ 次）の連結振幅はFeynmanゲージ $\xi=1$ で

$$
i\mathcal M
=\bigl[\bar u_e(p_3)(-iq_e\gamma^\mu)u_e(p_1)\bigr]
\frac{-i\eta_{\mu\nu}}{t+i0}
\bigl[\bar u_\mu(p_4)(-iq_\mu\gamma^\nu)u_\mu(p_2)\bigr],
$$

> すなわち

$$
\mathcal M=\frac{q_eq_\mu}{t}
\bigl[\bar u_e(p_3)\gamma^\mu u_e(p_1)\bigr]
\bigl[\bar u_\mu(p_4)\gamma_\mu u_\mu(p_2)\bigr].
$$

> 外線の各スピン添字は省略している。光子は仮想内部線であり、正エネルギー光子の外線状態ではない。
<!-- formal-statement-end -->

### 証明の見取り図

Dysonの二次項は $1/2!$ を持ちますが、電子頂点とミューオン頂点を二つの時空位置へ割り当てる方法が二通りあるため相殺します。各頂点の $-iq$ と光子の $-i$ を最後に掛けます。

<!-- proof-start -->
### 証明

[Dyson級数](../QFT9/index.md#def-qft9-dyson)の二次係数は

$$
\frac{i^2}{2!}\int d^4x\,d^4y\,
T\{\mathcal L_{\rm int}(x)\mathcal L_{\rm int}(y)\}.
$$

相互作用密度を電子成分 $\mathcal L_e$ とミューオン成分 $\mathcal L_\mu$ に分けると、異種種を一回ずつ挿入する項は $\mathcal L_e(x)\mathcal L_\mu(y)$ と $\mathcal L_\mu(x)\mathcal L_e(y)$ の二つです。積分変数を交換すると同じ寄与になるので $2/2!=1$。$A_\mu(x)A_\nu(y)$ を[光子Feynman二点核](../QFT16/index.md#prop-qft16-feynman-gauge)で収縮し、電子とミューオンの外線をそれぞれ対応する双線形へ結びます。

四元積分は運動量保存の $(2\pi)^4\delta^{(4)}(p_1+p_2-p_3-p_4)$ を与え、[QFT11の不変振幅の規約](../QFT11/index.md#def-qft11-lsz-amputation)ではそれを取り除いた係数が $i\mathcal M$ です。$t<0$ なので $1/(t+i0)=1/t$ と通常関数で評価できます。因子の積は

$$
(-iq_e)(-i)(-iq_\mu)
=i q_e q_\mu
$$

なので最終式に余計な $i$ や $1/2$ は付きません。同じ粒子の交換図ではなく異種粒子の一つの $t$ チャネルだけがこの次数に現れます。
<!-- proof-end -->

一般の共変ゲージでは光子核に $k_\mu k_\nu$ に比例する項が追加されます。これが消えるのは「ゲージ項だから」ではなく、外線が満たす式を使った結果です。

<a id="thm-qft17-ward"></a>

<!-- formal-statement-start -->
> **定理（質量殻電流の横性とゲージパラメータ非依存性）**  
> $p^2=p'^2=m^2$、$p^0,p'^0>0$ とし、自由Dirac方程式を満たす正エネルギースピノル $u(p),u(p')$ に対して $k=p'-p$、$J^\mu=\bar u(p')\gamma^\mu u(p)$ と置く。このとき

$$
k_\mu J^\mu=0.
$$

> よって電子とミューオンの外線がそれぞれ対応する質量殻条件を満たし、$t=k^2<0$ なら、[共変ゲージの光子伝播関数](../QFT16/index.md#def-qft16-photon-propagator)を用いた上の光子交換振幅は任意の $\xi>0$ に対して同じである。
<!-- formal-statement-end -->

### 証明の見取り図

外線が同じ質量であることが鍵です。$k_\mu\gamma^\mu=\not p'-\not p$ を二つのDirac方程式へ代入し、左右から挟まれた質量項を相殺します。縦の伝播核は両電流との縮約で消えます。

<!-- proof-start -->
### 証明

[QFT7の平面波Dirac方程式](../QFT7/index.md#def-qft7-plane-waves)は $(\not p-m)u(p)=0$、$\bar u(p')(\not p'-m)=0$ です。従って

$$
\begin{aligned}
k_\mu J^\mu
&=\bar u(p')(\not p'-\not p)u(p)\\
&=\bar u(p')\not p' u(p)-\bar u(p')\not p u(p)\\
&=m\bar u(p')u(p)-m\bar u(p')u(p)=0.
\end{aligned}
$$

ミューオンの電流は $J_\mu^\nu=\bar u_\mu(p_4)\gamma^\nu u_\mu(p_2)$、$k=p_2-p_4$ だから、同じ式を逆向きに適用して $k_\nu J_\mu^\nu=0$ です。[QFT16の一般共変ゲージ核](../QFT16/index.md#def-qft16-photon-propagator)と $\xi=1$ の差は $k_\mu k_\nu$ に比例するので、その電流間縮約は $(k\cdot J_e)(k\cdot J_\mu)=0$ です。$t<0$ では二重極の分布的問題もなく、全 $\xi>0$ で振幅が一致します。
<!-- proof-end -->

これは**外線上の木レベルWard恒等式**です。相互作用の全次数で成り立つWard–Takahashi恒等式や、ループを含むくりこみの議論とは区別します。外線を質量殻から外すと個別の電流は一般に横でなく、補償する他の図や接触項まで含めずに「ゲージ非依存」とは言えません。

## 5. スピンを平均し、断面積へ変換する

実験で入射粒子のスピンを指定しない場合は、電子とミューオンの入射スピンそれぞれ2通りを等確率に平均し、出射の2通りずつを全て足します。これは振幅を先に平均する操作ではありません。非偏極の確率を作るため、**振幅の絶対値二乗を作ってから和と平均を取る**のです。

計算には[QFT7のスピン完全性](../QFT7/index.md#thm-qft7-spin-sums)

$$
\sum_{r=1}^{2}u_r(p)\bar u_r(p)=\not p+mI_4
$$

を使います。$I_4$ は四次元単位行列で、以下のtrace内では $mI_4$ と $MI_4$ をそれぞれ $m,M$ と略記します。複素共役を取るときには $\gamma^0(\gamma^\mu)^\dagger\gamma^0=\gamma^\mu$ を用い、二つの電子電流の積を一つの行列の跡へまとめます。

<a id="thm-qft17-spin-average"></a>

<!-- formal-statement-start -->
> **定理（非偏極電子–ミューオン散乱のスピン平均）**  
> [光子交換の木レベル振幅](#prop-qft17-tree-amplitude)について、電子・ミューオンの入射スピンを各2通り等確率で平均し、出射スピンを総和する。$t<0$、$s>(m+M)^2$ とし、$S=m^2+M^2$ と置けば

$$
\overline{|\mathcal M|^2}
=\frac{2(q_eq_\mu)^2}{t^2}
\left[(s-S)^2+(u-S)^2+2St\right].
$$

> ここではツリーレベルの寄与だけを含み、相互作用の高次補正は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

二つのスピン和を別々のgamma行列traceにし、その後にLorentz添字を縮約します。二本のtraceそれぞれから4が出ますが、入射状態4通りの平均で $1/4$ を掛けます。$t$ に比例する項を落とすと質量依存の答えが誤ります。

<!-- proof-start -->
### 証明

電子電流を $E^\mu_{r_3r_1}=\bar u_{r_3}(p_3)\gamma^\mu u_{r_1}(p_1)$、ミューオン電流を $U_{\mu,r_4r_2}=\bar u_{r_4}(p_4)\gamma_\mu u_{r_2}(p_2)$ とします。[スピン和](../QFT7/index.md#thm-qft7-spin-sums)を一方の外線ずつ適用すると

$$
\begin{aligned}
\overline{|\mathcal M|^2}
&=\frac{(q_eq_\mu)^2}{4t^2}
T_e^{\mu\nu}T_{M,\mu\nu},\\
T_e^{\mu\nu}
&=\operatorname{tr}\left[
(\not p_3+m)\gamma^\mu(\not p_1+m)\gamma^\nu
\right],\\
T_{M,\mu\nu}
&=\operatorname{tr}\left[
(\not p_4+M)\gamma_\mu(\not p_2+M)\gamma_\nu
\right].
\end{aligned}
$$

一行目の $1/4$ は**入射電子2状態×入射ミューオン2状態**の平均です。ここから[Clifford関係](../QFT7/index.md#def-qft7-clifford)と跡の巡回性を使ってtraceを作ります。まず補助行列を

$$
G=i\gamma^0\gamma^1\gamma^2\gamma^3
$$

と置きます。反交換関係から $G^2=I_4$、$G\gamma^\alpha=-\gamma^\alpha G$ が成り立つので、gamma行列の奇数個の積 $X$ には

$$
\operatorname{tr}(X)
=\operatorname{tr}(GXG)
=-\operatorname{tr}(X)=0
$$

が成り立ちます（最初の等号は $G^2=I_4$ と跡の巡回性から）。二本の跡は反交換関係の跡を取って

$$
2\operatorname{tr}(\gamma^\alpha\gamma^\beta)
=2\eta^{\alpha\beta}\operatorname{tr}(I_4)
=8\eta^{\alpha\beta}
$$

とすると求まります。四本の跡については $T=\operatorname{tr}(\gamma^\alpha\gamma^\mu\gamma^\beta\gamma^\nu)$ と置き、左端の $\gamma^\alpha$ を右へ順に反交換すると

$$
\begin{aligned}
T&=2\eta^{\alpha\mu}\operatorname{tr}(\gamma^\beta\gamma^\nu)
-2\eta^{\alpha\beta}\operatorname{tr}(\gamma^\mu\gamma^\nu)\\
&\quad+2\eta^{\alpha\nu}\operatorname{tr}(\gamma^\mu\gamma^\beta)-T.
\end{aligned}
$$

最後の $-T$ は跡の巡回性によるものです。これらから

$$
\begin{aligned}
\operatorname{tr}(\gamma^\alpha\gamma^\beta)
&=4\eta^{\alpha\beta},\\
\operatorname{tr}(\gamma^\alpha\gamma^\mu\gamma^\beta\gamma^\nu)
&=4\left(
\eta^{\alpha\mu}\eta^{\beta\nu}
-\eta^{\alpha\beta}\eta^{\mu\nu}
+\eta^{\alpha\nu}\eta^{\mu\beta}\right).
\end{aligned}
$$

を得ます。特に四本の式の計量の積の符号は $+,-,+$ であり、第二項の符号を落とすと質量依存項まで誤ります。スピン和の積へ代入すると

$$
\begin{aligned}
T_e^{\mu\nu}
&=4\left[
p_3^\mu p_1^\nu+p_3^\nu p_1^\mu
-(p_3\cdot p_1-m^2)\eta^{\mu\nu}
\right],\\
T_{M,\mu\nu}
&=4\left[
p_{4\mu}p_{2\nu}+p_{4\nu}p_{2\mu}
-(p_4\cdot p_2-M^2)\eta_{\mu\nu}
\right].
\end{aligned}
$$

$a\cdot b$ をMinkowski内積とし、角括弧内のテンソルをそれぞれ $A^{\mu\nu}, B_{\mu\nu}$ と呼びます。質量殻と運動量保存から

$$
\begin{aligned}
p_1\cdot p_3&=m^2-\frac t2,\qquad
p_2\cdot p_4=M^2-\frac t2,\\
p_1\cdot p_2&=p_3\cdot p_4=\frac{s-S}{2},\\
p_1\cdot p_4&=p_2\cdot p_3=\frac{S-u}{2}.
\end{aligned}
$$

次に $A^{\mu\nu}B_{\mu\nu}$ を各項から展開します。$p_3\cdot p_1-m^2=p_4\cdot p_2-M^2=-t/2$ より、各角括弧の計量項は $+(t/2)\eta$ です。最初の四つの運動量積、計量との交差項、計量同士の項を分けると

$$
\begin{aligned}
A^{\mu\nu}B_{\mu\nu}
&=2\bigl[(p_3\cdot p_4)(p_1\cdot p_2)
+(p_3\cdot p_2)(p_1\cdot p_4)\bigr]\\
&\quad+t(p_3\cdot p_1+p_4\cdot p_2)+t^2\\
&=2\bigl[(p_3\cdot p_4)(p_1\cdot p_2)
+(p_3\cdot p_2)(p_1\cdot p_4)\bigr]+t(m^2+M^2)\\
&=\frac{(s-S)^2+(u-S)^2}{2}+St.
\end{aligned}
$$

となります。$T_eT_\mu=16 A B$ を最初の平均式へ戻すと

$$
\frac{(q_eq_\mu)^2}{4t^2}\cdot16
\left(\frac{(s-S)^2+(u-S)^2}{2}+St\right)
=\frac{2(q_eq_\mu)^2}{t^2}
\left[(s-S)^2+(u-S)^2+2St\right],
$$

という結論を得ます。
<!-- proof-end -->

**質量を無視できるエネルギー領域の検算**：$m,M\to0$ とすると $s+t+u=0$ で、同符号の電子・ミューオンなら

$$
\overline{|\mathcal M|^2}
\longrightarrow \frac{2e^4(s^2+u^2)}{t^2}.
$$

一方、$t<0$ の前方 $\theta\to0$ に近付くと $1/t^2$ が大きくなるため、全角度の積分には注意が必要です。

<a id="prop-qft17-cross-section"></a>

<!-- formal-statement-start -->
> **命題（重心系の微分断面積）**  
> 上の木レベル振幅について、初期状態を非偏極とし、二種類の終状態粒子を識別する。$s>(m+M)^2$、$0<\theta\le\pi$、$t<0$ の重心系で

$$
\begin{aligned}
\frac{d\sigma}{d\Omega}
&=\frac{\overline{|\mathcal M|^2}}{64\pi^2s},\\
\frac{d\sigma}{dt}
&=\frac{\overline{|\mathcal M|^2}}
{16\pi\,\lambda(s,m^2,M^2)},\\
\lambda(s,m^2,M^2)
&=[s-(m+M)^2][s-(m-M)^2].
\end{aligned}
$$

> $t=-2p_{\rm cm}^2(1-\cos\theta)$、$p_{\rm cm}^2=\lambda/(4s)$ である。これらは指定角での最低次数の微分断面積であり、$\theta=0$ を含む全断面積が有限という主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[QFT12の二体断面積](../QFT12/index.md#prop-qft12-cm-cross-section)は重心系の入射と出射の運動量の大きさの比を含みます。異種であっても**弾性**散乱なのでその比が1です。$t$ への変数変換では $dt/d\cos\theta=2p_{\rm cm}^2$ を使います。

<!-- proof-start -->
### 証明

[QFT12の重心系断面積の公式](../QFT12/index.md#prop-qft12-cm-cross-section)に、区別できる二粒子の終状態と $p_{\rm out}=p_{\rm in}=p_{\rm cm}$ を代入すると第一式です。同種終状態ではないので $1/2!$ は掛けません。[同章の重心運動量](../QFT12/index.md#prop-qft12-cm-momentum)より

$$
p_{\rm cm}^2=\frac{[s-(m+M)^2][s-(m-M)^2]}{4s}
=\frac{\lambda(s,m^2,M^2)}{4s}.
$$

方位角を積分した $d\Omega=2\pi\,d(\cos\theta)$ と、前節で求めた $t=-2p_{\rm cm}^2(1-\cos\theta)$ を用いれば

$$
\begin{aligned}
\frac{d\sigma}{dt}
&=\frac{d\sigma}{d\Omega}
\frac{2\pi}{dt/d(\cos\theta)}\\
&=\frac{\overline{|\mathcal M|^2}}{64\pi^2s}
\frac{2\pi}{2p_{\rm cm}^2}\\
&=\frac{\overline{|\mathcal M|^2}}{16\pi\lambda(s,m^2,M^2)}.
\end{aligned}
$$

これは $\lambda>0$、$p_{\rm cm}>0$ の範囲での変数変換です。$t=0$ の極は取り除いていません。
<!-- proof-end -->

**前方特異性の意味**：質量を有限のまま $\theta\to0$ とすると、$t\sim-p_{\rm cm}^2\theta^2$ であり、振幅二乗の最も強い項は $\theta^{-4}$ に比例します。角度分解能のある測定では下限角を設け、物質中では遮蔽が働きます。また相互作用QEDには軟光子放射と荷電粒子の長距離相互作用があり、有限次数の弾性散乱式から全S行列の存在や包摂観測量の有限性まで推論してはいけません。

## 6. 演習：ゲージ対称性から測定量まで

### 演習 QFT17-A1：純ゲージ背景の位相

- Level: A
- 問題：$q=-e$、$\chi(t,\boldsymbol x)=\alpha t+\beta x^1$、$A_\mu=0$、$\psi=u$（定数四成分）とする。変換後の $A'_\mu,\psi'$ を求め、$D'_0\psi'$ と $D'_1\psi'$ がともに0であることを直接計算せよ。

<!-- solution-start -->
**詳細解答**

[共変微分の定義](#def-qft17-covariant-derivative)で $-iq\chi=ie\chi$ です。したがって

$$
A'_\mu=(\alpha,\beta,0,0),\qquad
\psi'=e^{ie(\alpha t+\beta x^1)}u.
$$

時間微分と空間微分は $\partial_0\psi'=ie\alpha\psi'$、$\partial_1\psi'=ie\beta\psi'$。$iq=-ie$ なので

$$
D'_0\psi'=(ie\alpha-ie\alpha)\psi'=0,\qquad
D'_1\psi'=(ie\beta-ie\beta)\psi'=0.
$$

他の成分も0です。$A'$ だけを変えてスピノルの位相を固定すると相殺しません。
<!-- solution-end -->

### 演習 QFT17-A2：最小結合の符号

- Level: A
- 問題：$\mathcal L_D=\bar\psi(i\gamma^\mu D_\mu-m)\psi$ を展開し、(a) $q=-e$、(b) $q=+e$ それぞれで相互作用項と頂点 $V^\mu$ の係数を求めよ。$e>0$ とする。

<!-- solution-start -->
**詳細解答**

$i\gamma^\mu D_\mu=i\gamma^\mu\partial_\mu+i(iq)\gamma^\mu A_\mu=i\gamma^\mu\partial_\mu-q\gamma^\mu A_\mu$ です。従って $\mathcal L_{\rm int}=-q\bar\psi\gamma^\mu\psi A_\mu$。[頂点の定義](#def-qft17-vertex)から

$$
\begin{array}{c|c|c}
q & \mathcal L_{\rm int} & V^\mu\\ \hline
-e & +e\bar\psi\gamma^\mu\psi A_\mu & +ie\gamma^\mu\\
+e & -e\bar\psi\gamma^\mu\psi A_\mu & -ie\gamma^\mu
\end{array}
$$

です。$i^2=-1$ と、電荷自身のマイナスを別々に使っています。
<!-- solution-end -->

### 演習 QFT17-A3：質量殻電流の横性

- Level: A
- 問題：同じ質量 $m$ の正エネルギースピノル $u(p),u(p')$ に対して、$k=p'-p$ とする。$k_\mu\bar u(p')\gamma^\mu u(p)=0$ を、左右どちらにDirac方程式を使うか明示して証明せよ。

<!-- solution-start -->
**詳細解答**

[平面波Dirac方程式](../QFT7/index.md#def-qft7-plane-waves)は $\not p\,u(p)=m u(p)$、$\bar u(p')\not p'=m\bar u(p')$ です。よって

$$
\begin{aligned}
k_\mu\bar u(p')\gamma^\mu u(p)
&=\bar u(p')\not p' u(p)-\bar u(p')\not p u(p)\\
&=m\bar u(p')u(p)-m\bar u(p')u(p)=0.
\end{aligned}
$$

第一項は**左側の**随伴方程式、第二項は**右側の**方程式を使いました。両方が同じ質量であることが相殺条件です。
<!-- solution-end -->

### 演習 QFT17-A4：重心系の移行運動量

- Level: A
- 問題：重心系で $p_{\rm cm}=3$、散乱角 $\theta=\pi/3$ とする（自然単位系）。電子とミューオンが弾性散乱するとき $t$ と $dt/d(\cos\theta)$ を求めよ。質量の値を知る必要があるかも述べよ。

<!-- solution-start -->
**詳細解答**

[運動学の定義例](#def-qft17-kinematics)の弾性関係から $t=-2p_{\rm cm}^2(1-\cos\theta)$ です。$\cos(\pi/3)=1/2$ を代入すると

$$
t=-2\cdot9\left(1-\frac12\right)=-9,\qquad
\frac{dt}{d(\cos\theta)}=2p_{\rm cm}^2=18.
$$

$p_{\rm cm}$ を既知の数値として与えているため、個々の質量は必要ありません。質量は入射エネルギー $s$ から $p_{\rm cm}$ を決める際に必要です。
<!-- solution-end -->

### 演習 QFT17-A5：非偏極平均の分母

- Level: A
- 問題：入射の電子とミューオンが各2スピン状態、終状態も各2スピン状態を持つ。非偏極散乱のスピン和・平均で何通りを足し、どの数で割るか。振幅を先に平均してはいけない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

固定入射スピン $(r_1,r_2)$ について、出射 $(r_3,r_4)$ の4通りの**確率**を足します。入射は2×2=4通りが等確率なので

$$
\overline{|\mathcal M|^2}
=\frac14\sum_{r_1,r_2=1}^{2}
\sum_{r_3,r_4=1}^{2}|\mathcal M_{r_3r_4;r_1r_2}|^2.
$$

足す絶対値二乗は計16項、割るのは入射状態の4です。異なる入射状態は確率混合であるため、振幅を先に加えてから二乗すると存在しないスピン状態間の干渉項を作ってしまいます。
<!-- solution-end -->

### 演習 QFT17-B1：局所位相と保存電流をつなぐ

- Level: B
- 問題：電荷 $q$ のDirac場の $\mathcal L_D=\bar\psi(i\gamma^\mu D_\mu-m)\psi$ について、(a) 局所U(1)変換による不変性を示せ。(b) 結合Dirac方程式と随伴方程式から $\partial_\mu(q\bar\psi\gamma^\mu\psi)=0$ を導け。$\psi$ と $\bar\psi$ は独立変分可能な十分滑らかな場とする。

<!-- solution-start -->
**詳細解答**

(a) [共変微分](#def-qft17-covariant-derivative)を変換すると

$$
\begin{aligned}
D'_\mu\psi'
&=(\partial_\mu+iqA_\mu+iq\partial_\mu\chi)(e^{-iq\chi}\psi)\\
&=e^{-iq\chi}(\partial_\mu+iqA_\mu)\psi.
\end{aligned}
$$

従って $\bar\psi'i\gamma^\mu D'_\mu\psi'=\bar\psi i\gamma^\mu D_\mu\psi$、$\bar\psi'\psi'=\bar\psi\psi$ です。位相はスカラーなのでgamma行列と可換です。

(b) $\bar\psi$ 変分と $\psi$ 変分により

$$
\begin{aligned}
i\gamma^\mu\partial_\mu\psi&=(q\gamma^\mu A_\mu+m)\psi,\\
i(\partial_\mu\bar\psi)\gamma^\mu&=-\bar\psi(q\gamma^\mu A_\mu+m).
\end{aligned}
$$

第一式を左から $\bar\psi$、第二式を右から $\psi$ で掛けて足すと、$qA_\mu\bar\psi\gamma^\mu\psi$ と $m\bar\psi\psi$ がそれぞれ相殺し、

$$
i\bigl[(\partial_\mu\bar\psi)\gamma^\mu\psi+
\bar\psi\gamma^\mu(\partial_\mu\psi)\bigr]=0.
$$

括弧は $\partial_\mu(\bar\psi\gamma^\mu\psi)$ で、$q$ は定数なので求める保存則です。単に局所対称性を記しただけでなく、どの運動方程式を使うか確認しました。
<!-- solution-end -->

### 演習 QFT17-B2：二種類の場のDyson係数を数える

- Level: B
- 問題：二種類の相互作用密度 $\mathcal L_e=-q_e\bar\psi_e\gamma^\mu\psi_e A_\mu$、$\mathcal L_\mu=-q_\mu\bar\psi_\mu\gamma^\nu\psi_\mu A_\nu$ を用いる。$S^{(2)}=(i^2/2!)\int T\{(\mathcal L_e+\mathcal L_\mu)_x(\mathcal L_e+\mathcal L_\mu)_y\}\,d^4x\,d^4y$ において、一つずつ異種頂点を含む寄与の係数を整理し、Feynmanゲージの伝播核を挟んだ $i\mathcal M$ を求めよ。$t<0$、全外線は質量殻とする。

<!-- solution-start -->
**詳細解答**

二次項の括弧には $T\{\mathcal L_e(x)\mathcal L_\mu(y)\}$ と $T\{\mathcal L_\mu(x)\mathcal L_e(y)\}$ が各一つあります。二項目では $x\leftrightarrow y$ と変数を交換すると第一項に等しくなるので、合計の係数は

$$
\frac{i^2}{2!}\cdot2=i^2.
$$

つまり異種頂点に余分な $1/2$ は残りません。電子の外線から $E^\mu=\bar u_e(p_3)\gamma^\mu u_e(p_1)$、ミューオンの外線から $U^\nu=\bar u_\mu(p_4)\gamma^\nu u_\mu(p_2)$ が出ます。[QFT16のFeynmanゲージ核](../QFT16/index.md#prop-qft16-feynman-gauge)は $-i\eta_{\mu\nu}/(t+i0)$ です。頂点をそれぞれ $-iq_e$、$-iq_\mu$ とまとめれば

$$
i\mathcal M
=(-iq_e)E^\mu\frac{-i\eta_{\mu\nu}}{t+i0}(-iq_\mu)U^\nu
=i\frac{q_eq_\mu}{t}E^\mu U_\mu.
$$

$t<0$ なので $i0$ を消して通常の実分母として扱いました。$\mathcal M=(q_eq_\mu/t)E^\mu U_\mu$ であり、違う種なので交換による $u$ チャネルの木図はこの次数では生じません。
<!-- solution-end -->

### 演習 QFT17-B3：gamma行列の跡と運動学を接続する

- Level: B
- 問題：質量 $m$ の電子電流について、$\sum u(p)\bar u(p)=\not p+mI_4$ とClifford関係から、スピン和のテンソル $T_e^{\mu\nu}$ を求めよ。その結果を質量 $M$ のミューオンのテンソルと縮約し、$S=m^2+M^2$ として $(s-S)^2+(u-S)^2+2St$ が生じることを確かめよ。

<!-- solution-start -->
**詳細解答**

電子の電流と複素共役をスピンで和すると、[QFT7の完全性](../QFT7/index.md#thm-qft7-spin-sums)から

$$
T_e^{\mu\nu}
=\operatorname{tr}[(\not p_3+m)\gamma^\mu(\not p_1+m)\gamma^\nu].
$$

展開には4本のgammaの項、2本のgammaの項、3本のgammaの項が現れます。3本の跡は0です。[Clifford関係](../QFT7/index.md#def-qft7-clifford)と跡の巡回性より、4本の跡の計量縮約を計算すると

$$
\begin{aligned}
T_e^{\mu\nu}
&=4[p_3^\mu p_1^\nu+p_3^\nu p_1^\mu
-(p_3\cdot p_1)\eta^{\mu\nu}+m^2\eta^{\mu\nu}]\\
&=4[p_3^\mu p_1^\nu+p_3^\nu p_1^\mu+\tfrac t2\eta^{\mu\nu}],
\end{aligned}
$$

となります。最後は $p_3\cdot p_1=m^2-t/2$ を用いました。ミューオンも同様の展開を独立に行うと

$$
T_{M,\mu\nu}
=4[p_{4\mu}p_{2\nu}+p_{4\nu}p_{2\mu}
+\tfrac t2\eta_{\mu\nu}]
$$

です。よって16で割った積を展開すれば

$$
\begin{aligned}
\frac{T_e^{\mu\nu}T_{M,\mu\nu}}{16}
&=2[(p_3\cdot p_4)(p_1\cdot p_2)
+(p_3\cdot p_2)(p_1\cdot p_4)]\\
&\quad+t(p_1\cdot p_3+p_2\cdot p_4)+t^2\\
&=2\left[\left(\frac{s-S}{2}\right)^2+
\left(\frac{S-u}{2}\right)^2\right]+St.
\end{aligned}
$$

二行目では $p_1\cdot p_3+p_2\cdot p_4=S-t$ を使ったため、$t(S-t)+t^2=St$ です。最初の非偏極平均にはさらに $1/4$ を掛けるので、全係数は

$$
\frac14 T_e^{\mu\nu}T_{M,\mu\nu}
=2[(s-S)^2+(u-S)^2+2St].
$$

この式に $(q_eq_\mu)^2/t^2$ を掛ければ[スピン平均の定理](#thm-qft17-spin-average)に一致します。$2St$ は質量の効果であり落とせません。
<!-- solution-end -->

### 演習 QFT17-B4：断面積の係数と前方特異性

- Level: B
- 問題：$m,M>0$ の異種粒子弾性散乱で、$\lambda=[s-(m+M)^2][s-(m-M)^2]$、$p_{\rm cm}=\sqrt{\lambda}/(2\sqrt s)$ を用い、$d\sigma/d\Omega$ から $d\sigma/dt$ の係数 $1/(16\pi\lambda)$ を導け。さらに $0<\theta\ll1$ のとき全角度積分がなぜ発散するか説明せよ。

<!-- solution-start -->
**詳細解答**

[QFT12の二体断面積](../QFT12/index.md#prop-qft12-cm-cross-section)において弾性なら $p_{\rm f}/p_{\rm i}=1$ なので

$$
\frac{d\sigma}{d\Omega}=\frac{\overline{|\mathcal M|^2}}{64\pi^2s}.
$$

$t=-2p_{\rm cm}^2(1-\cos\theta)$ なので $dt/d(\cos\theta)=2p_{\rm cm}^2$、方位角を積分した立体角は $d\Omega=2\pi\,d(\cos\theta)$ です。よって

$$
\frac{d\sigma}{dt}
=\frac{\overline{|\mathcal M|^2}}{64\pi^2s}
\frac{\pi}{p_{\rm cm}^2}
=\frac{\overline{|\mathcal M|^2}}{16\pi\lambda}.
$$

前方の小角では $1-\cos\theta=\theta^2/2+O(\theta^4)$ なので $t=-p_{\rm cm}^2\theta^2+O(\theta^4)$ です。$s>(m+M)^2$ を固定したとき、[スピン平均](#thm-qft17-spin-average)の角括弧の $t\to0$ 極限は $2(s-S)^2>0$ です。従って $d\sigma/d\Omega$ は定数倍の $\theta^{-4}$。立体角測度は $d\Omega\sim 2\pi\theta\,d\theta$ なので、前方での積分は

$$
\int_0^\delta\theta^{-4}\theta\,d\theta
=\int_0^\delta\theta^{-3}\,d\theta
$$

となり発散します。微分断面積を有限の非零角で評価することと、全角度へ積分することは異なります。
<!-- solution-end -->

### 演習 QFT17-C1：最小結合から非偏極散乱まで

- Level: C
- 問題：質量 $m,M>0$、電荷 $q_e=q_\mu=-e$（$e>0$）の二つのDirac場が、一つのMaxwell場を介して電子–ミューオン弾性散乱を起こす。質量殻外線、$s>(m+M)^2$、$0<\theta\le\pi$ と木レベルの摂動振幅を仮定する。次を順に求めよ。

  1. 局所U(1)変換を指定し、最小結合項を導け。
  2. $t$ チャネルの頂点と内部線から $i\mathcal M$ を導き、共変ゲージの $\xi$ 依存が消える理由を示せ。
  3. スピン平均をtraceに直し、質量を無視できる極限で微分断面積を $s,t,u,e$ を用いて求めよ。
  4. 前方を含む全断面積が、この木レベル式では有限にならない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

**(a) 局所位相と頂点。** 各種 $a=e,\mu$ に対し $D_\mu^{(a)}=\partial_\mu+iq_aA_\mu$、$\psi_a'=e^{-iq_a\chi}\psi_a$、$A'_\mu=A_\mu+\partial_\mu\chi$ とします。直接微分すると

$$
\begin{aligned}
(\partial_\mu+iq_aA'_\mu)(e^{-iq_a\chi}\psi_a)
&=e^{-iq_a\chi}[
\partial_\mu\psi_a-iq_a(\partial_\mu\chi)\psi_a\\
&\qquad+iq_aA_\mu\psi_a+iq_a(\partial_\mu\chi)\psi_a]\\
&=e^{-iq_a\chi}D_\mu^{(a)}\psi_a.
\end{aligned}
$$

従って各Dirac項は不変です。作用の荷電部分を展開すると

$$
\sum_a\bar\psi_a(i\gamma^\mu D_\mu^{(a)}-m_a)\psi_a
=\sum_a\bar\psi_a(i\not\partial-m_a)\psi_a
-\sum_a q_a\bar\psi_a\gamma^\mu\psi_a A_\mu.
$$

電子もミューオンも $q_a=-e$ なので、[頂点規則](#def-qft17-vertex)は $+ie\gamma^\mu$ です。

**(b) 光子交換とゲージ独立性。** 異種頂点を二次Dyson展開で一つずつ選ぶと、場所の交換二通りで $2!$ が相殺します。Feynmanゲージで $k=p_3-p_1=p_2-p_4$、$t=k^2<0$ と置けば

$$
\begin{aligned}
i\mathcal M
&=(+ie)\bar u_e(p_3)\gamma^\mu u_e(p_1)
\frac{-i\eta_{\mu\nu}}{t+i0}
(+ie)\bar u_\mu(p_4)\gamma^\nu u_\mu(p_2)\\
&=\frac{ie^2}{t}
[\bar u_e(p_3)\gamma^\mu u_e(p_1)]
[\bar u_\mu(p_4)\gamma_\mu u_\mu(p_2)].
\end{aligned}
$$

[質量殻電流の定理](#thm-qft17-ward)を各電流へ適用するには、電子線では $\bar u_e(p_3)(\not p_3-\not p_1)u_e(p_1)=0$、ミューオン線では $\bar u_\mu(p_4)(\not p_2-\not p_4)u_\mu(p_2)=0$ と計算します。したがって一般ゲージで加わる $k_\mu k_\nu$ 項は零です。$t<0$ なので分布の極への代入も避けられます。

**(c) スピン平均と断面積。** [QFT7のスピン和](../QFT7/index.md#thm-qft7-spin-sums)から

$$
\begin{aligned}
\overline{|\mathcal M|^2}
&=\frac{e^4}{4t^2}\operatorname{tr}[
(\not p_3+m)\gamma^\mu(\not p_1+m)\gamma^\nu]\\
&\qquad\qquad\cdot\operatorname{tr}[
(\not p_4+M)\gamma_\mu(\not p_2+M)\gamma_\nu].
\end{aligned}
$$

奇数gammaの跡は0、四本の跡は $4(\eta^{\alpha\mu}\eta^{\beta\nu}-\eta^{\alpha\beta}\eta^{\mu\nu}+\eta^{\alpha\nu}\eta^{\mu\beta})$ です。$S=m^2+M^2$ とすると $p_1\cdot p_2=(s-S)/2$、$p_1\cdot p_4=(S-u)/2$、$p_1\cdot p_3=m^2-t/2$、$p_2\cdot p_4=M^2-t/2$。二本のtraceを縮約して

$$
\overline{|\mathcal M|^2}
=\frac{2e^4}{t^2}[(s-S)^2+(u-S)^2+2St]
$$

です。[重心系断面積](#prop-qft17-cross-section)を使って質量を零へ近付けると $s+t+u=0$、$p_{\rm out}/p_{\rm in}=1$ より

$$
\boxed{\frac{d\sigma}{d\Omega}
=\frac{e^4(s^2+u^2)}{32\pi^2s\,t^2}}
$$

となります。これは質量が小さい領域の高エネルギー極限の式で、質量零の荷電粒子について厳密な孤立漸近状態を作ったという主張ではありません。

**(d) 前方の不適切な積分。** 重心系では $t=-2p_{\rm cm}^2(1-\cos\theta)$ で、$\theta\downarrow0$ のとき $t\sim-p_{\rm cm}^2\theta^2$。上の微分断面積は $\theta^{-4}$ と増大し、$d\Omega\sim2\pi\theta\,d\theta$ を掛けても $\int_0^\delta\theta^{-3}\,d\theta$ が発散します。有限角での散乱振幅、遮蔽・角度カットを持つ実験、軟光子を含めた包摂過程は区別しなければなりません。
<!-- solution-end -->

## 7. 次へ：外線電流の横性から量子補正へ

ここまでに、局所位相の補償から共変微分を導入し、作用の相互作用項を頂点へ変換し、質量殻電流の横性を使って光子伝播関数のゲージ依存部分を消しました。さらに二種のスピン和と二体位相空間を合わせ、断面積までを計算しました。

次は、この外線で確かめた横性が、より多くの図・相互作用の次数でどのように一般化されるかを考えます。木レベルの電荷保存だけでなく、相関関数間のWard恒等式を具体的に確認することが必要になります。
