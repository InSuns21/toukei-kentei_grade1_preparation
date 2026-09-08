# CA1 標準複素解析 I：複素微分・Cauchy–Riemann・初等正則関数

<!-- definition-example-audit: strict -->

複素微分は、実2変数関数の微分より強い条件です。差商の分母 $h$ は実軸方向にも虚軸方向にも、さらに斜め方向にも0へ近づけます。そのため「どの方向から見ても同じ一次近似になる」という整合条件が必要になり、それが Cauchy–Riemann 方程式です。

本章では

```text
複素差商
  ↓
複素微分可能 ⇒ 連続
  ↓
微分法則
  ↓ 実方向・純虚方向を比較
Cauchy–Riemann 必要条件
  ↓ 偏導関数の連続性で o(|h|) を直接作る
Cauchy–Riemann 十分条件
  ↓
Wirtinger 微分による判定
  ↓
複素指数・複素三角関数
```

という順で進みます。

既知とするのは、[RA3 の実1変数の微分と平均値定理](../RA3/index.md)、[RA5 の極限操作](../RA5/index.md)、[LA1 の複素線形構造](../LA1/index.md)、[TOP3 の連結性](../TOP3/index.md)です。特に Cauchy–Riemann の十分条件では、未実装の多変数 Fréchet 微分を先取りしません。実1変数の平均値定理を横方向・縦方向に一回ずつ使い、誤差を直接 $o(|h|)$ に落とします。

---

## 1. 複素微分・正則・整関数

<a id="def-ca1-complex-differentiable"></a>
<!-- formal-statement-start -->
### 定義（複素微分可能）

開集合 $\Omega\subset\mathbb C$、$f:\Omega\to\mathbb C$、$z_0\in\Omega$ とする。

$$
f'(z_0)
=
\lim_{h\to0}
\frac{f(z_0+h)-f(z_0)}{h}
$$

が複素数として存在するとき、$f$ は $z_0$ で **複素微分可能** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca1-complex-differentiable -->
**定義の確認**：$f(z)=z^2$ では

$$
\frac{(z_0+h)^2-z_0^2}{h}=2z_0+h\to2z_0
$$

なので、$h$ がどの方向から0へ近づいても同じ極限 $2z_0$ を持ちます。したがって $f'(z_0)=2z_0$ です。
<!-- definition-example-end -->

<a id="def-ca1-holomorphic"></a>
<!-- formal-statement-start -->
### 定義（正則関数）

$f:\Omega\to\mathbb C$ が開集合 $\Omega$ の全ての点で複素微分可能であるとき、$f$ は $\Omega$ 上 **正則** であるという。
<!-- formal-statement-end -->

<a id="def-ca1-entire"></a>
<!-- formal-statement-start -->
### 定義（整関数）

$f:\mathbb C\to\mathbb C$ が $\mathbb C$ 全体で正則であるとき、$f$ を **整関数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca1-holomorphic, def-ca1-entire -->
**定義の確認**：$z^2+3z+1$ は任意の $z_0\in\mathbb C$ で複素微分可能なので $\mathbb C$ 上正則であり、したがって整関数です。一方 $1/z$ は後で示すように $\mathbb C\setminus\{0\}$ 上正則ですが、0で定義されていないので整関数ではありません。
<!-- definition-example-end -->

<a id="lem-ca1-differentiable-continuous"></a>
<!-- formal-statement-start -->
### 補題（複素微分可能なら連続）

$f$ が $z_0$ で複素微分可能なら、$f$ は $z_0$ で連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

複素微分可能性から

$$
\frac{f(z_0+h)-f(z_0)}{h}\to f'(z_0)
$$

です。従って十分小さい $h\ne0$ では差商は有界で、例えばある $M>0$ があって

$$
\left|
\frac{f(z_0+h)-f(z_0)}{h}
\right|\le M
$$

とできます。よって

$$
|f(z_0+h)-f(z_0)|
\le M|h|\to0.
$$

したがって $f(z_0+h)\to f(z_0)$、つまり $f$ は $z_0$ で連続です。$\square$
<!-- proof-end -->

複素微分可能性は、単に「実2変数として連続」よりはるかに強い条件です。ただし一点だけで複素微分可能でも、その近傍で正則とは限りません。この違いは後の $|z|^2$ の例で確認します。

