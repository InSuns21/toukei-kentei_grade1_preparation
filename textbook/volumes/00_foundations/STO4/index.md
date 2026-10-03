# STO4 ブラウン運動・Wiener 測度・到達時刻・強マルコフ性

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[停止時刻](../STO1/index.md#def-sto1-stopping-time)、[ガウス過程](../STO3/index.md#def-sto3-gaussian-process)、[平均関数と半正定値共分散核からのガウス過程構成](../STO3/index.md#thm-sto3-gaussian-process-existence)、[Kolmogorov--Chentsov 連続定理](../STO3/index.md#thm-sto3-kolmogorov-chentsov) を直接参照します。

STO3 では、整合的な有限次元分布から確率過程を作り、モーメント評価から連続な修正を得るところまで閉じました。

この章では、その二つを最初に本格的に使います。目標はブラウン運動を既知として計算だけを進めることではありません。

$$
\boxed{
\text{共分散 }\min(s,t)
\to
\text{ガウス有限次元分布}
\to
\text{STO3 のガウス過程構成}
\to
\text{連続な修正}
\to
\text{ブラウン運動}
}
$$

と構成し、その後

$$
\boxed{
\text{独立増分}
\to
\text{Markov}
\to
\text{強マルコフ}
\to
\text{reflection}
\to
\text{到達時刻}
\to
\text{1 次元再帰性}
}
$$

までを一つの論理線として追います。

停止時刻での反射公式を強マルコフ性より先に証明しようとすると、反射後の独立増分を暗黙に仮定してしまいます。本章ではその循環を避け、**停止時刻を右側の二進格子で近似して強マルコフ性を先に証明**してから反射公式へ進みます。

---

## 1. STO3 のガウス過程構成をブラウン運動へ特化する

ガウス過程そのものの定義と存在原理は STO3 の [ガウス過程](../STO3/index.md#def-sto3-gaussian-process) と [平均関数と半正定値共分散核からのガウス過程構成](../STO3/index.md#thm-sto3-gaussian-process-existence) を正本とします。

この章では一般論を繰り返さず、

$$
m(t)=0,
\qquad
K(s,t)=\min(s,t)
$$

というブラウン運動固有のデータが STO3 の定理の仮定を満たすことを確認し、その後に独立増分・連続性・マルコフ性というブラウン運動固有の構造を導きます。

### 例：ガウス過程だけではブラウン運動にならない

$Z\sim N(0,1)$ とし

$$
X_t=tZ
$$

と置くと、STO3 の直接例で見た通り $X$ はガウス過程です。しかし

$$
X_t-X_s=(t-s)Z
$$

なので、異なる時間区間の増分は同じ $Z$ を共有し、独立ではありません。

したがって「ガウス過程である」ことと「ブラウン運動である」ことの間には、ブラウン運動固有の共分散構造を使った独立増分の確認が必要です。

<a id="def-sto4-brownian-motion"></a>

<!-- formal-statement-start -->
> **定義（標準ブラウン運動）**  
> 実数値過程 $B=(B_t)_{t\ge0}$ が 標準ブラウン運動であるとは、次を満たすことをいう。
>
> 1. $B_0=0$ ほとんど確実に.
> 2. $0\le t_0<t_1<\cdots<t_m$ に対し、
>
$$
B_{t_1}-B_{t_0},\ldots,B_{t_m}-B_{t_{m-1}}
$$
>
> は独立である。
> 3. $0\le s<t$ に対し
>
$$
B_t-B_s\sim N(0,t-s).
$$
>
> 4. ほとんど全ての $\omega$ について $t\mapsto B_t(\omega)$ は連続である。
<!-- formal-statement-end -->

2 と 3 はそれぞれ独立増分と定常なガウス増分を表します。

---

## 2. 共分散 $\min(s,t)$ からブラウン運動を構成する

ブラウン運動の共分散は、定義から形式的に計算すると

$$
E[B_sB_t]=\min(s,t)
$$

になるはずです。逆に、この共分散を持つ centered ガウス過程を作ればブラウン運動になります。

<a id="thm-sto4-brownian-construction"></a>

<!-- formal-statement-start -->
> **定理（ブラウン運動の構成）**  
> 連続な 標準ブラウン運動は存在する。
>
> より具体的には、STO3 の [平均関数と半正定値共分散核からのガウス過程構成](../STO3/index.md#thm-sto3-gaussian-process-existence)を
>
$$
m(t)=0,
\qquad
K(s,t)=\min(s,t)
$$
>
> に適用して平均 0 のガウス過程を構成し、[Kolmogorov--Chentsov 連続定理](../STO3/index.md#thm-sto3-kolmogorov-chentsov)で連続な修正を取れば、その修正は標準ブラウン運動である。
<!-- formal-statement-end -->

### 証明の見取り図

核心は三点です。

1. $K(s,t)=\min(s,t)$ が本当に分散共分散行列を作れることを確認する。
2. ガウスでは **無相関な成分が独立**なので、互いに素な時間区間の増分どうしの共分散が 0 なら独立増分が出る。
3. ガウス増分の第4 モーメント
   $E|B_t-B_s|^4=3|t-s|^2$
   を STO3 の連続定理に入れる。

<!-- proof-start -->
### 証明

**Step 1：$K(s,t)=\min(s,t)$ は半正定値である。**

$0\le t_1<\cdots<t_m$、$a_1,\ldots,a_m\in\mathbb R$ とし、

$$
t_0=0,
\qquad
\Delta t_k=t_k-t_{k-1},
\qquad
c_k=\sum_{j=k}^m a_j
$$

と置きます。

すると

$$
\min(t_i,t_j)
=
\sum_{k=1}^{\min(i,j)}\Delta t_k
$$

なので、

$$
\begin{aligned}
\sum_{i=1}^m\sum_{j=1}^m
a_i a_j\min(t_i,t_j)
&=
\sum_{k=1}^m
\Delta t_k
\left(\sum_{i=k}^m a_i\right)
\left(\sum_{j=k}^m a_j\right)\\
&=
\sum_{k=1}^m\Delta t_k c_k^2
\ge0.
\end{aligned}
$$

従って任意の有限時刻集合で

$$
\Sigma_{ij}=\min(t_i,t_j)
$$

は分散共分散行列になれます。

**Step 2：[平均関数と半正定値共分散核からのガウス過程構成](../STO3/index.md#thm-sto3-gaussian-process-existence)を適用する。**

Step 1 により

$$
K(s,t)=\min(s,t)
$$

は対称な半正定値共分散核です。そこで STO3 の [平均関数と半正定値共分散核からのガウス過程構成](../STO3/index.md#thm-sto3-gaussian-process-existence)を

$$
m(t)=0,
\qquad
K(s,t)=\min(s,t)
$$

に適用します。

これにより、平均 0 のガウス過程 $X=(X_t)_{t\ge0}$ で

$$
E[X_sX_t]=\min(s,t)
$$

を満たすものが存在します。有限次元分布の整合性と Kolmogorov 拡張定理の証明責務は STO3 側で閉じているため、ここではブラウン運動固有の性質の導出に集中できます。

**Step 3：増分の分布を計算する。**

$0\le s<t$ なら

$$
\begin{aligned}
\operatorname{Var}(X_t-X_s)
&=
t+s-2\min(s,t)\\
&=
t-s.
\end{aligned}
$$

ガウス vector の線形結合もガウスなので

$$
X_t-X_s\sim N(0,t-s).
$$

**Step 4：disjoint increments は独立。**

$0\le r<s\le u<v$ とすると

$$
\begin{aligned}
\operatorname{Cov}(X_s-X_r,X_v-X_u)
&=
\min(s,v)-\min(s,u)\\
&\quad-\min(r,v)+\min(r,u)\\
&=
s-s-r+r\\
&=0.
\end{aligned}
$$

複数の互いに交わらない区間の増分を同時に並べてもガウス vector です。その共分散 matrix は対角なので、成分は独立です。

従って $X$ は独立増分を持ちます。

**Step 5：連続な修正を取る。**

$Z\sim N(0,\sigma^2)$ なら

$$
E[Z^4]=3\sigma^4.
$$

従って

$$
E|X_t-X_s|^4
=
3|t-s|^2.
$$

これは STO3 の連続定理で

$$
\alpha=4,
\qquad
1+\beta=2,
\qquad
\beta=1
$$

に対応します。

よって $X$ には、任意の

$$
0<\gamma<\frac{\beta}{\alpha}
=
\frac14
$$

について compact 時間区間上で $\gamma$-Hölder continuous な修正 $B$ が存在します。

修正は各固定時刻で元の過程とほとんど確実に一致するため、有限次元分布は変わりません。したがって $B$ も centered ガウス過程で共分散 $\min(s,t)$ を持ち、Step 3, 4 の増分法則と independence を保ちます。

最後に

$$
\operatorname{Var}(B_0)=0
$$

なので $B_0=0$ ほとんど確実にです。

以上より $B$ は 標準ブラウン運動です。
<!-- proof-end -->

<!-- definition-example-start: def-sto4-brownian-motion -->
### 直接例：構成した過程でブラウン運動の4条件を照合する

**定義の確認**

上の定理で得た $B$ は

- $B_0=0$ ほとんど確実に,
- disjoint increments が jointly ガウスかつ共分散 0 なので独立,
- $B_t-B_s\sim N(0,t-s)$,
- 連続な修正を選んだので標本路がほとんど確実に連続,

を全て満たします。

ここで「ガウス過程を作れた」と「連続な標本路を選べた」は別の仕事です。STO3 の二つの定理を別々に使ったことが重要です。
<!-- definition-example-end -->

---

## 3. Brown 運動の法を経路空間上の測度として見る

ここまでの Brown 運動は、ある確率空間 $(\Omega,\mathcal F,P)$ 上の確率過程

$$
B=(B_t)_{0\le t\le T}
$$

として作りました。しかし後続の経路空間の弱収束や Malliavin 解析では、個々の $B_t$ よりも

$$
\omega\longmapsto
\bigl(t\longmapsto B_t(\omega)\bigr)
$$

という **一本の標本路全体**を一つの確率変数として扱います。

そこで視点を

$$
\boxed{
\text{確率空間上の Brown 運動}
\longrightarrow
\text{連続経路空間上の確率測度}
}
$$

へ切り替えます。

STO3 の Kolmogorov 拡張定理が最初に作った標準経路空間は $\mathbb R^{[0,T]}$ でした。そこには不連続な関数も大量に含まれます。Brown 運動では STO3 の連続定理により連続な修正を選べるので、今度は確率質量を連続経路だけからなる空間へ移せます。

### 3.1 連続で原点から出発する経路を標本点にする

有限時間 $T>0$ を固定します。

<a id="def-sto4-zero-start-path-space"></a>

<!-- formal-statement-start -->
> **定義（原点始点連続経路空間）**  
> 
> $$
> C_0([0,T])
> =
> \{x\in C([0,T]):x(0)=0\}
> $$
>
> と置き、sup 距離
>
> $$
> d_\infty(x,y)
> =
> \|x-y\|_\infty
> =
> \sup_{0\le t\le T}|x(t)-y(t)|
> $$
>
> を入れる。
>
> 各 $t\in[0,T]$ に対し
>
> $$
> e_t:C_0([0,T])\to\mathbb R,
> \qquad
> e_t(x)=x(t)
> $$
>
> を **座標評価写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto4-zero-start-path-space -->
### 直接例：二つの経路の距離と座標評価

**定義の確認**

$T=1$ とし、

$$
x(t)=t,
\qquad
y(t)=t^2
$$

とします。どちらも $x(0)=y(0)=0$ を満たすので $C_0([0,1])$ の元です。

また

$$
d_\infty(x,y)
=
\sup_{0\le t\le1}(t-t^2)
=
\frac14.
$$

一方、固定した $s\in[0,1]$ について

$$
|e_s(x)-e_s(y)|
=
|x(s)-y(s)|
\le
\|x-y\|_\infty.
$$

したがって $e_s$ は 1-Lipschitz、特に連続です。
<!-- definition-example-end -->

経路空間に確率測度を置くには、どの集合を可測とするかも必要です。sup 距離が作る Borel $\sigma$ 代数を $\mathcal B(C_0([0,T]))$ と書きます。

ここで重要なのは、この Borel $\sigma$ 代数が「全ての時刻の座標を観測して得られる情報」と一致することです。これにより、経路全体の可測性を各時刻の確率変数の可測性へ還元できます。

<a id="lem-sto4-path-borel-coordinates"></a>

<!-- formal-statement-start -->
> **補題（連続経路空間の Borel $\sigma$ 代数は座標評価で生成される）**  
> $D=\mathbb Q\cap[0,T]$ とする。このとき
>
> $$
> \boxed{
> \mathcal B(C_0([0,T]))
> =
> \sigma(e_q:q\in D)
> =
> \sigma(e_t:0\le t\le T).
> }
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず各 $e_t$ は 1-Lipschitz なので連続です。従って

$$
\sigma(e_t:0\le t\le T)
\subset
\mathcal B(C_0([0,T])).
$$

特に

$$
\sigma(e_q:q\in D)
\subset
\sigma(e_t:0\le t\le T).
$$

逆向きを示します。

$x,y\in C_0([0,T])$ なら $t\mapsto |x(t)-y(t)|$ は連続です。$D$ は $[0,T]$ に稠密なので、

$$
\|x-y\|_\infty
=
\sup_{q\in D}|x(q)-y(q)|.
$$

したがって固定した $x\in C_0([0,T])$ と $r>0$ に対する開球

$$
U(x,r)
=
\{y:\|x-y\|_\infty<r\}
$$

は

$$
U(x,r)
=
\bigcup_{\substack{n\ge1\\1/n<r}}
\bigcap_{q\in D}
\left\{
y:
|e_q(y)-x(q)|
\le
r-\frac1n
\right\}
$$

と書けます。右辺は可算回の和・共通部分だけで作られているので

$$
U(x,r)\in\sigma(e_q:q\in D).
$$

残るのは「全ての開集合が可算個の開球の和で書ける」ことです。

$C_0([0,T])$ では、区分線形関数で

- 端点 $0,T$ と内部の有理分点からなる有限分割を使い、
- 各分点での値が有理数（始点では 0）

であるもの全体が可算です。任意の連続関数は一様連続なので、十分細かい、内部分点が有理数である分割を取り、その分点での値を有理数で近似して線形補間すれば sup 距離で任意に近似できます。

従って $C_0([0,T])$ は可分です。

可分距離空間では任意の開集合は可算基底に属する開球の可算和として書けるため、全ての開集合が $\sigma(e_q:q\in D)$ に属します。よって

$$
\mathcal B(C_0([0,T]))
\subset
\sigma(e_q:q\in D).
$$

以上から三つの $\sigma$ 代数は一致します。
<!-- proof-end -->

### 3.2 Brown 運動の経路法が Wiener 測度である

いま、前節で構成した標準 Brown 運動 $B$ を $[0,T]$ に制限します。

STO3 の連続修正の構成では、確率 1 の事象上で標本路を連続に選べます。例外零集合上では経路全体を恒等的に 0 と再定義しておけば、

$$
\mathbf B:\Omega\to C_0([0,T]),
\qquad
\mathbf B(\omega)(t)=B_t(\omega)
$$

を $C_0([0,T])$ 値確率変数として扱えます。

実際、任意の $q\in D$ について

$$
e_q\circ\mathbf B=B_q
$$

は $\mathcal F$-可測です。直前の補題から $\mathcal B(C_0([0,T]))$ は $(e_q)_{q\in D}$ で生成されるので、$\mathbf B$ 自身が可測です。

<a id="def-sto4-wiener-measure"></a>

<!-- formal-statement-start -->
> **定義（Wiener 測度と古典 Wiener 空間）**  
> 標準 Brown 運動 $B$ の連続経路写像
>
> $$
> \mathbf B:\Omega\to C_0([0,T])
> $$
>
> による押し出し測度
>
> $$
> \boxed{
> W_T
> =
> P\circ\mathbf B^{-1}
> }
> $$
>
> を $[0,T]$ 上の **Wiener 測度（Wiener measure）**という。
>
> 三つ組
>
> $$
> \bigl(
> C_0([0,T]),
> \mathcal B(C_0([0,T])),
> W_T
> \bigr)
> $$
>
> を **古典 Wiener 空間（classical Wiener space）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto4-wiener-measure -->
### 直接例：円筒事象の Wiener 測度を有限次元正規分布へ戻す

**定義の確認**

$0<t_1<t_2\le T$ とし、

$$
A
=
\{x\in C_0([0,T]):x(t_1)\le a,\ x(t_2)\le b\}
$$

とします。

これは

$$
A
=
(e_{t_1},e_{t_2})^{-1}
\bigl((-\infty,a]\times(-\infty,b]\bigr)
$$

という円筒事象です。

Wiener 測度の定義から

$$
\begin{aligned}
W_T(A)
&=
P(\mathbf B\in A)\\
&=
P(B_{t_1}\le a,\ B_{t_2}\le b).
\end{aligned}
$$

右辺は平均 0、分散共分散行列

$$
\Sigma
=
\begin{pmatrix}
t_1 & t_1\\
t_1 & t_2
\end{pmatrix}
$$

を持つ二変量正規分布の確率です。

この例が示しているのは、Wiener 測度が新しい有限次元分布を持ち込むのではなく、Brown 運動の全ての有限次元分布を **一つの経路空間上の測度へまとめたもの**だということです。
<!-- definition-example-end -->

<a id="thm-sto4-wiener-coordinate-brownian"></a>

<!-- formal-statement-start -->
> **定理（Wiener 測度の座標過程と一意性）**  
> 古典 Wiener 空間上で
>
> $$
> X_t(x)=e_t(x)=x(t),
> \qquad 0\le t\le T
> $$
>
> と置く。
>
> 1. $X=(X_t)_{0\le t\le T}$ は $W_T$ のもとで標準 Brown 運動である。
> 2. $\mu$ が $C_0([0,T])$ 上の確率測度で、座標過程 $(e_t)$ が $\mu$ のもとで標準 Brown 運動なら
>
> $$
> \mu=W_T.
> $$
>
> 従って Wiener 測度は、元の Brown 運動を置いた確率空間の選び方によらず一意に定まる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**1. 座標過程の有限次元分布を確認する。**

任意の

$$
0\le t_1<\cdots<t_m\le T
$$

と Borel 集合 $A\subset\mathbb R^m$ に対し、

$$
\begin{aligned}
&W_T\bigl(
(X_{t_1},\ldots,X_{t_m})\in A
\bigr)\\
&=
W_T\bigl(
(e_{t_1},\ldots,e_{t_m})\in A
\bigr)\\
&=
P\bigl(
(B_{t_1},\ldots,B_{t_m})\in A
\bigr).
\end{aligned}
$$

したがって座標過程 $X$ の全ての有限次元分布は $B$ と同じです。

特に $X_0=0$、独立定常ガウス増分を持ちます。また標本点 $x$ 自体が $C_0([0,T])$ の元なので

$$
t\mapsto X_t(x)=x(t)
$$

は **全ての標本点で**連続です。

従って $X$ は $W_T$ のもとで標準 Brown 運動です。

**2. 一意性を示す。**

$\mu$ のもとで座標過程が標準 Brown 運動なら、任意の有限時刻 $t_1,\ldots,t_m$ と Borel 集合 $A\subset\mathbb R^m$ に対し

$$
\mu\left(
(e_{t_1},\ldots,e_{t_m})^{-1}(A)
\right)
$$

は Brown 運動の有限次元分布によって決まります。

$W_T$ も同じ有限次元分布を持つので、$\mu$ と $W_T$ は全ての円筒事象上で一致します。

円筒事象は $\pi$-system をなし、前の補題から

$$
\sigma(e_t:0\le t\le T)
=
\mathcal B(C_0([0,T]))
$$

を生成します。

従って $\pi$-$\lambda$ 定理により

$$
\mu=W_T
$$

です。
<!-- proof-end -->

この定理により、

$$
\boxed{
\text{Brown 運動}
\quad\Longleftrightarrow\quad
\text{Wiener 測度の座標過程}
}
$$

という二つの見方を自由に往復できます。

STO3A では $C([0,1])$ 上の確率測度の弱収束として Donsker 不変原理を扱います。その極限測度が、始点 0 に集中するこの Wiener 測度です。さらに確率解析 II の Malliavin 解析では、古典 Wiener 空間そのものを解析対象として使います。

## 4. スケーリングとブラウンフィルトレーション

ブラウン運動では時間 $t$ の分散が $t$ なので、時間を $c$ 倍すると典型的な大きさは $\sqrt c$ 倍になります。したがって時間だけを伸ばした $B_{ct}$ は同じブラウン運動の尺度にはなりません。

時間を $c$ 倍すると同時に空間を $1/\sqrt c$ 倍すれば、増分の分散を元の $t-s$ に戻せます。次の命題は、この補正が分散だけでなく独立増分と連続性も保つことを確認します。

<a id="prop-sto4-brownian-scaling"></a>

<!-- formal-statement-start -->
> **命題（ブラウンスケーリング）**  
> $B$ を 標準ブラウン運動、$c>0$ とする。このとき
>
$$
\widetilde B_t
=
\frac{1}{\sqrt c}B_{ct},
\qquad t\ge0
$$
>
> も 標準ブラウン運動である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\widetilde B_0=0$ で、標本路の連続性は $B$ から従います。

$0\le s<t$ に対し

$$
\widetilde B_t-\widetilde B_s
=
\frac1{\sqrt c}(B_{ct}-B_{cs})
$$

なので

$$
\widetilde B_t-\widetilde B_s
\sim
N\left(0,\frac{c(t-s)}c\right)
=
N(0,t-s).
$$

また disjoint time intervals は $t\mapsto ct$ で disjoint intervals に移るため、増分の独立性も保たれます。
<!-- proof-end -->

ブラウン運動の将来を「現在までに観測した情報」のもとで記述するには、単に各時刻の確率変数 $B_t$ を並べるだけでは足りません。時刻 $t$ までに観測可能な全ての事象を一つの $\sigma$ 代数へまとめておく必要があります。

ここでは $0\le s\le t$ の値から生成される最小の情報を使います。これにより「未来増分が過去全体と独立」という主張を条件付き期待値の形で書けるようになります。

<a id="def-sto4-brownian-filtration"></a>

<!-- formal-statement-start -->
> **定義（ブラウン運動の自然なフィルトレーション）**  
> ブラウン運動 $B$ に対し
>
$$
\mathcal F_t^B
=
\sigma(B_s:0\le s\le t)
$$
>
> を **natural フィルトレーション** という。
>
> null set を補い、必要に応じて右連続化したフィルトレーションを stochastic calculus では usual augmentation として用いる。本章の強マルコフ性の核心証明では、情報の出所を明示するためまず raw natural フィルトレーション $(\mathcal F_t^B)$ で議論する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto4-brownian-filtration -->
### 直接例：過去の事象と未来増分を分ける

**定義の確認**

事象

$$
A=\{B_{1/2}>0,\ B_1<1\}
$$

は $B_s$ の $s\le1$ の値だけで判定できるので

$$
A\in\mathcal F_1^B.
$$

一方、

$$
B_2-B_1
$$

は interval $(1,2]$ の増分であり、ブラウン運動の独立増分から $\mathcal F_1^B$ と独立です。

実際、任意の有限個の時刻 $0\le r_1<\cdots<r_m\le1$ に対し

$$
(B_{r_1},\ldots,B_{r_m},B_2-B_1)
$$

は同時ガウスで、各 $j$ について

$$
\operatorname{Cov}(B_{r_j},B_2-B_1)
=
r_j-r_j
=
0.
$$

従って未来増分は任意の有限個の過去値と独立です。有限個の過去値で作る cylinder event は $\mathcal F_1^B$ を生成するので、$\pi$-$\lambda$ 論法で $B_2-B_1$ は $\mathcal F_1^B$ 全体と独立になります。
<!-- definition-example-end -->

---

## 5. 決定論的時刻ではマルコフ性は独立増分そのもの

独立増分の定義が直接与えるのは、互いに交わらない有限個の時間区間に対応する増分の独立性です。しかし Markov 性で必要なのは、未来増分が時刻 $s$ までの **情報全体** $\mathcal F_s^B$ と独立であることです。

そこでまず任意の有限個の過去値との同時ガウス性と共分散 0 を確認し、そこから cylinder event を通じて $\mathcal F_s^B$ 全体へ独立性を拡張します。これができれば、$B_{s+t}=B_s+(B_{s+t}-B_s)$ と分解して条件付き期待値を計算できます。

<a id="thm-sto4-brownian-markov"></a>

<!-- formal-statement-start -->
> **定理（ブラウン運動のマルコフ性）**  
> $B$ を 標準ブラウン運動、$(\mathcal F_t^B)$ を natural フィルトレーションとする。
>
> 任意の $s,t\ge0$ に対し
>
$$
B_{s+t}-B_s
$$
>
> は $\mathcal F_s^B$ と独立で、$N(0,t)$ に従う。
>
> 従って任意の有界 Borel function $f:\mathbb R\to\mathbb R$ について
>
$$
E[f(B_{s+t})\mid\mathcal F_s^B]
=
\int_{\mathbb R}
f(B_s+y)
\frac{e^{-y^2/(2t)}}{\sqrt{2\pi t}}\,dy
$$
>
> がほとんど確実に成り立つ。ただし $t=0$ では右辺を $f(B_s)$ と読む。
<!-- formal-statement-end -->

### 証明の見取り図

条件付き期待値の中で

$$
B_{s+t}=B_s+(B_{s+t}-B_s)
$$

と分けます。

$B_s$ は現在情報 $\mathcal F_s^B$ に含まれ、未来増分だけが独立な新しいガウス雑音です。

<!-- proof-start -->
### 証明

まず $0\le r_1<\cdots<r_m\le s$ とします。

vector

$$
(B_{r_1},\ldots,B_{r_m},B_{s+t}-B_s)
$$

はガウスです。

各 $r_j\le s$ について

$$
\begin{aligned}
\operatorname{Cov}(B_{r_j},B_{s+t}-B_s)
&=
\min(r_j,s+t)-\min(r_j,s)\\
&=
r_j-r_j
=0.
\end{aligned}
$$

従って $B_{s+t}-B_s$ は任意の有限個の過去値と独立です。

より具体的には、有限個の時刻 $r_1,\ldots,r_m\le s$ と Borel 集合 $C\subset\mathbb R^m$ から作る

$$
A
=
\{(B_{r_1},\ldots,B_{r_m})\in C\}
$$

は $\mathcal F_s^B$ の cylinder event であり、上の有限次元独立性から $A$ と $B_{s+t}-B_s$ は独立です。これらの cylinder event は $\pi$-system をなし、$\mathcal F_s^B$ を生成します。

したがって、$B_{s+t}-B_s$ と独立な事象全体が $\lambda$-system をなすことと $\pi$-$\lambda$ 定理から、未来増分は $\mathcal F_s^B$ 全体と独立です。

あとは $Y=B_{s+t}-B_s\sim N(0,t)$ と置けば、$Y$ は $\mathcal F_s^B$ と独立なので

$$
E[f(B_s+Y)\mid\mathcal F_s^B]
=
g(B_s),
$$

ただし

$$
g(x)=E[f(x+Y)]
$$

です。ガウス density を書けば主張の積分表示になります。
<!-- proof-end -->

---

## 6. 停止時刻へ時刻を置き換える：強マルコフ性

決定論的時刻 $s$ なら、未来増分は「$s$ より前」と disjoint だから独立でした。

しかし停止時刻 $\tau$ は random です。

単に

$$
B_{\tau+t}-B_\tau
$$

を「未来の増分だから独立」と言うだけでは証明になりません。$\tau$ 自体が過去の標本路から選ばれているからです。

ここで STO1 の停止時刻と $\mathcal F_\tau$ が働きます。

<a id="thm-sto4-brownian-strong-markov"></a>

<!-- formal-statement-start -->
> **定理（ブラウン運動の強マルコフ性）**  
> $B$ を 標準ブラウン運動、$(\mathcal F_t^B)$ を natural フィルトレーションとし、$\tau$ をほとんど確実に finite な停止時刻とする。
>
> このとき
>
$$
W_t
=
B_{\tau+t}-B_\tau,
\qquad t\ge0
$$
>
> は 標準ブラウン運動であり、$\mathcal F_\tau^B$ と独立である。
>
> 特に有界 Borel function $f$ に対し
>
$$
E[f(B_{\tau+t})\mid\mathcal F_\tau^B]
=
\int_{\mathbb R}
f(B_\tau+y)
\frac{e^{-y^2/(2t)}}{\sqrt{2\pi t}}\,dy
$$
>
> ほとんど確実に.
<!-- formal-statement-end -->

### 証明の見取り図

random time を直接扱わず、

$$
\tau_n
=
2^{-n}\left\lceil2^n\tau\right\rceil
$$

で右側の二進格子へ丸めます。

すると

$$
\tau_n\downarrow\tau.
$$

各 $\tau_n$ は countably many 決定論的 times しか取らないので、その値ごとに ordinary 独立増分を使えます。

最後にブラウン標本路の連続性で

$$
B_{\tau_n+t}-B_{\tau_n}
\to
B_{\tau+t}-B_\tau
$$

とし、極限へ移します。

この「**離散化して決定論的-time の独立性を使い、標本路の連続性で random time へ戻す**」のが強マルコフ性の核心です。

<!-- proof-start -->
### 証明

#### Step 1：二進近似は停止時刻

$\delta_n=2^{-n}$ と書き

$$
\tau_n
=
\delta_n\lceil\tau/\delta_n\rceil
$$

とします。

$\tau_n$ は $\{0,\delta_n,2\delta_n,\ldots\}$ に値を取り、

$$
\tau\le\tau_n<\tau+\delta_n
$$

なので $\tau_n\downarrow\tau$ です。

また

$$
\{\tau_n=k\delta_n\}
=
\{(k-1)\delta_n<\tau\le k\delta_n\}
$$

は $\mathcal F_{k\delta_n}^B$ に属します。従って $\tau_n$ は停止時刻です。

#### Step 2：可算値停止時刻では主張が成り立つ

$\sigma$ が $0,\delta,2\delta,\ldots$ のみに値を取る停止時刻とします。

任意の

$$
A\in\mathcal F_\sigma^B
$$

と、$0\le t_1<\cdots<t_m$、有界 Borel function
$g:\mathbb R^m\to\mathbb R$ を取ります。

$$
A_k
=
A\cap\{\sigma=k\delta\}
$$

と置くと、[停止時刻までの sigma-field の定義](../STO1/index.md#def-sto1-stopping-sigma-field)から

$$
A_k\in\mathcal F_{k\delta}^B.
$$

決定論的-time 独立増分により

$$
\left(
B_{k\delta+t_1}-B_{k\delta},
\ldots,
B_{k\delta+t_m}-B_{k\delta}
\right)
$$

は $\mathcal F_{k\delta}^B$ と独立で、法則は

$$
(B_{t_1},\ldots,B_{t_m})
$$

と同じです。

したがって

$$
\begin{aligned}
&E\left[
1_{A_k}
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A_k)
E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

$k$ について足し合わせると

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A)
E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

です。

従って shifted finite-dimensional vector は $\mathcal F_\sigma^B$ と独立で、元のブラウン運動と同じ finite-dimensional 法則を持ちます。

#### Step 3：$\tau_n\downarrow\tau$ の極限を取る

$A\in\mathcal F_\tau^B$ とします。

$\tau\le\tau_n$ なので STO1 の停止時刻 sigma-field の単調性から

$$
\mathcal F_\tau^B
\subset
\mathcal F_{\tau_n}^B.
$$

従って Step 2 を $\sigma=\tau_n$ に適用でき、

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\tau_n+t_1}-B_{\tau_n},
\ldots,
B_{\tau_n+t_m}-B_{\tau_n}
)
\right]\\
&=
P(A)
E[g(B_{t_1},\ldots,B_{t_m})]
\end{aligned}
$$

を得ます。

まず $g$ を有界 continuous とします。

ブラウン標本路の連続性と $\tau_n\downarrow\tau$ から各 $j$ について

$$
B_{\tau_n+t_j}-B_{\tau_n}
\to
B_{\tau+t_j}-B_\tau
$$

ほとんど確実に.

有界 convergence theorem により

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\tau+t_1}-B_\tau,
\ldots,
B_{\tau+t_m}-B_\tau
)
\right]\\
&=
P(A)
E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

