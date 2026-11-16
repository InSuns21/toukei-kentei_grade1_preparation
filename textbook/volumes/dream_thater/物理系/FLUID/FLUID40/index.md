# FLUID40 壁乱流の速度分布をどう整理するか

[FLUID38 の Reynolds 平均方程式](../FLUID38/index.md#thm-fluid38-rans)は、平均速度に加えて速度変動の共分散を必要とする。[FLUID39 のエネルギー収支](../FLUID39/index.md#prop-fluid39-tke-budget)は乱流の生成と散逸を整理した。それでも、壁から 1 mm 離れた場所の平均速度を予測するには、壁が与える剪断応力と距離をどの単位で比較するかを決めなければならない。

本講の中心問いは、**壁から測った平均速度を、どの無次元量で整理し、どこまで共通の形を期待できるか**である。壁単位を定め、平面水路で厳密に証明できる剪断応力の分布と、混合長という経験的な仮説から得る対数則を区別する。最後に合成模型の Python 実験で「数値的に計算できる」と「実乱流を測った」を混同しない練習をする。

## 0. 幾何・物性・平均の仮定を固定する

上下を平行な**滑らかな静止壁**で挟んだ、十分長い平面水路を考える。下壁を $y=0$、中心面を $y=h$、上壁を $y=2h$ とする。$x$ は流れ方向、$z$ はスパン方向である。一定密度 $\rho>0$ [kg/m$^3$]、一定動粘度 $\nu>0$ [m$^2$/s]、粘度 $\mu=\rho\nu$ [Pa s] の非圧縮 Newton 流体を仮定する。

統計的に定常で $x,z$ に一様な平均速度を $\boldsymbol U=(U(y),0,0)$、平均圧力を $P(x)$ とし、平均圧力勾配を一定の $dP/dx=-G<0$（$G>0$ [Pa/m]）とする。上半分は対称なので、$0\le y\le h$ を計算する。集合平均と微分の交換、および必要な速度変動の二次モーメントが存在する十分な滑らかさ・可積分性を仮定する。実現ごとに壁で [粘着条件](../../CTM/CTM15/index.md#def-ctm15-no-slip)と[不透過条件](../../CTM/CTM15/index.md#def-ctm15-impermeability)が成り立つ。

[Reynolds 分解](../FLUID37/index.md#def-fluid37-reynolds-decomposition)による流れ方向の変動を $u'=u-U$、壁垂直方向の変動を $v'=v$ と書く。これらの変動から [FLUID38 の Reynolds 共分散](../FLUID38/index.md#def-fluid38-reynolds-stress)を作る。ここで小文字の $u',v'$ のプライムは**変動**を表す。一方、以下で使う大文字の $U'(y)=dU/dy$ は平均速度 $U$ を壁垂直座標 $y$ で微分した**導関数**であり、同じプライムでも意味が異なる。圧力の略記 $P_x=\partial P/\partial x=dP/dx$ は、$P$ が $x$ だけの関数である本水路で使用する。

$$
R_{xy}(y)=\overline{u'v'}.
$$

$R_{xy}$ の単位は m$^2$/s$^2$ で、負になりうる。**流束 $\rho R_{xy}$ と、応力として書く $-\rho R_{xy}$ は逆符号**である。

ここで導く水路の厳密な結論は、**平行水路・定常・十分発達した平均流**に限る。外部境界層や剥離流へ、途中の等式をそのまま当てはめない。

## 1. 壁の剪断力を速度と長さの単位にする

壁に近づくほど速度が小さくなるという観察を、まず単位の問題に変える。下壁で $U(0)=0$ かつ $U'(0)>0$ を仮定する。壁で流体が受ける剪断応力の大きさは $\tau_w=\mu U'(0)$ [Pa] である。$\tau_w/\rho$ の次元は速度の二乗なので、その平方根を速度単位に選ぶ。粘性が速度を壁から拡散させる長さは $\nu$ をその速度で割ったものとなる。

<a id="def-fluid40-wall-units"></a>

<!-- formal-statement-start -->
> **定義（摩擦速度と壁単位）**  
> 第0節の滑面水路で $\tau_w=\rho\nu U'(0)>0$ とする。摩擦速度 $u_\tau$、粘性長さ $\ell_\nu$、壁座標 $y^+$、壁速度 $U^+$、摩擦 Reynolds 数 $Re_\tau$ を次で定義する。

$$
u_\tau=\sqrt{\frac{\tau_w}{\rho}},\qquad
\ell_\nu=\frac{\nu}{u_\tau},\qquad
y^+=\frac{y}{\ell_\nu}=\frac{yu_\tau}{\nu},
$$

$$
U^+=\frac{U}{u_\tau},\qquad
Re_\tau=\frac{h}{\ell_\nu}=\frac{hu_\tau}{\nu}.
$$

> $u_\tau$ は壁の剪断力で決めた速度尺度であって、壁そのものの移動速度ではない。$y^+$、$U^+$、$Re_\tau$ は無次元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid40-wall-units -->
**定義の確認**：水の例として $\rho=1000$ kg/m$^3$、$\nu=10^{-6}$ m$^2$/s、$\tau_w=2.5$ Pa、$h=0.02$ m とする。速度と長さの単位を順に確かめると

$$
u_\tau=\sqrt{\frac{2.5}{1000}}=0.05\ {\rm m/s},\qquad
\ell_\nu=\frac{10^{-6}}{0.05}=2\times10^{-5}\ {\rm m}.
$$

従って $h=0.02$ m、$y=0.10$ mm $=10^{-4}$ m に対し

$$
Re_\tau=\frac{0.02}{2\times10^{-5}}=1000,\qquad
y^+=\frac{10^{-4}}{2\times10^{-5}}=5.
$$

もしそこで $U=0.20$ m/s と測ったなら $U^+=0.20/0.05=4$ であり、$u_\tau=0.05$ m/s と混同しない。さらに壁の勾配を定義に戻して $U'(0)=\tau_w/(\rho\nu)=2.5/(1000\times10^{-6})=2500$ s$^{-1}$ と検算できる。
<!-- definition-example-end -->

同じ $y=0.1$ mm でも $\nu$ と $u_\tau$ が異なれば壁への近さは変わる。距離を m だけで比較するより、$y^+$ で比較する理由がここにある。

### 速度分布の鍵は二種類の剪断応力の和

粘性応力だけなら $\rho\nu U'$ で速度勾配を直接決められる。しかし [Reynolds 応力](../FLUID38/index.md#def-fluid38-reynolds-stress)は、乱流変動による流れ方向運動量の壁垂直方向への輸送を追加する。この二つの寄与を、同じ「応力」の符号でまとめる。流束の添字 $J_{yx}$ は「$+y$ 方向に輸送される $x$ 方向運動量」を表し、ここでの剪断応力とは逆符号で数える。

<a id="def-fluid40-total-shear"></a>

<!-- formal-statement-start -->
> **定義（粘性・乱流・全剪断応力）**  
> 第0節の水路で、下壁から上向きに測った位置 $y$ における剪断応力を

$$
\tau_V(y)=\rho\nu U'(y),\qquad
\tau_R(y)=-\rho R_{xy}(y),\qquad
\tau_{\mathrm{tot}}=\tau_V+\tau_R
$$

> と定める。単位はいずれも Pa とし、$U'>0$、$R_{xy}<0$ ならそれぞれ正となる。一方、上向きの流れ方向運動量の流束は $J_{yx}=-\tau_{\mathrm{tot}}$ である（圧力勾配は別の駆動項）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid40-total-shear -->
**定義の確認**：ある位置で $\rho=1000$ kg/m$^3$、$\nu U'=0.0005$ m$^2$/s$^2$、$R_{xy}=-0.0010$ m$^2$/s$^2$ なら、$\tau_V=0.5$ Pa、$\tau_R=1.0$ Pa、$\tau_{\mathrm{tot}}=1.5$ Pa。対応する運動量流束は $J_{yx}=-1.5$ Pa である。$\tau_R$ の正負は $R_{xy}$ の符号を反転して判定する。
<!-- definition-example-end -->

<a id="prop-fluid40-channel-stress"></a>

<!-- formal-statement-start -->
> **命題（平面水路の全剪断応力は壁から線形に減る）**  
> 第0節の定常・十分発達した一定密度の水路平均流について、中心面 $y=h$ で $U'(h)=0$ および $R_{xy}(h)=0$ が成立するなら

$$
\tau_{\mathrm{tot}}(y)=G(h-y),\qquad
\tau_w=Gh,\qquad u_\tau^2=\frac{Gh}{\rho}.
$$

> 壁単位に直すと、$0\le y^+\le Re_\tau$ で

$$
\frac{dU^+}{dy^+}-\frac{R_{xy}}{u_\tau^2}
=1-\frac{y^+}{Re_\tau}.
$$

> この関係は閉鎖模型の選択に依らない厳密な平均運動量収支である。
<!-- formal-statement-end -->

### 証明の見取り図

[FLUID38 の平均運動量方程式](../FLUID38/index.md#thm-fluid38-rans)を $x$ 成分に限定すると、速度と共分散の導関数が一つの全剪断応力の導関数になる。中心面での対称条件で積分定数を決め、最後に壁単位へ換算する。

<!-- proof-start -->
### 証明

[FLUID38 の RANS 方程式](../FLUID38/index.md#thm-fluid38-rans)は、一定密度で $\partial_tU_i+U_j\partial_jU_i=-\rho^{-1}\partial_iP+\nu\Delta U_i-\partial_jR_{ij}$ となる。第0節では定常、$\partial_xU=\partial_zU=0$、平均壁垂直速度ゼロだから $x$ 成分の移流と時間微分は消える。従って

$$
0=-\frac1\rho\frac{dP}{dx}
+\nu\frac{d^2U}{dy^2}-\frac{dR_{xy}}{dy}
=\frac G\rho+\frac{d}{dy}(\nu U'-R_{xy}).
$$

両辺に $\rho$ を掛けると、[$\tau_{\rm tot}$ の定義](#def-fluid40-total-shear)から

$$
\frac{d\tau_{\mathrm{tot}}}{dy}=-G.
$$

$y$ から中心 $h$ まで積分する。中心面の対称性により $\tau_{\mathrm{tot}}(h)=\rho(\nu U'(h)-R_{xy}(h))=0$ なので

$$
0-\tau_{\mathrm{tot}}(y)=\int_y^h(-G)\,ds=-G(h-y).
$$

よって $\tau_{\mathrm{tot}}(y)=G(h-y)$。各実現の壁条件で $u'(0)=v'(0)=0$ が成立し $R_{xy}(0)=0$ だから、$\tau_{\mathrm{tot}}(0)=\rho\nu U'(0)=\tau_w=Gh$。摩擦速度の定義により $u_\tau^2=\tau_w/\rho=Gh/\rho$ が従う。

次に $y=\nu y^+/u_\tau$、$U=u_\tau U^+$ を微分して

$$
\frac{dU}{dy}=\frac{u_\tau^2}{\nu}\frac{dU^+}{dy^+},
\qquad
\frac{\tau_{\mathrm{tot}}}{\rho u_\tau^2}
=\frac{\nu U'-R_{xy}}{u_\tau^2}
=\frac{dU^+}{dy^+}-\frac{R_{xy}}{u_\tau^2}.
$$

他方、$\tau_{\mathrm{tot}}/(Gh)=(h-y)/h=1-y^+/Re_\tau$。二つを等置すれば最後の式を得る。
<!-- proof-end -->

**具体例**：$Re_\tau=1000$ の水路で $y^+=200$ なら全剪断は壁値の $1-200/1000=0.8$ 倍である。粘性勾配が $dU^+/dy^+=0.15$ なら $-R_{xy}/u_\tau^2=0.65$ でなければならない。壁では $1+0=1$、中心では対称性により $0+0=0$。この三地点を同じ値だとみなす近似は成立しない。

## 2. 壁に限り、線形則は厳密に近づく

壁では流体速度がゼロであっても、摩擦速度はゼロでなくてよい。[$\tau_w>0$ の壁単位](#def-fluid40-wall-units)を使うと、壁での勾配をちょうど 1 に正規化できる。ここから壁に十分近い位置での線形関係を得る。

<a id="prop-fluid40-viscous-asymptote"></a>

<!-- formal-statement-start -->
> **命題（滑面壁での粘性漸近則）**  
> 第0節の滑面水路で $U$ が $y=0$ の右側で微分可能、$U(0)=0$、$\tau_w=\rho\nu U'(0)>0$ なら

$$
\lim_{y^+\downarrow0}\frac{U^+(y^+)}{y^+}=1,
\qquad U^+(y^+)=y^++o(y^+).
$$

> これは壁への極限であって、有限区間のすべての $y^+$ で $U^+=y^+$ が厳密成立するという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

壁における $U'$ を速度と長さの換算式へ代入する。極限は微分の定義そのものであり、乱流の経験則を仮定していない。

<!-- proof-start -->
### 証明

$U(0)=0$ と壁での微分可能性から

$$
\lim_{y\downarrow0}\frac{U(y)-U(0)}y=U'(0).
$$

[$u_\tau^2=\nu U'(0)$](#def-fluid40-wall-units) を用いると

$$
\frac{U^+}{y^+}
=\frac{U/u_\tau}{yu_\tau/\nu}
=\frac{\nu}{u_\tau^2}\frac{U(y)}y
\longrightarrow \frac{\nu U'(0)}{u_\tau^2}=1.
$$

$U^+(y^+)=y^++o(y^+)$ は同じ極限を言い換えたものである。
<!-- proof-end -->

より強い壁近傍の正則性を仮定し、各実現の変動速度が壁で二階まで微分可能で、Taylor 展開の余剰項と積の集合平均を一様に評価できるとする。[無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip)により壁では $u'=v'=w'=0$ であり、壁上で恒等的にゼロの接線成分を $x,z$ で微分すると $\partial_xu'|_{y=0}=\partial_zw'|_{y=0}=0$ となる。平均場も各実現も非圧縮なので、変動速度の発散はゼロである。よって

$$
\partial_xu'+\partial_yv'+\partial_zw'=0
\quad\Longrightarrow\quad
\partial_yv'|_{y=0}=0.
$$

壁からの Taylor 展開を使えば $u',w'=O(y)$、$v'(y)=v'(0)+y\partial_yv'(0)+O(y^2)=O(y^2)$ である。平均に必要な一様評価の下では $R_{xy}=\overline{u'v'}=O(y^3)$ と結論できる。このとき [全剪断の厳密式](#prop-fluid40-channel-stress)の右辺を使って

$$
\frac{dU^+}{dy^+}
=1-\frac{y^+}{Re_\tau}+\frac{R_{xy}}{u_\tau^2}
=1-\frac{y^+}{Re_\tau}+O((y^+)^3),
$$

$$
U^+(y^+)=y^+-\frac{(y^+)^2}{2Re_\tau}+O((y^+)^4)
$$

が従う（$Re_\tau$ を固定した壁近傍での漸近式）。ここで $R_{xy}=O(y^3)$ は速度変動の十分な壁近傍正則性を追加して初めて主張できる。**$y^+\lesssim5$ が粘性底層**という経験的な目安は、この極限定理だけから導かれる普遍的境界ではない。

## 3. 内層・外層で同じ点をどう見るか

小さい $y$ では壁の粘性長さ $\ell_\nu$ が自然だが、水路幅に近い $y$ では半幅 $h$ との比が自然である。同一位置には $y^+$ と $y/h$ の二つの座標がある。後者を $\eta$ と書き、中心速度からの差も無次元化する。

<a id="def-fluid40-inner-outer"></a>

<!-- formal-statement-start -->
> **定義（内層表示と外層速度欠陥）**  
> 第0節の水路で $U_c=U(h)$ とする。内層の速度表示は $U^+(y^+)=U(y)/u_\tau$、外層座標と速度欠陥は

$$
\eta=\frac yh=\frac{y^+}{Re_\tau},
\qquad
F(\eta;Re_\tau)=\frac{U_c-U(h\eta)}{u_\tau}.
$$

> この $F$ は定義上 $F(1;Re_\tau)=0$ であり、$\eta=0$ で有限・対数形という仮定は含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid40-inner-outer -->
**定義の確認**：$Re_\tau=1000$ の水路で $y^+=100$ なら $\eta=100/1000=0.1$。もし $U_c^+=22$、その位置で $U^+=16$ なら $F(0.1;1000)=22-16=6$。$y=h$ では $U=U_c$ だから $F(1;1000)=0$。同じ $\eta=0.1$ でも $Re_\tau=2000$ なら $y^+=200$ であり、$y^+$ と $\eta$ を独立な位置指定として勝手に変えることはできない。
<!-- definition-example-end -->

### 混合長から対数勾配を考える

粘性底層から遠ざかると、[$\tau_R$](#def-fluid40-total-shear) が全剪断の大部分を担う区間が現れうる。[FLUID38 の Prandtl 混合長閉鎖](../FLUID38/index.md#def-fluid38-mixing-length)は、平均剪断から未知の $R_{xy}$ を近似する**経験的関係**である。壁からの距離を混合長の代表尺度とする追加の仮説 $\ell_m=\kappa y$ を採用し、$\kappa>0$ を経験的な無次元係数とする。

<a id="prop-fluid40-log-law"></a>

<!-- formal-statement-start -->
> **命題（混合長仮説からの条件付き対数則）**  
> $0<a<b<h$ の区間で $U'(y)>0$ とし、乱流剪断の経験的な閉鎖式

$$
-R_{xy}=\ell_m^2(U')^2,\qquad \ell_m=\kappa y
$$

> を仮定する。さらに、この区間の**先頭次数の理想化**として $-R_{xy}\simeq u_\tau^2$（全剪断が壁値に近く、粘性剪断を無視できる）と近似すれば

$$
\frac{dU^+}{dy^+}\simeq\frac{1}{\kappa y^+},
\qquad
U^+(y^+)\simeq\frac1\kappa\ln y^++B
$$

> となる。$B$ は積分定数で、混合長だけから決まらない。$\simeq$ は経験的・漸近的な近似であり、平面水路の厳密解の等号ではない。
<!-- formal-statement-end -->

### 証明の見取り図

平均剪断が正なので、混合長閉鎖の平方根では正の枝を選ぶ。$\ell_m=\kappa y$ から導関数は $1/y$ に比例し、その原始関数が自然対数となる。$B$ を定めるには壁側からの接続条件や観測・追加模型が必要である。

<!-- proof-start -->
### 証明

[混合長閉鎖](../FLUID38/index.md#def-fluid38-mixing-length)を $U'>0$ の本水路に適用すると $-R_{xy}=\kappa^2y^2(U')^2$。先頭次数で $-R_{xy}\simeq u_\tau^2$ と置けば

$$
\kappa^2y^2(U')^2\simeq u_\tau^2.
$$

$y>0$、$\kappa>0$、$U'>0$ なので正の平方根を取って

$$
U'(y)\simeq\frac{u_\tau}{\kappa y}.
$$

[$U^+=U/u_\tau$、$y^+=yu_\tau/\nu$](#def-fluid40-wall-units) を代入すると

$$
\frac{dU^+}{dy^+}
=\frac{\nu}{u_\tau^2}U'
\simeq\frac{\nu}{u_\tau^2}\frac{u_\tau}{\kappa y}
=\frac1{\kappa y^+}.
$$

この式を参照点 $y_0^+>0$ から積分して

$$
U^+(y^+)-U^+(y_0^+)
\simeq\frac1\kappa\int_{y_0^+}^{y^+}\frac{ds}{s}
=\frac1\kappa\ln\frac{y^+}{y_0^+}.
$$

$B=U^+(y_0^+)-\kappa^{-1}\ln y_0^+$ と書けば表示式になる。
<!-- proof-end -->

代表的な滑面・十分高い Reynolds 数の零外圧力勾配境界層や平面水路では、$\kappa$ をおよそ $0.4$、滑面の $B$ をおよそ $5$ とする経験的表示が使われる。ただし両定数も成立域も厳密な普遍定数として証明されていない。よく使われる **$30\lesssim y^+\ll Re_\tau$** は目安であり、$Re_\tau$ が低いと広い重なり領域は存在しない。

例えば $\kappa=0.4$ の対数近似で $y^+=50$ から $100$ へ移動すると

$$
U^+(100)-U^+(50)\simeq\frac1{0.4}\ln2\simeq1.733.
$$

$B$ の値は差から消える。反対に壁 $y^+=0$ へ対数式を外挿すると $\ln0$ は定義できない。**壁の線形漸近則を対数則で置き換えてはならない。**

<a id="prop-fluid40-overlap-defect"></a>

<!-- formal-statement-start -->
> **命題（内外の重なりによる速度欠陥表示）**  
> 第0節の水路で $Re_\tau$ が十分大きく、$\ell_\nu\ll y\ll h$ の重なり領域において先頭次数で

$$
U^+\simeq\frac1\kappa\ln y^++B,\qquad
U_c^+\simeq\frac1\kappa\ln Re_\tau+C
$$

> を**ともに仮定**するなら、その領域で

$$
F(\eta;Re_\tau)\simeq C-B-\frac1\kappa\ln\eta.
$$

> 中心線速度の仮定は対数則だけからは導かれない追加仮定である。
<!-- formal-statement-end -->

### 証明の見取り図

外層欠陥は中心速度とその点の速度の差である。$y^+=Re_\tau\eta$ を対数へ代入すると $\ln Re_\tau$ が相殺され、$\eta$ だけが残る。

<!-- proof-start -->
### 証明

[外層欠陥の定義](#def-fluid40-inner-outer)を摩擦速度で割った表示は

$$
F=U_c^+-U^+.
$$

仮定した二つの近似と $y^+=Re_\tau\eta$ を使えば

$$
\begin{aligned}
F&\simeq\frac1\kappa\ln Re_\tau+C
-\frac1\kappa\ln(Re_\tau\eta)-B\\
&=\frac1\kappa\ln Re_\tau+C
-\frac1\kappa(\ln Re_\tau+\ln\eta)-B\\
&=C-B-\frac1\kappa\ln\eta.
\end{aligned}
$$

対数の分解には $Re_\tau>0$、$\eta>0$ を用いている。
<!-- proof-end -->

**適用範囲の反例**：中心面は $\eta=1$ で [厳密な全剪断則](#prop-fluid40-channel-stress)により $\tau_{\mathrm{tot}}=0$。対称性から $dU^+/dy^+=0$ にもなる。一方、対数近似を中心まで延ばすと $dU^+/dy^+=1/(\kappa Re_\tau)>0$ となる。これは対数則が**中心面では成り立たない**ことの直接の確認であり、式が矛盾したのではなく重なり領域 $y\ll h$ の仮定を失ったのである。

## 4. 粗さと圧力勾配はどの仮定を壊すか

滑面の壁単位は局所的な壁の接線勾配から作った。実壁に粗さがあると、単一の平面 $y=0$ に同じ勾配を代入して済ませられない。例えば代表粗さ高さ $k_s>0$ を壁尺度で表した $k_s^+=k_su_\tau/\nu$ が十分大きいと、粗さ要素の抗力と有効原点が平均速度の分布を変える。対数型の重なり領域が存在する場合でも

$$
U_{\mathrm{rough}}^+\simeq
\frac1\kappa\ln y^++B-\Delta U^+
$$

という**粗面による速度の下方移動** $\Delta U^+$ [無次元] を別途経験的に求める必要がある。$\Delta U^+$ は粗さの形状・配列・基準原点などに依存し、$k_s^+$ だけから常に一意に分かるわけではない。この式を滑面の $y^+=0$ へ延長して、粗面の壁応力を一つの平坦な壁勾配で求めない。

また、第0節の水路は **$dP/dx=-G\ne0$ の圧力駆動流**である。それでも壁に十分近い領域で全剪断がほぼ壁値であれば、対数近似の議論は可能である。従って「圧力勾配が非零なら対数則はすべて不成立」は誤りだ。

一方、外部境界層の**流れ方向に変化する**圧力勾配、とくに逆圧力勾配（流れ方向に圧力が増加する場合）では、平均速度の流れ方向変化、壁応力の変化、剥離の可能性を考えなければならない。[FLUID24 の壁面剥離条件](../FLUID24/index.md#def-fluid24-wall-separation)も、一定剪断と平行平均流が成り立たない状況を扱う。$u_\tau\to0$ に近づく剥離付近では壁単位自体が不安定になり、$y^+$、$U^+$ を通常の意味で用いるには注意が要る。外部境界層の局所模型と、本節の定常・十分発達した水路の恒等式を混ぜない。

## 5. 合成混合長模型を積分して確かめる

第3節の対数則では $\ell_m=\kappa y$ を壁に近づけると、粘性応力を無視する仮定が破れる。壁から中心まで一続きの**計算用曲線**を描くには、壁近傍で混合長を小さくする模型が必要となる。ここでは観測に合わせた万能模型を作るのではなく、次の関係を**明示的に指定**し、剪断収支と積分精度を検算する。

[FLUID38 の Prandtl 混合長閉鎖](../FLUID38/index.md#def-fluid38-mixing-length)は、$U'\ge0$ の場合、模型共分散について $-R_{xy}^{\mathrm{model}}=\ell_m^2(U')^2$ と書ける。実寸の混合長 $\ell_m$ と平均速度勾配 $U'$ を壁単位で表すには、[摩擦速度と粘性長さの定義](#def-fluid40-wall-units)を使って

$$
L=\frac{\ell_m u_\tau}{\nu},\qquad
S=\frac{\nu}{u_\tau^2}U'=\frac{dU^+}{dy^+}
$$

と変換する。従って

$$
-\frac{R_{xy}^{\mathrm{model}}}{u_\tau^2}
=\frac{(\nu L/u_\tau)^2(u_\tau^2S/\nu)^2}{u_\tau^2}
=L^2S^2.
$$

この等式は**経験的閉鎖の無次元化**であり、実測の共分散に対する恒等式ではない。以下の $R_{xy}$ は指定した模型の中での値を表す。

<a id="def-fluid40-damped-model"></a>

<!-- formal-statement-start -->
> **定義（壁減衰付き混合長の合成模型）**  
> $Re_\tau>0$、$\kappa>0$、減衰係数 $A>0$ を与え、$0\le y^+\le Re_\tau$ で

$$
L(y^+)=\kappa y^+\bigl(1-e^{-y^+/A}\bigr),\qquad
S(y^+)=\frac{dU^+}{dy^+}\ge0
$$

> と置く。未知の変動共分散に対する**指定模型**を $-R_{xy}/u_\tau^2=L^2S^2$ とし、[水路の全剪断則](#prop-fluid40-channel-stress)と組み合わせて

$$
S+L^2S^2=1-\frac{y^+}{Re_\tau},
\qquad U^+(0)=0
$$

> を解く。これは Reynolds 平均方程式を**経験的に閉鎖した合成速度曲線**であり、DNS、実測値、未知の変動場の厳密解ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid40-damped-model -->
**定義の確認**：壁では $L(0)=0$、右辺が 1 なので $S(0)=1$、模型の共分散はゼロ。中心では右辺が 0 なので非負の解は $S(Re_\tau)=0$、模型の共分散もゼロとなる。壁の [粘性漸近勾配](#prop-fluid40-viscous-asymptote)と中心対称性の両条件を直接確認した。$L$ は無次元の混合長で、実寸の $\ell_m$ との関係は $\ell_m=(\nu/u_\tau)L$ である。
<!-- definition-example-end -->

<a id="prop-fluid40-model-gradient"></a>

<!-- formal-statement-start -->
> **命題（合成模型の勾配と全剪断残差）**  
> [$L,S$ の指定模型](#def-fluid40-damped-model)で $T=1-y^+/Re_\tau\ge0$ とすると、非負の勾配は一意に

$$
S(y^+)=\frac{2T}{1+\sqrt{1+4L^2T}}
$$

> で与えられる。従って

$$
S+L^2S^2-T=0,\qquad
U^+(y^+)=\int_0^{y^+}S(s)\,ds
$$

> である。第二式の積分を数値的に求めた場合、積分誤差は残るが、第一式の局所応力収支は浮動小数点丸めを除き代数的に成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$S$ の二次方程式で物理的に必要な非負の根を選び、差の形の二次方程式解公式を有理化する。最後は、元の方程式への代入と壁での初期値の積分で確かめる。

<!-- proof-start -->
### 証明

$L>0$ のとき $L^2S^2+S-T=0$ の二根は

$$
S_\pm=\frac{-1\pm\sqrt{1+4L^2T}}{2L^2}.
$$

$T\ge0$ だから平方根は 1 以上であり、$S_-\le0$、$S_+\ge0$ となる（$T=0$ なら $S_+=0$）。正の根の分子・分母に $1+\sqrt{1+4L^2T}$ を掛けると

$$
S_+=\frac{4L^2T}{2L^2(1+\sqrt{1+4L^2T})}
=\frac{2T}{1+\sqrt{1+4L^2T}}.
$$

$L=0$ のときは元の式から $S=T$ であり、表示式も $2T/(1+1)=T$ を返す。よって全区間で連続に定まる。元の二次方程式に代入して $S+L^2S^2=T$、積分定数を $U^+(0)=0$ に合わせて $U^+(y^+)=\int_0^{y^+}S(s)\,ds$ を得る。
<!-- proof-end -->

**数値例**：$Re_\tau=1000$、$\kappa=0.4$、$A=26$、$y^+=100$ なら

$$
L=40(1-e^{-100/26})\simeq39.1455,\quad T=0.9,
$$

$$
S\simeq0.0239107,\qquad
L^2S^2\simeq0.8760893,\qquad
S+L^2S^2\simeq0.9000000.
$$

粘性と模型乱流応力が壁値の 0.9 を分担する様子は確認できる。しかし $S$ の模型が経験的なので、**残差がゼロでも物理的正しさの証明ではない**。

### ブラウザでの数値実験

次の実験では $0$ から $Re_\tau$ まで等間隔格子を置き、[合成模型の勾配と全剪断残差](#prop-fluid40-model-gradient)を複合台形則で積分する。同じ模型で区間数を倍にした中心速度との差を積分精度の診断とし、各格子点の $\lvert S+L^2S^2-T\rvert$ の最大値を応力収支の診断とする。三つのグラフは**合成平均速度**、**経験的な対数参照線**、**模型応力分担**の比較であり、観測された速度プロファイルではない。$B=5$ の参照線も実測フィットではなく比較用の指定値である。

<!-- python-file-lab -->
# lab-id: FLUID40-WALL-UNITS-PROFILE
# lab-title: 壁乱流の合成平均速度と全剪断検算（測定・DNSではない）
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID40/wall_turbulence_lab.py
# timeout-ms: 30000
# lab-preset: 基準：Reτ=1000、2048分割 | --retau 1000 --grid 2048
# lab-preset: 粗い台形積分：512分割 | --retau 1000 --grid 512
# lab-preset: 細かい台形積分：8192分割 | --retau 1000 --grid 8192
# lab-preset: 摩擦Reを下げる：Reτ=300 | --retau 300 --grid 2048
# lab-preset: 壁減衰を変える：A=32 | --retau 1000 --damping 32 --grid 2048
<!-- python-file-lab-end -->

公開される [Python ソース](wall_turbulence_lab.py) は標準ライブラリだけを用いる。ローカル検算は Python 3 でこのファイルに引数 --self-test を付けて実行できる。ブラウザ実行は公開 Python 環境の初回ロードが必要な場合がある。実行できない環境でも、上の $y^+=100$ における代数検算と [厳密全剪断式](#prop-fluid40-channel-stress)は紙上で追える。

**観察すべき点**：線形の参照線は壁近傍以外では不適切、対数参照線は壁にも中心にも適用できない。$Re_\tau$ と $A$ を変えると合成曲線と対数線の重なり方は変化する。三つ目のグラフでは、粘性分担と模型乱流分担の**和**が $1-y/h$ になり、中心でゼロになる。これは指定模型が満たす収支の検査で、実乱流の検証ではない。

## 6. 演習：厳密な応力収支と経験則を切り分ける

### Level A

#### A1. 壁単位を数値から計算する
- Level: A

$\rho=1000$ kg/m$^3$、$\nu=10^{-6}$ m$^2$/s、$\tau_w=2.5$ Pa、$h=2$ cm の滑面水路で、$u_\tau$、$\ell_\nu$、$Re_\tau$ と $y=0.1$ mm の $y^+$ を求め、単位を示せ。

<!-- solution-start -->
#### 詳細解答

[摩擦速度と壁単位の定義](#def-fluid40-wall-units)にまず Pa $=$ kg/(m s$^2$) と $\rho$ の単位を代入すると $\tau_w/\rho$ の単位は m$^2$/s$^2$ である。よって

$$
u_\tau=\sqrt{2.5/1000}=0.05\ {\rm m/s},
\qquad
\ell_\nu=\frac{10^{-6}}{0.05}=2\times10^{-5}\ {\rm m}.
$$

$h=0.02$ m、$y=10^{-4}$ m へ換算し

$$
Re_\tau=\frac{0.02}{2\times10^{-5}}=1000,\qquad
y^+=\frac{10^{-4}}{2\times10^{-5}}=5.
$$

最後の二量は無次元である。
<!-- solution-end -->

#### A2. 応力と流束の符号
- Level: A

$\rho=1000$ kg/m$^3$、$\nu U'=0.0005$ m$^2$/s$^2$、$R_{xy}=-0.0010$ m$^2$/s$^2$ の点で、$\tau_V$、$\tau_R$、$\tau_{\mathrm{tot}}$、$J_{yx}$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[$\tau_V,\tau_R,\tau_{\mathrm{tot}}$ の定義](#def-fluid40-total-shear)から

$$
\tau_V=1000(0.0005)=0.5\ {\rm Pa},
\qquad
\tau_R=-1000(-0.0010)=1.0\ {\rm Pa}.
$$

足して $\tau_{\mathrm{tot}}=1.5$ Pa。平均運動量の $+y$ 方向流束は負号が付き $J_{yx}=-1.5$ Pa。応力と流束の符号を一致させると平均運動量式と衝突する。
<!-- solution-end -->

#### A3. 壁極限の導出
- Level: A

$U(0)=0$、$U'(0)>0$ があり $u_\tau^2=\nu U'(0)$ とする。微分の定義から $\lim_{y^+\downarrow0}U^+/y^+=1$ を示せ。また、これだけで $U^+(5)=5$ が言えるか。

<!-- solution-start -->
#### 詳細解答

$y^+=yu_\tau/\nu$ と $U^+=U/u_\tau$ を用いると

$$
\frac{U^+}{y^+}=\frac{\nu}{u_\tau^2}\frac{U(y)-U(0)}y.
$$

右辺の商は $y\downarrow0$ で $U'(0)$ へ収束する。従って極限は $\nu U'(0)/u_\tau^2=1$。[壁の粘性漸近則](#prop-fluid40-viscous-asymptote)は $y^+\to0$ の主張なので、有限の $y^+=5$ における等号までは言えない。
<!-- solution-end -->

#### A4. 内外の位置座標の換算
- Level: A

同じ $\eta=0.05$ の位置について、$Re_\tau=800$ と $Re_\tau=2000$ の水路ではそれぞれ $y^+$ はいくつか。なぜ同じ壁距離を意味しないか。

<!-- solution-start -->
#### 詳細解答

[内外座標の定義](#def-fluid40-inner-outer)は $y^+=Re_\tau\eta$ である。それぞれ

$$
y^+_{\mathrm{(800)}}=800(0.05)=40,\qquad
y^+_{\mathrm{(2000)}}=2000(0.05)=100.
$$

両点は半幅 $h$ に対しては同じ相対距離でも、粘性長さ $\ell_\nu=h/Re_\tau$ の本数では異なる。
<!-- solution-end -->

#### A5. 対数勾配で速度差を求める
- Level: A

仮に $\kappa=0.4$ で二点 $y^+=50,100$ が同一の対数近似領域にあるとする。$U^+(100)-U^+(50)$ を求め、未知の $B$ が不要な理由を述べよ。

<!-- solution-start -->
#### 詳細解答

[条件付き対数則](#prop-fluid40-log-law)をそれぞれの点に適用して引く。

$$
\begin{aligned}
U^+(100)-U^+(50)
&\simeq \left(\frac{\ln100}{0.4}+B\right)
-\left(\frac{\ln50}{0.4}+B\right)\\
&=\frac1{0.4}\ln(100/50)=2.5\ln2\simeq1.733.
\end{aligned}
$$

同一モデルの積分定数は差で打ち消される。二点が対数領域にあるという仮定なしにこの差を予測することはできない。
<!-- solution-end -->

### Level B

#### B1. 圧力勾配から全剪断を再構成する
- Level: B

定常・十分発達した平面水路で $P_x=-G$、$R_{xy}(h)=U'(h)=0$ とする。RANS の $x$ 成分から $\tau_{\mathrm{tot}}(y)=G(h-y)$ を再導出せよ。さらに $y=h/4$ で $\tau_V/\tau_w=0.1$ と分かっているとき、$-R_{xy}/u_\tau^2$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[Reynolds 平均方程式](../FLUID38/index.md#thm-fluid38-rans)へ $\partial_tU=0$、$\boldsymbol U=(U(y),0,0)$、$P_x=-G$ を代入すると

$$
0=\frac G\rho+\nu U''-R_{xy}'.
$$

$\rho$ を掛け、[全剪断の定義](#def-fluid40-total-shear)から $\tau_{\mathrm{tot}}'=-G$。中心面 $h$ から逆向きに積分して

$$
\tau_{\mathrm{tot}}(y)=\tau_{\mathrm{tot}}(h)+G(h-y)=G(h-y).
$$

壁では $\tau_w=Gh$、従って $y=h/4$ における全剪断比は $3/4$。粘性が $0.1$ を担うから

$$
-\frac{R_{xy}}{u_\tau^2}
=\frac{\tau_R}{\tau_w}=\frac34-0.1=0.65.
$$

これは共分散 $R_{xy}$ 自体なら負である。
<!-- solution-end -->

#### B2. 内外の重なりの式を導く
- Level: B

対数近似 $U^+=(1/\kappa)\ln y^++B$ と、別途 $U_c^+=(1/\kappa)\ln Re_\tau+C$ を仮定する。$F(\eta)$ の式を導き、$\kappa=0.4$、$B=5$、$C=7$、$\eta=0.1$ で評価せよ。

<!-- solution-start -->
#### 詳細解答

[欠陥の定義](#def-fluid40-inner-outer)と $y^+=Re_\tau\eta$ を使用すると

$$
\begin{aligned}
F(\eta)&=U_c^+-U^+\\
&\simeq\frac1\kappa\ln Re_\tau+C
-\frac1\kappa\ln(Re_\tau\eta)-B\\
&=C-B-\frac1\kappa\ln\eta.
\end{aligned}
$$

指定値では

$$
F(0.1)\simeq7-5-2.5\ln(0.1)
=2+2.5\ln10\simeq7.756.
$$

$C$ の式は対数勾配の積分だけでは得られない。外層の追加仮定として必要である。
<!-- solution-end -->

#### B3. 対数則の適用失敗を二通り説明する
- Level: B

(i) 平面水路の対数速度式を中心 $y=h$ に外挿できない理由を厳密な全剪断則と中心対称性から述べよ。(ii) 粗面で滑面と同じ $y^+$ の比較を行い、$\Delta U^+=3$ と指定された場合、滑面で $U^+=16.5$ なら粗面の近似値はいくつか。また、$\Delta U^+=3$ の値を粗さ高さだけから証明できるか。

<!-- solution-start -->
#### 詳細解答

(i) [中心での全剪断](#prop-fluid40-channel-stress)はゼロで、対称性により $U'(h)=0$、従って $dU^+/dy^+=0$。対数式は同じ点で $(\kappa Re_\tau)^{-1}>0$ を予測するから、その適用仮定 $y\ll h$ が破れている。

(ii) 第4節の粗面速度シフトの表示を同じ基準位置で仮定すると

$$
U^+_{\rm rough}\simeq U^+_{\rm smooth}-\Delta U^+
=16.5-3=13.5.
$$

$\Delta U^+$ は実験・粗さ構造・原点の選択に依存する経験量である。粗さの代表高さだけから一意に導かれる厳密定理ではない。圧力駆動水路の $dP/dx\ne0$ と、外部境界層における流れ方向に変化する圧力勾配を同じ「失敗条件」として扱うことも誤りである。
<!-- solution-end -->

#### B4. 合成混合長の非負根と検算
- Level: B

$Re_\tau=1000$、$\kappa=0.4$、$A=26$、$y^+=100$ の [減衰模型](#def-fluid40-damped-model)を考える。$L$、$T$、$S$、$L^2S^2$ を求め、合計と全剪断の差を調べよ。二次方程式の負の根を採用しない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

$T=1-100/1000=0.9$、$L=0.4(100)(1-e^{-100/26})\simeq39.14553$。[合成模型の勾配と全剪断残差](#prop-fluid40-model-gradient)を使うと

$$
S=\frac{2(0.9)}{1+\sqrt{1+4(39.14553)^2(0.9)}}
\simeq0.02391068.
$$

乱流分担は二次方程式から $L^2S^2=T-S$ と計算でき、

$$
L^2S^2\simeq0.90000000-0.02391068=0.87608932.
$$

和は $S+L^2S^2\simeq0.9$ で、丸めの範囲で残差はゼロ。負の根は $S<0$ で、下壁から中心へ平均流速が増えるとした本模型の $S\ge0$ と矛盾する。**残差の小ささは採用した閉鎖の正しさとは別**である。
<!-- solution-end -->

### Level C

#### C1. 壁単位から適用範囲と数値検査まで
- Level: C

第1節の水の水路（$\rho=1000$ kg/m$^3$、$\nu=10^{-6}$ m$^2$/s、$\tau_w=2.5$ Pa、$h=0.02$ m）を考える。次を順に答えよ。

1. $u_\tau$、$Re_\tau$ と $y=2$ mm の $y^+$、$\eta$ を求め、全剪断応力の大きさを求めよ。
2. その点で $dU^+/dy^+=0.05$ と指定されたとき、粘性・乱流の応力 [Pa] と $R_{xy}$ [m$^2$/s$^2$] を復元せよ。
3. $\kappa=0.4$ を仮定して、対数近似で $y^+=50$ と $100$ の速度差を求めよ。その近似を壁・中心まで延長できない理由を別々に示せ。
4. 第5節の合成模型で $y^+=100$、$A=26$ として非負根を求め、局所応力残差を確認せよ。これは実測速度との一致や乱流エネルギー収支の正しさを意味するか。

<!-- solution-start -->
#### 詳細解答

(1) [壁単位](#def-fluid40-wall-units)から

$$
u_\tau=\sqrt{2.5/1000}=0.05\ {\rm m/s},\quad
Re_\tau=\frac{0.02(0.05)}{10^{-6}}=1000.
$$

$y=0.002$ m なので

$$
y^+=\frac{0.002(0.05)}{10^{-6}}=100,\qquad
\eta=\frac{0.002}{0.02}=0.1.
$$

[全剪断の厳密式](#prop-fluid40-channel-stress)に代入して

$$
\tau_{\rm tot}=\tau_w(1-\eta)=2.5(0.9)=2.25\ {\rm Pa}.
$$

(2) 指定された $dU^+/dy^+=0.05$ は、[粘性剪断の定義](#def-fluid40-total-shear)と壁単位の換算によって $\tau_V/\tau_w=0.05$ を意味する。ここでは第5節の合成模型の $S$ の値を仮定していないので

$$
\tau_V=\tau_w S=2.5(0.05)=0.125\ {\rm Pa},
$$

$$
\tau_R=\tau_{\rm tot}-\tau_V=2.25-0.125=2.125\ {\rm Pa}.
$$

共分散の符号を戻すと

$$
R_{xy}=-\frac{\tau_R}{\rho}
=-\frac{2.125}{1000}
=-0.002125\ {\rm m^2/s^2}.
$$

(3) [条件付き対数則](#prop-fluid40-log-law)では両点が対数領域にあるという**追加仮定**が必要。その下で

$$
\Delta U^+\simeq \frac{\ln(100/50)}{0.4}
=1.73287.
$$

壁では [$U^+\sim y^+$](#prop-fluid40-viscous-asymptote)だが対数関数は $\ln y^+\to-\infty$。中心では対称性による勾配ゼロに対し対数式の勾配は正であり、[$y\ll h$ の領域限定](#prop-fluid40-overlap-defect)を失う。今回 $y^+=100$ は $Re_\tau=1000$ の 1/10 に当たり、無条件に完全な対数領域と断言できない。

(4) [減衰模型](#def-fluid40-damped-model)で $L=40(1-e^{-100/26})\simeq39.14553$、$T=0.9$ と計算する。[合成模型の勾配と全剪断残差](#prop-fluid40-model-gradient)に代入すると

$$
S\simeq0.02391068,\qquad
L^2S^2=T-S\simeq0.87608932.
$$

和は $0.9$ なので模型の全剪断残差は計算丸めを除きゼロ。ただし (2) の問題が指定した $S=0.05$ と、(4) の指定閉鎖が予測する $S\simeq0.02391$ は別の仮定による異なる値である。これらを同じ測定値だと扱わない。Python の細分化で確認できるのは積分精度と指定模型の代数残差であって、速度変動の実測値、Navier–Stokes 直接数値計算、[乱流運動エネルギー収支](../FLUID39/index.md#prop-fluid39-tke-budget)を実際に解いた証拠ではない。
<!-- solution-end -->

## 7. 今回分かったこと

**厳密**なのは、指定した滑面・定常・十分発達した水路の全剪断分布と、壁における微分可能性からの $U^+\sim y^+$ である。**条件付きの経験則**なのは、混合長を $\kappa y$ とみなして乱流応力が優勢な重なり領域に導いた対数則、そして中心線の追加仮定に基づく速度欠陥表示である。**合成数値模型**はその区別を確かめる道具であり、観測の代役ではない。

次の FLUID41 では、ここまで一定としていた密度を変化する量に戻し、質量・運動量・エネルギーの保存則を同時に扱う。
