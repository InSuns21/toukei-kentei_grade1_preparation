# SET3 超限帰納法：極限段階を含む帰納法

<!-- definition-example-audit: strict -->

自然数上の数学的帰納法では、

$$
P(0)
$$

を示し、

$$
P(n)\Longrightarrow P(n+1)
$$

を示せば、全ての自然数で $P$ が成り立ちます。

しかし順序数では

$$
0,1,2,\ldots,\omega,\omega+1,\ldots
$$

と進み、$\omega$ のように「直前の一つ」が存在しない段階が現れます。

したがって、自然数の

$$
\text{初期値}+\text{次の段階}
$$

という発想を、そのまま順序数へ延長するだけでは足りません。

必要なのは、

$$
\boxed{
\text{ある段階より前が全部できているなら、その段階もできる}
}
$$

という形です。これが超限帰納法です。

---

## 1. まず最小反例法として読む

超限帰納法の核心は、実は非常に単純です。

順序数 $\theta$ の内部で反例が一つでもあれば、$\theta$ は整列されているので **最小の反例** が存在します。その最小反例より前には反例がないため、帰納法の仮定を適用するとその点も反例ではなくなり、矛盾します。

<a id="thm-set3-transfinite-induction"></a>
<!-- formal-statement-start -->
### 定理（超限帰納法）

$\theta$ を順序数とし、各 $\alpha<\theta$ に命題 $P(\alpha)$ が与えられているとする。

任意の $\alpha<\theta$ について、

$$
\left[
\forall\beta<\alpha,\ P(\beta)
\right]
\Longrightarrow
P(\alpha)
$$

が成り立つなら、

$$
\forall\alpha<\theta,\ P(\alpha)
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

反例集合を $\theta$ の部分集合として分出します。空でなければ整列性から最小反例 $\alpha_0$ を取れます。$\alpha_0$ より前は全て正しいので仮定から $P(\alpha_0)$ が出て、反例であることに矛盾します。

<!-- proof-start -->
### 証明

分出公理図式により、

$$
B=
\{\alpha\in\theta:P(\alpha)\text{ が偽}\}
$$

を作ります。

$B=\varnothing$ なら結論は成立しています。

反対に $B\ne\varnothing$ と仮定します。$\theta$ は順序数なので $\in$ により整列されています。従って $B$ は最小元 $\alpha_0$ を持ちます。

$\beta<\alpha_0$、すなわち $\beta\in\alpha_0$ とします。もし $P(\beta)$ が偽なら $\beta\in B$ となり、$\alpha_0$ が $B$ の最小元であることに反します。

従って

$$
\forall\beta<\alpha_0,\ P(\beta)
$$

です。

仮定を $\alpha=\alpha_0$ に適用すると

$$
P(\alpha_0)
$$

を得ます。しかし $\alpha_0\in B$ は $P(\alpha_0)$ が偽であることを意味します。矛盾です。

したがって $B=\varnothing$ であり、全ての $\alpha<\theta$ で $P(\alpha)$ が成り立ちます。$\square$
<!-- proof-end -->

この証明で選択公理は使っていません。使ったのは、

- $\theta$ が順序数なので整列されていること、
- 分出公理図式で反例集合を作れること

です。

---

## 2. 自然数の強い帰納法との違いはどこか

自然数上でも、

$$
\left[
P(0),P(1),\ldots,P(n-1)
\right]
\Longrightarrow
P(n)
$$

という強い帰納法があります。

超限帰納法の形式はこれと同じですが、順序数では $\alpha$ より前の段階が有限個とは限りません。特に極限順序数 $\lambda$ では、

$$
\forall\beta<\lambda,\ P(\beta)
$$

という仮定が本当に「それ以前の全段階」をまとめて使う条件になります。

### 最小反例法としての読み方

直前の証明は、そのまま

> 反例があると仮定し、その最小反例を取って矛盾する

という証明法になっています。超限帰納法を使うときは、この最小反例法を裏側の仕組みとして読むと、なぜ「それ以前の全段階」を仮定してよいのかが見えやすくなります。

---

## 3. 初期・後続・極限の三段階に分ける

実際の証明では、前段階全部を一つの式で扱うより、順序数の三分類

