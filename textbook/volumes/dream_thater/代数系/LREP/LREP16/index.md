# LREP16 Diracスピノルとchirality

<!-- definition-example-audit: strict -->

前講では四元ベクトルに対応するガンマ行列を、Spin群の作用で変換しました。今回は行列を掛ける相手である四成分列そのものを調べます。上下の二成分がそれぞれ別の表現を担うことを利用して、四成分列から左右の成分を取り出す演算子を作ります。さらに、質量がある場合とない場合で左右の成分の方程式がどう変わるかを見ます。

## 1. 二つのWeyl空間を一つにする

$G=SL(2,\mathbb C)$ とし、$I=I_2$、$I_4$ をそれぞれ二次、四次の単位行列とします。複素共役転置を $\dagger$ と書きます。[左右Weylスピノル](../LREP12/index.md#def-lrep12-weyl)の左空間 $L$ と右空間 $R$ は別々の二次元複素空間です。左列 $u$ には $A$、右列 $r$ には $Q(A)=(A^\dagger)^{-1}$ が作用します。回転では作用が一致しますが、boostでは異なります。

前講の[Spin群とLorentz二重被覆](../LREP15/index.md#thm-lrep15-spin-cover)では両方の作用が一つの四次行列に入っていました。そこで[表現の直和](../LREP4/index.md#def-lrep4-direct-sum)を使います。$L,R$ の標準基底をこの順に並べた四つの基底をWeyl基底と呼びます。対 $(u,r)$ の成分を上下に並べれば、左の作用は上側、右の作用は下側のブロックに入ります。

<a id="def-lrep16-dirac"></a>

<!-- formal-statement-start -->
> **定義（Diracスピノル）**  
> $G=SL(2,\mathbb C)$ の左・右Weyl表現空間 $L,R$ の直和 $D=L\oplus R$ の元をDiracスピノルとする。Weyl基底での列と群作用は

$$
\psi=\begin{pmatrix}u\\r\end{pmatrix},
\qquad
S(A)=\begin{pmatrix}A&0\\0&(A^\dagger)^{-1}\end{pmatrix},
\qquad
\psi'=S(A)\psi .
$$

> ここで $u,r$ は二成分複素列、$A\in G$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep16-dirac -->
**定義の確認**。 $A=\operatorname{diag}(2,1/2)$ は対角成分を掛けると $\det A=2\cdot(1/2)=1$ となるので、可逆で $G$ に属します。$\psi=(1,2,3,4)^{\mathsf T}$ の上下を二成分ずつ分けると $u=(1,2)^{\mathsf T}$、$r=(3,4)^{\mathsf T}$。下側に作用する行列は $Q(A)=\operatorname{diag}(1/2,2)$ なので

$$
S(A)\psi=(2,1,3/2,8)^{\mathsf T}.
$$

また任意の $A,B\in G$ について $(AB)^\dagger=B^\dagger A^\dagger$ なので

$$
Q(AB)=(B^\dagger A^\dagger)^{-1}
=(A^\dagger)^{-1}(B^\dagger)^{-1}
=Q(A)Q(B).
$$

上下のブロックを掛ければ $S(AB)=S(A)S(B)$、$S(I)=I_4$ です。各作用は複素線形であり、$S(A^{-1})$ が逆行列になります。従って[有限次元複素線形表現](../LREP1/index.md#def-lrep1-linear-representation)の条件を満たし、例の列はこの表現空間の元です。
<!-- definition-example-end -->

[LREP11の既約表現の分類](../LREP11/index.md#thm-lrep11-group)では、この直和を $(\tfrac12,0)\oplus(0,\tfrac12)$ と書きます。[直和は表現となる](../LREP4/index.md#prop-lrep4-direct-sum)ことから、$L\oplus\{0\}$ と $\{0\}\oplus R$ は零でも全空間でもない不変部分空間です。従ってDirac表現は既約ではありません。ここでの表現は場の成分の変換を記述するものであり、質量が決まった粒子の状態空間の分類ではありません。

## 2. 左右を見分ける演算子

計量は前講と同じ $\eta=\operatorname{diag}(-1,1,1,1)$ です。[ガンマ行列](../LREP15/index.md#def-lrep15-gamma)のWeyl基底の表示を使います。

$$
\gamma^0=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\qquad
\gamma^j=\begin{pmatrix}0&\sigma_j\\\sigma_j&0\end{pmatrix}.
$$

ここで $j=1,2,3$、$\sigma_j$ は[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)です。どのガンマ行列も上下を交換します。四つを順番に掛ければ対角ブロックの行列になり、左右を符号で区別できます。この区別をchirality（カイラリティ）と呼び、以下の符号規約を採用します。

固有値 $\lambda$ に対応する成分とは、行列を作用させると $\lambda$ 倍される列です。零列も含めた条件 $Mv=\lambda v$ の解空間が固有空間です。

ここではガンマ行列の上付き番号 $0,1,2,3$ は行列を区別する添字であり、$\gamma^5$ の $5$ も五乗ではなく新しい演算子の名前です。

<a id="def-lrep16-chirality"></a>

<!-- formal-statement-start -->
> **定義（chirality演算子）**  
> 計量 $\eta=\operatorname{diag}(-1,1,1,1)$ に対する上記Weyl基底のガンマ行列から

$$
\gamma^5=i\gamma^0\gamma^1\gamma^2\gamma^3
$$

> と定める。固有値 $-1$ の固有空間を左、固有値 $+1$ の固有空間を右のchirality成分とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep16-chirality -->
**定義の確認**。 [Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)から $\sigma_2\sigma_3=i\sigma_1$、$\sigma_1^2=I$ です。二因子ずつ掛けると

$$
\gamma^0\gamma^1=\begin{pmatrix}\sigma_1&0\\0&-\sigma_1\end{pmatrix},
\qquad
\gamma^2\gamma^3=i\begin{pmatrix}\sigma_1&0\\0&\sigma_1\end{pmatrix}.
$$

従って

$$
\gamma^5=i^2\begin{pmatrix}I&0\\0&-I\end{pmatrix}
=\begin{pmatrix}-I&0\\0&I\end{pmatrix}.
$$

$\gamma^5(u,0)^{\mathsf T}=-(u,0)^{\mathsf T}$、$\gamma^5(0,r)^{\mathsf T}=(0,r)^{\mathsf T}$ です。逆に、$\gamma^5(u,r)^{\mathsf T}=-(u,r)^{\mathsf T}$ なら $r=-r$ より $r=0$、正符号の場合は $-u=u$ より $u=0$ です。従って固有空間はちょうど左・右のWeyl空間で、任意の四成分列はこの二つの和になります。
<!-- definition-example-end -->

時間方向と空間方向でガンマ行列の二乗が異なるので、四つの積に $i$ が必要です。これを外すと固有値は $\pm i$ となり、以下の射影の公式は成立しません。

<a id="prop-lrep16-chirality-algebra"></a>

<!-- formal-statement-start -->
> **命題（chirality演算子の恒等式）**  
> 上の計量・ガンマ行列・chirality演算子に対し、任意の $\mu=0,1,2,3$ および $A\in SL(2,\mathbb C)$ について

$$
(\gamma^5)^2=I_4,\qquad
\gamma^5\gamma^\mu=-\gamma^\mu\gamma^5,
\qquad
\gamma^5 S(A)=S(A)\gamma^5 .
$$
<!-- formal-statement-end -->

**証明の見取り図。** ガンマ行列とは反交換し、偶数個のガンマ行列の積とは可換になります。群作用は対角ブロックなので左右を混ぜません。

<!-- proof-start -->
### 証明

[ガンマ行列の反交換関係](../LREP15/index.md#def-lrep15-gamma)を使います。四因子の積を $W=\gamma^0\gamma^1\gamma^2\gamma^3$ と書きます。$W^2$ を添字ごとに並べ替えるには $3+2+1=6$ 回交換するので

$$
W^2=(-1)^6(\gamma^0)^2(\gamma^1)^2
(\gamma^2)^2(\gamma^3)^2=-I_4.
$$

従って $(iW)^2=I_4$ です。また各 $\gamma^\mu$ は自分以外の三つの因子と反交換するので $\gamma^\mu W=(-1)^3 W\gamma^\mu$ です。両辺に $i$ を掛ければ二番目の式が成立します。

[Diracスピノルの群作用](#def-lrep16-dirac)と[chirality演算子](#def-lrep16-chirality)のブロックを掛けると、どちらの順番でも

$$
\gamma^5 S(A)=
\begin{pmatrix}-A&0\\0&Q(A)\end{pmatrix}
=S(A)\gamma^5.
$$

これで三つの恒等式が成立します。$\square$
<!-- proof-end -->

## 3. 左右を取り出す射影

左右の固有値が $-1,+1$ なら、$I_4-\gamma^5$ は左だけを二倍し、$I_4+\gamma^5$ は右だけを二倍します。そこで二で割って取り出す操作にします。射影とは、ここでは目的の部分空間の成分を残し、もう一方の成分を零にする線形写像です。

<a id="def-lrep16-chiral-projectors"></a>

<!-- formal-statement-start -->
> **定義（chirality射影子）**  
> $D=\mathbb C^4$ 上の上記chirality演算子 $\gamma^5$ に対して、左・右のchirality射影子を

$$
P_L=\frac{I_4-\gamma^5}{2},\qquad
P_R=\frac{I_4+\gamma^5}{2}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep16-chiral-projectors -->
**定義の確認**。 [chirality演算子](#def-lrep16-chirality)の表示を代入すると

$$
P_L=\begin{pmatrix}I&0\\0&0\end{pmatrix},
\qquad
P_R=\begin{pmatrix}0&0\\0&I\end{pmatrix}.
$$

例えば $\psi=(2,i,-1,3)^{\mathsf T}$ なら $P_L\psi=(2,i,0,0)^{\mathsf T}$、$P_R\psi=(0,0,-1,3)^{\mathsf T}$ です。再度同じ射影を施しても変わらず、反対の射影を施すと零になります。和は元の列に戻り、それぞれの非零成分は対応する固有値を持ちます。
<!-- definition-example-end -->

<a id="prop-lrep16-projectors"></a>

<!-- formal-statement-start -->
> **命題（chirality射影の分解と交換則）**  
> 上記Dirac空間のchirality射影子は

$$
P_L^2=P_L,\quad P_R^2=P_R,\quad
P_LP_R=P_RP_L=0,\quad P_L+P_R=I_4
$$

> を満たす。任意の $\mu=0,1,2,3$ と $A\in SL(2,\mathbb C)$ に対して

$$
P_L\gamma^\mu=\gamma^\mu P_R,\qquad
P_R\gamma^\mu=\gamma^\mu P_L,
$$

$$
P_L S(A)=S(A)P_L,\qquad
P_R S(A)=S(A)P_R.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 二乗が単位行列であることと反交換関係だけで分解を導けます。

<!-- proof-start -->
### 証明

[chirality演算子の恒等式](#prop-lrep16-chirality-algebra)を使うと

$$
P_L^2=\frac{I_4-2\gamma^5+(\gamma^5)^2}{4}
=\frac{I_4-\gamma^5}{2}=P_L.
$$

右も符号を正にして展開すれば $P_R^2=(2I_4+2\gamma^5)/4=P_R$ です。積は $(I_4-(\gamma^5)^2)/4=0$、逆順でも零です。和は $2I_4/2=I_4$ です。従って全ての列が二つの像の和で表され、両方の像に属する列 $v$ は $v=P_Lv=P_LP_Rv=0$ なので和は直和です。

反交換関係から

$$
P_L\gamma^\mu
=\frac{\gamma^\mu-\gamma^5\gamma^\mu}{2}
=\gamma^\mu\frac{I_4+\gamma^5}{2}
=\gamma^\mu P_R.
$$

同じ反交換関係を正符号の式へ代入すると $P_R\gamma^\mu=\gamma^\mu(I_4-\gamma^5)/2=\gamma^\mu P_L$ です。$S(A)$ は $\gamma^5$ と可換なので両射影子とも可換です。$\square$
<!-- proof-end -->

[LREP13の空間反転による左右交換](../LREP13/index.md#prop-lrep13-parity-exchange)の行列を $T=\begin{pmatrix}0&I\\I&0\end{pmatrix}$ とします。$T^2=I_4$ なので $T^{-1}=T$ です。ブロック積を取ると

$$
T\gamma^5T^{-1}=
\begin{pmatrix}0&I\\-I&0\end{pmatrix}
\begin{pmatrix}0&I\\I&0\end{pmatrix}
=\begin{pmatrix}I&0\\0&-I\end{pmatrix}
=-\gamma^5.
$$

[chirality射影子](#def-lrep16-chiral-projectors)に代入すれば $TP_LT^{-1}=(I_4+\gamma^5)/2=P_R$ です。適正・時間向き保存Lorentz変換の持ち上げでは左右は保存されますが、空間反転では交換されるという違いが表れています。

## 4. 質量項が結ぶ二つの成分

ここでは自由場の一次方程式を具体例として用います。共変性と保存電流の導出は後の講義で扱います。自然単位 $c=\hbar=1$ を採用し、時間と空間の座標を $(x^0,x^1,x^2,x^3)=(t,x,y,z)$ とします。$\partial_\mu=\partial/\partial x^\mu$ は他の三座標を固定して各成分を微分する演算子です。特に $\partial_0=\partial_t$、$\partial_3=\partial_z$ で、以下 $\sum_j$ は $j=1,2,3$ の和です。$m\ge0$ を定数の質量とします。本講のガンマ行列では次の符号を採用します。

$$
(\mathcal D-m I_4)\psi=0,\qquad
\mathcal D=\sum_{\mu=0}^3\gamma^\mu\partial_\mu .
$$

場 $\psi:\mathbb R^4\to\mathbb C^4$ は滑らかとします。計量が $(-+++)$ であるため、[ガンマ行列の反交換関係](../LREP15/index.md#def-lrep15-gamma)を使って二乗を展開すると

$$
\begin{aligned}
\mathcal D^2\psi
&=\sum_{\mu=0}^3(\gamma^\mu)^2\partial_\mu^2\psi\\
&\quad+\sum_{\mu<\nu}(\gamma^\mu\gamma^\nu+\gamma^\nu\gamma^\mu)
\partial_\mu\partial_\nu\psi\\
&=I_4\left(-\partial_t^2+\sum_j\partial_j^2\right)\psi .
\end{aligned}
$$

第二の和は $0\le\mu<\nu\le3$ を動きます。行列は定数で、場の滑らかさから混合偏微分の順序を交換できるので、このようにまとめられます。質量も定数なので $(\mathcal D+mI_4)(\mathcal D-mI_4)=\mathcal D^2-m^2I_4$ となり、元の一次方程式に左から作用させると

$$
(-\partial_t^2+\textstyle\sum_j\partial_j^2-m^2)\psi=0.
$$

ここで質量項に余分な $i$ を掛けないことが符号の整合に重要です。

前節の $T$ は左右の表現を交換する行列として選んだもので、質量付き方程式の空間反転にそのまま使えるわけではありません。実際、$T\gamma^0T^{-1}=-\gamma^0$、$T\gamma^jT^{-1}=\gamma^j$ です。空間反転では空間微分だけが符号を変えるため、方程式のためには逆の符号の共役が必要です。例えば $i\gamma^0$ は $(i\gamma^0)^2=I_4$ で、反交換関係から時間行列を保ち、空間行列を反転します。この行列もchiralityを交換します。

<a id="prop-lrep16-mass-coupling"></a>

<!-- formal-statement-start -->
> **命題（質量項と左右成分の結合）**  
> 滑らかな四成分場 $\psi$、定数 $m\ge0$ に対し、上の一次方程式は次の連立方程式と同値である。

$$
\left(\partial_t+\sum_j\sigma_j\partial_j\right)r=mu,
$$

$$
\left(-\partial_t+\sum_j\sigma_j\partial_j\right)u=mr.
$$

> $m=0$ では二つの方程式は独立であり、$m>0$ で一方の成分が全域で零なら他方も零である。
<!-- formal-statement-end -->

**証明の見取り図。** 微分作用素はガンマ行列と同じ非対角ブロックを持つので左右を交換します。一方、質量項は対角ブロックであり、それぞれ同じ成分に作用します。

<!-- proof-start -->
### 証明

[ガンマ行列の定義](../LREP15/index.md#def-lrep15-gamma)の具体形を代入し、各成分へ微分を作用させます。

$$
\mathcal D-m I_4=
\begin{pmatrix}
-mI&\partial_t+\sum_j\sigma_j\partial_j\\
-\partial_t+\sum_j\sigma_j\partial_j&-mI
\end{pmatrix}.
$$

この行列を $\psi=(u,r)^{\mathsf T}$ に掛け、上下それぞれを零とおくと主張の連立方程式になります。逆に二式が成立すれば上下のブロックがともに零になるので元の一次方程式が成立します。[chirality射影の分解と交換則](#prop-lrep16-projectors)でも、射影子は定数行列なので微分と可換であり、$P_L\mathcal D\psi=\mathcal D P_R\psi$ となることから同じ交換を確認できます。

$m=0$ なら右辺がともに零で、$r$ と $u$ の方程式を別々に解けます。$m>0$ で例えば $r\equiv0$ ならその微分も零なので第一式は $mu=0$ となり $u\equiv0$ です。$u\equiv0$ なら第二式から $r\equiv0$ です。$\square$
<!-- proof-end -->

例えば空間に依存しない場で $m>0$、$u(t)=e^{-imt}u_0$ とします。$u_0$ は定数の非零二成分列です。

空間偏微分は零で、時間偏微分はこの場合に限り一変数の常微分 $d/dt$ と一致します。指数関数の連鎖律により $\partial_t u=-im u$ なので、[質量項と左右成分の結合](#prop-lrep16-mass-coupling)の第二式は

$$
im u=mr,\qquad r=iu
$$

となります。最後の等式では $m>0$ を使いました。第一式に代入すると

$$
\partial_t r=i(-im)u=mu
$$

となり成立します。静止系の正周波数の例でも左右成分がともに必要であることが分かります。

## 5. chiralityとhelicityは何が違うか

chiralityは四成分の表現空間を分ける固有値です。これに対しhelicity（ヘリシティ）は、運動量の向きに沿ったスピンの成分を測る量です。ここでは運動量 $\boldsymbol p=(p^1,p^2,p^3)\ne0$ を持つ平面波の四成分係数に作用する演算子を使います。$|\boldsymbol p|=\sqrt{(p^1)^2+(p^2)^2+(p^3)^2}$ は空間運動量のEuclidノルムです。

回転部分群 $SU(2)$ では $Q(U)=U$ なので、Dirac表現を回転に制限すると同じ二次元ユニタリ表現が上下に並びます。[角運動量演算子の定義と標準表現の計算](../LREP7/index.md#def-lrep7-angular-momentum)により、$j$ 軸回りの回転 $U_j(\theta)=\exp(-i\theta\sigma_j/2)$ の生成子は

$$
J_j=\left.i\frac{d}{d\theta}S(U_j(\theta))\right|_{\theta=0}
=\frac12\begin{pmatrix}\sigma_j&0\\0&\sigma_j\end{pmatrix}.
$$

ここで微分変数 $\theta$ は回転角であり、時刻ではありません。運動方向の単位ベクトルの成分 $p^j/|\boldsymbol p|$ で三つの $J_j$ を重み付けして足せば、その方向のスピン成分を測る演算子になります。

<a id="def-lrep16-helicity"></a>

<!-- formal-statement-start -->
> **定義（helicity演算子とDiracスピノルのヘリシティ）**  
> 非零の実三次元運動量 $\boldsymbol p$ に対して、Dirac空間上のhelicity演算子を

$$
h_{\boldsymbol p}=\frac{1}{2|\boldsymbol p|}
\begin{pmatrix}\sum_jp^j\sigma_j&0\\0&\sum_jp^j\sigma_j\end{pmatrix}
$$

> とする。Diracスピノルのヘリシティ（helicity）は、非零の四成分係数がこの演算子の固有ベクトルであるときの固有値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep16-helicity -->
**定義の確認**。 $\boldsymbol p=(0,0,k)$、$k>0$ なら $h_{\boldsymbol p}=\operatorname{diag}(1,-1,1,-1)/2$ です。標準基底の第一、第三列は固有値 $+1/2$、第二、第四列は $-1/2$ を持ちます。

一般方向でも[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)に $\boldsymbol x=\boldsymbol y=\boldsymbol p$ を代入すると外積は零なので、

$$
\left(\sum_jp^j\sigma_j\right)^2=|\boldsymbol p|^2I,
\qquad h_{\boldsymbol p}^2=\frac{I_4}{4}
$$

となります。

各Pauli行列は複素共役転置で自分自身に戻り、係数 $p^j/(2|\boldsymbol p|)$ は実数なので、$h_{\boldsymbol p}^\dagger=h_{\boldsymbol p}$ です。

非零列 $v$ が $h_{\boldsymbol p}v=\lambda v$ を満たすなら、もう一度作用させて $\lambda^2v=v/4$ となり、$\lambda=\pm1/2$ に限られます。
<!-- definition-example-end -->

ここでの作用対象は有限次元の場の係数です。一粒子状態空間上の運動方向に沿った回転生成子による定義とは、作用空間を区別して扱います。

方向を逆にすると $h_{-\boldsymbol p}=-h_{\boldsymbol p}$ ですが、$\gamma^5$ は変わりません。静止系では $\boldsymbol p=0$ のためhelicityの定義に分母が零になり、運動方向を指定できません。chiralityは静止系でも演算子として定義されています。

質量零の場合に二つの概念が結び付く理由を、正周波数の平面波一つで確認します。$k>0$、$E>0$ として

$$
\psi(t,z)=e^{-iEt+ikz}\begin{pmatrix}u_0\\r_0\end{pmatrix}
$$

と置きます。$u_0,r_0$ は定数の二成分列です。指数関数を $f=e^{-iEt+ikz}$ と書けば $f\ne0$ で、連鎖律から

$$
\partial_t f=-iEf,\qquad
\partial_z f=ikf,\qquad
\partial_x f=\partial_y f=0
$$

です。ここで $E$ は時間周波数（自然単位でエネルギー）、$k$ は $z$ 方向の運動量です。[質量項と左右成分の結合](#prop-lrep16-mass-coupling)に $m=0$ を代入すると

$$
i(-E I+k\sigma_3)r_0=0,\qquad
i(E I+k\sigma_3)u_0=0.
$$

$\sigma_3=\operatorname{diag}(1,-1)$ なので、二つの係数行列はそれぞれ

$$
-E I+k\sigma_3=\operatorname{diag}(-E+k,-E-k),
\qquad E I+k\sigma_3=\operatorname{diag}(E+k,E-k)
$$

です。

$E,k>0$ なら $E+k\ne0$ であり、$E\ne k$ のときはどちらの行列も可逆なので零解しかありません。従って非零解があるには $E=k$ が必要です。すると

$$
\sigma_3r_0=r_0,\qquad \sigma_3u_0=-u_0
$$

です。

[helicity演算子](#def-lrep16-helicity)はこの方向では $\operatorname{diag}(\sigma_3,\sigma_3)/2$ なので、非零の右成分はhelicity $+1/2$、非零の左成分は $-1/2$ です。両成分が非零の重ね合わせ全体はhelicity固有ベクトルではありません。

これは方程式と正周波数・非零運動量の条件を使った結論で、四成分空間上の二演算子が等しいという意味ではありません。負周波数も含む解の分類や粒子・反粒子の区別は後の講義で扱います。

## 6. 演習

### Level A

<a id="ex-lrep16-a01"></a>

#### LREP16-A01 直和の作用
- Level: A
- ID: LREP16-A01

$A=\operatorname{diag}(3,1/3)$、$\psi=(2,3,4,6)^{\mathsf T}$ に対し $S(A)\psi$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\det A=1$ なので[Diracスピノルの群作用](#def-lrep16-dirac)を使えます。$Q(A)=\operatorname{diag}(1/3,3)$ です。左列は $(6,1)^{\mathsf T}$、右列は $(4/3,18)^{\mathsf T}$ に移るので $S(A)\psi=(6,1,4/3,18)^{\mathsf T}$ です。
<!-- solution-end -->

<a id="ex-lrep16-a02"></a>

#### LREP16-A02 四因子積の符号
- Level: A
- ID: LREP16-A02

$W=\gamma^0\gamma^1\gamma^2\gamma^3$ とする。$W^2$ と $(-iW)^2$ を求め、$-iW$ の固有値と本講の左右の対応を比較せよ。

<!-- solution-start -->
**詳細解答。** [chirality演算子の恒等式](#prop-lrep16-chirality-algebra)の並べ替えでは6回交換し、時間因子だけが二乗 $-I_4$ です。従って $W^2=-I_4$、$(-iW)^2=(-1)(-I_4)=I_4$ です。[chirality演算子](#def-lrep16-chirality)より $-iW=-\gamma^5=\operatorname{diag}(I,-I)$ なので左が $+1$、右が $-1$ になり、本講の符号と逆になります。
<!-- solution-end -->

<a id="ex-lrep16-a03"></a>

#### LREP16-A03 左右の射影
- Level: A
- ID: LREP16-A03

$\psi=(1,i,2,-i)^{\mathsf T}$ に対し $P_L\psi,P_R\psi,\gamma^5\psi$ を求めよ。

<!-- solution-start -->
**詳細解答。** [chirality射影子](#def-lrep16-chiral-projectors)の対角ブロックを掛けると

$$
P_L\psi=(1,i,0,0)^{\mathsf T},
\quad P_R\psi=(0,0,2,-i)^{\mathsf T}.
$$

また $\gamma^5=P_R-P_L$ なので $\gamma^5\psi=(-1,-i,2,-i)^{\mathsf T}$。二つの射影の和は元の列です。
<!-- solution-end -->

<a id="ex-lrep16-a04"></a>

#### LREP16-A04 運動方向の反転
- Level: A
- ID: LREP16-A04

$v=(1,0,0,0)^{\mathsf T}$ のchiralityと、運動量 $(0,0,2)$ および $(0,0,-2)$ に対するhelicityを求めよ。

<!-- solution-start -->
**詳細解答。** [chirality演算子](#def-lrep16-chirality)は $\gamma^5v=-v$ なので左です。[helicity演算子](#def-lrep16-helicity)は正方向では $\operatorname{diag}(1,-1,1,-1)/2$、負方向ではその負です。従って固有値は順に $+1/2,-1/2$。運動方向だけを逆にしてもchiralityは変わりません。
<!-- solution-end -->

### Level B

<a id="ex-lrep16-b01"></a>

#### LREP16-B01 ガンマ行列による左右交換
- Level: B
- ID: LREP16-B01

$w=(1,i,0,0)^{\mathsf T}$ に対し $\gamma^0 w,\gamma^2 w$ を求めよ。各像のchiralityを確認し、ガンマ行列を二つ続けて掛けた場合を一般に説明せよ。

<!-- solution-start -->
**詳細解答。** [ガンマ行列](../LREP15/index.md#def-lrep15-gamma)の下側非対角ブロックは時間では $-I$、空間の第二方向では $\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$ です。後者を $(1,i)^{\mathsf T}$ に掛けると $(1,i)^{\mathsf T}$ です。従って

$$
\gamma^0 w=(0,0,-1,-i)^{\mathsf T},
\quad
\gamma^2 w=(0,0,1,i)^{\mathsf T}.
$$

両方とも右です。[chirality演算子の恒等式](#prop-lrep16-chirality-algebra)を二回使うと

$$
\gamma^5\gamma^\mu\gamma^\nu
=-\gamma^\mu\gamma^5\gamma^\nu
=\gamma^\mu\gamma^\nu\gamma^5.
$$

従って二因子の積は元のchiralityを保ちます。
<!-- solution-end -->

<a id="ex-lrep16-b02"></a>

#### LREP16-B02 空間反転と射影
- Level: B
- ID: LREP16-B02

$T=\begin{pmatrix}0&I\\I&0\end{pmatrix}$ とする。$T\gamma^5T^{-1}$ と $TP_LT^{-1}$ をブロック積から求めよ。

<!-- solution-start -->
**詳細解答。** $T^2=I_4$ なので $T^{-1}=T$ です。[chirality演算子](#def-lrep16-chirality)を代入すると

$$
T\gamma^5=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\qquad
T\gamma^5T^{-1}=\begin{pmatrix}I&0\\0&-I\end{pmatrix}.
$$

従って結果は $-\gamma^5$ です。[chirality射影子](#def-lrep16-chiral-projectors)の式へ代入すると

$$
TP_LT^{-1}=(I_4+\gamma^5)/2=P_R.
$$

空間反転は左右を交換します。
<!-- solution-end -->

<a id="ex-lrep16-b03"></a>

#### LREP16-B03 静止系の負周波数
- Level: B
- ID: LREP16-B03

$m>0$ で空間に依存しない場 $u(t)=e^{imt}u_0$ を与える。連立方程式を満たす $r$ を求め、両式を検算せよ。

<!-- solution-start -->
**詳細解答。** [質量項と左右成分の結合](#prop-lrep16-mass-coupling)に空間微分が零であることを代入すると $\partial_t r=mu$、$-\partial_t u=mr$ です。空間に依存しないので $\partial_tu=du/dt$ であり、指数関数の連鎖律で $du/dt=imu$ となります。後式に代入し、$m>0$ を使って割れば $r=-iu$ です。前式の左辺は $\partial_t r=-i(im)u=mu$ であり成立します。$u_0\ne0$ なら左右とも非零です。
<!-- solution-end -->

<a id="ex-lrep16-b04"></a>

#### LREP16-B04 一般方向のhelicity
- Level: B
- ID: LREP16-B04

$\boldsymbol p=(3,4,0)$ とする。二成分行列 $M=\sum_jp^j\sigma_j$ の固有値と固有ベクトルを各一つ求め、それを上下どちらのブロックに置いてもhelicityが同じことを示せ。

<!-- solution-start -->
**詳細解答。** [Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)を代入すると

$$
M=\begin{pmatrix}0&3-4i\\3+4i&0\end{pmatrix},
\qquad M^2=25I.
$$

$v_+=(3-4i,5)^{\mathsf T}$、$v_-=(3-4i,-5)^{\mathsf T}$ と置くと

$$
Mv_+=(5(3-4i),25)^{\mathsf T}=5v_+,
$$

$$
Mv_-=(-5(3-4i),25)^{\mathsf T}=-5v_-.
$$

[helicity演算子](#def-lrep16-helicity)は上下同じ $M/10$ なので $(v_+,0)^{\mathsf T}$ と $(0,v_+)^{\mathsf T}$ はともに固有値 $1/2$、$v_-$ を用いた二列はともに $-1/2$ です。左右のchiralityは異なってもhelicityは一致し得ます。
<!-- solution-end -->

### Level C

<a id="ex-lrep16-c01"></a>

#### LREP16-C01 質量のある平面波から質量零へ
- Level: C
- ID: LREP16-C01

$m>0$、$k>0$、$E>0$ とし、$\psi=e^{-iEt+ikz}(u_0,r_0)^{\mathsf T}$ を考える。$u_0=(0,1)^{\mathsf T}$ と固定して、一次方程式が成立する $E$ と $r_0$ を求めよ。$k$ を固定して $m\to0+$ としたときのchiralityとhelicityを調べよ。

<!-- solution-start -->
**詳細解答。** [質量項と左右成分の結合](#prop-lrep16-mass-coupling)に平面波の微分を代入します。$f=e^{-iEt+ikz}$ とおくと $\partial_t f=-iEf$、$\partial_z f=ikf$、$\partial_x f=\partial_y f=0$ です。$u_0,r_0$ は定数列なので微分は $f$ のみに作用し、$f\ne0$ により共通因子を消去できます。

$$
i(-EI+k\sigma_3)r_0=mu_0,\qquad
i(EI+k\sigma_3)u_0=mr_0.
$$

$\sigma_3u_0=-u_0$ で $m>0$ なので第二式から

$$
r_0=\frac{i(E-k)}{m}u_0.
$$

これを第一式に代入すると

$$
i(-E-k)\frac{i(E-k)}{m}u_0
=\frac{E^2-k^2}{m}u_0=mu_0.
$$

$u_0\ne0$、$E>0$ より $E=\sqrt{k^2+m^2}$。従って

$$
r_0=\frac{im}{\sqrt{k^2+m^2}+k}u_0.
$$

分母は正で、$m>0$ なら右列も非零です。[chirality射影子](#def-lrep16-chiral-projectors)で左右を取り出せますが、質量がある間はどちらか一方だけの列ではありません。一方、両ブロックとも $\sigma_3$ の固有値 $-1$ の列なので、[helicity演算子](#def-lrep16-helicity)の固有値は $-1/2$ です。

$k>0$ を固定した極限では分母は $2k$ へ収束するので $r_0\to0$、$E\to k$。極限の四成分列は $(u_0,0)^{\mathsf T}$ であり、chiralityの固有値は $-1$、helicityは $-1/2$ です。これは正周波数の特定の平面波についての極限であり、静止系への極限とは異なります。
<!-- solution-end -->

## 7. まとめと次講

Dirac空間は左右Weyl空間の直和です。四つのガンマ行列の積から作ったchirality演算子は左右を符号で区別し、射影子はそれぞれの成分を取り出します。Spin群の作用は左右を保ち、単独のガンマ行列と空間反転は左右を交換します。自由な一次方程式では質量零のときだけ左右の方程式が独立になります。次講では四成分列からLorentz変換に対して一定の規則で変換する量を作ります。
