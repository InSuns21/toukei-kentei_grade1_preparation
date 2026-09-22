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

ODE9 の Lyapunov 劣位集合は trapping region を作る代表的な方法です.

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

周期軌道 $C$ が存在すると仮定し、その内部を $\Omega$ とします。軌道上の速度は $(P,Q)$ に平行なので $(BP,BQ)$ も接線方向です。外向き単位法線 $n$ に対し

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

この定理の幾何核心には、平面の単純閉曲線が内外を分ける **Jordan 曲線定理**が必要です。現行 prerequisite には Jordan 曲線定理の canonical owner がないため、本章ではそこを意図的な幾何入力として明示します。

力学系側の機構は次の通りです。

1. コンパクト性から正の極限集合は空でない。
2. ODE の一意性により平面軌道は横断的に自己交差できない。
3. [平衡解](../ODE1/index.md#def-ode1-equilibrium)がなければ極限集合の点に短い横断線を置ける。
4. 同じ軌道の繰り返し交差は横断線上で順序を持つ。
5. Jordan 曲線定理で挟まれた領域を使うと、交点列の極限から閉軌道が得られる。

一般次元では横断面が高次元になり、この一次元的な順序構造が失われるため、同じ結論は成立しません。

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
周期軌道の存在を狙うなら前向き軌道を trapping region に閉じ込め、その正の極限集合から[平衡解](../ODE1/index.md#def-ode1-equilibrium)を排除して Poincaré--Bendixson を使います。不存在を狙うなら発散または Dulac 関数で符号一定性を作り、[Green の定理（循環形）](../VC4/index.md#thm-vc4-green-circulation)から矛盾を出します。前者は存在側、後者は不存在側の道具です。
<!-- solution-end -->

## 7. 章末チェック

- 周期軌道と極限周期軌道を区別できる。
- trapping region の役割を説明できる。
- Bendixson--Dulac を [Green の定理（循環形）](../VC4/index.md#thm-vc4-green-circulation)から証明できる。
- Poincaré--Bendixson の仮定と平面特有の機構を説明できる。
