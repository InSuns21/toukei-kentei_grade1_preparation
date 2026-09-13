# F0-00P3 独立・積測度：同時分布が積になるとは何か

<!-- definition-example-audit: strict -->

独立性を「相関が0」ではなく、**事象・σ代数・同時分布の積構造**として定義します。

この章の中心線は

```text
独立な事象
 ↓
独立なσ代数・確率変数
 ↓
同時分布 = 周辺分布の積測度
 ↓
密度の積分解
 ↓
期待値の因数分解
```

です。条件付き期待値は次の P3A で扱います。

---

## 1. 独立な事象

<a id="def-f0-00p3-independent-events"></a>

<!-- formal-statement-start -->
> **定義（独立な事象）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の事象 $A,B\in\mathcal F$ が
>
> $$
> P(A\cap B)=P(A)P(B)
> $$
>
> を満たすとき、$A,B$ は**独立**であるといいます。
<!-- formal-statement-end -->

これは「同時に起こる確率が周辺確率の積へ分解する」という条件です。

### 1.1 例：4点の標本空間

$$
\Omega=\{1,2,3,4\},
\qquad
P(\{\omega\})=\frac14
$$

とし

$$
A=\{1,2\},
\qquad
B=\{1,3\}
$$

とします。

<!-- definition-example-start: def-f0-00p3-independent-events -->
**定義の確認**

$$
P(A)=P(B)=\frac12,
\qquad
A\cap B=\{1\},
\qquad
P(A\cap B)=\frac14.
$$

したがって

$$
P(A\cap B)=\frac14
=\frac12\cdot\frac12
=P(A)P(B),
$$

なので $A,B$ は独立です。
<!-- definition-example-end -->

---

## 2. 独立なσ代数

<a id="def-f0-00p3-independent-sigma-algebras"></a>

<!-- formal-statement-start -->
> **定義（独立なσ代数）**  
> 確率空間 $(\Omega,\mathcal F,P)$ の部分σ代数 $\mathcal G_1,\mathcal G_2\subseteq\mathcal F$ が、任意の
>
> $$
> A\in\mathcal G_1,
> \qquad
> B\in\mathcal G_2
> $$
>
> に対して
>
> $$
> P(A\cap B)=P(A)P(B)
> $$
>
> を満たすとき、$\mathcal G_1,\mathcal G_2$ は**独立**であるといいます。
<!-- formal-statement-end -->

### 2.1 例：二つの公平なビット

$$
\Omega=\{(0,0),(0,1),(1,0),(1,1)\}
$$

の各点に確率 $1/4$ を与え、座標写像

$$
U(u,v)=u,
\qquad
V(u,v)=v
$$

を考えます。

$$
\sigma(U)
=
\{\varnothing,\Omega,\{U=0\},\{U=1\}\},
$$

$$
\sigma(V)
=
\{\varnothing,\Omega,\{V=0\},\{V=1\}\}
$$

です。

<!-- definition-example-start: def-f0-00p3-independent-sigma-algebras -->
**定義の確認**

$\varnothing$ や $\Omega$ を含む組は直ちに積公式を満たします。残る非自明な組では、$i,j\in\{0,1\}$ に対して

$$
P(U=i)=P(V=j)=\frac12,
$$

かつ

$$
P(U=i,V=j)=\frac14.
$$

よって

$$
P(\{U=i\}\cap\{V=j\})
=\frac14
=\frac12\cdot\frac12.
$$

したがって $\sigma(U)$ と $\sigma(V)$ は独立です。
<!-- definition-example-end -->

---

## 3. 独立な確率変数

<a id="def-f0-00p3-independent-random-variables"></a>

<!-- formal-statement-start -->
> **定義（独立な確率変数）**  
> 実数値確率変数 $X,Y$ が、生成するσ代数
>
> $$
> \sigma(X),\qquad\sigma(Y)
> $$
>
> の独立性を満たすとき、$X,Y$ は**独立な確率変数**であるといいます。
<!-- formal-statement-end -->

ここで

$$
\sigma(X)
=
\{X^{-1}(A):A\in\mathcal B(\mathbb R)\}
$$

です。したがって「$X$ の値だけから判定できる事象」と「$Y$ の値だけから判定できる事象」が全て独立、という意味です。

<!-- definition-example-start: def-f0-00p3-independent-random-variables -->
### 3.1 例：二つの公平なビット

**定義の確認**

前節の $U,V$ について、すでに $\sigma(U)$ と $\sigma(V)$ が独立であることを確認しました。したがって定義により $U,V$ は独立な確率変数です。
<!-- definition-example-end -->

