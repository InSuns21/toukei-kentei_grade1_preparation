# GR26 Eddington–Finkelstein座標と光線

<!-- definition-example-audit: strict -->

[GR25の正則な地平線横断表示](../GR25/index.md#prop-gr25-regular-horizon-chart)によって、Schwarzschild座標の発散は $r=r_s$ の曲率発散ではないと分かりました。しかし、計量が滑らかに書けることと、光がそこで**どちらへ進めるか**は別の問いです。遠くの観測者の静的時刻 $t$ だけで光線を追うと、地平線に着くまで無限の時刻が必要に見えます。

この講義では、光に沿って一定となる時刻を作り、入射光線と出射光線の二つの向きを分けます。さらに、正則な計量上で測地線方程式と未来向きの因果条件を検算し、地平線の内側で半径の増加ができない理由を明らかにします。光線の座標図形と、光が実際に辿る時空曲線とを同一視しないことが目標です。

以下、$G>0$、$M>0$、$c>0$、$r_s:=2GM/c^2>0$ とし、計量の符号は $(-,+,+,+)$ とします。静的時刻の長さ表示を $x^0=ct$ と書き、$v,u,r,r_*$ はすべて長さの次元で扱います。角度は局所的に $0<\theta<\pi$ とし、$d\Omega^2=d\theta^2+\sin^2\theta\,d\phi^2$ と略記します。球面座標の極での通常の表示上の問題と、地平線上の問題は区別します。

## 1. 動径光線の速度が零になるのはなぜか

[GR16のSchwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)と[静的外部の適用域](../GR16/index.md#prop-gr16-static-domain)から、$r>r_s$ では

$$
f(r):=1-\frac{r_s}{r}>0,\qquad
ds^2=-f(r)(dx^0)^2+\frac{dr^2}{f(r)}+r^2d\Omega^2
$$

です。球面方向を動かない光について、[GR18の光的測地線の一階積分](../GR18/index.md#prop-gr18-null-radial)に整合する零条件 $ds^2=0$ を用いると、

$$
0=-f(dx^0)^2+f^{-1}dr^2,\qquad
\left(\frac{dr}{dx^0}\right)^2=f^2.
$$

未来向きの静的時刻は $dx^0>0$ ですから、外部では

$$
\frac{dr}{dx^0}=+f\quad\text{（出射）},\qquad
\frac{dr}{dx^0}=-f\quad\text{（入射）}
$$

の二系統になります。半径が増す向きを出射、減る向きを入射と呼んでいます。例えば $r=2r_s$ なら $f=1/2$ で、$dr/dx^0=\pm1/2$ です。一方、$r\downarrow r_s$ ではどちらも零に近づきます。これは外部の $x^0$ による**座標速度**であり、局所観測者が測る光速が零になるという意味ではありません。

この方程式を積分するには、右辺に含まれる $r$ を吸収する新しい半径座標が便利です。

## 2. tortoise座標から零時刻を作る

動径の零条件を $dx^0=\pm dr/f$ と読むと、右辺の積分が新しい時刻の自然な部品になります。$r=r_s$ で発散する積分を、まず**外部だけ**で正確に定義します。

<a id="def-gr26-tortoise"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschildのtortoise座標）**  
> $M>0$ のSchwarzschild静的外部 $r>r_s=2GM/c^2$ で、微分方程式 $dr_*/dr=1/f(r)$ を満たす長さ次元の半径関数をtortoise座標 $r_*$ という。積分定数を零とした表示は

$$
\boxed{r_*(r)=r+r_s\log\left(\frac r{r_s}-1\right),\qquad r>r_s.}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr26-tortoise -->
**定義の確認**。$r/r_s-1>0$ なので対数は実数で定義され、$r_*$ は外部で滑らかです。微分すると

$$
\begin{aligned}
\frac{dr_*}{dr}
&=1+r_s\frac{1}{r/r_s-1}\frac1{r_s}
=1+\frac{r_s}{r-r_s}\\
&=\frac{r}{r-r_s}=\frac1{1-r_s/r}=\frac1f>0.
\end{aligned}
$$

したがって定義の微分方程式を満たします。具体的に $r=2r_s$ では $r_*=2r_s$、$dr_*/dr=2$ です。$r\downarrow r_s$ では対数が $-\infty$ へ向かうため $r_*\to-\infty$、$r\to\infty$ では $r_*\to+\infty$ です。単調性と二つの端の極限から、外部の区間 $(r_s,\infty)$ は $r_*\in\mathbb R$ へ一対一に写ります。
<!-- definition-example-end -->

この $r_*$ を使えば、零条件は $dx^0=\pm dr_*$ という一次式になります。外部の入射線では $dx^0=-dr_*$、出射線では $dx^0=+dr_*$ です。したがって、それぞれの線に沿って一定の時刻を先に見付け、それを座標名にします。

<a id="def-gr26-null-times"></a>

<!-- formal-statement-start -->
> **定義（入射・出射零時刻とEddington–Finkelstein座標）**  
> Schwarzschild外部 $r>r_s$ で、$x^0=ct$ と上の $r_*(r)$ から、入射零時刻 $v$ と出射零時刻 $u$ を

$$
\boxed{v:=x^0+r_*(r),\qquad u:=x^0-r_*(r)}
$$

> と定める。$(v,r,\theta,\phi)$ を入射Eddington–Finkelstein（EF）座標、$(u,r,\theta,\phi)$ を出射EF座標という。各表示はまず外部の座標変換として定義し、地平線を含む領域への延長は変換後の計量から別途判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr26-null-times -->
**定義の確認**。外部の入射光線は $dx^0=-dr/f=-dr_*$ なので

$$
dv=dx^0+dr_*=0.
$$

一方、外部の出射光線では $dx^0=dr_*$ だから $du=dx^0-dr_*=0$ です。$r=2r_s$ で光が長さ $\Delta r>0$ だけ外向きに動く瞬間は $dx^0=2\Delta r$、$dr_*=2\Delta r$ となり、$du=0$ が直接確認できます。入射なら $dr=-\Delta r$、$dx^0=2\Delta r$、$dr_*=-2\Delta r$ で $dv=0$ です。これらは局所的な微分関係であり、有限の移動に対する厳密な積分式は $v,u$ の定義を使います。
<!-- definition-example-end -->

注意すべきは、$v=\mathrm{const}$ と $u=\mathrm{const}$ が**別々の光線群**を表すことです。また $r_*\to-\infty$ となる境界に外部の座標変換をそのまま代入して、$v$ や $u$ の値を決めてはいけません。

## 3. 入射EF計量と地平線の横断

[GR25の横断計量の命題](../GR25/index.md#prop-gr25-regular-horizon-chart)は、入射座標で地平線上の計量が滑らかになることを示しました。ここではさらに、変換が成り立つ**領域**、Jacobian、地平線での接続を区別し、後の光線計算に必要な逆計量まで導きます。

<a id="prop-gr26-ef-metric-domain"></a>

<!-- formal-statement-start -->
> **命題（入射Eddington–Finkelstein計量と適用域）**  
> $M>0$ のSchwarzschild外部 $r>r_s$ における変換 $v=x^0+r_*(r)$ は滑らかな可逆座標変換で、計量を

$$
\boxed{ds^2=-f(r)\,dv^2+2\,dv\,dr+r^2d\Omega^2}
$$

> へ移す。この右辺を $v\in\mathbb R,\ r>0$ と球面 $S^2$ 上で解釈すると、地平線 $r=r_s$ を含む滑らかな非退化Lorentz計量を定める。ただし元の静的外部からの座標変換は $r=r_s$ では定義されず、この入射延長がSchwarzschild時空の最大延長であるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

外部では $dv=dx^0+dr/f$ と逆に解き、$f^{-1}dr^2$ の発散を時間成分の二乗と相殺します。Jacobianの行列式が外部で1でも、行列の成分自体は地平線で発散することを明示します。延長可能性の判定は、**変換後**の計量と逆計量で行います。

<!-- proof-start -->
### 証明

外部 $f>0$ で、$(x^0,r)$ から $(v,r)$ へのJacobianとその逆は

$$
\frac{\partial(v,r)}{\partial(x^0,r)}
=\begin{pmatrix}1&f^{-1}\\0&1\end{pmatrix},\qquad
\frac{\partial(x^0,r)}{\partial(v,r)}
=\begin{pmatrix}1&-f^{-1}\\0&1\end{pmatrix}.
$$

両者の積は単位行列で、行列式はともに1です。$r>r_s$ では $f^{-1}$ は有限・滑らかであり、逆変換も滑らかです。しかし $r\downarrow r_s$ で非対角成分が発散するため、**行列式が1という極限だけで境界での座標変換の滑らかさを主張することはできません**。

$dx^0=dv-dr/f$ を代入して、時間・半径部分を展開すると

$$
\begin{aligned}
-f(dx^0)^2+\frac{dr^2}{f}
&=-f\left(dv-\frac{dr}{f}\right)^2+\frac{dr^2}{f}\\
&=-f\,dv^2+2\,dv\,dr-\frac{dr^2}{f}+\frac{dr^2}{f}\\
&=-f\,dv^2+2\,dv\,dr.
\end{aligned}
$$

そこで、$r>0$ へ式そのものを延長した計量の $(v,r)$ ブロックと逆行列は

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad
(g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix}.
$$

積は $\begin{pmatrix}1&0\\0&1\end{pmatrix}$ で、行列式は $-1$ です。$r_s>0$ を固定すれば $f=1-r_s/r$ は $r>0$ で滑らかです。球面部分 $r^2d\Omega^2$ は $r>0$ の各球面上で正定値であり、二次元ブロックには負と正の固有値が各一つあるため、四次元全体は非退化Lorentz計量です。$r=r_s$ でも $f=0$ となるだけで、この判定は変わりません。$\square$
<!-- proof-end -->

### 直接例：地平線上でも逆計量が存在する

$r=r_s$ では時間・半径ブロックが

$$
\begin{pmatrix}0&1\\1&0\end{pmatrix}
$$

となり、逆行列も同じ行列です。$g_{vv}=0$ であっても計量は退化しません。[GR25の零超曲面判定](../GR25/index.md#prop-gr25-regular-horizon-chart)で用いた法 $dr$ のノルムは $g^{rr}=f(r_s)=0$ です。$v$ は入射延長の正則な時刻座標ですが、$v=\mathrm{const}$ 自身も法 $dv$ のノルム $g^{vv}=0$ によって零超曲面を成します。

## 4. 二つの未来向き動径零測地線

正則な計量を得たので、光が進む向きを座標の見かけだけで決めず、計量と測地線方程式で確認します。零ベクトルとは、[LORG3の因果曲線](../../../幾何系/LORG/LORG3/index.md#def-lorg3-causal-curve)で使った接ベクトルのうち、計量によるノルムが零のものです。

入射表示の時間・半径部分で二つの滑らかなベクトル場

$$
k:=-\partial_r,\qquad
\ell:=\partial_v+\frac{f(r)}2\,\partial_r
$$

を考えます。$k$ は $v$ 一定で半径を減らす方向、$\ell$ は $v$ を増やしながら $dr/dv=f/2$ を満たす方向です。この名前付けは $r=r_s$ の内外でも連続して使います。

<a id="prop-gr26-radial-null-generators"></a>

<!-- formal-statement-start -->
> **命題（未来向き動径零測地線の二つの方向）**  
> $M>0$ の入射EF延長 $v\in\mathbb R,\ r>0$ の各角度一定の曲面で、$k=-\partial_r$ と $\ell=\partial_v+(f/2)\partial_r$ は一次独立の未来向き零ベクトル場であり、

$$
g(k,k)=g(\ell,\ell)=0,\qquad g(k,\ell)=-1.
$$

> これらの積分曲線は零測地線であり、

$$
\nabla_k k=0,\qquad
\nabla_\ell\ell=\frac{f'(r)}2\,\ell.
$$

> 従って $k$ の表示パラメータはアフィンで、$\ell$ の表示パラメータ $v$ は一般にはアフィンでない。$\ell$ は外部では $dr/dv>0$、地平線上では $dr/dv=0$、内側では $dr/dv<0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

零性は計量へベクトル成分を入れて確かめます。測地線性は接続を省略せず求め、加速度が接ベクトルに比例するかを判定します。最後に滑らかな時間的ベクトルを一つ選び、$k$ と $\ell$ が同じ未来向きであることを全領域で固定します。

<!-- proof-start -->
### 証明

入射EFの $g_{vv}=-f,\ g_{vr}=1,\ g_{rr}=0$ を用います。$k^a=(0,-1)$、$\ell^a=(1,f/2)$ の順に代入して

$$
\begin{aligned}
g(k,k)&=0,\\
g(\ell,\ell)&=-f+2\cdot\frac f2=0,\\
g(k,\ell)&=g_{rv}(-1)(1)=-1.
\end{aligned}
$$

したがって両者は零で、内積が零でないので一次独立です。[Lorentz計量のLevi-Civita接続とKoszul表示](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)で証明された接続の係数式を使います。

$$
\Gamma^a_{bc}=\frac12g^{ad}
(\partial_b g_{dc}+\partial_c g_{db}-\partial_d g_{bc})
$$

上記の逆計量をこの式に入れます。動径曲線で必要なものは

$$
\Gamma^v_{rr}=\Gamma^r_{rr}=0,\qquad
\Gamma^v_{vv}=\frac{f'}2,\qquad
\Gamma^r_{vv}=\frac{ff'}2,\qquad
\Gamma^r_{vr}=\Gamma^r_{rv}=-\frac{f'}2,
$$

で、$\Gamma^v_{vr}=\Gamma^v_{rv}=0$ です。例えば

$$
\Gamma^v_{vv}
=\frac12g^{vr}(-\partial_r g_{vv})
=\frac12(1)f'=\frac{f'}2
$$

となり、$\Gamma^r_{vr}=\tfrac12g^{rv}\partial_r g_{vv}=-f'/2$ も確認できます。$k^a$ は定数成分、角度速度は零なので

$$
(\nabla_k k)^a=k^b\partial_b k^a+\Gamma^a_{rr}(k^r)^2=0.
$$

一方、$\ell^v=1,\ \ell^r=f/2$ から $\ell^b\partial_b\ell^r=ff'/4$、$\ell^b\partial_b\ell^v=0$ です。接続項を加えると

$$
\begin{aligned}
(\nabla_\ell\ell)^v&=\Gamma^v_{vv}=\frac{f'}2,\\
(\nabla_\ell\ell)^r
&=\frac{ff'}4+\frac{ff'}2
+2\left(-\frac{f'}2\right)\frac f2\\
&=\frac{ff'}4=\frac{f'}2\,\ell^r.
\end{aligned}
$$

従って $\nabla_\ell\ell=(f'/2)\ell$ です。接ベクトルに比例した加速度は曲線をパラメータ変更したときに消せるので、$\ell$ の積分曲線は零測地線の軌跡です。ただし $v$ 自体が一般にアフィンパラメータであるとは言えません。

未来向きは時刻方向を先に選んで確定します。全 $r>0$ に対して

$$
T:=\partial_v+\frac{f-2}{2}\partial_r
$$

と置くと、$g(T,T)=-f+(f-2)=-2<0$ で、$T$ はどこでも時間的です。$T$ を未来向きと選べば $g(T,k)=-1$、$g(T,\ell)=-1$ なので、どちらも未来向きです。最後に $f$ の符号を $r>r_s,\ r=r_s,\ 0<r<r_s$ で調べれば主張する半径速度を得ます。$\square$
<!-- proof-end -->

同じ「出射」$\ell$ でも、地平線の内側では面積半径が減少します。「出射」は二つある光円錐の枝の名前であって、どこでも外へ逃げられるという保証ではありません。

| 場所 | $f$ の符号 | 入射 $k$ | 出射 $\ell$ の $dr/dv$ |
| --- | --- | --- | --- |
| $r=2r_s$ | 正 | $v$ 一定で半径減少 | $+1/4$ |
| $r=r_s$ | 零 | 地平線を横切る | $0$（地平線に沿う） |
| $r=r_s/2$ | 負 | $v$ 一定で半径減少 | $-1/2$ |

この表の数値は $x^0,v,r$ を長さ単位にそろえたときの無次元傾きです。$k$ に対して $dr/dv$ を書くことはできません。そこでは $dv=0$ だからです。

## 5. 地平線の内側では未来向きに半径を増やせない

光の二方向だけでなく、質量を持つ物体や角度方向に動く光も調べます。[LORG3の未来向き因果曲線の条件](../../../幾何系/LORG/LORG3/index.md#def-lorg3-causal-curve)は、未来向き接ベクトル $X$ が $g(X,X)\le0$ を満たすというものです。前節の未来向き零ベクトル $k$ との内積を使うと、任意の未来向き因果ベクトルについて $g(X,k)\le0$ です。これは同じ時間向きの二つの因果ベクトルの内積が非正であることから従います。

<a id="prop-gr26-interior-causality"></a>

<!-- formal-statement-start -->
> **命題（地平線内側の未来向き因果曲線の半径減少）**  
> $M>0$ の入射EF延長において、$0<r<r_s$ の任意の点を通る非零の未来向き因果曲線を局所的に微分可能なパラメータ $\lambda$ で表す。この点では必ず

$$
\boxed{\frac{dr}{d\lambda}<0}
$$

> である。$r=r_s$ では $dr/d\lambda\le0$ が成り立ち、等号は出射の零方向に接するときにのみ生じる。これらは入射EF延長内の局所的因果構造の主張である。
<!-- formal-statement-end -->

### 証明の見取り図

まず未来向きから $dv/d\lambda\ge0$ を得ます。次に角度運動を含んだ零・時間的条件を二次形式で書き、$dv/d\lambda>0$ と $dv/d\lambda=0$ を分けます。角度方向の正の項は、半径を増やす余地をさらに狭めます。

<!-- proof-start -->
### 証明

接ベクトルを座標基底で次のように展開し、点は $r>0$ かつ通常の球面座標内にあるとします。

$$
X=\dot v\,\partial_v+\dot r\,\partial_r+
\dot\theta\,\partial_\theta+\dot\phi\,\partial_\phi.
$$

前節の未来向き $k=-\partial_r$ を使うと

$$
g(X,k)=-\dot v\le0,\qquad\text{従って }\dot v\ge0.
$$

因果条件を全四方向で展開すれば

$$
-f\dot v^2+2\dot v\dot r
+r^2\left(\dot\theta^2+\sin^2\theta\,\dot\phi^2\right)\le0.
$$

$\dot v>0$ なら両辺を $2\dot v$ で割れるため、

$$
\dot r\le\frac f2\dot v
-\frac{r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)}{2\dot v}
\le\frac f2\dot v.
$$

$0<r<r_s$ では $f<0$ なので $\dot r<0$ です。$r=r_s$ では $f=0$ なので $\dot r\le0$ であり、等号なら角度速度は零、かつ因果条件が等号の零曲線になります。したがって接ベクトルは前節の $\ell=\partial_v$ に正比例します。

$\dot v=0$ の場合は因果条件が

$$
r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)\le0
$$

になるので角度速度は零です。非零の接ベクトルは $X=\dot r\,\partial_r$ に限られ、未来向きであるため $\dot r<0$（未来向きの $k=-\partial_r$ に正比例）です。従って内側でも地平線上でも同じ結論です。$\square$
<!-- proof-end -->

この命題は、$r=r_s$ の内側で「光より速く移動すれば外へ出られる」という考えを許しません。光も物体も未来向き因果曲線である限り、内側では面積半径が厳密に減少します。ただし**大域的な事象の地平線**を定義し、無限遠との因果関係を調べる仕事は後の講義に残ります。今証明したのは、この正則な入射延長内での局所的な光円錐の向きです。

## 6. 自由落下の世界線も正則に横切る

光線だけを扱ったのでは、地平線を通る時計の時間が分かりません。[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)を用い、角度を固定した時間的測地線の固有時を $\tau$ とします。$\dot v=dv/d\tau$、$\dot r=dr/d\tau$ は長さ毎秒で、$g(\dot x,\dot x)=-c^2$ と規格化します。

正則座標では静的時間並進Killing場は $\partial_v$ です。その保存量の符号を、単位質量当たりの無次元量

$$
e:=-\frac1c\,g(\partial_v,\dot x)
=\frac{f\dot v-\dot r}{c}
$$

と選びます。静的外部では $\partial_v=\partial_{x^0}$ なので、$e=f\,dt/d\tau$ と一致します。

<a id="prop-gr26-regular-infall"></a>

<!-- formal-statement-start -->
> **命題（正のエネルギーを持つ入射自由落下の正則速度）**  
> $M>0$ のSchwarzschild入射EF延長を考える。角度一定、未来向きで半径が減少する時間的測地線が、正の無次元Killing保存量 $e>0$ を持つとする。$e^2-f(r)\ge0$ が成り立つ軌道上では

$$
\boxed{\dot r=-c\sqrt{e^2-f(r)},\qquad
\dot v=\frac{c}{e+\sqrt{e^2-f(r)}}.}
$$

> 特に $r=r_s$ の通過時には $\dot r=-ce$、$\dot v=c/(2e)$ と有限であり、そこを通る滑らかな入射の時間的測地線を妨げる計量係数の発散はない。
<!-- formal-statement-end -->

### 証明の見取り図

Killing保存量を用いて $\dot r$ と $\dot v$ を連立し、固有時の規格化条件で平方根を取り出します。$f=0$ での $0/0$ に見える中間式は、有理化してから極限を取ります。

<!-- proof-start -->
### 証明

[GR14のKilling保存量の定理](../GR14/index.md#thm-gr14-killing-charge)は、Killing場 $\partial_v$ とアフィンパラメータである固有時 $\tau$ に沿う測地線について $g(\partial_v,\dot x)$ が一定であることを保証します。$f\dot v-\dot r=ce$ と固有時の規格化

$$
-f\dot v^2+2\dot v\dot r=-c^2
$$

を連立します。まず $\dot r=f\dot v-ce$ を代入して

$$
f\dot v^2-2ce\dot v=-c^2.
$$

半径方向の速度を直接求めるため、$f\ne0$ の点では $\dot v=(ce+\dot r)/f$ を同じ規格化へ戻すと

$$
\begin{aligned}
-c^2
&=-f\frac{(ce+\dot r)^2}{f^2}
+2\frac{(ce+\dot r)\dot r}{f}\\
&=\frac{-c^2e^2+\dot r^2}{f}.
\end{aligned}
$$

従って $\dot r^2=c^2(e^2-f)$ です。入射なので負の平方根を選び、

$$
\dot r=-c\sqrt{e^2-f}.
$$

これを $f\dot v=ce+\dot r$ に代入してから有理化すると

$$
\begin{aligned}
\dot v
&=\frac{c(e-\sqrt{e^2-f})}{f}\\
&=\frac{c(e^2-(e^2-f))}
{f(e+\sqrt{e^2-f})}
=\frac{c}{e+\sqrt{e^2-f}}.
\end{aligned}
$$

最後の形は $f=0$ でも $e>0$ のもとで定義され、$\dot v=c/(2e)$、$\dot r=-ce$ を与えます。元の正則な規格化式へ $f=0$ を代入しても $2\dot v\dot r=2(c/2e)(-ce)=-c^2$ と一致します。滑らかな測地線方程式の係数と有限な初期速度を持つため、局所解は地平線を横断して続きます。$\square$
<!-- proof-end -->

### 直接例：無限遠で静止する極限の入射

$e=1$ とすると $q:=\sqrt{r_s/r}>0$、$f=1-q^2$ だから

$$
\dot r=-cq,\qquad
\dot v=\frac{c}{1+q}.
$$

$r=2r_s$ では $(\dot r,\dot v)=(-c/\sqrt2,\ c/(1+1/\sqrt2))$、$r=r_s$ では $(-c,c/2)$、$r=r_s/2$ では $(-c\sqrt2,c/(1+\sqrt2))$ です。三点とも $\dot v$ は正で有限です。[GR25の自由落下固有時の計算](../GR25/index.md#prop-gr25-regular-horizon-chart)と同じく、半径 $r_0>r_s$ から地平線までの時間は

$$
\tau_s-\tau_0
=\frac{2}{3c\sqrt{r_s}}\left(r_0^{3/2}-r_s^{3/2}\right)<\infty.
$$

外部の静的時刻 $t$ の発散と、自由落下者の固有時の有限性は矛盾しません。

## 7. 出射EF座標と延長の違い

入射の代わりに、外部で $u=x^0-r_*$ を使うこともできます。$dx^0=du+dr/f$ なので

$$
\begin{aligned}
-f(dx^0)^2+\frac{dr^2}{f}
&=-f\left(du+\frac{dr}{f}\right)^2+\frac{dr^2}{f}\\
&=-f\,du^2-2\,du\,dr.
\end{aligned}
$$

したがって出射表示は

$$
ds^2=-f\,du^2-2\,du\,dr+r^2d\Omega^2
$$

です。ここでも時間・半径ブロックの行列式は $-1$ で、$r=r_s$ を越える滑らかな表示を作れます。出射側は $u=\mathrm{const}$ の未来向き外向き光線に適します。一方、入射側で $v=\mathrm{const}$ が未来向き内向きだったことと対照的です。

外部の同じ点では $u=v-2r_*(r)$ ですが、$r_*$ の発散により、この式は地平線を含む二つの全表示をつなぐ正則な座標変換にはなりません。入射の延長は未来の地平線を横断する落下に便利で、出射の延長は逆向きの地平線を記述するのに便利です。両者を一つの大域図式にまとめ、どの領域が実際に含まれるかを調べるには、次のKruskal座標が必要になります。

最後に平坦極限も確かめます。$r_s\to0$ を正の $r$ で考えると $f\to1$、$r_*\to r$、$v\to x^0+r$、入射表示は $-dv^2+2\,dv\,dr+r^2d\Omega^2$ です。$dx^0=dv-dr$ を戻せば $-(dx^0)^2+dr^2+r^2d\Omega^2$ となり、Minkowski計量に一致します。

## 8. 演習：光線・Jacobian・未来向き

### Level A：計算の部品を正確に扱う

<a id="ex-gr26-a01"></a>
#### GR26-A01 外部の二方向の速度
- Level: A

$M>0$ のSchwarzschild外部 $r=4r_s$ で、動径零曲線の $dr/dx^0$ の二値を求めよ。また出射と入射を区別せよ。$x^0=ct$ とする。

<!-- solution-start -->
**詳細解答。** [GR16の計量](../GR16/index.md#thm-gr16-schwarzschild)の角度固定・零条件は $-f(dx^0)^2+f^{-1}dr^2=0$ です。$r=4r_s>r_s$ では $f=1-1/4=3/4>0$ なので

$$
\left(\frac{dr}{dx^0}\right)^2=f^2=\frac9{16},
\qquad
\frac{dr}{dx^0}=\pm\frac34.
$$

静的時刻が増すときの正符号が出射、負符号が入射です。いずれも光速 $c$ を直接測った値ではなく、長さ座標の比です。
<!-- solution-end -->

<a id="ex-gr26-a02"></a>
#### GR26-A02 tortoise座標の微分と範囲
- Level: A

$r_*(r)=r+r_s\log(r/r_s-1)$、$r>r_s>0$ とする。$dr_*/dr=1/f$ を導き、$r\downarrow r_s$ と $r\to\infty$ の値域を判定せよ。

<!-- solution-start -->
**詳細解答。** [tortoise座標の定義](#def-gr26-tortoise)に従い、対数の内部は正です。連鎖律を使って

$$
\frac{dr_*}{dr}
=1+\frac{r_s}{r-r_s}
=\frac r{r-r_s}=\frac1{1-r_s/r}>0.
$$

$r\downarrow r_s$ では対数の引数が $0+$ に向かい、$r_*\to-\infty$ です。$r\to\infty$ では第一項 $r\to+\infty$、対数も正の無限大へ向かうため $r_*\to+\infty$。連続な狭義単調増加関数なので値域は $\mathbb R$ です。
<!-- solution-end -->

<a id="ex-gr26-a03"></a>
#### GR26-A03 Jacobianの行列式と境界
- Level: A

外部 $f>0$ で $v=x^0+r_*(r)$、$dr_*/dr=1/f$ とする。$(x^0,r)\mapsto(v,r)$ のJacobian、行列式、逆行列を求め、$r=r_s$ へ元の変換をそのまま延長できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [tortoise座標の定義](#def-gr26-tortoise)と $v$ の微分から

$$
J=\begin{pmatrix}
\partial v/\partial x^0&\partial v/\partial r\\
0&1
\end{pmatrix}
=\begin{pmatrix}1&1/f\\0&1\end{pmatrix},
\quad \det J=1.
$$

上三角行列なので逆行列は

$$
J^{-1}=\begin{pmatrix}1&-1/f\\0&1\end{pmatrix}.
$$

実際に $JJ^{-1}=I_2$ です。ただし $f\to0$ で非対角成分は発散し、$r_*$ 自身も発散します。外部では可逆ですが、地平線で正則な座標変換になるわけではありません。そこで[正則延長の命題](#prop-gr26-ef-metric-domain)では変換後の計量そのものを延長しました。
<!-- solution-end -->

<a id="ex-gr26-a04"></a>
#### GR26-A04 地平線の逆計量
- Level: A

入射EFの時間・半径ブロック $g_{ab}=\begin{pmatrix}-f&1\\1&0\end{pmatrix}$ を与える。逆行列を求め、$r=r_s$ で $\det g$、$g^{-1}(dr,dr)$、$g^{-1}(dv,dv)$ を判定せよ。

<!-- solution-start -->
**詳細解答。** $\det g=(-f)0-1=-1$ で非零です。二次行列の逆行列公式、あるいは積の検算から

$$
g^{-1}=\begin{pmatrix}0&1\\1&f\end{pmatrix},\qquad
gg^{-1}=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

$r=r_s$ は $f=0$ なので $\det g=-1$、$g^{-1}(dr,dr)=g^{rr}=0$、$g^{-1}(dv,dv)=g^{vv}=0$ です。$dr,dv$ は独立な共ベクトルなので、零ノルムであっても零ベクトルではありません。
<!-- solution-end -->

<a id="ex-gr26-a05"></a>
#### GR26-A05 入射光線のアフィン性
- Level: A

入射EF計量 $ds^2=-f\,dv^2+2\,dv\,dr+r^2d\Omega^2$ で角度を固定する。$k=-\partial_r$ が零で、$\nabla_k k=0$ を満たすことを計量およびChristoffel記号から確かめよ。

<!-- solution-start -->
**詳細解答。** $k^v=0,k^r=-1$ より $g(k,k)=g_{rr}=0$ です。計量の $g_{rr}=0,g_{vr}=1$ は $v,r$ に関して一定なので、Christoffelの式で

$$
\Gamma^a_{rr}
=\frac12g^{ab}(2\partial_r g_{br}-\partial_b g_{rr})=0
$$

が $a=v,r$ について成り立ちます。角度方向の係数 $\Gamma^\theta_{rr},\Gamma^\phi_{rr}$ も零です。さらに $k^a$ は定数だから $k^b\partial_bk^a=0$ となり、全成分で $\nabla_k k=0$。負の $r$ 方向へ進む積分曲線はアフィンパラメータを持つ零測地線です。
<!-- solution-end -->

### Level B：方向・運動・条件を結び付ける

<a id="ex-gr26-b01"></a>
#### GR26-B01 出射光線の非アフィン加速度
- Level: B

$f=1-r_s/r$、$\ell=\partial_v+(f/2)\partial_r$ とする。入射EF計量から動径のChristoffel記号を計算し、$\nabla_\ell\ell=(f'/2)\ell$ を検算せよ。$r=2r_s$ の比例係数も求めよ。

<!-- solution-start -->
**詳細解答。** [入射EF計量の命題](#prop-gr26-ef-metric-domain)の逆行列を使います。非零の動径係数は

$$
\Gamma^v_{vv}=\frac{f'}2,\quad
\Gamma^r_{vv}=\frac{ff'}2,\quad
\Gamma^r_{vr}=-\frac{f'}2
$$

で、$\Gamma^a_{rr}=0$、$\Gamma^v_{vr}=0$ です。$\ell^v=1,\ell^r=f/2$ だから

$$
\ell^b\partial_b\ell^r
=\frac f2\partial_r\left(\frac f2\right)
=\frac{ff'}4,
\qquad
\ell^b\partial_b\ell^v=0.
$$

従って

$$
(\nabla_\ell\ell)^v=\frac{f'}2,\quad
(\nabla_\ell\ell)^r=\frac{ff'}4+\frac{ff'}2-\frac{ff'}2
=\frac{ff'}4
=\frac{f'}2\ell^r.
$$

$f'=r_s/r^2$ なので $r=2r_s$ で比例係数は $f'/2=1/(8r_s)$ です。零ではないので $v$ はここでアフィンパラメータでありませんが、加速度が接線に比例するため曲線は再パラメータ化でアフィンな零測地線になります。
<!-- solution-end -->

<a id="ex-gr26-b02"></a>
#### GR26-B02 角度運動を含む因果条件
- Level: B

入射EF延長の $0<r<r_s$ で、未来向き非零接ベクトル $X=(\dot v,\dot r,\dot\theta,\dot\phi)$ が $g(X,X)\le0$ を満たすとする。[未来向き動径零測地線の二つの方向](#prop-gr26-radial-null-generators)を使い、角度運動があっても $\dot r<0$ になることを両場合 $\dot v>0,\dot v=0$ で示せ。

<!-- solution-start -->
**詳細解答。** 未来向き $k=-\partial_r$ との内積は $g(X,k)=-\dot v\le0$ なので $\dot v\ge0$ です。$\dot v>0$ では

$$
-f\dot v^2+2\dot v\dot r+
r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)\le0
$$

を $2\dot v$ で割り、

$$
\dot r\le\frac f2\dot v-
\frac{r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)}{2\dot v}
\le\frac f2\dot v<0
$$

を得ます。最後は内側で $f<0$ によります。$\dot v=0$ では角度項だけが非正と要求されるので $\dot\theta=\dot\phi=0$、$X=\dot r\partial_r$ です。非零かつ未来向きなので $\dot r<0$ です。したがって角度方向へ運動しても半径は増やせません。
<!-- solution-end -->

<a id="ex-gr26-b03"></a>
#### GR26-B03 自由落下の正則な速度
- Level: B

$M>0$ の入射EF計量で、角度一定の入射時間的測地線が $e=1$、$g(\dot x,\dot x)=-c^2$ を持つとする。$\dot r,\dot v$ を求め、$r=r_s$ で規格化が成り立つことと、$r_0>r_s$ から地平線までの固有時が有限なことを示せ。

<!-- solution-start -->
**詳細解答。** [Killing保存量](../GR14/index.md#thm-gr14-killing-charge)から $f\dot v-\dot r=c$、規格化から $-f\dot v^2+2\dot v\dot r=-c^2$ です。$f\ne0$ で $\dot v=(c+\dot r)/f$ を代入すれば

$$
-c^2=\frac{\dot r^2-c^2}{f},\qquad
\dot r^2=c^2(1-f)=\frac{c^2r_s}{r}.
$$

入射の枝を選んで $q=\sqrt{r_s/r}$ と書くと $\dot r=-cq$。さらに $f=(1-q)(1+q)$ を用いて

$$
\dot v=\frac{c(1-q)}{1-q^2}=\frac{c}{1+q}.
$$

この有理化後の式は地平線でも有限で、$(\dot v,\dot r)=(c/2,-c)$ です。ここでは $f=0$ なので $g(\dot x,\dot x)=2(c/2)(-c)=-c^2$ と確認できます。最後に $d\tau=dr/\dot r=-\sqrt{r/r_s}\,dr/c$ を $r_0$ から $r_s$ へ積分すると

$$
\tau_s-\tau_0
=\frac{1}{c\sqrt{r_s}}\int_{r_s}^{r_0}\sqrt r\,dr
=\frac{2(r_0^{3/2}-r_s^{3/2})}{3c\sqrt{r_s}}<\infty.
$$

同じ有限性は[GR25の自由落下計算](../GR25/index.md#prop-gr25-regular-horizon-chart)とも一致します。
<!-- solution-end -->

<a id="ex-gr26-b04"></a>
#### GR26-B04 出射EF計量の交差項
- Level: B

Schwarzschild外部で $u=x^0-r_*(r)$、$dr_*/dr=1/f$ とする。$(u,r)$ 表示へ変換して $du\,dr$ の符号、ブロックの行列式、$u=\mathrm{const}$ の未来向き動径零線の半径の向きを判定せよ。

<!-- solution-start -->
**詳細解答。** $du=dx^0-dr/f$ なので $dx^0=du+dr/f$ です。したがって

$$
\begin{aligned}
-f(dx^0)^2+\frac{dr^2}{f}
&=-f\left(du+\frac{dr}f\right)^2+\frac{dr^2}f\\
&=-f\,du^2-2\,du\,dr.
\end{aligned}
$$

交差項は負です。行列と行列式は

$$
\begin{pmatrix}-f&-1\\-1&0\end{pmatrix},
\qquad \det=-1.
$$

外部では $u=\mathrm{const}$ なら $dx^0=dr/f$ で、未来向きの $dx^0>0$ と $f>0$ から $dr>0$。入射EFの $v=\mathrm{const}$ による内向き光線とは反対の枝です。元の変換は $r=r_s$ で特異なので、正則計量の式の延長と区別します。
<!-- solution-end -->

### Level C：二つの光円錐と自由落下を統合する

<a id="ex-gr26-c01"></a>
#### GR26-C01 外部・地平線・内部を同じ座標で調べる
- Level: C

$r_s>0$、$f=1-r_s/r$ とし、入射EF計量 $ds^2=-f\,dv^2+2\,dv\,dr+r^2d\Omega^2$ を $r>0$ に延長する。

1. $r=2r_s,\ r=r_s,\ r=r_s/2$ で出射零方向の $dr/dv$ を求め、入射零方向も言葉で指定せよ。
2. 内側で未来向きの時間的・光的曲線が半径を増やせないことを、角度運動を含めて示せ。
3. 正の定数 $e>0$ を持つ角度一定の入射自由落下について、保存量 $(f\dot v-\dot r)/c=e$ と規格化 $-f\dot v^2+2\dot v\dot r=-c^2$ から $\dot v,\dot r$ を求め、地平線通過時の値を与えよ。
4. ここまでの計算だけから大域的な最大解析延長の領域が全部分かったと言えるか、理由を述べよ。

<!-- solution-start -->
**詳細解答。**

1. [未来向き零測地線の命題](#prop-gr26-radial-null-generators)の出射枝は $\ell=\partial_v+(f/2)\partial_r$ なので、$dr/dv=f/2$ です。三点で $f=1/2,0,-1$ と順に代入し、傾きは $1/4,0,-1/2$。入射枝は $k=-\partial_r$ であり、$v$ 一定・半径減少です。

2. [因果曲線の定義](../../../幾何系/LORG/LORG3/index.md#def-lorg3-causal-curve)を使い、未来向き零 $k$ との内積から $\dot v\ge0$ を得ます。$\dot v>0$ では

$$
\dot r\le\frac f2\dot v
-\frac{r^2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)}{2\dot v}
\le\frac f2\dot v<0.
$$

内側 $f<0$ を使いました。$\dot v=0$ なら因果条件から角度速度が零となり、非零の未来向き曲線は $k$ の正倍数なので $\dot r<0$ です。

3. 保存量から $\dot r=f\dot v-ce$、規格化へ代入すると $f\dot v^2-2ce\dot v=-c^2$ です。$f\ne0$ の点で $\dot v=(ce+\dot r)/f$ と戻すと $\dot r^2=c^2(e^2-f)$。入射枝なので

$$
\dot r=-c\sqrt{e^2-f},\qquad
\dot v=\frac{c(e-\sqrt{e^2-f})}{f}
=\frac{c}{e+\sqrt{e^2-f}}.
$$

$e>0$ なので後者は $f=0$ で正則となり、通過時は $\dot r=-ce$、$\dot v=c/(2e)$ です。$2\dot v\dot r=-c^2$ も確かめられます。

4. **言えません。** 今扱ったのは入射EF延長 $v\in\mathbb R,r>0$ の計量とそこでの因果方向です。外部からの $(x^0,r)\leftrightarrow(v,r)$ の変換は $r=r_s$ で滑らかでなく、出射EFとの関係にも同じ対数の発散があります。異なる延長領域を合わせた最大解析延長は、別の正則座標で領域の貼り合わせを検証する必要があります。
<!-- solution-end -->

入射・出射の区別、パラメータの選び方、未来向き因果条件の三点がそろえば、地平線での「停止」は座標時刻の現象であって物体の停止ではないことを自分で検算できます。続くGR27では、ここで別々に得られた零時刻を指数変換し、一つの正則表示で複数の時空領域を比較します。
