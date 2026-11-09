# GMT8 例外方向の定量評価

<!-- definition-example-audit: strict -->

[GMT5の平面Marstrand射影次元定理](../GMT5/index.md#thm-gmt5-marstrand-dimension)は、ほとんど全ての方向で射影の次元が最大になることを示しました。しかし、測度が零の方向集合も、Hausdorff次元は $1$ に近いことがあります。では「射影の次元が $t$ より小さくなる方向」は、どれほど多く存在できるのでしょうか。

この講義では、**空間の集合に置く測度**と**方向集合に置く測度**を同時に用います。前者のenergyは[GMT3のRiesz energy](../GMT3/index.md#def-gmt3-riesz-energy)、後者の球成長は[GMT2のFrostman測度](../GMT2/index.md#def-gmt2-frostman-measure)です。この二つを結ぶのが、射影距離が小さくなる方向の確率の評価です。

以下、$\dim_H$ は[Hausdorff次元](../../MT/MT8/index.md#def-mt8-hausdorff-dimension)とします。方向は向きのない直線であり、角度 $\theta$ と $\theta+\pi$ を同一視します。

## 1. 例外方向と角度の距離

$\theta\in\mathbb T_\pi:=\mathbb R/\pi\mathbb Z$ に対応する単位ベクトルを $e_\theta=(\cos\theta,\sin\theta)$ とし、平面の直交射影を

$$
\pi_\theta(x)=x\cdot e_\theta\in\mathbb R
$$

と表します。これは[GMT5の直交射影](../GMT5/index.md#def-gmt5-orthogonal-projection)を、同じ直線の二通りの向きを同一視して記したものです。$\pi_{\theta+\pi}=-\pi_\theta$ ですが、影のHausdorff次元は等しいため、方向は $\mathbb T_\pi$ 上で数えます。

方向同士の距離は

$$
\rho(\theta,\phi)=\min_{k\in\mathbb Z}|\theta-\phi-k\pi|\in[0,\pi/2]
$$

です。これは直線の鋭角を測る距離で、通常の角度区間の距離と局所的に等しいので、方向集合のHausdorff次元も同じように計算できます。

例えば $z=(0,1)$ は $\pi_0z=0$、一方で $\pi_{\pi/2}z=1$ です。水平方向に射影したときだけ縦の差が消えます。この「消える方向」の近くでどの程度の角度測度が集まるかが問題です。

<a id="def-gmt8-exceptional-directions"></a>

<!-- formal-statement-start -->
> **定義（射影次元の例外方向集合）**  
> $E\subset\mathbb R^2$ を非空Borel集合、$0<t<1$ とする。$\mathbb T_\pi=\mathbb R/\pi\mathbb Z$ において、射影 $\pi_\theta(x)=x\cdot(\cos\theta,\sin\theta)$ のHausdorff次元が $t$ 未満になる方向の集合を

$$
\mathcal E_t(E)=\{\theta\in\mathbb T_\pi:\dim_H(\pi_\theta E)<t\}
$$

> と定める。方向集合の次元は距離 $\rho(\theta,\phi)=\min_{k\in\mathbb Z}|\theta-\phi-k\pi|$ に関して測る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt8-exceptional-directions -->
**定義の確認**

**水平線分**

$E=[0,1]\times\{0\}$ とします。$\pi_\theta E$ は端点 $0$ と $\cos\theta$ を持つ区間なので、$\cos\theta\ne0$ のとき次元は $1$、$\theta=\pi/2$ のとき一点で次元は $0$ です。$0<t<1$ なら

$$
\mathcal E_t(E)=\{\pi/2\},\qquad\dim_H\mathcal E_t(E)=0.
$$

例外方向の判定では影の**長さ**ではなく**次元**を比較しています。$\theta+\pi$ は同じ方向ですから、一方向を二重に数えていません。
<!-- definition-example-end -->

方向集合へFrostman測度を置くため、球成長条件を角度に書き直します。

<a id="def-gmt8-angular-frostman"></a>

<!-- formal-statement-start -->
> **定義（方向上のFrostman測度）**  
> $0<\beta\le1$、$F\subset\mathbb T_\pi$ をコンパクト集合とする。$F$ に台を持つBorel確率測度 $\sigma$ が**指数 $\beta$ の方向Frostman測度**であるとは、ある有限定数 $A$ が存在して、全ての $\phi\in\mathbb T_\pi$、$0<r\le\pi/2$ に対し

$$
\sigma\{\theta:\rho(\theta,\phi)<r\}\le Ar^\beta
$$

> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt8-angular-frostman -->
**定義の確認**

**一様方向分布**

$F=\mathbb T_\pi$ に正規化角度測度 $d\sigma=d\theta/\pi$ を取ります。$0<r\le\pi/2$ の距離球は角度の長さが $2r$ の区間なので

$$
\sigma(B_\rho(\phi,r))=\frac{2r}{\pi}.
$$

従って $\beta=1$、$A=2/\pi$ で条件を満たし、確率であることも $\int_0^\pi d\theta/\pi=1$ から確認できます。指数 $\beta<1$ についても $r\le\pi/2$ と $r=r^\beta r^{1-\beta}$ から、定数を大きくすれば条件を満たします。
<!-- definition-example-end -->

## 2. 射影が小さくなる方向を数える

$z=x-y\ne0$ の方向角を $\alpha$ とします。$z$ に垂直な射影方向は $\phi_z=\alpha+\pi/2$（$\pi$ を法として）です。射影長と角度距離を結ぶ恒等式は

$$
\frac{|\pi_\theta z|}{|z|}=|\cos(\theta-\alpha)|
=\sin\rho(\theta,\phi_z).
$$

$0\le u\le\pi/2$ では $2u/\pi\le\sin u\le u$ です。例えば下界は $\sin$ の凹性と両端 $(0,0),(\pi/2,1)$ を結ぶ弦から従います。この比較によって、射影長が小さいことを、方向が $\phi_z$ に近いことへ変換できます。

<a id="lem-gmt8-transversality"></a>

<!-- formal-statement-start -->
> **補題（方向Frostman測度による小射影確率）**  
> $0<\beta\le1$ とし、$\sigma$ を $\mathbb T_\pi$ 上のBorel確率測度で、全 $\phi$ と $0<r\le\pi/2$ について $\sigma(B_\rho(\phi,r))\le Ar^\beta$ を満たすものとする。$z\in\mathbb R^2\setminus\{0\}$ と $0<u\le1/2$ に対し

$$
\sigma\{\theta:|\pi_\theta z|<u|z|\}
\le A\left(\frac\pi2\right)^\beta(2u)^\beta.
$$
<!-- formal-statement-end -->

### 証明の見取り図

射影が短い方向は、$z$ に垂直な一方向の近傍に収まります。角度距離の球へ置き換えて球成長条件を使うだけですが、$z$ の長さが定数に残らない点が重要です。

<!-- proof-start -->
### 証明

$\phi_z=\alpha+\pi/2$ と置きます。$\sin\rho(\theta,\phi_z)<u$ なら、$\rho\le\pi\sin\rho/2<\pi u/2$ です。したがって集合の包含

$$
\{\theta:|\pi_\theta z|<u|z|\}
\subset B_\rho(\phi_z,\pi u/2)
$$

を得ます。$u\le1/2$ なら半径 $\pi u/2\le\pi/4$ はFrostman条件の範囲内です。よって、より強い評価

$$
\sigma\{\theta:|\pi_\theta z|<u|z|\}
\le A(\pi u/2)^\beta
$$

が成立し、主張の右辺でも上から抑えられます。$z$ は垂直方向の中心を決めるだけで、係数は $z$ に依存しません。$\square$
<!-- proof-end -->

## 3. 方向の平均と二重energy

固定方向で $\pi_\theta(x-y)=0$ になると、射影後の負べき核は無限大になります。しかし小射影の方向が十分少なければ、方向全体で平均した値は有限です。

<a id="lem-gmt8-angular-kernel"></a>

<!-- formal-statement-start -->
> **補題（Frostman方向平均の特異核）**  
> $0<t<\beta\le1$ とし、$\sigma$ を $\mathbb T_\pi$ 上のBorel確率測度で $\sigma(B_\rho(\phi,r))\le Ar^\beta$（全 $\phi$、$0<r\le\pi/2$）を満たすものとする。このとき $x\ne y\in\mathbb R^2$ に対して

$$
\int_{\mathbb T_\pi}|\pi_\theta x-\pi_\theta y|^{-t}\,d\sigma(\theta)
\le C(A,\beta,t)|x-y|^{-t},
$$

> ただし $C(A,\beta,t)<\infty$ は $x,y$ に依存しない。負べき核は零点で $+\infty$ と定める。
<!-- formal-statement-end -->

### 証明の見取り図

射影距離を $|x-y|$ で割り、$2^{-j}$ の大きさごとに方向を分割します。核の増大は $2^{jt}$、その方向の測度は $2^{-j\beta}$ であり、$\beta>t$ が級数を収束させます。

<!-- proof-start -->
### 証明

$z=x-y\ne0$、$q(\theta)=|\pi_\theta z|/|z|\in[0,1]$ とします。$q\ge1/2$ の寄与は確率測度であるため高々 $2^t$ です。$j=1,2,\ldots$ について

$$
D_j=\{\theta:2^{-j-1}\le q(\theta)<2^{-j}\}
$$

とおけば、$D_j$ 上で $q^{-t}\le2^{(j+1)t}$。また[小射影確率補題](#lem-gmt8-transversality)を $u=2^{-j}$ に適用すると

$$
\sigma(D_j)\le A(\pi/2)^\beta 2^{-j\beta}.
$$

従って

$$
\begin{aligned}
\int q(\theta)^{-t}\,d\sigma(\theta)
&\le2^t+A(\pi/2)^\beta2^t
\sum_{j=1}^\infty2^{-j(\beta-t)}\\
&=2^t+A(\pi/2)^\beta2^t
\frac{2^{-(\beta-t)}}{1-2^{-(\beta-t)}}<\infty.
\end{aligned}
$$

$q=0$ の集合は $\{q<2^{-j}\}$ に全ての $j$ で含まれ、その測度は $j\to\infty$ で0になるため無視できます。最後に $|\pi_\theta z|^{-t}=|z|^{-t}q(\theta)^{-t}$ を戻します。$\square$
<!-- proof-end -->

**境界条件を検算する。** $\beta=t$ では幾何級数の各項が一定になり、この証明は成立しません。単に「証明法が弱い」だけでなく、後の演習B2では条件を満たす測度で核積分が実際に発散する例を構成します。

<a id="prop-gmt8-double-energy"></a>

<!-- formal-statement-start -->
> **命題（二重energyの方向平均）**  
> $0<t<\beta\le1$ とする。$\mu$ を $\mathbb R^2$ 上の有限非負Borel測度で $I_t(\mu)<\infty$ とし、$\sigma$ を $\mathbb T_\pi$ 上のFrostman指数 $\beta$、球成長定数 $A$ のBorel確率測度とする。$\nu_\theta=(\pi_\theta)_\#\mu$ と置くと、

$$
\int_{\mathbb T_\pi}I_t(\nu_\theta)\,d\sigma(\theta)
\le C(A,\beta,t)I_t(\mu)<\infty.
$$

> 従って $\sigma$ ほとんど全ての $\theta$ について、$I_t(\nu_\theta)<\infty$ である。
<!-- formal-statement-end -->

### 証明の見取り図

押し出し測度を二重積分へ戻し、非負積分の順番を交換します。$\mu$ の対角に質量がないことも、energy有限性から確認します。

<!-- proof-start -->
### 証明

[Riesz energyの定義](../GMT3/index.md#def-gmt3-riesz-energy)により $I_t(\mu)=\iint|x-y|^{-t}d\mu(x)d\mu(y)$ です。$I_t(\mu)<\infty$ より $\mu\times\mu$ は対角 $\{x=y\}$ に質量を持ちません。実際、対角で被積分関数が $+\infty$ だからです。

各 $\theta$ に対して押し出し測度の定義を二度適用すると

$$
I_t(\nu_\theta)
=\iint_{\mathbb R^2\times\mathbb R^2}
|\pi_\theta x-\pi_\theta y|^{-t}\,d\mu(x)d\mu(y).
$$

被積分関数は $(\theta,x,y)$ の非負Borel関数です。[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で積分順序を交換し、対角を除く各 $(x,y)$ に[方向平均核の補題](#lem-gmt8-angular-kernel)を適用すると

$$
\begin{aligned}
\int I_t(\nu_\theta)d\sigma(\theta)
&=\iint\left(\int|\pi_\theta(x-y)|^{-t}
d\sigma(\theta)\right)d\mu(x)d\mu(y)\\
&\le C(A,\beta,t)
\iint|x-y|^{-t}d\mu(x)d\mu(y)\\
&=C(A,\beta,t)I_t(\mu).
\end{aligned}
$$

右辺が有限で左辺は非負なので、$I_t(\nu_\theta)=\infty$ の方向の $\sigma$ 測度は0です。$\square$
<!-- proof-end -->

ここで2種類の測度の役割が違います。$\mu$ は空間内の点対 $x,y$ を選び、$\sigma$ はその差が潰れる方向を選びます。方向上の高い指数 $\beta$ が、空間内の $t$-energyを射影後にも運べることを意味します。

## 4. Kaufman型の例外方向次元上界

コンパクト集合の議論は、これまでのFrostman補題をそのまま使えます。一般Borel集合の場合に必要な補足は次節で切り分けます。

まず、方向側の例外集合からもコンパクトな部分集合を取り出せるように、Borel集合の次元近似の道具を明記します。

<a id="lem-gmt8-compact-core"></a>

<!-- formal-statement-start -->
> **補題（Borel集合のHausdorff次元のコンパクト芯）**  
> $X$ を $\mathbb R^n$ のBorel部分集合、$0<s<\dim_HX$ とする。このときコンパクト集合 $K\subset X$ で $\dim_HK>s$ を満たすものが存在する。円周の有限個の角度座標で表せるBorel集合にも同じ結論が成立する。
<!-- formal-statement-end -->

この補題は、Borel集合が持つHausdorff容量の**内側からの近似可能性（capacitability）**に基づきます。一般Borel集合は必ずしも $\sigma$-コンパクトではなく、有限被覆の議論だけでこの主張を示すことはできません。ここでは記述集合論のChoquet容量定理を使う測度論的補題として採用します。対象はBorel集合（実際には解析集合まで）であり、任意の非可測集合への拡張を主張していません。以下の幾何学的な二重energy部分はこの補題とは独立に完全に証明できます。

**可測性の確認。** コンパクト $K$ について、角度を動かすと射影像の点は一様に少ししか動きません。実際、$R=\sup_{x\in K}|x|<\infty$ とすれば、対応点の射影値の差は

$$
|\pi_\theta x-\pi_\phi x|
\le R|e_\theta-e_\phi|\longrightarrow0
$$

で一様に小さくなります。コンパクト集合のHausdorff $q$-内容量を直径 $<\delta$ の有限開被覆で定義すると、固定した $q,\delta$ では集合の小さな摂動に対する上半連続な近似を取り、$\delta\downarrow0$ の可算極限から $\theta\mapsto\mathcal H^q(\pi_\theta K)$ がBorel可測と分かります。さらに

$$
\{\dim_H\pi_\theta K<t\}
=\bigcup_{q\in\mathbb Q\cap(0,t)}
\{\mathcal H^q(\pi_\theta K)=0\}
$$

だから $\mathcal E_t(K)$ はBorel集合です。ここで $\dim_HF<t$ なら $\dim_HF<q<t$ を満たす有理数 $q$ が選べること、$\mathcal H^q(F)=0$ なら $\dim_HF\le q$ を使いました。

<a id="thm-gmt8-kaufman-compact"></a>

<!-- formal-statement-start -->
> **定理（Kaufman型例外方向上界：コンパクト版）**  
> $K\subset\mathbb R^2$ を非空コンパクト集合、$0<t<\min\{\dim_HK,1\}$ とする。$\pi_\theta(x)=x\cdot(\cos\theta,\sin\theta)$ について

$$
\dim_H\{\theta\in\mathbb T_\pi:\dim_H(\pi_\theta K)<t\}\le t.
$$
<!-- formal-statement-end -->

### 証明の見取り図

もし悪い方向の次元が $t$ より大きければ、そこへ指数 $\beta>t$ のFrostman確率測度 $\sigma$ を置けます。一方で $K$ には有限 $t$-energyを持つ $\mu$ を置けます。[二重energyの方向平均](#prop-gmt8-double-energy)により $\sigma$-ほとんど全ての方向で射影後の $t$-energyは有限となり、「影の次元は $t$ 未満」という仮定と矛盾します。

<!-- proof-start -->
### 証明

$D=\dim_HK$ とし、$t<u<D$ を選びます（$t<1$ も仮定済み）。
[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)を指数 $u$ で $K$ に適用します。すると $K$ 上の確率測度 $\mu$ と定数 $M$ が存在し、全ての球に対して

$$
\mu(B(x,r))\le Mr^u
$$

を満たします。[GMT3の球成長からのenergy評価](../GMT3/index.md#thm-gmt3-frostman-energy)において $t<u$ と対応させると

$$
I_t(\mu)<\infty
$$

となります。

$F=\mathcal E_t(K)$ とします。本節冒頭で確認したように、この方向集合はBorel可測です。背理法で $\dim_HF>t$ と仮定し、

$$
t<\beta<\dim_HF\le1
$$

を選びます。[Borel集合のHausdorff次元のコンパクト芯](#lem-gmt8-compact-core)により、$F$ 内のコンパクト集合 $L$ で $\dim_HL>\beta$ となるものが取れます。

角度円を長さ $\pi/3$ 未満の有限個の閉弧で覆います。Hausdorff次元の有限和則により、$L$ と交わる弧の一つで次元が $\beta$ を超えます。この交わりはコンパクトです。弧の座標上では $\rho$ が通常の距離に等しいので、[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)を適用し、その交わりに台を持つ確率測度 $\sigma$ を取ります。

短い球について得た成長上界は、弧外の中心に対しても弧内の有限個の短い区間で評価できます。半径が大きい球では確率上界1を使います。定数 $A$ を大きくすれば全ての中心 $\phi$ と半径 $0<r\le\pi/2$ について

$$
\sigma(B_\rho(\phi,r))\le Ar^\beta
$$

が成り立ちます。

[二重energyの方向平均](#prop-gmt8-double-energy)をこの $\mu,\sigma$ に適用すると、$\sigma$ ほとんど全ての $\theta$ で $I_t((\pi_\theta)_\#\mu)<\infty$ です。射影測度は質量1で $\pi_\theta K$ に台を持ちます。[GMT3の有限energyによる次元下界](../GMT3/index.md#thm-gmt3-energy-dimension)から、これらの方向で

$$
\dim_H(\pi_\theta K)\ge t
$$

となります。しかし $\sigma(L)=1$ かつ $L\subset F$ なので、$\sigma$ ほとんど全ての方向で $\dim_H(\pi_\theta K)<t$ です。矛盾しました。従って $\dim_HF\le t$。$\square$
<!-- proof-end -->

この上界は、方向の長さが零という結論より強いものです。$t<1$ だから $\dim_H\mathcal E_t(K)\le t<1$ であり、したがって方向の1次元Lebesgue測度も零です。逆は成り立ちません。例えば次元1のCantor型集合は長さ0でも方向集合として次元1を持てます。

## 5. コンパクト集合からBorel集合へ

一般Borel集合はコンパクトとは限らず、可算個のコンパクト集合の和とも限りません。ここを黙って飛ばさないために、集合のHausdorff次元の近似に用いる補題を区別します。

<a id="thm-gmt8-kaufman-borel"></a>

<!-- formal-statement-start -->
> **定理（Kaufman型例外方向上界：Borel集合版）**  
> $E\subset\mathbb R^2$ を非空Borel集合、$0<t<\min\{\dim_HE,1\}$ とする。無向直線方向を $\mathbb T_\pi=\mathbb R/\pi\mathbb Z$ とし、$\pi_\theta(x)=x\cdot(\cos\theta,\sin\theta)$ と定める。このとき

$$
\dim_H\{\theta\in\mathbb T_\pi:\dim_H(\pi_\theta E)<t\}\le t.
$$
<!-- formal-statement-end -->

### 証明の見取り図

対象の $E$ 自体がコンパクトでなくても、$t$ より大きい次元を持つコンパクト部分集合を一つ選べます。影の包含関係を使えば、その小さい集合に対する例外方向の評価で十分です。

<!-- proof-start -->
### 証明

$t<s<\dim_HE$ を選びます。[Borel集合のHausdorff次元のコンパクト芯](#lem-gmt8-compact-core)から $K\subset E$ で $K$ はコンパクト、$\dim_HK>s>t$ を満たすものを選べます。任意の $\theta$ で $\pi_\theta K\subset\pi_\theta E$ なのでHausdorff次元の単調性より

$$
\dim_H\pi_\theta K\le\dim_H\pi_\theta E.
$$

従って $\dim_H\pi_\theta E<t$ なら $\dim_H\pi_\theta K<t$、すなわち

$$
\mathcal E_t(E)\subset\mathcal E_t(K).
$$

[コンパクト版Kaufman上界](#thm-gmt8-kaufman-compact)が適用できるので、右辺はHausdorff次元が高々 $t$ です。包含の単調性から左辺も高々 $t$。$\square$
<!-- proof-end -->

## 6. 例と境界を見分ける

### 例1：開いた円板には例外方向がない

$E=\{x\in\mathbb R^2:|x|<1\}$ の各射影は $(-1,1)$ です。実際 $\pi_\theta(re_\theta)=r$（$|r|<1$）なので $(-1,1)$ が含まれ、Cauchy--Schwarzで $|\pi_\theta x|\le|x|<1$ だからこれに等しいのです。すべての方向で影の次元は1なので、$0<t<1$ に対し $\mathcal E_t(E)=\varnothing$ です。

### 例2：一本の線分は一点だけ悪い

第1節の水平線分では例外方向は垂直方向の一点です。空集合や有限集合は長さ0であるだけでなく次元0です。一方、複数の異なる方向の線分の和では、どの射影方向でも少なくとも一本の影が非退化な区間になるため、例外方向集合が空になることもあります。

### 例3：次元と長さは別の閾値

[GMT7の臨界次元の例](../GMT7/index.md#thm-gmt7-grassmann-positive-volume)と同様、$\dim_HF=1$ で $\mathcal L^1(F)=0$ となるコンパクト $F\subset\mathbb R$ を取れます。$E=F\times\{0\}$ とすれば、水平射影は長さ0ですが次元は1です。従って任意の $t<1$ に対して水平射影は**例外ではありません**。Kaufman上界は「影が長さ0になる方向」を直接数える主張ではないのです。

## 7. 演習

### Level A：方向の幾何と球成長

<a id="ex-gmt8-a1"></a>

**A1. 垂直方向の角度距離**

- Level: A
- 問題: $z=(1,0)$、$\theta\in\mathbb T_\pi$ について、$|\pi_\theta z|=|\cos\theta|$ であることを示し、零になる方向 $\phi_z$ を求めよ。$\rho(\theta,\phi_z)$ と $|\pi_\theta z|$ の大小を示せ。

<!-- solution-start -->
**詳細解答**

$\pi_\theta z=z\cdot e_\theta=\cos\theta$。$\cos\theta=0$ は $\theta=\pi/2$（法 $\pi$）であり、$\phi_z=\pi/2$ です。$r=\rho(\theta,\pi/2)\in[0,\pi/2]$ と置くと $|\cos\theta|=\sin r$。[第2節の三角不等式](#lem-gmt8-transversality)で使った弦の評価より

$$
\frac{2}{\pi}r\le|\pi_\theta z|\le r.
$$

左は凹な $\sin$ が弦以上、右は $\sin r\le r$ によります。
<!-- solution-end -->

<a id="ex-gmt8-a2"></a>

**A2. 一様方向確率で小射影を数える**

- Level: A
- 問題: $\sigma=d\theta/\pi$、$z=(1,0)$、$0<u<1$ とする。$\sigma\{\theta:|\pi_\theta z|<u\}$ を厳密に求め、$u\downarrow0$ での一次近似を導け。

<!-- solution-start -->
**詳細解答**

$|\cos\theta|<u$ は $\pi/2-\arcsin u<\theta<\pi/2+\arcsin u$ を意味します。角度区間の長さは $2\arcsin u$ なので

$$
\sigma\{\theta:|\pi_\theta z|<u\}=
\frac{2\arcsin u}{\pi}.
$$

$\arcsin u/u\to1$ から $\sigma\{\cdots\}/u\to2/\pi$。従って小射影方向の確率は $u$ に比例し、Frostman指数1と整合します。
<!-- solution-end -->

<a id="ex-gmt8-a3"></a>

**A3. 線分の例外集合を求める**

- Level: A
- 問題: $E=\{(0,y):0\le y\le2\}$ とし、$0<t<1$ とする。$\mathcal E_t(E)$ とそのHausdorff次元を求めよ。

<!-- solution-start -->
**詳細解答**

$\pi_\theta(0,y)=y\sin\theta$。$\sin\theta\ne0$ なら影は長さ $2|\sin\theta|$ の区間で次元1、$\sin\theta=0$ なら一点で次元0です。無向方向なので $\theta=0$ のみが例外であり

$$
\mathcal E_t(E)=\{0\},\qquad\dim_H\mathcal E_t(E)=0.
$$

水平線分では垂直方向が例外だったのに対し、垂直線分では水平方向になります。
<!-- solution-end -->

<a id="ex-gmt8-a4"></a>

**A4. 区間測度の有限energy**

- Level: A
- 問題: $\mu$ を $[0,1]$ 上のLebesgue確率測度とし、$0<t<1$ の $I_t(\mu)$ を二重積分から求めよ。$t=1$ ではどうなるか。

<!-- solution-start -->
**詳細解答**

対称性から $x>y$ の三角形で積分して2倍します。$u=x-y$ と置けば

$$
\begin{aligned}
I_t(\mu)&=2\int_0^1\int_0^x(x-y)^{-t}dy\,dx\\
&=2\int_0^1\frac{x^{1-t}}{1-t}dx
=\frac{2}{(1-t)(2-t)}.
\end{aligned}
$$

$t=1$ では内側に $\int_0^xu^{-1}du=\infty$ が現れ、energyは無限大です。
<!-- solution-end -->

<a id="ex-gmt8-a5"></a>

**A5. Frostman指数を下げる**

- Level: A
- 問題: $\sigma(B_\rho(\phi,r))\le Ar^\beta$ が $0<r\le\pi/2$ で成立するとする。$0<\gamma<\beta$ に対して $\gamma$-Frostman条件を満たす定数を求めよ。

<!-- solution-start -->
**詳細解答**

$r^\beta=r^\gamma r^{\beta-\gamma}$ と分解します。$r\le\pi/2$ なので $r^{\beta-\gamma}\le(\pi/2)^{\beta-\gamma}$。よって

$$
\sigma(B_\rho(\phi,r))\le
A(\pi/2)^{\beta-\gamma}r^\gamma.
$$

大きい指数をもつ測度は小さい指数の条件も満たしますが、逆向きには一般に戻せません。
<!-- solution-end -->

### Level B：端点と二重積分

<a id="ex-gmt8-b1"></a>

**B1. dyadic分割で核の有限性を再導出**

- Level: B
- 問題: 確率測度 $\sigma$ が $\sigma\{\theta:|\pi_\theta z|<u|z|\}\le Bu^\beta$（$0<u\le1/2$、$z\ne0$）を満たすとする。$0<t<\beta$ なら $\int|\pi_\theta z|^{-t}d\sigma\le C|z|^{-t}$ を示し、$C$ を $B,t,\beta$ で与えよ。

<!-- solution-start -->
**詳細解答**

$q=|\pi_\theta z|/|z|$ と置きます。$q\ge1/2$ の寄与は高々 $2^t$。残りを $D_j=\{2^{-j-1}\le q<2^{-j}\}$（$j\ge1$）に分けます。$D_j$ 上の核は $q^{-t}\le2^{(j+1)t}$、一方 $\sigma(D_j)\le B2^{-j\beta}$ なので

$$
\begin{aligned}
\int q^{-t}d\sigma
&\le2^t+\sum_{j=1}^\infty2^{(j+1)t}B2^{-j\beta}\\
&=2^t+B2^t\frac{2^{-(\beta-t)}}{1-2^{-(\beta-t)}}.
\end{aligned}
$$

$q=0$ は $\sigma$-零集合です。$|z|^{-t}$ を掛けて結論し、$C$ は右辺の定数に取れます。
<!-- solution-end -->

<a id="ex-gmt8-b2"></a>

**B2. 境界 $\beta=t$ で本当に発散する例**

- Level: B
- 問題: $0<\beta<1$ とし、$[0,1]$ 上の確率測度 $d\sigma(r)=\beta r^{\beta-1}dr$ を考える。この測度が指数 $\beta$ の球成長評価を満たすことを示し、$\int_0^1r^{-\beta}d\sigma(r)$ を計算せよ。これを垂直方向を中心とする小さな角度弧へ移すと、方向平均核の端点で何が起こるか。

<!-- solution-start -->
**詳細解答**

$\int_0^1\beta r^{\beta-1}dr=1$。密度は単調減少なので、長さ $\ell\le1$ の任意の区間 $[a,a+\ell]\subset[0,1]$ の質量は

$$
(a+\ell)^\beta-a^\beta\le\ell^\beta
$$

です。最後の不等式は $0<\beta<1$ の凹関数の増分が原点で最大となるためです。長さ $2h$ の角度球は質量高々 $(2h)^\beta$、大半径なら確率上界1を使えるので定数付きFrostman条件が成立します。しかし

$$
\int_0^1r^{-\beta}d\sigma(r)
=\beta\int_0^1r^{-1}dr=\infty.
$$

角度 $r$ を、固定した $z$ に垂直な方向からの角度距離とすると $|\pi_\theta z|/|z|=\sin r\le r$。従って射影核の $\beta$ 乗負べき平均も無限大です。端点 $t=\beta$ は一般には許せません。
<!-- solution-end -->

<a id="ex-gmt8-b3"></a>

**B3. 積分順序と射影測度**

- Level: B
- 問題: $0<t<\beta\le1$、$I_t(\mu)<\infty$ とし、$\sigma$ は方向Frostman確率測度とする。$\mu$ が確率測度の場合、$\int I_t((\pi_\theta)_\#\mu)d\sigma\le CI_t(\mu)$ を押し出しの定義から導け。対角と零への射影をどう扱うかも述べよ。

<!-- solution-start -->
**詳細解答**

押し出し $\nu_\theta=(\pi_\theta)_\#\mu$ について二回の変数変換により

$$
I_t(\nu_\theta)=\iint|\pi_\theta(x-y)|^{-t}d\mu(x)d\mu(y).
$$

$I_t(\mu)<\infty$ だから $\mu\times\mu$-対角は零測度です。核は零射影に対して値 $+\infty$ を許す非負Borel関数なので[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を有限性を先取りせず適用できます。$x\ne y$ には[方向平均核補題](#lem-gmt8-angular-kernel)が使えるため

$$
\begin{aligned}
\int I_t(\nu_\theta)d\sigma
&=\iint\left(\int|\pi_\theta(x-y)|^{-t}d\sigma\right)d\mu(x)d\mu(y)\\
&\le C\iint|x-y|^{-t}d\mu(x)d\mu(y)=CI_t(\mu).
\end{aligned}
$$

左辺が有限なので零射影による無限energyが起こる方向は $\sigma$-零集合に限られます。
<!-- solution-end -->

<a id="ex-gmt8-b4"></a>

**B4. 長さ0と次元低下の違い**

- Level: B
- 問題: $F\subset[0,1]$ を $\dim_HF=1$、$\mathcal L^1(F)=0$ となるコンパクト集合とし、$E=F\times\{0\}$ とする。$0<t<1$ に対し、水平方向が $\mathcal E_t(E)$ に属するか判定せよ。また垂直方向についても判定せよ。

<!-- solution-start -->
**詳細解答**

水平射影は $\pi_0 E=F$ なので $\mathcal L^1(\pi_0 E)=0$ ですが $\dim_H(\pi_0E)=1>t$、従って例外ではありません。垂直方向には $\pi_{\pi/2}(x,0)=0$ なので影は一点、次元0であり $\mathcal E_t(E)$ に入ります。

実際 $\cos\theta\ne0$ の方向では $\pi_\theta E=(\cos\theta)F$、相似変換はHausdorff次元を保つため次元1です。よってこの集合の例外方向はちょうど垂直な一点です。「測度零なら例外」と推論すると水平方向を誤判定します。
<!-- solution-end -->

### Level C：Kaufman上界を再構成する

<a id="ex-gmt8-c1"></a>

**C1. Borel集合の例外方向評価を自力で組み立てる**

- Level: C
- 問題: $E\subset\mathbb R^2$ を非空Borel集合、$0<t<\min\{\dim_HE,1\}$ とする。次を用いて $\dim_H\mathcal E_t(E)\le t$ を示せ。
  1. $\dim_HF>q>0$ のBorel集合 $F$ に対し、指数 $q$ のFrostman確率測度を持つコンパクト部分集合を取れる。
  2. $I_t(\mu)<\infty$ なら、$\mu$ を支える集合のHausdorff次元は少なくとも $t$ である。
  3. 指数 $\beta>t$ の方向Frostman測度 $\sigma$ について、$\int I_t((\pi_\theta)_\#\mu)d\sigma\le CI_t(\mu)$ が成り立つ。

  $E$ 自体のコンパクト性を仮定せず、証明中の指数の選択、測度の台、矛盾となる二つの結論を明示せよ。

<!-- solution-start -->
**詳細解答**

$t<s<\dim_HE$ を取ります。条件1のコンパクト芯から $K\subset E$、$\dim_HK>s>t$ を選びます。$t<u<\dim_HK$ とすると[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)で $K$ 上に $u$-成長確率測度 $\mu$ が存在します。[GMT3の球成長energy評価](../GMT3/index.md#thm-gmt3-frostman-energy)により $t<u$ だから $I_t(\mu)<\infty$ です。

$F=\mathcal E_t(K)$ に $\dim_HF>t$ と仮定します。$t<\beta<\dim_HF$ を選び、条件1を角度の局所座標へ適用して、$F$ に台を持つ指数 $\beta$ の方向Frostman確率測度 $\sigma$ を取ります。条件3より

$$
\int I_t((\pi_\theta)_\#\mu)d\sigma(\theta)
\le CI_t(\mu)<\infty.
$$

従って $\sigma$-ほとんど全ての $\theta$ で射影後energyは有限です。条件2を射影測度に適用すれば $\dim_H\pi_\theta K\ge t$。ところが $\sigma(F)=1$、$F$ の定義では $\dim_H\pi_\theta K<t$、矛盾です。ゆえに $\dim_HF\le t$。

最後に $K\subset E$ より $\mathcal E_t(E)\subset\mathcal E_t(K)=F$。Hausdorff次元の単調性から

$$
\dim_H\mathcal E_t(E)\le\dim_HF\le t
$$

を得ます。$\beta>t$ は方向平均の収束、$u>t$ は空間energyの有限性に使いました。
<!-- solution-end -->

## 8. この講義で得たこと

- 射影距離が $u|x-y|$ 未満になる方向のFrostman測度は $O(u^\beta)$ と評価できます。
- $\beta>t$ なら方向平均の特異核は $C|x-y|^{-t}$ 以下となり、空間の有限 $t$-energyを射影後へ運べます。
- $0<t<\min\{\dim_HE,1\}$ のBorel集合では、射影次元が $t$ より小さくなる方向集合のHausdorff次元は高々 $t$ です。
- 方向集合の次元評価は、方向の測度零や射影の長さ零とは別の情報です。次のGMT9ではLipschitz写像の微分可能性へ進みます。