有界 continuous functions から有界 Borel functions への拡張は monotone class theorem で行えます。

従って全ての shifted finite-dimensional vectors は $\mathcal F_\tau^B$ と独立で、ブラウン finite-dimensional laws を持ちます。

さらに shift 後の標本路

$$
t\mapsto B_{\tau+t}-B_\tau
$$

は元の標本路の連続性から連続です。

よって $W_t=B_{\tau+t}-B_\tau$ は 標準ブラウン運動です。

最後に、有限個の時刻 $t_1,\ldots,t_m$ と Borel 集合 $C\subset\mathbb R^m$ から作る

$$
\{(W_{t_1},\ldots,W_{t_m})\in C\}
$$

は全て $\mathcal F_\tau^B$ と独立です。これらの cylinder event は $\sigma(W_t:t\ge0)$ を生成します。

ここで「$\mathcal F_\tau^B$ と独立である $W$ 側の事象全体」を集めると、補集合と互いに素な可算和で閉じています。また上の有限次元 cylinder event を全て含みます。したがって cylinder event から生成される

$$
\sigma(W_t:t\ge0)
$$

の全事象まで独立性が拡張され、$\sigma(W_t:t\ge0)$ 全体が $\mathcal F_\tau^B$ と独立です。
<!-- proof-end -->

