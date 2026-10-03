# ODE9 Lyapunov 関数・不変集合・LaSalle

<!-- definition-example-audit: strict -->

ODE4 では線形化行列が Hurwitz の場合に局所安定性を証明しました。しかし非双曲型では線形化だけでは判定できません。そこで、軌道全体を一つのスカラー量で測ります。

$$
V\ge0,
\qquad
\frac d{dt}V(x(t))\le0
$$

となる量を作れば、軌道は高い値の側へ戻れません。前章 [ODE8](../ODE8/index.md) の最大解と流れを使い、この考えを定理にします。

## 1. 軌道に沿って減る関数

非双曲型では、Jacobian の一次項を見ても安定性が決まらないことがあります。そこで解を明示的に求める代わりに、「原点からの大きさ」を表すスカラー量 $V$ を作り、その量が軌道に沿って増えないことを調べます。$V$ が原点でだけ0になり、周囲では正なら、$V$ の小さい領域を原点の近くへ閉じ込められます。

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
> $F$ を原点の近傍で局所 Lipschitz とし、$F(0)=0$ とする。ある近傍で $V\in C^1$ が正定値で $\dot V\le0$ なら原点は Lyapunov 安定である。さらに同じ近傍で $\dot V(x)<0$ が全ての $x\ne0$ に対して成り立つなら原点は局所漸近安定である。
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

ここで後半に使う $K$ の不変性も確認しておきます。任意の $x(0)\in K$ について

$$
V(x(t))\le V(x(0))\le c
$$

である限り、$V=c$ の外へ出ることはできません。また球面 $\|x\|=r$ では $V\ge m_r>c$ なので、そこへ到達することもできません。従って

$$
x(0)\in K
\quad\Longrightarrow\quad
x(t)\in K
$$

が解の存在する全ての $t\ge0$ で成り立ちます。つまり、$K$ から出発した軌道は将来 $K$ の外へ出ません。この性質には次節で名前を付けます。

