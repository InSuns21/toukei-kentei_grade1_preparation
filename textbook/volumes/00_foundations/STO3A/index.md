# STO3A：経路全体の収束とランダムウォークの Brown 運動極限

通常教材 [E2-04](../../05_engineering/E2_04_ブラウン運動_拡散極限/index.md) では、ランダムウォークを時間方向に $n$、空間方向に $\sqrt n$ で縮尺すると Brown 運動が現れることを説明し、「厳密には関数型中心極限定理が必要」としました。

本章ではその橋を閉じます。

中心となる考えは二つです。

1. **有限個の時刻だけを見る**と、[中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)から Brown 運動の有限次元分布が現れる。
2. **経路全体が暴れない**ことを、確率質量を compact set に押し込める制御で示す。

有限次元分布の収束だけでは、時刻の間で激しく振動する経路を排除できません。本章の主定理は

$$
\text{finite-dimensional convergence}
+
\text{compactness control}
$$

を組み合わせて、確率変数の[中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)を **経路全体の中心極限定理**へ持ち上げます。

---

## 1. 経路そのものを確率変数とみなす

<a id="def-sto3a-function-space"></a>

<!-- formal-statement-start -->
> **定義（連続経路空間）**  
> 
$$
C([0,1])
=
\{f:[0,1]\to\mathbb R:f\text{ は連続}\}
$$
>
> に sup 距離
>
$$
d_\infty(f,g)
=
\|f-g\|_\infty
=
\sup_{0\le t\le1}|f(t)-g(t)|
$$
>
> を入れる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto3a-function-space -->
### 直接例：$t$ と $t^2$ の sup 距離

**定義の確認**

$f(t)=t$, $g(t)=t^2$ はともに $[0,1]$ 上連続なので $C([0,1])$ の元です。また
$$
d_\infty(f,g)
=
\sup_{0\le t\le1}(t-t^2)
=
\frac14,
$$
最大値は $t=1/2$ で達成されます。従って sup 距離が「経路全体で最も離れる量」を測ることを直接確認できます。
<!-- definition-example-end -->

確率過程 $X=(X_t)_{0\le t\le1}$ の標本路がほとんど確実に連続なら、

$$
\omega\longmapsto X(\omega)
$$

を $C([0,1])$ 値確率変数とみなせます。

<a id="def-sto3a-function-weak-convergence"></a>

<!-- formal-statement-start -->
> **定義（経路空間上の弱収束）**  
> $C([0,1])$ 値確率変数 $X_n,X$ について
>
$$
X_n\Rightarrow X
$$
>
> とは、任意の bounded continuous function
>
$$
F:C([0,1])\to\mathbb R
$$
>
> に対し
>
$$
E[F(X_n)]\to E[F(X)]
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto3a-function-weak-convergence -->
### 直接例：決定論的経路の弱収束

**定義の確認**

$X_n(t)=t/n$, $X(t)=0$ を確率1で取る決定論的経路とします。すると
$$
\|X_n-X\|_\infty=\frac1n\to0.
$$
任意の有界連続汎関数 $F:C([0,1])\to\mathbb R$ に対し連続性から $F(X_n)\to F(X)$ なので、
$$
E[F(X_n)]=F(X_n)\to F(X)=E[F(X)].
$$
従って定義どおり $X_n\Rightarrow X$ です。
<!-- definition-example-end -->

固定時刻 $t$ で評価する写像

$$
e_t(f)=f(t)
$$

は

$$
|e_t(f)-e_t(g)|
\le
\|f-g\|_\infty
$$

なので 1-Lipschitz、特に連続です。

したがって経路空間上の弱収束が分かれば、任意の有限個の時刻における分布収束が従います。

逆向きは一般には偽です。その不足を埋めるのが tightness です。

---

## 2. 確率質量を compact set に押し込める

<a id="def-sto3a-tightness"></a>

<!-- formal-statement-start -->
> **定義（tightness）**  
> $C([0,1])$ 上の確率測度列 $(\mu_n)$ が tight であるとは、任意の $\varepsilon>0$ に対し compact set $K_\varepsilon\subset C([0,1])$ が存在して
>
$$
\inf_n\mu_n(K_\varepsilon)\ge1-\varepsilon
$$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto3a-tightness -->
### 直接例：一点に集中する確率測度列

**定義の確認**

$f\in C([0,1])$ を固定し、全ての $n$ で $\mu_n=\delta_f$ とします。任意の $\varepsilon>0$ に対し
$$
K_\varepsilon=\{f\}
$$
と取れば、一点集合は compact で
$$
\inf_n\mu_n(K_\varepsilon)=1\ge1-\varepsilon.
$$
従って $(\mu_n)$ は tight です。
<!-- definition-example-end -->

経路の compactness を判定するため、modulus of continuity を

$$
\omega_f(\delta)
=
\sup_{\substack{s,t\in[0,1]\\|t-s|\le\delta}}
|f(t)-f(s)|
$$

と定めます。

<a id="thm-sto3a-compact-modulus"></a>

<!-- formal-statement-start -->
> **定理（連続経路空間の compactness criterion）**  
> $K\subset C([0,1])$ が相対 compact であるための十分条件は
>
> 1. ある $R<\infty$ が存在して $\sup_{f\in K}|f(0)|\le R$、
> 2. 
>
$$
\lim_{\delta\downarrow0}
\sup_{f\in K}\omega_f(\delta)=0
$$
>
> である。
>
> $K$ がさらに閉なら compact である。
<!-- formal-statement-end -->

これは Arzelà--Ascoli の $C([0,1])$ 版です。本章で必要な部分を直接証明します。

<!-- proof-start -->
### 証明

$K$ の任意の列 $(f_n)$ を取ります。

有理数全体と端点からなる可算稠密集合を

$$
D=\{r_1,r_2,\ldots\}\subset[0,1]
$$

