# CA2 標準複素解析 II：複素線積分・原始関数・Cauchy–Goursat

<!-- definition-example-audit: strict -->

CA1 では一点の差商から正則性を調べました。本章では、その局所情報を曲線に沿って積み上げます。中心になる問いは「正則関数を閉曲線に沿って積分すると、なぜ0になるのか」です。

本章では

```text
区分的 C^1 曲線と複素線積分
  ↓ 再パラメータ化・向き・連結・ML評価
原始関数 ⇒ 積分は端点差
  ↓
経路独立性 ⇔ 全閉曲線積分0 ⇔ 原始関数
  ↓
三角形版 Cauchy–Goursat
  ↓ 4分割反復と一点での複素微分可能性だけを使う
星型領域で原始関数を構成
  ↓
局所原始関数・曲線の多角形化
  ↓
ホモトピー不変性・単連結領域の Cauchy の定理
  ↓
正則対数の枝
```

という順で進みます。

既知とするのは、[CA1 の正則関数と複素微分](../CA1/index.md)、[RA4 の Riemann 積分・微積分学の基本定理](../RA4/index.md)、[TOP3 の連結性・弧状連結性](../TOP3/index.md)、[TOP5 のコンパクト性](../TOP5/index.md)です。Cauchy積分公式、Liouvilleの定理、最大値原理は CA3 へ残し、本章の証明には使いません。

---

## 1. 曲線・向き・複素線積分

<a id="def-ca2-piecewise-c1-curve"></a>
<!-- formal-statement-start -->
### 定義（区分的 C1 曲線）

開集合 $\Omega\subset\mathbb C$ とする。連続写像

$$
\gamma:[a,b]\to\Omega
$$

について、分割

$$
a=t_0<t_1<\cdots<t_m=b
$$

があり、各閉区間 $[t_{j-1},t_j]$ 上で $\gamma$ が $C^1$ 級であるとき、$\gamma$ を **区分的 $C^1$ 曲線** という。

始点は $\gamma(a)$、終点は $\gamma(b)$ であり、パラメータが $a$ から $b$ へ増える向きを曲線の向きとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-piecewise-c1-curve -->
**定義の確認**：折れ線 $0\to1\to1+i$ は、各線分を別々の $C^1$ 区間としてつなげれば区分的 $C^1$ 曲線です。折れ曲がる点で導関数が存在しなくても構いません。
<!-- definition-example-end -->

曲線の逆向きを

$$
\gamma^{-}(t)=\gamma(a+b-t)
$$

で定めます。また $\gamma_1$ の終点と $\gamma_2$ の始点が一致するとき、速度を適当に線形変更して順につないだ曲線を $\gamma_1*\gamma_2$ と書きます。

<a id="def-ca2-line-integral"></a>
<!-- formal-statement-start -->
### 定義（複素線積分）

$f:\Omega\to\mathbb C$ を連続、$\gamma:[a,b]\to\Omega$ を区分的 $C^1$ 曲線とする。分割の各区間で

$$
\int_\gamma f(z)\,dz
:=
\sum_{j=1}^m
\int_{t_{j-1}}^{t_j}
 f(\gamma(t))\gamma'(t)\,dt
$$

と定義する。右辺の複素数値積分は実部・虚部をそれぞれ Riemann 積分して定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-line-integral -->
**定義の確認**：線分 $0\to1+i$ を $\gamma(t)=t(1+i)$、$0\le t\le1$ とすると

$$
\int_\gamma z\,dz
=
\int_0^1 t(1+i)(1+i)\,dt
=
\int_0^1 2it\,dt
=i.
$$

複素線積分は「曲線上の点 $\gamma(t)$」だけでなく、その向きを表す $\gamma'(t)$ も掛けて積分します。
<!-- definition-example-end -->

<a id="def-ca2-curve-length"></a>
<!-- formal-statement-start -->
### 定義（曲線長）

区分的 $C^1$ 曲線 $\gamma$ の長さを

$$
L(\gamma)
:=
\sum_{j=1}^m
\int_{t_{j-1}}^{t_j}|\gamma'(t)|\,dt
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-curve-length -->
**定義の確認**：$\gamma(t)=Re^{it}$、$\alpha\le t\le\beta$ では $|\gamma'(t)|=R$ なので

$$
L(\gamma)=R(\beta-\alpha).
$$
<!-- definition-example-end -->

<a id="thm-ca2-reparam-ml"></a>
<!-- formal-statement-start -->
### 定理（再パラメータ化・向き・ML評価）

$f$ を $\gamma$ の像を含む開集合上の連続関数とする。

1. $\phi:[c,d]\to[a,b]$ が向きを保つ区分的 $C^1$ の再パラメータ化、すなわち増加する全単射で各滑らかな区間で通常の変数変換が使えるなら
   $$
   \int_{\gamma\circ\phi} f(z)\,dz
   =
   \int_\gamma f(z)\,dz.
   $$
2. 逆向きでは
   $$
   \int_{\gamma^-}f(z)\,dz
   =-
   \int_\gamma f(z)\,dz.
   $$
3. 連結では
   $$
   \int_{\gamma_1*\gamma_2}f(z)\,dz
   =
   \int_{\gamma_1}f(z)\,dz
   +
   \int_{\gamma_2}f(z)\,dz.
   $$
4. $M=\max_{t\in[a,b]}|f(\gamma(t))|$ とすると
   $$
   \left|\int_\gamma f(z)\,dz\right|
   \le M L(\gamma).
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず滑らかな一つの区間で考えます。$u=\phi(s)$ と置けば

$$
(\gamma\circ\phi)'(s)
=\gamma'(\phi(s))\phi'(s),
$$

