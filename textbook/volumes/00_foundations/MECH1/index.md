# MECH1 運動を測る：位置・速度・加速度

<!-- definition-example-audit: strict -->

> **既出概念**：[RA3 微分法の理論](../RA3/index.md)と[F0-00E1 内積・Gram–Schmidt・QR](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)を使います。高校物理は前提にしません。

カメラや位置センサーが直接与えるのは、たとえば

$$
(t_0,x_0),\ (t_1,x_1),\ (t_2,x_2),\ldots
$$

のような、**離散的な時刻と位置の組**です。センサーは「粒子の軌道は二回微分可能な関数である」と教えてくれるわけではありません。

力学では、まず観測された位置の列を、時刻 $t$ に対して位置を返す関数

$$
r(t)
$$

で近似するという理想化を置きます。さらに速度や加速度を使いたいなら、その関数が必要な回数だけ微分可能だと仮定します。

ここで重要なのは、

$$
\boxed{
\text{観測値}
\quad\ne\quad
\text{観測値を説明する連続関数モデル}
}
$$

という区別です。

本章では、まだ「なぜ物体がそのように動くか」は扱いません。力や Newton の運動法則は MECH2 の仕事です。ここではその前段階として、

- 何を測るのか
- どの座標系で位置を記述するのか
- 位置の時間変化から速度・加速度をどう定義するのか
- 同じ運動を別の等速移動座標系から見ると何が変わるのか

を整理します。

これが **運動学** の出発点です。

---

## 1. 数値だけでは物理量にならない：次元と単位

「長さが 3」と言われても、3 m なのか 3 km なのかで意味は全く違います。物理量は、数値だけでなく「何の種類の量か」と「どの尺度で測ったか」を伴います。

本章でまず必要なのは、長さと時間です。長さの次元を $L$、時間の次元を $T$ と書きます。

<a id="def-mech1-dimension-unit"></a>

<!-- formal-statement-start -->
### 定義（物理量の次元と単位）

物理量が長さ・時間・質量などの基本的な量をどの組合せで表すかを、その物理量の **次元** と呼ぶ。

本章では長さを $L$、時間を $T$ と書く。

同じ次元の物理量を数値で表すために選ぶ尺度を **単位** と呼ぶ。SI では、長さの単位に metre（m）、時間の単位に second（s）を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech1-dimension-unit -->

### **定義の確認**：速度と加速度の次元

長さ $x$ を時間 $t$ で割った量は

$$
\frac{x}{t}
$$

なので、その次元は

$$
\frac{L}{T}
=
LT^{-1}.
$$

後で定義する速度はこの次元を持ち、SI 単位は m/s です。

さらに速度を時間で割れば

$$
\frac{LT^{-1}}{T}
=
LT^{-2},
$$

となるので、加速度の次元は $LT^{-2}$、SI 単位は m/s$^2$ です。

たとえば

$$
72\ \mathrm{km/h}
$$

は

$$
72\times\frac{1000\ \mathrm{m}}{3600\ \mathrm{s}}
=
20\ \mathrm{m/s}
$$

です。数値は 72 から 20 に変わっても、表している物理量そのものは同じです。

<!-- definition-example-end -->

次元は計算ミスを早く見つける道具になります。たとえば位置を表す式

$$
x(t)=x_0+v_0t+\frac12 at^2
$$

では、

$$
[x_0]=L,
$$

$$
[v_0t]=(LT^{-1})T=L,
$$

$$
[at^2]=(LT^{-2})T^2=L.
$$

すべての項が長さの次元を持っています。

反対に

$$
x_0+v_0
$$

のように長さと速度をそのまま足す式は、単位をどう選んでも意味のある物理式にはなりません。

ただし、**次元が合うことは正しさの必要条件であって十分条件ではありません**。たとえば

$$
x=x_0+100v_0t
$$

も次元だけは合います。係数 100 が物理的に正しいかどうかは、次元解析だけでは決まりません。

---

## 2. 質点という理想化と位置ベクトル

実際の物体には大きさがあります。ボールにも車にも地球にも広がりがあります。それでも、対象の大きさや回転が問題にならない状況では、物体全体を一つの点として扱うと運動を簡潔に記述できます。

この理想化を明示しておきます。

<a id="def-mech1-point-particle-trajectory"></a>

<!-- formal-statement-start -->
### 定義（質点・位置ベクトル・軌道）

物体の大きさ・形・回転を無視し、その位置だけを一点で代表させるモデルを **質点** と呼ぶ。

時間区間 $I\subset\mathbb R$ 上で質点の位置を

$$
r:I\to\mathbb R^3
$$

という関数で表すとき、$r(t)$ を時刻 $t$ における **位置ベクトル** と呼び、関数 $r$ 全体を **軌道** と呼ぶ。

座標表示を

$$
r(t)=
\begin{pmatrix}
x(t)\\
y(t)\\
z(t)
\end{pmatrix}
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech1-point-particle-trajectory -->

### **定義の確認**：平面内の放物線状の軌道

$$
r(t)
=
\begin{pmatrix}
2t\\
3-t^2\\
0
\end{pmatrix}
\ \mathrm{m},
\qquad
0\le t\le2\ \mathrm{s}
$$

