# GMT24 有限周長集合とGauss--Green測度

<!-- definition-example-audit: strict -->

## 1. 周長に「向き」を与える

前講では、可測集合 $E$ の[相対周長](../GMT23/index.md#def-gmt23-relative-perimeter) $P(E;\Omega)$ を、テスト場の発散の積分から定めました。周長は非負の数なので、直線上の区間の左右の端、あるいは長方形の上下左右の辺を区別しません。しかし境界を通る流量を計算するには、**どちらが外側か**が必要です。

例えば区間 $E=(a,b)\subset\mathbb R$ では、コンパクト台の滑らかな関数 $\varphi$ に対して

$$
\int_E\varphi'(x)\,dx=\varphi(b)-\varphi(a).
$$

右端の外向き方向は $+1$、左端は $-1$ です。周長 $2$ にこの符号を残し、境界が滑らかでない集合にも使えるような表現をこれから定義します。

ここでは $d\ge1$、$\Omega\subset\mathbb R^d$ を開集合とし、すべての集合はLebesgue可測とします。$\chi_E$ は $E$ の指示関数、$\mathcal L^d$ はLebesgue測度、$C_c^1(\Omega;\mathbb R^d)$ はコンパクト台の $C^1$ ベクトル場を表します。$D\chi_E$ は、[GMT21の測度値分布微分](../GMT21/index.md#thm-gmt21-measure-derivative)と同じ約束で

$$
\langle D\chi_E,\varphi\rangle=-\int_E\operatorname{div}\varphi\,dx
$$

と定めます。積分は $\varphi$ の台の近傍だけで行われるため、$|E|=\infty$ でも意味を持ちます。以下、「ほとんど至る所（almost everywhere; a.e.）」は、指定した測度に関して例外集合が零測度であることを意味します。

[GMT23の相対周長](../GMT23/index.md#def-gmt23-relative-perimeter)ではテスト場を $C_c^\infty$ としましたが、本章では $C_c^1$ まで広げても上限は同じです。

実際、コンパクト台の $C^1$ ベクトル場を零で延長し、非負・積分1の平滑化核 $\rho_\varepsilon$ と畳み込んで $\varphi_\varepsilon$ を作ります。十分小さい半径なら台は領域内に留まり、関数とその一階導関数が一様に収束します。

$$
\varphi_\varepsilon\longrightarrow\varphi,\qquad
D\varphi_\varepsilon\longrightarrow D\varphi
\quad\text{一様に}.
$$

さらに $|\varphi|\le1$ なら、核が非負なので次のようにノルムを積分の内側へ移して評価できます。

$$
|\varphi_\varepsilon(x)|
\le\int\rho_\varepsilon(z)|\varphi(x-z)|\,dz
\le\int\rho_\varepsilon(z)\,dz=1
$$

です。発散積分も収束するので、どちらのテスト場で定義しても同じ周長になります。

<a id="def-gmt24-finite-perimeter"></a>

<!-- formal-statement-start -->
> **定義（有限周長集合）**  
> 開集合 $\Omega\subset\mathbb R^d$ とLebesgue可測集合 $E\subset\mathbb R^d$ に対して、[相対周長](../GMT23/index.md#def-gmt23-relative-perimeter)を

$$
P(E;\Omega)=\sup\left\{\int_E\operatorname{div}\varphi\,dx:\ \varphi\in C_c^1(\Omega;\mathbb R^d),\ |\varphi(x)|\le1\right\}
$$

> とする。$P(E;\Omega)<\infty$ なら $E$ を $\Omega$ における**有限周長集合**という。任意の $U\Subset\Omega$ で $P(E;U)<\infty$ なら局所有限周長集合という。$P(E):=P(E;\mathbb R^d)$ を全周長とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt24-finite-perimeter -->
**定義の確認**（半直線）。この定義はGMT23の相対周長を、集合の性質として読み直したものです。$\chi_E\in L^1(\Omega)$ は要求していません。実際、$E=(0,\infty)\subset\mathbb R$ はLebesgue可測、$\Omega=\mathbb R$ は開集合で、$|E|=\infty$ です。

任意の $\varphi\in C_c^1(\mathbb R)$ で $|\varphi|\le1$ なら

$$
\int_E\varphi'(x)\,dx=-\varphi(0)\le1.
$$

一方、$\varphi(0)=-1$ となる滑らかなコンパクト台の許容関数を取れるので上限値は1です。よって $P(E;\mathbb R)=1<\infty$ で、体積が無限でも有限周長であることを定義の全条件から確認できました。
<!-- definition-example-end -->

初めに知っておきたいのは、この定義が**集合の点ごとの形ではなく、ほとんど至る所での値**を見ていることです。$E$ と $F$ の対称差がLebesgue零集合なら、どのテスト場についても $\int_E\operatorname{div}\varphi=\int_F\operatorname{div}\varphi$ なので $P(E;\Omega)=P(F;\Omega)$ です。この違いは第5節の例で重要になります。

## 2. ベクトル値の境界測度とその法線

既習の[ベクトル値測度の全変動と単位方向の表示](../GMT21/index.md#def-gmt21-vector-variation)では、ベクトル値Radon測度 $\mu$ を、その大きさを表す正測度 $|\mu|$ と単位方向 $\sigma_\mu$ に分けました。これを $D\chi_E$ に用いると、境界の「面積」に当たる測度と向きが同時に得られます。ただし**外向き**にするには分布微分のマイナスが必要です。

<a id="def-gmt24-gauss-green"></a>

<!-- formal-statement-start -->
> **定義（Gauss--Green測度と一般化外向き法線）**  
> $E\subset\mathbb R^d$ が開集合 $\Omega$ で有限周長を持つとき、ベクトル値Radon測度

$$
\mathcal G_E:=-D\chi_E
$$

> を $\Omega$ における **Gauss--Green測度**と呼ぶ。$\mathcal G_E$ を[ベクトル値測度の全変動と単位方向の表示](../GMT21/index.md#def-gmt21-vector-variation)に従い

$$
\mathcal G_E=\nu_E\,|\mathcal G_E|,\qquad |\nu_E(x)|=1\quad |\mathcal G_E|\text{-a.e.}
$$

> と書き、$\nu_E$ を（$|\mathcal G_E|$-ほとんど至る所で定まる）**一般化外向き法線**と呼ぶ。$|\mathcal G_E|=|D\chi_E|$ は周長を測る正のRadon測度である。$|\mathcal G_E|$ が零である位置では $\nu_E$ の値は指定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt24-gauss-green -->
**定義の確認**（半直線の向き）。先ほどの $E=(0,\infty)$ では、任意のテスト関数 $\varphi$ に対して

$$
\langle D\chi_E,\varphi\rangle=-\int_0^\infty\varphi'(x)\,dx=\varphi(0).
$$

従って $D\chi_E=\delta_0$、$\mathcal G_E=-\delta_0$ です。この測度は有限Radon測度で、$|\mathcal G_E|=\delta_0$ は正測度、$\nu_E(0)=-1$ は長さ1です。定義式 $\mathcal G_E=\nu_E|\mathcal G_E|$ が成り立ち、$P(E;\mathbb R)=|\mathcal G_E|(\mathbb R)=1$ とも一致します。半直線の外側は左なので、方向の符号も一致します。
<!-- definition-example-end -->

これは法線がすべての位相的境界点で定まるという主張ではありません。後のGMT25では、測度論的な境界点に法線を対応させ、GMT26–27で境界が面として表現できる範囲を証明します。現時点の $\nu_E$ は**全変動測度に関して決まる方向**です。

<a id="thm-gmt24-gauss-green"></a>

<!-- formal-statement-start -->
> **定理（Gauss--Green測度の存在・極分解・双対性）**  
> $\Omega\subset\mathbb R^d$ を開集合、$E\subset\mathbb R^d$ をLebesgue可測集合とする。$P(E;\Omega)<\infty$ と次は同値である：有限な $\mathbb R^d$ 値Radon測度 $\mathcal G$ が $\Omega$ 上に存在し、任意の $\varphi\in C_c^1(\Omega;\mathbb R^d)$ について

$$
\int_E\operatorname{div}\varphi\,dx=\int_\Omega\varphi\cdot d\mathcal G.
$$

> この測度は一意で $\mathcal G=\mathcal G_E=-D\chi_E$ であり、任意の開集合 $A\subset\Omega$ について

$$
P(E;A)=|\mathcal G_E|(A),\qquad
\int_E\operatorname{div}\varphi\,dx
=\int_\Omega\varphi\cdot\nu_E\,d|\mathcal G_E|.
$$

> とくに $P(E;\Omega)=|\mathcal G_E|(\Omega)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

周長の上限は $\varphi\mapsto\int_E\operatorname{div}\varphi$ が一様ノルムに関して有界であることを意味します。これを[測度値分布微分の存在](../GMT21/index.md#thm-gmt21-measure-derivative)へ入力し、符号を反転して $\mathcal G_E$ を得ます。残りは[全変動の双対表示](../GMT21/index.md#thm-gmt21-variation-duality)と測度の単位方向表示です。$E$ が無限体積の場合だけ、コンパクト部分集合上で議論して測度を貼り合わせます。

<!-- proof-start -->
### 証明

$P(E;\Omega)=M<\infty$ とします。$\varphi$ と $-\varphi$ はともに許容されるため、任意の $\varphi\in C_c^1(\Omega;\mathbb R^d)$ について

$$
\left|\int_E\operatorname{div}\varphi\,dx\right|
\le M\|\varphi\|_\infty.
$$

$\Omega$ が有界でなくても $\chi_E\in L^1_{\mathrm{loc}}(\Omega)$ です。閉包が $\Omega$ に収まる開集合 $U\Subset\Omega$ では $\chi_E|_U\in L^1(U)$ なので、[GMT21の測度値微分の表現定理](../GMT21/index.md#thm-gmt21-measure-derivative)を適用できます。

各 $U$ で得た測度は同じ分布 $-D\chi_E$ を表すため、重なりで一致します。$\Omega$ を同種の開集合で増大近似して測度を一意に貼り合わせると、局所有限のベクトル値Radon測度 $\mathcal G_E$ を得ます。

任意の $U\Subset\Omega$ について[全変動測度の双対表示](../GMT21/index.md#thm-gmt21-variation-duality)により

$$
|\mathcal G_E|(U)=P(E;U)\le M.
$$

$U_k\nearrow\Omega$ を取って正測度の[下からの連続性](../../F0/F0-00D2/index.md#thm-f0-00d2-01)を使うと

$$
|\mathcal G_E|(\Omega)
=\lim_{k\to\infty}|\mathcal G_E|(U_k)\le M.
$$

他方、任意の許容場には

$$
\int_E\operatorname{div}\varphi
=\int\varphi\cdot d\mathcal G_E
\le|\mathcal G_E|(\Omega)
$$

が成り立つので、上限を取ると $M\le|\mathcal G_E|(\Omega)$ です。従って等号が成立し、同じ議論を各開集合 $A\subset\Omega$ に制限すれば $P(E;A)=|\mathcal G_E|(A)$ です。

逆に表示を満たす有限なベクトル値測度 $\mathcal G$ があれば、$|\varphi|\le1$ について $\int_E\operatorname{div}\varphi\le|\mathcal G|(\Omega)<\infty$ なので有限周長です。表示の一意性はテスト場が測度を決めることから従います。最後に[ベクトル値測度の単位方向表示](../GMT21/index.md#def-gmt21-vector-variation)を $\mathcal G_E$ に適用し、$\mathcal G_E=\nu_E|\mathcal G_E|$ を代入すると二つ目の公式を得ます。$\square$
<!-- proof-end -->

**符号の検算：** $E=(a,b)\subset\mathbb R$ なら

$$
D\chi_E=\delta_a-\delta_b,\qquad
\mathcal G_E=\delta_b-\delta_a,\qquad
|\mathcal G_E|=\delta_a+\delta_b.
$$

測度の単位方向は $\nu_E(a)=-1$、$\nu_E(b)=+1$ です。これは左端から左へ、右端から右へ向かう外向き方向と一致します。定義の「有限な測度」「全変動」「単位方向」をそれぞれ直接確認できました。

## 3. 滑らかな境界では古典的な外向き法線に戻る

古典的な領域では境界が局所的に $C^1$ 関数のグラフで書け、内部から外部へ向かう単位ベクトル $n$ が決まります。その測度論的な意味を調べましょう。

Hausdorff測度の規約に注意します。[GMT10の正規化](../GMT10/index.md#lem-gmt10-hausdorff-normalization)で、$c_m=\mathcal H^m([0,1]^m)$、$\widehat{\mathcal H}^{\,m}=c_m^{-1}\mathcal H^m$ とします。MT8の $\mathcal H^m$ は直径の $m$ 乗による**非正規化**測度です。滑らかな $(d-1)$ 次元面の面積は $\widehat{\mathcal H}^{\,d-1}$ で表すため、$c_{d-1}$ を勝手に1と置きません（$d=1$ では $\widehat{\mathcal H}^{\,0}$ を点の計数測度とします）。

<a id="prop-gmt24-smooth-boundary"></a>

<!-- formal-statement-start -->
> **命題（滑らかな境界のGauss--Green表示）**  
> $d\ge2$ とし、$E\subset\mathbb R^d$ は開集合で、その境界が開集合 $\Omega$ 内で局所的に $C^1$ グラフで表されるとする。$n$ を幾何学的な外向き単位法線とする。このとき任意の $\varphi\in C_c^1(\Omega;\mathbb R^d)$ に対して

$$
\int_E\operatorname{div}\varphi\,dx
=\int_{\partial E\cap\Omega}\varphi\cdot n\,d\widehat{\mathcal H}^{\,d-1}.
$$

> 特に $\widehat{\mathcal H}^{\,d-1}(\partial E\cap\Omega)<\infty$ なら $E$ は $\Omega$ で有限周長であり、

$$
\mathcal G_E=n\,\widehat{\mathcal H}^{\,d-1}\llcorner(\partial E\cap\Omega),\qquad
P(E;\Omega)=\widehat{\mathcal H}^{\,d-1}(\partial E\cap\Omega).
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず境界が $t=g(y)$ の形のとき、$y$ 方向の微分を積分すると、積分上端 $g(y)$ が動く分だけ $-\nabla g$ が現れます。$t$ 方向の微分からは $+1$ が現れます。この組 $(-\nabla g,1)$ を長さで割ったものが外向き法線です。[整流可能集合の面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)にグラフ写像を代入すると $dy$ を曲面面積へ変換できます。

<!-- proof-start -->
### 証明

局所的に $x=(y,t)\in\mathbb R^{d-1}\times\mathbb R$、$E=\{t<g(y)\}$ とし、$g\in C^1$、$\varphi$ の台がこのグラフ表示の有効な開集合に入るとします。$\partial_{y_i}$ は $t$ を固定した偏微分、$\partial_t$ は $y$ を固定した偏微分です。各 $i\le d-1$ について、$y$ の関数

$$
F_i(y)=\int_{-\infty}^{g(y)}\varphi_i(y,t)\,dt
$$

と置くと、コンパクト台と連鎖律から

$$
\partial_{y_i}F_i(y)
=\int_{-\infty}^{g(y)}\partial_{y_i}\varphi_i(y,t)\,dt
+\varphi_i(y,g(y))\partial_{y_i}g(y).
$$

$F_i$ はコンパクト台を持つので $\int_{\mathbb R^{d-1}}\partial_{y_i}F_i=0$ です。従って

$$
\int_E\partial_{y_i}\varphi_i\,dx
=-\int_{\mathbb R^{d-1}}\varphi_i(y,g(y))\partial_{y_i}g(y)\,dy.
$$

一方、垂直方向は微分積分の基本定理から

$$
\int_E\partial_t\varphi_d\,dx
=\int_{\mathbb R^{d-1}}\varphi_d(y,g(y))\,dy.
$$

和を取ると

$$
\int_E\operatorname{div}\varphi\,dx
=\int_{\mathbb R^{d-1}}
\varphi(y,g(y))\cdot(-\nabla g(y),1)\,dy.
$$

$E$ はグラフの下側なので、外向き単位法線は $n=(-\nabla g,1)/\sqrt{1+|\nabla g|^2}$ です。$e_i\in\mathbb R^{d-1}$ を第 $i$ 成分だけが1で他は0のベクトルとします。グラフ写像 $F(y)=(y,g(y))$ の微分行列の第 $i$ 列は $DF(y)e_i=(e_i,\partial_{y_i}g)$ です。従ってその列どうしの内積を並べたGram行列は

$$
\bigl(DF(y)^{\mathsf T}DF(y)\bigr)_{ij}
=\delta_{ij}+\partial_{y_i}g\,\partial_{y_j}g,
\qquad DF(y)^{\mathsf T}DF(y)=I+\nabla g\otimes\nabla g.
$$

勾配を $v=\nabla g$ と略記します。$vv^{\mathsf T}$ は $v$ 方向に固有値 $|v|^2$、その直交補に固有値0を持つため、$v=0$ の場合も含めて

$$
\det(I+vv^{\mathsf T})=1+|v|^2
$$

です。[m次元幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)の定義に $m=d-1$ を代入すると、面積倍率は

$$
J_{d-1}F=\sqrt{\det(DF^{\mathsf T}DF)}
=\sqrt{1+|\nabla g|^2}.
$$

[整流可能集合の面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)へ単射 $F$ を代入すると、右辺は

$$
\int_{\partial E\cap\text{局所近傍}}
\varphi\cdot n\,d\widehat{\mathcal H}^{\,d-1}
$$

になります。一般の $C^1$ 境界に対しては、$\operatorname{supp}\varphi\cap\partial E$ の有限個のグラフ近傍と境界から離れた近傍を取って分割の一を作ります。各 $\eta_j\varphi$ へ局所式を適用し、$\sum_j\eta_j=1$、$\sum_j\nabla\eta_j=0$ を使えば、重なりで余計な項を作らず式を足し合わせられます。境界から離れた部分の発散積分は0です。$n$ の向きは座標交換後も「内部から外部へ」で一致します。

最後に $\widehat{\mathcal H}^{\,d-1}(\partial E\cap\Omega)<\infty$ なら右辺が有限ベクトル測度を定めます。[Gauss--Green測度の一意性](#thm-gmt24-gauss-green)より $\mathcal G_E=n\widehat{\mathcal H}^{\,d-1}\llcorner\partial E$ です。$|n|=1$ なのでベクトル測度の全変動は $\widehat{\mathcal H}^{\,d-1}$ になり、周長の等式が従います。$\square$
<!-- proof-end -->

### 例1：傾いた境界で符号と面積を確認する

$\Omega=(-1,1)\times\mathbb R$、$E=\{(s,t):t<ms\}$ とします。境界のグラフ写像は $F(s)=(s,ms)$、導関数は $F'(s)=(1,m)$ なので弧長倍率は $\sqrt{1+m^2}$。外向き単位法線は

$$
n=\frac{(-m,1)}{\sqrt{1+m^2}}
$$

です。テスト場への積分から直接

$$
\int_E\operatorname{div}\varphi\,ds\,dt
=\int_{-1}^1\varphi(s,ms)\cdot(-m,1)\,ds
$$

を得ます。ここで $F_\#(v(s)\,ds)$ はグラフ写像 $F$ によって得られるベクトル値の**像測度**を表し、任意のテスト場 $\varphi$ について

$$
\int\varphi\cdot dF_\#(v\,ds)=\int_{-1}^1\varphi(F(s))\cdot v(s)\,ds
$$

と作用します。正の像測度も同様に、任意のスカラー値テスト関数 $h$ について

$$
\int h\,dF_\#(w\,ds)=\int_{-1}^1h(F(s))w(s)\,ds
$$

と定めます。$F$ は単射なので異なる $s$ の測度が互いに打ち消されることはなく、ベクトル像測度の全変動は大きさ $|(-m,1)|=\sqrt{1+m^2}$ の像測度になります。従って $\mathcal G_E=F_\#((-m,1)\,ds)$、$|\mathcal G_E|=F_\#(\sqrt{1+m^2}\,ds)$ です。$P(E;\Omega)=2\sqrt{1+m^2}$ となります。グラフの下側、法線の長さ1、面積倍率の三つを同時に検証できました。

## 4. 球と長方形を測度として計算する

<a id="ref-gmt24-ball-formula"></a>
### 例2：球の外向きフラックス

$d\ge2$、$E=B_R(0)=\{x\in\mathbb R^d:|x|<R\}$、$R>0$ とします。境界上の外向き単位法線は $n(x)=x/R$ です。球面は滑らかでコンパクトなので、[滑らかな境界の表示](#prop-gmt24-smooth-boundary)から

$$
\mathcal G_{B_R}=\frac{x}{R}\,
\widehat{\mathcal H}^{\,d-1}\llcorner\partial B_R,
\qquad
|\mathcal G_{B_R}|=\widehat{\mathcal H}^{\,d-1}\llcorner\partial B_R.
$$

$\omega_d=\mathcal L^d(B_1)$ と置くと、$|B_r|=\omega_dr^d$ です。[GMT14のcoarea公式](../GMT14/index.md#thm-gmt14-coarea)を $f(x)=|x|$（原点を除けば $|\nabla f|=1$）に適用すると、球殻の体積差は球面面積の半径積分になり、球面の相似性から

$$
\omega_d(b^d-a^d)
=\int_a^b\widehat{\mathcal H}^{\,d-1}(\partial B_r)\,dr
=\widehat{\mathcal H}^{\,d-1}(\partial B_1)
\int_a^b r^{d-1}\,dr.
$$

$0<a<b$ は任意なので、$\widehat{\mathcal H}^{\,d-1}(\partial B_1)=d\omega_d$ です。したがって

$$
P(B_R)=d\omega_dR^{d-1},\qquad
P(B_R)=c_{d-1}^{-1}\mathcal H^{d-1}(\partial B_R).
$$

とくに平面の円盤では $P(B_R)=2\pi R$ です。球面の各点で $|n|=1$ なので、周長は符号付き測度の成分和でなく**ベクトル測度の全変動**である点にも注意してください。

<a id="ref-gmt24-rectangle-formula"></a>
### 例3：長方形の各面と角

直方体とその辺長を次で表します。

$$
Q=\prod_{i=1}^d(a_i,b_i),\qquad \ell_i=b_i-a_i>0.
$$

$F_i^+$ は第 $i$ 座標が上端の面、$F_i^-$ は下端の面で、他の座標は開区間内を動きます。$e_i$ は第 $i$ 標準単位ベクトルです。

また $x_{-i}$ は第 $i$ 成分を除いた座標列、$dx_{-i}$ は残りの $d-1$ 座標の積分要素です。固定値 $s$ を第 $i$ 成分に戻した点を

$$
x^{(i)}(s)=(x_1,\ldots,x_{i-1},s,x_{i+1},\ldots,x_d)
$$

と書きます。$d=1$ では空積・零次元積分を1とします。

[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で各座標を積分し、一次元の微分を端点で評価すると

$$
\begin{aligned}
\int_Q\operatorname{div}\varphi\,dx
&=\sum_{i=1}^d\int_{\prod_{j\ne i}(a_j,b_j)}
\bigl[\varphi_i(x^{(i)}(b_i))-\varphi_i(x^{(i)}(a_i))\bigr]\,dx_{-i}.
\end{aligned}
$$

したがって $F_i^+$ に $+e_i$、$F_i^-$ に $-e_i$ の法線が付き、各面の面積を（座標面上のLebesgue測度と一致する）$\widehat{\mathcal H}^{\,d-1}$ で測って

$$
\mathcal G_Q=\sum_{i=1}^d
\bigl(e_i\,\widehat{\mathcal H}^{\,d-1}\llcorner F_i^+
-e_i\,\widehat{\mathcal H}^{\,d-1}\llcorner F_i^-\bigr),
$$

$$
P(Q)=2\sum_{i=1}^d\prod_{j\ne i}\ell_j.
$$

各面は互いに $(d-1)$ 次元測度について重ならないので、その全変動を加えています。角や辺どうしの交線は $(d-1)$ 次元面積零であり、追加のDirac質量はありません。$d=2$、辺長 $a,b$ なら $P(Q)=2(a+b)$ です。

## 5. 集合演算・見かけの境界・極限

### 共有面では向きが打ち消し合う

隣り合う正方形 $Q_1=(0,1)\times(0,1)$、$Q_2=(1,2)\times(0,1)$ を考えます。各正方形は周長4ですが、共有する $x=1$ の面において

$$
\mathcal G_{Q_1}\llcorner\{x=1\}=+e_1\,dy,
\qquad
\mathcal G_{Q_2}\llcorner\{x=1\}=-e_1\,dy.
$$

これらの和は0です。$Q_1\cup Q_2$ と大きな長方形 $(0,2)\times(0,1)$ は共有面の分だけしか異ならず、差はLebesgue零集合です。したがって

$$
\mathcal G_{Q_1\cup Q_2}=\mathcal G_{(0,2)\times(0,1)},\qquad
P(Q_1\cup Q_2)=6<8=P(Q_1)+P(Q_2).
$$

周長を**数だけ足す**と共有面を二重に数えてしまいます。ベクトル値測度の符号を先に足せば内部面は消えます。

<a id="prop-gmt24-set-operations"></a>

<!-- formal-statement-start -->
> **命題（集合演算と相似変換の境界測度恒等式）**
> $E,F\subset\mathbb R^d$ が開集合 $\Omega$ で有限周長を持つとする。補集合 $E^c$ も有限周長を持ち、

$$
\mathcal G_{E^c}=-\mathcal G_E,\qquad P(E^c;\Omega)=P(E;\Omega).
$$

> $E\cup F$、$E\cap F$ が有限周長を持つ場合には

$$
\mathcal G_{E\cup F}+\mathcal G_{E\cap F}
=\mathcal G_E+\mathcal G_F.
$$

> また $a\in\mathbb R^d$、$r>0$、$T(x)=a+rx$ とすると、$T(E)$ は $T(\Omega)$ で有限周長を持ち、

$$
\mathcal G_{T(E)}=r^{d-1}T_\#\mathcal G_E,
\qquad P(T(E);T(\Omega))=r^{d-1}P(E;\Omega).
$$
<!-- formal-statement-end -->

### 証明の見取り図

指示関数の等式 $\chi_{E^c}=1-\chi_E$、$\chi_{E\cup F}+\chi_{E\cap F}=\chi_E+\chi_F$ を分布微分へ入れます。拡大では変数変換の体積倍率 $r^d$ と発散に含まれる微分倍率 $r^{-1}$ が合わさって $r^{d-1}$ になります。

<!-- proof-start -->
### 証明

任意のコンパクト台のテスト場で $\int_\Omega\operatorname{div}\varphi=0$ なので、$\chi_{E^c}=1-\chi_E$ から $D\chi_{E^c}=-D\chi_E$、従って $\mathcal G_{E^c}=-\mathcal G_E$ です。全変動は符号反転で変わりません。

次に集合の指示関数について点ごとの恒等式

$$
\chi_{E\cup F}+\chi_{E\cap F}=\chi_E+\chi_F
$$

があります。両辺に分布微分を作用させ、符号を反転すれば測度の恒等式になります（有限周長の仮定により各項は有限な測度です）。

拡大の式は、$\psi(y)=\varphi(a+ry)$ を用いると $\operatorname{div}_y\psi(y)=r\operatorname{div}_x\varphi(a+ry)$ なので

$$
\begin{aligned}
\int_{T(E)}\operatorname{div}_x\varphi(x)\,dx
&=r^d\int_E\operatorname{div}_x\varphi(a+ry)\,dy\\
&=r^{d-1}\int_E\operatorname{div}_y\psi(y)\,dy\\
&=r^{d-1}\int_\Omega\varphi(Ty)\cdot d\mathcal G_E(y).
\end{aligned}
$$

[一意性](#thm-gmt24-gauss-green)からベクトル測度の式が出ます。$T$ は可逆な相似写像なので $|T_\#\mathcal G_E|=T_\#|\mathcal G_E|$、従って全変動の質量を取って周長の倍率を得ます。$\square$
<!-- proof-end -->

### 位相的境界と周長の測る境界は同じでない

$B=B_1(0)\subset\mathbb R^d$、$N=B\cap\mathbb Q^d$、$E=B\setminus N$ とします。$N$ は可算でLebesgue零、かつ $B$ 内で稠密です。$E$ も $B$ 内で稠密なので、$B$ の**すべての内点**が $E$ とその補集合の双方の閉包に入り、位相的境界は $\partial E=\overline B$ です。

それでも $\chi_E=\chi_B$ がLebesgueほとんど至る所で成り立つため、任意のテスト場について積分が同じです。よって

$$
\mathcal G_E=\mathcal G_B,\qquad
P(E)=P(B)=d\omega_d,\qquad
\partial E=\overline B.
$$

位相的境界の各点へ法線や面積を割り当てて周長を計算する方法は、一般の可測集合では破綻します。有限周長は**$L^1$ 同値類の境界量**として捉えます。

<a id="thm-gmt24-perimeter-compactness"></a>

<!-- formal-statement-start -->
> **定理（有限周長集合の局所コンパクト性と下半連続性）**  
> $\Omega\subset\mathbb R^d$ を開集合とし、Lebesgue可測集合列 $(E_j)$ が、任意の $U\Subset\Omega$ に対して

$$
\sup_jP(E_j;U)<\infty
$$

> を満たすとする。このとき部分列 $(E_{j_k})$ と可測集合 $E$ が存在し、任意の $U\Subset\Omega$ で

$$
\chi_{E_{j_k}}\to\chi_E\quad\text{in }L^1(U)
$$

> となる。さらに任意の開集合 $A\subset\Omega$ で

$$
P(E;A)\le\liminf_{k\to\infty}P(E_{j_k};A).
$$

> 特に $\sup_jP(E_j;\Omega)<\infty$ なら、極限集合は $\Omega$ で有限周長である。
<!-- formal-statement-end -->

### 証明の見取り図

指示関数の局所 $L^1$ ノルムは各有界 $U$ で $|U|$ 以下です。したがって周長の上界と併せて[局所BVコンパクト性](../GMT23/index.md#thm-gmt23-compactness)を使えます。$L^1$ 極限が再び指示関数になることは、さらにほとんど至る所で収束する部分列を取り、値が $0$ または $1$ という事実から確かめます。

<!-- proof-start -->
### 証明

$U\Subset\Omega$ なら $|U|<\infty$ なので

$$
\|\chi_{E_j}\|_{L^1(U)}=|E_j\cap U|\le|U|.
$$

また[相対周長と変動の同一性](#thm-gmt24-gauss-green)から、同じ領域で

$$
|D\chi_{E_j}|(U)=P(E_j;U)\le \sup_j P(E_j;U)<\infty
$$

です。これら二つの上界により指示関数列は[GMT23の局所BV有界列](../GMT23/index.md#def-gmt23-local-bv-bounded)です。[BVの局所L1コンパクト性](../GMT23/index.md#thm-gmt23-compactness)から部分列と局所可積分な極限 $u$ が存在し、各 $U\Subset\Omega$ で $\chi_{E_{j_k}}\to u$ が $L^1(U)$ で成り立ちます。

相対コンパクト開集合を可算個取って領域を尽くし、それぞれの上でさらに部分列を取る対角線法により、同じ部分列がほとんど至る所で点ごとにも収束します。

$$
\chi_{E_{j_k}}(x)\longrightarrow u(x)\in\{0,1\}
\quad\text{a.e. }x\in\Omega.
$$

各指示関数が0か1だけを取るため、極限の値域もこの二点に限られます。$E=\{x\in\Omega:u(x)=1\}$ と置き、領域の外側を任意に補えば、$u=\chi_E$ がほとんど至る所で成り立ちます。

任意の開集合 $A\subset\Omega$ と $\varphi\in C_c^1(A;\mathbb R^d)$ に対し、その台を含む $U\Subset A$ 上での $L^1$ 収束を使うと

$$
\int_E\operatorname{div}\varphi\,dx
=\lim_{k\to\infty}\int_{E_{j_k}}\operatorname{div}\varphi\,dx
\le\liminf_{k\to\infty}P(E_{j_k};A)
$$

です（右辺は $\varphi$ に依存しません）。$|\varphi|\le1$ の許容場で上限を取れば、[有限周長集合の定義](#def-gmt24-finite-perimeter)により下半連続性を得ます。これは[GMT22の全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)を指示関数へ適用した議論と同じです。$A=\Omega$ とすれば最後の主張が従います。$\square$
<!-- proof-end -->

**何が得られ、何がまだ言えないか。** $E_j$ の位相的な境界が収束するとは言っていません。また $P(E;A)$ は一般に $\lim P(E_j;A)$ と等しくありません。小さな振動境界が消えると周長は減り得ます。一方、変動の符号を保持する $\mathcal G_{E_j}$ は、テスト場に対して $\int_{E_j}\operatorname{div}\varphi\to\int_E\operatorname{div}\varphi$ となるため、極限で $\mathcal G_E$ に分布の意味で収束します。有限周長のコンパクト性は、後の周長最小化の出発点です。

## 6. 演習：符号・面積・極限を自分で確かめる

### Level A：定義と最小例

<a id="ex-gmt24-a01"></a>
### GMT24-A01 区間の二つの外向き法線

- Level: A

$E=(2,5)\subset\mathbb R$ とする。$D\chi_E$、$\mathcal G_E$、$|\mathcal G_E|$、$\nu_E$ を求めよ。また $A=(0,4)$ に相対的な $P(E;A)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\varphi\in C_c^1(\mathbb R)$ に対して

$$
\langle D\chi_E,\varphi\rangle
=-\int_2^5\varphi'(x)\,dx
=\varphi(2)-\varphi(5).
$$

したがって[Gauss--Green測度の定義](#def-gmt24-gauss-green)と、二つのDirac測度が互いに特異であることから

$$
D\chi_E=\delta_2-\delta_5,\quad
\mathcal G_E=\delta_5-\delta_2,\quad
|\mathcal G_E|=\delta_2+\delta_5
$$

です。単位方向は点2で $-1$、点5で $+1$ と決まり、どちらも絶対値1です。相対領域 $A=(0,4)$ に入る端点は2のみだから、[周長と全変動の一致](#thm-gmt24-gauss-green)より

$$
P(E;A)=|\mathcal G_E|(A)=1.
$$
<!-- solution-end -->

<a id="ex-gmt24-a02"></a>
### GMT24-A02 半径2の円盤

- Level: A

$B=B_2(0)\subset\mathbb R^2$ とする。$\nu_B$ と $P(B)$ を求めよ。また $\varphi(x)=x$ に円盤を含む近傍で一致する $C_c^1(\mathbb R^2;\mathbb R^2)$ の場 $\widetilde\varphi$ を取り、$\int_B\operatorname{div}\widetilde\varphi$ と境界側の $\int\widetilde\varphi\cdot d\mathcal G_B$ を比較せよ。

<!-- solution-start -->
#### 詳細解答

円周上では $\nu_B(x)=x/2$、[球の周長の計算](#ref-gmt24-ball-formula)と $\omega_2=\pi$ から

$$
P(B)=2\omega_2\cdot2=4\pi.
$$

$\widetilde\varphi$ は円盤上で $\varphi(x)=x$ なので発散は $\partial_1x_1+\partial_2x_2=2$、よって

$$
\int_B\operatorname{div}\widetilde\varphi\,dx
=2|B|=2\pi\cdot2^2=8\pi.
$$

境界上でも $\widetilde\varphi=x$ で $x\cdot\nu_B=|x|^2/2=2$ です。したがって

$$
\int\widetilde\varphi\cdot d\mathcal G_B
=\int_{\partial B}2\,d\mathcal H^1
=2P(B)=8\pi.
$$

左辺と右辺が一致します。ここで $\mathcal H^1$ は $c_1=1$ のため通常の弧長測度です。
<!-- solution-end -->

<a id="ex-gmt24-a03"></a>
### GMT24-A03 長方形の四辺

- Level: A

$Q=(0,3)\times(0,2)$ とする。$\mathcal G_Q$ の各辺の向きと測度を示し、$P(Q)$ を求めよ。角点に原子がない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

任意のテスト場 $\varphi$ について[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用すると

$$
\begin{aligned}
\int_Q\operatorname{div}\varphi\,dx\,dy
&=\int_0^2[\varphi_1(3,y)-\varphi_1(0,y)]\,dy\\
&\quad+\int_0^3[\varphi_2(x,2)-\varphi_2(x,0)]\,dx.
\end{aligned}
$$

右辺の順に右辺 $+e_1$（長さ2）、左辺 $-e_1$（長さ2）、上辺 $+e_2$（長さ3）、下辺 $-e_2$（長さ3）の密度を持ちます。別々の辺は弧長測度に関して互いに特異で、各法線は長さ1なので

$$
P(Q)=2+2+3+3=10.
$$

積分表示には各辺のLebesgue積分しか現れず、有限個の角点は弧長零測度です。したがって角点にDirac成分は生じません。
<!-- solution-end -->

<a id="ex-gmt24-a04"></a>
### GMT24-A04 稠密な零集合の穴

- Level: A

$E=(0,1)\setminus\mathbb Q$ とする。$\partial E$、$D\chi_E$、$P(E;\mathbb R)$ を求め、位相的境界の点の個数を周長として数えられない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

有理数も無理数も $(0,1)$ で稠密なので、内部のどの点も $E$ と $E^c$ の閉包に属します。端点0,1も双方の閉包に属し、区間外の点は $E$ の閉包にないため $\partial E=[0,1]$ です。

$\mathbb Q$ は可算零集合なので $\chi_E=\chi_{(0,1)}$ a.e.です。よって任意のテスト関数への作用は同じで

$$
D\chi_E=\delta_0-\delta_1,
\qquad P(E;\mathbb R)=|D\chi_E|(\mathbb R)=2.
$$

位相的境界は区間全体ですが、分布微分は端点にしか質量を置きません。これは周長が点集合の位相的境界ではなく、指示関数のa.e.同値類に依存するためです。
<!-- solution-end -->

<a id="ex-gmt24-a05"></a>
### GMT24-A05 補集合と相似拡大

- Level: A

$E=B_1(0)\subset\mathbb R^3$、$F=3E+(2,0,0)$ とする。$P(E)$、$P(E^c)$、$P(F)$ を求め、$\mathcal G_{E^c}$ と $\mathcal G_E$ の関係を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\omega_3=4\pi/3$ なので[球の公式](#ref-gmt24-ball-formula)から

$$
P(E)=3\omega_3=4\pi.
$$

[集合演算と相似変換の境界測度恒等式](#prop-gmt24-set-operations)を適用すると

$$
\mathcal G_{E^c}=-\mathcal G_E,
\quad P(E^c)=P(E)=4\pi,
\quad P(F)=3^{3-1}P(E)=36\pi.
$$

補集合では外向き法線が逆向きになり、全変動の大きさは変わりません。拡大では面積が相似比の2乗で変化します。
<!-- solution-end -->

### Level B：導出と仮定を組み立てる

<a id="ex-gmt24-b01"></a>
### GMT24-B01 傾いた直線のフラックスを一から導く

- Level: B

$\Omega=(-2,2)\times\mathbb R$、$E=\{(s,t):t<2s\}$ とする。任意の $\varphi\in C_c^1(\Omega;\mathbb R^2)$ から $\int_E\operatorname{div}\varphi$ を直接導き、$\nu_E$、$P(E;\Omega)$ を求めよ。単に「傾きから長さが分かる」とせず、積分上端の微分も示すこと。

<!-- solution-start -->
#### 詳細解答

$F(s)=\int_{-\infty}^{2s}\varphi_1(s,t)\,dt$ と置きます。ここで $F'(s)=dF/ds$ は $s$ の通常の導関数で、$\partial_s\varphi_1$ は $t$ を固定する偏導関数です。積分上端 $2s$ の導関数が2であることを使って微分すると

$$
F'(s)=\int_{-\infty}^{2s}\partial_s\varphi_1(s,t)\,dt
+2\varphi_1(s,2s).
$$

$F$ はコンパクト台を持つので $\int F'=0$。垂直成分は $\int_{-\infty}^{2s}\partial_t\varphi_2(s,t)dt=\varphi_2(s,2s)$ です。従って

$$
\int_E\operatorname{div}\varphi\,ds\,dt
=\int_{-2}^2[-2\varphi_1(s,2s)+\varphi_2(s,2s)]\,ds.
$$

よってグラフ写像 $T(s)=(s,2s)$ に沿う測度は $\mathcal G_E=T_\#((-2,1)ds)$、その全変動は $T_\#(\sqrt5\,ds)$ です。[Gauss--Green測度の定義](#def-gmt24-gauss-green)にある単位方向は $\nu_E=(-2,1)/\sqrt5$。$s\in(-2,2)$ の長さが4なので

$$
P(E;\Omega)=\int_{-2}^2\sqrt5\,ds=4\sqrt5.
$$
<!-- solution-end -->

<a id="ex-gmt24-b02"></a>
### GMT24-B02 共有辺の相殺と外側だけの周長

- Level: B

$Q_1=(0,1)\times(0,2)$、$Q_2=(1,3)\times(0,2)$ とする。各集合の $P$ を求め、共有辺における $\mathcal G_{Q_1}$、$\mathcal G_{Q_2}$ の制限を示せ。続いて $P(Q_1\cup Q_2)$ を、測度の相殺と長方形の公式の両方で計算せよ。

<!-- solution-start -->
#### 詳細解答

各長方形の辺長は $(1,2)$、$(2,2)$ なので、[長方形の測度計算](#ref-gmt24-rectangle-formula)から $P(Q_1)=2(1+2)=6$、$P(Q_2)=2(2+2)=8$ です。

共有辺 $S=\{1\}\times(0,2)$ で $Q_1$ の外向き法線は $+e_1$、$Q_2$ では $-e_1$。従って

$$
\mathcal G_{Q_1}\llcorner S=e_1\mathcal H^1\llcorner S,
\quad\mathcal G_{Q_2}\llcorner S=-e_1\mathcal H^1\llcorner S.
$$

和は0です。共有面以外の辺どうしは弧長測度の意味で重ならないので、残る全変動は $6+8-2\cdot2=10$ です。実際、$Q_1\cup Q_2$ は $R=(0,3)\times(0,2)$ とLebesgue零集合だけ異なり、$P(R)=2(3+2)=10$ と一致します。共有辺を2回引くのは両長方形で各2ずつ数えていたからです。
<!-- solution-end -->

<a id="ex-gmt24-b03"></a>
### GMT24-B03 周長有界な集合列の極限

- Level: B

$\Omega=(0,1)^2$、$E_j\subset\Omega$ が可測で $P(E_j;\Omega)\le C$ を満たすとする。$L^1(\Omega)$ 収束部分列の存在は一般にはそのまま主張せず、まず $L^1_{\mathrm{loc}}(\Omega)$ 収束部分列とその極限が指示関数となることを証明せよ。さらに任意の $U\Subset\Omega$ での周長下界を示せ。

<!-- solution-start -->
#### 詳細解答

各 $U\Subset\Omega$ に対して

$$
\|\chi_{E_j}\|_{L^1(U)}=|E_j\cap U|\le|U|,
\qquad |D\chi_{E_j}|(U)=P(E_j;U)\le C.
$$

この二つの一様上界を[GMT23の局所BVコンパクト性](../GMT23/index.md#thm-gmt23-compactness)へ入力すると、部分列が $L^1_{\mathrm{loc}}$ で関数 $u$ に収束します。

$\Omega$ を閉包が内部に収まる開集合で可算に尽くします。各集合上の $L^1$ 収束から、対角線法で同じ部分列を取り直せば

$$
\chi_{E_{j_k}}(x)\to u(x)\quad\text{ほとんど至る所で}
$$

となります。各左辺は0または1なので $u$ もその二値のみを取り、$u=\chi_E$ となる可測集合 $E$ が得られます。

任意の $U\Subset\Omega$ 上のテスト場 $|\varphi|\le1$ について $L^1(U)$ 収束と $\|\operatorname{div}\varphi\|_\infty<\infty$ から

$$
\int_E\operatorname{div}\varphi
=\lim_k\int_{E_{j_k}}\operatorname{div}\varphi
\le\liminf_kP(E_{j_k};U).
$$

上限を取って $P(E;U)\le\liminf_kP(E_{j_k};U)\le C$ です。$U$ を尽くせば $P(E;\Omega)\le C$ も得ます。境界近くで $L^1$ が収束することまでは、局所コンパクト性だけでは保証していません。
<!-- solution-end -->

<a id="ex-gmt24-b04"></a>
### GMT24-B04 発散定理をテスト場で検算する

- Level: B

$Q=(0,1)^2$ とし、$Q$ を含む開近傍で $\varphi(x,y)=(x,y)$ に一致する $\varphi\in C_c^1(\mathbb R^2;\mathbb R^2)$ を取る。$\int_Q\operatorname{div}\varphi$ と $\int\varphi\cdot d\mathcal G_Q$ を別々に計算せよ。全空間で $(x,y)$ 自体をテスト場とできない理由も説明せよ。

<!-- solution-start -->
#### 詳細解答

$Q$ 上で $\operatorname{div}\varphi=\partial_xx+\partial_yy=2$ なので

$$
\int_Q\operatorname{div}\varphi\,dx\,dy=2|Q|=2.
$$

境界では右辺 $x=1$ の法線が $(1,0)$ で $\varphi\cdot n=1$、上辺 $y=1$ でも $\varphi\cdot n=1$ です。左辺 $x=0$ と下辺 $y=0$ の積は0なので

$$
\int\varphi\cdot d\mathcal G_Q
=\int_0^1 1\,dy+\int_0^1 1\,dx=2.
$$

両者は一致します。$\varphi(x,y)=(x,y)$ を全空間にそのまま延長すると台がコンパクトでなく、[Gauss--Greenの定義](#thm-gmt24-gauss-green)にあるテスト場の条件を満たしません。$Q$ を含む近傍で1となる滑らかな切断関数を掛ければ、積分値を変えずに許容場が作れます。
<!-- solution-end -->

### Level C：複数概念を結合する

<a id="ex-gmt24-c01"></a>
### GMT24-C01 内部の境界と見かけの穴

- Level: C

$Q_1=(0,1)^2$、$Q_2=(1,2)\times(0,1)$、$N=(Q_1\cup Q_2)\cap\mathbb Q^2$ とし、$E=(Q_1\cup Q_2)\setminus N$ とする。

1. $\mathcal G_E$、$P(E)$ を外側の四辺と共有辺の寄与から求めよ。
2. $\partial E$ と、$P(E)$ が位相的境界を単純に数えた量ではない理由を説明せよ。
3. $P(E^c)$ と $P(2E)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず $N$ と共有線分 $S=\{1\}\times(0,1)$ はLebesgue零集合です。従って $E$ は $R=(0,2)\times(0,1)$ とa.e.で一致し、テスト場に対する分布微分も一致します。各 $Q_i$ の境界測度を足すと、$S$ 上の $+e_1$ と $-e_1$ は互いに相殺されます。残る測度は

$$
\begin{aligned}
\mathcal G_E
={}&-e_1\mathcal H^1\llcorner(\{0\}\times(0,1))
+e_1\mathcal H^1\llcorner(\{2\}\times(0,1))\\
&-e_2\mathcal H^1\llcorner((0,2)\times\{0\})
+e_2\mathcal H^1\llcorner((0,2)\times\{1\}).
\end{aligned}
$$

各面の法線の長さは1、各交点は弧長零なので

$$
P(E)=1+1+2+2=6.
$$

有理点 $N$ は $Q_1\cup Q_2$ の内部で稠密で、無理点を含む $E$ もその内部で稠密です。共有線の点も両側から $E$ に近づけます。したがって $\partial E=[0,2]\times[0,1]$（閉長方形）です。内点まで位相的境界に含まれますが、分布微分は外側の四辺にのみ質量を置き、数値周長は6です。

最後に[集合演算と拡大の恒等式](#prop-gmt24-set-operations)を用い、$d=2$、$r=2$ を代入すると

$$
P(E^c)=P(E)=6,
\qquad P(2E)=2^{2-1}P(E)=12.
$$
<!-- solution-end -->

<a id="ex-gmt24-c02"></a>
### GMT24-C02 二段の高さを持つBV関数と周長coarea

- Level: C

$Q_1=(0,1)\times(0,1)$、$Q_2=(1,2)\times(0,1)$ とし、$u=2\chi_{Q_1}+\chi_{Q_2}$ を $\mathbb R^2$ 上で考える。

1. $Du$ の各辺（共有界面を含む）の密度と $|Du|(\mathbb R^2)$ を求めよ。
2. $E_t=\{u>t\}$ の周長を高さ $t$ ごとに調べ、[BV coarea公式](../GMT23/index.md#thm-gmt23-bv-coarea)の両辺を検算せよ。
3. 二つの正方形の周長を重み付きで単純加算した $2P(Q_1)+P(Q_2)$ と異なる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

[分布微分の線形性](../GMT21/index.md#thm-gmt21-measure-derivative)により

$$
Du=2D\chi_{Q_1}+D\chi_{Q_2}
=-(2\mathcal G_{Q_1}+\mathcal G_{Q_2})
$$

です。まず $\mathcal G=-Du$ の密度を、外向き方向で数えます。垂直辺では左端、共有面、右端の順に

$$
x=0:\ -2e_1,\qquad
x=1:\ 2e_1-e_1=e_1,\qquad
x=2:\ e_1
$$

となります。水平辺では上下それぞれの密度が、左の正方形の区間で $-2e_2,+2e_2$、右の区間で $-e_2,+e_2$ です。求める $Du$ の密度はこれらのすべてのベクトルの**反対向き**です。

各辺の長さは1、交点は弧長零です。したがって $Du$ の全変動は、垂直三辺が $2+1+1=4$、水平上下の寄与が $2(2+1)=6$ で

$$
|Du|(\mathbb R^2)=4+6=10.
$$

次に高さごとの超水準集合は（端点高さを除いて）

$$
E_t=\begin{cases}
\mathbb R^2,&t<0,\\
Q_1\cup Q_2,&0<t<1,\\
Q_1,&1<t<2,\\
\varnothing,&t>2.
\end{cases}
$$

$t<0$ と $t>2$ で周長0、$0<t<1$ では和集合が大きな長方形とa.e.等しいので周長6、$1<t<2$ では正方形 $Q_1$ の周長4です。よって

$$
\int_{\mathbb R}P(E_t;\mathbb R^2)\,dt
=\int_0^1 6\,dt+\int_1^2 4\,dt
=6+4=10=|Du|(\mathbb R^2).
$$

単純加算では $2P(Q_1)+P(Q_2)=2\cdot4+4=12$ になります。しかし $x=1$ の共有界面には重み2の右向き流量と重み1の左向き流量があり、合成すると大きさは $|2-1|=1$ です。重み付き和の大きさ $2+1=3$ より2だけ小さくなり、12から10へ減ります。これはベクトル測度を先に合成してから全変動を取るためです。
<!-- solution-end -->

## 7. 次の講義への橋

有限周長集合では、位相的境界がどれほど粗くても $\mathcal G_E=\nu_E|\mathcal G_E|$ という符号付きの境界量が作れました。ただし $\nu_E$ は現段階では測度の全変動に関する方向でしかなく、どの点に幾何的な法線があるか、そこで集合がどのように半空間へ近づくかは未解決です。

次の **GMT25「reduced boundaryと測度論的法線」**では、その法線を点の密度と平均方向で特徴付け、滑らかな境界から粗い境界への橋をさらに架けます。