1. $0$
2. 後続順序数
3. 極限順序数

に分けた方が見通しがよいことが多いです。

<a id="thm-set3-three-stage-induction"></a>
<!-- formal-statement-start -->
### 定理（三段階の超限帰納法）

順序数 $\theta$ に対して命題 $P(\alpha)$ $(\alpha<\theta)$ を考える。

次の三条件を仮定する。

1. $0<\theta$ なら $P(0)$。
2. $\alpha+1<\theta$ かつ $P(\alpha)$ なら $P(\alpha+1)$。
3. 非零極限順序数 $\lambda<\theta$ について、
   $$
   \forall\beta<\lambda,\ P(\beta)
   $$
   なら $P(\lambda)$。

このとき全ての $\alpha<\theta$ で $P(\alpha)$ が成り立つ。
<!-- formal-statement-end -->

ここで $\alpha+1$ は後続順序数 $S(\alpha)$ の略記です。順序数加法の一般定義は SET4 で行います。

<!-- proof-start -->
### 証明

超限帰納法の仮定

$$
\forall\beta<\alpha,\ P(\beta)
$$

から $P(\alpha)$ を導けることを確認します。

$\alpha=0$ なら条件1を使います。

$\alpha$ が後続順序数 $\gamma+1$ なら、

$$
\gamma<\alpha
$$

なので仮定から $P(\gamma)$ が成り立ちます。条件2より

$$
P(\gamma+1)=P(\alpha).
$$

$\alpha$ が非零極限順序数なら、仮定そのものが条件3の前提なので

$$
P(\alpha)
$$

を得ます。

SET2 の順序数の三分類により全ての場合を尽くしています。従って一般形の超限帰納法から結論が従います。$\square$
<!-- proof-end -->

---

## 4. なぜ極限段階を省けないのか

自然数の感覚だけで

$$
P(0),
\qquad
P(\alpha)\Longrightarrow P(\alpha+1)
$$

だけを確認し、「だから全順序数で成り立つ」とするのは誤りです。

<a id="prop-set3-limit-step-necessary"></a>
<!-- formal-statement-start -->
### 命題（後続段階だけでは極限を越えられない）

性質

$$
P(\alpha):\Longleftrightarrow \alpha<\omega
$$

を考える。

この性質は $P(0)$ を満たし、

$$
P(\alpha)\Longrightarrow P(\alpha+1)
$$

も満たすが、

$$
P(\omega)
$$

は偽である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 確認

$0<\omega$ なので $P(0)$ は真です。

$P(\alpha)$ が真、すなわち $\alpha<\omega$ なら $\alpha$ は有限順序数です。その後続 $\alpha+1$ も有限順序数なので

$$
\alpha+1<\omega.
$$

従って後続段階の条件は成り立ちます。

しかし

$$
\omega<\omega
$$

は偽なので $P(\omega)$ は偽です。

つまり

$$
0\to1\to2\to\cdots
$$

を何回有限に繰り返しても、それだけでは極限段階 $\omega$ に到達したときの主張を保証しません。$\square$
<!-- proof-end -->

---

## 5. 具体例：順序数の全ての元は真の部分集合

この事実は SET2 から直接も分かりますが、超限帰納法の使い方を練習するため、あえて帰納法で再構成します。

<a id="prop-set3-ordinal-elements-proper-subsets"></a>
<!-- formal-statement-start -->
### 命題（順序数の元は真の部分集合）

任意の順序数 $\alpha$ と $\beta\in\alpha$ に対して、

$$
\beta\subsetneq\alpha.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

順序数 $\alpha$ に関する超限帰納法で示します。

ある $\alpha$ より前の全ての順序数で命題が成り立つと仮定します。$\beta\in\alpha$ を取ります。

SET2 の「順序数の元は順序数」から $\beta$ は順序数です。また $\alpha$ は推移的なので

$$
\beta\subseteq\alpha.
$$

もし $\beta=\alpha$ なら $\alpha\in\alpha$ となりますが、順序数の整列関係 $\in$ は反射的ではないため不可能です。

従って

$$
\beta\subsetneq\alpha.
$$

これで各段階の主張が示されたので、超限帰納法から結論が従います。$\square$
<!-- proof-end -->

