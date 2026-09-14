# ODE5 標準常微分方程式 V：Laplace変換と初期値問題

ODE2 では、定係数線形方程式を特性方程式や定数変化法で解きました。本章では別の見方を導入します。時間微分を Laplace 変換すると

$$
y' \longmapsto sY(s)-y(0),\qquad
y'' \longmapsto s^2Y(s)-sy(0)-y'(0)
$$

となり、**微分方程式と初期条件が一つの代数式へ同時に入ります**。

ただし、Laplace 変換は万能な記号操作ではありません。

- そもそも無限区間の積分が収束するか。
- 部分積分の無限遠境界項が本当に消えるか。
- 遅延入力をどう時間領域へ戻すか。
- 畳み込み定理で積分順序を変えてよいのはなぜか。
- 「逆変換した」と言うとき、何を確認すれば十分か。

を一つずつ確認します。

前提は [ODE2 高階線形微分方程式](../ODE2/index.md) です。一般の Fourier 反転、複素積分による Bromwich 反転、Dirac delta の超関数論は使いません。

---

## 1. 無限区間で積分するには、増大度を抑える

Laplace 変換は $e^{-st}$ という減衰を掛けてから $[0,\infty)$ で積分します。したがって、元の関数が減衰より速く増大すると変換できません。

<a id="def-ode5-exponential-order"></a>
<!-- formal-statement-start -->
> **定義（指数位数）**  
> 関数 $f:[0,\infty)\to\mathbb R$ に対し、ある実数 $\alpha$、定数 $M>0$、$T\ge0$ が存在して

$$
|f(t)|\le M e^{\alpha t}\qquad(t\ge T)
$$

> が成り立つとき、$f$ は指数位数 $\alpha$ 以下であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode5-exponential-order -->
### 例：指数関数と、指数位数でない関数

**定義の確認**

$f(t)=t^3$ は指数位数 $1$ 以下です。実際、$t\ge0$ で $t^3e^{-t}$ は最大値を持つので、ある $M$ に対して

$$
t^3\le M e^t
$$

とできます。

一方、$f(t)=e^{t^2}$ はどの指数位数にも入りません。任意の $\alpha$ に対して

$$
\frac{e^{t^2}}{e^{\alpha t}}
=e^{t(t-\alpha)}\to\infty
$$

だからです。ここでは「指数減衰 $e^{-st}$ が元の増大を上回る」という Laplace 変換の機構そのものが失われます。
<!-- definition-example-end -->

<a id="def-ode5-laplace-transform"></a>
<!-- formal-statement-start -->
> **定義（Laplace変換）**  
> $f:[0,\infty)\to\mathbb R$ を各有限区間で区分的連続とする。実数 $s$ に対し

$$
\int_0^R e^{-st}f(t)\,dt
$$

> の $R\to\infty$ における極限が有限値として存在するとき、

$$
\boxed{\mathcal L\{f\}(s)
:=\int_0^\infty e^{-st}f(t)\,dt}
$$

> と定め、これを $f$ の Laplace 変換という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode5-laplace-transform -->
### 例：$e^{at}$ の変換を定義から計算する

**定義の確認**

$f(t)=e^{at}$ とする。$s>a$ なら

$$
\begin{aligned}
\int_0^R e^{-st}e^{at}\,dt
&=\int_0^R e^{-(s-a)t}\,dt\\
&=\frac{1-e^{-(s-a)R}}{s-a}.
\end{aligned}
$$

$s-a>0$ なので $R\to\infty$ で指数項が0へ収束し、

$$
\boxed{\mathcal L\{e^{at}\}(s)=\frac1{s-a}\qquad(s>a)}
$$

を得ます。$s\le a$ では同じ積分は収束しません。式だけでなく、**どの $s$ で変換できるか**も結果の一部です。
<!-- definition-example-end -->

<a id="thm-ode5-laplace-existence"></a>
<!-- formal-statement-start -->
> **定理（指数位数によるLaplace変換の存在）**  
> $f:[0,\infty)\to\mathbb R$ が各有限区間で区分的連続で、指数位数 $\alpha$ 以下とする。このとき任意の $s>\alpha$ で

$$
\int_0^\infty |e^{-st}f(t)|\,dt<\infty
$$

> となり、$\mathcal L\{f\}(s)$ は絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

有限区間は区分的連続性で処理し、十分大きい $t$ では

$$
|e^{-st}f(t)|\le M e^{-(s-\alpha)t}
$$

と指数関数で比較します。ここで必要なのが $s>\alpha$ です。

<!-- proof-start -->
### 証明

指数位数の定義から、ある $M>0,T\ge0$ が存在して

$$
|f(t)|\le M e^{\alpha t}\qquad(t\ge T)
$$

です。$s>\alpha$ を固定します。

$f$ は $[0,T]$ で区分的連続なので

$$
\int_0^T |e^{-st}f(t)|\,dt<\infty.
$$

一方、$R>T$ に対して

$$
\begin{aligned}
\int_T^R |e^{-st}f(t)|\,dt
&\le M\int_T^R e^{-(s-\alpha)t}\,dt\\
&\le M\int_T^\infty e^{-(s-\alpha)t}\,dt\\
&=\frac{M e^{-(s-\alpha)T}}{s-\alpha}<\infty.
\end{aligned}
$$

したがって絶対値を付けた積分が収束し、Laplace 変換も収束します。$\square$
<!-- proof-end -->

> **重要**：指数位数は十分条件です。「指数位数でなければ絶対に Laplace 変換できない」と逆向きまで主張しているわけではありません。

---

## 2. 線形性と基本変換表

<a id="prop-ode5-linearity"></a>
<!-- formal-statement-start -->
> **命題（Laplace変換の線形性）**  
> $f,g$ の Laplace 変換が同じ実数 $s$ で存在し、$a,b\in\mathbb R$ とする。このとき