とします。

各時刻 $t$ に対して三次元空間内の一点が一つ定まるので、これは位置ベクトルを与える関数です。

また常に

$$
z(t)=0
$$

なので、運動は $xy$ 平面内にあります。

$t=0$ では

$$
r(0)=
\begin{pmatrix}
0\\
3\\
0
\end{pmatrix}
\ \mathrm{m},
$$

$t=2$ では

$$
r(2)=
\begin{pmatrix}
4\\
-1\\
0
\end{pmatrix}
\ \mathrm{m}.
$$

したがってこの関数は、質点の位置を時間に応じて一意に与える軌道の定義を満たします。

<!-- definition-example-end -->

### 2.1 基準系と座標

同じ物体でも、どこを原点にし、どちらを $x$ 軸に取るかで座標値は変わります。運動を数値で記述するには、位置だけでなく「どこから、どの向きで、どの時計を使って測るか」を先に固定する必要があります。

<a id="def-mech1-reference-frame"></a>

<!-- formal-statement-start -->
### 定義（基準系）

空間内の原点、互いに直交する座標軸、および時刻を測る時計を一組選び、物体の位置と時刻を記述するための基準を定めたものを **基準系** と呼ぶ。

本章では、基準系を固定した後の位置ベクトルを $r(t)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech1-reference-frame -->

### **定義の確認**：原点だけを 10 m ずらす

基準系 $S$ では、ある時刻に質点が

$$
r=
\begin{pmatrix}
12\\
3\\
0
\end{pmatrix}
\ \mathrm{m}
$$

にあるとします。

座標軸の向きと時計はそのままに、原点を $x$ 軸正方向へ 10 m 移した基準系 $S'$ を選びます。このとき $S'$ から見た位置は

$$
r'
=
r-
\begin{pmatrix}
10\\
0\\
0
\end{pmatrix}
=
\begin{pmatrix}
2\\
3\\
0
\end{pmatrix}
\ \mathrm{m}.
$$

$S$ と $S'$ は、それぞれ原点・直交座標軸・時計を指定しているので基準系の定義を満たします。同じ質点でも、原点の選択が変われば位置ベクトルの成分は変わります。

<!-- definition-example-end -->

位置ベクトルそのものは基準系に依存します。したがって、

$$
\boxed{
\text{「位置はいくつか」には、どの基準系かという情報が必要}
}
$$

です。

### 2.2 変位と移動距離は違う

時刻 $t_1$ から $t_2$ までの **変位** は

$$
\Delta r
=
r(t_2)-r(t_1)
$$

です。

変位は始点と終点だけで決まります。途中でどれだけ遠回りしたかは見ていません。

たとえば一周して元の場所へ戻れば、

$$
r(t_2)=r(t_1)
$$

なので

$$
\Delta r=0
$$

です。しかし実際の移動距離は 0 ではありません。

この区別は、次に平均速度と瞬間速度を考えるときに効いてきます。

---

## 3. 速度と加速度は位置の時間微分

短い時間 $\Delta t$ の間に位置が

$$
\Delta r
=
r(t+\Delta t)-r(t)
$$

だけ変わったとします。

このとき

$$
\frac{\Delta r}{\Delta t}
$$

は、その時間区間全体で見た平均的な位置変化です。$\Delta t$ を 0 に近づけた極限が存在するとき、瞬間の速度が得られます。

<a id="def-mech1-velocity-acceleration"></a>

<!-- formal-statement-start -->
### 定義（質点の速度・速さ・加速度）

軌道 $r:I\to\mathbb R^3$ が時刻 $t$ で微分可能であるとする。

質点の **速度** を

$$
v(t)
:=
\frac{dr}{dt}(t)
$$

で定義する。

速度の大きさ

$$
|v(t)|
$$

を **速さ** と呼ぶ。

さらに $v$ が時刻 $t$ で微分可能であるとき、質点の **加速度** を

$$
a(t)
:=
\frac{dv}{dt}(t)
=
\frac{d^2r}{dt^2}(t)
$$

で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech1-velocity-acceleration -->

### **定義の確認**：多項式軌道の速度と加速度

$$
r(t)
=
\begin{pmatrix}
2t\\
3-t^2\\
0
\end{pmatrix}
\ \mathrm{m}
$$

を再び使います。各成分を微分すると

$$
v(t)
=
\begin{pmatrix}
2\\
-2t\\
0
\end{pmatrix}
\ \mathrm{m/s}.
$$

さらにもう一度微分すると

$$
a(t)
=
\begin{pmatrix}
0\\
-2\\
0
\end{pmatrix}
\ \mathrm{m/s^2}.
$$

時刻 $t=1\ \mathrm{s}$ では

$$
v(1)
=
\begin{pmatrix}
2\\
-2\\
0
\end{pmatrix}
\ \mathrm{m/s},
$$

したがって速さは

$$
|v(1)|
=
\sqrt{2^2+(-2)^2}
=
2\sqrt2\ \mathrm{m/s}.
$$

速度は向きを持つベクトルですが、速さは非負のスカラーです。これで速度・速さ・加速度の定義条件を実際に確認できました。

