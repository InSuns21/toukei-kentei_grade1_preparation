# F0-00SP4 Encore IV：Itô積分・Itô公式・SDE

Brown運動では

$$
[B]_t=t
$$

という二次変分が残ります。したがって通常のchain ruleでは二階Taylor項を捨てられません。

この章では

```text
simple predictable integrand
  ↓ Itô isometry
L2 completionとしてItô積分を構成
  ↓
Brown運動に対するC2 Itô公式
  ↓
一般Itô processの公式
  ↓
SDE = 確率積分方程式
  ↓ Picard + isometry + Gronwall
global Lipschitz SDEの存在一意性
```

まで証明します。

---

## 1. simple predictable process

<a id="def-f0-00sp4-simple-predictable"></a>

<!-- formal-statement-start -->
> **定義（simple predictable process）**  
> $0=t_0<t_1<\cdots<t_m=T$ を決定論的分割とします。各 $k$ で $H_k$ が $\mathcal F_{t_k}$-可測かつ平方可積分であるとき

$$
H_t=\sum_{k=0}^{m-1}H_k1_{(t_k,t_{k+1}]}(t)
$$

> をsimple predictable processと呼びます。
<!-- formal-statement-end -->

### 1.1 例：最初の時点で賭け額を固定する

$H_0=2$ とし $H_t=2$ for $0<t\le T$ とします。

<!-- definition-example-start: def-f0-00sp4-simple-predictable -->
**定義の確認**  
分割 $0<T$ の一つだけの区間を使えば

$$
H_t=H_0 1_{(0,T]}(t),
\qquad H_0=2.
$$

定数 $H_0$ は $\mathcal F_0$-可測かつ平方可積分なので、simple predictableの定義を満たします。
<!-- definition-example-end -->

---

## 2. simple processのItô積分

<a id="def-f0-00sp4-simple-ito-integral"></a>

<!-- formal-statement-start -->
> **定義（simple processのItô積分）**  
> simple predictable process

$$
H_t=\sum_{k=0}^{m-1}H_k1_{(t_k,t_{k+1}]}(t)
$$

> に対して

$$
\boxed{
I_T(H):=\int_0^T H_t\,dB_t
:=\sum_{k=0}^{m-1}H_k(B_{t_{k+1}}-B_{t_k})
}
$$

> と定義します。
<!-- formal-statement-end -->

### 2.1 例：定数被積分過程

<!-- definition-example-start: def-f0-00sp4-simple-ito-integral -->
**定義の確認**  
$H_t\equiv2$ なら定義から

$$
\int_0^T2\,dB_t
=2(B_T-B_0)=2B_T.
$$

通常積分のように「$dB_t/dt$」を作ったのではなく、Brown増分へ係数を掛けた有限和として定義しています。
<!-- definition-example-end -->

---

## 3. Itô isometry

<a id="thm-f0-00sp4-ito-isometry-simple"></a>

<!-- formal-statement-start -->
> **定理（simple processに対するItô isometry）**  
> simple predictable process $H$ に対し

