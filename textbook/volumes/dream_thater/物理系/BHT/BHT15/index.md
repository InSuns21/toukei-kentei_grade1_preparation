# BHT15 負熱容量と有限空洞

熱い物体から熱を奪えば冷える、という日常の経験は、ブラックホールでは逆転します。SchwarzschildブラックホールのHawking温度は質量が小さいほど高く、熱を放出して軽くなると、いっそう熱くなるからです。ただし、この事実から「ブラックホールはいかなる境界条件でも不安定」と結論するのは誤りです。

前講では[有限壁のEuclid作用と熱力学微分](../BHT14/index.md#prop-bht14-wall-thermodynamics)を計算しました。本講ではその式を使い、**何を固定した熱容量か**を定めたうえで、York型の有限空洞で同じSchwarzschild解が二本の枝に分かれることを調べます。さらに、正準アンサンブルの局所判定、平坦背景との古典指数の比較、微正準アンサンブルの意味を区別します。

設定は4次元、真空、球対称・静的で非回転・無電荷、宇宙項なし、$G>0$、自然単位 $c=\hbar=k_B=1$ です。Lorentz計量は $(-,+,+,+)$、Euclid計量は正定値とします。空洞壁を半径 $R>2GM$ の球面に置き、壁に誘導される時間円周の**固有周期**を境界逆温度とします。ここで扱うのは主としてSchwarzschild解族に沿う熱力学的変動であり、完全な重力摂動スペクトルの安定性ではありません。

## 1. 無限遠では質量を失うほど熱くなる

Schwarzschildの質量を $M>0$ とし、漸近平坦な静止観測者のHawking温度を $T_\infty$、面積エントロピーを $S$ と書きます。[BHT14で作用から得た状態量](../BHT14/index.md#thm-bht14-thermodynamic-potentials)は

$$
T_\infty=\frac1{8\pi GM},\qquad E_\infty=M,\qquad S=4\pi GM^2.
$$

熱容量は「どの外部データを固定して、どのエネルギーを温度で微分するか」を指定して初めて意味を持ちます。たとえば無限遠では $G$ と電荷・回転を固定し、質量 $M$ だけを変える一変数族を考えます。一方、有限壁では半径 $R$ を固定し、温度には壁の局所温度を用います。

<a id="def-bht15-heat-capacity"></a>

<!-- formal-statement-start -->
> **定義（境界を指定した熱容量）**
> 境界データのうち幾何学的・外部的に固定する量を $\mathcal B$ とし、平衡解の一変数族を $\lambda\mapsto(E(\lambda),T(\lambda))$ とする。$T(\lambda)>0$ かつ $dT/d\lambda\ne0$ の点で、当該エネルギーと温度に対応する熱容量を

$$
C_{\mathcal B}=\left(\frac{dE}{dT}\right)_{\mathcal B}
=\frac{dE/d\lambda}{dT/d\lambda}
$$

> と定める。温度の折返し点では、この商の存在を仮定しない。壁半径 $R$ を固定する場合は $C_R$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht15-heat-capacity -->
**定義の確認**（二準位系）：[BHT14の通常の正準統計の例](../BHT14/index.md#def-bht14-saddle-weight)にならい、エネルギー $E_0=0$、$E_1=\epsilon>0$ を持つ二状態と、その間隔 $\epsilon$ を固定します。

逆温度 $b=1/T>0$ における二状態の重みは $1,e^{-b\epsilon}$ です。規格化因子（分配関数）$Z$ と平均エネルギー $E(b)$ は

$$
Z(b)=1+e^{-b\epsilon},\qquad
E(b)=\frac{0\cdot1+\epsilon e^{-b\epsilon}}{Z(b)}
=\frac{\epsilon}{e^{b\epsilon}+1}.
$$

したがって、準位を変えずに温度だけを動かすと

$$
\frac{dE}{db}=-\frac{\epsilon^2e^{b\epsilon}}{(1+e^{b\epsilon})^2},\qquad
\frac{db}{dT}=-\frac1{T^2}\ne0,
$$

$$
C=\frac{dE}{dT}=\frac{dE}{db}\frac{db}{dT}
=\frac{\epsilon^2e^{b\epsilon}}{T^2(1+e^{b\epsilon})^2}>0.
$$

温度 $T>0$、固定準位 $\epsilon>0$、微分可能な一変数族という定義の条件を確認しました。ここでの $b$ は通常の二準位系の逆温度であり、後に導入する重力の壁固有周期と同じ記号を使いますが、物理系は別です。
<!-- definition-example-end -->

<a id="prop-bht15-negative-infinity"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschildの無限遠熱容量）**
> $G>0$、$M>0$ の漸近平坦Schwarzschildの非回転・無電荷解族で、無限遠の温度 $T_\infty=(8\pi GM)^{-1}$、エネルギー $E_\infty=M$ を用いると、$G$ を固定した熱容量は

$$
C_\infty=\frac{dE_\infty}{dT_\infty}=-8\pi GM^2<0.
$$

> これは無限遠Schwarzschild解族の熱力学的応答であって、それだけで蒸発過程の速度や全重力モードの不安定性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

温度は $M^{-1}$、エネルギーは $M$ に比例します。$M$ を媒介変数として両方を微分し、定義の商を取ります。

<!-- proof-start -->
### 証明

[Schwarzschildサドルの熱力学量](../BHT14/index.md#thm-bht14-thermodynamic-potentials)から $E_\infty(M)=M$、$T_\infty(M)=(8\pi GM)^{-1}$ です。よって

$$
\frac{dE_\infty}{dM}=1,\qquad
\frac{dT_\infty}{dM}=-\frac1{8\pi GM^2}.
$$

$G,M>0$ で後者は非零なので、[熱容量の定義](#def-bht15-heat-capacity)に代入して $C_\infty=1/[-1/(8\pi GM^2)]=-8\pi GM^2$ です。
<!-- proof-end -->

たとえば $M$ を半分にすると $T_\infty$ は2倍になります。ここで現れる負符号は、放射による質量減少で温度が上がるというフィードバックの**方向**を示します。放射の時間発展そのものには状態選択、透過率、逆作用が必要であり、定常状態の微分だけでは決まりません。

## 2. 有限壁で固定する温度とエネルギーをそろえる

空洞壁を半径 $R>2GM$ に固定します。$f_R=1-2GM/R$、$x=\sqrt{f_R}\in(0,1)$ とおきます。$x$ は壁の赤方偏移因子であり、地平線の近くほど小さくなります。正則なEuclid時間の周期は $\beta_H=8\pi GM$ です。[BHT12の円錐正則周期](../BHT12/index.md#thm-bht12-nonextremal-period)を壁の計量 $f_Rd\tau^2+R^2d\Omega_2^2$ に使うと、壁の固有逆温度 $b$ と温度 $T_R$ は

$$
b=\beta_Hx=8\pi GMx,\qquad
T_R=\frac1b=\frac1{8\pi GMx}.
$$

これは[BHT8の熱浴温度整合](../BHT8/index.md#def-bht8-bath-matching)の $xT_R=T_\infty$ と一致します。壁温度を固定するということは、$M$ を変えても $b$ と $R$ を変えない境界値問題を指定することです。ただし任意の $M$ がその固定温度で滑らかな解になるわけではありません。条件 $b=8\pi GMx$ を満たす質量だけが正則な平衡候補です。

[BHT14の有限壁Legendre関係](../BHT14/index.md#prop-bht14-wall-thermodynamics)から、平坦参照背景をエネルギー零点に取る準局所エネルギーと地平線エントロピーは

$$
E_R(M)=\frac R G(1-x),\qquad S(M)=4\pi GM^2.
$$

無限遠の $M$ を有限壁のエネルギーにそのまま使うと赤方偏移を二重に取り扱ったり、第一法則の係数を取り違えたりします。

<a id="def-bht15-cavity-ensembles"></a>

<!-- formal-statement-start -->
> **定義（有限空洞の正準・微正準熱力学）**
> $G,R>0$、$0<M<R/(2G)$ のSchwarzschild候補を、球形Dirichlet壁の内側に考え、壁でのエネルギーを $E_R=R(1-\sqrt{1-2GM/R})/G$、地平線エントロピーを $S=4\pi GM^2$ とする。
>
> - **正準境界条件：** 壁半径 $R$ と固有逆温度 $b>0$ を固定し、形式的な縮約作用 $I_b(M)=bE_R(M)-S(M)$ の停留点と局所変動を調べる。
> - **微正準境界条件：** 壁半径 $R$ と準局所エネルギー $E_R$ を固定し、その制約を満たす状態のエントロピーを比較する。
>
> ここでの「局所安定」はまず上記Schwarzschild一変数族に限る。全重力・物質摂動への安定性を定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht15-cavity-ensembles -->
**定義の確認**（二つの境界条件）：$M_0>0$ を選び、壁半径と固有逆温度を次の値に固定します。

$$
R=4GM_0,\qquad b_0=\frac{8\pi GM_0}{\sqrt2},\qquad
x_0=\sqrt{1-\frac{2GM_0}R}=\frac1{\sqrt2}.
$$

$R$ を固定して $x^2=1-2GM/R$ を微分すると

$$
2x\frac{dx}{dM}=-\frac{2G}R,\qquad
\frac{dx}{dM}=-\frac{G}{Rx},\qquad
\frac{dS}{dM}=8\pi GM.
$$

従って、固定した正準境界データでの作用と、壁エネルギーの質量微分は

$$
\left.\frac{dE_R}{dM}\right|_{M_0}=\frac1{x_0}=\sqrt2>0,\qquad
\left.\frac{dI_{b_0}}{dM}\right|_{M_0}
=\frac{b_0}{x_0}-8\pi GM_0=0.
$$

後者は[有限壁の縮約円錐作用](../BHT14/index.md#def-bht14-conical-reduction)を使う正準操作で、$b_0,R$ は固定したまま $M$ を動かしたときの停留条件です（停留点以外は一般に円錐を持ちます）。

一方、同じ $R$ の全領域で $dE_R/dM=1/x>0$ なので、微正準条件で $E_R$ を固定すれば $M$ も固定されます。二つは許す変動が異なります。

なお $R=4GM_0$ は評価点の選択であり、微分中に $R$ を $M$ とともに動かす条件ではありません。
<!-- definition-example-end -->

<a id="thm-bht15-wall-capacity"></a>

<!-- formal-statement-start -->
> **定理（有限空洞の壁第一法則と熱容量）**
> $G,R>0$ を固定し、$0<M<R/(2G)$ の非極限Schwarzschild族で $x=\sqrt{1-2GM/R}$、$E_R=R(1-x)/G$、$S=4\pi GM^2$、$T_R=(8\pi GMx)^{-1}$ とする。この正則解族の壁第一法則と熱容量は

$$
\left.dE_R\right|_R=T_R\left.dS\right|_R,
\qquad
C_R=\frac{8\pi GM^2(R-2GM)}{3GM-R}
$$

> である（熱容量は $R\ne3GM$ で定義）。したがって $R>3GM$ では $C_R<0$、$2GM<R<3GM$ では $C_R>0$。$R=3GM$ は $dT_R/dM=0$ の折返し点であり、通常の有限な熱容量は定まらない。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーは壁の固有エネルギー、温度も壁の固有温度に統一します。$R$ 固定で $x(M)$ を微分して第一法則を検算し、温度の対数微分で符号が変わる点を求めます。

<!-- proof-start -->
### 証明

$x^2=1-2GM/R$ なので、$R$ 一定で微分すると $2x(dx/dM)=-2G/R$、したがって

$$
\frac{dx}{dM}=-\frac G{Rx},\qquad
\frac{dE_R}{dM}=-\frac RG\frac{dx}{dM}=\frac1x.
$$

一方、$dS/dM=8\pi GM$ です。従って

$$
T_R\frac{dS}{dM}
=\frac1{8\pi GMx}\,(8\pi GM)=\frac1x
=\frac{dE_R}{dM}.
$$

熱容量を得るために $T_R(M)$ を微分します。$\log T_R=-\log(8\pi G)-\log M-\log x$ として

$$
\begin{aligned}
\frac1{T_R}\frac{dT_R}{dM}
&=-\frac1M-\frac1x\frac{dx}{dM}
=-\frac1M+\frac G{Rx^2}\\
&=\frac{-Rx^2+GM}{MRx^2}
=\frac{3GM-R}{M(R-2GM)}.
\end{aligned}
$$

よって $R\ne3GM$ では

$$
\begin{aligned}
C_R&=\frac{dE_R/dM}{dT_R/dM}
=\frac{1/x}{[1/(8\pi GMx)]\,[ (3GM-R)/(M(R-2GM))]}\\
&=\frac{8\pi GM^2(R-2GM)}{3GM-R}.
\end{aligned}
$$

$R>2GM$ なので分子は正であり、分母だけが符号を決めます。$R=3GM$ では $dT_R/dM=0$ ですが $dE_R/dM=1/x>0$ ですから、温度を局所座標とする熱容量の商は発散し、有限値を持ちません。
<!-- proof-end -->

**数値の代わりに比を検算する：** $R=4GM$ という選んだ解の点では $x=1/\sqrt2$、$C_R=-16\pi GM^2$。$R=5GM/2$ の別の解の点では $x=1/\sqrt5$、$C_R=+8\pi GM^2$ です。どちらも $R$ を固定して微分した後で、選んだ質量との比を代入しています。$R=kGM$ を微分条件として用いたのではありません。

壁を遠ざけて $R\to\infty$ とし、$M,G$ を一定に保てば $x\to1$、$T_R\to T_\infty$、$E_R\to M$ で、上の式は $C_R\to-8\pi GM^2$ となり[無限遠の命題](#prop-bht15-negative-infinity)へ戻ります。壁を消した後も正準熱浴が安定に存在するという意味ではありません。

## 3. 同じ壁温度に二つの質量が対応する

壁の温度 $T_R(M)$ は単調ではありません。小さな $M$ ではHawking温度の $1/M$ が効き、大きな $M$ では壁が地平線へ近づくため赤方偏移因子 $x$ の消失が効きます。その間に温度の最小値が現れます。

まず無次元の地平線の壁に対する比 $y=2GM/R\in(0,1)$ を使うと、$x=\sqrt{1-y}$、壁固有周期は

$$
b(y)=4\pi R\,y\sqrt{1-y}.
$$

<a id="thm-bht15-two-branches"></a>

<!-- formal-statement-start -->
> **定理（有限空洞の二分岐と局所安定性）**
> $G,R,b>0$ を固定し、4次元の真空Schwarzschild候補 $0<M<R/(2G)$ を考える。地平線で円錐欠損がなくなる壁周期の条件は $b=8\pi GM\sqrt{1-2GM/R}$ である。壁温度の最小値は

$$
T_{\min}=\frac{3\sqrt3}{8\pi R},
\qquad M_*=\frac R{3G}.
$$

> $T_R<T_{\min}$ には正則Schwarzschild候補がなく、$T_R=T_{\min}$ には合流する1候補、$T_R>T_{\min}$ には二つの候補がある。後者では $0<M_{\rm small}<M_*$ の小枝は $C_R<0$ で、固定 $(b,R)$ の縮約作用の二階変分が負、$M_*<M_{\rm large}<R/(2G)$ の大枝は $C_R>0$ で二階変分が正である。合流点では二階変分は零であり、厳密な局所極小とは判定できない。
<!-- formal-statement-end -->

### 証明の見取り図

$b(y)$ の端点と極大を求めて存在個数を決めます。局所安定性は $I_b=bE_R-S$ を固定 $b,R$ で二度微分し、**停留点でだけ**地平線の円錐欠損が消える周期の式を代入して判定します。

<!-- proof-start -->
### 証明

$0<y<1$ において

$$
\begin{aligned}
\frac{db}{dy}
&=4\pi R\left(\sqrt{1-y}-\frac{y}{2\sqrt{1-y}}\right)\\
&=\frac{2\pi R(2-3y)}{\sqrt{1-y}}.
\end{aligned}
$$

これは $y=2/3$ で正から負へ変わり、$b(y)\to0$ は $y\downarrow0$ と $y\uparrow1$ の双方で成立します。最大値は

$$
b_{\max}=4\pi R\frac23\sqrt{\frac13}
=\frac{8\pi R}{3\sqrt3},\qquad
T_{\min}=\frac1{b_{\max}}.
$$

$y_*=2/3$ は $M_*=R/(3G)$ です。連続性と両側での厳密単調性から、$0<b<b_{\max}$ では $y$ が二つ、$b=b_{\max}$ で一つ、$b>b_{\max}$ で零です。$T=1/b$ に直すとステートメントの個数になります。

次に[有限壁の縮約円錐作用](../BHT14/index.md#def-bht14-conical-reduction)の一変数式を使います。壁第一法則・熱容量で用いた $d/dM$ は $R$ 一定の**正則解族**で $b=b(M)$ も変わる微分でした。ここからの $\partial_M$ は、$I_b(M)=I_b(M;b,R)$ の $b,R$ を固定し、円錐を許して $M$ だけを変える偏微分です。この違いを保って $I_b=bE_R-S$ を二度微分すると

$$
\partial_MI_b=\frac b x-8\pi GM,
\qquad
\partial_M^2I_b=\frac{bG}{Rx^3}-8\pi G.
$$

停留条件は $b=8\pi GMx$、すなわち地平線の円錐欠損が消える周期の式です。これを二階微分後に入れると

$$
\left.\partial_M^2I_b\right|_*
=8\pi G\left(\frac{GM}{Rx^2}-1\right)
=8\pi G\frac{3GM-R}{R-2GM}.
$$

$R-2GM>0$ なので小枝 $M<R/(3G)$ では負、大枝では正、合流点で零です。熱容量の符号は[壁の熱容量定理](#thm-bht15-wall-capacity)から逆符号・正符号の順に従います。ここでの極小・極大はSchwarzschild質量方向の縮約作用に限ります。
<!-- proof-end -->

**具体的な枝の読み方：** $x=\sqrt{1-y}$ を横軸に取れば、小枝は $1/\sqrt3<x<1$、大枝は $0<x<1/\sqrt3$ です。同じ $T_R>T_{\min}$ で二つの質量を比較する際は、$R$ も $T_R$ も共通にして $x(1-x^2)=1/(4\pi RT_R)$ を解きます。異なる温度で選んだ二つの数値例を同一アンサンブルの競合解と呼ばないでください。

小枝は縮約作用の負曲率を持ち、通常の正準エネルギーゆらぎと両立しません。一方、大枝の正曲率は**必要な熱力学的安定性判定の一つ**です。ゲージ固定後の重力摂動、共形因子、境界で許す変動などの全スペクトルはこの一変数計算では尽くされていません。

## 4. 大枝の局所極小と平坦背景への優越は別問題

固定壁温度の下で大枝が局所極小だとしても、同じ境界計量を持つ別のサドルがより小さな作用を持つかもしれません。熱的平坦背景は、時間円周が長さ $b$ の平坦な空洞 $S^1_b\times B^3_R$ で、[一致境界での背景差引き](../BHT13/index.md#def-bht13-matched-subtraction)により相対作用を $I_{\mathrm{flat}}=0$ と選べます。

正則Schwarzschildでは $x=\sqrt{1-2GM/R}$、$b=4\pi R x(1-x^2)$ です。[BHT14の有限壁の相対サドル重み](../BHT14/index.md#prop-bht14-relative-weight)を使うと、両者の指数を同じ $(b,R)$ の下で比較できます。

<a id="prop-bht15-saddle-crossing"></a>

<!-- formal-statement-start -->
> **命題（有限空洞の古典サドル比較）**
> $G,R>0$、$0<M<R/(2G)$ の滑らかなEuclid Schwarzschild解に対し、$x=\sqrt{1-2GM/R}\in(0,1)$、$b=4\pi R x(1-x^2)$ とする。同じ壁の半径・固有周期の熱的平坦背景を相対作用零に規格化すると、Schwarzschildとの作用差は

$$
I_{\rm BH}-I_{\rm flat}
=\frac{\pi R^2}G(1-x)^2(1+x)(3x-1).
$$

> 正の熱容量を持つ大枝 $0<x<1/\sqrt3$ のうち、$1/3<x<1/\sqrt3$ では $I_{\rm BH}>I_{\rm flat}$、$x=1/3$ では等しく、$0<x<1/3$ では $I_{\rm BH}<I_{\rm flat}$。等しくなる壁温度は

$$
T_{\rm cross}=\frac{27}{32\pi R}>T_{\min}.
$$

> これは二つの古典サドルの先頭指数の比較である。真の分配関数の収束、負モードの不存在、他のサドルや熱放射の寄与を含む相転移の厳密な主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

作用の因数分解で符号を読み、等号 $x=1/3$ を正則な壁周期へ代入します。大枝の範囲内で等号が生じることを確かめます。

<!-- proof-start -->
### 証明

[有限壁の熱力学微分](../BHT14/index.md#prop-bht14-wall-thermodynamics)による $I_{\rm BH}=bE_R-S$ に $E_R=R(1-x)/G$、$S=\pi R^2(1-x^2)^2/G$、$b=4\pi Rx(1-x^2)$ を代入すると

$$
\begin{aligned}
I_{\rm BH}
&=\frac{\pi R^2}G\left[4x(1-x^2)(1-x)-(1-x^2)^2\right]\\
&=\frac{\pi R^2}G(1-x)^2(1+x)[4x-(1+x)]\\
&=\frac{\pi R^2}G(1-x)^2(1+x)(3x-1).
\end{aligned}
$$

$0<x<1$ では $3x-1$ 以外は正です。大枝の範囲は[二分岐定理](#thm-bht15-two-branches)から $0<x<1/\sqrt3$、従って $x=1/3$ は大枝に属します。この点では

$$
b_{\rm cross}=4\pi R\cdot\frac13\left(1-\frac19\right)
=\frac{32\pi R}{27},\qquad
T_{\rm cross}=\frac1{b_{\rm cross}}=\frac{27}{32\pi R}.
$$

また

$$
\frac{T_{\rm cross}}{T_{\min}}
=\frac{27/(32\pi R)}{3\sqrt3/(8\pi R)}
=\frac{3\sqrt3}{4}>1,
$$

なので等号は二枝が存在する温度領域で生じます。
<!-- proof-end -->

この比較の読み方は次のとおりです。

| 壁温度 | Schwarzschild候補 | 縮約作用による局所判定と平坦背景との比較 |
| --- | --- | --- |
| $T_R<T_{\min}$ | なし | 平坦背景は候補。Schwarzschild平衡解はない |
| $T_R=T_{\min}$ | 合流1本 | 二階判定は退化。安定極小とは判定しない |
| $T_{\min}<T_R<T_{\rm cross}$ | 小枝・大枝 | 小枝は負方向。大枝は局所極小だが平坦背景の指数が大きい |
| $T_R=T_{\rm cross}$ | 小枝・大枝 | 大枝と平坦背景の古典指数が同じ |
| $T_R>T_{\rm cross}$ | 小枝・大枝 | 大枝は局所極小で、平坦背景より古典指数が大きい |

ただし、この表の「指数が大きい」は $e^{-I}$ を二つだけ比較する意味です。重力経路積分全体での熱力学的相転移を確立したわけではありません。とくに実在の壁、物質の熱放射、ゲージ固定、共形因子・負モード、バックリアクションの扱いを指定していません。

### 壁を動かすときの仕事項

ここまでは $R$ 固定でした。壁面積を $A_B=4\pi R^2$ と置いて $R$ も変えれば、第一法則に壁の仕事項が必要です。$S=4\pi GM^2$ を一定に保つ変分は $M$ 一定なので、$x=\sqrt{1-2GM/R}$ を $R$ で微分すると

$$
\left.\frac{dx}{dR}\right|_M=\frac{GM}{R^2x},\quad
\left.\frac{dE_R}{dR}\right|_M=\frac{1-x}G-\frac M{Rx}
=-\frac{(1-x)^2}{2Gx}.
$$

壁面積の微分 $dA_B/dR=8\pi R$ を使うと、面積と共役な正の壁圧力の係数は

$$
p_R=-\left(\frac{\partial E_R}{\partial A_B}\right)_S
=\frac{(1-x)^2}{16\pi GRx},\qquad
dE_R=T_R\,dS-p_R\,dA_B.
$$

最後の式は $M,R$ の両方を変えたときの全微分です。$C_R$ の計算では $dR=0$ としているので仕事項が消えていました。「壁温度固定」と「壁半径固定」を混ぜて変分すると、熱容量の符号判定が変わるおそれがあります。

## 5. 微正準なら負熱容量を直ちに排除しない

正準アンサンブルは熱浴からエネルギーが出入りする一方、微正準アンサンブルはエネルギーを固定します。通常の正準分配関数の存在を前提としたとき、エネルギーゆらぎの分散は非負です。そのため正準の熱容量は負にはなれませんが、エネルギーを固定してしまう微正準系には同じ論証を直接適用できません。

<a id="prop-bht15-ensemble-curvature"></a>

<!-- formal-statement-start -->
> **命題（微正準曲率と正準エネルギー変動）**
> $G,R>0$、$0<M<R/(2G)$ の有限壁Schwarzschild族で $E_R=R(1-\sqrt{1-2GM/R})/G$、$S=4\pi GM^2$、$T_R=(8\pi GM\sqrt{1-2GM/R})^{-1}$ とする。この族を $S=S(E_R)$ として表せば

$$
\frac{dS}{dE_R}=\frac1{T_R}=b,\qquad
\frac{d^2S}{dE_R^2}=8\pi G\left(1-\frac{3GM}R\right).
$$

> 従って小枝では $S(E_R)$ は局所凸、大枝では局所凹である。一方、固定ハミルトニアンを持つ通常の正準系で $Z(b)$ が正・有限、エネルギーの二次モーメントが有限なら

$$
C_{\rm can}=b^2\operatorname{Var}_b(E)\ge0.
$$

> 負の $C_R$ は通常の正準エネルギー変動と両立しないが、$E_R$ 固定の微正準条件そのものとの矛盾ではない。これは微正準の全摂動安定性の証明でもない。
<!-- formal-statement-end -->

### 証明の見取り図

第一式は[壁第一法則](#thm-bht15-wall-capacity)をエネルギーで微分して得ます。二階微分は $M$ を媒介変数に使います。正準の非負性は分配関数を二度微分し、分散へ戻します。

<!-- proof-start -->
### 証明

$dE_R/dM=1/x>0$ なので、$M\mapsto E_R$ は単調増加し、$S$ を $E_R$ の関数として扱えます。[壁第一法則](#thm-bht15-wall-capacity)から

$$
\frac{dS}{dE_R}=\frac{dS/dM}{dE_R/dM}
=8\pi GMx=b.
$$

$R$ を固定した $dx/dM=-G/(Rx)$ を用い、二階微分は

$$
\begin{aligned}
\frac{d^2S}{dE_R^2}
&=\frac{db/dM}{dE_R/dM}
=x\cdot 8\pi G\left(x+M\frac{dx}{dM}\right)\\
&=8\pi G\left(x^2-\frac{GM}R\right)
=8\pi G\left(1-\frac{3GM}R\right).
\end{aligned}
$$

次に離散エネルギー準位 $E_i$ の通常の正準系で $Z(b)=\sum_i e^{-bE_i}$ と書きます（連続系では収束する積分に置き換える）。$p_i=e^{-bE_i}/Z$ として $\langle E\rangle_b=\sum_i p_iE_i$ だから

$$
\frac{d\log Z}{db}=-\langle E\rangle_b,
\quad
\frac{d\langle E\rangle_b}{db}
=-\langle E^2\rangle_b+\langle E\rangle_b^2
=-\operatorname{Var}_b(E).
$$

$T=1/b$ により $db/dT=-b^2$ です。従って $d\langle E\rangle_b/dT=b^2\operatorname{Var}_b(E)\ge0$。この導出は正・規格化可能な $Z$ と固定されたエネルギースペクトルを前提とします。重力の形式的サドル寄与をそのまま通常の正準確率分布と見なすことはできません。
<!-- proof-end -->

微正準でエネルギーを固定すると、Schwarzschildの一変数族では $E_R$ と $M$ は一対一です。したがってその変分方向がなくなるだけで、球対称以外の形状変動、物質の自由度、熱放射との平衡がどうなるかは未検査です。**負熱容量でも微正準で許されうる**ことと、**微正準で必ず安定**なことを取り違えないのが重要です。

### 仮定を外すと何が壊れるか

- **無限遠に壁を取り払う：** $C_R$ は負の $C_\infty$ に戻り、有限の熱浴との安定な正準釣合いを支持する赤方偏移が消えます。大枝は $R$ を無限大にして $M$ を固定する極限では残りません。
- **固定温度を固定エネルギーに替える：** $I_b=bE_R-S$ の $M$ 変動を許す正準Hessianの判定は適用されません。代わりにエネルギー制約下のエントロピー比較が必要です。
- **一変数族を全重力揺らぎへ拡張する：** 縮約作用の正の二階微分だけでは、未計算の非球対称モードや境界条件を含む全Hessianの正定値性は分かりません。
- **物質の熱放射を含める：** 空洞内の放射のエネルギー・エントロピー、壁との熱交換、バックリアクションを加える必要があります。真空Schwarzschildの式だけで全系の相転移温度を確定しません。

これらの切り分けが、次講で負の宇宙項を持つAdS時空の境界条件と熱的背景を比較する際の出発点になります。

## 6. 演習――条件を固定して計算を再現する

以下の全問題では4次元・非回転・無電荷・自然単位を用い、断りのない限り $G>0$ とします。問題ごとに固定データを確認し、$R=kGM$ は一つの状態を選ぶ条件であって微分時の恒等式ではないことに注意してください。

### Level A：負熱容量・赤方偏移・壁データ

<a id="ex-bht15-a01"></a>

#### BHT15-A01 無限遠で質量が半分になると

- Level: A
- 問題: $M>0$ のSchwarzschild族の温度とエネルギーを $T_\infty(M)=1/(8\pi GM)$、$E_\infty(M)=M$ とする。$G$ を固定して $C_\infty$ を微分から求め、$M\mapsto M/2$ の温度変化を述べよ。

<!-- solution-start -->
**詳細解答**： [熱容量の定義](#def-bht15-heat-capacity)で媒介変数を $M$ とします。$dE_\infty/dM=1$、$dT_\infty/dM=-(8\pi G)^{-1}M^{-2}$ なので

$$
C_\infty=\frac1{-(8\pi GM^2)^{-1}}=-8\pi GM^2<0.
$$

また $T_\infty(M/2)=1/[8\pi G(M/2)]=2T_\infty(M)$ です。負符号は質量が減ると温度が増すという静的族の応答を示し、蒸発時間はこの計算だけでは求まりません。
<!-- solution-end -->

<a id="ex-bht15-a02"></a>

#### BHT15-A02 壁の固有周期を求める

- Level: A
- 問題: $M>0$、$R>2GM$ のSchwarzschild壁で $f_R=1-2GM/R$、$\beta_H=8\pi GM$ とする。壁の誘導計量 $f_Rd\tau^2+R^2d\Omega_2^2$ から固有逆温度 $b$ と $T_R$ を求めよ。さらに $R=4GM$ の一点で評価せよ。

<!-- solution-start -->
**詳細解答**：壁で $r=R$ を固定し、時間座標を正則な周期 $0\le\tau<\beta_H$ に沿って進めると、固有長は

$$
b=\int_0^{\beta_H}\sqrt{f_R}\,d\tau
=8\pi GM\sqrt{1-2GM/R}.
$$

その逆数が局所温度です。$R=4GM$ の点で $f_R=1/2$ を代入すると

$$
b=\frac{8\pi GM}{\sqrt2},\qquad
T_R=\frac{\sqrt2}{8\pi GM}.
$$

$R$ を固定して変分する際に $R=4GM$ を微分してはなりません。これは代入用の点の選択です。
<!-- solution-end -->

<a id="ex-bht15-a03"></a>

#### BHT15-A03 準局所エネルギーの第一法則

- Level: A
- 問題: $0<M<R/(2G)$、$R$ 固定で $E_R=R(1-\sqrt{1-2GM/R})/G$、$S=4\pi GM^2$ とする。$dE_R/dM$ と $(dE_R/dM)/(dS/dM)$ を求め、壁温度と比較せよ。

<!-- solution-start -->
**詳細解答**：$R$ を固定して $x=\sqrt{1-2GM/R}$ を $M$ で微分すると $2x(dx/dM)=-2G/R$ より $dx/dM=-G/(Rx)$ です。従って

$$
\frac{dE_R}{dM}=-\frac RG\frac{dx}{dM}=\frac1x,
\qquad \frac{dS}{dM}=8\pi GM.
$$

$dS/dM>0$ なので

$$
\frac{dE_R/dM}{dS/dM}
=\frac{1/x}{8\pi GM}
=\frac1{8\pi GM\sqrt{1-2GM/R}}=T_R.
$$

従って $R$ 固定の族で $dE_R=T_RdS$ です。無限遠の $M$ を壁の $E_R$ に置き換えずに使うとこの比になりません。
<!-- solution-end -->

<a id="ex-bht15-a04"></a>

#### BHT15-A04 二つの壁位置で熱容量の符号

- Level: A
- 問題: 固定壁のSchwarzschild熱容量を $C_R=8\pi GM^2(R-2GM)/(3GM-R)$ とする。$R=4GM$ と $R=5GM/2$ の各々で値を求め、両状態が同じ固定壁のアンサンブルの比較にならない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$R=4GM$ では $R-2GM=2GM$、$3GM-R=-GM$ なので

$$
C_R=8\pi GM^2\frac{2GM}{-GM}=-16\pi GM^2.
$$

$R=5GM/2$ では $R-2GM=GM/2$、$3GM-R=GM/2$ なので $C_R=+8\pi GM^2$。二つの比はそれぞれの解の評価点を示します。$M$ を同じ記号で書いても、壁の半径と対応する温度が一般に異なるため、同一 $(R,b)$ の競合サドルとは扱えません。
<!-- solution-end -->

<a id="ex-bht15-a05"></a>

#### BHT15-A05 壁温度に下限がある

- Level: A
- 問題: $R>0$ 固定、$y=2GM/R\in(0,1)$ として固有周期 $b(y)=4\pi R y\sqrt{1-y}$ を考える。$db/dy$、最大周期と最小温度を求め、$y\downarrow0$、$y\uparrow1$ の極限を確認せよ。

<!-- solution-start -->
**詳細解答**：積の微分で

$$
\frac{db}{dy}=4\pi R\left(\sqrt{1-y}-\frac y{2\sqrt{1-y}}\right)
=\frac{2\pi R(2-3y)}{\sqrt{1-y}}.
$$

$0<y<1$ で分母は正なので、$y=2/3$ の前で増加、後で減少します。この点で

$$
b_{\max}=4\pi R\frac23\frac1{\sqrt3}
=\frac{8\pi R}{3\sqrt3},\qquad
T_{\min}=\frac1{b_{\max}}=\frac{3\sqrt3}{8\pi R}.
$$

$y\downarrow0$ では $y$ が零になり、$y\uparrow1$ では平方根が零になるので、両端で $b\to0$ です。よってその間の唯一の極大が大域最大です。
<!-- solution-end -->

### Level B：二分岐・仕事項・アンサンブル

<a id="ex-bht15-b01"></a>

#### BHT15-B01 同一温度で二つのSchwarzschild質量

- Level: B
- 問題: $R,G>0$ を固定し、壁固有周期を $b=3\pi R/2$ に固定する。$x=\sqrt{1-2GM/R}\in(0,1)$ として正則条件 $b=4\pi Rx(1-x^2)$ を解き、二つの質量の大小と縮約作用の二階微分の符号を判定せよ。

<!-- solution-start -->
**詳細解答**：$4\pi R$ で割ると $x-x^3=3/8$ です。従って

$$
x^3-x+\frac38
=\left(x-\frac12\right)
\left(x^2+\frac x2-\frac34\right)=0.
$$

$0<x<1$ の二解は $x_{\rm large}=1/2$ と $x_{\rm small}=(\sqrt{13}-1)/4$ です。後者は $1/\sqrt3$ より大きく、前者は小さいことを、それぞれ平方または近似 $0.6514>0.5774>0.5$ で確認できます。$M=R(1-x^2)/(2G)$ なので、$x$ が小さい前者の方が質量は大きいです。

[二分岐定理](#thm-bht15-two-branches)の停留点で

$$
\left.\partial_M^2 I_b\right|_*=8\pi G\frac{3GM-R}{R-2GM}
$$

です。$x=1/2$ の大枝では $M=3R/(8G)$、$3GM-R=R/8>0$ なので局所極小。$x=(\sqrt{13}-1)/4>1/\sqrt3$ の小枝では $M<R/(3G)$ となり局所極大です。境界の $b,R$ は両方で共通です。
<!-- solution-end -->

<a id="ex-bht15-b02"></a>

#### BHT15-B02 壁を動かすときの仕事

- Level: B
- 問題: $M,G>0$ を固定し $R>2GM$ を変える。$E_R=R(1-\sqrt{1-2GM/R})/G$、壁面積 $A_B=4\pi R^2$ に対し、$-\partial E_R/\partial A_B|_S$ を求めよ。また $dE_R=T_RdS-p_RdA_B$ を全微分で検証せよ。

<!-- solution-start -->
**詳細解答**：$x=\sqrt{1-2GM/R}$ と置きます。$S=4\pi GM^2$ は $M$ のみの関数なので、$S$ 固定は $M$ 固定です。このとき $R$ についての偏微分と面積の微分は

$$
\left.\frac{\partial x}{\partial R}\right|_M=\frac{GM}{R^2x},\qquad
\frac{dA_B}{dR}=8\pi R.
$$

よって

$$
\begin{aligned}
\left.\frac{\partial E_R}{\partial R}\right|_M
&=\frac{1-x}G-\frac RG\frac{GM}{R^2x}\\
&=\frac1G\left(1-x-\frac{1-x^2}{2x}\right)
=-\frac{(1-x)^2}{2Gx}.
\end{aligned}
$$

面積微分へ変換して

$$
p_R=-\frac{\partial_R E_R|_M}{8\pi R}
=\frac{(1-x)^2}{16\pi GRx}>0.
$$

$E_R$ の $M$ 方向の微分は $1/x$、[壁第一法則](#thm-bht15-wall-capacity)で $T_R(dS/dM)=1/x$。従って

$$
dE_R=\frac{dM}x-\frac{(1-x)^2}{2Gx}dR
=T_RdS-p_R(8\pi R\,dR)
=T_RdS-p_RdA_B.
$$

壁を固定した $C_R$ と、壁を動かして仕事をさせたときの熱容量を混同してはいけません。
<!-- solution-end -->

<a id="ex-bht15-b03"></a>

#### BHT15-B03 大枝はいつ平坦背景より指数が大きいか

- Level: B
- 問題: $0<x<1/\sqrt3$ の大枝で、熱的平坦背景との相対作用が $I_{\rm BH}-I_{\rm flat}=(\pi R^2/G)(1-x)^2(1+x)(3x-1)$ とする。作用差の符号を分類し、作用差が零の壁温度と最小壁温度の比を求めよ。「$C_R>0$ だから必ず平坦背景より優勢」という主張を判定せよ。

<!-- solution-start -->
**詳細解答**：$R,G>0$、$0<x<1$ なので $\pi R^2/G$、$(1-x)^2$、$1+x$ は全て正です。したがって $x>1/3$ で作用差は正、$x=1/3$ で零、$x<1/3$ で負です。正則条件に $x=1/3$ を代入すれば

$$
b=4\pi R\cdot\frac13\left(1-\frac19\right)
=\frac{32\pi R}{27},\quad
T_{\rm cross}=\frac{27}{32\pi R}.
$$

最小温度は $T_{\min}=3\sqrt3/(8\pi R)$ なので

$$
\frac{T_{\rm cross}}{T_{\min}}
=\frac{27}{32}\frac{8}{3\sqrt3}
=\frac{3\sqrt3}{4}>1.
$$

$1/3<x<1/\sqrt3$ は $C_R>0$ でも作用差が正、すなわち平坦背景の $e^{-I}$ の方が大きい領域です。ゆえに主張は偽です。逆に $I_{\rm BH}<I_{\rm flat}$ でも他のサドルや揺らぎを未評価のまま完全な分配関数での優勢とは断定しません。
<!-- solution-end -->

<a id="ex-bht15-b04"></a>

#### BHT15-B04 微正準エントロピーの曲率

- Level: B
- 問題: $R$ 固定で $0<M<R/(2G)$、$E_R=R(1-x)/G$、$S=4\pi GM^2$、$x=\sqrt{1-2GM/R}$ とする。$d^2S/dE_R^2$ を求め、その符号を各枝で判定せよ。また、固定ハミルトニアンの正準系で $Z=\sum_i e^{-bE_i}$ として $C=b^2\operatorname{Var}(E)$ を再導出せよ。

<!-- solution-start -->
**詳細解答**：$R$ 固定で $dx/dM=-G/(Rx)$ です。この解答における $E_{R,M}$、$S_M$、$b_M$ という添字 $M$ は、それぞれ $R$ を固定した $M$ による微分を表します。従って $E_{R,M}=1/x$、$S_M=8\pi GM$ なので

$$
\frac{dS}{dE_R}=\frac{8\pi GM}{1/x}=8\pi GMx=b.
$$

さらに $b_M=8\pi G(x-GM/(Rx))$ だから

$$
\frac{d^2S}{dE_R^2}=
\frac{b_M}{E_{R,M}}=8\pi G\left(x^2-\frac{GM}R\right)
=8\pi G\left(1-\frac{3GM}R\right).
$$

小枝 $M<R/(3G)$ では正で局所凸、大枝では負で局所凹です。一方、正準の $p_i=e^{-bE_i}/Z$ を微分すると

$$
\frac{d\langle E\rangle}{db}
=-\left(\sum_i p_iE_i^2-\left(\sum_i p_iE_i\right)^2\right)
=-\operatorname{Var}_b(E).
$$

$db/dT=-b^2$ を掛けて $C=d\langle E\rangle/dT=b^2\operatorname{Var}_b(E)\ge0$。これは $Z$ の収束と二次モーメントを仮定した通常の正準確率の結論です。微正準で $E_R$ 自身を固定した状態へ、正準のエネルギー変動をそのまま当てはめることはできません。
<!-- solution-end -->

### Level C：境界温度を固定した総合判定

<a id="ex-bht15-c01"></a>

#### BHT15-C01 有限空洞の候補を一つの境界値問題で比較する

- Level: C
- 問題: $G,R>0$ を固定した4次元真空Schwarzschild空洞を考える。壁固有逆温度を $b=3\pi R/2$ と固定し、$x=\sqrt{1-2GM/R}\in(0,1)$、$E_R=R(1-x)/G$、$S=\pi R^2(1-x^2)^2/G$ とする。熱的平坦背景の相対作用は零に選ぶ。

  1. 地平線の円錐欠損が消える周期条件から $x$ の二解と質量大小を求め、最小温度より上であることを確認せよ。
  2. $I_b=bE_R-S$ の停留条件と各枝の二階微分の符号を導き、大枝の熱容量を計算せよ。
  3. 大枝と平坦背景の相対作用を直接計算し、局所安定性と指数の大きさを別々に判定せよ。
  4. 固定 $E_R$ の微正準操作で、同じ質量揺らぎを許してよいか説明せよ。全重力モードの安定性について、得られた結論の射程を述べよ。

<!-- solution-start -->
**詳細解答**：**（1）** 壁の固有周期は $b=4\pi Rx(1-x^2)$ なので

$$
x-x^3=\frac38,\quad
(x-1/2)(x^2+x/2-3/4)=0.
$$

許される二解は $x_L=1/2$ と $x_S=(\sqrt{13}-1)/4$ です。$x_L<x_S$ で $M=R(1-x^2)/(2G)$ は $x$ の減少関数なので、$x_L$ は大質量枝、$x_S$ は小質量枝です。$x_L<1/\sqrt3<x_S$ も成り立ちます。壁温度 $T=1/b=2/(3\pi R)$ に対して

$$
\frac{T}{T_{\min}}=
\frac{2/(3\pi R)}{3\sqrt3/(8\pi R)}
=\frac{16}{9\sqrt3}>1
$$

なので、二解が現れる領域にいます（$16>9\sqrt3$ は両辺を平方して $256>243$ で確認できます）。

**（2）** $R$ 固定の $dx/dM=-G/(Rx)$ を使い、$b,R$ を固定した偏微分 $\partial_MI_b=b/x-8\pi GM$ を作ります。停留すると $b=8\pi GMx$。二度偏微分してからこの式を代入すると

$$
\left.\partial_M^2I_b\right|_*=\frac{bG}{Rx^3}-8\pi G
=8\pi G\frac{3GM-R}{R-2GM}.
$$

$x_L=1/2$ なら $M_L=3R/(8G)$、$3GM_L-R=R/8>0$ なので大枝は縮約方向の局所極小です。小枝は $M_S<R/(3G)$ なので局所極大です。大枝の熱容量は[壁熱容量の式](#thm-bht15-wall-capacity)へ $R-2GM_L=R/4$ と $3GM_L-R=R/8$ を代入して

$$
C_R(M_L)=8\pi GM_L^2\frac{R/4}{R/8}
=16\pi GM_L^2>0.
$$

**（3）** 大枝の $x_L=1/2$ を[相対作用式](#prop-bht15-saddle-crossing)へ代入すると

$$
I_{\rm BH}-I_{\rm flat}
=\frac{\pi R^2}G\left(\frac12\right)^2
\left(\frac32\right)\left(\frac12\right)
=\frac{3\pi R^2}{16G}>0.
$$

従って大枝は縮約作用で局所極小でも、平坦背景の先頭指数 $e^0$ より $e^{-I_{\rm BH}}$ は小さいです。「局所極小」と「大域的な古典指数の最大」は別です。

**（4）** $R$ 固定では $dE_R/dM=1/x>0$ なので、同じ $R$ で $E_R$ を一定にすれば $M$ も一定です。正準条件で使った質量変動は、微正準条件では許されません。

さらに本問で計算したのはSchwarzschild一変数族のHessianと、二つの古典サドルの相対指数だけです。非球対称摂動、量子揺らぎ、空洞内放射、積分経路を調べていないため、全重力モードの安定性や厳密な相転移の存在までは結論できません。
<!-- solution-end -->

---

負熱容量は「Schwarzschildなら常に不安定」という判決ではありません。**温度をどこで測るか、エネルギーをどこで定義するか、境界で何を固定するか**によって、正準に許される枝と微正準の意味が変わります。次講BHT16「AdSブラックホールとHawking–Page転移」では有限壁に代えてAdSの漸近境界を用い、同じ『局所安定性と競合背景を分ける』手順を適用します。
