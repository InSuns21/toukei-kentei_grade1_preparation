# ODE9 非線形安定性・不変集合・単調量

<!-- definition-example-audit: strict -->

ODE4 では線形化行列が Hurwitz の場合に局所安定性を証明しました。しかし非双曲型では線形化だけでは判定できません。そこで、軌道全体を一つのスカラー量で測ります。

$$
V\ge0,
\qquad
\frac d{dt}V(x(t))\le0
$$

となる量を作れば、軌道は高い値の側へ戻れません。前章 [ODE8](../ODE8/index.md) の最大解と流れを使い、この考えを定理にします。

## 1. 軌道に沿って減る関数

<a id="def-ode9-lyapunov"></a>
<!-- formal-statement-start -->
> **定義（Lyapunov 関数）**  
> 自律系 $x'=F(x)$ の[平衡解](../ODE1/index.md#def-ode1-equilibrium) $x_*$ の近傍で $V\in C^1$ とする。$V(x_*)=0$ かつ $V(x)>0$ $(x\ne x_*)$ なら $V$ を $x_*$ で正定値という。さらに

$$
\dot V(x):=\nabla V(x)\cdot F(x)
$$

> が $\dot V\le0$ を満たすとき、$V$ を Lyapunov 関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode9-lyapunov -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：$x'=-x^3$

$V=x^2/2$ なら

$$
\dot V=x(-x^3)=-x^4.
$$

線形化は $x'=0$ で判定不能ですが、三次項の符号から $V$ は原点以外で厳密に減ります。
<!-- definition-example-end -->

## 2. 単調量から安定性を証明する

<a id="thm-ode9-direct"></a>
<!-- formal-statement-start -->
> **定理（Lyapunov の直接法）**  
> $x_*=0$ とする。ある近傍で $V\in C^1$ が正定値で $\dot V\le0$ なら原点は Lyapunov 安定である。さらに $\dot V(x)<0$ が全ての $x\ne0$ で成り立つなら原点は局所漸近安定である。
<!-- formal-statement-end -->

### 証明の見取り図

小さい球面上で $V$ の正の最小値を取り、その値より低い劣位集合を球内へ閉じ込めます。漸近安定性では、原点から離れたコンパクト環状領域上で $\dot V$ が一様に負になることを使います。

<!-- proof-start -->
### 証明

$V$ と $\dot V$ が定義される近傍の内部に閉球 $\overline{B_r(0)}$ が入るよう、十分小さい $r>0$ を取ります。正定値性と球面のコンパクト性から

$$
m_r
=
\min_{\|x\|=r}V(x)
>0.
$$

$0<c<m_r$ を固定し、

$$
K
=
\{x\in\overline{B_r(0)}:V(x)\le c\}
$$

と置きます。$V(0)=0$ と連続性から、ある $\delta_0>0$ が存在して

$$
B_{\delta_0}(0)\subset\{V<c\}\cap B_r(0)
$$

となります。

$\|x(0)\|<\delta_0$ なら、軌道上で $\dot V\le0$ なので

$$
V(x(t))
\le
V(x(0))
<c.
$$

もし軌道が初めて球面 $\|x\|=r$ に達する時刻があれば、その点では $V\ge m_r>c$ となって矛盾します。従って軌道は $B_r(0)$ に留まり、任意に小さい $r$ について同じ構成ができるので原点は Lyapunov 安定です。

次に $\dot V(x)<0$ $(x\ne0)$ と仮定します。局所吸引性まで示すため、上で固定したコンパクト集合 $K$ 内から出発する軌道を考えます。任意の $0<\varepsilon<r$ を取ります。既に示した Lyapunov 安定性を、目標半径 $\varepsilon$ に対して使うと、ある $0<\delta<\varepsilon$ が存在して

$$
\|x(t_0)\|<\delta
\quad\Longrightarrow\quad
\|x(t)\|<\varepsilon
\qquad (t\ge t_0)
$$

となります。自律系なので、安定性は任意の開始時刻 $t_0$ から同じように使えます。

一方、

$$
K_\delta
=
K\cap\{\|x\|\ge\delta\}
$$

はコンパクトで、$\dot V$ はその上で連続かつ厳密に負です。よってある $\eta>0$ が存在して

$$
\dot V(x)\le-\eta
\qquad (x\in K_\delta)
$$

となります。

軌道が一度も $B_\delta(0)$ に入らないと仮定すると、正方向不変な $K$ の中で常に $K_\delta$ に留まるので

$$
V(x(t))
=
V(x(0))
+
\int_0^t\dot V(x(s))\,ds
\le
V(x(0))-\eta t.
$$

右辺は十分大きい $t$ で負になりますが、$V\ge0$ に反します。従ってある時刻 $t_0$ で $\|x(t_0)\|<\delta$ となり、その後は安定性により $\|x(t)\|<\varepsilon$ が続きます。