全体の確率空間の $P$-零集合に含まれる集合を全て加えた完備化を

$$
\mathcal F_t^{B,c}
=
\sigma\!\left(
\mathcal F_t^B
\cup
\{A:\ A\subseteq N\text{ for some }N\in\mathcal F,\ P(N)=0\}
\right)
$$

と書きます。この完備化に対しても同じ強マルコフ結論が成り立ちます。実際、raw な $\mathcal F_t^B$ の事象へ零集合の部分集合を加えても独立性の等式は変わらず、上の離散化証明をそのまま繰り返せます。

以下の到達時刻では、標本路連続性の例外零集合を吸収するため $\mathcal F_t^{B,c}$ を使います。

---

## 7. 到達時刻は停止時刻である

連続時間では「初めて水準 $a$ に着く」という時刻は非可算個の時刻から選ばれるため、定義しただけでは停止時刻性は自動ではありません。必要なのは、時刻 $t$ までに到達したかどうかを $t$ までの観測だけで判定できることです。

ブラウン標本路は確率 1 で連続なので、到達の有無は $[0,t]$ 上の最大値と結びつきます。さらに最大値は有理時刻の可算集合で近似できるため、停止判定を可測事象へ落とせます。例外的に連続性が壊れる零集合は、直前で導入した完備化 $\mathcal F_t^{B,c}$ に吸収します。

