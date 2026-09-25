# OPT5 Lagrange 双対・Slater 条件・KKT

<!-- definition-example-audit: strict -->

OPT4 では共役関数を使って双対問題を作りました。本章では、有限個の凸不等式制約とアフィン等式制約を

$$
\min_{x\in\mathbb R^n} f(x)
\quad\text{制約}\quad
g_i(x)\le0\ (i=1,\dots,m),\qquad Ax=b
$$

という標準形にそろえ、**Lagrangian → 双対関数 → 弱双対性 → Slater 条件 → 強双対性 → KKT 条件**を一つの流れとして閉じます。

> **この章の停止線**
>
> 接錐と制約の一次近似から KKT 乗数の存在を導く幾何学的議論、LICQ・MFCQ は OPT6 の担当です。本章では凸問題に対する Slater 条件を使い、KKT を必要十分条件として使えるところまで進みます。

---

## 1. なぜ制約を目的関数へ移すのか

実行可能点だけを直接探す代わりに、制約違反へ「価格」を付けます。不等式制約 $g_i(x)\le0$ の価格を $\lambda_i\ge0$、等式制約 $Ax=b$ の価格を $\nu\in\mathbb R^r$ とすると、

$$
f(x)+\sum_{i=1}^m\lambda_i g_i(x)+\nu^{\mathsf T}(Ax-b)
$$

が現れます。実行可能な $x$ では $\lambda_i g_i(x)\le0$、等式項は0なので、この量を $x$ について最小化すれば主問題の最適値に対する下界が得られます。

この「制約に価格を付けて下界を作る」操作が Lagrange 双対です。

---

## 2. Lagrangian と双対関数

<a id="def-opt5-lagrangian"></a>
<!-- formal-statement-start -->
> **定義（Lagrangian）**  
> 関数 $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$、行列 $A\in\mathbb R^{r\times n}$、$b\in\mathbb R^r$ に対する制約付き最小化問題
>
$$
\min_x f(x)
\quad\text{制約}\quad
g_i(x)\le0\ (i=1,\dots,m),\qquad Ax=b
$$
>
> を考える。$\lambda\in\mathbb R_+^m$、$\nu\in\mathbb R^r$ に対して
>
$$
L(x,\lambda,\nu)
=
f(x)+\sum_{i=1}^m\lambda_i g_i(x)+\nu^{\mathsf T}(Ax-b)
$$
>
> をこの問題の **Lagrangian** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-lagrangian -->
**定義の確認**：境界で止まる二次関数

$$
\min_x (x-2)^2
\quad\text{制約}\quad x\le1
$$

では $g(x)=x-1$ と置くので

$$
L(x,\lambda)=(x-2)^2+\lambda(x-1),\qquad\lambda\ge0.
$$

不等式を $x\le1$ のまま眺めるのではなく、$g(x)\le0$ に統一した符号が $\lambda\ge0$ と組になっていることが重要です。
<!-- definition-example-end -->

<a id="def-opt5-dual-function"></a>
<!-- formal-statement-start -->
> **定義（双対関数）**  
> 上の形の制約付き問題に対し、$\lambda\ge0$、$\nu\in\mathbb R^r$ について
>
$$
q(\lambda,\nu)
=
\inf_{x\in\mathbb R^n}
\left[
f(x)+\sum_{i=1}^m\lambda_i g_i(x)+\nu^{\mathsf T}(Ax-b)
\right]
$$
>
> を **双対関数**という。下限が無限遠へ下がる場合は $q(\lambda,\nu)=-\infty$ とする。
<!-- formal-statement-end -->

<a id="def-opt5-primal-dual"></a>
<!-- formal-statement-start -->
> **定義（主問題・Lagrange 双対問題）**  
> 主問題の最適値を
>
$$
p^*
=
\inf\{f(x):g_i(x)\le0\ (i=1,\dots,m),\ Ax=b\}
$$
>
> とする。対応する Lagrange 双対問題は
>
$$
d^*
=
\sup_{\lambda\ge0,\,\nu\in\mathbb R^r}
q(\lambda,\nu)
$$
>
> であり、$d^*$ を双対最適値という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-dual-function, def-opt5-primal-dual, def-opt5-strong-duality -->
**定義の確認**：同じ1変数問題で双対まで計算する

上の例では

$$
\frac{\partial L}{\partial x}=2(x-2)+\lambda=0
$$

より $x=2-\lambda/2$ で下限を達成します。代入すると

$$
q(\lambda)=\lambda-\frac{\lambda^2}{4},\qquad\lambda\ge0.
$$

双対問題はこの凹二次関数の最大化で、$\lambda^*=2$、$d^*=1$。主問題も $x^*=1$、$p^*=1$ なので

$$
p^*-d^*=0
$$

です。従って、この例では強双対性を定義どおり直接確認できます。
<!-- definition-example-end -->

<a id="thm-opt5-dual-function-concavity"></a>
<!-- formal-statement-start -->
> **定理（双対関数の凹性）**  
> 関数 $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ と行列 $A\in\mathbb R^{r\times n}$、$b\in\mathbb R^r$ から作る Lagrangian の双対関数
>
$$
q(\lambda,\nu)=\inf_x L(x,\lambda,\nu)
$$
>
> は $\lambda\ge0$、$\nu\in\mathbb R^r$ の凸な領域上で凹関数である。この結論には $f,g_i$ の凸性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ を固定すると $L(x,\lambda,\nu)$ は $(\lambda,\nu)$ のアフィン関数です。双対関数は、それらアフィン関数の点ごとの下限です。

