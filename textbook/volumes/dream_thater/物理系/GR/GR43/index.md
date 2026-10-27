# GR43 宇宙赤方偏移と膨張の測定

<!-- definition-example-audit: strict -->

[GR41のFLRW計量](../GR41/index.md#def-gr41-flrw)では、共動する二点間の距離が尺度因子 $a(\tau)$ とともに変わることを知りました。[GR42のFriedmann方程式](../GR42/index.md#thm-gr42-friedmann)は、その変化を物質・圧力・空間曲率に結び付けます。しかし遠方の銀河に置いた時計を直接読むことはできません。私たちに届くのは過去に放たれた光です。**その光の周波数と明るさから、放射時と受信時の宇宙の状態をどこまで復元できるでしょうか。**

本章は、共動光源と共動受信者の間を進む光の零測地線を出発点に、宇宙赤方偏移、伝播時間、光度距離と角径距離を順に導きます。最後に小さい赤方偏移でのHubble則と、特殊相対論的Doppler効果との関係・限界を確かめます。

計量の符号は $(-,+,+,+)$、本章の計算単位は $c=1$ とします。宇宙時間を $\tau$、尺度因子を正の $C^3$ 級関数 $a(\tau)$、Hubble率を $H=\dot a/a$ とします。点は $\tau$ による微分です。

光は幾何光学近似のもとで未来向き非零の光的測地線を進むと仮定します。発光・受信を添字 $e,0$ で区別し、$\tau_e<\tau_0$ とします。宇宙の膨張を最初から仮定しません。$H<0$ の模型では青方偏移も起こります。

## 1. 光が進む空間距離と、受信者の時計

FLRWの空間計量を[GR41の測地極座標](../GR41/index.md#prop-gr41-radial-metric)で書くと、動径方向について

$$
ds^2=-d\tau^2+a(\tau)^2\left(d\chi^2+S_k(\chi)^2d\Omega^2\right)
$$

となります。ここで $d\Omega^2=d\theta^2+\sin^2\theta\,d\phi^2$、$S_{+1}(\chi)=\sin\chi$、$S_0(\chi)=\chi$、$S_{-1}(\chi)=\sinh\chi$ です。球面の測地極座標には座標域の制限があるので、以下は原則として光線の一意な動径経路を含み、焦点や多重像のない領域で計算します。

光の動径経路では $d\Omega=0$、光的条件 $ds^2=0$ が

$$
\left|\frac{d\chi}{d\tau}\right|=\frac{1}{a(\tau)}
$$

を与えます。これは「光の物理的速さが $1/a$」という意味ではありません。$\chi$ は共動座標であり、[GR4の局所観測者が測る光の方向・周波数](../GR4/index.md#prop-gr4-photon-direction)とは別です。共動観測者の局所直交枠では光速は常に $c=1$ です。

受信者を $\chi=0$、発光源を $\chi=\chi_e>0$ に固定し、内向きの直接光線が届くとします。$d\chi/d\tau=-1/a$ を積分すると、光が横切る**共動動径距離**が得られます。

<a id="prop-gr43-null-path"></a>

<!-- formal-statement-start -->
> **命題（FLRWの動径光路と共動距離）**
> $a:I\to(0,\infty)$ が $C^1$ 級のFLRW時空を考える。共動源 $\chi=\chi_e$ が $\tau_e$ に放ち、共動受信者 $\chi=0$ に $\tau_0>\tau_e$ で届く未来向きの内向き動径光線が、上記の測地極座標域に含まれるなら、

$$
\boxed{\chi_e=\int_{\tau_e}^{\tau_0}\frac{d\tau}{a(\tau)}.}
$$

> また $d\eta=d\tau/a(\tau)$ で定まる**共形時間** $\eta$ では、この光線は $d\chi/d\eta=-1$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

零条件から光路の傾きを決め、発光点・受信点を積分の端点に置くだけです。$\eta$ は光線の座標表示を45度にする時間変数で、共動観測者の固有時 $\tau$ そのものではありません。

<!-- proof-start -->
### 証明

動径光線上で $-d\tau^2+a^2d\chi^2=0$。$a>0$、未来向きなので $d\tau>0$、内向きなので $d\chi<0$ を選びます。従って $d\chi/d\tau=-1/a$ です。以下の $d\chi=-d\tau/a$ は、この導関数を $\tau$ について積分する際の省略記法です。端点を代入して

$$
0-\chi_e=\int_{\chi_e}^{0}d\chi
=-\int_{\tau_e}^{\tau_0}\frac{d\tau}{a(\tau)}
$$

となります。$a>0$ なので $\eta(\tau)=\int_{\tau_*}^{\tau}ds/a(s)$ は単調増加し、$d\chi/d\eta=(d\chi/d\tau)/(d\eta/d\tau)=(-1/a)/(1/a)=-1$ です。$\square$
<!-- proof-end -->

例えば静的な $a=a_*>0$ の宇宙では $\chi_e=(\tau_0-\tau_e)/a_*$ であり、共動距離は経過時間に比例します。一方、膨張する宇宙では同じ経過時間でも積分内の $1/a$ が変化します。

## 2. 波数ベクトルを運ぶと、周波数はどうなるか

光の周波数を取り出すには、光路だけでなく**波面の間隔**を調べます。[GR4の観測角周波数](../GR4/index.md#def-gr4-measured-components)は、位相勾配から得る波数ベクトル $K$ と観測者の四元速度 $u$ の内積 $\omega=-g(K,u)$ です。

FLRWの共動観測者は[GR41で定義した $u=\partial_\tau$](../GR41/index.md#def-gr41-comoving)であり、$g_{\tau\tau}=-1$ だから $\omega=K^\tau>0$ と読めます。

赤方偏移は発光時と受信時の**局所周波数の比**です。光源と受信者が共動している、という条件をここで明示して定義します。

<a id="def-gr43-redshift"></a>

<!-- formal-statement-start -->
> **定義（共動光源の宇宙赤方偏移）**
> FLRW時空で共動する発光源と受信者を光的測地線が結び、それぞれの未来向き単位四元速度を $u_e,u_0$、光の非零未来向き波数ベクトルを $K_e,K_0$ とする。両端の角周波数 $\omega_e=-g(K_e,u_e)>0$、$\omega_0=-g(K_0,u_0)>0$ を用いて、**宇宙赤方偏移** $z$ を

$$
\boxed{1+z=\frac{\omega_e}{\omega_0}
=\frac{\nu_e}{\nu_0},\qquad z>-1}
$$

> と定める。$\nu=\omega/(2\pi)$ は通常の周波数である。$z>0$ は赤方偏移、$-1<z<0$ は青方偏移を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr43-redshift -->
**定義の確認**：共動源で $\nu_e=600\,\mathrm{THz}$、共動受信者で $\nu_0=400\,\mathrm{THz}$ と実測したとします。両値は正で同じ周波数単位なので、$1+z=600/400=3/2$、$z=1/2$ です。

逆に $\nu_e=400\,\mathrm{THz}$、$\nu_0=500\,\mathrm{THz}$ なら $z=4/5-1=-1/5$ であり、負でも $z>-1$ を満たします。この定義だけでは、これらの周波数差を生んだ尺度因子の変化はまだ導出していません。
<!-- definition-example-end -->

いよいよ計量から周波数変化を証明します。発光時刻と受信時刻を異なる場所の静止時計の固有時で比較することと、途中の波数が光的測地線に沿って変化することを、一つの式に結び付けます。

<a id="thm-gr43-redshift-scale"></a>

<!-- formal-statement-start -->
> **定理（宇宙赤方偏移と尺度因子）**
> $a>0$ が $C^2$ 級のFLRW時空で、幾何光学の光線 $K=dx/d\lambda$ がアフィン媒介変数 $\lambda$ に関する未来向き光的測地線であり、発光・受信両者が共動観測者とする。このとき光線上で $a(\tau)\omega(\tau)$ は一定で、

$$
\boxed{1+z=\frac{a(\tau_0)}{a(\tau_e)}.}
$$

> したがって膨張中に放たれ受信された光は赤方偏移し、収縮中なら青方偏移する。ただし $a$ が途中で単調でなくても、式自体は両端の比として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

共動者には $\omega=K^\tau$ です。動径光線に対する測地線方程式の時間成分を作り、零条件で空間成分を消去します。残る式は $d\log\omega/d\tau=-d\log a/d\tau$ となり、$a\omega$ の保存が現れます。任意方向の光線でも空間計量による速度のノルムを使えば同じ式です。

<!-- proof-start -->
### 証明

[GR42の接続成分の計算](../GR42/index.md#prop-gr42-flrw-curvature)を本定理の $C^2$ 級という仮定の下で確かめ直します。$g_{\tau\tau}=-1$、$g_{\tau i}=0$、$g_{ij}=h_{ij}=a^2\gamma_{ij}$ なので

$$
\Gamma^\tau{}_{ij}=\frac12\partial_\tau h_{ij}
=a\dot a\gamma_{ij}=Hh_{ij},\qquad
\Gamma^\tau{}_{\tau\tau}=\Gamma^\tau{}_{\tau i}=0.
$$

この接続成分には $a$ の一階微分までしか必要ありません。GR42でRicci曲率も計算するときの $C^3$ 級という仮定を、この接続計算へ持ち込む必要はありません。測地線方程式と光的条件はそれぞれ

$$
\frac{dK^\tau}{d\lambda}
+Hh_{ij}K^iK^j=0,\qquad
-(K^\tau)^2+h_{ij}K^iK^j=0
$$

です。後者を前者に代入し、$K^\tau=d\tau/d\lambda=\omega>0$ で割ると

$$
\frac{dK^\tau}{d\tau}
=\frac{dK^\tau/d\lambda}{d\tau/d\lambda}
=-HK^\tau
=-\frac{\dot a}{a}K^\tau.
$$

従って

$$
\frac{d}{d\tau}(aK^\tau)
=\dot aK^\tau+a\frac{dK^\tau}{d\tau}
=\dot aK^\tau-a\frac{\dot a}{a}K^\tau=0.
$$

共動観測者の速度は $u=\partial_\tau$ であり、$g_{\tau\tau}=-1$ です。[観測者の測定成分・エネルギー・周波数](../GR4/index.md#def-gr4-measured-components)の定義を適用すると

$$
\omega=-g(K,u)=K^\tau.
$$

従って $a_e\omega_e=a_0\omega_0$ となります。[赤方偏移の定義](#def-gr43-redshift)に代入して

$$
1+z=\frac{\omega_e}{\omega_0}=\frac{a_0}{a_e}
$$

を得ます。角度方向を含む光線でも光的条件 $h_{ij}K^iK^j=(K^\tau)^2$ は変わらないので、同じ証明が成立します。$\square$
<!-- proof-end -->

**波長の扱い。** 共動観測者の局所枠では光速を $1$ とし、通常の周波数を $\nu$ と書きます。局所波長は $\lambda_{\mathrm{phys}}=1/\nu$（$c$ を戻せば $c/\nu$）なので、

$$
\frac{\lambda_0}{\lambda_e}=1+z=\frac{a_0}{a_e}
$$

となります。一個の光子エネルギー $E_\gamma=\hbar\omega$ も $a^{-1}$ に比例します。

この一粒子のエネルギー低下と、[GR42の放射流体密度](../GR42/index.md#prop-gr42-fluid-continuity)のスケーリングは整合します。粒子数が保存する自由伝播の放射なら、共動体積による希釈 $a^{-3}$ に加え、一粒子のエネルギーが $a^{-1}$ になるため、密度は $a^{-4}$ に比例します。

もう一つの確認として、連続する二つの短い光パルスを同じ共動源が $\tau_e$ と $\tau_e+d\tau_e$ に発すると、共動距離は両パルスで同じです。[光路積分](#prop-gr43-null-path)の両端を微分して

$$
0=-\frac{d\tau_e}{a_e}+\frac{d\tau_0}{a_0},
\qquad \frac{d\tau_0}{d\tau_e}=\frac{a_0}{a_e}=1+z
$$

です。これは無限小のパルス間隔についての正確な関係です。有限の発光期間にわたって $a$ が大きく変わるなら、始端・終端の比を一定とみなしてはいけません。

## 3. 宇宙の歴史を赤方偏移で表す

発光時刻は直接読めなくても、スペクトル線から $z$ が分かれば $a_e/a_0=1/(1+z)$ を推定できます。さらに光路積分は、観測者に届いた光が**どの時間を通ったか**を教えます。ただし赤方偏移だけで $\tau_e$ や距離が一意に決まるわけではなく、$H(\tau)$ のモデルが必要です。

<a id="prop-gr43-lookback-distance"></a>

<!-- formal-statement-start -->
> **命題（赤方偏移・光行時間・共動動径距離）**
> 共動源から直接届く光について、発光から受信まで $a>0$ かつ $H>0$ が連続とし、受信時を $z=0$ とする。尺度因子で定める $1+z=a_0/a(\tau)$ に対し、発光時刻までの**光行時間** $\tau_0-\tau_e$ と共動動径距離 $\chi_e$ は

$$
\boxed{\tau_0-\tau_e=\int_0^{z_e}\frac{dz}{(1+z)H(z)}},
$$

$$
\boxed{\chi_e=\frac{1}{a_0}\int_0^{z_e}\frac{dz}{H(z)}.}
$$

> $H(z)$ は $1+z=a_0/a(\tau)$ で時刻を置換した関数である。$H=0$ の転回点を含む区間にはこの変数変換を無条件に適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

赤方偏移の定義から $1+z=a_0/a$ を微分して $d\tau$ を $dz$ に替えます。同じ置換を光路積分の $d\tau/a$ に適用すると、二つの積分で分母が異なる理由が見えます。

<!-- proof-start -->
### 証明

$a_0$ は受信時の固定値であり、時間微分して

$$
\frac{dz}{d\tau}
=-\frac{a_0\dot a}{a^2}
=-(1+z)H(\tau).
$$

$H>0$ の仮定により $z$ は時間に関して狭義減少するため逆関数を使えます。すなわち $d\tau=-dz/[(1+z)H(z)]$ です。$\tau_e\to\tau_0$ は $z_e\to0$ に対応し、

$$
\int_{\tau_e}^{\tau_0}d\tau
=\int_{z_e}^{0}\frac{-dz}{(1+z)H(z)}
=\int_0^{z_e}\frac{dz}{(1+z)H(z)}.
$$

さらに $a=a_0/(1+z)$ と[光路積分](#prop-gr43-null-path)から

$$
\chi_e=\int_{\tau_e}^{\tau_0}\frac{d\tau}{a}
=\int_{z_e}^{0}
\frac{-dz}{(1+z)H(z)}\,\frac{1+z}{a_0}
=\frac1{a_0}\int_0^{z_e}\frac{dz}{H(z)}.
$$

$H$ で割った箇所は膨張区間の仮定により正当化されます。$\square$
<!-- proof-end -->

例えば[GR42の平坦な塵宇宙](../GR42/index.md#prop-gr42-elementary-solutions)では $a=A(\tau-\tau_B)^{2/3}$ です。$s=\tau-\tau_B>0$ と置けば

$$
1+z=(s_0/s_e)^{2/3},
\qquad s_e=s_0(1+z)^{-3/2},
\qquad H(z)=H_0(1+z)^{3/2}.
$$

従って $\tau_0-\tau_e=s_0[1-(1+z)^{-3/2}]$。一方 $\chi$ は $1/a$ の積分であるため、同じ時間差を単純に $a_0$ で割ったものではありません。

## 4. 「どのくらい遠いか」を何で測るか

遠方の天体に巻尺を当てることはできません。見かけの角度から大きさを推定する場合と、放射の明るさから距離を推定する場合では、同じ物体でも別の**観測的距離**になります。ここで観測上の仮定を分けて定義します。

角径距離では、発光源に置いた小さい横方向の物差しの固有長 $\ell_\perp$ と、受信者が測る微小角 $\delta\theta$ を結びます。光度距離では、発光源の固有時間あたりの全放射エネルギーで定めた光度 $L$ と、受信者の固有時間・単位面積あたりに届く全周波数積分済みのエネルギー流束 $F$ を用います。

<a id="def-gr43-observational-distances"></a>

<!-- formal-statement-start -->
> **定義（角径距離と光度距離）**
> 光源と受信者が共動し、光線束に焦点や多重像がなく、発光源の隣接点間の横方向固有長 $\ell_\perp(\delta\theta)>0$ と、それらが受信者に張る微小角 $\delta\theta>0$ を測れるとする。**角径距離**を極限 $D_A=\lim_{\delta\theta\to0}\ell_\perp(\delta\theta)/\delta\theta$ と定める。さらに、等方的に放射する光源の全光度 $L>0$ と、光の吸収・散乱がないときに受信するボロメトリック流束 $F>0$ を使って、**光度距離**を

$$
\boxed{D_L=\sqrt{\frac{L}{4\pi F}}}
$$

> と定める。$D_A,D_L$ は同じ受信時刻の宇宙時間面における固有距離そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr43-observational-distances -->
**定義の確認**：近傍の静的平坦空間で半径 $r=10$（同一の長さ単位）の位置に光源を置きます。受信者の方向角を $\delta\theta$ だけ変えたとき、半径 $r$ の球面上で測る横方向の弧長は $\ell_\perp(\delta\theta)=r\delta\theta$ です。これは球面の角方向の長さ要素が $r\,d\theta$ だからであり、観測角と固有長の対応を与えます。例えば $\delta\theta=10^{-3}$ なら $\ell_\perp=10^{-2}$ です。定義の極限は

$$
D_A=\lim_{\delta\theta\to0}\frac{\ell_\perp(\delta\theta)}{\delta\theta}
=\lim_{\delta\theta\to0}\frac{r\delta\theta}{\delta\theta}=10.
$$

等方光度 $L=4\pi\cdot100$、透明空間での流束 $F=1$ とすれば $L/(4\pi F)=100$、$D_L=10$。小角の幾何と逆二乗則を個別に確認しました。膨張時には二種類が一致しないことを次に導きます。
<!-- definition-example-end -->

<a id="thm-gr43-distance-duality"></a>

<!-- formal-statement-start -->
> **定理（FLRWの角径距離・光度距離）**
> FLRW時空で $a>0$、共動光源と共動受信者を結ぶ一意の光線束があり、光線束に焦点がなく、幾何光学・光子数保存・透明な伝播が成り立つとする。光源の等方光度 $L$ を用い、動径座標差 $\chi_e>0$ が $S_k(\chi_e)>0$ を満たす範囲では、

$$
\boxed{D_A=a_eS_k(\chi_e),}
$$

$$
\boxed{D_L=a_0S_k(\chi_e)(1+z)
=(1+z)^2D_A.}
$$

> 特に空間平坦 $k=0$ で $H>0$ の場合、

$$
\boxed{D_L(z)=(1+z)\int_0^z\frac{dz'}{H(z')}.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず球面の横方向計量 $a_e^2S_k(\chi_e)^2d\Omega^2$ が角径距離を与えます。次に球面全体への等方放射の幾何学的広がりに、**一光子のエネルギー低下**と**到着間隔の伸び**という二つの $1+z$ 因子を掛け、流束から光度距離を得ます。

<!-- proof-start -->
### 証明

発光時刻の空間計量は $a_e^2(d\chi^2+S_k(\chi)^2d\Omega^2)$ です。[GR41の測地極座標](../GR41/index.md#prop-gr41-radial-metric)では受信者を原点に置き、局所等方性により座標上の微小方向差 $\delta\theta$ が受信者の局所枠で測る角度差に一致します。この角度を変えて発光面を横切る二本の隣接動径光線は、同じ $\chi_e$ において

$$
\ell_\perp=a_eS_k(\chi_e)\delta\theta+o(\delta\theta).
$$

したがって $D_A=\lim\ell_\perp/\delta\theta=a_eS_k(\chi_e)$ です。

放射時刻で $dE_e=L\,d\tau_e$ が等方的に出るとします。光子数が保存し、一粒子のエネルギーが[赤方偏移定理](#thm-gr43-redshift-scale)により $E_0=E_e/(1+z)$ へ下がるため、受信総エネルギーは $dE_0=dE_e/(1+z)$ です。さらに短いパルスについて[到着時間の伸び](#thm-gr43-redshift-scale)は $d\tau_0=(1+z)d\tau_e$ なので、

$$
\frac{dE_0}{d\tau_0}
=\frac{L}{(1+z)^2}.
$$

共動受信時刻での波面の面積は $A_0=4\pi a_0^2S_k(\chi_e)^2$ です。等方性・焦点のない伝播により同じエネルギーがこの面へ均等に広がるので

$$
F=\frac{L}{4\pi a_0^2S_k(\chi_e)^2(1+z)^2}.
$$

[光度距離の定義](#def-gr43-observational-distances)に代入すると $D_L=a_0S_k(\chi_e)(1+z)$ です。$a_0/a_e=1+z$ と $D_A=a_eS_k(\chi_e)$ から $D_L=(1+z)^2D_A$ が従います。

$k=0$ なら $S_0(\chi)=\chi$ であり、[赤方偏移による光路積分](#prop-gr43-lookback-distance)から $a_0\chi_e=\int_0^z dz'/H(z')$ を代入すれば最後の式を得ます。$\square$
<!-- proof-end -->

この距離双対はしばしばEtherington関係と呼ばれます。ここではFLRW・透明な幾何光学に限って導きました。吸収や散乱があれば観測流束は小さくなり、単純に $D_L=(1+z)^2D_A$ を観測データへ当てはめることはできません。また非等方な光源、天体固有のスペクトル変化、重力レンズで複数像が生じる場合には、対応する放射・像の取り扱いが必要です。

## 5. Hubble則の局所近似と減速の情報

低い赤方偏移では $z$ と距離がほぼ比例しますが、比例定数だけで宇宙の全履歴が決まるわけではありません。ここで光度距離の級数の第一・第二係数を調べ、膨張率 $H_0$ と尺度因子の加速度を区別します。膨張率は[GR42で定義した $H$](../GR42/index.md#def-gr42-hubble-fluid)であり、尺度因子の二階微分を無次元化した減速パラメータ $q=-\ddot a/(aH^2)$ は $H\ne0$ のときに定めます。

<a id="prop-gr43-hubble-series"></a>

<!-- formal-statement-start -->
> **命題（低赤方偏移での光度距離の級数）**
> FLRW時空で $a>0$ が $C^3$ 級、受信時の $H_0>0$ とし、$q_0=-\ddot a_0/(a_0H_0^2)$ と置く。十分小さい $z\ge0$ に対し、透明・焦点なしの条件下で

$$
\boxed{D_L(z)=\frac{z}{H_0}
+\frac{1-q_0}{2H_0}z^2+O(z^3).}
$$

> したがって一次のHubble則 $z=H_0D_L+O(D_L^2)$ は空間曲率 $k$ に依存せず、曲率の明示的寄与はこの展開では $z^3$ 以降に現れる。
<!-- formal-statement-end -->

### 証明の見取り図

$H=\dot a/a$ を時間微分し、$z$ に関する微分へ変換すると $H'(0)=H_0(1+q_0)$ が出ます。それを光路積分に入れ、$S_k(\chi)=\chi+O(\chi^3)$ と組み合わせます。

<!-- proof-start -->
### 証明

$\dot H=\ddot a/a-H^2$ と $q=-\ddot a/(aH^2)$ から $\dot H=-(1+q)H^2$ です。[赤方偏移の時間微分](#prop-gr43-lookback-distance)は $dz/d\tau=-(1+z)H$ なので

$$
\frac{dH}{dz}
=\frac{\dot H}{dz/d\tau}
=\frac{(1+q)H}{1+z}.
$$

よって $z$ についての導関数 $H'(0)=(dH/dz)|_{z=0}=H_0(1+q_0)$。$H_0>0$ の近傍では逆数を展開して

$$
\frac1{H(z)}
=\frac1{H_0}\left[1-(1+q_0)z+O(z^2)\right].
$$

これを積分すると

$$
a_0\chi(z)=\int_0^z\frac{dz'}{H(z')}
=\frac1{H_0}\left[z-\frac{1+q_0}{2}z^2+O(z^3)\right].
$$

$S_k(\chi)=\chi-k\chi^3/6+O(\chi^5)$ なので $a_0S_k(\chi)=a_0\chi+O(z^3)$。さらに[光度距離](#thm-gr43-distance-duality)は $D_L=(1+z)a_0S_k(\chi)$ より

$$
\begin{aligned}
D_L(z)&=\frac{1+z}{H_0}
\left[z-\frac{1+q_0}{2}z^2+O(z^3)\right]\\
&=\frac{z}{H_0}+\frac{1-q_0}{2H_0}z^2+O(z^3).
\end{aligned}
$$

$H_0>0$ なら局所的に逆関数があり、$z=H_0D_L+O(D_L^2)$ も成立します。$\square$
<!-- proof-end -->

$c$ を戻す場合は距離積分に $c$ を掛け、一次則は $cz=H_0D_L+O(D_L^2)$ と読みます。$H_0$ の単位は時間の逆数です。観測で推定する距離には標準光源の校正や固有運動などが関わるため、この理想的FLRW式を観測値へ適用する際は誤差とモデル仮定を分けなければなりません。

## 6. 「宇宙膨張はDoppler効果か」という問い

近くの二人の観測者の相対運動によるDoppler効果は、一点の局所直交枠の比較で説明できます。しかし宇宙赤方偏移は遠く離れた**異なる二点**の測定周波数の比較です。途中で観測者の速度をどのように比較するかという平行移動の選択なしに「一つの相対速度」へ置き換えることはできません。とはいえ「Dopplerと全く無関係」と言い切るのも正しくありません。平坦なMinkowski時空を膨張して見える共動座標で表したMilne模型が、その違いを教えてくれます。

<a id="prop-gr43-milne-doppler"></a>

<!-- formal-statement-start -->
> **命題（Milne模型の赤方偏移と特殊相対論Doppler因子）**
> $k=-1$、$\tau>0$、$a(\tau)=\tau$ のMilne模型において、共動源 $\chi=\chi_e>0$ から原点の共動受信者へ届く内向き動径光線を考える。受信・発光時刻を $\tau_0,\tau_e$ とすると、

$$
1+z=\frac{\tau_0}{\tau_e}=e^{\chi_e}.
$$

> またMinkowski座標の相対速度 $\beta=\tanh\chi_e$ を使えば

$$
\boxed{1+z=\sqrt{\frac{1+\beta}{1-\beta}}.}
$$

> 従ってこの模型では宇宙赤方偏移が通常の後退Doppler因子と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

Milneの負曲率空間の動径座標をMinkowskiの慣性座標に変換すると、共動源は定速の直線となります。光路積分とDoppler因子を別々に出して一致を確かめます。

<!-- proof-start -->
### 証明

$a=\tau$ なので[光路積分](#prop-gr43-null-path)により

$$
\chi_e=\int_{\tau_e}^{\tau_0}\frac{d\tau}{\tau}
=\log\frac{\tau_0}{\tau_e}.
$$

[宇宙赤方偏移と尺度因子](#thm-gr43-redshift-scale)の定理から $1+z=\tau_0/\tau_e=e^{\chi_e}$ です。一方、

$$
T=\tau\cosh\chi,\qquad R=\tau\sinh\chi
$$

と置くと、積の微分から

$$
\begin{aligned}
dT&=\cosh\chi\,d\tau+\tau\sinh\chi\,d\chi,\\
dR&=\sinh\chi\,d\tau+\tau\cosh\chi\,d\chi.
\end{aligned}
$$

$\cosh^2\chi-\sinh^2\chi=1$ を使えば交差項が消え、$-dT^2+dR^2=-d\tau^2+\tau^2d\chi^2$ です。角度部分も $R^2d\Omega^2=\tau^2\sinh^2\chi\,d\Omega^2$ なので計量はMinkowskiです。$\chi=\chi_e$ の共動源は $R/T=\tanh\chi_e=\beta$ という定速世界線、$\chi=0$ の受信者は $R=0$ です。$\beta\in(0,1)$ に対し

$$
\sqrt{\frac{1+\beta}{1-\beta}}
=\sqrt{\frac{\cosh\chi_e+\sinh\chi_e}{\cosh\chi_e-\sinh\chi_e}}
=\sqrt{\frac{e^{\chi_e}}{e^{-\chi_e}}}
=e^{\chi_e}
$$

となります。これは[GR4の局所Doppler公式](../GR4/index.md#prop-gr4-doppler)とも直接照合できます。光線の進む動径を $X$ 軸とする大域的なMinkowski直交座標 $(T,X,Y,Z)$ を取り、この光線上では $X=R$ とします。内向き光線の波数、源の四元速度、受信者の四元速度はそれぞれ

$$
K=\omega_0(1,-1,0,0),\qquad
u_e=\gamma(1,\beta,0,0),\qquad
u_0=(1,0,0,0),
$$

です。ここで $\gamma=(1-\beta^2)^{-1/2}$。平坦時空では $K$ の成分は光線上で一定なので

$$
\frac{\omega_e}{\omega_0}
=\frac{-g(K,u_e)}{-g(K,u_0)}
=\gamma(1+\beta)
=\sqrt{\frac{1+\beta}{1-\beta}}.
$$

離れた二点で局所Doppler公式を比較できるのは、ここでは大域的なMinkowski慣性枠で光の $K$ を同定できるためです。$\square$
<!-- proof-end -->

Milne時空は[GR41で確かめた平坦時空の別の葉層](../GR41/index.md#ex-gr41-c01)であり、時空曲率は零です。従って「宇宙赤方偏移があれば時空曲率が非零」とは推論できません。逆に一般の曲がったFLRW時空でMilneと同じ大域的な慣性座標を作れるとも限りません。局所Dopplerの連続的な積として表現する方法はありますが、その中間観測者の選び方を明示した上での記述です。

## 7. 演習

### Level A：式の役割と観測量を一つずつ確認する

<a id="ex-gr43-a01"></a>

### GR43-A01 光路積分と共形時間
- Level: A

$k=0$、$a(\tau)=A\tau^{1/2}$（$A>0,\tau>0$）とする。$\tau_e<\tau_0$ で発した内向き光線の共動距離 $\chi_e$ を求め、$d\eta=d\tau/a$ から $\eta$ を原始関数の加法定数まで求めよ。

<!-- solution-start -->
**詳細解答。** [光路命題](#prop-gr43-null-path)に代入すると

$$
\chi_e=\frac1A\int_{\tau_e}^{\tau_0}\tau^{-1/2}\,d\tau
=\frac2A(\sqrt{\tau_0}-\sqrt{\tau_e}).
$$

同じ被積分関数から $\eta(\tau)=2\sqrt{\tau}/A+C$ です。$\eta_0-\eta_e=(2/A)(\sqrt{\tau_0}-\sqrt{\tau_e})=\chi_e$ なので、内向き光線の $d\chi/d\eta=-1$ と一致します。$\tau>0$、$A>0$ の仮定が分母の正値性を保証します。
<!-- solution-end -->

<a id="ex-gr43-a02"></a>

### GR43-A02 波数の時間成分
- Level: A

$k=0,a=e^{b\tau}$（$b>0$）とする。未来向き光的測地線の $K^\tau(\tau_e)=\omega_e>0$ から、$\omega_0$ と $z$ を求めよ。光線の方向は任意とする。

<!-- solution-start -->
**詳細解答。** [周波数の保存則](#thm-gr43-redshift-scale)は $a\omega=\mathrm{const}$ なので、$e^{b\tau_0}\omega_0=e^{b\tau_e}\omega_e$、従って $\omega_0=\omega_e e^{-b(\tau_0-\tau_e)}$ です。定義から $1+z=\omega_e/\omega_0=e^{b(\tau_0-\tau_e)}$、すなわち $z=e^{b(\tau_0-\tau_e)}-1>0$。証明で用いるのは光的条件 $h_{ij}K^iK^j=(K^\tau)^2$ だけで、特定の動径方向には依存しません。
<!-- solution-end -->

<a id="ex-gr43-a03"></a>

### GR43-A03 赤方偏移と流体密度
- Level: A

$z=2$ の共動発光源について尺度因子・局所波長・光子一個のエネルギーの放射時と受信時の比を求めよ。自由伝播の放射密度は $\rho_r\propto a^{-4}$ とする。$\rho_r(\tau_e)/\rho_r(\tau_0)$ も答えよ。

<!-- solution-start -->
**詳細解答。** [赤方偏移定理](#thm-gr43-redshift-scale)から $a_0/a_e=1+z=3$、従って $a_e/a_0=1/3$。局所波長は $a$ に比例するので $\lambda_e/\lambda_0=1/3$、エネルギーは $a^{-1}$ に比例するので $E_e/E_0=3$。密度については[GR42の放射スケーリング](../GR42/index.md#prop-gr42-fluid-continuity)を用い

$$
\frac{\rho_r(\tau_e)}{\rho_r(\tau_0)}
=\left(\frac{a_e}{a_0}\right)^{-4}
=3^4=81.
$$

エネルギー一個の比3と密度比81を混同せず、残りの因子27は共動体積の変化に対応します。
<!-- solution-end -->

<a id="ex-gr43-a04"></a>

### GR43-A04 光度距離と角径距離の比較
- Level: A

透明なFLRW時空で $z=1$、$D_A=500\,\mathrm{Mpc}$ と測定したとする。$D_L$ を求め、$L=4\pi\times10^{48}$（光度単位）なら $F$ を対応する光度単位毎 $\mathrm{Mpc}^2$ で計算せよ。

<!-- solution-start -->
**詳細解答。** [距離定理](#thm-gr43-distance-duality)に $1+z=2$ を代入して $D_L=(1+z)^2D_A=4\cdot500=2000\,\mathrm{Mpc}$ です。[光度距離の定義](#def-gr43-observational-distances)から

$$
F=\frac{L}{4\pi D_L^2}
=\frac{4\pi\cdot10^{48}}{4\pi\cdot(2000)^2}
=\frac{10^{48}}{4\cdot10^6}
=2.5\cdot10^{41}
$$

で、指定された光度単位毎 $\mathrm{Mpc}^2$ です。$D_L$ と $D_A$ は距離の単位が同じでも観測的な定義が異なるため、$D_A$ を直接流束公式の分母に入れてはいけません。
<!-- solution-end -->

<a id="ex-gr43-a05"></a>

### GR43-A05 小さい赤方偏移で何が分かるか
- Level: A

$H_0>0$ のFLRW模型二つが同じ $H_0$ を持ち、一方は $q_0=1/2$、他方は $q_0=-1$ とする。両者の $D_L(z)$ を $z^2$ まで書き、一次のHubble則で区別できるか述べよ。

<!-- solution-start -->
**詳細解答。** [光度距離の級数](#prop-gr43-hubble-series)から $q_0=1/2$ なら $D_L=z/H_0+z^2/(4H_0)+O(z^3)$、$q_0=-1$ なら $D_L=z/H_0+z^2/H_0+O(z^3)$ です。どちらも一次係数 $1/H_0$ は同じなので一次Hubble則だけでは区別できません。二次係数の差は $3z^2/(4H_0)$ であり、加速の情報はこの段階で初めて入ります。
<!-- solution-end -->

### Level B：二つ以上の観測・幾何学条件をつなぐ

<a id="ex-gr43-b01"></a>

### GR43-B01 一般の冪乗膨張から距離を計算する
- Level: B

$k=0$、$\tau>0$、$a(\tau)=A\tau^s$（$A>0,s>0$）とし、$\tau_0$ に観測する。$H_0=s/\tau_0$ と $z$ を使って、$s\ne1$ の光度距離 $D_L(z)$ と、$s=1$ の極限を求めよ。$s$ は冪指数であり、第5節の減速パラメータ $q$ とは異なる。途中で $a_0\chi$ を導け。

<!-- solution-start -->
**詳細解答。** [赤方偏移定理](#thm-gr43-redshift-scale)は $1+z=(\tau_0/\tau_e)^s$、従って $\tau_e=\tau_0(1+z)^{-1/s}$ です。[光路積分](#prop-gr43-null-path)で $s\ne1$ なら

$$
\begin{aligned}
a_0\chi&=A\tau_0^s\int_{\tau_e}^{\tau_0}\frac{d\tau}{A\tau^s}\\
&=\frac{\tau_0^s}{1-s}\left(\tau_0^{1-s}-\tau_e^{1-s}\right)\\
&=\frac{\tau_0}{1-s}\left[1-(1+z)^{-(1-s)/s}\right].
\end{aligned}
$$

$\tau_0=s/H_0$ を代入し、[FLRWの角径距離・光度距離](#thm-gr43-distance-duality)の定理を使えば

$$
\boxed{D_L(z)=\frac{s(1+z)}{H_0(1-s)}
\left[1-(1+z)^{-(1-s)/s}\right].}
$$

$s=1$ では積分を直接行い、$a_0\chi=\tau_0\log(\tau_0/\tau_e)=\tau_0\log(1+z)$ です。$H_0=1/\tau_0$ より $D_L=(1+z)\log(1+z)/H_0$。上式の $s\to1$ も、$x=(1-s)\log(1+z)/s\to0$ と置くと

$$
\frac{1-e^{-x}}{1-s}
=\frac{1-e^{-x}}x\frac{\log(1+z)}s
\longrightarrow\log(1+z)
$$

となり、$\lim_{x\to0}(1-e^{-x})/x=1$ によって同じ結果が得られます。
<!-- solution-end -->

<a id="ex-gr43-b02"></a>

### GR43-B02 塵と放射の距離を比較する
- Level: B

$k=\Lambda=0$、単一の一定状態方程式流体が支配する膨張FLRW模型を二つ考える。塵 $w=0$ と放射 $w=1/3$ の各々で、同じ受信時 $H_0>0$ を基準に $H(z)$、$D_L(z)$、$q_0$ を求め、小さい $z$ での二次係数を検算せよ。

<!-- solution-start -->
**詳細解答。** [GR42の冪乗解](../GR42/index.md#prop-gr42-elementary-solutions)より塵は尺度因子の冪指数 $s=2/3$、放射は $s=1/2$ です。減速パラメータ $q_0$ とは区別します。一般に $H=s/\tau$、$\tau_e=\tau_0(1+z)^{-1/s}$ なので $H(z)=H_0(1+z)^{1/s}$ です。

塵では $H_m(z)=H_0(1+z)^{3/2}$ です。[冪乗模型の距離](#ex-gr43-b01)へ $s=2/3$ を代入し、

$$
D_{L,m}(z)=\frac{2(1+z)}{H_0}
\left[1-\frac1{\sqrt{1+z}}\right].
$$

放射は $H_r(z)=H_0(1+z)^2$ で

$$
D_{L,r}(z)=\frac{1+z}{H_0}
\left[1-(1+z)^{-1}\right]=\frac z{H_0}.
$$

$a\propto\tau^s$ なら $\ddot a/a=s(s-1)/\tau^2$、$H^2=s^2/\tau^2$ だから減速パラメータ $q_0=(1-s)/s$。塵は $q_0=1/2$、放射は $q_0=1$ です。二次展開では塵 $D_{L,m}=z/H_0+z^2/(4H_0)+O(z^3)$、放射 $D_{L,r}=z/H_0+0\cdot z^2+O(z^3)$ となり、[一般級数](#prop-gr43-hubble-series)の $(1-q_0)/(2H_0)$ と一致します。
<!-- solution-end -->

<a id="ex-gr43-b03"></a>

### GR43-B03 光子のエネルギーとパルス到着率を分ける
- Level: B

透明で等方的なFLRW模型の共動源から、一個当たりエネルギー $E_e$ の光子を固有時間 $d\tau_e$ 当たり $dN$ 個放つ。受信時の球面面積は $A_0=4\pi a_0^2S_k(\chi_e)^2$ とする。

1. 一光子の受信エネルギー $E_0$ を求めよ。
2. 受信者が測るパルス間隔 $d\tau_0$ を求めよ。
3. 放射光度 $L=E_edN/d\tau_e$ と赤方偏移を使い、流束 $F$ を求めよ。
4. 光子を途中で吸収する場合に、どの等式が破れるか述べよ。

<!-- solution-start -->
**詳細解答。**

**（1）** [宇宙赤方偏移と尺度因子](#thm-gr43-redshift-scale)により、一光子の受信エネルギーは $E_0=E_e/(1+z)$ です。

**（2）** [光路積分の両端の微分](#thm-gr43-redshift-scale)を適用すると、同じ共動経路を進む連続パルスについて $0=-d\tau_e/a_e+d\tau_0/a_0$、従って $d\tau_0=(1+z)d\tau_e$ です。

**（3）** 光子数 $dN$ が保存するので、受信したエネルギーは $dE_0=dN E_0=dN E_e/(1+z)$。受信時のエネルギー率は

$$
\frac{dE_0}{d\tau_0}
=\frac{E_e dN/(1+z)}{(1+z)d\tau_e}
=\frac{L}{(1+z)^2}.
$$

面積 $A_0$ で割ると

$$
F=\frac{L}{4\pi a_0^2S_k(\chi_e)^2(1+z)^2}.
$$

(4) 吸収があれば $dN$ の全数が受信面へ届くという前提が破れ、$dE_0=dNE_e/(1+z)$ の受信数への置き換えができません。個々の到達光子の赤方偏移則そのものまで壊れるわけではありません。
<!-- solution-end -->

<a id="ex-gr43-b04"></a>

### GR43-B04 Milne模型で空間曲率と時空曲率を区別する
- Level: B

$k=-1,a=\tau$、$\chi_e=\log3$ に共動源を置き、$\chi=0$ で光を受信する。発光時刻 $\tau_e$、受信時刻 $\tau_0$ の比、赤方偏移 $z$、Minkowski座標での相対速度 $\beta$ を求めよ。宇宙赤方偏移から時空の曲率を断定できるか述べよ。

<!-- solution-start -->
**詳細解答。** [Milne命題](#prop-gr43-milne-doppler)の光路式から $\chi_e=\log(\tau_0/\tau_e)=\log3$ なので $\tau_0/\tau_e=3$ です。従って $1+z=3$、$z=2$。座標変換 $T=\tau\cosh\chi,R=\tau\sinh\chi$ より $\beta=\tanh(\log3)$ で、

$$
\beta=\frac{e^{2\log3}-1}{e^{2\log3}+1}
=\frac{9-1}{9+1}=\frac45.
$$

特殊相対論の後退Doppler因子は $\sqrt{(1+4/5)/(1-4/5)}=\sqrt9=3$ で、確かに $1+z$ と一致します。この模型の時空計量はMinkowskiに座標変換できるので時空曲率は零です。$z=2$ という観測だけから「時空曲率は非零」とは言えません。
<!-- solution-end -->

### Level C：観測量から宇宙模型の仮定へ戻る

<a id="ex-gr43-c01"></a>

### GR43-C01 二つの膨張史と赤方偏移の解釈
- Level: C

受信時 $a_0=1$、$H_0>0$ の透明・空間平坦な膨張FLRW模型を考える。模型Aは $H_A(z)=H_0(1+z)^{3/2}$、模型Bは $H_B(z)=H_0$ とする。どちらも共動源を観測する。

1. 各模型について $D_L(z)$ と光行時間 $\tau_0-\tau_e$ を閉じた式で求めよ。
2. $z=1$ での $D_L$ と光行時間をそれぞれ $H_0^{-1}$ 単位で比較せよ。
3. 両模型で同じ $z$ の光子のエネルギー比 $E_e/E_0$ は変わるか。$z$ だけで距離を決められるか説明せよ。
4. 模型A、Bの $q_0$ と低赤方偏移の二次係数を求め、前問の距離の違いに結び付けよ。
5. 模型Bは $k=0$ かつ $H$ 一定である。$a(\tau)$ を求め、$\rho=p=0,\Lambda=3H_0^2$ の[GR42のFriedmann方程式](../GR42/index.md#thm-gr42-friedmann)を満たすことを検算せよ。

<!-- solution-start -->
**詳細解答。**

**(1) 光度距離。** [赤方偏移の光路積分](#prop-gr43-lookback-distance)と[平坦な距離式](#thm-gr43-distance-duality)から

$$
D_L(z)=(1+z)\int_0^z\frac{du}{H(u)}.
$$

模型Aについて $\int_0^z(1+u)^{-3/2}du=2[1-(1+z)^{-1/2}]$、模型Bについて $\int_0^z du=z$ なので

$$
D_{L,A}=\frac{2(1+z)}{H_0}\left[1-(1+z)^{-1/2}\right],
\qquad D_{L,B}=\frac{z(1+z)}{H_0}.
$$

光行時間は $\int_0^zdu/[(1+u)H(u)]$。Aでは被積分関数は $H_0^{-1}(1+u)^{-5/2}$、Bでは $H_0^{-1}(1+u)^{-1}$ だから

$$
\tau_0-\tau_{e,A}=\frac{2}{3H_0}\left[1-(1+z)^{-3/2}\right],
\qquad
\tau_0-\tau_{e,B}=\frac{\log(1+z)}{H_0}.
$$

**(2)** $z=1$ のとき

$$
H_0D_{L,A}=4\left(1-\frac1{\sqrt2}\right)\approx1.1716,\qquad
H_0D_{L,B}=2,
$$

$$
H_0(\tau_0-\tau_{e,A})=\frac23\left(1-\frac1{2\sqrt2}\right)\approx0.4310,\qquad
H_0(\tau_0-\tau_{e,B})=\log2\approx0.6931.
$$

同じ赤方偏移でも膨張史が異なれば、距離も光行時間も異なります。

**(3)** [赤方偏移定理](#thm-gr43-redshift-scale)からどちらも $E_e/E_0=1+z$、$z=1$ なら2です。この比は端点の尺度因子だけで決まり、(1)の光路積分は途中の $H(z)$ に依存します。従って $z$ 単独から距離は決められません。

**(4)** [Hubble級数の導出](#prop-gr43-hubble-series)から $H'(0)=H_0(1+q_0)$。模型Aは $H'_A(0)=3H_0/2$ なので $q_{0,A}=1/2$、模型Bは $H'_B(0)=0$ なので $q_{0,B}=-1$。二次係数はそれぞれ $1/(4H_0)$、$1/H_0$ です。

実際、$(1+z)^{-1/2}=1-z/2+3z^2/8+O(z^3)$ を(1)の式へ代入すると

$$
D_{L,A}=\frac z{H_0}+\frac{z^2}{4H_0}+O(z^3),\qquad
D_{L,B}=\frac z{H_0}+\frac{z^2}{H_0}
$$

となり、先ほどの二次係数を確かめられます。

**(5)** $H=\dot a/a=H_0$ の一階方程式を積分すると $a(\tau)=a_0e^{H_0(\tau-\tau_0)}=e^{H_0(\tau-\tau_0)}$。$k=0,\rho=p=0,\Lambda=3H_0^2$ の制約式は $H^2=\Lambda/3=H_0^2$、加速式は $\ddot a/a=H_0^2=\Lambda/3$ です。両方が成立し、[GR42の真空指数解](../GR42/index.md#prop-gr42-elementary-solutions)を再現します。宇宙項は物質密度へ重複して加えていません。
<!-- solution-end -->

## 8. ここまでで何を測ったか

- スペクトル線の比としての赤方偏移は、**共動源・受信者**の間では $1+z=a_0/a_e$ に等しい。固有運動、局所重力、源自身のスペクトル変化をすべて宇宙膨張へ帰属してはいけない。
- 光行時間と共動動径距離は、それぞれ $\int dz/[(1+z)H]$ と $a_0^{-1}\int dz/H$ であり、赤方偏移だけでは値が決まらない。
- 角径距離 $D_A$ と光度距離 $D_L$ は別の観測量で、透明な幾何光学では $D_L=(1+z)^2D_A$。小さい $z$ では $D_L=z/H_0+(1-q_0)z^2/(2H_0)+O(z^3)$。
- Milne模型は、曲がっていないMinkowski時空でも宇宙赤方偏移表示が可能であることを示す。「赤方偏移の原因」を一つの遠隔速度に還元するときは比較規約が必要である。

次のGR44では、同じ共形時間積分が有限か無限かを調べて、見える範囲と宇宙論的地平線を区別します。