---

## 4. pairwise independence と mutual independence

<a id="def-f0-00p3-pairwise-mutual-independence"></a>

<!-- formal-statement-start -->
> **定義（pairwise independence と mutual independence）**  
> 確率変数 $X_1,\ldots,X_n$ が **pairwise independent** であるとは、任意の $i\ne j$ について $X_i,X_j$ が独立であることをいいます。
>
> 一方、$X_1,\ldots,X_n$ が **mutually independent** であるとは、任意の Borel 集合 $A_1,\ldots,A_n$ に対して
>
> $$
> P(X_1\in A_1,\ldots,X_n\in A_n)
> =
> \prod_{k=1}^nP(X_k\in A_k)
> $$
>
> が成り立つことをいいます。
<!-- formal-statement-end -->

pairwise independence は二つずつしか見ません。mutual independence は三つ以上の同時事象まで要求します。

### 4.1 例：XOR は pairwise だが mutual ではない

$U,V$ を独立な Bernoulli$(1/2)$ とし

$$
W=U\oplus V
$$

とします。

<!-- definition-example-start: def-f0-00p3-pairwise-mutual-independence -->
**定義の確認**

$U,V,W$ は全て Bernoulli$(1/2)$ です。また $(U,V)$, $(U,W)$, $(V,W)$ の各組では、4通りの値がそれぞれ確率 $1/4$ で現れます。例えば

$$
P(U=1,W=1)
=P(U=1,V=0)
=\frac14
=P(U=1)P(W=1).
$$

他の値の組も同様なので、三変数は pairwise independent です。

しかし

$$
P(U=0,V=0,W=0)=\frac14
$$

である一方

$$
P(U=0)P(V=0)P(W=0)=\frac18.
$$

したがって mutually independent ではありません。
<!-- definition-example-end -->

---

## 5. 独立性と同時分布の積測度表示

<a id="thm-f0-00p3-independence-product-law"></a>

<!-- formal-statement-start -->
> **定理（独立性と積測度の同値）**  
> 実数値確率変数 $X,Y$ の周辺分布を $P_X,P_Y$、同時分布を $P_{X,Y}$ とします。次は同値です。
>
> 1. $X,Y$ は独立である。
> 2. 任意の Borel 集合 $A,B\in\mathcal B(\mathbb R)$ に対して
>
> $$
> P(X\in A,Y\in B)=P_X(A)P_Y(B).
> $$
>
> 3. 同時分布が
>
> $$
> \boxed{P_{X,Y}=P_X\otimes P_Y}
> $$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1 ⇒ 2

$X,Y$ が独立なら $\sigma(X),\sigma(Y)$ が独立です。Borel 集合 $A,B$ に対して

$$
\{X\in A\}=X^{-1}(A)\in\sigma(X),
$$

$$
\{Y\in B\}=Y^{-1}(B)\in\sigma(Y).
$$

よって独立なσ代数の定義から

$$
\begin{aligned}
P(X\in A,Y\in B)
&=P(X^{-1}(A)\cap Y^{-1}(B))\\
&=P(X\in A)P(Y\in B)\\
&=P_X(A)P_Y(B).
\end{aligned}
$$

#### 2 ⇒ 3

長方形 $A\times B$ に対して

$$
P_{X,Y}(A\times B)
=P_X(A)P_Y(B).
$$

一方、[σ有限測度の積測度](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-01)も

$$
(P_X\otimes P_Y)(A\times B)
=P_X(A)P_Y(B)
$$

を満たします。$P_X,P_Y$ は確率測度なのでσ有限であり、同定理の一意性部分から、積σ代数上で

$$
P_{X,Y}=P_X\otimes P_Y
$$

です。実数の Borel σ代数では

$$
\mathcal B(\mathbb R)\otimes\mathcal B(\mathbb R)
=\mathcal B(\mathbb R^2)
$$

なので、これは通常の同時分布全体の等式です。

#### 3 ⇒ 2

$P_{X,Y}=P_X\otimes P_Y$ なら、長方形 $A\times B$ に評価して

$$
P(X\in A,Y\in B)
=P_{X,Y}(A\times B)
=P_X(A)P_Y(B).
$$

#### 2 ⇒ 1

任意の $E\in\sigma(X)$ と $F\in\sigma(Y)$ を取ります。生成σ代数の定義から、ある Borel 集合 $A,B$ があって

$$
E=X^{-1}(A),
\qquad
F=Y^{-1}(B)
$$

と書けます。したがって 2 より