<!-- proof-start -->
### 証明

$z_j=(\lambda^{(j)},\nu^{(j)})$ $(j=1,2)$ を双対実行可能とし、$0\le\theta\le1$ とします。$L$ は乗数についてアフィンなので

$$
L(x,\theta z_1+(1-\theta)z_2)
=
\theta L(x,z_1)+(1-\theta)L(x,z_2).
$$

従って

$$
\begin{aligned}
q(\theta z_1+(1-\theta)z_2)
&=
\inf_x\{
\theta L(x,z_1)+(1-\theta)L(x,z_2)
\}\\
&\ge
\theta\inf_x L(x,z_1)
+(1-\theta)\inf_x L(x,z_2)\\
&=
\theta q(z_1)+(1-\theta)q(z_2).
\end{aligned}
$$

よって $q$ は凹です。$\square$
<!-- proof-end -->

ここでの凹性は主問題の凸性とは別物です。**双対問題が最大化問題として自然に整うのは、Lagrangian が乗数に関してアフィンだから**です。

---

## 3. 弱双対性は凸性を必要としない

<a id="thm-opt5-weak-duality"></a>
<!-- formal-statement-start -->
> **定理（Lagrange 双対の弱双対性）**  
> 関数 $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ とアフィン等式制約 $Ax=b$ を持つ最小化問題を考える。$x$ が
>
$$
g_i(x)\le0\quad(i=1,\dots,m),\qquad Ax=b
$$
>
> を満たし、$(\lambda,\nu)$ が $\lambda\ge0$ を満たすなら
>
$$
q(\lambda,\nu)\le f(x).
$$
>
> 従って主最適値 $p^*$ と双対最適値 $d^*$ の間に
>
$$
\boxed{d^*\le p^*}
$$
>
> が成り立つ。この結論には $f,g_i$ の凸性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

双対関数は $L$ の全 $x$ にわたる下限なので $q\le L(x,\lambda,\nu)$。一方、実行可能点では $g_i(x)\le0$ と $\lambda_i\ge0$ により Lagrangian は $f(x)$ 以下です。

<!-- proof-start -->
### 証明

$x$ が実行可能なら $g_i(x)\le0$、$Ax=b$ です。従って

$$
L(x,\lambda,\nu)
=
f(x)+\sum_i\lambda_i g_i(x)
\le f(x).
$$

また双対関数の定義から

$$
q(\lambda,\nu)
=
\inf_z L(z,\lambda,\nu)
\le L(x,\lambda,\nu).
$$

よって $q(\lambda,\nu)\le f(x)$。任意の主実行可能 $x$ と双対実行可能 $(\lambda,\nu)$ について成立するので、左辺の上限と右辺の下限を取れば $d^*\le p^*$ です。$\square$
<!-- proof-end -->

<a id="def-opt5-strong-duality"></a>
<!-- formal-statement-start -->
> **定義（双対ギャップ・強双対性）**  
> $p^*,d^*\in\mathbb R$ のとき、非負量
>
$$
p^*-d^*
$$
>
> を **双対ギャップ**という。$p^*=d^*$、すなわち双対ギャップが0であることを **強双対性**という。
<!-- formal-statement-end -->

弱双対性は常に下界を与えますが、強双対性や双対最適解の存在は自動ではありません。そのための代表的な内部点条件が Slater 条件です。

---

## 4. Slater 条件：強双対性を支える内部点

凸問題でも、強双対性を無条件に期待してはいけません。制約集合が退化していると、摂動した問題を原点で有限の傾きによって支えられず、双対乗数を取り出せないことがあります。

<a id="def-opt5-slater"></a>
<!-- formal-statement-start -->
> **定義（Slater 条件）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ を凸関数、等式制約を $Ax=b$ とする凸最適化問題を考える。ある $\bar x\in\mathbb R^n$ が存在して
>
$$
g_i(\bar x)<0\qquad(i=1,\dots,m),\qquad A\bar x=b
$$
>
> を満たすとき、この問題は **Slater 条件**を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-slater -->
**定義の確認**：厳密実行可能点を実際に入れる

$$
\min_x x^2
\quad\text{制約}\quad x-1\le0
$$

では $\bar x=0$ と取ると

$$
g(0)=-1<0.
$$

従って Slater 条件を満たします。境界点 $x=1$ が存在するだけではなく、制約を厳密に満たす点があることを確認しています。
<!-- definition-example-end -->

OPT4 のように拡張実数値関数で共通の実効定義域を明示する場合は、Slater 点をその共通実効定義域の相対内部に取る相対内部版を使います。本章の中核定理は、Lagrangian の積 $\lambda_i g_i(x)$ を曖昧にしないため、まず有限値凸関数で証明します。