したがって実積分の変数変換により

$$
\begin{aligned}
\int_c^d
 f(\gamma(\phi(s)))
 \gamma'(\phi(s))\phi'(s)\,ds
&=
\int_a^b f(\gamma(u))\gamma'(u)\,du.
\end{aligned}
$$

区分的な場合は共通細分を取って各区間で足し合わせればよいので、積分値は向きを保つ再パラメータ化に依存しません。

逆向きでは $u=a+b-t$ と置くと $du=-dt$ であり、積分区間の端も交換されるので符号が一回だけ反転します。連結については、二つのパラメータ区間に積分を分ければそのまま和になります。

最後に、$\gamma([a,b])$ はコンパクトで $f$ は連続なので $|f|$ は最大値 $M$ を持ちます。複素積分の三角不等式から

$$
\begin{aligned}
\left|\int_\gamma f(z)\,dz\right|
&\le
\sum_j\int_{t_{j-1}}^{t_j}
|f(\gamma(t))|\,|\gamma'(t)|\,dt\\
&\le
M\sum_j\int_{t_{j-1}}^{t_j}|\gamma'(t)|\,dt\\
&=ML(\gamma).
\end{aligned}
$$

これが ML 評価です。$\square$
<!-- proof-end -->

**注意**：曲線の像が同じでも、向きが逆なら積分は反対符号になります。「同じ図形をなぞっているから同じ積分」と考えてはいけません。

---

## 2. 原始関数と複素線積分の基本定理

<a id="def-ca2-primitive"></a>
<!-- formal-statement-start -->
### 定義（原始関数）

$f:\Omega\to\mathbb C$ に対し、正則関数 $F:\Omega\to\mathbb C$ が

$$
F'(z)=f(z)
\qquad(z\in\Omega)
$$

を満たすとき、$F$ を $f$ の **原始関数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-primitive -->
**定義の確認**：$f(z)=z^n$、$n\ge0$ なら

$$
F(z)=\frac{z^{n+1}}{n+1}
$$

が原始関数です。一方 $1/z$ が $\mathbb C\setminus\{0\}$ 全体で原始関数を持たないことは後で閉曲線積分から示します。
<!-- definition-example-end -->

<a id="thm-ca2-fundamental-theorem"></a>
<!-- formal-statement-start -->
### 定理（複素線積分の基本定理）

$f$ が $\Omega$ 上で原始関数 $F$ を持つとする。任意の区分的 $C^1$ 曲線 $\gamma:[a,b]\to\Omega$ に対して

$$
\int_\gamma f(z)\,dz
=
F(\gamma(b))-F(\gamma(a)).
$$

特に $\gamma(a)=\gamma(b)$ なら積分は0である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\gamma$ が $C^1$ である一つの区間を考えます。CA1 の複素微分の定義から

$$
F(w+k)-F(w)=F'(w)k+o(|k|)
$$

です。$w=\gamma(t)$、$k=\gamma(t+h)-\gamma(t)$ とすると

$$
k=\gamma'(t)h+o(|h|).
$$

よって

$$
\frac{F(\gamma(t+h))-F(\gamma(t))}{h}
\to
F'(\gamma(t))\gamma'(t)
=f(\gamma(t))\gamma'(t).
$$

したがって実変数関数 $F\circ\gamma$ の導関数は

$$
(F\circ\gamma)'(t)
=f(\gamma(t))\gamma'(t)
$$

です。[RA4 の微積分学の基本定理](../RA4/index.md)を実部・虚部に適用すると

$$
\int_a^b f(\gamma(t))\gamma'(t)\,dt
=F(\gamma(b))-F(\gamma(a)).
$$

区分的 $C^1$ の場合は各区間の端点差を足します。中間点の $F$ の値は望遠鏡和で相殺され、始点と終点だけが残ります。閉曲線なら両者が同じなので0です。$\square$
<!-- proof-end -->

---

## 3. 経路独立性と原始関数

<a id="def-ca2-path-independence"></a>
<!-- formal-statement-start -->
### 定義（経路独立性）

$\Omega$ を経路連結な開集合、$f:\Omega\to\mathbb C$ を連続とする。同じ始点・終点を持つ任意の区分的 $C^1$ 曲線 $\gamma_1,\gamma_2$ に対して

$$
\int_{\gamma_1}f(z)\,dz
=
\int_{\gamma_2}f(z)\,dz
$$

が成り立つとき、$f$ の線積分は **経路独立** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-path-independence -->
**定義の確認**：$f(z)=2z$ には原始関数 $z^2$ があるので、$0$ から $1+i$ へ直線で行っても折れ線で行っても積分値は $(1+i)^2=2i$ です。
<!-- definition-example-end -->

<a id="thm-ca2-path-independence-primitive"></a>
<!-- formal-statement-start -->
### 定理（経路独立性・閉曲線積分・原始関数の同値）

$\Omega$ を経路連結な開集合、$f:\Omega\to\mathbb C$ を連続とする。次は同値である。

1. $f$ は $\Omega$ 上で原始関数を持つ。
2. 任意の閉じた区分的 $C^1$ 曲線 $\gamma$ に対して
   $$
   \int_\gamma f(z)\,dz=0.
   $$
