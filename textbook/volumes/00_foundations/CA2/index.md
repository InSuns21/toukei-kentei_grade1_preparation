# CA2 標準複素解析 II：複素線積分・原始関数・Cauchy–Goursat

<!-- definition-example-audit: strict -->

CA1 では正則性を一点の差商から調べました。本章では、その局所情報を曲線に沿って積み上げます。核心は

```text
複素線積分
  ↓
原始関数があれば端点差だけで決まる
  ↓
三角形版 Cauchy–Goursat
  ↓
星型領域では原始関数を構成できる
  ↓
局所原始関数 + homotopy の有限分割
  ↓
単連結領域では閉曲線積分が0
  ↓
正則対数の枝
```

です。

[Cauchy–Goursat の三角形版](#thm-ca2-cauchy-goursat-triangle)は、偏導関数の連続性を追加仮定しません。三角形を4分割し続け、正則性そのものが与える一次近似

$$
f(z)=f(z_*)+f'(z_*)(z-z_*)+(z-z_*)\varepsilon(z)
$$

の最後の誤差だけを評価します。

さらに単連結領域へ進む箇所でも「homotopy invariance」を名前だけで輸入しません。homotopy の像を有限個の局所原始関数領域で覆い、細かい格子の各小長方形で境界積分を0にして、内部辺を相殺するところまで本文で構成します。その有限化で [TOP5 のコンパクト性](../TOP5/index.md#def-top5-compact) を使います。

---

## 1. 曲線と複素線積分

<a id="def-ca2-piecewise-c1-path"></a>
<!-- formal-statement-start -->
### 定義（区分的 $C^1$ 曲線）

区間 $[a,b]$ から $\mathbb C$ への連続写像

$$
\gamma:[a,b]\to\mathbb C
$$

について、分割

$$
a=t_0<t_1<\cdots<t_m=b
$$

が存在し、各 $[t_{j-1},t_j]$ 上で $\gamma$ が $C^1$ 級であるとき、$\gamma$ を **区分的 $C^1$ 曲線** という。

曲線の長さを

$$
L(\gamma)
:=
\sum_{j=1}^m
\int_{t_{j-1}}^{t_j}|\gamma'(t)|\,dt
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-piecewise-c1-path -->
**定義の確認**：線分 $z_0\to z_1$ は

$$
\gamma(t)=z_0+t(z_1-z_0),
\qquad 0\le t\le1
$$

で表せ、$\gamma'(t)=z_1-z_0$ です。従って

$$
L(\gamma)=\int_0^1|z_1-z_0|dt=|z_1-z_0|.
$$
<!-- definition-example-end -->

<a id="def-ca2-complex-line-integral"></a>
<!-- formal-statement-start -->
### 定義（複素線積分）

$f$ を $\gamma([a,b])$ 上連続な複素数値関数とする。区分的 $C^1$ 曲線 $\gamma$ に沿う **複素線積分** を

$$
\int_\gamma f(z)\,dz
:=
\sum_{j=1}^m
\int_{t_{j-1}}^{t_j}
 f(\gamma(t))\gamma'(t)\,dt
$$

と定める。右辺の複素積分は実部・虚部それぞれの Riemann 積分で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-complex-line-integral -->
**定義の確認**：$\gamma(t)=t(1+i)$、$0\le t\le1$ とし $f(z)=z$ とします。すると

$$
\gamma'(t)=1+i,
\qquad
f(\gamma(t))=t(1+i),
$$

なので

$$
\int_\gamma z\,dz
=
\int_0^1 t(1+i)^2dt
=
\int_0^1 2it\,dt
=i.
$$
<!-- definition-example-end -->

### 1.1 逆向き・連結・再パラメータ化

曲線 $\gamma:[a,b]\to\mathbb C$ の逆向き曲線を

$$
\gamma^{-}(t):=\gamma(a+b-t)
$$

とします。また $\gamma_1(b_1)=\gamma_2(a_2)$ のとき、速度の細部を取り直して $\gamma_1$ の後に $\gamma_2$ をたどる連結曲線を $\gamma_1*\gamma_2$ と書きます。

<a id="prop-ca2-line-integral-basic-rules"></a>
<!-- formal-statement-start -->
### 命題（複素線積分の基本則）

$f,g$ が曲線像上連続、$\alpha,\beta\in\mathbb C$ とする。

1. 線形性：
   $$
   \int_\gamma(\alpha f+\beta g)dz
   =\alpha\int_\gamma fdz+\beta\int_\gamma gdz.
   $$
2. 逆向き：
   $$
   \int_{\gamma^-}f(z)dz=-\int_\gamma f(z)dz.
   $$
3. 連結：
   $$
   \int_{\gamma_1*\gamma_2}f(z)dz
   =\int_{\gamma_1}f(z)dz+\int_{\gamma_2}f(z)dz.
   $$
4. $\phi:[c,d]\to[a,b]$ が向きを保つ $C^1$ 級全単射で $\phi(c)=a$, $\phi(d)=b$ なら
   $$
   \int_{\gamma\circ\phi}f(z)dz
   =\int_\gamma f(z)dz.
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形性と連結は実部・虚部の Riemann 積分の線形性・区間加法性から従います。

逆向きでは $s=a+b-t$ と置きます。すると

$$
(\gamma^-) '(t)=-\gamma'(a+b-t),
$$

なので

$$
\begin{aligned}
\int_{\gamma^-}f(z)dz
&=\int_a^b f(\gamma(a+b-t))[-\gamma'(a+b-t)]dt\\
&=-\int_a^b f(\gamma(s))\gamma'(s)ds.
\end{aligned}
$$

最後に再パラメータ化を示します。

$$
\begin{aligned}
\int_{\gamma\circ\phi}f(z)dz
&=\int_c^d f(\gamma(\phi(s)))\gamma'(\phi(s))\phi'(s)ds.
\end{aligned}
$$

[RA4 の置換積分](../RA4/index.md#thm-ra4-substitution)で $t=\phi(s)$ と置けば

$$
\int_c^d f(\gamma(\phi(s)))\gamma'(\phi(s))\phi'(s)ds
=
\int_a^b f(\gamma(t))\gamma'(t)dt.
$$

区分点がある場合は各区間に同じ議論を適用して足し合わせます。$\square$
<!-- proof-end -->

<a id="thm-ca2-ml-estimate"></a>
<!-- formal-statement-start -->
### 定理（ML評価）

$f$ が $\gamma([a,b])$ 上連続で

$$
M:=\sup_{t\in[a,b]}|f(\gamma(t))|
$$

とすると

$$
\left|\int_\gamma f(z)dz\right|
\le M L(\gamma).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず複素数値 Riemann 可積分関数 $g$ について

$$
\left|\int_a^b g(t)dt\right|
\le
\int_a^b|g(t)|dt
$$

を示します。積分値を $I$ とします。$I=0$ なら自明です。$I\ne0$ なら $I=|I|e^{i\theta}$ と書けるので

$$
\begin{aligned}
|I|
&=\operatorname{Re}(e^{-i\theta}I)\\
&=\int_a^b\operatorname{Re}(e^{-i\theta}g(t))dt\\
&\le\int_a^b|g(t)|dt.
\end{aligned}
$$

これを

$$
g(t)=f(\gamma(t))\gamma'(t)
$$

へ適用すると

$$
\begin{aligned}
\left|\int_\gamma f(z)dz\right|
&\le\int_a^b|f(\gamma(t))|\,|\gamma'(t)|dt\\
&\le M\int_a^b|\gamma'(t)|dt\\
&=ML(\gamma).
\end{aligned}
$$

区分的 $C^1$ の場合も各区間を足せば同じです。$\square$
<!-- proof-end -->

---

## 2. 原始関数と経路独立性

<a id="def-ca2-primitive"></a>
<!-- formal-statement-start -->
### 定義（原始関数）

開集合 $\Omega\subset\mathbb C$ 上の関数 $f$ に対し、正則関数 $F:\Omega\to\mathbb C$ が

$$
F'(z)=f(z)
\qquad(z\in\Omega)
$$

を満たすとき、$F$ を $f$ の **原始関数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-primitive -->
**定義の確認**：$f(z)=2z$ に対して $F(z)=z^2$ は原始関数です。従って後の線積分の基本定理から、どの曲線を通っても

$$
\int_{z_0}^{z_1}2z\,dz=z_1^2-z_0^2
$$

となります。
<!-- definition-example-end -->

<a id="thm-ca2-line-integral-ftc"></a>
<!-- formal-statement-start -->
### 定理（複素線積分の基本定理）

$f$ が開集合 $\Omega$ 上で原始関数 $F$ を持ち、$\gamma:[a,b]\to\Omega$ が区分的 $C^1$ 曲線なら

$$
\int_\gamma f(z)dz
=F(\gamma(b))-F(\gamma(a)).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\gamma$ が $C^1$ 級である場合を考えます。$t$ を固定し、$h\to0$ とします。CA1 の複素微分可能性から

$$
F(\gamma(t)+k)-F(\gamma(t))
=F'(\gamma(t))k+o(|k|)
$$

です。一方

$$
\gamma(t+h)-\gamma(t)=\gamma'(t)h+o(|h|).
$$

$k=\gamma(t+h)-\gamma(t)$ と置けば $|k|=O(|h|)$ なので

$$
\frac{F(\gamma(t+h))-F(\gamma(t))}{h}
\to
F'(\gamma(t))\gamma'(t).
$$

従って実変数関数 $F\circ\gamma$ の導関数は

$$
\frac{d}{dt}F(\gamma(t))
=f(\gamma(t))\gamma'(t).
$$

実部・虚部それぞれに [RA4 の微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を適用すると

$$
\int_a^b f(\gamma(t))\gamma'(t)dt
=F(\gamma(b))-F(\gamma(a)).
$$

区分的 $C^1$ の場合は各区間でこの式を使い、隣接区間の端点値が望遠鏡型に相殺します。$\square$
<!-- proof-end -->

<a id="thm-ca2-path-independence"></a>
<!-- formal-statement-start -->
### 定理（原始関数・経路独立性・閉曲線積分0の同値）

$\Omega$ を経路連結な開集合、$f:\Omega\to\mathbb C$ を連続関数とする。次は同値である。

1. $f$ は $\Omega$ 上原始関数を持つ。
2. 任意の区分的 $C^1$ 曲線の積分は始点と終点だけで決まる。
3. 任意の区分的 $C^1$ 閉曲線 $\gamma$ について
   $$
   \int_\gamma f(z)dz=0.
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**1 ⇒ 2**：原始関数 $F$ があれば [複素線積分の基本定理](#thm-ca2-line-integral-ftc) により

$$
\int_\gamma f(z)dz
=F(\gamma(b))-F(\gamma(a))
$$

なので端点だけで決まります。

**2 ⇒ 3**：閉曲線では始点と終点が同じです。同じ点から同じ点への定値曲線の積分は0なので、経路独立性から任意の閉曲線積分も0です。

**3 ⇒ 2**：同じ始点 $p$ と終点 $q$ を持つ曲線 $\gamma_1,\gamma_2$ を取ります。$\gamma_1*\gamma_2^-$ は閉曲線なので

$$
0
=
\int_{\gamma_1*\gamma_2^-}f(z)dz
=
\int_{\gamma_1}f(z)dz-
\int_{\gamma_2}f(z)dz.
$$

従って両積分は等しいです。

**2 ⇒ 1**：基点 $z_0\in\Omega$ を固定します。経路連結性により、各 $z\in\Omega$ へ区分的 $C^1$ 曲線を取れるものとし

$$
F(z):=\int_{z_0}^{z}f(w)dw
$$

と定めます。経路独立性によりこれは曲線の選び方によらず well-defined です。

$z\in\Omega$ を固定します。$\Omega$ は開なので、ある $r>0$ があって $D(z,r)\subset\Omega$ です。$|h|<r$ なら、$z$ から $z+h$ までの線分を最後に付け足せるので

$$
F(z+h)-F(z)
=
\int_0^1 f(z+th)h\,dt.
$$

$h\ne0$ で割ると

$$
\frac{F(z+h)-F(z)}h
=
\int_0^1 f(z+th)dt.
$$

$f$ は $z$ で連続ですから、任意の $\varepsilon>0$ に対して十分小さい $h$ では全ての $0\le t\le1$ について

$$
|f(z+th)-f(z)|<\varepsilon.
$$

従って

$$
\left|
\frac{F(z+h)-F(z)}h-f(z)
\right|
\le
\int_0^1|f(z+th)-f(z)|dt
<\varepsilon.
$$

よって $F'(z)=f(z)$ です。$\square$
<!-- proof-end -->

ここで 2⇒1 に正則性は使っていません。**連続な $f$ の線積分が経路独立なら、その経路積分そのものが原始関数になる**という一般的な機構です。

---

## 3. 三角形版 Cauchy–Goursat

<a id="def-ca2-star-shaped"></a>
<!-- formal-statement-start -->
### 定義（星型領域）

開集合 $\Omega\subset\mathbb C$ が **星型** であるとは、ある $a\in\Omega$ が存在して、任意の $z\in\Omega$ と $0\le t\le1$ に対し

$$
(1-t)a+tz\in\Omega
$$

となることをいう。この $a$ を星の中心と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-star-shaped -->
**定義の確認**：円板、開長方形、凸開集合は全て星型です。凸集合では任意の点を星の中心にできます。一方、穿孔平面 $\mathbb C\setminus\{0\}$ は星型ではありません。どの候補点 $a$ を選んでも、反対方向の点 $-ta$ への線分が0を通るためです。
<!-- definition-example-end -->

<a id="thm-ca2-cauchy-goursat-triangle"></a>
<!-- formal-statement-start -->
### 定理（三角形版 Cauchy–Goursat）

$\Delta$ を閉三角形とし、その近傍を含む開集合上で $f$ が正則であるとする。$\partial\Delta$ を反時計回りに一周する区分的 $C^1$ 曲線とすれば

$$
\int_{\partial\Delta}f(z)dz=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
I(\Delta):=\int_{\partial\Delta}f(z)dz
$$

と置きます。

**Step 1：4分割で積分を一つの小三角形へ押し込む。**

三辺の中点を結んで $\Delta$ を相似な4つの小三角形 $\Delta^{(1)},\dots,\Delta^{(4)}$ に分けます。内部の辺は二つの小三角形で逆向きに一度ずつ現れるので相殺し

$$
I(\Delta)
=
\sum_{j=1}^4 I(\Delta^{(j)}).
$$

従って三角不等式から少なくとも一つは

$$
|I(\Delta^{(j)})|
\ge\frac14|I(\Delta)|
$$

を満たします。その一つを $\Delta_1$ とします。同じ操作を反復して

$$
\Delta_0:=\Delta\supset\Delta_1\supset\Delta_2\supset\cdots
$$

を取り

$$
|I(\Delta_n)|\ge4^{-n}|I(\Delta_0)|
$$

とできます。また直径と周長は

$$
\operatorname{diam}(\Delta_n)=2^{-n}d_0,
\qquad
L(\partial\Delta_n)=2^{-n}\ell_0
$$

となります。ここで $d_0=\operatorname{diam}(\Delta_0)$、$\ell_0=L(\partial\Delta_0)$ です。

**Step 2：縮小三角形の共通点を作る。**

各 $n$ から $z_n\in\Delta_n$ を一つ取ります。$m\ge n$ なら $z_m,z_n\in\Delta_n$ なので

$$
|z_m-z_n|\le2^{-n}d_0.
$$

従って $(z_n)$ は Cauchy 列で、$\mathbb C$ の完備性からある $z_*$ へ収束します。各 $\Delta_n$ は閉で、$m\ge n$ なら $z_m\in\Delta_n$ なので極限 $z_*\in\Delta_n$ です。従って

$$
z_*\in\bigcap_{n=0}^{\infty}\Delta_n.
$$

**Step 3：正則性が与える一次近似だけを使う。**

$f$ は $z_*$ で複素微分可能なので

$$
f(z)
=f(z_*)+f'(z_*)(z-z_*)+(z-z_*)\varepsilon(z),
$$

ただし $z\to z_*$ で $\varepsilon(z)\to0$ と書けます。

定数項 $f(z_*)$ は原始関数 $f(z_*)z$ を持ち、一次項 $f'(z_*)(z-z_*)$ は原始関数

$$
\frac12f'(z_*)(z-z_*)^2
$$

を持ちます。[複素線積分の基本定理](#thm-ca2-line-integral-ftc)により閉曲線 $\partial\Delta_n$ 上でこの二項の積分は0です。従って

$$
I(\Delta_n)
=
\int_{\partial\Delta_n}(z-z_*)\varepsilon(z)dz.
$$

$z,z_*\in\Delta_n$ なので

$$
|z-z_*|\le2^{-n}d_0.
$$

また

$$
\eta_n:=\sup_{z\in\Delta_n}|\varepsilon(z)|
$$

と置けば、$\operatorname{diam}(\Delta_n)\to0$ かつ $z_*\in\Delta_n$ なので $\eta_n\to0$ です。[ML評価](#thm-ca2-ml-estimate)から

$$
\begin{aligned}
|I(\Delta_n)|
&\le
(2^{-n}d_0)\eta_n(2^{-n}\ell_0)\\
&=4^{-n}d_0\ell_0\eta_n.
\end{aligned}
$$

一方 Step 1 から

$$
4^{-n}|I(\Delta_0)|
\le|I(\Delta_n)|.
$$

従って

$$
|I(\Delta_0)|
\le d_0\ell_0\eta_n.
$$

$n\to\infty$ とすると右辺は0へ収束するので $I(\Delta_0)=0$ です。$\square$
<!-- proof-end -->

**仮定の使用箇所**：正則性は Step 3 の一点 $z_*$ で一次近似を作るために使いました。$u_x,u_y,v_x,v_y$ の連続性は仮定していません。これが Goursat 型証明の要点です。

---

## 4. 星型領域では原始関数ができる

<a id="thm-ca2-star-shaped-cauchy"></a>
<!-- formal-statement-start -->
### 定理（星型領域の Cauchy の定理）

$\Omega$ を星型領域、$f$ を $\Omega$ 上正則とする。このとき $f$ は $\Omega$ 上原始関数を持つ。従って任意の区分的 $C^1$ 閉曲線 $\gamma\subset\Omega$ について

$$
\int_\gamma f(z)dz=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a$ を星の中心とします。$z\in\Omega$ に対し、$a$ から $z$ への線分

$$
\sigma_z(t)=a+t(z-a),
\qquad0\le t\le1
$$

を使って

$$
F(z):=\int_{\sigma_z}f(w)dw
$$

と定めます。

$z\in\Omega$ を固定します。$\Omega$ は開なので、ある $r>0$ があって

$$
D(z,r)\subset\Omega.
$$

$|h|<r$ とします。線分 $[z,z+h]$ の任意の点 $q$ は $D(z,r)$ に入ります。星型性から各 $q$ と $a$ を結ぶ線分 $[a,q]$ も $\Omega$ に含まれます。従って三角形

$$
\operatorname{conv}\{a,z,z+h\}
$$

全体が $\Omega$ に含まれます。

この三角形へ [三角形版 Cauchy–Goursat](#thm-ca2-cauchy-goursat-triangle) を適用すると、境界の向きをそろえて

$$
F(z+h)-F(z)
=
\int_{[z,z+h]}f(w)dw.
$$

右辺を $w=z+th$、$0\le t\le1$ とパラメータ化すると

$$
F(z+h)-F(z)
=h\int_0^1f(z+th)dt.
$$

$h\ne0$ で割り、$h\to0$ とします。$f$ は連続なので

$$
\int_0^1f(z+th)dt\to f(z).
$$

従って $F'(z)=f(z)$ です。よって $F$ は原始関数です。

最後に [原始関数・経路独立性・閉曲線積分0の同値](#thm-ca2-path-independence) を使えば、任意の閉曲線積分が0になります。$\square$
<!-- proof-end -->

---

## 5. 穴を検出する：$1/z$

CA1 で示したように $1/z$ は $\mathbb C\setminus\{0\}$ 上正則です。しかしこの領域では閉曲線積分が必ず0になるわけではありません。

単位円

$$
\gamma(t)=e^{it},
\qquad0\le t\le2\pi
$$

に対し

$$
\gamma'(t)=ie^{it}
$$

なので

$$
\begin{aligned}
\int_\gamma\frac{dz}{z}
&=\int_0^{2\pi}\frac{ie^{it}}{e^{it}}dt\\
&=\int_0^{2\pi}i\,dt\\
&=2\pi i.
\end{aligned}
$$

従って $1/z$ は $\mathbb C\setminus\{0\}$ 全体では原始関数を持ちません。問題は $1/z$ の局所正則性ではなく、曲線が0という穴を回り込める大域的形状です。

---

## 6. homotopy と単連結性

<a id="def-ca2-fixed-endpoint-homotopy"></a>
<!-- formal-statement-start -->
### 定義（端点固定 homotopy）

二つの曲線 $\gamma_0,\gamma_1:[0,1]\to\Omega$ が同じ始点 $p$ と終点 $q$ を持つとする。連続写像

$$
H:[0,1]^2\to\Omega
$$

が存在して

$$
H(0,t)=\gamma_0(t),
\qquad
H(1,t)=\gamma_1(t),
$$

$$
H(s,0)=p,
\qquad
H(s,1)=q
$$

を満たすとき、$\gamma_0$ と $\gamma_1$ は **端点を固定して homotopic** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-fixed-endpoint-homotopy -->
**定義の確認**：凸領域内の二曲線 $\gamma_0,\gamma_1$ が同じ端点を持つなら

$$
H(s,t)=(1-s)\gamma_0(t)+s\gamma_1(t)
$$

は領域内に留まり、端点固定 homotopy を与えます。
<!-- definition-example-end -->

<a id="def-ca2-simply-connected"></a>
<!-- formal-statement-start -->
### 定義（単連結領域）

領域 $\Omega$ が **単連結** であるとは、$\Omega$ が経路連結であり、任意の閉曲線 $\gamma:[0,1]\to\Omega$ が定値閉曲線へ homotopic であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-simply-connected -->
**定義の確認**：星型領域では

$$
H(s,t)=(1-s)\gamma(t)+sa
$$

で任意の閉曲線を星の中心 $a$ へ縮められるため単連結です。一方 $\mathbb C\setminus\{0\}$ は後の定理と $\int dz/z=2\pi i$ を組み合わせると単連結でないことが分かります。
<!-- definition-example-end -->

<a id="lem-ca2-homotopy-invariance"></a>
<!-- formal-statement-start -->
### 補題（正則関数の線積分は端点固定 homotopy で不変）

$\Omega$ を開集合、$f$ を $\Omega$ 上正則とする。同じ端点を持つ区分的 $C^1$ 曲線 $\gamma_0,\gamma_1$ が連続な端点固定 homotopy $H$ で結ばれているなら

$$
\int_{\gamma_0}f(z)dz
=
\int_{\gamma_1}f(z)dz.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

この証明では $H$ 自身を微分しません。連続 homotopy を細かい格子でサンプリングし、格子点同士を直線で結びます。

**Step 1：homotopy の像を有限個の局所原始関数領域で覆う。**

$$
K:=H([0,1]^2)
$$

と置きます。$[0,1]^2$ はコンパクトで $H$ は連続なので、[TOP5 で示した連続像によるコンパクト性の保存](../TOP5/index.md)から $K$ はコンパクトです。

各 $w\in K$ に対し $\Omega$ の開性から $r_w>0$ を取り

$$
\overline{D(w,2r_w)}\subset\Omega
$$

とできます。円板 $D(w,2r_w)$ は星型なので [星型領域の Cauchy の定理](#thm-ca2-star-shaped-cauchy) により $f$ はそこで原始関数を持ちます。

小さい円板 $D(w,r_w/2)$ は $K$ を覆います。$K$ のコンパクト性から有限個

$$
D(w_1,r_1/2),\dots,D(w_N,r_N/2)
$$

を選んで $K$ を覆えます。ここで

$$
\delta:=\min_{1\le j\le N}\frac{r_j}{2}>0
$$

と置きます。

**Step 2：パラメータ正方形を十分細かく分割する。**

$H$ の連続性と $[0,1]^2$ のコンパクト性から、次の一様な制御を直接作ります。各 $q\in[0,1]^2$ に対し、ある $\eta_q>0$ があって

$$
|q-q'|<\eta_q
\Longrightarrow
|H(q)-H(q')|<\frac{\delta}{2}.
$$

開球 $B(q,\eta_q/2)$ は正方形を覆うので、コンパクト性から有限部分被覆

$$
B(q_1,\eta_1/2),\dots,B(q_M,\eta_M/2)
$$

を取れます。

$$
\eta:=\min_{1\le k\le M}\frac{\eta_k}{2}>0
$$

とします。$|q-q'|<\eta$ なら、$q$ を含む $B(q_k,\eta_k/2)$ を選べて

$$
|q'-q_k|
\le|q'-q|+|q-q_k|
<\eta_k.
$$

よって

$$
|H(q)-H(q')|
\le|H(q)-H(q_k)|+|H(q_k)-H(q')|
<\delta.
$$

従って $H$ はこの意味で正方形全体に一様な細かさ $\eta$ を持ちます。

$m,n$ を十分大きく取り、格子の各小長方形の直径が $\eta$ 未満になるようにします。

**Step 3：各小長方形の四頂点を結ぶ積分は0。**

一つの格子小長方形 $Q$ を取り、その一頂点を $q$ とします。$H(q)\in K$ なので、ある $j$ が存在して

$$
H(q)\in D(w_j,r_j/2).
$$

$Q$ 内の任意の $q'$ は $|q-q'|<\eta$ なので

$$
|H(q')-H(q)|<\delta\le r_j/2.
$$

従って

$$
H(Q)\subset D(w_j,r_j).
$$

特に四頂点の像を直線で結んだ小四角形の全ての辺は、凸な円板 $D(w_j,r_j)$ に含まれます。$f$ はより大きい $D(w_j,2r_j)$ で原始関数を持つので、[複素線積分の基本定理](#thm-ca2-line-integral-ftc)からその小四角形の境界積分は0です。

**Step 4：全小長方形を足して内部辺を消す。**

各格子頂点 $(s_i,t_k)$ の像

$$
z_{ik}:=H(s_i,t_k)
$$

を隣接格子点同士で直線接続します。全小長方形の境界積分0を足すと、内部の各辺は逆向きに二度現れて相殺します。残るのは最下段・最上段・左右端だけです。

端点固定条件から

$$
H(s,0)=p,
\qquad
H(s,1)=q
$$

なので左右端に対応する格子辺は全て定値で積分0です。従って、下側の格子折れ線 $P_0$ と上側の格子折れ線 $P_1$ について

$$
\int_{P_0}f(z)dz
=
\int_{P_1}f(z)dz.
$$

**Step 5：格子折れ線を元の曲線へ戻す。**

下辺の各小区間 $[t_k,t_{k+1}]$ の像 $\gamma_0([t_k,t_{k+1}])$ も Step 3 と同じ円板 $D(w_j,r_j)$ に含まれます。その円板上で $f$ は原始関数を持つので、元の曲線片と両端を結ぶ直線片の積分は同じです。全区間を足して

$$
\int_{\gamma_0}f(z)dz
=
\int_{P_0}f(z)dz.
$$

同様に

$$
\int_{\gamma_1}f(z)dz
=
\int_{P_1}f(z)dz.
$$

Step 4 と合わせれば主張が従います。$\square$
<!-- proof-end -->

この証明でコンパクト性を使ったのは、無限に存在する局所原始関数領域と局所連続性を、有限個の半径と一つの格子幅へ圧縮する箇所です。homotopy の微分可能性は仮定していません。

<a id="thm-ca2-simply-connected-cauchy"></a>
<!-- formal-statement-start -->
### 定理（単連結領域の Cauchy の定理）

$\Omega$ を単連結領域、$f$ を $\Omega$ 上正則とする。このとき任意の区分的 $C^1$ 閉曲線 $\gamma\subset\Omega$ について

$$
\int_\gamma f(z)dz=0.
$$

従って $f$ は $\Omega$ 上原始関数を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

単連結性により $\gamma$ は定値閉曲線 $\gamma_*$ へ homotopic です。[正則関数の線積分は端点固定 homotopy で不変](#lem-ca2-homotopy-invariance)なので

$$
\int_\gamma f(z)dz
=
\int_{\gamma_*}f(z)dz
=0.
$$

$\Omega$ は経路連結なので、[原始関数・経路独立性・閉曲線積分0の同値](#thm-ca2-path-independence)から原始関数の存在が従います。$\square$
<!-- proof-end -->

この定理と前節の計算から、$\mathbb C\setminus\{0\}$ が単連結でないことも分かります。もし単連結なら正則関数 $1/z$ の単位円積分は0でなければなりませんが、実際には $2\pi i$ だからです。

---

## 7. 正則対数の枝

<a id="def-ca2-holomorphic-logarithm"></a>
<!-- formal-statement-start -->
### 定義（正則対数の枝）

$\Omega\subset\mathbb C\setminus\{0\}$ 上の正則関数 $L$ が

$$
e^{L(z)}=z
\qquad(z\in\Omega)
$$

を満たすとき、$L$ を $\Omega$ 上の **正則対数の枝** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-holomorphic-logarithm -->
**定義の確認**：正の実軸上では通常の実対数 $\log x$ がこの関係を満たします。しかし穿孔平面全体では正則対数の枝は存在しません。もし存在すれば微分して $L'(z)=1/z$ となり、$1/z$ が原始関数を持つことになって単位円積分 $2\pi i$ と矛盾します。
<!-- definition-example-end -->

<a id="thm-ca2-holomorphic-logarithm"></a>
<!-- formal-statement-start -->
### 定理（単連結領域上の正則対数）

$\Omega\subset\mathbb C\setminus\{0\}$ を単連結領域とする。このとき $\Omega$ 上に正則対数の枝 $L$ が存在し

$$
L'(z)=\frac1z
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$1/z$ は $\Omega$ 上正則です。[単連結領域の Cauchy の定理](#thm-ca2-simply-connected-cauchy)から原始関数 $G$ が存在して

$$
G'(z)=\frac1z
$$

となります。

基点 $z_0\in\Omega$ を一つ固定します。$z_0\ne0$ なので

$$
z_0=r_0(\cos\theta_0+i\sin\theta_0),
\qquad r_0>0
$$

と書けます。CA1 の複素指数関数の定義から

$$
a_0:=\log r_0+i\theta_0
$$

と置けば $e^{a_0}=z_0$ です。

$$
L(z):=G(z)-G(z_0)+a_0
$$

と定めます。明らかに

$$
L'(z)=G'(z)=\frac1z.
$$

残るのは $e^{L(z)}=z$ です。関数

$$
Q(z):=ze^{-L(z)}
$$

を考えます。CA1 の微分法則と $(e^w)'=e^w$ から

$$
\begin{aligned}
Q'(z)
&=e^{-L(z)}-zL'(z)e^{-L(z)}\\
&=e^{-L(z)}\left(1-z\frac1z\right)\\
&=0.
\end{aligned}
$$

$\Omega$ は連結なので [CA1 の導関数0なら連結開集合上で定数](../CA1/index.md#lem-ca1-zero-derivative-constant) から $Q$ は定数です。基点では

$$
Q(z_0)=z_0e^{-a_0}=1
$$

なので $Q\equiv1$。従って

$$
e^{L(z)}=z.
$$

$\square$
<!-- proof-end -->

**一意性について**：二つの枝 $L_1,L_2$ が同じ連結領域上にあれば

$$
e^{L_1-L_2}=1.
$$

各点で $L_1-L_2\in2\pi i\mathbb Z$ です。差は連続で値域が離散集合なので、連結性から一つの整数 $k$ があって

$$
L_1-L_2=2\pi ik
$$

となります。

---

## 8. 演習

### Level A

<a id="ex-ca2-a01"></a>
#### CA2-A01 線分上の $\int z\,dz$
- Level: A

線分 $0\to1+i$ に沿って

$$
\int_\gamma z\,dz
$$

を定義から計算せよ。

<!-- solution-start -->
**解答**：

$$
\gamma(t)=t(1+i),
\qquad0\le t\le1
$$

と取ると $\gamma'(t)=1+i$ です。従って

$$
\begin{aligned}
\int_\gamma z\,dz
&=\int_0^1t(1+i)(1+i)dt\\
&=(1+i)^2\int_0^1t\,dt\\
&=2i\cdot\frac12=i.
\end{aligned}
$$

原始関数 $z^2/2$ を使えば

$$
\frac{(1+i)^2}{2}-0=i
$$

とも確認できます。
<!-- solution-end -->

<a id="ex-ca2-a02"></a>
#### CA2-A02 単位円上の $z^n$
- Level: A

整数 $n$ に対し

$$
\int_{|z|=1}z^n dz
$$

を反時計回りに計算せよ。

<!-- solution-start -->
**解答**：$z=e^{it}$、$0\le t\le2\pi$ と置くと $dz=ie^{it}dt$ なので

$$
\int_{|z|=1}z^ndz
=i\int_0^{2\pi}e^{i(n+1)t}dt.
$$

$n\ne-1$ なら

$$
\begin{aligned}
i\int_0^{2\pi}e^{i(n+1)t}dt
&=
\frac{e^{i(n+1)2\pi}-1}{n+1}=0.
\end{aligned}
$$

一方 $n=-1$ なら integrand は $i$ なので

$$
\int_{|z|=1}\frac{dz}{z}=2\pi i.
$$

$n=-1$ だけが特別なのは、$z^{-1}$ が円板内部の0で正則でないためです。
<!-- solution-end -->

<a id="ex-ca2-a03"></a>
#### CA2-A03 逆向き曲線
- Level: A

任意の区分的 $C^1$ 曲線 $\gamma$ について

$$
\int_{\gamma^-}f(z)dz=-\int_\gamma f(z)dz
$$

を定義から示せ。

<!-- solution-start -->
**解答**：$\gamma:[a,b]\to\mathbb C$ とすると

$$
\gamma^-(t)=\gamma(a+b-t),
$$

$$
(\gamma^-)'(t)=-\gamma'(a+b-t).
$$

従って

$$
\begin{aligned}
\int_{\gamma^-}f(z)dz
&=-\int_a^bf(\gamma(a+b-t))\gamma'(a+b-t)dt.
\end{aligned}
$$

$s=a+b-t$ と置換すると元の積分の負号付きになります。向きを反転すると $dz$ 自体の向きが反転することが本質です。
<!-- solution-end -->

<a id="ex-ca2-a04"></a>
#### CA2-A04 円弧上の ML 評価
- Level: A

$$
\gamma(t)=Re^{it},
\qquad \alpha\le t\le\beta
$$

に沿う積分について

$$
\left|\int_\gamma e^z dz\right|
\le
R|\beta-\alpha|e^R
$$

を示せ。

<!-- solution-start -->
**解答**：円弧の長さは

$$
L(\gamma)=R|\beta-\alpha|.
$$

また $z=Re^{it}$ なら

$$
|e^z|=e^{\operatorname{Re}z}
=e^{R\cos t}
\le e^R.
$$

従って [ML評価](#thm-ca2-ml-estimate)から

$$
\left|\int_\gamma e^zdz\right|
\le e^R R|\beta-\alpha|.
$$

「被積分関数の最大サイズ × 曲線の長さ」という形がそのまま現れています。
<!-- solution-end -->

### Level B

<a id="ex-ca2-b01"></a>
#### CA2-B01 原始関数があれば閉曲線積分は0
- Level: B

$f$ が原始関数 $F$ を持つとき、任意の閉曲線 $\gamma$ で

$$
\int_\gamma f(z)dz=0
$$

となることを示せ。

<!-- solution-start -->
**解答**：[複素線積分の基本定理](#thm-ca2-line-integral-ftc)から

$$
\int_\gamma f(z)dz
=F(\gamma(b))-F(\gamma(a)).
$$

閉曲線では $\gamma(a)=\gamma(b)$ なので右辺は0です。曲線の形を一切使わず端点が同じことだけで消える点が、原始関数の強さです。
<!-- solution-end -->

<a id="ex-ca2-b02"></a>
#### CA2-B02 $1/z$ は穿孔平面で原始関数を持たない
- Level: B

$1/z$ が $\mathbb C\setminus\{0\}$ 上原始関数を持たないことを示せ。

<!-- solution-start -->
**解答**：単位円 $\gamma(t)=e^{it}$ に沿って

$$
\int_\gamma\frac{dz}{z}=2\pi i\ne0
$$

です。もし $1/z$ が穿孔平面全体で原始関数を持てば、B01 により全ての閉曲線積分は0でなければなりません。矛盾です。

局所的には $1/z$ は正則ですが、原始関数の大域的存在は領域の穴に妨げられます。
<!-- solution-end -->

<a id="ex-ca2-b03"></a>
#### CA2-B03 星型領域で基点積分から原始関数を作る
- Level: B

$\Omega$ が $a$ を中心とする星型領域、$f$ が正則とする。

$$
F(z)=\int_0^1f(a+t(z-a))(z-a)dt
$$

と置き、$F'(z)=f(z)$ を示せ。

<!-- solution-start -->
**解答**：$F(z)$ は $a$ から $z$ への線分積分です。$z$ の近くの $z+h$ を取ると、星型性と $\Omega$ の開性により三角形 $\operatorname{conv}\{a,z,z+h\}$ を $\Omega$ 内に入れられます。

[三角形版 Cauchy–Goursat](#thm-ca2-cauchy-goursat-triangle)から

$$
F(z+h)-F(z)
=
\int_{[z,z+h]}f(w)dw.
$$

$w=z+th$ と置けば

$$
\frac{F(z+h)-F(z)}h
=
\int_0^1f(z+th)dt.
$$

$f$ の連続性から右辺は $h\to0$ で $f(z)$ へ収束するので

$$
F'(z)=f(z).
$$

この構成の核心は「基点からの線分が領域内に残る」だけでなく、近い二点 $z,z+h$ と基点で作る小三角形全体も領域内に入ることです。
<!-- solution-end -->

### Level C

<a id="ex-ca2-c01"></a>
#### CA2-C01 切断平面上の主値対数
- Level: C

$$
\Omega=\mathbb C\setminus(-\infty,0]
$$

上で、$L(1)=0$ を満たす正則対数の枝を構成し、これが通常の主値対数

$$
\operatorname{Log}z
=
\log|z|+i\operatorname{Arg}z,
\qquad -\pi<\operatorname{Arg}z<\pi
$$

に一致することを説明せよ。

<!-- solution-start -->
**解答**：まず $\Omega$ は1を中心に星型です。実際 $z\in\Omega$ とし

$$
q_t=(1-t)+tz,
\qquad0\le t\le1
$$

とします。$\operatorname{Im}z\ne0$ なら $0<t\le1$ で $\operatorname{Im}q_t=t\operatorname{Im}z\ne0$ なので $q_t$ は負の実軸上にありません。$z>0$ が実数なら線分は正の実軸上にあります。従って全線分が $\Omega$ に含まれます。

よって [星型領域の Cauchy の定理](#thm-ca2-star-shaped-cauchy)から $1/z$ は $\Omega$ 上原始関数を持ちます。$G'(z)=1/z$ で $G(1)=0$ となるよう定数を調整します。

$$
Q(z)=ze^{-G(z)}
$$

と置けば、本文の正則対数の証明と同じ計算で $Q'(z)=0$ です。$\Omega$ は連結なので $Q$ は定数、$Q(1)=1$ から

$$
e^{G(z)}=z.
$$

従って $G$ は正則対数の枝です。

一方任意の $z\in\Omega$ は一意に

$$
z=re^{i\theta},
\qquad r>0,\quad -\pi<\theta<\pi
$$

と書けます。そこで

$$
P(z)=\log r+i\theta
$$

と置けば $e^{P(z)}=z$ かつ $P(1)=0$ です。連結領域上で二つの対数の枝の差は $2\pi i$ の整数倍の定数ですが、1で差が0なので

$$
G=P.
$$

従って

$$
G(z)=\log|z|+i\operatorname{Arg}z
$$

であり、これが主値対数です。
<!-- solution-end -->

---

## 9. この章で得たもの

- 複素線積分は曲線の向きには依存するが、向きを保つ再パラメータ化には依存しない。
- ML評価は「関数の大きさ × 曲線長」で積分を支配する。
- 原始関数の存在、経路独立性、全閉曲線積分0は経路連結領域で同値である。
- 三角形版 Cauchy–Goursat は4分割と一点での正則一次近似だけから証明できる。
- 星型性は基点線積分から原始関数を直接作れる十分条件である。
- 単連結性は閉曲線を縮められる大域的条件で、局所原始関数とコンパクトな homotopy の有限分割を通じて閉曲線積分0へ変換される。
- $1/z$ の単位円積分 $2\pi i$ は穿孔平面の穴を検出する。
- 単連結な $\Omega\subset\mathbb C\setminus\{0\}$ では $1/z$ の原始関数から正則対数の枝を構成できる。

次章 CA3 では Cauchy 積分公式から高階導関数・Taylor 展開・Liouville の定理へ進みます。
