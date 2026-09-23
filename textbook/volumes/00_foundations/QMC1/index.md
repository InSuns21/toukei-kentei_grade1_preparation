# QMC1 準 Monte Carlo I：一様分布・ディスクレパンシー・Koksma--Hlawka

MC1 では、単位立方体上の積分

$$
I(f)
=
\int_{[0,1]^s}
f(\boldsymbol x)\,d\boldsymbol x
$$

を一様分布からの期待値とみなし、独立同分布な乱数点

$$
\boldsymbol U_1,\ldots,\boldsymbol U_N
$$

を使って

$$
\frac1N
\sum_{n=1}^N
f(\boldsymbol U_n)
$$

と近似しました。

準 Monte Carlo 法では発想を変えます。点を乱数で選ばず、あらかじめ

$$
P_N
=
\{
\boldsymbol x_1,\ldots,\boldsymbol x_N
\}
\subset
[0,1)^s
$$

と配置し、

$$
Q_N(f)
=
\frac1N
\sum_{n=1}^N
f(\boldsymbol x_n)
$$

で積分を近似します。

すると誤差は確率変数ではありません。標準誤差や信頼区間を作る代わりに、

$$
\boxed{
\text{点集合がどれだけ一様か}
}
$$

を幾何学的に測り、その量から決定論的に積分誤差を押さえます。

本章の中心となる誤差評価は

$$
\boxed{
\left|
Q_N(f)-I(f)
\right|
\le
V_{\mathrm{HK}}(f)\,
D_N^\ast(P_N)
}
$$

です。

右辺は二つに分かれています。

- $D_N^\ast(P_N)$：点集合側の偏り。
- $V_{\mathrm{HK}}(f)$：関数側の変動。

この分離が準 Monte Carlo 法の出発点です。

---

## 0. まず一次元で「点の偏り」を見る

$[0,1)$ に $N$ 点を置きます。

例えば中点

$$
x_n
=
\frac{n-\frac12}{N},
\qquad
n=1,\ldots,N
$$

を考えます。

任意の $t\in[0,1]$ に対し、区間 $[0,t)$ の長さは $t$ です。点が完全に一様なら、そこへ入る点の割合もほぼ $t$ であってほしいはずです。

そこで

$$
\frac1N
\#\{
n:x_n<t
\}
-t
$$

を調べます。

中点集合では、経験分布関数の階段と直線 $t$ のずれは最大でも

$$
\frac1{2N}
$$

です。

一方、全点を $1/2$ に重ねれば、

$$
x_1=\cdots=x_N=\frac12
$$

となり、$t=1/2$ 付近で点の割合と区間長のずれは $1/2$ まで大きくなります。

「一様に見える」を、すべての $[0,t)$ に対する最悪のずれとして数値化する量を次節で定義します。

---

## 1. 直方体で点の偏りを測る

$s$ 次元で

$$
\boldsymbol t
=
(t_1,\ldots,t_s)
\in
[0,1]^s
$$

とします。

<a id="def-qmc1-local-discrepancy"></a>
<!-- formal-statement-start -->
### 定義（アンカー付き直方体と局所ディスクレパンシー）

$\boldsymbol t\in[0,1]^s$ に対し、

$$
[0,\boldsymbol t)
=
\prod_{j=1}^s
[0,t_j)
$$

を原点にアンカーした半開直方体とする。

$N$ 点集合

$$
P_N
=
\{
\boldsymbol x_1,\ldots,\boldsymbol x_N
\}
\subset
[0,1)^s
$$

に対し、

$$
A_N(\boldsymbol t;P_N)
=
\frac1N
\sum_{n=1}^N
\boldsymbol 1_{[0,\boldsymbol t)}
(\boldsymbol x_n)
$$

をその直方体へ入る点の割合とする。

局所ディスクレパンシーを

$$
\boxed{
\Delta_N(\boldsymbol t;P_N)
=
A_N(\boldsymbol t;P_N)
-
\prod_{j=1}^s t_j
}
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc1-local-discrepancy -->
**定義の確認：$2\times2$ の中点格子**

$$
P_4
=
\left\{
\left(\frac14,\frac14\right),
\left(\frac14,\frac34\right),
\left(\frac34,\frac14\right),
\left(\frac34,\frac34\right)
\right\}
$$

とします。

$\boldsymbol t=(1/2,1/2)$ では $[0,\boldsymbol t)$ に入るのは $(1/4,1/4)$ の1点だけです。従って

$$
A_4(\boldsymbol t;P_4)
=
\frac14.
$$

直方体の面積も

$$
\frac12\cdot\frac12
=
\frac14
$$

なので、

$$
\Delta_4
\left(
\left(\frac12,\frac12\right);P_4
\right)
=
0.
$$

一方、

$$
\boldsymbol t
=
\left(
\frac34,\frac34
\right)
$$

では、半開区間なので座標がちょうど $3/4$ の点は入りません。入るのは $(1/4,1/4)$ の1点です。従って

$$
A_4(\boldsymbol t;P_4)
=
\frac14,
$$

面積は

$$
\frac{9}{16}
$$

だから

$$
\Delta_4(\boldsymbol t;P_4)
=
\frac14-\frac{9}{16}
=
-\frac5{16}.
$$

同じ点集合でも、調べる直方体によって偏りは変わります。
<!-- definition-example-end -->

<a id="def-qmc1-star-discrepancy"></a>
<!-- formal-statement-start -->
### 定義（スター・ディスクレパンシー）

$P_N\subset[0,1)^s$ のスター・ディスクレパンシーを

$$
\boxed{
D_N^\ast(P_N)
=
\sup_{\boldsymbol t\in[0,1]^s}
\left|
\Delta_N(\boldsymbol t;P_N)
\right|
}
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc1-star-discrepancy -->
**定義の確認：一次元中点集合**

$$
x_n
=
\frac{n-\frac12}{N}
$$

とします。

$t$ が $x_k$ の直前にあるとき、$[0,t)$ に入る点は $k-1$ 個なので、

$$
A_N(t)
\approx
\frac{k-1}{N},
\qquad
t
\approx
\frac{k-\frac12}{N}.
$$

差は

$$
-\frac1{2N}
$$

へ近づきます。

$x_k$ の直後では $k$ 点が入り、

$$
A_N(t)-t
\approx
\frac{k}{N}
-
\frac{k-\frac12}{N}
=
\frac1{2N}.
$$

各ジャンプの間では $A_N(t)$ は一定で、$-t$ の分だけ単調に減るため、これ以上大きな絶対値は生じません。

従って

$$
\boxed{
D_N^\ast(P_N)
=
\frac1{2N}
}.
$$
<!-- definition-example-end -->

ここで大切なのは、スター・ディスクレパンシーが「最近傍距離」や「点間距離の均等さ」を直接測っているわけではないことです。

測っているのは

$$
\boxed{
\text{原点にアンカーした全直方体について、点数比と体積比がどれだけ一致するか}
}
$$

です。

---

## 2. 点列の一様分布