<a id="def-sto4-hitting-time"></a>

<!-- formal-statement-start -->
> **定義（ブラウン到達時刻）**  
> $a\in\mathbb R$ に対し
>
$$
\tau_a
=
\inf\{t\ge0:B_t=a\}
$$
>
> を水準 $a$ の **到達時刻** とする。集合が空なら $\tau_a=\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto4-hitting-time -->
### 直接例：連続な標本路から停止時刻性を確認する

**定義の確認**

$a>0$ とし

$$
M_t=\sup_{0\le s\le t}B_s
$$

と置きます。

標本路が連続である確率 1 の事象を $\Omega_c$ とします。$\omega\in\Omega_c$ では

$$
\{\tau_a\le t\}
=
\{M_t\ge a\},
\qquad
M_t
=
\sup_{q\in\mathbb Q\cap[0,t]}B_q.
$$

したがって raw なフィルトレーションで測れる事象

$$
R_t
:=
\bigcap_{n=1}^\infty
\bigcup_{q\in\mathbb Q\cap[0,t]}
\{B_q>a-1/n\}
\in
\mathcal F_t^B
$$

を取ると、$\Omega_c$ 上では

$$
\{\tau_a\le t\}=R_t.
$$

よって対称差は

$$
\{\tau_a\le t\}\triangle R_t
\subseteq
\Omega_c^c.
$$