---

## 2. 複素微分の微分法則

<a id="thm-ca1-derivative-rules"></a>
<!-- formal-statement-start -->
### 定理（複素微分の微分法則）

$f,g$ が $z_0$ で複素微分可能、$a,b\in\mathbb C$ とする。

1. $af+bg$ は $z_0$ で複素微分可能で
   $$
   (af+bg)'(z_0)=af'(z_0)+bg'(z_0).
   $$
2. $fg$ は $z_0$ で複素微分可能で
   $$
   (fg)'(z_0)=f'(z_0)g(z_0)+f(z_0)g'(z_0).
   $$
3. $g(z_0)\ne0$ なら $f/g$ は $z_0$ で複素微分可能で
   $$
   \left(\frac fg\right)'(z_0)
   =
   \frac{f'(z_0)g(z_0)-f(z_0)g'(z_0)}{g(z_0)^2}.
   $$
4. $f$ が $z_0$ で複素微分可能、$G$ が $f(z_0)$ で複素微分可能なら $G\circ f$ は $z_0$ で複素微分可能で
   $$
   (G\circ f)'(z_0)=G'(f(z_0))f'(z_0).
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形結合は差商の線形性から直ちに従います。

積については

$$
\begin{aligned}
&f(z_0+h)g(z_0+h)-f(z_0)g(z_0)\\
&=\bigl(f(z_0+h)-f(z_0)\bigr)g(z_0+h)
+f(z_0)\bigl(g(z_0+h)-g(z_0)\bigr).
\end{aligned}
$$

従って $h\ne0$ で割ると

$$
\frac{f(z_0+h)-f(z_0)}{h}g(z_0+h)
+f(z_0)\frac{g(z_0+h)-g(z_0)}{h}.
$$

前節の補題により $g(z_0+h)\to g(z_0)$ なので、$h\to0$ で

$$
f'(z_0)g(z_0)+f(z_0)g'(z_0)
$$

へ収束します。

逆数は $g(z_0)\ne0$ とします。$g$ は $z_0$ で連続なので、十分小さい $h$ では $g(z_0+h)\ne0$ です。このとき

$$
\begin{aligned}
\frac{1/g(z_0+h)-1/g(z_0)}{h}
&=
-\frac{1}{g(z_0+h)g(z_0)}
\frac{g(z_0+h)-g(z_0)}{h}.
\end{aligned}
$$

$h\to0$ とすると

