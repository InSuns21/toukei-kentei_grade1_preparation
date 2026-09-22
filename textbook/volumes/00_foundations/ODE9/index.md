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
> 自律系 $x'=F(x)$ の平衡点 $x_*$ の近傍で $V\in C^1$ とする。$V(x_*)=0$ かつ $V(x)>0$ $(x\ne x_*)$ なら $V$ を $x_*$ で正定値という。さらに

$$
\dot V(x):=\nabla V(x)\cdot F(x)
$$

> が $\dot V\le0$ を満たすとき、$V$ を Lyapunov 関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode9-lyapunov -->
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

十分小さい $r>0$ を取り、

$$
m_r=\min_{\|x\|=r}V(x)>0
$$

とします。$0<c<m_r$ を固定します。原点近くでは連続性から $V(x)<c$ です。

$V(x(0))<c$ なら $\dot V\le0$ より

$$
V(x(t))\le V(x(0))<c.
$$

従って軌道は $\|x\|=r$ へ到達できず、Lyapunov 安定です。

次に $\dot V<0$ とします。$K=\{V\le c\}$ を十分小さく取り、$0<\varepsilon<r$ に対して

$$
K_\varepsilon=K\cap\{\|x\|\ge\varepsilon\}
$$

を考えます。これはコンパクトで、連続関数 $\dot V$ はその上で厳密に負です。従ってある $\eta>0$ があり $\dot V\le-\eta$。

軌道が永遠に $K_\varepsilon$ に留まるなら

$$
V(x(t))\le V(x(0))-\eta t
$$

となり、やがて $V<0$ となって正定値性に反します。よって軌道は任意の $\varepsilon$ 球へ入ります。既に示した安定性により、その後も原点近くに留まるので $x(t)\to0$ です。
<!-- proof-end -->

## 3. 劣位集合は不変領域になる

<a id="def-ode9-positive-invariant"></a>
<!-- formal-statement-start -->
> **定義（正方向不変集合）**  
> 集合 $K$ が正方向不変であるとは、$x_0\in K$ から出る解について、存在する全ての $t\ge0$ で $\Phi_t(x_0)\in K$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode9-positive-invariant -->
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

$K$ 上で $V$ は下に有界で、軌道上で非増加なので

$$
V(x(t))\downarrow\ell
$$

となる $\ell$ が存在します。

$y\in\omega(x_0)$ を取り $x(t_n)\to y$ とします。連続性から $V(y)=\ell$。固定した $s\ge0$ について ODE8 の流れの連続性と合成則から

$$
x(t_n+s)=\Phi_s(x(t_n))\to\Phi_s(y).
$$

左辺の $V$ 値も $\ell$ へ収束するため $V(\Phi_s(y))=\ell$。従って $s=0$ で微分して $\dot V(y)=0$ です。また $\Phi_s(y)$ も同じ極限集合に属するので、$\omega(x_0)$ は $E$ に含まれる不変集合です。従って $\omega(x_0)\subset M$。

もし $\operatorname{dist}(x(t),M)$ が0へ収束しなければ、ある $\varepsilon>0$ と $t_n\to\infty$ があり距離が $\varepsilon$ 以上です。コンパクトな $K$ から部分列を取ると $x(t_n)\to y\in\omega(x_0)\subset M$ となり矛盾します。
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
$\dot V=-x^2(1-x^2)<0$ for $0<|x|<1$。$|x|<1$ の適切な閉劣位集合は正方向不変で、零集合の内部は原点だけなので原点へ収束します。
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