<a id="thm-opt5-slater-strong-duality"></a>
<!-- formal-statement-start -->
> **定理（Slater 条件下の強双対性）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ を凸関数、$A\in\mathbb R^{r\times n}$、$b\in\mathbb R^r$ とする。主最適値 $p^*$ が有限で、Slater 条件を満たすなら、ある $\lambda^*\ge0$、$\nu^*\in\mathbb R^r$ が存在して
>
$$
q(\lambda^*,\nu^*)=p^*.
$$
>
> 従って双対最適解が存在し、
>
$$
\boxed{d^*=p^*}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

制約の右辺を少し動かした **摂動値関数**を作ります。Slater 点があると、摂動量 $(u,v)=(0,0)$ はその実効定義域の相対内部に入ります。そこで凸関数を支える劣勾配を取り、その符号を読み替えると $\lambda\ge0$ と自由な等式乗数 $\nu$ が得られます。

今回重要なのは

$$
\boxed{
\text{Slater}
\Longrightarrow
0\in\operatorname{ri}(\operatorname{dom}\varphi)
\Longrightarrow
\text{有限の支持傾き}
\Longrightarrow
\text{双対最適乗数}
}
$$

という機構です。

<!-- proof-start -->
### 証明

#### 1. 摂動値関数を作る

$W=\operatorname{range}A\subset\mathbb R^r$ とし、$(u,v)\in\mathbb R^m\times W$ に対して

$$
\varphi(u,v)
=
\inf\left\{
f(x):
g_i(x)\le u_i\ (i=1,\dots,m),\ 
Ax-b=v
\right\}
$$

と定めます。特に

$$
\varphi(0,0)=p^*\in\mathbb R.
$$

$\varphi$ は凸です。実際、$(u^{(j)},v^{(j)})$ $(j=1,2)$ で $\varphi$ が有限の場合、任意の $\varepsilon>0$ に対して実行可能な $x_j$ を

$$
f(x_j)
\le
\varphi(u^{(j)},v^{(j)})+\varepsilon
$$

となるように選べます。$0\le\theta\le1$ とし $x_\theta=\theta x_1+(1-\theta)x_2$ と置くと、各 $g_i$ と $f$ の凸性および $A$ の線形性から

$$
g_i(x_\theta)
\le
\theta u_i^{(1)}+(1-\theta)u_i^{(2)},
$$

$$
Ax_\theta-b
=
\theta v^{(1)}+(1-\theta)v^{(2)},
$$

$$
f(x_\theta)
\le
\theta\varphi(u^{(1)},v^{(1)})
+(1-\theta)\varphi(u^{(2)},v^{(2)})
+\varepsilon.
$$

$\varepsilon\downarrow0$ とすれば凸性が従います。片方の値が $-\infty$ の場合も、任意に小さい近似値を選ぶ同じ議論で扱えます。

#### 2. Slater 条件が原点を相対内部へ入れる

Slater 点を $\bar x$ とします。不等式が一つ以上ある場合

$$
\eta
=
\min_{1\le i\le m}\{-g_i(\bar x)\}
>0
$$

と置きます。

