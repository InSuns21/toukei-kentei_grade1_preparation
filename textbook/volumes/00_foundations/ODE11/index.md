# ODE11 局所分岐・Poincaré 写像・周期軌道の安定性

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

最初に、パラメータを通過したとき平衡点が「0個から2個へ」生まれる最小例を、平衡方程式と一次元の向きだけで調べます。線形化の固有値だけを眺めるのではなく、$\mu=0$ では実際のベクトルの向きを確認します。

<a id="prop-ode11-saddle-node"></a>
<!-- formal-statement-start -->
> **命題（saddle-node 正規形の分岐）**  
> $x'=\mu-x^2$ では、$\mu<0$ に[平衡解](../ODE1/index.md#def-ode1-equilibrium)はなく、$\mu=0$ に半安定[平衡解](../ODE1/index.md#def-ode1-equilibrium) $x=0$、$\mu>0$ に不安定[平衡解](../ODE1/index.md#def-ode1-equilibrium) $-\sqrt\mu$ と安定[平衡解](../ODE1/index.md#def-ode1-equilibrium) $\sqrt\mu$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[平衡解](../ODE1/index.md#def-ode1-equilibrium)方程式は

$$
\mu-x^2=0,
$$

すなわち

$$
x^2=\mu
$$

です。従って $\mu<0$ では実平衡点はなく、$\mu>0$ では

$$
x_-=-\sqrt\mu,
\qquad
x_+=\sqrt\mu
$$

の二つがあります。

$\mu>0$ では右辺

$$
f(x)=\mu-x^2
$$

の符号を平衡点の両側で見ます。

- $x<x_-$ では $f(x)<0$ なので左へ進む。
- $x_-<x<x_+$ では $f(x)>0$ なので右へ進む。
- $x>x_+$ では $f(x)<0$ なので左へ進む。

従って $x_-$ からは両側で離れるので不安定、$x_+$ へは両側から近づくので安定です。

$\mu=0$ では

$$
x'=-x^2.
$$

$x_0>0$ なら変数分離から

$$
x(t)=\frac{x_0}{1+x_0t}\to0
\qquad(t\to\infty).
$$

一方 $x_0<0$ では $x'=-x^2<0$ なので0から左へ離れ、実際同じ公式の分母 $1+x_0t$ は有限正時刻で0になります。従って0は右側からは吸引し、左側からは反発する半安定平衡点です。
<!-- proof-end -->

## 3. transcritical と pitchfork

次は「平衡枝どうしが交差して安定性を交換する場合」と「対称な二枝が新しく生まれる場合」を比べます。どちらも平衡方程式を因数分解し、各枝上で右辺の一次変化を調べると構造が見えます。

<a id="prop-ode11-exchange"></a>
<!-- formal-statement-start -->
> **命題（transcritical・pitchfork 正規形）**  
> 1. $x'=\mu x-x^2$ では平衡枝 $x=0$ と $x=\mu$ が $\mu=0$ で交差し安定性を交換する。
> 2. $x'=\mu x-x^3$ では $\mu<0$ で原点が安定、$\mu>0$ で原点が不安定となり、安定な二枝 $x=\pm\sqrt\mu$ が生じる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**1. $x'=\mu x-x^2=x(\mu-x)$**

平衡方程式は

$$
x(\mu-x)=0,
$$

なので平衡枝は

$$
x=0,
\qquad
x=\mu
$$

です。

まず $\mu<0$ とします。このとき $\mu<0$ なので、実数直線は

$$
(-\infty,\mu),\qquad
(\mu,0),\qquad
(0,\infty)
$$

に分かれます。右辺の符号は

$$
x<\mu:
\quad
x<0,\ \mu-x>0
\Longrightarrow
x'<0,
$$

$$
\mu<x<0:
\quad
x<0,\ \mu-x<0
\Longrightarrow
x'>0,
$$

$$
x>0:
\quad
x>0,\ \mu-x<0
\Longrightarrow
x'<0.
$$

