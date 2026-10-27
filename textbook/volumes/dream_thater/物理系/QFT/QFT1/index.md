# QFT1 相対論的スカラー場の作用とKlein–Gordon方程式

<!-- definition-example-audit: strict -->

[SREL3の質量殻](../../SREL/SREL3/index.md#def-srel3-mass-shell)から、一つの自由粒子にはエネルギー $E$ と運動量 $\boldsymbol p$ の関係がありました。しかし粒子が生成・消滅する相互作用を考えると、あらかじめ固定した個数の位置だけを未知数にする記述では足りません。各場所に値を持つ「場」を基本変数にすれば、次の講義以降で粒子数が変わる量子状態を扱うための出発点を用意できます。

まずは**量子化する前の古典的な実数値の場**を一から作ります。粒子の相対論的な分散関係を持つ波動方程式を、仮定した式として覚えるのではなく、場の作用の変分から導きます。最後に波のエネルギーと、どの条件で保存されるかを確認します。

## 1. 時空・単位・添字を決める

[SREL2のMinkowski計量](../../SREL/SREL2/index.md#def-srel2-minkowski-metric)を使い、平坦な $3+1$ 次元時空 $\mathbb R^{1,3}$ の慣性座標を

$$
x^\mu=(t,x^1,x^2,x^3),\qquad
\eta_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)
$$

とします。ギリシア添字 $\mu,\nu=0,1,2,3$、空間添字 $j=1,2,3$ を用い、同じ上下の添字が現れた場合は和を取ります。自然単位系 $c=\hbar=1$ を使うため、時間と長さは同じ次元であり、質量 $m$ は逆長さの次元を持ちます。添字の上げ下げは $\eta$ で行い、

$$
\partial_\mu=\frac{\partial}{\partial x^\mu},
\quad
\partial^\mu=\eta^{\mu\nu}\partial_\nu,
\quad
\partial_\mu\partial^\mu
=\frac{\partial^2}{\partial t^2}-\sum_{j=1}^{3}\frac{\partial^2}{\partial(x^j)^2}
$$

です。最後の微分作用素を $\Box=\partial_\mu\partial^\mu$ と書きます。符号は、$(-,+,+,+)$ を選ぶ教科書とは異なるので注意してください。

## 2. 一つの座標ではなく、時空の各点へ値を割り当てる

質点の軌道は時刻 $t$ ごとに位置を返す関数です。一方、温度分布なら同じ時刻でも場所ごとに値が違います。場は後者に似た未知関数で、ここでは実数を返すものから始めます。

<a id="def-qft1-real-scalar"></a>

<!-- formal-statement-start -->
> **定義（実スカラー場）**  
> Minkowski時空の開集合 $\Omega\subset\mathbb R^{1,3}$ 上の実数値 $C^2$ 関数 $\phi:\Omega\to\mathbb R$ が、Lorentz座標変換 $x'=\Lambda x$ に対して同じ事象で

$$
\phi'(x')=\phi(\Lambda^{-1}x')
$$

> と変換するとき、$\phi$ を実スカラー場という。これは座標の成分を回転させるベクトル場ではなく、各事象の値そのものを保つという意味である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft1-real-scalar -->
### 例：定数場と時空間隔

**定義の確認**：実数値性・$C^2$ 正則性・同一事象での値の不変性を、それぞれ式で確認します。

$\phi(x)=a$（$a\in\mathbb R$）なら、実数値で何度でも微分でき、任意のLorentz変換後も $\phi'(x')=a$ です。定義の**実数値性・正則性・変換則**を全て直接満たします。定数でない例として、原点を固定するLorentz変換では

$$
\phi(x)=t^2-|\boldsymbol x|^2
=\eta_{\mu\nu}x^\mu x^\nu
$$

