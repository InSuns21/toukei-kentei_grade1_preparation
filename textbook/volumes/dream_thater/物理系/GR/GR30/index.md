# GR30 球対称重力崩壊模型

<!-- definition-example-audit: strict -->

[GR29の未来事象地平線](../GR29/index.md#def-gr29-event-horizon)は、未来零無限遠へ信号を送れる領域の境界です。前章では時間依存する計量の地平線を比較しましたが、そこに**何の物質が流れ、どこが真空と接するか**は確かめていません。これを調べないと、与えた時空が重力崩壊の模型なのか、単に時間依存する関数を代入しただけなのか判断できません。

本章では、球対称の入射光が極めて薄い殻となって流れ込む模型を作ります。殻の前は平坦、通過後はSchwarzschild時空です。まず滑らかな入射零物質流についてEinstein方程式を成分計算し、その厚みを零へ近付けて薄殻を定義します。次に殻を横切る光線から未来事象地平線の始まりを計算し、静的な永遠のSchwarzschild解と比べます。

計量の符号は $(-,+,+,+)$、宇宙項は $Lambda=0$ とします。計算中は $G=c=1$ の幾何単位系を採用します。$v$ と面積半径 $r$ は長さ、質量パラメータ $m$ と $a=2m$ も長さの次元を持ち、$d\Omega^2=d\vartheta^2+\sin^2\vartheta\,d\varphi^2$ です。通常の単位に戻すと $a=2GM/c^2$ です。特に明記しない限り $r>0$ で議論します。

## 1. 平坦な領域と真空の領域を同じ座標で書く

[GR26の入射Eddington–Finkelstein計量](../GR26/index.md#prop-gr26-ef-metric-domain)は、地平線を横切っても正則な零座標 $v$ を用います。この座標に、一定のSchwarzschild半径 $a$ の代わりに時間依存の関数 $a(v)$ を入れて

$$
ds^2=-f(v,r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,
\qquad f(v,r):=1-\frac{a(v)}r
$$

と置きます。以下 $a(v)\ge0$ とし、まず $a\in C^2$ と仮定します。$a=0$ が定数なら $t=v-r$ とおくと $dv=dt+dr$ なので

$$
-dv^2+2\,dv\,dr=-(dt+dr)^2+2(dt+dr)dr=-dt^2+dr^2.
$$

この領域はMinkowski時空の球座標表示です。一方、$a>0$ が定数なら、同じ式は質量 $m=a/2$ のSchwarzschild時空の入射延長になります。この二つの**局所的な形**が同じ座標で書けるため、物質が通過する前後を比較できます。

ただし $a(v)$ を自由に変えてよいわけではありません。[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)は $G_{\mu\nu}=8\pi T_{\mu\nu}$ を要求します。$a'(v)$ がどのような $T$ を生むかを確かめましょう。

## 2. 変化する質量は何を運ぶか

まず $v=\mathrm{const}$ は零超曲面です。$(v,r)$ の計量行列とその逆行列は

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad
(g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix},\qquad a,b\in\{v,r\}.
$$

行列の積を取ると単位行列になります。$g^{-1}(dv,dv)=g^{vv}=0$ なので $dv$ は零法線です。対応する未来向き入射零ベクトルを $k=-\partial_r$ と選べば

$$
k^\mu=-g^{\mu\nu}(dv)_\nu,\qquad
k^\mu k_\mu=0,\qquad k^v=0,\ k^r=-1
$$

です。この $k$ に沿う光の流れは $r$ が減る方向で、$v$ が一定です。

<a id="def-gr30-ingoing-null-dust"></a>

<!-- formal-statement-start -->
> **定義（球対称の入射零物質流）**  
> $r>0$ の球対称時空で、未来向き零ベクトル $k=-\partial_r$ に沿い、$\rho(v,r)\ge0$ を係数として

$$
\boxed{T_{\mu\nu}=\rho(v,r)\,(dv)_\mu(dv)_\nu}
$$

> と書ける応力テンソルを、入射零物質流（null dust）の応力テンソルという。ここで $dv=-k^\flat$ であり、$\rho$ はこの $k$ の規格化に対する係数である。通常の時間的四元速度を持つ[GR8の圧力零の塵](../GR8/index.md#def-gr8-dust)とは異なり、流れの接ベクトルは零である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr30-ingoing-null-dust -->
**定義の確認**。$\rho=\rho_0/r^2$、$\rho_0>0$ とすると、$T_{vv}=\rho_0/r^2$ で他の座標成分は零です。任意の時間的ベクトル $u$ に対し

$$
T_{\mu\nu}u^\mu u^\nu
=\frac{\rho_0}{r^2}(u^v)^2\ge0,
$$

となり、観測者に負のエネルギー密度を与えません。なお $\rho_0/r^2$ は $r=0$ で発散するので、この直接例は $r>0$ のみで定義します。
<!-- definition-example-end -->

<a id="prop-gr30-vaidya-source"></a>

<!-- formal-statement-start -->
> **命題（球対称入射Vaidya計量の物質源）**  
> $a\in C^2$、$a\ge0$ とし、$r>0$ 上の上記計量を採る。$\Lambda=0$ のEinstein場の方程式を満たす応力テンソルは

$$
\boxed{T_{\mu\nu}=\frac{a'(v)}{8\pi r^2}\,(dv)_\mu(dv)_\nu.}
$$

> したがって $a'(v)\ge0$ なら非負のエネルギーを持つ入射零物質流であり、$a'=0$ の開区間は真空である。
<!-- formal-statement-end -->

### 証明の見取り図

球面を除いた $(v,r)$ の接続を計算し、$f_r$ と $f_{rr}$ の項が相殺することを確かめます。残る $f_v$ の項が質量の流入量に対応します。質量そのもの $a$ とその時間微分 $a'$ を混同しないことが核心です。

<!-- proof-start -->
### 証明

まず $f_v=-a'/r$、$f_r=a/r^2$、$f_{rr}=-2a/r^3$ です。[GR6の曲率成分の計算規約](../GR6/index.md#prop-gr6-coordinate-curvature)で接続係数を計算すると、$(v,r)$ 方向の非零成分は

$$
\Gamma^v_{vv}=\frac{f_r}{2},\qquad
\Gamma^r_{vv}=\frac{ff_r-f_v}{2},\qquad
\Gamma^r_{vr}=\Gamma^r_{rv}=-\frac{f_r}{2}.
$$

たとえば

$$
\begin{aligned}
\Gamma^r_{vv}
&=\frac12 g^{rv}(2\partial_v g_{vv}-\partial_v g_{vv})
+\frac12 g^{rr}(2\partial_v g_{vr}-\partial_r g_{vv})\\
&=\frac12(-f_v)+\frac f2 f_r.
\end{aligned}
$$

角度側には $\Gamma^v_{\vartheta\vartheta}=-r$、$\Gamma^r_{\vartheta\vartheta}=-fr$、$\Gamma^\vartheta_{r\vartheta}=1/r$ があり、$\varphi$ 成分は球面対称性で得ます。$\Gamma^\lambda_{v\lambda}=0$、$\Gamma^\lambda_{r\lambda}=2/r$ であることを先に確認すると、Ricci成分式の $vv$ 成分は

$$
\begin{aligned}
R_{vv}
&=\partial_\lambda\Gamma^\lambda_{vv}
-\partial_v\Gamma^\lambda_{v\lambda}
+\Gamma^\lambda_{vv}\Gamma^\sigma_{\lambda\sigma}
-\Gamma^\sigma_{v\lambda}\Gamma^\lambda_{v\sigma}\\
&=\frac{f_r^2+ff_{rr}}2+\frac{ff_r-f_v}{r}-\frac{f_r^2}2\\
&=-\frac{f_v}{r}+f\left(\frac{f_{rr}}2+\frac{f_r}{r}\right).
\end{aligned}
$$

同じ成分式の $vr,rr$ と球面部分を計算すれば

$$
\begin{aligned}
R_{vr}&=-\frac{f_{rr}}2-\frac{f_r}{r},\qquad R_{rr}=0,\\
R_{\vartheta\vartheta}&=1-f-rf_r,\qquad
R_{\varphi\varphi}=\sin^2\!\vartheta\,R_{\vartheta\vartheta}.
\end{aligned}
$$

実際、$f_{rr}/2+f_r/r=-a/r^3+a/r^3=0$、$1-f-rf_r=a/r-a/r=0$ です。従って

$$
R_{vv}=-\frac{f_v}{r}=\frac{a'}{r^2},
\qquad R_{vr}=R_{rr}=R_{\vartheta\vartheta}=R_{\varphi\varphi}=0.
$$

逆計量に $g^{vv}=0$ を代入して縮約するとスカラー曲率 $R=0$ なので $G_{\mu\nu}=R_{\mu\nu}$ です。[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)の $8\pi$ で割れば表示の $T$ が得られます。$k=-\partial_r$ が零であることは既に確かめているので、$a'\ge0$ で零物質流の定義に一致します。
<!-- proof-end -->

**具体例：一定時間だけ降り注ぐ光**。$L>0$、$a_f>0$ とし、$0\le v\le L$ で $s=v/L$、$h(s)=10s^3-15s^4+6s^5$、その外では $a=0$（$v\le0$）、$a=a_f$（$v\ge L$）とします。$h(0)=0$、$h(1)=1$ に加え、$h'$ と $h''$ が両端で零なので全域で $a\in C^2$ です。$0<v<L$ では

$$
a'(v)=\frac{30a_f}{L}s^2(1-s)^2>0,
\qquad T_{vv}=\frac{15a_f}{4\pi Lr^2}s^2(1-s)^2>0.
$$

高階導関数まで滑らかにする近似も取れますが、曲率計算に必要な二階までの接続は上の多項式で満たします。質量増加中は物質があり、前後は真空です。

## 3. 厚みを零へ近付け、光殻を接合する

厚み $L$ の入射流を $L\downarrow0$ へ縮めます。この極限をそのまま滑らかな時空として扱うことはできません。$a(v)$ に跳びができ、計量の $g_{vv}$ 成分も跳ぶからです。それでも**殻に沿った距離**と**曲率が集中する強さ**は明確に比較できます。

殻の通過時刻を $v=0$、形成後のSchwarzschild半径を $a_f>0$ とします。Heaviside階段関数 $H(v)$ は $v<0$ で0、$v>0$ で1とし、$v=0$ の値は区間を接合する際には使用しません。$a(v)=a_fH(v)$ の二つの開領域を、それぞれ平坦領域と質量 $m_f=a_f/2$ の真空領域として扱います。

<a id="def-gr30-null-shell-collapse"></a>

<!-- formal-statement-start -->
> **定義（入射薄光殻の球対称崩壊模型）**  
> $a_f>0$ とし、$v<0$ の平坦な球対称領域と、$v>0$ のSchwarzschild入射EF領域を、同じ面積半径 $r>0$ を持つ零超曲面 $\mathcal N=\{v=0,r>0\}$ に沿って接合した時空を入射薄光殻模型という。各側の計量は

$$
\boxed{ds^2=\begin{cases}
-dv^2+2\,dv\,dr+r^2d\Omega^2,&v<0,\\
-(1-a_f/r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,&v>0.
\end{cases}}
$$

> 殻では各側からの誘導計量を一致させ、薄殻の物質源は非負の滑らかな入射Vaidya流の分布極限で定める。$r=0$ に到達した後の特異境界は接合面 $\mathcal N$ に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr30-null-shell-collapse -->
**定義の確認**。$v=0$ 上の接ベクトルは $\partial_r,\partial_\vartheta,\partial_\varphi$ で、$dv=0$ です。両側の計量を $\mathcal N$ に引き戻すと

$$
q=r^2(d\vartheta^2+\sin^2\!\vartheta\,d\varphi^2)
$$

です。$q(\partial_r,\cdot)=0$ なので誘導計量は退化しています。これは殻が**零超曲面**であることと整合します。$g_{vv}$ 自体は両側で一致しないので、時間的殻に使う非退化な誘導計量の接合条件をそのまま流用してはいけません。
<!-- definition-example-end -->

<a id="prop-gr30-shell-source"></a>

<!-- formal-statement-start -->
> **命題（薄光殻の面上応力と真空接合）**  
> $a_f>0$ に対し、非減少な $C^2$ 級関数 $a_L(v)$ が $v\le0$ で0、$v\ge L$ で $a_f$、$0\le a_L\le a_f$ を満たすとする。$L\downarrow0$ とすると、固定した $r>0$ で入射流の応力は分布の意味で

$$
\boxed{T_{vv}\longrightarrow\frac{a_f}{8\pi r^2}\,\delta(v)
=\frac{m_f}{4\pi r^2}\,\delta(v)}
$$

> となる。他成分は零のままであり、殻の両側は真空である。この分布は入射薄光殻模型の物質源を表す。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな模型の $T_{vv}=a_L'/(8\pi r^2)$ を先に求めてあるので、殻に集中する積分量だけを残します。薄くなるから質量が消えるのではなく、**幅と高さの積**として $a_f$ が残ります。

<!-- proof-start -->
### 証明

上の[入射Vaidya計量の物質源](#prop-gr30-vaidya-source)から、$a_L'$ の台は $[0,L]$ に含まれ、$a_L'\ge0$ です。固定した $r>0$ と、滑らかでコンパクトな台を持つ試験関数 $\psi(v)$ を取り、積分すると

$$
\int_{\mathbb R}T_{vv}^{(L)}(v,r)\psi(v)\,dv
=\frac1{8\pi r^2}\int_0^L a_L'(v)\psi(v)\,dv.
$$

ここで $a_L'$ を積分すれば原始関数 $a_L$ の端点差になるので、$\int_0^L a_L'\,dv=a_L(L)-a_L(0)=a_f$ です。さらに平均値のずれを評価すると

$$
\begin{aligned}
\left|\int_0^L a_L'(v)[\psi(v)-\psi(0)]\,dv\right|
&\le\sup_{0\le v\le L}|\psi(v)-\psi(0)|\int_0^L a_L'(v)\,dv\\
&=a_f\sup_{0\le v\le L}|\psi(v)-\psi(0)|\longrightarrow0.
\end{aligned}
$$

ゆえに $T_{vv}^{(L)}$ と試験関数の積分は $(a_f/8\pi r^2)\delta(v)$ の作用へ収束します。$v<0$ と $v>0$ の内部では $a_L'$ が零であり、[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)の物質源も零です。誘導計量が一致することは定義の確認で計算しました。ここで主張する分布の極限は固定した $r>0$ 上のもので、$r=0$ の特異点を正則に接合したという意味ではありません。
<!-- proof-end -->

**接合の意味と限界**。光殻のエネルギーは $v=0$ に集中します。殻上の係数 $m_f/(4\pi r^2)$ は光の流れに沿う面積減衰です。面積 $4\pi r^2$ を掛ければ $m_f$ になり、殻の全質量パラメータと整合します。ただし $v$ を別の座標へ再規格化すれば $\delta(v)$ も変わるので、この係数を座標不変な「静止面密度」と呼ぶことはできません。零殻に静止系は存在しません。

なお、誘導計量 $q$ の一致だけで殻の応力まで決まるわけではありません。ここでは滑らかな場の方程式を先に確認し、その分布極限も計算したことが要点です。物質が厚さを持つ場合の詳細な境界運動や、時間的な星表面の圧力との接合問題まではこの光殻模型からは導けません。

## 4. 光殻が来る前に事象地平線は存在するか

球対称の動径零曲線は $d\Omega=0$、$ds^2=0$ を満たします。$dv=0$ の入射光線と異なる出射系では $dv>0$ と置き、計量から

$$
0=-f\,dv^2+2\,dv\,dr,
\qquad\frac{dr}{dv}=\frac{f(v,r)}2
$$

を得ます。[GR26の入射・出射零光線の区別](../GR26/index.md#prop-gr26-radial-null-generators)を使い、未来向きのうち外側で半径が増すものを出射系として連続的に追います。薄殻を横切ると $f$ は跳びますが、**面積半径 $r$ は連続**です。光線は接合の前後で傾きだけを変えます。

<a id="prop-gr30-collapse-event-horizon"></a>

<!-- formal-statement-start -->
> **命題（薄光殻崩壊で形成される未来事象地平線）**  
> [入射薄光殻模型](#def-gr30-null-shell-collapse)の $a_f>0$ に対し、$v<0$ 側に正則なMinkowski中心 $r=0$ があり、$v>0$ 側はSchwarzschild未来内部と漸近平坦外部を持つとする。未来零無限遠への脱出境界は、各球面軌道について

$$
\boxed{r_E(v)=\begin{cases}
a_f+v/2,&-2a_f\le v\le0,\\
a_f,&v\ge0
\end{cases}}
$$

> にある。地平線の最初の点は平坦領域の中心 $v=-2a_f,r=0$ である。$v<-2a_f$ に正の半径の地平線断面はない。
<!-- formal-statement-end -->

### 証明の見取り図

形成後の境界は $r=a_f$ の出射零線です。この線を殻との交点 $(v,r)=(0,a_f)$ から過去へ追うと、平坦側での傾きは $1/2$ なので直線になります。さらに各点から**最大に外向きに進む因果曲線**が殻に着く半径を比較し、この直線が本当に脱出可能領域の境界であることを証明します。

<!-- proof-start -->
### 証明

$v>0$ のSchwarzschild側では、$r=a_f$ は $dr/dv=(1-a_f/r)/2=0$ の解です。$r_0>a_f$ からの出射光線は正の下界を持つ増加速度で $r\to\infty$ へ向かい、$0<r_0<a_f$ では [GR26の内部の因果的半径減少](../GR26/index.md#prop-gr26-interior-causality)により脱出できません。よって将来の境界は $r=a_f$ です。

殻への接続点は $(0,a_f)$ です。$v<0$ の平坦側では $f=1$、出射零線は $r'(v)=1/2$ だから

$$
r(v)-r(0)=\int_0^v\frac12\,ds=\frac v2,
\qquad r(v)=a_f+\frac v2.
$$

$r=0$ となるのは $v=-2a_f$ です。中心を越して負の半径へ形式的に延長してはならないので、ここが球面を持つ地平線の始点です。

最後に、単に零線を描いただけでないことを確認します。$dv>0$ の未来向き因果曲線に対し $ds^2\le0$ なので、角度方向の変化を含め

$$
-f+2\frac{dr}{dv}
+r^2\left[\left(\frac{d\vartheta}{dv}\right)^2
+\sin^2\!\vartheta\left(\frac{d\varphi}{dv}\right)^2\right]\le0.
$$

したがって $dr/dv\le f/2$ で、外向き動径零線が同じ始点からの因果曲線の最外側を進みます。$v<0$ の初期点 $(v_0,r_0)$ が $v=0$ の殻に着くときの最大半径は

$$
r_{\rm cross}=r_0+\frac{0-v_0}{2}=r_0-\frac{v_0}{2}.
$$

$r_{\rm cross}>a_f$ ならその出射零線がSchwarzschild外部に入り無限遠へ達します。$r_{\rm cross}<a_f$ なら、それより内側を進む因果曲線も外へ逃げられません。等号の場合は地平線上です。この等号を $r_0$ について解くと $r_0=a_f+v_0/2$ です。$v_0<-2a_f$ では右辺が負になり、すべての $r_0>0$ から脱出できます。よってこの曲線こそ [未来事象地平線の定義](../GR29/index.md#def-gr29-event-horizon)に対応する境界です。
<!-- proof-end -->

**数値を入れた直接例**。$a_f=6$ とすると地平線は $v=-12$ の中心から始まり、殻が来る $v=0$ までは $r_E(v)=6+v/2$ です。$v=-8$ では $r_E=2$、たとえば $r_0=3$ の出射光は殻へ $r_{\rm cross}=3+4=7>6$ で着くため脱出できます。$r_0=1$ からは $r_{\rm cross}=5<6$ で着き、脱出できません。どちらも出発した場所の局所計量は**完全に平坦**です。

## 5. 局所的な捕獲面と地平線を混同しない

[GR29の零法線の膨張率](../GR29/index.md#def-gr29-null-expansion)は未来向きの外向き $\ell$ と内向き $n$ の面積増減を測ります。両側の滑らかな領域では

$$
\ell=\partial_v+\frac f2\partial_r,\qquad
n=-\partial_r,\qquad g(\ell,n)=-1.
$$

各ベクトルが零であることは、$g(\ell,\ell)=-f+f=0$、$g(n,n)=g_{rr}=0$ と直接確認できます。$r>0$ の丸い二球面に対する[球対称二球面の膨張率](../GR29/index.md#prop-gr29-spherical-expansion)へ代入すると

$$
\theta_{(\ell)}=\frac{2\ell(r)}r=\frac fr,
\qquad\theta_{(n)}=\frac{2n(r)}r=-\frac2r.
$$

<a id="prop-gr30-trapped-vs-event"></a>

<!-- formal-statement-start -->
> **命題（薄光殻模型でのMOTSと事象地平線の差）**  
> [入射薄光殻模型](#def-gr30-null-shell-collapse)の $r>0$ にある丸い対称二球面を考える。$v<0$ では $\theta_{(\ell)}>0$、$\theta_{(n)}<0$ で未来捕獲面もMOTSもない。$v>0$ では $r=a_f$ がMOTS、$0<r<a_f$ は未来捕獲面、$r>a_f$ はそのいずれでもない。ところが未来事象地平線は $-2a_f<v<0$ の平坦領域にも存在する。殻 $v=0$ 上の膨張率は滑らかな両側の式を無条件に同一視して定義しない。
<!-- formal-statement-end -->

### 証明の見取り図

平坦側で $f=1$、通過後は $f=1-a_f/r$ を膨張率へ代入すれば、球面の局所的な状態を分類できます。一方、事象地平線は将来までの因果到達から決まるため、先の命題で得た平坦領域の直線が残ります。

<!-- proof-start -->
### 証明

$v<0$ では $f=1$ なので $\theta_{(\ell)}=1/r>0$、$\theta_{(n)}=-2/r<0$ です。したがって [捕獲面とMOTSの定義](../GR29/index.md#def-gr29-trapped-apparent)のいずれの符号条件にも該当しません。

$v>0$ では $f=(r-a_f)/r$ ですから

$$
\theta_{(\ell)}=\frac{r-a_f}{r^2},\qquad
\theta_{(n)}=-\frac2r.
$$

$r=a_f$ で外向きは零、内向きは負なのでMOTS、$0<r<a_f$ では両方負で捕獲面、$r>a_f$ では外向きが正です。[薄殻模型の未来事象地平線](#prop-gr30-collapse-event-horizon)は $-2a_f<v<0$ で正半径を持ちますが、この区間は平坦であり上の分類にMOTSはありません。最後に、$v=0$ は応力が分布的に集中して通常の滑らかな計量の仮定を満たさないので、片側の値を貼り合わせて一意の膨張率だと断定しません。
<!-- proof-end -->

**薄殻と有限厚の違い**。前節の滑らかな $a_L(v)$ なら、質量が正の区間で丸いMOTSは $r=a_L(v)$ です。$a_L'>0$ ならその管の法線ノルムは [GR29のVaidya地平線の分離](../GR29/index.md#prop-gr29-vaidya-separation)と同じ計算で $-2a_L'<0$、すなわち管は空間的です。薄殻極限では物質の通過層自体に微分幾何の滑らかな式をそのまま適用せず、殻の両側の結果と分布応力を区別します。

## 6. 永遠のSchwarzschild時空と形成された時空

計量の $v>0$ 側がSchwarzschildと同じでも、時空全体が [GR27の最大解析延長](../GR27/index.md#def-gr27-analytic-extension) と一致するわけではありません。永遠の真空解は過去の白色穴領域ともう一つの漸近平坦外部を含みます。ここで作った時空は過去の平坦領域と、そこを入射する殻を持ちます。したがって、過去に白色穴の領域を付け足したり、過去の事象地平線が最初から存在すると扱ったりすることはできません。

次の三つの確認を区別します。

1. **局所計量**：$v<0$ は平坦、$v>0$ はSchwarzschildの入射領域で、殻を除いて滑らかです。
2. **物質の存在**：有限厚なら $a_L'>0$ の場所に入射零物質があり、薄殻なら $v=0$ に分布として集中します。
3. **大域因果構造**：[未来事象地平線](#prop-gr30-collapse-event-horizon)は殻の到着より早い平坦領域で生成し、未来の振る舞いに依存します。

これは球対称崩壊の**可解な理想化**です。物質が必ずこのように集まり、すべての星が同じ形で崩壊するという一般定理ではありません。また $r=0$ での特異的な境界を滑らかに扱った証明でもありません。時間的な星表面の運動、圧力、潮汐、零殻と異なる接合条件には別の模型が必要です。

## 7. 演習：殻の接合から脱出判定まで

### Level A：部品となる条件を検算する

<a id="ex-gr30-a01"></a>
#### GR30-A01 平坦な入射座標
- Level: A

$a=0$ の計量 $ds^2=-dv^2+2dvdr+r^2d\Omega^2$ に $t=v-r$ を代入し、平坦な球座標計量となることを示せ。また $v=\mathrm{const}$ が零超曲面であることを逆計量から判定せよ。

<!-- solution-start -->
**詳細解答。** $dt=dv-dr$ より $dv=dt+dr$ なので

$$
-dv^2+2dvdr=-(dt+dr)^2+2(dt+dr)dr=-dt^2+dr^2.
$$

したがって $ds^2=-dt^2+dr^2+r^2d\Omega^2$ です。$(v,r)$ の行列は $\left(\begin{smallmatrix}-1&1\\1&0\end{smallmatrix}\right)$、逆行列は $\left(\begin{smallmatrix}0&1\\1&1\end{smallmatrix}\right)$ です。$v=\mathrm{const}$ の法線は $dv$ で、$g^{-1}(dv,dv)=g^{vv}=0$ だから零超曲面です。
<!-- solution-end -->

<a id="ex-gr30-a02"></a>
#### GR30-A02 殻の誘導計量
- Level: A

$v=0$ をパラメータ $(r,\vartheta,\varphi)$ で表示する。殻の前後で $f$ の値が異なるにもかかわらず、誘導計量が一致することを示し、退化方向を求めよ。

<!-- solution-start -->
**詳細解答。** 接合面への引き戻しでは接ベクトルに $dv=0$ です。従って $-f\,dv^2$ と $2dvdr$ は両方消え、

$$
q_{ij}d\sigma^i d\sigma^j=r^2d\vartheta^2+r^2\sin^2\!\vartheta\,d\varphi^2
$$

となります。これは $f=1$ でも $f=1-a_f/r$ でも同一です。$(r,\vartheta,\varphi)$ の行列は $\operatorname{diag}(0,r^2,r^2\sin^2\vartheta)$ なので $\partial_r$ が退化方向です。$g_{vv}$ の跳びを零と主張したわけではありません。
<!-- solution-end -->

<a id="ex-gr30-a03"></a>
#### GR30-A03 入射零物質のエネルギー符号
- Level: A

$a'(v)=b>0$ が一定の小区間、$r=r_0>0$ における $T_{\mu\nu}$ を計算し、任意の時間的 $u$ に対する $T_{\mu\nu}u^\mu u^\nu$ の符号を判定せよ。

<!-- solution-start -->
**詳細解答。** [入射Vaidya計量の物質源](#prop-gr30-vaidya-source)より $T_{vv}=b/(8\pi r_0^2)>0$ で、他成分は零です。だから

$$
T_{\mu\nu}u^\mu u^\nu=\frac{b}{8\pi r_0^2}(u^v)^2\ge0.
$$

これは $b>0$ と $r_0>0$ に依存します。$a'<0$ なら同じ計算の符号は逆で、非負の入射物質模型ではなくなります。
<!-- solution-end -->

<a id="ex-gr30-a04"></a>
#### GR30-A04 殻に届く半径
- Level: A

平坦領域の $(v_0,r_0)=(-6,4)$ から出る動径出射零線の方程式と、$v=0$ での半径を求めよ。$a_f=8$ なら殻を通った後で脱出できるか。

<!-- solution-start -->
**詳細解答。** 平坦側の零条件は $r'=1/2$ です。$v_0=-6$、$r(-6)=4$ を初期条件に積分すると

$$
r(v)=4+\frac{v+6}{2},\qquad r(0)=4+3=7.
$$

$7<8=a_f$ だから殻の後はSchwarzschildの未来内部に入り、[内部の因果的半径減少](../GR26/index.md#prop-gr26-interior-causality)のため未来零無限遠へ達しません。
<!-- solution-end -->

<a id="ex-gr30-a05"></a>
#### GR30-A05 捕獲面の符号
- Level: A

殻の後で $a_f=4$ とする。$r=2,4,8$ の丸い二球面について $\theta_{(\ell)}$、$\theta_{(n)}$ を計算し、未来捕獲面・MOTS・どちらでもない面へ分類せよ。

<!-- solution-start -->
**詳細解答。** [球対称二球面の膨張率](../GR29/index.md#prop-gr29-spherical-expansion)と本章の零法線から

$$
\theta_{(\ell)}=\frac{r-4}{r^2},\qquad \theta_{(n)}=-\frac2r.
$$

$r=2$ では $(-1/2,-1)$ で両方負だから捕獲面、$r=4$ では $(0,-1/2)$ でMOTS、$r=8$ では $(1/16,-1/4)$ でどちらでもありません。これは $v>0$ の滑らかな真空側の判定であり、殻自身の値は含みません。
<!-- solution-end -->

### Level B：物質・接合・因果を結び付ける

<a id="ex-gr30-b01"></a>
#### GR30-B01 Ricci成分から物質源へ
- Level: B

$f=1-a(v)/r$ に対し、$R_{vv}=-f_v/r+f(f_{rr}/2+f_r/r)$、$R_{vr}=-f_{rr}/2-f_r/r$、$R_{\vartheta\vartheta}=1-f-rf_r$ を使い、非零のEinsteinテンソル成分と応力テンソルを導け。$a$ が定数ならどうなるか。

<!-- solution-start -->
**詳細解答。** 順に微分すると

$$
f_v=-\frac{a'}r,\quad f_r=\frac a{r^2},\quad f_{rr}=-\frac{2a}{r^3}.
$$

したがって

$$
\frac{f_{rr}}2+\frac{f_r}r=-\frac a{r^3}+\frac a{r^3}=0,
\qquad 1-f-rf_r=\frac ar-\frac ar=0.
$$

$R_{vv}=-f_v/r=a'/r^2$ 以外のRicci成分は零です。$g^{vv}=0$ なので $R=g^{\mu\nu}R_{\mu\nu}=0$、従って $G_{vv}=a'/r^2$ のみが非零です。[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)から $T_{vv}=a'/(8\pi r^2)$ です。$a$ が定数なら $a'=0$ で、物質源は全成分零になります。
<!-- solution-end -->

<a id="ex-gr30-b02"></a>
#### GR30-B02 二人の観測開始位置と殻の交点
- Level: B

$a_f=4$、初期の平坦領域で $v_0=-4$ とする。$r_0=1,2,3$ から出る出射動径零線が殻に到達する半径をそれぞれ求め、脱出可能性を分類せよ。等号となる場合の軌道も続けて述べよ。

<!-- solution-start -->
**詳細解答。** 平坦側で $r'=1/2$ だから殻への到達半径は

$$
r_{\rm cross}=r_0-\frac{v_0}2=r_0+2.
$$

$r_0=1$ なら3で $a_f$ 未満となり内部へ落下します。$r_0=2$ なら4で等号、[地平線の光線](#prop-gr30-collapse-event-horizon)と一致して以後 $r(v)=4$ のままです。$r_0=3$ なら5で $a_f$ より大きく、殻の後で $r'>0$ が維持され無限遠へ向かいます。初期の計量が三点とも平坦であることは脱出可能性の一致を意味しません。
<!-- solution-end -->

<a id="ex-gr30-b03"></a>
#### GR30-B03 滑らかな殻を薄くする
- Level: B

$a_f,L>0$、$s=v/L$ とし、$0<v<L$ で $a_L=a_f(10s^3-15s^4+6s^5)$、その外側で0と $a_f$ に固定する。$a_L'$ と $a_L''$ の端点値、$a_L'$ の符号、固定した $r>0$ に対する $\int T_{vv}\,dv$ を求め、$L\downarrow0$ の極限を説明せよ。

<!-- solution-start -->
**詳細解答。** 連鎖律 $ds/dv=1/L$ から

$$
a_L'(v)=\frac{a_f}L(30s^2-60s^3+30s^4)
=\frac{30a_f}L s^2(1-s)^2.
$$

$0<s<1$ では正、$s=0,1$ では零です。さらに $a_L''=(60a_f/L^2)s(1-s)(1-2s)$ なので両端で二階微分まで零です。外側の定数関数と $C^2$ 級でつながります。積分は

$$
\int_{-\infty}^{\infty}T_{vv}\,dv
=\frac1{8\pi r^2}\int_0^L a_L'(v)\,dv
=\frac{a_L(L)-a_L(0)}{8\pi r^2}
=\frac{a_f}{8\pi r^2}.
$$

幅が短くても積分量は一定なので、試験関数で測れば係数 $a_f/(8\pi r^2)$ の $\delta(v)$ になります。単に $a_L'(v)\to0$ と点ごとに述べるだけでは集中した質量を見落とします。
<!-- solution-end -->

<a id="ex-gr30-b04"></a>
#### GR30-B04 出射光線が脱出境界を作る理由
- Level: B

球対称EF計量で、$dv>0$ の未来向き因果曲線が $dr/dv\le f/2$ を満たすことを示せ。平坦側で任意の角運動をする曲線の殻への到達半径が、動径出射零線より大きくならない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $ds^2\le0$ を $dv^2>0$ で割ると

$$
-f+2\frac{dr}{dv}
+r^2\left[\left(\frac{d\vartheta}{dv}\right)^2+\sin^2\vartheta\left(\frac{d\varphi}{dv}\right)^2\right]\le0.
$$

角度の二乗項は非負なので

$$
\frac{dr}{dv}\le\frac f2-\frac{r^2}{2}\left[\left(\frac{d\vartheta}{dv}\right)^2+\sin^2\vartheta\left(\frac{d\varphi}{dv}\right)^2\right]\le\frac f2.
$$

平坦側では $f=1$ であり、$v_0$ から0まで積分すると $r(0)-r_0\le-v_0/2$ です。等号は角度変化が零で零条件を飽和する動径出射零線が達成します。$dv=0$ の入射零線はそもそも半径を減らす向きなので、脱出をより容易にはしません。
<!-- solution-end -->

### Level C：形成過程を一つの時空として再構成する

<a id="ex-gr30-c01"></a>
#### GR30-C01 平坦領域から形成されたブラックホールへ
- Level: C

殻 $v=0$ の後に半径 $a_f=6$ のSchwarzschild領域ができる薄光殻模型を考える。次を求め、局所的な幾何と未来の脱出条件を区別せよ。

1. 形成前後の計量と、$v=0$ 上の誘導計量を求める。
2. 薄殻の $T_{vv}$ を分布として求め、殻の前後で物質がないことを確認する。
3. 未来事象地平線が平坦領域で始まる時刻と、その $v=-8$ の断面半径を求める。
4. $(v,r)=(-8,1),(-8,2),(-8,3)$ の出射光線の行き先を分類する。
5. $v=-8$ の地平線断面にMOTSがあるか、また $v>0$ のMOTSはどこかを判定する。

<!-- solution-start -->
**詳細解答。**

**（1）** $v<0$ では $f=1$、$v>0$ では $f=1-6/r$ なので

$$
ds^2=\begin{cases}
-dv^2+2dvdr+r^2d\Omega^2,&v<0,\\
-(1-6/r)dv^2+2dvdr+r^2d\Omega^2,&v>0.
\end{cases}
$$

$v=0$ に引き戻せば $dv=0$ だから両側とも $q=r^2d\Omega^2$ です。退化方向は $\partial_r$ です。

**（2）** $a(v)=6H(v)$ の分布微分は $a'=6\delta(v)$ です。[薄光殻の応力](#prop-gr30-shell-source)から

$$
T_{vv}=\frac{6}{8\pi r^2}\delta(v)=\frac{3}{4\pi r^2}\delta(v).
$$

$v\ne0$ では分布の台がなく $T_{\mu\nu}=0$ です。質量 $m_f=3$ なので係数 $m_f/(4\pi r^2)$ とも一致します。

**（3）** [形成された地平線](#prop-gr30-collapse-event-horizon)は $r_E=6+v/2$（$-12\le v\le0$）なので、中心で始まる時刻は $v=-12$ です。$v=-8$ の半径は $r_E=6-4=2$ です。

**（4）** 平坦側の出射零線は $r'=1/2$ なので、殻に着く半径は $r_{\rm cross}=r_0+4$ です。出発半径が1,2,3なら到着半径はそれぞれ5,6,7です。$5<6$ は未来内部へ入り脱出不能、$6=6$ は地平線上を進み、$7>6$ は外部へ進んで未来零無限遠へ到達します。

**（5）** $v=-8<0$ では $f=1$ なので $\theta_{(\ell)}=1/r>0$、$\theta_{(n)}=-2/r<0$ です。したがって事象地平線の断面 $r=2$ にもMOTSはありません。$v>0$ では $\theta_{(\ell)}=(r-6)/r^2$、$\theta_{(n)}=-2/r$ なので $r=6$ がMOTSです。地平線は大域因果、MOTSは局所的膨張率から決まるという違いを使いました。
<!-- solution-end -->

## 8. まとめ：形成されたブラックホールをどう判定するか

薄光殻崩壊では、**物質の場所**は $T_{vv}\propto\delta(v)$、**丸いMOTSの場所**は通過後の $r=a_f$、**未来事象地平線の場所**は通過前も含む $r_E(v)$ です。これは互いに異なる入力から決まり、全部を「Schwarzschild半径が現れた」とまとめてはいけません。

後続では、真空Schwarzschildとは異なる物質源や対称性を持つ解を調べます。今回の接合の考え方は、局所的な解を作ることと、物理的な物質源・全体の因果構造を確認することを結ぶ出発点です。
