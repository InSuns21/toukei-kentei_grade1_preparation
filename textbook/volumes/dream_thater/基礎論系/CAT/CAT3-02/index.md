# CAT3-02 Kleisli圏

## 1. 値ではなく「効果付きの計算」を射として合成したい

[モナド](../CAT3-01/index.md#def-cat3-01-monad) $(T,\eta,\mu)$ は、対象 $X$ から $TX$ を作り、値を一段入れる $\eta_X:X\to TX$ と二段を一段に戻す $\mu_X:T^2X\to TX$ を備えていた。例えば[有限語モナド](../CAT3-01/index.md#prop-cat3-01-list-monad)では $TX=X^*$ は有限語全体である。

ここで $f:A\to TB$ を考える。集合の圏なら、入力 $a\in A$ から一つの $b\in B$ を返すとは限らず、有限語では複数の $b$ を返し、空語を返す場合もある。一般の圏では元を使わず射の型で考える。別の計算 $g:B\to TC$ を $f$ の後で実行したいが、通常の射の合成 $g\circ f$ は**型が合わない**。$f$ の終域は $TB$ なのに、$g$ の始域は $B$ だからである。

求めるのは、$f$ が作った効果を保ちつつ $g$ を各結果へ適用し、最後に効果を一段へ戻す操作である。$f$、$g$ を普通の射として扱える新しい圏を作ると、計算の合成順序がモナドの三公理で保証される。

以下、$\mathcal C$ は[局所小圏](../CAT1-02/index.md#def-cat1-02-size)、$(T,\eta,\mu)$ は $\mathcal C$ 上のモナドとする。射の合成は右から左に読む。$\mu_X\circ T f$ のように添字の対象と合成の型を毎回区別する。

## 2. 一段の計算を二段目にも適用する

射 $f:A\to TB$ を $TA$ からも使えるようにするには、まず関手 $T$ で $Tf:TA\to T^2B$ を作り、$\mu_B:T^2B\to TB$ で平らにすればよい。次の定義では、この「効果付き入力へ延長する」操作の型を固定する。

<a id="def-cat3-02-extension"></a>

<!-- formal-statement-start -->
> **定義（Kleisli持ち上げ）**
> 圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ と射 $f:A\to TB$ に対し、その Kleisli持ち上げを次の射とする。

$$
f^\sharp:=\mu_B\circ Tf:TA\longrightarrow TB.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-02-extension -->
**定義の確認**（恒等モナド）。$T=1_{\mathcal C}$、$\eta_X=\mu_X=1_X$ とすると、$f:A\to B$ に対して $Tf=f:A\to B$、$\mu_B=1_B$ である。したがって $f^\sharp=1_B\circ f=f$、その始域は $TA=A$、終域は $TB=B$ となり、定義された型を満たす。一般のモナドでだけ「持ち上げ」が必要になる理由も分かる。

**定義の確認**（有限語モナド）。[有限語モナド](../CAT3-01/index.md#prop-cat3-01-list-monad)では $TX=X^*$ である。$f:X\to Y^*$ を関手 $T$ で写すと、$Tf:X^*\to(Y^*)^*$ は入力の語の各文字を $f$ によって語へ置き換える。次に $\mu_Y:(Y^*)^*\to Y^*$ が語の語を連結するので、$f^\sharp:X^*\to Y^*$ はこの二段を実行する。

例えば $X=\{a,b\}$、$Y=\{0,1\}$ とし、$f(a)=[0,1]$、$f(b)=[]$ とすれば

$$
\begin{aligned}
Tf([a,b,a])&=[[0,1],[],[0,1]],\\
f^\sharp([a,b,a])&=\mu_Y([[0,1],[],[0,1]])=[0,1,0,1].
\end{aligned}
$$

ここでは「各文字を語にする」操作が $Tf$、「語の語を連結する」操作が $\mu_Y$ に対応し、抽象的な合成の両段階と始域・終域を確かめられる。
<!-- definition-example-end -->

$f^\sharp$ が本当に「同じ計算の効果付き入力への拡張」なら、$A\xrightarrow{\eta_A}TA\xrightarrow{f^\sharp}TB$ は $f:A\to TB$ と一致するはずである。これは一般の圏でも意味を持ち、二つの計算を持ち上げる順番にも整合性が欲しい。

<a id="prop-cat3-02-extension-laws"></a>

<!-- formal-statement-start -->
> **命題（Kleisli持ち上げの三法則）**
> $\mathcal C$ 上のモナド $(T,\eta,\mu)$ について、任意の $f:A\to TB$、$g:B\to TC$ は次の等式を満たす。

$$
\begin{aligned}
(\eta_A)^\sharp&=1_{TA},\\
f^\sharp\circ\eta_A&=f,\\
(g^\sharp\circ f)^\sharp&=g^\sharp\circ f^\sharp.
\end{aligned}
$$

> 最後の両辺は $TA\to TC$ の射であり、$g^\sharp\circ f:A\to TC$ を持ち上げている。
<!-- formal-statement-end -->

### 証明の見取り図

第1式はモナドの右単位律、第2式は $\eta$ の自然性と左単位律による。第3式では $\mu$ の結合律で平坦化の順序を換え、その後に $\mu$ の自然性を**射 $g:B\to TC$ に適用**する。この二段を分離することが肝心である。

<!-- proof-start -->
### 証明

[モナドの単位律](../CAT3-01/index.md#def-cat3-01-monad)を $X=A$ に適用すると

$$
(\eta_A)^\sharp=\mu_A\circ T\eta_A=1_{TA}.
$$

$f:A\to TB$ に対する $\eta$ の自然性は $Tf\circ\eta_A=\eta_{TB}\circ f$ である。よって他方の単位律から

$$
f^\sharp\circ\eta_A
=\mu_B\circ Tf\circ\eta_A
=\mu_B\circ\eta_{TB}\circ f=f.
$$

最後に $h=g^\sharp\circ f:A\to TC$ と置いて展開する。関手性と $g^\sharp=\mu_C\circ Tg$ により

$$
\begin{aligned}
h^\sharp
&=\mu_C\circ T(g^\sharp\circ f)\\
&=\mu_C\circ T\mu_C\circ T^2g\circ Tf\\
&=\mu_C\circ\mu_{TC}\circ T^2g\circ Tf.
\end{aligned}
$$

最後の等号はモナドの結合律 $\mu_C\circ T\mu_C=\mu_C\circ\mu_{TC}$ を使った。ここで $\mu:T^2\Rightarrow T$ の自然性を、**終域が $TC$ である射 $g:B\to TC$** に適用すると

$$
\mu_{TC}\circ T^2g=Tg\circ\mu_B
$$

である。これを上式に代入して

$$
\begin{aligned}
h^\sharp
&=\mu_C\circ Tg\circ\mu_B\circ Tf\\
&=(\mu_C\circ Tg)\circ(\mu_B\circ Tf)
=g^\sharp\circ f^\sharp.
\end{aligned}
$$

すべての合成は $TA\to TC$ に型が揃う。$\square$
<!-- proof-end -->

## 3. Kleisli圏：射は $A\to TB$、恒等射は $\eta_A$

まず $A\xrightarrow{f}TB$、$B\xrightarrow{g}TC$ という二つの計算から、

$$
A\xrightarrow{f}TB\xrightarrow{Tg}T^2C\xrightarrow{\mu_C}TC
$$

が作れる。これを新しい圏の $A\to C$ の合成としよう。恒等的な計算は値を変えず一段だけ入れる $\eta_A$ がふさわしい。

<a id="def-cat3-02-kleisli"></a>

<!-- formal-statement-start -->
> **定義（Kleisli圏）**
> 局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ に付随する Kleisli圏 $\mathcal C_T$ は、対象を $\mathcal C$ と同じものとし、Hom集合・恒等射・合成を次で定める構成である。

$$
\begin{aligned}
\operatorname{Hom}_{\mathcal C_T}(A,B)
  &:=\operatorname{Hom}_{\mathcal C}(A,TB),\\
1_A^{\mathcal C_T}&:=\eta_A:A\to TA,\\
g\star f&:=g^\sharp\circ f
           =\mu_C\circ Tg\circ f:A\to TC
\end{aligned}
$$

> ただし $f:A\to TB$、$g:B\to TC$ とする。$\star$ は $\mathcal C_T$ の合成を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-02-kleisli -->
**定義の確認**（恒等モナド）。先ほどの $T=1_{\mathcal C}$ では $\operatorname{Hom}_{\mathcal C_T}(A,B)=\operatorname{Hom}_{\mathcal C}(A,B)$、$1_A^{\mathcal C_T}=\eta_A=1_A$ である。また $g\star f=\mu_C\circ Tg\circ f=g\circ f$。したがって Hom・単位・合成がすべて元の圏と一致する。一般のモナドでも、次の定理がこれらの演算の整合性を保証する。
<!-- definition-example-end -->

<a id="thm-cat3-02-category"></a>

<!-- formal-statement-start -->
> **定理（Kleisli圏の圏公理）**
> 局所小圏 $\mathcal C$ 上の任意のモナド $(T,\eta,\mu)$ について、上記の $\mathcal C_T$ の Hom集合・$\eta_A$・$\star$ は[圏の公理](../CAT1-01/index.md#def-cat1-01-category)を満たす。とくに $f:A\to TB$、$g:B\to TC$、$h:C\to TD$ なら

$$
\eta_B\star f=f,\qquad
f\star\eta_A=f,\qquad
h\star(g\star f)=(h\star g)\star f.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各 Hom は元の圏の Hom集合だから集合である。合成の型は定義時に確認した。左右単位律は持ち上げの第1・第2法則、結合律は第3法則を組み合わせる。

<!-- proof-start -->
### 証明

$\operatorname{Hom}_{\mathcal C_T}(A,B)$ は $\mathcal C$ の局所小性により集合である。$g^\sharp:TB\to TC$ なので $g^\sharp f:A\to TC$ は定義された Hom の元であり、合成は閉じる。

[Kleisli持ち上げの三法則](#prop-cat3-02-extension-laws)から、$f:A\to TB$ に対し

$$
\eta_B\star f=(\eta_B)^\sharp\circ f
=1_{TB}\circ f=f,
$$

$$
f\star\eta_A=f^\sharp\circ\eta_A=f
$$

が成り立つ。結合律では $g\star f=g^\sharp f$、$h\star g=h^\sharp g$ と書けば

$$
\begin{aligned}
h\star(g\star f)
&=h^\sharp\circ(g^\sharp\circ f)\\
&=(h^\sharp\circ g^\sharp)\circ f\\
&=(h^\sharp\circ g)^\sharp\circ f\\
&=(h\star g)\star f.
\end{aligned}
$$

第2行は $\mathcal C$ 自身の合成の結合律、第3行は持ち上げの第3法則である。ゆえに $\mathcal C_T$ は圏である。$\square$
<!-- proof-end -->

注意したいのは、$1_A^{\mathcal C_T}=\eta_A:A\to TA$ が一般には元の圏の $1_A:A\to A$ と**異なる型**を持つことである。対象は同じでも射と恒等射は変わる。

## 4. Kleisli随伴：構成した圏から元のモナドが戻る

先行講義では[随伴からモナドを作った](../CAT3-01/index.md#thm-cat3-01-adjunction-monad)。今度は逆に、**どのモナドからも随伴を作れる**ことを示す。$\mathcal C$ の普通の射 $u:A\to B$ を、Kleisli圏では「効果を付けずに値を返す計算」$\eta_Bu:A\to TB$ とみなす。一方、Kleisli射 $f:A\to TB$ は持ち上げて元の圏の射 $TA\to TB$ とみなす。

<a id="thm-cat3-02-adjunction"></a>

<!-- formal-statement-start -->
> **定理（Kleisli随伴）**
> 局所小圏 $\mathcal C$ 上のモナド $(T,\eta,\mu)$ に対し、二つの関手

$$
F_T:\mathcal C\to\mathcal C_T,\qquad
U_T:\mathcal C_T\to\mathcal C
$$

> を、対象と射でそれぞれ次のように定める。

$$
\begin{aligned}
F_T(A)&=A,& F_T(u:A\to B)&=\eta_B\circ u,\\
U_T(A)&=TA,& U_T(f:A\to TB)&=f^\sharp.
\end{aligned}
$$

> このとき $F_T\dashv U_T$ が成立する。その単位は $\eta$、余単位の $B\in\mathcal C_T$ での成分は $\mathcal C_T$ の射 $T B\to B$ を表す $\mathcal C$ の射 $1_{TB}:TB\to TB$ である。この随伴が誘導する $\mathcal C$ 上のモナドは、元の $(T,\eta,\mu)$ と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$F_T$ は普通の射を純粋な計算へ入れ、$U_T$ は効果付きの射を持ち上げる。[Homによる随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)の二つの Hom集合は**同じ集合** $\operatorname{Hom}_{\mathcal C}(A,TB)$ になる。ただし自然性は、$A$ 方向で $F_Tu$ と、$B$ 方向で $U_Tg$ がどのように合成へ入るかを実際に確認する。

<!-- proof-start -->
### 証明

**二つが関手であること。** $\mathcal C$ の $u:A\to B$、$v:B\to C$ について、$F_T(1_A)=\eta_A=1_A^{\mathcal C_T}$。さらに

$$
\begin{aligned}
F_Tv\star F_Tu
&=(\eta_Cv)^\sharp\circ(\eta_Bu)\\
&=(\eta_C)^\sharp\circ Tv\circ\eta_B\circ u\\
&=Tv\circ\eta_B\circ u
=\eta_C\circ v\circ u=F_T(vu).
\end{aligned}
$$

途中で [持ち上げの第1法則](#prop-cat3-02-extension-laws)と $\eta$ の自然性を使った。よって $F_T$ は関手である。$U_T(1_A^{\mathcal C_T})=(\eta_A)^\sharp=1_{TA}$、また任意の Kleisli射 $f:A\to TB$、$g:B\to TC$ について

$$
\begin{aligned}
U_T(g\star f)&=(g^\sharp f)^\sharp\\
&=g^\sharp f^\sharp
=U_Tg\circ U_Tf
\end{aligned}
$$

なので $U_T$ も関手である。

**Hom全単射と自然性。** 任意の $A\in\mathcal C$、$B\in\mathcal C_T$ について

$$
\operatorname{Hom}_{\mathcal C_T}(F_TA,B)
=\operatorname{Hom}_{\mathcal C}(A,TB)
=\operatorname{Hom}_{\mathcal C}(A,U_TB).
$$

この二つの集合の間で恒等写像 $\Phi_{A,B}(f)=f$ を取ると全単射である。$u:A'\to A$ に対して

$$
f\star F_Tu=f^\sharp\circ\eta_A\circ u=f\circ u,
$$

また $g:B\to TC$ を Kleisli射とすると

$$
g\star f=g^\sharp\circ f=U_Tg\circ\Phi_{A,B}(f).
$$

よって $\Phi$ は $A$ について反変、$B$ について共変に自然であり、[随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)から $F_T\dashv U_T$ である。

**単位・余単位・三角恒等式。** [随伴の転置公式](../CAT2-09/index.md#prop-cat2-09-transpose)により、単位は $\mathcal C_T$ の $1_{F_TA}=\eta_A$ に対応する $\eta_A:A\to TA$ である。余単位 $\varepsilon_B:F_TU_TB\to B$ は $\operatorname{Hom}_{\mathcal C_T}(TB,B)=\operatorname{Hom}_{\mathcal C}(TB,TB)$ の $1_{TB}$ である。$U_T\varepsilon_B=(1_{TB})^\sharp=\mu_B$ となるため、一方の三角恒等式は

$$
U_T\varepsilon_B\circ\eta_{U_TB}
=\mu_B\circ\eta_{TB}=1_{TB}.
$$

他方は $\mathcal C_T$ の合成で計算する。$F_T\eta_A:A\to TA$ を表す射は $\eta_{TA}\eta_A:A\to T^2A$ なので、

$$
\begin{aligned}
\varepsilon_{F_TA}\star F_T\eta_A
&=\mu_A\circ T(1_{TA})\circ\eta_{TA}\circ\eta_A\\
&=\mu_A\circ\eta_{TA}\circ\eta_A\\
&=\eta_A=1_A^{\mathcal C_T}.
\end{aligned}
$$

**誘導モナドの一致。** $U_TF_T(A)=TA$。射 $u:A\to B$ については

$$
U_TF_T(u)=(\eta_Bu)^\sharp
=\mu_B\circ T\eta_B\circ Tu=Tu.
$$

単位は上の $\eta$、[随伴が誘導する乗法の公式](../CAT3-01/index.md#thm-cat3-01-adjunction-monad)は

$$
(U_T\varepsilon_{F_TA})=(1_{TA})^\sharp
=\mu_A\circ T(1_{TA})=\mu_A
$$

を与える。したがって関手・単位・乗法がすべて元のモナドに等しい。$\square$
<!-- proof-end -->

「モナドには必ず随伴がある」は、もとの随伴が一意に復元されるという意味ではない。ここで構成したのは、モナドから自然に得られる一つの随伴である。

## 5. 有限語：分岐の順序と空語を保った合成

$\mathcal C=\mathbf{Set}$、$TX=X^*$、$\eta_X(x)=[x]$、$\mu_X$ は語の語の連結という[有限語モナド](../CAT3-01/index.md#prop-cat3-01-list-monad)を用いる。$f:X\to Y^*$ は、各 $x$ から順序付きの零個以上の $Y$ の値を作る計算である。

<a id="prop-cat3-02-list"></a>

<!-- formal-statement-start -->
> **命題（有限語のKleisli合成）**
> $f:X\to Y^*$、$g:Y\to Z^*$ に対し、$f(x)=[y_1,\ldots,y_n]$ なら、有限語モナドの Kleisli合成は

$$
(g\star f)(x)=g(y_1)\mathbin{+\!+}\cdots\mathbin{+\!+}g(y_n)
$$

> となる。$n=0$ では結果は空語 $[]$ とする。各 $g(y_i)$ の内部順序と $f(x)$ の外部順序はともに保持される。
<!-- formal-statement-end -->

### 証明の見取り図

$Tg$ は外側の語の各文字 $y_i$ を語 $g(y_i)$ へ置き換え、$\mu_Z$ がそれらを連結する。空語も語として扱えるため、特別な合成規則は要らない。

<!-- proof-start -->
### 証明

$f(x)=[y_1,\ldots,y_n]\in TY$ に $Tg:TY\to T^2Z$ を適用すると

$$
Tg(f(x))=[g(y_1),\ldots,g(y_n)]\in T^2Z.
$$

[語のモナドの乗法](../CAT3-01/index.md#prop-cat3-01-list-monad) $\mu_Z$ はこの語の語を順に連結するので、$\mu_Z(Tg(f(x)))$ は表示した右辺である。$n=0$ なら $Tg([])=[]$（外側の空語）、$\mu_Z([])=[]$ である。$\square$
<!-- proof-end -->

例えば $f(a)=[0,1]$、$f(b)=[]$、$g(0)=[p]$、$g(1)=[q,p]$ なら

$$
(g\star f)(a)=[p,q,p],\qquad(g\star f)(b)=[].
$$

同じ $p$ が二度現れても勝手に重複除去しない。これは次の冪集合の例との違いでもある。

## 6. 例外モナド：一度失敗すると次の計算へ進まない

結果を複数返す代わりに、計算が**成功値または例外**を返す場合を扱う。集合 $E$ を固定し、$X\sqcup E$ を二つの集合を区別して併せた[非交和](../CAT2-05/index.md#def-cat2-05-coproduct)とする。左側を $\operatorname{inl}(x)$（成功）、右側を $\operatorname{inr}(e)$（例外）と書く。このタグを付けるので、$X$ と $E$ に同じ記号があっても混同しない。

<a id="prop-cat3-02-exception"></a>

<!-- formal-statement-start -->
> **命題（例外モナドと失敗伝播）**
> 集合 $E$ を固定する。$\mathbf{Set}$ の自己関手を $TX=X\sqcup E$ とし、写像 $u:X\to Y$ は $Tu(\operatorname{inl}x)=\operatorname{inl}(u(x))$、$Tu(\operatorname{inr}e)=\operatorname{inr}e$ と定める。単位と乗法を

$$
\begin{aligned}
\eta_X(x)&=\operatorname{inl}(x),\\
\mu_X(\operatorname{inl}(t))&=t\quad(t\in TX),\\
\mu_X(\operatorname{inr}(e))&=\operatorname{inr}(e)
\end{aligned}
$$

> とするとモナドになる。Kleisli射 $f:X\to Y\sqcup E$ と $g:Y\to Z\sqcup E$ の合成は

$$
(g\star f)(x)=
\begin{cases}
g(y)&f(x)=\operatorname{inl}(y),\\
\operatorname{inr}(e)&f(x)=\operatorname{inr}(e)
\end{cases}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$T^2X=(X\sqcup E)\sqcup E$ には「内側の成功・内側の例外・外側の例外」の三種類の元がある。二つの単位律と結合律をこのタグの全場合で検証する。合成では、$Tg$ が例外タグを保つので、後続の $g$ が例外に適用されることはない。

<!-- proof-start -->
### 証明

まず関手性を確認する。$u:X\to Y$、$v:Y\to Z$ に対して、成功・例外の二つのタグ上で

$$
\begin{aligned}
Tv(Tu(\operatorname{inl}x))
 &=\operatorname{inl}(v(u(x)))=T(v\circ u)(\operatorname{inl}x),\\
Tv(Tu(\operatorname{inr}e))
 &=\operatorname{inr}e=T(v\circ u)(\operatorname{inr}e).
\end{aligned}
$$

さらに $T(1_X)$ は $\operatorname{inl}x$ を $\operatorname{inl}x$ に、$\operatorname{inr}e$ を $\operatorname{inr}e$ に写す。よって $T$ は恒等射と合成を保存する。

$\eta$ の自然性は $Tu(\operatorname{inl}x)=\operatorname{inl}(u(x))=\eta_Y(u(x))$ である。$\mu$ の自然性は $Tu\circ\mu_X=\mu_Y\circ T^2u:T^2X\to TY$ の確認である。$T^2X$ の三種類の元について、左経路は

$$
\begin{aligned}
Tu(\mu_X(\operatorname{inl}(\operatorname{inl}x)))&=Tu(\operatorname{inl}x)=\operatorname{inl}(u(x)),\\
Tu(\mu_X(\operatorname{inl}(\operatorname{inr}e)))&=Tu(\operatorname{inr}e)=\operatorname{inr}e,\\
Tu(\mu_X(\operatorname{inr}e))&=Tu(\operatorname{inr}e)=\operatorname{inr}e.
\end{aligned}
$$

一方、右経路は $T^2u$ が内側の成功値にだけ $u$ を適用するから

$$
\begin{aligned}
\mu_Y(T^2u(\operatorname{inl}(\operatorname{inl}x)))
 &=\mu_Y(\operatorname{inl}(\operatorname{inl}(u(x))))=\operatorname{inl}(u(x)),\\
\mu_Y(T^2u(\operatorname{inl}(\operatorname{inr}e)))
 &=\mu_Y(\operatorname{inl}(\operatorname{inr}e))=\operatorname{inr}e,\\
\mu_Y(T^2u(\operatorname{inr}e))
 &=\mu_Y(\operatorname{inr}e)=\operatorname{inr}e.
\end{aligned}
$$

三種類すべてで一致する。単位律について任意の $t\in TX$ を取ると

$$
\mu_X\eta_{TX}(t)=\mu_X(\operatorname{inl}t)=t.
$$

もう一方は $t=\operatorname{inl}x$ なら $\mu_XT\eta_X(t)=\mu_X(\operatorname{inl}(\operatorname{inl}x))=\operatorname{inl}x$、$t=\operatorname{inr}e$ なら $\mu_XT\eta_X(t)=\mu_X(\operatorname{inr}e)=\operatorname{inr}e$ である。

結合律の始域 $T^3X$ の元は、$t\in TX$ と $e\in E$ を用いて

$$
\operatorname{inl}(\operatorname{inl}t),\quad
\operatorname{inl}(\operatorname{inr}e),\quad
\operatorname{inr}e
$$

のいずれかである。$\mu_X\mu_{TX}$ は先に外側二段を平らにして、順に $\operatorname{inl}t,\operatorname{inr}e,\operatorname{inr}e$ を経て $t,\operatorname{inr}e,\operatorname{inr}e$ を与える。一方 $\mu_XT\mu_X$ は、まず $T\mu_X$ により順に $\operatorname{inl}t,\operatorname{inl}(\operatorname{inr}e),\operatorname{inr}e$ とし、次に $\mu_X$ を作用させると同じ三結果になる。これで結合律も確かめられ、モナドの三公理が成立した。

最後に $f(x)=\operatorname{inl}y$ の場合は $Tg(f(x))=\operatorname{inl}(g(y))$、$f(x)=\operatorname{inr}e$ の場合は $Tg(f(x))=\operatorname{inr}e$ なので、$\mu_Z$ を作用させると主張の合成式になる。$\square$
<!-- proof-end -->

$E$ が空集合なら $X\sqcup\varnothing$ と $X$ は左側のタグを外す全単射で対応し、Kleisli圏は通常の写像の圏と同型になる。$E=\{\bot\}$ が一個の失敗記号だけを持つ場合、失敗を許す部分写像との関係は最後の総合演習で証明する。

## 7. 冪集合モナド：射を二項関係として読む

[冪集合モナド](../CAT3-01/index.md#prop-cat3-01-powerset-monad)では $TX=\mathcal P(X)$、$\eta_X(x)=\{x\}$、$\mu_X$ は和集合である。Kleisli射 $f:X\to\mathcal P(Y)$ は、入力 $x$ に対し **可能な出力の集合** $f(x)$ を割り当てる。

<a id="prop-cat3-02-relations"></a>

<!-- formal-statement-start -->
> **命題（冪集合のKleisli圏と二項関係）**
> $\mathbf{Set}$ 上の冪集合モナドの Kleisli圏では、$f:X\to\mathcal P(Y)$、$g:Y\to\mathcal P(Z)$ の合成は

$$
(g\star f)(x)=\bigcup_{y\in f(x)}g(y)
$$

> となる。各 $f$ に二項関係 $R_f\subseteq X\times Y$ を

$$
(x,y)\in R_f\quad\Longleftrightarrow\quad y\in f(x)
$$

> で対応させると、対象を集合、射を二項関係、合成を「中間元が存在すること」で定める圏と、この Kleisli圏は同型になる。
<!-- formal-statement-end -->

### 証明の見取り図

$Tg$ は集合 $f(x)$ の各要素 $y$ を集合 $g(y)$ へ移し、$\mu_Z$ がその集合族を合併する。関係に直すと「ある $y$ を経由できる」という量化条件が現れる。恒等射の単元集合は対角関係に対応する。

<!-- proof-start -->
### 証明

$f(x)\subseteq Y$ に $Tg$ を作用させると

$$
Tg(f(x))=\{g(y)\mid y\in f(x)\}\subseteq\mathcal P(Z).
$$

乗法 $\mu_Z$ は集合族の合併だから合成公式が出る。従って $x\in X$、$z\in Z$ について

$$
\begin{aligned}
(x,z)\in R_{g\star f}
&\Longleftrightarrow z\in(g\star f)(x)\\
&\Longleftrightarrow \exists y\in Y:
     \bigl(y\in f(x)\ \text{かつ}\ z\in g(y)\bigr)\\
&\Longleftrightarrow \exists y\in Y:
     (x,y)\in R_f\ \text{かつ}\ (y,z)\in R_g.
\end{aligned}
$$

これは二項関係の合成 $R_g\circ R_f$ の定義である。また $\eta_X(x)=\{x\}$ に対応する $R_{\eta_X}$ は $(x,y)$ が $x=y$ のときだけ含まれる対角関係である。任意の関係 $R\subseteq X\times Y$ から $f_R(x)=\{y\in Y\mid(x,y)\in R\}$ を作れば $R_{f_R}=R$、$f_{R_f}=f$。Homごとの対応が全単射で、恒等射と合成を保存するため、対象も同じ二つの圏の同型を与える。$\square$
<!-- proof-end -->

例えば $f(a)=\{1,2\}$、$g(1)=\{p\}$、$g(2)=\{p,q\}$ なら $(g\star f)(a)=\{p,q\}$ であり、$p$ が二経路から生じても重複しない。有限語の $[p,p,q]$ とは異なる。

## 8. 印を蓄積する例：合成順序が本当に効く

[印付き集合のモナド判定](../CAT3-01/index.md#prop-cat3-01-writer-criterion)でモノイド $(M,\star,e)$ から $TX=M\times X$ を作った。ここでは $\star$ を $M$ の二項演算にも Kleisli射の合成にも使う。$m\star n\in M$ と $g\star f:X\to M\times Z$ は型が違うので区別する。

$f:X\to M\times Y$、$g:Y\to M\times Z$ で $f(x)=(m,y)$、$g(y)=(n,z)$ なら

$$
Tg(f(x))=(m,(n,z)),\qquad
(g\star f)(x)=\mu_Z(m,(n,z))=(m\star n,z).
$$

先に実行した $f$ の印 $m$ が左、後の $g$ の印 $n$ が右へ来る。例えば文字 $p,q$ からなる有限語の連結モノイドを $M$ とすると、$m=[p]$、$n=[q]$ の合成印は $[p,q]$ であり $[q,p]$ ではない。モノイドが非可換なら Kleisli合成の実行順序を取り違えると答えが変わる。

## 9. 演習：型・効果・随伴の三方向から再構成する

### 問題1：合成の各段階の型

- Level: A
- 問題ID: CAT3-02-KLEISLI-TYPES

局所小圏 $\mathcal C$ のモナドで $f:A\to TB$、$g:B\to TC$ とする。$Tg$、$\mu_C$、$g^\sharp$、$g\star f$ の始域・終域をすべて答えよ。なぜ $g\circ f$ と書けないかも述べよ。

<!-- solution-start -->
**詳細解答**：$g:B\to TC$ に自己関手 $T$ を適用すると $Tg:TB\to T(TC)=T^2C$。乗法の成分は $\mu_C:T^2C\to TC$ なので $g^\sharp=\mu_C\circ Tg:TB\to TC$ と合成できる。これに $f:A\to TB$ を続けて

$$
g\star f=\mu_C\circ Tg\circ f:A\to TC
$$

が得られる。$g$ 自身の始域は $B$、$f$ の終域は $TB$ であり、一般には $B\ne TB$ なので $g\circ f$ は定義できない。$\square$
<!-- solution-end -->

### 問題2：空語と順序付き分岐

- Level: A
- 問題ID: CAT3-02-LIST-BIND

有限語モナドで $f:X\to Y^*$、$g:Y\to Z^*$ を考え、$X=\{a,b\}$、$Y=\{0,1\}$、$Z=\{p,q\}$ とする。$f(a)=[1,0,1]$、$f(b)=[]$、$g(0)=[q]$、$g(1)=[p,q]$ のとき $(g\star f)(a)$、$(g\star f)(b)$ を計算せよ。

<!-- solution-start -->
**詳細解答**：[有限語のKleisli合成](#prop-cat3-02-list)により

$$
\begin{aligned}
(g\star f)(a)
&=g(1)\mathbin{+\!+}g(0)\mathbin{+\!+}g(1)\\
&=[p,q]\mathbin{+\!+}[q]\mathbin{+\!+}[p,q]\\
&=[p,q,q,p,q].
\end{aligned}
$$

$f(b)=[]$ の場合、$Tg([])=[]$ は外側の空語で、$\mu_Z([])=[]$ だから $(g\star f)(b)=[]$。$a$ の二度目の $1$ は重複として消さない。$\square$
<!-- solution-end -->

### 問題3：例外発生時に何が呼ばれるか

- Level: A
- 問題ID: CAT3-02-EXCEPTION-PROPAGATION

$E=\{\mathrm{err}\}$、$X=\{a,b\}$、$Y=\{0\}$、$Z=\{p\}$ とし、$f(a)=\operatorname{inl}(0)$、$f(b)=\operatorname{inr}(\mathrm{err})$、$g(0)=\operatorname{inl}(p)$ とする。$(g\star f)(a)$ と $(g\star f)(b)$ を求め、失敗の入力で $g$ を評価する必要がない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$f(a)$ は成功なので[例外モナドの合成公式](#prop-cat3-02-exception)の上段を使い

$$
(g\star f)(a)=g(0)=\operatorname{inl}(p).
$$

$f(b)$ は例外なので下段を使い

$$
(g\star f)(b)=\operatorname{inr}(\mathrm{err}).
$$

$Tg$ は例外タグをそのまま保ち、$\mu_Z$ も外側の例外を保存する。従って $g$ の引数となる $y\in Y$ がない失敗側では $g(y)$ を計算しない。$\square$
<!-- solution-end -->

### 問題4：集合値の分岐を合成する

- Level: A
- 問題ID: CAT3-02-POWERSET-BIND

冪集合モナドで $f(a)=\{1,2\}$、$f(b)=\varnothing$、$g(1)=\{p,q\}$、$g(2)=\{q\}$ とする。$(g\star f)(a)$、$(g\star f)(b)$ を求め、有限語との違いを指摘せよ。

<!-- solution-start -->
**詳細解答**：[冪集合のKleisli圏と二項関係](#prop-cat3-02-relations)を用いると

$$
(g\star f)(a)=g(1)\cup g(2)=\{p,q\}\cup\{q\}=\{p,q\}.
$$

$f(b)=\varnothing$ なので空添字の合併により $(g\star f)(b)=\bigcup_{y\in\varnothing}g(y)=\varnothing$。有限語なら $[p,q,q]$ のように二つの $q$ が残るが、集合では重複も順序も記録しない。$\square$
<!-- solution-end -->

### 問題5：持ち上げの三法則を再導出する

- Level: B
- 問題ID: CAT3-02-EXTENSION-LAWS

モナド $(T,\eta,\mu)$ と $f:A\to TB$、$g:B\to TC$ に対して、$(\eta_A)^\sharp=1_{TA}$、$f^\sharp\eta_A=f$、$(g^\sharp f)^\sharp=g^\sharp f^\sharp$ を、単位律・結合律・自然性を使う位置と型を明記して示せ。

<!-- solution-start -->
**詳細解答**：まず[モナド公理](../CAT3-01/index.md#def-cat3-01-monad)より

$$
(\eta_A)^\sharp=\mu_A T\eta_A=1_{TA}.
$$

次に $\eta$ の自然性を $f:A\to TB$ に適用すると $Tf\,\eta_A=\eta_{TB}f$。よって

$$
f^\sharp\eta_A=\mu_B Tf\,\eta_A=\mu_B\eta_{TB}f=f.
$$

第3式の左辺を展開すると

$$
\begin{aligned}
(g^\sharp f)^\sharp
&=\mu_C T(\mu_C Tg f)\\
&=\mu_C T\mu_C T^2g Tf\\
&=\mu_C\mu_{TC}T^2g Tf
\quad(\text{結合律}).
\end{aligned}
$$

$g:B\to TC$ に $\mu$ の自然性を適用すると $\mu_{TC}T^2g=Tg\,\mu_B$ であるから

$$
\mu_C\mu_{TC}T^2g Tf
=\mu_C Tg\,\mu_B Tf
=g^\sharp f^\sharp.
$$

第1式の型は $TA\to TA$、第2式は $A\to TB$、第3式は $TA\to TC$ で、すべて一致した。$\square$
<!-- solution-end -->

### 問題6：自由関手と忘却関手の合成

- Level: B
- 問題ID: CAT3-02-KLEISLI-ADJUNCTION

[Kleisli随伴](#thm-cat3-02-adjunction)の $F_T$、$U_T$ を用いる。$\mathcal C$ の射 $u:A\to B$、Kleisli射 $f:A\to TB$、$g:B\to TC$ について、(i) $U_TF_T(u)=Tu$、(ii) $U_T(g\star f)=U_Tg\,U_Tf$ を導出せよ。また $B\in\mathcal C_T$ で余単位 $\varepsilon_B$ を表す $\mathcal C$ の射と、その $U_T$ による像を答えよ。

<!-- solution-start -->
**詳細解答**：定義から $F_Tu=\eta_Bu$ なので

$$
\begin{aligned}
U_TF_T(u)
&=(\eta_Bu)^\sharp
=\mu_B T(\eta_Bu)\\
&=\mu_B T\eta_B Tu=Tu,
\end{aligned}
$$

最後に $\mu_B T\eta_B=1_{TB}$ を用いた。第2式は $g\star f=g^\sharp f$ だから、[Kleisli持ち上げの三法則](#prop-cat3-02-extension-laws)の第3式より

$$
U_T(g\star f)=(g^\sharp f)^\sharp
=g^\sharp f^\sharp=U_Tg\circ U_Tf.
$$

余単位は $\mathcal C_T$ では $\varepsilon_B:TB\to B$ で、これを表す $\mathcal C$ の射は $1_{TB}:TB\to TB$。よって

$$
U_T\varepsilon_B=(1_{TB})^\sharp
=\mu_B T(1_{TB})=\mu_B:T^2B\to TB.
$$

添字 $B$ は $\mathcal C_T$ の対象だが、その対象は $\mathcal C$ と共通なので、$\mu_B$ の成分を適切に取れる。$\square$
<!-- solution-end -->

### 問題7：関係の合成と Kleisli 合成

- Level: B
- 問題ID: CAT3-02-RELATION-COMPOSITION

$X=\{a,b\}$、$Y=\{1,2\}$、$Z=\{p,q\}$ とし、$R=\{(a,1),(a,2),(b,2)\}\subseteq X\times Y$、$S=\{(1,p),(2,q)\}\subseteq Y\times Z$ とする。関係から集合値写像 $f_R$、$g_S$ を作り、$g_S\star f_R$ を求めよ。結果が関係 $S\circ R$ と一致することを量化条件で確認せよ。

<!-- solution-start -->
**詳細解答**：[関係との対応](#prop-cat3-02-relations)により

$$
f_R(a)=\{1,2\},\quad f_R(b)=\{2\},\quad
g_S(1)=\{p\},\quad g_S(2)=\{q\}.
$$

従って

$$
(g_S\star f_R)(a)=\{p\}\cup\{q\}=\{p,q\},\qquad
(g_S\star f_R)(b)=\{q\}.
$$

任意の $(x,z)\in X\times Z$ について

$$
\begin{aligned}
z\in(g_S\star f_R)(x)
&\Longleftrightarrow \exists y\in f_R(x):z\in g_S(y)\\
&\Longleftrightarrow \exists y\in Y:(x,y)\in R,\ (y,z)\in S.
\end{aligned}
$$

よって $S\circ R=\{(a,p),(a,q),(b,q)\}$ で、集合値写像の出力と同じ対応を表す。$\square$
<!-- solution-end -->

### 問題8：非可換な印を順に蓄積する

- Level: B
- 問題ID: CAT3-02-WRITER-ORDER

$M=\{p,q\}^*$ を語の連結モノイド、$TX=M\times X$ を[印付き集合のモナド](../CAT3-01/index.md#prop-cat3-01-writer-criterion)とする。$f(a)=([p],b)$、$g(b)=([q],c)$、$h(c)=([p,q],d)$ とするとき、$(h\star g)\star f$ と $h\star(g\star f)$ の値をそれぞれ計算せよ。$[p,q]$ と $[q,p]$ の違いがどこで効くか説明せよ。

<!-- solution-start -->
**詳細解答**：合成公式は $f(x)=(m,y)$、$g(y)=(n,z)$ なら $(g\star f)(x)=(m\mathbin{+\!+}n,z)$ である。まず

$$
(g\star f)(a)=([p,q],c),
$$

さらに $h$ を続ければ

$$
(h\star(g\star f))(a)
=([p,q]\mathbin{+\!+}[p,q],d)=([p,q,p,q],d).
$$

他方 $g(b)=([q],c)$ と $h(c)=([p,q],d)$ の合成は

$$
(h\star g)(b)=([q,p,q],d).
$$

そこへ $f(a)=([p],b)$ を合成すると

$$
((h\star g)\star f)(a)
=([p]\mathbin{+\!+}[q,p,q],d)
=([p,q,p,q],d).
$$

括弧を変えても連結の結合律で同じ語になる。一方、印の順番を逆転すれば $[q,p]$ となり一般には $[p,q]$ と異なる。圏の**結合律**は合成の括弧を変えられるという主張で、合成の**交換律**ではない。$\square$
<!-- solution-end -->

### 問題9：一種類の例外は部分写像そのもの

- Level: C
- 問題ID: CAT3-02-PARTIAL-MAPS

$E=\{\bot\}$ の例外モナド $TX=X\sqcup\{\bot\}$ を考える。集合 $X$ から $Y$ への部分写像を、部分集合 $D\subseteq X$ と写像 $u:D\to Y$ の組 $(D,u)$ として定義する。二つの部分写像 $(D,u):X\dashrightarrow Y$、$(H,v):Y\dashrightarrow Z$ の合成を、定義域

$$
D'=\{x\in D\mid u(x)\in H\}
$$

上の写像 $v\circ u:D'\to Z$ と定める。これらを射、集合を対象、全域で定義された恒等写像を恒等射とする圏が、例外モナドの Kleisli圏と同型であることを、Hom全単射・恒等射・合成の対応をすべて検証して証明せよ。部分写像の合成が結合的であることも定義域の条件から説明せよ。

<!-- solution-start -->
**詳細解答**：Kleisli射 $f:X\to Y\sqcup\{\bot\}$ に対し、成功する入力の集合を

$$
D_f=\{x\in X\mid f(x)=\operatorname{inl}(y)
\ \text{となる}\ y\in Y\ \text{が存在する}\}
$$

と置く。タグ付き非交和だから、その $y$ は各 $x\in D_f$ に対して一意である。そこで $u_f:D_f\to Y$ を $f(x)=\operatorname{inl}(u_f(x))$ により定める。

逆に部分写像 $(D,u)$ があれば、$X$ 全体で定義された写像

$$
f_{D,u}(x)=
\begin{cases}
\operatorname{inl}(u(x))&x\in D,\\
\operatorname{inr}(\bot)&x\notin D
\end{cases}
$$

を作れる。$D_{f_{D,u}}=D$ かつ $u_{f_{D,u}}=u$ であり、$f_{D_f,u_f}=f$ だから、各 Hom集合で対応は逆写像を持つ全単射である。

Kleisli恒等射 $\eta_X(x)=\operatorname{inl}(x)$ はすべての $x$ で成功し、対応する部分写像は $(X,1_X)$、すなわち部分写像の恒等射である。

$f:X\to Y\sqcup\{\bot\}$、$g:Y\to Z\sqcup\{\bot\}$ の合成を考える。[例外合成の公式](#prop-cat3-02-exception)から $(g\star f)(x)$ が成功するのは、$x\in D_f$ かつ $u_f(x)\in D_g$ の場合に限られる。このとき成功値は $u_g(u_f(x))$。従って対応する部分写像は

$$
\left(\{x\in D_f\mid u_f(x)\in D_g\},
\,u_g\circ u_f\right),
$$

であり、問題文の合成と一致する。これは Hom全単射が合成を保存する証明である。

最後に第三の部分写像 $(K,w):Z\dashrightarrow W$ を加える。三つのどの括弧付けでも合成の定義域は

$$
\{x\in D_f\mid u_f(x)\in D_g,\quad
u_g(u_f(x))\in K\}
$$

である。その各点での値は $w(u_g(u_f(x)))$ に等しい。したがって合成は結合的で、上述の対応は対象を変えず Hom全単射・恒等射・合成を保つ圏同型である。$\square$
<!-- solution-end -->

---

Kleisli圏では、モナドの単位が恒等射になり、乗法が計算の合成を支える。次講の Eilenberg–Moore圏は、同じモナドを「計算の射」ではなく「モナド作用を受ける対象」の側から捉え直す。