この例では帰納法の仮定を実際には使っていません。これは問題ではありません。超限帰納法の枠組みは使えるが、局所的な定義だけでも証明できた、ということです。

---

## 6. 具体例：順序数の推移性を階層的に読む

順序数は定義上推移的ですが、その意味を「前の段階を全て含む」として読み直します。

$\alpha$ が順序数なら、

$$
\alpha
=
\{\beta:\beta<\alpha\}
$$

です。

左から右は $\beta\in\alpha$ の言い換えです。右から左も $<$ の定義が所属関係だから同じです。

特に後続順序数では

$$
\alpha+1
=
\{\beta:\beta<\alpha+1\}
=
\alpha\cup\{\alpha\},
$$

極限順序数 $\lambda$ では「最後の一個」がないので、

$$
\lambda
=
\bigcup_{\beta<\lambda}(\beta+1)
$$

と、それ以前の全段階の合併として読むことができます。

<a id="prop-set3-limit-union"></a>
<!-- formal-statement-start -->
### 命題（極限順序数は以前の段階の合併）

$\lambda$ を極限順序数とする。このとき

$$
\lambda
=
\bigcup_{\beta<\lambda}\beta.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず右辺が $\lambda$ に含まれることを示します。

$x$ が右辺に入るなら、ある $\beta<\lambda$ があって

$$
x\in\beta.
$$

$\beta\in\lambda$ で、$\lambda$ は推移的なので

$$
x\in\lambda.
$$

従って

$$
\bigcup_{\beta<\lambda}\beta
\subseteq
\lambda.
$$

逆に $x\in\lambda$ とします。$\lambda$ は極限順序数なので

$$
x+1<\lambda
$$

です。もし $x+1=\lambda$ なら $\lambda$ は後続順序数になってしまいます。

$x\in x+1$ なので、$\beta=x+1$ と取れば

$$
x\in\beta<\lambda.
$$

従って $x$ は右辺に入ります。

以上より

$$
\lambda
=
\bigcup_{\beta<\lambda}\beta.
$$

$\square$
<!-- proof-end -->

この式が、SET4 の超限再帰で「極限段階では、それまでに作ったものをまとめる」発想につながります。

---

## 7. 超限帰納法で何を仮定してよいか

超限帰納法の証明でよく起きる誤りは、

> 「$\alpha$ で示したいので $P(\alpha)$ を仮定する」

ことです。仮定してよいのは $P(\alpha)$ ではなく、

$$
\forall\beta<\alpha,\ P(\beta)
$$

です。

後続段階 $\alpha=\gamma+1$ なら、そこから特に

$$
P(\gamma)
$$

を取り出せます。

極限段階では直前の一つがないため、

$$
P(\beta)\quad(\beta<\lambda)
$$

を必要な $\beta$ ごとに使います。

<a id="def-set3-progressive-property"></a>
<!-- formal-statement-start -->
### 定義（累進的な性質）

順序数 $\theta$ 上の性質 $P$ が **累進的** であるとは、任意の $\alpha<\theta$ について

$$
\left[
\forall\beta<\alpha,\ P(\beta)
\right]
\Longrightarrow
P(\alpha)
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set3-progressive-property -->
**定義の確認。** 超限帰納法は、「$\theta$ 上で累進的な性質は $\theta$ の全段階で成り立つ」と言い換えられます。
<!-- definition-example-end -->

---

## 8. 演習

### Level A

<a id="ex-set3-a01"></a>
#### SET3-A01 最小反例法の前提を言葉で読む
- Level: A

超限帰納法の証明で最小反例 $\alpha_0$ を取ったとき、

$$
\forall\beta<\alpha_0,\ P(\beta)
$$

が成り立つ理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\alpha_0$ は反例集合

$$
B=\{\alpha<\theta:P(\alpha)\text{ が偽}\}
$$

の最小元です。

もし $\beta<\alpha_0$ で $P(\beta)$ が偽なら、$\beta\in B$ です。しかし $\beta<\alpha_0$ なので、$\alpha_0$ が $B$ の最小元であることに反します。

従って $\alpha_0$ より前には反例がなく、

$$
\forall\beta<\alpha_0,\ P(\beta)
$$

が成り立ちます。
<!-- solution-end -->

