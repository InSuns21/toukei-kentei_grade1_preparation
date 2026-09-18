# PDE4 波動方程式：d'Alembert・有限伝播・エネルギー

PDE2 では二階線形 PDE を楕円型・放物型・双曲型へ分類し、PDE3 では放物型の代表である熱方程式を調べました。本章では双曲型の代表として、弦の微小振動を表す方程式から出発します。

熱方程式と最も違うのは、情報の伝わり方です。熱方程式では非零の初期温度が正時刻に全空間へ影響しました。一方、ここで扱う振動では影響が速度 $c$ を超えて広がりません。また、固定端の弦ではエネルギーが散逸せず、各固有モードは減衰せずに振動し続けます。

本章ではこの構造を三つの見方から統一します。

- 特性座標から初期値による明示式を導き、右向き波・左向き波と影響の広がる速さを見る。
- エネルギー法から保存則と一意性を示す。
- 有限区間では固有モードと Fourier 正弦級数、実数全体では Fourier 変換で同じ振動機構を見る。

直接の前提は [PDE3 熱方程式](../PDE3/index.md) です。PDE3 の prerequisite として学んだ [PDE2 二階線形PDEの分類](../PDE2/index.md)、[ODE7 境界値問題と Sturm--Liouville 理論](../ODE7/index.md)、[FOU2 Fourier級数の収束論](../FOU2/index.md)、[FOU3 Fourier変換](../FOU3/index.md) の結果を、本章でも再利用します。

> **証明境界**  
> 本章はこの双曲型方程式の古典解を扱います。特性座標による明示解、初期擾乱が有限の速さで伝わること、固定端でのエネルギー保存と一意性、十分滑らかな初期値に対する Fourier 正弦級数解、Fourier 変換による全空間表示との一致までを本文で閉じます。弱解、エネルギー空間 $H^1\times L^2$、高次元の Kirchhoff / Poisson 公式、一般双曲型作用素は Encore III 以降へ送り、本章の証明へ逆輸入しません。

---

## 1. 形を保って進む波を方程式にする

<a id="def-pde4-wave-equation"></a>
<!-- formal-statement-start -->
> **定義（一次元波動方程式）**  
> 定数 $c>0$ に対して

$$
u_{tt}=c^2u_{xx}
$$

> を一次元波動方程式という。定数 $c$ を波の伝播速度という。
<!-- formal-statement-end -->

PDE2 の記号で独立変数を $(x,t)$ とし、

$$
c^2u_{xx}-u_{tt}=0
$$

と書けば

$$
A=c^2,\qquad B=0,\qquad C=-1.
$$

したがって

$$
B^2-AC=c^2>0.
$$

よって波動方程式は双曲型です。

<!-- definition-example-start: def-pde4-wave-equation -->
**定義の確認**：右向き進行波

$F\in C^2(\mathbb R)$ に対して

$$
u(t,x)=F(x-ct)
$$

と置きます。連鎖律から

$$
u_t=-cF'(x-ct),\qquad
u_{tt}=c^2F''(x-ct),
$$

$$
u_x=F'(x-ct),\qquad
u_{xx}=F''(x-ct).
$$

従って

$$
u_{tt}=c^2u_{xx}.
$$

時刻 $t$ が増えると同じ波形 $F$ が右へ距離 $ct$ だけ平行移動します。熱方程式の単一 Fourier モードが時間とともに減衰したのに対し、波動方程式では波形そのものが移動できます。
<!-- definition-example-end -->

$G(x+ct)$ については $x+ct=\text{const}$ が $t$ の増加とともに $x$ の減少を与えるので、これは左向き進行波です。線形性から

$$
F(x-ct)+G(x+ct)
$$

も解になります。次節では「なぜ全ての古典解が局所的にこの形になるのか」を特性座標から導きます。

---

## 2. 古典 Cauchy 問題

実数全体で初期変位 $f$ と初速度 $g$ を与えます。

$$
u(0,x)=f(x),
\qquad
u_t(0,x)=g(x).
$$

<a id="def-pde4-classical-solution"></a>
<!-- formal-statement-start -->
> **定義（波動方程式の古典 Cauchy 解）**  
> $f\in C^2(\mathbb R)$、$g\in C^1(\mathbb R)$ とする。$u\in C^2([0,\infty)\times\mathbb R)$ が

$$
u_{tt}=c^2u_{xx}
$$

> を点ごとに満たし、

$$
u(0,x)=f(x),\qquad u_t(0,x)=g(x)
$$

> を全ての $x\in\mathbb R$ で満たすとき、$u$ をこの Cauchy 問題の古典解という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde4-classical-solution -->
**定義の確認**

$$
u(t,x)=\cos(kx)\cos(ckt)
$$

とします。すると

$$
u_{tt}=-c^2k^2\cos(kx)\cos(ckt),
$$

$$
c^2u_{xx}=-c^2k^2\cos(kx)\cos(ckt),
$$

なので PDE を満たします。また

$$
u(0,x)=\cos(kx),\qquad u_t(0,x)=0.
$$

従って $f(x)=\cos(kx)$、$g(x)=0$ に対する古典解です。
<!-- definition-example-end -->

---

## 3. 特性座標で二階 PDE が一行になる

右向き・左向きの座標

$$
\xi=x-ct,\qquad
\eta=x+ct
$$

を導入し、

$$
v(\xi,\eta)=u(t,x)
$$

と書きます。元の座標は

$$
x=\frac{\xi+\eta}{2},
\qquad
t=\frac{\eta-\xi}{2c}
$$

です。

連鎖律により

$$
\partial_x=\partial_\xi+\partial_\eta,
$$

$$
\partial_t=-c\partial_\xi+c\partial_\eta.
$$

従って

$$
u_{xx}
=
v_{\xi\xi}+2v_{\xi\eta}+v_{\eta\eta},
$$

$$
u_{tt}
=
c^2v_{\xi\xi}-2c^2v_{\xi\eta}+c^2v_{\eta\eta}.
$$

差を取れば

