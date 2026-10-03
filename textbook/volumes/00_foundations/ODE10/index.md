# ODE10 平面力学系・周期軌道・Poincaré--Bendixson

<!-- definition-example-audit: strict -->

ODE9 までで[平衡解](../ODE1/index.md#def-ode1-equilibrium)へ近づく軌道を扱いました。平面では、軌道が[平衡解](../ODE1/index.md#def-ode1-equilibrium)へ行かずに閉じて回り続ける現象があります。本章では周期軌道の存在と不存在を、

$$
\text{閉じ込め領域}
\longleftrightarrow
\text{Poincaré--Bendixson}
\longleftrightarrow
\text{Bendixson--Dulac}
$$

という三つの道具で整理します。

## 1. 周期軌道と極限周期軌道

平衡点へ収束しない有界運動として、まず「同じ運動を繰り返す軌道」を切り出します。ただし、中心のまわりの円のように閉軌道が連続族をなす場合と、周囲の軌道から孤立した閉軌道では安定性の意味が異なります。この二つを区別しておきます。

<a id="def-ode10-periodic-orbit"></a>
<!-- formal-statement-start -->
> **定義（周期軌道・極限周期軌道）**  
> 非定常解 $x(t)$ に $T>0$ が存在して $x(t+T)=x(t)$ が全ての $t$ で成り立つとき、その像を周期軌道という。周期軌道が近傍内の他の周期軌道から孤立しているとき、極限周期軌道という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode10-periodic-orbit -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：中心は周期軌道を持つが極限周期軌道ではない

$$
x'=-y,
\qquad
y'=x
$$

では $x^2+y^2$ が保存され、各円が周期軌道です。しかし任意の円の近くに別の円軌道があるため、どの円も孤立していません。
<!-- definition-example-end -->

## 2. 軌道を閉じ込める領域

周期運動の存在を示したいとき、最初から周期解を公式で求められるとは限りません。代わりに、ある前向き軌道をコンパクトな領域から逃がさないことができれば、ODE9 の正の極限集合を使って長時間挙動を調べられます。そのための「閉じ込める領域」を定義します。

<a id="def-ode10-trapping-region"></a>
<!-- formal-statement-start -->
> **定義（捕捉領域（trapping region））**  
> コンパクト集合 $K$ が正方向不変で、その境界から出発する軌道が直後に内部へ入るとき、本章では $K$ を 捕捉領域 と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode10-trapping-region -->
**定義の確認**：$x'=-x$, $y'=-y$ に対し

$$
K=\{(x,y):x^2+y^2\le1\}
$$

とします。境界 $x^2+y^2=1$ 上では

$$
\frac d{dt}(x^2+y^2)=-2(x^2+y^2)=-2<0.
$$

したがって境界から出た軌道は直後に内部へ入り、$K$ はコンパクトかつ正方向不変なので 捕捉領域 です。
<!-- definition-example-end -->

ODE9 の Lyapunov 劣位集合は 捕捉領域 を作る代表的な方法です。

## 3. 重み付き発散で閉軌道を排除する

存在側では軌道を閉じ込めました。反対に、閉軌道が**存在できない**ことを示したい場合もあります。周期軌道上では速度は曲線の接線方向なので、その曲線を横切る流束は0です。そこで右辺 $(P,Q)$ を適当な $C^1$ 関数 $B$ で重み付けし、内部の発散積分だけに一定の符号を持たせることを狙います。

<a id="def-ode10-dulac"></a>
<!-- formal-statement-start -->
> **定義（Dulac 関数）**  
> 平面系 $x'=P(x,y)$, $y'=Q(x,y)$ の領域 $D$ 上で $C^1$ 関数 $B$ を取り、

$$
\partial_x(BP)+\partial_y(BQ)
$$

> の符号を調べるとき、$B$ を Dulac 関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode10-dulac -->
**定義の確認**：$x'=x$, $y'=y$ に対して $B\equiv1$ とします。すると $B\in C^1$ で

$$
\partial_x(Bx)+\partial_y(By)=1+1=2>0.
$$

したがって $B=1$ は、この重み付き発散の符号を調べる Dulac 関数です。
<!-- definition-example-end -->

<a id="thm-ode10-bendixson-dulac"></a>
<!-- formal-statement-start -->
> **定理（Bendixson--Dulac の判定）**  
> 領域 $D\subset\mathbb R^2$ 上で $P,Q,B\in C^1$ とし、$D$ 内の任意の単純閉曲線が囲む領域も $D$ に含まれるとする。

$$
\partial_x(BP)+\partial_y(BQ)
$$

> が $D$ で一方の符号を持ち、どの開集合上でも恒等的に0でないなら、$D$ 内に周期軌道は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

周期軌道が囲む領域へ [Green の定理](../VC4/index.md#cor-vc4-green-flux) を適用します。軌道上ではベクトル場が接線方向なので流束は0ですが、領域内部の発散積分は符号一定なら0になれません。

<!-- proof-start -->
### 証明

周期軌道 $C$ が存在すると仮定します。非定常な周期解が途中で自己交差すると、同じ点を異なる時刻に通る二つの解片が生じますが、ODE の一意性によりそこから先は一致します。最小周期を選べばこれは起こらないので、$C$ は単純閉曲線です。その内部を $\Omega$ とします。

軌道上の速度は $(P,Q)$ に平行なので $(BP,BQ)$ も接線方向です。外向き単位法線 $n$ に対し

$$
(BP,BQ)\cdot n=0.
$$

Green の流束形から

$$
0
=
\int_C(BP,BQ)\cdot n\,ds
=
\iint_\Omega
\left\{
\partial_x(BP)+\partial_y(BQ)
\right\}dxdy.
$$

しかし被積分関数が一方の符号を持ち、どの開集合上でも恒等的に0でないなら、連続性から内部のある小領域で絶対値が正に離れます。そのため面積積分は0になりません。矛盾です。
<!-- proof-end -->

$B=1$ とすれば通常の Bendixson 判定です。

## 4. 平面の有界軌道が取り得る極限像

<a id="thm-ode10-poincare-bendixson"></a>
<!-- formal-statement-start -->
> **定理（Poincaré--Bendixson の定理：標準形）**  
> $F:\mathbb R^2\to\mathbb R^2$ を $C^1$ 級とし、解 $x(t)$ が全ての $t\ge0$ で存在して、その像があるコンパクト集合に含まれるとする。その正の極限集合が[平衡解](../ODE1/index.md#def-ode1-equilibrium)を含まないなら、その正の極限集合は一つの周期軌道である。
<!-- formal-statement-end -->

### 何が平面特有なのか

この定理の幾何核心には、平面の単純閉曲線が内外を分ける **Jordan 曲線定理**が必要です。ここで使う内容を正確に固定しておきます。

> 平面内の単純閉曲線 $J$ に対して $\mathbb R^2\setminus J$ はちょうど二つの連結成分に分かれる。一方は有界な「内側」、他方は非有界な「外側」で、$J$ は両成分の境界である。

この定理自体の証明は位相幾何の大きな主題なので、本章ではこの一文だけを幾何学的入力として使います。以下では、そこから必要になる力学系側の論証を省略せず閉じます。

まず Poincaré--Bendixson の証明で繰り返し使う局所事実を準備します。

<a id="lem-ode10-transversal-omega"></a>
<!-- formal-statement-start -->
> **補題（局所横断線と正の極限集合の交点）**  
> $C^1$ 平面自律系 $x'=F(x)$ の前向き軌道 $x(t)$ がコンパクト集合に留まり、
>
$$
\Omega=\omega(x_0)
$$
>
> とする。$q\in\Omega$ が[平衡解](../ODE1/index.md#def-ode1-equilibrium)でない、すなわち $F(q)\ne0$ とする。このとき $q$ を通る十分短い横断線分 $\Sigma$ を取れば
>
$$
\boxed{\Omega\cap\Sigma=\{q\}}.
$$
<!-- formal-statement-end -->

### なぜ横断線上では極限点が一つに絞られるのか

座標を回転して

$$
F_1(q)>0
$$

とします。連続性から、$q$ を含む小さい長方形 $R$ と定数 $a>0$ を選んで

$$
F_1(x)\ge a>0
\qquad(x\in R)
$$

とできます。$q$ を通る縦の短い線分

$$
\Sigma
=
\{x_1=q_1,\ |x_2-q_2|<\delta\}
\subset R
$$

を取ります。

$R$ 内の軌道では

$$
\frac d{dt}x_1(t)
=
F_1(x(t))
\ge a>0
$$

なので、$x_1$ は時間とともに厳密に増えます。従って一回の $R$ 通過中に $\Sigma$ を二度横切ることはなく、全ての横切り方は同じ向きです。

さらに $q\in\Omega$ なので、元の軌道には

$$
t_n\to\infty,
\qquad
x(t_n)\to q
$$

となる列があります。$R$ を少し内側へ縮めておけば、$x(t_n)$ から短い正または負の時間だけ進めることで $\Sigma$ へ到達できます。実際、$F_1\ge a$ なので必要な時間の絶対値は

$$
|\tau_n|
\le
\frac{|x_1(t_n)-q_1|}{a}
\to0.
$$

従って元の軌道は $\Sigma$ を無限回横切り、その交点の部分列は $q$ へ収束します。

<!-- proof-start -->
### 証明

十分後の $\Sigma$ との交点を、時刻順に

$$
p_1,p_2,p_3,\ldots
$$

と並べます。$\Sigma$ に弧長座標 $s$ を入れます。

連続する二交点 $p_k,p_{k+1}$ を結ぶ軌道弧を $\Gamma_k$、$\Sigma$ 上で二点を結ぶ線分を $I_k$ とします。交点が連続しているので $\Gamma_k$ の内部は $\Sigma$ と交わりません。また ODE の一意性から $\Gamma_k$ は自己交差しません。従って

$$
J_k=\Gamma_k\cup I_k
$$

は単純閉曲線です。

ここで Jordan 曲線定理を使います。$J_k$ は平面を内側と外側に分けます。軌道が過去の軌道弧 $\Gamma_k$ を横切れば、その交点から二つの解が異なる向きへ進むことになり一意性に反します。従って $p_{k+1}$ より後の軌道は $\Gamma_k$ を横切れません。

一方 $\Sigma$ 上では全ての軌道が同じ向きに横切ります。このため、次の交点 $p_{k+2}$ が $I_k$ の内部にあると、$p_{k+1}$ の直後にいる側から $p_{k+2}$ の直前にいる反対側へ移る途中で、境界 $J_k$ の $\Gamma_k$ または $I_k$ を一度余分に横切る必要があります。前者は一意性に反し、後者は $p_{k+2}$ が次の交点であることに反します。

従って $p_{k+2}$ は $p_k$ と $p_{k+1}$ の間には入りません。最初の二点の順序に応じて

$$
s(p_1)<s(p_2)<s(p_3)<\cdots
$$

または

$$
s(p_1)>s(p_2)>s(p_3)>\cdots
$$

となります。つまり、十分短い局所横断線上の将来交点列は単調です。

$\Sigma$ は有界な線分なので、この単調列が持てる極限点は高々一つです。

ここで任意の $r\in\Omega\cap\Sigma$ を取ります。$r\in\Omega$ なので、ある列 $t_n\to\infty$ で $x(t_n)\to r$ です。$r$ の近くでも $F_1>0$ なので、上と同じ短時間補正により $\Sigma$ 上の実際の交点列の部分列が $r$ へ収束します。従って $r$ は交点列の極限です。

交点列の極限は高々一つであり、既に $q$ へ収束する部分列を持つので、その唯一の極限は $q$ です。従って

$$
\Omega\cap\Sigma=\{q\}.
$$
<!-- proof-end -->

この補題が平面特有の核心です。横断線が一次元なので交点を順序付けられ、その順序が Jordan 曲線によって保たれます。

<!-- proof-start -->
### 証明

前向き軌道を $x(t)$、その正の極限集合を

$$
\Omega=\omega(x_0)
$$

と書きます。

**Step 1：$\Omega$ は空でないコンパクト・連結・不変集合である。**

仮定より $x(t)$ はあるコンパクト集合 $K$ に留まります。各 $T\ge0$ に対し

$$
K_T
=
\overline{\{x(t):t\ge T\}}
$$

と置くと、$K_T$ は非空コンパクトです。また $[T,\infty)$ は連結で、その連続像と閉包も連結なので $K_T$ は連結です。

しかも

$$
K_{T_2}\subset K_{T_1}
\qquad(T_2\ge T_1)
$$

で、

$$
\Omega
=
\bigcap_{m=1}^{\infty}K_m.
$$

従って $\Omega$ は非空コンパクトです。連結性も確認しておきます。もし $\Omega$ が二つの非空な閉集合 $A,B$ に分離できるなら、コンパクト性から正の距離

$$
d(A,B)>0
$$

を持ちます。互いに交わらない小さい開近傍 $U,V$ を取ります。

もし全ての $m$ について $K_m\not\subset U\cup V$ なら、$y_m\in K_m\setminus(U\cup V)$ を選べます。$K_1$ のコンパクト性から収束部分列を取り、その極限 $y$ を考えると、入れ子性から全ての $K_m$ に属し

$$
y\in\Omega\setminus(U\cup V)
$$

となって矛盾です。従って十分大きい $m$ では

$$
K_m\subset U\cup V.
$$

しかし $K_m$ は連結で、しかも $A,B\subset\Omega\subset K_m$ なので $U,V$ の両方と交わります。これは不可能です。よって $\Omega$ は連結です。

次に不変性を確認します。$y\in\Omega$ とし、

$$
x(t_n)\to y,
\qquad
t_n\to\infty
$$

とします。固定した $s\ge0$ を取ります。ここで $y$ から時刻 $s$ までの解が存在し、$x(t_n)$ からの解と比較できることを確認します。

コンパクト集合 $K$ の閉 $\rho$-近傍

$$
K^\sharp
=
\{z:\operatorname{dist}(z,K)\le\rho\}
$$

を一つ取ります。有限次元では $K^\sharp$ もコンパクトです。$F\in C^1(\mathbb R^2)$ なので

$$
M:=\sup_{z\in K^\sharp}\|F(z)\|<\infty,
$$

$$
L:=\sup_{z\in K^\sharp}\|DF(z)\|<\infty.
$$

従って $K^\sharp$ 上で $F$ は Lipschitz 定数 $L$ を持ちます。ODE8 の延長定理の証明と同じ Picard 評価により、例えば

$$
Mh\le\frac{\rho}{2},
\qquad
Lh<1
$$

となる $h>0$ を選べば、$K$ のどの点からも少なくとも時間 $h$ だけ解を開始できます。この $h$ は初期点によらず共通です。

$x(t_n)\to y$ なので、ODE8 の[初期値に関する連続依存](../ODE8/index.md#thm-ode8-continuous-dependence)を $[0,h]$ に適用すると

$$
\Phi_t(x(t_n))
\to
\Phi_t(y)
\qquad(0\le t\le h)
$$

が得られます。特に $t=h$ で

$$
x(t_n+h)
=
\Phi_h(x(t_n))
\to
\Phi_h(y).
$$

左辺は全て $K$ にあり $K$ は閉なので

$$
\Phi_h(y)\in K.
$$

従って $\Phi_h(y)$ からも同じ時間幅 $h$ だけ解を続けられます。この操作を有限回繰り返し、$Nh\ge s$ となる $N$ を取れば、$y$ からの解は $[0,s]$ 全体で存在し、各段階の連続依存をつなげて

$$
x(t_n+s)
=
\Phi_s(x(t_n))
\to
\Phi_s(y)
$$

を得ます。左辺は $K$ にあるので

$$
\Phi_s(y)\in K.
$$

また $t_n+s\to\infty$ だから、この極限点は定義より

$$
\Phi_s(y)\in\Omega.
$$

これで $\Omega$ の正時間不変性が分かりました。

逆向きについては、十分大きい $n$ で $t_n-s\ge0$ です。$x(t_n-s)$ はコンパクト集合 $K$ にあるので部分列を取り

$$
x(t_{n_k}-s)\to z\in\Omega
$$

とできます。すでに正時間不変性と連続依存を示したので

$$
\begin{aligned}
\Phi_s(z)
&=
\lim_{k\to\infty}
\Phi_s(x(t_{n_k}-s))\\
&=
\lim_{k\to\infty}
x(t_{n_k})\\
&=
y.
\end{aligned}
$$

$z$ から $y$ へ至るこの時間 $s$ の解片を逆向きに見れば、$y$ を初期値とする時刻区間 $[-s,0]$ の解が実際に存在し、その $-s$ 時刻の値が $z$ です。一意性によりこれを $\Phi_{-s}(y)$ と書けるので

$$
\Phi_{-s}(y)=z\in\Omega.
$$

従って $\Omega$ は前後両方向に不変です。

**Step 2：$\Omega$ の全ての点は周期軌道上にある。**

任意に $q\in\Omega$ を取ります。仮定より $\Omega$ は平衡解を含まないので

$$
F(q)\ne0.
$$

$q$ から出る前向き軌道は不変性により $\Omega$ 内に留まります。$\Omega$ はコンパクトなので、その軌道の正の極限集合 $\omega(q)$ も非空です。そこから一点

$$
p\in\omega(q)\subset\Omega
$$

を取ります。

ここで横断線補題を適用する相手を取り違えないことが重要です。$p$ は **元の軌道 $x(t)$ の** 正の極限集合 $\Omega=\omega(x_0)$ に属するので、[局所横断線と正の極限集合の交点](#lem-ode10-transversal-omega)を元の軌道 $x(t)$ と点 $p$ に適用します。すると $p$ を通る短い横断線 $\Sigma$ を取って

$$
\boxed{\Omega\cap\Sigma=\{p\}}
$$

とできます。

一方 $p\in\omega(q)$ なので、$q$ から出る軌道には

$$
s_n\to\infty,
\qquad
\Phi_{s_n}(q)\to p
$$

となる列があります。$p$ の横断長方形では速度の横断成分が0から離れているため、各十分大きい $n$ について $s_n$ から $o(1)$ だけ時刻を補正すると、$q$ の軌道が実際に $\Sigma$ と交わる時刻 $\tau_n$ を取れます。

その交点

$$
\Phi_{\tau_n}(q)
$$

は $q$ の軌道上にあります。$q\in\Omega$ かつ $\Omega$ は不変なので、全ての交点は $\Omega$ に属します。しかも $\Sigma$ 上にあるため

$$
\Phi_{\tau_n}(q)
\in
\Omega\cap\Sigma
=
\{p\}.
$$

従って十分大きい全ての $n$ で

$$
\Phi_{\tau_n}(q)=p.
$$

$\tau_n\to\infty$ なので異なる二時刻 $\tau_n<\tau_m$ を選べます。すると

$$
\Phi_{\tau_m-\tau_n}(p)
=
\Phi_{\tau_m-\tau_n}(\Phi_{\tau_n}(q))
=
\Phi_{\tau_m}(q)
=
p.
$$

よって $p$ を通る軌道は周期軌道です。

さらに

$$
\Phi_{\tau_n}(q)=p
$$

なので、$q$ はこの周期軌道を過去向きに $\tau_n$ だけたどった点です。Step 1 で $\Omega$ 上の流れは前後両方向に定義され一意であることを確認しているので、$q$ も同じ周期軌道上にあります。

$q\in\Omega$ は任意だったので、$\Omega$ の全ての点は何らかの周期軌道上にあります。

**Step 3：連結性により周期軌道は一つだけである。**

$\Omega$ 内の一つの周期軌道を $C$ とします。$p\in C$ を任意に取り、補題で使った横断長方形 $R$ と横断線 $\Sigma$ を $p$ に置きます。補題から

$$
\Omega\cap\Sigma=\{p\}.
$$

$R$ を少し縮めた長方形 $R'$ を取れば、$R'$ の任意の点 $y$ から出る軌道は、短い正または負の時間内に $\Sigma$ と一度だけ交わります。これは $F_1\ge a>0$ により第1座標が単調に動くためです。

いま $y\in\Omega\cap R'$ とします。$\Omega$ は不変なので、その短い時間だけ進めて得る $\Sigma$ 上の交点も $\Omega$ に属します。従ってその交点は $p$ しかありません。ODE の一意性から $y$ は $p$ と同じ軌道、すなわち $C$ 上にあります。

したがって

$$
\Omega\cap R'\subset C.
$$

$p\in C$ は任意なので、このような $R'$ の和は $C$ の開近傍 $U$ を作り、

$$
\Omega\cap U=C.
$$

よって $C$ は $\Omega$ の相対位相で開です。一方 $C$ は周期軌道の連続像でコンパクトだから $\Omega$ 内で閉です。

$\Omega$ は Step 1 で連結と示したので、非空な部分集合 $C$ が同時に開かつ閉であるなら

$$
\Omega=C.
$$

従って正の極限集合は一つの周期軌道です。
<!-- proof-end -->

一般次元では横断面が高次元になり、横断面上の交点列にこの一次元的な順序を入れられません。Jordan 曲線による「内側・外側」の分離もそのまま使えないため、同じ結論は成立しません。

## 5. Lotka--Volterra：閉軌道が孤立しない例

$$
x'=x(1-y),
\qquad
y'=y(x-1),
\qquad x,y>0
$$

を考えます。「保存量がある」だけで閉軌道になるわけではありません。等高線が本当にコンパクトな閉曲線で、その上で速度が消えないことまで確認します。

まず

$$
H(x,y)=x-\log x+y-\log y
$$

と置くと

$$
H_x=1-\frac1x,
\qquad
H_y=1-\frac1y.
$$

従って[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
\begin{aligned}
\dot H
&=
H_xx'+H_yy'\\
&=
\left(1-\frac1x\right)x(1-y)
+
\left(1-\frac1y\right)y(x-1)\\
&=
(x-1)(1-y)+(y-1)(x-1)\\
&=0.
\end{aligned}
$$

次に等高線の形を確認します。一変数関数

$$
h(u)=u-\log u
\qquad(u>0)
$$

について

$$
h'(u)=1-\frac1u
$$

なので、

$$
0<u<1\Longrightarrow h'(u)<0,
$$

$$
u>1\Longrightarrow h'(u)>0.
$$

従って $h$ は $(0,1]$ で単調減少、$[1,\infty)$ で単調増加し、唯一の最小点は $u=1$ です。また

$$
h(1)=1,
\qquad
h(u)\to\infty
\quad(u\downarrow0\text{ または }u\to\infty).
$$

よって

$$
H(x,y)=h(x)+h(y)\ge2
$$

で、等号は $(x,y)=(1,1)$ のときだけです。

任意に $c>2$ を固定します。方程式

$$
h(x)+h(y)=c
$$

を考えると、$h(y)\ge1$ なので必要条件は

$$
h(x)\le c-1.
$$

$h$ の上の単調性と端での発散から、

$$
h(a_c)=h(b_c)=c-1,
\qquad
0<a_c<1<b_c<\infty
$$

となる $a_c,b_c$ が一意に存在し、$x$ は閉区間 $[a_c,b_c]$ に限られます。

$a_c<x<b_c$ では

$$
c-h(x)>1.
$$

$h$ は $(0,1]$ と $[1,\infty)$ でそれぞれ一対一なので、

$$
h(y)=c-h(x)
$$

には

$$
0<y_-(x)<1<y_+(x)
$$

という二つの解がちょうど存在します。単調関数の逆関数の連続性から $y_-(x),y_+(x)$ は連続で、端点 $x=a_c,b_c$ では二枝が $y=1$ でつながります。従って

$$
C_c=\{(x,y)>0:H(x,y)=c\}
$$

は正の第一象限内にある単純閉曲線です。

曲線の滑らかさも、ここでは一変数の逆関数だけで確認できます。$C_c$ 上で $y\ne1$ なら

$$
h'(y)=1-\frac1y\ne0
$$

なので、$y<1$ 側または $y>1$ 側の単調な枝で $h$ の逆関数を使い、$y$ を $x$ の滑らかな関数として書けます。

二枝がつながる点では $y=1$ ですが、そのとき $x=a_c$ または $x=b_c$ であり $x\ne1$ です。従って

$$
h'(x)=1-\frac1x\ne0,
$$

なので今度は $x$ を $y$ の滑らかな関数として書けます。従って $C_c$ は全体として滑らかな単純閉曲線です。

右辺

$$
F(x,y)=\bigl(x(1-y),\,y(x-1)\bigr)
$$

が正の第一象限で0になるのも $(1,1)$ だけです。従って $C_c$ 上では $F\ne0$ です。$\dot H=0$ なので

$$
\nabla H\cdot F=0,
$$

すなわち $F$ は $C_c$ の接線方向を向き、軌道はこの閉曲線から離れません。

$C_c$ はコンパクトで $F$ はそこで0にならないため、

$$
m_c:=\min_{z\in C_c}\|F(z)\|>0.
$$

$C_c$ に弧長座標 $s$ を入れると、軌道上では

$$
\left|\frac{ds}{dt}\right|
=
\|F\|
\ge m_c.
$$

また接線方向の速度は連続で0にならないため、その向きは閉曲線上で途中反転しません。$C_c$ の全弧長を $L_c<\infty$ とすれば、一周時間 $T_c$ は

$$
T_c
=
\int_0^{L_c}
\frac{ds}{\|F\|}
\le
\frac{L_c}{m_c}
<\infty.
$$

従って軌道は有限時間で $C_c$ を一周して出発点へ戻ります。一意性により、その後も同じ運動を繰り返すので $C_c$ は周期軌道です。

$c>2$ を連続に変えるたびに異なる周期軌道 $C_c$ が得られます。従って各周期軌道の任意に近くに別の周期軌道があり、どれも孤立していません。つまりこれらは極限周期軌道ではありません。

## 6. van der Pol：孤立周期軌道の代表

$$
x''-\mu(1-x^2)x'+x=0,
\qquad \mu>0
$$

では小振幅と大振幅で有効な減衰の向きが変わり、振幅を中間へ押し戻す機構があります。この系の極限周期軌道の存在・一意性を一般の Liénard の定理から証明するには、本章で扱った道具より先の理論が必要です。ここではその事実を証明なしに利用しません。次章では、周期軌道がすでに与えられているとき、その安定性を局所帰還写像で調べます。

## 演習

### Level A

#### ODE10-A01 中心の周期軌道
- Level: A

$x'=-y$, $y'=x$ の非零軌道が周期軌道であることを示せ。

<!-- solution-start -->
##### 詳細解答

まず

$$
R(x,y):=x^2+y^2
$$

と置きます。軌道に沿って

$$
\begin{aligned}
\frac d{dt}R(x(t),y(t))
&=
2xx'+2yy'\\
&=
2x(-y)+2yx\\
&=0.
\end{aligned}
$$

従って非零初期値では

$$
x(t)^2+y(t)^2=r^2
$$

となる一定の $r>0$ が存在します。

さらに複素数 $z=x+iy$ と置けば

$$
z'=x'+iy'=-y+ix=i(x+iy)=iz.
$$

従って

$$
z(t)=z(0)e^{it}.
$$

$z(0)=re^{i\theta}$ と書けば

$$
\boxed{
(x(t),y(t))
=
\bigl(r\cos(t+\theta),\,r\sin(t+\theta)\bigr)
}.
$$

$t$ を $2\pi$ 増やすと同じ点へ戻り、非零解は定常でないので各円は周期軌道です。
<!-- solution-end -->

#### ODE10-A02 Bendixson 判定
- Level: A

$x'=x-y$, $y'=x+y$ が周期軌道を持たないことを示せ。

<!-- solution-start -->
##### 詳細解答

右辺を

$$
P(x,y)=x-y,
\qquad
Q(x,y)=x+y
$$

とします。$B\equiv1$ を取ると $B,P,Q$ は全平面で $C^1$ 級で、

$$
\begin{aligned}
\partial_x(BP)+\partial_y(BQ)
&=
\partial_x(x-y)+\partial_y(x+y)\\
&=
1+1\\
&=2>0.
\end{aligned}
$$

また $D=\mathbb R^2$ は平面全体なので、$D$ 内の単純閉曲線が囲む領域も全て $D$ に含まれます。従って [Bendixson--Dulac の判定](#thm-ode10-bendixson-dulac) の全仮定を満たし、

$$
\boxed{\mathbb R^2\text{ 内に周期軌道は存在しない}}
$$

と結論できます。
<!-- solution-end -->

#### ODE10-A03 Lotka--Volterra
- Level: A

本文の $H$ が保存されることを直接確認せよ。

<!-- solution-start -->
##### 詳細解答

$$
H(x,y)=x-\log x+y-\log y
$$

なので

$$
H_x=1-\frac1x,
\qquad
H_y=1-\frac1y.
$$

軌道に[連鎖律](../RA3/index.md#prop-ra3-chain-rule)を適用すると

$$
\begin{aligned}
\dot H
&=
H_xx'+H_yy'\\
&=
\left(1-\frac1x\right)x(1-y)
+
\left(1-\frac1y\right)y(x-1)\\
&=
(x-1)(1-y)+(y-1)(x-1)\\
&=
0.
\end{aligned}
$$

従って解が正の第一象限にある限り

$$
\boxed{H(x(t),y(t))=H(x(0),y(0))}
$$

です。
<!-- solution-end -->

#### ODE10-A04 捕捉領域
- Level: A

閉円板の境界でベクトル場が常に厳密に内向きなら、その円板が正方向不変である理由を説明せよ。

<!-- solution-start -->
##### 詳細解答

半径 $R$ の閉円板

$$
K=\{x\in\mathbb R^2:\|x\|^2\le R^2\}
$$

を考え、

$$
g(x):=\|x\|^2-R^2
$$

と置きます。$K=\{g\le0\}$、境界は $\{g=0\}$ です。「境界で厳密に内向き」は

$$
\nabla g(x)\cdot F(x)<0
\qquad(g(x)=0)
$$

という意味です。

$K$ 内から出発した解が外へ出ると仮定し、最初の境界到達時刻を $t_*$ とします。$t<t_*$ では

$$
g(x(t))<0,
\qquad
g(x(t_*))=0.
$$

従って $t_*$ で外側へ通過するには $g(x(t))$ は増加側へ向かわなければなりません。しかし[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
\frac d{dt}g(x(t_*))
=
\nabla g(x(t_*))\cdot F(x(t_*))
<0,
$$

なので境界到達直後は $g<0$ 側、すなわち円板内部へ戻ります。これは最初の退出時刻という仮定に反します。

従って $K$ から出発した軌道は将来も $K$ に留まり、$K$ は正方向不変です。
<!-- solution-end -->

### Level B

#### ODE10-B01 Dulac 関数
- Level: B

$x'=x(1-x-y)$, $y'=y(2-x-y)$ を正の第一象限で考える。$B=1/(xy)$ を用いて周期軌道がないことを示せ。

<!-- solution-start -->
##### 詳細解答

領域を

$$
D=\{(x,y):x>0,\ y>0\}
$$

とします。ここでは

$$
B(x,y)=\frac1{xy}
$$

は $C^1$ 級です。右辺

$$
P=x(1-x-y),
\qquad
Q=y(2-x-y)
$$

に掛けると

$$
BP=\frac{1-x-y}{y},
\qquad
BQ=\frac{2-x-y}{x}.
$$

従って

$$
\begin{aligned}
\partial_x(BP)
&=-\frac1y,\\
\partial_y(BQ)
&=-\frac1x,
\end{aligned}
$$

なので

$$
\partial_x(BP)+\partial_y(BQ)
=
-\frac1y-\frac1x
<0
\qquad((x,y)\in D).
$$

$D=\{x>0,y>0\}$ の内部にある単純閉曲線は、$x=0$ または $y=0$ の境界線を横切らず、その囲む有界領域も $x>0,y>0$ の側にあります。従って [Bendixson--Dulac の判定](#thm-ode10-bendixson-dulac) の領域条件を満たし、

$$
\boxed{D\text{ 内に周期軌道は存在しない}}
$$

と結論できます。
<!-- solution-end -->

#### ODE10-B02 保存系と極限周期軌道
- Level: B

中心のまわりに閉軌道が連続族として存在する系で、各閉軌道が極限周期軌道でない理由を説明せよ。

<!-- solution-start -->
##### 詳細解答
極限周期軌道は孤立している必要があります。任意の閉軌道の任意に近くに別の閉軌道があるため孤立していません。
<!-- solution-end -->

#### ODE10-B03 Poincaré--Bendixson
- Level: B

前向き軌道がコンパクト集合に留まり、その正の極限集合が[平衡解](../ODE1/index.md#def-ode1-equilibrium)を含まないとき何が結論されるか。

<!-- solution-start -->
##### 詳細解答

[ Poincaré--Bendixson の定理](#thm-ode10-poincare-bendixson)へ仮定を対応させます。

- 系は平面 $\mathbb R^2$ 上の $C^1$ 自律系である。
- 対象の解は全ての $t\ge0$ で存在する。
- 前向き軌道の像はあるコンパクト集合に含まれる。
- その正の極限集合 $\omega(x_0)$ は[平衡解](../ODE1/index.md#def-ode1-equilibrium)を含まない。

これらがそろえば定理から

$$
\boxed{\omega(x_0)\text{ は一つの周期軌道}}
$$

と結論されます。

特に「軌道が有界そう」「平衡点へ行かなそう」だけでは不十分です。前向き大域存在、コンパクト集合への包含、正の極限集合からの平衡解排除をそれぞれ確認する必要があります。
<!-- solution-end -->

### Level C

#### ODE10-C01 存在と不存在の道具
- Level: C

$C^1$ 平面自律系 $x'=F(x)$ を考える。コンパクトな捕捉領域 $K$ が存在し、$K$ 内に[平衡解](../ODE1/index.md#def-ode1-equilibrium)がないとする。

1. $x_0\in K$ から出る前向き軌道が全ての $t\ge0$ で存在することを説明せよ。
2. その正の極限集合に Poincaré--Bendixson の定理を適用し、$K$ 内に周期軌道が存在することを示せ。
3. さらに $K\subset D$ とし、$D$ が Bendixson--Dulac の判定に必要な領域条件を満たすとする。その $D$ 上に判定条件を満たす $C^1$ 関数 $B$ が存在すると仮定すると何が起こるか。存在側と不存在側の道具の関係を説明せよ。

<!-- solution-start -->
##### 詳細解答

**1. 前向き大域存在**

捕捉領域は正方向不変なので、$x_0\in K$ から出る解は存在する限り $K$ に留まります。もし最大存在区間の右端が有限なら、軌道がコンパクト集合 $K$ に留まり続けることが ODE8 の[最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)に反します。従って解は全ての $t\ge0$ で存在します。

**2. 周期軌道の存在**

前向き軌道はコンパクト集合 $K$ に含まれるので、その正の極限集合

$$
\Omega=\omega(x_0)
$$

は空でないコンパクト集合です。また

$$
\Omega\subset K.
$$

仮定より $K$ 自体に平衡解がないため、$\Omega$ にも平衡解はありません。従って [Poincaré--Bendixson の定理](#thm-ode10-poincare-bendixson) の仮定が全て満たされ、

$$
\boxed{\Omega\text{ は一つの周期軌道}}
$$

です。特に $K$ 内に周期軌道が少なくとも一つ存在します。

**3. 不存在判定との関係**

一方、$D$ 上の $B$ が [Bendixson--Dulac の判定](#thm-ode10-bendixson-dulac) の仮定を満たすなら、$D$ 内には周期軌道が存在できません。ところが 2 では $K\subset D$ に周期軌道が存在すると結論しました。従って両方の仮定を同時に満たすことはできません。

つまり、

$$
\boxed{
\begin{array}{c}
\text{捕捉領域 + 平衡解不在}
\\
\Downarrow\\
\text{Poincaré--Bendixson による周期軌道の存在}
\end{array}
}
$$

に対し、

$$
\boxed{
\text{Dulac 関数による符号一定性}
\Longrightarrow
\text{周期軌道の不存在}
}
$$

です。存在側と不存在側の判定は競合する結論を与えるため、同じ領域で両者の仮定が同時成立していないかを確認することが重要です。
<!-- solution-end -->

## 7. 章末チェック

- 周期軌道と極限周期軌道を区別できる。
- 捕捉領域の役割を説明できる。
- Bendixson--Dulac を [Green の定理（流束形）](../VC4/index.md#cor-vc4-green-flux)から証明できる。
- Poincaré--Bendixson の仮定と平面特有の機構を説明できる。