<!-- definition-example-end -->

座標ごとに書けば

$$
v(t)
=
\begin{pmatrix}
x'(t)\\
y'(t)\\
z'(t)
\end{pmatrix},
\qquad
a(t)
=
\begin{pmatrix}
x''(t)\\
y''(t)\\
z''(t)
\end{pmatrix}.
$$

したがって、位置の次元が $L$ なら

$$
[v]=LT^{-1},
\qquad
[a]=LT^{-2}.
$$

### 3.1 速度は軌道の接線方向を向く

速度の定義を差商で書けば

$$
v(t)
=
\lim_{\Delta t\to0}
\frac{r(t+\Delta t)-r(t)}{\Delta t}.
$$

分子は軌道上の二点を結ぶ割線の向きを表します。$\Delta t\to0$ とすると、この割線方向が軌道の接線方向へ近づきます。

したがって速度は「どちらへ移動しているか」を表すだけでなく、軌道の局所的な接線方向も表します。

ここで

$$
v(t)=0
$$

となる瞬間には、速度から接線方向を読むことはできません。位置関数が微分可能であることと、速度が非零であることは別の条件です。

### 3.2 平均速度と瞬間速度

区間 $[t_1,t_2]$ の平均速度は

$$
\bar v
=
\frac{r(t_2)-r(t_1)}{t_2-t_1}.
$$

一方、瞬間速度は

$$
v(t)
=
\lim_{h\to0}
\frac{r(t+h)-r(t)}{h}.
$$

平均速度は有限区間での変位を見ています。瞬間速度は、その区間を限りなく短くした極限です。

実験では有限の時間間隔でしか位置を測れないため、瞬間速度は直接「一回の測定」で得るものではありません。十分に細かい測定と、軌道が滑らかだというモデル仮定から推定します。

---

## 4. 一定加速度なら位置は二次関数になる

次の公式は力の法則ではありません。**加速度が一定だと仮定したとき、微分の定義から従う運動学的帰結**です。

<a id="prop-mech1-constant-acceleration"></a>

<!-- formal-statement-start -->
### 命題（一定加速度の位置と速度）

区間 $I$ 上で二回微分可能な軌道 $r:I\to\mathbb R^3$ を考える。

加速度が一定ベクトル $a_0$ で

$$
r''(t)=a_0
$$

を満たすとする。

基準時刻 $t_0\in I$ で

$$
r(t_0)=r_0,
\qquad
v(t_0)=v_0
$$

なら、

$$
v(t)
=
v_0+a_0(t-t_0)
$$

および

$$
r(t)
=
r_0+v_0(t-t_0)
+\frac12 a_0(t-t_0)^2
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
w(t)
:=
v(t)-a_0(t-t_0)
$$

と置きます。

微分すると

$$
w'(t)
=
v'(t)-a_0
=
a_0-a_0
=
0.
$$