$\varepsilon>0$ は任意なので

$$
x(t)\to0
\qquad (t\to\infty).
$$

以上より、十分原点に近い初期値に対して安定性と吸引性の両方が成り立ち、原点は局所漸近安定です。
<!-- proof-end -->

## 3. 劣位集合は不変領域になる

<a id="def-ode9-positive-invariant"></a>
<!-- formal-statement-start -->
> **定義（正方向不変集合）**  
> 集合 $K$ が正方向不変であるとは、$x_0\in K$ から出る解について、存在する全ての $t\ge0$ で $\Phi_t(x_0)\in K$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode9-positive-invariant -->
**定義の確認**：以下で定義の条件を直接確認します。

$\dot V\le0$ なら任意の劣位集合 $\{V\le c\}$ は正方向不変です。軌道上で $V$ が増えないため、境界値 $c$ を上へ越えられません。
<!-- definition-example-end -->

## 4. 長時間の行き先を集合で捉える

<a id="def-ode9-omega-limit"></a>
<!-- formal-statement-start -->
> **定義（正の極限集合）**  
> 前向きに存在する軌道 $x(t)$ に対し、

$$
\omega(x_0)
=
\{y:\ t_n\to\infty\text{ で }x(t_n)\to y\text{ となる列が存在する}\}
$$

> を正の極限集合という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode9-omega-limit -->
**定義の確認**：$x'=-x$, $x(0)=x_0$ とすると $x(t)=x_0e^{-t}$ です。任意の $t_n\to\infty$ について $x(t_n)\to0$ なので

$$
\omega(x_0)=\{0\}.
$$

実際、定義に必要な「$t_n\to\infty$ に沿う極限」は0だけで、0は例えば $t_n=n$ で実現します。
<!-- definition-example-end -->

有界軌道なら有限次元のコンパクト性から正の極限集合は空でありません。ODE8 の連続依存を使うと極限集合は流れで不変になります。

## 5. 減少が止まる集合から長時間挙動を読む

<a id="thm-ode9-lasalle"></a>
<!-- formal-statement-start -->
> **定理（LaSalle の不変性原理）**  
> $K$ をコンパクトな正方向不変集合とし、$V\in C^1$ が $K$ 上で $\dot V\le0$ を満たすとする。

$$
E=\{x\in K:\dot V(x)=0\}
$$

> と置き、$M$ を $E$ に含まれる最大の不変集合とする。このとき任意の $x_0\in K$ について

$$
\operatorname{dist}(x(t),M)\to0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$V(x(t))$ は単調かつ下に有界なので極限を持ちます。正の極限集合上では $V$ がその極限値で一定になり、従って $\dot V=0$。さらに極限集合は不変なので $M$ に含まれます。

<!-- proof-start -->
### 証明

まず $K$ がコンパクトかつ正方向不変なので、$x_0\in K$ から出る解は前向きに $K$ から出ません。もし有限の最大存在時刻を持てば、軌道がコンパクト集合 $K$ に留まり続けることが [ODE8 の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation) に反します。従って解は全ての $t\ge0$ で存在します。

$K$ 上で $V$ は下に有界で、軌道上で非増加なので

$$
V(x(t))\downarrow\ell
$$

となる $\ell$ が存在します。また任意の列 $t_n\to\infty$ から、コンパクト性により $x(t_n)$ の収束部分列を取れるので、$\omega(x_0)$ は空でありません。

次に $\omega(x_0)$ の不変性を確認します。$y\in\omega(x_0)$ とし、

$$
x(t_n)\to y,
\qquad
t_n\to\infty
$$

