# GPDE7：Lax--Milgram — coercivity を「逆作用素」に変える

<!-- definition-example-audit: strict -->

GPDE6 では Poisson の零 Dirichlet 問題を

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

という変分方程式へ移し、対称な Poisson form に対しては energy の直接法で解を構成しました。

しかし、大学院 PDE では毎回 minimizing sequence を作り直したいわけではありません。

さらに後続の GPDE8 では、双線形形式が一般に対称とは限りません。

そこで本章では、GPDE6 で導入した

- [bounded bilinear form](../GPDE6/index.md#def-gpde6-bounded-bilinear)
- [coercive bilinear form](../GPDE6/index.md#def-gpde6-coercive)

だけを抽出し、

$$
\boxed{
\text{bounded}
+
\text{coercive}
\Longrightarrow
\text{存在・一意性・安定性}
}
$$

を一つの定理として証明します。

それが **Lax--Milgram 定理**です。

本章の核心は「定理名を覚える」ことではありません。

証明を

~~~text
a(u,v)
  ↓ Riesz representation
<Au,v>
  ↓ coercivity
||Au|| >= alpha ||u||
  ↓
injective + closed range
  ↓
(Ran A)^perp = {0}
  ↓
dense range
  ↓
closed + dense = all of V
  ↓
A is bijective
~~~

という作用素論の一本の鎖として再構成できることが目標です。

この証明では、どの仮定がどこで働くかも明確です。

- boundedness：$A$ を有界作用素として作る。
- coercivity：$A$ を下から評価する。
- Hilbert 構造：Riesz 表現と直交補空間を使う。
- 完備性：range が閉であることを示す。
- 対称性：**使わない**。

最後の点が GPDE6 の energy minimization との重要な違いです。

---

## 1. 有限次元では何をしていたのか

まず $\mathbb R^n$ で

$$
Bx=f
$$

を考えます。

$B$ が対称正定値なら、ある $\alpha>0$ が存在して

$$
x^{\mathsf T}Bx
\ge
\alpha\|x\|_2^2
$$

です。

この評価は

$$
Bx=0
\Longrightarrow
x^{\mathsf T}Bx=0
\Longrightarrow
x=0
$$

を与えるので $B$ は単射です。

有限次元では

$$
\text{単射}
\Longrightarrow
\text{全射}
$$

なので、すぐに逆行列が存在します。

ところが無限次元では、この最後の矢印をそのまま使えません。

単射な有界線形作用素でも全射でないことがあります。

したがって Lax--Milgram の証明では

$$
\boxed{
\text{単射}
\to
\text{range が閉}
\to
\text{range が稠密}
\to
\text{全射}
}
$$

と段階を分けて確認します。

この「有限次元なら rank-nullity で一瞬だった部分」が、本章の核心です。

---

## 2. Lax--Milgram の主張

<a id="thm-gpde7-lax-milgram"></a>

<!-- formal-statement-start -->
> **定理（Lax--Milgram）**  
> $V$ を実 Hilbert 空間とする。
>
> $a:V\times V\to\mathbb R$ を双線形形式とし、ある $M,\alpha>0$ が存在して任意の $u,v\in V$ に対し

$$
|a(u,v)|
\le
M\|u\|_V\|v\|_V
$$

> および

$$
a(v,v)
\ge
\alpha\|v\|_V^2
$$

> が成り立つとする。
>
> このとき任意の $F\in V^*$ に対し、一意な $u\in V$ が存在して

$$
\boxed{
a(u,v)=F(v)
\qquad
(\forall v\in V)
}
$$

> を満たす。
>
> さらに解は

$$
\boxed{
\|u\|_V
\le
\frac1\alpha
\|F\|_{V^*}
}
$$

> を満たす。
<!-- formal-statement-end -->

定理の形だけ見ると、GPDE6 の Poisson 問題とほとんど同じです。

違いは

$$
a(u,v)
$$

が内積そのものとは限らないことです。

さらに

$$
a(u,v)=a(v,u)
$$

という対称性も仮定していません。

### 最小例：$\mathbb R$ では一次方程式

$V=\mathbb R$、

$$
a(u,v)=cuv,
\qquad
c>0,
$$

$$
F(v)=bv
$$

とします。

このとき

$$
|a(u,v)|
=
c|u||v|,
$$

$$
a(v,v)
=
cv^2
$$

なので

$$
M=\alpha=c
$$

と取れます。

変分方程式は

$$
cuv=bv
\qquad
(\forall v\in\mathbb R)
$$

です。

$v=1$ とすれば

$$
u=\frac bc.
$$

安定性評価も

$$
|u|
=
\frac{|b|}{c}
=
\frac1\alpha\|F\|
$$

となり、この場合は等号です。

Lax--Milgram は、この「係数 $c$ が 0 から離れているから割れる」という構造を Hilbert 空間へ持ち上げた定理だと読めます。

---

## 3. 第1段階：双線形形式を作用素に変える

Lax--Milgram の証明を始めるには

$$
a(u,v)
$$

という二変数の対象を、一変数の作用素へ変換する必要があります。

ここで [Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)を使います。

<a id="prop-gpde7-riesz-operator"></a>

<!-- formal-statement-start -->
> **命題（双線形形式の Riesz 作用素表示）**  
> $V$ を実 Hilbert 空間とし、$a:V\times V\to\mathbb R$ がある $M>0$ に対して

$$
|a(u,v)|
\le
M\|u\|_V\|v\|_V
$$

> を任意の $u,v\in V$ で満たすとする。
>
> このとき一意な有界線形作用素

$$
A:V\to V
$$

> が存在して

$$
\boxed{
a(u,v)
=
\langle Au,v\rangle_V
}
$$

> が任意の $u,v\in V$ で成り立つ。
>
> さらに

$$
\boxed{
\|Au\|_V
\le
M\|u\|_V
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ を固定すると

$$
v\mapsto a(u,v)
$$

は $v$ の連続線形汎関数です。

したがって Riesz 表現定理で、それを一つのベクトル $Au$ として表せます。

注意すべき点は三つです。

1. $Au$ が各 $u$ に対して存在すること。
2. この対応 $u\mapsto Au$ が線形であること。
3. $A$ が有界であること。

2 と 3 を確認して初めて、本当に「有界線形作用素を作った」と言えます。

<!-- proof-start -->
### 証明

任意の $u\in V$ を固定し

$$
\ell_u(v)
:=
a(u,v)
$$

と置きます。

$a$ は第2変数について線形なので、$\ell_u$ は線形汎関数です。

また boundedness から

$$
|\ell_u(v)|
=
|a(u,v)|
\le
M\|u\|_V\|v\|_V.
$$

したがって

$$
\ell_u\in V^*.
$$

[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、一意な $Au\in V$ が存在して

$$
\ell_u(v)
=
\langle Au,v\rangle_V
\qquad
(\forall v\in V)
$$

と書けます。

従って

$$
a(u,v)
=
\langle Au,v\rangle_V.
$$

これで各 $u$ に対して $Au$ が定まりました。

次に線形性を示します。

$u_1,u_2\in V$、$c_1,c_2\in\mathbb R$ とします。

双線形性から任意の $v\in V$ に対して

$$
\begin{aligned}
\langle A(c_1u_1+c_2u_2),v\rangle_V
&=
a(c_1u_1+c_2u_2,v)
\\
&=
c_1a(u_1,v)+c_2a(u_2,v)
\\
&=
\langle c_1Au_1+c_2Au_2,v\rangle_V.
\end{aligned}
$$

従って

$$
\left\langle
A(c_1u_1+c_2u_2)
-
c_1Au_1-c_2Au_2,
v
\right\rangle_V
=
0
$$

が全ての $v\in V$ で成り立ちます。

特に

$$
v=
A(c_1u_1+c_2u_2)
-
c_1Au_1-c_2Au_2
$$

と置けば、そのベクトルと自身との内積が 0 です。内積の正定値性から、そのベクトルは 0 です。

よって

$$
A(c_1u_1+c_2u_2)
=
c_1Au_1+c_2Au_2.
$$

従って $A$ は線形です。

最後に、作用素表示へ $v=Au$ を代入すると

$
\|Au\|_V^2
=
\langle Au,Au\rangle_V
=
a(u,Au).
$

boundedness から

$
\|Au\|_V^2
\le
|a(u,Au)|
\le
M\|u\|_V\|Au\|_V.
$

$Au=0$ のときは求める評価が成立します。

$Au\ne0$ のときは $\|Au\|_V$ で割って

$
\boxed{
\|Au\|_V
\le
M\|u\|_V
}.
$

従って $A$ は有界線形作用素です。
<!-- proof-end -->

この命題で

$$
a(u,v)=F(v)
$$

という変分方程式は、作用素方程式へ変わる準備ができました。

---

## 4. 右辺も Riesz 表現する

$F\in V^*$ を取ります。

再び [Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)から、一意な $f\in V$ が存在して

$$
F(v)
=
\langle f,v\rangle_V
$$

と書けます。

従って

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

は

$$
\langle Au,v\rangle_V
=
\langle f,v\rangle_V
\qquad
(\forall v\in V)
$$

と同値です。

すなわち

$$
\langle Au-f,v\rangle_V
=
0
\qquad
(\forall v\in V).
$$

ここで

$$
v=Au-f
$$

と置けば

$$
\|Au-f\|_V^2=0.
$$

従って

$$
\boxed{
Au=f
}
$$

です。

つまり Lax--Milgram の存在一意性は

$$
\boxed{
A:V\to V
\text{ が全単射である}
}
$$

ことを証明する問題へ変わりました。

---

## 5. 第2段階：coercivity から作用素を下から評価する

<a id="lem-gpde7-lower-bound"></a>

<!-- formal-statement-start -->
> **補題（coercivity から作用素を下から評価する）**  
> $V$ を実 Hilbert 空間とし、$a$ を bounded bilinear form とする。
>
> [双線形形式の Riesz 作用素表示](#prop-gpde7-riesz-operator)で得た $A:V\to V$ に対し、さらにある $\alpha>0$ が存在して

$$
a(v,v)
\ge
\alpha\|v\|_V^2
$$

> が任意の $v\in V$ で成り立つとする。
>
> このとき任意の $u\in V$ に対して

$$
\boxed{
\|Au\|_V
\ge
\alpha\|u\|_V
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の核心

coercivity は

$$
a(u,u)
$$

を下から押さえます。

一方

$$
a(u,u)
=
\langle Au,u\rangle
$$

なので、Cauchy--Schwarz で上から

$$
\|Au\|\|u\|
$$

と押さえられます。

上下から挟むだけです。

<!-- proof-start -->
### 証明

coercivity から

$$
\alpha\|u\|_V^2
\le
a(u,u).
$$

Riesz 作用素表示により

$$
a(u,u)
=
\langle Au,u\rangle_V.
$$

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\langle Au,u\rangle_V
\le
|\langle Au,u\rangle_V|
\le
\|Au\|_V\|u\|_V.
$$

従って

$$
\alpha\|u\|_V^2
\le
\|Au\|_V\|u\|_V.
$$

$u=0$ のときは $\|Au\|_V\ge0=\alpha\|u\|_V$ なので、この評価はそのまま成立します。

$u\ne0$ なら $\|u\|_V>0$ で割って

$$
\boxed{
\|Au\|_V
\ge
\alpha\|u\|_V
}.
$$
<!-- proof-end -->

この一本の評価から、すでに二つの重要な結果が出ます。

第一に $Au=0$ なら

$$
0
=
\|Au\|_V
\ge
\alpha\|u\|_V
$$

なので $u=0$ です。

従って $A$ は単射です。

第二に

$$
\|u\|_V
\le
\frac1\alpha\|Au\|_V
$$

なので、もし $A^{-1}$ が range 上で定義されれば

$$
\|A^{-1}y\|_V
\le
\frac1\alpha\|y\|_V
$$

という安定性が既に見えています。

---

## 6. 第3段階：下からの評価から range が閉じる

無限次元では、単射だけでは全射になりません。

次に

$$
\operatorname{Ran}A
=
\{Au:u\in V\}
$$

が閉集合であることを示します。

<a id="lem-gpde7-closed-range"></a>

<!-- formal-statement-start -->
> **補題（下から有界なら range は閉）**  
> $V$ を Hilbert 空間とし、$A:V\to V$ を有界線形作用素とする。
>
> ある $\alpha>0$ が存在して

$$
\|Au\|_V
\ge
\alpha\|u\|_V
\qquad
(\forall u\in V)
$$

> が成り立つなら

$$
\boxed{
\operatorname{Ran}A
\text{ は }V\text{ の閉部分空間}
}
$$

> である。
<!-- formal-statement-end -->

### どこで完備性を使うのか

range の点列

$$
Au_n
$$

が $y$ へ収束したとします。

欲しいのは

$$
y=Au
$$

となる $u\in V$ です。

そのためには $u_n$ 自身を収束させたい。

下からの評価を差に適用すると

$$
\|u_n-u_m\|_V
\le
\frac1\alpha
\|Au_n-Au_m\|_V.
$$

右辺が 0 へ行くので $(u_n)$ は Cauchy です。

ここで初めて

$$
V\text{ は完備}
$$

という Hilbert 空間の仮定を使います。

<!-- proof-start -->
### 証明

$y\in V$ が $\operatorname{Ran}A$ の閉包に属するとします。

するとある列 $(u_n)\subset V$ が存在して

$$
Au_n\to y
\quad\text{in }V.
$$

収束列は Cauchy なので

$$
\|Au_n-Au_m\|_V
\to0
\qquad
(n,m\to\infty).
$$

$A$ の線形性から

$$
Au_n-Au_m
=
A(u_n-u_m).
$$

下からの評価より

$$
\alpha\|u_n-u_m\|_V
\le
\|A(u_n-u_m)\|_V
=
\|Au_n-Au_m\|_V.
$$

従って

$$
\|u_n-u_m\|_V
\le
\frac1\alpha
\|Au_n-Au_m\|_V
\to0.
$$

よって $(u_n)$ は $V$ の Cauchy 列です。

$V$ は Hilbert 空間なので完備です。

したがってある $u\in V$ が存在して

$$
u_n\to u
\quad\text{in }V.
$$

$A$ は有界線形作用素なので連続です。

従って

$$
Au_n\to Au.
$$

一方、仮定から

$$
Au_n\to y.
$$

[極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)により

$$
y=Au.
$$

従って

$$
y\in\operatorname{Ran}A.
$$

よって

$$
\boxed{
\operatorname{Ran}A
\text{ は閉}
}.
$$
<!-- proof-end -->

この証明では coercivity 自体を直接使っていません。

使っているのは、coercivity から既に導いた

$$
\|Au\|\ge\alpha\|u\|
$$

です。

この分離をしておくと、後の作用素論でも同じ closed range 論法を再利用できます。

---

## 7. 第4段階：range が稠密であることを示す

range が閉じているだけでは

$$
\operatorname{Ran}A
=
V
$$

とは限りません。

そこで次に稠密性を示します。

Hilbert 空間では部分空間 $M$ に対し

$$
\overline M=V
$$

であることは

$$
M^\perp=\{0\}
$$

と同値です。

Lax--Milgram では

$$
M=\operatorname{Ran}A
$$

に対して直交補空間が 0 であることを coercivity から示せます。

<a id="lem-gpde7-dense-range"></a>

<!-- formal-statement-start -->
> **補題（Lax--Milgram 作用素の range は稠密）**  
> $V$ を実 Hilbert 空間、$a:V\times V\to\mathbb R$ を bounded かつ coercive な双線形形式とする。
>
> [双線形形式の Riesz 作用素表示](#prop-gpde7-riesz-operator)で定まる $A:V\to V$ に対し

$$
\boxed{
\overline{\operatorname{Ran}A}
=
V
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の核心

$y$ が range の全てに直交すると仮定します。

すると全ての $u\in V$ に対して

$$
0
=
\langle Au,y\rangle
=
a(u,y).
$$

ここで重要なのは

$$
a(u,y)=0
\qquad
(\forall u)
$$

まで得ていることです。

そこで

$$
u=y
$$

と選べば

$$
a(y,y)=0.
$$

coercivity が

$$
\alpha\|y\|^2\le0
$$

を与えるため $y=0$ です。

**対称性は一度も使っていません。**

<!-- proof-start -->
### 証明

$$
y\in(\operatorname{Ran}A)^\perp
$$

とします。

直交補空間の定義から、任意の $u\in V$ に対して

$$
\langle Au,y\rangle_V
=
0.
$$

Riesz 作用素表示から

$$
\langle Au,y\rangle_V
=
a(u,y).
$$

従って

$$
a(u,y)=0
\qquad
(\forall u\in V).
$$

特に $u=y$ と置くと

$$
a(y,y)=0.
$$

coercivity から

$$
\alpha\|y\|_V^2
\le
a(y,y)
=
0.
$$

$\alpha>0$ なので

$$
\|y\|_V=0.
$$

従って

$$
y=0.
$$

よって

$$
(\operatorname{Ran}A)^\perp
=
\{0\}.
$$

[Hilbert 空間の直交分解](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-f0-02c1a-orthogonal-decomposition)から

$$
\overline{\operatorname{Ran}A}
=
V.
$$
<!-- proof-end -->

この補題は Lax--Milgram の証明の中で最も「無限次元らしい」部分です。

有限次元なら単射性だけで終わったところを、

$$
\text{直交補空間が 0}
$$

という幾何学的条件で range の不足を排除しています。

---

## 8. 第5段階：閉かつ稠密なら全射

ここまでで

$$
\operatorname{Ran}A
$$

は

- 閉
- 稠密

の両方を満たしました。

閉であるから

$$
\overline{\operatorname{Ran}A}
=
\operatorname{Ran}A.
$$

稠密であるから

$$
\overline{\operatorname{Ran}A}
=
V.
$$

従って

$$
\boxed{
\operatorname{Ran}A
=
V
}.
$$

つまり $A$ は全射です。

一方、coercivity から既に $A$ は単射でした。

したがって

$$
\boxed{
A:V\to V
\text{ は全単射}
}
$$

です。

これで Lax--Milgram の証明に必要な作用素論がすべて揃いました。

---

## 9. Lax--Milgram 定理を一本につなぐ

### 証明の見取り図

証明全体を一度つなぎ直します。

~~~text
1. fixed u:
   v -> a(u,v) belongs to V*
2. Riesz:
   a(u,v)=<Au,v>
3. boundedness:
   A is bounded
4. coercivity:
   ||Au|| >= alpha ||u||
5. therefore:
   A is injective
6. lower bound + completeness:
   Ran A is closed
7. y perpendicular to Ran A:
   a(u,y)=0 for all u
   choose u=y
   coercivity gives y=0
8. therefore:
   Ran A is dense
9. closed + dense:
   Ran A=V
10. Riesz on F:
   F(v)=<f,v>
11. solve:
   Au=f
12. coercivity:
   ||u|| <= alpha^{-1}||F||
~~~

<!-- proof-start -->
### 証明

$a$ の boundedness と [双線形形式の Riesz 作用素表示](#prop-gpde7-riesz-operator)から、一意な有界線形作用素

$$
A:V\to V
$$

が存在して

$$
a(u,v)
=
\langle Au,v\rangle_V
$$

が成り立ちます。

[coercivity から作用素を下から評価する補題](#lem-gpde7-lower-bound)により

$$
\|Au\|_V
\ge
\alpha\|u\|_V.
$$

従って $Au=0$ なら $u=0$ なので $A$ は単射です。

また [下から有界なら range は閉](#lem-gpde7-closed-range)より

$$
\operatorname{Ran}A
$$

は閉です。

さらに [Lax--Milgram 作用素の range は稠密](#lem-gpde7-dense-range)より

$$
\overline{\operatorname{Ran}A}
=
V.
$$

range は閉なので

$$
\operatorname{Ran}A
=
\overline{\operatorname{Ran}A}
=
V.
$$

従って $A$ は全射です。

以上から $A$ は全単射です。

次に $F\in V^*$ を任意に取ります。

[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、一意な $f\in V$ が存在して

$$
F(v)
=
\langle f,v\rangle_V
$$

が任意の $v\in V$ で成り立ちます。

$A$ は全射なので、ある $u\in V$ が存在して

$$
Au=f.
$$

すると任意の $v\in V$ に対して

$$
a(u,v)
=
\langle Au,v\rangle_V
=
\langle f,v\rangle_V
=
F(v).
$$

従って解は存在します。

一意性は $A$ の単射性から従います。

最後に解 $u$ に対して coercivity と [既習の双対評価](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#prop-f0-02c2-dual-norm-basic-estimate)を用いると

$$
\alpha\|u\|_V^2
\le
a(u,u)
=
F(u)
\le
|F(u)|
\le
\|F\|_{V^*}\|u\|_V.
$$

$u=0$ のときは左辺が 0 なので、求める安定性評価はそのまま成立します。

$u\ne0$ なら $\|u\|_V$ で割って

$$
\boxed{
\|u\|_V
\le
\frac1\alpha
\|F\|_{V^*}
}.
$$

これで存在・一意性・安定性がすべて示されました。
<!-- proof-end -->

---

## 10. 安定性は「解が暴れない」という意味である

Lax--Milgram の最後の評価

$$
\|u\|_V
\le
\frac1\alpha
\|F\|_{V^*}
$$

は付録ではありません。

PDE では existence と同じくらい重要です。

外力を少し変えたとき、解も少ししか変わらないことを保証するからです。

<a id="cor-gpde7-stability"></a>

<!-- formal-statement-start -->
> **系（Lax--Milgram 解の安定性）**  
> [Lax--Milgram 定理](#thm-gpde7-lax-milgram)の仮定の下で、$F_1,F_2\in V^*$ に対応する解を $u_1,u_2\in V$ とする。
>
> このとき

$$
\boxed{
\|u_1-u_2\|_V
\le
\frac1\alpha
\|F_1-F_2\|_{V^*}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの変分方程式は

$$
a(u_1,v)
=
F_1(v),
$$

$$
a(u_2,v)
=
F_2(v)
$$

です。

差を取ると

$$
a(u_1-u_2,v)
=
(F_1-F_2)(v).
$$

従って $w=u_1-u_2$ は、右辺 $F_1-F_2$ に対する Lax--Milgram 解です。

定理の安定性評価を適用して

$$
\|w\|_V
\le
\frac1\alpha
\|F_1-F_2\|_{V^*}.
$$

すなわち

$$
\boxed{
\|u_1-u_2\|_V
\le
\frac1\alpha
\|F_1-F_2\|_{V^*}
}.
$$
<!-- proof-end -->

したがって解作用素

$$
S:V^*\to V,
\qquad
S(F)=u
$$

は線形かつ

$$
\|S(F)\|_V
\le
\frac1\alpha\|F\|_{V^*}
$$

を満たす有界線形作用素です。

$$
\boxed{
\|S\|
\le
\frac1\alpha
}
$$

と読めます。

---

## 11. 対称性は必要ない

GPDE6 の energy minimization では

$$
a(u,v)=a(v,u)
$$

という対称性が重要でした。

しかし Lax--Milgram の証明を振り返ると、使ったのは

- boundedness
- coercivity
- Hilbert 構造

だけです。

対称性は使っていません。

### 具体例：非対称だが coercive

$V=\mathbb R^2$ に Euclid 内積を入れ

$$
B
=
\begin{pmatrix}
1&1\\
-1&1
\end{pmatrix}
$$

とします。

$$
a(u,v)
=
u^{\mathsf T}Bv
$$

と置きます。

$B$ は対称ではありません。

実際

$$
B^{\mathsf T}
=
\begin{pmatrix}
1&-1\\
1&1
\end{pmatrix}
\ne
B.
$$

ところが $v=(x,y)^{\mathsf T}$ に対して

$$
Bv
=
\begin{pmatrix}
x+y\\
-x+y
\end{pmatrix}
$$

なので

$$
\begin{aligned}
a(v,v)
&=
v^{\mathsf T}Bv
\\
&=
x(x+y)+y(-x+y)
\\
&=
x^2+y^2
\\
&=
\|v\|_2^2.
\end{aligned}
$$

従って

$$
\alpha=1
$$

で coercive です。

また

$$
\|Bv\|_2^2
=
(x+y)^2+(-x+y)^2
=
2(x^2+y^2)
$$

なので

$$
\|Bv\|_2
=
\sqrt2\|v\|_2.
$$

従って

$$
|a(u,v)|
=
|u^{\mathsf T}Bv|
\le
\|u\|_2\|Bv\|_2
=
\sqrt2\|u\|_2\|v\|_2.
$$

つまり $M=\sqrt2$ で bounded です。

したがって Lax--Milgram が適用できます。

この例で skew-symmetric part

$$
\frac{B-B^{\mathsf T}}2
$$

は $a(v,v)$ に寄与しません。

coercivity は「対角方向 $a(v,v)$」の正の部分で決まり、非対称成分が存在してもよいことが分かります。

---

## 12. 反例：coercivity を失うと何が壊れるか

boundedness だけでは存在一意性は出ません。

$V=\mathbb R^2$ とし

$$
a(u,v)
=
u_1v_1
$$

とします。

Cauchy--Schwarz から

$$
|a(u,v)|
=
|u_1v_1|
\le
\|u\|_2\|v\|_2
$$

なので bounded です。

しかし

$$
w=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$

に対して

$$
a(w,w)=0
$$

なのに

$$
\|w\|_2=1.
$$

従って coercive ではありません。

対応する作用素は

$$
A
\begin{pmatrix}
u_1\\
u_2
\end{pmatrix}
=
\begin{pmatrix}
u_1\\
0
\end{pmatrix}
$$

です。

ここで壊れているものを順に見ると、

$$
Aw=0
$$

なのに $w\ne0$ なので単射ではありません。

さらに

$$
\operatorname{Ran}A
=
\left\{
\begin{pmatrix}
x\\
0
\end{pmatrix}
:
x\in\mathbb R
\right\}
$$

なので全射でもありません。

例えば

$$
F(v)=v_2
$$

を Riesz 表現するベクトルは $(0,1)^{\mathsf T}$ ですが、これは $\operatorname{Ran}A$ に入りません。

従って

$$
a(u,v)=F(v)
$$

を満たす $u$ は存在しません。

一方 $F(v)=v_1$ なら

$$
u_1=1
$$

だけ決まり、$u_2$ は任意なので一意性が壊れます。

つまり coercivity を失うと

$$
\boxed{
\text{下からの評価}
\to
\text{単射}
\to
\text{closed range / full range}
}
$$

という証明機構全体が崩れます。

---

## 13. 具体例：Poisson 問題へ適用する

GPDE6 で Poisson form の boundedness と coercivity は既に証明しました。

ここでは Lax--Milgram の仮定へ一つずつ差し込みます。

$\Omega\subset\mathbb R^d$ を有界開集合とし

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V
=
\|\nabla v\|_{L^2(\Omega)}
$$

とします。

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
$$

と置きます。

[Poisson form の boundedness と coercivity](../GPDE6/index.md#prop-gpde6-poisson-form)から

$$
|a(u,v)|
\le
\|u\|_V\|v\|_V
$$

なので

$$
M=1,
$$

さらに

$$
a(v,v)
=
\|v\|_V^2
$$

なので

$$
\alpha=1
$$

です。

$F\in H^{-1}(\Omega)=V^*$ を任意に取れば、Lax--Milgram の全仮定が揃います。

<a id="cor-gpde7-poisson"></a>

<!-- formal-statement-start -->
> **系（Poisson 零 Dirichlet 問題への適用）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とし

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_2
$$

> とする。
>
> 任意の $F\in H^{-1}(\Omega)$ に対して一意な $u\in H_0^1(\Omega)$ が存在し

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
F(v)
\qquad
(\forall v\in H_0^1(\Omega))
}
$$

> を満たす。
>
> さらに

$$
\boxed{
\|u\|_V
\le
\|F\|_{H^{-1}(\Omega)}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

これは GPDE6 で直接法から得た Poisson 弱解の存在一意性を、より一般的な抽象定理から再取得したものです。

二つの証明は競合しません。

- GPDE6 の直接法：energy minimization と weak compactness の使い方を学ぶ。
- GPDE7 の Lax--Milgram：一般の bounded coercive bilinear form を一気に解く。

という役割分担です。

---

## 14. 具体例：reaction--diffusion へ一歩広げる

Poisson form に 0 次項を加えます。

$\Omega\subset\mathbb R^d$ を有界開集合、

$$
c\in L^\infty(\Omega),
\qquad
c(x)\ge0
\quad\text{a.e.}
$$

とします。

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_2
$$

上で

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
+
\int_\Omega
cuv\,dx
$$

を考えます。

### boundedness の確認

第一項は

$$
\left|
\int_\Omega
\nabla u\cdot\nabla v\,dx
\right|
\le
\|u\|_V\|v\|_V.
$$

第二項は

$$
\left|
\int_\Omega
cuv\,dx
\right|
\le
\|c\|_\infty
\|u\|_2
\|v\|_2.
$$

[Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|u\|_2
\le
C_P\|u\|_V,
\qquad
\|v\|_2
\le
C_P\|v\|_V.
$$

従って

$$
\left|
\int_\Omega
cuv\,dx
\right|
\le
C_P^2\|c\|_\infty
\|u\|_V\|v\|_V.
$$

よって

$$
\boxed{
|a(u,v)|
\le
\left(
1+C_P^2\|c\|_\infty
\right)
\|u\|_V\|v\|_V
}.
$$

### coercivity の確認

$c\ge0$ がほとんど至る所（almost everywhere; a.e.）で成り立つので

$$
\int_\Omega
cv^2\,dx
\ge0.
$$

従って

$$
a(v,v)
=
\|\nabla v\|_2^2
+
\int_\Omega
cv^2\,dx
\ge
\|\nabla v\|_2^2
=
\|v\|_V^2.
$$

従って

$$
\boxed{
\alpha=1
}
$$

と取れます。

<a id="cor-gpde7-reaction-diffusion"></a>

<!-- formal-statement-start -->
> **系（reaction--diffusion 問題への適用）**  
> $\Omega\subset\mathbb R^d$ を有界開集合、
>
> $c\in L^\infty(\Omega)$ が

$$
c(x)\ge0
\quad\text{a.e. in }\Omega
$$

> を満たすとする。
>
> $V=H_0^1(\Omega)$ に勾配 norm を入れ

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
+
\int_\Omega
cuv\,dx
$$

> とする。
>
> このとき任意の $F\in V^*$ に対して一意な $u\in V$ が存在し

$$
\boxed{
a(u,v)=F(v)
\qquad
(\forall v\in V)
}
$$

> を満たす。
>
> さらに

$$
\boxed{
\|u\|_V
\le
\|F\|_{V^*}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

この weak equation は形式的には

$$
-\Delta u+cu=f,
\qquad
u|_{\partial\Omega}=0
$$

に対応します。

GPDE8 ではここからさらに係数行列や一次項を入れ、

$$
-\operatorname{div}(A(x)\nabla u)
+
b(x)\cdot\nabla u
+
c(x)u
=
f
$$

へ進みます。

そのときも作業は同じです。

$$
\boxed{
\text{各項を評価}
\to
\text{boundedness}
\to
\text{coercivity}
\to
\text{Lax--Milgram}
}
$$

です。

---

## 15. 具体例：非対称 PDE の最小モデル

Lax--Milgram に対称性が不要であることを、関数空間でも確認します。

$V=H_0^1(0,1)$、

$$
\|v\|_V=\|v'\|_2
$$

とし、$\beta\in\mathbb R$ に対して

$$
a(u,v)
=
\int_0^1
u'v'\,dx
+
\beta
\int_0^1
u v'\,dx
$$

とします。

第二項があるので一般には

$$
a(u,v)\ne a(v,u).
$$

### boundedness

Cauchy--Schwarz と Poincaré から

$$
\left|
\beta
\int_0^1
u v'\,dx
\right|
\le
|\beta|
\|u\|_2
\|v'\|_2
\le
|\beta|C_P
\|u\|_V
\|v\|_V.
$$

従って

$$
|a(u,v)|
\le
(1+|\beta|C_P)
\|u\|_V\|v\|_V.
$$

### coercivity

$v\in H_0^1(0,1)$ に対して

$$
\int_0^1
v v'\,dx
=
\frac12
\left[
v(x)^2
\right]_{0}^{1}.
$$

GPDE4 の区間上の trace から $v(0)=v(1)=0$ なので

$$
\int_0^1
v v'\,dx
=
0.
$$

従って

$$
a(v,v)
=
\int_0^1
|v'|^2\,dx
=
\|v\|_V^2.
$$

つまり

$$
\alpha=1.
$$

非対称項は存在しますが、対角値 $a(v,v)$ では境界項として消えます。

これが「非対称でも coercive」という PDE 側の最小例です。

---

## 16. どの仮定がどこで必要だったか

Lax--Milgram を使うとき、仮定をセット暗記すると応用で迷います。

証明機構と対応させると整理できます。

| 仮定 | 使う場所 | 失うと何が壊れるか |
|---|---|---|
| $V$ が実 Hilbert 空間 | Riesz 表現、直交補空間、完備性 | $a(u,\cdot)$ を同じ空間のベクトル $Au$ に戻す証明が使えない |
| boundedness | $A$ の構成と連続性 | $v\mapsto a(u,v)$ が $V^*$ に入る保証がない |
| coercivity | $\|Au\|\ge\alpha\|u\|$、単射、dense range、安定性 | kernel や到達不能方向が残り得る |
| $\alpha>0$ | 下からの一様評価 | $\alpha=0$ では norm を制御できない |
| 対称性 | **不要** | Lax--Milgram 自体には影響しない |

GPDE6 の energy minimization では対称性が

$$
J(v)=\frac12a(v,v)-F(v)
$$

から変分方程式を回収するために必要でした。

Lax--Milgram はその制約を外しています。

---

## 17. 演習

### Level A

<a id="ex-gpde7-a01"></a>
#### GPDE7-A01 coercivity から下からの評価
- Level: A

$V$ を実 Hilbert 空間、$a$ を bounded bilinear form とし

$$
a(u,v)
=
\langle Au,v\rangle_V
$$

で $A:V\to V$ が定まっているとする。

$$
a(v,v)
\ge
\alpha\|v\|_V^2
\qquad
(\alpha>0)
$$

を仮定する。

1. $\|Au\|_V\ge\alpha\|u\|_V$ を示せ。
2. $A$ が単射であることを示せ。
3. $A^{-1}$ が $\operatorname{Ran}A$ 上で

$$
\|A^{-1}y\|_V
\le
\frac1\alpha\|y\|_V
$$

を満たすことを示せ。

<!-- solution-start -->
**詳細解答**

coercivity と Riesz 作用素表示から

$$
\alpha\|u\|_V^2
\le
a(u,u)
=
\langle Au,u\rangle_V.
$$

Cauchy--Schwarz より

$$
\langle Au,u\rangle_V
\le
|\langle Au,u\rangle_V|
\le
\|Au\|_V\|u\|_V.
$$

従って

$$
\alpha\|u\|_V^2
\le
\|Au\|_V\|u\|_V.
$$

$u=0$ のときは $\|Au\|_V\ge0=\alpha\|u\|_V$ なので、この評価はそのまま成立します。

$u\ne0$ なら $\|u\|_V$ で割って

$$
\boxed{
\|Au\|_V
\ge
\alpha\|u\|_V
}.
$$

次に $Au=0$ とします。

上の評価から

$$
0
=
\|Au\|_V
\ge
\alpha\|u\|_V.
$$

$\alpha>0$ なので

$$
\|u\|_V=0,
$$

従って $u=0$ です。

よって $A$ は単射です。

最後に $y\in\operatorname{Ran}A$ とします。

ある一意な $u\in V$ が存在して

$$
y=Au.
$$

従って

$$
A^{-1}y=u.
$$

下からの評価を用いると

$$
\alpha\|A^{-1}y\|_V
=
\alpha\|u\|_V
\le
\|Au\|_V
=
\|y\|_V.
$$

よって

$$
\boxed{
\|A^{-1}y\|_V
\le
\frac1\alpha\|y\|_V
}.
$$
<!-- solution-end -->

<a id="ex-gpde7-a02"></a>
#### GPDE7-A02 Riesz 作用素の線形性と有界性
- Level: A

$V$ を実 Hilbert 空間とし、双線形形式 $a$ が

$$
|a(u,v)|
\le
M\|u\|_V\|v\|_V
$$

を満たすとする。

各 $u$ に対し Riesz 表現で

$$
a(u,v)=\langle Au,v\rangle_V
$$

となる $Au$ を定める。

1. $A$ が線形であることを示せ。
2. $\|Au\|_V\le M\|u\|_V$ を示せ。

<!-- solution-start -->
**詳細解答**

$u_1,u_2\in V$ と $c_1,c_2\in\mathbb R$ を取ります。

任意の $v\in V$ に対し

$$
\begin{aligned}
\langle A(c_1u_1+c_2u_2),v\rangle
&=
a(c_1u_1+c_2u_2,v)
\\
&=
c_1a(u_1,v)+c_2a(u_2,v)
\\
&=
\langle c_1Au_1+c_2Au_2,v\rangle.
\end{aligned}
$$

従って

$$
\langle
A(c_1u_1+c_2u_2)
-
c_1Au_1-c_2Au_2,
v
\rangle
=
0
$$

が全ての $v$ で成り立ちます。

$v$ に差そのものを選べば、差ベクトルと自身との内積が 0 です。内積の正定値性から差ベクトルは 0 なので

$$
A(c_1u_1+c_2u_2)
=
c_1Au_1+c_2Au_2.
$$

よって $A$ は線形です。

次に作用素表示へ $v=Au$ を代入すると

$
\|Au\|_V^2
=
\langle Au,Au\rangle_V
=
a(u,Au).
$

boundedness から

$
\|Au\|_V^2
\le
|a(u,Au)|
\le
M\|u\|_V\|Au\|_V.
$

$Au=0$ なら求める評価は成立します。

$Au\ne0$ なら $\|Au\|_V$ で割って

$
\boxed{
\|Au\|_V
\le
M\|u\|_V
}.
$
<!-- solution-end -->

<a id="ex-gpde7-a03"></a>
#### GPDE7-A03 非対称 coercive 行列
- Level: A

$$
B=
\begin{pmatrix}
1&1\\
-1&1
\end{pmatrix}
$$

とし、$V=\mathbb R^2$ 上で

$$
a(u,v)=u^{\mathsf T}Bv
$$

と定める。

1. $a$ が対称でないことを示せ。
2. $a(v,v)=\|v\|_2^2$ を示せ。
3. $|a(u,v)|\le\sqrt2\|u\|_2\|v\|_2$ を示せ。
4. Lax--Milgram の $\alpha,M$ を一組与えよ。

<!-- solution-start -->
**詳細解答**

まず

$$
B^{\mathsf T}
=
\begin{pmatrix}
1&-1\\
1&1
\end{pmatrix}
\ne
B
$$

なので、この行列から作る双線形形式は対称ではありません。

具体的にも

$$
e_1=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
e_2=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$

とすると

$$
a(e_1,e_2)=1,
\qquad
a(e_2,e_1)=-1.
$$

次に $v=(x,y)^{\mathsf T}$ とすると

$$
Bv=
\begin{pmatrix}
x+y\\
-x+y
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
a(v,v)
&=
x(x+y)+y(-x+y)
\\
&=
x^2+y^2
\\
&=
\|v\|_2^2.
\end{aligned}
$$

よって coercivity 定数は

$$
\alpha=1
$$

と取れます。

また

$$
\|Bv\|_2^2
=
(x+y)^2+(-x+y)^2
=
2x^2+2y^2
=
2\|v\|_2^2.
$$

従って

$$
\|Bv\|_2
=
\sqrt2\|v\|_2.
$$

Cauchy--Schwarz から

$$
|a(u,v)|
=
|u^{\mathsf T}Bv|
\le
\|u\|_2\|Bv\|_2
=
\sqrt2\|u\|_2\|v\|_2.
$$

よって

$$
\boxed{
\alpha=1,
\qquad
M=\sqrt2
}
$$

と取れます。
<!-- solution-end -->

<a id="ex-gpde7-a04"></a>
#### GPDE7-A04 reaction--diffusion form の仮定確認
- Level: A

$\Omega\subset\mathbb R^d$ を有界開集合とし

$$
V=H_0^1(\Omega),
\qquad
\|v\|_V=\|\nabla v\|_2.
$$

$c\in L^\infty(\Omega)$ が

$$
c\ge0
\quad\text{a.e.}
$$

を満たすとする。

$$
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
+
\int_\Omega
cuv\,dx
$$

について

1. $a$ が bounded であることを示せ。
2. $\alpha=1$ で coercive であることを示せ。

<!-- solution-start -->
**詳細解答**

第一項は Cauchy--Schwarz から

$$
\left|
\int_\Omega
\nabla u\cdot\nabla v\,dx
\right|
\le
\|\nabla u\|_2
\|\nabla v\|_2
=
\|u\|_V\|v\|_V.
$$

第二項は

$$
\left|
\int_\Omega
cuv\,dx
\right|
\le
\|c\|_\infty
\|u\|_2
\|v\|_2.
$$

[Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)より

$$
\|u\|_2
\le
C_P\|u\|_V,
\qquad
\|v\|_2
\le
C_P\|v\|_V.
$$

従って

$$
\left|
\int_\Omega
cuv\,dx
\right|
\le
C_P^2\|c\|_\infty
\|u\|_V\|v\|_V.
$$

二つを合わせて

$$
|a(u,v)|
\le
\left(
1+C_P^2\|c\|_\infty
\right)
\|u\|_V\|v\|_V.
$$

よって bounded です。

次に

$$
a(v,v)
=
\|\nabla v\|_2^2
+
\int_\Omega
cv^2\,dx.
$$

$c\ge0$ a.e. なので第二項は非負です。

従って

$$
a(v,v)
\ge
\|\nabla v\|_2^2
=
\|v\|_V^2.
$$

よって

$$
\boxed{
\alpha=1
}
$$

で coercive です。
<!-- solution-end -->

### Level B

<a id="ex-gpde7-b01"></a>
#### GPDE7-B01 下からの評価から closed range を証明する
- Level: B

$V$ を Hilbert 空間、$A:V\to V$ を有界線形作用素とし

$$
\|Au\|_V
\ge
\alpha\|u\|_V
\qquad
(\forall u\in V)
$$

とする。

$\operatorname{Ran}A$ が閉であることを証明せよ。

また、証明のどこで $V$ の完備性を使うか明示せよ。

<!-- solution-start -->
**詳細解答**

$\operatorname{Ran}A$ 内の列 $(Au_n)$ が $y\in V$ へ収束するとします。

$$
Au_n\to y.
$$

収束列は Cauchy なので

$$
\|Au_n-Au_m\|_V
\to0.
$$

線形性から

$$
Au_n-Au_m
=
A(u_n-u_m).
$$

下からの評価より

$$
\alpha\|u_n-u_m\|_V
\le
\|A(u_n-u_m)\|_V
=
\|Au_n-Au_m\|_V.
$$

従って

$$
\|u_n-u_m\|_V
\to0.
$$

つまり $(u_n)$ は Cauchy 列です。

ここで $V$ が Hilbert 空間、従って完備であることを使い、ある $u\in V$ が存在して

$$
u_n\to u
$$

とできます。

$A$ は有界線形作用素なので連続です。

従って

$$
Au_n\to Au.
$$

一方で $Au_n\to y$ なので[極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)から

$$
y=Au.
$$

従って $y\in\operatorname{Ran}A$ です。

任意の range 内収束列の極限が再び range に属したので

$$
\boxed{
\operatorname{Ran}A
\text{ は閉}
}.
$$

完備性を使った箇所は

$$
(u_n)\text{ が Cauchy}
\Longrightarrow
u_n\to u\in V
$$

の一段です。
<!-- solution-end -->

<a id="ex-gpde7-b02"></a>
#### GPDE7-B02 dense range の証明と対称性不要の確認
- Level: B

$V$ を実 Hilbert 空間、$a$ を bounded かつ coercive な双線形形式とし

$$
a(u,v)=\langle Au,v\rangle
$$

とする。

1. $y\in(\operatorname{Ran}A)^\perp$ なら $a(u,y)=0$ が全ての $u\in V$ で成り立つことを示せ。
2. $u=y$ と選んで $y=0$ を導け。
3. この論証で $a(u,v)=a(v,u)$ を使っていないことを説明せよ。

<!-- solution-start -->
**詳細解答**

$y\in(\operatorname{Ran}A)^\perp$ とします。

定義から、任意の $z\in\operatorname{Ran}A$ に対して

$$
\langle z,y\rangle=0.
$$

特に任意の $u\in V$ に対して $Au\in\operatorname{Ran}A$ なので

$$
\langle Au,y\rangle=0.
$$

作用素表示から

$$
\langle Au,y\rangle
=
a(u,y).
$$

従って

$$
a(u,y)=0
\qquad
(\forall u\in V).
$$

ここで $u=y$ と選ぶと

$$
a(y,y)=0.
$$

coercivity より

$$
\alpha\|y\|_V^2
\le
a(y,y)
=
0.
$$

$\alpha>0$ なので

$$
y=0.
$$

従って

$$
(\operatorname{Ran}A)^\perp
=
\{0\}.
$$

Hilbert 空間の直交補空間の性質から

$$
\overline{\operatorname{Ran}A}
=
V.
$$

証明中で使ったのは

$$
a(u,y)
=
\langle Au,y\rangle
$$

と

$$
a(y,y)
\ge
\alpha\|y\|^2
$$

だけです。

$a(u,y)$ を $a(y,u)$ に入れ替える箇所はありません。

従って対称性は不要です。
<!-- solution-end -->

<a id="ex-gpde7-b03"></a>
#### GPDE7-B03 右辺の摂動に対する strong stability
- Level: B

Lax--Milgram の仮定を満たす $a$ を固定する。

$F_n,F\in V^*$ が

$$
\|F_n-F\|_{V^*}
\to0
$$

を満たし、それぞれの解を $u_n,u\in V$ とする。

$$
u_n\to u
\quad\text{in }V
$$

を示せ。

<!-- solution-start -->
**詳細解答**

$u_n$ と $u$ はそれぞれ

$$
a(u_n,v)=F_n(v),
$$

$$
a(u,v)=F(v)
$$

を全ての $v\in V$ で満たします。

差を取ると

$$
a(u_n-u,v)
=
(F_n-F)(v).
$$

従って $u_n-u$ は、右辺 $F_n-F$ に対応する Lax--Milgram 解です。

[安定性評価](#cor-gpde7-stability)から

$$
\|u_n-u\|_V
\le
\frac1\alpha
\|F_n-F\|_{V^*}.
$$

仮定より右辺は 0 へ収束します。

従って

$$
\boxed{
\|u_n-u\|_V\to0
}.
$$

すなわち

$$
u_n\to u
\quad\text{strongly in }V.
$$
<!-- solution-end -->

### Level C

<a id="ex-gpde7-c01"></a>
#### GPDE7-C01 非対称変分問題を Lax--Milgram で閉じる
- Level: C

$V=H_0^1(0,1)$ に

$$
\|v\|_V=\|v'\|_{L^2(0,1)}
$$

を入れる。

$\beta\in\mathbb R$ を固定し

$$
a(u,v)
=
\int_0^1
u'v'\,dx
+
\beta
\int_0^1
u v'\,dx
$$

とする。

$F\in V^*$ を任意に取る。

次を順に示せ。

1. $a$ は双線形である。
2. [Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)を使い

$$
|a(u,v)|
\le
(1+|\beta|C_P)
\|u\|_V\|v\|_V
$$

を示せ。
3. $v\in H_0^1(0,1)$ に対して

$$
\int_0^1
v v'\,dx
=
0
$$

を示せ。
4. $a(v,v)=\|v\|_V^2$ を導き、coercivity 定数を求めよ。
5. Lax--Milgram により

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

を満たす $u$ が一意に存在することを示せ。
6. $\|u\|_V$ の安定性評価を求めよ。
7. $\beta\ne0$ のとき、一般には $a(u,v)\ne a(v,u)$ であることを具体的な $u,v$ で確認せよ。

<!-- solution-start -->
**詳細解答**

### 1. 双線形性

第一項

$$
(u,v)
\mapsto
\int_0^1
u'v'\,dx
$$

は微分と積分の線形性から各変数について線形です。

第二項

$$
(u,v)
\mapsto
\beta
\int_0^1
u v'\,dx
$$

も各変数について線形です。

従って和 $a$ は双線形です。

### 2. boundedness

第一項は Cauchy--Schwarz から

$$
\left|
\int_0^1
u'v'\,dx
\right|
\le
\|u'\|_2\|v'\|_2
=
\|u\|_V\|v\|_V.
$$

第二項は

$$
\left|
\beta
\int_0^1
u v'\,dx
\right|
\le
|\beta|
\|u\|_2
\|v'\|_2.
$$

[Poincaré 不等式](../GPDE4/index.md#thm-gpde4-poincare)より

$$
\|u\|_2
\le
C_P\|u'\|_2
=
C_P\|u\|_V.
$$

従って

$$
\left|
\beta
\int_0^1
u v'\,dx
\right|
\le
|\beta|C_P
\|u\|_V\|v\|_V.
$$

二項を合わせて

$$
\boxed{
|a(u,v)|
\le
(1+|\beta|C_P)
\|u\|_V\|v\|_V
}.
$$

従って $a$ は bounded です。

### 3. 対角上の一次項

$v\in H_0^1(0,1)$ です。

GPDE4 の区間上の Sobolev 関数の絶対連続代表元を取れば

$$
(v^2)'=2vv'
$$

が a.e. 成り立ち、微積分学の基本定理から

$$
\int_0^1
vv'\,dx
=
\frac12
\int_0^1
(v^2)'\,dx
=
\frac12
\left(
v(1)^2-v(0)^2
\right).
$$

$H_0^1(0,1)$ の trace は両端で 0 なので

$$
v(0)=v(1)=0.
$$

従って

$$
\boxed{
\int_0^1
vv'\,dx
=
0
}.
$$

### 4. coercivity

上の結果を使うと

$$
\begin{aligned}
a(v,v)
&=
\int_0^1
|v'|^2\,dx
+
\beta
\int_0^1
vv'\,dx
\\
&=
\|v'\|_2^2
\\
&=
\|v\|_V^2.
\end{aligned}
$$

従って

$$
\boxed{
\alpha=1
}
$$

で coercive です。

### 5. 存在一意性

$V=H_0^1(0,1)$ は Hilbert 空間です。

ここまでで

- $a$ は双線形
- $a$ は bounded
- $a$ は $\alpha=1$ で coercive
- $F\in V^*$

を確認しました。

従って [Lax--Milgram 定理](#thm-gpde7-lax-milgram)により、一意な $u\in V$ が存在して

$$
\boxed{
a(u,v)=F(v)
\qquad
(\forall v\in V)
}
$$

を満たします。

### 6. 安定性

coercivity 定数は $\alpha=1$ なので

$$
\|u\|_V
\le
\frac1\alpha
\|F\|_{V^*}
=
\|F\|_{V^*}.
$$

従って

$$
\boxed{
\|u\|_V
\le
\|F\|_{V^*}
}.
$$

### 7. 非対称性の具体的確認

例えば

$$
u(x)=x(1-x),
\qquad
v(x)=x^2(1-x).
$$

はいずれも $H_0^1(0,1)$ に属します。

対称な第一項は差を取ると消えるので

$$
a(u,v)-a(v,u)
=
\beta
\int_0^1
(uv'-vu')\,dx.
$$

微分すると

$$
u'(x)=1-2x,
$$

$$
v'(x)=2x-3x^2.
$$

また

$$
u(x)=x-x^2,
\qquad
v(x)=x^2-x^3.
$$

従って

$$
\begin{aligned}
uv'
&=
(x-x^2)(2x-3x^2)
\\
&=
2x^2-5x^3+3x^4,
\end{aligned}
$$

$$
\begin{aligned}
vu'
&=
(x^2-x^3)(1-2x)
\\
&=
x^2-3x^3+2x^4.
\end{aligned}
$$

差は

$$
uv'-vu'
=
x^2-2x^3+x^4.
$$

従って

$$
\int_0^1
(uv'-vu')\,dx
=
\frac13-\frac12+\frac15
=
\frac1{30}.
$$

よって

$$
a(u,v)-a(v,u)
=
\frac{\beta}{30}.
$$

$\beta\ne0$ なら

$$
\boxed{
a(u,v)\ne a(v,u)
}.
$$

それでも boundedness と coercivity は成立しているため、Lax--Milgram は問題なく適用できます。

この例は

$$
\boxed{
\text{対称性は energy minimization には重要だが、Lax--Milgram には不要}
}
$$

という本章の要点を具体的に示しています。
<!-- solution-end -->

---

## 18. まとめ

本章では GPDE6 の

$$
a(u,v)=F(v)
$$

を一般の Hilbert 空間上へ抽象化し、Lax--Milgram 定理を完全証明しました。

証明の本体は

$$
\boxed{
a(u,v)
\overset{\mathrm{Riesz}}{\longrightarrow}
\langle Au,v\rangle
}
$$

と作用素を作るところから始まります。

boundedness により $A$ は有界です。

coercivity により

$$
\boxed{
\|Au\|
\ge
\alpha\|u\|
}
$$

という下からの評価が得られます。

そこから

$$
\text{injective}
$$

と

$$
\text{closed range}
$$

を得ます。

さらに

$$
y\perp\operatorname{Ran}A
\Longrightarrow
a(u,y)=0
\quad(\forall u)
$$

で $u=y$ と置くと coercivity から $y=0$ なので

$$
\overline{\operatorname{Ran}A}=V.
$$

range は閉でもあるため

$$
\operatorname{Ran}A=V.
$$

従って $A$ は全単射です。

右辺 $F$ も Riesz 表現して

$$
F(v)=\langle f,v\rangle
$$

とすれば

$$
Au=f
$$

を解けます。

最終的に

$$
\boxed{
\exists!u\in V:
a(u,v)=F(v)
\quad(\forall v\in V)
}
$$

と

$$
\boxed{
\|u\|_V
\le
\frac1\alpha
\|F\|_{V^*}
}
$$

を得ました。

また、

- 対称性は Lax--Milgram に不要。
- coercivity を失うと kernel や到達不能方向が残る。
- Poisson は $\alpha=1$ の最も基本的な例。
- reaction--diffusion でも各項を評価すれば同じ定理が使える。
- 非対称な一次項を含む最小例でも Lax--Milgram は働く。

ことを確認しました。

次の GPDE8 では、この定理を道具として

$$
-\operatorname{div}(A(x)\nabla u)
+
b(x)\cdot\nabla u
+
c(x)u
=
f
$$

という二階線形楕円型 PDE へ進みます。

そこでの主課題は定理をもう一度証明することではなく、

$$
\boxed{
\text{係数仮定}
\Longrightarrow
\text{boundedness / coercivity}
}
$$

を一項ずつ検証することです。
