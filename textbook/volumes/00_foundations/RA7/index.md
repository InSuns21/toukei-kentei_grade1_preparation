# RA7 標準実解析 VII：多重Riemann積分・変数変換

一変数のRiemann積分を、有限次元の領域へ拡張します。主題は公式を暗記することではありません。

1. 矩形を小矩形へ切り、上和・下和で多重積分を作る。
2. 境界の体積を無視できる集合まで積分領域を広げる。
3. 反復積分が同じ多重積分を計算していることを確かめる。
4. 座標変換を小領域ごとの線形近似として読み、局所体積倍率が $|\det D\Phi|$ になることを示す。

変数変換の微分部分は [Fréchet微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-frechet-derivative)、行列式の計算則は [基本変形と行列式](../LA3C/index.md#thm-la3c-det-elementary-operations) と [行列式の乗法性](../LA3C/index.md#thm-la3c-det-multiplicative) を正本として使います。測度論の積測度・Tonelli・Lebesgue版Fubiniは使いません。

---

## 1. 矩形上の多次元Darboux和

$n$ 次元閉矩形

$$
R=[a_1,b_1]\times\cdots\times[a_n,b_n]
$$

を考えます。各座標区間を有限分割し、その直積で $R$ を有限個の小矩形 $Q$ に分けます。小矩形

$$
Q=I_1\times\cdots\times I_n
$$

の体積を

$$
|Q|=|I_1|\cdots |I_n|
$$

と書きます。

<a id="def-ra7-multidim-darboux"></a>
<!-- formal-statement-start -->
> **定義（多次元Darboux上和・下和）**  
> 有界関数 $f:R\to\mathbb R$ と矩形分割 $P$ に対し、各小矩形 $Q\in P$ で $M_Q=\sup_Q f$, $m_Q=\inf_Q f$ と置き、
> $$U(f,P)=\sum_{Q\in P}M_Q|Q|,\qquad L(f,P)=\sum_{Q\in P}m_Q|Q|$$
> と定める。
<!-- formal-statement-end -->

一変数と同じく、分割を細分すると上和は下がり、下和は上がります。理由も同じです。小矩形を分けると、各部分での上限は元の矩形の上限以下、下限は元の矩形の下限以上だからです。

<a id="def-ra7-multiple-riemann"></a>
<!-- formal-statement-start -->
> **定義（多重Riemann積分）**  
> 有界関数 $f:R\to\mathbb R$ が $R$ 上Riemann可積分であるとは
> $$\inf_P U(f,P)=\sup_P L(f,P)$$
> が成り立つことをいう。この共通値を $\int_R f(x)\,dx$ と書く。
<!-- formal-statement-end -->

一変数の [Darboux可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion) と同じ共通細分の議論により、

$$
\forall\varepsilon>0\ \exists P:\quad U(f,P)-L(f,P)<\varepsilon
$$

であることと多重Riemann可積分性は同値です。証明では区間を矩形へ置き換えるだけで、上積分・下積分の上限下限論法は変わりません。

<!-- definition-example-start: def-ra7-multidim-darboux, def-ra7-multiple-riemann -->
**定義の確認**：$R=[0,1]^2$, $f(x,y)=x+y$ とします。各軸を $N$ 等分した格子では、一つの小正方形内で $f$ の振幅は $2/N$ 以下です。全小正方形の面積和は1なので

$$
U(f,P_N)-L(f,P_N)\le \frac2N\to0.
$$

したがって $f$ は二重Riemann可積分です。
<!-- definition-example-end -->

---

## 2. 連続関数は多重Riemann可積分

<a id="thm-ra7-continuous-integrable"></a>
<!-- formal-statement-start -->
> **定理（連続関数の多重Riemann可積分性）**  
> 閉矩形 $R\subset\mathbb R^n$ 上の連続関数 $f$ はRiemann可積分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$R$ は閉かつ有界なので、RA2で用いた Heine–Cantor の議論により $f$ は一様連続です。任意の $\varepsilon>0$ を取ります。$|R|>0$ とし、一様連続性からある $\delta>0$ が存在して

$$
\|x-y\|<\delta
\Longrightarrow
|f(x)-f(y)|<\frac{\varepsilon}{|R|}
$$

となります。

各小矩形の直径が $\delta$ 未満となる格子分割 $P$ を取れば、各 $Q\in P$ で

$$
M_Q-m_Q\le \frac{\varepsilon}{|R|}.
$$

従って

$$
U(f,P)-L(f,P)
=\sum_Q(M_Q-m_Q)|Q|
\le \frac{\varepsilon}{|R|}\sum_Q|Q|
=\varepsilon.
$$

必要なら最初に $\varepsilon/2$ を用いれば厳密な不等号にできます。多次元版Darboux判定から可積分です。$\square$
<!-- proof-end -->

この証明で次元に依存した新しい解析は使っていません。**コンパクト矩形上の一様連続性が各小矩形の振幅を一様に小さくする**ことが核心です。

---

## 3. Jordan可測集合：境界だけが悪い領域

一般の領域上で積分したいとき、まずその領域自体に有限次元の「体積」が必要です。

<a id="def-ra7-jordan-measurable"></a>
<!-- formal-statement-start -->
> **定義（Jordan可測集合）**  
> 有界集合 $A\subset\mathbb R^n$ を含む閉矩形 $R$ を一つ取り、指示関数 $\mathbf 1_A$ が $R$ 上Riemann可積分であるとき、$A$ をJordan可測という。値 $\int_R\mathbf 1_A(x)\,dx$ を $|A|$ と書き、Jordan内容と呼ぶ。
<!-- formal-statement-end -->

含む矩形を大きくしても、追加部分では指示関数が0なので値は変わりません。

矩形分割 $P$ に対して $\mathbf 1_A$ の上和と下和の差に寄与するのは、$A$ と補集合の両方に触れる小矩形だけです。そのような小矩形は $\partial A$ に触れます。従って Jordan 可測性は、任意の $\varepsilon>0$ に対して境界 $\partial A$ を有限個の小矩形で覆い、その体積和を $\varepsilon$ 未満にできることと同値です。

この同値を確認します。境界を覆う小矩形の体積和が $\varepsilon$ 未満なら、それらを格子分割へ細分しても総体積は増えません。境界に触れない小矩形では $\mathbf1_A$ は恒等的に0または1なので振幅0、境界に触れるものだけ振幅1です。よって上和と下和の差は $\varepsilon$ 未満です。逆に $U-L<\varepsilon$ となる分割では、振幅1の小矩形全体が境界を覆い、その体積和が $U-L$ です。

<!-- definition-example-start: def-ra7-jordan-measurable -->
**定義の確認**：三角形・円板・有限個の滑らかな曲線で囲まれた有界領域はJordan可測です。例えば平面内の線分は、長さ方向を有限分割し、各部分を幅 $\eta$ の細長い長方形で覆れば、総面積を $O(\eta)$ にできます。有限本の線分からなる多角形境界も同様に面積0です。
<!-- definition-example-end -->

<a id="def-ra7-domain-integral"></a>
<!-- formal-statement-start -->
> **定義（Jordan可測集合上のRiemann積分）**  
> Jordan可測集合 $A\subset R$ と有界関数 $f:A\to\mathbb R$ に対し、$f$ を $A$ の外で0へ延長した関数 $\tilde f$ が $R$ 上Riemann可積分であるとき、$\int_A f(x)\,dx:=\int_R\tilde f(x)\,dx$ と定める。
<!-- formal-statement-end -->

$f$ が $\overline A$ の近傍で連続なら、この延長は境界で不連続になり得ます。しかし境界を覆う小矩形の総体積は任意に小さくでき、$f$ は有界なので、その小矩形が作る上和・下和の差も任意に小さくできます。従って連続関数はJordan可測領域上で積分できます。

<!-- definition-example-start: def-ra7-domain-integral -->
**定義の確認**：$T=\{(x,y):0\le x\le1,\ 0\le y\le x\}$ はJordan可測で、$f(x,y)=x+y$ は連続です。したがって $\int_Tf$ は、$T$ 外で0とした関数の $[0,1]^2$ 上のRiemann積分として定まります。
<!-- definition-example-end -->

---

## 4. 重積分と反復積分はなぜ一致するか

測度論を使わず、連続関数について矩形上の反復積分を証明します。まず二次元で書きます。

<a id="thm-ra7-iterated-integral"></a>
<!-- formal-statement-start -->
> **定理（矩形上の反復積分定理）**  
> $f:[a,b]\times[c,d]\to\mathbb R$ が連続なら、各 $x$ で $y\mapsto f(x,y)$ はRiemann可積分で、$F(x)=\int_c^d f(x,y)\,dy$ は連続であり、
> $$\int_{[a,b]\times[c,d]}f(x,y)\,dx\,dy=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx.$$
> 積分順序を交換しても同じ値を得る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $x$ に対する $y\mapsto f(x,y)$ は閉区間上連続なので、RA4の [連続関数のRiemann可積分性](../RA4/index.md#thm-ra4-continuous) により可積分です。

次に $F$ の連続性を示します。積分の基本評価から

$$
|F(x)-F(x')|
\le(d-c)\sup_{y\in[c,d]}|f(x,y)-f(x',y)|.
$$

$f$ は閉矩形上一様連続なので、$x'\to x$ なら右辺は0へ行きます。従って $F$ は連続で、外側のRiemann積分も存在します。

$x$ 軸の分割 $P_x$ と $y$ 軸の分割 $P_y$ を取り、各小区間に標本点 $\xi_i,\eta_j$ を取ります。積分の定義から、内側の積分を十分細かい $P_y$ のRiemann和で一様に近似できます。一様性は $f$ の一様連続性から従います。従って反復積分は極限で

$$
\sum_i\sum_j
f(\xi_i,\eta_j)\,\Delta x_i\Delta y_j
$$

へ近づきます。しかしこれは直積分割 $P_x\times P_y$ に対する二重Riemann和そのものです。分割の最大直径を0へ送れば、多重Riemann積分の値へ収束します。

$x,y$ の役割を交換しても同じ二重Riemann和へ収束するため、積分順序を交換しても値は変わりません。$\square$
<!-- proof-end -->

$n$ 次元でも同じ議論を帰納的に繰り返せます。

### 三角形を反復積分する

$T=\{(x,y):0\le x\le1,\ 0\le y\le x\}$ なら、境界は面積0なので

$$
\int_T f(x,y)\,dx\,dy
=\int_0^1\int_0^x f(x,y)\,dy\,dx.
$$

矩形上の定理を直接三角形へ適用したのではありません。$T$ 外で0へ延長し、境界上の不連続がJordan内容0に閉じ込められることを使っています。

---

## 5. 線形写像は体積を $|\det A|$ 倍する

変数変換の局所模型は線形写像です。まずここを独立に閉じます。

<a id="thm-ra7-linear-volume"></a>
<!-- formal-statement-start -->
> **定理（線形写像の体積倍率）**  
> 可逆行列 $A\in\mathbb R^{n\times n}$ とJordan可測集合 $E\subset\mathbb R^n$ に対して $A(E)$ もJordan可測であり、
> $$|A(E)|=|\det A|\,|E|.$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[基本変形と行列式](../LA3C/index.md#thm-la3c-det-elementary-operations) とGaussian eliminationにより、可逆行列は有限個の基本行列の積へ分解できます。そこで対応する三種類の線形変換を調べます。

1. **座標交換**：二座標を交換するだけなので、矩形の各辺長の積は変わりません。体積倍率は1で、行列式の絶対値も1です。
2. **一座標の倍率変更**：$x_i\mapsto c x_i$ では、その方向の辺長だけが $|c|$ 倍されます。体積倍率は $|c|$ です。
3. **shear**：$x_i\mapsto x_i+c x_j$、他の座標は固定する変換では、$x_j$ と残りの座標を固定した断面の $x_i$ 方向の長さは平行移動するだけで変わりません。矩形の有限和について反復積分すれば体積は不変です。

Jordan可測集合 $E$ は、境界を総体積任意小の矩形で覆うことで、内側・外側の有限矩形和に挟めます。上の三種類の写像ではその誤差矩形の総体積も固定定数倍にしかならないため、矩形和で成立した体積倍率を極限で $E$ へ移せます。

基本行列を合成したとき体積倍率は積になり、[行列式の乗法性](../LA3C/index.md#thm-la3c-det-multiplicative) により行列式の絶対値も同じ積になります。従って一般の可逆 $A$ について

$$
|A(E)|=|\det A|\,|E|.
$$

また境界の小矩形被覆を線形写像で送った像は有限個の平行多面体で覆え、それぞれさらに矩形で任意に近く外側近似できるため、$A(E)$ の境界もJordan内容0です。よって $A(E)$ もJordan可測です。$\square$
<!-- proof-end -->

絶対値が必要なのは、座標交換のように向きを反転する変換では $\det A<0$ になっても、体積は負にならないためです。

---

## 6. 非線形写像では局所線形化する

$\Phi:U\to\mathbb R^n$ を $C^1$ 級とします。RA6のFréchet微分により、点 $a$ の近くでは

$$
\Phi(a+h)=\Phi(a)+D\Phi(a)h+r_a(h),
\qquad
\frac{\|r_a(h)\|}{\|h\|}\to0.
$$

変数変換で必要なのは、これを「小領域の体積倍率」へ変換することです。

<a id="lem-ra7-local-volume"></a>
<!-- formal-statement-start -->
> **補題（局所体積倍率補題）**  
> $K\subset U$ を閉矩形とし、$\Phi$ は $K$ の近傍で $C^1$ 級、単射で、各 $x\in K$ で $D\Phi(x)$ が可逆とする。$K$ の小矩形 $Q$ とその点 $\xi_Q\in Q$ に対し、分割の最大直径を $\delta\to0$ とすると一様に
> $$|\Phi(Q)|=\bigl(|\det D\Phi(\xi_Q)|+o(1)\bigr)|Q|.$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$D\Phi$ はコンパクトな $K$ 上連続なので一様連続です。また各 $D\Phi(x)$ は可逆で、逆行列は行列成分の連続関数として $K$ 上有界です。従ってある $C<\infty$ が存在して

$$
\|D\Phi(x)^{-1}\|\le C
\qquad(x\in K).
$$

$Q$ の標本点を $\xi=\xi_Q$、$L=D\Phi(\xi)$ とします。$x,y\in Q$ を結ぶ線分は $Q$ に含まれます。各成分へ一変数の微積分学の基本定理を適用すると

$$
\Phi(x)-\Phi(y)-L(x-y)
=\int_0^1\{D\Phi(y+t(x-y))-L\}(x-y)\,dt.
$$

$D\Phi$ の一様連続性から、$\operatorname{diam}Q\le\delta$ のとき

$$
\|\Phi(x)-\Phi(y)-L(x-y)\|
\le \omega(\delta)\|x-y\|,
\qquad \omega(\delta)\to0,
$$

しかもこの評価は $Q$ と $\xi$ に依らず一様です。

$T=L^{-1}\circ(\Phi-\Phi(\xi))+\xi$ と正規化すると

$$
\|T(x)-T(y)-(x-y)\|
\le C\omega(\delta)\|x-y\|.
$$

つまり $T$ は恒等写像から相対誤差 $\eta(\delta)=C\omega(\delta)\to0$ の範囲でしかずれません。$Q$ を一辺 $s_i$ の小矩形とすると、$T(Q)$ は $Q$ の各面を $O(\eta\,\operatorname{diam}Q)$ だけ動かした領域に含まれます。逆写像にも同じ型の評価が成り立つので、外側・内側の矩形近似から

$$
|T(Q)|=(1+o(1))|Q|
$$

が一様に従います。ここで $o(1)$ が一様なのは、上で $D\Phi$ の一様連続性と $D\Phi^{-1}$ の一様有界性を使ったためです。

最後に $\Phi(Q)$ は $L(T(Q)-\xi)+\Phi(\xi)$ です。平行移動は体積を変えず、[線形写像の体積倍率](#thm-ra7-linear-volume) から

$$
|\Phi(Q)|
=|\det L|\,|T(Q)|
=\bigl(|\det D\Phi(\xi)|+o(1)\bigr)|Q|.
$$

$\square$
<!-- proof-end -->

この補題で重要なのは「各点でFréchet近似できる」だけでは足りず、**コンパクト集合上で微分が連続だから誤差を全小矩形について一様に制御できる**ことです。

---

## 7. 多変数の変数変換定理

<a id="thm-ra7-change-of-variables"></a>
<!-- formal-statement-start -->
> **定理（Riemann積分の多変数変数変換定理）**  
> $U,V\subset\mathbb R^n$ を開集合、$\Phi:U\to V$ を $C^1$ 級微分同相とする。Jordan可測集合 $A$ が $\overline A\subset U$ を満たし、$f$ が $\Phi(\overline A)$ 上連続なら、$\Phi(A)$ はJordan可測で
> $$\int_{\Phi(A)}f(y)\,dy
> =\int_A f(\Phi(x))\,|\det D\Phi(x)|\,dx.$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\overline A$ は有界閉集合なので、それを内部に含む有限個の小矩形からなるコンパクトな集合 $K\Subset U$ を取れます。$\Phi$ と $\Phi^{-1}$ は $K$ と $\Phi(K)$ 上で微分が有界なので、それぞれ局所的なLipschitz評価を有限個で一様化できます。従ってJordan内容0の集合は $\Phi$ と $\Phi^{-1}$ で送ってもJordan内容0です。特に

$$
\partial\Phi(A)=\Phi(\partial A)
$$

はJordan内容0なので $\Phi(A)$ はJordan可測です。

次に $A$ を含む矩形を格子分割し、境界に触れない内部小矩形 $Q_i\subset A$ と境界に触れる小矩形へ分けます。境界小矩形の総体積は分割を細かく選べば任意に小さくでき、$f\circ\Phi$ と $|\det D\Phi|$ はコンパクト集合上有界なので、その寄与も任意に小さくできます。

各内部小矩形 $Q_i$ に標本点 $\xi_i$ を取ります。[局所体積倍率補題](#lem-ra7-local-volume) により、メッシュを $\delta\to0$ とすると一様に

$$
|\Phi(Q_i)|
=\{J(\xi_i)+o(1)\}|Q_i|,
\qquad
J(x)=|\det D\Phi(x)|.
$$

また $f$ は一様連続なので、$Q_i$ が十分小さければ $\Phi(Q_i)$ 上の $f$ の振幅も一様に小さくなります。従って像側の積分はRiemann和として

$$
\int_{\Phi(A)}f(y)\,dy
=\lim_{\delta\to0}
\sum_i f(\Phi(\xi_i))|\Phi(Q_i)|.
$$

局所体積評価を代入すると

$$
\sum_i f(\Phi(\xi_i))|\Phi(Q_i)|
-
\sum_i f(\Phi(\xi_i))J(\xi_i)|Q_i|
\to0.
$$

右側第2和は連続関数 $x\mapsto f(\Phi(x))J(x)$ の $A$ 上のRiemann和なので

$$
\lim_{\delta\to0}
\sum_i f(\Phi(\xi_i))J(\xi_i)|Q_i|
=
\int_A f(\Phi(x))|\det D\Phi(x)|\,dx.
$$

境界小矩形の寄与はすでに0へ抑えているため結論を得ます。$\square$
<!-- proof-end -->

### なぜ仮定が必要か

- **単射性がない**と、像の同じ点を複数回数える可能性があります。
- **$D\Phi$ の可逆性が壊れる**と局所体積倍率が0へ潰れ、局所的な逆座標が保証されません。
- **絶対値を外す**と向きを反転する変換で積分値の符号まで反転してしまいます。
- **$C^1$ 性**は微分の連続性を通じて、局所線形化の誤差を分割全体で一様に小さくするために使っています。

---

## 8. 極座標：原点の特異性をどう処理するか

平面の極座標写像

$$
\Phi(r,\theta)=(r\cos\theta,r\sin\theta)
$$

の微分行列は

$$
D\Phi(r,\theta)=
\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix},
$$

したがって

$$
|\det D\Phi(r,\theta)|=r.
$$

ただし $r=0$ では微分行列が可逆でなく、$\theta$ と $\theta+2\pi$ は同じ点を表すため、長方形 $[0,R]\times[0,2\pi]$ 全体へ変数変換定理をそのまま適用してはいけません。

<a id="cor-ra7-polar-spherical"></a>
<!-- formal-statement-start -->
> **系（極座標・球座標のRiemann積分公式）**  
> 円板 $D_R=\{(x,y):x^2+y^2\le R^2\}$ 上連続な $f$ に対して
> $$\int_{D_R}f(x,y)\,dx\,dy
> =\int_0^{2\pi}\int_0^R f(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta.$$
> 三次元球座標 $x=\rho\sin\varphi\cos\theta$, $y=\rho\sin\varphi\sin\theta$, $z=\rho\cos\varphi$ では体積因子は $\rho^2\sin\varphi$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\varepsilon\le r\le R$ かつ角度の継ぎ目を一本除いた領域で変数変換定理を適用します。そこでは写像は一対一で、Jacobian因子は $r>0$ です。

除いた原点近傍の円板では、$|f|\le M$ とすると積分の絶対値は

$$
M\pi\varepsilon^2
$$

以下です。これは $\varepsilon\to0$ で0へ行きます。角度の継ぎ目は線分でJordan内容0なので積分値へ寄与しません。従って極座標公式を得ます。

球座標でも、$\rho=0$、極軸、角度の継ぎ目を除けば微分同相として変数変換定理を適用できます。微分行列の行列式の絶対値を計算すると $\rho^2\sin\varphi$ です。除外した集合はいずれも三次元Jordan内容0であり、同じ有界性評価で復帰できます。$\square$
<!-- proof-end -->

### 例：円板の面積

$f\equiv1$ とすれば

$$
|D_R|
=\int_0^{2\pi}\int_0^R r\,dr\,d\theta
=\pi R^2.
$$

### 例：球の体積

$f\equiv1$ とすれば

$$
|B_R|
=\int_0^{2\pi}\int_0^\pi\int_0^R
\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta
=\frac{4\pi R^3}{3}.
$$

---

## 9. 計算例：三角形と変数変換

### 例1：三角形上の積分

$T=\{(x,y):0\le y\le x\le1\}$ で $f(x,y)=x+y$ とすると

$$
\begin{aligned}
\int_T(x+y)\,dx\,dy
&=\int_0^1\int_0^x(x+y)\,dy\,dx\\
&=\int_0^1\left(x^2+\frac{x^2}{2}\right)dx
=\frac12.
\end{aligned}
$$

### 例2：斜めの領域を長方形へ戻す

$$
\Phi(u,v)=(u+v,u-v)
$$

と置くと

$$
D\Phi=
\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad
|\det D\Phi|=2.
$$

従って $Q=[0,1]^2$ の像で積分する問題は

$$
\int_{\Phi(Q)}f(x,y)\,dx\,dy
=\int_0^1\int_0^1
f(u+v,u-v)\,2\,du\,dv
$$

へ変換できます。「$dx\,dy=2\,du\,dv$」は記号操作ではなく、各小矩形の像の面積が局所的に2倍になることの略記です。

---

## 10. 演習A

### A01 多次元Darboux和

$f(x,y)=x+y$ を $[0,1]^2$ 上で考え、各軸を $N$ 等分する。$U(f,P_N)-L(f,P_N)$ を求め、可積分性を直接示せ。

<!-- solution-start -->
各小正方形で $x+y$ の振幅は $2/N$、小正方形の総面積は1なので差は $2/N$。従って0へ収束し、Darboux判定から可積分。
<!-- solution-end -->

### A02 反復積分

$$
\int_{[0,1]^2}(x^2+2xy)\,dx\,dy
$$

を反復積分で計算せよ。

<!-- solution-start -->
先に $y$ で積分すると $\int_0^1(x^2+x)dx=1/3+1/2=5/6$。
<!-- solution-end -->

### A03 極座標

円板 $x^2+y^2\le a^2$ 上で $x^2+y^2$ を積分せよ。

<!-- solution-start -->
極座標で被積分関数は $r^2$、Jacobian因子は $r$。従って $\int_0^{2\pi}\int_0^a r^3drd\theta=\pi a^4/2$。
<!-- solution-end -->

### A04 絶対値の役割

$\Phi(u,v)=(v,u)$ について $\det D\Phi$ と $|\det D\Phi|$ を求め、体積公式に絶対値が必要な理由を説明せよ。

<!-- solution-start -->
$D\Phi=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ なので行列式は $-1$、絶対値は1。座標交換は向きを反転するが面積は保存するため、体積倍率には絶対値が必要。
<!-- solution-end -->

---

## 11. 演習B

### B01 三角形領域

$T=\{(x,y):x\ge0,y\ge0,x+y\le1\}$ 上で $xy$ を積分せよ。

<!-- solution-start -->
$0\le x\le1$, $0\le y\le1-x$ として
$\int_0^1\int_0^{1-x}xy\,dy\,dx=\frac12\int_0^1x(1-x)^2dx=1/24$。
<!-- solution-end -->

### B02 円環

$A=\{(x,y):a^2\le x^2+y^2\le b^2\}$ で $1/(x^2+y^2)$ を積分せよ。ただし $0<a<b$。

<!-- solution-start -->
極座標で $\int_0^{2\pi}\int_a^b r^{-2}r\,dr\,d\theta=2\pi\log(b/a)$。
<!-- solution-end -->

### B03 線形変換の像

$A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$ とし、単位正方形 $Q=[0,1]^2$ の像 $A(Q)$ の面積を求めよ。また $A(Q)$ 上で定数関数1を積分する変数変換を書け。

<!-- solution-start -->
$|\det A|=6$ なので $|A(Q)|=6$。変数変換公式では $\int_{A(Q)}1\,dy=\int_Q6\,dx=6$。
<!-- solution-end -->

---

## 12. 演習C

### C01 非線形変数変換を設計する

第一象限の領域

$$
D=\{(x,y):1\le xy\le4,\ 1\le y/x\le9\}
$$

を考える。$u=xy$, $v=y/x$ と置いて $D$ を長方形へ移し、$\int_D1\,dx\,dy$ を計算せよ。

<!-- solution-start -->
第一象限では $x=\sqrt{u/v}$, $y=\sqrt{uv}$。したがって
$$
\left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|=\frac1{2v}.
$$
$D$ は $(u,v)\in[1,4]\times[1,9]$ に対応するので
$$
|D|=\int_1^4\int_1^9\frac1{2v}\,dv\,du
=\frac32\log9=3\log3.
$$
ここでは第一象限という条件が逆変換を一意にしている。象限条件がなければ $(u,v)$ だけでは $(x,y)$ の符号を一意に復元できず、単射性が失われる。
<!-- solution-end -->

---

## 13. 章末チェック

- 多次元Darboux上和・下和から多重Riemann積分を定義できる。
- Jordan可測性が「境界を任意に小さい総体積で覆えること」と対応する理由を説明できる。
- 連続関数の重積分と反復積分の一致を、積測度を使わずRiemann和から再構成できる。
- 線形写像の体積倍率が $|\det A|$ になることを基本変形へ還元できる。
- $C^1$ 変数変換を「一様な局所線形化 + 局所体積倍率 + Riemann和」として証明できる。
- 極座標・球座標の特異集合を、公式を無断適用せずJordan内容0として切り離せる。
