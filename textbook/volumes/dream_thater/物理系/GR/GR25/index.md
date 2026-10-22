# GR25 Schwarzschild地平線と曲率特異性

<!-- definition-example-audit: strict -->

[GR16のSchwarzschild真空解](../GR16/index.md#thm-gr16-schwarzschild)は、質量が正のとき半径 $r=r_s$ で静的対角表示の係数が発散しました。しかし、この「表示の失敗」と時空自体がそこで終わることは別の主張です。GR I で用いた静止時計は地平線に近づくほど維持しにくくなります。それでも自由落下する物体にとって同じ場所が幾何学的な終点とは限りません。

そこで、まず曲率を**座標に依存しない一つの数**へまとめて検算し、次に新しい座標を実際に構成して、曲率が有限であるだけでは分からない延長可能性を調べます。目標は、$r=r_s$ と $r=0$ を同じ「発散」という言葉で片付けないことです。

全章で滑らかな4次元Lorentz計量、符号 $(-,+,+,+)$、$x^0=ct$（長さの単位）を使います。$G>0$ はNewton定数、$c>0$ は光速、$M>0$ はSchwarzschild質量です。曲率は[GR6の曲率成分規約](../GR6/index.md#prop-gr6-coordinate-curvature)、すなわち $R^\rho{}_{\sigma\mu\nu}=\partial_\mu\Gamma^\rho_{\nu\sigma}-\partial_\nu\Gamma^\rho_{\mu\sigma}+\Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma}-\Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}$ に従います。宇宙定数は零、球面角度は局所的に $0<\theta<\pi$ とします。

## 1. 係数の発散で何が分かるか

[Schwarzschild半径の定義](../GR16/index.md#def-gr16-schwarzschild-radius)に従い、以下の正の長さと無次元関数を使います。

$$
r_s:=\frac{2GM}{c^2}>0,\qquad f(r):=1-\frac{r_s}{r}.
$$

[GR16の計量](../GR16/index.md#thm-gr16-schwarzschild)は、静的外部 $r>r_s$ で

$$
ds^2=-f(r)(dx^0)^2+\frac{dr^2}{f(r)}
+r^2(d\theta^2+\sin^2\theta\,d\phi^2)
$$

です。$r$ は球面積 $4\pi r^2$ で特徴付けられる面積半径で、単なる任意の直線座標ではありません。

無次元量 $x:=r/r_s$ を使うと、外部から $x\downarrow1$ とする際、$f=1-1/x\to0$、$g_{00}=-f\to0$、$g_{rr}=1/f\to+\infty$ です。[GR16の静的座標の適用域](../GR16/index.md#prop-gr16-static-domain)が尽きることまでは分かりますが、まだ曲率テンソルを調べていません。

実際、GR24の[静的二次元ブロックの接続と曲率の検算](../GR24/index.md#prop-gr24-static-diagnostic)から $r>r_s$ の時間・半径成分は

$$
R_{r0r0}=\frac{f''(r)}2=-\frac{r_s}{r^3}
$$

と有限値に近づきます。ただし一成分の有限性だけで曲率全体は判定できません。時間・半径以外の全方向も確認する必要があります。

## 2. 曲率を座標に依存しない量として計算する

前章までの[曲率テンソルとRicci縮約](../GR6/index.md#def-gr6-ricci-scalar)では、添字を逆計量で縮約しました。同じ操作を曲率テンソル二つに行えば、座標によらないスカラーが得られます。まずこの完全縮約に名前を付けます。

<a id="def-gr25-kretschmann"></a>

<!-- formal-statement-start -->
> **定義（Kretschmann不変量）**  
> $C^2$ の4次元Lorentz計量 $g$ のRiemann曲率テンソルを $R_{\alpha\beta\gamma\delta}$ とし、逆計量で四つの添字をすべて上げたものを $R^{\alpha\beta\gamma\delta}$ とする。このとき、同じ点での完全縮約

$$
\boxed{\mathcal K:=R_{\alpha\beta\gamma\delta}
R^{\alpha\beta\gamma\delta}}
$$

> をKretschmann不変量という。値は座標変換で変わらない。曲率が長さの逆二乗の次元を持つ規約では、$\mathcal K$ は長さの逆四乗の次元を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr25-kretschmann -->
**定義の確認**。最も簡単な例として、直交座標 $(x^0,x,y,z)$ のMinkowski計量 $g=\operatorname{diag}(-1,1,1,1)$ を選びます。この計量は滑らかで、行列式が $-1$ だから非退化です。全計量成分が定数なので $\partial_\lambda g_{\mu\nu}=0$、Levi-Civita接続の全係数は零です。[GR6の曲率四項公式](../GR6/index.md#prop-gr6-coordinate-curvature)の微分項も接続の積も零となり、$R_{\alpha\beta\gamma\delta}=0$。逆計量による四回の添字上げでも零のままで、定義どおり $\mathcal K=0$ です。非平坦な例では後に四つの添字を実際に縮約し、この「零になるだけの例」と区別します。
<!-- definition-example-end -->

この式で添字を上げるのは、各添字に逆行列 $g^{\mu\nu}$ を一回ずつ掛ける操作です。例えば四つの添字を一度に書けば

$$
R^{\alpha\beta\gamma\delta}
=g^{\alpha\mu}g^{\beta\nu}g^{\gamma\rho}g^{\delta\sigma}
R_{\mu\nu\rho\sigma}.
$$

逆計量も曲率もテンソルなので、座標変換行列とその逆が縮約で打ち消し合い、$\mathcal K$ は同じ幾何学的な点で不変になります。Lorentz符号のため、任意の時空で $\mathcal K\ge0$ になるとは一般に断定しません。今回のSchwarzschild模型では独立成分を確かめ、非負の式になることまで導きます。

### 計算の橋渡し：座標基底から正規直交枠へ

座標成分をそのまま二乗すると $g^{00}$ の負符号と $g^{rr}$ の係数を失いやすくなります。外部 $f>0$ では、座標基底を計量のノルムが $(-1,1,1,1)$ になるように規格化します。これは[GR4の局所直交枠](../GR4/index.md#def-gr4-observer-frame)と同じ操作です。

$$
\begin{aligned}
e_{\hat0}&=f^{-1/2}\partial_0,&
e_{\hat1}&=f^{1/2}\partial_r,\\
e_{\hat2}&=r^{-1}\partial_\theta,&
e_{\hat3}&=(r\sin\theta)^{-1}\partial_\phi.
\end{aligned}
$$

例えば $g(e_{\hat0},e_{\hat0})=f^{-1}(-f)=-1$、$g(e_{\hat1},e_{\hat1})=f(1/f)=1$ です。球面二方向もそれぞれノルム1で、対角計量なので相互直交します。したがってこの基底での $g^{\hat a\hat b}$ は対角行列 $\operatorname{diag}(-1,1,1,1)$ となります。これは外部での**計算用の枠**であり、$f=0$ で枠の個々のベクトルをそのまま延長できるという主張ではありません。

<a id="thm-gr25-kretschmann-schwarzschild"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschild真空のKretschmann不変量）**  
> $M>0$、$r_s=2GM/c^2$、$r>r_s$ とする。$(-,+,+,+)$ および本章冒頭のRiemann曲率符号規約を採用したSchwarzschild真空計量に対して、正規直交枠での独立な非零曲率成分は、四添字の反対称性と対交換を除いて

$$
\begin{aligned}
R_{\hat0\hat1\hat0\hat1}&=-\frac{r_s}{r^3},&
R_{\hat0\hat2\hat0\hat2}&=R_{\hat0\hat3\hat0\hat3}=\frac{r_s}{2r^3},\\
R_{\hat1\hat2\hat1\hat2}&=R_{\hat1\hat3\hat1\hat3}=-\frac{r_s}{2r^3},&
R_{\hat2\hat3\hat2\hat3}&=\frac{r_s}{r^3}.
\end{aligned}
$$

> よってKretschmann不変量は

$$
\boxed{\mathcal K(r)=\frac{12r_s^2}{r^6}
=\frac{48G^2M^2}{c^4r^6}.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

計量の逆行列から接続を作り、時間・半径、時間・角度、半径・角度、角度どうしの四種類の曲率を計算します。規格化した枠では逆計量の係数が $\pm1$ だけになり、各独立成分が縮約に何回現れるかを数えられます。

<!-- proof-start -->
### 証明

座標順を $(0,r,\theta,\phi)$ とし、$r>r_s$ と $0<\theta<\pi$ で作業します。逆計量は

$$
(g^{\mu\nu})=\operatorname{diag}
\left(-\frac1f,f,\frac1{r^2},\frac1{r^2\sin^2\theta}\right).
$$

[GR15の接続係数](../GR15/index.md#prop-gr15-static-christoffels)へ $e^{2\Phi}=f$ と $e^{2\Lambda_r}=f^{-1}$ を入れると、独立な非零係数は

$$
\begin{aligned}
\Gamma^0_{0r}&=\frac{f'}{2f},&
\Gamma^r_{00}&=\frac{ff'}2,&
\Gamma^r_{rr}&=-\frac{f'}{2f},\\
\Gamma^r_{\theta\theta}&=-rf,&
\Gamma^r_{\phi\phi}&=-rf\sin^2\theta,&
\Gamma^\theta_{r\theta}&=\Gamma^\phi_{r\phi}=\frac1r,\\
\Gamma^\theta_{\phi\phi}&=-\sin\theta\cos\theta,&
\Gamma^\phi_{\theta\phi}&=\cot\theta.
\end{aligned}
$$

下の二添字の対称な順列も同じ値です。[GR6の四項公式](../GR6/index.md#prop-gr6-coordinate-curvature)を順に代入します。時間・半径成分は、例えば

$$
\begin{aligned}
R^r{}_{0r0}
&=\partial_r\Gamma^r_{00}
+\Gamma^r_{rr}\Gamma^r_{00}
-\Gamma^r_{00}\Gamma^0_{r0}\\
&=\frac{(f')^2+ff''}{2}
-\frac{(f')^2}4-\frac{(f')^2}4
=\frac{ff''}2,\\
R_{r0r0}&=g_{rr}R^r{}_{0r0}=\frac{f''}2.
\end{aligned}
$$

時間・角度方向は $\Gamma^0_{\theta\theta}=0$ を使い、

$$
\begin{aligned}
R^0{}_{\theta0\theta}
&=\Gamma^0_{0r}\Gamma^r_{\theta\theta}
=\frac{f'}{2f}(-rf)=-\frac{rf'}2,\\
R_{0\theta0\theta}&=g_{00}R^0{}_{\theta0\theta}=\frac{frf'}2.
\end{aligned}
$$

半径・角度方向では

$$
\begin{aligned}
R^r{}_{\theta r\theta}
&=\partial_r(-rf)
+\Gamma^r_{rr}\Gamma^r_{\theta\theta}
-\Gamma^r_{\theta\theta}\Gamma^\theta_{r\theta}\\
&=(-f-rf')+\frac{rf'}2+f=-\frac{rf'}2,\\
R_{r\theta r\theta}&=-\frac{rf'}{2f}.
\end{aligned}
$$

球面二方向については[GR16の角度方向曲率の命題](../GR16/index.md#prop-gr16-angular-curvature)で四項を展開済みなので、そこでの仮定 $f>0$ と曲率規約が一致することを確認して

$$
R_{\theta\phi\theta\phi}=r^2(1-f)\sin^2\theta
$$

を使います。$\phi$ を含む他の同型成分は上の角度成分に $\sin^2\theta$ を掛けた形となり、対称性と対角・球対称性から異なる添字の組を混ぜる成分は零です。実際、たとえば $R^0{}_{r\theta\phi}$ の四項は各項に零の混合接続を含み零になります。

曲率テンソルの各添字へ前節の $e_{\hat a}$ を代入します。具体的に

$$
\begin{aligned}
R_{\hat0\hat1\hat0\hat1}&=(f^{-1/2}f^{1/2})^2R_{0r0r}=\frac{f''}2,\\
R_{\hat0\hat2\hat0\hat2}&=\frac1{fr^2}\frac{frf'}2=\frac{f'}{2r},\\
R_{\hat1\hat2\hat1\hat2}&=\frac f{r^2}\left(-\frac{rf'}{2f}\right)=-\frac{f'}{2r},\\
R_{\hat2\hat3\hat2\hat3}&=\frac{r^2(1-f)\sin^2\theta}{r^4\sin^2\theta}
=\frac{1-f}{r^2}.
\end{aligned}
$$

$f'=r_s/r^2$ と $f''=-2r_s/r^3$ を代入すれば表示した六つの独立成分を得ます。最後に完全縮約を行います。一つの独立成分 $R_{\hat a\hat b\hat a\hat b}$ には添字対内の入替え2通りずつ、対の交換による重複を含め計4項があります。この六種類はそれぞれ時間添字を0個または2個含むため、今回の縮約での逆計量の符号はすべて正です。そこで

$$
\begin{aligned}
\mathcal K
&=4\left[\left(\frac{f''}2\right)^2
+2\left(\frac{f'}{2r}\right)^2
+2\left(-\frac{f'}{2r}\right)^2
+\left(\frac{1-f}{r^2}\right)^2\right]\\
&=(f'')^2+\frac{4(f')^2}{r^2}+\frac{4(1-f)^2}{r^4}\\
&=\frac{4r_s^2}{r^6}+\frac{4r_s^2}{r^6}
+\frac{4r_s^2}{r^6}=\frac{12r_s^2}{r^6}.
\end{aligned}
$$

$r_s=2GM/c^2$ を代入して質量表示も得ます。$\square$
<!-- proof-end -->

### 直接例：無次元半径で確かめる

定理の仮定 $M>0,r>r_s$ を満たす $r=2r_s$ を選びます。このとき $x=2$、$f=1/2>0$、球面上の二方向は正のノルムを持つので外部の正規直交枠が使えます。Kretschmann不変量を無次元化すると

$$
\mathcal K r_s^4=\frac{12}{x^6},\qquad
\left.\mathcal K r_s^4\right|_{x=2}=\frac{3}{16}.
$$

半径を半分にしたとき曲率不変量が $2^6=64$ 倍になるのは $r^{-6}$ という形から分かります。単なる $g_{rr}$ の大きさと混同してはいけません。

## 3. $r=r_s$ と $r=0$ の曲率を区別する

曲率不変量が有限なら、少なくともその不変量は発散していません。一方、どれか一つの曲率不変量が発散すれば、正則な座標変換で有限に直すことはできません。この非対称性を押さえます。

<a id="def-gr25-curvature-blowup"></a>

<!-- formal-statement-start -->
> **定義（曲率不変量による発散判定）**  
> $C^2$ Lorentz時空の点列または曲線が、時空の境界候補へ近づく状況を考える。その上でRiemann曲率から計量によって完全縮約したスカラーの絶対値が無限大へ発散するとき、その境界候補で**曲率不変量の発散**があるという。これは滑らかな座標表示の取り直しで除去できず、当該の経路に沿う有限曲率の $C^2$ 計量への延長を妨げる。一方、特定の不変量が有限であることだけでは延長の存在も、すべての特異性の不存在も保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr25-curvature-blowup -->
**定義の確認**。[本章のKretschmann公式](#thm-gr25-kretschmann-schwarzschild)で質量を正に固定し、外部から地平線候補に近づくと、

$$
\lim_{r\downarrow r_s}\mathcal K(r)=\frac{12}{r_s^4}<\infty.
$$

従って、この境界候補では**このスカラーによる発散条件は不成立**です。一方、次節の正則表示と内側でも成り立つ同じ曲率式を確認した後、中心へ近づくと、

$$
\lim_{r\downarrow0}|\mathcal K(r)|
=\lim_{r\downarrow0}\frac{12r_s^2}{r^6}=+\infty.
$$

分子は正の一定値、分母は正から零へ向かいます。したがって定義の「完全縮約されたスカラー」「境界への曲線」「絶対値の発散」を確かめました。境界点自体の曲率値を計算したのではありません。
<!-- definition-example-end -->

定義をこの時空へ適用するには、境界候補までの極限で $\mathcal K$ を評価します。ただし $r=0$ は球面積が零となる端であり、元の外部座標の点そのものではありません。$r\to0$ の検査には、次節で $0<r<r_s$ へ計量を正則に延長した後の領域を含めて解釈します。

<a id="prop-gr25-curvature-limits"></a>

<!-- formal-statement-start -->
> **命題（地平線候補で有限、中心で発散する曲率）**  
> $M>0$ のSchwarzschild真空外部について、$\mathcal K=12r_s^2/r^6$ は $r\downarrow r_s$ で有限極限

$$
\lim_{r\downarrow r_s}\mathcal K(r)=\frac{12}{r_s^4}
$$

> を持つ。次節の正則延長上では同じ式が $0<r<r_s$ でも成立し、$r\downarrow0$ に沿って $\mathcal K(r)\to+\infty$ となる。したがって $r=0$ は曲率発散による $C^2$ 延長の障害であるが、$r=r_s$ についてはこの不変量だけでは正則延長を証明できない。
<!-- formal-statement-end -->

### 証明の見取り図

半径を無次元化した $\mathcal K r_s^4=12x^{-6}$ を評価します。地平線候補での有限性を越えた結論には、次節の計量行列の正則性が別に必要です。

<!-- proof-start -->
### 証明

$r_s>0$ だから $x=r/r_s>0$ です。[本章のKretschmann公式](#thm-gr25-kretschmann-schwarzschild)を代入すると

$$
\mathcal K=\frac{12}{r_s^4x^6}.
$$

$x\downarrow1$ の極限は $12/r_s^4$ です。

次節で構成する横断計量とその逆行列は、角度を固定すると正の半径で有理式の成分を持ちます。接続・Riemann曲率・完全縮約は微分と有理演算で作るので、その不変量も半径の有理式です。外部では既に

$$
\mathcal K(r)=\frac{12r_s^2}{r^6}
$$

に一致します。二つの有理式の差が外部の無限個の半径で零になるため、差の分子多項式は恒等的に零です。したがって、横断計量が非退化で分母が消えない正の半径の内側でも同じ式です。$x\downarrow0$ の極限は正の無限大になります。

仮に $r\to0$ の曲線の終端が $C^2$ Lorentz計量を持つ正則な内部点として付け加えられるなら、その点の近傍では曲率と逆計量が連続であり、$\mathcal K$ も有限の値へ収束するはずです。発散と矛盾します。$\square$
<!-- proof-end -->

曲率不変量が発散するという意味で $r=0$ は曲率特異性です。一方、$\mathcal K$ が有限という条件は、座標系を取り替えても全部の係数が有限になることを**単独では意味しません**。次の計算が決定的です。

## 4. 地平線を横切る正則な計量表示

外部 $r>r_s$ では、$r$ だけの関数 $r_*(r)$ を $dr_*/dr=1/f(r)$ で導入できます。積分定数を零に選べば

$$
r_*(r)=r+r_s\log\left(\frac r{r_s}-1\right),
\qquad\frac{dr_*}{dr}=1+\frac{r_s}{r-r_s}=\frac1f.
$$

ここで新しい長さ次元の時間座標 $v:=x^0+r_*(r)$ を考えます。外部では $dv=dx^0+dr/f$ なので、$dx^0=dv-dr/f$ を計量へ代入できます。これは入射方向に適した座標の最初の構成であり、光線や大域領域はGR26以降で詳しく調べます。

<a id="prop-gr25-regular-horizon-chart"></a>

<!-- formal-statement-start -->
> **命題（正則な地平線横断表示と零超曲面）**  
> $M>0$ とし、Schwarzschild真空外部 $r>r_s$ から座標 $v=x^0+r_*(r)$ を導入する。この外部では計量は

$$
\boxed{ds^2=-f(r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,
\qquad f(r)=1-\frac{r_s}{r}}
$$

> である。右辺を $v\in\mathbb R$, $r>0$ と局所的な球面座標へ拡張すると、$r=r_s$ を含む滑らかな非退化Lorentz計量が得られる。さらに、この正則な表示で $r=r_s$ は法共ベクトル $dr$ のノルムが零である**零超曲面**であり、時間並進Killing場 $\partial_v$ もそこで零ノルムになる。
<!-- formal-statement-end -->

### 証明の見取り図

変換は外部に限って行い、得られた計量の式自体を内側へ拡張します。鍵は $1/f$ が消えて時間・半径の $2\times2$ 行列式が $-1$ に保たれることと、超曲面の法のノルムを**逆計量**で計算することです。

<!-- proof-start -->
### 証明

まず $r>r_s$ で $v=x^0+r_*$ を定義し、$dx^0=dv-dr/f$ を[GR16の計量](../GR16/index.md#thm-gr16-schwarzschild)に代入します。

$$
\begin{aligned}
-f(dx^0)^2+f^{-1}dr^2
&=-f\left(dv-\frac{dr}f\right)^2+\frac{dr^2}f\\
&=-f\,dv^2+2\,dv\,dr-\frac{dr^2}f+\frac{dr^2}f\\
&=-f\,dv^2+2\,dv\,dr.
\end{aligned}
$$

新しい座標での時間・半径の計量行列と逆行列は

$$
(g_{ab})_{(v,r)}=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad
(g^{ab})_{(v,r)}=\begin{pmatrix}0&1\\1&f\end{pmatrix}.
$$

積を取れば対角成分が $1$、非対角成分が $0$ になることから逆行列を検算できます。両行列の行列式はそれぞれ $-1$ です。$r>0$ では $f=1-r_s/r$ と球面計量の係数は滑らかであり、$r=r_s$ でも $2\times2$ ブロックは非退化です。行列式が負なのでこのブロックは一つの時間方向と一つの空間方向を持ち、球面側の正の二方向と併せてLorentz符号を保ちます。

$r=r_s$ は正則座標で $r$ 一定の3次元超曲面です。その法共ベクトルは $n_a=\partial_a r$ で、逆計量から

$$
g^{ab}n_an_b=g^{rr}=f(r_s)=0.
$$

法が零ノルムなのでこの超曲面は零超曲面です。また[GR14のKilling方程式の座標表示](../GR14/index.md#prop-gr14-killing-coordinate-test)を $\xi=\partial_v$ に適用すると、計量係数は $v$ に依存せず、$\partial_v$ の座標成分は定数なので $\mathcal L_\xi g=0$ です。このKilling場のノルムは $g_{vv}=-f$。従って $r=r_s$ で $g(\partial_v,\partial_v)=0$ です。$\square$
<!-- proof-end -->

### 直接例：$r_s$ の内外を一つの計量で読む

同じ正則表示を、$r=2r_s$, $r=r_s$, $r=r_s/2$ で比べます。いずれも $r>0$ であり、球面計量の係数も有限です。

| 半径 | $f$ | $g_{vv}=-f$ | $g^{rr}=f$ | $r=\mathrm{const}$ 面の法 |
| --- | ---: | ---: | ---: | --- |
| $2r_s$ | $1/2$ | $-1/2$ | $1/2$ | 空間的 |
| $r_s$ | $0$ | $0$ | $0$ | 光的 |
| $r_s/2$ | $-1$ | $1$ | $-1$ | 時間的 |

法が空間的なら面そのものは時間的、法が時間的なら面そのものは空間的です。したがって内側では $r$ 一定の面が空間的となり、静止したままという外部の直感をそのまま使えません。特に、$r=r_s$ 上で $g_{vv}=0$ でも計量全体は非退化です。成分一個が零になることと計量の行列式が零になることは違います。

注意したいのは、$r_*$ の対数は $r\downarrow r_s$ で発散することです。外部の古い $(x^0,r)$ から新しい $(v,r)$ への座標変換が境界で正則である、と言っているわけではありません。**外部では同じ計量**を表し、新しい計量係数が境界を横切って滑らかな延長を定める、という順序です。この局所延長は、全時空の大域的な事象の地平線を同定したこととは区別します。

## 5. 自由落下者と静止観測者の違い

地平線に近づくと[GR24で計算した静止観測者の固有加速度](../GR24/index.md#prop-gr24-static-diagnostic)は $GM/(r^2\sqrt f)$ と発散します。しかし、その観測者は地平線上で静止し続けるための世界線を持ちません。自由落下がそこで止まることは意味しません。

例として、無限遠で静止する極限を初期条件とする入射の動径時間的測地線を考えます。[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)と[GR24の動径自由落下の演習](../GR24/index.md#ex-gr24-b01)を組み合わせ、単位質量当たりの無次元保存量を $e=f\,dt/d\tau=1$ とします。固有時 $\tau$ を秒で測ると、外部で

$$
-c^2=-fc^2\left(\frac{dt}{d\tau}\right)^2
+\frac1f\left(\frac{dr}{d\tau}\right)^2
$$

です。$dt/d\tau=1/f$ を代入し、入射の負符号を選べば

$$
\left(\frac{dr}{d\tau}\right)^2
=c^2(1-f)=\frac{c^2r_s}{r},\qquad
\frac{dr}{d\tau}=-c\sqrt{\frac{r_s}{r}}.
$$

外部の $t$ については $dt/d\tau=1/f\to+\infty$ ですが、半径 $r_0>r_s$ から $r_s$ までの固有時は

$$
\begin{aligned}
\tau_s-\tau_0
&=\int_{r_s}^{r_0}\frac{dr}{c\sqrt{r_s/r}}
=\frac1{c\sqrt{r_s}}\left[\frac23r^{3/2}\right]_{r_s}^{r_0}\\
&=\frac{2}{3c\sqrt{r_s}}\left(r_0^{3/2}-r_s^{3/2}\right)<\infty.
\end{aligned}
$$

正則な $v$ 座標で同じ曲線を見ると

$$
\begin{aligned}
\frac{dv}{d\tau}
&=\frac{dx^0}{d\tau}+\frac1f\frac{dr}{d\tau}
=\frac c{f}\left(1-\sqrt{\frac{r_s}{r}}\right)\\
&=\frac{c}{1+\sqrt{r_s/r}}
\longrightarrow\frac c2.
\end{aligned}
$$

最後の等号では $f=1-r_s/r=(1-\sqrt{r_s/r})(1+\sqrt{r_s/r})$ を使いました。$dv/d\tau$ と $dr/d\tau$ は地平線で有限です。よって外部の静的時刻の発散は、入射自由落下者の固有時の発散ではありません。

## 6. どこまで言えたか

| 対象 | 直接確認できたこと | それだけでは主張できないこと |
| --- | --- | --- |
| $r=r_s$ | $\mathcal K=12/r_s^4$ が有限、正則な横断計量があり零超曲面 | 有限な不変量だけから延長の存在、また局所計算だけから大域的事象の地平線の定義 |
| $r=0$ | $\mathcal K\to\infty$ によって $C^2$ 計量への正則延長が妨げられる | すべての特異性を一つの不変量で検出できるという一般論 |

この区別は[因果曲線の定義](../../../幾何系/LORG/LORG3/index.md#def-lorg3-causal-curve)とともに、後で「どの光が無限遠まで届くか」を問うための準備になります。GR26では入射光線に沿う座標の意味、GR27では領域の解析延長、GR29では地平線の複数の定義をそれぞれ扱います。

## 7. 演習：係数、不変量、延長を別々に検査する

### Level A：一つの判定を正確に行う

<a id="ex-gr25-a01"></a>
#### GR25-A01 半径比と係数
- Level: A

$M>0$ のSchwarzschild外部で $x=r/r_s=3$ とする。$f$、$g_{00}$、$g_{rr}$ を求め、対角静的表示の成立条件を確認せよ。

<!-- solution-start -->
**詳細解答。** $r_s>0$ で $x=3>1$ だから外部 $r>r_s$ です。[Schwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)へ代入すると

$$
f=1-\frac13=\frac23>0,
\qquad g_{00}=-\frac23<0,
\qquad g_{rr}=\frac1{2/3}=\frac32>0.
$$

時間方向が時間的、半径方向が空間的で、両係数は有限です。
<!-- solution-end -->

<a id="ex-gr25-a02"></a>
#### GR25-A02 曲率不変量の次元
- Level: A

$r_s$、$r$ を長さとし、$\mathcal K=12r_s^2/r^6$ の次元を検査せよ。$r=2r_s$ で $\mathcal K r_s^4$ を求めよ。

<!-- solution-start -->
**詳細解答。** 分子 $r_s^2$ の次元は $L^2$、分母 $r^6$ は $L^6$ なので $[\mathcal K]=L^{-4}$ です。$r=2r_s$ を代入すると

$$
\mathcal K r_s^4
=\frac{12r_s^2}{(2r_s)^6}r_s^4
=\frac{12}{64}=\frac3{16}.
$$

よって無次元化した値には質量単位や長さ単位が残りません。
<!-- solution-end -->

<a id="ex-gr25-a03"></a>
#### GR25-A03 Killing方向の因果型
- Level: A

正則表示 $ds^2=-f\,dv^2+2\,dv\,dr+r^2d\Omega^2$ で、$r=2r_s$、$r=r_s$、$r=r_s/2$ における $\partial_v$ のノルムの符号を求めよ。

<!-- solution-start -->
**詳細解答。** $g(\partial_v,\partial_v)=g_{vv}=-f=-(1-r_s/r)$ です。代入すると順に

$$
g_{vv}(2r_s)=-\frac12<0,\qquad
g_{vv}(r_s)=0,\qquad
g_{vv}(r_s/2)=1>0.
$$

ゆえに $\partial_v$ は順に時間的、光的、空間的です。計量全体が地平線で退化するという意味ではありません。
<!-- solution-end -->

<a id="ex-gr25-a04"></a>
#### GR25-A04 半径一定面の判定
- Level: A

$r>0$ の正則表示で逆計量の $rr$ 成分が $g^{rr}=f$ とする。$r=r_s$ の法共ベクトル $dr$ が光的であることを確かめよ。また $r=r_s/2$ の法の因果型を答えよ。

<!-- solution-start -->
**詳細解答。** 半径一定面は $r-r_0=0$ で定まり、法の成分は $n_a=\partial_a(r-r_0)=\delta_a^r$ です。従って

$$
g^{ab}n_an_b=g^{rr}=1-\frac{r_s}{r_0}.
$$

$r_0=r_s$ では零なので法は光的、$r_0=r_s/2$ では $1-2=-1<0$ なので法は時間的です。後者の半径一定面は空間的になります。
<!-- solution-end -->

<a id="ex-gr25-a05"></a>
#### GR25-A05 交差項を持つ計量の逆行列
- Level: A

時間・半径計量行列 $A=\begin{pmatrix}-f&1\\1&0\end{pmatrix}$（$f$ は任意の有限実数）の逆行列と行列式を求め、$f=0$ の場合も非退化であることを示せ。

<!-- solution-start -->
**詳細解答。** 行列式は $(-f)\cdot0-1\cdot1=-1$ なので任意の有限 $f$ で可逆です。2次行列の逆行列を展開して

$$
A^{-1}=\frac1{-1}\begin{pmatrix}0&-1\\-1&-f\end{pmatrix}
=\begin{pmatrix}0&1\\1&f\end{pmatrix}.
$$

$f=0$ でも $A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、行列式は $-1$ のままです。対角成分が零でも行列全体は可逆です。
<!-- solution-end -->

### Level B：複数の結果を接続する

<a id="ex-gr25-b01"></a>
#### GR25-B01 独立成分から完全縮約する
- Level: B

外部の正規直交枠で、独立曲率成分が $(-2q,q,q,-q,-q,2q)$、$q=r_s/(2r^3)$ とする。時間添字が各項に0個または2個ずつ含まれることを使い、Kretschmann不変量を計算せよ。なぜ $q^2$ を六つ足すだけではいけないか。

<!-- solution-start -->
**詳細解答。** 四添字の反対称性から $R_{abab},R_{abba},R_{baab},R_{baba}$ は同じ絶対値を持ち、完全縮約では4回ずつ寄与します。今回の時間添字数は偶数なので逆計量の符号は各項で正です。したがって

$$
\begin{aligned}
\mathcal K
&=4\bigl[(-2q)^2+q^2+q^2+(-q)^2+(-q)^2+(2q)^2\bigr]\\
&=4(4+1+1+1+1+4)q^2=48q^2\\
&=48\frac{r_s^2}{4r^6}=\frac{12r_s^2}{r^6}.
\end{aligned}
$$

独立成分は24個の並べ替え寄与を代表しており、その重複度4を落とすと係数を間違えます。
<!-- solution-end -->

<a id="ex-gr25-b02"></a>
#### GR25-B02 正則表示を自分で構成する
- Level: B

$r>r_s$ で $f=1-r_s/r$、$dr_*/dr=1/f$、$v=x^0+r_*$ とする。$-f(dx^0)^2+f^{-1}dr^2$ を $(v,r)$ で書き直し、$r=r_s$ で係数と行列式が有限かを判定せよ。もとの座標変換が境界でも微分同相だと断定してよいか。

<!-- solution-start -->
**詳細解答。** 外部での微分式 $dx^0=dv-dr/f$ を出発点として、平方を展開します。

$$
\begin{aligned}
-f\left(dv-\frac{dr}f\right)^2+\frac{dr^2}f
&=-f\,dv^2+2\,dv\,dr-\frac{dr^2}f+\frac{dr^2}f\\
&=-f\,dv^2+2\,dv\,dr.
\end{aligned}
$$

時間・半径ブロックは $\begin{pmatrix}-f&1\\1&0\end{pmatrix}$ で、$f(r_s)=0$ でも各成分は有限、行列式は $-1$ です。ただし $dr_*/dr=1/f$ 自体は $r\downarrow r_s$ で発散します。外部での座標変換が境界でも正則だという主張と、**新しい式が境界を越えて正則な計量を定める**という主張を区別し、後者のみを得ます。
<!-- solution-end -->

<a id="ex-gr25-b03"></a>
#### GR25-B03 自由落下者の有限固有時
- Level: B

$M>0$ のSchwarzschild外部から地平線へ向かう動径時間的測地線を考える。保存量 $e=f\,dt/d\tau=1$、固有時規格化 $g_{\mu\nu}(dx^\mu/d\tau)(dx^\nu/d\tau)=-c^2$ を仮定する。入射解の $dr/d\tau$、半径 $r_0>r_s$ から $r_s$ までの固有時、正則時間座標 $v=x^0+r_*$ での $dv/d\tau$ の地平線極限を求めよ。

<!-- solution-start -->
**詳細解答。** $x^0=ct$ と $dt/d\tau=1/f$ より

$$
-c^2=-\frac{c^2}{f}+\frac1f\left(\frac{dr}{d\tau}\right)^2,
\qquad
\left(\frac{dr}{d\tau}\right)^2=c^2(1-f)=\frac{c^2r_s}{r}.
$$

半径が減少する解として $dr/d\tau=-c\sqrt{r_s/r}$ を選び、$d\tau=-\sqrt{r/r_s}\,dr/c$ を $r_0$ から $r_s$ まで積分します。

$$
\tau_s-\tau_0
=\frac1{c\sqrt{r_s}}\int_{r_s}^{r_0}\sqrt r\,dr
=\frac{2(r_0^{3/2}-r_s^{3/2})}{3c\sqrt{r_s}}<\infty.
$$

最後に $dv/d\tau=c/f+(dr/d\tau)/f$ として

$$
\frac{dv}{d\tau}
=\frac{c(1-\sqrt{r_s/r})}{1-r_s/r}
=\frac{c}{1+\sqrt{r_s/r}}
\xrightarrow[r\downarrow r_s]{}\frac c2.
$$

静的な $t$ の微分が発散しても $v$ の微分と固有時は有限です。
<!-- solution-end -->

<a id="ex-gr25-b04"></a>
#### GR25-B04 平坦なのに見かけの地平線がある例
- Level: B

定数 $a>0$ と長さ座標 $x>-c^2/a$ に対して、Rindlerの2次元計量 $ds^2=-(1+ax/c^2)^2(dx^0)^2+dx^2$ を考える。$x\downarrow-c^2/a$ で静止時計の係数が零になることを示し、[静的ブロックの曲率の命題](../GR24/index.md#prop-gr24-static-diagnostic)で曲率を求めよ。この例が「係数が零なら曲率が発散する」という推論の何を壊すか述べよ。

<!-- solution-start -->
**詳細解答。** $N(x)=1+ax/c^2>0$、$A(x)=1$ と書くと、境界への極限で $N\to0$、$g_{00}=-N^2\to0$ です。しかし $N'=a/c^2$ は定数、$N''=0$ です。[GR24の命題](../GR24/index.md#prop-gr24-static-diagnostic)は

$$
R_{x0x0}=AN\left(\frac{N'}A\right)'
=N\cdot0=0
$$

を与えます。2次元では独立曲率成分が一つなので全曲率が零です。失敗した推論は、**座標の静止方向が境界で光的になること**から**座標不変な曲率が発散すること**を導いた点です。この例はSchwarzschild計量と同一ではありませんが、誤った推論への直接の反例です。
<!-- solution-end -->

### Level C：三つの診断法を統合する

<a id="ex-gr25-c01"></a>
#### GR25-C01 地平線と中心を混同しない総合診断
- Level: C

$M>0$、$r_s=2GM/c^2$ のSchwarzschild真空解を考える。外部では $f=1-r_s/r$、$ds^2=-f(dx^0)^2+dr^2/f+r^2d\Omega^2$ である。独立な正規直交枠曲率成分が $(-r_s/r^3,r_s/(2r^3),r_s/(2r^3),-r_s/(2r^3),-r_s/(2r^3),r_s/r^3)$ と与えられるものとする。

1. その完全縮約から $\mathcal K(r)$ を導き、$r=r_s$ と $r\to0$ を区別せよ。
2. 外部で $dv=dx^0+dr/f$ を使って正則計量を構成し、地平線での非退化性を判定せよ。
3. $r=r_s$ が零超曲面であることを逆計量で示し、$\mathcal K$ だけでは分からない結論と、$r=0$ の曲率発散が妨げる延長を説明せよ。

<!-- solution-start -->
**詳細解答。**

**1. 曲率の完全縮約。** 各独立な $R_{abab}$ には添字対の反対称な入替えが4通り寄与し、今回の非零成分には時間添字が0個または2個なのでLorentz符号による負号は残りません。よって

$$
\begin{aligned}
\mathcal K
&=4\left[2\left(\frac{r_s}{r^3}\right)^2
+4\left(\frac{r_s}{2r^3}\right)^2\right]\\
&=4\left(2+1\right)\frac{r_s^2}{r^6}
=\frac{12r_s^2}{r^6}.
\end{aligned}
$$

地平線への極限は $12/r_s^4$ で有限です。中心への延長領域で $r\downarrow0$ とすると $\mathcal K\to\infty$ です。ただし地平線の正則性はこれだけではまだ証明していません。

**2. 正則な計量。** $r>r_s$ の座標で $dx^0=dv-dr/f$ を代入します。

$$
\begin{aligned}
-f(dx^0)^2+\frac{dr^2}f
&=-f\left(dv^2-\frac{2}{f}dv\,dr+\frac{dr^2}{f^2}\right)+\frac{dr^2}f\\
&=-f\,dv^2+2\,dv\,dr.
\end{aligned}
$$

時間・半径ブロック $\begin{pmatrix}-f&1\\1&0\end{pmatrix}$ は $r=r_s$ で $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ となり、行列式は $-1$ です。球面側は $r_s^2d\Omega^2$ で正則なので、局所的な角度座標の極を避ければ4次元計量は非退化のまま地平線を横断できます。

**3. 超曲面と限界。** 逆行列の $rr$ 成分を求めれば

$$
\begin{pmatrix}-f&1\\1&0\end{pmatrix}^{-1}
=\begin{pmatrix}0&1\\1&f\end{pmatrix},\qquad
g^{-1}(dr,dr)=g^{rr}=f.
$$

$r=r_s$ で $f=0$ なので法は光的、すなわち零超曲面です。この事実と計量の正則延長は**計量そのものを構成して得た結論**であり、$\mathcal K$ の有限性だけからは出ません。一方、中心へ向かう経路で $\mathcal K$ が無限大になると、有限の曲率を持つ $C^2$ 計量の通常点へその経路を延長することはできません。これで二つの境界を同列に扱う誤りを避けられます。
<!-- solution-end -->

## 8. 次の講義へ

地平線では静的座標が失敗しても曲率は有限で、入射方向に適した座標なら局所計量は正則です。一方、中心へ向かうと曲率不変量が発散します。次のGR26では入射・出射の光線を実際に追い、横断座標が「どの光を」連続に記述するのかを確かめます。
