# STO7：多次元 Itô 解析・Stratonovich 積分

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[連続セミマルチンゲール](../STO5/index.md#def-sto5-continuous-semimartingale)、[共変分](../STO5/index.md#def-sto5-covariation)、[確率積分の $L^2$ 構成](../STO6/index.md#thm-sto6-l2-construction)、[予測可能過程](../STO1/index.md#def-sto1-predictable) を直接参照します。

STO5 で二次変分 / 共変分を作り、STO6 で予測可能被積分過程の確率積分を構成しました。ここで二つが合流します。

通常の微積分では、細かい増分 $h$ に対して二次項は一次項より速く消えます。しかしブラウン運動の増分は典型的に $\sqrt{\Delta t}$ の大きさなので、

$$
(\Delta B)^2
\asymp
\Delta t
$$

となり、二次 Taylor 項が消えません。

本章の中心線は

$$
\boxed{
\text{共変分}
\to
\text{多次元 Itô 公式}
\to
\text{積の公式 / Itô 過程}
\to
\text{確率指数関数}
\to
\text{Stratonovich conversion}
}
$$

です。

最後まで舞台は $\mathbb R^d$ です。多様体上のブラウン運動や connection は持ち込みません。一方、ユークリッド空間の Stratonovich calculus は「なぜ通常の連鎖律が戻るのか」まで閉じます。

---

## 1. ブラウン運動を複数成分へ広げる

<a id="def-sto7-vector-brownian"></a>

<!-- formal-statement-start -->
> **定義（d 次元ブラウン運動）**  
> フィルトレーション $(\mathcal F_t)_{t\ge0}$ 上の $\mathbb R^d$-値適合過程 $B=(B_t)_{t\ge0}$ が **$d$ 次元 standard ブラウン運動** であるとは、次を満たすことをいう。
>
> 1. $B_0=0$ ほとんど確実に.
> 2. 任意の $0\le s<t$ について、増分 $B_t-B_s$ は $\mathcal F_s$ と独立である。
> 3. 任意の $0\le s<t$ について

$$
B_t-B_s\sim N_d(0,(t-s)I_d).
$$

> 4. ほとんど全ての $\omega$ について $t\mapsto B_t(\omega)$ は連続である。
<!-- formal-statement-end -->

この定義から、任意の $0\le s<t$ について

$$
B_t-B_s
\sim
N_d(0,(t-s)I_d)
$$

です。

<!-- definition-example-start: def-sto7-vector-brownian -->
**定義の確認**

### 直接例：独立な 1 次元ブラウン運動から 2 次元ブラウン運動を作る

独立なブラウン運動 $B^1,B^2$ を取り、

$$
B_t=(B_t^1,B_t^2)
$$

とします。フィルトレーションは二成分を合わせた usual augmented natural フィルトレーション

$$
\mathcal F_t
=
\sigma(B_u^1,B_u^2:0\le u\le t)^{\mathrm{aug}}
$$

とします。

まず $B_0=(0,0)$ ほとんど確実にで、各成分が連続なので $B$ も連続です。

さらに $0\le s<t$ では、各成分の未来増分は対応する過去と独立で、二つのブラウン運動自体も独立です。したがって

$$
B_t-B_s
=
(B_t^1-B_s^1,\ B_t^2-B_s^2)
$$

は $\mathcal F_s$ と独立です。

二成分は互いに独立な $N(0,t-s)$ に従うので

$$
B_t-B_s\sim N_2(0,(t-s)I_2).
$$

以上で定義の四条件を直接確認できました。
<!-- definition-example-end -->

ブラウン運動を多次元化したとき、Itô 解析に必要なのは covariance だけではありません。標本路上で残る **共変分** を確認する必要があります。

<a id="prop-sto7-vector-brownian-covariation"></a>

<!-- formal-statement-start -->
> **命題（多次元ブラウン運動の共変分）**  
> $B=(B^1,\ldots,B^d)$ を $d$ 次元 standard ブラウン運動とする。このとき
>
$$
[B^i,B^j]_t
=
\delta_{ij}t,
$$
>
> すなわち
>
$$
d[B^i,B^j]_t
=
\delta_{ij}\,dt.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$i=j$ は STO5 のブラウン二次変分

$$
[B^i]_t=t
$$

です。

$i\ne j$ では、分割上の cross sum

$$
\sum_k
\Delta_kB^i\Delta_kB^j
$$

の平均は 0 です。独立成分を使うと二乗平均が

$$
\sum_k(\Delta t_k)^2
$$

まで落ち、mesh とともに 0 へ行きます。

<!-- proof-start -->
### 証明

$i=j$ は [ブラウン運動の二次変分](../STO5/index.md#thm-sto5-brownian-qv) から従います。

$i\ne j$ とし、$[0,t]$ の決定論的 partition

$$
\pi=\{0=t_0<t_1<\cdots<t_n=t\}
$$

を取ります。

$$
S_\pi
=
\sum_{k=1}^n
\Delta_kB^i\Delta_kB^j
$$

と置きます。各成分の独立性から

$$
E[S_\pi]=0.
$$

また異なる区間のブラウン increments は独立で centered なので cross 項は消え、

$$
\begin{aligned}
E[S_\pi^2]
&=
\sum_{k=1}^n
E[(\Delta_kB^i)^2]
E[(\Delta_kB^j)^2]\\
&=
\sum_{k=1}^n
(\Delta t_k)^2\\
&\le
|\pi|
\sum_{k=1}^n\Delta t_k\\
&=
t|\pi|.
\end{aligned}
$$

従って $|\pi|\to0$ なら

$$
S_\pi\to0
\quad\text{in }L^2,
$$

したがって in probability です。共変分の定義から

$$
[B^i,B^j]_t=0
\qquad(i\ne j).
$$

対角成分と合わせて

$$
[B^i,B^j]_t=\delta_{ij}t.
$$
<!-- proof-end -->

したがって線形結合

$$
M_t=a^\top B_t,
\qquad
N_t=c^\top B_t
$$

なら bilinearity から

$$
[M,N]_t
=
(a^\top c)t.
$$

「分散共分散行列」と「共変分 matrix」が同じ係数を持つことが、多次元 Itô 公式の二階項を行列で書ける理由です。

---

## 2. 連続セミマルチンゲールにも積分する

STO6 の確率積分は continuous 局所マルチンゲールに対して構成しました。Itô 公式ではドリフトも同時に現れるため、連続セミマルチンゲール全体へ積分記号を拡張します。

<a id="def-sto7-semimartingale-integral"></a>

<!-- formal-statement-start -->
> **定義（連続セミマルチンゲールに対する積分）**  
> $X$ を連続セミマルチンゲールとし、STO5 の一意な分解
>
$$
X=X_0+M+A
$$
>
> を取る。ここで $M_0=A_0=0$、$M$ は continuous 局所マルチンゲール、$A$ は continuous finite-variation 過程とする。
>
> 予測可能過程 $H$ が $M$ に関して locally square-integrable であり、かつ各有限時間区間で
>
$$
\int_0^t|H_s|\,d|A|_s<\infty
$$
>
> ほとんど確実にを満たすとき
>
$$
\int_0^tH_s\,dX_s
:=
\int_0^tH_s\,dM_s
+
\int_0^tH_s\,dA_s
$$
>
> と定義する。右辺第1項は STO6 の確率積分、第2項は標本路ごとの Lebesgue--Stieltjes integral である。
<!-- formal-statement-end -->

[セミマルチンゲール分解の一意性](../STO5/index.md#thm-sto5-semimartingale-uniqueness) により、この定義は分解の選び方に依存しません。

<!-- definition-example-start: def-sto7-semimartingale-integral -->
**定義の確認**

### 直接例：drifted ブラウン運動

$$
X_t=B_t+t,
\qquad
H_t\equiv1
$$

とします。

局所マルチンゲール part は $B$、finite-variation part は $t$ なので

$$
\int_0^t1\,dX_s
=
\int_0^t1\,dB_s
+
\int_0^t1\,ds
=
B_t+t
=
X_t-X_0.
$$

確率積分と通常の有限変動積分が、一つの $dX$ 記法の中で共存します。
<!-- definition-example-end -->

連続セミマルチンゲール $X=M+A$、$Y=N+C$ の共変分は

$$
[X,Y]:=[M,N]
$$

と読めます。finite-variation part は二次変分 / 共変分に寄与しないからです。

---

## 3. 重み付き共変分：二次 Taylor 項を積分へ変える

多次元 Itô 公式の核心は

$$
\sum_k
H_{t_{k-1}}
\Delta_kX\,\Delta_kY
$$

を

$$
\int H\,d[X,Y]
$$

へ変えることです。

<a id="lem-sto7-weighted-covariation"></a>

<!-- formal-statement-start -->
> **補題（重み付き共変分和）**  
> $X,Y$ を連続セミマルチンゲール、$H$ を continuous 適合過程とする。固定 $T>0$ に対し、必要なら stopping により $H$ を有界に局所化する。
>
> 決定論的 partition $\pi_n$ の mesh が 0 へ行くとき
>
$$
\sum_{t_k\in\pi_n,\ t_k\le t}
H_{t_{k-1}}
(X_{t_k}-X_{t_{k-1}})
(Y_{t_k}-Y_{t_{k-1}})
$$
>
> は
>
$$
\int_0^tH_s\,d[X,Y]_s
$$
>
> へ ucp 収束する。
<!-- formal-statement-end -->

### 証明の見取り図

まず $H$ を粗い時間分割ごとに左端値へ固定します。各粗区間では定数倍の共変分 sum なので STO5 の共変分へ収束します。

残る誤差は

$$
\sup|H_s-H_u|
\sum|\Delta X\,\Delta Y|
$$

で抑えます。Cauchy--Schwarz により

$$
\sum|\Delta X\,\Delta Y|
\le
\left(\sum(\Delta X)^2\right)^{1/2}
\left(\sum(\Delta Y)^2\right)^{1/2},
$$

右辺は二次変分の収束から有界 in probability です。一方 $H$ は停止後のコンパクト集合時間区間で一様連続なので、粗分割を細かくすれば前の supremum は小さくなります。

<!-- proof-start -->
### 証明

固定 $T$ で議論します。exit time により $X,Y,H$ と各二次変分を必要な範囲で有界にしてよく、最後に localization を外します。

まず coarse partition

$$
0=s_0<s_1<\cdots<s_m=T
$$

を固定し、

$$
H^{(m)}_s
=
\sum_{r=1}^m
H_{s_{r-1}}1_{(s_{r-1},s_r]}(s)
$$

とします。

fine partition $\pi_n$ を coarse partition の点を含むよう細分しても一般性を失いません。このとき

$$
\sum H^{(m)}_{t_{k-1}}\Delta_kX\Delta_kY
=
\sum_{r=1}^m
H_{s_{r-1}}
\sum_{s_{r-1}<t_k\le s_r}
\Delta_kX\Delta_kY.
$$

各内側の和は共変分の定義から

$$
[X,Y]_{s_r}-[X,Y]_{s_{r-1}}
$$

へ in probability で収束します。$m$ は有限なので全体は

$$
\sum_{r=1}^m
H_{s_{r-1}}
\bigl([X,Y]_{s_r}-[X,Y]_{s_{r-1}}\bigr)
$$

へ収束します。

次に $H-H^{(m)}$ の誤差を評価します。

$$
\begin{aligned}
\left|
\sum
(H_{t_{k-1}}-H^{(m)}_{t_{k-1}})
\Delta_kX\Delta_kY
\right|
&\le
\omega_H(|s|)\\
&\quad\times
\left(\sum(\Delta_kX)^2\right)^{1/2}
\left(\sum(\Delta_kY)^2\right)^{1/2},
\end{aligned}
$$

ここで $|s|=\max_r(s_r-s_{r-1})$、$\omega_H(\delta)$ は $[0,T]$ 上の modulus of continuity です。

continuity から

$$
\omega_H(\delta)\to0
\quad\text{ほとんど確実に}.
$$

一方、二つの二乗増分和はそれぞれ $[X]_T,[Y]_T$ へ in probability で収束するので、その積の平方根は有界 in probability です。従って coarse mesh を 0 へ送れば誤差は in probability で 0 へ行きます。

最後に $[X,Y]$ は finite variation 過程なので、coarse Riemann--Stieltjes sum は

$$
\int_0^tH_s\,d[X,Y]_s
$$

へ一様に収束します。

固定 $t$ だけでなく $t\le T$ の supremum に同じ評価を使えるため ucp 収束が得られます。
<!-- proof-end -->

この補題が「$(dX)(dY)=d[X,Y]$」という記号計算の厳密な中身です。

---

## 4. 二次 Taylor 展開を確率過程へ適用する

ここが本章の主定理です。

<a id="thm-sto7-multidimensional-ito"></a>

<!-- formal-statement-start -->
> **定理（多次元 Itô 公式）**  
> $X=(X^1,\ldots,X^d)$ を $\mathbb R^d$-値連続セミマルチンゲールとし、$f\in C^2(\mathbb R^d)$ とする。このとき任意の $t\ge0$ で
>
$$
\boxed{
\begin{aligned}
f(X_t)-f(X_0)
&=
\sum_{i=1}^d
\int_0^t
\partial_i f(X_s)\,dX_s^i\\
&\quad+
\frac12
\sum_{i,j=1}^d
\int_0^t
\partial_{ij}f(X_s)\,d[X^i,X^j]_s.
\end{aligned}
}
$$
>
> 各積分は前節のセミマルチンゲール integral と finite-variation integral の意味で読む。
<!-- formal-statement-end -->

### 何が通常の連鎖律と違うか

通常の $C^1$ 曲線 $x(t)$ なら二次変分は 0 なので二階項は消えます。

ブラウン運動では

$$
d[B^i,B^j]_t
=
\delta_{ij}\,dt
$$

が残るため、

$$
\frac12
\sum_i\partial_{ii}f(B_t)\,dt
=
\frac12\Delta f(B_t)\,dt
$$

が消えません。

つまり Laplacian は「突然現れる演算子」ではなく、ブラウン covariance と Hessian の縮約です。

### 証明の見取り図

分割上で二次 Taylor 展開します。

$$
\Delta f
=
\sum_i f_i\,\Delta X^i
+
\frac12\sum_{i,j}f_{ij}\,\Delta X^i\Delta X^j
+
r.
$$

三つの部分を別々に極限へ送ります。

1. 一次和 $\to \int \partial_i f(X)\,dX^i$。
2. 二次和 $\to \int \partial_{ij}f(X)\,d[X^i,X^j]$。
3. 剰余項 $\to0$。

2 は [重み付き共変分和](#lem-sto7-weighted-covariation) です。3 では Hessian の一様連続性と、二乗増分和が有界 in probability であることを使います。

<!-- proof-start -->
### 証明

固定 $T>0$ とします。

#### Step 1：コンパクト集合へ localization する

$$
\tau_R
=
\inf\{t\ge0:|X_t|\ge R\}\wedge R
$$

で停止します。$X^{\tau_R}$ はコンパクト集合 ball 内にあり、$f$ の一階・二階偏導関数はそこで有界、Hessian は一様連続です。

以下停止後で示し、最後に $R\uparrow\infty$ とします。

#### Step 2：多変数 Taylor 展開を 1 変数 Taylor から作る

$x,h\in\mathbb R^d$ に対して

$$
g(u)=f(x+uh),
\qquad 0\le u\le1
$$

と置きます。

RA3 の [Taylor の定理](../RA3/index.md#thm-ra3-taylor) を $g$ に適用すると

$$
f(x+h)-f(x)
=
\nabla f(x)^\top h
+
\frac12
h^\top D^2f(x)h
+
r(x,h),
$$

かつコンパクト集合 set 上では Hessian の一様連続性から

$$
|r(x,h)|
\le
\frac12
\omega_R(|h|)|h|^2,
$$

ここで $\omega_R(\delta)\to0$ as $\delta\downarrow0$ です。

#### Step 3：分割上で足す

partition

$$
0=t_0<t_1<\cdots<t_n=t
$$

について $\Delta_kX=X_{t_k}-X_{t_{k-1}}$ と書くと

$$
\begin{aligned}
f(X_t)-f(X_0)
&=
\sum_{k,i}
\partial_i f(X_{t_{k-1}})
\Delta_kX^i\\
&\quad+
\frac12
\sum_{k,i,j}
\partial_{ij}f(X_{t_{k-1}})
\Delta_kX^i\Delta_kX^j\\
&\quad+
\sum_kr_k.
\end{aligned}
$$

#### Step 4：一次和

$X^i=M^i+A^i$ と分解します。

martingale part について、continuous 適合過程

$$
\partial_i f(X_s)
$$

は予測可能で、停止後有界です。STO6 の局所確率積分 construction から左端 simple approximation は

$$
\int_0^t
\partial_i f(X_s)\,dM_s^i
$$

へ ucp 収束します。

finite-variation part については標本路ごとの Riemann--Stieltjes convergence により

$$
\sum_k
\partial_i f(X_{t_{k-1}})
\Delta_kA^i
\to
\int_0^t
\partial_i f(X_s)\,dA_s^i.
$$

従って一次和は

$$
\int_0^t
\partial_i f(X_s)\,dX_s^i
$$

へ収束します。

#### Step 5：二次和

[重み付き共変分和](#lem-sto7-weighted-covariation) を

$$
H_s=\partial_{ij}f(X_s)
$$

へ適用すると

$$
\sum_k
\partial_{ij}f(X_{t_{k-1}})
\Delta_kX^i\Delta_kX^j
\to
\int_0^t
\partial_{ij}f(X_s)\,d[X^i,X^j]_s
$$

ucp です。

#### Step 6：剰余項

continuity of $X$ から

$$
\max_k|\Delta_kX|
\to0
$$

ほとんど確実に as mesh $\to0$ です。

従って

$$
\left|\sum_kr_k\right|
\le
\frac12
\omega_R\left(\max_k|\Delta_kX|\right)
\sum_k|\Delta_kX|^2.
$$

さらに

$$
\sum_k|\Delta_kX|^2
=
\sum_{i=1}^d
\sum_k(\Delta_kX^i)^2
$$

は $\sum_i[X^i]_t$ へ in probability で収束するので有界 in probability です。前の modulus factor はほとんど確実に 0 へ行くため

$$
\sum_kr_k\to0
\quad\text{in probability}.
$$

以上から停止後の公式が得られます。

#### Step 7：localization を外す

任意の固定 $T$ について

$$
P(\tau_R\le T)\to0.
$$

停止後の等式は $\{\tau_R>T\}$ 上で元の過程の等式そのものです。従って $R\uparrow\infty$ とすれば元の $X$ に対する公式が得られます。
<!-- proof-end -->

この証明で重要なのは、二次項を「微分記号の暗算」で入れたのではなく、**Taylor 二次項を重み付き共変分 limit へ送った**ことです。

---

## 5. 積の公式：積の微分則に 1 項だけ増える

<a id="cor-sto7-product-rule"></a>

<!-- formal-statement-start -->
> **系（積の公式 / 部分積分公式）**  
> $X,Y$ を連続セミマルチンゲールとする。このとき
>
$$
\boxed{
X_tY_t
=
X_0Y_0
+
\int_0^tX_s\,dY_s
+
\int_0^tY_s\,dX_s
+
[X,Y]_t.
}
$$
>
> 微分記法では
>
$$
d(XY)=X\,dY+Y\,dX+d[X,Y].
$$
<!-- formal-statement-end -->

### 証明の見取り図

$f(x,y)=xy$ と置くと

$$
f_x=y,\qquad
f_y=x,\qquad
f_{xy}=f_{yx}=1,
$$

他の二階偏導関数は 0 です。

<!-- proof-start -->
### 証明

[多次元 Itô 公式](#thm-sto7-multidimensional-ito) を

$$
f(x,y)=xy
$$

へ適用します。

二階項は

$$
\frac12
\left(
\int_0^t1\,d[X,Y]_s
+
\int_0^t1\,d[Y,X]_s
\right)
=
[X,Y]_t
$$

です。従って

$$
X_tY_t-X_0Y_0
=
\int_0^tY_s\,dX_s
+
\int_0^tX_s\,dY_s
+
[X,Y]_t.
$$
<!-- proof-end -->

finite-variation calculus なら $[X,Y]=0$ なので通常の積の微分則へ戻ります。ブラウン calculus ではこの 1 項が残ります。

### 例：$\int B\,dB$

$X=Y=B$ とすると

$$
B_t^2
=
2\int_0^tB_s\,dB_s+t,
$$

したがって

$$
\boxed{
\int_0^tB_s\,dB_s
=
\frac12(B_t^2-t).
}
$$

ここにある $-t/2$ が Itô 補正の最小例です。

---

## 6. ドリフトと雑音を同じ式で扱う

STO9 では SDE の解を構成します。その前に、本章ではすでに積分表示を持つ過程に Itô 公式を適用する準備をします。

<a id="def-sto7-ito-process"></a>

<!-- formal-statement-start -->
> **定義（Itô 過程）**  
> $B=(B^1,\ldots,B^m)$ を $m$ 次元ブラウン運動とする。
>
> $\mathbb R^d$-値適合 continuous 過程 $X$ が
>
$$
X_t^i
=
X_0^i
+
\int_0^tb_s^i\,ds
+
\sum_{\alpha=1}^m
\int_0^t
\sigma_s^{i\alpha}\,dB_s^\alpha,
\qquad i=1,\ldots,d,
$$
>
> と書けるとする。ここで $b$ は progressively measurable で
>
$$
\int_0^T|b_s|\,ds<\infty,
$$
>
> $\sigma$ は予測可能で
>
$$
\int_0^T\|\sigma_s\|_F^2\,ds<\infty
$$
>
> が各 $T<\infty$ でほとんど確実に成り立つとき、$X$ を **Itô 過程** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto7-ito-process -->
**定義の確認**

### 直接例：constant coefficients

定数 vector $b\in\mathbb R^d$、定数 matrix $\Sigma\in\mathbb R^{d\times m}$ に対し

$$
X_t=x+bt+\Sigma B_t
$$

と置きます。

各成分は

$$
X_t^i
=
x^i+\int_0^tb^i\,ds
+
\sum_{\alpha=1}^m
\int_0^t\Sigma_{i\alpha}\,dB_s^\alpha.
$$

有限時間区間では

$$
\int_0^T|b|\,ds=T|b|<\infty,
$$

$$
\int_0^T\|\Sigma\|_F^2\,ds
=
T\|\Sigma\|_F^2<\infty.
$$

従って定義を満たします。
<!-- definition-example-end -->

vector ブラウン共変分を stochastic integrals へ移すため、次の補題を先に閉じます。

<a id="lem-sto7-vector-brownian-integral-covariation"></a>

<!-- formal-statement-start -->
> **補題（多次元ブラウン確率積分の共変分）**  
> $B=(B^1,\ldots,B^m)$ を $m$ 次元 standard ブラウン運動とし、予測可能過程

$$
H=(H^1,\ldots,H^m),
\qquad
K=(K^1,\ldots,K^m)
$$

> が各有限時間区間で

$$
\int_0^t|H_s|^2\,ds<\infty,
\qquad
\int_0^t|K_s|^2\,ds<\infty
$$

> ほとんど確実にを満たすとする。

$$
I_t=\sum_{\alpha=1}^m\int_0^tH_s^\alpha\,dB_s^\alpha,
\qquad
J_t=\sum_{\alpha=1}^m\int_0^tK_s^\alpha\,dB_s^\alpha
$$

> と置くと

$$
\boxed{
[I,J]_t
=
\int_0^t
H_s^\top K_s\,ds
=
\sum_{\alpha=1}^m
\int_0^t
H_s^\alpha K_s^\alpha\,ds.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

simple 予測可能 $H,K$ なら、各係数が一定の区間では

$$
I=\sum_\alpha H^\alpha B^\alpha,
\qquad
J=\sum_\beta K^\beta B^\beta
$$

の増分になり、bilinearity と

$$
[B^\alpha,B^\beta]_t
=
\delta_{\alpha\beta}t
$$

から同じブラウン成分だけが残ります。

一般の場合は STO6 の $L^2$ approximation を使います。近似誤差の bracket は Itô isometry / bracket identity により 0 へ行くので、simple case の共変分 identity を極限へ移せます。

<!-- proof-start -->
### 証明

まず停止により、固定 $T$ 上で

$$
\int_0^T|H_s|^2ds,
\qquad
\int_0^T|K_s|^2ds
$$

が有界になる場合へ帰着します。

#### Step 1：単純予測可能被積分過程

$H,K$ が共通の決定論的 partition

$$
0=t_0<t_1<\cdots<t_n=T
$$

上で simple 予測可能とします。

区間 $(t_{r-1},t_r]$ 上では係数 $H_r,K_r$ が $\mathcal F_{t_{r-1}}$-measurable で一定です。したがってその区間内で

$$
I_t-I_{t_{r-1}}
=
\sum_\alpha
H_r^\alpha
(B_t^\alpha-B_{t_{r-1}}^\alpha),
$$

$$
J_t-J_{t_{r-1}}
=
\sum_\beta
K_r^\beta
(B_t^\beta-B_{t_{r-1}}^\beta).
$$

共変分の bilinearity と
[多次元ブラウン運動の共変分](#prop-sto7-vector-brownian-covariation) から

$$
\begin{aligned}
d[I,J]_t
&=
\sum_{\alpha,\beta}
H_r^\alpha K_r^\beta
\,d[B^\alpha,B^\beta]_t\\
&=
\sum_\alpha
H_r^\alpha K_r^\alpha\,dt\\
&=
H_r^\top K_r\,dt.
\end{aligned}
$$

各区間をつなげると

$$
[I,J]_t
=
\int_0^tH_s^\top K_s\,ds.
$$

#### Step 2：一般予測可能被積分過程へ近似する

STO6 の simple 予測可能 density と localization により、simple 予測可能 $H^{(n)},K^{(n)}$ を

$$
E\int_0^T|H_s^{(n)}-H_s|^2ds\to0,
$$

$$
E\int_0^T|K_s^{(n)}-K_s|^2ds\to0
$$

となるよう取れます。

対応する積分を $I^{(n)},J^{(n)}$ とします。STO6 の bracket identity から

$$
[I^{(n)}-I]_T
=
\int_0^T
|H_s^{(n)}-H_s|^2ds
\to0
$$

in $L^1$ です。$K^{(n)}\to K$ にも同じ bracket identity を適用すると

$$
[J^{(n)}-J]_T
=
\int_0^T|K_s^{(n)}-K_s|^2ds
\to0
$$

in $L^1$ です。

continuous 局所 martingales $U,V$ について、固定時刻 $t$ の bracket matrix

$$
\begin{pmatrix}
[U]_t &[U,V]_t\\
[U,V]_t &[V]_t
\end{pmatrix}
$$

は positive semidefinite です。実際任意の $a,b\in\mathbb R$ に対し

$$
[aU+bV]_t
=
a^2[U]_t+2ab[U,V]_t+b^2[V]_t
\ge0
$$

だからです。この二次式が任意の $a,b$ で非負なので、$b=1$ として $a$ に関する二次式の判別式が正にならないことから

$$
|[U,V]_t|
\le
[U]_t^{1/2}[V]_t^{1/2}.
$$

これを $U=I^{(n)}-I$, $V=J^{(n)}$ へ使い、必要なら $[J^{(n)}]_T$ を stopping で有界にしてから外すと

$$
[I^{(n)}-I,J^{(n)}]_t\to0
$$

in probability です。

今度は $U=I$, $V=J^{(n)}-J$ として同じ bracket matrix の評価を使うと

$$
[I,J^{(n)}-J]_t\to0
$$

in probability です。したがって

$$
[I^{(n)},J^{(n)}]_t
\to
[I,J]_t
$$

in probability です。

一方 simple case から

$$
[I^{(n)},J^{(n)}]_t
=
\int_0^t
(H_s^{(n)})^\top K_s^{(n)}\,ds.
$$

Cauchy--Schwarz により

$$
\begin{aligned}
&\int_0^t
\left|
(H_s^{(n)})^\top K_s^{(n)}
-
H_s^\top K_s
\right|ds\\
&\le
\left(
\int_0^t|H_s^{(n)}-H_s|^2ds
\right)^{1/2}
\left(
\int_0^t|K_s^{(n)}|^2ds
\right)^{1/2}\\
&\quad+
\left(
\int_0^t|H_s|^2ds
\right)^{1/2}
\left(
\int_0^t|K_s^{(n)}-K_s|^2ds
\right)^{1/2},
\end{aligned}
$$

右辺は localization 後 $L^1$ で 0 へ行きます。したがって

$$
\int_0^t
(H_s^{(n)})^\top K_s^{(n)}\,ds
\to
\int_0^tH_s^\top K_s\,ds
$$

in probability です。

両極限を比較して、各 rational $t$ で

$$
[I,J]_t
=
\int_0^tH_s^\top K_s\,ds
$$

ほとんど確実にを得ます。両辺は continuous なので、一つの probability-one event 上で全 $t\ge0$ に拡張できます。最後に localization を外せば主張が従います。
<!-- proof-end -->

この補題を $X$ の martingale part の各成分へ適用すると

$$
d[X^i,X^j]_t
=
\sum_{\alpha=1}^m
\sigma_t^{i\alpha}\sigma_t^{j\alpha}\,dt.
$$

matrix

$$
a_t=\sigma_t\sigma_t^\top
$$

を置けば

$$
d[X^i,X^j]_t=a_t^{ij}\,dt.
$$

---

## 7. 時間依存 Itô 公式：生成作用素の原型

<a id="thm-sto7-ito-process-formula"></a>

<!-- formal-statement-start -->
> **定理（Itô 過程版の時間依存 Itô 公式）**  
> $X$ を前節の $\mathbb R^d$-値 Itô 過程とし、
>
$$
a_t=\sigma_t\sigma_t^\top
$$
>
> とする。$F\in C^{1,2}([0,\infty)\times\mathbb R^d)$ なら
>
$$
\boxed{
\begin{aligned}
dF(t,X_t)
&=
\left[
\partial_tF
+
\sum_i b_t^i\partial_iF
+
\frac12
\sum_{i,j}
a_t^{ij}\partial_{ij}F
\right]_{(t,X_t)}\,dt\\
&\quad+
\sum_{\alpha=1}^m
\left[
\sum_i
\sigma_t^{i\alpha}\partial_iF(t,X_t)
\right]dB_t^\alpha.
\end{aligned}
}
$$
<!-- formal-statement-end -->

### なぜ $C^{1,2}$ なのか

時間 $t$ は finite variation なので

$$
[\,t,t\,]=0,
\qquad
[t,X^i]=0.
$$

したがって時間方向には一階微分だけで十分です。空間方向は二次変分が残るので二階微分が必要です。

<!-- proof-start -->
### 証明

時間と空間を同時に partition します。

$$
\Delta F_k
=
F(t_k,X_{t_k})-F(t_{k-1},X_{t_{k-1}})
$$

を

$$
\begin{aligned}
\Delta F_k
&=
\bigl[
F(t_k,X_{t_k})-F(t_{k-1},X_{t_k})
\bigr]\\
&\quad+
\bigl[
F(t_{k-1},X_{t_k})-F(t_{k-1},X_{t_{k-1}})
\bigr]
\end{aligned}
$$

と分けます。

第一括弧は時間方向の [平均値定理](../RA3/index.md#thm-ra3-mvt) により

$$
\partial_tF(\xi_k,X_{t_k})\Delta t_k
$$

であり、continuity から和は

$$
\int_0^t
\partial_sF(s,X_s)\,ds
$$

へ収束します。

第二括弧へ [多次元 Itô 公式](#thm-sto7-multidimensional-ito) の証明と同じ空間 Taylor argument を使うと

$$
\sum_i
\int_0^t
\partial_iF(s,X_s)\,dX_s^i
+
\frac12
\sum_{i,j}
\int_0^t
\partial_{ij}F(s,X_s)\,d[X^i,X^j]_s
$$

を得ます。

Itô 過程の表示

$$
dX_t^i
=
b_t^i\,dt
+
\sum_\alpha
\sigma_t^{i\alpha}\,dB_t^\alpha
$$

と

$$
d[X^i,X^j]_t
=
a_t^{ij}\,dt
$$

を代入し、$dt$ 項と $dB^\alpha$ 項をまとめれば主張の式になります。
<!-- proof-end -->

ドリフト部分に現れる

$$
\sum_i b^i\partial_i
+
\frac12
\sum_{i,j}a^{ij}\partial_{ij}
$$

は STO11 で [生成作用素](../STO11/index.md#def-sto11-generator) として再登場します。

### 例：$d$ 次元ブラウン運動の二乗長さ

$X=B$、$F(x)=|x|^2$ とします。

$$
\nabla F(x)=2x,
\qquad
D^2F(x)=2I_d.
$$

したがって

$$
d|B_t|^2
=
2B_t^\top dB_t
+
d\,dt.
$$

ゆえに

$$
|B_t|^2-dt
$$

は局所マルチンゲール、実際には各有限時間区間で square-integrable martingale です。

---

## 8. 指数関数で Itô 補正を打ち消す

<a id="def-sto7-stochastic-exponential"></a>

<!-- formal-statement-start -->
> **定義（確率指数関数）**  
> $M$ を continuous 局所マルチンゲールとする。
>
$$
\mathcal E(M)_t
:=
\exp\left(
M_t-M_0-\frac12([M]_t-[M]_0)
\right)
$$
>
> を $M$ の **確率指数関数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto7-stochastic-exponential -->
**定義の確認**

### 直接例：ブラウン運動

$M_t=\theta B_t$、$M_0=0$ なら

$$
[M]_t=\theta^2t
$$

なので

$$
\mathcal E(\theta B)_t
=
\exp\left(
\theta B_t-\frac12\theta^2t
\right).
$$

ordinary exponential $e^{\theta B_t}$ ではなく、$-\theta^2t/2$ を引いた形が自然に現れます。
<!-- definition-example-end -->

<a id="prop-sto7-stochastic-exponential-identity"></a>

<!-- formal-statement-start -->
> **命題（確率指数関数の基本恒等式）**  
> $M$ を continuous 局所マルチンゲールとし
>
$$
Z_t=\mathcal E(M)_t
$$
>
> とする。このとき $Z$ は正の continuous 局所マルチンゲールで
>
$$
Z_t
=
1+
\int_0^tZ_s\,d(M_s-M_0)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$$
F(x,v)=e^{x-v/2}
$$

を $(M-M_0,[M]-[M]_0)$ に適用します。

$v=[M]$ は finite variation なので

$$
[v]=[M,v]=0.
$$

一方

$$
F_v=-\frac12F,
\qquad
F_{xx}=F
$$

なので、$d[M]$ に掛かる二つの項が正確に打ち消し合います。

<!-- proof-start -->
### 証明

$$
X_t=M_t-M_0,
\qquad
V_t=[M]_t-[M]_0
$$

と置きます。

[多次元 Itô 公式](#thm-sto7-multidimensional-ito) を

$$
F(x,v)=e^{x-v/2}
$$

へ適用します。

$V$ は finite variation なので

$$
[V]=0,
\qquad
[X,V]=0.
$$

偏導関数は

$$
F_x=F,
\qquad
F_v=-\frac12F,
\qquad
F_{xx}=F.
$$

従って

$$
\begin{aligned}
dZ_t
&=
F_x\,dX_t
+
F_v\,dV_t
+
\frac12F_{xx}\,d[X]_t\\
&=
Z_t\,dM_t
-\frac12Z_t\,d[M]_t
+\frac12Z_t\,d[M]_t\\
&=
Z_t\,dM_t.
\end{aligned}
$$

$Z$ は正で continuous、停止すれば $Z$ は有界被積分過程による確率積分の和として martingale になるため continuous 局所マルチンゲールです。
<!-- proof-end -->

確率指数関数は **局所マルチンゲールであること**と **真の martingale であること**を区別する必要があります。一般の条件は STO10 の Girsanov で扱います。

<a id="prop-sto7-brownian-exponential-martingale"></a>

<!-- formal-statement-start -->
> **命題（ブラウン指数マルチンゲール）**  
> $B$ を $d$ 次元 standard ブラウン運動、$\theta\in\mathbb R^d$ を定数 vector とする。このとき
>
$$
Z_t
=
\exp\left(
\theta^\top B_t
-
\frac12|\theta|^2t
\right)
$$
>
> は正の martingale であり
>
$$
E[Z_t]=1
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0\le s<t$ とします。

$$
Z_t
=
Z_s
\exp\left(
\theta^\top(B_t-B_s)
-
\frac12|\theta|^2(t-s)
\right).
$$

increment $B_t-B_s$ は $\mathcal F_s$ と独立で

$$
N_d(0,(t-s)I_d)
$$

に従います。

Gaussian のモーメント母関数から

$$
E\exp\left(
\theta^\top(B_t-B_s)
\right)
=
\exp\left(
\frac12|\theta|^2(t-s)
\right).
$$

従って

$$
\begin{aligned}
E[Z_t\mid\mathcal F_s]
&=
Z_s
e^{-|\theta|^2(t-s)/2}
E\left[
e^{\theta^\top(B_t-B_s)}
\right]\\
&=
Z_s.
\end{aligned}
$$

よって $Z$ は martingale です。$Z_0=1$ なので

$$
E[Z_t]=1.
$$
<!-- proof-end -->

この density 過程が STO10 で measure change の中心になります。

---

## 9. 対称和を使う理由

Itô 公式は正しい。しかし連鎖律に二階補正が付きます。

$$
df(X)
=
\nabla f(X)^\top dX
+
\frac12D^2f(X):d[X].
$$

幾何学的な変数変換を考えると、「普通の連鎖律と同じ形で書ける積分」が欲しくなります。

そこで left endpoint だけでなく、区間の両端を対称に使います。

<a id="def-sto7-stratonovich-integral"></a>

<!-- formal-statement-start -->
> **定義（Stratonovich integral）**  
> $H,X$ を連続セミマルチンゲールとする。partition
>
$$
\pi=\{0=t_0<t_1<\cdots<t_n=t\}
$$
>
> に対する symmetric sum
>
$$
S_\pi^\circ(H,X)
=
\sum_{k=1}^n
\frac{H_{t_{k-1}}+H_{t_k}}2
(X_{t_k}-X_{t_{k-1}})
$$
>
> が mesh $|\pi|\to0$ で ucp limit を持つとき、その極限を
>
$$
\int_0^tH_s\circ dX_s
$$
>
> と書き、**Stratonovich integral** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto7-stratonovich-integral -->
**定義の確認**

### 直接例：定数被積分過程

$H\equiv c$ なら任意の partition で

$$
S_\pi^\circ(c,X)
=
c\sum_k(X_{t_k}-X_{t_{k-1}})
=
c(X_t-X_0).
$$

従って

$$
\int_0^tc\circ dX_s
=
c(X_t-X_0).
$$

定数係数では Itô と Stratonovich の差はありません。差が出るのは被積分過程自身も $X$ と一緒に揺れるときです。
<!-- definition-example-end -->

---

## 10. Itô--Stratonovich 変換：差は共変分の半分

<a id="thm-sto7-ito-stratonovich-conversion"></a>

<!-- formal-statement-start -->
> **定理（Stratonovich integral と Itô integral の変換）**  
> $H,X$ を連続セミマルチンゲールとする。このとき Stratonovich integral は存在し
>
$$
\boxed{
\int_0^tH_s\circ dX_s
=
\int_0^tH_s\,dX_s
+
\frac12[H,X]_t.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

symmetric sum を left sum と cross sum に分けるだけです。

$$
\frac{H_{k-1}+H_k}{2}\Delta X_k
=
H_{k-1}\Delta X_k
+
\frac12\Delta H_k\Delta X_k.
$$

前者は Itô / セミマルチンゲール integral、後者は共変分へ収束します。

<!-- proof-start -->
### 証明

各 partition 区間で

$$
\frac{H_{t_{k-1}}+H_{t_k}}2
=
H_{t_{k-1}}
+
\frac12(H_{t_k}-H_{t_{k-1}}).
$$

従って

$$
S_\pi^\circ(H,X)
=
\sum_kH_{t_{k-1}}\Delta_kX
+
\frac12
\sum_k\Delta_kH\Delta_kX.
$$

第一和はセミマルチンゲール integral の left endpoint approximation により

$$
\int_0^tH_s\,dX_s
$$

へ ucp 収束します。

第二和は共変分の定義から

$$
[H,X]_t
$$

へ ucp 収束します。

従って

$$
\int_0^tH_s\circ dX_s
=
\int_0^tH_s\,dX_s
+
\frac12[H,X]_t.
$$
<!-- proof-end -->

### 最小例：$\int B\circ dB$

Itô integral は

$$
\int_0^tB_s\,dB_s
=
\frac12(B_t^2-t).
$$

conversion formula から

$$
\begin{aligned}
\int_0^tB_s\circ dB_s
&=
\int_0^tB_s\,dB_s
+
\frac12[B]_t\\
&=
\frac12(B_t^2-t)+\frac12t\\
&=
\frac12B_t^2.
\end{aligned}
$$

ordinary calculus の

$$
\int x\,dx=\frac12x^2
$$

と同じ形へ戻りました。

---

## 11. 合成関数と共変分

通常形の微分公式を示すには

$$
[\partial_i f(X),X^i]
$$

を計算する必要があります。

<a id="lem-sto7-covariation-composition"></a>

<!-- formal-statement-start -->
> **補題（共変分の連鎖律）**  
> $X=(X^1,\ldots,X^d)$ を連続セミマルチンゲール、$Y$ を連続セミマルチンゲール、$g\in C^2(\mathbb R^d)$ とする。このとき
>
$$
\boxed{
[g(X),Y]_t
=
\sum_{j=1}^d
\int_0^t
\partial_jg(X_s)\,d[X^j,Y]_s.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

一階 Taylor 展開

$$
\Delta g(X)
=
\nabla g(X_{\text{left}})^\top\Delta X
+
o(|\Delta X|)
$$

を $\Delta Y$ と掛けます。

main 項は重み付き共変分和 へ行きます。剰余項は

$$
o(|\Delta X|)\,|\Delta Y|
$$

で、Cauchy--Schwarz と二次変分の boundedness から消えます。

<!-- proof-start -->
### 証明

固定 $T$ で stopping により $X,Y$ をコンパクト集合 range に局所化します。

$g\in C^1$ なので一階 Taylor 剰余項は

$$
g(x+h)-g(x)
=
\nabla g(x)^\top h+r(x,h),
$$

かつコンパクト集合 set 上で

$$
|r(x,h)|
\le
\eta(|h|)|h|,
\qquad
\eta(\delta)\to0.
$$

partition 上で

$$
\sum_k
\Delta_kg(X)\Delta_kY
=
\sum_{j=1}^d
\sum_k
\partial_jg(X_{t_{k-1}})
\Delta_kX^j\Delta_kY
+
\sum_kr_k\Delta_kY.
$$

第一項は [重み付き共変分和](#lem-sto7-weighted-covariation) から

$$
\sum_j
\int_0^t
\partial_jg(X_s)\,d[X^j,Y]_s
$$

へ収束します。

剰余項は

$$
\begin{aligned}
\left|
\sum_kr_k\Delta_kY
\right|
&\le
\eta\left(\max_k|\Delta_kX|\right)
\sum_k|\Delta_kX||\Delta_kY|\\
&\le
\eta\left(\max_k|\Delta_kX|\right)
\left(\sum_k|\Delta_kX|^2\right)^{1/2}
\left(\sum_k(\Delta_kY)^2\right)^{1/2}.
\end{aligned}
$$

continuity から最初の factor はほとんど確実に 0 へ行き、残りは二次変分 convergence により有界 in probability です。従って剰余項は in probability で 0 へ行きます。

左辺は共変分 $[g(X),Y]_t$ へ収束するので主張が従います。
<!-- proof-end -->

---

## 12. ユークリッド空間の Stratonovich 連鎖律：通常の形が戻る

<a id="thm-sto7-stratonovich-composition"></a>

<!-- formal-statement-start -->
> **定理（ユークリッド空間の Stratonovich の連鎖律）**  
> $X=(X^1,\ldots,X^d)$ を連続セミマルチンゲール、$f\in C^2(\mathbb R^d)$ とする。このとき
>
$$
\boxed{
f(X_t)-f(X_0)
=
\sum_{i=1}^d
\int_0^t
\partial_i f(X_s)\circ dX_s^i.
}
$$
<!-- formal-statement-end -->

### なぜ二階項が消えたのか

消えたのではありません。

Stratonovich integral 自身が

$$
\frac12[H,X]
$$

を内部に持っており、その補正が Itô 公式の Hessian 項をちょうど吸収しています。

<!-- proof-start -->
### 証明

conversion formula から

$$
\int_0^t
\partial_i f(X_s)\circ dX_s^i
=
\int_0^t
\partial_i f(X_s)\,dX_s^i
+
\frac12
[\partial_i f(X),X^i]_t.
$$

[共変分連鎖律](#lem-sto7-covariation-composition) を

$$
g=\partial_i f,
\qquad
Y=X^i
$$

へ適用すると

$$
[\partial_i f(X),X^i]_t
=
\sum_{j=1}^d
\int_0^t
\partial_{ij}f(X_s)\,d[X^j,X^i]_s.
$$

従って $i$ について足すと

$$
\begin{aligned}
\sum_i
\int_0^t
\partial_i f(X_s)\circ dX_s^i
&=
\sum_i
\int_0^t
\partial_i f(X_s)\,dX_s^i\\
&\quad+
\frac12
\sum_{i,j}
\int_0^t
\partial_{ij}f(X_s)\,d[X^i,X^j]_s.
\end{aligned}
$$

右辺は [多次元 Itô 公式](#thm-sto7-multidimensional-ito) により

$$
f(X_t)-f(X_0)
$$

です。
<!-- proof-end -->

これが Stratonovich calculus が座標変換と相性がよい理由のユークリッド空間の core です。

ただし本章ではここから manifold へ進みません。manifold では「座標変換で同じ形を保つ」という性質がさらに重要になりますが、その議論には tangent bundle / connection 等の幾何学側の正本が必要です。

---

## 13. Itô 過程で補正を明示する

<a id="cor-sto7-ito-process-stratonovich"></a>

<!-- formal-statement-start -->
> **系（Itô 過程に対する Itô--Stratonovich 変換）**  
> $X$ を $\mathbb R^d$-値 Itô 過程
>
$$
dX_t=b_t\,dt+\sigma_t\,dB_t,
\qquad
a_t=\sigma_t\sigma_t^\top
$$
>
> とし、$h=(h_1,\ldots,h_d)\in C^2(\mathbb R^d;\mathbb R^d)$ とする。このとき
>
$$
\boxed{
\sum_i
\int_0^t
h_i(X_s)\circ dX_s^i
=
\sum_i
\int_0^t
h_i(X_s)\,dX_s^i
+
\frac12
\int_0^t
\sum_{i,j}
\partial_jh_i(X_s)a_s^{ji}\,ds.
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

基本 conversion formula から

$$
\sum_i
\int h_i(X)\circ dX^i
=
\sum_i
\int h_i(X)\,dX^i
+
\frac12
\sum_i
[h_i(X),X^i].
$$

共変分連鎖律により

$$
d[h_i(X),X^i]_s
=
\sum_j
\partial_jh_i(X_s)\,d[X^j,X^i]_s.
$$

Itô 過程では

$$
d[X^j,X^i]_s
=
a_s^{ji}\,ds.
$$

従って

$$
\frac12
\sum_i
[h_i(X),X^i]_t
=
\frac12
\int_0^t
\sum_{i,j}
\partial_jh_i(X_s)a_s^{ji}\,ds.
$$
<!-- proof-end -->

### ブラウン integrator に対する形

$G_\alpha:\mathbb R^d\to\mathbb R$ を $C^1$ とすると

$$
\int_0^tG_\alpha(X_s)\circ dB_s^\alpha
=
\int_0^tG_\alpha(X_s)\,dB_s^\alpha
+
\frac12
[G_\alpha(X),B^\alpha]_t.
$$

さらに

$$
d[X^j,B^\alpha]_t
=
\sigma_t^{j\alpha}\,dt
$$

なので

$$
\boxed{
\int_0^tG_\alpha(X_s)\circ dB_s^\alpha
=
\int_0^tG_\alpha(X_s)\,dB_s^\alpha
+
\frac12
\int_0^t
\sum_j
\partial_jG_\alpha(X_s)\sigma_s^{j\alpha}\,ds.
}
$$

この式をベクトル場ごとに足すと、STO9 で扱う [ブラウン SDE](../STO9/index.md#def-sto9-sde) を Stratonovich 表示から Itô 表示へ直すドリフト補正

$$
\frac12
\sum_\alpha
DV_\alpha(x)V_\alpha(x)
$$

が現れます。本章では「変換公式」までを閉じ、SDE の存在一意性は STO9 に残します。

---

## 14. 計算規則を暗記ではなく bracket から読む

Itô 解析でよく使う表をまとめると

$$
dB^i\,dB^j
=
\delta_{ij}\,dt,
$$

$$
dB^i\,dt=0,
$$

$$
dt\,dt=0.
$$

これは記号上の掛け算を新しく定義したわけではありません。

正確には

$$
d[X,Y]
$$

を二次増分の極限として読み、finite-variation part を含む cross variation が消えることを短縮して書いたものです。

したがって、迷ったら表を暗記するより

1. 局所マルチンゲール part は何か。
2. bracket / 共変分は何か。
3. finite-variation part は二次変分へ寄与するか。

へ戻る方が安全です。

---

# 15. 演習

## STO7-A01 多次元ブラウン運動の線形結合

- Level: A
- 目安時間: 12分

$B$ を $d$ 次元 standard ブラウン運動、$a,c\in\mathbb R^d$ を定数 vector とする。

$$
M_t=a^\top B_t,
\qquad
N_t=c^\top B_t
$$

と置く。

1. $[M,N]_t$ を求めよ。
2. $[M]_t$ を求めよ。
3. $a\perp c$ のとき何が起きるか説明せよ。

<!-- solution-start -->
### 詳細解答

1. bilinearity と [vector ブラウン共変分](#prop-sto7-vector-brownian-covariation) から

$$
\begin{aligned}
[M,N]_t
&=
\left[
\sum_i a_iB^i,
\sum_jc_jB^j
\right]_t\\
&=
\sum_{i,j}
a_ic_j[B^i,B^j]_t\\
&=
\sum_{i,j}
a_ic_j\delta_{ij}t\\
&=
(a^\top c)t.
\end{aligned}
$$

2. $N=M$、すなわち $c=a$ とすれば

$$
[M]_t
=
|a|^2t.
$$

3. $a^\top c=0$ なら

$$
[M,N]_t=0.
$$

これは二つの線形ブラウン martingale の cross variation が消えることを意味します。この Gaussian setting では covariance も

$$
E[M_tN_t]
=
(a^\top c)t
=
0
$$

であり、joint Gaussian 性から各固定時刻では独立になります。
<!-- solution-end -->

## STO7-A02 積の公式で $B^1B^2$ を調べる

- Level: A
- 目安時間: 12分

$B=(B^1,B^2)$ を 2 次元 standard ブラウン運動とする。

積の公式を使って $B_t^1B_t^2$ を stochastic integrals で表し、martingale であることを説明せよ。

<!-- solution-start -->
### 詳細解答

[積の公式](#cor-sto7-product-rule) から

$$
B_t^1B_t^2
=
\int_0^tB_s^1\,dB_s^2
+
\int_0^tB_s^2\,dB_s^1
+
[B^1,B^2]_t.
$$

独立成分なので

$$
[B^1,B^2]_t=0.
$$

従って

$$
B_t^1B_t^2
=
\int_0^tB_s^1\,dB_s^2
+
\int_0^tB_s^2\,dB_s^1.
$$

有限時間区間で

$$
E\int_0^T(B_s^1)^2ds
=
\int_0^Ts\,ds
<\infty
$$

であり $B^2$ 側も同様です。よって両 stochastic integrals は square-integrable martingales で、その和 $B^1B^2$ も martingale です。
<!-- solution-end -->

## STO7-A03 ブラウン指数マルチンゲール

- Level: A
- 目安時間: 15分

1 次元ブラウン運動 $B$ と $\theta\in\mathbb R$ に対し

$$
Z_t
=
\exp\left(
\theta B_t-\frac12\theta^2t
\right)
$$

を考える。

1. Itô 公式から $dZ_t$ を求めよ。
2. $E[Z_t]$ を求めよ。
3. $\theta B_t$ の確率指数関数と一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

1. $F(t,x)=e^{\theta x-\theta^2t/2}$ とします。

$$
F_t=-\frac12\theta^2F,
\qquad
F_x=\theta F,
\qquad
F_{xx}=\theta^2F.
$$

時間依存 Itô 公式から

$$
\begin{aligned}
dZ_t
&=
\left(
-\frac12\theta^2Z_t
+
\frac12\theta^2Z_t
\right)dt
+
\theta Z_t\,dB_t\\
&=
\theta Z_t\,dB_t.
\end{aligned}
$$

ドリフトが正確に相殺されます。

2. [ブラウン指数マルチンゲール](#prop-sto7-brownian-exponential-martingale) より $Z$ は martingale で $Z_0=1$ です。従って

$$
E[Z_t]=E[Z_0]=1.
$$

直接計算しても $B_t\sim N(0,t)$ なので

$$
E[e^{\theta B_t}]
=
e^{\theta^2t/2}
$$

より同じ結論です。

3. $M_t=\theta B_t$ とすると

$$
[M]_t=\theta^2t.
$$

したがって定義から

$$
\mathcal E(M)_t
=
\exp\left(M_t-\frac12[M]_t\right)
=
Z_t.
$$
<!-- solution-end -->

## STO7-A04 Itô と Stratonovich の $\int B\,dB$

- Level: A
- 目安時間: 12分

ブラウン運動 $B$ に対し

$$
\int_0^tB_s\,dB_s
\qquad\text{と}\qquad
\int_0^tB_s\circ dB_s
$$

をそれぞれ $B_t,t$ で表せ。

<!-- solution-start -->
### 詳細解答

積の公式または $f(x)=x^2$ の Itô 公式から

$$
B_t^2
=
2\int_0^tB_s\,dB_s+t.
$$

従って

$$
\boxed{
\int_0^tB_s\,dB_s
=
\frac12(B_t^2-t).
}
$$

一方、[Itô--Stratonovich 変換](#thm-sto7-ito-stratonovich-conversion) から

$$
\int_0^tB_s\circ dB_s
=
\int_0^tB_s\,dB_s
+
\frac12[B]_t.
$$

$[B]_t=t$ なので

$$
\begin{aligned}
\int_0^tB_s\circ dB_s
&=
\frac12(B_t^2-t)+\frac12t\\
&=
\boxed{\frac12B_t^2}.
\end{aligned}
$$

差は

$$
\frac t2
$$

で、これは共変分補正の半分です。
<!-- solution-end -->

## STO7-B01 $d$ 次元ブラウン運動の二乗長さ

- Level: B
- 目安時間: 20分

$B$ を $d$ 次元 standard ブラウン運動とする。

1. $|B_t|^2$ に多次元 Itô 公式を適用せよ。
2.
   $$
   M_t=|B_t|^2-dt
   $$
   が martingale であることを示せ。
3. $E|B_t|^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

1. $f(x)=|x|^2=\sum_i x_i^2$ とすると

$$
\partial_if(x)=2x_i,
\qquad
\partial_{ij}f(x)=2\delta_{ij}.
$$

したがって

$$
\begin{aligned}
d|B_t|^2
&=
2\sum_iB_t^i\,dB_t^i
+
\frac12
\sum_{i,j}
2\delta_{ij}\,d[B^i,B^j]_t\\
&=
2B_t^\top dB_t
+
\sum_i dt\\
&=
2B_t^\top dB_t+d\,dt.
\end{aligned}
$$

2. 積分すると

$$
M_t
=
2\int_0^tB_s^\top dB_s.
$$

各固定 $s$ で

$$
E|B_s|^2=d\,s
$$

なので、各有限 $T$ について

$$
E\int_0^T|B_s|^2\,ds
=
d\int_0^T s\,ds
=
\frac d2T^2<\infty.
$$

従って右辺は square-integrable martingale です。

3. martingale の平均は初期値 $M_0=0$ に等しいので

$$
E|B_t|^2-dt=0.
$$

従って

$$
\boxed{
E|B_t|^2=dt.
}
$$
<!-- solution-end -->

## STO7-B02 二次形式に Itô 公式を適用する

- Level: B
- 目安時間: 25分

$X_t=x+bt+\Sigma B_t$ を $\mathbb R^d$-値 Itô 過程とし、$Q$ を対称 $d\times d$ matrix とする。

$$
f(x)=x^\top Qx
$$

に Itô 公式を適用し、$df(X_t)$ を求めよ。

<!-- solution-start -->
### 詳細解答

対称性 $Q^\top=Q$ から

$$
\nabla f(x)=2Qx,
\qquad
D^2f(x)=2Q.
$$

また

$$
dX_t=b\,dt+\Sigma\,dB_t,
$$

$$
a=\Sigma\Sigma^\top.
$$

時間依存性はないので Itô 過程 formula から

$$
df(X_t)
=
\nabla f(X_t)^\top b\,dt
+
\frac12
\operatorname{tr}(aD^2f(X_t))\,dt
+
\nabla f(X_t)^\top\Sigma\,dB_t.
$$

各項を代入すると

$$
\nabla f(X_t)^\top b
=
2X_t^\top Qb,
$$

$$
\frac12\operatorname{tr}(aD^2f)
=
\frac12\operatorname{tr}(a\,2Q)
=
\operatorname{tr}(aQ),
$$

$$
\nabla f(X_t)^\top\Sigma
=
2X_t^\top Q\Sigma.
$$

従って

$$
\boxed{
d(X_t^\top QX_t)
=
\left(
2X_t^\top Qb
+
\operatorname{tr}(\Sigma\Sigma^\top Q)
\right)dt
+
2X_t^\top Q\Sigma\,dB_t.
}
$$

二階補正は scalar では $\sigma^2f''/2$ でしたが、多次元では covariance matrix と Hessian の trace pairing

$$
\frac12\operatorname{tr}(aD^2f)
$$

になります。
<!-- solution-end -->

## STO7-B03 線形 1形式の Stratonovich 補正

- Level: B
- 目安時間: 22分

$B$ を $d$ 次元 standard ブラウン運動、$C=(C_{ij})$ を定数 $d\times d$ matrix とする。

$$
h(x)=Cx
$$

と置き、

$$
I_t^\circ
=
\sum_{i=1}^d
\int_0^t
h_i(B_s)\circ dB_s^i
$$

を Itô integrals で表せ。

<!-- solution-start -->
### 詳細解答

[Itô--Stratonovich 変換](#thm-sto7-ito-stratonovich-conversion) から

$$
I_t^\circ
=
\sum_i
\int_0^t
h_i(B_s)\,dB_s^i
+
\frac12
\int_0^t
\sum_{i,j}
\partial_jh_i(B_s)\delta_{ji}\,ds.
$$

$h_i(x)=\sum_jC_{ij}x_j$ なので

$$
\partial_jh_i=C_{ij}.
$$

したがって補正は

$$
\begin{aligned}
\frac12
\int_0^t
\sum_{i,j}
C_{ij}\delta_{ji}\,ds
&=
\frac12
\int_0^t
\sum_iC_{ii}\,ds\\
&=
\frac12\operatorname{tr}(C)t.
\end{aligned}
$$

従って

$$
\boxed{
I_t^\circ
=
\sum_i
\int_0^t
(CB_s)_i\,dB_s^i
+
\frac12\operatorname{tr}(C)t.
}
$$

特に $C$ が skew-symmetric なら $\operatorname{tr}(C)=0$ なので Itô と Stratonovich は一致します。
<!-- solution-end -->

## STO7-C01 ベクトル場形式の Itô--Stratonovich ドリフト補正

- Level: C
- 目安時間: 45分

$B=(B^1,\ldots,B^m)$ を $m$ 次元ブラウン運動とし、$V_0,V_1,\ldots,V_m:\mathbb R^d\to\mathbb R^d$ を $C^1$ vector fields とする。

連続セミマルチンゲール $X$ が積分恒等式

$$
X_t
=
X_0
+
\int_0^tV_0(X_s)\,ds
+
\sum_{\alpha=1}^m
\int_0^tV_\alpha(X_s)\circ dB_s^\alpha
$$

を満たすと仮定する。

1. 各 $\alpha$ について
   $$
   [X^j,B^\alpha]_t
   =
   \int_0^tV_\alpha^j(X_s)\,ds
   $$
   を示せ。
2. 各 Stratonovich integral を Itô integral に変換し、
   $$
   X_t
   =
   X_0
   +
   \int_0^t
   \left[
   V_0(X_s)
   +
   \frac12
   \sum_{\alpha=1}^m
   DV_\alpha(X_s)V_\alpha(X_s)
   \right]ds
   +
   \sum_{\alpha=1}^m
   \int_0^tV_\alpha(X_s)\,dB_s^\alpha
   $$
   を導け。
3. 補正がなぜ $DV_\alpha V_\alpha$ で、$DV_\alpha V_\beta$ の $\alpha\ne\beta$ 項を含まないか説明せよ。

<!-- solution-start -->
### 詳細解答

この問題では SDE の存在一意性は仮定していません。与えられた連続セミマルチンゲール $X$ が満たす二つの積分表示の同値性だけを、現在章の calculus で示します。

#### 1. $[X^j,B^\alpha]$ を求める

まず Stratonovich 表示を見ても、finite-variation part

$$
\int_0^tV_0^j(X_s)\,ds
$$

は共変分へ寄与しません。

また Stratonovich integral と Itô integral の差は finite-variation 補正です。したがって $X^j$ の局所マルチンゲール part は

$$
\sum_{\beta=1}^m
\int_0^tV_\beta^j(X_s)\,dB_s^\beta.
$$

[多次元ブラウン確率積分の共変分](#lem-sto7-vector-brownian-integral-covariation) と

$$
[B^\beta,B^\alpha]_t
=
\delta_{\alpha\beta}t
$$

から

$$
\begin{aligned}
[X^j,B^\alpha]_t
&=
\sum_{\beta=1}^m
\left[
\int_0^\cdot
V_\beta^j(X_s)\,dB_s^\beta,
B^\alpha
\right]_t\\
&=
\sum_{\beta=1}^m
\int_0^t
V_\beta^j(X_s)\,d[B^\beta,B^\alpha]_s\\
&=
\int_0^t
V_\alpha^j(X_s)\,ds.
\end{aligned}
$$

#### 2. 各雑音項を変換する

component $i$ を固定します。

conversion formula から

$$
\int_0^t
V_\alpha^i(X_s)\circ dB_s^\alpha
=
\int_0^t
V_\alpha^i(X_s)\,dB_s^\alpha
+
\frac12
[V_\alpha^i(X),B^\alpha]_t.
$$

共変分連鎖律を使うと

$$
[V_\alpha^i(X),B^\alpha]_t
=
\sum_{j=1}^d
\int_0^t
\partial_jV_\alpha^i(X_s)\,
d[X^j,B^\alpha]_s.
$$

1 の結果を代入して

$$
[V_\alpha^i(X),B^\alpha]_t
=
\int_0^t
\sum_{j=1}^d
\partial_jV_\alpha^i(X_s)
V_\alpha^j(X_s)\,ds.
$$

vector notation では

$$
\left(
\sum_j
\partial_jV_\alpha^i
V_\alpha^j
\right)_{i=1}^d
=
DV_\alpha\,V_\alpha.
$$

従って

$$
\int_0^t
V_\alpha(X_s)\circ dB_s^\alpha
=
\int_0^t
V_\alpha(X_s)\,dB_s^\alpha
+
\frac12
\int_0^t
DV_\alpha(X_s)V_\alpha(X_s)\,ds.
$$

$\alpha=1,\ldots,m$ について足すと

$$
\boxed{
\begin{aligned}
X_t
&=
X_0
+
\int_0^t
\left[
V_0(X_s)
+
\frac12
\sum_{\alpha=1}^m
DV_\alpha(X_s)V_\alpha(X_s)
\right]ds\\
&\quad+
\sum_{\alpha=1}^m
\int_0^t
V_\alpha(X_s)\,dB_s^\alpha.
\end{aligned}
}
$$

#### 3. なぜ $\alpha=\beta$ だけ残るか

根本は vector ブラウン共変分

$$
d[B^\beta,B^\alpha]_t
=
\delta_{\alpha\beta}\,dt
$$

です。

異なるブラウン成分では

$$
[B^\beta,B^\alpha]=0
\qquad(\alpha\ne\beta)
$$

なので cross 補正は消えます。

一方、同じ成分では

$$
[B^\alpha]_t=t
$$

が残るため、その方向のベクトル場 $V_\alpha$ を自分自身の方向へ微分した

$$
DV_\alpha\,V_\alpha
$$

が補正になります。

これが STO9 で Stratonovich SDE と Itô SDE を行き来するときの標準ドリフト補正です。
<!-- solution-end -->

---

## 16. まとめ

本章の核心は

$$
\boxed{
\Delta X^i\Delta X^j
\longrightarrow
d[X^i,X^j]
}
$$

を Taylor 展開へ差し込むことです。

ここから

$$
df(X)
=
\nabla f(X)^\top dX
+
\frac12
D^2f(X):d[X]
$$

が出て、ブラウン Itô 過程では

$$
d[X]_t
=
\sigma_t\sigma_t^\top dt
$$

なので

$$
\frac12
D^2f:d[X]
=
\frac12
\operatorname{tr}
(\sigma\sigma^\top D^2f)\,dt
$$

となります。

さらに symmetric sum を使うと

$$
\int H\circ dX
=
\int H\,dX
+
\frac12[H,X],
$$

この補正を integral 側へ吸収することで

$$
df(X)
=
\nabla f(X)^\top\circ dX
$$

という通常形の連鎖律が戻ります。

次は STO8 で、$C^2$ でない $f(x)=|x|$ に Itô 解析を押し広げます。そこで二階微分の代わりに **局所時間** が現れ、Tanaka formula と滞在時間 formula へ進みます。