有限個の点では「完全に一様」は通常不可能です。そこで点数を増やした極限を考えます。

<a id="def-qmc1-uniform-sequence"></a>
<!-- formal-statement-start -->
### 定義（一様分布する点列）

点列

$$
(\boldsymbol x_n)_{n\ge1}
\subset
[0,1)^s
$$

が一様分布するとは、任意の軸平行半開直方体

$$
B
=
\prod_{j=1}^s
[a_j,b_j)
\subset
[0,1)^s
$$

に対して

$$
\boxed{
\frac1N
\#\{
1\le n\le N:
\boldsymbol x_n\in B
\}
\longrightarrow
\lambda_s(B)
=
\prod_{j=1}^s
(b_j-a_j)
}
$$

が成り立つことをいう。
<!-- formal-statement-end -->

ここでの「一様分布」は、確率変数の分布名ではなく**決定論的点列の漸近的な配置**を表します。

<a id="thm-qmc1-uniform-star-equivalence"></a>
<!-- formal-statement-start -->
### 定理（一様分布とスター・ディスクレパンシーの同値性）

点列

$$
(\boldsymbol x_n)_{n\ge1}
\subset
[0,1)^s
$$

の先頭 $N$ 点を

$$
P_N
=
\{
\boldsymbol x_1,\ldots,\boldsymbol x_N
\}
$$

とする。

このとき次は同値である。

1. $(\boldsymbol x_n)$ は $[0,1)^s$ で一様分布する。
2.
   $$
   \boxed{
   D_N^\ast(P_N)
   \longrightarrow
   0
   }.
   $$
<!-- formal-statement-end -->

### なぜこの定理が欲しいのか

一様分布の定義は、無数の一般直方体 $[a,b)$ を一つずつ確認する形です。

一方、スター・ディスクレパンシーは一つの数です。

この定理により、

$$
\text{一様分布}
\quad\Longleftrightarrow\quad
\text{一つの最悪誤差 }D_N^\ast\text{ が }0\text{ へ行く}
$$

とまとめられます。

### 証明の見取り図

- $D_N^\ast\to0$ なら、一般の $[a,b)$ をアンカー付き直方体の包除原理で表します。
- 一様分布から $D_N^\ast\to0$ を出す方向では、有限格子で $[0,t)$ を上下から挟みます。有限個の格子点では同時に誤差を小さくでき、その間の体積差を格子幅で抑えます。

<!-- proof-start -->
### 証明

まず

$$
D_N^\ast(P_N)
\longrightarrow0
$$

を仮定します。

任意の

$$
B
=
\prod_{j=1}^s
[a_j,b_j)
$$

を取ります。

各座標で

$$
\boldsymbol 1_{[a_j,b_j)}(x_j)
=
\boldsymbol 1_{[0,b_j)}(x_j)
-
\boldsymbol 1_{[0,a_j)}(x_j)
$$

なので、

$$
\boldsymbol 1_B(\boldsymbol x)
=
\prod_{j=1}^s
\left(
\boldsymbol 1_{[0,b_j)}(x_j)
-
\boldsymbol 1_{[0,a_j)}(x_j)
\right).
$$

積を展開すると $2^s$ 個のアンカー付き直方体の指示関数の符号付き和になります。

体積についても同じ展開が成り立つため、

$$
\left|
\frac1N
\#\{
n\le N:\boldsymbol x_n\in B
\}
-
\lambda_s(B)
\right|
\le
2^s D_N^\ast(P_N).
$$

右辺は $0$ へ収束するので、点列は一様分布します。

逆に、点列が一様分布すると仮定します。

$\varepsilon>0$ を任意に取ります。

整数 $m$ を十分大きく選び、

$$
\frac{s}{m}
<
\frac{\varepsilon}{2}
$$

とします。

有限格子

$$
G_m
=
\left\{
0,\frac1m,\ldots,1
\right\}^s
$$

を考えます。

一様分布の仮定から、各 $\boldsymbol g\in G_m$ について

$$
\Delta_N(\boldsymbol g;P_N)
\longrightarrow0.
$$

$G_m$ は有限集合なので、ある $N_0$ が存在し、$N\ge N_0$ ならすべての $\boldsymbol g\in G_m$ について同時に

$$
\left|
\Delta_N(\boldsymbol g;P_N)
\right|
<
\frac{\varepsilon}{2}
$$

となります。

任意の $\boldsymbol t\in[0,1]^s$ を取ります。

各座標で格子点 $a_j,b_j$ を

$$
a_j
\le
t_j
\le
b_j,
\qquad
0\le b_j-a_j\le\frac1m
$$

となるよう選びます。

すると

$$
[0,\boldsymbol a)
\subset
[0,\boldsymbol t)
\subset
[0,\boldsymbol b)
$$

です。

従って点数比の単調性から

$$
A_N(\boldsymbol a)
\le
A_N(\boldsymbol t)
\le
A_N(\boldsymbol b).
$$

上側を評価すると

$$
\begin{aligned}
A_N(\boldsymbol t)
-
\prod_{j=1}^s t_j
&\le
A_N(\boldsymbol b)
-
\prod_{j=1}^s t_j
\\
&=
\Delta_N(\boldsymbol b)
+
\left(
\prod_{j=1}^s b_j
-
\prod_{j=1}^s t_j
\right).
\end{aligned}
$$

$0\le t_j\le b_j\le1$ なので、積の差は各座標を一つずつ置き換える望遠鏡和から

$$
0
\le
\prod_{j=1}^s b_j
-
\prod_{j=1}^s t_j
\le
\sum_{j=1}^s
(b_j-t_j)
\le
\frac{s}{m}.
$$

従って

$$
A_N(\boldsymbol t)
-
\prod_{j=1}^s t_j
<
\frac{\varepsilon}{2}
+
\frac{\varepsilon}{2}
=
\varepsilon.
$$

同様に下側は

$$
A_N(\boldsymbol t)
-
\prod_{j=1}^s t_j
>
-\frac{\varepsilon}{2}
-
\frac{s}{m}
>
-\varepsilon.
$$

よってすべての $\boldsymbol t$ について

$$
\left|
\Delta_N(\boldsymbol t;P_N)
\right|
<
\varepsilon.
$$

従って

$$
D_N^\ast(P_N)
<
\varepsilon
$$

であり、

$$
D_N^\ast(P_N)\to0.
$$

これで両方向が示されました。$\square$
<!-- proof-end -->

この証明で有限格子を使った理由は重要です。

一様分布の定義から得られるのは各固定直方体に対する収束です。そこから無限個の $\boldsymbol t$ に対する上限へ進むには、有限格子で一度有限化し、その隙間を体積差で埋める必要があります。

---

## 3. 決定論的点集合で積分を近似する

<a id="def-qmc1-qmc-rule"></a>
<!-- formal-statement-start -->
### 定義（準 Monte Carlo 求積則）

可積分関数

$$
f:[0,1]^s\to\mathbb R
$$

と点集合

