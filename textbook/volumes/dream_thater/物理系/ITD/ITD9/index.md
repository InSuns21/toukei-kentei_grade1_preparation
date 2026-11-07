# ITD9 自律的な情報流：二部分系の第二法則と定常熱流

[ITD4の測定・フィードバック](../ITD4/index.md#thm-itd4-feedback-work-bound)では、観測結果を記憶してから制御を切り替えました。しかし実際のセンサーは対象と同時に動き続けます。「測る時刻」と「利用する時刻」を区切れない場合、**相関がいつ作られ、いつ失われたか**をどう数えればよいでしょうか。

[ITD6の結合系の収支](../ITD6/index.md#thm-itd6-joint-balance)は系と記憶を一つの装置として扱います。本章では一歩進み、二つの部分系 $X,Y$ のどちらが状態を変えたかによって、相互情報量の変化を二つの**情報流**へ分けます。これは[ITD8の確率流](../ITD8/index.md#def-itd8-flux-activity)を二部分系へ拡張する有限状態計算です。

熱は浴へ出る向きを正とし、温度 $T_X,T_Y>0$、逆温度 $\beta_X=(k_{\mathrm B}T_X)^{-1}$、$\beta_Y=(k_{\mathrm B}T_Y)^{-1}$ を用います。対数は自然対数、Shannonエントロピー $H$、相互情報量 $I$、エントロピー生成 $\Sigma$ は無次元（nat）です。率は単位時間当たり、以下の情報流も nat/時間です。

## 1. 二つが同時には跳ばない確率模型

センサーを $Y$、観測される系を $X$ とします。状態は組 $(x,y)$ です。短時間で $X$ だけが $x\to x'$ と変わる場合と、$Y$ だけが $y\to y'$ と変わる場合を別々に数えます。このようにジャンプを分けても、二つが独立という意味にはなりません。$X$ の率は現在の $y$ に、$Y$ の率は現在の $x$ に依存してよいのです。

有限集合 $S_X,S_Y$ には全順序を一つずつ固定します。時刻 $t\in[0,\tau]$ の結合分布 $p_t(x,y)$ は常に正、各許容辺の両方向の率も正とします。非許容辺は両方向とも零です。率は区分的連続、分布は絶対連続で、以下の有限和・時間積分が存在すると仮定します。許容辺の向き付き確率流を一度だけ数えるため $x<x'$ または $y<y'$ を使います。

固定した時刻の式では $p_{xy}=p_t(x,y)$ と略し、率と流の引数 $t$ も必要な場合以外は省きます。上点 $\dot p_t(x,y)=dp_t(x,y)/dt$ は時間 $t$ に関する微分で、$x,y$ は微分中に動かさない状態ラベルです。絶対連続性によりこの微分はほとんどすべての時刻で存在します。これは[ITD8の確率流とmaster方程式](../ITD8/index.md#def-itd8-flux-activity)を状態の組へ拡張した記法です。

<a id="def-itd9-bipartite-jumps"></a>

<!-- formal-statement-start -->
> **定義（二部分系ジャンプ模型と部分確率流）**  
> 有限状態集合 $S_X,S_Y$ 上の正の結合分布 $p_t(x,y)$ が、$X$ だけのジャンプ率 $w^y_{xx'}(t)$ と $Y$ だけのジャンプ率 $v^x_{yy'}(t)$ による連続時間Markov過程に従うとする。$x<x'$ および $y<y'$ の各許容辺の正味流を

$$
\begin{aligned}
J^X_{xx'}(y)&=p_t(x,y)w^y_{xx'}-p_t(x',y)w^y_{x'x},\\
J^Y_{yy'}(x)&=p_t(x,y)v^x_{yy'}-p_t(x,y')v^x_{y'y}
\end{aligned}
$$

> と定める。$X$ 以外は固定されたまま $X$ が跳ぶものを $X$ 遷移、同様に $Y$ のみが跳ぶものを $Y$ 遷移と呼ぶ。結合分布はmaster方程式

$$
\begin{aligned}
\dot p_t(x,y)
={}&\sum_{x'\ne x}\{p_t(x',y)w^y_{x'x}-p_t(x,y)w^y_{xx'}\}\\
&+\sum_{y'\ne y}\{p_t(x,y')v^x_{y'y}-p_t(x,y)v^x_{yy'}\}
\end{aligned}
$$

> を満たす。率が零の項は和から除き、微分は存在する時刻で考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd9-bipartite-jumps -->
### 直接例：四状態で辺を区別する

**定義の確認**：各ジャンプは一方の値だけを変更し、変わらないもう一方の値を固定した辺で前向き・逆向きの確率流量を差し引きます。

$S_X=S_Y=\{0,1\}$ とし、ある時刻の確率表を $p_{00}=p_{11}=3/8$、$p_{01}=p_{10}=1/8$ とします。全成分は正で、和は $2(3/8)+2(1/8)=1$ です。$X$ の許容反転率をすべて1、$Y$ の許容反転率をすべて2とし、両方向とも正とします。$y=0$ で $X:0\to1$ の流は

$$
J^X_{01}(0)=p_{00}\cdot1-p_{10}\cdot1=\frac14,
$$

$Y:0\to1$ の流では $y$ が変わり、代わりに $x$ を固定する必要があります。$x=0$ を固定すれば

$$
J^Y_{01}(0)=p_{00}\cdot2-p_{01}\cdot2=\frac12.
$$

残りの辺は $J^X_{01}(1)=-1/4$、$J^Y_{01}(1)=-1/2$ です。例えば時刻0の初期分布をこの確率表とすると、各辺の出発セルから $J$ を引き、到着セルへ足すmaster方程式は

$$
\begin{aligned}
\dot p_{00}&=-J^X_{01}(0)-J^Y_{01}(0)=-\frac34,\\
\dot p_{10}&= J^X_{01}(0)-J^Y_{01}(1)=\frac34,\\
\dot p_{01}&=-J^X_{01}(1)+J^Y_{01}(0)=\frac34,\\
\dot p_{11}&= J^X_{01}(1)+J^Y_{01}(1)=-\frac34.
\end{aligned}
$$

四つの変化率の和は零で、確率の正規化を保ちます。流の符号も各セルへの流入・流出と一致します。こうして、**どちらを固定した辺か**、双方向正率、正の分布、master方程式という定義の条件を、初期時刻でそれぞれ確認できました。
<!-- definition-example-end -->

以後、周辺分布を $p_X(x)=\sum_y p(x,y)$、$p_Y(y)=\sum_x p(x,y)$ と書きます。$X$ 遷移は $p_Y(y)$ を変えません。例えば $x<x'$ の辺は $p(x,y)$ に $-J^X$、$p(x',y)$ に $+J^X$ を加えますが、二項を $x$ について足すと相殺します。この単純な事実が情報流の分解を支えます。