<a id="ex-set3-a02"></a>
#### SET3-A02 後続段階で取り出せる仮定
- Level: A

$\alpha=\gamma+1$ とする。超限帰納法の仮定

$$
\forall\beta<\alpha,\ P(\beta)
$$

から $P(\gamma)$ が従う理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

後続順序数の定義から

$$
\gamma\in\gamma+1=\alpha.
$$

順序数の大小では

$$
\gamma<\alpha
\iff
\gamma\in\alpha.
$$

したがって $\gamma<\alpha$ です。

よって

$$
\forall\beta<\alpha,\ P(\beta)
$$

へ $\beta=\gamma$ を代入して

$$
P(\gamma)
$$

を得られます。
<!-- solution-end -->

<a id="ex-set3-a03"></a>
#### SET3-A03 極限段階の直前は存在しない
- Level: A

$\omega$ に対して

$$
\omega=\gamma+1
$$

となる順序数 $\gamma$ が存在しないことを説明し、なぜ「$\omega$ の直前の命題だけ使う」という証明ができないか述べよ。

<!-- solution-start -->
#### 詳細解答

SET2 で $\omega$ は極限順序数であることを確認しました。極限順序数の定義から、どの順序数 $\gamma$ に対しても

$$
\omega\ne\gamma+1.
$$

従って $\omega$ には直前の一段階がありません。

自然数の帰納法のように「直前の $\gamma$ で $P(\gamma)$ が成り立つから $P(\omega)$」とは書けません。

代わりに極限段階では

$$
\forall\beta<\omega,\ P(\beta)
$$

という、それ以前の全段階を使う仮定が必要です。
<!-- solution-end -->

<a id="ex-set3-a04"></a>
#### SET3-A04 後続段階だけでは足りない例
- Level: A

$$
P(\alpha):\Longleftrightarrow\alpha<\omega
$$

について、$P(0)$ と

$$
P(\alpha)\Longrightarrow P(\alpha+1)
$$

は成り立つが $P(\omega)$ は成り立たないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

$0$ は有限順序数なので $0<\omega$、従って $P(0)$ は真です。

$P(\alpha)$ を仮定すると $\alpha<\omega$ なので $\alpha$ は有限順序数です。その後続 $\alpha+1$ も有限順序数だから

$$
\alpha+1<\omega.
$$

よって $P(\alpha+1)$ も真です。

しかし $P(\omega)$ は

$$
\omega<\omega
$$

を意味し、これは偽です。

したがって初期段階と後続段階だけでは極限順序数まで主張を延ばせません。
<!-- solution-end -->

### Level B

<a id="ex-set3-b01"></a>
#### SET3-B01 三段階版から一般形へ戻す
- Level: B

三段階の仮定から、任意の $\alpha<\theta$ について

$$
\left[
\forall\beta<\alpha,\ P(\beta)
\right]
\Longrightarrow
P(\alpha)
$$

を導けることを、$\alpha=0$、後続、極限の三場合に分けて示せ。

<!-- solution-start -->
#### 詳細解答

$\alpha$ は SET2 の三分類により三場合のいずれかです。

**1. $\alpha=0$。**

三段階版の初期条件から $P(0)$ が成り立ちます。

**2. $\alpha=\gamma+1$。**

仮定

$$
\forall\beta<\alpha,\ P(\beta)
$$

から、$\gamma<\alpha$ なので $P(\gamma)$ を得ます。後続段階の条件より

$$
P(\gamma+1)=P(\alpha).
$$

**3. $\alpha$ が非零極限順序数。**

仮定

$$
\forall\beta<\alpha,\ P(\beta)
$$

は、そのまま極限段階の条件の前提です。従って $P(\alpha)$。

以上で一般形の超限帰納法の仮定が得られます。
<!-- solution-end -->

<a id="ex-set3-b02"></a>
#### SET3-B02 極限順序数の合併公式
- Level: B

極限順序数 $\lambda$ に対して

$$
\lambda=\bigcup_{\beta<\lambda}\beta
$$

を証明せよ。特に逆包含で、なぜ $x+1<\lambda$ が言えるかを説明すること。

<!-- solution-start -->
#### 詳細解答

まず $x$ が右辺に入るとします。ある $\beta<\lambda$ があって

