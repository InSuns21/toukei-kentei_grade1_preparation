# STO11：状態から未来を記述する — 確率過程を局所作用素で読む

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[ブラウン運動のマルコフ性](../STO4/index.md#thm-sto4-brownian-markov)、[SDE の大域的存在一意性](../STO9/index.md#thm-sto9-global-existence-uniqueness)、[時間依存 Itô 公式](../STO7/index.md#thm-sto7-ito-process-formula)、[Lévy の特徴付け定理](../STO5/index.md#thm-sto5-levy-characterization) を再利用します。

STO4 ではブラウン運動についてマルコフ性と強マルコフ性を標本路側から学び、STO9 では

$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dW_t
$$

という SDE を雑音から構成しました。

本章では視点を反転します。

$$
\boxed{
\text{現在状態からの未来分布}
\longleftrightarrow
\text{時間発展作用素}
\longleftrightarrow
\text{局所微分作用素}
\longleftrightarrow
\text{標本路法則の特徴付け}
}
$$

を作ります。

この対応が重要なのは、SDE のドリフトと拡散係数から得られる二階微分作用素

$$
Lf
=
b\cdot\nabla f
+
\frac12\operatorname{tr}(aD^2f),
\qquad
a=\sigma\sigma^\top
$$

が、同時に

- 拡散の無限小時間発展
- 時間後向きの関数発展
- 分布の前向き発展
- Feynman--Kac による確率表現
- 標本路法則の特徴付け
- 後続の確率制御 / HJB

の共通言語になるからです。

本章の停止線は Euclidean 拡散です。jump 過程は STO13--STO14、多様体上の拡散は幾何学系列完成後へ送ります。

---

## 1. 「過去全部」ではなく「現在状態」だけを見る

STO4 の [ブラウン運動のマルコフ性](../STO4/index.md#thm-sto4-brownian-markov) では、ブラウン運動の未来の増分が過去と独立であることから

$$
E[f(B_{s+t})\mid\mathcal F_s]
$$

が $B_s$ の関数だけで書けました。

一般化するときは、この「現在状態から未来分布を返す装置」そのものを最初の対象として切り出します。

<a id="def-sto11-transition-kernel"></a>

<!-- formal-statement-start -->
> **定義（遷移核）**  
> 状態空間を $\mathbb R^d$ とする。各 $t\ge0$ に対し

$$
P_t:\mathbb R^d\times\mathcal B(\mathbb R^d)\to[0,1]
$$

> が次を満たすとき、$(P_t)_{t\ge0}$ を遷移核の族という。
>
> 1. 各 $x$ に対して $A\mapsto P_t(x,A)$ は $\mathbb R^d$ 上の確率測度である。
> 2. 各 Borel 集合 $A$ に対して $x\mapsto P_t(x,A)$ は Borel 可測である。
> 3. $P_0(x,A)=\mathbf1_A(x)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto11-transition-kernel -->
### 直接例：ブラウン運動のガウス核

**定義の確認**

$d$ 次元ブラウン運動を初期点 $x$ から出発させます。

$t>0$ では

$$
X_t=x+B_t
$$

なので

$$
P_t(x,A)
=
\int_A
\frac{1}{(2\pi t)^{d/2}}
\exp\left(
-\frac{|y-x|^2}{2t}
\right)dy.
$$

固定した $x$ についてガウス密度の積分なので

$$
P_t(x,\mathbb R^d)=1.
$$

また固定した Borel 集合 $A$ について、$(x,y)\mapsto\mathbf1_A(y)e^{-|y-x|^2/(2t)}$ は非負 Borel 可測です。非負 Borel 関数の一変数積分は残りの変数について Borel 可測なので、$x\mapsto P_t(x,A)$ も Borel 可測です。

$t=0$ では

$$
P_0(x,A)=\mathbf1_A(x)
$$

と置きます。

したがってブラウン運動の未来分布は遷移核の具体例になっています。
<!-- definition-example-end -->

---

## 2. 時間一様マルコフ性

<a id="def-sto11-markov-process"></a>

<!-- formal-statement-start -->
> **定義（時間一様マルコフ過程）**  
> フィルトレーション付き確率空間上の適合過程 $X=(X_t)_{t\ge0}$ と遷移核 $(P_t)_{t\ge0}$ を考える。
>
> 任意の有界 Borel 関数 $f:\mathbb R^d\to\mathbb R$ と $s,t\ge0$ に対して

$$
E[f(X_{s+t})\mid\mathcal F_s]
=
P_tf(X_s)
\qquad\text{a.s.}
$$

> が成り立つとき、$X$ を 時間一様マルコフ過程という。ここで

$$
P_tf(x)
:=
\int_{\mathbb R^d}f(y)P_t(x,dy).
$$
<!-- formal-statement-end -->

time-homogeneous という語は「未来分布が絶対時刻 $s$ に依存せず、経過時間 $t$ だけに依存する」ことを表します。

<!-- definition-example-start: def-sto11-markov-process -->
### 直接例：ブラウン運動では現在位置を引けば未来が新しいブラウン運動になる

**定義の確認**

$X_t=x+B_t$ とします。

$s,t\ge0$ に対して

$$
X_{s+t}
=
X_s+(B_{s+t}-B_s).
$$

増分

$$
B_{s+t}-B_s
$$

は $\mathcal F_s$ と独立で $N(0,tI_d)$ に従います。

したがって有界 Borel $f$ について

$$
\begin{aligned}
E[f(X_{s+t})\mid\mathcal F_s]
&=
\int_{\mathbb R^d}
f(X_s+z)
\frac{e^{-|z|^2/(2t)}}{(2\pi t)^{d/2}}dz\\
&=
P_tf(X_s).
\end{aligned}
$$

過去の標本路全体ではなく、$X_s$ だけが残っています。
<!-- definition-example-end -->

---

## 3. 核を関数作用素として束ねる

<a id="def-sto11-markov-semigroup"></a>

<!-- formal-statement-start -->
> **定義（マルコフ半群）**  
> 遷移核 $(P_t)$ に対して

$$
P_tf(x)
=
\int f(y)P_t(x,dy)
$$

> と定める。
>
> 有界 Borel 関数を有界 Borel 関数へ送る作用素族 $(P_t)_{t\ge0}$ が

$$
P_0=I,
\qquad
P_{s+t}=P_sP_t,
$$

> さらに

$$
f\ge0\Longrightarrow P_tf\ge0,
\qquad
P_t1=1
$$

> を満たすとき、マルコフ半群という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto11-markov-semigroup -->
### 直接例：決定論的フロー は最も単純な半群

**定義の確認**

1 次元で

$$
X_t=x+ct
$$

とします。

未来は確率的でなく

$$
P_t(x,A)=\mathbf1_A(x+ct)
$$

です。

したがって

$$
P_tf(x)=f(x+ct).
$$

さらに

$$
\begin{aligned}
P_sP_tf(x)
&=
P_tf(x+cs)\\
&=
f(x+cs+ct)\\
&=
f(x+c(s+t))\\
&=
P_{s+t}f(x).
\end{aligned}
$$

この時間合成則は「時間 $s$ 進めてから $t$ 進めること」と「一度に $s+t$ 進めること」が一致することを表しています。
<!-- definition-example-end -->

<a id="prop-sto11-chapman-kolmogorov"></a>

<!-- formal-statement-start -->
> **命題（Chapman--Kolmogorov と半群法則）**  
> $X$ が 時間一様マルコフ過程で遷移核 $(P_t)$ を持つとする。
>
> このとき任意の $s,t\ge0$ と Borel 集合 $A$ について

$$
P_{s+t}(x,A)
=
\int_{\mathbb R^d}
P_t(y,A)P_s(x,dy),
$$

> したがって有界 Borel 関数上で

$$
P_{s+t}=P_sP_t
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $s+t$ の条件付き期待値をまず時刻 $s$ まで戻し、マルコフ性を一回使います。

その後初期状態 $x$ から平均すれば、途中状態 $X_s$ を積分消去できます。

<!-- proof-start -->
### 証明

初期状態を $X_0=x$ と固定します。

有界 Borel $f$ に対し tower property とマルコフ性から

$$
\begin{aligned}
P_{s+t}f(x)
&=
E_x[f(X_{s+t})]\\
&=
E_x[
E_x[f(X_{s+t})\mid\mathcal F_s]
]\\
&=
E_x[P_tf(X_s)]\\
&=
P_s(P_tf)(x).
\end{aligned}
$$

従って

$$
P_{s+t}=P_sP_t.
$$

$f=\mathbf1_A$ とすれば

$$
P_{s+t}(x,A)
=
\int P_t(y,A)P_s(x,dy).
$$
<!-- proof-end -->

---

## 4. SDE の解族はなぜ Markov 過程になるか

STO9 の大域 Lipschitz SDE では、同じ係数から各初期点 $x$ に対する強解 $X^x$ を一意に作れます。

<a id="prop-sto11-lipschitz-sde-markov"></a>

<!-- formal-statement-start -->
> **命題（大域 Lipschitz SDE の解族はマルコフ過程）**  
> $b,\sigma$ が大域 Lipschitz かつ線形成長を満たし、
>
$$
dX_t=b(X_t)dt+\sigma(X_t)dW_t,
\qquad
X_0=x
$$
>
> の強解 $X^x$ を各 $x\in\mathbb R^d$ から取る。
>
> 有界 Borel $f$ に対して
>
$$
P_tf(x):=E[f(X_t^x)]
$$
>
> と置けば、任意の $s,t\ge0$ について
>
$$
E[f(X_{s+t}^x)\mid\mathcal F_s]
=
P_tf(X_s^x)
\qquad\text{a.s.}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $s$ より後だけを見ると

$$
\widetilde W_r=W_{s+r}-W_s
$$

は $\mathcal F_s$ と独立なブラウン運動です。

時刻 $s$ 以後の $X$ は、初期値 $X_s$ と雑音 $\widetilde W$ から同じ SDE を解きます。

STO9 の経路ごとの一意性により、この continuation は「初期値 $X_s$ から新しいブラウン運動で作った solution」と一致します。

<!-- proof-start -->
### 証明

$r\ge0$ に対し

$$
Y_r:=X_{s+r}^x
$$

と置きます。

SDE の積分表示から

$$
Y_r
=
X_s^x
+
\int_0^r b(Y_u)du
+
\int_0^r\sigma(Y_u)d\widetilde W_u,
$$

ただし

$$
\widetilde W_u=W_{s+u}-W_s
$$

です。

ブラウン運動の independent increments により $\widetilde W$ は $\mathcal F_s$ と独立なブラウン運動です。

STO9 の Picard 構成は各反復を初期値とブラウン標本路の可測関数として作るため、極限 solution も可測な solution map で表せます。さらに[大域 Lipschitz SDE の強解の存在・経路ごとの一意性定理](../STO9/index.md#thm-sto9-global-existence-uniqueness)により、固定した初期値 $y$ とブラウン運動 $\widetilde W$ に対する solution は一意です。

したがって $\mathcal F_s$ を条件にしたとき、未来の標本路 $(Y_r)_{r\ge0}$ の条件付き法則は現在値 $X_s^x$ と独立な future 雑音 $\widetilde W$ だけで決まり、初期点 $X_s^x$ から同じ係数で再始動した solution 法則に一致します。

まず有界 continuous $f$ に対してこの条件付き期待値公式が得られます。公式を満たす有界 Borel 関数の族は有界 monotone pointwise limit で閉じ、有界 continuous functions は $\mathcal B(\mathbb R^d)$ を生成するので、monotone class argument により有界 Borel $f$ 全体へ拡張できます。

よって有界 Borel $f$ に対し

$$
E[f(X_{s+t}^x)\mid\mathcal F_s]
=
E[f(X_t^y)]_{y=X_s^x}
=
P_tf(X_s^x).
$$
<!-- proof-end -->

この命題により、以下で SDE solution family の時間発展作用素とその局所変化率を扱う論理が閉じます。

---

## 5. 時刻 0 直後の変化率を取り出す

前節までの作用素族は全時間の遷移を持っています。

ここから、そのうち $t=0$ 直後の一次変化だけを抜き出します。

<a id="def-sto11-generator"></a>

<!-- formal-statement-start -->
> **定義（生成作用素）**  
> マルコフ半群 $(P_t)$ を考える。
>
> 本章では、関数 $f$ に対して各 $x\in\mathbb R^d$ で極限
>
$$
Lf(x)
=
\lim_{t\downarrow0}
\frac{P_tf(x)-f(x)}{t}
$$
>
> が有限値として存在するとき、$f$ は pointwise 生成作用素の domain $D(L)$ に属するといい、この極限で $Lf$ を定める。
>
> 一方、後半で扱う $C_0(\mathbb R^d)$ 上の作用素族のように sup norm に関して強連続な場合には
>
$$
\left\|
\frac{P_tf-f}{t}-Lf
\right\|_\infty
\to0
$$
>
> を満たす $f$ を domain とする作用素を $C_0$ 上の strong 生成作用素という。
<!-- formal-statement-end -->

本章の拡散計算ではまず pointwise 生成作用素を直接求めます。

後半の $C_0$ 上の理論ではこの sup-norm 版が標準です。pointwise limit に加えて sup-norm convergence まで確認できる関数では、両者は同じ微分作用素表示を与えます。

どちらの場合も

$$
\boxed{
L\text{ だけでなく domain }D(L)\text{ も作用素の一部}
}
$$

です。

<!-- definition-example-start: def-sto11-generator -->
### 直接例：決定論的フロー の生成作用素は一次微分になる

**定義の確認**

前節の

$$
P_tf(x)=f(x+ct)
$$

に対し $f\in C^1$ なら

$$
\frac{P_tf(x)-f(x)}{t}
=
\frac{f(x+ct)-f(x)}{t}.
$$

$t\downarrow0$ とすると

$$
Lf(x)=cf'(x).
$$

時間発展の速度 $c$ が生成作用素の一次微分係数として現れました。
<!-- definition-example-end -->

---

## 6. SDE から局所微分作用素を計算する

STO9 の SDE

$$
dX_t
=
b(X_t)\,dt
+
\sigma(X_t)\,dW_t
$$

を考えます。

$$
a(x):=\sigma(x)\sigma(x)^\top
$$

と置きます。

<a id="prop-sto11-diffusion-generator"></a>

<!-- formal-statement-start -->
> **命題（Itô 拡散の生成作用素）**  
> $b:\mathbb R^d\to\mathbb R^d$、$\sigma:\mathbb R^d\to\mathbb R^{d\times m}$ を大域 Lipschitz かつ線形成長とし、各初期値 $x$ から STO9 の強解 $X^x$ を取る。
>
> $f\in C_c^2(\mathbb R^d)$ とする。
>
> この拡散の生成作用素は

$$
\boxed{
Lf(x)
=
\sum_{i=1}^d b_i(x)\partial_i f(x)
+
\frac12
\sum_{i,j=1}^d
a_{ij}(x)\partial_{ij}f(x)
}
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

[STO7 の時間依存 Itô 公式](../STO7/index.md#thm-sto7-ito-process-formula) を時間に依存しない $f$ へ適用すると

$$
f(X_t)-f(x)
=
\int_0^tLf(X_s)\,ds
+
\text{マルチンゲール term}.
$$

期待値を取り $t$ で割り、$t\downarrow0$ とします。

連続性により $X_s\to x$、したがって $Lf(X_s)\to Lf(x)$ です。

<!-- proof-start -->
### 証明

[多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito)から

$$
\begin{aligned}
f(X_t)-f(x)
&=
\sum_i
\int_0^t
\partial_i f(X_s)b_i(X_s)\,ds\\
&\quad+
\frac12
\sum_{i,j}
\int_0^t
a_{ij}(X_s)\partial_{ij}f(X_s)\,ds\\
&\quad+
\sum_{i,k}
\int_0^t
\partial_i f(X_s)\sigma_{ik}(X_s)\,dW_s^k.
\end{aligned}
$$

$f$ は台がコンパクトで、一階・二階微分は有界です。

線形成長と STO9 の有限-horizon moment estimate により確率積分の被積分過程は各有限時間で二乗可積分です。従って確率積分の期待値は 0 です。

よって

$$
P_tf(x)-f(x)
=
E_x\left[
\int_0^tLf(X_s)\,ds
\right],
$$

ただし右辺の $L$ は statement の微分作用素です。

したがって

$$
\frac{P_tf(x)-f(x)}{t}
=
\frac1t
\int_0^t
E_x[Lf(X_s)]\,ds.
$$

$X_s\to x$ a.s.、$Lf$ は有界 continuous なので dominated convergence により

$$
E_x[Lf(X_s)]\to Lf(x).
$$

従って Cesàro average も

$$
\frac1t
\int_0^t
E_x[Lf(X_s)]ds
\to
Lf(x).
$$

よって生成作用素は所望の式です。
<!-- proof-end -->

### ブラウン運動は Laplacian を持つ

$b=0$、$\sigma=I_d$ なら $a=I_d$ なので

$$
\boxed{
L=\frac12\Delta
}.
$$

確率過程ブラウン運動の生成作用素が Laplacian の半分になることが分かりました。

---

## 7. 瞬間的な平均変化率を有限時間へ積分する

前節で得た局所作用素は「瞬間的な平均変化率」を表します。

それを時間積分すれば有限時間の平均変化になります。

<a id="thm-sto11-dynkin"></a>

<!-- formal-statement-start -->
> **定理（Dynkin 公式）**  
> 前節の拡散 $X$ と生成作用素 $L$ を考える。
>
> $f\in C_c^2(\mathbb R^d)$ とし、$\tau$ を有界 stopping time とする。
>
> このとき

$$
\boxed{
E_x[f(X_\tau)]
=
f(x)
+
E_x\left[
\int_0^\tau Lf(X_s)\,ds
\right].
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

Itô 公式の確率積分部分をマルチンゲール $M_t$ と書けば

$$
f(X_t)
=
f(x)+\int_0^tLf(X_s)ds+M_t.
$$

有界 stopping time で止め、optional sampling により $E[M_\tau]=0$ とします。

<!-- proof-start -->
### 証明

[多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito)から

$$
f(X_t)
=
f(x)
+
\int_0^tLf(X_s)\,ds
+
M_t,
$$

ただし

$$
M_t
=
\sum_{i,k}
\int_0^t
\partial_i f(X_s)\sigma_{ik}(X_s)\,dW_s^k.
$$

$\tau\le T$ a.s. となる $T<\infty$ を取ります。

$\nabla f$ は有界で台がコンパクトで、$\sigma$ は compact set 上で有界なので

$$
E_x\left[
\int_0^T
\left|
\nabla f(X_s)^\top\sigma(X_s)
\right|^2ds
\right]
<
\infty.
$$

従って $M$ は $[0,T]$ 上の二乗可積分マルチンゲールです。

[STO5 の有界 stopping 定理](../STO5/index.md#thm-sto5-bounded-optional-sampling) により

$$
E_x[M_\tau]=E_x[M_0]=0.
$$

$t=\tau$ とした Itô 公式の期待値を取れば

$$
E_x[f(X_\tau)]
=
f(x)
+
E_x\left[
\int_0^\tau Lf(X_s)ds
\right].
$$
<!-- proof-end -->

### 最小例：ブラウン運動の二乗平均

1 次元ブラウン運動で $f(x)=x^2$ を使うと本来 $f\notin C_c^2$ ですが、停止時刻

$$
\tau_n=\inf\{t:|B_t|\ge n\}\wedge t
$$

を入れ、$[-n,n]$ 上で $x^2$ と一致する smooth cutoff を使えば局所化できます。

$Lf=1$ なので

$$
E[B_{t\wedge\tau_n}^2]
=
E[t\wedge\tau_n].
$$

$n\to\infty$ とすると

$$
E[B_t^2]=t.
$$

生成作用素はブラウン運動の variance growth を再構成しています。

---

## 8. 時間発展作用素を微分する

半群法則

$$
P_{t+h}=P_tP_h
$$

を $h$ で微分すると生成作用素が現れます。

<a id="thm-sto11-backward-kolmogorov"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov 後退方程式）**  
> マルコフ半群 $(P_t)$ と生成作用素 $L$ を考える。
>
> $f\in D(L)$ とし、各 $t\ge0$ で $P_tf\in D(L)$、かつ

$$
LP_tf=P_tLf
$$

> が成り立つとする。
>
> $u(t,x)=P_tf(x)$ と置けば

$$
\boxed{
\partial_tu(t,x)=Lu(t,x),
\qquad
u(0,x)=f(x).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

時間差分を

$$
\frac{P_{t+h}f-P_tf}{h}
$$

とし、半群法則で

$$
P_{t+h}f=P_hP_tf
$$

と書きます。

あとは生成作用素の定義そのものです。

<!-- proof-start -->
### 証明

$h>0$ に対し

$$
\begin{aligned}
\frac{u(t+h,\cdot)-u(t,\cdot)}{h}
&=
\frac{P_{t+h}f-P_tf}{h}\\
&=
\frac{P_h(P_tf)-P_tf}{h}.
\end{aligned}
$$

$P_tf\in D(L)$ なので $h\downarrow0$ で

$$
\partial_tu(t,\cdot)
=
L(P_tf).
$$

仮定 $LP_tf=P_tLf$ から

$$
\partial_tu
=
Lu.
$$

また $P_0=I$ なので

$$
u(0,x)=f(x).
$$
<!-- proof-end -->

拡散生成作用素なら

$$
\partial_tu
=
b\cdot\nabla u
+
\frac12\operatorname{tr}(aD^2u).
$$

終端値 $g$ を時刻 $T$ に置くときは

$$
v(t,x)=P_{T-t}g(x)
$$

と時間を反転し、

$$
\boxed{
\partial_tv+Lv=0,
\qquad
v(T,x)=g(x)
}
$$

となります。

これが Feynman--Kac の床です。

---

## 9. 前進方程式と Fokker--Planck

backward equation は観測関数 $f$ を時間発展させます。

前進方程式は確率分布そのものを時間発展させます。

初期分布を $\mu_0$ とし

$$
\mu_t(A)
=
\int P_t(x,A)\mu_0(dx)
$$

と置きます。

<a id="thm-sto11-forward-fokker-planck"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov 前進方程式の弱形式と Fokker--Planck）**  
> 拡散生成作用素

$$
Lf
=
\sum_i b_i\partial_if
+
\frac12\sum_{i,j}a_{ij}\partial_{ij}f
$$

> を考える。
>
> $f\in C_c^2(\mathbb R^d)$ に対し必要な積分可能性が成り立つなら

$$
\boxed{
\frac{d}{dt}
\int f(x)\mu_t(dx)
=
\int Lf(x)\mu_t(dx).
}
$$

> さらに $\mu_t(dx)=p(t,x)dx$ で、$p,b,a$ が部分積分を正当化するだけ十分滑らかかつ境界項が消えるなら

$$
\boxed{
\partial_tp
=
-\sum_i\partial_i(b_ip)
+
\frac12
\sum_{i,j}
\partial_{ij}(a_{ij}p).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

弱形式は [Dynkin 公式](#thm-sto11-dynkin) を初期分布について平均し、時間微分するだけです。

密度形は

$$
\int Lf\,p\,dx
$$

で一次微分を一回、二次微分を二回部分積分し、微分を $f$ から $p$ 側へ移します。

<!-- proof-start -->
### 証明

[Dynkin 公式](#thm-sto11-dynkin) から

$$
E[f(X_t)]
=
E[f(X_0)]
+
\int_0^tE[Lf(X_s)]ds.
$$

分布 $\mu_s$ を使えば

$$
\int f\,d\mu_t
=
\int f\,d\mu_0
+
\int_0^t
\left(
\int Lf\,d\mu_s
\right)ds.
$$

右辺の被積分過程が連続であると仮定すれば微分して

$$
\frac{d}{dt}
\int f\,d\mu_t
=
\int Lf\,d\mu_t.
$$

次に $\mu_t(dx)=p(t,x)dx$ とします。

左辺は

$$
\int f(x)\partial_tp(t,x)dx.
$$

右辺は

$$
\int
\left(
\sum_i b_i\partial_if
+
\frac12\sum_{i,j}a_{ij}\partial_{ij}f
\right)p\,dx.
$$

境界項が消える仮定の下で

$$
\int b_i p\,\partial_if\,dx
=
-\int f\,\partial_i(b_ip)\,dx,
$$

また二回の部分積分により

$$
\int a_{ij}p\,\partial_{ij}f\,dx
=
\int f\,\partial_{ij}(a_{ij}p)\,dx.
$$

従って全ての $f\in C_c^2$ に対し

$$
\int f
\left[
\partial_tp
+
\sum_i\partial_i(b_ip)
-
\frac12\sum_{i,j}\partial_{ij}(a_{ij}p)
\right]dx
=
0.
$$

十分な滑らかさの下で被積分過程は点ごとに 0 となり、所望の PDE を得ます。
<!-- proof-end -->

重要なのは、密度 $p$ の存在や滑らかさをこの導出だけでは証明していないことです。

弱形式

$$
\frac{d}{dt}\int f\,d\mu_t=\int Lf\,d\mu_t
$$

の方が先に成立し、Fokker--Planck の密度 PDE は追加正則性の下で得られます。

---

## 10. Feynman--Kac：微分方程式を標本路期待値へ変える

生成作用素と backward equationへポテンシャルと積分項を加えます。

時間区間 $[t,T]$ で、$X^{t,x}$ を時刻 $t$ に $x$ から出発する拡散とします。

<a id="thm-sto11-feynman-kac"></a>

<!-- formal-statement-start -->
> **定理（Feynman--Kac 検証公式）**  
> $L$ を前節の拡散生成作用素とする。
>
> 有界 continuous な $V:[0,T]\times\mathbb R^d\to[0,\infty)$、$g:[0,T]\times\mathbb R^d\to\mathbb R$、$h:\mathbb R^d\to\mathbb R$ を考える。
>
> $u\in C^{1,2}([0,T)\times\mathbb R^d)\cap C([0,T]\times\mathbb R^d)$ が有界で必要な導関数も確率積分を真のマルチンゲールにするだけ有界であり、

$$
\partial_tu+Lu-Vu+g=0,
\qquad
u(T,x)=h(x)
$$

> を満たすとする。
>
> このとき

$$
\boxed{
u(t,x)
=
E_{t,x}\left[
e^{-\int_t^TV(r,X_r)dr}h(X_T)
+
\int_t^T
e^{-\int_t^sV(r,X_r)dr}g(s,X_s)ds
\right].
}
$$
<!-- formal-statement-end -->

これは存在定理ではなく verification 定理として述べています。

すなわち classical solution が十分な正則性で存在するとき、その値を確率表示し、その class での一意性を得ます。

PDE 側で classical solution が存在する条件そのものは Encore II / III 側の問題です。

### 証明の見取り図

割引項 factor

$$
D_s
=
\exp\left(
-\int_t^sV(r,X_r)dr
\right)
$$

を導入します。

積

$$
D_su(s,X_s)
$$

へ [STO7 の product rule](../STO7/index.md#cor-sto7-product-rule) を適用するとドリフトは

$$
D_s(\partial_su+Lu-Vu)ds
=
-D_sg(s,X_s)ds.
$$

したがって

$$
D_su(s,X_s)
+
\int_t^sD_rg(r,X_r)dr
$$

がマルチンゲールになります。

<!-- proof-start -->
### 証明

$D_t=1$ で

$$
dD_s
=
-V(s,X_s)D_s\,ds.
$$

$D$ は有限 variation なので $[D,u(\cdot,X)]=0$ です。

[時間依存 Itô 公式](../STO7/index.md#thm-sto7-ito-process-formula)から

$$
du(s,X_s)
=
(\partial_su+Lu)(s,X_s)ds
+
\nabla u(s,X_s)^\top
\sigma(X_s)dW_s.
$$

product rule により

$$
\begin{aligned}
d(D_su(s,X_s))
&=
D_s\,du(s,X_s)
+
u(s,X_s)\,dD_s\\
&=
D_s
\left(
\partial_su+Lu-Vu
\right)(s,X_s)ds\\
&\quad+
D_s\nabla u(s,X_s)^\top\sigma(X_s)dW_s.
\end{aligned}
$$

PDE から

$$
\partial_su+Lu-Vu=-g.
$$

従って

$$
d\left(
D_su(s,X_s)
+
\int_t^sD_rg(r,X_r)dr
\right)
=
D_s\nabla u^\top\sigma\,dW_s.
$$

仮定した boundedness / integrability により右辺は真のマルチンゲールです。

時刻 $t$ から $T$ まで期待値を取ると

$$
u(t,x)
=
E_{t,x}\left[
D_Tu(T,X_T)
+
\int_t^TD_sg(s,X_s)ds
\right].
$$

終端条件 $u(T,\cdot)=h$ を代入して所望の表示を得ます。
<!-- proof-end -->

### 直接例：定数ポテンシャル

$L=\frac12\Delta$、$g=0$、$h\equiv1$、$V\equiv\lambda\ge0$ とします。

PDE は

$$
\partial_tu+\frac12\Delta u-\lambda u=0,
\qquad
u(T,x)=1.
$$

Feynman--Kac から

$$
u(t,x)
=
E[e^{-\lambda(T-t)}]
=
e^{-\lambda(T-t)}.
$$

空間に依存しないので $\Delta u=0$ であり、直接代入しても PDE を満たします。

---

## 11. 局所作用素から標本路法則を特徴付ける

SDE はブラウン運動 $W$ を明示します。

ここではブラウン運動を最初から書かず、

$$
\boxed{
f(X_t)-f(X_0)-\int_0^tLf(X_s)ds
}
$$

がマルチンゲールになることだけを要求します。

<a id="def-sto11-martingale-problem"></a>

<!-- formal-statement-start -->
> **定義（マルチンゲール問題）**  
> 標本路空間

$$
\Omega=C([0,\infty),\mathbb R^d)
$$

> 上の coordinate 過程を

$$
X_t(\omega)=\omega(t)
$$

> とし、canonical フィルトレーションを $(\mathcal F_t)$ とする。
>
> 線形作用素

$$
L:D(L)\subset C(\mathbb R^d)\to C(\mathbb R^d)
$$

> と初期分布 $\mu$ を固定する。
>
> 確率測度 $P$ がマルチンゲール問題 for $(L,\mu)$ の solution であるとは、

$$
P\circ X_0^{-1}=\mu
$$

> かつ全ての $f\in D(L)$ について

$$
M_t^f
=
f(X_t)-f(X_0)-\int_0^tLf(X_s)ds
$$

> が $P$ の下で局所マルチンゲールであることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto11-martingale-problem -->
### 直接例：ブラウン運動は $\frac12\Delta$ のマルチンゲール問題を解く

**定義の確認**

$X=B$ を $d$ 次元ブラウン運動とし

$$
L=\frac12\Delta,
\qquad
D(L)=C_c^\infty(\mathbb R^d)
$$

とします。

[多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito)から

$$
f(B_t)-f(B_0)
=
\frac12\int_0^t\Delta f(B_s)ds
+
\int_0^t\nabla f(B_s)^\top dB_s.
$$

したがって

$$
M_t^f
=
\int_0^t\nabla f(B_s)^\top dB_s.
$$

$f$ は台がコンパクトな smooth 関数なので $\nabla f$ は有界です。

従って右辺は二乗可積分マルチンゲールであり、ブラウン運動の法則は $\frac12\Delta$ のマルチンゲール問題を解きます。
<!-- definition-example-end -->

---

## 12. SDE はマルチンゲール問題を解く

<a id="thm-sto11-sde-to-mp"></a>

<!-- formal-statement-start -->
> **定理（SDE からマルチンゲール問題）**  
> あるフィルトレーション付き確率空間上にブラウン運動 $W$ と continuous 適合過程 $X$ が存在し、任意の $t\ge0$ について

$$
X_t
=
X_0
+
\int_0^t b(X_s)ds
+
\int_0^t\sigma(X_s)dW_s
$$

> が almost surely 成り立つとする。さらに $X$ は non-explosive であるとする。
>
> $a=\sigma\sigma^\top$ とし

$$
Lf
=
b\cdot\nabla f
+
\frac12\operatorname{tr}(aD^2f),
\qquad
D(L)=C_c^\infty(\mathbb R^d)
$$

> と置く。
>
> このとき $X$ の標本路法則は $(L,\mathcal L(X_0))$ のマルチンゲール問題を解く。
<!-- formal-statement-end -->

### 証明の見取り図

これは拡散生成作用素の計算を標本路法則の言葉へ移したものです。

[多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito)からドリフト部分を左辺へ移せば確率積分だけが残ります。

<!-- proof-start -->
### 証明

$f\in C_c^\infty$ を固定します。

[多次元 Itô 公式](../STO7/index.md#thm-sto7-multidimensional-ito)から

$$
f(X_t)-f(X_0)
=
\int_0^tLf(X_s)ds
+
\int_0^t
\nabla f(X_s)^\top\sigma(X_s)dW_s.
$$

従って

$$
M_t^f
=
\int_0^t
\nabla f(X_s)^\top\sigma(X_s)dW_s.
$$

局所化すれば右辺は continuous 局所マルチンゲールです。

この性質は $(X_t)$ の標本路汎関数として canonical 標本路空間上へ押し出せます。

したがって $X$ の法則はマルチンゲール問題を解きます。
<!-- proof-end -->

この方向ではブラウン運動を消すのは簡単です。

難しいのは逆方向です。

---

## 13. 非退化ならマルチンゲール問題からブラウン運動と SDE 表現を復元できる

$a=\sigma\sigma^\top$ が正定値で $\sigma$ が可逆なら、マルチンゲール問題に埋め込まれたドリフトと quadratic variation を取り出し、ブラウン運動を再構成できます。

<a id="thm-sto11-mp-to-sde"></a>

<!-- formal-statement-start -->
> **定理（非退化マルチンゲール問題から SDE 表現）**  
> $b:\mathbb R^d\to\mathbb R^d$、$\sigma:\mathbb R^d\to\mathbb R^{d\times d}$ を continuous とし、局所有界とする。
>
> 各 $x$ で $\sigma(x)$ は可逆で、$\sigma^{-1}$ も局所有界とする。
>
> $a=\sigma\sigma^\top$ とし

$$
Lf
=
b\cdot\nabla f
+
\frac12\operatorname{tr}(aD^2f)
$$

> on $C_c^\infty(\mathbb R^d)$ を考える。
>
> continuous non-explosive coordinate 過程 $X$ の法則 $P$ がこのマルチンゲール問題を解くなら、同じ確率空間上で $d$ 次元ブラウン運動 $W$ を構成でき、

$$
X_t
=
X_0
+
\int_0^tb(X_s)ds
+
\int_0^t\sigma(X_s)dW_s
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

coordinate function $x_i$ は台はコンパクトではありません。

そこで exit time

$$
\tau_n=\inf\{t:|X_t|\ge n\}
$$

を入れ、ball $B_{n+1}$ 上で $x_i$ や $x_ix_j$ と一致する smooth cutoff functions を使います。

これにより局所的に

$$
M_t^i
=
X_t^i-X_0^i-\int_0^tb_i(X_s)ds
$$

が局所マルチンゲールで、

$$
[M^i,M^j]_t
=
\int_0^ta_{ij}(X_s)ds
$$

を復元できます。

最後に

$$
W_t
=
\int_0^t\sigma(X_s)^{-1}dM_s
$$

と置き、Lévy characterization を使います。

<!-- proof-start -->
### 証明

まず $\chi_n\in C_c^\infty(\mathbb R^d)$ を

$$
\chi_n(x)=1
\qquad
(|x|\le n+1)
$$

となる cutoff とします。

$$
f_i^{(n)}(x)=\chi_n(x)x_i
$$

をマルチンゲール問題の domain の関数に取ります。

$t<\tau_n$ では $f_i^{(n)}(X_t)=X_t^i$ かつ導関数も coordinate function と一致するため

$$
Lf_i^{(n)}(X_s)=b_i(X_s)
\qquad
(s<\tau_n).
$$

従って

$$
M_{t\wedge\tau_n}^i
=
X_{t\wedge\tau_n}^i
-
X_0^i
-
\int_0^{t\wedge\tau_n}b_i(X_s)ds
$$

は局所マルチンゲールです。

$n$ を増やして貼り合わせれば

$$
M_t^i
=
X_t^i-X_0^i-\int_0^tb_i(X_s)ds
$$

は continuous 局所マルチンゲールです。

次に

$$
f_{ij}^{(n)}(x)=\chi_n(x)x_ix_j
$$

を使います。

$t<\tau_n$ では

$$
L(x_ix_j)
=
b_ix_j+b_jx_i+a_{ij}.
$$

一方 product rule により

$$
d(X_t^iX_t^j)
=
X_t^i\,dX_t^j
+
X_t^j\,dX_t^i
+
d[X^i,X^j]_t.
$$

$X^i=M^i+\int b_i ds$ で有限-variation part は quadratic covariation に寄与しません。

coordinate decomposition と product rule から

$$
X_t^iX_t^j-X_0^iX_0^j
-
\int_0^t
\left(
b_i(X_s)X_s^j+b_j(X_s)X_s^i
\right)ds
-
[M^i,M^j]_t
$$

は局所マルチンゲールです。

一方、$x_ix_j$ を局所化してマルチンゲール問題に入れると

$$
X_t^iX_t^j-X_0^iX_0^j
-
\int_0^t
\left(
b_i(X_s)X_s^j+b_j(X_s)X_s^i+a_{ij}(X_s)
\right)ds
$$

も局所マルチンゲールです。

両者の差

$$
[M^i,M^j]_t
-
\int_0^ta_{ij}(X_s)ds
$$

は continuous 有限-variation 過程かつ局所マルチンゲールです。[STO5 の有限-variation 局所マルチンゲールの定数性](../STO5/index.md#lem-sto5-fv-local-martingale-constant) から、初期値 0 のこの差は恒等的に 0 です。従って

$$
[M^i,M^j]_t
=
\int_0^ta_{ij}(X_s)ds.
$$

ここで $P$ の下で canonical フィルトレーションを usual augmentation し、vector 局所マルチンゲール $M=(M^1,\ldots,M^d)$ に対し

$$
W_t
=
\int_0^t\sigma(X_s)^{-1}dM_s
$$

と置きます。

局所有界性により確率積分は localization 後に well-defined です。

covariation は

$$
\begin{aligned}
[W]_t
&=
\int_0^t
\sigma(X_s)^{-1}
a(X_s)
\sigma(X_s)^{-\top}ds\\
&=
\int_0^tI_d\,ds\\
&=
tI_d.
\end{aligned}
$$

また $W_0=0$ で $W$ は continuous 局所マルチンゲールです。

[STO5 の Lévy characterization](../STO5/index.md#thm-sto5-levy-characterization) により $W$ は $d$ 次元ブラウン運動です。

定義から

$$
dW_t=\sigma(X_t)^{-1}dM_t,
$$

従って

$$
dM_t=\sigma(X_t)dW_t.
$$

さらに

$$
dX_t=b(X_t)dt+dM_t
$$

なので

$$
dX_t=b(X_t)dt+\sigma(X_t)dW_t.
$$
<!-- proof-end -->

退化した $\sigma$ では、この単純な逆行列によるブラウン運動復元は使えません。

一般の退化拡散ではマルチンゲール表現 / 確率空間の拡大が必要になる場合があり、STO12 より先にその一般論を逆輸入しません。

---

## 14. マルチンゲール問題の存在と法則の一意性

<a id="def-sto11-mp-law-uniqueness"></a>

<!-- formal-statement-start -->
> **定義（マルチンゲール問題の存在・法則一意性）**  
> 各初期状態 $x\in\mathbb R^d$ に対しマルチンゲール問題 for $(L,\delta_x)$ の solution 法則 $P_x$ が
>
> 1. 存在し、
> 2. 標本路法則として一意
>
> であるとき、そのマルチンゲール問題は **存在・法則一意性を持つ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto11-mp-law-uniqueness -->
### 直接例：ブラウン運動では存在と法則の一意性を確認できる

**定義の確認**

$L=\frac12\Delta$、$D(L)=C_c^\infty(\mathbb R^d)$ とします。

ブラウン運動がこのマルチンゲール問題の solution を与えることは [直接例](#def-sto11-martingale-problem) で確認しました。

逆に任意の solution 法則 $P$ を取ります。coordinate functions $x_i$ と products $x_ix_j$ を cutoff で局所化してマルチンゲール問題へ入れると、各座標 $X^i-X_0^i$ は continuous 局所マルチンゲールで

$$
[X^i-X_0^i,X^j-X_0^j]_t
=
\delta_{ij}t
$$

を得ます。

[STO5 の Lévy characterization](../STO5/index.md#thm-sto5-levy-characterization) により $X-X_0$ は standard ブラウン運動です。

したがって初期点 $x$ を固定すれば solution 法則はブラウン法則以外にありえません。存在と法則の一意性がともに確認できるので、定義の二条件を満たします。
<!-- definition-example-end -->

<a id="thm-sto11-mp-strong-markov"></a>

<!-- formal-statement-start -->
> **定理（マルチンゲール問題の存在・法則一意性から強マルコフ性）**  
> $\Omega=C([0,\infty),\mathbb R^d)$ を canonical 標本路空間とし、$X$ を coordinate 過程とする。線形作用素 $L$ のマルチンゲール問題が各初期状態 $x\in\mathbb R^d$ について存在・法則一意性を持ち、その一意な solution 法則を $P_x$ とする。
>
> さらに各標本路空間の Borel 集合 $A$ に対して $x\mapsto P_x(A)$ が Borel 可測であり、$D(L)$ にマルチンゲール問題を決定する countable subclass が存在すると仮定する。
>
> $P_tf(x):=E_x[f(X_t)]$ と置く。このとき、任意の a.s. 有限 stopping time $\tau$、$t\ge0$、有界 Borel $f$ に対して
>
$$
E_x[f(X_{\tau+t})\mid\mathcal F_\tau]
=
P_tf(X_\tau)
\qquad P_x\text{-a.s.}
$$
>
> が成り立つ。従って coordinate 過程は strong Markov 過程である。
<!-- formal-statement-end -->

### この定理の機構

deterministic time $s$ で未来の標本路を条件付けます。

regular conditional 法則

$$
P_x(
X_{s+\cdot}\in\cdot
\mid
\mathcal F_s
)
$$

を取ると、マルチンゲール increment の性質から、この conditional 法則も「初期点 $X_s$ から出発する同じマルチンゲール問題」を解きます。

solution 法則の一意性により、その法則は

$$
P_{X_s}
$$

以外にありません。

したがって未来分布は現在状態だけで決まり、マルコフ性が出ます。

stopping time へ拡張するときは、停止時刻近似と canonical shift、regular conditional probability の可測性を同時に扱います。

### なぜ完全証明をここでは技術的入力にするのか

完全証明には

- Polish 標本路空間上の regular conditional probabilities
- 標本路 shift の可測性
- stopped マルチンゲール問題の保存
- stopping time を離散化した conditional laws の極限
- $x\mapsto P_x$ の measurable 核性

が必要です。

これは生成作用素 / Dynkin / Kolmogorov / Feynman--Kac の核心計算とは独立した canonical-space probability の大きな論証です。

本章では deterministic-time の機構を上で明示し、strong Markov への一般拡張を標準定理として使います。

STO4 ではブラウン運動について stopping-time approximation を用いた [強マルコフ性](../STO4/index.md#thm-sto4-brownian-strong-markov) をすでに完全証明しているため、ここでは「ブラウン運動固有の independent increments」ではなく「法則の一意性」が Markov 性を作る別ルートを学ぶことが目的です。

---

## 15. $C_0$ 上の強連続性を加える

<a id="def-sto11-feller-semigroup"></a>

<!-- formal-statement-start -->
> **定義（Feller 半群）**  
> $C_0(\mathbb R^d)$ を infinity で 0 に収束する連続関数の空間とする。
>
> マルコフ半群 $(P_t)$ が Feller 半群であるとは、
>
> 1. $P_tC_0\subset C_0$,
> 2. $\|P_tf\|_\infty\le\|f\|_\infty$,
> 3. $P_t$ は positivity preserving,
> 4. $P_{s+t}=P_sP_t$, $P_0=I$,
> 5. 各 $f\in C_0$ について

$$
\|P_tf-f\|_\infty\to0
\qquad
(t\downarrow0)
$$

> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto11-feller-semigroup -->
### 直接例：ブラウン運動の熱半群

**定義の確認**

ブラウン運動では

$$
P_tf(x)
=
\int_{\mathbb R^d}
f(x+z)
\frac{e^{-|z|^2/(2t)}}{(2\pi t)^{d/2}}dz.
$$

$f\in C_0(\mathbb R^d)$ は一様連続です。$x_n\to x$ なら

$$
|P_tf(x_n)-P_tf(x)|
\le
E\left[
|f(x_n+B_t)-f(x+B_t)|
\right]
$$

であり、一様連続性から右辺は 0 へ収束します。従って $P_tf$ は連続です。

次に $\varepsilon>0$ を固定し、$|y|>R$ なら $|f(y)|<\varepsilon$ となる $R$ を取ります。$|x|>2R$ のとき、$|B_t|\le |x|-R$ なら $|x+B_t|>R$ なので

$$
|P_tf(x)|
\le
\varepsilon
+
\|f\|_\infty
P(|B_t|>|x|-R).
$$

$|x|\to\infty$ で右辺の第二項は 0 へ行くため $P_tf(x)\to0$ です。

最後に一様連続性から、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し

$$
|z|<\delta
\Longrightarrow
\sup_x|f(x+z)-f(x)|<\varepsilon.
$$

したがって

$$
\sup_x|P_tf(x)-f(x)|
\le
\varepsilon
+
2\|f\|_\infty P(|B_t|\ge\delta).
$$

$t\downarrow0$ で $B_t\to0$ in probability なので右辺の第二項は 0 へ行きます。$\varepsilon$ は任意だから

$$
\|P_tf-f\|_\infty\to0.
$$

従ってブラウン熱半群は Feller 半群の標準例です。
<!-- definition-example-end -->

Feller theory は本章では bridge に留めます。

重要なのは

$$
\boxed{
\text{strongly continuous 半群}
\leftrightarrow
\text{closed 生成作用素}
\leftrightarrow
\text{Markov 過程}
}
$$

という解析と確率の接点が存在することです。

Hille--Yosida の一般論を本章へ展開せず、後続で必要になったときに関数解析側の正本へ接続します。

---

## 16. 仮定を外すとどこが壊れるか

### 16.1 生成作用素の微分表示だけでは過程は決まらない

形式的に

$$
Lf=\frac12f''
$$

と書いただけでは、

- state space
- domain $D(L)$
- boundary condition

が未指定です。

例えば有界 interval では absorbing / reflecting など boundary behavior により過程が変わります。

壊れるのは生成作用素の計算式ではなく、**operator domain と boundary condition による法則の識別**です。

### 16.2 Fokker--Planck の密度形は密度の存在を自動保証しない

弱形式

$$
\frac{d}{dt}\int f\,d\mu_t
=
\int Lf\,d\mu_t
$$

から

$$
\partial_tp=L^*p
$$

へ進むには $\mu_t(dx)=p(t,x)dx$ が必要です。

singular 法則を持つ過程では密度 PDE をそのまま書けません。

### 16.3 局所マルチンゲールを期待値 0 として消すには条件が要る

Itô 公式で確率積分が局所マルチンゲールになっても、そのまま

$$
E[M_t]=0
$$

とは限りません。

Dynkin / Feynman--Kac では有界な domain function、有界 stopping、square-integrability などを使って真のマルチンゲール性を確認しました。

### 16.4 マルチンゲール問題の存在と一意性は別問題

solution 法則が一つ存在するだけでは、存在と一意性の二条件はそろいません。

複数の標本路法則が同じ formal 生成作用素を満たすとき、半群や Markov selection が一意に決まりません。

強マルコフ性を生成作用素側から得る主役は「マルチンゲール条件」だけでなく **法則の一意性**です。

---

## 17. 演習

#### STO11-A01 決定論的フロー の核・半群・生成作用素
- Level: A
- 目安時間: 15分

1 次元過程

$$
X_t=x+ct
$$

を考える。

1. 遷移核 $P_t(x,A)$ を書け。
2. $P_tf(x)$ を求めよ。
3. 半群法則を確認せよ。
4. $f\in C^1$ に対する生成作用素を求めよ。

<!-- solution-start -->
### 詳細解答

1. 時刻 $t$ の状態は確定的に $x+ct$ なので

$$
\boxed{
P_t(x,A)=\mathbf1_A(x+ct).
}
$$

2.

$$
\begin{aligned}
P_tf(x)
&=
\int f(y)P_t(x,dy)\\
&=
\boxed{f(x+ct)}.
\end{aligned}
$$

3.

$$
\begin{aligned}
P_s(P_tf)(x)
&=
P_tf(x+cs)\\
&=
f(x+cs+ct)\\
&=
f(x+c(s+t))\\
&=
P_{s+t}f(x).
\end{aligned}
$$

よって

$$
P_sP_t=P_{s+t}.
$$

4.

$$
\begin{aligned}
Lf(x)
&=
\lim_{t\downarrow0}
\frac{P_tf(x)-f(x)}{t}\\
&=
\lim_{t\downarrow0}
\frac{f(x+ct)-f(x)}{t}\\
&=
cf'(x).
\end{aligned}
$$

従って

$$
\boxed{L=c\frac{d}{dx}}.
$$
<!-- solution-end -->

#### STO11-A02 ブラウン運動の生成作用素と二乗平均
- Level: A
- 目安時間: 18分

1 次元ブラウン運動 $B$ に対し生成作用素は

$$
L=\frac12\frac{d^2}{dx^2}
$$

である。

1. $f(x)=x^2$ に形式的に $L$ を作用させよ。
2. localization を前提に [Dynkin 公式](#thm-sto11-dynkin) を適用し、$B_0=0$ から $E[B_t^2]=t$ を導け。
3. $f(x)=x$ では何が得られるか。

<!-- solution-start -->
### 詳細解答

1.

$$
f'(x)=2x,
\qquad
f''(x)=2.
$$

したがって

$$
Lf(x)
=
\frac12\cdot2
=
\boxed{1}.
$$

2. $x^2$ は台がコンパクトではないので、そのまま本章の [Dynkin 公式](#thm-sto11-dynkin) の仮定には入りません。

exit time

$$
\tau_n
=
\inf\{s:|B_s|\ge n\}\wedge t
$$

を入れ、$[-n,n]$ 上で $x^2$ と一致する $C_c^2$ 関数へ置き換えます。

[Dynkin 公式](#thm-sto11-dynkin) から

$$
E[B_{\tau_n}^2]
=
E\left[
\int_0^{\tau_n}1\,ds
\right]
=
E[\tau_n].
$$

$n\to\infty$ で $\tau_n\uparrow t$ a.s. です。

$B_{\tau_n}^2$ の一様可積分性は、$E[\sup_{s\le t}|B_s|^2]<\infty$ と [STO6 の continuous-time Doob L2 maximal inequality](../STO6/index.md#thm-sto6-doob-l2) から従います。従って極限を通して

$$
\boxed{E[B_t^2]=t}.
$$

3. $f(x)=x$ なら

$$
Lf=0.
$$

同じ localization により

$$
\boxed{E[B_t]=0}.
$$

生成作用素は平均の保存と variance の線形成長を同じ枠組みで与えます。
<!-- solution-end -->

#### STO11-A03 定数係数拡散の Fokker--Planck
- Level: A
- 目安時間: 18分

1 次元 SDE

$$
dX_t=\mu\,dt+\sigma\,dW_t
$$

を考える。$\sigma\ne0$ とする。

1. 生成作用素 $L$ を書け。
2. formal adjoint $L^*$ を計算せよ。
3. 密度 $p(t,x)$ が十分滑らかなら満たす Fokker--Planck equation を書け。

<!-- solution-start -->
### 詳細解答

1. $b(x)=\mu$、$a(x)=\sigma^2$ なので

$$
\boxed{
Lf
=
\mu f'
+
\frac{\sigma^2}{2}f''.
}
$$

2. 台がコンパクトな関数 $f$ に対し

$$
\int \mu f' p\,dx
=
-\int f\,\mu\partial_xp\,dx,
$$

また

$$
\int
\frac{\sigma^2}{2}f''p\,dx
=
\int
f\frac{\sigma^2}{2}\partial_{xx}p\,dx.
$$

従って

$$
\boxed{
L^*p
=
-\mu\partial_xp
+
\frac{\sigma^2}{2}\partial_{xx}p.
}
$$

3.

$$
\boxed{
\partial_tp
=
-\mu\partial_xp
+
\frac{\sigma^2}{2}\partial_{xx}p.
}
$$

ドリフトは transport 項、拡散は heat 項として現れます。
<!-- solution-end -->

#### STO11-A04 マルチンゲール問題の補償項
- Level: A
- 目安時間: 18分

1 次元拡散 operator

$$
Lf(x)=b(x)f'(x)+\frac12a(x)f''(x)
$$

を考える。

coordinate functionsを cutoff で局所化して使えるものとする。

1. $f(x)=x$ から得られる局所マルチンゲールを書け。
2. $f(x)=x^2$ の $Lf$ を求めよ。
3. 1 と 2 から局所マルチンゲール part $M$ の quadratic variation が

$$
[M]_t=\int_0^ta(X_s)ds
$$

になる理由を示せ。

<!-- solution-start -->
### 詳細解答

1. $f'(x)=1$、$f''(x)=0$ なので

$$
Lf(x)=b(x).
$$

従って

$$
\boxed{
M_t
=
X_t-X_0-\int_0^tb(X_s)ds
}
$$

が局所マルチンゲールです。

2. $f(x)=x^2$ では

$$
f'(x)=2x,
\qquad
f''(x)=2.
$$

したがって

$$
\boxed{
L(x^2)=2xb(x)+a(x).
}
$$

3. $X=M+A$、

$$
A_t=\int_0^tb(X_s)ds
$$

と書きます。

product rule から

$$
d(X_t^2)
=
2X_t\,dX_t+d[X]_t.
$$

有限 variation part $A$ は quadratic variation に寄与しないので

$$
[X]=[M].
$$

一方マルチンゲール問題の $x^2$ test では compensator が

$$
\int_0^t
\left(
2X_sb(X_s)+a(X_s)
\right)ds
$$

です。

$2X_sdX_s$ の有限-variation 部分は

$$
2X_sb(X_s)ds.
$$

両者を比較すると残りは

$$
d[M]_s=a(X_s)ds.
$$

従って

$$
\boxed{
[M]_t=\int_0^ta(X_s)ds.
}
$$
<!-- solution-end -->

#### STO11-B01 Kolmogorov 後退を直接確認する
- Level: B
- 目安時間: 25分

1 次元ブラウン運動について

$$
f(x)=x^2,
\qquad
u(t,x)=E[(x+B_t)^2]
$$

とする。

1. $u(t,x)$ を直接求めよ。
2. $\partial_tu$ と $\frac12\partial_{xx}u$ を計算し Kolmogorov 後退方程式を確認せよ。
3. $v(s,x)=P_{T-s}f(x)$ と置き、$\partial_sv+\frac12v_{xx}=0$ の向きを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\begin{aligned}
u(t,x)
&=
E[(x+B_t)^2]\\
&=
x^2+2xE[B_t]+E[B_t^2]\\
&=
x^2+t.
\end{aligned}
$$

従って

$$
\boxed{u(t,x)=x^2+t}.
$$

2.

$$
\partial_tu=1,
$$

また

$$
\partial_{xx}u=2.
$$

よって

$$
\frac12\partial_{xx}u=1.
$$

したがって

$$
\boxed{
\partial_tu
=
\frac12\partial_{xx}u.
}
$$

3.

$$
v(s,x)
=
P_{T-s}f(x)
=
x^2+(T-s).
$$

従って

$$
\partial_sv=-1,
\qquad
\frac12v_{xx}=1.
$$

よって

$$
\boxed{
\partial_sv+\frac12v_{xx}=0.
}
$$

半群を前向きに進める時間 $t$ と、終端時刻から逆向きに測る calendar time $s$ では符号が反転することが確認できます。
<!-- solution-end -->

#### STO11-B02 Feynman--Kac の割引項と積分項
- Level: B
- 目安時間: 28分

ブラウン運動生成作用素

$$
L=\frac12\partial_{xx}
$$

を考える。

$\lambda\ge0$、定数 $q\in\mathbb R$ とし

$$
\partial_tu+\frac12u_{xx}-\lambda u+q=0,
\qquad
u(T,x)=1
$$

を考える。

1. [Feynman--Kac 検証公式](#thm-sto11-feynman-kac) から $u(t,x)$ を積分表示せよ。
2. $\lambda>0$ の場合に閉形式を求めよ。
3. $\lambda=0$ の場合を別に求めよ。
4. 得た式を PDE へ代入して確認せよ。

<!-- solution-start -->
### 詳細解答

1. $V\equiv\lambda$、$g\equiv q$、$h\equiv1$ なので

$$
u(t,x)
=
E\left[
e^{-\lambda(T-t)}
+
\int_t^T
e^{-\lambda(s-t)}q\,ds
\right].
$$

被積分過程は標本路に依存しないため期待値は外れ、

$$
u(t,x)
=
e^{-\lambda(T-t)}
+
q\int_t^Te^{-\lambda(s-t)}ds.
$$

2. $\lambda>0$ なら

$$
\int_t^T
e^{-\lambda(s-t)}ds
=
\frac{1-e^{-\lambda(T-t)}}{\lambda}.
$$

従って

$$
\boxed{
u(t,x)
=
e^{-\lambda(T-t)}
+
\frac{q}{\lambda}
\left(
1-e^{-\lambda(T-t)}
\right).
}
$$

3. $\lambda=0$ なら

$$
u(t,x)
=
1+q(T-t).
$$

従って

$$
\boxed{
u(t,x)=1+q(T-t).
}
$$

4. どちらの場合も $u$ は $x$ に依存しないので

$$
u_{xx}=0.
$$

$\lambda>0$ では $\tau=T-t$ と置くと

$$
u=e^{-\lambda\tau}+\frac q\lambda(1-e^{-\lambda\tau}).
$$

$t$ 微分は

$$
u_t
=
\lambda e^{-\lambda\tau}
-
q e^{-\lambda\tau}.
$$

一方

$$
-\lambda u+q
=
-\lambda e^{-\lambda\tau}
+
q e^{-\lambda\tau}.
$$

したがって

$$
u_t-\lambda u+q=0.
$$

$\lambda=0$ では

$$
u_t=-q,
$$

なので

$$
u_t+q=0.
$$

終端値 $u(T,x)=1$ も両方で成立します。
<!-- solution-end -->

#### STO11-B03 非退化マルチンゲール問題からブラウン運動を作る
- Level: B
- 目安時間: 30分

1 次元で

$$
Lf(x)
=
b(x)f'(x)
+
\frac12\sigma(x)^2f''(x)
$$

とし、$\sigma(x)\ne0$、$1/\sigma$ は局所有界とする。

マルチンゲール問題の solution $X$ から

$$
M_t
=
X_t-X_0-\int_0^tb(X_s)ds
$$

が continuous 局所マルチンゲールで

$$
[M]_t
=
\int_0^t\sigma(X_s)^2ds
$$

と分かっているとする。

1.

$$
W_t=\int_0^t\frac1{\sigma(X_s)}dM_s
$$

を定め、$[W]_t$ を計算せよ。
2. Lévy characterization から何が言えるか。
3. マルチンゲール問題からブラウン運動を構成し、$X$ の SDE 表現を復元せよ。

<!-- solution-start -->
### 詳細解答

1. 確率積分の quadratic variation 公式から

$$
\begin{aligned}
[W]_t
&=
\int_0^t
\frac1{\sigma(X_s)^2}
d[M]_s\\
&=
\int_0^t
\frac1{\sigma(X_s)^2}
\sigma(X_s)^2ds\\
&=
\boxed{t}.
\end{aligned}
$$

$W$ は continuous 局所マルチンゲールで $W_0=0$ です。

2. [STO5 の Lévy characterization](../STO5/index.md#thm-sto5-levy-characterization) の仮定

$$
W_0=0,
\qquad
[W]_t=t
$$

を満たすので

$$
\boxed{W\text{ は standard ブラウン運動}}
$$

です。

3. 定義から

$$
dW_t
=
\frac1{\sigma(X_t)}dM_t.
$$

$\sigma(X_t)\ne0$ なので

$$
dM_t
=
\sigma(X_t)dW_t.
$$

また $M$ の定義より

$$
dX_t
=
b(X_t)dt+dM_t.
$$

したがって

$$
\boxed{
dX_t
=
b(X_t)dt
+
\sigma(X_t)dW_t.
}
$$

ブラウン運動をマルチンゲール問題の solution から構成し、元の SDE の積分表示を同じ空間上で復元できました。
<!-- solution-end -->

#### STO11-C01 Ornstein--Uhlenbeck 拡散を生成作用素から統合して読む
- Level: C
- 目安時間: 55分

$\theta>0$、$\sigma>0$ とし

$$
dX_t=-\theta X_tdt+\sigma dW_t,
\qquad
X_0=x
$$

を考える。

1. 生成作用素 $L$ を求めよ。
2. $m(t,x)=E_x[X_t]$ を SDE から求め、backward equation
$$
\partial_tm=Lm,
\qquad
m(0,x)=x
$$
を確認せよ。
3. $u(t,x)=E_x[X_t^2]$ を求め、backward equationを確認せよ。
4. 密度 $p(t,y)$ が十分滑らかなときの Fokker--Planck equation を書け。
5. マルチンゲール問題で $f(y)=y$、$f(y)=y^2$ を局所化して用いたとき、ドリフトと quadratic variation がどう復元されるか示せ。
6. この例が確率制御 / HJB への入口になる理由を生成作用素の形から説明せよ。

<!-- solution-start -->
### 詳細解答

1. ドリフトと拡散係数は

$$
b(y)=-\theta y,
\qquad
a(y)=\sigma^2.
$$

したがって

$$
\boxed{
Lf(y)
=
-\theta y f'(y)
+
\frac{\sigma^2}{2}f''(y).
}
$$

2. SDE に integrating factor $e^{\theta t}$ を掛けると

$$
d(e^{\theta t}X_t)
=
\sigma e^{\theta t}dW_t.
$$

従って

$$
X_t
=
xe^{-\theta t}
+
\sigma
\int_0^t
e^{-\theta(t-s)}dW_s.
$$

確率積分の期待値は 0 なので

$$
\boxed{
m(t,x)=xe^{-\theta t}.
}
$$

微分すると

$$
\partial_tm
=
-\theta xe^{-\theta t}.
$$

一方

$$
m_x=e^{-\theta t},
\qquad
m_{xx}=0,
$$

なので

$$
Lm
=
-\theta x e^{-\theta t}.
$$

従って

$$
\partial_tm=Lm.
$$

また $m(0,x)=x$ です。

3. 上の explicit solution から cross term の期待値は 0 で

$$
\begin{aligned}
u(t,x)
&=
x^2e^{-2\theta t}
+
\sigma^2
E\left[
\left(
\int_0^t
e^{-\theta(t-s)}dW_s
\right)^2
\right]\\
&=
x^2e^{-2\theta t}
+
\sigma^2
\int_0^t
e^{-2\theta(t-s)}ds\\
&=
x^2e^{-2\theta t}
+
\frac{\sigma^2}{2\theta}
\left(
1-e^{-2\theta t}
\right).
\end{aligned}
$$

従って

$$
\boxed{
u(t,x)
=
x^2e^{-2\theta t}
+
\frac{\sigma^2}{2\theta}
(1-e^{-2\theta t}).
}
$$

時間微分は

$$
\partial_tu
=
-2\theta x^2e^{-2\theta t}
+
\sigma^2e^{-2\theta t}.
$$

空間微分は

$$
u_x=2xe^{-2\theta t},
\qquad
u_{xx}=2e^{-2\theta t}.
$$

したがって

$$
\begin{aligned}
Lu
&=
-\theta x\cdot2xe^{-2\theta t}
+
\frac{\sigma^2}{2}\cdot2e^{-2\theta t}\\
&=
-2\theta x^2e^{-2\theta t}
+
\sigma^2e^{-2\theta t}\\
&=
\partial_tu.
\end{aligned}
$$

4. 一般式

$$
\partial_tp
=
-\partial_y(bp)
+
\frac12\partial_{yy}(ap)
$$

へ

$$
b(y)=-\theta y,
\qquad
a(y)=\sigma^2
$$

を代入すると

$$
\boxed{
\partial_tp
=
\theta\partial_y(yp)
+
\frac{\sigma^2}{2}\partial_{yy}p.
}
$$

5. $f(y)=y$ では

$$
Lf(y)=-\theta y.
$$

従って

$$
M_t
=
X_t-X_0+\theta\int_0^tX_sds
$$

が局所マルチンゲールです。

$f(y)=y^2$ では

$$
Lf(y)
=
-2\theta y^2+\sigma^2.
$$

product rule と compensator の比較から

$$
[M]_t
=
\sigma^2t.
$$

したがって

$$
W_t=\frac1\sigma M_t
$$

は continuous 局所マルチンゲールで

$$
[W]_t=t.
$$

Lévy characterization により $W$ はブラウン運動で、

$$
dX_t=-\theta X_tdt+\sigma dW_t
$$

を復元できます。

6. 確率制御では control $\alpha$ によりドリフトや拡散が

$$
b(x,\alpha),
\qquad
a(x,\alpha)
$$

へ変わります。

そのとき control ごとの生成作用素は

$$
L^\alpha f
=
b(x,\alpha)\cdot\nabla f
+
\frac12
\operatorname{tr}
(a(x,\alpha)D^2f).
$$

動的計画法では「短時間だけ control $\alpha$ を使った価値の変化率」を比較するため、まさに生成作用素が現れます。

最適化を入れると典型的に

$$
\partial_tV
+
\inf_\alpha
\left\{
L^\alpha V
+
\text{running cost}
\right\}
=
0
$$

という HJB equation へ進みます。

したがって本章の

$$
\text{半群}
\to
\text{生成作用素}
\to
\text{backward equation}
$$

が確率制御の direct bridge です。
<!-- solution-end -->

---

## 18. 本章のまとめ

本章の一本の流れは

$$
\boxed{
P_t(x,dy)
\to
P_t f
\to
L
\to
\text{Dynkin}
\to
\text{Kolmogorov / Fokker--Planck}
\to
\text{Feynman--Kac}
\to
\text{マルチンゲール問題}
}
$$

でした。

SDE は

$$
\text{ブラウン雑音}
\to
\text{path}
$$

という構成です。

マルチンゲール問題は逆に

$$
\text{生成作用素}
\to
\text{path 法則}
$$

を問います。

非退化拡散では

$$
\boxed{
\text{ブラウン SDE 表現}
\Longleftrightarrow
\text{マルチンゲール問題}
}
$$

をブラウン運動の復元まで追えました。

さらにマルチンゲール問題の存在と法則の一意性がそろえば、その一意性から Markov / strong Markov structure が生まれます。

これで Encore IV の確率解析は、pathwise calculus から PDE・確率制御側へ接続できる位置まで到達しました。

次の STO12 では、ブラウン運動のフィルトレーション上のマルチンゲール自体を確率積分として表す予測可能表現性へ進みます。
