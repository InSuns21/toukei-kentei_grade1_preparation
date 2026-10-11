# CDYN9 位相応答と等時相面の入口

[CDYN3の周期軌道上の時間位相](../CDYN3/index.md#def-cdyn3-orbit-phase)は、同じ閉軌道を一周する時計を作りました。しかし周期軌道の**外側**で受けた小さな衝撃が、次の一周を早めるのか遅らせるのかは、その定義だけでは分かりません。[CDYN8の平均振幅方程式](../CDYN8/index.md#thm-cdyn8-amplitude-equation)は半径が安定値へ近づく例を示しましたが、平均振幅の平衡値だけから、元の系の周期軌道が実在すると結論できないことにも注意しました。

今回は周期軌道が**正確に存在し、吸引されることを直接証明できる平面系**を使います。円の外側の点にも「いつ円の基準点に追いつくか」という時計を付け、その時計の勾配から外力の位相効果を導きます。この構成によって、振幅変化と長く残る位相ずれを分けられます。

## 1. 吸引される円を持つ明示模型

実数定数を $\lambda>0$、$c\in\mathbb R$、$\omega\in\mathbb R$ とし、$\Omega=\omega-c\lambda>0$ を仮定します。平面の点を $(x,y)$、$r^2=x^2+y^2$ として、次の滑らかな自律系を考えます。

$$
\begin{cases}
x'=(\lambda-r^2)x-(\omega-cr^2)y,\\
y'=(\omega-cr^2)x+(\lambda-r^2)y.
\end{cases}
$$

原点以外では $x=r\cos\theta$、$y=r\sin\theta$ と置きます。まず半径と角度の微分を確かめましょう。$xx'+yy'=rr'$ の右辺で回転項は打ち消し合い、

$$
rr'=(\lambda-r^2)(x^2+y^2)
=(\lambda-r^2)r^2.
$$

また $xy'-yx'=r^2\theta'$ なので

$$
r'=r(\lambda-r^2),\qquad
\theta'=\omega-cr^2\quad(r>0).
$$

この極座標の式は原点を除く場所で成り立ちます。半径 $R=\sqrt{\lambda}$ では $r'=0$、円上の角速度は $\Omega>0$ です。したがって

$$
\gamma(t)=R(\cos\Omega t,\sin\Omega t)
$$

は最小正周期 $T_*=2\pi/\Omega$ を持つ**実際の周期解**です。単なる平均系の予測ではありません。

<a id="prop-cdyn9-radial-attraction"></a>

<!-- formal-statement-start -->
### 命題（吸引円と半径の明示解）

$\lambda>0$、$c,\omega\in\mathbb R$、$\Omega=\omega-c\lambda>0$ とし、上の平面系を考える。初期半径 $r_0>0$ の解は全時刻 $t\ge0$ で原点を避けて存在し、

$$
r(t)^2=
\frac{\lambda}
{1+(\lambda/r_0^2-1)e^{-2\lambda t}}
$$

を満たす。したがって $r(t)\to R=\sqrt\lambda$ であり、半径 $R$ の円 $\Gamma$ は周期 $T_*=2\pi/\Omega$ の周期軌道である。
<!-- formal-statement-end -->

**証明の見取り図**　半径の二乗を $u$ とするとロジスティック型の方程式になります。分母が全時刻で正であることまで確かめれば、極座標を途中で失わず、円へ収束することも分かります。

<!-- proof-start -->
### 証明

$u=r^2$ と置き、半径の式へ $u'=2rr'$ を代入すると

$$
u'=2u(\lambda-u).
$$

$u_0=r_0^2>0$ とし、$w=\lambda/u-1$ と置けば

$$
w'=-\frac{\lambda u'}{u^2}
=-2\lambda\frac{\lambda-u}{u}
=-2\lambda w.
$$

よって $w(t)=(\lambda/u_0-1)e^{-2\lambda t}$ となり、$u=\lambda/(1+w)$ から表示式を得ます。$\lambda/u_0>0$ だから $\lambda/u_0-1>-1$ です。$t\ge0$ なら $e^{-2\lambda t}\in(0,1]$ なので、分母は常に正です。したがって半径は正で有限、さらに $u(t)\to\lambda$ です。

角度方程式の右辺 $\omega-cu(t)$ は有限時間区間で連続かつ有界です。よって $\theta(t)=\theta_0+\int_0^t(\omega-cu(s))\,ds$ と定められ、$x=r\cos\theta,y=r\sin\theta$ は任意の有限時刻まで存在します。$r=R$ では半径が一定で $\theta'=\Omega$ ですから $\gamma$ が得られ、$\Omega>0$ より最小周期は $2\pi/\Omega$ です。$\square$
<!-- proof-end -->