3. $f$ の線積分は経路独立である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**(1) ⇒ (2)** は [複素線積分の基本定理](#thm-ca2-fundamental-theorem) の閉曲線の場合です。

**(2) ⇒ (3)**。同じ始点 $p$ と終点 $q$ を持つ曲線 $\gamma_1,\gamma_2$ を取ります。$\gamma_1*\gamma_2^-$ は閉曲線なので

$$
0
=
\int_{\gamma_1*\gamma_2^-}f\,dz
=
\int_{\gamma_1}f\,dz-
\int_{\gamma_2}f\,dz.
$$

従って二つの積分は等しいです。

**(3) ⇒ (1)**。基点 $z_*\in\Omega$ を固定し、$z\in\Omega$ に対し $z_*$ から $z$ への区分的 $C^1$ 曲線を一本取り

$$
F(z)=\int_{z_*}^{z}f(\zeta)\,d\zeta
$$

と定めます。経路独立性によりこれは曲線の選び方に依存しません。

$z\in\Omega$ を固定します。$\Omega$ は開集合なので、ある $r>0$ があって $B(z,r)\subset\Omega$ です。$|h|<r$ なら、$z$ までの任意の経路の後ろに線分 $[z,z+h]$ を付けてよいので

$$
F(z+h)-F(z)
=
\int_{[z,z+h]}f(\zeta)\,d\zeta.
$$

$\zeta=z+th$、$0\le t\le1$ と置けば

$$
\frac{F(z+h)-F(z)}{h}
=
\int_0^1 f(z+th)\,dt.
$$

$f$ の連続性から右辺は $h\to0$ で $f(z)$ へ収束します。従って $F'(z)=f(z)$ です。任意の $z$ で成り立つので $F$ は原始関数です。$\square$
<!-- proof-end -->

この定理は「閉曲線積分が0」を示せれば、原始関数を実際に作れることを意味します。Cauchy–Goursat の役割は、正則性からこの閉曲線積分の消滅を導くことです。

---

## 4. 三角形版 Cauchy–Goursat

<a id="thm-ca2-goursat-triangle"></a>
<!-- formal-statement-start -->
### 定理（三角形版 Cauchy–Goursat）

$\Delta$ を閉三角形とし、$\Delta\subset\Omega$ とする。$f$ が開集合 $\Omega$ 上正則なら、$\partial\Delta$ を正の向きに一周する境界曲線に対して

$$
\int_{\partial\Delta}f(z)\,dz=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
I(\Delta)=\int_{\partial\Delta}f(z)\,dz
$$

と書きます。三辺の中点を結んで $\Delta$ を相似比 $1/2$ の四つの三角形 $\Delta_1,\dots,\Delta_4$ に分けます。各小三角形の境界を正向きに取ると、内部の辺は二つの三角形から互いに逆向きに一度ずつ現れるため相殺されます。したがって

$$
I(\Delta)=\sum_{j=1}^4I(\Delta_j).
$$

ゆえに少なくとも一つは

$$
|I(\Delta_j)|\ge\frac14|I(\Delta)|
$$

を満たします。その一つを $T_1$ とし、同じ操作を反復して

$$
T_0=\Delta\supset T_1\supset T_2\supset\cdots
$$

を取り、

$$
|I(T_n)|\ge4^{-n}|I(T_0)|
$$

とします。$T_n$ の周長を $\ell_n$、直径を $d_n$ とすれば相似比から

$$
\ell_n=2^{-n}\ell_0,
\qquad
d_n=2^{-n}d_0.
$$

閉三角形はコンパクトで入れ子になり、直径が0へ収束するので、共通部分は一点 $z_0$ だけです。特に $z_0\in T_n$ が全ての $n$ で成り立ちます。

$f$ は $z_0$ で複素微分可能なので

$$
f(z)
=f(z_0)+f'(z_0)(z-z_0)+(z-z_0)\varepsilon(z),
$$

ただし $\varepsilon(z_0)=0$ と定めれば $z\to z_0$ で $\varepsilon(z)\to0$ と書けます。

定数関数には原始関数 $f(z_0)z$ があり、一次関数 $f'(z_0)(z-z_0)$ には原始関数

$$
\frac{f'(z_0)}2(z-z_0)^2
$$

があります。従って [複素線積分の基本定理](#thm-ca2-fundamental-theorem) により、これら二項の $\partial T_n$ 上の積分は0です。したがって

$$
I(T_n)
=
\int_{\partial T_n}(z-z_0)\varepsilon(z)\,dz.
$$

$T_n$ 上では $|z-z_0|\le d_n$ です。さらに

$$
\eta_n=\max_{z\in T_n}|\varepsilon(z)|
$$

と置けば、$T_n$ の直径が0へ縮み $z_0\in T_n$ なので $\eta_n\to0$ です。[ML評価](#thm-ca2-reparam-ml) から

$$
|I(T_n)|
\le d_n\eta_n\ell_n
=4^{-n}d_0\ell_0\eta_n.
$$

一方、選び方から

$$
4^{-n}|I(T_0)|\le|I(T_n)|.
$$

両者を合わせて $4^{-n}$ を消すと

$$
|I(T_0)|\le d_0\ell_0\eta_n.
$$

$n\to\infty$ で右辺は0へ行くので $I(T_0)=0$ です。$\square$
<!-- proof-end -->

この証明で使った正則性は、最後に得た一点 $z_0$ での一次近似です。$f'$ の連続性は仮定していません。ここが Cauchy の定理を $C^1$ 仮定なしで得る Goursat 型証明の核心です。

---

## 5. 星型領域の Cauchy の定理

<a id="def-ca2-star-shaped"></a>
<!-- formal-statement-start -->
### 定義（星型領域）

領域 $\Omega\subset\mathbb C$ が **星型** であるとは、ある $a\in\Omega$ が存在して、任意の $z\in\Omega$ について線分

$$
[a,z]
=
\{(1-t)a+tz:0\le t\le1\}
$$

が $\Omega$ に含まれることをいう。この $a$ を星型中心と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-star-shaped -->
**定義の確認**：円板、半平面、凸領域は星型です。凸領域では任意の点を中心にできます。一方 $\mathbb C\setminus\{0\}$ は星型ではありません。どの中心を選んでも、反対側の十分遠い点への線分が0を通るように選べます。
<!-- definition-example-end -->

<a id="thm-ca2-cauchy-star-shaped"></a>
<!-- formal-statement-start -->
### 定理（星型領域の Cauchy の定理）

$\Omega$ を星型領域、$f$ を $\Omega$ 上正則とする。このとき $f$ は $\Omega$ 上で原始関数を持つ。従って任意の閉じた区分的 $C^1$ 曲線 $\gamma\subset\Omega$ に対して

$$
\int_\gamma f(z)\,dz=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

星型中心を $a$ とし、$z\in\Omega$ に対して

$$
F(z)=\int_{[a,z]}f(\zeta)\,d\zeta
$$

と定めます。$F'(z)=f(z)$ を示します。

$z\in\Omega$ を固定します。開性から $\overline{B(z,r)}\subset\Omega$ となる $r>0$ を取れます。$|h|<r$ とします。線分 $[z,z+h]$ はこの円板に含まれます。また $w\in[z,z+h]$ なら $w\in\Omega$ なので、星型性から $[a,w]\subset\Omega$ です。従って三角形 $\Delta(a,z,z+h)$ 全体は

$$
\bigcup_{w\in[z,z+h]}[a,w]
$$

として $\Omega$ に含まれます。

[三角形版 Cauchy–Goursat](#thm-ca2-goursat-triangle) をこの三角形へ適用すると

$$
\int_{[a,z]}f\,d\zeta
+
\int_{[z,z+h]}f\,d\zeta
-
\int_{[a,z+h]}f\,d\zeta
=0.
$$

従って

$$
F(z+h)-F(z)
=
\int_{[z,z+h]}f(\zeta)\,d\zeta.
$$

$\zeta=z+th$ と置けば

$$
\frac{F(z+h)-F(z)}h
=
\int_0^1f(z+th)\,dt.
$$

$f$ の連続性から右辺は $h\to0$ で $f(z)$ へ収束します。よって $F'(z)=f(z)$。したがって $F$ は原始関数です。閉曲線積分が0であることは [複素線積分の基本定理](#thm-ca2-fundamental-theorem) から従います。$\square$
<!-- proof-end -->

<a id="cor-ca2-local-primitive"></a>
<!-- formal-statement-start -->
### 系（局所原始関数）

$f$ が領域 $\Omega$ 上正則なら、各点 $z_0\in\Omega$ のある円板近傍 $B(z_0,r)\subset\Omega$ 上で $f$ は原始関数を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

円板は中心 $z_0$ に関して星型なので [星型領域の Cauchy の定理](#thm-ca2-cauchy-star-shaped) を適用すればよいです。$\square$
<!-- proof-end -->

---

## 6. 穴を検出する積分

単位円 $\gamma(t)=e^{it}$、$0\le t\le2\pi$ を正向きに一周します。$dz=ie^{it}dt$ なので

$$
\int_\gamma\frac{dz}{z}
=
\int_0^{2\pi}\frac{ie^{it}}{e^{it}}\,dt
=2\pi i.
$$

従って $1/z$ は $\mathbb C\setminus\{0\}$ 全体では原始関数を持ちません。もし持てば [複素線積分の基本定理](#thm-ca2-fundamental-theorem) により単位円積分は0になるはずだからです。

一方、0を含まない十分小さい円板では局所原始関数を持ちます。障害は局所微分ではなく、穴を一周する大域的な経路にあります。

---

## 7. ホモトピーと単連結性

<a id="def-ca2-fixed-endpoint-homotopy"></a>
<!-- formal-statement-start -->
### 定義（端点固定ホモトピー）

同じ始点 $p$ と終点 $q$ を持つ曲線 $\gamma_0,\gamma_1:[0,1]\to\Omega$ が **端点を固定してホモトピック** であるとは、連続写像

$$
H:[0,1]^2\to\Omega
$$

が存在し

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

を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-fixed-endpoint-homotopy -->
**定義の確認**：凸領域で同じ端点を持つ二曲線 $\gamma_0,\gamma_1$ なら

$$
H(s,t)=(1-s)\gamma_0(t)+s\gamma_1(t)
$$

が領域内に残るので端点固定ホモトピーになります。
<!-- definition-example-end -->

<a id="def-ca2-simply-connected"></a>
<!-- formal-statement-start -->
### 定義（単連結領域）

領域 $\Omega$ が **単連結** であるとは、$\Omega$ が経路連結で、任意の閉曲線が定値閉曲線へホモトピックであることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-simply-connected -->
**定義の確認**：星型領域では閉曲線 $\gamma$ と星型中心 $a$ に対し

$$
H(s,t)=(1-s)\gamma(t)+sa
$$

が縮約を与えるので単連結です。$\mathbb C\setminus\{0\}$ は後のホモトピー不変性と $\int dz/z=2\pi i$ から単連結でないと分かります。
<!-- definition-example-end -->

一般の連続ホモトピーには微分可能性を仮定していません。そのため「$H$ を微分して二重積分する」という証明は採りません。代わりに、局所原始関数と区分線形近似を使います。

<a id="lem-ca2-polygonal-replacement"></a>
<!-- formal-statement-start -->
### 補題（曲線の多角形化）

$f$ を領域 $\Omega$ 上正則、$\gamma:[0,1]\to\Omega$ を区分的 $C^1$ 曲線とする。$\gamma$ と同じ端点を持つ多角形曲線 $P$ で

$$
\int_\gamma f(z)\,dz
=
\int_P f(z)\,dz
$$

を満たし、しかも $\gamma$ と $P$ が端点を固定してホモトピックになるものを取れる。閉曲線なら $P$ も閉曲線に取れる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $t\in[0,1]$ について、[局所原始関数](#cor-ca2-local-primitive) を持つ円板 $D_t$ を $\gamma(t)$ のまわりに取り、その閉包が $\Omega$ に入るよう小さくします。逆像 $\gamma^{-1}(D_t)$ は $[0,1]$ の開被覆をなすので、コンパクト性から有限部分被覆を取れます。さらにこの有限開被覆には Lebesgue 数 $\lambda>0$ があり、長さが $\lambda$ 未満の任意の部分区間はどれか一つの $\gamma^{-1}(D_t)$ に含まれます。

従って分割

$$
0=t_0<t_1<\cdots<t_N=1
$$

の幅をすべて $\lambda$ 未満に取れば、各小区間の像 $\gamma([t_{j-1},t_j])$ が一つの円板 $D_j$ に含まれます。端点 $\gamma(t_{j-1}),\gamma(t_j)$ を直線で結び、これらの弦をつないだ多角形曲線を $P$ とします。円板は凸なので弦も $D_j$ に含まれます。

$D_j$ 上では $f$ に原始関数があるため、[複素線積分の基本定理](#thm-ca2-fundamental-theorem) により、元の小弧と弦の積分は同じ端点差です。各 $j$ で足すと

$$
\int_\gamma f\,dz=\int_Pf\,dz.
$$

さらに各小区間で小弧と弦の間を直線補間すると、その像は凸円板 $D_j$ 内に残ります。端点では補間が一致するので、これらをつなげれば $\gamma$ と $P$ の端点固定ホモトピーになります。$\square$
<!-- proof-end -->

<a id="lem-ca2-relative-pl-homotopy"></a>
<!-- formal-statement-start -->
### 補題（ホモトピーの相対区分線形化）

多角形曲線 $P_0,P_1$ が端点を固定して連続ホモトピー $H:[0,1]^2\to\Omega$ で結ばれているとする。このとき正方形を有限個の三角形へ細分し、各三角形上でアフィンな写像 $\widetilde H:[0,1]^2\to\Omega$ で、境界上では $H$ と同じ多角形曲線・固定端点を与えるものを取れる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$K=H([0,1]^2)$ はコンパクトで $K\subset\Omega$ です。$\Omega=\mathbb C$ なら以下の距離制約は不要なので任意の正数を取ります。そうでなければ $K$ と閉集合 $\mathbb C\setminus\Omega$ は交わらないため

$$
\delta=\operatorname{dist}(K,\mathbb C\setminus\Omega)>0
$$

です。

$H$ はコンパクトな正方形上で一様連続です。従って正方形を十分細かい格子へ分け、さらに各小正方形を二つの三角形に分ければ、同じ小三角形の任意の二頂点 $v,w$ について

$$
|H(v)-H(w)|<\frac\delta3
$$

とできます。境界の格子点には $P_0,P_1$ の折れ点を全て含めるよう細分します。

各頂点 $v$ で $\widetilde H(v)=H(v)$ と置き、各小三角形の内部では三頂点の値を重心座標でアフィンに補間します。一つの頂点 $v_0$ を固定します。ある $a_0,a_1,a_2\ge0$、$a_0+a_1+a_2=1$ を用いて

$$
\widetilde H(x)=a_0H(v_0)+a_1H(v_1)+a_2H(v_2)
$$

と書けるので、

$$
\begin{aligned}
|\widetilde H(x)-H(v_0)|
&=|a_1(H(v_1)-H(v_0))+a_2(H(v_2)-H(v_0))|\\
&\le a_1|H(v_1)-H(v_0)|+a_2|H(v_2)-H(v_0)|\\
&<\frac\delta3.
\end{aligned}
$$

従って $\widetilde H(x)$ は $K$ の $\delta$ 近傍にあり、$\Omega$ から出ません。

境界では $P_0,P_1$ はもともと各小区間上で線形で、固定端点を表す辺は定値です。したがって頂点値の線形補間は境界データそのものと一致します。これで相対境界つきの区分線形ホモトピーが得られました。$\square$
<!-- proof-end -->

<a id="thm-ca2-homotopy-invariance"></a>
<!-- formal-statement-start -->
### 定理（正則線積分のホモトピー不変性）

$f$ を領域 $\Omega$ 上正則とする。同じ端点を持つ区分的 $C^1$ 曲線 $\gamma_0,\gamma_1$ が端点を固定してホモトピックなら

$$
\int_{\gamma_0}f(z)\,dz
=
\int_{\gamma_1}f(z)\,dz.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[曲線の多角形化](#lem-ca2-polygonal-replacement) により $\gamma_0,\gamma_1$ を、それぞれ積分値を変えず、かつ端点固定ホモトピーで結ばれた多角形曲線 $P_0,P_1$ に置き換えられます。ホモトピーをつなげれば $P_0$ と $P_1$ も端点固定でホモトピックです。

[ホモトピーの相対区分線形化](#lem-ca2-relative-pl-homotopy) により、そのホモトピーを有限三角形分割上の区分線形写像 $\widetilde H$ にできます。

各パラメータ三角形 $\tau$ の像 $\widetilde H(\tau)$ は、三頂点の像を頂点とする通常の三角形または退化三角形で、全体が $\Omega$ に含まれます。非退化なら [三角形版 Cauchy–Goursat](#thm-ca2-goursat-triangle) からその境界積分は0です。退化した場合も辺が往復して相殺するので0です。

全小三角形の境界積分を向きをそろえて足します。内部辺は必ず二つの小三角形に互いに逆向きで共有されるため完全に相殺されます。正方形の外周だけが残ります。端点を固定した二本の側辺は定値曲線なので寄与は0です。残る二辺は $P_0$ と $P_1$ で向きが逆です。従って

$$
0=
\int_{P_0}f\,dz-
\int_{P_1}f\,dz.
$$

元の曲線との積分値一致を戻せば

$$
\int_{\gamma_0}f\,dz
=
\int_{\gamma_1}f\,dz.
$$

ここではホモトピーを微分していません。連続ホモトピーをコンパクト性で有限の区分線形問題へ落とし、三角形版 Goursat を有限回足しただけです。$\square$
<!-- proof-end -->

<a id="thm-ca2-cauchy-simply-connected"></a>
<!-- formal-statement-start -->
### 定理（単連結領域の Cauchy の定理）

$\Omega$ を単連結領域、$f$ を $\Omega$ 上正則とする。任意の閉じた区分的 $C^1$ 曲線 $\gamma$ に対して

$$
\int_\gamma f(z)\,dz=0.
$$

従って $f$ は $\Omega$ 上で原始関数を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

単連結性により $\gamma$ は定値閉曲線 $c$ へホモトピックです。[正則線積分のホモトピー不変性](#thm-ca2-homotopy-invariance) から

$$
\int_\gamma f\,dz
=
\int_cf\,dz
=0.
$$

$\Omega$ は定義により経路連結なので、[経路独立性・閉曲線積分・原始関数の同値](#thm-ca2-path-independence-primitive) から $f$ は原始関数を持ちます。$\square$
<!-- proof-end -->

この定理の「単連結だから0」の一行の裏側は、上の二補題と三角形分割です。単連結性は、閉曲線を連続に縮められることを供給し、正則性はその縮約を有限三角形へ落とした各ピースの境界積分を0にします。

---

## 8. 正則対数の枝

<a id="def-ca2-holomorphic-logarithm"></a>
<!-- formal-statement-start -->
### 定義（正則対数の枝）

$\Omega\subset\mathbb C\setminus\{0\}$ とする。正則関数 $L:\Omega\to\mathbb C$ が

$$
e^{L(z)}=z
\qquad(z\in\Omega)
$$

を満たすとき、$L$ を $\Omega$ 上の **正則対数の枝** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca2-holomorphic-logarithm -->
**定義の確認**：正の実軸上では通常の実対数 $\log x$ が指数関数の逆です。複素平面では $e^{w+2\pi i}=e^w$ なので対数は一価にはできません。領域を適切に制限して一つの連続な値を選ぶのが「枝」です。
<!-- definition-example-end -->

<a id="thm-ca2-holomorphic-log-branch"></a>
<!-- formal-statement-start -->
### 定理（単連結領域上の正則対数）

$\Omega\subset\mathbb C\setminus\{0\}$ を単連結領域とする。このとき $\Omega$ 上に正則対数の枝が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f(z)=1/z$ は $\Omega$ 上正則です。[単連結領域の Cauchy の定理](#thm-ca2-cauchy-simply-connected) により原始関数 $G$ が存在し

$$
G'(z)=\frac1z
$$

です。

$$
Q(z)=z e^{-G(z)}
$$

と置きます。CA1 の微分法則と複素指数関数の微分から

$$
\begin{aligned}
Q'(z)
&=e^{-G(z)}-zG'(z)e^{-G(z)}\\
&=e^{-G(z)}\left(1-z\frac1z\right)\\
&=0.
\end{aligned}
$$

$\Omega$ は連結なので、[CA1 の導関数0なら定数](../CA1/index.md#lem-ca1-zero-derivative-constant) から $Q(z)=c$ は定数です。$c\ne0$ です。

非零複素数 $c$ を $c=re^{i\theta}$、$r>0$ と書けば

$$
\alpha=\log r+i\theta
$$

に対して $e^\alpha=c$ です。そこで

$$
L(z)=G(z)+\alpha
$$

と置くと

$$
e^{L(z)}
=e^{G(z)}c
=z
$$

です。従って $L$ は正則対数の枝です。$\square$
<!-- proof-end -->

**対照**：$\mathbb C\setminus\{0\}$ では単位円上で $\int dz/z=2\pi i\ne0$ なので、全体を覆う正則対数の枝は存在しません。穴は単なる図形的な見た目ではなく、積分値として検出されます。

---

## 9. 典型例で依存関係を確認する

### 例1：多項式の閉曲線積分

$p$ を多項式とします。多項式は明示的な原始関数を持つので、どの領域でどの閉曲線を取っても

$$
\int_\gamma p(z)\,dz=0.
$$

この場合は Cauchy–Goursat を使う必要すらありません。

### 例2：円板内の正則関数

$f$ が円板 $B(a,R)$ 上正則なら円板は星型なので、任意の閉曲線 $\gamma\subset B(a,R)$ に対して積分は0です。曲線自身が単純である必要もなく、自己交差していて構いません。

### 例3：穿孔平面の局所性と大域性

$1/z$ は $\mathbb C\setminus\{0\}$ の各点の十分小さい円板では原始関数を持ちます。しかし単位円を一周すると積分は $2\pi i$ です。したがって局所原始関数を貼り合わせて大域原始関数にするには、穴を一周したときの整合性が必要です。単連結性がその障害を消します。

---

## 10. 演習

### Level A

<a id="ex-ca2-a01"></a>
#### CA2-A01 線分上の直接計算
- Level: A

線分 $0\to1+i$ を $\gamma(t)=t(1+i)$、$0\le t\le1$ とパラメータ表示し

$$
\int_\gamma z\,dz
$$

を定義から計算せよ。

<!-- solution-start -->
**解答**：

$$
\gamma'(t)=1+i,
\qquad
\gamma(t)=t(1+i).
$$

従って

$$
\begin{aligned}
\int_\gamma z\,dz
&=\int_0^1\gamma(t)\gamma'(t)\,dt\\
&=\int_0^1 t(1+i)^2\,dt\\
&=\int_0^1 2it\,dt\\
&=i.
\end{aligned}
$$

原始関数 $z^2/2$ を使えば終点差でも同じ値を得ますが、この問題では $f(\gamma(t))\gamma'(t)$ を実際に作ることが目的です。
<!-- solution-end -->

<a id="ex-ca2-a02"></a>
#### CA2-A02 円周上のべき関数
- Level: A

単位円 $\gamma(t)=e^{it}$、$0\le t\le2\pi$ に対し、整数 $n$ について

$$
\int_\gamma z^n\,dz
$$

を計算せよ。

<!-- solution-start -->
**解答**：$dz=ie^{it}dt$ なので

$$
\int_\gamma z^n\,dz
=i\int_0^{2\pi}e^{i(n+1)t}\,dt.
$$

$n\ne-1$ なら

$$
\begin{aligned}
i\int_0^{2\pi}e^{i(n+1)t}\,dt
&=
\frac{e^{i(n+1)2\pi}-1}{n+1}
=0,
\end{aligned}
$$

整数 $n+1$ に対して指数関数が一周して1へ戻るからです。

$n=-1$ なら被積分関数は単に $i$ なので

$$
\int_\gamma\frac{dz}{z}=2\pi i.
$$

ただ一つ $n=-1$ だけが例外になることが、穴を検出する積分につながります。
<!-- solution-end -->

<a id="ex-ca2-a03"></a>
#### CA2-A03 逆向きでの符号
- Level: A

区分的 $C^1$ 曲線 $\gamma:[a,b]\to\Omega$ に対し

$$
\gamma^-(t)=\gamma(a+b-t)
$$

とする。定義から

$$
\int_{\gamma^-}f(z)\,dz
=-\int_\gamma f(z)\,dz
$$

を示せ。

<!-- solution-start -->
**解答**：

$$
(\gamma^-)'(t)
=-\gamma'(a+b-t).
$$

従って

$$
\int_{\gamma^-}f(z)\,dz
=
-\int_a^b
f(\gamma(a+b-t))\gamma'(a+b-t)\,dt.
$$

$u=a+b-t$ と置くと $du=-dt$ で、$t=a,b$ は $u=b,a$ に対応します。積分区間を正向きへ戻すと

$$
\int_{\gamma^-}f(z)\,dz
=-\int_a^b f(\gamma(u))\gamma'(u)\,du.
$$

したがって求める符号反転が得られます。
<!-- solution-end -->

<a id="ex-ca2-a04"></a>
#### CA2-A04 ML評価で円弧を抑える
- Level: A

円弧 $\gamma(t)=2e^{it}$、$0\le t\le\pi/6$ 上で

$$
\int_\gamma e^z\,dz
$$

の絶対値を ML 評価で上から評価せよ。

<!-- solution-start -->
**解答**：円弧の長さは

$$
L(\gamma)=2\cdot\frac\pi6=\frac\pi3.
$$

また $z=2e^{it}$ 上では $\operatorname{Re}z=2\cos t\le2$ なので

$$
|e^z|=e^{\operatorname{Re}z}\le e^2.
$$

従って [再パラメータ化・向き・ML評価](#thm-ca2-reparam-ml) より

$$
\left|\int_\gamma e^z\,dz\right|
\le
\frac\pi3e^2.
$$

ここで必要なのは積分値の正確な計算ではなく、「最大値 × 曲線長」で一様に抑える機構です。
<!-- solution-end -->

### Level B

<a id="ex-ca2-b01"></a>
#### CA2-B01 原始関数から閉曲線積分へ
- Level: B

$f$ が領域 $\Omega$ 上で原始関数 $F$ を持つとする。区分的 $C^1$ 閉曲線 $\gamma$ に対して

$$
\int_\gamma f(z)\,dz=0
$$

を、区分点で何が起こるかも含めて示せ。

<!-- solution-start -->
**解答**：分割 $a=t_0<\cdots<t_m=b$ を取り、各区間で実変数 FTC を使うと

$$
\int_{\gamma|[t_{j-1},t_j]}f(z)\,dz
=F(\gamma(t_j))-F(\gamma(t_{j-1})).
$$

全区間で足すと中間項が

$$
-F(\gamma(t_1))+F(\gamma(t_1)),\quad\dots
$$

と相殺され

$$
\int_\gamma f(z)\,dz
=F(\gamma(b))-F(\gamma(a)).
$$

閉曲線では $\gamma(a)=\gamma(b)$ なので0です。区分的滑らかさは、各区間で FTC を使い、最後に望遠鏡和を作るために使われています。
<!-- solution-end -->

<a id="ex-ca2-b02"></a>
#### CA2-B02 穿孔平面に原始関数がない
- Level: B

$1/z$ が $\mathbb C\setminus\{0\}$ 上で原始関数を持たないことを示せ。

<!-- solution-start -->
**解答**：単位円 $\gamma(t)=e^{it}$ に対して CA2-A02 の計算から

$$
\int_\gamma\frac{dz}{z}=2\pi i\ne0.
$$

もし $1/z$ が $\mathbb C\setminus\{0\}$ 上で原始関数を持てば、[複素線積分の基本定理](#thm-ca2-fundamental-theorem) により任意の閉曲線積分は0でなければなりません。単位円が反例なので原始関数は存在しません。

注意すべきなのは $1/z$ 自体はこの領域で正則だという点です。正則性は局所条件であり、大域原始関数の存在には領域の穴が影響します。
<!-- solution-end -->

<a id="ex-ca2-b03"></a>
#### CA2-B03 星型領域で原始関数を作る
- Level: B

$\Omega$ を中心 $a$ に関して星型、$f$ を $\Omega$ 上正則とする。

$$
F(z)=\int_{[a,z]}f(\zeta)\,d\zeta
$$

と置いたとき $F'(z)=f(z)$ を、三角形版 Cauchy–Goursat と線分積分から示せ。

<!-- solution-start -->
**解答**：$z\in\Omega$ を固定し、$B(z,r)\subset\Omega$ を取ります。$|h|<r$ なら $[z,z+h]\subset\Omega$ です。さらに $w\in[z,z+h]$ に対し星型性から $[a,w]\subset\Omega$ なので、三角形 $\Delta(a,z,z+h)$ 全体が $\Omega$ に入ります。

その境界積分が0だから

$$
F(z+h)-F(z)
=
\int_{[z,z+h]}f(\zeta)\,d\zeta.
$$

$\zeta=z+th$ と置くと

$$
\frac{F(z+h)-F(z)}h
=
\int_0^1f(z+th)\,dt.
$$

$f$ は連続なので

$$
\left|
\int_0^1(f(z+th)-f(z))\,dt
\right|
\le
\max_{0\le t\le1}|f(z+th)-f(z)|
\to0.
$$

従って差商は $f(z)$ へ収束し、$F'(z)=f(z)$ です。星型性は三角形を領域内に保つ場所で、正則性はその三角形へ Goursat を適用する場所で使われています。
<!-- solution-end -->

### Level C

<a id="ex-ca2-c01"></a>
#### CA2-C01 切断平面上の主値対数
- Level: C

$$
\Omega=\mathbb C\setminus(-\infty,0]
$$

とする。各 $z\in\Omega$ を一意に

$$
z=re^{i\theta},
\qquad r>0,
\quad -\pi<\theta<\pi
$$

と書き、

$$
\operatorname{Log}z=\log r+i\theta
$$

と定める。これが $\Omega$ 上の正則対数の枝であり

$$
(\operatorname{Log}z)'=\frac1z
$$

を満たすことを、本章の定理を使って示せ。

<!-- solution-start -->
**解答**：まず $\Omega$ は単連結です。例えば極座標で角度を $(-\pi,\pi)$ に固定し、各点を正の実軸側へ連続的に変形した後、半径を1へ動かせば1へ縮約できます。より具体的には、まず角度を $(1-s)\theta$ へ、次に半径を $(1-s)r+s$ へ動かす二段階のホモトピーは切断 $(-\infty,0]$ を横切りません。

従って [単連結領域の Cauchy の定理](#thm-ca2-cauchy-simply-connected) を $1/z$ に適用すると、$1/z$ は $\Omega$ 上で原始関数 $G$ を持ちます。定数を調整して $G(1)=0$ とします。[単連結領域上の正則対数](#thm-ca2-holomorphic-log-branch) の証明と同じ計算から

$$
e^{G(z)}=z.
$$

$G(z)=u(z)+iv(z)$ と書けば

$$
e^{u(z)}=|z|=r,
$$

よって $u(z)=\log r$ です。また

$$
e^{iv(z)}=e^{i\theta}
$$

なので $v(z)-\theta\in2\pi\mathbb Z$ です。$v$ は連続で、$\theta$ も切断平面上で連続に選ばれています。従って $v-\theta$ は連結集合 $\Omega$ から離散集合 $2\pi\mathbb Z$ への連続写像なので定数です。$z=1$ では $G(1)=0$、$\theta=0$ だからその定数は0です。

従って

$$
G(z)=\log r+i\theta=\operatorname{Log}z.
$$

もともと $G'(z)=1/z$ だったので

$$
(\operatorname{Log}z)'=\frac1z.
$$

切断を入れる意味は、角度を $(-\pi,\pi)$ の一つの連続な値として選べるようにし、原点を一周して $2\pi$ ずれる現象を除くことです。
<!-- solution-end -->

---

## 11. この章で得たもの

- 複素線積分は向きを持つ区分的 $C^1$ 曲線に沿って $f(\gamma(t))\gamma'(t)$ を積分する。
- 向きを保つ再パラメータ化で積分値は変わらず、逆向きで符号が反転し、ML評価で「最大値 × 曲線長」に抑えられる。
- 原始関数があれば線積分は端点差であり、経路独立性・全閉曲線積分0・原始関数の存在は経路連結領域で同値である。
- 三角形版 Cauchy–Goursat は4分割反復と一点での複素一次近似だけで証明でき、$f'$ の連続性を仮定しない。
- 星型性は基点と近接二点が張る三角形を領域内に保ち、そこから原始関数を直接構成できる。
- 一般の単連結領域では、曲線を局所原始関数で多角形化し、連続ホモトピーをコンパクト性で有限の区分線形三角形分割へ落として Cauchy–Goursat を足し合わせる。
- $1/z$ の単位円積分 $2\pi i$ は穿孔平面の穴を検出し、単連結な零点回避領域では逆に正則対数の枝が構成できる。

次章 CA3 では、ここで得た閉曲線積分の消滅を核に Cauchy積分公式を導き、そこから高階微分、Taylor展開、Liouvilleの定理、最大値原理へ進みます。
