# LREP13 Lorentz不変収縮

<!-- definition-example-audit: strict -->

[前講の左右Weylスピノル](../LREP12/index.md#def-lrep12-weyl)では、二成分列から四元ベクトルを作りました。今回は複数の列を組み合わせて、観測者を変えても値の変わらない数や、四元ベクトル・二階テンソルとして変わる量を作ります。さらに空間の向きを反転したときに左右の表現がどうなるかを調べます。

[四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)の群 $G=SL(2,\mathbb C)$（行列式1の複素二次正方行列の群）を使います。能動変換、すなわち座標系を固定してベクトルを動かす規約です。[Minkowski計量](../../../物理系/SREL/SREL2/index.md#def-srel2-minkowski-metric)の標準座標での行列を $\eta=\operatorname{diag}(-1,1,1,1)$ とし、二引数の値を $\eta(x,y)=x^{\mathsf T}\eta y$ と書きます。

[左右Weylスピノル](../LREP12/index.md#def-lrep12-weyl)の標準基底で、左列 $u,v\in L=\mathbb C^2$ は $S\in G$、右列 $r,s\in R=\mathbb C^2$ は $Q(S)=(S^\dagger)^{-1}$ で変換します。$L,R$ は別々の空間ですが、どちらも同じ形の成分列で表示します。$\mathsf T$ は転置、$\dagger$ は共役転置、上線は成分ごとの複素共役です。プライムは変換後の量を表し、微分ではありません。成分は通常の可換な複素数です。

## 1. どの二成分の積が不変か

回転では $S^\dagger S=I_2$ なので $u^\dagger v$ は保存されますが、[正の $z$ 方向のboost](../LREP10/index.md#def-lrep10-sl2c-action)に対応する $S=\operatorname{diag}(2,1/2)$ に対して $u=v=(1,0)^{\mathsf T}$ とすると、$u^\dagger v=1$ が $4$ に変わります。そこで内積の代わりに二本の列が作る符号付き面積に相当する量を使います。

[LREP4の二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)で得た行列を

$$
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

とします。標準基底 $e_1,e_2$ で $u=u^1e_1+u^2e_2$ と書き、上付きの $1,2$ は成分番号（べき乗ではない）とします。[双線形形式の行列表示](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix)では $J_{ab}=B(e_a,e_b)$ を並べれば、双線形性により

$$
B(u,v)=\sum_{a,b=1}^2 u^aJ_{ab}v^b
=u^{\mathsf T}Jv=u^1v^2-u^2v^1
$$

となります。[双線形形式](../../../基礎科目/LA/LA3E/index.md#def-la3e-bilinear-form)は両引数で複素線形であり、さらにすべての $u$ で $B(u,u)=0$ となるものを交代形式と呼びます。成分積を足して添字を消し、数を得る操作を収縮と呼びます。[不変双線形形式](../LREP4/index.md#def-lrep4-invariant-bilinear)の条件は、任意の群元と任意の二入力を同時に変換しても値が変わらないことです。これを左右それぞれの列に適用します。

<a id="def-lrep13-contraction"></a>

<!-- formal-statement-start -->
> **定義（Weyl不変収縮）**  
> $G=SL(2,\mathbb C)$ の左空間 $L$ および右空間 $R$（いずれも $\mathbb C^2$）に対して、$J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とする。二本の同じ種類の列から作る複素双線形形式

$$
B_L(u,v)=u^{\mathsf T}Jv,\qquad
B_R(r,s)=r^{\mathsf T}Js
$$

> をWeyl不変収縮と呼ぶ。左列には $S$、右列には $Q(S)=(S^\dagger)^{-1}$ が作用する。不変性とは任意の $S\in G$、$u,v\in L$、$r,s\in R$ に対し

$$
B_L(Su,Sv)=B_L(u,v),\qquad
B_R(Q(S)r,Q(S)s)=B_R(r,s)
$$

> が成立することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep13-contraction -->
**定義の確認**。 $u=(1,2)^{\mathsf T}$、$v=(3,i)^{\mathsf T}$ なら $Jv=(i,-3)^{\mathsf T}$ なので $B_L(u,v)=i-6$。逆順では $B_L(v,u)=6-i$、同じ列なら $B_L(u,u)=2-2=0$ です。双線形性は一組の値だけでなく、任意の複素数 $\lambda,\kappa$ と列 $w$ に対して

$$
\begin{aligned}
B_L(\lambda u+\kappa w,v)
&=\lambda B_L(u,v)+\kappa B_L(w,v),\\
B_L(u,\lambda v+\kappa w)
&=\lambda B_L(u,v)+\kappa B_L(u,w)
\end{aligned}
$$

が行列積の分配法則から成立することで確認できます。右側も同じ成分式です。任意の列 $w$ について $w^1w^2-w^2w^1=0$ なので交代性も成立します。

boost $D=\operatorname{diag}(2,1/2)$ では $Du=(2,1)^{\mathsf T}$、$Dv=(6,i/2)^{\mathsf T}$ となり、収縮は $2(i/2)-6=i-6$ です。同じ入力を右列とすると $Q(D)u=(1/2,4)^{\mathsf T}$、$Q(D)v=(3/2,2i)^{\mathsf T}$ なので $(1/2)(2i)-4(3/2)=i-6$。左右とも値を保存します。さらに [二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)より $A^{\mathsf T}JA=(\det A)J$ であり、任意の $S\in G$ に対して $\det S=\det Q(S)=1$ なので両作用とも $J$ を保存します。これが任意の二入力に対する不変性の判定根拠です。次の命題で一意性も含めて確認します。
<!-- definition-example-end -->

<a id="prop-lrep13-scalar"></a>

<!-- formal-statement-start -->
> **命題（Weyl収縮の保存と一意性）**  
> 左右それぞれのWeyl空間上で $G=SL(2,\mathbb C)$ に不変な複素双線形形式は $J$ による収縮の定数倍に限る。さらに $u\in L,r\in R$ の間の混合収縮 $H(r,u)=r^\dagger u$ は不変である。
<!-- formal-statement-end -->

**証明の見取り図。** 行列式1が面積を保存することを使います。一意性には対角行列とせん断行列という二種類の群元だけで十分です。混合収縮では逆共役転置が打ち消し合います。

<!-- proof-start -->
### 証明

[二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)より任意の二次正方行列 $A$ に対して $A^{\mathsf T}JA=(\det A)J$。$\det S=1$、$\det Q(S)=1/\overline{\det S}=1$ なので

$$
\begin{aligned}
B_L(Su,Sv)&=u^{\mathsf T}S^{\mathsf T}JSv=u^{\mathsf T}Jv,\\
B_R(Qr,Qs)&=r^{\mathsf T}Q^{\mathsf T}JQs=r^{\mathsf T}Js.
\end{aligned}
$$

[双線形形式の行列表示](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix)により、任意の複素双線形形式 $B$ は標準基底での値 $M_{ab}=B(e_a,e_b)$ を成分とする二次正方行列 $M$ を使って $u^{\mathsf T}Mv$ と書けます。不変性は

$$
u^{\mathsf T}(S^{\mathsf T}MS-M)v=0
\qquad(u,v\in\mathbb C^2)
$$

です。$u=e_a,v=e_b$ を代入すると括弧内の $(a,b)$ 成分が零となります。逆に $S^{\mathsf T}MS=M$ なら任意の二入力で上式が成立するので、この行列条件と同値です。

$M=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とし、$D=\operatorname{diag}(2,1/2)$ を代入すると

$$
D^{\mathsf T}MD=\begin{pmatrix}4a&b\\c&d/4\end{pmatrix}=M
$$

より $a=d=0$。さらに $N=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ に対し

$$
N^{\mathsf T}MN=\begin{pmatrix}0&b\\c&b+c\end{pmatrix}=M
$$

だから $c=-b$、従って $M=bJ$ です。右作用については

$$
Q(S)^\dagger=S^{-1},\qquad
Q(Q(S))=(S^{-1})^{-1}=S
$$

なので $Q$ は $G$ から $G$ への全単射です。従って右の不変性にも $Q(S)=D,N$ の場合を代入でき、同じ結論を得ます。

最後に $Q(S)^\dagger=S^{-1}$ ですから

$$
(Q(S)r)^\dagger Su=r^\dagger S^{-1}Su=r^\dagger u.
$$

これは第一引数について共役線形、第二引数について線形であり、複素双線形形式ではありません。$\square$
<!-- proof-end -->

例えば $r=(1,i)^{\mathsf T}$、$u=(2,3)^{\mathsf T}$ に対し $H(r,u)=2-3i$。$D$ による変換後は $r'=(1/2,2i)^{\mathsf T}$、$u'=(4,3/2)^{\mathsf T}$ なので $2-3i$ です。同じ側のエルミート内積とは異なり、この保存則には正定値性を主張していません。

## 2. 四元ベクトルを収縮する

数を作るだけでなく、成分を残して変換則を持つ量も作れます。[二添字Weyl表示と四元ベクトル](../LREP12/index.md#prop-lrep12-bispinor-vector)では $X=uz^{\mathsf T}$ に対する作用が $X'=SXS^\dagger$ でした。ここでは $z=\overline v$ として $X=uv^\dagger$ と書きます。ここで $v$ は左列であり、$z$ は右列そのものではなく共役空間の列です。実際、変換後は $(Su)(Sv)^\dagger=Suv^\dagger S^\dagger$ です。

[エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)の基底 $I_2,\sigma_1,\sigma_2,\sigma_3$（$\sigma_i$ は [Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)）を使うと、一般の行列を

$$
X=\begin{pmatrix}x^0+x^3&x^1-ix^2\\x^1+ix^2&x^0-x^3\end{pmatrix}
$$

と一意に表せます。添字 $0$ は時間成分、$1,2,3$ は空間成分です。一般には複素四元ベクトルで、$X^\dagger=X$ のとき、対角成分が実数かつ非対角成分が互いに共役なので四つの係数が実数になります。

二本のベクトルのMinkowski内積も、交代行列を使って求められます。二次正方行列の余因子を転置した行列（余因子行列の転置）を $\operatorname{adj}X$ と書きます。$X=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ なら

$$
\operatorname{adj}X=\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
=JX^{\mathsf T}J^{\mathsf T}.
$$

この式は $X$ が特異なときにも成立します。$\operatorname{tr}$ は行列の対角成分の和（跡）です。

<a id="prop-lrep13-vector-pairing"></a>

<!-- formal-statement-start -->
> **命題（四元ベクトルの行列収縮）**  
> 実四元ベクトル $x,y$ を $X=x^0I+\sum_{i=1}^3x^i\sigma_i$、$Y=y^0I+\sum_{i=1}^3y^i\sigma_i$ で表す。ここで $\sigma_i$ は前講のPauli行列である。Minkowski計量 $\eta=\operatorname{diag}(-1,1,1,1)$ に対し

$$
\eta(x,y)=-\frac12\operatorname{tr}((\operatorname{adj}X)Y).
$$

> この式は複素四元ベクトルにも複素双線形に延長でき、$X,Y$ をともに $SXS^\dagger,SYS^\dagger$ に移すと保存される。
<!-- formal-statement-end -->

**証明の見取り図。** 行列式がMinkowski二乗を与えることを利用し、二乗の差から交差項を取り出します。

<!-- proof-start -->
### 証明

$Y=\begin{pmatrix}e&f\\g&h\end{pmatrix}$ とすると

$$
\begin{aligned}
\det(X+Y)-\det X-\det Y
&=ah+de-bg-cf,\\
\operatorname{tr}((\operatorname{adj}X)Y)
&=de-bg-cf+ah.
\end{aligned}
$$

[LREP10の行列式と未来円錐の判定](../LREP10/index.md#thm-lrep10-determinant-cone)より $\det X=-\eta(x,x)$ です。$X+Y$ は $x+y$ の表示なので差は

$$
-\eta(x+y,x+y)+\eta(x,x)+\eta(y,y)
=-2\eta(x,y).
$$

複素係数の場合も成分式 $\det X=(x^0)^2-\sum_i(x^i)^2$ が成立するため、同じ差の計算が使えます。行列式は $\det(SXS^\dagger)=\det X$ によって保存されます。合同作用は加法を保つので三つの行列式の差も保存され、結論が従います。$\square$
<!-- proof-end -->

例えば $X=I$、$Y=2I+\sigma_3$ とすれば $x=(1,0,0,0)$、$y=(2,0,0,1)$ です。$\operatorname{adj}X=I$ だから収縮は $-(3+1)/2=-2$ です。boost $D=\operatorname{diag}(2,1/2)$ により $X'=\operatorname{diag}(4,1/4)$、$Y'=\operatorname{diag}(12,1/4)$。積 $(\operatorname{adj}X')Y'$ は $\operatorname{diag}(3,1)$ となり、値は変わりません。

## 3. 二階テンソルを作る

四元ベクトル二本を組み合わせ、時空添字を二つ残した量を考えます。[四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)で $\Phi(S)$ と書いたLorentz変換を、本講では行列 $\Lambda(S)$（群元を固定した場合は $\Lambda$）と書きます。$\Lambda^\mu{}_\alpha$ は行 $\mu$、列 $\alpha$ の成分であり、四元ベクトルは

$$
(x')^\mu=\sum_{\alpha=0}^3\Lambda^\mu{}_\alpha x^\alpha
$$

と変わります。ここで時空添字 $\mu,\nu,\alpha,\beta$ はすべて $0,1,2,3$ を走ります。[テンソル積表現](../LREP4/index.md#def-lrep4-tensor-product)を四元ベクトル空間二つに適用し、二階反変テンソルを成分 $T^{\mu\nu}$ が次の規則に従う量として扱います。

$$
(T')^{\mu\nu}
=\sum_{\alpha,\beta=0}^3\Lambda^\mu{}_\alpha
\Lambda^\nu{}_\beta T^{\alpha\beta}.
$$

たとえば $x^\mu y^\nu$ がこの規則を満たすのは、各ベクトルの成分変換を掛け合わせれば分かります。対称部分と反対称部分を取っても同じ規則が保たれます。

<a id="prop-lrep13-tensor"></a>

<!-- formal-statement-start -->
> **命題（Weyl列からの二階テンソル）**  
> 左Weyl列 $u,v\in\mathbb C^2$ から $X=uu^\dagger,Y=vv^\dagger$ を作り、対応する実四元ベクトルを $x,y$ とする。成分

$$
T^{\mu\nu}=x^\mu y^\nu,\qquad
F^{\mu\nu}=x^\mu y^\nu-x^\nu y^\mu
$$

> はともに二階反変テンソルとして変換する。反対称な $F$ の完全収縮は

$$
F^{\mu\nu}F_{\mu\nu}
=-2\eta(x,y)^2
$$

> となる。ただし時空添字の下げ方は

$$
F_{\mu\nu}=\sum_{\alpha,\beta=0}^3
\eta_{\mu\alpha}\eta_{\nu\beta}F^{\alpha\beta}
$$

> とする。完全収縮の左辺は $\sum_{\mu,\nu=0}^3 F^{\mu\nu}F_{\mu\nu}$ の略記である。以降、和記号を省いた式では上下に一度ずつ現れる反復時空添字について $0$ から $3$ まで和を取る。
<!-- formal-statement-end -->

**証明の見取り図。** 各列から作るベクトルのLorentz共変性を使い、最後に光的条件で項を消します。

<!-- proof-start -->
### 証明

[二添字Weyl表示](../LREP12/index.md#prop-lrep12-bispinor-vector)より $uu^\dagger$ と $vv^\dagger$ はエルミート行列で、それぞれ $SXS^\dagger$ と $SYS^\dagger$ へ移るので $x'=\Lambda x,y'=\Lambda y$ です。従って

$$
(x')^\mu(y')^\nu
=\sum_{\alpha,\beta}\Lambda^\mu{}_\alpha
\Lambda^\nu{}_\beta x^\alpha y^\beta.
$$

交換項にも同じ式を適用すると

$$
\begin{aligned}
(x')^\nu(y')^\mu
&=\sum_{\alpha,\beta}\Lambda^\nu{}_\alpha
\Lambda^\mu{}_\beta x^\alpha y^\beta\\
&=\sum_{\alpha,\beta}\Lambda^\mu{}_\alpha
\Lambda^\nu{}_\beta x^\beta y^\alpha .
\end{aligned}
$$

二行目では和の添字 $\alpha,\beta$ を交換しました。二つの式の差が $F'$ の変換則になります。

下添字を $x_\mu=\sum_\alpha\eta_{\mu\alpha}x^\alpha$ と書くと $F_{\mu\nu}=x_\mu y_\nu-x_\nu y_\mu$。四項を掛け合わせれば

$$
\begin{aligned}
F^{\mu\nu}F_{\mu\nu}
&=(x^\mu x_\mu)(y^\nu y_\nu)
 -(x^\mu y_\mu)(y^\nu x_\nu)\\
&\quad -(x^\nu y_\nu)(y^\mu x_\mu)
 +(x^\nu x_\nu)(y^\mu y_\mu)\\
&=2\{\eta(x,x)\eta(y,y)-\eta(x,y)^2\}.
\end{aligned}
$$

任意の列 $w$ に対して $(uu^\dagger)w=u(u^\dagger w)$ なので像は $u$ の張る空間に含まれます。$vv^\dagger$ も同様に像が $v$ の張る空間に含まれます。従ってどちらも二次正方行列で階数が高々1、行列式は0です。[行列式とMinkowski二乗](../LREP10/index.md#thm-lrep10-determinant-cone)から $\eta(x,x)=\eta(y,y)=0$（零ベクトルも含む）。よって所定の式を得ます。$\square$
<!-- proof-end -->

$u=(\sqrt2,0)^{\mathsf T}$、$v=(0,\sqrt2)^{\mathsf T}$ なら $x=(1,0,0,1)$、$y=(1,0,0,-1)$ です。$F^{03}=-2,F^{30}=2$ が唯一の非零成分であり、添字を下げると $F_{03}=2,F_{30}=-2$ です。完全収縮は $-4-4=-8$。$\eta(x,y)=-2$ を代入した式と一致します。

## 4. 空間座標の符号と左右の交換

これまでは時間の向きと時空の向きを保つLorentz変換を扱ってきました。時間をそのままにして三つの空間座標の符号を同時に反転する操作（parity）を考えます。これをスピノルにも作用させたいと考えます。

<a id="def-lrep13-parity"></a>

<!-- formal-statement-start -->
> **定義（空間反転）**  
> 実Minkowski空間上の線形写像 $P$ を次のブロック行列で定め、空間反転と呼ぶ。ここで $I_3$ は三次単位行列である。

$$
P=\begin{pmatrix}1&0\\0&-I_3\end{pmatrix}.
$$

> すなわち

$$
P(x^0,\mathbf x)=(x^0,-\mathbf x).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep13-parity -->
**定義の確認**。 $x=(2,1,-3,4)$ は $(2,-1,3,-4)$ に移ります。標準座標の基底 $e_0,e_1,e_2,e_3$ に対し $Pe_0=e_0$、$Pe_i=-e_i$（$i=1,2,3$）なので、線形写像の表示行列の各列は定義どおりです。対角成分を二乗すると $P^2=I_4$ となり、二回の反転で元へ戻ります。

[Lorentz群と単位元成分](../LREP9/index.md#def-lrep9-lorentz-group)の計量保存条件をこの表示行列で判定すると、

$$
P^{\mathsf T}\eta P
=\operatorname{diag}(-1,(-1)^2,(-1)^2,(-1)^2)
=\eta.
$$

従って任意の二入力の計量を保存します。一方 $\det P=1\cdot(-1)^3=-1$ なので行列式1の固有Lorentz群には属しません。時間座標は変わりません。
<!-- definition-example-end -->

[エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)で $P$ に対応する行列作用を $\mathcal P$ と書きます。$X$ の対角を交換し非対角の符号を反転すると、

$$
\mathcal P(X)=
\begin{pmatrix}x^0-x^3&-x^1+ix^2\\-x^1-ix^2&x^0+x^3\end{pmatrix}
=\operatorname{adj}X=x^0I-\sum_i x^i\sigma_i
$$

となり、空間成分だけ反転しています。左右を交換する場合は [表現の直和](../LREP4/index.md#def-lrep4-direct-sum)を使い、標準成分を保ったまま左の列を右の空間へ、右の列を左の空間へ移します。

<a id="prop-lrep13-parity-exchange"></a>

<!-- formal-statement-start -->
> **命題（空間反転による左右交換）**  
> $G=SL(2,\mathbb C)$ で $Q(S)=(S^\dagger)^{-1}$ とする。$S$ の四元ベクトル作用を $\Lambda(S)$ と書くと

$$
P\Lambda(S)P=\Lambda(Q(S)).
$$

> 左右の直和 $L\oplus R$ 上では $P$ に対応する複素線形作用 $\Pi(u,r)=(r,u)$ を選べる。この作用は $\Pi^2=I$ と

$$
\Pi\rho(S)\Pi=\rho(Q(S)),
\qquad \rho(S)=\operatorname{diag}(S,Q(S))
$$

> を満たす。一方、単独の左または右Weyl空間上にはこの交換関係を満たす可逆な複素線形作用は存在しない。
<!-- formal-statement-end -->

**証明の見取り図。** まず四元ベクトル作用において反転前後の行列を計算し、次に直和で二つのブロックを交換します。単独の場合は左右表現の非同値性が障害になります。

<!-- proof-start -->
### 証明

二次正方行列では $\operatorname{adj}(AB)=\operatorname{adj}(B)\operatorname{adj}(A)$。実際、第2節で成分ごとに確かめた表示を代入すると

$$
\begin{aligned}
\operatorname{adj}(AB)
&=J B^{\mathsf T}A^{\mathsf T}J^{\mathsf T}\\
&=(J B^{\mathsf T}J^{\mathsf T})
(J A^{\mathsf T}J^{\mathsf T})
\end{aligned}
$$

です（$J^{\mathsf T}J=I$ を使用）。従って特異行列も含めて成立します。また $\operatorname{adj}(\operatorname{adj}X)=X$ は成分式から従います。$\det S=\det S^\dagger=1$ だから $\operatorname{adj}S=S^{-1}$、$\operatorname{adj}S^\dagger=Q(S)$。よって

$$
\begin{aligned}
\mathcal P(S\mathcal P(X)S^\dagger)
&=Q(S)X S^{-1}\\
&=Q(S)X Q(S)^\dagger .
\end{aligned}
$$

[四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)で右辺は $\Lambda(Q(S))$ に対応します。

直和の標準成分を使い $\Pi(u,r)=(r,u)$ とします。二回適用すると元へ戻り、

$$
\Pi\rho(S)\Pi(u,r)
=\Pi(Sr,Q(S)u)
=(Q(S)u,Sr).
$$

$Q(Q(S))=S$ なので右辺は $\rho(Q(S))(u,r)$ です。単独の左空間上に可逆な複素線形写像 $A$ が存在すると仮定すれば $ASA^{-1}=Q(S)$、すなわち $AS=Q(S)A$ がすべての $S$ で成立します。しかし[左右Weyl表現の非同値性](../LREP12/index.md#prop-lrep12-inequivalent)がこれを否定します。右の場合も $S$ を $Q(S)$ に置き換えれば同じ矛盾になります。$\square$
<!-- proof-end -->

たとえば $D=\operatorname{diag}(2,1/2)$ とすれば $Q(D)=D^{-1}$ です。正の $z$ 方向のboostが空間反転で逆方向のboostへ移り、直和では左右の伸縮が交換されます。回転 $U\in SU(2)$ では $Q(U)=U$ のため変わりません。なお[前講の反線形な左右対応](../LREP12/index.md#prop-lrep12-conjugate-right)は複素線形な空間反転の代用ではありません。

## 5. 演習

### Level A

<a id="ex-lrep13-a01"></a>

#### LREP13-A01 交代収縮
- Level: A
- ID: LREP13-A01

$u=(2,i)^{\mathsf T},v=(1,3)^{\mathsf T}$ とし、$B_L(u,v),B_L(v,u),B_L(u,u)$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Weyl不変収縮](#def-lrep13-contraction)より $Jv=(3,-1)^{\mathsf T}$、$Ju=(i,-2)^{\mathsf T}$。従って $B_L(u,v)=6-i$、$B_L(v,u)=i-6$、$B_L(u,u)=2i-2i=0$。逆順で符号が反転します。
<!-- solution-end -->

<a id="ex-lrep13-a02"></a>

#### LREP13-A02 混合収縮と複素共役
- Level: A
- ID: LREP13-A02

$S=\operatorname{diag}(i,-i)$、$u=(1,2)^{\mathsf T}$、$r=(i,1)^{\mathsf T}$ とする。変換前後の $r^\dagger u$ と $r^{\mathsf T}u$ を求めよ。

<!-- solution-start -->
**詳細解答。** [左右Weylスピノル](../LREP12/index.md#def-lrep12-weyl)より $Q(S)=S$（$S^\dagger=S^{-1}$）。$u'=(i,-2i)^{\mathsf T}$、$r'=(-1,-i)^{\mathsf T}$ です。

$$
\begin{aligned}
r^\dagger u&=2-i,& (r')^\dagger u'&=-i+i(-2i)=2-i,\\
r^{\mathsf T}u&=2+i,& (r')^{\mathsf T}u'&=-i+(-i)(-2i)=-2-i.
\end{aligned}
$$

[Weyl収縮の保存](#prop-lrep13-scalar)で保存が保証される混合収縮は共役転置を用いる方です。
<!-- solution-end -->

<a id="ex-lrep13-a03"></a>

#### LREP13-A03 行列収縮
- Level: A
- ID: LREP13-A03

$X=\operatorname{diag}(3,1)$、$Y=\begin{pmatrix}2&1\\1&4\end{pmatrix}$ の実四元ベクトル間のMinkowski内積を行列式の差と成分の両方から求めよ。

<!-- solution-start -->
**詳細解答。** $X+Y=\begin{pmatrix}5&1\\1&5\end{pmatrix}$ なので、行列式は $\det X=3$、$\det Y=2\cdot4-1=7$、$\det(X+Y)=25-1=24$ です。 [四元ベクトルの行列収縮](#prop-lrep13-vector-pairing)の証明の差を使えば $-(24-3-7)/2=-7$ です。[二添字Weyl表示と四元ベクトル](../LREP12/index.md#prop-lrep12-bispinor-vector)で与えられた逆算を使うと $x=(2,0,0,1),y=(3,1,0,-1)$ なので $-6-1=-7$ です。
<!-- solution-end -->

<a id="ex-lrep13-a04"></a>

#### LREP13-A04 空間反転の行列
- Level: A
- ID: LREP13-A04

$X=\begin{pmatrix}4&1+i\\1-i&2\end{pmatrix}$ の空間反転後の行列と四元成分を求めよ。

<!-- solution-start -->
**詳細解答。** [二添字Weyl表示](../LREP12/index.md#prop-lrep12-bispinor-vector)の逆公式より $x^0=(4+2)/2=3$、$x^3=(4-2)/2=1$、$x^1=1$、$x^2=((1-i)-(1+i))/(2i)=-1$。従って $x=(3,1,-1,1)$。[空間反転](#def-lrep13-parity)により $Px=(3,-1,1,-1)$ です。行列へ戻せば

$$
\mathcal P(X)=\begin{pmatrix}2&-1-i\\-1+i&4\end{pmatrix}
=\operatorname{adj}X.
$$

行列式は変換前後とも $8-2=6$ です。
<!-- solution-end -->

### Level B

<a id="ex-lrep13-b01"></a>

#### LREP13-B01 行列式1の仮定
- Level: B
- ID: LREP13-B01

任意の二次正方複素行列 $A$ によって両列を変換すると、$B_L$ は何倍されるか。$A=\operatorname{diag}(2,3)$ と $u=(1,0)^{\mathsf T},v=(0,1)^{\mathsf T}$ で確認し、失った仮定を説明せよ。

<!-- solution-start -->
**詳細解答。** [二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)から

$$
(Au)^{\mathsf T}J(Av)
=u^{\mathsf T}(A^{\mathsf T}JA)v
=(\det A)u^{\mathsf T}Jv.
$$

この例では $B_L(u,v)=1$、$Au=(2,0)^{\mathsf T},Av=(0,3)^{\mathsf T}$ だから $B_L(Au,Av)=6$。行列は可逆ですが $\det A=6$ であり、行列式1の条件を失ったため交代形式の行列が $J$ でなく $6J$ になります。
<!-- solution-end -->

<a id="ex-lrep13-b02"></a>

#### LREP13-B02 混合複素双線形形式の不在
- Level: B
- ID: LREP13-B02

$u\in L,r\in R$ に対する複素双線形形式 $u^{\mathsf T}Mr$ がすべての $S\in G$ に不変なら $M=0$ であることを示せ。$D=\operatorname{diag}(2,1/2)$ と $U=\operatorname{diag}(i,-i)$ を使え。

<!-- solution-start -->
**詳細解答。** [左右Weylスピノル](../LREP12/index.md#def-lrep12-weyl)から不変性は $S^{\mathsf T}MQ(S)=M$ と同値です。$Q(D)=D^{-1}$、$M=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とおくと

$$
D^{\mathsf T}MD^{-1}=\begin{pmatrix}a&4b\\c/4&d\end{pmatrix}.
$$

従って $b=c=0$。さらに $Q(U)=U$ なので

$$
U^{\mathsf T}\operatorname{diag}(a,d)U
=\operatorname{diag}(-a,-d).
$$

一致するには $a=d=0$。従って零形式のみです。第一引数が共役線形の $r^\dagger u$ にはこの条件を適用できません。
<!-- solution-end -->

<a id="ex-lrep13-b03"></a>

#### LREP13-B03 反転と複素せん断
- Level: B
- ID: LREP13-B03

$S=\begin{pmatrix}1&i\\0&1\end{pmatrix}$、$X=I$ とする。$\mathcal P(S\mathcal P(X)S^\dagger)$ と $Q(S)XQ(S)^\dagger$ を別々に計算せよ。

<!-- solution-start -->
**詳細解答。** [空間反転による左右交換](#prop-lrep13-parity-exchange)を具体的に検算します。$\mathcal P(I)=I$ なので

$$
SS^\dagger=\begin{pmatrix}2&i\\-i&1\end{pmatrix},
\qquad \operatorname{adj}(SS^\dagger)
=\begin{pmatrix}1&-i\\i&2\end{pmatrix}.
$$

一方

$$
Q(S)=\begin{pmatrix}1&0\\i&1\end{pmatrix},
\qquad Q(S)Q(S)^\dagger
=\begin{pmatrix}1&-i\\i&2\end{pmatrix}.
$$

二つは一致します。
<!-- solution-end -->

<a id="ex-lrep13-b04"></a>

#### LREP13-B04 スカラーと反転
- Level: B
- ID: LREP13-B04

$(u,r)$ と $(v,s)$ に対して $C_\pm=B_L(u,v)\pm B_R(r,s)$ を定める。被覆群の作用および直和上の $\Pi(u,r)=(r,u)$ による変換を求めよ。

<!-- solution-start -->
**詳細解答。** [Weyl収縮の保存](#prop-lrep13-scalar)により両収縮が別々に保存されるので $C_\pm$ は被覆群の作用で不変です。[空間反転による左右交換](#prop-lrep13-parity-exchange)では

$$
C_\pm'=B_L(r,s)\pm B_R(u,v).
$$

ここで $B_L(r,s)$ は右列の成分を左空間の標準基底で読み直した値、$B_R(u,v)$ はその逆の読み直しです。両側の成分公式は同じ $J$ なので $C_+'=C_+$、$C_-'=-C_-$ となります。空間反転を含めると、和は不変、差は符号を変えます。この性質は選んだ直和上の反転作用に対するものです。
<!-- solution-end -->

### Level C

<a id="ex-lrep13-c01"></a>

#### LREP13-C01 光的ベクトルの二階テンソルとboost
- Level: C
- ID: LREP13-C01

$u=(\sqrt2,0)^{\mathsf T}$、$v=(1,1)^{\mathsf T}$、$D=\operatorname{diag}(2,1/2)$ とする。$X=uu^\dagger,Y=vv^\dagger$ の四元成分、$\eta(x,y)$、$F^{\mu\nu}=x^\mu y^\nu-x^\nu y^\mu$ の独立な非零成分を求めよ。次に両列を $D$ で変換し、内積と完全収縮の保存を確かめよ。

<!-- solution-start -->
**詳細解答。** [二添字Weyl表示](../LREP12/index.md#prop-lrep12-bispinor-vector)により

$$
X=\begin{pmatrix}2&0\\0&0\end{pmatrix},
\quad Y=\begin{pmatrix}1&1\\1&1\end{pmatrix}
$$

だから $x=(1,0,0,1),y=(1,1,0,0)$。内積は $-1$。反対称性から $\mu<\nu$ の成分のみ計算すると $F^{01}=1,F^{03}=-1,F^{13}=-1$、残りは0です。添字を下げる際に $\eta$ の対角成分を各添字に掛けるので、$F_{01}=-F^{01}$、$F_{03}=-F^{03}$、$F_{13}=F^{13}$ です。完全収縮では反対称な二成分の積が等しく、各独立成分が二回現れるため

$$
F^{\mu\nu}F_{\mu\nu}=2(-1-1+1)=-2.
$$

変換後の列は $(2\sqrt2,0)^{\mathsf T},(2,1/2)^{\mathsf T}$。従って

$$
X'=\begin{pmatrix}8&0\\0&0\end{pmatrix},
\quad Y'=\begin{pmatrix}4&1\\1&1/4\end{pmatrix}.
$$

[四元成分の逆公式](../LREP12/index.md#prop-lrep12-bispinor-vector)により $x'=(4,0,0,4)$。$Y'$ の対角成分の半和は $(4+1/4)/2=17/8$、半差は $(4-1/4)/2=15/8$ で、非対角成分はともに1なので $y'=(17/8,1,0,15/8)$。内積は $-68/8+60/8=-1$ です。独立非零成分は

$$
\begin{aligned}
(F')^{01}&=4,\\
(F')^{03}&=4(15/8)-4(17/8)=-1,\\
(F')^{13}&=-4.
\end{aligned}
$$

従って完全収縮は $2(-16-1+16)=-2$ で保存されます。[Weyl列からの二階テンソル](#prop-lrep13-tensor)の公式でも $-2\eta(x',y')^2=-2$。さらに [四元ベクトルの行列収縮](#prop-lrep13-vector-pairing)から $\operatorname{adj}X'=\operatorname{diag}(0,8)$ で、$(\operatorname{adj}X')Y'$ の跡は $8/4=2$。内積は $-1$ と独立に確認できます。
<!-- solution-end -->

## 6. まとめと次講

行列式1の条件によって交代収縮が保存されます。左右の混合収縮には複素共役が必要であり、四元ベクトルや二階テンソルを作ると残った添字がLorentz変換を受けます。空間反転は左右Weyl表現を交換するため、複素線形な作用を実現するには両方を備えた空間が自然です。

次講LREP14「Clifford代数の構成」では、時空計量そのものを代数の積に組み込みます。