$$
P_N
=
\{
\boldsymbol x_1,\ldots,\boldsymbol x_N
\}
\subset
[0,1)^s
$$

に対し、

$$
\boxed{
Q_N(f;P_N)
=
\frac1N
\sum_{n=1}^N
f(\boldsymbol x_n)
}
$$

を準 Monte Carlo 求積則とする。

目標積分を

$$
I(f)
=
\int_{[0,1]^s}
f(\boldsymbol x)\,d\boldsymbol x
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc1-qmc-rule -->
**定義の確認：一次元中点集合で $f(x)=x$**

$$
x_n
=
\frac{n-\frac12}{N}
$$

なら

$$
\begin{aligned}
Q_N(f)
&=
\frac1N
\sum_{n=1}^N
\frac{n-\frac12}{N}
\\
&=
\frac1{N^2}
\left(
\frac{N(N+1)}2
-
\frac N2
\right)
\\
&=
\frac12.
\end{aligned}
$$

一方、

$$
I(f)
=
\int_0^1x\,dx
=
\frac12.
$$

従ってこの関数では有限 $N$ の時点で誤差は0です。
<!-- definition-example-end -->

MC1 の Monte Carlo 推定量と式の形は同じですが、意味は違います。

| Monte Carlo | 準 Monte Carlo |
|---|---|
| 点は通常ランダム | 点は通常決定論的 |
| 誤差は確率変数 | 誤差は決定論的 |
| 分散・標準誤差・[中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) を使う | ディスクレパンシー・変動を使う |
| 典型尺度 $N^{-1/2}$ | 良い点集合と関数クラスではより速い決定論的評価を狙う |

準 Monte Carlo では「不偏か」という問いより、

$$
\left|
Q_N(f)-I(f)
\right|
$$

を点集合と関数の性質から直接どう抑えるかが中心です。

---

## 4. 関数側の粗さを測る

スター・ディスクレパンシーだけでは、どんな関数でも積分誤差を小さくできるわけではありません。

点集合が細かい空間構造を見落としているとき、関数がその構造で激しく上下すれば誤差は大きくなり得ます。

そこで関数側にも「どれだけ激しく変化するか」という尺度が必要です。

まず $d$ 次元関数

$$
g:[0,1]^d\to\mathbb R
$$

を考えます。

直方体

$$
J
=
\prod_{j=1}^d
[a_j,b_j]
$$

に対し、各頂点を

$$
c_{\boldsymbol\varepsilon,j}
=
\begin{cases}
a_j,&\varepsilon_j=0,\\
b_j,&\varepsilon_j=1
\end{cases}
$$

で表します。

混合差分を

$$
\Delta(g;J)
=
\sum_{\boldsymbol\varepsilon\in\{0,1\}^d}
(-1)^{d-|\boldsymbol\varepsilon|}
g(\boldsymbol c_{\boldsymbol\varepsilon})
$$

とします。

$d=1$ なら

$$
\Delta(g;[a,b])
=
g(b)-g(a),
$$

$d=2$ なら

$$
\Delta(g;[a_1,b_1]\times[a_2,b_2])
=
g(b_1,b_2)
-g(a_1,b_2)
-g(b_1,a_2)
+g(a_1,a_2).
$$

<a id="def-qmc1-vitali-variation"></a>
<!-- formal-statement-start -->
### 定義（Vitali 変動）

各座標を有限個の区間へ分割して得られる軸平行格子分割を $\mathcal P$ とする。

$d$ 次元関数 $g$ の Vitali 変動を

$$
\boxed{
V^{(d)}(g)
=
\sup_{\mathcal P}
\sum_{J\in\mathcal P}
\left|
\Delta(g;J)
\right|
}
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc1-vitali-variation -->
**定義の確認：$g(x,y)=xy$**

長方形

$$
J=[a,b]\times[c,d]
$$

では

$$
\begin{aligned}
\Delta(g;J)
&=
bd-ad-bc+ac
\\
&=
(b-a)(d-c)
\ge0.
\end{aligned}
$$

従って任意の格子分割で

$$
\sum_{J\in\mathcal P}
|\Delta(g;J)|
$$

は各小長方形の面積の和に等しく、

$$
1
$$

です。

したがって

$$
\boxed{
V^{(2)}(xy)=1
}.
$$
<!-- definition-example-end -->

---

## 5. 境界面の変動も数える

後で示す積分誤差評価では、最高次元の混合変動だけでは足りません。

例えば $f(x,y)=x$ は二次元混合差分だけ見れば0ですが、$x$ 方向には明らかに変化しています。

そこで低次元の境界面も全部数えます。

座標集合を

$$
S=\{1,\ldots,s\}
$$

とします。

非空部分集合 $u\subseteq S$ に対し、$u$ に含まれない座標を1に固定した面上の関数を

$$
f_u(\boldsymbol x_u)
=
f(
\boldsymbol x_u,
\boldsymbol 1_{-u}
)
$$

と書きます。

<a id="def-qmc1-hk-variation"></a>
<!-- formal-statement-start -->
### 定義（Hardy--Krause 変動）

$f:[0,1]^s\to\mathbb R$ に対し、1側にアンカーした Hardy--Krause 変動を

$$
\boxed{
V_{\mathrm{HK}}(f)
=
\sum_{\emptyset\ne u\subseteq S}
V^{(|u|)}(f_u)
}
$$

で定める。

右辺が有限のとき、$f$ は有界 Hardy--Krause 変動を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc1-hk-variation -->
**定義の確認：$f(x,y)=xy$**

$s=2$ では非空部分集合は

$$
\{1\},
\qquad
\{2\},
\qquad
\{1,2\}
$$

の三つです。

$\{1\}$ の面では

$$
f_{\{1\}}(x)
=
f(x,1)
=
x
$$

なので一次元変動は

$$
V^{(1)}(f_{\{1\}})
=
1.
$$

同様に

$$
V^{(1)}(f_{\{2\}})
=
1.
$$

全二次元面では前節から

$$
V^{(2)}(f)
=
1.
$$

従って

$$
\boxed{
V_{\mathrm{HK}}(xy)
=
1+1+1
=
3
}.
$$
<!-- definition-example-end -->

### 滑らかな関数では何を測っているか

$f$ が十分滑らかなら、各面の Vitali 変動は対応する混合偏導関数の絶対値積分で書けます。

すなわち

$$
V_{\mathrm{HK}}(f)
=
\sum_{\emptyset\ne u\subseteq S}
\int_{[0,1]^{|u|}}
\left|
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
(
\boldsymbol x_u,
\boldsymbol1_{-u}
)
\right|
d\boldsymbol x_u.
$$

$f(x,y)=xy$ なら

$$
f_x(x,1)=1,
\qquad
f_y(1,y)=1,
\qquad
f_{xy}(x,y)=1
$$

なので、確かに三つの積分がそれぞれ1になります。

---

## 6. 積分誤差をディスクレパンシーで書き直す

ここが Koksma--Hlawka の核心です。

「点の偏り」と「関数の微分」がどう一つの式で結び付くかを先に見ます。