$$
\begin{aligned}
P(E\cap F)
&=P(X\in A,Y\in B)\\
&=P_X(A)P_Y(B)\\
&=P(E)P(F).
\end{aligned}
$$

任意の $E\in\sigma(X)$, $F\in\sigma(Y)$ で成り立つので、$\sigma(X),\sigma(Y)$ は独立です。よって $X,Y$ は独立です。
<!-- proof-end -->

この定理が、独立性を「同時分布の積構造」と言い換える根拠です。

---

## 6. 密度の積分解は積測度表示の特殊形

$X,Y$ が独立で、周辺分布が Lebesgue 測度に関する確率密度関数 $f_X,f_Y$ を持つとします。任意の Borel 集合 $C\subset\mathbb R^2$ に対して、[Tonelliの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli)から

$$
(P_X\otimes P_Y)(C)
=
\int_C f_X(x)f_Y(y)\,dx\,dy.
$$

一方、独立性から

$$
P_{X,Y}=P_X\otimes P_Y.
$$

したがって $P_{X,Y}$ の確率密度関数は

$$
f_X(x)f_Y(y)
$$

であり、[Radon--Nikodym微分の一意性](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)から

$$
\boxed{
f_{X,Y}(x,y)=f_X(x)f_Y(y)
\quad\text{Lebesgue-a.e.}
}
$$

です。

逆にこの等式が a.e. で成り立てば、全 Borel 集合で同時分布と積測度の値が一致するので、前節の定理から $X,Y$ は独立です。

離散分布では同じ議論が数え上げ測度に対して

$$
p_{X,Y}(x,y)=p_X(x)p_Y(y)
$$

となります。

---

## 7. 独立なら期待値も因数分解する

<a id="thm-f0-00p3-expectation-factorization"></a>

