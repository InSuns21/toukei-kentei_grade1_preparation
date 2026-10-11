# CDYN13 速遅系：臨界多様体と緩和振動の入口

[CDYN8の弱非線形振動](../CDYN8/index.md#thm-cdyn8-finite-time-averaging)では、速い回転と遅い振幅変化を平均化して区別しました。ただし平均化は振動項の打ち消しを使う方法です。速い成分が振動せず、むしろ短時間で別の曲線へ引き寄せられる場合は、何を調べればよいのでしょうか。

速い変数 $x$ と遅い変数 $y$ を考えます。$x$ の変化に小さな係数が付くと、$x$ はまず短時間で $y$ が指定する値へ接近し、その後は $y$ の変化を少し遅れて追いかけます。本章ではこの二段階を積分公式で証明します。極限式 $x=h(y)$ を書くだけでは、初期時刻で何が起こるかは説明できません。

## 1. 一つの時間で二つの速さを持つ模型

定数 $a>0$、$b\in\mathbb R$、$0<\varepsilon\le1$ と関数 $h\in C^1(\mathbb R)$ に対し、

$$
\varepsilon x'=-a(x-h(y)),\qquad y'=b
$$

を扱います。時間微分は $t$ に関するものです。初期値を $x(0)=x_0,\ y(0)=y_0$ とします。$y$ が動かない瞬間には $x=h(y)$ が右辺を0にする目標値です。

$y'=b$ は直接積分でき、

$$
y(t)=y_0+bt.
$$

これを第1式へ代入すると、

$$
x'+\frac a\varepsilon x
=\frac a\varepsilon h(y_0+bt).
$$

従って各 $\varepsilon>0$ について、連続な既知の外力を受ける一次線形方程式です。連続な外力が有限区間で有界なため、積分因子を使った次節の公式で解を構成でき、同じ初期値の解の差は定数倍の $e^{-at/\varepsilon}$ になります。従って任意の初期値から全ての有限時刻まで解が一意に存在します。これは[ODE8の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)とも整合します。ここでの議論に一般の幾何学的特異摂動定理は必要ありません。

初期値が何であっても、$\varepsilon$ を形式的に0と置けば $x=h(y)$ が現れます。しかし初期値がその曲線に乗っていない場合、$t=0$ では式が成立しません。この差を直接追います。

## 2. 臨界多様体と速い時間

小さな $\varepsilon$ によって、$x$ は $y$ に比べておよそ $1/\varepsilon$ 倍の速さで応答します。$x$ の右辺が消える点の集合を、まず幾何学的な目印として定義します。

<a id="def-cdyn13-critical-manifold"></a>

<!-- formal-statement-start -->
### 定義（本模型の臨界多様体）

$a>0$、$h\in C^1(\mathbb R)$ とし、速遅系

$$
\varepsilon x'=-a(x-h(y)),\qquad y'=b
$$

の **臨界多様体** を

$$
\mathcal C_0=\{(x,y)\in\mathbb R^2:x=h(y)\}
$$

と定める。これは $\varepsilon=0$ と形式的に置いたときの速い方程式の零点集合であり、$\varepsilon>0$ の元の系に対して自動的に不変な集合を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn13-critical-manifold -->
**定義の確認**　$h(y)=y^2$ なら $\mathcal C_0$ は放物線 $x=y^2$ です。各 $y$ に対して $x$ の右辺 $-a(x-y^2)$ は $x=y^2$ のときに限り0です。一方、その上で $b\ne0$、$y\ne0$ なら曲線を動くために必要な速度は $x'=2yb$ ですが、元の式は $x'=0$ を与えます。したがって曲線が速い方程式の零点集合であることと、運動で保たれることは別です。
<!-- definition-example-end -->

速い動きを拡大して見るには、時間を $\tau=t/\varepsilon$ に変えます。$X(\tau)=x(\varepsilon\tau)$、$Y(\tau)=y(\varepsilon\tau)$ とすれば、連鎖律から

$$
\frac{dX}{d\tau}
=\varepsilon x'(\varepsilon\tau)
=-a(X-h(Y)),\qquad
\frac{dY}{d\tau}=\varepsilon b.
$$

$\tau$ を固定して $\varepsilon\to0$ とすれば、$Y$ は初期値 $y_0$ に凍結したように見えます。この凍結系を、実際に解ける方程式として定めます。

<a id="def-cdyn13-layer-equation"></a>

<!-- formal-statement-start -->
### 定義（凍結した速い層方程式）

$y_*\in\mathbb R$ を固定する。臨界多様体上の点 $(h(y_*),y_*)$ の近くにおける **層方程式** を

$$
\frac{dX}{d\tau}=-a(X-h(y_*)),\qquad Y(\tau)=y_*
$$

と呼ぶ。解は任意の $X(0)=X_0$ に対して

$$
X(\tau)=h(y_*)+(X_0-h(y_*))e^{-a\tau}
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn13-layer-equation -->
**定義の確認**　$h(y)=2y$、$y_*=1$、$X_0=5$ とすると、$X(\tau)=2+3e^{-a\tau}$ です。微分すると $X'=-3ae^{-a\tau}$、右辺も $-a(X-2)=-3ae^{-a\tau}$ で一致します。$a>0$ だから $X(\tau)\to2$ で、固定した $y$ に対して臨界多様体へ引き込まれます。
<!-- definition-example-end -->

$a>0$ が **法線方向の引込み** に対応します。$x$ 方向へ変位 $u=X-h(y_*)$ を与えると、層方程式は $u'=-au$ です。逆符号なら変位は増大します。この符号が後の誤差評価の土台です。

## 3. 初期層と遅い追従を同じ積分公式で扱う

単純な層方程式だけでは、$y$ が実際に動く効果を無視しています。そこで曲線からのずれを

$$
q(t)=x(t)-h(y(t)),\qquad q_0=x_0-h(y_0)
$$

と置きます。連鎖律と $y'=b$ から

$$
q'=x'-h'(y)y'
=-\frac a\varepsilon q-bh'(y_0+bt).
$$

$x$ 自身の方程式と違い、右辺の第2項が **動く目標曲線に追いつくための遅れ** を直接表します。

<a id="lem-cdyn13-error-formula"></a>

<!-- formal-statement-start -->
### 補題（追従誤差の正確な積分表示）

$a>0$、$b\in\mathbb R$、$0<\varepsilon\le1$、$h\in C^1(\mathbb R)$ とする。初期値 $(x_0,y_0)$ の解について、全ての $t\ge0$ で

$$
\begin{aligned}
q(t)
&=q_0e^{-at/\varepsilon}\\
&\quad-b\int_0^t e^{-a(t-s)/\varepsilon}
h'(y_0+bs)\,ds
\end{aligned}
$$

が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　係数 $a/\varepsilon$ を指数積分因子で処理します。初期値の記憶と、動く目標値による強制項とが別々に現れます。

<!-- proof-start -->
### 証明

$g(t)=bh'(y_0+bt)$ と略記すれば、

$$
q'+\frac a\varepsilon q=-g(t).
$$

両辺に積分因子 $e^{at/\varepsilon}$ を掛けると、積の微分法則で

$$
\frac d{dt}\left(e^{at/\varepsilon}q(t)\right)
=e^{at/\varepsilon}
\left(q'+\frac a\varepsilon q\right)
=-e^{at/\varepsilon}g(t).
$$

$0$ から $t$ まで積分し、

$$
e^{at/\varepsilon}q(t)-q_0
=-\int_0^t e^{as/\varepsilon}g(s)\,ds.
$$

両辺を $e^{at/\varepsilon}$ で割れば

$$
q(t)=q_0e^{-at/\varepsilon}
-\int_0^t e^{-a(t-s)/\varepsilon}g(s)\,ds.
$$

$g(s)=bh'(y_0+bs)$ を戻せば結論です。逆にこの式を微分すると元の一次線形方程式と初期値を満たすので、解は一意です。$\square$
<!-- proof-end -->

<a id="thm-cdyn13-initial-layer-tracking"></a>

<!-- formal-statement-start -->
### 定理（初期層と有限時間の追従誤差）

$a>0$、$b\in\mathbb R$、$0<\varepsilon\le1$、$h\in C^1(\mathbb R)$、$T>0$ とする。初期値 $(x_0,y_0)$ は $\varepsilon$ に依存しないとし、

$$
H_1=\max_{0\le s\le T}|h'(y_0+bs)|
$$

と置く。このとき全ての $0\le t\le T$ で

$$
\boxed{\;
|x(t)-h(y(t))|
\le |q_0|e^{-at/\varepsilon}
+\frac{\varepsilon |b|H_1}{a}
(1-e^{-at/\varepsilon}).
\;}
$$

特に任意の $0<\delta\le T$ について

$$
\sup_{\delta\le t\le T}
|x(t)-h(y(t))|
\le |q_0|e^{-a\delta/\varepsilon}
+\frac{\varepsilon|b|H_1}{a}
\longrightarrow0
$$

である。$q_0=0$ なら $[0,T]$ 全域でも誤差は $O(\varepsilon)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[追従誤差の積分表示](#lem-cdyn13-error-formula)から三角不等式を適用します。$s\in[0,T]$ で $|h'(y_0+bs)|\le H_1$ なので、

$$
|q(t)|
\le |q_0|e^{-at/\varepsilon}
+|b|H_1\int_0^t e^{-a(t-s)/\varepsilon}\,ds.
$$

ここで $u=t-s$ とおけば

$$
\begin{aligned}
\int_0^t e^{-a(t-s)/\varepsilon}\,ds
&=\int_0^t e^{-au/\varepsilon}\,du\\
&=\left[-\frac{\varepsilon}{a}
e^{-au/\varepsilon}\right]_{0}^{t}\\
&=\frac{\varepsilon}{a}(1-e^{-at/\varepsilon}).
\end{aligned}
$$

これを代入して最初の評価が従います。$\delta\le t$ なら $e^{-at/\varepsilon}\le e^{-a\delta/\varepsilon}$ であり、残りの係数は $\varepsilon$ に比例します。従って一様収束が成立します。$q_0=0$ の場合は指数項が消え、最初から $[0,T]$ で同じ $O(\varepsilon)$ 評価が使えます。$\square$
<!-- proof-end -->

**どの時刻の主張か**　$T$ は固定しており、$H_1$ はその区間の $y$ の値から決まります。$T$ が $\varepsilon$ とともに無制限に大きくなる場合に同じ定数が使えるとは限りません。また、$q_0\ne0$ の初期値では $|q(0)|=|q_0|$ のままであり、$[0,T]$ で一様に $q\to0$ と言うことはできません。

初期層がいつ $O(\varepsilon)$ へ縮むかも、指数項から読み取れます。$0<\varepsilon<1$ とし、

$$
t_\varepsilon=\frac{\varepsilon}{a}\log\frac1\varepsilon
$$

と置けば、

$$
e^{-at_\varepsilon/\varepsilon}
=e^{-\log(1/\varepsilon)}=\varepsilon.
$$

従って $t_\varepsilon\le t\le T$ では最初の評価から

$$
|q(t)|\le\varepsilon|q_0|
+\frac{\varepsilon|b|H_1}{a}.
$$

しかも $t_\varepsilon\to0$ です。つまり固定した正時刻まで待たなくても、長さがおよそ $\varepsilon\log(1/\varepsilon)$ の初期層を過ぎれば、ずれはこの評価で $O(\varepsilon)$ になります。

## 4. 固定時刻の極限と拡大した初期時刻の極限

誤差が小さいとは、いつの時刻で観測するかを含めて述べる必要があります。定理の評価は $t>0$ を固定すると指数項が消えることを示しています。しかし $t$ 自身を $\varepsilon$ 倍へ縮めると、その記憶は残ります。

<a id="thm-cdyn13-fast-time-limit"></a>

<!-- formal-statement-start -->
### 定理（速い時間で見た初期層の極限）

[初期層と追従誤差の定理](#thm-cdyn13-initial-layer-tracking)と同じ仮定のもとで、任意の固定した $S>0$ に対して

$$
X_\varepsilon(\tau)=x(\varepsilon\tau),\qquad
Y_\varepsilon(\tau)=y(\varepsilon\tau)
$$

と置くと、$0\le\tau\le S$ で一様に

$$
\begin{aligned}
X_\varepsilon(\tau)
&\longrightarrow h(y_0)+q_0e^{-a\tau},\\
Y_\varepsilon(\tau)&\longrightarrow y_0
\end{aligned}
$$

となる。特に $q_0\ne0$ なら $t>0$ 固定の極限と、$t=\varepsilon\tau$ として見た極限は一致しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$y(\varepsilon\tau)=y_0+\varepsilon b\tau$ だから、

$$
|Y_\varepsilon(\tau)-y_0|
=\varepsilon|b|\tau
\le\varepsilon|b|S.
$$

十分小さい $\varepsilon$ で $\varepsilon S\le T$ とし、[追従誤差の積分表示](#lem-cdyn13-error-formula)に $t=\varepsilon\tau$ を代入すると

$$
q(\varepsilon\tau)
=q_0e^{-a\tau}
-b\varepsilon\int_0^\tau
e^{-a(\tau-u)}h'(y_0+\varepsilon bu)\,du.
$$

$u=s/\varepsilon$ の置換で $ds=\varepsilon\,du$ としたことに注意します。$|h'|\le H_1$ を使えば、積分項の絶対値は

$$
\varepsilon|b|H_1\int_0^\tau e^{-a(\tau-u)}\,du
\le\frac{\varepsilon|b|H_1}{a}.
$$

また平均値の定理より

$$
|h(y_0+\varepsilon b\tau)-h(y_0)|
\le H_1\varepsilon|b|S.
$$

$x=h(y)+q$ を合わせると

$$
\sup_{0\le\tau\le S}
|X_\varepsilon(\tau)-h(y_0)-q_0e^{-a\tau}|
\le\varepsilon|b|H_1(S+1/a),
$$

となります。右辺が0へ収束するため、一様収束が従います。$q_0\ne0$ なら $\tau=0$ で初期値のずれが消えず、$t>0$ 固定の極限 $x(t)\to h(y_0+bt)$ と異なります。$\square$
<!-- proof-end -->

<a id="prop-cdyn13-nonuniform-limit"></a>

<!-- formal-statement-start -->
### 命題（初期値の不整合と一様極限の失敗）

$a>0$、$b\in\mathbb R$、$h\in C^1(\mathbb R)$、$\varepsilon$ に依存しない初期値 $(x_0,y_0)$、$T>0$ のもとで、$q_0\ne0$ とする。このとき $x_\varepsilon(t)\to h(y_0+bt)$ は各 $t>0$ で成立するが、$[0,T]$ 上の一様収束は成立しない。$\varepsilon$ に依存する初期値を許す場合、$q_0(\varepsilon)\to0$ なら定理の評価から $[0,T]$ の一様収束が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $t>0$ では[追従誤差の評価](#thm-cdyn13-initial-layer-tracking)の右辺が0に向かいます。一方、任意の $\varepsilon$ について

$$
\sup_{0\le t\le T}|x_\varepsilon(t)-h(y_0+bt)|
\ge |x_\varepsilon(0)-h(y_0)|=|q_0|>0.
$$

よって一様収束はありません。$q_0(\varepsilon)\to0$ なら同じ定理の右辺を $t\in[0,T]$ で上から

$$
|q_0(\varepsilon)|+\frac{\varepsilon|b|H_1}{a}
$$

と抑えられ、これが0へ収束します。$\square$
<!-- proof-end -->

## 5. 追従先は少しだけずれる

臨界多様体は速い方向への吸引の目印ですが、$\varepsilon>0$ で実際に追う軌道がその上に乗り続けるとは限りません。追従の第一補正は、動いている目標値の微分から計算できます。以下では $h\in C^2(\mathbb R)$ を追加します。

<a id="thm-cdyn13-first-order-lag"></a>

<!-- formal-statement-start -->
### 定理（遅れの一次補正と二次誤差）

$a>0$、$b\in\mathbb R$、$h\in C^2(\mathbb R)$、$T>0$ とし、

$$
H_2=\max_{0\le s\le T}|h''(y_0+bs)|
$$

を置く。初期値 $(x_0,y_0)$ と $0<\varepsilon\le1$ の解について、$0\le t\le T$ で

$$
\begin{aligned}
q(t)
&=-\frac{\varepsilon b}{a}h'(y(t))\\
&\quad+e^{-at/\varepsilon}
\left(q_0+\frac{\varepsilon b}{a}h'(y_0)\right)
+R_\varepsilon(t)
\end{aligned}
$$

かつ

$$
|R_\varepsilon(t)|
\le\frac{\varepsilon^2b^2H_2}{a^2}
(1-e^{-at/\varepsilon})
$$

が成立する。従って初期層が消えた固定時刻では、主な遅れは $-\varepsilon b h'(y(t))/a$ である。
<!-- formal-statement-end -->

**証明の見取り図**　[追従誤差の積分表示](#lem-cdyn13-error-formula)を一度部分積分して、終点 $h'(y(t))$ と始点 $h'(y_0)$ を取り出します。残りは $h''$ を含む指数積分なので一段小さい誤差として評価できます。

<!-- proof-start -->
### 証明

$f(s)=h'(y_0+bs)$、$\lambda=a/\varepsilon$ と書くと $f'(s)=b h''(y_0+bs)$ です。指数核は

$$
\frac{d}{ds}e^{-\lambda(t-s)}
=\lambda e^{-\lambda(t-s)}
$$

を満たすので、部分積分により

$$
\begin{aligned}
\int_0^t e^{-\lambda(t-s)}f(s)\,ds
&=\left[\frac{e^{-\lambda(t-s)}}{\lambda}f(s)\right]_0^t\\
&\quad-\frac1\lambda\int_0^t
e^{-\lambda(t-s)}f'(s)\,ds\\
&=\frac{f(t)-e^{-\lambda t}f(0)}{\lambda}\\
&\quad-\frac b\lambda\int_0^t
e^{-\lambda(t-s)}h''(y_0+bs)\,ds.
\end{aligned}
$$

この結果を[積分表示](#lem-cdyn13-error-formula)へ代入します。

$$
\begin{aligned}
q(t)
&=q_0e^{-\lambda t}
-\frac b\lambda(f(t)-e^{-\lambda t}f(0))\\
&\quad+\frac{b^2}{\lambda}
\int_0^t e^{-\lambda(t-s)}h''(y_0+bs)\,ds\\
&=-\frac{\varepsilon b}{a}h'(y(t))\\
&\quad+e^{-at/\varepsilon}
\left(q_0+\frac{\varepsilon b}{a}h'(y_0)\right)
+R_\varepsilon(t).
\end{aligned}
$$

最後の積分が $R_\varepsilon$ です。定理3節と同じ指数核の積分評価を使い、

$$
\begin{aligned}
|R_\varepsilon(t)|
&\le\frac{\varepsilon b^2H_2}{a}
\int_0^t e^{-a(t-s)/\varepsilon}\,ds\\
&=\frac{\varepsilon^2b^2H_2}{a^2}
(1-e^{-at/\varepsilon}).
\end{aligned}
$$

これで示されました。$b=0$ では遅れ項と剰余は0で、初期層だけが残ることも式に含まれます。$\square$
<!-- proof-end -->

<a id="prop-cdyn13-affine-slow-graph"></a>

<!-- formal-statement-start -->
### 命題（一次関数の場合の正確な追従曲線）

$a>0$、$h(y)=cy+d$、$b,c,d\in\mathbb R$ とする。このとき各 $\varepsilon>0$ について曲線

$$
\mathcal C_\varepsilon
=\{(x,y):x=cy+d-\varepsilon bc/a\}
$$

は元の速遅系に不変であり、任意の初期値からのずれは $e^{-at/\varepsilon}$ 倍に減る。$bc\ne0$ なら臨界多様体 $\mathcal C_0$ 自身は不変ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$h'(y)=c$ なので $q'=-a q/\varepsilon-bc$ です。[積分表示](#lem-cdyn13-error-formula)に代入して

$$
\begin{aligned}
q(t)
&=q_0e^{-at/\varepsilon}
-bc\,\frac{\varepsilon}{a}(1-e^{-at/\varepsilon})\\
&=-\frac{\varepsilon bc}{a}
+\left(q_0+\frac{\varepsilon bc}{a}\right)e^{-at/\varepsilon}.
\end{aligned}
$$

初期値が $\mathcal C_\varepsilon$ 上なら $q_0=-\varepsilon bc/a$ であり、その後も $q(t)$ はこの値を保ちます。一般の初期値との縦方向の差は

$$
q(t)+\frac{\varepsilon bc}{a}
=\left(q_0+\frac{\varepsilon bc}{a}\right)e^{-at/\varepsilon}.
$$

一方、$\mathcal C_0$ 上では $q_0=0$ ですが、$bc\ne0$ なら $q'(0)=-bc\ne0$ なので、直ちに曲線から離れます。$\square$
<!-- proof-end -->

**具体例**　$a=2$、$b=1$、$h(y)=3y$ とすると、速い目標は $x=3y$ ですが、不変な追従直線は $x=3y-3\varepsilon/2$ です。初期値をこの直線上に置けば $x'=3$、元の速い方程式からも $\varepsilon x'=2(3\varepsilon/2)=3\varepsilon$ が得られます。この計算は、$\mathcal C_0$ と $\mathcal C_\varepsilon$ を混同しないための直接検算です。

## 6. 緩和振動は何を追加して初めて起こるか

ゆっくり進んでいるうちは曲線へ近づき、ある場所で速い方向へ飛び移る。これが **緩和振動** の基本的な絵です。しかし本章の線形速遅模型から、そのような周期運動は生まれません。

<a id="prop-cdyn13-no-periodic"></a>

<!-- formal-statement-start -->
### 命題（本模型に非定常周期解はない）

$a>0$、$b\in\mathbb R$、$h\in C^1(\mathbb R)$、$\varepsilon>0$ に対する

$$
\varepsilon x'=-a(x-h(y)),\qquad y'=b
$$

は、$\mathbb R^2$ 上に非定常な周期解を持たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

周期 $P>0$ の解があると仮定します。$y(t+P)-y(t)=bP$ なので、周期性から $bP=0$、従って $b=0$ です。このとき $y(t)=y_0$ は一定で、速い方程式の解は[凍結した速い層方程式](#def-cdyn13-layer-equation)の表示により

$$
x(t)=h(y_0)+(x_0-h(y_0))e^{-at/\varepsilon}.
$$

$x(t+P)=x(t)$ を $t=0$ に適用すると

$$
(x_0-h(y_0))(e^{-aP/\varepsilon}-1)=0.
$$

$a,P,\varepsilon>0$ だから $e^{-aP/\varepsilon}\ne1$ です。従って $x_0=h(y_0)$ で、解は定数です。これは非定常という仮定と矛盾します。$\square$
<!-- proof-end -->

周期的な速いジャンプを論じるには、単に $\varepsilon$ が小さいだけでなく、折れ曲がる臨界曲線、吸引側の枝、枝の終端付近での近似の破綻、戻り道となる遅い流れなどが必要です。例えば

$$
\varepsilon x'=y+x-x^3,\qquad y'=b
$$

という非線形な速い方程式では、臨界集合は $y=x^3-x$ で、固定した $y$ に対する右辺の $x$ 微分は $1-3x^2$ です。$|x|>1/\sqrt3$ では負、$|x|<1/\sqrt3$ では正となり、$x=\pm1/\sqrt3$ で0になります。ここでは負の枝だけが局所的に速い方向へ引き込みます。微分が0の折返し点では、線形模型で用いた一定の $a>0$ による指数評価は成立しません。

しかもこの例も $b\ne0$ のままなら $y$ が単調なので周期解を持ちません。実際の緩和振動を証明するには、遅い変数を戻す機構と、折返し点を通る軌道の制御が必要です。一般のFenichel理論や非線形系の周期軌道存在定理を、ここでは証明抜きに使いません。

## 7. 演習と詳細解答

### A1. 凍結した速い層の解

$a=3,\ h(y)=y+1,\ y_*=2,\ X(0)=8$ の層方程式を解き、微分方程式を満たすことと極限値を確かめよ。

- Level: A
- ID: CDYN13-A1

<!-- solution-start -->
**詳細解答**　[層方程式の定義](#def-cdyn13-layer-equation)では $h(2)=3$ です。$U=X-3$ と置くと

$$
U'=-3U,\qquad U(0)=8-3=5.
$$

従って $U(\tau)=5e^{-3\tau}$、つまり

$$
X(\tau)=3+5e^{-3\tau}.
$$

$X'=-15e^{-3\tau}$、右辺は $-3(X-3)=-15e^{-3\tau}$ で一致します。$\tau\to\infty$ では $X\to3$ です。
<!-- solution-end -->

### A2. ずれの微分方程式

$a=2,\ b=-1,\ h(y)=y^2$、$y(0)=2$ とする。$q=x-y^2$ の微分方程式と $y(t)$ を求めよ。

- Level: A
- ID: CDYN13-A2

<!-- solution-start -->
**詳細解答**　遅い式を積分すれば $y(t)=2-t$ です。$q=x-y^2$ を微分し、

$$
\begin{aligned}
q'&=x'-2yy'\\
&=-\frac2\varepsilon(x-y^2)-2y(-1)\\
&=-\frac2\varepsilon q+2(2-t).
\end{aligned}
$$

従って $q'+(2/\varepsilon)q=4-2t$ です。右辺の符号は $b=-1$ を使った結果であり、単に $-h'$ としないことが重要です。
<!-- solution-end -->

### A3. 指数核の積分

$a>0$、$\varepsilon>0$、$t\ge0$ に対して

$$
I(t)=\int_0^t e^{-a(t-s)/\varepsilon}\,ds
$$

を計算し、$I(t)\le\varepsilon/a$ を証明せよ。

- Level: A
- ID: CDYN13-A3

<!-- solution-start -->
**詳細解答**　$u=t-s$ で積分の向きを入れ替えると、

$$
\begin{aligned}
I(t)
&=\int_t^0e^{-au/\varepsilon}(-du)
=\int_0^t e^{-au/\varepsilon}\,du\\
&=\frac{\varepsilon}{a}(1-e^{-at/\varepsilon}).
\end{aligned}
$$

$0<e^{-at/\varepsilon}\le1$ なので $0\le I(t)\le\varepsilon/a$ です。この係数は、[追従誤差の定理](#thm-cdyn13-initial-layer-tracking)で遅い駆動の効果が $O(\varepsilon)$ となる根拠です。
<!-- solution-end -->

### A4. 臨界曲線は不変か

$a=1,\ b=2,\ h(y)=y$ とする。$q(0)=0$ から出発したとき、$q'(0)$ と $q(t)$ を求め、$\mathcal C_0$ が不変か判定せよ。

- Level: A
- ID: CDYN13-A4

<!-- solution-start -->
**詳細解答**　$q'=-q/\varepsilon-2$ なので $q'(0)=-2$ です。[一次関数の追従曲線の命題](#prop-cdyn13-affine-slow-graph)へ $a=1,\ bc=2$ を代入すると

$$
q(t)=-2\varepsilon+(0+2\varepsilon)e^{-t/\varepsilon}
=-2\varepsilon(1-e^{-t/\varepsilon}).
$$

$t>0$ なら $q(t)<0$ なので、$q=0$ の臨界曲線に留まりません。不変なのは $q=-2\varepsilon$ の直線です。
<!-- solution-end -->

### A5. 速い時間の変換

$\varepsilon x'=-2(x-h(y)),\ y'=3$ とする。$\tau=t/\varepsilon$、$X(\tau)=x(\varepsilon\tau)$、$Y(\tau)=y(\varepsilon\tau)$ と置いて方程式を導き、$\varepsilon\to0$ の凍結系を書け。

- Level: A
- ID: CDYN13-A5

<!-- solution-start -->
**詳細解答**　連鎖律で

$$
\frac{dX}{d\tau}
=\varepsilon x'(\varepsilon\tau)
=-2(X-h(Y))
$$

です。また

$$
\frac{dY}{d\tau}
=\varepsilon y'(\varepsilon\tau)=3\varepsilon.
$$

$\varepsilon\to0$ で $Y'=0$、従って $Y=y_0$ とした層方程式 $X'=-2(X-h(y_0))$ が現れます。凍結するのは速い時間で見た $Y$ であり、元の時刻で常に $y'=0$ という意味ではありません。
<!-- solution-end -->

### B1. 初期層の長さを決める

$0<\varepsilon\le1$、$a=2$、$b=1$、$h(y)=\sin y$、$q_0=3$ とする。任意の $T>0$ に対して $0\le t\le T$ の誤差評価を求めよ。さらに $0<\varepsilon<1$ で $t_\varepsilon=(\varepsilon/2)\log(1/\varepsilon)$ としたとき、$|q(t_\varepsilon)|$ を上から評価せよ（$t_\varepsilon\le T$ とする）。

- Level: B
- ID: CDYN13-B1

<!-- solution-start -->
**詳細解答**　$h'(y)=\cos y$ なので $H_1\le1$ です。[初期層と追従誤差の定理](#thm-cdyn13-initial-layer-tracking)を $a=2,\ b=1$ に適用すると

$$
|q(t)|\le3e^{-2t/\varepsilon}
+\frac{\varepsilon}{2}(1-e^{-2t/\varepsilon}).
$$

$t_\varepsilon$ では指数因子を直接計算でき、

$$
e^{-2t_\varepsilon/\varepsilon}
=e^{-\log(1/\varepsilon)}=\varepsilon.
$$

従って

$$
|q(t_\varepsilon)|
\le3\varepsilon+\frac{\varepsilon}{2}(1-\varepsilon)
\le\frac72\varepsilon.
$$

この時刻までに初期層の $O(1)$ のずれが $O(\varepsilon)$ へ縮みます。なお $t_\varepsilon\to0$ でもあり、固定時刻の極限と初期層の尺度は区別する必要があります。
<!-- solution-end -->

### B2. 追従曲線の一次補正

$a=4,\ b=2,\ h(y)=y^2$ とする。任意の初期値について $q(t)$ の一次補正、指数初期層、二次剰余を明示し、剰余の上界を与えよ。

- Level: B
- ID: CDYN13-B2

<!-- solution-start -->
**詳細解答**　$h'(y)=2y$、$h''(y)=2$、$y(t)=y_0+2t$ です。[遅れの一次補正定理](#thm-cdyn13-first-order-lag)へ

$$
\frac{\varepsilon b}{a}=\frac{\varepsilon}{2},
\qquad
\frac{\varepsilon^2b^2 H_2}{a^2}
=\frac{\varepsilon^2\cdot4\cdot2}{16}
=\frac{\varepsilon^2}{2}
$$

を代入すると、

$$
q(t)=-\varepsilon y(t)
+e^{-4t/\varepsilon}(q_0+\varepsilon y_0)
+R_\varepsilon(t)
$$

かつ

$$
|R_\varepsilon(t)|
\le\frac{\varepsilon^2}{2}(1-e^{-4t/\varepsilon})
$$

です。さらに定理の証明中の積分を直接計算すれば

$$
\begin{aligned}
R_\varepsilon(t)
&=\frac{\varepsilon b^2}{a}
\int_0^t e^{-4(t-s)/\varepsilon}\,2\,ds\\
&=2\varepsilon\cdot\frac{\varepsilon}{4}
(1-e^{-4t/\varepsilon})\\
&=\frac{\varepsilon^2}{2}(1-e^{-4t/\varepsilon}).
\end{aligned}
$$

この例では剰余が非負で、上界に等号が成立します。
<!-- solution-end -->

### B3. 初期値を $\varepsilon$ とともに動かす

$a>0$、$b\in\mathbb R$、$h\in C^1$ と固定した $y_0,T>0$ を考える。初期値を $x_0(\varepsilon)=h(y_0)+\sqrt{\varepsilon}$ とした場合と、$x_0=h(y_0)+1$ とした場合で、$[0,T]$ 上の一様収束をそれぞれ判定せよ。

- Level: B
- ID: CDYN13-B3

<!-- solution-start -->
**詳細解答**　第一の場合は $q_0(\varepsilon)=\sqrt{\varepsilon}$ です。[一様極限に関する命題](#prop-cdyn13-nonuniform-limit)の上界を使うと

$$
\sup_{0\le t\le T}|q(t)|
\le\sqrt{\varepsilon}
+\frac{\varepsilon|b|H_1}{a}\longrightarrow0.
$$

従って一様収束します。ただし一般に評価は $O(\sqrt\varepsilon)$ であり $O(\varepsilon)$ とは限りません。

第二の場合は $q_0=1$ なので、初期時刻だけで

$$
\sup_{0\le t\le T}|q(t)|\ge|q(0)|=1.
$$

従って一様収束しません。ただし固定した任意の $t>0$ では、指数項が0へ向かい、駆動項は $O(\varepsilon)$ なので点ごとの収束は成立します。
<!-- solution-end -->

### B4. 折返し点の符号と周期運動の障害

$\varepsilon x'=y+x-x^3,\ y'=b$ を考える。臨界集合を求め、固定した $y$ での速い方向の安定・不安定な部分とその境界を計算せよ。また $b\ne0$ なら周期解がないことを証明せよ。

- Level: B
- ID: CDYN13-B4

<!-- solution-start -->
**詳細解答**　速い右辺が0になる条件は $y+x-x^3=0$、すなわち $y=x^3-x$ です。固定した $y$ と平衡 $x_*$ のまわりで $x=x_*+u$ と置き、右辺を展開すると

$$
\begin{aligned}
y+(x_*+u)-(x_*+u)^3
&=(1-3x_*^2)u-3x_*u^2-u^3.
\end{aligned}
$$

一次項の係数が負なら十分小さい変位を戻す向きに動かし、正なら遠ざけます。従って $|x_*|>1/\sqrt3$ が吸引側、$|x_*|<1/\sqrt3$ が反発側です。境界 $x_*=\pm1/\sqrt3$ では係数が0なので一次線形化では判定できません。

$b\ne0$ で周期 $P>0$ があるとすれば $y(t+P)-y(t)=bP\ne0$ となり、周期性と矛盾します。臨界集合が折れ曲がるだけでは周期運動は保証されません。
<!-- solution-end -->

### C1. 二次の目標曲線で極限を全て照合する

$0<\varepsilon\le1$ に対し

$$
\varepsilon x'=-2(x-y^2),\qquad y'=1,\qquad
x(0)=1,\quad y(0)=0
$$

を考える。

1. $y(t)$ と $q(t)=x(t)-y(t)^2$ の正確な解を求めよ。
2. $t>0$ を固定した極限と $t=\varepsilon\tau$（$\tau\ge0$ 固定）の極限をそれぞれ求めよ。
3. $[0,T]$ で $x(t)\to y(t)^2$ が一様でないことを示し、任意の $\delta>0$ では $[\delta,T]$ で一様となることを証明せよ。
4. 一次の遅れ $-\varepsilon t$ と二次剰余の上界を導出せよ。
5. この系が非定常周期解を持たない理由を述べよ。

- Level: C
- ID: CDYN13-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$y'=1,\ y(0)=0$ より $y(t)=t$ です。$q=x-t^2$ とすると

$$
q'=x'-2t=-\frac2\varepsilon q-2t,\qquad q(0)=1.
$$

[追従誤差の正確な積分表示](#lem-cdyn13-error-formula)から

$$
q(t)=e^{-2t/\varepsilon}
-2\int_0^t e^{-2(t-s)/\varepsilon}s\,ds.
$$

$\lambda=2/\varepsilon$ として部分積分すると、

$$
\begin{aligned}
\int_0^t e^{-\lambda(t-s)}s\,ds
&=\left[\frac{s}{\lambda}e^{-\lambda(t-s)}\right]_0^t
-\frac1\lambda\int_0^t e^{-\lambda(t-s)}\,ds\\
&=\frac t\lambda-\frac{1-e^{-\lambda t}}{\lambda^2}.
\end{aligned}
$$

したがって

$$
\boxed{\;
q(t)=e^{-2t/\varepsilon}
-\varepsilon t+\frac{\varepsilon^2}{2}
(1-e^{-2t/\varepsilon}).
\;}
$$

$x(t)=t^2+q(t)$ です。$t=0$ を代入すると $q(0)=1$ も確かめられます。

**(2)**　固定した $t>0$ では $e^{-2t/\varepsilon}\to0$、$\varepsilon t\to0$、$\varepsilon^2(1-e^{-2t/\varepsilon})\to0$ なので

$$
x(t)\longrightarrow t^2.
$$

一方 $t=\varepsilon\tau$ とすれば

$$
\begin{aligned}
x(\varepsilon\tau)
&=\varepsilon^2\tau^2+e^{-2\tau}
-\varepsilon^2\tau
+\frac{\varepsilon^2}{2}(1-e^{-2\tau})\\
&\longrightarrow e^{-2\tau}.
\end{aligned}
$$

初期層を拡大して見ると、初期値1の記憶が残ります。

**(3)**　$|x(0)-y(0)^2|=1$ なので、$[0,T]$ の一様収束はありません。一方 $\delta\le t\le T$ では、(1) の解の各項を三角不等式で抑えれば

$$
|q(t)|
\le e^{-2\delta/\varepsilon}
+\varepsilon T+\frac{\varepsilon^2}{2}.
$$

右辺は $\varepsilon\to0$ で0に向かうため、$[\delta,T]$ では一様収束します。

**(4)**　[一次補正定理](#thm-cdyn13-first-order-lag)に $a=2,b=1,h(y)=y^2$ を代入します。$h'(y(t))=2t$ なので

$$
-\frac{\varepsilon b}{a}h'(y(t))
=-\varepsilon t.
$$

$h'(0)=0$ であり、初期層の係数は $q_0=1$ のままです。剰余は

$$
R_\varepsilon(t)
=\frac{\varepsilon^2}{2}(1-e^{-2t/\varepsilon}),
\qquad
0\le R_\varepsilon(t)\le\frac{\varepsilon^2}{2}.
$$

この式は (1) の正確な解とも一致します。

**(5)**　$y(t)=t$ が厳密に増加するため、任意の $P>0$ で $y(t+P)\ne y(t)$ です。[非定常周期解がない命題](#prop-cdyn13-no-periodic)の特殊例として、元の二次元解は周期的になれません。
<!-- solution-end -->

本章の線形速遅模型では、指数初期層・臨界曲線への追従・$O(\varepsilon)$ の遅れ・特異極限の非一様性が全て一つの積分公式から分かりました。次のCDYN14では、時間尺度だけでなく、結合のある空間格子で各モードが異なる減衰率を持つ状況へ進みます。
