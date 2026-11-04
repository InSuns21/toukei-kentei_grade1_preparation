# GEOD19 等積投影と正積緯度

[GEOD13の投影の計量比較](../GEOD13/index.md#thm-geod13-metric-comparison)では、地表の1 mが地図上で何mになるか、また微小面積が何倍になるかをJacobianから判定しました。GEOD17–18で扱った横メルカトルは局所的な角度を保つ一方、面積は一般に保ちません。人口密度や森林面積を色分けした世界地図を、面積の見かけの違いに惑わされず読むには別の設計が必要です。

最初に楕円体の面積を**ちょうど同じ面積の球**へ移す緯度を作ります。その上で円筒・円錐・擬円筒の地図を構成すると、各図法の等積性を一つの計算で検証できます。ただし、面積が同じでも形や距離は変わり得ます。

本章の到達目標は次の五つです。

1. 楕円体の第一基本形式から面積要素を導き、面積を保つ緯度変換と球半径を構成する。
2. 正積緯度の単調性、球面極限、緯度帯の有限面積保存を証明・計算する。
3. Lambert 正積円筒と Albers 正積円錐のJacobianを計算し、面積と距離の縮尺を区別する。
4. Mollweide 図法の補助角を構成し、存在・一意性と等積性を確かめる。
5. 地域図・全球主題図・航法・距離計測で、何を保ちたいかから図法を選ぶ。

以下、回転楕円体の長半径を $a\ge b>0$、第一離心率を $e=\sqrt{1-b^2/a^2}\in[0,1)$ とし、測地緯度 $\phi\in[-\pi/2,\pi/2]$、経度 $\lambda$ は**ラジアン**で表します。経度は切れ目を指定した一つの区間で扱い、極での経度座標の退化は区別します。正積球に移した緯度を $\beta$ と書きます。GEOD18の逆級数係数 $\beta_j$ とは別の記号です。東座標は $E$、北座標は $N_p$ とします。

<!-- definition-example-audit: strict -->

---

## 1. 楕円体の面積を球に移せるか

### 1.1 面積の重みは緯度で変わる

[GEOD4の曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)と[第一基本形式](../GEOD4/index.md#thm-geod4-ellipsoid-metric)を使います。非極点で

$$
\begin{aligned}
M(\phi)&=\frac{a(1-e^2)}{(1-e^2\sin^2\phi)^{3/2}},\\
N(\phi)&=\frac{a}{\sqrt{1-e^2\sin^2\phi}},\\
ds^2&=M(\phi)^2\,d\phi^2+N(\phi)^2\cos^2\phi\,d\lambda^2.
\end{aligned}
$$

座標方向が直交し、それぞれの微小長さが $M\,d\phi$、$N\cos\phi\,d\lambda$ なので、面積要素はその積です。

$$
\boxed{dA_{\mathrm{ell}}=MN\cos\phi\,d\phi\,d\lambda
=\frac{a^2(1-e^2)\cos\phi}{(1-e^2\sin^2\phi)^2}\,d\phi\,d\lambda.}
$$

半径 $R$ の球の緯度を $\beta$ とした面積要素は $R^2\cos\beta\,d\beta\,d\lambda$ です。したがって、経度を変えずに楕円体の各緯度帯の面積を球へ移すには、$\beta$ の変化率を次のように選べばよさそうです。

$$
R^2\cos\beta\frac{d\beta}{d\phi}=MN\cos\phi.
$$

右辺を積分するため、$u=\sin\phi$ と置き、赤道からの**累積面積を表す無次元関数**を導入します。これは地心緯度や[等角緯度](../GEOD14/index.md#def-geod14-conformal-latitude)とは異なる、面積のための緯度です。

<a id="def-geod19-authalic"></a>
<!-- formal-statement-start -->
> **定義（正積緯度と正積球半径）**
> $a\ge b>0$、$e^2=1-b^2/a^2$ の回転楕円体に対し、$e>0$ なら $q(\phi)$ を

$$
q(\phi)=(1-e^2)\left\{
\frac{\sin\phi}{1-e^2\sin^2\phi}
+\frac{\operatorname{artanh}(e\sin\phi)}{e}
\right\}
$$

> とし、$e=0$ なら $q(\phi)=2\sin\phi$ とする。$q_p=q(\pi/2)>0$ と置き、**正積球半径** $R_q$ と**正積緯度** $\beta$ を

$$
\boxed{R_q=a\sqrt{\frac{q_p}{2}},\qquad
\beta(\phi)=\arcsin\frac{q(\phi)}{q_p}\in[-\pi/2,\pi/2]}
$$

> で定める。ここで $\operatorname{artanh}z=\frac12\log\frac{1+z}{1-z}$（$|z|<1$）であり、$\arcsin$ は値域 $[-\pi/2,\pi/2]$ の主値とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod19-authalic -->
**定義の確認**（球の場合）。$a=b=R$ なら $e=0$ であり、$q(\phi)=2\sin\phi$、$q_p=2$ です。したがって $R_q=R$、$\beta=\arcsin(\sin\phi)=\phi$（指定した緯度区間内）となります。赤道では $\beta=0$、北極・南極はそれぞれ $\pm\pi/2$ に写ります。半径は長さの単位を持ち、緯度は無次元の角度です。
<!-- definition-example-end -->

$e>0$ では極の値は

$$
\boxed{q_p=1+\frac{1-e^2}{e}\operatorname{artanh}e.}
$$

この形は $e$ が十分小さいとき差のある項の丸めに注意が必要です。例えば $\operatorname{artanh}z/z=1+z^2/3+z^4/5+\cdots$ を使えば $e\to0$ の極限 $q_p\to2$ を確認できます。$e=0$ の分岐は、式の $0/0$ を直接評価しないためにも必要です。

### 1.2 なぜこれで面積が本当に保たれるか

定義で与えた関数の微分、単調性、面積の一致を確認します。局所Jacobianだけでなく、緯度帯の**有限面積**まで一致するのが重要です。

<a id="thm-geod19-authalic-area"></a>
<!-- formal-statement-start -->
> **定理（正積緯度による面積保存と単調性）**
> $a\ge b>0$ の回転楕円体の測地緯度 $\phi\in[-\pi/2,\pi/2]$ に対し、[正積緯度と正積球半径](#def-geod19-authalic)で定めた $\beta,R_q$ は連続で、$\beta$ は厳密単調増加、$\beta(0)=0$、$\beta(\pm\pi/2)=\pm\pi/2$ である。非極点では

$$
\boxed{MN\cos\phi\,d\phi\,d\lambda
=R_q^2\cos\beta\,d\beta\,d\lambda.}
$$

> 特に $\phi_1<\phi_2$ と $\Delta\lambda>0$ に対し、経度幅 $\Delta\lambda$ の重複しない緯度帯の面積は

$$
\boxed{A=\frac{a^2\Delta\lambda}{2}[q(\phi_2)-q(\phi_1)]
=R_q^2\Delta\lambda[\sin\beta_2-\sin\beta_1],}
$$

> ただし $\beta_i=\beta(\phi_i)$。全球面積は $4\pi R_q^2=2\pi a^2q_p$ である。
<!-- formal-statement-end -->

**証明の見取り図。** $q$ は面積要素の緯度方向の積分を2倍したものです。$u=\sin\phi$ に代えて微分すると $q'>0$ となり、$R_q^2\sin\beta=a^2q/2$ を微分すれば面積要素が一致します。

<!-- proof-start -->
### 証明

まず $e>0$ とし、$u=\sin\phi$、$D=1-e^2u^2>0$ と置きます。定義の括弧内の第一項を $u/D$ と書けば

$$
\frac{d}{du}\frac{u}{D}=\frac{1+e^2u^2}{D^2},\qquad
\frac{d}{du}\frac{\operatorname{artanh}(eu)}e=\frac1D.
$$

よって二項を通分した分子は $1+e^2u^2+D=2$ となり、連鎖律 $du/d\phi=\cos\phi$ から

$$
\boxed{q'(\phi)=\frac{2(1-e^2)\cos\phi}{(1-e^2\sin^2\phi)^2}
=\frac{2MN\cos\phi}{a^2}.}
$$

$e=0$ では $q'=2\cos\phi$ で同じ等式が成り立ちます。非極点では $M,N,\cos\phi>0$ より $q'>0$ です。$q$ は奇関数、$q(0)=0$、$q(\pm\pi/2)=\pm q_p$ なので、$q/q_p$ および $\arcsin(q/q_p)$ は所定の区間で連続かつ厳密単調増加です。

次に $\beta$ の定義を $R_q^2\sin\beta=a^2q/2$ と書き直します。非極点では $|q|<q_p$ だから $\cos\beta>0$ で、微分して

$$
R_q^2\cos\beta\,\beta'(\phi)
=\frac{a^2}{2}q'(\phi)=MN\cos\phi.
$$

両辺に $d\phi\,d\lambda$ を掛けて面積要素の式を得ます。経度の幅が $\Delta\lambda$ の座標長方形に対しては

$$
\begin{aligned}
A&=\Delta\lambda\int_{\phi_1}^{\phi_2}MN\cos\phi\,d\phi\\
&=\frac{a^2\Delta\lambda}{2}\int_{\phi_1}^{\phi_2}q'(\phi)\,d\phi\\
&=\frac{a^2\Delta\lambda}{2}[q(\phi_2)-q(\phi_1)].
\end{aligned}
$$

$R_q^2=a^2q_p/2$ と $q(\phi_i)=q_p\sin\beta_i$ を代入すれば球の面積表示と一致します。極を端点に含む場合も連続性により極限で成立します。$\phi_1=-\pi/2$、$\phi_2=\pi/2$、$\Delta\lambda=2\pi$ として全球面積を得ます。
<!-- proof-end -->

**具体例：WGS84 の緯度を変換する。** 長半径 $a=6378137\ \mathrm m$、逆扁平率 $1/f=298.257223563$ を使い、$e^2=f(2-f)$ とします。緯度帯面積については、後のC1で原始関数 $q$ と独立に台形・Simpson数値積分でも検算します。

$$
\begin{aligned}
e^2&\simeq0.00669437999014,\quad q_p\simeq1.99553108750,\\
R_q&\simeq6371007.181\ \mathrm m,\\
q(45^\circ)&\simeq1.40789038773,\\
\beta(45^\circ)&\simeq44.8717028734^\circ.
\end{aligned}
$$

測地緯度45°を正積緯度45°と取り違えると、面積を保つはずの変換のJacobianがずれます。実務では角度をラジアンに直して三角関数へ渡します。

---

## 2. 球を「円筒」に開く：Lambert 正積円筒

正積球上の緯度・経度をそのまま縦横の長方形に描くと、緯度の高い場所は経線が実際より長く描かれます。では、横の拡大に合わせて縦を縮めれば面積が保たれるでしょうか。

地図上で緯線は水平直線、経線は鉛直直線にしたいとします。$\beta_0$ を横縮尺が1になる**標準緯線**の緯度（$|\beta_0|<\pi/2$）とし、$\lambda_0$ を中心経度とします。球面上の緯線方向の長さは $R_q\cos\beta\,d\lambda$ なので、地図上の横幅を $R_q\cos\beta_0\,d\lambda$ と選べば $\beta=\beta_0$ で横縮尺が1です。

そこで $E=R_q(\lambda-\lambda_0)\cos\beta_0$、$N_p=N_p(\beta)$ と置きます。この二つの座標方向は地図上でも直交するので、[GEOD13の面積縮尺の判定](../GEOD13/index.md#thm-geod13-preservation-tests)に従い、球の面積要素と平面Jacobianを一致させる条件は

$$
\frac{\partial(E,N_p)}{\partial(\lambda,\beta)}
=R_q\cos\beta_0\,\frac{dN_p}{d\beta}
=R_q^2\cos\beta.
$$

$\cos\beta_0>0$ より $dN_p/d\beta=R_q\cos\beta/\cos\beta_0$ です。赤道を $N_p(0)=0$ に取って $\beta$ で積分すると、$N_p=R_q\sin\beta/\cos\beta_0$ が得られます。すなわち縦方向の式は、横方向の選び方と面積保存から決まります。$\cos(-\beta_0)=\cos\beta_0$ なので、$\beta_0\ne0$ なら反対側の緯線 $-\beta_0$ でも横縮尺が1になります。

<a id="def-geod19-lambert"></a>
<!-- formal-statement-start -->
> **定義（Lambert 正積円筒図法）**
> 半径 $R_q>0$ の正積球について、$|\beta|<\pi/2$、$|\beta_0|<\pi/2$ とし、経度を切れ目のない一つの区間で扱う。**Lambert 正積円筒図法**を、平面座標 $(E,N_p)$ への写像

$$
\boxed{E=R_q(\lambda-\lambda_0)\cos\beta_0,\qquad
N_p=\frac{R_q\sin\beta}{\cos\beta_0}}
$$

> と定める。楕円体から使う際は、先に測地緯度 $\phi$ を[正積緯度](#def-geod19-authalic) $\beta(\phi)$ に変換する。$\beta_0=0$ の場合を赤道接触型という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod19-lambert -->
**定義の確認**。球半径 $R_q=1$、$\beta_0=0$、$\lambda_0=0$ として、$\beta=30^\circ$、$\lambda=\pi/6$ を代入すると $(E,N_p)=(\pi/6,1/2)$ です。偏微分は $E_\lambda=1$、$(N_p)_\beta=\cos\beta$、交差偏微分は0なので、面積Jacobianは $\cos\beta$ です。これは球の面積要素 $\cos\beta\,d\beta\,d\lambda$ と一致します。経度を一周より長く取ると像が重複するので、有限領域の地図としては切れ目が必要です。
<!-- definition-example-end -->

<a id="thm-geod19-lambert-area"></a>
<!-- formal-statement-start -->
> **定理（Lambert 正積円筒の面積と方向別縮尺）**
> [Lambert 正積円筒図法](#def-geod19-lambert)は非極点で局所的に向きを保つ等積投影である。正積球上の東西（緯線）方向および南北（経線）方向の局所長さ縮尺は

$$
\boxed{k_{\mathrm E}=\frac{\cos\beta_0}{\cos\beta},\qquad
k_{\mathrm N}=\frac{\cos\beta}{\cos\beta_0},\qquad
k_{\mathrm E}k_{\mathrm N}=1.}
$$

> 楕円体上の測地緯度 $\phi$ から合成した場合も面積縮尺は1であり、その東西・南北縮尺は

$$
\boxed{k_{\mathrm E}=\frac{R_q\cos\beta_0}{N(\phi)\cos\phi},\qquad
k_{\mathrm N}=\frac{R_q\cos\beta\,\beta'(\phi)}{M(\phi)\cos\beta_0}=\frac1{k_{\mathrm E}}.}
$$
<!-- formal-statement-end -->

**証明の見取り図。** 球上の東西・南北の単位長さはそれぞれ $R_q\cos\beta\,d\lambda$ と $R_q\,d\beta$。対応する地図の偏微分を割り算すれば縮尺が出ます。楕円体の場合は緯度の連鎖律に注意します。

<!-- proof-start -->
### 証明

入力を東向きの経度 $\lambda$、北向きの緯度 $\beta$ の順、出力を $(E,N_p)$ の順に取るとJacobianは

$$
J_{(\lambda,\beta)}=\begin{pmatrix}
R_q\cos\beta_0&0\\
0&R_q\cos\beta/\cos\beta_0
\end{pmatrix}.
$$

したがって $\det J_{(\lambda,\beta)}=R_q^2\cos\beta>0$ であり、[GEOD13の面積縮尺の判定](../GEOD13/index.md#thm-geod13-preservation-tests)により球面上の面積縮尺は1です。この東・北という入力順に対して行列式が正であるので、局所的に向きを保ちます。地表での長さはそれぞれ $R_q\cos\beta$ と $R_q$ 倍なので、対応するJacobianの列長を割れば表示した二つの縮尺になります。

楕円体では $\beta=\beta(\phi)$ を合成するため、北方向の偏微分は $\partial_\phi N_p=R_q\cos\beta\,\beta'/\cos\beta_0$ となります。[正積緯度の面積恒等式](#thm-geod19-authalic-area)の $R_q^2\cos\beta\,\beta'=MN\cos\phi$ を使い

$$
\begin{aligned}
k_{\mathrm E}k_{\mathrm N}
&=\frac{R_q\cos\beta_0}{N\cos\phi}
\frac{R_q\cos\beta\,\beta'}{M\cos\beta_0}\\
&=\frac{R_q^2\cos\beta\,\beta'}{MN\cos\phi}=1.
\end{aligned}
$$

直交する経緯線の像は水平・鉛直のままですから、面積縮尺はこの積であり1です。
<!-- proof-end -->

**具体例：等積でも形は変わる。** 半径 $R=1$ の球の赤道接触型で $\beta=60^\circ$ とすると

$$
k_{\mathrm E}=\frac1{\cos60^\circ}=2,\qquad
k_{\mathrm N}=\cos60^\circ=\frac12.
$$

小さな円は横に2倍、縦に1/2倍の楕円になり、面積は変わりません。[Tissotの指示楕円](../GEOD13/index.md#def-geod13-tissot)の半軸は $(2,1/2)$ です。「面積を保存する」ことは、「形を保存する」ことでも「距離を保存する」ことでもありません。

---

## 3. 二本の緯線で距離を合わせる：Albers 正積円錐

広い東西方向の地域では、一本の緯線を水平軸に揃える円筒型より、緯線を同心円弧として描く円錐型が使いやすい場合があります。円錐型では経線を放射状の直線にし、その間の角度を $n(\lambda-\lambda_0)$ とします。ここで $n$ は円錐の開き方を決める定数であり、GEOD17–18の第三扁平率 $n=(a-b)/(a+b)$ と同じ文字でも別物です。経線に沿う地図上の半径を $\rho(\beta)$、その緯度 $\beta$ による導関数を $\rho'(\beta)=d\rho/d\beta$ と書けば、面積を保つには $\rho\,\rho'$ の大きさが決まります。

ここでは北半球の二つの標準緯線 $0<\beta_1<\beta_2<\pi/2$ を選びます。一般の南半球・異符号の標準緯線では符号と退化条件に注意しますが、まず正の $n$ で確かな構成を学びます。

定数 $n>0$、半径 $\rho(\beta)>0$ を仮に与え、経度 $\lambda$ の増分を地図上で角度 $n\,d\lambda$ の扇形に、緯度 $\beta$ の増分を半径方向の長さ $-\rho'(\beta)\,d\beta$ に写すとします（北へ行くほど半径が減る領域を考えます）。二方向は直交するため、地図の面積要素は $-n\rho\rho'\,d\lambda\,d\beta$ です。正積球の $R_q^2\cos\beta\,d\lambda\,d\beta$ と等しくするには

$$
-n\rho\rho'=R_q^2\cos\beta
\quad\Longleftrightarrow\quad
\frac{d(\rho^2)}{d\beta}=-\frac{2R_q^2}{n}\cos\beta.
$$

したがって積分定数 $C$ を用いて

$$
n^2\rho(\beta)^2=R_q^2(C-2n\sin\beta).
$$

緯線方向の球面の微小長さは $R_q\cos\beta\,d\lambda$、地図上では $n\rho\,d\lambda$ です。二本の標準緯線 $\beta_i$ で横縮尺を1にする条件 $n\rho(\beta_i)=R_q\cos\beta_i$（$i=1,2$）を代入すると

$$
C=\cos^2\beta_i+2n\sin\beta_i.
$$

両方の $C$ が等しいことと $\sin\beta_2>\sin\beta_1$ から

$$
2n(\sin\beta_2-\sin\beta_1)
=\sin^2\beta_2-\sin^2\beta_1,
\qquad
n=\frac{\sin\beta_1+\sin\beta_2}{2}.
$$

こうして $n,C,\rho$ が等積条件と標準緯線条件から決まり、次の定義の平方根では正の半径を選びます。

<a id="def-geod19-albers"></a>
<!-- formal-statement-start -->
> **定義（Albers 正積円錐図法）**
> 半径 $R_q>0$ の正積球、二つの標準緯線 $0<\beta_1<\beta_2<\pi/2$、原点緯度 $\beta_0\in(-\pi/2,\pi/2)$、中央経度 $\lambda_0$ を取る。定数と半径関数を

$$
\begin{aligned}
n&=\frac{\sin\beta_1+\sin\beta_2}{2}>0,\\
C&=\cos^2\beta_1+2n\sin\beta_1,\\
\rho(\beta)&=\frac{R_q}{n}\sqrt{C-2n\sin\beta},\\
\rho_0&=\rho(\beta_0),\qquad \theta=n(\lambda-\lambda_0)
\end{aligned}
$$

> とし、根号が正で、経度の切れ目をまたがない領域上の**Albers 正積円錐図法**を

$$
\boxed{E=\rho(\beta)\sin\theta,\qquad
N_p=\rho_0-\rho(\beta)\cos\theta}
$$

> と定める。楕円体からは $\beta=\beta(\phi)$ を先に用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod19-albers -->
**定義の確認**。$R_q=1$、$\beta_1=30^\circ$、$\beta_2=60^\circ$ とすると $n=(1+\sqrt3)/4\simeq0.683013$、$C=1+\sqrt3/4\simeq1.433013$ です。$\beta_0=30^\circ$、$\lambda=\lambda_0$ では $\theta=0$、$\rho=\rho_0$ だから $(E,N_p)=(0,0)$。また $C-2n\sin30^\circ=\cos^230^\circ>0$ で根号条件を満たし、$\rho'(\beta)<0$ なので北へ進むと円弧の半径は小さくなります。
<!-- definition-example-end -->

<a id="thm-geod19-albers-area"></a>
<!-- formal-statement-start -->
> **定理（Albers 正積円錐の面積と標準緯線）**
> [Albers 正積円錐図法](#def-geod19-albers)は、$|\beta|<\pi/2$ かつ $C-2n\sin\beta>0$ の領域で局所的に面積を保つ。正積球上の緯線方向と経線方向の局所縮尺は

$$
\boxed{k_{\mathrm E}=\frac{n\rho}{R_q\cos\beta},\qquad
k_{\mathrm N}=\frac{R_q\cos\beta}{n\rho},\qquad
k_{\mathrm E}k_{\mathrm N}=1.}
$$

> とくに $\beta=\beta_1,\beta_2$ では両方向の縮尺が1となる。ただし、二本の標準緯線以外の距離・角度保存を意味しない。
<!-- formal-statement-end -->

**証明の見取り図。** 面積の偏微分は $\partial_\lambda(E,N_p)$ と $\partial_\beta(E,N_p)$ の行列式で得ます。$\rho^2$ を微分すれば $-n\rho\rho'=R_q^2\cos\beta$ が出ます。標準緯線では $n\rho=R_q\cos\beta_i$ を確かめます。

<!-- proof-start -->
### 証明

$\rho>0$ の範囲で定義式の両辺を微分すると

$$
2\rho\rho'=-\frac{2R_q^2}{n}\cos\beta,
\qquad\rho'=-\frac{R_q^2\cos\beta}{n\rho}.
$$

$\partial_\lambda\theta=n$、$\partial_\beta\theta=0$ なので、入力を $(\lambda,\beta)$ としたJacobianの列は

$$
\partial_\lambda F=\binom{n\rho\cos\theta}{n\rho\sin\theta},\qquad
\partial_\beta F=\binom{\rho'\sin\theta}{-\rho'\cos\theta}.
$$

よって二列の行列式は

$$
\det[\partial_\lambda F,\partial_\beta F]
=-n\rho\rho'(\cos^2\theta+\sin^2\theta)
=R_q^2\cos\beta>0.
$$

これは正積球の面積要素に一致します。経線・緯線の像の接ベクトルの内積は

$$
(n\rho\cos\theta)(\rho'\sin\theta)
+(n\rho\sin\theta)(-\rho'\cos\theta)=0
$$

なので両方向は直交したままです。列長 $n\rho$、$|\rho'|$ を球面上の長さ $R_q\cos\beta$、$R_q$ でそれぞれ割ると、提示した縮尺を得ます。

$n=(\sin\beta_1+\sin\beta_2)/2$ だから

$$
\begin{aligned}
C-2n\sin\beta_1&=\cos^2\beta_1,\\
C-2n\sin\beta_2
&=\cos^2\beta_1+2n(\sin\beta_1-\sin\beta_2)\\
&=1-\sin^2\beta_2=\cos^2\beta_2.
\end{aligned}
$$

各 $\cos\beta_i>0$ なので、$n\rho(\beta_i)=R_q\cos\beta_i$。従って両方向の縮尺が1になります。楕円体に合成した場合も[正積緯度の定理](#thm-geod19-authalic-area)とJacobianの連鎖律により面積縮尺1が保たれますが、**標準緯線で楕円体上の長さも1倍になるとは限りません**。標準緯線はここでは正積球上の指定です。
<!-- proof-end -->

**具体例。** 前の $30^\circ,60^\circ$ の設定で $\beta=45^\circ$ とすると $\rho/R_q\simeq1.000622$、$k_{\mathrm E}\simeq0.966527$、$k_{\mathrm N}\simeq1.034633$ です。両者の積は1ですが、中間の緯度でも距離が完全に保たれるわけではありません。

ここで構成したのは、**球面Albersを正積球へ適用した等積図法**です。測地緯度で二本の標準緯線を指定する楕円体Albersの通常の投影パラメータとは一般に一致しません。楕円体上の標準緯線で縮尺を1にしたい場合は、楕円体の計量を用いて別途その条件を解く必要があります。

---

## 4. 世界地図を楕円形にする：Mollweide 正積図法

円筒図法は極に近い場所の横幅を地図上でも同じ長さに取ってしまい、輪郭が長方形になります。全球図で極を一点へ縮め、外形を楕円にしたいときは、緯度に応じて各緯線の横幅そのものを変える方法があります。

Mollweide 図法では、正積緯度 $\beta$ をさらに補助角 $\vartheta$ に変えます。この角は正積緯度そのものではなく、暗黙方程式の解として決めます。

<a id="def-geod19-mollweide"></a>
<!-- formal-statement-start -->
> **定義（Mollweide 正積図法）**
> 半径 $R_q>0$ の正積球で $\beta\in[-\pi/2,\pi/2]$ とし、$\vartheta\in[-\pi/2,\pi/2]$ を

$$
\boxed{2\vartheta+\sin2\vartheta=\pi\sin\beta}
$$

> の解とする。中央経度 $\lambda_0$ を取り、一つの経度区間 $|\lambda-\lambda_0|\le\pi$ での**Mollweide 正積図法**を

$$
\boxed{E=\frac{2\sqrt2}{\pi}R_q(\lambda-\lambda_0)\cos\vartheta,
\qquad N_p=\sqrt2R_q\sin\vartheta}
$$

> とする。楕円体からは正積緯度 $\beta(\phi)$ を先に用いる。極ではすべての経度が同じ一点に写るため、局所逆の存在は主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod19-mollweide -->
**定義の確認**。赤道 $\beta=0$ では $\vartheta=0$ が方程式を満たし、$N_p=0$、$E=(2\sqrt2/\pi)R_q(\lambda-\lambda_0)$ です。北極 $\beta=\pi/2$ では $\vartheta=\pi/2$ として $E=0$、$N_p=\sqrt2R_q$。南極も符号を逆にすれば同じ条件を確かめられます。$\lambda-\lambda_0=\pm\pi$ の左右の外縁は $E^2/(2\sqrt2R_q)^2+N_p^2/(\sqrt2R_q)^2=1$ を満たします。
<!-- definition-example-end -->

<a id="thm-geod19-mollweide-area"></a>
<!-- formal-statement-start -->
> **定理（Mollweide 補助角の一意性と等積性）**
> [Mollweide の補助角方程式](#def-geod19-mollweide)は $\beta\in[-\pi/2,\pi/2]$ ごとにただ一つの解 $\vartheta\in[-\pi/2,\pi/2]$ を持つ。非極点では $\vartheta$ は滑らかで、写像の面積Jacobianは

$$
\boxed{\left|\det\frac{\partial(E,N_p)}{\partial(\beta,\lambda)}\right|
=R_q^2\cos\beta.}
$$

> 従って切れ目をまたがず重複しない領域で面積が保たれ、全球は面積 $4\pi R_q^2$ の楕円に写る。
<!-- formal-statement-end -->

**証明の見取り図。** 左辺 $h(\vartheta)=2\vartheta+\sin2\vartheta$ が厳密増加し、端点で $\pm\pi$ を取るので逆が一意です。微分した $\vartheta'(\beta)$ を $E_\lambda(N_p)_\beta$ へ代入すると余分な三角関数が消えます。

<!-- proof-start -->
### 証明

$h(-\pi/2)=-\pi$、$h(\pi/2)=\pi$ で、$h'=2+2\cos2\vartheta=4\cos^2\vartheta>0$ は開区間で成立します。連続性と厳密増加性から、$\pi\sin\beta\in[-\pi,\pi]$ に対応する解は一意です。非極点では $|\vartheta|<\pi/2$ なので、[逆関数の微分公式](../../../基礎科目/RA/RA3/index.md#thm-ra3-inverse)により

$$
\boxed{\frac{d\vartheta}{d\beta}=
\frac{\pi\cos\beta}{4\cos^2\vartheta}.}
$$

$E_\lambda=(2\sqrt2/\pi)R_q\cos\vartheta$、$(N_p)_\beta=\sqrt2R_q\cos\vartheta\,\vartheta'(\beta)$、$(N_p)_\lambda=0$ です。ゆえに

$$
\begin{aligned}
\left|\det\frac{\partial(E,N_p)}{\partial(\beta,\lambda)}\right|
&=E_\lambda(N_p)_\beta\\
&=\frac4\pi R_q^2\cos^2\vartheta
\frac{\pi\cos\beta}{4\cos^2\vartheta}\\
&=R_q^2\cos\beta.
\end{aligned}
$$

ここで $E_\beta$ は一般に0ではありませんが、$(N_p)_\lambda=0$ のため行列式に寄与しません。極では逆関数の微分式の分母が消えるのでこの計算を直接適用せず、面積積分の極限と連続性で扱います。

最後に外縁の楕円の半軸は $2\sqrt2R_q$ と $\sqrt2R_q$ です。その面積は $\pi(2\sqrt2R_q)(\sqrt2R_q)=4\pi R_q^2$ で、先ほど導いた局所面積保存を全球で独立に検算できます。
<!-- proof-end -->

**注意：解の求め方。** 補助角の方程式にNewton法を使う場合は、非極点で

$$
\vartheta_{m+1}=\vartheta_m-
\frac{2\vartheta_m+\sin2\vartheta_m-\pi\sin\beta}{4\cos^2\vartheta_m}
$$

と更新できます。ただし極近傍では分母が小さくなるため、$[-\pi/2,\pi/2]$ で符号を確認する二分法や区間を保つ方法を併用します。単に反復が停止したことを面積保存の証明とみなしてはいけません。

---

## 5. どの地図を選ぶか：保存量と図法の形態

[GEOD13の等角・等積・方向別等距離の定義](../GEOD13/index.md#def-geod13-preservation)を区別します。等角は局所的な角を保ち、等積は局所面積を保ち、正距は指定された方向・線などの長さを保つ条件です。三つとも「歪みがない」という意味ではありません。曲率が異なるため、球面の開領域を平面へ全方向等距離にはできないことも[GEOD13で証明済み](../GEOD13/index.md#prop-geod13-no-sphere-flat-isometry)です。

「正軸・横軸・斜軸」は投影の軸の向き、「円筒・円錐・方位・擬円筒」は経緯線の像をどう構成するかという**形態**、「等角・等積・正距」は**保存する性質**です。分類の軸が異なるので、「円筒なら等角」や「擬円筒なら等積」とは言えません。

| 図法 | 形態・特性 | 何を確認したか | 用途と注意 |
| --- | --- | --- | --- |
| Lambert 正積円筒 | 正軸円筒・等積 | $k_{\mathrm E}k_{\mathrm N}=1$ | 緯度帯の面積比較。高緯度の形が横長になる |
| Albers 正積円錐 | 正軸円錐・等積 | $-n\rho\rho'=R_q^2\cos\beta$ | 東西に広い中緯度地域。標準緯線の選択が重要 |
| Mollweide | 正軸擬円筒・等積 | $E_\lambda(N_p)_\beta=R_q^2\cos\beta$ | 全球の面積分布。外周は楕円、形は変形する |
| 正軸 Mercator | 正軸円筒・等角 | 球では両方向の縮尺が $\sec\beta$ | 航法上の等角性が便利。高緯度の面積が拡大する |
| Robinson | 擬円筒・折衷図法 | 等積条件を恒等的には満たさない | 見た目のバランスを選ぶ世界図。面積統計の比較に注意 |

球面 Mercator の北座標を $R_q\log\tan(\pi/4+\beta/2)$、東座標を $R_q(\lambda-\lambda_0)$ とすると、微分により

$$
E_\lambda=R_q,\quad (N_p)_\beta=R_q\sec\beta,
\quad A=\frac{R_q^2\sec\beta}{R_q^2\cos\beta}=\sec^2\beta.
$$

例えば $\beta=60^\circ$ では面積縮尺4です。同じ緯度でLambert 正積円筒は東西2倍・南北1/2倍で面積縮尺1です。両図法の使い分けは見た目ではなく、利用目的に依存します。

地域大縮尺測量図では近距離・角度・座標帯内の縮尺の制御が優先され、[Krüger 系の局所等角投影](../GEOD18/index.md#thm-geod18-convergence-scale)が適する場合があります。一方、全球の人口・森林・農地の面積量を図示する場合には等積世界図法が適します。面積保存でも行政界の有限な面積を比較するときは、**全領域が同じ一対一の枝に収まり、境界の切れ目を正しく処理したか**を必ず確認します。

楕円体に関しては、標準緯線・縮尺係数を球面式で調整しただけでは楕円体上の距離まで保存されません。正積緯度変換のJacobianが保つのは**面積**であり、面積以外の尺度は再計算が必要です。この点を次章GEOD20のEqual Earth図法でも使います。

---

## 6. 演習：面積の公式を導出して使う

角度は式の微分・三角関数への代入時にラジアンとします。$\Delta\lambda$ は経度区間の正の幅であり、複数周の重複は含みません。特記なければ投影式の平面座標の単位は半径と同じです。

### Level A：定義と微分を確かめる

<a id="ex-geod19-a01"></a>
#### A1. 累積面積関数の微分

$0<e<1$、$u=\sin\phi$ とし、$q(\phi)=(1-e^2)[u/(1-e^2u^2)+\operatorname{artanh}(eu)/e]$ の導関数を求めよ。$q'(0)$ も求め、面積要素との関係を述べよ。

- Level: A
- ID: GEOD19-A1

<!-- solution-start -->
**詳細解答。** $D=1-e^2u^2$ とすると、商の微分と $\operatorname{artanh}$ の微分を別々に行います。

$$
\frac{d}{du}\frac{u}{D}=\frac{D+2e^2u^2}{D^2}
=\frac{1+e^2u^2}{D^2},\qquad
\frac{d}{du}\frac{\operatorname{artanh}(eu)}e=\frac1D.
$$

分子を通分して $2/D^2$ を得ます。$du/d\phi=\cos\phi$ を掛けるので

$$
q'(\phi)=\frac{2(1-e^2)\cos\phi}{D^2},\qquad
q'(0)=2(1-e^2).
$$

[楕円体の面積要素](#thm-geod19-authalic-area)の $MN\cos\phi=a^2(1-e^2)\cos\phi/D^2$ と比較し、$MN\cos\phi=a^2q'/2$ です。
<!-- solution-end -->

<a id="ex-geod19-a02"></a>
#### A2. 球面極限と極の値

$a=b=R>0$ の場合の $q,q_p,R_q,\beta$ をすべて求めよ。また $0<e<1$ では $q(-\pi/2)=-q_p$ となる理由を説明せよ。

- Level: A
- ID: GEOD19-A2

<!-- solution-start -->
**詳細解答。** $e=0$ の[定義](#def-geod19-authalic)から $q=2\sin\phi$、$q_p=2$ です。$R_q=R\sqrt{2/2}=R$、$\beta=\arcsin(\sin\phi)=\phi$ となります。$0<e<1$ では $\sin(-\phi)=-\sin\phi$、分母は偶関数であり、$\operatorname{artanh}$ は奇関数です。従って $q(-\phi)=-q(\phi)$。$\phi=\pi/2$ を代入して $q(-\pi/2)=-q_p$ です。
<!-- solution-end -->

<a id="ex-geod19-a03"></a>
#### A3. 有限緯度帯の面積

長半径 $a>0$、離心率 $0\le e<1$ の楕円体で、緯度 $0\le\phi\le\pi/6$、経度幅 $\Delta\lambda=\pi/3$ の帯の面積を $q(\pi/6)$ で表し、正積球でも同じ式を得よ。

- Level: A
- ID: GEOD19-A3

<!-- solution-start -->
**詳細解答。** 楕円体の面積は、[正積緯度の面積保存定理](#thm-geod19-authalic-area)に $\phi_1=0,\phi_2=\pi/6$ を適用して求めます。$q(0)=0$ を代入すると

$$
A=\frac{a^2}{2}\frac\pi3[q(\pi/6)-0]=\frac{\pi a^2}{6}q(\pi/6).
$$

球では $\beta(0)=0$、$\sin\beta(\pi/6)=q(\pi/6)/q_p$、$R_q^2=a^2q_p/2$ です。よって

$$
A=R_q^2\frac\pi3\frac{q(\pi/6)}{q_p}
=\frac{\pi a^2}{6}q(\pi/6).
$$

両者が同じ緯度帯に対応するのは、$\beta$ が単調増加だからです。
<!-- solution-end -->

<a id="ex-geod19-a04"></a>
#### A4. Lambert の距離縮尺

半径 $R>0$ の球で赤道接触型Lambert正積円筒 $E=R\lambda,\ N_p=R\sin\beta$ を使う。$\beta=60^\circ$ で東西・南北の局所長さ縮尺を求め、面積と等角性を判定せよ。

- Level: A
- ID: GEOD19-A4

<!-- solution-start -->
**詳細解答。** 球面の東西・南北の地表長はそれぞれ $R\cos\beta\,d\lambda$、$R\,d\beta$ であり、投影した長さは $R\,d\lambda$、$R\cos\beta\,d\beta$ です。従って

$$
k_{\mathrm E}=\frac1{\cos60^\circ}=2,
\qquad k_{\mathrm N}=\cos60^\circ=\frac12.
$$

方向が直交しているので面積比は積の1です。しかし二つの縮尺は等しくありません。[等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)の全方向に共通の $k$ がないため等角ではありません。
<!-- solution-end -->

<a id="ex-geod19-a05"></a>
#### A5. Albers の標準緯線

半径 $R=1$ の球で $\beta_1=30^\circ$、$\beta_2=60^\circ$ とする。Albers正積円錐の $n,C$ を求め、$\beta=\beta_1$ で $n\rho=\cos\beta_1$ を確認せよ。

- Level: A
- ID: GEOD19-A5

<!-- solution-start -->
**詳細解答。** $\sin30^\circ=1/2$、$\sin60^\circ=\sqrt3/2$ より

$$
n=\frac{1+\sqrt3}{4},\qquad
C=\frac34+2n\frac12=1+\frac{\sqrt3}{4}.
$$

[Albersの定義](#def-geod19-albers)で $R=1$ とすると

$$
n\rho(\beta_1)
=\sqrt{C-2n\sin\beta_1}
=\sqrt{\frac34}
=\frac{\sqrt3}{2}=\cos30^\circ.
$$

正の平方根を取る根拠は $n,\rho,\cos\beta_1>0$ だからです。よって緯線方向の縮尺は1です。
<!-- solution-end -->

### Level B：複数の条件と構成を接続する

<a id="ex-geod19-b01"></a>
#### B1. 正積緯度の逆変換と安全な区間

$a>b>0$ の楕円体と、与えられた $\beta_*\in(-\pi/2,\pi/2)$ に対し、$\phi$ を一意に求める方程式を作れ。二分法の初期区間、更新規則、誤差の上界を示し、$\beta_*=0$ の解を検算せよ。

- Level: B
- ID: GEOD19-B1

<!-- solution-start -->
**詳細解答。** 求める方程式を

$$
F(\phi)=q(\phi)-q_p\sin\beta_*=0
$$

とする。[正積緯度の定理](#thm-geod19-authalic-area)から $F$ は $(-\pi/2,\pi/2)$ で厳密単調増加、$F(-\pi/2)<0<F(\pi/2)$ なので解がただ一つあります。初期区間は $[L_0,U_0]=[-\pi/2,\pi/2]$ とします。$m_j=(L_j+U_j)/2$ を計算し、$F(m_j)<0$ なら $L_{j+1}=m_j,U_{j+1}=U_j$、$F(m_j)>0$ なら $L_{j+1}=L_j,U_{j+1}=m_j$、零なら終了します。

$j$ 回二分した区間幅は $\pi/2^j$ 以下です。中点を近似値とすれば絶対緯度誤差は $\pi/2^{j+1}$ rad 以下です。$\beta_*=0$ では $F(0)=q(0)=0$ なので $\phi=0$。極の端点が数値的不安定な場合でも、二分法は正負の括りを維持します。
<!-- solution-end -->

<a id="ex-geod19-b02"></a>
#### B2. Albers のJacobianを再導出する

$R>0$、$0<\beta_1<\beta_2<\pi/2$、$n=(\sin\beta_1+\sin\beta_2)/2$、$\rho=(R/n)\sqrt{C-2n\sin\beta}$ とする。$E=\rho\sin[n(\lambda-\lambda_0)]$、$N_p=\rho_0-\rho\cos[n(\lambda-\lambda_0)]$ が等積であることをJacobianから示し、二つの標準緯線での縮尺を計算せよ。

- Level: B
- ID: GEOD19-B2

<!-- solution-start -->
**詳細解答。** $\theta=n(\lambda-\lambda_0)$、$C=\cos^2\beta_1+2n\sin\beta_1$ です。$\rho^2=(R^2/n^2)(C-2n\sin\beta)$ を微分すると

$$
2\rho\rho'=-\frac{2R^2}{n}\cos\beta,
\qquad -n\rho\rho'=R^2\cos\beta.
$$

偏微分を列にとると

$$
J_{(\lambda,\beta)}=
\begin{pmatrix}
n\rho\cos\theta&\rho'\sin\theta\\
n\rho\sin\theta&-\rho'\cos\theta
\end{pmatrix}.
$$

行列式は $-n\rho\rho'(\cos^2\theta+\sin^2\theta)=R^2\cos\beta$、すなわち球の面積要素です。球の緯線方向の長さは $R\cos\beta\,d\lambda$ で、像の長さは $n\rho\,d\lambda$。従って $k_{\mathrm E}=n\rho/(R\cos\beta)$ です。経線方向は $k_{\mathrm N}=|\rho'|/R$ であり積は1です。$i=1,2$ で $C-2n\sin\beta_i=\cos^2\beta_i$ を順に代入すれば $n\rho(\beta_i)=R\cos\beta_i$、よって両縮尺が1と分かります。
<!-- solution-end -->

<a id="ex-geod19-b03"></a>
#### B3. Mollweide の解の一意性と赤道縮尺

$2\vartheta+\sin2\vartheta=\pi\sin\beta$ の解が $\beta\in(-\pi/2,\pi/2)$ で一意かつ微分可能であることを示せ。さらにMollweide図法の赤道での東西・南北局所縮尺を求め、面積を確かめよ。

- Level: B
- ID: GEOD19-B3

<!-- solution-start -->
**詳細解答。** 左辺 $h(\vartheta)$ は $h(-\pi/2)=-\pi$、$h(\pi/2)=\pi$、開区間で $h'=4\cos^2\vartheta>0$ です。$\pi\sin\beta$ はその間にあるので中間値の定理と単調性から解が唯一で、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により非極点で微分可能です。$\beta=0$ では $\vartheta=0$、暗黙微分から

$$
4\cos^2\vartheta\,\vartheta'=\pi\cos\beta,
\qquad\vartheta'(0)=\frac\pi4.
$$

赤道で $E_\lambda=(2\sqrt2/\pi)R$、$(N_p)_\beta=\sqrt2R\,(\pi/4)$。球面赤道の東・北方向の微小長さはどちらも $R$ 倍なので

$$
k_{\mathrm E}=\frac{2\sqrt2}{\pi},\qquad
k_{\mathrm N}=\frac\pi{2\sqrt2},\qquad
k_{\mathrm E}k_{\mathrm N}=1.
$$

ただし赤道以外では $E_\beta$ も現れるため、一般点の主伸縮率をこの二列の長さの積だけから読むのは不適切です。面積はJacobian行列式で判定します。
<!-- solution-end -->

<a id="ex-geod19-b04"></a>
#### B4. 等角と等積のTissot比較

半径 $R>0$ の球で、$\beta=60^\circ$ における赤道接触型Lambert正積円筒と正軸Mercatorの東西・南北局所縮尺および面積縮尺を比較せよ。それぞれが等角か、等積かを判定し、形状を優先する局所図と面積を優先する主題図のどちらに向くか説明せよ。

- Level: B
- ID: GEOD19-B4

<!-- solution-start -->
**詳細解答。** Lambertでは $E=R\lambda,N_p=R\sin\beta$ を偏微分し、東西は $R/(R\cos\beta)=\sec\beta$、南北は $(R\cos\beta)/R=\cos\beta$ です。60°で $(k_{\mathrm E},k_{\mathrm N})=(2,1/2)$、面積縮尺は1。直交した二方向の長さ縮尺が違うので等角ではありません。

Mercatorでは $E=R\lambda,N_p=R\log\tan(\pi/4+\beta/2)$、$dN_p/d\beta=R/\cos\beta$ なので、東西・南北とも $\sec\beta=2$、面積縮尺は4です。[GEOD13の等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)により局所的に等角、非等積です。角度・形を優先する局所用途には後者の性質が役立ちますが、60°で面積を4倍に見せる図法を面積比の主題図へ無批判に用いるべきではありません。逆にLambertの小円は半軸 $(2,1/2)$ の楕円になり、形状の精度を必要とする用途には不向きです。
<!-- solution-end -->

### Level C：楕円体から世界図までの総合設計

<a id="ex-geod19-c01"></a>
#### C1. 面積の数量地図と地域測量図を分けて設計する

WGS84楕円体 $a=6378137\ \mathrm m$、$1/f=298.257223563$ の上で、北緯30°–60°、経度幅20°の領域を考える。次を求め、根拠とともに説明せよ。

1. $q_p,R_q$ と測地緯度45°の正積緯度を計算せよ（数値は適切に丸めてよい）。
2. 帯域の真の面積を $q(30^\circ),q(60^\circ)$ で表し、赤道接触型Lambert正積円筒への像の幅・高さの積と一致することを示せ。
3. 測地緯度45°でのLambertの楕円体上の東西・南北縮尺を計算し、面積比と形状歪みを評価せよ。
4. 同一領域を人口量の主題図と地域内の角度・短距離の測量図として表示するとき、図法の候補と、その図法だけでは解決しない問題を一つずつ挙げよ。

- Level: C
- ID: GEOD19-C1

<!-- solution-start -->
**詳細解答。** 以下の三角関数は度をラジアンに変換して評価します。

**1. 正積球を構成する。** $f=1/298.257223563$、$e^2=f(2-f)$ を[正積緯度の定義](#def-geod19-authalic)へ代入します。

$$
\begin{aligned}
e^2&\simeq0.00669437999014,\\
q_p&=1+\frac{1-e^2}{e}\operatorname{artanh}e\simeq1.99553108750,\\
R_q&=a\sqrt{q_p/2}\simeq6371007.181\ \mathrm m,\\
q(45^\circ)&\simeq1.40789038773,\\
\beta(45^\circ)&=\arcsin[q(45^\circ)/q_p]\simeq44.8717028734^\circ.
\end{aligned}
$$

**2. 有限面積を二つの式で出す。** $\Delta\lambda=20\pi/180=\pi/9$ です。楕円体上では

$$
A_{\mathrm{ell}}=\frac{a^2\pi}{18}[q(60^\circ)-q(30^\circ)]
\simeq5.1960383535\times10^{12}\ \mathrm{m}^2.
$$

Lambertでは長方形の幅と高さを別々に計算します。

$$
\begin{aligned}
W&=R_q\Delta\lambda\simeq2223901.040\ \mathrm m,\\
H&=R_q[\sin\beta(60^\circ)-\sin\beta(30^\circ)]
\simeq2336452.145\ \mathrm m.
\end{aligned}
$$

従って

$$
WH=R_q^2\Delta\lambda\frac{q(60^\circ)-q(30^\circ)}{q_p}
=\frac{a^2\Delta\lambda}{2}[q(60^\circ)-q(30^\circ)]
=A_{\mathrm{ell}}.
$$

独立検算では $q$ の原始関数を使わず、面積密度

$$
g(\phi)=\frac{a^2(1-e^2)\cos\phi}{(1-e^2\sin^2\phi)^2}
$$

を $\phi\in[\pi/6,\pi/3]$ で数値積分します。$120$ 等分、$h=(\pi/3-\pi/6)/120=\pi/720$、$\phi_j=\pi/6+jh$ とすると、合成Simpson則は

$$
A_{\mathrm S}=\frac{\Delta\lambda\,h}{3}
\left[g(\phi_0)+g(\phi_{120})
+4\sum_{j=1,3,\ldots,119}g(\phi_j)
+2\sum_{j=2,4,\ldots,118}g(\phi_j)\right]
\simeq5.19603835354\times10^{12}\ \mathrm{m}^2.
$$

同じ分割で合成台形則は $A_{\mathrm T}\simeq5.19602990974\times10^{12}\ \mathrm{m}^2$ です。解析式の $5.19603835352\times10^{12}\ \mathrm{m}^2$ と照合すると、Simpson則のずれは約 $13\ \mathrm{m}^2$、台形則は約 $8.44\times10^6\ \mathrm{m}^2$ で、分割幅による数値積分誤差と区別できます。経度の切れ目をまたがず、像は重ならないと仮定しています。

**3. 地表の距離に正規化する。** [Lambertの楕円体縮尺](#thm-geod19-lambert-area)の $\beta_0=0$ を使い、$N=a/\sqrt{1-e^2\sin^2\phi}$ とします。

$$
\begin{aligned}
k_{\mathrm E}&=\frac{R_q}{N(45^\circ)\cos45^\circ}
\simeq1.410266523,\\
k_{\mathrm N}&=\frac1{k_{\mathrm E}}\simeq0.709085824,\\
A&=k_{\mathrm E}k_{\mathrm N}=1.
\end{aligned}
$$

局所面積は同じですが、東西は約1.41倍、南北は約0.71倍に変形します。正積緯度を経由したからといって距離が保存されるわけではありません。

**4. 目的で決める。** 人口量の世界主題図ではMollweideや次章のEqual Earth等の**等積世界図法**を候補とし、人口密度は面積あたりの量であることを別途確認します。面積量の符号化（色階級・集計地域の単位）は投影だけでは決まりません。地域内の角度や短い測地距離を扱うなら局所等角のGauss–Krüger系を候補としますが、縮尺は厳密には1ではないため[点縮尺の検算](../GEOD18/index.md#thm-geod18-convergence-scale)と、座標帯・標高による還元が必要です。図法を選んでも、元データのdatumや座標時点が自動的に統一されることはありません。
<!-- solution-end -->

---

## 7. 次章へ：Equal Earth の形を保ちながら面積を保てるか

ここで作ったのは、楕円体の面積を正積球へ移す厳密な方法と、円筒・円錐・擬円筒の等積性を確かめる道具です。次のGEOD20では、世界図の見た目を別の曲線で設計するEqual Earth図法を扱います。その場合も、まず正積緯度と半径 $R_q$ を決め、**設計した平面写像のJacobianが $R_q^2\cos\beta$ になるか**を検算します。
