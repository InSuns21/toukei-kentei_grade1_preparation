# GR23 四重極放射の近似とエネルギー流

<!-- definition-example-audit: strict -->

[GR22のTT平面波](../GR22/index.md#def-gr22-tt-wave)は、波が到達したときの時計・距離・干渉計応答を記述しました。しかし、どの物体の運動が遠方にどれほどの波を作るかはまだ決まっていません。電磁波なら双極子放射を思い浮かべますが、重力波では保存される全質量と全運動量が低次の放射を消します。その次に残る「形の二階モーメント」が四重極です。

本章の道筋は、**局在した遅い源 → 遅延解 → 保存則で応力積分を書き換える → TT射影 → 遠方エネルギー流**です。最後に円軌道二体系で波の周波数と放射パワーを独立に計算します。波形の一次近似とエネルギーの二次近似は区別します。

時空は背景真空かつ宇宙項零のMinkowski近傍とし、$x^\mu=(ct,x^1,x^2,x^3)$、$\eta=\operatorname{diag}(-1,1,1,1)$、$\partial_0=c^{-1}\partial_t$、$\Box=-c^{-2}\partial_t^2+\nabla^2$ を使います。$G$ はNewton定数、$c$ は光速です。$T^{\mu\nu}=T^{\nu\mu}$ は対称エネルギー運動量テンソルです。ギリシャ添字は $0,\ldots,3$、ラテン添字は $1,\ldots,3$ を走り、空間添字は $\delta_{ij}$ で操作します。

## 1. どこまでなら源の遅延場を線形理論で計算できるか

[GR21の調和ゲージでの場の方程式](../GR21/index.md#thm-gr21-linear-wave)は、線形摂動をトレース反転した $\bar h_{\mu\nu}=h_{\mu\nu}-\eta_{\mu\nu}h/2$ に対して

$$
\Box\bar h_{\mu\nu}=-\frac{16\pi G}{c^4}T_{\mu\nu},
\qquad \partial^\mu\bar h_{\mu\nu}=0
$$

となります。放射を扱うには、ある時刻の源だけでなく、**源の各点から有限速度で届く過去の値**を足し合わせる必要があります。$|\boldsymbol x-\boldsymbol y|$ を伝播距離とすれば、その遅延時刻は $t-|\boldsymbol x-\boldsymbol y|/c$ です。

以下の最初の導出は、平坦背景上で十分滑らか、空間的にコンパクトな対称テンソル $T^{\mu\nu}$ が

$$
\partial_\mu T^{\mu\nu}=0
$$

を満たす線形源模型についての厳密な先頭近似です。重力で互いに加速する二体を「物質だけの、平坦背景で厳密に保存する源」とはみなせません。その場合の四重極式は、弱い自己重力・低速という追加の近似で重力場自身の寄与を含めた整合的な漸近展開の**先頭次数**として読む必要があります。この違いを後で明示します。

源の典型的な大きさを $a$、変動角周波数を $\Omega$、観測距離を $r=|\boldsymbol x|$、観測方向を $n_i=x_i/r$ とします。$r\gg a$ と $a\Omega/c\ll1$ は独立な条件です。前者は遠方から見る条件、後者は源の内部を光が横切る間にはほとんど運動が変わらない条件です。

<a id="def-gr23-slow-source"></a>

<!-- formal-statement-start -->
> **定義（局在・低速の放射源と波動領域）**  
> 対称かつ滑らかな $T^{\mu\nu}$ が、各時刻で半径 $a$ の固定された球内に台を持ち、$\partial_\mu T^{\mu\nu}=0$ を満たすとする。源の時間変動の尺度が $\Omega^{-1}$ で、$\Omega a/c\ll1$ なら低速・長波長源と呼ぶ。観測点が $r\gg a$ にあり、さらに $r\Omega/c\gg1$ なら、ここでいう波動領域にある。以下は遠方へ出る遅延解のみを選び、外から入射する自由波を加えない。
<!-- formal-statement-end -->

定義の各条件は同じではありません。$r\gg a$ だけで遅延時刻を源の中心の時刻へ置き換えることはできず、$a\Omega/c\ll1$ が必要です。また $r\Omega/c\gg1$ は、$1/r$ の放射項を $1/r^2$ の近接場から区別するために必要です。

<!-- definition-example-start: def-gr23-slow-source -->
**定義の確認**。 $a>0$ の球内で滑らかな関数 $f(\boldsymbol y)$ を固定し、$\int f\,d^3y=1$ とします。$T^{00}=\rho_0c^2 f$、$T^{0i}=T^{ij}=0$ と置けば全成分は球外で零であり、時間微分も空間発散も零なので四つの保存式が成立します。源は静的で、変動尺度はなく $\Omega=0$ と読めます。この例に「$r\Omega/c\gg1$ の波動領域」が存在するとは言えません。静的な局在源は放射しないためです。次の節では $\Omega>0$ の保存された変動源を仮定します。
<!-- definition-example-end -->

## 2. 単極・双極はなぜ放射を担わないか

源の「量」と「位置」を分けるため、エネルギー密度を質量換算した $\rho=T^{00}/c^2$、運動量密度を $J^i=T^{0i}/c$ と置きます。これらを用い、総質量相当量 $M$、一次モーメント $D_i$、二次モーメント $Q_{ij}$ を作ります。

$$
M(t)=\int\rho\,d^3y,\qquad
D_i(t)=\int\rho y_i\,d^3y,\qquad
Q_{ij}(t)=\int\rho y_i y_j\,d^3y.
$$

$Q_{ij}$ は対称な $3\times3$ 行列です。$\boldsymbol y$ は固定された背景直交座標で、積分は台を含む全空間上です。無跡成分

$$
I_{ij}=Q_{ij}-\frac13\delta_{ij}Q_{kk}
$$

で方向による形の違いを表します。正式な名称は直後に定義します。対角の和を引く理由は、観測方向に垂直で無跡な[GR22のTT射影](../GR22/index.md#def-gr22-tt-projector)では $\delta_{ij}$ に比例する部分が消えるためです。$\operatorname{tr}I=Q_{kk}-3Q_{kk}/3=0$ と直接確かめられます。

<a id="def-gr23-mass-quadrupole"></a>

<!-- formal-statement-start -->
> **定義（質量四重極モーメント）**  
> 時刻ごとに $\rho=T^{00}/c^2$ がコンパクト台を持ち、二次モーメントが存在する保存された対称な源について、
>
$$
Q_{ij}(t)=\int_{\mathbb R^3}\rho(t,\boldsymbol y)y_i y_j\,d^3y,\qquad
I_{ij}(t)=Q_{ij}(t)-\frac13\delta_{ij}\sum_{k=1}^3Q_{kk}(t)
$$
>
> をそれぞれ質量二次モーメント、質量四重極モーメントとする。$I_{ij}=I_{ji}$ かつ $\delta^{ij}I_{ij}=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr23-mass-quadrupole -->
**定義の確認**。 時刻を固定し、質量 $m$ の二つの集中質量を $(a,0,0)$ と $(-a,0,0)$ に置く理想化を考えます（数学的には滑らかな質量分布を点へ集中させた極限であり、前節の滑らかさとは別の例です）。$Q_{11}=2ma^2$、$Q_{22}=Q_{33}=0$、非対角も零。従って

$$
I=\frac{2ma^2}{3}
\begin{pmatrix}2&0&0\\0&-1&0\\0&0&-1\end{pmatrix}.
$$

対称性と跡 $2-1-1=0$ が成立します。二つの質点を等しく全方向に広げて $Q_{ij}=q\delta_{ij}$ とすれば $I=0$ です。大きさだけでなく**方向による形の違い**を抽出しています。
<!-- definition-example-end -->

<a id="thm-gr23-moment-conservation"></a>

<!-- formal-statement-start -->
> **定理（単極・双極の保存と応力の四重極恒等式）**  
> $T^{\mu\nu}=T^{\nu\mu}$ が $C^2$ 級で各時刻コンパクト台を持ち、空間・時間微分と積分の交換ができ、$\partial_\mu T^{\mu\nu}=0$ を満たすとする。上の $M,D_i,Q_{ij}$ に対し、
>
$$
\dot M=0,\qquad
\ddot D_i=0,\qquad
\int_{\mathbb R^3}T^{ij}\,d^3y=\frac12\ddot Q_{ij}
$$
>
> が成立する。従って時間変動する放射の先頭項を作るのは、定数の単極 $M$ や一次時間関数の双極 $D_i$ ではなく、二階時間微分を持つ四重極である。
<!-- formal-statement-end -->

### 証明の見取り図

保存式の時間成分は連続の式、空間成分は運動量の式です。空間発散を部分積分して、境界面の項をコンパクト台で消します。$Q$ では積の微分を二回使うと $T^{ij}$ が二つ現れます。

<!-- proof-start -->
### 証明

$\partial_0=c^{-1}\partial_t$ と $T^{i0}=T^{0i}$ より、$\nu=0$ の保存式は

$$
\partial_t\rho+\partial_kJ^k=0.
$$

$\nu=i$ の保存式を $c$ の因子まで明示すると

$$
\partial_tJ^i+\partial_kT^{ki}=0.
$$

まず台の外では境界流束が零だから、

$$
\dot M=\int\partial_t\rho\,d^3y
=-\int\partial_kJ^k\,d^3y=0.
$$

$D_i$ については、部分積分と $\partial_k y_i=\delta_{ki}$ から

$$
\dot D_i=-\int y_i\partial_kJ^k\,d^3y
=\int J^k\delta_{ki}\,d^3y=\int J_i\,d^3y.
$$

さらに

$$
\ddot D_i=\int\partial_tJ_i\,d^3y
=-\int\partial_kT^{ki}\,d^3y=0.
$$

二次モーメントでは

$$
\begin{aligned}
\dot Q_{ij}
&=-\int y_i y_j\partial_kJ^k\,d^3y\\
&=\int(\delta_{ki}y_j+y_i\delta_{kj})J^k\,d^3y\\
&=\int(y_jJ_i+y_iJ_j)\,d^3y.
\end{aligned}
$$

両辺をもう一度微分し、$\partial_tJ_i=-\partial_kT^{ki}$ を代入すると

$$
\begin{aligned}
\ddot Q_{ij}
&=-\int(y_j\partial_kT^{ki}+y_i\partial_kT^{kj})\,d^3y\\
&=\int(T^{ji}+T^{ij})\,d^3y\\
&=2\int T^{ij}\,d^3y.
\end{aligned}
$$

最後の等式では応力の対称性を用いました。どの部分積分でも台の外側の表面項が零となる仮定を使っています。$\square$
<!-- proof-end -->

時間に依らない $M$ の微分は零、$D_i$ の二階微分も零です。原点を一定ベクトル $\boldsymbol b$ だけ移すと、$Q'_{ij}=Q_{ij}-b_iD_j-b_jD_i+b_i b_jM$ なので、$\ddot Q'_{ij}=\ddot Q_{ij}$。この意味でも放射振幅は一定の空間原点の選択に依存しません。ただし加速する原点への変換はここに含まれません。

## 3. 遅延場から四重極波形を導く

波動方程式の点源からの遅延核は $1/|\boldsymbol x-\boldsymbol y|$ です。波動演算子に対するGreen関数の規格化から、外向き解は

$$
\bar h_{\mu\nu}(t,\boldsymbol x)
=\frac{4G}{c^4}\int_{\mathbb R^3}
\frac{T_{\mu\nu}(t-|\boldsymbol x-\boldsymbol y|/c,\boldsymbol y)}
{|\boldsymbol x-\boldsymbol y|}\,d^3y
$$

です。この規格化は $\nabla^2(1/r)=-4\pi\delta^{(3)}(\boldsymbol x)$ と、場の方程式の係数 $-16\pi G/c^4$ を組み合わせて得られます。場の方程式の調和条件は、遅延解を微分し $\partial_\mu T^{\mu\nu}=0$ と境界での消失を使えば両立します。

観測方向 $\boldsymbol n$ を固定し、$r\gg a$ のとき

$$
|\boldsymbol x-\boldsymbol y|
=r-\boldsymbol n\cdot\boldsymbol y+O(a^2/r),\qquad
\frac1{|\boldsymbol x-\boldsymbol y|}=\frac1r+O(a/r^2).
$$

従って遅延時刻は $t_r=t-r/c$ を中心として $t_r+\boldsymbol n\cdot\boldsymbol y/c+O(a^2/(cr))$。$a\Omega/c\ll1$ なら被積分関数を $t_r$ の値で展開でき、先頭項が $\int T_{ij}(t_r,\boldsymbol y)\,d^3y$ となります。$1/r$ の係数の相対的な遅延補正は典型的に $O(a\Omega/c)$、距離による補正は $O(a/r)$ です。特別な対称性で先頭項が零の場合には、この補正を先頭項の大きさで割る評価はできません。

<a id="thm-gr23-quadrupole-wave"></a>

<!-- formal-statement-start -->
> **定理（先頭四重極波形）**  
> 前節の保存された局在源が十分滑らかで、$\Omega>0$、$r\gg a$、$\Omega a/c\ll1$、$r\Omega/c\gg1$ とする。調和ゲージの外向き遅延解の $1/r$ 放射部分について、観測方向 $\boldsymbol n$ に対する[空間TT射影](../GR22/index.md#def-gr22-tt-projector)を $\Lambda_{ij,kl}(\boldsymbol n)$ と書けば、遅い源の先頭次数は
>
$$
\boxed{
h_{ij}^{\mathrm{TT}}(t,r\boldsymbol n)
=\frac{2G}{c^4r}\Lambda_{ij,kl}(\boldsymbol n)
\ddot I_{kl}(t-r/c)
}
$$
>
> である。省略したものは線形の高次多極・有限距離補正と、非線形重力の寄与であり、等式は指定した次数の近似を表す。
<!-- formal-statement-end -->

### 証明の見取り図

遅延解の先頭 $1/r$ 項で空間成分の応力を積分し、[応力の四重極恒等式](#thm-gr23-moment-conservation)で二階時間微分へ変えます。観測方向に対する射影では跡成分が消えます。

<!-- proof-start -->
### 証明

空間成分では背景が正符号なので $T_{ij}=T^{ij}$。遅延解の二つの展開を使い、

$$
\bar h_{ij}(t,r\boldsymbol n)
=\frac{4G}{c^4r}\int T^{ij}(t_r,\boldsymbol y)\,d^3y
+\text{高次項}.
$$

[保存則からの積分恒等式](#thm-gr23-moment-conservation)を $t=t_r$ で使うと

$$
\bar h_{ij}=\frac{2G}{c^4r}\ddot Q_{ij}(t_r)+\text{高次項}.
$$

トレース反転の違いは $\eta_{ij}$ に比例するので、$\Lambda_{ij,kl}\bar h_{kl}=\Lambda_{ij,kl}h_{kl}$。また $\Lambda_{ij,kl}\delta_{kl}=0$ だから、

$$
\begin{aligned}
h_{ij}^{\mathrm{TT}}
&=\Lambda_{ij,kl}\bar h_{kl}\\
&=\frac{2G}{c^4r}\Lambda_{ij,kl}\ddot Q_{kl}(t_r)\\
&=\frac{2G}{c^4r}\Lambda_{ij,kl}\ddot I_{kl}(t_r).
\end{aligned}
$$

$P_{ij}=\delta_{ij}-n_in_j$ とすれば $\Lambda_{ij,kl}=P_{ik}P_{jl}-P_{ij}P_{kl}/2$（対称テンソルへ作用）。$P_{ij}n_j=0$ と $P_{ii}=2$ より、得られた波は $\boldsymbol n$ に直交し空間跡が零です。$\square$
<!-- proof-end -->

具体的に観測方向を $z$ とすると

$$
h_{xx}^{\mathrm{TT}}
=\frac{G}{c^4r}(\ddot I_{xx}-\ddot I_{yy}),\quad
h_{xy}^{\mathrm{TT}}=\frac{2G}{c^4r}\ddot I_{xy},\quad
h_{yy}^{\mathrm{TT}}=-h_{xx}^{\mathrm{TT}}.
$$

これは[GR22の偏極の定義](../GR22/index.md#def-gr22-tt-wave)と同じ $h_+=h_{xx}^{\mathrm{TT}}$、$h_\times=h_{xy}^{\mathrm{TT}}$ を与えます。$r$、$G$、$c$ の次元を確かめると、$[I]=ML^2$、$[\ddot I]=ML^2T^{-2}$、$[G/(c^4r)]=T^2/(ML^2)$ だから $h$ は無次元です。

## 4. 波のエネルギーはどの意味で測れるか

一般相対論で重力場のエネルギーを、任意の一点における座標不変な局所密度として定義できるわけではありません。自由波の**二次のエネルギー収支**を、平坦に近い背景、TT表示、波長より長い時間・距離での平均という条件の下で扱います。一次の場の方程式の解に二次のエネルギーを結び付けるため、振幅の一次式だけから流束を定義してはいけません。

[Einstein–Hilbert作用](../GR10/index.md#def-gr10-eh-action)を平坦背景のまわりで二次まで展開し、真空のTT成分に限り境界項を除くと、波の二次作用は

$$
S_{\mathrm{TT}}^{(2)}
=\frac{c^4}{64\pi G}\int dt\,d^3x
\left[\frac1{c^2}\dot h_{ij}^{\mathrm{TT}}\dot h_{ij}^{\mathrm{TT}}
-\partial_k h_{ij}^{\mathrm{TT}}\partial_k h_{ij}^{\mathrm{TT}}\right].
$$

二次作用は元の一般共変な作用の全内容ではなく、平坦背景の真空TT自由度に制限したものです。$\partial^\mu h_{\mu\nu}^{\mathrm{TT}}=0$、$h^{\mathrm{TT}}=0$ を先に用いると、二次の運動項では偏微分の縮約だけが残ります。$h\mapsto h+\delta h$ の変分では、例えば時間項が $2c^{-2}\dot h_{ij}\delta\dot h_{ij}$ となり、部分積分で波動方程式が戻ります。

$a=c^4/(64\pi G)$ と略記すると、この作用の空間・時間並進に対する二次のエネルギー収支は

$$
u=a\left[c^{-2}\dot h_{ij}\dot h_{ij}
+\partial_kh_{ij}\partial_kh_{ij}\right],\qquad
S_k=-2a\dot h_{ij}\partial_kh_{ij}.
$$

実際、$\dot u$ を計算し波動方程式 $c^{-2}\ddot h_{ij}=\nabla^2h_{ij}$ を代入すると

$$
\begin{aligned}
\dot u
&=2a\left[c^{-2}\dot h_{ij}\ddot h_{ij}
+\partial_kh_{ij}\partial_k\dot h_{ij}\right]\\
&=2a\left[\dot h_{ij}\partial_k\partial_kh_{ij}
+\partial_kh_{ij}\partial_k\dot h_{ij}\right]
=2a\,\partial_k(\dot h_{ij}\partial_kh_{ij})
=-\partial_kS_k.
\end{aligned}
$$

これは固定した背景とゲージでの二次自由波エネルギーです。ゆっくり変化する背景に対して波長平均して得る有効エネルギー運動量と整合しますが、未平均の局所重力エネルギーを一般座標変換に対して不変と主張するものではありません。

<a id="def-gr23-averaged-flux"></a>

<!-- formal-statement-start -->
> **定義（遠方TT波の平均エネルギー流束）**  
> 外向き進行波 $h_{ij}^{\mathrm{TT}}=r^{-1}H_{ij}(t-r/c,\boldsymbol n)$ の波動領域で、複数周期にわたり、しかし源の長期変化より短い時間窓で平均 $\langle\cdot\rangle$ を取る。半径方向の単位面積あたりの平均エネルギー流束を
>
$$
F(t,r,\boldsymbol n)
=\frac{c^3}{32\pi G}
\left\langle\dot h_{ij}^{\mathrm{TT}}
\dot h_{ij}^{\mathrm{TT}}\right\rangle
$$
>
> と定義する。$F$ はこの弱場・遠方・平均化の近似におけるエネルギーの単位時間・単位面積当たりの流れである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr23-averaged-flux -->
**定義の確認**。 $+z$ 方向の平面TT波で $h_+=H\cos\omega(t-z/c)$、$h_\times=0$ とすると、$h_{11}=h_+$、$h_{22}=-h_+$ なので、$\dot h_{ij}\dot h_{ij}=2H^2\omega^2\sin^2\omega(t-z/c)$。一周期平均 $\langle\sin^2\rangle=1/2$ を使えば

$$
F=\frac{c^3}{32\pi G}H^2\omega^2.
$$

$F\ge0$ であり、$[\dot h^2]=T^{-2}$ と $[c^3/G]=MT^{-1}$ から $[F]=MT^{-3}$、すなわち $W/m^2$ です。固定振幅の理想平面波は局在した源の球面波ではないので、ここから総パワー $4\pi r^2F$ を計算してはいけません。
<!-- definition-example-end -->

<a id="thm-gr23-luminosity"></a>

<!-- formal-statement-start -->
> **定理（四重極放射の角度分布と総パワー）**  
> [先頭四重極波形](#thm-gr23-quadrupole-wave)の仮定に加え、前述のTT二次エネルギーと時間平均が適用でき、四重極が三階時間微分可能とする。$A_{ij}=I_{ij}^{(3)}(t-r/c)$ とおけば、立体角当たりの放射パワーは
>
$$
\frac{dP}{d\Omega}
=\frac{G}{8\pi c^5}
\left\langle
\Lambda_{ij,kl}(\boldsymbol n)A_{kl}
\Lambda_{ij,mn}(\boldsymbol n)A_{mn}
\right\rangle.
$$
>
> 全方向を積分した正の放射パワーは
>
$$
\boxed{P=\frac{G}{5c^5}
\left\langle I_{ij}^{(3)}I_{ij}^{(3)}\right\rangle}.
$$
>
> $P$ は遠方へ運ばれるエネルギーの時間当たりの量である。孤立系の機械的エネルギー減少率との同一視には、さらに同じ近似次数でのエネルギー収支・反作用の取扱いが必要である。
<!-- formal-statement-end -->

### 証明の見取り図

まず外向き波では $\partial_rh\approx-\dot h/c$ をエネルギー流へ代入します。次に四重極波形を時間微分し、方向依存するTT射影を球面上で積分します。$I_{ii}=0$ を使うことが係数 $1/5$ の核心です。

<!-- proof-start -->
### 証明

$h=r^{-1}H(t-r/c)$ なら $\partial_rh=-r^{-2}H-(cr)^{-1}\dot H$。波動領域では第一項の大きさは第二項の $O(c/(r\Omega))$ なので、主項は $\partial_rh=-\dot h/c$。従って上の $S_r$ から

$$
\langle S_r\rangle
=\frac{c^3}{32\pi G}\langle\dot h_{ij}^{\mathrm{TT}}\dot h_{ij}^{\mathrm{TT}}\rangle.
$$

[四重極波形](#thm-gr23-quadrupole-wave)を $t$ で微分すると

$$
\dot h_{ij}^{\mathrm{TT}}
=\frac{2G}{c^4r}\Lambda_{ij,kl}I_{kl}^{(3)}(t_r).
$$

$P=r^2\int F\,d\Omega$ へ入れ、$c^3(2G)^2/(32\pi Gc^8)=G/(8\pi c^5)$ を得ます。

球面積分を計算します。$P_{ij}=\delta_{ij}-n_in_j$ とし、$A$ を対称・無跡とすると、射影のノルムは

$$
(\Lambda A)_{ij}(\Lambda A)_{ij}
=A_{ij}A_{ij}-2n_i(A^2)_{ij}n_j
+\frac12(n_iA_{ij}n_j)^2.
$$

第1項は $PAP$ を二回縮約する式を展開して得られます。$P^2=P$ と $\operatorname{tr}(PA)=-n_iA_{ij}n_j$ を使うと、$\|\Lambda A\|^2=\operatorname{tr}(PAPA)-[\operatorname{tr}(PA)]^2/2$ となり、表示式へ帰着します。

方向平均には回転対称性から

$$
\int n_in_j\,d\Omega=\frac{4\pi}{3}\delta_{ij},\qquad
\int n_in_jn_kn_l\,d\Omega
=\frac{4\pi}{15}(\delta_{ij}\delta_{kl}+\delta_{ik}\delta_{jl}+\delta_{il}\delta_{jk})
$$

を使います。例えば後者は回転不変な四階テンソルの三つのKronecker積の和と置き、$i=j$、$k=l$ の縮約 $\int|\boldsymbol n|^4\,d\Omega=4\pi$ から係数を決められます。従って

$$
\begin{aligned}
\int(\Lambda A)_{ij}(\Lambda A)_{ij}\,d\Omega
&=4\pi A_{ij}A_{ij}
-\frac{8\pi}{3}A_{ij}A_{ij}
+\frac12\frac{8\pi}{15}A_{ij}A_{ij}\\
&=\frac{8\pi}{5}A_{ij}A_{ij}.
\end{aligned}
$$

$A$ の跡が零のため四階平均の $\delta_{ij}\delta_{kl}$ に比例する項が消えたことに注意します。時間平均と有限の球面積分を交換し、$G/(8\pi c^5)$ を掛ければ $P=G\langle A_{ij}A_{ij}\rangle/(5c^5)$ を得ます。$\square$
<!-- proof-end -->

ここまでで四重極の**三階**時間微分がエネルギー流を決めると分かりました。波形には二階微分、流束にはそれを時間微分したものの二乗が入るためです。$1/r$ の振幅から $1/r^2$ の流束を得るので、球面積 $4\pi r^2$ を掛けた全パワーは遠方距離によらない先頭値になります。

## 5. 円軌道二体系で周波数と係数を確認する

二質点の距離を $a$、合計質量を $M=m_1+m_2$、換算質量を $\mu=m_1m_2/M$ とし、重心原点で相対位置を

$$
\boldsymbol R(t)=a(\cos\Omega t,\sin\Omega t,0)
$$

と置きます。運動がNewtonの円軌道なら $\Omega^2=GM/a^3$ です。これは**質点が自己重力で動く系への低速近似の応用**であり、前節で使った平坦背景の物質テンソルだけの厳密保存仮定をそのまま満たすわけではありません。以下の放射公式は、弱重力・遅い運動についての先頭四重極近似として利用します。厳密な自己重力系の保存エネルギーをここだけで証明したとはしません。

<a id="prop-gr23-circular-binary"></a>

<!-- formal-statement-start -->
> **命題（Newton円軌道二体系の先頭四重極放射）**  
> 二質点 $m_1,m_2>0$ が重心のまわりで半径方向の相対距離 $a$ を一定に保ち、$\Omega^2=GM/a^3$、$a\Omega/c\ll1$、$GM/(ac^2)\ll1$ を満たす円軌道を先頭近似で考える。波は角周波数 $2\Omega$ で放射され、その全パワーは
>
$$
P=\frac{32G}{5c^5}\mu^2a^4\Omega^6
=\frac{32G^4}{5c^5}\frac{\mu^2M^3}{a^5}.
$$
>
> 軌道面法線方向 $+z$ の十分遠い観測者には、適切な位相原点で
>
$$
h_+=-\frac{4G\mu a^2\Omega^2}{c^4r}\cos(2\Omega t_r),\quad
h_\times=-\frac{4G\mu a^2\Omega^2}{c^4r}\sin(2\Omega t_r)
$$
>
> が得られる。これらは高次補正を捨てた式である。
<!-- formal-statement-end -->

### 証明の見取り図

重心条件によって二質点の二次モーメントは相対座標一つに集約されます。$\cos^2\theta$ と $\sin\theta\cos\theta$ を二倍角に直せば、波形の $2\Omega$ と流束の $\Omega^6$ が直接現れます。

<!-- proof-start -->
### 証明

重心を原点に選ぶと位置は $\boldsymbol y_1=(m_2/M)\boldsymbol R$、$\boldsymbol y_2=-(m_1/M)\boldsymbol R$。従って二次モーメントは

$$
\begin{aligned}
Q_{ij}
&=m_1y_{1i}y_{1j}+m_2y_{2i}y_{2j}\\
&=\frac{m_1m_2^2+m_2m_1^2}{M^2}R_iR_j
=\mu R_iR_j.
\end{aligned}
$$

$\operatorname{tr}Q=\mu a^2$ は一定なので、$I_{ij}^{(n)}=Q_{ij}^{(n)}$（$n\ge1$）。二倍角の式で時間変動部分を取り出すと

$$
\begin{aligned}
Q_{xx}&=\tfrac12\mu a^2(1+\cos2\Omega t),\\
Q_{yy}&=\tfrac12\mu a^2(1-\cos2\Omega t),\\
Q_{xy}&=\tfrac12\mu a^2\sin2\Omega t.
\end{aligned}
$$

従って三階微分は

$$
I_{xx}^{(3)}=4\mu a^2\Omega^3\sin2\Omega t,\quad
I_{yy}^{(3)}=-4\mu a^2\Omega^3\sin2\Omega t,\quad
I_{xy}^{(3)}=-4\mu a^2\Omega^3\cos2\Omega t.
$$

対称な非対角成分は $xy$ と $yx$ の二回数えるため、

$$
\begin{aligned}
I_{ij}^{(3)}I_{ij}^{(3)}
&=16\mu^2a^4\Omega^6(2\sin^22\Omega t+2\cos^22\Omega t)\\
&=32\mu^2a^4\Omega^6.
\end{aligned}
$$

[四重極放射パワー](#thm-gr23-luminosity)へ代入して第一の式を得ます。$\Omega^6=(GM/a^3)^3$ により第二の式へ変形します。

$+z$ 方向では[TT射影の成分式](#thm-gr23-quadrupole-wave)を使い、

$$
h_+=\frac{G}{c^4r}(\ddot Q_{xx}-\ddot Q_{yy})
=-\frac{4G\mu a^2\Omega^2}{c^4r}\cos2\Omega t_r,
$$

また $h_\times=2G\ddot Q_{xy}/(c^4r)=-4G\mu a^2\Omega^2\sin2\Omega t_r/(c^4r)$ を得ます。$\square$
<!-- proof-end -->

この二体系で放射パワーが零でないことは、厳密な定常円軌道が放射反作用を受けても永続できるという意味ではありません。短い時間では円軌道を保つ近似が有効で、より長い時間では軌道縮小が現れます。また、放射パワーは**遠方の正のエネルギー流**であり、機械的軌道エネルギーの減少を同じ精度で言うにはバランス則が必要です。

## 6. 演習：保存則・射影・流束を紙上で接続する

### Level A

<a id="ex-gr23-a01"></a>
#### GR23-A01 質量換算と連続の式
- Level: A

$x^0=ct$、$\partial_\mu T^{\mu0}=0$、$T^{0i}=T^{i0}$ とする。$\rho=T^{00}/c^2$、$J^i=T^{0i}/c$ に対する連続の式を求め、$M=\int\rho\,d^3y$ の時間変化を台がコンパクトな場合に計算せよ。

<!-- solution-start -->
**詳細解答。** $\partial_\mu T^{\mu0}=c^{-1}\partial_tT^{00}+\partial_iT^{i0}=0$。$c$ で割れば $c^{-2}\partial_tT^{00}+\partial_i(T^{i0}/c)=0$ だから

$$
\partial_t\rho+\partial_iJ^i=0.
$$

全空間積分すると $\dot M=-\int\partial_iJ^i\,d^3y$。十分大きな球面の外側で $J=0$ なので流束積分は零、従って $\dot M=0$ です。
<!-- solution-end -->

<a id="ex-gr23-a02"></a>
#### GR23-A02 四重極行列を実際に無跡化する
- Level: A

固定時刻の二次モーメント $Q=\operatorname{diag}(3q,q,0)$、$q>0$ について $I=Q-(\operatorname{tr}Q)E/3$ を求め、対称性と跡零を直接確かめよ。$E$ は単位行列とする。

<!-- solution-start -->
**詳細解答。** $\operatorname{tr}Q=4q$ なので

$$
I=\operatorname{diag}(3q-4q/3,q-4q/3,-4q/3)
=\frac q3\operatorname{diag}(5,-1,-4).
$$

対角行列で対称、跡は $q(5-1-4)/3=0$ です。$Q$ と $I$ は同じ次元 $ML^2$ を持ちます。
<!-- solution-end -->

<a id="ex-gr23-a03"></a>
#### GR23-A03 保存則から双極の二階微分まで
- Level: A

保存された局在対称源について $D_i=\int y_i\rho\,d^3y$ と置く。$\dot D_i=\int J_i$ と $\ddot D_i=0$ を、境界項の理由を含めて導け。

<!-- solution-start -->
**詳細解答。** [保存則の時間成分](#thm-gr23-moment-conservation)から $\partial_t\rho=-\partial_kJ^k$。従って $\dot D_i=-\int y_i\partial_kJ^k=\int\delta_{ik}J^k=\int J_i$。境界項 $\oint y_iJ^kn_k\,dS$ は台の外で $J=0$ だから消えます。空間成分 $\partial_tJ_i=-\partial_kT^{ki}$ を代入すると $\ddot D_i=-\int\partial_kT^{ki}=-\oint T^{ki}n_k\,dS=0$ です。
<!-- solution-end -->

<a id="ex-gr23-a04"></a>
#### GR23-A04 観測方向のTT射影
- Level: A

$\boldsymbol n=(0,0,1)$、$A=\operatorname{diag}(a,b,d)$ のとき $\Lambda A$ を計算せよ。$a=b$ なら何が残るか。

<!-- solution-start -->
**詳細解答。** $P=\operatorname{diag}(1,1,0)$ なので $PAP=\operatorname{diag}(a,b,0)$、$\operatorname{tr}(PA)=a+b$。従って

$$
\Lambda A=PAP-\frac12P\operatorname{tr}(PA)
=\frac12\operatorname{diag}(a-b,b-a,0).
$$

$a=b$ なら零です。$d$ の値によらないのは縦方向が射影で消えたためです。単なる三次元の無跡化ではなく横断面の二次元跡を除きます。
<!-- solution-end -->

<a id="ex-gr23-a05"></a>
#### GR23-A05 二つの偏極と流束係数
- Level: A

$+z$ 方向のTT波で $h_+=H\cos\omega(t-z/c)$、$h_\times=K\sin\omega(t-z/c)$ とする。$\langle\dot h_{ij}\dot h_{ij}\rangle$ と $F$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 非零成分は $h_{xx}=h_+$、$h_{yy}=-h_+$、$h_{xy}=h_{yx}=h_\times$。従って $\dot h_{ij}\dot h_{ij}=2\dot h_+^2+2\dot h_\times^2$。微分すると $\dot h_+=-\omega H\sin\omega(t-z/c)$、$\dot h_\times=\omega K\cos\omega(t-z/c)$。それぞれの二乗平均が $\omega^2H^2/2$、$\omega^2K^2/2$ だから

$$
\langle\dot h_{ij}\dot h_{ij}\rangle=\omega^2(H^2+K^2),\qquad
F=\frac{c^3\omega^2}{32\pi G}(H^2+K^2).
$$

非対角成分を二回数えることが重要です。
<!-- solution-end -->

### Level B

<a id="ex-gr23-b01"></a>
#### GR23-B01 四重極恒等式と原点移動
- Level: B

保存された局在対称源について $Q_{ij}=\int\rho y_i y_j$ とする。(1) $\ddot Q_{ij}=2\int T^{ij}$ を再導出し、(2) 原点を一定ベクトル $\boldsymbol b$ だけ移したとき $\ddot Q'_{ij}=\ddot Q_{ij}$ を示せ。

<!-- solution-start -->
**詳細解答。** (1) $\partial_t\rho=-\partial_kJ^k$ を一回使い、

$$
\dot Q_{ij}=\int(y_iJ_j+y_jJ_i)\,d^3y.
$$

$\partial_tJ_i=-\partial_kT^{ki}$ を次に代入し、$y_j$ の空間微分で $\delta_{kj}$ が出るので

$$
\ddot Q_{ij}=\int(T^{ji}+T^{ij})\,d^3y
=2\int T^{ij}\,d^3y.
$$

台がコンパクトだから二度の部分積分の表面項は零です。(2) $y'_i=y_i-b_i$ なので

$$
Q'_{ij}=\int\rho(y_i-b_i)(y_j-b_j)\,d^3y
=Q_{ij}-b_iD_j-b_jD_i+b_ib_jM.
$$

二階微分すると、[保存則による $\ddot D=0$ と $\dot M=0$](#thm-gr23-moment-conservation)から $\ddot Q'_{ij}=\ddot Q_{ij}$ です。
<!-- solution-end -->

<a id="ex-gr23-b02"></a>
#### GR23-B02 方向積分の $1/5$ を独立に計算する
- Level: B

対称無跡行列 $A$ と単位ベクトル $\boldsymbol n$ に対し $\Lambda A=PAP-P\operatorname{tr}(PA)/2$ とする。単位球面上の方向ベクトルの二次・四次積分を用い、$\int\|\Lambda A\|^2d\Omega=8\pi\|A\|^2/5$ を示せ。

<!-- solution-start -->
**詳細解答。** $P=E-\boldsymbol n\boldsymbol n^\mathsf T$、$P^2=P$ だから

$$
\|\Lambda A\|^2=\operatorname{tr}(PAPA)-\frac12[\operatorname{tr}(PA)]^2.
$$

$\operatorname{tr}A=0$、$\operatorname{tr}(PA)=-n_iA_{ij}n_j$ であり、

$$
\operatorname{tr}(PAPA)=A_{ij}A_{ij}-2n_i(A^2)_{ij}n_j+(n_iA_{ij}n_j)^2.
$$

二次平均から第二項を積分すると $-8\pi\operatorname{tr}(A^2)/3$。四次平均に $A_{ij}A_{kl}$ を掛けると、跡を含む項は零、他の二項で $8\pi\operatorname{tr}(A^2)/15$。全体として

$$
4\pi-\frac{8\pi}{3}+\frac{4\pi}{15}
=\frac{8\pi}{5}
$$

が $\operatorname{tr}(A^2)$ の係数です。
<!-- solution-end -->

<a id="ex-gr23-b03"></a>
#### GR23-B03 伸縮する質点配置の波形と非放射成分
- Level: B

時刻ごとの位置 $\boldsymbol y_\pm=(\pm s(t),0,0)$ に同質量 $m$ を置いた配置の二次モーメントを形式的に計算し、$z$ 方向の先頭TT波形を $s(t)$ で表せ。またこの配置だけで、[保存された線形源の定理](#thm-gr23-quadrupole-wave)の仮定を満たすと言えるか判定せよ。

<!-- solution-start -->
**詳細解答。** $Q_{xx}=2ms^2$、他成分零であり、$I_{xx}=4ms^2/3$、$I_{yy}=I_{zz}=-2ms^2/3$。$z$ 方向では

$$
h_+=\frac{G}{c^4r}(\ddot I_{xx}-\ddot I_{yy})
=\frac{2Gm}{c^4r}\frac{d^2(s^2)}{dt^2}
=\frac{4Gm}{c^4r}(\dot s^2+s\ddot s),
\qquad h_\times=0.
$$

ただし加速度を持つ二質点の物質応力だけで平坦背景の $\partial_\mu T^{\mu\nu}=0$ は一般には成立しません。質点を駆動する装置・内部応力も含めて保存された源を作るか、適切な弱重力近似を別に正当化する必要があります。この式はその条件の下での先頭近似という意味です。
<!-- solution-end -->

<a id="ex-gr23-b04"></a>
#### GR23-B04 低速・遠方・波動領域を数値で見分ける
- Level: B

源の大きさ $a$、波長尺度 $\lambda=c/\Omega$、距離 $r$ の組が (i) $a=1,\lambda=100,r=10^4$ と (ii) $a=1,\lambda=0.1,r=10^4$（共通の長さ単位）の二例で、$a/r$、$a/\lambda$、$\lambda/r$ を求め、先頭四重極式の使用可否を判定せよ。

<!-- solution-start -->
**詳細解答。** (i) では $a/r=10^{-4}$、$a/\lambda=10^{-2}$、$\lambda/r=10^{-2}$ です。遠方・低速源・波動領域の三条件をともに満たす良い尺度分離です。(ii) は $a/r=10^{-4}$ ですが、$a/\lambda=10$、$\lambda/r=10^{-5}$。遠方および波動領域にはありますが、源内の遅延時刻を同じ $t_r$ に揃える近似が破綻します。$1/r$ の遠方展開が正しいことだけで四重極近似が正当化されたとは言えません。
<!-- solution-end -->

### Level C

<a id="ex-gr23-c01"></a>
#### GR23-C01 円軌道の四重極・偏極・全パワーをつなぐ
- Level: C

質量 $m_1,m_2>0$、相対距離 $a$、換算質量 $\mu=m_1m_2/(m_1+m_2)$、角速度 $\Omega$ の重心円軌道を弱重力・低速の先頭近似で考える。

1. 二次モーメントを相対位置で表せ。
2. $z$ 方向の二偏極を求めよ。
3. 全方向の放射パワーを計算し、$\Omega^2=G(m_1+m_2)/a^3$ を用いて質量と距離の式に直せ。
4. この近似を「平坦背景の物質二質点だけが厳密に保存する」として証明してはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答。** (1) 重心条件 $m_1\boldsymbol y_1+m_2\boldsymbol y_2=0$ と $\boldsymbol y_1-\boldsymbol y_2=\boldsymbol R$ を解くと $\boldsymbol y_1=(m_2/M)\boldsymbol R$、$\boldsymbol y_2=-(m_1/M)\boldsymbol R$。従って $Q_{ij}=\mu R_iR_j$。

(2) $\boldsymbol R=a(\cos\Omega t,\sin\Omega t,0)$ から

$$
Q_{xx}-Q_{yy}=\mu a^2\cos2\Omega t,\qquad
Q_{xy}=\frac12\mu a^2\sin2\Omega t.
$$

二階微分し、[観測方向が $z$ の四重極波形](#thm-gr23-quadrupole-wave)に代入すると

$$
h_+=-\frac{4G\mu a^2\Omega^2}{c^4r}\cos2\Omega t_r,\qquad
h_\times=-\frac{4G\mu a^2\Omega^2}{c^4r}\sin2\Omega t_r.
$$

(3) 跡 $\mu a^2$ は定数なので三階微分は $I^{(3)}=Q^{(3)}$。各成分は $I_{xx}^{(3)}=4\mu a^2\Omega^3\sin2\Omega t$、$I_{yy}^{(3)}=-I_{xx}^{(3)}$、$I_{xy}^{(3)}=-4\mu a^2\Omega^3\cos2\Omega t$。非対角を二回数えて

$$
I_{ij}^{(3)}I_{ij}^{(3)}
=32\mu^2a^4\Omega^6.
$$

[全パワー定理](#thm-gr23-luminosity)を使えば $P=32G\mu^2a^4\Omega^6/(5c^5)$。$\Omega^6=G^3M^3/a^9$ なので $P=32G^4\mu^2M^3/(5c^5a^5)$ です。

(4) 加速する点質量の物質エネルギー運動量テンソルだけなら $\partial_\mu T^{\mu i}$ は一般に零でなく、内力や重力場の寄与を無視できません。Newton円軌道を四重極へ代入するのは、弱い自己重力のもとで整合する最低次の放射近似です。またそのパワーを軌道エネルギーの時間微分へ同定するには同じ近似次数のバランス則が要ります。
<!-- solution-end -->
