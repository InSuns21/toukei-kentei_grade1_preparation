# STO8：Brown 運動の接触密度 — kink から reflection へ

<!-- definition-example-audit: strict -->

STO7 までの Itô formula は、空間変数について二階微分できる関数を扱いました。

ところが最も基本的な凸関数

$$
x\longmapsto |x-a|
$$

は $x=a$ で微分可能ではありません。

Brown 運動 $B$ へ形式的に通常の微分則を当てると

$$
d|B_t-a|
\stackrel{?}{=}
\operatorname{sgn}(B_t-a)\,dB_t
$$

と書きたくなります。

しかしこれは一項足りません。

Brown 運動の標本路 は level $a$ を通過するとき、通常の時間ではほとんど滞在していないのに、二次変分の尺度では無視できない「接触量」を残します。その量が **local time** です。

本章の中心線は

$$
\boxed{
\text{smooth }|x-a|
\to
\text{Tanaka}
\to
\text{level-set support}
\to
\text{occupation density}
\to
\text{reflection}
}
$$

です。

最後まで 1 次元 Brown 運動を主対象にします。一般 continuous semimartingale の local time へ拡張できる形を意識しますが、後続理論を逆輸入して証明を短絡させません。

---

## 1. kink を滑らかにして二階項を観察する

まず、偶関数 $\rho:\mathbb R\to[0,\infty)$ を一つ固定し、

$$
\rho\in C^\infty(\mathbb R),
\qquad
\operatorname{supp}\rho\subset[-1,1],
\qquad
\int_{\mathbb R}\rho(x)\,dx=1
$$

とします。

例えば $|x|<1$ で

$$
\rho(x)
=
C\exp\left(-\frac1{1-x^2}\right)
$$

とし、$|x|\ge1$ で $0$ と置き、定数 $C$ を積分が $1$ になるよう選べばよいです。

$\varepsilon>0$ に対し

$$
\rho_\varepsilon(x)
=
\frac1\varepsilon
\rho\left(\frac{x}{\varepsilon}\right)
$$

とし、

$$
F_\varepsilon(x)
=
\int_{\mathbb R}
|x-y|\rho_\varepsilon(y)\,dy
$$

と置きます。

$\rho_\varepsilon$ は $[-\varepsilon,\varepsilon]$ に支えられるので

$$
|F_\varepsilon(x)-|x||
\le
\int |y|\rho_\varepsilon(y)\,dy
\le
\varepsilon.
$$

さらに

$$
F_\varepsilon'(x)
=
\int
\operatorname{sgn}(x-y)\rho_\varepsilon(y)\,dy
=
2\int_{-\infty}^x\rho_\varepsilon(y)\,dy-1,
$$

したがって

$$
F_\varepsilon''(x)
=
2\rho_\varepsilon(x).
$$

ここで

$$
\operatorname{sgn}(x)
=
\begin{cases}
1,&x>0,\\
0,&x=0,\\
-1,&x<0
\end{cases}
$$

とします。

重要なのは

$$
|F_\varepsilon'|\le1
$$

かつ

$$
|x|>\varepsilon
\quad\Longrightarrow\quad
F_\varepsilon'(x)=\operatorname{sgn}(x)
$$

であることです。

つまり二階微分

$$
F_\varepsilon''=2\rho_\varepsilon
$$

は kink の近くへ質量を集中させています。

---

## 2. local time を occupation kernel の極限として捉える

<a id="def-sto8-brownian-local-time"></a>

<!-- formal-statement-start -->
> **定義（Brownian local time at a level）**  
> $B$ を standard Brownian motion、$a\in\mathbb R$ とする。偶・非負・$C^\infty$ で
>
> $\operatorname{supp}\rho\subset[-1,1]$、$\int\rho=1$
>
> を満たす $\rho$ を取り、
>
$$
\rho_\varepsilon(x)
=
\varepsilon^{-1}\rho(x/\varepsilon)
$$
>
> とする。
>
> continuous adapted increasing process $L^a=(L_t^a)_{t\ge0}$ が $L_0^a=0$ を満たし、任意の $T<\infty$ について
>
$$
\sup_{0\le t\le T}
\left|
\int_0^t
\rho_\varepsilon(B_s-a)\,ds
-
L_t^a
\right|
\to0
$$
>
> in probability as $\varepsilon\downarrow0$ となるとき、$L^a$ を level $a$ における **Brownian local time** という。
<!-- formal-statement-end -->

$\rho_\varepsilon(B_s-a)$ は、$B_s$ が $a$ の $\varepsilon$ 近傍にいるときだけ大きくなります。

したがって

$$
\int_0^t\rho_\varepsilon(B_s-a)\,ds
$$

は「level $a$ の細い近傍にいた時間を、近傍幅で正規化した量」です。

まだ存在は示していません。次の定理が、local time が本当に存在し、しかも絶対値の kink に現れる補正項そのものであることを示します。

---

## 3. kink を含む関数の補正公式

<a id="thm-sto8-tanaka"></a>

