# HJC3 HJB と value function の粘性解特徴付け

<!-- definition-example-audit: strict -->

HJC1 では、最適制御問題から [dynamic programming principle](../HJC1/index.md#thm-hjc1-dpp) を作り、value function が滑らかなら

$$
V_t+\mathcal H(x,\nabla V)=0
$$

を満たすことを導きました。

HJC2 では、解そのものが微分できなくても、上または下から接する smooth test function を使って PDE を読む [粘性解](../HJC2/index.md#def-hjc2-viscosity-solution) を導入しました。

残っている問いは一つです。

> 実際の最適制御問題から定まる value function は、滑らかでなくても HJB の粘性解になるのか。さらに、その粘性解は value function 以外に存在しないのか。

本章ではこの橋を閉じます。

$$
\boxed{
\text{DPP}
\Longrightarrow
\text{value function は HJB の粘性解}
\Longrightarrow
\text{comparison により一意}
}
$$

したがって、固定した制御問題の中では

$$
\boxed{
\text{dynamic programming}
\Longleftrightarrow
\text{HJB による value characterization}
}
$$

と読めるようになります。

ここで一つだけ符号を丁寧に整理します。HJC1 の

$$
\mathcal H(x,p)
=
\inf_{a\in U}
\{L(x,a)+f(x,a)\cdot p\}
$$

を使う古典方程式

$$
V_t+\mathcal H(x,\nabla V)=0
$$

は、次の backward Bellman 形と同じ等式です。

$$
\boxed{
-V_t+\mathcal B(x,\nabla V)=0,
\qquad
\mathcal B(x,p)
=
\sup_{a\in U}
\{-L(x,a)-f(x,a)\cdot p\}
=
-\mathcal H(x,p)
}
$$

終端最小化問題を粘性解として扱うときは、この backward Bellman 形を使うと subsolution / supersolution の向きが DPP とそのまま一致します。

---

## 1. 本章で固定する制御問題と十分条件

HJC1 と同じ有限時間問題

$$
\dot X(s)
=
f(X(s),u(s)),
\qquad
X(t)=x,
$$

$$
J_{t,x}(u)
=
g(X(T))
+
\int_t^T
L(X(s),u(s))\,ds,
$$

$$
V(t,x)
=
\inf_{u\in\mathcal U[t,T]}
J_{t,x}(u)
$$

を考えます。

本章では証明を途中で技術条件へ散らさないため、次の十分条件を章全体で固定します。

- 制御値集合 $U\subset\mathbb R^m$ はコンパクト。
- $f:\mathbb R^d\times U\to\mathbb R^d$ は連続。
- ある $M_f,K_f\ge0$ が存在し、全ての $x,y,a$ について
  $$
  |f(x,a)|\le M_f,
  $$
  $$
  |f(x,a)-f(y,a)|
  \le
  K_f|x-y|.
  $$
- $L:\mathbb R^d\times U\to\mathbb R$ は連続。
- ある $M_L,K_L\ge0$ が存在し、
  $$
  |L(x,a)|\le M_L,
  $$
  $$
  |L(x,a)-L(y,a)|
  \le
  K_L|x-y|.
  $$
- $g:\mathbb R^d\to\mathbb R$ は bounded Lipschitz。すなわち、ある $M_g,K_g\ge0$ に対して
  $$
  |g(x)|\le M_g,
  $$
  $$
  |g(x)-g(y)|
  \le
  K_g|x-y|.
  $$

許容制御は HJC1 と同じく $U$ 値 piecewise continuous 関数とします。

これらは最も一般的な仮定ではありません。本章の目的は、

$$
\text{連続性}
\to
\text{粘性 sub / super}
\to
\text{comparison}
$$

を紙上で再構成できるようにすることなので、各段階を一つの Lipschitz 枠内で閉じます。

$f$ が $x$ について global Lipschitz なので、固定した制御に対する軌道は一意です。また $|f|\le M_f$ から

$$
|X(s)-x|
\le
M_f(s-t)
$$

が直ちに従います。

これは短時間 $h$ で軌道が接触点の近傍から飛び出さないことを保証します。

---

## 2. backward Bellman 形で粘性不等式を読む

HJC2 の粘性解では、一般に PDE 左辺を $F=0$ と書き、

- 上から接する test function では $F\le0$、
- 下から接する test function では $F\ge0$

と読みました。

本章では

$$
F(t,x,q,p)
=
-q+\mathcal B(x,p)
$$

と置きます。

したがって、連続関数 $W$ が

$$
-W_t+\mathcal B(x,\nabla W)=0
$$

の viscosity subsolution であるとは、$W-\phi$ が内点 $(t_0,x_0)$ で局所最大を取るたびに

$$
\boxed{
-\phi_t(t_0,x_0)
+
\mathcal B(x_0,\nabla\phi(t_0,x_0))
\le0
}
$$

が成り立つことです。

supersolution では局所最小に対して

$$
\boxed{
-\phi_t(t_0,x_0)
+
\mathcal B(x_0,\nabla\phi(t_0,x_0))
\ge0
}
$$

を要求します。

$\mathcal B=-\mathcal H$ なので、古典的に微分できる場合は

$$
-V_t+\mathcal B=0
$$

と

$$
V_t+\mathcal H=0
$$

は同じ等式です。

違いは、非滑らかな点でどちらの不等式を上接触・下接触へ割り当てるかを、終端最小化問題に合わせて固定したことです。

### HJC1 の bang-bang 例で符号を確認する

$$
\dot X=u,
\qquad
|u|\le1,
\qquad
L\equiv0
$$

では

$$
\mathcal H(p)
=
\inf_{|a|\le1}ap
=
-|p|.
$$

従って

$$
\mathcal B(p)=|p|.
$$

HJB は backward Bellman 形で

$$
\boxed{
-V_t+|V_x|=0
}
$$

です。

HJC1 の value function

$$
V(t,x)
=
\max\{|x|-(T-t),0\}
$$

を右側切替境界

$$
x=T-t
$$

で見ます。

近傍で

$$
s=x+t-T
$$

と置けば

$$
V=\max\{s,0\}.
$$

これは凸な折れ方なので $C^1$ の上接触関数は存在せず、subsolution 条件は自動的に満たされます。

下から接する test function の $s$ 方向微分を $a$ とすると

$$
0\le a\le1.
$$

さらに

$$
\phi_t=a,
\qquad
\phi_x=a.
$$

したがって

$$
-\phi_t+|\phi_x|
=
-a+|a|
=
0.
$$

よって supersolution 条件も成り立ちます。

この例で、backward Bellman 形が HJC1 の非滑らかな value function と同じ向きを持つことが確認できます。

---

## 3. まず value function が連続であることを証明する

粘性解の特徴付けを述べる前に、value function が bounded uniformly continuous であることを閉じます。

同じ制御 $u$ を、初期値 $x$ と $y$ から走らせます。

軌道を

$$
X_x(s)=X^{t,x;u}(s),
\qquad
X_y(s)=X^{t,y;u}(s)
$$

とします。

差を取ると

$$
X_x(s)-X_y(s)
=
x-y
+
\int_t^s
\{
f(X_x(r),u(r))
-
f(X_y(r),u(r))
\}
\,dr.
$$

従って

$$
|X_x(s)-X_y(s)|
\le
|x-y|
+
K_f
\int_t^s
|X_x(r)-X_y(r)|\,dr.
$$

ここで

$$
F(s)
=
|x-y|
+
K_f
\int_t^s
|X_x(r)-X_y(r)|\,dr
$$

と置くと

$$
|X_x(s)-X_y(s)|\le F(s)
$$

かつ、ほとんど全ての $s$ で

$$
F'(s)
\le
K_fF(s).
$$

したがって

$$
\frac d{ds}
\{e^{-K_f(s-t)}F(s)\}
\le0.
$$

積分すると

$$
F(s)
\le
e^{K_f(s-t)}F(t)
=
e^{K_f(s-t)}|x-y|.
$$

よって

$$
\boxed{
|X_x(s)-X_y(s)|
\le
e^{K_f(s-t)}|x-y|
}.
$$

この軌道評価をそのまま費用へ入れます。

$$
\begin{aligned}
|J_{t,x}(u)-J_{t,y}(u)|
&\le
K_g|X_x(T)-X_y(T)|\\
&\quad+
K_L
\int_t^T
|X_x(s)-X_y(s)|\,ds.
\end{aligned}
$$

上の評価から

$$
|J_{t,x}(u)-J_{t,y}(u)|
\le
C_x|x-y|,
$$

ただし例えば

$$
C_x
=
K_g e^{K_fT}
+
K_LT e^{K_fT}
$$

と取れます。

この定数は制御 $u$ に依存しません。

infimum を取っても Lipschitz 定数は保たれます。実際、任意の $u$ について

$$
J_{t,x}(u)
\le
J_{t,y}(u)+C_x|x-y|
$$

なので、両辺で $u$ の infimum を取れば

$$
V(t,x)
\le
V(t,y)+C_x|x-y|.
$$

$x,y$ を交換すると

$$
\boxed{
|V(t,x)-V(t,y)|
\le
C_x|x-y|
}.
$$

次に時間方向です。

$t<s$ とし、DPP を $[t,s]$ で切ります。

任意の短時間制御に対して

$$
|X(s)-x|
\le
M_f(s-t).
$$

また

$$
\left|
\int_t^s
L(X(r),u(r))\,dr
\right|
\le
M_L(s-t).
$$

DPP と空間 Lipschitz 性から

$$
V(t,x)
\le
V(s,x)
+
\{M_L+C_xM_f\}(s-t).
$$

逆向きも、DPP の右辺の任意の項について

$$
V(s,X(s))
\ge
V(s,x)-C_xM_f(s-t)
$$

を使えば

$$
V(t,x)
\ge
V(s,x)
-
\{M_L+C_xM_f\}(s-t).
$$

従って

$$
\boxed{
|V(t,x)-V(s,x)|
\le
C_t|t-s|,
\qquad
C_t=M_L+C_xM_f
}.
$$

最後に

$$
|J_{t,x}(u)|
\le
M_g+TM_L
$$

なので

$$
|V(t,x)|
\le
M_g+TM_L.
$$

<a id="thm-hjc3-value-regularity"></a>
<!-- formal-statement-start -->
### 定理（value function の bounded Lipschitz regularity）

§1 の standing assumptions の下で、value function $V$ は $[0,T]\times\mathbb R^d$ 上 bounded であり、ある定数 $C_x,C_t$ が存在して

$$
|V(t,x)-V(t,y)|
\le
C_x|x-y|,
$$

$$
|V(t,x)-V(s,x)|
\le
C_t|t-s|
$$

を満たす。

特に $V$ は bounded uniformly continuous である。
<!-- formal-statement-end -->

この正則性は後で二つの役割を持ちます。

1. 粘性解の terminal condition を連続に満たす。
2. comparison theorem の関数クラスへ value function を入れる。

---

## 4. DPP から viscosity subsolution を出す

ここからが本章の中心です。

$V-\phi$ が内点

$$
(t_0,x_0)
\in
(0,T)\times\mathbb R^d
$$

で局所最大を取るとします。

定数を足して

$$
V(t_0,x_0)=\phi(t_0,x_0)
$$

かつ近傍で

$$
V\le\phi
$$

としてよいです。

subsolution で示したいのは

$$
-\phi_t(t_0,x_0)
+
\mathcal B(x_0,\nabla\phi(t_0,x_0))
\le0.
$$

制御値 $a\in U$ を任意に固定し、最初の短時間だけ

$$
u(s)\equiv a
$$

とします。

対応する軌道を $X_a$ と書きます。

DPP の infimum はこの定数制御を選んだ値以下なので

$$
V(t_0,x_0)
\le
\int_{t_0}^{t_0+h}
L(X_a(s),a)\,ds
+
V(t_0+h,X_a(t_0+h)).
$$

$|f|\le M_f$ なので $h$ を十分小さくすれば軌道は接触近傍に残ります。

したがって

$$
V(t_0+h,X_a(t_0+h))
\le
\phi(t_0+h,X_a(t_0+h)).
$$

接触点で $V=\phi$ だから

$$
0
\le
\int_{t_0}^{t_0+h}
L(X_a(s),a)\,ds
+
\phi(t_0+h,X_a(t_0+h))
-
\phi(t_0,x_0).
$$

最後の差は軌道上の連鎖律で

$$
\begin{aligned}
&\phi(t_0+h,X_a(t_0+h))
-\phi(t_0,x_0)\\
&=
\int_{t_0}^{t_0+h}
\{
\phi_t(s,X_a(s))
+
\nabla\phi(s,X_a(s))
\cdot
f(X_a(s),a)
\}
\,ds.
\end{aligned}
$$

従って

$$
\begin{aligned}
0
\le
\frac1h
\int_{t_0}^{t_0+h}
\{
&L(X_a(s),a)
+\phi_t(s,X_a(s))\\
&+
\nabla\phi(s,X_a(s))
\cdot
f(X_a(s),a)
\}
\,ds.
\end{aligned}
$$

$h\downarrow0$ とすると、連続性から

$$
0
\le
L(x_0,a)
+
\phi_t(t_0,x_0)
+
f(x_0,a)\cdot\nabla\phi(t_0,x_0).
$$

$a$ は任意なので全ての $a\in U$ について

$$
-\phi_t
-L(x_0,a)
-f(x_0,a)\cdot\nabla\phi
\le0.
$$

左辺の $a$ に関する supremum を取れば

$$
-\phi_t
+
\mathcal B(x_0,\nabla\phi)
\le0.
$$

<a id="prop-hjc3-viscosity-sub"></a>
<!-- formal-statement-start -->
### 命題（DPP から viscosity subsolution）

§1 の standing assumptions の下で、value function $V$ は

$$
-V_t+\mathcal B(x,\nabla V)=0
$$

の viscosity subsolution である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で示した通り、任意の上接触 test function $\phi$ と任意の定数制御 $a$ に対して

$$
\phi_t
+
L(x_0,a)
+
f(x_0,a)\cdot\nabla\phi
\ge0
$$

を得る。

符号を反転し、$a$ に関する supremum を取ると

$$
-\phi_t
+
\sup_{a\in U}
\{-L(x_0,a)-f(x_0,a)\cdot\nabla\phi\}
\le0.
$$

supremum は $\mathcal B$ の定義そのものなので

$$
-\phi_t
+
\mathcal B(x_0,\nabla\phi)
\le0.
$$

従って $V$ は viscosity subsolution である。$\square$
<!-- proof-end -->

ここでは最適制御を使っていません。

$$
\boxed{
\text{任意の短時間制御を試せる}
}
$$

ことだけで subsolution 側が出ます。

---

## 5. supersolution 側では「近似最適」を使う

今度は $V-\phi$ が $(t_0,x_0)$ で局所最小を取るとします。

正規化して

$$
V(t_0,x_0)=\phi(t_0,x_0),
$$

近傍で

$$
V\ge\phi
$$

とします。

示したいのは

$$
-\phi_t
+
\mathcal B(x_0,\nabla\phi)
\ge0.
$$

これは

$$
\phi_t
+
\mathcal H(x_0,\nabla\phi)
\le0
$$

と同値です。

subsolution 側では任意の定数制御で十分でした。

supersolution 側では逆に、DPP の infimum に近い制御を一つ選びます。

最適制御が存在するとは仮定しません。

DPP の infimum の定義から、各 $h>0$ に対して短時間制御

$$
u_h\in\mathcal U[t_0,t_0+h]
$$

を

$$
\begin{aligned}
&\int_{t_0}^{t_0+h}
L(X_h(s),u_h(s))\,ds\\
&\quad+
V(t_0+h,X_h(t_0+h))
\le
V(t_0,x_0)+h^2
\end{aligned}
$$

となるように選べます。

ここで

$$
X_h(s)
=
X^{t_0,x_0;u_h}(s).
$$

$|f|\le M_f$ より軌道は接触近傍に残るので

$$
V(t_0+h,X_h(t_0+h))
\ge
\phi(t_0+h,X_h(t_0+h)).
$$

従って

$$
\begin{aligned}
&\int_{t_0}^{t_0+h}
L(X_h(s),u_h(s))\,ds\\
&\quad+
\phi(t_0+h,X_h(t_0+h))
-
\phi(t_0,x_0)
\le
h^2.
\end{aligned}
$$

連鎖律を使うと

$$
\begin{aligned}
\frac1h
\int_{t_0}^{t_0+h}
\{
&\phi_t(s,X_h(s))
+
L(X_h(s),u_h(s))\\
&+
\nabla\phi(s,X_h(s))
\cdot
f(X_h(s),u_h(s))
\}
\,ds
\le h.
\end{aligned}
$$

ここで

$$
p_0=\nabla\phi(t_0,x_0)
$$

と置きます。

$U$ はコンパクトで、$f,L$ は $(x,a)$ について連続、$\phi_t,\nabla\phi$ は連続です。

さらに

$$
|X_h(s)-x_0|
\le
M_fh.
$$

従って $a\in U$ に一様に

$$
\begin{aligned}
&\phi_t(s,X_h(s))
+
L(X_h(s),a)
+
\nabla\phi(s,X_h(s))\cdot f(X_h(s),a)\\
&=
\phi_t(t_0,x_0)
+
L(x_0,a)
+
p_0\cdot f(x_0,a)
+
o(1)
\end{aligned}
$$

です。

よって積分内の値は

$$
\phi_t(t_0,x_0)
+
\inf_{a\in U}
\{L(x_0,a)+f(x_0,a)\cdot p_0\}
+
o(1)
$$

以上です。

つまり

$$
\phi_t(t_0,x_0)
+
\mathcal H(x_0,p_0)
+
o(1)
\le h.
$$

$h\downarrow0$ とすると

$$
\phi_t(t_0,x_0)
+
\mathcal H(x_0,p_0)
\le0.
$$

$\mathcal B=-\mathcal H$ なので

$$
-\phi_t(t_0,x_0)
+
\mathcal B(x_0,p_0)
\ge0.
$$

<a id="prop-hjc3-viscosity-super"></a>
<!-- formal-statement-start -->
### 命題（DPP から viscosity supersolution）

§1 の standing assumptions の下で、value function $V$ は

$$
-V_t+\mathcal B(x,\nabla V)=0
$$

の viscosity supersolution である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $h$ で DPP の infimum から $h^2$ 以内の短時間制御 $u_h$ を選ぶ。

下接触条件 $V\ge\phi$ と軌道上の連鎖律を使うと

$$
\frac1h
\int_{t_0}^{t_0+h}
\{
\phi_t+L+\nabla\phi\cdot f
\}
\,ds
\le h.
$$

短時間では $X_h(s)\to x_0$ が $s$ と制御に一様であり、$U$ のコンパクト性により $f,L$ の連続性も制御値について一様に使える。

従って

$$
\phi_t(t_0,x_0)
+
\mathcal H(x_0,\nabla\phi(t_0,x_0))
\le0.
$$

$\mathcal B=-\mathcal H$ から

$$
-\phi_t(t_0,x_0)
+
\mathcal B(x_0,\nabla\phi(t_0,x_0))
\ge0.
$$

よって $V$ は viscosity supersolution である。$\square$
<!-- proof-end -->

この証明で重要なのは

$$
\boxed{
\text{最適制御の存在}
\neq
\text{infimum に任意精度で近づけること}
}
$$

です。

supersolution を出すだけなら後者で足ります。

---

## 6. terminal condition を合わせれば value function は粘性解になる

終端時刻 $T$ では積分区間が空なので

$$
J_{T,x}(u)=g(x).
$$

従って制御の選択によらず

$$
\boxed{
V(T,x)=g(x)
}.
$$

§3 で $V$ の連続性を示し、§4 と §5 で subsolution / supersolution の両方を示しました。

したがって

$$
V
$$

は終端値問題

$$
-V_t+\mathcal B(x,\nabla V)=0,
\qquad
V(T,x)=g(x)
$$

の viscosity solution です。

ただし、まだ

$$
\text{「その粘性解が一つしかない」}
$$

ことは示していません。

そのために comparison を確認します。

---

## 7. Bellman Hamiltonian は comparison の構造条件を満たす

HJC2 の [comparison proof](../HJC2/index.md#thm-hjc2-comparison) では、Hamiltonian に

$$
p\text{ 方向の global Lipschitz 性}
$$

と

$$
x\text{ 方向の }(1+|p|)\text{ 型 Lipschitz 評価}
$$

を使いました。

本章の

$$
\mathcal B(x,p)
=
\sup_{a\in U}
\{-L(x,a)-f(x,a)\cdot p\}
$$

について、その二条件を直接確認します。

まず

$$
\begin{aligned}
|\mathcal B(x,p)-\mathcal B(x,q)|
&\le
\sup_{a\in U}
|f(x,a)\cdot(p-q)|\\
&\le
M_f|p-q|.
\end{aligned}
$$

次に

$$
\begin{aligned}
|\mathcal B(x,p)-\mathcal B(y,p)|
&\le
\sup_{a\in U}
\{
|L(x,a)-L(y,a)|\\
&\qquad+
|f(x,a)-f(y,a)|\,|p|
\}\\
&\le
\{K_L+K_f|p|\}|x-y|.
\end{aligned}
$$

従って

$$
|\mathcal B(x,p)-\mathcal B(y,p)|
\le
L_B|x-y|(1+|p|)
$$

とできます。例えば

$$
L_B=\max\{K_L,K_f\}
$$

の定数倍を取れば十分です。

これで HJC2 の doubling argument に必要だった Hamiltonian 側の評価がそろいました。

残る違いは、本章の PDE が

$$
-V_t+\mathcal B=0
$$

という backward form であることだけです。

---

## 8. backward comparison は時間反転して証明する

$u$ を backward HJB の subsolution、$v$ を supersolution とし、

$$
u(T,x)\le v(T,x)
$$

とします。

時間を

$$
s=T-t
$$

で反転し、

$$
\widetilde u(s,x)=u(T-s,x),
$$

$$
\widetilde v(s,x)=v(T-s,x)
$$

と置きます。

$\psi$ が $\widetilde u$ へ上から接するとき、

$$
\phi(t,x)=\psi(T-t,x)
$$

は $u$ へ上から接します。

しかも

$$
\phi_t=-\psi_s.
$$

したがって

$$
-\phi_t+\mathcal B(x,\nabla\phi)\le0
$$

は

$$
\psi_s+\mathcal B(x,\nabla\psi)\le0
$$

へ変わります。

つまり $\widetilde u$ は forward equation

$$
w_s+\mathcal B(x,\nabla w)=0
$$

の subsolution です。

同様に $\widetilde v$ は supersolution であり、終端順序は初期順序

$$
\widetilde u(0,x)\le\widetilde v(0,x)
$$

になります。

ここで initial-value comparison を証明します。

背理法で、ある $(s_*,x_*)$ において

$$
\widetilde u(s_*,x_*)
-
\widetilde v(s_*,x_*)
>0
$$

とします。

小さい $\eta>0$ を取り、

$$
\widetilde u^\eta(s,x)
=
\widetilde u(s,x)-\eta s
$$

としても正の差が残るようにします。

$\widetilde u^\eta$ へ test function $\psi$ が上から接すると、

$$
\psi(s,x)+\eta s
$$

は $\widetilde u$ へ上から接します。

従って

$$
\psi_s+\eta+\mathcal B(x,\nabla\psi)\le0,
$$

すなわち

$$
\boxed{
\psi_s+\mathcal B(x,\nabla\psi)\le-\eta
}
$$

です。

固定された strict gap $-\eta$ ができました。

HJC2 と同じように

$$
\begin{aligned}
\Phi(s,r,x,y)
&=
\widetilde u^\eta(s,x)
-
\widetilde v(r,y)\\
&\quad-
\frac{|s-r|^2}{2\delta}
-
\frac{|x-y|^2}{2\varepsilon}\\
&\quad-
\alpha(|x|^2+|y|^2)
\end{aligned}
$$

を最大化します。

$\alpha>0$ が空間無限遠への逃走を防ぎます。

正の差を持つ候補 $(s_*,s_*,x_*,x_*)$ があるので、$\varepsilon,\delta,\alpha$ を十分小さくすれば最大値は正です。

さらに initial data では

$$
\widetilde u^\eta(0,x)
\le
\widetilde v(0,x).
$$

$\widetilde u^\eta,\widetilde v$ の一様連続性と時間罰則により、$\delta\downarrow0$ では正の最大点を $s=0$ または $r=0$ に置くことはできません。

従って最大点

$$
(\hat s,\hat r,\hat x,\hat y)
$$

は時間内点に取れます。

subsolution 側の test function の微分は

$$
a
=
\frac{\hat s-\hat r}{\delta},
$$

$$
p_u
=
\frac{\hat x-\hat y}{\varepsilon}
+
2\alpha\hat x.
$$

supersolution 側では時間微分が同じ

$$
a
=
\frac{\hat s-\hat r}{\delta},
$$

空間勾配が

$$
p_v
=
\frac{\hat x-\hat y}{\varepsilon}
-
2\alpha\hat y
$$

です。

strict subsolution 性と supersolution 性から

$$
a+\mathcal B(\hat x,p_u)
\le
-\eta,
$$

$$
a+\mathcal B(\hat y,p_v)
\ge
0.
$$

引き算すると

$$
\boxed{
\eta
\le
\mathcal B(\hat y,p_v)
-
\mathcal B(\hat x,p_u)
}.
$$

HJC2 の doubling estimate と同様に、最大性から

$$
|\hat x-\hat y|\to0,
$$

$$
\frac{|\hat x-\hat y|^2}{\varepsilon}\to0,
$$

さらに

$$
\alpha|\hat x|\to0,
\qquad
\alpha|\hat y|\to0
$$

です。

§7 の二つの Lipschitz 評価を使うと右辺は

$$
\begin{aligned}
&\mathcal B(\hat y,p_v)
-
\mathcal B(\hat x,p_u)\\
&\le
M_f\,2\alpha(|\hat x|+|\hat y|)\\
&\quad+
L_B|\hat x-\hat y|
\left(
1+\frac{|\hat x-\hat y|}{\varepsilon}
\right)
\end{aligned}
$$

で抑えられます。

まず $\varepsilon,\delta\downarrow0$、次に $\alpha\downarrow0$ とすると右辺は0へ収束します。

しかし左辺は固定した

$$
\eta>0
$$

です。

矛盾です。

従って

$$
\widetilde u\le\widetilde v,
$$

時間を戻せば

$$
u\le v
$$

です。

<a id="thm-hjc3-backward-comparison"></a>
<!-- formal-statement-start -->
### 定理（backward HJB comparison）

$\mathcal B$ が連続で、ある定数 $L_p,L_x\ge0$ に対して

$$
|\mathcal B(x,p)-\mathcal B(x,q)|
\le
L_p|p-q|,
$$

$$
|\mathcal B(x,p)-\mathcal B(y,p)|
\le
L_x|x-y|(1+|p|)
$$

を満たすとする。

$u,v$ を $[0,T]\times\mathbb R^d$ 上 bounded uniformly continuous とし、

- $u$ は
  $$
  -u_t+\mathcal B(x,\nabla u)=0
  $$
  の viscosity subsolution、
- $v$ は同方程式の viscosity supersolution、

とする。

さらに

$$
u(T,x)\le v(T,x)
$$

が全ての $x$ で成り立つなら

$$
\boxed{
u(t,x)\le v(t,x)
}
$$

が全ての $(t,x)$ で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

時間反転

$$
s=T-t
$$

により forward initial-value problem へ移す。

subsolution を

$$
\widetilde u^\eta=\widetilde u-\eta s
$$

で strict 化し、時間・空間を doubling する。

最大点で二つの test function の時間微分は同じになるため、

$$
a+\mathcal B(\hat x,p_u)\le-\eta,
$$

$$
a+\mathcal B(\hat y,p_v)\ge0
$$

から

$$
\eta
\le
\mathcal B(\hat y,p_v)-\mathcal B(\hat x,p_u)
$$

を得る。

一方、doubling penalty により二点は近づき、Hamiltonian の二つの Lipschitz 条件から右辺は0へ収束する。

固定した $\eta>0$ と矛盾するので正の差は存在しない。時間を戻せば $u\le v$ である。$\square$
<!-- proof-end -->

HJC2 で学んだ doubling の役割はそのままです。

本章で追加されたのは、

$$
\boxed{
\text{terminal problem}
\to
\text{time reversal}
\to
\text{initial comparison}
}
$$

という時間方向の整理です。

---

## 9. value function は唯一の bounded uniformly continuous viscosity solution

これで全ての部品がそろいました。

- §3: $V$ は bounded uniformly continuous。
- §4: $V$ は viscosity subsolution。
- §5: $V$ は viscosity supersolution。
- §6: $V(T,\cdot)=g$。
- §7: Bellman Hamiltonian は comparison の構造条件を満たす。
- §8: backward comparison が成り立つ。

<a id="thm-hjc3-value-characterization"></a>
<!-- formal-statement-start -->
### 定理（value function の粘性解特徴付け）

§1 の standing assumptions の下で、決定論的最適制御問題の value function

$$
V(t,x)
=
\inf_{u\in\mathcal U[t,T]}
\left\{
g(X^{t,x;u}(T))
+
\int_t^T
L(X^{t,x;u}(s),u(s))\,ds
\right\}
$$

は終端値問題

$$
-V_t(t,x)
+
\mathcal B(x,\nabla V(t,x))
=
0,
$$

$$
V(T,x)=g(x),
$$

$$
\mathcal B(x,p)
=
\sup_{a\in U}
\{-L(x,a)-f(x,a)\cdot p\}
$$

の bounded uniformly continuous viscosity solution である。

さらに、この関数クラスの中で解は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

§3 により $V$ は bounded uniformly continuous である。

§4 と §5 により interior で viscosity subsolution かつ supersolution である。

§6 により終端条件

$$
V(T,x)=g(x)
$$

を満たす。

従って $V$ は viscosity solution である。

次に $W$ を同じ終端値問題の別の bounded uniformly continuous viscosity solution とする。

$V$ を subsolution、$W$ を supersolution と見て backward comparison を使うと

$$
V\le W.
$$

役割を交換すると

$$
W\le V.
$$

従って

$$
\boxed{
W=V
}.
$$

よって解は一意である。$\square$
<!-- proof-end -->

この一意性により、固定した制御モデルでは逆向きも読めます。

もし bounded uniformly continuous な粘性解 $W$ を PDE 側から見つけたなら、一意性により

$$
W=V.
$$

従って $W$ は value function であり、value function が持つ DPP も満たします。

この意味で本章の完成点は

$$
\boxed{
\text{DPP}
\Longleftrightarrow
\text{HJB in viscosity sense}
}
$$

です。

ただし論理の順番は、

1. 制御問題から DPP を証明する。
2. DPP から $V$ が粘性解と示す。
3. comparison で PDE 解の一意性を示す。
4. PDE 側の任意の解を $V$ と同定する。

です。

「任意の PDE 解から制御問題を新しく作れる」と主張しているわけではありません。

---

## 10. smooth case は HJC1 の verification theorem に戻る

$V\in C^1$ なら、自分自身

$$
\phi=V
$$

を test function として使えます。

subsolution と supersolution の両不等式から

$$
-V_t+\mathcal B(x,\nabla V)\le0,
$$

$$
-V_t+\mathcal B(x,\nabla V)\ge0.
$$

従って

$$
-V_t+\mathcal B(x,\nabla V)=0.
$$

$\mathcal B=-\mathcal H$ なので

$$
V_t+\mathcal H(x,\nabla V)=0.
$$

これは HJC1 の classical HJB です。

さらに HJC1 の [smooth verification theorem](../HJC1/index.md#thm-hjc1-verification) は、滑らかな候補 $W$ が HJB を満たすだけでなく、Hamiltonian の minimizer を実現する許容制御を構成できれば

$$
W=V
$$

と最適制御まで同時に確認できることを述べていました。

したがって役割は次のように分かれます。

$$
\boxed{
\text{viscosity characterization}
:
\text{非滑らかでも value function を一意に同定}
}
$$

$$
\boxed{
\text{smooth verification}
:
\text{滑らかな候補と minimizer から最適制御まで検証}
}
$$

粘性解の一意性だけから、最適制御の存在まで自動的に従うわけではありません。

---

## 11. exit-time と state constraint は何が追加で難しいか

本章では終端時刻 $T$ が固定された問題を扱いました。

exit-time problem では、軌道が領域を出る時刻自体が制御によって変わります。

state constraint では、許容制御が

$$
X(s)\in\Omega
$$

を保つよう制限されます。

このとき追加で問題になるのは、

- 境界へ到達したとき DPP をどう切るか。
- 境界でどの test function を許すか。
- state constraint boundary condition を viscosity sense でどう読むか。
- comparison で最大点が境界へ来たとき何を使うか。

です。

これらは粘性解の重要な発展ですが、本章の fixed-terminal characterization の証明責務には含めません。

まず本章の

$$
\text{continuity}
\to
\text{DPP}
\to
\text{sub / super}
\to
\text{comparison}
\to
\text{uniqueness}
$$

を基本形として持つことが先です。

---

## 12. この章で分かったこと

HJC1 の形式導出と HJC2 の解概念が、ここで一つになりました。

- HJC1 の最小化 Hamiltonian
  $$
  \mathcal H=\inf_a(L+f\cdot p)
  $$
  に対し
  $$
  \mathcal B=-\mathcal H
  $$
  と置けば、終端 HJB は
  $$
  -V_t+\mathcal B=0
  $$
  と書ける。
- 制御軌道の初期値安定性から value function は空間 Lipschitz。
- DPP と短時間移動量から時間 Lipschitz。
- 上接触では任意の短時間定数制御を試すことで subsolution 不等式が出る。
- 下接触では $h^2$ 近似最適制御を使うことで supersolution 不等式が出る。
- Bellman Hamiltonian は comparison に必要な Lipschitz 構造を持つ。
- backward comparison は時間反転と strict time tilt で初期値 comparison へ移せる。
- comparison により value function は唯一の bounded uniformly continuous viscosity solution。
- smooth case では HJC1 の classical HJB と verification theorem に戻る。

したがって

$$
\boxed{
\text{value function}
=
\text{HJB の一意な viscosity solution}
}
$$

が、本章で正本化した結論です。

次章 HJC4 ではプレイヤーを一人増やし、

$$
\inf_u
\quad\text{と}\quad
\sup_v
$$

の順序が異なる二つの Hamiltonian を作ります。

そこから Hamilton--Jacobi--Isaacs 方程式と Isaacs condition が現れます。

---

# 演習

## Level A

<a id="ex-hjc3-a01"></a>
### HJC3-A01 backward Bellman Hamiltonian の符号を確認する
- Level: A

$$
\mathcal H(x,p)
=
\inf_{a\in U}
\{L(x,a)+f(x,a)\cdot p\}
$$

とする。

$$
\mathcal B(x,p)
=
\sup_{a\in U}
\{-L(x,a)-f(x,a)\cdot p\}
$$

について

$$
\mathcal B(x,p)=-\mathcal H(x,p)
$$

を示し、

$$
V_t+\mathcal H(x,\nabla V)=0
$$

と

$$
-V_t+\mathcal B(x,\nabla V)=0
$$

が古典的には同じ等式であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

任意の実数族 $(A_a)_{a\in U}$ について

$$
\sup_a(-A_a)
=
-\inf_a A_a
$$

です。

ここで

$$
A_a
=
L(x,a)+f(x,a)\cdot p
$$

と置けば

$$
\begin{aligned}
\mathcal B(x,p)
&=
\sup_{a\in U}
\{-A_a\}\\
&=
-\inf_{a\in U}A_a\\
&=
-\mathcal H(x,p).
\end{aligned}
$$

従って

$$
-V_t+\mathcal B
=
-V_t-\mathcal H.
$$

これが0であることは

$$
V_t+\mathcal H=0
$$

と同値です。
<!-- solution-end -->

<a id="ex-hjc3-a02"></a>
### HJC3-A02 制御軌道の初期値安定性を再現する
- Level: A

同じ制御 $u$ に対する二軌道 $X_x,X_y$ が

$$
\dot X=f(X,u),
$$

$$
|f(x,a)-f(y,a)|
\le
K_f|x-y|
$$

を満たすとする。

$$
|X_x(s)-X_y(s)|
\le
e^{K_f(s-t)}|x-y|
$$

を導け。

<!-- solution-start -->
#### 詳細解答

積分形を引き算すると

$$
X_x(s)-X_y(s)
=
x-y
+
\int_t^s
\{f(X_x(r),u(r))-f(X_y(r),u(r))\}\,dr.
$$

絶対値を取って Lipschitz 条件を使うと

$$
D(s)
\le
D(t)
+
K_f\int_t^sD(r)\,dr,
$$

ただし

$$
D(s)=|X_x(s)-X_y(s)|,
\qquad
D(t)=|x-y|.
$$

$$
F(s)
=
D(t)+K_f\int_t^sD(r)\,dr
$$

と置けば

$$
D(s)\le F(s)
$$

かつ

$$
F'(s)
=
K_fD(s)
\le
K_fF(s).
$$

従って

$$
\frac d{ds}
\{e^{-K_f(s-t)}F(s)\}
\le0.
$$

$t$ から $s$ まで積分して

$$
e^{-K_f(s-t)}F(s)
\le
F(t)
=
D(t).
$$

よって

$$
D(s)
\le
F(s)
\le
e^{K_f(s-t)}D(t).
$$

したがって

$$
\boxed{
|X_x(s)-X_y(s)|
\le
e^{K_f(s-t)}|x-y|
}.
$$
<!-- solution-end -->

<a id="ex-hjc3-a03"></a>
### HJC3-A03 infimum が Lipschitz 定数を保つことを示す
- Level: A

全ての許容制御 $u$ について

$$
|J_x(u)-J_y(u)|
\le
C|x-y|
$$

が同じ定数 $C$ で成り立つとする。

$$
V(x)=\inf_uJ_x(u)
$$

と置くとき

$$
|V(x)-V(y)|
\le
C|x-y|
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

任意の $u$ について

$$
J_x(u)
\le
J_y(u)+C|x-y|.
$$

右辺で $u$ の infimum を取ると

$$
V(x)
=
\inf_uJ_x(u)
\le
\inf_uJ_y(u)+C|x-y|.
$$

従って

$$
V(x)-V(y)
\le
C|x-y|.
$$

$x,y$ を交換すると

$$
V(y)-V(x)
\le
C|x-y|.
$$

二式を合わせて

$$
\boxed{
|V(x)-V(y)|
\le
C|x-y|
}.
$$
<!-- solution-end -->

<a id="ex-hjc3-a04"></a>
### HJC3-A04 上接触から subsolution 不等式を出す
- Level: A

$V-\phi$ が $(t_0,x_0)$ で局所最大を取り、

$$
V(t_0,x_0)=\phi(t_0,x_0)
$$

とする。

任意の定数制御 $a$ と DPP から

$$
\phi_t(t_0,x_0)
+
L(x_0,a)
+
f(x_0,a)\cdot\nabla\phi(t_0,x_0)
\ge0
$$

を導き、

$$
-\phi_t+\mathcal B(x_0,\nabla\phi)\le0
$$

を結論せよ。

<!-- solution-start -->
#### 詳細解答

短時間で定数制御 $a$ を使うと DPP から

$$
V(t_0,x_0)
\le
\int_{t_0}^{t_0+h}L(X_a(s),a)\,ds
+
V(t_0+h,X_a(t_0+h)).
$$

上接触なので小さい $h$ では

$$
V(t_0+h,X_a(t_0+h))
\le
\phi(t_0+h,X_a(t_0+h)).
$$

従って

$$
0
\le
\int_{t_0}^{t_0+h}L(X_a(s),a)\,ds
+
\phi(t_0+h,X_a(t_0+h))
-
\phi(t_0,x_0).
$$

軌道上の連鎖律を使い、$h$ で割って $h\downarrow0$ とすると

$$
0
\le
L(x_0,a)
+
\phi_t(t_0,x_0)
+
f(x_0,a)\cdot\nabla\phi(t_0,x_0).
$$

従って全ての $a$ について

$$
-\phi_t
-L(x_0,a)
-f(x_0,a)\cdot\nabla\phi
\le0.
$$

supremum を取れば

$$
-\phi_t+\mathcal B(x_0,\nabla\phi)\le0.
$$
<!-- solution-end -->

<a id="ex-hjc3-a05"></a>
### HJC3-A05 bang-bang の Bellman Hamiltonian を計算する
- Level: A

$$
f(x,a)=a,
\qquad
L\equiv0,
\qquad
U=[-1,1]
$$

とする。

1. $\mathcal B(p)$ を求めよ。
2. backward HJB を書け。
3. $V(t,x)=\max\{|x|-(T-t),0\}$ が領域 $x>T-t$ で古典的に HJB を満たすことを確認せよ。

<!-- solution-start -->
#### 詳細解答

1. 定義から

$$
\mathcal B(p)
=
\sup_{|a|\le1}(-ap).
$$

$p>0$ なら $a=-1$、$p<0$ なら $a=1$ で最大です。

従って

$$
\boxed{
\mathcal B(p)=|p|
}.
$$

2. backward HJB は

$$
\boxed{
-V_t+|V_x|=0
}.
$$

3. $x>T-t$ では

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
V_x=1.
$$

よって

$$
-V_t+|V_x|
=
-1+1
=
0.
$$
<!-- solution-end -->

## Level B

<a id="ex-hjc3-b01"></a>
### HJC3-B01 DPP から時間 Lipschitz 性を導く
- Level: B

value function が空間について

$$
|V(s,x)-V(s,y)|
\le
C_x|x-y|
$$

を満たし、

$$
|f|\le M_f,
\qquad
|L|\le M_L
$$

とする。

$t<s$ に対し

$$
|V(t,x)-V(s,x)|
\le
(M_L+C_xM_f)(s-t)
$$

を DPP から示せ。

<!-- solution-start -->
#### 詳細解答

DPP は

$$
V(t,x)
=
\inf_u
\left\{
\int_t^sL(X(r),u(r))\,dr
+
V(s,X(s))
\right\}.
$$

まず上側を示します。

任意の短時間制御について

$$
\left|
\int_t^sL\,dr
\right|
\le
M_L(s-t)
$$

かつ

$$
|X(s)-x|
\le
M_f(s-t).
$$

空間 Lipschitz 性から

$$
V(s,X(s))
\le
V(s,x)+C_xM_f(s-t).
$$

従って DPP の右辺のある項、したがって infimum も

$$
V(t,x)
\le
V(s,x)
+
(M_L+C_xM_f)(s-t).
$$

逆向きでは DPP の右辺の任意の項について

$$
\int_t^sL\,dr
\ge
-M_L(s-t)
$$

かつ

$$
V(s,X(s))
\ge
V(s,x)-C_xM_f(s-t).
$$

よって全ての項が

$$
V(s,x)
-
(M_L+C_xM_f)(s-t)
$$

以上です。

infimum を取っても

$$
V(t,x)
\ge
V(s,x)
-
(M_L+C_xM_f)(s-t).
$$

二式を合わせて

$$
\boxed{
|V(t,x)-V(s,x)|
\le
(M_L+C_xM_f)(s-t)
}.
$$
<!-- solution-end -->

<a id="ex-hjc3-b02"></a>
### HJC3-B02 近似最適制御から supersolution を導く
- Level: B

$V-\phi$ が $(t_0,x_0)$ で局所最小を取り、

$$
V(t_0,x_0)=\phi(t_0,x_0)
$$

とする。

DPP の infimum から $h^2$ 以内の短時間制御 $u_h$ を選び、

$$
-\phi_t(t_0,x_0)
+
\mathcal B(x_0,\nabla\phi(t_0,x_0))
\ge0
$$

を導け。

<!-- solution-start -->
#### 詳細解答

DPP の infimum の定義から

$$
\int_{t_0}^{t_0+h}L(X_h(s),u_h(s))\,ds
+
V(t_0+h,X_h(t_0+h))
\le
V(t_0,x_0)+h^2
$$

となる $u_h$ を選べます。

下接触なので小さい $h$ では

$$
V(t_0+h,X_h(t_0+h))
\ge
\phi(t_0+h,X_h(t_0+h)).
$$

従って

$$
\int_{t_0}^{t_0+h}L\,ds
+
\phi(t_0+h,X_h(t_0+h))
-
\phi(t_0,x_0)
\le
h^2.
$$

連鎖律により

$$
\frac1h
\int_{t_0}^{t_0+h}
\{
\phi_t+L+\nabla\phi\cdot f
\}
\,ds
\le h.
$$

短時間では $X_h(s)\to x_0$ が一様であり、$U$ のコンパクト性により integrand は制御値に一様に

$$
\phi_t(t_0,x_0)
+
L(x_0,a)
+
\nabla\phi(t_0,x_0)\cdot f(x_0,a)
+
o(1)
$$

と比較できます。

従って

$$
\phi_t(t_0,x_0)
+
\mathcal H(x_0,\nabla\phi(t_0,x_0))
+
o(1)
\le h.
$$

$h\downarrow0$ で

$$
\phi_t+\mathcal H\le0.
$$

$\mathcal B=-\mathcal H$ より

$$
\boxed{
-\phi_t+\mathcal B\ge0
}.
$$
<!-- solution-end -->

<a id="ex-hjc3-b03"></a>
### HJC3-B03 Bellman Hamiltonian の comparison 条件を確認する
- Level: B

$$
\mathcal B(x,p)
=
\sup_{a\in U}
\{-L(x,a)-f(x,a)\cdot p\}
$$

とする。

$$
|f(x,a)|\le M_f,
$$

$$
|f(x,a)-f(y,a)|\le K_f|x-y|,
$$

$$
|L(x,a)-L(y,a)|\le K_L|x-y|
$$

から

$$
|\mathcal B(x,p)-\mathcal B(x,q)|
\le
M_f|p-q|
$$

および

$$
|\mathcal B(x,p)-\mathcal B(y,p)|
\le
(K_L+K_f|p|)|x-y|
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

一般に二つの実数族 $A_a,B_a$ について

$$
|\sup_aA_a-\sup_aB_a|
\le
\sup_a|A_a-B_a|
$$

です。

まず

$$
A_a=-L(x,a)-f(x,a)\cdot p,
$$

$$
B_a=-L(x,a)-f(x,a)\cdot q
$$

とすると

$$
|A_a-B_a|
=
|f(x,a)\cdot(p-q)|
\le
M_f|p-q|.
$$

従って

$$
\boxed{
|\mathcal B(x,p)-\mathcal B(x,q)|
\le
M_f|p-q|
}.
$$

次に

$$
A_a=-L(x,a)-f(x,a)\cdot p,
$$

$$
B_a=-L(y,a)-f(y,a)\cdot p
$$

とすると

$$
\begin{aligned}
|A_a-B_a|
&\le
|L(x,a)-L(y,a)|\\
&\quad+
|f(x,a)-f(y,a)|\,|p|\\
&\le
(K_L+K_f|p|)|x-y|.
\end{aligned}
$$

supremum を取って

$$
\boxed{
|\mathcal B(x,p)-\mathcal B(y,p)|
\le
(K_L+K_f|p|)|x-y|
}.
$$
<!-- solution-end -->

<a id="ex-hjc3-b04"></a>
### HJC3-B04 backward comparison の strict gap を作る
- Level: B

$$
-u_t+\mathcal B(x,\nabla u)=0
$$

の viscosity subsolution $u$ を時間反転し、

$$
\widetilde u(s,x)=u(T-s,x)
$$

とする。

1. $\widetilde u$ が
   $$
   \widetilde u_s+\mathcal B(x,\nabla\widetilde u)=0
   $$
   の subsolution であることを示せ。
2. $\widetilde u^\eta=\widetilde u-\eta s$ が
   $$
   \psi_s+\mathcal B(x,\nabla\psi)\le-\eta
   $$
   という strict subsolution 不等式を満たすことを示せ。

<!-- solution-start -->
#### 詳細解答

1. $\psi$ が $\widetilde u$ へ上から接するとします。

$$
\phi(t,x)=\psi(T-t,x)
$$

と置けば $\phi$ は $u$ へ上から接します。

微分は

$$
\phi_t(t,x)
=
-\psi_s(T-t,x),
$$

$$
\nabla\phi(t,x)
=
\nabla\psi(T-t,x).
$$

$u$ の subsolution 性から

$$
-\phi_t+\mathcal B(x,\nabla\phi)\le0.
$$

従って

$$
\psi_s+\mathcal B(x,\nabla\psi)\le0.
$$

よって $\widetilde u$ は forward equation の subsolution です。

2. $\psi$ が $\widetilde u^\eta$ へ上から接するとします。

すると

$$
\psi(s,x)+\eta s
$$

は $\widetilde u$ へ上から接します。

従って

$$
(\psi_s+\eta)
+
\mathcal B(x,\nabla\psi)
\le0.
$$

整理すると

$$
\boxed{
\psi_s+\mathcal B(x,\nabla\psi)
\le-\eta
}.
$$

この固定された $-\eta$ が comparison proof の矛盾を作ります。
<!-- solution-end -->

## Level C

<a id="ex-hjc3-c01"></a>
### HJC3-C01 value function の粘性解特徴付けを一つの論証にまとめる
- Level: C

§1 の standing assumptions の下で、次を順に示せ。

1. value function $V$ は bounded uniformly continuous である。
2. 上接触では任意の短時間定数制御から
   $$
   -\phi_t+\mathcal B\le0
   $$
   が出る。
3. 下接触では $h^2$ 近似最適制御から
   $$
   -\phi_t+\mathcal B\ge0
   $$
   が出る。
4. $\mathcal B$ が backward comparison の構造条件を満たす。
5. 同じ終端条件を持つ bounded uniformly continuous viscosity solution $W$ は必ず $V$ と一致する。
6. $V\in C^1$ の場合、結論が HJC1 の classical HJB に戻ることを確認する。

<!-- solution-start -->
#### 詳細解答

### 1. bounded uniformly continuous

$|f|\le M_f$ なので

$$
|X(s)-x|
\le
M_f(s-t).
$$

同じ制御を異なる初期値から走らせると、§3 の軌道評価から

$$
|X_x(s)-X_y(s)|
\le
e^{K_f(s-t)}|x-y|.
$$

$L,g$ の Lipschitz 性を費用へ入れると、制御に依存しない $C_x$ が存在して

$$
|J_{t,x}(u)-J_{t,y}(u)|
\le
C_x|x-y|.
$$

infimum を取って

$$
|V(t,x)-V(t,y)|
\le
C_x|x-y|.
$$

DPP を $[t,s]$ で切ると

$$
|V(t,x)-V(s,x)|
\le
(M_L+C_xM_f)|t-s|.
$$

さらに

$$
|V(t,x)|
\le
M_g+TM_L.
$$

従って $V$ は bounded uniformly continuous です。

### 2. subsolution

$V-\phi$ が上接触するとします。

任意の定数制御 $a$ を最初の短時間へ入れると

$$
V(t_0,x_0)
\le
\int L\,ds
+
V(t_0+h,X_a(t_0+h)).
$$

上接触 $V\le\phi$ と連鎖律から

$$
0
\le
\phi_t
+
L(x_0,a)
+
f(x_0,a)\cdot\nabla\phi
$$

を極限で得ます。

全 $a$ について成り立つので

$$
-\phi_t
+
\sup_a\{-L-f\cdot\nabla\phi\}
\le0.
$$

従って

$$
-\phi_t+\mathcal B\le0.
$$

### 3. supersolution

$V-\phi$ が下接触するとします。

DPP の infimumから $h^2$ 以内の短時間制御 $u_h$ を選びます。

下接触 $V\ge\phi$ を使うと

$$
\frac1h
\int
\{
\phi_t+L+\nabla\phi\cdot f
\}
\,ds
\le h.
$$

短時間極限と $U$ のコンパクト性により

$$
\phi_t
+
\inf_a\{L+f\cdot\nabla\phi\}
\le0.
$$

従って

$$
-\phi_t+\mathcal B\ge0.
$$

### 4. comparison の構造条件

supremum の差の評価から

$$
|\mathcal B(x,p)-\mathcal B(x,q)|
\le
M_f|p-q|,
$$

$$
|\mathcal B(x,p)-\mathcal B(y,p)|
\le
(K_L+K_f|p|)|x-y|.
$$

よって backward comparison theorem の仮定を満たします。

### 5. 一意性

$W$ を別の bounded uniformly continuous viscosity solution とします。

$V$ を subsolution、$W$ を supersolution として comparison を使うと

$$
V\le W.
$$

役割を交換すると

$$
W\le V.
$$

従って

$$
\boxed{
W=V
}.
$$

### 6. smooth case

$V\in C^1$ なら sub / super の両不等式が同一点で等号になり、

$$
-V_t+\mathcal B(x,\nabla V)=0.
$$

$\mathcal B=-\mathcal H$ なので

$$
\boxed{
V_t+\mathcal H(x,\nabla V)=0
}.
$$

これは HJC1 の classical HJB です。

以上により

$$
\boxed{
V
=
\text{HJB の唯一の bounded uniformly continuous viscosity solution}
}
$$

が得られました。
<!-- solution-end -->
