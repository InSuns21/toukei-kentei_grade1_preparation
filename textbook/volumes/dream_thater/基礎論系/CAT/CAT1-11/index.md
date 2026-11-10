# CAT1-11 Yonedaの補題

## 1. 自然変換を「一つの元」から取り戻す

前講では[表現可能関手と普遍元](../CAT1-10/index.md#thm-cat1-10-contra-criterion)を調べた。たとえば冪集合の反変関手 $P(X)=\mathcal P(X)$ は、$2=\{0,1\}$ を使って $\operatorname{Hom}_{\mathbf{Set}}(-,2)$ と自然同型になる。しかし今回問いたいのは、**自然変換の各成分が全単射でなくても**、その自然変換の情報を小さく圧縮できるか、ということだ。

二元集合 $2=\{0,1\}$ とその部分集合 $S\subseteq2$ を一つ固定する。写像 $f:X\to2$ に対して $f^{-1}(S)$ を取れば、$X$ の部分集合を一つ作れる。この操作は任意の $X$ で同時にでき、写像 $h:Y\to X$ で引き戻しても結果が一致する。

$$
h^{-1}(f^{-1}(S))=(f\circ h)^{-1}(S).
$$

このすべての操作が、実は **$2$ における一つの部分集合 $S$** で決まっている。これが Yoneda の補題の最小の姿である。

以下、$\mathcal C$ は[局所小圏](../CAT1-02/index.md#def-cat1-02-size)、$A$ はその対象とする。[反変・共変 Hom 関手](../CAT1-06/index.md#def-cat1-06-hom-functors)の射の作用を、それぞれ

$$
\begin{aligned}
h^A(X)&=\operatorname{Hom}_{\mathcal C}(X,A),
&h^A(u)(f)&=f\circ u,\\
h_A(X)&=\operatorname{Hom}_{\mathcal C}(A,X),
&h_A(u)(g)&=u\circ g
\end{aligned}
$$

と略記する。第1行の $u:X\to Y$ に対して $f:Y\to A$、第2行では $g:A\to X$ と取るので、いずれも合成の型が合う。$\operatorname{Nat}(H,K)$ は[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation) $H\Rightarrow K$ の全体を表す。局所小性により各 $h^A(X)$ と $h_A(X)$ は集合であり、集合値関手として扱える。

## 2. 反変 Yoneda：$X\to A$ の値は $1_A$ の値から決まる

反変集合値関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ を取る。$P$ は**表現可能でなくてもよい**。自然変換 $\alpha:h^A\Rightarrow P$ を考えたとき、成分

$$
\alpha_A:\operatorname{Hom}_{\mathcal C}(A,A)\longrightarrow P(A)
$$

を恒等射 $1_A$ で評価すると $x=\alpha_A(1_A)\in P(A)$ を得る。逆にこの $x$ が与えられたなら、$f:X\to A$ を引き戻しとして使い $P(f)(x)$ を作れる。$P(f):P(A)\to P(X)$ なので、ちょうど $\alpha_X(f)$ の候補となる。

<a id="thm-cat1-11-contravariant-yoneda"></a>

<!-- formal-statement-start -->
> **定理（反変Yonedaの補題）**
> 局所小圏 $\mathcal C$、対象 $A\in\mathcal C$、任意の反変集合値関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ に対し、恒等射での評価

$$
\begin{aligned}
\operatorname{ev}_{A,P}:\operatorname{Nat}(h^A,P)&\longrightarrow P(A),\\
\alpha&\longmapsto\alpha_A(1_A)
\end{aligned}
$$

> は全単射である。その逆写像は、各 $x\in P(A)$ に自然変換 $\alpha^x:h^A\Rightarrow P$ を対応させる写像であり、成分は

$$
\alpha^x_X(f)=P(f)(x)
\quad(X\in\mathcal C,\ f:X\to A)
$$

> で与えられる。$P$ の表現可能性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

肝心なのは、[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)を射 $f:X\to A$ に適用することだ。$h^A(f)$ は $1_A$ を $1_A\circ f=f$ に送るので、すべての $\alpha_X(f)$ が $\alpha_A(1_A)$ で決まる。逆方向では $P$ の反変合成則を使って四角形の可換性を一つずつ確かめる。

<!-- proof-start -->
### 証明

**1. 評価写像が決定的であること。** $\alpha:h^A\Rightarrow P$ を自然変換とし、$x=\alpha_A(1_A)$ と置く。任意の $f:X\to A$ に対する自然性は、集合間写像として

$$
P(f)\circ\alpha_A=\alpha_X\circ h^A(f)
$$

である。この両辺を $1_A\in h^A(A)$ に適用する。$h^A(f)(1_A)=1_A\circ f=f$ だから

$$
\begin{aligned}
\alpha_X(f)
 &=\alpha_X(h^A(f)(1_A))\\
 &=P(f)(\alpha_A(1_A))\\
 &=P(f)(x).
\end{aligned}
$$

従って評価値 $x$ が等しい二つの自然変換は、どの $X$・どの $f:X\to A$ でも値が等しく、自然変換として一致する。評価は単射である。

**2. 任意の元から自然変換を作ること。** $x\in P(A)$ を任意に取り、各 $X$ について $\alpha^x_X:h^A(X)\to P(X)$ を $f\mapsto P(f)(x)$ と定める。$P(f)$ の始域は $P(A)$、終域は $P(X)$ なので well-defined である。

自然性を検査するため、$u:X\to Y$ と $g:Y\to A$ を任意に取る。反変関手の[合成則](../CAT1-06/index.md#def-cat1-06-contravariant)より、$P(u)\circ P(g)=P(g\circ u)$。ゆえに

$$
\begin{aligned}
P(u)(\alpha^x_Y(g))
 &=P(u)(P(g)(x))\\
 &=P(g\circ u)(x)\\
 &=\alpha^x_X(g\circ u)\\
 &=\alpha^x_X(h^A(u)(g)).
\end{aligned}
$$

これは任意の $u$ と $g$ について成り立つから、$\alpha^x$ は自然変換である。さらに $P$ の恒等射保存より

$$
\operatorname{ev}_{A,P}(\alpha^x)
=\alpha^x_A(1_A)=P(1_A)(x)=x.
$$

逆に自然変換 $\alpha$ から $x=\alpha_A(1_A)$ を取り直せば、1の等式により $\alpha^x_X(f)=\alpha_X(f)$ が全成分で成立する。両方向の合成が恒等写像なので、評価は全単射で、表示した式が逆写像である。$\square$
<!-- proof-end -->

**直接例：冪集合。** $\mathcal C=\mathbf{Set}$、$A=2=\{0,1\}$、$P(X)=\mathcal P(X)$、$P(u)(S)=u^{-1}(S)$ と取る。[冪集合の反変関手](../CAT1-10/index.md#def-cat1-10-contra-representable)は逆像の恒等射・合成則を満たす。元 $S=\{1\}\in P(2)$ に対応する成分は

$$
\alpha^S_X(f)=f^{-1}(\{1\})\quad(f:X\to2).
$$

$X=\{a,b,c\}$ で $f(a)=f(c)=1$, $f(b)=0$ なら $\alpha^S_X(f)=\{a,c\}$。$u:Y\to X$ に対する自然性は $u^{-1}(f^{-1}(S))=(f\circ u)^{-1}(S)$ で直接確認できる。$S=\varnothing,\{0\},\{1\},2$ の四種類は、恒等射での値が異なるので四つの異なる自然変換を与える。

ここでは $P$ がたまたま表現可能だが、補題の証明はこの事実を一度も使わなかった。**全単射なのは自然変換全体と $P(A)$ の対応であり、個々の $\alpha_X$ が全単射である必要はない。**

## 3. 共変 Yoneda：$A\to X$ の値も $1_A$ から決まる

共変集合値関手 $F:\mathcal C\to\mathbf{Set}$ では、代表射の向きが $A\to X$ になる。自然変換 $\beta:h_A\Rightarrow F$ に対し、$y=\beta_A(1_A)\in F(A)$ を固定すれば $g:A\to X$ の像は $F(g)(y)$ となる。

<a id="thm-cat1-11-covariant-yoneda"></a>

<!-- formal-statement-start -->
> **定理（共変Yonedaの補題）**
> 局所小圏 $\mathcal C$、対象 $A\in\mathcal C$、任意の共変集合値関手 $F:\mathcal C\to\mathbf{Set}$ に対して、評価写像

$$
\begin{aligned}
\operatorname{ev}_{A,F}:\operatorname{Nat}(h_A,F)&\longrightarrow F(A),\\
\beta&\longmapsto\beta_A(1_A)
\end{aligned}
$$

> は全単射である。$y\in F(A)$ に対応する自然変換 $\beta^y:h_A\Rightarrow F$ は

$$
\beta^y_X(g)=F(g)(y)
\quad(X\in\mathcal C,\ g:A\to X)
$$

> で与えられる。$F$ の表現可能性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

反変の場合は射 $X\to A$ に自然性を適用した。今度は $g:A\to X$ に自然性を適用し、$h_A(g)(1_A)=g\circ1_A=g$ とする。逆構成の自然性には共変関手の合成則を使う。

<!-- proof-start -->
### 証明

$\beta:h_A\Rightarrow F$ を任意に取り、$y=\beta_A(1_A)$ と置く。$g:A\to X$ での自然性は

$$
F(g)\circ\beta_A=\beta_X\circ h_A(g)
$$

である。これを $1_A$ で評価すれば

$$
\begin{aligned}
\beta_X(g)
 &=\beta_X(h_A(g)(1_A))\\
 &=F(g)(\beta_A(1_A))\\
 &=F(g)(y).
\end{aligned}
$$

したがって評価は単射。逆に $y\in F(A)$ に対して各 $\beta^y_X:h_A(X)\to F(X)$ を $g\mapsto F(g)(y)$ と定める。$F(g):F(A)\to F(X)$ なので型が合う。任意の $u:X\to Y$、$g:A\to X$ に対し[共変関手の合成則](../CAT1-06/index.md#def-cat1-06-functor)から

$$
\begin{aligned}
F(u)(\beta^y_X(g))
 &=F(u)(F(g)(y))\\
 &=F(u\circ g)(y)\\
 &=\beta^y_Y(u\circ g)\\
 &=\beta^y_Y(h_A(u)(g)).
\end{aligned}
$$

従って $\beta^y$ は自然変換で、$\beta^y_A(1_A)=F(1_A)(y)=y$。最初の式に戻れば、元の $\beta$ から復元した $\beta^y$ が全成分で $\beta$ に一致する。よって全単射である。$\square$
<!-- proof-end -->

**直接例：二つの値を選ぶ。** $F(X)=X\times X$、$F(u)(x_0,x_1)=(u(x_0),u(x_1))$ とする。$A=2$、$y=(0,1)\in F(2)$ に対し

$$
\beta^y_X(g)=(g(0),g(1))\qquad(g:2\to X).
$$

$u:X\to Y$ の作用を左から行えば $(u(g(0)),u(g(1)))$、右から $u\circ g$ を代入しても同じ順序対になる。この場合 $y$ は前講の[共変普遍元](../CAT1-10/index.md#def-cat1-10-cov-universal)なので $\beta^y_X$ は全単射である。しかし $y=(0,0)$ を選んでも補題により自然変換 $g\mapsto(g(0),g(0))$ は存在する。この成分は一般に全射でなく、**補題と表現可能性の判定は別の主張**である。

| 比較 | 反変 Yoneda | 共変 Yoneda |
| --- | --- | --- |
| 入力の関手 | $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ | $F:\mathcal C\to\mathbf{Set}$ |
| Hom の元 | $f:X\to A$ | $g:A\to X$ |
| 恒等射の像 | $x\in P(A)$ | $y\in F(A)$ |
| 復元式 | $P(f)(x)$ | $F(g)(y)$ |

## 4. 二つの変数の自然性：対象と関手を変えても対応する

これまでの全単射は、$A$ と $P$（または $F$）をそれぞれ固定して証明した。しかし「自然な同型」と呼ぶためには、**入力の対象を変える場合**と**関手を自然変換で変える場合**にも、対応が両立しなければならない。

まず反変の場合を手で考える。射 $t:A\to B$ を与えると、任意の $g:X\to A$ を $t\circ g:X\to B$ に送れる。これは $h^A$ から $h^B$ への自然変換 $h^t$ を作る。他方、反変関手 $P$ の作用は $P(t):P(B)\to P(A)$ であり、反対向きだ。$\alpha:h^B\Rightarrow P$ に $h^t$ を前合成すると、$h^A\Rightarrow P$ になる。この向きの対応が自然性の要点である。

共変の場合、同じ $t:A\to B$ は $h_B$ から $h_A$ への自然変換を作る。$g:B\to X$ を $g\circ t:A\to X$ に送るからである。これに $h_A\Rightarrow F$ を合成すると、$h_B\Rightarrow F$ を得るので、評価値も $F(t):F(A)\to F(B)$ の向きへ移る。

<a id="prop-cat1-11-bivariable-naturality"></a>

<!-- formal-statement-start -->
> **命題（Yoneda対応の二変数自然性）**
> 局所小圏 $\mathcal C$、対象 $A,B$、射 $t:A\to B$ について、次が成立する。
>
> 1. 反変関手 $P,Q:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ と自然変換 $\eta:P\Rightarrow Q$、$\alpha:h^B\Rightarrow P$ に対して、$h^t_X(g)=t\circ g$ と置けば

$$
\begin{aligned}
\operatorname{ev}_{B,Q}(\eta\circ\alpha)
 &=\eta_B(\operatorname{ev}_{B,P}(\alpha)),\\
\operatorname{ev}_{A,P}(\alpha\circ h^t)
 &=P(t)(\operatorname{ev}_{B,P}(\alpha)).
\end{aligned}
$$

> 2. 共変関手 $F,G:\mathcal C\to\mathbf{Set}$ と自然変換 $\theta:F\Rightarrow G$、$\beta:h_A\Rightarrow F$ に対して、$(h_t)_X(g)=g\circ t$（$g:B\to X$）と置けば

$$
\begin{aligned}
\operatorname{ev}_{A,G}(\theta\circ\beta)
 &=\theta_A(\operatorname{ev}_{A,F}(\beta)),\\
\operatorname{ev}_{B,F}(\beta\circ h_t)
 &=F(t)(\operatorname{ev}_{A,F}(\beta)).
\end{aligned}
$$

> ここで $h^t:h^A\Rightarrow h^B$ と $h_t:h_B\Rightarrow h_A$ はそれぞれ表示した成分を持つ自然変換である。$\circ$ は自然変換の成分ごとの合成を表す。
<!-- formal-statement-end -->

### 証明の見取り図

関手を変える式は評価と成分ごとの合成の交換である。対象を変える式は、$1_A$ または $1_B$ を $t$ に送った後、$t$ に対する $\alpha$ または $\beta$ の自然性を使う。方向が逆になるのは Hom の射の作用そのものから出る。

<!-- proof-start -->
### 証明

まず $h^t$ が自然であることを確かめる。$u:X\to Y$ と $g:Y\to A$ について

$$
h^B(u)(h^t_Y(g))=(t\circ g)\circ u
=t\circ(g\circ u)=h^t_X(h^A(u)(g)).
$$

同じく $h_t$ は、$u:X\to Y$ と $g:B\to X$ に対して

$$
h_A(u)((h_t)_X(g))=u\circ(g\circ t)
=(u\circ g)\circ t=(h_t)_Y(h_B(u)(g))
$$

を満たすから自然変換である。

**反変、関手側。** [垂直合成](../CAT1-08/index.md#def-cat1-08-vertical)の成分は $(\eta\circ\alpha)_B=\eta_B\circ\alpha_B$ だから

$$
(\eta\circ\alpha)_B(1_B)=\eta_B(\alpha_B(1_B)).
$$

**反変、対象側。** $h^t_A(1_A)=t\circ1_A=t$ である。また $\alpha$ の自然性を射 $t:A\to B$ と $1_B\in h^B(B)$ に適用すると

$$
\alpha_A(t)=P(t)(\alpha_B(1_B)).
$$

ゆえに

$$
(\alpha\circ h^t)_A(1_A)
=\alpha_A(h^t_A(1_A))
=P(t)(\alpha_B(1_B)).
$$

**共変、関手側。** 同じく $(\theta\circ\beta)_A(1_A)=\theta_A(\beta_A(1_A))$。

**共変、対象側。** $(h_t)_B(1_B)=1_B\circ t=t$ であり、$\beta$ の自然性を $t:A\to B$ と $1_A\in h_A(A)$ に適用すると

$$
\beta_B(t)=F(t)(\beta_A(1_A)).
$$

従って $(\beta\circ h_t)_B(1_B)=F(t)(\beta_A(1_A))$。四つの等式を得た。$\square$
<!-- proof-end -->

自然性は形式上の飾りではない。たとえば反変で $t:A\to B$ を動かしたとき、右辺に現れるのは $P(t):P(B)\to P(A)$ である。右辺を $P(A)\to P(B)$ の写像と取り違えると、式の型から破綻する。

## 5. 自然性を忘れると何が壊れるか

一対象圏 $\mathcal C$ を、唯一の対象 $*$ と二つの自己射 $1,e$ で作る。合成は $1$ が単位射、$e\circ e=e$ と定める（[モノイドから一対象圏を作る命題](../CAT1-02/index.md#prop-cat1-02-one-object)を参照）。共変集合値関手 $F$ を $F(*)=\{0,1\}$、$F(1)=F(e)=1_{\{0,1\}}$ とする。関手公理は $F(e\circ e)=1=F(e)\circ F(e)$ などから成立する。

ここで **自然変換ではない** 二つの単なる集合間写像 $u,v:h_*(*)=\{1,e\}\to F(*)$ を

$$
\begin{array}{c|cc}
 &1&e\\ \hline
u&0&0\\
v&0&1
\end{array}
$$

で定める。両者は恒等射での値が $u(1)=v(1)=0$ と一致するのに、$e$ での値は異なる。$v$ が自然でないのは、自然性を射 $e$ と $1$ に要求すると

$$
v(e\circ1)=F(e)(v(1))=0
$$

が必要なのに、左辺が $v(e)=1$ だからである。Yoneda の補題は**自然性という強い整合条件があるから**、一つの評価値で全成分が決まるのである。

## 6. 射そのものを自然変換として見る

反変 Yoneda の補題を $P=h^B$ に適用すると、$P(A)=\operatorname{Hom}_{\mathcal C}(A,B)$ だから

$$
\operatorname{Nat}(h^A,h^B)
\cong\operatorname{Hom}_{\mathcal C}(A,B).
$$

射 $t:A\to B$ に対応する自然変換は $g:X\to A$ に $t\circ g:X\to B$ を対応させる $h^t$ である。実際 $h^t_A(1_A)=t$。一方、共変の場合には

$$
\operatorname{Nat}(h_B,h_A)
\cong\operatorname{Hom}_{\mathcal C}(A,B),
$$

であり、射 $t:A\to B$ に対応する成分は $g:B\to X$ を $g\circ t:A\to X$ に送る。ここでも Hom の向きを逆にしないことが重要である。

この計算は次講で、対象と射をまとめて集合値関手の世界へ埋め込む **Yoneda 埋め込み**につながる。いま分かったのは、対象 $A$ と $B$ の間の射を、すべての対象 $X$ での Hom 集合の自然な対応から復元できる、という事実である。

## 7. 演習：評価・復元・二変数自然性

### CAT1-11-A01 反変関手の自然性を型で検査する

- Level: A

局所小圏 $\mathcal C$、$A\in\mathcal C$、反変関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ を取る。$x\in P(A)$ に対し $\alpha_X(f)=P(f)(x)$（$f:X\to A$）と置く。$u:X\to Y$、$g:Y\to A$ に対する自然性の両辺を、各写像の始域・終域を明記して計算せよ。

<!-- solution-start -->
**詳細解答**。$h^A(u)$ は $\operatorname{Hom}(Y,A)\to\operatorname{Hom}(X,A)$ で、$g$ を $g\circ u$ に送る。一方、$\alpha_Y$ は $\operatorname{Hom}(Y,A)\to P(Y)$、$P(u)$ は $P(Y)\to P(X)$、$\alpha_X$ は $\operatorname{Hom}(X,A)\to P(X)$ である。よって比較する二つの合成はともに $\operatorname{Hom}(Y,A)\to P(X)$ を型に持つ。

$$
\begin{aligned}
(P(u)\circ\alpha_Y)(g)
 &=P(u)(P(g)(x))\\
 &=P(g\circ u)(x),\\
(\alpha_X\circ h^A(u))(g)
 &=\alpha_X(g\circ u)\\
 &=P(g\circ u)(x).
\end{aligned}
$$

中央の一致は[反変関手の合成則](../CAT1-06/index.md#def-cat1-06-contravariant)により、$P(u)P(g)=P(g\circ u)$ となるからである。両者は全ての $g$ で一致するので自然性が成立する。
<!-- solution-end -->
### CAT1-11-A02 終対象への射から二種類の自然変換

- Level: A

$P(X)=\mathcal P(X)$ を $\mathbf{Set}$ 上の反変冪集合関手とし、$A=1=\{*\}$ とする。$P(1)$ の二つの元から生じる $\alpha:h^1\Rightarrow P$ の各成分を具体的に求め、互いに異なることを示せ。空集合 $X=\varnothing$ でも検査せよ。

<!-- solution-start -->
**詳細解答**。$P(1)=\{\varnothing,1\}$ である。任意の集合 $X$ から $1$ への写像 $!_X$ は一意だから、$h^1(X)=\{!_X\}$ は一元集合である。反変 Yoneda の[復元式](#thm-cat1-11-contravariant-yoneda)により

$$
\alpha^{\varnothing}_X(!_X)=!_X^{-1}(\varnothing)=\varnothing,
\qquad
\alpha^1_X(!_X)=!_X^{-1}(1)=X.
$$

$X=1$ では前者の値は $\varnothing$、後者は $1$ なので二つの自然変換は異なる。$X=\varnothing$ の場合、どちらも空集合を値に取るが、これは $!_{\varnothing}^{-1}(1)=\varnothing$ となるためであり、自然変換全体の区別は $X=1$ で行う。任意の $u:X\to Y$ に対し $u^{-1}(\varnothing)=\varnothing$、$u^{-1}(Y)=X$ なので自然性も直接確認できる。
<!-- solution-end -->

### CAT1-11-A03 共変 Yoneda で対角写像を作る

- Level: A

$F(X)=X\times X$、$F(u)=u\times u$ とし、$A=1=\{*\}$、$y=(*,*)\in F(1)$ を取る。$\beta^y:h_1\Rightarrow F$ の成分を求め、$X=\{a,b\}$ での像を列挙せよ。また $X$ が二元集合なら、この成分が全射ではないことを示せ。

<!-- solution-start -->
**詳細解答**。写像 $g:1\to X$ は $x=g(*)$ により一意に決まる。[共変Yonedaの復元式](#thm-cat1-11-covariant-yoneda)に代入すると

$$
\beta^y_X(g)=F(g)(*,*)=(g(*),g(*))=(x,x).
$$

$X=\{a,b\}$ なら始域 $\operatorname{Hom}(1,X)$ は $g_a,g_b$ の二元集合で、像は $\{(a,a),(b,b)\}$。しかし $F(X)=X\times X$ には $(a,b)$ と $(b,a)$ も含まれ、これらは像に入らない。従って自然変換だが、この成分は全射でない。自然性は $u:X\to Y$ に対し $F(u)(x,x)=(u(x),u(x))=\beta^y_Y(u\circ g)$ で確認できる。
<!-- solution-end -->

### CAT1-11-A04 一対象圏で二つの元がどう作用するか

- Level: A

一対象圏の射を $\{1,e\}$、$e^2=e$ とする。共変関手 $F$ を $F(*)=\{0,1\}$、$F(1)=1$、$F(e)(0)=F(e)(1)=0$ で定める。$F$ が関手であることを確認し、二つの元 $y=0,1$ に対応する自然変換 $h_*\Rightarrow F$ を全て求めよ。

<!-- solution-start -->
**詳細解答**。$F(e)\circ F(e)$ はどの元も $0$ に送るので $F(e)^2=F(e)=F(e^2)$。$1$ と $e$ の積についても $F(1)=1$ だから合成則と恒等射保存が成り立ち、$F$ は関手である。$h_*(*)=\{1,e\}$ なので[共変Yonedaの復元式](#thm-cat1-11-covariant-yoneda)から

$$
\begin{array}{c|cc}
 &1&e\\ \hline
\beta^0&0&0\\
\beta^1&1&0
\end{array}
$$

となる。自然性を射 $e$ で確認する。$h_*(e)$ は $1\mapsto e$、$e\mapsto e$ とする写像で、$F(e)$ は両元を $0$ に送る。$\beta^0$、$\beta^1$ のいずれに対しても $F(e)(\beta^y(1))=0=\beta^y(e)$、$F(e)(\beta^y(e))=0=\beta^y(e)$ で一致する。射 $1$ では両辺がそのまま一致する。評価 $\beta^y(1)=y$ が異なるので二つは別の自然変換であり、補題から他にはない。
<!-- solution-end -->

### CAT1-11-A05 自然性を持たない写像を排除する

- Level: A

第5節の一対象圏 $\{1,e\}$（$e^2=e$）と、$F(*)=\{0,1\}$、$F(e)=1_{\{0,1\}}$ を使う。集合写像 $w:\{1,e\}\to\{0,1\}$ が自然変換 $h_*\Rightarrow F$ の成分になるための必要十分条件を求め、自然変換を全て列挙せよ。

<!-- solution-start -->
**詳細解答**。射 $e$ に関する自然性を元 $1$ で評価すると

$$
w(e)=w(e\circ1)=F(e)(w(1))=w(1).
$$

必要条件は $w(e)=w(1)$ である。逆にこの条件があれば、射 $e$ の作用 $1\mapsto e$、$e\mapsto e$ に対し、両側とも常に同じ値 $w(1)$ となる。射 $1$ での自然性は恒等写像どうしなので自動的に成立する。よって必要十分である。$w(1)$ は $0$ または $1$ の二通りなので、自然変換は定値 $0$ と定値 $1$ の二つだけ。二つの集合写像が $1$ で一致しても自然性を仮定しなければ $e$ で一致するとは限らないが、自然変換に限れば一致する。
<!-- solution-end -->

### CAT1-11-B01 関手側の自然性を冪集合で計算する

- Level: B

$P(X)=\mathcal P(X)$ を反変冪集合関手とする。$\eta_X(S)=X\setminus S$ と置き、$\eta:P\Rightarrow P$ が自然変換であることを証明せよ。さらに $A=2$、$U\subseteq2$、$\alpha^U:h^2\Rightarrow P$ として、$\eta\circ\alpha^U$ に対応する $P(2)$ の元を求め、任意の $X$ と $f:X\to2$ でも復元式を確認せよ。

<!-- solution-start -->
**詳細解答**。$\eta_X$ は部分集合をその補集合へ送る写像 $P(X)\to P(X)$ である。$u:X\to Y$ と $S\subseteq Y$ に対し

$$
\begin{aligned}
(P(u)\circ\eta_Y)(S)
 &=u^{-1}(Y\setminus S)\\
 &=X\setminus u^{-1}(S)\\
 &=(\eta_X\circ P(u))(S).
\end{aligned}
$$

真ん中の等式は、$x\in X$ が左辺に入ることと $u(x)\notin S$ が同値であることから従う。よって自然性が成立する。$\alpha^U_2(1_2)=U$ なので、[関手側の自然性](#prop-cat1-11-bivariable-naturality)から $\eta\circ\alpha^U$ の評価値は

$$
\eta_2(U)=2\setminus U.
$$

任意の $f:X\to2$ に対しても

$$
\begin{aligned}
(\eta\circ\alpha^U)_X(f)
 &=X\setminus f^{-1}(U)\\
 &=f^{-1}(2\setminus U)\\
 &=\alpha^{2\setminus U}_X(f).
\end{aligned}
$$

したがって評価値と全成分での復元の双方が一致する。
<!-- solution-end -->

### CAT1-11-B02 対象側の反変自然性を有限集合で確かめる

- Level: B

$A=1=\{*\}$、$B=2=\{0,1\}$、$t:A\to B$ を $t(*)=1$ とする。反変冪集合関手 $P$ と $U\subseteq B$ を取り、$\alpha^U:h^B\Rightarrow P$ を Yoneda の復元式で定義する。$\alpha^U\circ h^t:h^A\Rightarrow P$ の評価値と全成分を求め、$P(t)$ との関係を直接確かめよ。

<!-- solution-start -->
**詳細解答**。$h^t_X(g)=t\circ g$（$g:X\to A$）であり、$h^t_A(1_A)=t$。従って[対象側の自然性](#prop-cat1-11-bivariable-naturality)の左辺の評価値は

$$
\begin{aligned}
(\alpha^U\circ h^t)_A(1_A)
 &=\alpha^U_A(t)\\
 &=t^{-1}(U)\\
 &=P(t)(U).
\end{aligned}
$$

$A$ は一元集合だから、$1\in U$ なら $t^{-1}(U)=A$、$1\notin U$ なら $t^{-1}(U)=\varnothing$ である。任意の $X$ の唯一の写像 $g:X\to A$ に対して

$$
\begin{aligned}
(\alpha^U\circ h^t)_X(g)
 &=\alpha^U_X(t\circ g)\\
 &=(t\circ g)^{-1}(U)\\
 &=g^{-1}(t^{-1}(U)).
\end{aligned}
$$

これは評価値 $P(t)(U)\in P(A)$ から Yoneda の逆写像で復元した式そのものである。結果は $1\in U$ なら $X$、そうでなければ $\varnothing$ となる。
<!-- solution-end -->

### CAT1-11-B03 対象側の共変自然性と値の選び直し

- Level: B

$A=\{0,1\}$、$B=\{a,b,c\}$、$t:A\to B$ を $t(0)=a,t(1)=c$ とする。$F(X)=X\times X$ と $y=(0,1)\in F(A)$ を取り、$\beta^y:h_A\Rightarrow F$ を共変Yonedaで作る。$h_t:h_B\Rightarrow h_A$ と合成した自然変換を各 $X$ で記述し、その $1_B$ での評価が $F(t)(y)$ になることを確認せよ。

<!-- solution-start -->
**詳細解答**。$g:B\to X$ に対して $(h_t)_X(g)=g\circ t:A\to X$ なので、合成の成分は

$$
\begin{aligned}
(\beta^y\circ h_t)_X(g)
 &=\beta^y_X(g\circ t)\\
 &=((g\circ t)(0),(g\circ t)(1))\\
 &=(g(a),g(c)).
\end{aligned}
$$

評価する対象を $X=B$、射を $g=1_B$ に指定すると

$$
(\beta^y\circ h_t)_B(1_B)=(a,c)
=F(t)(0,1)=F(t)(y).
$$

この結果は[共変側の二変数自然性](#prop-cat1-11-bivariable-naturality)と一致する。合成が自然であることも $u:X\to Y$ に対し $F(u)(g(a),g(c))=(u(g(a)),u(g(c)))=((u\circ g)(a),(u\circ g)(c))$ から確認できる。
<!-- solution-end -->

### CAT1-11-B04 一対象圏での自然変換と交換作用

- Level: B

一対象圏 $\mathcal C$ の射を $\{1,s\}$、$s\circ s=1$ とする。$F(*)=\{0,1\}$、$F(1)=1$、$F(s)$ は $0$ と $1$ を交換する写像とする。関手条件を確認した上で、二つの自然変換 $h_*\Rightarrow F$ を成分の値として求め、射 $s$ に関する自然性を両方で検証せよ。

<!-- solution-start -->
**詳細解答**。$F(s)^2=1_{\{0,1\}}=F(1)=F(s\circ s)$、また $F(1)=1$ なので、関手の恒等射・合成保存が成立する。$h_*(*)=\{1,s\}$ に対して、[共変Yonedaの補題](#thm-cat1-11-covariant-yoneda)は $F(*)$ の二つの元 $y=0,1$ から全ての自然変換を得る。

$$
\begin{array}{c|cc}
 &1&s\\ \hline
\beta^0&0&1\\
\beta^1&1&0
\end{array}
$$

$h_*(s)$ は $1\mapsto s$、$s\mapsto1$ と作用する。$\beta^0$ では

$$
\begin{aligned}
F(s)(\beta^0(1))&=F(s)(0)=1=\beta^0(s),\\
F(s)(\beta^0(s))&=F(s)(1)=0=\beta^0(1).
\end{aligned}
$$

$\beta^1$ でも

$$
\begin{aligned}
F(s)(\beta^1(1))&=F(s)(1)=0=\beta^1(s),\\
F(s)(\beta^1(s))&=F(s)(0)=1=\beta^1(1).
\end{aligned}
$$

よって $F(s)\circ\beta^y=\beta^y\circ h_*(s)$ である。射 $1$ に関しては恒等写像なので自動的に成立する。二つ以外がないことは $\beta^y(1)=y$ と Yoneda の全単射から従う。
<!-- solution-end -->

### CAT1-11-C01 冪集合の自然自己変換をすべて分類する

- Level: C

$P:\mathbf{Set}^{\mathrm{op}}\to\mathbf{Set}$ を $P(X)=\mathcal P(X)$、$P(f)(S)=f^{-1}(S)$ で定める。自然変換 $T:P\Rightarrow P$ の全体を分類せよ。次を順に示すこと。

1. $2=\{0,1\}$ に対して、$\chi_S:X\to2$ を $S\subseteq X$ の特性写像とすると、$\iota_X(f)=f^{-1}(\{1\})$ は自然同型 $h^2\Rightarrow P$ である。
2. $T\circ\iota:h^2\Rightarrow P$ に反変Yonedaを適用して $T_X(S)$ を一つの $U\subseteq2$ から求めよ。
3. 自然自己変換の全候補を列挙し、実際に自然で互いに異なることを示せ。

<!-- solution-start -->
**詳細解答**。

**1. 表現の確認。** 各 $S\subseteq X$ に対し $\chi_S(x)=1$ if $x\in S$、それ以外は $0$ と定める。この写像は $\chi_S^{-1}(\{1\})=S$ を満たし、逆に $f^{-1}(\{1\})=S$ を満たす $f:X\to2$ は全ての $x$ で $f(x)=\chi_S(x)$ となる。従って $\iota_X$ は全単射で、逆は $S\mapsto\chi_S$ である。$u:Y\to X$ について

$$
P(u)(\iota_X(f))=u^{-1}(f^{-1}(\{1\}))
=(f\circ u)^{-1}(\{1\})=\iota_Y(f\circ u).
$$

従って自然同型となる。これは前講の[反変表現可能性の直接例](../CAT1-10/index.md#def-cat1-10-contra-representable)も再確認している。

**2. Yonedaによる決定。** 任意の自然変換 $T:P\Rightarrow P$ に対し $\alpha=T\circ\iota:h^2\Rightarrow P$ と置く。[反変Yonedaの補題](#thm-cat1-11-contravariant-yoneda)によれば、$\alpha$ は

$$
U=\alpha_2(1_2)=T_2(\{1\})\subseteq2
$$

だけで決まり、任意の $f:X\to2$ で $\alpha_X(f)=f^{-1}(U)$ となる。$S\subseteq X$ に $f=\chi_S$ を代入すると $\iota_X(\chi_S)=S$ なので

$$
T_X(S)=(T_X\circ\iota_X)(\chi_S)
=\alpha_X(\chi_S)=\chi_S^{-1}(U).
$$

**3. 四種類の分類。** $U\subseteq2$ は次の四つしかない。

| $U$ | $\chi_S^{-1}(U)=T_X(S)$ | 操作 |
| --- | --- | --- |
| $\varnothing$ | $\varnothing$ | 常に空集合 |
| $\{0\}$ | $X\setminus S$ | 補集合 |
| $\{1\}$ | $S$ | 恒等写像 |
| $\{0,1\}$ | $X$ | 常に全体集合 |

それぞれ $T_X:\mathcal P(X)\to\mathcal P(X)$ として定まる。自然性は、任意の $u:Y\to X$ に対して

$$
\begin{aligned}
T_Y(u^{-1}(S))
 &=(\chi_{u^{-1}(S)})^{-1}(U)\\
 &=(\chi_S\circ u)^{-1}(U)\\
 &=u^{-1}(\chi_S^{-1}(U))\\
 &=u^{-1}(T_X(S))
\end{aligned}
$$

となることから直接従う。第2行は任意の $y\in Y$ で $\chi_{u^{-1}(S)}(y)=1$ と $u(y)\in S$ が同値だからである。さらに $X=2$、$S=\{1\}$ とすると $T_2(S)=U$ なので、四つの $U$ は異なる自然自己変換を与える。以上で、漏れなくちょうど四つと分類できた。
<!-- solution-end -->