とします。

条件1と条件2の共通 modulus 条件から、各固定 $r_j$ における値列 $(f_n(r_j))$ は有界です。Bolzano--Weierstrass と対角抽出により、部分列を取り直して

$$
f_n(r_j)
$$

が全ての $j$ について収束するようにできます。

次にこの部分列が sup norm で Cauchy であることを示します。

$\varepsilon>0$ を取ります。条件2から、ある $\delta>0$ が存在して全ての $f\in K$ について

$$
|s-t|\le\delta
\Longrightarrow
|f(s)-f(t)|<\frac{\varepsilon}{3}.
$$

有限個の点 $r_{j_1},\ldots,r_{j_m}\in D$ を選び、$[0,1]$ を半径 $\delta$ の近傍で覆います。

各 $r_{j_\ell}$ では値列が収束するため、十分大きい $n,n'$ に対し

$$
|f_n(r_{j_\ell})-f_{n'}(r_{j_\ell})|
<
\frac{\varepsilon}{3}
$$

が全ての $\ell$ で成り立ちます。

任意の $t\in[0,1]$ に対し $|t-r_{j_\ell}|<\delta$ となる点を一つ選ぶと

$$
\begin{aligned}
|f_n(t)-f_{n'}(t)|
&\le
|f_n(t)-f_n(r_{j_\ell})|\\
&\quad+
|f_n(r_{j_\ell})-f_{n'}(r_{j_\ell})|\\
&\quad+
|f_{n'}(r_{j_\ell})-f_{n'}(t)|\\
&<
\varepsilon.
\end{aligned}
$$

従って $(f_n)$ は sup norm で Cauchy です。

$C([0,1])$ は sup norm に関して完備なので、ある連続関数 $f$ へ一様収束します。したがって任意の列から収束部分列を取れ、相対 compact です。

$K$ が閉なら極限も $K$ に属するため compact です。
<!-- proof-end -->

---

## 3. tightness を modulus で判定する

<a id="thm-sto3a-tightness-modulus"></a>

<!-- formal-statement-start -->
> **定理（連続過程の tightness criterion）**  
> $C([0,1])$ 値確率変数 $X_n$ が
>
> 1. $X_n(0)$ の族が tight、
> 2. 任意の $\eta>0$ に対し
>
$$
\lim_{\delta\downarrow0}
\sup_n
P\bigl(\omega_{X_n}(\delta)>\eta\bigr)
=0
$$
>
> を満たすなら、$\{\operatorname{Law}(X_n)\}$ は tight である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varepsilon>0$ を固定します。

まず $X_n(0)$ の tightness から $R<\infty$ を取り

$$
\sup_nP(|X_n(0)|>R)<\frac{\varepsilon}{2}.
$$

次に $\eta_m=2^{-m}$ とします。仮定2から、各 $m$ に対し $\delta_m>0$ を

$$
\sup_n
P\bigl(
\omega_{X_n}(\delta_m)>2^{-m}
\bigr)
<
\varepsilon 2^{-(m+1)}
$$

となるように取れます。必要なら $\delta_m\downarrow0$ としてよいです。

集合

$$
K
=
\left\{
f\in C([0,1]):
|f(0)|\le R,\ 
\omega_f(\delta_m)\le2^{-m}
\text{ for all }m
\right\}
$$

を考えます。

条件の不等号を $\le$ で書いているので $K$ は閉です。また

$$
\sup_{f\in K}\omega_f(\delta_m)\le2^{-m}\to0
$$

なので、前節の compactness criterion により $K$ は compact です。

[union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) から

$$
\begin{aligned}
P(X_n\notin K)
&\le
P(|X_n(0)|>R)
+
\sum_{m=1}^{\infty}
P\bigl(\omega_{X_n}(\delta_m)>2^{-m}\bigr)\\
&<
\frac{\varepsilon}{2}
+
\sum_{m=1}^{\infty}
\varepsilon2^{-(m+1)}\\
&=
\varepsilon.
\end{aligned}
$$

したがって $\inf_nP(X_n\in K)\ge1-\varepsilon$ で、tightness が従います。
<!-- proof-end -->

---

## 4. 四次モーメントから tightness を得る

<a id="thm-sto3a-kolmogorov-tightness"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov 型 tightness criterion）**  
> $X_n(0)=0$ a.s. とし、ある $C<\infty$, $\beta>0$ が存在して全ての $n$ と $0\le s<t\le1$ について
>
$$
E|X_n(t)-X_n(s)|^4
\le
C|t-s|^{1+\beta}
$$
>
> が成り立つとする。このとき $\{X_n\}$ は $C([0,1])$ で tight である。
<!-- formal-statement-end -->

本章で使うのは $\beta=1$ の場合です。

### 証明の見取り図

二進格子で隣接増分が大きい確率を Markov 不等式で抑えます。

レベル $m$ には $2^m$ 個の隣接増分があります。一個あたりの四次モーメントが $2^{-m(1+\beta)}$ で落ちるので、[union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) 後にも $2^{-m\beta}$ が残ります。

<!-- proof-start -->
### 証明

$0<\gamma<\beta/4$ を固定します。二進格子

$$
D_m=\{k2^{-m}:0\le k\le2^m\}
$$

を考えます。

悪い事象を

$$
A_{n,m}
=
\left\{
\max_{0\le k<2^m}
\left|
X_n((k+1)2^{-m})-X_n(k2^{-m})
\right|
>
2^{-\gamma m}
\right\}
$$

とします。

Markov 不等式と [union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) から

$$
\begin{aligned}
P(A_{n,m})
&\le
\sum_{k=0}^{2^m-1}
\frac{
E|X_n((k+1)2^{-m})-X_n(k2^{-m})|^4
}{
2^{-4\gamma m}
}\\
&\le
2^m
\frac{
C2^{-m(1+\beta)}
}{
2^{-4\gamma m}
}\\
&=
C2^{-m(\beta-4\gamma)}.
\end{aligned}
$$

$\beta-4\gamma>0$ なので、右辺は $m$ について可算和可能です。

ある $m_0$ 以降の全レベルで $A_{n,m}$ が起きないとします。二進展開を使った chaining により、任意の二進点 $s,t$ で

$$
|t-s|\le2^{-m_0}
$$

なら

$$
|X_n(t)-X_n(s)|
\le
C_\gamma 2^{-\gamma m_0}
$$

と評価できます。実際、各点を一段細かい二進点へ順に移すと、レベル $m$ で必要な増分は高々定数個であり、

$$
\sum_{m=m_0}^{\infty}2^{-\gamma m}
=
\frac{2^{-\gamma m_0}}{1-2^{-\gamma}}
$$

で抑えられます。

標本路の連続性からこの評価は全ての $s,t$ へ延長できます。

従って任意の $\eta>0$ に対し、$m_0$ を十分大きく取って

$$
C_\gamma2^{-\gamma m_0}<\eta
$$

とすれば

$$
\begin{aligned}
\sup_n
P\bigl(
\omega_{X_n}(2^{-m_0})>\eta
\bigr)
&\le
\sup_n
\sum_{m=m_0}^{\infty}P(A_{n,m})\\
&\le
C
\sum_{m=m_0}^{\infty}
2^{-m(\beta-4\gamma)}
\to0.
\end{aligned}
$$

前節の modulus criterion から tightness が従います。
<!-- proof-end -->

---

## 5. 折れ線補間で経路を作る

$X_1,X_2,\ldots$ を独立同分布とし

$$
E[X_1]=0,
\qquad
\operatorname{Var}(X_1)=\sigma^2\in(0,\infty)
$$

とします。

累積和を

$$
S_k=X_1+\cdots+X_k,
\qquad
S_0=0
$$

とします。

<a id="def-sto3a-polygonal-walk"></a>

<!-- formal-statement-start -->
> **定義（polygonal random-walk 経路）**  
> $0\le t\le1$ に対し
>
$$
k=\lfloor nt\rfloor,
\qquad
\theta=nt-k
$$
>
> とおき、
>
$$
W_n(t)
=
\frac{
S_k+\theta X_{k+1}
}{\sigma\sqrt n}
$$
>
> と定める。ただし $t=1$ では $W_n(1)=S_n/(\sigma\sqrt n)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto3a-polygonal-walk -->
### 直接例：2歩の polygonal 経路

**定義の確認**

$n=2$, $\sigma=1$ とし、一つの標本で $X_1=1$, $X_2=-1$ が得られたとします。すると $S_0=0,S_1=1,S_2=0$ です。$t=1/4$ では
$$
k=\lfloor2t\rfloor=0,
\qquad
\theta=2t-k=\frac12,
$$
したがって
$$
W_2(1/4)
=
\frac{0+(1/2)\cdot1}{\sqrt2}
=
\frac1{2\sqrt2}.
$$
同様に格子点では $W_2(0)=0$, $W_2(1/2)=1/\sqrt2$, $W_2(1)=0$ となり、その間を直線補間した連続経路です。
<!-- definition-example-end -->

各 $W_n$ は格子点

$$
\left(\frac{k}{n},\frac{S_k}{\sigma\sqrt n}\right)
$$

を直線で結んだ連続経路です。

---

## 6. 有限次元分布は Brown 運動へ収束する

<a id="prop-sto3a-fdd-convergence"></a>

<!-- formal-statement-start -->
> **命題（polygonal random walk の有限次元収束）**  
> 任意の
>
$$
0=t_0<t_1<\cdots<t_m\le1
$$
>
> に対し
>
$$
\bigl(W_n(t_1),\ldots,W_n(t_m)\bigr)
\xrightarrow{d}
\bigl(B_{t_1},\ldots,B_{t_m}\bigr),
$$
>
> ここで $B$ は standard Brown 運動である。
<!-- formal-statement-end -->

### 証明の見取り図

値そのものより増分を見ると、異なる時間区間に属する和は独立です。

各区間の和へ 独立同分布 [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)を使い、極限増分が

$$
N(0,t_j-t_{j-1})
$$

になることを示します。

<!-- proof-start -->
### 証明

まず補間誤差を無視した格子過程

$$
\widetilde W_n(t)
=
\frac{S_{\lfloor nt\rfloor}}{\sigma\sqrt n}
$$

を考えます。

区間 $j$ の増分は

$$
\widetilde W_n(t_j)-\widetilde W_n(t_{j-1})
=
\frac{
S_{\lfloor nt_j\rfloor}
-
S_{\lfloor nt_{j-1}\rfloor}
}{\sigma\sqrt n}.
$$

異なる $j$ では使う $X_k$ が重ならないので、これらの増分は独立です。

項数を

$$
r_{n,j}
=
\lfloor nt_j\rfloor-\lfloor nt_{j-1}\rfloor
$$

とすると

$$
\frac{r_{n,j}}{n}\to t_j-t_{j-1}.
$$

$r_{n,j}\to\infty$ の場合、

$$
\frac{
S_{\lfloor nt_j\rfloor}
-
S_{\lfloor nt_{j-1}\rfloor}
}{\sigma\sqrt{r_{n,j}}}
\xrightarrow{d}N(0,1)
$$

が [独立同分布 [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)](../F0_00P6A_iid_中心極限定理/index.md) から従います。

したがって

$$
\widetilde W_n(t_j)-\widetilde W_n(t_{j-1})
\xrightarrow{d}
N(0,t_j-t_{j-1}).
$$

独立性が有限 $n$ で成り立つため joint characteristic function は積に分かれ、極限でも増分は互いに独立です。

よって増分ベクトルは Brown 運動の増分ベクトルへ収束します。累積和の線形写像を適用すれば値ベクトルの収束が従います。

最後に補間誤差を処理します。固定 $t$ に対し

$$
|W_n(t)-\widetilde W_n(t)|
\le
\frac{|X_{\lfloor nt\rfloor+1}|}{\sigma\sqrt n}.
$$

任意の $\varepsilon>0$ について

$$
P\left(
\frac{|X_1|}{\sigma\sqrt n}>\varepsilon
\right)
\le
\frac{E[X_1^2]}{\varepsilon^2\sigma^2n}
=
\frac1{\varepsilon^2n}
\to0.
$$

従って各固定時刻で補間誤差は確率収束で0へ行き、有限個の時刻について同時にも0へ行きます。

以上から polygonal process $W_n$ の有限次元分布は Brown 運動のそれへ収束します。
<!-- proof-end -->

---

## 7. bounded increments なら四次モーメントで tightness

まず $|X_1|\le M$ a.s. の場合を扱います。

<a id="lem-sto3a-bounded-fourth-increment"></a>

<!-- formal-statement-start -->
> **補題（bounded increments の四次増分評価）**  
> $Y_i$ が独立同分布、平均0、$|Y_i|\le M$ a.s. とし、固定した $c>0$ に対して
>
$$
V_n(t)
=
\frac{
T_{\lfloor nt\rfloor}
+(nt-\lfloor nt\rfloor)Y_{\lfloor nt\rfloor+1}
}{c\sqrt n},
\qquad
T_k=Y_1+\cdots+Y_k
$$
>
> とする。このとき、ある $C_{M,c}<\infty$ が存在して
>
$$
E|V_n(t)-V_n(s)|^4
\le
C_{M,c}|t-s|^2
$$
>
> が全ての $n$ と $0\le s<t\le1$ について成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V_n(t)-V_n(s)$ は、独立な $Y_j$ の線形結合として

$$
V_n(t)-V_n(s)
=
\frac1{c\sqrt n}
\sum_j a_jY_j
$$

と書けます。各係数は

$$
0\le a_j\le1,
$$

で、区間 $[s,t]$ が各格子区間をどれだけ横切るかを表し、

$$
\sum_j a_j=n(t-s)
$$

を満たします。

平均0の独立変数の四次モーメント展開から

$$
E\left(\sum_ja_jY_j\right)^4
=
\sum_j a_j^4E[Y_j^4]
+
6\sum_{i<j}a_i^2a_j^2E[Y_i^2]E[Y_j^2].
$$

$|Y_j|\le M$ なので $E[Y_j^4]\le M^4$ であり、二次モーメントも有限です。従って $M$ と分布だけに依存する定数 $C_M$ に対して

$$
E\left(\sum_ja_jY_j\right)^4
\le
C_M\left(\sum_ja_j^2\right)^2.
$$

$q=n(t-s)$ とします。

$q\ge1$ なら $a_j^2\le a_j$ なので

$$
\sum_ja_j^2\le q.
$$

$q<1$ なら全係数の総和が $q$ なので

$$
\sum_ja_j^2
\le
\left(\sum_ja_j\right)^2
=
q^2.
$$

従ってどちらの場合も

$$
\left(\sum_ja_j^2\right)^2
\le
q^2
=
n^2(t-s)^2.
$$

よって

$$
E|V_n(t)-V_n(s)|^4
\le
\frac{C_M}{c^4n^2}
n^2(t-s)^2
=
C_{M,c}(t-s)^2.
$$
<!-- proof-end -->

<a id="cor-sto3a-bounded-tightness"></a>

<!-- formal-statement-start -->
> **系（bounded increments の tightness）**  
> 上の補題の仮定のもとで $\{V_n\}$ は $C([0,1])$ 上で tight である。
<!-- formal-statement-end -->

四次増分評価に [Kolmogorov 型 tightness criterion](#thm-sto3a-kolmogorov-tightness) を $\beta=1$ で適用すれば直ちに従います。

---

## 8. 有限分散だけの場合：固定有界化で戻す

本当に欲しい Donsker の仮定は

$$
E[X_1]=0,
\qquad
E[X_1^2]=\sigma^2<\infty
$$

だけです。

固定 $M>0$ に対し

$$
X_i^{(M)}
=
X_i1_{\{|X_i|\le M\}}
-
E[X_1 1_{\{|X_1|\le M\}}]
$$

と置きます。

これは bounded で平均0です。

差を

$$
R_i^{(M)}
=
X_i-X_i^{(M)}
$$

とすると、$E[X_i]=0$ なので

$$
R_i^{(M)}
=
X_i1_{\{|X_i|>M\}}
-
E[X_1 1_{\{|X_1|>M\}}],
$$

従って平均0です。

<a id="lem-sto3a-tail-variance"></a>

<!-- formal-statement-start -->
> **補題（有界化残差の分散は0へ行く）**  
> 
$$
v_M
:=
E[(R_1^{(M)})^2]
\to0
\qquad(M\to\infty).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

分散は二次モーメント以下なので

$$
v_M
\le
E\left[
X_1^2 1_{\{|X_1|>M\}}
\right].
$$

$X_1^2$ は可積分で、指示関数は点ごとに0へ行くため、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から右辺は0へ行きます。

<!-- proof-end -->

---

## 9. tail process は一様に小さい

$X_i^{(M)}$ から作る polygonal process を $W_n^{(M)}$ とします。ただし正規化は元の $\sigma\sqrt n$ を使います。

差は $R_i^{(M)}$ の累積和の polygonal interpolation です。

<a id="lem-sto3a-bounded-uniform"></a>

<!-- formal-statement-start -->
> **補題（有界化の一様近似）**  
> 任意の $\varepsilon>0$ に対し
>
$$
\lim_{M\to\infty}
\sup_{n\ge1}
P\left(
\|W_n-W_n^{(M)}\|_\infty>\varepsilon
\right)
=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
Q_k^{(M)}
=
\sum_{i=1}^{k}R_i^{(M)}
$$

とします。平均0独立増分なので $(Q_k^{(M)})_{k\le n}$ は離散時間 martingale です。

polygonal interpolation の各区間では値は二端点の凸結合なので

$$
\|W_n-W_n^{(M)}\|_\infty
\le
\frac1{\sigma\sqrt n}
\max_{0\le k\le n}|Q_k^{(M)}|.
$$

[Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal) を二乗 martingale に適用すると、ある普遍定数 $C$ に対し

$$
P\left(
\max_{k\le n}|Q_k^{(M)}|
>
\varepsilon\sigma\sqrt n
\right)
\le
\frac{
C E[(Q_n^{(M)})^2]
}{
\varepsilon^2\sigma^2 n
}.
$$

独立性と平均0から

$$
E[(Q_n^{(M)})^2]
=
nv_M.
$$

従って

$$
P\left(
\|W_n-W_n^{(M)}\|_\infty>\varepsilon
\right)
\le
\frac{Cv_M}{\varepsilon^2\sigma^2}.
$$

右辺は $n$ に依存せず、$M\to\infty$ で0へ行きます。
<!-- proof-end -->

---

## 10. 一般有限分散版の tightness

<a id="thm-sto3a-finite-variance-tightness"></a>

<!-- formal-statement-start -->
> **定理（有限分散 random walk 経路の tightness）**  
> $E[X_1]=0$, $0<\operatorname{Var}(X_1)=\sigma^2<\infty$ とする。このとき polygonal process $(W_n)$ は $C([0,1])$ 上で tight である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\eta>0$ と $\varepsilon>0$ を固定します。

有界化 approximation により、$M$ を十分大きく選べば

$$
\sup_n
P\left(
\|W_n-W_n^{(M)}\|_\infty>\frac{\eta}{3}
\right)
<
\frac{\varepsilon}{2}.
$$

固定した $M$ では $X_i^{(M)}$ は bounded なので、前節の tightness からある $\delta>0$ を選び

$$
\sup_n
P\left(
\omega_{W_n^{(M)}}(\delta)>\frac{\eta}{3}
\right)
<
\frac{\varepsilon}{2}.
$$

sup norm が $\eta/3$ 以下なら

$$
\omega_{W_n}(\delta)
\le
\omega_{W_n^{(M)}}(\delta)
+
2\|W_n-W_n^{(M)}\|_\infty.
$$

従って

$$
\begin{aligned}
P(\omega_{W_n}(\delta)>\eta)
&\le
P\left(
\omega_{W_n^{(M)}}(\delta)>\frac{\eta}{3}
\right)\\
&\quad+
P\left(
\|W_n-W_n^{(M)}\|_\infty>\frac{\eta}{3}
\right)\\
&<
\varepsilon.
\end{aligned}
$$

$W_n(0)=0$ なので初期値の tightness は自明です。modulus criterion から $(W_n)$ は tight です。
<!-- proof-end -->

---

## 11. 確率変数の極限を経路全体へ持ち上げる

<a id="thm-sto3a-donsker"></a>

<!-- formal-statement-start -->
> **定理（Donsker 不変原理：独立同分布 有限分散版）**  
> $X_1,X_2,\ldots$ を独立同分布とし
>
$$
E[X_1]=0,
\qquad
0<\operatorname{Var}(X_1)=\sigma^2<\infty.
$$
>
> 累積和から作る polygonal process
>
$$
W_n(t)
=
\frac{
S_{\lfloor nt\rfloor}
+(nt-\lfloor nt\rfloor)X_{\lfloor nt\rfloor+1}
}{\sigma\sqrt n}
$$
>
> は $C([0,1])$ 上で standard Brown 運動 $B$ へ弱収束する。
>
$$
\boxed{
W_n\Rightarrow B
\quad\text{in }C([0,1]).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

すでに

1. 有限次元分布 $\Rightarrow$ Brownian fdds、
2. $(W_n)$ は tight、

まで示しました。

残る一般論は「tight な確率測度列から弱収束部分列を取り出せる」という Prokhorov theorem です。

### Prokhorov theorem を使うための空間確認

$C([0,1])$ は sup metric で完備です。実際、sup norm Cauchy 列は一様収束し、一様極限は連続です。

また可算稠密部分集合を持ちます。区分点と値が全て有理数である piecewise-linear function 全体は可算です。任意の連続関数は compact interval 上で、十分細かい共通分割を取れば各小区間での振幅を一斉に小さくできます。そこで格子点の値を有理数で近似して線形補間すれば、sup norm で任意精度に近似できます。

従って $C([0,1])$ は separable complete metric space、すなわち Polish space です。

### 意図的黒箱：Prokhorov theorem

このような空間では、

> tight な確率測度列の任意の列から弱収束部分列を取れる

という Prokhorov theorem を使います。

この定理の一般証明は確率測度の弱収束論を一章分必要とするため、本章ではこの一点だけを意図的黒箱とします。Donsker 固有の核心である finite-dimensional convergence と tightness は本文で閉じています。

<!-- proof-start -->
### 証明

任意の部分列 $(W_{n_\ell})$ を取ります。

finite-variance tightness theorem により、その law は tight です。Prokhorov theorem からさらに部分列 $(W_{n_{\ell_r}})$ と $C([0,1])$ 上の確率測度 $\mu$ が存在して

$$
W_{n_{\ell_r}}\Rightarrow\mu
$$

となります。

固定した有限個の時刻

$$
0\le t_1<\cdots<t_m\le1
$$

を取ります。

評価写像

$$
f\mapsto(f(t_1),\ldots,f(t_m))
$$

は sup norm に関して連続なので、continuous mapping theorem により $\mu$ の有限次元分布は $(W_{n_{\ell_r}})$ の有限次元分布の極限です。

一方、finite-dimensional convergence theorem によりその極限は

$$
(B_{t_1},\ldots,B_{t_m})
$$

の分布です。

従って $\mu$ は Brown 運動と全ての有限次元分布が一致します。

$C([0,1])$ の Borel $\sigma$-代数は評価写像による cylinder sets で生成されるため、連続経路上の確率測度は有限次元分布で一意に決まります。よって $\mu$ は standard Brownian law です。

任意の部分列からさらに Brownian law へ収束する部分列を取れるので、元の列全体が Brownian law へ収束します。

$$
W_n\Rightarrow B.
$$
<!-- proof-end -->

---

## 12. なぜ極限は分布の細部を忘れるのか

極限 Brown 運動は $X_1$ の細かい分布形を覚えていません。

必要なのは

$$
E[X_1]=0,
\qquad
\operatorname{Var}(X_1)=\sigma^2<\infty
$$

だけです。

Bernoulli $\pm1$、一様分布、非対称だが平均0の離散分布など、微視的な一歩の分布が違っても、$\sqrt n$ スケールで見れば同じ Brownian law が現れます。

この universality が **invariance principle** という名前の意味です。

---

## 13. continuous mapping で 経路汎関数 の極限を得る

Donsker が強いのは、各時刻の値だけでなく経路の連続汎関数へそのまま使えることです。

例えば

$$
F(f)=\max_{0\le t\le1}f(t)
$$

は

$$
|F(f)-F(g)|
\le
\|f-g\|_\infty
$$

なので 1-Lipschitz です。

従って Donsker と continuous mapping theorem から

$$
\max_{0\le t\le1}W_n(t)
\xrightarrow{d}
\max_{0\le t\le1}B_t.
$$

random walk の最大値分布を Brownian [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) へ接続できるのは、単なる一時刻 [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) ではなく 経路空間 convergence があるからです。

---

# 14. 演習 A

<a id="ex-sto3a-a01"></a>

## STO3A-A01 評価写像の連続性

- Level: A

固定した $t\in[0,1]$ に対し $e_t(f)=f(t)$ が $C([0,1])$ 上 1-Lipschitz であることを示せ。

<!-- solution-start -->
### 詳細解答

任意の $f,g\in C([0,1])$ に対し

$$
|e_t(f)-e_t(g)|
=
|f(t)-g(t)|
\le
\sup_{0\le u\le1}|f(u)-g(u)|
=
\|f-g\|_\infty.
$$

従って Lipschitz 定数1です。特に連続なので、経路空間 weak convergence から固定時刻の分布収束を取り出せます。
<!-- solution-end -->

<a id="ex-sto3a-a02"></a>

## STO3A-A02 bounded increment の四次展開

- Level: A

独立・平均0の $Y_1,\ldots,Y_m$ に対し

$$
E\left(\sum_{j=1}^{m}Y_j\right)^4
=
\sum_jE[Y_j^4]
+
6\sum_{i<j}E[Y_i^2]E[Y_j^2]
$$

を示せ。

<!-- solution-start -->
### 詳細解答

四乗を展開すると

$$
\left(\sum_jY_j\right)^4
$$

には添字の現れ方が

- 4回同じ、
- 3回と1回、
- 2回と2回、
- 2回と1回と1回、
- 全て異なる

の場合があります。

独立性と $E[Y_j]=0$ により、どこかの変数が奇数回だけ現れる項の期待値は0です。

残るのは

$$
\sum_jY_j^4
$$

と、$i\ne j$ に対する $Y_i^2Y_j^2$ です。

$Y_i^2Y_j^2$ は四乗展開で $\binom42=6$ 回現れるので

$$
E\left(\sum_jY_j\right)^4
=
\sum_jE[Y_j^4]
+
6\sum_{i<j}E[Y_i^2Y_j^2].
$$

独立性から

$$
E[Y_i^2Y_j^2]
=
E[Y_i^2]E[Y_j^2].
$$

従って結論を得ます。
<!-- solution-end -->

<a id="ex-sto3a-a03"></a>

## STO3A-A03 有界化 tail の分散

- Level: A

$E[X]=0$, $E[X^2]<\infty$ とし

$$
R^{(M)}
=
X1_{\{|X|>M\}}
-
E[X1_{\{|X|>M\}}]
$$

とする。$E[(R^{(M)})^2]\to0$ を示せ。

<!-- solution-start -->
### 詳細解答

$R^{(M)}$ は $X1_{\{|X|>M\}}$ を中心化した変数なので

$$
E[(R^{(M)})^2]
=
\operatorname{Var}\left(
X1_{\{|X|>M\}}
\right)
\le
E\left[
X^2 1_{\{|X|>M\}}
\right].
$$

右辺の integrand は $M\to\infty$ で点ごとに0へ行き、

$$
0\le X^2 1_{\{|X|>M\}}\le X^2.
$$

$E[X^2]<\infty$ なので[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から右辺は0へ行きます。
<!-- solution-end -->

<a id="ex-sto3a-a04"></a>

## STO3A-A04 最大値 functional

- Level: A

$$
F(f)=\max_{0\le t\le1}f(t)
$$

が sup norm に関して 1-Lipschitz であることを示せ。

<!-- solution-start -->
### 詳細解答

任意の $t$ について

$$
f(t)
\le
g(t)+\|f-g\|_\infty
\le
\max_ug(u)+\|f-g\|_\infty.
$$

$t$ について最大を取ると

$$
\max_tf(t)
\le
\max_tg(t)+\|f-g\|_\infty.
$$

$f,g$ を入れ替えると

$$
\max_tg(t)
\le
\max_tf(t)+\|f-g\|_\infty.
$$

従って

$$
|F(f)-F(g)|
\le
\|f-g\|_\infty.
$$
<!-- solution-end -->

# 15. 演習 B

<a id="ex-sto3a-b01"></a>

## STO3A-B01 finite-dimensional convergence を増分から組み立てる

- Level: B

$0<t_1<t_2\le1$ とする。

1. 
   $$
   W_n(t_1),
   \qquad
   W_n(t_2)-W_n(t_1)
   $$
   の極限分布を求めよ。
2. 二つの増分が漸近的ではなく有限 $n$ の格子版ですでに独立である理由を説明せよ。
3. $(W_n(t_1),W_n(t_2))$ の極限共分散が $t_1$ になることを示せ。

<!-- solution-start -->
### 詳細解答

補間を一旦除いた格子過程で考えます。

1. 第1区間には約 $nt_1$ 個の 独立同分布 increment が入り、第2区間には約 $n(t_2-t_1)$ 個入ります。独立同分布 [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) より

   $$
   W_n(t_1)\xrightarrow{d}N(0,t_1),
   $$

   $$
   W_n(t_2)-W_n(t_1)
   \xrightarrow{d}
   N(0,t_2-t_1).
   $$

2. 二つの和が使う $X_k$ の添字集合は disjoint です。元の $X_k$ が独立なので二つの区間和も独立です。この独立性は極限を取る前から成立します。

3. 極限で

   $$
   B_{t_2}
   =
   B_{t_1}
   +(B_{t_2}-B_{t_1})
   $$

   で、後半増分は $B_{t_1}$ と独立です。従って

   $$
   \operatorname{Cov}(B_{t_1},B_{t_2})
   =
   \operatorname{Var}(B_{t_1})
   =
   t_1.
   $$

   これは Brown covariance $\min(t_1,t_2)=t_1$ と一致します。
<!-- solution-end -->

<a id="ex-sto3a-b02"></a>

## STO3A-B02 有界化 から modulus tightness へ

- Level: B

$W_n$ と bounded-truncated process $W_n^{(M)}$ が

$$
\sup_n
P(\|W_n-W_n^{(M)}\|_\infty>\eta/3)
<\varepsilon/2
$$

を満たし、さらにある $\delta>0$ で

$$
\sup_n
P(\omega_{W_n^{(M)}}(\delta)>\eta/3)
<\varepsilon/2
$$

を満たすとする。

$$
\sup_nP(\omega_{W_n}(\delta)>\eta)<\varepsilon
$$

を導け。

<!-- solution-start -->
### 詳細解答

任意の $s,t$ について

$$
\begin{aligned}
|W_n(t)-W_n(s)|
&\le
|W_n^{(M)}(t)-W_n^{(M)}(s)|\\
&\quad+
|W_n(t)-W_n^{(M)}(t)|\\
&\quad+
|W_n(s)-W_n^{(M)}(s)|.
\end{aligned}
$$

従って

$$
\omega_{W_n}(\delta)
\le
\omega_{W_n^{(M)}}(\delta)
+
2\|W_n-W_n^{(M)}\|_\infty.
$$

もし右辺第1項が $\eta/3$ 以下で、第2項の sup norm が $\eta/3$ 以下なら

$$
\omega_{W_n}(\delta)
\le
\frac{\eta}{3}
+
2\frac{\eta}{3}
=
\eta.
$$

従って

$$
\{\omega_{W_n}(\delta)>\eta\}
$$

は二つの bad event の和集合に含まれます。

[union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) から

$$
P(\omega_{W_n}(\delta)>\eta)
<
\frac{\varepsilon}{2}
+
\frac{\varepsilon}{2}
=
\varepsilon.
$$

$n$ について supremum を取っても同じです。
<!-- solution-end -->

<a id="ex-sto3a-b03"></a>

## STO3A-B03 Donsker から最大値極限へ

- Level: B

対称 random walk

$$
S_k=\xi_1+\cdots+\xi_k,
\qquad
P(\xi_i=\pm1)=\frac12
$$

について

$$
M_n
=
\frac1{\sqrt n}\max_{0\le k\le n}S_k
$$

を考える。

Donsker theorem と Brownian [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) を使い、$x\ge0$ に対し $M_n$ の極限分布関数を求めよ。

<!-- solution-start -->
### 詳細解答

polygonal interpolation $W_n$ では

$$
\max_{0\le t\le1}W_n(t)
=
\frac1{\sqrt n}\max_{0\le k\le n}S_k
=
M_n.
$$

最大値 functional は sup norm で連続なので、Donsker と continuous mapping theorem から

$$
M_n
\xrightarrow{d}
\max_{0\le t\le1}B_t.
$$

STO4 の [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) から $x\ge0$ について

$$
P\left(
\max_{0\le t\le1}B_t\le x
\right)
=
1-2P(B_1>x).
$$

$B_1\sim N(0,1)$ なので

$$
P\left(
\max_{0\le t\le1}B_t\le x
\right)
=
2\Phi(x)-1.
$$

従って

$$
\boxed{
P(M_n\le x)\to2\Phi(x)-1
\qquad(x\ge0).
}
$$

一時刻 [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) だけでは random walk の最大値は直接扱えません。経路空間 convergence が必要です。
<!-- solution-end -->

# 16. 演習 C

<a id="ex-sto3a-c01"></a>

## STO3A-C01 Donsker の証明構造を最後まで再構成する

- Level: C

独立同分布 $X_i$ が

$$
E[X_i]=0,
\qquad
\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)
$$

を満たすとする。polygonal process $W_n$ について、次を順に示して Donsker theorem の証明を再構成せよ。

1. 任意の有限時刻集合で Brownian 有限次元分布 へ収束する。
2. fixed 有界化 $X_i^{(M)}$ を定義し、有界化 tail の分散 $v_M\to0$ を示す。
3. [Doob maximal inequality](../STO2/index.md#thm-sto2-doob-maximal) から
   $$
   \sup_nP(\|W_n-W_n^{(M)}\|_\infty>\varepsilon)
   \le
   \frac{Cv_M}{\varepsilon^2\sigma^2}
   $$
   を導く。
4. 固定 $M$ の bounded process について uniform fourth-moment increment bound を示す。
5. modulus criterion から元の $W_n$ の tightness を示す。
6. Prokhorov theorem で部分列極限を取り、有限次元分布 によりその極限が Brownian law に一意に定まることを説明せよ。

<!-- solution-start -->
### 詳細解答

1. 時刻
   $$
   0=t_0<t_1<\cdots<t_m
   $$
   を固定します。各区間の格子累積和は disjoint な $X_i$ を使うため独立です。それぞれに 独立同分布 [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) を適用すると
   $$
   W_n(t_j)-W_n(t_{j-1})
   \xrightarrow{d}
   N(0,t_j-t_{j-1})
   $$
   で、極限増分も独立です。累積和を取れば Brownian fdd が得られます。補間誤差は固定時刻では $X/\sqrt n\to0$ in probability なので消えます。

2. 
   $$
   X_i^{(M)}
   =
   X_i1_{\{|X_i|\le M\}}
   -
   E[X_11_{\{|X_1|\le M\}}]
   $$
   とし
   $$
   R_i^{(M)}=X_i-X_i^{(M)}
   $$
   とします。$R_i^{(M)}$ は tail を中心化した変数です。
   $$
   v_M
   =
   E[(R_i^{(M)})^2]
   \le
   E[X_i^21_{\{|X_i|>M\}}]
   \to0
   $$
   は[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から従います。

3. tail partial sum を
   $$
   Q_k^{(M)}=\sum_{i=1}^{k}R_i^{(M)}
   $$
   とします。これは martingale です。補間値は二端点の凸結合なので
   $$
   \|W_n-W_n^{(M)}\|_\infty
   \le
   \frac1{\sigma\sqrt n}\max_{k\le n}|Q_k^{(M)}|.
   $$
   [Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal)から
   $$
   P\left(
   \max_{k\le n}|Q_k^{(M)}|>\varepsilon\sigma\sqrt n
   \right)
   \le
   \frac{C E[(Q_n^{(M)})^2]}{\varepsilon^2\sigma^2n}.
   $$
   独立平均0なので $E[(Q_n^{(M)})^2]=nv_M$。従って
   $$
   \sup_nP(\|W_n-W_n^{(M)}\|_\infty>\varepsilon)
   \le
   \frac{Cv_M}{\varepsilon^2\sigma^2}.
   $$

4. $X_i^{(M)}$ は bounded なので四次モーメント有限です。区間増分を
   $$
   \frac1{\sigma\sqrt n}\sum_ja_jX_j^{(M)}
   $$
   と書き、独立平均0変数の四次展開を使います。係数について
   $$
   \sum a_j=n(t-s)
   $$
   であり、$n(t-s)\ge1$ と $<1$ を分ければ
   $$
   E|W_n^{(M)}(t)-W_n^{(M)}(s)|^4
   \le
   C_M|t-s|^2.
   $$

5. [Kolmogorov 型 tightness criterion](#thm-sto3a-kolmogorov-tightness) から固定 $M$ の $W_n^{(M)}$ は tight です。したがって任意の $\eta,\varepsilon>0$ に対し、まず $M$ を大きくして tail process を sup norm で $\eta/3$ 以下にし、次に $\delta$ を小さくして truncated process の modulus を $\eta/3$ 以下にします。
   $$
   \omega_{W_n}(\delta)
   \le
   \omega_{W_n^{(M)}}(\delta)
   +
   2\|W_n-W_n^{(M)}\|_\infty
   $$
   なので元の $W_n$ も modulus criterion を満たし、tight です。

6. 任意の部分列から Prokhorov theorem により弱収束部分列を取れます。評価写像は連続なので、その 経路空間 limit の fdd は元の fdd 極限、すなわち Brownian fdd と一致します。$C([0,1])$ の Borel $\sigma$-代数は finite evaluation cylinder で生成されるため、連続経路上の law は fdd で一意です。従って部分列極限は必ず Brownian law です。

任意の部分列から Brownian law へ収束する部分列を取れるので、列全体について

$$
\boxed{
W_n\Rightarrow B
\quad\text{in }C([0,1])
}
$$

が成り立ちます。

Donsker の本体は「[中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) を各区間へ使う部分」と「経路全体を compact に押し込める tightness」の二本柱です。
<!-- solution-end -->

---

## 17. 章末チェック

- [ ] $C([0,1])$ と sup metric を定義できる。
- [ ] 経路空間 weak convergence が finite-dimensional convergence を含む理由を評価写像で説明できる。
- [ ] tightness を compact set への確率質量集中として定義できる。
- [ ] common modulus of continuity から compactness を対角抽出で示せる。
- [ ] 四次 moment bound から [Kolmogorov 型 tightness criterion](#thm-sto3a-kolmogorov-tightness) を導ける。
- [ ] polygonal random walk の finite-dimensional convergence を独立 block [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から示せる。
- [ ] bounded increments の四次増分評価を係数 $a_j$ の和から再現できる。
- [ ] fixed 有界化 と [Doob 最大不等式](../STO2/index.md#thm-sto2-doob-maximal)で有限分散 case に戻せる。
- [ ] Donsker theorem の証明を fdd + tightness + Prokhorov + uniqueness の順に再構成できる。
- [ ] continuous mapping theorem で最大値などの 経路汎関数 へ極限を移せる。

次章 [STO4](../STO4/index.md) の Brown 運動は、ここでは「random walk の普遍的な拡散極限」としても位置付けられるようになりました。
