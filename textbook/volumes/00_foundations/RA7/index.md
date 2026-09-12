# RA7 標準実解析 VII：多重Riemann積分・変数変換

一変数のRiemann積分を、有限次元の領域へ拡張します。主題は公式を暗記することではありません。

1. 矩形を小矩形へ切り、上和・下和で多重積分を作る。
2. 境界の体積を無視できる集合まで積分領域を広げる。
3. 反復積分が同じ多重積分を計算していることを確かめる。
4. 座標変換を小領域ごとの線形近似として読み、局所体積倍率が $|\det D\Phi|$ になることを示す。

変数変換の微分部分は [Fréchet微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-frechet-derivative)、行列式の計算則は [基本変形と行列式](../LA3C/index.md#thm-la3c-det-elementary-operations) と [行列式の乗法性](../LA3C/index.md#thm-la3c-det-multiplicative) を正本として使います。測度論側の反復積分・積分交換の結果には依存しません。

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
**定義の確認**：三角形・円板・有限個の滑らかな曲線で囲まれた有界領域はJordan可測です。例えば平面内の線分は、長さ方向を有限分割し、各部分を幅 $\eta$ の細長い長方形で覆えば、総面積を $O(\eta)$ にできます。有限本の線分からなる多角形境界も同様に面積0です。
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

$x$ 軸の分割 $P_x$ と $y$ 軸の分割 $P_y$ を取り、各小区間に標本点 $\xi_i,\eta_j$ を取ります。積分の定義から、内側の積分を十分細かい $P_y$ のRiemann和で一様に近似できます。一様性は $f$ の一様連続性から従います。従って反復積分は分割を細かくしたとき

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
3. **shear**：$S(x)_i=x_i+c x_j$、他の座標は固定する変換を考えます。ここは「断面の長さが同じ」と言うだけではなく、Jordan内容の定義まで戻って確認します。

まず直方体

$$
Q=I_1\times\cdots\times I_n
$$

を考え、$I_j$ を $m$ 等分して $Q$ を $j$ 方向の薄い直方体 $Q_1,\dots,Q_m$ に分けます。$I_j$ の長さを $\ell_j$、各薄片の幅を $h=\ell_j/m$ とします。$Q_r$ の中では $x_j$ の振幅が $h$ なので、shear 後の $i$ 座標の振幅は元の $I_i$ の長さ $\ell_i$ より高々 $|c|h$ だけ増えます。従って $S(Q_r)$ は体積

$$
(\ell_i+|c|h)h\prod_{k\ne i,j}\ell_k
$$

の軸平行直方体に入ります。全薄片について足すと

$$
\sum_{r=1}^m |\operatorname{cover}_r|
=|Q|+
\frac{|c|\ell_j^2}{m}
\prod_{k\ne i,j}\ell_k.
$$

右の余分な項は $m\to\infty$ で0へ行くので、$S(Q)$ の外側Jordan内容は $|Q|$ 以下です。

次に $S(Q)$ が実際にJordan可測であることを確認します。$\partial Q$ は有限個の $(n-1)$ 次元の面からなります。各面を幅 $\delta$ 程度の格子へ分けると、各格子片の shear 像は各辺長が $O(\delta)$ の軸平行直方体で覆えます。必要な個数は $O(\left(1/\delta\right)^{n-1})$、各被覆直方体の $n$ 次元体積は $O(\delta^n)$ なので、総体積は $O(\delta)\to0$ です。$S$ は連続な全単射で逆写像も連続だから

$$
\partial S(Q)=S(\partial Q),
$$

従って $S(Q)$ の境界はJordan内容0で、$S(Q)$ はJordan可測です。

逆向きの評価には逆 shear を使います。任意の $\varepsilon>0$ に対し、Jordan可測な $S(Q)$ を有限個の軸平行直方体 $R_1,\dots,R_N$ で

$$
S(Q)\subset\bigcup_{r=1}^N R_r,
\qquad
\sum_r|R_r|<|S(Q)|+\frac{\varepsilon}{2}
$$

と外側から覆えます。$S^{-1}$ も係数 $-c$ の shear なので、各 $R_r$ について今の薄片評価を適用できます。各像 $S^{-1}(R_r)$ の外側直方体近似を、$N$ 個を合わせた追加誤差が $\varepsilon/2$ 未満になるように選べば

$$
|Q|
\le \sum_r |R_r|+\frac{\varepsilon}{2}
<|S(Q)|+\varepsilon.
$$

$\varepsilon\downarrow0$ とすれば $|Q|\le|S(Q)|$。先ほどの $|S(Q)|\le|Q|$ と合わせて

$$
|S(Q)|=|Q|.
$$

最後に一般のJordan可測集合 $E$ へ移します。任意の $\varepsilon>0$ に対し、有限個の互いに内部で交わらない直方体からなる集合 $I,O$ を

$$
I\subset E\subset O,
\qquad
|O|-|I|<\varepsilon
$$

となるように取れます。shear は単射で、各直方体の体積を保存するので

$$
S(I)\subset S(E)\subset S(O),
\qquad
|S(O)|-|S(I)|=|O|-|I|<\varepsilon.
$$

従って $S(E)$ はJordan可測で $|S(E)|=|E|$ です。これで shear の体積保存を、反復積分の定理を未証明の指示関数へ拡張することなく閉じました。

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
> $K\subset U$ を閉矩形とする。$\Phi$ は $K$ の近傍で一対一な $C^1$ 級写像で、その像の近傍上の逆写像も $C^1$ 級とする。各 $x\in K$ で $D\Phi(x)$ は可逆とする。$K$ の小矩形 $Q$ とその点 $\xi_Q\in Q$ に対し、分割の最大直径を $\delta\to0$ とすると一様に
> $$|\Phi(Q)|=\bigl(|\det D\Phi(\xi_Q)|+o(1)\bigr)|Q|.$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$D\Phi$ はコンパクトな $K$ 上連続なので一様連続です。また各 $D\Phi(x)$ は可逆で、逆行列は行列成分の連続関数として $K$ 上有界です。従ってある $C<\infty$ が存在して

$$
\|D\Phi(x)^{-1}\|\le C
\qquad(x\in K).
$$

$Q$ の標本点を $\xi=\xi_Q$、$L=D\Phi(\xi)$ とします。$x,y\in Q$ を結ぶ線分は $Q$ に含まれます。各成分に [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を適用すると

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

$T=L^{-1}\circ(\Phi-\Phi(\xi))+\xi$ と正規化します。有限次元ではノルムを $\|\cdot\|_\infty$ に取り直しても収束の意味は変わらず、ノルム同値の定数を吸収すれば

$$
\|(T-I)(x)-(T-I)(y)\|_\infty
\le \eta(\delta)\|x-y\|_\infty,
\qquad \eta(\delta)\to0
$$

と書けます。十分小さい $\delta$ では $\eta<1$ とします。

ここで、恒等写像に近い写像が体積をどれだけ変えられるかを上下から評価します。$E$ をJordan可測集合、$S=I+u$ とし、$u$ が $\|\cdot\|_\infty$ についてLipschitz定数 $\eta<1$ を持つとします。$E$ を細かい立方体 $C_j$ で外から覆り、総体積を $|E|+\varepsilon$ 未満にできます。$C_j$ の一辺を $h_j$ とすると、$x,y\in E\cap C_j$ に対して各座標の振幅は

$$
|S_k(x)-S_k(y)|
\le |x_k-y_k|+|u_k(x)-u_k(y)|
\le (1+\eta)h_j.
$$

従って $S(E\cap C_j)$ は各辺長が高々 $(1+\eta)h_j$ の矩形に入り、外側から

$$
|S(E)|\le (1+\eta)^n(|E|+\varepsilon)
$$

と評価できます。$\varepsilon\downarrow0$ として

$$
|S(E)|\le(1+\eta)^n|E|.
$$

一方、$z=S(x)$、$w=S(y)$ とすると

$$
\|x-y\|_\infty
\le \|z-w\|_\infty+\eta\|x-y\|_\infty,
$$

ゆえに

$$
\|x-y\|_\infty\le\frac1{1-\eta}\|z-w\|_\infty.
$$

したがって $S^{-1}-I$ のLipschitz定数は高々 $\eta/(1-\eta)$ です。同じ外側評価を $S^{-1}$ に適用すると

$$
|E|
\le\left(1+\frac{\eta}{1-\eta}\right)^n|S(E)|
=(1-\eta)^{-n}|S(E)|,
$$

すなわち

$$
(1-\eta)^n|E|
\le |S(E)|
\le(1+\eta)^n|E|.
$$

なお、ここで使った体積が実際にJordan内容として定まることも同じ被覆で確認できます。Lipschitz写像はJordan内容0の集合をJordan内容0へ送り、$S$ と $S^{-1}$ が連続な逆写像なので $\partial S(E)=S(\partial E)$ です。従って $E$ の境界がJordan内容0なら $S(E)$ の境界もJordan内容0です。

これを $S=T$、$E=Q$ に適用します。$\eta(\delta)\to0$ なので

$$
|T(Q)|=(1+o(1))|Q|
$$

が $Q$ と $\xi$ に依らず一様に従います。最後に

$$
\Phi(Q)=L(T(Q)-\xi)+\Phi(\xi)
$$

であり、平行移動は体積を変えないので、[線形写像の体積倍率](#thm-ra7-linear-volume) から

$$
|\Phi(Q)|
=|\det L|\,|T(Q)|
=\bigl(|\det D\Phi(\xi)|+o(1)\bigr)|Q|.
$$

$\square$
<!-- proof-end -->

この補題で重要なのは「各点でFréchet近似できる」だけでは足りず、**コンパクト集合上で微分が連続だから誤差を全小矩形について一様に制御でき、その誤差を体積の二側評価へ変換できる**ことです。

---

## 7. 座標を変えて積分する

<a id="thm-ra7-change-of-variables"></a>
<!-- formal-statement-start -->
> **定理（Riemann積分の多変数変数変換定理）**  
> $U,V\subset\mathbb R^n$ を開集合とする。$\Phi:U\to V$ は一対一かつ全射で $C^1$ 級、逆写像 $\Phi^{-1}:V\to U$ も $C^1$ 級とする。Jordan可測集合 $A$ が $\overline A\subset U$ を満たし、$f$ が $\Phi(\overline A)$ 上連続なら、$\Phi(A)$ はJordan可測で
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

## 8. polar coordinates：原点でJacobianが退化するとき

平面の polar coordinates 写像

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
> **系（polar coordinates・球座標のRiemann積分公式）**  
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

以下です。これは $\varepsilon\to0$ で0へ行きます。角度の継ぎ目は線分でJordan内容0なので積分値へ寄与しません。従って polar coordinates の公式を得ます。

球座標でも、$\rho=0$、$z$ 軸、角度の継ぎ目を除けば一対一な $C^1$ 座標変換として定理を適用できます。微分行列の行列式の絶対値を計算すると $\rho^2\sin\varphi$ です。除外した集合はいずれも三次元Jordan内容0であり、同じ有界性評価で復帰できます。$\square$
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

ここでは答えだけでなく、**領域・座標変換・Jacobian・定理の仮定をどの順で確認するか**まで解答に残します。

### A01 多次元Darboux和
- Level: A

$f(x,y)=x+y$ を $[0,1]^2$ 上で考え、各軸を $N$ 等分する。$U(f,P_N)-L(f,P_N)$ を求め、可積分性を直接示せ。

<!-- solution-start -->
**詳細解答**

小正方形

$$
Q_{ij}=\left[\frac{i-1}{N},\frac{i}{N}\right]
\times
\left[\frac{j-1}{N},\frac{j}{N}\right]
$$

では $f(x,y)=x+y$ は各座標について増加するので、最小値と最大値はそれぞれ左下・右上で取られます。従って振幅は

$$
M_{ij}-m_{ij}=\frac2N.
$$

各小正方形の面積は $1/N^2$、全部で $N^2$ 個なので

$$
\begin{aligned}
U(f,P_N)-L(f,P_N)
&=\sum_{i,j}(M_{ij}-m_{ij})|Q_{ij}|\\
&=N^2\cdot\frac2N\cdot\frac1{N^2}
=\frac2N.
\end{aligned}
$$

これは $N\to\infty$ で0へ行きます。したがって任意の $\varepsilon>0$ に対して $N>2/\varepsilon$ と取れば $U-L<\varepsilon$ となり、多次元Darboux判定から $f$ はRiemann可積分です。
<!-- solution-end -->

### A02 反復積分
- Level: A

$$
\int_{[0,1]^2}(x^2+2xy)\,dx\,dy
$$

を反復積分で計算せよ。

<!-- solution-start -->
**詳細解答**

被積分関数は閉矩形上連続なので、反復積分定理を使えます。先に $y$ で積分すると

$$
\int_0^1(x^2+2xy)\,dy=x^2+x.
$$

従って

$$
\int_0^1\int_0^1(x^2+2xy)\,dy\,dx
=\int_0^1(x^2+x)\,dx
=\frac13+\frac12
=\frac56.
$$
<!-- solution-end -->

### A03 polar coordinates
- Level: A

$a>0$ とする。円板 $x^2+y^2\le a^2$ 上で $x^2+y^2$ を積分せよ。

<!-- solution-start -->
**詳細解答**

$$
x=r\cos\theta,\qquad y=r\sin\theta,
\qquad 0\le r\le a,\quad0\le\theta\le2\pi
$$

と置きます。被積分関数は $r^2$、Jacobian因子は $r$ なので

$$
\begin{aligned}
\int_{x^2+y^2\le a^2}(x^2+y^2)\,dx\,dy
&=\int_0^{2\pi}\int_0^a r^3\,dr\,d\theta\\
&=2\pi\frac{a^4}{4}
=\frac{\pi a^4}{2}.
\end{aligned}
$$

$r=0$ でJacobianが退化しますが、本文で確認した通り原点はJordan内容0なので公式の値に影響しません。
<!-- solution-end -->

### A04 絶対値の役割
- Level: A

$\Phi(u,v)=(v,u)$ について $\det D\Phi$ と $|\det D\Phi|$ を求め、体積公式に絶対値が必要な理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$$
D\Phi=
\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
\det D\Phi=-1,
\qquad
|\det D\Phi|=1.
$$

この写像は二つの座標を交換するだけなので面積を保存します。一方、行列式の符号は向きが反転したことを記録します。面積・体積は向きではなく大きさを測るため、倍率には絶対値が必要です。絶対値を外すと、座標交換だけで正の面積が負になってしまいます。
<!-- solution-end -->

---

## 11. 演習B

### B01 三角形領域
- Level: B

$T=\{(x,y):x\ge0,y\ge0,x+y\le1\}$ 上で $xy$ を積分せよ。

<!-- solution-start -->
**詳細解答**

$x$ を固定すると

$$
0\le y\le1-x,
\qquad 0\le x\le1.
$$

したがって

$$
\begin{aligned}
\int_Txy\,dx\,dy
&=\int_0^1\int_0^{1-x}xy\,dy\,dx\\
&=\frac12\int_0^1x(1-x)^2dx\\
&=\frac12\left(\frac12-\frac23+\frac14\right)
=\frac1{24}.
\end{aligned}
$$

積分計算より先に、三角形を $x$ 固定の縦線で切ったときの範囲を書けることが核心です。
<!-- solution-end -->

### B02 円環
- Level: B

$A=\{(x,y):a^2\le x^2+y^2\le b^2\}$ で $1/(x^2+y^2)$ を積分せよ。ただし $0<a<b$。

<!-- solution-start -->
**詳細解答**

領域は半径 $a$ と $b$ の間の円環なので

$$
a\le r\le b,
\qquad 0\le\theta\le2\pi.
$$

$a>0$ なので特異点 $r=0$ は領域に含まれません。被積分関数とJacobianを合わせると

$$
\frac1{r^2}\,r=\frac1r.
$$

従って

$$
\int_A\frac{dx\,dy}{x^2+y^2}
=\int_0^{2\pi}\int_a^b\frac1r\,dr\,d\theta
=2\pi\log\frac ba.
$$
<!-- solution-end -->

### B03 線形変換の像
- Level: B

$A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$ とし、単位正方形 $Q=[0,1]^2$ の像 $A(Q)$ の面積を求めよ。また $A(Q)$ 上で定数関数1を積分する変数変換を書け。

<!-- solution-start -->
**詳細解答**

$$
\det A=2\cdot3-0\cdot1=6.
$$

[線形写像の体積倍率](#thm-ra7-linear-volume)から

$$
|A(Q)|=|\det A|\,|Q|=6.
$$

積分として書けば、$z=Au$ として

$$
\int_{A(Q)}1\,dz
=\int_Q1\cdot|\det A|\,du
=\int_Q6\,du
=6.
$$

$\det A\ne0$ なので $A$ は可逆であり、線形変数変換の仮定も満たします。
<!-- solution-end -->

---

## 12. 演習C

### C01 非線形変数変換を設計する
- Level: C

第一象限の領域

$$
D=\{(x,y):1\le xy\le4,\ 1\le y/x\le9\}
$$

を考える。$u=xy$, $v=y/x$ と置いて $D$ を長方形へ移し、$\int_D1\,dx\,dy$ を計算せよ。

<!-- solution-start -->
**詳細解答**

この変数変換を選ぶ理由は、領域の二つの境界条件がそのまま

$$
1\le u\le4,
\qquad
1\le v\le9
$$

となり、$(u,v)$ 平面で長方形になるからです。

第一象限では $x>0,y>0$ なので

$$
x=\sqrt{\frac uv},
\qquad
y=\sqrt{uv}
$$

と逆変換が一意に定まります。偏微分は

$$
\frac{\partial x}{\partial u}=\frac{x}{2u},
\quad
\frac{\partial x}{\partial v}=-\frac{x}{2v},
\quad
\frac{\partial y}{\partial u}=\frac{y}{2u},
\quad
\frac{\partial y}{\partial v}=\frac{y}{2v}.
$$

従って

$$
\begin{aligned}
\det\frac{\partial(x,y)}{\partial(u,v)}
&=\frac{x}{2u}\frac{y}{2v}
-\left(-\frac{x}{2v}\right)\frac{y}{2u}\\
&=\frac{xy}{2uv}
=\frac1{2v}.
\end{aligned}
$$

よって

$$
\begin{aligned}
|D|
&=\int_1^4\int_1^9\frac1{2v}\,dv\,du\\
&=\frac32\log9
=3\log3.
\end{aligned}
$$

第一象限という条件がなければ、同じ $(u,v)$ に $(x,y)$ と $(-x,-y)$ が対応し得るため単射性が失われます。変数変換では「式が解ける」だけでなく、対象領域上で一対一かを確認する必要があります。
<!-- solution-end -->

---

## 13. 章末チェック

- 多次元Darboux上和・下和から多重Riemann積分を定義できる。
- Jordan可測性が「境界を任意に小さい総体積で覆えること」と対応する理由を説明できる。
- 連続関数の重積分と反復積分の一致を、測度論側の積分交換結果を使わずRiemann和から再構成できる。
- 線形写像の体積倍率が $|\det A|$ になることを基本変形へ還元できる。
- $C^1$ 変数変換を「一様な局所線形化 + 局所体積倍率 + Riemann和」として証明できる。
- polar coordinates・球座標でJacobianが退化する集合を、公式を無断適用せずJordan内容0として切り離せる。
