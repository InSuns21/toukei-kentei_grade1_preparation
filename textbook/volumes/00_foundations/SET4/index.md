# SET4 超限再帰：以前の全段階から次を定義する

<!-- definition-example-audit: strict -->

超限帰納法は、既に定義された対象について

$$
\forall\beta<\alpha
$$

の情報を使い、$\alpha$ でも性質が成り立つことを証明する道具でした。

しかし、順序数の加法や累積階層では、そもそも各段階の対象そのものを

$$
F(\alpha)
=
\text{「それ以前の }F(\beta)\text{ 全体から作る値」}
$$

として定義したくなります。

自然数では再帰

$$
a_0=c,\qquad
a_{n+1}=G(a_n)
$$

で十分でした。順序数では極限段階 $\lambda$ に「直前」がないため、

$$
F|_\lambda
=
\{(\beta,F(\beta)):\beta<\lambda\}
$$

という **それ以前の関数全体** を入力にする必要があります。

---

## 1. 超限再帰の形

<a id="def-set4-recursion-rule"></a>
<!-- formal-statement-start -->
### 定義（超限再帰規則）

順序数を定義域にもつ任意の関数 $h$ に対して、一意な集合 $G(h)$ を対応させる規則 $G$ を考える。

関数 $F$ が

$$
F(\alpha)=G(F|_\alpha)
$$

を各段階 $\alpha$ で満たすとき、$F$ は規則 $G$ に従って超限再帰で定められているという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set4-recursion-rule -->
**定義の確認。** 例えば

$$
G(h)=\bigcup\operatorname{ran}(h)
$$

とすれば、極限段階ではそれ以前に現れた値を全部合併する規則になります。

重要なのは $G$ の入力が最後の値一個ではなく、制限関数 $F|_\alpha$ 全体であることです。
<!-- definition-example-end -->

ここで $G$ は「集合としての関数」である必要はありません。集合論の論理式によって、各入力 $h$ に一意な出力集合が定まる **定義可能な一価規則** として扱います。

---

## 2. 超限再帰定理

<a id="thm-set4-transfinite-recursion"></a>
<!-- formal-statement-start -->
### 定理（超限再帰定理）

$\theta$ を順序数とする。

順序数を定義域にもつ任意の関数 $h$ に対して、一意な集合 $G(h)$ が定まる規則 $G$ があるとする。

このとき、定義域が $\theta$ である一意な関数 $F$ が存在して、全ての $\alpha<\theta$ で

