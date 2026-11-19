# BHI2 地平線内外の分割とHawking対の玩具模型

## 1. 一個の熱的な外部モードは、内部との相関について何を語るか

[BHI1の蒸発終期の系の分割](../BHI1/index.md#def-bhi1-endpoint-split)では、放射だけを観測して全体の可逆性を判定できないことを学びました。しかしブラックホールの地平線近傍で、そもそもどの自由度を「外」、どれを「内」と呼び、なぜ外側だけが熱的になり得るのでしょうか。

[QCURV21の後期Hawking波束の熱因子](../../QCURV/QCURV21/index.md#prop-qcurv21-hawking-chain)は、崩壊時空の自由場に特定の状態と近似を置いたとき、外部波束の平均占有数がPlanck形になることを示します。この結果は、個々の外部モードの密度演算子が任意の背景・全時刻で厳密な熱平衡状態になる、という主張ではありません。今回は、外部一モードと内部一モードの**相関の構造**を手で計算することを目指します。

まず各モードを二準位系で代用し、外側を $O$、内側を $I$ と呼びます。$|0\rangle$ は「そのモードの占有なし」、$|1\rangle$ は「一個の占有あり」を模した基底です。これらは時空内の点を表すのではなく、ある時刻と場のモード分解を指定したうえでの自由度のラベルです。以下でまず用いるのは**有限次元・純粋・二部テンソル積**という数学的仮定であり、量子重力の厳密な地平線分割を証明したものではありません。

密度演算子と部分トレースは[QINF3の部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)、エントロピーは[QINF17のvon Neumannエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)に従い、対数は自然対数（単位 nat）です。

## 2. 内外二モードを一つの純粋状態にする

外側の二準位空間を $\mathcal H_O=\mathbb C^2$、内側を $\mathcal H_I=\mathbb C^2$ とし、テンソル積の順番は常に $O,I$ とします。$p$ は「一個占有の確率の重み」、$\phi$ は二つの振幅の相対位相です。作用素 $A$ の期待値は純粋状態について $\langle A\rangle=\langle\Psi|A|\Psi\rangle$ と書きます。振幅の二乗和を1にすれば、以下の具体的な二モード純粋状態を作れます。

<a id="def-bhi2-pair"></a>

<!-- formal-statement-start -->
> **定義（有限次元の内外対模型）**
>
> $\mathcal H_O=\mathcal H_I=\mathbb C^2$、$0\le p\le1$、$\phi\in\mathbb R$ とし、規格化ベクトル

$$
|\Psi_{p,\phi}\rangle_{OI}
=\sqrt{1-p}\,|0\rangle_O|0\rangle_I
+e^{i\phi}\sqrt p\,|1\rangle_O|1\rangle_I
$$

> と全密度演算子 $\rho_{OI}=|\Psi_{p,\phi}\rangle\langle\Psi_{p,\phi}|$ を定める。この二部系を**有限次元の内外対模型**という。内外の縮約は $\rho_O=\operatorname{Tr}_I\rho_{OI}$、$\rho_I=\operatorname{Tr}_O\rho_{OI}$ と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi2-pair -->
**定義の確認。** $p=1/4,\phi=0$ と取れば、係数は $\sqrt3/2,1/2$ です。$|00\rangle$ と $|11\rangle$ は互いに直交するので、状態のノルムの二乗は $3/4+1/4=1$。$\rho_{OI}$ は規格化ベクトルの階数1射影なので、正半定値、跡1、二乗して自身になることが直接確認できます。$p=0$ または $1$ では積状態ですが、$0<p<1$ では積状態にはなりません。実際、積状態で $|00\rangle$ と $|11\rangle$ の振幅がともに非零なら、各因子の0成分と1成分もすべて非零となり、$|01\rangle$ と $|10\rangle$ にも非零の振幅が現れるはずですが、この状態では両者の振幅が0だからです。
<!-- definition-example-end -->

なぜ内外の「相関」を見るために二つの係数が必要なのでしょうか。もし $|\Psi\rangle=|u\rangle_O|v\rangle_I$ という積状態なら、外側だけを捨てても内側だけを捨てても純粋状態のままです。しかし上の和では、外側が0なら内側も0、外側が1なら内側も1という対応があり、片側だけでは相対位相まで読めません。

<a id="prop-bhi2-reduction"></a>

<!-- formal-statement-start -->
> **命題（内外対の縮約・エントロピー・位相相関）**
>
> [有限次元の内外対模型](#def-bhi2-pair)で $0<p<1$ とする。内外の縮約密度演算子はともに占有基底で対角となり、

$$
\rho_O=\rho_I=
\begin{pmatrix}1-p&0\\0&p\end{pmatrix},
\qquad
S(O)=S(I)=h(p):=-(1-p)\ln(1-p)-p\ln p
$$

> である。全系は純粋で $S(OI)=0$。さらに $X|0\rangle=|1\rangle,\ X|1\rangle=|0\rangle$ および $Z|0\rangle=|0\rangle,\ Z|1\rangle=-|1\rangle$ に対して

$$
\langle Z_O\otimes I_I\rangle=1-2p,\quad
\langle Z_O\otimes Z_I\rangle=1,\quad
\langle X_O\otimes X_I\rangle=2\sqrt{p(1-p)}\cos\phi
$$

> を満たす。特に外側の密度演算子は $\phi$ に依存しないが、内外の共同測定は $\phi$ に依存し得る。
<!-- formal-statement-end -->

### 証明の見取り図

二つの射影項と二つの交差項に全状態を展開します。内側の直交基底で跡を取ると交差項が消え、外側の固有値が読めます。共同作用素については、$X\otimes X$ が $|00\rangle$ と $|11\rangle$ を入れ替えることを使います。

<!-- proof-start -->
### 証明

$a=\sqrt{1-p}$、$b=e^{i\phi}\sqrt p$ と置くと、$|a|^2+|b|^2=1$ です。密度演算子を展開すれば

$$
\rho_{OI}=|a|^2|00\rangle\langle00|
+ab^*|00\rangle\langle11|
+a^*b|11\rangle\langle00|
+|b|^2|11\rangle\langle11|.
$$

内側の基底で部分トレースすると、例えば

$$
\operatorname{Tr}_I(|00\rangle\langle11|)
=|0\rangle_O\langle1|\,\langle1|0\rangle_I=0
$$

であり、随伴の交差項も0です。残る二項は

$$
\rho_O=(1-p)|0\rangle\langle0|+p|1\rangle\langle1|.
$$

外側をトレースする場合も同じ計算で $\rho_I$ を得ます。両者は正の跡1の対角行列で、固有値は $1-p,p$。従って[QINF17のエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)をこの二固有値に適用すると $S(O)=S(I)=h(p)$ です。全系は正規化ベクトルへの射影で固有値が $1,0,0,0$ なので、$S(OI)=0$。

$Z\otimes I$ は $|00\rangle$ に $+1$、$|11\rangle$ に $-1$ を掛け、交差項は直交性で消えるので期待値は $(1-p)-p=1-2p$。$Z\otimes Z$ は両方の基底ベクトルに $+1$ を掛けるため、期待値は $|a|^2+|b|^2=1$ です。一方

$$
(X\otimes X)|00\rangle=|11\rangle,\qquad
(X\otimes X)|11\rangle=|00\rangle,
$$

よって

$$
\langle\Psi|X\otimes X|\Psi\rangle
=a^*b+b^*a=2\operatorname{Re}(a^*b)
=2\sqrt{p(1-p)}\cos\phi.
$$

これで全ての主張が示されました。$\square$
<!-- proof-end -->

**具体例。** $p=1/2,\phi=0$ では内外の縮約が $I_2/2$、各エントロピーは $\ln2$ です。$\phi=\pi$ に変えると縮約は不変ですが、$X_O\otimes X_I$ の期待値は $+1$ から $-1$ に変わります。これは[BHI1の放射観測代数](../BHI1/index.md#def-bhi1-radiation-channel)のように、外側単独の作用素と内外共同作用素を区別する必要があるためです。

片側の混合を見ただけでは「全体が混合した」とは言えません。同じ外側の密度演算子を持つ別の全状態を作れることは、[QCURV21の局所縮約の非一意性の命題](../../QCURV/QCURV21/index.md#prop-qcurv21-same-marginal)でも確認できます。

## 3. 有限模型の「熱的」とは正確には何か

エネルギーを計算するには外側にハミルトニアンを指定します。占有なしをエネルギー0、一個占有をエネルギー $\omega>0$ とした二準位のハミルトニアンを $H_O=\omega N_O$、$N_O=|1\rangle\langle1|$ とします。逆温度 $\beta>0$（$k_B=1$）のGibbs状態は $e^{-\beta H_O}/\operatorname{Tr}e^{-\beta H_O}$ です。ここでいう熱性は**この二準位模型の選んだエネルギー固有基底について**の性質です。

<a id="def-bhi2-two-level-thermal"></a>

<!-- formal-statement-start -->
> **定義（二準位の有効熱的対）**
>
> $\beta>0,\omega>0$、$x=\beta\omega$ とし、[有限次元の内外対模型](#def-bhi2-pair)のパラメータを

$$
p_x=\frac{e^{-x}}{1+e^{-x}}
=\frac1{e^x+1},\qquad \phi=0
$$

> と定める。このときの $|\Psi_{p_x,0}\rangle$ を**二準位の有効熱的対**という。これは二準位への条件付き切り詰めであり、ボース場の正しい全占有統計そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi2-two-level-thermal -->
**定義の確認。** $x=\ln3$ なら $e^{-x}=1/3$ なので $p_x=1/4$ です。$x>0$ から $0<p_x<1/2$ が従い、両振幅の二乗和は $(1-p_x)+p_x=1$。外部の0と1の確率の比は $p_x/(1-p_x)=e^{-x}=1/3$ なので、指定したエネルギー差 $\omega$ に対するBoltzmann重みの比になっています。
<!-- definition-example-end -->

<a id="prop-bhi2-gibbs"></a>

<!-- formal-statement-start -->
> **命題（二準位対の外部Gibbs表示とエントロピー）**
>
> [二準位の有効熱的対](#def-bhi2-two-level-thermal)で $H_O=\omega |1\rangle\langle1|$ とする。このとき外部縮約は

$$
\rho_O=\frac{e^{-\beta H_O}}{1+e^{-\beta\omega}},
\quad
\langle N_O\rangle=p_x,\quad
S(O)=\ln(1+e^{-x})+\frac{x}{e^x+1}.
$$

> $x>0$ では $S(O)$ は $x$ の増加とともに厳密に減少し、$x\downarrow0$ で $\ln2$、$x\to\infty$ で0に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーの固有値が0と $\omega$ なので、指数行列は二つのBoltzmann重みを対角に並べるだけです。その正規化とエントロピーの固有値表示を結び、最後に $x$ で微分します。

<!-- proof-start -->
### 証明

$H_O$ は基底 $|0\rangle,|1\rangle$ で $\operatorname{diag}(0,\omega)$ です。従って

$$
e^{-\beta H_O}=\operatorname{diag}(1,e^{-x}),\qquad
Z=\operatorname{Tr}e^{-\beta H_O}=1+e^{-x}.
$$

[内外対の縮約命題](#prop-bhi2-reduction)へ $p=p_x=e^{-x}/Z$ を代入すると、$\rho_O=\operatorname{diag}(1/Z,e^{-x}/Z)=e^{-\beta H_O}/Z$。$N_O$ の期待値は $\operatorname{Tr}(\rho_ON_O)=p_x$ です。

$\ln(1-p_x)=-\ln Z$、$\ln p_x=-x-\ln Z$ を[エントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)に代入すると

$$
S(O)=-(1-p_x)(-\ln Z)-p_x(-x-\ln Z)
=\ln Z+xp_x.
$$

$dp_x/dx=-e^x/(1+e^x)^2=-p_x(1-p_x)$ です。また $d(\ln Z)/dx=-p_x$ なので

$$
\frac{dS}{dx}=-p_x+p_x+ x\frac{dp_x}{dx}
=-x p_x(1-p_x)<0\qquad(x>0).
$$

$x\downarrow0$ で $p_x\to1/2$、$x\to\infty$ で $p_x\to0$。連続性と $-p\ln p\to0$ から両端の極限を得ます。$\square$
<!-- proof-end -->

**温度を混同しない。** $x=\beta\omega$ と置いたのはこの模型の選択であり、時空から温度を導いたのではありません。現実のHawking温度と結ぶには[QCURV21の幾何光学・Bogoliubov・波束化の条件付き結果](../../QCURV/QCURV21/index.md#prop-qcurv21-hawking-chain)を別途適用する必要があります。またこの二準位の占有平均 $1/(e^x+1)$ は、自由な**ボース場**のPlanck平均 $1/(e^x-1)$ とは違います。

## 4. ボース場の無限占有を考えると、どこが変わるか

一つの自由なボースモードでは $n=0,1,2,\ldots$ 個の占有が許されます。有限模型をこの系にどう接続するかをはっきりさせましょう。以下では $0<z<1$ とし、内外にそれぞれ占有数基底 $|n\rangle$（$n=0,1,2,\ldots$）を持つ、可算個の正規直交基底で張られるHilbert空間を仮定します。無限和の係数の二乗和は幾何級数として収束するので、正規化ベクトルが作れます。

<a id="def-bhi2-boson-pair"></a>

<!-- formal-statement-start -->
> **定義（幾何級数型のボース二モード対）**
>
> 内外のボース占有数基底を $n=0,1,\ldots$ とし、$0<z<1$ に対して

$$
|\Omega_z\rangle_{OI}
=\sqrt{1-z}\sum_{n=0}^\infty z^{n/2}|n\rangle_O|n\rangle_I
$$

> を定義する。各 $|n\rangle_O|n\rangle_I$ は相互直交する。$z=e^{-\beta\omega}$ と置くときも、これは**選択された二モードの理想化された純化模型**であり、実際の崩壊時空全体の状態をこの一式で定義したわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi2-boson-pair -->
**定義の確認。** $z=1/3$ とすれば、各占有確率の候補は $(2/3)(1/3)^n$ で非負です。総和は

$$
\frac23\sum_{n=0}^\infty\left(\frac13\right)^n
=\frac23\cdot\frac1{1-1/3}=1.
$$

正規化と、$n=0,1$ だけでなく $n\ge2$ の無限個の成分を持つことの両方を確認できました。
<!-- definition-example-end -->

<a id="prop-bhi2-boson-entropy"></a>

<!-- formal-statement-start -->
> **命題（ボース対の縮約・平均占有数・切り詰め確率）**
>
> [幾何級数型のボース二モード対](#def-bhi2-boson-pair)で $0<z<1$ とする。外部縮約、平均占有数、およびvon Neumannエントロピーは

$$
\rho_O=(1-z)\sum_{n=0}^\infty z^n|n\rangle\langle n|,
\qquad
\bar n=\operatorname{Tr}(\rho_ON_O)=\frac z{1-z},
$$

$$
S(O)=-\ln(1-z)-\frac z{1-z}\ln z
=(1+\bar n)\ln(1+\bar n)-\bar n\ln\bar n.
$$

> ここで $N_O|n\rangle=n|n\rangle$。内外の各モードで $n=0,1$ の成分だけを残して正規化すると、得られる二量子ビット状態は $|\Psi_{p,0}\rangle$ で $p=z/(1+z)$。その切り詰めが成功する確率は $1-z^2$、捨てる $n\ge2$ の確率は $z^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

係数の二乗和と平均占有数には幾何級数とその微分を用います。エントロピーは対角固有値に対する和です。$n=0,1$ への射影では射影後のノルムで割ることを忘れないようにします。

<!-- proof-start -->
### 証明

$\langle m|n\rangle_I=\delta_{mn}$ なので、内側を部分トレースすると $n\ne m$ の交差項は消え、

$$
\rho_O=(1-z)\sum_{n=0}^\infty z^n|n\rangle_O\langle n|.
$$

規格化は $(1-z)\sum_{n=0}^\infty z^n=1$ です。$0<z<1$ では幾何級数を項別微分でき、

$$
\sum_{n=0}^\infty z^n=\frac1{1-z},\qquad
\sum_{n=1}^\infty nz^{n-1}=\frac1{(1-z)^2},
$$

従って

$$
\bar n=(1-z)\sum_{n=0}^\infty n z^n
=(1-z)\frac z{(1-z)^2}=\frac z{1-z}.
$$

固有値 $\lambda_n=(1-z)z^n$ は正で、エントロピー和が収束します。$\ln\lambda_n=\ln(1-z)+n\ln z$ だから

$$
\begin{aligned}
S(O)&=-\sum_{n=0}^\infty\lambda_n\ln\lambda_n\\
&=-\ln(1-z)\sum_{n=0}^\infty\lambda_n
-\ln z\sum_{n=0}^\infty n\lambda_n\\
&=-\ln(1-z)-\frac z{1-z}\ln z.
\end{aligned}
$$

$\bar n=z/(1-z)$ から $1+\bar n=1/(1-z)$、$z=\bar n/(1+\bar n)$ を代入すれば第二の表示を得ます。

切り詰め射影 $P=\sum_{n=0}^1|n,n\rangle\langle n,n|$ では

$$
P|\Omega_z\rangle=\sqrt{1-z}(|00\rangle+\sqrt z|11\rangle),
\qquad
\|P|\Omega_z\rangle\|^2=(1-z)(1+z)=1-z^2.
$$

これをノルムで割ると

$$
\frac{P|\Omega_z\rangle}{\sqrt{1-z^2}}
=\frac{|00\rangle+\sqrt z|11\rangle}{\sqrt{1+z}}
=|\Psi_{z/(1+z),0}\rangle.
$$

直交成分の二乗ノルムは全体1から切り詰め確率を引いた $z^2$ です。$\square$
<!-- proof-end -->

$z=e^{-x}$ を入れると**無限占有**の平均は $\bar n=1/(e^x-1)$、**条件付き二準位**の平均は $p_x=1/(e^x+1)$ です。分母の符号の差は単なる記号選択ではありません。$z\uparrow1$（高温側）では切り詰め成功確率 $1-z^2$ が0に近づき、二準位近似は特に悪くなります。$z\downarrow0$ では $n\ge2$ の重み $z^2$ が小さくなりますが、それでも条件付き模型と元の全状態を同一視しません。

ここでの単一対は、場の理論の紫外短距離相関、連続モードの正規化、灰色体因子、相互作用、放射のエネルギーが時空へ及ぼす反作用を含みません。[QCURV21の後期波束に対するHawking因子の適用条件](../../QCURV/QCURV21/index.md#prop-qcurv21-hawking-chain)に照らすと、有限の占有基底と任意の時間領域での熱的対は物理的に別の仮定です。地平線の位置とテンソル積の同一視そのものにも、ゲージ・重力の制約が残ります。

## 5. 熱的縮約だけでは、純化の仕方が決まらない

同じ $\rho_O=(1-p)|0\rangle\langle0|+p|1\rangle\langle1|$ に対し、先ほどの純粋な対と、位相の交差項を意図的に取り除いた状態を比べます。

$$
\rho^{\mathrm{class}}_{OI}
=(1-p)|00\rangle\langle00|+p|11\rangle\langle11|.
$$

$0<p<1$ のとき、$\rho^{\mathrm{class}}_{OI}$ は非負で跡1ですが固有値は $(1-p,p,0,0)$ なので全体のエントロピーは $h(p)>0$ です。対して $\rho^{\mathrm{pure}}_{OI}=|\Psi_{p,0}\rangle\langle\Psi_{p,0}|$ の全体のエントロピーは0です。どちらも内外の縮約は同じ、$Z_OZ_I$ の期待値も1です。しかし

$$
\operatorname{Tr}(\rho^{\mathrm{class}}_{OI} X_OX_I)=0,\qquad
\operatorname{Tr}(\rho^{\mathrm{pure}}_{OI} X_OX_I)=2\sqrt{p(1-p)}.
$$

後者では $X_OX_I$ が二つの基底状態間の**量子的な位相の干渉**を検出します。$Z_OZ_I$ のような占有一致の相関だけでは区別できません。局所熱性は純化の一つの候補を指定しないのであり、実際の地平線内部を同定する測定を提供するものでもありません。

[BHI1の放射だけで完結する等長発展の純粋性制約](../BHI1/index.md#thm-bhi1-endpoint-purity)は、**終期に放射以外の自由度がない**という追加仮定があって初めて適用できます。ここでの $I$ は一時刻の内部モードであり、蒸発終期まで同じ独立因子として残るとは決めていません。次講では一個の対を複数回発生させる**逐次独立対生成という追加の模型仮定**を置き、放射全体のエントロピーを計算します。

## 6. 演習と詳細解答

### Level A：内外の縮約と熱的表示を手で確かめる

<a id="ex-bhi2-a01"></a>

#### BHI2-A01 縮約を行列から作る

- Level: A
- 問題: $p=1/4,\phi=0$ の[有限次元の内外対模型](#def-bhi2-pair)について、$\rho_{OI}$ の計算基底 $(|00\rangle,|01\rangle,|10\rangle,|11\rangle)$ における行列、$\rho_O$、$S(O)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $|\Psi\rangle=(\sqrt3/2,0,0,1/2)^{\mathsf T}$ なので外積を取ると

$$
\rho_{OI}=
\begin{pmatrix}
3/4&0&0&\sqrt3/4\\
0&0&0&0\\0&0&0&0\\
\sqrt3/4&0&0&1/4
\end{pmatrix}.
$$

内側の占有基底について $\langle a|\rho_O|b\rangle=\sum_{i=0}^1\langle a,i|\rho_{OI}|b,i\rangle$ を適用します。対角は $3/4,1/4$、非対角は、同じ内部添字を持つ行列成分に非零項がないので0。従って $\rho_O=\operatorname{diag}(3/4,1/4)$ です。[エントロピー定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)から

$$
S(O)=-\frac34\ln\frac34-\frac14\ln\frac14.
$$

全状態の非対角成分を、外部縮約の非対角成分と取り違えないことが重要です。
<!-- solution-end -->

<a id="ex-bhi2-a02"></a>

#### BHI2-A02 位相を変えても外側は変わらない

- Level: A
- 問題: $p=1/2$ で $\phi=0,\pi$ を比較し、$\rho_O$ と $\langle X_O\otimes X_I\rangle$ を求め、外部観測だけで位相を判定できるか述べよ。

<!-- solution-start -->
**詳細解答。** [縮約・相関の命題](#prop-bhi2-reduction)をそれぞれの $p,\phi$ に適用すると

$$
\rho_O=\operatorname{diag}(1/2,1/2)=I_2/2
$$

が両状態で共通です。共同期待値は $2\sqrt{(1/2)(1/2)}\cos\phi=\cos\phi$ なので、$\phi=0$ では $+1$、$\phi=\pi$ では $-1$ です。外側のあらゆる作用素 $A_O$ の期待値は $\operatorname{Tr}(\rho_OA_O)$ のみで決まるため、両状態を外側だけで区別することはできません。
<!-- solution-end -->

<a id="ex-bhi2-a03"></a>

#### BHI2-A03 二準位のBoltzmann重み

- Level: A
- 問題: 外側のハミルトニアン $H_O=\omega|1\rangle\langle1|$、$\beta\omega=\ln3$ とする。Gibbs状態の分配関数、占有確率、平均エネルギー、エントロピーを求めよ。

<!-- solution-start -->
**詳細解答。** エネルギー固有値は0と $\omega$ だから

$$
Z=e^0+e^{-\ln3}=1+\frac13=\frac43,\qquad
p=\frac{e^{-\ln3}}Z=\frac14.
$$

従って $\rho_O=\operatorname{diag}(3/4,1/4)$、$\operatorname{Tr}(\rho_OH_O)=\omega(1/4)=\omega/4$。エントロピーは

$$
-\frac34\ln\frac34-\frac14\ln\frac14
=\ln\frac43+\frac14\ln3.
$$

最後の等号は $\ln(3/4)=-\ln(4/3)$、$\ln(1/4)=-\ln4$ を使うか、[Gibbs表示の命題](#prop-bhi2-gibbs)へ $x=\ln3$ を入れて確認できます。
<!-- solution-end -->

<a id="ex-bhi2-a04"></a>

#### BHI2-A04 無限占有の規格化と切り詰め

- Level: A
- 問題: ボース二モード対で $z=1/3$ とする。占有数0,1,2の確率、$n\ge2$ の確率、$n\le1$ に条件付けた占有数1の確率を計算せよ。

<!-- solution-start -->
**詳細解答。** [ボース対の定義](#def-bhi2-boson-pair)で占有数 $n$ の重みは $P(n)=(1-z)z^n$ です。したがって

$$
P(0)=\frac23,\quad P(1)=\frac29,\quad P(2)=\frac2{27}.
$$

$n\ge2$ の確率は幾何級数で $(2/3)\sum_{n=2}^\infty(1/3)^n=(2/3)(1/9)/(2/3)=1/9$。従って $n\le1$ の確率は $8/9$ です。条件付きの確率は

$$
P(n=1\mid n\le1)=\frac{2/9}{8/9}=\frac14
=\frac{z}{1+z}.
$$

切り詰め確率と、条件付き二準位確率の区別を明示しました。
<!-- solution-end -->

### Level B：純化・占有統計・ユニタリ性を接続する

<a id="ex-bhi2-b01"></a>

#### BHI2-B01 同じ局所熱性を持つ二つの全状態

- Level: B
- 問題: $0<p<1$ とし、$\rho^{(P)}_{OI}=|\Psi_{p,0}\rangle\langle\Psi_{p,0}|$、$\rho^{(C)}_{OI}=(1-p)|00\rangle\langle00|+p|11\rangle\langle11|$ を比較する。縮約、全系のエントロピー、$Z_OZ_I$ と $X_OX_I$ の期待値をそれぞれ示し、「$Z_OZ_I=1$ だから純粋な対である」という推論の誤りを説明せよ。

<!-- solution-start -->
**詳細解答。** いずれも内側をトレースすると $\rho_O=\operatorname{diag}(1-p,p)$。前者の全系は階数1の射影で $S(OI)=0$、後者は固有値が $1-p,p,0,0$ なので $S(OI)=h(p)>0$ です。$Z_OZ_I$ は両状態を支える $|00\rangle,|11\rangle$ のそれぞれに $+1$ を返すため、両方で期待値は1となります。

一方、$X_OX_I$ は $|00\rangle\leftrightarrow|11\rangle$ を交換します。純粋状態での交差項の寄与は $\sqrt{p(1-p)}+\sqrt{p(1-p)}$、混合状態では $\langle00|X_OX_I|00\rangle=\langle11|X_OX_I|11\rangle=0$ なので

$$
\langle X_OX_I\rangle_P=2\sqrt{p(1-p)},\qquad
\langle X_OX_I\rangle_C=0.
$$

$Z_OZ_I=1$ は占有の完全な一致を表すだけで、位相を含む干渉項を保証しません。この項が失われると全状態の純粋性も失われ得ます。
<!-- solution-end -->

<a id="ex-bhi2-b02"></a>

#### BHI2-B02 二準位をボース熱分布と混同しない

- Level: B
- 問題: $z=e^{-\beta\omega}=1/2$ の理想ボース二モード対を考える。無限占有の平均 $\bar n$、エントロピー $S(O)$、$n\ge2$ の重みと、$n\le1$ に条件付けた二準位の平均占有 $p$、エントロピー $h(p)$ を求め、どちらがHawkingのPlanck因子に対応するか述べよ。

<!-- solution-start -->
**詳細解答。** [無限占有の命題](#prop-bhi2-boson-entropy)の $z=1/2$ を用いて

$$
\bar n=\frac{1/2}{1-1/2}=1,\qquad
S(O)=-\ln\frac12-\frac{1/2}{1/2}\ln\frac12=2\ln2.
$$

$n\ge2$ の確率は $z^2=1/4$ で、これは無視できると自動的には言えません。条件付き二準位では $p=z/(1+z)=1/3$、従って

$$
h(p)=-\frac23\ln\frac23-\frac13\ln\frac13
=\ln3-\frac23\ln2.
$$

自由ボース場の理想Planck平均に対応するのは $\bar n=z/(1-z)$ であり、条件付き二準位平均 $p=z/(1+z)$ ではありません。前者を実際の波束に適用するときも[QCURV21の適用仮定](../../QCURV/QCURV21/index.md#prop-qcurv21-hawking-chain)が必要です。
<!-- solution-end -->

<a id="ex-bhi2-b03"></a>

#### BHI2-B03 二量子ビット回路で対を準備する

- Level: B
- 問題: 初期状態 $|0\rangle_O|0\rangle_I$ から、$0<p<1$、$\phi=0$ の $|\Psi_{p,0}\rangle$ を二量子ビットのユニタリ操作で作れ。外側の回転 $R_y(\theta)$ を $R_y(\theta)|0\rangle=\cos(\theta/2)|0\rangle+\sin(\theta/2)|1\rangle$ と定め、$\theta$ と制御NOTの制御・標的を明記せよ。この構成が蒸発終期のユニタリ性を証明しない理由も説明せよ。

<!-- solution-start -->
**詳細解答。** $\theta=2\arcsin\sqrt p$ と取ると $\cos(\theta/2)=\sqrt{1-p}$、$\sin(\theta/2)=\sqrt p$ です。外側に $R_y(\theta)$ を掛ければ

$$
(R_y(\theta)\otimes I)|00\rangle
=(\sqrt{1-p}|0\rangle_O+\sqrt p|1\rangle_O)|0\rangle_I.
$$

次に $O$ を制御、$I$ を標的とする制御NOTを掛けます。$|0\rangle_O$ の項は変わらず、$|1\rangle_O|0\rangle_I$ は $|1\rangle_O|1\rangle_I$ に移るので

$$
\operatorname{CNOT}_{O\to I}(R_y(\theta)\otimes I)|00\rangle
=\sqrt{1-p}|00\rangle+\sqrt p|11\rangle.
$$

回転と制御NOTはともに全二量子ビット上のユニタリです。ただし「既知の初期 $|00\rangle$ から対を準備できる」と「任意の崩壊前入力から蒸発終期の放射への写像が可逆」は異なる命題です。[BHI1の終期純粋性定理](../BHI1/index.md#thm-bhi1-endpoint-purity)の仮定（特に終期全出力が放射だけで完結すること）はこの回路からは出てきません。
<!-- solution-end -->

### Level C：物理仮定と観測領域を統合する

<a id="ex-bhi2-c01"></a>

#### BHI2-C01 外部熱性から情報損失へ飛べない理由

- Level: C
- 問題: $p=1/4$ とし、$\phi=0,\pi$ の純粋状態 $\rho^{(+)}_{OI},\rho^{(-)}_{OI}$ と、$\rho^{(C)}_{OI}=\frac34|00\rangle\langle00|+\frac14|11\rangle\langle11|$ を考える。
  1. 三状態の外部縮約と外部エントロピーを求めよ。
  2. $X_OX_I$ の期待値を三状態で比較し、内部にアクセスする測定の役割を示せ。
  3. 三状態の全系の純粋性を検算せよ。
  4. $p=1/4$ を二準位Gibbs形式で表す $\beta\omega$ を求め、無限占有ボース対を同じ $z=e^{-\beta\omega}$ で作ったときの $\bar n$ と切り詰め成功確率を求めよ。
  5. 「外部が熱的だから、蒸発終期の全放射が混合し、情報が失われた」という結論に欠ける仮定を明示せよ。

<!-- solution-start -->
**詳細解答。**

1. [内外対の縮約命題](#prop-bhi2-reduction)から、$\phi$ にかかわらず $\rho_O^{(+)}=\rho_O^{(-)}=\operatorname{diag}(3/4,1/4)$ です。古典混合状態も内部基底でトレースすれば同じ対角行列になります。固有値は $3/4,1/4$ なので三状態すべてで

   $$
   S(O)=-\frac34\ln\frac34-\frac14\ln\frac14.
   $$

2. $2\sqrt{p(1-p)}=2\sqrt{3/16}=\sqrt3/2$ です。純粋な二状態では $\cos0=1$、$\cos\pi=-1$ なので、共同期待値はそれぞれ $\sqrt3/2,-\sqrt3/2$。古典混合状態には交差項がないので0です。外部だけの全作用素は同じ $\rho_O$ にしか作用できず、これらの値の違いを検出できません。
3. $\rho^{(\pm)}_{OI}$ は規格化ベクトルの射影だから $(\rho^{(\pm)}_{OI})^2=\rho^{(\pm)}_{OI}$、$\operatorname{Tr}[(\rho^{(\pm)}_{OI})^2]=1$ です。古典混合状態は互いに直交する二射影の和なので

   $$
   \operatorname{Tr}[(\rho^{(C)}_{OI})^2]
   =\left(\frac34\right)^2+\left(\frac14\right)^2
   =\frac{10}{16}<1.
   $$

   従って前二者は純粋で後者は混合です。
4. [二準位の有効熱的対の定義](#def-bhi2-two-level-thermal)より $p/(1-p)=e^{-\beta\omega}=1/3$、従って $\beta\omega=\ln3$。同じ $z=1/3$ のボース対では[無限占有の命題](#prop-bhi2-boson-entropy)から $\bar n=z/(1-z)=1/2$、切り詰め成功確率は $1-z^2=8/9$ です。二準位模型の平均 $p=1/4$ と異なります。
5. 一時刻に選んだ外部モード $O$ が熱的であることは、その時刻の全放射 $R$、内部 $I$、未観測系 $E$ の関係を指定しません。[BHI1の放射だけで完結した終期の条件](../BHI1/index.md#def-bhi1-endpoint-split)で必要な、終期の全放射を $R$ が尽くし $B,E$ が自明であること、さらに同じ純粋入力からの全発展の等長性などを同じ模型・時刻で確かめる必要があります。ここでは外部の熱性と三つの異なる全状態が両立するため、情報損失の断定はできません。
<!-- solution-end -->

## 7. 次に考えること

一個の内外対は、全体系が純粋でも一方だけの状態が混合することを説明します。けれどもそれは、いつ何個の対が生じ、古い放射と新しい対の間に相関があるかを決めません。次講BHI3では、**新しい対がそれまでの全系と独立である**という強い仮定を明記し、何回も放射させたときの $S(R_k)$ を導きます。独立性を外した場合に何が変わり得るかも比較します。
