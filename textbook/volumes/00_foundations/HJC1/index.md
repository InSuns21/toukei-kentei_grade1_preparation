# HJC1 決定論的最適制御・動的計画原理・HJB の導出

<!-- definition-example-audit: strict -->

[PDE12 の Hamilton--Jacobi 方程式](../PDE12/index.md#def-pde12-hamilton-jacobi)では、

$$
u_t+H(x,\nabla u)=0
$$

という一階非線形 PDE を、特性曲線と Hamilton の正準方程式から調べました。

そこで Hamiltonian $H$ は最初から与えられていました。本章では逆向きの問いを考えます。

> 時間発展する状態を自分で操作し、将来の費用をできるだけ小さくしたいとき、なぜ Hamilton--Jacobi 型 PDE が現れるのか。

状態を $x(s)$、操作を $u(s)$ とします。たとえば車の位置が $x$、アクセルや操舵が $u$ です。操作を変えれば軌道が変わり、軌道が変われば将来の費用も変わります。

この問題では、一つの最適軌道だけを追うのではなく、

$$
\boxed{
V(t,x)
=
\text{時刻 }t\text{ に状態 }x\text{ から始めたときの最小将来費用}
}
$$

という関数を作ります。

すると

$$
\text{最初の短時間をどう操作するか}
+
\text{その後の最適費用}
$$

という時間分割から、値関数 $V$ 自身が PDE を満たすことが見えてきます。

本章の流れは

$$
\boxed{
\text{制御付き ODE}
\to
\text{value function}
\to
\text{dynamic programming}
\to
\text{短時間展開}
\to
\text{HJB}
\to
\text{verification}
}
$$

です。

---

## 1. ODE に「選べる入力」を入れる

通常の自律 ODE

$$
\dot x=f(x)
$$

では、初期状態が決まれば右辺も決まります。

最適制御では右辺に制御値 $a$ を入れ、

$$
\dot x=f(x,a)
$$

とします。時間ごとに選ぶ $a$ を $u(s)$ と書けば

$$
\dot x(s)
=
f(x(s),u(s))
$$

です。

本章では有限時間区間

$$
[t,T]
$$

を固定し、制御値集合を

$$
U\subset\mathbb R^m
$$

とします。

技術的な一般論へ入りすぎないため、許容制御は $U$ 値の piecewise continuous 関数とします。また、扱う $f$ については、各許容制御を固定した状態方程式が $[t,T]$ 全体で一意に解けることを仮定します。

これはたとえば $f$ が $x$ について局所 Lipschitz で、解が有限時間で発散しない十分条件を持つ場合に保証できます。局所存在一意性の基本機構は [Picard--Lindelöf の定理](../ODE1/index.md#thm-ode1-picard-lindelof)です。

<a id="def-hjc1-admissible-control"></a>
<!-- formal-statement-start -->
### 定義（許容制御と制御軌道）

$0\le t<T$、制御値集合 $U\subset\mathbb R^m$ とする。

$U$ 値 piecewise continuous 関数

$$
u:[t,T]\to U
$$

を本章の **許容制御** とする。

初期状態 $x\in\mathbb R^d$ に対し、

$$
\dot X(s)
=
f(X(s),u(s)),
\qquad
X(t)=x
$$

を満たす一意な解を

$$
X^{t,x;u}(s)
$$

と書き、$u$ に対応する **制御軌道** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc1-admissible-control -->
### **定義の確認**：速度を直接選ぶ

一次元で

$$
\dot X(s)=u(s),
\qquad
U=[-1,1]
$$

とします。

定数制御

$$
u(s)\equiv a,
\qquad
|a|\le1
$$

を選ぶと

$$
X(s)
=
x+a(s-t)
$$

です。

実際、

$$
\frac{d}{ds}
\{x+a(s-t)\}
=
a
=
u(s),
$$

かつ

$$
X(t)=x
$$

なので定義の条件を満たします。

制御値 $a$ を変えると、同じ初期状態から別の軌道を選べます。
<!-- definition-example-end -->

---

## 2. 「どの軌道がよいか」を費用で測る

軌道を選べるだけでは、どれを選ぶべきか決まりません。

そこで、時刻ごとに支払う **running cost**

$$
L(x,a)
$$

と、終端時刻で支払う **terminal cost**

$$
g(x)
$$

を与えます。

許容制御 $u$ の総費用を

$$
J_{t,x}(u)
=
g(X^{t,x;u}(T))
+
\int_t^T
L(X^{t,x;u}(s),u(s))\,ds
$$

とします。

本章では、以下で現れる積分と infimum が有限値として意味を持つ設定を考えます。

<a id="def-hjc1-value-function"></a>
<!-- formal-statement-start -->
### 定義（cost functional と value function）

初期時刻 $t$、初期状態 $x$、許容制御 $u$ に対して

$$
J_{t,x}(u)
=
g(X^{t,x;u}(T))
+
\int_t^T
L(X^{t,x;u}(s),u(s))\,ds
$$

を **cost functional** とする。

許容制御全体を $\mathcal U[t,T]$ と書き、

$$
V(t,x)
=
\inf_{u\in\mathcal U[t,T]}
J_{t,x}(u)
$$

で定まる $V$ を **value function** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc1-value-function -->
### **定義の確認**：終点を原点へ近づけたい

$$
\dot X=u,
\qquad
|u|\le1,
$$

$$
L\equiv0,
\qquad
g(y)=|y|
$$

とします。

残り時間を

$$
\tau=T-t
$$

と書きます。

初期位置が $x>0$ なら、原点へ最速で向かうには

$$
u=-1
$$

を選びます。時間 $\tau$ で最大 $\tau$ だけ左へ動けるので、

- $x>\tau$ なら終端で最小でも $x-\tau$ 離れる。
- $0\le x\le\tau$ なら途中で原点へ到達し、その後 $u=0$ として終端距離を0にできる。

$x<0$ でも対称です。従って

$$
\boxed{
V(t,x)
=
\max\{|x|-(T-t),0\}
}.
$$

この例は後で HJB を直接確認するためにも使います。
<!-- definition-example-end -->

---

## 3. 最適化問題を途中で切っても、残りは同じ種類の問題になる

value function の本質は、未来全体を一度に見なくてもよいことです。

時刻 $t$ から $t+h$ まで制御した後、状態が

$$
y=X^{t,x;u}(t+h)
$$

へ移ったとします。

その後の区間

$$
[t+h,T]
$$

では、「時刻 $t+h$ に状態 $y$ から始める最適制御問題」がそのまま残ります。

したがって最初の区間の費用と、その後の value function を足せばよいはずです。

<a id="thm-hjc1-dpp"></a>
<!-- formal-statement-start -->
### 定理（dynamic programming principle）

$0\le t<t+h\le T$ とする。

許容制御が区間の restriction と concatenation で閉じており、対応する制御軌道が一意に定まるとする。

このとき

$$
V(t,x)
=
\inf_{u\in\mathcal U[t,t+h]}
\left\{
\int_t^{t+h}
L(X^{t,x;u}(s),u(s))\,ds
+
V(t+h,X^{t,x;u}(t+h))
\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの不等式を別々に示します。

1. 任意の全区間制御を最初と後半に分ければ、後半の実際の費用は後半の value function 以上です。
2. 逆向きでは、最初の区間の制御を固定し、その到達点から value function に $\varepsilon$ だけ近い後半制御を選んで連結します。

「最適制御が必ず存在する」と仮定しなくても、infimum の定義だけで証明できます。

<!-- proof-start -->
### 証明

右辺を

$$
R(t,x)
$$

と書きます。

まず

$$
V(t,x)\ge R(t,x)
$$

を示します。

任意の全区間制御

$$
u\in\mathcal U[t,T]
$$

を取ります。その restriction を

$$
u_1=u|_{[t,t+h]},
\qquad
u_2=u|_{[t+h,T]}
$$

とし、

$$
y=X^{t,x;u}(t+h)
$$

と置きます。

軌道の一意性から、後半の軌道は $t+h$ に $y$ から $u_2$ で再出発した軌道と一致します。従って

$$
\begin{aligned}
J_{t,x}(u)
&=
\int_t^{t+h}
L(X^{t,x;u_1}(s),u_1(s))\,ds\\
&\quad+
J_{t+h,y}(u_2).
\end{aligned}
$$

value function は後半の全制御に対する infimum なので

$$
J_{t+h,y}(u_2)
\ge
V(t+h,y).
$$

従って

$$
J_{t,x}(u)
\ge
\int_t^{t+h}
L(X^{t,x;u_1}(s),u_1(s))\,ds
+
V(t+h,y).
$$

右辺は $u_1$ に関する infimum $R(t,x)$ 以上ですから

$$
J_{t,x}(u)\ge R(t,x).
$$

これは任意の $u\in\mathcal U[t,T]$ で成り立つので

$$
V(t,x)
=
\inf_uJ_{t,x}(u)
\ge
R(t,x).
$$

次に逆向き

$$
V(t,x)\le R(t,x)
$$

を示します。

任意の

$$
u_1\in\mathcal U[t,t+h]
$$

を固定し、

$$
y=X^{t,x;u_1}(t+h)
$$

と置きます。

任意の $\varepsilon>0$ に対し、infimum の定義から後半制御

$$
u_2\in\mathcal U[t+h,T]
$$

を

$$
J_{t+h,y}(u_2)
\le
V(t+h,y)+\varepsilon
$$

となるように選べます。

$u_1$ と $u_2$ を $t+h$ で連結した制御を $u_1*u_2$ と書きます。concatenation の仮定からこれは許容制御です。

費用を分割すると

$$
\begin{aligned}
V(t,x)
&\le
J_{t,x}(u_1*u_2)\\
&=
\int_t^{t+h}
L(X^{t,x;u_1}(s),u_1(s))\,ds
+
J_{t+h,y}(u_2)\\
&\le
\int_t^{t+h}
L(X^{t,x;u_1}(s),u_1(s))\,ds\\
&\quad+
V(t+h,y)
+
\varepsilon.
\end{aligned}
$$

$u_1$ は任意なのでその infimumを取り、

$$
V(t,x)
\le
R(t,x)+\varepsilon.
$$

さらに $\varepsilon>0$ は任意だから

$$
V(t,x)\le R(t,x).
$$

二つの不等式を合わせて

$$
V(t,x)=R(t,x)
$$

です。$\square$
<!-- proof-end -->

この定理が Bellman の考え方の数学的な中心です。

重要なのは、未来を

$$
[t,T]
$$

のまま最適化する代わりに、

$$
[t,t+h]
+
[t+h,T]
$$

へ切り分けても最適化の形が変わらないことです。

---

## 4. 短時間 $h$ を見ると PDE の微分が現れる

DPP の右辺で、最初の短時間だけ定数制御

$$
u(s)\equiv a
$$

を選びます。

状態方程式は

$$
\dot X=f(X,a),
\qquad
X(t)=x
$$

なので、$h\downarrow0$ では

$$
X(t+h)
=
x+h f(x,a)+o(h).
$$

この式は

$$
X(t+h)-x
=
\int_t^{t+h}f(X(s),a)\,ds
$$

から得られます。連続性により

$$
f(X(s),a)
=
f(x,a)+o(1)
$$

だから、

$$
X(t+h)-x
=
h f(x,a)+o(h).
$$

running cost についても

$$
\int_t^{t+h}L(X(s),a)\,ds
=
hL(x,a)+o(h)
$$

です。実際、積分平均と連続性から

$$
\frac1h
\int_t^{t+h}L(X(s),a)\,ds
\longrightarrow
L(x,a)
$$

となるためです。

value function が $C^1$ なら、増分

$$
\bigl(h,\,X(t+h)-x\bigr)
$$

に対する微分可能性から

$$
\begin{aligned}
V(t+h,X(t+h))
&=
V(t,x)
+
hV_t(t,x)\\
&\quad+
\nabla_xV(t,x)\cdot
\{X(t+h)-x\}
+
o(h).
\end{aligned}
$$

ここへ

$$
X(t+h)-x
=
hf(x,a)+o(h)
$$

を代入すると

$$
V(t+h,X(t+h))
=
V(t,x)
+
h\{
V_t+\nabla V\cdot f(x,a)
\}
+
o(h).
$$

DPP の短時間費用と合わせると

$$
V(t,x)
\le
V(t,x)
+
h\{
V_t+\nabla V\cdot f(x,a)+L(x,a)
\}
+
o(h).
$$

従って

$$
V_t(t,x)
+
L(x,a)
+
f(x,a)\cdot\nabla V(t,x)
\ge0
$$

が任意の $a$ に対して現れます。

残る仕事は「最適な $a$ では等号になる」ことです。その最小化を一つの関数へまとめます。

---

## 5. 最小化を Hamiltonian にまとめる

[PDE12](../PDE12/index.md#def-pde12-hamilton-jacobi)の Hamiltonian は力学から与えられていました。

最適制御では、状態 $x$ と勾配 $p$ を固定したとき、

$$
L(x,a)+f(x,a)\cdot p
$$

を制御値 $a$ で最小化したものが Hamiltonian になります。

<a id="def-hjc1-control-hamiltonian"></a>
<!-- formal-statement-start -->
### 定義（最適制御 Hamiltonian）

制御値集合 $U$、状態方程式の右辺 $f$、running cost $L$ に対し、

$$
\mathcal H(x,p)
=
\inf_{a\in U}
\left\{
L(x,a)+f(x,a)\cdot p
\right\}
$$

を、minimization convention における **最適制御 Hamiltonian** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc1-control-hamiltonian -->
### **定義の確認**：二次の制御費用

一次元で

$$
f(x,a)=a,
\qquad
L(x,a)=\frac12a^2,
\qquad
U=\mathbb R
$$

とします。

すると

$$
\mathcal H(p)
=
\inf_{a\in\mathbb R}
\left\{
\frac12a^2+ap
\right\}.
$$

平方完成すると

$$
\frac12a^2+ap
=
\frac12(a+p)^2
-
\frac12p^2.
$$

最小値は

$$
a^*=-p
$$

で達成され、

$$
\boxed{
\mathcal H(p)
=
-\frac12p^2
}.
$$
<!-- definition-example-end -->

符号規約には注意が必要です。

本章は

$$
V=\inf J
$$

という最小化問題なので

$$
\mathcal H
=
\inf_a\{L+f\cdot p\}
$$

と置きます。

最大化問題や Hamiltonian の符号を反転する流儀では HJB の見た目も変わります。重要なのは、定義と PDE を一貫させることです。

---

## 6. DPP から Hamilton--Jacobi--Bellman 方程式へ

前節で制御値 $a$ に関する最小化を $\mathcal H$ へまとめました。すると DPP の短時間展開に残るのは、value function の時間変化 $V_t$ と状態変化 $\nabla V$ です。

ここで欲しいのは、「各点で最適な制御を選ぶ」という操作を内蔵した Hamiltonian と、value function の微分を一つの終端値 PDE にまとめることです。その方程式を本節で正式に固定します。

<a id="def-hjc1-hjb"></a>
<!-- formal-statement-start -->
### 定義（Hamilton--Jacobi--Bellman 方程式）

最適制御 Hamiltonian

$$
\mathcal H(x,p)
=
\inf_{a\in U}
\{L(x,a)+f(x,a)\cdot p\}
$$

に対する終端値問題

$$
V_t(t,x)
+
\mathcal H(x,\nabla_xV(t,x))
=
0,
$$

$$
V(T,x)=g(x)
$$

を **Hamilton--Jacobi--Bellman 方程式**、略して **HJB equation** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc1-hjb -->
### **定義の確認**：速度制約だけがある場合

$$
f(x,a)=a,
\qquad
L\equiv0,
\qquad
U=[-1,1]
$$

なら

$$
\mathcal H(p)
=
\inf_{|a|\le1}ap.
$$

$p>0$ なら $a=-1$、$p<0$ なら $a=1$ が最小なので

$$
\boxed{
\mathcal H(p)=-|p|
}.
$$

従って HJB は

$$
\boxed{
V_t-|V_x|=0
}
$$

です。

終端費用が $g(x)=|x|$ なら終端条件は

$$
V(T,x)=|x|.
$$
<!-- definition-example-end -->

HJB は [Hamilton--Jacobi 方程式](../PDE12/index.md#def-pde12-hamilton-jacobi)そのものですが、Hamiltonian の出所が変わっています。

$$
\boxed{
\text{局所的な制御の最小化}
\quad\Longrightarrow\quad
\mathcal H(x,p)
}
$$

という構造が Bellman の追加部分です。

---

## 7. value function が滑らかなら HJB を本当に導ける

前節までの短時間展開では、任意の $a$ に対して

$$
V_t+L(x,a)+f(x,a)\cdot\nabla V
\ge0
$$

が見えました。

等号を得るには、最適制御に沿う DPP を使います。

<a id="prop-hjc1-smooth-value-hjb"></a>
<!-- formal-statement-start -->
### 命題（滑らかな value function に対する HJB の導出）

value function $V$ が $[0,T)\times\mathbb R^d$ で $C^1$ とする。

さらに各 $(t,x)$ から最適制御 $u^*$ が存在し、$u^*$ は初期時刻 $t$ で右連続であるとする。

このとき $V$ は古典的に

$$
V_t(t,x)
+
\mathcal H(x,\nabla V(t,x))
=
0
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

任意の定数制御 $a$ を最初の短時間へ入れると、

$$
V_t+L(x,a)+f(x,a)\cdot\nabla V\ge0
$$

です。

一方、最適制御 $u^*$ の最初の短時間では、後半の control も最適でなければ全体を改善できてしまいます。従って DPP は最適軌道に沿って等号になり、$a=u^*(t)$ に対して上式が等号になります。

<!-- proof-start -->
### 証明

まず任意の $a\in U$ を固定します。

最初の $[t,t+h]$ で定数制御 $a$ を使うと DPP から

$$
V(t,x)
\le
\int_t^{t+h}L(X_a(s),a)\,ds
+
V(t+h,X_a(t+h)).
$$

ここで

$$
X_a(t)=x,
\qquad
\dot X_a=f(X_a,a)
$$

です。

前節の短時間展開から

$$
\int_t^{t+h}L(X_a(s),a)\,ds
=
hL(x,a)+o(h),
$$

$$
X_a(t+h)
=
x+h f(x,a)+o(h),
$$

さらに $V\in C^1$ なので

$$
\begin{aligned}
V(t+h,X_a(t+h))
&=
V(t,x)\\
&\quad+
h\{
V_t(t,x)
+
\nabla V(t,x)\cdot f(x,a)
\}
+
o(h).
\end{aligned}
$$

これらを DPP の不等式へ入れ、$V(t,x)$ を消すと

$$
0
\le
h\{
V_t
+
L(x,a)
+
f(x,a)\cdot\nabla V
\}
+
o(h).
$$

$h>0$ で割って $h\downarrow0$ とすると

$$
V_t
+
L(x,a)
+
f(x,a)\cdot\nabla V
\ge0.
$$

$a$ は任意なので

$$
V_t
+
\mathcal H(x,\nabla V)
\ge0.
$$

次に $(t,x)$ からの最適制御を $u^*$ とします。

最適軌道を $X^*$ と書きます。$u^*$ の後半 restriction が時刻 $t+h$ の状態 $X^*(t+h)$ から最適でなければ、より低い費用の後半制御へ置き換えて全体の費用を下げられます。これは $u^*$ の最適性に反します。

従って最適軌道に沿って

$$
V(t,x)
=
\int_t^{t+h}
L(X^*(s),u^*(s))\,ds
+
V(t+h,X^*(t+h)).
$$

$u^*$ の右連続性と $X^*(s)\to x$ から

$$
\int_t^{t+h}
L(X^*(s),u^*(s))\,ds
=
hL(x,u^*(t))+o(h),
$$

また

$$
X^*(t+h)
=
x+h f(x,u^*(t))+o(h).
$$

先ほどと同じ Taylor 展開を使うと

$$
0
=
V_t
+
L(x,u^*(t))
+
f(x,u^*(t))\cdot\nabla V.
$$

Hamiltonian は全 $a$ の infimum なので

$$
V_t+\mathcal H(x,\nabla V)
\le0.
$$

前半で得た逆向き不等式と合わせて

$$
V_t+\mathcal H(x,\nabla V)=0.
$$

$\square$
<!-- proof-end -->

この命題は HJB の出所をはっきり示しますが、仮定は強いです。

実際には

- 最適制御が存在しないことがある。
- value function が $C^1$ でないことがある。

後者は §10 の bang-bang 例ですでに起きます。

そこで次章では、微分可能性を捨てても HJB の comparison 構造を残す解概念へ進みます。

---

## 8. HJB を解いた候補から最適性を逆向きに確認する

DPP から HJB を導く向きとは逆に、

> HJB を満たす滑らかな候補 $W$ を見つけたら、それが本当に value function か。

という問題があります。

この向きを与えるのが verification theorem です。

<a id="thm-hjc1-verification"></a>
<!-- formal-statement-start -->
### 定理（smooth verification theorem）

$W\in C^1([0,T]\times\mathbb R^d)$ が

$$
W_t(t,x)
+
\inf_{a\in U}
\left\{
L(x,a)+f(x,a)\cdot\nabla W(t,x)
\right\}
=
0
$$

と

$$
W(T,x)=g(x)
$$

を満たすとする。

このとき任意の許容制御 $u$ に対して

$$
W(t,x)\le J_{t,x}(u)
$$

である。

さらに、ある許容制御 $u^*$ が対応する軌道 $X^*$ に沿ってほとんどすべての $s$ で

$$
u^*(s)
\in
\operatorname*{arg\,min}_{a\in U}
\left\{
L(X^*(s),a)
+
f(X^*(s),a)\cdot
\nabla W(s,X^*(s))
\right\}
$$

を満たすなら

$$
W(t,x)=V(t,x)=J_{t,x}(u^*)
$$

であり、$u^*$ は最適制御である。
<!-- formal-statement-end -->

### 証明の見取り図

HJB の infimum が0を作るので、任意の制御値 $a$ に対して

$$
W_t+L+f\cdot\nabla W\ge0
$$

です。

制御軌道上で chain rule を使うと

$$
\frac d{ds}W(s,X(s))
=
W_t+\nabla W\cdot f.
$$

したがって

$$
\frac d{ds}W(s,X(s))
+
L(X(s),u(s))
\ge0.
$$

これを終端まで積分すると $W\le J$ が出ます。Hamiltonian の minimizer を選ぶ制御では不等式が等号になります。

<!-- proof-start -->
### 証明

任意の許容制御 $u$ と、その制御軌道

$$
X(s)=X^{t,x;u}(s)
$$

を取ります。

HJB より

$$
\inf_{a\in U}
\{
L(X(s),a)
+
f(X(s),a)\cdot\nabla W(s,X(s))
\}
=
-W_t(s,X(s)).
$$

infimum は各 $a$ の値以下なので、実際の制御値 $a=u(s)$ について

$$
L(X(s),u(s))
+
f(X(s),u(s))\cdot\nabla W(s,X(s))
\ge
-W_t(s,X(s)).
$$

従って

$$
W_t
+
\nabla W\cdot f(X,u)
+
L(X,u)
\ge0.
$$

制御軌道は

$$
\dot X=f(X,u)
$$

を満たすので chain rule から

$$
\frac d{ds}W(s,X(s))
=
W_t(s,X(s))
+
\nabla W(s,X(s))\cdot f(X(s),u(s)).
$$

よって

$$
\frac d{ds}W(s,X(s))
+
L(X(s),u(s))
\ge0.
$$

$t$ から $T$ まで積分すると

$$
W(T,X(T))-W(t,x)
+
\int_t^T
L(X(s),u(s))\,ds
\ge0.
$$

終端条件

$$
W(T,X(T))
=
g(X(T))
$$

を使うと

$$
W(t,x)
\le
g(X(T))
+
\int_t^T
L(X(s),u(s))\,ds
=
J_{t,x}(u).
$$

これは任意の $u$ で成り立つので

$$
W(t,x)\le V(t,x).
$$

次に $u^*$ が Hamiltonian の minimizer を選ぶとします。

そのとき上の HJB 不等式はほとんどすべての $s$ で等号になり、

$$
\frac d{ds}W(s,X^*(s))
+
L(X^*(s),u^*(s))
=
0.
$$

積分すると

$$
W(t,x)
=
J_{t,x}(u^*).
$$

一方 value function の定義から

$$
V(t,x)
\le
J_{t,x}(u^*).
$$

すでに

$$
W(t,x)\le V(t,x)
$$

を得ているので

$$
W(t,x)
\le
V(t,x)
\le
J_{t,x}(u^*)
=
W(t,x).
$$

従ってすべて等号であり、

$$
W(t,x)=V(t,x)=J_{t,x}(u^*).
$$

$\square$
<!-- proof-end -->

verification theorem は「HJB の滑らかな解を見つけた」だけではなく、最小化を達成する制御も同時に作ると最適性まで確認できることを述べています。

---

## 9. 一次元 LQR では HJB が Riccati 型 ODE へ落ちる

次の最小例を考えます。

$$
\dot X=u,
$$

$$
J_{t,x}(u)
=
\frac q2X(T)^2
+
\int_t^T
\frac12u(s)^2\,ds,
\qquad
q>0.
$$

状態を原点へ近づけたい一方、強い制御には二次費用がかかります。

Hamiltonian は §5 で計算した通り

$$
\mathcal H(p)
=
-\frac12p^2.
$$

従って HJB は

$$
V_t
-
\frac12(V_x)^2
=
0,
$$

$$
V(T,x)
=
\frac q2x^2.
$$

終端条件が二次式なので

$$
V(t,x)
=
\frac12P(t)x^2
$$

と仮定します。

すると

$$
V_t
=
\frac12P'(t)x^2,
$$

$$
V_x
=
P(t)x.
$$

HJB へ代入すると

$$
\frac12P'x^2
-
\frac12P^2x^2
=
0.
$$

すべての $x$ で成り立つため

$$
P'=P^2,
\qquad
P(T)=q.
$$

逆数を取ると

$$
\frac d{dt}\frac1P
=
-\frac{P'}{P^2}
=
-1.
$$

従って

$$
\frac1{P(t)}
=
\frac1q+T-t,
$$

すなわち

$$
\boxed{
P(t)
=
\frac{q}{1+q(T-t)}
}.
$$

よって

$$
\boxed{
V(t,x)
=
\frac12
\frac{q}{1+q(T-t)}
x^2
}.
$$

Hamiltonian の minimizer は

$$
u^*
=
-V_x
=
-P(t)X.
$$

したがって最適 feedback は

$$
\boxed{
u^*(s)
=
-\frac{q}{1+q(T-s)}
X^*(s)
}.
$$

この $u^*$ を verification theorem へ入れれば、上の $V$ が本当に value function であることまで確認できます。

---

## 10. bang-bang 例では value function が自然に折れる

§2 の

$$
\dot X=u,
\qquad
|u|\le1,
$$

$$
L\equiv0,
\qquad
g(x)=|x|
$$

へ戻ります。

value function は

$$
V(t,x)
=
\max\{|x|-(T-t),0\}
$$

でした。

Hamiltonian は

$$
\mathcal H(p)=-|p|
$$

なので HJB は

$$
V_t-|V_x|=0.
$$

まず領域

$$
|x|>T-t
$$

を考えます。

$x> T-t$ なら

$$
V(t,x)
=
x-(T-t)
=
x+t-T.
$$

従って

$$
V_t=1,
\qquad
V_x=1,
$$

なので

$$
V_t-|V_x|
=
1-1
=
0.
$$

$x<-(T-t)$ なら

$$
V(t,x)
=
-x-(T-t),
$$

したがって

$$
V_t=1,
\qquad
V_x=-1,
$$

であり、やはり

$$
V_t-|V_x|
=
1-1
=
0.
$$

次に

$$
|x|<T-t
$$

では

$$
V(t,x)=0
$$

なので

$$
V_t=0,
\qquad
V_x=0,
$$

従って HJB を満たします。

しかし境界

$$
|x|=T-t
$$

では、$V$ の勾配が跳びます。

つまり最適制御問題から自然に得た value function は、HJB を各滑らかな領域では満たすのに、全領域で $C^1$ ではありません。

この現象は例外ではありません。最適な行動が切り替わる場所では value function に kink が生じやすく、PDE12 の古典解だけでは最適制御を最後まで扱えません。

次章 HJC2 では、この非微分可能性を許しながら HJB の comparison と一意性を保つ **粘性解**へ進みます。

---

## 11. HJB と Pontryagin 型の考え方は何が違うか

最適制御には別の有力な見方として、最適軌道に沿って costate を導入する Pontryagin 型の方法があります。

役割の違いを先に整理しておきます。

HJB は

$$
V(t,x)
$$

を状態空間全体で求める方法です。

一度 value function が分かれば、多くの場合

$$
u^*(t,x)
\in
\operatorname*{arg\,min}_{a\in U}
\{
L(x,a)+f(x,a)\cdot\nabla V(t,x)
\}
$$

から feedback を読み取れます。

一方、Pontryagin 型の方法は一つの候補最適軌道に沿って状態と costate の ODE を解く方向です。

本系列の中心は HJB・粘性解なので、本章では Pontryagin 最大原理の一般理論を展開しません。

覚えておくべき対比は

$$
\boxed{
\text{HJB: 状態空間上の value function の PDE}
}
$$

と

$$
\boxed{
\text{Pontryagin: 候補最適軌道に沿う状態・costate の ODE}
}
$$

です。

---

## 12. この章で分かったこと

決定論的最適制御では、

$$
\dot X=f(X,u)
$$

という ODE の上に最適化を載せることで、一階非線形 PDE が現れました。

- 許容制御を選ぶと制御軌道が決まる。
- running cost と terminal cost から cost functional が決まる。
- 全制御の infimum を取ると value function が得られる。
- 最初の短時間と残り時間へ問題を分けると DPP が出る。
- DPP を $h\downarrow0$ で展開すると $V_t$ と $\nabla V\cdot f$ が現れる。
- 制御値についての局所最小化を Hamiltonian にまとめると HJB になる。
- 滑らかな HJB 解は verification theorem で value function 候補として検証できる。
- LQR では HJB が Riccati 型 ODE へ落ちる。
- bang-bang 例では value function が自然に非微分可能になる。

最後の点が次章の中心問題です。

$$
\boxed{
\text{HJB は正しい。
しかし value function は滑らかとは限らない。}
}
$$

そこで HJC2 では、古典微分を要求せずに HJB を読む方法を作ります。

---

# 演習

## Level A

<a id="ex-hjc1-a01"></a>
### HJC1-A01 制御軌道を直接求める
- Level: A

$$
\dot X(s)=2X(s)+u(s),
\qquad
X(t)=x
$$

を考える。

定数制御 $u(s)\equiv a$ のとき、$X(s)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

線形 ODE

$$
\dot X-2X=a
$$

です。

積分因子 $e^{-2s}$ を掛けると

$$
\frac d{ds}
\{e^{-2s}X(s)\}
=
ae^{-2s}.
$$

$t$ から $s$ まで積分して

$$
e^{-2s}X(s)
-
e^{-2t}x
=
a\int_t^s e^{-2r}\,dr.
$$

積分は

$$
\int_t^s e^{-2r}\,dr
=
\frac12
\{e^{-2t}-e^{-2s}\}.
$$

従って

$$
e^{-2s}X(s)
=
e^{-2t}x
+
\frac a2
\{e^{-2t}-e^{-2s}\}.
$$

両辺へ $e^{2s}$ を掛けると

$$
\boxed{
X(s)
=
e^{2(s-t)}
\left(x+\frac a2\right)
-
\frac a2
}.
$$
<!-- solution-end -->

<a id="ex-hjc1-a02"></a>
### HJC1-A02 cost functional を計算する
- Level: A

$$
\dot X=u,
\qquad
X(t)=x
$$

で定数制御 $u(s)\equiv a$ を使う。

$$
L(X,u)=\frac12u^2,
\qquad
g(X)=\frac q2X^2
$$

とする。

$J_{t,x}(u)$ を $a$ の式として求めよ。

<!-- solution-start -->
#### 詳細解答

定数制御では

$$
X(s)=x+a(s-t).
$$

従って終端状態は

$$
X(T)=x+a(T-t).
$$

running cost は

$$
\int_t^T\frac12a^2\,ds
=
\frac12a^2(T-t).
$$

terminal cost は

$$
\frac q2
\{x+a(T-t)\}^2.
$$

したがって

$$
\boxed{
J_{t,x}(a)
=
\frac q2
\{x+a(T-t)\}^2
+
\frac12a^2(T-t)
}.
$$
<!-- solution-end -->

<a id="ex-hjc1-a03"></a>
### HJC1-A03 Hamiltonian を求める
- Level: A

$$
f(x,a)=a,
\qquad
L(x,a)=\frac r2a^2,
\qquad
r>0,
\qquad
U=\mathbb R
$$

とする。

1. 最適制御 Hamiltonian $\mathcal H(p)$ を求めよ。
2. minimizer $a^*(p)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

定義から

$$
\mathcal H(p)
=
\inf_{a\in\mathbb R}
\left\{
\frac r2a^2+ap
\right\}.
$$

平方完成します。

$$
\begin{aligned}
\frac r2a^2+ap
&=
\frac r2
\left(
a^2+\frac{2p}{r}a
\right)\\
&=
\frac r2
\left(a+\frac pr\right)^2
-
\frac{p^2}{2r}.
\end{aligned}
$$

第一項は非負なので最小値は

$$
a+\frac pr=0
$$

のときに達成されます。

従って

$$
\boxed{
a^*(p)=-\frac pr
}
$$

かつ

$$
\boxed{
\mathcal H(p)
=
-\frac{p^2}{2r}
}.
$$
<!-- solution-end -->

<a id="ex-hjc1-a04"></a>
### HJC1-A04 速度制約から HJB を作る
- Level: A

$$
\dot X=u,
\qquad
|u|\le c,
\qquad
L\equiv0
$$

とする。$c>0$ である。

1. Hamiltonian を求めよ。
2. HJB equation を書け。

<!-- solution-start -->
#### 詳細解答

Hamiltonian は

$$
\mathcal H(p)
=
\inf_{|a|\le c}ap.
$$

$p>0$ なら $a=-c$ が最小で

$$
\mathcal H(p)=-cp.
$$

$p<0$ なら $a=c$ が最小で

$$
\mathcal H(p)=cp=-c|p|.
$$

$p=0$ でも値は0です。

したがって全ての $p$ で

$$
\boxed{
\mathcal H(p)=-c|p|
}.
$$

従って HJB は

$$
V_t+\mathcal H(V_x)=0,
$$

すなわち

$$
\boxed{
V_t-c|V_x|=0
}.
$$
<!-- solution-end -->

<a id="ex-hjc1-a05"></a>
### HJC1-A05 verification inequality の一段を確認する
- Level: A

$W$ が HJB を満たすとする。

任意の制御値 $a\in U$ に対して

$$
W_t+L(x,a)+f(x,a)\cdot\nabla W\ge0
$$

が成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答

HJB は

$$
W_t
+
\inf_{b\in U}
\{
L(x,b)+f(x,b)\cdot\nabla W
\}
=
0
$$

です。

infimum の定義から、任意の固定した $a\in U$ に対して

$$
\inf_{b\in U}
\{
L(x,b)+f(x,b)\cdot\nabla W
\}
\le
L(x,a)+f(x,a)\cdot\nabla W.
$$

従って

$$
-W_t
\le
L(x,a)+f(x,a)\cdot\nabla W.
$$

両辺へ $W_t$ を足すと

$$
\boxed{
W_t+L(x,a)+f(x,a)\cdot\nabla W\ge0
}.
$$
<!-- solution-end -->

## Level B

<a id="ex-hjc1-b01"></a>
### HJC1-B01 DPP の逆向きで epsilon が必要な理由
- Level: B

DPP の証明で、前半制御 $u_1$ と到達点 $y$ を固定する。

後半の最適制御が存在するとは仮定しない。

任意の $\varepsilon>0$ に対して

$$
J_{t+h,y}(u_2)
\le
V(t+h,y)+\varepsilon
$$

を満たす $u_2$ を選び、DPP の

$$
V(t,x)\le R(t,x)
$$

側を証明せよ。

<!-- solution-start -->
#### 詳細解答

$V(t+h,y)$ は後半制御全体に対する infimum です。

したがって任意の $\varepsilon>0$ に対し、ある後半制御 $u_2$ が存在して

$$
J_{t+h,y}(u_2)
<
V(t+h,y)+\varepsilon
$$

となります。等号を許した弱い不等式で書いても構いません。

前半制御 $u_1$ と $u_2$ を連結した制御を

$$
u=u_1*u_2
$$

とします。

費用の時間分割から

$$
\begin{aligned}
J_{t,x}(u)
&=
\int_t^{t+h}
L(X^{t,x;u_1}(s),u_1(s))\,ds\\
&\quad+
J_{t+h,y}(u_2).
\end{aligned}
$$

従って

$$
\begin{aligned}
V(t,x)
&\le
J_{t,x}(u)\\
&\le
\int_t^{t+h}
L(X^{t,x;u_1}(s),u_1(s))\,ds\\
&\quad+
V(t+h,y)
+
\varepsilon.
\end{aligned}
$$

ここで $u_1$ は任意なので前半制御について infimum を取ると

$$
V(t,x)
\le
R(t,x)+\varepsilon.
$$

$\varepsilon>0$ は任意だから

$$
\boxed{
V(t,x)\le R(t,x)
}.
$$

この論法では「infimum が達成される」ことを使っていません。
<!-- solution-end -->

<a id="ex-hjc1-b02"></a>
### HJC1-B02 一次元 LQR を最後まで解く
- Level: B

$$
\dot X=u,
$$

$$
J_{t,x}(u)
=
\frac q2X(T)^2
+
\int_t^T
\frac12u(s)^2\,ds,
\qquad
q>0
$$

を考える。

1. HJB を導け。
2. $V(t,x)=P(t)x^2/2$ と置いて $P$ の ODE を求めよ。
3. $P$ を解け。
4. 最適 feedback を求めよ。

<!-- solution-start -->
#### 詳細解答

Hamiltonian は

$$
\mathcal H(p)
=
\inf_u
\left\{
\frac12u^2+up
\right\}
=
-\frac12p^2.
$$

従って HJB は

$$
V_t-\frac12(V_x)^2=0,
$$

終端条件は

$$
V(T,x)=\frac q2x^2.
$$

二次 ansatz

$$
V(t,x)=\frac12P(t)x^2
$$

を入れると

$$
V_t=\frac12P'x^2,
\qquad
V_x=Px.
$$

したがって

$$
\frac12P'x^2-\frac12P^2x^2=0.
$$

全ての $x$ で成り立つため

$$
\boxed{
P'=P^2,
\qquad
P(T)=q
}.
$$

$P>0$ として逆数を取ると

$$
\left(\frac1P\right)'
=
-\frac{P'}{P^2}
=
-1.
$$

$t$ から $T$ まで積分すると

$$
\frac1{P(T)}-\frac1{P(t)}
=
-(T-t).
$$

$P(T)=q$ を代入して

$$
\frac1q-\frac1{P(t)}
=
-(T-t).
$$

従って

$$
\frac1{P(t)}
=
\frac1q+T-t.
$$

よって

$$
\boxed{
P(t)=\frac{q}{1+q(T-t)}
}.
$$

Hamiltonian の minimizer は

$$
u^*=-p.
$$

ここで

$$
p=V_x=P(t)X
$$

なので

$$
\boxed{
u^*(s)
=
-P(s)X^*(s)
=
-\frac{q}{1+q(T-s)}X^*(s)
}.
$$
<!-- solution-end -->

<a id="ex-hjc1-b03"></a>
### HJC1-B03 bang-bang value function を HJB で確認する
- Level: B

$$
\dot X=u,
\qquad
|u|\le1,
\qquad
L\equiv0,
\qquad
g(x)=|x|
$$

とする。

候補

$$
V(t,x)
=
\max\{|x|-(T-t),0\}
$$

について次を示せ。

1. 制御問題からこの値関数を導け。
2. 滑らかな三領域
   $x>T-t$、
   $|x|<T-t$、
   $x<-(T-t)$
   で HJB を確認せよ。
3. どこで古典微分可能性が壊れるか述べよ。

<!-- solution-start -->
#### 詳細解答

残り時間を

$$
\tau=T-t
$$

とします。

速度制約 $|u|\le1$ から、終端までに動ける距離は高々 $\tau$ です。

したがって初期位置 $x$ から原点への距離 $|x|$ のうち、最大 $\tau$ だけ減らせます。

よって最小終端距離は

$$
\boxed{
\max\{|x|-\tau,0\}
}
$$

です。

これは

$$
V(t,x)
=
\max\{|x|-(T-t),0\}
$$

に一致します。

Hamiltonian は

$$
\mathcal H(p)=-|p|,
$$

従って HJB は

$$
V_t-|V_x|=0.
$$

$x>T-t$ では

$$
V=x+t-T,
$$

なので

$$
V_t=1,
\qquad
V_x=1.
$$

従って

$$
V_t-|V_x|
=
1-1=0.
$$

$|x|<T-t$ では

$$
V=0,
$$

なので

$$
V_t=0,
\qquad
V_x=0,
$$

よって HJB を満たします。

$x<-(T-t)$ では

$$
V=-x+t-T,
$$

なので

$$
V_t=1,
\qquad
V_x=-1,
$$

したがって

$$
V_t-|V_x|
=
1-1=0.
$$

一方

$$
|x|=T-t
$$

では内側の勾配0と外側の勾配 $\pm1$ が一致しません。

従って value function はこの切替境界で $C^1$ ではありません。
<!-- solution-end -->

<a id="ex-hjc1-b04"></a>
### HJC1-B04 verification theorem で候補解を確定する
- Level: B

一次元問題

$$
\dot X=u,
\qquad
u\in\mathbb R
$$

と

$$
J_{t,x}(u)
=
\frac q2X(T)^2
+
\int_t^T\frac12u(s)^2\,ds
$$

を考える。

本文で得た

$$
W(t,x)
=
\frac12
\frac{q}{1+q(T-t)}
x^2
$$

に verification theorem を適用し、$W=V$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
P(t)=\frac{q}{1+q(T-t)}
$$

と書けば

$$
W(t,x)=\frac12P(t)x^2.
$$

本文の計算から

$$
P'=P^2.
$$

従って

$$
W_t
=
\frac12P^2x^2,
\qquad
W_x
=
Px.
$$

Hamiltonian は

$$
\inf_u
\left\{
\frac12u^2+uW_x
\right\}
=
-\frac12W_x^2.
$$

よって

$$
W_t-\frac12W_x^2
=
\frac12P^2x^2
-
\frac12P^2x^2
=
0.
$$

また

$$
W(T,x)
=
\frac12qx^2
$$

なので終端条件も満たします。

Hamiltonian の minimizer は

$$
u^*=-W_x=-PX.
$$

この feedback で閉ループ方程式は

$$
\dot X^*(s)
=
-P(s)X^*(s)
$$

です。

$P$ は $[t,T]$ 上連続なので、この線形 ODE は一意な解を持ち、$u^*$ は許容制御になります。

従って verification theorem の minimizer 条件を満たし、

$$
\boxed{
W(t,x)=V(t,x)=J_{t,x}(u^*)
}
$$

です。
<!-- solution-end -->

## Level C

<a id="ex-hjc1-c01"></a>
### HJC1-C01 DPP・HJB・非滑らかさを一つにつなぐ
- Level: C

$$
\dot X=u,
\qquad
|u|\le1,
\qquad
L\equiv0,
\qquad
g(x)=|x|
$$

を考える。

1. DPP をこの問題に特殊化して書け。
2. 定数制御 $a\in[-1,1]$ を短時間 $h$ だけ使うとして、value function が $C^1$ なら
   $$
   V_t+aV_x\ge0
   $$
   が全ての $a$ で必要になることを導け。
3. 上の不等式から
   $$
   V_t-|V_x|\ge0
   $$
   を導け。
4. 最適制御が初期時刻で $a^*=-\operatorname{sgn}(V_x)$ を選び等号を与える滑らかな点では
   $$
   V_t-|V_x|=0
   $$
   になることを説明せよ。
5. 実際の value function
   $$
   V(t,x)=\max\{|x|-(T-t),0\}
   $$
   が切替境界で微分不能になることを示し、「DPP は壊れていないのに classical HJB の記述だけが壊れる」ことを説明せよ。

<!-- solution-start -->
#### 詳細解答

この問題では running cost が0なので DPP は

$$
V(t,x)
=
\inf_{u\in\mathcal U[t,t+h]}
V(t+h,X^{t,x;u}(t+h))
$$

です。

最初の短時間で定数制御

$$
u(s)\equiv a,
\qquad
a\in[-1,1]
$$

を使うと

$$
X(t+h)=x+ah.
$$

DPP の infimum は任意の候補値以下なので

$$
V(t,x)
\le
V(t+h,x+ah).
$$

$V$ が $(t,x)$ で $C^1$ と仮定します。

一次 Taylor 展開から

$$
V(t+h,x+ah)
=
V(t,x)
+
hV_t(t,x)
+
ahV_x(t,x)
+
o(h).
$$

従って

$$
0
\le
h\{V_t+aV_x\}
+
o(h).
$$

$h>0$ で割り $h\downarrow0$ とすると

$$
\boxed{
V_t+aV_x\ge0
}
$$

が全ての $a\in[-1,1]$ で成り立ちます。

$a$ について infimum を取ると

$$
V_t
+
\inf_{|a|\le1}aV_x
\ge0.
$$

ここで

$$
\inf_{|a|\le1}ap
=
-|p|
$$

なので

$$
\boxed{
V_t-|V_x|\ge0
}.
$$

次に $V_x\ne0$ の滑らかな点を考えます。

$V_x>0$ なら minimizing control は $a^*=-1$、$V_x<0$ なら $a^*=1$ です。まとめると

$$
a^*
=
-\operatorname{sgn}(V_x).
$$

最適制御に沿う DPP では短時間分割が等号になるので、同じ Taylor 展開から

$$
V_t+a^*V_x=0.
$$

しかも

$$
a^*V_x=-|V_x|,
$$

従って

$$
\boxed{
V_t-|V_x|=0
}.
$$

最後に実際の value function は

$$
V(t,x)
=
\max\{|x|-(T-t),0\}.
$$

境界

$$
x=T-t
$$

の内側では $V_x=0$、外側では $V_x=1$ です。

もう一方の境界

$$
x=-(T-t)
$$

では、内側の領域 $|x|<T-t$ から近づくと $V_x=0$ ですが、外側の領域 $x<-(T-t)$ から近づくと $V_x=-1$ です。したがってここでも左右の微分が一致しません。

従って切替境界で $V$ は微分可能ではありません。

しかし DPP 自体は「最初の短時間 + 残りの最適費用」という制御問題の分割原理なので、value function の微分可能性を仮定していません。

したがって壊れたのは DPP ではなく、

$$
\text{DPPを通常の微分で PDE に変換する classical な読み方}
$$

です。

次章で必要になるのは、非微分点でも DPP の局所的不等式を読み取れる弱い解概念です。
<!-- solution-end -->
