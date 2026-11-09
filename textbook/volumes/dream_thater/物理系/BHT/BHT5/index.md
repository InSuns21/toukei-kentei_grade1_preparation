# BHT5 回転ブラックホールの第一法則

<!-- definition-example-audit: strict -->

[BHT4の非回転・帯電解族の第一法則](../BHT4/index.md#thm-bht4-rn-first-law)では、面積変化のほかに電荷を動かす仕事の項が必要でした。回転するブラックホールでは、電荷がなくても質量と面積だけでは状態を指定できません。**地平線自体が無限遠の静止時計に対して回転する**ため、角運動量を変えたときの仕事を見つける必要があります。

[GR32のKerr地平線](../../GR/GR32/index.md#prop-gr32-horizon)は、無限遠で規格化した時間並進 $\xi=\partial_t$ だけでなく、軸回転 $\eta=\partial_\varphi$ を含むKilling場で生成されます。今回はその生成場から角速度を定め、正則な断面の面積を計算し、質量の全微分を面積項と回転項に分解します。さらに別の座標で微分して偶然の係数合わせでないことを検算します。

4次元、漸近平坦、宇宙項 $\Lambda=0$、計量符号 $(-,+,+,+)$、$G=c=1$ を通して用います。$M,r,a$ は長さ、軸角運動量 $J$ と面積 $A$ は長さの二乗の次元を持ちます。$\hbar,k_B$ を用いる温度・エントロピーの同定はまだ行いません。

## 1. 静止時計を固定して回転解族を動かす

[GR32のBoyer–Lindquist表示](../../GR/GR32/index.md#def-gr32-kerr-metric)の座標を $(t,r,\vartheta,\varphi)$ とし、

$$
\Sigma=r^2+a^2\cos^2\vartheta,\qquad
\Delta=r^2-2Mr+a^2,\qquad
R(r)=r^2+a^2
$$

と書きます。$M$ は無限遠の質量、$a$ は符号付きの回転長さで、漸近的に非回転の方位角を選ぶと軸角運動量は $J=Ma$ です。時間・方位のKilling場 $\xi=\partial_t,\ \eta=\partial_\varphi$ はそれぞれ無限遠の時間並進と周期 $2\pi$ の軸回転に対応します。$a$ の符号を反転すると、選んだ軸に対する回転方向が反転します。

[GR32の正則な入射座標](../../GR/GR32/index.md#prop-gr32-horizon) $(v,r,\vartheta,\psi)$ では $\xi=\partial_v,\ \eta=\partial_\psi$ と書け、$\Delta=0$ の外側根は

$$
r_\pm=M\pm\sqrt{M^2-a^2},\qquad
r_++r_-=2M,\quad r_+r_-=a^2.
$$

$|a|<M$ のとき $r_+>r_-$ で外側根が単純になり、地平線は正則です。外部の座標成分に現れる $\Delta^{-1}$ を地平線へ直接代入せず、断面を取るときは入射座標を使います。

この章で「変分」と書く $\delta$ は、各点が**別々の定常Kerr時空**を表すパラメータ空間の接方向です。時間依存する摂動や物質が流入する過程の時間微分ではありません。この区別を固定してから定義します。

<a id="def-bht5-kerr-family"></a>

<!-- formal-statement-start -->
> **定義（非極限Kerrの定常解族）**
> 4次元、$G=c=1$、$\Lambda=0$、漸近平坦な真空Einstein方程式のKerr解を考える。無限遠で非回転の $\varphi$ と、単位規格化された $\xi=\partial_t$ を共通の基準とし、$\eta=\partial_\varphi$ の周期を $2\pi$ とする。開いたパラメータ領域

$$
\mathcal K=\{(M,a)\in\mathbb R^2:M>0,\ |a|<M\},\qquad J=Ma
$$

> にある解の族を非極限Kerrの定常解族という。$\delta M,\delta a$ はその任意の接方向の成分であり、$\delta J=a\,\delta M+M\,\delta a$ とする。各解の未来外側地平線は $r_+$ にあり、生成場を無限遠の時間成分が1となるよう規格化する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht5-kerr-family -->
**定義の確認**：長さ $L>0$ を固定し、$M=5L,a=3L$ とすると $|a|<M$ で、

$$
\Delta=(r-9L)(r-L),\quad r_+=9L,\quad r_-=L,\quad J=15L^2.
$$

$\Delta$ の二根は異なり、$r=r_+$ で $\Sigma\ge81L^2>0$ なので[入射Kerr表示の正則性](../../GR/GR32/index.md#prop-gr32-horizon)を使えます。$\xi$ は無限遠で単位時間に対応し、$\eta$ は一周 $2\pi$ です。従ってパラメータ・解・規格化・外側根という定義の条件が揃いました。
<!-- definition-example-end -->

## 2. 回転する地平線の面積・角速度・表面重力

無限遠の時間に対して地平線がどの方向へ動くかを決めるのは、[GR32の零生成Killing場](../../GR/GR32/index.md#prop-gr32-horizon)です。外側根において

$$
R_+:=r_+^2+a^2=2Mr_+,\qquad
\chi=\xi+\Omega_H\eta,\qquad
\Omega_H=\frac a{R_+}
$$

となります。$\chi$ は単に $\xi$ を定数倍した場ではありません。方位方向を混ぜることが、後に $\Omega_H\delta J$ を生む幾何学的理由です。$\Omega_H$ は長さの逆数で、$a<0$ なら負になります。

面積は、入射座標で $v$ と $r=r_+$ を固定した正則な二次元断面から求めます。[GR32の入射計量](../../GR/GR32/index.md#prop-gr32-horizon)に $dv=dr=0$ を入れ、$\Sigma_+=r_+^2+a^2\cos^2\vartheta$ とすると誘導計量は

$$
h=\Sigma_+\,d\vartheta^2+
\frac{R_+^2\sin^2\vartheta}{\Sigma_+}\,d\psi^2.
$$

この座標基底 $(\partial_\vartheta,\partial_\psi)$ で交差成分は零ですから、

$$
\det h=\Sigma_+\frac{R_+^2\sin^2\vartheta}{\Sigma_+}
=R_+^2\sin^2\vartheta,\qquad
A=\int_0^{2\pi}\!\int_0^\pi R_+\sin\vartheta\,d\vartheta\,d\psi
=4\pi R_+.
$$

したがって断面の形は一般には球面の標準計量でなくても、面積は $4\pi(r_+^2+a^2)$ です。$a=0$ で $r_+=2M$ とすれば[BHT1のSchwarzschild面積](../BHT1/index.md#prop-bht1-schwarzschild-data)へ戻ります。

表面重力は[GR45のKerr表面重力定理](../../GR/GR45/index.md#thm-gr45-kerr)を、同じ $\chi$ と非極限根へ適用します。$\Delta'(r_+)=r_+-r_-$ であり、

$$
\kappa=\frac{r_+-r_-}{2R_+}
=\frac{r_+^2-a^2}{2r_+R_+}>0.
$$

最後の等号には $r_+r_-=a^2$ を使いました。$\chi$ の時間成分を別の定数倍にすれば $\kappa$ も変わるため、無限遠での規格化と切り離せません。

<a id="prop-bht5-kerr-data"></a>

<!-- formal-statement-start -->
> **命題（Kerr地平線の面積と状態データ）**
> [非極限Kerr定常解族](#def-bht5-kerr-family)の各 $(M,a)\in\mathcal K$ で、無限遠に規格化された $\xi$、周期 $2\pi$ の $\eta$ と、正則な未来外側地平線の二球面断面を用いる。$r_\pm=M\pm\sqrt{M^2-a^2}$、$R_+=r_+^2+a^2=2Mr_+$ とすると、

$$
\boxed{\begin{gathered}
J=Ma,\quad A=4\pi R_+=8\pi Mr_+,\\
\chi=\xi+\Omega_H\eta,\quad
\Omega_H=\frac a{R_+},\quad
\kappa=\frac{r_+-r_-}{2R_+}
=\frac{r_+^2-a^2}{2r_+R_+}>0.
\end{gathered}}
$$

> これらは同じKerr解族から得た状態データである。$[A]=[J]=L^2$、$[\Omega_H]=[\kappa]=L^{-1}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

面積は正則断面の誘導計量から積分し、角速度は[GR32の地平線生成場](../../GR/GR32/index.md#prop-gr32-horizon)、表面重力は[GR45のKerr定理](../../GR/GR45/index.md#thm-gr45-kerr)の規格化を照合します。根の積を使えば後の微分に適した表示になります。

<!-- proof-start -->
### 証明

[GR32の地平線](../../GR/GR32/index.md#prop-gr32-horizon)により $\Delta(r_+)=0$ で $r_+^2+a^2=2Mr_+$、また正則座標で $\chi=\partial_v+(a/R_+)\partial_\psi$ が零法線のKilling場です。断面の計量成分は $h_{\vartheta\vartheta}=\Sigma_+$、$h_{\psi\psi}=R_+^2\sin^2\vartheta/\Sigma_+$、$h_{\vartheta\psi}=0$ であり、面積要素は $R_+\sin\vartheta\,d\vartheta d\psi$。積分の角度範囲は $0\le\vartheta\le\pi$、$0\le\psi<2\pi$ なので $A=4\pi R_+$ です。

[GR45の表面重力](../../GR/GR45/index.md#thm-gr45-kerr)へ $R_+=2Mr_+$ と $\Delta'(r_+)=2r_+-2M=r_+-r_-$ を代入し、$\kappa=(r_+-r_-)/(2R_+)$ を得ます。根の積 $r_+r_-=a^2$ を用いれば $\kappa=(r_+^2-a^2)/(2r_+R_+)$。非極限では $r_+>|a|$ なので正です。$J=Ma$ は無限遠の軸角運動量規格化から得た解族のデータです。各次元も示した値と一致します。
<!-- proof-end -->

**数値検算。** $M=5L,a=3L$ では $R_+=90L^2$ なので、

$$
A=360\pi L^2,\qquad
\Omega_H=\frac1{30L},\qquad
\kappa=\frac{8L}{180L^2}=\frac2{45L},\qquad
J=15L^2.
$$

地平線の回転が正でも、$\kappa$ は正です。両者は異なる幾何学的量です。

## 3. 全微分に回転仕事が現れる

前節の状態量をすべて $(M,a)$ で直接微分するより、外側根 $r=r_+$ と $a$ を局所座標にすると式が短くなります。$\Delta(r)=0$ を質量について解き、

$$
2Mr=r^2+a^2
\quad\Longleftrightarrow\quad
M(r,a)=\frac r2+\frac{a^2}{2r},\quad
J(r,a)=aM(r,a),\quad A(r,a)=4\pi(r^2+a^2).
$$

ただし $r>|a|$ という開領域に限ります。実際、この式から

$$
M-|a|=\frac{(r-|a|)^2}{2r}>0,\qquad
r_-=\frac{a^2}{r}<r
$$

なので $r$ は外側根です。さらに $M_r=(r^2-a^2)/(2r^2)>0$ で、

$$
\det\frac{\partial(M,J)}{\partial(r,a)}
=\det\begin{pmatrix}M_r&M_a\\aM_r&M+aM_a\end{pmatrix}
=MM_r>0.
$$

実際、逆向きにも $a=J/M$、$r=M+\sqrt{M^2-(J/M)^2}$ と滑らかに戻せます。従って $(r,a)$ と $(M,J)$ は非極限解族の局所座標として相互に使えます。これは二つの微分を独立に比較する根拠です。

$$
\delta M=\frac{r^2-a^2}{2r^2}\,\delta r+\frac ar\,\delta a,\quad
\delta A=8\pi(r\,\delta r+a\,\delta a),\quad
\delta J=a\,\delta M+M\,\delta a.
$$

次の計算で $R=r^2+a^2$、$\Omega_H=a/R$、$\kappa=(r^2-a^2)/(2rR)$ と略します。回転仕事を移項した式の右辺を、まず独立な $\delta r,\delta a$ の係数へ展開します。

$$
\begin{aligned}
\frac{\kappa}{8\pi}\delta A+\Omega_HM\,\delta a
&=\frac{r^2-a^2}{2rR}(r\,\delta r+a\,\delta a)
+\frac{aM}{R}\delta a\\
&=\frac{r^2-a^2}{2R}\delta r
+\frac aR\left(\frac{r^2-a^2}{2r}+M\right)\delta a\\
&=\frac{r^2-a^2}{2R}\delta r+\frac{ar}{R}\delta a
=\frac{r^2}{R}\delta M.
\end{aligned}
$$

最後から二つ目の等号は $2Mr=R$ を使用しています。また $1-\Omega_Ha=1-a^2/R=r^2/R$ なので、上式へ $\delta J=a\delta M+M\delta a$ を戻せば求める関係になります。

<a id="thm-bht5-kerr-first-law"></a>

<!-- formal-statement-start -->
> **定理（非極限Kerr定常解族の第一法則）**
> 4次元、$G=c=1$、$\Lambda=0$ の漸近平坦・真空Einstein方程式の[非極限Kerr定常解族](#def-bht5-kerr-family)を考える。$M>0,\ |a|<M,\ J=Ma$、無限遠で時間並進を単位規格化し、軸回転の周期を $2\pi$ とする。
>
> 正則な未来外側地平線の[面積・表面重力・角速度](#prop-bht5-kerr-data)を同じ規約で計算すると、任意の定常解族の接方向 $\delta$ に対して

$$
\boxed{\delta M=\frac{\kappa}{8\pi}\delta A+\Omega_H\delta J}
$$

> が成立する。この主張はKerr解族上の**平衡状態版の変分恒等式**であり、任意の時間依存摂動や物質流入過程についての一般定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

根の条件から $M(r,a)$ を作り、$A$ と $J=aM$ を微分します。面積と角運動量は $r,a$ の両方に依存するため、どちらか一方を固定した微分だけで全変分を証明しないことが鍵です。

<!-- proof-start -->
### 証明

非極限領域 $r>|a|$ で前述の $M(r,a)$ は滑らかです。面積の微分と[状態データ](#prop-bht5-kerr-data)を用い、

$$
\frac{\kappa}{8\pi}\delta A
=\frac{r^2-a^2}{2rR}(r\delta r+a\delta a).
$$

また $J=aM$ を積の微分法で微分して $\delta J=a\delta M+M\delta a$。従って第一法則は

$$
(1-\Omega_Ha)\delta M
=\frac{\kappa}{8\pi}\delta A+\Omega_HM\delta a
$$

と同値です。右辺の $\delta r$ の係数は $(r^2-a^2)/(2R)$、$\delta a$ の係数は $a[(r^2-a^2)/(2r)+M]/R=ar/R$ です。一方、左辺は $1-\Omega_Ha=r^2/R$ を用いて

$$
\frac{r^2}{R}\delta M
=\frac{r^2}{R}\left(\frac{r^2-a^2}{2r^2}\delta r+\frac ar\delta a\right)
=\frac{r^2-a^2}{2R}\delta r+\frac{ar}{R}\delta a.
$$

両独立方向の係数が一致し、$R>0$ なので変形は正当です。$\delta$ は任意でした。
<!-- proof-end -->

## 4. 面積と角運動量からの独立な検算

前節では $(r,a)$ を使いました。今度は面積 $A$ と角運動量 $J$ から質量を戻し、二つの偏微分がそれぞれ $\kappa/(8\pi)$、$\Omega_H$ になるかを検査します。この逆の見方は、固定面積で回転を変える場合にも有用です。

$A=8\pi Mr$ なので $X:=A/(16\pi)=Mr/2>0$ とおきます。根の方程式 $r^2+a^2=2Mr$ を使って

$$
M^2=\frac{Mr}{2}+\frac{Ma^2}{2r}
=X+\frac{(Ma)^2}{4X}
=\frac A{16\pi}+\frac{4\pi J^2}{A}.
$$

<a id="prop-bht5-mass-area-j"></a>

<!-- formal-statement-start -->
> **命題（面積・角運動量による質量公式）**
> [非極限Kerr定常解族](#def-bht5-kerr-family)の正質量分枝では、$A>0$、$J\in\mathbb R$ が $|J|<A/(8\pi)$ を満たす状態域で

$$
\boxed{M(A,J)=\sqrt{\frac A{16\pi}+\frac{4\pi J^2}{A}}}
$$

> と書け、$A,J$ を独立に変化させた偏微分は

$$
\boxed{\left(\frac{\partial M}{\partial A}\right)_J
=\frac{\kappa}{8\pi},\qquad
\left(\frac{\partial M}{\partial J}\right)_A=\Omega_H}
$$

> となる。ここで $\kappa,\Omega_H$ は同じKerr解の[地平線状態データ](#prop-bht5-kerr-data)である。
<!-- formal-statement-end -->

### 証明の見取り図

$M^2$ を直接微分してから $2M>0$ で割ります。$8\pi J/A=a/r$ を用いると、面積微分の係数が表面重力へ変わります。

<!-- proof-start -->
### 証明

$A=8\pi Mr$ と $J=Ma$ から $8\pi J/A=a/r$ です。$r>|a|$ は $|J|<A/(8\pi)$ と同値で、この開領域では平方根内部は正で滑らかです。両辺を微分すると

$$
2M\,\delta M
=\left(\frac1{16\pi}-\frac{4\pi J^2}{A^2}\right)\delta A
+\frac{8\pi J}{A}\delta J.
$$

$J$ の係数を $2M$ で割ると

$$
\frac{4\pi J}{MA}
=\frac{Ma}{2M^2r}
=\frac a{2Mr}
=\frac a{r^2+a^2}=\Omega_H.
$$

$A$ の係数に $8\pi$ を掛ければ

$$
\begin{aligned}
8\pi\left(\frac{\partial M}{\partial A}\right)_J
&=\frac1{4M}\left(1-\frac{64\pi^2J^2}{A^2}\right)\\
&=\frac1{4M}\left(1-\frac{a^2}{r^2}\right)
=\frac{r^2-a^2}{2r(r^2+a^2)}
=\kappa.
\end{aligned}
$$

最後は $2Mr=r^2+a^2$ と[状態データ](#prop-bht5-kerr-data)を使いました。二つの偏微分が独立に一致しました。
<!-- proof-end -->

この公式は定常Kerr**族の内側**での質量の状態関数表示です。質量を変化させる任意の非定常過程で $A$ と $J$ の間に自由な変分が存在する、という主張ではありません。

## 5. 何を固定するかで意味が変わる

- **固定面積** $\delta A=0$： [非極限Kerr定常解族の第一法則](#thm-bht5-kerr-first-law)から $\delta M=\Omega_H\delta J$。正の回転方向で角運動量を増やすと質量も増える。ただし $J<0$ なら $\Omega_H<0$ なので符号は反転する。
- **固定角運動量** $\delta J=0$： $\delta M=\kappa\delta A/(8\pi)$。非極限では $\kappa>0$ なので質量増加に対応する面積変化は正である。
- **回転反転** $a\mapsto-a$： $M,r_\pm,R_+,A,\kappa$ は不変、$J,\Omega_H$ はそれぞれ反転する。従って積 $\Omega_H\delta J$ の形は不変である。
- **Schwarzschild部分族** $a=0,\ \delta a=0$： $r_+=2M$、$A=16\pi M^2$、$\Omega_H=0$、$\kappa=1/(4M)$ から[BHT1の幾何学的変分恒等式](../BHT1/index.md#prop-bht1-variation-identity)を回復する。なお $a=0$ の一点で $\delta a\ne0$ とするKerr族の方向も数学的には存在するが、その点の $\Omega_H=0$ により一次の回転仕事は零となる。

$M$ を固定して $a$ を大きくする定常解族の方向では、$r_+=M+\sqrt{M^2-a^2}$ が減り、面積も減ることがあります。これは異なる定常時空同士の比較です。[GR36の面積定理の適用条件](../../GR/GR36/index.md#thm-gr36-smooth-area)にある、エネルギー条件と大域的条件を満たす**一つの時空内の未来地平線**の比較ではありません。定常変分の負の面積差を物理過程の面積定理の反例としてはいけません。

最後に、$|a|\uparrow M$ では $s:=\sqrt{M^2-a^2}\downarrow0$、$r_+\to M$、$\kappa=s/R_+\to0$ です。しかし固定 $M$ で

$$
\left(\frac{\partial r_+}{\partial a}\right)_M
=-\frac a{\sqrt{M^2-a^2}}
$$

は正側の極限 $a\uparrow M$ で負の無限大へ発散します。[BHT4の極限RNの議論](../BHT4/index.md#prop-bht4-mq-check)と同じく、$\kappa\to0$ だから微分項も零だと先に代入するのは誤りです。極限境界では二変数の開領域という仮定を失い、本講の全微分証明をそのまま持ち込めません。

## 6. 発展：回転と電荷がともにある場合

電荷を持つ回転解では、面積・回転仕事・電気的な仕事の三つを同時に検算できます。以下では4次元の漸近平坦なEinstein–Maxwellの**Kerr–Newman解族の明示式を入力**し、その状態データの代数的整合性を証明します。ここではEinstein–Maxwell方程式からKerr–Newman計量を一から構成・分類する一般定理は主張しません。

Kerr–NewmanのBoyer–Lindquist表示では $\Sigma=r^2+a^2\cos^2\vartheta$ をそのまま用い、根の方程式が

$$
\Delta_Q=r^2-2Mr+a^2+Q^2=0,\qquad
r_\pm=M\pm\sqrt{M^2-a^2-Q^2}
$$

に変わります。電荷 $Q$ は[BHT4と同じ符号規格化](../BHT4/index.md#def-bht4-horizon-potential)とし、$M>0,\ M^2>a^2+Q^2$ の非極限領域を使います。外側根 $r=r_+$、$R=r^2+a^2$ に対して

$$
2Mr=R+Q^2,\quad r_-=\frac{a^2+Q^2}{r}<r,\quad
A=4\pi R,\quad \Omega_H=\frac aR,\quad
\kappa=\frac{r-r_-}{2R}=\frac{r^2-a^2-Q^2}{2rR}.
$$

面積式は正則な断面で $\Sigma_+$ と $R^2\sin^2\vartheta/\Sigma_+$ の積を取ればKerrと同じ方法で得られます。角速度は $\chi=\partial_t+\Omega_H\partial_\varphi$ が地平線で零となる条件から決まります。

電場ポテンシャル1形式 $\mathcal A$ の符号とゲージを固定します。外部の静的基準へつながる表示として

$$
\mathcal A=\frac{Qr}{\Sigma}
\left(dt-a\sin^2\vartheta\,d\varphi\right)
$$

を用いると、$a=0$ で[BHT4のRNポテンシャル](../BHT4/index.md#def-bht4-horizon-potential) $\mathcal A=(Q/r)dt$ に戻ります。$\chi\cdot\mathcal A$ は無限遠で零に近づき、地平線では角度によらない値を持ちます。

<a id="def-bht5-kn-potential"></a>

<!-- formal-statement-start -->
> **定義（Kerr–Newmanの地平線電位）**
> 4次元の非極限Kerr–Newman解族で $M>0,\ M^2>a^2+Q^2$、無限遠で規格化した $\chi=\partial_t+\Omega_H\partial_\varphi$、$\Omega_H=a/(r_+^2+a^2)$ を取る。電荷規約は $a=0$ で $F_{tr}=Q/r^2$ に一致するものとし、$\mathcal A=(Qr/\Sigma)(dt-a\sin^2\vartheta\,d\varphi)$ の静的外部ゲージで

$$
\boxed{\Phi_H:=\left.\chi^a\mathcal A_a\right|_{r_+}
-\lim_{r\to\infty}\chi^a\mathcal A_a
=\frac{Qr_+}{r_+^2+a^2}}
$$

> を地平線電位とする。地平線値は正則な座標での極限として読み、両端に同じ定数を加える定常ゲージ変換では電位差は不変である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht5-kn-potential -->
**定義の確認**：地平線で $R=r_+^2+a^2$ とすると $\Omega_H=a/R$ なので

$$
\begin{aligned}
\left.\chi\cdot\mathcal A\right|_{r_+}
&=\frac{Qr_+}{\Sigma_+}
\left(1-\frac{a^2\sin^2\vartheta}{R}\right)\\
&=\frac{Qr_+}{\Sigma_+}\,
\frac{R-a^2\sin^2\vartheta}{R}
=\frac{Qr_+}{R}.
\end{aligned}
$$

$R-a^2\sin^2\vartheta=\Sigma_+$ なので極角依存は消えます。無限遠では $Qr/\Sigma=O(r^{-1})$ です。さらに $a=0$ で $\Phi_H=Q/r_+$、$Q=0$ で $\Phi_H=0$ を回復し、定義の電位差・規格化・二つの極限を直接確認できます。
<!-- definition-example-end -->

根の方程式で質量を解けば $M=(r^2+a^2+Q^2)/(2r)$、$J=aM$ です。今度は $\delta Q$ も独立に動かします。

<a id="prop-bht5-kn-first-law"></a>

<!-- formal-statement-start -->
> **命題（非極限Kerr–Newman解族の変分恒等式）**
> 4次元、$G=c=1$、$\Lambda=0$、漸近平坦で磁荷のないEinstein–Maxwellの非極限Kerr–Newman定常解族を、$M>0,\ M^2>a^2+Q^2$ で考える。無限遠の時間・回転と[BHT4の電荷規約](../BHT4/index.md#def-bht4-horizon-potential)を固定し、正則な未来外側地平線の $A,\kappa,\Omega_H$ と[地平線電位](#def-bht5-kn-potential)を使うと、解族の任意の接方向について

$$
\boxed{\delta M=\frac{\kappa}{8\pi}\delta A
+\Omega_H\delta J+\Phi_H\delta Q}
$$

> が成り立つ。$Q=0$ は[Kerrの第一法則](#thm-bht5-kerr-first-law)、$a=0$ は[RNの第一法則](../BHT4/index.md#thm-bht4-rn-first-law)へ制限される。
<!-- formal-statement-end -->

### 証明の見取り図

$M(r,a,Q)$ を三変数で微分し、$\delta J=a\delta M+M\delta a$ を用いて角運動量の項を左へ移します。残る三つの独立係数が一致すればよく、電荷項の符号はゲージを固定した $\Phi_H$ で確定します。

<!-- proof-start -->
### 証明

非極限域 $r^2>a^2+Q^2$ は開いており、$M(r,a,Q)=(r^2+a^2+Q^2)/(2r)$ は滑らかです。各変数を独立に微分すると

$$
\delta M=\frac{r^2-a^2-Q^2}{2r^2}\delta r
+\frac ar\delta a+\frac Qr\delta Q,\qquad
\delta A=8\pi(r\delta r+a\delta a).
$$

$\Omega_H=a/R$、$\Phi_H=Qr/R$、$\kappa=(r^2-a^2-Q^2)/(2rR)$ を代入して

$$
\begin{aligned}
\frac\kappa{8\pi}\delta A+\Omega_HM\delta a+\Phi_H\delta Q
&=\frac{r^2-a^2-Q^2}{2R}\delta r\\
&\quad+\frac aR\left(\frac{r^2-a^2-Q^2}{2r}+M\right)\delta a
+\frac{Qr}{R}\delta Q\\
&=\frac{r^2-a^2-Q^2}{2R}\delta r
+\frac{ar}{R}\delta a+\frac{Qr}{R}\delta Q\\
&=\frac{r^2}{R}\delta M.
\end{aligned}
$$

二行目から三行目には $2Mr=R+Q^2$ を使いました。$1-\Omega_Ha=r^2/R$ と $\delta J=a\delta M+M\delta a$ より、最後の式は所望の第一法則と同値です。$r>0,R>0$ なので除算は正当です。
<!-- proof-end -->

この証明は具体的なKerr–Newman解族の状態関数の整合性を示したものです。一般の定常ブラックホールの任意の線形化摂動へ及ぶ平衡状態版の第一法則を、代表解だけから証明したわけではありません。地平線へ物質が流れ込むときの面積変分には、エネルギー・角運動量の流束とRaychaudhuri方程式が必要であり、BHT6で別に検討します。

## 7. 演習：面積・回転・電荷の独立方向

### Level A：定義と一段階の計算

<a id="ex-bht5-a01"></a>

#### BHT5-A01 Kerr地平線の五つの状態量

- Level: A

$M=5L,a=3L$、$L>0$ の非極限Kerr解で、$r_\pm,R_+,A,\Omega_H,\kappa,J$ を求めよ。

<!-- solution-start -->
**詳細解答。** $M^2-a^2=(25-9)L^2=16L^2$ なので、[地平線半径](../../GR/GR32/index.md#prop-gr32-horizon)から $r_\pm=(5\pm4)L$、つまり $r_+=9L,r_-=L$ です。$R_+=r_+^2+a^2=(81+9)L^2=90L^2$ を[本章の状態データ](#prop-bht5-kerr-data)へ代入し、

$$
A=4\pi(90L^2)=360\pi L^2,\quad
\Omega_H=\frac{3L}{90L^2}=\frac1{30L},
$$

$$
\kappa=\frac{9L-L}{2(90L^2)}=\frac2{45L}>0,\qquad
J=(5L)(3L)=15L^2.
$$

地平線が非極限であることは $r_+>r_-$ と $\kappa>0$ の両方から確認できます。
<!-- solution-end -->

<a id="ex-bht5-a02"></a>

#### BHT5-A02 零生成場の規格化を調べる

- Level: A

前問の解で $\chi=\partial_v+\Omega_H\partial_\psi$ を書け。[GR32の入射Kerr表示](../../GR/GR32/index.md#prop-gr32-horizon)において、地平線で $g(\chi,\partial_v)=g(\chi,\partial_\psi)=0$ と $g(\chi,\partial_r)=\Sigma_+/R_+$ を確認せよ。$0<\vartheta<\pi$ とする。

<!-- solution-start -->
**詳細解答。** $\Omega_H=1/(30L)$ なので $\chi=\partial_v+(1/(30L))\partial_\psi$ です。一般に $R_+=r_+^2+a^2$、$s=\sin\vartheta$ とすると、[入射Kerr表示](../../GR/GR32/index.md#prop-gr32-horizon)の地平線で

$$
g_{vv}=\frac{a^2s^2}{\Sigma_+},\quad
g_{v\psi}=-\frac{aR_+s^2}{\Sigma_+},\quad
g_{\psi\psi}=\frac{R_+^2s^2}{\Sigma_+},\quad
g_{vr}=1,\quad g_{r\psi}=-as^2.
$$

$\Omega_H=a/R_+$ を各内積へ代入すると

$$
\begin{aligned}
g(\chi,\partial_v)&=g_{vv}+\Omega_Hg_{v\psi}
=\frac{a^2s^2}{\Sigma_+}-\frac{a^2s^2}{\Sigma_+}=0,\\
g(\chi,\partial_\psi)&=g_{v\psi}+\Omega_Hg_{\psi\psi}
=-\frac{aR_+s^2}{\Sigma_+}+\frac{aR_+s^2}{\Sigma_+}=0,\\
g(\chi,\partial_r)&=1-\frac{a^2s^2}{R_+}
=\frac{R_+-a^2s^2}{R_+}=\frac{\Sigma_+}{R_+}.
\end{aligned}
$$

$g(\chi,\partial_\vartheta)=0$ でもあるので、$\chi^\flat=(\Sigma_+/R_+)dr$ は地平線の法線です。$\chi$ 自身は零ベクトルではなく、零ノルムの生成方向です。
<!-- solution-end -->

<a id="ex-bht5-a03"></a>

#### BHT5-A03 回転を零にする

- Level: A

$a=0$、$\delta a=0$ のSchwarzschild部分族で、$r_+,A,\kappa,\Omega_H,J$ を求め、[第一法則](#thm-bht5-kerr-first-law)を $M$ で直接検算せよ。

<!-- solution-start -->
**詳細解答。** $r_+=M+\sqrt{M^2}=2M$、$R_+=4M^2$ です。[状態データ](#prop-bht5-kerr-data)から

$$
A=16\pi M^2,\quad \kappa=\frac{2M}{2(4M^2)}=\frac1{4M},
\quad\Omega_H=0,\quad J=0.
$$

$\delta A=32\pi M\delta M$、$\delta J=0$ だから

$$
\frac{\kappa}{8\pi}\delta A+\Omega_H\delta J
=\frac{1}{4M}\frac{32\pi M}{8\pi}\delta M=\delta M.
$$

これは[BHT1のSchwarzschild変分](../BHT1/index.md#prop-bht1-variation-identity)と一致します。
<!-- solution-end -->

<a id="ex-bht5-a04"></a>

#### BHT5-A04 回転方向を反転する

- Level: A

$M=5L,a=-3L$ に変えたとき、$A,\kappa,\Omega_H,J$ を求めよ。$a=3L$ の場合と比べて何が反転するか。

<!-- solution-start -->
**詳細解答。** $a^2=9L^2$ は変わらないので $r_+=9L,r_-=L,R_+=90L^2$ です。[状態データ](#prop-bht5-kerr-data)から

$$
A=360\pi L^2,\quad \kappa=\frac2{45L},\quad
\Omega_H=-\frac1{30L},\quad J=-15L^2.
$$

$A,\kappa$ は符号反転に対して偶、$\Omega_H,J$ は奇です。単に $\Omega_H$ の符号を反転して $J$ を正のままにするのは、同じ解族のパラメータ変換を表しません。
<!-- solution-end -->

<a id="ex-bht5-a05"></a>

#### BHT5-A05 非極限解族の局所座標

- Level: A

$r>|a|$ で $M=(r^2+a^2)/(2r)$、$J=aM$ とする。$M_r,M_a$ と $\partial(M,J)/\partial(r,a)$ の行列式を計算し、なぜ二つの変数を独立に動かせるか述べよ。

<!-- solution-start -->
**詳細解答。** $M=r/2+a^2/(2r)$ と分けて微分します。

$$
M_r=\frac12-\frac{a^2}{2r^2}=\frac{r^2-a^2}{2r^2}>0,\qquad
M_a=\frac ar.
$$

積の微分法により $J_r=aM_r$、$J_a=M+aM_a$。従って

$$
\det\begin{pmatrix}M_r&M_a\\J_r&J_a\end{pmatrix}
=M_r(M+aM_a)-M_a(aM_r)=MM_r>0.
$$

$r>|a|$ で $M=(r^2+a^2)/(2r)>0$ なのでJacobianは非零です。さらに $a=J/M$、$r=M+\sqrt{M^2-(J/M)^2}$ が明示的な滑らかな逆変換です。従って $(r,a)$ は $(M,J)$ の局所座標として働き、$\delta r,\delta a$ の係数を別々に比較できます。
<!-- solution-end -->

### Level B：二方向・二表示を接続する

<a id="ex-bht5-b01"></a>

#### BHT5-B01 Kerrの第一法則を再導出する

- Level: B

$r>|a|$ とし、$M=(r^2+a^2)/(2r)$、$A=4\pi(r^2+a^2)$、$J=aM$、$\kappa=(r^2-a^2)/(2r(r^2+a^2))$、$\Omega_H=a/(r^2+a^2)$ を与える。$\delta M=\kappa\delta A/(8\pi)+\Omega_H\delta J$ を二つの独立方向で示せ。

<!-- solution-start -->
**詳細解答。** $R=r^2+a^2$ とおき、$M_r=(r^2-a^2)/(2r^2)$、$M_a=a/r$ を使います。$J=aM$ なので $\delta J=a\delta M+M\delta a$、また $\delta A=8\pi(r\delta r+a\delta a)$ です。右辺の $\delta M$ を含む項を移して

$$
(1-\Omega_Ha)\delta M
=\frac\kappa{8\pi}\delta A+\Omega_HM\delta a
$$

を比較します。左辺は $1-\Omega_Ha=r^2/R$ より

$$
\frac{r^2}{R}\delta M
=\frac{r^2-a^2}{2R}\delta r+\frac{ar}{R}\delta a.
$$

右辺は

$$
\begin{aligned}
\frac{r^2-a^2}{2rR}(r\delta r+a\delta a)
+\frac{aM}{R}\delta a
&=\frac{r^2-a^2}{2R}\delta r
+\frac aR\left(\frac{r^2-a^2}{2r}+\frac R{2r}\right)\delta a\\
&=\frac{r^2-a^2}{2R}\delta r+\frac{ar}{R}\delta a.
\end{aligned}
$$

独立な $\delta r,\delta a$ の係数が等しいので成立します。$r>|a|$ は非極限の外側根を使う条件です。
<!-- solution-end -->

<a id="ex-bht5-b02"></a>

#### BHT5-B02 質量公式の偏微分

- Level: B

$A>0,\ |J|<A/(8\pi)$ で $M=\sqrt{A/(16\pi)+4\pi J^2/A}$ とする。$\partial_JM|_A$ と $\partial_AM|_J$ を計算し、$A=8\pi Mr,\ J=Ma$ を用いてKerrの $\Omega_H,\kappa$ に一致することを示せ。

<!-- solution-start -->
**詳細解答。** まず $M>0$ なので $M^2$ の微分から

$$
\left(\frac{\partial M}{\partial J}\right)_A
=\frac{1}{2M}\frac{8\pi J}{A}
=\frac{4\pi Ma}{M(8\pi Mr)}=\frac a{2Mr}
=\frac a{r^2+a^2}=\Omega_H.
$$

次に $J$ を固定すると

$$
\begin{aligned}
8\pi\left(\frac{\partial M}{\partial A}\right)_J
&=\frac{8\pi}{2M}\left(\frac1{16\pi}-\frac{4\pi J^2}{A^2}\right)\\
&=\frac1{4M}\left(1-\frac{64\pi^2J^2}{A^2}\right)
=\frac1{4M}\left(1-\frac{a^2}{r^2}\right)\\
&=\frac{r^2-a^2}{2r(r^2+a^2)}=\kappa.
\end{aligned}
$$

$8\pi J/A=a/r$ と $2Mr=r^2+a^2$ が二回の表示変換の根拠です。
<!-- solution-end -->

<a id="ex-bht5-b03"></a>

#### BHT5-B03 固定面積の回転仕事

- Level: B

$M=5L,a=3L,r_+=9L$ のKerr解で、定常解族の接方向に $\delta A=0$ を課す。$\delta r_+$ と $\delta a$ の関係を求め、$\delta M,\delta J$ を $\delta a$ で表し、$\delta M=\Omega_H\delta J$ を検算せよ。

<!-- solution-start -->
**詳細解答。** [面積式](#prop-bht5-kerr-data)を微分すると $\delta A=8\pi(r\delta r+a\delta a)$ です。$r=9L,a=3L$ で $\delta A=0$ なら

$$
9L\,\delta r+3L\,\delta a=0
\quad\Longrightarrow\quad \delta r=-\frac13\delta a.
$$

この点では $M_r=4/9$、$M_a=1/3$ なので

$$
\delta M=\frac49\left(-\frac13\delta a\right)+\frac13\delta a
=\frac5{27}\delta a.
$$

$J=aM$ から

$$
\delta J=a\delta M+M\delta a
=3L\frac5{27}\delta a+5L\delta a
=\frac{50L}{9}\delta a.
$$

$\Omega_H=1/(30L)$ を掛ければ $\Omega_H\delta J=(1/(30L))(50L/9)\delta a=5\delta a/27=\delta M$。固定面積でも回転仕事は一般に消えません。
<!-- solution-end -->

<a id="ex-bht5-b04"></a>

#### BHT5-B04 Kerr–Newmanの電荷方向

- Level: B

非極限Kerr–Newman解族の外側根 $r>|a|,\ r^2>a^2+Q^2$ で $M=(r^2+a^2+Q^2)/(2r)$、$A=4\pi(r^2+a^2)$、$J=aM$ とする。$r,a$ を固定して $Q$ だけを動かすとき、$\delta M=\Omega_H\delta J+\Phi_H\delta Q$ が成り立つことを示せ。$\Omega_H=a/(r^2+a^2),\Phi_H=Qr/(r^2+a^2)$ を使え。

<!-- solution-start -->
**詳細解答。** $\delta r=\delta a=0$ なので $\delta A=0$ です。$M$ の $Q$ 偏微分は

$$
\left(\frac{\partial M}{\partial Q}\right)_{r,a}
=\frac{2Q}{2r}=\frac Qr,\qquad \delta M=\frac Qr\,\delta Q.
$$

$J=aM$ で $a$ は固定だから $\delta J=a\delta M=aQ\delta Q/r$。すると

$$
\begin{aligned}
\Omega_H\delta J+\Phi_H\delta Q
&=\frac a{r^2+a^2}\frac{aQ}{r}\delta Q
+\frac{Qr}{r^2+a^2}\delta Q\\
&=\frac{Q(a^2+r^2)}{r(r^2+a^2)}\delta Q
=\frac Qr\delta Q=\delta M.
\end{aligned}
$$

この方向では角運動量 $J$ も変化します。$\delta a=0$ と $\delta J=0$ を取り違えると電荷仕事の一部を見落とします。
<!-- solution-end -->

### Level C：定常解族の複数方向と法則の境界

<a id="ex-bht5-c01"></a>

#### BHT5-C01 独立変分・極限・物理過程の区別

- Level: C

$M=5L,a=3L$ の非極限Kerr解で $r_+=9L$、$L>0$ とする。定常解族の接方向を $\delta r_+=xL,\ \delta a=yL$（$x,y$ は十分小さい実数）とする。

1. $\delta M,\delta J,\delta A$ を $x,y$ で表せ。
2. $\kappa\delta A/(8\pi)$ と $\Omega_H\delta J$ を独立に計算し、和が $\delta M$ となるか確かめよ。
3. $x=0,y>0$ の方向で、面積項と回転仕事項の符号を示せ。$M$ を固定したKerr族で回転を強めたとき面積が減っても、古典面積定理への反例ではない理由を述べよ。
4. $M>0$ を固定して $a=M-\varepsilon$、$\varepsilon\downarrow0$ とする。$\kappa$ と $(\partial r_+/\partial a)_M$ の主要な振る舞いを求め、極限点で本講の開領域の証明をそのまま適用できるか判定せよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $r=9L,a=3L$ では $M_r=4/9$、$M_a=1/3$ です。従って

$$
\delta M=\left(\frac49x+\frac13y\right)L.
$$

$J=aM$ と $A=4\pi(r^2+a^2)$ の微分から

$$
\begin{aligned}
\delta J&=a\delta M+M\delta a
=3L\left(\frac49x+\frac13y\right)L+5LyL
=\left(\frac43x+6y\right)L^2,\\
\delta A&=8\pi(9L\cdot xL+3L\cdot yL)
=(72\pi x+24\pi y)L^2.
\end{aligned}
$$

**（2）** [Kerr地平線のデータ](#prop-bht5-kerr-data)から $\kappa=2/(45L)$、$\Omega_H=1/(30L)$ です。各項を別々に代入すると

$$
\frac\kappa{8\pi}\delta A
=\frac{2}{45L}(9x+3y)L^2
=\left(\frac25x+\frac2{15}y\right)L,
$$

$$
\Omega_H\delta J
=\frac1{30L}\left(\frac43x+6y\right)L^2
=\left(\frac2{45}x+\frac15y\right)L.
$$

和の係数は $x$ について $2/5+2/45=4/9$、$y$ について $2/15+1/5=1/3$ であり、（1）の $\delta M$ と一致します。

**（3）** $x=0,y>0$ では $\delta A=24\pi yL^2>0$、従って面積項は $2yL/15>0$、回転項は $yL/5>0$ です。一方、$M$ 固定で $a>0$ を増やす別の方向では $r_+=M+\sqrt{M^2-a^2}$ の微分から $\delta r_+=-(a/\sqrt{M^2-a^2})\delta a<0$ です。$A=8\pi Mr_+$ だから $\delta A<0$。これは異なる定常時空の接方向で、[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)が要求する一つの未来時空・エネルギー条件・大域的条件を確認した流入過程ではありません。

**（4）** $a=M-\varepsilon$ を代入すると

$$
s^2=M^2-a^2=2M\varepsilon-\varepsilon^2,\qquad
s\sim\sqrt{2M\varepsilon},\quad r_+=M+s\to M.
$$

$R_+=2Mr_+\to2M^2$ なので

$$
\kappa=\frac{s}{R_+}\sim\frac{\sqrt{2M\varepsilon}}{2M^2}\to0,
\qquad
\left(\frac{\partial r_+}{\partial a}\right)_M
=-\frac{M-\varepsilon}{\sqrt{2M\varepsilon-\varepsilon^2}}
\sim-\sqrt{\frac M{2\varepsilon}}\to-\infty.
$$

極限点 $|a|=M$ は開領域 $|a|<M$ の境界です。分母 $s$ を含む偏微分が発散するので、$\kappa=0$ を途中へ代入し積を零とみなすことはできません。非極限の恒等式を各内点で用いてから必要な極限を評価するのが正しい順序です。
<!-- solution-end -->

## 8. 次の講義へ

Kerrの回転仕事 $\Omega_H\delta J$ と、帯電したKerr–Newmanでの $\Phi_H\delta Q$ が、正しく規格化した定常解族の全微分として現れました。**どの二つの定常解を比較するか**という問いにはこれで答えられます。

次のBHT6では、**実際に地平線へ物質が落ちるとき**何が変化するかを調べます。地平線上のエネルギー・角運動量の流束と線形化Raychaudhuri方程式を使い、定常状態間の代数的恒等式とは別の仮定で物理過程版の第一法則を導きます。