$$
\boxed{
E[I_T(H)]=0,
\qquad
E|I_T(H)|^2
=E\int_0^T|H_t|^2dt
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：異なるBrown増分のcross termを消す

$\Delta_kB=B_{t_{k+1}}-B_{t_k}$ と書きます。$H_k$ は $\mathcal F_{t_k}$-可測で、$\Delta_kB$ は $\mathcal F_{t_k}$ と独立かつ平均0なので

$$
E[H_k\Delta_kB]=0.
$$

従って $E[I_T(H)]=0$ です。

二乗すると

$$
I_T(H)^2
=\sum_kH_k^2(\Delta_kB)^2
+2\sum_{j<k}H_jH_k\Delta_jB\Delta_kB.
$$

$j<k$ のcross termについて、$H_j\Delta_jB H_k$ は $\mathcal F_{t_k}$-可測なので

$$
E[H_jH_k\Delta_jB\Delta_kB]
=E[H_jH_k\Delta_jB\,E[\Delta_kB\mid\mathcal F_{t_k}]]=0.
$$

対角項は

$$
E[H_k^2(\Delta_kB)^2]
=E[H_k^2](t_{k+1}-t_k).
$$

従って

$$
E|I_T(H)|^2
=\sum_kE[H_k^2](t_{k+1}-t_k)
=E\int_0^TH_t^2dt.
$$
<!-- proof-end -->

---

## 4. $L^2$ completionとして一般のItô積分を作る

<a id="def-f0-00sp4-h2-ito"></a>

<!-- formal-statement-start -->
> **定義（Itô integrand space $\mathcal H_T^2$）**  
> simple predictable processesを

$$
\|H\|_{\mathcal H_T^2}^2
:=E\int_0^T|H_t|^2dt
$$

> で完備化したHilbert空間を $\mathcal H_T^2$ と書きます。
<!-- formal-statement-end -->

### 4.1 例：決定論的連続関数

$h\in C([0,T])$ を決定論的関数とします。

<!-- definition-example-start: def-f0-00sp4-h2-ito -->
**定義の確認**  
左端値による階段関数 $h^{(n)}$ はsimple predictableで、一様連続性から

$$
\int_0^T|h^{(n)}(t)-h(t)|^2dt\to0.
$$

従って $h$ はsimple predictable processesの $\mathcal H_T^2$-極限として $\mathcal H_T^2$ に属します。
<!-- definition-example-end -->

<a id="thm-f0-00sp4-ito-extension"></a>

<!-- formal-statement-start -->
> **定理（Itô積分の $L^2$ 拡張）**  
> simple predictable processes上の写像 $I_T$ は一意に連続線形写像

$$
I_T:\mathcal H_T^2\to L^2(\Omega)
$$

> へ拡張され、任意の $H\in\mathcal H_T^2$ で

$$
\boxed{
E\left|\int_0^TH_t\,dB_t\right|^2
=E\int_0^T|H_t|^2dt
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：isometryなのでCauchy列をCauchy列へ送る

$H^{(n)}$ をsimple predictableで $H^{(n)}\to H$ in $\mathcal H_T^2$ とします。[Itô isometry](#thm-f0-00sp4-ito-isometry-simple)から

$$
E|I_T(H^{(n)})-I_T(H^{(m)})|^2
=\|H^{(n)}-H^{(m)}\|_{\mathcal H_T^2}^2.
$$

右辺は0へ行くので、$L^2(\Omega)$ の完備性から $I_T(H^{(n)})$ は極限を持ちます。近似列を変えても同じisometryから極限は一致します。これを $I_T(H)$ と定義します。isometry自体も極限を取れば保たれます。
<!-- proof-end -->

---

## 5. Itô積分過程は連続martingaleになる

後のSDEでpathの連続性を使うため、積分を終点 $t$ の関数として見ます。

<a id="lem-f0-00sp4-doob-l2"></a>

<!-- formal-statement-start -->
> **補題（$L^2$ maximal inequality）**  
> 平方可積分martingale $(M_t)_{0\le t\le T}$ を有限個の時刻で観測すると

$$
E\max_{k\le m}|M_{t_k}|^2
\le4E|M_{t_m}|^2.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：初回crossingとtail積分

離散列 $Y_k=M_{t_k}$ に対して $Y_k^*=\max_{j\le k}|Y_j|$ とします。$\lambda>0$ の初回crossing indexを使うと、submartingale $|Y_k|$ の条件付き平均性から

$$
\lambda P(Y_m^*\ge\lambda)
\le E[|Y_m|1_{\{Y_m^*\ge\lambda\}}].
$$

両辺を $2\,d\lambda$ で積分すると

$$
E[(Y_m^*)^2]
\le2E[|Y_m|Y_m^*].
$$

Cauchy--Schwarzより

$$
\|Y_m^*\|_2^2
\le2\|Y_m\|_2\|Y_m^*\|_2,
$$

従って $\|Y_m^*\|_2\le2\|Y_m\|_2$ です。
<!-- proof-end -->

<a id="thm-f0-00sp4-continuous-ito-process"></a>

<!-- formal-statement-start -->
> **定理（Itô積分の連続martingale版）**  
> $H\in\mathcal H_T^2$ に対し

$$
M_t:=\int_0^tH_s\,dB_s
$$

> は連続sample pathを持つ平方可積分martingale版を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：simple積分を一様ノルムで極限にする

simple $H^{(n)}\to H$ in $\mathcal H_T^2$ を取ります。simple積分過程 $M^{(n)}_t$ は有限個の区間ごとにBrown増分を線形に追う形なのでpathは連続です。

$M^{(n)}-M^{(m)}$ に [maximal inequality](#lem-f0-00sp4-doob-l2) を細かい共通分割上で適用し、分割を稠密化すると

$$
E\sup_{t\le T}|M_t^{(n)}-M_t^{(m)}|^2
\le4E|M_T^{(n)}-M_T^{(m)}|^2.
$$

Itô isometryから右辺は

$$
4\|H^{(n)}-H^{(m)}\|_{\mathcal H_T^2}^2\to0.
$$

従って $(M^{(n)})$ は $L^2(\Omega;C[0,T])$ でCauchyです。完備性から連続pathを持つ極限 $M$ が得られ、各固定時刻では前節のItô積分と一致します。simple段階のmartingale性を $L^2$ 極限へ渡せばmartingale性も従います。
<!-- proof-end -->

この定理により、後でstopping timeへ積分公式を代入することも正当化できます。

---

## 6. Brown運動に対するItô公式

<a id="thm-f0-00sp4-brownian-ito"></a>

<!-- formal-statement-start -->
> **定理（Brown運動に対するItô公式）**  
> $f\in C^2(\mathbb R)$、$B$ を標準Brown運動とします。このとき任意の $t\ge0$ で

$$
\boxed{
f(B_t)
=f(B_0)
+\int_0^tf'(B_s)\,dB_s
+\frac12\int_0^tf''(B_s)\,ds
}
$$

> a.s. が成り立ちます。局所的に平方可積分な積分はstopping timeによるlocalizationで解釈します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Taylor二階項と二次変分を一致させる

#### Step 1：まず $f',f''$ が有界で $f''$ が一様連続な場合

$[0,t]$ の分割 $\pi=\{t_k\}$ を取り

$$
\Delta_kB=B_{t_k}-B_{t_{k-1}}.
$$

Taylor展開を左端で行うと

$$
\begin{aligned}
f(B_{t_k})-f(B_{t_{k-1}})
={}&f'(B_{t_{k-1}})\Delta_kB\\
&+\frac12f''(B_{t_{k-1}})(\Delta_kB)^2+r_k.
\end{aligned}
$$

$f''$ の一様連続性のmodulusを $\omega(\delta)$ とすると

$$
|r_k|
\le\frac12\omega(|\Delta_kB|)(\Delta_kB)^2.
$$

Brown pathの一様連続性から $\max_k|\Delta_kB|\to0$ a.s. で、[Brown運動の二次変分](../F0_00SP3_Brown運動_Gaussian過程_二次変分/index.md#thm-f0-00sp3-quadratic-variation) から $\sum_k(\Delta_kB)^2$ は確率有界です。従って

$$
\sum_kr_k\to0
$$

in probabilityです。

第一項はstep integrand

$$
H_s^\pi=f'(B_{t_{k-1}}),
\qquad s\in(t_{k-1},t_k]
$$

によるItô積分です。path連続性と有界性から

$$
E\int_0^t|H_s^\pi-f'(B_s)|^2ds\to0,
$$

よってItô isometryから

$$
\sum_kf'(B_{t_{k-1}})\Delta_kB
\to\int_0^tf'(B_s)dB_s
$$

in $L^2$ です。

第二項を

$$
\begin{aligned}
&\frac12\sum_kf''(B_{t_{k-1}})(\Delta_kB)^2\\
&=\frac12\sum_kf''(B_{t_{k-1}})\Delta_kt
+\frac12\sum_kf''(B_{t_{k-1}})\{(\Delta_kB)^2-\Delta_kt\}
\end{aligned}
$$

と分けます。第1和はpathごとのRiemann和として

$$
\frac12\int_0^tf''(B_s)ds
$$

へa.s.収束します。第2和は [predictable係数付き二次変分補題](../F0_00SP3_Brown運動_Gaussian過程_二次変分/index.md#lem-f0-00sp3-weighted-qv) により $L^2$ で0へ収束します。

左辺のtelescoping sumは常に $f(B_t)-f(B_0)$ です。従って極限の一意性から主張が得られます。

#### Step 2：一般の $f\in C^2$

$$
\tau_R:=\inf\{s\ge0:|B_s|\ge R\}
$$

とします。$[-R-1,R+1]$ 上で $f$ と一致する $C^2$ 関数 $f_R$ で、$f_R',f_R''$ が有界かつ $f_R''$ が一様連続なものを取れます。Step 1の公式は連続過程の恒等式なので $t\wedge\tau_R$ を代入できます。

$s\le\tau_R$ では $f_R^{(j)}(B_s)=f^{(j)}(B_s)$ $(j=0,1,2)$ だから

$$
f(B_{t\wedge\tau_R})
=f(B_0)+\int_0^{t\wedge\tau_R}f'(B_s)dB_s
+\frac12\int_0^{t\wedge\tau_R}f''(B_s)ds.
$$

Brown pathは有限区間でa.s.有界なので $\tau_R\to\infty$ a.s.。固定した $t$ について十分大きい $R$ では $t\wedge\tau_R=t$ となり、一般の $C^2$ 版が従います。
<!-- proof-end -->

### 6.1 例：$f(x)=x^2$

$$
f'(x)=2x,
\qquad f''(x)=2
$$

なので

$$
B_t^2
=2\int_0^tB_s\,dB_s+t.
$$

したがって $B_t^2-t$ がmartingaleであることをSP3とは別ルートで回収できます。

---

## 7. Itô process

<a id="def-f0-00sp4-ito-process"></a>

<!-- formal-statement-start -->
> **定義（Itô process）**  
> 適合した過程 $b_t,\sigma_t$ が各有限 $T$ について

$$
\int_0^T|b_s|ds<\infty,
\qquad
\int_0^T\sigma_s^2ds<\infty
$$

> a.s. を満たすとします。過程 $X$ が

$$
X_t=X_0+\int_0^tb_sds+\int_0^t\sigma_s\,dB_s
$$

> と表されるとき、$X$ をItô processと呼び、形式的に $dX_t=b_tdt+\sigma_tdB_t$ と書きます。
<!-- formal-statement-end -->

### 7.1 例：Brown運動自身

<!-- definition-example-start: def-f0-00sp4-ito-process -->
**定義の確認**  
$b_t\equiv0$, $\sigma_t\equiv1$, $X_0=0$ とすると

$$
X_t=\int_0^t1\,dB_s=B_t.
$$

$\int_0^T0ds=0$、$\int_0^T1^2ds=T<\infty$ なので積分可能性条件も満たし、Brown運動はItô processです。
<!-- definition-example-end -->

---

## 8. 一般Itô公式

<a id="thm-f0-00sp4-general-ito"></a>

<!-- formal-statement-start -->
> **定理（1次元Itô processに対するItô公式）**  
> $X_t=X_0+\int_0^tb_sds+\int_0^t\sigma_s dB_s$ をItô processとし、$f\in C^{1,2}([0,T]\times\mathbb R)$ とします。必要な積分をlocalizationで可積分にした上で

$$
\boxed{
\begin{aligned}
f(t,X_t)-f(0,X_0)
={}&\int_0^t
\left(\partial_sf+b_s\partial_xf+\frac12\sigma_s^2\partial_{xx}f\right)(s,X_s)ds\\
&+\int_0^t\sigma_s\partial_xf(s,X_s)dB_s.
\end{aligned}
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：simple係数でTaylor展開し、$L^1/L^2$近似へ渡す

#### Step 1：$b,\sigma$ が有界simple predictableの場合

分割上で $b_s=b_k$, $\sigma_s=\sigma_k$ と一定とします。各区間で

$$
\Delta X_k=b_k\Delta_kt+\sigma_k\Delta_kB.
$$

2変数Taylor展開を左端 $(t_{k-1},X_{t_{k-1}})$ で行います。一次項を足すと

$$
\sum_k\partial_tf\,\Delta_kt
+\sum_k\partial_xf\,b_k\Delta_kt
+\sum_k\partial_xf\,\sigma_k\Delta_kB.
$$

最初の2和はRiemann/Lebesgue積分へ、最後はItô積分へ収束します。

二次の空間項では

$$
(\Delta X_k)^2
=\sigma_k^2(\Delta_kB)^2
+2b_k\sigma_k\Delta_kt\,\Delta_kB
+b_k^2(\Delta_kt)^2.
$$

最後の和は $O(|\pi|)$ で0へ行きます。中央の和はItô isometry型の計算から

$$
E\left|\sum_kb_k\sigma_k\Delta_kt\,\Delta_kB\right|^2
\le C\sum_k(\Delta_kt)^3
\le CT|\pi|^2\to0.
$$

残る

$$
\sum_k\partial_{xx}f\,\sigma_k^2(\Delta_kB)^2
$$

はpredictable係数付き二次変分により

$$
\int_0^t\partial_{xx}f(s,X_s)\sigma_s^2ds
$$

へ収束します。時間二次項と時間・空間混合項も $\sum(\Delta t)^2$ と $\sum|\Delta t\Delta B|$ の評価で消えます。Taylor remainderはlocalization後の二階導関数の一様連続性と $\max|\Delta X_k|\to0$ in probabilityから消えます。

#### Step 2：一般のItô processへ近似

localizationにより $X,b,\sigma$ と $f$ の必要な導関数を有界な領域へ制限します。その上でpredictable simple processes $b^{(n)},\sigma^{(n)}$ を

$$
E\int_0^T|\sigma_s^{(n)}-\sigma_s|^2ds\to0,
$$

$$
E\int_0^T|b_s^{(n)}-b_s|ds\to0
$$

となるよう取ります。Itô isometryと通常積分の評価から対応するItô processesは各固定時刻で確率収束します。Step 1の各項も同じ $L^1/L^2$ 評価で極限へ移るため、一般の公式を得ます。最後にlocalizationを外します。
<!-- proof-end -->

---

## 9. SDEとstrong solution

<a id="def-f0-00sp4-strong-solution"></a>

<!-- formal-statement-start -->
> **定義（SDEのstrong solution）**  
> 与えられたBrown運動 $B$ と初期値 $X_0$ に対し

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

> のstrong solutionとは、同じ確率空間・同じBrown運動のfiltrationにadaptedな過程 $X$ で

$$
\boxed{
X_t=X_0+\int_0^tb(X_s)ds+\int_0^t\sigma(X_s)dB_s
}
$$

> を満たすものをいいます。Itô積分の連続版を用い、解は連続versionで考えます。
<!-- formal-statement-end -->

### 9.1 例：確率項がない線形方程式

$\sigma\equiv0$, $b(x)=-\theta x$ とします。

<!-- definition-example-start: def-f0-00sp4-strong-solution -->
**定義の確認**  
$X_t=X_0e^{-\theta t}$ と置けばadaptedで連続、かつ

$$
X_0+\int_0^t(-\theta X_s)ds
=X_0e^{-\theta t}=X_t.
$$

確率積分項は0なので、strong solutionの積分方程式を直接満たします。
<!-- definition-example-end -->

---

## 10. global Lipschitz SDEの存在一意性

<a id="thm-f0-00sp4-sde-existence-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（global Lipschitz SDEの存在一意性）**  
> $X_0\in L^2$ を $\mathcal F_0$-可測とします。Borel関数 $b,\sigma:\mathbb R\to\mathbb R$ が、ある $L,K>0$ に対して全ての $x,y$ で

$$
|b(x)-b(y)|+|\sigma(x)-\sigma(y)|\le L|x-y|,
$$

$$
|b(x)|^2+|\sigma(x)|^2\le K(1+|x|^2)
$$

> を満たすとします。このとき任意の有限 $T>0$ でSDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t,
\qquad X_0\text{ given}
$$

> は $[0,T]$ 上に一意なstrong solutionを持ち、

$$
\sup_{t\le T}E|X_t|^2<\infty
$$

> です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Picard反復・Itô isometry・Gronwall

#### Step 1：Picard反復

$$
X_t^{(0)}:=X_0
$$

から始め

$$
X_t^{(n+1)}
:=X_0+\int_0^tb(X_s^{(n)})ds
+\int_0^t\sigma(X_s^{(n)})dB_s
$$

と定めます。線形成長条件とItô isometryを使う帰納法で、各反復は

$$
\sup_{t\le T}E|X_t^{(n)}|^2<\infty
$$

を満たします。

#### Step 2：隣り合う反復の差を評価する

$$
D_n(t):=\sup_{u\le t}E|X_u^{(n+1)}-X_u^{(n)}|^2
$$

と置きます。$u\le T$ に対して $(a+b)^2\le2a^2+2b^2$、Cauchy--Schwarz、Itô isometry、Lipschitz条件から

$$
\begin{aligned}
&E|X_u^{(n+1)}-X_u^{(n)}|^2\\
&\le2uE\int_0^u|b(X_s^{(n)})-b(X_s^{(n-1)})|^2ds\\
&\quad+2E\int_0^u|\sigma(X_s^{(n)})-\sigma(X_s^{(n-1)})|^2ds\\
&\le2L^2(T+1)\int_0^uD_{n-1}(s)ds.
\end{aligned}
$$

従って

$$
D_n(t)\le C_T\int_0^tD_{n-1}(s)ds,
\qquad C_T:=2L^2(T+1).
$$

$D_0(T)<\infty$ なので反復すると

$$
D_n(T)
\le D_0(T)\frac{(C_TT)^n}{n!}.
$$

従って

$$
\sum_{n=0}^\infty\sqrt{D_n(T)}<\infty.
$$

よって $(X^{(n)})$ は $\sup_{t\le T}\|\cdot\|_{L^2(\Omega)}$ でCauchyとなり、各 $t$ でadaptedな極限 $X_t$ を持ちます。

#### Step 3：極限が積分方程式を満たす

Lipschitz条件から

$$
E\int_0^T|b(X_s^{(n)})-b(X_s)|^2ds\to0,
$$

$$
E\int_0^T|\sigma(X_s^{(n)})-\sigma(X_s)|^2ds\to0.
$$

通常積分のCauchy--Schwarz評価とItô isometryによりPicard式の両積分を極限へ移せます。従って

$$
X_t=X_0+\int_0^tb(X_s)ds+\int_0^t\sigma(X_s)dB_s.
$$

[Itô積分の連続martingale版](#thm-f0-00sp4-continuous-ito-process)から右辺は連続versionを持つので、$X$ をそのversionに取り替えればstrong solutionです。

#### Step 4：一意性

$X,Y$ を二つのsolutionとし

$$
D(t):=\sup_{u\le t}E|X_u-Y_u|^2
$$

と置きます。同じ評価から

$$
D(t)\le C_T\int_0^tD(s)ds.
$$

Gronwall不等式より $D(t)=0$ for all $t\le T$。従って各固定時刻で $X_t=Y_t$ a.s.、連続version同士なのでindistinguishableです。

#### Step 5：二次モーメント評価

solutionの積分方程式へ同じ評価と線形成長条件を使うと

$$
E|X_t|^2
\le C\left(E|X_0|^2+1+\int_0^tE|X_s|^2ds\right).
$$

再びGronwallを適用して

$$
\sup_{t\le T}E|X_t|^2<\infty
$$

を得ます。
<!-- proof-end -->

---

## 11. 典型例

### 11.1 幾何Brown運動

$$
dX_t=\mu X_tdt+\sigma X_tdB_t,
\qquad X_0>0.
$$

$\log X_t$ へ [一般Itô公式](#thm-f0-00sp4-general-ito) を使うと

$$
d\log X_t
=\left(\mu-\frac12\sigma^2\right)dt+\sigma dB_t.
$$

従って

$$
\boxed{
X_t=X_0\exp\left\{\left(\mu-\frac12\sigma^2\right)t+\sigma B_t\right\}.
}
$$

### 11.2 Ornstein--Uhlenbeck過程

$$
dX_t=-\theta X_tdt+\sigma dB_t.
$$

$f(t,x)=e^{\theta t}x$ へItô公式を適用すると

$$
d(e^{\theta t}X_t)=\sigma e^{\theta t}dB_t.
$$

従って

$$
\boxed{
X_t=e^{-\theta t}X_0
+\sigma\int_0^te^{-\theta(t-s)}dB_s.
}
$$

---

# 12. 演習

## F0-00SP4-A01 Itô isometryで分散を求める

- Level: A
- 目安時間: 10分

決定論的 $h\in L^2(0,T)$ に対し

$$
Y=\int_0^Th(s)dB_s
$$

の平均と分散を求めよ。

<!-- solution-start -->
### 詳細解答

Itô積分の平均は0、isometryから

$$
E[Y^2]=\int_0^Th(s)^2ds.
$$

平均0なのでこれが分散。

### 本番答案

$E[Y]=0$, $\operatorname{Var}(Y)=\int_0^Th^2$。

### 採点基準（20点）
- 平均：6点
- isometry：10点
- 分散結論：4点
<!-- solution-end -->

## F0-00SP4-A02 $x^2$ のItô公式

- Level: A
- 目安時間: 12分

Brown運動へ $f(x)=x^2$ のItô公式を適用し

$$
\int_0^tB_s\,dB_s
$$

を $B_t$ と $t$ で表せ。

<!-- solution-start -->
### 詳細解答

$$
B_t^2=2\int_0^tB_s\,dB_s+t
$$

だから

$$
\int_0^tB_s\,dB_s=\frac12(B_t^2-t).
$$

### 本番答案

Itô公式を $f'=2x,f''=2$ に適用する。

### 採点基準（20点）
- 導関数：4点
- Itô公式：10点
- 整理：6点
<!-- solution-end -->

## F0-00SP4-B01 Taylor和からItô補正を導く

- Level: B
- 目安時間: 20分

$f\in C^2$ で導関数が有界とする。分割に沿うTaylor和で

$$
\frac12\sum_kf''(B_{t_{k-1}})(\Delta_kB)^2
$$

が

$$
\frac12\int_0^tf''(B_s)ds
$$

へ収束する理由を、中心化二乗増分とRiemann和へ分けて説明せよ。

<!-- solution-start -->
### 詳細解答

$$
\sum f''(B_{t_{k-1}})(\Delta B_k)^2
=
\sum f''(B_{t_{k-1}})\Delta t_k
+
\sum f''(B_{t_{k-1}})\{(\Delta B_k)^2-\Delta t_k\}.
$$

第1項はpath連続性からRiemann和として積分へ収束。第2項はpredictable係数付き二次変分補題から $L^2$ で0へ収束。

### 本番答案

「$\Delta B^2=\Delta t+$中心化誤差」と分解し、前者をRiemann和、後者をL2誤差として処理する。

### 採点基準（20点）
- 分解：8点
- Riemann和：5点
- weighted QV：7点
<!-- solution-end -->

## F0-00SP4-B02 幾何Brown運動を解く

- Level: B
- 目安時間: 18分

$$
dX_t=\mu X_tdt+\sigma X_tdB_t,
\qquad X_0>0
$$

をItô公式で解け。

<!-- solution-start -->
### 詳細解答

$f(x)=\log x$ に対し

$$
d\log X_t
=\frac1{X_t}dX_t-\frac12\frac1{X_t^2}(dX_t)^2
=\left(\mu-\frac12\sigma^2\right)dt+\sigma dB_t.
$$

積分して指数を取る。

### 本番答案

$\log X$ にItô公式を適用し、$d\log X=(\mu-\sigma^2/2)dt+\sigma dB$ を積分する。

### 採点基準（20点）
- Itô公式：8点
- 補正項：6点
- 解：6点
<!-- solution-end -->

## F0-00SP4-B03 Picard反復の差分評価

- Level: B
- 目安時間: 22分

global Lipschitz係数のPicard反復について

$$
D_n(t)\le C_T\int_0^tD_{n-1}(s)ds
$$

から

$$
D_n(T)\le D_0(T)\frac{(C_TT)^n}{n!}
$$

を導き、反復列がCauchyになる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

積分不等式を帰納的に反復するとn重単体積分の体積 $T^n/n!$ が現れる。従って上のfactorial boundを得る。また

$$
\|X^{(n+1)}-X^{(n)}\|_{\sup_tL^2}\le\sqrt{D_n(T)}
$$

で、$\sum_n(C^n/n!)^{1/2}<\infty$ だから差分級数が絶対収束しCauchy。

### 本番答案

Volterra型不等式をn回反復して $T^n/n!$ を得て、平方根の級数が収束することを使う。

### 採点基準（20点）
- 反復：8点
- factorial：6点
- Cauchy判定：6点
<!-- solution-end -->

---

## 章末チェック

- simple predictable processとItô積分を定義できる。
- Itô isometryをcross term消失から証明できる。
- $\mathcal H_T^2$ のcompletionとして一般Itô積分を構成できる。
- Itô積分過程の連続martingale版が得られる理由を説明できる。
- Brown運動C²版Itô公式をTaylor展開と二次変分から証明できる。
- 一般Itô process版へsimple近似で拡張できる。
- SDEを積分方程式として定義できる。
- global Lipschitz SDEの存在一意性をPicard反復・Itô isometry・Gronwallで証明できる。
- 幾何Brown運動とOU過程をItô公式で解ける。
