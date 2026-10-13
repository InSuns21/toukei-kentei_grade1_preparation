# CM2-02 ∂とbar∂の構成・二重複体

<!-- definition-example-audit: strict -->

## 1. 外微分を二つに分けたい

[前章の型分解定理](../CM2-01/index.md#thm-cm2-01-type-decomposition)によれば、複素多様体上の複素微分形式は、$dz$ の本数 $p$ と $d\bar z$ の本数 $q$ を指定して分類できる。一方、[外微分](../../GEO/GEO7/index.md#def-geo7-exterior-derivative) $d$ は次数を一つ上げる。では、$(p,q)$ 型の形式を微分すると、増えるのはどちらの本数だろうか。

まず $\mathbb C$ 上の滑らかな関数 $f(z,\bar z)=z\bar z$ を考える。実座標 $z=x+iy$ では $f=x^2+y^2$ なので、

$$
df=2x\,dx+2y\,dy
=\bar z\,dz+z\,d\bar z.
$$

前半は $(1,0)$ 型、後半は $(0,1)$ 型である。両方を含む $df$ をひとまとめにするより、二種類を別々に取り出す方が、正則性を表す条件まで見通せる。

この章では複素多様体 $X$（複素次元 $n\geq1$）上の**滑らかな複素数値微分形式**だけを扱う。後の章では $\bar\partial$ の方程式を解いてコホモロジーを作るが、ここではまず作用素が座標によらず構成でき、どんな恒等式を満たすかを証明する。

## 2. 関数での二種類の微分

$z^j=x^j+iy^j$ を正則局所座標とする。滑らかな複素数値関数 $f$ に対して、実偏微分を用いた Wirtinger 微分は

$$
\frac{\partial f}{\partial z^j}
=\frac12\left(\frac{\partial f}{\partial x^j}
-i\frac{\partial f}{\partial y^j}\right),
\qquad
\frac{\partial f}{\partial\bar z^j}
=\frac12\left(\frac{\partial f}{\partial x^j}
+i\frac{\partial f}{\partial y^j}\right).
$$

これは $f$ が正則であることを前提としない。$dx^j=(dz^j+d\bar z^j)/2$、$dy^j=(dz^j-d\bar z^j)/(2i)$ を実座標の微分公式へ代入すると、

$$
\begin{aligned}
df
&=\sum_j\left(f_{x^j}dx^j+f_{y^j}dy^j\right)\\
&=\sum_j\frac{f_{x^j}-if_{y^j}}2\,dz^j
+\sum_j\frac{f_{x^j}+if_{y^j}}2\,d\bar z^j\\
&=\sum_jf_{z^j}dz^j+\sum_jf_{\bar z^j}d\bar z^j.
\end{aligned}
$$

そこで右辺を型別に取り出す。

<a id="def-cm2-02-wirtinger-operators"></a>

<!-- formal-statement-start -->
> **定義（関数に作用する偏微分作用素）**  
> 複素多様体 $X$ 上の滑らかな複素数値関数 $f$ に対し、各正則座標で

$$
\partial f=\sum_{j=1}^n f_{z^j}\,dz^j,
\qquad
\bar\partial f=\sum_{j=1}^n f_{\bar z^j}\,d\bar z^j
$$

> と定める。$\partial f$ は $(1,0)$ 形式、$\bar\partial f$ は $(0,1)$ 形式であり、$df=\partial f+\bar\partial f$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-02-wirtinger-operators -->
**定義の確認**。$f(z)=|z|^2=z\bar z$ なら $f_x=2x,\ f_y=2y$ から

$$
f_z=x-iy=\bar z,\qquad
f_{\bar z}=x+iy=z.
$$

従って $\partial f=\bar z\,dz$、$\bar\partial f=z\,d\bar z$。二つを足すと、先ほど実座標で求めた $df$ に一致する。$z$ と $\bar z$ を形式上の独立な文字と見なしても同じ答えだが、それは Wirtinger 微分公式に基づく計算の略記である。
<!-- definition-example-end -->

## 3. 任意の型別形式への拡張

一般の形式では係数の微分だけでなく、外積の順序による符号が問題になる。[型別余接空間と外積](../CM2-01/index.md#def-cm2-01-pq-form)を使うと、局所的な $(p,q)$ 形式は

$$
\alpha=\sum_{|I|=p,\ |J|=q}
a_{I\bar J}(z,\bar z)\,dz^I\wedge d\bar z^J
$$

と書ける。$I,J$ はそれぞれ昇順の多重添字で、$a_{I\bar J}$ は滑らかな複素数値関数である。

[外微分の積の公式](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を項ごとに適用する。$d(dz^j)=d^2z^j=0$、$d(d\bar z^j)=0$ なので、基底1形式の外微分は消える。従って

$$
\begin{aligned}
d\alpha
&=\sum_{I,J} d a_{I\bar J}\wedge dz^I\wedge d\bar z^J\\
&=\sum_{I,J,k}(a_{I\bar J})_{z^k}\,dz^k\wedge dz^I\wedge d\bar z^J\\
&\quad+\sum_{I,J,k}(a_{I\bar J})_{\bar z^k}\,d\bar z^k\wedge dz^I\wedge d\bar z^J.
\end{aligned}
$$

一行目の右辺は $(p+1,q)$ 型、二行目の右辺は $(p,q+1)$ 型であり、後者を $dz$ が先に来る順に移すときだけ符号 $(-1)^p$ が生じる。ここには $(p+2,q-1)$ などの型は現れない。

<a id="def-cm2-02-dolbeault-operators"></a>

<!-- formal-statement-start -->
> **定義（型別外微分）**  
> $X$ を複素次元 $n$ の複素多様体、$\mathcal A^{p,q}(X)$ を滑らかな複素数値 $(p,q)$ 形式全体とし、$0\le p,q\le n$ とする。[型分解](../CM2-01/index.md#thm-cm2-01-type-decomposition)による射影を $\pi^{r,s}$ と書く。次の線形写像を定義する。

$$
\partial:\mathcal A^{p,q}(X)\longrightarrow\mathcal A^{p+1,q}(X),
\qquad
\partial\alpha=\pi^{p+1,q}(d\alpha),
$$

$$
\bar\partial:\mathcal A^{p,q}(X)\longrightarrow\mathcal A^{p,q+1}(X),
\qquad
\bar\partial\alpha=\pi^{p,q+1}(d\alpha).
$$

> $p>n$ または $q>n$ の形式空間は零空間と約束する。これらをそれぞれ $\partial$、$\bar\partial$ 作用素という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-02-dolbeault-operators -->
**定義の確認**。$\mathbb C^2$ 上で $\alpha=\bar z^1z^2\,dz^1\wedge d\bar z^2$ とする。係数 $a=\bar z^1z^2$ は $a_{z^2}=\bar z^1$、$a_{\bar z^1}=z^2$、その他の Wirtinger 微分は零である。よって

$$
\partial\alpha
=\bar z^1\,dz^2\wedge dz^1\wedge d\bar z^2
=-\bar z^1\,dz^1\wedge dz^2\wedge d\bar z^2,
$$

$$
\begin{aligned}
\bar\partial\alpha
&=z^2\,d\bar z^1\wedge dz^1\wedge d\bar z^2\\
&=-z^2\,dz^1\wedge d\bar z^1\wedge d\bar z^2.
\end{aligned}
$$

> どちらも零とは限らない。型はそれぞれ $(2,1)$ と $(1,2)$ になり、外積の並べ替えの符号も確認できた。
<!-- definition-example-end -->

<a id="thm-cm2-02-local-formula"></a>

<!-- formal-statement-start -->
> **定理（局所公式と座標不変性）**  
> 複素多様体 $X$ の滑らかな $(p,q)$ 形式 $\alpha$ に対し、$\partial\alpha$ と $\bar\partial\alpha$ は正則座標の取り方に依存せず、大域的な滑らかな型別形式を定める。また

$$
d\alpha=\partial\alpha+\bar\partial\alpha
$$

> が成り立つ。正則座標で $\alpha=\sum_{I,J}a_{I\bar J}\,dz^I\wedge d\bar z^J$ と書けば、両作用素は次の係数公式で計算できる。

$$
\partial\alpha
=\sum_{I,J,k}(a_{I\bar J})_{z^k}
\,dz^k\wedge dz^I\wedge d\bar z^J,
$$

$$
\bar\partial\alpha
=\sum_{I,J,k}(a_{I\bar J})_{\bar z^k}
\,d\bar z^k\wedge dz^I\wedge d\bar z^J.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$dz^j$ と $d\bar z^j$ 自身は閉形式なので、外微分は係数だけに作用する。二種類以外の型が出ないことを確認すれば、[前章の型分解の一意性](../CM2-01/index.md#thm-cm2-01-type-decomposition)によって取り出した成分はどの正則座標でも同じである。

<!-- proof-start -->
### 証明

局所公式は定義の直前に計算した通りである。詳しくは、各基底1形式が $dz^j=d(z^j)$ または $d\bar z^j=d(\bar z^j)$ なので、[外微分の二乗零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)によりその微分は零となり、外微分の積の公式を使うと係数の一次微分だけが残る。

$dz^k\wedge dz^I\wedge d\bar z^J$ は $(p+1,q)$ 型であり、$d\bar z^k\wedge dz^I\wedge d\bar z^J$ は $(p,q+1)$ 型である。従ってこれ以外の型成分はなく、和は $d\alpha$ に等しい。

正則座標 $z,w$ を重なる領域で二組取る。[型別形式の座標不変性](../CM2-01/index.md#thm-cm2-01-coordinate-invariance)により $\mathcal A^{r,s}$ の各部分空間は座標によらず定まる。[外微分の座標不変性](../../GEO/GEO7/index.md#thm-geo7-exterior-invariant-formula)により $d\alpha$ 自身も座標で変わらない。[型分解の一意性](../CM2-01/index.md#thm-cm2-01-type-decomposition)から $d\alpha$ の $(p+1,q)$、$(p,q+1)$ 成分も一致する。よって $\partial\alpha,\bar\partial\alpha$ は重なりで整合し、大域的に定まる。境界 $p=n$、$q=n$ では対応する外積は交代性により零となる。$\square$
<!-- proof-end -->

ここで必要なのは、$X$ が正則な遷移関数を持つ複素多様体であることだ。一般の概複素構造だけでは $d$ が上記二型にしか移らないとは限らず、以後の二重複体の証明をそのまま移すことはできない。

## 4. 二乗すると零になる理由

正則座標での係数公式は便利だが、$\partial^2$ や $\bar\partial^2$ の値を全ての係数について計算するのは煩雑である。[外微分の二乗零](../../GEO/GEO7/index.md#def-geo7-exterior-derivative)と型分解の一意性を使うと、一度に三つの恒等式を得られる。

<a id="thm-cm2-02-double-complex-identities"></a>

<!-- formal-statement-start -->
> **定理（型別外微分の三つの恒等式）**  
> 複素多様体 $X$ の任意の滑らかな複素数値 $(p,q)$ 形式 $\alpha$ に対し、

$$
\partial^2\alpha=0,\qquad
\bar\partial^2\alpha=0,\qquad
\partial\bar\partial\alpha+\bar\partial\partial\alpha=0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$d=\partial+\bar\partial$ を二回かけると三種類の型が現れる。合計が零であるだけでは、一般には各項が零とは言えない。しかし今回は型が異なるので、直和分解の一意性がそれぞれを零にする。

<!-- proof-start -->
### 証明

前定理によって $d\alpha=\partial\alpha+\bar\partial\alpha$ である。$\partial\alpha$ は $(p+1,q)$ 型、$\bar\partial\alpha$ は $(p,q+1)$ 型だから、もう一度 $d=\partial+\bar\partial$ を適用して

$$
\begin{aligned}
d^2\alpha
&=d(\partial\alpha)+d(\bar\partial\alpha)\\
&=\partial^2\alpha+\bar\partial\partial\alpha
+\partial\bar\partial\alpha+\bar\partial^2\alpha
\end{aligned}
$$

を得る。一方、[外微分の二乗零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)により左辺は零である。右辺の各成分の型は

$$
\begin{array}{c|c}
(p+2,q)&\partial^2\alpha\\
(p+1,q+1)&\bar\partial\partial\alpha+\partial\bar\partial\alpha\\
(p,q+2)&\bar\partial^2\alpha
\end{array}
$$

である。三つの型は互いに異なる。[型分解定理](../CM2-01/index.md#thm-cm2-01-type-decomposition)の直和性から、各成分は個別に零でなければならない。$p+2>n$ 等の境界では対応する空間が零だから、同じ結論が成り立つ。$\square$
<!-- proof-end -->

**一点注意**。$\partial\bar\partial=0$ と $\bar\partial\partial=0$ が別々に成り立つわけではない。例えば $f=|z|^2$ では

$$
\partial\bar\partial f
=\partial(z\,d\bar z)=dz\wedge d\bar z,\qquad
\bar\partial\partial f
=\bar\partial(\bar z\,dz)
=d\bar z\wedge dz=-dz\wedge d\bar z.
$$

右辺は互いの負であり、いずれも零ではない。和が零になる理由は外積の交代性にも現れている。

## 5. 外積・共役・引き戻しとの整合

作用素を計算のたびに座標で定義し直す必要はない。外積や複素共役との関係を使うと、既知の結果を新しい形式へ移せる。

<a id="prop-cm2-02-graded-leibniz"></a>

<!-- formal-statement-start -->
> **命題（型別の次数付き積の法則）**  
> $X$ 上の滑らかな複素数値形式 $\alpha\in\mathcal A^{p,q}(X)$、$\beta\in\mathcal A^{r,s}(X)$ を取り、$k=p+q$ とする。$D=\partial$ または $D=\bar\partial$ に対し、

$$
D(\alpha\wedge\beta)
=(D\alpha)\wedge\beta+(-1)^k\alpha\wedge D\beta
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$d$ の次数付き積の公式を出発点にし、[外積の型](../CM2-01/index.md#prop-cm2-01-wedge-conjugation)が加法的であることによって目的の成分を取り出す。

<!-- proof-start -->
### 証明

[外微分の次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を $\alpha,\beta$ に適用すると、$\deg\alpha=k$ より

$$
d(\alpha\wedge\beta)
=d\alpha\wedge\beta+(-1)^k\alpha\wedge d\beta.
$$

$d\alpha=\partial\alpha+\bar\partial\alpha$、$d\beta=\partial\beta+\bar\partial\beta$ を代入する。$\alpha\wedge\beta$ は $(p+r,q+s)$ 型なので、$(p+r+1,q+s)$ 成分だけを取り出すと、[外積の型の加法性](../CM2-01/index.md#prop-cm2-01-wedge-conjugation)より

$$
\partial(\alpha\wedge\beta)
=(\partial\alpha)\wedge\beta
+(-1)^k\alpha\wedge(\partial\beta).
$$

$(p+r,q+s+1)$ 成分を取り出せば同じ符号の $\bar\partial$ の公式が得られる。$\square$
<!-- proof-end -->

<a id="prop-cm2-02-conjugation-pullback"></a>

<!-- formal-statement-start -->
> **命題（共役と正則引き戻し）**  
> $X,Y$ を複素多様体、$F:X\to Y$ を正則写像、$\alpha$ を $Y$ 上の滑らかな複素数値型別形式とする。$X$ 上の型別形式 $\eta$ について

$$
\overline{\partial\eta}=\bar\partial\,\overline\eta,
\qquad
\overline{\bar\partial\eta}=\partial\,\overline\eta
$$

> が成り立つ。また

$$
F^*(\partial\alpha)=\partial(F^*\alpha),
\qquad
F^*(\bar\partial\alpha)=\bar\partial(F^*\alpha)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

実作用素 $d$ は複素共役と交換する。また外微分は滑らかな写像による引き戻しと交換する。正則性により型も保存するので、結果の各型を比較すればよい。

<!-- proof-start -->
### 証明

局所実座標で $d$ の公式の係数は実数なので $\overline{d\eta}=d\bar\eta$ である。[共役による型交換](../CM2-01/index.md#prop-cm2-01-wedge-conjugation)により、$\overline{\partial\eta}$ は $(q,p+1)$ 型、$\overline{\bar\partial\eta}$ は $(q+1,p)$ 型である。一方、

$$
d\bar\eta=\partial\bar\eta+\bar\partial\bar\eta
=\overline{d\eta}
=\overline{\partial\eta}+\overline{\bar\partial\eta}.
$$

二種類の型を比較すると、命題の最初の二式が得られる。

次に[外微分と引き戻しの可換性](../../GEO/GEO7/index.md#thm-geo7-pullback-commutes-d)から

$$
d(F^*\alpha)=F^*(d\alpha)
=F^*(\partial\alpha)+F^*(\bar\partial\alpha).
$$

[正則引き戻しの型保存](../CM2-01/index.md#prop-cm2-01-holomorphic-pullback)により右辺の二項の型は、左辺の $\partial(F^*\alpha)$、$\bar\partial(F^*\alpha)$ とそれぞれ一致する。型分解の一意性から所望の二式を得る。$\square$
<!-- proof-end -->

**具体例**。$F:\mathbb C\to\mathbb C,\ F(t)=t^2$、$f(w)=|w|^2$ とする。$\bar\partial f=w\,d\bar w$ なので

$$
F^*(\bar\partial f)
=t^2\,d(\bar t^2)
=2t^2\bar t\,d\bar t.
$$

他方 $f\circ F=t^2\bar t^2$ だから $(f\circ F)_{\bar t}=2t^2\bar t$、従って $\bar\partial(f\circ F)=2t^2\bar t\,d\bar t$ となり一致する。

## 6. 正則性の判定と二重複体

関数については、$\bar\partial f$ が零になることは単なる計算上の偶然ではない。$f$ の実部と虚部を $f=u+iv$ と書くと、

$$
f_{\bar z}
=\frac12(f_x+if_y)
=\frac12\{(u_x-v_y)+i(v_x+u_y)\}.
$$

従って $f_{\bar z}=0$ は $u_x=v_y$ かつ $u_y=-v_x$ という Cauchy–Riemann 方程式に一致する。

<a id="prop-cm2-02-holomorphic-function"></a>

<!-- formal-statement-start -->
> **命題（正則関数の判定）**  
> $X$ を複素多様体、$f:X\to\mathbb C$ を $C^1$ 級の関数とする。$f$ が正則であることと、各局所正則座標で全ての $f_{\bar z^j}$ が零であることは同値である。これは $\bar\partial f=0$ と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

複素一変数のCauchy–Riemann条件を、他の座標を固定して各座標方向へ適用する。$C^1$ 級という仮定がこの特徴づけの十分性を支える。

<!-- proof-start -->
### 証明

正則なら各座標変数で複素微分可能なので Cauchy–Riemann 条件を満たし、$f_{\bar z^j}=0$ である。逆に全ての $f_{\bar z^j}=0$ なら、各座標変数に他の変数を固定した制限は $C^1$ 級で Cauchy–Riemann 条件を満たすので正則となる。さらに実微分の存在と連続性により、増分 $h\in\mathbb C^n$ について $f(z+h)-f(z)=D_{\mathbb R}f(z)[h]+o(\|h\|)$ である。Cauchy–Riemann 条件はこの実微分が複素線形であることを意味するので、$f$ は複素微分可能であり、[高次元正則写像の定義](../CM1-01/index.md#def-cm1-01-holomorphic-map)を満たす。最後に $\{d\bar z^j\}$ が独立な局所基底であることから、$\bar\partial f=0$ と各係数の消滅が同値となる。$\square$
<!-- proof-end -->

なおこの判定は滑らかな関数に対する $\bar\partial$ の定義を先に構成した上での結果であり、$\bar\partial$ 方程式 $\bar\partial u=\gamma$ を任意の $\gamma$ について解けると主張しているわけではない。局所可解性の条件とその証明は次章で扱う。

<a id="def-cm2-02-double-complex"></a>

<!-- formal-statement-start -->
> **定義（型別形式の二重複体）**  
> 複素多様体 $X$ 上の滑らかな型別形式 $\mathcal A^{p,q}(X)$ を第一象限 $p,q\ge0$ に配置し、水平方向の写像を $\partial$、垂直方向の写像を $\bar\partial$ とする。

$$
\mathcal A^{p,q}(X)
\xrightarrow{\ \partial\ }
\mathcal A^{p+1,q}(X),
\qquad
\mathcal A^{p,q}(X)
\xrightarrow{\ \bar\partial\ }
\mathcal A^{p,q+1}(X).
$$

> すべての升目で $\partial^2=\bar\partial^2=0$ と $\partial\bar\partial+\bar\partial\partial=0$ が成り立つため、これを型別微分形式の二重複体という。各 $k\ge0$ について全次数 $k=p+q$ の直和に作用する微分は $d=\partial+\bar\partial$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-02-double-complex -->
**定義の確認**。複素次元1では $\mathcal A^{0,0}$ の次に $\mathcal A^{1,0}$ と $\mathcal A^{0,1}$ があり、両者から $\mathcal A^{1,1}$ に至る二本の道を持つ。$f=z\bar z$ を出発点とすると

$$
\partial f=\bar z\,dz,\quad
\bar\partial f=z\,d\bar z,\quad
\bar\partial(\partial f)=-dz\wedge d\bar z,\quad
\partial(\bar\partial f)=dz\wedge d\bar z.
$$

> 二本の道は同じ値になるのでなく、**符号を反転して一致する**。この符号が二重複体の反可換性であり、全微分 $d$ の二乗を零にする。
<!-- definition-example-end -->

この配置に対して $\bar\partial$ のみを固定した $p$ 列で追えば $\bar\partial^2=0$ を満たす一つの鎖複体になる。$\bar\partial$ の核と像の商が次の講義群で扱う Dolbeault コホモロジーへの入口である。ただし、その商の幾何学的計算には、さらに局所 $\bar\partial$ 方程式の解析が要る。

## 7. 演習：係数微分から反可換性まで

### Level A

<a id="ex-cm2-02-a01"></a>
#### CM2-02-A01 実座標から分ける
- Level: A

$\mathbb C$ 上の $f(x+iy)=x^2-y^2+2ixy$ に対し $\partial f,\bar\partial f$ を求めよ。

<!-- solution-start -->
**詳細解答**。$f_x=2x+2iy$、$f_y=-2y+2ix$ より

$$
\begin{aligned}
f_z&=\tfrac12(f_x-if_y)
=\tfrac12\{2x+2iy+2iy+2x\}=2(x+iy)=2z,\\
f_{\bar z}&=\tfrac12(f_x+if_y)
=\tfrac12\{2x+2iy-2iy-2x\}=0.
\end{aligned}
$$

[関数の作用素の定義](#def-cm2-02-wirtinger-operators)から $\partial f=2z\,dz$、$\bar\partial f=0$。$f=z^2$ で正則なこととも一致する。
<!-- solution-end -->

<a id="ex-cm2-02-a02"></a>
#### CM2-02-A02 共役座標の微分
- Level: A

$\mathbb C$ 上で $g(z)=\bar z^3+z\bar z$ に対して $\partial g,\bar\partial g$ を計算せよ。

<!-- solution-start -->
**詳細解答**。Wirtinger 微分で $g_z=\bar z$、$g_{\bar z}=3\bar z^2+z$ なので

$$
\partial g=\bar z\,dz,\qquad
\bar\partial g=(3\bar z^2+z)\,d\bar z.
$$

検算すると、$dg=d(\bar z^3)+d(z\bar z)=3\bar z^2d\bar z+\bar z\,dz+z\,d\bar z$ で二つの和に等しい。
<!-- solution-end -->

<a id="ex-cm2-02-a03"></a>
#### CM2-02-A03 外積の符号
- Level: A

$\mathbb C^2$ 上の $\alpha=z^1\bar z^2\,dz^2$ に対して $\partial\alpha,\bar\partial\alpha$ を標準順の外積で表せ。

<!-- solution-start -->
**詳細解答**。$a=z^1\bar z^2$ なら $a_{z^1}=\bar z^2,\ a_{\bar z^2}=z^1$、他は零。[局所公式](#thm-cm2-02-local-formula)を $\alpha=a\,dz^2$ に適用すると

$$
\partial\alpha=\bar z^2\,dz^1\wedge dz^2,
$$

$$
\bar\partial\alpha=z^1\,d\bar z^2\wedge dz^2
=-z^1\,dz^2\wedge d\bar z^2.
$$

$dz^2$ と $d\bar z^2$ を交換する一回の操作により負号が付く。
<!-- solution-end -->

<a id="ex-cm2-02-a04"></a>
#### CM2-02-A04 二乗零の直接検算
- Level: A

$\mathbb C$ 上の $f=z^2\bar z^3$ について $\partial^2 f$ と $\bar\partial^2 f$ が零になることを、二回の作用で直接確かめよ。

<!-- solution-start -->
**詳細解答**。$\partial f=2z\bar z^3\,dz$、$\bar\partial f=3z^2\bar z^2\,d\bar z$。もう一度それぞれの作用をかけると

$$
\partial^2 f=2\bar z^3\,dz\wedge dz=0,\qquad
\bar\partial^2 f=6z^2\bar z\,d\bar z\wedge d\bar z=0.
$$

複素次元1では $(2,0)$ および $(0,2)$ 形式の空間が零になることに対応する。
<!-- solution-end -->

<a id="ex-cm2-02-a05"></a>
#### CM2-02-A05 型と次数の一覧
- Level: A

複素次元 $2$ の複素多様体で $\alpha\in\mathcal A^{1,1}$、$\beta\in\mathcal A^{2,0}$ とする。$\partial\alpha,\bar\partial\alpha,\partial\beta,\bar\partial\beta$ の型と、型だけから零と分かるものを挙げよ。

<!-- solution-start -->
**詳細解答**。定義では $\partial$ は第一指数を1増やし、$\bar\partial$ は第二指数を1増やす。従って

$$
\partial\alpha\in\mathcal A^{2,1},\quad
\bar\partial\alpha\in\mathcal A^{1,2},\quad
\partial\beta\in\mathcal A^{3,0}=0,\quad
\bar\partial\beta\in\mathcal A^{2,1}.
$$

$n=2$ では $dz$ を独立に3本外積できないので $\partial\beta=0$。他の三つは型だけでは零といえない。
<!-- solution-end -->

### Level B

<a id="ex-cm2-02-b01"></a>
#### CM2-02-B01 反可換性を手で確かめる
- Level: B

$\mathbb C^2$ 上の $f=z^1\bar z^2+\bar z^1z^2$ について $\partial\bar\partial f$ と $\bar\partial\partial f$ をそれぞれ計算せよ。

<!-- solution-start -->
**詳細解答**。まず

$$
\partial f=\bar z^2\,dz^1+\bar z^1\,dz^2,\qquad
\bar\partial f=z^2\,d\bar z^1+z^1\,d\bar z^2.
$$

次に各係数を適切な型で微分する。$\partial z^2=dz^2$、$\partial z^1=dz^1$ より

$$
\partial\bar\partial f
=dz^2\wedge d\bar z^1+dz^1\wedge d\bar z^2.
$$

一方 $\bar\partial\bar z^2=d\bar z^2$、$\bar\partial\bar z^1=d\bar z^1$ より

$$
\begin{aligned}
\bar\partial\partial f
&=d\bar z^2\wedge dz^1+d\bar z^1\wedge dz^2\\
&=-dz^1\wedge d\bar z^2-dz^2\wedge d\bar z^1.
\end{aligned}
$$

従って和が零となる。[三つの恒等式](#thm-cm2-02-double-complex-identities)の中間項を具体的に再現した。
<!-- solution-end -->

<a id="ex-cm2-02-b02"></a>
#### CM2-02-B02 積の法則の符号
- Level: B

$\mathbb C^2$ 上で $\alpha=\bar z^1\,dz^2$、$\beta=z^1\,d\bar z^2$ とする。$\bar\partial(\alpha\wedge\beta)$ を直接計算し、次数付き積の法則から求めた答えと照合せよ。

<!-- solution-start -->
**詳細解答**。まず $\alpha\wedge\beta=z^1\bar z^1\,dz^2\wedge d\bar z^2$。局所公式により

$$
\bar\partial(\alpha\wedge\beta)
=z^1\,d\bar z^1\wedge dz^2\wedge d\bar z^2
=-z^1\,dz^2\wedge d\bar z^1\wedge d\bar z^2.
$$

他方、$\deg\alpha=1$ だから積の法則の符号は $-1$。$\bar\partial\alpha=d\bar z^1\wedge dz^2$、$\bar\partial\beta=0$ であるから

$$
\begin{aligned}
(\bar\partial\alpha)\wedge\beta-\alpha\wedge\bar\partial\beta
&=(d\bar z^1\wedge dz^2)\wedge(z^1\,d\bar z^2)-0\\
&=-z^1\,dz^2\wedge d\bar z^1\wedge d\bar z^2.
\end{aligned}
$$

二通りの結果が一致した。
<!-- solution-end -->

<a id="ex-cm2-02-b03"></a>
#### CM2-02-B03 正則引き戻しの計算
- Level: B

$F:\mathbb C\to\mathbb C^2$ を $F(t)=(t,t^2)$、$Y=\mathbb C^2$ 上の $(0,1)$ 形式を $\eta=w^1\,d\bar w^2$ とする。$\bar\partial(F^*\eta)$ と $F^*(\bar\partial\eta)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$F$ は成分が多項式なので正則であり、[引き戻しとの可換性](#prop-cm2-02-conjugation-pullback)を適用できる。まず

$$
F^*\eta=t\,d(\bar t^2)=2t\bar t\,d\bar t.
$$

$\bar\partial(2t\bar t)=2t\,d\bar t$ だから

$$
\bar\partial(F^*\eta)
=2t\,d\bar t\wedge d\bar t=0.
$$

他方、$\bar\partial\eta=\bar\partial(w^1)\wedge d\bar w^2=0$（$w^1$ は正則）より $F^*(\bar\partial\eta)=0$。始域 $\mathbb C$ では全ての $(0,2)$ 形式が零となることからも検算できる。
<!-- solution-end -->

<a id="ex-cm2-02-b04"></a>
#### CM2-02-B04 正則関数と非正則関数の区別
- Level: B

開集合 $U=\mathbb C\setminus\{0\}$ 上の $f(z)=1/z$、$g(z)=1/\bar z$ について $\partial f,\bar\partial f,\partial g,\bar\partial g$ を計算し、正則性を判定せよ。

<!-- solution-start -->
**詳細解答**。$z\ne0$ でどちらも滑らかで、Wirtinger 微分は

$$
f_z=-z^{-2},\quad f_{\bar z}=0,\qquad
g_z=0,\quad g_{\bar z}=-\bar z^{-2}.
$$

従って

$$
\partial f=-z^{-2}dz,\quad\bar\partial f=0,\qquad
\partial g=0,\quad\bar\partial g=-\bar z^{-2}d\bar z.
$$

[正則関数の判定](#prop-cm2-02-holomorphic-function)から $f$ は $U$ 上正則、$g$ はどの開部分集合上でも正則でない。原点を除外したのは逆数がそこで定義されないためであり、$g$ の非正則性は除外点の問題ではなく $\bar\partial g\ne0$ に由来する。
<!-- solution-end -->

### Level C

<a id="ex-cm2-02-c01"></a>
#### CM2-02-C01 型別外微分・符号・二重複体の総合
- Level: C

$\mathbb C^2$ 上に滑らかな $(1,0)$ 形式

$$
\gamma=\bar z^1 z^2\,dz^1+z^1\bar z^2\,dz^2
$$

を置く。

1. $\partial\gamma$ と $\bar\partial\gamma$ を求め、それぞれの型を示せ。
2. $\partial\bar\partial\gamma$、$\bar\partial\partial\gamma$ を別々に計算し、和が零であることを確かめよ。
3. $\gamma$ が閉形式でないことを、$d\gamma$ の値が零でない具体的な点から示せ。

<!-- solution-start -->
**詳細解答**。

**(1)** 係数を $a=\bar z^1z^2$、$b=z^1\bar z^2$ とおくと

$$
a_{z^2}=\bar z^1,\quad a_{\bar z^1}=z^2,\qquad
b_{z^1}=\bar z^2,\quad b_{\bar z^2}=z^1,
$$

で、ここに書かなかった一次 Wirtinger 微分は零。局所公式から

$$
\begin{aligned}
\partial\gamma
&=\bar z^1\,dz^2\wedge dz^1
+\bar z^2\,dz^1\wedge dz^2\\
&=(\bar z^2-\bar z^1)\,dz^1\wedge dz^2
\quad\text{（$(2,0)$ 型）},
\end{aligned}
$$

$$
\begin{aligned}
\bar\partial\gamma
&=z^2\,d\bar z^1\wedge dz^1
+z^1\,d\bar z^2\wedge dz^2\\
&=-z^2\,dz^1\wedge d\bar z^1
-z^1\,dz^2\wedge d\bar z^2
\quad\text{（$(1,1)$ 型）}.
\end{aligned}
$$

**(2)** $\partial\gamma$ の係数 $c=\bar z^2-\bar z^1$ に $\bar\partial$ を作用させると

$$
\begin{aligned}
\bar\partial\partial\gamma
&=(d\bar z^2-d\bar z^1)\wedge dz^1\wedge dz^2\\
&=dz^1\wedge dz^2\wedge d\bar z^2
-dz^1\wedge dz^2\wedge d\bar z^1.
\end{aligned}
$$

$\bar\partial\gamma$ の二項に $\partial$ を作用させると

$$
\begin{aligned}
\partial\bar\partial\gamma
&=-dz^2\wedge dz^1\wedge d\bar z^1
-dz^1\wedge dz^2\wedge d\bar z^2\\
&=dz^1\wedge dz^2\wedge d\bar z^1
-dz^1\wedge dz^2\wedge d\bar z^2.
\end{aligned}
$$

従って両者は確かに互いの負である。$\partial\bar\partial\gamma$ と $\bar\partial\partial\gamma$ の型はともに $(2,1)$ なので、[反可換性定理](#thm-cm2-02-double-complex-identities)の中間項の消滅を具体計算したことになる。

**(3)** $d\gamma=\partial\gamma+\bar\partial\gamma$ であり、点 $(z^1,z^2)=(0,1)$ で $(2,0)$ 成分の係数は $\bar z^2-\bar z^1=1$。よって

$$
(\partial\gamma)_{(0,1)}
(\partial_{z^1},\partial_{z^2})=1\ne0.
$$

[型分解の一意性](../CM2-01/index.md#thm-cm2-01-type-decomposition)から別型の $\bar\partial\gamma$ と打ち消すことはない。従って $d\gamma\ne0$、すなわち $\gamma$ は閉形式でない。
<!-- solution-end -->

## 8. 次に必要となること

外微分を型で分けた結果、$\partial$ は第一指数を、$\bar\partial$ は第二指数を1増やし、どちらも二乗零、二つを続ける順序は負号を伴って入れ替わる。複素多様体の正則な座標遷移があるから、この構造は局所公式にとどまらず大域的に意味を持つ。

ただし $\bar\partial^2=0$ から分かるのは、$\bar\partial u=\gamma$ を解くための**必要条件** $\bar\partial\gamma=0$ だけである。十分性はまだ示していない。次章で局所的にその方程式を解くための解析を用意する。
