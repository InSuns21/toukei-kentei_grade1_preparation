# AQFT11 正エネルギーと解析性

[AQFT3で定義した正エネルギー条件](../AQFT3/index.md#def-aqft3-spectrum)は、平行移動の四つの生成作用素の同時スペクトルを未来光円錐内に制限します。[AQFT9の真空表現](../AQFT9/index.md#def-aqft9-local-vn-net)では、観測量を真空ベクトルに作用させて得るベクトルを調べられます。ところが、ある狭い時空領域の期待値が零であるとき、別の場所でも零だと言えるのでしょうか。連続性だけからは言えません。

本講で準備する鍵は、正エネルギーの指数因子が**複素化した未来方向で減衰する**ことです。これにより実並進の行列要素を正則関数の境界値として扱えます。その境界値が実時空の開集合で消えたとき、正則性の一意性が全時空への零の伝播を強制します。次講 AQFT12 は、この伝播と局所netの生成条件を組み合わせて Reeh–Schlieder 定理を証明します。**正エネルギーだけから局所巡回性を主張するものではありません。**

舞台は計量符号 $(-+++)$ の四次元Minkowski時空です。以下の内積は第2変数線形とし、四元運動量と並進変数の組合せを

$$
p\cdot x:=p^0t-\boldsymbol p\cdot\boldsymbol x,
\qquad x=(t,\boldsymbol x)
$$

と固定します。これはMinkowski計量そのものによる内積 $-p^0t+\boldsymbol p\cdot\boldsymbol x$ の**負号を取った組合せ**です。

## 1. スペクトル条件はどの複素方向で減衰を与えるか

四次元並進群の強連続ユニタリ表現 $U$ を持つ複素Hilbert空間 $\mathcal H$ を取ります。[AQFT3の同時スペクトル表示](../AQFT3/index.md#def-aqft3-spectrum)と同じ記法を用いると、共同射影値測度 $E$ により

$$
U(x)=\int_{\mathbb R^4}e^{ip\cdot x}\,dE(p),
\qquad
\operatorname{supp}E\subset\overline V_+
$$

です。ここで $\overline V_+=\{(p^0,\boldsymbol p):p^0\ge|\boldsymbol p|\}$ は未来閉光円錐です。支持条件は全てのスペクトル積分に適用する仮定であって、単に時間生成作用素 $H$ が非負という条件と取り違えません。

実変数 $x$ を $z=x+iy$ に置き換えてみます。虚部 $y=(s,\boldsymbol y)$ が $s>|\boldsymbol y|$ を満たすとき

$$
\begin{aligned}
|e^{ip\cdot(x+iy)}|
&=\exp(-p^0s+\boldsymbol p\cdot\boldsymbol y)\\
&\le\exp(-p^0(s-|\boldsymbol y|))\le1
\qquad(p\in\overline V_+).
\end{aligned}
$$

第一の不等式は $\boldsymbol p\cdot\boldsymbol y\le|\boldsymbol p||\boldsymbol y|\le p^0|\boldsymbol y|$ を使いました。したがって複素並進の積分は有界作用素として意味を持ちます。

複素数の四組 $z\in\mathbb C^4$ のうち、この減衰が保証される領域を次に正確に定義します。

<a id="def-aqft11-forward-tube"></a>

<!-- formal-statement-start -->
> **定義（未来管領域）**  
> 四次元Minkowski時空の未来開光円錐を $V_+^\circ=\{(s,\boldsymbol y)\in\mathbb R^4:s>|\boldsymbol y|\}$ とする。未来管領域は
>
$$
\mathcal T_+:=\mathbb R^4+iV_+^\circ
=\{x+iy:x\in\mathbb R^4,\ y\in V_+^\circ\}\subset\mathbb C^4
$$
>
> と定める。$\mathbb R^4$ は $\mathcal T_+$ の境界に含まれ、その方向からの極限を境界値と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft11-forward-tube -->
### 直接例：どの虚部なら指数が抑えられるか

**定義の確認**。 $y=(2,(1,0,0))$ は $2>1$ なので $V_+^\circ$ に属し、$x+iy\in\mathcal T_+$ です。$p=(3,(2,0,0))$ は $3\ge2$ なので $\overline V_+$ に属します。この組では

$$
|e^{ip\cdot(x+iy)}|=e^{-3\cdot2+2\cdot1}=e^{-4}<1.
$$

一方 $y=(1,(2,0,0))$ は $1<2$ なので未来管領域に入りません。虚部を未来向きとするだけでは足りず、**時間成分が空間成分の長さより大きい**必要があります。
<!-- definition-example-end -->

## 2. 作用素とベクトルを複素並進へ延長する

<a id="thm-aqft11-tube-extension"></a>

<!-- formal-statement-start -->
> **定理（正エネルギー並進の管領域正則延長）**  
> $U:\mathbb R^4\to\mathcal U(\mathcal H)$ が強連続ユニタリ表現であり、共同射影値測度 $E$ の支持が $\overline V_+$ に含まれるとする。このとき
>
$$
U(z):=\int_{\overline V_+}e^{ip\cdot z}\,dE(p),
\qquad z\in\mathcal T_+
$$
>
> は一意に定まる有界作用素で $\|U(z)\|\le1$、$\mathcal T_+$ で作用素ノルムに関して正則である。任意の $\psi,\varphi\in\mathcal H$ について $F_{\psi,\varphi}(z)=\langle\psi,U(z)\varphi\rangle$ は正則で、$y\to0$、$y\in V_+^\circ$ のとき、任意の実 $x$ で
>
$$
U(x+iy)\varphi\longrightarrow U(x)\varphi
\quad\text{（Hilbert空間のノルム）}
$$
>
> が成立する。ここで $U(x)$ は元のユニタリ表現である。
<!-- formal-statement-end -->

### 証明の見取り図

指数のノルム評価で積分を定義し、**管領域の内部でだけ**微分が有界になることを確認します。境界では微分可能性を仮定せず、スペクトル測度についての優収束で元の実並進を回復します。

<!-- proof-start -->
### 証明

$\operatorname{supp}E\subset\overline V_+$ と $y\in V_+^\circ$ より

$$
|e^{ip\cdot(x+iy)}|\le e^{-\delta p^0}\le1,
\qquad \delta:=s-|\boldsymbol y|>0.
$$

[AQFT3の共同スペクトル表示](../AQFT3/index.md#def-aqft3-spectrum)の有界関数の作用素積分で $U(z)$ が定義でき、ノルムは上界 $1$ 以下です。

内部の一点 $z_0=x_0+iy_0$ を固定し、$\delta_0=s_0-|\boldsymbol y_0|>0$ とします。$z_0$ の周りで虚部を十分小さく動かせば $s-|\boldsymbol y|\ge\delta_0/2$ が保たれます。$p\in\overline V_+$ では $|p_j|\le p^0$ なので、任意の非負整数 $m$ について

$$
|p_j|^m |e^{ip\cdot z}|
\le(p^0)^m e^{-\delta_0p^0/2},
\qquad
\sup_{r\ge0}r^m e^{-\delta_0r/2}<\infty.
$$

したがって各複素座標に関する差商を作用素ノルムでスペクトル積分内へ通せます。例えば $z^0$ 方向の微分は

$$
\frac{\partial U}{\partial z^0}(z)
=\int_{\overline V_+}ip^0e^{ip\cdot z}\,dE(p)
$$

であり、空間成分では $-ip_j$ が係数です。二階以上でも同じ指数減衰が多項式増大を抑えるので、局所的に冪級数展開が作用素ノルムで収束し、正則性が得られます。

境界値について、$\mu_\varphi(B):=\langle\varphi,E(B)\varphi\rangle$ は有限正測度です。スペクトル積分のノルム等式を用いると

$$
\begin{aligned}
\|(U(x+iy)-U(x))\varphi\|^2
&=\int_{\overline V_+}
|e^{ip\cdot(x+iy)}-e^{ip\cdot x}|^2\,d\mu_\varphi(p)\\
&=\int_{\overline V_+}|e^{-p\cdot y}-1|^2\,d\mu_\varphi(p).
\end{aligned}
$$

ここで $p\cdot y=p^0s-\boldsymbol p\cdot\boldsymbol y\ge0$ だから $|e^{-p\cdot y}-1|\le1$。各固定 $p$ で $y\to0$ とすれば integrand は零へ収束します。有限測度の優収束によりノルムも零へ向かいます。任意の $\psi$ と内積を取れば $F_{\psi,\varphi}$ の境界値も得られます。$\square$
<!-- proof-end -->

**直接例：二つの共同固有値。** $\mathcal H=\mathbb C^2$、$(H,P_1,P_2,P_3)$ の共同固有値を $p_1=(0,0,0,0)$ と $p_2=(2,1,0,0)$ に取ります。前者も後者も $\overline V_+$ にあり、$\xi=(1,1)/\sqrt2$ とすると

$$
\langle\xi,U(z)\xi\rangle
=\frac12\left(1+e^{i(2z^0-z^1)}\right).
$$

虚部 $y=(s,\boldsymbol y)$ が未来向きなら、後者の項の絶対値は $e^{-2s+y^1}\le1$。具体的な指数関数で定理の評価と解析性を確認できます。これは有限次元の平行移動表現であり、局所netの一意性までは示しません。

### なぜ $H\ge0$ だけでは不足するか

$\mathcal H=\ell^2(\mathbb N)$ の正規直交基底 $e_n$ に $He_n=0$、$P_1e_n=ne_n$、$P_2=P_3=0$ を定め、$U(t,\boldsymbol x)e_n=e^{-inx^1}e_n$ とします。各実並進でユニタリ、強連続であり $H\ge0$ です。しかし共同固有値 $(0,n,0,0)$ は前方光円錐の外にあります。虚部 $y=(2,(1,0,0))\in V_+^\circ$ に対し形式的に複素化すると

$$
U(iy)e_n=e^n e_n,\qquad\sup_n\|U(iy)e_n\|=\infty.
$$

従って**全Hilbert空間上の有界な管領域延長**は作れません。破れた仮定は空間運動量をエネルギーが支配するスペクトル条件です。

## 3. 境界値は分布として何を意味するか

次講では行列要素を時空変数で積分したり、局所試験関数との組合せを考えます。そこで「境界値」と「スペクトル支持」を、関数の値だけでなく分布の言葉でも確かめます。本節の**分布**とは、急減少する滑らかな関数（Schwartz試験関数）に連続線形に作用するものです。連続かつ有界な関数は積分でそのような分布を定めます。

<a id="prop-aqft11-spectral-boundary"></a>

<!-- formal-statement-start -->
> **命題（境界値のFourier支持）**  
> 前節のスペクトル条件を仮定し、$\psi,\varphi\in\mathcal H$ とする。実時空の有界連続関数
>
$$
f_{\psi,\varphi}(x)=\langle\psi,U(x)\varphi\rangle
$$
>
> を緩増加分布とみなす。Fourier変換の符号を $\widehat f(k)=\int e^{-ik\cdot x}f(x)\,d^4x$ と定めると、そのFourier変換は $\overline V_+$ に支持される複素測度の定数倍である。
<!-- formal-statement-end -->

### 証明の見取り図

共同射影値測度の行列要素を有限な複素測度とみなします。指数 $e^{ip\cdot x}$ のFourier変換は、この符号約束では正の位置 $k=p$ に集中します。

<!-- proof-start -->
### 証明

$\mu_{\psi,\varphi}(B):=\langle\psi,E(B)\varphi\rangle$ と置きます。互いに素な有限分割 $\{B_j\}$ について射影の直交性とCauchy–Schwarz不等式から

$$
\begin{aligned}
\sum_j|\mu_{\psi,\varphi}(B_j)|
&\le\left(\sum_j\|E(B_j)\psi\|^2\right)^{1/2}
\left(\sum_j\|E(B_j)\varphi\|^2\right)^{1/2}\\
&\le\|\psi\|\,\|\varphi\|.
\end{aligned}
$$

よって $\mu_{\psi,\varphi}$ は全変動有限の複素測度です。スペクトル表示により

$$
f_{\psi,\varphi}(x)
=\int_{\overline V_+}e^{ip\cdot x}\,d\mu_{\psi,\varphi}(p).
$$

Schwartz試験関数で積分順序を交換できます。Fourier変換の核 $e^{-ik\cdot x}$ と $e^{ip\cdot x}$ を組み合わせると、分布の意味で $(2\pi)^4\delta(k-p)$ が現れ、従って

$$
\widehat f_{\psi,\varphi}=(2\pi)^4\mu_{\psi,\varphi}.
$$

測度 $\mu_{\psi,\varphi}$ は $E$ の支持外で零なのでFourier支持は $\overline V_+$ に含まれます。$\square$
<!-- proof-end -->

これは「$f$ が実時空上で正則」という意味ではありません。一般の境界値は連続でも実解析的とは限らないため、次の**境界からの一意性**は別に証明する必要があります。

## 4. 稠密な解析的試験ベクトルを作る

管領域内部なら任意のベクトルを複素並進できます。しかし虚部を未来錐以外へ延ばすには、運動量の大きい部分にもっと強い減衰が必要です。エネルギーと運動量の二乗に対するGaussian因子をスペクトル表示で掛ければ実現できます。

<a id="def-aqft11-entire-vector"></a>

<!-- formal-statement-start -->
> **定義（全複素並進に対する解析的試験ベクトル）**  
> 強連続な四次元並進のユニタリ表現 $U$ に対し、$\eta\in\mathcal H$ が全複素並進に対する解析的試験ベクトルであるとは、$x\mapsto U(x)\eta$ が $\mathbb C^4$ 全体にHilbert空間値の正則関数として延長されることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft11-entire-vector -->
### 直接例：有限個の同時固有ベクトル

**定義の確認**。 先の二次元模型の任意の $\eta=c_1e_1+c_2e_2$ に対し

$$
U(z)\eta=c_1e_1+c_2e^{i(2z^0-z^1)}e_2
$$

は各複素変数について指数関数の有限和なので、$\mathbb C^4$ 全体で正則です。この例は、全変数へ延長できるベクトルが実際に存在することを示します。無限次元で任意のベクトルがそうなるとは主張しません。
<!-- definition-example-end -->

<a id="prop-aqft11-gaussian-dense"></a>

<!-- formal-statement-start -->
> **命題（Gaussian平滑化による稠密な解析ベクトル）**  
> 強連続な四次元並進表現 $U$ の共同射影値測度を $E$ とし、$q(p)=(p^0)^2+|\boldsymbol p|^2$ とする。各 $\varepsilon>0$ について
>
$$
G_\varepsilon:=\int_{\mathbb R^4}e^{-\varepsilon q(p)}\,dE(p)
$$
>
> と置くと、$G_\varepsilon\psi$ はすべての $\psi\in\mathcal H$ について全複素並進に対する解析的試験ベクトルであり、$\varepsilon\downarrow0$ で $G_\varepsilon\psi\to\psi$ がノルム収束する。従ってそのような試験ベクトル全体は $\mathcal H$ に稠密である。**この構成自体には正エネルギー条件は不要**である。
<!-- formal-statement-end -->

### 証明の見取り図

指数 $e^{-\varepsilon|p|^2}$ は、複素並進による $e^{C|p|}$ という増大より速く減衰します。稠密性はGaussian因子を $1$ に近づけて証明します。

<!-- proof-start -->
### 証明

任意の $z=x+iy\in\mathbb C^4$ と $\psi\in\mathcal H$ について

$$
U(z)G_\varepsilon\psi
:=\int_{\mathbb R^4}e^{ip\cdot z-\varepsilon q(p)}\,dE(p)\psi
$$

と定めます。$r=\sqrt{q(p)}$、$C_y=\sqrt{(y^0)^2+|\boldsymbol y|^2}$ とすれば、通常の四次元Euclid内積のCauchy–Schwarz不等式により

$$
|e^{ip\cdot z-\varepsilon q(p)}|
\le e^{C_y r-\varepsilon r^2}
=e^{-\varepsilon(r-C_y/(2\varepsilon))^2+C_y^2/(4\varepsilon)}
\le e^{C_y^2/(4\varepsilon)}.
$$

どの有界な複素 $z$ の集合でも、任意次数の $p$ による微分で生じる多項式因子は $e^{-\varepsilon r^2}$ に抑えられます。よってスペクトル積分内で任意回微分でき、局所冪級数はノルムで収束します。これはHilbert空間値の整関数です。

一方、有限正測度 $\mu_\psi(B)=\langle\psi,E(B)\psi\rangle$ を使えば

$$
\|(G_\varepsilon-I)\psi\|^2
=\int_{\mathbb R^4}|e^{-\varepsilon q(p)}-1|^2\,d\mu_\psi(p).
$$

各 $p$ で被積分関数は零へ収束し、$0\le|e^{-\varepsilon q(p)}-1|^2\le1$ なので優収束により右辺は零です。従って任意の $\psi$ が解析的試験ベクトルの極限で近似できます。$\square$
<!-- proof-end -->

ここで作ったベクトルは**補助的な滑らかさを持つベクトル**です。局所代数 $\mathfrak A(O)$ に属する作用素から作った $A\Omega$ が必ずこの形になるわけではなく、$G_\varepsilon$ を掛ける操作が局所性を保つとも仮定しません。次講の論証では、一般の $A\Omega$ に対しても第2節の管領域延長が使えることが重要です。

## 5. 実軸の開区間で零なら、なぜ全域で零か

正則関数の恒等定理は、通常は**正則性が成り立つ領域の内部**で使います。今は実軸が管領域の境界です。境界の零区間から結論するためには反射による延長を一段挟む必要があります。

<a id="lem-aqft11-halfplane-unique"></a>

<!-- formal-statement-start -->
> **補題（境界零区間の一意性）**  
> $g$ は領域 $\{\operatorname{Im}z>0\}$ で正則であり、実軸まで連続に延長されるとする。ある非空の実開区間 $I$ 上で $g(t)=0$ ならば、この領域と実軸上の全点で $g=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

零という境界値は実数値でもあるので、[CA7で証明したSchwarzの鏡像原理](../../CA/CA7/index.md#thm-ca7-schwarz-reflection)によって区間の下側へ関数を続けられます。続けた関数にとって $I$ は**内部の零点集合**になり、通常の恒等定理が使えます。

<!-- proof-start -->
### 証明

$t_0\in I$ を取り、実軸との交わりが $I$ 内に収まる小円板 $D$ を選びます。$D$ の上半分で $g$、下半分で

$$
\widetilde g(z):=\overline{g(\overline z)}
$$

を定め、実軸の区間上では両者を $0$ でつなぎます。$g(t)=0\in\mathbb R$ のためこの接続は連続です。上半分と下半分では正則です。実軸を横切る小三角形の周回積分は実軸の上下で分けて積分すると接合辺が相殺され、実軸からの連続性により零になります。[CA7のMoreraの定理](../../CA/CA7/index.md#lem-ca7-morera)により $\widetilde g$ は円板全体で正則です。

円板内部の線分 $D\cap I$ で $\widetilde g$ が零なので、[CA3の恒等定理](../../CA/CA3/index.md#thm-ca3-isolated-zeros-identity)により円板全体で零です。

従って $g$ は虚部が正の領域の非空開部分で零になります。この半平面は連結なので、再び[同じ恒等定理](../../CA/CA3/index.md#thm-ca3-isolated-zeros-identity)を適用すると、領域全体で $g=0$ です。実軸上の連続境界値も零になります。$\square$
<!-- proof-end -->

**開区間が必要です。** $g(z)=1+e^{2iz}$ は虚部が正の領域で有界正則ですが、実軸では $t=\pi/2$ のような離散点で零になるだけです。一点の境界零から恒等的に零とは言えません。

<a id="thm-aqft11-real-open-unique"></a>

<!-- formal-statement-start -->
> **定理（正エネルギー行列要素の実開集合一意性）**  
> 第2節のスペクトル条件を満たす $U$ と任意の $\psi,\varphi\in\mathcal H$ に対し、実時空の行列要素を
>
$$
f(x):=\langle\psi,U(x)\varphi\rangle
$$
>
> と置く。非空開集合 $O\subset\mathbb R^4$ 上で $f=0$ なら、全 $\mathbb R^4$ で $f=0$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

未来向き時間的ベクトル $u$ に沿う一次元複素直線では、スペクトル条件から虚部が正の半平面で有界正則関数になります。局所の零をその直線全体へ伝え、**任意の時空変位が未来時間的ベクトル二つの差**として書けることを使って全域へ広げます。

<!-- proof-start -->
### 証明

未来時間的ベクトル $u=(u^0,\boldsymbol u)$（$u^0>|\boldsymbol u|$）を固定します。任意の実点 $a$ に対し

$$
g_{a,u}(\zeta):=\langle\psi,U(a+\zeta u)\varphi\rangle,
\qquad \operatorname{Im}\zeta>0
$$

と置きます。$p\cdot u\ge(u^0-|\boldsymbol u|)p^0\ge0$ なので、スペクトル表示で指数の絶対値は $e^{-(\operatorname{Im}\zeta)p\cdot u}\le1$ です。第2節の管領域正則性と境界連続性から $g_{a,u}$ は虚部が正の領域で正則・実軸連続です。

$O$ は開なので、任意の $a\in O$ に対して小さい $|t|$ なら $a+tu\in O$。従って $g_{a,u}(t)=0$ は実軸の開区間で成立し、[境界零区間の一意性](#lem-aqft11-halfplane-unique)から

$$
f(a+tu)=0\qquad(a\in O,\ t\in\mathbb R)
$$

を得ます。特に $u_0=(1,0,0,0)$ を選べば、任意の $T>0$ に対し $O-Tu_0$ は零集合に含まれます。

任意の実変位 $w=(w^0,\boldsymbol w)$ を取ります。$T>|\boldsymbol w|-w^0$ と大きく選ぶと

$$
v:=w+Tu_0=(w^0+T,\boldsymbol w)\in V_+^\circ.
$$

今度は零の開集合 $O-Tu_0$ の各点から未来時間的ベクトル $v$ に沿って同じ一次元補題を適用します。$t=1$ まで進められるため $f$ は $(O-Tu_0)+v=O+w$ で零です。$w$ は任意で、$O$ の平行移動の和集合は $\mathbb R^4$ 全体を覆います。よって結論を得ます。$\square$
<!-- proof-end -->

この定理の結論は行列要素 $f$ の恒等的な消滅です。真空が局所代数について巡回的かどうかは**どの行列要素を零にできるか**、そして局所代数の平行移動が大域代数を生成するかに依存します。そこに必要な追加条件を次講で明記します。

## 6. 局所演算子の積へ解析性を受け渡す

今までの $f(x)$ には一つの並進作用素だけが現れました。局所代数の生成するベクトルを扱うときには $A_1\cdots A_n\Omega$ の形が必要です。ここでは有界作用素の積を使い、次講に必要な**複数変数の解析的な境界値**まで準備します。

$\Omega$ は単位ベクトルで、平行移動に不変、すなわち $U(x)\Omega=\Omega$ とします。[AQFT3の不変状態のGNS実装](../AQFT3/index.md#thm-aqft3-covariant-gns)が強連続でスペクトル条件も満たす場合が典型例です。$B_j\in B(\mathcal H)$ は有界作用素とし、$U(x)B_jU(-x)$ を $\alpha_x(B_j)$ と書きます。

<a id="prop-aqft11-multipoint-tube"></a>

<!-- formal-statement-start -->
> **命題（有限個の有界演算子を挟む管領域解析性と一意性）**  
> $U$ が強連続かつ正エネルギー条件を満たし、$U(x)\Omega=\Omega$ とする。任意の $\psi\in\mathcal H$、$B_1,\ldots,B_n\in B(\mathcal H)$ に対し
>
$$
F(y_1,\ldots,y_n)
=\langle\psi,U(y_1)B_1U(y_2)B_2\cdots U(y_n)B_n\Omega\rangle
$$
>
> は各 $y_j\in\mathbb R^4$ で連続であり、それぞれを $\mathcal T_+$ へ複素化すると $\mathcal T_+^n$ で正則となり、境界値の絶対値は $\|\psi\|\prod_j\|B_j\|$ 以下である。実変数 $(y_1,\ldots,y_n)\in\mathbb R^{4n}$ の非空開集合で境界値が零なら、全 $\mathbb R^{4n}$ で零である。
<!-- formal-statement-end -->

### 証明の見取り図

一つずつの $U(y_j)$ を[管領域延長](#thm-aqft11-tube-extension)で置き換え、作用素積のノルムを評価します。一意性では他の変数を固定して[実開集合一意性](#thm-aqft11-real-open-unique)を**各変数に順番に適用**します。

<!-- proof-start -->
### 証明

$z_j\in\mathcal T_+$ に対し

$$
F(z_1,\ldots,z_n)
:=\langle\psi,U(z_1)B_1U(z_2)B_2\cdots U(z_n)B_n\Omega\rangle
$$

と定めます。[正エネルギー並進の管領域正則延長](#thm-aqft11-tube-extension)で各 $U(z_j)$ は作用素ノルム正則・ノルム $1$ 以下です。有界作用素の積は連続な多重線形写像なので、局所冪級数を掛け合わせれば $F$ は各変数に関して、さらに全変数について正則です。積のノルム評価から

$$
|F(z_1,\ldots,z_n)|
\le\|\psi\|\prod_{j=1}^n\|B_j\|\,\|\Omega\|
=\|\psi\|\prod_{j=1}^n\|B_j\|
$$

です。境界連続性は各 $U(x_j+iy_j)\to U(x_j)$ の強収束と一様ノルム有界性を有限回使って得られます。例えば二因子では

$$
\begin{aligned}
&U(z_1)B_1U(z_2)\xi-U(x_1)B_1U(x_2)\xi\\
&=[U(z_1)-U(x_1)]B_1U(x_2)\xi
+U(z_1)B_1[U(z_2)-U(x_2)]\xi
\end{aligned}
$$

と分ければ、第一項の強収束と第二項のノルム評価をそれぞれ使えます。

零集合が非空開なら、ある開直方体 $O_1\times\cdots\times O_n$ が含まれます。$(y_2,\ldots,y_n)\in O_2\times\cdots\times O_n$ を固定し、第5節の実開集合一意性の証明を一番目の変数の有界正則関数に適用すると、任意の $y_1\in\mathbb R^4$ で $F=0$ です。次に $(y_1,y_3,\ldots,y_n)$ を固定して二番目へ同じ議論を適用します。これを $n$ 回繰り返せば全実変数で零となります。$\square$
<!-- proof-end -->

**局所netとの接続。** それぞれの $B_j$ を[AQFT9の局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net)の元として選んでも、有界作用素であるため命題を適用できます。$x_0=0$、$y_1=x_1$、$y_j=x_j-x_{j-1}$（$j\ge2$）と置くと、$U(x)\Omega=\Omega$ を使って

$$
\begin{aligned}
&\langle\psi,\alpha_{x_1}(B_1)\cdots\alpha_{x_n}(B_n)\Omega\rangle\\
&=\langle\psi,U(x_1)B_1U(x_2-x_1)B_2\cdots
U(x_n-x_{n-1})B_n\Omega\rangle.
\end{aligned}
$$

この等式は右から $U(-x_n)\Omega=\Omega$ として各 $U(-x_j)U(x_{j+1})$ をまとめたものです。実変数 $(x_1,\ldots,x_n)\mapsto(y_1,\ldots,y_n)$ は可逆な線形変換なので、$x_j$ の小さい開近傍で零という情報は $y_j$ の非空開集合で零という情報に移ります。**これが局所情報から全並進へ零を延ばす解析的な部分です。** 全Hilbert空間への稠密性には、さらに局所netの生成条件が必要です。

## 7. 演習と詳細解答

### Level A：指数の評価・境界値・反例

<a id="ex-aqft11-a01"></a>
#### AQFT11-A01 光円錐と減衰係数
- Level: A

$p=(5,(3,0,0))$、$y=(2,(1,0,0))$ を取る。$p\in\overline V_+$ と $y\in V_+^\circ$ を定義から判定し、$|e^{ip\cdot(x+iy)}|$ と共通評価 $e^{-p^0(s-|\boldsymbol y|)}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $5\ge3$ から $p\in\overline V_+$、$2>1$ から $y\in V_+^\circ$。$p\cdot y=5\cdot2-3\cdot1=7$ より

$$
|e^{ip\cdot(x+iy)}|=e^{-7}.
$$

一方、$\delta=s-|\boldsymbol y|=1$ なので共通上界は $e^{-5}$。$e^{-7}\le e^{-5}$ は $\boldsymbol p\cdot\boldsymbol y=3\le|\boldsymbol p||\boldsymbol y|=3$ と $|\boldsymbol p|\le p^0$ の二段階の評価をまとめた結果です。
<!-- solution-end -->

<a id="ex-aqft11-a02"></a>
#### AQFT11-A02 二準位の境界値
- Level: A

$H=\operatorname{diag}(0,2)$、$P_1=\operatorname{diag}(0,1)$、$P_2=P_3=0$、$\xi=(1,1)/\sqrt2$ とする。$F(z)=\langle\xi,U(z)\xi\rangle$ を求め、$z=(t+is,0,0,0)$ で $s\downarrow0$ の極限を計算せよ。

<!-- solution-start -->
**詳細解答。** 共同固有値は $(0,\boldsymbol0)$ と $(2,(1,0,0))$ なので

$$
F(z)=\frac12+\frac12e^{i(2z^0-z^1)}.
$$

$z^0=t+is$、$z^1=0$ を代入すると $F(z)=\frac12(1+e^{2it-2s})$。ここで $e^{2it-2s}$ の正しい指数は $e^{2it}e^{-2s}$ です。従って

$$
\lim_{s\downarrow0}F(t+is,0,0,0)=\frac12(1+e^{2it}).
$$

これは実並進の行列要素に一致し、$\operatorname{Im}z^0>0$ で二番目の振幅が減衰します。
<!-- solution-end -->

<a id="ex-aqft11-a03"></a>
#### AQFT11-A03 境界の零点と零区間
- Level: A

$g(z)=1+e^{2iz}$ について、虚部が正の領域での有界性を示し、実軸で $g(t)=0$ となる点をすべて求めよ。この例はなぜ境界一意性補題に矛盾しないか。

<!-- solution-start -->
**詳細解答。** $z=t+is$、$s>0$ とすれば $|e^{2iz}|=e^{-2s}<1$ なので $|g(z)|\le1+e^{-2s}\le2$。実数 $t$ では $e^{2it}=-1$ が必要十分であり、

$$
2t=(2k+1)\pi,\qquad
t=\frac{(2k+1)\pi}{2}\quad(k\in\mathbb Z).
$$

零点は離散的で、どの非空開区間でも全ての点が零ということはありません。[境界一意性補題](#lem-aqft11-halfplane-unique)が要求するのは**区間全体で零**という仮定です。
<!-- solution-end -->

<a id="ex-aqft11-a04"></a>
#### AQFT11-A04 Gaussian近似
- Level: A

$H e_1=0$、$H e_2=3e_2$、空間運動量は零、$\psi=(e_1+e_2)/\sqrt2$ とする。$G_\varepsilon=e^{-\varepsilon H^2}$ に対して $G_\varepsilon\psi$、$\|(G_\varepsilon-I)\psi\|^2$ を求め、$\varepsilon\downarrow0$ の極限を確認せよ。

<!-- solution-start -->
**詳細解答。** $H^2e_1=0$、$H^2e_2=9e_2$ なので

$$
G_\varepsilon\psi=\frac{e_1+e^{-9\varepsilon}e_2}{\sqrt2},
\qquad
(G_\varepsilon-I)\psi=\frac{e^{-9\varepsilon}-1}{\sqrt2}e_2.
$$

正規直交性から

$$
\|(G_\varepsilon-I)\psi\|^2=\frac12(e^{-9\varepsilon}-1)^2\longrightarrow0.
$$

非負のGaussian因子を各共同固有値に掛ける操作と、元のベクトルへの近似が直接確認できました。
<!-- solution-end -->

### Level B：連続性・一意性の論証と仮定の検査

<a id="ex-aqft11-b01"></a>
#### AQFT11-B01 時間正エネルギーだけの破綻
- Level: B

$\mathcal H=\ell^2(\mathbb N)$ の正規直交基底 $e_n$ に対し $He_n=0$、$P_1e_n=ne_n$、$P_2=P_3=0$ とする。次を順に検討せよ。

1. 実並進の強連続性
2. 時間生成作用素の非負性
3. $y=(2,(1,0,0))$ における複素並進の有界性
4. 前方光円錐のスペクトル条件の成否

<!-- solution-start -->
**詳細解答。** **(1)** $U(x)e_n=e^{-inx^1}e_n$ で、任意の $\eta=\sum_n c_ne_n$ に対し

$$
\|(U(x)-I)\eta\|^2
=\sum_{n\ge1}|e^{-inx^1}-1|^2|c_n|^2\longrightarrow0
\quad(x\to0).
$$

各項は零へ収束し、$4|c_n|^2$ の総和が有限なので級数の優収束が使えます。

**(2)** $H=0$ だから時間生成作用素は非負です。

**(3)** $z=iy$ とすると、各 $e_n$ に掛かる指数は $e^{-in(i)}=e^n$ です。従って

$$
\sup_{n\ge1}\|U(iy)e_n\|=\sup_{n\ge1}e^n=\infty.
$$

全空間上の有界作用素 $U(iy)$ は存在しません。

**(4)** 共同スペクトルに $(0,n,0,0)$ が含まれます。$n\ge1$ では $0<n$ なので前方閉光円錐の外です。この仮定の破れが管領域評価を破る原因です。
<!-- solution-end -->

<a id="ex-aqft11-b02"></a>
#### AQFT11-B02 Fourier支持と複素測度
- Level: B

二次元模型 $p_1=(0,0,0,0)$、$p_2=(2,1,0,0)$、$\psi=e_1+e_2$、$\varphi=e_1-e_2$ を取る。$\mu_{\psi,\varphi}$、$f_{\psi,\varphi}(x)$ とFourier変換の支持を求め、$\mu_{\psi,\varphi}$ が正測度でなくてもよい理由を述べよ。

<!-- solution-start -->
**詳細解答。** $E(\{p_1\})$ と $E(\{p_2\})$ はそれぞれ $e_1$ と $e_2$ への射影です。第2変数線形の内積から

$$
\mu_{\psi,\varphi}(\{p_1\})=\langle e_1,e_1\rangle=1,\qquad
\mu_{\psi,\varphi}(\{p_2\})=\langle e_2,-e_2\rangle=-1.
$$

よって

$$
\mu_{\psi,\varphi}=\delta_{p_1}-\delta_{p_2},\qquad
f_{\psi,\varphi}(x)=1-e^{i(2t-x^1)}.
$$

採用したFourier符号では

$$
\widehat f=(2\pi)^4(\delta_{p_1}-\delta_{p_2})
$$

となり、Fourier支持は $\{p_1,p_2\}\subset\overline V_+$ に含まれます。

交差行列要素から作った測度には負の質量 $-1$ が現れます。従って必ずしも非負測度ではありません。一方、その全変動は有限です。
<!-- solution-end -->

<a id="ex-aqft11-b03"></a>
#### AQFT11-B03 任意の変位を未来時間的ベクトルの差にする
- Level: B

$w=(-3,(4,0,0))$ に対して、$u_0=(1,0,0,0)$ を用い $w=v-Tu_0$ を満たす $T>0$、$v\in V_+^\circ$ を一組作れ。また、なぜこの分解が境界値の開集合一意性に必要なのか説明せよ。

<!-- solution-start -->
**詳細解答。** 時間変位を $T=8$ と選びます。すると

$$
v=w+8u_0=(5,(4,0,0)),\qquad v^0=5>4=|\boldsymbol v|.
$$

従って $v$ は未来時間的です。一般には $T>|\boldsymbol w|-w^0=7$ と選べば十分です。

[実開集合一意性定理](#thm-aqft11-real-open-unique)の証明では、零の開集合 $O$ からまず過去向きの $-Tu_0$ 方向に零を伝えます。次に未来時間的な $v$ に沿って伝えると $O+w$ に到達します。任意の変位 $w$ が未来時間的である必要はなく、差 $w=v-Tu_0$ の二段階で進めるのが要点です。
<!-- solution-end -->

<a id="ex-aqft11-b04"></a>
#### AQFT11-B04 演算子積の並進増分
- Level: B

平行移動不変な $\Omega$ と有界な $B_1,B_2,B_3$ に対して、$\alpha_{x_1}(B_1)\alpha_{x_2}(B_2)\alpha_{x_3}(B_3)\Omega$ を、$U(y_1)B_1U(y_2)B_2U(y_3)B_3\Omega$ の形に書き換えよ。$y_j$ を明記し、変数変換の逆写像を示せ。

<!-- solution-start -->
**詳細解答。** $\alpha_x(B)=U(x)BU(-x)$ を右辺へ順に代入すると

$$
\begin{aligned}
&U(x_1)B_1U(-x_1)U(x_2)B_2U(-x_2)U(x_3)B_3U(-x_3)\Omega\\
&=U(x_1)B_1U(x_2-x_1)B_2U(x_3-x_2)B_3\Omega.
\end{aligned}
$$

最後は $U(-x_3)\Omega=\Omega$、途中は群表現の $U(-a)U(b)=U(b-a)$ を用いました。従って $y_1=x_1$、$y_2=x_2-x_1$、$y_3=x_3-x_2$。逆写像は $x_1=y_1$、$x_2=y_1+y_2$、$x_3=y_1+y_2+y_3$ です。可逆線形写像なので実開集合を実開集合へ写し、複数変数一意性の条件を保存します。
<!-- solution-end -->

### Level C：局所零情報を解析性で伝播させる

<a id="ex-aqft11-c01"></a>
#### AQFT11-C01 二つの局所演算子を挟む境界値の一意性
- Level: C

強連続な正エネルギー並進表現 $U$、平行移動不変な単位ベクトル $\Omega$、有界作用素 $A,B$、ベクトル $\psi$ を取る。$F(x_1,x_2)=\langle\psi,\alpha_{x_1}(A)\alpha_{x_2}(B)\Omega\rangle$ とする。

1. $y_1=x_1$、$y_2=x_2-x_1$ による表示を導き、各 $y_j$ の未来管領域における有界正則性を証明せよ。
2. $F(x_1,x_2)$ が実変数の非空開集合で零なら全 $\mathbb R^8$ で零となることを、境界値の反射・実開集合一意性に基づき証明せよ。
3. この結論だけでは真空の局所巡回性を言えない理由を、追加で必要な代数的条件に言及して説明せよ。

<!-- solution-start -->
**詳細解答。** **(1)** 局所作用素の積を平行移動で展開し、最後の並進を真空に作用させます。

$$
\begin{aligned}
&\alpha_{x_1}(A)\alpha_{x_2}(B)\Omega\\
&=U(x_1)AU(-x_1)U(x_2)BU(-x_2)\Omega.
\end{aligned}
$$

真空の不変性と群性を用いると次の増分表示になります。

$$
F(x_1,x_2)=\langle\psi,U(y_1)AU(y_2)B\Omega\rangle.
$$

[正エネルギー並進の管領域正則延長](#thm-aqft11-tube-extension)により、$z_j\in\mathcal T_+$ で $U(z_j)$ はノルム正則かつ $\|U(z_j)\|\le1$。従って

$$
\left|\langle\psi,U(z_1)AU(z_2)B\Omega\rangle\right|
\le\|\psi\|\,\|A\|\,\|B\|
$$

であり、有界作用素の積・内積の連続性から二変数で正則です。境界では各 $U(z_j)$ の強収束を、本文第6節の差の分解へ代入すれば連続な境界値（実変数上の複素数値関数）を得ます。

**(2)** 変数変換とその逆写像は

$$
\begin{aligned}
(y_1,y_2)&=(x_1,x_2-x_1),\\
(x_1,x_2)&=(y_1,y_1+y_2)
\end{aligned}
$$

です。連続な可逆線形変換なので、零集合には $y$ 座標で非空開直方体 $O_1\times O_2$ が含まれます。

まず $y_2\in O_2$ を固定します。このとき $y_1$ の関数は未来管領域で正則・境界連続であり、$O_1$ 上で零です。[実開集合一意性定理](#thm-aqft11-real-open-unique)の時間的方向への伝播を適用すると、任意の $y_1\in\mathbb R^4$ で零となります。

次にこの任意の $y_1$ を固定して、$y_2\in O_2$ の零を同じ定理で全 $\mathbb R^4$ へ伝えます。従って $F$ は全 $\mathbb R^8$ で零です。

**(3)** 解析性は、既に零と分かっている行列要素を全並進へ延長するだけです。局所代数 $\mathfrak A(O)$ の元だけから $A_1\cdots A_n\Omega$ が全Hilbert空間を張るとはまだ示していません。次講では、適切な小領域の**全並進で生成した代数が大域代数に稠密に達する弱加法性**などを追加して、真空の大域巡回性と組み合わせます。正エネルギーだけでその生成仮定を省くことはできません。
<!-- solution-end -->

## 8. 到達点と次講

正エネルギー条件は $p^0\ge|\boldsymbol p|$ という**共同スペクトルの幾何学的制約**であり、それが未来管領域での指数減衰を与えました。境界値はFourier支持を持ち、開集合で零なら複素解析の反射・恒等定理により全実時空へ零が伝わります。Gaussianで稠密な全複素並進解析ベクトルを作れる一方、局所操作とその平滑化を混同しないことも確認しました。

次の **AQFT12「Reeh–Schlieder定理」** は、ここで証明した[複数演算子の一意性](#prop-aqft11-multipoint-tube)に、適切な局所領域の選択・弱加法性・真空の大域巡回性を加えます。局所性から分離性を引き出すのはさらに後の段階であり、解析性の結論と混ぜません。

参考：C. J. Fewster and K. Rejzner, [*Algebraic Quantum Field Theory — an introduction*](https://arxiv.org/abs/1904.04051), §5.2（スペクトル条件と局所巡回性）；R. Haag, [*Local Quantum Physics*](https://link.springer.com/book/10.1007/978-3-642-97306-2)（局所netと真空の構造）。
