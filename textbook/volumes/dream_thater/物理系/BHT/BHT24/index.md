# BHT24 総合検算・微視状態と情報問題への橋

ブラックホールの温度は、地平線近傍の量子場からもEuclid時間の周期からも現れました。第一法則とHawking温度の組合せからもNoether電荷からも、面積に比例するエントロピーが得られました。しかし、**同じ式が現れること**と、**その式がすべての時空・量子状態で成り立つこと**は別です。さらに $S_{\rm BH}=A/4$ は「状態がいくつあるか」を示唆しますが、蒸発放射に何の情報が残るかをそれだけで教えません。

本講では条件を固定して各計算を再度つなぎ、どの結論が解族の代数恒等式で、どれが境界条件付きのサドル評価で、どれが量子重力の未解決問題なのかを明確にします。

断りがない限り4次元、計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$、対数は自然対数です。SchwarzschildとReissner–Nordström（RN）は漸近平坦・定常・非極限のEinstein重力の解、AdS例では宇宙定数 $\Lambda=-3/L^2$、$L>0$ を固定します。面積則は量子補正前の先頭項として扱います。

## 1. 同じ言葉でも条件の違う五つの法則

古典的な[零法則](../BHT2/index.md#thm-bht2-zeroth-law)、[面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)、[平衡状態の第一法則](../BHT4/index.md#thm-bht4-rn-first-law)と、[Hawking温度](../BHT8/index.md#prop-bht8-normalization)の熱的解釈は、同じ主張の単なる言い換えではありません。次の表は、それぞれの入力条件を読むための表です。

| 使う主張 | 対象と条件 | 得られる結論 | そのまま広げられない範囲 |
| --- | --- | --- | --- |
| 零法則 | 規格化した定常Killing地平線と必要な場の方程式・正則性 | 地平線の表面重力 $\kappa$ が一定 | 任意の動的な見かけの地平線 |
| 古典的面積定理 | 未来event horizon、零エネルギー条件・大域的因果仮定 | $\Delta A\ge0$ | 量子放射に伴う負のエネルギー流 |
| 第一法則 | 近接する定常解、同じ漸近・境界条件、電荷の規格化 | $dM=\kappa dA/(8\pi)+\Omega_HdJ+\Phi_HdQ$ | 任意の非平衡過程を有限差分で置くこと |
| Hawking温度 | 量子状態、観測者と時間生成の選択、半古典近似 | $T_H=\kappa/(2\pi)$ | 極限地平線や任意の非定常状態への無条件な代入 |
| 一般化第二法則 | 同じ量子状態と繰り込み規約の地平線切断面、適切な半古典仮定 | $\Delta(A/(4G_{\rm ren})+S_{\rm out}^{\rm ren}+\cdots)\ge0$ | すべての量子重力時空への無条件な定理 |

特に[一般化エントロピーの定義](../BHT21/index.md#def-bht21-generalized-entropy)と[切断面間のGSL](../BHT22/index.md#def-bht22-gsl-balance)は、古典的面積非減少だけから従うものではありません。また[極限RNの第三法則上の注意](../BHT11/index.md#prop-bht11-rn-limit)に従い、$\kappa\to0$ の極限値と、最初から極限幾何に置くEuclid周期の議論を同一視しません。

## 2. Schwarzschild：温度・作用・エントロピーの三経路

まず、回転も電荷もない質量 $M>0$ の漸近平坦Schwarzschild解を考えます。座標時間 $t$ は無限遠で単位規格化した時間です。計量の静的係数 $f(r)=1-2M/r$ から、正則な非極限地平線 $r_+=2M$ の面積と表面重力を計算できます。ここで $f'(r)=df/dr$ は面積半径 $r$ による通常の微分であり、Killing時間 $t$ に関する微分ではありません。

$$
A=4\pi r_+^2=16\pi M^2,\qquad
\kappa=\frac{f'(r_+)}2=\frac{M}{r_+^2}=\frac1{4M}.
$$

[非極限地平線のEuclid周期](../BHT12/index.md#thm-bht12-nonextremal-period)は $\beta=2\pi/\kappa=8\pi M$ を与えます。これに対し、同じ漸近境界計量へ周期を合わせて平坦参照背景を差し引いた[on-shell Euclid作用](../BHT14/index.md#prop-bht14-relative-action)は $I_E=\beta M/2$ です。後者は無限遠で漸近平坦なSchwarzschildサドルの**形式的な熱力学評価**であり、無限体積の正準分配関数の安定な大域的平衡を保証しません。

<a id="prop-bht24-schwarzschild-three-checks"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild熱力学の三経路検算）**
> $M>0$ の4次元漸近平坦・非極限Schwarzschild解で、$G=c=\hbar=k_B=1$、無限遠のKilling時間を規格化する。Einstein重力の面積則と、境界周期を一致させた参照背景差引きEuclidサドル $I_E=\beta M/2$ を用いると、幾何学的温度・面積則・サドル作用から求めたエネルギーとエントロピーは一致し、形式的な熱容量は負である。

$$
T=\frac1{8\pi M},\quad S=4\pi M^2,\quad
I_E=4\pi M^2,\quad F=\frac M2,\quad C=-8\pi M^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

面積を $4$ で割った式を質量で微分する経路と、サドル作用を逆温度で微分する経路を独立に計算します。最後に温度の質量微分で熱容量の符号を確認します。

<!-- proof-start -->
### 証明

[面積則](../BHT9/index.md#prop-bht9-schwarzschild-entropy)より $S=A/4=4\pi M^2$。したがって $dS/dM=8\pi M=1/T$ であり、$TdS=dM$ となります。一方、$M=\beta/(8\pi)$ を参照背景差引き作用へ代入すると

$$
I_E(\beta)=\frac{\beta^2}{16\pi},\qquad
E=\frac{\partial I_E}{\partial\beta}=\frac\beta{8\pi}=M.
$$

正準サドルの関係 $I_E=\beta F$ と $S=\beta E-I_E$ を**このサドルの形式的な熱力学恒等式として**適用すれば

$$
F=\frac{\beta}{16\pi}=\frac M2,\qquad
S=\frac{\beta^2}{8\pi}-\frac{\beta^2}{16\pi}
=\frac{\beta^2}{16\pi}=4\pi M^2.
$$

さらに $dT/dM=-1/(8\pi M^2)$ なので $C=dM/dT=-8\pi M^2<0$。これは無限遠で温度を固定する正準平衡の不安定性を示唆しますが、[有限空洞での別の熱容量](../BHT15/index.md#thm-bht15-wall-capacity)や微正準系にそのまま転用しません。$\square$
<!-- proof-end -->

**直接検算**：$M=2$ なら $r_+=4$、$A=64\pi$、$T=1/(16\pi)$、$S=16\pi$、$\beta=16\pi$、$I_E=16\pi$、$F=1$ です。$\beta F=16\pi$ と $\beta E-I_E=32\pi-16\pi=16\pi$ はそれぞれ作用とエントロピーを再現します。

## 3. RN：電荷を固定するか変えるか

次は $M>|Q|$ の非極限RN解です。地平線半径 $r=r_+>|Q|$ を状態の座標に選ぶと、内側地平線が $r_-=Q^2/r$ なので、$M=(r+Q^2/r)/2$ と書けます。無限遠で電磁ポテンシャルをゼロに固定したゲージで、地平線電位は $\Phi_H=Q/r$ です。$Q$ を動かす微分を忘れると第一法則を誤ります。

<a id="prop-bht24-rn-law-smarr"></a>

<!-- formal-statement-start -->
> **命題（RNの第一法則とSmarr関係の同時検算）**
> 4次元・漸近平坦Einstein–Maxwell理論の非極限定常RN解で $r=r_+>|Q|$、$G=c=\hbar=k_B=1$、無限遠電位をゼロとする。$M=(r+Q^2/r)/2$、$S=\pi r^2$、$T=(r^2-Q^2)/(4\pi r^3)$、$\Phi_H=Q/r$ と置けば、独立変分 $(dr,dQ)$ に対し

$$
dM=T\,dS+\Phi_H\,dQ,\qquad
M=2TS+\Phi_HQ
$$

> が同時に成立する。
<!-- formal-statement-end -->

### 証明の見取り図

地平線方程式から $M$ を $(r,Q)$ で表し、その全微分の $dr,dQ$ 係数を $T\,dS+\Phi_H\,dQ$ と照合します。Smarr式は有限変化ではなく同次スケーリングに対応する恒等式です。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
dM&=\frac12\left(1-\frac{Q^2}{r^2}\right)dr+\frac Qr\,dQ,\\
T\,dS&=\frac{r^2-Q^2}{4\pi r^3}(2\pi r\,dr)
=\frac12\left(1-\frac{Q^2}{r^2}\right)dr.
\end{aligned}
$$

両式の $dr$ 係数と、$dQ$ 係数 $\Phi_H=Q/r$ が一致するので第一法則が成立します。また

$$
2TS+\Phi_HQ
=2\frac{r^2-Q^2}{4\pi r^3}\pi r^2+\frac{Q^2}{r}
=\frac{r^2-Q^2+2Q^2}{2r}=M.
$$

この式は[RN第一法則](../BHT4/index.md#thm-bht4-rn-first-law)と[Smarr関係](../BHT7/index.md#prop-bht7-smarr-kn)の具体解による相互検算です。$\square$
<!-- proof-end -->

**直接例**：$r=6,Q=3$ では $M=15/4$、$S=36\pi$、$T=1/(32\pi)$、$\Phi_H=1/2$。$2TS=9/4$、$\Phi_HQ=3/2$ なので和は $15/4$ です。また $dM/dr=3/8$（$Q$ 固定）と $T\,dS/dr=(1/(32\pi))12\pi=3/8$ も一致します。

$Q\to M$ で $T\to0$ でも $S\to\pi Q^2$ は有限です。**この極限値**から、極限解のEuclid周期を $\beta=\infty$ と一意に決められる、またはNernst型の第三法則がそのまま成立するとは言えません。[極限幾何に関する区別](../BHT11/index.md#prop-bht11-euclidean-order)を参照してください。

## 4. AdS：同じ温度の二枝と自由エネルギーの符号

漸近平坦なSchwarzschildの負熱容量を「すべてのブラックホールは熱的に不安定」と言い換えることも誤りです。4次元Schwarzschild–AdSの静的関数を $f(r)=1-2M/r+r^2/L^2$ とし、AdS半径 $L$ を固定します。ここで熱的AdSと比較するのは、**同じ境界時間円周を持つ重力側の正準アンサンブル**です。

<a id="prop-bht24-ads-transition"></a>

<!-- formal-statement-start -->
> **命題（AdS正準枝の安定性と転移点）**
> 4次元Einstein重力・固定 $L>0$ の球対称Schwarzschild–AdSサドルで、正則地平線半径 $r>0$ と、同じ境界計量で比較した熱的AdSの自由エネルギー $F_{\rm thermal}=0$ を用いる。$M=r(1+r^2/L^2)/2$、$S=\pi r^2$ に対して

$$
T=\frac{1+3r^2/L^2}{4\pi r},\quad
F=\frac r4\left(1-\frac{r^2}{L^2}\right),\quad
C_L=\frac{2\pi r^2(1+3r^2/L^2)}{3r^2/L^2-1}
$$

> となる。$r=L/\sqrt3$ は温度最小点、$r=L$ は $F=0$ のHawking–Page転移点である。ただし熱容量の符号は球対称の熱的枝の局所応答を表し、すべての摂動モードの安定性を単独では保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

地平線条件から $M(r)$ を求め、表面重力で $T(r)$ を作ります。$F=M-TS$ の零点と $dT/dr$ の零点は異なり、**局所安定性と参照サドルとの優劣は別**です。

<!-- proof-start -->
### 証明

$f(r)=0$ を $M$ について解けば $2M=r(1+r^2/L^2)$ です。$f'(r)=2M/r^2+2r/L^2$ に代入すると

$$
\kappa=\frac{f'(r)}2=\frac{1+3r^2/L^2}{2r},\qquad
T=\frac\kappa{2\pi}=\frac{1+3r^2/L^2}{4\pi r}.
$$

この $T$ と $S=\pi r^2$ より $TS=r(1+3r^2/L^2)/4$。したがって

$$
F=M-TS
=\frac r2\left(1+\frac{r^2}{L^2}\right)
-\frac r4\left(1+\frac{3r^2}{L^2}\right)
=\frac r4\left(1-\frac{r^2}{L^2}\right).
$$

さらに $dM/dr=(1+3r^2/L^2)/2$、$dT/dr=(3/L^2-1/r^2)/(4\pi)$ なので、$r\ne L/\sqrt3$ で $C_L=(dM/dr)/(dT/dr)$ が表示式になります。$r=L/\sqrt3$ で温度は極小、$T_{\min}=\sqrt3/(2\pi L)$。$r=L$ では $T_{\rm HP}=1/(\pi L)$ かつ $F=0$ です。[同じ境界条件の作用差](../BHT16/index.md#prop-bht16-ads-action)によって熱的AdSとの自由エネルギー差を判断でき、$r>L$ ではブラックホール側が小さくなります。$\square$
<!-- proof-end -->

**同じ温度での比較**：$T=1/(\pi L)$ は $r=L/3$ と $r=L$ の両方で成立します。小枝 $r=L/3$ は $3r^2/L^2<1$ より $C_L<0$、$F=2L/27>0$。大枝 $r=L$ は $C_L=4\pi L^2>0$、$F=0$。同じ温度でも、小枝は局所不安定、大枝は熱的AdSとの転移点です。これは[Hawking–Pageの重力サドル比較](../BHT16/index.md#thm-bht16-hawking-page)に基づくもので、境界CFTの状態計数はまだ行っていません。

## 5. 面積則、Wald公式、一般化エントロピーを重ねない

[定常分岐面のWald公式](../BHT19/index.md#def-bht19-wald-entropy)は、局所的・微分同相不変な重力作用の曲率微分と分岐面の双法線を組み合わせます。Einstein–Hilbert項なら $S_{\rm Wald}=A/(4G)$。一方、[計量形式の $f(R)$ 模型での公式](../BHT20/index.md#prop-bht20-fr-wald)では、適切な定常分岐面で

$$
S_{\rm Wald}=\frac1{4G}\int_{\mathcal B}f'(R)\,dA.
$$

ここで $f(R)$ の $R$ は前節の地平線半径 $r$ とは異なるRicciスカラーであり、$f'(R)=df/dR$ はスカラー曲率を動かした微分です。例えば $f(R)=R+\alpha R^2-2\Lambda$ の**定曲率解が実際に場の方程式を満たし** $R=4\Lambda$ なら、$f'(R)=1+8\alpha\Lambda$ で $S_{\rm Wald}=A(1+8\alpha\Lambda)/(4G)$。$\Lambda=0$ のRicci-flat Schwarzschildでは補正が消えます。場の方程式を満たさない仮の計量へこの数式を適用しても物理的ブラックホールのエントロピーを計算したことにはなりません。

量子場を含む半古典的な一般化エントロピーは、同じ切断面 $\mathcal B$ と同じ繰り込み処方で、概念的には

$$
S_{\rm gen}=S_{\rm grav}^{\rm ren}+S_{\rm out}^{\rm ren}+\text{必要な高次項}
$$

と組み立てます。[GSLの条件付き評価](../BHT22/index.md#prop-bht22-conditional-gsl)はこの総和の収支を論じ、$S_{\rm out}$ の単純な非減少や、Waldエントロピーだけの非減少を主張していません。[Bekenstein型境界](../BHT23/index.md#def-bht23-bekenstein-bound)も有限サイズ・エネルギー・状態の条件が要る別の主張です。

| 模型・設定 | 代表的エントロピー | 温度・安定性の検査 | 特に必要な留保 |
| --- | --- | --- | --- |
| Schwarzschild、漸近平坦、Einstein | $A/4$ | $T=1/(8\pi M)$、無限遠で $C<0$ | 参照背景差引きサドルは安定な正準浴を保証しない |
| 非極限RN、漸近平坦、Einstein–Maxwell | $A/4$ | $T=(r_+-r_-)/(4\pi r_+^2)$、$\Phi_H=Q/r_+$ | 固定 $Q$ と固定 $\Phi$ の応答は違う |
| Schwarzschild–AdS、Einstein、固定 $L$ | $A/4$ | $r_+>L/\sqrt3$ で球対称 $C_L>0$ | 熱的AdSと同一境界データで自由エネルギーを比較 |
| 定常分岐面の $f(R)$ 重力 | $\int f'(R)dA/(4G)$ | 解・境界条件・場の方程式を個別確認 | Einsteinの作用差や一般的な第二法則を流用しない |
| 半古典的な因果的地平線 | $S_{\rm grav}^{\rm ren}+S_{\rm out}^{\rm ren}+\cdots$ | GSLの対象は総和の切断面間の変化 | 量子状態と繰り込み、定理の証明範囲を固定 |

## 6. 面積エントロピーが示唆する「状態数」

通常の統計力学では、十分に狭いエネルギー窓 $[E,E+\Delta E]$ の中で許される微視状態の数 $\Omega(E,\Delta E)$ を数え、その対数を粗視的エントロピーと結びます。連続スペクトルでは窓幅・体積・規格化なしに「状態数」を数値として定義できないため、以下では有限個の直交状態のある模型を考えます。$\Omega$ 個の互いに直交する状態 $|i\rangle$ を等確率で混合したとき、密度演算子は

$$
\rho=\frac1\Omega\sum_{i=1}^{\Omega}|i\rangle\langle i|
$$

となります。この演算子は許容状態の張る部分空間上で固有値 $1/\Omega$ を $\Omega$ 個持ち、正半定値・トレース1です。その固有値を[既習のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)へ代入して $\ln\Omega$ を得ることが、次の対応の判定方法です。

<a id="def-bht24-microstate-count"></a>

<!-- formal-statement-start -->
> **定義（微視状態数によるエントロピーとの対応）**
> 固定したエネルギー窓と保存量を持つ有限次元の模型で、許された直交微視状態数を整数 $\Omega\ge1$ とする。等重み混合のエントロピーと、比較対象のブラックホールの熱力学的エントロピーをそれぞれ

$$
S_{\rm count}=\ln\Omega,\qquad S_{\rm BH}=\frac{A}{4G\hbar}
$$

> と表す。$\ln\Omega\simeq S_{\rm BH}$ は**模型の状態計数が満たすべき対応**であって、面積則だけから $\Omega$ の実在や整数値を構成したことを意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht24-microstate-count -->
**定義の確認**：同じエネルギー窓に直交状態が4個あり、等確率 $1/4$ なら、上の密度演算子はその4次元部分空間の恒等演算子を $I_4=\sum_{i=1}^4|i\rangle\langle i|$ と表すと、$\rho=I_4/4$ です。基底 $|j\rangle$ に作用させれば $\rho|j\rangle=|j\rangle/4$ です。したがって $\rho$ は正半定値・トレース1で、4個の固有値はすべて $1/4$ となり、

$$
S_{\rm count}=-4\cdot\frac14\ln\frac14=\ln4,\qquad
\exp(S_{\rm count})=4
$$

と元の個数が戻ります。形式的に面積との対応まで試すなら $A=4G\hbar\ln4$ と置いたときだけ $S_{\rm BH}=\ln4$ です。これは実在のブラックホールの状態数を構成したわけではありません。重みが $(1/2,1/4,1/8,1/8)$ なら、同じ4状態でもエントロピーは $\ln4$ より小さくなります。状態数と混合度を区別します。
<!-- definition-example-end -->

面積則は、形式的に $\Omega_{\rm eff}\sim\exp(A/4)$ という**指数的な規模**を予言します。しかし $A/4$ は連続的に変わり、$e^{A/4}$ は一般に整数ではありません。指数の主項、エネルギー窓、対数補正、境界条件、どの状態を数えるかを定めて初めて、実際の微視状態計数との比較になります。

<a id="prop-bht24-hypothetical-count"></a>

<!-- formal-statement-start -->
> **命題（仮想微視状態数からの温度と熱容量）**
> $E>0$ の漸近平坦Schwarzschild状態を模した滑らかな粗視エントロピー $S_{\rm count}(E)=4\pi E^2$ が、指定したエネルギー窓における $\ln\Omega$ の先頭近似として成立すると仮定する。微正準の熱力学的定義 $\beta(E)=dS_{\rm count}/dE$、$T=1/\beta$ を使えば

$$
\beta=8\pi E,\qquad T=\frac1{8\pi E},\qquad
C=\frac{dE}{dT}=-8\pi E^2.
$$

> これは仮定した状態数の熱力学的整合性であり、重力の微視状態を構成する存在証明ではない。
<!-- formal-statement-end -->

### 証明の見取り図

エントロピーの一階微分は逆温度、二階微分は応答の符号を支配します。状態数の模型を先に仮定してから温度を算出するので、面積則の独立な微視的証明と読み替えません。

<!-- proof-start -->
### 証明

$S_{\rm count}'(E)=8\pi E$ なので $\beta=8\pi E>0$、$T=1/(8\pi E)$。従って

$$
\frac{dT}{dE}=-\frac1{8\pi E^2},\qquad
C=\left(\frac{dT}{dE}\right)^{-1}=-8\pi E^2.
$$

二階微分 $S_{\rm count}''=8\pi>0$ であり、通常の正準安定性に適した凹なエントロピーとは異なります。命題はこの局所的応答までを述べます。$\square$
<!-- proof-end -->

特定の超対称・極限または近極限のブラックホール模型での微視状態計数や、特殊な低次元のホログラフィー模型での整合は重要な成果です。それでも、**任意の非極限・4次元・現実的な蒸発ブラックホールの全微視状態を数えた**ことにはなりません。量子補正や状態の同一視の問題も別途残ります。

## 7. 放射の精細エントロピーが問う、別のこと

ここまでは質量・電荷・面積など**巨視的状態量**が主役でした。しかし情報問題が問うのは、最終的に放射の量子状態に初期状態の識別情報が残るか、全時間にわたる相関がどうなるかです。個々の周波数の平均占有数がほぼ熱的であることと、全放射の密度演算子が厳密な熱混合であることは同値ではありません。

厳密な重力理論では部分系の分割自体に境界・拘束条件の問題があります。以下はまず[部分跡](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)が定義できる有限次元の二部系模型で、その違いを直接確かめます。

<a id="def-bht24-radiation-entropy"></a>

<!-- formal-statement-start -->
> **定義（放射部分系の精細エントロピー）**
> 有限次元二部Hilbert空間 $\mathcal H_B\otimes\mathcal H_R$ の正規化した密度演算子 $\rho_{BR}$ について、放射に対応する部分系 $R$ の状態を $\rho_R=\operatorname{Tr}_B\rho_{BR}$ とし、その**精細（fine-grained）エントロピー**を

$$
S_R=-\operatorname{Tr}(\rho_R\ln\rho_R)
$$

> とする（$0\ln0=0$）。これは同じ分割・時刻で定めたvon Neumannエントロピーであり、面積 $A/4$ や任意の粗視的熱エントロピーとは定義が異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht24-radiation-entropy -->
**定義の確認**：二量子ビット $|\Psi\rangle=(|0_B0_R\rangle+|1_B1_R\rangle)/\sqrt2$ は、直交する二つの基底ベクトルの係数二乗和が1なので規格化された純粋状態です。全体の密度演算子を展開すると

$$
\rho_{BR}=\frac12\bigl(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|\bigr).
$$

$B$ の基底で部分跡を取ると、交差項は $\operatorname{Tr}(|0_B\rangle\langle1_B|)=\langle1_B|0_B\rangle=0$ により消えます。従って

$$
\rho_R=\frac12\bigl(|0_R\rangle\langle0_R|+|1_R\rangle\langle1_R|\bigr).
$$

$\rho_R$ の固有値は $1/2,1/2$ なので $S_R=\ln2$ ですが、全体の固有値は $1,0,0,0$ で $S_{BR}=0$ です。
<!-- definition-example-end -->

<a id="prop-bht24-global-pure-local-mixed"></a>

<!-- formal-statement-start -->
> **命題（純粋全体系と混合放射部分系）**
> 有限次元二部系で $0\le p\le1$ とし、次の規格化状態を考える。

$$
|\Psi_p\rangle=\sqrt p\,|0_B0_R\rangle+\sqrt{1-p}\,|1_B1_R\rangle.
$$

> 全体系は純粋で $S_{BR}=0$ だが、放射部分系は

$$
S_R=-p\ln p-(1-p)\ln(1-p),
$$

> $0<p<1$ では正であり、$p=1/2$ で最大値 $\ln2$ を取る。
<!-- formal-statement-end -->

### 証明の見取り図

全体系の射影演算子とその部分跡の固有値が異なるため、純粋な時間発展と局所的に熱的に見える混合は両立します。

<!-- proof-start -->
### 証明

$\rho_{BR}=|\Psi_p\rangle\langle\Psi_p|$ は一つの固有値1と残り0を持つため $S_{BR}=0$。$B$ の正規直交基底で部分跡を取ると、非対角項 $|0_B\rangle\langle1_B|$ の跡は0なので

$$
\rho_R=p|0_R\rangle\langle0_R|+(1-p)|1_R\rangle\langle1_R|.
$$

従って固有値から表示の $S_R$ を得ます。ここでプライムは実数パラメータ $p$ による通常の微分を表します。$0<p<1$ で $S_R'(p)=\ln((1-p)/p)$、$S_R''(p)=-1/p-1/(1-p)<0$ なので、唯一の内点極大は $p=1/2$、値は $\ln2$ です。端点では両エントロピーが0です。$\square$
<!-- proof-end -->

この玩具模型はPage曲線の時間依存、重力の拘束条件、蒸発後のHilbert空間の同一視を**証明していません**。ただし、「放射の一部が混合だから、全体の量子発展が非ユニタリ」と推論できないことを具体的に示します。逆に半古典Hawking計算で得られた近似的熱スペクトルだけから、全放射の最終状態が純粋だとも言えません。

これからの問いは分かれます。

1. **ブラックホール情報（BHI）**：蒸発過程で放射部分系を時間とともにどう定義し、その精細エントロピーと相関をどう計算するか。Page曲線・情報回収・island処方の仮定は何か。
2. **ホログラフィー（HOLO）**：重力領域と境界量子系をどの条件で対応させ、エントロピーの幾何学的処方をどう導くか。AdSの重力サドル比較から境界理論の等式へ進むには何が要るか。
3. **微視状態計数**：特定理論での $\Omega$ の定義、保存量、近似極限、対数補正を指定して、$\ln\Omega\simeq A/4$ を独立に示せるか。

## 8. 演習：条件の指定と独立検算

### Level A：一つの式を自力で確かめる

<a id="ex-bht24-a01"></a>

#### BHT24-A01 Schwarzschildの五量

- Level: A

- 問題: $M=3$、自然単位の漸近平坦Schwarzschild解で $r_+,A,\kappa,T,S$ を求めよ。

<!-- solution-start -->
**詳細解答**　[Schwarzschildの面積・表面重力](#prop-bht24-schwarzschild-three-checks)を $M=3$ で評価します。地平線半径は $r_+=2M=6$ で、球面の面積・表面重力・温度・エントロピーは順に
$$
\begin{aligned}
A&=4\pi(6)^2=144\pi,&
\kappa&=\frac1{4M}=\frac1{12},\\
T&=\frac{\kappa}{2\pi}=\frac1{24\pi},&
S&=\frac A4=36\pi
\end{aligned}
$$
です。検算として $dS/dM=8\pi M$ を使えば、$M=3$ で $T(dS/dM)=(1/(24\pi))(24\pi)=1$ となり第一法則 $dM=T\,dS$ と一致します。
<!-- solution-end -->

<a id="ex-bht24-a02"></a>

#### BHT24-A02 作用の微分

- Level: A

- 問題: $I_E(\beta)=\beta^2/(16\pi)$ から $E$ と $S$ を求めよ。$\beta>0$ とする。

<!-- solution-start -->
**詳細解答**　[参照背景差引きEuclidサドルの熱力学恒等式](#prop-bht24-schwarzschild-three-checks) $E=\partial_\beta I_E,\ S=\beta E-I_E$ を、逆温度 $\beta$ を変数として用います。従って
$$
\begin{aligned}
E&=\frac{\partial}{\partial\beta}\frac{\beta^2}{16\pi}
  =\frac{\beta}{8\pi},\\
S&=\beta\frac{\beta}{8\pi}-\frac{\beta^2}{16\pi}
  =\frac{\beta^2}{16\pi}.
\end{aligned}
$$
Schwarzschildの関係 $\beta=8\pi M$ を代入すると、$E=M$、$S=(8\pi M)^2/(16\pi)=4\pi M^2$ です。ここで $\partial/\partial\beta$ はサドル作用を逆温度で微分する記法で、地平線半径 $r$ や座標時間 $t$ による微分ではありません。
<!-- solution-end -->

<a id="ex-bht24-a03"></a>

#### BHT24-A03 RNの電位

- Level: A

- 問題: 非極限RNで $r_+=5,Q=3$ とする。$r_-$、$M$、$\Phi_H$、$T$ を求め、非極限条件を確認せよ。

<!-- solution-start -->
**詳細解答**　$r_-=Q^2/r_+=9/5$、$M=(5+9/5)/2=17/5$、$\Phi_H=3/5$。$r_+>|Q|$ は $5>3$ なので非極限です。$T=(r_+^2-Q^2)/(4\pi r_+^3)=(25-9)/(4\pi125)=4/(125\pi)>0$。$M=17/5>3=|Q|$ とも整合します。
<!-- solution-end -->

<a id="ex-bht24-a04"></a>

#### BHT24-A04 AdSの温度極小

- Level: A

- 問題: $T(r)=(1+3r^2/L^2)/(4\pi r)$、$L>0$ の極小点と極小値を計算せよ。

<!-- solution-start -->
**詳細解答**　$T=(r^{-1}+3r/L^2)/(4\pi)$ より $T'(r)=(-r^{-2}+3/L^2)/(4\pi)$。$T'=0$ は $r=L/\sqrt3$ で、$r$ が小さい側では負、大きい側では正なので極小です。$T(L/\sqrt3)=(\sqrt3/L+\sqrt3/L)/(4\pi)=\sqrt3/(2\pi L)$。
<!-- solution-end -->

<a id="ex-bht24-a05"></a>

#### BHT24-A05 Wald補正の条件

- Level: A

- 問題: 定曲率解が存在すると仮定した $f(R)=R+\alpha R^2-2\Lambda$ で $R=4\Lambda$ のWaldエントロピーを求め、$\Lambda=0$ のRicci-flat解での値を述べよ。

<!-- solution-start -->
**詳細解答**　$f'(R)=1+2\alpha R$ だから定曲率面では $f'(4\Lambda)=1+8\alpha\Lambda$。従って $S_{\rm Wald}=A(1+8\alpha\Lambda)/(4G)$。$\Lambda=0$ で $R=0$ なら $S_{\rm Wald}=A/(4G)$。これはまず場の方程式を満たす解と定常分岐面があることを前提とし、任意の動的切片のGSLを示しません。
<!-- solution-end -->

### Level B：二つ以上の法則を接続する

<a id="ex-bht24-b01"></a>

#### BHT24-B01 RN第一法則の二係数

- Level: B

- 問題: $M=(r+Q^2/r)/2$、$S=\pi r^2$、$T=(r^2-Q^2)/(4\pi r^3)$、$\Phi_H=Q/r$ とする。非極限領域 $r>|Q|$ で $dr$ と $dQ$ の係数を別々に比較して第一法則を導け。

<!-- solution-start -->
**詳細解答**　[RNの第一法則](#prop-bht24-rn-law-smarr)を、状態空間の独立変数 $(r,Q)$ で直接検算します。まず全微分は
$$
\begin{aligned}
\frac{\partial M}{\partial r}\bigg|_Q
  &=\frac12\left(1-\frac{Q^2}{r^2}\right),&
\frac{\partial M}{\partial Q}\bigg|_r
  &=\frac Qr,\\
dM&=\frac12\left(1-\frac{Q^2}{r^2}\right)dr+\frac Qr\,dQ.
\end{aligned}
$$
一方、$S=\pi r^2$ は $Q$ に陽に依存しないので $dS=2\pi r\,dr$。従って
$$
T\,dS=\frac{r^2-Q^2}{4\pi r^3}\,2\pi r\,dr
       =\frac12\left(1-\frac{Q^2}{r^2}\right)dr.
$$
残る $dQ$ 係数も $\Phi_H=Q/r$ と一致します。よって独立な $dr,dQ$ の双方で $dM=T\,dS+\Phi_HdQ$ が成立します。$dQ=0$ だけの計算では全変分の検証になりません。
<!-- solution-end -->

<a id="ex-bht24-b02"></a>

#### BHT24-B02 AdS転移点の二枝

- Level: B

- 問題: 同一の境界温度 $T=1/(\pi L)$ のSchwarzschild–AdS解が $r=L$ と $r=L/3$ に対応することを示し、各枝の $F$ と $C_L$ の符号を比較せよ。

<!-- solution-start -->
**詳細解答**　[AdSの温度・自由エネルギー・熱容量](#prop-bht24-ads-transition)へ二つの半径をそれぞれ代入します。
$$
\begin{aligned}
T(L)&=\frac{1+3}{4\pi L}=\frac1{\pi L},&
T(L/3)&=\frac{1+1/3}{4\pi L/3}=\frac1{\pi L},\\
F(L)&=\frac L4(1-1)=0,&
F(L/3)&=\frac L{12}\left(1-\frac19\right)=\frac{2L}{27}>0.
\end{aligned}
$$
熱容量 $C_L=2\pi r^2(1+3r^2/L^2)/(3r^2/L^2-1)$ の分子は $r>0$ で正です。分母は大枝 $r=L$ では $3-1=2>0$、小枝 $r=L/3$ では $1/3-1=-2/3<0$。したがって $C_L(L)>0$、$C_L(L/3)<0$。前者は熱的AdSとの自由エネルギー交差点（同じ境界温度と参照作用で比較）、後者は局所不安定な小枝です。
<!-- solution-end -->

<a id="ex-bht24-b03"></a>

#### BHT24-B03 状態数と正準応答の相違

- Level: B

- 問題: $S(E)=4\pi E^2$、$E>0$ を仮想の微正準エントロピーとする。$T$、$C$ を求め、$S''$ の符号がなぜ無限遠での正準平衡の問題を知らせるか説明せよ。

<!-- solution-start -->
**詳細解答**　$\beta=S'=8\pi E$、$T=1/(8\pi E)$、$dT/dE=-1/(8\pi E^2)$、従って $C=-8\pi E^2<0$。また $S''=8\pi>0$ は凹性と逆の符号です。形式的な正準積分 $\int dE\,e^{S(E)-\beta E}$ の指数は大きな $E$ で $4\pi E^2-\beta E\to+\infty$ となり、この単純模型では積分は収束しません。微正準状態数の仮定だけで、無限遠の固定温度浴が存在すると結論してはいけません。
<!-- solution-end -->

<a id="ex-bht24-b04"></a>

#### BHT24-B04 部分跡と情報の区別

- Level: B

- 問題: $|\Psi\rangle=\sqrt3|0_B0_R\rangle/2+|1_B1_R\rangle/2$ とする。$S_{BR},S_R$ を求め、$S_R>0$ が非ユニタリ性の証拠にならない理由を述べよ。

<!-- solution-start -->
**詳細解答**　係数の二乗和は $3/4+1/4=1$。規格化した射影 $\rho_{BR}=|\Psi\rangle\langle\Psi|$ の固有値は $1,0,0,0$ なので $S_{BR}=0$ です。[部分跡の定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)により、$B$ の正規直交基底に関して $\langle 0_B|1_B\rangle=0$ を使うと
$$
\begin{aligned}
\rho_R&=\operatorname{Tr}_B(|\Psi\rangle\langle\Psi|)\\
&=\frac34|0_R\rangle\langle0_R|
  +\frac14|1_R\rangle\langle1_R|.
\end{aligned}
$$
$R$ の順序付き基底 $(|0_R\rangle,|1_R\rangle)$ での行列表現は $\operatorname{diag}(3/4,1/4)$ です。この二つが固有値だから
$$
S_R=-\frac34\ln\frac34-\frac14\ln\frac14>0.
$$
放射だけを観測すると $B$ との相関を捨てるため混合しますが、全体は純粋なままです。部分系の混合から全体の時間発展の非ユニタリ性は導けません。
<!-- solution-end -->

### Level C：条件を付け替えずに総合する

<a id="ex-bht24-c01"></a>

#### BHT24-C01 最終講の三重比較

- Level: C

- 問題: 自然単位・4次元Einstein重力で、(i) 漸近平坦Schwarzschild $M=1$、(ii) 非極限RN $r_+=2,Q=1$、(iii) 固定 $L=1$ のSchwarzschild–AdS $r_+=1$ を考える。各系の $M,T,S$ を求め、RNでは $M=2TS+\Phi_HQ$ を検算せよ。AdSでは熱的AdSとの $F$ の差を求め、三つのうち「同じ温度浴で安定」と結論してよいものを条件付きで整理せよ。最後に、これらの計算だけで放射の最終純粋性が証明されない理由を述べよ。

<!-- solution-start -->
**詳細解答**

1. (i) Schwarzschildでは $r_+=2$、$M=1$、$T=1/(8\pi)$、$S=4\pi$、$C=-8\pi<0$ です。無限遠で固定温度の安定正準サドルと判断できません。
2. (ii) RNでは $M=(2+1/2)/2=5/4$、$T=(4-1)/(4\pi\cdot8)=3/(32\pi)$、$S=\pi(2)^2=4\pi$、$\Phi_H=1/2$。$2TS=2(3/(32\pi))(4\pi)=3/4$、$\Phi_HQ=1/2$ なので和は $5/4=M$ です。熱的安定性には固定 $Q$ か固定 $\Phi$ かなど、揺らぐ変数とHessianの指定が別途必要です。
3. (iii) $L=r_+=1$ のAdSでは $M=(1+1)/2=1$、$T=(1+3)/(4\pi)=1/\pi$、$S=\pi$。$F=M-TS=1-1=0$、従って同じ境界条件の熱的AdSと自由エネルギーが一致します。$C_L=2\pi(1+3)/(3-1)=4\pi>0$ で球対称熱的枝の局所応答は正ですが、これは全摂動モードの完全安定性や熱的AdSに対する厳密な優位を意味しません。
4. 三つの $T,S$ は各背景・アンサンブルの状態量であり、放射密度演算子 $\rho_R$ の全時刻の相関を与えません。$S_{\rm BH}$ の面積と $S_R=-\operatorname{Tr}\rho_R\ln\rho_R$ は定義対象が違い、例えば本文の二量子ビット模型では全体が純粋でも部分系は混合状態です。従って、BHIの蒸発過程やHOLOの辞書を計算しないまま最終放射の純粋性を主張できません。
<!-- solution-end -->

## 9. 学び終えたときの境界線

古典的地平線幾何、半古典的な温度と熱力学、Euclidサドル、Wald公式、一般化第二法則は互いに接続できます。ただし接続はつねに**解の種類・正則性・境界データ・アンサンブル・量子状態**を指定して行う必要があります。

次に学ぶ際は、熱的な状態量が一致したことを情報回復の証明と取り違えないでください。BHIでは放射の精細エントロピーの時間依存と情報回収の条件を、HOLOでは境界量子理論と重力の対応を新たに構成する必要があります。ここで確かめた式はそのための検算基準ですが、これから証明するべき主張そのものではありません。
