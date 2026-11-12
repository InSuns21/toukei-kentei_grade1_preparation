# INV8 一般変分正則化の解は存在するか

<!-- definition-example-audit: strict -->

[INV7の不一致原理](../INV7/index.md#def-inv7-discrepancy)では、二乗残差と二乗ノルムの和を最小にする Tikhonov 解を使いました。ところが未知量が関数や画像になれば、単にノルムを小さくする以外の制約も表現したくなります。観測値への適合と、復元したい未知量の性質を**別々の関数**で測ることを考えます。

問題は「目的関数を書ける」ことと「最小点が実際にある」ことが違う点です。さらにデータが少し変わったとき、最小点がどの意味で安定するでしょうか。[VAR9の最小化の直接法](../../VAR/VAR9/index.md#thm-var9-direct-method)が教える「有界性 → 弱収束部分列 → 下半連続性」を逆問題へ移し、**存在・安定性・一意性**を分けて調べます。

本講で用いる弱収束は[FA3の弱収束](../../FA/FA3/index.md#def-fa3-weak-convergence)です。実 Hilbert 空間では有界列に弱収束部分列があるという[既習定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を使用します。また Hilbert 空間は[FA4の反射的 Banach 空間](../../FA/FA4/index.md#def-fa4-reflexive)の代表例ですが、**弱コンパクト性と列の弱収束部分列の存在は論理的に別の主張**です。本講の列を使う証明では上の Hilbert 空間の定理を明示的に使います。

## 1. 観測への適合と罰則を分ける

未知量の集合を $C\subset X$、観測空間を $Y$、前向き写像を $F:C\to Y$ とします。$C$ は非空です。データ $y^\delta\in Y$ と正則化パラメータ $\alpha>0$ に対し、観測との差を測る関数を $\mathcal D:Y\times Y\to[0,\infty)$、未知量の望ましさを測る罰則を $\mathcal R:C\to[0,\infty]$ とします。罰則が $+\infty$ の点は最小化の候補として排除されます。

この設定は [INV5の二乗ノルム Tikhonov 正則化](../INV5/index.md#def-inv5-tikhonov) の一般化です。**一般化しても最小点の存在が自動的に従うわけではありません。**

<a id="def-inv8-variational-objective"></a>

<!-- formal-statement-start -->
> **定義（一般変分正則化目的関数）**  
> $X,Y$ を実ノルム空間、$\varnothing\ne C\subset X$、$F:C\to Y$ を写像、$\mathcal D:Y\times Y\to[0,\infty)$ と $\mathcal R:C\to[0,\infty]$ を関数とする。$\alpha>0$ と $z\in Y$ に対し、

$$
J_{\alpha,z}(x)
:=\mathcal D(F(x),z)+\alpha\mathcal R(x)
\qquad(x\in C)
$$

> を一般変分正則化目的関数とする。$\mathcal R(x)<\infty$ を満たす $x\in C$ が少なくとも一つあるとき罰則を**適切**という。$J_{\alpha,z}$ が最小値を達成する点を変分正則化の最小点という。存在・一意性はこの定義には含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv8-variational-objective -->

**定義の確認**：$X=Y=C=\mathbb R$、$F(x)=x$、$\mathcal D(u,z)=(u-z)^2$、$\mathcal R(x)=x^4$、$z=2$、$\alpha=1/2$ とします。$\mathcal D\ge0$ かつ $\mathcal R\ge0$ で、$\mathcal R(0)=0<\infty$ なので適切です。ここで

$$
J_{1/2,2}(x)=(x-2)^2+\frac12x^4.
$$

微分すると $J'(x)=2(x-2)+2x^3$、$J''(x)=2+6x^2>0$ です。$J'(1)=0$ なので $x=1$ が唯一の最小点です。二次罰則以外にも変分正則化が定義できることが、式と条件の両方から分かります。
<!-- definition-example-end -->

## 2. 直接法が働くための四つの条件

これ以降、まず $X,Y$ を実 Hilbert 空間とします。集合 $C$ 上の列 $x_n$ が弱収束して極限 $x$ を持つなら $x\in C$ となる性質が**弱逐次閉性**です。[既習の定義](../../VAR/VAR9/index.md#def-var9-weak-closed)と同じ意味で使います。

[強制性](../../VAR/VAR9/index.md#def-var9-coercivity)は、$\|x\|_X\to\infty$（$x\in C$）なら $\mathcal R(x)\to\infty$ という性質です。また[弱逐次下半連続性](../../VAR/VAR9/index.md#def-var9-weak-lsc)は、$x_n\rightharpoonup x$ に対して

$$
\mathcal R(x)\le\liminf_{n\to\infty}\mathcal R(x_n)
$$

が成り立つことです。強制性は**最小化列を逃さない**ため、下半連続性は**極限で目的関数の値が突然大きくならない**ために使います。

残り二条件は、$F$ と $\mathcal D$ の相性です。$x_n\rightharpoonup x$ のとき $F(x_n)\rightharpoonup F(x)$ となることを $F$ の弱逐次連続性とします。さらに $u_n\rightharpoonup u$ と $z_n\to z$（後者はノルム収束）のとき、

$$
\mathcal D(u,z)\le\liminf_{n\to\infty}\mathcal D(u_n,z_n)
$$

を要求します。この不等式があると、データも変わる安定性の証明で下半連続性を使えます。固定した $u$ について $\mathcal D(u,z_n)\to\mathcal D(u,z)$ となることも別に要求します。これは比較対象を固定したとき、目的関数の値が連続的に変わるためです。

### よく使う二乗残差なら条件を直接確かめられる

$F=A:X\to Y$ が有界線形作用素で、$\mathcal D(u,z)=\|u-z\|_Y^2$ だとします。[有界線形作用素の弱連続性](../../FA/FA3/index.md#prop-fa3-bounded-map-weak-continuous)より $x_n\rightharpoonup x$ なら $Ax_n\rightharpoonup Ax$ です。$z_n\to z$ なら任意の $v\in Y$ に対し

$$
\langle Ax_n-z_n,v\rangle_Y
=\langle Ax_n,v\rangle_Y-\langle z_n,v\rangle_Y
\longrightarrow\langle Ax-z,v\rangle_Y.
$$

従って $Ax_n-z_n\rightharpoonup Ax-z$ です。[弱収束の汎関数判定](../../FA/FA3/index.md#thm-fa3-weak-convergence-criterion)を使い、特に極限 $w=Ax-z\ne0$ に対する汎関数 $v\mapsto\langle v,w/\|w\|\rangle$ を当てると

$$
\|w\|_Y
=\lim_n\left\langle Ax_n-z_n,\frac{w}{\|w\|_Y}\right\rangle_Y
\le\liminf_n\|Ax_n-z_n\|_Y.
$$

$w=0$ でも非負性で同じ結論です。二乗して二変数の下半連続性が従います。また三角不等式から固定した $u$ について

$$
\bigl|\|u-z_n\|_Y-\|u-z\|_Y\bigr|
\le\|z_n-z\|_Y\longrightarrow0,
$$

ゆえに二乗残差も固定した $u$ で連続です。これは単に「ノルムだから大丈夫」とせず、**変化するデータまで含めて**条件を確かめた例です。

## 3. 最小点の存在

<a id="thm-inv8-existence"></a>

<!-- formal-statement-start -->
> **定理（一般変分正則化の最小点の存在）**  
> $X,Y$ を実 Hilbert 空間、$C\subset X$ を非空な弱逐次閉集合、$F:C\to Y$ を弱逐次連続写像とする。$\mathcal R:C\to[0,\infty]$ は適切、強制的、弱逐次下半連続であるとする。$\mathcal D:Y\times Y\to[0,\infty)$ は、$u_n\rightharpoonup u$、$z_n\to z$ なら

$$
\mathcal D(u,z)\le\liminf_n\mathcal D(u_n,z_n)
$$

> を満たすとする。このとき任意の $\alpha>0$、$z\in Y$ に対し $J_{\alpha,z}$ は $C$ 上に最小点を少なくとも一つ持つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限な罰則を持つ一点を比較対象にすると、目的関数の下限が有限になります。下限に近づく列を取り、最小化性と非負性から罰則の上界を得ます。強制性で列を有界にし、Hilbert 空間の弱収束部分列を取り、弱逐次閉性と下半連続性を組み合わせます。

<!-- proof-start -->
### 証明

**(1) 下限と最小化列。** $\mathcal R(x_0)<\infty$ である $x_0\in C$ を一つ選びます。$\mathcal D$ は有限かつ非負なので

$$
0\le m:=\inf_{x\in C}J_{\alpha,z}(x)
\le J_{\alpha,z}(x_0)<\infty.
$$

下限の定義から、各 $n\ge1$ に対し $x_n\in C$ を選んで $J_{\alpha,z}(x_n)\le m+1/n$ とできます。

**(2) 強制性で有界性。** $J$ の二項は非負ですから

$$
\alpha\mathcal R(x_n)
\le J_{\alpha,z}(x_n)\le m+1,
\qquad
\mathcal R(x_n)\le\frac{m+1}{\alpha}.
$$

もし $(x_n)$ が非有界なら $\|x_{n_k}\|_X\ge k$ となる部分列を取れ、強制性から $\mathcal R(x_{n_k})\to\infty$ となって上の一様上界に矛盾します。

**(3) 弱極限の取り出し。** [Hilbert 空間の有界列の弱部分列定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)をこの有界列に適用し、添字を取り直して $x_{n_k}\rightharpoonup\bar x$ を得ます。$C$ の弱逐次閉性により $\bar x\in C$ です。$F$ の弱逐次連続性で $F(x_{n_k})\rightharpoonup F(\bar x)$ です。

**(4) 下半連続性で最小値達成。** 二変数の下半連続性に $u_k=F(x_{n_k})$、$z_k=z$ を代入し、罰則の下半連続性も用います。

$$
\begin{aligned}
J_{\alpha,z}(\bar x)
&=\mathcal D(F(\bar x),z)+\alpha\mathcal R(\bar x)\\
&\le\liminf_k\mathcal D(F(x_{n_k}),z)
   +\alpha\liminf_k\mathcal R(x_{n_k})\\
&\le\liminf_k J_{\alpha,z}(x_{n_k})=m.
\end{aligned}
$$

最後から二行目は、非負の二数列について「下極限の和は和の下極限以下」を使いました。定義上 $m\le J_{\alpha,z}(\bar x)$ でもあるので等号です。従って $\bar x$ は最小点です。$\square$
<!-- proof-end -->

**何を仮定しすぎているか。** 本証明で直接必要なのは、$J(x)\le J(x_0)$ を満たす候補列から弱収束部分列を取れることと、$J$ 自身の弱逐次下半連続性です。$\mathcal R$ の強制性はその有界性を保証する便利な仮定ですが、最小点が存在するために不可欠ではありません。

[反射的 Banach 空間の閉有界凸集合の弱コンパクト性](../../FA/FA4/index.md#cor-fa4-reflexive-closed-bounded-convex)は一般化の入口になります。しかし一般の反射的 Banach 空間で**列の**弱収束部分列を取るには、弱コンパクト性だけからの無条件な飛躍は避ける必要があります。本講の証明を Banach 空間へ移すときは「有界列が弱収束部分列を持つ」ことを**別の仮定として明示**するか、その定理を事前に確立したうえで使います。また一般の $\mathcal R$ では $C$ が凸である必要はありません。

### 具体例：二乗ノルムの外へ

先の $J(x)=(x-2)^2+\tfrac12x^4$ では、$\mathbb R$ の弱収束と通常収束が同じで、$C=\mathbb R$ は弱逐次閉、$F=I$ は弱逐次連続です。$\mathcal R(x)=x^4\to\infty$ は強制的で連続、二乗残差は第2節の条件を満たします。よって定理で存在が保証され、実際の最小点は第1節で求めた $x=1$ です。

## 4. 観測が変わっても、どこまで安定するか

データ $z_n\to z$ のもとで各 $n$ の最小点を $x_n$ とします。最小点が一つとは限らないので、まず証明できるのは **極限の候補は元の問題の最小点になる**という部分列の主張です。さらに $\alpha_n\to\alpha>0$ と動かすことも許します。

<a id="thm-inv8-stability"></a>

<!-- formal-statement-start -->
> **定理（変分最小点の観測摂動に対する弱部分列安定性）**  
> $X,Y,C,F,\mathcal R,\mathcal D$ は[存在定理](#thm-inv8-existence)の全仮定を満たすものとし、さらに任意の固定 $u\in Y$ に対して $z_n\to z$ なら $\mathcal D(u,z_n)\to\mathcal D(u,z)$ とする。$\alpha_n>0$、$\alpha_n\to\alpha>0$、$z_n\to z$ とする。各 $n$ の $J_{\alpha_n,z_n}$ の最小点 $x_n$ を任意に選ぶと、
> 
> 1. $(x_n)$ は $X$ で有界である。
> 2. 任意の弱収束部分列の極限は $J_{\alpha,z}$ の最小点である。
> 3. $(x_n)$ は少なくとも一つの弱収束部分列を持つ。元の問題の最小点が一意なら、列全体がその点へ弱収束する。
<!-- formal-statement-end -->

### 証明の見取り図

固定した候補 $x_0$ と各 $x_n$ を比較します。データと $\alpha_n$ の収束により $J_{\alpha_n,z_n}(x_0)$ は有界です。部分列が弱収束したら、変化するデータとの二変数下半連続性を使います。任意の固定候補 $v$ との比較を極限に持ち込み、極限が最小点であることを示します。

<!-- proof-start -->
### 証明

**(1) 一様有界性。** 適切性から $\mathcal R(x_0)<\infty$ の $x_0\in C$ を選びます。最小化性により

$$
\mathcal D(F(x_n),z_n)+\alpha_n\mathcal R(x_n)
\le\mathcal D(F(x_0),z_n)+\alpha_n\mathcal R(x_0).
$$

右辺は固定点でのデータ連続性と $\alpha_n\to\alpha$ により有界です。また十分大きい $n$ で $\alpha_n\ge\alpha/2$。非負性を使って

$$
\mathcal R(x_n)
\le\frac{2}{\alpha}
\bigl(\mathcal D(F(x_0),z_n)+\alpha_n\mathcal R(x_0)\bigr)
\le M
$$

とできます。有限個の初期項の罰則も有限です。強制性から $(x_n)$ は有界です。

**(2) 極限の最小化性。** 任意の弱収束部分列 $x_{n_k}\rightharpoonup\bar x$ を取ります。弱逐次閉性から $\bar x\in C$、$F$ の弱逐次連続性から $F(x_{n_k})\rightharpoonup F(\bar x)$ です。二変数の下半連続性と罰則の下半連続性から

$$
J_{\alpha,z}(\bar x)
\le\liminf_k J_{\alpha_{n_k},z_{n_k}}(x_{n_k}).
$$

この式の罰則係数については、各 $\varepsilon\in(0,\alpha)$ に対し十分大きい $k$ で $\alpha_{n_k}\ge\alpha-\varepsilon$ であり、$\mathcal R\ge0$ なので

$$
\liminf_k\alpha_{n_k}\mathcal R(x_{n_k})
\ge(\alpha-\varepsilon)\liminf_k\mathcal R(x_{n_k})
\ge(\alpha-\varepsilon)\mathcal R(\bar x).
$$

$\varepsilon\downarrow0$ として正当化できます。右辺の有限性は先ほどの一様上界から従います。

任意の $v\in C$ で $\mathcal R(v)<\infty$ を固定すると、最小化性とデータ連続性により

$$
\begin{aligned}
\limsup_k J_{\alpha_{n_k},z_{n_k}}(x_{n_k})
&\le\lim_k\bigl(\mathcal D(F(v),z_{n_k})
 +\alpha_{n_k}\mathcal R(v)\bigr)\\
&=J_{\alpha,z}(v).
\end{aligned}
$$

従って $J_{\alpha,z}(\bar x)\le J_{\alpha,z}(v)$ です。$\mathcal R(v)=\infty$ の場合の比較は自動的に成立します。よって $\bar x$ は最小点です。

**(3) 部分列と一意な極限。** (1) の有界性に[Hilbert 弱部分列定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を適用すれば (3) の前半が従います。最小点が一意で $x_*$ とします。仮に $x_n$ が $x_*$ へ弱収束しなければ、[弱収束の汎関数判定](../../FA/FA3/index.md#thm-fa3-weak-convergence-criterion)により、ある連続線形汎関数 $\ell$、$\varepsilon>0$ と部分列が存在して

$$
|\ell(x_{n_k})-\ell(x_*)|\ge\varepsilon
$$

を満たします。この部分列からさらに弱収束部分列を取ると、その極限は (2) より $x_*$ なので左辺は零に近づき矛盾します。従って列全体が弱収束します。$\square$
<!-- proof-end -->

この結論は **$\alpha_n\to\alpha>0$** の安定性です。証明の比較不等式で $\alpha_n\ge\alpha/2$ を使った点が重要です。$\alpha_n\downarrow0$ なら $\mathcal R(x_n)\le K/\alpha_n$ の右辺が発散し得るため、同じ証明では最小点列の有界性を保証できません。無雑音の真の解への収束には追加の仮定と議論が必要であり、ここでの安定性とは別問題です。

### 例：データとパラメータの両方を動かす

$X=Y=C=\mathbb R$、$F=I$、$\mathcal R(x)=x^2$、$\mathcal D(u,z)=(u-z)^2$、$z_n=2+1/n$、$\alpha_n=1+1/n$ とします。微分して

$$
2(x-z_n)+2\alpha_nx=0,
\qquad
x_n=\frac{z_n}{1+\alpha_n}
=\frac{2+1/n}{2+1/n}=1.
$$

すべての $x_n$ が $1$ に等しく、極限の問題 $J_{1,2}(x)=(x-2)^2+x^2$ の唯一の最小点 $1$ と一致します。これは部分列安定性の具体的な確認です。

## 5. 一意性は存在の定理から出てこない

$C$ が凸集合で $F=A$ が線形、$\mathcal D(\,\cdot\,,z)$ が凸、$\mathcal R$ が厳密凸なら、目的関数は厳密凸になります。厳密凸とは、異なる $x_1,x_2$ と $0<t<1$ に対し

$$
\mathcal R((1-t)x_1+tx_2)
<(1-t)\mathcal R(x_1)+t\mathcal R(x_2)
$$

が成立することです（有限値を取る点について）。$F$ が線形なので $A((1-t)x_1+tx_2)=(1-t)Ax_1+tAx_2$ となることが、**観測誤差項の凸性を引き戻す橋**です。

<a id="prop-inv8-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（厳密凸罰則による変分最小点の一意性）**  
> $X,Y$ を実 Hilbert 空間、$C\subset X$ を非空な凸集合、$A:X\to Y$ を有界線形作用素、$z\in Y$、$\alpha>0$ とする。$\mathcal D(\,\cdot\,,z)$ が凸、$\mathcal R$ が $C$ 上で厳密凸であるとする。このとき $J_{\alpha,z}$ の有限値の最小点は存在すれば高々一つである。存在定理の仮定も満たせば、ただ一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

二つの異なる最小点があると仮定して中点の目的関数を評価します。データ誤差は凸性で等号以下、罰則は厳密凸性で**厳密不等号**となるため最小性に矛盾します。

<!-- proof-start -->
### 証明

異なる有限値の最小点 $x_1,x_2\in C$ があり、共通の最小値が $m$ であるとします。$x_t=(1-t)x_1+tx_2\in C$（$0<t<1$）と置くと、線形性と凸性から

$$
\mathcal D(Ax_t,z)
\le(1-t)\mathcal D(Ax_1,z)+t\mathcal D(Ax_2,z).
$$

一方、$\mathcal R$ の厳密凸性と $\alpha>0$ によって

$$
\alpha\mathcal R(x_t)
<(1-t)\alpha\mathcal R(x_1)+t\alpha\mathcal R(x_2).
$$

両式を加えると $J_{\alpha,z}(x_t)<(1-t)m+tm=m$ となり、$m$ が下限であることに矛盾します。$\square$
<!-- proof-end -->

**非線形の注意。** $\mathcal R(x)=x^2$ が厳密凸でも、$F(x)=x^2$、$z=1$、$\mathcal D(u,z)=(u-z)^2$、$\alpha=1$ なら

$$
J_{1,1}(x)=(x^2-1)^2+x^2
=\left(x^2-\frac12\right)^2+\frac34.
$$

従って最小点は $x=\pm1/\sqrt2$ の二つです。壊れたのは罰則の厳密凸性ではなく、**非線形 $F$ を合成したデータ誤差項の凸性**です。

## 6. 弱い安定性から強い安定性へ進める場合

一般の最小点列にノルム収束まで約束することはできません。ただし、二乗ノルム罰則は弱収束と最小値比較からノルムの収束を導けます。

<a id="cor-inv8-strong-stability"></a>

<!-- formal-statement-start -->
> **系（二乗ノルム罰則の強安定性）**  
> $X,Y$ を実 Hilbert 空間、$C\subset X$ を非空な弱逐次閉凸集合、$A:X\to Y$ を有界線形作用素とする。$\mathcal R(x)=\|x\|_X^2$、$\mathcal D(u,z)=\|u-z\|_Y^2$、$\alpha_n\to\alpha>0$、$z_n\to z$ とする。各 $J_{\alpha_n,z_n}$ の最小点 $x_n$ と極限の問題の最小点 $x_*$ は一意に存在し、

$$
\|x_n-x_*\|_X\longrightarrow0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

強制性・下半連続性から存在、厳密凸性から一意性を得ます。安定性定理から弱収束し、比較不等式を極限に通すと目的関数値が収束します。残差項の下半連続性を差し引いて復元ノルムの収束を得て、Hilbert 空間のノルム二乗恒等式で強収束へ進みます。

<!-- proof-start -->
### 証明

$C$ は弱逐次閉で、$x\mapsto\|x\|^2$ は非負・強制的・弱逐次下半連続です。$A$ は弱逐次連続で、二乗残差には第2節の条件があります。[存在定理](#thm-inv8-existence)より最小点が存在し、[厳密凸性による一意性](#prop-inv8-uniqueness)より各最小点は一意です。$\alpha_n\to\alpha>0$ なので[弱部分列安定性](#thm-inv8-stability)から $x_n\rightharpoonup x_*$ です。

$x_*$ を比較候補にした最小化性とデータ連続性から

$$
\limsup_n J_{\alpha_n,z_n}(x_n)
\le\lim_n J_{\alpha_n,z_n}(x_*)
=J_{\alpha,z}(x_*).
$$

第4節の下半連続評価は逆向きの下極限評価を与えます。従って $J_{\alpha_n,z_n}(x_n)\to J_{\alpha,z}(x_*)$ です。一方、$Ax_n-z_n\rightharpoonup Ax_*-z$ から

$$
\liminf_n\|Ax_n-z_n\|_Y^2
\ge\|Ax_*-z\|_Y^2.
$$

よって目的関数から残差を差し引き、$\alpha_n\to\alpha>0$ を用いると

$$
\begin{aligned}
\limsup_n\alpha_n\|x_n\|_X^2
&\le J_{\alpha,z}(x_*)-\|Ax_*-z\|_Y^2\\
&=\alpha\|x_*\|_X^2.
\end{aligned}
$$

また第2節で示した弱収束に対するノルム評価から $\|x_*\|^2\le\liminf_n\|x_n\|^2$ です。従って $\|x_n\|^2\to\|x_*\|^2$。最後に弱収束で $\langle x_n,x_*\rangle\to\|x_*\|^2$ だから

$$
\|x_n-x_*\|_X^2
=\|x_n\|_X^2+\|x_*\|_X^2-2\langle x_n,x_*\rangle_X
\longrightarrow0.
$$

これが強収束です。$\square$
<!-- proof-end -->

## 7. 失った仮定ごとに破綻を観察する

**強制性がないとき。** $X=Y=C=\mathbb R$、$F(x)=e^x$、$z=0$、$\mathcal D(u,z)=(u-z)^2$、$\mathcal R=0$ なら $J(x)=e^{2x}>0$。しかし $x\to-\infty$ に対して $J(x)\to0$ なので下限 $0$ は達成されません。最小化列が無限遠へ逃げて、存在証明の第2段階が壊れます。

**下半連続性がないとき。** $F=0$、$\mathcal D=0$、$C=X=\mathbb R$、$\mathcal R(0)=1$、$\mathcal R(x)=x^2$（$x\ne0$）とします。$\mathcal R$ は非負・適切・強制的ですが、$x_n=1/n\to0$ で $\mathcal R(x_n)\to0<\mathcal R(0)$。下限は $0$、しかし達成点はありません。最小化列の極限で値が跳ね上がり、第4段階が壊れます。

**弱収束と強収束は違う。** $X=\ell^2$、$Y=\mathbb R$、$F=0$、$z=0$、$\mathcal R(x)=\bigl(\max\{0,\|x\|-1\}\bigr)^2$ とします。罰則は連続・凸・強制的で、$\|x\|\le1$ の全点が最小点です。標準基底 $e_n$ は $e_n\rightharpoonup0$ ですが、$\|e_n-0\|=1$、さらに $n\ne m$ なら $\|e_n-e_m\|=\sqrt2$ です。よって強収束部分列はありません。[弱部分列安定性](#thm-inv8-stability)は成立しても、厳密凸性やノルム収束を付加しない限り強い安定性は出ません。

**非線形 $F$ は弱逐次連続とは限らない。** $X=\ell^2$、$Y=\mathbb R$、$F(x)=\|x\|$ とすると、$e_n\rightharpoonup0$ に対して $F(e_n)=1$、$F(0)=0$ です。ノルム連続であることだけでは、存在定理の弱逐次連続性を置き換えられません。

## 8. 演習：仮定を確かめ、存在と安定性を組み立てる

### Level A：基本条件と不等式を確認する

<a id="ex-inv8-a01"></a>

### INV8-A01 四次罰則の最小点
- Level: A

$J(x)=(x-2)^2+\tfrac12x^4$（$x\in\mathbb R$）について、非負の観測誤差・適切な罰則・強制性を確認し、最小点を求めよ。

<!-- solution-start -->
#### 詳細解答

$\mathcal D(u,z)=(u-z)^2\ge0$、$\mathcal R(x)=x^4\ge0$、$\mathcal R(0)=0$ なので適切です。$\|x\|\to\infty$ で $x^4\to\infty$、よって強制的です。微分から

$$
J'(x)=2(x-2)+2x^3,\quad
J''(x)=2+6x^2>0,\quad J'(1)=0.
$$

厳密凸性と臨界点の条件から $x=1$ が唯一の最小点です。実際 $J(1)=1+\tfrac12=\tfrac32$。この例での弱下半連続性は、有限次元で弱収束が通常収束と一致し、$J$ が連続であることから従います。
<!-- solution-end -->

<a id="ex-inv8-a02"></a>

### INV8-A02 二乗残差の二変数条件
- Level: A

実 Hilbert 空間 $Y$ で $u_n\rightharpoonup u$、$z_n\to z$ とする。$\|u-z\|^2\le\liminf_n\|u_n-z_n\|^2$ を示せ。

<!-- solution-start -->
#### 詳細解答

任意の $v\in Y$ について $\langle u_n-z_n,v\rangle\to\langle u-z,v\rangle$ なので $u_n-z_n\rightharpoonup u-z$ です。$w=u-z\ne0$ なら

$$
\|w\|=\lim_n\left\langle u_n-z_n,\frac{w}{\|w\|}\right\rangle
\le\liminf_n\|u_n-z_n\|.
$$

$w=0$ でも右辺は非負です。非負実数の二乗は単調なので結論が従います。この不等式は $u_n$ だけでなく $z_n$ も動く場合を含みます。
<!-- solution-end -->

<a id="ex-inv8-a03"></a>

### INV8-A03 弱下半連続性の直接証明
- Level: A

実 Hilbert 空間 $X$ で $x_n\rightharpoonup x$ のとき $\|x\|^2\le\liminf_n\|x_n\|^2$ を示せ。$X$ の次元を有限とは仮定しない。

<!-- solution-start -->
#### 詳細解答

内積 $\langle x_n-x,x_n-x\rangle$ を展開すると

$$
0\le\|x_n-x\|^2
=\|x_n\|^2-2\langle x_n,x\rangle+\|x\|^2.
$$

弱収束の定義から $\langle x_n,x\rangle\to\langle x,x\rangle=\|x\|^2$ です。式を移項して下極限を取れば

$$
\liminf_n\|x_n\|^2\ge2\|x\|^2-\|x\|^2=\|x\|^2.
$$

従って二乗ノルム罰則は弱逐次下半連続です。
<!-- solution-end -->

<a id="ex-inv8-a04"></a>

### INV8-A04 強制性を失った問題
- Level: A

$J(x)=e^{2x}$（$x\in\mathbb R$）が下に有界で連続でも最小点を持たないことを、下限と最小化列で示せ。

<!-- solution-start -->
#### 詳細解答

各 $x$ で $e^{2x}>0$ なので下限は $0$ 以上です。一方 $x_n=-n$ を取ると $J(x_n)=e^{-2n}\to0$ です。よって $\inf_{\mathbb R}J=0$。しかし有限の $x$ で $e^{2x}=0$ は不可能なので達成点はありません。列は $|x_n|=n\to\infty$ で有界にならず、[存在証明](#thm-inv8-existence)の弱部分列抽出へ進めません。
<!-- solution-end -->

<a id="ex-inv8-a05"></a>

### INV8-A05 下半連続性の欠落
- Level: A

$R(0)=1$、$R(x)=x^2$（$x\ne0$）とする。$R:\mathbb R\to[0,\infty)$ は強制的であること、下半連続でないこと、$\min R$ が存在しないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

$|x|\to\infty$ では $R(x)=x^2\to\infty$ なので強制的です。$x_n=1/n\to0$ で

$$
\liminf_n R(x_n)=\lim_n\frac1{n^2}=0
<R(0)=1
$$

となり、下半連続性に反します。$R(x)>0$ は全ての $x$ で成り立ち、一方 $R(1/n)\to0$ なので下限は $0$ で、どの点でも達成されません。失った条件は強制性ではなく下半連続性です。
<!-- solution-end -->

### Level B：存在・凸性・安定性をつなぐ

<a id="ex-inv8-b01"></a>

### INV8-B01 制約付き変分問題の存在と解
- Level: B

$X=\mathbb R^2$、$Y=\mathbb R$、$C=\{(x_1,x_2):x_1\ge0\}$、$A(x)=x_1+x_2$、$z=3$、$\alpha=1$、$R(x)=x_1^2+x_2^2$ とする。存在定理の仮定を検査し、最小点を具体的に求めて一意性も説明せよ。

<!-- solution-start -->
#### 詳細解答

$C$ は閉半平面で、有限次元では弱収束と通常収束が一致するので弱逐次閉です。$A$ は線形連続であり弱逐次連続。$R$ は連続・適切（$R(0,0)=0$）・強制的で、二乗ノルムなので弱逐次下半連続です。二乗残差は第2節の条件を満たすため[存在定理](#thm-inv8-existence)が使えます。

目的関数は $(x_1+x_2-3)^2+x_1^2+x_2^2$ です。微分すると

$$
\frac12\partial_{x_1}J=x_1+x_2-3+x_1,\qquad
\frac12\partial_{x_2}J=x_1+x_2-3+x_2.
$$

両方を零にすると $x_1=x_2=t$、$3t-3=0$ より $t=1$。$(1,1)\in C$ です。$R$ は厳密凸、残差項は凸なので[一意性命題](#prop-inv8-uniqueness)によりこの解が唯一の最小点です。
<!-- solution-end -->

<a id="ex-inv8-b02"></a>

### INV8-B02 パラメータが動くときの比較不等式
- Level: B

[安定性定理](#thm-inv8-stability)の仮定の下で $\alpha_n\to\alpha>0$、$z_n\to z$、最小点 $x_n$ とする。固定した有限罰則の点 $v$ と比較し、$(x_n)$ が有界になる理由を省略せず示せ。

<!-- solution-start -->
#### 詳細解答

$x_n$ の最小化性から

$$
0\le\alpha_n R(x_n)
\le D(F(v),z_n)+\alpha_n R(v).
$$

固定 $v$ におけるデータ連続性により $D(F(v),z_n)\to D(F(v),z)$。また $\alpha_n\to\alpha$ なので右辺には共通上界 $K<\infty$ が存在します。十分大きい $n$ で $\alpha_n\ge\alpha/2>0$ ですから

$$
R(x_n)\le\frac{K}{\alpha_n}\le\frac{2K}{\alpha}.
$$

有限個の残りの $n$ についても、各目的関数に有限値の比較点 $v$ があるので $R(x_n)<\infty$ です。もし $(x_n)$ が非有界なら $\|x_{n_k}\|\ge k$ の部分列で強制性から $R(x_{n_k})\to\infty$ となり上界に矛盾します。従って $(x_n)$ は有界です。
<!-- solution-end -->

<a id="ex-inv8-b03"></a>

### INV8-B03 非線形観測と二つの最小点
- Level: B

$F(x)=x^2$、$z=1$、$D(u,z)=(u-z)^2$、$R(x)=x^2$、$\alpha=1$ とする。$R$ は厳密凸であるのに目的関数が二つの最小点を持つことを示し、[一意性命題](#prop-inv8-uniqueness)のどの仮定を落としたか説明せよ。

<!-- solution-start -->
#### 詳細解答

$x\in\mathbb R$ について

$$
J(x)=(x^2-1)^2+x^2=x^4-x^2+1
=\left(x^2-\frac12\right)^2+\frac34.
$$

従って $\inf J=3/4$ で、$x^2=1/2$ を満たす $x=\pm1/\sqrt2$ が最小点です。罰則 $x^2$ は厳密凸ですが $F$ は線形ではありません。実際 $D(F(0),1)=1$ は $D(F(\pm1),1)=0$ の中点凸性に反するので、観測誤差項は一般に凸ではありません。従って命題の凸性の橋が壊れています。
<!-- solution-end -->

<a id="ex-inv8-b04"></a>

### INV8-B04 弱安定でも強安定とは限らない
- Level: B

$X=\ell^2$、$Y=\mathbb R$、$F=0$、$R(x)=(\max\{0,\|x\|-1\})^2$、$z_n=z=0$、$\alpha_n=\alpha=1$ とする。存在定理の仮定が満たされること、$e_n$ が最小点列であること、強収束部分列がないことを示せ。

<!-- solution-start -->
#### 詳細解答

$C=X$ は弱逐次閉で、$F=0$ は弱逐次連続、$R(0)=0$ なので適切です。第2節のノルム評価と $t\mapsto(\max\{0,t-1\})^2$ の単調増加・連続性から $R$ は弱逐次下半連続です。$\|x\|\to\infty$ で $R(x)=(\|x\|-1)^2\to\infty$ なので強制的です。残差は定数零で二変数条件を満たします。よって[存在定理](#thm-inv8-existence)が使えます。

$\|x\|\le1$ なら $J(x)=0$ なので全て最小点です。特に標準基底 $e_n$ は最小点列で、任意の $v=(v_j)\in\ell^2$ に対し $\langle e_n,v\rangle=v_n\to0$ より $e_n\rightharpoonup0$ です。しかし異なる添字で

$$
\|e_n-e_m\|^2=\|e_n\|^2+\|e_m\|^2=2.
$$

従ってどの部分列も Cauchy 列にならず、強収束部分列はありません。非一意性に加え、最小値だけではノルム収束を強制できないことが失敗機構です。
<!-- solution-end -->

<a id="ex-inv8-b05"></a>

### INV8-B05 ノルム連続な写像の弱不連続性
- Level: B

$F:\ell^2\to\mathbb R$、$F(x)=\|x\|$ とする。$F$ はノルム連続だが弱逐次連続でないことを示し、$D(F(x),1)$ を下半連続として扱えない理由を具体的な列で説明せよ。

<!-- solution-start -->
#### 詳細解答

[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality) $\bigl|\|x\|-\|v\|\bigr|\le\|x-v\|$ より $F$ は $1$-Lipschitz、特にノルム連続です。一方、標準基底は $e_n\rightharpoonup0$ ですが $F(e_n)=1\not\to0=F(0)$。$D(u,1)=(u-1)^2$ とすると

$$
D(F(e_n),1)=0,\qquad D(F(0),1)=1.
$$

従って $D(F(0),1)>\liminf_n D(F(e_n),1)$ となり、弱逐次下半連続性さえ破れます。[存在定理](#thm-inv8-existence)の第4段階はこのような写像へそのまま適用できません。
<!-- solution-end -->

### Level C：無限次元の復元を最後まで追う

<a id="ex-inv8-c01"></a>

### INV8-C01 射影観測のデータ安定性と罰則の変更
- Level: C

$X=\ell^2$、$Y=\mathbb R$、$A(x)=x_1$、$C=X$、$\mathcal D(u,z)=(u-z)^2$ とする。$z_n=2+1/n$、$\alpha_n=1+1/n$ と置く。

(1) $\mathcal R(x)=\|x\|^2$ の場合、存在・一意性の仮定を確認し、各最小点 $x_n$ と極限問題の最小点 $x_*$ を求めて強収束を直接証明せよ。

(2) 同じ観測 $A$ の下で、$\mathcal R(x)=x_1^2+(\max\{0,\|x_{\ge2}\|-1\})^2$（$x_{\ge2}=(x_2,x_3,\ldots)$）に変えた場合、最小点の一意性が壊れることを示し、弱収束するが強収束部分列を持たない最小点列を構成せよ。

<!-- solution-start -->
#### 詳細解答

**(1) 検証と具体計算。** $A$ は第1成分を取る有界線形写像で $\|A\|\le1$、$C=X$ は弱逐次閉です。二乗ノルムは適切・強制的・弱逐次下半連続・厳密凸です。二乗残差は第2節の条件を満たすので[存在](#thm-inv8-existence)と[一意性](#prop-inv8-uniqueness)が使えます。

$x=(x_1,x_{\ge2})$ と分けると

$$
J_{\alpha_n,z_n}(x)
=(x_1-z_n)^2+\alpha_nx_1^2
+\alpha_n\sum_{j\ge2}|x_j|^2.
$$

最後の項は $x_j=0$（$j\ge2$）でのみ最小となります。第1成分は微分条件 $2(x_1-z_n)+2\alpha_nx_1=0$ より

$$
x_n=\frac{z_n}{1+\alpha_n}e_1
=\frac{2+1/n}{2+1/n}e_1=e_1.
$$

極限データ $z=2$、$\alpha=1$ でも $x_*=2/(1+1)e_1=e_1$。従って $\|x_n-x_*\|=0$ で強収束します。[強安定性の系](#cor-inv8-strong-stability)をこの模型で直接検算できました。

**(2) 平坦な罰則方向。** $x_{\ge2}$ は $\ell^2$ の閉部分空間で、$\|x\|^2=x_1^2+\|x_{\ge2}\|^2$ です。新罰則は非負で $R(0)=0$、$\|x\|\to\infty$ なら $|x_1|\to\infty$ または $\|x_{\ge2}\|\to\infty$ となる部分列上で $R(x)\to\infty$ なので強制的です（一般には両成分の最大値が $\|x\|/\sqrt2$ 以上であることから下界を取れます）。それぞれの項は弱逐次下半連続なので和も同様です。存在定理は引き続き適用できます。

第1成分は (1) と同じ $x_1=1$ が唯一の最良値です。一方 $\|x_{\ge2}\|\le1$ の全ての尾部で罰則の尾部項が零なので、$x_n=e_1+e_{n+1}$（$n\ge1$）は各 $n$ の最小点です。任意の $v\in\ell^2$ について $\langle x_n,v\rangle=v_1+v_{n+1}\to v_1$ なので $x_n\rightharpoonup e_1$。しかし $n\ne m$ なら

$$
\|x_n-x_m\|=\|e_{n+1}-e_{m+1}\|=\sqrt2,
$$

従って強収束部分列はありません。**罰則が尾部の単位球内で平坦**なため、観測不能な方向の選択が一意にならないことが原因です。
<!-- solution-end -->

---

二乗ノルムに限らない正則化でも、強制性と下半連続性があれば最小点を確保できます。ただし安定性はまず弱い部分列の主張であり、強収束や一意性にはさらに条件が要ります。次の INV9 では、罰則を $\ell^1$ や全変動へ変えたときに、何が残り何が失われるかを調べます。