$$
\boxed{\mathcal L\{af+bg\}(s)
=a\mathcal L\{f\}(s)+b\mathcal L\{g\}(s)}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限の $R$ では積分の線形性から

$$
\int_0^R e^{-st}(af(t)+bg(t))\,dt
=a\int_0^R e^{-st}f(t)\,dt
+b\int_0^R e^{-st}g(t)\,dt.
$$

両辺で $R\to\infty$ とすれば、仮定により右辺の二つの極限が存在するので主張を得ます。$\square$
<!-- proof-end -->

基本対を定義から作ります。

### 定数関数

$s>0$ なら

$$
\mathcal L\{1\}(s)
=\int_0^\infty e^{-st}\,dt
=\boxed{\frac1s}.
$$

### 多項式

$n=0,1,2,\ldots$ とする。$s>0$ で部分積分すると

$$
\begin{aligned}
\mathcal L\{t^n\}(s)
&=\int_0^\infty t^n e^{-st}\,dt\\
&=\left[-\frac{t^n}{s}e^{-st}\right]_0^\infty
+\frac ns\int_0^\infty t^{n-1}e^{-st}\,dt.
\end{aligned}
$$

$n\ge1$ では $t^ne^{-st}\to0$ なので

$$
\mathcal L\{t^n\}(s)
=\frac ns\mathcal L\{t^{n-1}\}(s).
$$

$\mathcal L\{1\}=1/s$ から帰納的に

$$
\boxed{\mathcal L\{t^n\}(s)=\frac{n!}{s^{n+1}}\qquad(s>0)}.
$$

この三つだけでも、線形性により多項式と有限個の指数関数の組合せを変換できます。

---

## 3. 微分は「$s$ 倍」だけではない：初期値が境界項として残る

Laplace 法が初期値問題に強い理由はここです。部分積分の $t=0$ の境界項が初期値になります。

<a id="thm-ode5-derivative-rule"></a>
<!-- formal-statement-start -->
> **定理（微分のLaplace変換）**  
> $n\ge1$ とし、$f\in C^n([0,\infty))$ とする。$f,f',\ldots,f^{(n)}$ がすべてある指数位数以下であるとする。$F(s)=\mathcal L\{f\}(s)$ と書く。このとき十分大きい $s$ で

$$
\boxed{
\mathcal L\{f^{(n)}\}(s)
=s^nF(s)-\sum_{j=0}^{n-1}s^{n-1-j}f^{(j)}(0)
}
$$

> が成り立つ。特に