従って $x=\mu$ の両側では矢印が平衡点から外へ向き、不安定です。一方 $x=0$ の両側では矢印が0へ向くので安定です。

次に $\mu>0$ とします。今度は

$$
(-\infty,0),\qquad
(0,\mu),\qquad
(\mu,\infty)
$$

で符号を見ると

$$
x<0\Longrightarrow x'<0,
$$

$$
0<x<\mu\Longrightarrow x'>0,
$$

$$
x>\mu\Longrightarrow x'<0.
$$

従って $x=0$ は両側から離れるので不安定、$x=\mu$ は両側から近づくので安定です。

つまり $\mu=0$ を通過すると二本の平衡枝

$$
x=0,
\qquad
x=\mu
$$

が交差し、安定性を交換します。

**2. $x'=\mu x-x^3=x(\mu-x^2)$**

$\mu<0$ では

$$
\mu-x^2<0
$$

が全ての $x$ で成り立つため、平衡点は $x=0$ だけです。さらに

$$
x<0\Longrightarrow x'>0,
\qquad
x>0\Longrightarrow x'<0,
$$

なので両側から原点へ向かい、原点は安定です。

$\mu>0$ では

$$
x=0,
\qquad
x=\pm\sqrt\mu
$$

が平衡点です。$a=\sqrt\mu$ と置くと、

$$
x<-a
\Longrightarrow
x'>0,
$$

$$
-a<x<0
\Longrightarrow
x'<0,
$$

$$
0<x<a
\Longrightarrow
x'>0,
$$

$$
x>a
\Longrightarrow
x'<0.
$$

従って $x=0$ では矢印が両側へ離れるので不安定です。一方 $x=-a$ と $x=a$ では両側から矢印が向かうため安定です。

したがって $\mu=0$ を越えると原点が不安定化し、対称な二本の安定平衡枝が現れます。$\square$
<!-- proof-end -->

## 4. Hopf 正規形を直接解く

一次元の例では平衡点の個数や安定性が変わりました。平面では、平衡点が不安定化すると同時に小さな周期軌道が現れる代表的な変化があります。ここでは一般定理を先に使わず、最も単純な正規形を極座標へ直して直接確認します。

複素表示

$$
z'=(\mu+i\omega)z-|z|^2z,
\qquad \omega>0
$$

を考えます。ここで $z=x+iy$ は平面座標 $(x,y)$ を一つの複素数で書いたものです。

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

まず $z\ne0$、すなわち $r>0$ の軌道を考え、

$$
z=re^{i\theta}
$$

