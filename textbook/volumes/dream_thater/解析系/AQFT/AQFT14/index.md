# AQFT14 Haag双対性・wedge双対性・factor性

[AQFT13の局所性からの包含](../AQFT13/index.md#prop-aqft13-causal-complement-commutant)では、空間的に離れた領域の観測量が交換するため、$\mathcal M(O^\perp)\subset\mathcal M(O)'$ が分かりました。しかし可換子 $\mathcal M(O)'$ には、**補領域の観測量からは作れない余分な演算子**が含まれるかもしれません。包含が等号になる条件と、局所環を中心で分解できるかという条件は異なります。本講ではこれらを独立に計算し、後の局所環の型分類への足場を作ります。

舞台は計量符号 $(-,+,+,+)$ の四次元Minkowski時空です。[AQFT1の因果補集合](../AQFT1/index.md#def-aqft1-causal-complement)を $O^\perp$、[AQFT9の局所von Neumann net](../AQFT9/index.md#def-aqft9-local-vn-net)を $\mathcal M(O)\subset B(\mathcal H)$ と書きます。全ての可換子は同じ $\mathcal H$ 上の $B(\mathcal H)$ 内で取り、局所性と包含単調性を仮定します。ここで $\mathcal H$ は固定した表現のHilbert空間です。必要な場合、開領域 $V$ の代数は $\mathcal M(V)=\bigl(\bigcup_{D\Subset V}\mathcal M(D)\bigr)''$ と定め、$D$ は閉包が $V$ にコンパクトに含まれる有界double coneを走るものとします。この定義は開領域への拡張を新たに選ぶ場合の規約です。もともとのnetが全開領域で定義されている場合、それと一致するには内側からの加法性などの追加仮定が必要であり、無条件には同一視しません。

## 1. 局所性の包含とHaag双対性の等号

[可換子の定義](../../VN/VN2/index.md#def-vn2-commutant)によれば、$\mathcal N'$ は $\mathcal N$ の全作用素と交換する全ての有界作用素の集合です。一方、$\mathcal M(O^\perp)$ は **補領域に割り当てられた作用素から生成した環**です。この二つは定義から同じではありません。

[AQFT13の補領域包含](../AQFT13/index.md#prop-aqft13-causal-complement-commutant)の可換子を取ると

$$
\mathcal M(O^\perp)\subset\mathcal M(O)'
\quad\Longleftrightarrow\quad
\mathcal M(O)\subset\mathcal M(O^\perp)'
$$

です。逆向きには両辺の可換子を取り、[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)による $\mathcal M(O)''=\mathcal M(O)$ を使います。

この右端が等号になることを **Haag双対性** と呼びます。領域ごとに課す条件であり、局所性という公理と混ぜてはいけません。

<a id="def-aqft14-haag-duality"></a>

<!-- formal-statement-start -->
> **定義（Haag双対性）**  
> $\mathcal H$ 上の単位的局所von Neumann net $\mathcal M$ と開領域 $O$ に対し、$O$ におけるHaag双対性とは
>
$$
\mathcal M(O)=\mathcal M(O^\perp)'
$$
>
> が成立することをいう。同値に $\mathcal M(O)'=\mathcal M(O^\perp)$ である。**double cone Haag双対性** は全ての非空double coneでこの等号を要求する条件であり、**全因果完備領域における双対性**とは要求範囲を区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft14-haag-duality -->
### 直接例：二つの行列因子は補領域を尽くすか

最初は空間的に離れた二領域の割当てを取り出した模型です。$\mathcal H=\mathbb C^2\otimes\mathbb C^2$ とし、

$$
N=B(\mathbb C^2)\otimes I_2,\qquad K=I_2\otimes B(\mathbb C^2)
$$

と置きます。任意の $A,B\in B(\mathbb C^2)$ について $(A\otimes I_2)(I_2\otimes B)=A\otimes B=(I_2\otimes B)(A\otimes I_2)$、したがって局所性に相当する交換性が成立します。

さらに $N'=K$ です。なぜなら $T=\sum_{i,j=1}^2E_{ij}\otimes T_{ij}$ が全ての $E_{pp}\otimes I_2$ と交換すると、$i\ne j$ の $T_{ij}$ は零になります。残る $T=E_{11}\otimes T_{11}+E_{22}\otimes T_{22}$ が $E_{12}\otimes I_2$ と交換するには $T_{11}=T_{22}$ が必要です。よって $T=I_2\otimes T_{11}$。逆にこの形は全ての $N$ と交換します。対称に $K'=N$ です。

従って、この二領域の組では **等号を直接確認**できました。これは完全なMinkowski共変netを構成したという主張ではなく、定義で要求する等号の行列判定です。
<!-- definition-example-end -->

「交換すれば十分」と考えると失敗します。$\mathcal H=(\mathbb C^2)^{\otimes3}$ で

$$
N=B(\mathbb C^2)\otimes I_2\otimes I_2,\qquad
K=I_2\otimes B(\mathbb C^2)\otimes I_2
$$

とすると $[N,K]=0$ ですが

$$
K'=B(\mathbb C^2)\otimes I_2\otimes B(\mathbb C^2)
\supsetneq N.
$$

例えば $I_2\otimes I_2\otimes E_{11}$ は $K'$ に入って $N$ には入りません。**第3因子の情報が補領域の指定から漏れた**ことが等号を壊しました。ここでも二領域だけの小模型であって、全時空のnetではありません。

## 2. 双対netを作り、何が保証されるかを見る

双対性が失敗したとき、「補領域の観測量すべてと可換な作用素」を元の局所代数に追加することができます。この拡大を **双対net** と呼びます。ただし、代数が大きくなることと、新しい割当てが局所性まで保つことは別問題です。

<a id="def-aqft14-dual-net"></a>

<!-- formal-statement-start -->
> **定義（双対net）**  
> 各開領域 $O$ とその開いた因果補集合 $O^\perp$ に対して単位的von Neumann環 $\mathcal M(O)$ が定まる局所netを考える。双対割当て $\mathcal M^d$ は
>
$$
\mathcal M^d(O):=\mathcal M(O^\perp)'
$$
>
> により定める。$\mathcal M^d(O)$ は $B(\mathcal H)$ 内のvon Neumann環である。元のnetが $O$ でHaag双対的であるとは $\mathcal M(O)=\mathcal M^d(O)$ ということである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft14-dual-net -->
### 直接例：第3因子が双対割当てに入る

上の三因子模型で $\mathcal M(O)=N$、$\mathcal M(O^\perp)=K$ とすると、定義に代入して

$$
\mathcal M^d(O)=K'=B(\mathbb C^2)\otimes I_2\otimes B(\mathbb C^2).
$$

この環は単位元・積・随伴・弱極限に閉じています（有限次元では全ての線形部分空間は閉）。$N$ を含みますが、第三因子の $E_{11}$ が新たに入るので真の拡大です。二因子模型では $\mathcal M^d(O)=N$ で拡大は起こりません。**定義の中の補領域と可換子をどちらも計算して**、二つの結果を区別しました。
<!-- definition-example-end -->

<a id="prop-aqft14-dual-net-isotony"></a>

<!-- formal-statement-start -->
> **命題（双対割当ての包含単調性）**  
> $\mathcal M$ が開領域上で包含単調性とEinstein局所性を満たす単位的von Neumann netなら、任意の開領域 $O_1\subset O_2$ について
>
$$
\mathcal M(O_1)\subset\mathcal M^d(O_1)
\subset\mathcal M^d(O_2)
$$
>
> が成り立つ。また $O^{\perp\perp}=O$ を満たす因果完備な開領域について、二度双対を取った割当ては $\mathcal M^{dd}(O)=\mathcal M(O)$ となる。ただしここでの $\mathcal M^{dd}(O)$ は $\mathcal M^d(O^\perp)'$ で定義する。
<!-- formal-statement-end -->

### 証明の見取り図

包含単調性は「因果補集合は包含を逆転する」と「可換子も包含を逆転する」を二度使います。二度双対を取る式では、因果補集合と作用素の可換子をそれぞれ二度作用させます。

<!-- proof-start -->
### 証明

[AQFT1の補集合の順序反転](../AQFT1/index.md#prop-aqft1-complement-order)により $O_2^\perp\subset O_1^\perp$ です。元のnetの包含単調性から

$$
\mathcal M(O_2^\perp)\subset\mathcal M(O_1^\perp)
$$

となり、[可換子の順序反転](../../VN/VN2/index.md#prop-vn2-commutant-order)を適用すると

$$
\mathcal M(O_1^\perp)'\subset\mathcal M(O_2^\perp)'.
$$

すなわち $\mathcal M^d(O_1)\subset\mathcal M^d(O_2)$ です。他方、元のnetの局所性から [AQFT13の可換子包含](../AQFT13/index.md#prop-aqft13-causal-complement-commutant)を適用すれば $\mathcal M(O_1)\subset\mathcal M^d(O_1)$。

最後に因果完備性 $O^{\perp\perp}=O$ の下で、定義を二度代入します。

$$
\begin{aligned}
\mathcal M^{dd}(O)
&=\mathcal M^d(O^\perp)'\\
&=\bigl(\mathcal M(O^{\perp\perp})'\bigr)'\\
&=\mathcal M(O)''=\mathcal M(O).
\end{aligned}
$$

最後の等式は [二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)によります。$\square$
<!-- proof-end -->

この命題は **双対割当ての局所性を主張していません**。$\mathcal M^d(O_1)$ と $\mathcal M^d(O_2)$ が、空間的に分離した二領域で必ず交換するとは、ここまでの包含計算だけでは言えません。新しいnetの公理を論じるには追加の条件と領域族の指定が必要です。

## 3. wedge双対性：大きい領域でも同じ等号か

[AQFT1の右・左wedge](../AQFT1/index.md#def-aqft1-wedges)は、空間方向へ無限に延びた領域です。右wedge $W_R=\{(t,x^1,x^2,x^3):x^1>|t|\}$ と左wedge $W_L=\{x^1<-|t|\}$ は [wedgeの因果補集合の定理](../AQFT1/index.md#thm-aqft1-wedge-complement)により $W_R^\perp=W_L$、$W_L^\perp=W_R$ を満たします。**wedge双対性** はこのような領域に限って双対性の等号を要求します。

<a id="def-aqft14-wedge-duality"></a>

<!-- formal-statement-start -->
> **定義（wedge双対性）**  
> 四次元Minkowski時空のwedge全体を $\mathcal W$ とし、$\mathcal M(W)$ が各 $W\in\mathcal W$ に定まる局所von Neumann netとする。wedge双対性とは全ての $W\in\mathcal W$ に対して
>
$$
\mathcal M(W)'=\mathcal M(W^\perp)
$$
>
> が成立することをいう。右wedgeだけに等号を要求する条件と、全wedgeに要求する条件は区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft14-wedge-duality -->
### 直接例：右wedge・左wedgeの組

二因子模型を右・左wedgeの組に割り当てて $\mathcal M(W_R)=N=B(\mathbb C^2)\otimes I_2$、$\mathcal M(W_L)=K=I_2\otimes B(\mathbb C^2)$ と置くと、先ほど行列単位で確認した $N'=K$ により右wedgeの等号が成り立ちます。逆向きも $K'=N$ なので成り立ちます。

一方、三因子模型の $N,K$ では $N'\ne K$ となり、交換性は成立してもwedge双対性は失敗します。これは二つのwedge代数の条件を抜き出した模型であり、Poincaré共変な全wedge netの例ではありません。
<!-- definition-example-end -->

<a id="thm-aqft14-wedge-covariance"></a>

<!-- formal-statement-start -->
> **定理（共変性によるwedge双対性の伝播）**  
> $\mathcal M$ が正時間向き・正空間向きのPoincaré群 $G=\mathcal P_+^\uparrow$ に関してユニタリ共変な局所von Neumann netであるとする。$G$ の作用が全てのwedgeを右wedge $W_R$ の軌道として与え、$\mathcal M(W_R)'=\mathcal M(W_R^\perp)$ が成立するなら、全ての $W\in\mathcal W$ で $\mathcal M(W)'=\mathcal M(W^\perp)$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

共変性は領域の移動をユニタリ共役に置き換えます。ユニタリ共役が可換子を保つことを直接示せば、右wedgeの等号を全wedgeへ運べます。

<!-- proof-start -->
### 証明

任意のwedgeを $W=gW_R$ と書き、$U(g)$ を対応するユニタリ作用素とします。[AQFT9の局所von Neumann netの共変性](../AQFT9/index.md#prop-aqft9-vn-covariance)から

$$
\mathcal M(gW_R)=U(g)\mathcal M(W_R)U(g)^*.
$$

作用素環 $N$ とユニタリ $U$ に対して $(UNU^*)'=UN'U^*$ です。実際 $T$ が全ての $UAU^*$ と可換であることは、両側から $U^*,U$ を掛けて $U^*TU$ が全ての $A\in N$ と可換であることと同値です。

よって右wedgeの等号を代入して

$$
\begin{aligned}
\mathcal M(W)'
&=(U(g)\mathcal M(W_R)U(g)^*)'\\
&=U(g)\mathcal M(W_R)'U(g)^*\\
&=U(g)\mathcal M(W_R^\perp)U(g)^*\\
&=\mathcal M(gW_R^\perp)=\mathcal M(W^\perp).
\end{aligned}
$$

最後は [因果補集合のPoincaré共変性](../AQFT1/index.md#prop-aqft1-poincare-complement)です。$\square$
<!-- proof-end -->

この定理は **右wedgeの等号そのものを局所性から証明していません**。double coneだけでHaag双対性を仮定しても、wedgeへの極限操作や加法性を無条件に通すことはできません。逆に、全ての因果完備領域にHaag双対性を要求する強い定義なら、wedge双対性はその一部分になります。

## 4. 相対可換子と中心：余分な演算子を区別する

包含 $N\subset D$ があるとき、$D$ の中で $N$ と交換する作用素全体 $N'\cap D$ を **相対可換子** と呼びます。可換子 $N'$ は $B(\mathcal H)$ 全体で探すのに対し、相対可換子はさらに $D$ に属するという条件を付けます。

<a id="def-aqft14-relative-commutant"></a>

<!-- formal-statement-start -->
> **定義（相対可換子）**  
> $\mathcal H$ 上の単位的von Neumann環 $N\subset D\subset B(\mathcal H)$ に対し、$N$ の $D$ における相対可換子を
>
$$
N'\cap D=\{T\in D:TA=AT\ \text{for all }A\in N\}
$$
>
> と定義する。これは単位的von Neumann環である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft14-relative-commutant -->
### 直接例：三因子の余剰自由度

三因子模型の $N=B(\mathbb C^2)\otimes I_2\otimes I_2$ と $D=K'=B(\mathbb C^2)\otimes I_2\otimes B(\mathbb C^2)$ では

$$
N'=I_2\otimes B(\mathbb C^2)\otimes B(\mathbb C^2)
$$

なので、行列因子ごとの交わりを取ると

$$
N'\cap D=I_2\otimes I_2\otimes B(\mathbb C^2).
$$

これは $N$ と交換するが $D$ の外側にある第二因子の作用素を除き、第三因子だけを残しています。交わりは単位元・積・随伴に閉じ、有限次元ゆえ弱閉でもあります。相対可換子は **双対拡大に残った交換可能な自由度**を測るもので、中心とは別です。
<!-- definition-example-end -->

中心は自分自身の環の内部で全ての元と交換する部分です。[VN7の中心の定義](../../VN/VN7/index.md#def-vn7-center)により $Z(N)=N\cap N'$ です。[VN7の因子の定義](../../VN/VN7/index.md#def-vn7-factor)では、$Z(N)=\mathbb CI$ のとき $N$ をfactor（因子）と呼びます。**因子性**は一つの環 $N$ の内部の性質、**Haag双対性**は二つの領域の環を結ぶ等号です。

<a id="prop-aqft14-relative-commutant-and-factor"></a>

<!-- formal-statement-start -->
> **命題（相対可換子と因子性の十分条件）**  
> $N=\mathcal M(O)$、$K=\mathcal M(O^\perp)$ を同じHilbert空間上の単位的von Neumann環とし、$N\subset K'$ が成立するとする。$N\vee K:=(N\cup K)''$ と置く。このとき
>
$$
N'\cap\mathcal M^d(O)=(N\vee K)'
$$
>
> が成り立つ。さらに $N\vee K=B(\mathcal H)$ なら $N$ と $K$ はともに因子である。これらの結論にHaag双対性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

相対可換子は可換子の交わりを取れば計算できます。生成環の可換子が二つの可換子の交わりに等しいことを使い、中心がその交わりに入ることを示します。

<!-- proof-start -->
### 証明

双対割当ての定義から

$$
N'\cap\mathcal M^d(O)=N'\cap K'.
$$

任意の $T\in B(\mathcal H)$ について、$T$ が $N$ と $K$ の両方に可換であることは $N\cup K$ の各元と可換であることと同値です。可換子は弱作用素位相で閉じているので、[VN2の可換子の弱閉性](../../VN/VN2/index.md#prop-vn2-commutant-wot-closed)より生成したvon Neumann環にも可換です。したがって

$$
N'\cap K'=(N\cup K)'=(N\vee K)'.
$$

$N\vee K=B(\mathcal H)$ なら右辺は $\mathbb CI$ です。中心の元 $Z\in Z(N)$ は $N$ の全元と交換し、$Z\in N$ なので局所性 $[N,K]=0$ により $K$ とも交換します。従って

$$
Z(N)=N\cap N'\subset N'\cap K'=\mathbb CI.
$$

単位元が中心に入るため $Z(N)=\mathbb CI$。同じ議論を $K$ に適用すれば $Z(K)=\mathbb CI$ です。$\square$
<!-- proof-end -->

逆向きは一般に成立しません。二つとも因子でも、共同生成した環の可換子に余剰の因子が残り得ます。三因子模型はまさにそうした例です。中心が自明というだけで双対性の等号は導けません。

## 5. 双対性・因子性・純粋性の非同値性を判定する

まず **Haag双対的でも因子ではない** 例を計算します。$\mathcal H=\mathbb C^2$、$D=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$ とし、離れた二領域の環をどちらも $D$ とします。$D$ と可換な $T=(t_{ij})$ は $E_{11}$ と可換なので $t_{12}=t_{21}=0$、すなわち $D'=D$。従って二領域間で $D=D'$ の双対性が成立します。しかし

$$
Z(D)=D\cap D'=D\supsetneq\mathbb CI_2
$$

なので因子ではありません。二領域の双対的な代数対を示したのであり、完全な時空netではありません。

逆に **因子でもHaag双対的でない** 例は三因子模型です。第一因子の全行列環の中心はスカラーだけなので $Z(N)=\mathbb CI_8$、また $Z(K)=\mathbb CI_8$ です。それでも $N\subsetneq K'$ が成立しました。

最後に **純粋な状態**と混同しないようにします。状態 $\omega$ が純粋とは、$\omega=t\omega_1+(1-t)\omega_2$、$0<t<1$ と分解できるとき必ず $\omega_1=\omega_2=\omega$ であることです。[OA5のGNS表現](../../OA/OA5/index.md#thm-oa5-gns)と同じく、純粋性は状態の性質であり、ある局所環の中心についての主張ではありません。

先ほどの $D$ における単位ベクトル $\Omega=(e_1+e_2)/\sqrt2$ の状態は

$$
\omega_\Omega(\operatorname{diag}(a,b))
=\frac{a+b}{2}
=\frac12\omega_1(\operatorname{diag}(a,b))
+\frac12\omega_2(\operatorname{diag}(a,b)),
$$

ただし $\omega_1(A)=\langle e_1,Ae_1\rangle$、$\omega_2(A)=\langle e_2,Ae_2\rangle$。両者は $E_{11}$ 上でそれぞれ $1$ と $0$ を与え、異なる状態なので $\omega_\Omega$ は純粋ではありません。他方、[AQFT13の分離ベクトル](../AQFT13/index.md#def-aqft13-separating-vector)の判定によればこの $\Omega$ は $D$ について巡回的かつ分離的です。**巡回分離性も純粋性を意味しません**。

さらに同じ $\Omega$ を全作用素環 $B(\mathbb C^2)$ 上のベクトル状態として見れば純粋ですが、$B(\mathbb C^2)$ に対しては分離的ではありません。状態を定義する代数を変えると純粋性と分離性の判定は変わることが分かります。局所代数の $Z(N)$、補領域との等号、全体の状態の純粋性はそれぞれ別に調べる必要があります。

## 6. 演習と詳細解答

### Level A：定義を式から判定する

<a id="ex-aqft14-a01"></a>
#### AQFT14-A01 対角環の可換子

$\mathcal H=\mathbb C^2$ の対角行列環 $D$ に対し $D'$ を求め、$D$ が因子か判定せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $T=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とおきます。$E_{11}\in D$ との可換性は

$$
TE_{11}=\begin{pmatrix}a&0\\c&0\end{pmatrix},\quad
E_{11}T=\begin{pmatrix}a&b\\0&0\end{pmatrix}
$$

なので $b=c=0$ を要求します。逆に対角行列同士は交換するから $D'=D$。[中心の定義](../../VN/VN7/index.md#def-vn7-center)により $Z(D)=D\cap D'=D$。$E_{11}$ はスカラー行列でないので因子ではありません。
<!-- solution-end -->

<a id="ex-aqft14-a02"></a>
#### AQFT14-A02 二因子の双対性

$\mathcal H=\mathbb C^2\otimes\mathbb C^2$、$N=B(\mathbb C^2)\otimes I_2$、$K=I_2\otimes B(\mathbb C^2)$ とする。$[N,K]=0$ と $N=K'$ を調べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $(A\otimes I_2)(I_2\otimes B)=A\otimes B=(I_2\otimes B)(A\otimes I_2)$ から交換性が成立します。$T\in K'$ は第二因子の全ての行列と交換します。$T=\sum_{i,j=1}^2T_{ij}\otimes E_{ij}$ と展開し、$I_2\otimes E_{pp}$ との可換性で非対角成分を消し、$I_2\otimes E_{12}$ との可換性で二つの対角係数を等しくすれば $T=A\otimes I_2$ です。逆包含は先ほどの積の式によるので $K'=N$ です。[Haag双対性の定義](#def-aqft14-haag-duality)の等号に相当します。
<!-- solution-end -->

<a id="ex-aqft14-a03"></a>
#### AQFT14-A03 双対の包含方向

開領域 $O_1\subset O_2$ で、$\mathcal M(O_1^\perp)$ と $\mathcal M(O_2^\perp)$ のどちらが大きいか、さらに双対割当ての包含方向を答えよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [因果補集合の順序反転](../AQFT1/index.md#prop-aqft1-complement-order)から $O_2^\perp\subset O_1^\perp$。包含単調性で

$$
\mathcal M(O_2^\perp)\subset\mathcal M(O_1^\perp).
$$

[可換子の順序反転](../../VN/VN2/index.md#prop-vn2-commutant-order)を取ると $\mathcal M(O_1^\perp)'\subset\mathcal M(O_2^\perp)'$。[双対netの定義](#def-aqft14-dual-net)から $\mathcal M^d(O_1)\subset\mathcal M^d(O_2)$ です。二回の反転により元と同じ向きになります。
<!-- solution-end -->

<a id="ex-aqft14-a04"></a>
#### AQFT14-A04 中心と相対可換子

$N=B(\mathbb C^2)\otimes I_2$、$D=B(\mathbb C^2)\otimes B(\mathbb C^2)$ とする。$Z(N)$ と $N'\cap D$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 全行列環とスカラーの交換関係から $N'=I_2\otimes B(\mathbb C^2)$。ゆえに

$$
Z(N)=N\cap N'=\mathbb CI_4,
\qquad N'\cap D=I_2\otimes B(\mathbb C^2).
$$

後者は例えば $I_2\otimes E_{11}$ を含むのでスカラーだけではありません。$Z(N)$ は $N$ の内部での交換性、相対可換子は大きい環 $D$ の内部での交換性を測るため異なります。
<!-- solution-end -->

<a id="ex-aqft14-a05"></a>
#### AQFT14-A05 wedgeの補集合

$W_R=\{x^1>|t|\}$ と $W_L=\{x^1<-|t|\}$ を考える。点 $p=(0,2,0,0)$ と $q=(0,-3,0,0)$ の空間的分離を判定し、wedge双対性が要求する式を書け。

- Level: A

<!-- solution-start -->
**詳細解答。** $p\in W_R$、$q\in W_L$ で、計量符号 $(-+++)$ により

$$
g(q-p,q-p)=-(0-0)^2+(-3-2)^2=25>0
$$

です。従ってこの二点は空間的に分離しています。領域全体の補集合については [AQFT1のwedge補集合定理](../AQFT1/index.md#thm-aqft1-wedge-complement)を使い $W_R^\perp=W_L$。[wedge双対性の定義](#def-aqft14-wedge-duality)は $\mathcal M(W_R)'=\mathcal M(W_L)$ を要求します。二点の判定だけからこの代数の等号は導けません。
<!-- solution-end -->

### Level B：模型と一般命題をつなぐ

<a id="ex-aqft14-b01"></a>
#### AQFT14-B01 三因子の双対性欠落

$\mathcal H=(\mathbb C^2)^{\otimes3}$、$N=B(\mathbb C^2)\otimes I_2\otimes I_2$、$K=I_2\otimes B(\mathbb C^2)\otimes I_2$ とする。$N\subsetneq K'$ と $Z(N)=\mathbb CI_8$ を示し、なぜ因子性だけでは双対性が出ないか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 行列単位の交換計算を第二因子に適用すると $K'=B(\mathbb C^2)\otimes I_2\otimes B(\mathbb C^2)$。$N$ の元は第一因子にしか作用しないので $N\subset K'$。$T=I_2\otimes I_2\otimes E_{11}$ は $K'$ に属しますが $N$ に属さず、包含は真です。一方

$$
N'=I_2\otimes B(\mathbb C^2)\otimes B(\mathbb C^2)
$$

であり、$N\cap N'=\mathbb CI_8$（第一因子は全行列環の中心しか残りません）。[factorの定義](../../VN/VN7/index.md#def-vn7-factor)より $N$ は因子です。双対性は $K'$ がどこまで補領域で尽くされるかを問い、中心の自明性より強い別条件です。
<!-- solution-end -->

<a id="ex-aqft14-b02"></a>
#### AQFT14-B02 二度双対を取る

開領域 $O$ に対し $\mathcal M^{dd}(O)=\mathcal M(O^{\perp\perp})$ を定義から導け。また $O^{\perp\perp}=O$ が欠ける場合に何を結論できないか答えよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [双対netの定義](#def-aqft14-dual-net)を $O^\perp$ に適用して

$$
\mathcal M^d(O^\perp)=\mathcal M(O^{\perp\perp})'
$$

を得ます。この可換子を取ると

$$
\mathcal M^{dd}(O)=\bigl(\mathcal M(O^{\perp\perp})'\bigr)'
=\mathcal M(O^{\perp\perp})''
=\mathcal M(O^{\perp\perp}).
$$

最後は [二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)です。一般に $O\subset O^{\perp\perp}$ なので包含単調性で $\mathcal M(O)\subset\mathcal M(O^{\perp\perp})$ ですが、領域が因果完備でない場合、追加の仮定なしに等号とは言えません。
<!-- solution-end -->

<a id="ex-aqft14-b03"></a>
#### AQFT14-B03 相対可換子から共同生成へ

単位的von Neumann環 $N,K\subset B(\mathcal H)$ に対し $N'\cap K'=(N\vee K)'$ を示せ。さらに $N\vee K=B(\mathcal H)$ と $[N,K]=0$ なら $N$ と $K$ は因子と結論せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $T\in N'\cap K'$ とは $T$ が $N\cup K$ の全元と可換なことです。可換子が弱閉であるため $T$ はその二重可換子 $(N\cup K)''=N\vee K$ とも可換です。逆に $N,K\subset N\vee K$ なので $(N\vee K)'\subset N'\cap K'$。両包含から等号です。[相対可換子と因子性の命題](#prop-aqft14-relative-commutant-and-factor)の仮定がそろい、$N'\cap K'=B(\mathcal H)'=\mathbb CI$。$Z(N)\subset N'\cap K'$ および $Z(K)\subset N'\cap K'$ より両中心はスカラーだけ、ゆえに両方因子です。
<!-- solution-end -->

<a id="ex-aqft14-b04"></a>
#### AQFT14-B04 双対的なのに混合状態

$D\subset B(\mathbb C^2)$ を対角環、$\Omega=(e_1+e_2)/\sqrt2$ とする。$D'=D$、$\Omega$ の $D$ に対する巡回・分離性、$\omega_\Omega|_D$ が非純粋であることをそれぞれ示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $E_{11}\in D$ との可換性から $D$ の可換子は対角行列に限られ、対角行列は全て可換なので $D'=D$。従って二領域へ $D,D$ を置いた組は双対的です。

$A=\operatorname{diag}(a,b)$ に対して $A\Omega=(a,b)/\sqrt2$ なので、これが零なら $a=b=0$ で分離的、任意の $(u,v)$ を $a=\sqrt2u,b=\sqrt2v$ で作れるので巡回的です。[AQFT13の定義](../AQFT13/index.md#def-aqft13-separating-vector)の両条件を満たします。

一方、$\omega_\Omega(A)=(a+b)/2$ です。$\omega_1(A)=a,\omega_2(A)=b$ と定めれば二つは $E_{11}$ で異なり、$\omega_\Omega=\frac12\omega_1+\frac12\omega_2$ なので純粋ではありません。**双対性・巡回分離性・純粋性は同じ性質でない**ことが一つの計算で確認できます。
<!-- solution-end -->

### Level C：局所構造の条件を総合判定する

<a id="ex-aqft14-c01"></a>
#### AQFT14-C01 二組の局所代数を比較する

次の二組はいずれも同じHilbert空間内の互いに交換する単位的von Neumann環の対 $(N,K)$ である。

1. $\mathcal H=\mathbb C^2$、$N=K=D$（対角行列環）。
2. $\mathcal H=(\mathbb C^2)^{\otimes3}$、$N=B(\mathbb C^2)\otimes I_2\otimes I_2$、$K=I_2\otimes B(\mathbb C^2)\otimes I_2$。

それぞれについて $N=K'$ の成否、$Z(N)$、$N'\cap K'$ を求める。最後に $N\vee K=B(\mathcal H)$ から何が言え、何が言えないかをまとめよ。

- Level: C

<!-- solution-start -->
**詳細解答。** **第一組。** $D$ と可換な行列は $E_{11}$ との交換から対角行列のみなので $D'=D$。従って $K'=D=N$ で双対性の等号が成り立ちます。しかし

$$
Z(N)=D\cap D'=D,\quad
N'\cap K'=D\cap D=D.
$$

両者は $\mathbb CI_2$ より大きいので因子ではなく、共同生成環 $N\vee K=D$ も $B(\mathbb C^2)$ ではありません。

**第二組。** 第2因子に作用する $K$ の可換子は第1・第3因子に任意の行列を許すので

$$
K'=B(\mathbb C^2)\otimes I_2\otimes B(\mathbb C^2)
\supsetneq N.
$$

第3因子の非スカラー射影が右辺にあり左辺にないので双対性は成立しません。第1因子の全行列環の中心はスカラーのみなので $Z(N)=\mathbb CI_8$。また

$$
N'=I_2\otimes B(\mathbb C^2)\otimes B(\mathbb C^2),\quad
N'\cap K'=I_2\otimes I_2\otimes B(\mathbb C^2).
$$

よって [共同生成と相対可換子の公式](#prop-aqft14-relative-commutant-and-factor)から

$$
N\vee K=B(\mathbb C^2)\otimes B(\mathbb C^2)\otimes I_2
\subsetneq B(\mathcal H).
$$

**一般的結論。** 局所性 $[N,K]=0$ と共同生成 $N\vee K=B(\mathcal H)$ があれば [本講の因子性の十分条件](#prop-aqft14-relative-commutant-and-factor)より両方が因子です。しかしこの事実だけで $N=K'$ を証明することはできません。因子性の判定は中心、双対性の判定は補領域の可換子全体を比較するからです。提示した二模型は因子性と双対性の論理的独立をそれぞれ逆方向から示しています。
<!-- solution-end -->

## 7. 次講への接続

局所性から得られるのは $\mathcal M(O)\subset\mathcal M(O^\perp)'$ という包含であり、Haag双対性は等号を追加で要求します。wedge双対性も等号に関する別の領域族の条件です。一方、因子性は $\mathcal M(O)\cap\mathcal M(O)'=\mathbb CI$ という中心の条件で、全体の真空状態の純粋性とも別です。有限次元模型で独立性を確認しましたが、これだけで自由スカラー場の全局所環が双対的・因子的であるとは示していません。

次講AQFT15では、[VN7の因子と射影の分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)を使い、Type I/II/IIIの違いと、鋭い時空領域に部分トレースを持ち込む際の限界を考えます。
