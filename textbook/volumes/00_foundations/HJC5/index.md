# HJC5 確率制御・二階 Hamilton--Jacobi--Bellman 方程式

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[ブラウン SDE](../STO9/index.md#def-sto9-sde)、[時間依存 Itô 公式](../STO7/index.md#thm-sto7-ito-process-formula)、[Itô 拡散の生成作用素](../STO11/index.md#prop-sto11-diffusion-generator)、[Feynman--Kac 検証公式](../STO11/index.md#thm-sto11-feynman-kac) を再利用します。

HJC1--HJC3 では、状態が

$$
\dot x=f(x,u)
$$

に従う決定論的最適制御から dynamic programming と HJB を作りました。

ここで状態へランダムな揺らぎを加えます。

$$
dX_s
=
b(X_s,u_s)\,ds
+
\sigma(X_s,u_s)\,dW_s.
$$

最初に見るべき違いは「期待値を取るようになる」ことだけではありません。

ブラウン増分は典型的に

$$
\Delta W
\sim
\sqrt{\Delta t}
$$

の大きさなので、その二乗

$$
(\Delta W)^2
\sim
\Delta t
$$

が一次の時間スケールで残ります。

したがって短時間 DPP へ Taylor 展開を入れると、決定論的 HJB にあった

$$
b\cdot\nabla V
$$

だけでなく

$$
\frac12
\operatorname{tr}
\left(
\sigma\sigma^\top D^2V
\right)
$$

が残ります。

本章の中心線は

$$
\boxed{
\text{controlled diffusion}
\to
\text{stochastic DPP}
\to
\text{Itô formula}
\to
\text{controlled generator}
\to
\text{二階 HJB}
\to
\text{verification / viscosity}
}
$$

です。

「確率制御だから二階 HJB」と暗記するのではなく、**どの計算で二階項が生き残るか**を紙上で追えることを目標にします。

---

## 1. 立っている舞台と standing assumptions

有限時間区間

$$
0\le t\le T
$$

を固定します。

状態空間は $\mathbb R^d$、ブラウン運動は $\mathbb R^m$ 値とします。

制御集合 $U$ はコンパクト距離空間とし、

$$
b:\mathbb R^d\times U\to\mathbb R^d,
\qquad
\sigma:\mathbb R^d\times U\to\mathbb R^{d\times m}
$$

を連続とします。

さらにある定数 $K>0$ があり、全ての $x,y\in\mathbb R^d$ と $u\in U$ に対し

$$
|b(x,u)-b(y,u)|
+
\|\sigma(x,u)-\sigma(y,u)\|_{\mathrm F}
\le
K|x-y|,
$$

$$
|b(x,u)|
+
\|\sigma(x,u)\|_{\mathrm F}
\le
K(1+|x|)
$$

を仮定します。

running cost

$$
L:\mathbb R^d\times U\to\mathbb R
$$

と terminal cost

$$
g:\mathbb R^d\to\mathbb R
$$

は bounded continuous とし、必要な正則性を使う節では一様 Lipschitz も仮定します。

この仮定の役割を分けると、

- $b,\sigma$ の一様 Lipschitz 性は、制御を固定した SDE の強解と安定性を与える。
- 線形成長は有限時間でのモーメント評価を与える。
- $U$ のコンパクト性は局所最適化の infimum を扱いやすくする。
- cost の連続性は DPP の貼り合わせ誤差を小さくする。

という対応です。

---

## 2. 制御は未来の Brown 運動を見てはいけない

決定論的制御では可測関数 $u_s$ を選べばよかったのに対し、確率制御では $u_s$ 自体がランダムでよい一方、未来の雑音を先取りしてはいけません。

<a id="def-hjc5-stochastic-admissible-control"></a>

<!-- formal-statement-start -->
### 定義（確率的許容制御）

フィルトレーション $(\mathcal F_s)_{s\ge0}$ を固定する。

$U$-値過程

$$
u=(u_s)_{s\in[t,T]}
$$

が progressively measurable であるとき、$u$ を時刻 $t$ からの確率的許容制御という。
<!-- formal-statement-end -->

progressively measurable という条件により、各時刻 $s$ の制御は $s$ までに観測された情報だけから決まります。

<!-- definition-example-start: def-hjc5-stochastic-admissible-control -->
### 直接例：現在の状態だけを見る feedback

ある Borel 関数

$$
\mu:[0,T]\times\mathbb R^d\to U
$$

に対して

$$
u_s=\mu(s,X_s)
$$

と置きます。

$X$ が適合 continuous なら $(s,\omega)\mapsto X_s(\omega)$ は progressive であり、Borel 関数との合成

$$
(s,\omega)\mapsto\mu(s,X_s(\omega))
$$

も progressive です。

従って状態 feedback は許容制御になります。

一方、

$$
u_s=\mu(W_T)
$$

のように時刻 $T$ の Brown 運動を時刻 $s<T$ で使う規則は一般には許容されません。未来の雑音を先取りするからです。
<!-- definition-example-end -->

---

## 3. controlled diffusion：制御を固定するごとに SDE が一つ決まる

<a id="def-hjc5-controlled-diffusion"></a>

<!-- formal-statement-start -->
### 定義（controlled diffusion）

時刻 $(t,x)$ と確率的許容制御 $u$ を固定する。

過程 $X^{t,x;u}$ が

$$
X_s
=
x
+
\int_t^s
b(X_r,u_r)\,dr
+
\int_t^s
\sigma(X_r,u_r)\,dW_r,
\qquad
t\le s\le T
$$

を満たす強解であるとき、$X^{t,x;u}$ をこの制御問題の controlled diffusion という。
<!-- formal-statement-end -->

standing assumptions の下では、各 admissible control を固定すれば [ブラウン SDE](../STO9/index.md#def-sto9-sde) の存在一意性議論を使えます。

制御は係数へ入っていますが、$u$ を一つ固定した後は

$$
b_s(x)=b(x,u_s),
\qquad
\sigma_s(x)=\sigma(x,u_s)
$$

というランダム時間依存係数を持つ SDE と読めます。

<!-- definition-example-start: def-hjc5-controlled-diffusion -->
### 直接例：ドリフトを操作する一次元系

$$
dX_s=u_s\,ds+\sigma\,dW_s,
\qquad
U=[-1,1],
\qquad
\sigma>0
$$

を考えます。

定数制御

$$
u_s\equiv a,
\qquad
|a|\le1
$$

なら

$$
X_s
=
x+a(s-t)+\sigma(W_s-W_t).
$$

したがって

$$
E[X_s]=x+a(s-t),
$$

$$
\operatorname{Var}(X_s)=\sigma^2(s-t).
$$

制御 $a$ は平均の移動を変えますが、ここでは分散は変えません。

決定論的制御

$$
\dot x=u
$$

へ Brown noise を足すと、「狙った平均軌道」と「避けられない分散」を同時に扱う必要が生じます。
<!-- definition-example-end -->

---

## 4. cost は標本路ごとでなく期待値で比較する

ランダムな状態では一つの control を入れても payoff は確率変数になります。

そこで最小化する量を期待値へ移します。

<a id="def-hjc5-stochastic-value"></a>

<!-- formal-statement-start -->
### 定義（stochastic cost functional と value function）

時刻 $(t,x)$ と許容制御 $u$ に対して

$$
J_{t,x}(u)
=
E\left[
g(X_T^{t,x;u})
+
\int_t^T
L(X_s^{t,x;u},u_s)\,ds
\right]
$$

と定める。

value function を

$$
V(t,x)
=
\inf_u
J_{t,x}(u)
$$

と定める。
<!-- formal-statement-end -->

ここでは risk-neutral な期待損失最小化だけを扱います。

分散ペナルティ、指数型効用、risk-sensitive control は別の問題です。

<!-- definition-example-start: def-hjc5-stochastic-value -->
### 直接例：制御なし Brown 運動の二乗 terminal cost

$$
dX_s=\sigma\,dW_s,
\qquad
X_t=x,
\qquad
L\equiv0,
\qquad
g(x)=x^2
$$

とします。

制御は一つしかないので

$$
V(t,x)
=
E[X_T^2].
$$

$$
X_T=x+\sigma(W_T-W_t)
$$

だから

$$
E[X_T^2]
=
x^2
+
2x\sigma E[W_T-W_t]
+
\sigma^2E[(W_T-W_t)^2].
$$

Brown 増分の平均は 0、分散は $T-t$ なので

$$
\boxed{
V(t,x)
=
x^2+\sigma^2(T-t)
}.
$$

確率性があるため、terminal cost の単純な $x^2$ へ

$$
\sigma^2(T-t)
$$

という将来分散の寄与が加わりました。
<!-- definition-example-end -->

---

## 5. stochastic DPP：ランダムな到達状態で continuation する

決定論的 DPP では、時刻 $t+h$ の到達状態は control から決まる一点でした。

確率制御では

$$
X_{t+h}^{t,x;u}
$$

自体がランダムです。

したがって continuation value は

$$
V(t+h,X_{t+h})
$$

という確率変数になり、その期待値を取る必要があります。

<a id="thm-hjc5-stochastic-dpp"></a>

<!-- formal-statement-start -->
### 定理（stochastic dynamic programming principle）

standing assumptions の下で、任意の $0<h\le T-t$ に対して

$$
\boxed{
V(t,x)
=
\inf_u
E\left[
\int_t^{t+h}
L(X_s^{t,x;u},u_s)\,ds
+
V(t+h,X_{t+h}^{t,x;u})
\right].
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

論理は決定論的 DPP と同じ二方向ですが、貼り合わせる場所がランダムです。

1. 任意の global control を $[t,t+h]$ と $[t+h,T]$ に制限する。
2. 条件付き期待値で $t+h$ 以後の cost を見る。
3. 後半 cost は到達状態からの value 以上なので、一方向の不等式を得る。
4. 逆向きでは、時刻 $t+h$ の到達可能領域を有限 net で近似し、各 net 点に対する $\varepsilon$-optimal control を選ぶ。
5. 実際の $X_{t+h}$ が入った cell に応じて continuation control を選び、SDE 安定性と cost の Lipschitz 性で誤差を抑える。

<!-- proof-start -->
### 証明

右辺を

$$
R_h(t,x)
=
\inf_u
E\left[
\int_t^{t+h}L(X_s,u_s)\,ds
+
V(t+h,X_{t+h})
\right]
$$

と書きます。

#### Step 1：$V\ge R_h$

任意の admissible control $u$ を $[t,T]$ 上で固定します。

時刻 $t+h$ までの sigma-field $\mathcal F_{t+h}$ で条件付けます。

後半の cost を

$$
C_{t+h}
=
E\left[
g(X_T)
+
\int_{t+h}^T
L(X_s,u_s)\,ds
\middle|
\mathcal F_{t+h}
\right]
$$

とします。

時刻 $t+h$ で状態 $X_{t+h}$ が分かった後も、同じ control の後半部分は admissible な continuation の一つです。

したがって

$$
C_{t+h}
\ge
V(t+h,X_{t+h})
\qquad
\text{a.s.}
$$

です。

tower property を使うと

$$
\begin{aligned}
J_{t,x}(u)
&=
E\left[
\int_t^{t+h}L(X_s,u_s)\,ds
+
C_{t+h}
\right]\\
&\ge
E\left[
\int_t^{t+h}L(X_s,u_s)\,ds
+
V(t+h,X_{t+h})
\right].
\end{aligned}
$$

任意の $u$ について成り立つので infimum を取れば

$$
V(t,x)\ge R_h(t,x).
$$

#### Step 2：$V\le R_h$

最初の区間 $[t,t+h]$ で使う control $u^0$ を固定します。

線形成長と有限時間モーメント評価により、任意の $\eta>0$ に対して十分大きい $R$ を取れば

$$
P(|X_{t+h}|>R)<\eta
$$

とできます。

閉球

$$
\overline B(0,R)
$$

を有限個の Borel cells

$$
A_1,\ldots,A_N
$$

に分け、各 cell の代表点を $x_i$ として直径を $\delta$ 以下にします。

各 $x_i$ について

$$
J_{t+h,x_i}(u^i)
\le
V(t+h,x_i)+\varepsilon
$$

を満たす continuation control $u^i$ を選びます。

時刻 $t+h$ で実際の到達点が $A_i$ に入ったら $u^i$ を使うよう control を concatenation します。

SDE の初期値安定性から、同じ continuation control を $x_i$ と実到達点 $y$ から走らせた軌道は

$$
E\left[
\sup_{t+h\le s\le T}
|X_s^y-X_s^{x_i}|^2
\right]
\le
C|y-x_i|^2
\le
C\delta^2.
$$

cost の Lipschitz 性により

$$
|J_{t+h,y}(u^i)-J_{t+h,x_i}(u^i)|
\le
C'\delta.
$$

したがって ball 内では

$$
J_{t+h,y}(u^i)
\le
V(t+h,y)
+
\varepsilon
+
C''\delta.
$$

ball 外の事象は bounded cost と確率 $\eta$ によって $O(\eta)$ の誤差です。

よって concatenated control 全体について

$$
J_{t,x}(u)
\le
E\left[
\int_t^{t+h}L(X_s,u_s^0)\,ds
+
V(t+h,X_{t+h})
\right]
+
\varepsilon
+
C''\delta
+
C'''\eta.
$$

最初の control $u^0$ について infimum を取り、その後

$$
\varepsilon\downarrow0,
\qquad
\delta\downarrow0,
\qquad
\eta\downarrow0
$$

とすれば

$$
V(t,x)\le R_h(t,x).
$$

二方向を合わせて DPP が得られます。
<!-- proof-end -->

ここで stochastic らしい部分は、単なる期待値記号ではなく

$$
\boxed{
\text{ランダム到達状態}
+
\text{条件付き期待値}
+
\text{状態ごとの continuation}
}
$$

です。

---

## 6. Itô 公式が二階項を作る

DPP を PDE へ変えるには短時間の

$$
E[\phi(t+h,X_{t+h})-\phi(t,x)]
$$

を計算する必要があります。

$\phi\in C^{1,2}$ とし、制御を短時間だけ定数 $a\in U$ に固定します。

[時間依存 Itô 公式](../STO7/index.md#thm-sto7-ito-process-formula) へ

$$
dX_s
=
b(X_s,a)\,ds
+
\sigma(X_s,a)\,dW_s
$$

を代入します。

すると

$$
\begin{aligned}
d\phi(s,X_s)
&=
\phi_t(s,X_s)\,ds\\
&\quad+
\nabla\phi(s,X_s)^\top b(X_s,a)\,ds\\
&\quad+
\nabla\phi(s,X_s)^\top\sigma(X_s,a)\,dW_s\\
&\quad+
\frac12
\operatorname{tr}
\left(
\sigma\sigma^\top(X_s,a)D^2\phi(s,X_s)
\right)ds.
\end{aligned}
$$

最後の項が決定論的連鎖律にはありません。

なぜなら Brown 運動では

$$
d[W^i,W^j]_s
=
\delta_{ij}\,ds
$$

が残るからです。

確率積分項の期待値は 0 なので、

$$
\frac1h
E[
\phi(t+h,X_{t+h})-\phi(t,x)
]
$$

の $h\downarrow0$ 極限には

$$
\phi_t
+
b\cdot\nabla\phi
+
\frac12
\operatorname{tr}
(\sigma\sigma^\top D^2\phi)
$$

が現れます。

---

## 7. controlled generator は control ごとの局所平均変化率

<a id="def-hjc5-controlled-generator"></a>

<!-- formal-statement-start -->
### 定義（controlled generator）

制御値 $a\in U$ を固定する。

滑らかな関数 $\phi$ に対し

$$
\mathcal L^a\phi(x)
=
b(x,a)\cdot\nabla\phi(x)
+
\frac12
\operatorname{tr}
\left(
A(x,a)D^2\phi(x)
\right),
$$

ただし

$$
A(x,a)
=
\sigma(x,a)\sigma(x,a)^\top
$$

と定める。

$\mathcal L^a$ を control $a$ に対応する controlled generator という。
<!-- formal-statement-end -->

[Itô 拡散の生成作用素](../STO11/index.md#prop-sto11-diffusion-generator)を control 値ごとに並べたものです。

<!-- definition-example-start: def-hjc5-controlled-generator -->
### 直接例：drift control と constant volatility

一次元で

$$
dX_s=u_s\,ds+\sigma\,dW_s
$$

とします。

control 値 $a$ を固定すると

$$
b(x,a)=a,
\qquad
A(x,a)=\sigma^2.
$$

従って

$$
\boxed{
\mathcal L^a\phi
=
a\phi_x
+
\frac{\sigma^2}{2}\phi_{xx}
}.
$$

一階項は control に依存し、二階項は noise strength $\sigma$ に依存します。

もし $\sigma=0$ なら

$$
\mathcal L^a\phi=a\phi_x
$$

となり、決定論的 generator へ戻ります。
<!-- definition-example-end -->

---

## 8. stochastic DPP から二階 HJB を導く

短時間 $[t,t+h]$ で control を定数 $a$ に固定します。

DPP から

$$
V(t,x)
\le
E\left[
\int_t^{t+h}
L(X_s,a)\,ds
+
V(t+h,X_{t+h})
\right].
$$

ここではまず $V\in C^{1,2}$ と仮定して形式計算します。

両辺から $V(t,x)$ を引き、Itô 公式を入れると

$$
0
\le
E\left[
\int_t^{t+h}
\left(
L(X_s,a)
+
V_t(s,X_s)
+
\mathcal L^aV(s,X_s)
\right)ds
\right].
$$

$h$ で割って $h\downarrow0$ とすると

$$
0
\le
L(x,a)
+
V_t(t,x)
+
\mathcal L^aV(t,x).
$$

これは全ての $a\in U$ で成り立つので

$$
0
\le
V_t(t,x)
+
\inf_{a\in U}
\left\{
L(x,a)+\mathcal L^aV(t,x)
\right\}.
$$

逆向きは短時間の $\varepsilon$-optimal control を使って同じ展開を行い、

$$
0
\ge
V_t(t,x)
+
\inf_{a\in U}
\left\{
L(x,a)+\mathcal L^aV(t,x)
\right\}
$$

を得ます。

従って equality です。

<a id="def-hjc5-second-order-hjb"></a>

<!-- formal-statement-start -->
### 定義（二階 Hamilton--Jacobi--Bellman 方程式）

controlled diffusion の value function に対応する終端値問題

$$
\boxed{
V_t(t,x)
+
\inf_{a\in U}
\left\{
L(x,a)
+
b(x,a)\cdot\nabla V(t,x)
+
\frac12
\operatorname{tr}
\left(
A(x,a)D^2V(t,x)
\right)
\right\}
=
0
}
$$

$$
V(T,x)=g(x),
$$

ただし

$$
A(x,a)=\sigma(x,a)\sigma(x,a)^\top
$$

とする。

この PDE を二階 Hamilton--Jacobi--Bellman 方程式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc5-second-order-hjb -->
### 直接例：Brown 運動の二乗 terminal cost

§4 の

$$
dX_s=\sigma\,dW_s,
\qquad
g(x)=x^2
$$

では control が一つしかなく、

$$
V(t,x)=x^2+\sigma^2(T-t).
$$

微分すると

$$
V_t=-\sigma^2,
\qquad
V_x=2x,
\qquad
V_{xx}=2.
$$

HJB は線形化して

$$
V_t+\frac{\sigma^2}{2}V_{xx}=0.
$$

代入すると

$$
-\sigma^2
+
\frac{\sigma^2}{2}\cdot2
=
0.
$$

terminal condition も

$$
V(T,x)=x^2
$$

です。

ここでは noise が

$$
\frac{\sigma^2}{2}V_{xx}
$$

として PDE に現れ、その積分結果が value function の

$$
\sigma^2(T-t)
$$

になっています。
<!-- definition-example-end -->

---

## 9. Feynman--Kac と HJB：線形から非線形へ

control が一つしかないなら infimum は消えます。

PDE は

$$
V_t
+
L(x)
+
\mathcal LV
=
0,
\qquad
V(T,x)=g(x)
$$

という線形後退方程式です。

これは [Feynman--Kac 検証公式](../STO11/index.md#thm-sto11-feynman-kac) の $V\equiv0$ の場合と同じ構造です。

一方、複数の controls があると

$$
\inf_{a\in U}
\left\{
L(x,a)+\mathcal L^aV
\right\}
$$

を取ります。

各 $\mathcal L^a$ 自体は $V$ に対して線形でも、infimum を取った作用素は一般に線形ではありません。

たとえば二つの control modes $a_1,a_2$ だけでも

$$
F(V)
=
\min
\{
L_1+\mathcal L^{a_1}V,
L_2+\mathcal L^{a_2}V
\}
$$

です。

一般に

$$
F(V_1+V_2)
\ne
F(V_1)+F(V_2).
$$

従って

$$
\boxed{
\text{Feynman--Kac}
=
\text{一つの線形 generator}
}
$$

に対し

$$
\boxed{
\text{HJB}
=
\text{generator の族を状態ごとに最適化}
}
$$

という違いがあります。

---

## 10. smooth verification theorem：PDE 候補から最適制御を証明する

HJB を導出しただけでは、「PDE の解候補が本当に value function か」はまだ分かりません。

verification theorem は逆向きへ進みます。

<a id="thm-hjc5-smooth-verification"></a>

<!-- formal-statement-start -->
### 定理（stochastic smooth verification theorem）

$w\in C^{1,2}([0,T)\times\mathbb R^d)\cap C([0,T]\times\mathbb R^d)$ が

$$
w_t
+
\inf_{a\in U}
\{
L(x,a)+\mathcal L^aw
\}
=
0,
$$

$$
w(T,x)=g(x)
$$

を満たすとする。

さらに全ての admissible control について Itô 公式の局所マルチンゲール項を期待値 0 として扱える十分な可積分性を仮定する。

このとき

$$
w(t,x)\le J_{t,x}(u)
$$

が全ての admissible control $u$ について成り立つ。

さらに Borel feedback $a^*(t,x)$ が各点で

$$
L(x,a^*)
+
\mathcal L^{a^*}w(t,x)
=
\inf_{a\in U}
\{
L(x,a)+\mathcal L^aw(t,x)
\}
$$

を実現し、closed-loop SDE

$$
dX_s
=
b(X_s,a^*(s,X_s))\,ds
+
\sigma(X_s,a^*(s,X_s))\,dW_s
$$

が admissible な強解を持つなら

$$
w(t,x)
=
V(t,x)
=
J_{t,x}(u^*),
$$

ただし

$$
u_s^*=a^*(s,X_s)
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の control $u$ に対し HJB の infimum 定義から

$$
w_t+L(x,u)+\mathcal L^uw
\ge0.
$$

Itô 公式で $w(s,X_s)$ を動かし、期待値を取ると

$$
J(u)-w(t,x)
=
E\int_t^T
\{
w_t+L+\mathcal L^uw
\}\,ds
\ge0
$$

となります。

minimizer feedback を入れると integrand が 0 になり equality です。

<!-- proof-start -->
### 証明

任意の admissible control $u$ と対応する controlled diffusion $X$ を取ります。

HJB から各 $(s,X_s)$ で

$$
w_t(s,X_s)
+
L(X_s,u_s)
+
\mathcal L^{u_s}w(s,X_s)
\ge0.
$$

[時間依存 Itô 公式](../STO7/index.md#thm-sto7-ito-process-formula) を $w(s,X_s)$ へ適用すると

$$
\begin{aligned}
w(T,X_T)-w(t,x)
&=
\int_t^T
\left(
w_t+\mathcal L^{u_s}w
\right)(s,X_s)\,ds\\
&\quad+
\int_t^T
\nabla w(s,X_s)^\top
\sigma(X_s,u_s)\,dW_s.
\end{aligned}
$$

terminal condition $w(T,X_T)=g(X_T)$ を入れ、両辺へ running cost を足します。

$$
\begin{aligned}
g(X_T)
+
\int_t^T L(X_s,u_s)\,ds
-
w(t,x)
&=
\int_t^T
\left(
w_t
+
L(X_s,u_s)
+
\mathcal L^{u_s}w
\right)(s,X_s)\,ds\\
&\quad+
\int_t^T
\nabla w^\top\sigma\,dW_s.
\end{aligned}
$$

仮定した可積分性により最後の確率積分の期待値は 0 です。

従って

$$
J_{t,x}(u)-w(t,x)
=
E\int_t^T
\left(
w_t
+
L(X_s,u_s)
+
\mathcal L^{u_s}w
\right)ds
\ge0.
$$

よって全ての $u$ に対し

$$
w(t,x)\le J_{t,x}(u).
$$

infimum を取れば

$$
w(t,x)\le V(t,x).
$$

次に minimizing feedback $u^*$ を使います。

仮定から各時刻で

$$
w_t
+
L(X_s,u_s^*)
+
\mathcal L^{u_s^*}w
=
0.
$$

したがって同じ恒等式の期待値を取ると

$$
J_{t,x}(u^*)-w(t,x)=0.
$$

よって

$$
V(t,x)
\le
J_{t,x}(u^*)
=
w(t,x)
\le
V(t,x).
$$

従って

$$
w(t,x)=V(t,x)=J_{t,x}(u^*).
$$
<!-- proof-end -->

ここでも

$$
\text{value の特徴付け}
$$

と

$$
\text{minimizer feedback の存在}
$$

は別問題です。

HJB が value を特徴付けても、infimum を実現する selector や closed-loop SDE の well-posedness は追加確認が必要です。

---

## 11. 線形 Gaussian 制御を最後まで解く

一次元で

$$
dX_s=u_s\,ds+\sigma\,dW_s
$$

を考えます。

cost は

$$
J_{t,x}(u)
=
E\left[
\frac q2X_T^2
+
\int_t^T
\frac r2u_s^2\,ds
\right],
$$

ただし

$$
q>0,
\qquad
r>0,
\qquad
\sigma\ge0
$$

とします。

HJB は

$$
V_t
+
\inf_{u\in\mathbb R}
\left\{
\frac r2u^2
+
uV_x
+
\frac{\sigma^2}{2}V_{xx}
\right\}
=
0,
$$

$$
V(T,x)=\frac q2x^2.
$$

quadratic ansatz

$$
V(t,x)
=
\frac12P(t)x^2+c(t)
$$

を入れます。

すると

$$
V_x=P(t)x,
\qquad
V_{xx}=P(t).
$$

$u$ に関する部分は

$$
\frac r2u^2+P(t)xu.
$$

平方完成すると

$$
\frac r2
\left(
u+\frac{P(t)}r x
\right)^2
-
\frac{P(t)^2}{2r}x^2.
$$

従って minimizer は

$$
\boxed{
u^*(t,x)
=
-\frac{P(t)}r x
}
$$

で、最小値は

$$
-\frac{P(t)^2}{2r}x^2.
$$

HJB へ戻すと

$$
\frac12P'(t)x^2
+
c'(t)
-
\frac{P(t)^2}{2r}x^2
+
\frac{\sigma^2}{2}P(t)
=
0.
$$

$x^2$ の係数と定数項を分けて

$$
P'(t)
=
\frac{P(t)^2}{r},
\qquad
P(T)=q,
$$

$$
c'(t)
=
-\frac{\sigma^2}{2}P(t),
\qquad
c(T)=0
$$

を得ます。

Riccati 方程式は

$$
\frac{d}{dt}\frac1{P(t)}
=
-\frac1r
$$

なので

$$
\frac1{P(t)}
=
\frac1q
+
\frac{T-t}{r}.
$$

従って

$$
\boxed{
P(t)
=
\frac{qr}{r+q(T-t)}
}.
$$

また

$$
c(t)
=
\frac{\sigma^2}{2}
\int_t^T
P(s)\,ds.
$$

積分すると

$$
\boxed{
c(t)
=
\frac{\sigma^2r}{2}
\log
\left(
1+\frac q r(T-t)
\right)
}.
$$

よって

$$
\boxed{
V(t,x)
=
\frac12
\frac{qr}{r+q(T-t)}
x^2
+
\frac{\sigma^2r}{2}
\log
\left(
1+\frac q r(T-t)
\right)
}.
$$

noise $\sigma$ は optimal feedback

$$
u^*
=
-\frac{P(t)}rX_t
$$

の gain 自体には現れません。

しかし value には

$$
c(t)
$$

として追加 cost を生みます。

これはこの特別な線形・二次・加法 noise の構造によるもので、一般の stochastic control で noise が最適方策へ影響しないという意味ではありません。

---

## 12. 滑らかでない value function には二階 viscosity solution を使う

確率制御でも value function が $C^{1,2}$ になるとは限りません。

control switching、非滑らかな terminal cost、degenerate diffusion では classical derivative が壊れます。

そこで HJC2--HJC3 と同じ接触 test function の発想を二階 PDE へ拡張します。

Hamiltonian 型作用素を

$$
F(x,p,X)
=
\inf_{a\in U}
\left\{
L(x,a)
+
b(x,a)\cdot p
+
\frac12
\operatorname{tr}(A(x,a)X)
\right\}
$$

と書きます。

PDE は

$$
V_t+F(x,\nabla V,D^2V)=0.
$$

<a id="def-hjc5-second-order-viscosity"></a>

<!-- formal-statement-start -->
### 定義（二階 HJB の viscosity solution）

continuous function $v:[0,T]\times\mathbb R^d\to\mathbb R$ を考える。

$v$ が viscosity subsolution であるとは、$\phi\in C^{1,2}$ が $(t_0,x_0)$ で $v$ に上から接し、

$$
(v-\phi)(t_0,x_0)=0
$$

かつその近傍で

$$
v-\phi\le0
$$

を満たすたびに

$$
\phi_t(t_0,x_0)
+
F
\left(
x_0,
\nabla\phi(t_0,x_0),
D^2\phi(t_0,x_0)
\right)
\ge0
$$

が成り立つことをいう。

$v$ が viscosity supersolution であるとは、$\phi\in C^{1,2}$ が下から接するたびに

$$
\phi_t(t_0,x_0)
+
F
\left(
x_0,
\nabla\phi(t_0,x_0),
D^2\phi(t_0,x_0)
\right)
\le0
$$

が成り立つことをいう。

両方を満たし、さらに

$$
v(T,x)=g(x)
$$

を満たすとき、$v$ を二階 HJB の viscosity solution という。
<!-- formal-statement-end -->

終端値問題を後ろ向きに読むため、本系列では HJC3 と同じ符号規約を使っています。

上接触で

$$
\phi_t+F\ge0
$$

となる点に注意してください。

<!-- definition-example-start: def-hjc5-second-order-viscosity -->
### 直接例：滑らかな Brown value は viscosity 条件も満たす

$$
v(t,x)
=
x^2+\sigma^2(T-t)
$$

を考えます。

$v$ 自身が $C^{1,2}$ で classical PDE

$$
v_t+\frac{\sigma^2}{2}v_{xx}=0
$$

を満たします。

上から接する $\phi$ では接触点で

$$
\nabla\phi=\nabla v,
$$

さらに

$$
D^2\phi-D^2v
$$

は半正定値です。

従って

$$
\frac{\sigma^2}{2}\phi_{xx}
\ge
\frac{\sigma^2}{2}v_{xx}.
$$

また時間方向の一階微分は接触点で一致するので

$$
\phi_t+\frac{\sigma^2}{2}\phi_{xx}
\ge
v_t+\frac{\sigma^2}{2}v_{xx}
=
0.
$$

下接触では Hessian の不等号が逆になり、supersolution 条件が得られます。

classical solution が viscosity solution と整合することを、二階項まで直接確認できました。
<!-- definition-example-end -->

---

## 13. DPP から value function の viscosity solution 性を導く

<a id="thm-hjc5-value-viscosity"></a>

<!-- formal-statement-start -->
### 定理（value function の二階 HJB 粘性解特徴付け）

standing assumptions に加え、$L,g$ を bounded uniformly continuous とし、value function $V$ が continuous であるとする。

このとき $V$ は

$$
V_t
+
\inf_{a\in U}
\left\{
L(x,a)
+
b(x,a)\cdot\nabla V
+
\frac12
\operatorname{tr}
(A(x,a)D^2V)
\right\}
=
0,
$$

$$
V(T,x)=g(x)
$$

の viscosity solution である。
<!-- formal-statement-end -->

### 上接触側の核心

$\phi\in C^{1,2}$ が $V$ に上から接し、

$$
V(t_0,x_0)=\phi(t_0,x_0)
$$

とします。

短時間だけ任意の定数 control $a$ を使います。

DPP と $V\le\phi$ から

$$
0
\le
E\left[
\int_{t_0}^{t_0+h}
L(X_s,a)\,ds
+
\phi(t_0+h,X_{t_0+h})
-
\phi(t_0,x_0)
\right].
$$

Itô 公式を入れると

$$
0
\le
E\int_{t_0}^{t_0+h}
\left[
L(X_s,a)
+
\phi_t(s,X_s)
+
\mathcal L^a\phi(s,X_s)
\right]ds.
$$

$h$ で割り、$h\downarrow0$ とすると

$$
0
\le
L(x_0,a)
+
\phi_t(t_0,x_0)
+
\mathcal L^a\phi(t_0,x_0).
$$

任意の $a$ について成り立つので

$$
\phi_t(t_0,x_0)
+
\inf_a
\{
L+\mathcal L^a\phi
\}
\ge0.
$$

これが subsolution 条件です。

### 下接触側の核心

$\phi$ が $V$ に下から接するとします。

DPP の infimum に対し、短時間区間で $h\varepsilon$-optimal な control $u^h$ を取ります。

すると

$$
0
\ge
E\left[
\int_{t_0}^{t_0+h}
L(X_s,u_s^h)\,ds
+
\phi(t_0+h,X_{t_0+h})
-
\phi(t_0,x_0)
\right]
-
h\varepsilon.
$$

Itô 公式より

$$
0
\ge
E\int_{t_0}^{t_0+h}
\left[
L(X_s,u_s^h)
+
\phi_t(s,X_s)
+
\mathcal L^{u_s^h}\phi(s,X_s)
\right]ds
-
h\varepsilon.
$$

各 $s$ で

$$
\inf_a
\{
L(X_s,a)
+
\phi_t(s,X_s)
+
\mathcal L^a\phi(s,X_s)
\}
$$

は integrand 以下です。

従って

$$
0
\ge
E\int_{t_0}^{t_0+h}
\inf_a
\{
L(X_s,a)
+
\phi_t(s,X_s)
+
\mathcal L^a\phi(s,X_s)
\}
ds
-
h\varepsilon.
$$

$h\downarrow0$ で $X_s\to x_0$、係数と $\phi$ の導関数の連続性を使えば

$$
0
\ge
\phi_t(t_0,x_0)
+
\inf_a
\{
L(x_0,a)
+
\mathcal L^a\phi(t_0,x_0)
\}
-
\varepsilon.
$$

最後に $\varepsilon\downarrow0$ として

$$
\phi_t
+
\inf_a\{L+\mathcal L^a\phi\}
\le0.
$$

これが supersolution 条件です。

<!-- proof-start -->
### 証明

上の二つの核心計算を局所接触へ厳密に適用するには、test function と value function の大小関係が分かる近傍から過程が出ないよう stopping を入れます。

接触点 $(t_0,x_0)$ の周りに cylinder

$$
Q_\rho
=
[t_0,t_0+\rho]\times
\overline B(x_0,\rho)
$$

を取り、exit time を

$$
\tau_\rho
=
\inf
\{
s\ge t_0:
(s,X_s)\notin Q_\rho
\}
\wedge
(t_0+h)
$$

とします。

DPP は stopping time 版でも

$$
V(t_0,x_0)
=
\inf_u
E\left[
\int_{t_0}^{\tau_\rho}
L(X_s,u_s)\,ds
+
V(\tau_\rho,X_{\tau_\rho})
\right]
$$

と読めます。

上接触では $V\le\phi$ が $Q_\rho$ 内で成り立つので、任意の定数 control $a$ に対して

$$
0
\le
E\left[
\int_{t_0}^{\tau_\rho}L(X_s,a)\,ds
+
\phi(\tau_\rho,X_{\tau_\rho})
-
\phi(t_0,x_0)
\right].
$$

停止した Itô 公式を使うと

$$
0
\le
E\int_{t_0}^{\tau_\rho}
\left(
L+\phi_t+\mathcal L^a\phi
\right)(s,X_s)\,ds.
$$

SDE の短時間モーメント評価から

$$
E\left[
\sup_{t_0\le s\le t_0+h}
|X_s-x_0|^2
\right]
\le
Ch
$$

なので、固定した $\rho$ に対し

$$
P(\tau_\rho<t_0+h)
\le
\frac{Ch}{\rho^2}.
$$

まず $h\downarrow0$ とすれば、停止による異常事象の寄与は消えます。

連続性から integrand は $(t_0,x_0)$ の値へ収束するので

$$
L(x_0,a)
+
\phi_t(t_0,x_0)
+
\mathcal L^a\phi(t_0,x_0)
\ge0.
$$

$a$ の infimum を取って subsolution 条件を得ます。

下接触では $h\varepsilon$-optimal control を取り、$V\ge\phi$ を同じ stopped DPP へ入れます。

得られる式は

$$
0
\ge
E\int_{t_0}^{\tau_\rho}
\left(
L+\phi_t+\mathcal L^{u_s^h}\phi
\right)(s,X_s)\,ds
-
h\varepsilon
+
o(h).
$$

control ごとの integrand は

$$
\phi_t(s,X_s)
+
\inf_a
\{
L(X_s,a)+\mathcal L^a\phi(s,X_s)
\}
$$

以上なので、

$$
0
\ge
E\int_{t_0}^{\tau_\rho}
\left[
\phi_t
+
\inf_a\{L+\mathcal L^a\phi\}
\right](s,X_s)\,ds
-
h\varepsilon
+
o(h).
$$

$h$ で割り $h\downarrow0$、その後 $\varepsilon\downarrow0$ とすると supersolution 条件が得られます。

terminal time では定義から

$$
V(T,x)=g(x).
$$

従って $V$ は二階 HJB の viscosity solution です。
<!-- proof-end -->

この定理で本章が閉じるのは **value function が二階 HJB をどの意味で満たすか** までです。

一般の二階 fully nonlinear PDE に対する comparison の完全理論は、Crandall--Ishii 型の行列評価を必要とします。本章ではそれを新しい暗黙前提にせず、HJB の生成と value の viscosity solution 性を正本化します。

---

## 14. degenerate parabolic とは「二階項が全方向に効く」とは限らないこと

$$
A(x,a)
=
\sigma(x,a)\sigma(x,a)^\top
$$

なので、任意の $\xi\in\mathbb R^d$ に対して

$$
\xi^\top A(x,a)\xi
=
|\sigma(x,a)^\top\xi|^2
\ge0.
$$

従って $A$ は常に半正定値です。

しかし正定値とは限りません。

たとえば $d=2,m=1$ で

$$
\sigma
=
\begin{pmatrix}
1\\
0
\end{pmatrix}
$$

なら

$$
A
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}.
$$

このとき

$$
\frac12
\operatorname{tr}(AD^2V)
=
\frac12V_{x_1x_1}
$$

であり、$x_2$ 方向の二階微分はありません。

それでも

$$
A\ge0
$$

なので、HJB は degenerate parabolic な構造を保ちます。

noise が全方向に入らないことと、PDE が一階方程式へ完全に戻ることは同じではありません。

---

# 演習

## Level A

### HJC5-A01 controlled generator を計算する
- Level: A

一次元 controlled diffusion

$$
dX_s
=
(\alpha X_s+\beta u_s)\,ds
+
\sigma\,dW_s
$$

を考える。

$u_s\equiv a$ を固定したときの generator $\mathcal L^a$ を求めよ。

<!-- solution-start -->
### 詳細解答

ドリフトは

$$
b(x,a)=\alpha x+\beta a,
$$

拡散係数は定数

$$
\sigma(x,a)=\sigma
$$

です。

一次元の controlled generator は

$$
\mathcal L^a\phi
=
b(x,a)\phi'(x)
+
\frac12\sigma(x,a)^2\phi''(x).
$$

代入して

$$
\boxed{
\mathcal L^a\phi(x)
=
(\alpha x+\beta a)\phi'(x)
+
\frac{\sigma^2}{2}\phi''(x)
}.
$$

ドリフト制御は一階項へ、Brown noise は二階項へ入ります。
<!-- solution-end -->

### HJC5-A02 Brown terminal square を PDE で確認する
- Level: A

$$
dX_s=\sigma\,dW_s,
\qquad
g(x)=x^2
$$

に対して

$$
V(t,x)=x^2+\sigma^2(T-t)
$$

が backward PDE と terminal condition を満たすことを確認せよ。

<!-- solution-start -->
### 詳細解答

微分すると

$$
V_t=-\sigma^2,
$$

$$
V_x=2x,
$$

$$
V_{xx}=2.
$$

この問題の generator は

$$
\mathcal L
=
\frac{\sigma^2}{2}\partial_{xx}.
$$

従って PDE 左辺は

$$
V_t+\mathcal LV
=
-\sigma^2
+
\frac{\sigma^2}{2}\cdot2
=
0.
$$

また

$$
V(T,x)
=
x^2+\sigma^2(T-T)
=
x^2
=
g(x).
$$

よって候補は PDE と terminal condition の両方を満たします。
<!-- solution-end -->

### HJC5-A03 短時間 DPP から二階項を読む
- Level: A

定数 control $a$ の下で

$$
dX_s=b(X_s,a)\,ds+\sigma(X_s,a)\,dW_s
$$

とする。

$\phi\in C^{1,2}$ に対し

$$
\frac1h
E[
\phi(t+h,X_{t+h})-\phi(t,x)
]
$$

の $h\downarrow0$ 極限を求めよ。

<!-- solution-start -->
### 詳細解答

時間依存 Itô 公式より

$$
\begin{aligned}
\phi(t+h,X_{t+h})-\phi(t,x)
&=
\int_t^{t+h}
\left[
\phi_t
+
b\cdot\nabla\phi
+
\frac12
\operatorname{tr}
(\sigma\sigma^\top D^2\phi)
\right](s,X_s)\,ds\\
&\quad+
\int_t^{t+h}
\nabla\phi(s,X_s)^\top
\sigma(X_s,a)\,dW_s.
\end{aligned}
$$

確率積分の期待値は 0 です。

従って

$$
\begin{aligned}
&\frac1h
E[
\phi(t+h,X_{t+h})-\phi(t,x)
]\\
&=
\frac1h
E\int_t^{t+h}
\left[
\phi_t
+
b\cdot\nabla\phi
+
\frac12
\operatorname{tr}
(\sigma\sigma^\top D^2\phi)
\right](s,X_s)\,ds.
\end{aligned}
$$

$X_s\to x$ と係数の連続性から

$$
\boxed{
\phi_t(t,x)
+
b(x,a)\cdot\nabla\phi(t,x)
+
\frac12
\operatorname{tr}
\left(
\sigma\sigma^\top(x,a)D^2\phi(t,x)
\right)
}.
$$
<!-- solution-end -->

### HJC5-A04 control が一つなら HJB は線形になる
- Level: A

$U=\{a_0\}$ とする。

二階 HJB が線形 PDE

$$
V_t+L(x,a_0)+\mathcal L^{a_0}V=0
$$

へ戻ることを説明せよ。

<!-- solution-start -->
### 詳細解答

HJB の非線形作用素は

$$
\inf_{a\in U}
\{
L(x,a)+\mathcal L^aV
\}
$$

です。

$U$ が一点集合

$$
U=\{a_0\}
$$

なら infimum を取る選択肢が一つしかありません。

従って

$$
\inf_{a\in U}
\{
L(x,a)+\mathcal L^aV
\}
=
L(x,a_0)+\mathcal L^{a_0}V.
$$

$\mathcal L^{a_0}$ は $V$ に対して線形作用素なので

$$
\boxed{
V_t+L(x,a_0)+\mathcal L^{a_0}V=0
}
$$

は線形 PDE です。

つまり HJB の非線形性は「確率性そのもの」ではなく、control ごとの線形 generator の中から最適なものを選ぶ操作から生じます。
<!-- solution-end -->

### HJC5-A05 rank-deficient noise の二階項
- Level: A

$d=2,m=1$ とし

$$
\sigma
=
\begin{pmatrix}
2\\
0
\end{pmatrix}.
$$

$A=\sigma\sigma^\top$ と

$$
\frac12\operatorname{tr}(AD^2\phi)
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
A
=
\begin{pmatrix}
2\\
0
\end{pmatrix}
\begin{pmatrix}
2&0
\end{pmatrix}
=
\begin{pmatrix}
4&0\\
0&0
\end{pmatrix}.
$$

Hessian を

$$
D^2\phi
=
\begin{pmatrix}
\phi_{11}&\phi_{12}\\
\phi_{21}&\phi_{22}
\end{pmatrix}
$$

とすると

$$
AD^2\phi
=
\begin{pmatrix}
4\phi_{11}&4\phi_{12}\\
0&0
\end{pmatrix}.
$$

従って trace は

$$
\operatorname{tr}(AD^2\phi)
=
4\phi_{11}.
$$

よって

$$
\boxed{
\frac12\operatorname{tr}(AD^2\phi)
=
2\phi_{11}
}.
$$

$x_2$ 方向には Brown noise がないため $\phi_{22}$ は現れません。
<!-- solution-end -->

## Level B

### HJC5-B01 線形 Gaussian control の Riccati 方程式
- Level: B

$$
dX_s=u_s\,ds+\sigma\,dW_s
$$

と

$$
J_{t,x}(u)
=
E\left[
\frac q2X_T^2
+
\int_t^T
\frac r2u_s^2\,ds
\right]
$$

を考える。

$$
V(t,x)=\frac12P(t)x^2+c(t)
$$

を仮定し、$P,c$ の ODE と最適 feedback を導け。

<!-- solution-start -->
### 詳細解答

HJB は

$$
V_t
+
\inf_u
\left\{
\frac r2u^2
+
uV_x
+
\frac{\sigma^2}{2}V_{xx}
\right\}
=
0.
$$

ansatz から

$$
V_t
=
\frac12P'x^2+c',
$$

$$
V_x=Px,
\qquad
V_{xx}=P.
$$

従って control に依存する部分は

$$
\frac r2u^2+P xu.
$$

平方完成すると

$$
\frac r2
\left(
u+\frac P r x
\right)^2
-
\frac{P^2}{2r}x^2.
$$

よって minimizer は

$$
\boxed{
u^*(t,x)
=
-\frac{P(t)}r x
}
$$

です。

最小値を HJB へ代入すると

$$
\frac12P'x^2
+
c'
-
\frac{P^2}{2r}x^2
+
\frac{\sigma^2}{2}P
=
0.
$$

$x^2$ と定数項を分けると

$$
\boxed{
P'=\frac{P^2}{r},
\qquad
P(T)=q
}
$$

と

$$
\boxed{
c'
=
-\frac{\sigma^2}{2}P,
\qquad
c(T)=0
}
$$

を得ます。
<!-- solution-end -->

### HJC5-B02 verification theorem を LQ 問題へ適用する
- Level: B

B01 の $P,c$ が ODE を満たすとする。

候補

$$
w(t,x)=\frac12P(t)x^2+c(t)
$$

に対し

$$
u^*(t,x)=-\frac{P(t)}r x
$$

が HJB の minimizer を実現することを確認し、verification theorem から optimality を説明せよ。

<!-- solution-start -->
### 詳細解答

control 部分は

$$
\frac r2u^2+u w_x
=
\frac r2u^2+P(t)xu.
$$

平方完成により

$$
\frac r2
\left(
u+\frac{P(t)}r x
\right)^2
-
\frac{P(t)^2}{2r}x^2.
$$

従って

$$
u^*(t,x)
=
-\frac{P(t)}r x
$$

で最小値を取ります。

B01 の ODE が成立するので、$w$ は HJB と terminal condition

$$
w(T,x)=\frac q2x^2
$$

を満たします。

closed-loop SDE は

$$
dX_s
=
-\frac{P(s)}rX_s\,ds
+
\sigma\,dW_s.
$$

$P$ は有限区間で有界なので drift は $x$ に大域 Lipschitz です。

従って強解は一意に存在します。

また線形 SDE の有限時間二乗モーメントは有限なので、Itô 公式の確率積分項は期待値 0 として扱えます。

verification theorem の仮定が満たされ、

$$
\boxed{
w(t,x)
=
V(t,x)
=
J_{t,x}(u^*)
}
$$

です。
<!-- solution-end -->

### HJC5-B03 上接触から viscosity subsolution 不等式を導く
- Level: B

$\phi\in C^{1,2}$ が $(t_0,x_0)$ で value function $V$ に上から接しているとする。

定数 control $a$ を短時間使う DPP から

$$
\phi_t(t_0,x_0)
+
L(x_0,a)
+
\mathcal L^a\phi(t_0,x_0)
\ge0
$$

を導け。

<!-- solution-start -->
### 詳細解答

上接触なので

$$
V(t_0,x_0)=\phi(t_0,x_0)
$$

であり、接触点近傍では

$$
V\le\phi.
$$

短時間だけ定数 control $a$ を使うと DPP から

$$
V(t_0,x_0)
\le
E\left[
\int_{t_0}^{t_0+h}
L(X_s,a)\,ds
+
V(t_0+h,X_{t_0+h})
\right].
$$

$V\le\phi$ を代入して

$$
0
\le
E\left[
\int_{t_0}^{t_0+h}
L(X_s,a)\,ds
+
\phi(t_0+h,X_{t_0+h})
-
\phi(t_0,x_0)
\right].
$$

Itô 公式により

$$
\begin{aligned}
&E[
\phi(t_0+h,X_{t_0+h})
-
\phi(t_0,x_0)
]\\
&=
E\int_{t_0}^{t_0+h}
\left(
\phi_t+\mathcal L^a\phi
\right)(s,X_s)\,ds.
\end{aligned}
$$

従って

$$
0
\le
E\int_{t_0}^{t_0+h}
\left(
L(X_s,a)
+
\phi_t(s,X_s)
+
\mathcal L^a\phi(s,X_s)
\right)ds.
$$

$h$ で割り $h\downarrow0$ とすると、連続性から

$$
\boxed{
\phi_t(t_0,x_0)
+
L(x_0,a)
+
\mathcal L^a\phi(t_0,x_0)
\ge0
}.
$$

これは任意の $a$ について成り立つので、さらに infimum を取れば viscosity subsolution 条件が得られます。
<!-- solution-end -->

### HJC5-B04 volatility control と curvature
- Level: B

一次元で

$$
dX_s
=
\sigma(u_s)\,dW_s,
\qquad
u_s\in U
$$

とし、running cost は 0 とする。

二階 HJB を書き、$V_{xx}>0$ の領域では小さい $\sigma(u)^2$ が選ばれ、$V_{xx}<0$ の領域では大きい $\sigma(u)^2$ が選ばれる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

ドリフトは 0 なので generator は

$$
\mathcal L^uV
=
\frac{\sigma(u)^2}{2}V_{xx}.
$$

従って HJB は

$$
\boxed{
V_t
+
\inf_{u\in U}
\left\{
\frac{\sigma(u)^2}{2}V_{xx}
\right\}
=
0
}.
$$

まず

$$
V_{xx}>0
$$

とします。

このとき係数

$$
\frac12V_{xx}
$$

は正なので

$$
\frac{\sigma(u)^2}{2}V_{xx}
$$

を小さくするには $\sigma(u)^2$ を小さくすればよいです。

一方

$$
V_{xx}<0
$$

なら係数が負なので、積をより小さくするには $\sigma(u)^2$ を大きくします。

従って optimal volatility は value function の curvature に依存します。

$$
\boxed{
V_{xx}>0
\Rightarrow
\text{variance を抑える},
\qquad
V_{xx}<0
\Rightarrow
\text{variance を増やす}
}
$$

という対応です。

これは stochastic control では Hessian が最適方策へ直接影響しうることを示します。
<!-- solution-end -->

## Level C

### HJC5-C01 DPP・二階 HJB・Riccati・verification を一つにつなぐ
- Level: C

一次元問題

$$
dX_s=u_s\,ds+\sigma\,dW_s,
$$

$$
J_{t,x}(u)
=
E\left[
\frac q2X_T^2
+
\int_t^T
\frac r2u_s^2\,ds
\right],
\qquad
q,r>0
$$

を考える。

1. stochastic DPP をこの問題について書け。
2. $C^{1,2}$ を仮定して二階 HJB を導け。
3. quadratic ansatz から $P,c$ の ODE を導け。
4. $P,c$ を明示的に解け。
5. optimal feedback を求めよ。
6. closed-loop SDE の well-posedness を確認し、verification theorem で optimality を閉じよ。
7. $\sigma=0$ と比較し、noise が value と feedback のどこへ現れるか説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. stochastic DPP

任意の $0<h\le T-t$ に対し

$$
\boxed{
V(t,x)
=
\inf_u
E\left[
\int_t^{t+h}
\frac r2u_s^2\,ds
+
V(t+h,X_{t+h})
\right]
}.
$$

時刻 $t+h$ の状態がランダムなので continuation value も確率変数です。

#### 2. 二階 HJB

generator は

$$
\mathcal L^uV
=
uV_x
+
\frac{\sigma^2}{2}V_{xx}.
$$

短時間 DPP へ Itô 公式を入れると

$$
\boxed{
V_t
+
\inf_u
\left\{
\frac r2u^2
+
uV_x
+
\frac{\sigma^2}{2}V_{xx}
\right\}
=
0
}
$$

を得ます。

terminal condition は

$$
V(T,x)=\frac q2x^2.
$$

#### 3. quadratic ansatz

$$
V(t,x)
=
\frac12P(t)x^2+c(t)
$$

と置くと

$$
V_t
=
\frac12P'x^2+c',
$$

$$
V_x=Px,
\qquad
V_{xx}=P.
$$

control 部分は

$$
\frac r2u^2+Pxu.
$$

平方完成して

$$
\frac r2
\left(
u+\frac P r x
\right)^2
-
\frac{P^2}{2r}x^2.
$$

従って最小値は

$$
-\frac{P^2}{2r}x^2
$$

です。

HJB へ代入すると

$$
\frac12P'x^2
+
c'
-
\frac{P^2}{2r}x^2
+
\frac{\sigma^2}{2}P
=
0.
$$

よって

$$
P'
=
\frac{P^2}{r},
\qquad
P(T)=q,
$$

$$
c'
=
-\frac{\sigma^2}{2}P,
\qquad
c(T)=0.
$$

#### 4. ODE を解く

$P$ について

$$
\frac{d}{dt}\frac1P
=
-\frac1r.
$$

terminal condition から

$$
\frac1{P(t)}
=
\frac1q
+
\frac{T-t}{r}.
$$

従って

$$
\boxed{
P(t)
=
\frac{qr}{r+q(T-t)}
}.
$$

次に

$$
c(t)
=
\frac{\sigma^2}{2}
\int_t^TP(s)\,ds.
$$

$$
P(s)
=
\frac{qr}{r+q(T-s)}
$$

なので、$y=T-s$ と置けば

$$
\begin{aligned}
\int_t^TP(s)\,ds
&=
\int_0^{T-t}
\frac{qr}{r+qy}\,dy\\
&=
r
\log
\left(
\frac{r+q(T-t)}r
\right).
\end{aligned}
$$

したがって

$$
\boxed{
c(t)
=
\frac{\sigma^2r}{2}
\log
\left(
1+\frac q r(T-t)
\right)
}.
$$

#### 5. optimal feedback

平方完成から

$$
\boxed{
u^*(t,x)
=
-\frac{P(t)}r x
=
-\frac{q}{r+q(T-t)}x
}.
$$

#### 6. verification

closed-loop SDE は

$$
dX_s
=
-\frac{q}{r+q(T-s)}
X_s\,ds
+
\sigma\,dW_s.
$$

drift coefficient

$$
-\frac{q}{r+q(T-s)}
$$

は $[t,T]$ 上で有界です。

従って $x$ に関して大域 Lipschitz で線形成長です。

よって strong solution は一意に存在します。

候補 $V$ は $C^{1,2}$ で HJB と terminal condition を満たし、feedback は pointwise minimizer を実現します。

線形 SDE の有限時間二乗モーメントは有限なので verification theorem の可積分性も満たされます。

従って

$$
\boxed{
V(t,x)
=
J_{t,x}(u^*)
}
$$

であり、$u^*$ は optimal です。

#### 7. 決定論的極限

$\sigma=0$ とすると

$$
c(t)=0
$$

になり

$$
V_{\mathrm{det}}(t,x)
=
\frac12P(t)x^2.
$$

一方 feedback gain

$$
-\frac{P(t)}r
$$

はこの問題では $\sigma$ に依存しません。

したがって

$$
\boxed{
\text{noise は最適 feedback gain を変えず、
value に正の追加 cost }c(t)\text{ を加える}
}
$$

となります。

これは additive noise と quadratic cost の特別な構造による結論です。

volatility 自体が control に依存する B04 では、二階項を通じて optimal action が Hessian に直接依存します。
<!-- solution-end -->

---

## まとめ

決定論的最適制御では

$$
\dot x=b(x,u)
$$

から

$$
V_t+\inf_u\{L+b\cdot\nabla V\}=0
$$

が現れました。

確率制御では

$$
dX
=
b(X,u)\,dt
+
\sigma(X,u)\,dW
$$

へ変わります。

Itô 公式の二次変分により

$$
\frac12
\operatorname{tr}
\left(
\sigma\sigma^\top D^2V
\right)
$$

が残り、

$$
\boxed{
V_t
+
\inf_u
\left\{
L
+
b\cdot\nabla V
+
\frac12
\operatorname{tr}
(\sigma\sigma^\top D^2V)
\right\}
=
0
}
$$

という二階 HJB が得られます。

本章で確認した因果関係は

$$
\boxed{
\text{Brown noise}
\to
\text{quadratic variation}
\to
\text{Itô correction}
\to
\text{second-order generator}
\to
\text{second-order HJB}
}
$$

です。

次章 HJC6 ではここへ HJC4 の二人零和ゲームを重ねます。

すると control の infimum だけでなく

$$
\sup\inf
\qquad\text{と}\qquad
\inf\sup
$$

が二階 generator に入り、確率微分ゲームの second-order Isaacs equations が現れます。
