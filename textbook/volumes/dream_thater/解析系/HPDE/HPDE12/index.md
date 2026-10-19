# HPDE12 Minkowskiの先進・遅延基本解

[HPDE11の局所Cauchy解](../HPDE11/index.md#thm-hpde11-local-cauchy)は、滑らかな初期データと滑らかな源から解を作りました。しかし、時空の一点で瞬間的に生じた源を表すDiracデルタは、滑らかな関数ではありません。点源に対する応答が分かれば、一般の源に対する応答も積分で組み立てられます。**どの係数で点源を正規化し、どこまで影響が届くのか**を、平坦時空で計算してみます。

この講義では時空の計量を $g=-dt^2+\sum_{j=1}^n(dx^j)^2$、未来向きを $t$ の増加方向とし、$n=1$ または $n=3$ を扱います。[HPDE1の符号規約](../HPDE1/index.md#def-hpde1-flat-wave-operator)と同じく

$$
P=-\Box_g=\partial_t^2-\Delta_x,\qquad
\Delta_x=\sum_{j=1}^n\partial_{x^j}^2
$$

とします。速度は $1$、質量項は零です。時空上の試験関数の空間は $C_c^\infty(\mathbb R^{1+n})$、時空積分は $dt\,dx$ とし、[HPDE3の点源](../HPDE3/index.md#def-hpde3-point-source)とその[台](../HPDE3/index.md#def-hpde3-distribution-support)を用います。

## 1. 点源と二つの時間方向

初期時刻に与えられる速度データ $h(x)$ と、時空の源 $f(t,x)$ は別の対象です。一点 $(s,y)$ に置いた時空点源 $\delta_{(s,y)}$ は試験関数 $\varphi$ へ $\varphi(s,y)$ を返します。基準点 $0=(0,0)$ の点源は $\delta_0(t)\delta_0(x)$ です。ここで二つのデルタは時間と空間にそれぞれ作用します。

点源の**未来**でだけ応答するものを遅延、点源の**過去**でだけ応答するものを先進と呼ぶことにします。名前は観測の立場で紛らわしくなるため、支持条件を同時に書いて定義します。[LORG6のMinkowski因果集合の定理](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)によれば、基準点からの未来・過去は

$$
J^+(0)=\{(t,x):t\ge |x|\},\qquad
J^-(0)=\{(t,x):-t\ge |x|\}.
$$

<a id="def-hpde12-point-fundamental"></a>
<!-- formal-statement-start -->
> **定義（点源基本解と遅延・先進支持）**  
> $n\in\{1,3\}$、$P=\partial_t^2-\Delta_x$ とする。時空上の超関数 $F$ が

$$
PF=\delta_0(t)\delta_0(x)
$$

> を満たすとき、基準点の点源基本解という。さらに $\operatorname{supp}F\subset J^+(0)$ なら**遅延基本解**、$\operatorname{supp}F\subset J^-(0)$ なら**先進基本解**という。超関数の微分は試験関数との双対作用で定義する。
<!-- formal-statement-end -->

ここで $PF$ の意味は、形式的双対を使って

$$
\langle PF,\varphi\rangle
=\langle F,P\varphi\rangle
\quad(\varphi\in C_c^\infty)
$$

とすることです。平坦な定数係数 $P$ は部分積分で自身に一致しますが、一般の束値作用素まで自己随伴だとは主張していません。[HPDE4の形式的双対](../HPDE4/index.md#def-hpde4-formal-transpose)がその区別を扱います。

**直接例（定義の確認）**。$\delta_0$ 自体は基本解ではありません。例えば $\varphi(t,x)=t^2\chi(t,x)$ とし、原点近くで $\chi=1$ となる試験関数を選ぶと

$$
\langle P\delta_0,\varphi\rangle
=P\varphi(0,0)=2,\qquad
\langle\delta_0,\varphi\rangle=\varphi(0,0)=0.
$$

したがって $P\delta_0\ne\delta_0$ です。点源の位置と、それへの応答を混同できないことが分かります。

## 2. 時間断面の分布から時空基本解を作る

[ODE5の単位階段関数](../../ODE/ODE5/index.md#def-ode5-unit-step) $H(t)$ は $t>0$ で $1$、$t<0$ で $0$ とします。$t=0$ の値は分布には影響しません。まず $t\ge0$ で空間変数の分布 $K_t$ を作り、$t<0$ では零にして時空分布へ組み立てます。ここで「空間分布として二回連続微分可能」とは、各空間試験関数 $\psi$ に対して $t\mapsto\langle K_t,\psi\rangle$ が $t=0$ を含めて二回連続微分可能という意味です。零へ延長した時空分布 $F$ は、時空試験関数 $\varphi$ に

$$
\langle F,\varphi\rangle
=\int_0^\infty\langle K_t,\varphi(t,\cdot)\rangle\,dt
$$

で作用します。以下の二模型ではこの積分表示を直接構成します。この方法なら、光円錐の頂点にある $r=|x|=0$ でも曖昧な $1/r$ を直接掛けずに済みます。

<a id="lem-hpde12-time-jump"></a>
<!-- formal-statement-start -->
> **補題（時間境界の跳躍と点源）**  
> $K_t$ は $t\ge0$ に対して空間分布として二回連続微分可能であり、$t>0$ で $K_t''=\Delta_xK_t$、$K_0=0$、$K'_0=\delta_0(x)$ を満たすとする。$F$ を $t>0$ で $K_t$、$t<0$ で零と定めた時空分布とすると

$$
(\partial_t^2-\Delta_x)F=\delta_0(t)\delta_0(x).
$$
<!-- formal-statement-end -->

補題の仮定には、空間微分の等式だけでなく、時間境界での二つの値 $K_0$ と $K'_0$ が含まれます。以下で三条件を別々に検算します。

### 証明の見取り図

$t>0$ の斉次方程式だけでは、時刻 $0$ にある点源は現れません。時刻 $0$ を横切る分布微分で出る境界項が、点源の係数を決めます。

<!-- proof-start -->
### 証明

空間試験関数 $\psi$ を固定し、$k(t)=\langle K_t,\psi\rangle$ と置きます。$k(0)=0$、$k'(0)=\psi(0)$ です。任意の時間試験関数 $\eta$ に対し、二回の部分積分で

$$
\begin{aligned}
\langle (Hk)'',\eta\rangle
&=\int_0^\infty k(t)\eta''(t)\,dt\\
&=-k(0)\eta'(0)+k'(0)\eta(0)
 +\int_0^\infty k''(t)\eta(t)\,dt\\
&=\psi(0)\eta(0)+\int_0^\infty
 \langle\Delta_xK_t,\psi\rangle\eta(t)\,dt.
\end{aligned}
$$

二行目の無限遠の境界項は $\eta$ がコンパクト台なので消えます。$k(0)=0$ を使ったので $\delta'_0(t)$ 項も消えます。時間・空間の積型試験関数 $\eta(t)\psi(x)$ について

$$
\langle PF,\eta\psi\rangle=\eta(0)\psi(0)
$$

です。有限和の積型試験関数は試験関数位相で稠密なので、すべての $\varphi\in C_c^\infty(\mathbb R^{1+n})$ に同じ等式が成立します。$\square$
<!-- proof-end -->

この補題を使うには、**各次元の $K_t$ が本当に斉次波動方程式を満たすこと**と、$K'_0$ の係数がちょうど $1$ であることを別々に計算しなければなりません。

## 3. 1+1次元：光円錐の内部が応答する

[HPDE1のd'Alembert公式](../HPDE1/index.md#prop-hpde1-null-factorization)では、初期速度データの積分区間が $[x-t,x+t]$ でした。速度を原点のデルタに近づければ、その積分区間が原点を含む場合だけ応答します。この直観を分布の式で確かめます。

$t\ge0$ と $\psi\in C_c^\infty(\mathbb R)$ に対し

$$
\langle K_t^{(1)},\psi\rangle
=\frac12\int_{-t}^{t}\psi(x)\,dx
$$

と置きます。端点を動かす微分により

$$
\begin{aligned}
\frac{d}{dt}\langle K_t^{(1)},\psi\rangle
&=\frac12\{\psi(t)+\psi(-t)\},\\
\frac{d^2}{dt^2}\langle K_t^{(1)},\psi\rangle
&=\frac12\{\psi'(t)-\psi'(-t)\}\\
&=\frac12\int_{-t}^{t}\psi''(x)\,dx
=\langle\partial_x^2K_t^{(1)},\psi\rangle.
\end{aligned}
$$

$t=0$ では第一積分は零、第一導関数は $\psi(0)$。補題の三条件が成立しました。

<a id="thm-hpde12-one-dimensional"></a>
<!-- formal-statement-start -->
> **定理（1+1次元の遅延・先進点源基本解）**  
> $P=\partial_t^2-\partial_x^2$ とする。次の局所可積分関数が定める時空分布は、順に遅延・先進点源基本解である。

$$
F_{\mathrm{ret}}^{(1)}(t,x)=\frac12H(t-|x|),\qquad
F_{\mathrm{adv}}^{(1)}(t,x)=\frac12H(-t-|x|).
$$

> すなわち両者の波動作用素による像は、どちらも原点の点源である。

$$
PF_{\mathrm{ret}}^{(1)}=PF_{\mathrm{adv}}^{(1)}
=\delta_0(t)\delta_0(x).
$$

> 支持はそれぞれ $J^+(0)$、$J^-(0)$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

時間断面 $K_t^{(1)}$ を零の過去へつなぐと $H(t-|x|)/2$ です。時間反転は $P$ の符号を変えず、因果方向だけを逆にします。

<!-- proof-start -->
### 証明

$t>0$ における $K_t^{(1)}$ は、空間変数で値 $1/2$ を区間 $[-t,t]$ 上に持つ局所可積分関数の分布です。$t<0$ を零とすると $F_{\mathrm{ret}}^{(1)}$ になります。以上で $K_t^{(1)}$ の条件が揃ったため、[時間境界の跳躍と点源](#lem-hpde12-time-jump)を適用すると $PF_{\mathrm{ret}}^{(1)}=\delta_0(t)\delta_0(x)$ です。

この分布は $t<|x|$ で零です。一方 $t>|x|$ の内部では $1/2$ という非零定数なので、全内部が台に入り、その閉包が $J^+(0)$ です。

$R(t,x)=(-t,x)$ とし、時間反転で引き戻した $F_{\mathrm{adv}}^{(1)}(t,x)=F_{\mathrm{ret}}^{(1)}(-t,x)$ を考えます。$\partial_t^2$ と $\partial_x^2$ は時間反転に可換で、原点のデルタも不変です。従って $PF_{\mathrm{adv}}^{(1)}=\delta_0(t)\delta_0(x)$。支持は $R(J^+(0))=J^-(0)$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-hpde12-point-fundamental -->
**定義の確認**。1+1次元の点源基本解について、 $t>0$ で $K_t(\psi)=\frac12\int_{-t}^{t}\psi(x)\,dx$ とすると、先ほどの端点微分から $K_0=0$、$K'_0=\delta_0$、$K_t''=\partial_x^2K_t$ です。したがって[時間境界の跳躍と点源](#lem-hpde12-time-jump)の三条件により $PF_{\mathrm{ret}}^{(1)}=\delta_0(t)\delta_0(x)$ が成立します。さらに $F_{\mathrm{ret}}^{(1)}=1/2$ となる開集合 $t>|x|$ は非零、$t<|x|$ で零なので、台はちょうど $J^+(0)$ です。これで**方程式と支持条件の両方**を直接確認しました。

$t=2$ の断面は $-2\le x\le2$ で $1/2$、外では零です。$t=1$ と $x=0$ で値が $1/2$ なのは誤差ではなく、**一次元では光円錐の内部にも応答がある**という性質です。[HPDE2の強いHuygens性](../HPDE2/index.md#def-hpde2-strong-huygens)と区別してください。
<!-- definition-example-end -->

## 4. 3+1次元：球面上だけが応答する

三次元空間では波は球面状に広がります。[HPDE2の球面平均](../HPDE2/index.md#def-hpde2-spherical-mean)を使い、$t\ge0$ と $\psi\in C_c^\infty(\mathbb R^3)$ に対し

$$
M_\psi(t)=\frac1{4\pi}\int_{S^2}\psi(t\omega)\,d\omega,\qquad
\langle K_t^{(3)},\psi\rangle=tM_\psi(t)
$$

と置きます。$d\omega$ は単位球面の面積要素、$\int_{S^2}d\omega=4\pi$ です。$t=0$ で $\langle K_0^{(3)},\psi\rangle=0$。微分すると

$$
\frac{d}{dt}\{tM_\psi(t)\}
=M_\psi(t)+tM_\psi'(t)
\ \longrightarrow\ \psi(0)\quad(t\downarrow0).
$$

ここで $M_\psi(0)=\psi(0)$、$M'_\psi(t)$ は滑らかで原点近傍で有界だからです。次に斉次方程式を直接検証します。

<a id="lem-hpde12-radial-mean"></a>
<!-- formal-statement-start -->
> **補題（三次元球面平均の波動恒等式）**  
> $\psi\in C_c^\infty(\mathbb R^3)$、$M_\psi(t)=(4\pi)^{-1}\int_{S^2}\psi(t\omega)\,d\omega$ とすると、$t>0$ で

$$
\frac{d^2}{dt^2}\{tM_\psi(t)\}
=tM_{\Delta\psi}(t)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

球面上の半径微分の平均と球内のLaplace積分を、Gaussの発散定理で対応させます。半径 $t$ に伴う球面積の $t^2$ が係数 $2/t$ を生みます。

<!-- proof-start -->
### 証明

$B_t=\{x:|x|\le t\}$、外向き半径方向を $\partial_r$ とします。球面 $x=t\omega$ の面積要素は $dS_x=t^2d\omega$ です。[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を $\nabla\psi$ に適用して

$$
4\pi t^2 M'_\psi(t)
=\int_{|x|=t}\partial_r\psi(x)\,dS_x
=\int_{B_t}\Delta\psi(x)\,dx.
$$

球の半径について両辺を微分すると、右辺は $\int_{|x|=t}\Delta\psi\,dS_x=4\pi t^2M_{\Delta\psi}(t)$ です。左辺は $4\pi(2tM'_\psi+t^2M''_\psi)$ なので

$$
M_\psi''(t)+\frac2tM_\psi'(t)=M_{\Delta\psi}(t).
$$

最後に積の微分を行い、

$$
(tM_\psi)''=2M_\psi'+tM_\psi''
=t\left(M_\psi''+\frac2tM_\psi'\right)
=tM_{\Delta\psi}
$$

を得ます。$t=0$ で $2/t$ を使っていないことにも注意してください。$\square$
<!-- proof-end -->

ここまでで $K_t^{(3)}$ は前節の時間跳躍補題の条件をすべて満たしました。核を図式的な $\delta(t-r)/r$ と書く前に、**分布の作用そのもの**を定義として固定します。

<a id="thm-hpde12-three-dimensional"></a>
<!-- formal-statement-start -->
> **定理（3+1次元の遅延・先進点源基本解）**  
> $P=\partial_t^2-\Delta_x$ とし、時空試験関数 $\varphi$ に対して

$$
\begin{aligned}
\langle F_{\mathrm{ret}}^{(3)},\varphi\rangle
&=\int_0^\infty\frac{t}{4\pi}
  \int_{S^2}\varphi(t,t\omega)\,d\omega\,dt,\\
\langle F_{\mathrm{adv}}^{(3)},\varphi\rangle
&=\int_0^\infty\frac{t}{4\pi}
  \int_{S^2}\varphi(-t,t\omega)\,d\omega\,dt
\end{aligned}
$$

> と定める。この二つは遅延・先進点源基本解であり、支持はそれぞれ未来・過去の光円錐**面**に等しい。$r=|x|>0$ の領域では、それぞれ

$$
F_{\mathrm{ret}}^{(3)}=\frac{\delta(t-r)}{4\pi r},\qquad
F_{\mathrm{adv}}^{(3)}=\frac{\delta(t+r)}{4\pi r}
$$

> と表示できる。後者の表示は $r=0$ の式を直接定義しているわけではなく、上の球面積分が原点を含む分布の定義である。
<!-- formal-statement-end -->

### 証明の見取り図

$tM_\psi$ が空間断面の核です。球面積 $4\pi t^2$ に対し、波の振幅の $1/(4\pi t)$ が掛かるため、断面作用は $tM_\psi$ になります。原点での正規化は時間導関数が $\psi(0)$ になることで確認します。

<!-- proof-start -->
### 証明

各 $t\ge0$ の $K_t^{(3)}$ は球面上の積分で定まり、$t\mapsto\langle K_t^{(3)},\psi\rangle=tM_\psi(t)$ です。[球面平均の補題](#lem-hpde12-radial-mean)により $K_t''=\Delta_xK_t$。また $K_0=0$、$K_0'=\delta_0(x)$ は先に計算しました。[時間跳躍補題](#lem-hpde12-time-jump)から

$$
PF_{\mathrm{ret}}^{(3)}=\delta_0(t)\delta_0(x).
$$

次に表示の係数を検算します。$t>0$ で極座標 $x=r\omega$ を使えば $dx=r^2dr\,d\omega$。形式的な $\delta(t-r)/(4\pi r)$ を試験関数と積分して

$$
\begin{aligned}
\int_{\mathbb R^3}
  \frac{\delta(t-|x|)}{4\pi|x|}\psi(x)\,dx
&=\frac1{4\pi}\int_{S^2}\int_0^\infty
   r\,\delta(t-r)\psi(r\omega)\,dr\,d\omega\\
&=\frac{t}{4\pi}\int_{S^2}\psi(t\omega)\,d\omega.
\end{aligned}
$$

したがって係数は $1/(4\pi r)$ です。$r=0$ ではこの形式式に代入せず、定理冒頭の球面積分で分布としての意味を与えました。$t>0$ の断面は半径 $t$ の球面だけに支えられ、その球面のどの開片でも非零試験関数を取れるので、支持は未来の光円錐面の閉包（頂点を含む）です。

時間反転 $t\mapsto-t$ で $P$ と原点デルタは不変なので、先進側も $PF_{\mathrm{adv}}^{(3)}=\delta_0(t)\delta_0(x)$ です。支持は過去の光円錐面となり、表示も $\delta(t+r)/(4\pi r)$ へ変わります。$\square$
<!-- proof-end -->

時に $H(t)\delta(t^2-r^2)/(2\pi)$ と書く流儀があります。**$r>0$ に限定すれば** $\delta(t^2-r^2)=\{\delta(t-r)+\delta(t+r)\}/(2r)$ から同じ係数を得ます。しかし $t=r=0$ は $t^2-r^2$ の臨界点なので、この一次元のデルタ合成公式をそのまま頂点へ適用するのは正当化になりません。本講では球面積分が正規化と頂点を同時に決めます。

**直接例（正規化の再確認）**。$\psi(x)=a+b\cdot x+c|x|^2$ を原点近くで切断した試験関数とし、球面がその近傍に収まる小さい $t$ を取ります。$\int_{S^2}\omega\,d\omega=0$、$|\omega|=1$ から

$$
\langle K_t^{(3)},\psi\rangle=t(a+ct^2),\qquad
\left.\frac{d}{dt}\langle K_t^{(3)},\psi\rangle\right|_{t=0}=a=\psi(0).
$$

これが $4\pi$ の係数を間違えると崩れる検算です。

## 5. 点源の核と、一般の源に作用するGreen型演算を区別する

$F_{\mathrm{ret}}(t,x)$ は**原点に置いた一つの点源**への分布的応答です。源が $(s,y)$ に移動すれば、平行移動不変性により核は $F_{\mathrm{ret}}(t-s,x-y)$ になります。この二つの引数の対応を明記して、滑らかなコンパクト台源を積分します。

<a id="def-hpde12-convolution-operators"></a>
<!-- formal-statement-start -->
> **定義（Minkowski模型の遅延・先進畳み込み作用素）**  
> $n=1,3$ とし、$F_{\mathrm{ret}}^{(n)},F_{\mathrm{adv}}^{(n)}$ を上の点源基本解とする。$f\in C_c^\infty(\mathbb R^{1+n})$ に対し、源の変数を $(s,y)$、観測点を $(t,x)$ として

$$
(G_{\mathrm{ret}}f)(t,x)
=\langle F_{\mathrm{ret}}^{(n)}(\tau,z),
 f(t-\tau,x-z)\rangle_{\tau,z},
$$

$$
(G_{\mathrm{adv}}f)(t,x)
=\langle F_{\mathrm{adv}}^{(n)}(\tau,z),
 f(t-\tau,x-z)\rangle_{\tau,z}
$$

> と定める。右辺は $F*f$ という分布と試験関数の畳み込みであり、入力 $f$ を固定すれば滑らかな関数を与える。
<!-- formal-statement-end -->

コンパクト台の $f$ を固定したとき、$(\tau,z)\mapsto f(t-\tau,x-z)$ は試験関数です。従って定義域は明確です。この核の引数の順番を逆にすると、遅延と先進が入れ替わります。

<!-- definition-example-start: def-hpde12-convolution-operators -->
**定義の確認**。$1+1$ 次元では未来円錐の指示関数を代入して

$$
(G_{\mathrm{ret}}f)(t,x)
=\frac12\int_{-\infty}^{t}
 \int_{x-(t-s)}^{x+(t-s)} f(s,y)\,dy\,ds.
$$

$3+1$ 次元では $z=\tau\omega$ として

$$
(G_{\mathrm{ret}}f)(t,x)
=\int_0^\infty\frac{\tau}{4\pi}
  \int_{S^2}f(t-\tau,x-\tau\omega)\,d\omega\,d\tau.
$$

先進核では時間反転により、一次元と三次元でそれぞれ

$$
(G_{\mathrm{adv}}f)(t,x)
=\frac12\int_t^\infty\int_{x-(s-t)}^{x+(s-t)}
f(s,y)\,dy\,ds,
$$

$$
(G_{\mathrm{adv}}f)(t,x)
=\int_0^\infty\frac{\tau}{4\pi}
\int_{S^2}f(t+\tau,x-\tau\omega)\,d\omega\,d\tau
$$

となります。遅延側は $s\le t$ かつ $|x-y|\le t-s$（三次元では等号）の源のみ、先進側は $s\ge t$ かつ $|x-y|\le s-t$（三次元では等号）の源のみを使います。これで定義の**両方の因果方向**を積分範囲から確認できます。
<!-- definition-example-end -->

<a id="thm-hpde12-convolution-inverses"></a>
<!-- formal-statement-start -->
> **定理（平坦波動作用素の畳み込み逆と因果的支持）**  
> $n=1,3$、$P=\partial_t^2-\Delta_x$、$f\in C_c^\infty(\mathbb R^{1+n})$ とする。上で定義した $G_{\mathrm{ret}}f,G_{\mathrm{adv}}f$ は滑らかで、

$$
PG_{\mathrm{ret}}f=G_{\mathrm{ret}}Pf=f,\qquad
PG_{\mathrm{adv}}f=G_{\mathrm{adv}}Pf=f
$$

> が成り立つ。また

$$
\operatorname{supp}(G_{\mathrm{ret}}f)
 \subset J^+(\operatorname{supp}f),\qquad
\operatorname{supp}(G_{\mathrm{adv}}f)
 \subset J^-(\operatorname{supp}f).
$$

> この主張は入力 $C_c^\infty$ に対するもので、像がコンパクト台であるとは述べない。
<!-- formal-statement-end -->

### 証明の見取り図

点源の等式 $PF=\delta$ を、コンパクトな滑らかな源との畳み込みへ移します。微分を核へ動かす操作と源へ動かす操作をそれぞれ検証し、支持は核が非零になり得る因果関係から求めます。

<!-- proof-start -->
### 証明

$f$ のコンパクト支持より、$(t,x)$ をコンパクト集合内で動かすと $f(t-\tau,x-z)$ の試験関数としての支持は共通のコンパクト集合に収まります。従って $(t,x)$ について任意回微分でき、

$$
\partial_{t,x}^\alpha(F*f)
=\langle F(\tau,z),
   \partial_{t,x}^\alpha f(t-\tau,x-z)\rangle
=F*(\partial^\alpha f)
$$

となり、$F*f$ は滑らかです。$P$ の係数が定数なので $P(F*f)=F*(Pf)$。

他方、$\partial_{t}f(t-\tau,x-z)=-\partial_\tau f(t-\tau,x-z)$、$\partial_{x_j}f=-\partial_{z_j}f$ です。二階微分については負号が二回掛かって消えます。分布の微分を用いると

$$
\begin{aligned}
F*(Pf)
&=\langle F,(P_{\tau,z}f)(t-\tau,x-z)\rangle\\
&=\langle P_{\tau,z}F,f(t-\tau,x-z)\rangle\\
&=\langle\delta_0(\tau)\delta_0(z),
        f(t-\tau,x-z)\rangle=f(t,x).
\end{aligned}
$$

ここで各次元の[点源基本解定理](#thm-hpde12-one-dimensional)または[三次元の定理](#thm-hpde12-three-dimensional)を使いました。従って $PGf=GPf=f$ です。

遅延側について、$(t,x)\notin J^+(\operatorname{supp}f)$ とします。この因果未来が閉集合であることも確認できます。$K=\operatorname{supp}f$ とし、$J^+(K)$ 内の点列 $(t_j,x_j)\to(T,X)$ に対して、[Minkowski因果到達条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)から $(s_j,y_j)\in K$ を選ぶと

$$
t_j-s_j\ge|x_j-y_j|.
$$

$K$ のコンパクト性により部分列で $(s_j,y_j)\to(s,y)\in K$ とでき、不等式の極限は $T-s\ge|X-y|$ です。従って $(T,X)\in J^+(K)$ であり、$J^+(K)$ は閉集合です。よって $(t,x)$ の小近傍は $J^+(K)$ と交わりません。遅延核の支持には $\tau\ge|z|$ が必要ですが、$f(t-\tau,x-z)\ne0$ と両立するなら $(t,x)$ はその源点から因果未来にあるはずで、矛盾します。従ってその近傍で $G_{\mathrm{ret}}f=0$。先進側も時間向きを逆にして同じです。$\square$
<!-- proof-end -->

この逆の等式は、$G_{\mathrm{ret}}$ を**任意の非コンパクト源**へそのまま定義したことを意味しません。因果支持を保つ作用素の大域的な定義域はHPDE18–20で調べます。

### 衝撃源は初期速度の解を取り戻す

滑らかなコンパクト台 $h(x)$ と時刻に集中した源 $f(t,x)=\delta_0(t)h(x)$ を考えます。これは $C_c^\infty$ ではなくコンパクト台分布ですが、ここでは時間のデルタを核へ作用させることで直接計算できます。

$$
u(t,x)=
\begin{cases}
\displaystyle\frac12H(t)\int_{x-t}^{x+t}h(y)\,dy,&n=1,\\[6pt]
\displaystyle H(t)\frac{t}{4\pi}\int_{S^2}h(x+t\omega)\,d\omega,&n=3.
\end{cases}
$$

三次元の表示では、$f(t-\tau,x-\tau\omega)=\delta_0(t-\tau)h(x-\tau\omega)$ を代入し、球面の変数を $\omega\mapsto-\omega$ と置き換えて $h(x+t\omega)$ にしました。$t<0$ では零、$t=0$ の右極限で $u(0,x)=0$、$\partial_tu(0+,x)=h(x)$ です。これは[HPDE1のd'Alembert公式の導出](../HPDE1/index.md#prop-hpde1-null-factorization)および[HPDE2のKirchhoff公式](../HPDE2/index.md#thm-hpde2-kirchhoff)と一致します。点源核の正規化を初期値問題からもう一度確かめたことになります。

## 6. 光円錐面と内部、二つの支持の違い

同じ $P=\partial_t^2-\Delta$ でも空間次元によって点源の応答が異なります。

- **1+1次元**：$\operatorname{supp}F_{\mathrm{ret}}^{(1)}=J^+(0)$。光円錐の内部も含み、十分長く観測に残る「尾」があります。
- **3+1次元**：$\operatorname{supp}F_{\mathrm{ret}}^{(3)}=\{(t,x):t=|x|,\ t\ge0\}$。光円錐の**面だけ**にあり、平坦・質量零の強いHuygens性を表します。

ただし、$G_{\mathrm{ret}}f$ の支持が3次元でも**必ず光円錐面の集合になる**と言っているわけではありません。複数の源点から出た光円錐面を重ねると、源全体に対しては空間的な広がりを持ち得ます。また質量項や曲率がある場合に3次元の面支持を無条件に流用できません。後続のHPDE13–14は、この平坦な分布を手本として曲がった時空の近似核を組み立てます。

## 7. 演習：分布の初期値、正規化、因果性

<a id="ex-hpde12-a01"></a>
### A1. 一次元の時間境界
- Level: A
- 問題：$K_t(\psi)=\frac12\int_{-t}^t\psi(x)\,dx$（$t\ge0$）とする。$K_0$、$K'_0$ を空間分布として求め、$K_t''=\partial_x^2K_t$ を確認せよ。

<!-- solution-start -->
**詳細解答**。任意の $\psi\in C_c^\infty(\mathbb R)$ に対して、積分区間が長さ零なので $K_0(\psi)=0$。端点の微分を計算すると

$$
K_t'(\psi)=\frac{\psi(t)+\psi(-t)}2,\quad
K'_0(\psi)=\psi(0)=\delta_0(\psi).
$$

もう一回微分して

$$
K_t''(\psi)=\frac{\psi'(t)-\psi'(-t)}2
=\frac12\int_{-t}^t\psi''(x)\,dx
=(\partial_x^2K_t)(\psi).
$$

従って[時間跳躍補題](#lem-hpde12-time-jump)の三条件がすべて成立します。
<!-- solution-end -->

<a id="ex-hpde12-a02"></a>
### A2. 三次元の球面積と正規化
- Level: A
- 問題：$t>0$、原点近くで $\psi(x)=1+|x|^2$ となる試験関数を取る。球面がその近傍にある $t$ について $K_t^{(3)}(\psi)$、その導関数の $t=0$ での値と、$K_t^{(3)}(\Delta\psi)$ を計算せよ。

<!-- solution-start -->
**詳細解答**。球面上では $\psi(t\omega)=1+t^2$、面積は $4\pi$ なので

$$
K_t^{(3)}(\psi)=\frac{t}{4\pi}\cdot4\pi(1+t^2)=t+t^3.
$$

従って $K'_0(\psi)=1=\psi(0)$。また $\Delta|x|^2=2+2+2=6$、$\Delta1=0$ から

$$
K_t^{(3)}(\Delta\psi)=6t,\qquad
\frac{d^2}{dt^2}(t+t^3)=6t.
$$

正規化と波動恒等式の両方をこの試験関数で検算できました。
<!-- solution-end -->

<a id="ex-hpde12-a03"></a>
### A3. 時間反転と先進核
- Level: A
- 問題：$F(t,x)$ が $PF=\delta_{(0,0)}$ と $\operatorname{supp}F\subset J^+(0)$ を満たすとき、$\widetilde F(t,x)=F(-t,x)$ の方程式と支持を求めよ。$n=1$ の明示式も書け。

<!-- solution-start -->
**詳細解答**。$\widetilde F$ は時間反転による分布の引き戻しです。$\partial_t^2$ は時間反転で符号が二回変わって元に戻り、空間微分は影響されません。原点デルタも不変なので

$$
P\widetilde F=(PF)(-t,x)=\delta_0(t)\delta_0(x).
$$

$F$ の非零点が $-t\ge|x|$ のときだけ現れるので $\operatorname{supp}\widetilde F\subset J^-(0)$。一次元では $\widetilde F=\tfrac12H(-t-|x|)$ です。
<!-- solution-end -->

<a id="ex-hpde12-a04"></a>
### A4. 光円錐面か内部か
- Level: A
- 問題：点 $(t,x)=(2,0)$ に対し、$n=1$ と $n=3$ の遅延点源核の支持への所属を判定せよ。$n=3$ では「値が零」と書いて済ませず、分布の台に基づいて説明せよ。

<!-- solution-start -->
**詳細解答**。$n=1$ では $2>|0|$ なので内部で $F_{\mathrm{ret}}^{(1)}=1/2$、従って台に入ります。$n=3$ では核の台は $t=|x|$ なので、$2\ne0$ より $(2,0)$ は台の外です。実際その点の十分小さい時空近傍は円錐面と交わらず、そこに支持を持つ試験関数 $\varphi$ に対する $\langle F_{\mathrm{ret}}^{(3)},\varphi\rangle$ は球面積分の定義で零です。原点以外で $1/r$ を代入した「値」を論じる必要はありません。
<!-- solution-end -->

<a id="ex-hpde12-b01"></a>
### B1. 三次元のデルタ表示を極座標から導く
- Level: B
- 問題：$t>0$ と $\psi\in C_c^\infty(\mathbb R^3)$ に対して、$F_{\mathrm{ret}}^{(3)}=\delta(t-r)/(4\pi r)$ の空間断面作用を $dx=r^2dr\,d\omega$ から計算せよ。$1/(4\pi r^2)$ と誤って置くと初期速度の正規化がどう壊れるかも示せ。

<!-- solution-start -->
**詳細解答**。正しい係数では

$$
\int_{\mathbb R^3}\frac{\delta(t-r)}{4\pi r}\psi(x)\,dx
=\frac1{4\pi}\int_{S^2}\int_0^\infty
r\delta(t-r)\psi(r\omega)\,dr\,d\omega
=tM_\psi(t).
$$

従って時間導関数の $t=0$ での値は $\psi(0)$。誤って $1/(4\pi r^2)$ とすると同じ計算は $M_\psi(t)$ となり、$t\downarrow0$ で $\psi(0)$ が残ります。つまり $K_0=\delta_0$ となり、$K_0=0$ という時間跳躍補題の条件を破ります。点源の係数を同じにできません。
<!-- solution-end -->

<a id="ex-hpde12-b02"></a>
### B2. 畳み込みの二方向の逆
- Level: B
- 問題：$f\in C_c^\infty(\mathbb R^{1+n})$、$n=1$ または $3$、$F$ は本講の点源基本解とする。$P(F*f)=f$ と $F*(Pf)=f$ を、どこで定数係数とコンパクト台を使うかを明示して証明せよ。

<!-- solution-start -->
**詳細解答**。コンパクト台 $f$ により $f(t-\tau,x-z)$ は核 $F$ に作用させられる試験関数です。$t,x$ の微分をその中へ移せるため

$$
P(F*f)=F*(Pf).
$$

ここで $P$ の係数が定数なので、$(\tau,z)$ 側にも同じ $P$ を使えます。各二階微分で二つの負号が相殺し、分布の微分による部分積分でも二階の符号は正となります。[一次元](#thm-hpde12-one-dimensional)または[三次元](#thm-hpde12-three-dimensional)の点源基本解定理によって $PF=\delta_{(0,0)}$ だから

$$
F*(Pf)=(PF)*f=\delta_{(0,0)}*f=f.
$$

最後の等式は $f(t-0,x-0)=f(t,x)$ を原点デルタが評価するからです。従って $P(F*f)=f$ も成立します。
<!-- solution-end -->

<a id="ex-hpde12-b03"></a>
### B3. 衝撃源から初期速度を取り出す
- Level: B
- 問題：$h\in C_c^\infty(\mathbb R)$ とし、$f(t,x)=\delta_0(t)h(x)$ とする。$1+1$ 次元遅延核との畳み込みから $u(t,x)$ を計算し、$u(0+,x)=0$、$u_t(0+,x)=h(x)$ を直接確かめよ。

<!-- solution-start -->
**詳細解答**。源の時間デルタを先に作用させると

$$
u(t,x)=\frac12H(t)\int_{\mathbb R}
{\bf1}_{|x-y|\le t}h(y)\,dy
=\frac12H(t)\int_{x-t}^{x+t}h(y)\,dy.
$$

$t>0$ でLeibniz則を用い、

$$
u_t(t,x)=\frac12\{h(x+t)+h(x-t)\}.
$$

よって $t\downarrow0$ の極限で $u_t\to h(x)$、また積分区間が零へ縮むため $u\to0$ です。$t<0$ は零なので、$t=0$ での速度の跳躍が時空のデルタ源に対応します。
<!-- solution-end -->

<a id="ex-hpde12-b04"></a>
### B4. 空間次元による伝播の尾
- Level: B
- 問題：$h\ge0$、$h\not\equiv0$ を $C_c^\infty(\mathbb R)$ とし、支持が $[-R,R]$ に含まれるとする。$u(t,0)=\frac12\int_{-t}^t h(y)\,dy$ は $t>R$ でどうなるか。$3+1$ 次元で $h\in C_c^\infty(\mathbb R^3)$、支持が半径 $R$ の球にある場合の $u(t,0)$ と比較せよ。

<!-- solution-start -->
**詳細解答**。一次元では $t>R$ の積分区間が $\operatorname{supp}h$ を含むので

$$
u(t,0)=\frac12\int_{\mathbb R}h(y)\,dy>0.
$$

一方、三次元の衝撃速度に対する式は

$$
u(t,0)=\frac{t}{4\pi}\int_{S^2}h(t\omega)\,d\omega.
$$

$t>R$ では $|t\omega|=t>R$ だから積分の被積分関数がすべて零で、$u(t,0)=0$ です。一次元の内部の尾と、三次元の光円錐面だけの応答が区別されます。
<!-- solution-end -->

<a id="ex-hpde12-c01"></a>
### C1. 点源・二変数核・因果作用素の接続
- Level: C
- 問題：$n=3$、$f\in C_c^\infty(\mathbb R^{1+3})$ とする。$F_{\mathrm{ret}}^{(3)}$ の球面積分を出発点に、(i) $G_{\mathrm{ret}}f$ の表示、(ii) $PG_{\mathrm{ret}}f=f$、(iii) $\operatorname{supp}(G_{\mathrm{ret}}f)\subset J^+(\operatorname{supp}f)$ を証明せよ。核を $F(t-s,x-y)$ と書くとき各変数が何を意味するかも説明せよ。

<!-- solution-start -->
**詳細解答**。(i) 観測点を $(t,x)$、源点を $(s,y)$ とし、差を $(\tau,z)=(t-s,x-y)$ とします。球面の定義から

$$
(G_{\mathrm{ret}}f)(t,x)
=\int_0^\infty\frac{\tau}{4\pi}
\int_{S^2}f(t-\tau,x-\tau\omega)\,d\omega\,d\tau.
$$

(ii) $f$ が滑らかでコンパクト台なので、$(t,x)$ 微分を被積分関数へ移せます。定数係数 $P$ の二階微分を $(\tau,z)$ に移すと、$P_{\tau,z}F=\delta_{(0,0)}$ が使えます。

$$
PG_{\mathrm{ret}}f
=F_{\mathrm{ret}}^{(3)}*(Pf)
=(PF_{\mathrm{ret}}^{(3)})*f
=\delta_{(0,0)}*f=f.
$$

ここで $PF=\delta$ の等式は[三次元点源基本解の定理](#thm-hpde12-three-dimensional)から得られます。

(iii) 核に寄与する $\tau$ は $\tau\ge0$ で、空間差は $z=\tau\omega$ です。したがって $s=t-\tau\le t$、$|x-y|=|z|=\tau=t-s$。寄与できる源点 $(s,y)\in\operatorname{supp}f$ は必ず観測点 $(t,x)$ の因果的過去にあります。因果未来集合はコンパクトな源支持に対して閉じているので、その補集合の各点では近傍全体で積分が零になり、所望の台の包含を得ます。これは入力がコンパクトな滑らかな源の場合の議論です。
<!-- solution-end -->

---

この章で構成したのは**Minkowski時空の定数係数・質量零の点源基本解**です。曲がった時空や一般の束値作用素では、平行移動で $F(t-s,x-y)$ と書くことも、光円錐面のみに核が載ることも自明ではありません。次のHPDE13では局所幾何と輸送方程式を用いて、この構成のどの部分を一般化できるか検討します。