右辺は確率 0 なので、完備化 $\mathcal F_t^{B,c}$ では $\{\tau_a\le t\}\in\mathcal F_t^{B,c}$ です。従って $\tau_a$ は完備化された自然フィルトレーションに関する停止時刻です。
<!-- definition-example-end -->

---

## 8. 強マルコフから反射公式を得る

最大値 $M_T$ の分布は経路全体に依存するため、終点 $B_T\sim N(0,T)$ の分布だけからは直接計算できません。そこで「水準 $a$ に到達した後だけ標本路を反射する」操作を使い、最大値を含む経路事象を終点だけの事象へ変換します。

この操作が確率法則を保つ核心が強マルコフ性です。到達時刻より後の増分は過去と独立な新しいブラウン運動であり、その符号を反転しても法則が変わりません。

<a id="thm-sto4-reflection-principle"></a>

<!-- formal-statement-start -->
> **定理（反射原理）**  
> $B$ を 標準ブラウン運動、
>
$$
M_T=\sup_{0\le s\le T}B_s
$$
>
> とする。$a>0$、$b\le a$ に対し
>
$$
P(M_T\ge a,\ B_T\le b)
=
P(B_T\ge 2a-b).
$$
>
> 特に
>
$$
P(M_T\ge a)
=
2P(B_T\ge a)
=
2\left(
1-\Phi\left(\frac{a}{\sqrt T}\right)
\right),
$$
>
> ただし $\Phi$ は $N(0,1)$ の累積分布関数である。
<!-- formal-statement-end -->

### 証明の見取り図

水準 $a$ へ初めて到達した時点で、その後の増分の符号を反転します。

強マルコフ性により、停止時刻の後ろは過去と独立なブラウン運動です。ブラウン運動は $W$ と $-W$ が同じ法則を持つので、反射後の過程全体もブラウン法則を持ちます。

<!-- proof-start -->
### 証明

$\tau_a$ を水準 $a$ の到達時刻とし、

$$
\sigma=\tau_a\wedge T
$$

と置きます。前節で $\tau_a$ が $(\mathcal F_t^{B,c})$ に関する停止時刻であることを確認したので、$\sigma$ も同じ完備化フィルトレーションに関する有界停止時刻です。以下では、上で確認した完備化版の強マルコフ性を $\sigma$ に適用します。

次の reflected 過程を考えます。

$$
\widetilde B_t
=
\begin{cases}
B_t, & t\le\sigma,\\
2B_\sigma-B_t, & t>\sigma.
\end{cases}
$$

完備化版の強マルコフ性から

$$
B_{\sigma+t}-B_\sigma
$$

は $\mathcal F_\sigma^{B,c}$ と独立なブラウン運動です。

その符号を反転した

$$
-(B_{\sigma+t}-B_\sigma)
$$

も同じ法則のブラウン運動なので、$\widetilde B$ も 標準ブラウン運動と同じ法則を持ちます。

event

$$
E=\{M_T\ge a,\ B_T\le b\}
$$

上では $\tau_a\le T$ なので $B_\sigma=a$ です。従って

$$
\widetilde B_T
=
2a-B_T
\ge
2a-b.
$$

逆に反射後の標本路の終点が $2a-b\ge a$ なら、連続性により反射後の標本路は時刻 $T$ までに水準 $a$ を通ります。水準 $a$ への最初の到達時刻までは反射前後の経路が一致し、その時刻以後をもう一度反射すれば元の経路へ戻ります。従ってこの反射写像は involution です。

反射写像を $R$ と書けば、経路ごとに

$$
R\left(
\{M_T\ge a,\ B_T\le b\}
\right)
=
\{B_T\ge2a-b\}.
$$

一方、強マルコフ性と符号反転対称性から

$$
R(B)\overset{d}=B.
$$

したがって、任意の可測経路事象 $A$ について $P(R(B)\in A)=P(B\in A)$ であり、上の二事象に適用すると

$$
P(M_T\ge a,\ B_T\le b)
=
P(B_T\ge2a-b).
$$

$b=a$ とすると、$P(B_T=a)=0$ なので

$$
\begin{aligned}
P(M_T\ge a)
&=
P(B_T\ge a)
+
P(M_T\ge a,B_T<a)\\
&=
2P(B_T\ge a).
\end{aligned}
$$

最後に $B_T/\sqrt T\sim N(0,1)$ を使えば表示式を得ます。
<!-- proof-end -->

---

## 9. 到達時刻の分布と無限平均

到達時刻そのものは経路から定まる確率変数ですが、

$$
\{\tau_a\le t\}
=
\left\{\sup_{0\le s\le t}B_s\ge a\right\}
$$

なので、前節の反射原理によって一時刻の正規分布へ変換できます。ここから累積分布関数を得て、微分により密度を求めます。

さらに $t\to\infty$ の極限から「いつかは到達する」ことを確認し、尾確率の積分から平均到達時間を調べます。確率 1 で有限であることと期待値が有限であることは別問題です。

<a id="thm-sto4-hitting-time-law"></a>

<!-- formal-statement-start -->
> **定理（ブラウン到達時刻の分布）**  
> $a>0$ とする。水準 $a$ の到達時刻
>
$$
\tau_a=\inf\{t\ge0:B_t=a\}
$$
>
> に対し、$t>0$ で
>
$$
P(\tau_a\le t)
=
2\left(
1-\Phi\left(\frac{a}{\sqrt t}\right)
\right).
$$
>
> 従って $\tau_a$ は $(0,\infty)$ 上で density
>
$$
f_{\tau_a}(t)
=
\frac{a}{\sqrt{2\pi t^3}}
\exp\left(-\frac{a^2}{2t}\right)
$$
>
> を持つ。また
>
$$
P(\tau_a<\infty)=1,
\qquad
E[\tau_a]=\infty.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

標本路の連続性から

$$
\{\tau_a\le t\}
=
\{M_t\ge a\}.
$$

