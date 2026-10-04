# SET4 超限再帰：以前の全段階から次を定義する

<!-- definition-example-audit: strict -->

[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)は、既に定義された対象について

$$
\forall\beta<\alpha
$$

の情報を使い、$\alpha$ でも性質が成り立つことを証明する道具でした。

しかし、後で扱う順序数演算や累積階層では、そもそも各段階の対象そのものを

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
**定義の確認**。 例えば

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

1. ある初期区間まで再帰式を満たす関数を考える。
2. 二つの近似は共通部分で一致することを[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)で示す。
3. 段階 $\alpha$ より前の値が一意に定まっているなら、置換公理図式でそれらを一つの関数 $h_\alpha$ に集める。
4. $G(h_\alpha)$ を新しい値として一段延長する。
5. 最後に置換で全段階の値を集め、関数 $F$ を作る。

ここで **置換公理図式** が「各 $\beta<\alpha$ に一意な値がある」から「値を全部まとめた集合がある」へ進む役割を担います。

<!-- proof-start -->
### 証明

順序数 $\gamma\le\theta$ を定義域とし、

$$
f(\alpha)
=
G(f|_\alpha)
\qquad(\alpha<\gamma)
$$

を満たす関数 $f$ を考えます。

まず、この条件を満たす二つの関数 $f,g$ は共通定義域で一致することを示します。

共通定義域を $\delta$ とし、$\alpha<\delta$ に関する[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)を使います。$\beta<\alpha$ で

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

よって[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)により、この条件を満たす二つの関数は共通部分で一致します。

次に、各 $\alpha\le\theta$ について定義域 $\alpha$ で再帰式を満たす関数が存在することを[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)で示します。

$\alpha=0$ では空関数が再帰式を満たします。

$\alpha>0$ とし、全ての $\beta<\alpha$ で長さ $\beta$ の近似が存在すると仮定します。

各 $\beta<\alpha$ を固定します。帰納法の仮定から定義域 $\beta$ で再帰式を満たす関数 $f_\beta$ が存在します。これを一段だけ延長し、

$$
f_\beta^+
=
f_\beta
\cup
\{(\beta,G(f_\beta))\}
$$

と置きます。$f_\beta$ の定義域は $\beta$ なので新しい組の第一成分 $\beta$ は既存の定義域に入っておらず、$f_\beta^+$ は定義域 $\beta+1$ の関数です。さらに古い段階では $f_\beta$ が再帰式を満たし、新しい段階では定義そのものから

$$
f_\beta^+(\beta)
=
G(f_\beta)
=
G(f_\beta^+|_\beta)
$$

なので、$f_\beta^+$ は定義域 $\beta+1$ で再帰式を満たします。

定義域 $\beta+1$ で再帰式を満たす二つの関数は両立性により $\beta$ で同じ値を取ります。そこで

$$
y_\beta
=
f_\beta^+(\beta)
$$

と置けば、$y_\beta$ は $f_\beta$ の選び方に依らず一意です。

したがって

$$
\beta\longmapsto y_\beta
$$

は $\alpha$ 上で一意な対応を定めます。SET1 の[置換公理図式](../SET1/index.md#axiom-set1-replacement)により、値の集合

$$
\{y_\beta:\beta<\alpha\}
$$

を一つの集合として集められます。従ってグラフ

$$
h_\alpha
=
\{(\beta,y_\beta):\beta<\alpha\}
$$

も集合として存在し、定義域 $\alpha$ の関数になります。

固定した $\beta<\alpha$ について、$h_\alpha|_\beta$ と $f_\beta$ はどちらも長さ $\beta$ の近似なので、両立性から

$$
h_\alpha|_\beta=f_\beta.
$$

したがって

$$
h_\alpha(\beta)
=
y_\beta
=
G(f_\beta)
=
G(h_\alpha|_\beta).
$$

よって $h_\alpha$ 自身が定義域 $\alpha$ で再帰式を満たします。

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

## 4. 順序数を順につなぐ

まず、右側の順序数を何段たどるかによって一つ目の演算を再帰的に定義します。

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
**定義の確認**。

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

## 5. 順序数の乗法と冪

順序数の加法を繰り返すと、次に「$\alpha$ を $\beta$ 回並べた順序型」を表したくなります。有限回なら反復加法で足りますが、右側の因子が極限順序数になると最後の一回がありません。そこで、加法と同じく後続段階では一つ加え、極限段階ではそれ以前の値をまとめる再帰で乗法を定めます。

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
**定義の確認**。

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

$$
\alpha^0=1
$$

と定める。

$\beta>0$ については、$\alpha=0$ なら

$$
0^\beta=0
$$

と定める。

$\alpha>0$ では $\beta$ に関する超限再帰で

$$
\alpha^{\gamma+1}
=
\alpha^\gamma\cdot\alpha,
$$

非零極限順序数 $\lambda$ に対して

$$
\alpha^\lambda
=
\bigcup_{\gamma<\lambda}
\alpha^\gamma
$$

と定める。

$\alpha=0$ を別に扱うのは、極限段階の合併へ $\alpha^0=1$ をそのまま含めると $0^\lambda$ の標準的な値 $0$ を再現しないためである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set4-ordinal-exponentiation -->
**定義の確認**。

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

[順序数の加法](#def-set4-ordinal-addition)で定めた極限段階の式から

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
#### SET4-A04 $0^\beta$ の極限段階を確認する
- Level: A

本文の定義から

$$
0^0,\qquad
0^1,\qquad
0^\omega
$$

を求めよ。また、$0^\omega$ を

$$
\bigcup_{\gamma<\omega}0^\gamma
$$

だけで定めると何が起きるか説明せよ。

<!-- solution-start -->
#### 詳細解答

定義から

$$
0^0=1.
$$

指数が正なら特別規約

$$
0^\beta=0
\qquad(\beta>0)
$$

を使うので、

$$
0^1=0,
\qquad
0^\omega=0.
$$

一方、特別規約を置かず極限段階を機械的に

$$
\bigcup_{\gamma<\omega}0^\gamma
$$

とすると、$\gamma=0$ の項 $0^0=1=\{0\}$ が含まれます。$\gamma>0$ の項は0なので、合併は

$$
1
$$

になってしまいます。

したがって底が0の場合は正の指数を別に定める必要があります。
<!-- solution-end -->

### Level B

<a id="ex-set4-b01"></a>
#### SET4-B01 二つの近似が一致する理由
- Level: B

同じ超限再帰規則 $G$ に従う二つの近似 $f,g$ があるとする。共通定義域上で $f=g$ となることを[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)で示せ。

<!-- solution-start -->
#### 詳細解答

共通定義域を順序数 $\delta$ とします。

$\alpha<\delta$ に関する[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)を使います。

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

従って[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)から全ての $\alpha<\delta$ で等しく、共通定義域上で $f=g$ です。
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

二つの近似 $f,g$ の共通定義域上で、$\alpha$ に関する[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)を使います。$\beta<\alpha$ で値が一致すれば制限関数も一致し、

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

この構成が各段階で可能であることを[超限帰納法](../SET3/index.md#thm-set3-transfinite-induction)で示し、最終的に長さ $\theta$ の近似 $F$ を得ます。

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