<a id="thm-qmc1-hlawka-zaremba"></a>
<!-- formal-statement-start -->
### 定理（Hlawka--Zaremba 恒等式）

$P_N=\{\boldsymbol x_1,\ldots,\boldsymbol x_N\}\subset[0,1)^s$ とする。

$f:[0,1]^s\to\mathbb R$ は、任意の非空部分集合 $u\subseteq S$ に対して混合偏導関数

$$
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
$$

が連続であるとする。

このとき

$$
\boxed{
Q_N(f)-I(f)
=
\sum_{\emptyset\ne u\subseteq S}
(-1)^{|u|}
\int_{[0,1]^{|u|}}
\Delta_N(
(\boldsymbol t_u,\boldsymbol1_{-u});P_N
)
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
(
\boldsymbol t_u,\boldsymbol1_{-u}
)
\,d\boldsymbol t_u
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 式の意味

$s=1$ なら

$$
Q_N(f)-I(f)
=
-
\int_0^1
\Delta_N(t)
f'(t)\,dt.
$$

つまり、

- 点が過剰な場所では $\Delta_N>0$。
- 点が不足する場所では $\Delta_N<0$。
- その偏りが、関数の傾き $f'$ と掛け合わされて積分誤差になる。

多次元では、各座標面について同じ構造を足し合わせます。

### 証明の見取り図

1. 多変数微積分の基本定理を $1$ 側から繰り返し適用して、$f(\boldsymbol x)$ を各混合偏導関数の積分へ展開する。
2. その展開を点平均と Lebesgue 積分へそれぞれ代入する。
3. [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)で積分順序を交換すると、「$\boldsymbol x_n$ が $[0,\boldsymbol t)$ に入るか」という指示関数が現れる。
4. 点平均側と一様体積側の差がちょうど局所ディスクレパンシーになる。

<!-- proof-start -->
### 証明

まず1変数の微積分の基本定理から

$$
h(x)
=
h(1)
-
\int_x^1
h'(t)\,dt
$$

です。

これを各座標へ順に適用すると、多変数版として

$$
f(\boldsymbol x)
=
f(\boldsymbol1)
+
\sum_{\emptyset\ne u\subseteq S}
(-1)^{|u|}
\int_{\prod_{j\in u}[x_j,1]}
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
(
\boldsymbol t_u,
\boldsymbol1_{-u}
)
\,d\boldsymbol t_u
$$

を得ます。

この等式は $s=2$ なら

$$
\begin{aligned}
f(x,y)
&=
f(1,1)
-
\int_x^1f_x(t,1)\,dt
-
\int_y^1f_y(1,u)\,du
\\
&\quad
+
\int_x^1\int_y^1
f_{xy}(t,u)\,du\,dt
\end{aligned}
$$

であり、符号と境界面の位置を直接確認できます。

非空 $u$ を固定し、

$$
g_u(\boldsymbol t_u)
=
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
(
\boldsymbol t_u,
\boldsymbol1_{-u}
)
$$

と書きます。

仮定より $g_u$ はコンパクト集合 $[0,1]^{|u|}$ 上で連続なので有界です。後で現れる指示関数の積は絶対値が1以下なので、$g_u$ との積は有限測度の直方体上で絶対可積分です。従って [Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) により、以下の積分順序交換を正当化できます。

点 $\boldsymbol x_n$ に対して

$$
\int_{\prod_{j\in u}[x_{n,j},1]}
g_u(\boldsymbol t_u)\,d\boldsymbol t_u
$$

を考えます。

積分領域を指示関数で書けば

$$
\int_{[0,1]^{|u|}}
g_u(\boldsymbol t_u)
\prod_{j\in u}
\boldsymbol1_{\{x_{n,j}\le t_j\}}
\,d\boldsymbol t_u.
$$

有限和と積分を交換して $n$ について平均すると

$$
\int_{[0,1]^{|u|}}
g_u(\boldsymbol t_u)
\left[
\frac1N
\sum_{n=1}^N
\prod_{j\in u}
\boldsymbol1_{\{x_{n,j}\le t_j\}}
\right]
d\boldsymbol t_u.
$$

$t_j=x_{n,j}$ となる点の集合は Lebesgue 測度0なので、積分値には影響せず、$\le$ を $<$ に置き換えられます。

従って角括弧は、残りの座標を1にしたアンカー付き直方体への点数比

$$
A_N(
(\boldsymbol t_u,\boldsymbol1_{-u});P_N
)
$$

です。

一方、同じ項を $\boldsymbol x$ について $[0,1]^s$ 上で積分すると、積分順序の交換により

$$
\int_{[0,1]^{|u|}}
g_u(\boldsymbol t_u)
\prod_{j\in u}t_j
\,d\boldsymbol t_u
$$

となります。

実際、固定した $\boldsymbol t_u$ に対して

$$
0\le x_j\le t_j
$$

を満たす $x_j$ の長さが $t_j$ だからです。

従って、点平均から一様積分を引いた差は

$$
\int_{[0,1]^{|u|}}
g_u(\boldsymbol t_u)
\left[
A_N(
(\boldsymbol t_u,\boldsymbol1_{-u});P_N
)
-
\prod_{j\in u}t_j
\right]
d\boldsymbol t_u.
$$

角括弧は

$$
\Delta_N(
(\boldsymbol t_u,\boldsymbol1_{-u});P_N
)
$$

です。

定数項 $f(\boldsymbol1)$ は点平均と積分で打ち消し合います。

最後に各非空 $u$ について係数 $(-1)^{|u|}$ を付けて足せば、主張した恒等式を得ます。$\square$
<!-- proof-end -->

この恒等式は「なぜディスクレパンシーが積分誤差へ現れるのか」を直接説明しています。

---

## 7. 点集合と関数変動を結ぶ誤差上界

<a id="thm-qmc1-koksma-hlawka"></a>
<!-- formal-statement-start -->
### 定理（Koksma--Hlawka の不等式）

$P_N\subset[0,1)^s$ を $N$ 点集合とし、

$$
f:[0,1]^s\to\mathbb R
$$

は Riemann 可積分で、1側にアンカーした Hardy--Krause 変動が有限であるとする。

このとき

$$
\boxed{
\left|
Q_N(f;P_N)
-
I(f)
\right|
\le
V_{\mathrm{HK}}(f)
D_N^\ast(P_N)
}.
$$
<!-- formal-statement-end -->

### 証明の核心

まず前節の滑らかな場合は完全に示せます。

[Hlawka--Zaremba 恒等式](#thm-qmc1-hlawka-zaremba)から

$$
\begin{aligned}
|Q_N(f)-I(f)|
&\le
\sum_{\emptyset\ne u\subseteq S}
\int_{[0,1]^{|u|}}
\left|
\Delta_N(
(\boldsymbol t_u,\boldsymbol1_{-u})
)
\right|
\\
&\qquad\qquad\qquad\times
\left|
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
(
\boldsymbol t_u,\boldsymbol1_{-u}
)
\right|
d\boldsymbol t_u.
\end{aligned}
$$

スター・ディスクレパンシーの定義から

$$
\left|
\Delta_N(
(\boldsymbol t_u,\boldsymbol1_{-u})
)
\right|
\le
D_N^\ast(P_N).
$$

従って

$$
\begin{aligned}
|Q_N(f)-I(f)|
&\le
D_N^\ast(P_N)
\sum_{\emptyset\ne u\subseteq S}
\int_{[0,1]^{|u|}}
\left|
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
(
\boldsymbol t_u,\boldsymbol1_{-u}
)
\right|
d\boldsymbol t_u
\\
&=
D_N^\ast(P_N)
V_{\mathrm{HK}}(f).
\end{aligned}
$$

よって滑らかな関数では不等式が従います。

<!-- proof-start -->
### 証明（一般の有界 Hardy--Krause 変動への拡張）

滑らかでない一般の有界 Hardy--Krause 変動関数では、混合偏導関数

$$
\frac{\partial^{|u|}f}
{\partial\boldsymbol x_u}
\,d\boldsymbol x_u
$$

を、その面上の有限符号付き Stieltjes 測度へ置き換えます。

多次元有界変動論の標準結果により、各面の測度の全変動は対応する Vitali 変動

$$
V^{(|u|)}(f_u)
$$

に一致し、Hlawka--Zaremba の積分表示は Riemann--Stieltjes 積分として延長されます。

すると各面について

$$
\left|
\int
\Delta_N\,d\mu_u
\right|
\le
\|\Delta_N\|_\infty
|\mu_u|([0,1]^{|u|})
\le
D_N^\ast(P_N)
V^{(|u|)}(f_u)
$$

です。

非空 $u$ について足し合わせれば

$$
|Q_N(f)-I(f)|
\le
D_N^\ast(P_N)
\sum_{\emptyset\ne u\subseteq S}
V^{(|u|)}(f_u)
=
D_N^\ast(P_N)
V_{\mathrm{HK}}(f).
$$

これで一般形が得られます。$\square$

ここで黒箱にしているのは **多次元 Vitali 変動から有限符号付き Stieltjes 測度を構成する一般論**だけです。本章の中心である

$$
\text{求積誤差}
\longleftrightarrow
\text{局所ディスクレパンシーと関数変動の積分}
$$

という機構は、前節で滑らかな場合に微積分の基本定理から直接導出済みです。
<!-- proof-end -->

### どの仮定が何をしているか

- $D_N^\ast(P_N)$ が小さい  
  → アンカー付き直方体ごとの点数誤差が小さい。
- $V_{\mathrm{HK}}(f)<\infty$  
  → 関数の変化が各座標面で有限量に抑えられ、局所的な点数誤差を無制限に増幅しない。
- 両者を掛ける  
  → 点集合側と関数側を分離した決定論的誤差上界になる。

---

## 8. 一次元中点則で Koksma--Hlawka を使う

再び

$$
x_n
=
\frac{n-\frac12}{N}
$$

とし、

$$
f(x)=x^2
$$

を考えます。

前に示した通り

$$
D_N^\ast
=
\frac1{2N}.
$$

$f$ は $[0,1]$ で単調増加なので、一次元全変動は

$$
V_{\mathrm{HK}}(f)
=
V^{(1)}(f)
=
f(1)-f(0)
=
1.
$$

従って Koksma--Hlawka から

$$
\boxed{
\left|
Q_N(f)-\frac13
\right|
\le
\frac1{2N}
}.
$$

実際の中点則の値を計算すると

$$
\begin{aligned}
Q_N(f)
&=
\frac1N
\sum_{n=1}^N
\left(
\frac{n-\frac12}{N}
\right)^2
\\
&=
\frac13
-
\frac1{12N^2}.
\end{aligned}
$$

従って真の誤差は

$$
\boxed{
\left|
Q_N(f)-I(f)
\right|
=
\frac1{12N^2}
}.
$$

Koksma--Hlawka の

$$
O(N^{-1})
$$

上界より実際には速く減っています。

これは矛盾ではありません。Koksma--Hlawka は、点集合と関数について広く使える**保証**であって、個々の関数に対する鋭い漸近展開ではありません。

---

## 9. 上界が鋭くなる例と、何を保証しないか

### 9.1 全点を $1/2$ に重ねる

一次元で

$$
x_1=\cdots=x_N=\frac12
$$

とします。

$t=1/2$ では半開区間 $[0,1/2)$ に点が入らないので

$$
\Delta_N(1/2)
=
0-\frac12
=
-\frac12.
$$

また $t>1/2$ の直後では全点が入り、

$$
\Delta_N(t)
=
1-t
$$

は $1/2$ に近づきます。

従って

$$
D_N^\ast
=
\frac12.
$$

関数

$$
f(x)
=
\boldsymbol1_{[0,1/2)}(x)
$$

を取ると

$$
Q_N(f)=0,
\qquad
I(f)=\frac12.
$$

従って

$$
|Q_N(f)-I(f)|
=
\frac12.
$$

この関数の一次元変動は1なので、

$$
V(f)D_N^\ast
=
1\cdot\frac12
=
\frac12.
$$

この例では Koksma--Hlawka 上界が等号になります。

### 9.2 小さいディスクレパンシーだけでは十分でない

Koksma--Hlawka の右辺には必ず

$$
V_{\mathrm{HK}}(f)
$$

があります。

例えば一次元で

$$
f_m(x)
=
\sin(2\pi m x)
$$

なら

$$
V(f_m)
=
\int_0^1
|2\pi m\cos(2\pi m x)|\,dx
=
4m.
$$

周波数 $m$ が大きいほど変動は大きくなります。

従って

$$
D_N^\ast
$$

が小さいという事実だけから、あらゆる高周波関数に一様に小さな誤差を保証することはできません。

### 9.3 決定論的上界は信頼区間ではない

Koksma--Hlawka は

$$
\left|
Q_N(f)-I(f)
\right|
\le
V_{\mathrm{HK}}(f)D_N^\ast
$$

という決定論的主張です。

「95% の確率でこの範囲」という意味ではありません。

逆に、MC1 の [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) に基づく区間は確率的であり、有限標本で必ず誤差を囲う決定論的上界ではありません。

両者は似た形の「誤差幅」でも、論理の種類が異なります。

---

## 10. 低ディスクレパンシーが得られたら何が起こるか

ここでは後続章の構成法を先取りせず、仮定だけ置きます。

もしある点集合族が

$$
D_N^\ast(P_N)
\le
C_s
\frac{(\log N)^s}{N}
$$

を満たすとします。

$f$ の Hardy--Krause 変動が有限なら、

$$
|Q_N(f)-I(f)|
\le
V_{\mathrm{HK}}(f)
C_s
\frac{(\log N)^s}{N}.
$$

従って固定次元 $s$ では、対数因子を除けば

$$
N^{-1}
$$

に近い決定論的上界が得られます。

MC1 の有限分散 Monte Carlo の二乗平均平方根誤差

$$
O(N^{-1/2})
$$

より速い形です。

ただし、ここから「準 Monte Carlo は常に Monte Carlo より優れる」とは言えません。

- $V_{\mathrm{HK}}(f)$ が大きいか、無限かもしれない。
- 次元 $s$ が増えると定数や対数因子が重くなる。
- Monte Carlo の $N^{-1/2}$ は次元に直接依存しないという強みがある。
- 実用上の誤差推定には randomized QMC が便利で、これは QMC7 で扱う。

QMC1 ではまず、

$$
\boxed{
\text{点集合の幾何学的均一性}
+
\text{関数の変動}
\Longrightarrow
\text{積分誤差}
}
$$

という骨格を確立します。

---

# 演習

## Level A

### QMC1-A01 一次元中点集合のスター・ディスクレパンシー

$$
x_n
=
\frac{n-\frac12}{N},
\qquad
n=1,\ldots,N
$$

とする。

1. $t\in[x_k,x_{k+1})$ の範囲で $A_N(t)$ を書け。
2. 各ジャンプの直前・直後で $A_N(t)-t$ の極限値を求めよ。
3. $D_N^\ast=1/(2N)$ を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

点を小さい順に並べると

$$
0<x_1<\cdots<x_N<1.
$$

$t\in(x_k,x_{k+1}]$ のようにジャンプ点を避けて考えると、$[0,t)$ に入る点は $k$ 個なので

$$
A_N(t)
=
\frac{k}{N}.
$$

従ってその区間では

$$
A_N(t)-t
=
\frac{k}{N}-t
$$

であり、$t$ に関して傾き $-1$ の直線です。

$x_k$ の直前では入る点は $k-1$ 個なので

$$
\lim_{t\uparrow x_k}
(A_N(t)-t)
=
\frac{k-1}{N}
-
\frac{k-\frac12}{N}
=
-\frac1{2N}.
$$

$x_k$ の直後では $k$ 点が入るので

$$
\lim_{t\downarrow x_k,\ t>x_k}
(A_N(t)-t)
=
\frac{k}{N}
-
\frac{k-\frac12}{N}
=
\frac1{2N}.
$$

各ジャンプ間ではこの差は単調減少するため、絶対値の最大値はジャンプの直前または直後で生じます。

従って

$$
\boxed{
D_N^\ast
=
\frac1{2N}
}.
$$
<!-- solution-end -->

### QMC1-A02 二次元格子の局所ディスクレパンシー

$$
P_4
=
\left\{
\left(\frac14,\frac14\right),
\left(\frac14,\frac34\right),
\left(\frac34,\frac14\right),
\left(\frac34,\frac34\right)
\right\}
$$

とする。

次の $\boldsymbol t$ について局所ディスクレパンシーを計算せよ。

1.
   $$
   \boldsymbol t
   =
   \left(
   \frac12,\frac12
   \right)
   $$
2.
   $$
   \boldsymbol t
   =
   \left(
   \frac34,\frac34
   \right)
   $$
3.
   $$
   \boldsymbol t
   =
   (1,1)
   $$

さらに 2 から $D_4^\ast$ の下界を与えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. $[0,1/2)\times[0,1/2)$ に入るのは $(1/4,1/4)$ の1点です。

従って

$$
A_4
=
\frac14.
$$

面積も

$$
\frac12\cdot\frac12
=
\frac14
$$

なので

$$
\boxed{
\Delta_4
\left(
\frac12,\frac12
\right)
=
0
}.
$$

2. 半開直方体

$$
[0,3/4)\times[0,3/4)
$$

では座標が $3/4$ の点は除かれます。従って入るのは $(1/4,1/4)$ の1点だけです。

よって

$$
A_4
=
\frac14.
$$

面積は

$$
\frac34\cdot\frac34
=
\frac9{16}.
$$

従って

$$
\boxed{
\Delta_4
\left(
\frac34,\frac34
\right)
=
\frac14-\frac9{16}
=
-\frac5{16}
}.
$$

3. $[0,1)\times[0,1)$ には4点すべてが入ります。

従って

$$
A_4(1,1)
=
1,
$$

面積も1なので

$$
\boxed{
\Delta_4(1,1)=0
}.
$$

スター・ディスクレパンシーはすべての $\boldsymbol t$ に対する絶対値の上限なので、2 から

$$
\boxed{
D_4^\ast
\ge
\frac5{16}
}
$$

が従います。
<!-- solution-end -->

### QMC1-A03 $f(x,y)=xy$ の Hardy--Krause 変動

$$
f(x,y)=xy
$$

について、1側にアンカーした Hardy--Krause 変動を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$s=2$ では非空座標集合は

$$
\{1\},
\quad
\{2\},
\quad
\{1,2\}
$$

です。

まず $y=1$ の面では

$$
f_{\{1\}}(x)
=
f(x,1)
=
x.
$$

一次元全変動は

$$
V^{(1)}(f_{\{1\}})
=
1.
$$

同様に $x=1$ の面では

$$
f_{\{2\}}(y)
=
y
$$

なので

$$
V^{(1)}(f_{\{2\}})
=
1.
$$

全二次元面では、長方形 $[a,b]\times[c,d]$ に対する混合差分は

$$
\begin{aligned}
\Delta(f;J)
&=
bd-ad-bc+ac
\\
&=
(b-a)(d-c).
\end{aligned}
$$

これは非負で、格子分割上で足すと小長方形の面積和になるため

$$
V^{(2)}(f)=1.
$$

従って

$$
\boxed{
V_{\mathrm{HK}}(f)
=
1+1+1
=
3
}.
$$
<!-- solution-end -->

### QMC1-A04 中点則と $f(x)=x^2$

一次元中点集合

$$
x_n
=
\frac{n-\frac12}{N}
$$

と

$$
f(x)=x^2
$$

を考える。

1. [Koksma--Hlawka の不等式](#thm-qmc1-koksma-hlawka)から誤差上界を求めよ。
2. $Q_N(f)$ を直接計算し、実際の誤差を求めよ。
3. 二つの次数を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

1. 中点集合について

$$
D_N^\ast
=
\frac1{2N}.
$$

また $f(x)=x^2$ は $[0,1]$ で単調増加なので

$$
V(f)
=
f(1)-f(0)
=
1.
$$

従って Koksma--Hlawka から

$$
\boxed{
|Q_N(f)-I(f)|
\le
\frac1{2N}
}.
$$

2.

$$
Q_N(f)
=
\frac1N
\sum_{n=1}^N
\left(
\frac{n-\frac12}{N}
\right)^2.
$$

分子の和は

$$
\sum_{n=1}^N
\left(n-\frac12\right)^2
=
\sum_{n=1}^Nn^2
-
\sum_{n=1}^Nn
+
\frac N4.
$$

既知の有限和

$$
\sum_{n=1}^Nn
=
\frac{N(N+1)}2,
$$

$$
\sum_{n=1}^Nn^2
=
\frac{N(N+1)(2N+1)}6
$$

を代入すると

$$
Q_N(f)
=
\frac13
-
\frac1{12N^2}.
$$

一方、

$$
I(f)
=
\int_0^1x^2\,dx
=
\frac13.
$$

従って

$$
\boxed{
|Q_N(f)-I(f)|
=
\frac1{12N^2}
}.
$$

3. Koksma--Hlawka の一般上界は

$$
O(N^{-1})
$$

ですが、この特定の点集合と関数では

$$
O(N^{-2})
$$

です。

従って Koksma--Hlawka は正しい保証ですが、この例では鋭い上界ではありません。
<!-- solution-end -->

## Level B

### QMC1-B01 一般直方体のディスクレパンシーをスター・ディスクレパンシーで抑える

$$
B
=
\prod_{j=1}^s
[a_j,b_j)
$$

とする。

$P_N$ に対し

$$
\delta_N(B)
=
\frac1N
\#\{
\boldsymbol x_n\in B
\}
-
\lambda_s(B)
$$

とおく。

包除原理を使って

$$
\boxed{
|\delta_N(B)|
\le
2^sD_N^\ast(P_N)
}
$$

を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

各座標について

$$
\boldsymbol1_{[a_j,b_j)}(x_j)
=
\boldsymbol1_{[0,b_j)}(x_j)
-
\boldsymbol1_{[0,a_j)}(x_j)
$$

です。

従って

$$
\boldsymbol1_B(\boldsymbol x)
=
\prod_{j=1}^s
\left(
\boldsymbol1_{[0,b_j)}(x_j)
-
\boldsymbol1_{[0,a_j)}(x_j)
\right).
$$

右辺を展開します。

各座標で $b_j$ 側か $a_j$ 側かを選ぶので、全部で $2^s$ 項が現れます。

各項はある

$$
\boldsymbol c
\in
\{
a_1,b_1
\}
\times\cdots\times
\{
a_s,b_s
\}
$$

に対するアンカー付き直方体

$$
[0,\boldsymbol c)
$$

の指示関数で、符号は $\pm1$ です。

同じ代数展開を体積

$$
\lambda_s(B)
=
\prod_{j=1}^s(b_j-a_j)
$$

にも適用できます。

従って $\delta_N(B)$ は $2^s$ 個の局所ディスクレパンシーの符号付き和です。

よって三角不等式から

$$
|\delta_N(B)|
\le
\sum_{r=1}^{2^s}
|\Delta_N(\boldsymbol c_r;P_N)|.
$$

各項はスター・ディスクレパンシー以下なので

$$
|\delta_N(B)|
\le
2^sD_N^\ast(P_N).
$$

従って

$$
\boxed{
|\delta_N(B)|
\le
2^sD_N^\ast(P_N)
}.
$$
<!-- solution-end -->

### QMC1-B02 一様分布からスター・ディスクレパンシーへ：有限格子による一様化

点列 $(\boldsymbol x_n)$ が $[0,1)^s$ で一様分布するとする。

任意の $\varepsilon>0$ に対して有限格子

$$
G_m
=
\left\{
0,\frac1m,\ldots,1
\right\}^s
$$

を使い、

$$
D_N^\ast
<
\varepsilon
$$

が十分大きい $N$ で成り立つことを示せ。

特に、なぜ「各固定 $\boldsymbol t$ で $\Delta_N(\boldsymbol t)\to0$」だけでは直ちに supremum の収束を言えないかも説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず

$$
\frac{s}{m}
<
\frac{\varepsilon}{2}
$$

となるよう $m$ を選びます。

$G_m$ は有限集合です。

一様分布の仮定から、各 $\boldsymbol g\in G_m$ について

$$
\Delta_N(\boldsymbol g)\to0.
$$

有限個しかないので、ある共通の $N_0$ が存在し、$N\ge N_0$ ならすべての格子点で

$$
|\Delta_N(\boldsymbol g)|
<
\frac{\varepsilon}{2}
$$

とできます。

任意の $\boldsymbol t$ を取り、各座標で

$$
a_j
\le
t_j
\le
b_j,
\qquad
b_j-a_j\le\frac1m
$$

となる隣接格子点を選びます。

すると

$$
[0,\boldsymbol a)
\subset
[0,\boldsymbol t)
\subset
[0,\boldsymbol b).
$$

従って

$$
A_N(\boldsymbol a)
\le
A_N(\boldsymbol t)
\le
A_N(\boldsymbol b).
$$

また

$$
\left|
\prod_jb_j-\prod_jt_j
\right|
\le
\sum_j|b_j-t_j|
\le
\frac{s}{m},
$$

下側も同様です。

従って

$$
|\Delta_N(\boldsymbol t)|
\le
\frac{\varepsilon}{2}
+
\frac{s}{m}
<
\varepsilon.
$$

$\boldsymbol t$ は任意だったので

$$
D_N^\ast
=
\sup_{\boldsymbol t}
|\Delta_N(\boldsymbol t)|
<
\varepsilon.
$$

最後の問いについて、点ごとの収束

$$
\Delta_N(\boldsymbol t)\to0
$$

は、$\boldsymbol t$ ごとに「十分大きい $N$」が異なってよい主張です。

一方

$$
\sup_{\boldsymbol t}
|\Delta_N(\boldsymbol t)|\to0
$$

は、すべての $\boldsymbol t$ に同じ $N_0$ が使える一様な主張です。

その差を埋めるのが、有限格子による有限化と、格子間の体積差の評価です。
<!-- solution-end -->

### QMC1-B03 二次元 Hlawka--Zaremba 恒等式を手で導く

$f\in C^2([0,1]^2)$ とする。

二次元の Hlawka--Zaremba 恒等式

$$
\begin{aligned}
Q_N(f)-I(f)
&=
-
\int_0^1
\Delta_N(t,1)
f_x(t,1)\,dt
\\
&\quad
-
\int_0^1
\Delta_N(1,u)
f_y(1,u)\,du
\\
&\quad
+
\int_0^1\int_0^1
\Delta_N(t,u)
f_{xy}(t,u)\,dt\,du
\end{aligned}
$$

を、二変数の微積分の基本定理から導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず二変数の微積分の基本定理を $1$ 側から使います。

$$
f(x,y)
=
f(1,y)
-
\int_x^1
f_x(t,y)\,dt.
$$

さらに

$$
f(1,y)
=
f(1,1)
-
\int_y^1
f_y(1,u)\,du.
$$

また $f_x(t,y)$ に $y$ 方向の基本定理を使うと

$$
f_x(t,y)
=
f_x(t,1)
-
\int_y^1
f_{xy}(t,u)\,du.
$$

これを最初の式へ代入すると

$$
\begin{aligned}
f(x,y)
&=
f(1,1)
-
\int_y^1
f_y(1,u)\,du
-
\int_x^1
f_x(t,1)\,dt
\\
&\quad
+
\int_x^1\int_y^1
f_{xy}(t,u)\,du\,dt.
\end{aligned}
$$

ここで点平均と一様積分の差を取ります。

定数 $f(1,1)$ は打ち消し合います。

例えば

$$
\int_x^1f_x(t,1)\,dt
$$

の点平均は

$$
\int_0^1
f_x(t,1)
A_N(t,1)
\,dt,
$$

一様積分は

$$
\int_0^1
f_x(t,1)t\,dt
$$

です。

差は

$$
\int_0^1
f_x(t,1)
\Delta_N(t,1)
\,dt.
$$

元の展開でこの項には負号が付いているので

$$
-
\int_0^1
\Delta_N(t,1)
f_x(t,1)\,dt
$$

になります。

$y$ 方向も同様に

$$
-
\int_0^1
\Delta_N(1,u)
f_y(1,u)\,du
$$

です。

最後の混合項では、固定した $(t,u)$ に対し

$$
x\le t,
\qquad
y\le u
$$

を満たす点の割合が $A_N(t,u)$、一様面積が $tu$ なので、その差は

$$
\Delta_N(t,u).
$$

従って混合項は

$$
+
\int_0^1\int_0^1
\Delta_N(t,u)
f_{xy}(t,u)\,dt\,du.
$$

三つを足せば

$$
\boxed{
\begin{aligned}
Q_N(f)-I(f)
&=
-
\int_0^1
\Delta_N(t,1)
f_x(t,1)\,dt
\\
&\quad
-
\int_0^1
\Delta_N(1,u)
f_y(1,u)\,du
\\
&\quad
+
\int_0^1\int_0^1
\Delta_N(t,u)
f_{xy}(t,u)\,dt\,du
\end{aligned}
}
$$

を得ます。
<!-- solution-end -->

## Level C

### QMC1-C01 仮定した低ディスクレパンシー点集合で Monte Carlo と比較する

固定次元 $s$ で、点集合族 $P_N$ が

$$
D_N^\ast(P_N)
\le
C_s
\frac{(\log N)^s}{N}
\qquad
(N\ge2)
$$

を満たすと仮定する。

また

$$
V_{\mathrm{HK}}(f)
\le
V
$$

とする。

1. Koksma--Hlawka から準 Monte Carlo 誤差の上界を導け。
2. 対数因子を一時的に無視したとき、誤差を $\varepsilon$ 程度にするために必要な点数の主な次数を求めよ。
3. MC1 の有限分散 Monte Carlo で二乗平均平方根誤差を $\varepsilon$ 程度にする標本数の次数と比較せよ。
4. この比較だけから「QMC は常に MC より優れる」と結論できない理由を三つ挙げよ。
5. $s$ が固定であるという条件がなぜ重要か説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

1. [Koksma--Hlawka の不等式](#thm-qmc1-koksma-hlawka)から

$$
|Q_N(f)-I(f)|
\le
V_{\mathrm{HK}}(f)
D_N^\ast(P_N).
$$

仮定を代入すると

$$
|Q_N(f)-I(f)|
\le
V
C_s
\frac{(\log N)^s}{N}.
$$

従って

$$
\boxed{
|Q_N(f)-I(f)|
=
O\left(
\frac{(\log N)^s}{N}
\right)
}
$$

です。

2. 対数因子を一時的に無視すれば

$$
\varepsilon
\asymp
N^{-1}
$$

なので

$$
\boxed{
N
\asymp
\varepsilon^{-1}
}
$$

が主な次数です。

厳密には $(\log N)^s$ が付くため、単純な $\varepsilon^{-1}$ だけではありません。

3. MC1 では有限分散なら

$$
\operatorname{RMSE}
=
\frac{\sigma}{\sqrt N}.
$$

従って

$$
\varepsilon
\asymp
N^{-1/2}
$$

から

$$
\boxed{
N
\asymp
\varepsilon^{-2}
}
$$

です。

固定次元で仮定したディスクレパンシー評価が使え、かつ $V_{\mathrm{HK}}(f)$ が有限で適度なら、QMC の決定論的上界は $N^{-1}$ に近く、MC の $N^{-1/2}$ より速い形です。

4. しかし「常に QMC が優れる」とは言えません。

第一に、

$$
V_{\mathrm{HK}}(f)
$$

が非常に大きい、あるいは無限なら Koksma--Hlawka の上界は有効でありません。

第二に、$C_s$ や $(\log N)^s$ は次元に依存します。高次元では形式上の $N^{-1}$ だけを見ても実用的とは限りません。

第三に、MC の

$$
N^{-1/2}
$$

尺度は次元 $s$ を指数に直接含まない強みがあります。

さらに MC では確率的標準誤差を推定できる一方、決定論的 QMC では単一計算から同じ意味の標準誤差は得られません。

5. $s$ が固定なら

$$
(\log N)^s
$$

は $N$ の任意の正の冪より遅く増え、$N^{-1}$ に近い減衰と解釈できます。

しかし $s$ 自体が大きくなると、

$$
(\log N)^s
$$

と次元依存定数 $C_s$ が急に重くなり得ます。

従って

$$
\boxed{
\text{固定次元での漸近次数}
}
$$

と

$$
\boxed{
\text{高次元での実用効率}
}
$$

は分けて考える必要があります。
<!-- solution-end -->

---

## 11. まとめ

本章では、準 Monte Carlo 法の最初の骨格を作りました。

点集合

$$
P_N
=
\{
\boldsymbol x_1,\ldots,\boldsymbol x_N
\}
$$

に対し、アンカー付き直方体で

$$
\Delta_N(\boldsymbol t)
=
\frac1N
\sum_{n=1}^N
\boldsymbol1_{[0,\boldsymbol t)}
(\boldsymbol x_n)
-
\prod_{j=1}^st_j
$$

を定め、その最悪値

$$
D_N^\ast
=
\sup_{\boldsymbol t}
|\Delta_N(\boldsymbol t)|
$$

をスター・ディスクレパンシーとしました。

さらに

$$
\boxed{
\text{点列が一様分布}
\iff
D_N^\ast\to0
}
$$

を、包除原理と有限格子近似から証明しました。

関数側では Vitali 変動を各座標面へ足した Hardy--Krause 変動を導入し、滑らかな関数について Hlawka--Zaremba 恒等式

$$
Q_N(f)-I(f)
=
\sum_{\emptyset\ne u\subseteq S}
(-1)^{|u|}
\int
\Delta_N
\,
\partial^u f
$$

を微積分の基本定理から導きました。

そこから [Koksma--Hlawka の不等式](#thm-qmc1-koksma-hlawka)

$$
\boxed{
|Q_N(f)-I(f)|
\le
V_{\mathrm{HK}}(f)
D_N^\ast(P_N)
}
$$

を得ました。

覚えるべき分解は

$$
\boxed{
\text{積分誤差}
\le
\text{関数側の変動}
\times
\text{点集合側の偏り}
}
$$

です。

QMC2 では、この「関数クラスに対する最悪誤差」という考え方を RKHS へ移し、再生核・最悪誤差・重み付き空間から高次元 QMC の設計原理へ進みます。