[反射原理](#thm-sto4-reflection-principle) より

$$
P(\tau_a\le t)
=
2P(B_t\ge a)
=
2\left(
1-\Phi\left(\frac{a}{\sqrt t}\right)
\right).
$$

これを $t$ で微分します。

$$
\frac{d}{dt}
\left(
\frac{a}{\sqrt t}
\right)
=
-\frac{a}{2t^{3/2}}.
$$

標準正規 density を

$$
\phi(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2}
$$

と書けば

$$
\begin{aligned}
f_{\tau_a}(t)
&=
2\phi\left(\frac a{\sqrt t}\right)
\frac{a}{2t^{3/2}}\\
&=
\frac{a}{\sqrt{2\pi t^3}}
\exp\left(-\frac{a^2}{2t}\right).
\end{aligned}
$$

$t\to\infty$ とすると $a/\sqrt t\to0$ なので

$$
P(\tau_a<\infty)
=
\lim_{t\to\infty}P(\tau_a\le t)
=
2(1-\Phi(0))
=
1.
$$

平均については tail integral を使います。

$$
E[\tau_a]
=
\int_0^\infty P(\tau_a>t)\,dt.
$$

$t\ge a^2$ なら $x=a/\sqrt t\in(0,1]$ で、

$$
\begin{aligned}
P(\tau_a>t)
&=
2\Phi(x)-1\\
&=
2\int_0^x\phi(u)\,du\\
&\ge
2\phi(1)x\\
&=
2\phi(1)\frac a{\sqrt t}.
\end{aligned}
$$

従って

$$
E[\tau_a]
\ge
2a\phi(1)
\int_{a^2}^\infty
t^{-1/2}\,dt
=
\infty.
$$

「ほとんど確実に到達する」と「平均到達時間が有限」は全く別です。
<!-- proof-end -->

---

## 10. 1 次元ブラウン運動は全ての水準へ到達し、0へ無限回戻る

前節で得たのは「固定した一つの水準 $a$ へ確率 1 で到達する」という主張です。しかし「全ての実数水準へ同時に到達する」ことは、非可算個の確率 1 の事象をそのまま交差しても導けません。

そこでまず可算な整数水準 $\pm1,\pm2,\ldots$ だけを同時に到達させ、標本路の連続性でその間の全実数を埋めます。さらに 0 への一回の帰還ではなく無限回帰還を示すため、強マルコフ性で $+1$ と $-1$ の間を何度も再出発します。

<a id="thm-sto4-one-dimensional-recurrence"></a>

<!-- formal-statement-start -->
> **定理（1 次元ブラウン運動の全水準到達と 0 への無限回帰還）**  
> 1 次元 標準ブラウン運動 $B$ の標本路は、ほとんど確実に上にも下にも有界ではない。
>
> 従ってほとんど確実に全ての $x\in\mathbb R$ を少なくとも一度通る。
>
> さらに水準 $0$ へ無限回戻る。
<!-- formal-statement-end -->

### 証明の見取り図

各固定水準の hitting probability が 1 であることは前節で分かっています。

整数水準 $\pm1,\pm2,\ldots$ は可算個なので、それら全てを hit する確率も 1 です。従って標本路は上にも下にも有界ではありません。

無限回の return は強マルコフ性を使って $+1,-1,+1,-1,\ldots$ と交互に hit させます。

<!-- proof-start -->
### 証明

$a>0$ なら前節から

$$
P(\tau_a<\infty)=1.
$$

$-B$ もブラウン運動なので

$$
P(\tau_{-a}<\infty)=1.
$$

従って各 $n\in\mathbb N$ に対して水準 $n$ と $-n$ を hit する event は確率 1 です。

可算交叉を取れば、ほとんど確実に全ての整数 $\pm n$ を hit します。従って標本路は上にも下にも有界ではありません。

任意の $x\in\mathbb R$ に対し $n>|x|$ を取ります。連続な標本路は値 $-n$ から $n$ へ移る途中で $x$ を飛び越えられないので、ほとんど確実に全ての実数水準を hit します。

次に return を示します。

$\sigma_0=0$ とし、順に

$$
\sigma_1
=
\inf\{t\ge0:B_t=1\},
$$

$$
\sigma_2
=
\inf\{t\ge\sigma_1:B_t=-1\},
$$

$$
\sigma_3
=
\inf\{t\ge\sigma_2:B_t=1\},
$$

と交互に定めます。

$\sigma_k<\infty$ が成立したとします。強マルコフ性により、$\sigma_k$ 後の shifted 過程は新しいブラウン運動です。

現在値から次の目標水準までの距離は 2 なので、前節の hitting probability 1 から

$$
P(\sigma_{k+1}<\infty\mid\mathcal F_{\sigma_k}^B)=1.
$$

帰納的に全ての $\sigma_k$ は finite ほとんど確実にです。

各 $+1$ から $-1$、または $-1$ から $+1$ への移動の途中で連続性により水準 0 を通ります。

もし $(\sigma_k)$ が有限値 $T$ へ収束したなら、偶数番目と奇数番目の双方で $\sigma_k\to T$ なのに

$$
B_{\sigma_{2j}}\in\{-1,1\},
\qquad
B_{\sigma_{2j+1}}=-B_{\sigma_{2j}}
$$

と値が交互に $-1$ と $1$ を取ります。これは $B$ の $T$ における連続性に反します。従って

$$
\sigma_k\to\infty.
$$

よって水準 0 への return は無限回起こります。
<!-- proof-end -->

---

## 11. 短時間と長時間を入れ替える

この時間反転は後続計算の direct prerequisite ではありませんが、ブラウン共分散の自己相似性がどれほど強いかを見る代表例です。

<a id="prop-sto4-time-inversion"></a>

<!-- formal-statement-start -->
> **命題（ブラウン時間反転）**  
> $B$ を 標準ブラウン運動とし
>
$$
\widehat B_0=0,
\qquad
\widehat B_t=tB_{1/t}
\quad(t>0)
$$
>
> と置く。このとき $\widehat B$ も 標準ブラウン運動である。
<!-- formal-statement-end -->

### 証明の見取り図

$t>0$ だけならガウス共分散を計算するだけです。

唯一の問題は $t\downarrow0$ で

$$
tB_{1/t}\to0
$$

を示すことです。これは

$$
\frac{B_u}{u}\to0
\qquad(u\to\infty)
$$

と同値です。

integer times は第4 モーメントと Borel--Cantelli、integer 間は [反射原理](#thm-sto4-reflection-principle) で抑えます。

<!-- proof-start -->
### 証明

まず $s,t>0$ とします。

$\widehat B$ は $B$ の有限個の値の線形変換なのでガウス過程です。

また centered で、

$$
\begin{aligned}
E[\widehat B_s\widehat B_t]
&=
st\,
E[B_{1/s}B_{1/t}]\\
&=
st\min(1/s,1/t)\\
&=
\min(s,t).
\end{aligned}
$$

従って $(0,\infty)$ 上の finite-dimensional laws はブラウン運動と一致します。

残るのは $0$ での連続性です。

まず $B_n\sim N(0,n)$ なので

$$
E[B_n^4]=3n^2.
$$

任意の $\varepsilon>0$ に対し Markov inequality から

$$
P(|B_n|>\varepsilon n)
\le
\frac{3}{\varepsilon^4n^2}.
$$

右辺は $n$ について可算和可能なので、Borel--Cantelli lemma により

$$
\frac{B_n}{n}\to0
$$

ほとんど確実に.

次に

$$
D_n
=
\sup_{0\le u\le1}|B_{n+u}-B_n|
$$

とします。

stationary increments と [反射原理](#thm-sto4-reflection-principle) から

$$
P(D_n>x)
\le
4P(B_1>x).
$$

さらに第4 モーメントを使えば

$$
P(D_n>\varepsilon n)
\le
\frac{12}{\varepsilon^4n^4}.
$$

これも可算和可能なので

$$
\frac{D_n}{n}\to0
$$

ほとんど確実に.

$t\in[n,n+1]$ なら

$$
\frac{|B_t|}{t}
\le
\frac{|B_n|+D_n}{n}.
$$

従って

$$
\frac{B_t}{t}\to0
\qquad(t\to\infty)
$$

ほとんど確実に.

$u=1/t$ と置けば

$$
tB_{1/t}
=
\frac{B_u}{u}
\to0
\qquad(t\downarrow0).
$$

よって $\widehat B$ は $0$ でも連続です。

したがって $\widehat B$ は共分散 $\min(s,t)$ を持つ continuous centered ガウス過程であり、ブラウン運動です。
<!-- proof-end -->

---

## 12. この章で何が閉じたか

ブラウン運動について、次を同じ章の中で接続しました。

$$
\text{finite-dimensional ガウス法則}
\to
\text{existence}
\to
\text{連続な標本路}
\to
\text{Wiener 測度}
\to
\text{Markov}
\to
\text{強マルコフ}
\to
\text{reflection}
\to
\text{first passage}
\to
\text{再帰性}.
$$

特に強マルコフ性は「ブラウン運動だから成り立つ」という名前だけの事実ではなく、

$$
\boxed{
\text{停止時刻を二進格子へ丸める}
+
\text{決定論的-time 独立増分}
+
\text{標本路の連続性}
}
$$

から出てくることを確認しました。

次の STO5 では、ブラウン標本路が連続なのに通常の意味では極端に rough であることを二次変分で測ります。

---

# 演習

## Level A

### A1. 共分散 $\min(s,t)$ と独立増分

centered ガウス過程 $X$ が

$$
E[X_sX_t]=\min(s,t)
$$

を満たすとします。

$0\le t_0<t_1<t_2<t_3$ に対し、

$$
Y_1=X_{t_1}-X_{t_0},
\qquad
Y_2=X_{t_3}-X_{t_2}
$$

が独立であることを示してください。

- Level: A

<!-- solution-start -->
### 詳細解答

$(Y_1,Y_2)$ はガウス vector の線形変換なので jointly ガウスです。

従って共分散が 0 であることを示せば独立性が従います。

$$
\begin{aligned}
\operatorname{Cov}(Y_1,Y_2)
&=
E[(X_{t_1}-X_{t_0})(X_{t_3}-X_{t_2})]\\
&=
\min(t_1,t_3)-\min(t_1,t_2)\\
&\quad-\min(t_0,t_3)+\min(t_0,t_2).
\end{aligned}
$$

時刻の順序から

$$
\min(t_1,t_3)=t_1,
\quad
\min(t_1,t_2)=t_1,
$$

$$
\min(t_0,t_3)=t_0,
\quad
\min(t_0,t_2)=t_0.
$$

したがって

$$
\operatorname{Cov}(Y_1,Y_2)
=
t_1-t_1-t_0+t_0
=
0.
$$

jointly ガウスな二変量が無相関なので、$Y_1,Y_2$ は独立です。
<!-- solution-end -->

### A2. ブラウンスケーリング

$B$ を 標準ブラウン運動、$c>0$ とします。

$$
X_t=c^{-1/2}B_{ct}
$$

が 標準ブラウン運動であることを、定義の4条件を順に確認して示してください。

- Level: A

<!-- solution-start -->
### 詳細解答

まず

$$
X_0=c^{-1/2}B_0=0
$$

ほとんど確実に.

次に $0\le s<t$ に対し

$$
X_t-X_s
=
c^{-1/2}(B_{ct}-B_{cs}).
$$

ブラウン運動の増分の分布から

$$
B_{ct}-B_{cs}
\sim
N(0,c(t-s)).
$$

従って定数倍のガウス分布の分散を計算すると

$$
X_t-X_s
\sim
N(0,t-s).
$$

また disjoint intervals は $t\mapsto ct$ でも disjoint のままなので、対応する $B$ の増分が独立であることから $X$ の増分も独立です。

最後に $t\mapsto ct$ と定数倍は連続性を保つので、$B$ の連続な標本路から $X$ も連続な標本路を持ちます。

よって $X$ は 標準ブラウン運動です。
<!-- solution-end -->

### A3. 水準到達時刻は停止時刻

$a>0$ とし

$$
\tau_a=\inf\{t\ge0:B_t=a\}
$$

とします。

標本路の連続性を用いて $\tau_a$ が完備化された natural フィルトレーション $(\mathcal F_t^{B,c})$ に関する停止時刻であることを示してください。

- Level: A

<!-- solution-start -->
### 詳細解答

停止時刻であることを示すには、任意の $t\ge0$ に対し

$$
\{\tau_a\le t\}\in\mathcal F_t^{B,c}
$$

を示せば十分です。

標本路が連続である確率 1 の事象を $\Omega_c$ とします。$\omega\in\Omega_c$ では、水準 $a$ に時刻 $t$ までに到達することと最大値が $a$ 以上になることが同値です。

連続関数の上限は稠密な有理時刻だけでも同じなので、raw なフィルトレーションで測れる事象

$$
R_t
=
\bigcap_{n=1}^\infty
\bigcup_{q\in\mathbb Q\cap[0,t]}
\{B_q>a-1/n\}
\in\mathcal F_t^B
$$

を取ると

$$
\{\tau_a\le t\}\cap\Omega_c
=
R_t\cap\Omega_c.
$$

従って

$$
\{\tau_a\le t\}\triangle R_t
\subseteq
\Omega_c^c.
$$

右辺は $P$-零集合です。完備化 $\mathcal F_t^{B,c}$ は零集合の全部分集合を含むので

$$
\{\tau_a\le t\}\in\mathcal F_t^{B,c}.
$$

よって $\tau_a$ は完備化された natural フィルトレーションに関する停止時刻です。
<!-- solution-end -->

### A4. 到達時刻の累積分布関数

$a>0$ とします。

[反射原理](#thm-sto4-reflection-principle) を用いて

$$
P(\tau_a\le t)
=
2\left(
1-\Phi\left(\frac a{\sqrt t}\right)
\right)
$$

を導いてください。

- Level: A

<!-- solution-start -->
### 詳細解答

標本路の連続性により

$$
\{\tau_a\le t\}
=
\left\{
\sup_{0\le s\le t}B_s\ge a
\right\}.
$$

[反射原理](#thm-sto4-reflection-principle) から

$$
P\left(
\sup_{0\le s\le t}B_s\ge a
\right)
=
2P(B_t\ge a).
$$

一方、

$$
\frac{B_t}{\sqrt t}
\sim
N(0,1).
$$

従って

$$
P(B_t\ge a)
=
P\left(
\frac{B_t}{\sqrt t}
\ge
\frac a{\sqrt t}
\right)
=
1-\Phi\left(\frac a{\sqrt t}\right).
$$

以上を合わせれば

$$
P(\tau_a\le t)
=
2\left(
1-\Phi\left(\frac a{\sqrt t}\right)
\right).
$$
<!-- solution-end -->

### A5. Wiener 測度で円筒事象を計算する

$0<s<t\le T$ とし、$W_T$ を $C_0([0,T])$ 上の Wiener 測度とします。

$$
A
=
\{x:x(s)>0,\ x(t)-x(s)\le a\}
$$

と置きます。$W_T(A)$ を標準正規分布の累積分布関数 $\Phi$ を使って求めてください。

- Level: A

<!-- solution-start -->
### 詳細解答

古典 Wiener 空間の座標過程

$$
X_u(x)=x(u)
$$

は [Wiener 測度の座標過程と一意性](#thm-sto4-wiener-coordinate-brownian) により標準 Brown 運動です。

したがって

$$
X_s\sim N(0,s),
\qquad
X_t-X_s\sim N(0,t-s),
$$

であり、独立増分性から $X_s$ と $X_t-X_s$ は独立です。

よって

$$
\begin{aligned}
W_T(A)
&=
W_T(X_s>0,\ X_t-X_s\le a)\\
&=
W_T(X_s>0)\,
W_T(X_t-X_s\le a).
\end{aligned}
$$

対称性から

$$
W_T(X_s>0)=\frac12.
$$

また

$$
\frac{X_t-X_s}{\sqrt{t-s}}
\sim N(0,1)
$$

なので

$$
W_T(X_t-X_s\le a)
=
\Phi\left(\frac{a}{\sqrt{t-s}}\right).
$$

従って

$$
\boxed{
W_T(A)
=
\frac12
\Phi\left(\frac{a}{\sqrt{t-s}}\right)
}.
$$

経路空間上の事象でも、有限個の座標だけで決まる円筒事象なら Brown 運動の有限次元分布へ戻して計算できます。
<!-- solution-end -->

## Level B

### B1. 有限値停止時刻で強マルコフの核心を証明する

$\sigma$ が

$$
s_1<\cdots<s_r
$$

の有限個の値だけを取る停止時刻とします。

$0\le t_1<\cdots<t_m$ と有界 Borel function
$g:\mathbb R^m\to\mathbb R$ に対し、

$$
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
$$

が $\mathcal F_\sigma^B$ と独立で、その期待値が

$$
E[g(B_{t_1},\ldots,B_{t_m})]
$$

に等しいことを示してください。

- Level: B

<!-- solution-start -->
### 詳細解答

$A\in\mathcal F_\sigma^B$ を任意に取ります。

各 $k$ について

$$
A_k=A\cap\{\sigma=s_k\}
$$

と置きます。

[停止時刻までの sigma-field の定義](../STO1/index.md#def-sto1-stopping-sigma-field)から

$$
A_k\in\mathcal F_{s_k}^B.
$$

決定論的時刻 $s_k$ の後の increments

$$
(B_{s_k+t_1}-B_{s_k},\ldots,B_{s_k+t_m}-B_{s_k})
$$

は $\mathcal F_{s_k}^B$ と独立で、stationary increments により

$$
(B_{t_1},\ldots,B_{t_m})
$$

と同じ法則を持ちます。

従って

$$
\begin{aligned}
&E\left[
1_{A_k}
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A_k)E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

$k=1,\ldots,r$ について足すと

$$
\begin{aligned}
&E\left[
1_A
g(
B_{\sigma+t_1}-B_\sigma,
\ldots,
B_{\sigma+t_m}-B_\sigma
)
\right]\\
&=
P(A)E[g(B_{t_1},\ldots,B_{t_m})].
\end{aligned}
$$

これは shifted vector と $\mathcal F_\sigma^B$ の独立性を表す積分等式です。
<!-- solution-end -->

### B2. 時間反転の $t=0$ での連続性

[反射原理](#thm-sto4-reflection-principle) と Borel--Cantelli lemma を用いて

$$
\frac{B_t}{t}\to0
\qquad(t\to\infty)
$$

ほとんど確実にを示し、

$$
\widehat B_t=tB_{1/t}
$$

が $t\downarrow0$ で 0 へ収束することを導いてください。

- Level: B

<!-- solution-start -->
### 詳細解答

まず integer times を見ると

$$
E[B_n^4]=3n^2.
$$

よって Markov inequality から

$$
P(|B_n|>\varepsilon n)
\le
\frac{3}{\varepsilon^4n^2}.
$$

右辺の和は収束するので Borel--Cantelli lemma により

$$
\frac{B_n}{n}\to0
$$

ほとんど確実に.

次に

$$
D_n=\sup_{0\le u\le1}|B_{n+u}-B_n|
$$

と置きます。

stationary increments と [反射原理](#thm-sto4-reflection-principle) から

$$
P(D_n>x)
\le
P\left(\sup_{0\le u\le1}B_u>x\right)
+
P\left(\inf_{0\le u\le1}B_u<-x\right)
=
4P(B_1>x).
$$

従って第4 モーメントによる Markov inequality で

$$
P(D_n>\varepsilon n)
\le
\frac{12}{\varepsilon^4n^4}.
$$

これも可算和可能なので

$$
\frac{D_n}{n}\to0
$$

ほとんど確実に.

$t\in[n,n+1]$ なら

$$
\frac{|B_t|}{t}
\le
\frac{|B_n|+D_n}{n}.
$$

右辺は 0 へ収束するので

$$
\frac{B_t}{t}\to0.
$$

最後に $u=1/t$ と置けば

$$
tB_{1/t}
=
\frac{B_u}{u}.
$$

$t\downarrow0$ は $u\to\infty$ に対応するため

$$
tB_{1/t}\to0
$$

ほとんど確実にです。
<!-- solution-end -->

### B3. 0 へ無限回戻ることを強マルコフから示す

$+1,-1,+1,-1,\ldots$ を交互に hit する停止操作 times を構成し、ブラウン運動が水準 0 へほとんど確実に無限回戻ることを示してください。

- Level: B

<!-- solution-start -->
### 詳細解答

まず

$$
\sigma_1=\inf\{t\ge0:B_t=1\}
$$

と置きます。

到達時刻 theorem から

$$
P(\sigma_1<\infty)=1.
$$

次に

$$
\sigma_2
=
\inf\{t\ge\sigma_1:B_t=-1\}.
$$

$\sigma_1<\infty$ 上で強マルコフ性を使うと

$$
W_t=B_{\sigma_1+t}-B_{\sigma_1}
$$

は新しいブラウン運動です。

$B_{\sigma_1}=1$ なので、$B$ が $-1$ へ到達することは $W$ が $-2$ へ到達することと同値です。

$-W$ もブラウン運動であり水準 2 の hitting probability は 1 なので

$$
P(\sigma_2<\infty\mid\mathcal F_{\sigma_1}^B)=1.
$$

同様に、$\sigma_3$ を $\sigma_2$ 後の $+1$ 到達時刻、以後交互に定義すると、帰納的に全ての $\sigma_n$ が finite ほとんど確実にです。

連続な標本路が $+1$ と $-1$ の間を移るたびに、値 0 を飛び越えられないので水準 0 を通ります。

もし $\sigma_n$ が有限時刻 $T$ に集積すれば、単調性から $\sigma_n\to T$ です。しかし $B_{\sigma_n}$ は $1,-1,1,-1,\ldots$ と交互に値を取るため、$B$ の $T$ における連続性に反します。

従って

$$
\sigma_n\to\infty
$$

であり、その途中に水準 0 への return が無限個存在します。
<!-- solution-end -->

### B4. Wiener 測度の一意性を円筒事象から証明する

$\mu$ と $\nu$ を $C_0([0,T])$ 上の二つの確率測度とします。

任意の $m\ge1$、$0\le t_1<\cdots<t_m\le T$ について

$$
\mu\circ(e_{t_1},\ldots,e_{t_m})^{-1}
=
\nu\circ(e_{t_1},\ldots,e_{t_m})^{-1}
$$

が成り立つとします。

$\mu=\nu$ を示してください。

- Level: B

<!-- solution-start -->
### 詳細解答

有限個の時刻 $t_1,\ldots,t_m$ と Borel 集合 $A\subset\mathbb R^m$ に対する円筒集合

$$
C
=
(e_{t_1},\ldots,e_{t_m})^{-1}(A)
$$

を考えます。

仮定から

$$
\mu(C)
=
\nu(C).
$$

したがって $\mu$ と $\nu$ は全ての有限次元円筒集合上で一致します。

この円筒集合族を $\mathcal C$ とします。

二つの円筒集合の共通部分は、使っている時刻を全部まとめれば再び有限次元円筒集合になるので、$\mathcal C$ は $\pi$-system です。

また [連続経路空間の Borel $\sigma$ 代数は座標評価で生成される](#lem-sto4-path-borel-coordinates) から

$$
\sigma(\mathcal C)
=
\mathcal B(C_0([0,T])).
$$

ここで

$$
\mathcal L
=
\{A\in\mathcal B(C_0([0,T])):\mu(A)=\nu(A)\}
$$

と置きます。

$\mu,\nu$ はともに確率測度なので $\mathcal L$ は全体集合を含み、補集合と互いに素な可算和について閉じる $\lambda$-system です。また $\mathcal C\subset\mathcal L$ です。

従って $\pi$-$\lambda$ 定理から

$$
\mathcal B(C_0([0,T]))
=
\sigma(\mathcal C)
\subset
\mathcal L.
$$

よって全ての Borel 集合 $A$ について $\mu(A)=\nu(A)$、すなわち

$$
\boxed{\mu=\nu}
$$

です。

Wiener 測度の一意性は、この一般原理へ Brown 運動の有限次元分布を代入したものです。
<!-- solution-end -->

## Level C

### C1. 水準到達時刻の強マルコフ分解

$a,b>0$ とし

$$
\tau_a=\inf\{t\ge0:B_t=a\},
\qquad
\tau_{a+b}=\inf\{t\ge0:B_t=a+b\}
$$

とします。

1. $\tau_a<\infty$ ほとんど確実にを用いて、
   $\tau_{a+b}-\tau_a$ が $\mathcal F_{\tau_a}^B$ と独立であることを示してください。
2. $\tau_{a+b}-\tau_a$ の法則が $\tau_b$ の法則と同じであることを示してください。
3. 任意の $s,t>0$ に対し

$$
P(
\tau_a\le s,\tau_{a+b}-\tau_a\le t
)
=
P(\tau_a\le s)P(\tau_b\le t)
$$

を示し、右辺を $\Phi$ で明示してください。

- Level: C

<!-- solution-start -->
### 詳細解答

**1. 強マルコフ性を適用する。**

到達時刻 theorem から

$$
P(\tau_a<\infty)=1.
$$

従って強マルコフ性を $\tau_a$ に適用できます。

$$
W_u
=
B_{\tau_a+u}-B_{\tau_a},
\qquad u\ge0
$$

は 標準ブラウン運動で、$\mathcal F_{\tau_a}^B$ と独立です。

**2. 次の水準までの待ち時間を書き換える。**

$B_{\tau_a}=a$ ほとんど確実になので

$$
\begin{aligned}
\tau_{a+b}-\tau_a
&=
\inf\{u\ge0:B_{\tau_a+u}=a+b\}\\
&=
\inf\{u\ge0:B_{\tau_a+u}-B_{\tau_a}=b\}\\
&=
\inf\{u\ge0:W_u=b\}.
\end{aligned}
$$

右辺はブラウン運動 $W$ の水準 $b$ 到達時刻です。

したがって

$$
\tau_{a+b}-\tau_a
\overset{d}=\tau_b.
$$

しかも右辺を決める shifted 過程 $W$ 全体が $\mathcal F_{\tau_a}^B$ と独立なので、

$$
\tau_{a+b}-\tau_a
$$

も $\mathcal F_{\tau_a}^B$ と独立です。

**3. joint probability を分解する。**

event $\{\tau_a\le s\}$ は $\mathcal F_{\tau_a}^B$ に属します。実際、任意の $u\ge0$ について

$$
\{\tau_a\le s\}\cap\{\tau_a\le u\}
=
\{\tau_a\le \min(s,u)\}
\in
\mathcal F_u^B.
$$

従って独立性から

$$
\begin{aligned}
&P(
\tau_a\le s,\tau_{a+b}-\tau_a\le t
)\\
&=
P(\tau_a\le s)
P(\tau_{a+b}-\tau_a\le t)\\
&=
P(\tau_a\le s)
P(\tau_b\le t).
\end{aligned}
$$

到達時刻の分布を代入すると

$$
P(\tau_a\le s)
=
2\left(
1-\Phi\left(\frac a{\sqrt s}\right)
\right),
$$

$$
P(\tau_b\le t)
=
2\left(
1-\Phi\left(\frac b{\sqrt t}\right)
\right).
$$

従って

$$
\boxed{
P(
\tau_a\le s,\tau_{a+b}-\tau_a\le t
)
=
4
\left(
1-\Phi\left(\frac a{\sqrt s}\right)
\right)
\left(
1-\Phi\left(\frac b{\sqrt t}\right)
\right)
}.
$$

これは強マルコフ性が「停止時刻の後ろを新しい独立なブラウン運動として再スタートできる」ことの具体的な計算例です。
<!-- solution-end -->
