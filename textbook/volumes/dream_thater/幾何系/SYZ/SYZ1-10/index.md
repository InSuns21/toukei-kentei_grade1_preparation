# SYZ1-10 semi-flat鏡像I――双対トーラスと複素構造

<!-- definition-example-audit: strict -->

## 1. 何を双対化すると複素座標が現れるか

[二重整数アフィン構造](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)で得た周期のうち、1サイクルを積分するシンプレクティック周期座標を $u=(u^1,\ldots,u^n)$ とする。[前講のHessian定理](../SYZ1-09/index.md#thm-syz1-09-hessian)は別の周期座標 $t$ との関係を $dt=H(u)\,du$ とした。しかし、$t$ と $u$ の移り変わりは一般に整数アフィン変換ではない。双対トーラスを作るには、**どちらの整数格子を双対化するのか**を最初に固定しなければならない。

本講では $u$ の**シンプレクティック周期余接格子**を使う。局所的にファイバーの1サイクルが定める整数格子を双対化すると、各点の平坦 $U(1)$ 接続のホロノミーを表すトーラスが得られる。基底座標 $u$ にホロノミーの角座標 $v$ を組み合わせると、$z=u+iv$ が複素座標となる。最も重要なのは、$u'=Au+c$ という整数アフィン遷移の下で $z'=Az+c$ となり、複素座標が実際に貼り合うことである。

### 本講で仮定する対象

複素次元 $n\ge1$ のKähler多様体 $(X,J,g,\omega,\Omega)$ に、連結・コンパクト・境界なしの特殊Lagrange（SLag）トーラス $L_b\cong T^n$ をファイバーとする滑らかな束 $\pi:X_0\to B_0$ が**追加で存在**すると仮定する。基底 $B_0$ は実 $n$ 次元、各ファイバーでは向きとSLag位相を局所的に固定する。これは[正則なSLagトーラス束の定義](../SYZ1-07/index.md#def-syz1-07-regular-fibration)に対応する。McLean変形定理だけでこの大域的な束の存在が従うわけではない。

[周期余接格子の定義](../SYZ1-08/index.md#def-syz1-08-two-period-covectors)により、十分小さい単連結な $U\subset B_0$ で整数1サイクル $\gamma_1,\ldots,\gamma_n$ を運べば、$du^i=p_{\gamma_i}$ であり

$$
\Lambda_{\omega,b}^*=\bigoplus_{i=1}^n\mathbb Z\,du^i|_b
\ \subset T_b^*B_0
$$

が定まる。この式の星印は「**余接束の格子**」を区別する記号であり、[前講の局所Legendre双対](../SYZ1-09/index.md#def-syz1-09-legendre)を意味しない。複素周期から作る $\Lambda_{\Omega}^*$ は一般に別の格子である。

## 2. 周期余接格子から双対トーラスを作る

双対を定義する前に、同じ点 $b$ の余接ベクトル $p$ と接ベクトル $\xi$ の対合 $\langle p,\xi\rangle=p(\xi)$ を考える。周期格子のすべての元に対してこの値が整数となる接ベクトルを集めれば、整数双対な接格子になる。

ここで $\partial_{u^i}$ は $u^i$ を増やす座標接方向であり、各座標の微分との対合は

$
du^j(\partial_{u^i})=\delta_i^j
\quad(\delta_i^j=1\text{ if }i=j,\;0\text{ otherwise})
$

となる。従って、接ベクトルをこの基底で展開すると

$
\xi=\sum_i v^i\partial_{u^i},
\qquad du^j(\xi)=v^j.
$

周期余接格子の生成元が $du^j$ なら、定義の全整数値条件は各係数 $v^j\in\mathbb Z$ と同値である。

<a id="def-syz1-10-dual-tangent-lattice"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック周期の双対接格子）**  
> $B_0$ を $n$ 次元整数アフィン多様体とし、各点に階数 $n$ の余接格子 $\Lambda_{\omega,b}^*\subset T_b^*B_0$ があるとする。**双対接格子**とその商トーラスを

$$
\begin{aligned}
\Lambda_{\omega,b}
&=\{\xi\in T_bB_0:p(\xi)\in\mathbb Z
       \text{ for all }p\in\Lambda_{\omega,b}^*\},\\
\check L_b&=T_bB_0/\Lambda_{\omega,b}
\end{aligned}
$$

> と定める。局所座標 $u$ において $\Lambda_{\omega,b}^*=\bigoplus_i\mathbb Z\,du^i$ なら、$\Lambda_{\omega,b}=\bigoplus_i\mathbb Z\,\partial_{u^i}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-10-dual-tangent-lattice -->
### 直接例：非直交な整数基底でも同じ双対接格子

$B_0=\mathbb R^2$、$u^1=x$、$u^2=y$ とし $\Lambda_\omega^*=\mathbb Z\,dx+\mathbb Z\,dy$ を取る。$\xi=a\partial_x+b\partial_y$ なら $dx(\xi)=a,dy(\xi)=b$ だから、定義の全条件は $a,b\in\mathbb Z$ と同値である。従って $\Lambda_\omega=\mathbb Z\,\partial_x+\mathbb Z\,\partial_y$ で、商は $(\mathbb R/\mathbb Z)^2$ となる。

次に $u'^1=x+y,\ u'^2=y$ とする。$du'^1=dx+dy,\ du'^2=dy$ は同じ余接格子の基底である。新しい基底の整数条件は $a+b\in\mathbb Z,\ b\in\mathbb Z$ であり、結局 $a,b\in\mathbb Z$ に戻る。**定義の確認**：全格子、各生成元への整数対合、商の実次元2、基底変更による不変性をすべて確認した。
<!-- definition-example-end -->

各 $L_b$ の1サイクル $\gamma\in H_1(L_b;\mathbb Z)$ に位相因子を割り当てる群準同型をホロノミー文字と呼ぶ。[格子の文字と双対トーラスの定義](../SYZ1-01/index.md#def-syz1-01-character-dual)で既習の、$\operatorname{Hom}_{\mathbb Z}(H_1(L_b;\mathbb Z),U(1))$ である。平坦 $U(1)$ 接続のゲージ同値類がこの文字で指定されることは、トーラス上の[平坦局所系のホロノミー分類定理](../SYZ1-01/index.md#thm-syz1-01-holonomy-classification)から従う。基底の局所系を変えると文字の値も連動して変化する。

<a id="prop-syz1-10-holonomy-dual"></a>

<!-- formal-statement-start -->
> **命題（双対接トーラスとホロノミー文字）**  
> 第1節の滑らかなSLagトーラス束において、1サイクル $\gamma_i$ を周期余接ベクトル $du^i$ に対応させる。各 $b\in B_0$ で

$$
\Phi_b:\check L_b\longrightarrow
  \operatorname{Hom}_{\mathbb Z}(H_1(L_b;\mathbb Z),U(1))
$$

> を、$\xi\in T_bB_0$ と $\gamma=\sum_i m_i\gamma_i$ に対して

$$
\Phi_b([\xi])(\gamma)
=\exp\!\left(2\pi i\sum_{i=1}^n m_i\,du^i(\xi)\right)
$$

> と定めると、基底によらない連続な群同型で、逆写像も連続である。従って各 $\check L_b$ は平坦 $U(1)$ ホロノミーのパラメータ・トーラスである。
<!-- formal-statement-end -->

### 証明の見取り図

まず整数接格子だけ $\xi$ をずらしたとき指数が変わらないことを示す。文字が等しいなら、すべての基本1サイクルにおいて指数が1となるので、差がちょうど双対接格子に入る。任意の文字は基本1サイクルへの値から復元できる。

<!-- proof-start -->
### 証明

$\xi$ の代表元を $\xi+\lambda$ に替える。$\lambda\in\Lambda_{\omega,b}$ なら $du^i(\lambda)\in\mathbb Z$ だから

$$
\exp\!\left(2\pi i\sum_i m_i\,du^i(\xi+\lambda)\right)
=\exp\!\left(2\pi i\sum_i m_i\,du^i(\xi)\right)
$$

となる。したがって $\Phi_b$ は商で定義できる。$\gamma+\gamma'$ に対する指数は各指数の積なので、像は文字である。

$\Phi_b([\xi])$ が自明文字なら、各 $\gamma_i$ で $\exp(2\pi i\,du^i(\xi))=1$ である。実数 $s$ について $e^{2\pi i s}=1$ と $s\in\mathbb Z$ は同値なので、すべての $du^i(\xi)$ が整数、すなわち $\xi\in\Lambda_{\omega,b}$。従って核は商の零元だけである。

任意の文字 $\rho$ を取り、$\rho(\gamma_i)=e^{2\pi i v^i}$ と書く。$du^i(\xi)=v^i$ を満たす $\xi=\sum_i v^i\partial_{u^i}$ を選べば、各 $\gamma_i$ で $\Phi_b([\xi])=\rho$ である。任意のサイクルは $\gamma_i$ の整数線形結合だから全サイクルでも一致し、全射となる。

写像は局所的に $(\mathbb R/\mathbb Z)^n\to U(1)^n,\ [v]\mapsto(e^{2\pi i v^i})$ と表せ、位相同型である。最後に基底を $\gamma'=A\gamma$、$A\in GL(n,\mathbb Z)$ と替えると、周期は $du'=Adu$、値は $v'=Av$ となる。新基底に対する $e^{2\pi i v'^i}$ は旧文字の $\rho(\gamma'_i)$ に等しい。従って同型は基底に依存しない。
<!-- proof-end -->

### 直接計算：二つのホロノミー

$L_b=T^2$、$\rho(\gamma_1)=-1$、$\rho(\gamma_2)=i$ とすると、$v^1=1/2$、$v^2=1/4$ を選べる。$\gamma=\gamma_1+2\gamma_2$ では

$$
\rho(\gamma)=(-1)i^2=1,\qquad
e^{2\pi i(v^1+2v^2)}=e^{2\pi i}=1.
$$

$v^1$ を $3/2$ に替えても同じ文字であり、これは双対接格子の元 $\partial_{u^1}$ を足したことに対応する。

## 3. 双対トーラス束を複素チャートに変える

各 $b$ の双対トーラスを集めた $\check X_0=\coprod_{b\in B_0}\check L_b$ は、周期格子が局所的に一定に見えるため、接束の格子商

$$
\check X_0=TB_0/\Lambda_\omega,\qquad
\check\pi:\check X_0\to B_0
$$

となる。ここで $\Lambda_\omega$ は $TB_0$ 内の局所的に平行な整数格子の集まりである。$TB_0$ の点を $(b,\xi)$ と書き、整数アフィン座標 $u^i$ の下で $\xi=\sum_i v^i\partial_{u^i}$ と展開する。したがって $v^i$ は整数シフトを法として定まる角座標である。

接束には $u$ の実方向があり、双対トーラスには $v$ の方向がある。同じ添字の組を一つの複素数にすると、複素構造の候補になる。

<a id="def-syz1-10-semi-flat-complex-chart"></a>

<!-- formal-statement-start -->
> **定義（semi-flat双対トーラスの複素チャート）**  
> 整数アフィン $n$ 次元多様体 $(B_0,\Lambda_\omega^*)$ に対し $\check X_0=TB_0/\Lambda_\omega$ を考える。整数アフィン座標 $u=(u^1,\ldots,u^n)$ を持つ開集合 $U\subset B_0$ の上で、接ベクトルの係数を $v^i\pmod{\mathbb Z}$ と書き、局所複素座標を

$$
z^i=u^i+i v^i\pmod{i\mathbb Z},
\qquad
W_i=\exp(2\pi z^i)\ \in\mathbb C^*
$$

> と定める。$W=(W_1,\ldots,W_n)$ をこの座標域の**semi-flat複素チャート**と呼ぶ。$i=\sqrt{-1}$ とし、各 $v^i$ の周期は1に規格化する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-10-semi-flat-complex-chart -->
### 直接例：円環ではなく $\mathbb C^*$ になる

$n=1$、$B_0=(0,2)$、$u=x$、$\Lambda_\omega^*=\mathbb Z\,dx$ とする。$\check X_0=(0,2)\times(\mathbb R/\mathbb Z)$ で、$z=x+iv$、$W=e^{2\pi x}e^{2\pi i v}$ だから

$$
1<|W|<e^{4\pi},\qquad
\arg W=2\pi v\pmod{2\pi}.
$$

**定義の確認**：$v\mapsto v+m$ は $W$ を変えず、$W\ne0$ である。逆に $x=(\log|W|)/(2\pi)$、$[v]=[\arg(W)/(2\pi)]$ なので異なる商の点は区別できる。像は $\mathbb C^*$ の開いた環状領域で、複素1次元の座標となる。指数を $e^{2\pi i z}$ とすると $v$ の整数移動で値が変わるので、ここでは **$e^{2\pi z}$** が正しい。
<!-- definition-example-end -->

一般の $n$ では $u$ の座標像 $U_u\subset\mathbb R^n$ の上で、$W$ の像は $(\mathbb C^*)^n$ の開集合

$$
\left\{W\in(\mathbb C^*)^n:
 \frac1{2\pi}(\log|W_1|,\ldots,\log|W_n|)\in U_u\right\}
$$

である。逆写像で各 $\log|W_i|$ と $\arg W_i$ を読むので、これは実 $2n$ 次元の滑らかなチャートであり、複素 $n$ 次元のチャートでもある。

## 4. 整数アフィン遷移が正則な貼り合わせを与える

[前講の命題（双対周期座標とポテンシャルの遷移）](../SYZ1-09/index.md#prop-syz1-09-affine-transition)から、連結なチャートの重なりでは

$$
u'=Au+c,\qquad
A\in GL(n,\mathbb Z),\quad c\in\mathbb R^n
$$

である。$u$ と $u'$ が同じ基底点を記述するとき、接ベクトル $\xi$ は不変だが成分は変化する。実際、$\xi=\sum_jv^j\partial_{u^j}$ なので、

$$
v'^i=du'^i(\xi)
=\sum_jA_{ij}du^j(\xi)=\sum_jA_{ij}v^j.
$$

この式を使うと $z'=Az+c$ が導かれる。$A$ が整数で逆も整数だから $v$ の整数シフトは $v'$ の整数シフトへ、しかも双方向に移る。

<a id="thm-syz1-10-complex-gluing"></a>

<!-- formal-statement-start -->
> **定理（semi-flat双対トーラスの複素構造と貼り合わせ）**  
> 実 $n$ 次元の滑らかな整数アフィン多様体 $B_0$ に、局所周期余接格子 $\Lambda_\omega^*$ が与えられ、整数アフィン座標の重なりで $u'=Au+c$（$A\in GL(n,\mathbb Z)$、$c\in\mathbb R^n$）が成り立つとする。すると $\check X_0=TB_0/\Lambda_\omega$ は自然な複素 $n$ 次元多様体となり、前節の $z$ 座標では遷移写像が

$$
z'=Az+c
$$

> と書ける。これは格子商で良定義な双正則遷移であり、三重の重なりでも整合する。その複素構造 $J_{\mathrm{sf}}$ は局所的に

$$
J_{\mathrm{sf}}\left(\frac{\partial}{\partial u^i}\right)
=\frac{\partial}{\partial v^i},
\qquad
J_{\mathrm{sf}}\left(\frac{\partial}{\partial v^i}\right)
=-\frac{\partial}{\partial u^i}
$$

> であり、積分可能である。
<!-- formal-statement-end -->

### 証明の見取り図

局所複素変数 $z^i$ をまず作り、$A$ が整数だから格子商で矛盾しないこと、$A^{-1}$ も整数だから逆があることを別々に確かめる。三重の重なりはアフィン写像の合成を直接計算する。最後に各 $z$ が正則チャートなので複素構造が積分可能だと分かる。

<!-- proof-start -->
### 証明

チャート $U_\alpha,U_\beta$ で $\;u_\beta=A_{\beta\alpha}u_\alpha+c_{\beta\alpha}$ とする。$A_{\beta\alpha}$ は局所定数であり、接ベクトルの成分は $v_\beta=A_{\beta\alpha}v_\alpha$ となる。従って

$$
z_\beta=u_\beta+i v_\beta
=A_{\beta\alpha}(u_\alpha+i v_\alpha)+c_{\beta\alpha}
=A_{\beta\alpha}z_\alpha+c_{\beta\alpha}.
$$

$v_\alpha\mapsto v_\alpha+m$、$m\in\mathbb Z^n$ と代表を替えると $v_\beta\mapsto v_\beta+A_{\beta\alpha}m$ となる。整数行列ゆえ $A_{\beta\alpha}m\in\mathbb Z^n$ であり、新しい商の点は不変である。逆変換は

$$
z_\alpha=A_{\beta\alpha}^{-1}(z_\beta-c_{\beta\alpha}),
\qquad A_{\beta\alpha}^{-1}\in GL(n,\mathbb Z).
$$

従って両方向に良定義である。さらに複素線形部分は実定数の可逆行列、平行移動は複素定数なので、遷移と逆遷移は正則である。

三枚のチャート $U_\alpha,U_\beta,U_\gamma$ が重なると、

$$
\begin{aligned}
u_\gamma
&=A_{\gamma\beta}(A_{\beta\alpha}u_\alpha+c_{\beta\alpha})+c_{\gamma\beta}\\
&=(A_{\gamma\beta}A_{\beta\alpha})u_\alpha
 +(A_{\gamma\beta}c_{\beta\alpha}+c_{\gamma\beta}).
\end{aligned}
$$

元の座標系も同じ $u_\gamma$ を与えるので

$$
A_{\gamma\alpha}=A_{\gamma\beta}A_{\beta\alpha},
\qquad
c_{\gamma\alpha}=A_{\gamma\beta}c_{\beta\alpha}+c_{\gamma\beta}.
$$

$z$ に対しても同じ二式で合成が一致する。よって貼り合わせは三重の重なりで矛盾しない。

座標 $z^i=u^i+i v^i$ に標準複素構造を入れ、実接方向の作用を調べると定理の $J_{\mathrm{sf}}$ の二式が得られる。その二回適用はどちらの方向にも $-1$ を与えるから $J_{\mathrm{sf}}^2=-\mathrm{id}$ である。遷移の実微分は $\operatorname{diag}(A,A)$ で、$J_{\mathrm{sf}}$ と可換である。従って $J_{\mathrm{sf}}$ は大域的に貼り合う。

構成した座標の遷移はすべて正則で、これが複素多様体の正則アトラスそのものである。よって $J_{\mathrm{sf}}$ は積分可能である。
<!-- proof-end -->

### 直接例：せん断行列で確かめる

$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$c=(2,-1)^{\mathsf T}$ とする。行列式は1、逆行列は $\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ だから $A\in GL(2,\mathbb Z)$。成分表示は

$$
z'^1=z^1+z^2+2,\qquad z'^2=z^2-1.
$$

$v^1,v^2$ のどちらを整数だけ動かしても、新しい虚部は整数だけ移る。逆式は $z^2=z'^2+1$、$z^1=z'^1-z'^2-3$ で、正則かつ一意である。この具体例は、**複素構造に直交行列もHessianの定数性も必要ない**ことを示す。

## 5. 指数座標では遷移がLaurent単項式になる

指数座標 $W_i=e^{2\pi z^i}$ はホロノミーの周期1を消す。$W_j\ne0$ のもとで、各変数の整数冪（負の冪も含む）の積 $\prod_jW_j^{m_j}$（$m_j\in\mathbb Z$）を **Laurent単項式** と呼ぶ。この座標での変換式は複素多様体のトーラス的な姿を示すが、接格子を双対化したことを正確に反映していなければならない。

<a id="prop-syz1-10-monomial-transitions"></a>

<!-- formal-statement-start -->
> **命題（指数複素座標のLaurent単項式遷移）**  
> 前定理の仮定の下で、$u'=Au+c$、$A=(A_{ij})\in GL(n,\mathbb Z)$、$c\in\mathbb R^n$ に対応する指数座標の遷移は

$$
W'_i=e^{2\pi c^i}\prod_{j=1}^n W_j^{A_{ij}}
\quad (i=1,\ldots,n)
$$

> となる。各 $W_j\ne0$ なので負の整数指数も許される。これは $(\mathbb C^*)^n$ の開集合の間の双正則写像である。
<!-- formal-statement-end -->

### 証明の見取り図

$z'=Az+c$ を指数へ代入すれば積になる。整数指数なので $z$ の虚部の代表元によらない。逆行列の整数性から逆変換も同じ形のLaurent単項式になる。

<!-- proof-start -->
### 証明

各 $i$ について

$$
\begin{aligned}
W'_i
&=\exp(2\pi z'^i)
=\exp\!\left(2\pi\left[\sum_jA_{ij}z^j+c^i\right]\right)\\
&=e^{2\pi c^i}\prod_j(e^{2\pi z^j})^{A_{ij}}
=e^{2\pi c^i}\prod_jW_j^{A_{ij}}.
\end{aligned}
$$

$A_{ij}\in\mathbb Z$ で $W_j\ne0$ だから各因子は単価正則関数である。逆行列 $A^{-1}$ も整数成分を持ち、逆アフィン変換 $z=A^{-1}(z'-c)$ から同じ形の正則な逆写像が得られる。よって双正則である。
<!-- proof-end -->

上のせん断例では

$$
W'_1=e^{4\pi}W_1W_2,\qquad
W'_2=e^{-2\pi}W_2.
$$

逆は $W_2=e^{2\pi}W'_2$、$W_1=e^{-6\pi}W'_1/W'_2$ である。積と商を実際に代入すれば、両式の合成が恒等写像になる。

## 6. なぜ $T^*B$ と $TB$ の変換則が違うのか

ファイバーに局所的な原点を選ぶと、[作用・角変数の局所表示](../SYZ1-07/index.md#thm-syz1-07-action-angle)によって元のトーラス束のファイバーを $T_b^*B_0/\Lambda_{\omega,b}^*$ と表示できる。ただし原点の選択を変えると並進が現れ、大域で**標準的な同一視**があるとは限らない。一方、双対ホロノミー束 $TB_0/\Lambda_\omega$ には自明文字という自然な零断面がある。ここでは $B$ 場を加えず、平坦接続の文字だけを扱う。

<a id="prop-syz1-10-cotangent-versus-tangent"></a>

<!-- formal-statement-start -->
> **命題（余接トーラスと双対接トーラスの遷移）**  
> $u'=Au+c$、$A\in GL(n,\mathbb Z)$ という整数アフィン変換について、余接ベクトルを $p=\sum_i p_i\,du^i$、接ベクトルを $\xi=\sum_i v^i\partial_{u^i}$ と書くと、係数の変換は

$$
p'=A^{-\mathsf T}p,\qquad v'=Av
$$

> である。従って局所的な元の余接トーラス $T^*B_0/\Lambda_\omega^*$ と、ホロノミーによる双対接トーラス $TB_0/\Lambda_\omega$ は、同じ格子をそのまま二度使った商ではない。
<!-- formal-statement-end -->

### 証明の見取り図

同じ余接ベクトル $p$ と接ベクトル $\xi$ を新旧基底で表し直す。対合 $p(\xi)$ が変わらないことを途中式で確認し、二つの格子への作用も確かめる。

<!-- proof-start -->
### 証明

$du'=A\,du$ である。列ベクトルを用いると $p=p^{\mathsf T}du=p'{}^{\mathsf T}du'=p'{}^{\mathsf T}A\,du$。従って $p=A^{\mathsf T}p'$、すなわち $p'=A^{-\mathsf T}p$ となる。接ベクトルは $v'^i=du'^i(\xi)=\sum_jA_{ij}v^j$ である。

対合を係数で書くと

$$
p'{}^{\mathsf T}v'
=(A^{-\mathsf T}p)^{\mathsf T}(Av)
=p^{\mathsf T}A^{-1}Av=p^{\mathsf T}v.
$$

$A,A^{-1}$ はともに整数なので、余接の整数格子と接の整数格子はそれぞれ自分の変換則の下で保たれる。よって双対化はチャートの選択から独立である。
<!-- proof-end -->

**異なる周期格子を入れたときの注意。** 前講の $t=\nabla\phi(u)$ は一般に $H(u)=D_ut$ が整数定数行列ではない。例えば $H=\operatorname{diag}(2,3)$ とすると $\mathbb Z\,du^1+\mathbb Z\,du^2$ と $\mathbb Z\,dt_1+\mathbb Z\,dt_2$ は同じ格子ではない。局所の計量が二つの格子を実線形に結びつけても、そのことだけで整数接格子が一致するとはいえない。[Legendre双対の逆Hessian定理](../SYZ1-09/index.md#thm-syz1-09-legendre-duality)は実線形・微分幾何の主張であり、整数格子の同一性を述べる定理ではない。

### 失敗例：整数アフィン条件を外す

$n=1$ で $u'=2u$ を「同じ」整数アフィン座標だとしてみる。接係数は $v'=2v$ なので、整数格子による商上では $[v]\mapsto[2v]$ となる。$[0]$ と $[1/2]$ は異なるのに像はどちらも $[0]$ だから、これは双対トーラスの座標変更として単射でない。行列 $(2)$ は実線形には可逆だが、$GL(1,\mathbb Z)=\{1,-1\}$ に属さない。破れた仮定は**逆行列も整数であること**であり、前定理の逆チャートが格子商へ降りる段階が壊れる。

## 7. 平坦トーラスで複素構造を最後まで計算する

[前講の異方的SLagトーラスの例](../SYZ1-09/index.md#thm-syz1-09-hessian)と同じ座標設定で、$a_j>0$、$j=1,2$ とし

$$
X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2,\quad
\omega=\sum_{j=1}^2 a_j\,dx^j\wedge dy^j,\quad
\Omega=\sqrt{a_1a_2}\,dz^1\wedge dz^2
$$

を取る。$L_y=\{y=\text{一定}\}$ は $dx^1\wedge dx^2$ の向きを持つ位相0のSLagである。$x^j,y^j$ はそれぞれ周期1、$u^j=a_j y^j$ は基底の局所シンプレクティック周期座標となる。これは前講の周期計算をそのまま再利用している。

双対ファイバーのホロノミーを $\rho(\gamma_j)=e^{2\pi i v^j}$ と指定する。基底の局所持ち上げを選ぶと

$$
z_{\mathrm{sf}}^j=a_jy^j+i v^j,\qquad
W_j=e^{2\pi a_jy^j}e^{2\pi i v^j}.
$$

$y^j\mapsto y^j+1$ は同じ基底点を表すが、持ち上げた周期座標は $u^j\mapsto u^j+a_j$ となる。従って貼り合わせは

$$
z_{\mathrm{sf}}^j\mapsto z_{\mathrm{sf}}^j+a_j,\qquad
W_j\mapsto e^{2\pi a_j}W_j.
$$

加えて $v^j\mapsto v^j+1$ は $z_{\mathrm{sf}}^j\mapsto z_{\mathrm{sf}}^j+i$ で、$W_j$ は不変である。このため鏡像の複素多様体は

$$
\check X_0\cong
\prod_{j=1}^2\mathbb C/(a_j\mathbb Z+i\mathbb Z)
$$

として記述できる。$a_j>0$ なので $a_j$ と $i$ は実線形独立な周期を与え、各因子が複素1次元トーラスであることも直接確認できる。

ここでは $a_1\ne a_2$ でも $\check X_0$ の複素座標は矛盾なく貼り合う。一方、次講で検討する鏡像のKähler形式・計量にはHessian $H$ が現れる。**複素チャートの存在**と**Kähler・Ricci平坦性の検証**は別々の問題である。

## 8. 演習：ホロノミーから正則貼り合わせまで

### Level A：整数双対・指数座標を確かめる

<a id="ex-syz1-10-a01"></a>

#### SYZ1-10-A01 双対接格子の直接判定

- Level: A

$B=\mathbb R^2$ で $\Lambda_\omega^*=\mathbb Z(du^1+du^2)+\mathbb Z\,du^2$ とする。$\xi=a\partial_{u^1}+b\partial_{u^2}$ が双対接格子に属する必要十分条件と、$\Lambda_\omega$ の生成元を求めよ。

<!-- solution-start -->
### 詳細解答

二つの余接生成元に値を代入すると、$(du^1+du^2)(\xi)=a+b$、$du^2(\xi)=b$ である。したがって必要十分条件は $a+b\in\mathbb Z,\ b\in\mathbb Z$。二式の差から $a\in\mathbb Z$ も従う。逆に $a,b\in\mathbb Z$ なら両式は整数だから十分である。よって $\Lambda_\omega=\mathbb Z\partial_{u^1}\oplus\mathbb Z\partial_{u^2}$。
<!-- solution-end -->

<a id="ex-syz1-10-a02"></a>

#### SYZ1-10-A02 平坦ホロノミーの値と周期

- Level: A

$\rho(\gamma_1)=e^{2\pi i/3}$、$\rho(\gamma_2)=-1$ とする。双対接トーラスの代表 $v$ を一つ求め、$\rho(2\gamma_1-\gamma_2)$ を計算せよ。代表の取り替えが結果に影響しない理由も述べよ。

<!-- solution-start -->
### 詳細解答

$v=(1/3,1/2)$ と取れば各基本1サイクルへの文字の値が与えられたものに等しい。群準同型性より

$$
\rho(2\gamma_1-\gamma_2)
=e^{2\pi i(2/3-1/2)}
=e^{2\pi i/6}=e^{\pi i/3}.
$$

$v\mapsto v+(m_1,m_2)$、$m_i\in\mathbb Z$ なら、指数中の差は $2m_1-m_2\in\mathbb Z$ なので指数は変わらない。この整数シフトが双対接格子である。
<!-- solution-end -->

<a id="ex-syz1-10-a03"></a>

#### SYZ1-10-A03 一次元の指数チャート

- Level: A

$u\in(1,3)$、$v\in\mathbb R/\mathbb Z$ とし、$W=e^{2\pi(u+iv)}$ とする。$W$ の像と逆写像を求めよ。

<!-- solution-start -->
### 詳細解答

絶対値は $|W|=e^{2\pi u}$ なので、$e^{2\pi}<|W|<e^{6\pi}$ である。偏角は $2\pi v$ なので、各許容絶対値について円周の全偏角が得られる。逆に $u=(\log|W|)/(2\pi)$、$[v]=[\arg W/(2\pi)]$ と復元する。偏角の代表を $2\pi$ 変えても $[v]$ は変わらない。従って像はこの開環状領域である。
<!-- solution-end -->

<a id="ex-syz1-10-a04"></a>

#### SYZ1-10-A04 複素構造の二回作用

- Level: A

$J_{\mathrm{sf}}\partial_{u^i}=\partial_{v^i}$、$J_{\mathrm{sf}}\partial_{v^i}=-\partial_{u^i}$ とする。$J_{\mathrm{sf}}^2=-\mathrm{id}$ と、任意の実行列 $A$ に対して $\operatorname{diag}(A,A)$ が $J_{\mathrm{sf}}$ と可換であることを示せ。

<!-- solution-start -->
### 詳細解答

$J_{\mathrm{sf}}^2\partial_{u^i}=J_{\mathrm{sf}}\partial_{v^i}=-\partial_{u^i}$。また $J_{\mathrm{sf}}^2\partial_{v^i}=-J_{\mathrm{sf}}\partial_{u^i}=-\partial_{v^i}$ なので任意の接ベクトルに対して成立する。$J_{\mathrm{sf}}$ の行列は $\begin{pmatrix}0&-I\\I&0\end{pmatrix}$ である。積は

$$
\begin{pmatrix}A&0\\0&A\end{pmatrix}
\begin{pmatrix}0&-I\\I&0\end{pmatrix}
=
\begin{pmatrix}0&-A\\A&0\end{pmatrix}
=
\begin{pmatrix}0&-I\\I&0\end{pmatrix}
\begin{pmatrix}A&0\\0&A\end{pmatrix}.
$$

ただし、格子の整数シフトを保ったうえで逆写像も持つ座標変更にするには、さらに $A\in GL(n,\mathbb Z)$ が必要である。
<!-- solution-end -->

<a id="ex-syz1-10-a05"></a>

#### SYZ1-10-A05 一次元の並進と指数の係数

- Level: A

$u'=u+3/2$、$v'=v$ とするとき $z'$ と $W'$ を $z,W$ で表せ。また $u'=2u$、$v'=2v$ とした場合、何が異なるか述べよ。

<!-- solution-start -->
### 詳細解答

$z'=u'+iv'=z+3/2$、従って $W'=e^{2\pi(z+3/2)}=e^{3\pi}W$。これは逆が $W=e^{-3\pi}W'$ の正則な変換である。一方 $v\mapsto2v$ は $[0]$ と $[1/2]$ を同じ $[0]$ に移す。行列 $(2)$ の逆は整数行列でないので、格子商のチャート変更ではない。
<!-- solution-end -->

### Level B：遷移と二種類のトーラスを区別する

<a id="ex-syz1-10-b01"></a>

#### SYZ1-10-B01 二次元せん断のLaurent表示

- Level: B

$u'=(u^1+u^2,\,u^2)^{\mathsf T}$ とする。$v'$、$z'$、$W'$ を計算し、逆写像が正則であることを示せ。$v^1$ または $v^2$ を整数だけ替えた場合も確かめよ。

<!-- solution-start -->
### 詳細解答

$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ なので $v'=(v^1+v^2,v^2)^{\mathsf T}$、$z'=(z^1+z^2,z^2)^{\mathsf T}$。指数を取り

$$
W'_1=W_1W_2,\qquad W'_2=W_2.
$$

$A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ から $W_2=W'_2,\ W_1=W'_1/W'_2$。各 $W_i$ は非零なので逆も正則である。$v\mapsto v+(m_1,m_2)$ に対して $v'\mapsto v'+(m_1+m_2,m_2)$ となり、整数シフトは両側で保たれる。
<!-- solution-end -->

<a id="ex-syz1-10-b02"></a>

#### SYZ1-10-B02 有理係数ではなぜ失敗するか

- Level: B

$n=1$ の二つの表示で $u'=u/2$、$v'=v/2$ としたい。$v$ が $\mathbb R/\mathbb Z$ の元であることを踏まえ、座標変換として失敗する理由を具体的に示せ。反対に $u'=2u$ とした場合も調べよ。

<!-- solution-start -->
### 詳細解答

旧座標の $[v]=[v+1]$ は同じ点である。しかし $[v/2]$ と $[(v+1)/2]$ は $1/2$ だけ異なり、同じ新座標の点にならない。よって $[v]\mapsto[v/2]$ は関数として**良定義でない**。$u'=2u$ の場合、$[v]\mapsto[2v]$ は良定義だが $[0]$ と $[1/2]$ の像が一致し逆写像を持たない。前者は整数成分条件、後者は逆行列の整数条件を失う。$GL(1,\mathbb Z)$ なら両失敗を避けられる。
<!-- solution-end -->

<a id="ex-syz1-10-b03"></a>

#### SYZ1-10-B03 接と余接の逆転置

- Level: B

$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ の下で接係数 $v=(2,3)^{\mathsf T}$、余接係数 $p=(4,5)^{\mathsf T}$ がどう変換するか求め、$p^{\mathsf T}v$ が保存されることを数値で確かめよ。

<!-- solution-start -->
### 詳細解答

接係数は $v'=Av=(5,3)^{\mathsf T}$。$A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ なので $A^{-\mathsf T}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}$。従って $p'=(4,1)^{\mathsf T}$。旧対合は $4\cdot2+5\cdot3=23$、新対合は $4\cdot5+1\cdot3=23$ となる。同じ行列 $A$ を余接係数にも使うと値が保存されない理由は、余接成分が座標微分の逆転置で動くためである。
<!-- solution-end -->

<a id="ex-syz1-10-b04"></a>

#### SYZ1-10-B04 異方的トーラスと複素周期

- Level: B

第7節で $(a_1,a_2)=(2,3)$ とする。局所的な複素座標 $z_{\mathrm{sf}}^1,z_{\mathrm{sf}}^2$ を記し、基底を一周したときの周期格子と $W_1,W_2$ の遷移を求めよ。さらに [Legendre双対定理](../SYZ1-09/index.md#thm-syz1-09-legendre-duality)の $H$ が、ここでの複素チャートの存在に必要かを判定せよ。

<!-- solution-start -->
### 詳細解答

$u=(2y^1,3y^2)$、$z_{\mathrm{sf}}=(2y^1+iv^1,\,3y^2+iv^2)$ となる。基底の $y^1$ 一周で $z^1$ は2、$y^2$ 一周で $z^2$ は3増加する。ホロノミーの周期は $i\mathbb Z^2$。従って複素格子は $(2\mathbb Z+i\mathbb Z)\oplus(3\mathbb Z+i\mathbb Z)$ で、$W_1\mapsto e^{4\pi}W_1$、$W_2\mapsto e^{6\pi}W_2$ である。

$H=\operatorname{diag}(\sqrt6/2,\sqrt6/3)$ は前講の基底計量の行列だが、ここでの正則遷移は $u$ の整数アフィン構造だけで構成した。したがって複素チャートの存在にはこの $H$ の具体値やRicci平坦性を使っていない。次講の計量・Kähler形式で初めて区別が重要になる。
<!-- solution-end -->

### Level C：群・格子・正則構造を一つの証明で結ぶ

<a id="ex-syz1-10-c01"></a>

#### SYZ1-10-C01 双対化と三重の貼り合わせの完全検算

- Level: C

第1節の滑らかなSLagトーラス束 $\pi:X_0\to B_0$ を $n=2$ として仮定し、実2次元の基底 $B_0$ 上でシンプレクティック周期による整数アフィン構造を用いる。各チャート $U_\alpha,U_\beta,U_\gamma$ では1サイクル基底 $\gamma_{\alpha,1},\gamma_{\alpha,2}$ を運び、$du_\alpha^i=p_{\gamma_{\alpha,i}}$ と対応させる（[周期余接格子の定義](../SYZ1-08/index.md#def-syz1-08-two-period-covectors)）。連結な重なりで

$$
u_\beta=A_{\beta\alpha}u_\alpha+c_{\beta\alpha},\qquad
u_\gamma=A_{\gamma\beta}u_\beta+c_{\gamma\beta}
$$

とする。$A_{\beta\alpha},A_{\gamma\beta}\in GL(2,\mathbb Z)$。次のすべてを示せ。(i) $du_\alpha$ が張る余接格子とその双対接格子がチャートによらない。(ii) 双対接格子による商が $H_1(L_b;\mathbb Z)$ の文字トーラスを表す。(iii) $z_\alpha=u_\alpha+iv_\alpha$、$W_{\alpha,i}=e^{2\pi z_\alpha^i}$ の遷移が双正則であり、$\alpha\to\beta\to\gamma$ と $\alpha\to\gamma$ が一致する。(iv) $u_\beta=2u_\alpha$ と置き換えた場合に壊れる証明段階を挙げよ。

<!-- solution-start -->
### 詳細解答

(i) $du_\beta=A_{\beta\alpha}du_\alpha$。整数行列が可逆でその逆も整数なので、両側の整数線形結合が一致し $\Lambda_{\omega,\beta}^*=\Lambda_{\omega,\alpha}^*$ である。接係数は $v_\beta=A_{\beta\alpha}v_\alpha$ であり、$v_\alpha\in\mathbb Z^2$ と $v_\beta\in\mathbb Z^2$ は同値である。従って双対接格子も一致する。

(ii) 問題の周期対応を使うと、$\xi\in T_bB_0$ から文字の位相成分を

$
v_\alpha^i=du_\alpha^i(\xi)=p_{\gamma_{\alpha,i}}(\xi)
$

と得る。[双対接トーラスとホロノミー文字の命題](#prop-syz1-10-holonomy-dual)により、基本1サイクルへの文字の値は $\rho(\gamma_{\alpha,i})=e^{2\pi i v_\alpha^i}$ である。

[二重整数アフィン構造の定理](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)における周期対応はサイクル基底上の線形同型である。従って座標微分の変換から

$
du_\beta=A_{\beta\alpha}du_\alpha,
\qquad \gamma_\beta=A_{\beta\alpha}\gamma_\alpha,
\qquad v_\beta=A_{\beta\alpha}v_\alpha
$

と順に導かれる。新基底への文字の値も

$
\rho(\gamma_{\beta,i})
=\prod_j\rho(\gamma_{\alpha,j})^{(A_{\beta\alpha})_{ij}}
=e^{2\pi i(A_{\beta\alpha}v_\alpha)^i}
=e^{2\pi i v_\beta^i}
$

となる。文字の核は全基本サイクルへの位相が1となる $\mathbb Z^2$ で、任意の二つの位相は $v_\alpha$ から作れる。従って商と文字群の同型はチャートに依存しない。

(iii) 係数変換を用い

$$
z_\beta=A_{\beta\alpha}z_\alpha+c_{\beta\alpha},\qquad
W_{\beta,i}=e^{2\pi c_{\beta\alpha}^i}
  \prod_jW_{\alpha,j}^{(A_{\beta\alpha})_{ij}}.
$$

整数指数なので $v$ の代表元によらず定義でき、逆変換には $A_{\beta\alpha}^{-1}\in GL(2,\mathbb Z)$ を使う。複素変数の正則多項式と非零変数の整数べきのみなので、写像も逆も正則である。三重の重なりでは

$$
A_{\gamma\alpha}=A_{\gamma\beta}A_{\beta\alpha},\quad
c_{\gamma\alpha}=A_{\gamma\beta}c_{\beta\alpha}+c_{\gamma\beta}
$$

であり、$\beta$ を経由した $z_\gamma$ は

$$
z_\gamma=(A_{\gamma\beta}A_{\beta\alpha})z_\alpha
+A_{\gamma\beta}c_{\beta\alpha}+c_{\gamma\beta}
$$

となる。直接の $\alpha\to\gamma$ と同一だから $W_\gamma$ も一致する。

(iv) $2I$ は逆行列 $\frac12I$ が整数でなく、商上では $[v]\mapsto[2v]$ が非単射となる。従って (i) の格子の一致と (iii) の可逆な逆遷移の双方が崩れる。これは複素構造の積分可能性以前の、**商空間上のアトラス**の失敗である。
<!-- solution-end -->

## 9. 次講へ：複素構造を計量と結びつける

本講では、シンプレクティック周期格子 $\Lambda_\omega^*$ と双対接格子 $\Lambda_\omega$ の対応を基に、ホロノミー文字から $\check X_0=TB_0/\Lambda_\omega$ を作った。整数アフィン遷移によって $z=u+iv$ および $W_i=e^{2\pi z^i}$ が正則に貼り合うので、**滑らかな基底上のsemi-flat複素構造**が確立した。

次の SYZ1-11（semi-flat鏡像II） では、[Hessian計量とLegendre双対](../SYZ1-09/index.md#thm-syz1-09-hessian)をこの複素構造と結びつけ、Kähler形式・計量・接続を構成する。その段階で正定値性、Ricci平坦性に必要な追加の条件、$B$ 場を区別する。特異ファイバーを越える無補正の大域鏡像を本講から結論することはしない。
