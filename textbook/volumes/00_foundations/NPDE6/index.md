# NPDE6 半線形熱方程式・臨界性・有限時間 blow-up

## 1. 拡散があっても解は有限時間で壊れうる

[NPDE4](../NPDE4/index.md) では、熱方程式の拡散が熱核平滑化と時間減衰を生むことを見ました。線形熱方程式だけなら、非負の有界初期値から有限時間で値が無限大になる機構はありません。

一方、未知関数自身が熱源になると事情が変わります。本章では

$$
u_t=\Delta u+u^p,
\qquad
p>1,
\qquad
x\in\mathbb R^d
$$

を考えます。

$\Delta u$ は山をならす拡散、$u^p$ は大きい値ほどさらに強く増幅する反応です。したがって中心問題は

$$
\boxed{
\text{拡散の減衰と非線形反応の増幅のどちらが勝つか}
}
$$

です。

この競合を読むために、次の順で進みます。

1. [PDE8 の Duhamel 原理](../PDE8/index.md#thm-pde8-heat-duhamel)から積分方程式を作る。
2. $u^p$ は大域 Lipschitz ではないので、値を有界範囲へ閉じ込めて局所解を作る。
3. 解を延長できなくなるとき、何が発散するのかを固定する。
4. [NPDE4 の放物型尺度変換](../NPDE4/index.md#def-npde4-parabolic-scaling)から臨界指数を導く。
5. 熱核を未来から逆向きに当てた平均量で、有限時間 blow-up を判定する。
6. 最後に blow-up 時刻へ向かう自己相似尺度を導く。

<a id="def-npde6-semilinear-heat"></a>
<!-- formal-statement-start -->
> **定義（半線形熱方程式）**  
> $d\ge1$、$p>1$ とする。本章では
>
> $$
> u_t=\Delta u+u^p
> $$
>
> を、非負解 $u\ge0$ の範囲で **半線形熱方程式** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde6-semilinear-heat -->
**定義の確認**：空間に依存しない関数 $u(t,x)=U(t)$ を代入すると

$$
U'(t)=U(t)^p
$$

となります。したがって、PDE の中には既に有限時間で発散しうる ODE が埋め込まれています。
<!-- definition-example-end -->

---

## 2. 熱核で非線形方程式を積分方程式へ変える

$d$ 次元熱核を

$$
G_t(x)
=
(4\pi t)^{-d/2}
\exp\left(-\frac{|x|^2}{4t}\right),
\qquad t>0,
$$

とし、

$$
S(t)f=G_t*f
$$

と書きます。

$S(t)$ は非負関数を非負関数へ送り、

$$
\|S(t)f\|_\infty
\le
\|f\|_\infty
$$

を満たします。また熱核の半群性から

$$
S(t)S(s)=S(t+s)
$$

です。

線形方程式

$$
u_t-\Delta u=f
$$

の Duhamel 公式で $f=u^p$ と置けば

$$
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)u(s)^p\,ds
$$

が得られます。右辺にも未知関数が残りますが、微分方程式を直接扱う代わりに固定点問題として扱えるようになります。

有界一様連続関数全体を $BUC(\mathbb R^d)$ と書きます。

<a id="def-npde6-mild-solution"></a>
<!-- formal-statement-start -->
> **定義（半線形熱方程式の mild solution）**  
> $T>0$、$u_0\in BUC(\mathbb R^d)$、$u_0\ge0$ とする。関数
>
> $$
> u\in C([0,T];BUC(\mathbb R^d)),
> \qquad
> u(t,x)\ge0
> $$
>
> が全ての $0\le t\le T$ について
>
> $$
> \boxed{
> u(t)
> =
> S(t)u_0
> +
> \int_0^t
> S(t-s)u(s)^p\,ds
> }
> $$
>
> を満たすとき、$u$ をその初期値 $u_0$ に対する **mild solution** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde6-mild-solution -->
**定義の確認**：$u_0\equiv0$ なら $u\equiv0$ と置くと

$$
S(t)u_0=0,
\qquad
\int_0^tS(t-s)u(s)^p\,ds=0,
$$

なので Duhamel 式を満たします。
<!-- definition-example-end -->

---

## 3. $u^p$ は大域 Lipschitz でなくても局所解は作れる

[PDE8](../PDE8/index.md#prop-pde8-semilinear-picard) では非線形項が大域 Lipschitz の場合に Picard 反復を扱いました。しかし $r\mapsto r^p$ は $r\to\infty$ で導関数 $pr^{p-1}$ が無限大になるので、その定理をそのまま全時間へ適用できません。

必要なのは、まず値を $0\le u\le R$ に閉じ込めることです。この区間では平均値の定理から

$$
|a^p-b^p|
\le
pR^{p-1}|a-b|
\qquad
(0\le a,b\le R)
$$

となり、局所的には Lipschitz です。

<a id="thm-npde6-local-existence"></a>
<!-- formal-statement-start -->
> **定理（半線形熱方程式の局所存在一意性）**  
> $d\ge1$、$p>1$ とし、$u_0\in BUC(\mathbb R^d)$、$u_0\ge0$ とする。このときある $T>0$ が存在して、初期値 $u_0$ に対する非負 mild solution
>
> $$
> u\in C([0,T];BUC(\mathbb R^d))
> $$
>
> が一意に存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$$
(\Phi u)(t)
=
S(t)u_0
+
\int_0^tS(t-s)u(s)^p\,ds
$$

と置きます。$u$ を半径 $R$ の箱に制限すると

- $\Phi$ がその箱から出ないこと、
- $\Phi$ が縮小写像になること、

の二つを $T$ を小さく選んで同時に満たせます。

<!-- proof-start -->
### 証明

$M=\|u_0\|_\infty$ とします。$M=0$ なら $u\equiv0$ が解なので、以下 $M>0$ とします。

$$
R=2M
$$

と置き、

$$
X_T
=
\left\{
u\in C([0,T];BUC):
0\le u(t,x)\le R
\right\}
$$

を一様ノルム

$$
\|u\|_{X_T}
=
\sup_{0\le t\le T}\|u(t)\|_\infty
$$

で考えます。

$u\in X_T$ なら、熱半群の正値性と $L^\infty$ 収縮性から

$$
0\le(\Phi u)(t)
$$

であり、

$$
\begin{aligned}
\|(\Phi u)(t)\|_\infty
&\le
\|S(t)u_0\|_\infty
+
\int_0^t
\|S(t-s)u(s)^p\|_\infty\,ds\\
&\le
M
+
\int_0^t
\|u(s)\|_\infty^p\,ds\\
&\le
M+TR^p.
\end{aligned}
$$

したがって

$$
TR^p\le R-M=M
$$

なら $\Phi u\in X_T$ です。

次に $u,v\in X_T$ とします。$0\le u,v\le R$ なので

$$
|u^p-v^p|
\le
pR^{p-1}|u-v|.
$$

従って

$$
\begin{aligned}
\|\Phi u-\Phi v\|_{X_T}
&\le
\sup_{0\le t\le T}
\int_0^t
\|u(s)^p-v(s)^p\|_\infty\,ds\\
&\le
TpR^{p-1}
\|u-v\|_{X_T}.
\end{aligned}
$$

よって

$$
TpR^{p-1}<1
$$

となるよう $T$ をさらに小さくすれば $\Phi$ は縮小写像です。

$X_T$ は閉集合として完備なので Banach の不動点定理から一意な不動点 $u=\Phi u$ を得ます。これが非負 mild solution です。
<!-- proof-end -->

ここで重要なのは「非線形項が大域 Lipschitz だから解けた」のではなく、**短時間なら解の値を有界範囲に閉じ込め、その範囲で局所 Lipschitz 性を使えた**ことです。

---

## 4. 初期値の大小関係は解の大小関係として残る

反応 $r^p$ は $r\ge0$ で単調増加です。また熱半群も順序を保ちます。

この二つを Picard 反復へ入れると比較原理が得られます。

<a id="prop-npde6-comparison"></a>
<!-- formal-statement-start -->
> **命題（非負 mild solution の比較原理）**  
> $u_0,v_0\in BUC(\mathbb R^d)$ が
>
> $$
> 0\le u_0\le v_0
> $$
>
> を満たすとする。$u,v$ をそれぞれの初期値から出る非負 mild solution とし、両方が $[0,T]$ に存在するとする。このとき
>
> $$
> u(t,x)\le v(t,x)
> \qquad
> (0\le t\le T,\ x\in\mathbb R^d)
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず局所存在定理の構成時間を、$u_0,v_0$ の両方を含む同じ半径 $R$ で取ります。

Picard 反復を

$$
u^{(0)}(t)=S(t)u_0,
\qquad
v^{(0)}(t)=S(t)v_0
$$

から始め、

$$
u^{(n+1)}
=
S(t)u_0
+
\int_0^tS(t-s)(u^{(n)}(s))^p\,ds,
$$

$$
v^{(n+1)}
=
S(t)v_0
+
\int_0^tS(t-s)(v^{(n)}(s))^p\,ds
$$

とします。

$u_0\le v_0$ と熱半群の正値性から

$$
u^{(0)}\le v^{(0)}.
$$

さらに $u^{(n)}\le v^{(n)}$ なら、$r^p$ の単調性から

$$
(u^{(n)})^p\le(v^{(n)})^p.
$$

再び熱半群の順序保存性を使えば

$$
u^{(n+1)}\le v^{(n+1)}.
$$

従って全ての $n$ で順序が保たれます。反復列は一様収束するので極限を取って

$$
u\le v
$$

を得ます。

共通存在区間全体については、任意の時刻を新しい初期時刻として同じ局所議論を繰り返せばよいです。
<!-- proof-end -->

---

## 5. 「解が壊れる」とは何が発散することなのか

局所解が作れた後は、その解を可能な限り延長します。

<a id="def-npde6-maximal-time"></a>
<!-- formal-statement-start -->
> **定義（最大存在時間と有限時間 blow-up）**  
> $u_0\in BUC(\mathbb R^d)$、$u_0\ge0$ に対する一意な非負 mild solution が存在する最大区間を
>
> $$
> [0,T_{\max})
> $$
>
> とする。$T_{\max}<\infty$ のとき、本章では解が **有限時間 blow-up** するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde6-maximal-time -->
**定義の確認**：$u_0(x)\equiv a>0$ とします。空間一様解 $u(t,x)=U(t)$ は

$$
U'=U^p,
\qquad
U(0)=a
$$

を満たします。

変数分離すると

$$
U^{-p}dU=dt,
$$

したがって

$$
\frac{U(t)^{1-p}-a^{1-p}}{1-p}=t.
$$

よって

$$
U(t)
=
\left(
a^{1-p}-(p-1)t
\right)^{-1/(p-1)}.
$$

分母が0になる

$$
T_{\max}
=
\frac{a^{1-p}}{p-1}
$$

で

$$
U(t)\to\infty
\qquad
(t\uparrow T_{\max})
$$

です。
<!-- definition-example-end -->

定義だけでは、有限時間で「別の理由」により延長不能になる可能性が残っています。次の定理がそれを排除します。

<a id="thm-npde6-blowup-alternative"></a>
<!-- formal-statement-start -->
> **定理（L-infinity blow-up alternative）**  
> $d\ge1$、$p>1$、$u_0\in BUC(\mathbb R^d)$、$u_0\ge0$ とし、$u$ を最大存在区間 $[0,T_{\max})$ 上の非負 mild solution とする。もし
>
> $$
> T_{\max}<\infty,
> $$
>
> なら
>
> $$
> \boxed{
> \lim_{t\uparrow T_{\max}}
> \|u(t)\|_\infty
> =
> \infty
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反対に、ある $M<\infty$ が存在して

$$
\|u(t)\|_\infty\le M
\qquad
(0\le t<T_{\max})
$$

と仮定します。

局所存在定理の証明を見ると、初期値の $L^\infty$ ノルムが $M$ 以下なら、例えば

$$
R=2M+1
$$

を共通に選び、

$$
\delta R^p\le R-M,
\qquad
\delta pR^{p-1}<1
$$

を満たす $\delta>0$ を取れば、どの初期時刻からでも少なくとも長さ $\delta$ の局所解を作れます。ここで $\delta$ は初期時刻には依存しません。

$$
t_0>T_{\max}-\frac{\delta}{2}
$$

を選び、$u(t_0)$ を新しい初期値として局所存在定理を適用します。新しい解は $[t_0,t_0+\delta]$ に存在します。

一意性により、新しい解は $[t_0,T_{\max})$ で元の解と一致します。しかし

$$
t_0+\delta>T_{\max}
$$

なので、元の解を $T_{\max}$ より先へ延長できてしまい、最大性に矛盾します。

従って有限最大存在時間なら $L^\infty$ ノルムは有界ではありません。

さらに比較原理から $t\mapsto\|u(t)\|_\infty$ の発散を部分列だけでなく最終時刻へ向かう発散として読めます。実際、任意の $t_0<T_{\max}$ から解を再出発した局所存在時間は $\|u(t_0)\|_\infty$ の上界だけで決まるため、終端近くで一様に小さい部分列があれば同じ延長議論が成立します。
<!-- proof-end -->

この章で「blow-up quantity」と呼ぶ量は

$$
\|u(t)\|_\infty
$$

です。有限時間で最大存在区間が終わることと、この量が発散することが対応しました。

---

## 6. scaling は臨界ノルムを先に教える

[NPDE4](../NPDE4/index.md) と同じ放物型尺度

$$
t\mapsto\lambda^2t,
\qquad
x\mapsto\lambda x
$$

を使い、

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^2t,\lambda x)
$$

と置きます。

時間微分と Laplacian はどちらも

$$
\lambda^{\alpha+2}
$$

倍です。一方、

$$
u_\lambda^p
=
\lambda^{\alpha p}
u(\lambda^2t,\lambda x)^p.
$$

方程式を不変にするには

$$
\alpha+2=\alpha p,
$$

すなわち

$$
\alpha=\frac{2}{p-1}
$$

が必要です。

さらに $L^q$ ノルムは変数変換 $y=\lambda x$ により

$$
\begin{aligned}
\|u_\lambda(t)\|_q^q
&=
\int_{\mathbb R^d}
\lambda^{\alpha q}
|u(\lambda^2t,\lambda x)|^q\,dx\\
&=
\lambda^{\alpha q-d}
\|u(\lambda^2t)\|_q^q.
\end{aligned}
$$

従って

$$
\|u_\lambda(t)\|_q
=
\lambda^{\alpha-d/q}
\|u(\lambda^2t)\|_q.
$$

<a id="prop-npde6-scaling"></a>
<!-- formal-statement-start -->
> **命題（半線形熱方程式の尺度変換と臨界 Lq 指数）**  
> $d\ge1$、$p>1$ とする。$u$ が
>
> $$
> u_t=\Delta u+u^p
> $$
>
> を満たすなら、任意の $\lambda>0$ に対し
>
> $$
> u_\lambda(t,x)
> =
> \lambda^{2/(p-1)}
> u(\lambda^2t,\lambda x)
> $$
>
> も同じ方程式を満たす。また
>
> $$
> \|u_\lambda(0)\|_q
> =
> \lambda^{2/(p-1)-d/q}
> \|u_0\|_q.
> $$
>
> 従って $L^q$ が尺度不変となる指数は
>
> $$
> \boxed{
> q_c=\frac{d(p-1)}{2}
> }.
> $$
<!-- formal-statement-end -->

ここで二種類の「臨界」を区別します。

- $p$ を固定して、どの初期値ノルムが尺度不変かを問うと $q_c=d(p-1)/2$。
- 質量を測る $L^1$ が尺度不変になる $p$ を問うと、別の指数が現れる。

$L^1$ が臨界になる条件は

$$
q_c=1.
$$

したがって

$$
\frac{d(p-1)}2=1
$$

から

$$
p=1+\frac2d
$$

です。

<a id="def-npde6-fujita-exponent"></a>
<!-- formal-statement-start -->
> **定義（Fujita 指数）**  
> 空間次元 $d\ge1$ に対し
>
> $$
> \boxed{
> p_F
> =
> 1+\frac2d
> }
> $$
>
> を半線形熱方程式の **Fujita 指数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde6-fujita-exponent -->
**定義の確認**：$d=1,2,3$ ではそれぞれ

$$
p_F(1)=3,
\qquad
p_F(2)=2,
\qquad
p_F(3)=\frac53.
$$

次元が高いほど熱核の高さ $t^{-d/2}$ は速く減衰するため、反応指数の境界は1へ近づきます。
<!-- definition-example-end -->

scaling は境界候補を教えただけで、まだ blow-up 定理を証明していません。次に熱核を使ってこの指数が実際に力学の境界になることを示します。

---

## 7. 未来の熱核平均は PDE を ODE 型不等式へ変える

将来時刻 $T>0$ と観測点 $x_0\in\mathbb R^d$ を固定します。

時刻 $t<T$ の解を、残り時間 $T-t$ だけ線形熱方程式で進めて $x_0$ で観測し、

$$
F(t)
=
\bigl(S(T-t)u(t)\bigr)(x_0)
$$

と置きます。

$S(T-t)$ の時間微分は生成子 $\Delta$ と逆符号になり、PDE の $\Delta u$ と打ち消し合います。残るのは $u^p$ です。

<a id="prop-npde6-backward-kernel"></a>
<!-- formal-statement-start -->
> **命題（backward heat-kernel average による存在必要条件）**  
> $d\ge1$、$p>1$ とし、非負 mild solution $u$ が $[0,T]$ まで有界に存在するとする。このとき任意の $x_0\in\mathbb R^d$ について
>
> $$
> \boxed{
> (S(T)u_0)(x_0)
> \le
> \bigl((p-1)T\bigr)^{-1/(p-1)}
> }
> $$
>
> が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

$F(t)=S(T-t)u(t)(x_0)$ を微分すると

$$
F'(t)=S(T-t)(u(t)^p)(x_0).
$$

熱核の質量は1なので Jensen の不等式を使え、

$$
F'(t)\ge F(t)^p
$$

となります。あとは ODE $y'=y^p$ と同じ積分です。

<!-- proof-start -->
### 証明

まず $0<t<T$ では熱核平滑化により必要な微分を正当化できます。mild solution の方程式から

$$
u_t-\Delta u=u^p
$$

が正時刻で成り立つので、

$$
\begin{aligned}
F'(t)
&=
-\Delta S(T-t)u(t)(x_0)
+
S(T-t)u_t(t)(x_0)\\
&=
S(T-t)(u_t-\Delta u)(t)(x_0)\\
&=
S(T-t)(u(t)^p)(x_0).
\end{aligned}
$$

$S(T-t)$ は質量1の非負熱核による平均です。関数 $r\mapsto r^p$ は $r\ge0$ で凸なので Jensen の不等式から

$$
S(T-t)(u^p)(x_0)
\ge
\left(S(T-t)u(x_0)\right)^p
=
F(t)^p.
$$

従って

$$
F'(t)\ge F(t)^p.
$$

$F(t)>0$ の区間で

$$
\frac{d}{dt}F(t)^{1-p}
=
(1-p)F(t)^{-p}F'(t)
\le
1-p.
$$

$\varepsilon<t<T$ で積分すると

$$
F(t)^{1-p}
\le
F(\varepsilon)^{1-p}
-
(p-1)(t-\varepsilon).
$$

$t\uparrow T$ としても左辺は非負なので

$$
F(\varepsilon)^{1-p}
\ge
(p-1)(T-\varepsilon).
$$

$\varepsilon\downarrow0$ とすると mild solution の連続性と熱半群の強連続性から

$$
F(\varepsilon)\to F(0)
=
(S(T)u_0)(x_0).
$$

よって

$$
F(0)^{1-p}
\ge
(p-1)T.
$$

$p>1$ なので両辺を指数 $-1/(p-1)$ で読み替えると

$$
(S(T)u_0)(x_0)
\le
\bigl((p-1)T\bigr)^{-1/(p-1)}.
$$
<!-- proof-end -->

この条件を破る $T,x_0$ が一つでも見つかれば、その時刻 $T$ まで有界解は存在できません。

---

## 8. Fujita 指数の下では全ての非零非負データが blow-up する

前節の必要条件と、熱核の大時間スケール

$$
G_T(x)\sim T^{-d/2}
$$

を比較します。

初期値 $u_0\ge0$ が非零で $L^1$ に属するなら、ある $R>0$ を選んで

$$
M_R
=
\int_{B_R}u_0(x)\,dx
>0
$$

とできます。

$T\ge R^2$ なら $|x|\le R$ で

$$
e^{-|x|^2/(4T)}
\ge
e^{-1/4},
$$

なので

$$
\begin{aligned}
(S(T)u_0)(0)
&=
\int_{\mathbb R^d}
G_T(y)u_0(y)\,dy\\
&\ge
(4\pi T)^{-d/2}
e^{-1/4}
M_R.
\end{aligned}
$$

したがって global solution が存在するなら、前節の必要条件と合わせて

$$
cM_R T^{-d/2}
\le
C_p T^{-1/(p-1)}
$$

が全ての大きな $T$ で必要です。

### 8.1 劣臨界では冪だけで矛盾する

もし

$$
1<p<1+\frac2d,
$$

なら

$$
\frac1{p-1}-\frac d2>0.
$$

従って

$$
cM_R
T^{1/(p-1)-d/2}
\le
C_p
$$

の左辺は $T\to\infty$ で無限大になり、矛盾します。

### 8.2 臨界では冪が同じなので対数を一段掘る

臨界

$$
p=1+\frac2d
$$

では

$$
\frac1{p-1}=\frac d2
$$

なので、上の単純な冪比較だけでは両辺が同じ $T^{-d/2}$ になって矛盾しません。

ここで非線形項を一度 Duhamel 式へ戻します。

global solution が存在すると仮定します。$s\ge R^2$、$|y|\le\sqrt s$ なら、Duhamel 項は非負なので

$$
u(s,y)
\ge
(S(s)u_0)(y).
$$

さらに $z\in B_R$ に対して

$$
|y-z|
\le
\sqrt s+R
\le
2\sqrt s,
$$

したがって

$$
G_s(y-z)
\ge
(4\pi s)^{-d/2}e^{-1}.
$$

よってある $c_0>0$ が存在して

$$
u(s,y)
\ge
c_0s^{-d/2}
\qquad
(s\ge s_0,\ |y|\le\sqrt s)
$$

となります。ここで $s_0\ge R^2$ を固定しました。

次に時刻 $t$ の mild solution に $S(t)$ を作用させます。半群性から

$$
S(t)u(t)
=
S(2t)u_0
+
\int_0^t
S(2t-s)u(s)^p\,ds.
$$

$x=0$ で、$s_0\le s\le t$ と $|y|\le\sqrt s$ の部分だけ残します。$t\le2t-s\le2t$ かつ $|y|^2\le s\le t$ なので

$$
G_{2t-s}(y)
\ge
c_1t^{-d/2}
$$

となる定数 $c_1>0$ があります。

従って

$$
\begin{aligned}
(S(t)u(t))(0)
&\ge
c_1t^{-d/2}
\int_{s_0}^t
\int_{|y|\le\sqrt s}
u(s,y)^p\,dy\,ds\\
&\ge
c_2t^{-d/2}
\int_{s_0}^t
s^{-dp/2}
s^{d/2}\,ds\\
&=
c_2t^{-d/2}
\int_{s_0}^t
s^{-d(p-1)/2}\,ds.
\end{aligned}
$$

臨界では

$$
\frac{d(p-1)}2=1
$$

なので

$$
(S(t)u(t))(0)
\ge
c_2t^{-d/2}
\log\frac{t}{s_0}.
$$

一方、時刻 $t$ を新しい初期時刻とし、その先さらに長さ $t$ だけ解が存在することへ前節の必要条件を適用すると

$$
(S(t)u(t))(0)
\le
\bigl((p-1)t\bigr)^{-1/(p-1)}
=
C_pt^{-d/2}.
$$

従って

$$
c_2\log\frac{t}{s_0}
\le
C_p
$$

が全ての大きな $t$ で必要になりますが、左辺は無限大へ発散します。これで臨界の場合も global existence は不可能です。

---

## 9. Fujita 指数の上では小さい global data が実際に存在する

$p>p_F$ では「全ての解が global」になるわけではありません。空間一様な正の解はどんな $p>1$ でも有限時間で blow-up します。

変わるのは、**十分小さく局在した非零データから global solution を作れるようになる**ことです。

その構成を Gaussian を使って直接行います。

$$
a
=
\frac{d(p-1)}2.
$$

$p>p_F$ はちょうど

$$
a>1
$$

と同値です。

熱核には

$$
G_r(x)^p
=
p^{-d/2}
(4\pi r)^{-a}
G_{r/p}(x)
$$

という恒等式があります。

したがって $0\le s<t$ に対して

$$
\begin{aligned}
S(t-s)(G_{s+\tau}^p)
&=
p^{-d/2}
(4\pi(s+\tau))^{-a}
G_{t-s+(s+\tau)/p}.
\end{aligned}
$$

ここで

$$
\frac{t+\tau}{p}
\le
t-s+\frac{s+\tau}{p}
\le
t+\tau.
$$

Gaussian の幅を比較すると

$$
G_{t-s+(s+\tau)/p}(x)
\le
p^{d/2}G_{t+\tau}(x).
$$

従って

$$
S(t-s)(G_{s+\tau}^p)
\le
(4\pi(s+\tau))^{-a}
G_{t+\tau}.
$$

時間積分は $a>1$ のときだけ

$$
\int_0^\infty
(4\pi(s+\tau))^{-a}\,ds
=
(4\pi)^{-a}
\frac{\tau^{1-a}}{a-1}
<\infty
$$

になります。

<a id="thm-npde6-fujita"></a>
<!-- formal-statement-start -->
> **定理（Fujita 型 blow-up / global existence dichotomy）**  
> $d\ge1$、$p>1$ とし、
>
> $$
> u_0\in BUC(\mathbb R^d)\cap L^1(\mathbb R^d),
> \qquad
> u_0\ge0,
> \qquad
> u_0\not\equiv0
> $$
>
> とする。
>
> 1. $1<p\le1+2/d$ なら、最大非負 mild solution の最大存在時間は有限であり、
>
> $$
> \|u(t)\|_\infty\to\infty
> \qquad
> (t\uparrow T_{\max})
> $$
>
> となる。
> 2. $p>1+2/d$ なら、非零の sufficiently small data で global mild solution を持つものが存在する。具体的に $\tau>0$ を固定し、
>
> $$
> 0\le u_0(x)\le A G_\tau(x)
> $$
>
> とする。$a=d(p-1)/2>1$ と
>
> $$
> K
> =
> (4\pi)^{-a}
> \frac{\tau^{1-a}}{a-1}
> $$
>
> に対して
>
> $$
> 2^pA^{p-1}K\le1
> $$
>
> が成り立てば、解は全時間に存在し、
>
> $$
> 0\le u(t,x)\le2A G_{t+\tau}(x)
> $$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第1項の $1<p<p_F$ は前節の冪比較、$p=p_F$ は対数改善によって global existence が矛盾することを既に示しました。従って $T_{\max}<\infty$ です。[L-infinity blow-up alternative](#thm-npde6-blowup-alternative)から

$$
\|u(t)\|_\infty\to\infty
$$

が従います。

第2項を示します。

候補上界を

$$
W(t,x)
=
2A G_{t+\tau}(x)
$$

と置きます。まず初期データの仮定と熱半群の半群性から

$$
S(t)u_0
\le
A S(t)G_\tau
=
A G_{t+\tau}.
$$

また前節の Gaussian 評価から

$$
\begin{aligned}
\int_0^t
S(t-s)W(s)^p\,ds
&=
(2A)^p
\int_0^t
S(t-s)(G_{s+\tau}^p)\,ds\\
&\le
(2A)^p
G_{t+\tau}
\int_0^t
(4\pi(s+\tau))^{-a}\,ds\\
&\le
(2A)^pK G_{t+\tau}.
\end{aligned}
$$

小ささの条件

$$
2^pA^{p-1}K\le1
$$

は

$$
(2A)^pK\le A
$$

と同値です。従って

$$
S(t)u_0
+
\int_0^tS(t-s)W(s)^p\,ds
\le
2AG_{t+\tau}
=
W(t).
$$

つまり $W$ は Duhamel 写像に対する上側 barrier です。

局所存在定理の Picard 反復を $S(t)u_0$ から始めると、熱半群の正値性と $r^p$ の単調性により全ての反復で

$$
0\le u^{(n)}\le W
$$

が保たれます。極限の局所解も

$$
0\le u\le W.
$$

特に

$$
\|u(t)\|_\infty
\le
2A(4\pi(t+\tau))^{-d/2}
\le
2A(4\pi\tau)^{-d/2}
$$

で、全存在区間に一様な $L^\infty$ 上界を持ちます。

もし最大存在時間が有限なら blow-up alternative に反するため、

$$
T_{\max}=\infty.
$$
<!-- proof-end -->

この定理が示す境界は次の通りです。

$$
\boxed{
p\le p_F
\Longrightarrow
\text{全ての非零非負 }L^1\text{ データが blow-up}
}
$$

一方で

$$
\boxed{
p>p_F
\Longrightarrow
\text{小さい非零 global data が存在}
}
$$

です。

$p>p_F$ でも大きいデータや空間一様データは blow-up しうるので、「Fujita 指数を越えたら blow-up が消える」と読んではいけません。

---

## 10. blow-up 時刻に合わせて自己相似尺度を作る

有限 blow-up 時刻を $T$ とし、

$$
\tau=T-t
$$

を残り時間とします。

scaling で振幅指数は

$$
\frac{2}{p-1}
$$

でした。空間幅が $\sqrt\tau$ で縮むことを考えると、高さは

$$
\tau^{-1/(p-1)}
$$

が自然です。

<a id="def-npde6-backward-self-similar"></a>
<!-- formal-statement-start -->
> **定義（backward self-similar blow-up）**  
> $T>0$、$p>1$ とする。ある profile $F$ が存在して
>
> $$
> u(t,x)
> =
> (T-t)^{-1/(p-1)}
> F\left(
> \frac{x}{\sqrt{T-t}}
> \right)
> $$
>
> と表される解を、本章では **backward self-similar blow-up** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde6-backward-self-similar -->
**定義の確認**：$F$ が正の定数なら、空間変数への依存は消えます。したがって空間一様 ODE blow-up も、この形の最も単純な例になり得ます。
<!-- definition-example-end -->

profile 方程式を完成式として置かず、連鎖律から導きます。

$$
\alpha
=
\frac1{p-1},
\qquad
\tau=T-t,
\qquad
y=\frac{x}{\sqrt\tau}
$$

とし、

$$
u(t,x)=\tau^{-\alpha}F(y)
$$

と書きます。

まず

$$
\frac{d\tau}{dt}=-1,
\qquad
\frac{dy}{dt}
=
\frac{1}{2\tau}y.
$$

従って

$$
u_t
=
\tau^{-\alpha-1}
\left(
\alpha F
+
\frac12y\cdot\nabla F
\right).
$$

空間微分一回につき $\tau^{-1/2}$ が出るので

$$
\Delta_xu
=
\tau^{-\alpha-1}\Delta_yF.
$$

また

$$
u^p
=
\tau^{-\alpha p}F^p.
$$

$\alpha=1/(p-1)$ から

$$
\alpha p=\alpha+1
$$

なので、三項の時間因子は全て一致します。

<a id="prop-npde6-backward-profile"></a>
<!-- formal-statement-start -->
> **命題（backward self-similar profile 方程式）**  
> $d\ge1$、$p>1$ とし、
>
> $$
> u(t,x)
> =
> (T-t)^{-1/(p-1)}
> F\left(\frac{x}{\sqrt{T-t}}\right)
> $$
>
> が十分滑らかな半線形熱方程式の解であるとする。このとき profile $F$ は
>
> $$
> \boxed{
> \Delta F
> -
> \frac12y\cdot\nabla F
> -
> \frac1{p-1}F
> +
> F^p
> =
> 0
> }
> $$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で計算した三式を

$$
u_t=\Delta u+u^p
$$

へ代入すると

$$
\tau^{-\alpha-1}
\left(
\alpha F+\frac12y\cdot\nabla F
\right)
=
\tau^{-\alpha-1}\Delta F
+
\tau^{-\alpha p}F^p.
$$

$\alpha p=\alpha+1$ を使って共通因子 $\tau^{-\alpha-1}$ を消すと

$$
\alpha F+\frac12y\cdot\nabla F
=
\Delta F+F^p.
$$

左辺を右辺へ移し、$\alpha=1/(p-1)$ を代入すれば

$$
\Delta F
-
\frac12y\cdot\nabla F
-
\frac1{p-1}F
+
F^p
=
0.
$$
<!-- proof-end -->

定数 profile $F\equiv\kappa>0$ を代入すると

$$
-\frac1{p-1}\kappa+\kappa^p=0.
$$

従って

$$
\kappa^{p-1}
=
\frac1{p-1},
$$

すなわち

$$
\boxed{
\kappa
=
(p-1)^{-1/(p-1)}
}.
$$

このとき

$$
u(t,x)
=
\bigl((p-1)(T-t)\bigr)^{-1/(p-1)}
$$

となり、§5 の空間一様 ODE blow-up を再現します。

---

## 11. 三つの「臨界性」を混同しない

半線形熱方程式では「臨界」という言葉が複数の文脈で現れます。

### 11.1 方程式を不変にする振幅指数

$$
u_\lambda
=
\lambda^{2/(p-1)}
u(\lambda^2t,\lambda x).
$$

これは PDE 自体の scaling です。

### 11.2 初期値空間の臨界指数

$$
q_c
=
\frac{d(p-1)}2.
$$

これは $L^q$ ノルムが scaling で不変になる $q$ です。

### 11.3 Fujita 指数

$$
p_F
=
1+\frac2d.
$$

これは $q_c=1$、すなわち質量尺度が臨界になる反応指数です。そして単なる次元解析に留まらず、

- $p\le p_F$ では全ての非零非負 $L^1$ データが有限時間 blow-up、
- $p>p_F$ では小さい非零 global data が存在、

という実際の力学の境界になります。

この区別は Navier--Stokes のような別の非線形 PDE で「scale-critical norm」と「blow-up criterion」を比較するときにも重要です。

---

## 12. この章で分かったこと

半線形熱方程式では、存在・一意性を示すだけでは問題は終わりません。

- Duhamel 公式により PDE を熱半群上の固定点問題へ変えられる。
- $u^p$ は大域 Lipschitz でなくても、短時間の有界領域では contraction を作れる。
- 非負初期値の順序は Picard 反復を通じて保存される。
- 有限最大存在時間なら、壊れる量は $\|u(t)\|_\infty$ である。
- scaling から $q_c=d(p-1)/2$ が出る。
- $L^1$ が臨界になる条件から $p_F=1+2/d$ が出る。
- backward heat-kernel average は PDE を $F'\ge F^p$ へ落とし、blow-up を検出する。
- 劣臨界では冪の差、臨界では対数増幅が global existence を排除する。
- 超臨界では時間積分可能性 $d(p-1)/2>1$ が Gaussian supersolution を閉じる。
- blow-up 時刻に合わせた similarity variables では、発散問題が定常 profile 方程式へ変わる。

NPDE7 では時間の向きを反対にし、$t\to\infty$ で適切に正規化した解がどの profile へ近づくかを扱います。

---

# 演習

## Level A

<a id="ex-npde6-a01"></a>
### NPDE6-A01 空間一様 blow-up
- Level: A

$p>1$、$a>0$ とし、

$$
U'=U^p,
\qquad
U(0)=a
$$

を解け。有限 blow-up 時刻と blow-up rate を求めよ。

<!-- solution-start -->
#### 詳細解答

$U>0$ なので

$$
U^{-p}dU=dt.
$$

$0$ から $t$ まで積分すると

$$
\int_a^{U(t)}r^{-p}\,dr=t.
$$

$p\ne1$ なので

$$
\frac{U(t)^{1-p}-a^{1-p}}{1-p}
=
t.
$$

両辺に $1-p$ を掛けて

$$
U(t)^{1-p}
=
a^{1-p}
-
(p-1)t.
$$

従って

$$
\boxed{
U(t)
=
\left(
a^{1-p}-(p-1)t
\right)^{-1/(p-1)}
}.
$$

分母が0になる時刻は

$$
\boxed{
T
=
\frac{a^{1-p}}{p-1}
}.
$$

さらに

$$
a^{1-p}=(p-1)T
$$

なので

$$
U(t)
=
\bigl((p-1)(T-t)\bigr)^{-1/(p-1)}.
$$

従って blow-up rate は

$$
\boxed{
U(t)\asymp(T-t)^{-1/(p-1)}
}.
$$
<!-- solution-end -->

<a id="ex-npde6-a02"></a>
### NPDE6-A02 局所 Lipschitz 定数
- Level: A

$p>1$、$0\le a,b\le R$ とする。

$$
|a^p-b^p|
\le
pR^{p-1}|a-b|
$$

を示せ。この評価が局所存在証明のどこで使われるか説明せよ。

<!-- solution-start -->
#### 詳細解答

関数

$$
f(r)=r^p
$$

を $[0,R]$ で考えます。

導関数は

$$
f'(r)=pr^{p-1}.
$$

したがって

$$
0\le f'(r)\le pR^{p-1}.
$$

平均値の定理より、$a\ne b$ なら $a,b$ の間のある $\xi$ が存在して

$$
a^p-b^p
=
p\xi^{p-1}(a-b).
$$

絶対値を取り、

$$
|\xi|\le R
$$

を使えば

$$
\boxed{
|a^p-b^p|
\le
pR^{p-1}|a-b|
}.
$$

局所存在証明では Duhamel 写像の差

$$
\Phi u-\Phi v
$$

を評価するときに使います。具体的には

$$
\|\Phi u-\Phi v\|_{X_T}
\le
TpR^{p-1}\|u-v\|_{X_T}.
$$

従って

$$
TpR^{p-1}<1
$$

を選べば縮小写像になります。
<!-- solution-end -->

<a id="ex-npde6-a03"></a>
### NPDE6-A03 方程式の scaling
- Level: A

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^2t,\lambda x)
$$

とする。

1. $(u_\lambda)_t$ と $\Delta u_\lambda$ の倍率を求めよ。
2. $u_\lambda^p$ の倍率を求めよ。
3. 方程式不変条件から $\alpha$ を求めよ。

<!-- solution-start -->
#### 詳細解答

時間微分では $\lambda^2t$ の連鎖律から

$$
(u_\lambda)_t
=
\lambda^{\alpha+2}
u_t(\lambda^2t,\lambda x).
$$

空間微分は一回につき $\lambda$ が出るので

$$
\Delta u_\lambda
=
\lambda^{\alpha+2}
\Delta u(\lambda^2t,\lambda x).
$$

非線形項は

$$
u_\lambda^p
=
\lambda^{\alpha p}
u(\lambda^2t,\lambda x)^p.
$$

三項が同じ倍率を持つには

$$
\alpha+2=\alpha p.
$$

従って

$$
2=\alpha(p-1),
$$

したがって

$$
\boxed{
\alpha=\frac2{p-1}
}.
$$
<!-- solution-end -->

<a id="ex-npde6-a04"></a>
### NPDE6-A04 臨界 Lq 指数と Fujita 指数
- Level: A

1. 半線形熱方程式の scaling の下で $L^q$ ノルムが不変となる $q_c$ を求めよ。
2. $q_c=1$ として Fujita 指数を導け。
3. $d=4$ のとき $p_F$ を求めよ。

<!-- solution-start -->
#### 詳細解答

scaling は

$$
u_\lambda(0,x)
=
\lambda^{2/(p-1)}
u_0(\lambda x).
$$

したがって

$$
\|u_\lambda(0)\|_q
=
\lambda^{2/(p-1)-d/q}
\|u_0\|_q.
$$

尺度不変条件は

$$
\frac2{p-1}-\frac dq=0.
$$

従って

$$
\boxed{
q_c=\frac{d(p-1)}2
}.
$$

質量 $L^1$ が臨界になるには

$$
q_c=1,
$$

すなわち

$$
\frac{d(p-1)}2=1.
$$

よって

$$
\boxed{
p_F=1+\frac2d
}.
$$

$d=4$ なら

$$
p_F
=
1+\frac24
=
\boxed{\frac32}.
$$
<!-- solution-end -->

<a id="ex-npde6-a05"></a>
### NPDE6-A05 backward self-similar 定数 profile
- Level: A

profile 方程式

$$
\Delta F
-
\frac12y\cdot\nabla F
-
\frac1{p-1}F
+
F^p
=
0
$$

に定数 $F\equiv\kappa>0$ を代入し、$\kappa$ を求めよ。得られる $u(t,x)$ も書け。

<!-- solution-start -->
#### 詳細解答

$F$ が定数なら

$$
\nabla F=0,
\qquad
\Delta F=0.
$$

従って profile 方程式は

$$
-\frac1{p-1}\kappa+\kappa^p=0
$$

になります。

$\kappa>0$ なので $\kappa$ で割ると

$$
\kappa^{p-1}
=
\frac1{p-1}.
$$

よって

$$
\boxed{
\kappa
=
(p-1)^{-1/(p-1)}
}.
$$

backward self-similar 形へ代入すると

$$
u(t,x)
=
(T-t)^{-1/(p-1)}
(p-1)^{-1/(p-1)}.
$$

すなわち

$$
\boxed{
u(t,x)
=
\bigl((p-1)(T-t)\bigr)^{-1/(p-1)}
}.
$$

これは空間一様 ODE blow-up と一致します。
<!-- solution-end -->

## Level B

<a id="ex-npde6-b01"></a>
### NPDE6-B01 contraction の時間条件を作る
- Level: B

$M=\|u_0\|_\infty>0$、$R=2M$ とする。Duhamel 写像

$$
(\Phi u)(t)
=
S(t)u_0
+
\int_0^tS(t-s)u(s)^p\,ds
$$

を

$$
0\le u\le R
$$

の箱で考える。

1. $\Phi$ が箱を保つ十分条件を求めよ。
2. $\Phi$ が縮小写像になる十分条件を求めよ。
3. 両方を満たす具体的な $T>0$ を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

熱半群の $L^\infty$ 収縮性から

$$
\|\Phi u(t)\|_\infty
\le
M+TR^p.
$$

箱を保つには

$$
M+TR^p\le R
$$

で十分です。$R=2M$ なので

$$
TR^p\le M.
$$

従って

$$
T\le\frac{M}{R^p}
$$

が一つ目の条件です。

次に $0\le u,v\le R$ なら

$$
|u^p-v^p|
\le
pR^{p-1}|u-v|.
$$

よって

$$
\|\Phi u-\Phi v\|_{X_T}
\le
TpR^{p-1}\|u-v\|_{X_T}.
$$

縮小写像になるには

$$
TpR^{p-1}<1
$$

で十分です。

したがって例えば

$$
\boxed{
T
=
\frac12
\min\left\{
\frac{M}{R^p},
\frac1{pR^{p-1}}
\right\}
}
$$

と取れば、両方の条件を厳密に満たします。
<!-- solution-end -->

<a id="ex-npde6-b02"></a>
### NPDE6-B02 backward heat-kernel criterion
- Level: B

$u$ が $[0,T]$ まで存在する非負有界解とする。固定した $x_0$ に対し

$$
F(t)=S(T-t)u(t)(x_0)
$$

と置く。

1. $F'(t)=S(T-t)(u(t)^p)(x_0)$ を導け。
2. Jensen の不等式から $F'\ge F^p$ を示せ。
3. 初期値 $F(0)$ が満たす必要条件を導け。

<!-- solution-start -->
#### 詳細解答

$S(r)$ の時間変数 $r$ について

$$
\frac{d}{dr}S(r)f
=
\Delta S(r)f
$$

です。ここでは $r=T-t$ なので

$$
\frac{d}{dt}S(T-t)f
=
-\Delta S(T-t)f.
$$

従って

$$
\begin{aligned}
F'(t)
&=
-\Delta S(T-t)u(t)(x_0)
+
S(T-t)u_t(t)(x_0)\\
&=
S(T-t)(u_t-\Delta u)(t)(x_0)\\
&=
S(T-t)(u(t)^p)(x_0).
\end{aligned}
$$

熱核は非負で全質量1なので $S(T-t)$ は平均です。$r\mapsto r^p$ の凸性から Jensen の不等式を使うと

$$
S(T-t)(u^p)(x_0)
\ge
\left(S(T-t)u(x_0)\right)^p
=
F(t)^p.
$$

よって

$$
F'\ge F^p.
$$

次に

$$
\frac{d}{dt}F^{1-p}
=
(1-p)F^{-p}F'
\le
1-p.
$$

$0$ から $t$ まで積分して

$$
F(t)^{1-p}
\le
F(0)^{1-p}-(p-1)t.
$$

$t\uparrow T$ まで有界に存在するには右辺が負になれないので

$$
F(0)^{1-p}\ge(p-1)T.
$$

従って

$$
\boxed{
F(0)
\le
((p-1)T)^{-1/(p-1)}
}.
$$

$F(0)=S(T)u_0(x_0)$ なので本文の必要条件を得ます。
<!-- solution-end -->

<a id="ex-npde6-b03"></a>
### NPDE6-B03 劣臨界 Fujita blow-up
- Level: B

$u_0\in BUC\cap L^1$、$u_0\ge0$、$u_0\not\equiv0$ とする。$1<p<1+2/d$ のとき global solution が存在しないことを、backward heat-kernel criterion から示せ。

<!-- solution-start -->
#### 詳細解答

$u_0$ は非負かつ非零なので、ある $R>0$ に対し

$$
M_R
=
\int_{B_R}u_0(y)\,dy
>0
$$

です。

$T\ge R^2$ なら $|y|\le R$ で

$$
\exp\left(-\frac{|y|^2}{4T}\right)
\ge
e^{-1/4}.
$$

従って

$$
\begin{aligned}
S(T)u_0(0)
&\ge
\int_{B_R}
(4\pi T)^{-d/2}
e^{-|y|^2/(4T)}
u_0(y)\,dy\\
&\ge
c_dM_RT^{-d/2}.
\end{aligned}
$$

global solution が存在するなら、任意の $T$ に backward heat-kernel criterion を適用できるので

$$
c_dM_RT^{-d/2}
\le
C_pT^{-1/(p-1)}.
$$

両辺へ $T^{d/2}$ を掛けると

$$
c_dM_R
\le
C_pT^{d/2-1/(p-1)}.
$$

仮定

$$
p<1+\frac2d
$$

は

$$
\frac1{p-1}>\frac d2
$$

と同値なので、右辺の指数は負です。従って $T\to\infty$ で右辺は0へ収束します。

左辺は正の定数なので矛盾です。したがって global solution は存在せず、

$$
T_{\max}<\infty.
$$

blow-up alternative から

$$
\|u(t)\|_\infty\to\infty
$$

も従います。
<!-- solution-end -->

<a id="ex-npde6-b04"></a>
### NPDE6-B04 supercritical Gaussian barrier
- Level: B

$$
a=\frac{d(p-1)}2>1
$$

とする。

1. 次の恒等式を示せ。
   $$
   G_r(x)^p
   =
   p^{-d/2}(4\pi r)^{-a}G_{r/p}(x).
   $$
2. $b=t-s+(s+\tau)/p$ と置き、
   $$
   G_b(x)\le p^{d/2}G_{t+\tau}(x)
   $$
   を示せ。
3. なぜ $a>1$ が global Gaussian barrier の構成に必要か説明せよ。

<!-- solution-start -->
#### 詳細解答

熱核は

$$
G_r(x)
=
(4\pi r)^{-d/2}
e^{-|x|^2/(4r)}
$$

です。従って

$$
G_r(x)^p
=
(4\pi r)^{-dp/2}
e^{-p|x|^2/(4r)}.
$$

一方

$$
G_{r/p}(x)
=
(4\pi r/p)^{-d/2}
e^{-p|x|^2/(4r)}
=
p^{d/2}(4\pi r)^{-d/2}
e^{-p|x|^2/(4r)}.
$$

よって

$$
p^{-d/2}(4\pi r)^{-d(p-1)/2}
G_{r/p}(x)
=
G_r(x)^p.
$$

$a=d(p-1)/2$ なので

$$
\boxed{
G_r^p
=
p^{-d/2}(4\pi r)^{-a}G_{r/p}
}.
$$

次に

$$
b=t-s+\frac{s+\tau}{p}.
$$

計算すると

$$
b-\frac{t+\tau}{p}
=
\left(1-\frac1p\right)(t-s)
\ge0,
$$

また

$$
t+\tau-b
=
\left(1-\frac1p\right)(s+\tau)
\ge0.
$$

従って

$$
\frac{t+\tau}{p}\le b\le t+\tau.
$$

$R=t+\tau$ と書くと

$$
\frac{G_b(x)}{G_R(x)}
=
\left(\frac Rb\right)^{d/2}
\exp\left[
-\frac{|x|^2}{4}
\left(
\frac1b-\frac1R
\right)
\right].
$$

$b\le R$ なので指数関数部分は1以下です。また $b\ge R/p$ なので

$$
\left(\frac Rb\right)^{d/2}
\le
p^{d/2}.
$$

よって

$$
\boxed{
G_b(x)\le p^{d/2}G_R(x)
}.
$$

最後に barrier の Duhamel 項では

$$
\int_0^\infty(s+\tau)^{-a}\,ds
$$

が現れます。これは

$$
a>1
$$

のときに限って有限です。実際、

$$
\int_0^\infty(s+\tau)^{-a}\,ds
=
\frac{\tau^{1-a}}{a-1}.
$$

したがって

$$
a>1
\Longleftrightarrow
p>1+\frac2d
$$

が、非線形寄与を全時間で有限に抑える条件そのものになっています。
<!-- solution-end -->

## Level C

<a id="ex-npde6-c01"></a>
### NPDE6-C01 臨界 Fujita blow-up の対数矛盾
- Level: C

$d\ge1$、

$$
p=1+\frac2d
$$

とする。$u_0\in BUC\cap L^1$、$u_0\ge0$、$u_0\not\equiv0$ とし、global nonnegative mild solution が存在すると仮定する。

1. ある $R>0$ と $M_R>0$ を選び、$s\ge R^2$、$|y|\le\sqrt s$ で
   $$
   u(s,y)\ge c_0s^{-d/2}
   $$
   を示せ。
2. $S(t)u(t)(0)$ の Duhamel 表示から
   $$
   S(t)u(t)(0)
   \ge
   c\,t^{-d/2}
   \log(t/s_0)
   $$
   を導け。
3. 時刻 $t$ からさらに時間 $t$ だけ解が存在することへ backward heat-kernel criterion を適用し、矛盾を完成せよ。

<!-- solution-start -->
#### 詳細解答

まず $u_0\ge0$ かつ非零なので、ある $R>0$ に対して

$$
M_R
=
\int_{B_R}u_0(z)\,dz
>0
$$

です。

Duhamel 式の非線形項は非負なので

$$
u(s,y)\ge S(s)u_0(y).
$$

$s\ge R^2$、$|y|\le\sqrt s$、$|z|\le R$ なら

$$
|y-z|
\le
|y|+|z|
\le
\sqrt s+R
\le
2\sqrt s.
$$

従って

$$
\exp\left(
-\frac{|y-z|^2}{4s}
\right)
\ge
e^{-1}.
$$

よって

$$
\begin{aligned}
u(s,y)
&\ge
\int_{B_R}
(4\pi s)^{-d/2}
e^{-|y-z|^2/(4s)}
u_0(z)\,dz\\
&\ge
(4\pi)^{-d/2}e^{-1}M_R
s^{-d/2}.
\end{aligned}
$$

したがって

$$
\boxed{
u(s,y)\ge c_0s^{-d/2}
}
$$

です。

次に時刻 $t$ の Duhamel 式は

$$
u(t)
=
S(t)u_0
+
\int_0^tS(t-s)u(s)^p\,ds.
$$

両辺へ $S(t)$ を作用させ、半群性を使うと

$$
S(t)u(t)
=
S(2t)u_0
+
\int_0^tS(2t-s)u(s)^p\,ds.
$$

非負項を捨て、$s_0\le s\le t$、$|y|\le\sqrt s$ の領域だけ積分します。ここで $s_0\ge R^2$ を固定します。

この範囲では

$$
t\le2t-s\le2t
$$

かつ

$$
|y|^2\le s\le t.
$$

したがって熱核について

$$
G_{2t-s}(y)
\ge
c_1t^{-d/2}
$$

となる $c_1>0$ があります。

よって

$$
\begin{aligned}
S(t)u(t)(0)
&\ge
c_1t^{-d/2}
\int_{s_0}^t
\int_{|y|\le\sqrt s}
u(s,y)^p\,dy\,ds\\
&\ge
c_2t^{-d/2}
\int_{s_0}^t
s^{-dp/2}
|B_{\sqrt s}|\,ds.
\end{aligned}
$$

$|B_{\sqrt s}|=\omega_ds^{d/2}$ なので

$$
S(t)u(t)(0)
\ge
c_3t^{-d/2}
\int_{s_0}^t
s^{-d(p-1)/2}\,ds.
$$

臨界指数では

$$
p-1=\frac2d,
$$

従って

$$
\frac{d(p-1)}2=1.
$$

したがって

$$
\boxed{
S(t)u(t)(0)
\ge
c_3t^{-d/2}
\log\frac{t}{s_0}
}.
$$

最後に global solution なので、時刻 $t$ を新しい初期時刻として、その先の区間 $[t,2t]$ にも解が存在します。

backward heat-kernel criterion を初期データ $u(t)$、時間幅 $t$、観測点0へ適用すると

$$
S(t)u(t)(0)
\le
((p-1)t)^{-1/(p-1)}.
$$

臨界では

$$
\frac1{p-1}=\frac d2
$$

なので

$$
S(t)u(t)(0)
\le
C_pt^{-d/2}.
$$

二つの評価を合わせると

$$
c_3t^{-d/2}
\log\frac{t}{s_0}
\le
C_pt^{-d/2}.
$$

$t^{-d/2}>0$ を消して

$$
c_3\log\frac{t}{s_0}
\le
C_p.
$$

しかし左辺は $t\to\infty$ で無限大へ発散します。矛盾です。

従って臨界の場合にも global nonnegative mild solution は存在せず、

$$
T_{\max}<\infty.
$$

さらに blow-up alternative から

$$
\boxed{
\|u(t)\|_\infty\to\infty
\qquad
(t\uparrow T_{\max})
}
$$

が従います。
<!-- solution-end -->
