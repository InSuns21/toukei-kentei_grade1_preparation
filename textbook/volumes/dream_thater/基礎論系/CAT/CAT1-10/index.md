# CAT1-10 表現可能関手と普遍元

## 1. 「要素を選ぶ」ことを射の集合で言い直す

これまで[共変・反変 Hom 関手](../CAT1-06/index.md#def-cat1-06-hom-functors)を作り、[自然同型](../CAT1-07/index.md#def-cat1-07-natural-isomorphism)によって関手の値を射と両立させて比較できるようになった。ここでは逆に、集合値関手 $F$ の各集合 $F(X)$ を、**ある固定した対象から出る射、またはそこへ入る射**として記述できるかを問う。

最初の例は集合の圏 $\mathbf{Set}$ の恒等関手 $I(X)=X$ である。一元集合 $1=\{*\}$ を取ると、写像 $f:1\to X$ は値 $f(*)$ を一つ選ぶことと同じである。

$$
\operatorname{Hom}_{\mathbf{Set}}(1,X)\longrightarrow X,
\qquad f\longmapsto f(*).
$$

この対応は全単射であるだけでなく、$h:X\to Y$ を適用したとき

$$
(h\circ f)(*)=h(f(*))
$$

なので、$X$ の選び方に対して自然である。$*$ という一つの「元」が、すべての集合 $X$ での元の選択を生み出した。

以下、$\mathcal C$ は[局所小圏](../CAT1-02/index.md#def-cat1-02-size)とし、$\mathbf{Set}$ は集合を対象、写像を射とする（一般には小さくない）圏とする。したがって $\operatorname{Hom}_{\mathcal C}(A,X)$ は集合である。集合値関手の等式は対象ごとの集合の等式だけでなく、各射に対する自然性まで確認する。

## 2. 共変の場合：固定した対象から出る射

[共変 Hom 関手](../CAT1-06/index.md#def-cat1-06-hom-functors) $\operatorname{Hom}_{\mathcal C}(A,-):\mathcal C\to\mathbf{Set}$ は、対象 $X$ に $A\to X$ の射全体を、射 $h:X\to Y$ に写像 $f\mapsto h\circ f$ を対応させる。

この Hom 関手と自然同型になる集合値関手を「共変に表現可能」と呼ぶ。固定対象 $A$ は表現対象、対応を生み出す $A$ での特別な元は普遍元と呼ばれる。

<a id="def-cat1-10-cov-representable"></a>

<!-- formal-statement-start -->
> **定義（共変表現可能関手・表現対象）**  
> 局所小圏 $\mathcal C$ と共変関手 $F:\mathcal C\to\mathbf{Set}$ に対し、ある対象 $A\in\mathcal C$ と自然同型

$$
\theta:\operatorname{Hom}_{\mathcal C}(A,-)
\xRightarrow{\sim}F
$$

> が存在するとき、$F$ は **共変に表現可能** であり、$A$ をその **表現対象** という。各 $\theta_X$ は全単射で、任意の $h:X\to Y$ と $f:A\to X$ について

$$
F(h)(\theta_X(f))=\theta_Y(h\circ f)
$$

> が成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-10-cov-representable -->
**定義の確認**。$F=I:\mathbf{Set}\to\mathbf{Set}$、$A=1$ とし、$\theta_X(f)=f(*)$ と置く。任意の $x\in X$ にはただ一つの写像 $f_x:1\to X$、$f_x(*)=x$ が対応し、$\theta_X^{-1}(x)=f_x$ である。任意の $h:X\to Y$ について $I(h)(\theta_X(f))=h(f(*))=\theta_Y(h\circ f)$。したがって全対象での全単射と全射に関する自然性の両方が検証できた。
<!-- definition-example-end -->

自然同型 $\theta$ は全対象で一度に指定する必要がありそうだが、実は $\theta_A(1_A)$ だけで決まる。これは次講の Yoneda の補題の特別な入口であるが、ここでは必要な式を直接導く。

<a id="def-cat1-10-cov-universal"></a>

<!-- formal-statement-start -->
> **定義（共変普遍元）**  
> 共変集合値関手 $F:\mathcal C\to\mathbf{Set}$ に対し、対象 $A$ と元 $u\in F(A)$ の組 $(A,u)$ が **共変普遍元** であるとは、任意の対象 $X$ と任意の $x\in F(X)$ について、ただ一つの射 $f:A\to X$ が存在して

$$
F(f)(u)=x
$$

> を満たすことをいう。言い換えれば、各 $X$ での写像 $\Phi_X:f\mapsto F(f)(u)$ は全単射である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-10-cov-universal -->
**定義の確認**。恒等関手 $I$ について $(1,*)$ を考える。$x\in I(X)=X$ を指定すると、$f_x(*)=x$ とする写像 $f_x:1\to X$ が存在し、$I(f_x)(*)=x$ を満たす。別の $g$ が $g(*)=x$ を満たすなら、始域 $1$ の唯一の元で値が一致するので $g=f_x$。存在と一意性の両方を確かめた。
<!-- definition-example-end -->

<a id="thm-cat1-10-cov-criterion"></a>

<!-- formal-statement-start -->
> **定理（共変表現可能性と普遍元の同値）**  
> 局所小圏 $\mathcal C$ と共変集合値関手 $F:\mathcal C\to\mathbf{Set}$、対象 $A\in\mathcal C$ に対して、以下は同値である。
>
> 1. $A$ による自然同型 $\theta:\operatorname{Hom}_{\mathcal C}(A,-)\Rightarrow F$ が存在する。
> 2. $u\in F(A)$ が存在し、$(A,u)$ は[共変普遍元](#def-cat1-10-cov-universal)である。
>
> この対応は $u=\theta_A(1_A)$、$\theta_X(f)=F(f)(u)$ で与えられ、同じ $u$ を与える自然同型はただ一つである。
<!-- formal-statement-end -->

### 証明の見取り図

自然性を射 $f:A\to X$ と $1_A$ に使うと、$\theta_X(f)$ は $\theta_A(1_A)$ の像に等しくなる。逆に普遍元から作る全単射族は、関手の合成保存のため自然になる。

<!-- proof-start -->
### 証明

**（1）$\Rightarrow$（2）。** 自然同型 $\theta$ があるとし $u:=\theta_A(1_A)\in F(A)$ を取る。任意の $f:A\to X$ に対し、[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)を $A\xrightarrow{f}X$ と $1_A\in\operatorname{Hom}(A,A)$ へ適用すると

$$
\theta_X(f\circ1_A)=F(f)(\theta_A(1_A)),
\qquad\text{すなわち}\qquad
\theta_X(f)=F(f)(u).
$$

各 $\theta_X$ は全単射なので、任意の $x\in F(X)$ にただ一つの $f=\theta_X^{-1}(x)$ があり $F(f)(u)=x$ となる。これは普遍元の存在・一意性である。

**（2）$\Rightarrow$（1）。** $(A,u)$ が共変普遍元であるとし、$\theta_X(f):=F(f)(u)$ と定める。普遍元の条件そのものにより、各 $\theta_X$ は全単射である。$h:X\to Y$ と $f:A\to X$ に対して[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)から

$$
\begin{aligned}
F(h)(\theta_X(f))
 &=F(h)(F(f)(u))\\
 &=F(h\circ f)(u)\\
 &=\theta_Y(h\circ f).
\end{aligned}
$$

よって $\theta$ は自然変換であり、成分が全単射なので[自然同型の成分判定](../CAT1-07/index.md#prop-cat1-07-componentwise-iso)により自然同型となる。最後に $\theta_A(1_A)=F(1_A)(u)=u$ で、最初の方向の等式により同じ $u$ を持つどんな $\theta$ も $\theta_X(f)=F(f)(u)$ に一致する。$\square$
<!-- proof-end -->

この定理のポイントは「単に各 $F(X)$ と Hom 集合の濃度が一致する」ことではない。**一つの $u$ と関手の作用から全ての全単射を同時に作れる**という、射に関する自然性が本質である。

## 3. 反変の場合：固定した対象へ入る射

一方、$\operatorname{Hom}_{\mathcal C}(-,A)$ では $X$ から $A$ へ入る射を扱い、$h:X\to Y$ によって $g:Y\to A$ を $g\circ h:X\to A$ に引き戻す。これは[反変関手](../CAT1-06/index.md#def-cat1-06-contravariant)であり、共変の場合とは射の向きが逆である。

反変集合値関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ を固定する。$P(h):P(Y)\to P(X)$ は、元を $Y$ から $X$ へ引き戻す写像である。

<a id="def-cat1-10-contra-representable"></a>

<!-- formal-statement-start -->
> **定義（反変表現可能関手・表現対象）**  
> 局所小圏 $\mathcal C$ と反変集合値関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ に対して、ある対象 $A$ と自然同型

$$
\psi:\operatorname{Hom}_{\mathcal C}(-,A)
\xRightarrow{\sim}P
$$

> が存在するとき $P$ は **反変に表現可能** といい、$A$ を表現対象と呼ぶ。各 $\psi_X$ は全単射であり、任意の $h:X\to Y$、$g:Y\to A$ に対し

$$
P(h)(\psi_Y(g))=\psi_X(g\circ h)
$$

> を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-10-contra-representable -->
**定義の確認**。$P(X)=\mathcal P(X)$ を $X$ の部分集合全体とし、$P(h)(T)=h^{-1}(T)$ と定める。逆像の性質 $1_X^{-1}(T)=T$ と $(k\circ h)^{-1}(T)=h^{-1}(k^{-1}(T))$ により、これは反変関手である。$2=\{0,1\}$ を取り、$f:X\to2$ に $f^{-1}(\{1\})$ を対応させる。

どの $T\subseteq X$ にも $T$ 上では $1$、補集合では $0$ を返す写像 $\chi_T:X\to2$ がただ一つあるから全単射であり、$h:X\to Y$ と $g:Y\to2$ に対して

$$
h^{-1}(g^{-1}(\{1\}))=(g\circ h)^{-1}(\{1\})
$$

で自然性も成立する。従って冪集合関手は $2$ で反変に表現される。
<!-- definition-example-end -->

<a id="def-cat1-10-contra-universal"></a>

<!-- formal-statement-start -->
> **定義（反変普遍元）**  
> 反変集合値関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ に対し、$A\in\mathcal C$ と $u\in P(A)$ の組 $(A,u)$ が **反変普遍元** であるとは、任意の $X\in\mathcal C$ と $x\in P(X)$ に対し、ただ一つの射 $f:X\to A$ が存在して

$$
P(f)(u)=x
$$

> を満たすことをいう。すなわち $\Psi_X:\operatorname{Hom}_{\mathcal C}(X,A)\to P(X)$、$f\mapsto P(f)(u)$ が各 $X$ で全単射である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-10-contra-universal -->
**定義の確認**。冪集合関手について $A=2$、$u=\{1\}\in\mathcal P(2)$ と置く。$x=T\subseteq X$ を一つ指定すると、$P(f)(u)=f^{-1}(\{1\})=T$ を満たす写像は前述の $f=\chi_T$ である。$f(t)=1$ と $t\in T$ が同値なので、存在のみならず一意性も成立する。
<!-- definition-example-end -->

<a id="thm-cat1-10-contra-criterion"></a>

<!-- formal-statement-start -->
> **定理（反変表現可能性と普遍元の同値）**  
> 局所小圏 $\mathcal C$ と反変集合値関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$、対象 $A$ について、$\operatorname{Hom}_{\mathcal C}(-,A)\cong P$ という自然同型の存在と、$u\in P(A)$ で $(A,u)$ が[反変普遍元](#def-cat1-10-contra-universal)であることは同値である。対応式は

$$
u=\psi_A(1_A),\qquad \psi_X(f)=P(f)(u)
$$

> で、$u$ は自然同型 $\psi$ を一意に決める。
<!-- formal-statement-end -->

### 証明の見取り図

共変のとき $A\to X$ だった射を $X\to A$ に入れ替える。反変の自然性は、$h:X\to Y$ に対して $P(h):P(Y)\to P(X)$ となる点を式で確認する。

<!-- proof-start -->
### 証明

自然同型 $\psi$ があるとき $u=\psi_A(1_A)$ とする。任意の $f:X\to A$ に対する自然性の四角形を、上側の $\operatorname{Hom}(A,A)$ から下側の $\operatorname{Hom}(X,A)$ へたどると

$$
\psi_X(1_A\circ f)=P(f)(\psi_A(1_A))=P(f)(u).
$$

$\psi_X$ は全単射なので、各 $x\in P(X)$ にただ一つの $f:X\to A$ がある。逆に $(A,u)$ が反変普遍元なら $\psi_X(f)=P(f)(u)$ は全単射であり、$h:X\to Y$、$g:Y\to A$ に対して

$$
\begin{aligned}
P(h)(\psi_Y(g))
 &=P(h)(P(g)(u))\\
 &=P(g\circ h)(u)\\
 &=\psi_X(g\circ h).
\end{aligned}
$$

中央の等式は[反変関手の合成則](../CAT1-06/index.md#def-cat1-06-contravariant)である。したがって $\psi$ は自然同型。$\psi_A(1_A)=P(1_A)(u)=u$ で、任意の他の自然同型も最初の自然性の式で決まる。$\square$
<!-- proof-end -->

二種類の表現を取り違えないための型の確認を残しておく。

| 型 | 代表射 | 普遍元から作る像 | 自然性で使う射 |
| --- | --- | --- | --- |
| 共変 $F:\mathcal C\to\mathbf{Set}$ | $f:A\to X$ | $F(f)(u)\in F(X)$ | $h:X\to Y$ で $F(h):F(X)\to F(Y)$ |
| 反変 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ | $f:X\to A$ | $P(f)(u)\in P(X)$ | $h:X\to Y$ で $P(h):P(Y)\to P(X)$ |

## 4. 元を持つ対象の圏で普遍性を読む

「任意の $x$ に一意の射がある」という条件は、[始対象・終対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)の条件に似ている。その類似を正確に述べるため、関手の値に元を一つ付けた組を対象とする圏を作る。

<a id="def-cat1-10-elements-categories"></a>

<!-- formal-statement-start -->
> **定義（元の圏）**  
> 共変関手 $F:\mathcal C\to\mathbf{Set}$ の **元の圏** $\int F$ は、対象を $(X,x)$（$X\in\mathcal C$, $x\in F(X)$）とし、射 $(X,x)\to(Y,y)$ を $F(f)(x)=y$ を満たす $\mathcal C$ の射 $f:X\to Y$ とする。
>
> 反変関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ の **元の圏** $\int P$ では対象を $(X,x)$（$x\in P(X)$）とし、射 $(X,x)\to(Y,y)$ を $P(f)(y)=x$ を満たす射 $f:X\to Y$ とする。両者とも恒等射・合成は $\mathcal C$ から引き継ぐ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-10-elements-categories -->
**定義の確認**。恒等関手 $I$ では元の圏の対象は集合と選んだ元 $(X,x)$、射は $f(x)=y$ を満たす写像である。$1_X(x)=x$ なので恒等射があり、$f(x)=y$、$g(y)=z$ なら $(g\circ f)(x)=z$ なので合成も閉じている。

冪集合の反変関手では対象は $(X,S)$（$S\subseteq X$）、射 $(X,S)\to(Y,T)$ は $f^{-1}(T)=S$ を満たす写像である。恒等射は $1_X^{-1}(S)=S$、合成は $(g\circ f)^{-1}(U)=f^{-1}(g^{-1}(U))$ によって条件を保つ。
<!-- definition-example-end -->

<a id="prop-cat1-10-elements-criterion"></a>

<!-- formal-statement-start -->
> **命題（普遍元と始対象・終対象）**  
> 共変集合値関手 $F$ の組 $(A,u)$ が共変普遍元であることと、$\int F$ で**始対象**であることは同値である。反変集合値関手 $P$ の組 $(A,u)$ が反変普遍元であることと、$\int P$ で**終対象**であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

始対象からの射は $(A,u)\to(X,x)$、終対象への射は $(X,x)\to(A,u)$ である。これらの射の条件が、それぞれ普遍元の一意存在条件に一致する。

<!-- proof-start -->
### 証明

共変の場合、定義から

$$
\operatorname{Hom}_{\int F}((A,u),(X,x))
=\{f:A\to X\mid F(f)(u)=x\}.
$$

この集合が任意の $(X,x)$ について一元集合であることは、[始対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)と[共変普遍元の定義](#def-cat1-10-cov-universal)そのものである。反変の場合も

$$
\operatorname{Hom}_{\int P}((X,x),(A,u))
=\{f:X\to A\mid P(f)(u)=x\}
$$

が任意の $(X,x)$ について一元集合であることと、[終対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)が一致する。$\square$
<!-- proof-end -->

## 5. 表現対象はどれほど一意か

表現対象の名前が異なっても、同じ関手を表現していれば本当に違う対象とは限らない。普遍元まで指定すると、両方向の一意な射を作ってその合成を検査できる。

<a id="thm-cat1-10-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（普遍元付き表現対象の一意性）**  
> 局所小圏 $\mathcal C$ と集合値関手を固定する。
>
> - 共変 $F$ の共変普遍元 $(A,u)$ と $(B,v)$ があるとき、$F(t)(u)=v$ を満たす射 $t:A\to B$ はただ一つ存在し、同型射である。
> - 反変 $P$ の反変普遍元 $(A,u)$ と $(B,v)$ があるとき、$P(t)(v)=u$ を満たす射 $t:A\to B$ はただ一つ存在し、同型射である。
>
> 従って共変・反変のいずれでも、表現対象は同型を除いて一意である。「普遍元を保つ」という条件を加えると同型射も一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

共変では $(A,u)$ から $(B,v)$ へ、反変では $(B,v)$ の普遍性から $(A,u)$ に対応する射を作る。逆方向も作り、普遍元に作用させた合成が恒等射と同じになることを、一意性で示す。

<!-- proof-start -->
### 証明

**共変。** $(A,u)$ の普遍性を $X=B$, $x=v$ に適用すると、ただ一つの $t:A\to B$ で $F(t)(u)=v$ が存在する。$(B,v)$ に $X=A$, $x=u$ を適用すると $s:B\to A$ で $F(s)(v)=u$ が一意に存在する。[関手の合成則](../CAT1-06/index.md#def-cat1-06-functor)から

$$
F(s\circ t)(u)=F(s)(F(t)(u))=F(s)(v)=u
=F(1_A)(u).
$$

$(A,u)$ の普遍性を $X=A$, $x=u$ に適用したときの射の一意性から $s\circ t=1_A$。同様に $F(t\circ s)(v)=v=F(1_B)(v)$ なので $t\circ s=1_B$。[同型射の定義](../CAT1-03/index.md#def-cat1-03-isomorphism)より $t$ は同型射。

**反変。** $(B,v)$ の普遍性を $X=A$, $x=u$ に適用すると、ただ一つの $t:A\to B$ で $P(t)(v)=u$ が存在する。$(A,u)$ の普遍性から $s:B\to A$ で $P(s)(u)=v$ がある。反変の合成則により

$$
P(s\circ t)(u)=P(t)(P(s)(u))=P(t)(v)=u
=P(1_A)(u).
$$

$(A,u)$ における一意性から $s\circ t=1_A$。同じ計算を $B$ で行えば $t\circ s=1_B$。従って $t$ は同型で、選ばれた普遍元を対応させる射の一意性も定義から従う。$\square$
<!-- proof-end -->

例えば共変の恒等関手を一元集合 $\{*\}$ と一元集合 $\{a\}$ で表現したとき、普遍元を $*$ と $a$ に指定すると、唯一の対応同型は $*\mapsto a$ である。対象が等号で同一という意味ではない。

## 6. 表現できない関手もある

共変関手 $K_2:\mathbf{Set}\to\mathbf{Set}$ を、どの集合 $X$ にも二元集合 $2$ を、どの射にも $1_2$ を対応させる定値関手とする。もし $K_2\cong\operatorname{Hom}(A,-)$ なら $X=\varnothing$ で

$$
2\cong\operatorname{Hom}_{\mathbf{Set}}(A,\varnothing)
$$

となるはずだが、右辺は $A=\varnothing$ なら一元集合、$A\ne\varnothing$ なら空集合であり、二元集合にならない。したがって表現不可能である。反変の定値二元集合関手も $X=\varnothing$ で $\operatorname{Hom}(\varnothing,A)$ が常に一元集合であるため表現できない。

一方、**共変**の一元集合への定値関手 $K_1(X)=1$ は空集合 $\varnothing$ で表現できる。実際、各 $X$ へ $\varnothing\to X$ の写像がただ一つあり、射を合成しても唯一の写像へ移る。$\varnothing$ が[始対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)であることとも整合する。反変の定値一元集合関手は一元集合 $1$ が終対象なので $\operatorname{Hom}(X,1)$ で表現できる。**同じ定値関手でも共変と反変で表現対象が異なる**。

## 7. 演習：型・自然性・一意性を自分で確かめる

### CAT1-10-A01 二つの Hom の射の向き

- Level: A

局所小圏 $\mathcal C$、対象 $A$、射 $h:X\to Y$ を固定する。共変 $\operatorname{Hom}(A,-)$ と反変 $\operatorname{Hom}(-,A)$ が $h$ に対応させる二つの集合間写像を、始域・終域・元の像を明記して書け。各写像の恒等射保存も確認せよ。

<!-- solution-start -->
**詳細解答**。共変の作用は

$$
\operatorname{Hom}(A,X)\to\operatorname{Hom}(A,Y),
\quad f\mapsto h\circ f
$$

である。$f:A\to X$ だから合成 $h\circ f:A\to Y$ は型が合う。$h=1_X$ なら $1_X\circ f=f$。反変の作用は

$$
\operatorname{Hom}(Y,A)\to\operatorname{Hom}(X,A),
\quad g\mapsto g\circ h
$$

で、$g:Y\to A$ なので $g\circ h:X\to A$。$h=1_X$ なら $g\circ1_X=g$。[Hom関手の定義](../CAT1-06/index.md#def-cat1-06-hom-functors)の二種類を混同してはいけない。
<!-- solution-end -->

### CAT1-10-A02 集合の恒等関手の普遍元

- Level: A

$I:\mathbf{Set}\to\mathbf{Set}$ に対して $(1,*)$ が共変普遍元であることを、$X=\varnothing$ の場合も含めて証明し、対応する自然同型を式で記せ。

<!-- solution-start -->
**詳細解答**。$X\ne\varnothing$ と $x\in X$ に対し、$f_x:1\to X$ を $f_x(*)=x$ で定義する。一元集合上の写像はその唯一の値で決まるので一意。$I(f_x)(*)=x$ である。$X=\varnothing$ では $I(X)=\varnothing$ に元がなく、普遍元の「すべての $x$」という条件は空虚に成り立ち、実際 $\operatorname{Hom}(1,\varnothing)=\varnothing$ なので対応は空集合間の全単射となる。全体の写像は $\theta_X(f)=f(*)$ であり、$h:X\to Y$ に対して

$$
I(h)(\theta_X(f))=h(f(*))=\theta_Y(h\circ f).
$$

よって[共変判定定理](#thm-cat1-10-cov-criterion)の全条件が成立する。
<!-- solution-end -->

### CAT1-10-A03 冪集合の反変普遍元

- Level: A

$P(X)=\mathcal P(X)$、$P(h)(T)=h^{-1}(T)$ とする。$(2,\{1\})$ が反変普遍元であることを示し、$X=\{a,b,c\}$、$T=\{a,c\}$ のときの対応射を書け。

<!-- solution-start -->
**詳細解答**。$T\subseteq X$ に対し $\chi_T(x)=1$ if $x\in T$、$\chi_T(x)=0$ if $x\notin T$ と定める。$P(\chi_T)(\{1\})=\chi_T^{-1}(\{1\})=T$。逆に $f^{-1}(\{1\})=T$ なら $x\in T$ で $f(x)=1$、$x\notin T$ で $f(x)=0$ だから $f=\chi_T$ である。指定の例は $f(a)=f(c)=1$, $f(b)=0$。空集合についても空写像 $\varnothing\to2$ がただ一つあり、空集合の唯一の部分集合に対応する。[反変普遍元の定義](#def-cat1-10-contra-universal)の存在と一意性が成立する。
<!-- solution-end -->

### CAT1-10-A04 一元定値関手

- Level: A

共変 $K_1(X)=1$（射の作用は $1_1$）が $\varnothing$ により表現されることを示せ。また同じ値を持つ反変定値関手の表現対象を一つ挙げ、違いを説明せよ。

<!-- solution-start -->
**詳細解答**。任意の集合 $X$ に空写像 $e_X:\varnothing\to X$ がただ一つ存在するため、$\operatorname{Hom}(\varnothing,X)$ は一元集合であり $K_1(X)$ と全単射になる。$h:X\to Y$ に対して $h\circ e_X=e_Y$ だから自然性も成立する。反変の場合には $A=1$ を選ぶと、任意の $X$ から $1$ への写像がただ一つあり、$h:X\to Y$ による前合成は唯一の写像を唯一の写像へ送る。従って $\operatorname{Hom}(X,1)\cong K_1(X)$ が自然に成立する。前者は $\varnothing\to X$、後者は $X\to1$ の向きである。
<!-- solution-end -->

### CAT1-10-A05 二元定値関手の障害

- Level: A

$K_2$ を二元集合値の定値関手とする。共変・反変のいずれの意味でも $\mathbf{Set}$ 上で表現可能でないことを、空集合だけを使って示せ。

<!-- solution-start -->
**詳細解答**。共変に $A$ で表現できれば $\operatorname{Hom}(A,\varnothing)\cong2$ でなければならない。$A=\varnothing$ なら空写像が一つ、$A\ne\varnothing$ なら写像がないので、いずれも二元集合ではない。反変に $A$ で表現できれば $\operatorname{Hom}(\varnothing,A)\cong2$ のはずだが、空集合からは任意の $A$ へ唯一の空写像しかない。自然性を調べる前の、必要な成分の全単射の段階で失敗する。
<!-- solution-end -->

### CAT1-10-B01 二元からの射と順序対

- Level: B

$F(X)=X\times X$、$F(h)(x_0,x_1)=(h(x_0),h(x_1))$ と置く。$A=2$ と $u=(0,1)\in2\times2$ が共変普遍元になることを証明し、対応する自然同型を書け。

<!-- solution-start -->
**詳細解答**。任意の $X$ と $(x_0,x_1)\in X\times X$ を取り、$f:2\to X$ を $f(0)=x_0$、$f(1)=x_1$ と定める。この値の組で写像は一意に定まる。さらに

$$
F(f)(u)=F(f)(0,1)=(f(0),f(1))=(x_0,x_1).
$$

したがって[共変普遍元の条件](#def-cat1-10-cov-universal)を満たす。$X=\varnothing$ では両側とも空集合である。自然同型は $\theta_X(f)=(f(0),f(1))$。$h:X\to Y$ には

$$
F(h)(\theta_X(f))=(h(f(0)),h(f(1)))=\theta_Y(h\circ f),
$$

なので自然性も直接確認できる。
<!-- solution-end -->

### CAT1-10-B02 一つの元が自然同型を決める

- Level: B

共変 $F:\mathcal C\to\mathbf{Set}$ に対し自然変換 $\alpha:\operatorname{Hom}(A,-)\Rightarrow F$ があるとする（成分は全単射とは限らない）。$\alpha_X(f)=F(f)(\alpha_A(1_A))$ を導き、自然変換の二つの候補が $1_A$ で一致すれば全成分で一致することを示せ。

<!-- solution-start -->
**詳細解答**。[自然変換の定義](../CAT1-07/index.md#def-cat1-07-natural-transformation)を射 $f:A\to X$ へ適用すると、$\alpha_X\circ\operatorname{Hom}(A,f)=F(f)\circ\alpha_A$。この集合間写像の等式を $1_A\in\operatorname{Hom}(A,A)$ で評価する。$\operatorname{Hom}(A,f)(1_A)=f\circ1_A=f$ だから

$$
\alpha_X(f)=F(f)(\alpha_A(1_A)).
$$

二つの自然変換 $\alpha,\beta$ が $\alpha_A(1_A)=\beta_A(1_A)$ を満たせば、任意の $X,f$ について右辺が一致し $\alpha_X(f)=\beta_X(f)$。全単射性を仮定していないので、これは自然**変換**にも成立する。[共変判定定理](#thm-cat1-10-cov-criterion)を導く鍵の式である。
<!-- solution-end -->

### CAT1-10-B03 元の圏で始・終対象を確認する

- Level: B

共変恒等関手 $I$ の元の圏では $(1,*)$ が始対象であること、反変冪集合関手 $P$ の元の圏では $(2,\{1\})$ が終対象であることを、任意の対象への射または任意の対象からの射を明示して示せ。

<!-- solution-start -->
**詳細解答**。$\int I$ の任意の対象は $(X,x)$（$x\in X$）。その対象への $(1,*)$ からの射は写像 $f:1\to X$ で $I(f)(*)=x$ を満たすもの、すなわち $f(*)=x$ を満たす唯一の $f$ である。従って始対象。

$\int P$ の任意の対象は $(X,S)$（$S\subseteq X$）。そこから $(2,\{1\})$ への射は写像 $f:X\to2$ で $P(f)(\{1\})=S$、すなわち $f^{-1}(\{1\})=S$ を満たすもの。これは $f=\chi_S$ ただ一つだから終対象。[元の圏と普遍元の命題](#prop-cat1-10-elements-criterion)を、射の方向まで含めて直接確かめた。
<!-- solution-end -->

### CAT1-10-B04 別の普遍元は何を変えるか

- Level: B

反変冪集合関手 $P$ を $2$ で表すとき、$u=\{0\}\in P(2)$ も反変普遍元であることを示せ。$v=\{1\}$ として、$P(t)(v)=u$ を満たす唯一の同型 $t:2\to2$ を求めよ。

<!-- solution-start -->
**詳細解答**。任意の $T\subseteq X$ に対し $f_T:X\to2$ を $f_T(x)=0$ if $x\in T$、$f_T(x)=1$ if $x\notin T$ と定めると $f_T^{-1}(\{0\})=T$。逆像の等式は値を両側で強制するので $f_T$ は一意。よって $(2,u)$ は反変普遍元である。

$P(t)(v)=t^{-1}(\{1\})=\{0\}$ は $t(0)=1$, $t(1)=0$ と同値で、$t$ は二元集合の交換写像に限られる。$t\circ t=1_2$ なので同型である。[表現対象の一意性定理](#thm-cat1-10-uniqueness)と一致する。単なる $u,v$ の等号ではなく、普遍元を移す同型が必要である。
<!-- solution-end -->

### CAT1-10-C01 任意の有限冪を射で表す

- Level: C

非負整数 $n$ を固定し、$n=\{0,\ldots,n-1\}$（$0=\varnothing$）と置く。$F_n(X)$ を $n$ から $X$ への写像全体（$n$ 項の順序付き組）とし、$F_n(h)(f)=h\circ f$ とする。次を証明せよ。

1. $F_n$ が共変集合値関手で、$n$ によって表現される。
2. 普遍元を明示し、$n=0$ と $X=\varnothing$ を含めて存在・一意性を検証する。
3. $n\ne m$ なら $F_n$ と $F_m$ は自然同型ではない。

<!-- solution-start -->
**詳細解答**。$F_n(1_X)(f)=1_X\circ f=f$。$h:X\to Y$、$k:Y\to Z$ に対して

$$
F_n(k\circ h)(f)=(k\circ h)\circ f
=k\circ(h\circ f)=F_n(k)(F_n(h)(f)),
$$

ゆえに共変関手である。$u=1_n\in F_n(n)=\operatorname{Hom}(n,n)$ を取る。任意の $f\in F_n(X)$ に対して $F_n(f)(u)=f\circ1_n=f$ なので $f:n\to X$ 自身が存在する。別の $g$ が $g\circ1_n=f$ を満たすなら $g=f$。したがって $(n,1_n)$ は共変普遍元で、自然同型は各集合で恒等対応 $\operatorname{Hom}(n,X)=F_n(X)$ となる。

$n=0$ なら $n=\varnothing$ から任意の $X$ への写像は唯一の空写像で、$F_0(X)$ は一元集合。$X=\varnothing$ かつ $n>0$ なら双方の集合は空で、全単射は空集合間のもの。$n=X=0$ なら空写像は $1_0$ でもある。

最後に異なる非負整数 $n,m$ に対して $F_n\cong F_m$ と仮定する。前半で得た自然同型を合成すると

$$
\operatorname{Hom}(n,-)\cong F_n\cong F_m
\cong\operatorname{Hom}(m,-)
$$

となり、$F_m$ は $n$ と $m$ の双方で表現できる。それぞれの自然同型から得られる普遍元に[一意性定理](#thm-cat1-10-uniqueness)を適用すると、集合の圏で $n\cong m$ となる。

[集合の同型は全単射](../CAT1-03/index.md#def-cat1-03-isomorphism)なので、二つの有限集合の元の個数は等しくなる。これは $n\ne m$ に矛盾する。
<!-- solution-end -->

### CAT1-10-C02 有限非空部分集合は表現できるか

- Level: C

$N(X)$ を集合 $X$ の**有限かつ非空**な部分集合全体とし、写像 $h:X\to Y$ には直接像 $S\mapsto h(S)$ を対応させる。$N$ が共変集合値関手であることを検証したうえで、$\mathbf{Set}$ 上で表現可能か判定せよ。空集合と二元集合での値を使い、表現対象が有限・無限の両場合を調べよ。

<!-- solution-start -->
**詳細解答**。$S$ が有限・非空なら $h(S)$ も有限・非空であるから $N(h)$ は well-defined。恒等写像では $1_X(S)=S$、合成では $(k\circ h)(S)=k(h(S))$ だから共変関手の二公理が成立する。

仮に $N\cong\operatorname{Hom}(A,-)$ とする。$N(\varnothing)=\varnothing$ である。$A=\varnothing$ なら $\operatorname{Hom}(A,\varnothing)$ は空写像一つを持って矛盾するので、$A\ne\varnothing$ が必要である。

$2=\{0,1\}$ とすると

$$
N(2)=\{\{0\},\{1\},\{0,1\}\}
$$

で三元集合である。一方、$\operatorname{Hom}(A,2)$ は、$A$ の各元で $0$ または $1$ を選ぶ写像全体である。

$A$ が有限で、その元の個数が $k\ge1$ なら、写像の個数は $2^k$。非負整数の冪 $2^k$ が $3$ に等しくなることはない。

$A$ が無限なら、各 $a\in A$ に対して一元集合 $\{a\}$ の特性関数を考える。これらは相異なる写像なので

$$
A\longrightarrow\operatorname{Hom}(A,2),
\qquad a\longmapsto\chi_{\{a\}}
$$

は単射であり、右辺は無限集合である。どちらの場合も三元集合 $N(2)$ と全単射にならない。ゆえに $N$ は共変に表現可能でない。自然性より前に、必要な Hom 集合の個数が一致しないことが障害となる。
<!-- solution-end -->

## 8. 何が次へつながるか

共変では $A\to X$、反変では $X\to A$ を普遍元から作る。どちらも「ある集合の各元を、固定対象に関する射として自然に解釈できる」という構造であり、表現対象は同型を除いて一意である。

次講 CAT1-11「Yoneda の補題」では、ここで $\operatorname{Hom}(A,-)$ から表現可能性を判定した計算を、**任意の集合値関手への自然変換全体**へ拡張する。今回の $\theta_X(f)=F(f)(\theta_A(1_A))$ という一行が、その入口となる。