$$
\boxed{
F(\alpha)=G(F|_\alpha)
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

存在証明では、いきなり完成した $F$ を仮定しません。

1. ある初期区間まで再帰式を満たす **近似関数**を考える。
2. 二つの近似は共通部分で一致することを超限帰納法で示す。
3. 段階 $\alpha$ より前の値が一意に定まっているなら、置換公理図式でそれらを一つの関数 $h_\alpha$ に集める。
4. $G(h_\alpha)$ を新しい値として一段延長する。
5. 最後に置換で全段階の値を集め、関数 $F$ を作る。

ここで **置換公理図式** が「各 $\beta<\alpha$ に一意な値がある」から「値を全部まとめた集合がある」へ進む役割を担います。

<!-- proof-start -->
### 証明

順序数 $\gamma\le\theta$ を定義域とする関数 $f$ が

$$
f(\alpha)
=
G(f|_\alpha)
\qquad(\alpha<\gamma)
$$

を満たすとき、$f$ を長さ $\gamma$ の **近似** と呼びます。

まず二つの近似 $f,g$ は共通定義域で一致することを示します。

共通定義域を $\delta$ とし、$\alpha<\delta$ に関する超限帰納法を使います。$\beta<\alpha$ で

$$
f(\beta)=g(\beta)
$$

が全て成り立つと仮定すると、

$$
f|_\alpha=g|_\alpha.
$$

従って規則 $G$ の一価性から

$$
f(\alpha)
=
G(f|_\alpha)
=
G(g|_\alpha)
=
g(\alpha).
$$

よって超限帰納法により、二つの近似は共通部分で一致します。

次に、各 $\alpha\le\theta$ について長さ $\alpha$ の近似が存在することを超限帰納法で示します。

$\alpha=0$ では空関数が近似です。

$\alpha>0$ とし、全ての $\beta<\alpha$ で長さ $\beta$ の近似が存在すると仮定します。

各 $\beta<\alpha$ を固定します。帰納法の仮定から長さ $\beta$ の近似 $f_\beta$ が存在します。これを一段だけ延長し、

$
f_\beta^+
=
f_\beta
\cup
\{(\beta,G(f_\beta))\}
$

と置きます。$f_\beta$ の定義域は $\beta$ なので新しい組の第一成分 $\beta$ は既存の定義域に入っておらず、$f_\beta^+$ は定義域 $\beta+1$ の関数です。さらに古い段階では $f_\beta$ が再帰式を満たし、新しい段階では定義そのものから

$
f_\beta^+(\beta)
=
G(f_\beta)
=
G(f_\beta^+|_\beta)
$

なので、$f_\beta^+$ は長さ $\beta+1$ の近似です。

二つの長さ $\beta+1$ の近似は両立性により $\beta$ で同じ値を取ります。そこで

$
y_\beta
=
f_\beta^+(\beta)
$

と置けば、$y_\beta$ は近似の選び方に依らず一意です。

したがって

$
\beta\longmapsto y_\beta
$

は $\alpha$ 上で一意な対応を定めます。SET1 の[置換公理図式](../SET1/index.md#axiom-set1-replacement)により、値の集合

$
\{y_\beta:\beta<\alpha\}
$

を一つの集合として集められます。従ってグラフ

$
h_\alpha
=
\{(\beta,y_\beta):\beta<\alpha\}
$

も集合として存在し、定義域 $\alpha$ の関数になります。

固定した $\beta<\alpha$ について、$h_\alpha|_\beta$ と $f_\beta$ はどちらも長さ $\beta$ の近似なので、両立性から

$
h_\alpha|_\beta=f_\beta.
$

したがって

$
h_\alpha(\beta)
=
y_\beta
=
G(f_\beta)
=
G(h_\alpha|_\beta).
$

よって $h_\alpha$ 自身が長さ $\alpha$ の近似です。

これで全ての $\alpha\le\theta$ に近似が存在します。特に長さ $\theta$ の近似 $F$ が存在し、定義から

$$
F(\alpha)=G(F|_\alpha)
$$

を満たします。

一意性は、二つの長さ $\theta$ の近似が共通定義域 $\theta$ 上で一致することから従います。$\square$
<!-- proof-end -->

---

## 3. 自然数の再帰は超限再帰の特別な場合

$\theta=\omega$ とすれば、各 $n$ は $0$ または後続順序数です。通常の再帰

$$
a_0=c,
\qquad
a_{n+1}=H(a_n)
$$

は、$F|_0$ では $c$ を返し、$F|_{n+1}$ では最後の値 $F(n)$ に $H$ を適用する規則 $G$ として書けます。

超限再帰が新しく必要になるのは、$\omega$ 以上の極限段階で

$$
F(\lambda)
$$

を「直前の一個」から決められないためです。

---

## 4. 一般の整列集合には一意な順序型がある

SET2 では、一般の整列集合の順序型の存在証明を保留しました。超限再帰が得られたので回収します。

<a id="thm-set4-order-type"></a>
<!-- formal-statement-start -->
### 定理（整列集合の順序型）

$(X,\preceq)$ を整列集合とする。

このとき一意な順序数 $\alpha$ が存在して、

$$
(X,\preceq)
$$

と、SET2 で定めた順序数の標準整列

$$
(\alpha,\preceq_\alpha)
$$

は順序同型である。
<!-- formal-statement-end -->

### 証明

まず二つの順序数が順序同型なら等しいことを確認します。

順序数 $\alpha,\beta$ と順序同型

$$
\phi:(\alpha,\preceq_\alpha)\to(\beta,\preceq_\beta)
$$

があるとします。$\alpha\ne\beta$ と仮定し、[順序数の三分律](../SET2/index.md#thm-set2-ordinal-trichotomy)により、必要なら $\alpha,\beta$ を入れ替えて

$$
\alpha\in\beta
$$

とします。

$\phi$ が恒等写像でなければ、

$$
D=\{\xi\in\alpha:\phi(\xi)\ne\xi\}
$$

は非空であり、$\alpha$ の整列性から最小元 $\xi_0$ を持ちます。$\eta\in\xi_0$ なら最小性から $\phi(\eta)=\eta$ です。

順序同型は $\xi_0$ より前の元全体を $\phi(\xi_0)$ より前の元全体へ写すので、

$$
\phi[\xi_0]=\phi(\xi_0).
$$

左辺では全ての $\eta\in\xi_0$ が固定されるため

$$
\phi[\xi_0]=\xi_0.
$$

従って $\phi(\xi_0)=\xi_0$ となり矛盾です。

よって $\phi$ は $\alpha$ 上で恒等写像です。しかし $\alpha\in\beta$ なので $\alpha$ は $\beta$ の真部分集合であり、恒等写像 $\alpha\to\beta$ は全射ではありません。これも $\phi$ が順序同型であることに反します。

したがって、順序同型な二順序数は等しいことが分かりました。

次に存在を示します。各 $x\in X$ について前方部分

$$
X_{<x}
=
\{y\in X:y\prec x\}
$$

を考えます。ここで $y\prec x$ は

$$
y\preceq x,\qquad y\ne x
$$

の略記です。

「$X_{<x}$ がある順序数と順序同型である」ことを全ての $x\in X$ について示します。反対に、そうでない点があると仮定し、その集合の $\preceq$-最小元を $x_0$ とします。

すると全ての $y\prec x_0$ について、$X_{<y}$ はある順序数 $\alpha_y$ と順序同型です。最初に示した一意性から、この $\alpha_y$ は $y$ ごとに一意です。

従って[置換公理図式](../SET1/index.md#axiom-set1-replacement)により、

$$
A_0
=
\{\alpha_y:y\prec x_0\}
$$

は集合です。

$y\prec z\prec x_0$ とします。$X_{<y}$ は $X_{<z}$ の真の初期部分です。$X_{<z}$ と $\alpha_z$ の順序同型で像を取ると、その像は $\alpha_z$ の真の初期部分なので、ある $\delta\in\alpha_z$ に等しくなります。この初期部分は $X_{<y}$ と順序同型なので、順序数の一意性から

$$
\delta=\alpha_y.
$$

従って

$$
y\prec z
\Longrightarrow
\alpha_y\in\alpha_z.
$$

逆に $\alpha_y\in\alpha_z$ とします。$X$ は全順序なので、$y=z$、$y\prec z$、$z\prec y$ のいずれかです。$y=z$ なら $\alpha_y=\alpha_z$ に反し、$z\prec y$ なら上で示した含意から $\alpha_z\in\alpha_y$ となって順序数の三分律に反します。よって $y\prec z$ です。

したがって

$$
y\longmapsto\alpha_y
$$

は $X_{<x_0}$ と $A_0$ の順序同型です。

さらに $A_0$ が順序数であることを確認します。$\delta\in\alpha_z\in A_0$ とすると、$\alpha_z$ と $X_{<z}$ の順序同型により、$\delta=\alpha_y$ となる $y\prec z$ が存在します。従って $\delta\in A_0$ であり、$A_0$ は推移的です。

また $A_0$ の任意の非空部分集合 $B$ を取ると、その逆像

$$
\{y\prec x_0:\alpha_y\in B\}
$$

は $X_{<x_0}$ の非空部分集合なので最小元を持ちます。その像が $B$ の最小元です。従って $\preceq_{A_0}$ は $A_0$ を整列し、$A_0$ は順序数です。

これは $X_{<x_0}$ が順序数 $A_0$ と順序同型であることを意味し、$x_0$ の選び方に矛盾します。

よって全ての $x\in X$ に一意な順序数 $\alpha_x$ が対応します。再び置換公理図式で

$$
\alpha
=
\{\alpha_x:x\in X\}
$$

を集合として取ります。

先ほどと同じ議論により、

$$
x\prec y
\Longleftrightarrow
\alpha_x\in\alpha_y
$$

であり、$\alpha$ は推移的で $\preceq_\alpha$ により整列されます。従って $\alpha$ は順序数で、

$$
x\longmapsto\alpha_x
$$

は $(X,\preceq)$ から $(\alpha,\preceq_\alpha)$ への順序同型です。

最後に、別の順序数 $\beta$ も $X$ と順序同型なら、合成により $\alpha$ と $\beta$ が順序同型です。冒頭の一意性から

$$
\alpha=\beta.
$$

以上で存在と一意性が示されました。$\square$
<!-- proof-end -->

<a id="def-set4-order-type"></a>
<!-- formal-statement-start -->
### 定義（順序型）

整列集合 $(X,\prec)$ と順序同型な一意な順序数を

$$
\operatorname{otp}(X,\prec)
$$

と書き、$(X,\prec)$ の **順序型** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set4-order-type -->
**定義の確認。**

自然な順序を入れた

$$
\{a,b,c\},
\qquad
a\prec b\prec c
$$

の順序型は

$$
3=\{0,1,2\}
$$

です。対応は $a\mapsto0$, $b\mapsto1$, $c\mapsto2$ です。
<!-- definition-example-end -->

---

## 5. 順序数の加法

順序数の加法は、右側の順序数を何段たどるかによって再帰的に定義します。

<a id="def-set4-ordinal-addition"></a>
<!-- formal-statement-start -->
### 定義（順序数の加法）

順序数 $\alpha,\beta$ に対し、$\beta$ に関する超限再帰で

$$
\alpha+0=\alpha,
$$

$$
\alpha+(\gamma+1)=S(\alpha+\gamma),
$$

極限順序数 $\lambda$ に対して

$$
\alpha+\lambda
=
\bigcup_{\gamma<\lambda}(\alpha+\gamma)
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set4-ordinal-addition -->
**定義の確認。**

有限段階では通常の加法と一致します。

一方、

$$
1+\omega
=
\bigcup_{n<\omega}(1+n).
$$

各 $1+n$ は有限順序数で、その合併は全ての有限順序数を集めた $\omega$ なので

$$
1+\omega=\omega.
$$

しかし

$$
\omega+1=S(\omega)
$$

であり、

$$
\omega\in\omega+1
$$

なので

$$
\omega+1>\omega.
$$

従って順序数加法は可換ではありません。
<!-- definition-example-end -->

---

## 6. 順序数の乗法と冪

<a id="def-set4-ordinal-multiplication"></a>
<!-- formal-statement-start -->
### 定義（順序数の乗法）

順序数 $\alpha,\beta$ に対し、$\beta$ に関する超限再帰で

$$
\alpha\cdot0=0,
$$

$$
\alpha\cdot(\gamma+1)
=
\alpha\cdot\gamma+\alpha,
$$

極限順序数 $\lambda$ に対して

$$
\alpha\cdot\lambda
=
\bigcup_{\gamma<\lambda}
\alpha\cdot\gamma
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set4-ordinal-multiplication -->
**定義の確認。**

$$
2\cdot\omega
=
\bigcup_{n<\omega}2n
=
\omega.
$$

一方

$$
\omega\cdot2
=
\omega+\omega
>
\omega.
$$

有限個ずつを無限回並べるのと、無限列を二本順に並べるのでは順序型が異なります。
<!-- definition-example-end -->

<a id="def-set4-ordinal-exponentiation"></a>
<!-- formal-statement-start -->
### 定義（順序数の冪）

順序数 $\alpha,\beta$ に対し、まず

$
\alpha^0=1
$

と定める。

$\beta>0$ については、$\alpha=0$ なら

$
0^\beta=0
$

と定める。

$\alpha>0$ では $\beta$ に関する超限再帰で

$
\alpha^{\gamma+1}
=
\alpha^\gamma\cdot\alpha,
$

非零極限順序数 $\lambda$ に対して

$
\alpha^\lambda
=
\bigcup_{\gamma<\lambda}
\alpha^\gamma
$

と定める。

$\alpha=0$ を別に扱うのは、極限段階の合併へ $\alpha^0=1$ をそのまま含めると $0^\lambda$ の標準的な値 $0$ を再現しないためである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set4-ordinal-exponentiation -->
**定義の確認。**

$$
\omega^0=1,
\qquad
\omega^1=\omega,
\qquad
\omega^2=\omega\cdot\omega.
$$

極限指数では例えば

$$
\omega^\omega
=
\bigcup_{n<\omega}\omega^n.
$$

ここでも極限段階では直前の一個ではなく、それ以前の全値を合併します。
<!-- definition-example-end -->

---

## 7. 演習

### Level A

<a id="ex-set4-a01"></a>
#### SET4-A01 再帰式の入力を確認する
- Level: A

超限再帰式

$$
F(\alpha)=G(F|_\alpha)
$$

で、$\alpha=\lambda$ が極限順序数のとき $G$ が受け取る情報を説明せよ。

<!-- solution-start -->
#### 詳細解答

$F|_\lambda$ は

$$
\{(\beta,F(\beta)):\beta<\lambda\}
$$

という制限関数です。

極限順序数 $\lambda$ には直前の一段階がないので、$G$ は「最後の値」ではなく、$\lambda$ より前の全ての段階の値をまとめた関数 $F|_\lambda$ を受け取ります。
<!-- solution-end -->

<a id="ex-set4-a02"></a>
#### SET4-A02 $1+\omega$ を定義から計算する
- Level: A

順序数加法の極限段階の定義から

$$
1+\omega=\omega
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$\omega$ は極限順序数なので、

$$
1+\omega
=
\bigcup_{n<\omega}(1+n).
$$

$n$ が有限順序数なら $1+n$ も有限順序数です。また任意の正の有限順序数 $m$ は $m=1+(m-1)$ と書けます。

従って右辺は全ての有限順序数をちょうど集めた集合であり、

$$
\bigcup_{n<\omega}(1+n)=\omega.
$$
<!-- solution-end -->

<a id="ex-set4-a03"></a>
#### SET4-A03 $\omega+1$ は $\omega$ より大きい
- Level: A

$$
\omega+1=S(\omega)
$$

から

$$
\omega<\omega+1
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

定義より

$$
\omega+1
=
S(\omega)
=
\omega\cup\{\omega\}.
$$

したがって

$$
\omega\in\omega+1.
$$

順序数の大小は所属関係で表されるので、

$$
\omega<\omega+1.
$$
<!-- solution-end -->

<a id="ex-set4-a04"></a>
#### SET4-A04 有限整列集合の順序型
- Level: A

$$
c\prec a\prec b
$$

という順序を入れた $X=\{a,b,c\}$ の順序型を求め、順序同型を一つ書け。

<!-- solution-start -->
#### 詳細解答

3点の整列なので順序型は

$$
3=\{0,1,2\}.
$$

順序を保つ全単射は

$$
c\mapsto0,
\qquad
a\mapsto1,
\qquad
b\mapsto2
$$

です。

実際

$$
c\prec a\prec b
$$

が

$$
0\in1\in2
$$

に対応します。
<!-- solution-end -->

### Level B

<a id="ex-set4-b01"></a>
#### SET4-B01 二つの近似が一致する理由
- Level: B

同じ超限再帰規則 $G$ に従う二つの近似 $f,g$ があるとする。共通定義域上で $f=g$ となることを超限帰納法で示せ。

<!-- solution-start -->
#### 詳細解答

共通定義域を順序数 $\delta$ とします。

$\alpha<\delta$ に関する超限帰納法を使います。

$\beta<\alpha$ で

$$
f(\beta)=g(\beta)
$$

が全て成り立つと仮定すると、

$$
f|_\alpha=g|_\alpha.
$$

両方とも同じ規則 $G$ に従うので、

$$
f(\alpha)
=
G(f|_\alpha),
$$

$$
g(\alpha)
=
G(g|_\alpha).
$$

入力が等しいため出力も等しく、

$$
f(\alpha)=g(\alpha).
$$

従って超限帰納法から全ての $\alpha<\delta$ で等しく、共通定義域上で $f=g$ です。
<!-- solution-end -->

<a id="ex-set4-b02"></a>
#### SET4-B02 順序数加法が可換でない
- Level: B

$$
1+\omega=\omega
$$

と

$$
\omega+1>\omega
$$

を使って、順序数加法が可換でないことを示せ。

<!-- solution-start -->
#### 詳細解答

本文で

$$
1+\omega=\omega
$$

を得ました。

一方

$$
\omega+1=S(\omega)
$$

なので

$$
\omega\in\omega+1,
$$

従って

$$
\omega<\omega+1.
$$

したがって

$$
1+\omega
=
\omega
\ne
\omega+1.
$$

よって一般には

$$
\alpha+\beta\ne\beta+\alpha
$$

です。
<!-- solution-end -->

<a id="ex-set4-b03"></a>
#### SET4-B03 $2\cdot\omega$ と $\omega\cdot2$
- Level: B

定義から

$$
2\cdot\omega=\omega
$$

である一方、

$$
\omega\cdot2=\omega+\omega>\omega
$$

であることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$\omega$ は極限順序数なので

$$
2\cdot\omega
=
\bigcup_{n<\omega}2\cdot n.
$$

$2\cdot n$ は全て有限順序数で、$n$ を大きくすれば任意の有限順序数より大きくなります。従ってその合併は

$$
\omega.
$$

一方

$$
\omega\cdot2
=
\omega\cdot(1+1)
=
\omega\cdot1+\omega
=
\omega+\omega.
$$

$\omega+\omega$ には最初の $\omega$ の後にもう一つ $\omega$ 型の列が続くため、$\omega$ より真に大きい順序数です。

従って乗法も可換ではありません。
<!-- solution-end -->

### Level C

<a id="ex-set4-c01"></a>
#### SET4-C01 超限再帰定理の存在と一意性を再構成する
- Level: C

本文の証明を参考に、

1. 近似の定義
2. 近似どうしの両立性
3. 段階 $\alpha$ の前までの値を置換で集める部分
4. 完成関数の存在
5. 一意性

を順に説明し、置換公理図式が必要になる箇所を特定せよ。

<!-- solution-start -->
#### 詳細解答

**1. 近似。**

順序数 $\gamma\le\theta$ を定義域とする関数 $f$ で

$$
f(\alpha)=G(f|_\alpha)
\qquad(\alpha<\gamma)
$$

を満たすものを長さ $\gamma$ の近似とします。

**2. 両立性。**

二つの近似 $f,g$ の共通定義域上で、$\alpha$ に関する超限帰納法を使います。$\beta<\alpha$ で値が一致すれば制限関数も一致し、

$$
f(\alpha)
=
G(f|_\alpha)
=
G(g|_\alpha)
=
g(\alpha).
$$

従って近似は共通部分で一致します。

**3. 値を集合として集める。**

$\alpha$ より前の各 $\beta$ では、近似の両立性により「$\beta$ 段階の値」が一意に定まります。

ここで

$$
\beta\mapsto y_\beta
$$

という一価な対応から

$$
\{y_\beta:\beta<\alpha\}
$$

を集合として得るために **置換公理図式** を使います。

その値をグラフにまとめて

$$
h_\alpha
=
\{(\beta,y_\beta):\beta<\alpha\}
$$

を作ります。

**4. 存在。**

$h_\alpha$ はそれ以前の全段階で再帰式を満たすので長さ $\alpha$ の近似です。さらに

$$
G(h_\alpha)
$$

を新しい値として一段延長できます。

この構成が各段階で可能であることを超限帰納法で示し、最終的に長さ $\theta$ の近似 $F$ を得ます。

**5. 一意性。**

二つの完成関数 $F,F'$ はどちらも長さ $\theta$ の近似です。近似の両立性から $\theta$ 全体で一致するため

$$
F=F'.
$$

したがって存在と一意性が示されます。
<!-- solution-end -->

---

## 8. 次章への接続

超限再帰により、極限段階を含む長い構成を正当に定義できるようになりました。

次章ではこれを

$$
V_0=\varnothing,
\qquad
V_{\alpha+1}=\mathcal P(V_\alpha),
\qquad
V_\lambda=\bigcup_{\beta<\lambda}V_\beta
$$

へ適用します。

これは単なる巨大集合の列ではありません。ZF の集合を「どの段階で現れるか」という高さで整理し、**rank** を定義するための累積階層です。