$$
\mathcal L\{f'\}=sF-f(0),
$$

$$
\mathcal L\{f''\}=s^2F-sf(0)-f'(0).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一階の場合に $[0,R]$ で部分積分し、無限遠の境界項が指数位数によって消えることを確認します。高階は同じ一階公式を繰り返します。

<!-- proof-start -->
### 証明

まず $n=1$ を示します。$s$ を各関数の指数位数より十分大きく取る。$R>0$ に対して

$$
\begin{aligned}
\int_0^R e^{-st}f'(t)\,dt
&=\left[e^{-st}f(t)\right]_0^R
+s\int_0^R e^{-st}f(t)\,dt\\
&=e^{-sR}f(R)-f(0)
+s\int_0^R e^{-st}f(t)\,dt.
\end{aligned}
$$

$f$ が指数位数 $\alpha$ 以下なら、十分大きい $R$ で

$$
|e^{-sR}f(R)|\le M e^{-(s-\alpha)R}\to0.
$$

よって $R\to\infty$ として

$$
\mathcal L\{f'\}(s)=sF(s)-f(0).
$$

次に $f'$ へ同じ式を適用すると

$$
\mathcal L\{f''\}
=s\mathcal L\{f'\}-f'(0)
=s(sF-f(0))-f'(0),
$$

すなわち二階公式を得ます。同じ操作を $n$ 回繰り返すと

$$
\mathcal L\{f^{(n)}\}
=s^nF-\sum_{j=0}^{n-1}s^{n-1-j}f^{(j)}(0)
$$

となります。$\square$
<!-- proof-end -->

### 例：微分則から $\sin bt,\cos bt$ の変換を同時に出す

$b>0$ とし

$$
S(s)=\mathcal L\{\sin bt\},\qquad
C(s)=\mathcal L\{\cos bt\}
$$

と置きます。両関数は有界なので $s>0$ で変換できます。

$(\sin bt)'=b\cos bt$ から

$$
bC(s)=sS(s).
$$

$(\cos bt)'=-b\sin bt$ と $\cos0=1$ から

$$
-bS(s)=sC(s)-1.
$$

この連立方程式を解くと

$$
\boxed{
C(s)=\frac{s}{s^2+b^2},\qquad
S(s)=\frac{b}{s^2+b^2}
}\qquad(s>0).
$$

ここでは三角関数の広義積分を別々に暗算せず、微分構造をそのまま $s$ 領域へ移しました。

---

## 4. 二つの移動則：指数を掛けることと、時刻を遅らせること

<a id="thm-ode5-frequency-shift"></a>
<!-- formal-statement-start -->
> **定理（指数移動則）**  
> $F(s)=\mathcal L\{f\}(s)$ が存在するとする。実数 $a$ に対し、両辺が定義される範囲で

$$
\boxed{\mathcal L\{e^{at}f(t)\}(s)=F(s-a)}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義に代入すると

$$
\begin{aligned}
\mathcal L\{e^{at}f(t)\}(s)
&=\int_0^\infty e^{-st}e^{at}f(t)\,dt\\
&=\int_0^\infty e^{-(s-a)t}f(t)\,dt\\
&=F(s-a).
\end{aligned}
$$

収束範囲も $F$ の引数を $s-a$ に置き換えたものになります。$\square$
<!-- proof-end -->

例えば

$$
\mathcal L\{e^{at}\sin bt\}(s)
=\frac{b}{(s-a)^2+b^2}
$$

です。

<a id="def-ode5-unit-step"></a>
<!-- formal-statement-start -->
> **定義（単位階段関数）**  
> $a\ge0$ に対して

$$
u_a(t)=
\begin{cases}
0,&0\le t<a,\\
1,&t\ge a
\end{cases}
$$

> と定め、$u_a$ を時刻 $a$ の単位階段関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode5-unit-step -->
### 例：時刻3から二次関数を開始する

**定義の確認**

$$
g(t)=u_3(t)(t-3)^2
$$

なら

$$
g(t)=
\begin{cases}
0,&0\le t<3,\\
(t-3)^2,&t\ge3.
\end{cases}
$$

したがって、$u_3$ は「値を1にする関数」というより、**時刻3より前を0に切り落とすスイッチ**として働きます。
<!-- definition-example-end -->

<a id="thm-ode5-time-shift"></a>
<!-- formal-statement-start -->
> **定理（時間移動則）**  
> $a\ge0$ とし、$F(s)=\mathcal L\{f\}(s)$ が存在するとする。このとき

$$
\boxed{
\mathcal L\{u_a(t)f(t-a)\}(s)
=e^{-as}F(s)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

階段関数により $0\le t<a$ の積分は消えます。残った $[a,\infty)$ で $r=t-a$ と置けば、$e^{-as}$ が外へ出ます。

<!-- proof-start -->
### 証明

定義から

$$
\begin{aligned}
\mathcal L\{u_a(t)f(t-a)\}(s)
&=\int_a^\infty e^{-st}f(t-a)\,dt.
\end{aligned}
$$

$r=t-a$、すなわち $t=r+a$ と置くと

$$
\begin{aligned}
\int_a^\infty e^{-st}f(t-a)\,dt
&=\int_0^\infty e^{-s(r+a)}f(r)\,dr\\
&=e^{-as}\int_0^\infty e^{-sr}f(r)\,dr\\
&=e^{-as}F(s).
\end{aligned}
$$

$\square$
<!-- proof-end -->

したがって先ほどの例は

$$
\boxed{
\mathcal L\{u_3(t)(t-3)^2\}(s)
=e^{-3s}\frac{2}{s^3}
}.
$$

---

## 5. 逆変換は「候補を作って検証する」

この章では、すでに順変換で確認した対

$$
\mathcal L\{f\}=F
$$

に対して

$$
\mathcal L^{-1}\{F\}=f
$$

と書きます。

一般の関数空間で「Laplace 変換が同じなら元の関数も同じ」という一意性定理を証明するには、本章の前提を越える近似論や Fourier 解析などが必要になります。そこで本章の ODE 解法では、次の順で十分に厳密に進めます。

1. 変換表・部分分数分解・移動則で時間関数の**候補**を作る。
2. 必要なら候補をもう一度順変換して $F(s)$ に戻ることを確認する。
3. 初期値問題なら候補を元の ODE と初期条件へ代入する。
4. ODE2 の [連続係数線形高階初期値問題の存在・一意性](../ODE2/index.md#thm-ode2-linear-ivp) により、その候補が唯一の解であることを確定する。

この手順なら、未導入の一般反転定理を黒箱として使う必要がありません。

### 例：部分分数分解から戻す

$$
F(s)=\frac1{(s+1)(s+3)}
$$

を考えます。

$$
\frac1{(s+1)(s+3)}
=\frac12\left(\frac1{s+1}-\frac1{s+3}\right)
$$

なので、$\mathcal L\{e^{-at}\}=1/(s+a)$ から

$$
\boxed{
f(t)=\frac12(e^{-t}-e^{-3t})
}
$$

が逆変換候補です。順変換すると

$$
\frac12\left(\frac1{s+1}-\frac1{s+3}\right)
=F(s)
$$

へ戻るので確認できます。

重根なら

$$
\frac1{(s+a)^2}
=\mathcal L\{t e^{-at}\}(s)
$$

が使えます。これは $\mathcal L\{t\}=1/s^2$ に指数移動則を適用したものです。

---

## 6. 畳み込み：時間領域の積分が $s$ 領域の積になる

<a id="def-ode5-convolution"></a>
<!-- formal-statement-start -->
> **定義（片側畳み込み）**  
> $f,g:[0,\infty)\to\mathbb R$ を各有限区間で区分的連続とする。$t\ge0$ に対して

$$
\boxed{
(f*g)(t)
:=\int_0^t f(\tau)g(t-\tau)\,d\tau
}
$$

> と定め、これを片側畳み込みという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode5-convolution -->
### 例：$1*1$ は $t$

**定義の確認**

$f(t)=g(t)=1$ なら

$$
(f*g)(t)
=\int_0^t 1\cdot1\,d\tau
=t.
$$

したがって

$$
\mathcal L\{1*1\}
=\mathcal L\{t\}
=\frac1{s^2},
$$

一方

$$
\mathcal L\{1\}\mathcal L\{1\}
=\frac1s\frac1s
=\frac1{s^2}.
$$

畳み込み定理の最小例がすでに見えています。
<!-- definition-example-end -->

一般の場合に二重積分の順序を勝手に交換しないため、必要な形だけ補題として閉じます。

<a id="lem-ode5-triangle-interchange"></a>
<!-- formal-statement-start -->
> **補題（三角領域での積分交換）**  
> $T>0$ とし、$p,q$ が $[0,T]$ で区分的連続とする。このとき

$$
\boxed{
\int_0^T\left(\int_0^t p(\tau)q(t-\tau)\,d\tau\right)dt
=
\int_0^T p(\tau)
\left(\int_0^{T-\tau}q(u)\,du\right)d\tau
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

左辺の積分領域は

$$
0\le\tau\le t\le T.
$$

$u=t-\tau$ と置けば

$$
\tau\ge0,\quad u\ge0,\quad \tau+u\le T
$$

という同じ三角形になります。必要なのはこの有限三角形での順序交換だけです。

<!-- proof-start -->
### 証明

まず $p,q$ が連続の場合を示します。

三角形

$$
\Delta_T=\{(\tau,u):\tau\ge0,\ u\ge0,\ \tau+u\le T\}
$$

上で $h(\tau,u)=p(\tau)q(u)$ と置くと、$h$ は連続なので一様連続かつ有界です。

$[0,T]^2$ を一辺 $T/N$ の小正方形へ分割します。$\Delta_T$ の内部に完全に含まれる小正方形上では、$\tau$ を外側に積分しても $u$ を外側に積分しても、同じ二重和へ近づきます。境界直線 $\tau+u=T$ と交わる小正方形は高々 $2N$ 個なので、その総面積は

$$
2N\left(\frac{T}{N}\right)^2
=\frac{2T^2}{N}\to0.
$$

$|h|\le M$ とすれば境界帯の積分絶対値は高々 $2MT^2/N$ で0へ収束します。したがって二つの反復積分は同じ極限を持ちます。

元の左辺で $u=t-\tau$ と置くと、固定した $\tau$ に対して $t=\tau$ から $T$ は $u=0$ から $T-\tau$ に対応します。よって

$$
\int_0^T\int_0^t p(\tau)q(t-\tau)\,d\tau\,dt
=
\int_0^T p(\tau)\int_0^{T-\tau}q(u)\,du\,d\tau.
$$

$p,q$ が区分的連続の場合は、それぞれの有限個の不連続点で区間を分割すれば、各小区間では上の連続の場合を適用でき、有限和を取って同じ結論を得ます。$\square$
<!-- proof-end -->

<a id="thm-ode5-convolution"></a>
<!-- formal-statement-start -->
> **定理（Laplace変換の畳み込み定理）**  
> $f,g:[0,\infty)\to\mathbb R$ が各有限区間で区分的連続で、それぞれ指数位数 $\alpha,\beta$ 以下とする。$F(s)=\mathcal L\{f\}(s)$、$G(s)=\mathcal L\{g\}(s)$ とする。このとき任意の

$$
s>\max\{\alpha,\beta\}
$$

> で $f*g$ の Laplace 変換が存在し、

$$
\boxed{
\mathcal L\{f*g\}(s)=F(s)G(s)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$f_s(t)=e^{-st}f(t)$、$g_s(t)=e^{-st}g(t)$ と置くと、どちらも絶対可積分です。有限区間では直前の三角補題を使い、三角形の外側に残る部分は絶対積分の尾部で0へ押さえます。

<!-- proof-start -->
### 証明

$s>\max\{\alpha,\beta\}$ を固定し

$$
f_s(t)=e^{-st}f(t),\qquad
g_s(t)=e^{-st}g(t)
$$

と置きます。存在定理から

$$
A:=\int_0^\infty |f_s(t)|\,dt<\infty,
\qquad
B:=\int_0^\infty |g_s(t)|\,dt<\infty.
$$

まず畳み込み自体の絶対収束を確認します。指数位数の評価を有限区間まで定数を大きくして延長すれば、ある $M,N>0$ に対し

$$
|f(t)|\le Me^{\alpha t},\qquad
|g(t)|\le Ne^{\beta t}
$$

を $t\ge0$ で仮定できます。$m=\max\{\alpha,\beta\}$ とすると

$$
\begin{aligned}
|(f*g)(t)|
&\le\int_0^t M e^{\alpha\tau}N e^{\beta(t-\tau)}\,d\tau\\
&\le MN t e^{mt}.
\end{aligned}
$$

$s>m$ なら $t e^{-(s-m)t}$ は可積分なので $\mathcal L\{f*g\}(s)$ は絶対収束します。

次に

$$
F_T=\int_0^T f_s(u)\,du,
\qquad
G_T=\int_0^T g_s(v)\,dv
$$

と置きます。積を反復積分として書けば

$$
F_TG_T
=\int_0^T\int_0^T f_s(u)g_s(v)\,dv\,du.
$$

一方、三角補題を $p=f_s,q=g_s$ に適用すると

$$
C_T
:=\int_0^T e^{-st}(f*g)(t)\,dt
$$

は正方形 $[0,T]^2$ のうち $u+v\le T$ の三角部分の積分に一致します。

したがって $F_TG_T-C_T$ は $u+v>T$ の部分だけです。この領域では必ず $u>T/2$ または $v>T/2$ なので

$$
\begin{aligned}
|F_TG_T-C_T|
&\le
\left(\int_{T/2}^\infty |f_s(u)|\,du\right)B
+A\left(\int_{T/2}^\infty |g_s(v)|\,dv\right).
\end{aligned}
$$

絶対収束する積分の尾部は0へ収束するため、右辺は $T\to\infty$ で0です。また

$$
F_T\to F(s),\qquad G_T\to G(s),
$$

したがって $F_TG_T\to F(s)G(s)$。ゆえに

$$
\lim_{T\to\infty}C_T=F(s)G(s),
$$

すなわち

$$
\mathcal L\{f*g\}(s)=F(s)G(s).
$$

$\square$
<!-- proof-end -->

---

## 7. 定係数線形 ODE の初期値問題を代数化する

ODE2 の定係数 $n$ 階方程式を

$$
\sum_{k=0}^n a_k y^{(k)}(t)=f(t),
\qquad a_n\ne0
$$

と書きます。対応する多項式を

$$
P(s)=\sum_{k=0}^n a_k s^k
$$

とします。

<a id="thm-ode5-constant-coefficient-ivp"></a>
<!-- formal-statement-start -->
> **定理（定係数線形初期値問題のLaplace代数化）**  
> $a_n\ne0$ とし、$y\in C^n([0,\infty))$ が

$$
\sum_{k=0}^n a_k y^{(k)}(t)=f(t),
\qquad
y^{(j)}(0)=c_j\quad(j=0,\ldots,n-1)
$$

> を満たすとする。$y,y',\ldots,y^{(n)}$ と $f$ が Laplace 変換可能で、$Y(s)=\mathcal L\{y\}(s)$、$F(s)=\mathcal L\{f\}(s)$ とする。このとき

$$
\boxed{
P(s)Y(s)
=F(s)
+\sum_{k=1}^n a_k
\sum_{j=0}^{k-1}s^{k-1-j}c_j
}
$$

> が成り立つ。したがって $P(s)\ne0$ の範囲では

$$
\boxed{
Y(s)=
\frac{
F(s)+\displaystyle\sum_{k=1}^n a_k
\sum_{j=0}^{k-1}s^{k-1-j}c_j
}{P(s)}
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各 $y^{(k)}$ を微分則で変換すると、$s^kY$ と初期値多項式に分かれます。$Y$ の係数を集めるとちょうど特性多項式 $P(s)$ になります。

<!-- proof-start -->
### 証明

微分則より $k\ge1$ について

$$
\mathcal L\{y^{(k)}\}
=s^kY(s)-\sum_{j=0}^{k-1}s^{k-1-j}c_j.
$$

また $k=0$ では $\mathcal L\{y\}=Y$ です。したがって方程式の両辺を変換すると

$$
\sum_{k=0}^n a_k s^kY(s)
-
\sum_{k=1}^n a_k
\sum_{j=0}^{k-1}s^{k-1-j}c_j
=F(s).
$$

第1項は $P(s)Y(s)$ なので

$$
P(s)Y(s)
=F(s)
+\sum_{k=1}^n a_k
\sum_{j=0}^{k-1}s^{k-1-j}c_j.
$$

$P(s)\ne0$ なら割って $Y(s)$ の式を得ます。$\square$
<!-- proof-end -->

この定理は「変換した式が解を自動生成する」とまでは言っていません。逆変換候補を得たら元の ODE と初期条件へ代入します。そこで条件を満たせば、ODE2 の [初期値問題の一意性](../ODE2/index.md#thm-ode2-linear-ivp) により唯一の解です。

### 例：初期値と共鳴が一つの分数へ入る

$$
y''+3y'+2y=e^{-t},
\qquad y(0)=0,\quad y'(0)=1
$$

を解きます。

$Y=\mathcal L\{y\}$ とすると

$$
\mathcal L\{y''\}=s^2Y-1,
\qquad
\mathcal L\{y'\}=sY.
$$

右辺は $1/(s+1)$ なので

$$
(s^2+3s+2)Y-1=\frac1{s+1}.
$$

したがって

$$
\begin{aligned}
Y
&=\frac{1+1/(s+1)}{(s+1)(s+2)}\\
&=\frac{(s+2)/(s+1)}{(s+1)(s+2)}\\
&=\frac1{(s+1)^2}.
\end{aligned}
$$

よって候補は

$$
\boxed{y(t)=t e^{-t}}.
$$

確認すると

$$
y(0)=0,\qquad y'(t)=e^{-t}-te^{-t},\qquad y'(0)=1,
$$

さらに

$$
y''+3y'+2y=e^{-t}.
$$

したがって ODE2 の一意性によりこれが唯一の解です。特性根 $-1$ と外力 $e^{-t}$ が共鳴するため $t e^{-t}$ が現れることも、ODE2 の未定係数法と一致します。

### 例：時刻2でスイッチを入れる

$$
y'+y=u_2(t),
\qquad y(0)=0
$$

を考えます。時間移動則から

$$
\mathcal L\{u_2\}(s)=\frac{e^{-2s}}s.
$$

したがって

$$
(s+1)Y=\frac{e^{-2s}}s,
$$

$$
Y=e^{-2s}\frac1{s(s+1)}
=e^{-2s}\left(\frac1s-\frac1{s+1}\right).
$$

時間移動則を逆向きに読むと

$$
\boxed{
y(t)=u_2(t)\left(1-e^{-(t-2)}\right)
}.
$$

実際、$t<2$ では $y=0$、$t>2$ では $y'+y=1$ です。また $t=2$ で左右の値はいずれも0なので $y$ は連続です。外力に跳びがあっても、解そのものが必ず跳ぶわけではありません。

---

## 8. 畳み込みと ODE2 の Green 核は同じ構造を見る

零初期値

$$
P(D)y=f,
\qquad y(0)=\cdots=y^{(n-1)}(0)=0
$$

では、形式的な代数式は

$$
Y(s)=\frac1{P(s)}F(s)
$$

です。

<a id="def-ode5-response-kernel"></a>
<!-- formal-statement-start -->
> **定義（伝達因子・応答核）**  
> 零初期値の定係数線形 ODE $P(D)y=f$ に対し

$$
H(s)=\frac1{P(s)}
$$

> を伝達因子という。時間関数 $h$ が順変換で

$$
\mathcal L\{h\}(s)=H(s)
$$

> を満たすとき、本章では $h$ をその方程式の応答核という。畳み込み $h*f$ が元の ODE と零初期条件を満たすことを確認できれば、それが零初期値応答である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode5-response-kernel -->
### 例：調和振動子の応答核

**定義の確認**

$$
y''+\omega^2y=f(t),
\qquad y(0)=y'(0)=0,
\qquad \omega>0
$$

では

$$
P(s)=s^2+\omega^2,
\qquad
H(s)=\frac1{s^2+\omega^2}.
$$

基本変換表から

$$
h(t)=\frac{\sin\omega t}{\omega}
$$

は確かに

$$
\mathcal L\{h\}(s)=H(s)
$$

を満たします。ODE2 の [調和振動子のGreen核表示](../ODE2/index.md#thm-ode2-oscillator-green) でも

$$
\boxed{
y(t)=\int_0^t\frac{\sin\omega(t-\tau)}{\omega}f(\tau)\,d\tau}
$$

が得られていました。これはちょうど

$$
y=h*f
$$

です。
<!-- definition-example-end -->

畳み込み定理から

$$
\mathcal L\{h*f\}=H(s)F(s)
$$

となり、ODE2 の Green 核表示と Laplace 法が同じ構造を見ていることが分かります。

工学ではこの $h$ を**インパルス応答**と呼びます。理想的な瞬間入力を Dirac delta で表し「delta を入れたときの応答」と説明することが多いのですが、本章では delta を通常の関数として扱いません。ここで厳密に使っているのは、**$h$ が零初期値応答を作る畳み込み核であること**だけです。Dirac delta の超関数としての定義・微分・畳み込みは Encore III の範囲です。

---

## 9. Laplace法が特に効く場面と、効かない場面

Laplace 法の強みは、次の三つが同時にある場面です。

- 定係数線形 ODE である。
- 初期値が $t=0$ に与えられている。
- 外力が指数関数・多項式・三角関数・階段入力など、変換しやすい。

一方、次の点には注意が必要です。

- $e^{t^2}$ のように指数減衰より速く増える関数では、通常の Laplace 変換が存在しないことがある。
- 変係数方程式では、時間領域の積 $a(t)y(t)$ が単純な $s$ 領域の積にはならない。
- 境界値問題では初期値が未知なので、Laplace 法の「境界項に初期値がそのまま入る」利点が弱くなる。
- 一般の逆変換を厳密に構成する理論は本章の射程外である。ODE では候補を元の方程式へ戻して検証する。
- Dirac delta を通常関数のように積分して済ませない。

つまり Laplace 変換は「微分方程式なら何でも解く魔法」ではなく、**初期値付き定係数線形系を、時間領域の微分から $s$ 領域の代数へ変える道具**です。

---

## 10. 演習

### Level A

<a id="ex-ode5-a01"></a>
#### ODE5-A01 収束範囲と基本変換
- Level: A

$$
f(t)=3-2e^{2t}+t
$$

とする。

1. $f$ が指数位数2以下であることを確認せよ。
2. $\mathcal L\{f\}(s)$ を求めよ。
3. 得られた式を正当化できる $s$ の範囲を答えよ。

<!-- solution-start -->
#### 詳細解答

1. $t\ge0$ で $3\le3e^{2t}$、$2e^{2t}=2e^{2t}$ です。また $te^{-2t}$ は $[0,\infty)$ で有界なので、ある $C>0$ に対して $t\le Ce^{2t}$。したがって

$$
|f(t)|\le (5+C)e^{2t},
$$

よって指数位数2以下です。

2. 線形性と基本変換表から

$$
\begin{aligned}
\mathcal L\{f\}(s)
&=3\mathcal L\{1\}(s)
-2\mathcal L\{e^{2t}\}(s)
+\mathcal L\{t\}(s)\\
&=\frac3s-\frac2{s-2}+\frac1{s^2}.
\end{aligned}
$$

3. 各項の条件は

$$
\frac3s:s>0,\qquad
\frac2{s-2}:s>2,\qquad
\frac1{s^2}:s>0.
$$

共通範囲は

$$
\boxed{s>2}.
$$

<!-- solution-end -->

<a id="ex-ode5-a02"></a>
#### ODE5-A02 微分則と初期値
- Level: A

$f\in C^2([0,\infty))$ とし、$f,f',f''$ は Laplace 変換可能とする。$f(0)=2$、$f'(0)=-1$、$F(s)=\mathcal L\{f\}(s)$ とする。

1. $\mathcal L\{f'\}(s)$ を $F(s)$ で表せ。
2. $\mathcal L\{f''\}(s)$ を $F(s)$ で表せ。
3. なぜ初期値が現れるのか、部分積分の境界項を用いて説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 一階微分則より

$$
\boxed{\mathcal L\{f'\}=sF-2}.
$$

2. 二階微分則より

$$
\boxed{\mathcal L\{f''\}=s^2F-2s+1}.
$$

$f'(0)=-1$ なので最後の項は $-f'(0)=+1$ です。

3. 有限区間で

$$
\int_0^R e^{-st}f'(t)\,dt
=\left[e^{-st}f(t)\right]_0^R
+s\int_0^R e^{-st}f(t)\,dt.
$$

無限遠の項 $e^{-sR}f(R)$ は指数位数の条件で0になりますが、$t=0$ の項は

$$
-e^0f(0)=-f(0)
$$

として残ります。これが Laplace 変換に初期値が埋め込まれる機構です。

<!-- solution-end -->

<a id="ex-ode5-a03"></a>
#### ODE5-A03 時間移動則
- Level: A

$$
g(t)=u_3(t)(t-3)^2
$$

とする。

1. $g$ を区分表示せよ。
2. $\mathcal L\{g\}(s)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

1. 単位階段関数の定義から

$$
\boxed{
g(t)=
\begin{cases}
0,&0\le t<3,\\
(t-3)^2,&t\ge3.
\end{cases}}
$$

2. $f(r)=r^2$ と置けば $g(t)=u_3(t)f(t-3)$。時間移動則より

$$
\mathcal L\{g\}(s)
=e^{-3s}\mathcal L\{t^2\}(s).
$$

基本変換表から $\mathcal L\{t^2\}=2/s^3$ なので

$$
\boxed{
\mathcal L\{g\}(s)=\frac{2e^{-3s}}{s^3}
}\qquad(s>0).
$$

<!-- solution-end -->

<a id="ex-ode5-a04"></a>
#### ODE5-A04 部分分数による逆変換候補
- Level: A

$$
F(s)=\frac1{(s+1)(s+3)}
$$

について、時間関数 $f(t)$ の候補を求め、順変換して $F(s)$ へ戻ることを確認せよ。

<!-- solution-start -->
#### 詳細解答

部分分数分解を

$$
\frac1{(s+1)(s+3)}
=\frac{A}{s+1}+\frac{B}{s+3}
$$

と置く。両辺に $(s+1)(s+3)$ を掛けると

$$
1=A(s+3)+B(s+1).
$$

$s=-1$ で $1=2A$ だから $A=1/2$、$s=-3$ で $1=-2B$ だから $B=-1/2$。よって

$$
F(s)=\frac12\frac1{s+1}-\frac12\frac1{s+3}.
$$

したがって候補は

$$
\boxed{f(t)=\frac12(e^{-t}-e^{-3t})}.
$$

順変換すると

$$
\mathcal L\{f\}(s)
=\frac12\frac1{s+1}-\frac12\frac1{s+3}
=\frac1{(s+1)(s+3)},
$$

確かに元の $F(s)$ へ戻ります。

<!-- solution-end -->

### Level B

<a id="ex-ode5-b01"></a>
#### ODE5-B01 共鳴を含む二階初期値問題
- Level: B

$$
y''+3y'+2y=e^{-t},
\qquad y(0)=0,\quad y'(0)=1
$$

を Laplace 変換で解き、最後に元の ODE と初期条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

$Y(s)=\mathcal L\{y\}(s)$ とする。初期値を使うと

$$
\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)=s^2Y-1,
$$

$$
\mathcal L\{y'\}=sY-y(0)=sY.
$$

右辺は

$$
\mathcal L\{e^{-t}\}=\frac1{s+1}.
$$

したがって

$$
(s^2Y-1)+3sY+2Y=\frac1{s+1},
$$

$$
(s+1)(s+2)Y
=1+\frac1{s+1}
=\frac{s+2}{s+1}.
$$

よって

$$
Y=\frac1{(s+1)^2}.
$$

$\mathcal L\{t\}=1/s^2$ に指数移動則を使えば

$$
\mathcal L\{te^{-t}\}=\frac1{(s+1)^2},
$$

したがって候補は

$$
\boxed{y(t)=te^{-t}}.
$$

確認する。

$$
y'(t)=(1-t)e^{-t},
\qquad
y''(t)=(t-2)e^{-t}.
$$

よって

$$
\begin{aligned}
y''+3y'+2y
&=[(t-2)+3(1-t)+2t]e^{-t}\\
&=e^{-t}.
\end{aligned}
$$

また

$$
y(0)=0,\qquad y'(0)=1.
$$

ODE2 の存在・一意性定理より、これが唯一の解です。

<!-- solution-end -->

<a id="ex-ode5-b02"></a>
#### ODE5-B02 遅延階段入力
- Level: B

$$
y'+y=u_2(t),
\qquad y(0)=0
$$

を Laplace 変換で解け。得られた解を $t<2$ と $t>2$ に分け、元の方程式を確認せよ。

<!-- solution-start -->
#### 詳細解答

$Y=\mathcal L\{y\}$ とする。微分則から

$$
\mathcal L\{y'\}=sY.
$$

また

$$
u_2(t)=u_2(t)\cdot1
$$

なので時間移動則から

$$
\mathcal L\{u_2\}(s)
=e^{-2s}\mathcal L\{1\}(s)
=\frac{e^{-2s}}s.
$$

したがって

$$
(s+1)Y=\frac{e^{-2s}}s,
$$

$$
Y=e^{-2s}\frac1{s(s+1)}.
$$

部分分数分解すると

$$
\frac1{s(s+1)}=\frac1s-\frac1{s+1}.
$$

よって時間移動則を逆向きに使い

$$
\boxed{
y(t)=u_2(t)\left(1-e^{-(t-2)}\right)}.
$$

区分表示すれば

$$
y(t)=
\begin{cases}
0,&0\le t<2,\\
1-e^{-(t-2)},&t\ge2.
\end{cases}
$$

$t<2$ では $u_2=0$ かつ $y'=y=0$ なので方程式を満たす。$t>2$ では

$$
y'(t)=e^{-(t-2)},
$$

したがって

$$
y'+y=e^{-(t-2)}+1-e^{-(t-2)}=1=u_2(t).
$$

また $y(0)=0$。$t=2$ では右辺が跳ぶため $y'$ は跳び得ますが、$y$ 自体は左右から0へ一致します。

<!-- solution-end -->

<a id="ex-ode5-b03"></a>
#### ODE5-B03 畳み込みと調和振動子Green核
- Level: B

$\omega>0$ とし

$$
y''+\omega^2y=1,
\qquad y(0)=y'(0)=0
$$

を考える。

1. 応答核 $h(t)=\sin(\omega t)/\omega$ と入力 $f(t)=1$ の畳み込みを直接計算せよ。
2. Laplace 変換でも同じ結果を得よ。
3. 元の ODE と初期条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

1. 畳み込みは

$$
\begin{aligned}
(h*f)(t)
&=\int_0^t\frac{\sin\omega(t-\tau)}{\omega}\,d\tau.
\end{aligned}
$$

$r=t-\tau$ と置くと

$$
\begin{aligned}
(h*f)(t)
&=\frac1\omega\int_0^t\sin\omega r\,dr\\
&=\frac1\omega\left[\frac{1-\cos\omega t}{\omega}\right]\\
&=\boxed{\frac{1-\cos\omega t}{\omega^2}}.
\end{aligned}
$$

2. 零初期値なので

$$
(s^2+\omega^2)Y=\frac1s.
$$

したがって

$$
Y=\frac1{s(s^2+\omega^2)}.
$$

部分分数型に直すと

$$
\frac1{s(s^2+\omega^2)}
=\frac1{\omega^2}\left(\frac1s-\frac{s}{s^2+\omega^2}\right).
$$

よって

$$
y(t)=\frac1{\omega^2}(1-\cos\omega t),
$$

畳み込み計算と一致します。

3. 微分すると

$$
y'(t)=\frac{\sin\omega t}{\omega},
\qquad
y''(t)=\cos\omega t.
$$

したがって

$$
y''+\omega^2y
=\cos\omega t+1-\cos\omega t=1.
$$

また $y(0)=0$、$y'(0)=0$。よって唯一の解です。

<!-- solution-end -->

### Level C

<a id="ex-ode5-c01"></a>
#### ODE5-C01 初期値・重根・遅延入力を一つの式で処理する
- Level: C

$$
y''+2y'+y=u_1(t),
\qquad y(0)=1,\quad y'(0)=0
$$

を Laplace 変換で解け。次をすべて示すこと。

1. 初期値を含む $Y(s)$ の方程式。
2. 初期値由来部分と遅延入力由来部分の分離。
3. 遅延入力部分の部分分数分解。
4. 時間領域の解。
5. $t<1$ と $t>1$ で元の ODE を満たすこと、および $t=1$ で $y,y'$ が連続すること。

<!-- solution-start -->
#### 詳細解答

$Y=\mathcal L\{y\}$ とする。初期値 $y(0)=1,y'(0)=0$ から

$$
\mathcal L\{y'\}=sY-1,
$$

$$
\mathcal L\{y''\}=s^2Y-s.
$$

また

$$
\mathcal L\{u_1\}(s)=\frac{e^{-s}}s.
$$

したがって

$$
(s^2Y-s)+2(sY-1)+Y=\frac{e^{-s}}s.
$$

整理して

$$
(s+1)^2Y-(s+2)=\frac{e^{-s}}s,
$$

よって

$$
Y
=\frac{s+2}{(s+1)^2}
+e^{-s}\frac1{s(s+1)^2}.
$$

これが初期値由来部分と遅延入力由来部分の分離です。

まず

$$
\frac{s+2}{(s+1)^2}
=\frac1{s+1}+\frac1{(s+1)^2}.
$$

したがって時間領域では

$$
y_0(t)=e^{-t}+te^{-t}.
$$

次に

$$
\frac1{s(s+1)^2}
=\frac{A}{s}+\frac{B}{s+1}+\frac{C}{(s+1)^2}
$$

と置く。両辺に $s(s+1)^2$ を掛けると

$$
1=A(s+1)^2+Bs(s+1)+Cs.
$$

$s=0$ で $A=1$。$s^2$ の係数から

$$
A+B=0\quad\Longrightarrow\quad B=-1.
$$

$s$ の係数から

$$
2A+B+C=0
\quad\Longrightarrow\quad
2-1+C=0,
$$

よって $C=-1$。したがって

$$
\frac1{s(s+1)^2}
=\frac1s-\frac1{s+1}-\frac1{(s+1)^2}.
$$

この逆変換候補は

$$
h(t)=1-e^{-t}-te^{-t}.
$$

外側の $e^{-s}$ は1だけの時間遅延を表すので

$$
\boxed{
y(t)
=e^{-t}+te^{-t}
+u_1(t)\left[1-e^{-(t-1)}-(t-1)e^{-(t-1)}\right]
}.
$$

ここから検証します。

### $0\le t<1$

階段項は0なので

$$
y(t)=(1+t)e^{-t}.
$$

微分すると

$$
y'(t)=-te^{-t},
$$

$$
y''(t)=(t-1)e^{-t}.
$$

したがって

$$
\begin{aligned}
y''+2y'+y
&=[(t-1)-2t+(1+t)]e^{-t}\\
&=0
=u_1(t).
\end{aligned}
$$

また $y(0)=1,y'(0)=0$。

### $t>1$

$r=t-1$ と置くと遅延部分は

$$
h(r)=1-(1+r)e^{-r}.
$$

$h'(r)=re^{-r}$、$h''(r)=(1-r)e^{-r}$ なので

$$
h''+2h'+h
=(1-r)e^{-r}+2re^{-r}+1-(1+r)e^{-r}=1.
$$

初期値由来部分 $y_0=(1+t)e^{-t}$ は斉次方程式

$$
y_0''+2y_0'+y_0=0
$$

を満たします。よって $t>1$ では全体として

$$
y''+2y'+y=1=u_1(t).
$$

### $t=1$ の接続

遅延部分について

$$
h(0)=1-1-0=0,
$$

$$
h'(0)=0.
$$

したがって階段項が時刻1から加わっても $y$ と $y'$ の値には跳びがありません。よって解は二階方程式の古典解として必要な接続を満たします。

ODE2 の一意性定理により、この解が唯一です。

<!-- solution-end -->

---

## 11. この章で閉じたこと

- Laplace 変換を無限区間の積分として定義し、指数位数から収束半直線を評価した。
- 線形性を積分の線形性から、微分則を部分積分と無限遠境界項の消失から導いた。
- $\sin,\cos$ の変換を微分則から再構成し、指数移動則・時間移動則を定義から証明した。
- 逆変換は一般反転定理を無断使用せず、変換表・部分分数・移動則で候補を作って順変換または ODE へ代入して検証する方針にした。
- 片側畳み込みを定義し、有限三角領域の積分交換を直接示した上で、絶対収束の尾部評価から畳み込み定理を証明した。
- 定係数線形 IVP が $P(s)Y(s)=F(s)+\text{初期値多項式}$ へ変わる一般式を導いた。
- 階段入力を時間移動則で処理し、遅延前後の解を実際に確認した。
- ODE2 の Green 核と Laplace 領域の伝達因子を畳み込みで結び付けた。
- インパルス応答は応答核という意味まで扱い、Dirac delta の厳密な超関数論は先取りしなかった。

次の ODE6 では、常点での冪級数解と正則特異点へ進みます。
