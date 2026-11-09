# BHT7 Smarr関係・不可逆質量と仕事

<!-- definition-example-audit: strict -->

[BHT5のKerr第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)は、異なる定常解の間の**微小な変化**を面積と角運動量の変化へ分解しました。しかし、ある一つのブラックホールの質量そのものを、地平線の項と回転の項へ分ける公式はまだ得ていません。また、回転を減らすと質量のどこまでを取り出せるのかも、第一法則だけでは決まりません。

前半では長さの尺度を一斉に変える操作から、有限量の間の **Smarr関係**を導きます。後半では面積に対応する質量を定義し、[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の条件を守る実過程には「取り出せない部分」があることを示します。英語の *irreducible mass* の標準的な日本語名は**不可約質量**です。本講の題名にある「不可逆質量」は、この部分が古典的な不可逆過程で減らせないという意味で用います。

全体を通し4次元、漸近平坦、$\Lambda=0$、計量符号 $(-,+,+,+)$、$G=c=1$ とし、Einstein重力を扱います。$\hbar$ や温度・エントロピーによる同定はまだ使いません。$M,r,a,Q$ の次元は長さ $L$、地平線面積 $A$ と軸角運動量 $J$ の次元は $L^2$、表面重力 $\kappa$ と角速度 $\Omega_H$ は $L^{-1}$ です。電荷 $Q$ はEinstein–Maxwell理論の幾何単位で表します。

## 1. 全微分から有限の質量公式へ

### 1.1 長さを変えても同じ形のKerr解になる

[非極限Kerr解族](../BHT5/index.md#def-bht5-kerr-family)では、$M>0$、$|a|<M$、$J=Ma$ とします。根 $r_\pm=M\pm\sqrt{M^2-a^2}$ と面積 $A=4\pi(r_+^2+a^2)$ は[BHT5の地平線データ](../BHT5/index.md#prop-bht5-kerr-data)で得ました。

長さの単位を全て同じ倍率で変えると、質量と半径は一乗、面積と角運動量は二乗で変わります。無限遠の時間並進Killing場の規格化は各解で同じ規則に固定し、単に$\chi$だけを倍率変更する操作とは区別します。

<a id="def-bht7-length-scaling"></a>

<!-- formal-statement-start -->
> **定義（Kerr解族の長さ再尺度変換）**  
> 4次元、$G=c=1$、$\Lambda=0$ の漸近平坦な非極限Kerr解族の状態 $(M,a)$ に対し、実数 $\lambda>0$ を選ぶ。新しい定常解を $(\lambda M,\lambda a)$ とし、これに伴う状態量の写像を

$$
M\mapsto\lambda M,\quad a\mapsto\lambda a,\quad
J\mapsto\lambda^2J,\quad A\mapsto\lambda^2A
$$

> とする。この写像を長さ再尺度変換という。新しい解でも $|\lambda a|<\lambda M$ とし、無限遠の時間・回転規格化を各々同じ規則で選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht7-length-scaling -->
**定義の確認**： $M=5L,a=3L$ と $\lambda=2$ を選ぶと、もとの解は $r_+=9L$、$J=15L^2$、$A=360\pi L^2$ です。変換後は $M'=10L,a'=6L$ で $|a'|<M'$ を保ち、$r_+'=18L$、$J'=60L^2=4J$、$A'=1440\pi L^2=4A$。根と面積の**定義式に代入して**二乗の倍率を確かめました。$\kappa' =\kappa/2$、$\Omega_H'=\Omega_H/2$ も地平線データから確認できます。
<!-- definition-example-end -->

### 1.2 Eulerの同次性は、どの変数に何を掛けるかを教える

前の例では$A,J$は二乗、$M$は一乗でした。$A,J$ を独立座標とみなせる[BHT5の質量公式](../BHT5/index.md#prop-bht5-mass-area-j)の非極限領域で、その差を微分へ変換します。

<a id="lem-bht7-weighted-euler"></a>

<!-- formal-statement-start -->
> **補題（重み付きEuler恒等式）**  
> $U\subset\mathbb R^n$ を開集合とし、各 $x\in U$ の近傍で $\lambda>0$ が1に十分近ければ $(\lambda^{w_1}x_1,\ldots,\lambda^{w_n}x_n)\in U$ とする。$f:U\to\mathbb R$ は $C^1$ で、正の $\lambda$ が1の近傍にあるとき

$$
f(\lambda^{w_1}x_1,\ldots,\lambda^{w_n}x_n)=\lambda^k f(x)
$$

> を満たすと仮定する。重み $w_i$ と次数 $k$ は実定数とする。このとき各 $x\in U$ で

$$
\boxed{\sum_{i=1}^n w_i x_i\,\partial_i f(x)=k f(x)}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$g(\lambda)=f(\lambda^{w_1}x_1,\ldots,\lambda^{w_n}x_n)$ を一変数関数とします。両辺を $\lambda=1$ で微分すると、各変数の微分に**重み$w_i$**が掛かります。

<!-- proof-start -->
### 証明

$x\in U$ を固定し、$\lambda=1$ の周りで定義される $g$ を考えます。$f\in C^1$ と開集合の仮定により連鎖律を適用でき、

$$
g'(\lambda)=\sum_{i=1}^n
\partial_i f(\lambda^{w_1}x_1,\ldots,\lambda^{w_n}x_n)
w_i\lambda^{w_i-1}x_i.
$$

一方、仮定から $g(\lambda)=\lambda^kf(x)$ なので $g'(1)=kf(x)$。連鎖律の式へ $\lambda=1$ を代入した $g'(1)=\sum_iw_ix_i\partial_if(x)$ と比較して結論を得ます。$x_i$ が零の場合も導出に除算は不要です。
<!-- proof-end -->

普通の「同じ倍率で全変数を伸ばす」同次性は $w_i=1$ の場合です。地平線面積のように長さの二乗で変わる量へ機械的に重み1を割り当てると、Smarr関係の係数を誤ります。

<a id="thm-bht7-smarr-kerr"></a>

<!-- formal-statement-start -->
> **定理（非極限Kerr解族のSmarr関係）**  
> 4次元、$\Lambda=0$、$G=c=1$ の漸近平坦な非極限Kerr定常解 $M>0,\ |a|<M$ について、$J=Ma$、正則な外側地平線の面積 $A$、無限遠の時間並進に規格化された表面重力 $\kappa$、地平線角速度 $\Omega_H$ を用いる。このとき

$$
\boxed{M=\frac{\kappa A}{4\pi}+2\Omega_HJ}
$$

> が成立する。これは個々の定常解の状態量を結ぶ代数的恒等式である。第一法則はこれとは異なり、微小な変化量の関係を述べる。
<!-- formal-statement-end -->

### 証明の見取り図

[BHT5の面積・角運動量による質量表示](../BHT5/index.md#prop-bht5-mass-area-j)は $M(\lambda^2A,\lambda^2J)=\lambda M(A,J)$ を満たします。[重み付きEuler恒等式](#lem-bht7-weighted-euler)に $(w_A,w_J;k)=(2,2;1)$ を入れ、偏微分を[BHT5の第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)で置き換えます。

<!-- proof-start -->
### 証明

$A>0$、$|J|<A/(8\pi)$ は開領域であり、正の平方根

$$
M(A,J)=\sqrt{\frac{A}{16\pi}+\frac{4\pi J^2}{A}}
$$

はそこで滑らかです。$\lambda>0$ に対して

$$
\begin{aligned}
M(\lambda^2A,\lambda^2J)^2
&=\frac{\lambda^2A}{16\pi}
+\frac{4\pi\lambda^4J^2}{\lambda^2A}\\
&=\lambda^2M(A,J)^2.
\end{aligned}
$$

正質量分枝を使うので $M(\lambda^2A,\lambda^2J)=\lambda M(A,J)$ です。補題を $f=M$、$x=(A,J)$、$w=(2,2)$、$k=1$ として適用すると

$$
M=2A\left(\frac{\partial M}{\partial A}\right)_J
+2J\left(\frac{\partial M}{\partial J}\right)_A.
$$

[BHT5の偏微分の検算](../BHT5/index.md#prop-bht5-mass-area-j)により $M_A=\kappa/(8\pi)$、$M_J=\Omega_H$。代入して $2A\kappa/(8\pi)=\kappa A/(4\pi)$ を得ます。
<!-- proof-end -->

**別計算による係数の検算。** $R_+=r_+^2+a^2=2Mr_+$、$r_+r_-=a^2$ を使うと、[地平線データ](../BHT5/index.md#prop-bht5-kerr-data)から

$$
\frac{\kappa A}{4\pi}
=\frac{r_+-r_-}{2R_+}\,R_+
=\frac{r_+-r_-}{2},\qquad
2\Omega_HJ=\frac{2a(Ma)}{R_+}
=\frac{a^2}{r_+}=r_-.
$$

和は $(r_++r_-)/2=M$ です。$M=5L,a=3L$ ならそれぞれ $4L$ と $1L$、和が $5L$ になります。これは第一法則を積分したものではなく、スケーリングで得る**別種の恒等式**です。

### 1.3 電荷があると重みはどうなるか

[BHT5のKerr–Newman変分恒等式](../BHT5/index.md#prop-bht5-kn-first-law)には $\Phi_H\delta Q$ が加わります。電荷 $Q$ は長さの一乗なので、$A,J$ と同じ係数2を付けることはできません。ここではKerr–Newmanの明示解から得られる関係を入力し、電荷付きSmarr関係を代数的に確かめます。

<a id="prop-bht7-smarr-kn"></a>

<!-- formal-statement-start -->
> **命題（非極限Kerr–Newman解族のSmarr関係）**  
> 4次元、$G=c=1$、$\Lambda=0$ の漸近平坦なEinstein–Maxwellの非極限Kerr–Newman定常解を考える。$M>0$、$M^2>a^2+Q^2$、$J=Ma$、$r_+=M+\sqrt{M^2-a^2-Q^2}$、$A=4\pi(r_+^2+a^2)$ とする。電位 $\Phi_H$ は無限遠で零に規格化されたゲージの地平線電位差とする。このとき

$$
\boxed{M=\frac{\kappa A}{4\pi}+2\Omega_HJ+\Phi_HQ}
$$

> が成立する。$Q=0$ はKerr、$J=0$ はReissner–Nordströmの関係へ戻る。
<!-- formal-statement-end -->

### 証明の見取り図

非極限の外側根の式から $M^2$ を $A,J,Q$ で表します。$A,J,Q$ の長さ重みはそれぞれ $2,2,1$ です。[重み付きEuler恒等式](#lem-bht7-weighted-euler)と[BHT5の電荷付き第一法則](../BHT5/index.md#prop-bht5-kn-first-law)を組み合わせます。

<!-- proof-start -->
### 証明

$R=r_+^2+a^2=A/(4\pi)$、$X=A/(16\pi)=R/4$ と置きます。地平線根の方程式 $2Mr_+=R+Q^2$、$a=J/M$ から、両辺を二乗して

$$
4M^2r_+^2=(R+Q^2)^2,
\qquad r_+^2=R-\frac{J^2}{M^2}.
$$

後式を前式へ代入し、$R=4X$ で割り算を整理すると

$$
\begin{aligned}
4RM^2-4J^2&=R^2+2RQ^2+Q^4,\\
M^2&=\frac R4+\frac{J^2}{R}+\frac{Q^2}{2}+\frac{Q^4}{4R}\\
&=X+\frac{J^2}{4X}+\frac{Q^2}{2}+\frac{Q^4}{16X}.
\end{aligned}
$$

独立変数として扱えることも確認します。$r=r_+$ とし、$M=(r^2+a^2+Q^2)/(2r)$ から

$$
M_r=\frac{r^2-a^2-Q^2}{2r^2}\in(0,1/2],\qquad M_a=\frac ar.
$$

$A=4\pi(r^2+a^2)$、$J=aM$ なので、$Q$ を固定した変換のJacobianは

$$
\det\frac{\partial(A,J)}{\partial(r,a)}
=8\pi\{r(M+aM_a)-a^2M_r\}
=8\pi\{rM+a^2(1-M_r)\}>0.
$$

さらに第三座標を $Q$ のままにすれば全Jacobianも非零です。よって逆関数定理により $(A,J,Q)$ は非極限解族の局所座標となります。この正質量分枝はその開領域で滑らかです。$X,J,Q$ を $\lambda^2X,\lambda^2J,\lambda Q$ とすると右辺の各項が $\lambda^2$ 倍されるため、$M(\lambda^2A,\lambda^2J,\lambda Q)=\lambda M(A,J,Q)$ です。従って[補題](#lem-bht7-weighted-euler)より

$$
M=2AM_A+2JM_J+QM_Q.
$$

[BHT5の変分恒等式](../BHT5/index.md#prop-bht5-kn-first-law)が同じ規格化の独立な定常解族の方向に成立するので、$M_A=\kappa/(8\pi)$、$M_J=\Omega_H$、$M_Q=\Phi_H$。代入して結論を得ます。$Q=0$ では電荷項が消え、$J=0$ では回転項が消えます。
<!-- proof-end -->

## 2. 地平線面積から「減らせない質量」を作る

質量のうち回転から取り出せる分を考えるには、まず「回転を止めても古典的な過程では減らせない量」を指定します。[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)が成立する過程では $A$ は未来に向かって減少しません。そこで**同じ面積を持つSchwarzschild解の質量**を基準にします。

<a id="def-bht7-irreducible-mass"></a>

<!-- formal-statement-start -->
> **定義（地平線の不可約質量）**  
> 4次元、$G=c=1$ の正則なブラックホール地平線の有限で正の二次元断面積 $A>0$ に対して

$$
\boxed{M_{\mathrm{irr}}:=\sqrt{\frac{A}{16\pi}}}
$$

> を**不可約質量**（irreducible mass）という。これは地平線面積から定まる長さ次元の量であり、任意の非定常時空における全質量 $M$ の定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht7-irreducible-mass -->
**定義の確認**： [BHT1のSchwarzschild解の面積](../BHT1/index.md#prop-bht1-schwarzschild-data)は $A=16\pi M^2$ なので、$M>0$ なら $M_{\mathrm{irr}}=M$ です。Kerrの $M=5L,a=3L$ では $A=360\pi L^2>0$ で

$$
M_{\mathrm{irr}}^2=\frac{360\pi L^2}{16\pi}
=\frac{45}{2}L^2,qquad
M_{\mathrm{irr}}=\frac{3\sqrt{10}}2 L<5L.
$$

面積が正、平方根の正分枝、長さ次元、Schwarzschildとの対応を直接確認しました。
<!-- definition-example-end -->

<a id="prop-bht7-christodoulou"></a>

<!-- formal-statement-start -->
> **命題（KerrのChristodoulou質量公式と不可約質量の範囲）**  
> 4次元、$G=c=1$、$\Lambda=0$ の漸近平坦な非極限Kerr定常解 $M>0,\ |a|<M$ と、その外側地平線面積 $A$ に対する $\mu:=M_{\mathrm{irr}}=\sqrt{A/(16\pi)}$ を考える。このとき

$$
\boxed{M^2=\mu^2+\frac{J^2}{4\mu^2}},\qquad
\boxed{\mu^2=\frac{M^2+\sqrt{M^4-J^2}}2}
$$

> が成立する。$J=Ma$ であり、非極限領域では $|J|<2\mu^2$、$M/\sqrt2<\mu\le M$。$J=0$ のときに限り $\mu=M$ となり、極限Kerrの境界では $\mu\to M/\sqrt2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

[BHT5の質量公式](../BHT5/index.md#prop-bht5-mass-area-j)で $A=16\pi\mu^2$ と置き、次に $A=8\pi Mr_+$ を用いて平方根の枝を確定します。単に二次方程式を解くだけでは、内側根に対応する枝を誤って採用する余地が残ります。

<!-- proof-start -->
### 証明

[BHT5の公式](../BHT5/index.md#prop-bht5-mass-area-j)に $A=16\pi\mu^2$ を代入すると

$$
M^2=\frac{16\pi\mu^2}{16\pi}
+\frac{4\pi J^2}{16\pi\mu^2}
=\mu^2+\frac{J^2}{4\mu^2}.
$$

また $A=8\pi Mr_+$ なので $\mu^2=Mr_+/2$。$r_+=M+\sqrt{M^2-a^2}$ と $J=Ma$ から

$$
\mu^2=\frac{M^2+M\sqrt{M^2-a^2}}2
=\frac{M^2+\sqrt{M^4-J^2}}2.
$$

非極限では $0<\sqrt{M^4-J^2}\le M^2$ で、等号 $\sqrt{M^4-J^2}=M^2$ は $J=0$ のときだけです。従って $M^2/2<\mu^2\le M^2$。さらに $|J|<A/(8\pi)=2\mu^2$ は[BHT5で示した非極限状態域](../BHT5/index.md#prop-bht5-mass-area-j)そのものです。$|a|\to M$ で平方根項が零へ近づき、境界値 $\mu=M/\sqrt2$ を得ます。
<!-- proof-end -->

この命題の $M^2$ は**回転エネルギーを二乗で分割した式**であって、$M=\mu+J^2/(4\mu^2)$ ではありません。実際、$J\ne0$ なら $M>\mu$ です。

## 3. 面積非減少はエネルギー抽出をどこまで制限するか

### 3.1 微小過程での仕事と面積の符号

正の $J$ を持つKerr解で回転を落とす方向 $\delta J<0$ を考えます。[第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)は

$$
\delta M=\frac\kappa{8\pi}\delta A+\Omega_H\delta J
$$

です。$\kappa>0$、$\Omega_H>0$ なので、$\delta A\ge0$ という古典面積条件の下でも $\delta M<0$ は可能ですが、$\delta M$ を任意に小さくできるわけではありません。流入物質の具体過程には[中性物質流入の物理過程版第一法則](../BHT6/index.md#thm-bht6-physical-process-first-law)を使い、そこで要請される小摂動・定常端状態・流束の仮定を別途満たす必要があります。

面積を一定に保つ $\delta A=0$ は**可逆限界**と呼ぶ理想化で、実際の有限時間のPenrose過程が常にこれを達成するという主張ではありません。$\delta A>0$ なら同じ角運動量変化に対する質量減少の絶対値は可逆限界より小さくなります。

<a id="prop-bht7-constant-area-path"></a>

<!-- formal-statement-start -->
> **命題（Kerrの固定面積曲線と回転仕事）**  
> 4次元の非極限・漸近平坦・真空Kerr定常解族で $G=c=1$、$\Lambda=0$ とする。$\mu>0$ を固定し、$|J|<2\mu^2$ の定常解だけを結ぶ滑らかな曲線

$$
M(J)=\sqrt{\mu^2+\frac{J^2}{4\mu^2}}
$$

> を考える。この曲線上では $A=16\pi\mu^2$ は一定で、$dM=\Omega_H\,dJ$。初期 $J_i>0$ から $J_f=0$ までこの曲線をたどる場合、形式的な取り出し仕事は

$$
\boxed{W_{\mathrm{rev}}=M_i-\mu
=\int_{0}^{J_i}\Omega_H(J)\,dJ}
$$

> である。これは定常状態空間内の可逆**比較経路**であり、任意の物理過程の実現可能性を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

[Christodoulou公式](#prop-bht7-christodoulou)を $J$ で微分し、[第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)の固定面積係数と比較します。回転の向きが逆の場合は積分の向きも逆になります。

<!-- proof-start -->
### 証明

$\mu$ を固定した滑らかな正質量分枝では

$$
2M\frac{dM}{dJ}=\frac{2J}{4\mu^2},
\qquad \frac{dM}{dJ}=\frac{J}{4\mu^2M}.
$$

$4\mu^2=A/(4\pi)=r_+^2+a^2=R_+$ と $J=Ma$ を代入すれば

$$
\frac{J}{4\mu^2M}=\frac{Ma}{MR_+}
=\frac a{R_+}=\Omega_H.
$$

$J_i>0$ のとき $\Omega_H>0$、$J$ を減らすと $dM<0$。基本定理により

$$
\int_{0}^{J_i}\Omega_H(J)\,dJ
=M(J_i)-M(0)=M_i-\mu.
$$

固定面積なので $dA=0$ であり、[第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)とも一致します。
<!-- proof-end -->

### 3.2 任意の古典過程に対する上限

固定面積曲線だけなら任意の二つの定常解を比較できます。しかし、**一つの時空の中で**エネルギーを取り出すには面積非減少という追加の制限が必要です。

<a id="thm-bht7-extraction-bound"></a>

<!-- formal-statement-start -->
> **定理（Kerrからの古典的回転エネルギー抽出上限）**  
> 4次元、$G=c=1$、$\Lambda=0$ の漸近平坦なEinstein重力で、初期・終期がそれぞれ正質量の定常Kerrブラックホールである孤立した過程を考える。未来事象地平線が正則で、零エネルギー条件および面積法則を導くための大域的仮定が成立し、初期断面と終期断面について $A_f\ge A_i>0$ が得られるとする。両端の質量を $M_i,M_f$、初期の面積から定まる不可約質量を $\mu_i=\sqrt{A_i/(16\pi)}$ とする。このとき、無限遠に正味で取り出せるエネルギーを $W=M_i-M_f$ と数えるなら

$$
\boxed{W\le M_i-\mu_i}
$$

> である。初期がKerrであれば

$$
\boxed{\frac{W}{M_i}\le1-\frac1{\sqrt2}<0.293}
$$

> も成立する。上限の等号には少なくとも $A_f=A_i$、$J_f=0$ が必要で、一般の動力学で等号を実現できるとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)で不可約質量が非減少となり、[Christodoulou公式](#prop-bht7-christodoulou)で終期質量は終期不可約質量を下回れません。この二つを接続すると、初期の回転エネルギーの上限が得られます。

<!-- proof-start -->
### 証明

$A_f\ge A_i>0$ で平方根関数は単調増加なので

$$
\mu_f=\sqrt{\frac{A_f}{16\pi}}
\ge\sqrt{\frac{A_i}{16\pi}}=\mu_i.
$$

終期Kerrでは[質量公式](#prop-bht7-christodoulou)の各項が非負で、$M_f>0$ だから

$$
M_f^2=\mu_f^2+\frac{J_f^2}{4\mu_f^2}
\ge\mu_f^2,
\qquad M_f\ge\mu_f\ge\mu_i.
$$

$W=M_i-M_f$ の定義へ移項すれば $W\le M_i-\mu_i$。さらに初期Kerrの範囲 $\mu_i>M_i/\sqrt2$（非極限）を使うと

$$
\frac W{M_i}\le1-\frac{\mu_i}{M_i}
<1-\frac1{\sqrt2}.
$$

定理の弱い不等号は極限Kerrへの極限も表す書き方です。等号 $M_f=\mu_f=\mu_i$ には最初の不等号で $J_f=0$、次の不等号で $A_f=A_i$ が必要です。
<!-- proof-end -->

この上限は**エネルギー保存により無限遠への正味の流出を $M_i-M_f$ と同定できる孤立過程**の主張です。外部から同時にエネルギーを投入する場合は、正味の差と外部で数えた総仕事を混同しません。また、量子的なHawking蒸発、零エネルギー条件の破れ、地平線の大域的正則性が失われる状況にはこの証明を無条件に移せません。

### 3.3 数値例・極限と、何が可逆でないか

$M=5L,a=3L$ では先の計算より $\mu=3\sqrt{10}L/2$ です。回転を完全に抜いても $M_f\ge\mu$ なので

$$
W\le\left(5-\frac{3\sqrt{10}}2\right)L
\simeq0.2566L,\qquad
\frac{W}{M}\le1-\frac{3\sqrt{10}}{10}\simeq0.0513.
$$

初期角運動量 $J=15L^2$ を減らしても、面積が増える現実の過程ではこの上限を下回ります。$|a|/M\to1$ とする極限では $\mu/M\to1/\sqrt2$ で、約 $29.3\%$ が**理想上限の極限値**です。極限地平線そのものは非極限解族の開領域外にあり、[BHT5の微分の注意](../BHT5/index.md#prop-bht5-mass-area-j)を越えて無条件に滑らかな可逆過程を置くわけではありません。

同じ初期質量 $M$ で $J=0$ なら $\mu=M$、抽出可能な**回転**エネルギーの上限は零です。逆に面積の値を固定したまま $J$ を変える定常解族の比較では $dA=0$ ですが、物理的な実過程での地平線増加率 $dA/dt$ が常に零になることを意味しません。

## 4. Smarr関係の成立範囲と次への橋

この章のSmarr関係は **4次元・漸近平坦・$\Lambda=0$ の定常Kerr（およびEinstein–MaxwellのKerr–Newman）**に関するものです。第一法則が微分の関係で、Smarr関係が重み付き同次性による有限量の関係であることを区別しました。一般の非定常地平線へ同じ代数公式をそのまま適用しません。

宇宙項 $\Lambda$ を導入すると、その次元は $L^{-2}$ です。長さを再尺度変換しても $\Lambda$ を固定するなら、同じ解族の単純な同次変換にはなりません。$\Lambda$ も変数として扱う拡張熱力学では追加の共役項が必要です。その境界条件と熱力学的解釈は後続のAdS・アンサンブルの講義で扱います。

## 演習

各問では $G=c=1$、4次元、$\Lambda=0$ とし、問題文に指定する非極限・漸近平坦な定常解族を使います。抽出上限の問題では、明示された古典面積法則の仮定も課します。

### Level A：重みと状態量を手で確かめる

<a id="ex-bht7-a01"></a>

#### BHT7-A01 長さ再尺度の次元

- Level: A

Kerr解 $M=4L,a=\sqrt7L$ を $\lambda=3$ 倍に再尺度変換する。$r_+,J,A,\kappa,\Omega_H$ の変換倍率を求め、非極限条件が保存されることを確認せよ。

<!-- solution-start -->
**詳細解答。** もとの根は $r_+=4L+\sqrt{16-7}L=7L$、$r_-=L$。$|a|=\sqrt7L<4L$ で非極限です。[長さ再尺度変換](#def-bht7-length-scaling)により $M'=12L,a'=3\sqrt7L$、$r_+'=21L$、$r_-'=3L$ で $|a'|<M'$ です。$J=Ma=4\sqrt7L^2$、$A=4\pi(r_+^2+a^2)=224\pi L^2$ なので

$$
J'=36\sqrt7L^2=9J,\qquad A'=2016\pi L^2=9A.
$$

[地平線データ](../BHT5/index.md#prop-bht5-kerr-data)から $\kappa=(r_+-r_-)/(2(r_+^2+a^2))$、$\Omega_H=a/(r_+^2+a^2)$。分子が3倍、分母が9倍なので、両者は $1/3$ 倍です。$r_+$ は3倍、$J,A$ は9倍という次元とも一致します。
<!-- solution-end -->

<a id="ex-bht7-a02"></a>

#### BHT7-A02 同次性を微分する

- Level: A

$f(A,J)=\sqrt{A/(16\pi)+4\pi J^2/A}$ を $A>0,\ |J|<A/(8\pi)$ で考える。$g(\lambda)=f(\lambda^2A,\lambda^2J)$ を計算し、$g'(1)$ を連鎖律と直接微分の両方で表せ。

<!-- solution-start -->
**詳細解答。** $\lambda>0$ なら平方根の内部は

$$
\frac{\lambda^2A}{16\pi}
+\frac{4\pi\lambda^4J^2}{\lambda^2A}
=\lambda^2f(A,J)^2
$$

なので $g(\lambda)=\lambda f(A,J)$、従って $g'(1)=f(A,J)$。一方、[重み付きEuler補題](#lem-bht7-weighted-euler)の証明と同じ連鎖律により

$$
g'(\lambda)=2\lambda A f_A(\lambda^2A,\lambda^2J)
+2\lambda J f_J(\lambda^2A,\lambda^2J).
$$

$\lambda=1$ を代入すると $g'(1)=2Af_A+2Jf_J$ です。二つを比較して $f=2Af_A+2Jf_J$ を得ます。
<!-- solution-end -->

<a id="ex-bht7-a03"></a>

#### BHT7-A03 KerrのSmarr係数

- Level: A

$M=5L,a=3L$ のKerr解について、$\kappa A/(4\pi)$ と $2\Omega_HJ$ を直接求め、その和が $M$ と一致するか確かめよ。

<!-- solution-start -->
**詳細解答。** $r_+=9L,r_-=L,R_+=90L^2$、$A=4\pi R_+=360\pi L^2$、$\kappa=8L/(180L^2)=2/(45L)$、$\Omega_H=3L/(90L^2)=1/(30L)$、$J=15L^2$。それぞれ代入すると

$$
\frac{\kappa A}{4\pi}=\frac{2}{45L}\,90L^2=4L,
\qquad 2\Omega_HJ=2\,\frac1{30L}\,15L^2=L.
$$

和は $5L=M$ です。[Smarr定理](#thm-bht7-smarr-kerr)の二つの項はどちらも長さ次元であり、係数を第一法則の $1/(8\pi)$ と混同すると面積項が半分になって失敗します。
<!-- solution-end -->

<a id="ex-bht7-a04"></a>

#### BHT7-A04 不可約質量の判定

- Level: A

$M=5L,a=3L$ における $M_{\mathrm{irr}}$ を面積から求め、$M^2=M_{\mathrm{irr}}^2+J^2/(4M_{\mathrm{irr}}^2)$ の右辺を数値で検証せよ。

<!-- solution-start -->
**詳細解答。** $A=360\pi L^2$ なので[不可約質量の定義](#def-bht7-irreducible-mass)から $\mu^2=A/(16\pi)=45L^2/2$、$\mu=3\sqrt{10}L/2$ です。$J=15L^2$ から

$$
\mu^2+\frac{J^2}{4\mu^2}
=\frac{45}{2}L^2+\frac{225L^4}{90L^2}
=\frac{45}{2}L^2+\frac52L^2=25L^2=M^2.
$$

正の平方根の枝を取るので $M=5L$ が回復されます。
<!-- solution-end -->

<a id="ex-bht7-a05"></a>

#### BHT7-A05 Schwarzschildと反転する回転

- Level: A

Kerrの $a=0$ と $a\mapsto-a$ の二つを比較し、$M_{\mathrm{irr}}$ とSmarrの各項がどう変わるか説明せよ。$M>0$ は共通に固定する。

<!-- solution-start -->
**詳細解答。** $a=0$ では $r_+=2M,r_-=0,A=16\pi M^2$、$\mu=M$、$\Omega_H=J=0$、$\kappa=1/(4M)$。従って $\kappa A/(4\pi)=M$、回転項は零です。回転反転では $r_\pm,A,\kappa,\mu$ は $a^2$ の関数なので不変、$J=Ma$ と $\Omega_H=a/R_+$ は両方符号反転します。積 $2\Omega_HJ$ は不変です。したがって[Smarr関係](#thm-bht7-smarr-kerr)の両辺とも変わりません。
<!-- solution-end -->

### Level B：異なる導出を接続する

<a id="ex-bht7-b01"></a>

#### BHT7-B01 Kerr–Newmanの電荷重みを検算する

- Level: B

非極限Kerr–Newmanの $X=A/(16\pi)>0$ と $M^2=X+J^2/(4X)+Q^2/2+Q^4/(16X)$ を用いる。$X,J,Q$ の長さ重みを示し、$Q$ に係数2を掛ける誤ったSmarr式が成立しないことを $J=0,Q\ne0$ の場合で説明せよ。

<!-- solution-start -->
**詳細解答。** $[X]=[J]=L^2$、$[Q]=L$ です。$X\mapsto\lambda^2X$、$J\mapsto\lambda^2J$、$Q\mapsto\lambda Q$ で各項は $\lambda^2$ 倍され、$M\mapsto\lambda M$ です。[補題](#lem-bht7-weighted-euler)から

$$
M=2XM_X+2JM_J+QM_Q.
$$

$A=16\pi X$ だから $XM_X=AM_A$。$J=0$ の場合、$M^2=X+Q^2/2+Q^4/(16X)$ で $M_Q=(Q+Q^3/(4X))/(2M)$、$Q\ne0$ なら $QM_Q=(Q^2+Q^4/(4X))/(2M)>0$ です。誤って電荷にも重み2を付けると真の式より余分な $QM_Q>0$ が残り、等号は成り立ちません。[電荷付き第一法則](../BHT5/index.md#prop-bht5-kn-first-law)の $M_Q=\Phi_H$ から正しい式は $M=\kappa A/(4\pi)+2\Omega_HJ+\Phi_HQ$ です。
<!-- solution-end -->

<a id="ex-bht7-b02"></a>

#### BHT7-B02 固定面積の積分を独立に行う

- Level: B

$\mu>0$ を固定し、$0<J_i<2\mu^2$ とする。$M(J)=\sqrt{\mu^2+J^2/(4\mu^2)}$ と $\Omega_H=J/(4\mu^2M(J))$ から、置換 $u=\mu^2+J^2/(4\mu^2)$ によって $\int_0^{J_i}\Omega_HdJ$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $u(J)=\mu^2+J^2/(4\mu^2)$ なら $du=J/(2\mu^2)\,dJ$ です。従って

$$
\Omega_H\,dJ=\frac{J}{4\mu^2\sqrt u}\,dJ
=\frac{du}{2\sqrt u}.
$$

積分区間は $u(0)=\mu^2$ から $u(J_i)=M_i^2$ へ移り、$\mu,M_i>0$ なので

$$
\int_0^{J_i}\Omega_H\,dJ
=\int_{\mu^2}^{M_i^2}\frac{du}{2\sqrt u}
=\left[\sqrt u\right]_{\mu^2}^{M_i^2}
=M_i-\mu.
$$

[固定面積曲線の命題](#prop-bht7-constant-area-path)を積分の変数変換で再導出しました。
<!-- solution-end -->

<a id="ex-bht7-b03"></a>

#### BHT7-B03 面積増加のある終状態

- Level: B

初期Kerrの $M_i=5L,a_i=3L$ とし、古典面積法則の仮定を満たす孤立過程で終期がSchwarzschild、$A_f=(11/10)A_i$ になったとする。$M_f$ と正味の抽出仕事 $W=M_i-M_f$ を求め、可逆上限と比較せよ。

<!-- solution-start -->
**詳細解答。** 初期面積は $A_i=360\pi L^2$、$\mu_i^2=45L^2/2$ です。終期Schwarzschildでは $M_f=\sqrt{A_f/(16\pi)}$ なので

$$
M_f^2=\frac{11}{10}\frac{45}{2}L^2
=\frac{99}{4}L^2,\qquad M_f=\frac{3\sqrt{11}}2L.
$$

従って $W=(5-3\sqrt{11}/2)L\simeq0.0251L$。これに対し[抽出上限](#thm-bht7-extraction-bound)の可逆値は $(5-3\sqrt{10}/2)L\simeq0.2566L$ です。$\sqrt{11}>\sqrt{10}$ なので面積が増えた分だけ取り出せる仕事が小さくなります。ここで終状態の実現可能性は与えられた仮定の一部であり、この数値計算だけではダイナミクスを構成していません。
<!-- solution-end -->

<a id="ex-bht7-b04"></a>

#### BHT7-B04 面積減少という偽の可逆経路

- Level: B

非極限Kerr状態空間で $M$ を一定にして $|J|$ を $0$ から増やすと $A$ はどうなるか。これは[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)への反例か。$J$ を使った明示式と、失われている仮定を挙げよ。

<!-- solution-start -->
**詳細解答。** [KerrのChristodoulou質量公式と不可約質量の範囲](#prop-bht7-christodoulou)から

$$
A=16\pi\mu^2
=8\pi\left(M^2+\sqrt{M^4-J^2}\right).
$$

$M$ を固定し $0<|J|<M^2$ の範囲では

$$
\frac{\partial A}{\partial |J|}\bigg|_M
=8\pi\frac{-|J|}{\sqrt{M^4-J^2}}<0.
$$

これは異なる**定常Kerr解**をパラメータで比較する操作であり、一つの時空の未来事象地平線上で零エネルギー条件・大域的因果構造を保つ物理過程とは指定されていません。したがって[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の対象となる過程の仮定が欠けており、反例にはなりません。
<!-- solution-end -->

### Level C：幾何学的状態量と仕事を統合する

<a id="ex-bht7-c01"></a>

#### BHT7-C01 スピン除去の上限と二つの検算

- Level: C

4次元・漸近平坦・$\Lambda=0$ の非極限Kerr解 $M_i>0$、$0<J_i<M_i^2$ を初期状態とする。$\chi=J_i/M_i^2$ と置く。

1. 初期不可約質量比 $\mu_i/M_i$ と理想的な抽出仕事比 $(M_i-\mu_i)/M_i$ を $\chi$ だけで表し、その上限が $\chi\uparrow1$ で $1-1/\sqrt2$ となることを示せ。
2. $\chi=3/5$ の場合を計算し、初期 $M_i=5L$ とした直接計算に一致することを確認せよ。
3. 古典面積法則の仮定を満たす孤立過程で終期もKerr、$A_f\ge A_i$ なら、$J_f$ が零でなくても $W\le M_i-\mu_i$ を示せ。可逆曲線との論理的な違いを述べよ。

<!-- solution-start -->
**詳細解答。**

**1.** $\chi=J_i/M_i^2\in(0,1)$ なので[Christodoulou公式](#prop-bht7-christodoulou)の正分枝から

$$
\frac{\mu_i^2}{M_i^2}
=\frac{1+\sqrt{1-J_i^2/M_i^4}}2
=\frac{1+\sqrt{1-\chi^2}}2.
$$

正の平方根をとって

$$
\boxed{\frac{\mu_i}{M_i}=\sqrt{\frac{1+\sqrt{1-\chi^2}}2}},\qquad
\boxed{\frac{M_i-\mu_i}{M_i}=1-\sqrt{\frac{1+\sqrt{1-\chi^2}}2}}.
$$

$\chi\uparrow1$ では $\sqrt{1-\chi^2}\downarrow0$ なので右辺は $1-1/\sqrt2$ に近づきます。$\chi<1$ では極限値には達しません。

**2.** $\chi=3/5$ なら $\sqrt{1-\chi^2}=4/5$、従って $\mu_i/M_i=\sqrt{(1+4/5)/2}=3/\sqrt{10}$。仕事比は $1-3/\sqrt{10}\simeq0.0513$ です。$M_i=5L$ とすると $\mu_i=15L/\sqrt{10}=3\sqrt{10}L/2$、$J_i=\chi M_i^2=15L^2$ で本文の例と一致します。

**3.** [GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の適用条件を満たすので $\mu_f^2=A_f/(16\pi)\ge\mu_i^2$、両者は正です。終期の[KerrのChristodoulou質量公式と不可約質量の範囲](#prop-bht7-christodoulou)より

$$
M_f^2=\mu_f^2+\frac{J_f^2}{4\mu_f^2}
\ge\mu_f^2\ge\mu_i^2.
$$

従って $M_f\ge\mu_i$、$W=M_i-M_f\le M_i-\mu_i$。$J_f\ne0$ なら第一の不等号は真に厳しくなります。固定面積の可逆曲線は定常**状態の数学的な比較**ですが、ここでは一つの物理過程の面積法則という追加の仮定を使用しました。その仮定がなければ $A_f\ge A_i$ は導けません。
<!-- solution-end -->

---

Smarr関係は、面積と角運動量が長さの二乗で変わることを忘れなければ、[第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)と矛盾せずに導けます。不可約質量は同じ面積を持つSchwarzschild解を基準にして、古典的な仕事の限界を数値化しました。次の **BHT8「Hawking温度の熱力学的意味」** では、これまで幾何量として扱った表面重力を、量子場のHawking温度と結び付けます。
