# GR27 Kruskal座標と最大解析延長

<!-- definition-example-audit: strict -->

[GR26の入射・出射Eddington–Finkelstein（EF）座標](../GR26/index.md#def-gr26-null-times)は、Schwarzschild地平線をそれぞれ別の向きから横断できました。ただし入射座標だけでは過去側の地平線が、出射座標だけでは未来側の地平線が見えません。「二つとも正則なら、すべての領域を一枚の地図に描けないか」が今回の問いです。

答えは、二つの零時刻を**指数関数で変換する**ことです。指数の符号と定義域を丁寧に追うと、地平線が二本の零直線になり、永遠に存在するSchwarzschild真空解には二つの外部、ブラックホール内部、ホワイトホール内部が現れます。ただし、現実の星の崩壊による時空がこれら四領域をすべて含むわけではありません。

以下、$G>0$、$M>0$、$c>0$、$r_s:=2GM/c^2>0$ とし、計量の符号を $(-,+,+,+)$ とします。$x^0=ct$、$u,v,r,U,V,T,X$ は、$U,V,T,X$ だけを無次元、ほかを長さ次元とします。$d\Omega^2$ は単位二球面の計量です。球面座標の極での振る舞いと、地平線での座標の振る舞いは別々に判定します。

## 1. 二つの零時刻を同時に使う

[GR16のSchwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)を静的外部 $r>r_s$ に限り、

$$
f(r):=1-\frac{r_s}{r},\qquad
ds^2=-f(dx^0)^2+f^{-1}dr^2+r^2d\Omega^2
$$

と書きます。[GR26のtortoise座標](../GR26/index.md#def-gr26-tortoise)は、外部で

$$
r_*=r+r_s\log\left(\frac r{r_s}-1\right),\qquad
\frac{dr_*}{dr}=\frac1f
$$

を満たします。入射零時刻 $v=x^0+r_*$、出射零時刻 $u=x^0-r_*$ から

$$
dx^0=\frac{du+dv}{2},\qquad dr_*=\frac{dv-du}{2}
$$

を得ます。半径方向の計量は $-f(dx^0)^2+f(dr_*)^2$ なので、代入して

$$
\begin{aligned}
-f(dx^0)^2+f(dr_*)^2
&=-\frac f4(du+dv)^2+\frac f4(dv-du)^2\\
&=-f\,du\,dv.
\end{aligned}
$$

ここで $du\,dv$ は対称な計量の二次形式としての積です（例えば $g_{uv}=g_{vu}=-f/2$）。$u$ 一定と $v$ 一定はともに動径零方向ですが、入射EFの $v$ は未来地平線で有限でも $u$ は一般に発散し、過去地平線では逆になります。両方を同時に使う外部の $(u,v)$ 表示は、地平線を横断する一枚の正則な座標にはなりません。そこで発散を打ち消す指数関数を作ります。

## 2. 指数変換で地平線の発散を消す

外部で $u$ が大きくなる未来地平線には $\exp(-u/(2r_s))$、$v$ が小さくなる過去地平線には $\exp(v/(2r_s))$ が適しています。外部の未来向き零方向を後から連続的に追いやすいよう、一方だけ符号を負にしておきます。

<a id="def-gr27-kruskal-nulls"></a>

<!-- formal-statement-start -->
> **定義（外部のKruskal零座標）**
> $M>0$ のSchwarzschild静的外部 $r>r_s$ で、[入射・出射零時刻](../GR26/index.md#def-gr26-null-times) $v=x^0+r_*$、$u=x^0-r_*$ から無次元の零座標を

$$
\boxed{U:=-e^{-u/(2r_s)},\qquad V:=e^{v/(2r_s)}}
$$

> と定める。ここで定義された外部の値域は $U<0,V>0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr27-kruskal-nulls -->
**定義の確認**。外部では指数関数が正なので、$U<0$ と $V>0$ が確かに成立します。逆にこの符号の領域では

$$
u=-2r_s\log(-U),\qquad v=2r_s\log V
$$

です。従って $(u,v)\leftrightarrow(U,V)$ は外部で滑らかな可逆変換です。例えば $x^0=0,r=2r_s$ では $r_*=2r_s$ なので、定義式への代入から

$$
u=-2r_s,\quad v=2r_s,\quad U=-e,\quad V=e,\quad UV=-e^2
$$

を得ます。これは以下で導く半径の関係式とも一致します。
<!-- definition-example-end -->

<a id="prop-gr27-regular-metric"></a>

<!-- formal-statement-start -->
> **命題（Kruskal計量の導出と地平線の正則性）**
> $M>0$ のSchwarzschild外部 $r>r_s$ から上の $U,V$ へ変換すると、半径 $r$ と座標積の関係および計量は

$$
\boxed{UV=\left(1-\frac r{r_s}\right)e^{r/r_s}},
$$

$$
\boxed{ds^2=-\frac{4r_s^3}{r}e^{-r/r_s}\,dU\,dV+r^2d\Omega^2.}
$$

> 右辺は半径を後述の関係式から $r>0$ として定めることにより、$U=0$ および $V=0$ を含む実解析的・非退化のLorentz計量になる。ここで「実解析的」とは局所座標で成分が収束冪級数に展開できることをいう。
<!-- formal-statement-end -->

### 証明の見取り図

$UV$ を取ると静的時刻 $x^0$ が消え、半径だけの関数になります。二重零計量の係数に現れる $f/(UV)$ で、$r=r_s$ の零と指数の零・発散が相殺されます。最後は座標変換のJacobianではなく、延長した計量の行列式を調べます。

<!-- proof-start -->
### 証明

[tortoise座標の式](../GR26/index.md#def-gr26-tortoise)と $v-u=2r_*$ から

$$
\begin{aligned}
UV&=-\exp\left(\frac{v-u}{2r_s}\right)
=-e^{r_*/r_s}\\
&=-e^{r/r_s}\exp\left(\log\left(\frac r{r_s}-1\right)\right)\\
&=\left(1-\frac r{r_s}\right)e^{r/r_s}.
\end{aligned}
$$

微分は $dU=-(U/(2r_s))du$、$dV=(V/(2r_s))dv$ なので、$U,V$ が外部の符号を持つ間は

$$
du=-\frac{2r_s}{U}dU,\qquad
dv=\frac{2r_s}{V}dV.
$$

これを前節の $-f\,du\,dv$ へ代入して

$$
\begin{aligned}
-f\,du\,dv
&=\frac{4r_s^2f}{UV}\,dU\,dV\\
&=4r_s^2\frac{(r-r_s)/r}{-(r-r_s)e^{r/r_s}/r_s}\,dU\,dV\\
&=-\frac{4r_s^3}{r}e^{-r/r_s}\,dU\,dV.
\end{aligned}
$$

ここまでは $r>r_s$ の変換です。延長して $r=r_s$ と置くと、二重零係数は $-4r_s^2/e$ と有限・非零です。この係数を計量の非退化性へ結び付けます。座標基底 $(\partial_U,\partial_V)$ に対する成分 $g_{ab}=g(\partial_a,\partial_b)$ を考えると、対称性から交差項は $2g_{UV}\,dU\,dV$ です。従って

$$
g_{UU}=g_{VV}=0,\qquad
g_{UV}=g_{VU}=-\frac{2r_s^3}{r}e^{-r/r_s}.
$$

$A(r):=2r_s^3e^{-r/r_s}/r>0$ と略記すれば、成分行列とその逆は

$$
(g_{ab})_{U,V}=\begin{pmatrix}0&-A\\-A&0\end{pmatrix},\quad
\det(g_{ab})_{U,V}=-A^2<0,\quad
(g^{ab})_{U,V}=\begin{pmatrix}0&-A^{-1}\\-A^{-1}&0\end{pmatrix}.
$$

この二次元ブロックの固有値は $-A,A$ です。[双線形形式の非退化性と行列式の同値](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix)を座標基底に適用すると、$\det g_{(U,V)}\ne0$ が非退化性を意味します。球面方向は正定値なので、[Lorentz計量の慣性指数の条件](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)も満たし、$r>0$ の全域で符号は $(-,+,+,+)$ です。球面座標の極では別の球面チャートに替えます。半径の実解析的な依存性は次節で確定します。$\square$
<!-- proof-end -->

ここで重要なのは、外部の $U=-e^{-u/(2r_s)}$ という**座標変換の式を地平線の向こうへ代入した**わけではないことです。新しい領域を作るのは、$r>0$ の関係式と滑らかな計量を独立に定め直す操作です。

## 3. 関係式を逆に解いて四領域を作る

半径を座標の関数と見なすため、無次元変数 $y=r/r_s>0$ と関数 $F(y):=(1-y)e^y$ を使います。$F$ が単調ならば、$UV$ から $r$ が一意に決まり、計量に多価性が生じません。

<a id="def-gr27-kruskal-domain"></a>

<!-- formal-statement-start -->
> **定義（Kruskal領域とその時間・空間座標）**
> $r_s>0$ を固定し、二次元の座標領域を $\mathcal K:=\{(U,V)\in\mathbb R^2:UV<1\}$ とする。各点で $UV=(1-r/r_s)e^{r/r_s}$ を満たす半径 $r=r(U,V)>0$ を採用し、$\mathcal K\times S^2$ に[上記のKruskal計量](#prop-gr27-regular-metric)を入れる。この時空をKruskal延長という。また

$$
\boxed{T:=\frac{V+U}{2},\qquad X:=\frac{V-U}{2}}
$$

> をKruskalの時間・空間座標とし、$U=T-X$、$V=T+X$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr27-kruskal-domain -->
**定義の確認**。$y=1$ のとき $UV=0$ ですから、$U=0$ と $V=0$ の二本の軸はどちらも半径 $r_s$ に当たります。$U=V=0$ も許され、このとき角度ごとに一つの点があり、全体は半径 $r_s$ の二球面です。一方、$U=V=1$ は $UV=1$ なので領域外です。$U=-1,V=1$ は $UV=-1<1$ で許され、$r>r_s$ に対応します。このように符号が異なる点と、二つとも正または負の点が同じ領域に入っています。
<!-- definition-example-end -->

<a id="prop-gr27-radius-unique"></a>

<!-- formal-statement-start -->
> **命題（半径の一意性と正則な大域表示）**
> 関数 $F:(0,\infty)\to(-\infty,1)$、$F(y)=(1-y)e^y$ は実解析的な狭義単調減少全単射で、各点で $F'(y)\ne0$ を満たす。従って上の $\mathcal K$ の任意の点に対して $r(U,V)>0$ が一意かつ実解析的に定まり、[Kruskal計量](#prop-gr27-regular-metric)は $U,V$ の座標軸の交点を含めて正則である。また $T,X$ 表示の計量と領域は

$$
\boxed{ds^2=\frac{4r_s^3}{r}e^{-r/r_s}(-dT^2+dX^2)+r^2d\Omega^2,}
$$

$$
\boxed{T^2-X^2<1.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$F$ の端点値・導関数を確認します。[RA6Aの逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)は導関数が零でない点での $C^1$ 級の局所逆を保証します。さらに実解析性を結論するために、実解析的な関数に対しては逆関数も局所的に実解析的になるという強化版を用います。後者の一般定理の証明は解析学の別課題として本章の範囲外とし、ここではその仮定と地平線近くの級数を直接検算します。$T,X$ への変換では $dU\,dV=dT^2-dX^2$ に注意します。

<!-- proof-start -->
### 証明

積の微分を行うと

$$
F'(y)=(-1)e^y+(1-y)e^y=-ye^y<0\quad(y>0).
$$

さらに

$$
\lim_{y\downarrow0}F(y)=1,\qquad
F(1)=0,\qquad
\lim_{y\to\infty}F(y)=-\infty.
$$

連続性、狭義単調性、両端の極限から値域が $(-\infty,1)$ であると分かります。$F$ は開区間 $(0,\infty)$ 上で実解析的であり、各点の $F'(y)\ne0$ を確認したので、上記の局所逆の実解析的な強化が適用でき、$y=F^{-1}(UV)$ も実解析的です。逆関数は一意なので局所解どうしは重なりで一致し、$\mathcal K$ 全体で実解析的な $r=r_sF^{-1}(UV)>0$ を与えます。

特に地平線の $UV=0$ では $y=1$、$F'(1)=-e\ne0$ です。$s:=UV$、$y=1+\delta$ と置けば $s=-e\delta e^\delta$ となり、指数を展開して係数を比較すると

$$
\begin{aligned}
-\frac{s}{e}&=\delta+\delta^2+\frac12\delta^3+O(\delta^4),\\
\delta&=-\frac{s}{e}-\frac{s^2}{e^2}-\frac{3s^3}{2e^3}+O(s^4).
\end{aligned}
$$

この局所展開も、地平線を挟んで半径が有限な解析関数としてつながることを具体的に示しています。収束性に使ったのは、[RA6Aの逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)の $C^1$ 結論そのものではなく、上で明示した実解析的な強化版です。

定義式 $U=T-X,V=T+X$ により

$$
dU\,dV=(dT-dX)(dT+dX)=dT^2-dX^2,
$$

かつ $UV=(T-X)(T+X)=T^2-X^2$ です。これを[計量の式](#prop-gr27-regular-metric)へ代入して、主張の両式を得ます。係数は $r>0$ で正なので $\partial_T$ はどこでも時間的です。$\square$
<!-- proof-end -->

直接に $T=0,X=1$ を代入すると $UV=-1$ であり、$F(1)=0$、$F$ の減少性から $r>r_s$ です。$T=1/2,X=0$ では $UV=1/4>0$ なので $0<r<r_s$ です。この二点は後でそれぞれ右側外部と未来側内部に属します。

## 4. 四つの領域と二種類の地平線

無次元の二重零座標の符号が、四つの開いた領域を区別します。$T$ が増加する方向を未来と定めます。[LORG6の因果的未来の定義](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)で使った時間向きは局所的な光円錐の選び方であり、この選択は元の静的外部の未来向きと整合します。

| 領域 | $U$ | $V$ | $T,X$ の位置 | 半径 | 解釈 |
| --- | --- | --- | --- | --- | --- |
| I | 負 | 正 | $X>\lvert T\rvert$ | $r>r_s$ | もとの右側外部 |
| II | 正 | 正 | $T>\lvert X\rvert$ | $0<r<r_s$ | 未来側内部（ブラックホール） |
| III | 正 | 負 | $-X>\lvert T\rvert$ | $r>r_s$ | 別の左側外部 |
| IV | 負 | 負 | $-T>\lvert X\rvert$ | $0<r<r_s$ | 過去側内部（ホワイトホール） |

<a id="prop-gr27-regions-ef"></a>

<!-- formal-statement-start -->
> **命題（四領域とEF座標の被覆範囲）**
> $M>0$ のKruskal領域 $\mathcal K=\{UV<1\}$ で、$UV<0$ は二つの外部I・III、$0<UV<1$ は未来側内部II・過去側内部IVに分かれる。外部Iの座標変換は $U<0,V>0$ に限る。入射EF延長 $(v,r)$、$v\in\mathbb R,r>0$ は $V>0,UV<1$ と同じ開領域を覆い、外部Iと内部IIおよびその間の $U=0,V>0$ を含む。出射EF延長 $(u,r)$、$u\in\mathbb R,r>0$ は $U<0,UV<1$ に一致し、外部Iと内部IVおよびその間の $V=0,U<0$ を含む。いずれも交差球面 $U=V=0$ を覆わない。
<!-- formal-statement-end -->

### 証明の見取り図

$F(1)=0$ と $F$ の単調性が、$UV$ と半径の符号対応を与えます。EF表示との関係は外部の指数公式を延長側では片方だけ用い、もう一方を $UV=F(r/r_s)$ から解いて確定します。

<!-- proof-start -->
### 証明

[半径の一意性](#prop-gr27-radius-unique)から

$$
UV<0\iff r>r_s,\qquad
UV=0\iff r=r_s,\qquad
0<UV<1\iff0<r<r_s.
$$

符号の四通りを $T=(U+V)/2$、$X=(V-U)/2$ に代入すると表の不等式になります。

次に入射EF座標では[GR26の正則計量](../GR26/index.md#prop-gr26-ef-metric-domain)が $v\in\mathbb R,r>0$ に定義されています。この座標を固定したまま

$$
V=e^{v/(2r_s)}>0,\qquad
U=\frac{F(r/r_s)}{V}
$$

と置きます。逆写像は $v=2r_s\log V$、$r=r_sF^{-1}(UV)$ なので、$V>0,UV<1$ と一対一で、両向きに滑らかです。$r=r_s$ でも $V>0,U=0$ と有限であり、$U>0,V>0$ はII、$U<0,V>0$ はIです。出射側では対称に

$$
U=-e^{-u/(2r_s)}<0,\qquad
V=\frac{F(r/r_s)}{U}
$$

とすれば、逆写像 $u=-2r_s\log(-U)$ があり、$U<0,UV<1$ を覆います。$U,V$ がともに零の点はどちらの指数によっても得られません。$\square$
<!-- proof-end -->

両EF座標の重なりはIだけです。二つの地平線は $UV=0$ の直線 $U=0$ と $V=0$ ですが、各半直線は異なる因果的役割を持ちます。右側外部Iから見ると、未来地平線は $U=0,V>0$、過去地平線は $V=0,U<0$ です。左側外部IIIでは未来地平線が $V=0,U>0$、過去地平線が $U=0,V<0$ になります。

二直線の交点 $U=V=0$ では、角度変数は失われていません。そこには半径 $r_s$ の**分岐二球面**があり、四本の地平線半直線が交わります。これは入射EF表示一枚からは取り出せません。

## 5. 光の向きから内部の因果構造を確かめる

計量の二次元部分は正の関数 $C(r):=4r_s^3e^{-r/r_s}/r$ を用いて

$$
ds_{(2)}^2=C(r)(-dT^2+dX^2)
$$

と書けます。従って角度を固定した光は $dX=\pm dT$、すなわち $dU=0$ または $dV=0$ を満たします。$T$ が増す未来向き光では、前者は $dV>0$、後者は $dU>0$ です。角度速度のある因果曲線でも光円錐の内側へ入るだけなので、未来向きには $dU\ge0,dV\ge0$ が成り立ちます。

<a id="prop-gr27-causal-radius"></a>

<!-- formal-statement-start -->
> **命題（内部での未来向き半径変化）**
> $M>0$ のKruskal領域で $T$ 増加を未来とする。任意の非零の未来向き因果接ベクトル $Z$ について $dU(Z)\ge0,dV(Z)\ge0$ である。領域II（$U>0,V>0$）では $dr(Z)<0$、領域IV（$U<0,V<0$）では $dr(Z)>0$ である。右側未来地平線 $U=0,V>0$ 上で半径が一定の未来向き零方向は $U=0$ に沿う方向である。
<!-- formal-statement-end -->

### 証明の見取り図

角度方向の正の項を含めて因果条件を $T,X$ の不等式へ戻し、それから $dU,dV$ の符号を得ます。$r$ は $UV$ の減少関数なので、IIでは積が増し、IVでは積が減ることに注目します。

<!-- proof-start -->
### 証明

非零の未来向き因果接ベクトルを $Z$ とし、成分を $\dot T,\dot X$ および球面方向の接ベクトル $Z_\Omega$ で表します。[Kruskal計量](#prop-gr27-radius-unique)を代入すると

$$
0\ge g(Z,Z)=C(r)(-\dot T^2+\dot X^2)+r^2\lVert Z_\Omega\rVert_{S^2}^2.
$$

従って $\dot T^2\ge\dot X^2$、未来向き $\dot T>0$ なので $\dot T\ge\lvert\dot X\rvert$ です。$\dot U=\dot T-\dot X$、$\dot V=\dot T+\dot X$ はともに非負で、非零接ベクトルについて少なくとも一方は正です。

$UV=F(r/r_s)$ を接ベクトル方向へ微分して

$$
V\dot U+U\dot V
=F'(r/r_s)\frac{\dot r}{r_s},\qquad
\dot r=-\frac{r_s}{(r/r_s)e^{r/r_s}}(V\dot U+U\dot V)
$$

を得ます。IIでは $U,V>0$ だから括弧が正、従って $\dot r<0$ です。IVでは $U,V<0$ だから括弧が負、従って $\dot r>0$ です。$U=0,V>0$ では $\dot r=-r_sV\dot U/e\le0$ で、等号なら $\dot U=0$。因果条件の等号が要求する $Z_\Omega=0$ も満たすため、$V$ 増加の零生成方向となります。$\square$
<!-- proof-end -->

この計算は[GR26の内部半径減少命題](../GR26/index.md#prop-gr26-interior-causality)を、四領域全体に通用する座標で言い直したものです。IVで半径が未来へ増すのは、IIとIVの**時間向きの違い**であり、同じブラックホールの内部で光が突然外へ逃げられるという意味ではありません。

## 6. どこが境界で、何が「最大」なのか

[GR25の曲率計算](../GR25/index.md#thm-gr25-kretschmann-schwarzschild)は、まず静的外部でKretschmann不変量を与えます。ここで半径と延長計量・逆計量はすべて $r>0$ で実解析的なので、その一階・二階微分から作る曲率不変量も実解析的です。

領域 $\mathcal K$ の各点から原点までの線分は領域内にあります。実際、$UV<1$ ならば $0\le t\le1$ に対して $t^2UV<1$ なので、この線分で原点までつなげられます。球面も連結だから、時空 $\mathcal K\times S^2$ は連結です。

外部Iで上の曲率計算から得た関数と延長側の曲率の差は、この連結時空上の実解析関数で、外部Iという非空開集合では零です。実解析関数の冪級数の一意性を重なり合う座標近傍へ順に適用すれば、差は全域で零になります。従って延長側でも

$$
K:=R_{abcd}R^{abcd}=\frac{12r_s^2}{r^6}.
$$

Kruskal座標は $r=r_s$ の発散を取り除きましたが、$r\downarrow0$ では $K\to\infty$ です。$\lim_{y\downarrow0}F(y)=1$ なので、$r\downarrow0$ は $UV\uparrow1$、つまり $T^2-X^2\uparrow1$ に相当します。そのうち $T>0$ は未来の、$T<0$ は過去の曲率特異境界です。$r=0$ に正則な計量点を付け加えることは、曲率不変量の連続性と矛盾します。

<a id="def-gr27-analytic-extension"></a>

<!-- formal-statement-start -->
> **定義（解析延長と最大解析延長）**
> 連結な実解析Lorentz時空 $(\mathcal M,g)$ が、別の連結な実解析Lorentz時空 $(\widetilde{\mathcal M},\tilde g)$ の真の開部分集合へ、計量を保つ実解析的な埋め込みによって写せるとき、後者を前者の**解析延長**という。同じ意味での真の解析延長をさらに持たない時空を**実解析の意味で最大**という。この定義は、任意の異なる初期データを持つ時空が同型になるという主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr27-analytic-extension -->
**定義の確認**。元の静的外部Iは、[四領域を持つKruskal領域](#prop-gr27-regions-ef)のうち $U<0,V>0$ という真の開部分集合です。連結性は直前に原点へ至る線分と球面を使って確認しました。

外部での指数変換とその対数逆変換はともに実解析的で、[計量の導出](#prop-gr27-regular-metric)により埋め込みは計量を保ちます。[半径の解析的な一意性](#prop-gr27-radius-unique)と非退化性も確認済みなので、Kruskal領域は定義の連結性・開性・解析性・等長性をすべて満たす解析延長です。外部Iが最大でないことはこれだけで直接証明できます。

入射EF延長も $V>0$ という真の開部分集合に一致するため、最大ではありません。
<!-- definition-example-end -->

「Kruskal時空がSchwarzschild真空解の**標準的な最大解析延長**である」という名称には、二段階の内容があります。

1. この講義で証明したこと：静的外部から真空解を実解析的に延長し、地平線を越えて四領域と分岐二球面を正則に含む。$r>0$ のすべての有限な $U,V$ には座標上の穴がなく、$r=0$ では曲率が発散する。
2. より強い大域的な最大性：任意の実解析Lorentz時空への真の計量保存延長も不可能である、という主張。これは座標係数の有限性と曲率発散**だけ**からは一般には証明できません。境界へ到達する曲線や無限遠の挙動を含む大域的な非延長性の議論が別途必要です。本講義はその一般定理の証明を黒箱とし、上の明示的構成と境界診断を証明範囲とします。

実際、$r\to\infty$ では $UV\to-\infty$ であり、どこか有限の $(U,V)$ に「無限遠の境界」が潜んでいるわけではありません。しかしこの観察だけを非延長性の完全証明と取り違えないことが大切です。

最後に物理的状況を分けます。上の四領域は、すべての時代に真空のSchwarzschild解を実解析的に延長する**永遠の模型**の構造です。重力崩壊する星の時空では、星の内部に物質が存在し、初期データも異なります。外部が一時期Schwarzschild解と同じ形でも、そのことは別の外部IIIや過去側のホワイトホールIVの存在を含意しません。[因果到達集合の定義](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)は時空全体の曲線を参照するので、同じ局所計量でも領域が違えば大域的な因果関係は変わり得ます。崩壊模型や事象の地平線の定義は後続の講義で扱います。

## 7. 演習：指数、領域、光円錐を自分で再構成する

### Level A：一つの変換・判定を正確に扱う

<a id="ex-gr27-a01"></a>
#### GR27-A01 二重零計量の交差項
- Level: A

$r>r_s$ で $f=1-r_s/r$、$dr_*/dr=1/f$、$u=x^0-r_*$、$v=x^0+r_*$ とする。$-f(dx^0)^2+dr^2/f$ を $(u,v)$ で書き、$g_{uv}$ の値を答えよ。

<!-- solution-start -->
**詳細解答。** $dx^0=(du+dv)/2$、$dr=fdr_*=(f/2)(dv-du)$ です。従って

$$
\begin{aligned}
-f(dx^0)^2+\frac{dr^2}{f}
&=-\frac f4(du+dv)^2+\frac f4(dv-du)^2\\
&=-f\,du\,dv.
\end{aligned}
$$

二次形式では交差項が $2g_{uv}du\,dv$ なので $g_{uv}=g_{vu}=-f/2$ です。$-f$ 全体を $g_{uv}$ としてはいけません。
<!-- solution-end -->

<a id="ex-gr27-a02"></a>
#### GR27-A02 指数の符号と半径の関係
- Level: A

外部で $U=-e^{-u/(2r_s)}$、$V=e^{v/(2r_s)}$、$v-u=2r_*$、$r_*=r+r_s\log(r/r_s-1)$ とする。$UV$ を半径だけで表し、$r=2r_s$ の値を求めよ。

<!-- solution-start -->
**詳細解答。** 指数を掛けると

$$
UV=-e^{(v-u)/(2r_s)}=-e^{r_*/r_s}.
$$

$r_*/r_s=r/r_s+\log(r/r_s-1)$ を代入して

$$
UV=-e^{r/r_s}\left(\frac r{r_s}-1\right)
=\left(1-\frac r{r_s}\right)e^{r/r_s}.
$$

$r=2r_s$ では $UV=(1-2)e^2=-e^2<0$。外部で $U<0,V>0$ という符号とも一致します。
<!-- solution-end -->

<a id="ex-gr27-a03"></a>
#### GR27-A03 逆関数の定義域
- Level: A

$F(y)=(1-y)e^y$、$y>0$ とする。$F'$、端点の極限、値域を求め、$UV=1$ がKruskal領域に含まれない理由を答えよ。

<!-- solution-start -->
**詳細解答。** 積の微分から

$$
F'(y)=-e^y+(1-y)e^y=-ye^y<0.
$$

$\lim_{y\downarrow0}F(y)=1$、$\lim_{y\to\infty}F(y)=-\infty$ です。連続な狭義単調減少関数なので値域は $(-\infty,1)$。$F(y)=1$ となる $y>0$ は存在せず、$UV=1$ は $r=0$ へ近づく境界です。
<!-- solution-end -->

<a id="ex-gr27-a04"></a>
#### GR27-A04 地平線での行列式
- Level: A

$ds_{(2)}^2=-C(r)dU\,dV$、$C(r)=4r_s^3e^{-r/r_s}/r$、$r_s>0$ とする。$r=r_s$ における二次元計量行列とその行列式を求め、非退化性を説明せよ。

<!-- solution-start -->
**詳細解答。** $r=r_s$ で $C(r_s)=4r_s^2/e$ です。従って

$$
(g_{ab})=\begin{pmatrix}0&-2r_s^2/e\\-2r_s^2/e&0\end{pmatrix},\qquad
\det g=-\frac{4r_s^4}{e^2}\ne0.
$$

対角成分 $g_{UU}=g_{VV}=0$ でも、交差成分が非零であるため計量は非退化です。二次元ブロックの固有値は $\pm2r_s^2/e$ です。
<!-- solution-end -->

<a id="ex-gr27-a05"></a>
#### GR27-A05 具体点が属する領域
- Level: A

$U=T-X$、$V=T+X$、$UV<1$ のKruskal領域を考える。$(T,X)=(0,2),(1/2,0),(0,-2),(-1/2,0)$ の各点の $U,V$ の符号、領域番号、半径と $r_s$ の大小を判定せよ。

<!-- solution-start -->
**詳細解答。** 定義式へ順に代入すると

| $(T,X)$ | $(U,V)$ | 領域 | 半径 |
| --- | --- | --- | --- |
| $(0,2)$ | $(-2,2)$ | I | $UV=-4<0$ より $r>r_s$ |
| $(1/2,0)$ | $(1/2,1/2)$ | II | $UV=1/4$ より $0<r<r_s$ |
| $(0,-2)$ | $(2,-2)$ | III | $UV=-4<0$ より $r>r_s$ |
| $(-1/2,0)$ | $(-1/2,-1/2)$ | IV | $UV=1/4$ より $0<r<r_s$ |

$0<1/4<1$ と $-4<1$ なので四点とも領域に含まれます。[半径の単調性](#prop-gr27-radius-unique)を使った判定です。
<!-- solution-end -->

### Level B：複数の概念を接続する

<a id="ex-gr27-b01"></a>
#### GR27-B01 入射EF座標から未来地平線へ
- Level: B

入射EF延長で $v\in\mathbb R,r>0$、$V=e^{v/(2r_s)}$、$U=F(r/r_s)/V$ と定める（$F(y)=(1-y)e^y$）。逆変換を作り、$r=r_s$ がどの地平線を表すか、なぜ $U=V=0$ は表示できないか説明せよ。

<!-- solution-start -->
**詳細解答。** $V=e^{v/(2r_s)}>0$ なので対数が取れ、[半径の一意性](#prop-gr27-radius-unique)により $F$ は必要な逆関数を持ちます。従って逆写像は

$$
v=2r_s\log V,\qquad r=r_sF^{-1}(UV)
$$

です。$F$ の値域は $(-\infty,1)$ なので、$r>0$ と $UV<1$ が同値です。正方向の写像と上の逆写像がともに滑らかなことから、EF表示は $V>0,UV<1$ への滑らかな全単射です。

地平線 $r=r_s$ では $F(1)=0$ であり、$V>0$ のため $U=0$ です。従って $U=0,V>0$ を覆います。一方、有限な $v$ の指数は厳密に正で、$V=0$ にはなりません。このため $U=V=0$ の分岐二球面は含まれません。[EF被覆の命題](#prop-gr27-regions-ef)と一致します。
<!-- solution-end -->

<a id="ex-gr27-b02"></a>
#### GR27-B02 光の未来向きと半径の符号
- Level: B

$UV=F(r/r_s)$、$F'(y)=-ye^y$ とする。Kruskal計量の未来向き動径零接ベクトルについて $dU,dV$ の符号を求め、領域IIおよびIVで半径変化の符号を決定せよ。

<!-- solution-start -->
**詳細解答。** [計量の共形Minkowski表示](#prop-gr27-radius-unique)により未来向き動径零は $dT>0$ と $dX=\pm dT$ を満たします。$dU=dT-dX$、$dV=dT+dX$ より、一方が零、他方が正です。関係式を微分すると

$$
\frac{dr}{r_s}=-\frac{VdU+UdV}{(r/r_s)e^{r/r_s}}.
$$

IIでは $U,V>0$ なので分子が正、$dr<0$。IVでは $U,V<0$ なので分子が負、$dr>0$ です。角度運動を含む場合にも成り立つ一般化は[内部の因果命題](#prop-gr27-causal-radius)で確認できます。
<!-- solution-end -->

<a id="ex-gr27-b03"></a>
#### GR27-B03 特異境界と座標地平線の違い
- Level: B

$r_s>0$ のKruskal延長で $K=12r_s^2/r^6$ とし、$UV=F(r/r_s)$ とする。$UV=0$ と $UV\uparrow1$ における半径、$K$、延長可能性の違いを論じよ。

<!-- solution-start -->
**詳細解答。** $UV=0$ は $F(1)=0$ と単調性から $r=r_s$ です。このとき

$$
K(r_s)=\frac{12r_s^2}{r_s^6}=\frac{12}{r_s^4}<\infty.
$$

加えて[地平線での正則性](#prop-gr27-regular-metric)が計量の非退化性まで証明しています。一方、$UV\uparrow1$ は $F(y)\uparrow1$、すなわち $y\downarrow0$ を意味し、$r\downarrow0$ です。よって $K\to\infty$。滑らかな非退化計量点へ延長できるなら曲率の多項式縮約 $K$ はその点で有限になるはずなので矛盾します。有限の曲率だけから正則延長を結論したのではなく、地平線では計量も直接検査した点が違います。
<!-- solution-end -->

<a id="ex-gr27-b04"></a>
#### GR27-B04 出射EF座標とホワイトホール領域
- Level: B

出射EF延長で $u\in\mathbb R,r>0$、$U=-e^{-u/(2r_s)}$、$V=F(r/r_s)/U$ とする。被覆するKruskal領域、地平線半直線、$U,V$ の両方が負の領域で半径が未来へどう変わるか判定せよ。

<!-- solution-start -->
**詳細解答。** 指数から $U<0$ が必須で、$F$ の値域から $UV<1$ です。逆写像は

$$
u=-2r_s\log(-U),\qquad r=r_sF^{-1}(UV)
$$

となるため、被覆範囲は $U<0,UV<1$ 全体です。[四領域の分類](#prop-gr27-regions-ef)に従い、$U<0,V>0$ は外部I、$U<0,V<0$ は領域IV、$V=0,U<0$ は右側過去地平線です。

IVで非零の未来向き因果接ベクトルについては、[内部での未来向き半径変化](#prop-gr27-causal-radius)から $dU,dV\ge0$ で少なくとも片方が正です。$U,V$ は両方負なので、関係式を微分して

$$
dr=-\frac{r_s(VdU+UdV)}{(r/r_s)e^{r/r_s}}>0.
$$

従ってIVは未来へ半径が増すホワイトホール側です。出射EFも分岐二球面 $U=V=0$ までは覆えません。
<!-- solution-end -->

### Level C：四領域と解析延長を統合する

<a id="ex-gr27-c01"></a>
#### GR27-C01 外部からKruskal領域の全体像を組み立てる
- Level: C

$r_s>0$、$F(y)=(1-y)e^y$、$y=r/r_s>0$ とする。Schwarzschild外部の $u=x^0-r_*$、$v=x^0+r_*$、$r_*=r+r_s\log(r/r_s-1)$ から $U=-e^{-u/(2r_s)}$、$V=e^{v/(2r_s)}$ を定める。

1. $UV$ と $r$ の関係および $U,V$ 計量を導き、地平線での非退化性を確かめよ。
2. $F$ の値域から最大の**この座標表示の領域**を確定し、四つの開領域と分岐二球面を同定せよ。
3. 領域IIとIVで未来向き因果接ベクトルが満たす半径変化を証明せよ。
4. $K=12r_s^2/r^6$ を使い $UV=1$ の性質を判定し、これらの計算だけで任意の解析延長に対する大域的な最大性や星の崩壊時空の四領域を証明したと言えるか述べよ。

<!-- solution-start -->
**詳細解答。**

1. $v-u=2r_*$ なので $UV=-e^{r_*/r_s}=F(r/r_s)$ です。$du=-2r_sdU/U$、$dv=2r_sdV/V$ を外部の計量 $-fdu\,dv$ へ代入します。$f=(r-r_s)/r$、$UV=-(r-r_s)e^{r/r_s}/r_s$ より

$$
ds^2=\frac{4r_s^2f}{UV}dU\,dV+r^2d\Omega^2
=-\frac{4r_s^3}{r}e^{-r/r_s}dU\,dV+r^2d\Omega^2.
$$

$r=r_s$ では交差成分は $g_{UV}=g_{VU}=-2r_s^2/e$、その二次元行列式は $-4r_s^4/e^2\ne0$ です。

2. $F'(y)=-ye^y<0$、$F(0+)=1$、$F(\infty)=-\infty$ なので $UV<1$ の全域に一意な $r>0$ が存在します。$U,V$ の符号は、$(<0,>0)$ がI、$(>0,>0)$ がII、$(>0,<0)$ がIII、$(<0,<0)$ がIVです。$UV=0$ は $r=r_s$、$U=V=0$ では球面計量 $r_s^2d\Omega^2$ が残るので交点は一点ではなく分岐二球面です。

3. $T=(U+V)/2,X=(V-U)/2$ で $ds_{(2)}^2=C(-dT^2+dX^2)$、$C>0$ です。未来向き因果条件は $dT>0$ と $dT^2\ge dX^2$（角度運動は右辺をより厳しくする）であり、$dU=dT-dX\ge0$、$dV=dT+dX\ge0$。積を微分して

$$
dr=-\frac{r_s(VdU+UdV)}{(r/r_s)e^{r/r_s}}.
$$

IIでは括弧が正なので $dr<0$、IVでは負なので $dr>0$ です。

4. $UV=1$ へ内部から近づくと $r\downarrow0$、$K\to\infty$ で滑らかなLorentz計量点を付け加えられません。他方、$UV=0$ は正則です。ただしこの二点の計算は、任意の大域的な解析延長の可能性をすべて排除する証明ではありません。また星の崩壊では物質の領域と初期条件が永遠の真空解とは異なるため、外部の局所計量の一致から領域III・IVを導けません。
<!-- solution-end -->

二重零時刻の指数変換によって、地平線を横切る座標が一枚にまとまりました。次のGR28では、このまだ無限に広い $(T,X)$ 平面を共形変換で有限の図へ写し、光の到達関係を読み取ります。