と書きます。積の微分と[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
z'
=
r'e^{i\theta}
+
ri\theta'e^{i\theta}
=
e^{i\theta}(r'+ir\theta').
$$

一方、

$$
|z|^2z=r^3e^{i\theta}
$$

なので方程式の右辺は

$$
\begin{aligned}
(\mu+i\omega)z-|z|^2z
&=
(\mu+i\omega)re^{i\theta}-r^3e^{i\theta}\\
&=
e^{i\theta}\{(\mu r-r^3)+i\omega r\}.
\end{aligned}
$$

両辺から $e^{i\theta}\ne0$ を除き、実部と虚部を比較すると

$$
r'=\mu r-r^3,
\qquad
r\theta'=\omega r.
$$

今は $r>0$ なので第二式を $r$ で割れて、

$$
\boxed{
r'=r(\mu-r^2),
\qquad
\theta'=\omega
}
$$

を得ます。$r=0$ では角度は定義しませんが、元の複素方程式へ $z=0$ を代入すれば原点が平衡点であることは直接分かります。

次に $\mu$ の符号ごとに半径を調べます。

**$\mu<0$** では $r>0$ に対して

$$
r'=r(\mu-r^2)<0.
$$

さらに $r'\le\mu r$ なので、$r(t)>0$ の間

$$
\frac{r'(t)}{r(t)}\le\mu.
$$

$0$ から $t$ まで積分して

$$
\log r(t)-\log r(0)\le\mu t,
$$

従って

$$
0<r(t)\le r(0)e^{\mu t}\to0.
$$

よって原点は漸近安定です。

**$\mu>0$** では

$$
0<r<\sqrt\mu
\quad\Longrightarrow\quad
r'>0,
$$

$$
r>\sqrt\mu
\quad\Longrightarrow\quad
r'<0.
$$

原点の不安定性を距離で確認します。

$$
\varepsilon:=\frac{\sqrt\mu}{2}
$$

と固定します。$0<r\le\varepsilon$ なら

$$
\mu-r^2
\ge
\mu-\frac{\mu}{4}
=
\frac{3\mu}{4},
$$

従って

$$
r'
=
r(\mu-r^2)
\ge
\frac{3\mu}{4}r.
$$

任意の $\delta>0$ に対し $0<r(0)<\min\{\delta,\varepsilon\}$ を選ぶと、軌道が $r=\varepsilon$ に達するまで

$$
r(t)
\ge
r(0)e^{3\mu t/4}.
$$

従って有限時間で半径 $\varepsilon$ に達します。どれだけ原点に近い非零初期値から出ても固定した距離 $\varepsilon$ まで離れるので、原点は不安定です。

一方

$$
r=\sqrt\mu
$$

では $r'=0$ で半径が一定、しかも $\theta'=\omega$ なので

$$
\theta(t)=\theta(0)+\omega t.
$$

従って半径 $\sqrt\mu$ の円は周期

$$
T=\frac{2\pi}{\omega}
$$

の周期軌道です。

その近くで $0<r(0)<\sqrt\mu$ なら $r(t)$ は増加し、$\sqrt\mu<r(0)$ なら減少します。十分近い初期半径では $\sqrt\mu$ を越えて反対側へ飛び越えることはありません。従って $r(t)$ は単調有界で極限 $\ell$ を持ちます。極限が $\sqrt\mu$ でないなら

$$
\ell(\mu-\ell^2)\ne0
$$

となり、$r'$ が0から離れた符号を保って収束と矛盾します。よって

$$
r(t)\to\sqrt\mu.
$$

したがってこの周期軌道は半径方向に局所漸近安定です。
<!-- proof-end -->

ここで示したのは、この具体的な正規形そのものの直接解析です。一般の非線形系で同じ型の周期軌道生成を保証する Hopf 分岐定理には、系を適切な局所形へ簡約する理論と非退化条件が追加で必要です。本章ではそれらを暗黙に仮定せず、上で直接証明した正規形の結論と一般定理を区別します。

## 5. 周期軌道を固定点へ変える

周期軌道の近くの点が軌道へ近づくかを連続時間のまま追うと、回転しながらの変化を毎時刻見る必要があります。そこで周期軌道を横切る短い線分を一枚置き、「一周して戻ったとき横断座標がどう変わったか」だけを記録します。二次元の連続時間問題を、一変数写像の反復へ落とす考え方です。

<a id="def-ode11-poincare-map"></a>
<!-- formal-statement-start -->
> **定義（Poincaré 写像）**  
> 平面の周期 $T$ の周期軌道上に点 $q$ を取り、$q$ を通り軌道に横断的な短い線分 $\Sigma$ を取る。$q$ に十分近い点 $\xi\in\Sigma$ に対し、$T$ に近い正の帰還時刻 $\tau(\xi)$ で軌道が再び $\Sigma$ と交わるとする。このとき

$$
P(\xi):=\Phi_{\tau(\xi)}(\xi)
$$

> と定める局所写像を Poincaré 写像という。
<!-- formal-statement-end -->

この局所写像が周期軌道の近くで実際に定義できる理由を確認します。周期軌道上の基準点を $q$、周期を $T$ とします。横断線 $\Sigma$ の接線方向を $v\ne0$ とし、それに垂直なベクトル $n\ne0$ を一つ取ります。局所的には

$$
h(x):=n\cdot(x-q)
$$

と置けば $\Sigma=\{h=0\}$ です。横断性は $F(q)$ が $v$ と平行でないことなので、

$$
Dh(q)F(q)
=
n\cdot F(q)
\ne0.
$$

$\Sigma$ 上の初期点を $\sigma(s)$ とパラメータ表示して

$$
G(s,\tau)
=
h(\Phi_\tau(\sigma(s)))
$$

と置くと、

$$
G(0,T)=0.
$$

また時間変数で微分すると

$$
\partial_\tau G(0,T)
=
Dh(q)\,\partial_t\Phi_T(q)
=
Dh(q)F(q)
\ne0.
$$

従って [陰関数定理](../RA6A/index.md#thm-ra6a-implicit-function) により、$s=0$ の近くで

$$
G(s,\tau(s))=0,
\qquad
\tau(0)=T
$$

となる $C^1$ 級の帰還時刻 $\tau(s)$ が存在します。

これが局所的な最初の再帰交点になることも確認します。基準となる周期軌道は単純閉曲線で、十分短い局所横断線 $\Sigma$ とは一周の途中では交わりません。従って小さい $\varepsilon>0$ を固定すれば、基準軌道の

$$
\varepsilon\le t\le T-\varepsilon
$$

の部分と $\Sigma$ の間には正の距離があります。流れの連続依存性から、初期点 $s$ を十分0へ近づけても、この時間帯には $\Sigma$ と交わりません。一方 $t=0$ の直後は横断性により $\Sigma$ から一方向へ離れます。したがって $T$ の近くで陰関数定理が与えた交点が、局所的には次の帰還点です。

つまり十分近い初期点には、周期 $T$ に近い時刻で再び横断線へ戻る局所写像が定義できます。

<!-- definition-example-start: def-ode11-poincare-map -->
**定義の確認**：極座標系

$$
r'=1-r,
\qquad
\theta'=1
$$

を考えます。半径方程式

$$
r'=1-r
$$

の解は

$$
r(t)=1+(r_0-1)e^{-t}
$$

です。周期軌道 $r=1$ に横断する横断線 $\Sigma=\{\theta=0\}$ を取り、$\theta'=1$ なので $r_0$ から出発した軌道は一周後 $t=2\pi$ に再び $\Sigma$ へ戻ります。その半径は

$$
P(r_0)
=
r(2\pi)
=
1+(r_0-1)e^{-2\pi}.
$$

よって「次に横断線へ戻る点」を与える局所写像が実際に構成できています。
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

乗数と安定性の関係も、以下の一次元の平均値評価から直接確認できます。$|P'(s_*)|<1$ なら、連続性からある近傍で

$$
|P'(s)|\le q<1
$$

とできます。従って

$$
|P(s)-s_*|
=
|P(s)-P(s_*)|
\le
q|s-s_*|,
$$

なので帰還ごとに横断距離が幾何級数的に縮みます。

逆に $|P'(s_*)|>1$ なら、十分小さい近傍で

$$
|P'(s)|\ge q>1.
$$

固定点と異なる点がその近傍に留まる限り

$$
|P(s)-s_*|
\ge
q|s-s_*|
$$

となるため、帰還反復で固定点から離れます。これが周期軌道の横断方向の安定・不安定を一変数固定点へ還元できる理由です。

## 6. 平面では発散の一周積分が乗数になる

乗数公式では、流れを初期値で微分した行列を使います。この事実は ODE8 の [流れの初期値微分と変分方程式](../ODE8/index.md#lem-ode8-flow-variational) を正本として使います。

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

[流れの初期値微分と変分方程式](../ODE8/index.md#lem-ode8-flow-variational)により、周期軌道に沿う流れの初期値微分

$$
X(t)=D_x\Phi_t(\gamma(0))
$$

は変分方程式

$$
X'(t)=DF(\gamma(t))X(t),
\qquad
X(0)=I
$$

を満たします。$A(t)=DF(\gamma(t))$ とし、

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

と書きます。$X'=AX$ を成分で代入すると

$$
a'=\alpha a+\beta c,
\qquad
b'=\alpha b+\beta d,
$$

$$
c'=\gamma a+\delta c,
\qquad
d'=\gamma b+\delta d.
$$

従って

$$
\begin{aligned}
(ad-bc)'
&=a'd+ad'-b'c-bc'\\
&=(\alpha+\delta)(ad-bc).
\end{aligned}
$$

すなわち

$$
\frac d{dt}\det X(t)
=
\operatorname{tr}(DF(\gamma(t)))\det X(t).
$$

$\det X(0)=1$ なので一変数線形方程式を積分して

$$
\det X(T)
=
\exp\left(
\int_0^T
\operatorname{tr}(DF(\gamma(t)))\,dt
\right).
$$

平面では

$$
\operatorname{tr}(DF)
=
\partial_xF_1+\partial_yF_2
=
\operatorname{div}F
$$

だから

$$
\det X(T)
=
\exp\left(
\int_0^T
\operatorname{div}F(\gamma(t))\,dt
\right).
$$

残る核心は、**なぜこの行列式が Poincaré 写像の微分そのものになるか**です。

周期軌道上の基準点を

$$
q=\gamma(0)=\gamma(T),
\qquad
F_0=F(q)
$$

とします。非定常周期軌道なので $F_0\ne0$ です。$q$ を通る横断線 $\Sigma$ を $C^1$ 級に

$$
\sigma(s),
\qquad
\sigma(0)=q,
\qquad
v:=\sigma'(0)
$$

とパラメータ表示します。横断性は

$$
\det(F_0,v)\ne0
$$

と同値です。

まず帰還時刻が初期点 $s$ に対して微分可能であることを確認します。$\Sigma$ の近くで $\Sigma=\{h=0\}$ と書ける $C^1$ 関数 $h$ を取り、

$$
Dh(q)F_0\ne0
$$

となるようにします。流れを $\Phi_t$ とし、

$$
G(s,\tau)
=
h(\Phi_\tau(\sigma(s)))
$$

と置けば

$$
G(0,T)=0,
$$

かつ

$$
\partial_\tau G(0,T)
=
Dh(q)F(q)
\ne0.
$$

したがって [陰関数定理](../RA6A/index.md#thm-ra6a-implicit-function) により、$s=0$ の近くで次の帰還時刻を

$$
\tau=\tau(s),
\qquad
\tau(0)=T
$$

という $C^1$ 級関数として取れます。Poincaré 写像を横断線座標で $p(s)$ と書けば

$$
\Phi_{\tau(s)}(\sigma(s))
=
\sigma(p(s)),
\qquad
p(0)=0.
$$

この恒等式を $s=0$ で微分します。ODE8 の[流れの初期値微分と変分方程式](../ODE8/index.md#lem-ode8-flow-variational)により

$$
D_x\Phi_T(q)=X(T).
$$

また $\partial_t\Phi_t(x)=F(\Phi_t(x))$ だから

$$
X(T)v
+
F_0\,\tau'(0)
=
v\,p'(0).
$$

両辺と $F_0$ の行列式を取ると、$F_0$ に平行な帰還時刻補正項は消えて

$$
\det(F_0,X(T)v)
=
p'(0)\det(F_0,v).
$$

一方、自律性から $\gamma'(t)=F(\gamma(t))$ は変分方程式を満たします。従って

$$
X(T)F_0
=
F(\gamma(T))
=
F_0.
$$

よって行列式の変換則から

$$
\begin{aligned}
\det(F_0,X(T)v)
&=
\det(X(T)F_0,X(T)v)\\
&=
\det X(T)\,\det(F_0,v).
\end{aligned}
$$

横断性により $\det(F_0,v)\ne0$ なので

$$
p'(0)
=
\det X(T).
$$

横断線座標での $p'(0)$ が定義した非自明な Poincaré 乗数 $\rho$ です。以上を組み合わせて

$$
\boxed{
\rho
=
\exp\left(
\int_0^T
\operatorname{div}F(\gamma(t))\,dt
\right)
}
$$

を得ます。
<!-- proof-end -->

## 演習

### Level A

#### ODE11-A01 saddle-node
- Level: A

$x'=\mu-x^2$ の[平衡解](../ODE1/index.md#def-ode1-equilibrium)と安定性を $\mu<0,=0,>0$ で分類せよ。

<!-- solution-start -->
##### 詳細解答

平衡方程式は

$$
\mu-x^2=0.
$$

**$\mu<0$** では実数解がないので平衡点はありません。

**$\mu=0$** では $x=0$ だけです。方程式は

$$
x'=-x^2.
$$

$x_0>0$ なら

$$
x(t)=\frac{x_0}{1+x_0t}\to0,
$$

一方 $x_0<0$ では $x'=-x^2<0$ なので0から左へ離れます。従って0は半安定です。

**$\mu>0$** では

$$
x_\pm=\pm\sqrt\mu.
$$

右辺 $f(x)=\mu-x^2$ の符号は

$$
x<x_-: f<0,
$$

$$
x_-<x<x_+: f>0,
$$

$$
x>x_+: f<0.
$$

従って

$$
\boxed{
-\sqrt\mu\text{ は不安定},
\qquad
\sqrt\mu\text{ は安定}
}
$$

です。
<!-- solution-end -->

#### ODE11-A02 transcritical
- Level: A

$x'=\mu x-x^2$ の平衡枝と安定性交換を求めよ。

<!-- solution-start -->
##### 詳細解答

$$
x'
=
\mu x-x^2
=
x(\mu-x)
$$

なので平衡枝は

$$
x=0,
\qquad
x=\mu.
$$

まず $\mu<0$ とします。このとき平衡点の順序は

$$
\mu<0.
$$

右辺 $x(\mu-x)$ の符号は

$$
x<\mu\Longrightarrow x'<0,
$$

$$
\mu<x<0\Longrightarrow x'>0,
$$

$$
x>0\Longrightarrow x'<0.
$$

従って $x=\mu$ からは両側へ離れるので不安定、$x=0$ へは両側から向かうので安定です。

次に $\mu>0$ では

$$
0<\mu
$$

で、

$$
x<0\Longrightarrow x'<0,
$$

$$
0<x<\mu\Longrightarrow x'>0,
$$

$$
x>\mu\Longrightarrow x'<0.
$$

従って今度は $x=0$ が不安定、$x=\mu$ が安定です。したがって

$$
\boxed{\mu=0\text{ を通って二枝が安定性を交換する}}
$$

と分かります。
<!-- solution-end -->

#### ODE11-A03 pitchfork
- Level: A

$x'=\mu x-x^3$ の[平衡解](../ODE1/index.md#def-ode1-equilibrium)を分類せよ。

<!-- solution-start -->
##### 詳細解答

$$
x'
=
\mu x-x^3
=
x(\mu-x^2)
$$

なので $x=0$ は全ての $\mu$ で平衡点です。非零平衡点には

$$
x^2=\mu
$$

が必要なので、$\mu>0$ のときだけ

$$
x=\pm\sqrt\mu
$$

が追加されます。

$\mu<0$ では

$$
\mu-x^2<0
$$

が全ての $x$ で成り立ちます。従って

$$
x<0\Longrightarrow x'>0,
\qquad
x>0\Longrightarrow x'<0,
$$

なので原点へ両側から向かい、原点は安定です。

$\mu>0$ では $a=\sqrt\mu$ と置きます。右辺 $x(\mu-x^2)$ の符号は

$$
x<-a\Longrightarrow x'>0,
$$

$$
-a<x<0\Longrightarrow x'<0,
$$

$$
0<x<a\Longrightarrow x'>0,
$$

$$
x>a\Longrightarrow x'<0.
$$

従って原点では両側へ離れるので不安定、$x=\pm a$ では両側から向かうので二枝とも安定です。

つまり $\mu=0$ を越えると、不安定化した原点から対称な二本の安定枝が生じます。
<!-- solution-end -->

#### ODE11-A04 Hopf 正規形
- Level: A

$r'=\mu r-r^3$, $\theta'=1$ で $\mu>0$ の周期軌道の半径と安定性を求めよ。

<!-- solution-start -->
##### 詳細解答

$\mu>0$ では

$$
r'=r(\mu-r^2).
$$

非零の一定半径には

$$
\mu-r^2=0
$$

が必要なので

$$
r=\sqrt\mu.
$$

この半径の内側では

$$
0<r<\sqrt\mu
\Longrightarrow
r'>0,
$$

外側では

$$
r>\sqrt\mu
\Longrightarrow
r'<0.
$$

従って半径は両側から $\sqrt\mu$ へ戻り、周期軌道は半径方向に局所漸近安定です。

また $\theta'=1$ なので一周に必要な時間は

$$
\boxed{T=2\pi}.
$$
<!-- solution-end -->

### Level B

#### ODE11-B01 Poincaré 写像の固定点
- Level: B

周期軌道と Poincaré 写像の固定点の対応を説明せよ。

<!-- solution-start -->
##### 詳細解答

周期軌道と横断線 $\Sigma$ の交点を $s_*$ とします。周期を $T>0$ とすると、$s_*$ から出た軌道は一周後に同じ点へ戻るので

$$
P(s_*)=s_*.
$$

逆に、ある $s_*\in\Sigma$ が

$$
P(s_*)=s_*
$$

を満たすとします。定義より、ある正の帰還時刻 $\tau(s_*)>0$ で

$$
\Phi_{\tau(s_*)}(s_*)=s_*.
$$

自律系の一意性と ODE8 の[流れの合成則](../ODE8/index.md#prop-ode8-flow-law)から、任意の整数 $n\ge1$ について

$$
\Phi_{n\tau(s_*)}(s_*)
=
s_*.
$$

横断線上では $F(s_*)\ne0$ なので定常解ではありません。従ってこの軌道は周期的です。

つまり周期軌道を調べる問題は、横断線上で一周後に同じ点へ戻る点を調べる一変数問題へ変わります。
<!-- solution-end -->

#### ODE11-B02 乗数と安定性
- Level: B

$P(s_*)=s_*$, $|P'(s_*)|<1$ のとき固定点が局所吸引的であることを示せ。

<!-- solution-start -->
##### 詳細解答

$$
|P'(s_*)|<1
$$

なので、$P'$ の連続性からある $q$ と近傍 $I$ を

$$
|P'(s_*)|<q<1,
$$

$$
|P'(s)|\le q
\qquad(s\in I)
$$

となるように取れます。

$s\in I$ に対し、$P(s_*)=s_*$ と平均値の定理を使うと、$s$ と $s_*$ の間のある $\xi$ について

$$
\begin{aligned}
|P(s)-s_*|
&=
|P(s)-P(s_*)|\\
&=
|P'(\xi)|\,|s-s_*|\\
&\le
q|s-s_*|.
\end{aligned}
$$

$I$ を十分小さく取れば右辺は再び $I$ 内に入るので反復でき、

$$
|P^n(s)-s_*|
\le
q^n|s-s_*|.
$$

$q^n\to0$ だから

$$
\boxed{P^n(s)\to s_*}.
$$

従って帰還ごとの横断距離は0へ収束し、周期軌道は横断方向に局所吸引的です。
<!-- solution-end -->

#### ODE11-B03 発散と乗数
- Level: B

周期軌道上で $\operatorname{div}F=-2$ が一定、周期が $T$ のとき非自明乗数を求めよ。

<!-- solution-start -->
##### 詳細解答

[平面周期軌道の乗数公式](#thm-ode11-planar-multiplier)へ

$$
\operatorname{div}F(\gamma(t))=-2
$$

を代入します。すると

$$
\begin{aligned}
\rho
&=
\exp\left(
\int_0^T
\operatorname{div}F(\gamma(t))\,dt
\right)\\
&=
\exp\left(
\int_0^T(-2)\,dt
\right)\\
&=
\boxed{e^{-2T}}.
\end{aligned}
$$

$T>0$ なので

$$
0<e^{-2T}<1.
$$

従って $|\rho|<1$ であり、定義どおり周期軌道は横断方向に局所漸近安定です。
<!-- solution-end -->

### Level C

#### ODE11-C01 Hopf 正規形を完全分類する
- Level: C

$z'=(\mu+i)z-|z|^2z$ を極座標に直し、$\mu$ が0を通るときの[平衡解](../ODE1/index.md#def-ode1-equilibrium)と周期軌道の安定性を説明せよ。

<!-- solution-start -->
##### 詳細解答

$z=re^{i\theta}$ とし、まず $r>0$ で計算します。

$$
z'
=
e^{i\theta}(r'+ir\theta').
$$

一方、

$$
(\mu+i)z-|z|^2z
=
e^{i\theta}\{(\mu r-r^3)+ir\}.
$$

実部と虚部を比較して

$$
\boxed{
r'=r(\mu-r^2),
\qquad
\theta'=1
}.
$$

原点 $r=0$ は元の方程式へ $z=0$ を代入して平衡点と分かります。

**$\mu<0$** では $r>0$ に対して $r'<0$ で、さらに

$$
r'\le\mu r.
$$

従って

$$
r(t)\le r(0)e^{\mu t}\to0,
$$

なので原点は漸近安定です。

**$\mu=0$** では

$$
r'=-r^3.
$$

$r_0>0$ なら変数分離して

$$
\frac{dr}{r^3}=-dt.
$$

積分すると

$$
\frac1{r(t)^2}
=
\frac1{r_0^2}+2t,
$$

従って

$$
r(t)
=
\frac{r_0}{\sqrt{1+2r_0^2t}}
\to0.
$$

よって原点はこの場合も漸近安定です。ただし一次項の実部が0なので、線形化だけではこの減衰は判定できません。

**$\mu>0$** では

$$
0<r<\sqrt\mu
\Longrightarrow r'>0.
$$

原点の不安定性を具体的に確認するため

$$
\varepsilon=\frac{\sqrt\mu}{2}
$$

と置きます。$0<r\le\varepsilon$ なら

$$
r'
=
r(\mu-r^2)
\ge
\frac{3\mu}{4}r.
$$

従って任意に小さい $r(0)>0$ から出ても、$r=\varepsilon$ に達するまでは

$$
r(t)\ge r(0)e^{3\mu t/4},
$$

なので有限時間で固定距離 $\varepsilon$ まで離れます。よって原点は不安定です。

一方

$$
r=\sqrt\mu
$$

では半径一定、$\theta'=1$ なので周期 $2\pi$ の周期軌道です。$0<r<\sqrt\mu$ では $r'>0$、$r>\sqrt\mu$ では $r'<0$ なので、周期軌道の近くでは半径は $\sqrt\mu$ へ向かって単調に動きます。単調有界なので極限を持ち、極限で $r(\mu-r^2)=0$ が必要です。原点から離れた近傍を考えているので極限は $\sqrt\mu$ です。従ってこの周期軌道は半径方向に局所漸近安定です。

従って $\mu=0$ を境に、安定な原点が不安定化し、$\mu>0$ 側に安定周期軌道が現れます。

ここで使ったのは与えられた正規形の直接計算だけです。一般の Hopf 分岐定理を任意の非線形系へ適用するには、追加の簡約理論と非退化条件が必要です。
<!-- solution-end -->

## 7. 章末チェック

- 三つの一次元局所分岐正規形を分類できる。
- Hopf 正規形を極座標へ直して周期軌道を直接導ける。
- 一般 Hopf 定理との証明範囲の違いを説明できる。
- Poincaré 写像で周期軌道を固定点へ変換できる。
- 発散の一周積分から平面周期軌道の乗数を計算できる。