$$
u_{tt}-c^2u_{xx}
=
-4c^2v_{\xi\eta}.
$$

したがって波動方程式は

$$
v_{\xi\eta}=0
$$

と同値です。

$\eta$ を固定すると $v_\eta$ は $\xi$ に依存しないので、ある一変数関数 $A$ が存在して

$$
v_\eta(\xi,\eta)=A(\eta).
$$

$\eta$ で積分すれば

$$
v(\xi,\eta)=F(\xi)+G(\eta)
$$

となります。元の変数へ戻して

$$
u(t,x)=F(x-ct)+G(x+ct).
$$

双曲型で現れた二本の特性方向が、右向き波と左向き波そのものになっています。

---

## 4. 初期変位と初速度を明示解へまとめる

初期変位と初速度を $F,G$ へ入れます。$t=0$ では

$$
F(x)+G(x)=f(x),
$$

また

$$
u_t(t,x)
=
-cF'(x-ct)+cG'(x+ct)
$$

なので

$$
-cF'(x)+cG'(x)=g(x).
$$

第一式を微分した

$$
F'(x)+G'(x)=f'(x)
$$

と合わせると

$$
F'(x)=\frac12f'(x)-\frac1{2c}g(x),
$$

$$
G'(x)=\frac12f'(x)+\frac1{2c}g(x).
$$

これを積分して定数を合わせれば、次の公式が得られます。

<a id="thm-pde4-dalembert"></a>
<!-- formal-statement-start -->
> **定理（d'Alembert 公式）**  
> $c>0$、$f\in C^2(\mathbb R)$、$g\in C^1(\mathbb R)$ とする。このとき Cauchy 問題

$$
u_{tt}=c^2u_{xx},
$$

$$
u(0,x)=f(x),\qquad u_t(0,x)=g(x)
$$

> は古典解

$$
\boxed{
u(t,x)
=
\frac{f(x-ct)+f(x+ct)}2
+
\frac1{2c}
\int_{x-ct}^{x+ct}g(s)\,ds
}
$$

> を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

存在は公式を直接微分して確認します。初速度項では可変端点積分の微分を使います。一意性は後でエネルギー法からも示しますが、実数全体の Cauchy 問題については特性座標で全ての古典解が $F(x-ct)+G(x+ct)$ と書けた時点で、初期データが $F',G'$ を決めるため既に見えています。

<!-- proof-start -->
### 証明

$$
I(t,x)
:=
\frac1{2c}
\int_{x-ct}^{x+ct}g(s)\,ds
$$

と置きます。微積分学の基本定理と連鎖律から

$$
I_t
=
\frac12
\{g(x+ct)+g(x-ct)\},
$$

$$
I_x
=
\frac1{2c}
\{g(x+ct)-g(x-ct)\}.
$$

さらに

$$
I_{tt}
=
\frac c2
\{g'(x+ct)-g'(x-ct)\},
$$

$$
I_{xx}
=
\frac1{2c}
\{g'(x+ct)-g'(x-ct)\}.
$$

従って

$$
I_{tt}=c^2I_{xx}.
$$

一方

$$
J(t,x)
=
\frac{f(x-ct)+f(x+ct)}2
$$

は右向き波と左向き波の和なので

$$
J_{tt}=c^2J_{xx}.
$$

よって $u=J+I$ は波動方程式を満たします。

$t=0$ を代入すると

$$
u(0,x)
=
\frac{f(x)+f(x)}2
+
\frac1{2c}\int_x^xg(s)\,ds
=
f(x).
$$

また

$$
J_t(t,x)
=
\frac c2
\{-f'(x-ct)+f'(x+ct)\},
$$

なので $J_t(0,x)=0$ です。先ほどの $I_t$ から

$$
I_t(0,x)=g(x).
$$

従って

$$
u_t(0,x)=g(x).
$$

仮定 $f\in C^2$、$g\in C^1$ により上の微分は連続なので $u\in C^2$ です。以上で存在が示されました。

一意性について、任意の古典解を特性座標へ移すと

$$
v_{\xi\eta}=0
$$

なので

$$
u(t,x)=F(x-ct)+G(x+ct)
$$

と書けます。初期条件から

$$
F'+G'=f',
\qquad
-cF'+cG'=g
$$

が決まり、従って $F',G'$ は一意です。$F,G$ 自体には互いに打ち消す定数の自由度しかなく、その和 $u$ は一意です。
<!-- proof-end -->

