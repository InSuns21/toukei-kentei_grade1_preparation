# HA4 Calderón–Zygmund分解

[HA1の高次元Lebesgue微分定理](../HA1/index.md#thm-ha1-differentiation)は、局所平均がほとんど至る所で元の関数へ戻ることを示しました。[HA2の補間定理](../HA2/index.md#thm-ha2-marc-infinity)は、端点評価を中間の $L^p$ 評価へ結びます。しかし、$L^1$ 関数は局所的に非常に大きくなり得るため、そのまま $L^2$ 作用素へ代入することはできません。

そこで高さ $\lambda>0$ を決め、「平均が大きい場所」を互いに重ならない立方体で集めます。その内部で元の関数を平均値に置き換えれば有界な関数 $g$ を得て、捨てた差 $b$ は各立方体ごとに積分が $0$ になります。この **大きさと相殺の役割分担** を、後の分解定理で厳密に構成します。

## 1. なぜ二進立方体を使うのか

区間 $[0,1)$ を半分に分ける操作を各座標へ拡張します。長さが $2^k$ の格子立方体なら、同じ格子に属する二つは交わらないか、一方が他方を含みます。この入れ子構造のおかげで、平均が閾値を超えた立方体のうち極大なものを重複なく選べます。

<a id="def-ha4-dyadic-cubes"></a>
<!-- formal-statement-start -->
> **定義（二進立方体と親立方体）**  
> 次元 $d\ge1$ を固定する。各 $k\in\mathbb Z$、$m=(m_1,\dots,m_d)\in\mathbb Z^d$ に対して

$$
Q_{k,m}=\prod_{j=1}^d[2^km_j,2^k(m_j+1))
$$

> を二進立方体という。辺長を $\ell(Q)=2^k$、体積を $|Q|=2^{kd}$ とする。$Q$ を含む辺長 $2\ell(Q)$ の二進立方体を親 $Q^{\mathrm p}$ と呼ぶ。$f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ に対して平均を

$$
f_Q=\frac1{|Q|}\int_Q f(y)\,dy
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha4-dyadic-cubes -->
**定義の確認**　$d=1$ で $Q=[0,1)$ の親は $[0,2)$、$[-1,0)$ の親は $[-2,0)$ です。$d=2$ で $Q=[0,1)\times[-1,0)$ の親は $[0,2)\times[-2,0)$ となり、面積は $1$ から $4=2^2$ へ増えます。半開区間により同じ大きさの立方体は境界でも重複しません。
<!-- definition-example-end -->

<a id="def-ha4-dyadic-maximal"></a>
<!-- formal-statement-start -->
> **定義（二進最大関数と悪い集合）**  
> $f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ とする。点 $x$ を含む二進立方体全体について

$$
M_{\mathcal D}f(x)=\sup_{Q\ni x}\frac1{|Q|}\int_Q|f(y)|\,dy
$$

> と定める。$\lambda>0$ に対して $E_\lambda=\{x:M_{\mathcal D}f(x)>\lambda\}$ を悪い集合という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha4-dyadic-maximal -->
**定義の確認**　$d=1$、$f=\boldsymbol1_{[0,1)}$ とすると、$x\in[0,1)$ では $Q=[0,1)$ で平均が1、他のどの立方体でも平均は1以下なので $M_{\mathcal D}f(x)=1$ です。$\lambda=1/2$ なら $[0,1)\subset E_\lambda$ ですが、$[1,2)$ を含む長さ2の立方体 $[0,2)$ の平均はちょうど $1/2$ で、厳密な不等号を満たしません。
<!-- definition-example-end -->

$E_\lambda$ の点すべてに「最大の悪い立方体」があるかは自明ではありません。ここで **$f\in L^1(\mathbb R^d)$** が効きます。十分大きな立方体では平均が必ず小さくなるからです。

<a id="lem-ha4-maximal-selection"></a>
<!-- formal-statement-start -->
> **補題（極大二進立方体の選択）**  
> $f\in L^1(\mathbb R^d)$、$\lambda>0$ とする。平均が閾値を超える二進立方体

$$
\frac1{|Q|}\int_Q|f|>\lambda
$$

> のうち包含関係で極大なものを $\{Q_j\}_{j\ge1}$ とする（有限個でもよい）。この族は互いに素で、その和集合は $E_\lambda$ に等しい。各 $Q_j$ では

$$
\lambda<\frac1{|Q_j|}\int_{Q_j}|f|
\le 2^d\lambda,
\qquad
\sum_j|Q_j|\le\frac{\|f\|_1}{\lambda}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一点を含む「平均が大きい」立方体を親へたどると、体積増加のため必ず止まります。止まった立方体が極大です。上限 $2^d\lambda$ は、選ばれた立方体自身でなく親の平均を使います。

<!-- proof-start -->
### 証明

二進立方体 $Q$ について

$$
\frac1{|Q|}\int_Q|f|\le\frac{\|f\|_1}{|Q|}.
$$

したがって $|Q|\ge\|f\|_1/\lambda$ なら厳密な不等式は成り立ちません。$x\in E_\lambda$ なら $x$ を含む平均 $>\lambda$ の立方体が少なくとも一つあり、それを親へ拡大する操作は有限回で止まります。停止点を $Q_j$ とすれば親は平均 $\le\lambda$ です。

二進立方体は交われば包含関係にあるので、極大立方体が二つ交われば一方が他方を真に含むこととなり矛盾します。したがって互いに素です。$E_\lambda$ の任意の点は選択した極大立方体に含まれ、逆に各 $Q_j$ の点では定義から最大関数が $\lambda$ を超えます。ゆえに

$$
E_\lambda=\bigcup_jQ_j.
$$

$Q_j^{\mathrm p}$ は極大性により平均 $\le\lambda$、かつ $|Q_j^{\mathrm p}|=2^d|Q_j|$ です。よって

$$
\int_{Q_j}|f|
\le\int_{Q_j^{\mathrm p}}|f|
\le\lambda|Q_j^{\mathrm p}|
=2^d\lambda|Q_j|.
$$

極大族が空の場合は $\sum_j|Q_j|=0$ であり、体積評価は直ちに成立します。極大族が空でない場合、任意の有限部分族 $Q_1,\dots,Q_N$ について、選択の厳密な不等号と互いに素であることから

$$
\lambda\sum_{j=1}^N|Q_j|
<\sum_{j=1}^N\int_{Q_j}|f|
\le\|f\|_1
$$

です。二進立方体全体は可算なので極大族も可算です。有限族ならこれでよく、無限族なら有限部分和の単調極限を取って

$$
\sum_j|Q_j|\le\frac{\|f\|_1}{\lambda}
$$

を得ます。無限族の極限で厳密不等号を保つ必要はありません。
<!-- proof-end -->

ここで得られた $\sum_j|Q_j|$ の評価は、悪い部分を覆う領域が小さいことを表します。$L^1$ ノルムそのものが小さいという意味ではありません。

## 2. good part と bad part を実際に構成する

「悪い」というのは関数値の符号や滑らかさの評価ではありません。**局所的な絶対値の平均が大きい**という意味です。悪い立方体の中を平均値に置き換え、変動だけを取り出します。

<a id="thm-ha4-cz-decomposition"></a>
<!-- formal-statement-start -->
> **定理（Calderón–Zygmund分解：二進立方体版）**  
> $d\ge1$、$f\in L^1(\mathbb R^d;\mathbb C)$、$\lambda>0$ とする。[極大立方体](#lem-ha4-maximal-selection)を $\{Q_j\}$、その和集合を $E_\lambda$ とする。次の関数を定める。

$$
g(x)=
\begin{cases}
f_{Q_j}&(x\in Q_j),\\
f(x)&(x\notin E_\lambda),
\end{cases}
\qquad
b_j=(f-f_{Q_j})\boldsymbol1_{Q_j}.
$$

> すると $f=g+b$、$b=\sum_jb_j$（$L^1$ での絶対収束）が成り立ち、次の評価を満たす。

$$
\begin{aligned}
&|g(x)|\le2^d\lambda\quad\text{a.e.},&
&\|g\|_1\le\|f\|_1,\\
&\|g\|_2^2\le2^d\lambda\|f\|_1,&
&\sum_j|Q_j|\le\frac{\|f\|_1}{\lambda},\\
&\operatorname{supp}b_j\subset\overline{Q_j},&
&\int b_j=0,\quad
\sum_j\|b_j\|_1\le2\|f\|_1.
\end{aligned}
$$

> さらに各 $j$ で $\|b_j\|_1\le2\int_{Q_j}|f|$ である。立方体の等式・包含は測度0の差を無視して解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

選ばれた立方体では $g$ を定数 $f_{Q_j}$ にするので、平均からのずれ $b_j$ は必ず零平均になります。立方体の外では元の $f$ をそのまま使います。この外側での $|f|\le\lambda$ の確認には微分定理が必要です。最後に $g$ の $L^\infty$ と $L^1$ 評価を掛け合わせて $L^2$ 評価を得ます。

<!-- proof-start -->
### 証明

各 $Q_j$ は互いに素なので、$g$ の場合分けに矛盾はなく、$b_j$ の台も互いに重なりません。平均値を定義する積分を絶対値で評価すると

$$
|f_{Q_j}|\le\frac1{|Q_j|}\int_{Q_j}|f|
\le2^d\lambda.
$$

一方 $x\notin E_\lambda$ なら、すべての二進立方体 $Q\ni x$ で $|f|_Q\le\lambda$ です。$x$ を含む辺長 $2^{-n}$ の二進立方体 $Q_n(x)$ を取ります。[HA1の立方体による微分](../HA1/index.md#prop-ha1-cubes)を $|f|\in L^1_{\mathrm{loc}}$ に適用すると、ほとんどすべての $x$ で

$$
|f(x)|=\lim_{n\to\infty}\frac1{|Q_n(x)|}\int_{Q_n(x)}|f|
\le\lambda.
$$

したがって $|g|\le2^d\lambda$ がほとんど至る所で成立します。外側では $|g|=|f|$、内側では Jensen の不等式のこの場合に当たる $|f_{Q_j}||Q_j|\le\int_{Q_j}|f|$ から

$$
\|g\|_1
=\int_{E_\lambda^c}|f|
+\sum_j|f_{Q_j}||Q_j|
\le\int_{E_\lambda^c}|f|+\sum_j\int_{Q_j}|f|
=\|f\|_1.
$$

$|g|^2\le\|g\|_\infty|g|$ を積分すれば

$$
\|g\|_2^2\le2^d\lambda\|g\|_1
\le2^d\lambda\|f\|_1.
$$

各 $b_j$ は $Q_j$ の外で0であり、平均の定義により

$$
\int_{\mathbb R^d}b_j
=\int_{Q_j}f-|Q_j|f_{Q_j}=0.
$$

その大きさは

$$
\begin{aligned}
\|b_j\|_1
&=\int_{Q_j}|f-f_{Q_j}|\\
&\le\int_{Q_j}|f|+|Q_j||f_{Q_j}|\\
&\le2\int_{Q_j}|f|.
\end{aligned}
$$

これを和すると $\sum_j\|b_j\|_1\le2\|f\|_1$。ゆえに $\sum_jb_j$ は $L^1$ で絶対収束し、各 $Q_j$ で $g+b=f_{Q_j}+(f-f_{Q_j})=f$、外側で $g+b=f+0=f$ となります。[立方体の選択補題](#lem-ha4-maximal-selection)が残る体積評価を与えます。
<!-- proof-end -->

**構成を手計算する**　$d=1$、$f=2\boldsymbol1_{[0,1/2)}$、$\lambda=3/4$ とします。$[0,1)$ の平均は1で、親 $[0,2)$ の平均は $1/2$ です。したがって唯一の極大立方体は $Q=[0,1)$。その平均 $f_Q=1$ を使うと

$$
g=\boldsymbol1_{[0,1)},\qquad
b=\boldsymbol1_{[0,1/2)}-\boldsymbol1_{[1/2,1)}.
$$

実際に $\int_Qb=1/2-1/2=0$、$\|b\|_1=1$、$\|g\|_2^2=1$ です。「bad part」は符号が一定とは限らず、相殺する正負の二つの山を持つことがここで見えます。

## 3. 零平均が遠方での減衰を生む

立方体 $Q$ から離れた位置 $x$ で核 $K(x,y)$ を $y$ について眺めると、$Q$ 内ではほとんど一定です。$b_Q$ の積分が0なら、その「ほとんど一定」の主項を差し引いても積分値は変わりません。残るのは核の小さな差です。これが非局所作用素を扱うための入口になります。

<a id="def-ha4-enlarged-cube"></a>
<!-- formal-statement-start -->
> **定義（拡大立方体）**  
> 辺長 $\ell(Q)$、中心 $c_Q$ の立方体 $Q$ について、同じ中心を持ち辺長 $4\sqrt d\,\ell(Q)$ の閉立方体を $Q^*$ とする。すると $|Q^*|=(4\sqrt d)^d|Q|$ であり、$x\notin Q^*$ と $y\in Q$ なら

$$
|x-c_Q|\ge2\sqrt d\,\ell(Q),
\qquad
|y-c_Q|\le\frac{\sqrt d}{2}\ell(Q).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha4-enlarged-cube -->
**定義の確認**　$d=1$、$Q=[0,1)$ なら $c_Q=1/2$、$Q^*=[-3/2,5/2]$。$x>5/2$ と $y\in[0,1)$ では $|x-1/2|>2$、$|y-1/2|\le1/2$ なので、中心からの距離を比較するのに十分な余裕があります。
<!-- definition-example-end -->

<a id="lem-ha4-off-support"></a>
<!-- formal-statement-start -->
> **補題（零平均と核の差による遠方評価）**  
> $Q\subset\mathbb R^d$ を立方体、$b\in L^1$ を $Q$ に台を持ち $\int_Qb=0$ を満たす関数とする。$\delta>0$、$A>0$ とする。核 $K(x,y)$ は $(\mathbb R^d\setminus Q^*)\times Q$ 上で共同可測な複素数値関数で、各 $x\notin Q^*$ で $K(x,c_Q)$ が有限とする。さらに $x\notin Q^*$、$y\in Q$ で

$$
|K(x,y)-K(x,c_Q)|
\le A\frac{|y-c_Q|^\delta}{|x-c_Q|^{d+\delta}}
$$

> を満たすとする。このとき $x\notin Q^*$ に対して

$$
F_Q(x)=\int_Q K(x,y)b(y)\,dy
$$

> は絶対収束し、$F_Q$ は $(Q^*)^c$ 上で可測であり、次の評価が成り立つ。

$$
\int_{\mathbb R^d\setminus Q^*}|F_Q(x)|\,dx
\le C_{d,\delta}A\|b\|_1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\int b=0$ を使って $K(x,c_Q)$ を積分から消します。その結果 $|x-c_Q|^{-d}$ ではなく $|x-c_Q|^{-d-\delta}$ が現れ、無限遠まで積分しても有限となります。半径方向の積分を一行省かずに計算します。

<!-- proof-start -->
### 証明

固定した $x\notin Q^*$ では $|x-c_Q|>0$ です。$y\mapsto K(x,y)b(y)$ は可測であり、核の差の仮定から

$$
|K(x,y)b(y)|\le\left(|K(x,c_Q)|+
A\frac{(\sqrt d\,\ell(Q)/2)^\delta}{|x-c_Q|^{d+\delta}}\right)|b(y)|
$$

となります。右辺は $y\in Q$ で可積分なので $F_Q(x)$ は絶対収束します。また共同可測性から、$y$ についての積分で定めた $F_Q(x)$ は $(Q^*)^c$ 上で可測です。零平均から

$$
\begin{aligned}
F_Q(x)
&=\int_Q\{K(x,y)-K(x,c_Q)\}b(y)\,dy\\
|F_Q(x)|
&\le A\int_Q\frac{|y-c_Q|^\delta|b(y)|}
{|x-c_Q|^{d+\delta}}\,dy\\
&\le A\left(\frac{\sqrt d}{2}\ell(Q)\right)^\delta
\frac{\|b\|_1}{|x-c_Q|^{d+\delta}}.
\end{aligned}
$$

$Q^*$ の外では $|x-c_Q|\ge2\sqrt d\,\ell(Q)$ なので、極座標で（$S^{d-1}$ の表面積を $\sigma_{d-1}$ として）

$$
\begin{aligned}
\int_{\mathbb R^d\setminus Q^*}|x-c_Q|^{-d-\delta}\,dx
&\le\sigma_{d-1}\int_{2\sqrt d\,\ell(Q)}^\infty
r^{-d-\delta}r^{d-1}\,dr\\
&=\frac{\sigma_{d-1}}{\delta}
(2\sqrt d\,\ell(Q))^{-\delta}.
\end{aligned}
$$

二つの式を掛ければ $\ell(Q)^\delta\ell(Q)^{-\delta}$ が消え、

$$
\int_{(Q^*)^c}|F_Q|
\le \frac{\sigma_{d-1}}{\delta\,4^\delta}A\|b\|_1.
$$

これが主張であり、定数は $Q$ の位置・辺長・$b$ に依存しません。
<!-- proof-end -->

この補題を [分解定理](#thm-ha4-cz-decomposition) の $b_j$ に適用すると、核の差の仮定がすべての $Q_j$ で同じ定数を持つ限り、

$$
\sum_j\int_{(Q_j^*)^c}
\left|\int_{Q_j}K(x,y)b_j(y)\,dy\right|\,dx
\le 2C_{d,\delta}A\|f\|_1.
$$

また拡大立方体の和集合の体積は

$$
\left|\bigcup_jQ_j^*\right|
\le\sum_j|Q_j^*|
\le(4\sqrt d)^d\frac{\|f\|_1}{\lambda}.
$$

これらは **核の差による遠方積分** と **例外集合の大きさ** の見積もりです。一般の特異積分作用素の切断・$L^2$ 有界性・弱 $(1,1)$ 定理は、これらの部品をそろえて次章で扱います。核の滑らかさだけから作用素の $L^2$ 有界性が出るわけではありません。

## 4. 良い部分には $L^2$ の道具が使える

もし線形作用素 $T$ が $L^2$ で有界、すなわち $\|Th\|_2\le B\|h\|_2$ を満たすなら、分解した $g$ は $L^2$ に属するので、[HA2の分布関数評価](../HA2/index.md#prop-ha2-weak-properties)でその寄与を制御できます。

<a id="prop-ha4-good-l2"></a>
<!-- formal-statement-start -->
> **命題（良い部分の二乗平均評価）**  
> [Calderón–Zygmund分解](#thm-ha4-cz-decomposition)の $g$ に対し、線形作用素 $T:L^2(\mathbb R^d)\to L^2(\mathbb R^d)$ が $\|T\|_{2\to2}\le B$ を満たすとする。任意の $t>0$ について

$$
|\{x:|Tg(x)|>t\}|
\le\frac{2^dB^2\lambda\|f\|_1}{t^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$g$ の振幅上限と $L^1$ ノルムから $\|g\|_2^2$ を得た後、作用素ノルムと二乗積分の閾値評価を順番に適用するだけです。ただし適用順と閾値の二乗が重要です。

<!-- proof-start -->
### 証明

[分解定理](#thm-ha4-cz-decomposition)から $g\in L^2$、$\|g\|_2^2\le2^d\lambda\|f\|_1$ です。$T$ の仮定で

$$
\|Tg\|_2^2\le B^2\|g\|_2^2
\le2^dB^2\lambda\|f\|_1.
$$

$|Tg(x)|>t$ の集合では $|Tg(x)|^2>t^2$ なので、

$$
t^2|\{|Tg|>t\}|
\le\int_{\{|Tg|>t\}}|Tg|^2
\le\|Tg\|_2^2.
$$

$t^2$ で割ると主張を得ます。
<!-- proof-end -->

$t=\lambda$ と選べば右辺は $2^dB^2\|f\|_1/\lambda$ です。$L^1$ 関数をそのまま $T$ に入れるのではなく、**分解してから $g\in L^2$ を使う** という順序が決定的です。

### 消去がないと何が壊れるか

$d=1$、$Q=[0,1)$、$b=\boldsymbol1_Q$、$K(x,y)=1/(x-y)$ を考えます。$x>2$ なら

$$
F_Q(x)=\int_0^1\frac{dy}{x-y}
=\log\frac{x}{x-1}
\ge\frac1x,
$$

最後の不等式は $1/(x-y)\ge1/x$ を積分して得られます。したがって $\int_2^\infty|F_Q(x)|\,dx=\infty$。この $b$ は $\int_Qb=1$ で、零平均を満たしません。一般の $1/|x|^d$ の減衰は無限遠で積分できず、**核の滑らかさがあっても消去がなければ遠方の $L^1$ 評価は成立しない** のです。

反対に $b=\boldsymbol1_{[0,1/2)}-\boldsymbol1_{[1/2,1)}$ なら $\int b=0$ で、$x>2$ について

$$
\left|\int_0^1\frac{b(y)}{x-y}\,dy\right|
=\left|\int_0^1
\left(\frac1{x-y}-\frac1{x-1/2}\right)b(y)\,dy\right|
\le\frac{C}{x^2}\|b\|_1.
$$

差の分母 $(x-y)(x-1/2)$ は $x>2$ で $x^2$ と比較できるためです。消去の有無が減衰次数を一つ変えます。

## 5. 演習

分解の定義確認から始め、極大性と量的評価、零平均の遠方への効用を自分の計算でつなげましょう。各問は単独で解けるよう条件を記します。

<a id="ex-ha4-a01"></a>
**演習 HA4-A01（二進立方体の親）**  
- Level: A

$d=2$ の $Q=[-2,-1)\times[2,3)$ の親立方体を求め、体積比を計算せよ。

<!-- solution-start -->
**詳細解答**　$Q$ の辺長は1です。第1座標の区間 $[-2,-1)$ の親は $[-2,0)$、第2座標の $[2,3)$ の親は $[2,4)$。よって $Q^{\mathrm p}=[-2,0)\times[2,4)$ です。面積は $|Q|=1$、$|Q^{\mathrm p}|=2\cdot2=4=2^2|Q|$ となります。
<!-- solution-end -->

<a id="ex-ha4-a02"></a>
**演習 HA4-A02（閾値と親）**  
- Level: A

$d=1$、$f=2\boldsymbol1_{[0,1/2)}$、$\lambda=3/4$ とする。$Q=[0,1)$ とその親の $|f|$ の平均を求め、$Q$ が極大であることを確認せよ。

<!-- solution-start -->
**詳細解答**　$\int_{[0,1)}|f|=2\cdot(1/2)=1$ より平均は1で、$1>3/4$ です。親 $[0,2)$ も積分は1ですが長さ2なので平均は $1/2\le3/4$ です。さらに上位の親では平均は減少します。したがって $Q$ は平均が閾値を超える極大二進区間です。$[0,1/2)$ 自体も平均2ですが、$Q$ に真に含まれるので極大ではありません。
<!-- solution-end -->

<a id="ex-ha4-a03"></a>
**演習 HA4-A03（零平均の検算）**  
- Level: A

区間 $Q=[0,2)$ で $f=3\boldsymbol1_{[0,1)}$ とする。$f_Q$ と $b_Q=(f-f_Q)\boldsymbol1_Q$ を求め、零平均と $L^1$ ノルムを示せ。

<!-- solution-start -->
**詳細解答**　$\int_Qf=3$、$|Q|=2$ より $f_Q=3/2$。$[0,1)$ では $b_Q=3-3/2=3/2$、$[1,2)$ では $b_Q=-3/2$、外では0です。したがって $\int_Qb_Q=(3/2)\cdot1-(3/2)\cdot1=0$、$\|b_Q\|_1=(3/2)\cdot1+(3/2)\cdot1=3$ です。
<!-- solution-end -->

<a id="ex-ha4-a04"></a>
**演習 HA4-A04（$L^2$ に入る理由）**  
- Level: A

$g\in L^1\cap L^\infty$ に対して $\|g\|_2^2\le\|g\|_\infty\|g\|_1$ を示し、$|g|\le 2^d\lambda$、$\|g\|_1\le\|f\|_1$ を代入せよ。

<!-- solution-start -->
**詳細解答**　ほとんど至る所で $|g|^2=|g|\cdot|g|\le\|g\|_\infty|g|$。両辺を積分すると $\int|g|^2\le\|g\|_\infty\int|g|$ です。右辺に仮定を入れて $\|g\|_2^2\le 2^d\lambda\|f\|_1$ を得ます。したがって $\|f\|_2$ が無限大でも分解後の $g$ は $L^2$ に属します。
<!-- solution-end -->

<a id="ex-ha4-a05"></a>
**演習 HA4-A05（拡大立方体）**  
- Level: A

$d=1$、$Q=[0,1)$ について $Q^*$ を求め、$x\notin Q^*$ かつ $y\in Q$ なら $|x-y|\ge3/2$ を確認せよ。

<!-- solution-start -->
**詳細解答**　中心は $c_Q=1/2$、拡大後の辺長は4なので $Q^*=[-3/2,5/2]$ です。$x>5/2$ なら $x-y>5/2-1=3/2$、$x<-3/2$ なら $y-x>0+3/2=3/2$ です。どちらも $|x-y|\ge3/2$ で、核の特異点 $x=y$ を回避します。
<!-- solution-end -->

<a id="ex-ha4-b01"></a>
**演習 HA4-B01（複素数値でも零平均）**  
- Level: B

$f\in L^1(\mathbb R^d;\mathbb C)$、$Q$ を有限体積の立方体とし $b_Q=(f-f_Q)\boldsymbol1_Q$ とする。$\int b_Q=0$、$\|b_Q\|_1\le2\int_Q|f|$ を示せ。さらに $f_Q$ の代わりに $|f|_Q$ を引くと、なぜ零平均が一般に失われるか説明せよ。

<!-- solution-start -->
**詳細解答**　$|Q|f_Q=\int_Qf$ なので $\int b_Q=0$ です。また $\int_Q|f-f_Q|\le\int_Q|f|+|Q||f_Q|$、$|Q||f_Q|=|\int_Q f|\le\int_Q|f|$ を使って主張を得ます。$|f|_Q$ を引くと積分は $\int_Qf-\int_Q|f|$ です。例えば $f=-\boldsymbol1_Q$ なら $\int_Qf=-|Q|$、$\int_Q|f|=|Q|$ で、差は $-2|Q|\ne0$。絶対値は立方体選択には使えますが、消去に使う平均は $f_Q$ そのものでなければなりません。
<!-- solution-end -->

<a id="ex-ha4-b02"></a>
**演習 HA4-B02（極大立方体の面積見積もり）**  
- Level: B

$f\in L^1(\mathbb R^d)$、$\lambda>0$ とし、相異なる極大二進立方体 $Q_1,\dots,Q_N$ について $\sum_{j=1}^N|Q_j|\le\|f\|_1/\lambda$ を示せ。さらに無限族でも成立する理由を述べよ。

<!-- solution-start -->
**詳細解答**　各 $j$ で $\lambda|Q_j|<\int_{Q_j}|f|$。[極大二進立方体の選択](#lem-ha4-maximal-selection)により極大立方体は互いに素なので

$$
\lambda\sum_{j=1}^N|Q_j|
<\sum_{j=1}^N\int_{Q_j}|f|
=\int_{\cup_{j=1}^NQ_j}|f|
\le\|f\|_1.
$$

無限族ではすべての有限部分和が $\|f\|_1/\lambda$ 以下です。非負級数の和を有限部分和の上限として定めれば $\sum_j|Q_j|\le\|f\|_1/\lambda$ が従います。
<!-- solution-end -->

<a id="ex-ha4-b03"></a>
**演習 HA4-B03（消去による減衰次数の改善）**  
- Level: B

$Q=[0,1)$、$b=\boldsymbol1_{[0,1/2)}-\boldsymbol1_{[1/2,1)}$ とし、$x\ge2$ のとき

$$
\left|\int_0^1\frac{b(y)}{x-y}\,dy\right|\le\frac1{x^2}
$$

を示せ。

<!-- solution-start -->
**詳細解答**　$\int_0^1b(y)\,dy=0$ なので定数 $1/x$ を引けます。$x\ge2$、$0\le y\le1$ では $x-y\ge x/2$。したがって

$$
\left|\frac1{x-y}-\frac1x\right|
=\frac{y}{x(x-y)}
\le\frac{2y}{x^2}.
$$

よって

$$
\left|\int_0^1\frac{b(y)}{x-y}\,dy\right|
\le\frac2{x^2}\int_0^1y|b(y)|\,dy
=\frac2{x^2}\int_0^1y\,dy=\frac1{x^2}.
$$

定数項を除かなければ得られるのは $O(x^{-1})$ までであり、無限遠での可積分性に違いが出ます。
<!-- solution-end -->

<a id="ex-ha4-b04"></a>
**演習 HA4-B04（良い部分の例外集合）**  
- Level: B

$\|T\|_{2\to2}\le B$、$g$ は $d$ 次元の高さ $\lambda$ の分解の良い部分とする。$\{|Tg|>\lambda/2\}$ の体積を $B,d,\lambda,\|f\|_1$ で評価せよ。

<!-- solution-start -->
**詳細解答**　[良い部分の二乗平均評価](#prop-ha4-good-l2)で $t=\lambda/2$ とすると

$$
|\{|Tg|>\lambda/2\}|
\le\frac{2^dB^2\lambda\|f\|_1}{(\lambda/2)^2}
=\frac{2^{d+2}B^2\|f\|_1}{\lambda}.
$$

$1/t$ ではなく $1/t^2$ が現れるのは $L^2$ に対する二乗積分の閾値評価を適用したからです。
<!-- solution-end -->

<a id="ex-ha4-c01"></a>
**演習 HA4-C01（分解と遠方制御の接続）**  
- Level: C

$f\in L^1(\mathbb R^d)$、$\lambda>0$ の [Calderón–Zygmund分解](#thm-ha4-cz-decomposition)を $(Q_j,b_j)$ とする。$\delta,A>0$ とし、核 $K(x,y)$ は $x\ne y$ 上で共同可測かつ有限値とする。すべての $j$ に対して $x\notin Q_j^*$、$y\in Q_j$ で

$$
|K(x,y)-K(x,c_j)|
\le A\frac{|y-c_j|^\delta}{|x-c_j|^{d+\delta}}
$$

を満たすとする。$U=\bigcup_jQ_j^*$、$F_j(x)=\int_{Q_j}K(x,y)b_j(y)\,dy$（$x\notin Q_j^*$）とおく。次を証明せよ。

1. $|U|\le(4\sqrt d)^d\|f\|_1/\lambda$。
2. $t>0$ に対し、$\sum_j|F_j(x)|$ が $U^c$ 上でほとんど至る所有限であり、$|\{x\in U^c:\sum_j|F_j(x)|>t\}|\le (2C_{d,\delta}A/t)\|f\|_1$。

<!-- solution-start -->
**詳細解答**　まず $|Q_j^*|=(4\sqrt d)^d|Q_j|$ です。可算劣加法性と[極大立方体の体積評価](#lem-ha4-maximal-selection)から

$$
|U|\le\sum_j|Q_j^*|
=(4\sqrt d)^d\sum_j|Q_j|
\le(4\sqrt d)^d\frac{\|f\|_1}{\lambda}.
$$

次に各 $b_j$ は $Q_j$ に台を持ち $\int b_j=0$ です。[遠方評価補題](#lem-ha4-off-support)より

$$
\int_{(Q_j^*)^c}|F_j(x)|\,dx
\le C_{d,\delta}A\|b_j\|_1.
$$

$U^c\subset(Q_j^*)^c$ なので、絶対値からなる級数に[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を適用すると

$$
\begin{aligned}
\int_{U^c}\sum_j|F_j(x)|\,dx
&=\sum_j\int_{U^c}|F_j(x)|\,dx\\
&\le C_{d,\delta}A\sum_j\|b_j\|_1\\
&\le2C_{d,\delta}A\|f\|_1.
\end{aligned}
$$

右辺が有限なので非負級数は $U^c$ のほとんど至る所で有限です。$S(x)=\sum_j|F_j(x)|$ とし、$S>t$ の集合では $t\le S(x)$ だから

$$
t|\{x\in U^c:S(x)>t\}|
\le\int_{U^c}S(x)\,dx
\le2C_{d,\delta}A\|f\|_1.
$$

$t$ で割れば結論です。なお、この議論から **一般の $Tb$ 全体の表現や $T$ の $L^2$ 有界性を自動的に得たわけではありません**。それらは別途作用素の仮定を確認する必要があります。
<!-- solution-end -->

## 6. 次に使う道具

二進立方体での分解は構成も定数も明確です。現代の特異積分論ではこれを用い、(i) $g$ を $L^2$ 有界性で制御する、(ii) $b_j$ を零平均と核の差で制御する、(iii) 拡大立方体の和集合は体積で制御する、という三段階を組み合わせます。次のHA5では、特異積分の切断と核の仮定を明示し、この三つがどのように弱型評価へつながるかを検証します。