$$
\left(\frac1g\right)'(z_0)
=-\frac{g'(z_0)}{g(z_0)^2}.
$$

したがって $f/g=f\cdot(1/g)$ に積の公式を使えば商の公式が得られます。

最後に合成を示します。$w_0=f(z_0)$ と置きます。$G$ の $w_0$ での複素微分可能性は、$k\to0$ に対して

$$
G(w_0+k)-G(w_0)
=G'(w_0)k+k\varepsilon(k),
\qquad \varepsilon(k)\to0
$$

と書けることと同値です。$k=f(z_0+h)-f(z_0)$ と置けば、$f$ の連続性から $k\to0$ です。従って

$$
\begin{aligned}
\frac{G(f(z_0+h))-G(f(z_0))}{h}
&=
G'(w_0)\frac{k}{h}
+rac{k}{h}\varepsilon(k).
\end{aligned}
$$

ここで $k/h\to f'(z_0)$ なので $k/h$ は有界、また $\varepsilon(k)\to0$ です。よって第2項は0へ収束し、第1項は

$$
G'(w_0)f'(z_0)
$$

へ収束します。$\square$
<!-- proof-end -->

**どこが実変数と同じで、どこが違うか**：代数的な差商操作は実変数と同じです。しかし「微分可能」という前提自体は、複素数 $h$ が全方向から0へ近づくため実変数より強い条件です。

---

## 3. Cauchy–Riemann 方程式：必要条件

$f(x+iy)=u(x,y)+iv(x,y)$ と書きます。

<a id="thm-ca1-cr-necessary"></a>
<!-- formal-statement-start -->
### 定理（Cauchy–Riemann必要条件）

$f$ が $z_0=x_0+iy_0$ で複素微分可能なら、$u,v$ の一階偏導関数は $(x_0,y_0)$ で存在し、

$$
u_x=v_y,
\qquad
u_y=-v_x
$$

を満たす。また

$$
f'(z_0)
=u_x+iv_x
=v_y-iu_y
$$

である。偏導関数は全て $(x_0,y_0)$ で評価している。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

複素差商の極限は、どの経路で $h\to0$ としても同じ値でなければなりません。

まず $h=t\in\mathbb R$ として実軸方向から近づけます。すると

$$
\begin{aligned}
f'(z_0)
&=
\lim_{t\to0}
\frac{u(x_0+t,y_0)-u(x_0,y_0)}{t}\\
&\qquad
+i\lim_{t\to0}
\frac{v(x_0+t,y_0)-v(x_0,y_0)}{t}\\
&=u_x+iv_x.
\end{aligned}
$$

次に $h=it$ として虚軸方向から近づけます。

$$
\begin{aligned}
f'(z_0)
&=
\lim_{t\to0}
\frac{u(x_0,y_0+t)-u(x_0,y_0)}{it}\\
&\qquad
+i\lim_{t\to0}
\frac{v(x_0,y_0+t)-v(x_0,y_0)}{it}.
\end{aligned}
$$

$1/i=-i$ なので

$$
f'(z_0)=v_y-iu_y.
$$

両表示は同じ複素数ですから、実部と虚部を比較して

$$
u_x=v_y,
\qquad
v_x=-u_y
$$

を得ます。$\square$
<!-- proof-end -->

### 3.1 必要条件だけでは足りない

Cauchy–Riemann 方程式が一点で成り立つだけでは、複素微分可能性は保証されません。例えば

$$
f(x+iy)=
\begin{cases}
\dfrac{x^3}{x^2+y^2}
+i\dfrac{y^3}{x^2+y^2},&(x,y)\ne(0,0),\\[6pt]
0,&(x,y)=(0,0)
\end{cases}
$$

とします。原点では

$$
u_x(0,0)=1,
\quad
u_y(0,0)=0,
\quad
v_x(0,0)=0,
\quad
v_y(0,0)=1
$$

なので Cauchy–Riemann 方程式を満たします。

しかし実軸上 $z=t$ では

$$
\frac{f(t)-f(0)}{t}=1,
$$

一方 $z=t(1+i)$ では

$$
f(t+it)=\frac t2+i\frac t2,
\qquad
\frac{f(t+it)}{t(1+i)}=\frac12.
$$

方向によって差商の極限が違うので、原点で複素微分可能ではありません。次節の十分条件では、この破綻を防ぐため偏導関数の**近傍での存在と点での連続性**を使います。

---

## 4. Cauchy–Riemann 方程式：十分条件

<a id="thm-ca1-cr-sufficient"></a>
<!-- formal-statement-start -->
### 定理（Cauchy–Riemann十分条件）

$z_0=x_0+iy_0$ のある近傍で $u_x,u_y,v_x,v_y$ が存在し、これら4つの偏導関数が $(x_0,y_0)$ で連続であるとする。さらに $(x_0,y_0)$ で

$$
u_x=v_y,
\qquad
u_y=-v_x
$$

が成り立つなら、$f=u+iv$ は $z_0$ で複素微分可能で

$$
f'(z_0)=u_x(x_0,y_0)+iv_x(x_0,y_0)
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$h=s+it$、$r=|h|=\sqrt{s^2+t^2}$ と置きます。目標は

$$
f(z_0+h)-f(z_0)=Ah+o(r)
$$

という形を作ることです。ここで

$$
A=u_x(x_0,y_0)+iv_x(x_0,y_0)
$$

です。

まず $u$ の増分を、横方向と縦方向に分けます。

$$
\begin{aligned}
&u(x_0+s,y_0+t)-u(x_0,y_0)\\
&=\bigl[u(x_0+s,y_0+t)-u(x_0,y_0+t)\bigr]\\
&\qquad+
\bigl[u(x_0,y_0+t)-u(x_0,y_0)\bigr].
\end{aligned}
$$

実1変数の平均値定理を各括弧へ使うと、$0$ と $1$ の間の数 $\theta,\eta$ が存在して

$$
\begin{aligned}
&u(x_0+s,y_0+t)-u(x_0,y_0)\\
&=u_x(x_0+\theta s,y_0+t)s
+u_y(x_0,y_0+\eta t)t.
\end{aligned}
$$

偏導関数は $(x_0,y_0)$ で連続なので

$$
\begin{aligned}
&u_x(x_0+\theta s,y_0+t)
=u_x(x_0,y_0)+\alpha(h),\\
&u_y(x_0,y_0+\eta t)
=u_y(x_0,y_0)+\beta(h),
\end{aligned}
$$

と書け、$h\to0$ で $\alpha(h),\beta(h)\to0$ です。従って

$$
\Delta u
=u_x s+u_y t+\alpha(h)s+eta(h)t.
$$

$|s|,|t|\le r$ なので

$$
|\alpha(h)s+\beta(h)t|
\le (|\alpha(h)|+|\beta(h)|)r
=o(r).
$$

同様に

$$
\Delta v=v_x s+v_y t+o(r).
$$

よって

$$
\begin{aligned}
\Delta f
&=(u_x+iv_x)s+(u_y+iv_y)t+o(r).
\end{aligned}
$$

ここで Cauchy–Riemann 方程式 $u_y=-v_x$, $v_y=u_x$ を使うと

$$
u_y+iv_y=-v_x+iu_x=i(u_x+iv_x)=iA.
$$

したがって

$$
\Delta f
=As+iAt+o(r)
=A(s+it)+o(r)
=Ah+o(|h|).
$$

$h\ne0$ で割れば

$$
\frac{f(z_0+h)-f(z_0)}{h}
=A+rac{o(|h|)}{h}.
$$

最後の項の絶対値は $o(|h|)/|h|\to0$ なので、差商は $A$ へ収束します。$\square$
<!-- proof-end -->

この証明で本当に使った連続性は、4つの偏導関数を増分先の点から $(x_0,y_0)$ へ戻して誤差を $o(|h|)$ にする箇所です。Cauchy–Riemann 方程式そのものだけでは、その誤差制御は得られません。

---

## 5. Wirtinger 微分

<a id="def-ca1-wirtinger"></a>
<!-- formal-statement-start -->
### 定義（Wirtinger微分）

$C^1$ 級の複素数値関数 $f(x,y)$ に対して

$$
\partial_z f
:=\frac12(\partial_x-i\partial_y)f,
\qquad
\partial_{\bar z}f
:=\frac12(\partial_x+i\partial_y)f
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca1-wirtinger -->
**定義の確認**：$z=x+iy$, $\bar z=x-iy$ なので

$$
\partial_z z=1,
\qquad
\partial_{\bar z}z=0,
$$

一方

$$
\partial_z\bar z=0,
\qquad
\partial_{\bar z}\bar z=1.
$$

正則な変数 $z$ と、正則性を壊す変数 $\bar z$ を形式的に分離して見られます。
<!-- definition-example-end -->

<a id="prop-ca1-wirtinger-criterion"></a>
<!-- formal-statement-start -->
### 命題（Wirtinger判定）

$f=u+iv$ が開集合 $\Omega$ 上 $C^1$ 級なら、次は同値である。

1. $f$ は $\Omega$ 上正則である。
2. $\partial_{\bar z}f=0$ が $\Omega$ 上で成り立つ。

このとき

$$
f'=\partial_z f.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

直接計算すると

$$
\begin{aligned}
2\partial_{\bar z}f
&=(\partial_x+i\partial_y)(u+iv)\\
&=(u_x-v_y)+i(v_x+u_y).
\end{aligned}
$$

従って $\partial_{\bar z}f=0$ は

$$
u_x=v_y,
\qquad
u_y=-v_x
$$

と同値です。

$f$ が正則なら [Cauchy–Riemann必要条件](#thm-ca1-cr-necessary) によりこの方程式が成り立ちます。逆に $f$ は $C^1$ 級なので、方程式が成り立てば [Cauchy–Riemann十分条件](#thm-ca1-cr-sufficient) により正則です。

さらに

$$
\begin{aligned}
2\partial_z f
&=(\partial_x-i\partial_y)(u+iv)\\
&=(u_x+v_y)+i(v_x-u_y).
\end{aligned}
$$

Cauchy–Riemann 方程式を代入すると

$$
\partial_z f=u_x+iv_x=f'.
$$

$\square$
<!-- proof-end -->

---

## 6. 典型例と反例

### 6.1 $\bar z$ はどこでも複素微分可能でない

$f(z)=\bar z$ とします。任意の $z_0$ で

$$
\frac{\overline{z_0+h}-\bar z_0}{h}
=
\frac{\bar h}{h}.
$$

$h=t\in\mathbb R$ なら値は1、$h=it$ なら

$$
\frac{-it}{it}=-1.
$$

二方向で極限が一致しないので、どの点でも複素微分可能ではありません。

### 6.2 $|z|^2$ は0でだけ複素微分可能

$f(z)=|z|^2=z\bar z$ とします。原点では

$$
\frac{|h|^2}{h}=\bar h\to0,
$$

よって $f'(0)=0$ です。

一方 $z_0\ne0$ では $u=x^2+y^2$, $v=0$ なので Cauchy–Riemann 必要条件は

$$
2x_0=0,
\qquad
2y_0=0
$$

を要求します。$z_0\ne0$ では不可能です。従って複素微分可能なのは0だけです。

**ここで重要なのは**、一点で複素微分可能でもその点の近傍で正則とは限らないことです。正則性は開集合全体での条件です。

### 6.3 $1/z$ は穿孔平面で正則

$f(z)=z$, $g(z)=1$ と見てもよいですが、直接

$$
\frac{1/(z_0+h)-1/z_0}{h}
=-\frac{1}{z_0(z_0+h)}
$$

なので $z_0\ne0$ なら

$$
\left(\frac1z\right)'(z_0)
=-\frac1{z_0^2}.
$$

従って $1/z$ は $\mathbb C\setminus\{0\}$ 上正則です。

---

## 7. 導関数が0なら連結領域で定数

<a id="lem-ca1-zero-derivative-constant"></a>
<!-- formal-statement-start -->
### 補題（導関数0なら連結開集合上で定数）

$\Omega\subset\mathbb C$ を連結開集合とし、$f:\Omega\to\mathbb C$ を正則とする。全ての $z\in\Omega$ で

$$
f'(z)=0
$$

なら、$f$ は $\Omega$ 上定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $f$ が局所的に定数であることを示します。$a\in\Omega$ を取ります。$\Omega$ は開なので、ある $r>0$ があって

$$
D(a,r)=\{z:|z-a|<r\}\subset\Omega
$$

です。任意の $z\in D(a,r)$ に対して線分

$$
\gamma(t)=a+t(z-a),
\qquad 0\le t\le1
$$

は $D(a,r)$ 内にあります。

$\phi(t)=f(\gamma(t))$ と置きます。実変数 $t$ に関する微分は、差商を用いて

$$
\phi'(t)=f'(\gamma(t))(z-a)=0
$$

です。実部・虚部それぞれに実1変数の平均値定理を使うと、$\phi$ は $[0,1]$ 上定数です。従って

$$
f(z)=\phi(1)=\phi(0)=f(a).
$$

よって $f$ は各点のある円板近傍で定数、すなわち局所定数です。

一点 $a_0\in\Omega$ を固定して

$$
A=\{z\in\Omega:f(z)=f(a_0)\}
$$

と置きます。局所定数性から $A$ は開です。また $z\notin A$ の点でも、その近傍で $f$ は $f(z)$ に等しい定数なので、その近傍は $A$ と交わりません。従って $\Omega\setminus A$ も開です。

$A$ は空でなく、$\Omega$ の開閉集合です。[TOP3 の連結性と開閉集合の特徴付け](../TOP3/index.md) により、$\Omega$ が連結なら $A=\Omega$ です。従って $f$ は定数です。$\square$
<!-- proof-end -->

---

## 8. 複素指数関数

<a id="def-ca1-complex-exponential"></a>
<!-- formal-statement-start -->
### 定義（複素指数関数）

$z=x+iy$ に対して

$$
e^z:=e^x(\cos y+i\sin y)
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca1-complex-exponential -->
**定義の確認**：純虚数 $z=iy$ では

$$
e^{iy}=\cos y+i\sin y,
$$

従って

$$
|e^{iy}|=1.
$$

一般の $z=x+iy$ では $|e^z|=e^x$ です。
<!-- definition-example-end -->

<a id="thm-ca1-complex-exponential"></a>
<!-- formal-statement-start -->
### 定理（複素指数関数の基本性質）

複素指数関数は整関数で、任意の $z,w\in\mathbb C$ について

$$
(e^z)'=e^z,
$$

$$
e^{z+w}=e^ze^w,
$$

$$
e^{z+2\pi i}=e^z
$$

が成り立つ。また $e^z\ne0$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z=x+iy$ として

$$
u(x,y)=e^x\cos y,
\qquad
v(x,y)=e^x\sin y
$$

と置きます。実1変数の微分公式から

$$
u_x=e^x\cos y,
\qquad
u_y=-e^x\sin y,
$$

$$
v_x=e^x\sin y,
\qquad
v_y=e^x\cos y.
$$

従って

$$
u_x=v_y,
\qquad
u_y=-v_x.
$$

4つの偏導関数は連続なので、[Cauchy–Riemann十分条件](#thm-ca1-cr-sufficient) から $e^z$ は全平面で正則です。また

$$
(e^z)'=u_x+iv_x=e^x(\cos y+i\sin y)=e^z.
$$

次に $z=x+iy$, $w=s+it$ とします。実指数の加法公式と三角関数の加法公式から

$$
\begin{aligned}
e^{z+w}
&=e^{x+s}
\bigl(\cos(y+t)+i\sin(y+t)\bigr)\\
&=e^xe^s
(\cos y+i\sin y)
(\cos t+i\sin t)\\
&=e^ze^w.
\end{aligned}
$$

周期性は

$$
\cos(y+2\pi)=\cos y,
\qquad
\sin(y+2\pi)=\sin y
$$

から従います。

最後に

$$
|e^z|
=e^x\sqrt{\cos^2 y+\sin^2 y}
=e^x>0
$$

なので $e^z$ は零点を持ちません。$\square$
<!-- proof-end -->

---

## 9. 複素正弦・余弦

<a id="def-ca1-complex-trigonometric"></a>
<!-- formal-statement-start -->
### 定義（複素正弦・複素余弦）

$$
\cos z:=\frac{e^{iz}+e^{-iz}}{2},
\qquad
\sin z:=\frac{e^{iz}-e^{-iz}}{2i}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca1-complex-trigonometric -->
**定義の確認**：$x\in\mathbb R$ では Euler の表示

$$
e^{ix}=\cos x+i\sin x,
\qquad
 e^{-ix}=\cos x-i\sin x
$$

を足し引きすることで、上の複素定義は通常の実正弦・余弦と一致します。
<!-- definition-example-end -->

<a id="cor-ca1-trigonometric-derivatives"></a>
<!-- formal-statement-start -->
### 系（複素正弦・余弦の微分）

$\sin z,\cos z$ は整関数で

$$
(\sin z)'=\cos z,
\qquad
(\cos z)'=-\sin z
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[複素指数関数の基本性質](#thm-ca1-complex-exponential) と [複素微分の微分法則](#thm-ca1-derivative-rules) を使います。合成則により

$$
\frac d{dz}e^{iz}=ie^{iz},
\qquad
\frac d{dz}e^{-iz}=-ie^{-iz}.
$$

従って

$$
\begin{aligned}
(\sin z)'
&=\frac{ie^{iz}+ie^{-iz}}{2i}\\
&=\frac{e^{iz}+e^{-iz}}2
=\cos z,
\end{aligned}
$$

また

$$
\begin{aligned}
(\cos z)'
&=\frac{ie^{iz}-ie^{-iz}}2\\
&=-\frac{e^{iz}-e^{-iz}}{2i}
=-\sin z.
\end{aligned}
$$

よって両者は全平面で複素微分可能、すなわち整関数です。$\square$
<!-- proof-end -->

ここまでで、Fourier解析で現れる $e^{inx}$ を「記号上の便利な表現」ではなく、整関数 $e^z$ の実軸上の制限として扱える準備が整いました。

---

## 10. 演習

### Level A

<a id="ex-ca1-a01"></a>
#### CA1-A01 多項式を定義から微分する
- Level: A

$f(z)=z^3-2z+1$ について、微分法則だけを引用せず差商から $f'(z)=3z^2-2$ を示せ。

<!-- solution-start -->
**解答**：$z_0\in\mathbb C$ を固定すると

$$
\begin{aligned}
&\frac{f(z_0+h)-f(z_0)}{h}\\
&=
\frac{(z_0+h)^3-z_0^3-2h}{h}\\
&=
3z_0^2+3z_0h+h^2-2.
\end{aligned}
$$

$h\to0$ で後ろ2項が0へ収束するため

$$
f'(z_0)=3z_0^2-2.
$$

$h$ の方向に依存する項が残っていないことまで確認できるので、これは複素差商の定義からの証明です。
<!-- solution-end -->

<a id="ex-ca1-a02"></a>
#### CA1-A02 共役写像の差商
- Level: A

$f(z)=\bar z$ がどの点でも複素微分可能でないことを、実方向と純虚方向の差商を比較して示せ。

<!-- solution-start -->
**解答**：任意の $z_0$ で

$$
\frac{f(z_0+h)-f(z_0)}{h}
=\frac{\bar h}{h}.
$$

$h=t\in\mathbb R\setminus\{0\}$ なら値は1です。一方 $h=it$ なら

$$
\frac{\overline{it}}{it}
=\frac{-it}{it}
=-1.
$$

同じ $h\to0$ でも二つの経路で極限が1と$-1$に分かれるため、複素差商の極限は存在しません。$z_0$ に依らない計算なので全ての点で非微分可能です。
<!-- solution-end -->

<a id="ex-ca1-a03"></a>
#### CA1-A03 $|z|^2$ の一点微分可能性
- Level: A

$f(z)=|z|^2$ が $z=0$ では複素微分可能だが、$z_0\ne0$ では複素微分可能でないことを示せ。

<!-- solution-start -->
**解答**：原点では

$$
\frac{f(h)-f(0)}h
=\frac{|h|^2}{h}
=\bar h\to0,
$$

したがって $f'(0)=0$ です。

一方 $f=u+iv$ と書けば

$$
u(x,y)=x^2+y^2,
\qquad
v(x,y)=0.
$$

従って

$$
u_x=2x,
\quad
u_y=2y,
\quad
v_x=v_y=0.
$$

複素微分可能なら [Cauchy–Riemann必要条件](#thm-ca1-cr-necessary) により $2x_0=0$ かつ $2y_0=0$ が必要です。従って $z_0\ne0$ では複素微分可能ではありません。

この問題は「一点で複素微分可能」と「その近傍で正則」を区別する標準例です。
<!-- solution-end -->

<a id="ex-ca1-a04"></a>
#### CA1-A04 複素指数の周期
- Level: A

定義から $e^{z+2\pi i}=e^z$ を示せ。

<!-- solution-start -->
**解答**：$z=x+iy$ とすると

$$
\begin{aligned}
e^{z+2\pi i}
&=e^{x+i(y+2\pi)}\\
&=e^x\bigl(\cos(y+2\pi)+i\sin(y+2\pi)\bigr)\\
&=e^x(\cos y+i\sin y)\\
&=e^z.
\end{aligned}
$$

周期性の源は、実指数 $e^x$ ではなく虚部に入る三角関数の $2\pi$ 周期です。
<!-- solution-end -->

### Level B

<a id="ex-ca1-b01"></a>
#### CA1-B01 Cauchy–Riemannから導関数を読む
- Level: B

$f=u+iv$ が $C^1$ 級で Cauchy–Riemann 方程式を満たすとする。$f'=u_x+iv_x=v_y-iu_y$ を導け。

<!-- solution-start -->
**解答**：$C^1$ 級かつ Cauchy–Riemann 方程式を満たすので [Cauchy–Riemann十分条件](#thm-ca1-cr-sufficient) から $f$ は複素微分可能で

$$
f'=u_x+iv_x.
$$

また Cauchy–Riemann 方程式

$$
u_x=v_y,
\qquad
v_x=-u_y
$$

を代入すれば

$$
u_x+iv_x=v_y-iu_y.
$$

従って両表示が一致します。

なお必要条件だけを使うなら、実方向と虚方向の差商を直接比較して同じ式を得ることもできます。
<!-- solution-end -->

<a id="ex-ca1-b02"></a>
#### CA1-B02 逆数関数
- Level: B

$f(z)=1/z$ が $\mathbb C\setminus\{0\}$ 上正則で

$$
f'(z)=-\frac1{z^2}
$$

となることを差商から示せ。

<!-- solution-start -->
**解答**：$z_0\ne0$ を固定します。十分小さい $h$ では $z_0+h\ne0$ なので

$$
\begin{aligned}
\frac{1/(z_0+h)-1/z_0}{h}
&=
\frac{z_0-(z_0+h)}{h z_0(z_0+h)}\\
&=-\frac1{z_0(z_0+h)}.
\end{aligned}
$$

$h\to0$ で

$$
-\frac1{z_0(z_0+h)}
\to
-\frac1{z_0^2}.
$$

従って任意の $z_0\ne0$ で複素微分可能であり、$\mathbb C\setminus\{0\}$ 上正則です。
<!-- solution-end -->

<a id="ex-ca1-b03"></a>
#### CA1-B03 複素正弦・余弦の微分
- Level: B

複素指数関数の定義から

$$
(\sin z)'=\cos z,
\qquad
(\cos z)'=-\sin z
$$

を導け。

<!-- solution-start -->
**解答**：

$$
\sin z=\frac{e^{iz}-e^{-iz}}{2i},
\qquad
\cos z=\frac{e^{iz}+e^{-iz}}2
$$

です。[複素指数関数の基本性質](#thm-ca1-complex-exponential) と合成則から

$$
(e^{iz})'=ie^{iz},
\qquad
(e^{-iz})'=-ie^{-iz}.
$$

従って

$$
\begin{aligned}
(\sin z)'
&=\frac{ie^{iz}+ie^{-iz}}{2i}
=\cos z,
\end{aligned}
$$

$$
\begin{aligned}
(\cos z)'
&=\frac{ie^{iz}-ie^{-iz}}2
=-\sin z.
\end{aligned}
$$

実変数の公式と同じ形ですが、根拠は複素指数関数の正則性と複素合成則です。
<!-- solution-end -->

### Level C

<a id="ex-ca1-c01"></a>
#### CA1-C01 $f$ と $\bar f$ がともに正則なら何が起こるか
- Level: C

$\Omega\subset\mathbb C$ を連結開集合とする。$f$ と $\bar f$ がともに $\Omega$ 上正則なら、$f$ が定数であることを示せ。

<!-- solution-start -->
**解答**：$f=u+iv$ と書きます。$f$ が正則なので Cauchy–Riemann 方程式から

$$
u_x=v_y,
\qquad
u_y=-v_x.
$$

一方

$$
\bar f=u-iv
$$

も正則です。その実部は $u$、虚部は $-v$ なので、再び Cauchy–Riemann 方程式を使うと

$$
u_x=(-v)_y=-v_y,
\qquad
u_y=-(-v)_x=v_x.
$$

最初の組と比較すると

$$
u_x=v_y=-v_y,
$$

よって $u_x=v_y=0$。また

$$
u_y=-v_x=v_x,
$$

よって $u_y=v_x=0$ です。従って

$$
f'=u_x+iv_x=0
$$

が $\Omega$ 全体で成り立ちます。

最後に [導関数0なら連結開集合上で定数](#lem-ca1-zero-derivative-constant) を適用して、$f$ は $\Omega$ 上定数です。

この問題では「局所的に導関数が0」だけではなく、最後に **連結性** を使って局所定数を空間全体の定数へ延長しています。
<!-- solution-end -->

---

## 11. この章で得たもの

- 複素微分は全方向の差商を同時にそろえる条件である。
- 複素微分可能性から連続性と通常の微分法則が従う。
- Cauchy–Riemann 方程式は複素微分可能性の必要条件であり、偏導関数の連続性を加えれば十分条件になる。
- 十分条件の核心は、横・縦の増分を平均値定理で一次化し、残差を $o(|h|)$ にすることである。
- $\bar z$ はどこでも複素微分可能でなく、$|z|^2$ は0でのみ複素微分可能である。
- 複素指数関数と複素正弦・余弦は整関数である。
- 連結開集合上で導関数が0なら、正則関数は定数である。

次章 CA2 では、この局所微分構造を曲線に沿って積分し、原始関数・経路独立性・Cauchy–Goursat へ進みます。
