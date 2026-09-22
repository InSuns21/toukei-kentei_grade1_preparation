# NA6 数値解析 VI：ODE 数値解法 I—一段法と収束

一階初期値問題

$$
y'(t)=f(t,y(t)),
\qquad
y(t_0)=y_0
$$

を考えます。[ODE1 の Picard--Lindelöf の定理](../ODE1/index.md#thm-ode1-picard-lindelof)は、適切な連続性と $y$ に関する Lipschitz 条件の下で、短い時間区間に 厳密解が一意に存在することを保証しました。

しかし、存在することと計算できることは別です。多くの非線形 ODE では、厳密解を閉じた式で書けません。そこで時間を有限個の点へ区切り、

$$
y(t_n)
$$

を有限回の四則演算と関数評価で近似します。

この章の中心は Euler 法そのものより、次の論理です。

~~~text
微分方程式
  ↓ 時間を離散化
一段法
  ↓ 厳密解を一段だけ代入
局所打切り誤差
  ↓ 小さいだけではまだ足りない
摂動の増幅を評価
  ↓
有限時間摂動安定性
  ↓
大域誤差・収束
~~~

局所誤差が各ステップで小さくても、過去の誤差を毎回強く増幅する方法なら大域誤差は小さくなりません。逆に、一段の誤差が $h^{p+1}$ 程度で、摂動増幅が固定有限時間で制御できれば、大域誤差は $h^p$ 程度になります。

直接の前提は

- [ODE1 一階常微分方程式・初期値問題](../ODE1/index.md)
- [NA1 浮動小数点・誤差・条件数・安定性](../NA1/index.md)

です。証明では ODE1 の [$y$ に関する Lipschitz 条件](../ODE1/index.md#def-ode1-lipschitz-y) と、RA3 の [Taylor の定理](../RA3/index.md#thm-ra3-taylor)を使います。

NA1 の「後方安定性」と、本章の「時間発展における摂動安定性」は同じ語を含みますが別の概念です。NA1 は計算結果を近い入力に対する 厳密解と見なせるかを扱いました。本章では、各時刻の小さな誤差が時間更新でどの程度増幅されるかを扱います。

---

## 0. 時間を有限個の点へ切る

区間 $[t_0,T]$ を考えます。

<a id="def-na6-time-grid"></a>
<!-- formal-statement-start -->
### 定義（時間格子・刻み幅）

整数 $N\ge1$ に対して

$$
h=\frac{T-t_0}{N},
\qquad
t_n=t_0+nh
\quad
(n=0,\dots,N)
$$

と置く。

点列

$$
t_0<t_1<\cdots<t_N=T
$$

を **時間格子**、$h$ を **刻み幅**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na6-time-grid -->
### 例：$[0,1]$ を4等分する

**定義の確認**。$t_0=0$, $T=1$, $N=4$ なら

$$
h=\frac14,
$$

$$
t_0=0,\quad
t_1=\frac14,\quad
t_2=\frac12,\quad
t_3=\frac34,\quad
t_4=1.
$$

隣接差はすべて

$$
t_{n+1}-t_n=\frac14=h
$$

です。したがってこれは定義どおりの等間隔時間格子です。
<!-- definition-example-end -->

厳密解の格子点値を

$$
Y_n=y(t_n)
$$

と書き、数値計算で得る近似値を

$$
y_n\approx Y_n
$$

と書きます。

同じ文字 $y$ が連続関数と離散値に現れると混乱しやすいので、この章では 厳密解の格子点値には大文字 $Y_n$ を使います。

---

## 1. 一段法：次の値を直前の一つから作る

<a id="def-na6-one-step"></a>
<!-- formal-statement-start -->
### 定義（一段法・一段関数）

一階初期値問題

$$
y'=f(t,y),
\qquad
y(t_0)=y_0
$$

に対し、

$$
\boxed{
y_{n+1}
=
y_n+h\Phi(t_n,y_n,h)
}
$$

の形で $y_{n+1}$ を $y_n$ から計算する方法を **一段法**という。

関数

$$
\Phi(t,y,h)
$$

を **一段関数**という。
<!-- formal-statement-end -->

<a id="def-na6-euler-method"></a>
<!-- formal-statement-start -->
### 定義（Euler 法）

一階初期値問題

$$
y'=f(t,y)
$$

に対する一段法で、一段関数を

$$
\boxed{
\Phi(t,y,h)=f(t,y)
}
$$

と選ぶ方法、すなわち

$$
\boxed{
y_{n+1}=y_n+h f(t_n,y_n)
}
$$

を **Euler 法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na6-one-step, def-na6-euler-method -->
### 例：$y'=t-y$ を Euler 法で進める

**定義の確認**。Euler 法では

$$
\Phi(t,y,h)=f(t,y)=t-y
$$

なので、

$$
y_{n+1}
=
y_n+h(t_n-y_n)
$$

です。右辺は現在の $t_n$, $y_n$, $h$ だけで決まり、過去の $y_{n-1},y_{n-2},\dots$ を必要としません。したがって一段法であり、かつ一段関数を $f$ 自身に選んでいるので Euler 法です。

初期値問題

$$
y'=t-y,
\qquad
y(0)=1
$$

に $h=0.1$ で適用すると

$$
y_1
=
1+0.1(0-1)
=
0.9.
$$

次は

$$
y_2
=
0.9+0.1(0.1-0.9)
=
0.82.
$$

各時刻で「現在の傾き」を使って次の値へ進んでいます。
<!-- definition-example-end -->

Euler 法は接線による一歩の外挿です。

厳密解なら

$$
y(t_n+h)
=
y(t_n)+h y'(t_n)+\text{高次の項}
$$

であり、$y'=f(t,y)$ を代入すれば

$$
y(t_n+h)
\approx
y(t_n)+h f(t_n,y(t_n)).
$$

この近似をそのまま反復するのが Euler 法です。

---

## 2. 厳密解を一段だけ代入する：局所打切り誤差

数値法を評価するとき、いきなり最終時刻の誤差を見るのではなく、

> いまの値が厳密解の値だったとしても、次の一歩でどれだけ誤差を作るか

を先に測ります。

<a id="def-na6-local-truncation"></a>
<!-- formal-statement-start -->
### 定義（局所打切り誤差）

一段法

$$
y_{n+1}
=
y_n+h\Phi(t_n,y_n,h)
$$

と、その初期値問題の 厳密解$y(t)$ を考える。

厳密解の格子点値 $Y_n=y(t_n)$ に対して

$$
\boxed{
\tau_{n+1}
=
\frac{Y_{n+1}-Y_n}{h}
-
\Phi(t_n,Y_n,h)
}
$$

を、第 $n+1$ ステップの **局所打切り誤差**という。

同値に、

$$
\boxed{
Y_{n+1}
=
Y_n+h\Phi(t_n,Y_n,h)+h\tau_{n+1}
}
$$

である。
<!-- formal-statement-end -->

局所打切り誤差 $\tau_{n+1}$ は「1単位時間あたり」の誤差です。一段そのものに残る差は

$$
h\tau_{n+1}
$$

です。

この区別は次数を数えるときに重要です。

<!-- definition-example-start: def-na6-local-truncation -->
### 例：$y'=y$ に Euler 法を一段だけ当てる

**定義の確認**。$y(0)=1$ なら 厳密解は

$$
y(t)=e^t.
$$

Euler 法では $\Phi(t,y,h)=y$ なので

$$
\tau_{n+1}
=
\frac{e^{t_n+h}-e^{t_n}}{h}
-
e^{t_n}.
$$

$e^{t_n}$ をくくると

$$
\tau_{n+1}
=
e^{t_n}
\left(
\frac{e^h-1}{h}-1
\right).
$$

Taylor の定理から

$$
e^h
=
1+h+\frac{e^\xi}{2}h^2
\qquad
(0<\xi<h)
$$

なので

$$
\tau_{n+1}
=
\frac12 e^{t_n+\xi}h.
$$

したがって局所打切り誤差は $h$ に比例し、一段そのものの欠陥 $h\tau_{n+1}$ は $h^2$ に比例します。
<!-- definition-example-end -->

<a id="def-na6-consistency"></a>
<!-- formal-statement-start -->
### 定義（整合性・整合性次数）

固定した有限時間区間 $[t_0,T]$ 上で

$$
\max_{0\le n<N}|\tau_{n+1}|
\longrightarrow0
\qquad
(h\to0)
$$

となるとき、その一段法はこの初期値問題に対して **整合的**であるという。

さらに、ある $p>0$ と $C>0$ が存在して、十分小さい $h$ に対して

$$
\boxed{
\max_{0\le n<N}|\tau_{n+1}|
\le
C h^p
}
$$

が成り立つとき、整合性次数を $p$ という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na6-consistency -->
### 例：Euler 法は滑らかな解に対して一次整合的

**定義の確認**。前の $y'=y$ の例では、$0\le t_n\le T$ かつ $0<\xi<h$ だから

$$
|\tau_{n+1}|
\le
\frac12 e^{T+h}h.
$$

$h\le1$ に制限すれば

$$
|\tau_{n+1}|
\le
\frac12 e^{T+1}h.
$$

右辺は $h\to0$ で0へ行き、しかも $C h$ の形です。したがって Euler 法はこの問題に対して一次整合的です。
<!-- definition-example-end -->

---

## 3. Euler 法の局所打切り誤差を一般に評価する

<a id="prop-na6-euler-local-error"></a>
<!-- formal-statement-start -->
### 命題（Euler 法の局所打切り誤差）

初期値問題

$$
y'=f(t,y),
\qquad
y(t_0)=y_0
$$

の 厳密解$y$ が $[t_0,T]$ 上で $C^2$ 級であるとする。

Euler 法

$$
y_{n+1}=y_n+h f(t_n,y_n)
$$

の局所打切り誤差は、各 $n$ についてある

$$
\xi_n\in(t_n,t_{n+1})
$$

を用いて

$$
\boxed{
\tau_{n+1}
=
\frac h2 y''(\xi_n)
}
$$

と書ける。

特に

$$
M_2=\max_{t_0\le t\le T}|y''(t)|
$$

と置けば

$$
\boxed{
|\tau_{n+1}|
\le
\frac{M_2}{2}h
}
$$

であり、Euler 法は一次整合的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Euler 法の一段関数は

$$
\Phi(t,y,h)=f(t,y)
$$

です。

厳密解に対して [Taylor の定理](../RA3/index.md#thm-ra3-taylor)を $t_n$ のまわりで一次まで適用します。$y\in C^2$ なので、ある

$$
\xi_n\in(t_n,t_{n+1})
$$

が存在して

$$
Y_{n+1}
=
Y_n
+
h y'(t_n)
+
\frac{h^2}{2}y''(\xi_n)
$$

です。

厳密解は ODE を満たすため

$$
y'(t_n)=f(t_n,Y_n).
$$

したがって

$$
Y_{n+1}
=
Y_n
+
h f(t_n,Y_n)
+
\frac{h^2}{2}y''(\xi_n).
$$

局所打切り誤差の定義

$$
Y_{n+1}
=
Y_n
+
h f(t_n,Y_n)
+
h\tau_{n+1}
$$

と比較すると

$$
h\tau_{n+1}
=
\frac{h^2}{2}y''(\xi_n).
$$

$h>0$ なので両辺を $h$ で割り、

$$
\tau_{n+1}
=
\frac h2 y''(\xi_n)
$$

を得ます。

さらに $y''$ は連続で $[t_0,T]$ は閉区間なので最大値 $M_2$ が存在し、

$$
|\tau_{n+1}|
\le
\frac h2 M_2.
$$

よって一次整合的です。

$\square$
<!-- proof-end -->

局所打切り誤差が $O(h)$ なのに、一段の欠陥が $O(h^2)$ なのは

$$
\text{一段の欠陥}
=
h\tau_{n+1}
$$

だからです。

そして $T-t_0$ の長さを $h$ 刻みで進むと、ステップ数はおよそ $1/h$ 個です。

したがって、誤差が単純に足し合わさるだけでも

$$
\frac1h\times h^2=h
$$

となり、大域では一次が自然に現れます。

ただし、本当に単純に足し合わせてよいかはまだ分かりません。過去の誤差が後続ステップで増幅されるからです。

---

## 4. 大域誤差：最終的に知りたい量

<a id="def-na6-global-error"></a>
<!-- formal-statement-start -->
### 定義（大域誤差・収束次数）

格子点 $t_n$ における 厳密解の値を

$$
Y_n=y(t_n)
$$

とし、一段法で得た数値解を $y_n$ とする。

$$
\boxed{
e_n=Y_n-y_n
}
$$

を **大域誤差**という。

固定した有限時間区間 $[t_0,T]$ 上で

$$
\max_{0\le n\le N}|e_n|
\longrightarrow0
\qquad
(h\to0)
$$

となるとき数値法は **収束する**という。

さらに

$$
\boxed{
\max_{0\le n\le N}|e_n|
\le
C_T h^p
}
$$

を、$h$ に依存しない定数 $C_T$ で評価できるとき、収束次数を $p$ という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na6-global-error -->
### 例：$y'=y$ に対する Euler 法

**定義の確認**。$y(0)=1$、$T=1$、$h=1/N$ とします。

Euler 法は

$$
y_{n+1}=(1+h)y_n,
\qquad
y_0=1
$$

なので

$$
y_n=(1+h)^n.
$$

厳密解は

$$
Y_n=e^{nh}.
$$

したがって

$$
e_n=e^{nh}-(1+h)^n.
$$

例えば $h=1/2$ なら $N=2$ で

$$
e_2=e-\left(\frac32\right)^2=e-\frac94.
$$

$h$ を小さくしていくと $(1+h)^{1/h}\to e$ なので、固定した $T=1$ で $y_N\to e=Y_N$ となります。後で一般の Lipschitz 初期値問題に対して一次の誤差評価を証明します。
<!-- definition-example-end -->

---

## 5. 誤差の増幅を支配する離散 Grönwall 型評価

一段法の誤差は、典型的に

$$
d_{n+1}
\le
(1+hL)d_n+r_{n+1}
$$

という形になります。

$d_n$ はそれまでに蓄積した差、$r_{n+1}$ は新たに注入される誤差です。

<a id="lem-na6-discrete-gronwall"></a>
<!-- formal-statement-start -->
### 補題（離散 Grönwall 型評価）

$h>0$, $L\ge0$ とし、非負数列 $d_n$, $r_n$ が

$$
d_{n+1}
\le
(1+hL)d_n+r_{n+1}
\qquad
(n=0,\dots,N-1)
$$

を満たすとする。

このとき

$$
\boxed{
d_n
\le
(1+hL)^n d_0
+
\sum_{j=1}^{n}
(1+hL)^{n-j}r_j
}
$$

が成り立つ。

特に $t_n-t_0=nh\le T-t_0$ なら

$$
\boxed{
d_n
\le
e^{L(T-t_0)}
\left(
d_0+\sum_{j=1}^{n}r_j
\right)
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

最初の不等式を帰納法で示します。

$n=1$ では仮定そのものから

$$
d_1
\le
(1+hL)d_0+r_1
$$

であり、主張と一致します。

ある $n$ で

$$
d_n
\le
(1+hL)^n d_0
+
\sum_{j=1}^{n}
(1+hL)^{n-j}r_j
$$

が成り立つと仮定します。

漸化不等式へ代入すると

$$
\begin{aligned}
d_{n+1}
&\le
(1+hL)d_n+r_{n+1}\\
&\le
(1+hL)
\left[
(1+hL)^n d_0
+
\sum_{j=1}^{n}
(1+hL)^{n-j}r_j
\right]
+r_{n+1}\\
&=
(1+hL)^{n+1}d_0
+
\sum_{j=1}^{n}
(1+hL)^{n+1-j}r_j
+r_{n+1}\\
&=
(1+hL)^{n+1}d_0
+
\sum_{j=1}^{n+1}
(1+hL)^{n+1-j}r_j.
\end{aligned}
$$

よって帰納法で第1の評価が成り立ちます。

次に

$$
1+x\le e^x
\qquad
(x\ge0)
$$

を $x=hL$ に適用すると

$$
(1+hL)^k
\le
e^{khL}.
$$

$k\le n$ なら

$$
kh\le nh=t_n-t_0\le T-t_0
$$

なので

$$
(1+hL)^k
\le
e^{L(T-t_0)}.
$$

したがって第1の評価の各係数を同じ上界で抑えれば

$$
d_n
\le
e^{L(T-t_0)}
\left(
d_0+\sum_{j=1}^{n}r_j
\right).
$$

$\square$
<!-- proof-end -->

この指数因子は、「各ステップで少しずつ誤差が増幅される」ことを有限時間区間全体でまとめたものです。

---

## 6. 一段法の有限時間摂動安定性

局所打切り誤差が大域誤差へどう伝わるかを見るため、同じ一段法を二つの少し違うデータで走らせます。

<a id="def-na6-perturbation-stability"></a>
<!-- formal-statement-start -->
### 定義（有限時間摂動安定性）

固定した $[t_0,T]$ 上で、一段法

$$
u_{n+1}
=
u_n+h\Phi(t_n,u_n,h)+\rho_{n+1}
$$

と

$$
v_{n+1}
=
v_n+h\Phi(t_n,v_n,h)+\sigma_{n+1}
$$

を考える。

十分小さい $h$ に対して、$h$ と $N$ に依存しない定数 $C_T$ が存在し、

$$
\boxed{
\max_{0\le n\le N}|u_n-v_n|
\le
C_T
\left(
|u_0-v_0|
+
\sum_{j=1}^{N}|\rho_j-\sigma_j|
\right)
}
$$

が成り立つとき、この一段法は $[t_0,T]$ 上で **有限時間摂動安定**であるという。
<!-- formal-statement-end -->

ここで $\rho_j,\sigma_j$ は各ステップに加わる加法的な摂動です。局所打切り誤差、丸め誤差、外部からの小さな誤差を同じ形で扱えます。

<!-- definition-example-start: def-na6-perturbation-stability -->
### 例：Euler 法で一段関数が Lipschitz の場合

**定義の確認**。$\Phi(t,y,h)=f(t,y)$ とし、

$$
|f(t,u)-f(t,v)|
\le
L|u-v|
$$

が成り立つとします。

二つの更新式を引くと

$$
u_{n+1}-v_{n+1}
=
u_n-v_n
+
h\{f(t_n,u_n)-f(t_n,v_n)\}
+
(\rho_{n+1}-\sigma_{n+1}).
$$

したがって

$$
|u_{n+1}-v_{n+1}|
\le
(1+hL)|u_n-v_n|
+
|\rho_{n+1}-\sigma_{n+1}|.
$$

これは直前の離散 Grönwall 型評価を適用できる形です。次の定理で $C_T=e^{L(T-t_0)}$ と取れることを証明します。
<!-- definition-example-end -->

<a id="thm-na6-perturbation-stability"></a>
<!-- formal-statement-start -->
### 定理（一段関数の Lipschitz 条件による有限時間摂動安定性）

$h>0$ とし、

$$
t_n=t_0+nh,
\qquad
0\le n\le N,
\qquad
Nh=T-t_0
$$

とする。集合 $D\subset\mathbb R$ 上で定義された一段関数 $\Phi$ が、ある $L\ge0$ に対して

$$
|\Phi(t,u,h)-\Phi(t,v,h)|
\le
L|u-v|
$$

を、すべての $t\in[t_0,T]$、十分小さい $h$、$u,v\in D$ について満たすとする。

二つの列 $u_n,v_n\in D$ が

$$
u_{n+1}
=
u_n+h\Phi(t_n,u_n,h)+\rho_{n+1},
$$

$$
v_{n+1}
=
v_n+h\Phi(t_n,v_n,h)+\sigma_{n+1}
$$

を満たすなら、各 $0\le n\le N$ について

$$
\boxed{
|u_n-v_n|
\le
e^{L(T-t_0)}
\left(
|u_0-v_0|
+
\sum_{j=1}^{n}
|\rho_j-\sigma_j|
\right)
}
$$

が成り立つ。したがって、この一段法は $D$ 内に留まる離散列に対して $[t_0,T]$ 上で有限時間摂動安定である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

差を

$$
d_n=|u_n-v_n|
$$

と置きます。

二つの更新式を引くと

$$
u_{n+1}-v_{n+1}
=
u_n-v_n
+
h\{\Phi(t_n,u_n,h)-\Phi(t_n,v_n,h)\}
+
(\rho_{n+1}-\sigma_{n+1}).
$$

三角不等式と一段関数の Lipschitz 条件から

$$
\begin{aligned}
d_{n+1}
&\le
d_n
+
hL d_n
+
|\rho_{n+1}-\sigma_{n+1}|\\
&=
(1+hL)d_n
+
|\rho_{n+1}-\sigma_{n+1}|.
\end{aligned}
$$

したがって [離散 Grönwall 型評価](#lem-na6-discrete-gronwall)を

$$
r_{n+1}
=
|\rho_{n+1}-\sigma_{n+1}|
$$

として適用できます。

その結果

$$
d_n
\le
e^{L(T-t_0)}
\left(
d_0+\sum_{j=1}^{n}r_j
\right)
$$

を得ます。

$d_n=|u_n-v_n|$ と $r_j$ の定義を戻せば主張そのものです。

$\square$
<!-- proof-end -->

ここで重要なのは、Lipschitz 定数 $L$ が $h\to0$ で発散しないことです。

もし

$$
L=L(h)\to\infty
$$

なら

$$
e^{L(h)(T-t_0)}
$$

も制御できず、小さな局所誤差を大きく増幅する可能性があります。

---

## 7. 整合性と安定性から大域収束へ

いま 厳密解の格子点値 $Y_n$ と数値解 $y_n$ を比較します。

厳密解は局所打切り誤差の定義から

$$
Y_{n+1}
=
Y_n
+
h\Phi(t_n,Y_n,h)
+
h\tau_{n+1}
$$

を満たします。

一方、数値解は

$$
y_{n+1}
=
y_n
+
h\Phi(t_n,y_n,h)
$$

です。

つまり 厳密解の格子点列は、

> 同じ一段法に、各ステップで $h\tau_{n+1}$ という摂動を加えた列

と見なせます。

<a id="thm-na6-global-convergence"></a>
<!-- formal-statement-start -->
### 定理（整合性と摂動安定性からの大域収束）

初期値問題

$$
y'=f(t,y),
\qquad
y(t_0)=y_0
$$

の厳密解を $y(t)$ とし、

$$
t_n=t_0+nh,
\qquad
Y_n=y(t_n),
\qquad
Nh=T-t_0
$$

と置く。数値解 $y_n$ は

$$
y_{n+1}
=
y_n+h\Phi(t_n,y_n,h)
$$

で定まるとする。

集合 $D\subset\mathbb R$ が存在し、すべての $n$ について

$$
Y_n\in D,
\qquad
y_n\in D
$$

であると仮定する。さらに次を仮定する。

1. 数値初期値は厳密解の初期値に一致し、

$$
y_0=Y_0.
$$

2. ある $L\ge0$ が存在して、すべての $t\in[t_0,T]$、十分小さい $h$、$u,v\in D$ に対し

$$
|\Phi(t,u,h)-\Phi(t,v,h)|
\le
L|u-v|
$$

が成り立つ。

3. 厳密解を一段法へ代入した局所打切り誤差

$$
\tau_{n+1}
=
\frac{Y_{n+1}-Y_n}{h}
-
\Phi(t_n,Y_n,h)
$$

について、ある $p>0$, $C>0$ が存在し

$$
|\tau_{n+1}|
\le
C h^p
$$

がすべての $n$ で成り立つ。

このとき

$$
\boxed{
\max_{0\le n\le N}|Y_n-y_n|
\le
C(T-t_0)e^{L(T-t_0)}h^p
}
$$

が成り立つ。したがってこの一段法は少なくとも $p$ 次で収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

厳密解の格子点列 $Y_n$ は

$$
Y_{n+1}
=
Y_n+h\Phi(t_n,Y_n,h)+h\tau_{n+1}
$$

を満たします。

数値解 $y_n$ は

$$
y_{n+1}
=
y_n+h\Phi(t_n,y_n,h)+0
$$

を満たします。

[一段法の有限時間摂動安定性定理](#thm-na6-perturbation-stability)を

$$
u_n=Y_n,
\qquad
v_n=y_n,
$$

$$
\rho_{n+1}=h\tau_{n+1},
\qquad
\sigma_{n+1}=0
$$

として適用します。

初期値が一致するので

$$
|u_0-v_0|=|Y_0-y_0|=0.
$$

よって

$$
|Y_n-y_n|
\le
e^{L(T-t_0)}
\sum_{j=1}^{n}h|\tau_j|.
$$

局所打切り誤差の仮定から

$$
h|\tau_j|
\le
C h^{p+1}.
$$

項数は $n\le N$ であり

$$
Nh=T-t_0
$$

だから

$$
\begin{aligned}
\sum_{j=1}^{n}h|\tau_j|
&\le
n C h^{p+1}\\
&\le
N C h^{p+1}\\
&=
C(T-t_0)h^p.
\end{aligned}
$$

したがって

$$
|Y_n-y_n|
\le
C(T-t_0)e^{L(T-t_0)}h^p.
$$

右辺は $n$ に依存しないので最大値を取っても同じ評価が成り立ちます。

$\square$
<!-- proof-end -->

これが本章の主結果です。

~~~text
局所打切り誤差  tau = O(h^p)
        ↓ 1ステップでは h tau = O(h^(p+1))
約 1/h ステップ積み重なる
        ↓
大域誤差 O(h^p)
~~~

ただし、この図の中央で過去の誤差が暴走しないようにしているのが摂動安定性です。

---

## 8. Euler 法は一次収束する

<a id="cor-na6-euler-convergence"></a>
<!-- formal-statement-start -->
### 系（Euler 法の一次収束）

初期値問題

$$
y'=f(t,y),
\qquad
y(t_0)=y_0
$$

の厳密解$y$ が $[t_0,T]$ 上で $C^2$ 級であるとし、

$$
t_n=t_0+nh,
\qquad
Y_n=y(t_n),
\qquad
Nh=T-t_0
$$

と置く。Euler 法

$$
y_{n+1}=y_n+h f(t_n,y_n),
\qquad
y_0=Y_0
$$

を考える。

集合 $D\subset\mathbb R$ が存在して、すべての $n$ について $Y_n,y_n\in D$ であり、ある $L\ge0$ に対して

$$
|f(t,u)-f(t,v)|
\le
L|u-v|
$$

がすべての $t\in[t_0,T]$、$u,v\in D$ について成り立つとする。

このとき Euler 法は一次収束し、

$$
\boxed{
\max_{0\le n\le N}|Y_n-y_n|
\le
\frac{M_2}{2}(T-t_0)e^{L(T-t_0)}h
}
$$

が成り立つ。ここで

$$
M_2
=
\max_{t_0\le t\le T}|y''(t)|.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Euler 法の一段関数は

$$
\Phi(t,y,h)=f(t,y)
$$

です。

仮定2から

$$
|\Phi(t,u,h)-\Phi(t,v,h)|
=
|f(t,u)-f(t,v)|
\le
L|u-v|,
$$

したがって一段関数の Lipschitz 定数は $h$ に依存しません。

また [Euler 法の局所打切り誤差](#prop-na6-euler-local-error)から

$$
|\tau_{n+1}|
\le
\frac{M_2}{2}h.
$$

よって [整合性と摂動安定性からの大域収束定理](#thm-na6-global-convergence)で

$$
p=1,
\qquad
C=\frac{M_2}{2}
$$

と置けます。

したがって

$$
\max_n|Y_n-y_n|
\le
\frac{M_2}{2}(T-t_0)e^{L(T-t_0)}h.
$$

$\square$
<!-- proof-end -->

ここで ODE1 の Lipschitz 条件が、存在一意性だけでなく数値誤差の増幅制御にも再登場しました。

同じ仮定が

- 連続問題では「二つの解が勝手に分岐しない」
- 離散問題では「二つの数値軌道の差が一段で増幅されすぎない」

という二つの役割を持ちます。

---

## 9. 整合性だけでは足りない

「局所打切り誤差が0へ行くなら、当然大域誤差も0へ行く」と思いたくなります。

しかし、過去の誤差を強く増幅する方法では成立しません。

### 失敗例：整合的だが摂動を激しく増幅する人工的一段法

初期値問題

$$
y'=1,
\qquad
y(0)=0
$$

を考えます。厳密解は

$$
y(t)=t.
$$

次の人工的一段法を考えます。

$$
y_{n+1}
=
y_n+h\Phi(t_n,y_n,h),
$$

$$
\boxed{
\Phi(t,y,h)
=
1+h+\frac{y-t}{h^2}
}.
$$

厳密解を代入すると $Y_n=t_n$ なので

$$
\Phi(t_n,Y_n,h)=1+h.
$$

したがって局所打切り誤差は

$$
\begin{aligned}
\tau_{n+1}
&=
\frac{Y_{n+1}-Y_n}{h}
-
\Phi(t_n,Y_n,h)\\
&=
1-(1+h)\\
&=
-h.
\end{aligned}
$$

よって

$$
|\tau_{n+1}|=h\to0.
$$

この方法は一次整合的です。

しかし大域誤差を調べます。

$$
e_n=y_n-t_n
$$

と置くと、

$$
\begin{aligned}
e_{n+1}
&=
y_{n+1}-t_{n+1}\\
&=
y_n
+
h
+
h^2
+
\frac{y_n-t_n}{h}
-
(t_n+h)\\
&=
\left(1+\frac1h\right)e_n+h^2.
\end{aligned}
$$

$e_0=0$ だから

$$
e_1=h^2,
$$

$$
e_2
=
\left(1+\frac1h\right)h^2+h^2
=
h+2h^2.
$$

さらに進むと、係数

$$
1+\frac1h
$$

が毎回誤差を強く増幅します。

実際、一段関数の $y$ に関する Lipschitz 定数は

$$
L(h)=\frac1{h^2}
$$

です。

したがって本章の安定性定理で必要だった「$h$ に依存しない $L$」が失われています。

失った仮定はまさに摂動安定性です。整合性は「厳密解から一歩進むときの誤差」しか見ません。いったん生じた誤差を次のステップがどう扱うかは、別に制御しなければなりません。

---

## 10. 固定有限時間での収束と、長時間の安定性は別問題

Euler 法を

$$
y'=-2y
$$

へ適用すると

$$
y_{n+1}
=
(1-2h)y_n.
$$

厳密解は

$$
y(t)=e^{-2t}y_0
$$

なので、$t\to\infty$ で0へ減衰します。

ところが $h=1.1$ とすると

$$
1-2h=-1.2
$$

だから

$$
|y_n|=1.2^n|y_0|
$$

となり、数値解は振動しながら増大します。

これは Euler 法の一次収束定理と矛盾しません。

一次収束定理は

> 固定した $T$ に対し、$h\to0$ としたとき $[t_0,T]$ 上で数値解が 厳密解へ近づく

という主張です。

一方、いま見た問いは

> $h$ を固定したまま $n\to\infty$ としたとき、減衰する微分方程式の性質を数値法も保つか

です。

この後者を調べる道具が **絶対安定性** と **安定領域**です。Runge--Kutta 法、陰的一段法、stiffness と合わせて NA7 で扱います。

---

## 11. 何を区別すべきか

本章で最も重要な切り分けをまとめます。

| 概念 | 何を測るか |
|---|---|
| 局所打切り誤差 | 厳密解から一段だけ進んだときの誤差 |
| 整合性 | 刻み幅を小さくすると局所打切り誤差が0へ行くか |
| 摂動安定性 | すでに生じた誤差や外部摂動が増幅されすぎないか |
| 大域誤差 | 格子点で 厳密解と数値解がどれだけ違うか |
| 収束 | 固定有限時間で $h\to0$ としたとき大域誤差が0へ行くか |
| 絶対安定性 | 固定刻み幅で長時間反復したとき減衰モードを正しく減衰させるか |

局所誤差の評価だけで終わらず、

$$
\boxed{
\text{局所誤差}
+
\text{摂動増幅の制御}
\Longrightarrow
\text{大域収束}
}
$$

までつなぐのが数値 ODE の基本構造です。

---

# 12. 演習

## Level A

<a id="ex-na6-a01"></a>
### NA6-A01 Euler 法を3ステップ進める
- Level: A

初期値問題

$$
y'=t-y,
\qquad
y(0)=1
$$

に Euler 法を刻み幅

$$
h=\frac14
$$

で適用する。

$y_1,y_2,y_3$ を求めよ。

<!-- solution-start -->
### 詳細解答

Euler 法は

$$
y_{n+1}
=
y_n+h(t_n-y_n),
\qquad
t_n=\frac n4
$$

です。

初期値は

$$
t_0=0,
\qquad
y_0=1.
$$

第1ステップでは

$$
\begin{aligned}
y_1
&=
1+\frac14(0-1)\\
&=
\frac34.
\end{aligned}
$$

第2ステップでは $t_1=1/4$ なので

$$
\begin{aligned}
y_2
&=
\frac34
+
\frac14
\left(
\frac14-\frac34
\right)\\
&=
\frac34-\frac18\\
&=
\frac58.
\end{aligned}
$$

第3ステップでは $t_2=1/2$ なので

$$
\begin{aligned}
y_3
&=
\frac58
+
\frac14
\left(
\frac12-\frac58
\right)\\
&=
\frac58-\frac1{32}\\
&=
\frac{19}{32}.
\end{aligned}
$$

したがって

$$
\boxed{
y_1=\frac34,\qquad
y_2=\frac58,\qquad
y_3=\frac{19}{32}
}.
$$
<!-- solution-end -->

<a id="ex-na6-a02"></a>
### NA6-A02 Euler 法の局所打切り誤差
- Level: A

初期値問題

$$
y'=2t,
\qquad
y(0)=0
$$

に Euler 法を適用する。

1. 厳密解を求めよ。
2. 局所打切り誤差 $\tau_{n+1}$ を定義から直接求めよ。
3. 一段の欠陥 $h\tau_{n+1}$ の次数を答えよ。

<!-- solution-start -->
### 詳細解答

まず

$$
y'=2t
$$

を積分し、$y(0)=0$ を使うと

$$
\boxed{
y(t)=t^2
}
$$

です。

したがって

$$
Y_n=t_n^2.
$$

Euler 法の一段関数は

$$
\Phi(t,y,h)=2t.
$$

局所打切り誤差の定義から

$$
\tau_{n+1}
=
\frac{Y_{n+1}-Y_n}{h}
-
2t_n.
$$

$t_{n+1}=t_n+h$ なので

$$
\begin{aligned}
Y_{n+1}-Y_n
&=
(t_n+h)^2-t_n^2\\
&=
2t_n h+h^2.
\end{aligned}
$$

よって

$$
\begin{aligned}
\tau_{n+1}
&=
\frac{2t_n h+h^2}{h}-2t_n\\
&=
2t_n+h-2t_n\\
&=
h.
\end{aligned}
$$

したがって

$$
\boxed{
\tau_{n+1}=h
}.
$$

局所打切り誤差は $O(h)$ で、一段の欠陥は

$$
h\tau_{n+1}=h^2,
$$

すなわち

$$
\boxed{
O(h^2)
}
$$

です。
<!-- solution-end -->

<a id="ex-na6-a03"></a>
### NA6-A03 Euler 法の一段関数の Lipschitz 性
- Level: A

$f(t,y)$ が $y$ に関して Lipschitz で

$$
|f(t,u)-f(t,v)|
\le
L|u-v|
$$

を満たすとする。

Euler 法の一段関数

$$
\Phi(t,y,h)=f(t,y)
$$

が、本章の安定性定理の仮定を満たすことを示せ。

<!-- solution-start -->
### 詳細解答

Euler 法では一段関数そのものが $f$ です。

したがって任意の $u,v$ に対し

$$
\begin{aligned}
|\Phi(t,u,h)-\Phi(t,v,h)|
&=
|f(t,u)-f(t,v)|\\
&\le
L|u-v|.
\end{aligned}
$$

ここで右辺の定数 $L$ は $h$ に依存していません。

したがって本章の [有限時間摂動安定性定理](#thm-na6-perturbation-stability)の仮定

$$
|\Phi(t,u,h)-\Phi(t,v,h)|
\le
L|u-v|
$$

を満たします。

この結果は、ODE1 で解の一意性を生んだ Lipschitz 条件が、そのまま Euler 法の誤差増幅制御にも使えることを示しています。
<!-- solution-end -->

<a id="ex-na6-a04"></a>
### NA6-A04 $y'=y$ の大域誤差
- Level: A

初期値問題

$$
y'=y,
\qquad
y(0)=1
$$

に Euler 法を刻み幅 $h$ で適用する。

1. $y_n$ を閉じた形で求めよ。
2. $t_n=nh$ における大域誤差 $e_n$ を書け。
3. $T=1$, $h=1/2$ のときの終点誤差を求めよ。

<!-- solution-start -->
### 詳細解答

Euler 法は

$$
y_{n+1}
=
y_n+h y_n
=
(1+h)y_n.
$$

初期値 $y_0=1$ から反復すると

$$
\boxed{
y_n=(1+h)^n
}.
$$

厳密解は

$$
Y_n=e^{t_n}=e^{nh}.
$$

したがって大域誤差

$$
e_n=Y_n-y_n
$$

は

$$
\boxed{
e_n=e^{nh}-(1+h)^n
}.
$$

$T=1$, $h=1/2$ なら

$$
N=\frac{1}{1/2}=2.
$$

よって

$$
y_2
=
\left(1+\frac12\right)^2
=
\frac94
$$

であり、

$$
Y_2=e.
$$

したがって終点誤差は

$$
\boxed{
e_2=e-\frac94
}.
$$
<!-- solution-end -->

## Level B

<a id="ex-na6-b01"></a>
### NA6-B01 離散 Grönwall 型評価を使う
- Level: B

非負数列 $d_n$ が

$$
d_{n+1}
\le
(1+2h)d_n+3h^2,
\qquad
d_0=0
$$

を満たすとする。

$t_n=nh\le1$ の範囲で $d_n$ を $h$ の一次式で上から評価せよ。

<!-- solution-start -->
### 詳細解答

[離散 Grönwall 型評価](#lem-na6-discrete-gronwall)で

$$
L=2,
\qquad
r_j=3h^2
$$

と置きます。

$t_n\le1$ なので

$$
d_n
\le
e^2
\left(
d_0+\sum_{j=1}^{n}3h^2
\right).
$$

$d_0=0$ だから

$$
d_n
\le
3e^2 n h^2.
$$

さらに

$$
nh=t_n\le1
$$

より

$$
nh^2
=
(nh)h
\le
h.
$$

したがって

$$
\boxed{
d_n\le3e^2 h
}.
$$

各ステップの新規誤差が $O(h^2)$ で、ステップ数が $O(1/h)$ 個なので、固定有限時間で全体が $O(h)$ になっています。
<!-- solution-end -->

<a id="ex-na6-b02"></a>
### NA6-B02 初期値摂動と各ステップ摂動を同時に評価する
- Level: B

一段関数 $\Phi$ が

$$
|\Phi(t,u,h)-\Phi(t,v,h)|
\le
3|u-v|
$$

を満たすとする。

区間 $[0,2]$ で二つの数値列 $u_n,v_n$ が同じ一段法に従い、

$$
|u_0-v_0|\le\varepsilon,
$$

各ステップの加法的摂動差が

$$
|\rho_j-\sigma_j|
\le
\varepsilon h
$$

を満たすとする。

$\max_n|u_n-v_n|$ を $\varepsilon$ で評価せよ。

<!-- solution-start -->
### 詳細解答

[一段法の有限時間摂動安定性定理](#thm-na6-perturbation-stability)を使います。

ここでは

$$
L=3,
\qquad
T-t_0=2
$$

なので

$$
e^{L(T-t_0)}=e^6.
$$

また $Nh=2$ だから

$$
\sum_{j=1}^{N}|\rho_j-\sigma_j|
\le
\sum_{j=1}^{N}\varepsilon h
=
N\varepsilon h
=
2\varepsilon.
$$

初期値差と合わせると

$$
|u_0-v_0|
+
\sum_{j=1}^{N}|\rho_j-\sigma_j|
\le
3\varepsilon.
$$

したがって

$$
\boxed{
\max_{0\le n\le N}|u_n-v_n|
\le
3e^6\varepsilon
}.
$$

指数定数は粗い上界ですが、重要なのは $h$ に依存しないことです。
<!-- solution-end -->

<a id="ex-na6-b03"></a>
### NA6-B03 整合的でも不安定になり得ることを追う
- Level: B

初期値問題

$$
y'=1,
\qquad
y(0)=0
$$

に対して

$$
y_{n+1}
=
y_n+h
\left(
1+h+\frac{y_n-t_n}{h^2}
\right)
$$

を考える。

1. 厳密解を求め、局所打切り誤差が $\tau_{n+1}=-h$ であることを示せ。
2. $e_n=y_n-t_n$ が

$$
e_{n+1}
=
\left(1+\frac1h\right)e_n+h^2
$$

を満たすことを示せ。
3. 一段関数の $y$ に関する Lipschitz 定数を求め、なぜ本章の収束定理を適用できないか説明せよ。

<!-- solution-start -->
### 詳細解答

微分方程式を積分して初期条件を使うと

$$
Y(t)=t.
$$

したがって

$$
Y_n=t_n.
$$

一段関数は

$$
\Phi(t,y,h)
=
1+h+\frac{y-t}{h^2}.
$$

厳密解を代入すると

$$
\Phi(t_n,Y_n,h)
=
1+h
$$

です。

また

$$
\frac{Y_{n+1}-Y_n}{h}
=
\frac{t_n+h-t_n}{h}
=
1.
$$

よって

$$
\boxed{
\tau_{n+1}
=
1-(1+h)
=
-h
}.
$$

したがって局所打切り誤差は0へ行き、この方法は一次整合的です。

次に

$$
e_n=y_n-t_n
$$

と置きます。

更新式から

$$
y_{n+1}
=
y_n+h+h^2+\frac{y_n-t_n}{h}.
$$

$t_{n+1}=t_n+h$ を引くと

$$
\begin{aligned}
e_{n+1}
&=
y_n-t_n+h^2+\frac{y_n-t_n}{h}\\
&=
e_n+h^2+\frac{e_n}{h}\\
&=
\boxed{
\left(1+\frac1h\right)e_n+h^2
}.
\end{aligned}
$$

最後に二つの値 $u,v$ に対して

$$
\begin{aligned}
|\Phi(t,u,h)-\Phi(t,v,h)|
&=
\left|
\frac{u-v}{h^2}
\right|\\
&=
\frac1{h^2}|u-v|.
\end{aligned}
$$

したがって Lipschitz 定数は

$$
\boxed{
L(h)=h^{-2}
}.
$$

これは $h\to0$ で発散します。

本章の収束定理は、$h$ に依存しない一様な Lipschitz 定数 $L$ を仮定しています。この方法ではその仮定が破れ、過去の誤差を $1+1/h$ 倍程度ずつ増幅します。

したがって「整合性だけでは大域収束を保証しない」ことが分かります。
<!-- solution-end -->

## Level C

<a id="ex-na6-c01"></a>
### NA6-C01 ロジスティック方程式で Euler 法の一次収束を閉じる
- Level: C

$r>0$, $K>0$ とし、ロジスティック方程式

$$
y'
=
r y\left(1-\frac yK\right),
\qquad
0<y(0)<K
$$

を $[0,T]$ で考える。

Euler 法

$$
y_{n+1}
=
y_n
+
hr y_n
\left(
1-\frac{y_n}{K}
\right)
$$

を用いる。

$hr\le1$ と仮定し、次を示せ。

1. $0\le y_n\le K$ なら $0\le y_{n+1}\le K$ である。
2. 区間 $[0,K]$ 上で

$$
f(y)=r y\left(1-\frac yK\right)
$$

は Lipschitz 定数 $L=r$ を持つ。
3. 厳密解も $0<y(t)<K$ に留まることを ODE1 の phase line の議論から説明せよ。
4. 厳密解について

$$
|y''(t)|
\le
\frac{r^2K}{4}
$$

を示せ。
5. 本章の Euler 法の一次収束定理を使い、

$$
\max_{0\le n\le N}|Y_n-y_n|
\le
C_T h
$$

の形の具体的な $C_T$ を与えよ。

<!-- solution-start -->
### 詳細解答

まず Euler 更新写像を

$$
G(y)
=
y+hr y\left(1-\frac yK\right)
$$

と置きます。

### 1. 区間 $[0,K]$ の保存

微分すると

$$
G'(y)
=
1+hr-\frac{2hr}{K}y.
$$

$0\le y\le K$ では最小値は $y=K$ で取り、

$$
G'(y)
\ge
1+hr-2hr
=
1-hr
\ge0.
$$

したがって $G$ は $[0,K]$ 上で単調増加です。

端点では

$$
G(0)=0,
$$

$$
G(K)
=
K+hrK(1-1)
=
K.
$$

よって単調性から

$$
0=G(0)\le G(y)\le G(K)=K.
$$

したがって

$$
\boxed{
0\le y_n\le K
\Longrightarrow
0\le y_{n+1}\le K
}.
$$

初期値が $(0,K)$ にあるので帰納法により全数値解が $[0,K]$ に留まります。

### 2. Lipschitz 定数

$$
f'(y)
=
r\left(1-\frac{2y}{K}\right).
$$

$0\le y\le K$ では

$$
-1
\le
1-\frac{2y}{K}
\le
1.
$$

したがって

$$
|f'(y)|\le r.
$$

平均値の定理から任意の $u,v\in[0,K]$ に対し

$$
|f(u)-f(v)|
\le
r|u-v|.
$$

よって

$$
\boxed{
L=r
}.
$$

### 3. 厳密解の領域

[ODE1 の phase line](../ODE1/index.md#def-ode1-equilibrium)で、

$$
f(0)=0,
\qquad
f(K)=0
$$

です。

さらに

$$
0<y<K
$$

では

$$
f(y)>0.
$$

したがって解は区間内部で増加します。

ODE1 の Picard--Lindelöf による一意性があるため、内部から出発した解が有限時刻で平衡解 $0$ または $K$ と交差して、その後別の解へ乗り換えることはできません。

従って

$$
\boxed{
0<y(t)<K
}
$$

が保たれます。

### 4. 二階微分の評価

自律方程式なので連鎖律から

$$
y''
=
f'(y)y'
=
f'(y)f(y).
$$

上で示したように

$$
|f'(y)|\le r.
$$

また

$$
f(y)
=
r y\left(1-\frac yK\right).
$$

二次関数

$$
y\left(1-\frac yK\right)
=
y-\frac{y^2}{K}
$$

は $y=K/2$ で最大となり、その値は

$$
\frac K2\left(1-\frac12\right)
=
\frac K4.
$$

したがって

$$
|f(y)|
\le
\frac{rK}{4}.
$$

よって

$$
|y''|
=
|f'(y)f(y)|
\le
r\cdot\frac{rK}{4}
=
\boxed{
\frac{r^2K}{4}
}.
$$

従って

$$
M_2\le\frac{r^2K}{4}.
$$

### 5. 大域誤差

[Euler 法の一次収束](#cor-na6-euler-convergence)から

$$
\max_n|Y_n-y_n|
\le
\frac{M_2}{2}
T
e^{LT}
h.
$$

ここへ

$$
M_2\le\frac{r^2K}{4},
\qquad
L=r
$$

を代入すると

$$
\max_n|Y_n-y_n|
\le
\frac12
\frac{r^2K}{4}
T e^{rT}h.
$$

したがって

$$
\boxed{
\max_{0\le n\le N}|Y_n-y_n|
\le
\frac{r^2KT}{8}e^{rT}h
}.
$$

よって

$$
\boxed{
C_T=\frac{r^2KT}{8}e^{rT}
}
$$

と取れます。

この問題では

1. 数値軌道が Lipschitz 評価を使える領域 $[0,K]$ に留まること、
2. 厳密解も同じ領域に留まること、
3. その領域で $f$ の Lipschitz 定数を具体化すること、
4. 局所誤差を支配する $y''$ を具体的に評価すること、

を順に確認して初めて、抽象的な収束定理を実際の ODE へ適用できました。
<!-- solution-end -->

---

## 13. 次へ：一段法の精度と長時間安定性を高める

Euler 法は、一段法の収束論を最も透明に見るための出発点です。

しかし実用上は、

- 同じ刻み幅でより高い次数を得たい。
- $y'=\lambda y$ の減衰を、数値法も正しく再現してほしい。
- stiffness の強い問題で極端に小さい刻み幅を強制されたくない。
- 陰的方法を使う価値を数学的に説明したい。

という課題が残ります。

NA7 では Runge--Kutta 法へ進み、

~~~text
一段法
  ↓ 段階値を複数使う
Runge--Kutta 法
  ↓ Taylor 展開と係数条件
次数
  ↓ テスト方程式 y'=lambda y
安定関数・絶対安定領域
  ↓
stiffness・陰解法
~~~

を扱います。