## 2. 相互情報量の増減を誰が起こしたか

[INFO2の相互情報量と相対エントロピーの関係](../../../応用系/INFO/INFO2/index.md#thm-info2-mutual-kl)は二つの確率変数の依存の強さを数えます。INFO2の底2の情報量に $\ln2$ を掛けてnatへ換算し、ここでは[ITD6の結合分布の分解](../ITD6/index.md#prop-itd6-joint-free-energy)と同じく

$$
I(X;Y)=\sum_{x,y}p(x,y)\log\frac{p(x,y)}{p_X(x)p_Y(y)}
=H(p_X)+H(p_Y)-H(p)
$$

と書きます。$p(x,y)>0$ のため、条件付き確率 $p(y\mid x)=p(x,y)/p_X(x)$ と $p(x\mid y)=p(x,y)/p_Y(y)$ はすべて定義できます。

同じ相互情報量でも、「$X$ が跳んだことによる変化」と「$Y$ が跳んだことによる変化」は異なります。$X$ の辺では $y$ を固定し、遷移前後の条件付き確率 $p(y\mid x)$ を比較すれば、相関への影響を直接測れます。

以下の $\dot I^X,\dot I^Y$ の上点はどちらも単位時間当たりの寄与を表し、上付きの $X,Y$ は**どちらが跳んだか**の印です。$X,Y$ で微分する記号ではありません。全体の相互情報量の時間微分 $dI(X_t;Y_t)/dt$ と、この二つの寄与との関係を次の定理で確かめます。

<a id="def-itd9-information-flow"></a>

<!-- formal-statement-start -->
> **定義（部分系の情報流）**  
> 正の結合分布を持つ有限二部分系ジャンプ模型の許容辺で、$X$ 遷移と $Y$ 遷移が相互情報量に与える瞬間寄与を、それぞれ

$$
\begin{aligned}
\dot I^X
&=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)
 \log\frac{p(y\mid x')}{p(y\mid x)},\\
\dot I^Y
&=\sum_{\substack{y<y'\\x}}J^Y_{yy'}(x)
 \log\frac{p(x\mid y')}{p(x\mid y)}
\end{aligned}
$$

> と定義する。各和は許容辺だけについて取る。正の $\dot I^X$ は $X$ 遷移が相関を増やし、負なら減らすことを意味する。$\dot I^Y$ についても同様である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd9-information-flow -->
### 直接例：相関した二値系の $X$ が跳ぶ

**定義の確認**：固定した $y$ に対し、遷移前後の $x$ における $p(y\mid x)$ の比を使い、二本の正味流の符号を保って加えます。

先ほどの結合分布で、$X$ の遷移率を両方向とも1に固定します。周辺分布はどちらも $(1/2,1/2)$ なので

$$
p(y=0\mid x=0)=\frac34,\qquad
p(y=0\mid x=1)=\frac14.
$$

$y=0$ の $X:0\to1$ の正味流は $+1/4$、$y=1$ では $-1/4$ です。$y=1$ の条件付き確率は順に $1/4,3/4$ ですから

$$
\dot I^X=\frac14\log\frac{1/4}{3/4}
-\frac14\log\frac{3/4}{1/4}
=-\frac12\log3.
$$

正の率なのに情報流が負になるのは矛盾ではありません。$X$ が無作為に反転すると、$X$ と $Y$ の一致・不一致から $Y$ を予測しにくくなるためです。定義の対数の向きと、二本の辺の符号を両方確認しました。
<!-- definition-example-end -->

<a id="thm-itd9-information-decomposition"></a>

<!-- formal-statement-start -->
> **定理（相互情報量の時間変化の分解）**  
> 時間依存の正の結合分布 $p_t(x,y)$ が、有限状態・片方だけが跳ぶmaster方程式と上記の正則性を満たすとする。このとき

$$
\frac{d}{dt}I(X_t;Y_t)=\dot I^X(t)+\dot I^Y(t).
$$

> さらに $X$ 遷移だけによる結合エントロピーの変化率を $\dot H_{XY}^X$、$X$ 周辺の変化率を $\dot H_X$ と書くと

$$
\dot I^X=\dot H_X-\dot H_{XY}^X,\qquad
\dot I^Y=\dot H_Y-\dot H_{XY}^Y.
$$

> ただし $\dot H_{XY}^X+\dot H_{XY}^Y=dH(p_t)/dt$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各辺の流は「出発状態から確率を引き、到着状態へ足す」という形です。情報量の定義を微分した後、この二項を組にすると、条件付き確率の対数比が現れます。

<!-- proof-start -->
### 証明

有限和を微分でき、確率の全和が1であるため $\sum_{xy}\dot p_{xy}=\sum_x\dot p_X(x)=\sum_y\dot p_Y(y)=0$ です。よって積の微分に現れる $+1$ の項は消え、

$$
\begin{aligned}
\frac{dI}{dt}
&=\frac{d}{dt}\left\{
\sum_{xy}p_{xy}\log p_{xy}
-\sum_xp_X(x)\log p_X(x)
-\sum_yp_Y(y)\log p_Y(y)\right\}\\
&=\sum_{xy}\dot p_{xy}
\log\frac{p_{xy}}{p_X(x)p_Y(y)}.
\end{aligned}
$$

$X$ の一本の辺 $(x,y)\to(x',y)$ による $\dot p_{xy}$ への寄与は $-J^X_{xx'}(y)$、$\dot p_{x'y}$ への寄与は $+J^X_{xx'}(y)$ です。この二項を直前の和に代入すると

$$
\begin{aligned}
J^X_{xx'}(y)
\left\{
\log\frac{p_{x'y}}{p_X(x')p_Y(y)}
-\log\frac{p_{xy}}{p_X(x)p_Y(y)}
\right\}
&=J^X_{xx'}(y)\log
\frac{p_{x'y}/p_X(x')}{p_{xy}/p_X(x)}\\
&=J^X_{xx'}(y)\log\frac{p(y\mid x')}{p(y\mid x)}.
\end{aligned}
$$

すべての $X$ 辺を足すと $\dot I^X$ です。$Y$ 辺でも $x$ を固定して同じ計算を行うと $\dot I^Y$ となり、両方の和が全微分です。

次に、$X$ 辺による結合エントロピーの変化は

$$
\dot H_{XY}^X
=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)\log\frac{p_{xy}}{p_{x'y}},
$$

$X$ 周辺では $X$ 辺だけが働くので

$$
\dot H_X
=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)\log\frac{p_X(x)}{p_X(x')}.
$$

差を取った各辺の項は

$$
J^X_{xx'}(y)\log
\frac{p_X(x)p_{x'y}}{p_X(x')p_{xy}}
=J^X_{xx'}(y)\log\frac{p(y\mid x')}{p(y\mid x)}
$$

となるので、第一の等式を得ます。$Y$ 側も同じ二項展開で証明できます。結合エントロピーの全微分はmaster方程式の二種類の辺を足したものです。
<!-- proof-end -->

情報流は $I$ そのものと異なり、負にも正にもなります。定常状態でも $\dot I^X$ と $\dot I^Y$ が相殺して $dI/dt=0$ となり得ます。この場合、相関が「不変」だからといって、それを作り直す操作が存在しないわけではありません。

## 3. 情報の寄与を入れた部分系の第二法則

[ITD7の浴ラベル付き熱](../ITD7/index.md#def-itd7-labeled-jump)と同様、エネルギー $E(x,y)$ は時間に依存しないものとします。$X$ の遷移でやり取りする熱は $X$ 浴だけが、$Y$ の遷移では $Y$ 浴だけが担い、浴へ出た熱を正に取ります。外部操作による仕事や化学駆動はありません。各許容辺に、正逆の率比を浴熱と結ぶ[ITD1の局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を、それぞれの浴について

$$
\begin{aligned}
\log\frac{w^y_{xx'}}{w^y_{x'x}}
&=\beta_X\{E(x,y)-E(x',y)\},\\
\log\frac{v^x_{yy'}}{v^x_{y'y}}
&=\beta_Y\{E(x,y)-E(x,y')\}
\end{aligned}
$$

を仮定します。温度は二つの浴で異なってよく、率が状態に依存すること自体はこの仮定と矛盾しません。熱率を

$$
\begin{aligned}
\dot Q_{\mathrm{bath},X}
&=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)
\{E(x,y)-E(x',y)\},\\
\dot Q_{\mathrm{bath},Y}
&=\sum_{\substack{y<y'\\x}}J^Y_{yy'}(x)
\{E(x,y)-E(x,y')\}
\end{aligned}
$$

と置きます。この符号では $\dot Q_{\mathrm{bath},X}<0$ は $X$ 浴から装置へ熱が入っていることです。

<a id="thm-itd9-partial-second-law"></a>

<!-- formal-statement-start -->
> **定理（情報流を含む部分系の第二法則）**  
> 有限状態の二部分系ジャンプ模型で、全時刻の結合確率と許容辺の双方向率が正、エネルギー $E(x,y)$ が時間に依存せず、$X$ 辺と $Y$ 辺がそれぞれ逆温度 $\beta_X,\beta_Y>0$ の浴に対し直前の局所詳細釣合いを満たすとする。条件付き確率から定義した情報流 $\dot I^X,\dot I^Y$ と浴への平均熱率を用いると

$$
\begin{aligned}
\sigma_X
&=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)
\log\frac{p_{xy}w^y_{xx'}}{p_{x'y}w^y_{x'x}}
=\dot H_X+\beta_X\dot Q_{\mathrm{bath},X}-\dot I^X\ge0,\\
\sigma_Y
&=\sum_{\substack{y<y'\\x}}J^Y_{yy'}(x)
\log\frac{p_{xy}v^x_{yy'}}{p_{xy'}v^x_{y'y}}
=\dot H_Y+\beta_Y\dot Q_{\mathrm{bath},Y}-\dot I^Y\ge0.
\end{aligned}
$$

> また、結合系の平均内部エネルギー $U=\sum_{xy}p_{xy}E(x,y)$ と全エントロピー生成率について

$$
\dot U=-\dot Q_{\mathrm{bath},X}-\dot Q_{\mathrm{bath},Y},
\qquad
\sigma_X+\sigma_Y
=\dot H(p)+\beta_X\dot Q_{\mathrm{bath},X}
+\beta_Y\dot Q_{\mathrm{bath},Y}\ge0.
$$

> 各 $\sigma$ が零となるのは、その部分系のすべての許容辺で前向き・逆向きの確率流量が等しいときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

各向きの確率流量 $a,b$ の差と対数比による散逸は[ITD8の瞬間エントロピー生成率](../ITD8/index.md#thm-itd8-entropy-rate)と同型です。ただし結合系のエントロピーのうち $X$ 辺が作る部分を、[相互情報量の時間変化の分解](#thm-itd9-information-decomposition)によって「$X$ 周辺の変化 − 情報流」に読み替えます。

<!-- proof-start -->
### 証明

$X$ の各辺で $a=p_{xy}w^y_{xx'}>0$、$b=p_{x'y}w^y_{x'x}>0$ と書くと $J^X=a-b$ です。単調増加する対数から $(a-b)\log(a/b)\ge0$、等号は $a=b$ のときだけです。有限和を足した $\sigma_X$ も非負です。

対数の積を展開して、局所詳細釣合いを二項目に代入します。

$$
\begin{aligned}
\sigma_X
&=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)
\left\{\log\frac{p_{xy}}{p_{x'y}}+\log\frac{w^y_{xx'}}{w^y_{x'x}}\right\}\\
&=\dot H_{XY}^X+
\beta_X\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)\{E(x,y)-E(x',y)\}\\
&=\dot H_{XY}^X+\beta_X\dot Q_{\mathrm{bath},X}\\
&=\dot H_X-\dot I^X+\beta_X\dot Q_{\mathrm{bath},X}.
\end{aligned}
$$

最後の行は[相互情報量の時間変化の分解](#thm-itd9-information-decomposition)の $\dot I^X=\dot H_X-\dot H_{XY}^X$ を代入しました。$Y$ の式も各 $y<y'$ 辺で $x$ を固定して同じ対数展開を行えば得られます。

固定された $E$ の期待値の微分へmaster方程式を入れると、$X$ 辺の寄与は

$$
J^X_{xx'}(y)\{E(x',y)-E(x,y)\}
$$

となり、これを全辺で足すと $-\dot Q_{\mathrm{bath},X}$ です。$Y$ 辺も同様なので第一法則を得ます。さらに二つの $\sigma$ の式を足し、[相互情報量の時間変化の分解](#thm-itd9-information-decomposition)と $I=H_X+H_Y-H_{XY}$ の微分を使えば

$$
\dot H_X+\dot H_Y-(\dot I^X+\dot I^Y)
=\dot H_X+\dot H_Y-\dot I
=\dot H_{XY}
$$

となって全系の式を得ます。等号条件はすべての辺の非負項が一つずつ零になる条件です。
<!-- proof-end -->

見かけ上の量 $\dot H_X+\beta_X\dot Q_{\mathrm{bath},X}$ が負であっても、[部分系の第二法則](#thm-itd9-partial-second-law)には必ず $-\dot I^X$ があります。$Y$ との相関を消費しているなら $\dot I^X<0$ です。ただし、**負の浴熱はそれだけで仕事を取り出したことではありません**。本章では外部仕事のない固定エネルギー模型を考えています。

<a id="cor-itd9-information-bound"></a>

<!-- formal-statement-start -->
> **系（有限時間と定常状態の情報流不等式）**  
> [部分系の第二法則](#thm-itd9-partial-second-law)の仮定が $[0,\tau]$ で成り立ち、必要な積分が有限とする。$X$ 浴への積算熱 $Q_{\mathrm{bath},X}=\int_0^\tau\dot Q_{\mathrm{bath},X}\,dt$、積算情報流 $\mathcal I^X=\int_0^\tau\dot I^X\,dt$ を用いると

$$
\Delta H_X+\beta_XQ_{\mathrm{bath},X}-\mathcal I^X\ge0.
$$

> 時間に依存しない定常分布では $\dot H_X=\dot H_Y=\dot I=0$ なので

$$
\beta_X\dot Q_{\mathrm{bath},X}\ge\dot I^X=-\dot I^Y,
\qquad
\beta_Y\dot Q_{\mathrm{bath},Y}\ge\dot I^Y.
$$
<!-- formal-statement-end -->

### 証明の見取り図

部分系の不等式を時間積分します。定常分布では周辺エントロピーも相互情報量も時間変化しませんが、二つの情報流それぞれが零になるとは限りません。

<!-- proof-start -->
### 証明

$\sigma_X(t)\ge0$ を $0$ から $\tau$ まで積分すると

$$
0\le\int_0^\tau\sigma_X\,dt
=\underbrace{\int_0^\tau\dot H_X\,dt}_{H_X(\tau)-H_X(0)}
+\beta_XQ_{\mathrm{bath},X}-\mathcal I^X
$$

となり、初めの不等式を得ます。定常時は $\dot p_{xy}=0$ なので周辺分布も相互情報量も一定で、$\dot H_X=\dot H_Y=dI/dt=0$ です。[相互情報量の時間変化の分解](#thm-itd9-information-decomposition)から $\dot I^X+\dot I^Y=0$。これを $\sigma_X,\sigma_Y\ge0$ の二式に代入し、各浴熱率について移項すれば定常時の二つの不等式を得ます。
<!-- proof-end -->

例えば定常時に $X$ 浴から熱を受け取る $\dot Q_{\mathrm{bath},X}<0$ には、必ず $\dot I^X<0$ が必要です。しかし情報消費だけで装置の全仕事収支が決まるわけではなく、$Y$ の浴とエネルギー収支も確かめなければなりません。

## 4. 四状態で情報を作り直す熱浴

ここでは「相互情報量は一定なのに情報流は非零」という状態を、外部の時刻依存制御を使わずに作ります。$X,Y$ はどちらもビットで、**一致状態** $(0,0),(1,1)$ のエネルギーを $-\varepsilon$、**不一致状態** $(0,1),(1,0)$ を $0$ とし、$\varepsilon>0$ とします。つまり一致はエネルギー的に有利です。

各ビットを反転させる率を、現在の状態が一致なら1、不一致なら $X$ 反転は2、$Y$ 反転は4（いずれも単位時間当たり）とします。$X$ は高温浴（$\beta_X\varepsilon=\log2$）、$Y$ は低温浴（$\beta_Y\varepsilon=\log4$）に接します。一致→不一致のエネルギー上昇が $\varepsilon$ だから、前後率比 $1/2$ と $1/4$ は各浴の局所詳細釣合いに一致します。

<a id="prop-itd9-four-state-steady"></a>

<!-- formal-statement-start -->
> **命題（二浴四状態の自律的情報流と熱収支）**  
> $S_X=S_Y=\{0,1\}$、$E(0,0)=E(1,1)=-\varepsilon$、$E(0,1)=E(1,0)=0$（$\varepsilon>0$）とする。一致状態から不一致状態への $X,Y$ の反転率はともに1、逆向きの $X$ 反転率は2、$Y$ 反転率は4とし、$\beta_X\varepsilon=\log2,\ \beta_Y\varepsilon=\log4$ とする。この二部分系ジャンプ模型には正の定常分布

$$
p_{00}=p_{11}=\frac38,\qquad
p_{01}=p_{10}=\frac18
$$

> があり、この分布で情報流と浴熱率は

$$
\dot I^X=-\frac14\log3,\quad
\dot I^Y=\frac14\log3,\quad
\dot Q_{\mathrm{bath},X}=-\frac{\varepsilon}{4},\quad
\dot Q_{\mathrm{bath},Y}=\frac{\varepsilon}{4}.
$$

> 部分エントロピー生成率は

$$
\sigma_X=\frac14\log\frac32>0,\quad
\sigma_Y=\frac14\log\frac43>0,\quad
\sigma_X+\sigma_Y=\frac14\log2>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一致状態の確率を $a$、不一致を $b$ と置きます。各一致状態から出る率の和は2、各一致状態へ入る不一致状態からの確率流は $(2+4)b$ です。従って $a=3b$ が定常条件となります。情報流は条件付き確率比 $3$、熱は各辺の $-\varepsilon$ または $+\varepsilon$ を使って数えます。

<!-- proof-start -->
### 証明

対称性から $p_{00}=p_{11}=a$、$p_{01}=p_{10}=b$ を候補に取ります。各一致状態のmaster方程式は

$$
\dot a=-a\cdot1-a\cdot1+b\cdot2+b\cdot4=-2a+6b.
$$

不一致状態の式は逆符号であり、$\dot a=\dot b=0$ は $a=3b$ と同値です。正規化 $2a+2b=1$ から $a=3/8,b=1/8$、全成分が正で、4本の方程式を満たします。

$X$ 辺 $y=0$ の $0\to1$ の正味流は $a\cdot1-b\cdot2=1/8$、$y=1$ の同じ向きは $b\cdot2-a\cdot1=-1/8$。$Y$ 辺 $x=0$ の $0\to1$ は $a\cdot1-b\cdot4=-1/8$、$x=1$ は $b\cdot4-a\cdot1=1/8$ です。

周辺分布はどちらも $(1/2,1/2)$ で、条件付き確率は $p(y=x\mid x)=3/4$、$p(y\ne x\mid x)=1/4$ です。従って[情報流の定義](#def-itd9-information-flow)へ4辺を代入して

$$
\begin{aligned}
\dot I^X
&=\frac18\log\frac{1/4}{3/4}
-\frac18\log\frac{3/4}{1/4}
=-\frac14\log3,\\
\dot I^Y
&=-\frac18\log\frac{1/4}{3/4}
+\frac18\log\frac{3/4}{1/4}
=\frac14\log3.
\end{aligned}
$$

$X$ には一致→不一致の正味流が二本それぞれ $1/8$ あります。その方向で浴へ出た熱は $-\varepsilon$ です。$Y$ には不一致→一致の正味流が二本それぞれ $1/8$ あり、浴へ出た熱は $+\varepsilon$ です。よって

$$
\dot Q_{\mathrm{bath},X}=2\cdot\frac18(-\varepsilon)=-\frac{\varepsilon}{4},
\qquad
\dot Q_{\mathrm{bath},Y}=2\cdot\frac18(+\varepsilon)=\frac{\varepsilon}{4}.
$$

定常なので $\dot H_X=\dot H_Y=0$。[部分系の第二法則](#thm-itd9-partial-second-law)へ $\beta_X\varepsilon=\log2$ と $\beta_Y\varepsilon=\log4$ を代入し

$$
\begin{aligned}
\sigma_X&=-\frac14\log2+\frac14\log3=\frac14\log(3/2),\\
\sigma_Y&=\frac14\log4-\frac14\log3=\frac14\log(4/3),\\
\sigma_X+\sigma_Y&=\frac14\log\{(3/2)(4/3)\}=\frac14\log2.
\end{aligned}
$$

これは流量比からの独立計算とも一致します。例えば $X$ の各正味流方向の前向き量は $a=3/8$、逆向き量は $2b=1/4$ であるため、各辺の非負項は $(1/8)\log(3/2)$ です。$Y$ の各正味流方向では前向き $4b=1/2$、逆向き $a=3/8$ なので $(1/8)\log(4/3)$ です。
<!-- proof-end -->

$Y$ は相関を作り直し（$\dot I^Y>0$）、$X$ はその相関を壊します（$\dot I^X<0$）。しかし全系のエネルギーは定常で、熱は高温側から低温側へ流れるだけです。「情報を利用する」と「外部へ正味の仕事を出す」は別の主張です。

## 5. 単一浴なら定常の情報流は残るか

温度差がなければ、同じ固定エネルギーから定常状態で熱を流し続ける源がありません。この模型では、両浴が同温なら一つの平衡浴とみなせます。ただし、これは**二部分系の全遷移が同じエネルギーに対する局所詳細釣合いに従い、別の駆動を含まない場合**に限ります。

<a id="prop-itd9-one-bath-no-flow"></a>

<!-- formal-statement-start -->
> **命題（単一浴の定常状態では情報流が消える）**  
> [部分系の第二法則](#thm-itd9-partial-second-law)の有限状態・正の分布・正の双方向率・固定エネルギー・局所詳細釣合いを仮定し、さらに $\beta_X=\beta_Y=\beta>0$ とする。分布が定常なら全許容辺の正味確率流は零であり、$\dot I^X=\dot I^Y=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

定常分布では結合エントロピーと平均エネルギーは時間変化しません。従って浴熱の総和も零です。全エントロピー生成は零ですが、各辺の寄与は非負なので、すべての流が零になります。

<!-- proof-start -->
### 証明

定常性より $\dot U=\dot H(p)=0$ です。[部分系の第二法則](#thm-itd9-partial-second-law)の第一法則は $\dot Q_{\mathrm{bath},X}+\dot Q_{\mathrm{bath},Y}=0$ を与えます。従って共通逆温度 $\beta$ を使うと

$$
\sigma_X+\sigma_Y
=\dot H(p)+\beta(\dot Q_{\mathrm{bath},X}+\dot Q_{\mathrm{bath},Y})=0.
$$

一方、$\sigma_X,\sigma_Y$ は正の前向き・逆向き流量 $a,b$ の各辺について $(a-b)\log(a/b)\ge0$ の有限和です。和が零なら各辺で $a=b$、従って $J^X=J^Y=0$ です。[情報流の定義](#def-itd9-information-flow)はそれぞれ流 $J$ の線形和なので、両情報流も零です。
<!-- proof-end -->

同じ温度でも外部仕事源、化学的な駆動、複数の素過程が一つの辺に重なる場合は、ここで書いた局所詳細釣合い・単一浴の仮定が変わります。その場合にこの命題をそのまま適用してはいけません。

## 6. 何を観測し、何を数え落としているか

- $X$ の周辺分布しか観測しなければ $\dot I^X$ は分かりません。「$\dot H_X+\beta_X\dot Q_{\mathrm{bath},X}$ が負」という事実だけから第二法則違反とはいえません。
- 全エントロピー生成は $\sigma_X+\sigma_Y$ です。[ITD7の粗視化の不等式](../ITD7/index.md#thm-itd7-coarse-kl-chain)と同じく、情報を捨てた記述では散逸を過小評価し得ます。ただし本章の情報流は**時間微分をジャンプの種類で分解した量**であり、粗視化した経路の相対エントロピーそのものではありません。
- $X,Y$ が同時に跳ぶ辺があると、[相互情報量の時間変化の分解](#thm-itd9-information-decomposition)の二つの和だけでは全変化を拾えません。その辺の寄与を別に数える必要があります。
- 任意の遷移率から浴熱を推測することはできません。熱力学の式には各辺の局所詳細釣合いが必要です。固定エネルギー、熱浴、仕事源の区別を省けば、情報流の式が正しくても物理的な解釈は誤ります。

## 7. 演習：どの遷移が相関を動かしたか

以下では断りのない限り、率と情報流は単位時間当たり、対数は自然対数とします。

#### A1. 結合分布・周辺分布・相互情報量

$X,Y\in\{0,1\}$ の結合分布が $p_{00}=p_{11}=3/8,\ p_{01}=p_{10}=1/8$ のとき、二つの周辺分布、$p(y=x\mid x)$、相互情報量を計算せよ。

- Level: A
- ID: ITD9-A1

<!-- solution-start -->
**詳細解答**

$p_X(0)=p_{00}+p_{01}=3/8+1/8=1/2$、$p_X(1)=1/2$ で、$Y$ も同じです。$p(y=x\mid x)=p_{xx}/p_X(x)=(3/8)/(1/2)=3/4$。独立分布なら各セルは $1/4$ なので

$$
\begin{aligned}
I(X;Y)
&=2\cdot\frac38\log\frac{3/8}{1/4}
+2\cdot\frac18\log\frac{1/8}{1/4}\\
&=\frac34\log\frac32+\frac14\log\frac12
=\frac34\log3-\log2>0.
\end{aligned}
$$

全確率は $2(3/8)+2(1/8)=1$、すべて正で条件付き確率を定義できます。相関があるので $I>0$ です。
<!-- solution-end -->

#### A2. $X$ 側の確率流と情報流

A1の分布で $X$ 反転率を両方向とも1（$y$ によらず）とする。二本の $X:0\to1$ の流と $\dot I^X$ を求めよ。

- Level: A
- ID: ITD9-A2

<!-- solution-start -->
**詳細解答**

[二部分系ジャンプ模型と部分確率流](#def-itd9-bipartite-jumps)より $J^X_{01}(0)=3/8-1/8=1/4$、$J^X_{01}(1)=1/8-3/8=-1/4$ です。A1の条件付き確率を[情報流の定義](#def-itd9-information-flow)へ代入すると

$$
\dot I^X=\frac14\log\frac{1/4}{3/4}
-\frac14\log\frac{3/4}{1/4}
=-\frac12\log3.
$$

各 $y$ の向きが逆なので、二項を同じ符号で足すには対数の分子分母も入れ替える必要があります。
<!-- solution-end -->

#### A3. $Y$ 側が相関を増やす率

A1の分布で、$Y$ 反転率を一致→不一致では1、不一致→一致では4とする。$x=0,1$ の $Y:0\to1$ の流と $\dot I^Y$ を求めよ。

- Level: A
- ID: ITD9-A3

<!-- solution-start -->
**詳細解答**

$x=0$ では $J^Y_{01}(0)=(3/8)1-(1/8)4=-1/8$、$x=1$ では $J^Y_{01}(1)=(1/8)4-(3/8)1=1/8$ です。条件付き確率の比は順に $(1/4)/(3/4)=1/3$ と $(3/4)/(1/4)=3$ なので

$$
\dot I^Y=-\frac18\log\frac13+\frac18\log3=\frac14\log3>0.
$$

逆向きの流は記憶 $Y$ を $X$ に合わせる方向であり、相関を増やします。
<!-- solution-end -->

#### A4. 二つの熱浴への熱

一致状態のエネルギーを $-\varepsilon$、不一致を0とする。定常分布はA1、$X$ の一致→不一致率は1・逆向き2、$Y$ の一致→不一致率は1・逆向き4とする。$X,Y$ の浴への熱率を求め、全平均内部エネルギーの時間変化と照合せよ。

- Level: A
- ID: ITD9-A4

<!-- solution-start -->
**詳細解答**

$X$ の一致→不一致の正味流は二本それぞれ $3/8-2/8=1/8$、その際の浴熱は $-\varepsilon$。$Y$ の不一致→一致の正味流も二本それぞれ $4/8-3/8=1/8$ ですが、浴熱は $+\varepsilon$ です。よって

$$
\dot Q_{\mathrm{bath},X}=2\cdot\frac18(-\varepsilon)=-\frac\varepsilon4,
\qquad
\dot Q_{\mathrm{bath},Y}=2\cdot\frac18(+\varepsilon)=\frac\varepsilon4.
$$

両浴熱の和は零です。[第一法則](#thm-itd9-partial-second-law)より $\dot U=-(\dot Q_{\mathrm{bath},X}+\dot Q_{\mathrm{bath},Y})=0$。また、定常分布を使って

$$
U=-\varepsilon(p_{00}+p_{11})=-\frac{3\varepsilon}{4}
$$

が時間に依存しないことからも、$\dot U=0$ を直接確認できます。
<!-- solution-end -->

#### A5. 部分系の散逸はどちらも非負か

A4の模型に $\beta_X\varepsilon=\log2,\ \beta_Y\varepsilon=\log4$ を課す。周辺エントロピーが定常であることを使い、A2とは異なる率（$X$ の逆向き2）の情報流と、$\sigma_X,\sigma_Y$ を求めよ。

- Level: A
- ID: ITD9-A5

<!-- solution-start -->
**詳細解答**

$X$ 流はA4より $y=0$ で $+1/8$、$y=1$ で $-1/8$ なので $\dot I^X=(1/8)\log(1/3)-(1/8)\log3=-(1/4)\log3$。A3より $\dot I^Y=(1/4)\log3$ です。$\dot H_X=\dot H_Y=0$ とA4の浴熱を[部分系の第二法則](#thm-itd9-partial-second-law)へ代入すると

$$
\sigma_X=-\frac14\log2+\frac14\log3=\frac14\log\frac32>0,
\quad
\sigma_Y=\frac14\log4-\frac14\log3=\frac14\log\frac43>0.
$$

$\dot I^X$ をA2の $-\frac12\log3$ のまま使うと率の変更を見落とします。
<!-- solution-end -->

#### B1. 結合エントロピーの辺ごとの分解

任意の正の有限結合分布と二部分系ジャンプ模型について、$X$ 遷移だけの結合エントロピー変化が

$$
\dot H_{XY}^X=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)\log\frac{p_{xy}}{p_{x'y}}
$$

となることを出発点から導き、$\dot I^X=\dot H_X-\dot H_{XY}^X$ を示せ。

- Level: B
- ID: ITD9-B1

<!-- solution-start -->
**詳細解答**

$H(p)=-\sum_{xy}p_{xy}\log p_{xy}$ の微分で $-\sum\dot p_{xy}=0$ なので、$X$ 遷移由来の項だけを取ると $-\sum_{xy}\dot p_{xy}^{\,X}\log p_{xy}$ です。一本の $X$ 辺は $p_{xy}$ に $-J$、$p_{x'y}$ に $+J$ を与えるので

$$
-\{-J\log p_{xy}+J\log p_{x'y}\}
=J\log(p_{xy}/p_{x'y}).
$$

全辺を足せば問題の式。$Y$ 遷移は $p_X$ を変えないから

$$
\dot H_X=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)\log\frac{p_X(x)}{p_X(x')}.
$$

両式を辺ごとに引くと

$$
\dot H_X-\dot H_{XY}^X
=\sum_{\substack{x<x'\\y}}J^X_{xx'}(y)
\log\frac{p_X(x)p_{x'y}}{p_X(x')p_{xy}}
=\dot I^X.
$$

最後の等号は条件付き確率 $p(y\mid x)=p_{xy}/p_X(x)$ による[定義](#def-itd9-information-flow)への変形です。
<!-- solution-end -->

#### B2. 周辺分布が動かなくても相関は減る

A1の分布で $X$ 反転率はすべて1、$Y$ 反転率もすべて1とする。この時刻の $\dot H_X,\dot H_Y,\dot I^X,\dot I^Y$ と $dI/dt$ を求めよ。分布は定常か。

- Level: B
- ID: ITD9-B2

<!-- solution-start -->
**詳細解答**

$X$ の流はA2より $+1/4,-1/4$ です。それらが $p_X(1)$ に与える寄与の和は零なので $\dot p_X(1)=0$、$\dot H_X=0$。$Y$ の流も $x=0$ で $+1/4$、$x=1$ で $-1/4$ なので $\dot p_Y(1)=0$、$\dot H_Y=0$。条件付き確率比から

$$
\dot I^X=-\frac12\log3,\qquad
\dot I^Y=-\frac12\log3,\qquad
\frac{dI}{dt}=-\log3<0.
$$

しかし $p_{00}$ への四辺の寄与は、$X$ から $-1/4$、$Y$ から $-1/4$ で $\dot p_{00}=-1/2\ne0$。周辺分布だけ一定でも結合分布は定常でなく、相関が減っています。
<!-- solution-end -->

#### B3. 独立な瞬間から情報流は始まるか

ある時刻で $p(x,y)=p_X(x)p_Y(y)>0$ とする。率 $w^y_{xx'},v^x_{yy'}$ が相手の状態に依存していても、この時刻の $\dot I^X,\dot I^Y$ が零であることを示せ。その後ずっと独立であり続けると結論してよいか。

- Level: B
- ID: ITD9-B3

<!-- solution-start -->
**詳細解答**

独立な時刻では $p(y\mid x')=p(y\mid x)=p_Y(y)$ なので、[定義](#def-itd9-information-flow)の各 $X$ 辺の対数は $\log1=0$ です。従って $\dot I^X=0$。$Y$ についても $p(x\mid y')=p(x\mid y)=p_X(x)$ より $\dot I^Y=0$。これは**その時刻の一階の変化**だけです。

例えば両ビットが一様独立な時刻に、$X$ 反転を次のように選びます。$y=0$ では $0\to1$ の率が2、逆向きが1であり、$y=1$ ではこの二つを入れ替えます。$Y$ の遷移率は両方向1とします。

独立な結合分布では各セルの確率は $1/4$ です。master方程式に率を代入すると、$X$ 遷移による変化は

$$
\begin{aligned}
\dot p_{00}^{\,X}&=\frac14\cdot1-\frac14\cdot2=-\frac14,\\
\dot p_{10}^{\,X}&=\frac14\cdot2-\frac14\cdot1=\frac14,\\
\dot p_{01}^{\,X}&=\frac14\cdot2-\frac14\cdot1=\frac14,\\
\dot p_{11}^{\,X}&=\frac14\cdot1-\frac14\cdot2=-\frac14.
\end{aligned}
$$

$Y$ の遷移はこの時刻には各辺の両方向で同じ確率流量なので、結合分布への寄与は零です。上の四式を $y$ で足すと $\dot p_X(0)=\dot p_X(1)=0$、$x$ で足しても $\dot p_Y(0)=\dot p_Y(1)=0$ です。しかし結合分布の一致セルは減り、不一致セルは増えています。従って直後には条件付き分布が異なり、独立性が永続するとはいえません。
<!-- solution-end -->

#### B4. 単一浴の定常相関

正の分布・双方向率を持つ有限二部分系が、時間不変の同一エネルギー $E$ と同一逆温度 $\beta$ の浴について局所詳細釣合いを満たす。結合分布が定常のとき $\dot I^X\ne0$ は可能か。熱・エントロピー生成の式から証明せよ。

- Level: B
- ID: ITD9-B4

<!-- solution-start -->
**詳細解答**

定常性から $\dot U=0$、[第一法則](#thm-itd9-partial-second-law)から $\dot Q_{\mathrm{bath},X}+\dot Q_{\mathrm{bath},Y}=0$、また $\dot H(p)=0$ です。従って

$$
\sigma_X+\sigma_Y
=\dot H(p)+\beta(\dot Q_{\mathrm{bath},X}+\dot Q_{\mathrm{bath},Y})=0.
$$

各辺の項 $(a-b)\log(a/b)$ は正の $a,b$ で非負なので、総和零は全辺で $a=b$ を意味します。従って $J^X=J^Y=0$、定義に戻り $\dot I^X=\dot I^Y=0$ です。[単一浴の命題](#prop-itd9-one-bath-no-flow)を具体的な第一法則と非負項まで戻って導き直しました。外部駆動などのある系へは、この結論を無条件に延長できません。
<!-- solution-end -->

#### C1. 二浴自律模型の一般パラメータ

ビット $X,Y$ の一致状態はエネルギー $-\varepsilon$、不一致は0（$\varepsilon>0$）とする。一致→不一致の反転率は $X,Y$ とも1、不一致→一致の反転率は $X$ が $r$、$Y$ が $s$ とする。$1<r<s$ とし、逆温度は $\beta_X\varepsilon=\log r,\ \beta_Y\varepsilon=\log s$ とする。次を導け。

1. 正の定常分布 $p_{00}=p_{11}=a,\ p_{01}=p_{10}=b$。
2. $X$ の一致→不一致の各正味流 $j$、$\dot I^X,\dot I^Y$。
3. 両浴への熱率と $\sigma_X,\sigma_Y,\sigma_X+\sigma_Y$。非負性を数式で確認し、$r=s$ の極限と $r=2,s=4$ の場合を照合せよ。

- Level: C
- ID: ITD9-C1

<!-- solution-start -->
**詳細解答**

**(1) 定常分布。** 一致状態から出る二本の率は各1、入る二本の率は $r,s$ です。従って

$$
0=\dot a=-2a+(r+s)b,\qquad 2a+2b=1.
$$

前式は $a=(r+s)b/2$、後式に入れると $\{r+s+2\}b=1$ なので

$$
b=\frac1{r+s+2},\qquad
a=\frac{r+s}{2(r+s+2)}.
$$

$r,s>1$ だから $a,b>0$。不一致状態のmaster方程式は反対符号で零となるので4成分すべての定常性を確認しました。

**(2) 情報流。** $X$ の一致→不一致の一辺の流は

$$
j=a-rb=\frac{r+s-2r}{2(r+s+2)}
=\frac{s-r}{2(r+s+2)}>0.
$$

$Y$ の一致→不一致の正味流は $a-sb=-j$ です。周辺分布は一様なので、各ビットについて一致する条件付き確率と不一致の比は $a/b=(r+s)/2$。$X$ 辺の各正味流は一致→不一致に $j$ であり、

$$
\dot I^X=2j\log\frac ba
=-2j\log\frac{r+s}{2},\qquad
\dot I^Y=2j\log\frac ab
=2j\log\frac{r+s}{2}.
$$

和は零で、定常相互情報量の微分と一致します。

**(3) 熱と散逸。** $X$ では一致→不一致で各 $-\varepsilon$ を浴へ放出し、$Y$ では逆向きに各 $+\varepsilon$ を放出するので

$$
\dot Q_{\mathrm{bath},X}=-2j\varepsilon,\qquad
\dot Q_{\mathrm{bath},Y}=2j\varepsilon,\qquad \dot U=0.
$$

定常ゆえ $\dot H_X=\dot H_Y=0$。[部分系の第二法則](#thm-itd9-partial-second-law)に $\beta_X\varepsilon=\log r$、$\beta_Y\varepsilon=\log s$ と(2)を入れると

$$
\begin{aligned}
\sigma_X
&=-2j\log r+2j\log\frac{r+s}{2}
=2j\log\frac{r+s}{2r},\\
\sigma_Y
&=2j\log s-2j\log\frac{r+s}{2}
=2j\log\frac{2s}{r+s},\\
\sigma_X+\sigma_Y
&=2j\log\frac sr.
\end{aligned}
$$

$s>r$ により $j>0$、さらに $(r+s)/(2r)>1$ と $2s/(r+s)>1$ なので、三つの散逸率はすべて正です。これは熱浴の温度差が散逸を駆動していることも示します。$s\downarrow r$ では $j\to0$ となるため、情報流・熱流・散逸はすべて零へ収束します。

$r=2,s=4$ を代入すると $a=3/8,b=1/8,j=1/8$ です。このとき

$$
\begin{aligned}
(\dot I^X,\dot I^Y)&=\left(-\frac{\log3}{4},\frac{\log3}{4}\right),\\
(\dot Q_{\mathrm{bath},X},\dot Q_{\mathrm{bath},Y})&=\left(-\frac\varepsilon4,\frac\varepsilon4\right),\\
(\sigma_X,\sigma_Y)&=\left(\frac14\log\frac32,\frac14\log\frac43\right).
\end{aligned}
$$

これは[四状態の命題](#prop-itd9-four-state-steady)で求めた値と一致します。
<!-- solution-end -->

本章で得たのは「情報を仕事に変える魔法の新しい項」ではなく、**どの部分系の遷移が相関を作り、どこでその相関が消費されたか**を全装置のエントロピー収支から切り出す方法です。時間を区切る測定・消去の記述と、動き続けるセンサーの記述を、この二つの情報流で接続できます。
