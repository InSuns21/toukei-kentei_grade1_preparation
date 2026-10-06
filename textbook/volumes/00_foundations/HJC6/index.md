# HJC6 確率微分ゲーム・二階 Isaacs 方程式

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[HJC4 の nonanticipative strategy と lower / upper value](../HJC4/index.md#def-hjc4-nonanticipative-strategy)、[HJC5 の controlled diffusion と二階 HJB](../HJC5/index.md#def-hjc5-controlled-diffusion)、[HJC5 の二階 viscosity solution](../HJC5/index.md#def-hjc5-second-order-viscosity) を再利用します。

HJC4 では、二人零和の決定論的ゲームで

$$
\sup_v\inf_u
\qquad\text{と}\qquad
\inf_u\sup_v
$$

の順序が情報構造を表し、lower / upper HJI が分かれることを見ました。

HJC5 では、状態へ Brown 運動を入れると Itô の二次変分が

$$
\frac12\operatorname{tr}
\left(
\sigma\sigma^\top D^2V
\right)
$$

を残し、一人制御の HJB が二階 PDE になることを見ました。

本章ではこの二本を合流させます。

$$
\boxed{
\text{二人零和ゲーム}
+
\text{controlled diffusion}
\Longrightarrow
\text{二階 lower / upper Isaacs 方程式}
}
$$

中心線は

$$
\boxed{
\text{確率的 controls}
\to
\text{stochastic nonanticipative strategy}
\to
\text{stochastic DPP}
\to
\text{二人制御 generator}
\to
\text{二階 Isaacs}
\to
\text{viscosity characterization}
}
$$

です。

重要なのは「HJC4 の Hamiltonian に HJC5 の二階項を足す」と暗記することではありません。どのプレイヤーがどの control に反応できるか、Brown noise がどこで Hessian を作るか、そして Isaacs condition が何を一致させるかを一つずつ追います。

---

## 1. standing assumptions：二人が同じ確率状態を動かす

有限時間区間 $[0,T]$ を固定します。状態は $\mathbb R^d$ 値、Brown 運動は $\mathbb R^m$ 値とします。

MIN の action set をコンパクト距離空間 $U$、MAX の action set をコンパクト距離空間 $V$ とします。

係数

$$
b:\mathbb R^d\times U\times V\to\mathbb R^d,
$$

$$
\sigma:\mathbb R^d\times U\times V\to\mathbb R^{d\times m}
$$

は連続で、ある $K>0$ に対して一様に

$$
|b(x,a,c)-b(y,a,c)|
+
\|\sigma(x,a,c)-\sigma(y,a,c)\|_{\mathrm F}
\le
K|x-y|,
$$

$$
|b(x,a,c)|
+
\|\sigma(x,a,c)\|_{\mathrm F}
\le
K(1+|x|)
$$

を満たすとします。

running cost

$$
L:\mathbb R^d\times U\times V\to\mathbb R
$$

と terminal cost

$$
g:\mathbb R^d\to\mathbb R
$$

は bounded uniformly continuous とします。連続性評価を使う箇所では一様 Lipschitz 性も仮定します。

共通のフィルトレーション $(\mathcal F_s)$ 上で Brown 運動 $W$ を固定します。各プレイヤーの open-loop control は progressively measurable とします。

<a id="def-hjc6-stochastic-differential-game"></a>

<!-- formal-statement-start -->
### 定義（確率微分ゲーム）

時刻 $(t,x)$ と確率的許容 controls $u=(u_s)$、$v=(v_s)$ に対し

$$
dX_s
=
b(X_s,u_s,v_s)\,ds
+
\sigma(X_s,u_s,v_s)\,dW_s,
\qquad
X_t=x
$$

の強解を $X^{t,x;u,v}$ とする。

payoff を

$$
J_{t,x}(u,v)
=
E\left[
g(X_T^{t,x;u,v})
+
\int_t^T
L(X_s^{t,x;u,v},u_s,v_s)\,ds
\right]
$$

で定める。

MIN は $J$ を小さくし、MAX は $J$ を大きくする。
<!-- formal-statement-end -->

standing assumptions により、$(u,v)$ を固定すれば HJC5 と同じ SDE 存在一意性を使えます。

<!-- definition-example-start: def-hjc6-stochastic-differential-game -->
### 直接例：ドリフトを二人で押し合う拡散

$$
dX_s
=
(u_s-v_s)\,ds
+
\sigma_0\,dW_s,
\qquad
U=[-a,a],
\qquad
V=[-b,b].
$$

定数 controls $u_s\equiv\bar u$、$v_s\equiv\bar v$ を固定すると

$$
X_s
=
x+(\bar u-\bar v)(s-t)
+\sigma_0(W_s-W_t).
$$

従って

$$
E[X_s]
=
x+(\bar u-\bar v)(s-t),
$$

$$
\operatorname{Var}(X_s)
=
\sigma_0^2(s-t).
$$

**定義の確認**：二人の action は平均ドリフトを逆向きに動かし、Brown noise は両者が共有する状態不確実性を作ります。一つの状態過程と一つの payoff をめぐって目的が逆向きなので、二人零和の確率微分ゲームです。
<!-- definition-example-end -->

---

## 2. 確率ゲームでも strategy は未来を見てはいけない

HJC4 の strategy は「相手の control 履歴へ応答する規則」でした。

確率系ではさらに、出力 control 自体が progressively measurable でなければなりません。つまり相手の未来 control だけでなく、Brown 運動の未来も先読みしてはいけません。

時刻 $t$ からの MIN / MAX の確率的許容 controls の集合を

$$
\mathcal U_t,
\qquad
\mathcal V_t
$$

と書きます。

以下では「ほとんど至る所（almost everywhere; a.e.）」という略記を使います。

<a id="def-hjc6-stochastic-nonanticipative-strategy"></a>

<!-- formal-statement-start -->
### 定義（stochastic nonanticipative strategy）

MIN の stochastic nonanticipative strategy とは写像

$$
\alpha:\mathcal V_t\to\mathcal U_t
$$

であって、任意の $r\in[t,T]$ と $v^1,v^2\in\mathcal V_t$ について

$$
v^1=v^2
$$

が $[t,r]\times\Omega$ 上で $ds\otimes dP$-a.e. に成り立つなら

$$
\alpha[v^1]=\alpha[v^2]
$$

も同じ領域で $ds\otimes dP$-a.e. に成り立つものをいう。

MAX の strategy

$$
\beta:\mathcal U_t\to\mathcal V_t
$$

も同様に定義する。
<!-- formal-statement-end -->

この定義には二つの非先読み性があります。

1. $\alpha[v]$ 自体が progressively measurable なので、未来の Brown noise を使えない。
2. $v$ の時刻 $r$ までの履歴が同じなら、出力も $r$ まで同じなので、相手の未来 control を使えない。

<!-- definition-example-start: def-hjc6-stochastic-nonanticipative-strategy -->
### 直接例：現在の相手 action だけに反応する

$U=V=[-1,1]$ とし、

$$
\alpha[v]_s=-v_s
$$

と置きます。

$v$ が progressive なら $-v$ も progressive です。また $v^1=v^2$ on $[t,r]$ なら

$$
\alpha[v^1]
=
-v^1
=
-v^2
=
\alpha[v^2]
$$

on $[t,r]$ です。

従って $\alpha$ は stochastic nonanticipative strategy です。

一方、

$$
\widetilde\alpha[v]_s=-v_T
$$

は $s<T$ の応答を未来時刻 $T$ の相手 action で決めるため、この条件を満たしません。

**定義の確認**：確率的であることは「何でもランダムに選べる」という意味ではなく、利用可能な情報に適合したランダム control だけを許すという意味です。
<!-- definition-example-end -->

---

## 3. lower / upper stochastic value：反応権の違いを残す

MIN の stochastic strategies の集合を $\mathcal A_t$、MAX のものを $\mathcal B_t$ とします。

HJC4 と同じく、両者へ同時に strategy を与えると strategy 同士の固定点問題が生じます。本章では一方だけを strategy、他方を open-loop control とする lower / upper game を使います。

<a id="def-hjc6-stochastic-lower-upper-values"></a>

<!-- formal-statement-start -->
### 定義（lower / upper stochastic value）

lower value を

$$
V^-(t,x)
=
\inf_{\alpha\in\mathcal A_t}
\sup_{v\in\mathcal V_t}
J_{t,x}(\alpha[v],v)
$$

で定義する。

upper value を

$$
V^+(t,x)
=
\sup_{\beta\in\mathcal B_t}
\inf_{u\in\mathcal U_t}
J_{t,x}(u,\beta[u])
$$

で定義する。
<!-- formal-statement-end -->

lower game では MIN が相手 control に反応できるため、局所的な順序は

$$
\sup_c\inf_a
$$

になります。

upper game では MAX が反応できるため

$$
\inf_a\sup_c
$$

になります。

<!-- definition-example-start: def-hjc6-stochastic-lower-upper-values -->
### 直接例：noise があっても情報構造の差は消えない

状態は control に依存せず

$$
dX_s=\sigma_0\,dW_s
$$

とし、terminal cost は $g\equiv0$、running cost を

$$
L(a,c)=ac,
\qquad
U=V=\{-1,1\}
$$

とします。

lower game では MIN が

$$
\alpha[v]_s=-v_s
$$

と応答できるので、常に

$$
L(\alpha[v]_s,v_s)=-1.
$$

したがって

$$
V^-(t,x)=-(T-t).
$$

upper game では MAX が

$$
\beta[u]_s=u_s
$$

と応答できるので

$$
L(u_s,\beta[u]_s)=1,
$$

従って

$$
V^+(t,x)=T-t.
$$

Brown noise は存在していますが payoff が状態に依存しないため、この例では value gap を埋めません。

**定義の確認**：確率性と game value の存在は別問題です。noise があることだけでは $\sup\inf$ と $\inf\sup$ は一致しません。
<!-- definition-example-end -->

---

## 4. 二人制御 generator：二階項にも両者の action が入る

$u=a$、$v=c$ を一瞬固定したときの拡散行列を

$$
A(x,a,c)
=
\sigma(x,a,c)\sigma(x,a,c)^\top
$$

と置きます。

<a id="def-hjc6-two-player-generator"></a>

<!-- formal-statement-start -->
### 定義（二人制御 generator）

$\phi\in C^2(\mathbb R^d)$ に対して

$$
\mathcal L^{a,c}\phi(x)
=
b(x,a,c)\cdot\nabla\phi(x)
+
\frac12
\operatorname{tr}
\left(
A(x,a,c)D^2\phi(x)
\right)
$$

と定める。
<!-- formal-statement-end -->

HJC4 では局所量は $L+b\cdot p$ でした。ここでは diffusion が action に依存し得るので Hessian $M$ まで含む

$$
Q(x,p,M;a,c)
=
L(x,a,c)
+
b(x,a,c)\cdot p
+
\frac12
\operatorname{tr}
\left(
A(x,a,c)M
\right)
$$

が局所 stage game になります。

<!-- definition-example-start: def-hjc6-two-player-generator -->
### 直接例：drift と volatility の両方へ action が入る

一次元で

$$
dX_s
=
(u_s-v_s)\,ds
+
(\sigma_0+\eta u_s)\,dW_s
$$

を考えます。ここで $\sigma_0>|\eta|$、$U=[-1,1]$ として拡散係数が 0 にならないようにします。

定数 action $(a,c)$ に対し

$$
b(x,a,c)=a-c,
$$

$$
A(x,a,c)=(\sigma_0+\eta a)^2.
$$

従って

$$
\boxed{
\mathcal L^{a,c}\phi
=
(a-c)\phi'
+
\frac12
(\sigma_0+\eta a)^2\phi''
}.
$$

**定義の確認**：action $a$ は一階の drift 項だけでなく二階の curvature 項の係数も変えます。確率微分ゲームでは、最適化が Hessian にまで作用し得ます。
<!-- definition-example-end -->

---

## 5. stochastic DPP：ランダムな中間状態からゲームを再開する

短時間 $h>0$ を取り $t+h\le T$ とします。

lower game では最初の区間で strategy $\alpha_h$ と相手 control $v_h$ を使い、ランダムな到達状態 $X_{t+h}$ から continuation value $V^-(t+h,X_{t+h})$ を評価します。

<a id="thm-hjc6-stochastic-dpp"></a>

<!-- formal-statement-start -->
### 定理（stochastic differential game の DPP）

standing assumptions に加え、strategy class が restriction と concatenation で閉じ、到達状態に応じた $\varepsilon$-optimal continuation strategy と opponent の $\varepsilon$-maximizing continuation control を有限 Borel 分割上で貼り合わせられると仮定する。

このとき

$$
\boxed{
V^-(t,x)
=
\inf_{\alpha_h}
\sup_{v_h}
E\left[
\int_t^{t+h}
L(X_s,\alpha_h[v_h]_s,v_{h,s})\,ds
+
V^-(t+h,X_{t+h})
\right]
}
$$

が成り立つ。

同様に

$$
\boxed{
V^+(t,x)
=
\sup_{\beta_h}
\inf_{u_h}
E\left[
\int_t^{t+h}
L(X_s,u_{h,s},\beta_h[u_h]_s)\,ds
+
V^+(t+h,X_{t+h})
\right].
}
$$
<!-- formal-statement-end -->

「確率制御の DPP」と「微分ゲームの DPP」の両方が入っています。

- $X_{t+h}$ がランダムなので期待値が必要。
- continuation は control ではなく strategy として貼り合わせる。
- lower / upper で infimum と supremum の順序が違う。

<!-- proof-start -->
### 証明

lower value について示します。upper value は MIN / MAX を入れ替えれば同じです。

右辺を $R_h^-(t,x)$ と書きます。

#### Step 1：$V^-\ge R_h^-$

任意の global strategy $\alpha\in\mathcal A_t$ を固定し、その $[t,t+h]$ への restriction を $\alpha_h$ とします。さらに最初の区間で MAX が使う control $v_h$ を固定します。

時刻 $t+h$ までの履歴を固定すると、$\alpha$ の後半部分は MIN の admissible continuation strategy $\alpha^{\mathrm{cont}}$ を定めます。ここで [lower value](#def-hjc6-stochastic-lower-upper-values) から使えるのは、固定した opponent control 一本に対する不等式ではなく

$$
\sup_{v^{\mathrm{cont}}}
J_{t+h,y}
\left(
\alpha^{\mathrm{cont}}[v^{\mathrm{cont}}],
v^{\mathrm{cont}}
\right)
\ge
\inf_{\widetilde\alpha}
\sup_{v^{\mathrm{cont}}}
J_{t+h,y}
\left(
\widetilde\alpha[v^{\mathrm{cont}}],
v^{\mathrm{cont}}
\right)
=
V^-(t+h,y)
$$

です。

従って、各 continuation state $y$ では MAX 側に $V^-(t+h,y)$ を $\varepsilon$ 以内で下から実現する continuation control を選ばせます。定理で仮定した finite Borel partition と measurable pasting を使えば、ランダムな到達状態 $X_{t+h}$ に応じてこれらを貼り合わせ、$v_h$ を global control $v$ へ延長できます。

SDE の初期値安定性と cost の一様連続性を併用すると、この延長について

$$
J_{t,x}(\alpha[v],v)
\ge
E\left[
\int_t^{t+h}L_s\,ds
+
V^-(t+h,X_{t+h})
\right]
-\varepsilon-o(1)
$$

となります。ここで $o(1)$ は partition の直径と tail truncation の誤差で、両者を 0 に送れば消えます。

global opponent controls に対する supremum は、この特定の延長 $v$ の payoff 以上です。したがって $v_h$ の supremum を取り、最後に global strategy $\alpha$ の infimumを取れば

$$
V^-(t,x)
\ge
R_h^-(t,x).
$$

最後に $\varepsilon\downarrow0$ とすればよいです。

#### Step 2：$V^-\le R_h^-$

短時間 strategy $\alpha_h$ を固定します。

SDE の有限時間モーメント評価から、任意の $\eta>0$ に対して十分大きい $R$ を選べば

$$
P(|X_{t+h}|>R)<\eta
$$

とできます。

閉球 $\overline B(0,R)$ を直径 $\delta$ 以下の有限 Borel cells

$$
A_1,\ldots,A_N
$$

へ分け、代表点を $x_i$ とします。

各 $x_i$ について continuation strategy $\alpha_i$ を

$$
\sup_{v}
J_{t+h,x_i}(\alpha_i[v],v)
\le
V^-(t+h,x_i)+\varepsilon
$$

となるよう選びます。

時刻 $t+h$ の実到達点が $A_i$ に入ったとき $\alpha_i$ を使うように、短時間 strategy $\alpha_h$ の後ろへ continuation strategy を concatenation します。

nonanticipativity は、時刻 $t+h$ までの応答が $\alpha_h$ だけで決まり、その後の応答が $\mathcal F_{t+h}$ で判定できる cell と相手のその後の control 履歴だけから決まるので保たれます。

初期値安定性から、同じ continuation controls の下で $y,x_i$ から走る状態は

$$
E\left[
\sup_{t+h\le s\le T}
|X_s^y-X_s^{x_i}|^2
\right]
\le
C|y-x_i|^2.
$$

$L,g$ の一様連続性を Lipschitz の場合に書けば

$$
|J_{t+h,y}-J_{t+h,x_i}|
\le
C'|y-x_i|
\le
C'\delta.
$$

したがって ball 内では continuation payoff は

$$
V^-(t+h,y)
+
\varepsilon
+
C''\delta
$$

以下にできます。ball 外の事象は bounded cost と確率 $\eta$ により $O(\eta)$ です。

従って貼り合わせた global strategy に対し

$$
V^-(t,x)
\le
\sup_{v_h}
E\left[
\int_t^{t+h}L_s\,ds
+
V^-(t+h,X_{t+h})
\right]
+
\varepsilon
+
C''\delta
+
C'''\eta.
$$

$\alpha_h$ の infimum を取り、その後

$$
\varepsilon\downarrow0,
\qquad
\delta\downarrow0,
\qquad
\eta\downarrow0
$$

とすれば

$$
V^-(t,x)\le R_h^-(t,x).
$$

二方向を合わせて DPP を得ます。$\square$
<!-- proof-end -->

ここで有限分割を使う理由は、ランダムな到達点ごとに非可算個の continuation strategy を直接選ぶ代わりに、有限個の $\varepsilon$-optimal strategies と SDE 安定性で近似するためです。

---

## 6. 短時間展開：二階 Isaacs operator が現れる

滑らかな test function $\phi\in C^{1,2}$ を考えます。

短時間で actions $(a,c)$ を固定すると、時間依存 Itô 公式から

$$
E[
\phi(t+h,X_{t+h})
-\phi(t,x)
]
=
E\int_t^{t+h}
\left[
\phi_t
+
\mathcal L^{a,c}\phi
\right](s,X_s)\,ds.
$$

$h$ で割り $h\downarrow0$ とすると

$$
\frac1h
E[
\phi(t+h,X_{t+h})
-\phi(t,x)
]
\to
\phi_t(t,x)
+
\mathcal L^{a,c}\phi(t,x).
$$

running cost も合わせれば局所量は

$$
Q(x,p,M;a,c)
=
L(x,a,c)
+
b(x,a,c)\cdot p
+
\frac12
\operatorname{tr}(A(x,a,c)M)
$$

です。

<a id="def-hjc6-second-order-isaacs"></a>

<!-- formal-statement-start -->
### 定義（二階 lower / upper Isaacs operator と方程式）

$$
F^-(x,p,M)
=
\sup_{c\in V}
\inf_{a\in U}
Q(x,p,M;a,c),
$$

$$
F^+(x,p,M)
=
\inf_{a\in U}
\sup_{c\in V}
Q(x,p,M;a,c)
$$

と定める。

lower Isaacs terminal value problem を

$$
V_t^-
+
F^-(x,\nabla V^-,D^2V^-)
=
0,
$$

$$
V^-(T,x)=g(x)
$$

とする。

upper Isaacs terminal value problem を

$$
V_t^+
+
F^+(x,\nabla V^+,D^2V^+)
=
0,
$$

$$
V^+(T,x)=g(x)
$$

とする。
<!-- formal-statement-end -->

二階という名前は、単に $D^2V$ が書いてあるからではありません。

Brown 増分は $\sqrt h$ オーダーなので、その二乗が $h$ オーダーで残り、Itô 公式の二次変分が局所 stage game へ Hessian を持ち込みます。

<!-- definition-example-start: def-hjc6-second-order-isaacs -->
### 直接例：action 非依存 noise なら HJC4 に共通二階項が足される

$$
dX_s=(u_s-v_s)\,ds+\sigma_0\,dW_s,
$$

$$
L\equiv0,
\qquad
|u|\le a,
\qquad
|v|\le b,
\qquad
a>b>0
$$

とします。

一次元なので

$$
Q(p,M;u,v)
=
p(u-v)
+
\frac{\sigma_0^2}{2}M.
$$

二階項は $(u,v)$ に依存しないため最適化の外へ出せます。

HJC4 の計算から

$$
\sup_v\inf_u p(u-v)
=
\inf_u\sup_v p(u-v)
=
-(a-b)|p|.
$$

従って

$$
F^-(p,M)
=
F^+(p,M)
=
-(a-b)|p|
+
\frac{\sigma_0^2}{2}M.
$$

**定義の確認**：決定論的 pursuit--evasion の Isaacs operator に、共有 Brown noise の二階項がそのまま加わっています。
<!-- definition-example-end -->

---

## 7. viscosity solution：滑らかさを仮定せず DPP を PDE へ移す

二階 Isaacs 方程式も value function が $C^{1,2}$ とは限りません。

そこで [HJC5 の二階 HJB に対する viscosity solution](../HJC5/index.md#def-hjc5-second-order-viscosity) と同じく、滑らかな test function の接触で不等式を読みます。たとえば lower equation に対し、continuous function $w$ が viscosity subsolution であるとは、$\phi\in C^{1,2}$ が $(t_0,x_0)$ で上から接するとき

$$
\phi_t(t_0,x_0)
+
F^-
\left(
x_0,
\nabla\phi(t_0,x_0),
D^2\phi(t_0,x_0)
\right)
\ge0
$$

となることです。

下接触では不等号が逆になり

$$
\phi_t
+
F^-(x,\nabla\phi,D^2\phi)
\le0
$$

です。upper equation では $F^-$ を $F^+$ に置き換えます。

<a id="thm-hjc6-value-viscosity"></a>

<!-- formal-statement-start -->
### 定理（lower / upper stochastic value の viscosity characterization）

standing assumptions と DPP の仮定を満たし、$V^-,V^+$ が continuous であるとする。

このとき $V^-$ は lower Isaacs terminal value problem の viscosity solution であり、$V^+$ は upper Isaacs terminal value problem の viscosity solution である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

lower value $V^-$ について示します。

#### Step 1：上から接する場合

$\phi\in C^{1,2}$ が $(t_0,x_0)$ で $V^-$ に上から接し、

$$
V^-(t_0,x_0)=\phi(t_0,x_0)
$$

とします。

局所 cylinder から出る時刻で停止し、接触近傍では

$$
V^-\le\phi
$$

を使えるようにします。

lower DPP へ $\phi$ を代入すると、短時間 stage game について

$$
0
\le
\inf_{\alpha_h}
\sup_{v_h}
E\left[
\int_{t_0}^{t_0+h}
L_s\,ds
+
\phi(t_0+h,X_{t_0+h})
-\phi(t_0,x_0)
\right]
+
o(h)
$$

を得ます。

Itô 公式により bracket の中は

$$
E\int_{t_0}^{t_0+h}
\left[
L
+
\phi_t
+
\mathcal L^{\alpha_h[v_h]_s,v_{h,s}}\phi
\right](s,X_s)\,ds.
$$

短時間では状態が $x_0$ から $O(\sqrt h)$ しか離れず、係数と $\phi$ の導関数は連続です。したがって $h$ で割った極限では

$$
\phi_t(t_0,x_0)
+
\sup_{c\in V}
\inf_{a\in U}
\left\{
L(x_0,a,c)
+
\mathcal L^{a,c}\phi(t_0,x_0)
\right\}
$$

が残ります。

この $\sup_c\inf_a$ が出る理由は HJC4 と同じです。lower game では MIN の strategy が相手の現在 action $c$ に nonanticipatively 反応できるので、各 $c$ に対して $a$ を選んだ後、MAX が $c$ を選ぶ stage game になります。

従って

$$
\phi_t(t_0,x_0)
+
F^-
\left(
x_0,\nabla\phi,D^2\phi
\right)
\ge0.
$$

#### Step 2：下から接する場合

今度は $\phi$ が $V^-$ に下から接するとします。

DPP の infimum に対し $h\varepsilon$-optimal な短時間 strategy $\alpha_h^\varepsilon$ を取り、局所停止した DPP へ

$$
V^-\ge\phi
$$

を入れます。

すると

$$
0
\ge
\sup_{v_h}
E\int_{t_0}^{t_0+h}
\left[
L
+
\phi_t
+
\mathcal L^{\alpha_h^\varepsilon[v_h]_s,v_{h,s}}\phi
\right]ds
-
h\varepsilon
+
o(h).
$$

任意の strategy に対し MAX は定数 control $c$ を選べます。そのとき MIN の応答 action が何であっても

$$
L+\mathcal L^{a,c}\phi
\ge
\inf_{\tilde a}
\left\{
L(x,\tilde a,c)
+
\mathcal L^{\tilde a,c}\phi
\right\}.
$$

よって MAX が $c$ を選ぶ supremum を取れば integrand は局所的に

$$
F^-(x,\nabla\phi,D^2\phi)
$$

以上です。

$h$ で割り $h\downarrow0$、その後 $\varepsilon\downarrow0$ とすると

$$
\phi_t(t_0,x_0)
+
F^-
\left(
x_0,\nabla\phi,D^2\phi
\right)
\le0.
$$

従って $V^-$ は viscosity supersolution でもあります。

terminal time では payoff の定義から

$$
V^-(T,x)=g(x).
$$

以上で $V^-$ は lower Isaacs equation の viscosity solution です。

$V^+$ では strategy を持つ側が MAX へ替わるため、短時間 stage game が

$$
\inf_a\sup_c
$$

となり、同じ議論で $F^+$ の viscosity solution 性を得ます。$\square$
<!-- proof-end -->

この証明の核心は、HJC5 の Itô 展開と HJC4 の stage-game consistency が**同じ短時間極限の中で同時に使われる**ことです。

---

## 8. stochastic Isaacs condition：二つの fully nonlinear PDE を一つにする

ここまでで lower value と upper value は、それぞれ異なる二階 Isaacs equation を満たすことが分かりました。

では、この二本を一つの game value へ戻すには何を要求すればよいでしょうか。

HJC4 では一階の局所 game について $\sup\inf$ と $\inf\sup$ の一致を要求しました。確率微分ゲームでは diffusion が Hessian に作用するため、勾配 $p$ だけでなく二階変数 $M$ まで含めて二つの局所 operator が一致することを要求します。この一致条件を次で定義します。

<a id="def-hjc6-stochastic-isaacs-condition"></a>

<!-- formal-statement-start -->
### 定義（stochastic Isaacs condition）

全ての

$$
x\in\mathbb R^d,
\qquad
p\in\mathbb R^d,
\qquad
M\in\mathbb S^d
$$

に対して

$$
F^-(x,p,M)
=
F^+(x,p,M)
$$

が成り立つとき、stochastic Isaacs condition が成り立つという。
<!-- formal-statement-end -->

決定論的 HJC4 では $(x,p)$ だけを比較しました。

確率微分ゲームでは

$$
\boxed{
(x,p,M)
}
$$

全体で等式が必要です。拡散係数が controls に依存すると、$M=D^2V$ の方向によって stage game の順序差が変わり得るからです。

<!-- definition-example-start: def-hjc6-stochastic-isaacs-condition -->
### 直接例：加法分離された robust-control 型局所量

一次元で

$$
Q(x,p,M;u,w)
=
q(x)
+
\frac r2u^2
-
\frac{\gamma^2}{2}w^2
+
p(u+w)
+
\frac{\sigma_0^2}{2}M
$$

とします。$r,\gamma,\sigma_0>0$、actions は $\mathbb R$ とします。

$u$ と $w$ の項が加法分離されているので

$$
\inf_u
\left(
\frac r2u^2+pu
\right)
=
-\frac{p^2}{2r},
$$

$$
\sup_w
\left(
-\frac{\gamma^2}{2}w^2+pw
\right)
=
\frac{p^2}{2\gamma^2}.
$$

従って最適化の順序によらず

$$
F^-(x,p,M)
=
F^+(x,p,M)
$$

であり、

$$
F(x,p,M)
=
q(x)
-\frac{p^2}{2r}
+\frac{p^2}{2\gamma^2}
+\frac{\sigma_0^2}{2}M.
$$

**定義の確認**：MIN の control cost と MAX の disturbance reward が別々の変数へ分離されているため、$\sup\inf$ と $\inf\sup$ が同じ値になります。
<!-- definition-example-end -->

---

## 9. Isaacs condition だけでは足りない：comparison の役割

HJC5 では、一般の二階 fully nonlinear PDE に対する comparison の完全証明には Crandall--Ishii 型の行列評価が必要であり、本系列ではそれを新しい暗黙前提にしないとしました。

その境界は本章でも守ります。

<a id="thm-hjc6-isaacs-value"></a>

<!-- formal-statement-start -->
### 定理（stochastic Isaacs condition と comparison による game value）

standing assumptions の下で stochastic Isaacs condition

$$
F^-=F^+=F
$$

が成り立つとする。

さらに共通 terminal value problem

$$
w_t
+
F(x,\nabla w,D^2w)
=
0,
\qquad
w(T,x)=g(x)
$$

が、$V^-,V^+$ を含む continuous function class で comparison principle を満たすと仮定する。

このとき

$$
\boxed{
V^-(t,x)=V^+(t,x)
}
$$

が全ての $(t,x)$ で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節の viscosity characterization により

$$
V^-
$$

は

$$
w_t+F^-(x,\nabla w,D^2w)=0
$$

の viscosity solution です。

同様に

$$
V^+
$$

は

$$
w_t+F^+(x,\nabla w,D^2w)=0
$$

の viscosity solution です。

Isaacs condition により

$$
F^-=F^+=F
$$

なので、両者は同じ terminal data $g$ を持つ同じ PDE の viscosity solutions です。

comparison principle は同じ終端値問題の solution を一意にするので

$$
V^-=V^+.
$$

これを共通の stochastic game value $V$ と呼びます。$\square$
<!-- proof-end -->

ここで得たのは **value の存在**です。

これは

- 最適 open-loop control pair が存在する、
- 最適 stochastic strategy が存在する、
- feedback saddle point が存在する、

ことを自動的には意味しません。

value の一意性と optimizer の存在は別の問題です。

---

## 10. robust control：最悪外乱を第二プレイヤーと読む

確率微分ゲームの実用上の重要な読み方の一つは、MAX を「敵対的な人」ではなく「最悪外乱」とみなすことです。

一次元の例として

$$
dX_s
=
(u_s+w_s)\,ds
+
\sigma_0\,dW_s
$$

を考えます。

MIN は control $u$ で状態を小さく保ちたい一方、MAX は disturbance $w$ で損失を大きくしたいとします。

running payoff を

$$
L(x,u,w)
=
\frac q2x^2
+
\frac r2u^2
-
\frac{\gamma^2}{2}w^2
$$

とします。

$-\gamma^2w^2/2$ は「MAX が無限に大きい外乱を無料で使う」ことを防ぐ penalty です。

局所量は

$$
Q
=
\frac q2x^2
+
\frac r2u^2
-
\frac{\gamma^2}{2}w^2
+
(u+w)p
+
\frac{\sigma_0^2}{2}M.
$$

一階条件から

$$
ru+p=0
$$

なので

$$
u^*
=
-\frac pr,
$$

また

$$
-\gamma^2w+p=0
$$

なので

$$
w^*
=
\frac p{\gamma^2}.
$$

代入すると

$$
F(x,p,M)
=
\frac q2x^2
-
\frac{p^2}{2r}
+
\frac{p^2}{2\gamma^2}
+
\frac{\sigma_0^2}{2}M.
$$

従って value PDE は

$$
V_t
+
\frac q2x^2
-
\frac{V_x^2}{2r}
+
\frac{V_x^2}{2\gamma^2}
+
\frac{\sigma_0^2}{2}V_{xx}
=
0.
$$

ここでは

$$
\boxed{
\text{control}
\leftrightarrow
-\frac{V_x^2}{2r}
}
$$

が損失を下げる方向、

$$
\boxed{
\text{worst disturbance}
\leftrightarrow
+\frac{V_x^2}{2\gamma^2}
}
$$

が損失を上げる方向として現れています。

これは robust control と zero-sum stochastic differential game の接続です。本章では $H^\infty$ 制御の体系そのものまでは展開しません。

---

## 11. 四つの方程式を同じ原理から並べる

ここまでの HJC 系列は次の表に整理できます。

| 系 | 状態方程式 | 局所最適化 | PDE |
|---|---|---|---|
| 決定論的制御 | ODE | $\inf_u$ | HJB |
| 決定論的ゲーム | ODE | $\sup_v\inf_u$ / $\inf_u\sup_v$ | HJI |
| 確率制御 | SDE | $\inf_u$ | 二階 HJB |
| 確率微分ゲーム | SDE | $\sup_v\inf_u$ / $\inf_u\sup_v$ | 二階 HJI / Isaacs |

違いは二軸です。

第一の軸は**意思決定者が一人か二人か**です。

$$
\inf_u
\quad\longrightarrow\quad
\sup_v\inf_u
\ \text{または}\
\inf_u\sup_v.
$$

第二の軸は**状態が ODE か diffusion か**です。

$$
b\cdot\nabla V
\quad\longrightarrow\quad
b\cdot\nabla V
+
\frac12\operatorname{tr}(AD^2V).
$$

したがって二階 Isaacs 方程式は独立した暗記項目ではなく、

$$
\boxed{
\text{game の情報構造}
+
\text{Itô の二次変分}
}
$$

から作られます。

---

## 12. 本章で証明していないもの

本章は

$$
\text{stochastic DPP}
\to
\text{second-order Isaacs}
\to
\text{value の viscosity characterization}
$$

を閉じました。

一方、次は別の大きな理論です。

- 一般の二階 fully nonlinear PDE に対する comparison の完全証明。
- optimal stochastic strategy の存在。
- strategy の relaxed / randomized formulation。
- 部分観測ゲーム。
- jump / Lévy noise を持つゲーム。
- 非ゼロ和 stochastic differential game。
- mean field game。

特に

$$
F^-=F^+
$$

だけを見て「必ず game value がある」と結論してはいけません。本章の定理では、共通 PDE に対する comparison を明示的に仮定しました。

---

# 演習

## Level A

### HJC6-A01 二人制御 generator
- Level: A

一次元 SDE

$$
dX_s
=
(\alpha X_s+\beta u_s-\delta v_s)\,ds
+
(\sigma_0+\eta v_s)\,dW_s
$$

を考える。actions を $u=a$、$v=c$ に固定したときの $\mathcal L^{a,c}\phi$ を求めよ。

<!-- solution-start -->
### 詳細解答

ドリフトは

$$
b(x,a,c)
=
\alpha x+\beta a-\delta c,
$$

拡散係数は

$$
\sigma(x,a,c)
=
\sigma_0+\eta c.
$$

一次元 generator の定義

$$
\mathcal L^{a,c}\phi
=
b\phi'
+
\frac12\sigma^2\phi''
$$

へ代入して

$$
\boxed{
\mathcal L^{a,c}\phi(x)
=
(\alpha x+\beta a-\delta c)\phi'(x)
+
\frac12
(\sigma_0+\eta c)^2
\phi''(x)
}.
$$

MAX の action $c$ は drift と二階項の両方へ入っています。
<!-- solution-end -->

### HJC6-A02 lower / upper operator
- Level: A

$$
Q(a,c)=ac,
\qquad
U=V=\{-1,1\}
$$

に対して

$$
F^-=\sup_c\inf_a Q(a,c),
\qquad
F^+=\inf_a\sup_c Q(a,c)
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

$c=1$ のとき

$$
\inf_{a\in\{-1,1\}}a=-1.
$$

$c=-1$ のとき

$$
\inf_{a\in\{-1,1\}}(-a)=-1.
$$

よって

$$
F^-=-1.
$$

一方、$a=1$ なら

$$
\sup_c c=1,
$$

$a=-1$ でも

$$
\sup_c(-c)=1.
$$

従って

$$
F^+=1.
$$

よって

$$
F^-\ne F^+.
$$

stochastic Isaacs condition は失敗します。
<!-- solution-end -->

### HJC6-A03 action 非依存 noise の分離
- Level: A

$$
Q(p,M;a,c)
=
p(a-c)
+
\frac{\sigma_0^2}{2}M,
$$

$$
|a|\le A,
\qquad
|c|\le C,
\qquad
A>C>0
$$

とする。$F^-$ と $F^+$ を求めよ。

<!-- solution-start -->
### 詳細解答

二階項

$$
\frac{\sigma_0^2}{2}M
$$

は actions に依存しないので最適化の外へ出せます。

まず

$$
\inf_{|a|\le A}pa=-A|p|.
$$

従って

$$
\begin{aligned}
F^-
&=
\sup_{|c|\le C}
\left(
-A|p|-pc
\right)
+
\frac{\sigma_0^2}{2}M\\
&=
-(A-C)|p|
+
\frac{\sigma_0^2}{2}M.
\end{aligned}
$$

同様に

$$
\sup_{|c|\le C}(-pc)=C|p|
$$

なので

$$
\begin{aligned}
F^+
&=
\inf_{|a|\le A}
\left(
pa+C|p|
\right)
+
\frac{\sigma_0^2}{2}M\\
&=
-(A-C)|p|
+
\frac{\sigma_0^2}{2}M.
\end{aligned}
$$

従って Isaacs condition が成立します。
<!-- solution-end -->

### HJC6-A04 stochastic nonanticipative の判定
- Level: A

$v$ を progressively measurable control とする。次の規則を判定せよ。

1.

$$
\alpha[v]_s=\tanh(v_s+W_s).
$$

2.

$$
\widetilde\alpha[v]_s=\tanh(v_T+W_T).
$$

<!-- solution-start -->
### 詳細解答

1 は admissible です。

$v_s$ と $W_s$ は時刻 $s$ までの情報で測定可能なので

$$
v_s+W_s
$$

は progressive です。$\tanh$ との合成も progressive です。

また $v^1=v^2$ on $[t,r]$ なら同じ Brown path $W$ を共有しているため

$$
\tanh(v_s^1+W_s)
=
\tanh(v_s^2+W_s)
$$

on $[t,r]$ です。

従って stochastic nonanticipative strategy です。

2 は不適切です。$s<T$ でも $v_T$ と $W_T$ を使うので、相手 control と Brown noise の両方について未来を先読みしています。
<!-- solution-end -->

### HJC6-A05 robust stage game の optimizer
- Level: A

$r,\gamma>0$ とし

$$
q(u,w)
=
\frac r2u^2+pu
-
\frac{\gamma^2}{2}w^2
+
pw
$$

を考える。

$$
\inf_u\sup_w q(u,w)
$$

を計算せよ。

<!-- solution-start -->
### 詳細解答

$u$ と $w$ は加法分離されています。

$u$ について

$$
\frac{\partial q}{\partial u}
=
ru+p
$$

なので最小点は

$$
u^*=-\frac pr.
$$

その値は

$$
\frac r2\frac{p^2}{r^2}
-
\frac{p^2}{r}
=
-\frac{p^2}{2r}.
$$

$w$ について

$$
\frac{\partial q}{\partial w}
=
-\gamma^2w+p
$$

なので最大点は

$$
w^*=\frac p{\gamma^2}.
$$

その値は

$$
-\frac{\gamma^2}{2}\frac{p^2}{\gamma^4}
+
\frac{p^2}{\gamma^2}
=
\frac{p^2}{2\gamma^2}.
$$

従って

$$
\boxed{
\inf_u\sup_w q(u,w)
=
-\frac{p^2}{2r}
+
\frac{p^2}{2\gamma^2}
}.
$$
<!-- solution-end -->

## Level B

### HJC6-B01 Itô 展開から局所量を導く
- Level: B

actions $(a,c)$ を $[t,t+h]$ で定数に固定し、

$$
dX_s
=
b(X_s,a,c)\,ds
+
\sigma(X_s,a,c)\,dW_s
$$

とする。

$\phi\in C^{1,2}$ に対して

$$
\frac1h
E\left[
\int_t^{t+h}L(X_s,a,c)\,ds
+
\phi(t+h,X_{t+h})
-
\phi(t,x)
\right]
$$

の $h\downarrow0$ 極限を求めよ。

<!-- solution-start -->
### 詳細解答

時間依存 Itô 公式より

$$
\begin{aligned}
\phi(t+h,X_{t+h})
-\phi(t,x)
&=
\int_t^{t+h}
\left[
\phi_t
+
b\cdot\nabla\phi
+
\frac12
\operatorname{tr}
(
\sigma\sigma^\top D^2\phi
)
\right](s,X_s)\,ds\\
&\quad+
\int_t^{t+h}
\nabla\phi(s,X_s)^\top
\sigma(X_s,a,c)\,dW_s.
\end{aligned}
$$

確率積分の期待値は 0 です。

従って問題の式は

$$
\frac1h
E\int_t^{t+h}
\left[
L
+
\phi_t
+
b\cdot\nabla\phi
+
\frac12
\operatorname{tr}
(
\sigma\sigma^\top D^2\phi
)
\right](s,X_s)\,ds.
$$

短時間 SDE 評価により $X_s\to x$ in probability、係数と $\phi$ の導関数の連続性から平均 integrand は初期点の値へ収束します。

よって極限は

$$
\boxed{
L(x,a,c)
+
\phi_t(t,x)
+
b(x,a,c)\cdot\nabla\phi(t,x)
+
\frac12
\operatorname{tr}
\left(
A(x,a,c)D^2\phi(t,x)
\right)
}.
$$

つまり

$$
\phi_t+Q(x,\nabla\phi,D^2\phi;a,c)
$$

です。
<!-- solution-end -->

### HJC6-B02 stochastic Isaacs condition が Hessian に依存する例
- Level: B

$U=V=\{0,1\}$ とし、drift と running cost は 0、

$$
A(a,c)=(1+a-c)^2
$$

とする。一次元なので

$$
Q(M;a,c)=\frac12A(a,c)M.
$$

$M>0$ のとき $F^-$、$F^+$ を求めよ。

<!-- solution-start -->
### 詳細解答

まず $A(a,c)$ の表を作ります。

$$
\begin{array}{c|cc}
 & c=0 & c=1\\
\hline
a=0 & 1 & 0\\
a=1 & 4 & 1
\end{array}
$$

$M>0$ なので $Q$ の大小は $A$ の大小と同じです。

lower operator は

$$
F^-
=
\sup_c\inf_a \frac12A(a,c)M.
$$

$c=0$ の列では

$$
\inf_a A(a,0)=1.
$$

$c=1$ の列では

$$
\inf_a A(a,1)=0.
$$

従って

$$
F^-=\frac12M.
$$

upper operator は

$$
F^+
=
\inf_a\sup_c \frac12A(a,c)M.
$$

$a=0$ の行では

$$
\sup_c A(0,c)=1.
$$

$a=1$ の行では

$$
\sup_c A(1,c)=4.
$$

従って

$$
F^+=\frac12M.
$$

この $M>0$ では両者が一致します。

ただし同じ表でも $M<0$ では大小が反転するため、Isaacs condition を確認するときは特定の Hessian だけでなく全ての $M$ を調べる必要があります。
<!-- solution-end -->

### HJC6-B03 lower value の subsolution 不等式
- Level: B

$\phi\in C^{1,2}$ が $(t_0,x_0)$ で $V^-$ に上から接しているとする。

stochastic DPP と Itô 公式から

$$
\phi_t(t_0,x_0)
+
F^-
\left(
x_0,\nabla\phi(t_0,x_0),D^2\phi(t_0,x_0)
\right)
\ge0
$$

が出る論理を、最適化順序を明示して説明せよ。

<!-- solution-start -->
### 詳細解答

上接触なので局所的に

$$
V^-\le\phi,
\qquad
V^-(t_0,x_0)=\phi(t_0,x_0)
$$

です。

lower DPP にこれを代入すると

$$
0
\le
\inf_{\alpha_h}\sup_{v_h}
E\left[
\int_{t_0}^{t_0+h}L_s\,ds
+
\phi(t_0+h,X_{t_0+h})
-\phi(t_0,x_0)
\right]
+
o(h).
$$

Itô 公式で

$$
\phi(t_0+h,X_{t_0+h})-\phi(t_0,x_0)
$$

を展開すると、期待値の中には

$$
L+\phi_t+\mathcal L^{u,v}\phi
$$

が現れます。

lower game では MIN が strategy を持つので、MAX が現在 action $c$ を選んだとき MIN はそれへ nonanticipatively 応答して action $a$ を選べます。

従って短時間極限の局所 game は

$$
\sup_c\inf_a
\left\{
L(x_0,a,c)
+
\mathcal L^{a,c}\phi(t_0,x_0)
\right\}.
$$

これは定義により

$$
F^-
\left(
x_0,\nabla\phi,D^2\phi
\right)
$$

です。

よって $h$ で割って $h\downarrow0$ とすると

$$
0
\le
\phi_t(t_0,x_0)
+
F^-
\left(
x_0,\nabla\phi,D^2\phi
\right).
$$

これが viscosity subsolution 条件です。
<!-- solution-end -->

### HJC6-B04 Isaacs + comparison から value equality
- Level: B

$V^-$ が

$$
w_t+F^-(x,\nabla w,D^2w)=0
$$

の viscosity solution、$V^+$ が

$$
w_t+F^+(x,\nabla w,D^2w)=0
$$

の viscosity solutionであり、両者の terminal data は同じ $g$ とする。

$$
F^-=F^+
$$

と common PDE の comparison principle を仮定して

$$
V^-=V^+
$$

を示せ。

<!-- solution-start -->
### 詳細解答

Isaacs condition により共通 operator

$$
F=F^-=F^+
$$

を定められます。

従って $V^-$ と $V^+$ はともに

$$
w_t+F(x,\nabla w,D^2w)=0,
$$

$$
w(T,x)=g(x)
$$

の viscosity solutions です。

comparison principle は、同じ terminal data を持つ subsolution $u$ と supersolution $v$ に対し

$$
u\le v
$$

を与えます。

$V^-$ を subsolution、$V^+$ を supersolution と見れば

$$
V^-\le V^+.
$$

逆に $V^+$ も subsolution、$V^-$ も supersolution なので

$$
V^+\le V^-.
$$

従って

$$
\boxed{
V^-=V^+
}.
$$
<!-- solution-end -->

## Level C

### HJC6-C01 robust stochastic game を最後まで導く
- Level: C

一次元 stochastic differential game

$$
dX_s
=
(u_s+w_s)\,ds
+
\sigma_0\,dW_s
$$

を考える。MIN は $u$、MAX は $w$ を選び、

$$
L(x,u,w)
=
\frac q2x^2
+
\frac r2u^2
-
\frac{\gamma^2}{2}w^2,
$$

$$
g(x)=\frac{q_T}{2}x^2
$$

とする。$q,q_T\ge0$、$r,\gamma,\sigma_0>0$ とする。

1. lower / upper Isaacs operators が一致することを示せ。
2. 共通 Isaacs PDE を書け。
3. quadratic ansatz

$$
V(t,x)
=
\frac12P(t)x^2+C(t)
$$

を代入し、$P,C$ の ODE を導け。
4. $u^*,w^*$ を $P(t),x$ で表せ。
5. $\gamma^2=r$ のとき、control と disturbance の一次勾配効果が PDE 上でどう相殺するか説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. Isaacs operator

局所量は

$$
Q(x,p,M;u,w)
=
\frac q2x^2
+
\frac r2u^2
-
\frac{\gamma^2}{2}w^2
+
p(u+w)
+
\frac{\sigma_0^2}{2}M.
$$

$u$ と $w$ が加法分離されているので

$$
\inf_u\sup_w Q
=
\sup_w\inf_u Q.
$$

実際、

$$
\inf_u
\left(
\frac r2u^2+pu
\right)
=
-\frac{p^2}{2r},
$$

$$
\sup_w
\left(
-\frac{\gamma^2}{2}w^2+pw
\right)
=
\frac{p^2}{2\gamma^2}.
$$

従って

$$
\boxed{
F^-=F^+=F
}
$$

で、

$$
F(x,p,M)
=
\frac q2x^2
-
\frac{p^2}{2r}
+
\frac{p^2}{2\gamma^2}
+
\frac{\sigma_0^2}{2}M.
$$

#### 2. 共通 Isaacs PDE

したがって

$$
\boxed{
V_t
+
\frac q2x^2
-
\frac{V_x^2}{2r}
+
\frac{V_x^2}{2\gamma^2}
+
\frac{\sigma_0^2}{2}V_{xx}
=
0
}
$$

であり、terminal condition は

$$
V(T,x)=\frac{q_T}{2}x^2
$$

です。

#### 3. quadratic ansatz

$$
V(t,x)
=
\frac12P(t)x^2+C(t)
$$

なら

$$
V_t
=
\frac12P'(t)x^2+C'(t),
$$

$$
V_x=P(t)x,
$$

$$
V_{xx}=P(t).
$$

PDE へ代入すると

$$
\frac12P'x^2+C'
+
\frac q2x^2
-
\frac{P^2x^2}{2r}
+
\frac{P^2x^2}{2\gamma^2}
+
\frac{\sigma_0^2}{2}P
=
0.
$$

$x^2$ の係数を比較して

$$
\frac12P'
+
\frac q2
-
\frac{P^2}{2r}
+
\frac{P^2}{2\gamma^2}
=
0.
$$

2倍して

$$
\boxed{
P'
+
q
-
\frac{P^2}{r}
+
\frac{P^2}{\gamma^2}
=
0,
\qquad
P(T)=q_T
}.
$$

定数項から

$$
\boxed{
C'
+
\frac{\sigma_0^2}{2}P
=
0,
\qquad
C(T)=0
}.
$$

#### 4. feedback candidates

局所 optimizer は

$$
ru+p=0
$$

から

$$
u^*=-\frac pr.
$$

$p=V_x=P(t)x$ を代入して

$$
\boxed{
u^*(t,x)
=
-\frac{P(t)}r x
}.
$$

一方

$$
-\gamma^2w+p=0
$$

から

$$
w^*=\frac p{\gamma^2},
$$

従って

$$
\boxed{
w^*(t,x)
=
\frac{P(t)}{\gamma^2}x
}.
$$

MIN は原点へ戻す向き、MAX はその効果を打ち消す向きへ働きます。

#### 5. $\gamma^2=r$ の場合

このとき

$$
-\frac{V_x^2}{2r}
+
\frac{V_x^2}{2\gamma^2}
=
0.
$$

従って PDE は

$$
V_t
+
\frac q2x^2
+
\frac{\sigma_0^2}{2}V_{xx}
=
0
$$

まで簡約されます。

Riccati 方程式でも

$$
-\frac{P^2}{r}
+
\frac{P^2}{\gamma^2}
=
0
$$

なので

$$
P'+q=0.
$$

これは「プレイヤーが消えた」という意味ではありません。局所 Hamiltonian 上で MIN の最適 control による減少効果と MAX の最悪 disturbance による増加効果がちょうど同じ大きさで相殺しているという意味です。
<!-- solution-end -->

---

## まとめ

HJC4 の game 構造は

$$
\sup_v\inf_u
\qquad\text{vs.}\qquad
\inf_u\sup_v
$$

を作りました。

HJC5 の diffusion 構造は

$$
\frac12
\operatorname{tr}
(
\sigma\sigma^\top D^2V
)
$$

を作りました。

HJC6 ではこの二つが同じ局所量

$$
Q(x,p,M;u,v)
=
L+b\cdot p
+\frac12\operatorname{tr}(AD^2V)
$$

の中で合流し、

$$
F^-=\sup_v\inf_u Q,
\qquad
F^+=\inf_u\sup_v Q
$$

という二階 Isaacs operators になります。

そして

$$
\boxed{
\text{stochastic DPP}
\Longrightarrow
\text{lower / upper value は二階 Isaacs の viscosity solution}
}
$$

であり、さらに

$$
\boxed{
\text{Isaacs condition}
+
\text{comparison}
\Longrightarrow
V^-=V^+
}
$$

です。

これで

$$
\text{決定論的制御}
\to
\text{HJB},
\qquad
\text{決定論的ゲーム}
\to
\text{HJI},
$$

$$
\text{確率制御}
\to
\text{二階 HJB},
\qquad
\text{確率微分ゲーム}
\to
\text{二階 HJI}
$$

を、短時間区間と continuation value を結ぶ dynamic programming の計算から再構成できるようになりました。
