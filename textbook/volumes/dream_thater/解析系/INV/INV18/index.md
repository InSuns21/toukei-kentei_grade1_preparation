# INV18 随伴法から感度と識別をどう得るか

<!-- definition-example-audit: strict -->

[INV17 の状態写像と観測写像](../INV17/index.md#def-inv17-state-observation)では、拡散係数 $a$ を変えたときの状態 $u=S(a)$、観測 $G(a)=O(S(a))$、その[係数感度方程式](../INV17/index.md#def-inv17-sensitivity-equation)を得ました。観測値とデータのずれを最小化するには、さらに「ずれを測る実数値の目的関数」を係数で微分する必要があります。係数の各方向に感度方程式を解けば計算できますが、未知係数が多数あると負担が大きくなります。

そこで観測残差から補助方程式を作り、その解を一度求めるだけで任意の係数方向への勾配を評価します。同じ一次元拡散 PDE を最後まで使い、[Lagrangian の概念](../../../応用系/OPT/OPT5/index.md#def-opt5-lagrangian)を PDE 制約へ拡張するときの符号、零境界条件、有限差分の照合を省きません。そのうえで、勾配を得たことと未知係数を一意に復元できることは別問題だと確かめます。

本講の到達点は以下です。

1. PDE 制約付きの観測残差目的関数と、残差から作る補助の弱方程式を定義し、直接例で確認する。
2. state → objective → Lagrangian → adjoint → parameter gradient を、弱形式から境界項の符号まで導出する。
3. 定数係数の厳密解と中心有限差分で随伴勾配を独立に照合する。
4. 単一観測での厳密な非一意性と、微分の核だけからは言えないことを区別する。
5. 二つの観測によって有限次元の二パラメータ係数が局所的に安定識別できる例を証明する。

## 1. PDE 制約から観測残差の目的関数を作る

区間 $I=(0,1)$、実 Hilbert 空間 $V=H_0^1(I)$ とノルム $\|v\|_V=\|v'\|_{L^2(I)}$ を使います。[INV17 の許容係数集合](../INV17/index.md#def-inv17-admissible-coefficients)は

$$
\mathcal U=\{a\in L^\infty(I):\operatorname*{ess\,inf}a>0\}
$$

です。既知の $f\in L^2(I)$ に対する状態 $u=S(a)\in V$ は、全ての $v\in V$ に対して

$$
B_a(u,v):=\int_0^1a u'v'\,dx
=\int_0^1fv\,dx=:\ell_f(v)
$$

を満たします。[一様正値係数に対する状態の存在一意性と評価](../INV17/index.md#thm-inv17-state-existence)により $a\in\mathcal U$ で一意に定まります。$u$ と試験関数 $v$ は端点で零トレースを持つため、形式的に $-(au')'=f$ と書いたときの部分積分の境界項 $[au'v]_0^1$ は零です。ただし $a\in L^\infty$ の一般の場合、弱形式を正本とします。

観測の重み $g_1,\ldots,g_m\in L^2(I)$、測定データ $d=(d_i)_{i=1}^m\in\mathbb R^m$ を与え、

$$
O_i(v)=\int_0^1g_i(x)v(x)\,dx,\qquad
O(v)=(O_1(v),\ldots,O_m(v))
$$

とします。[Poincaré 不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)と Cauchy–Schwarz から各 $O_i$ は $V$ 上有界線形です。観測値と測定データの差を $r_i(a)=O_i(S(a))-d_i$ と書きます。小さな差を得るため、以下では二乗和と、必要なら基準係数 $a_0$ からのずれを組み合わせます。

<a id="def-inv18-objective"></a>

<!-- formal-statement-start -->
> **定義（PDE 制約付き目的関数）**  
> $I=(0,1)$、$V=H_0^1(I)$、$f\in L^2(I)$、$a_0\in L^2(I)$、$\alpha\ge0$、$m\ge1$、$g_i\in L^2(I)$、$d_i\in\mathbb R$ を固定する。各 $a\in\mathcal U\subset L^\infty(I)$ について、$u=S(a)$ を上の拡散の弱方程式の唯一解とし、観測残差を

$$
r_i(a)=O_i(S(a))-d_i
$$

> と定義する。これを用いて、

$$
j(a)=\frac12\sum_{i=1}^m
\bigl(O_i(S(a))-d_i\bigr)^2
+\frac{\alpha}{2}\|a-a_0\|_{L^2(I)}^2
$$

> を**縮約目的関数**と呼ぶ。状態を独立変数とする場合は

$$
J(a,u)=\frac12\sum_{i=1}^m(O_i(u)-d_i)^2
+\frac{\alpha}{2}\|a-a_0\|_2^2
$$

> と記し、制約 $B_a(u,v)=\ell_f(v)$（全 $v\in V$）の下で考える。$j(a)=J(a,S(a))$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv18-objective -->

**定義の確認**：$f=1$、$a=c>0$（定数）、$g_1=1$、$\alpha=0$ とすると、[INV17 の直接解](../INV17/index.md#def-inv17-state-observation)より

$$
u_c(x)=\frac{x(1-x)}{2c},\qquad
O_1(u_c)=\int_0^1u_c\,dx=\frac1{12c}.
$$

従って測定データ $d_1=d$ について

$$
j(c)=\frac12\left(\frac1{12c}-d\right)^2.
$$

状態が零端点条件と弱方程式を満たすこと、観測が有界線形であること、残差が実数となること、$\alpha=0$ なので罰則が消えることを順に確かめました。$a_0$ は $\mathcal U$ の元である必要はありませんが、$a\in L^\infty(I)\subset L^2(I)$ なので罰則は有限です。

<!-- definition-example-end -->

最小化の存在・一意性は[INV8 の直接法](../INV8/index.md#thm-inv8-existence)のような追加条件を要します。本講はそれを無条件に宣言せず、**許容係数での微分と観測による識別**を調べます。また $L^\infty$ 上の方向微分を $L^2$ 内積で表示できても、それだけで $L^2$ ノルムに関する Fréchet 微分可能性が証明されたわけではありません。

## 2. 観測残差を補助方程式へ移す

[係数感度方程式](../INV17/index.md#def-inv17-sensitivity-equation)によれば、方向 $h\in L^\infty(I)$ に対する $w=DS(a)h\in V$ は

$$
B_a(w,v)=-\int_0^1h u'v'\,dx\qquad(v\in V)
$$

を満たします。[観測微分の系](../INV17/index.md#cor-inv17-observation-derivative)から残差部分の方向微分は

$$
\sum_{i=1}^m r_i(a)O_i(w).
$$

ここで $w$ を方向ごとに求める代わりに、重み付き観測汎関数

$$
q_a(v)=\sum_{i=1}^m r_i(a)O_i(v)
=\int_0^1\left(\sum_{i=1}^m r_i(a)g_i\right)v\,dx
$$

を右辺とする弱方程式を解きます。この唯一解を次のように定義します。

<a id="def-inv18-adjoint"></a>

<!-- formal-statement-start -->
> **定義（随伴状態）**  
> 上の PDE 制約付き目的関数の設定で $a\in\mathcal U$、$u=S(a)$、$r_i=O_i(u)-d_i$ とする。全ての $v\in V$ に対して

$$
\int_0^1a(x)p'(x)v'(x)\,dx
=\sum_{i=1}^m r_i\int_0^1g_i(x)v(x)\,dx
$$

> を満たす $p=p(a)\in V$ を**随伴状態**と呼ぶ。形式的な強い形は

$$
-(ap')'=\sum_{i=1}^m r_i g_i,\qquad p(0)=p(1)=0
$$

> である。右辺の係数 $r_i$ は $x$ に依存しない実数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv18-adjoint -->

**定義の確認**：$f=1$、$a=c>0$、観測重み $g_1=1$ とデータ $d$ を選びます。上の状態 $u_c$ に対し $r=1/(12c)-d$ です。候補 $p=r u_c$ は両端点で零、$V$ に属し、

$$
\int_0^1c p'v'
=r\int_0^1c u_c'v'
=r\int_0^1v
$$

を**全ての** $v\in V$ について満たします。[Lax--Milgram 定理](../../GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)を $B_a$ と有界な右辺 $q_a$ に適用すると唯一解であり、候補は確かに随伴状態です。特に残差 $r=0$ のとき $p=0$ です。

<!-- definition-example-end -->

## 3. Lagrangian を微分して勾配を得る

PDE 制約 $B_a(u,v)=\ell_f(v)$ を目的関数へ組み込むため、$p\in V$ を制約の乗数として用います。ここでは **$+\ell_f(p)-B_a(u,p)$** の符号を採用します。逆の符号規約を採ると随伴状態の符号も変わるため、個々の公式を混ぜてはいけません。

<a id="def-inv18-lagrangian"></a>

<!-- formal-statement-start -->
> **定義（PDE 制約の Lagrangian）**  
> $a\in\mathcal U$、$u,p\in V$ に対し

$$
\mathcal L(a,u,p)
=J(a,u)+\ell_f(p)-B_a(u,p)
$$

> と定める。$p$ 方向への微分は

$$
D_p\mathcal L(a,u,p)[v]=\ell_f(v)-B_a(u,v)
$$

> である。従って全ての $v\in V$ に対する $D_p\mathcal L=0$ は状態の弱方程式に等しい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv18-lagrangian -->

**定義の確認**：$a=c>0$、$u=u_c$ を使うと、任意の $p\in V$ で $\ell_f(p)=B_c(u_c,p)$ なので $\mathcal L(c,u_c,p)=J(c,u_c)=j(c)$ です。一方、$u$ を $u_c$ から外せば

$$
D_p\mathcal L(c,u,p)[v]
=\int_0^1v-\int_0^1c u'v'
$$

となり、全試験関数についての零条件はちょうど PDE の弱方程式です。これで乗数 $p$ が何を強制しているか確認できました。

<!-- definition-example-end -->

<a id="thm-inv18-adjoint-gradient"></a>

<!-- formal-statement-start -->
> **定理（随伴法による縮約目的関数の微分）**  
> $I=(0,1)$、$V=H_0^1(I)$、$\mathcal U\subset L^\infty(I)$、$f\in L^2(I)$、$a_0\in L^2(I)$、$\alpha\ge0$、$g_i\in L^2(I)$、$d_i\in\mathbb R$ を上記のように固定する。このとき $j:\mathcal U\to\mathbb R$ は $L^\infty$ ノルムで Fréchet 微分可能である。$u=S(a)$ と[随伴状態](#def-inv18-adjoint) $p=p(a)$ に対し、任意の $h\in L^\infty(I)$ で

$$
Dj(a)[h]
=-\int_0^1h(x)u'(x)p'(x)\,dx
+\alpha\int_0^1(a-a_0)h\,dx.
$$

> 従って方向微分は、方向ごとの感度 PDE を解くことなく、状態 PDE と随伴 PDE の二つの解から評価できる。右辺は $L^\infty$ の有界線形汎関数である。
<!-- formal-statement-end -->

### 証明の見取り図

[INV17 の状態の Fréchet 微分定理](../INV17/index.md#thm-inv17-frechet-state)で $w=DS(a)h$ を得ます。残差の微分を $w$ で書いた後、随伴弱形式で試験関数 $v=w$ を取り、感度弱形式で $v=p$ を取ると、対称な $B_a$ が消去できます。Lagrangian からも同じ符号を導きます。

<!-- proof-start -->
### 証明

**(1) 微分可能性と直接感度。** $S:\mathcal U\to V$ は[INV17 の微分定理](../INV17/index.md#thm-inv17-frechet-state)により Fréchet 微分可能です。$O_i$ は有界線形なので $O_i(S(a+h))=O_i(u)+O_i(w)+o(\|h\|_\infty)$ です。残差二乗を展開すると

$$
\frac12(r_i+O_i(w)+o(\|h\|_\infty))^2
=\frac12r_i^2+r_iO_i(w)+o(\|h\|_\infty).
$$

ここで $O_i(w)=O(\|h\|_\infty)$ であり、二乗の二次項は $o(\|h\|_\infty)$ です。また $L^\infty(I)\hookrightarrow L^2(I)$（区間の長さ1）から

$$
\begin{aligned}
&\frac\alpha2\|a+h-a_0\|_2^2
-\frac\alpha2\|a-a_0\|_2^2\\
&\qquad=\alpha\int_0^1(a-a_0)h\,dx
+\frac\alpha2\|h\|_2^2,
\qquad
\|h\|_2^2\le\|h\|_\infty^2.
\end{aligned}
$$

従って直接感度を用いる微分は

$$
Dj(a)[h]=\sum_{i=1}^m r_i O_i(w)
+\alpha\int_0^1(a-a_0)h\,dx.
$$

**(2) 随伴の存在と消去。** $q_a(v)=\sum_i r_iO_i(v)$ は有界線形であり、$B_a$ は[INV17 の状態定理](../INV17/index.md#thm-inv17-state-existence)で有界・強圧的です。[Lax--Milgram 定理](../../GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)から[随伴弱方程式](#def-inv18-adjoint)の $p\in V$ は一意に存在します。随伴方程式に $v=w$ を入れると

$$
\sum_i r_iO_i(w)=B_a(p,w)=B_a(w,p).
$$

[感度方程式](../INV17/index.md#def-inv17-sensitivity-equation)に $v=p$ を入れると

$$
B_a(w,p)=-\int_0^1h u'p'\,dx.
$$

これらを直接微分の式へ代入して結論を得ます。$u',p'\in L^2$ なので積 $u'p'\in L^1$ であり、

$$
\left|\int_0^1hu'p'\right|
\le\|h\|_\infty\|u\|_V\|p\|_V.
$$

罰則の微分も $|\int(a-a_0)h|\le\|a-a_0\|_2\|h\|_\infty$ で評価でき、線形性と合わせて有界性を確認できます。

**(3) Lagrangian の符号の照合。** [Lagrangian の定義](#def-inv18-lagrangian)から、状態の増分 $v$、係数の増分 $h$ に関し

$$
\begin{aligned}
D_u\mathcal L(a,u,p)[v]
&=\sum_i r_iO_i(v)-B_a(v,p),\\
D_a\mathcal L(a,u,p)[h]
&=\alpha\int_0^1(a-a_0)h-\int_0^1h u'p',\\
D_p\mathcal L(a,u,p)[v]
&=\ell_f(v)-B_a(u,v).
\end{aligned}
$$

状態と随伴方程式ではそれぞれ $D_p\mathcal L=0$ と $D_u\mathcal L=0$ が全方向に成立し、残る $D_a\mathcal L$ が上の $Dj(a)$ です。滑らかな係数・解なら部分積分で $B_a(v,p)=[avp']_0^1-\int v(ap')'$ と書けますが、$v(0)=v(1)=0$ で境界項が消え、$-(ap')'=\sum_i r_ig_i$ という同じ符号を得ます。一般の $L^\infty$ 係数ではこの強形式への操作を正当化の根拠にせず、弱形式での計算が証明です。
<!-- proof-end -->

**勾配の意味。** 式を $Dj(a)[h]=\int_0^1\gamma_a(x)h(x)\,dx$ と表せるので、

$$
\gamma_a=-u'p'+\alpha(a-a_0)\in L^1(I)
$$

は方向微分の**積分表示の密度**です。$a-a_0\in L^2\subset L^1$ と $u'p'\in L^1$ を使いました。$\gamma_a$ を $L^\infty$ の Riesz 勾配と呼んだり、一般に $\gamma_a\in L^2$ と断言したりしてはいけません。有限個の基底関数 $\phi_j\in L^\infty$ で $a_\theta=a_{\rm base}+\sum_j\theta_j\phi_j$ とすれば、通常の Euclid 座標の偏微分は

$$
\frac{\partial j(a_\theta)}{\partial\theta_j}
=Dj(a_\theta)[\phi_j]
=\int_0^1\gamma_{a_\theta}\phi_j\,dx
$$

です。方向 $\phi_j$ が増えても、**同じ一つの随伴状態**を再利用できます。

## 4. 定数係数で勾配を独立に検算する

$f=1$、$a=c>0$、単一観測 $O(v)=\int_0^1v$、$\alpha=0$、$d=0$ とします。先に厳密に計算した $G(c)=1/(12c)$ から

$$
j(c)=\frac1{288c^2},\qquad
j'(c)=-\frac1{144c^3}
$$

が得られます。一方、随伴状態は $p=G(c)u_c$ で

$$
u_c'=\frac{1-2x}{2c},\qquad
p'=\frac{1-2x}{24c^2}.
$$

方向 $h=\eta$（定数）を[随伴勾配定理](#thm-inv18-adjoint-gradient)に入れると

$$
\begin{aligned}
Dj(c)[\eta]
&=-\eta\int_0^1
\frac{(1-2x)^2}{48c^3}\,dx\\
&=-\frac{\eta}{48c^3}
\left(1-2+\frac43\right)
=-\frac{\eta}{144c^3}.
\end{aligned}
$$

厳密微分と一致しました。さらに $c=1$ で $0<|t|<1/2$ の中心有限差分を取ると

$$
\begin{aligned}
\frac{j(1+t)-j(1-t)}{2t}
&=\frac1{576t}
\left(\frac1{(1+t)^2}-\frac1{(1-t)^2}\right)\\
&=-\frac1{144(1-t^2)^2}
\longrightarrow-\frac1{144}.
\end{aligned}
$$

その誤差は

$$
\left|\frac{j(1+t)-j(1-t)}{2t}-j'(1)\right|
=\frac{2t^2-t^4}{144(1-t^2)^2}
\le\frac2{81}t^2
$$

です（$|t|\le1/2$ を使用）。有限差分は離散化した PDE ソルバの一致を自動的に保証するものではありませんが、この**連続モデルでの符号と係数**の独立検算になります。

## 5. 観測不足の非一意性と追加センサ

随伴法が計算するのは勾配であって、逆問題の一意性そのものではありません。[INV10 の局所識別可能性](../INV10/index.md#def-inv10-local-identifiability)を検討する際、微分の核があるだけでは厳密な非一意性を断定できません。ここでは元の非線形観測写像で**同じデータとなる異なる係数**を実際に作ります。

$f=1$、単一観測 $O_1(v)=\int_0^1v$ とし、$0<|\varepsilon|<1$ に対し

$$
a_+(x)=1+\varepsilon(x-\tfrac12),\qquad
a_-(x)=1-\varepsilon(x-\tfrac12)
$$

を取ります。両者は $a_\pm\ge1-|\varepsilon|/2>0$ で許容係数ですが、$\varepsilon\ne0$ なら異なります。反射 $x\mapsto1-x$ で $a_-(x)=a_+(1-x)$ です。$u_+=S(a_+)$、$\widetilde u(x)=u_+(1-x)$ とすると、端点零で $\widetilde u\in V$ です。任意の $v\in V$ に対し、$y=1-x$ と $\widetilde u'(x)=-u_+'(1-x)$、$\widetilde v(y)=v(1-y)$ を用いて

$$
\begin{aligned}
\int_0^1a_-(x)\widetilde u'(x)v'(x)\,dx
&=\int_0^1a_+(y)u_+'(y)\widetilde v'(y)\,dy\\
&=\int_0^1\widetilde v(y)\,dy
=\int_0^1v(x)\,dx.
\end{aligned}
$$

従って[状態の一意性](../INV17/index.md#thm-inv17-state-existence)から $S(a_-)(x)=S(a_+)(1-x)$ です。積分を変数変換すると

$$
O_1(S(a_-))=\int_0^1u_+(1-x)\,dx
=\int_0^1u_+(y)\,dy
=O_1(S(a_+)).
$$

**実際の二つの係数が同じ観測を生む**ため、単一の空間平均では非一意性が起きます。反射に対して観測も外力も対称であることが、失われる情報の具体的機構です。

対照的に、二パラメータ係数 $a_{s,t}(x)=1+s+tx$ を $|s|+|t|<1/2$ で考えます。対称平均 $O_1$ に加えて、中心に対する左右の偏りを測る

$$
O_2(v)=\int_0^1(x-\tfrac12)v(x)\,dx
$$

を選び、$\mathcal G(s,t)=(O_1(S(a_{s,t})),O_2(S(a_{s,t})))$ とします。両観測は $V$ 上有界線形です。基準 $(0,0)$ では

$$
u(x)=\frac{x(1-x)}2,\qquad
O_1(u)=\frac1{12},\quad O_2(u)=0.
$$

$1$ 方向の感度 $w_s=-u$ と、$x$ 方向の感度

$$
w_t(x)=\frac{x^3}3-\frac{x^2}4-\frac x{12}
$$

は[INV17 の感度方程式](../INV17/index.md#def-inv17-sensitivity-equation)から導かれます。実際、$w_t'=-xu'+C$ と置けば $C=-1/12$ が零端点条件から決まり、この $w_t$ になります。観測へ代入して

$$
\begin{aligned}
&O_1(w_s)=-\frac1{12},\quad
O_1(w_t)=\frac1{12}-\frac1{12}-\frac1{24}=-\frac1{24},\\
&O_2(w_s)=0,\quad
O_2(w_t)=\left(\frac1{15}-\frac1{16}-\frac1{36}\right)
-\frac12\left(-\frac1{24}\right)=-\frac1{360}.
\end{aligned}
$$

を得ます。

<a id="thm-inv18-two-sensor-identifiability"></a>

<!-- formal-statement-start -->
> **定理（二観測による二係数の局所安定識別）**  
> $I=(0,1)$、$V=H_0^1(I)$、$f=1$ とする。$|s|+|t|<1/2$ で係数と二つの観測を

$$
a_{s,t}=1+s+tx,\quad
O_1(v)=\int_0^1v,\quad
O_2(v)=\int_0^1(x-\tfrac12)v
$$

> と定める。観測写像は

$$
\mathcal G(s,t)=(O_1(S(a_{s,t})),O_2(S(a_{s,t})))
$$

> であり、$(0,0)$ の近傍で $C^1$ である。さらに、

$$
D\mathcal G(0,0)=
\begin{pmatrix}
-\frac1{12}&-\frac1{24}\\
0&-\frac1{360}
\end{pmatrix}
$$

> である。特にある $r,C>0$ が存在し、$z,z'\in B_r(0)\subset\mathbb R^2$ に対し

$$
\|z-z'\|_2\le C\|\mathcal G(z)-\mathcal G(z')\|_2
$$

> が成り立つ。したがってこの二パラメータ族では $(0,0)$ の近傍において二点識別と Lipschitz 安定性が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

上で計算した各方向の感度が行列の列になります。対角積が零でないので列フルランクです。[INV10 の有限次元フルランクの系](../INV10/index.md#cor-inv10-finite-full-rank)を適用するには、微分が周囲で連続であることも確かめます。

<!-- proof-start -->
### 証明

$s,t$ の十分小さい近傍では $a_{s,t}\ge1/2$ であり、[係数から状態への写像の Fréchet 微分](../INV17/index.md#thm-inv17-frechet-state)から $\mathcal G$ は微分可能です。$a,b\ge1/2$ をこの近傍で取り、$u_a=S(a),u_b=S(b)$ とします。二つの拡散の弱方程式を引き、$B_a$ を左辺にして試験関数 $u_a-u_b$ を入れると

$$
\|u_a-u_b\|_V
\le2\|a-b\|_\infty\|u_b\|_V.
$$

感度 $w_a[h]=DS(a)h$、$w_b[h]=DS(b)h$ の弱方程式を引けば

$$
B_a(w_a[h]-w_b[h],v)
=-\int_0^1h(u_a'-u_b')v'
-\int_0^1(a-b)w_b[h]'v'.
$$

強圧性と Cauchy–Schwarz から

$$
\|w_a[h]-w_b[h]\|_V
\le2\|h\|_\infty\|u_a-u_b\|_V
+2\|a-b\|_\infty\|w_b[h]\|_V.
$$

状態評価と感度評価から、右辺は $a\to b$ のとき $\|h\|_\infty$ に一様に $o(1)$ となります。従って $a\mapsto DS(a)$ はこの近傍で作用素ノルム連続であり、有限次元パラメータへの合成 $\mathcal G$ も $C^1$ です。

列はそれぞれ方向 $h=1$ と $h=x$ の観測感度です。上で計算した値から

$$
\det D\mathcal G(0,0)
=\frac1{12\cdot360}=\frac1{4320}>0.
$$

したがって行列は階数2です。[有限次元のフルランクによる局所安定性](../INV10/index.md#cor-inv10-finite-full-rank)へ $n=m=2$、$x_*=(0,0)$、$F=\mathcal G$ を代入すると、定理の二点評価が得られます。
<!-- proof-end -->

ここでの保証は **二パラメータ族内の局所的なもの**です。任意の $L^\infty$ 係数を二つの実数から復元できるという結論ではありません。実際、線形写像 $DG(a):L^\infty(I)\to\mathbb R^2$ は無限次元の定義域で単射にはなれません。例えば独立な3方向を取れば像の3ベクトルは $\mathbb R^2$ で線形従属なので、非零方向が核に入ります。ただし「核がある」だけで非線形 $G$ の厳密な非一意性を断定できない点は、反射による具体的構成と区別してください。

## 演習

以下、断りのない限り $I=(0,1)$、$V=H_0^1(I)$、$f=1$、状態と随伴の零 Dirichlet 境界条件を使用します。各演習で、必要な弱方程式を明示します。

### Level A：定義と符号を直接確認する

<a id="ex-inv18-a01"></a>
### INV18-A01 目的関数の残差が零のとき

- Level: A

$a=c=1$、$O(v)=\int_0^1v$、$d=1/12$、$\alpha=0$ とする。状態、残差、随伴状態、任意の方向 $h\in L^\infty$ に対する $Dj(1)[h]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[状態の直接解](../INV17/index.md#def-inv17-state-observation)は $u=x(1-x)/2$、$O(u)=1/12$ です。従って $r=O(u)-d=0$。随伴弱形式は $\int p'v'=0$（全 $v\in V$）なので $v=p$ を選べば $\|p\|_V^2=0$、従って $p=0$ です。[随伴勾配定理](#thm-inv18-adjoint-gradient)から $Dj(1)[h]=-\int hu'p'=0$ です。これが最小値0を達成していても、任意の他の係数との識別性は示していません。
<!-- solution-end -->

<a id="ex-inv18-a02"></a>
### INV18-A02 随伴右辺の作り方

- Level: A

$a=1$、$O(v)=\int_0^1xv$、$d=0$ とする。$r=O(S(1))$ を求め、随伴状態 $p$ の弱方程式と明示解を示せ。

<!-- solution-start -->
#### 詳細解答

$u=x(1-x)/2$ から

$$
r=\int_0^1\frac{x^2(1-x)}2\,dx
=\frac12\left(\frac13-\frac14\right)=\frac1{24}.
$$

[随伴状態の定義](#def-inv18-adjoint)で $g=x$ なので $\int p'v'=(1/24)\int xv$ です。$z(x)=(x-x^3)/6$ は $z(0)=z(1)=0$、$-z''=x$ を満たすため、部分積分で全 $v\in V$ に対して $\int z'v'=\int xv$ です。従って $p=z/24=(x-x^3)/144$ が随伴解です。強圧性による一意性も[状態定理](../INV17/index.md#thm-inv17-state-existence)と同じ議論で従います。
<!-- solution-end -->

<a id="ex-inv18-a03"></a>
### INV18-A03 定数係数で残差勾配を比較する

- Level: A

$a=c=2$、$O(v)=\int v$、$d=0$、$\alpha=0$ とする。$j(c)$ と $j'(c)$ を厳密式から求め、$Dj(2)[1]$ と一致することを示せ。

<!-- solution-start -->
#### 詳細解答

$G(c)=1/(12c)$ だから $j(c)=1/(288c^2)$、$j'(c)=-2/(288c^3)=-1/(144c^3)$。従って $j(2)=1/1152$、$j'(2)=-1/1152$ です。一方、$u'= (1-2x)/(2c)$、$p'=G(c)u'$ なので

$$
Dj(2)[1]=-\frac1{12c}\int_0^1\frac{(1-2x)^2}{4c^2}\,dx\bigg|_{c=2}
=-\frac1{48\cdot8}\cdot\frac13=-\frac1{1152}.
$$

よって[随伴勾配公式](#thm-inv18-adjoint-gradient)と厳密導関数が一致します。
<!-- solution-end -->

<a id="ex-inv18-a04"></a>
### INV18-A04 反射で観測が変わらない理由

- Level: A

$a_+(x)=1+\varepsilon(x-1/2)$、$a_-(x)=1-\varepsilon(x-1/2)$、$0<|\varepsilon|<1$ とする。$f=1$、$O(v)=\int_0^1v$ の下で、両係数の許容性と観測の一致を示せ。

<!-- solution-start -->
#### 詳細解答

区間上で $|x-\tfrac12|\le\tfrac12$ だから、両係数は有界であり、

$$
a_\pm(x)\ge1-\frac{|\varepsilon|}{2}>0
$$

です。従って[許容集合](../INV17/index.md#def-inv17-admissible-coefficients)に属します。

反射関係 $a_-(x)=a_+(1-x)$ を使い、$u_+=S(a_+)$ に対して $\widetilde u(x)=u_+(1-x)$ とおきます。この関数の端点トレースは零です。$y=1-x$ の置換を弱形式に施せば、任意の $v\in V$ に対して

$$
\int_0^1a_-\widetilde u'v'\,dx=\int_0^1v\,dx
$$

を得ます。[状態の唯一性](../INV17/index.md#thm-inv17-state-existence)より $S(a_-)=\widetilde u$ です。したがって、

$$
O(S(a_-))=\int_0^1u_+(1-x)\,dx
=\int_0^1u_+(y)\,dy=O(S(a_+)).
$$

両係数は異なるため、これは厳密な非一意性です。
<!-- solution-end -->

<a id="ex-inv18-a05"></a>
### INV18-A05 二乗罰則の二パラメータ方向微分

- Level: A

$a_{s,t}=1+s+tx$、$a_0=1$、$\alpha>0$ とする。罰則 $R(s,t)=\alpha\int_0^1(a_{s,t}-1)^2/2$ を求め、方向 $(p,q)$ への微分を計算せよ。

<!-- solution-start -->
#### 詳細解答

$(s+tx)^2=s^2+2stx+t^2x^2$ を積分し、$\int_0^1x=1/2$、$\int_0^1x^2=1/3$ から

$$
R(s,t)=\frac\alpha2\left(s^2+st+\frac{t^2}3\right).
$$

$(s,t)\mapsto(s+\tau p,t+\tau q)$ を代入して $\tau$ の一次係数を取ると

$$
DR(s,t)[p,q]
=\alpha\left(sp+\frac{sq+tp}2+\frac{tq}3\right).
$$

他方、[目的関数の罰則微分](#thm-inv18-adjoint-gradient)へ $h=p+qx$ を入れると $\alpha\int(s+tx)(p+qx)$ となり、同じ式です。基準 $(0,0)$ ではこの一次微分は零です。
<!-- solution-end -->

### Level B：随伴消去・検算・安定性

<a id="ex-inv18-b01"></a>
### INV18-B01 Lagrangian の三つの変分と境界条件

- Level: B

$m=1$、$g_1=1$、$\alpha=0$ とする。$\mathcal L(a,u,p)$ を書き、$u,p,a$ の各方向微分を導出し、状態・随伴・勾配の三式を導け。滑らかな場合の随伴境界項も示せ。

<!-- solution-start -->
#### 詳細解答

[定義](#def-inv18-lagrangian)から

$$
\mathcal L(a,u,p)=\frac12\left(\int_0^1u-d\right)^2
+\int_0^1fp-\int_0^1a u'p'.
$$

$u+\tau v$ を代入すると観測残差は $r+\tau\int v$ なので、$\tau$ の一次係数は $r\int v-\int av'p'$ です。$p+\tau v$ では $\int fv-\int au'v'$、$a+\tau h$ では $-\int hu'p'$ です。全方向で $D_p\mathcal L=0$ より $\int au'v'=\int fv$、$D_u\mathcal L=0$ より $\int ap'v'=r\int v$。後者に $v=w$、感度方程式に $v=p$ を入れれば $r\int w=-\int hu'p'$ となります。滑らかな $p$ での部分積分は $\int av'p'=[avp']_0^1-\int v(ap')'$ ですが、$v\in H_0^1$ の端点が零なので境界項は消えます。強形式は $-(ap')'=r$ です。
<!-- solution-end -->

<a id="ex-inv18-b02"></a>
### INV18-B02 中心重み付きセンサの随伴状態

- Level: B

$a=1$、$f=1$ とし、観測を $O_1(v)=\int v$、$O_2(v)=\int(x-1/2)v$、データを $(d_1,d_2)$ とする。随伴状態 $p$ を $r_1=O_1(u)-d_1$ と $r_2=O_2(u)-d_2$ で表示せよ。

<!-- solution-start -->
#### 詳細解答

$u=x(1-x)/2$ なので $O_1(u)=1/12$。$u(1-x)=u(x)$ なのに $x-1/2$ は反射で符号を変えるため、積分は $O_2(u)=0$ です。よって $r_1=1/12-d_1$、$r_2=-d_2$。$z_1=x(1-x)/2$ は $-z_1''=1$、$z_2=-x^3/6+x^2/4-x/12$ は $-z_2''=x-1/2$、両者は端点で0です。従って

$$
p(x)=r_1z_1(x)+r_2z_2(x)
$$

に対し $-p''=r_1+r_2(x-1/2)$ です。部分積分で $\int p'v'=r_1\int v+r_2\int(x-1/2)v$ が全 $v\in V$ について成立します。[随伴の唯一性](#def-inv18-adjoint)を与える強圧性からこれが求める随伴状態です。
<!-- solution-end -->

<a id="ex-inv18-b03"></a>
### INV18-B03 中心有限差分の二次誤差

- Level: B

$j(c)=1/(288c^2)$、$c=1$、$0<|t|\le1/2$ とする。中心有限差分 $D_t$ を求めて $j'(1)$ と比較し、$|D_t-j'(1)|\le(2/81)t^2$ を証明せよ。

<!-- solution-start -->
#### 詳細解答

直接の微分で $j'(1)=-1/144$ です。差の分子を通分すると

$$
\begin{aligned}
D_t&=\frac1{576t}\frac{(1-t)^2-(1+t)^2}{(1-t^2)^2}\\
&=\frac1{576t}\frac{-4t}{(1-t^2)^2}
=-\frac1{144(1-t^2)^2}.
\end{aligned}
$$

よって

$$
|D_t-j'(1)|=\frac{1-(1-t^2)^2}{144(1-t^2)^2}
=\frac{2t^2-t^4}{144(1-t^2)^2}.
$$

$|t|\le1/2$ なら $1-t^2\ge3/4$、分子は $2t^2$ 以下だから $|D_t-j'(1)|\le2t^2/(144\cdot9/16)=(2/81)t^2$ です。中心差分は $t$ の一次誤差ではなく二次誤差を持ち、[随伴勾配](#thm-inv18-adjoint-gradient)の符号も一致します。
<!-- solution-end -->

<a id="ex-inv18-b04"></a>
### INV18-B04 二センサで列フルランクになる理由

- Level: B

$a_{s,t}=1+s+tx$ とし、$O_1(v)=\int v$、$O_2(v)=\int(x-1/2)v$ とする。$(s,t)=(0,0)$ における $D\mathcal G$ の2列を求め、単一観測の場合と比較し、局所安定性に必要な仮定を述べよ。

<!-- solution-start -->
#### 詳細解答

[INV17 の感度方程式](../INV17/index.md#def-inv17-sensitivity-equation)で $h=1$ なら $w_s=-x(1-x)/2$、$h=x$ なら $w_t=x^3/3-x^2/4-x/12$ です。積分して $O_1(w_s)=-1/12$、$O_1(w_t)=-1/24$、$O_2(w_s)=0$。さらに

$$
O_2(w_t)=\frac1{15}-\frac1{16}-\frac1{36}
-\frac12\left(-\frac1{24}\right)
=-\frac1{360}.
$$

列を並べると $D\mathcal G(0,0)=\left(\begin{smallmatrix}-1/12&-1/24\\0&-1/360\end{smallmatrix}\right)$、行列式 $1/4320$ は非零です。単一観測なら $1\times2$ 行列なので核に方向 $(1,-2)$ が残ります。二観測では近傍での $C^1$ が必要ですが、[二観測の定理](#thm-inv18-two-sensor-identifiability)の証明で状態・感度解の連続性から確認しました。この条件の下で[INV10 のフルランク系](../INV10/index.md#cor-inv10-finite-full-rank)が局所二点安定性を与えます。無限次元の係数全体には結論を拡張できません。
<!-- solution-end -->

### Level C：最適化と識別の統合

<a id="ex-inv18-c01"></a>
### INV18-C01 二パラメータ PDE 逆問題の全経路

- Level: C

$a_{s,t}=1+s+tx$、$|s|+|t|<1/2$、$f=1$、$a_0=1$、$\alpha=1$ とする。観測は $O_1(v)=\int_0^1v$、$O_2(v)=\int_0^1(x-1/2)v$、データは $(0,0)$ とする。

1. $(0,0)$ の状態、観測残差、随伴状態を弱形式から求めよ。
2. Lagrangian を作り、$(s,t)$ に関する勾配を随伴法から計算せよ。
3. $s$ 方向の中心有限差分を厳密式で求め、勾配と二次誤差で一致することを示せ。
4. 単一観測 $O_1$ のみでは異なる係数が同じ観測を持つこと、二観測では基準点で局所安定性を得ることを区別して説明せよ。

<!-- solution-start -->
#### 詳細解答

**(1) 状態と随伴。** $a_{0,0}=1$ は一様正値なので[状態定理](../INV17/index.md#thm-inv17-state-existence)が適用でき、$u=x(1-x)/2$ が唯一の状態です。$\int u=1/12$、反射対称性により $\int(x-1/2)u=0$ なので残差は $(r_1,r_2)=(1/12,0)$。随伴弱形式は

$$
\int_0^1p'v'=\frac1{12}\int_0^1v\qquad(v\in V).
$$

ゆえに $p=u/12=x(1-x)/24$ です。両端点零かつ $-p''=1/12$ を確認し、弱形式と一意性で確定します。

**(2) Lagrangian と勾配。** [定義](#def-inv18-lagrangian)から

$$
\mathcal L(a,u,p)=\frac12\left[(O_1(u))^2+(O_2(u))^2\right]
+\frac12\int_0^1(a-1)^2+\int_0^1p-\int_0^1au'p'.
$$

方向 $(1,0)$ は係数方向 $h_s=1$、方向 $(0,1)$ は $h_t=x$ です。基準点では罰則の一次微分は $\int(a-1)h=0$ なので、

$$
\begin{aligned}
\partial_s j(0,0)&=-\int_0^1u'p'
=-\frac1{12}\int_0^1(u')^2
=-\frac1{12}\cdot\frac1{12}=-\frac1{144},\\
\partial_t j(0,0)&=-\int_0^1x u'p'
=-\frac1{12}\int_0^1x(\tfrac12-x)^2\,dx.
\end{aligned}
$$

後者の積分は $\int(x/4-x^2+x^3)dx=1/8-1/3+1/4=1/24$ なので $\partial_tj(0,0)=-1/288$ です。よって勾配は $(-1/144,-1/288)$ です。$u'=1/2-x$、$p'=u'/12$ を直接用いました。

**(3) 有限差分。** $t=0$ を固定して係数を $a=1+s$ とすると $u_s=x(1-x)/(2(1+s))$、観測は $(1/[12(1+s)],0)$ です。罰則 $\int (a-1)^2/2=s^2/2$ なので

$$
j(s,0)=\frac1{288(1+s)^2}+\frac{s^2}2.
$$

$0<|\varepsilon|\le1/2$ の中心差分では罰則の $\varepsilon^2/2$ が分子で打ち消し合い、

$$
\frac{j(\varepsilon,0)-j(-\varepsilon,0)}{2\varepsilon}
=-\frac1{144(1-\varepsilon^2)^2}
$$

です。[B03](#ex-inv18-b03) と同じ通分を使えば $-1/144$ との差の絶対値は $(2\varepsilon^2-\varepsilon^4)/(144(1-\varepsilon^2)^2)\le(2/81)\varepsilon^2$ となります。独立な厳密式と随伴勾配が一致しました。

**(4) 識別。** $0<|\varepsilon|<1$ として、異なる二係数

$$
a_\pm(x)=1\pm\varepsilon(x-\tfrac12)
$$

を取ります。反射で二つの状態が入れ替わるため、

$$
O_1(S(a_+))=O_1(S(a_-))
$$

となり、非線形観測について厳密な非一意性があります。

一方、[二観測の定理](#thm-inv18-two-sensor-identifiability)では $\mathcal G$ の基準微分が行列式 $1/4320\ne0$ の $2\times2$ 行列です。近傍での $C^1$ と合わせ、[局所二点安定性](../INV10/index.md#cor-inv10-finite-full-rank)が得られます。ただしこれは二パラメータ族の近傍の結論であり、係数空間 $L^\infty$ 全体の一意性を意味しません。
<!-- solution-end -->

## 6. ここまでの道筋と次への展望

- **PDE の解**：$a$ と $f$ の弱方程式を解き $u=S(a)$ を得る。
- **観測残差と目的関数**：$O(u)-d$ を二乗和で測り、必要なら係数罰則を加える。
- **随伴**：状態と同じ零境界条件で、残差が作る右辺を解いて $p$ を得る。
- **勾配**：$Dj(a)[h]=-\int hu'p'+\alpha\int(a-a_0)h$ を得る。異なる多数の方向 $h$ に対し随伴 PDE を解き直す必要はない。
- **識別**：観測の対称性による厳密な非一意性と、有限次元の複数観測での局所安定性を異なる論点として判定する。

一般の電気インピーダンス断層撮影・逆散乱・Full Waveform Inversion では、PDE の種類、境界条件、観測空間、正則性、随伴境界項が変わります。ここで得た弱形式・随伴消去の手順は出発点になりますが、そのまま一意性や収束の定理を移植することはできません。