各成分について導関数が 0 なので、[RA3 の平均値定理](../RA3/index.md#thm-ra3-mvt)から $w$ は一定です。

$t=t_0$ を代入すると

$$
w(t_0)=v_0.
$$

従って

$$
v(t)-a_0(t-t_0)=v_0,
$$

すなわち

$$
v(t)
=
v_0+a_0(t-t_0).
$$

次に

$$
q(t)
:=
r(t)
-v_0(t-t_0)
-\frac12a_0(t-t_0)^2
$$

と置きます。

微分すると

$$
q'(t)
=
v(t)-v_0-a_0(t-t_0).
$$

先ほど得た速度式を代入すると

$$
q'(t)=0.
$$

再び各成分に[RA3 の平均値定理](../RA3/index.md#thm-ra3-mvt)を用いると $q$ は一定です。

$t=t_0$ では

$$
q(t_0)=r_0.
$$

したがって

$$
r(t)
=
r_0+v_0(t-t_0)
+\frac12a_0(t-t_0)^2.
$$

以上で両式が得られました。
<!-- proof-end -->

この命題は、「一定加速度なら二次関数になる」ことを述べています。

逆に、観測された位置がよく二次関数で近似できるなら、そのモデルの範囲では加速度がほぼ一定だと解釈できます。

ここでも、

$$
\boxed{
\text{二次関数が観測データによく合う}
\quad\Longrightarrow\quad
\text{そのモデル内では加速度が一定}
}
$$

という順序で考えます。

---

## 5. 円運動：速さが一定でも加速度は 0 ではない

「速さが変わらないなら加速度は 0」と思うのは、一次元では自然です。しかし多次元では速度はベクトルなので、**大きさが同じでも向きが変われば速度は変化しています**。

半径 $R>0$ の円を角速度 $\omega$ で回る軌道

$$
r(t)
=
\begin{pmatrix}
R\cos\omega t\\
R\sin\omega t
\end{pmatrix}
$$

を考えます。

<a id="prop-mech1-uniform-circular-motion"></a>

<!-- formal-statement-start -->
### 命題（等速円運動の速度と加速度）

$$
r(t)
=
\begin{pmatrix}
R\cos\omega t\\
R\sin\omega t
\end{pmatrix}
$$

とする。

このとき

$$
v(t)
=
\begin{pmatrix}
-R\omega\sin\omega t\\
R\omega\cos\omega t
\end{pmatrix},
$$

$$
a(t)
=
-\omega^2r(t).
$$

したがって速さは一定で

$$
|v(t)|=R|\omega|,
$$

加速度の大きさも一定で

$$
|a(t)|=R\omega^2
$$

であり、加速度は常に円の中心向きである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[RA3 の連鎖律](../RA3/index.md#prop-ra3-chain-rule)を各成分に使います。

まず

$$
\frac{d}{dt}\cos(\omega t)
=
-\omega\sin(\omega t),
$$

$$
\frac{d}{dt}\sin(\omega t)
=
\omega\cos(\omega t).
$$

したがって

$$
v(t)
=
\begin{pmatrix}
-R\omega\sin\omega t\\
R\omega\cos\omega t
\end{pmatrix}.
$$

もう一度微分すると

$$
a(t)
=
\begin{pmatrix}
-R\omega^2\cos\omega t\\
-R\omega^2\sin\omega t
\end{pmatrix}.
$$

ここで位置ベクトルをくくれば

$$
a(t)
=
-\omega^2
\begin{pmatrix}
R\cos\omega t\\
R\sin\omega t
\end{pmatrix}
=
-\omega^2r(t).
$$

よって加速度は位置ベクトルと反対向き、すなわち中心向きです。

速さについては

$$
\begin{aligned}
|v(t)|^2
&=
R^2\omega^2
\left(
\sin^2\omega t+\cos^2\omega t
\right)\\
&=
R^2\omega^2.
\end{aligned}
$$

したがって

$$
|v(t)|=R|\omega|.
$$

同様に

$$
|a(t)|
=
\omega^2|r(t)|
=
R\omega^2.
$$

以上で主張が全て示されました。
<!-- proof-end -->

ここで一番大切なのは、

$$
\boxed{
\text{速さ一定}
\quad\not\Rightarrow\quad
\text{速度一定}
}
$$

という点です。

等速円運動では速さは一定ですが、速度の向きが絶えず変わるため、加速度は 0 ではありません。

---

## 6. 別の等速移動座標系から見る

電車の中でボールを真上に投げる場面を考えます。

車内の人から見ればボールは上下に動きます。一方、地上の人から見れば、ボールは電車と同じ水平方向の運動も持っています。

同じ物体の運動なのに位置や速度が違って見えるのは、使っている基準系が違うからです。

最も単純な場合として、二つの座標系の軸の向きは同じで、一方の原点が他方に対して一定速度 $U$ で動く状況を考えます。

<a id="def-mech1-galilei-transform"></a>

<!-- formal-statement-start -->
### 定義（等速移動する座標系間の Galilei 変換）

同じ向きの座標軸を持つ二つの基準系 $S,S'$ を考える。

$S'$ の原点が $S$ に対して一定速度ベクトル $U$ で動き、時刻 $t=0$ で $S$ から見た $S'$ の原点位置が $b$ であるとする。

同じ質点の位置を $S$ で $r(t)$、$S'$ で $r'(t)$ と書くとき、

$$
r'(t)
=
r(t)-b-Ut
$$

という座標変換を **Galilei 変換** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mech1-galilei-transform -->

### **定義の確認**：等速列車内の静止物体

地上系 $S$ に対して、列車が $x$ 方向へ

$$
U=
\begin{pmatrix}
10\\
0\\
0
\end{pmatrix}
\ \mathrm{m/s}
$$

で動くとします。

$t=0$ で二つの原点が一致しているので $b=0$ とします。

列車内の座席に固定された物体が、地上から見て

$$
r(t)
=
\begin{pmatrix}
10t\\
2\\
0
\end{pmatrix}
\ \mathrm{m}
$$

と動くなら、列車系では

$$
r'(t)
=
r(t)-Ut
=
\begin{pmatrix}
0\\
2\\
0
\end{pmatrix}
\ \mathrm{m}.
$$

したがって列車系では位置が時間に依らず一定です。これは「列車内で座席に対して静止している」という状況と一致します。

<!-- definition-example-end -->

<a id="prop-mech1-galilei-velocity-acceleration"></a>

<!-- formal-statement-start -->
### 命題（Galilei 変換における速度・加速度）

Galilei 変換

$$
r'(t)=r(t)-b-Ut
$$

を考える。

$r$ が二回微分可能なら、

$$
v'(t)=v(t)-U,
$$

$$
a'(t)=a(t)
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$b$ と $U$ は時間に依らない一定ベクトルです。

一回微分すると

$$
\begin{aligned}
v'(t)
&=
\frac{d}{dt}
\left(
r(t)-b-Ut
\right)\\
&=
v(t)-U.
\end{aligned}
$$

さらにもう一回微分すると

$$
\begin{aligned}
a'(t)
&=
\frac{d}{dt}
\left(
v(t)-U
\right)\\
&=
a(t).
\end{aligned}
$$

よって加速度はこの変換で不変です。
<!-- proof-end -->

位置と速度は基準系によって変わります。しかし、互いに一定速度で動く同方向座標系の間では加速度は一致します。

この事実は、次章で Newton の運動法則をどのような基準系で書くべきかを考える入口になります。

ただし本章では、まだ「どの基準系が慣性系か」を定義しません。そこは Newton の法則と一緒に MECH2 で扱います。

---

## 7. 実験データから軌道関数へ：何を仮定しているのか

現実の測定では、連続関数 $r(t)$ を直接得ることはできません。

たとえば一次元の位置を

| 時刻 $t$ [s] | 位置 $x$ [m] |
|---:|---:|
| 0 | 1.00 |
| 1 | 3.05 |
| 2 | 7.02 |

と測ったとします。

この三点だけから、真の運動が厳密に

$$
x(t)=1+t+t^2
$$

だったと断定することはできません。三点を通る関数は無数にあります。

それでも、対象について

- この時間範囲では十分滑らかに動く
- 測定誤差は小さい
- 二次関数程度の単純なモデルで十分である

と判断できるなら、

$$
x(t)\approx c_0+c_1t+c_2t^2
$$

と近似して、そこから

$$
v(t)\approx c_1+2c_2t,
$$

$$
a(t)\approx2c_2
$$

を推定できます。

ここで「加速度」は測定表に直接書かれていた量ではありません。**位置データと滑らかな軌道モデルを組み合わせて得た派生量**です。

同様に、微分可能性も実験事実そのものではなく、対象と時間尺度に応じて採用するモデル仮定です。

衝突の瞬間のように速度が急激に変わる現象では、単純な二回微分可能モデルが破れることがあります。モデルが破れたときは、現象を無理に滑らかな関数へ押し込めるのではなく、より適切なモデルへ切り替える必要があります。

---

## 8. 本章の見取り図

本章で行ったことを、観測から数式への順序でまとめます。

$$
\boxed{
\begin{array}{c}
\text{時刻と位置の観測}\\
\downarrow\\
\text{質点・基準系という理想化}\\
\downarrow\\
r(t)\text{ という軌道モデル}\\
\downarrow\\
v(t)=r'(t)\\
\downarrow\\
a(t)=r''(t)\\
\downarrow\\
\text{円運動・座標変換などの運動学}
\end{array}
}
$$

ここまでで、「物体がどう動いているか」を記述する言葉がそろいました。

次の MECH2 では、ここで定義した加速度に対して、力と質量を結び付ける Newton の運動法則を導入します。

本章の式は、その Newton 方程式を立てるための座標と言語を準備したものです。

---

# 演習

## Level A

### A1. 次元と単位をそろえる

自動車が一定の速さ

$$
90\ \mathrm{km/h}
$$

で走っている。

1. これを m/s に変換せよ。
2. 10 s の間に進む距離を m で求めよ。
3. 速度と距離の次元をそれぞれ答えよ。
4. 式 $x=vt$ の両辺の次元が一致することを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

まず

$$
1\ \mathrm{km}
=
1000\ \mathrm{m},
\qquad
1\ \mathrm{h}
=
3600\ \mathrm{s}.
$$

したがって

$$
90\ \mathrm{km/h}
=
90
\frac{1000\ \mathrm{m}}{3600\ \mathrm{s}}
=
25\ \mathrm{m/s}.
$$

よって 10 s の間に進む距離は

$$
x
=
vt
=
25\ \mathrm{m/s}\times10\ \mathrm{s}
=
250\ \mathrm{m}.
$$

速度の次元は

$$
[v]=LT^{-1},
$$

距離の次元は

$$
[x]=L.
$$

右辺 $vt$ の次元は

$$
[vt]
=
(LT^{-1})T
=
L.
$$

したがって

$$
[x]=[vt]=L
$$

で、式は次元的に整合しています。

<!-- solution-end -->

---

### A2. 多項式軌道から速度・加速度を求める

質点の位置が

$$
r(t)
=
\begin{pmatrix}
t^2\\
2t^3\\
4-t
\end{pmatrix}
\ \mathrm{m},
\qquad
t\ \mathrm{[s]}
$$

で与えられている。

1. 速度 $v(t)$ を求めよ。
2. 加速度 $a(t)$ を求めよ。
3. $t=1$ s における速度と速さを求めよ。
4. 速度と加速度の各成分の単位を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

各成分を時間で微分します。

$$
v(t)
=
\frac{dr}{dt}
=
\begin{pmatrix}
2t\\
6t^2\\
-1
\end{pmatrix}
\ \mathrm{m/s}.
$$

さらに微分して

$$
a(t)
=
\frac{dv}{dt}
=
\begin{pmatrix}
2\\
12t\\
0
\end{pmatrix}
\ \mathrm{m/s^2}.
$$

$t=1$ s では

$$
v(1)
=
\begin{pmatrix}
2\\
6\\
-1
\end{pmatrix}
\ \mathrm{m/s}.
$$

速さは速度ベクトルの Euclid ノルムなので

$$
|v(1)|
=
\sqrt{2^2+6^2+(-1)^2}
=
\sqrt{41}\ \mathrm{m/s}.
$$

速度の各成分は m/s、加速度の各成分は m/s$^2$ です。

<!-- solution-end -->

---

### A3. 等速円運動を直接計算する

半径 $R=2$ m、角速度 $\omega=3$ s$^{-1}$ の円運動

$$
r(t)
=
\begin{pmatrix}
2\cos3t\\
2\sin3t
\end{pmatrix}
\ \mathrm{m}
$$

を考える。

1. 速度 $v(t)$ を求めよ。
2. 加速度 $a(t)$ を求めよ。
3. 速さを求めよ。
4. 加速度の大きさを求め、加速度が中心向きであることを式で確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

各成分を微分すると

$
v(t)
=
\begin{pmatrix}
-6\sin3t\\
6\cos3t
\end{pmatrix}
\ \mathrm{m/s}.
$$

さらに微分して

$$
a(t)
=
\begin{pmatrix}
-18\cos3t\\
-18\sin3t
\end{pmatrix}
\ \mathrm{m/s^2}.
$$

位置ベクトルと比較すると

$$
a(t)
=
-9
\begin{pmatrix}
2\cos3t\\
2\sin3t
\end{pmatrix}
=
-9r(t).
$$

したがって加速度は位置ベクトルと反対向き、つまり中心向きです。

速さは

$$
\begin{aligned}
|v(t)|
&=
\sqrt{
36\sin^23t
+
36\cos^23t
}\\
&=
6\ \mathrm{m/s}.
\end{aligned}
$$

加速度の大きさは

$$
|a(t)|
=
9|r(t)|
=
9\times2
=
18\ \mathrm{m/s^2}.
$$

<!-- solution-end -->

---

### A4. Galilei 変換で速度と加速度を変換する

地上系 $S$ で質点の位置が

$$
r(t)
=
\begin{pmatrix}
4t+t^2\\
2t\\
0
\end{pmatrix}
\ \mathrm{m}
$$

である。

別の基準系 $S'$ は、$S$ に対して

$$
U=
\begin{pmatrix}
4\\
0\\
0
\end{pmatrix}
\ \mathrm{m/s}
$$

で動き、$t=0$ で原点は一致しているとする。

1. $S'$ における位置 $r'(t)$ を求めよ。
2. $S,S'$ における速度をそれぞれ求めよ。
3. 両基準系における加速度を求めよ。
4. $v'=v-U$ と $a'=a$ を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$b=0$ なので

$$
r'(t)=r(t)-Ut.
$$

よって

$$
r'(t)
=
\begin{pmatrix}
4t+t^2\\
2t\\
0
\end{pmatrix}
-
\begin{pmatrix}
4t\\
0\\
0
\end{pmatrix}
=
\begin{pmatrix}
t^2\\
2t\\
0
\end{pmatrix}
\ \mathrm{m}.
$$

地上系の速度は

$$
v(t)
=
\begin{pmatrix}
4+2t\\
2\\
0
\end{pmatrix}
\ \mathrm{m/s}.
$$

$S'$ の速度は

$$
v'(t)
=
\begin{pmatrix}
2t\\
2\\
0
\end{pmatrix}
\ \mathrm{m/s}.
$$

確かに

$$
v(t)-U
=
\begin{pmatrix}
4+2t\\
2\\
0
\end{pmatrix}
-
\begin{pmatrix}
4\\
0\\
0
\end{pmatrix}
=
v'(t).
$$

さらに

$$
a(t)
=
\begin{pmatrix}
2\\
0\\
0
\end{pmatrix}
\ \mathrm{m/s^2},
$$

$$
a'(t)
=
\begin{pmatrix}
2\\
0\\
0
\end{pmatrix}
\ \mathrm{m/s^2}.
$$

したがって

$$
\boxed{
v'=v-U,
\qquad
a'=a
}
$$

が確認できました。

<!-- solution-end -->

---

## Level B

### B1. 一定加速度の公式を成分ごとに再構成する

一次元運動 $x(t)$ が二回微分可能で、

$$
x''(t)=a_0
$$

という一定加速度を持つとする。

時刻 $t=0$ で

$$
x(0)=x_0,
\qquad
x'(0)=v_0
$$

である。

1. $g(t)=x'(t)-a_0t$ と置き、$g'(t)=0$ を示せ。
2. [RA3 の平均値定理](../RA3/index.md#thm-ra3-mvt)を使って $g$ が一定であることを示し、
   $$
   x'(t)=v_0+a_0t
   $$
   を導け。
3.
   $$
   h(t)=x(t)-v_0t-\frac12a_0t^2
   $$
   と置き、同様に
   $$
   x(t)=x_0+v_0t+\frac12a_0t^2
   $$
   を導け。
4. 各項の次元を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず

$$
g(t)=x'(t)-a_0t
$$

とします。

微分すると

$$
g'(t)
=
x''(t)-a_0
=
a_0-a_0
=
0.
$$

任意の $s<t$ に対して、[RA3 の平均値定理](../RA3/index.md#thm-ra3-mvt)によりある $c\in(s,t)$ が存在して

$$
g(t)-g(s)
=
g'(c)(t-s)
=
0.
$$

したがって

$$
g(t)=g(s)
$$

であり、$g$ は定数です。

特に

$$
g(0)=x'(0)=v_0
$$

なので

$$
x'(t)-a_0t=v_0.
$$

よって

$$
\boxed{
x'(t)=v_0+a_0t
}.
$$

次に

$$
h(t)
=
x(t)-v_0t-\frac12a_0t^2
$$

と置きます。

微分すると

$$
\begin{aligned}
h'(t)
&=
x'(t)-v_0-a_0t\\
&=
(v_0+a_0t)-v_0-a_0t\\
&=
0.
\end{aligned}
$$

同じ[RA3 の平均値定理](../RA3/index.md#thm-ra3-mvt)の議論から $h$ は一定です。

$$
h(0)=x(0)=x_0
$$

なので

$$
x(t)-v_0t-\frac12a_0t^2=x_0.
$$

従って

$$
\boxed{
x(t)=x_0+v_0t+\frac12a_0t^2
}.
$$

次元は

$$
[x_0]=L,
$$

$$
[v_0t]=(LT^{-1})T=L,
$$

$$
[a_0t^2]=(LT^{-2})T^2=L
$$

です。したがって全ての項が長さの次元を持ちます。

<!-- solution-end -->

---

### B2. 円周上の運動で速度が接線方向になることを示す

$$
r(t)
=
\begin{pmatrix}
R\cos\theta(t)\\
R\sin\theta(t)
\end{pmatrix}
$$

とし、$\theta$ は微分可能とする。

1. $v(t)$ を求めよ。
2. $r(t)\cdot v(t)=0$ を直接計算せよ。
3. これが「速度は円の接線方向」であることを意味する理由を説明せよ。
4. $\theta'(t)$ が一定でない場合でも、速度が半径方向と直交することを確認せよ。
5. 速さを $R$ と $\theta'(t)$ で表せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

各成分を微分すると

$
v(t)
=
\begin{pmatrix}
-R\sin\theta(t)\,\theta'(t)\\
R\cos\theta(t)\,\theta'(t)
\end{pmatrix}.
$$

内積を計算すると

$$
\begin{aligned}
r(t)\cdot v(t)
&=
R\cos\theta(t)
\left(
-R\sin\theta(t)\theta'(t)
\right)\\
&\quad
+
R\sin\theta(t)
\left(
R\cos\theta(t)\theta'(t)
\right)\\
&=
-R^2\cos\theta(t)\sin\theta(t)\theta'(t)\\
&\quad
+
R^2\sin\theta(t)\cos\theta(t)\theta'(t)\\
&=
0.
\end{aligned}
$$

したがって位置ベクトル $r(t)$ と速度 $v(t)$ は直交します。

円の半径方向は $r(t)$ の方向です。円の接線は半径に直交するので、$v(t)\ne0$ なら速度は接線方向を向きます。

この計算では $\theta'(t)$ が一定であることを使っていません。従って角速度が時間変化しても、

$$
r(t)\cdot v(t)=0
$$

は成り立ちます。

速さは

$$
\begin{aligned}
|v(t)|^2
&=
R^2\theta'(t)^2
\left(
\sin^2\theta(t)+\cos^2\theta(t)
\right)\\
&=
R^2\theta'(t)^2.
\end{aligned}
$$

よって

$$
\boxed{
|v(t)|
=
R|\theta'(t)|
}.
$$

<!-- solution-end -->

---

### B3. 三つの位置測定から二次軌道モデルを作る

一次元の位置を次のように測定した。

| $t$ [s] | $x$ [m] |
|---:|---:|
| 0 | 1 |
| 1 | 4 |
| 2 | 11 |

この三点を厳密に通る二次関数

$$
x(t)=c_0+c_1t+c_2t^2
$$

を軌道モデルとして採用する。

1. $c_0,c_1,c_2$ を求めよ。
2. このモデルから速度 $v(t)$ と加速度 $a(t)$ を求めよ。
3. $t=1$ s における速度を求めよ。
4. 三つの測定点だけから、真の軌道がこの二次関数であると断定できない理由を説明せよ。
5. このモデルが意味を持つために暗黙に置いている物理的・数学的仮定を二つ挙げよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$t=0$ を代入すると

$$
c_0=1.
$$

$t=1$ では

$$
1+c_1+c_2=4,
$$

したがって

$$
c_1+c_2=3.
$$

$t=2$ では

$$
1+2c_1+4c_2=11,
$$

よって

$$
c_1+2c_2=5.
$$

二式の差から

$$
c_2=2.
$$

したがって

$$
c_1=1.
$$

よって採用した二次軌道モデルは

$$
\boxed{
x(t)=1+t+2t^2
}
$$

です。

微分すると

$$
v(t)
=
x'(t)
=
1+4t
\ \mathrm{m/s},
$$

$$
a(t)
=
x''(t)
=
4
\ \mathrm{m/s^2}.
$$

$t=1$ s では

$$
\boxed{
v(1)=5\ \mathrm{m/s}
}.
$$

しかし三点を通る関数は二次関数だけではありません。たとえば

$$
\tilde x(t)
=
1+t+2t^2
+
\lambda t(t-1)(t-2)
$$

は任意の $\lambda$ に対して $t=0,1,2$ で同じ三つの測定値を与えます。

従って測定点だけから真の軌道を一意には決められません。

二次モデルを採用するには、たとえば

- この時間範囲では運動が十分滑らかである
- 高次の変化を無視してもよい
- 測定誤差が十分小さい
- 加速度がほぼ一定とみなせる

といった追加の仮定が必要です。

したがって

$$
\boxed{
\text{データ}
+
\text{モデル仮定}
\longrightarrow
\text{速度・加速度の推定}
}
$$

であり、速度・加速度が測定表から無条件に一意に決まるわけではありません。

<!-- solution-end -->

---

## Level C

### C1. 二つの基準系で同じ円運動を記述する

地上系 $S$ で質点が

$$
r(t)
=
\begin{pmatrix}
Ut+R\cos\omega t\\
R\sin\omega t\\
0
\end{pmatrix}
$$

と運動している。ここで $U,R,\omega$ は正の定数とする。

別の基準系 $S'$ は $S$ に対して

$$
\mathbf U
=
\begin{pmatrix}
U\\
0\\
0
\end{pmatrix}
$$

で等速移動し、$t=0$ で両原点が一致しているとする。

次を順に示せ。

1. $S'$ における位置 $r'(t)$ を求め、その軌道が原点を中心とする半径 $R$ の円であることを示せ。
2. $S$ における速度 $v(t)$ と $S'$ における速度 $v'(t)$ を求め、$v'=v-\mathbf U$ を確認せよ。
3. 両基準系における加速度を求め、$a'=a$ を確認せよ。
4. $S'$ では速さが一定で $R\omega$ であることを示せ。
5. $S$ では一般に速さが一定でないことを
   $$
   |v(t)|^2
   $$
   を計算して示せ。
6. それでも加速度が両基準系で同じになる理由を、Galilei 変換の式から説明せよ。
7. 「同じ物理的運動でも速度は基準系に依存するが、この種の等速移動基準系間では加速度は一致する」という結論を、自分の言葉でまとめよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

Galilei 変換は

$$
r'(t)
=
r(t)-\mathbf U t
$$

です。

したがって

$$
\begin{aligned}
r'(t)
&=
\begin{pmatrix}
Ut+R\cos\omega t\\
R\sin\omega t\\
0
\end{pmatrix}
-
\begin{pmatrix}
Ut\\
0\\
0
\end{pmatrix}\\
&=
\begin{pmatrix}
R\cos\omega t\\
R\sin\omega t\\
0
\end{pmatrix}.
\end{aligned}
$$

よって

$$
|r'(t)|^2
=
R^2\cos^2\omega t
+
R^2\sin^2\omega t
=
R^2.
$$

従って $S'$ では原点を中心とする半径 $R$ の円運動です。

次に $S$ で微分すると

$$
v(t)
=
\begin{pmatrix}
U-R\omega\sin\omega t\\
R\omega\cos\omega t\\
0
\end{pmatrix}.
$$

一方 $S'$ では

$$
v'(t)
=
\begin{pmatrix}
-R\omega\sin\omega t\\
R\omega\cos\omega t\\
0
\end{pmatrix}.
$$

したがって

$$
v(t)-\mathbf U
=
\begin{pmatrix}
-R\omega\sin\omega t\\
R\omega\cos\omega t\\
0
\end{pmatrix}
=
v'(t).
$$

よって

$$
\boxed{
v'=v-\mathbf U
}.
$$

さらに微分すると、どちらの基準系でも

$$
a(t)
=
a'(t)
=
\begin{pmatrix}
-R\omega^2\cos\omega t\\
-R\omega^2\sin\omega t\\
0
\end{pmatrix}.
$$

従って

$$
\boxed{
a'=a
}.
$$

$S'$ における速さは

$$
\begin{aligned}
|v'(t)|^2
&=
R^2\omega^2
\left(
\sin^2\omega t+\cos^2\omega t
\right)\\
&=
R^2\omega^2.
\end{aligned}
$$

したがって

$$
\boxed{
|v'(t)|=R\omega
}
$$

で一定です。

一方 $S$ では

$$
\begin{aligned}
|v(t)|^2
&=
\left(
U-R\omega\sin\omega t
\right)^2
+
R^2\omega^2\cos^2\omega t\\
&=
U^2
-2UR\omega\sin\omega t
+
R^2\omega^2
\left(
\sin^2\omega t+\cos^2\omega t
\right)\\
&=
U^2+R^2\omega^2
-2UR\omega\sin\omega t.
\end{aligned}
$$

右辺は一般に $t$ に依存するので、$S$ から見た速さは一定ではありません。

それでも加速度が一致するのは、

$$
v'(t)=v(t)-\mathbf U
$$

で、$\mathbf U$ が時間に依らない定数ベクトルだからです。

時間微分すると

$$
a'(t)
=
\frac{dv'}{dt}
=
\frac{dv}{dt}
-
\frac{d\mathbf U}{dt}
=
a(t).
$$

したがって、同じ物理的運動を二つの等速移動基準系から見ると、位置と速度の数値は変わりますが、加速度は一致します。

この例では $S'$ から見ると純粋な等速円運動ですが、$S$ から見ると円運動全体が $x$ 方向へ流されて見えます。それでも両者は同じ質点の同じ運動を別の基準系で記述したものです。

<!-- solution-end -->
