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

<a id="def-ode10-trapping-region"></a>
<!-- formal-statement-start -->
> **定義（trapping region）**  
> コンパクト集合 $K$ が正方向不変で、その境界から出発する軌道が直後に内部へ入るとき、本章では $K$ を trapping region と呼ぶ。
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

したがって境界から出た軌道は直後に内部へ入り、$K$ はコンパクトかつ正方向不変なので trapping region です。
<!-- definition-example-end -->

ODE9 の Lyapunov 劣位集合は trapping region を作る代表的な方法です。

## 3. 重み付き発散で閉軌道を排除する

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
> $C^1$ 平面自律系の前向き軌道がコンパクト集合に留まるとする。その正の極限集合が[平衡解](../ODE1/index.md#def-ode1-equilibrium)を含まないなら、その正の極限集合は周期軌道である。
<!-- formal-statement-end -->

### 何が平面特有なのか

この定理の幾何核心には、平面の単純閉曲線が内外を分ける **Jordan 曲線定理**が必要です。現行 prerequisite には Jordan 曲線定理の canonical owner がないため、本章では **Jordan 曲線定理そのものだけ**を意図的な幾何入力とします。以下では、それ以外の力学系側の論証を追います。

#### 局所横断線は一方向にしか横切れない

正の極限集合の点 $q$ が平衡解でないなら $F(q)\ne0$ です。座標を回転して、第1成分が

$$
F_1(q)>0
$$

となるようにします。連続性から、$q$ を含む十分小さい長方形 $R$ ではある $a>0$ が存在して

$$
F_1(x)\ge a>0
\qquad (x\in R)
$$

とできます。

$q$ を通り $F(q)$ に横断的な短い線分を

$$
\Sigma=\{x_1=q_1,\ |x_2-q_2|<\delta\}\subset R
$$

と取ります。$R$ 内の軌道では

$$
\frac{d}{dt}x_1(t)=F_1(x(t))\ge a>0
$$

なので $x_1(t)$ は厳密に増加します。したがって、一回の $R$ 通過中に $\Sigma$ を二度横切ることはなく、全ての通過は同じ向きです。

この単調性は「局所的な横断線」のために一般の flow-box 定理を別途仮定しなくてよいことも示しています。

#### Jordan 曲線から交点の順序が生まれる

一つの前向き軌道が $\Sigma$ を時刻

$$
t_1<t_2<t_3<\cdots
$$

で繰り返し横切るとします。交点を $p_k=x(t_k)$ とします。$p_k\ne p_{k+1}$ のとき、$p_k$ から $p_{k+1}$ までの軌道弧を $\Gamma_k$、$\Sigma$ 上で両点を結ぶ線分を $I_k$ とします。

$t_k,t_{k+1}$ を **連続する $\Sigma$ 交差時刻**として取れば、$\Gamma_k$ の内部は $\Sigma$ と交わりません。また ODE の一意性により、$\Gamma_k$ は自己交差しません。従って

$$
C_k=\Gamma_k\cup I_k
$$

は単純閉曲線です。

ここで Jordan 曲線定理を使います。$C_k$ は平面を内側と外側に分けます。軌道は $I_k$ を常に同じ向きに横切る一方、過去の軌道弧 $\Gamma_k$ を横切ることは一意性に反するのでできません。したがって $p_{k+1}$ の後の軌道が再び $\Sigma$ へ戻るなら、その交点は $I_k$ の内部へ戻ることができません。

$\Sigma$ に向きを入れて座標 $s$ を取ると、連続する交点は

$$
s(p_1)<s(p_2)<s(p_3)<\cdots
$$

または

$$
s(p_1)>s(p_2)>s(p_3)>\cdots
$$

のどちらか一方に並びます。つまり、**同じ局所横断線上の将来交点は順序を持ち、向きを反転して往復できません**。

交点がコンパクトな部分線分に無限個あるなら、この単調列はただ一つの極限点 $p_*$ を持ちます。さらに $I_k$ の長さは0へ行きます。$C_k$ の Jordan 領域は交差順序に従って片側から入れ子になり、軌道弧 $\Gamma_k$ は互いに交差できません。コンパクト性と解の初期値連続依存性を使って $k\to\infty$ とすると、入れ子境界の軌道部分は $p_*$ を出て再び $p_*$ へ戻る一つの軌道へ収束します。従って $p_*$ を通る軌道は周期軌道です。

この最後の極限で重要なのは、$F(p_*)\ne0$ であることです。もし $F(p_*)=0$ なら交差時間が退化して平衡解へ吸い込まれる可能性がありますが、Poincaré--Bendixson の仮定は正の極限集合から平衡解を除いています。従って $p_*$ の近くには上で作った共通の横断長方形があり、軌道弧の極限を同じ向きの通過として追えます。

<!-- proof-start -->
### 証明

前向き軌道を $x(t)$、その正の極限集合を

$$
\Omega=\omega(x_0)
$$

と書きます。

**Step 1：$\Omega$ は空でないコンパクト不変集合である。**

仮定より $x(t)$ はあるコンパクト集合 $K$ に留まります。任意の $t_n\to\infty$ から $x(t_n)$ の収束部分列を取れるので $\Omega\ne\varnothing$ です。$\Omega$ は $K$ の閉部分集合なのでコンパクトです。

また [ODE9 の LaSalle 証明](../ODE9/index.md#thm-ode9-lasalle) で使ったのと同じ連続依存の議論により、$y\in\Omega$ ならその軌道の将来も過去も $\Omega$ 内に取れます。従って $\Omega$ は不変です。

**Step 2：$\Omega$ の正則点に局所横断線を置く。**

任意に $q\in\Omega$ を取ります。仮定より $\Omega$ は平衡解を含まないので

$$
F(q)\ne0.
$$

上で構成した短い横断線 $\Sigma$ を $q$ に置きます。$q\in\Omega$ なので、元の軌道には $t_n\to\infty$ で $x(t_n)\to q$ となる列があります。十分大きい $n$ では $x(t_n)$ は横断長方形 $R$ に入り、その通過中に $\Sigma$ と一度だけ交わります。従って $\Sigma$ 上に無限個の将来交点 $p_k$ があり、その部分列は $q$ へ収束します。

**Step 3：横断線上の極限点は一つで、その点を通る軌道は周期的である。**

前節の Jordan 曲線による交差順序を、十分後の連続する交点に適用します。$\Sigma$ 上の交点座標は単調であり、$\Sigma$ の小さい閉部分線分内にあるので収束します。しかも $q$ へ収束する部分列を持つため、全交点列の極限は $q$ です。

連続する交点 $p_k,p_{k+1}$ を結ぶ軌道弧と横断線分でできる Jordan 曲線を考えると、その領域は同じ側から入れ子になります。$p_k,p_{k+1}\to q$ で横断線分の長さは0へ行きます。軌道弧はコンパクト集合 $K$ にあり、互いに横断できません。局所横断長方形で $F$ が0から離れていることと初期値連続依存性により、これらの軌道弧の極限は $q$ から出て $q$ に戻る同一軌道です。よって $q$ は周期軌道 $C$ 上にあります。

**Step 4：正の極限集合全体がその周期軌道である。**

周期軌道 $C$ は単純閉曲線です。Jordan 曲線定理により平面を二成分に分け、ODE の一意性により他の軌道は $C$ を横切れません。

元の軌道が有限時刻で $C$ に到達したなら、その後は一意性により $C$ 上を回り続け、直ちに $\Omega=C$ です。到達しない場合も、$q\in C\subset\Omega$ なので元の軌道は $C$ の片側から任意に近づきます。

もし $\Omega$ に $C$ の外の点 $z$ があれば、$z$ にも Step 2 の横断線を置けます。元の軌道は $q$ の近傍と $z$ の近傍を無限回往復する必要があります。そのたびに $C$ の十分細い管状近傍の横断線を、内側から外側へ、次には外側から内側へと逆向きに通過しなければなりません。しかし Step 3 の Jordan 交差順序は、同じ横断線で将来交点の向きと順序が反転することを禁じます。矛盾です。

従って $\Omega$ に $C$ 以外の点はなく、

$$
\omega(x_0)=C.
$$

すなわち正の極限集合は周期軌道です。
<!-- proof-end -->

一般次元では横断面が高次元になり、横断面上の一点列にこの一次元的な順序を入れられません。Jordan 曲線による「内側・外側」の分離もそのまま使えないため、同じ結論は成立しません。

## 5. Lotka--Volterra：閉軌道が孤立しない例

$$
x'=x(1-y),
\qquad
y'=y(x-1),
\qquad x,y>0
$$

に対し

$$
H(x,y)=x-\log x+y-\log y
$$

と置くと

$$
H_x=1-\frac1x,
\qquad
H_y=1-\frac1y.
$$

よって

$$
\dot H
=
(x-1)(1-y)+(y-1)(x-1)=0.
$$

$(1,1)$ のまわりでは $H$ の等高線が閉曲線になり、軌道はその上を動きます。周期軌道は存在しますが連続族なので極限周期軌道ではありません。

## 6. van der Pol：孤立周期軌道の代表

$$
x''-\mu(1-x^2)x'+x=0,
\qquad \mu>0
$$

では小振幅と大振幅で有効な減衰の向きが変わり、振幅を中間へ押し戻す機構があります。極限周期軌道の存在一意性を一般の Liénard 定理から閉じる理論は本章の停止線外とし、次章では周期軌道が与えられた後の安定性を局所帰還写像で調べます。

## 演習

### Level A

#### ODE10-A01 中心の周期軌道
- Level: A

$x'=-y$, $y'=x$ の非零軌道が周期軌道であることを示せ。

<!-- solution-start -->
##### 詳細解答
$r^2=x^2+y^2$ を微分すると0。解は $(x,y)=(r\cos(t+\theta),r\sin(t+\theta))$ で周期 $2\pi$ です。
<!-- solution-end -->

#### ODE10-A02 Bendixson 判定
- Level: A

$x'=x-y$, $y'=x+y$ が周期軌道を持たないことを示せ。

<!-- solution-start -->
##### 詳細解答
発散は $1+1=2>0$。$B=1$ とした [Bendixson--Dulac の判定](#thm-ode10-bendixson-dulac)から全平面に周期軌道は存在しません。
<!-- solution-end -->

#### ODE10-A03 Lotka--Volterra
- Level: A

本文の $H$ が保存されることを直接確認せよ。

<!-- solution-start -->
##### 詳細解答
$\dot H=(1-1/x)x(1-y)+(1-1/y)y(x-1)=(x-1)(1-y)+(y-1)(x-1)=0$ です。
<!-- solution-end -->

#### ODE10-A04 trapping region
- Level: A

閉円板の境界でベクトル場が常に厳密に内向きなら、その円板が正方向不変である理由を説明せよ。

<!-- solution-start -->
##### 詳細解答
最初に外へ出る時刻があるなら、その境界到達時に速度は外向き成分を持つ必要があります。しかし仮定では境界上の速度は厳密に内向きで矛盾します。
<!-- solution-end -->

### Level B

#### ODE10-B01 Dulac 関数
- Level: B

$x'=x(1-x-y)$, $y'=y(2-x-y)$ を正の第一象限で考える。$B=1/(xy)$ を用いて周期軌道がないことを示せ。

<!-- solution-start -->
##### 詳細解答
$BP=(1-x-y)/y$, $BQ=(2-x-y)/x$。従って
$$
\partial_x(BP)+\partial_y(BQ)
=-\frac1y-\frac1x<0.
$$
第一象限内の単純閉曲線が囲む領域も第一象限に含まれるので [Bendixson--Dulac の判定](#thm-ode10-bendixson-dulac)を適用できます。
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
上で示した結果により正の極限集合は周期軌道です。平面・コンパクト性・[平衡解](../ODE1/index.md#def-ode1-equilibrium)不在が重要な条件です。
<!-- solution-end -->

### Level C

#### ODE10-C01 存在と不存在の道具
- Level: C

trapping region、Poincaré--Bendixson、Bendixson--Dulac をどのように使い分けるか説明せよ。

<!-- solution-start -->
##### 詳細解答
周期軌道の存在を狙うなら前向き軌道を trapping region に閉じ込め、その正の極限集合から[平衡解](../ODE1/index.md#def-ode1-equilibrium)を排除して Poincaré--Bendixson を使います。不存在を狙うなら発散または Dulac 関数で符号一定性を作り、[Green の定理（流束形）](../VC4/index.md#cor-vc4-green-flux)から矛盾を出します。前者は存在側、後者は不存在側の道具です。
<!-- solution-end -->

## 7. 章末チェック

- 周期軌道と極限周期軌道を区別できる。
- trapping region の役割を説明できる。
- Bendixson--Dulac を [Green の定理（流束形）](../VC4/index.md#cor-vc4-green-flux)から証明できる。
- Poincaré--Bendixson の仮定と平面特有の機構を説明できる。
