# SYZ1-16 インスタントン補正と座標の貼り合わせ

<!-- definition-example-audit: strict -->

## 1. 円板の壁を越えたとき、何を貼り直すのか

[前講の正則円板の壁](../SYZ1-15/index.md#thm-syz1-15-wall-location)では、$X=\mathbb C^2\setminus\{xy=1\}$ の滑らかなLagrangeトーラス族について、Maslov指数0の円板が $r=1,\lambda\ne0$ に現れると証明した。[面積と境界ホロノミーの計算](../SYZ1-15/index.md#prop-syz1-15-wall-weights)では、二つの半直線でそれぞれ $T^{2\pi\lambda}h$ と $T^{-2\pi\lambda}h^{-1}$ が得られた。この情報は円板の**存在と重み**であり、符号付き計数そのものではない。

[semi-flat複素チャートの貼り合わせ](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)は、滑らかな整数アフィン構造から指数座標の単項式変換を与える。しかし円板が現れる壁では、座標を同じ単項式だけで同一視した鏡像の記述が期待する円板寄与を取り落とす。そこで、円板の境界に沿うホロノミー文字を用い、壁を跨ぐ際に乗ずる**非単項式の因子**を組み込む。

この講ではまず二次元トーラスの文字の計算から補正変換を作り、次に複数の壁を通る経路の整合条件を検算する。円板計数に由来する係数・壁の向き・解析的収束域は、局所モデルの**入力**として固定する。一般のFloer理論の不変性を、この代数計算だけから主張しない。

## 2. 境界クラスが座標をどの方向へ動かすか

滑らかな向き付きトーラス $L$ の一次ホモロジー群を $H_1(L;\mathbb Z)=\mathbb Z\alpha\oplus\mathbb Z\delta$ とし、交点数の規約を $\alpha\cdot\delta=+1$、$\delta\cdot\alpha=-1$ とする。文字とは、サイクルの和を積へ送る写像 $\gamma\mapsto z^\gamma$ である。基底文字を $x=z^\alpha$、$y=z^\delta$ とすれば

$$
z^{a\alpha+b\delta}=x^a y^b,\qquad a,b\in\mathbb Z.
$$

この積法則は[双対トーラスのホロノミー文字](../SYZ1-10/index.md#prop-syz1-10-holonomy-dual)に対応する。$\delta$ がMaslov指数0の円板の境界クラスであると仮定する。[円板重みの定義](../SYZ1-15/index.md#def-syz1-15-disk-weight)に合わせ、その面積に由来する係数を $q\in\mathbb C^*$ として、円板の単項式重みを $q y$ と書く。たとえば $q=e^{-A/\hbar}$（$A,\hbar>0$）という数値化ができる。ここで $q$ は一つの局所模型で固定した値であり、実際の幾何での面積変化を隠していない。

円板計数に由来する係数を入力として定める**壁関数**を $F(y)$ と呼ぶ。今回は一つの具体的入力

$$
F(y)=1+q y
$$

を中心に扱う。$1$ は補正前の項である。係数 $1$ を円板の存在定理から導いたのではなく、正則化した円板計数からこの壁関数が得られた場合を仮定している。

指数を決める交点数 $\gamma\cdot\delta$ は、向き付きトーラスの一次サイクルの交点数である。交点数の双線形性と交代性（$\delta\cdot\delta=0$）により、$\gamma=a\alpha+b\delta$ なら

$$
\gamma\cdot\delta=a(\alpha\cdot\delta)+b(\delta\cdot\delta)=a.
$$

したがって、基底文字 $x=z^\alpha$ が因子 $F(y)$ を一つ受ける一方、$y=z^\delta$ は受けない。整数 $a<0$ の場合も $F(y)\ne0$ の領域で負の冪が定義できる。

<a id="def-syz1-16-wall-automorphism"></a>

<!-- formal-statement-start -->
> **定義（壁越えの文字変換）**  
> $L$ を向き付き二次元トーラス、$\alpha\cdot\delta=1$ とする。$x=z^\alpha,y=z^\delta$ は非零複素文字、$q\in\mathbb C^*$ は固定係数である。$F(y)=1+qy\ne0$ の領域で、$\delta$ を境界とする壁を正向きに越す座標変換 $\Theta_\delta$ を

$$
\Theta_\delta(z^\gamma)
=z^\gamma F(y)^{\gamma\cdot\delta},
\qquad
\Theta_\delta(x)=x(1+qy),\quad
\Theta_\delta(y)=y
$$

> で定める。反対向きに越す際は $\Theta_\delta^{-1}$ を用いる。この式は壁関数を指定したときの**局所モデル**の定義である。
<!-- formal-statement-end -->

定義の式で指数 $\gamma\cdot\delta$ を採ったのは、この交点数がサイクルの和について加法的であり、文字の積法則と両立するためである。交点規約または横断方向を逆にした場合は、採用する変換の向きも反転させる。

<!-- definition-example-start: def-syz1-16-wall-automorphism -->
### 直接例：二つの生成元とその差

$\gamma=2\alpha-\delta$ なら $z^\gamma=x^2y^{-1}$、$\gamma\cdot\delta=2$ なので

$$
\Theta_\delta(x^2y^{-1})
=x^2y^{-1}(1+qy)^2
=x^2y^{-1}+2qx^2+q^2x^2y.
$$

一方 $\gamma=\delta$ なら $\delta\cdot\delta=0$ で $\Theta_\delta(y)=y$ である。

**定義の確認**：文字の積法則と交点数をそれぞれ計算し、整数の負冪も $x,y\ne0$、$1+qy\ne0$ の下で意味を持つことを確かめた。
<!-- definition-example-end -->

<a id="prop-syz1-16-character-action"></a>

<!-- formal-statement-start -->
> **命題（文字の積法則と逆壁越え）**  
> 上の $\alpha,\delta,x,y,q$ と領域 $1+qy\ne0$ に対し、$\Theta_\delta$ はLaurent文字の積を保つ。逆写像は

$$
\Theta_\delta^{-1}(x)=\frac{x}{1+qy},
\qquad
\Theta_\delta^{-1}(y)=y
$$

> であり、$\Theta_\delta^{-1}\Theta_\delta$ と $\Theta_\delta\Theta_\delta^{-1}$ は恒等写像である。
<!-- formal-statement-end -->

### 証明の見取り図

交点数が加法的であることを使って文字の積を確かめる。壁関数は $y$ の関数で、変換の前後で $y$ は不変なので、逆変換では同じ因子を割ればよい。

<!-- proof-start -->
### 証明

$\gamma=a\alpha+b\delta$、$\eta=c\alpha+d\delta$ と置く。$\gamma\cdot\delta=a$、$\eta\cdot\delta=c$ であるから

$$
\begin{aligned}
\Theta_\delta(z^\gamma)\Theta_\delta(z^\eta)
&=x^ay^bF(y)^a\,x^cy^dF(y)^c\\
&=x^{a+c}y^{b+d}F(y)^{a+c}\\
&=\Theta_\delta(z^{\gamma+\eta}).
\end{aligned}
$$

$x$ と $y$ の像はともに非零で、$F(y)\ne0$ の領域では $x\mapsto xF(y)$ を逆に解いて $x\mapsto x/F(y)$ とできる。実際

$$
\frac{xF(y)}{F(y)}=x,
\qquad
\left(\frac{x}{F(y)}\right)F(y)=x
$$

で、$y$ には変化がない。従って両方の合成は生成元 $x,y$ を固定し、すべてのLaurent文字を固定する。
<!-- proof-end -->

## 3. 補正された複素チャートを実際に貼り合わせる

「補正」という名前だけでは複素構造は定まらない。貼り合わせる各領域と、そこで変換が正則・可逆であることを明示する。

<a id="def-syz1-16-corrected-chart"></a>

<!-- formal-statement-start -->
> **定義（単一壁の補正付き複素チャート）**  
> $q\in\mathbb C^*$ とし、$D=\{y\in\mathbb C^*:1+qy\ne0\}$ と置く。二つの複素チャート $U_\pm=\mathbb C^*\times D$ に座標 $(x_\pm,y_\pm)$ を入れ、重なりにおいて

$$
x_+=x_-(1+qy_-),\qquad y_+=y_-
$$

> で同一視する。この同一視による複素空間の局所的な構成を、壁関数 $1+qy$ を持つ**補正付き貼り合わせ**と呼ぶ。実際の鏡像全体にどの領域を採るかは追加の幾何データに依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-16-corrected-chart -->
### 直接例：$q=1/4$ の二つのチャート

$y_-=1$、$x_-=2$ なら $1+qy_-=5/4\ne0$ なので

$$
(x_+,y_+)=\left(\frac52,1\right),
\qquad
x_-=\frac{5/2}{1+1/4}=2.
$$

$y=-4$ は $1+qy=0$ を満たすので、この二つのチャートの重なりから除外される。

**定義の確認**：両点はそれぞれ $\mathbb C^*\times D$ に属し、前向き・逆向きの式が一致する。除外した点では逆変換を定義できないため、零点除外が不可欠である。
<!-- definition-example-end -->

貼り合わせ後の2形式を確かめるため、ここから $d$ を複素座標 $x,y$ についての外微分、$\wedge$ を1形式の交代積として用いる（特に $dy\wedge dy=0$）。$d\log x$ は $dx/x$ の略記とする。$\log x$ の大域的な一価の枝を選ぶ必要はなく、$x\ne0$ なら $dx/x$ 自体は定義できる。このため、座標変更の前後で $dx/x\wedge dy/y$ が一致するかを調べる。

<a id="prop-syz1-16-holomorphic-gluing"></a>

<!-- formal-statement-start -->
> **命題（単一壁の正則貼り合わせと対数2形式）**  
> $q\in\mathbb C^*$、$U_\pm=\mathbb C^*\times\{y\in\mathbb C^*:1+qy\ne0\}$ に対し、$g:U_-\to U_+$ を $g(x,y)=(x(1+qy),y)$ とする。$g$ は双正則であり、両チャートの2形式

$$
\varpi_\pm=\frac{dx_\pm}{x_\pm}\wedge\frac{dy_\pm}{y_\pm}
$$

> は $g^*\varpi_+=\varpi_-$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

正則性は逆写像を具体的に示せば足りる。2形式は $d\log x$ を変換すると追加される $d\log(1+qy)$ が $dy$ に比例しているため、外積で消える。

<!-- proof-start -->
### 証明

$F(y)=1+qy$ は $D$ 上で正則かつ零点を持たない。従って $g(x,y)=(xF(y),y)$ と $g^{-1}(X,Y)=(X/F(Y),Y)$ は、分母が零にならない開集合上でともに正則であり、前命題と同じ直接計算で互いに逆になる。

$X=xF(y)$、$Y=y$ と置けば、[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)から

$$
\frac{dX}{X}
=\frac{F\,dx+x\,dF}{xF}
=\frac{dx}{x}+\frac{q\,dy}{1+qy},
\qquad
\frac{dY}{Y}=\frac{dy}{y}.
$$

従って

$$
\begin{aligned}
g^*\varpi_+
&=\left(\frac{dx}{x}+\frac{q\,dy}{1+qy}\right)\wedge\frac{dy}{y}\\
&=\frac{dx}{x}\wedge\frac{dy}{y}
+\frac{q}{y(1+qy)}\,dy\wedge dy\\
&=\varpi_-,
\end{aligned}
$$

ここで $dy\wedge dy=0$ を用いた。これで貼り合わせ後も同じ対数2形式が定まる。
<!-- proof-end -->

**どこまでが証明されたか。** この命題は明示した複素開集合に対する正則な貼り合わせの計算であり、補正された空間が一般のCalabi–Yauの鏡像になることの証明ではない。また $y=-1/q$ を覆う別チャートの存在はここからは従わない。

## 4. 二つ以上の壁：順番を変えても同じか

三つのチャート $U_i,U_j,U_k$ の重なりに変換 $g_{ij}:U_i\to U_j$ を与えるとき、$i$ から $k$ への直接変換と、$j$ を経る変換が一致する必要がある。幾何的には同じ点へ至る二つの経路で、最終座標が食い違わない条件である。この**経路整合性**を最小の二壁模型で調べる。

次数ごとの比較では、[形式冪級数の定義](../../../計算系/COMB/COMB9/index.md#def-comb9-formal-series)を二変数に拡張し、$\mathbb C[[x,y]]$ を $x^iy^j$（$i,j\geq0$）の係数を指定した形式的な級数の環とする。$\mathfrak m=(x,y)$ は定数項が零の級数全体からなるイデアルで、$\mathfrak m^N$ は全次数 $N$ 以上の項からなる。定数項が1の級数が可逆であることは、[係数による逆元の構成](../../../計算系/COMB/COMB9/index.md#thm-comb9-unit-criterion)と同じ次数ごとの漸化式で確かめられる。

<a id="def-syz1-16-path-consistency"></a>

<!-- formal-statement-start -->
> **定義（座標遷移の経路整合性）**  
> 複素チャート $U_i,U_j,U_k$ の重なりに双正則な座標変換 $g_{ij}:U_i\to U_j$ が与えられているとする。三重重なりでは

$$
g_{jk}\circ g_{ij}=g_{ik}
$$

> が成り立ち、閉じた経路に沿う変換の合成が恒等写像になることを**経路整合性**という。
>
> また形式冪級数環 $R=\mathbb C[[x,y]]$ とそのイデアル $\mathfrak m=(x,y)$ を用いる場合、各座標の合成結果の差が $\mathfrak m^N$ に入ることを「$\mathfrak m^N$ を法として整合的」という。
<!-- formal-statement-end -->

複数の壁が交差すると、壁変換の交換が一般に失敗する。次の代数モデルでは $x,y$ を形式変数とも見なし、$\mathfrak m^N$ は全次数 $N$ 以上の項からなる。$1+x$ や $1+y$ は定数項が1なので $R$ で可逆である。

<!-- definition-example-start: def-syz1-16-path-consistency -->
### 直接例：二壁の順序で生じるずれ

二つの変換を

$$
A(x,y)=(x(1+y),y),\qquad
B(x,y)=(x,y(1+x))
$$

とする。複素領域では各分母の零点を避ければ、逆変換は $A^{-1}(X,Y)=(X/(1+Y),Y)$、$B^{-1}(X,Y)=(X,Y/(1+X))$ と計算できる。形式冪級数環でも $1+X,1+Y$ の定数項が1なので、この逆変換は有効である。先に $B$、後に $A$ を適用すると

$$
(A\circ B)(x,y)=(x+xy+x^2y,\ y+xy),
$$

先に $A$、後に $B$ なら

$$
(B\circ A)(x,y)=(x+xy,\ y+xy+xy^2).
$$

差は $(x^2y,-xy^2)$ で、$\mathfrak m^3$ に属するが $\mathfrak m^4$ には属さない。

**定義の確認**：二つの経路は $\mathfrak m^3$ を法として一致するが、$\mathfrak m^4$ を法としては一致せず、三次の段階で整合性が破れることを両座標で確認した。
<!-- definition-example-end -->

なぜこのずれが大事なのか。二壁を横切る経路を入れ替えたときの不一致は、交点付近に**新たな補正壁**が必要となる手掛かりである。これが散乱（scattering）という考え方の最初の計算になる。

<a id="prop-syz1-16-first-scattering"></a>

<!-- formal-statement-start -->
> **命題（三次までの散乱補正）**  
> $R=\mathbb C[[x,y]]$、$\mathfrak m=(x,y)$ とし、$A(x,y)=(x(1+y),y)$、$B(x,y)=(x,y(1+x))$ とする。形式的な可逆変換

$$
C(x,y)=\left(x(1+xy),\frac{y}{1+xy}\right)
$$

> を定めると、座標ごとに

$$
C\circ B\circ A\equiv A\circ B\pmod{\mathfrak m^4}
$$

> が成立する。さらに $C$ は対数2形式 $dx/x\wedge dy/y$ を保つ（形式的な有理微分として解釈する）。これは**三次まで**の整合性であり、全次数での散乱完成は意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

二経路の相違は三次項 $(x^2y,-xy^2)$ である。$C$ の最初の非自明項がちょうど $(+x^2y,-xy^2)$ なので、そのずれを相殺できる。さらに $xy$ が $C$ で不変であることから可逆性と2形式の不変性を計算する。

<!-- proof-start -->
### 証明

まず上の直接例の計算を出発点として

$$
\begin{aligned}
(A\circ B)(x,y)&=(x+xy+x^2y,\ y+xy),\\
(B\circ A)(x,y)&=(x+xy,\ y+xy+xy^2)
\end{aligned}
$$

と書く。$(u,v)=(B\circ A)(x,y)$ とすれば

$$
u=x+xy,\qquad v=y+xy+xy^2,
$$

ここで積の全次数を具体的に整理すると

$$
uv=(x+xy)(y+xy+xy^2)
=xy+x^2y+xy^2+2x^2y^2+x^2y^3.
$$

以降 $O(\mathfrak m^k)$ は全次数 $k$ 以上の項を表す。$uv=xy+O(\mathfrak m^3)$ であり、$uv$ の最小次数は2だから、幾何級数の次の項 $(uv)^2$ は全次数4以上である。ゆえに $1/(1+uv)=1-uv+O(\mathfrak m^4)$ とできる。これを各成分に代入すると

$$
\begin{aligned}
C_1(u,v)
&=u(1+uv)
=x+xy+x^2y+O(\mathfrak m^4),\\
C_2(u,v)
&=v(1-uv+O(\mathfrak m^4))\\
&=y+xy+xy^2-xy^2+O(\mathfrak m^4)\\
&=y+xy+O(\mathfrak m^4).
\end{aligned}
$$

従って二つの合成の各成分が $\mathfrak m^4$ を法として一致する。

可逆性は $C_1(x,y)C_2(x,y)=xy$ から得られる。積 $s=xy$ を保つので、$C$ の逆変換は

$$
C^{-1}(X,Y)=\left(\frac{X}{1+XY},Y(1+XY)\right).
$$

ここで $1+XY$ は形式冪級数環の単元であり、二つを合成すれば元の $(x,y)$ に戻る。対数2形式の保存は $s=xy$ と $d\log(1+s)=ds/(1+s)$ を用いて

$$
\begin{aligned}
d\log C_1\wedge d\log C_2
&=\bigl(d\log x+d\log(1+s)\bigr)
\wedge\bigl(d\log y-d\log(1+s)\bigr)\\
&=d\log x\wedge d\log y+
d\log(1+s)\wedge(d\log x+d\log y)\\
&=d\log x\wedge d\log y,
\end{aligned}
$$

と従う。最後の追加項は $d\log(1+s)=s(d\log x+d\log y)/(1+s)$ が同じ1形式に比例するため零になる。ここでの $d\log x$ は形式的に $dx/x$ を表し、必要なら $x,y$ を逆元として加えた微分環で評価する。
<!-- proof-end -->

**計算の読み方。** $A$ と $B$ だけのモデルは四次未満でも衝突し、$C$ を追加すれば三次までを直せる。しかし四次以上にも整合性の条件が残りうる。任意次数までの散乱図式の存在・収束は、この一次補正の手計算では証明されていない。次講のGross–Siebert型構成では、この整合性を構造的に整理する。

## 5. Maslov指数2の項はどこへ行くか

壁関数を作る原因として想定した円板はMaslov指数**0**であった。一方、鏡像の**superpotential（ポテンシャル関数）**はMaslov指数**2**の円板クラスについて符号付き計数を足し合わせる対象であり、二つは役割が異なる。[円板のMaslov指数](../SYZ1-15/index.md#def-syz1-15-maslov) $\mu(\beta)$ は相対円板クラス $\beta$ の境界接平面の位相の巻き数である。[面積と境界ホロノミーによる重み](../SYZ1-15/index.md#def-syz1-15-disk-weight) $z_\beta=T^{A_\omega(\beta)}\rho(\partial\beta)$ では、$A_\omega$ は面積、$\rho$ は境界サイクル上のホロノミー文字、$T$ は形式的な面積変数を表す。指数2の各類に対して符号付き計数 $n_\beta$ が定義され、和が意味を持つという追加仮定の下で考える。

<a id="def-syz1-16-superpotential"></a>

<!-- formal-statement-start -->
> **定義（Maslov指数2の局所superpotential）**  
> $(X,\omega,J)$ をKähler曲面、$L$ をコンパクトLagrangeトーラスとし、Maslov指数 $\mu(\beta)=2$ の相対円板クラスに対して、選んだ正則化理論で符号付き計数 $n_\beta$ が定義されると仮定する。面積 $A_\omega(\beta)$ と境界ホロノミー $\rho(\partial\beta)$ による重み $z_\beta=T^{A_\omega(\beta)}\rho(\partial\beta)$ を使い、和が収束するか形式的に意味を持つ領域で

$$
W_L=\sum_{\mu(\beta)=2}n_\beta z_\beta
$$

> を局所superpotentialという。和に入れるのはMaslov指数2のクラスだけであり、壁関数 $F$ とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-16-superpotential -->
### 直接例：二項ポテンシャルの座標表示

指数2の二つの相対類 $\beta_\alpha,\beta_\delta$ だけが寄与し、その境界がそれぞれ $\partial\beta_\alpha=\alpha$、$\partial\beta_\delta=\delta$ だと仮定する。すると前節の基底文字から、$\rho(\partial\beta_\alpha)=x_-$、$\rho(\partial\beta_\delta)=y_-$ となる。[円板重みの定義](../SYZ1-15/index.md#def-syz1-15-disk-weight)を使って、形式変数 $T$ を数値評価した模型では

$$
\begin{aligned}
a&=n_{\beta_\alpha}T^{A_\omega(\beta_\alpha)},\\
b&=n_{\beta_\delta}T^{A_\omega(\beta_\delta)},\\
W_-(x_-,y_-)&=a x_-+b y_-.
\end{aligned}
$$

ここで $a,b\in\mathbb C$ は面積因子と計数を吸収した**模型の入力**である。二つの相対類のMaslov指数が2であることと、その計数が存在することは仮定しており、境界が $\alpha,\delta$ であるだけでは結論できない。

**定義の確認**：$\mu=2$ と仮定した二種類のクラスのみを和に含め、重み $x_-,y_-$ にそれぞれの係数を掛けた。壁関数の $1+qy$ に使った指数0の寄与を、新たな指数2の一項として加算していない。
<!-- definition-example-end -->

<a id="prop-syz1-16-potential-gluing"></a>

<!-- formal-statement-start -->
> **命題（superpotentialの座標変換）**  
> $q\in\mathbb C^*$、$U_\pm=\mathbb C^*\times\{y\in\mathbb C^*:1+qy\ne0\}$、$x_+=x_-(1+qy_-)$、$y_+=y_-$ とする。マイナス側で正則関数 $W_-(x_-,y_-)=a x_-+b y_-$ が与えられたとき、同じ関数をプラス側で表示するなら

$$
W_+(x_+,y_+)
=\frac{a x_+}{1+qy_+}+b y_+
$$

> と置く必要がある。このとき $W_+\circ g=W_-$ が成り立つ。$a,b$ を実際の指数2の円板計数と同一視するには、別途その計数を構成する必要がある。
<!-- formal-statement-end -->

### 証明の見取り図

座標表示の一致は関数を逆写像で引き戻すことに尽きる。壁関数で割る操作は、新しい円板が存在したという主張とは異なる。

<!-- proof-start -->
### 証明

[単一壁の逆変換](#prop-syz1-16-character-action)を $(x_+,y_+)$ に適用すると

$$
x_-=\frac{x_+}{1+qy_+},
\qquad y_-=y_+.
$$

これを $W_-$ の引数へ代入して

$$
W_-(x_-,y_-)
=a\frac{x_+}{1+qy_+}+b y_+
=W_+(x_+,y_+)
$$

を得る。実際、$g(x_-,y_-)=(x_-(1+qy_-),y_-)$ を右辺に戻せば

$$
W_+\bigl(x_-(1+qy_-),y_-\bigr)
=\frac{a x_-(1+qy_-)}{1+qy_-}+b y_-
=a x_-+b y_-.
$$

従ってチャートの重なりで関数は一致する。$1+qy\ne0$ が分母を許す条件である。
<!-- proof-end -->

$|qy|<1$ の解析的領域では幾何級数を用いて

$$
\frac{a x}{1+qy}
=a x-aqxy+aq^2xy^2-\cdots
$$

と展開できる。右辺の係数をそのまま指数2の円板の符号付き計数と**断定はできない**。そのためには基底・円板クラス・向き・コンパクト性・壁越えでの計数の比較定理が必要である。ここで証明したのは、与えた正則関数が与えた変換の下で貼り合うという代数的事実である。

## 6. 演習：補正変換を自分で検算する

### Level A：文字・逆写像・領域

<a id="ex-syz1-16-a01"></a>
#### SYZ1-16-A01 交点数から冪を決める
- Level: A

$\alpha\cdot\delta=1$、$x=z^\alpha$、$y=z^\delta$、$F=1+qy$ とする。$\gamma=-2\alpha+3\delta$ に対する $\Theta_\delta(z^\gamma)$ を計算し、変換が定義される領域を述べよ。

<!-- solution-start -->
### 詳細解答

$\gamma\cdot\delta=-2(\alpha\cdot\delta)+3(\delta\cdot\delta)=-2$。したがって $z^\gamma=x^{-2}y^3$ に補正因子 $F^{-2}$ を掛け、

$$
\Theta_\delta(z^\gamma)
=\frac{y^3}{x^2(1+qy)^2}.
$$

$x\ne0,y\ne0$ は文字座標の条件、$1+qy\ne0$ は負冪の分母を定義する条件である。$q\ne0$ は固定された壁係数である。
<!-- solution-end -->

<a id="ex-syz1-16-a02"></a>
#### SYZ1-16-A02 単一壁の往復
- Level: A

$g(x,y)=(x(1+2y),y)$ を $x,y\ne0$、$1+2y\ne0$ で考える。$g^{-1}$ を求め、$(x,y)=(3,1)$ の往復を確かめよ。

<!-- solution-start -->
### 詳細解答

$X=x(1+2y),Y=y$ から $y=Y$、$x=X/(1+2Y)$ と順に解ける。よって $g^{-1}(X,Y)=(X/(1+2Y),Y)$。$(3,1)$ は $(9,1)$ に写り、逆変換では $(9/(1+2),1)=(3,1)$ へ戻る。$1+2Y=3\ne0$ が条件を満たす。
<!-- solution-end -->

<a id="ex-syz1-16-a03"></a>
#### SYZ1-16-A03 零点でなぜ貼れないか
- Level: A

$g(x,y)=(x(1+qy),y)$、$q\ne0$ とする。$y=-1/q$ を含めて $g$ を $\mathbb C^{*2}$ の自己同型だと見なせない理由を示せ。

<!-- solution-start -->
### 詳細解答

$y=-1/q$ の点では $1+qy=0$ なので、$x\ne0$ であっても第一成分は $x(1+qy)=0$ となる。$0\notin\mathbb C^*$ だから像が $\mathbb C^{*2}$ に入らない。また逆変換 $x=X/(1+qY)$ は $Y=-1/q$ で分母が零になる。従ってこの点を除く開領域上でのみ双正則な遷移となる。
<!-- solution-end -->

<a id="ex-syz1-16-a04"></a>
#### SYZ1-16-A04 対数2形式の保存
- Level: A

$g(x,y)=(x(1+y^2),y)$ を $x,y\ne0$、$1+y^2\ne0$ の領域で考える。$g^*(dX/X\wedge dY/Y)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$X=x(1+y^2),Y=y$ なので積の微分から

$$
\frac{dX}{X}=\frac{dx}{x}+\frac{2y\,dy}{1+y^2},
\qquad
\frac{dY}{Y}=\frac{dy}{y}.
$$

ゆえに

$$
g^*\left(\frac{dX}{X}\wedge\frac{dY}{Y}\right)
=\frac{dx}{x}\wedge\frac{dy}{y}
+\frac{2}{1+y^2}dy\wedge dy
=\frac{dx}{x}\wedge\frac{dy}{y}.
$$

第二項が消える理由は外積の交代性である。
<!-- solution-end -->

<a id="ex-syz1-16-a05"></a>
#### SYZ1-16-A05 指数0と指数2を分類する
- Level: A

$\mu(\beta_0)=0$、$\mu(\beta_1)=\mu(\beta_2)=2$ の円板類を考え、$\beta_0$ の重みは $qy$、後二者の重みは $x,y$ とする。指数0の情報に仮定した係数を使い $F=1+qy$、指数2の計数を各1とする。壁関数とsuperpotentialを区別して書け。

<!-- solution-start -->
### 詳細解答

壁関数は指定したMaslov指数0の入力により $F=1+qy$。一方、superpotentialは $\mu=2$ のクラスだけの和なので $W=x+y$ である。$qy$ を指数2の第三項として $W=x+y+qy$ とするのは誤りである。ここでの係数1はすべて問題文の仮定であって、円板の存在だけから計数された値ではない。
<!-- solution-end -->

### Level B：貼り合わせの証明・反例・散乱

<a id="ex-syz1-16-b01"></a>
#### SYZ1-16-B01 任意の壁関数で正則貼り合わせ
- Level: B

$D\subset\mathbb C^*$ は開集合、$F:D\to\mathbb C^*$ は正則関数とする。$g(x,y)=(xF(y),y)$ が $\mathbb C^*\times D$ の双正則自己同型で、$dx/x\wedge dy/y$ を保つことを証明せよ。

<!-- solution-start -->
### 詳細解答

$F(y)$ は非零なので、$1/F$ も $D$ 上正則である。従って $g^{-1}(X,Y)=(X/F(Y),Y)$ は同じ空間から同じ空間への正則写像である。合成はどちらの順序でも $(x,y)$ を返す。

$X=xF(y)$ を微分すると $dX=F(y)dx+xF'(y)dy$、ゆえに

$$
\frac{dX}{X}=\frac{dx}{x}+\frac{F'(y)}{F(y)}dy.
$$

これと $dY/Y=dy/y$ の外積は、$dy\wedge dy=0$ のため $dx/x\wedge dy/y$ に等しい。非零性は逆写像の存在に、正則性は両方向の正則性に必要だった。
<!-- solution-end -->

<a id="ex-syz1-16-b02"></a>
#### SYZ1-16-B02 二つの壁の非可換性
- Level: B

$A(x,y)=(x(1+y),y)$、$B(x,y)=(x,y(1+x))$ とする。二つの合成を求め、$(x,y)=(1,1)$ で結果が異なることと、$\mathbb C[[x,y]]$ で差が全次数3から始まることを示せ。

<!-- solution-start -->
### 詳細解答

$B$ を先に適用すると $(x,y(1+x))$ となるから

$$
A(B(x,y))=(x[1+y(1+x)],y(1+x))
=(x+xy+x^2y,y+xy).
$$

$A$ を先に適用すると $(x(1+y),y)$ となるから

$$
B(A(x,y))=(x(1+y),y[1+x(1+y)])
=(x+xy,y+xy+xy^2).
$$

$(1,1)$ では前者が $(3,2)$、後者が $(2,3)$。差は $(x^2y,-xy^2)$ で、各単項式の全次数は3である。したがって $\mathfrak m^3$ を法とする整合性はあるが、$\mathfrak m^4$ を法としては不整合である。
<!-- solution-end -->

<a id="ex-syz1-16-b03"></a>
#### SYZ1-16-B03 三次散乱補正の逆写像
- Level: B

形式冪級数環 $R=\mathbb C[[x,y]]$ において $C(x,y)=(x(1+xy),y/(1+xy))$ と定める。$s=xy$ の不変性、$C^{-1}$、対数2形式の保存を順に検証せよ。

<!-- solution-start -->
### 詳細解答

$C_1C_2=x(1+s)\,y/(1+s)=s$ だから、変換後にも $s$ は同じ値である。変換後の変数を $X,Y$ とすれば $XY=s$ より $x=X/(1+XY)$、$y=Y(1+XY)$ を得る。$1+XY$ は定数項が1の単元なので逆は形式冪級数として存在する。

また $d\log C_1=d\log x+d\log(1+s)$、$d\log C_2=d\log y-d\log(1+s)$。外積を展開した追加部分は $d\log(1+s)\wedge(d\log x+d\log y)$ で、$ds=s(d\log x+d\log y)$ より零。従って $dx/x\wedge dy/y$ が保存される。対数微分は必要な逆元を加えた微分環で解釈する。
<!-- solution-end -->

<a id="ex-syz1-16-b04"></a>
#### SYZ1-16-B04 ポテンシャルの展開域と一意性
- Level: B

$g(x_-,y_-)=(x_-(1+qy_-),y_-)$、$W_-=2x_-+3y_-$ とする。$W_+\circ g=W_-$ を満たす $W_+$ を求め、$|qy_+|<1$ で最初の3項を示せ。$|qy_+|>1$ に同じ級数を無条件に用いられない理由も述べよ。

<!-- solution-start -->
### 詳細解答

$g$ の逆は $x_-=x_+/(1+qy_+),y_-=y_+$ だから

$$
W_+=\frac{2x_+}{1+qy_+}+3y_+.
$$

$g$ は双正則で全射なので、この式以外の $W_+$ が $W_+\circ g=W_-$ を満たすことはできない。$|qy_+|<1$ では $1/(1+t)=1-t+t^2-\cdots$（$t=qy_+$）が収束し、

$$
W_+=2x_+-2qx_+y_++2q^2x_+y_+^2+3y_++\cdots
$$

となる。$|qy_+|>1$ では級数の公比の絶対値が1を超え、収束しない。ただし $1+qy_+\ne0$ の点では分数表示された関数自体は正則であり、級数の不収束と関数の未定義は区別する。
<!-- solution-end -->

### Level C：壁越え・散乱・superpotentialの統合

<a id="ex-syz1-16-c01"></a>
#### SYZ1-16-C01 二壁模型を補正し、関数を貼り合わせる
- Level: C

$R=\mathbb C[[x,y]]$、$\mathfrak m=(x,y)$ とし、$A(x,y)=(x(1+y),y)$、$B(x,y)=(x,y(1+x))$、$C(x,y)=(x(1+xy),y/(1+xy))$ を考える。さらに単一壁の解析的模型で $g(x_-,y_-)=(x_-(1+qy_-),y_-)$（$q\ne0$）を使う。

1. $A\circ B$ と $B\circ A$ を各座標で展開し、最初の不一致次数を求めよ。
2. $C\circ B\circ A\equiv A\circ B\pmod{\mathfrak m^4}$ を分母の級数展開から証明せよ。
3. $C$ の可逆性と対数2形式の保存を確かめよ。
4. $W_-(x_-,y_-)=x_-+2y_-$ を与え、$W_+\circ g=W_-$ を満たす正則関数 $W_+$ とその定義域を求めよ。
5. これらの計算だけでは一般のCalabi–Yauの円板計数も全次数の整合性も保証できない理由を、必要な追加情報とともに述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 二つの経路。** 先に $B$、後に $A$ なら $B(x,y)=(x,y+xy)$ を $A$ に代入し、

$$
A\circ B=(x+x(y+xy),\,y+xy)
=(x+xy+x^2y,\,y+xy).
$$

先に $A$、後に $B$ なら $A(x,y)=(x+xy,y)$ を $B$ に代入し、

$$
B\circ A=(x+xy,\,y+y(x+xy))
=(x+xy,\,y+xy+xy^2).
$$

差は $(x^2y,-xy^2)$。それぞれ全次数3なので $\mathfrak m^4$ を法として初めてずれる。

**(2) 三次の補正。** $(u,v)=B\circ A(x,y)$ とすると

$$
u=x+xy,\quad v=y+xy+xy^2,\quad
uv=xy+x^2y+xy^2+O(\mathfrak m^4).
$$

定数項1の $1+uv$ は可逆で、$1/(1+uv)=1-uv+O(\mathfrak m^4)$。よって

$$
\begin{aligned}
u(1+uv)&=x+xy+x^2y+O(\mathfrak m^4),\\
\frac{v}{1+uv}&=(y+xy+xy^2)(1-xy)+O(\mathfrak m^4)\\
&=y+xy+O(\mathfrak m^4).
\end{aligned}
$$

両成分が $(A\circ B)(x,y)$ に $\mathfrak m^4$ を法として一致する。

**(3) 逆と2形式。** $s=xy$ は $C$ で $x(1+s)y/(1+s)=s$ と保たれる。従って $C^{-1}(X,Y)=(X/(1+XY),Y(1+XY))$。対数微分により

$$
\begin{aligned}
d\log C_1\wedge d\log C_2
&=(d\log x+d\log(1+s))\wedge
(d\log y-d\log(1+s))\\
&=d\log x\wedge d\log y,
\end{aligned}
$$

なぜなら $d\log(1+s)=\frac{s}{1+s}(d\log x+d\log y)$ で、同じ1形式同士の外積が零だからである。

**(4) 関数の貼り合わせ。** $D=\{y\in\mathbb C^*:1+qy\ne0\}$ とし、$U_\pm=\mathbb C^*\times D$ で考える。$g^{-1}(x_+,y_+)=(x_+/(1+qy_+),y_+)$ を $W_-$ に代入して

$$
W_+(x_+,y_+)=\frac{x_+}{1+qy_+}+2y_+.
$$

$U_+$ 上で分母は零でなく、$W_+$ は正則である。実際

$$
W_+(g(x_-,y_-))
=\frac{x_-(1+qy_-)}{1+qy_-}+2y_-
=x_-+2y_-=W_-.
$$

**(5) 成立範囲。** (1)〜(3) は形式的な二壁模型について三次までの一致を示しただけで、四次以降の補正壁・収束は得られていない。(4) は選んだ壁関数とポテンシャルの座標変換を検証したのであって、$q$ やポテンシャルの係数を幾何学的な円板計数から構成していない。実際の鏡像へ進むには、境界Maslov指数0の円板の符号付き計数、指数2の寄与、コンパクト性・横断性・向き・壁に沿う輸送の不変性、収束可能な領域、全周回の整合性が別途必要になる。これらを仮定せずに一般のCalabi–Yauへの結論を延長することはできない。
<!-- solution-end -->

## 7. 次講へ：補正の組合せを幾何へ戻す

この講では、補正因子の入力を一つ選ぶと $x_+=x_-(1+qy)$ が正則なチャートを貼り合わせること、二壁の横断順序が三次で衝突し、追加の変換 $C$ によって三次まで整合させられることを計算した。Maslov指数0の円板はチャートの補正係数に、Maslov指数2の円板はsuperpotentialの各項に反映されるという区別も保たれた。

次の SYZ1-17 では、特異整数アフィン構造と多面体分割から始め、Gross–Siebert型のトロピカル退化・散乱図式がこの整合性をどのように組織化するかを調べる。

参考：[Auroux, *Mirror Symmetry and T-Duality in the Complement of an Anticanonical Divisor*](https://arxiv.org/abs/0706.3207)、[Gross–Siebert, *From Real Affine Geometry to Complex Geometry*](https://annals.math.princeton.edu/2011/174-3/p01)。これらの一般構成を本講の有限次数の代数計算から導いたものではない。
