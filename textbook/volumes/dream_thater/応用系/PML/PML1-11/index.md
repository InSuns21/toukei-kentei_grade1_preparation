# PML1-11 Langevinの数値離散化はどこで偏るか

<!-- definition-example-audit: strict -->

[PML1-09のGibbs不変性定理](../PML1-09/index.md#thm-pml1-09-gibbs-invariant)では、温度と雑音強度が整合する連続時間のLangevin拡散を考えた。[PML1-10の詳細釣合い](../PML1-10/index.md#def-pml1-10-detailed-balance)は、分布が変化しないことよりも強い条件だった。ところが実際に計算機で標本を作るには、時刻を刻んで次の状態を更新しなければならない。**連続時間でGibbs密度を保つ方程式を、同じ係数で離散化したら、その密度は保たれるだろうか。**

本講では一つのブラウン運動の増分を正規乱数に置き換える **Euler–Maruyama法** から始め、二次損失で有限時刻の平均・分散、定常分布、刻み幅による偏りをすべて導出する。最後に連続時間の線形模型を一歩だけ**厳密に**進める方法と比較し、時間積分の誤差と平衡分布の誤差を区別する。

## 1. 連続時間の式から一歩の更新を作る

[PML1-08の過減衰Langevin方程式](../PML1-08/index.md#def-pml1-08-overdamped)を、移動度 $1$、温度 $\tau>0$ として一次元で書く。$f:\mathbb R\to\mathbb R$ は微分可能な損失である。

$$
dX_t=-f'(X_t)\,dt+\sqrt{2\tau}\,dW_t.
$$

$W_t$ は標準ブラウン運動で、$0=t_0<t_1<\cdots$ を幅 $h>0$ の等間隔格子 $t_n=nh$ とする。区間 $[t_n,t_{n+1}]$ の積分形は

$$
X_{t_{n+1}}-X_{t_n}
=-\int_{t_n}^{t_{n+1}}f'(X_s)\,ds
+\sqrt{2\tau}(W_{t_{n+1}}-W_{t_n}).
$$

**離散化で置き換える場所はドリフトの積分**である。$f'(X_s)$ を区間左端の $f'(Y_n)$ で代表させて $\int f'(X_s)\,ds$ を $h f'(Y_n)$ と近似する。一方、[定義（d 次元ブラウン運動）](../../../解析系/STO/STO7/index.md#def-sto7-vector-brownian)から、ブラウン運動の独立増分は正確に $N(0,h)$ に従うから、$\Delta W_n=\sqrt h\,\xi_{n+1}$、$\xi_n$ は独立な標準正規変数として実現できる。この二つの操作が次の更新則になる。

<a id="def-pml1-11-euler-maruyama"></a>

<!-- formal-statement-start -->
> **定義（過減衰Langevin方程式のEuler–Maruyama離散化）**  
> $\tau>0$、刻み幅 $h>0$、微分可能な $f:\mathbb R\to\mathbb R$ と、独立同分布の標準正規乱数 $\xi_1,\xi_2,\ldots$ を与える。初期値 $Y_0$ はこれらの乱数から独立とする。時刻 $t_n=nh$ の離散近似 $Y_n$ を

$$
Y_{n+1}=Y_n-hf'(Y_n)+\sqrt{2\tau h}\,\xi_{n+1}
$$

> で帰納的に定める。この更新を一次元の **Euler–Maruyama法** と呼ぶ。$h$ は物理時刻の間隔であり、$\xi_n$ の分散は $1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-11-euler-maruyama -->
**定義の確認**：$f(x)=(x-1)^2$、$\tau=3$、$h=1/4$、$Y_0=5$ とする。ここで $f'(x)=2(x-1)$ なので、初回更新ではドリフト項が $-\tfrac14\cdot 2(5-1)=-2$、雑音の標準偏差が $\sqrt{2\cdot3\cdot(1/4)}=\sqrt{3/2}$ となる。

$$
Y_1=5-2+\sqrt{3/2}\,\xi_1
=3+\sqrt{3/2}\,\xi_1.
$$

$\xi_1\sim N(0,1)$ だから $Y_1$ の平均は $3$、分散は $3/2$ である。$h$ を掛けるのはドリフト、$\sqrt h$ を掛けるのはブラウン運動の増分であり、両者を取り違えてはいけない。
<!-- definition-example-end -->

乱数を追加するだけでは定常分布が正しいとは限らない。次に、平均と分散を厳密に計算できる二次損失で、この定義を検査する。

## 2. 二次損失なら有限時刻の分布を追える

$$
f(x)=\frac{\lambda}{2}(x-a)^2,\qquad \lambda>0,\quad a\in\mathbb R
$$

と置く。$f'(x)=\lambda(x-a)$ で、[PML1-08の二次Langevin明示解](../PML1-08/index.md#thm-pml1-08-quadratic)から、連続時間の不変分布は $N(a,\tau/\lambda)$ である。離散更新を $a$ を中心として書き直すと

$$
Z_n=Y_n-a,\qquad r=1-\lambda h,\qquad q=2\tau h,
$$

$$
Z_{n+1}=rZ_n+\sqrt q\,\xi_{n+1}.
$$

$r$ は一歩で元のずれが何倍になるかを表す。$\xi_{n+1}$ はそれ以前の乱数と独立なので、$Z_n$ とも独立である。ここが分散を足せる理由になる。

<a id="thm-pml1-11-finite-moments"></a>

<!-- formal-statement-start -->
> **定理（二次模型のEuler–Maruyama有限時刻分布）**  
> $\lambda,\tau,h>0$、$a\in\mathbb R$ とし、$\xi_n$ を独立な $N(0,1)$ 変数、$Y_0=y_0$ を定数とする。Euler–Maruyama更新

$$
Y_{n+1}=Y_n-\lambda h(Y_n-a)+\sqrt{2\tau h}\,\xi_{n+1}
$$

> に対し、$r=1-\lambda h$、$q=2\tau h$ と置けば、すべての整数 $n\ge0$ について $Y_n$ は正規分布に従い、

$$
\mathbb E[Y_n]=a+r^n(y_0-a),
\qquad
\operatorname{Var}(Y_n)=q\sum_{j=0}^{n-1}r^{2j}
$$

> が成り立つ（$n=0$ の和は $0$）。$r^2\ne1$ なら分散は $q(1-r^{2n})/(1-r^2)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

毎回の雑音を初期値まで展開すると、時点 $n$ の値は独立な正規乱数の有限和になる。その平均・分散を一項ずつ計算すれば、幾何級数が現れる。

<!-- proof-start -->
### 証明

$Z_0=y_0-a$ と書き、漸化式を2回展開すると

$$
Z_1=rZ_0+\sqrt q\,\xi_1,\qquad
Z_2=r^2Z_0+\sqrt q(r\xi_1+\xi_2).
$$

同じ展開を $n$ 回繰り返して帰納法により

$$
Z_n=r^n(y_0-a)+\sqrt q\sum_{k=1}^{n}r^{n-k}\xi_k
$$

を得る。右辺は独立な正規乱数の線形結合なので正規分布である。各 $\mathbb E[\xi_k]=0$ より

$$
\mathbb E[Z_n]=r^n(y_0-a).
$$

また、異なる $k,\ell$ で $\mathbb E[\xi_k\xi_\ell]=0$、同じ $k$ で $\mathbb E[\xi_k^2]=1$ なので

$$
\begin{aligned}
\operatorname{Var}(Z_n)
&=q\,\mathbb E\left[\left(\sum_{k=1}^n r^{n-k}\xi_k\right)^2\right]\\
&=q\sum_{k=1}^n r^{2(n-k)}
=q\sum_{j=0}^{n-1}r^{2j}.
\end{aligned}
$$

$r^2\ne1$ の場合、有限幾何級数の恒等式
$(1-r^2)\sum_{j=0}^{n-1}r^{2j}=1-r^{2n}$ から表示式を得る。$n=0$ の場合も $Y_0=y_0$ は分散ゼロの退化正規分布と見れば一致する。
<!-- proof-end -->

**手計算例**：$\lambda=\tau=1$、$a=y_0=0$、$h=1/2$ では $r=1/2$、$q=1$。二歩後は $Y_2=\tfrac12\xi_1+\xi_2$ だから、平均 $0$、分散 $1/4+1=5/4$ となる。一方、連続時間の $t=1$ における分散は $1-e^{-2}$ であり、**同じ時刻まで進めても両者は一致しない**。

## 3. どの刻み幅なら定常分布に落ち着くか

連続時間では $\lambda>0$ が中心へ引き戻す力を作った。離散時間では引き戻しが $r=1-\lambda h$ に変わるため、$r$ の絶対値が $1$ 未満かどうかが重要になる。分散の式で無限和が収束する条件を確かめよう。

<a id="thm-pml1-11-stationary-law"></a>

<!-- formal-statement-start -->
> **定理（二次Euler–Maruyama鎖の定常分布と刻み幅条件）**  
> $\lambda,\tau,h>0$、$a\in\mathbb R$ とし、独立な $N(0,1)$ 乱数により

$$
Y_{n+1}=a+(1-\lambda h)(Y_n-a)+\sqrt{2\tau h}\,\xi_{n+1}
$$

> を定める。$Y_0$ は有限値を取る確率変数で未来の乱数列から独立とする。
>
> **(1)** $0<h<2/\lambda$ のとき、唯一の不変確率分布は次の正規分布であり、任意のこのような $Y_0$ からその分布へ分布収束する。

$$
\pi_h=N(a,V_h),
\qquad
V_h=\frac{2\tau h}{1-(1-\lambda h)^2}
=\frac{\tau/\lambda}{1-\lambda h/2}.
$$

> **(2)** $h\ge2/\lambda$ のとき、不変確率分布は存在しない。特に定数初期値からの分散は $n\to\infty$ で発散する。
<!-- formal-statement-end -->

### 証明の見取り図

$|r|<1$ なら、最初の値の影響は $r^n$ で消え、雑音の分散は有限幾何級数の極限になる。その正規分布を初期値として一歩更新し、同じ分布へ戻ることを確認する。境界 $|r|=1$ や $|r|>1$ では分散が増えるだけでなく、不変分布が存在しないことも確かめる。

<!-- proof-start -->
### 証明

$r=1-\lambda h$、$q=2\tau h>0$ とする。$0<h<2/\lambda$ は $|r|<1$ と同値である。[二次模型のEuler–Maruyama有限時刻分布](#thm-pml1-11-finite-moments)より、定数初期値の場合

$$
r^n(y_0-a)\to0,\qquad
q\sum_{j=0}^{n-1}r^{2j}\to \frac q{1-r^2}=:V_h.
$$

したがって正規分布の平均・分散の収束により $Y_n$ の分布は $N(a,V_h)$ へ収束する。一般の $Y_0$ に対しても、反復展開は

$$
Y_n-a=r^n(Y_0-a)+\sqrt q\sum_{k=1}^n r^{n-k}\xi_k
$$

である。$Y_0$ が有限値を取るため $r^n(Y_0-a)\to0$ はほとんど確実に成立する。第二項は平均 $0$、分散 $q(1-r^{2n})/(1-r^2)$ の正規分布なので、和は $N(0,V_h)$ へ分布収束する。

次に $Y\sim N(a,V_h)$ を未来の $\xi\sim N(0,1)$ から独立に取ると、一歩後は正規分布で、平均 $a$、分散は

$$
r^2V_h+q
=r^2\frac q{1-r^2}+q
=\frac q{1-r^2}=V_h.
$$

よって $\pi_h$ は不変である。もし別の不変分布 $\nu$ があれば、$Y_0\sim\nu$ として上記の分布収束を適用する一方、不変性からすべての $n$ で $Y_n\sim\nu$ である。ゆえに $\nu=\pi_h$ で一意となる。

$h\ge2/\lambda$ では $r\le-1$ となる。定数初期値からの分散 $q\sum_{j=0}^{n-1}r^{2j}$ は $r=-1$ なら $qn$、$r<-1$ なら幾何級数的に発散する。さらに**分散無限の不変分布もない**ことを示す。不変確率変数 $Z=Y-a$ の特性関数を $\varphi_Z(u)=\mathbb E[e^{iuZ}]$ と書く。ここで $u\in\mathbb R$ は特性関数の引数であり、物理時刻 $t$ とは異なる。独立な雑音を使って

$$
\varphi_Z(u)=\varphi_Z(ru)e^{-qu^2/2}
=\varphi_Z(r^nu)\exp\left(-\frac{qu^2}{2}\sum_{j=0}^{n-1}r^{2j}\right)
$$

を満たす。$|\varphi_Z(r^nu)|\le1$ なので、固定した $u\ne0$ では右辺の絶対値が $n\to\infty$ で $0$ に収束する。従って $\varphi_Z(u)=0$ がすべての $u\ne0$ で成立してしまう。しかし特性関数は $u=0$ で連続かつ $\varphi_Z(0)=1$ だから矛盾する。不変確率分布は存在しない。
<!-- proof-end -->

$\lambda h=1$ なら $r=0$ なので更新ごとに前状態の情報が消え、$Y_{n+1}=a+\sqrt{2\tau h}\xi_{n+1}$ となる。$1<\lambda h<2$ では $r<0$ となり、平均は $a$ の左右を交互に行き来しながら減衰する。$h=2/\lambda$ では $r=-1$ となり、平均の符号が交互に変わっても、分散は毎歩 $q$ ずつ積み上がる。

## 4. 安定でもGibbs密度から偏る

[連続状態Gibbs密度の定義](../PML1-09/index.md#def-pml1-09-continuous-gibbs)に $f(x)=\lambda(x-a)^2/2$ を代入して正規化すると、連続時間の不変分散は

$$
V_*=\frac{\tau}{\lambda}.
$$

ところが離散化の $V_h$ は、刻み幅 $h$ が正の限り $V_*$ より大きい。**一歩の遷移**を真のGibbs分布にかければ、定常化を待たずに違いが見える。

<a id="prop-pml1-11-gibbs-bias"></a>

<!-- formal-statement-start -->
> **命題（Euler–Maruyama離散化のGibbs不変性の破れと定常分散の偏り）**  
> $\lambda,\tau>0$、$a\in\mathbb R$、$h>0$ とする。二次損失 $f(x)=\lambda(x-a)^2/2$ のEuler–Maruyama更新に、連続時間のGibbs分布 $Y_0\sim N(a,V_*)$、$V_*=\tau/\lambda$ を独立な雑音とともに入力すると、一歩後の分散は

$$
\operatorname{Var}(Y_1)=V_*(1+\lambda^2h^2)>V_*.
$$

> よって $h>0$ では連続時間のGibbs分布は離散鎖の不変分布ではない。さらに $0<h<2/\lambda$ の場合、離散鎖の定常分散 $V_h$ の絶対偏りと相対偏りは

$$
V_h-V_*=\frac{\tau h}{2(1-\lambda h/2)},
\qquad
\frac{V_h-V_*}{V_*}=\frac{\lambda h}{2-\lambda h}>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一歩後の分散は「前状態から伝わる分散」と「新たな雑音の分散」の和である。安定域での定常分散は前節の式と比較すればよい。

<!-- proof-start -->
### 証明

$Y_0-a$ と $\xi_1$ は独立でそれぞれ分散 $V_*$、$1$ であるため、

$$
\begin{aligned}
\operatorname{Var}(Y_1)
&=(1-\lambda h)^2V_*+2\tau h\\
&=V_*\bigl((1-\lambda h)^2+2\lambda h\bigr)\\
&=V_*(1+\lambda^2h^2).
\end{aligned}
$$

$h>0$ なら $\lambda^2h^2>0$ であり、不変性に必要な「一歩後も同分布」が破れる。$0<h<2/\lambda$ では[定常分布の定理](#thm-pml1-11-stationary-law)から

$$
\begin{aligned}
V_h-V_*
&=V_*\left(\frac1{1-\lambda h/2}-1\right)\\
&=V_*\frac{\lambda h/2}{1-\lambda h/2}
=\frac{\tau h}{2(1-\lambda h/2)}.
\end{aligned}
$$

さらに $V_*>0$ で割れば、相対偏りは $\lambda h/(2-\lambda h)$ となる。
<!-- proof-end -->

固定した $\lambda$ の下で $h\downarrow0$ とすれば、相対偏りは $(\lambda/2)h+O(h^2)$ でゼロへ近づく。これは**定常分布の分散の収束**についての計算であり、個々の標本路に沿う誤差や一般の非線形損失での不変測度収束を証明したわけではない。

**具体数値**：$\lambda=2$、$\tau=1$ なら $V_*=1/2$。$h=1/4$ のとき $r=1/2$、一歩の雑音分散 $q=1/2$、定常分散は

$$
V_h=\frac{1/2}{1-(1/2)^2}=\frac23.
$$

連続時間の $1/2$ より $1/6$ 大きく、相対偏りは $(2/3-1/2)/(1/2)=1/3$ である。離散鎖の定常分布も正規分布だが、広がりが大きい。

## 5. 一歩だけ厳密に進めると何が変わるか

二次模型は確率積分を明示的に解ける。刻み幅 $h$ ごとの**厳密遷移**を比較対象にすると、Euler–Maruyama法がドリフトの減衰率と雑音の分散をどちらも近似していたことが分かる。

<a id="thm-pml1-11-exact-ou-step"></a>

<!-- formal-statement-start -->
> **定理（二次Langevin過程の厳密一歩遷移）**  
> $\lambda,\tau>0$、$a\in\mathbb R$ とする。[二次Langevin方程式](../PML1-08/index.md#thm-pml1-08-quadratic)

$$
dX_t=-\lambda(X_t-a)\,dt+\sqrt{2\tau}\,dW_t
$$

> の時間間隔 $h>0$ に対する条件付き遷移は、独立な $N(0,1)$ 乱数 $\eta_{n+1}$ を用いて次の分布に一致する。

$$
X_{t_{n+1}}\mid X_{t_n}=x
\ \sim\
N\!\left(a+e^{-\lambda h}(x-a),\,
\frac{\tau}{\lambda}(1-e^{-2\lambda h})\right).
$$

> 従ってこの条件付き分布から毎回標本を生成する更新

$$
\widetilde Y_{n+1}
=a+e^{-\lambda h}(\widetilde Y_n-a)
+\sqrt{\frac{\tau}{\lambda}(1-e^{-2\lambda h})}\,\eta_{n+1}
$$

> は任意の $h>0$ で $N(a,\tau/\lambda)$ を不変分布として持つ。
<!-- formal-statement-end -->

### 証明の見取り図

積分因子で解くと、残るのは決定論的な関数を掛けたブラウン運動の積分である。[決定論的被積分関数のItô積分の正規性](../../../解析系/STO/STO6/index.md#prop-sto6-deterministic-gaussian)と[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)を用いて、その係数を求める。

<!-- proof-start -->
### 証明

$U_t=X_t-a$ と置き、[STO7の時間依存Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $g(t,u)=e^{\lambda t}u$ に適用する。偏微分は $\partial_tg=\lambda e^{\lambda t}u$、$\partial_ug=e^{\lambda t}$、$\partial_{uu}g=0$ である。指数関数は決定論的な有限変動関数なので二次共変動項はゼロであり、

$$
d(e^{\lambda t}U_t)
=e^{\lambda t}\lambda U_t\,dt
+e^{\lambda t}(-\lambda U_t\,dt+\sqrt{2\tau}\,dW_t)
=\sqrt{2\tau}e^{\lambda t}\,dW_t.
$$

区間 $[t_n,t_n+h]$ で積分して $e^{-\lambda(t_n+h)}$ を掛ければ

$$
X_{t_n+h}-a=e^{-\lambda h}(X_{t_n}-a)
+\sqrt{2\tau}\int_{t_n}^{t_n+h}e^{-\lambda(t_n+h-s)}\,dW_s.
$$

ブラウン運動の独立増分により積分項は $X_{t_n}$ と独立で、平均 $0$ である。[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)で被積分関数を $s\mapsto\sqrt{2\tau}e^{-\lambda(t_n+h-s)}$ とすると

$$
\begin{aligned}
\operatorname{Var}\left(\sqrt{2\tau}\int_{t_n}^{t_n+h}
e^{-\lambda(t_n+h-s)}\,dW_s\right)
&=2\tau\int_{t_n}^{t_n+h}e^{-2\lambda(t_n+h-s)}\,ds\\
&=2\tau\int_0^h e^{-2\lambda u}\,du
=\frac{\tau}{\lambda}(1-e^{-2\lambda h}).
\end{aligned}
$$

従って条件付き正規分布の式を得る。$X_{t_n}\sim N(a,\tau/\lambda)$ なら次時刻は独立な正規変数の和であり、平均は $a$、分散は

$$
e^{-2\lambda h}\frac{\tau}{\lambda}
+\frac{\tau}{\lambda}(1-e^{-2\lambda h})
=\frac{\tau}{\lambda}.
$$

よってGibbs分布は不変である。
<!-- proof-end -->

両者の一歩更新を並べると違いが明確になる。

| 一歩更新 | 中心からの減衰率 | 一歩の雑音分散 |
| --- | --- | --- |
| Euler–Maruyama | $1-\lambda h$ | $2\tau h$ |
| 二次模型の厳密遷移 | $e^{-\lambda h}$ | $(\tau/\lambda)(1-e^{-2\lambda h})$ |

$e^{-\lambda h}=1-\lambda h+(\lambda h)^2/2+O(h^3)$ だから、両者の**一歩の平均**の差は $O(h^2)$（状態 $x$ を固定）。雑音分散の差も $O(h^2)$ だが、毎歩繰り返すと平衡分散の偏りは $O(h)$ になる。

なお、離散鎖の雑音の分散だけを $V_*(1-r^2)$ に調整すると、$|r|<1$ のときGibbs分散を厳密に保てる。しかし減衰率 $r$ はなお $e^{-\lambda h}$ と異なるため、**Gibbs分布を保つこと**と**厳密な時間遷移を得ること**は別の性質である。

## 6. 刻み幅と定常分散を数値で確かめる

$\lambda=2$、$\tau=1$、$a=0$ と固定する。解析式 $V_h=(1/2)/(1-h)$ と $\lambda h<2$ から、次の比較を手計算できる。

| 刻み幅 $h$ | 減衰率 $r$ | 定常分散 $V_h$ | 連続時間の分散 $V_*$ | 相対偏り |
| ---: | ---: | ---: | ---: | ---: |
| $0.05$ | $0.90$ | $0.526316$ | $0.5$ | $5.2632\%$ |
| $0.25$ | $0.50$ | $0.666667$ | $0.5$ | $33.3333\%$ |
| $0.75$ | $-0.50$ | $2$ | $0.5$ | $300\%$ |
| $1.00$ | $-1.00$ | 不存在 | $0.5$ | 定義できない |

実行可能な [Python数値実験（langevin_em.py）](./langevin_em.py) では、乱数種を固定して各刻み幅を反復し、解析式による定常分散と標本分散を照合できる。標本分散は乱数を有限回しか生成しないため、解析値から多少揺れる。$h=1$ の列は、定常分散の代わりに有限ステップで増大する分散を表示する。

比較で固定したのは $\lambda,\tau$ と計算対象の時刻間隔であり、**反復回数と刻み幅を区別**する必要がある。時間間隔 $h$ を半分にするだけで反復回数も同じままなら、最終物理時刻も半分になる。定常分散と有限時刻の誤差を混ぜないで読もう。

## 7. 演習 Level A

<a id="ex-pml1-11-a01"></a>
### PML1-11-A01 一歩の更新の平均と分散

- Level: A

$f(x)=(x-1)^2$、$\tau=3$、$h=1/4$、$Y_0=5$ で一歩更新し、その平均と分散を求めよ。

<!-- solution-start -->
#### 詳細解答

$f'(5)=2(5-1)=8$ を[Euler–Maruyamaの定義](#def-pml1-11-euler-maruyama)へ代入する。ドリフトは $h f'(5)=2$、雑音の分散は $2\tau h=3/2$ であるから

$$
Y_1=5-2+\sqrt{3/2}\xi_1=3+\sqrt{3/2}\xi_1.
$$

$\mathbb E[\xi_1]=0$、$\operatorname{Var}(\xi_1)=1$ により $\mathbb E[Y_1]=3$、$\operatorname{Var}(Y_1)=3/2$。
<!-- solution-end -->

<a id="ex-pml1-11-a02"></a>
### PML1-11-A02 二歩の雑音を展開する

- Level: A

$\lambda=\tau=1$、$a=Y_0=0$、$h=1/2$ の二次模型で、$Y_2$ を $\xi_1,\xi_2$ で表示し、分散を計算せよ。

<!-- solution-start -->
#### 詳細解答

$r=1-\lambda h=1/2$、$q=2\tau h=1$。更新から $Y_1=\xi_1$、$Y_2=\tfrac12 Y_1+\xi_2=\tfrac12\xi_1+\xi_2$。独立性により交差項の期待値はゼロなので、

$$
\operatorname{Var}(Y_2)
=\frac14\operatorname{Var}(\xi_1)+\operatorname{Var}(\xi_2)
=\frac14+1=\frac54.
$$

平均は $0$。
<!-- solution-end -->

<a id="ex-pml1-11-a03"></a>
### PML1-11-A03 刻み幅と不安定化

- Level: A

$\lambda=4$、$\tau>0$ の二次模型で $h=0.2,0.5,0.6$ に対する $r$ を求め、定常分布の有無を判定せよ。

<!-- solution-start -->
#### 詳細解答

$r=1-4h$ だから、順に $r=0.2,-1,-1.4$ である。[定常分布の定理](#thm-pml1-11-stationary-law)の条件 $|r|<1$ は最初の $h=0.2$ だけ満たす。$h=0.5$ では $r^2=1$ なので有限時刻分散は $q\sum_{j=0}^{n-1}1=nq$ と線形発散し、$h=0.6$ では $r^2=1.96>1$ なので幾何級数的に発散する。後二者には不変確率分布がない。
<!-- solution-end -->

<a id="ex-pml1-11-a04"></a>
### PML1-11-A04 定常分散の相対偏り

- Level: A

$\lambda=2$、$\tau=1$、$h=1/4$ で連続時間と離散時間の定常分散、および相対偏りを求めよ。

<!-- solution-start -->
#### 詳細解答

連続時間は $V_*=\tau/\lambda=1/2$。$\lambda h/2=1/4$ なので

$$
V_h=\frac{V_*}{1-\lambda h/2}
=\frac{1/2}{3/4}=\frac23.
$$

従って絶対偏りは $2/3-1/2=1/6$、相対偏りは $(1/6)/(1/2)=1/3$。$0<h<2/\lambda=1$ も満たすため、これは実在する離散定常分散の比較である。
<!-- solution-end -->

<a id="ex-pml1-11-a05"></a>
### PML1-11-A05 Gibbsから始めても一歩で変わる

- Level: A

$\lambda=2$、$\tau=1$、$h=1/4$ で $Y_0\sim N(a,1/2)$ とする。$Y_1$ の分散を求めて、不変性の有無を述べよ。

<!-- solution-start -->
#### 詳細解答

$r=1-2(1/4)=1/2$、$q=2(1)(1/4)=1/2$。$Y_0$ と新しい $\xi_1$ は独立なので、

$$
\operatorname{Var}(Y_1)=r^2\operatorname{Var}(Y_0)+q
=\frac14\cdot\frac12+\frac12
=\frac58.
$$

$\frac58\ne\frac12$ だから一歩後の分布は元のGibbs分布に等しくない。$\pi$ が不変なら一歩後も同じ分布である必要があるため、これだけで不変性を否定できる。
<!-- solution-end -->

## 8. 演習 Level B

<a id="ex-pml1-11-b01"></a>
### PML1-11-B01 任意の初期分布からの収束と一意性

- Level: B

$Z_{n+1}=rZ_n+\sqrt q\,\xi_{n+1}$、$q>0$、$|r|<1$、$Z_0$ は有限値の確率変数で未来の独立標準正規乱数から独立とする。$Z_n$ が $N(0,q/(1-r^2))$ へ分布収束することを示し、この分布が唯一の不変分布であると証明せよ。

<!-- solution-start -->
#### 詳細解答

更新を繰り返すと

$$
Z_n=r^nZ_0+\sqrt q\sum_{k=1}^{n}r^{n-k}\xi_k.
$$

$|r|<1$ で $Z_0$ は有限値を取るので、第一項はほとんど確実にゼロへ近づく。第二項は独立な正規乱数の和だから正規分布であり、平均ゼロ、分散は

$$
q\sum_{k=1}^{n}r^{2(n-k)}
=q\frac{1-r^{2n}}{1-r^2}
\longrightarrow\frac q{1-r^2}.
$$

よって和は求める正規分布へ分布収束する。次に $Z\sim N(0,q/(1-r^2))$ と独立な $\xi\sim N(0,1)$ を使うと $rZ+\sqrt q\,\xi$ は平均ゼロ、分散

$$
r^2\frac q{1-r^2}+q=\frac q{1-r^2}
$$

の正規分布なので不変である。別の不変分布 $\nu$ から開始すれば各 $Z_n$ は $\nu$ に従うが、上で示した収束先は初期分布に依存しない。従って $\nu=N(0,q/(1-r^2))$ しかあり得ない。
<!-- solution-end -->

<a id="ex-pml1-11-b02"></a>
### PML1-11-B02 雑音を調節してGibbsを保てるか

- Level: B

$0<h<2/\lambda$ の二次模型で、更新 $Y_{n+1}-a=r(Y_n-a)+\sigma_h\xi_{n+1}$ の減衰率は $r=1-\lambda h$ のままとする。$N(a,\tau/\lambda)$ を不変にする $\sigma_h^2$ を求め、これがEuler–Maruyama法の雑音分散 $2\tau h$ とどう異なるか説明せよ。また、この調整だけで厳密な時間 $h$ の遷移になるか答えよ。

<!-- solution-start -->
#### 詳細解答

$Y_n\sim N(a,V_*)$、$V_*=\tau/\lambda$ と仮定する。次時刻の分散は独立性から $r^2V_*+\sigma_h^2$ なので、不変性の必要十分条件は

$$
\sigma_h^2=V_*(1-r^2)
=\frac\tau\lambda\bigl(1-(1-\lambda h)^2\bigr)
=2\tau h\left(1-\frac{\lambda h}{2}\right).
$$

$0<h<2/\lambda$ だから右辺は正で、実際に正規雑音として実現できる。Euler–Maruyamaの $2\tau h$ より $1-\lambda h/2$ 倍小さい。これで平均も分散も $N(a,V_*)$ に戻り、正規性も保存するから不変性が成立する。しかし[厳密一歩遷移](#thm-pml1-11-exact-ou-step)の減衰率は $e^{-\lambda h}$ であり、一般に $1-\lambda h$ と等しくない。従ってGibbsを保っても厳密な時間遷移にはならない。
<!-- solution-end -->

<a id="ex-pml1-11-b03"></a>
### PML1-11-B03 誤差許容値から刻み幅を決める

- Level: B

二次模型の定常分散について、相対偏りを $\varepsilon>0$ 以下にしたい。刻み幅 $h$ の必要十分条件を導き、$\lambda=3$、$\varepsilon=0.05$ で上限を求めよ。

<!-- solution-start -->
#### 詳細解答

安定域 $0<h<2/\lambda$ における[相対偏りの式](#prop-pml1-11-gibbs-bias)は $R(h)=\lambda h/(2-\lambda h)$ である。分母が正なので

$$
R(h)\le\varepsilon
\iff\lambda h\le\varepsilon(2-\lambda h)
\iff\lambda h(1+\varepsilon)\le2\varepsilon.
$$

従って $0<h\le2\varepsilon/(\lambda(1+\varepsilon))$ が必要十分である。この上限は $\varepsilon/(1+\varepsilon)<1$ より安定条件 $h<2/\lambda$ も自動的に満たす。$\lambda=3$、$\varepsilon=0.05$ なら

$$
h\le\frac{0.1}{3\cdot1.05}
=\frac{2}{63}\simeq0.031746.
$$

これは定常分散の相対偏りに関する条件であり、全標本路の誤差が5%以下になるという条件ではない。
<!-- solution-end -->

<a id="ex-pml1-11-b04"></a>
### PML1-11-B04 同じ刻み幅で厳密遷移と比較する

- Level: B

$\lambda=2$、$\tau=1$、$a=0$、$h=1/2$ の二次模型を考える。Euler–Maruyama法と厳密一歩遷移のそれぞれについて、$Y_{n+1}$ の条件付き平均・分散を求め、定常分散も比較せよ。

<!-- solution-start -->
#### 詳細解答

Euler–Maruyamaでは $r=1-\lambda h=0$、$q=2\tau h=1$ なので

$$
Y_{n+1}\mid Y_n=x\sim N(0,1).
$$

毎歩独立な $N(0,1)$ に更新するから定常分散も $1$ である。一方、[厳密一歩遷移](#thm-pml1-11-exact-ou-step)では $\lambda h=1$ だから

$$
X_{t+h}\mid X_t=x
\sim N\left(e^{-1}x,\frac12(1-e^{-2})\right).
$$

初期分散を $V_*=\tau/\lambda=1/2$ とすると、次時刻の分散は
$e^{-2}(1/2)+(1/2)(1-e^{-2})=1/2$ であり、これが不変分散となる。Euler–Maruyamaの一歩の平均は $0$、厳密遷移の平均は $e^{-1}x$ とも異なるため、定常分散の違いだけではない。
<!-- solution-end -->

## 9. 演習 Level C

<a id="ex-pml1-11-c01"></a>
### PML1-11-C01 異なる曲率を持つ二次損失

- Level: C

二次元の損失 $f(x_1,x_2)=(x_1^2+4x_2^2)/2$、温度 $\tau=1$ に対し、独立な二次元標準正規乱数 $\xi_{n+1}$ を使って

$$
Y_{n+1}=Y_n-h\nabla f(Y_n)+\sqrt{2h}\,\xi_{n+1}
$$

を定める。

1. 成分ごとの更新を書き、両成分が定常分布を持つ $h>0$ の範囲を求めよ。
2. $h=0.4$ で離散定常分布の分散共分散行列を求め、連続時間のGibbs分布 $N(0,\operatorname{diag}(1,1/4))$ と比較せよ。
3. 両成分の離散定常分散が同じになる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\nabla f(x_1,x_2)=(x_1,4x_2)$ だから更新は成分ごとに

$$
Y_{n+1,1}=(1-h)Y_{n,1}+\sqrt{2h}\,\xi_{n+1,1},
\qquad
Y_{n+1,2}=(1-4h)Y_{n,2}+\sqrt{2h}\,\xi_{n+1,2}.
$$

各成分の減衰率は $r_1=1-h$、$r_2=1-4h$ である。[定常分布の定理](#thm-pml1-11-stationary-law)を各成分に適用する条件は $|1-h|<1$ と $|1-4h|<1$、すなわち $0<h<2$ と $0<h<1/2$。よって共通の範囲は $0<h<1/2$ である。

$h=0.4$ のとき $r_1=0.6$、$r_2=-0.6$、一歩の各雑音分散は $q=2h=0.8$ である。まず各成分の[一変数の定常分布](#thm-pml1-11-stationary-law)を独立に初期分布として取れば、更新に使う二成分の雑音も独立なので、その積分布は毎歩保たれる。従って二次元の定常分布は実在する。その定常分散を $V_1,V_2$、交差共分散を $C=\operatorname{Cov}(Y_{n,1},Y_{n,2})$ と書く。各成分は同じ定理により有限分散を持ち、二成分の新しい雑音は互いに独立で過去の状態とも独立なので、定常性から

$$
C=\operatorname{Cov}(Y_{n+1,1},Y_{n+1,2})
=r_1r_2C+2h\operatorname{Cov}(\xi_{n+1,1},\xi_{n+1,2})
=r_1r_2C.
$$

$|r_1r_2|=0.36<1$ だから $C=0$ となり、定常分散共分散行列は対角である。各分散は

$$
V_{h,1}=\frac{0.8}{1-0.6^2}=\frac{0.8}{0.64}=\frac54,
\qquad
V_{h,2}=\frac{0.8}{1-(-0.6)^2}=\frac54.
$$

従って離散定常分散共分散行列は $\operatorname{diag}(5/4,5/4)$。一方、[連続状態のGibbs確率密度](../PML1-09/index.md#def-pml1-09-continuous-gibbs)へ $\tau=1$ とこの損失を代入すると

$$
e^{-f(x_1,x_2)}=e^{-x_1^2/2}e^{-4x_2^2/2}.
$$

各因子は[一変数の二次Gibbs密度の計算](../PML1-09/index.md#def-pml1-09-continuous-gibbs)で $\lambda=1,4$ に対応する。二変数の積分も独立に分かれるため、正規化すると平均ゼロで分散 $1,1/4$ の独立な正規分布となり、分散共分散行列は $\operatorname{diag}(1,1/4)$ である。第1成分は $1$ から $5/4$ へ25%増え、第2成分は $1/4$ から $5/4$ へ400%増える。

両成分で $r_1^2=r_2^2=0.36$、かつ毎歩注入する雑音分散がどちらも $0.8$ だから、定常分散方程式 $V_i=r_i^2V_i+0.8$ が同じになる。符号の違いは平均の振動には現れるが、分散には平方でしか現れない。**単一の刻み幅を使うと曲率の大きい方向ほど平衡を強く歪め得る**ことが分かる。
<!-- solution-end -->

## 10. 何を比較すればよいか

連続時間のGibbs分布が不変でも、時間離散化後の鎖では別の不変分布が現れることがある。今回の二次模型では、Euler–Maruyama法は $0<h<2/\lambda$ で安定だが、定常分散は常に大きく、$h\ge2/\lambda$ では不変確率分布そのものがなくなる。

実装を比較するときは、(i) 固定物理時刻での平均・分散、(ii) 十分長時間後の定常分布、(iii) 一歩の遷移分布、(iv) その計算に要する刻み数を別々に測る。次講 PML1-12 では、機械学習のミニバッチから生じる雑音を、この熱雑音の計算と照らし合わせる。
