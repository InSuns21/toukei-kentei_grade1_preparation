# U2-07 オドメトリ・速度運動モデルと誤差

同じ向きでもロボットが前進すれば位置は変わり、同じ車輪の回転数でも左右差があれば向きまで変わります。前講の[平面姿勢](../U2-06/index.md#def-u2-06-planar-pose)と[座標フレーム間の平面剛体変換](../U2-06/index.md#def-u2-06-rigid-transform)により「車体の前方」は世界でどの向きかを計算できました。しかし、そこに**時間**と**車輪の不確かさ**を加えないと、未来の位置も予測の信用度も求められません。

本講の中心問題は「左右の車輪を何秒回したらどこへ進み、その予測がどれほど不確かになるか」です。無滑りの理想模型を最初に解き、実際のオドメトリとの違い、雑音の座標系、角度・時間刻みの落とし穴まで導きます。観測による補正は次講以降の役目です。

<!-- definition-example-audit: strict -->

## 1. 車輪の速さから前進と旋回へ

世界座標系 $W$ の軸は右・上、車体座標系 $B$ の軸は前・左、正の角度は反時計回りとします。姿勢を $g=(x,y,\theta)$（m, m, rad）と書きます。車体が前進する速さを $v$（m/s）、反時計回りの角速度を $\omega$（rad/s）とします。時刻区間の長さは $\Delta t>0$ 秒です。

**差動二輪**とは、前後方向に走る二つの駆動輪を車体の左右に備え、それらの回転速度の差によって旋回する平面ロボットの単純模型です。両輪の接地点は車体中心から左右に距離 $b/2$（m）だけ離れ、車輪半径は共通に $r>0$（m）、左右の車輪間隔は $b>0$（m）です。車輪の角速度 $\dot\phi_L,\dot\phi_R$（rad/s）は正が前進方向で、転がりの間に滑らず、中心は横滑りしないと仮定します。

右輪は中心より左輪に比べて旋回時に速く進みます。中心の前進速度を $v$ とすると、右輪と左輪の接線方向速度はそれぞれ $v+\frac b2\omega$、$v-\frac b2\omega$。無滑りでは車輪の周速度が $r\dot\phi$ なので

$$
r\dot\phi_R=v+\frac b2\omega,\qquad
r\dot\phi_L=v-\frac b2\omega.
$$

ここで二式を足して $2v=r(\dot\phi_R+\dot\phi_L)$、引いて $b\omega=r(\dot\phi_R-\dot\phi_L)$ と得ます。この二つの操作によって、車輪の回転数から車体の前進・旋回速度を予測できるようになります。無滑りのときに用いる式を、次の定義で固定します。

<a id="def-u2-07-differential-drive"></a>

<!-- formal-statement-start -->
> **定義（差動二輪の無滑り速度模型）**  
> 半径 $r>0$ の左右車輪が車体中心からそれぞれ横方向に $b/2$（$b>0$）離れ、両輪の純転がりと中心の非横滑りが成り立つ平面ロボットについて、左右車輪角速度を $\dot\phi_L,\dot\phi_R\in\mathbb R$ とする。車体中心の前進速度 $v$ と反時計回り角速度 $\omega$ を
>
$$
v=\frac r2(\dot\phi_R+\dot\phi_L),\qquad
\omega=\frac rb(\dot\phi_R-\dot\phi_L)
$$
>
> と定める。角度は rad、$v$ は m/s、$\omega$ は rad/s を単位とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-07-differential-drive -->
**定義の確認**：$r=0.1$ m、$b=0.5$ m、$\dot\phi_L=10$ rad/s、$\dot\phi_R=14$ rad/s なら、左輪周速度は $1.0$ m/s、右輪は $1.4$ m/s。公式から $v=0.1(10+14)/2=1.2$ m/s、$\omega=0.1(14-10)/0.5=0.8$ rad/s。逆に左右の速度は $1.2\mp(0.5/2)0.8=1.0,1.4$ m/s と再現されます。右輪が速いので反時計回りです。両輪を同じ速さにすれば $\omega=0$、逆向きに等速で回せば $v=0$ となります。
<!-- definition-example-end -->

これは**命令された速度を推定する理想化した関係**です。床で滑れば、回転数から計算した $v,\omega$ と実際の車体速度が一致するとは限りません。特に系統的な車輪半径の違いは、後述する「平均0の独立雑音」と同一視できません。

## 2. 速度模型を世界座標の時間変化へ

車体での速度は $(v,0)^T$ です。[車体から世界への回転行列](../U2-06/index.md#def-u2-06-rigid-transform)により

$$
\begin{pmatrix}\dot x\\\dot y\end{pmatrix}
=R(\theta)\begin{pmatrix}v\\0\end{pmatrix}
=\begin{pmatrix}v\cos\theta\\v\sin\theta\end{pmatrix},
\qquad \dot\theta=\omega.
$$

微小時間に車体が動いた向きを、位置とともに追跡するのが**速度運動モデル**です。$v$ と $\omega$ が区間 $[t,t+\Delta t]$ の間一定という仮定で、以下を厳密積分できます。

<a id="def-u2-07-velocity-motion"></a>

<!-- formal-statement-start -->
> **定義（平面速度運動モデル）**  
> 初期姿勢 $g=(x,y,\theta)\in\mathbb R^2\times\mathbb R$、一定の車体前進速度 $v\in\mathbb R$、一定の角速度 $\omega\in\mathbb R$、区間長 $\Delta t>0$ を与える。区間中は横滑りがなく、世界座標で
>
$$
\dot x(s)=v\cos\theta(s),\quad
\dot y(s)=v\sin\theta(s),\quad
\dot\theta(s)=\omega
$$
>
> を満たす姿勢の時刻 $\Delta t$ 後の値を**速度運動モデルの予測**と呼ぶ。最後の角度は必要に応じて $[-\pi,\pi)$ に正規化する。
<!-- formal-statement-end -->

<a id="thm-u2-07-exact-integration"></a>

<!-- formal-statement-start -->
> **定理（一定車体速度の平面運動を厳密に積分する）**  
> [速度運動モデル](#def-u2-07-velocity-motion)の仮定の下で、$\omega\ne0$ なら
>
$$
\begin{aligned}
x'&=x+\frac v\omega\{\sin(\theta+\omega\Delta t)-\sin\theta\},\\
y'&=y-\frac v\omega\{\cos(\theta+\omega\Delta t)-\cos\theta\},\\
\theta'&=\operatorname{wrap}(\theta+\omega\Delta t).
\end{aligned}
$$
>
> $\omega=0$ なら $x'=x+v\Delta t\cos\theta$、$y'=y+v\Delta t\sin\theta$、$\theta'=\operatorname{wrap}(\theta)$ である。$\omega\to0$ の極限は後者と一致する。
<!-- formal-statement-end -->

**証明の見取り図**：時刻 $s$ における向きは $\theta(s)=\theta+\omega s$ です。これを二つの座標速度へ代入し、$0$ から $\Delta t$ まで積分します。$\omega=0$ は直接積分し、両場合の接続を確認します。

<!-- proof-start -->
### 証明

$\dot\theta(s)=\omega$ と $\theta(0)=\theta$ より $\theta(s)=\theta+\omega s$ です。$\omega\ne0$ の場合、微分公式
$\frac d{ds}\sin(\theta+\omega s)=\omega\cos(\theta+\omega s)$、
$\frac d{ds}\cos(\theta+\omega s)=-\omega\sin(\theta+\omega s)$ を用います。したがって

$$
\begin{aligned}
x'-x
&=\int_0^{\Delta t}v\cos(\theta+\omega s)\,ds
=\left[\frac v\omega\sin(\theta+\omega s)\right]_{s=0}^{s=\Delta t},\\
y'-y
&=\int_0^{\Delta t}v\sin(\theta+\omega s)\,ds
=\left[-\frac v\omega\cos(\theta+\omega s)\right]_{s=0}^{s=\Delta t}.
\end{aligned}
$$

これが二つの位置公式です。$\omega=0$ なら $\theta(s)=\theta$ は一定なので、それぞれ $v\Delta t\cos\theta$ と $v\Delta t\sin\theta$ を積分で得ます。

さらに $\omega\to0$ では、$\sin(\theta+\omega\Delta t)$ を引数 $\theta$ で一次展開して
$\sin(\theta+\omega\Delta t)-\sin\theta=\omega\Delta t\cos\theta+o(\omega)$、
$\cos(\theta+\omega\Delta t)-\cos\theta=-\omega\Delta t\sin\theta+o(\omega)$ です。各式を $\omega$ で割れば、二つの位置変化は直進公式に近づきます。$\operatorname{wrap}$ は $\pm\pi$ の境界で不連続ですが、姿勢としての向きは連続的に近づきます。
<!-- proof-end -->

<!-- definition-example-start: def-u2-07-velocity-motion -->
**定義の確認**：$g=(0,0,0)$、$v=1$ m/s、$\omega=1$ rad/s、$\Delta t=\pi/2$ s とします。全区間で $v,\omega$ は一定、横滑りはなく、初期姿勢も指定されています。定理へ代入すると $\sin(\pi/2)=1$、$\cos(\pi/2)=0$ より $(x',y',\theta')=(1,1,\pi/2)$。半径 $v/|\omega|=1$ m の円弧を四分の一周進んでいます。いっぽう $\omega=0$、$g=(0,0,\pi/2)$、$v=2$ m/s、$\Delta t=0.5$ s なら $(0,1,\pi/2)$ であり、車体前方への $1$ m が世界の上方向に変換されたことを直接確かめられます。
<!-- definition-example-end -->

計算を始点の向きだけで固定する簡便な方法もあります。$v,\omega$ が一刻みで一定なら、始点の座標速度に $\Delta t$ を掛けた

$$
f_{\rm E}(g,v,\omega)=
\begin{pmatrix}
x+v\Delta t\cos\theta\\
y+v\Delta t\sin\theta\\
\theta+\omega\Delta t
\end{pmatrix}
$$

を**始点 Euler 近似**と呼びます。角度の最終表示には [wrap](../U2-06/index.md#def-u2-06-angle-wrap) を施します。$\omega\ne0$ で進行中に向きが変わる場合、これは上の厳密円弧とは一致しません。例の四分円は厳密解が $(1,1)$ m なのに、始点 Euler は $(\pi/2,0)$ m となります。**後節で導く行列は、この Euler 近似専用です。厳密円弧の式へそのまま流用しません。**

## 3. オドメトリは「走ったと記録された相対移動」

**オドメトリ**は車輪エンコーダーなどの内部情報から見積もった、二つの時刻の間の**相対的な移動量**です。外部の地図から現在位置を直接読んだ測定とは異なります。車輪の回転数を積分して得た移動量は、滑ったときには実移動とずれます。

初期姿勢と最終姿勢の差を使うときは、二つの位置を同じ世界座標で引いてから、**初期車体座標**へ回す必要があります。これは[相対姿勢の定義](../U2-06/index.md#def-u2-06-relative-pose)と同じ操作です。車体で表した相対並進を $\delta_B=(\delta_x,\delta_y)^T$、相対角を $\delta_\theta$ とします。$\delta_B$ を「最初に向きを変え、その方向へ前進し、最後にもう一度回転する」という三段階で表すと、数値計算を小さな三角関数の操作へ分解できます。

$a=\operatorname{atan2}(\delta_y,\delta_x)$ は、$\delta_B\ne0$ に対して、原点から $\delta_B$ への方向角を返す関数で、$\operatorname{atan2}(y,x)$ は象限を考慮し $\cos a=x/\|\delta_B\|$、$\sin a=y/\|\delta_B\|$ を満たします。ここで $\|\delta_B\|=\sqrt{\delta_x^2+\delta_y^2}$ です。

<a id="def-u2-07-odometry"></a>

<!-- formal-statement-start -->
> **定義（三段階の相対オドメトリ模型）**  
> 一時刻区間について、初期車体座標で表された相対並進 $\delta_B\in\mathbb R^2$ と、相対角 $\delta_\theta\in\mathbb R$ が与えられるとする。$\delta_B\ne0$ なら
>
$$
\delta_{\rm trans}=\|\delta_B\|\ge0,\quad
\delta_{\rm rot1}=\operatorname{wrap}(\operatorname{atan2}(\delta_y,\delta_x)),\quad
\delta_{\rm rot2}=\operatorname{wrap}(\delta_\theta-\delta_{\rm rot1})
$$
>
> と定める。相対並進が $\delta_B=0$ なら方向は定義されない。この場合は次の規約を採用する。
>
$$
\delta_{\rm trans}=0,\qquad
\delta_{\rm rot1}=0,\qquad
\delta_{\rm rot2}=\operatorname{wrap}(\delta_\theta).
$$
>
> 初期姿勢 $(x,y,\theta)$ からの予測は
>
$$
\begin{aligned}
x'&=x+\delta_{\rm trans}\cos(\theta+\delta_{\rm rot1}),\\
y'&=y+\delta_{\rm trans}\sin(\theta+\delta_{\rm rot1}),\\
\theta'&=\operatorname{wrap}(\theta+\delta_{\rm rot1}+\delta_{\rm rot2}).
\end{aligned}
$$
>
> この三段階表示は最終的な相対姿勢を再現するための**幾何学的分解**であり、車輪が実際にこの順に動いたことを主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-07-odometry -->
**定義の確認**：$\delta_B=(0,2)^T$ m、$\delta_\theta=\pi/2$、初期姿勢 $(1,1,\pi/2)$ とします。$\|\delta_B\|=2$ m、$\operatorname{atan2}(2,0)=\pi/2$、$\delta_{\rm rot2}=\operatorname{wrap}(\pi/2-\pi/2)=0$。したがって $x'=1+2\cos\pi=-1$、$y'=1+2\sin\pi=1$、$\theta'=\pi$ の代表値 $-\pi$ です。別途、[回転行列](../U2-06/index.md#def-u2-06-rigid-transform)で $R(\pi/2)(0,2)^T=(-2,0)^T$ を計算しても同じ位置差を得ます。$\delta_B=0$ の場合は、方向角を無理に計算せず $x'=x,y'=y$ とし、角度だけを $\delta_\theta$ 変えます。
<!-- definition-example-end -->

この模型の $\delta_{\rm trans}$ は**非負の相対並進距離**です。後退を負の距離として入力すると意味が変わります。後退は方向角に $\pi$ を加えた相対並進として表せます。また、同じエンコーダー読みから計算した $(v,\omega)$ と $(\delta_{\rm rot1},\delta_{\rm trans},\delta_{\rm rot2})$ を、**独立した二種類の測定値として二重に数えてはいけません**。

## 4. 雑音は「どの座標」に加わるか

理想の速度模型では毎回同じ $v,\omega$ を実現するものとしてきました。しかし車輪の微小な滑りや駆動の誤差があると、命令速度と実速度は違います。誤差の向きも重要です。車体前後方向の $\pm0.3$ m と世界の $x$ 方向の $\pm0.3$ m は、車体が90度回っていると全く違う現象です。

(a) **制御速度雑音模型**では、区間内で一定の実現速度を $v+\varepsilon_v,\omega+\varepsilon_\omega$ とします。(b) **車体並進雑音模型**では、区間の相対変位に車体座標の確率ベクトル $\eta_B$ を加えます。これらは同じ誤差の単なる記号替えではありません。

<a id="def-u2-07-body-noise"></a>

<!-- formal-statement-start -->
> **定義（車体座標での並進雑音）**  
> 初期姿勢の向きが $\theta$ の平面ロボットを考える。車体座標の相対並進誤差を $\eta_B\in\mathbb R^2$ とし、平均と共分散は
>
$$
E[\eta_B]=0,\qquad \operatorname{Cov}(\eta_B)=\Sigma_B
$$
>
> を満たすとする。$\Sigma_B$ は車体の長さの単位 m を用いた $2\times2$ の対称半正定値行列（単位 m²）である。世界座標での並進誤差を
>
$$
\eta_W=R(\theta)\eta_B
$$
>
> と定義する。
<!-- formal-statement-end -->

<a id="prop-u2-07-noise-rotation"></a>

<!-- formal-statement-start -->
> **命題（車体雑音の世界座標への変換）**  
> [車体座標の並進雑音](#def-u2-07-body-noise)の仮定の下で、世界座標の誤差共分散は
>
$$
\Sigma_W=R(\theta)\Sigma_BR(\theta)^T
$$
>
> となり、$\Sigma_W$ も対称半正定値である。
<!-- formal-statement-end -->

**証明の見取り図**：誤差ベクトルに作用するのは回転だけです。共分散の定義に回転を代入すると、左右に回転行列が残ります。

<!-- proof-start -->
### 証明

$R=R(\theta)$ と略します。$E[\eta_B]=0$ なので、$E[\eta_W]=RE[\eta_B]=0$。共分散の定義より

$$
\begin{aligned}
\operatorname{Cov}(\eta_W)
&=E[(R\eta_B)(R\eta_B)^T]
=E[R\eta_B\eta_B^TR^T]\\
&=R\,E[\eta_B\eta_B^T]\,R^T=R\Sigma_BR^T.
\end{aligned}
$$

転置を取ると $(R\Sigma_BR^T)^T=R\Sigma_B^TR^T=R\Sigma_BR^T$ で対称です。任意の $z\in\mathbb R^2$ について $z^T\Sigma_Wz=(R^Tz)^T\Sigma_B(R^Tz)\ge0$ なので半正定値です。
<!-- proof-end -->

<!-- definition-example-start: def-u2-07-body-noise -->
**定義の確認**（命題の計算も同時に検査）：：車体前後の分散 $0.09$ m²、左右の分散 $0.01$ m²、共分散0なら $\Sigma_B=\operatorname{diag}(0.09,0.01)$ m² で対称半正定値です。向き $\theta=\pi/2$ では
$$
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
R\Sigma_BR^T=
\begin{pmatrix}0.01&0\\0&0.09\end{pmatrix}\ {\rm m}^2.
$$
車体の前後の不確かさが世界の**上下方向**に現れます。$\Sigma_B$ を世界の行列と誤読すると $x$ と $y$ の分散を取り違えます。
<!-- definition-example-end -->

角速度の雑音は角度（rad）に現れます。後述の速度模型では $\varepsilon_v$ と $\varepsilon_\omega$ を**各区間で一定な速度の誤差**と仮定します。連続時間の白色雑音とは別の仮定であり、刻みを細かくした場合の分散の倍率を混同してはいけません。

## 5. 始点 Euler 予測で位置と角度の共分散を伝える

前講までの[Kalman 予測の共分散公式](../U2-04/index.md#thm-u2-04-gaussian-prediction)は線形写像に対して厳密でした。ここでの $v\cos\theta$ は $\theta$ に非線形なので、**現在の代表姿勢の周りで小さな誤差だけを一次近似**します。これは厳密な Gaussian 予測ではありません。

平均の近くで $(x,y,\theta)$ の小さな変化を $\delta g$、速度誤差を $(\varepsilon_v,\varepsilon_\omega)^T$ とします。始点 Euler の式に対し、$\cos(\theta+\delta\theta)=\cos\theta-\sin\theta\,\delta\theta+o(\delta\theta)$、$\sin(\theta+\delta\theta)=\sin\theta+\cos\theta\,\delta\theta+o(\delta\theta)$ を代入すると

$$
\begin{aligned}
\delta x'&=\delta x-v\Delta t\sin\theta\,\delta\theta+\Delta t\cos\theta\,\varepsilon_v+\text{二次以上},\\
\delta y'&=\delta y+v\Delta t\cos\theta\,\delta\theta+\Delta t\sin\theta\,\varepsilon_v+\text{二次以上},\\
\delta\theta'&=\delta\theta+\Delta t\,\varepsilon_\omega.
\end{aligned}
$$

「二次以上」には $\delta\theta\,\varepsilon_v$ などの積も含みます。これらを捨てた線形化した誤差式を $\delta g'=F\delta g+G\varepsilon$ と書きます。

<a id="prop-u2-07-euler-jacobians"></a>

<!-- formal-statement-start -->
> **命題（始点 Euler 運動の一次誤差行列）**  
> $f_{\rm E}(g,v,\omega)$ を本講第2節の始点 Euler 予測とする。$g=(x,y,\theta)$、$\Delta t>0$ において、wrap の切れ目を跨がない局所角度表示で、姿勢と速度に関する一次微分行列は
>
$$
F=\begin{pmatrix}
1&0&-v\Delta t\sin\theta\\
0&1&v\Delta t\cos\theta\\
0&0&1
\end{pmatrix},\qquad
G=\begin{pmatrix}
\Delta t\cos\theta&0\\
\Delta t\sin\theta&0\\
0&\Delta t
\end{pmatrix}.
$$
>
> $F$ は $3\times3$、$G$ は $3\times2$。$F$ と $G$ は**この始点 Euler 模型の導関数**であり、厳密円弧模型の導関数ではない。
<!-- formal-statement-end -->

**証明の見取り図**：上の三つの一次展開で $\delta x,\delta y,\delta\theta$ と $\varepsilon_v,\varepsilon_\omega$ の係数を、列ごとに拾います。

<!-- proof-start -->
### 証明

$x'=x+v\Delta t\cos\theta$ の姿勢偏微分を $(x,y,\theta)$ の順に並べると $(1,0,-v\Delta t\sin\theta)$、速度偏微分を $(v,\omega)$ の順に並べると $(\Delta t\cos\theta,0)$ です。同様に $y'$ の二つの行は $(0,1,v\Delta t\cos\theta)$ と $(\Delta t\sin\theta,0)$。$\theta'=\theta+\omega\Delta t$ の行は $(0,0,1)$ と $(0,\Delta t)$ です。三行を並べると所定の $F,G$ になります。角度は局所座標で微分し、代表値の wrap は最後に行います。
<!-- proof-end -->

速度誤差を $\varepsilon=(\varepsilon_v,\varepsilon_\omega)^T$、$E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=M$（$2\times2$ 対称半正定値）とし、現在の姿勢誤差とは**独立**だとします。さらに $\Delta t$ の間は同一の $\varepsilon$ が持続するとします。現在の姿勢の平均・共分散を $m,P$ とし、$m$ の角度周りで線形化します。

<a id="prop-u2-07-covariance-propagation"></a>

<!-- formal-statement-start -->
> **命題（独立速度雑音に対する局所一次共分散予測）**  
> $P$ が $3\times3$ の姿勢誤差共分散、$M$ が $2\times2$ の速度誤差共分散で、両誤差は平均0・有限二次モーメントを持ち相互に独立するとする。始点 Euler 運動の[一次行列](#prop-u2-07-euler-jacobians)を予測平均 $m$ と公称速度 $(v,\omega)$ で評価し、二次以上の誤差を無視するなら
>
$$
m'=f_{\rm E}(m,v,\omega),\qquad
P'\ \approx\ FPF^T+GMG^T.
$$
>
> ここで $3\times3$ の $P'$ は**局所一次近似**であり、非線形運動後の正確な共分散と一般には一致しない。
<!-- formal-statement-end -->

**証明の見取り図**：線形化した誤差 $\delta g'=F\delta g+G\varepsilon$ に対して共分散の定義を展開し、独立によって二つの交差項が0になることを確認します。

<!-- proof-start -->
### 証明

$\delta g$ と $\varepsilon$ はともに平均0で、相互に独立です。したがって $E[\delta g\varepsilon^T]=E[\delta g]E[\varepsilon]^T=0$ であり、転置した交差項も0です。一次項だけを採用した線形模型の共分散は

$$
\begin{aligned}
E[\delta g'(\delta g')^T]
&=E[(F\delta g+G\varepsilon)(F\delta g+G\varepsilon)^T]\\
&=FE[\delta g\delta g^T]F^T
+FE[\delta g\varepsilon^T]G^T\\
&\quad+GE[\varepsilon\delta g^T]F^T
+GE[\varepsilon\varepsilon^T]G^T\\
&=FPF^T+GMG^T.
\end{aligned}
$$

$P,M$ が半正定値なら、任意の $z\in\mathbb R^3$ に対して $z^TP'z=(F^Tz)^TP(F^Tz)+(G^Tz)^TM(G^Tz)\ge0$ です。ただしここで得た等号は**線形化された模型の内部**で成立するもので、元の三角関数模型で破棄した高次項の誤差は評価していません。
<!-- proof-end -->

**数値例**：初期平均 $m=(0,0,0)$、$v=2$ m/s、$\omega=0$、$\Delta t=1$ s、初期共分散 $P=\operatorname{diag}(0.04,0.09,0.01)$、区間一定の速度誤差共分散 $M=\operatorname{diag}(0.25,0.04)$ とします。姿勢の角度誤差は rad、位置誤差は m、$M$ の各対角は (m/s)² と (rad/s)² です。まず

$$
F=\begin{pmatrix}1&0&0\\0&1&2\\0&0&1\end{pmatrix},
\quad
G=\begin{pmatrix}1&0\\0&0\\0&1\end{pmatrix},
\quad
FPF^T=\begin{pmatrix}0.04&0&0\\0&0.13&0.02\\0&0.02&0.01\end{pmatrix},
\quad
GMG^T=\begin{pmatrix}0.25&0&0\\0&0&0\\0&0&0.04\end{pmatrix}.
$$

よって $m'=(2,0,0)$、共分散は

$$
P'\approx\begin{pmatrix}0.29&0&0\\0&0.13&0.02\\0&0.02&0.05\end{pmatrix}.
$$

$y$ 方向に直接の走行雑音がないのに $P'_{yy}$ が $0.09$ から $0.13$ に増えるのは、初期向きの不確かさ $0.01$ に $v\Delta t=2$ が掛かるためです。交差共分散 $P'_{y\theta}=0.02$ も同じ機構で生じます。予測を一つの対角分散だけで表すと、この情報が失われます。

**時間刻みの注意**：$M$ が刻み幅に依存しない「区間中一定の速度ずれ」の共分散なら、$GMG^T$ の直進方向・角度の分散は $\Delta t^2$ に比例します。時間ごとに独立な揺らぎを連続時間模型として導入した場合は通常、積分された雑音の分散が $\Delta t$ に比例するようスケーリングします。両者を同じ $M$ のまま刻み幅だけ変更して比較してはいけません。

## 6. 誤りが生じる条件とモデルの境界

- **旋回中の Euler 誤差**：大きな $|\omega|\Delta t$ では第2節の円弧が大幅に違います。これは計算機の丸め誤差ではなく、**始点の向きを区間全体で固定した離散化誤差**です。刻みを小さくするか、一定速度が正しい場合は厳密積分を使います。
- **エンコーダーの過信**：車輪が滑っているのに[差動二輪の無滑り速度模型](#def-u2-07-differential-drive)を使うと、測定雑音を0へ近づけても真の移動は分かりません。失われたのは無滑り仮定であり、平均0の独立雑音の分散を小さくする操作では修復できません。
- **角度の切れ目**：$\theta\approx\pi$ と $\theta\approx-\pi$ はほぼ同じ姿勢です。[wrap の不連続性](../U2-06/index.md#def-u2-06-angle-wrap)のため、単純な実数平均や境界を跨ぐ線形化は破綻し得ます。本講の $P$ は**予測平均の近傍で角度誤差を局所的な実数として表す**もので、大きな多峰の姿勢分布まで正確に表すものではありません。
- **雑音の相関**：前の速度誤差と今の位置誤差が独立でなければ、証明中の交差項が0とは限りません。車輪のスリップが持続する場合や推定したバイアスを持つ場合は、単純な $FPF^T+GMG^T$ をそのまま厳密な式だと主張できません。
- **「速度」と「オドメトリ」の二重利用**：同じ車輪情報から得た命令速度モデルと相対姿勢モデルは、代替の記述です。二つの独立なセンサーのように扱って過剰に自信を持ってはいけません。

## 7. 再実行できる数値ラボ

厳密円弧と始点 Euler の差、差動二輪速度、車体雑音の回転、共分散の行列積を**同じ Python ファイル**で検算します。外部パッケージは不要です。各プリセットは結果の意味を比較するためにあり、機械実験を数学的な証明の代わりにはしません。

~~~python-file-lab
# lab-id: U2-07-MOTION
# lab-title: 差動二輪・円弧と Euler・誤差共分散
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-07/assets/motion_model.py
# timeout-ms: 30000
# lab-preset: 左右車輪と旋回 | --scenario wheels
# lab-preset: 円弧と Euler の差 | --scenario arc
# lab-preset: 車体座標の雑音を回す | --scenario body-noise
# lab-preset: 速度雑音から共分散を予測 | --scenario covariance
# lab-preset: すべての自己検査 | --self-test
~~~

ラボは第2節の円弧を計算する場合と第5節の Euler 共分散を計算する場合を明示的に分けます。速度雑音は各区間で一定とし、グラフ作成に重い数値ライブラリを追加しません。比較対象が少数の姿勢・共分散行列なので、数値と中間行列を表示する方式の方が正確に読み取れます。

## 8. 演習・詳細解答

### Level A：各模型の入口を確かめる

<a id="ex-u2-07-a01"></a>

**A1. 左右の車輪から速度を計算する**

- Level: A

車輪半径 $r=0.1$ m、輪間距離 $b=0.5$ m、左輪 $10$ rad/s、右輪 $14$ rad/s の差動二輪が滑らず走る。中心の $v,\omega$ を求め、回転方向を述べよ。

<!-- solution-start -->
**詳細解答**：[差動二輪の定義](#def-u2-07-differential-drive)に代入します。車輪周速度は $r\dot\phi_L=1.0$ m/s、$r\dot\phi_R=1.4$ m/s です。従って
$$
v=(1.0+1.4)/2=1.2\ {\rm m/s},\qquad
\omega=(1.4-1.0)/0.5=0.8\ {\rm rad/s}.
$$
右輪が速く $\omega>0$ なので左回り（反時計回り）です。
<!-- solution-end -->

<a id="ex-u2-07-a02"></a>

**A2. 車体前進と世界座標の違い**

- Level: A

初期姿勢 $(0,0,\pi/2)$、$v=2$ m/s、$\omega=0$、$\Delta t=0.5$ s とする。終姿勢を求めよ。

<!-- solution-start -->
**詳細解答**：[厳密積分の直進場合](#thm-u2-07-exact-integration)を使います。$v\Delta t=1$ m、$\cos(\pi/2)=0$、$\sin(\pi/2)=1$ なので
$$
x'=0+1\cdot0=0,\quad y'=0+1\cdot1=1,\quad\theta'=\pi/2.
$$
車体の前進は世界の $y$ 正方向です。$x$ に $1$ を足すのは座標系の取り違えです。
<!-- solution-end -->

<a id="ex-u2-07-a03"></a>

**A3. 円弧と Euler がずれる**

- Level: A

初期姿勢 $(0,0,0)$、$v=\omega=1$（単位は m/s と rad/s）、$\Delta t=\pi/2$ s とする。厳密円弧と始点 Euler の位置をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**：[厳密積分](#thm-u2-07-exact-integration)では
$$
x'=(1/1)(\sin(\pi/2)-\sin0)=1,\quad
y'=-(1/1)(\cos(\pi/2)-\cos0)=1.
$$
始点 Euler は $(v\Delta t\cos0,v\Delta t\sin0)=(\pi/2,0)$ です。向きの最終値はともに $\pi/2$ ですが、位置は一致しません。Euler が一刻み中の旋回を無視したことが原因です。
<!-- solution-end -->

<a id="ex-u2-07-a04"></a>

**A4. 角度の境界を跨ぐ**

- Level: A

初期向きが $179^\circ$、角速度が $4^\circ$/s、区間長が $1$ s のとき、終角度を $[-180^\circ,180^\circ)$ に正規化せよ。度はここだけの表示単位とする。

<!-- solution-start -->
**詳細解答**：向きの実数としての和は $179^\circ+4^\circ=183^\circ$ です。[角度の正規化](../U2-06/index.md#def-u2-06-angle-wrap)により $183^\circ-360^\circ=-177^\circ$ が代表値です。$-177^\circ$ と $183^\circ$ の向きは同じです。実装する際は角速度を rad/s に直してから加算します。
<!-- solution-end -->

<a id="ex-u2-07-a05"></a>

**A5. 車体の不確かさの軸を世界へ変換する**

- Level: A

車体座標の並進誤差共分散が $\operatorname{diag}(9,1)$ cm²、車体の向きが $\pi/2$ のとき、世界の共分散を求めよ。

<!-- solution-start -->
**詳細解答**：[車体雑音の世界座標変換](#prop-u2-07-noise-rotation)を使用します。$R(\pi/2)=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$ なので
$$
R\begin{pmatrix}9&0\\0&1\end{pmatrix}R^T
=\begin{pmatrix}1&0\\0&9\end{pmatrix}\ {\rm cm}^2.
$$
初期の前後方向（分散9）が世界の $y$ 方向へ回ったためです。
<!-- solution-end -->

### Level B：表現と誤差の機構をつなぐ

<a id="ex-u2-07-b01"></a>

**B1. 旋回公式の直進極限**

- Level: B

$v,\theta,\Delta t$ を固定して $\omega\to0$ とする。第2節の厳密円弧から、位置変化が $(v\Delta t\cos\theta,v\Delta t\sin\theta)$ に収束することを導け。

<!-- solution-start -->
**詳細解答**：[厳密積分](#thm-u2-07-exact-integration)の分子を、$\omega$ を変数にして0の周りで微分します。連鎖律により
$$
\left.\frac d{d\omega}\sin(\theta+\omega\Delta t)\right|_{\omega=0}
=\Delta t\cos\theta,
\quad
\left.\frac d{d\omega}\cos(\theta+\omega\Delta t)\right|_{\omega=0}
=-\Delta t\sin\theta.
$$
分子はそれぞれ0で消えるため、微分係数の定義から
$$
\lim_{\omega\to0}\frac{\sin(\theta+\omega\Delta t)-\sin\theta}{\omega}
=\Delta t\cos\theta,
$$
$$
\lim_{\omega\to0}-\frac{\cos(\theta+\omega\Delta t)-\cos\theta}{\omega}
=\Delta t\sin\theta.
$$
各式を $v$ 倍して直進時の位置変化を得ます。角度も $\omega\Delta t\to0$ なので物理的な向きは連続です。
<!-- solution-end -->

<a id="ex-u2-07-b02"></a>

**B2. 相対オドメトリから世界の終姿勢へ**

- Level: B

初期姿勢 $(1,1,\pi/2)$、初期車体座標の相対並進 $(0,2)^T$ m、相対角 $\pi/2$ とする。三段階表示の各値と終姿勢を求め、[回転行列](../U2-06/index.md#def-u2-06-rigid-transform)の計算で位置を照合せよ。

<!-- solution-start -->
**詳細解答**：[相対オドメトリの定義](#def-u2-07-odometry)では
$$
\delta_{\rm trans}=\sqrt{0^2+2^2}=2,\quad
\delta_{\rm rot1}=\operatorname{atan2}(2,0)=\pi/2,\quad
\delta_{\rm rot2}=\operatorname{wrap}(\pi/2-\pi/2)=0.
$$
そこで $x'=1+2\cos(\pi)=-1$、$y'=1+2\sin(\pi)=1$、向きは $\operatorname{wrap}(\pi)=-\pi$ です。もう一方の方法では $R(\pi/2)(0,2)^T=(-2,0)^T$ なので、初期位置 $(1,1)^T$ に足して $(-1,1)^T$ と一致します。角度 $-\pi$ と $\pi$ は同じ向きです。
<!-- solution-end -->

<a id="ex-u2-07-b03"></a>

**B3. 向きの不確かさが横方向へ広がる**

- Level: B

始点 Euler で $m=(0,0,0)$、$v=2$ m/s、$\omega=0$、$\Delta t=1$ s、$P=\operatorname{diag}(0.04,0.09,0.01)$、$M=\operatorname{diag}(0.25,0.04)$ とする。$F,G$ と $P'$ を求め、$(P')_{y\theta}$ が0でない理由を述べよ。

<!-- solution-start -->
**詳細解答**：[一次誤差行列](#prop-u2-07-euler-jacobians)に $\cos0=1,\sin0=0$ を代入すると
$$
F=\begin{pmatrix}1&0&0\\0&1&2\\0&0&1\end{pmatrix},\quad
G=\begin{pmatrix}1&0\\0&0\\0&1\end{pmatrix}.
$$
まず $FP=\left(\begin{smallmatrix}0.04&0&0\\0&0.09&0.02\\0&0&0.01\end{smallmatrix}\right)$、これに $F^T$ を掛けて
$$
FPF^T=\begin{pmatrix}0.04&0&0\\0&0.13&0.02\\0&0.02&0.01\end{pmatrix}
$$
を得ます。また $GMG^T=\operatorname{diag}(0.25,0,0.04)$。よって[独立速度雑音に対する局所一次共分散予測](#prop-u2-07-covariance-propagation)から
$$
P'\approx\begin{pmatrix}0.29&0&0\\0&0.13&0.02\\0&0.02&0.05\end{pmatrix}.
$$
初期の角度誤差 $\delta\theta$ が $\delta y'= \delta y+2\delta\theta$ に現れるため、$y$ と角度が相関するのです。
<!-- solution-end -->

<a id="ex-u2-07-b04"></a>

**B4. 独立でない誤差では何が壊れるか**

- Level: B

一次模型 $\delta g'=F\delta g+G\varepsilon$ において、$E[\delta g]=E[\varepsilon]=0$、$\operatorname{Cov}(\delta g)=P$、$\operatorname{Cov}(\varepsilon)=M$ とするが、独立性は仮定しない。$C=E[\delta g\varepsilon^T]$（$3\times2$）を用いて正しい共分散式を導き、$C\ne0$ のとき $FPF^T+GMG^T$ だけでは足りないことを示せ。

<!-- solution-start -->
**詳細解答**：誤差の積を展開すると
$$
\begin{aligned}
\operatorname{Cov}(\delta g')
&=E[(F\delta g+G\varepsilon)(F\delta g+G\varepsilon)^T]\\
&=FPF^T+FE[\delta g\varepsilon^T]G^T
+GE[\varepsilon\delta g^T]F^T+GMG^T\\
&=FPF^T+FCG^T+GC^TF^T+GMG^T.
\end{aligned}
$$
$C$ は $3\times2$ なので $FCG^T$ は $3\times3$ で、転置項 $GC^TF^T$ と組になって対称です。[独立な速度雑音の予測](#prop-u2-07-covariance-propagation)の証明では独立性を使って $C=0$ としました。滑りが持続して姿勢誤差と現在の速度誤差が相関すれば、その消去は認められません。
<!-- solution-end -->

### Level C：車輪、世界姿勢、局所共分散を統合する

<a id="ex-u2-07-c01"></a>

**C1. 北向きに進むロボットと予測の信用度**

- Level: C

車輪半径 $r=0.1$ m、輪間距離 $b=0.5$ m の無滑り差動二輪が、左右とも $10$ rad/s で1秒間走る。初期の姿勢平均は $(1,2,\pi/2)$、局所誤差共分散は $P=\operatorname{diag}(0.04,0.09,0.01)$、各区間で一定の独立な速度誤差の共分散は $M=\operatorname{diag}(0.04,0.01)$ とする（速度の単位は m/s、rad/s）。刻みは $\Delta t=1$ s とする。次を求めよ。

1. 車輪から得る $v,\omega$ と厳密な終姿勢平均。
2. 始点 Euler の $F,G$ と一次近似の $P'$。
3. 予測の $x$ 方向の分散が初期値より増え、$y$ 方向の分散には速度雑音が加わる理由。
4. この模型だけでは実際の滑りによる位置ずれを必ず包含できない理由。

<!-- solution-start -->
**詳細解答**：

**(1)** [差動二輪の定義](#def-u2-07-differential-drive)から
$$
v=\frac{0.1}{2}(10+10)=1\ {\rm m/s},\quad
\omega=\frac{0.1}{0.5}(10-10)=0.
$$
両輪が等速なので[直進公式](#thm-u2-07-exact-integration)が厳密です。初期向き $\pi/2$ は世界の上方向なので
$$
m'=(1+1\cos(\pi/2),\,2+1\sin(\pi/2),\,\pi/2)=(1,3,\pi/2).
$$

**(2)** [Euler の一次誤差行列](#prop-u2-07-euler-jacobians)で $\cos(\pi/2)=0$、$\sin(\pi/2)=1$ とすると
$$
F=\begin{pmatrix}1&0&-1\\0&1&0\\0&0&1\end{pmatrix},\quad
G=\begin{pmatrix}0&0\\1&0\\0&1\end{pmatrix}.
$$
$FP$ は $\left(\begin{smallmatrix}0.04&0&-0.01\\0&0.09&0\\0&0&0.01\end{smallmatrix}\right)$ であるから
$$
FPF^T=
\begin{pmatrix}0.05&0&-0.01\\0&0.09&0\\-0.01&0&0.01\end{pmatrix}.
$$
また $GMG^T=\operatorname{diag}(0,0.04,0.01)$ です。[局所一次共分散予測](#prop-u2-07-covariance-propagation)より
$$
P'\approx
\begin{pmatrix}0.05&0&-0.01\\0&0.13&0\\-0.01&0&0.02\end{pmatrix}.
$$

**(3)** 北向きのまわりで初期向きが $\delta\theta$ だけずれると $\cos(\pi/2+\delta\theta)\approx-\delta\theta$ となり、世界 $x$ 変位へ $-\delta\theta$ m が加わります。このため $\operatorname{Var}(x)$ は $0.04+0.01=0.05$ m² に増え、$\operatorname{Cov}(x,\theta)=-0.01$ m·rad になります。一方、速度誤差 $\varepsilon_v$ は北向きの $y$ 変位へ $\Delta t\,\varepsilon_v$ m として入るため、$\operatorname{Var}(y)=0.09+1^2\cdot0.04=0.13$ m² です。

**(4)** 理想模型は両輪の無滑り、区間一定の平均0の速度誤差、誤差間の独立性を仮定しています。床の滑りで車輪が回っても車体が進まなければ、$v=1$ という車輪からの推定速度自体に系統的なずれがあります。その現象をこの $M$ のみで必ず捉えられるという保証はありません。外部観測で補正するには次講以降で尤度とモデル不整合を考えます。
<!-- solution-end -->

## 9. この講義で身につけたこと

車体の前進速度と旋回速度は左右車輪の和と差から得られ、世界の運動へ変換すると $\dot x=v\cos\theta,\dot y=v\sin\theta,\dot\theta=\omega$ となります。区間一定なら厳密な円弧を積分でき、相対オドメトリは**世界に固定された絶対位置ではなく初期車体からの変位**として扱います。誤差はどの座標系・どの時間模型に入るかによって共分散が変わります。

次講 **U2-08** では、こうして予測した姿勢から「ランドマークはどの距離・方角に見えるか」を計算します。予測だけでは蓄積する走行誤差を、外部観測でどのように減らせるかが次の課題です。