もスカラー場です。[SREL2の時空間隔の不変性](../../SREL/SREL2/index.md#thm-srel2-interval-invariance)により $\eta_{\mu\nu}x^\mu x^\nu=\eta_{\mu\nu}x'^\mu x'^\nu$ だからです。原点を移す座標変更ではこの具体式も移動後の座標で書き直す必要があります。「スカラー」は座標での**数式がいつも同じ文字列になる**という意味ではありません。
<!-- definition-example-end -->

## 3. 質点の作用を場へ拡張する

[AMECH3の作用](../../AMECH/AMECH3/index.md#def-amech3-action)は時間積分でした。場は時間だけでなく空間にも広がっているため、密度を時空で積分します。ひとまず有界な領域 $\Omega$ で積分し、変分をその内部に台がある滑らかな関数へ制限します。こうすると無限体積での積分の収束や境界条件を曖昧にせず導出できます。

<a id="def-qft1-action"></a>

<!-- formal-statement-start -->
> **定義（ラグランジアン密度と場の作用）**  
> 有界な時空領域 $\Omega\subset\mathbb R^{1,3}$、実スカラー場 $\phi\in C^2(\Omega)$、各変数について微分可能な実関数 $\mathcal L(x,u,v_0,\ldots,v_3)$ を取る。$\phi$ のラグランジアン密度を $\mathcal L(x,\phi,\partial_\mu\phi)$、場の作用を

$$
S_\Omega[\phi]=\int_\Omega
\mathcal L(x,\phi(x),\partial_\mu\phi(x))\,d^4x
$$

> と定義する。積分が存在する場を対象とし、$\delta S_\Omega[\phi;\chi]$ は任意の実数値試験関数 $\chi\in C_c^\infty(\Omega)$ に対する $\varepsilon=0$ での微分

$$
\delta S_\Omega[\phi;\chi]
=\left.\frac{d}{d\varepsilon}S_\Omega[\phi+\varepsilon\chi]\right|_{\varepsilon=0}
$$

> とする。全ての $\chi$ で第一変分が零なら、$\phi$ を停留場という。
<!-- formal-statement-end -->

$C_c^\infty(\Omega)$ は、領域の内部のコンパクト集合の外で零になる滑らかな関数の集合です。したがって $\chi$ は $\partial\Omega$ の近くで消えます。これは時間の経過に伴う**実際の**場の変化ではなく、同じ時空領域で候補の場を比較する操作です。

<!-- definition-example-start: def-qft1-action -->
### 例：場の値だけに依存する密度

**定義の確認**：作用が場を入力して実数を返し、許された試験関数での第一変分が定義できることを調べます。

$\mathcal L(x,u,v)=-m^2u^2/2$（$m\ge0$）とします。任意の有界 $\Omega$ と有界な滑らかな $\phi,\chi$ について、

$$
\begin{aligned}
S_\Omega[\phi+\varepsilon\chi]
&=-\frac{m^2}{2}\int_\Omega
(\phi^2+2\varepsilon\phi\chi+\varepsilon^2\chi^2)\,d^4x,\\
\delta S_\Omega[\phi;\chi]
&=-m^2\int_\Omega\phi\chi\,d^4x.
\end{aligned}
$$

これで作用が「関数 $\phi$ を入力して数値を返す」こと、変分が「その入力を微小に変える」こと、係数 $1/2$ が微分で消えることを直接確認できました。
<!-- definition-example-end -->

### 3.1 場のEuler–Lagrange方程式

質点と同じように、作用を停留させる場の方程式を求めます。ポイントは、時空方向が四つあるので部分積分も各 $\mu$ ごとに行うことです。

<a id="thm-qft1-field-el"></a>

<!-- formal-statement-start -->
> **定理（場のEuler–Lagrange方程式）**  
> $\Omega\subset\mathbb R^{1,3}$ を開集合、$\phi\in C^2(\Omega)$、$\mathcal L\in C^2$ を実数値の密度関数とし、各 $\chi\in C_c^\infty(\Omega)$ の台上で第一変分と積分の交換ができるとする。このとき $\phi$ が全ての $\chi$ に関して停留場であることと、$\Omega$ の各点で

$$
\frac{\partial\mathcal L}{\partial u}
-\partial_\mu
\left(\frac{\partial\mathcal L}{\partial v_\mu}\right)=0
\quad
(u=\phi,\ v_\mu=\partial_\mu\phi)
$$

> が成立することは同値である。右辺の偏微分係数は $u,v_\mu$ を独立変数として計算してから場の値を代入する。
<!-- formal-statement-end -->

### 証明の見取り図

最初に $\varepsilon$ で微分して $\chi$ と $\partial_\mu\chi$ を分離し、次に四方向で部分積分します。台が内部にあるので境界項は零になります。最後は「全ての局所的な $\chi$ に対して積分が零なら係数が各点で零」という局所化を使います。

<!-- proof-start -->
### 証明

固定した $\chi\in C_c^\infty(\Omega)$ に対し、$\phi_\varepsilon=\phi+\varepsilon\chi$ と置きます。微分の連鎖律から、

$$
\begin{aligned}
\delta S_\Omega[\phi;\chi]
&=\int_\Omega
\left[
\frac{\partial\mathcal L}{\partial u}\chi
+\frac{\partial\mathcal L}{\partial v_\mu}
\partial_\mu\chi
\right]\,d^4x .
\end{aligned}
$$

この式の $\mathcal L$ の微分は $(x,\phi,\partial\phi)$ で評価しています。積の微分

$$
\partial_\mu\left(
\frac{\partial\mathcal L}{\partial v_\mu}\chi
\right)
=\partial_\mu\left(
\frac{\partial\mathcal L}{\partial v_\mu}
\right)\chi
+\frac{\partial\mathcal L}{\partial v_\mu}
\partial_\mu\chi
$$

を使い、$\chi$ は $\Omega$ の境界付近で零であるため全微分項の積分が零となり、

$$
\delta S_\Omega[\phi;\chi]
=\int_\Omega
\left[
\frac{\partial\mathcal L}{\partial u}
-\partial_\mu
\left(\frac{\partial\mathcal L}{\partial v_\mu}\right)
\right]\chi\,d^4x
$$

を得ます。角括弧内を連続関数 $F(x)$ と書きます。もし $F(x_0)>0$ なら連続性から $x_0$ の近傍で $F>0$ となり、そこに台を持つ零でない非負の滑らかな $\chi$ を選べば $\int F\chi>0$ です。$F(x_0)<0$ の場合も同様です。従って全ての $\chi$ で積分が零なら $F=0$ が各点で成立します（[AMECH3の変分法の基本補題](../../AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)と同じ局所化の考え方）。逆に $F=0$ なら上の積分式から全ての第一変分が零です。
<!-- proof-end -->

## 4. 自由場にふさわしい方程式を選ぶ

空間と時間を同等の時空の成分として扱うには、[Minkowski計量](../../SREL/SREL2/index.md#def-srel2-minkowski-metric)で一階微分を縮約するのが自然です。ここで $m\ge0$ は一定の実数で、量子化後の粒子の質量と対応するパラメータです。導関数の項を正、場の二乗項を負にした密度

$$
\mathcal L_{\mathrm{free}}
=\frac12\eta^{\mu\nu}
(\partial_\mu\phi)(\partial_\nu\phi)
-\frac{m^2}{2}\phi^2
=\frac12\left[
(\partial_t\phi)^2-|\nabla\phi|^2-m^2\phi^2
\right]
$$

を考えます。この具体式の運動方程式を計算すると、相対論的な分散関係と両立することが分かります。

<a id="def-qft1-klein-gordon"></a>

<!-- formal-statement-start -->
> **定義（Klein–Gordon方程式）**  
> 質量パラメータ $m\ge0$ を一定とする実スカラー場 $\phi\in C^2(\Omega)$ が満たす線形方程式

$$
(\Box+m^2)\phi
=\partial_t^2\phi-\Delta\phi+m^2\phi=0
$$

> を質量 $m$ の自由Klein–Gordon方程式と呼ぶ。$\Delta=\sum_{j=1}^3\partial_j^2$ は空間のLaplacianである。
<!-- formal-statement-end -->

自由場のラグランジアン密度の各変数の微分を省略せず求めると、

$$
\frac{\partial\mathcal L_{\mathrm{free}}}{\partial\phi}
=-m^2\phi,\qquad
\frac{\partial\mathcal L_{\mathrm{free}}}{\partial(\partial_\mu\phi)}
=\eta^{\mu\nu}\partial_\nu\phi=\partial^\mu\phi.
$$

よって[場のEuler–Lagrange方程式](#thm-qft1-field-el)の左辺は

$$
-m^2\phi-\partial_\mu\partial^\mu\phi
=-(\Box+m^2)\phi
$$

となります。零に等しいのでちょうどKlein–Gordon方程式です。符号を反対にすると、この段階で質量殻の符号も変わってしまいます。

<!-- definition-example-start: def-qft1-klein-gordon -->
### 例：定数場はいつ解になるか

**定義の確認**：方程式の左辺に場を代入して、零になるための条件を判定します。

実定数 $a$ に対して $\phi(t,\boldsymbol x)=a$ は滑らかな実スカラー場です。時間微分も空間微分も零であるため、

$$
(\Box+m^2)a=m^2a.
$$

したがって $m>0$ では $a=0$ の場合だけ解になり、$m=0$ では全ての定数場が解になります。実スカラー場であること（対象の定義）と運動方程式を満たすこと（さらに課した条件）は別だと分かります。
<!-- definition-example-end -->

### 4.1 Lorentz変換に対する方程式の形

原点を固定するLorentz変換 $x'^\alpha=\Lambda^\alpha{}_\mu x^\mu$ を考えます。$\phi'(x')=\phi(x)$ という[スカラー場の変換則](#def-qft1-real-scalar)に連鎖律を適用すると

$$
\partial'_\alpha\phi'(x')
=(\Lambda^{-1})^\mu{}_\alpha\partial_\mu\phi(x).
$$

Lorentz変換が満たす $\Lambda^T\eta\Lambda=\eta$ から

$$
\eta^{\alpha\beta}(\Lambda^{-1})^\mu{}_\alpha
(\Lambda^{-1})^\nu{}_\beta
=\eta^{\mu\nu}
$$

なので、$\Box'\phi'(x')=\Box\phi(x)$ となります。さらに $|\det\Lambda|=1$ なので $d^4x'=d^4x$ です。つまり自由作用と運動方程式は、Lorentz変換で同じ形を保ちます。場が微分可能で、考える積分領域も対応させることが前提です。

## 5. 平面波から粒子の質量殻が現れる

次は微分方程式を実際に解いて、相対論的粒子とつなぎます。ここでいう平面波は空間全体に広がる数学的な解で、有限の全エネルギーを持つ一個の波束とは異なります。

<a id="prop-qft1-dispersion"></a>

<!-- formal-statement-start -->
> **命題（平面波の分散関係）**  
> $m\ge0$、$\boldsymbol k\in\mathbb R^3$、$\omega\in\mathbb R$、振幅 $A\ne0$ とする。実平面波

$$
\phi(t,\boldsymbol x)
=A\cos(\omega t-\boldsymbol k\cdot\boldsymbol x)
$$

> が $\mathbb R^{1,3}$ 上で質量 $m$ のKlein–Gordon方程式を満たすための必要十分条件は

$$
\omega^2=|\boldsymbol k|^2+m^2
$$

> である。正振動数の枝は $\omega=\sqrt{|\boldsymbol k|^2+m^2}$ と定める（$m=|\boldsymbol k|=0$ では $\omega=0$）。
<!-- formal-statement-end -->

### 証明の見取り図

波の位相を一つの変数にまとめれば、時間の二階微分が $-\omega^2$、空間の二階微分の和が $-|\boldsymbol k|^2$ を掛けることが見えます。

<!-- proof-start -->
### 証明

$\theta=\omega t-\sum_{j=1}^3 k_jx^j$ と置くと、連鎖律から

$$
\begin{aligned}
\partial_t\phi&=-A\omega\sin\theta,
&\partial_t^2\phi&=-A\omega^2\cos\theta,\\
\partial_j\phi&=Ak_j\sin\theta,
&\partial_j^2\phi&=-Ak_j^2\cos\theta.
\end{aligned}
$$

したがって

$$
(\Box+m^2)\phi
=A(-\omega^2+|\boldsymbol k|^2+m^2)\cos\theta.
$$

$A\ne0$ で余弦関数は時空全体で恒等的に零ではないので、左辺が恒等的に零になるための必要十分条件は括弧の係数が零になることです。
<!-- proof-end -->

自然単位系で $E=\omega$、$\boldsymbol p=\boldsymbol k$ と対応させると、上の式は[SREL3の質量殻関係式](../../SREL/SREL3/index.md#thm-srel3-mass-shell)と同じ形になります。ただしこれは**古典場の振動数・波数の関係**であって、まだ粒子や生成演算子を作ったわけではありません。量子化によって各モードの励起を粒子として解釈するのは後続の講義です。

## 6. 波が運ぶエネルギーはいつ保存するか

時間並進に関連するNoether流は次講で一般化します。ここでは具体的な二次式を直接微分し、正のエネルギーと保存則を先に確認します。

<a id="def-qft1-energy"></a>

<!-- formal-statement-start -->
> **定義（自由スカラー場のエネルギー）**  
> $m\ge0$、実数値 $C^2$ 場 $\phi$ に対し、エネルギー密度 $u$ を

$$
u(t,\boldsymbol x)=\frac12
\left[(\partial_t\phi)^2+|\nabla\phi|^2+m^2\phi^2\right]
$$

> と定義する。固定時刻 $t$ で $u(t,\cdot)$ が可積分なら

$$
E(t)=\int_{\mathbb R^3}u(t,\boldsymbol x)\,d^3x
$$

> を自由スカラー場の全エネルギーと呼ぶ。各項が非負なので $E(t)\ge0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft1-energy -->
### 例：局所化した初期データと平面波

**定義の確認**：エネルギー密度の各非負項と空間積分の有限性を直接判定します。

時刻 $t=0$ で $\phi(0,\boldsymbol x)=A\exp(-|\boldsymbol x|^2/(2\sigma^2))$、$\partial_t\phi(0,\boldsymbol x)=0$（$A\in\mathbb R,\ \sigma>0$）とします。このとき

$$
|\nabla\phi(0,\boldsymbol x)|^2
=\frac{A^2|\boldsymbol x|^2}{\sigma^4}
e^{-|\boldsymbol x|^2/\sigma^2},
\quad
m^2\phi(0,\boldsymbol x)^2
=m^2A^2e^{-|\boldsymbol x|^2/\sigma^2}.
$$

どちらも $\mathbb R^3$ で積分可能で、$E(0)<\infty$ です。一方、非零振幅の平面波は空間全体で減衰せず、一般に $E(t)=\infty$ です。**方程式の解であることと有限エネルギーであることは別の条件**です。
<!-- definition-example-end -->

<a id="thm-qft1-energy"></a>

<!-- formal-statement-start -->
> **定理（自由場のエネルギー保存）**  
> $m\ge0$、$\phi\in C^2(\mathbb R^{1,3})$ が $(\Box+m^2)\phi=0$ を満たすとする。各時刻で $u$ が可積分であり、$E(t)$ の積分と時間微分の交換が許され、半径 $R$ の球面を通るフラックス

$$
\int_{|\boldsymbol x|=R}
(\partial_t\phi)\nabla\phi\cdot\boldsymbol n\,dS
\longrightarrow0\qquad(R\to\infty)
$$

> が各時刻で成り立ち、極限操作も時間積分と交換できると仮定する。このとき $E(t)$ は時間に依存しない。十分な空間的減衰と正則性を持つ解ではこれらの条件が満たされる。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギー密度を微分し、空間微分の項を積の微分で整理します。場の方程式の項が消えると、密度の変化は境界へ流れた分だけになることが分かります。

<!-- proof-start -->
### 証明

定義に従い

$$
\begin{aligned}
\partial_t u
&=(\partial_t\phi)(\partial_t^2\phi)
+\nabla\phi\cdot\nabla(\partial_t\phi)
+m^2\phi\,\partial_t\phi,\\
\nabla\cdot\bigl((\partial_t\phi)\nabla\phi\bigr)
&=\nabla(\partial_t\phi)\cdot\nabla\phi
+(\partial_t\phi)\Delta\phi .
\end{aligned}
$$

第二式を第一式へ代入して同じ項を引くと

$$
\partial_tu
=(\partial_t\phi)(\partial_t^2\phi-\Delta\phi+m^2\phi)
+\nabla\cdot\bigl((\partial_t\phi)\nabla\phi\bigr).
$$

最初の括弧は[Klein–Gordon方程式](#def-qft1-klein-gordon)によって零です。フラックスベクトルを $\boldsymbol j=-(\partial_t\phi)\nabla\phi$ と置けば

$$
\partial_tu+\nabla\cdot\boldsymbol j=0.
$$

半径 $R$ の球 $B_R$ 上で積分し、[Gauss--Ostrogradsky の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を使うと

$$
\frac{d}{dt}\int_{B_R}u\,d^3x
=-\int_{\partial B_R}\boldsymbol j\cdot\boldsymbol n\,dS
=\int_{\partial B_R}
(\partial_t\phi)\nabla\phi\cdot\boldsymbol n\,dS.
$$

定理で仮定した収束条件のもとで $R\to\infty$ とすれば $dE/dt=0$、従って $E(t)$ は一定です。
<!-- proof-end -->

この保存則は空間の端からエネルギーが出入りしない場合の主張です。有限の箱では境界フラックスを残し、どの境界条件を課したかを明記しなければなりません。

## 7. 演習：作用から波と保存則まで

### 演習 QFT1-A1：質量殻の二つの枝

自然単位系で質量 $m=3$、三次元運動量の大きさ $|\boldsymbol p|=4$ の粒子について、$E^2-|\boldsymbol p|^2=m^2$ の両方の解を求めよ。また正エネルギー枝を選ぶ理由を、数学的な二根と物理的な選択に分けて説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

質量殻条件から $E^2=3^2+4^2=9+16=25$ なので $E=+5$ または $E=-5$ です。二次方程式には両根があります。ここで正のエネルギーを持つ自由粒子状態を表すと**別途仮定**すると $E=5$ を選びます。二次方程式そのものは負の根を禁止しません。古典場の負振動数成分についても、直ちに「負エネルギー粒子」と同一視しません。
<!-- solution-end -->

### 演習 QFT1-A2：実スカラー場の直接判定

$1+1$ 次元で $t'=\gamma(t-vx)$、$x'=\gamma(x-vt)$、$\gamma=(1-v^2)^{-1/2}$、$|v|<1$ とする。$\phi(t,x)=t^2-x^2$ が実スカラー場として $\phi'(t',x')=t'^2-x'^2$ と書けることを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

実数値の多項式なので正則性を満たします。変換式を直接二乗して差を取ると

$$
\begin{aligned}
t'^2-x'^2
&=\gamma^2\{(t-vx)^2-(x-vt)^2\}\\
&=\gamma^2\{t^2-2vtx+v^2x^2-x^2+2vtx-v^2t^2\}\\
&=\gamma^2(1-v^2)(t^2-x^2)=t^2-x^2.
\end{aligned}
$$

すなわち $\phi'(t',x')=\phi(t,x)$ で、定義の変換則が成立します。座標原点を固定したLorentz変換についての確認です。
<!-- solution-end -->

### 演習 QFT1-A3：質量項の第一変分

有界領域 $\Omega\subset\mathbb R^{1,3}$、実数値の滑らかな $\phi,\chi$ と定数 $m\ge0$ に対し、$\chi$ は領域内部に台を持つとする。密度 $\mathcal L=-m^2\phi^2/2$ の作用 $S_\Omega$ について $\delta S_\Omega[\phi;\chi]$ を求めよ。$\phi\equiv a$ とすると停留条件はどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

$$
\begin{aligned}
S_\Omega[\phi+\varepsilon\chi]
&=-\frac{m^2}{2}\int_\Omega(\phi+\varepsilon\chi)^2\,d^4x\\
&=-\frac{m^2}{2}\int_\Omega
(\phi^2+2\varepsilon\phi\chi+\varepsilon^2\chi^2)\,d^4x .
\end{aligned}
$$

$\varepsilon$ で微分し零を代入すると $\delta S_\Omega=-m^2\int_\Omega\phi\chi\,d^4x$ です。$\phi\equiv a$ なら $-m^2a\int_\Omega\chi\,d^4x=0$ が任意の $\chi$ で必要です。非負で積分が正の $\chi$ も選べるので $m^2a=0$、すなわち $m>0$ なら $a=0$、$m=0$ なら任意の $a$ が停留です。
<!-- solution-end -->

### 演習 QFT1-A4：平面波の符号検算

$1+1$ 次元で $\phi(t,x)=2\cos(5t-4x)$、$m=3$ とする。$(\partial_t^2-\partial_x^2+m^2)\phi$ を各微分から計算せよ。角振動数を $6$ に変え、他の値を固定するとどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

最初の波では $\partial_t^2\phi=-50\cos(5t-4x)$、$\partial_x^2\phi=-32\cos(5t-4x)$、$m^2\phi=18\cos(5t-4x)$ なので、和は $(-50+32+18)\cos(5t-4x)=0$ です。角振動数を $6$ にすると時間微分項が $-72\cos(6t-4x)$ に変わり、和は $(-72+32+18)\cos(6t-4x)=-22\cos(6t-4x)$ となります。これは恒等的には零ではないので、変更後は解ではありません。
<!-- solution-end -->

### 演習 QFT1-B1：線形方程式の重ね合わせ

$m\ge0$ を固定し、実数値 $C^2$ 関数 $\phi_1,\phi_2$ が同じ方程式 $(\Box+m^2)\phi_i=0$ を満たすとする。任意の実定数 $a,b$ に対する $\phi=a\phi_1+b\phi_2$ が解であることを示せ。異なる二つの波数 $\boldsymbol k_1,\boldsymbol k_2$ の正振動数平面波を使い、重ね合わせた解が通常は単一の平面波にならないことも説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

微分の線形性を各項に使うと

$$
\begin{aligned}
(\Box+m^2)(a\phi_1+b\phi_2)
&=a\Box\phi_1+b\Box\phi_2+am^2\phi_1+bm^2\phi_2\\
&=a(\Box+m^2)\phi_1+b(\Box+m^2)\phi_2=0.
\end{aligned}
$$

$\omega_i=\sqrt{|\boldsymbol k_i|^2+m^2}$ とし $\phi_i=\cos(\omega_i t-\boldsymbol k_i\cdot\boldsymbol x)$ を選べば、両方とも[平面波の分散関係](#prop-qft1-dispersion)を満たします。$\boldsymbol k_1\ne\boldsymbol k_2$ かつ $a,b\ne0$ の一般の場合、和は異なる空間周波数を持ち、単一の余弦波にはなりません。重ね合わせは方程式の線形性から従うのであり、エネルギー $E[\phi_1+\phi_2]=E[\phi_1]+E[\phi_2]$ という主張は交差項があるため一般に誤りです。
<!-- solution-end -->

### 演習 QFT1-B2：外部源があるときの方程式

有界時空領域 $\Omega$ で、滑らかな固定関数 $J(x)$ と実スカラー場 $\phi$ に対する密度

$$
\mathcal L_J
=\frac12\partial_\mu\phi\,\partial^\mu\phi
-\frac{m^2}{2}\phi^2+J\phi
$$

を考える。$J$ は変分しないとし、$\chi\in C_c^\infty(\Omega)$ を用いて停留条件を導け。$J=0$ の極限も確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\phi_\varepsilon=\phi+\varepsilon\chi$ を代入し、$\varepsilon$ の一次係数を取り出すと

$$
\delta S_\Omega
=\int_\Omega
\left[
\partial_\mu\phi\,\partial^\mu\chi
-m^2\phi\chi+J\chi
\right]\,d^4x.
$$

計量は定数であり、$\partial_\mu\phi\,\partial^\mu\chi=(\partial^\mu\phi)(\partial_\mu\chi)$ です。$\chi$ の台が内部にあるので部分積分すると

$$
\int_\Omega(\partial^\mu\phi)(\partial_\mu\chi)\,d^4x
=-\int_\Omega(\partial_\mu\partial^\mu\phi)\chi\,d^4x.
$$

従って

$$
\delta S_\Omega
=\int_\Omega[-\Box\phi-m^2\phi+J]\chi\,d^4x.
$$

任意の局所的な $\chi$ で零という条件から $(\Box+m^2)\phi=J$ です。$J=0$ とすれば[Klein–Gordon方程式](#def-qft1-klein-gordon)へ戻ります。符号が $-J$ ではないのは密度に $+J\phi$ を加えたからです。
<!-- solution-end -->

### 演習 QFT1-B3：有限領域でのエネルギー流

$m\ge0$、$\phi\in C^2([t_0,t_1]\times\overline D)$ がKlein–Gordon方程式を満たし、$D\subset\mathbb R^3$ は滑らかな有界領域とする。密度 $u=[\phi_t^2+|\nabla\phi|^2+m^2\phi^2]/2$ と領域エネルギー $E_D(t)=\int_Du\,d^3x$ について、境界フラックスの式を導け。$\partial_{\boldsymbol n}\phi=0$ を $\partial D$ で課すとどうなるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

微分の積の公式で

$$
\begin{aligned}
\partial_tu
&=\phi_t(\phi_{tt}+m^2\phi)+\nabla\phi\cdot\nabla\phi_t\\
&=\phi_t(\Delta\phi)+\nabla\phi\cdot\nabla\phi_t\\
&=\nabla\cdot(\phi_t\nabla\phi).
\end{aligned}
$$

二行目で場の方程式 $\phi_{tt}-\Delta\phi+m^2\phi=0$ を使いました。三行目は発散の積の公式です。[Gauss--Ostrogradsky の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)と積分・微分交換により

$$
\frac{dE_D}{dt}
=\int_D\nabla\cdot(\phi_t\nabla\phi)\,d^3x
=\int_{\partial D}\phi_t\,\partial_{\boldsymbol n}\phi\,dS.
$$

法線微分が境界上で零なら右辺も零となり、$E_D(t)$ は保存します。無限空間と異なり、有限領域ではこのように境界で何を課すかを指定する必要があります。
<!-- solution-end -->

### 演習 QFT1-C1：Lorentz変換・質量殻・有限エネルギー

$1+1$ 次元で $m>0$、$A\ne0$、$\omega>0$、$\omega^2-k^2=m^2$ を満たす実数 $\omega,k$ を取り、$\phi(t,x)=A\cos(\omega t-kx)$ とする。$|v|<1$ で

$$
t'=\gamma(t-vx),\quad x'=\gamma(x-vt),
\quad \gamma=(1-v^2)^{-1/2}
$$

というLorentz変換を考える。

1. 場の作用から $(\partial_t^2-\partial_x^2+m^2)\phi=0$ が出ることを変分から導け。
2. 位相を $t',x'$ で書き、$\omega',k'$ を求め、$\omega'^2-k'^2=m^2$ を直接検算せよ。
3. この波の全空間エネルギーが有限ではない理由を述べ、代わりに $\phi(0,x)=Ae^{-x^2/(2\sigma^2)}$、$\phi_t(0,x)=0$（$\sigma>0$）なら初期エネルギーが有限であることを確認せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** $1+1$ 次元の自由密度は $\mathcal L=[\phi_t^2-\phi_x^2-m^2\phi^2]/2$ です。内部に台がある $\chi$ で $\phi\mapsto\phi+\varepsilon\chi$ とすると

$$
\begin{aligned}
\delta S
&=\int(\phi_t\chi_t-\phi_x\chi_x-m^2\phi\chi)\,dt\,dx\\
&=\int(-\phi_{tt}+\phi_{xx}-m^2\phi)\chi\,dt\,dx.
\end{aligned}
$$

二行目は $t$ と $x$ でそれぞれ部分積分し、台の条件で境界項を零としました。任意の $\chi$ に対して停留する必要十分条件は $\phi_{tt}-\phi_{xx}+m^2\phi=0$ です。

**(2)** 逆変換を明示すると $t=\gamma(t'+vx')$、$x=\gamma(x'+vt')$ です。従って

$$
\begin{aligned}
\omega t-kx
&=\gamma\omega(t'+vx')-\gamma k(x'+vt')\\
&=\gamma(\omega-vk)t'-\gamma(k-v\omega)x',
\end{aligned}
$$

より

$$
\omega'=\gamma(\omega-vk),\qquad
k'=\gamma(k-v\omega).
$$

これを代入して展開すると

$$
\begin{aligned}
\omega'^2-k'^2
&=\gamma^2[(\omega-vk)^2-(k-v\omega)^2]\\
&=\gamma^2[\omega^2-2v\omega k+v^2k^2-k^2+2v\omega k-v^2\omega^2]\\
&=\gamma^2(1-v^2)(\omega^2-k^2)=m^2.
\end{aligned}
$$

また $\omega>|k|$、$|v|<1$ なので $\omega-vk>0$ で、正振動数枝が保たれます。

**(3)** エネルギー密度は $u=(\phi_t^2+\phi_x^2+m^2\phi^2)/2$ です。平面波について

$$
u(t,x)=\frac{A^2}{2}
[(\omega^2+k^2)\sin^2(\omega t-kx)+m^2\cos^2(\omega t-kx)].
$$

$m>0$ かつ $A\ne0$ なので

$$
u(t,x)\ge\frac{A^2}{2}\min(\omega^2+k^2,m^2)>0
$$

が全 $x$ で成立し、$\int_{\mathbb R}u(t,x)\,dx=\infty$ です。一方、Gaussian初期値では $\partial_x\phi(0,x)=-(Ax/\sigma^2)e^{-x^2/(2\sigma^2)}$ なので

$$
E(0)=\frac{A^2}{2}\int_{\mathbb R}
\left(\frac{x^2}{\sigma^4}+m^2\right)e^{-x^2/\sigma^2}\,dx<\infty.
$$

多項式にGaussianを掛けた関数は積分可能です。これにより、無限に広がる平面波解を有限エネルギー解と混同しないことも確認しました。
<!-- solution-end -->

## 8. ここから量子化へ

一粒子の質量殻と同じ分散関係を持つ古典場が、作用原理から生まれました。ただし「平面波の振動数」と「観測される粒子のエネルギー」を同一視するには量子化が必要です。次は並進と内部対称性による流れ・保存の関係を整理した上で、各Fourierモードを調和振動子として量子化する準備をします。