有限値凸関数は有限次元で局所連続です。これは [有限値凸関数の局所 Lipschitz 連続性](../OPT3/index.md#lem-opt3-finite-convex-lipschitz) の内容です。従って $\bar x$ の十分小さい近傍では

$$
g_i(x)<-\frac{\eta}{2}
\qquad(i=1,\dots,m)
$$

が同時に成り立ちます。

有限次元線形写像 $A:\mathbb R^n\to W$ には、$W$ 上の線形な右逆写像 $R:W\to\mathbb R^n$ を一つ取れます。すなわち

$$
ARv=v
\qquad(v\in W).
$$

$v$ が十分小さければ $\bar x+Rv$ は上の近傍に入ります。さらに $\|u\|_\infty<\eta/4$ なら

$$
g_i(\bar x+Rv)
<
-\frac\eta2
<
-\frac\eta4
<
u_i
$$

です。また $A\bar x=b$ なので

$$
A(\bar x+Rv)-b=v.
$$

従って $(0,0)$ の $\mathbb R^m\times W$ におけるある近傍が $\operatorname{dom}\varphi$ に含まれます。また定義から $\operatorname{dom}\varphi\subset\mathbb R^m\times W$ なので

$$
\operatorname{aff}(\operatorname{dom}\varphi)=\mathbb R^m\times W.
$$

従って

$$
(0,0)
\in
\operatorname{ri}(\operatorname{dom}\varphi).
$$

不等式制約がない場合は $u$ 座標を省けば同じ議論です。

さらに $\varphi(0,0)=p^*$ は有限です。もしある $z\in\operatorname{dom}\varphi$ で $\varphi(z)=-\infty$ なら、原点が相対内部なので十分小さい $\alpha>0$ について $-\alpha z\in\operatorname{dom}\varphi$ です。そして

$$
0
=
\frac{\alpha}{1+\alpha}z
+
\frac{1}{1+\alpha}(-\alpha z)
$$

に凸性を使うと $\varphi(0,0)=-\infty$ となり矛盾します。従って $\varphi$ は真凸関数です。

#### 3. 原点で有限の支持傾きを作る

ここでは OPT3 の劣勾配存在証明と同じ局所機構を、$\varphi$ に対して使います。$E=\operatorname{aff}(\operatorname{dom}\varphi)=\mathbb R^m\times W$ とし、$E$ を有限次元 Euclid 空間と同一視します。原点は相対内部なので、$E$ の原点周りの小さい立方体 $Q$ を

$$
Q\subset\operatorname{dom}\varphi
$$

となるように取れます。

$Q$ の有限個の頂点で $\varphi$ は有限です。凸性により $Q$ 上で上から有界になり、さらに原点の反対側の点との中点不等式を使えば、より小さい立方体上で下からも有界になります。[有限値凸関数の局所 Lipschitz 連続性](../OPT3/index.md#lem-opt3-finite-convex-lipschitz) の証明と同じ局所計算により、$\varphi$ は原点の相対近傍で Lipschitz 連続です。

従って $d\in E$ に対する方向微分

$$
\psi(d)
=
\varphi'(0;d)
=
\lim_{t\downarrow0}
\frac{\varphi(td)-\varphi(0)}{t}
$$

は有限値です。凸性から、OPT3 の[方向微分の支持関数表示](../OPT3/index.md#thm-opt3-directional-support)の証明と同じ計算で、$\psi$ は連続な劣線形関数になります。

そこで閉凸錐

$$
K=\operatorname{epi}\psi
=
\{(d,s)\in E\times\mathbb R:s\ge\psi(d)\}
$$

を考えます。$(0,-1)\notin K$ なので、[閉凸錐の分離](../OPT2/index.md#thm-opt2-cone-separation)から、ある $(a,\beta)\ne0$ が存在して

$$
a^{\mathsf T}d+\beta s\le0
\qquad((d,s)\in K),
$$

かつ

$$
-\beta>0
$$

となります。従って $\beta<0$ で、$-\beta$ で割れば $\beta=-1$ とできます。$s=\psi(d)$ を代入すると

$$
a^{\mathsf T}d
\le
\psi(d).
$$

一方、凸関数の右方向微分は割線の傾き以下なので、任意の $z\in\operatorname{dom}\varphi$ に対して

$$
\psi(z)
\le
\varphi(z)-\varphi(0).
$$

したがって

$$
\varphi(z)
\ge
p^*+a^{\mathsf T}z.
$$

つまり $a$ は $\varphi$ の原点における劣勾配です。

#### 4. 支持傾きを Lagrange 乗数へ読む

$a=(\alpha,\gamma)\in\mathbb R^m\times W$ と分けます。元の制約を緩めて $u_i$ を正方向へ増やすと実行可能集合は広がるので

$$
\varphi(te_i,0)
\le
\varphi(0,0)=p^*
\qquad(t>0).
$$

一方、劣勾配不等式から

$$
\varphi(te_i,0)
\ge
p^*+t\alpha_i.
$$

従って $\alpha_i\le0$ です。そこで

$$
\lambda^*=-\alpha\ge0,
\qquad
\nu^*=-\gamma
$$

と置きます。$\gamma\in W\subset\mathbb R^r$ と見れば $\nu^*$ は通常の等式乗数です。

任意の $x\in\mathbb R^n$ に対し、$x$ 自身は摂動量

$$
u=g(x),
\qquad
v=Ax-b
$$

に対して実行可能なので

$$
\varphi(g(x),Ax-b)
\le
f(x).
$$

劣勾配不等式と合わせると

$$
\begin{aligned}
f(x)
&\ge
\varphi(g(x),Ax-b)\\
&\ge
p^*
+\alpha^{\mathsf T}g(x)
+\gamma^{\mathsf T}(Ax-b).
\end{aligned}
$$

従って

$$
f(x)
+
(\lambda^*)^{\mathsf T}g(x)
+
(\nu^*)^{\mathsf T}(Ax-b)
\ge
p^*
\qquad(\forall x).
$$

左辺の $x$ に関する下限を取れば

$$
q(\lambda^*,\nu^*)\ge p^*.
$$

しかし[弱双対性](#thm-opt5-weak-duality)から常に

$$
q(\lambda^*,\nu^*)\le p^*.
$$

よって

$$
q(\lambda^*,\nu^*)=p^*=d^*.
$$

$(\lambda^*,\nu^*)$ は双対最適解です。$\square$
<!-- proof-end -->

> **仮定が働いた場所**  
> 凸性は摂動値関数 $\varphi$ を凸にしました。Slater の厳密不等式は $(0,0)$ を $\operatorname{dom}\varphi$ の相対内部へ押し込み、そこで有限の支持傾きを取れるようにしました。その不等式座標の傾きが非正であるため、符号を反転したものが $\lambda\ge0$ になります。

---

## 5. KKT 条件

以下では $f,g_i$ が微分可能な有限値凸関数の場合をまず扱います。非滑らかな場合は、後で勾配を OPT3 の劣微分に置き換えます。

<a id="thm-opt5-kkt"></a>
<!-- formal-statement-start -->
> **定理（凸問題の KKT 条件）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ を微分可能な凸関数、$A\in\mathbb R^{r\times n}$、$b\in\mathbb R^r$ とする。実行可能点 $x^*$ と乗数 $\lambda^*\in\mathbb R_+^m$、$\nu^*\in\mathbb R^r$ が
>
> 1. **主実行可能性**
$$
   g_i(x^*)\le0,\qquad Ax^*=b,
$$
> 2. **双対実行可能性**
$$
   \lambda_i^*\ge0,
$$
> 3. **停留条件**
$$
   \nabla f(x^*)+\sum_i\lambda_i^*\nabla g_i(x^*)+A^{\mathsf T}\nu^*=0,
$$
> 4. **相補性**
$$
   \lambda_i^*g_i(x^*)=0\qquad(i=1,\dots,m)
$$
>
> を満たすなら、$x^*$ は主問題の大域最適解である。逆に、問題が Slater 条件を満たすなら、任意の主最適解 $x^*$ に対してこの4条件を満たす $\lambda^*,\nu^*$ が存在する。従って Slater 条件のもとでは、主最適性と KKT 条件は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

**十分性には Slater 条件は要りません。** 停留条件と凸性から $x^*$ は Lagrangian の大域最小点になり、相補性によってその最小値が $f(x^*)$ と一致します。これが弱双対性の下界に一致するため、$x^*$ は主最適です。

Slater 条件が必要なのは逆向きです。主最適解から有限の双対最適乗数を取り出すために、前節の強双対性を使います。

<!-- proof-start -->
### 証明

まず4条件を満たす $(x^*,\lambda^*,\nu^*)$ があるとします。$L(\cdot,\lambda^*,\nu^*)$ は凸で、停留条件から

$$
\nabla_xL(x^*,\lambda^*,\nu^*)=0.
$$

[微分可能凸関数の一次最適性条件](../OPT1/index.md#thm-opt1-first-order-convexity)より、$x^*$ は $L(\cdot,\lambda^*,\nu^*)$ の大域最小点です。従って

$$
q(\lambda^*,\nu^*)
=
L(x^*,\lambda^*,\nu^*).
$$

主実行可能性と相補性から

$$
L(x^*,\lambda^*,\nu^*)
=
f(x^*).
$$

よって

$$
q(\lambda^*,\nu^*)=f(x^*).
$$

[弱双対性](#thm-opt5-weak-duality)により、任意の主実行可能点 $x$ について

$$
q(\lambda^*,\nu^*)\le f(x)
$$

なので $f(x^*)\le f(x)$。従って $x^*$ は主最適解です。この向きでは Slater 条件を使っていません。

逆に問題が Slater 条件を満たし、$x^*$ が主最適解だとします。[Slater 条件下の強双対性](#thm-opt5-slater-strong-duality)により双対最適解 $(\lambda^*,\nu^*)$ が存在し、

$$
p^*
=
q(\lambda^*,\nu^*)
=
f(x^*)
$$

です。主実行可能性から

$$
L(x^*,\lambda^*,\nu^*)
=
f(x^*)+\sum_i\lambda_i^*g_i(x^*)
\le
f(x^*)=p^*.
$$

一方 $q$ は $L$ の下限なので

$$
p^*
=
q(\lambda^*,\nu^*)
\le
L(x^*,\lambda^*,\nu^*).
$$

従って全て等号で、

$$
\sum_i\lambda_i^*g_i(x^*)=0.
$$

各項は $\lambda_i^*\ge0$、$g_i(x^*)\le0$ により非正なので

$$
\lambda_i^*g_i(x^*)=0
\qquad(i=1,\dots,m).
$$

また

$$
q(\lambda^*,\nu^*)
=
L(x^*,\lambda^*,\nu^*)
$$

なので $x^*$ は $L(\cdot,\lambda^*,\nu^*)$ の下限を達成しています。$L$ は微分可能な凸関数だから

$$
\nabla_xL(x^*,\lambda^*,\nu^*)=0,
$$

すなわち停留条件が得られます。主実行可能性は $x^*$ の仮定から、双対実行可能性は $\lambda^*\ge0$ から成立します。$\square$
<!-- proof-end -->

### 5.1 非滑らかな凸問題

$f,g_i$ が有限値凸関数だが微分可能とは限らない場合、OPT3 の[有限値凸関数の劣微分和則](../OPT3/index.md#thm-opt3-sum-rule)を使えるので、停留条件は

$$
0\in
\partial f(x^*)
+
\sum_i\lambda_i^*\partial g_i(x^*)
+
A^{\mathsf T}\nu^*
$$

と書けます。これは「適当な $p_0\in\partial f(x^*)$ と $p_i\in\partial g_i(x^*)$ を選んで

$$
p_0+\sum_i\lambda_i^*p_i+A^{\mathsf T}\nu^*=0
$$

とできる」という意味です。拡張実数値関数まで一般化すると、劣微分和則そのものに相対内部型の制約想定が必要になります。

---

## 6. 相補性は「効いていない制約の価格は0」

<a id="def-opt5-active-constraint"></a>
<!-- formal-statement-start -->
> **定義（活性制約）**  
> 不等式制約 $g_i(x)\le0$ が実行可能点 $x$ で
>
$$
g_i(x)=0
$$
>
> を満たすとき、その制約を $x$ における **活性制約**という。$g_i(x)<0$ のときは非活性という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-active-constraint -->
**定義の確認**：二つの上限制約

$x^*=1$ に対して

$$
g_1(x)=x-1,\qquad g_2(x)=x-3
$$

なら $g_1(1)=0$ なので第1制約は活性、$g_2(1)=-2<0$ なので第2制約は非活性です。相補性から第2制約に対応する最適乗数は必ず $\lambda_2^*=0$ です。
<!-- definition-example-end -->

相補性

$$
\lambda_i^*g_i(x^*)=0
$$

は、$g_i(x^*)<0$ なら $\lambda_i^*=0$ を意味します。逆に $\lambda_i^*>0$ なら必ず $g_i(x^*)=0$ です。ただし **活性だから乗数が必ず正**とは限りません。活性制約でも $\lambda_i^*=0$ はあり得ます。

---

## 7. KKT を実際に解く

$$
\min_x (x-2)^2
\quad\text{制約}\quad x\le1
$$

を再び考えます。Lagrangian は

$$
L(x,\lambda)=(x-2)^2+\lambda(x-1).
$$

[KKT 条件](#thm-opt5-kkt)は

$$
x-1\le0,\qquad \lambda\ge0,
$$

$$
2(x-2)+\lambda=0,
$$

$$
\lambda(x-1)=0.
$$

もし $\lambda=0$ なら停留条件から $x=2$ となり主実行可能性に反します。従って $\lambda>0$ で、相補性から $x=1$。停留条件より $\lambda=2$ です。

$$
\boxed{x^*=1,\qquad\lambda^*=2}.
$$

この例では凸性と KKT 4条件だけで $x^*=1$ の大域最適性が保証されます。さらに Slater 点 $x=0$ があるので、逆向きに「主最適解なら KKT 乗数を持つ」という必要性も保証されます。

---

## 8. Slater を失うと何が壊れるか

$$
\min_x x
\quad\text{制約}\quad x^2\le0
$$

を考えます。実行可能点は $x^*=0$ だけなので、これは最適解で

$$
p^*=0
$$

です。しかし $g(x)=x^2$ に対して $g(x)<0$ となる点は存在せず、Slater 条件は失敗します。

KKT の停留条件は

$$
1+\lambda\,2x^*=1=0
$$

を要求するので、どんな有限の $\lambda\ge0$ でも満たせません。

この例では、さらに双対問題を直接見ると何が失われたかがはっきりします。Lagrangian は

$$
L(x,\lambda)=x+\lambda x^2.
$$

$\lambda=0$ なら $q(0)=\inf_x x=-\infty$。$\lambda>0$ なら平方完成して

$$
x+\lambda x^2
=
\lambda\left(x+\frac{1}{2\lambda}\right)^2
-
\frac{1}{4\lambda},
$$

従って

$$
q(\lambda)=-\frac{1}{4\lambda}.
$$

したがって

$$
d^*
=
\sup_{\lambda\ge0}q(\lambda)
=
0
=
p^*,
$$

ですが、有限の $\lambda$ では $q(\lambda)<0$ なので双対最適値は達成されません。

つまりこの例は

$$
\boxed{
\text{Slater 失敗}
\quad\text{でも}\quad
p^*=d^*
}
$$

であり、Slater 条件が強双対性の**必要条件ではない**ことも示します。一方で失われたのは **有限の双対最適乗数の存在**であり、そのため KKT 必要条件も成立しません。

OPT6 では、この現象を接錐と制約の一次近似が作る錐のずれとして詳しく見ます。

---

## 9. OPT4 の Fenchel 双対との接続

制約 $g_i(x)\le0$ を

$$
G(x)=(g_1(x),\dots,g_m(x))
$$

とまとめ、非正直交象限

$$
C=\mathbb R_-^m
$$

への標示関数 $\delta_C$ を使うと、不等式制約は

$$
\delta_C(G(x))
$$

へ吸収できます。

OPT4 の[標示関数と支持関数の関係](../OPT4/index.md#def-opt4-support-function)から

$$
\delta_C^*=\sigma_C.
$$

$C=\mathbb R_-^m$ では

$$
\sigma_C(\lambda)
=
\begin{cases}
0,&\lambda\ge0,\\
+\infty,&\text{それ以外},
\end{cases}
$$

です。実際、$\lambda\ge0$ なら $\lambda^{\mathsf T}z\le0$ $(z\le0)$ で上限は0、負の成分を持つ $\lambda$ なら対応する $z_i\to-\infty$ によって上限は $+\infty$ になります。

$\delta_C$ は閉真凸関数なので [Fenchel–Moreau の定理](../OPT4/index.md#thm-opt4-fenchel-moreau)から

$$
\delta_C(z)
=
\sup_{\lambda\ge0}
\lambda^{\mathsf T}z.
$$

従って

$$
f(x)+\delta_C(G(x))
=
\sup_{\lambda\ge0}
\left\{
f(x)+\lambda^{\mathsf T}G(x)
\right\}.
$$

等式制約も同様に

$$
\delta_{\{b\}}(Ax)
=
\sup_{\nu\in\mathbb R^r}
\nu^{\mathsf T}(Ax-b)
$$

と書けます。二つを合わせると

$$
L(x,\lambda,\nu)
=
f(x)
+\lambda^{\mathsf T}G(x)
+\nu^{\mathsf T}(Ax-b)
$$

が現れます。

したがって Fenchel 双対と Lagrange 双対は別々の暗記項目ではなく、

$$
\boxed{
\text{制約を標示関数で表す}
\Longrightarrow
\text{共役表示から Lagrange 乗数が現れる}
}
$$

という同じ凸双対性の二つの表現です。

---

## 10. 演習 Level A

### OPT5-A01 Lagrangian を作る

- Level: A
- 目安時間: 10分

$$
\min_{x,y} x^2+y^2
$$

制約

$$
x+y\ge1,\qquad x-y=0
$$

について、不等式を $g\le0$ に直して Lagrangian を書け。

<!-- solution-start -->
#### 詳細解答

不等式は

$$
g(x,y)=1-x-y\le0
$$

と書く。乗数を $\lambda\ge0$、等式制約の乗数を $\nu\in\mathbb R$ とすると

$$
\boxed{
L(x,y,\lambda,\nu)
=
x^2+y^2+\lambda(1-x-y)+\nu(x-y)
}.
$$

$\lambda$ にだけ符号制約があり、$\nu$ は自由である点が重要です。
<!-- solution-end -->

### OPT5-A02 双対関数を計算する

- Level: A
- 目安時間: 12分

$$
\min_x \frac12x^2
\quad\text{制約}\quad x\ge1
$$

の双対関数と双対問題を求めよ。

<!-- solution-start -->
#### 詳細解答

$g(x)=1-x\le0$ と置くと

$$
L(x,\lambda)=\frac12x^2+\lambda(1-x),\qquad\lambda\ge0.
$$

$x$ について微分すると $x-\lambda=0$ なので $x=\lambda$ で最小化され、

$$
q(\lambda)=\lambda-\frac12\lambda^2.
$$

従って双対問題は

$$
\boxed{
\max_{\lambda\ge0}
\left(\lambda-\frac12\lambda^2\right)
}.
$$

最大化点は $\lambda^*=1$、双対最適値は $1/2$ です。また $q''(\lambda)=-1<0$ なので、この具体例でも双対関数の凹性を確認できます。
<!-- solution-end -->

### OPT5-A03 KKT で境界解を求める

- Level: A
- 目安時間: 12分

$$
\min_x (x+1)^2
\quad\text{制約}\quad x\ge0
$$

を [KKT 条件](#thm-opt5-kkt)から解け。

<!-- solution-start -->
#### 詳細解答

$g(x)=-x\le0$ とすると

$$
L(x,\lambda)=(x+1)^2-\lambda x.
$$

KKT 条件は

$$
x\ge0,\quad\lambda\ge0,\quad
2(x+1)-\lambda=0,\quad\lambda x=0.
$$

$\lambda=0$ なら $x=-1$ となり実行不能なので、$x=0$。停留条件から $\lambda=2$。従って

$$
\boxed{x^*=0,\qquad\lambda^*=2}.
$$
<!-- solution-end -->

### OPT5-A04 活性制約と相補性

- Level: A
- 目安時間: 10分

ある KKT 点 $x^*$ で $g_1(x^*)=-2$、$g_2(x^*)=0$ とする。対応する乗数 $\lambda_1^*,\lambda_2^*$ について相補性から必ず言えることを述べよ。

<!-- solution-start -->
#### 詳細解答

相補性は

$$
\lambda_i^*g_i(x^*)=0
$$

です。$g_1(x^*)=-2\ne0$ なので

$$
\boxed{\lambda_1^*=0}.
$$

一方 $g_2(x^*)=0$ では積は $\lambda_2^*$ の値によらず0なので、相補性だけから $\lambda_2^*>0$ とは言えません。双対実行可能性から言えるのは

$$
\boxed{\lambda_2^*\ge0}
$$

までです。
<!-- solution-end -->

---

## 11. 演習 Level B

### OPT5-B01 弱双対性を定義から証明する

- Level: B
- 目安時間: 15分

主実行可能点 $x$ と双対実行可能点 $(\lambda,\nu)$ に対して $q(\lambda,\nu)\le f(x)$ を示し、$d^*\le p^*$ を導け。

<!-- solution-start -->
#### 詳細解答

双対関数の定義から

$$
q(\lambda,\nu)=\inf_zL(z,\lambda,\nu)\le L(x,\lambda,\nu).
$$

$x$ は実行可能なので $Ax=b$、$g_i(x)\le0$。また $\lambda_i\ge0$ だから

$$
L(x,\lambda,\nu)
=
f(x)+\sum_i\lambda_i g_i(x)
\le f(x).
$$

従って $q(\lambda,\nu)\le f(x)$。これは任意の実行可能点について成立するので、双対側で上限、主問題側で下限を取って

$$
\boxed{d^*\le p^*}.
$$
<!-- solution-end -->

### OPT5-B02 二変数問題を KKT で解く

- Level: B
- 目安時間: 20分

$$
\min_{x,y}\frac12(x^2+y^2)
\quad\text{制約}\quad x+y\ge2
$$

を [KKT 条件](#thm-opt5-kkt)から解き、乗数も求めよ。

<!-- solution-start -->
#### 詳細解答

$g(x,y)=2-x-y\le0$ と置くと

$$
L=\frac12(x^2+y^2)+\lambda(2-x-y).
$$

停留条件は

$$
x-\lambda=0,\qquad y-\lambda=0,
$$

よって $x=y=\lambda$。主実行可能性は $2-2\lambda\le0$、すなわち $\lambda\ge1$。相補性は

$$
\lambda(2-2\lambda)=0.
$$

$\lambda\ge1$ なので $\lambda=0$ は不可能、従って $\lambda=1$。したがって

$$
\boxed{x^*=y^*=1,\qquad\lambda^*=1}.
$$

目的関数と制約関数は凸なので、この KKT 点は大域最適です。さらに例えば $(2,2)$ は厳密実行可能なので Slater 条件も成立し、主最適解から KKT 乗数を取り出せる必要性の側も満たされています。
<!-- solution-end -->

### OPT5-B03 Slater が失敗する例を診断する

- Level: B
- 目安時間: 25分

$$
\min_x x
\quad\text{制約}\quad x^2\le0
$$

について、(i) 最適解、(ii) Slater 条件、(iii) KKT 乗数の存在、(iv) 双対関数・双対最適値・双対最適解の存在を順に調べ、Slater を失ったとき何が壊れたか説明せよ。

<!-- solution-start -->
#### 詳細解答

$x^2\le0$ は $x=0$ と同値なので、実行可能集合は $\{0\}$。従って唯一の最適解は

$$
x^*=0,
\qquad
p^*=0
$$

です。

Slater 条件には $\bar x^2<0$ が必要ですが、そのような実数は存在しません。従って Slater 条件は失敗します。

Lagrangian は

$$
L(x,\lambda)=x+\lambda x^2
$$

で、KKT の停留条件は

$$
1+2\lambda x^*=0.
$$

$x^*=0$ を代入すると $1=0$ となり、どの有限な $\lambda\ge0$ でも KKT 条件を満たせません。

次に双対関数を計算します。$\lambda=0$ なら

$$
q(0)=\inf_x x=-\infty.
$$

$\lambda>0$ なら

$$
x+\lambda x^2
=
\lambda\left(x+\frac{1}{2\lambda}\right)^2
-
\frac{1}{4\lambda},
$$

なので

$$
q(\lambda)
=
-\frac{1}{4\lambda}.
$$

従って

$$
d^*
=
\sup_{\lambda>0}
\left(-\frac{1}{4\lambda}\right)
=
0
=
p^*.
$$

双対ギャップは0ですが、任意の有限な $\lambda>0$ で $q(\lambda)<0$ なので双対最適解は存在しません。

したがってこの例で壊れたのは「値としての強双対性」ではなく、**有限の双対最適乗数を取り出す機構**です。そのため KKT 必要条件も失敗します。制約勾配 $g'(0)=0$ が一次近似で実行可能集合の狭さを捉えられないことが背景にあり、OPT6 の接錐と制約の一次近似の議論へつながります。
<!-- solution-end -->

---

## 12. 演習 Level C

### OPT5-C01 二次目的・不等式・等式制約を同時に解く

- Level: C
- 目安時間: 30分

$$
\min_{x,y}\frac12(x^2+y^2)
$$

制約

$$
x\ge0,\qquad y\ge0,\qquad x+y=1
$$

について、Lagrangian と KKT 条件を構成し、主最適解と一組の最適乗数を求めよ。さらに Slater 条件を確認し、KKT が必要十分条件として使える理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

不等式を

$$
g_1(x,y)=-x\le0,\qquad g_2(x,y)=-y\le0
$$

と書き、乗数を $\lambda_1,\lambda_2\ge0$、等式制約の乗数を $\nu\in\mathbb R$ とする。Lagrangian は

$$
L=
\frac12(x^2+y^2)-\lambda_1x-\lambda_2y+\nu(x+y-1).
$$

KKT 条件は

$$
x\ge0,\quad y\ge0,\quad x+y=1,
$$

$$
\lambda_1,\lambda_2\ge0,
$$

$$
x-\lambda_1+\nu=0,\qquad
y-\lambda_2+\nu=0,
$$

$$
\lambda_1x=0,\qquad\lambda_2y=0.
$$

等式制約上で $x,y$ がともに正となる候補を考えると、相補性から $\lambda_1=\lambda_2=0$。停留条件は

$$
x+\nu=0,\qquad y+\nu=0
$$

なので $x=y$。$x+y=1$ から

$$
x^*=y^*=\frac12.
$$

従って $\nu^*=-1/2$ であり、

$$
\boxed{
(x^*,y^*)=(1/2,1/2),\quad
\lambda_1^*=\lambda_2^*=0,\quad
\nu^*=-1/2
}.
$$

Slater 条件については、等式 $x+y=1$ を満たしながら両不等式を厳密に満たす点が必要です。$(1/2,1/2)$ 自身が

$$
-x=-\frac12<0,\qquad -y=-\frac12<0
$$

を満たすので Slater 条件が成立します。目的関数と不等式制約は凸、等式制約はアフィンです。従って本章の KKT 定理の十分性により、この KKT 点は大域最適解です。さらに目的関数は狭義凸で実行可能集合は凸なので、最適解は一意です。

なお二つの不等式は最適点で非活性なので、乗数が0になることも相補性と一致します。
<!-- solution-end -->

---

## 13. 次に進む

次は **OPT6「KKT の幾何学的導出・制約想定」** です。本章で Slater 条件を使って得た乗数が、一般の滑らかな制約付き最適化でいつ存在するのかを、活性集合・接錐・制約の一次近似・LICQ・MFCQ から組み立て直します。