例えば $\lambda=1,c=0,\omega=2$ では $r_0=2$ からでも $r_0=1/2$ からでも $r(t)\to1$。円内外からの半径差は消えますが、**回転する時計の読み**まで一致するとはまだ言えません。

## 2. 円の外まで位相を延ばす

円上では [CDYN3の時間位相](../CDYN3/index.md#def-cdyn3-orbit-phase) を $\phi=[\Omega t]_{2\pi}$ と選べます。円の外側から出発する解については「同時刻の円上のどの点に近づくか」を位相の定義にしたいのです。

角速度が半径に依存しない $c=0$ の場合は、極角 $\theta$ が毎秒 $\omega$ だけ増えるので、それだけで時計になります。一方 $c\ne0$ では半径が変わる間に角速度も変わります。そこで、角度から半径に応じた補正を引きます。

<a id="def-cdyn9-asymptotic-phase"></a>

<!-- formal-statement-start -->
### 定義（明示模型の漸近位相）

第1節の平面系で $r>0$ とする。$R=\sqrt\lambda$ に対し、円周値の写像

$$
\Phi(r,\theta)=
[\theta-c\log(r/R)]_{2\pi}
\in\mathbb S^1
$$

を**漸近位相**とする。局所的に角度を連続に持ち上げた実数値も、文脈に応じて $\Phi$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn9-asymptotic-phase -->

**定義の確認**　$c=0$ なら $\Phi=[\theta]_{2\pi}$。$\lambda=1,c=1,\omega=3$ なら $\Omega=2$ で、$(r,\theta)=(e,\ 1)$ は $\Phi=[1-\log e]_{2\pi}=[0]_{2\pi}$ です。円上の $(1,0)$ と同じ漸近位相ですが、初期状態は同じ点ではありません。
<!-- definition-example-end -->

角度 $\theta$ を $\theta+2\pi k$ と取り直しても $\Phi$ は $2\pi k$ だけ変わるだけです。従って円周上の値として曖昧さはありません。一方 $r=0$ では対数と偏角が定義できません。**原点を漸近位相の定義域へ含めない**ことが重要です。

<a id="thm-cdyn9-phase-conjugacy"></a>

<!-- formal-statement-start -->
### 定理（位相の一定速度進行と漸近的な追跡）

第1節の条件を満たし、初期半径 $r_0>0$ とする。初期位相を $\phi_0=\theta_0-c\log(r_0/R)$ の実数値の代表として選ぶと、任意の $t\ge0$ で

$$
\Phi(x(t),y(t))=[\phi_0+\Omega t]_{2\pi}
$$

が成り立つ。また、対応する円上の解 $\gamma_{\phi_0}(t)=R(\cos(\phi_0+\Omega t),\sin(\phi_0+\Omega t))$ に対して

$$
\lim_{t\to\infty}
\|(x(t),y(t))-\gamma_{\phi_0}(t)\|=0
$$

が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　$\theta$ の角速度に含まれる $-cr^2$ と、$\log r$ の微分に含まれる $-r^2$ が相殺します。残った $\Omega$ は半径によらず一定です。さらに半径収束と角度差の収束を別々に照合します。

<!-- proof-start -->
### 証明

$r(t)>0$ が全時刻で成立することは[吸引円と半径の明示解](#prop-cdyn9-radial-attraction)で確認しました。連続な角度 $\theta(t)$ を用いると

$$
\frac{d}{dt}\{\theta-c\log(r/R)\}
=(\omega-cr^2)-c\frac{r'}r.
$$

ここへ $r'/r=\lambda-r^2$ を代入すれば

$$
\frac{d}{dt}\{\theta-c\log(r/R)\}
=\omega-cr^2-c(\lambda-r^2)
=\omega-c\lambda=\Omega.
$$

初期値から積分して、実数値の位相 $\phi(t)=\phi_0+\Omega t$ を得ます。従って

$$
\theta(t)=\phi_0+\Omega t+c\log(r(t)/R).
$$

[半径収束](#prop-cdyn9-radial-attraction)により $r(t)\to R>0$ ですから、対数項も0へ収束します。二つの単位ベクトルの差の長さは角度差の絶対値以下であることを使うと

$$
\begin{aligned}
&\|(x,y)-\gamma_{\phi_0}(t)\|\\
&\quad\le |r-R|
+R\left|c\log(r/R)\right|
\longrightarrow0.
\end{aligned}
$$

よって所望の漸近追跡が成立します。$\square$
<!-- proof-end -->

この定理は「同じ位相を持つ初期値は、時間をそろえて見たとき、同じ円上の進行点へ漸近する」と明確に述べています。単に円までの**距離**が小さくなるだけでは、円周方向のずれを比較できません。

## 3. 等時相線はいつ放射状になるか

一定の位相を持つ点を一つの集合に集めると、円へ吸い寄せられる間も時計の読みに差が出ない初期値の形が見えます。平面では「等時相面」は曲線として現れます。

<a id="def-cdyn9-isochron"></a>

<!-- formal-statement-start -->
### 定義（明示模型の等時相線）

$\alpha\in\mathbb S^1$ に対して

$$
I_\alpha=\{(x,y)\in\mathbb R^2\setminus\{0\}:
\Phi(x,y)=\alpha\}
$$

を位相 $\alpha$ の**等時相線**とする。異なる二つの初期値が同じ $I_\alpha$ にあるとき、それぞれの解は時刻をそろえて同じ円上の解に漸近する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn9-isochron -->

**定義の確認**　$\lambda=1,c=0$ の場合、$I_{[0]}$ は正の $x$ 軸そのものです。これに対して $c=1$ なら条件 $\theta-\log r\equiv0\pmod{2\pi}$ から $\theta=\log r+2\pi k$。正の $x$ 軸上にある $r=e$ の点は $\Phi=[-1]_{2\pi}$ なので、$(1,0)$ と同じ等時相線には入りません。
<!-- definition-example-end -->

等時相線の極座標表示は

$$
\theta=\alpha+c\log(r/R)+2\pi k,\qquad
r>0,\quad k\in\mathbb Z
$$

です。$c=0$ では放射状、$c\ne0$ では対数らせんとなります。例えば同じ放射線上の二点は、角度が一致していても半径が違えば一般に漸近位相が異なります。このため「位相はいつでも偏角」と考えて外力応答を調べると、位相のずれを見落とします。

等時相線は**位相の等高線**であって、個々の解軌道ではありません。[位相の一定速度進行と漸近的な追跡](#thm-cdyn9-phase-conjugacy)により、初期値が $I_\alpha$ 上なら時刻 $t$ の点は $I_{[\alpha+\Omega t]_{2\pi}}$ 上へ移ります。同じ等時相線に停留するわけではありません。

## 4. 接線方向の中立性と振幅方向の収縮

[CDYN4の周期変分方程式と接線方向の乗数1](../CDYN4/index.md#thm-cdyn4-tangent-unit)によれば、自律系の周期軌道は進行方向の微小な時刻ずれを一周後にも保持します。今回の模型では、円に垂直な方向をどれだけ縮めるかまで具体的に計算できます。

<a id="prop-cdyn9-multipliers"></a>

<!-- formal-statement-start -->
### 命題（吸引円の二つのFloquet乗数）

第1節の平面系の周期軌道 $\Gamma$ について、一周期 $T_*=2\pi/\Omega$ の変分写像の二つの固有値は

$$
1,\qquad e^{-2\lambda T_*}
$$

である。特に $\lambda>0$ なので第二の乗数は $0<e^{-2\lambda T_*}<1$ である。
<!-- formal-statement-end -->

**証明の見取り図**　円近くでは座標 $(r,\phi)$ が使えます。この座標で半径と漸近位相の方程式が分離しているため、一周期の微分は対角行列になります。ただし半径と幾何学的な偏角 $(r,\theta)$ では位相せん断が残る点に注意します。

<!-- proof-start -->
### 証明

$r=R$ 近傍で連続に持ち上げた $\phi=\theta-c\log(r/R)$ を使うと、[位相の一定速度進行と漸近的な追跡](#thm-cdyn9-phase-conjugacy)から

$$
r'=f(r)=\lambda r-r^3,\qquad \phi'=\Omega.
$$

円周上 $f'(R)=\lambda-3R^2=\lambda-3\lambda=-2\lambda$ です。初期値を $r(0)=R+\delta r_0$、$\phi(0)=\phi_0+\delta\phi_0$ と変化させると、変分は

$$
\delta r'=-2\lambda\delta r,\qquad
\delta\phi'=0.
$$

したがって一周期後は

$$
\begin{pmatrix}\delta r(T_*)\\\delta\phi(T_*)\end{pmatrix}
=
\begin{pmatrix}e^{-2\lambda T_*}&0\\0&1\end{pmatrix}
\begin{pmatrix}\delta r_0\\\delta\phi_0\end{pmatrix}.
$$

$\partial(x,y)/\partial(r,\phi)$ の行列式は $r>0$ です。実際、$\theta=\phi+c\log(r/R)$ で極座標への変換を合成し、それぞれのJacobian行列式が $r$ と $1$ なので積は $r$。円の上では $r=R>0$ だから局所的に可逆です。一周期後の基点は同じ円上の点なので、直交座標での変分行列は上の対角行列と相似であり、固有値は変わりません。$\square$
<!-- proof-end -->

第二の乗数が1より小さいことは、位相方向まで収縮する意味ではありません。二つの初期値の位相が異なれば、そのずれは時間が経っても消えず、円上の別の点を追い続けます。

## 5. 小さな衝撃を位相の変化へ変換する

位相の時計 $\Phi$ が分かれば、瞬間的に状態を小さく押したときの時計の読みの変化を微分で測れます。これを位相応答と考えます。

<a id="def-cdyn9-phase-response"></a>

<!-- formal-statement-start -->
### 定義（位相応答ベクトル）

周期軌道 $\Gamma$ 上の位相 $\phi\in\mathbb S^1$ に対して、$\Phi$ の局所的な実数値代表の勾配を円上で評価した

$$
Z(\phi)=\nabla\Phi(R\cos\phi,R\sin\phi)
$$

を、この模型の**位相応答ベクトル**とする。これは状態の微小変位 $v\in\mathbb R^2$ から一次の位相変化 $Z(\phi)\cdot v$ を作るベクトルである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn9-phase-response -->

**定義の確認**　$c=0$、$R=1$、$\phi=0$ では $\Phi=\theta$ なので、右向きの微小変位 $(1,0)$ に対して応答は0、上向き $(0,1)$ には応答1です。後の計算式は $Z(0)=(0,1)$ となり、この直観と一致します。
<!-- definition-example-end -->

<a id="thm-cdyn9-response-formula"></a>

<!-- formal-statement-start -->
### 定理（位相応答公式と外力下の正確な位相方程式）

第1節の平面系について、円上の位相応答ベクトルは

$$
Z(\phi)=\frac1R
\begin{pmatrix}
-\sin\phi-c\cos\phi\\
\cos\phi-c\sin\phi
\end{pmatrix}.
$$

さらに、状態 $(x,y)$ が原点以外にあるとき、連続な外力 $p(t)\in\mathbb R^2$ を加えた方程式

$$
X'=F(X)+\varepsilon p(t),\qquad X=(x,y)
$$

の解に対し、連続に持ち上げた位相 $\phi(t)=\Phi(X(t))$ は、その解が原点を避ける区間で厳密に

$$
\phi'=\Omega+\varepsilon\nabla\Phi(X(t))\cdot p(t)
$$

を満たす。円上の点 $X_\phi=R(\cos\phi,\sin\phi)$ を微小量 $\delta v$ だけ動かすときは

$$
\Phi(X_\phi+\delta v)-\Phi(X_\phi)
=\delta Z(\phi)\cdot v+O(\delta^2)
$$

が局所的な実数値位相について成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　偏角の勾配と対数半径の勾配を、円上で一つずつ計算します。外力下では連鎖律だけを使うので厳密な式ですが、勾配を円上の $Z(\phi)$ に置き換えるには別の誤差評価が必要です。

<!-- proof-start -->
### 証明

$r^2=x^2+y^2>0$ なので、角度の局所的な枝で

$$
\nabla\theta=\frac1{r^2}(-y,x),\qquad
\nabla\log(r/R)=\frac1{r^2}(x,y).
$$

従って

$$
\nabla\Phi(x,y)=\frac1{r^2}(-y-cx,\ x-cy).
$$

$x=R\cos\phi$、$y=R\sin\phi$ を代入すれば $Z(\phi)$ の明示式を得ます。第2節の[一定速度進行定理](#thm-cdyn9-phase-conjugacy)の連鎖律による計算で、外力のない場 $F$ に対して $\nabla\Phi(X)\cdot F(X)=\Omega$ が既に確かめられています。外力を加えた場合も、同じ点 $X(t)$ で微分すれば

$$
\phi'=\nabla\Phi(X)\cdot X'
=\nabla\Phi(X)\cdot F(X)
+\varepsilon\nabla\Phi(X)\cdot p
=\Omega+\varepsilon\nabla\Phi(X)\cdot p.
$$

最後に $\Phi$ は円上の点の近傍で滑らかな実数値の枝を取れます。固定ベクトル $v$ に沿った一変数関数 $g(\delta)=\Phi(X_\phi+\delta v)$ を点 $\delta=0$ で Taylor 展開すると

$$
g(\delta)=g(0)+\delta g'(0)+O(\delta^2),\qquad
g'(0)=\nabla\Phi(X_\phi)\cdot v.
$$

これにより結論が得られます。$\square$
<!-- proof-end -->

**二方向の衝撃を比較する**　円上の外向き単位ベクトル $e_r=(\cos\phi,\sin\phi)$ と接線方向 $e_\theta=(-\sin\phi,\cos\phi)$ に対し、

$$
Z(\phi)\cdot e_r=-\frac cR,\qquad
Z(\phi)\cdot e_\theta=\frac1R.
$$

$c=0$ では半径方向に押しても一次の位相変化はなく、接線方向だけが時計を進めます。$c\ne0$ では半径方向の押し出しも、戻るまでの角速度の変化を通じて**永続する位相差**を生みます。

## 6. 位相だけの近似をどこまで正当化できるか

外力下の正確な位相方程式にある $\nabla\Phi(X(t))$ を、円上の $Z(\phi(t))$ に置き換えれば、状態二成分の運動を位相一成分だけで扱えます。ただしこの置換は恒等式ではありません。

<a id="thm-cdyn9-finite-phase-reduction"></a>

<!-- formal-statement-start -->
### 定理（周期軌道上から出発する弱外力の有限時間位相縮約）

第1節の平面系で初期値 $X(0)\in\Gamma$ とする。$T>0$、$P>0$ を固定し、$p:[0,T]\to\mathbb R^2$ を連続かつ $\|p(t)\|\le P$ とする。十分小さい $0\le\varepsilon$ に対し、外力付き方程式 $X'=F(X)+\varepsilon p(t)$ の解は $[0,T]$ で原点を避け、その実数値位相 $\phi(t)$ は

$$
\phi'(t)=\Omega+\varepsilon Z(\phi(t))\cdot p(t)
+\mathcal R_\varepsilon(t)
$$

を満たす。ただし $\varepsilon$ に依存しない定数 $K_T$ が存在して

$$
\sup_{0\le t\le T}|\mathcal R_\varepsilon(t)|
\le K_T\varepsilon^2
$$

である。この結論は固定された有限時間区間での評価であり、$T$ を $\varepsilon$ に依存させて無限に延ばした評価ではない。
<!-- formal-statement-end -->

**証明の見取り図**　外力で半径が円から離れる量をまず $O(\varepsilon)$ に抑えます。角度と漸近位相の差も $O(\varepsilon)$ なので、円上に評価点を移したときの勾配の差が $O(\varepsilon)$。最後に外力の $\varepsilon$ がもう一つ掛かります。

<!-- proof-start -->
### 証明

$R=\sqrt\lambda$ とおき、半径が $[R/2,3R/2]$ にある間を考えます。外力の半径方向の成分は

$$
r'=f(r)+\varepsilon p(t)\cdot e_r,\qquad
f(r)=\lambda r-r^3,\quad
e_r=(x/r,y/r)
$$

なので $|p\cdot e_r|\le P$ です。$f(R)=0$ で、$[R/2,3R/2]$ 上の $|f'(r)|$ の最大値を $L$ とすると、$d(t)=|r(t)-R|$ は積分形式で

$$
d(t)\le L\int_0^t d(s)\,ds+\varepsilon Pt
$$

を満たします。[ODE8のGrönwallの不等式](../ODE8/index.md#lem-ode8-gronwall)に固定した $T$ と非減少な強制項 $\varepsilon Pt$ を代入するか、その積分形式を一度積分して評価すると

$$
d(t)\le\varepsilon PT e^{LT}
\qquad(0\le t\le T)
$$

を得ます。この評価は帯内に留まる限り成立します。$\varepsilon PT e^{LT}<R/2$ となるよう $\varepsilon$ を選ぶと、帯の境界へ初めて到達したと仮定した時刻でも $d<R/2$ となり矛盾します。局所解は帯内で有界なので[ODE8の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)によって $[0,T]$ に存在し、$r\ge R/2$ です。

次に、持ち上げた位相 $\phi$ と偏角 $\theta$ の関係は、定義から厳密に

$$
\theta-\phi=c\log(r/R)
$$

です。$r\in[R/2,3R/2]$ では平均値の定理によって

$$
|\log(r/R)|
\le\frac2R|r-R|,
\qquad
|\theta-\phi|\le\frac{2|c|}{R}d(t).
$$

勾配を角度で書き直すと

$$
\nabla\Phi(X)
=\frac1r
\begin{pmatrix}
-\sin\theta-c\cos\theta\\
\cos\theta-c\sin\theta
\end{pmatrix}.
$$

括弧のベクトルの長さは $\sqrt{1+c^2}$ で、角度についての微分の長さも $\sqrt{1+c^2}$ です。また $|1/r-1/R|\le2d/R^2$。したがって

$$
\begin{aligned}
\|\nabla\Phi(X)-Z(\phi)\|
&\le\sqrt{1+c^2}\left(
\frac{2d}{R^2}+\frac{|\theta-\phi|}{R}\right)\\
&\le\frac{2\sqrt{1+c^2}(1+|c|)}{R^2}\,d(t).
\end{aligned}
$$

[正確な位相方程式](#thm-cdyn9-response-formula)との差を $\mathcal R_\varepsilon=\varepsilon(\nabla\Phi(X)-Z(\phi))\cdot p$ と置くと

$$
|\mathcal R_\varepsilon(t)|
\le\frac{2\sqrt{1+c^2}(1+|c|)}{R^2}\,
P^2Te^{LT}\varepsilon^2.
$$

右辺の $\varepsilon^2$ 以外は $\varepsilon$ から独立です。これを $K_T\varepsilon^2$ とすれば結論です。$\square$
<!-- proof-end -->

この模型であっても、初期値が円から固定距離だけ離れていれば、最初から $\nabla\Phi(X)-Z(\phi)=O(\varepsilon)$ とは限りません。またこの証明の定数は $T$ とともに大きくなります。**長時間の同期、結合振動子の位相差方程式、一般の吸引周期軌道での位相関数の存在**は、それぞれ追加の議論が必要です。次章では[CDYN7の平均化の考え方](../CDYN7/index.md#thm-cdyn7-finite-slow-time)を明示的な結合模型に適用して、この限界を踏まえた位相差方程式を作ります。

## 7. 演習と詳細解答

### A1. 半径式を直交座標から出す

$\lambda=1,\omega=3,c=1$ の模型で、$(x(0),y(0))=(2,0)$ とする。$r^2=x^2+y^2$ を直接微分して $r'$ と $\theta'$ を求め、$r(t)^2$ の明示式を導け。

- Level: A
- ID: CDYN9-A1

<!-- solution-start -->
**詳細解答**　$xx'+yy'=r^2(1-r^2)$、$xy'-yx'=r^2(3-r^2)$ と交差項を消すと、$r'=r(1-r^2)$、$\theta'=3-r^2$。$u=r^2$ なら $u'=2u(1-u)$。初期値 $u_0=4$ を[半径の明示解](#prop-cdyn9-radial-attraction)へ入れると、$1/u_0-1=-3/4$ なので

$$
r(t)^2=\frac1{1-\frac34 e^{-2t}}.
$$

分母は $t\ge0$ で $1/4$ 以上、従って半径は常に正で $r(t)\to1$ です。
<!-- solution-end -->

### A2. 幾何学的な角と漸近位相

$\lambda=1,c=1,\omega=3$ とする。初期点 $(r,\theta)=(e,1)$ と $(1,0)$ の漸近位相を比較し、$t$ が増えたとき両解の距離がどうなるか説明せよ。

- Level: A
- ID: CDYN9-A2

<!-- solution-start -->
**詳細解答**　$R=1$ なので漸近位相は $\Phi=[\theta-\log r]_{2\pi}$。最初の点は $[1-\log e]=[0]$、次も $[0-\log1]=[0]$。同じ等時相線上であり、$\Omega=3-1=2$ により両方の位相は $[2t]$ へ進みます。[漸近追跡定理](#thm-cdyn9-phase-conjugacy)を各解へ適用すると、どちらも $(\cos2t,\sin2t)$ との距離が0へ近づきます。従って三角不等式により二解間の距離も0へ近づきます。
<!-- solution-end -->

### A3. 等時相線の条件を検算する

$\lambda=4,c=2$、$\omega=9$ とする。$I_{[0]}$ 上で $r=2e$ にある点の偏角を $2\pi$ を法として求めよ。点 $(r,\theta)=(2,0)$ も同じ等時相線上にあることを確かめよ。

- Level: A
- ID: CDYN9-A3

<!-- solution-start -->
**詳細解答**　$R=\sqrt4=2$。$\Phi=[\theta-2\log(r/2)]$ です。$r=2e$ なら $\log(r/2)=1$ なので、$\Phi=[0]$ となるのは $\theta\equiv2\pmod{2\pi}$ のときです。$r=2,\theta=0$ では $\log1=0$ より $\Phi=[0]$。半径が違っても同じ位相を持つ具体例です。
<!-- solution-end -->

### A4. 位相応答の半径成分と接線成分

$R=2,c=-1$ の円上で、位相 $\phi=\pi/2$ の点における $Z(\phi)$ を求めよ。$e_r$ と $e_\theta$ への内積も計算せよ。

- Level: A
- ID: CDYN9-A4

<!-- solution-start -->
**詳細解答**　$\sin(\pi/2)=1$、$\cos(\pi/2)=0$ を[位相応答公式](#thm-cdyn9-response-formula)に入れると

$$
Z(\pi/2)=\frac12(-1,1).
$$

この点の $e_r=(0,1)$、$e_\theta=(-1,0)$ なので $Z\cdot e_r=1/2$、$Z\cdot e_\theta=1/2$。一般式 $-c/R=1/2$、$1/R=1/2$ と一致します。
<!-- solution-end -->

### A5. 中立方向と安定方向

$\lambda=1,c=0,\omega=2$ の吸引円の周期と二つのFloquet乗数を求め、円に垂直な微小変位が一周後にどう変わるかを説明せよ。

- Level: A
- ID: CDYN9-A5

<!-- solution-start -->
**詳細解答**　$\Omega=2$、$T_*=2\pi/2=\pi$。半径方向の線形化は $\delta r'=(1-3R^2)\delta r=-2\delta r$ なので、$\delta r(\pi)=e^{-2\pi}\delta r(0)$。位相は $\phi'=2$ で初期位相差は一定です。従って乗数は $e^{-2\pi}$ と $1$ です。[CDYN4の接線方向の乗数1](../CDYN4/index.md#thm-cdyn4-tangent-unit)とも整合します。
<!-- solution-end -->

### B1. 半径への刺激が位相ずれを生む

$\lambda=1,c=1,\omega=3$ とする。時刻0に円上の $(1,0)$ を $(1+\delta,0)$ へ瞬間的に動かした。ただし $|\delta|<1/2$。漸近位相の変化の厳密式と、$\delta\to0$ の一次近似を示せ。$c=0$ ならどうなるか。

- Level: B
- ID: CDYN9-B1

<!-- solution-start -->
**詳細解答**　元の位相は0、刺激後は $r=1+\delta$、$\theta=0$ なので、実数値の位相差は

$$
\Delta\phi=-\log(1+\delta).
$$

$\log(1+\delta)=\delta-\delta^2/2+O(\delta^3)$ から $\Delta\phi=-\delta+\delta^2/2+O(\delta^3)$。他方 $Z(0)=(-1,1)$、刺激方向 $v=(1,0)$ だから $Z(0)\cdot(\delta v)=-\delta$ で一次項が一致します。$c=0$ なら $\Phi=\theta$ で、半径だけを変えた刺激については $\Delta\phi=0$ が厳密に成り立ちます。
<!-- solution-end -->

### B2. 等時相線と軌道を区別する

$c\ne0$ の模型で、等時相線 $I_\alpha$ の方程式を示し、$I_\alpha$ 上の点が $t>0$ 後にも同じ $I_\alpha$ に残るか判定せよ。円上の位相進行速度 $\Omega>0$ を用いて説明せよ。

- Level: B
- ID: CDYN9-B2

<!-- solution-start -->
**詳細解答**　定義 $\Phi=[\theta-c\log(r/R)]_{2\pi}$ を $\alpha$ に等置すると、

$$
\theta=\alpha+c\log(r/R)+2\pi k,\qquad k\in\mathbb Z.
$$

これは $c\ne0$ のとき対数らせんです。[位相の一定速度進行と漸近的な追跡](#thm-cdyn9-phase-conjugacy)により、位相は $[\alpha+\Omega t]_{2\pi}$ になります。ゆえに $I_\alpha$ に残るのは $\Omega t$ が $2\pi$ の整数倍のときだけです。特に $0<t<T_*$ では別の等時相線へ移っています。
<!-- solution-end -->

### B3. 位相応答が正規化されているか

円上の接線速度 $\gamma'(t)$ に対し、$Z(\Omega t)\cdot\gamma'(t)=\Omega$ を証明せよ。$Z$ と $e_\theta$ の内積が $1/R$ であることを利用してよい。

- Level: B
- ID: CDYN9-B3

<!-- solution-start -->
**詳細解答**　$\gamma(t)=R(\cos\Omega t,\sin\Omega t)$ なので

$$
\gamma'(t)=R\Omega(-\sin\Omega t,\cos\Omega t)
=R\Omega e_\theta.
$$

一方、[位相応答公式](#thm-cdyn9-response-formula)を円上で評価すれば $Z\cdot e_\theta=1/R$。よって

$$
Z(\Omega t)\cdot\gamma'(t)
=R\Omega\cdot\frac1R=\Omega.
$$

位相を $\phi=\Omega t$ と正規化しているため、値は1でなく角速度 $\Omega$ です。時間位相 $t$ を採用すれば勾配を $\Omega$ で割る必要があります。
<!-- solution-end -->

### B4. 位相近似の誤差を測る距離

$r\in[R/2,3R/2]$ にある外力付き解について、$\phi=\theta-c\log(r/R)$ とする。$d=|r-R|$ から $|\theta-\phi|\le2|c|d/R$ を示し、$\|\nabla\Phi(X)-Z(\phi)\|$ が $d$ の定数倍以下であることを導け。

- Level: B
- ID: CDYN9-B4

<!-- solution-start -->
**詳細解答**　実数値の枝をそろえると $\theta-\phi=c\log(r/R)$ です。$r$ と $R$ の間の $\log s$ の導関数は $1/s$、区間の全点で $s\ge R/2$ なので平均値の定理により $|\log r-\log R|\le(2/R)|r-R|$。

次に $v(\alpha)=(-\sin\alpha-c\cos\alpha,\cos\alpha-c\sin\alpha)$ と置くと $\|v(\alpha)\|=\|v'(\alpha)\|=\sqrt{1+c^2}$。従って

$$
\begin{aligned}
\left\|\frac{v(\theta)}r-\frac{v(\phi)}R\right\|
&\le \left|\frac1r-\frac1R\right|\|v(\theta)\|
+\frac1R\|v(\theta)-v(\phi)\|\\
&\le\sqrt{1+c^2}
\left(\frac{2d}{R^2}+\frac{|\theta-\phi|}{R}\right)\\
&\le\frac{2\sqrt{1+c^2}(1+|c|)}{R^2}d.
\end{aligned}
$$

この不等式に $\varepsilon\|p\|\le\varepsilon P$ と $d=O(\varepsilon)$ を掛けることが、位相方程式の近似誤差が二次になる理由です。
<!-- solution-end -->

### C1. 明示模型の漸近位相・衝撃応答・位相方程式

$\lambda=1,c=1/2,\omega=5/2$ とし、初期値 $X(0)=(1,0)$ とする。

1. 円の周期と位相写像 $\Phi$ を求め、初期値 $(r_0,\theta_0)=(e^2,1)$ が同じ漸近位相を持つか判定せよ。
2. 二つのFloquet乗数を求めよ。
3. 円上位相 $\phi=0$ における半径方向と接線方向の単位衝撃の一次位相応答を求めよ。
4. 連続外力 $\|p(t)\|\le1$ を $0\le t\le1$ に加えた場合、$\varepsilon>0$ を十分小さく取れば位相のみの右辺近似誤差が $K\varepsilon^2$ 以下となることを、半径評価と勾配評価の具体的な定数で示せ。またこの結果だけで全時刻の同期が証明できるか述べよ。

- Level: C
- ID: CDYN9-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$R=\sqrt1=1$、$\Omega=\omega-c\lambda=5/2-1/2=2$。したがって円の周期は $T_*=\pi$ で、

$$
\Phi(r,\theta)=[\theta-\tfrac12\log r]_{2\pi}.
$$

円上 $(1,0)$ の位相は0。一方 $(e^2,1)$ では $1-\frac12\log(e^2)=1-1=0$ なので同じです。[漸近追跡定理](#thm-cdyn9-phase-conjugacy)より両方とも同じ $(\cos2t,\sin2t)$ へ時間をそろえて近づきます。

**(2)**　$-2\lambda=-2$、$T_*=\pi$ ですから、乗数は

$$
1,\qquad e^{-2\pi}.
$$

**(3)**　円上 $\phi=0$ で

$$
Z(0)=(-\tfrac12,1).
$$

従って半径方向 $(1,0)$ の単位刺激の一次位相係数は $-1/2$、接線方向 $(0,1)$ では $1$ です。実際の大きさ $\delta$ の刺激なら一次の位相変化はそれぞれ $-\delta/2$ と $\delta$ です。

**(4)**　$f(r)=r-r^3$ について $f'(r)=1-3r^2$ です。$r\in[1/2,3/2]$ では

$$
|f'(r)|\le\max\{|1-3/4|,\ |1-27/4|\}=\frac{23}{4}.
$$

$T=P=R=1$ のとき[有限時間位相縮約定理](#thm-cdyn9-finite-phase-reduction)の半径評価は

$$
d(t)=|r(t)-1|
\le \varepsilon e^{23/4},\qquad 0\le t\le1.
$$

$0<\varepsilon<\tfrac12 e^{-23/4}$ とすれば右辺は $1/2$ 未満で、帯 $[1/2,3/2]$ に留まります。勾配差については $c=1/2$ を代入し、

$$
\|\nabla\Phi(X)-Z(\phi)\|
\le 2\sqrt{1+\tfrac14}(1+\tfrac12)d
=\frac{3\sqrt5}{2}d.
$$

よって外力が掛かる位相方程式の差は

$$
|\mathcal R_\varepsilon(t)|
\le\varepsilon\frac{3\sqrt5}{2}d(t)
\le\frac{3\sqrt5}{2}e^{23/4}\varepsilon^2.
$$

従って $K=\frac{3\sqrt5}{2}e^{23/4}$ が一つの有効な定数です。この証明では区間長を1と固定したため、$t\to\infty$ あるいは $t\sim1/\varepsilon$ での誤差制御は得られません。同期には、振動子間の具体的な結合形式、位相差方程式、その平衡点と安定性について追加の証明が必要です。
<!-- solution-end -->

ここまでで、**等時相線は同じ時計へ漸近する点の集合**、**位相応答ベクトルはその時計の勾配**、**弱外力に対する位相縮約は誤差を伴う近似**と区別できました。次章では二つの時計を弱く結合し、相互作用が位相差をどう動かすかを調べます。