<!-- formal-statement-start -->
> **定理（独立な確率変数の期待値因数分解）**  
> 独立な実数値確率変数 $X,Y$ と Borel 可測関数 $g,h$ が
>
> $$
> E[|g(X)|]<\infty,
> \qquad
> E[|h(Y)|]<\infty
> $$
>
> を満たすとします。このとき $g(X)h(Y)$ も可積分で
>
> $$
> \boxed{
> E[g(X)h(Y)]
> =E[g(X)]E[h(Y)]
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

独立性と前節の定理から

$$
P_{X,Y}=P_X\otimes P_Y.
$$

まず可積分性を確認します。非負関数 $|g(x)h(y)|$ に [Tonelliの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli)を適用すると

$$
\begin{aligned}
\int_{\mathbb R^2}|g(x)h(y)|\,d(P_X\otimes P_Y)
&=\int_{\mathbb R}|g(x)|
\left(\int_{\mathbb R}|h(y)|\,dP_Y(y)\right)dP_X(x)\\
&=\left(\int|g|\,dP_X\right)
\left(\int|h|\,dP_Y\right).
\end{aligned}
$$

[LOTUS](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-lotus)より

$$
\int|g|\,dP_X=E[|g(X)|],
\qquad
\int|h|\,dP_Y=E[|h(Y)|],
$$

なので右辺は有限です。従って $(x,y)\mapsto g(x)h(y)$ は $P_X\otimes P_Y$ に関して可積分です。

ここで [Fubiniの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を適用して

$$
\begin{aligned}
E[g(X)h(Y)]
&=\int_{\mathbb R^2}g(x)h(y)\,d(P_X\otimes P_Y)(x,y)\\
&=\int_{\mathbb R}g(x)
\left(\int_{\mathbb R}h(y)\,dP_Y(y)\right)dP_X(x)\\
&=\left(\int g\,dP_X\right)
\left(\int h\,dP_Y\right)\\
&=E[g(X)]E[h(Y)].
\end{aligned}
$$

最後の等号にも LOTUS を使いました。
<!-- proof-end -->

特に $X,Y\in L^2$ なら Cauchy--Schwarz から $X,Y\in L^1$ なので

$$
E[XY]=E[X]E[Y]
$$

となり

$$
\operatorname{Cov}(X,Y)=0.
$$

ただし逆は一般に成り立ちません。

### 7.1 無相関でも独立とは限らない

$X$ を $-1,0,1$ にそれぞれ確率 $1/3$ で取る確率変数とし

$$
Y=X^2
$$

とします。対称性から

$$
E[X]=0,
\qquad
E[XY]=E[X^3]=0,
$$

したがって

$$
\operatorname{Cov}(X,Y)=0.
$$

しかし $Y$ は $X$ から完全に決まります。例えば

$$
P(X=0,Y=0)=\frac13
$$

に対して

$$
P(X=0)P(Y=0)=\frac13\cdot\frac13=\frac19.
$$

よって $X,Y$ は独立ではありません。

---

## 8. この章の見取り図

$$
\boxed{
X\perp Y
\iff
P_{X,Y}=P_X\otimes P_Y
}
$$

が中心です。密度の積分解と期待値の因数分解は、この測度の等式から導かれる結果です。

一方

$$
\operatorname{Cov}(X,Y)=0
$$

は独立性の必要条件の一つにすぎず、一般には十分条件ではありません。

---

## 演習

### F0-00P3-A01 事象の独立性を判定する

- Level: A
- 目安時間: 10分

公平なサイコロ $D$ に対して

$$
A=\{D\text{ は偶数}\},
\qquad
B=\{D\ge4\}
$$

とする。$A,B$ が独立か判定せよ。

<!-- solution-start -->
#### 詳細解答

$$
P(A)=\frac36=\frac12,
\qquad
P(B)=\frac36=\frac12.
$$

また

$$
A\cap B=\{4,6\}
$$

なので

$$
P(A\cap B)=\frac26=\frac13.
$$

一方

$$
P(A)P(B)=\frac14.
$$

$1/3\ne1/4$ なので、独立性の定義を満たさず、$A,B$ は独立ではありません。
<!-- solution-end -->

### F0-00P3-A02 二つのビットの独立性

- Level: A
- 目安時間: 10分

$U,V$ を独立な Bernoulli$(1/2)$ とする。$(U,V)$ の同時分布を表にし、各セルが周辺確率の積になっていることを確認せよ。

<!-- solution-start -->
#### 詳細解答

独立性から $i,j\in\{0,1\}$ について

$$
P(U=i,V=j)=P(U=i)P(V=j)=\frac12\cdot\frac12=\frac14.
$$

したがって同時確率表は

| $U\backslash V$ | 0 | 1 |
|---|---:|---:|
| 0 | $1/4$ | $1/4$ |
| 1 | $1/4$ | $1/4$ |

です。各セルが対応する周辺確率 $1/2$ と $1/2$ の積になっています。
<!-- solution-end -->

### F0-00P3-A03 積測度から長方形確率を読む

- Level: A
- 目安時間: 10分

独立な標準正規確率変数 $X,Y$ に対して

$$
P(X\le0,Y>0)
$$

を求めよ。

<!-- solution-start -->
#### 詳細解答

独立性から

$$
P_{X,Y}=P_X\otimes P_Y.
$$

したがって長方形事象について

$$
P(X\le0,Y>0)
=P(X\le0)P(Y>0).
$$

標準正規分布の対称性より各確率は $1/2$ なので

$$
P(X\le0,Y>0)=\frac14.
$$
<!-- solution-end -->

### F0-00P3-A04 期待値の因数分解

- Level: A
- 目安時間: 10分

独立な Bernoulli$(p)$ 変数 $X,Y$ に対して

$$
E[(1+X)(2-Y)]
$$

を求めよ。

<!-- solution-start -->
#### 詳細解答

$1+X$ は $X$ の関数、$2-Y$ は $Y$ の関数です。独立な確率変数の可測関数も独立なので、期待値因数分解を使えます。

$$
E[1+X]=1+p,
$$

$$
E[2-Y]=2-p.
$$

従って

$$
E[(1+X)(2-Y)]
=(1+p)(2-p).
$$
<!-- solution-end -->

### F0-00P3-B01 pairwise independent だが mutual independent ではない例

- Level: B
- 目安時間: 15分

$U,V$ を独立な Bernoulli$(1/2)$、$W=U\oplus V$ とする。$U,V,W$ が pairwise independent だが mutually independent でないことを示せ。

<!-- solution-start -->
#### 詳細解答

$(U,V)$ は仮定より独立です。

$(U,W)$ について、$U=0$ のとき $W=V$、$U=1$ のとき $W=1-V$ なので、$(U,W)$ の4通り

$$
(0,0),(0,1),(1,0),(1,1)
$$

はそれぞれ確率 $1/4$ で現れます。従って

$$
P(U=i,W=j)=\frac14
=P(U=i)P(W=j)
$$

です。$(V,W)$ も同様なので pairwise independent です。

一方、$U=V=0$ なら必ず $W=0$ なので

$$
P(U=0,V=0,W=0)=\frac14.
$$

しかし

$$
P(U=0)P(V=0)P(W=0)=\frac18.
$$

したがって mutual independence の定義を満たしません。
<!-- solution-end -->

### F0-00P3-B02 積測度同値の逆向き

- Level: B
- 目安時間: 15分

$$
P_{X,Y}=P_X\otimes P_Y
$$

を仮定して、$X,Y$ が独立であることを示せ。

<!-- solution-start -->
#### 詳細解答

任意の $E\in\sigma(X)$, $F\in\sigma(Y)$ を取ります。ある Borel 集合 $A,B$ が存在して

$$
E=X^{-1}(A),
\qquad
F=Y^{-1}(B)
$$

と書けます。

仮定から

$$
\begin{aligned}
P(E\cap F)
&=P(X\in A,Y\in B)\\
&=P_{X,Y}(A\times B)\\
&=(P_X\otimes P_Y)(A\times B)\\
&=P_X(A)P_Y(B)\\
&=P(E)P(F).
\end{aligned}
$$

したがって $\sigma(X)$ と $\sigma(Y)$ は独立です。定義より $X,Y$ は独立です。
<!-- solution-end -->

### F0-00P3-B03 密度の積分解から独立性を判定する

- Level: B
- 目安時間: 20分

$(X,Y)$ の同時確率密度関数が

$$
f_{X,Y}(x,y)=4xy\boldsymbol{1}_{(0,1)^2}(x,y)
$$

で与えられるとする。周辺確率密度関数を求め、$X,Y$ が独立であることを示せ。

<!-- solution-start -->
#### 詳細解答

$0<x<1$ で

$$
\begin{aligned}
f_X(x)
&=\int_0^1 4xy\,dy\\
&=4x\left[\frac{y^2}{2}\right]_0^1\\
&=2x.
\end{aligned}
$$

区間外では $f_X(x)=0$ です。同様に

$$
f_Y(y)=2y\boldsymbol{1}_{(0,1)}(y).
$$

したがって

$$
f_X(x)f_Y(y)
=4xy\boldsymbol{1}_{(0,1)^2}(x,y)
=f_{X,Y}(x,y).
$$

密度の積分解が a.e. で成り立つので、同時分布は $P_X\otimes P_Y$ に一致し、$X,Y$ は独立です。
<!-- solution-end -->

### F0-00P3-C01 同時分布・独立性・期待値を一度に読む

- Level: C
- 目安時間: 30分

$X,Y\in\{0,1\}$ の同時確率を

$$
P(X=0,Y=0)=\frac18,
\quad
P(X=0,Y=1)=\frac38,
$$

$$
P(X=1,Y=0)=\frac18,
\quad
P(X=1,Y=1)=\frac38
$$

とする。

1. $X,Y$ の周辺分布を求めよ。
2. $X,Y$ が独立か判定せよ。
3. $E[XY]$ と $E[X]E[Y]$ をそれぞれ求めよ。
4. $g(x)=1+2x$, $h(y)=3-y$ として $E[g(X)h(Y)]$ を求めよ。
5. 2 の結論と 4 の計算を積測度の観点から説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 周辺分布。** 行和・列和を取ると

$$
P(X=0)=\frac12,
\qquad
P(X=1)=\frac12,
$$

$$
P(Y=0)=\frac14,
\qquad
P(Y=1)=\frac34.
$$

**2. 独立性。** 各セルを周辺確率の積と比較します。

例えば

$$
P(X=0)P(Y=0)
=\frac12\cdot\frac14
=\frac18
=P(X=0,Y=0).
$$

同様に

$$
\frac12\cdot\frac34=\frac38
$$

なので他の3セルも一致します。従って同時分布は周辺分布の積測度で、$X,Y$ は独立です。

**3. 積の期待値。** $XY=1$ となるのは $(X,Y)=(1,1)$ のときだけなので

$$
E[XY]=\frac38.
$$

一方

$$
E[X]=\frac12,
\qquad
E[Y]=\frac34,
$$

したがって

$$
E[X]E[Y]=\frac38.
$$

**4. 可測関数の積。** 独立性から期待値因数分解を使えます。

$$
E[g(X)]
=1+2E[X]
=2,
$$

$$
E[h(Y)]
=3-E[Y]
=\frac94.
$$

よって

$$
E[g(X)h(Y)]
=2\cdot\frac94
=\frac92.
$$

**5. 積測度の観点。** 2 で確認したセルごとの積分解は

$$
P_{X,Y}=P_X\otimes P_Y
$$

の離散版です。この等式があるため、$g(x)h(y)$ の積分を積測度上で反復積分でき、4 の期待値が二つの期待値の積へ分解します。
<!-- solution-end -->

---

## 次に進む

独立性を積測度として理解したら、次は [F0-00P3A 条件付き期待値](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md) で、情報を表す部分σ代数に対して期待値を射影する考え方へ進みます。