$$
x\in\beta.
$$

$\beta\in\lambda$ で $\lambda$ は推移的なので $x\in\lambda$。従って右辺は $\lambda$ に含まれます。

逆に $x\in\lambda$ とします。後続 $x+1$ は順序数です。

$x+1$ と $\lambda$ を比較すると、$x\in x+1$ かつ $x\in\lambda$ です。$x+1$ が $\lambda$ より大きいことはありえず、もし

$$
x+1=\lambda
$$

なら $\lambda$ は後続順序数になってしまいます。

$\lambda$ は極限順序数なので等号は不可能で、したがって

$$
x+1<\lambda.
$$

そこで $\beta=x+1$ と取れば

$$
x\in\beta<\lambda.
$$

よって $x$ は右辺に入ります。

両包含から結論が従います。
<!-- solution-end -->

<a id="ex-set3-b03"></a>
#### SET3-B03 累進的な部分集合は全体になる
- Level: B

$\theta$ を順序数、$A\subseteq\theta$ とする。任意の $\alpha<\theta$ について

$$
\left[
\forall\beta<\alpha,\ \beta\in A
\right]
\Longrightarrow
\alpha\in A
$$

が成り立つとする。このとき $A=\theta$ を示せ。

<!-- solution-start -->
#### 詳細解答

命題

$$
P(\alpha):\Longleftrightarrow \alpha\in A
$$

を考えます。

問題の仮定はまさに

$$
\left[
\forall\beta<\alpha,\ P(\beta)
\right]
\Longrightarrow
P(\alpha)
$$

です。

従って超限帰納法から

$$
\forall\alpha<\theta,\ \alpha\in A.
$$

これは

$$
\theta\subseteq A
$$

を意味します。

もともと $A\subseteq\theta$ なので

$$
A=\theta.
$$
<!-- solution-end -->

### Level C

<a id="ex-set3-c01"></a>
#### SET3-C01 超限帰納法そのものを再証明する
- Level: C

SET1 の分出公理図式と、SET2 の「順序数は $\in$ で整列される」という事実だけを使って、超限帰納法を最小反例法から証明せよ。

<!-- solution-start -->
#### 詳細解答

$\theta$ を順序数とし、各 $\alpha<\theta$ に命題 $P(\alpha)$ があるとします。また

$$
\left[
\forall\beta<\alpha,\ P(\beta)
\right]
\Longrightarrow
P(\alpha)
$$

が全ての $\alpha<\theta$ で成り立つと仮定します。

分出公理図式により反例集合

$$
B=
\{\alpha\in\theta:\neg P(\alpha)\}
$$

を作ります。

結論を否定すると $B\ne\varnothing$ です。

$\theta$ は順序数なので $\in$ が $\theta$ を整列します。従って $B$ には最小元 $\alpha_0$ が存在します。

任意の $\beta<\alpha_0$ について、もし $\neg P(\beta)$ なら $\beta\in B$ です。ところが $\beta<\alpha_0$ なので、$\alpha_0$ の最小性に反します。

従って

$$
\forall\beta<\alpha_0,\ P(\beta).
$$

超限帰納法の段階仮定を $\alpha_0$ に適用すると

$$
P(\alpha_0)
$$

が従います。

一方 $\alpha_0\in B$ なので $\neg P(\alpha_0)$ です。矛盾。

したがって $B=\varnothing$ であり、

$$
\forall\alpha<\theta,\ P(\alpha)
$$

が成り立ちます。

この証明では、反例を「全宇宙から」集めるのではなく $\theta$ の内部から分出していること、そして最小反例の存在が順序数の整列性から出ていることが重要です。
<!-- solution-end -->

---

## 9. 次章への接続

超限帰納法は、

> 既に定義された対象について、全段階で性質を証明する

ための道具でした。

次に必要なのは、

> 各段階 $\alpha$ で、それ以前に作った値全部を使って新しい値 $F(\alpha)$ を **定義する**

ための道具です。

例えば順序数の加法では、極限段階 $\lambda$ で

$$
\alpha+\lambda
$$

を「一つ前」から作れません。それ以前の値を全部まとめて次の値を決める必要があります。

これを保証するのが SET4 の **超限再帰定理**です。