<!-- formal-statement-start -->
> **定理（Brownian local time の存在・Tanaka formula）**  
> $B$ を standard Brownian motion、$a\in\mathbb R$ とする。
>
> このとき level $a$ の Brownian local time $L^a$ が存在し、選んだ smoothing kernel $\rho$ に依存しない。
>
> さらに全ての $t\ge0$ について almost surely
>
$$
\boxed{
|B_t-a|
=
|B_0-a|
+
\int_0^t
\operatorname{sgn}(B_s-a)\,dB_s
+
L_t^a.
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

この式は

$$
d|B_t-a|
=
\operatorname{sgn}(B_t-a)\,dB_t
+
dL_t^a
$$

と読めます。

通常の微積分なら絶対値の kink は一点だけなので無視したくなります。しかし Brownian calculus では、その一点へ何度も戻ることが $dL^a$ として残ります。

### 証明の見取り図

1. $F_\varepsilon(B_t-a)$ へ [multidimensional Itô formula](../STO7/index.md#thm-sto7-multidimensional-ito) の 1 次元版を適用する。
2. 二階項はちょうど $\int\rho_\varepsilon(B_s-a)ds$ になる。
3. $F_\varepsilon\to|\cdot|$ は一様誤差 $O(\varepsilon)$。
4. $F_\varepsilon'\to\operatorname{sgn}$ の stochastic integral は STO6 の $L^2$ theory と [continuous-time Doob L2 maximal inequality](../STO6/index.md#thm-sto6-doob-l2) で process 全体として収束する。
5. 残った増加過程の極限を $L^a$ とする。

<!-- proof-start -->
### 証明

固定した $T<\infty$ を取ります。

[Itô formula](../STO7/index.md#thm-sto7-multidimensional-ito) を $F_\varepsilon(B_t-a)$ に適用すると

$$
\begin{aligned}
F_\varepsilon(B_t-a)
&=
F_\varepsilon(B_0-a)
+
\int_0^t
F_\varepsilon'(B_s-a)\,dB_s\\
&\quad+
\frac12
\int_0^t
F_\varepsilon''(B_s-a)\,ds.
\end{aligned}
$$

$F_\varepsilon''=2\rho_\varepsilon$ なので

$$
A_t^{a,\varepsilon}
:=
\int_0^t
\rho_\varepsilon(B_s-a)\,ds
$$

と置けば

$$
A_t^{a,\varepsilon}
=
F_\varepsilon(B_t-a)
-
F_\varepsilon(B_0-a)
-
\int_0^t
F_\varepsilon'(B_s-a)\,dB_s.
$$

各 $A^{a,\varepsilon}$ は continuous かつ increasing です。

#### Step 1：絶対値の項

全ての $x$ で

$$
|F_\varepsilon(x)-|x||
\le\varepsilon
$$

なので

$$
\sup_{t\le T}
\left|
F_\varepsilon(B_t-a)-|B_t-a|
\right|
\le\varepsilon.
$$

初期値も同様です。

#### Step 2：stochastic integral の極限

$|F_\varepsilon'|\le1$ であり、$|x|>\varepsilon$ では

$$
F_\varepsilon'(x)=\operatorname{sgn}(x).
$$

従って

$$
\left|
F_\varepsilon'(B_s-a)
-
\operatorname{sgn}(B_s-a)
\right|^2
\le
4\,1_{\{|B_s-a|\le\varepsilon\}}.
$$

固定 $s>0$ では $B_s$ は連続密度を持つため

$$
P(B_s=a)=0
$$

であり、

$$
P(|B_s-a|\le\varepsilon)\to0.
$$

$0\le4P(|B_s-a|\le\varepsilon)\le4$ なので dominated convergence により

$$
E\int_0^T
\left|
F_\varepsilon'(B_s-a)
-
\operatorname{sgn}(B_s-a)
\right|^2ds
\to0.
$$

STO6 の [stochastic integral の $L^2$ 構成](../STO6/index.md#thm-sto6-l2-construction) と
[Doob $L^2$ inequality](../STO6/index.md#thm-sto6-doob-l2) から

$$
E\left[
\sup_{t\le T}
\left|
\int_0^t
\left(
F_\varepsilon'(B_s-a)
-
\operatorname{sgn}(B_s-a)
\right)dB_s
\right|^2
\right]
\to0.
$$

したがって stochastic integral は $L^2$-supremum の意味で

$$
\int_0^tF_\varepsilon'(B_s-a)\,dB_s
\to
\int_0^t\operatorname{sgn}(B_s-a)\,dB_s
$$

へ収束します。

#### Step 3：増加過程の極限

以上から

$$
A_t^{a,\varepsilon}
\to
L_t^a
:=
|B_t-a|-|B_0-a|
-
\int_0^t
\operatorname{sgn}(B_s-a)\,dB_s
$$

in $L^2$-supremum on $[0,T]$ です。

右辺は continuous adapted process です。

さらに $L^2$-supremum convergence から subsequence $\varepsilon_n\downarrow0$ を選び

$$
\sup_{t\le T}
|A_t^{a,\varepsilon_n}-L_t^a|
\to0
\qquad\text{almost surely}
$$

とできます。

各 $A^{a,\varepsilon_n}$ は increasing なので、その一様極限 $L^a$ も increasing です。

また

$$
L_0^a=0.
$$

従って $L^a$ は定義を満たす Brownian local time です。

表示した等式を移項すれば Tanaka formula を得ます。

最後に、別の smoothing kernel を選んでも、極限は同じ Tanaka residual

$$
|B_t-a|-|B_0-a|
-
\int_0^t\operatorname{sgn}(B_s-a)\,dB_s
$$

に一致します。したがって local time は kernel の選択に依存しません。
<!-- proof-end -->

<!-- definition-example-start: def-sto8-brownian-local-time -->
### 直接例：level $0$ の local time は平均 $\sqrt{2t/\pi}$ を持つ

**定義の確認**

$a=0$ とします。

上の定理により

$$
L_t^0
=
|B_t|
-
\int_0^t\operatorname{sgn}(B_s)\,dB_s.
$$

右辺は continuous adapted process であり、構成証明から increasing、$L_0^0=0$、かつ occupation kernel の ucp limit です。従って定義の条件を実際に満たします。

stochastic integral の平均は $0$ なので

$$
E[L_t^0]
=
E|B_t|.
$$

$B_t\sim N(0,t)$ だから

$$
E|B_t|
=
\sqrt{t}\,E|Z|
=
\sqrt{\frac{2t}{\pi}},
\qquad
Z\sim N(0,1).
$$

したがって

$$
\boxed{
E[L_t^0]
=
\sqrt{\frac{2t}{\pi}}.
}
$$

local time は「一点にいる通常の時間」ではありません。平均が正であること自体が、その違いを示しています。
<!-- definition-example-end -->

---

## 4. positive part / negative part は半分の local time を持つ

$x^+=(|x|+x)/2$、$x^-= (|x|-x)/2$ を使うと、絶対値版から片側版が直ちに出ます。

<a id="cor-sto8-positive-negative-tanaka"></a>

<!-- formal-statement-start -->
> **系（positive / negative part の Tanaka formula）**  
> $B$ を standard Brownian motion、$a\in\mathbb R$ とする。このとき
>
$$
\boxed{
(B_t-a)^+
=
(B_0-a)^+
+
\int_0^t
1_{\{B_s>a\}}\,dB_s
+
\frac12L_t^a
}
$$
>
> および
>
$$
\boxed{
(B_t-a)^-
=
(B_0-a)^-
-
\int_0^t
1_{\{B_s<a\}}\,dB_s
+
\frac12L_t^a
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Tanaka formula と

$$
B_t-a
=
B_0-a+\int_0^t1\,dB_s
$$

を加減します。

例えば positive part では

$$
\begin{aligned}
(B_t-a)^+
&=
\frac12\{|B_t-a|+(B_t-a)\}\\
&=
(B_0-a)^+
+
\frac12
\int_0^t
\left(
\operatorname{sgn}(B_s-a)+1
\right)dB_s\\
&\quad+
\frac12L_t^a.
\end{aligned}
$$

$\operatorname{sgn}(0)=0$ のため level 上では integrand が $1/2$ になりますが、後で示すように Brown 運動が固定 level にいる Lebesgue 時間は $0$ です。stochastic integral の二次平均でもその差は消えます。

従って integrand を $1_{\{B_s>a\}}$ に置き換えられます。

negative part は
$(B_t-a)^-=(|B_t-a|-(B_t-a))/2$
へ同じ二式を代入すると

$$
(B_t-a)^-
=
(B_0-a)^-
-
\int_0^t1_{\{B_s<a\}}\,dB_s
+
\frac12L_t^a
$$

となります。
<!-- proof-end -->

---

## 5. local time はどこで増えるのか

local time は increasing ですが、Brown 運動が level から離れている時間には増えません。

<a id="prop-sto8-local-time-support"></a>

<!-- formal-statement-start -->
> **命題（local time の増加は level set に支えられる）**  
> $B$ を standard Brownian motion、$a\in\mathbb R$ とする。
>
> local time $L^a$ の Stieltjes 増加測度 $dL_t^a$ は
>
$$
\{t\ge0:B_t=a\}
$$
>
> に支えられる。
>
> すなわち compact interval $[u,v]$ 上で $B_t\ne a$ が全ての $t\in[u,v]$ に対して成り立つなら
>
$$
L_v^a=L_u^a.
$$
<!-- formal-statement-end -->

### 証明の見取り図

occupation kernel $\rho_\varepsilon(B_s-a)$ は

$$
|B_s-a|>\varepsilon
$$

なら $0$ です。

level set を避ける compact interval では continuity により level から正の距離を持つため、十分小さい $\varepsilon$ では近似 local time 自体が全く増えません。

<!-- proof-start -->
### 証明

$B_t\ne a$ for all $t\in[u,v]$ とします。

$t\mapsto|B_t-a|$ は連続で、compact interval $[u,v]$ 上で正です。

従って

$$
\delta
=
\min_{u\le t\le v}|B_t-a|
>0.
$$

$\varepsilon<\delta$ なら $\rho_\varepsilon$ の support は $[-\varepsilon,\varepsilon]$ なので

$$
\rho_\varepsilon(B_s-a)=0
\qquad
(u\le s\le v).
$$

よって

$$
A_v^{a,\varepsilon}
-
A_u^{a,\varepsilon}
=
\int_u^v
\rho_\varepsilon(B_s-a)\,ds
=
0.
$$

Tanaka theorem の構成で $A^{a,\varepsilon}\to L^a$ ucp、適切な subsequence では一様 almost surely なので

$$
L_v^a-L_u^a=0.
$$

従って $dL^a$ は level set の外では質量を持ちません。
<!-- proof-end -->

ここで非常に重要な事実が続きます。

local time は level set 上で増えるのに、その level set は通常の時間尺度では長さ $0$ です。

<a id="prop-sto8-level-set-zero-time"></a>

<!-- formal-statement-start -->
> **命題（Brownian level set の Lebesgue 時間は 0）**  
> $B$ を standard Brownian motion、$a\in\mathbb R$、$T<\infty$ とする。このとき
>
$$
\lambda\{s\in[0,T]:B_s=a\}
=
0
$$
>
> almost surely である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非負関数

$$
(\omega,s)\mapsto1_{\{B_s(\omega)=a\}}
$$

へ [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) を使うと

$$
\begin{aligned}
E\left[
\int_0^T
1_{\{B_s=a\}}\,ds
\right]
&=
\int_0^T
P(B_s=a)\,ds.
\end{aligned}
$$

$s>0$ では $B_s\sim N(0,s)$ は連続密度を持つため

$$
P(B_s=a)=0.
$$

$s=0$ は Lebesgue 積分へ寄与しません。

従って

$$
E\left[
\int_0^T
1_{\{B_s=a\}}\,ds
\right]=0.
$$

左辺は非負確率変数なので

$$
\int_0^T1_{\{B_s=a\}}\,ds=0
$$

almost surely です。
<!-- proof-end -->

この二つを並べると local time の意味が見えます。

$$
\boxed{
\text{usual time of exact contact}=0,
\qquad
\text{renormalized near-contact density}=L^a.
}
$$

---

## 6. 空間変数 $a$ に対して local time は連続に選べる

occupation density と呼ぶには、level $a$ を少し動かしたとき local time が暴れないことを確認したいところです。

そのため、まず狭い区間にいる時間の moment を評価します。

<a id="lem-sto8-interval-occupation-moment"></a>

<!-- formal-statement-start -->
> **補題（interval occupation moment bound）**  
> $B$ を standard Brownian motion、$I\subset\mathbb R$ を長さ $h$ の interval とし
>
$$
A_T(I)
=
\int_0^T1_{\{B_s\in I\}}\,ds
$$
>
> と置く。
>
> 任意の整数 $m\ge1$ に対し、$m,T$ のみに依存する有限定数 $C_{m,T}$ が存在して
>
$$
E[A_T(I)^m]
\le
C_{m,T}h^m
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$m$ 乗を $m$ 重時間積分へ展開し、時間順序

$$
0<s_1<\cdots<s_m<T
$$

に並べます。

Brownian transition density を各時間差ごとに上から抑えると、区間 $I$ からは毎回長さ $h$ が一つ出ます。残る時間積分は

$$
s_1^{-1/2}
(s_2-s_1)^{-1/2}
\cdots
(s_m-s_{m-1})^{-1/2}
$$

で、simplex 上可積分です。

<!-- proof-start -->
### 証明

[Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により

$$
\begin{aligned}
E[A_T(I)^m]
&=
\int_{[0,T]^m}
P(B_{s_1},\ldots,B_{s_m}\in I)
\,ds_1\cdots ds_m.
\end{aligned}
$$

対角集合は $m$ 次元 Lebesgue measure $0$ なので、時刻を並べ替えて

$$
E[A_T(I)^m]
=
m!
\int_{0<s_1<\cdots<s_m<T}
P(B_{s_1},\ldots,B_{s_m}\in I)
\,ds_1\cdots ds_m.
$$

Brownian transition densityを

$$
p_r(x)
=
\frac1{\sqrt{2\pi r}}
e^{-x^2/(2r)}
$$

と書きます。

Markov property と独立増分から joint density は

$$
p_{s_1}(x_1)
\prod_{j=2}^m
p_{s_j-s_{j-1}}(x_j-x_{j-1})
$$

です。

各 Gaussian density は

$$
p_r(x)\le\frac1{\sqrt{2\pi r}}
$$

なので

$$
\begin{aligned}
&P(B_{s_1},\ldots,B_{s_m}\in I)\\
&\le
\int_{I^m}
\frac{
dx_1\cdots dx_m
}{
(2\pi)^{m/2}
\sqrt{
s_1(s_2-s_1)\cdots(s_m-s_{m-1})
}
}\\
&=
\frac{
h^m
}{
(2\pi)^{m/2}
\sqrt{
s_1(s_2-s_1)\cdots(s_m-s_{m-1})
}
}.
\end{aligned}
$$

従って

$$
E[A_T(I)^m]
\le
C_mh^m
\int_{0<s_1<\cdots<s_m<T}
\frac{ds_1\cdots ds_m}{
\sqrt{
s_1(s_2-s_1)\cdots(s_m-s_{m-1})
}
}.
$$

変数変換

$$
u_1=s_1,
\qquad
u_j=s_j-s_{j-1}
$$

を使うと積分領域は

$$
u_j>0,
\qquad
u_1+\cdots+u_m<T
$$

で、integrand は

$$
\prod_{j=1}^m u_j^{-1/2}.
$$

各指数 $-1/2>-1$ なので、この simplex integral は有限です。

その値を $C_{m,T}$ へ吸収すれば主張を得ます。
<!-- proof-end -->

<a id="thm-sto8-spatial-continuity"></a>

<!-- formal-statement-start -->
> **定理（Brownian local time の空間連続性）**  
> $B$ を standard Brownian motion とする。
>
> 各固定 $t\ge0$ について、$a\mapsto L_t^a$ は連続な modification を持つ。
>
> さらに compact interval 上で、任意の
>
$$
0<\gamma<\frac14
$$
>
> に対して $\gamma$-Hölder continuous となる version を選べる。
<!-- formal-statement-end -->

真の最適正則性はこれより良いですが、本章では occupation formula に必要な連続性を、自前の moment estimate から確実に得るところまで進みます。

### 証明の見取り図

Tanaka formula を level $a,b$ で引き算します。

martingale difference が動くのは $B_s$ が $a$ と $b$ の間にいるときだけです。

そこで前の occupation moment bound と
[Burkholder--Davis--Gundy inequality](../STO6/index.md#thm-sto6-bdg) を使い、

$$
E|L_t^a-L_t^b|^4
\le
C|a-b|^2
$$

を作ります。

最後に STO3 の [Kolmogorov--Chentsov continuity theorem](../STO3/index.md#thm-sto3-kolmogorov-chentsov) を level 変数へ適用します。

<!-- proof-start -->
### 証明

$a<b$ とし

$$
h=b-a
$$

と置きます。

Tanaka formula の差から

$$
\begin{aligned}
L_t^a-L_t^b
&=
\{|B_t-a|-|B_t-b|\}\\
&\quad-
\{|B_0-a|-|B_0-b|\}\\
&\quad-
\int_0^t
\left[
\operatorname{sgn}(B_s-a)
-
\operatorname{sgn}(B_s-b)
\right]dB_s.
\end{aligned}
$$

最初の二つの差はそれぞれ絶対値で $h$ 以下です。

Brownian level set の Lebesgue 時間が $0$ であることから、stochastic integral の integrand は $ds$ に関してほとんど至る所（almost everywhere）で

$$
\operatorname{sgn}(B_s-a)
-
\operatorname{sgn}(B_s-b)
=
2\,1_{\{a<B_s<b\}}.
$$

従って martingale part を

$$
M_t^{a,b}
=
2\int_0^t
1_{\{a<B_s<b\}}\,dB_s
$$

と書けます。

[BDG inequality](../STO6/index.md#thm-sto6-bdg) の $p=4$ から

$$
E|M_t^{a,b}|^4
\le
C
E\left(
4\int_0^t
1_{\{a<B_s<b\}}\,ds
\right)^2.
$$

interval occupation moment bound の $m=2$ を使うと

$$
E|M_t^{a,b}|^4
\le
C_t h^2.
$$

また deterministic part の絶対値は $2h$ 以下なので

$$
E|L_t^a-L_t^b|^4
\le
C_t(h^4+h^2).
$$

compact interval 上では $h$ が大きい場合を定数へ吸収できるため

$$
E|L_t^a-L_t^b|^4
\le
C_{t,R}|a-b|^2
\qquad
(a,b\in[-R,R]).
$$

[Kolmogorov--Chentsov theorem](../STO3/index.md#thm-sto3-kolmogorov-chentsov) を parameter $a\in[-R,R]$ に適用すると

$$
\alpha=4,
\qquad
1+\beta=2,
\qquad
\beta=1.
$$

従って任意の

$$
\gamma<\frac{\beta}{\alpha}=\frac14
$$

について $\gamma$-Hölder continuous な modification を得ます。

$R=1,2,\ldots$ について rational levels 上で一致する version を選び、連続性で貼り合わせれば $\mathbb R$ 全体の連続 version を得られます。
<!-- proof-end -->

---

## 7. 滞在時間を空間密度へ変換する

local time の名称を正当化する中心定理です。

<a id="thm-sto8-occupation-time"></a>

<!-- formal-statement-start -->
> **定理（occupation time formula）**  
> $B$ を standard Brownian motion とし、固定した $t\ge0$ について空間連続な version $a\mapsto L_t^a$ を取る。
>
> 任意の非負 Borel measurable function $g:\mathbb R\to[0,\infty]$ に対し
>
$$
\boxed{
\int_0^t g(B_s)\,ds
=
\int_{\mathbb R}
g(a)L_t^a\,da
}
$$
>
> almost surely である。
>
> 両辺が絶対可積分なら符号を持つ $g$ に対しても同じ等式が成り立つ。
<!-- formal-statement-end -->

左辺は **time 側の occupation measure**、右辺は **space 側の密度 $L_t^a$** です。

### 証明の見取り図

smooth kernel approximation

$$
L_t^{a,\varepsilon}
=
\int_0^t
\rho_\varepsilon(B_s-a)\,ds
$$

から始めます。

$g(a)$ を掛けて $a$ で積分し、[Tonelli / Fubini](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) で順序交換すると

$$
\int g(a)L_t^{a,\varepsilon}da
=
\int_0^t
(g*\rho_\varepsilon)(B_s)ds.
$$

$\varepsilon\downarrow0$ で右辺は $\int g(B_s)ds$ へ行き、左辺は local time へ行きます。

<!-- proof-start -->
### 証明

まず $g\in C_c(\mathbb R)$ とします。

近似 local time を

$$
L_t^{a,\varepsilon}
=
\int_0^t
\rho_\varepsilon(B_s-a)\,ds
$$

と書きます。

非負・絶対可積分な integrand なので
[Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) と
[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を使って

$$
\begin{aligned}
\int_{\mathbb R}
g(a)L_t^{a,\varepsilon}\,da
&=
\int_{\mathbb R}
g(a)
\int_0^t
\rho_\varepsilon(B_s-a)\,ds\,da\\
&=
\int_0^t
\left[
\int_{\mathbb R}
g(a)\rho_\varepsilon(B_s-a)\,da
\right]ds.
\end{aligned}
$$

$\rho$ は偶関数なので内側は

$$
(g*\rho_\varepsilon)(B_s).
$$

$g$ は compact support 上 continuous なので uniformly continuous です。

従って

$$
\sup_x
|(g*\rho_\varepsilon)(x)-g(x)|
\to0.
$$

よって 標本路ごと に

$$
\int_0^t
(g*\rho_\varepsilon)(B_s)\,ds
\to
\int_0^t g(B_s)\,ds.
$$

一方、固定 $a$ では Tanaka theorem の証明から

$$
L_t^{a,\varepsilon}\to L_t^a
$$

in $L^2$、従って in $L^1$ です。

さらに stochastic integral の平均が $0$ なので

$$
E[L_t^{a,\varepsilon}]
=
E[
F_\varepsilon(B_t-a)-F_\varepsilon(B_0-a)
].
$$

$F_\varepsilon$ は $1$-Lipschitz だから

$$
0
\le
E[L_t^{a,\varepsilon}]
\le
E|B_t-B_0|
=
E|B_t|.
$$

Tanaka formula で stochastic integral の平均が 0 であることを使うと

$$
0\le E[L_t^a]\le E|B_t|.
$$

したがって

$$
E|L_t^{a,\varepsilon}-L_t^a|
\le
2E|B_t|
$$

で、右辺は $a$ に依存しません。

$g$ の support は有限長なので、dominated convergence を $a$ 変数へ使い

$$
E\left|
\int g(a)
\left(
L_t^{a,\varepsilon}-L_t^a
\right)da
\right|
\to0.
$$

よって

$$
\int g(a)L_t^{a,\varepsilon}da
\to
\int g(a)L_t^a\,da
$$

in $L^1$ です。

同じ左辺が 標本路ごと に $\int_0^tg(B_s)ds$ へ収束しているため、[距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)を確率収束へ適用すると

$$
\int_0^tg(B_s)ds
=
\int g(a)L_t^a\,da
$$

almost surely です。

#### $C_c$ から Borel functions へ

固定した $t$ と標本路 $\omega$ に対し、二つの Borel measure

$$
\mu_t^\omega(A)
=
\int_0^t
1_{\{B_s(\omega)\in A\}}\,ds,
$$

$$
\nu_t^\omega(A)
=
\int_A
L_t^a(\omega)\,da
$$

を考えます。

まず、rational endpoints を持つ bounded open interval $I=(p,q)$ を一つ固定します。$1_I$ を下から近似する compactly supported continuous functions $g_n$ を選べます。例えば $g_n$ を $I$ の内部で 1、境界から距離 $1/n$ の層で線形に 0 へ落とし、$I$ の外で 0 とすれば

$$
0\le g_n\uparrow1_I.
$$

既に示した $C_c$ の場合と monotone convergence から

$$
\mu_t(I)
=
\nu_t(I)
$$

almost surely です。

rational bounded intervals は可算なので、一つの probability-one event $\Omega_t$ 上で全てのそのような $I$ について同時に等式が成り立つようにできます。

$\omega\in\Omega_t$ を固定します。$\mu_t^\omega$ と $\nu_t^\omega$ はともに有限 measure です。実際

$$
\mu_t^\omega(\mathbb R)=t,
$$

また $g_n\uparrow1$ となる compactly supported continuous cutoff を $C_c$ の等式へ入れて monotone convergence を使えば

$$
\nu_t^\omega(\mathbb R)=t.
$$

$\varnothing$ と rational endpoints を持つ bounded open intervals からなる族は有限交差で閉じる $\pi$-system で、Borel $\sigma$-algebra を生成します。

そこで

$$
\mathcal D
=
\{A\in\mathcal B(\mathbb R):
\mu_t^\omega(A)=\nu_t^\omega(A)\}
$$

と置きます。二つの measure の全質量が等しいため $\mathbb R\in\mathcal D$、また $A\subset C$ で $A,C\in\mathcal D$ なら差集合について等式が保たれ、互いに素な可算和についても measure の可算加法性から等式が保たれます。従って $\mathcal D$ は、全体集合を含み、包含する二集合の差と互いに素な可算和で閉じる集合族です。

[F0-00D3A の集合族拡張定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda) により

$$
\mathcal B(\mathbb R)
\subset
\mathcal D.
$$

従って全ての Borel set $A$ について

$$
\int_0^t1_{\{B_s\in A\}}ds
=
\int_A L_t^a\,da.
$$

非負 simple function へ線形性を使い、さらに非負 Borel $g$ を simple functions で下から近似して monotone convergence を適用すれば

$$
\int_0^tg(B_s)ds
=
\int_{\mathbb R}g(a)L_t^a\,da
$$

を得ます。

符号を持つ $g$ は positive / negative parts に分け、両辺の絶対可積分性の下で差を取ります。
<!-- proof-end -->

この定理により

$$
L_t^a\,da
$$

は Brown 運動の標本路 が $[0,t]$ の間に空間上で作る occupation measure の密度です。

---

## 8. 細い interval の滞在時間から local time を回収する

<a id="cor-sto8-interval-approximation"></a>

<!-- formal-statement-start -->
> **系（interval occupation による local time 近似）**  
> $B$ を standard Brownian motion とし、固定した $t\ge0$ で空間連続な local time version を取る。
>
> 任意の $a\in\mathbb R$ について
>
$$
\boxed{
L_t^a
=
\lim_{\varepsilon\downarrow0}
\frac1{2\varepsilon}
\int_0^t
1_{\{|B_s-a|<\varepsilon\}}\,ds.
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

occupation time formula を

$$
g(x)
=
1_{(a-\varepsilon,a+\varepsilon)}(x)
$$

へ適用すると

$$
\int_0^t
1_{\{|B_s-a|<\varepsilon\}}\,ds
=
\int_{a-\varepsilon}^{a+\varepsilon}
L_t^x\,dx.
$$

従って

$$
\frac1{2\varepsilon}
\int_0^t
1_{\{|B_s-a|<\varepsilon\}}\,ds
=
\frac1{2\varepsilon}
\int_{a-\varepsilon}^{a+\varepsilon}
L_t^x\,dx.
$$

右辺は連続関数 $x\mapsto L_t^x$ の $a$ 周りの平均です。

空間連続性から

$$
\frac1{2\varepsilon}
\int_{a-\varepsilon}^{a+\varepsilon}
L_t^x\,dx
\to
L_t^a.
$$
<!-- proof-end -->

local time の「滞在密度」という意味が、これで式として完成しました。

---

## 9. deterministic reflection：押し戻す最小量

local time と reflection の関係を見る前に、確率を使わない 標本路ごと lemma を一つ証明します。

<a id="lem-sto8-skorokhod-reflection"></a>

<!-- formal-statement-start -->
> **補題（Skorokhod reflection lemma）**  
> $x:[0,\infty)\to\mathbb R$ を continuous、$x(0)=0$ とする。
>
> continuous nondecreasing function $k$ が
>
$$
k(0)=0,
\qquad
y(t):=x(t)+k(t)\ge0
$$
>
> を満たし、さらに $k$ は $y=0$ のときだけ増加する、すなわち
>
$$
\int_0^t
1_{\{y(s)>0\}}\,dk(s)=0
$$
>
> を全ての $t$ で満たすとする。
>
> このとき
>
$$
\boxed{
k(t)
=
-\min_{0\le s\le t}
(x(s)\wedge0)
}
$$
>
> であり、
>
$$
y(t)
=
x(t)
-
\min_{0\le s\le t}(x(s)\wedge0).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$y=x+k\ge0$ なので、$k$ は過去の負の落ち込みを少なくとも全部埋めなければなりません。

一方、必要以上に $k$ が増えた瞬間には $y>0$ になり、support 条件に反します。

<!-- proof-start -->
### 証明

まず $y(s)\ge0$ より

$$
k(s)\ge-x(s)
$$

です。

$k$ は nondecreasing なので任意の $u\le t$ に対し

$$
k(t)\ge k(u)\ge -x(u).
$$

従って

$$
k(t)
\ge
\sup_{0\le u\le t}(-x(u))^+
=
-\min_{0\le u\le t}(x(u)\wedge0).
$$

右辺を

$$
k_*(t)
=
-\min_{0\le u\le t}(x(u)\wedge0)
$$

と書きます。

逆向きを示します。固定した $t$ に対し

$$
c=k_*(t)
$$

と置きます。

$c$ の定義から、全ての $s\le t$ で

$$
x(s)\ge-c.
$$

従って $k(s)>c$ なら

$$
y(s)=x(s)+k(s)>-c+c=0.
$$

よって

$$
\{s\le t:k(s)>c\}
\subset
\{s\le t:y(s)>0\}.
$$

support 条件から

$$
\int_0^t
1_{\{k(s)>c\}}\,dk(s)
=
0.
$$

一方 $k$ は continuous nondecreasing なので、左辺は $k$ が level $c$ を越えた後に増えた総量、すなわち

$$
(k(t)-c)^+
$$

に等しいです。

従って

$$
(k(t)-c)^+=0,
$$

すなわち

$$
k(t)\le c=k_*(t).
$$

既に $k(t)\ge k_*(t)$ を示しているので

$$
k(t)=k_*(t)
$$

です。$t$ は任意だったため主張が従います。
<!-- proof-end -->

---

## 10. Levy transform と local time は反射 Brown 運動を作る

<a id="prop-sto8-levy-transform"></a>

<!-- formal-statement-start -->
> **命題（Levy transform は Brown 運動）**  
> $B$ を standard Brownian motion とし
>
$$
\beta_t
=
\int_0^t
\operatorname{sgn}(B_s)\,dB_s
$$
>
> と置く。
>
> このとき $\beta$ は同じ filtration に関する standard Brownian motion である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\beta$ は bounded predictable integrand による Brownian stochastic integral なので continuous local martingale です。

STO6 の stochastic integral [stochastic integral の quadratic variation](../STO6/index.md#thm-sto6-integral-bracket) から

$$
[\beta]_t
=
\int_0^t
\operatorname{sgn}(B_s)^2\,ds.
$$

$\operatorname{sgn}(x)^2=1$ for $x\ne0$、$0$ for $x=0$ なので

$$
[\beta]_t
=
t-
\int_0^t1_{\{B_s=0\}}\,ds.
$$

Brownian level set の Lebesgue 時間は $0$ almost surely だから

$$
[\beta]_t=t.
$$

また $\beta_0=0$ です。

従って STO5 の [Lévy characterization](../STO5/index.md#thm-sto5-levy-characterization) から $\beta$ は standard Brownian motion です。
<!-- proof-end -->

<a id="thm-sto8-reflection-local-time"></a>

<!-- formal-statement-start -->
> **定理（local time による Brownian reflection representation）**  
> $B$ を standard Brownian motion、
>
$$
\beta_t
=
\int_0^t
\operatorname{sgn}(B_s)\,dB_s
$$
>
> とする。
>
> このとき almost surely 全ての $t\ge0$ について
>
$$
\boxed{
|B_t|
=
\beta_t+L_t^0
}
$$
>
> かつ
>
$$
\boxed{
L_t^0
=
-\min_{0\le s\le t}\beta_s.
}
$$
>
> 従って process として
>
$$
(|B_t|,L_t^0)_{t\ge0}
\overset{d}{=}
\left(
B_t-\min_{0\le s\le t}B_s,
-\min_{0\le s\le t}B_s
\right)_{t\ge0}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Tanaka formula が

$$
|B|=\beta+L^0
$$

を与えます。

$L^0$ は increasing で、しかも $B=0$、すなわち $|B|=0$ のときだけ増えます。

従って $L^0$ は $\beta$ を非負へ押し戻す最小 regulator です。Skorokhod reflection lemma が running minimum を返します。

<!-- proof-start -->
### 証明

Tanaka formula を $a=0$ に適用すると

$$
|B_t|
=
\int_0^t
\operatorname{sgn}(B_s)\,dB_s
+
L_t^0
=
\beta_t+L_t^0.
$$

$|B_t|\ge0$、$L^0$ は continuous nondecreasing、$L_0^0=0$ です。

さらに [local time の support](#prop-sto8-local-time-support) から $L^0$ が増加するのは

$$
B_t=0
$$

のときだけです。

これは

$$
|B_t|=0
$$

と同値です。

従って [Skorokhod reflection lemma](#lem-sto8-skorokhod-reflection) を

$$
x=\beta,
\qquad
k=L^0,
\qquad
y=|B|
$$

へ適用でき、

$$
L_t^0
=
-\min_{0\le s\le t}(\beta_s\wedge0).
$$

$\beta_0=0$ なので running minimum は常に $0$ 以下であり

$$
L_t^0
=
-\min_{0\le s\le t}\beta_s.
$$

前の命題で $\beta$ は Brownian motion なので、process law の等式も従います。
<!-- proof-end -->

STO4 の [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) と Brownian symmetry を使うと、$x\ge0$ に対し

$$
\begin{aligned}
P(L_t^0\ge x)
&=
P\left(
-\min_{s\le t}\beta_s\ge x
\right)\\
&=
P\left(
\max_{s\le t}\beta_s\ge x
\right)\\
&=
2P(\beta_t\ge x).
\end{aligned}
$$

従って

$$
\boxed{
L_t^0
\overset d=
\max_{s\le t}B_s
\overset d=
|B_t|.
}
$$

先ほど得た

$$
E[L_t^0]=\sqrt{\frac{2t}{\pi}}
$$

とも一致します。

---

## 11. 何が起きていたのか

通常の Itô formula は $C^2$ 関数に対し

$$
df(B_t)
=
f'(B_t)\,dB_t
+
\frac12f''(B_t)\,dt
$$

です。

$f(x)=|x-a|$ では二階微分は通常の関数として存在しません。

しかし smooth approximation の二階微分

$$
F_\varepsilon''(x)
=
2\rho_\varepsilon(x)
$$

は $0$ へ集中し、その Itô correction

$$
\frac12
\int_0^t
F_\varepsilon''(B_s-a)\,ds
=
\int_0^t
\rho_\varepsilon(B_s-a)\,ds
$$

が消えずに $L_t^a$ へ残ります。

したがって local time は

$$
\boxed{
\text{kink に集中した second-order Itô correction}
}
$$

であると同時に

$$
\boxed{
\text{occupation measure の space density}
}
$$

です。

この二つの見方が Tanaka formula と occupation time formula をつないでいます。

---

# 12. 演習 A

#### STO8-A01 smooth absolute value の二階項
- Level: A
- 目安時間: 15分

$\rho_\varepsilon$ と

$$
F_\varepsilon(x)
=
\int|x-y|\rho_\varepsilon(y)\,dy
$$

を本文と同じように取る。

1. $|F_\varepsilon(x)-|x||\le\varepsilon$ を示せ。
2. $F_\varepsilon''(x)=2\rho_\varepsilon(x)$ を示せ。
3. $|x|>\varepsilon$ なら $F_\varepsilon'(x)=\operatorname{sgn}(x)$ を示せ。

<!-- solution-start -->
### 詳細解答

1. reverse triangle inequality から

$$
\left|
|x-y|-|x|
\right|
\le|y|.
$$

従って

$$
\begin{aligned}
|F_\varepsilon(x)-|x||
&\le
\int
\left|
|x-y|-|x|
\right|
\rho_\varepsilon(y)\,dy\\
&\le
\int|y|\rho_\varepsilon(y)\,dy.
\end{aligned}
$$

$\rho_\varepsilon$ は $[-\varepsilon,\varepsilon]$ に支えられ、積分が $1$ なので

$$
\int|y|\rho_\varepsilon(y)\,dy
\le\varepsilon.
$$

2. $x=y$ は積分変数について measure $0$ なので

$$
F_\varepsilon'(x)
=
\int
\operatorname{sgn}(x-y)
\rho_\varepsilon(y)\,dy.
$$

$\int\rho_\varepsilon=1$ より

$$
F_\varepsilon'(x)
=
2\int_{-\infty}^x
\rho_\varepsilon(y)\,dy-1.
$$

右辺を微分して

$$
F_\varepsilon''(x)
=
2\rho_\varepsilon(x).
$$

3. $x>\varepsilon$ なら support 上の全ての $y$ について $x-y>0$ なので

$$
F_\varepsilon'(x)
=
\int\rho_\varepsilon(y)\,dy
=
1.
$$

$x<-\varepsilon$ なら全ての $y$ で $x-y<0$ なので

$$
F_\varepsilon'(x)=-1.
$$

従って

$$
F_\varepsilon'(x)=\operatorname{sgn}(x)
$$

です。
<!-- solution-end -->

#### STO8-A02 positive part の Tanaka formula
- Level: A
- 目安時間: 15分

Tanaka formula と

$$
x^+=\frac{|x|+x}{2}
$$

だけを用いて

$$
(B_t-a)^+
=
(B_0-a)^+
+
\int_0^t1_{\{B_s>a\}}\,dB_s
+
\frac12L_t^a
$$

を導け。

<!-- solution-start -->
### 詳細解答

Tanaka formula は

$$
|B_t-a|
=
|B_0-a|
+
\int_0^t
\operatorname{sgn}(B_s-a)\,dB_s
+
L_t^a.
$$

また

$$
B_t-a
=
B_0-a+\int_0^t1\,dB_s.
$$

二式を加えて $2$ で割ると

$$
\begin{aligned}
(B_t-a)^+
&=
(B_0-a)^+\\
&\quad+
\int_0^t
\frac{
1+\operatorname{sgn}(B_s-a)
}{2}
\,dB_s\\
&\quad+
\frac12L_t^a.
\end{aligned}
$$

$B_s\ne a$ では

$$
\frac{
1+\operatorname{sgn}(B_s-a)
}{2}
=
1_{\{B_s>a\}}.
$$

両 integrand の差は $\{B_s=a\}$ 上だけにあります。

本文の level-set proposition から

$$
\int_0^t1_{\{B_s=a\}}\,ds=0
$$

a.s. なので、[Itô isometry](../STO6/index.md#thm-sto6-ito-isometry-simple) によりその差の stochastic integral は $0$ です。

従って

$$
\boxed{
(B_t-a)^+
=
(B_0-a)^+
+
\int_0^t1_{\{B_s>a\}}\,dB_s
+
\frac12L_t^a.
}
$$
<!-- solution-end -->

#### STO8-A03 level set は時間長さ 0
- Level: A
- 目安時間: 10分

固定 $a\in\mathbb R$ と $T>0$ に対し

$$
Z_T(a)
=
\int_0^T1_{\{B_s=a\}}\,ds
$$

と置く。

$E[Z_T(a)]=0$ を示し、$Z_T(a)=0$ almost surely を結論せよ。

<!-- solution-start -->
### 詳細解答

integrand は非負なので Tonelli の定理を使えます。

$$
\begin{aligned}
E[Z_T(a)]
&=
E\int_0^T1_{\{B_s=a\}}\,ds\\
&=
\int_0^TP(B_s=a)\,ds.
\end{aligned}
$$

$s>0$ では

$$
B_s\sim N(0,s)
$$

で連続密度を持つため

$$
P(B_s=a)=0.
$$

$s=0$ は積分へ寄与しないので

$$
E[Z_T(a)]=0.
$$

$Z_T(a)\ge0$ だから、期待値 $0$ なら

$$
Z_T(a)=0
$$

almost surely です。

したがって Brown 運動が exact level $a$ にいる通常の時間長さは $0$ です。
<!-- solution-end -->

#### STO8-A04 interval occupation から local time を読む
- Level: A
- 目安時間: 15分

occupation time formula と $a\mapsto L_t^a$ の連続性を用いて

$$
\frac1{2\varepsilon}
\int_0^t
1_{\{|B_s-a|<\varepsilon\}}\,ds
\to L_t^a
$$

を示せ。

<!-- solution-start -->
### 詳細解答

occupation time formula に

$$
g(x)=1_{(a-\varepsilon,a+\varepsilon)}(x)
$$

を入れると

$$
\int_0^t
1_{\{|B_s-a|<\varepsilon\}}\,ds
=
\int_{a-\varepsilon}^{a+\varepsilon}
L_t^x\,dx.
$$

両辺を $2\varepsilon$ で割ると

$$
\frac1{2\varepsilon}
\int_0^t
1_{\{|B_s-a|<\varepsilon\}}\,ds
=
\frac1{2\varepsilon}
\int_{a-\varepsilon}^{a+\varepsilon}
L_t^x\,dx.
$$

右辺と $L_t^a$ の差は

$$
\begin{aligned}
&\left|
\frac1{2\varepsilon}
\int_{a-\varepsilon}^{a+\varepsilon}
L_t^x\,dx-L_t^a
\right|\\
&\le
\sup_{|x-a|<\varepsilon}
|L_t^x-L_t^a|.
\end{aligned}
$$

空間連続性から右辺は $0$ へ収束します。

従って主張を得ます。
<!-- solution-end -->

# 13. 演習 B

#### STO8-B01 local time の空間 moment estimate
- Level: B
- 目安時間: 30分

固定 $t>0$ と $a<b$ に対し、本文の [Tanaka formula](#thm-sto8-tanaka) と [Burkholder--Davis--Gundy inequality](../STO6/index.md#thm-sto6-bdg) を使って

$$
E|L_t^a-L_t^b|^4
\le
C_t\left(
|a-b|^4+|a-b|^2
\right)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$h=b-a$ と置きます。

Tanaka formula を levels $a,b$ で引くと

$$
L_t^a-L_t^b
=
D_t^{a,b}
-
M_t^{a,b},
$$

ここで

$$
\begin{aligned}
D_t^{a,b}
&=
|B_t-a|-|B_t-b|\\
&\quad-
\{|B_0-a|-|B_0-b|\},
\end{aligned}
$$

$$
M_t^{a,b}
=
\int_0^t
\{
\operatorname{sgn}(B_s-a)
-
\operatorname{sgn}(B_s-b)
\}
\,dB_s.
$$

absolute value は $1$-Lipschitz なので

$$
|D_t^{a,b}|
\le2h.
$$

level sets の Lebesgue 時間が $0$ だから、$ds$ に関してほとんど至る所（almost everywhere）

$$
\operatorname{sgn}(B_s-a)
-
\operatorname{sgn}(B_s-b)
=
2\,1_{\{a<B_s<b\}}.
$$

従って

$$
[M^{a,b}]_t
=
4\int_0^t1_{\{a<B_s<b\}}\,ds.
$$

BDG inequality の $p=4$ から

$$
E|M_t^{a,b}|^4
\le
C
E\left(
4\int_0^t1_{\{a<B_s<b\}}\,ds
\right)^2.
$$

本文の interval occupation moment bound の $m=2$ より

$$
E\left(
\int_0^t1_{\{a<B_s<b\}}\,ds
\right)^2
\le
C_t h^2.
$$

したがって

$$
E|M_t^{a,b}|^4
\le C_t h^2.
$$

最後に

$$
|x+y|^4\le8(|x|^4+|y|^4)
$$

を使えば

$$
\begin{aligned}
E|L_t^a-L_t^b|^4
&\le
8E|D_t^{a,b}|^4
+
8E|M_t^{a,b}|^4\\
&\le
C_t(h^4+h^2).
\end{aligned}
$$

すなわち

$$
\boxed{
E|L_t^a-L_t^b|^4
\le
C_t\left(
|a-b|^4+|a-b|^2
\right).
}
$$
<!-- solution-end -->

#### STO8-B02 Skorokhod reflection と local time の分布
- Level: B
- 目安時間: 30分

$$
\beta_t
=
\int_0^t\operatorname{sgn}(B_s)\,dB_s
$$

とする。

1. $\beta$ が Brown 運動であることを示せ。
2. $L_t^0=-\min_{s\le t}\beta_s$ を示せ。
3. $x\ge0$ に対し
   $P(L_t^0\ge x)=2P(B_t\ge x)$ を示せ。

<!-- solution-start -->
### 詳細解答

1. $\beta$ は Brownian stochastic integral なので continuous local martingale です。

bracket formula から

$$
[\beta]_t
=
\int_0^t
\operatorname{sgn}(B_s)^2\,ds.
$$

$\operatorname{sgn}(B_s)^2=1$ except on $\{B_s=0\}$ であり、その level set の Lebesgue 時間は $0$ です。

従って

$$
[\beta]_t=t.
$$

また $\beta_0=0$ なので [Lévy characterization](../STO5/index.md#thm-sto5-levy-characterization) により $\beta$ は Brown 運動です。

2. [Tanaka formula](#thm-sto8-tanaka) から

$$
|B_t|=\beta_t+L_t^0.
$$

$|B|\ge0$、$L^0$ は continuous increasing、$L_0^0=0$ です。

さらに $dL^0$ は $\{B=0\}=\{|B|=0\}$ に支えられます。

従って [Skorokhod reflection lemma](#lem-sto8-skorokhod-reflection) の条件を全て満たし

$$
L_t^0
=
-\min_{s\le t}\beta_s.
$$

3. $\beta$ は Brown 運動なので symmetry と [reflection principle](../STO4/index.md#thm-sto4-reflection-principle) から

$$
\begin{aligned}
P(L_t^0\ge x)
&=
P\left(
-\min_{s\le t}\beta_s\ge x
\right)\\
&=
P\left(
\max_{s\le t}(-\beta_s)\ge x
\right)\\
&=
2P(-\beta_t\ge x)\\
&=
2P(B_t\ge x).
\end{aligned}
$$

よって

$$
\boxed{
L_t^0\overset d=|B_t|.
}
$$
<!-- solution-end -->

#### STO8-B03 piecewise-linear convex function の Itô--Tanaka formula
- Level: B
- 目安時間: 30分

$c_1,\ldots,c_m\ge0$、$a_1,\ldots,a_m\in\mathbb R$ とし

$$
f(x)
=
\alpha+\beta x
+
\sum_{j=1}^m
c_j(x-a_j)^+
$$

とする。

$f(B_t)$ を stochastic integral と local times $L_t^{a_j}$ で表せ。

<!-- solution-start -->
### 詳細解答

各 positive part に [Tanaka formula](#thm-sto8-tanaka) を使います。

$$
(B_t-a_j)^+
=
(B_0-a_j)^+
+
\int_0^t
1_{\{B_s>a_j\}}\,dB_s
+
\frac12L_t^{a_j}.
$$

また線形項は

$$
\beta B_t
=
\beta B_0
+
\int_0^t\beta\,dB_s.
$$

全てを足すと

$$
\begin{aligned}
f(B_t)
&=
f(B_0)\\
&\quad+
\int_0^t
\left[
\beta
+
\sum_{j=1}^m
c_j1_{\{B_s>a_j\}}
\right]dB_s\\
&\quad+
\frac12
\sum_{j=1}^m
c_jL_t^{a_j}.
\end{aligned}
$$

従って

$$
\boxed{
f(B_t)
=
f(B_0)
+
\int_0^t f'_-(B_s)\,dB_s
+
\frac12
\sum_{j=1}^m c_jL_t^{a_j},
}
$$

ここで kink 以外では

$$
f'_-(x)
=
\beta+\sum_jc_j1_{\{x>a_j\}}
$$

です。

通常の $C^2$ Itô formula の二階項に相当するものが、各 kink $a_j$ に集中した local time の和へ置き換わっています。
<!-- solution-end -->

# 14. 演習 C

#### STO8-C01 interval 内の occupation と Green kernel
- Level: C
- 目安時間: 45分

$b>0$ とし

$$
\tau_b
=
\inf\{t\ge0:|B_t|=b\}
$$

とする。

固定 $a\in(-b,b)$ について

$$
E[L_{\tau_b}^a]
=
b-|a|
$$

を示せ。

さらに非負 Borel function $g$ について、occupation formula を停止時刻へ適用できる場合に

$$
\boxed{
E\int_0^{\tau_b}g(B_s)\,ds
=
\int_{-b}^b
g(a)(b-|a|)\,da
}
$$

を導け。

<!-- solution-start -->
### 詳細解答

まず deterministic time で止めた

$$
\tau_b\wedge n
$$

を使います。

[Tanaka formula](#thm-sto8-tanaka) から

$$
|B_{\tau_b\wedge n}-a|
=
|a|
+
\int_0^{\tau_b\wedge n}
\operatorname{sgn}(B_s-a)\,dB_s
+
L_{\tau_b\wedge n}^a,
$$

ここでは $B_0=0$ なので $|B_0-a|=|a|$ です。

stochastic integral の integrand は絶対値 $1$ 以下で、停止時間も $n$ 以下なので square-integrable martingale です。従って期待値は $0$ です。

よって

$$
E[L_{\tau_b\wedge n}^a]
=
E|B_{\tau_b\wedge n}-a|-|a|.
$$

STO4 の hitting time theory により $\tau_b<\infty$ almost surely です。

さらに

$$
|B_{\tau_b\wedge n}|\le b
$$

なので dominated convergence から

$$
E|B_{\tau_b\wedge n}-a|
\to
E|B_{\tau_b}-a|.
$$

local time は increasing なので monotone convergence から

$$
E[L_{\tau_b\wedge n}^a]
\to
E[L_{\tau_b}^a].
$$

従って

$$
E[L_{\tau_b}^a]
=
E|B_{\tau_b}-a|-|a|.
$$

continuity により

$$
B_{\tau_b}\in\{-b,b\}.
$$

Brownian symmetry から

$$
P(B_{\tau_b}=b)
=
P(B_{\tau_b}=-b)
=
\frac12.
$$

$|a|<b$ なので

$$
|b-a|=b-a,
\qquad
|-b-a|=b+a.
$$

従って

$$
\begin{aligned}
E|B_{\tau_b}-a|
&=
\frac12(b-a)
+
\frac12(b+a)\\
&=
b.
\end{aligned}
$$

よって

$$
\boxed{
E[L_{\tau_b}^a]
=
b-|a|.
}
$$

$|a|\ge b$ では Brown 運動は停止前に level $a$ へ到達しないので local time は $0$ です。

停止時刻版の occupation formula も、本文の kernel approximation と同じ機構で得られます。

まず bounded stopping time

$$
\sigma_n=\tau_b\wedge n
$$

を固定します。$g\in C_c(\mathbb R)$ なら

$$
L_{\sigma_n}^{a,\varepsilon}
=
\int_0^{\sigma_n}
\rho_\varepsilon(B_s-a)\,ds
$$

として [Tonelli](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) / [Fubini](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を使うと

$$
\begin{aligned}
\int_{\mathbb R}
g(a)L_{\sigma_n}^{a,\varepsilon}\,da
&=
\int_0^{\sigma_n}
(g*\rho_\varepsilon)(B_s)\,ds.
\end{aligned}
$$

右辺は $g$ の一様連続性から 標本路ごと に

$$
\int_0^{\sigma_n}g(B_s)\,ds
$$

へ収束します。

一方 Tanaka theorem の証明で得た $[0,n]$ 上の $L^2$-supremum convergence から、各固定 $a$ について

$$
L_{\sigma_n}^{a,\varepsilon}
\to
L_{\sigma_n}^a
$$

in $L^2$ です。$g$ の compact support 上では本文と同じ一様な $L^1$ bound を使えるので dominated convergence により

$$
\int g(a)L_{\sigma_n}^{a,\varepsilon}\,da
\to
\int g(a)L_{\sigma_n}^a\,da
$$

in $L^1$ です。

従って[距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)を確率収束へ適用すると

$$
\int_0^{\sigma_n}g(B_s)\,ds
=
\int_{\mathbb R}
g(a)L_{\sigma_n}^a\,da
$$

almost surely です。

本文と同じ π–λ argument で非負 Borel $g$ へ拡張できます。

最後に $n\uparrow\infty$ とすると、左辺は monotone convergence で

$$
\int_0^{\tau_b}g(B_s)\,ds
$$

へ進みます。右辺も各 $a$ で

$$
L_{\sigma_n}^a\uparrow L_{\tau_b}^a
$$

なので Tonelli と monotone convergence により

$$
\int_{\mathbb R}
g(a)L_{\tau_b}^a\,da
$$

へ進みます。

したがって

$$
\int_0^{\tau_b}g(B_s)\,ds
=
\int_{\mathbb R}
g(a)L_{\tau_b}^a\,da.
$$

両辺は非負なので [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) により期待値と $a$ 積分を交換でき、

$$
\begin{aligned}
E\int_0^{\tau_b}g(B_s)\,ds
&=
\int_{\mathbb R}
g(a)E[L_{\tau_b}^a]\,da\\
&=
\int_{-b}^b
g(a)(b-|a|)\,da.
\end{aligned}
$$

したがって

$$
\boxed{
E\int_0^{\tau_b}g(B_s)\,ds
=
\int_{-b}^b
g(a)(b-|a|)\,da.
}
$$

kernel

$$
b-|a|
$$

は、Brown 運動が interval $(-b,b)$ を出るまで各位置へ平均的にどれだけ occupation mass を置くかを表しています。
<!-- solution-end -->

---

## 15. 次章への橋

STO8 までで Phase 2 の連続確率解析が閉じます。

$$
\boxed{
\text{quadratic variation}
\to
\text{stochastic integral}
\to
\text{Itô / Stratonovich}
\to
\text{local time / Tanaka}
}
$$

次の STO9 では

$$
dX_t=b(X_t)\,dt+\sigma(X_t)\,dB_t
$$

という stochastic differential equation 自体の解を構成します。

そこで必要になるのは、

- strong solution
- 標本路ごと uniqueness
- Picard iteration
- global / local Lipschitz
- linear growth
- explosion time
- localization

です。

STO7 の Itô calculus と STO8 の 標本路ごと correction を持った状態で、いよいよ「与えられた stochastic differential equation に process が存在するか」という問題へ進みます。
