# ODE11 パラメータ付き力学系と周期軌道の局所解析

<!-- definition-example-audit: strict -->

パラメータを動かすと[平衡解](../ODE1/index.md#def-ode1-equilibrium)の個数や安定性、周期軌道の有無が変わることがあります。本章では一般中心多様体論へ進む前に、標準正規形を直接解き、周期軌道を局所帰還写像の固定点として調べます。

## 1. パラメータを動かすと相図が変わる

<a id="def-ode11-bifurcation"></a>
<!-- formal-statement-start -->
> **定義（局所分岐）**  
> パラメータ付き自律系 $x'=F(x,\mu)$ で、ある $\mu=\mu_*$ を通過すると[平衡解](../ODE1/index.md#def-ode1-equilibrium)・周期軌道の局所的な個数または安定性が質的に変化するとき、$\mu_*$ で局所分岐が起こるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode11-bifurcation -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：saddle-node

$$
x'=\mu-x^2
$$

では $\mu<0$ に[平衡解](../ODE1/index.md#def-ode1-equilibrium)がなく、$\mu>0$ では $x=\pm\sqrt\mu$ の二点が現れます。
<!-- definition-example-end -->

## 2. saddle-node 正規形

<a id="prop-ode11-saddle-node"></a>
<!-- formal-statement-start -->
> **命題（saddle-node 正規形の分岐）**  
> $x'=\mu-x^2$ では、$\mu<0$ に[平衡解](../ODE1/index.md#def-ode1-equilibrium)はなく、$\mu=0$ に半安定[平衡解](../ODE1/index.md#def-ode1-equilibrium) $x=0$、$\mu>0$ に不安定[平衡解](../ODE1/index.md#def-ode1-equilibrium) $-\sqrt\mu$ と安定[平衡解](../ODE1/index.md#def-ode1-equilibrium) $\sqrt\mu$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[平衡解](../ODE1/index.md#def-ode1-equilibrium)方程式は $x^2=\mu$ です。$f(x)=\mu-x^2$ とすると

$$
f'(x)=-2x.
$$

$\mu>0$ では正の根で $f'<0$、負の根で $f'>0$ なので、それぞれ安定・不安定です。$\mu=0$ では $x'=-x^2\le0$ なので右側からは0へ近づき、左側からは左へ離れます。
<!-- proof-end -->

## 3. transcritical と pitchfork

<a id="prop-ode11-exchange"></a>
<!-- formal-statement-start -->
> **命題（transcritical・pitchfork 正規形）**  
> 1. $x'=\mu x-x^2$ では平衡枝 $x=0$ と $x=\mu$ が $\mu=0$ で交差し安定性を交換する。
> 2. $x'=\mu x-x^3$ では $\mu<0$ で原点が安定、$\mu>0$ で原点が不安定となり、安定な二枝 $x=\pm\sqrt\mu$ が生じる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1. $f=x(\mu-x)$ なので[平衡解](../ODE1/index.md#def-ode1-equilibrium)は $0,\mu$。$f_x=\mu-2x$ より
   $$
   f_x(0)=\mu,
   \qquad
   f_x(\mu)=-\mu.
   $$
   従って $\mu=0$ で安定性を交換します。

2. $f=x(\mu-x^2)$。$\mu>0$ では $0,\pm\sqrt\mu$ が[平衡解](../ODE1/index.md#def-ode1-equilibrium)で
   $$
   f_x=\mu-3x^2.
   $$
   原点では $f_x=\mu$、非零枝では $f_x=-2\mu<0$ です。
<!-- proof-end -->

## 4. Hopf 正規形を直接解く

複素表示

$$
z'=(\mu+i\omega)z-|z|^2z,
\qquad \omega>0
$$

を考えます。

<a id="prop-ode11-hopf-normal-form"></a>
<!-- formal-statement-start -->
> **命題（Hopf 正規形の周期軌道）**  
> $z=re^{i\theta}$ と書くと

$$
r'=\mu r-r^3,
\qquad
\theta'=\omega.
$$

> $\mu<0$ では原点が漸近安定、$\mu>0$ では原点が不安定となり、半径 $r=\sqrt\mu$ に安定周期軌道が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

複素方程式の実部を半径、虚部を角度として読むだけです。周期軌道の安定性は一変数半径方程式へ落ちます。

<!-- proof-start -->
### 証明

$$
z'=e^{i\theta}(r'+ir\theta')
$$

であり、右辺は

$$
e^{i\theta}\{(\mu r-r^3)+i\omega r\}.
$$

係数を比較して

$$
r'=\mu r-r^3,
\qquad
\theta'=\omega.
$$

$\mu>0$ の非零平衡半径 $r=\sqrt\mu$ では

$$
\frac d{dr}(\mu r-r^3)
=
\mu-3r^2
=
-2\mu<0.
$$

従って半径方向に安定です。角速度は一定なので周期は $2\pi/\omega$ です。
<!-- proof-end -->

**停止線**：一般 Hopf 分岐定理は、高次元系をこの正規形へ還元する中心多様体・正規形理論と非退化条件を必要とします。本章では正規形の直接解析までを証明済み範囲とします。

## 5. 周期軌道を固定点へ変える

<a id="def-ode11-poincare-map"></a>
<!-- formal-statement-start -->
> **定義（Poincaré 写像）**  
> 平面の周期軌道に横断的な短い線分 $\Sigma$ を取り、$s\in\Sigma$ から出た軌道が次に $\Sigma$ へ戻る点を $P(s)$ とする局所写像を Poincaré 写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode11-poincare-map -->
**定義の確認**：極座標系

$$
r'=1-r,
\qquad
\theta'=1
$$

を考えます。周期軌道 $r=1$ に横断する切断面 $\Sigma=\{\theta=0\}$ を取り、$r_0$ から出発すると一周後 $t=2\pi$ に再び $\Sigma$ へ戻ります。その半径は

$$
P(r_0)=1+(r_0-1)e^{-2\pi}.
$$

よって「次に切断面へ戻る点」を与える局所写像が実際に構成できています。
<!-- definition-example-end -->

周期軌道との交点 $s_*$ は $P(s_*)=s_*$。従って周期軌道の安定性は一変数固定点の安定性へ変わります。

<a id="def-ode11-multiplier"></a>
<!-- formal-statement-start -->
> **定義（周期軌道の乗数）**  
> Poincaré 写像が微分可能で固定点 $s_*$ を持つとき

$$
\rho=P'(s_*)
$$

> を周期軌道の非自明な乗数という。$|\rho|<1$ なら横断方向に局所漸近安定、$|\rho|>1$ なら不安定である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode11-multiplier -->
**定義の確認**：以下で定義の条件を直接確認します。

$P(s)=s_*/2+s/2$ なら $P(s_*)=s_*$ かつ $P'(s_*)=1/2$ で、帰還ごとに横断距離が半分になります。
<!-- definition-example-end -->

## 6. 平面では発散の一周積分が乗数になる

<a id="thm-ode11-planar-multiplier"></a>
<!-- formal-statement-start -->
> **定理（平面周期軌道の乗数公式）**  
> $x'=F(x)$ を $C^1$ 平面系とし、周期 $T$ の周期軌道 $\gamma(t)$ を持つとする。非自明な Poincaré 乗数は

$$
\rho
=
\exp\left(
\int_0^T
\operatorname{div}F(\gamma(t))\,dt
\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

軌道に沿う変分方程式の基本行列の行列式を Liouville 公式で計算します。自律系では接線方向に自明な乗数1があり、残りが横断方向の乗数です。

<!-- proof-start -->
### 証明

変分方程式

$$
\xi'=DF(\gamma(t))\xi
$$

の基本行列を $X(0)=I$ で取ります。$A(t)=DF(\gamma(t))$ とし、

$$
A=
\begin{pmatrix}
\alpha&\beta\\
\gamma&\delta
\end{pmatrix},
\qquad
X=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

と書きます。$X'=AX$ を成分で代入して直接微分すると

$$
(ad-bc)'
=
(\alpha+\delta)(ad-bc).
$$

したがって

$$
\frac d{dt}\det X(t)
=
\operatorname{tr}(DF(\gamma(t)))\det X(t).
$$

平面でトレースは発散なので

$$
\det X(T)
=
\exp\left(
\int_0^T\operatorname{div}F(\gamma(t))dt
\right).
$$

自律性から $\xi(t)=\gamma'(t)$ も変分方程式の解で、周期性より $\gamma'(T)=\gamma'(0)$。従ってモノドロミー行列 $X(T)$ は接線方向に固有値1を持ちます。二つの固有値の積は行列式なので、残りの固有値は上の指数です。これは横断方向の Poincaré 写像の微分に一致します。
<!-- proof-end -->

## 演習

### Level A

#### ODE11-A01 saddle-node
- Level: A

$x'=\mu-x^2$ の[平衡解](../ODE1/index.md#def-ode1-equilibrium)と安定性を $\mu<0,=0,>0$ で分類せよ。

<!-- solution-start -->
##### 詳細解答
$\mu<0$ は[平衡解](../ODE1/index.md#def-ode1-equilibrium)なし。$\mu=0$ は半安定な0。$\mu>0$ は $\pm\sqrt\mu$ で、$f'=-2x$ より正根が安定、負根が不安定です。
<!-- solution-end -->

#### ODE11-A02 transcritical
- Level: A

$x'=\mu x-x^2$ の平衡枝と安定性交換を求めよ。

<!-- solution-start -->
##### 詳細解答
[平衡解](../ODE1/index.md#def-ode1-equilibrium)は $0,\mu$。$f_x(0)=\mu$, $f_x(\mu)=-\mu$ なので $\mu=0$ で安定性を交換します。
<!-- solution-end -->

#### ODE11-A03 pitchfork
- Level: A

$x'=\mu x-x^3$ の[平衡解](../ODE1/index.md#def-ode1-equilibrium)を分類せよ。

<!-- solution-start -->
##### 詳細解答
$0$ は常に[平衡解](../ODE1/index.md#def-ode1-equilibrium)。$\mu>0$ で $\pm\sqrt\mu$ が追加。$f_x=\mu-3x^2$ より $\mu<0$ では原点安定、$\mu>0$ では原点不安定、非零二枝は安定です。
<!-- solution-end -->

#### ODE11-A04 Hopf 正規形
- Level: A

$r'=\mu r-r^3$, $\theta'=1$ で $\mu>0$ の周期軌道の半径と安定性を求めよ。

<!-- solution-start -->
##### 詳細解答
$r=\sqrt\mu$。半径右辺の微分は $\mu-3r^2=-2\mu<0$ なので半径方向に安定、周期は $2\pi$ です。
<!-- solution-end -->

### Level B

#### ODE11-B01 Poincaré 写像の固定点
- Level: B

周期軌道と Poincaré 写像の固定点の対応を説明せよ。

<!-- solution-start -->
##### 詳細解答
周期軌道との交点から一周すれば同じ点へ戻るので固定点です。逆に帰還写像の固定点から出る軌道は帰還時間後に同一点へ戻り、一意性により同じ運動を繰り返すため周期軌道になります。
<!-- solution-end -->

#### ODE11-B02 乗数と安定性
- Level: B

$P(s_*)=s_*$, $|P'(s_*)|<1$ のとき固定点が局所吸引的であることを示せ。

<!-- solution-start -->
##### 詳細解答
連続性により近傍で $|P'|\le q<1$ とできます。平均値の定理から $|P(s)-s_*|\le q|s-s_*|$。反復すれば距離は $q^n$ 倍以下になります。
<!-- solution-end -->

#### ODE11-B03 発散と乗数
- Level: B

周期軌道上で $\operatorname{div}F=-2$ が一定、周期が $T$ のとき非自明乗数を求めよ。

<!-- solution-start -->
##### 詳細解答
乗数公式から $\rho=\exp\int_0^T(-2)dt=e^{-2T}$。$0<\rho<1$ なので横断方向に安定です。
<!-- solution-end -->

### Level C

#### ODE11-C01 Hopf 正規形を完全分類する
- Level: C

$z'=(\mu+i)z-|z|^2z$ を極座標に直し、$\mu$ が0を通るときの[平衡解](../ODE1/index.md#def-ode1-equilibrium)と周期軌道の安定性を説明せよ。

<!-- solution-start -->
##### 詳細解答
$r'=\mu r-r^3$, $\theta'=1$。$\mu<0$ では原点だけで安定。$\mu=0$ では $r'=-r^3$ なので原点は漸近安定だが線形化は中立。$\mu>0$ では原点が不安定となり $r=\sqrt\mu$ に安定周期軌道が生じます。一般 Hopf 定理には任意系をこの正規形へ還元する追加理論が必要です。
<!-- solution-end -->

## 7. 章末チェック

- 三つの一次元局所分岐正規形を分類できる。
- Hopf 正規形を極座標へ直して周期軌道を直接導ける。
- 一般 Hopf 定理との証明範囲の違いを説明できる。
- Poincaré 写像で周期軌道を固定点へ変換できる。
- 発散の一周積分から平面周期軌道の乗数を計算できる。