[d'Alembert 公式](#thm-pde4-dalembert)は単なる解公式ではありません。「時刻 $t$、位置 $x$ の値が、初期時刻のどの範囲だけを見ているか」をそのまま示しています。

---

## 5. どの初期データが、いつ届くのか

<a id="def-pde4-domain-dependence"></a>
<!-- formal-statement-start -->
> **定義（一次元波動方程式の後方依存区間）**  
> 点 $(t_0,x_0)$、$t_0>0$ に対し

$$
I_0(t_0,x_0)
=
[x_0-ct_0,\ x_0+ct_0]
$$

> を、その点の初期時刻上の後方依存区間という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde4-domain-dependence -->
**定義の確認**

$c=2$、$(t_0,x_0)=(3,5)$ なら

$$
I_0(3,5)
=
[5-6,5+6]
=
[-1,11].
$$

[d'Alembert 公式](#thm-pde4-dalembert)で $u(3,5)$ を計算するために必要なのは、$f$ の端点値 $f(-1),f(11)$ と、$g$ の $[-1,11]$ 上の値だけです。初期時刻の $x=20$ にある情報はまだ $(3,5)$ へ届きません。
<!-- definition-example-end -->

<a id="cor-pde4-finite-propagation"></a>
<!-- formal-statement-start -->
> **系（有限伝播速度）**  
> [d'Alembert 公式](#thm-pde4-dalembert)の仮定の下で、初期データ $f,g$ が区間 $[a,b]$ の外で 0 とする。このとき任意の $t\ge0$ について

$$
u(t,x)=0
\qquad
(x<a-ct\ \text{または}\ x>b+ct)
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x>b+ct$ とします。このとき

$$
x-ct>b,
\qquad
x+ct>b.
$$

従って

$$
f(x-ct)=f(x+ct)=0.
$$

また積分区間全体が $(b,\infty)$ に含まれるので

$$
\int_{x-ct}^{x+ct}g(s)\,ds=0.
$$

[d'Alembert 公式](#thm-pde4-dalembert)から $u(t,x)=0$ です。

次に $x<a-ct$ とします。このとき $x-ct<a$ かつ $x+ct<a$ であり、積分区間 $[x-ct,x+ct]$ 全体も $(-\infty,a)$ に含まれます。従って二つの $f$ の項と $g$ の積分項が全て 0 となり、やはり $u(t,x)=0$ です。
<!-- proof-end -->

つまり初期データの台は速度 $c$ でしか広がりません。PDE3 の熱核は任意の $t>0$ で全ての $x$ に正の尾を持ったので、これは放物型と双曲型の違いを最も直接に見る例です。

---

## 6. 固定端の弦ではエネルギーが保存される

有限区間 $0<x<L$ で

$$
u_{tt}=c^2u_{xx},
$$

$$
u(t,0)=u(t,L)=0
$$

を考えます。弦の運動エネルギーに対応する $u_t^2$ と、張力による位置エネルギーに対応する $c^2u_x^2$ を合わせます。

<a id="thm-pde4-energy-conservation"></a>
<!-- formal-statement-start -->
> **定理（固定端波動方程式のエネルギー保存）**  
> $u\in C^2([0,T]\times[0,L])$ が

$$
u_{tt}=c^2u_{xx}
$$

> を $0<t<T,\ 0<x<L$ で満たし、

$$
u(t,0)=u(t,L)=0
$$

> を全ての $t\in[0,T]$ で満たすとする。このとき

$$
E(t)
:=
\frac12
\int_0^L
\{u_t(t,x)^2+c^2u_x(t,x)^2\}\,dx
$$

> は $t$ に依存せず、

$$
E'(t)=0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時間微分し、PDE を代入すると被積分関数が $x$ 微分一つにまとまります。熱方程式では部分積分後に $-\int u_x^2$ が残って散逸しましたが、波動方程式では

$$
u_tu_{xx}+u_xu_{xt}
=
\partial_x(u_tu_x)
$$

となり、内部には散逸項が残りません。

<!-- proof-start -->
### 証明

十分滑らかなので積分の中で微分でき、

$$
\begin{aligned}
E'(t)
&=
\int_0^L
\{u_tu_{tt}+c^2u_xu_{xt}\}\,dx.
\end{aligned}
$$

PDE $u_{tt}=c^2u_{xx}$ を代入すると

$$
E'(t)
=
c^2
\int_0^L
\{u_tu_{xx}+u_xu_{xt}\}\,dx.
$$

積の微分

$$
\partial_x(u_tu_x)
=
u_{tx}u_x+u_tu_{xx}
$$

を使えば

$$
E'(t)
=
c^2
\int_0^L
\partial_x(u_tu_x)\,dx
=
c^2[u_tu_x]_0^L.
$$

境界条件は全ての $t$ で

$$
u(t,0)=u(t,L)=0
$$

です。時間で微分して

$$
u_t(t,0)=u_t(t,L)=0.
$$

従って境界流束は 0 となり、

$$
E'(t)=0.
$$
<!-- proof-end -->

境界が固定されていない場合には

$$
c^2u_tu_x
$$

が端点から出入りするエネルギー流束になります。保存則は「何も起きていない」のではなく、内部で運動エネルギーと位置エネルギーが交換されていることを示します。

---

## 7. エネルギー保存から一意性が出る

<a id="cor-pde4-uniqueness"></a>
<!-- formal-statement-start -->
> **系（固定端初期境界値問題の一意性）**  
> 同じ初期変位 $f$、初速度 $g$、斉次 Dirichlet 境界条件

$$
u(t,0)=u(t,L)=0
$$

> を持つ二つの $C^2$ 古典解 $u,v$ が存在するなら

$$
u=v
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

差

$$
w=u-v
$$

を取ります。線形性から

$$
w_{tt}=c^2w_{xx},
$$

$$
w(t,0)=w(t,L)=0.
$$

さらに初期値は

$$
w(0,x)=0,
\qquad
w_t(0,x)=0.
$$

従って $w$ のエネルギーは

$$
E_w(0)
=
\frac12
\int_0^L
\{w_t(0,x)^2+c^2w_x(0,x)^2\}\,dx
=0.
$$

ここで $w(0,x)\equiv0$ なので $w_x(0,x)=0$ も使いました。

エネルギー保存から

$$
E_w(t)=0
$$

です。被積分関数は連続かつ非負なので

$$
w_t(t,x)=0,
\qquad
w_x(t,x)=0
$$

が全ての $(t,x)$ で成り立ちます。従って $w$ は $t,x$ の双方に依存しない定数です。境界条件 $w(t,0)=0$ からその定数は 0 です。

よって $w=0$、すなわち $u=v$ です。
<!-- proof-end -->

ここでは解公式を使っていません。エネルギーが 0 なら差の解が動く余地も空間的に変化する余地もない、という構造だけで一意性が出ています。

---

## 8. 固定端では周波数が離散化する

次に変数分離を使います。

$$
u(t,x)=T(t)X(x)
$$

と置くと

$$
T''X=c^2TX''.
$$

非零の範囲で割れば

$$
\frac{T''}{c^2T}
=
\frac{X''}{X}
=
-\lambda.
$$

したがって

$$
-X''=\lambda X,
\qquad
X(0)=X(L)=0,
$$

$$
T''+c^2\lambda T=0.
$$

空間側は [ODE7 の Dirichlet 固有値問題](../ODE7/index.md#def-ode7-eigenpair) であり、

$$
\lambda_n
=
\left(\frac{n\pi}{L}\right)^2,
\qquad
X_n(x)
=
\sin\left(\frac{n\pi x}{L}\right)
$$

です。

時間側は

$$
T_n''+\omega_n^2T_n=0,
\qquad
\omega_n=c\frac{n\pi}{L},
$$

なので

$$
T_n(t)
=
A_n\cos(\omega_nt)
+
B_n\sin(\omega_nt).
$$

熱方程式では同じ空間固有値 $\lambda_n$ が指数減衰率 $\kappa\lambda_n$ を作りました。波動方程式では角周波数 $c\sqrt{\lambda_n}$ を作ります。

---

## 9. 有限個の固有モードは厳密解になる

<a id="prop-pde4-finite-sine"></a>
<!-- formal-statement-start -->
> **命題（固定端の有限 Fourier 正弦モード解）**  
> $k_n=n\pi/L$、$\omega_n=ck_n$ とする。任意の $N\in\mathbb N$ と実数 $a_n,b_n$ に対し

$$
u_N(t,x)
=
\sum_{n=1}^N
\{a_n\cos(\omega_nt)+b_n\sin(\omega_nt)\}
\sin(k_nx)
$$

> は固定端波動方程式の古典解である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限和なので項別微分に問題はありません。第 $n$ 項を

$$
u_n(t,x)
=
\{a_n\cos(\omega_nt)+b_n\sin(\omega_nt)\}
\sin(k_nx)
$$

とします。

時間二階微分は

$$
(u_n)_{tt}
=
-\omega_n^2u_n,
$$

空間二階微分は

$$
(u_n)_{xx}
=
-k_n^2u_n.
$$

$\omega_n=ck_n$ なので

$$
(u_n)_{tt}
=
-c^2k_n^2u_n
=
c^2(u_n)_{xx}.
$$

また

$$
\sin(k_n\cdot0)=0,
\qquad
\sin(k_nL)=\sin(n\pi)=0,
$$

なので各項が固定端条件を満たします。線形性により有限和 $u_N$ も同じ方程式と境界条件を満たします。
<!-- proof-end -->

単一モードは振幅を失わず永久に振動します。複数モードでは角周波数が $n$ に比例するため、理想弦では整数倍音が現れます。

---

## 10. Fourier 正弦級数で一般の初期データを運ぶ

初期条件を

$$
u(0,x)=f(x),
\qquad
u_t(0,x)=g(x)
$$

とします。正弦係数を

$$
a_n
=
\frac2L\int_0^Lf(x)\sin(k_nx)\,dx,
$$

$$
g_n
=
\frac2L\int_0^Lg(x)\sin(k_nx)\,dx
$$

と置けば、形式的には

$$
u(t,x)
=
\sum_{n=1}^{\infty}
\left\{
a_n\cos(ck_nt)
+
\frac{g_n}{ck_n}\sin(ck_nt)
\right\}
\sin(k_nx)
$$

と期待されます。

熱方程式では正時刻の指数減衰が微分後の級数を強く収束させました。波動方程式にはその助けがありません。そのため古典解を級数から直接構成するには、初期データ側へ十分な滑らかさを要求します。

<a id="thm-pde4-sine-series"></a>
<!-- formal-statement-start -->
> **定理（滑らかな初期値に対する固定端 Fourier 正弦級数解）**  
> $f\in C^4([0,L])$、$g\in C^3([0,L])$ が

$$
f(0)=f(L)=0,
\qquad
f''(0)=f''(L)=0,
$$

$$
g(0)=g(L)=0
$$

> を満たすとする。$k_n=n\pi/L$ とし

$$
a_n
=
\frac2L\int_0^Lf(x)\sin(k_nx)\,dx,
$$

$$
g_n
=
\frac2L\int_0^Lg(x)\sin(k_nx)\,dx
$$

> と置く。このとき

$$
\boxed{
u(t,x)
=
\sum_{n=1}^{\infty}
\left\{
a_n\cos(ck_nt)
+
\frac{g_n}{ck_n}\sin(ck_nt)
\right\}
\sin(k_nx)
}
$$

> は任意の有限 $T>0$ に対して $[0,T]\times[0,L]$ 上で必要な微分を項別に行える固定端波動方程式の古典解であり、

$$
u(0,x)=f(x),
\qquad
u_t(0,x)=g(x)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

波動方程式では時間因子の絶対値が 1 以下にしかならないので、係数そのものを十分速く減衰させる必要があります。

- $f$ は4回部分積分して $a_n=O(n^{-4})$。
- $g$ は3回分の評価から $g_n=O(n^{-3})$。

すると二階微分後でも係数列は $O(n^{-2})$ で絶対収束し、項別微分を正当化できます。

<!-- proof-start -->
### 証明

まず $a_n$ を評価します。$f(0)=f(L)=0$ なので二回部分積分して

$$
a_n
=
-\frac2{Lk_n^2}
\int_0^L
f''(x)\sin(k_nx)\,dx.
$$

さらに $f''(0)=f''(L)=0$ を使って同じ操作を二回行うと

$$
a_n
=
\frac2{Lk_n^4}
\int_0^L
f^{(4)}(x)\sin(k_nx)\,dx.
$$

従って

$$
|a_n|
\le
\frac2{Lk_n^4}
\int_0^L|f^{(4)}(x)|\,dx
=
O(n^{-4}).
$$

次に $g_n$ を評価します。$g(0)=g(L)=0$ から二回部分積分して

$$
g_n
=
-\frac2{Lk_n^2}
\int_0^L
g''(x)\sin(k_nx)\,dx.
$$

さらに一回部分積分すると

$$
\int_0^Lg''(x)\sin(k_nx)\,dx
=
\left[
-\frac{g''(x)\cos(k_nx)}{k_n}
\right]_0^L
+
\frac1{k_n}
\int_0^Lg'''(x)\cos(k_nx)\,dx.
$$

$g'',g'''$ は連続なので右辺は $O(k_n^{-1})$ です。従って

$$
g_n=O(n^{-3}).
$$

級数の各項を時間または空間で二回微分すると、$a_n$ 側には高々 $k_n^2$、$g_n/(ck_n)$ 側には高々定数倍の $k_n^2$ が掛かります。したがって二階微分後の係数はそれぞれ

$$
k_n^2|a_n|=O(n^{-2}),
$$

$$
k_n^2\frac{|g_n|}{ck_n}
=
O(n^{-2}).
$$

混合微分 $u_{tx}$ では、$a_n$ 側に $k_n^2$、$g_n/(ck_n)$ 側に定数倍の $k_n^2$ が掛かるので、ここでも係数は $O(n^{-2})$ です。よって Weierstrass の判定法により、元の級数だけでなく $u_t,u_x,u_{tt},u_{tx},u_{xx}$ を与える級数も $[0,T]\times[0,L]$ 上で一様収束します。したがって項別微分でき、有限モードの場合と同じ計算から

$$
u_{tt}=c^2u_{xx}
$$

が成り立ちます。

各項は $x=0,L$ で 0 なので境界条件も満たします。

最後に初期条件を確認します。$f$ を $(-L,L)$ へ奇関数延長し、さらに $2L$ 周期へ延長します。端点条件から連続な区分的 $C^1$ 関数になるので、[FOU2 の Dirichlet の点ごとの極限定理](../FOU2/index.md#thm-fou2-dirichlet-convergence)により正弦級数は $f$ へ収束します。しかも $a_n=O(n^{-4})$ なので絶対一様収束です。従って

$$
u(0,x)
=
\sum_{n=1}^{\infty}a_n\sin(k_nx)
=
f(x).
$$

$g(0)=g(L)=0$ なので、$g$ の奇周期延長も連続かつ区分的 $C^1$ です。従って同じ [FOU2 の Dirichlet の点ごとの極限定理](../FOU2/index.md#thm-fou2-dirichlet-convergence)を $g$ に適用できます。さらに $g_n=O(n^{-3})$ なので

$$
u_t(0,x)
=
\sum_{n=1}^{\infty}g_n\sin(k_nx)
=
g(x).
$$

以上で初期条件まで確認できました。
<!-- proof-end -->

この滑らかさ仮定は最小ではありません。ここでは Sobolev 空間を使わず、古典解の構成を初等的な一様収束だけで閉じるために強めています。

---

## 11. Fourier 変換では各周波数が調和振動子になる

実数全体では境界条件がないため、FOU3 の Fourier 変換が自然です。空間変数 $x$ について変換すると、[Fourier変換と微分](../FOU3/index.md#thm-fou3-derivative-rule)から形式的に

$$
\widehat u_{tt}(t,\xi)
=
-c^2\xi^2\widehat u(t,\xi).
$$

すなわち各 $\xi$ ごとに

$$
\widehat u_{tt}
+
c^2\xi^2\widehat u
=
0.
$$

これは調和振動子です。初期値

$$
\widehat u(0,\xi)=\widehat f(\xi),
\qquad
\widehat u_t(0,\xi)=\widehat g(\xi)
$$

から

$$
\widehat u(t,\xi)
=
\widehat f(\xi)\cos(c\xi t)
+
\widehat g(\xi)
\frac{\sin(c\xi t)}{c\xi},
$$

ここで $\xi=0$ では第二因子を極限値 $t$ と解釈します。

この表示が [d'Alembert 公式](#thm-pde4-dalembert)と本当に同じであることを確認します。

<a id="prop-pde4-fourier-dalembert"></a>
<!-- formal-statement-start -->
> **命題（Fourier 表示と d'Alembert 公式の一致）**  
> $f,g\in C_c^\infty(\mathbb R)$ とし、$u$ を [d'Alembert 公式](#thm-pde4-dalembert)で定める。このとき

$$
\widehat u(t,\xi)
=
\widehat f(\xi)\cos(c\xi t)
+
\widehat g(\xi)
\frac{\sin(c\xi t)}{c\xi}.
$$

> またこの周波数表示を FOU3 の反転規約

$$
h(x)=\frac1{2\pi}\int_{\mathbb R}\widehat h(\xi)e^{i\xi x}\,d\xi
$$

> で空間へ戻すと [d'Alembert 公式](#thm-pde4-dalembert)を得る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第一項について

$$
\cos(c\xi t)
=
\frac12
\left(
e^{ic\xi t}+e^{-ic\xi t}
\right).
$$

[FOU3 の平行移動則](../FOU3/index.md#thm-fou3-transform-rules)により

$$
\frac12
\widehat f(\xi)e^{ic\xi t}
+
\frac12
\widehat f(\xi)e^{-ic\xi t}
$$

を Fourier 反転公式で空間へ戻すと

$$
\frac12f(x+ct)
+
\frac12f(x-ct)
$$

になります。

第二項のため

$$
H_t(x)
=
\frac1{2c}1_{[-ct,ct]}(x)
$$

と置きます。FOU3 で計算した区間指示関数の Fourier 変換を使うと、$\xi\ne0$ で

$$
\widehat H_t(\xi)
=
\frac1{2c}
\frac{2\sin(ct\xi)}{\xi}
=
\frac{\sin(ct\xi)}{c\xi}.
$$

$\xi=0$ では両辺とも極限値 $t$ です。

$f,g\in C_c^\infty(\mathbb R)$ なので、部分積分を繰り返せば $\widehat f,\widehat g$ は任意の多項式次数より速く減衰し、特に $L^1(\mathbb R)$ に属します。また $\sin(ct\xi)/(c\xi)$ は有界です。従って以下の周波数側の積も $L^1$ であり、[FOU3 の Fourier 反転定理](../FOU3/index.md#thm-fou3-inversion)を適用できます。

[FOU3 の畳み込み定理](../FOU3/index.md#thm-fou3-convolution)から

$$
\widehat{H_t*g}(\xi)
=
\widehat g(\xi)
\frac{\sin(ct\xi)}{c\xi}.
$$

従って第二項を Fourier 反転で空間へ戻すと

$$
(H_t*g)(x)
=
\frac1{2c}
\int_{x-ct}^{x+ct}g(s)\,ds.
$$

二項を合わせれば

$$
u(t,x)
=
\frac{f(x-ct)+f(x+ct)}2
+
\frac1{2c}
\int_{x-ct}^{x+ct}g(s)\,ds,
$$

すなわち [d'Alembert 公式](#thm-pde4-dalembert)です。
<!-- proof-end -->

ここで二つの見方が完全に一致しました。

- 特性座標：波形が左右へ速度 $c$ で動く。
- Fourier 変換：周波数 $\xi$ ごとに角周波数 $c|\xi|$ で振動する。

熱方程式では $\exp(-\kappa\xi^2t)$ が高周波を減衰させました。波動方程式では $\cos(c\xi t)$、$\sin(c\xi t)$ が絶対値1程度で残るため、古典解の正則性を時間発展が自動的に改善してくれないことも見えます。

---

## 12. 熱方程式との構造比較

| 観点 | 熱方程式 | 波動方程式 |
|---|---|---|
| 型 | 放物型 | 双曲型 |
| 時間微分 | 一階 | 二階 |
| 必要な初期データ | 初期値1個 | 初期変位と初速度 |
| Fourier モード | $e^{-\kappa\xi^2t}$ | $\cos(c\xi t),\sin(c\xi t)$ |
| エネルギー | 散逸 | 固定端で保存 |
| 情報伝播 | 無限伝播 | 有限速度 $c$ |
| 正則化 | 正時刻で強い平滑化 | 原則として平滑化しない |

同じ空間二階微分 $u_{xx}$ を含んでいても、時間方向の構造が違えば解の性質は大きく変わります。PDE2 の「型分類」が単なる名前付けではなかったことが、熱と波動の比較ではっきり見えます。

---

## 13. 演習

### Level A

<a id="ex-pde4-a01"></a>
#### PDE4-A01 進行波を直接検証する
- Level: A

$F\in C^2(\mathbb R)$ とし

$$
u(t,x)=3F(x-2t)-F(x+2t)
$$

とする。

1. $u_{tt}=4u_{xx}$ を直接確認せよ。
2. 第一項と第二項がそれぞれどちら向きへ進むか答えよ。
3. 時刻が1増えたとき各波形は何だけ移動するか答えよ。

<!-- solution-start -->
**解答**

1. 第一項について

$$
\partial_{tt}\{3F(x-2t)\}
=
12F''(x-2t),
$$

$$
4\partial_{xx}\{3F(x-2t)\}
=
12F''(x-2t).
$$

第二項について

$$
\partial_{tt}\{-F(x+2t)\}
=
-4F''(x+2t),
$$

$$
4\partial_{xx}\{-F(x+2t)\}
=
-4F''(x+2t).
$$

従って和について

$$
u_{tt}=4u_{xx}.
$$

2. $F(x-2t)$ は同じ値を保つ条件 $x-2t=\text{const}$ から $x$ が増えるので右向きです。$F(x+2t)$ は $x+2t=\text{const}$ から左向きです。

3. 速度の絶対値は2なので、時刻が1増えるとそれぞれ距離2だけ移動します。
<!-- solution-end -->

<a id="ex-pde4-a02"></a>
#### PDE4-A02 d'Alembert 公式で余弦波を運ぶ
- Level: A

$c>0$ とし

$$
f(x)=\cos(kx),
\qquad
g(x)=0
$$

とする。[d'Alembert 公式](#thm-pde4-dalembert)から解を求め、

$$
u(t,x)=\cos(kx)\cos(ckt)
$$

となることを示せ。

<!-- solution-start -->
**解答**

$g=0$ なので積分項は消え、

$$
u(t,x)
=
\frac12
\{\cos(k(x-ct))+\cos(k(x+ct))\}.
$$

加法定理

$$
\cos(A-B)+\cos(A+B)
=
2\cos A\cos B
$$

で

$$
A=kx,\qquad B=kct
$$

と置けば

$$
u(t,x)
=
\cos(kx)\cos(ckt).
$$

初期変位は $\cos(kx)$、初速度は 0 であり、周波数 $k$ の空間モードが時間角周波数 $ck$ で振動します。
<!-- solution-end -->

<a id="ex-pde4-a03"></a>
#### PDE4-A03 依存領域を読む
- Level: A

伝播速度 $c=3$ の波動方程式を考える。

1. 点 $(t,x)=(2,10)$ の後方依存区間を求めよ。
2. 二組の初期データ $(f_1,g_1)$、$(f_2,g_2)$ がその区間上で一致するとき、対応する d'Alembert 解 $u_1,u_2$ について $u_1(2,10)=u_2(2,10)$ を示せ。

<!-- solution-start -->
**解答**

1.

$$
I_0(2,10)
=
[10-3\cdot2,\ 10+3\cdot2]
=
[4,16].
$$

2. [d'Alembert 公式](#thm-pde4-dalembert)から

$$
u_j(2,10)
=
\frac{
f_j(4)+f_j(16)
}{2}
+
\frac16
\int_4^{16}g_j(s)\,ds.
$$

仮定より $f_1=f_2$、$g_1=g_2$ が $[4,16]$ 上で成り立つので、端点値も積分値も一致します。従って

$$
u_1(2,10)=u_2(2,10).
$$
<!-- solution-end -->

<a id="ex-pde4-a04"></a>
#### PDE4-A04 単一固定端モードのエネルギー
- Level: A

$$
u(t,x)
=
A\cos\left(\frac{c\pi t}{L}\right)
\sin\left(\frac{\pi x}{L}\right)
$$

とする。

$$
E(t)
=
\frac12
\int_0^L
\{u_t^2+c^2u_x^2\}\,dx
$$

を計算し、$t$ に依存しないことを直接確認せよ。

<!-- solution-start -->
**解答**

$\omega=c\pi/L$ と置くと

$$
u_t
=
-A\omega\sin(\omega t)
\sin\left(\frac{\pi x}{L}\right),
$$

$$
u_x
=
A\frac{\pi}{L}
\cos(\omega t)
\cos\left(\frac{\pi x}{L}\right).
$$

また

$$
\int_0^L
\sin^2\left(\frac{\pi x}{L}\right)dx
=
\int_0^L
\cos^2\left(\frac{\pi x}{L}\right)dx
=
\frac L2.
$$

従って

$$
\begin{aligned}
E(t)
&=
\frac12
\left[
A^2\omega^2\sin^2(\omega t)\frac L2
+
c^2A^2\left(\frac{\pi}{L}\right)^2
\cos^2(\omega t)\frac L2
\right].
\end{aligned}
$$

$\omega=c\pi/L$ なので

$$
E(t)
=
\frac{A^2c^2\pi^2}{4L}
\{\sin^2(\omega t)+\cos^2(\omega t)\}.
$$

よって

$$
\boxed{
E(t)=\frac{A^2c^2\pi^2}{4L}
}
$$

であり一定です。
<!-- solution-end -->

### Level B

<a id="ex-pde4-b01"></a>
#### PDE4-B01 コンパクトな初期擾乱の到達時刻
- Level: B

$f,g$ が $[-1,1]$ の外で 0 とし、伝播速度を $c=2$ とする。

1. 時刻 $t$ に解が非零となり得る範囲を求めよ。
2. 点 $x=7$ が初めて影響を受け得る最小時刻を求めよ。
3. 熱方程式の非負・非零コンパクト台初期値の場合と何が違うか説明せよ。

<!-- solution-start -->
**解答**

1. [有限伝播速度](#cor-pde4-finite-propagation)から

$$
\operatorname{supp}u(t,\cdot)
\subset
[-1-2t,\ 1+2t].
$$

2. $x=7$ が右端 $1+2t$ に入る最初の時刻を求めればよいので

$$
7=1+2t
$$

から

$$
t=3.
$$

従って $t<3$ では $u(t,7)=0$ が保証されます。$t=3$ 以降は初期データの形によって非零になり得ます。

3. 熱方程式では Gaussian 熱核が全空間で正なので、非負・非零のコンパクト台初期値は任意の $t>0$ で全ての点へ影響します。波動方程式では有限伝播領域の外へ情報が出ず、到達前は厳密に 0 のままです。
<!-- solution-end -->

<a id="ex-pde4-b02"></a>
#### PDE4-B02 エネルギー法で一意性を再構成する
- Level: B

$w\in C^2([0,T]\times[0,L])$ が

$$
w_{tt}=c^2w_{xx},
$$

$$
w(t,0)=w(t,L)=0,
$$

$$
w(0,x)=0,
\qquad
w_t(0,x)=0
$$

を満たすとする。

本文の一意性証明を参照せず、次の順に $w\equiv0$ を示せ。

1. $E_w'(t)=c^2[w_tw_x]_0^L$ を導け。
2. 境界条件から $E_w'(t)=0$ を示せ。
3. $E_w(0)=0$ を示せ。
4. $E_w(t)=0$ から $w_t=w_x=0$ を点ごとに導け。
5. 境界条件を使って $w=0$ と結論せよ。

<!-- solution-start -->
**解答**

1.

$$
E_w(t)
=
\frac12
\int_0^L
(w_t^2+c^2w_x^2)\,dx
$$

を微分すると

$$
E_w'
=
\int_0^L
(w_tw_{tt}+c^2w_xw_{xt})\,dx.
$$

PDE を代入して

$$
E_w'
=
c^2
\int_0^L
(w_tw_{xx}+w_xw_{xt})\,dx.
$$

括弧内は

$$
\partial_x(w_tw_x)
$$

なので

$$
E_w'(t)=c^2[w_tw_x]_0^L.
$$

2. $w(t,0)=w(t,L)=0$ を $t$ で微分して

$$
w_t(t,0)=w_t(t,L)=0.
$$

従って境界項は 0 で

$$
E_w'(t)=0.
$$

3. $w_t(0,x)=0$ です。また $w(0,x)\equiv0$ なので $w_x(0,x)=0$。従って

$$
E_w(0)=0.
$$

4. 保存則から $E_w(t)=0$。被積分関数

$$
w_t^2+c^2w_x^2
$$

は連続かつ非負です。積分が 0 なら全点で 0 なので

$$
w_t=0,\qquad w_x=0.
$$

5. $w_t=w_x=0$ から $w$ は定数です。さらに $w(t,0)=0$ なので定数は 0。従って

$$
\boxed{w\equiv0}.
$$
<!-- solution-end -->

<a id="ex-pde4-b03"></a>
#### PDE4-B03 二つの固定端モードを時間発展させる
- Level: B

$0<x<L$ の固定端波動方程式で

$$
u(0,x)
=
2\sin\left(\frac{\pi x}{L}\right),
$$

$$
u_t(0,x)
=
3\sin\left(\frac{2\pi x}{L}\right)
$$

とする。

1. 解を求めよ。
2. 第一モードと第二モードの角周波数を求めよ。
3. 熱方程式の場合と異なり、どちらのモードも時間とともに消えないことを式から説明せよ。

<!-- solution-start -->
**解答**

$k_n=n\pi/L$、$\omega_n=ck_n$ とします。

初期変位は第一モードだけなので

$$
a_1=2,
\qquad
a_n=0\ (n\ne1).
$$

初速度は第二モードだけなので

$$
g_2=3,
\qquad
g_n=0\ (n\ne2).
$$

従って

$$
\boxed{
u(t,x)
=
2\cos\left(\frac{c\pi t}{L}\right)
\sin\left(\frac{\pi x}{L}\right)
+
\frac{3L}{2c\pi}
\sin\left(\frac{2c\pi t}{L}\right)
\sin\left(\frac{2\pi x}{L}\right)
}.
$$

2.

$$
\omega_1=\frac{c\pi}{L},
\qquad
\omega_2=\frac{2c\pi}{L}.
$$

3. 時間因子は $\cos(\omega_nt)$、$\sin(\omega_nt)$ であり、指数減衰因子を持ちません。従って理想的な固定端波動方程式では各モードの振幅は減衰しません。熱方程式なら同じ空間モードに

$$
e^{-\kappa(n\pi/L)^2t}
$$

が掛かり、高周波ほど速く消えます。
<!-- solution-end -->

### Level C

<a id="ex-pde4-c01"></a>
#### PDE4-C01 奇周期延長で固定端問題と d'Alembert 公式をつなぐ
- Level: C

$f\in C^2([0,L])$、$g\in C^1([0,L])$ が

$
f(0)=f(L)=0,
\qquad
f''(0)=f''(L)=0,
$

$
g(0)=g(L)=0
$

を満たすとする。

$f,g$ をまず $(-L,L)$ へ奇関数として延長し、さらに周期 $2L$ で実数全体へ延長したものを $F,G$ とする。この端点条件により $F\in C^2(\mathbb R)$、$G\in C^1(\mathbb R)$ となる。

$$
u(t,x)
=
\frac{F(x-ct)+F(x+ct)}2
+
\frac1{2c}
\int_{x-ct}^{x+ct}G(s)\,ds
$$

と置く。

1. $u$ が実数全体上の波動方程式を満たすことを説明せよ。
2. $u(t,0)=0$ を示せ。
3. $F,G$ の $2L$ 周期性と奇性を使って $u(t,L)=0$ を示せ。
4. 初期条件が $u(0,x)=f(x)$、$u_t(0,x)=g(x)$ になることを示せ。
5. $f(x)=\sin(\pi x/L)$、$g=0$ のとき、この構成が
   $$
   u(t,x)
   =
   \cos\left(\frac{c\pi t}{L}\right)
   \sin\left(\frac{\pi x}{L}\right)
   $$
   を与えることを確認せよ。
6. この構成が「端点で反射する波」と Fourier 正弦モードをどう結びつけているか説明せよ。

<!-- solution-start -->
**解答**

1. $F,G$ は実数全体上の初期変位・初速度です。与えられた式はその [d'Alembert 公式](#thm-pde4-dalembert)なので、滑らかさの仮定の下で

$$
u_{tt}=c^2u_{xx}
$$

を満たします。

2. 奇性から

$$
F(-ct)=-F(ct).
$$

従って変位項は 0 です。また $G$ も奇関数なので

$$
\int_{-ct}^{ct}G(s)\,ds=0.
$$

よって

$$
u(t,0)=0.
$$

3. $2L$ 周期かつ奇関数なら、任意の $y$ に対して

$$
F(L+y)
=
F(-L+y)
=
-F(L-y).
$$

最初の等号は $2L$ 周期性、二つ目は $-L+y=-(L-y)$ と奇性によります。従って

$$
F(L-ct)+F(L+ct)=0.
$$

$G$ についても、$2L$ 周期性から $G(L+y)=G(-L+y)$、奇性から $G(-L+y)=-G(L-y)$ なので $G(L+y)=-G(L-y)$ です。積分について $s=L+r$ と置くと

$$
\int_{L-ct}^{L+ct}G(s)\,ds
=
\int_{-ct}^{ct}G(L+r)\,dr.
$$

ここで $G(L+r)=-G(L-r)$ なので、$r$ について奇関数となり積分は 0 です。従って

$$
u(t,L)=0.
$$

4. $t=0$ では

$$
u(0,x)=F(x)=f(x)
$$

が $0\le x\le L$ で成り立ちます。[d'Alembert 公式](#thm-pde4-dalembert)の微分計算から

$$
u_t(0,x)=G(x)=g(x).
$$

5. $f(x)=\sin(\pi x/L)$ はすでに奇な $2L$ 周期関数なので $F=f$、また $G=0$ です。従って

$$
u(t,x)
=
\frac12
\left[
\sin\left(\frac{\pi(x-ct)}L\right)
+
\sin\left(\frac{\pi(x+ct)}L\right)
\right].
$$

加法定理

$$
\sin(A-B)+\sin(A+B)
=
2\sin A\cos B
$$

から

$$
u(t,x)
=
\sin\left(\frac{\pi x}{L}\right)
\cos\left(\frac{c\pi t}{L}\right).
$$

6. 奇周期延長では、端点を越えた波を符号反転させて周期的に配置します。[d'Alembert 公式](#thm-pde4-dalembert)で直線上を進む波を追うと、この符号反転が固定端での反射として見えます。一方、同じ奇 $2L$ 周期関数を Fourier 展開すると正弦級数だけが残ります。従って

$$
\text{固定端での反射}
\quad\longleftrightarrow\quad
\text{奇周期延長}
\quad\longleftrightarrow\quad
\text{Fourier正弦モード}
$$

は同じ構造を三つの見方で表したものです。
<!-- solution-end -->

---

## 章末チェック

- 波動方程式が双曲型であることを判別式から確認できるか。
- $F(x-ct)$、$G(x+ct)$ が進行波になることを直接微分して確認できるか。
- 特性座標 $\xi=x-ct,\eta=x+ct$ から $u=F(\xi)+G(\eta)$ を導けるか。
- [d'Alembert 公式](#thm-pde4-dalembert)を初期変位・初速度から導き、直接検証できるか。
- 点 $(t,x)$ の後方依存区間を読み、[有限伝播速度](#cor-pde4-finite-propagation)を証明できるか。
- 固定端のエネルギー保存で、境界項がなぜ消えるか説明できるか。
- エネルギーが 0 であることから一意性を再構成できるか。
- 変数分離から Dirichlet 固有値問題と調和振動子を導けるか。
- Fourier 正弦級数解で、熱方程式と違って初期データの滑らかさが必要になる理由を説明できるか。
- Fourier 変換表示を [d'Alembert 公式](#thm-pde4-dalembert)へ戻し、特性空間と周波数空間の二つの見方を対応させられるか。

次章 PDE5 では、時間発展を持たない楕円型の代表として Laplace・Poisson 方程式へ進みます。最大原理、平均値性質、Dirichlet 問題を通じて、Laplace 方程式の解が持つ「境界から内部が決まる」構造を調べます。
