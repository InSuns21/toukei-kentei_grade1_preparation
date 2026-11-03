# QFT34 局所U(1)対称性・Abelian Higgs機構・ゲージ固定と物理自由度

[QFT33のGoldstone定理](../QFT33/index.md#thm-qft33-goldstone)では、連続な**大域**対称性を真空が破ると質量零励起を期待できる条件を学びました。しかし、その回転を時空点ごとに自由に行える局所ゲージ変換に変えると、同じ結論をそのまま適用できません。局所ゲージ変換は物理状態を別の状態へ移す対称性ではなく、同一の物理配置を異なる変数で表す冗長性だからです。

では、二成分のスカラー場にあった接線方向の揺らぎは、どこへ行くのでしょうか。ここでは複素スカラーと局所U(1)ゲージ場の最小模型を使い、(i) ゲージ不変な作用、(ii) 真空周りの二次式、(iii) 正則な領域でのユニタリゲージ、(iv) 共変な $R_\xi$ ゲージ、(v) 物理的自由度を順に導きます。電弱理論の $SU(2)\times U(1)$ 質量行列は後続章で扱います。

以下、$3+1$ 次元Minkowski時空、$x^\mu=(t,\boldsymbol x)$、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、単位系 $\hbar=c=1$ で考えます。結合定数と模型のパラメータは $g,\lambda,v>0$ とします。

偏微分する変数、波動演算子、縮約の略記は

$$
\partial_\mu=\frac{\partial}{\partial x^\mu},\qquad
\Box=\partial_\mu\partial^\mu,\qquad
A^2=A_\mu A^\mu,\qquad
(\partial h)^2=\partial_\mu h\,\partial^\mu h
$$

とします。添字の上げ下げは計量によって行い、反復する上下添字は和を取ります。プライム $'$ は以下では微分ではなく**ゲージ変換後**の表示を意味します。

場は必要な微分が存在する滑らかな場、変分はコンパクト支持、部分積分の境界項は零とします。**まず古典場と木レベル二次作用**を扱い、量子論の一般的な非摂動構成は仮定しません。

## 1. 大域回転を局所変換へ：なぜゲージ場が必要か

複素スカラー場 $\Phi=(\phi_1+i\phi_2)/\sqrt2$ は二つの実自由度を持ちます。一定の位相を掛けるだけなら、$|\partial_\mu\Phi|^2$ は不変です。しかし $\Phi'=e^{-ig\chi(x)}\Phi$ とすると

$$
\partial_\mu\Phi'=e^{-ig\chi}\bigl(\partial_\mu\Phi-ig(\partial_\mu\chi)\Phi\bigr)
$$

となり、余計な勾配が出ます。この項を補償するため、[QFT15の局所ゲージ変換](../QFT15/index.md#def-qft15-gauge)の四元ポテンシャルと、[QFT17の共変微分](../QFT17/index.md#def-qft17-covariant-derivative)の考え方をスカラー場へ移します。$g$ は結合定数、$A_\mu$ は実ゲージ場です。

<a id="def-qft34-scalar-gauge"></a>

<!-- formal-statement-start -->
> **定義（荷電スカラー場の局所U(1)変換と共変微分）**
> 開集合上の複素 $C^1$ 場 $\Phi$、実 $C^1$ 四元ポテンシャル $A_\mu$、実 $C^2$ 関数 $\chi$、定数 $g>0$ に対して、変換と共変微分を

$$
\Phi'=e^{-ig\chi}\Phi,\qquad A'_\mu=A_\mu+\partial_\mu\chi,
\qquad D_\mu\Phi=(\partial_\mu+igA_\mu)\Phi
$$

> と定める。場の強さは $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ とする。局所ゲージ変換で結ばれる場を同じ物理配置の異なる記述として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft34-scalar-gauge -->
### 例：時間依存の位相を持つ純ゲージ配置

**定義の確認**：$\Phi=v/\sqrt2$、$A_\mu=0$、$\chi(x)=at$（$a$ は実定数）とします。変換後は $\Phi'=ve^{-igat}/\sqrt2$、$A'_0=a$、$A'_i=0$ です。直接計算すると

$$
D'_0\Phi'=(-iga+iga)\Phi'=0,\qquad D'_i\Phi'=0,
\qquad F'_{\mu\nu}=0.
$$

位相の時間変化だけを見て新しい物理的運動と判断してはいけません。共変微分と場の強さの両方が元の配置と一致します。
<!-- definition-example-end -->

<a id="thm-qft34-covariance"></a>

<!-- formal-statement-start -->
> **定理（共変微分とAbelian場の強さのゲージ変換）**
> [上の定義](#def-qft34-scalar-gauge)に従う滑らかな場について、任意の実滑らかな $\chi$ に対し

$$
D'_\mu\Phi'=e^{-ig\chi}D_\mu\Phi,\qquad
F'_{\mu\nu}=F_{\mu\nu}
$$

> が成り立つ。したがって $(D_\mu\Phi)^*D^\mu\Phi$、$|\Phi|^2$、$F_{\mu\nu}F^{\mu\nu}$ は局所ゲージ不変である。
<!-- formal-statement-end -->

### 証明の見取り図

積の微分で現れる $-ig(\partial\chi)\Phi$ と、変換後の $+igA'_\mu\Phi'$ に含まれる $+ig(\partial\chi)\Phi$ が相殺します。場の強さでは二階微分の可換性を使います。

<!-- proof-start -->
### 証明

[共変微分の定義](#def-qft34-scalar-gauge)を使って一行ずつ代入すると

$$
\begin{aligned}
D'_\mu\Phi'
&=(\partial_\mu+igA_\mu+ig\partial_\mu\chi)(e^{-ig\chi}\Phi)\\
&=e^{-ig\chi}(\partial_\mu\Phi-ig(\partial_\mu\chi)\Phi
+igA_\mu\Phi+ig(\partial_\mu\chi)\Phi)\\
&=e^{-ig\chi}D_\mu\Phi.
\end{aligned}
$$

また

$$
F'_{\mu\nu}=F_{\mu\nu}
+(\partial_\mu\partial_\nu-\partial_\nu\partial_\mu)\chi=F_{\mu\nu}.
$$

前者は位相因子の絶対値が1なので、その共役と積を取れば不変です。後二者も変換しない量です。
<!-- proof-end -->

## 2. 対称な作用と真空の二次揺らぎ

[QFT33の円形真空](../QFT33/index.md#prop-qft33-o2-masses)は、二実成分を一つの複素場にまとめたときも現れます。ただしここでの円周上の点は、局所ゲージ変換で互いに同値です。$|\Phi|$ の値はゲージ不変なので、真空の半径を表す量として使えます。

<a id="def-qft34-abelian-higgs"></a>

<!-- formal-statement-start -->
> **定義（Abelian Higgs模型）**
> $3+1$ 次元Minkowski時空、$g,\lambda,v>0$ とし、[局所U(1)共変微分](#def-qft34-scalar-gauge)を持つ複素スカラー場 $\Phi$ と実ゲージ場 $A_\mu$ に対し、作用 $S=\int d^4x\,\mathcal L$ を次で定める。

$$
\mathcal L=-\frac14F_{\mu\nu}F^{\mu\nu}
+(D_\mu\Phi)^*D^\mu\Phi
-\lambda\left(|\Phi|^2-\frac{v^2}{2}\right)^2.
$$

> 無限体積での定数真空候補は $F=0$、$D\Phi=0$ かつポテンシャル最小の配置のゲージ同値類として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft34-abelian-higgs -->
### 例：エネルギーが零の代表元とその変換

**定義の確認**：$\Phi_0=v/\sqrt2$、$A_\mu=0$ なら $F=0$、$D\Phi_0=0$、ポテンシャルも零です。前節の $\chi=at$ で動かした配置もこれら三条件を満たします。[共変性定理](#thm-qft34-covariance)によって、局所変換しても作用と局所的なゲージ不変量は変わりません。$|\Phi_0|^2=v^2/2$ はどちらの表示でも同じです。
<!-- definition-example-end -->

真空の一つの**ゲージ代表**を $\Phi_0=v/\sqrt2$、$A=0$ と固定して計算します。実場 $h$ は半径方向、実場 $\pi$ はこの代表周りでの位相接線方向を表します。

$$
\Phi=\frac{v+h+i\pi}{\sqrt2},\qquad
|\Phi|^2-\frac{v^2}{2}=vh+\frac{h^2+\pi^2}{2}.
$$

$h,\pi,A_\mu$ の全てを一次の小量と見て、二次まで残します。まずポテンシャルは

$$
\lambda\left(vh+\frac{h^2+\pi^2}{2}\right)^2
=\lambda v^2h^2+\lambda vh(h^2+\pi^2)
+\frac\lambda4(h^2+\pi^2)^2.
$$

共変微分は

$$
D_\mu\Phi=\frac1{\sqrt2}
\left(\partial_\mu h-gA_\mu\pi
+i\bigl[\partial_\mu\pi+gA_\mu(v+h)\bigr]\right).
$$

二乗のうち二次までを拾うと、相互作用の三次以上を除いて

$$
|D\Phi|^2\big|_{\le2}
=\frac12(\partial h)^2+\frac12(\partial_\mu\pi+gvA_\mu)^2.
$$

<a id="prop-qft34-quadratic-spectrum"></a>

<!-- formal-statement-start -->
> **命題（真空周りの二次作用と木レベル質量）**
> [Abelian Higgs模型](#def-qft34-abelian-higgs)で $\Phi_0=v/\sqrt2,A=0$ を代表として選び、$\Phi=(v+h+i\pi)/\sqrt2$ と展開すると、二次作用密度は

$$
\begin{aligned}
\mathcal L_2={}&-\frac14F_{\mu\nu}F^{\mu\nu}
+\frac12(\partial h)^2-\frac12m_h^2h^2\\
&+\frac12(\partial_\mu\pi+m_AA_\mu)^2,\\
m_h^2={}&2\lambda v^2,\qquad m_A^2=g^2v^2.
\end{aligned}
$$

> $\pi$ の独立したポテンシャル質量は零だが、$\pi$ と $A_\mu$ は混合するので、$\pi$ を物理的質量零粒子と数えてはならない。
<!-- formal-statement-end -->

### 証明の見取り図

ポテンシャルの二次項は $h^2$ だけで、共変微分の虚部に $\partial\pi+gvA$ が現れます。$A^2$ の係数を $m_A^2/2$ と比較します。

<!-- proof-start -->
### 証明

上の展開でポテンシャルから $-\lambda v^2h^2$ を得るので、$-m_h^2h^2/2$ と比較して $m_h^2=2\lambda v^2$ です。共変微分の実部の $-gA\pi$ は二次なので、その二乗や $\partial h$ との積は三次以上です。虚部の一次は $\partial\pi+gvA$、その二乗は二次に残ります。従って

$$
\frac12(\partial\pi+gvA)^2
=\frac12(\partial\pi)^2+gvA^\mu\partial_\mu\pi
+\frac12g^2v^2A_\mu A^\mu.
$$

$A^2$ の係数から $m_A^2=g^2v^2$ が決まります。ただし中間の混合項が残るので、まだ $A$ と $\pi$ を独立な自由粒子として扱うことはできません。
<!-- proof-end -->

## 3. 位相をゲージ場にまとめる：局所ユニタリゲージ

直交座標の $h,\pi$ は真空近くでは分かりやすい一方、位相方向が冗長なことを隠します。$\Phi\ne0$ の領域では大きさと角度で書けます。角度 $\theta/v$ は無次元で、$\theta$ は質量次元1です。ここで扱う**Proca表示**とは、正の質量項 $m^2B_\mu B^\mu/2$ を持つベクトル場の記述のことです。

<a id="def-qft34-invariant-vector"></a>

<!-- formal-statement-start -->
> **定義（非零スカラー領域のゲージ不変ベクトル）**
> $\Phi\ne0$ で、滑らかな位相枝を一つ選べる局所領域において、$\rho>0$、実 $\theta$ によって

$$
\Phi=\frac\rho{\sqrt2}e^{i\theta/v},\qquad
B_\mu=A_\mu+\frac1{gv}\partial_\mu\theta
$$

> とおく。ここで $B_\mu$ は、その領域でゲージ変換に不変な実ベクトル場とする。$\rho=v+h_u$ と置くと $h_u$ はゲージ不変な動径揺らぎである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft34-invariant-vector -->
### 例：変換後も同じベクトル場になる

**定義の確認**：$\rho=v$、$\theta=kx^1$、$A_\mu=0$ とします。$B_1=k/(gv)$、他成分は零です。$\chi=\theta/(gv)$ の局所変換を行うと $\theta'=\theta-gv\chi=0$、$A'_1=\partial_1\chi=k/(gv)$ で、$B'_1=B_1$ です。$\rho>0$、滑らかな位相枝、ゲージ不変性を直接確かめました。
<!-- definition-example-end -->

先のCartesian揺らぎとこの極表示は同じ複素場の二つの局所座標です。両方の実部・虚部を比較すると

$$
v+h=\rho\cos(\theta/v),\qquad
\pi=\rho\sin(\theta/v).
$$

したがって $\rho=v+h_u$ とし、真空近くで $h_u,\theta$ を一次の小量と数えれば、$h=h_u+O(2)$、$\pi=\theta+O(2)$ です。**二次作用では**この一次関係が使えますが、有限振幅で $\pi=\theta$ と同一視するわけではありません。

<a id="thm-qft34-unitary-proca"></a>

<!-- formal-statement-start -->
> **定理（正則な局所領域でのHiggs–Proca表示）**
> [Abelian Higgs模型](#def-qft34-abelian-higgs)で $g,v>0$ とし、$\Phi\ne0$ かつ滑らかな位相枝が存在する局所領域では、[ゲージ不変変数](#def-qft34-invariant-vector)で作用密度は

$$
\mathcal L=-\frac14(\partial_\mu B_\nu-\partial_\nu B_\mu)^2
+\frac12(\partial\rho)^2+\frac12g^2\rho^2B_\mu B^\mu
-\frac\lambda4(\rho^2-v^2)^2.
$$

> 真空 $\rho=v,B=0$ で二次まで展開すると、動径実場一つの質量二乗は $2\lambda v^2$、ベクトル場の質量二乗は $g^2v^2$ となる。位相場は独立な物理変数として残らない。
<!-- formal-statement-end -->

### 証明の見取り図

$D\Phi$ の大きさには $\partial\rho$ と $\rho(\partial\theta/v+gA)$ の平方が現れ、後者が $g\rho B$ となります。$B-A$ は勾配なので $F(B)=F(A)$ です。

<!-- proof-start -->
### 証明

[共変微分の定義](#def-qft34-scalar-gauge)に極表示を代入すると

$$
\begin{aligned}
D_\mu\Phi
&=\frac{e^{i\theta/v}}{\sqrt2}
\left(\partial_\mu\rho+i\rho\left(\frac{\partial_\mu\theta}{v}+gA_\mu\right)\right)\\
&=\frac{e^{i\theta/v}}{\sqrt2}(\partial_\mu\rho+ig\rho B_\mu).
\end{aligned}
$$

実数の $\partial\rho$ と $g\rho B$ の交差項は共役との積で相殺され、$|D\Phi|^2=(\partial\rho)^2/2+g^2\rho^2B^2/2$ です。さらに $\partial_\mu B_\nu-\partial_\nu B_\mu=F_{\mu\nu}$ が二階微分の相殺から成り立ちます。ポテンシャルは $\lambda(\rho^2-v^2)^2/4$。$\rho=v+h_u$ として $g^2\rho^2B^2/2=g^2v^2B^2/2+O(3)$、ポテンシャルは $\lambda v^2h_u^2+O(3)$ なので結論を得ます。
<!-- proof-end -->

**適用範囲に注意**：$\Phi=0$ の点では位相を定義できません。渦や非自明な境界条件があると一つの位相枝を全空間で取れない場合もあります。局所ユニタリゲージが使えることと、すべての場配置を大域的に一つのゲージで覆えることは別です。$g\to0$ または $v\to0$ の極限にこの表示の $1/(gv)$ を無条件に使うこともできません。

## 4. 質量があるベクトルにはなぜ三つの偏極があるか

[QFT15の質量零Maxwell場](../QFT15/index.md#thm-qft15-two-polarizations)は物理偏極が二つでした。これに対して質量項を持つベクトルでは、自由場方程式から縦方向を含む三つの偏極が出ます。ここでは上の局所表示の二次作用で証明します。

<a id="thm-qft34-massive-polarizations"></a>

<!-- formal-statement-start -->
> **定理（正の質量を持つProca場の三偏極）**
> $m>0$、境界項を落とせる実ベクトル場 $B_\mu$ の作用密度を $\mathcal L_P=-G_{\mu\nu}G^{\mu\nu}/4+m^2B_\mu B^\mu/2$、$G_{\mu\nu}=\partial_\mu B_\nu-\partial_\nu B_\mu$ とする。Euler–Lagrange方程式は

$$
\partial_\mu G^{\mu\nu}+m^2B^\nu=0,
\qquad \partial_\nu B^\nu=0.
$$

> 正エネルギーの時間的な質量殻 $p^2=m^2$ 上の平面波 $B^\mu=\epsilon^\mu e^{-ip\cdot x}$ は $p\cdot\epsilon=0$ を満たし、実物理偏極は三つである。
<!-- formal-statement-end -->

### 証明の見取り図

反対称な $G$ の二重発散は零です。質量が正なので発散制約 $\partial\cdot B=0$ が従います。質量殻の静止系では $\epsilon^0=0$ となり空間三成分が残ります。

<!-- proof-start -->
### 証明

変分 $\delta G_{\mu\nu}=\partial_\mu\delta B_\nu-\partial_\nu\delta B_\mu$ を使うと

$$
\delta\mathcal L_P=-G^{\mu\nu}\partial_\mu\delta B_\nu
+m^2B^\nu\delta B_\nu.
$$

部分積分で $\delta B_\nu$ の係数を零にして第一式を得ます。$\partial_\nu$ を作用させると

$$
\partial_\nu\partial_\mu G^{\mu\nu}+m^2\partial_\nu B^\nu
=0+m^2\partial_\nu B^\nu=0
$$

です。最初の項は対称な二階微分と反対称な $G$ の縮約なので零です。$m^2>0$ から第二式。平面波を代入すると $p\cdot\epsilon=0$、そして

$$
(-p^2+m^2)\epsilon^\nu+p^\nu(p\cdot\epsilon)=0
\quad\Longrightarrow\quad p^2=m^2
$$

（非零偏極）です。時間的な $p$ はLorentz変換で $p=(m,0,0,0)$ にでき、その系では $m\epsilon^0=0$、$\epsilon^1,\epsilon^2,\epsilon^3$ は独立です。したがって三偏極です。
<!-- proof-end -->

**自由度の保存**：ゲージ固定前の場の構成で数えると、複素スカラーの二実成分とゲージ場のMaxwell型の二物理偏極で $2+2=4$ です。これは同じポテンシャルに別の安定な「未破れ真空」があるという主張ではありません。

非零真空の周りで物理モードを対角化すると、動径スカラー一つと質量あるゲージ場の三偏極で $1+3=4$ です。**自由度が無から増えたわけではなく**、以前の接線方向が質量あるベクトルの縦偏極として現れます。なおこの計数は $g,v>0$ かつ定数真空の周りの小振動に関するものです。

## 5. $R_\xi$ ゲージ：位相場が計算には残る理由

ユニタリゲージは物理自由度を数えるには便利ですが、量子摂動計算ではゲージ場の高運動量の振る舞いが扱いにくい場合があります。そこで[QFT16の共変ゲージ固定](../QFT16/index.md#def-qft16-gauge-fixed-action)にならい、$\pi$ を計算の中に残して混合を除く方法を使います。$\xi>0$ はゲージ選択の実パラメータであり、測定する質量を指定する物理定数ではありません。

[二次作用の命題](#prop-qft34-quadratic-spectrum)の混合項は $m_A A^\mu\partial_\mu\pi$ なので、部分積分すると $-m_A\pi\,\partial_\mu A^\mu$ です。これを相殺する符号で固定します。

<a id="def-qft34-rxi"></a>

<!-- formal-statement-start -->
> **定義（Abelian Higgs模型のRξゲージ固定）**
> $m_A=gv>0$、$\xi>0$、真空代表周りの $\Phi=(v+h+i\pi)/\sqrt2$ に対して

$$
\mathcal F=\partial_\mu A^\mu-\xi m_A\pi,
\qquad \mathcal L_{\rm gf}=-\frac{\mathcal F^2}{2\xi}
$$

> を加える。これはゲージ固定を加えた摂動作用の定義であり、元のゲージ不変作用と全ての成分を物理観測量として同一視するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft34-rxi -->
### 例：$\xi=1$ における混合の相殺

**定義の確認**：$\xi=1$ なら $\mathcal F=\partial\cdot A-m_A\pi$ です。$-\mathcal F^2/2$ の交差項は $+m_A\pi\partial\cdot A$、もとの混合項の部分積分形は $-m_A\pi\partial\cdot A$ です。両者が打ち消し、残る $\pi$ の質量二乗は $m_A^2$ です。任意の非零 $m_A$ でこの検査が成り立ちます。
<!-- definition-example-end -->

運動量空間では、[QFT16の横・縦射影](../QFT16/index.md#def-qft16-projectors)を質量項のある二次作用素にも使います。$p^2\ne0$ で任意の四元ベクトル $X_\mu$ を $p_\mu$ に平行な $p_\mu(p\cdot X)/p^2$ と残りに分解できるため、縦射影は $P^L_{\mu\nu}=p_\mu p_\nu/p^2$、横射影は $P^T=\eta-P^L$ です。ここで「横」は四元運動量 $p$ との縮約が零という意味であり、空間三次元の横方向と同一視しません。

<a id="thm-qft34-rxi-quadratic"></a>

<!-- formal-statement-start -->
> **定理（Rξ二次作用の対角化と非物理的な質量）**
> [二次作用](#prop-qft34-quadratic-spectrum)に[ゲージ固定](#def-qft34-rxi)を加え、境界項を落とすと

$$
\begin{aligned}
\mathcal L_{2,\xi}={}&-\frac14F^2+\frac12m_A^2A^2
-\frac{(\partial\cdot A)^2}{2\xi}\\
&+\frac12(\partial h)^2-\frac12m_h^2h^2
+\frac12(\partial\pi)^2-\frac12\xi m_A^2\pi^2.
\end{aligned}
$$

> $m_\pi^2=\xi m_A^2$ はゲージ依存の二次作用の極であって、独立な物理Goldstone粒子の質量ではない。ベクトルの横・縦射影に対する運動量空間のFeynman核は、$p^2$ の極から離れて

$$
D_{\mu\nu}(p)=-i\left[
\frac{P^T_{\mu\nu}}{p^2-m_A^2+i0}
+\frac{\xi P^L_{\mu\nu}}{p^2-\xi m_A^2+i0}\right],
\quad P^L_{\mu\nu}=\frac{p_\mu p_\nu}{p^2},\quad
P^T_{\mu\nu}=\eta_{\mu\nu}-P^L_{\mu\nu}.
$$

> ここで $p^2\ne0$ における射影分解を用い、境界値の $i0$ は各極に同じFeynman処方を施す。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal F^2$ を展開して混合を打ち消し、ベクトルの二次作用素を直交射影 $P^T,P^L$ に分けてそれぞれ逆数を取ります。

<!-- proof-start -->
### 証明

ゲージ固定項を展開すると

$$
\mathcal L_{\rm gf}=-\frac{(\partial\cdot A)^2}{2\xi}
+m_A\pi\,\partial\cdot A-\frac12\xi m_A^2\pi^2.
$$

一方 $m_AA\cdot\partial\pi=-m_A\pi\partial\cdot A$（全微分を除く）なので混合が消え、上の対角二次式を得ます。ベクトル作用素は $e^{-ipx}$ のFourier規約で

$$
K_{\mu\nu}(p)=-(p^2-m_A^2)P^T_{\mu\nu}
-\frac1\xi(p^2-\xi m_A^2)P^L_{\mu\nu}.
$$

射影の積 $P^TP^L=0$、$(P^T)^2=P^T$、$(P^L)^2=P^L$ を使えば

$$
iK^{-1}=-i\left(
\frac{P^T}{p^2-m_A^2+i0}
+\frac{\xi P^L}{p^2-\xi m_A^2+i0}\right)
$$

です。これは $p^2\ne0$ での射影計算です。両分母が零でない運動量で二項を通分すると

$$
\frac{P^T_{\mu\nu}}{p^2-m_A^2}
+\frac{\xi P^L_{\mu\nu}}{p^2-\xi m_A^2}
=\frac{\eta_{\mu\nu}}{p^2-m_A^2}
+\frac{(\xi-1)p_\mu p_\nu}
{(p^2-m_A^2)(p^2-\xi m_A^2)}.
$$

右辺には見かけの $1/p^2$ がなく、$p^2=0$ で射影の個々が未定義になることと、質量のある伝播核全体に極があることを区別できます。Feynman境界値はこの組み合わせを質量極で処方して解釈します。$m_h^2=2\lambda v^2$ はゲージ固定前後で同じ二次係数、$\pi$ の項だけが $-\xi m_A^2\pi^2/2$ になります。
<!-- proof-end -->

### 5.1 外部保存電流とゲージパラメータ

保存された外部電流 $J,J'$ のFourier成分が $p_\mu J^\mu=p_\mu J'^\mu=0$ を満たすなら、$J^\mu P^L_{\mu\nu}J'^\nu=(p\cdot J)(p\cdot J')/p^2=0$ です。したがって木レベルの交換核は

$$
J^\mu D_{\mu\nu}J'^\nu
=-i\frac{J\cdot J'}{p^2-m_A^2+i0},
$$

となり $\xi$ を含みません。これは[QFT16の保存電流間のゲージ非依存性](../QFT16/index.md#thm-qft16-current-exchange)に質量項を入れた直接計算です。非保存電流や任意のゲージ非不変なGreen関数について同じ結論を無条件に主張できません。

### 5.2 Faddeev–Popov演算子の小模型

量子経路積分でゲージ条件を挿入するときは、[QFT29のFaddeev–Popov作用素の構成](../QFT29/index.md#def-qft29-fp-operator)（ゲージ条件の微小変化からJacobianを作る手順）を、このAbelian模型にも適用します。無限小変換 $\delta\Phi=-ig\chi\Phi$ を直交成分に分けると

$$
\delta h=g\chi\pi,\qquad \delta\pi=-g\chi(v+h),
\qquad \delta A_\mu=\partial_\mu\chi.
$$

よって[ゲージ固定関数](#def-qft34-rxi)の変分は

$$
\delta\mathcal F=\left[\Box+\xi g m_A(v+h)\right]\chi
=\left[\Box+\xi m_A^2+\xi g m_Ah\right]\chi.
$$

ここで $\delta\mathcal F/\delta\chi$ はゲージ条件の **Jacobian** です。[QFT29の定義](../QFT29/index.md#def-qft29-fp-operator)ではFaddeev–Popov作用素をその**負号**で定めるため、この模型でその規約を使えば

$$
M=-\frac{\delta\mathcal F}{\delta\chi}
=-\Box-\xi m_A^2-\xi g m_A h.
$$

ghost二次作用で演算子全体の符号を逆にする規約を選んでも、真空周りの逆核の極 $p^2=\xi m_A^2$ は変わりません。**Abelianだからghostがあらゆるゲージで相互作用しない**わけではありません。このCartesian $R_\xi$ ゲージでは $h$ との結合が残ります。ghostは物理的な外線粒子として数えません。ここではこの行列式の局所的・摂動論的構造までを示し、非摂動的なゲージ固定一意性は仮定しません。

## 6. 大域的Goldstone定理との違い

- [QFT33のGoldstone定理](../QFT33/index.md#thm-qft33-goldstone)は、**物理的な大域**保存電流と真空の非零交換子を仮定します。局所ゲージ変換を生成する制約をそのままこの大域電荷へ置き換えてはなりません。
- ゲージに依存する $\langle\Phi\rangle$ や $\pi$ の伝播関数だけを物理的な秩序変数・粒子の存在の証明としません。ゲージ不変な $|\Phi|^2$、$F_{\mu\nu}$、および非零場の領域の $B_\mu$ などを区別します。量子論では局所ゲージ変換の「自発的破れ」という表現は、ゲージを固定した記述の略語に過ぎません。
- **観測可能な質量**は、正しいゲージ不変な相関やS行列の物理極から議論すべきです。ここで求めた $m_A=gv$ と $m_h=\sqrt{2\lambda}\,v$ は木レベルの真空周りの値で、量子補正後の厳密な質量と同一視しません。
- $\pi$ の $\xi m_A^2$ という極やghostの極はゲージ固定の補助的な構造であり、物理的粒子数に追加しません。

## 7. 演習：計算・仮定・自由度を結び直す

### 演習 QFT34-A1：純ゲージ背景の共変微分

- Level: A
- 問題：$g>0$、$\Phi_0=v/\sqrt2$、$A_\mu=0$、$\chi(x)=a_\mu x^\mu$（定数実共変ベクトル $a_\mu$）とする。変換後の $\Phi',A'$ を書き、$D'\Phi'=0$ と $F'=0$ を成分ごとに確認せよ。

<!-- solution-start -->
**詳細解答**

$\Phi'=ve^{-ig a\cdot x}/\sqrt2$、$A'_\mu=a_\mu$ です。$\partial_\mu\Phi'=-iga_\mu\Phi'$、$igA'_\mu\Phi'=iga_\mu\Phi'$ なので和は零です。$a_\mu$ が定数であるため $F'_{\mu\nu}=\partial_\mu a_\nu-\partial_\nu a_\mu=0$ です。[共変性定理](#thm-qft34-covariance)の直接例で、空間・時間のいずれの成分にも成立します。
<!-- solution-end -->

### 演習 QFT34-A2：真空の半径と接線方向

- Level: A
- 問題：$V=\lambda(|\Phi|^2-v^2/2)^2$、$\Phi=(\phi_1+i\phi_2)/\sqrt2$、$\lambda,v>0$ とする。最小集合を求め、$(\phi_1,\phi_2)=(v,0)$ でのHessian固有値を求めよ。接線零固有値だけから物理的質量零粒子を断定できるか。

<!-- solution-start -->
**詳細解答**

$V=\lambda(\phi_1^2+\phi_2^2-v^2)^2/4$ なので最小集合は $\phi_1^2+\phi_2^2=v^2$ です。[QFT33の質量行列の命題](../QFT33/index.md#prop-qft33-o2-masses)と同様、ここでのHessianはCartesian成分による二階偏微分です。真空 $\phi_0=(v,0)$ と小さな実二成分 $q$ に対して

$$
H_{ab}(\phi)=\frac{\partial^2V}{\partial\phi_a\partial\phi_b},\qquad
V(\phi_0+q)=V(\phi_0)+\frac12q_aH_{ab}(\phi_0)q_b+O(|q|^3)
$$

となるため、Hessianが二次揺らぎの係数を判定します。$r^2=\phi_1^2+\phi_2^2$ と置いて微分すると

$$
\frac{\partial V}{\partial\phi_a}=\lambda(r^2-v^2)\phi_a,\qquad
H_{ab}=\lambda(r^2-v^2)\delta_{ab}+2\lambda\phi_a\phi_b.
$$

$(v,0)$ で $H=\operatorname{diag}(2\lambda v^2,0)$、動径固有方向 $(1,0)$ と接線方向 $(0,1)$ です。しかし局所ゲージ模型では接線はゲージ変換で動くので、[二次作用の命題](#prop-qft34-quadratic-spectrum)にある混合項を無視して物理的Goldstone粒子とは数えられません。
<!-- solution-end -->

### 演習 QFT34-A3：混合項の符号検査

- Level: A
- 問題：$D_\mu=\partial_\mu+igA_\mu$、$\Phi=(v+h+i\pi)/\sqrt2$ として $|D\Phi|^2$ を二次まで展開せよ。$A\cdot\partial\pi$ の符号を明示し、$m_A^2$ を求めよ。

<!-- solution-start -->
**詳細解答**

$D_\mu\Phi=[\partial_\mu h-gA_\mu\pi+i(\partial_\mu\pi+gA_\mu(v+h))]/\sqrt2$ です。二次まで残すと

$$
|D\Phi|^2\big|_{\le2}=\frac12(\partial h)^2+
\frac12(\partial\pi)^2+gvA^\mu\partial_\mu\pi+
\frac12g^2v^2 A^2.
$$

符号はプラスです。$m_A^2/2$ の係数と比較して $m_A^2=g^2v^2$ です。$A\cdot\partial\pi$ は全微分を除くと $-\pi\,\partial\cdot A$ になるので、ゲージ固定項ではこのマイナスを打ち消す必要があります。
<!-- solution-end -->

### 演習 QFT34-A4：角度を消す変換の適用範囲

- Level: A
- 問題：$\Phi=\rho e^{i\theta/v}/\sqrt2$、$\rho>0$ とする。$\chi=\theta/(gv)$ で $\theta'$ と $A'_\mu$ を求め、$B_\mu$ が不変であることを確かめよ。$\rho=0$ の点で同じ手順を使えない理由も述べよ。

<!-- solution-start -->
**詳細解答**

$\Phi'=e^{-ig\chi}\Phi$ から $\theta'=\theta-gv\chi=0$ です。$A'_\mu=A_\mu+\partial_\mu\theta/(gv)=B_\mu$ です。一方

$$
B'_\mu=A'_\mu+\frac1{gv}\partial_\mu\theta'
=A_\mu+\frac1{gv}\partial_\mu\theta=B_\mu.
$$

$\rho=0$ なら複素数 $\Phi=0$ の偏角は定義できず、$\theta$ を滑らかな変数として選ぶ根拠がありません。これはゲージ変換そのものの破綻ではなく、極表示の局所座標の破綻です。
<!-- solution-end -->

### 演習 QFT34-A5：Proca拘束と偏極

- Level: A
- 問題：$m>0$ のProca方程式 $\partial_\mu G^{\mu\nu}+m^2B^\nu=0$ を仮定する。発散条件を求め、静止系 $p=(m,0,0,0)$ で平面波の偏極数を数えよ。$m=0$ に代入して同じ数え方が使えない理由を述べよ。

<!-- solution-start -->
**詳細解答**

発散を取れば $m^2\partial\cdot B=0$ です。$m>0$ だから $\partial\cdot B=0$ となります。平面波では $p\cdot\epsilon=0$、静止系で $m\epsilon^0=0$、従って空間三成分が残ります。$m=0$ では発散の式が $0=0$ となり拘束を導けず、しかも静止系のある時間的質量殻がありません。その場合には[Maxwellの二偏極](../QFT15/index.md#thm-qft15-two-polarizations)としてゲージ同値性を改めて使います。
<!-- solution-end -->

### 演習 QFT34-B1：一般 $\xi$ での混合相殺

- Level: B
- 問題：$m=gv>0$、$\xi>0$ とし、$\mathcal L_2$ に $-(\partial\cdot A-\xi m\pi)^2/(2\xi)$ を加える。混合項、$\pi$ の質量、ベクトルの横・縦二次作用素を求めよ。

<!-- solution-start -->
**詳細解答**

ゲージ固定の展開を縮約記号 $\partial\cdot A=\partial_\mu A^\mu$ で書けば

$$
\mathcal L_{\rm gf}=-\frac{(\partial\cdot A)^2}{2\xi}
+m\pi\,\partial\cdot A-\frac12\xi m^2\pi^2.
$$

[二次作用](#prop-qft34-quadratic-spectrum)の混合項は部分積分で $-m\pi\,\partial\cdot A$ なので相殺します。$\pi$ の二次項は $[(\partial\pi)^2-\xi m^2\pi^2]/2$、したがって $m_\pi^2=\xi m^2$。$A$ のFourier二次作用素を $P^T,P^L$ で分けると

$$
K=-(p^2-m^2)P^T-(p^2/\xi-m^2)P^L.
$$

後者は $-(p^2-\xi m^2)P^L/\xi$ なので、逆核の横・縦の極はそれぞれ $p^2=m^2$ と $p^2=\xi m^2$ です。[対角化定理](#thm-qft34-rxi-quadratic)と符号・係数が一致します。
<!-- solution-end -->

### 演習 QFT34-B2：保存電流の散乱核

- Level: B
- 問題：$p^2\ne0$、$p\cdot J=p\cdot J'=0$ とする。二つの電流を $R_\xi$ ゲージのベクトル伝播関数で結んだ $J^\mu D_{\mu\nu}J'^\nu$ を計算し、$\xi$ 依存が消える根拠を述べよ。$p\cdot J\ne0$ ならどこが失敗するか。

<!-- solution-start -->
**詳細解答**

$P^L_{\mu\nu}=p_\mu p_\nu/p^2$ より $J^\mu P^L_{\mu\nu}J'^\nu=(p\cdot J)(p\cdot J')/p^2=0$ です。$P^T=\eta-P^L$ から $J P^T J'=J\cdot J'$。従って

$$
JDJ'=-i\frac{J\cdot J'}{p^2-m_A^2+i0}.
$$

条件がないと $JP^LJ'$ が一般に零でなく、$\xi/(p^2-\xi m_A^2+i0)$ の項が残ります。外部電流の保存という仮定を落としたままゲージ非依存性を宣言してはいけません。
<!-- solution-end -->

### 演習 QFT34-B3：動径を凍結した位相模型

- Level: B
- 問題：$\rho=v$ に制限したAbelian Higgs作用の二次部分で、$\theta$ と $A$ の依存を求めよ。$B=A+\partial\theta/(gv)$ を用いて作用を書き直し、自由度と $g\to0$ の限界を説明せよ。

<!-- solution-start -->
**詳細解答**

$\Phi=ve^{i\theta/v}/\sqrt2$ なので $D_\mu\Phi=(iv/\sqrt2)e^{i\theta/v}(\partial_\mu\theta/v+gA_\mu)$ です。従って

$$
\mathcal L=-\frac14F^2+\frac12(\partial_\mu\theta+gvA_\mu)^2
=-\frac14G(B)^2+\frac12g^2v^2B^2.
$$

この制限では動径励起を捨てたため、残る物理的自由度は質量あるベクトルの三つだけです。$g\to0$ のとき $B=A+\partial\theta/(gv)$ は特異で、同じ変数のまま連続極限を取れません。元の式で $g=0$ とすれば自由Maxwell場の二偏極と独立な質量零 $\theta$ の一自由度として合計三つが残ります。
<!-- solution-end -->

### 演習 QFT34-B4：位相の渦と局所表示

- Level: B
- 問題：平面の極座標 $(r,\varphi)$ で $\Phi=f(r)e^{in\varphi}/\sqrt2$、整数 $n\ne0$、$f(r)>0$（$r>0$）、$f(0)=0$ とする。$r>0$ の小領域で $\theta$ をどう選ぶか。原点を含む全平面で一つの滑らかな位相枝が取れない理由を、円周上の位相変化から説明せよ。

<!-- solution-start -->
**詳細解答**

小領域で連続な角度 $\varphi$ の枝を選び $\theta=vn\varphi$ とすれば $\Phi=f(r)e^{i\theta/v}/\sqrt2$ です。原点中心の一周に沿って角度の連続な持ち上げは $2\pi n$ 変化するので、$\theta$ を始点と終点で同じ実数値に戻す単一値の滑らかな関数にはできません。さらに原点では $f(0)=0$ で位相そのものが定義できません。各小領域の $B=A+\partial\theta/(gv)$ は定義できても、これだけで全平面に同じ位相枝を延長できるとは言えません。これは位相座標の障害であり、物理場の強さの発散を自動的に意味するものではありません。
<!-- solution-end -->

### 演習 QFT34-C1：Higgs機構の一連の検算

- Level: C
- 問題：$g,\lambda,v>0$、$D=\partial+igA$、$\mathcal L=-F^2/4+|D\Phi|^2-\lambda(|\Phi|^2-v^2/2)^2$ とする。次を順に示し、木レベルの結論と量子論の主張を分けて説明せよ。

  1. $\Phi_0=v/\sqrt2,A=0$ が零エネルギーの代表元であることと局所変換による同値性。
  2. $\Phi=(v+h+i\pi)/\sqrt2$ での二次作用、二つの質量二乗、混合項。
  3. $\Phi\ne0$ の近傍でのゲージ不変 $B$、Proca方程式、物理偏極と自由度の計数。
  4. $R_\xi$ 固定による混合の相殺、$\pi$ とghostの二次極、保存電流間交換核の $\xi$ 非依存性。
  5. [QFT33の大域的Goldstone定理](../QFT33/index.md#thm-qft33-goldstone)を物理的な質量零粒子の主張として直接適用できない理由。

<!-- solution-start -->
**詳細解答**

1. $F=0$、$D\Phi_0=0$、$V(\Phi_0)=0$ なので静的エネルギーの各非負項が零です。局所変換で $\Phi'=e^{-ig\chi}\Phi_0$、$A'=\partial\chi$ となりますが、[共変性](#thm-qft34-covariance)により $F'=0$、$D'\Phi'=0$、$|\Phi'|=v/\sqrt2$ で同じ物理配置です。
2. $|\Phi|^2-v^2/2=vh+(h^2+\pi^2)/2$ と $D\Phi=[\partial h-gA\pi+i(\partial\pi+gA(v+h))]/\sqrt2$ より

   $$
   \mathcal L_2=-\frac14F^2+\frac12(\partial h)^2-\lambda v^2h^2
   +\frac12(\partial\pi)^2+gvA\cdot\partial\pi+\frac12g^2v^2A^2.
   $$

   したがって $m_h^2=2\lambda v^2$、$m_A^2=g^2v^2$、混合項の符号はプラスです。
3. $\Phi=\rho e^{i\theta/v}/\sqrt2$ の局所表示で $B=A+\partial\theta/(gv)$ とすると、[正則な局所領域でのHiggs–Proca表示](#thm-qft34-unitary-proca)から二次作用は

   $$
   \mathcal L_2=-\frac14G(B)_{\mu\nu}G(B)^{\mu\nu}
   +\frac12m_A^2B_\mu B^\mu
   +\frac12(\partial h_u)^2-\frac12m_h^2h_u^2
   $$

   となります。[正の質量を持つProca場の三偏極](#thm-qft34-massive-polarizations)の発散制約 $\partial\cdot B=0$ と質量殻 $p^2=m_A^2$ によりベクトルは三偏極です。複素スカラーの二実成分と質量零ゲージ場の二物理偏極を合わせた四自由度は、動径場一つと質量あるベクトルの三偏極に対応し、$2+2=1+3=4$ です。
4. ゲージ固定 $\mathcal L_{\rm gf}=-(\partial\cdot A-\xi m_A\pi)^2/(2\xi)$ は $+m_A\pi\,\partial\cdot A$ を生み、もとの $m_AA\cdot\partial\pi=-m_A\pi\,\partial\cdot A$（境界項を除く）を相殺します。残る $-\xi m_A^2\pi^2/2$ から $\pi$ の二次極は $p^2=\xi m_A^2$ です。

   $\delta\pi=-g\chi(v+h)$、$\delta A_\mu=\partial_\mu\chi$ なので

   $$
   \frac{\delta\mathcal F}{\delta\chi}
   =\Box+\xi m_A^2+\xi g m_Ah,
   \qquad M=-\frac{\delta\mathcal F}{\delta\chi}.
   $$

   [QFT29の符号規約](../QFT29/index.md#def-qft29-fp-operator)でのghostの二次極も同じ $p^2=\xi m_A^2$ です。保存電流 $p\cdot J=p\cdot J'=0$ に対しては $JP^LJ'=0$ なので、[Rξ二次核](#thm-qft34-rxi-quadratic)から

   $$
   J^\mu D_{\mu\nu}J'^\nu
   =-i\frac{J\cdot J'}{p^2-m_A^2+i0}
   $$

   を得て、$\xi$ が消えます。
5. QFT33で仮定した保存電流の非零真空交換子は**大域的な物理対称性**のものです。ここで位相方向は局所ゲージ冗長性なので、$\pi$ を質量零物理粒子と断定できません。実際、$\pi$ のゲージ固定極は $\xi$ によって動き、正則な局所表示の物理的ベクトルは三偏極を持ちます。これらは定数真空周りの木レベルの計算であり、一般相互作用量子論の厳密スペクトルについての証明ではありません。
<!-- solution-end -->

## 8. まとめと次の問い

- 局所U(1)不変性を保ったまま、真空の非零半径がゲージ場に木レベル質量 $m_A=gv$ を与えます。
- 接線方向は独立な物理的Goldstone粒子ではなく、質量あるベクトルの第三偏極に対応し、物理自由度の総数は四つのままです。
- $R_\xi$ ゲージの $\pi$ やghostの極は計算上必要でもゲージ依存です。保存電流との交換のように、物理量となる組み合わせで依存性が消えることを検算しました。
- この章の計算はAbelian模型の木レベルです。次は電弱理論の $SU(2)\times U(1)$ の表現と、ゲージ場の混合・質量行列へ進みます。