さらに $K$ は局所 Lipschitz 領域の内部にあるコンパクト集合なので、もし最大存在時刻が有限なら軌道が $K$ に留まり続けることが [最大解の延長判定](../ODE8/index.md#thm-ode8-continuation) に反します。従って $K$ から出発する解は全ての $t\ge0$ で存在します。

次に $\dot V(x)<0$ $(x\ne0)$ と仮定します。局所吸引性まで示すため、上で固定したコンパクト集合 $K$ から出ずに進む軌道を考えます。任意の $0<\varepsilon<r$ を取ります。既に示した Lyapunov 安定性を、目標半径 $\varepsilon$ に対して使うと、ある $0<\delta<\varepsilon$ が存在して

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

を考えます。もし $K_\delta=\varnothing$ なら $K\subset B_\delta(0)$ なので、軌道はすでに目標の小球へ入っており吸引性は従います。以下 $K_\delta\ne\varnothing$ とします。

$K_\delta$ はコンパクトです。また $F$ は局所 Lipschitz なので連続、$V\in C^1$ なので

$$
\dot V(x)=\nabla V(x)\cdot F(x)
$$

も連続です。しかも $K_\delta$ 上で厳密に負なので、その最大値は負です。従ってある $\eta>0$ が存在して

$$
\dot V(x)\le-\eta
\qquad (x\in K_\delta)
$$

となります。

軌道が一度も $B_\delta(0)$ に入らないと仮定すると、すでに示したとおり軌道は $K$ から出ないので、常に $K_\delta$ に留まります。従って

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

前節では「一度ある集合に入った軌道が将来そこから出ない」という性質を実際に使いました。この性質を切り出しておくと、Lyapunov 関数から作った劣位集合を、長時間挙動を調べるための閉じた舞台として扱えます。

<a id="def-ode9-positive-invariant"></a>
<!-- formal-statement-start -->
> **定義（正方向不変集合）**  
> 集合 $K$ が正方向不変であるとは、$x_0\in K$ から出る解について、存在する全ての $t\ge0$ で $\Phi_t(x_0)\in K$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode9-positive-invariant -->
**定義の確認**：以下で定義の条件を直接確認します。

$\dot V\le0$ とし、$x(0)$ が劣位集合 $\{V\le c\}$ に入っているとします。[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
\frac d{dt}V(x(t))=\dot V(x(t))\le0
$$

なので、解が存在する間

$$
V(x(t))\le V(x(0))\le c.
$$

従って $x(t)$ は $\{V\le c\}$ から出ません。これで定義の条件を直接確認でき、劣位集合は正方向不変です。
<!-- definition-example-end -->

## 4. 長時間の行き先を集合で捉える

$V(x(t))$ が減ることだけでは、$x(t)$ 自身が一点へ収束するとは限りません。周期運動や複数の極限点を持つ可能性もあるため、「十分長い時刻の部分列に沿って到達できる点」をまとめて集合として捉えます。

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

有界軌道なら、例えば時刻列 $t_n=n$ に沿う点列 $(x(n))$ も有界です。有限次元では有界列から収束部分列を取れるため、正の極限集合は空ではありません。さらに ODE8 の連続依存を使うと、極限集合そのものが時間発展で保たれることを後で証明できます。

## 5. 減少が止まる集合から長時間挙動を読む

$\dot V\le0$ しか分からない場合、$\dot V=0$ となる点が原点以外にも多数あるかもしれません。そこで零集合を全部「極限先」とみなすのではなく、**その零集合の中に軌道全体が留まり続けられる部分だけ**を取り出します。

本節で集合 $M$ が **不変** であるとは、各 $x\in M$ から出る最大解が全ての $t\in\mathbb R$ で存在し、

$$
\Phi_t(x)\in M
\qquad(t\in\mathbb R)
$$

となることをいいます。言い換えると、正の時間だけでなく負の時間へたどっても $M$ の中に留まります。LaSalle の定理では、$\dot V=0$ の集合に含まれる不変集合のうち包含関係で最大のものを使います。

<a id="thm-ode9-lasalle"></a>
<!-- formal-statement-start -->
> **定理（LaSalle の不変性原理）**  
> 開集合 $D\subset\mathbb R^d$ 上で $F:D\to\mathbb R^d$ を局所 Lipschitz とする。$K\subset D$ をコンパクトな正方向不変集合とし、$V$ は $K$ の近傍で $C^1$ 級かつ $K$ 上で $\dot V\le0$ を満たすとする。

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

とします。固定した $s\ge0$ を取ります。$y\in\omega(x_0)\subset K$ です。$K$ は正方向不変なので、$y$ から出る解は存在する限り $K$ から出ません。もし有限の最大存在時刻を持てば、コンパクト集合 $K$ に留まり続けることが ODE8 の[最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)に反するので、$y$ からの解は全ての正時間で存在します。

次に連続依存を使うため、$K$ 全体で使える Lipschitz 定数を作ります。各 $z\in K$ について、ある $r_z>0$ と $L_z>0$ を取り、

$$
B(z,2r_z)\subset D
$$

かつ $F$ が $B(z,2r_z)$ 上で Lipschitz 定数 $L_z$ を持つようにできます。小さい球 $B(z,r_z)$ は $K$ を覆うので、コンパクト性から有限個

$$
B(z_1,r_1),\ldots,B(z_N,r_N)
$$

で $K$ を覆えます。ここで

$$
\delta:=\min_{1\le i\le N}r_i>0,
\qquad
L_0:=\max_{1\le i\le N}L_{z_i}
$$

と置きます。

$z_1',z_2'\in K$ が $\|z_1'-z_2'\|<\delta$ を満たすとします。$z_1'$ を含む小球 $B(z_i,r_i)$ を一つ選べば

$$
\|z_2'-z_i\|
\le
\|z_2'-z_1'\|+\|z_1'-z_i\|
<
\delta+r_i
\le
2r_i.
$$

従って二点とも $B(z_i,2r_i)$ に入り、

$$
\|F(z_1')-F(z_2')\|
\le
L_0\|z_1'-z_2'\|.
$$

一方 $\|z_1'-z_2'\|\ge\delta$ なら、連続な $F$ はコンパクトな $K$ 上で有界なので

$$
M_F:=\max_{z\in K}\|F(z)\|<\infty
$$

と置けて、

$$
\|F(z_1')-F(z_2')\|
\le
2M_F
\le
\frac{2M_F}{\delta}\|z_1'-z_2'\|.
$$

従って

$$
L_K:=\max\left\{L_0,\frac{2M_F}{\delta}\right\}
$$

は $K$ 全体で使える Lipschitz 定数です。

$x(t_n)\to y$ なので、[初期値に関する連続依存](../ODE8/index.md#thm-ode8-continuous-dependence)を $L=L_K$ として $[0,s]$ に適用でき、[流れの合成則](../ODE8/index.md#prop-ode8-flow-law) と合わせると

$$
\begin{aligned}
x(t_n+s)
&=
\Phi_s(x(t_n)),\\
\Phi_s(x(t_n))
&\to
\Phi_s(y).
\end{aligned}
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

しかも $\omega(x_0)$ 自身が不変集合なので、$E$ に含まれる不変集合を全て含む $M$ の取り方から

$$
\omega(x_0)\subset M.
$$

最後に、もし $\operatorname{dist}(x(t),M)$ が0へ収束しなければ、ある $\varepsilon>0$ と $t_n\to\infty$ が存在して

$$
\operatorname{dist}(x(t_n),M)\ge\varepsilon
$$

となります。コンパクトな $K$ から部分列を取れば $x(t_{n_k})\to y\in\omega(x_0)\subset M$ です。[距離空間](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)では距離関数は連続なので

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

$\dot V=0$ は $v=0$ 全体です。ただし $v=0$ かつ $x\ne0$ の点から出発すると

$$
v'=-x\ne0
$$

なので、直後に $v=0$ の集合から出ます。従って $\{\dot V=0\}$ の中に留まり続けられる最大不変集合は原点だけです。

LaSalle を適用するコンパクト集合も確認します。初期値 $(x_0,v_0)$ に対して

$$
c:=V(x_0,v_0)
$$

と置けば、

$$
K_c
=
\{(x,v):V(x,v)\le c\}
=
\{(x,v):x^2+v^2\le2c\}
$$

は閉有界なのでコンパクトです。また $\dot V\le0$ だから正方向不変です。従って [LaSalle の不変性原理](#thm-ode9-lasalle) を $K=K_c$ に適用でき、

$$
\operatorname{dist}((x(t),v(t)),\{(0,0)\})\to0.
$$

したがって

$$
(x(t),v(t))\to(0,0).
$$

## 演習

### Level A

#### ODE9-A01 三次減衰
- Level: A

$x'=-x^3$ に対して $V=x^2/2$ の軌道微分を求めよ。

<!-- solution-start -->
##### 詳細解答

$V(x)=x^2/2$ なので $V'(x)=x$ です。軌道 $x(t)$ に[連鎖律](../RA3/index.md#prop-ra3-chain-rule)を使うと

$$
\dot V(x(t))
=
V'(x(t))x'(t).
$$

方程式 $x'=-x^3$ を代入して

$$
\boxed{
\dot V=x(-x^3)=-x^4\le0
}.
$$

$x\ne0$ なら $x^4>0$ なので $\dot V<0$ です。
<!-- solution-end -->

#### ODE9-A02 劣位集合
- Level: A

$\dot V\le0$ なら $\{V\le c\}$ が正方向不変であることを示せ。

<!-- solution-start -->
##### 詳細解答

初期値 $x(0)$ が $\{V\le c\}$ にあるとします。軌道に沿って

$$
\frac d{dt}V(x(t))
=
\dot V(x(t))
\le0
$$

なので、$V(x(t))$ は非増加です。従って解が存在する全ての $t\ge0$ で

$$
V(x(t))
\le
V(x(0))
\le c.
$$

よって $x(t)\in\{V\le c\}$ が保たれ、定義どおりこの劣位集合は正方向不変です。
<!-- solution-end -->

#### ODE9-A03 減衰振動子
- Level: A

減衰振動子で $V=(x^2+v^2)/2$ の微分を求めよ。

<!-- solution-start -->
##### 詳細解答

$$
V(x,v)=\frac12(x^2+v^2)
$$

なので

$$
\nabla V=(x,v).
$$

方程式の右辺を

$$
F(x,v)=(v,-x-\gamma v)
$$

と書きます。従って軌道微分は

$$
\begin{aligned}
\dot V
&=
\nabla V\cdot F\\
&=
xv+v(-x-\gamma v)\\
&=
\boxed{-\gamma v^2\le0}.
\end{aligned}
$$

$xv$ と $-xv$ が相殺し、減衰項だけがエネルギーを減らします。
<!-- solution-end -->

#### ODE9-A04 ポテンシャル降下系
- Level: A

$x'=-\nabla U(x)$ に対して $U(x(t))$ の微分を求めよ。

<!-- solution-start -->
##### 詳細解答

$U$ が $C^1$ 級であるとします。軌道 $x(t)$ に[連鎖律](../RA3/index.md#prop-ra3-chain-rule)を適用すると

$$
\frac d{dt}U(x(t))
=
\nabla U(x(t))\cdot x'(t).
$$

方程式

$$
x'(t)=-\nabla U(x(t))
$$

を代入して

$$
\boxed{
\frac d{dt}U(x(t))
=
-\|\nabla U(x(t))\|^2
\le0
}.
$$

従ってこの系では $U$ 自身が軌道に沿う単調量になります。
<!-- solution-end -->

### Level B

#### ODE9-B01 直接法
- Level: B

$x'=-x-x^3$ の原点が漸近安定であることを示せ。

<!-- solution-start -->
##### 詳細解答

右辺

$$
F(x)=-x-x^3
$$

は多項式なので局所 Lipschitz で、$F(0)=0$ です。

$$
V(x)=\frac12x^2
$$

を取ると、$V(0)=0$ かつ $x\ne0$ では $V(x)>0$ なので正定値です。さらに

$$
\begin{aligned}
\dot V
&=
V'(x)F(x)\\
&=
x(-x-x^3)\\
&=
-x^2-x^4.
\end{aligned}
$$

$x\ne0$ なら

$$
\dot V=-x^2(1+x^2)<0.
$$

これで [Lyapunov の直接法](#thm-ode9-direct) の「局所 Lipschitz」「平衡点」「$V$ の正定値性」「原点以外で $\dot V<0$」を全て確認できました。従って

$$
\boxed{0\text{ は局所漸近安定}}
$$

です。
<!-- solution-end -->

#### ODE9-B02 LaSalle
- Level: B

減衰振動子で $\dot V=0$ の集合と、その中の最大不変集合を求めよ。

<!-- solution-start -->
##### 詳細解答

本文で

$$
\dot V=-\gamma v^2
$$

と求めたので、

$$
E=\{(x,v):\dot V=0\}
=
\{(x,v):v=0\}.
$$

次に $E$ の中に軌道全体が留まれる点を調べます。$v=0$ 上では

$$
x'=v=0,
\qquad
v'=-x.
$$

$x\ne0$ なら $v'=-x\ne0$ なので、時刻を少し進めると $v$ が0でなくなり $E$ から出ます。一方 $(x,v)=(0,0)$ では両微分が0で、その点に留まり続けます。

したがって $E$ に含まれる最大不変集合は

$$
\boxed{M=\{(0,0)\}}.
$$
<!-- solution-end -->

#### ODE9-B03 吸引領域
- Level: B

$x'=-x(1-x^2)$ について $|x_0|<1$ の解の挙動を $V=x^2/2$ で調べよ。

<!-- solution-start -->
##### 詳細解答

$$
V(x)=\frac12x^2
$$

と置くと

$$
\begin{aligned}
\dot V
&=
x\{-x(1-x^2)\}\\
&=
-x^2(1-x^2).
\end{aligned}
$$

従って $0<|x|<1$ では $\dot V<0$ です。

初期値 $|x_0|<1$ を固定します。$x_0=0$ なら $F(0)=0$ なので $x(t)\equiv0$ が解であり、すでに $x(t)\to0$ です。以下では $x_0\ne0$ とします。このとき

$$
V(x_0)<\frac12.
$$

そこで

$$
V(x_0)<c<\frac12
$$

を一つ取り、

$$
K_c=\{x:V(x)\le c\}
=
[-\sqrt{2c},\sqrt{2c}]
$$

とします。$\sqrt{2c}<1$ なので $K_c\subset(-1,1)$ です。$\dot V\le0$ だから $K_c$ は正方向不変で、閉有界なのでコンパクトです。

$K_c$ 内で $\dot V=0$ となるのは $x=0$ だけです。したがって [LaSalle の不変性原理](#thm-ode9-lasalle) を適用すると

$$
\operatorname{dist}(x(t),\{0\})=|x(t)|\to0.
$$

よって

$$
\boxed{x(t)\to0\qquad(t\to\infty)}
$$

です。
<!-- solution-end -->

### Level C

#### ODE9-C01 非線形減衰振動子
- Level: C

$x'=y$, $y'=-x-y^3$ について $V=(x^2+y^2)/2$ を用いて原点への収束を示せ。

<!-- solution-start -->
##### 詳細解答

$$
V(x,y)=\frac12(x^2+y^2)
$$

と置くと

$$
\nabla V=(x,y).
$$

方程式の右辺を

$$
F(x,y)=(y,-x-y^3)
$$

と書けば

$$
\begin{aligned}
\dot V
&=
\nabla V\cdot F\\
&=
xy+y(-x-y^3)\\
&=
-y^4
\le0.
\end{aligned}
$$

初期値 $(x_0,y_0)$ に対して

$$
c:=V(x_0,y_0)
$$

と置きます。劣位集合

$$
K_c
=
\{(x,y):V(x,y)\le c\}
=
\{(x,y):x^2+y^2\le2c\}
$$

は閉有界なのでコンパクトです。また $\dot V\le0$ だから、$K_c$ から出発した軌道では

$$
V(x(t),y(t))
\le
V(x_0,y_0)
=c,
$$

従って $K_c$ は正方向不変です。

次に

$$
E=\{(x,y)\in K_c:\dot V=0\}
=
\{(x,0)\in K_c\}
$$

を考えます。$E$ 上で $y=0$ でも、$x\ne0$ なら

$$
y'=-x\ne0
$$

なので直後に $E$ から出ます。$E$ の中に留まり続けるのは原点だけです。従って $E$ に含まれる最大不変集合は

$$
M=\{(0,0)\}.
$$

[LaSalle の不変性原理](#thm-ode9-lasalle)を $K=K_c$ に適用すると

$$
\operatorname{dist}((x(t),y(t)),M)\to0.
$$

すなわち

$$
\boxed{(x(t),y(t))\to(0,0)}
$$

です。
<!-- solution-end -->

## 7. 章末チェック

- Lyapunov 関数と軌道微分を計算できる。
- 直接法の証明を劣位集合から再構成できる。
- 正の極限集合の意味を説明できる。
- $\dot V\le0$ しか得られないとき LaSalle を使える。
