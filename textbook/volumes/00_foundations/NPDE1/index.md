# NPDE1 保存則・衝撃波・Rankine--Hugoniot 条件

PDE1 では Burgers 方程式

$$
u_t+u u_x=0
$$

を特性曲線で解き、特性が交差すると $u_x$ が発散して古典解の表示が壊れることを見ました。ところが、保存される量そのものが消えたわけではありません。交通流・気体力学・浅水波などでは、滑らかな解が壊れた後にも「量がどこからどこへ流れたか」は追い続けたいからです。

そこで本章では、Burgers 方程式を

$$
u_t+\partial_x\left(\frac{u^2}{2}\right)=0
$$

という **保存則** として読み直します。

今までできたことと、ここから必要になる道具の関係は次です。

~~~text
古典解と特性曲線
  ↓
特性が交差すると勾配が発散する
  ↓
点ごとの微分方程式としては続けられない
  ↓
積分恒等式へ移して不連続な解も許す
  ↓
跳躍面で保存される量が釣り合う条件を導く
  ↓
跳躍速度の釣り合い条件
  ↓
同じ初期値から複数の弱解が生じる
  ↓
NPDE2 の entropy 選択原理が必要になる
~~~

前提は [PDE1 の Burgers 方程式と特性線交差](../PDE1/index.md#thm-pde1-burgers-characteristics) と、[GPDE1 のテスト関数](../GPDE1/index.md#def-gpde1-test-function)・[超関数解](../GPDE1/index.md#def-gpde1-distributional-poisson)です。本章では一般の一次元保存方程式を扱い、最後に Burgers 方程式へ戻って「弱くすれば存在するが、一意性は戻らない」ことを具体的に示します。

---

## 1. 保存則は「区間内の量の変化 = 境界からの流入出」である

一次元で密度 $u=u(t,x)$ と流束 $f(u)$ を考えます。区間 $[a,b]$ に入っている総量は

$$
M_{[a,b]}(t)
=
\int_a^b u(t,x)\,dx
$$

です。

右向きを正とすると、左端 $a$ から区間へ入る流束は $f(u(t,a))$、右端 $b$ から出る流束は $f(u(t,b))$ です。したがって局所的な生成・消滅がなければ

$$
\frac{d}{dt}
\int_a^b u(t,x)\,dx
=
f(u(t,a))-f(u(t,b)).
$$

$u$ が十分滑らかなら、空間変数について積分すると

$$
\int_a^b u_t(t,x)\,dx
=
-\int_a^b \partial_x f(u(t,x))\,dx
$$

となるので、

$$
u_t+\partial_x f(u)=0
$$

が得られます。

この形は、局所的な生成・消滅がなく、密度の時間変化を流束の空間変化だけで表しています。名称と条件を次で定義します。

<a id="def-npde1-scalar-conservation-law"></a>
<!-- formal-statement-start -->
> **定義（一次元スカラー保存則）**  
> 開区間 $I\subset\mathbb R$ と時間区間 $(0,T)$ を考える。未知関数 $u:(0,T)\times I\to\mathbb R$ と流束関数 $f:\mathbb R\to\mathbb R$ に対して

$$
u_t+\partial_x f(u)=0
$$

> の形の偏微分方程式を **一次元スカラー保存則** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde1-scalar-conservation-law -->
**定義の確認**

Burgers 方程式では

$$
f(u)=\frac{u^2}{2}.
$$

実際、

$$
\partial_x f(u)
=
\partial_x\left(\frac{u^2}{2}\right)
=
u u_x
$$

なので、

$$
u_t+\partial_x f(u)=0
$$

は

$$
u_t+u u_x=0
$$

と一致します。
<!-- definition-example-end -->

保存則の形にする利点は、$u_x$ が存在しなくなっても $u$ と $f(u)$ が積分できれば方程式の意味を残せることです。

---

## 2. 滑らかな間は特性曲線で何が起こるか

$f\in C^2(\mathbb R)$、$u$ が $C^1$ 級だとします。連鎖律により

$$
\partial_x f(u)
=
f'(u)u_x
$$

なので、保存則は

$$
u_t+f'(u)u_x=0
$$

と書けます。

これは PDE1 の準線形一次方程式です。特性曲線 $X(t)$ を

$$
X'(t)=f'(u(t,X(t)))
$$

と選ぶと、

$$
\frac{d}{dt}u(t,X(t))
=
u_t+X'u_x
=
u_t+f'(u)u_x
=
0.
$$

したがって特性上で $u$ は一定です。

<a id="prop-npde1-characteristics"></a>
<!-- formal-statement-start -->
> **命題（滑らかな保存則の特性表示）**  
> $f\in C^2(\mathbb R)$、$g\in C^1(\mathbb R)$ とし、古典解 $u$ が

$$
u_t+\partial_x f(u)=0,
\qquad
u(0,x)=g(x)
$$

> を満たすとする。初期点 $\xi$ から出る特性は、古典解が存在する範囲で

$$
u(t,X(t;\xi))=g(\xi),
$$

$$
X(t;\xi)
=
\xi+t f'(g(\xi))
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

特性速度を $f'(u)$ に選ぶと、特性上の値の時間微分が保存則そのものになります。値が一定になれば速度も一定になり、位置は一次関数として積分できます。

<!-- proof-start -->
### 証明

初期条件

$$
X(0;\xi)=\xi
$$

を課し、

$$
X'(t;\xi)=f'(u(t,X(t;\xi)))
$$

とします。

連鎖律から

$$
\frac{d}{dt}u(t,X(t;\xi))
=
u_t+X'u_x.
$$

$X'=f'(u)$ を代入すると

$$
\frac{d}{dt}u(t,X(t;\xi))
=
u_t+f'(u)u_x
=
u_t+\partial_x f(u)
=
0.
$$

したがって

$$
u(t,X(t;\xi))
=
u(0,\xi)
=
g(\xi).
$$

右辺は $t$ に依存しないので、特性 ODE は

$$
X'(t;\xi)
=
f'(g(\xi))
$$

となります。初期値 $X(0;\xi)=\xi$ から

$$
X(t;\xi)
=
\xi+t f'(g(\xi))
$$

を得ます。
<!-- proof-end -->

特性写像の初期点微分は

$$
\partial_\xi X(t;\xi)
=
1+t f''(g(\xi))g'(\xi).
$$

これが0になると、異なる初期点の特性が重なり始めます。Burgers 方程式では $f''=1$ なので、PDE1 の

$$
1+t g'(\xi)
$$

がそのまま戻ってきます。

---

## 3. 古典微分を捨て、保存則をテスト関数に対する恒等式へ移す

跳躍を持つ解では $u$ は不連続です。したがって $u_t$ や $u_x$ を各点で求めることはできません。

一方、$u$ と $f(u)$ が局所可積分なら、テスト関数 $\varphi$ を掛けて積分することはできます。

滑らかな解について

$$
u_t+\partial_xf(u)=0
$$

に $\varphi\in C_c^\infty((0,T)\times\mathbb R)$ を掛けて積分すると、

$$
\iint
\left(
u_t\varphi+\partial_xf(u)\,\varphi
\right)
\,dx\,dt
=
0.
$$

$\varphi$ は時空内部にコンパクトな台を持つので、時間・空間の境界項は消えます。二項をそれぞれ部分積分して

$$
-\iint
\left(
u\varphi_t+f(u)\varphi_x
\right)
\,dx\,dt
=
0.
$$

従って

$$
\iint
\left(
u\varphi_t+f(u)\varphi_x
\right)
\,dx\,dt
=
0
$$

が残ります。この式には $u$ の微分が出てきません。

<a id="def-npde1-weak-solution"></a>
<!-- formal-statement-start -->
> **定義（保存則の分布的弱解）**  
> $f\in C^1(\mathbb R)$ とする。関数 $u$ が

$$
u\in L^1_{\mathrm{loc}}((0,T)\times\mathbb R),
\qquad
f(u)\in L^1_{\mathrm{loc}}((0,T)\times\mathbb R)
$$

> を満たすとする。任意の

$$
\varphi\in C_c^\infty((0,T)\times\mathbb R)
$$

> に対して

$$
\iint_{(0,T)\times\mathbb R}
\left(
u\varphi_t+f(u)\varphi_x
\right)
\,dx\,dt
=
0
$$

> が成り立つとき、$u$ を保存則

$$
u_t+\partial_xf(u)=0
$$

> の **分布的弱解** という。
>
> さらに初期値 $u_0\in L^1_{\mathrm{loc}}(\mathbb R)$ に対して、任意のコンパクト集合 $K\subset\mathbb R$ で

$$
\int_K|u(t,x)-u_0(x)|\,dx
\longrightarrow0
\qquad
(t\downarrow0)
$$

> が成り立つとき、$u$ は初期値 $u_0$ を取るという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde1-weak-solution -->
**定義の確認**

定数関数

$$
u(t,x)=c
$$

を考えます。このとき $f(u)=f(c)$ も定数です。任意のテスト関数 $\varphi$ に対して

$$
\iint
\left(
c\varphi_t+f(c)\varphi_x
\right)
\,dx\,dt
=
c\iint\varphi_t\,dx\,dt
+
f(c)\iint\varphi_x\,dx\,dt.
$$

$\varphi$ は時空でコンパクト台を持つので、各積分は微分の全積分として0です。従って定数関数は弱解です。

また $u_0(x)=c$ なら

$$
\int_K|u(t,x)-u_0(x)|\,dx=0
$$

なので初期値条件も満たします。
<!-- definition-example-end -->

この定義は「微分できない関数を無理に微分する」のではなく、微分を滑らかなテスト関数側へ移した定義です。

---

## 4. 跳躍が動くとき、何が保存されれば弱解になるか

次に、一本の曲線

$$
x=\gamma(t)
$$

を境に解が跳ぶ場合を考えます。

左側 $x<\gamma(t)$ の値を $u^-(t,x)$、右側 $x>\gamma(t)$ の値を $u^+(t,x)$ とし、それぞれの領域では古典的に保存則を満たすとします。

界面の左右極限を

$$
u^-(t)=\lim_{x\uparrow\gamma(t)}u(t,x),
\qquad
u^+(t)=\lim_{x\downarrow\gamma(t)}u(t,x)
$$

と書きます。

界面が動くことで運ぶ量まで含め、左右の流束と釣り合わせる条件を次で定式化します。

<a id="thm-npde1-rankine-hugoniot"></a>
<!-- formal-statement-start -->
> **定理（Rankine--Hugoniot 条件）**  
> $f\in C^1(\mathbb R)$、$\gamma\in C^1((0,T))$ とする。$u$ は曲線 $x=\gamma(t)$ の左右で $C^1$ 級で、それぞれ

$$
u_t+\partial_xf(u)=0
$$

> を古典的に満たすとする。さらに界面の左右極限 $u^-(t),u^+(t)$ が連続に存在するとする。
>
> このとき $u$ が界面をまたいで分布的弱解になるための必要十分条件は

$$
\gamma'(t)\bigl(u^+(t)-u^-(t)\bigr)
=
f(u^+(t))-f(u^-(t))
$$

> が全ての $t$ で成り立つことである。
<!-- formal-statement-end -->

この式は

$$
\boxed{
\gamma'[u]=[f(u)]
}
$$

とも書かれます。ここで

$$
[u]=u^+-u^-,
\qquad
[f(u)]=f(u^+)-f(u^-)
$$

です。

### 証明の見取り図

弱形式の積分を界面の左と右へ分けます。各側では古典 PDE が成立しているので内部項は消え、界面から出る項だけが残ります。左側では

$$
f(u^-)-\gamma'u^-
$$

右側では

$$
\gamma'u^+-f(u^+)
$$

が現れ、その和が0になる条件が Rankine--Hugoniot 条件です。

<!-- proof-start -->
### 証明

任意の

$$
\varphi\in C_c^\infty((0,T)\times\mathbb R)
$$

を取ります。弱形式の左辺を

$$
I
=
\iint
\left(
u\varphi_t+f(u)\varphi_x
\right)
\,dx\,dt
$$

と置き、界面の左右へ分けます。

まず左側

$$
I_-
=
\int_0^T
\int_{-\infty}^{\gamma(t)}
\left(
u\varphi_t+f(u)\varphi_x
\right)
\,dx\,dt
$$

を計算します。

積

$$
F_-(t)
=
\int_{-\infty}^{\gamma(t)}
u(t,x)\varphi(t,x)\,dx
$$

を微分すると、移動する上端を含む Leibniz 則から

$$
F_-'(t)
=
\int_{-\infty}^{\gamma(t)}
\left(
u_t\varphi+u\varphi_t
\right)
\,dx
+
\gamma'(t)u^-(t)\varphi(t,\gamma(t)).
$$

従って

$$
\int_{-\infty}^{\gamma(t)}
u\varphi_t\,dx
=
F_-'(t)
-
\int_{-\infty}^{\gamma(t)}
u_t\varphi\,dx
-
\gamma'u^-\varphi(t,\gamma(t)).
$$

一方、空間積分を部分積分すると

$$
\int_{-\infty}^{\gamma(t)}
f(u)\varphi_x\,dx
=
f(u^-)\varphi(t,\gamma(t))
-
\int_{-\infty}^{\gamma(t)}
\partial_xf(u)\,\varphi\,dx.
$$

両式を足し、左領域で

$$
u_t+\partial_xf(u)=0
$$

を使うと、領域内の積分は消えます。また $\varphi$ は時間方向にもコンパクト台を持つので

$$
\int_0^T F_-'(t)\,dt=0.
$$

したがって

$$
I_-
=
\int_0^T
\left(
f(u^-)-\gamma'u^-
\right)
\varphi(t,\gamma(t))
\,dt.
$$

同様に右側では、移動する下端の符号が逆になるため

$$
I_+
=
\int_0^T
\left(
\gamma'u^+-f(u^+)
\right)
\varphi(t,\gamma(t))
\,dt.
$$

従って

$$
I
=
\int_0^T
\left[
\gamma'(u^+-u^-)
-
\bigl(f(u^+)-f(u^-)\bigr)
\right]
\varphi(t,\gamma(t))
\,dt.
$$

弱解なら任意の $\varphi$ に対して $I=0$ です。ここで任意の

$$
\psi\in C_c^\infty((0,T))
$$

を取ります。$\gamma$ は連続なので、$\gamma(\operatorname{supp}\psi)$ はコンパクトです。この集合上で1となる

$$
\chi\in C_c^\infty(\mathbb R)
$$

を選び、

$$
\varphi(t,x)=\psi(t)\chi(x)
$$

と置けば、

$$
\varphi(t,\gamma(t))=\psi(t)
$$

が $\operatorname{supp}\psi$ 上で成り立ちます。したがって界面上のテスト値は任意の $\psi$ として選べます。角括弧内は連続関数なので、全ての $\psi$ に対する積分が0なら各点で0です。よって

$$
\gamma'(t)(u^+-u^-)
=
f(u^+)-f(u^-).
$$

逆にこの条件が成り立てば上の $I$ は0になるため、弱形式が成り立ちます。
<!-- proof-end -->

この定理の核心は、跳躍面で「左から運ばれてくる量」と「右へ運び去られる量」と「界面自身が移動して運ぶ量」が釣り合うことです。

---

## 5. 定数状態をつなぐ衝撃波の速度

左状態 $u_L$、右状態 $u_R$ を定数とし、

$$
u(t,x)
=
\begin{cases}
u_L,&x<st,\\
u_R,&x>st
\end{cases}
$$

という一本の直線状の跳躍を考えます。

このように二つの定数状態を移動する一本の跳躍でつなぐ弱解を次で定義します。

<a id="def-npde1-shock-wave"></a>
<!-- formal-statement-start -->
> **定義（定数状態を結ぶ衝撃波）**  
> $u_L\ne u_R$ とする。二つの定数状態を一本の直線 $x=st$ でつないだ上の形の分布的弱解を、本章では **衝撃波** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde1-shock-wave -->
**定義の確認**

Burgers 流束

$$
f(u)=\frac{u^2}{2}
$$

で

$$
u_L=2,
\qquad
u_R=0
$$

を考えます。Rankine--Hugoniot 条件は

$$
s(0-2)
=
0-\frac{2^2}{2}
=
-2.
$$

したがって

$$
s=1.
$$

よって

$$
u(t,x)
=
\begin{cases}
2,&x<t,\\
0,&x>t
\end{cases}
$$

は衝撃波です。
<!-- definition-example-end -->

<a id="cor-npde1-shock-speed"></a>
<!-- formal-statement-start -->
> **系（定数状態を結ぶ衝撃波速度）**  
> $u_L\ne u_R$ とする。定数状態 $u_L,u_R$ を直線 $x=st$ で結ぶ弱解が存在するなら、その速度は一意に

$$
s
=
\frac{f(u_R)-f(u_L)}{u_R-u_L}
$$

> と定まる。
<!-- formal-statement-end -->

Rankine--Hugoniot 条件を $u_R-u_L\ne0$ で割っただけですが、意味は重要です。衝撃波の速度は左右どちらかの特性速度そのものではなく、流束グラフ上の二点を結ぶ **割線の傾き** です。

Burgers なら

$$
s
=
\frac{u_R^2-u_L^2}{2(u_R-u_L)}
=
\frac{u_L+u_R}{2}.
$$

---

## 6. Riemann 問題：一つの跳躍から始める

保存則の基本問題として、初期値が一点だけで跳ぶ場合を考えます。

<a id="def-npde1-riemann-problem"></a>
<!-- formal-statement-start -->
> **定義（Riemann 問題）**  
> 定数 $u_L,u_R$ に対し、

$$
u_t+\partial_xf(u)=0
$$

> と初期値

$$
u(0,x)
=
\begin{cases}
u_L,&x<0,\\
u_R,&x>0
\end{cases}
$$

> を組にした初期値問題を **Riemann 問題** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde1-riemann-problem -->
**定義の確認**

Burgers 方程式で

$$
u_L=1,\qquad u_R=-1
$$

とすると、初期値は原点だけで

$$
1\longrightarrow-1
$$

と跳びます。定数状態をつなぐ Rankine--Hugoniot 速度は

$$
s
=
\frac{1+(-1)}{2}
=
0.
$$

したがって原点に静止した跳躍が弱解候補になります。
<!-- definition-example-end -->

Riemann 問題は単純に見えますが、二つの基本的な波の形が最小構成で現れます。特性が互いに離れる場合には、その間を連続な自己相似 profile で埋める波を考えます。

---

## 7. 特性が広がると希薄波になる

$f\in C^2(\mathbb R)$ が

$$
f''(u)>0
$$

を満たす、すなわち流束が狭義凸だとします。このとき $f'$ は狭義単調増加です。

$u_L<u_R$ なら、左状態の特性速度 $f'(u_L)$ より右状態の特性速度 $f'(u_R)$ の方が速くなります。原点から出た特性の間に空白ができるので、その間を連続的な状態で埋める自己相似解を探します。

<a id="def-npde1-rarefaction-wave"></a>
<!-- formal-statement-start -->
> **定義（中心希薄波）**  
> 狭義凸流束 $f$ と $u_L<u_R$ に対し、

$$
U(\xi)
=
\begin{cases}
u_L,
&
\xi\le f'(u_L),
\\[4pt]
(f')^{-1}(\xi),
&
f'(u_L)<\xi<f'(u_R),
\\[4pt]
u_R,
&
\xi\ge f'(u_R)
\end{cases}
$$

> と置く。$t>0$ に対して

$$
u(t,x)=U\left(\frac{x}{t}\right)
$$

> で与えられる自己相似関数を **中心希薄波** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde1-rarefaction-wave -->
**定義の確認**

Burgers 流束では

$$
f'(u)=u.
$$

$u_L=0,u_R=1$ なら

$$
U(\xi)
=
\begin{cases}
0,&\xi\le0,\\
\xi,&0<\xi<1,\\
1,&\xi\ge1.
\end{cases}
$$

したがって

$$
u(t,x)
=
\begin{cases}
0,&x\le0,\\
x/t,&0<x<t,\\
1,&x\ge t.
\end{cases}
$$

です。$x=0$ と $x=t$ では左右の値が一致するので、$t>0$ では連続です。
<!-- definition-example-end -->

<a id="thm-npde1-rarefaction-weak-solution"></a>
<!-- formal-statement-start -->
> **定理（狭義凸流束の中心希薄波）**  
> $f\in C^2(\mathbb R)$ が $f''>0$ を満たし、$u_L<u_R$ とする。このとき上で定義した中心希薄波は $t>0$ で

$$
u_t+\partial_xf(u)=0
$$

> の分布的弱解であり、Riemann 初期値を $L^1_{\mathrm{loc}}$ の意味で取る。
<!-- formal-statement-end -->

### 証明の見取り図

ファン内部では自己相似変数 $\xi=x/t$ を使うと PDE が

$$
\bigl(f'(U)-\xi\bigr)U'=0
$$

へ落ちます。定義から $f'(U)=\xi$ なので成立します。ファン境界では値が連続するため、Rankine--Hugoniot 型のデルタ項は生じません。初期時刻との差は幅 $O(t)$ の領域にしか存在しないので、局所 $L^1$ 差は0へ行きます。

<!-- proof-start -->
### 証明

$t>0$ とし、

$$
\xi=\frac{x}{t},
\qquad
u(t,x)=U(\xi)
$$

とします。

ファン内部

$$
f'(u_L)<\xi<f'(u_R)
$$

では

$$
U(\xi)=(f')^{-1}(\xi)
$$

です。従って

$$
f'(U(\xi))=\xi.
$$

また

$$
\xi_t=-\frac{x}{t^2}=-\frac{\xi}{t},
\qquad
\xi_x=\frac1t.
$$

よって

$$
u_t
=
U'(\xi)\xi_t
=
-\frac{\xi}{t}U'(\xi),
$$

$$
u_x
=
U'(\xi)\xi_x
=
\frac1tU'(\xi).
$$

したがって

$$
u_t+\partial_xf(u)
=
u_t+f'(u)u_x
$$

は

$$
-\frac{\xi}{t}U'
+
\frac{f'(U)}{t}U'
=
\frac{f'(U)-\xi}{t}U'
=
0.
$$

ファンの外側では $u$ は定数なので PDE は自明に成立します。

次に境界

$$
x=t f'(u_L),
\qquad
x=t f'(u_R)
$$

を見ます。左境界ではファン内部からの極限は

$$
(f')^{-1}(f'(u_L))=u_L
$$

で外側の値と一致します。右境界でも同様に $u_R$ へ一致します。従って $u$ と $f(u)$ は境界をまたいで連続であり、部分積分したときに跳躍項は残りません。よって $t>0$ で弱形式が成り立ちます。

最後に初期値を確認します。任意のコンパクト区間 $K=[-R,R]$ を固定し、

$$
\alpha=f'(u_L),
\qquad
\beta=f'(u_R)
$$

と置きます。$f''>0$ なので $\alpha<\beta$ です。

時刻0の Riemann 初期値は $x=0$ で跳び、時刻 $t$ の希薄波は $x=t\alpha$ から $x=t\beta$ に広がります。したがって両者が異なり得る集合は

$$
\left[
t\min\{\alpha,0\},
\,
t\max\{\beta,0\}
\right]
$$

に含まれます。その長さは

$$
t\left(
\max\{\beta,0\}
-
\min\{\alpha,0\}
\right)
\le
t\bigl(|\alpha|+|\beta|\bigr).
$$

$U$ の値は $u_L$ と $u_R$ の間にあるので、初期値との差は高々

$$
u_R-u_L.
$$

従って

$$
\int_K|u(t,x)-u_0(x)|\,dx
\le
(u_R-u_L)
t\bigl(|f'(u_L)|+|f'(u_R)|\bigr)
\longrightarrow0.
$$

よって Riemann 初期値を $L^1_{\mathrm{loc}}$ の意味で取ります。
<!-- proof-end -->

---

## 8. Burgers 方程式では圧縮と拡張が目で見える

Burgers では

$$
f(u)=\frac{u^2}{2},
\qquad
f'(u)=u.
$$

したがって状態 $u$ 自身が特性速度です。

### $u_L>u_R$ の場合

左側の特性の方が速いため、後ろから前へ追いつきます。特性は圧縮され、古典解では多価化しようとします。

Rankine--Hugoniot 条件で一本の跳躍へまとめると

$$
s
=
\frac{u_L+u_R}{2}
$$

です。

### $u_L<u_R$ の場合

左側の特性の方が遅く、右側が速いため、特性は開いていきます。中心希薄波は

$$
u(t,x)
=
\begin{cases}
u_L,
&
x\le u_Lt,
\\
x/t,
&
u_Lt<x<u_Rt,
\\
u_R,
&
x\ge u_Rt
\end{cases}
$$

となります。

ここまでは「特性が圧縮するか広がるか」という幾何と、弱解の構成が一致しています。

しかし、弱解という条件だけを見ると、まだ問題が残ります。

---

## 9. Rankine--Hugoniot 条件だけでは解は一意にならない

$u_L<u_R$ でも、二つの定数状態を Rankine--Hugoniot 速度

$$
s
=
\frac{u_L+u_R}{2}
$$

で直接つなげば、分布的弱解になります。これは特性が外へ広がる向きなのに、一本の跳躍へ無理に押し込んだ解です。

弱形式は保存される量の収支しか見ないため、このような解も排除しません。

<a id="prop-npde1-weak-nonuniqueness"></a>
<!-- formal-statement-start -->
> **命題（Burgers Riemann 問題の弱解非一意性）**  
> Burgers 方程式

$$
u_t+\partial_x\left(\frac{u^2}{2}\right)=0
$$

> と Riemann 初期値

$$
u_0(x)
=
\begin{cases}
0,&x<0,\\
1,&x>0
\end{cases}
$$

> を考える。この初期値に対して、次の二つはともに分布的弱解であり、どちらも初期値を $L^1_{\mathrm{loc}}$ の意味で取る。
>
> 1. 跳躍解

$$
u_{\mathrm{jump}}(t,x)
=
\begin{cases}
0,&x<t/2,\\
1,&x>t/2,
\end{cases}
$$

> 2. 中心希薄波

$$
u_{\mathrm{rare}}(t,x)
=
\begin{cases}
0,&x\le0,\\
x/t,&0<x<t,\\
1,&x\ge t.
\end{cases}
$$

> 従って、分布的弱解という条件だけでは初期値問題の一意性は得られない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず跳躍解を確認します。左右状態は

$$
u_L=0,
\qquad
u_R=1.
$$

Burgers 流束に対する Rankine--Hugoniot 速度は

$$
s
=
\frac{u_L+u_R}{2}
=
\frac12.
$$

したがって [Rankine--Hugoniot 条件](#thm-npde1-rankine-hugoniot)により $u_{\mathrm{jump}}$ は $t>0$ で弱解です。

初期値との差は、$0<x<t/2$ でのみ生じます。この区間では初期値は1ですが跳躍解は0なので、任意の $R>0$ に対し十分小さい $t$ で

$$
\int_{-R}^R
|u_{\mathrm{jump}}(t,x)-u_0(x)|
\,dx
=
\frac{t}{2}
\longrightarrow0.
$$

次に希薄波です。これは [狭義凸流束の中心希薄波](#thm-npde1-rarefaction-weak-solution)を $f(u)=u^2/2$、$u_L=0$、$u_R=1$ に適用したものなので弱解です。

初期値との差は $0<x<t$ にしかありません。その区間で

$$
u_0(x)=1,
\qquad
u_{\mathrm{rare}}(t,x)=\frac{x}{t}.
$$

よって

$$
\int_{-R}^R
|u_{\mathrm{rare}}(t,x)-u_0(x)|
\,dx
=
\int_0^t
\left(1-\frac{x}{t}\right)
dx.
$$

積分すると

$$
\int_0^t1\,dx
-
\frac1t\int_0^t x\,dx
=
t-\frac{t}{2}
=
\frac{t}{2}
\longrightarrow0.
$$

したがって両者は同じ初期値を取ります。

しかし例えば点 $(t,x)=(1,1/4)$ では

$$
u_{\mathrm{jump}}(1,1/4)=0,
$$

$$
u_{\mathrm{rare}}(1,1/4)=\frac14.
$$

二つの弱解は異なります。従って弱解だけでは一意性がありません。
<!-- proof-end -->

ここが NPDE2 へ進む決定的な理由です。

$$
\boxed{
\text{古典解}
\ \longrightarrow\
\text{弱解}
}
$$

と解概念を広げることで衝撃波を扱えるようになりました。しかし同時に、

$$
\boxed{
\text{弱解は多すぎる}
}
$$

という新しい問題が発生しました。

---

## 10. 何をまだ決めていないのか

本章で得た Rankine--Hugoniot 条件は **保存則を満たすための条件** です。物理的・数学的に正しい弱解を選ぶ条件までは含んでいません。

Burgers の

$$
0\longrightarrow1
$$

という初期跳躍に対し、

- 特性が外へ広がる中心希薄波
- Rankine--Hugoniot だけを満たす expansion shock

の両方が弱解でした。

次章 NPDE2 では、この非一意性を解消するために

- entropy / entropy flux pair
- entropy inequality
- Lax / Oleinik 型の圧縮条件
- Kruzhkov entropy solution
- $L^1$ 収縮性
- vanishing viscosity

を導入します。

重要なのは、entropy solution が弱解より「さらに弱い」概念なのではないことです。

$$
\boxed{
\text{分布的弱解の集合}
\quad\text{から}\quad
\text{適切な解を選ぶ追加条件}
}
$$

として入ります。

---

## 11. 演習

### Level A

<a id="ex-npde1-a01"></a>
#### NPDE1-A01 保存則から特性速度を読む
- Level: A

流束

$$
f(u)=\frac{u^3}{3}
$$

に対する保存則

$$
u_t+\partial_xf(u)=0
$$

を考える。

1. 滑らかな解に対して準線形形へ書き直せ。
2. 特性速度を求めよ。
3. 特性上で $u$ が一定になることを確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
f'(u)=u^2.
$$

連鎖律から

$$
\partial_xf(u)
=
f'(u)u_x
=
u^2u_x.
$$

従って準線形形は

$$
\boxed{
u_t+u^2u_x=0
}.
$$

特性曲線を

$$
X'(t)=u(t,X(t))^2
$$

と選びます。

特性上の値

$$
U(t)=u(t,X(t))
$$

を微分すると

$$
U'
=
u_t+X'u_x
=
u_t+u^2u_x
=
0.
$$

従って $U$ は一定です。初期値を $U(0)=g(\xi)$ とすれば

$$
U(t)=g(\xi)
$$

で、特性速度は

$$
\boxed{
X'=g(\xi)^2
}.
$$
<!-- solution-end -->

<a id="ex-npde1-a02"></a>
#### NPDE1-A02 Burgers 衝撃波の速度
- Level: A

Burgers 方程式で

$$
u_L=3,
\qquad
u_R=-1
$$

をつなぐ定数状態衝撃波の速度を求めよ。Rankine--Hugoniot 条件を代入から確認せよ。

<!-- solution-start -->
#### 詳細解答

Burgers 流束は

$$
f(u)=\frac{u^2}{2}.
$$

速度公式から

$$
s
=
\frac{u_L+u_R}{2}
=
\frac{3+(-1)}2
=
1.
$$

直接 Rankine--Hugoniot 条件を確認します。

左辺は

$$
s(u_R-u_L)
=
1(-1-3)
=
-4.
$$

右辺は

$$
f(u_R)-f(u_L)
=
\frac{(-1)^2}{2}
-
\frac{3^2}{2}
=
\frac12-\frac92
=
-4.
$$

両辺が一致するので

$$
\boxed{s=1}
$$

です。
<!-- solution-end -->

<a id="ex-npde1-a03"></a>
#### NPDE1-A03 Rankine--Hugoniot 条件を満たさない跳躍
- Level: A

Burgers 方程式で

$$
u(t,x)
=
\begin{cases}
2,&x<2t,\\
0,&x>2t
\end{cases}
$$

を考える。この関数が分布的弱解でないことを Rankine--Hugoniot 条件から示せ。

<!-- solution-start -->
#### 詳細解答

左右状態は

$$
u_L=2,
\qquad
u_R=0
$$

で、仮定された界面速度は

$$
s=2.
$$

Rankine--Hugoniot 条件の左辺は

$$
s(u_R-u_L)
=
2(0-2)
=
-4.
$$

右辺は

$$
f(u_R)-f(u_L)
=
0-\frac{2^2}{2}
=
-2.
$$

したがって

$$
-4\ne-2.
$$

界面で保存される量の収支が合わないので、この跳躍は弱解ではありません。

正しい速度は

$$
s
=
\frac{u_L+u_R}{2}
=
1.
$$
<!-- solution-end -->

<a id="ex-npde1-a04"></a>
#### NPDE1-A04 Burgers の中心希薄波
- Level: A

Burgers 方程式の Riemann 初期値

$$
u_L=-1,
\qquad
u_R=2
$$

に対する中心希薄波を書け。ファン内部で PDE を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

Burgers では

$$
f'(u)=u.
$$

したがってファンの左端速度は

$$
f'(u_L)=-1,
$$

右端速度は

$$
f'(u_R)=2.
$$

中心希薄波は

$$
\boxed{
u(t,x)
=
\begin{cases}
-1,&x\le-t,\\
x/t,&-t<x<2t,\\
2,&x\ge2t.
\end{cases}
}
$$

です。

ファン内部では

$$
u=\frac{x}{t}.
$$

従って

$$
u_t=-\frac{x}{t^2},
\qquad
u_x=\frac1t.
$$

Burgers 方程式の左辺は

$$
u_t+uu_x
=
-\frac{x}{t^2}
+
\frac{x}{t}\frac1t
=
0.
$$

よってファン内部で古典的に PDE を満たします。
<!-- solution-end -->

<a id="ex-npde1-a05"></a>
#### NPDE1-A05 初期値への局所 $L^1$ 収束
- Level: A

命題 [Burgers Riemann 問題の弱解非一意性](#prop-npde1-weak-nonuniqueness) の希薄波について、

$$
K=[-2,2]
$$

とする。$0<t<1$ のとき

$$
\int_K
|u_{\mathrm{rare}}(t,x)-u_0(x)|
\,dx
$$

を計算せよ。

<!-- solution-start -->
#### 詳細解答

$0<t<1$ では差が生じるのは

$$
0<x<t
$$

だけです。

この区間で

$$
u_0(x)=1,
\qquad
u_{\mathrm{rare}}(t,x)=\frac{x}{t}.
$$

したがって

$$
\int_{-2}^2
|u_{\mathrm{rare}}-u_0|
\,dx
=
\int_0^t
\left(1-\frac{x}{t}\right)
dx.
$$

各項を積分すると

$$
\int_0^t1\,dx=t,
$$

$$
\int_0^t\frac{x}{t}\,dx
=
\frac1t\frac{t^2}{2}
=
\frac{t}{2}.
$$

従って

$$
\boxed{
\int_{-2}^2
|u_{\mathrm{rare}}-u_0|
\,dx
=
\frac{t}{2}
\to0
}.
$$
<!-- solution-end -->

### Level B

<a id="ex-npde1-b01"></a>
#### NPDE1-B01 移動界面から Rankine--Hugoniot 条件を再導出する
- Level: B

界面 $x=\gamma(t)$ の左右で古典解 $u^-,u^+$ が保存則を満たすとする。

1. 左領域の弱形式への寄与が

$$
\int
\left(
f(u^-)-\gamma'u^-
\right)
\varphi(t,\gamma(t))
\,dt
$$

になることを、移動上端の Leibniz 則と空間部分積分から導け。
2. 右領域の寄与を導け。
3. 両者を足して Rankine--Hugoniot 条件を得よ。

<!-- solution-start -->
#### 詳細解答

**1. 左領域。**

左領域の積分を

$$
I_-
=
\int
\int_{-\infty}^{\gamma(t)}
\left(
u\varphi_t+f(u)\varphi_x
\right)
dx\,dt
$$

とします。

まず

$$
F_-(t)
=
\int_{-\infty}^{\gamma(t)}
u\varphi\,dx
$$

と置くと、

$$
F_-'(t)
=
\int_{-\infty}^{\gamma(t)}
(u_t\varphi+u\varphi_t)\,dx
+
\gamma'u^-\varphi(t,\gamma(t)).
$$

よって

$$
\int_{-\infty}^{\gamma(t)}
u\varphi_t\,dx
=
F_-'
-
\int_{-\infty}^{\gamma(t)}
u_t\varphi\,dx
-
\gamma'u^-\varphi(t,\gamma(t)).
$$

また

$$
\int_{-\infty}^{\gamma(t)}
f(u)\varphi_x\,dx
=
f(u^-)\varphi(t,\gamma(t))
-
\int_{-\infty}^{\gamma(t)}
\partial_xf(u)\varphi\,dx.
$$

足して、内部では

$$
u_t+\partial_xf(u)=0
$$

を使います。さらに時間積分した $F_-'$ はテスト関数のコンパクト台により消えます。従って

$$
I_-
=
\int
\left(
f(u^-)-\gamma'u^-
\right)
\varphi(t,\gamma(t))
dt.
$$

**2. 右領域。**

右側では下端が $\gamma(t)$ なので符号が逆になり、

$$
I_+
=
\int
\left(
\gamma'u^+-f(u^+)
\right)
\varphi(t,\gamma(t))
dt.
$$

**3. 合計。**

$$
I_-+I_+
=
\int
\left[
\gamma'(u^+-u^-)
-
\{f(u^+)-f(u^-)\}
\right]
\varphi(t,\gamma(t))
dt.
$$

任意のテスト関数に対してこれが0になるには

$$
\boxed{
\gamma'(u^+-u^-)
=
f(u^+)-f(u^-)
}
$$

が必要十分です。
<!-- solution-end -->

<a id="ex-npde1-b02"></a>
#### NPDE1-B02 Burgers の圧縮型と拡張型を比較する
- Level: B

Burgers 方程式について次の二つの Riemann データを考える。

- (i) $u_L=2,\ u_R=0$
- (ii) $u_L=0,\ u_R=2$

各場合について、

1. 左右の特性速度を求める。
2. Rankine--Hugoniot 速度を求める。
3. 特性が圧縮するか拡張するかを説明する。
4. 本章の弱解条件だけでは何が決まらないか述べる。

<!-- solution-start -->
#### 詳細解答

Burgers では特性速度は

$$
f'(u)=u
$$

です。

**(i) $u_L=2,\ u_R=0$.**

左特性速度は2、右特性速度は0です。左側の方が速いので、後ろから前へ追いつきます。したがって特性は圧縮します。

Rankine--Hugoniot 速度は

$$
s=\frac{2+0}{2}=1.
$$

速度1の跳躍が弱解になります。

**(ii) $u_L=0,\ u_R=2$.**

左特性速度は0、右特性速度は2です。右側の方が速いので、特性は互いに離れていきます。したがって特性は拡張します。

それでも Rankine--Hugoniot 速度は

$$
s=\frac{0+2}{2}=1
$$

であり、速度1の跳躍も分布的弱解です。

同時に中心希薄波

$$
u(t,x)
=
\begin{cases}
0,&x\le0,\\
x/t,&0<x<2t,\\
2,&x\ge2t
\end{cases}
$$

も弱解です。

従って本章の弱解条件だけでは、拡張型データに対して「跳躍」と「希薄波」のどちらを選ぶべきか決まりません。これを選別するのが NPDE2 の entropy 条件です。
<!-- solution-end -->

<a id="ex-npde1-b03"></a>
#### NPDE1-B03 一般凸流束の希薄波を自己相似変数から導く
- Level: B

$f\in C^2(\mathbb R)$、$f''>0$ とし、$u_L<u_R$ とする。自己相似形

$$
u(t,x)=U(x/t)
$$

を仮定する。

1. $\xi=x/t$ として、PDE が

$$
\bigl(f'(U)-\xi\bigr)U'=0
$$

へ変形されることを示せ。
2. 非定数部分で

$$
U=(f')^{-1}(\xi)
$$

が必要になることを示せ。
3. 左右の定数状態と連続につなぐためのファン端速度を求めよ。

<!-- solution-start -->
#### 詳細解答

$\xi=x/t$ と置きます。

$$
\xi_t=-\frac{\xi}{t},
\qquad
\xi_x=\frac1t.
$$

従って

$$
u_t
=
U'(\xi)\xi_t
=
-\frac{\xi}{t}U',
$$

$$
u_x
=
U'(\xi)\xi_x
=
\frac1tU'.
$$

保存則を準線形形

$$
u_t+f'(u)u_x=0
$$

で書くと、

$$
-\frac{\xi}{t}U'
+
\frac{f'(U)}{t}U'
=
0.
$$

$t>0$ を掛けて

$$
\boxed{
(f'(U)-\xi)U'=0
}
$$

を得ます。

非定数部分では

$$
U'\ne0
$$

なので

$$
f'(U)=\xi.
$$

$f''>0$ により $f'$ は狭義単調増加で逆関数を持つため

$$
\boxed{
U=(f')^{-1}(\xi)
}.
$$

左状態 $u_L$ へ連続につなぐには

$$
\xi=f'(u_L)
$$

で内部解が $u_L$ になればよく、右側も同様です。従ってファン端速度は

$$
\boxed{
f'(u_L),
\qquad
f'(u_R)
}.
$$
<!-- solution-end -->

<a id="ex-npde1-b04"></a>
#### NPDE1-B04 同じ初期値を持つ二つの弱解を数値点で区別する
- Level: B

命題 [Burgers Riemann 問題の弱解非一意性](#prop-npde1-weak-nonuniqueness) の二つの弱解について、

$$
(t,x)=\left(2,\frac12\right)
$$

で値を求めよ。また、両者が同じ初期値を持つのに一致しない理由を「存在」と「一意性」を区別して説明せよ。

<!-- solution-start -->
#### 詳細解答

跳躍解の界面は

$$
x=\frac{t}{2}.
$$

$t=2$ では界面位置は

$$
x=1.
$$

評価点 $x=1/2$ は界面より左なので

$$
u_{\mathrm{jump}}\left(2,\frac12\right)=0.
$$

一方、希薄波では

$$
0<x<t
$$

の内部なので

$$
u_{\mathrm{rare}}\left(2,\frac12\right)
=
\frac{x}{t}
=
\frac{1/2}{2}
=
\frac14.
$$

従って

$$
\boxed{
u_{\mathrm{jump}}\left(2,\frac12\right)=0,
\qquad
u_{\mathrm{rare}}\left(2,\frac12\right)=\frac14
}
$$

で異なります。

両者とも弱形式と初期値への局所 $L^1$ 収束を満たすので、弱解の **存在** はあります。しかし同じ初期値に対する弱解が二つ存在するため **一意性** はありません。

解概念を広げたことで古典解破綻後の存在は回復しましたが、その代償として選択原理が必要になっています。
<!-- solution-end -->

### Level C

<a id="ex-npde1-c01"></a>
#### NPDE1-C01 Burgers Riemann 問題を「特性・弱解・非一意性」の三層で整理する
- Level: C

Burgers 方程式

$$
u_t+\partial_x\left(\frac{u^2}{2}\right)=0
$$

の Riemann 初期値

$$
u_0(x)
=
\begin{cases}
a,&x<0,\\
b,&x>0
\end{cases}
$$

を考える。ただし $a\ne b$ とする。

1. 左右の特性速度を求め、$a>b$ と $a<b$ で特性の幾何がどう異なるか説明せよ。
2. Rankine--Hugoniot 条件から、二つの定数状態を直接つなぐ跳躍の速度を求めよ。
3. $a<b$ のとき中心希薄波を書け。
4. $a<b$ のとき、2 の跳躍と 3 の希薄波がどちらも同じ Riemann 初期値を取る弱解であることを示せ。
5. 4 が「弱解へ広げれば問題は解決した」という結論にならない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**1. 特性の幾何。**

Burgers 流束では

$$
f'(u)=u.
$$

従って左状態の特性速度は $a$、右状態の特性速度は $b$ です。

$a>b$ なら左側の特性の方が速いので、左から右へ追いつきます。特性は圧縮されます。

$a<b$ なら左側の特性の方が遅く、右側が速いので、特性は互いに離れます。特性は拡張されます。

**2. 跳躍速度。**

Rankine--Hugoniot 条件は

$$
s(b-a)
=
\frac{b^2}{2}-\frac{a^2}{2}.
$$

右辺を因数分解すると

$$
\frac{b^2-a^2}{2}
=
\frac{(b-a)(a+b)}{2}.
$$

$a\ne b$ なので $b-a$ で割れて、

$$
\boxed{
s=\frac{a+b}{2}
}.
$$

従って

$$
u_{\mathrm{jump}}(t,x)
=
\begin{cases}
a,&x<\frac{a+b}{2}t,\\
b,&x>\frac{a+b}{2}t
\end{cases}
$$

は Rankine--Hugoniot 条件を満たす弱解です。

**3. $a<b$ の中心希薄波。**

Burgers では $(f')^{-1}(\xi)=\xi$ なので

$$
\boxed{
u_{\mathrm{rare}}(t,x)
=
\begin{cases}
a,&x\le at,\\
x/t,&at<x<bt,\\
b,&x\ge bt.
\end{cases}
}
$$

です。

**4. 二つとも同じ初期値を取る。**

跳躍解は 2 で Rankine--Hugoniot 条件を満たしたので $t>0$ で弱解です。

初期 Riemann 跳躍は $x=0$ にあり、時刻 $t$ の跳躍は

$$
x=st
$$

にあります。固定したコンパクト区間上で両者が異なる領域の長さは高々

$$
|s|t
$$

です。値の差は高々 $|b-a|$ なので、

$$
\int_K
|u_{\mathrm{jump}}(t,x)-u_0(x)|
\,dx
\le
|b-a||s|t
\to0.
$$

よって初期値を局所 $L^1$ の意味で取ります。

希薄波は [狭義凸流束の中心希薄波](#thm-npde1-rarefaction-weak-solution)により弱解です。

時刻0の跳躍位置0と、時刻 $t$ のファン端 $at,bt$ の位置関係も含めると、初期値との差が生じ得る集合は

$$
\left[
t\min\{a,0\},
\,
t\max\{b,0\}
\right]
$$

に含まれます。その長さは高々

$$
t(|a|+|b|).
$$

また希薄波の値は常に $a$ と $b$ の間にあるので、初期値との差は高々 $b-a$ です。従って

$$
\int_K
|u_{\mathrm{rare}}(t,x)-u_0(x)|
\,dx
\le
(b-a)(|a|+|b|)t
\to0.
$$

従ってこちらも同じ初期値を取ります。

**5. なぜ弱解だけでは不十分か。**

$a<b$ では、同じ初期値に対して

- 速度 $(a+b)/2$ の跳躍解
- 特性の間を連続に埋める中心希薄波

の二つが存在します。

したがって弱解へ広げたことで、古典解の破綻後にも候補解を作れるという **存在の問題** は改善しました。しかし **一意性の問題** は悪化しています。

保存則の弱形式と Rankine--Hugoniot 条件は「量が保存されるか」を判定しますが、「どの弱解が適切か」は判定しません。

従って追加の選択原理が必要です。NPDE2 では entropy inequality と $L^1$ 収縮性 により、この非一意性を解消します。
<!-- solution-end -->

---

## 12. 章末チェック

- 保存則を「区間内の総量の変化 = 境界流束差」として説明できる。
- 滑らかな保存則を $u_t+f'(u)u_x=0$ へ直し、特性速度 $f'(u)$ を導ける。
- 弱形式で $u$ 自身を微分せず、テスト関数へ微分を移す理由を説明できる。
- 保存則の分布的弱解と初期値への局所 $L^1$ 収束を区別して書ける。
- 一本の移動界面に対して Rankine--Hugoniot 条件を部分積分から導ける。
- 定数状態を結ぶ衝撃波速度を流束の割線勾配として計算できる。
- Riemann 問題を定義し、Burgers の圧縮型と拡張型を特性速度から判別できる。
- 狭義凸流束の中心希薄波を自己相似変数から導ける。
- Burgers の $0\to1$ Riemann データに対し、跳躍解と希薄波がともに弱解であることを確認できる。
- 「弱解の存在」と「弱解の一意性」を分け、NPDE2 の entropy 選択原理が必要になる理由を説明できる。