とします。固定した $s\ge0$ について、[初期値に関する連続依存](../ODE8/index.md#thm-ode8-continuous-dependence) と流れの合成則から

$$
x(t_n+s)
=
\Phi_s(x(t_n))
\to
\Phi_s(y).
$$

したがって $\Phi_s(y)\in\omega(x_0)$ です。

逆向きについては、固定した $s>0$ に対し十分大きい $n$ で $t_n-s\ge0$ です。列 $x(t_n-s)$ は $K$ にあるので、部分列を取って

$$
x(t_{n_k}-s)\to z\in\omega(x_0)
$$

とできます。連続依存性により

$$
\Phi_s(z)
=
\lim_{k\to\infty}
\Phi_s(x(t_{n_k}-s))
=
\lim_{k\to\infty}x(t_{n_k})
=
y.
$$

従って $\omega(x_0)$ 上では任意の前向き時間写像 $\Phi_s$ が全射であり、一意性から単射でもあります。よって各点を過去向きにも $\omega(x_0)$ 内でたどれ、$\omega(x_0)$ は流れに関して不変です。

ここで $y\in\omega(x_0)$ とします。連続性から $V(y)=\ell$ です。さらに任意の $s\ge0$ について $\Phi_s(y)\in\omega(x_0)$ なので

$$
V(\Phi_s(y))=\ell.
$$

従って軌道 $s\mapsto\Phi_s(y)$ 上で $V$ は一定であり、$s=0$ で微分して

$$
\dot V(y)=0.
$$

ゆえに

$$
\omega(x_0)\subset E.
$$

しかも $\omega(x_0)$ 自身が不変集合なので、$E$ に含まれる最大不変集合 $M$ の定義から

$$
\omega(x_0)\subset M.
$$

最後に、もし $\operatorname{dist}(x(t),M)$ が0へ収束しなければ、ある $\varepsilon>0$ と $t_n\to\infty$ が存在して

$$
\operatorname{dist}(x(t_n),M)\ge\varepsilon
$$

となります。コンパクトな $K$ から部分列を取れば $x(t_{n_k})\to y\in\omega(x_0)\subset M$ です。距離関数の連続性から

$$
\operatorname{dist}(x(t_{n_k}),M)\to0
$$

となり矛盾します。従って

$$
\operatorname{dist}(x(t),M)\to0.
$$
<!-- proof-end -->

## 6. 減衰振動子

$$
x'=v,
\qquad
v'=-x-\gamma v,
\qquad \gamma>0
$$

に

$$
V(x,v)=\frac12(x^2+v^2)
$$

を使うと

$$
\dot V=-\gamma v^2.
$$

$\dot V=0$ は $v=0$ 全体ですが、その集合に軌道が留まるには $v'=-x=0$ も必要です。従って最大不変集合は原点だけ。LaSalle により原点へ収束します。

## 演習

### Level A

#### ODE9-A01 三次減衰
- Level: A

$x'=-x^3$ に対して $V=x^2/2$ の軌道微分を求めよ。

<!-- solution-start -->
##### 詳細解答
$\dot V=xx'=-x^4\le0$。原点以外では厳密に負です。
<!-- solution-end -->

#### ODE9-A02 劣位集合
- Level: A

$\dot V\le0$ なら $\{V\le c\}$ が正方向不変であることを示せ。

<!-- solution-start -->
##### 詳細解答
$V(x(t))\le V(x(0))\le c$ が全ての将来時刻で成り立つためです。
<!-- solution-end -->

#### ODE9-A03 減衰振動子
- Level: A

減衰振動子で $V=(x^2+v^2)/2$ の微分を求めよ。

<!-- solution-start -->
##### 詳細解答
$\dot V=xv+v(-x-\gamma v)=-\gamma v^2$ です。
<!-- solution-end -->

#### ODE9-A04 ポテンシャル降下系
- Level: A

$x'=-\nabla U(x)$ に対して $U(x(t))$ の微分を求めよ。

<!-- solution-start -->
##### 詳細解答
連鎖律から $dU/dt=\nabla U\cdot x'=-\|\nabla U\|^2\le0$ です。
<!-- solution-end -->

### Level B

#### ODE9-B01 直接法
- Level: B

$x'=-x-x^3$ の原点が漸近安定であることを示せ。

<!-- solution-start -->
##### 詳細解答
$V=x^2/2$ は正定値で $\dot V=-x^2-x^4<0$ $(x\ne0)$。Lyapunov の直接法を適用します。
<!-- solution-end -->

#### ODE9-B02 LaSalle
- Level: B

減衰振動子で $\dot V=0$ の集合と、その中の最大不変集合を求めよ。

<!-- solution-start -->
##### 詳細解答
零集合は $v=0$。そこに留まるには $v'=-x=0$ も必要なので最大不変集合は $(0,0)$ のみです。
<!-- solution-end -->

#### ODE9-B03 吸引領域
- Level: B

$x'=-x(1-x^2)$ について $|x_0|<1$ の解の挙動を $V=x^2/2$ で調べよ。

<!-- solution-start -->
##### 詳細解答
$\dot V=-x^2(1-x^2)<0$ は $0<|x|<1$ で成り立ちます。$|x|<1$ の適切な閉劣位集合は正方向不変で、零集合の内部は原点だけなので原点へ収束します。
<!-- solution-end -->

### Level C

#### ODE9-C01 非線形減衰振動子
- Level: C

$x'=y$, $y'=-x-y^3$ について $V=(x^2+y^2)/2$ を用いて原点への収束を示せ。

<!-- solution-start -->
##### 詳細解答
$\dot V=xy+y(-x-y^3)=-y^4\le0$。初期エネルギー以下の劣位集合は閉有界でコンパクトかつ正方向不変。$\dot V=0$ は $y=0$ で、その中に留まるには $y'=-x=0$ が必要です。最大不変集合は原点のみなので LaSalle により原点へ収束します。
<!-- solution-end -->

## 7. 章末チェック

- Lyapunov 関数と軌道微分を計算できる。
- 直接法の証明を劣位集合から再構成できる。
- 正の極限集合の意味を説明できる。
- $\dot V\le0$ しか得られないとき LaSalle を使える。
