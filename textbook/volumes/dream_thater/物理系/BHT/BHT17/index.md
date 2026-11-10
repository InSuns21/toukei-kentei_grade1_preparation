# BHT17 電荷・回転とアンサンブル選択

[前講のSchwarzschild–AdS](../BHT16/index.md#thm-bht16-hawking-page)では、温度と境界の球面計量を揃えてから二つのサドルを比較しました。ところが電荷を持つブラックホールには、さらに電磁場の境界条件が必要です。たとえば電荷を保存する箱と、電荷を出し入れできる電極につながった箱は、**同じ温度でも同じ熱力学問題ではありません**。回転にも角運動量を保存する箱と角速度を指定する回転浴の違いがあります。

本講では最初に四つの固定条件を熱力学ポテンシャルと結び、次にReissner–Nordström（RN）解で異なる熱容量・Hessianを手で計算します。最後にKerr解の回転境界を調べ、超放射があるとき「形式上のポテンシャル」だけでは平衡を保証できないことを確かめます。

4次元Einstein–Maxwell重力、Lorentz計量 $(-,+,+,+)$、$G=c=\hbar=k_B=1$、磁荷なしを基準にします。RN・Kerrの明示計算では宇宙定数を零とし、時間並進Killing場を漸近平坦な無限遠で単位規格化します。温度 $T>0$ の逆数を $\beta=1/T$ と記します。全て非極限の定常解族に対する計算であり、極限解そのもののEuclid作用や、重力経路積分全体の収束を主張しません。

## 1. 何を境界で固定するのか

[BHT10のKerr–Newman第一法則](../BHT10/index.md#thm-bht10-mass-conjugates)を、熱的な記号で書きます。質量（保存エネルギー）を $M$、地平線エントロピーを $S$、軸対称の角運動量を $J$、電荷を $Q$ とします。共役量は地平線角速度 $\Omega_H$ と、基準ゲージを無限遠に指定した地平線電位差 $\Phi_H$ で、定常解族の変分は

$$
dM=T\,dS+\Omega_H\,dJ+\Phi_H\,dQ.
$$

ここで $d$ は定常解の状態空間上の全微分です。後で使う $\delta S,\delta Q,\delta J$ は、指定した境界条件の下で許される微小な変動方向を表します。熱浴が指定する $T_b,\Phi_b,\Omega_b$ と、解から計算する $T,\Phi_H,\Omega_H$ は、平衡条件を課すまでは別の量です。

温度を指定しても、電荷と角運動量の揺らぎを許すかどうかで変分可能な方向が異なります。[Maxwell場の境界変分](../BHT13/index.md#prop-bht13-maxwell-legendre)では、境界接成分のゲージポテンシャル $A_i$ を固定すれば $\Pi^i\delta A_i$ が消え、流束 $\Pi^i$ を固定する場合は $-\int A_i\Pi^i$ という境界Legendre項を足して $-A_i\delta\Pi^i$ に変えました。Euclid領域で実数値の場として行う変分計算から物理的な電気RN解へ移る際には時間成分の解析接続と電荷の規格化を別途合わせますが、「固定値と共役変分を入れ替える」という仕組みは同じです。

角運動量の場合にも、軸対称境界の回転速度を指定するか、対応する保存角運動量を指定するかで境界Hamiltonianの仕事項が変わります。回転座標 $\phi'=\phi-\Omega_b t$ によって境界の時間生成場は $k=\partial_t+\Omega_b\partial_\phi$ となり、これに沿ったエネルギーは $M-\Omega_bJ$ です。$\Omega_b$ は浴で与える角速度で、平衡サドル上で初めて $\Omega_b=\Omega_H$ を課します。

<a id="def-bht17-ensembles"></a>

<!-- formal-statement-start -->
> **定義（電荷・回転を含む熱力学アンサンブル）**  
> 4次元の非極限定常Einstein–Maxwellブラックホール解族で $dM=T\,dS+\Omega_H\,dJ+\Phi_H\,dQ$ が成り立つとする。熱浴の温度 $T_b>0$ を固定し、電荷・回転の境界データと交換可能な量によって、次の熱力学ポテンシャルを用いる（右辺の $T$ は平衡時には $T_b$ に等しい）。

| 境界で固定する量 | ポテンシャル | 自由に変動し得る保存量 |
| --- | --- | --- |
| $T_b,Q,J$ | $F=M-TS$ | $S$ |
| $T_b,\Phi_b,J$ | $\mathcal G_Q=M-TS-\Phi_bQ$ | $S,Q$ |
| $T_b,Q,\Omega_b$ | $\mathcal G_J=M-TS-\Omega_bJ$ | $S,J$ |
| $T_b,\Phi_b,\Omega_b$ | $\mathcal G=M-TS-\Phi_bQ-\Omega_bJ$ | $S,Q,J$ |

> 電荷固定では電束境界データ、電位固定ではゲージを指定した電位差を固定し、角運動量固定では回転の保存電荷、角速度固定では回転境界の時間生成場を固定する。変動を許す変数と境界データを同時に独立固定しない。これは平衡候補のLegendre変換の定義であり、任意の非コンパクト時空で分配関数が存在するという定義ではない。
<!-- formal-statement-end -->

表の $F,\mathcal G_Q,\mathcal G_J,\mathcal G$ は、**平衡枝上で評価する**ポテンシャルです。これに対し、浴の値を固定したまま平衡からずらす試験配置には、例えば電位・角速度固定なら

$$
\Psi_b(S,J,Q)=M(S,J,Q)-T_bS-\Phi_bQ-\Omega_bJ
$$

を用います。第一法則から、その許容変動に対する一次微分は

$$
d\Psi_b=(T-T_b)\,dS+(\Omega_H-\Omega_b)\,dJ+(\Phi_H-\Phi_b)\,dQ.
$$

独立に変動を許す方向で各係数を零にしたときだけ、浴の値と解の共役量が一致します。固定 $Q$ または固定 $J$ の場合は、対応する交換項を省いてその変数の変動を禁止します。したがって平衡枝上の $F=M-TS$ と、浴を固定して変分する $M-T_bS$ を混同しません。

<!-- definition-example-start: def-bht17-ensembles -->
**定義の確認**：電荷だけを持ち $J=0$ のRN解では、電荷を固定して微小に熱を加えると $dQ=0$ なので、第一法則は $dM=T\,dS$ です。同じ解を電位 $\Phi_b$ 固定の浴につなぐと $dQ$ を許し、

$$
d(M-\Phi_bQ)=T\,dS+(\Phi_H-\Phi_b)dQ
$$

を得ます。浴の $\Phi_b$ は固定して微分しています。平衡条件 $\Phi_H=\Phi_b$ では電荷方向の一次変分も消えます。実際の壁の電位を意味ある値にするには、[地平線と無限遠の電位差のゲージ規約](../BHT10/index.md#prop-bht10-gauge-difference)を守る必要があります。
<!-- definition-example-end -->

<a id="prop-bht17-legendre"></a>

<!-- formal-statement-start -->
> **命題（アンサンブルのLegendre微分）**  
> $C^2$ 級の非極限定常解族で $M=M(S,J,Q)$ とし、$T=M_S>0$、$\Omega_H=M_J$、$\Phi_H=M_Q$ が成り立つとする。Legendre変換が局所的に定義できる平衡枝では、

$$
dF=-S\,dT+\Omega_H\,dJ+\Phi_H\,dQ,
$$

$$
d\mathcal G=-S\,dT-J\,d\Omega_H-Q\,d\Phi_H.
$$

> 部分変換 $\mathcal G_Q$ と $\mathcal G_J$ は、それぞれ対応する $-\Phi_HdQ$ または $-\Omega_HdJ$ のLegendre変換を一つだけ行ったものである。
<!-- formal-statement-end -->

### 証明の見取り図

仕事項を消すには、引く積の微分で $\Phi_HdQ$ と $\Omega_HdJ$ がそれぞれ相殺されることを確認します。一般に変換後の枝の存在はHessianの非退化性に依存し、変換式だけでは安定性は得られません。

<!-- proof-start -->
### 証明

[第一法則](../BHT10/index.md#thm-bht10-mass-conjugates)から、$F=M-TS$ の微分は

$$
dF=dM-T\,dS-S\,dT=-S\,dT+\Omega_H\,dJ+\Phi_H\,dQ.
$$

ここで $\mathcal G=F-\Phi_HQ-\Omega_HJ$ を取ります。積の微分を明示すると

$$
d\mathcal G=dF-\Phi_HdQ-Qd\Phi_H-\Omega_HdJ-Jd\Omega_H
=-S\,dT-Q\,d\Phi_H-J\,d\Omega_H.
$$

片方だけを引けば対応する部分変換が得られます。ただし、この計算は状態空間上の微分の恒等式であり、変換後の全状態空間での一意性・凸性は導きません。
<!-- proof-end -->

この命題により、「固定 $Q$ での熱容量」と「固定 $\Phi$ での熱容量」は違う偏微分であることが分かります。熱容量は一般に[境界を指定した定義](../BHT15/index.md#def-bht15-heat-capacity)のように、**どの量を動かさずに微分するか**を添えて用います。

## 2. RNでは固定電荷と固定電位の熱容量が異なる

[RNの定常解族](../BHT4/index.md#def-bht4-rn-family)で外側地平線半径を $r=r_+>0$ とし、$|Q|<r$ の非極限領域だけを考えます。$r_-=Q^2/r$、$r_++r_-=2M$ を使うと、次の三つは独立した自由度ではなく、$r,Q$ の関数です。

$$
M(r,Q)=\frac{r^2+Q^2}{2r},\qquad S(r)=\pi r^2,\qquad
T(r,Q)=\frac{r^2-Q^2}{4\pi r^3}.
$$

地平線と無限遠の電位差は $\Phi_H=Q/r$ です。電荷符号を残すため $Q$ は実数とします。直接微分すると

$$
dM=\frac{r^2-Q^2}{2r^2}\,dr+\frac Qr\,dQ,
\qquad T\,dS=\frac{r^2-Q^2}{2r^2}\,dr,
$$

従って [RN第一法則](../BHT4/index.md#thm-bht4-rn-first-law) の係数が合います。数値例 $r=2,Q=\sqrt2$ では $M=3/2$、$S=4\pi$、$T=1/(16\pi)$、$\Phi_H=1/\sqrt2$ で、$|Q|<r$ も満たします。この解を二つの浴に別々につなぎます。

<a id="thm-bht17-rn-capacities"></a>

<!-- formal-statement-start -->
> **定理（RNの固定電荷・固定電位熱容量）**  
> 4次元、$G=c=\hbar=k_B=1$、$\Lambda=0$、漸近平坦・非極限・純電気RN族で $r=r_+>|Q|$ とする。$T=(r^2-Q^2)/(4\pi r^3)$、$S=\pi r^2$ を用い、分母が零でない点での熱容量は

$$
C_Q=T\left(\frac{\partial S}{\partial T}\right)_Q
=\frac{2\pi r^2(r^2-Q^2)}{3Q^2-r^2},
$$

$$
C_\Phi=T\left(\frac{\partial S}{\partial T}\right)_{\Phi_H}
=-2\pi r^2,\qquad \Phi_H=\frac Qr.
$$

> $Q\ne0$ では $|Q|<r<\sqrt3|Q|$ に限り $C_Q>0$、$r>\sqrt3|Q|$ では $C_Q<0$ である。$r=\sqrt3|Q|$ では $T$ の固定電荷方向の微分が零となり、$C_Q$ は有限な熱容量として定義できない。$C_\Phi$ は非極限領域全体で負である。
<!-- formal-statement-end -->

### 証明の見取り図

固定 $Q$ では $dQ=0$ として $r$ を動かします。固定 $\Phi_H$ では $Q=\Phi_Hr$ という制約の下で $r$ を動かします。**同じ $T(r,Q)$ を微分しても、動かす経路が変わる**点が核心です。

<!-- proof-start -->
### 証明

$S_r=2\pi r$ です。固定 $Q$ の微分では

$$
\left(\frac{\partial T}{\partial r}\right)_Q
=\frac1{4\pi}\frac{d}{dr}\left(r^{-1}-Q^2r^{-3}\right)
=\frac{3Q^2-r^2}{4\pi r^4}.
$$

$T_r\ne0$ の場所で $C_Q=T S_r/T_r$ なので

$$
C_Q=\frac{r^2-Q^2}{4\pi r^3}\,
\frac{2\pi r}{(3Q^2-r^2)/(4\pi r^4)}
=\frac{2\pi r^2(r^2-Q^2)}{3Q^2-r^2}.
$$

他方、固定 $\Phi_H=\Phi$ では $Q=\Phi r$ を代入し、非極限性から $|\Phi|<1$ を得ます。従って

$$
T(r,\Phi)=\frac{1-\Phi^2}{4\pi r},\quad
\left(\frac{\partial T}{\partial r}\right)_\Phi
=-\frac{1-\Phi^2}{4\pi r^2}=-\frac Tr.
$$

同じ $S_r$ を使えば

$$
C_\Phi=T\frac{2\pi r}{-T/r}=-2\pi r^2<0.
$$

$r>|Q|$ だから $r^2-Q^2>0$ です。よって固定電荷の符号は $3Q^2-r^2$ だけで決まり、$Q=0$ では全て負になります。$r=\sqrt3|Q|$ は零除算になるため、そこで正負を飛び越えた有限値を割り当てません。
<!-- proof-end -->

**対比例**：$r=2,Q=\sqrt2$ の状態は $3Q^2-r^2=2>0$ なので

$$
C_Q=\frac{2\pi\cdot4\cdot2}{2}=8\pi,
\qquad C_\Phi=-8\pi.
$$

同じ解のまま、**許す電荷変動を変えただけ**で符号が反転します。ただし漸近平坦な無限の熱浴でRN全体の分配関数が収束するとの意味ではありません。ここで言えたのは、定常解族を制限した温度微分の符号です。

## 3. 一方向の熱容量だけでは二変数の安定性を判定できない

[BHT16の縮約正準作用](../BHT16/index.md#def-bht16-ads-reduced)では、外部から与えた $\beta$ を保ちながら半径を動かし、停留点の二階微分を調べました。電位固定では半径だけでなく電荷も動けます。そこで「Hessian」は、複数変数の $C^2$ 級関数の二階偏微分を並べた対称行列です。停留点でその二次形式が全ての非零方向に正なら**厳密な局所極小を保証**し、負になる方向があれば局所極小ではありません。ただし正定値は必要条件ではなく、たとえば $f(x)=x^4$ の原点は厳密な局所極小でも二階微分は零です。半正定値だけなら二階判定は未決着です。**Hessianが不定**とは、二次形式が正になる方向と負になる方向が両方あることです。これは実際の重力場の全てのゆらぎモードを調べたものではありません。

RNの正則解族は、エントロピーを半径の代わりの座標として使えます。

$$
S=\pi r^2,\qquad r=\sqrt{S/\pi},\qquad \frac{dr}{dS}=\frac1{2\pi r}>0.
$$

非極限領域では $r>0$ なので、半径方向の変動と $S$ 方向の変動は一対一に対応します。$(S,Q)$ 座標で書いた任意の $C^2$ 級縮約作用 $I(S,Q)$ に対し、微小変化を $(u,v)$ と書くと、停留点での二次項は

$$
\frac12\bigl(I_{SS}u^2+2I_{SQ}uv+I_{QQ}v^2\bigr)
=\frac12\begin{pmatrix}u&v\end{pmatrix}H\begin{pmatrix}u\\v\end{pmatrix}.
$$

したがって、行列式の符号は単なる数字ではなく、**許容変動で作用が増減する方向があるか**を判定する材料になります。ここで $I_{SQ}=\partial_S\partial_Q I$ のように下付き添字は指定した変数による偏微分を表し、他方の独立変数と浴の値は固定します。先の質量は

$$
M(S,Q)=\frac12\left(\sqrt{\frac S\pi}+Q^2\sqrt{\frac\pi S}\right),
\qquad S>\pi Q^2.
$$

正の温度 $T_b$ と電位 $\Phi_b$ を外部から指定したとき、次の縮約作用を使います。ここでの任意の $S,Q$ は、与えた $\beta$ に円錐周期が一致するとは限らない**試験配置**で、正則サドルでのみ停留条件が満たされます。

<a id="def-bht17-rn-reduced"></a>

<!-- formal-statement-start -->
> **定義（RNの縮約作用と局所Hessian）**  
> $S>\pi Q^2$ の非極限RN状態領域で、外部逆温度 $\beta>0$ と外部電位 $\Phi_b$ を固定する。電荷固定の一変数縮約作用と、電位固定の二変数縮約作用をそれぞれ

$$
I_{\beta,Q}(S)=\beta M(S,Q)-S,
\qquad I_{\beta,\Phi_b}(S,Q)=\beta[M(S,Q)-\Phi_bQ]-S
$$

> とする（最初の式では $Q$ は変動しない）。電位固定の二変数Hessianを、座標順 $(S,Q)$ に対して

$$
H_{\beta,\Phi_b}=\begin{pmatrix}
\partial_S^2I & \partial_S\partial_QI\\
\partial_Q\partial_SI & \partial_Q^2I
\end{pmatrix}
$$

> と定める。$I$ は $I_{\beta,\Phi_b}$ を表す。非極限の正則サドルで $\partial_SI=\partial_QI=0$ を課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht17-rn-reduced -->
**定義の確認**：$r=2,Q=\sqrt2$ は $S=4\pi>\pi Q^2=2\pi$ を満たします。温度と電位をサドルに合わせて $\beta=16\pi$、$\Phi_b=1/\sqrt2$ とすると、$\partial_SI=\beta T-1=0$ で、$\partial_QI=\beta(Q/r-\Phi_b)=0$ です。一方で電荷固定の試験変動なら $\delta Q=0$ に限られ、二変数Hessianの $Q$ 方向を調べることはできません。これは定義の許容変動の差そのものです。
<!-- definition-example-end -->

<a id="thm-bht17-rn-hessian"></a>

<!-- formal-statement-start -->
> **定理（RNの電位固定Hessianの不定性）**  
> 4次元の非極限RN族 $S>\pi Q^2$、$\beta>0$ における[縮約作用](#def-bht17-rn-reduced)の停留点では、$\beta T=1$、$\Phi_b=Q/r$ である。$(S,Q)$ 座標の二変数Hessianは

$$
H_{\beta,\Phi_b}=\beta\begin{pmatrix}
\dfrac{3Q^2-r^2}{8\pi^2r^5} & -\dfrac Q{2\pi r^3}\\
-\dfrac Q{2\pi r^3} & \dfrac1r
\end{pmatrix},\qquad
\det H_{\beta,\Phi_b}=\beta^2\frac{Q^2-r^2}{8\pi^2r^6}<0.
$$

> 従って電位固定の縮約模型では停留点は鞍点で、$C_Q>0$ の領域でも全許容方向の局所極小ではない。一方、電荷固定の一変数曲率は停留点で $I_{\beta,Q}''=1/C_Q$（有限かつ非零の場合）である。
<!-- formal-statement-end -->

### 証明の見取り図

質量の $M_S=T$ と $M_Q=\Phi_H$ から一次微分を作り、もう一度 $S,Q$ で微分します。$S$ を一定にすると $r$ も一定なので、交差微分には $Q$ の微分だけが出ます。$2\times2$ の行列式を展開すれば、$C_Q>0$ であっても符号が必ず負になることが直接分かります。

<!-- proof-start -->
### 証明

まず $r=\sqrt{S/\pi}$ なので $dr/dS=1/(2\pi r)$ です。$M_S=M_r(dr/dS)$ を計算すると

$$
M_S=\frac{r^2-Q^2}{2r^2}\frac1{2\pi r}
=\frac{r^2-Q^2}{4\pi r^3}=T,
\qquad M_Q=\frac Qr=\Phi_H.
$$

従って $\partial_S I=\beta T-1$、$\partial_QI=\beta(\Phi_H-\Phi_b)$ であり、停留条件が得られます。さらに

$$
M_{SS}=\left(\frac{\partial T}{\partial r}\right)_Q\frac{dr}{dS}
=\frac{3Q^2-r^2}{4\pi r^4}\frac1{2\pi r}
=\frac{3Q^2-r^2}{8\pi^2r^5},
$$

$$
M_{SQ}=\left(\frac{\partial T}{\partial Q}\right)_S
=-\frac Q{2\pi r^3},\qquad M_{QQ}=\frac1r.
$$

線形項 $-S$ と $-\beta\Phi_bQ$ は二階微分で消えるため $H=\beta D^2M$ です。その行列式は

$$
\begin{aligned}
\det H/\beta^2
&=\frac{3Q^2-r^2}{8\pi^2r^5}\frac1r
-\left(\frac Q{2\pi r^3}\right)^2\\
&=\frac{3Q^2-r^2-2Q^2}{8\pi^2r^6}
=\frac{Q^2-r^2}{8\pi^2r^6}<0.
\end{aligned}
$$

実対称 $2\times2$ 行列の固有値の積が負なので、一方は正、もう一方は負です。固定 $Q$ なら $S$ 方向のみで二階微分は $\beta M_{SS}$ です。[固定電荷の熱容量定義](../BHT15/index.md#def-bht15-heat-capacity)に $C_Q=T/M_{SS}$ を代入し、停留点の $\beta=1/T$ を使って $\beta M_{SS}=1/C_Q$ を得ます。
<!-- proof-end -->

**直接検算**：上の $r=2,Q=\sqrt2$ で

$$
M_{SS}=\frac1{128\pi^2},\qquad
M_{SQ}=-\frac{\sqrt2}{16\pi},\qquad M_{QQ}=\frac12,
$$

$$
\det D^2M=\frac1{256\pi^2}-\frac2{256\pi^2}
=-\frac1{256\pi^2}.
$$

$C_Q=8\pi$ の正の方向が存在しても、二変数行列式が負なので鞍点です。負曲率方向も、浴の $\Phi_b$ を固定して $Q=\Phi_b r$ と動かせば直接確認できます。この経路では $M=(1+\Phi_b^2)r/2$ なので

$$
I_{\beta,\Phi_b}(r,\Phi_b r)
=\beta\frac{1-\Phi_b^2}{2}r-\pi r^2,
\qquad \frac{d^2}{dr^2}I_{\beta,\Phi_b}(r,\Phi_b r)=-2\pi<0.
$$

これは $\delta Q=\Phi_b\,\delta r$ の許容変動に沿った負方向で、$C_\Phi<0$ とも整合します。ここでは $\beta,\Phi_b$ を固定した微分であり、各 $r$ に合わせて浴を再調節してはいません。

## 4. 回転では浴の時間そのものが変わる

無電荷Kerrでは $Q=0$ とし、[BHT10の質量関数](../BHT10/index.md#thm-bht10-mass-conjugates)を $G=1$ で特殊化すると

$$
M(S,J)^2=\frac S{4\pi}+\frac{\pi J^2}{S},
\qquad S>2\pi|J|.
$$

正の根 $M>0$ を選びます。$S>2\pi|J|$ は非極限性に対応します。これを $S,J$ で偏微分して共役量を求めると

$$
T=\left(\frac{\partial M}{\partial S}\right)_J
=\frac1{8\pi M}\left(1-\frac{4\pi^2J^2}{S^2}\right),
\qquad \Omega_H=\left(\frac{\partial M}{\partial J}\right)_S=\frac{\pi J}{MS}.
$$

平衡候補の固定 $J$ 縮約作用は $I_{\beta,J}(S)=\beta M(S,J)-S$、固定 $\Omega_b$ では $I_{\beta,\Omega_b}(S,J)=\beta[M(S,J)-\Omega_bJ]-S$ です。$\partial_JI_{\beta,\Omega_b}=0$ は $\Omega_H=\Omega_b$ を要求します。この変数の差はRNの場合と同じですが、回転はさらに浴の因果的な条件を持ちます。

無限遠で剛体回転する熱浴を想定すると、円筒半径 $\rho$ で速度は $|\Omega_b|\rho$ です。光速を超える領域まで同じ浴を延ばすことはできません。球対称AdSの境界代表計量なら、時間方向を $-dt^2+L^2(d\theta^2+\sin^2\theta\,d\phi^2)$ と書けるので、回転Killing場の二乗は $-1+\Omega_b^2L^2\sin^2\theta$ になります。

<a id="prop-bht17-kerr-bath"></a>

<!-- formal-statement-start -->
> **命題（Kerrの回転ポテンシャルと回転浴の条件）**  
> 4次元、$G=c=\hbar=k_B=1$、$\Lambda=0$ の非極限Kerr状態族で、質量関数と状態領域を

$$
M^2=\frac S{4\pi}+\frac{\pi J^2}{S},\qquad S>2\pi|J|
$$

> とする。固定 $\Omega_b$ の縮約作用の停留条件は

$$
\beta T=1,\qquad \Omega_b=\Omega_H=\frac{\pi J}{MS}
$$

> である。$J=0$ の停留点では固定 $J$ 方向の曲率が負で、Schwarzschildの熱容量は $C_J=-8\pi M^2$ である。
>
> また、半径 $R$ の静的な円筒境界の平坦背景では、回転場 $k=\partial_t+\Omega_b\partial_\phi$ が全境界点で時間的となる条件は $|\Omega_b|R<1$ である。静的な球面AdS境界代表計量 $-dt^2+L^2d\Omega_2^2$ では $k$ が全点で時間的となる条件は $|\Omega_b|L<1$ である。これらの運動学的条件だけで量子場の熱平衡や重力サドルの安定性は保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

回転Legendre項の $J$ 微分が $\Omega_H-\Omega_b$ になることを使います。非回転極限ではKerrの質量関数を一変数に戻して二階微分します。境界の因果条件は、浴の時間生成場のノルムを計量に代入して求めます。

<!-- proof-start -->
### 証明

$I_{\beta,\Omega_b}=\beta(M-\Omega_bJ)-S$ について

$$
\partial_SI=\beta M_S-1=\beta T-1,
\qquad \partial_JI=\beta(M_J-\Omega_b)=\beta(\Omega_H-\Omega_b).
$$

$J=0$ なら $M=\sqrt S/(2\sqrt\pi)$ なので、$S=4\pi M^2$ を利用して

$$
M_S=\frac1{4\sqrt{\pi S}}=\frac1{8\pi M},\qquad
M_{SS}=-\frac1{8\sqrt\pi S^{3/2}}=-\frac1{64\pi^2M^3}.
$$

$C_J=T/M_{SS}=-8\pi M^2$、かつ $\beta M_{SS}<0$ です。境界では $k=\partial_t+\Omega_b\partial_\phi$ だから、平坦な円筒壁上では $g_{tt}=-1,g_{\phi\phi}=R^2$、交差項が零で

$$
g(k,k)=-1+\Omega_b^2R^2.
$$

AdS境界代表計量では $g_{\phi\phi}=L^2\sin^2\theta$ なので

$$
g_\partial(k,k)=-1+\Omega_b^2L^2\sin^2\theta.
$$

全点（特に赤道 $\sin\theta=1$）で時間的となる厳密な条件を求めると、記載の不等式になります。等号では赤道で零になり、時間的ではありません。
<!-- proof-end -->

### 超放射が熱浴を難しくする理由

回転ブラックホールに向かうボソン場のモードを、無限遠の時刻 $t$ に対する正の周波数 $\omega>0$、角方向の整数 $m>0$ で $e^{-i\omega t+im\phi}$ と書きます。地平線の生成場に対する周波数は

$$
\omega-m\Omega_H,\qquad \chi_H=\partial_t+\Omega_H\partial_\phi
$$

です。$0<\omega<m\Omega_H$ の散乱モードでは、適切な境界条件の下で反射波が入射波より増幅する**超放射**が起こり得ます。熱浴でのボソン占有因子も形式的には

$$
n_{\beta,\Omega_b}(\omega,m)=\frac1{e^{\beta(\omega-m\Omega_b)}-1}
$$

なので、$\omega-m\Omega_b\le0$ を許すスペクトルを無条件に平衡分配関数へ入れることはできません。

平坦な無限遠まで一定の $\Omega_b\ne0$ の回転浴を延ばすと、上の $|\Omega_b|R<1$ を任意に大きな $R$ では満たせません。有限の反射壁またはAdSの境界条件を設けると平衡の候補を考えられますが、壁のモードスペクトル、境界の時間性、超放射不安定性、作用の全ての揺らぎ方向を別々に調べる必要があります。$|\Omega_b|L<1$ は静的AdS境界代表計量についての**必要な運動学的判定**であって、任意のKerr–AdS解の十分な安定条件ではありません。Kerr–AdSでは非回転無限遠系と回転座標系の角速度を混同せず、共役角速度を選び直します。

## 5. 何の安定性まで判定したのか

| 比較 | 今回計算したもの | それだけでは言えないこと |
| --- | --- | --- |
| $C_Q>0$ | RNで $Q$ を変えない半径方向の温度応答 | $Q$ も揺らぐ浴での局所極小 |
| $\det H_{\beta,\Phi_b}<0$ | RNの $(S,Q)$ 縮約模型の鞍点 | 量子重力経路積分の厳密な収束や全重力モードのスペクトル |
| $F,\mathcal G$ のLegendre変換 | 正則解族の平衡熱力学・境界仕事 | 非コンパクトな熱浴の存在やサドルの大域支配 |
| $g(k,k)<0$ | 指定した境界での回転時間の因果的条件 | 超放射モードの不存在や熱的安定性の十分条件 |

特に、局所的に $C_Q>0$ のRN解を「電位固定でも安定」と判定するのは誤りです。逆に $C_\Phi<0$ だけから、電荷を厳密に固定した孤立系の微正準的不安定性を結論するのも誤りです。[BHT15の有限空洞](../BHT15/index.md#def-bht15-cavity-ensembles)では壁で測るエネルギーと温度が変わり、[BHT16のAdS](../BHT16/index.md#def-bht16-ads-canonical)では共形境界の規格化が変わるため、上記の漸近平坦RNの $C_Q$ を条件なしに流用できません。

## 6. 演習――境界データから局所安定性まで

### Level A：仕事項、RNの状態量と二つの熱容量

<a id="ex-bht17-a01"></a>

#### BHT17-A01 電束固定への境界Legendre変換

- Level: A
- 問題: 境界計量を固定した滑らかなEuclid Maxwell場で、作用 $I_M$ の変分に $\int_B\Pi^i\delta A_i\,d^3y$ が現れるとする。$I_{\rm Leg}=-\int_B A_i\Pi^i\,d^3y$ を加えたときの境界変分を求め、固定する量を答えよ。$\Pi^i$ は面積密度 $\sqrt h$ を含むとする。

<!-- solution-start -->
**詳細解答**：境界項の積を変分すると

$$
\delta I_{\rm Leg}=-\int_B(\delta A_i\,\Pi^i+A_i\,\delta\Pi^i)\,d^3y.
$$

元の作用の境界項と加えると、$\Pi^i\delta A_i$ が互いに打ち消されて

$$
\left.\delta(I_M+I_{\rm Leg})\right|_B=-\int_B A_i\,\delta\Pi^i\,d^3y.
$$

従って $\delta\Pi^i=0$ を課せば停留条件が成り立ちます。元の $\delta A_i=0$ と異なる変分問題です。$\Pi^i$ は既に $\sqrt h$ を含むため、積分でさらに $\sqrt h$ を掛ければ別の量になってしまいます。これは[Maxwell境界Legendre変換](../BHT13/index.md#prop-bht13-maxwell-legendre)の具体検算です。
<!-- solution-end -->

<a id="ex-bht17-a02"></a>

#### BHT17-A02 RNの質量から共役量を再構成する

- Level: A
- 問題: 4次元非極限RN族を自然単位で $r>|Q|$ とし、$M=(r^2+Q^2)/(2r)$、$S=\pi r^2$ とする。$T=(\partial M/\partial S)_Q$、$\Phi_H=(\partial M/\partial Q)_S$ を求め、$r=3,Q=1$ の $M,T,\Phi_H$ を計算せよ。

<!-- solution-start -->
**詳細解答**：$S$ と $r$ の関係から $dr/dS=1/(2\pi r)$ です。従って

$$
M_r=\frac12-\frac{Q^2}{2r^2},\quad
T=M_r\frac{dr}{dS}=\frac{r^2-Q^2}{4\pi r^3}.
$$

$S$ 固定では $r$ 固定なので、$\Phi_H=M_Q=Q/r$ です。$r=3>1=|Q|$ は非極限で、

$$
M=\frac{9+1}{6}=\frac53,\qquad
T=\frac{9-1}{4\pi\cdot27}=\frac2{27\pi},\qquad
\Phi_H=\frac13.
$$

両偏微分を同じ $M(S,Q)$ から得たので、$dM=T\,dS+\Phi_HdQ$ も成り立ちます。
<!-- solution-end -->

<a id="ex-bht17-a03"></a>

#### BHT17-A03 固定電荷の正の熱容量領域

- Level: A
- 問題: 非極限RNの $T=(r^2-Q^2)/(4\pi r^3)$、$S=\pi r^2$ に対し、電荷 $Q\ne0$ を固定して $C_Q$ を求めよ。$r=2,Q=\sqrt2$ の値と、$r=\sqrt3|Q|$ の意味を説明せよ。

<!-- solution-start -->
**詳細解答**：電荷固定で $T=(r^{-1}-Q^2r^{-3})/(4\pi)$ と書き直すと

$$
T_r=\frac{-r^{-2}+3Q^2r^{-4}}{4\pi}
=\frac{3Q^2-r^2}{4\pi r^4},\qquad S_r=2\pi r.
$$

$T_r\ne0$ の点で

$$
C_Q=\frac{T S_r}{T_r}
=\frac{2\pi r^2(r^2-Q^2)}{3Q^2-r^2}.
$$

$r=2,Q^2=2$ なら分子は $2\pi\cdot4\cdot2=16\pi$、分母は $6-4=2$ で $C_Q=8\pi>0$ です。$r=\sqrt3|Q|$ では $T_r=0$、一方 $S_r>0,T>0$ なので固定電荷方向の $dS/dT$ は有限に定まりません。そこを無限大の熱容量の転換点と記述してよいものの、有限値を代入してはいけません。
<!-- solution-end -->

<a id="ex-bht17-a04"></a>

#### BHT17-A04 固定電位で電荷も動く

- Level: A
- 問題: 非極限RNで電位 $\Phi_H=Q/r=3/5$ を固定する。$r=5,Q=3$ の状態から $r$ を動かすときの $Q(r)$、$T(r)$、$C_\Phi$ と、初期状態の温度を求めよ。

<!-- solution-start -->
**詳細解答**：固定電位の制約は $Q(r)=(3/5)r$、従って $dQ/dr=3/5$ です。これを $T(r,Q)$ に代入すると

$$
T(r)=\frac{1-(3/5)^2}{4\pi r}
=\frac{16}{25}\frac1{4\pi r}=\frac4{25\pi r}.
$$

$T_r=-T/r$、$S_r=2\pi r$ なので

$$
C_\Phi=T\frac{S_r}{T_r}=-2\pi r^2.
$$

$r=5$ では $C_\Phi=-50\pi$、$T=4/(125\pi)$ です。固定 $Q=3$ の微分とは異なり $dQ$ を許している点が本問の重要な条件です。
<!-- solution-end -->

<a id="ex-bht17-a05"></a>

#### BHT17-A05 RNの二つのon-shellポテンシャル

- Level: A
- 問題: 非極限RNで $r=2,Q=1$ とする。$M=(r^2+Q^2)/(2r)$、$S=\pi r^2$、$T=(r^2-Q^2)/(4\pi r^3)$、$\Phi=Q/r$ から、$F=M-TS$ と $\mathcal G_Q=F-\Phi Q$ を計算せよ。差がどの仕事項に当たるか述べよ。

<!-- solution-start -->
**詳細解答**：まず $M=5/4$、$T=3/(32\pi)$、$S=4\pi$、$\Phi=1/2$ なので

$$
TS=\frac3{32\pi}\,4\pi=\frac38,\qquad
F=\frac54-\frac38=\frac78.
$$

電位固定へLegendre変換すると

$$
\mathcal G_Q=F-\Phi Q=\frac78-\frac12=\frac38.
$$

差 $F-\mathcal G_Q=\Phi Q=1/2$ は、電荷を浴と交換するときの電気的仕事のLegendre項です。$F$ と $\mathcal G_Q$ の大小を、異なる固定条件の分配関数の大小として直接比較してはいけません。
<!-- solution-end -->

### Level B：Hessian、応答関数と回転の境界

<a id="ex-bht17-b01"></a>

#### BHT17-B01 正の一方向曲率と負の行列式

- Level: B
- 問題: 非極限RNで $r=3,Q=2$、$S=\pi r^2$、$M=(r^2+Q^2)/(2r)$ とする。固定 $Q$ の熱容量、$M_{SS},M_{SQ},M_{QQ}$、$\det D^2M$ を求め、固定 $Q$ と固定電位での縮約作用の局所安定性を比較せよ。固定電位では $I=\beta(M-\Phi_bQ)-S$ とする。

<!-- solution-start -->
**詳細解答**：$r=3>|Q|=2$、$3Q^2-r^2=12-9=3>0$ なので、[熱容量の式](#thm-bht17-rn-capacities)を代入すると

$$
C_Q=\frac{2\pi\cdot9\cdot(9-4)}{12-9}=30\pi>0.
$$

$M_S=T$ を固定 $Q$ で $S$ 微分するには $dr/dS=1/(2\pi r)$ を用います。$T_r=(3Q^2-r^2)/(4\pi r^4)$ だから

$$
M_{SS}=\frac{12-9}{8\pi^2\cdot3^5}
=\frac1{648\pi^2}.
$$

また $S$ 固定では $r$ 固定なので

$$
M_{SQ}=\partial_Q\left(\frac{r^2-Q^2}{4\pi r^3}\right)
=-\frac Q{2\pi r^3}=-\frac1{27\pi},\quad M_{QQ}=\partial_Q(Q/r)=\frac13.
$$

従って

$$
\det D^2M=\frac1{648\pi^2}\frac13-\frac1{729\pi^2}
=\frac{3-8}{5832\pi^2}=-\frac5{5832\pi^2}<0.
$$

固定 $Q$ では $I_{SS}=1/C_Q>0$ で半径方向の局所極小ですが、電位固定では $\det D^2I=\beta^2\det D^2M<0$ なので二変数の鞍点です。実際の重力場の全モード安定性をこの二変数だけで断定しません。
<!-- solution-end -->

<a id="ex-bht17-b02"></a>

#### BHT17-B02 電位・温度固定での電荷感受率

- Level: B
- 問題: 非極限RNの平衡条件 $T=(1-\Phi^2)/(4\pi r)$、$Q=\Phi r$ を使う。$T>0$ と $|\Phi|<1$ を指定したとき $r(T,\Phi)$ と $Q(T,\Phi)$ を求め、$T$ 固定の $(\partial Q/\partial\Phi)_T$ の符号を分類せよ。$C_\Phi$ の符号と、この感受率の符号が別の判定である理由も述べよ。

<!-- solution-start -->
**詳細解答**：$T>0$ と $1-\Phi^2>0$ なので、温度式を $r$ について解けます。

$$
r(T,\Phi)=\frac{1-\Phi^2}{4\pi T}>0,
\qquad Q(T,\Phi)=\Phi r=\frac{\Phi-\Phi^3}{4\pi T}.
$$

$T$ を定数に保って微分すると

$$
\left(\frac{\partial Q}{\partial\Phi}\right)_T
=\frac{1-3\Phi^2}{4\pi T}.
$$

分母は正なので、$|\Phi|<1/\sqrt3$ で正、$|\Phi|=1/\sqrt3$ で零、$1/\sqrt3<|\Phi|<1$ で負です。一方 $C_\Phi=-2\pi r^2<0$ は固定電位で温度を動かしたときのエントロピー応答です。両者は異なる偏微分であり、いずれか一方だけで二変数の正定値性は決まりません。実際には[RNのHessian定理](#thm-bht17-rn-hessian)で行列式まで調べます。
<!-- solution-end -->

<a id="ex-bht17-b03"></a>

#### BHT17-B03 Kerrの非回転極限と二つの揺らぎ方向

- Level: B
- 問題: 4次元非極限Kerrの $M(S,J)=\sqrt{S/(4\pi)+\pi J^2/S}$ を使う。$J=0$ で $M_{SS},M_{SJ},M_{JJ}$ を $M>0$ で表し、$(S,J)$ の質量Hessianの符号を判定せよ。$S=4\pi M^2$ としてよい。

<!-- solution-start -->
**詳細解答**：まず $J=0$ では $M=\sqrt S/(2\sqrt\pi)$ なので

$$
M_{SS}=\frac{d^2}{dS^2}\frac{\sqrt S}{2\sqrt\pi}
=-\frac1{8\sqrt\pi S^{3/2}}=-\frac1{64\pi^2M^3}.
$$

$M_J=\pi J/(MS)$ は $J$ に関して奇関数なので $M_{SJ}=0$ が $J=0$ で成り立ちます。$J$ で再度微分すると

$$
M_{JJ}=\frac\pi{MS}-\frac{\pi J}{M^2S}\,M_J,
\quad \left.M_{JJ}\right|_{J=0}=\frac\pi{MS}=\frac1{4M^3}.
$$

従って Hessianは対角で、一方の固有値が負、もう一方が正です。

$$
\det D^2M\big|_{J=0}=\left(-\frac1{64\pi^2M^3}\right)\frac1{4M^3}
=-\frac1{256\pi^2M^6}<0.
$$

固定 $J$ の縮約作用は $S$ 方向の負曲率を持ち、$C_J=T/M_{SS}=-8\pi M^2$ と一致します。固定角速度の二変数モデルでも鞍点ですが、これは非回転点における計算です。全Kerr族での安定性を外挿しません。
<!-- solution-end -->

<a id="ex-bht17-b04"></a>

#### BHT17-B04 回転境界の因果条件と超放射帯

- Level: B
- 問題: 静的な球面AdS境界代表計量 $-dt^2+L^2(d\theta^2+\sin^2\theta d\phi^2)$ に対し $k=\partial_t+\Omega_b\partial_\phi$ とする。$|\Omega_b|L=4/5$ と $6/5$ の場合の時間性を赤道で判定せよ。また $\Omega_H>0$、$m=2$、$\omega=3\Omega_H/2$ の散乱モードについて $\omega-m\Omega_H$ を求め、この一つの符号から熱平衡が存在すると判定できるか説明せよ。

<!-- solution-start -->
**詳細解答**：赤道 $\sin\theta=1$ で

$$
g_\partial(k,k)=-1+\Omega_b^2L^2.
$$

$|\Omega_b|L=4/5$ なら $-1+16/25=-9/25<0$ で、他の緯度では $\sin^2\theta\le1$ だから全点で時間的です。$6/5$ なら $-1+36/25=11/25>0$ となり赤道では空間的です。これは[境界の時間性](#prop-bht17-kerr-bath)を直接代入した計算です。

与えられたモードでは

$$
\omega-m\Omega_H=\frac32\Omega_H-2\Omega_H
=-\frac12\Omega_H<0.
$$

この値は超放射帯に入るという運動学的判定です。実際の増幅には波の境界条件・散乱係数が必要ですし、一モードの条件だけでは分配関数の収束や全揺らぎの安定性を証明できません。境界時間性と超放射の可能性は別々に検査すべきです。
<!-- solution-end -->

### Level C：同一RN解を二つの浴で検査する

<a id="ex-bht17-c01"></a>

#### BHT17-C01 固定電荷での局所極小と固定電位での鞍点

- Level: C
- 問題: 自然単位の漸近平坦・非極限RN状態で $r=2,Q=\sqrt2$ を考える。質量・エントロピー・温度・電位を $M=(r^2+Q^2)/(2r)$、$S=\pi r^2$、$T=(r^2-Q^2)/(4\pi r^3)$、$\Phi_H=Q/r$ で定める。外部浴を $\beta=1/T$、$\Phi_b=\Phi_H$ に調節する。次を順に示せ。

  1. $M,S,T,\Phi_b$、$F=M-TS$、$\mathcal G_Q=F-\Phi_bQ$ を求める。
  2. 固定電荷縮約作用 $I_{\beta,Q}=\beta M-S$ が停留し、その二階微分が正になることを確認する。
  3. 電位固定縮約作用 $I_{\beta,\Phi_b}=\beta(M-\Phi_bQ)-S$ の $2\times2$ Hessianを明示し、停留点が鞍点であることを示す。
  4. なぜこの結果だけで漸近平坦無限遠の平衡分配関数の存在を主張できないか述べる。

<!-- solution-start -->
**詳細解答**：**1. 状態量とポテンシャル**：$r=2>|Q|=\sqrt2$ なので非極限性が成立します。$Q^2=2$ を使えば

$$
M=\frac{4+2}{4}=\frac32,\qquad S=4\pi,\qquad
T=\frac{4-2}{4\pi\cdot8}=\frac1{16\pi},
$$

$$
\beta=16\pi,\qquad \Phi_b=\frac{\sqrt2}{2},\qquad
TS=\frac14,\qquad \Phi_b Q=1.
$$

従って

$$
F=\frac32-\frac14=\frac54,\qquad
\mathcal G_Q=\frac54-1=\frac14.
$$

**2. 固定電荷での停留と曲率**：[縮約作用の定義](#def-bht17-rn-reduced)に $\beta=16\pi$ を入れると $I_{\beta,Q}=16\pi\cdot3/2-4\pi=20\pi$ です。これを $S$ で微分する前に $M_S=T$ を用いると

$$
I_S=\beta T-1=16\pi\frac1{16\pi}-1=0.
$$

一方、固定 $Q$ 熱容量の公式では

$$
C_Q=\frac{2\pi\cdot4\cdot(4-2)}{3\cdot2-4}
=8\pi>0.
$$

停留点の $I_{SS}=1/C_Q$ なので

$$
I_{SS}=\frac1{8\pi}>0.
$$

これは電荷を固定した**一変数縮約方向**での局所極小です。

**3. 電位固定での停留とHessian**：$I_{\beta,\Phi_b}=16\pi(3/2-1)-4\pi=4\pi=\beta\mathcal G_Q$ です。$M_S=T$、$M_Q=\Phi_H$ なので $I_S=0$、$I_Q=\beta(\Phi_H-\Phi_b)=0$ です。二階微分は

$$
M_{SS}=\frac{6-4}{8\pi^2\cdot32}=\frac1{128\pi^2},\qquad
M_{SQ}=-\frac{\sqrt2}{2\pi\cdot8}=-\frac{\sqrt2}{16\pi},\qquad
M_{QQ}=\frac12.
$$

$H=\beta D^2M$ に $\beta=16\pi$ を掛けると

$$
H=\begin{pmatrix}
1/(8\pi) & -\sqrt2\\
-\sqrt2 & 8\pi
\end{pmatrix},\qquad
\det H=\frac1{8\pi}(8\pi)-2=-1<0.
$$

対称行列の行列式が負なので固有値は異符号です。同一RN解が電荷固定の一変数では局所極小、電位固定の二変数では鞍点と結論できます。なお $C_\Phi=-2\pi r^2=-8\pi$ も負曲率を示唆しますが、完全な二変数判定は行列式で直接行いました。

**4. 射程**：ここで変動させたのはRNの $(S,Q)$ だけで、一般の非球対称重力摂動・Maxwell場の全モード・ゲージ固定・負モードを積分していません。また非コンパクトで漸近平坦な熱浴の体積、基準背景と作用の収束、放射の境界条件を指定していません。従って縮約作用のHessian判定は局所的な必要な診断であって、厳密な平衡分配関数の存在や半古典サドルの大域支配の証明ではありません。
<!-- solution-end -->

---

次講BHT18「共変位相空間とNoether流」では、ここまで代表解の質量関数から読んでいた仕事項とエントロピー変分を、一般の微分同相不変な作用の境界変分から組み立てます。そのためにも、どの境界で何を固定したかという区別を保ちます。

