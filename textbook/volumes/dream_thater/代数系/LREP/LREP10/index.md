# LREP10 SL(2,C)によるLorentz群の被覆

<!-- definition-example-audit: strict -->

[LREP9のLorentz Lie環](../LREP9/index.md#thm-lrep9-lie-algebra)は、回転三方向とboost三方向を一つの実六次元Lie環として捉えました。しかし交換関係だけでは、**有限のLorentz変換を二成分の複素ベクトルでどう表すか**、またその表示がLorentz群のどこまで届くかは分かりません。

[LREP5のPauli行列模型](../LREP5/index.md#def-lrep5-pauli-model)は空間の三座標を跡零のエルミート行列に収め、[SU(2)による回転の二重被覆](../LREP5/index.md#thm-lrep5-double-cover)を構成しました。本講ではその行列に時間成分を加えます。行列式がMinkowski計量を表すため、行列への共役作用からLorentz変換を構成できます。

全章で実四元ベクトルを列ベクトルとして扱い、次の座標と計量を用います。

$$
x=(x^0,x^1,x^2,x^3)^{\mathsf T}=(ct,x,y,z)^{\mathsf T},
\qquad \eta=\operatorname{diag}(-1,1,1,1).
$$

$\dagger$ は複素共役転置、$I_n$ は単位行列を表します。変換は列ベクトルへの**能動作用**です。

Pauli行列は[既出の定義](../LREP5/index.md#def-lrep5-pauli-model)に従い、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)を用います。具体的には

$$
\sigma_i^\dagger=\sigma_i,\quad
\operatorname{tr}\sigma_i=0,\quad
\sigma_i\sigma_j=\delta_{ij}I_2+i\sum_k\varepsilon_{ijk}\sigma_k.
$$

## 1. 四元ベクトルをエルミート行列へ移す

実数4個を複素 $2\times2$ 行列で扱うには、対角成分が実数、非対角成分が互いに複素共役である **エルミート行列** を使います。これは $X^\dagger=X$ を満たす行列で、実次元は4です。空間三座標に係数 $x^0$ の単位行列を足すと、4座標を余さず表せます。

<a id="def-lrep10-hermitian-model"></a>

<!-- formal-statement-start -->
> **定義（四元ベクトルのエルミート行列模型）**  
> $x=(x^0,x^1,x^2,x^3)\in\mathbb R^{1,3}$ に対し、実線形写像 $H:\mathbb R^{1,3}\to\operatorname{Herm}_2(\mathbb C)$ を

$$
H(x)=x^0I_2+x^1\sigma_1+x^2\sigma_2+x^3\sigma_3
=\begin{pmatrix}
x^0+x^3&x^1-ix^2\\
x^1+ix^2&x^0-x^3
\end{pmatrix}
$$

> で定める。ここで $\operatorname{Herm}_2(\mathbb C)$ は共役転置で不変な $2\times2$ 複素行列の**実**ベクトル空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep10-hermitian-model -->
**定義の確認**。 $x=(2,1,0,0)$ を代入すると

$$
H(x)=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad H(x)^\dagger=H(x),\qquad\det H(x)=3.
$$

逆に任意のエルミート行列は実数 $a,b\in\mathbb R$、複素数 $z\in\mathbb C$ を用いて
$\begin{pmatrix}a&z\\\overline z&b\end{pmatrix}$ と一意に書けます。その行列に対応する実座標は

$$
x^0=\frac{a+b}{2},\quad x^3=\frac{a-b}{2},\quad
x^1=\operatorname{Re}z,\quad x^2=-\operatorname{Im}z.
$$

これでエルミート性だけでなく、$H$ が実線形の全単射であることも確かめました。
<!-- definition-example-end -->

空間成分 $\boldsymbol x=(x^1,x^2,x^3)$ に対する行列 $S=\sum_i x^i\sigma_i$ には、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)を適用できます。その交差項は反対称性によって相殺され、

$$
S^2=|\boldsymbol x|^2 I_2
$$

となります。したがって $S$ の固有値は $\pm|\boldsymbol x|$、$H(x)$ の固有値は $x^0\pm|\boldsymbol x|$ です。これが行列の符号と因果円錐の橋になります。

<a id="thm-lrep10-determinant-cone"></a>

<!-- formal-statement-start -->
> **定理（行列式とMinkowski計量・未来円錐）**  
> $x\in\mathbb R^{1,3}$、$\eta=\operatorname{diag}(-1,1,1,1)$ とすると、

$$
\det H(x)=(x^0)^2-\sum_{i=1}^3(x^i)^2=-x^{\mathsf T}\eta x.
$$

> また $H(x)$ が正半定値（任意の $\xi\in\mathbb C^2$ で $\xi^\dagger H(x)\xi\ge0$）であることと、$x^0\ge|\boldsymbol x|$ は同値である。非零の未来向き光的ベクトル、すなわち $x^0=|\boldsymbol x|>0$ では $H(x)$ は階数1である。
<!-- formal-statement-end -->

**証明の見取り図。** 行列式を成分で展開し、正半定値性は上で求めた二つの実固有値がともに非負という条件に直します。

<!-- proof-start -->
### 証明

[模型の定義](#def-lrep10-hermitian-model)から

$$
\begin{aligned}
\det H(x)&=(x^0+x^3)(x^0-x^3)
 -(x^1-ix^2)(x^1+ix^2)\\
&=(x^0)^2-(x^3)^2-(x^1)^2-(x^2)^2
=-x^{\mathsf T}\eta x.
\end{aligned}
$$

エルミート行列の固有値は $x^0+|\boldsymbol x|$ と $x^0-|\boldsymbol x|$ です。正半定値性は両者が非負であることと同値で、弱い方の条件 $x^0-|\boldsymbol x|\ge0$ に集約されます。$x^0=|\boldsymbol x|>0$ なら固有値は $2x^0>0$ と $0$ なので階数1です。$\square$
<!-- proof-end -->

この結果で、時間成分の符号という幾何学的条件が、行列への正半定値条件に置き換わりました。$x^0<0$ の過去向き光的ベクトルでは $H(x)$ は負半定値になる点も区別してください。

## 2. 複素2次行列でLorentz変換を作る

空間回転の $UXU^\dagger$ では $U^\dagger=U^{-1}$ が成り立ちました。時間と空間を混ぜるにはユニタリ性を外しても、$AXA^\dagger$ の形ならエルミート性が保たれます。さらに行列式を厳密に保つため、$\det A=1$ を課します。

<a id="def-lrep10-sl2c-action"></a>

<!-- formal-statement-start -->
> **定義（SL(2,C)の四元ベクトル作用）**  
> 行列群と四元ベクトルへの写像を

$$
SL(2,\mathbb C)=\{A\in M_2(\mathbb C):\det A=1\},
\qquad
H\bigl(\Phi(A)x\bigr)=A\,H(x)\,A^\dagger
$$

> で定める。$\Phi(A):\mathbb R^{1,3}\to\mathbb R^{1,3}$ は[エルミート行列模型](#def-lrep10-hermitian-model)の逆写像によって一意に定まる実線形変換である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep10-sl2c-action -->
**定義の確認**：正の $z$ 方向のboost。 実数 $\chi$ に対し

$$
A_\chi=\begin{pmatrix}e^{\chi/2}&0\\0&e^{-\chi/2}\end{pmatrix}
=\cosh(\chi/2)I_2+\sinh(\chi/2)\sigma_3
$$

と置けば $\det A_\chi=1$ です。時間単位ベクトル $e_0=(1,0,0,0)^{\mathsf T}$ は $H(e_0)=I_2$ に対応するので

$$
A_\chi I_2A_\chi^\dagger
=A_\chi^2
=\begin{pmatrix}e^\chi&0\\0&e^{-\chi}\end{pmatrix}
=\cosh\chi\,I_2+\sinh\chi\,\sigma_3.
$$

よって $\Phi(A_\chi)e_0=(\cosh\chi,0,0,\sinh\chi)^{\mathsf T}$。$\chi>0$ なら未来向きに正の $z$ 方向へ動かす能動boostです。一般の $x$ では

$$
\Phi(A_\chi):
\begin{pmatrix}x^0\\x^1\\x^2\\x^3\end{pmatrix}
\longmapsto
\begin{pmatrix}
\cosh\chi\,x^0+\sinh\chi\,x^3\\
x^1\\x^2\\
\sinh\chi\,x^0+\cosh\chi\,x^3
\end{pmatrix}.
$$

非対角成分 $x^1\mp ix^2$ は左右の対角係数が積1なので不変です。[LREP9のboost指数](../LREP9/index.md#def-lrep9-rotation-boost)と同じ符号になっています。
<!-- definition-example-end -->

$\det A=1$ は複素方程式1個、すなわち局所的には実2条件です。複素行列の実8成分から2条件を引き、$SL(2,\mathbb C)$ は**実6次元**です。その接空間は複素跡零行列を実ベクトル空間として見た

$$
\mathfrak{sl}_2(\mathbb C)_{\mathbb R}
=\{B\in M_2(\mathbb C):\operatorname{tr}B=0\}
$$

です。これを[LREP9の複素化した二因子](../LREP9/index.md#thm-lrep9-two-sl2)と混同してはいけません。

まず変換が同じ連結成分に入ることを証明するため、群そのものの連結性を確認します。ここで使う **極分解** は可逆複素行列を正定値エルミート行列とユニタリ行列の積に分ける操作です。

<a id="lem-lrep10-polar-connectivity"></a>

<!-- formal-statement-start -->
> **補題（SL(2,C)の極分解と道連結性）**  
> 任意の $A\in SL(2,\mathbb C)$ は一意に $A=PU$ と書ける。ただし $P$ は正定値エルミート、$U\in SU(2)$ で、$\det P=1$ である。さらに跡零エルミート行列 $T$ で $P=e^T$ と書け、$SL(2,\mathbb C)$ は単位元から各元への連続な道を持つ。
<!-- formal-statement-end -->

**証明の見取り図。** $AA^\dagger$ の正の固有値を平方根に取り、残りがユニタリであることを示します。正定値因子は対数によって縮め、回転因子は[SU(2)の軸角表示](../LREP5/index.md#prop-lrep5-rodrigues)で単位元につなぎます。

<!-- proof-start -->
### 証明

$A$ は可逆なので $AA^\dagger$ は正定値エルミートです。固有値 $\lambda_1,\lambda_2>0$ と正規直交固有基底を取って、それぞれを $\sqrt{\lambda_i}$ に置き換えた正定値行列を $P=(AA^\dagger)^{1/2}$ と定めます。この正の平方根は一意です。$U=P^{-1}A$ と置くと

$$
UU^\dagger=P^{-1}AA^\dagger P^{-1}
=P^{-1}P^2P^{-1}=I_2.
$$

したがって $U$ はユニタリ。行列式から $\det P=\sqrt{\det(AA^\dagger)}=|\det A|=1$ なので、$\det U=1$ です。$P$ と $U$ の一意性は $P^2=AA^\dagger$ と正の平方根の一意性から従います。

$P$ の正の固有値を $\mu_1,\mu_2$ とすると $\mu_1\mu_2=1$。同じ固有基底で固有値 $\log\mu_1,\log\mu_2$ を持つエルミート行列 $T$ を作ると

$$
e^T=P,\qquad \operatorname{tr}T=\log(\mu_1\mu_2)=0.
$$

[LREP5の軸角表示](../LREP5/index.md#prop-lrep5-rodrigues)から $U$ を単位元につなぐ $U(t)\in SU(2)$、$U(0)=I_2$、$U(1)=U$ が取れます。そこで

$$
A(t)=e^{tT}U(t)\quad(0\le t\le1)
$$

と置きます。$e^{tT}$ は正定値で $\det e^{tT}=e^{t\operatorname{tr}T}=1$、$U(t)$ も行列式1なので、$A(t)\in SL(2,\mathbb C)$。端点は $A(0)=I_2$、$A(1)=A$ です。$\square$
<!-- proof-end -->

<a id="thm-lrep10-lorentz-action"></a>

<!-- formal-statement-start -->
> **定理（合同作用によるLorentz群準同型）**  
> [上の定義](#def-lrep10-sl2c-action)で得た写像 $\Phi$ は滑らかな群準同型

$$
\Phi:SL(2,\mathbb C)\longrightarrow SO^+(1,3)
$$

> である。各 $A$ の作用は $\eta$ を保存し、未来向きの非零因果的ベクトルを未来向きの非零因果的ベクトルへ移す。
<!-- formal-statement-end -->

**証明の見取り図。** 行列積は作用の合成に対応し、行列式は計量を保存します。正半定値行列が合同変換で正半定値のままであることが未来円錐の保存を保証し、[極分解の道連結性](#lem-lrep10-polar-connectivity)が単位元成分への所属を保証します。

<!-- proof-start -->
### 証明

$A,B\in SL(2,\mathbb C)$、$x\in\mathbb R^{1,3}$ に対して

$$
\begin{aligned}
H(\Phi(AB)x)
&=ABH(x)B^\dagger A^\dagger\\
&=A H(\Phi(B)x)A^\dagger
=H(\Phi(A)\Phi(B)x).
\end{aligned}
$$

[模型の全単射性](#def-lrep10-hermitian-model)より $\Phi(AB)=\Phi(A)\Phi(B)$、$\Phi(I_2)=I_4$ です。$A$ と $A^\dagger$ による作用は実線形で、逆は $A^{-1}$ による作用です。

また $\det A=1$ なので

$$
\det(AH(x)A^\dagger)
=\det A\det H(x)\overline{\det A}
=\det H(x).
$$

[行列式と計量の同一性](#thm-lrep10-determinant-cone)から $g(\Phi(A)x,\Phi(A)x)=g(x,x)$。これを $x+y$ に適用して二乗の差を取れば $g(\Phi(A)x,\Phi(A)y)=g(x,y)$ となり、$\Phi(A)\in O(1,3)$ です。

未来向き因果的な $x$ では $H(x)$ は正半定値であり、任意の $v\in\mathbb C^2$ に対し

$$
v^\dagger(AH(x)A^\dagger)v
=(A^\dagger v)^\dagger H(x)(A^\dagger v)\ge0.
$$

$A$ は可逆なので非零の $x$ が零になることもありません。[未来円錐の判定](#thm-lrep10-determinant-cone)から未来向き因果的ベクトルを未来向き因果的ベクトルへ移します。

最後に[道連結性](#lem-lrep10-polar-connectivity)より単位元から $A$ への道があります。その $\Phi$ 像は $I_4$ と $\Phi(A)$ を結ぶ $O(1,3)$ 内の道です。[Lorentz群と単位元成分](../LREP9/index.md#def-lrep9-lorentz-group)により、

$$
\Phi(A)\in SO^+(1,3).
$$

作用の係数は $A$ の実部・虚部の多項式なので滑らかです。$\square$
<!-- proof-end -->

## 3. なぜ二つの複素行列が同じ変換になるか

回転の被覆でも $U$ と $-U$ は同じ空間回転を作りました。今度は時間を含むすべてのエルミート行列に同じ作用をする $A$ を探します。**核**とは、$\Phi(A)=I_4$ となる群元の集合です。

<a id="prop-lrep10-kernel"></a>

<!-- formal-statement-start -->
> **命題（被覆写像の核）**  
> $\Phi:SL(2,\mathbb C)\to SO^+(1,3)$ を[合同作用](#def-lrep10-sl2c-action)で定める。このとき

$$
\ker\Phi=\{I_2,-I_2\}.
$$

<!-- formal-statement-end -->

**証明の見取り図。** まず $H(e_0)=I_2$ への作用からユニタリ性を得ます。次に $\sigma_3$ と $\sigma_1$ の両方と可換でなければならないことからスカラー行列へ絞り、行列式条件で二つに限ります。

<!-- proof-start -->
### 証明

$\Phi(A)=I_4$ とすると、任意のエルミート行列 $X=H(x)$ について $AXA^\dagger=X$ です。$X=I_2$ と置けば $AA^\dagger=I_2$、従って $A^\dagger=A^{-1}$。これを $AXA^\dagger=X$ に代入し右から $A$ を掛けると $AX=XA$ です。

特に $A$ は $\sigma_3=\operatorname{diag}(1,-1)$ と可換なので、対角外の成分は零になり $A=\operatorname{diag}(a,d)$ です。さらに $\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ と可換なら

$$
A\sigma_1=\begin{pmatrix}0&a\\d&0\end{pmatrix},
\quad
\sigma_1A=\begin{pmatrix}0&d\\a&0\end{pmatrix}
$$

なので $a=d$。よって $A=aI_2$、$\det A=a^2=1$ より $a=\pm1$ です。逆に $A=\pm I_2$ なら $AXA^\dagger=X$ が全 $X$ について成立します。$\square$
<!-- proof-end -->

$A$ と $-A$ が同じLorentz変換になるのは $\Phi(-A)=\Phi(-I_2)\Phi(A)=\Phi(A)$ から分かります。逆に同じ変換を作る $A,B$ は $A^{-1}B\in\ker\Phi$ なので $B=\pm A$。各変換の持ち上げは**高々2個**です。

## 4. 単位元成分のすべてに届くか

計量を保つ写像を作っただけでは、群全体への全射性は分かりません。任意の $\Lambda\in SO^+(1,3)$ に対し、まず時間軸 $e_0$ の像を合わせるboostを作り、残る空間回転を[LREP5の被覆定理](../LREP5/index.md#thm-lrep5-double-cover)で持ち上げます。

<a id="thm-lrep10-surjectivity"></a>

<!-- formal-statement-start -->
> **定理（SL(2,C)のLorentz作用の全射性）**  
> $\Phi:SL(2,\mathbb C)\to SO^+(1,3)$ を[合同作用](#def-lrep10-sl2c-action)で定めると、任意の $\Lambda\in SO^+(1,3)$ に対して $\Phi(A)=\Lambda$ を満たす $A\in SL(2,\mathbb C)$ が存在する。従って $\Phi$ は全射である。
<!-- formal-statement-end -->

**証明の見取り図。** $u=\Lambda e_0$ は未来向きの単位時間的ベクトルです。[行列式の定理](#thm-lrep10-determinant-cone)から $H(u)$ は正定値かつ行列式1。正の平方根 $B$ なら $\Phi(B)e_0=u$ です。これで時間軸を一致させた後の変換は $e_0$ を固定する空間回転となります。

<!-- proof-start -->
### 証明

$\Lambda$ は$\eta$を保ち単位元成分にあるため、$u=\Lambda e_0$ は

$$
-u_0^2+u_1^2+u_2^2+u_3^2=-1,\qquad u_0>0
$$

を満たします（ここで $u_\mu$ の下付きは座標ラベルであり、計量による添字下げではありません）。ゆえに $u_0=\sqrt{1+|\boldsymbol u|^2}\ge1$。$Q=H(u)$ の固有値は $u_0\pm|\boldsymbol u|>0$ で、$\det Q=1$ です。

正の平方根 $B=Q^{1/2}$ を取り、$\det B=1$、$B^\dagger=B$ を得ます。具体的にも $Q$ の跡は $2u_0$、行列式は1なので、二次行列のCayley–Hamilton恒等式から

$$
Q^2-2u_0Q+I_2=0,\qquad
(Q+I_2)^2=2(1+u_0)Q.
$$

従って

$$
B=\frac{Q+I_2}{\sqrt{2(1+u_0)}}
$$

は正定値エルミートで $B^2=Q$ です。分子の固有値は正で分母も正だから正の平方根に一致します。ゆえに

$$
H(\Phi(B)e_0)=BI_2B^\dagger=B^2=Q=H(u)
$$

であり $\Phi(B)e_0=u$。

次に $C=\Phi(B)^{-1}\Lambda\in SO^+(1,3)$ と置くと $Ce_0=e_0$ です。計量保存より任意の空間ベクトル $(0,\boldsymbol v)$ について

$$
g(e_0,C(0,\boldsymbol v))
=g(Ce_0,C(0,\boldsymbol v))
=g(e_0,(0,\boldsymbol v))=0.
$$

従って $C(0,\boldsymbol v)$ の時間成分は零。よって $C=\operatorname{diag}(1,R)$ で、残る $3\times3$ 行列は直交かつ $\det R=\det C=1$、すなわち $R\in SO(3)$ です。

[LREP5の核・全射の定理](../LREP5/index.md#thm-lrep5-kernel-surjectivity)を $R$ に適用すると、$U\in SU(2)$ が存在して $U(\boldsymbol x\cdot\boldsymbol\sigma)U^\dagger=(R\boldsymbol x)\cdot\boldsymbol\sigma$。$UI_2U^\dagger=I_2$ も成り立つので、時間成分を加えた[本章の模型](#def-lrep10-hermitian-model)では $\Phi(U)=\operatorname{diag}(1,R)=C$ です。従って

$$
\Phi(BU)=\Phi(B)\Phi(U)=\Phi(B)C=\Lambda.
$$

$BU\in SL(2,\mathbb C)$ は行列式1なので、この元が求める持ち上げです。$\square$
<!-- proof-end -->

全射性は「Lie環が同型だから全域に届く」と宣言したのではなく、**時間軸を移す $B$ と、時間軸を固定する $U$** を実際に構成して示しました。

## 5. 二重被覆としての局所構造

各 $\Lambda$ に持ち上げが二つあることと、位相的な意味で二重被覆であることは別の主張です。局所的に逆写像が取れることを確かめるため、行列群の単位元で微分します。

<a id="thm-lrep10-double-cover"></a>

<!-- formal-statement-start -->
> **定理（SL(2,C)からSO^+(1,3)への二重被覆）**  
> 実6次元Lie群 $SL(2,\mathbb C)$ と $SO^+(1,3)$ について、[合同作用](#def-lrep10-sl2c-action)は滑らかな全射Lie群準同型であり、各点の十分小さい近傍では二枚の局所逆枝を持つ。すなわち二重被覆写像で、群として

$$
SL(2,\mathbb C)/\{\pm I_2\}\cong SO^+(1,3).
$$

> 微分 $d\Phi_{I_2}$ は実Lie環同型 $\mathfrak{sl}_2(\mathbb C)_{\mathbb R}\cong\mathfrak{so}(1,3)$ を与える。この実Lie環同型は、[LREP9の複素化二因子](../LREP9/index.md#thm-lrep9-two-sl2)とは異なる。
<!-- formal-statement-end -->

**証明の見取り図。** [全射性](#thm-lrep10-surjectivity)と[二元核](#prop-lrep10-kernel)は既に得ました。微分の核が零で両側が実6次元なら微分は同型です。逆関数定理で単位元付近の局所逆を作り、二元核の平行移動で二枚のシートを得ます。

<!-- proof-start -->
### 証明

$\det(I_2+tB)=1+t\operatorname{tr}B+O(t^2)$ より、単位元での接ベクトルは跡零複素行列 $B$ です（実パラメータ $t$）。任意の実四元ベクトル $x$ について

$$
\begin{aligned}
H\bigl(d\Phi_{I_2}(B)x\bigr)
&=\left.\frac{d}{dt}\right|_{t=0}
\bigl((I_2+tB)H(x)(I_2+tB^\dagger)\bigr)\\
&=BH(x)+H(x)B^\dagger.
\end{aligned}
$$

ここで実際の群曲線は $e^{tB}\in SL(2,\mathbb C)$ であり、同じ一次項 $I_2+tB+O(t^2)$ を持つので上の微分式が正当化されます。

$d\Phi_{I_2}(B)=0$ と仮定します。$H(e_0)=I_2$ に代入すると $B+B^\dagger=0$。この式を $H(e_i)=\sigma_i$ への代入に戻せば

$$
B\sigma_i+\sigma_iB^\dagger=B\sigma_i-\sigma_iB=[B,\sigma_i]=0
\quad(i=1,2,3).
$$

[核の計算](#prop-lrep10-kernel)と同じ対角化の議論で、$\sigma_3$ と $\sigma_1$ の両方と可換な $B$ はスカラー行列 $bI_2$ です。$\operatorname{tr}B=2b=0$ だから $B=0$。よって微分は単射です。

$\mathfrak{sl}_2(\mathbb C)_{\mathbb R}$ の実次元は $2(4-1)=6$、[Lorentz Lie環の六次元性](../LREP9/index.md#thm-lrep9-lie-algebra)から標的も実6次元です。従って微分は実線形同型となり、Lie群準同型の微分なのでLie括弧も保ちます。

有限次元多様体の逆関数定理により、単位元付近に $\Phi$ が微分同相である開近傍 $V$ が取れます。$I_2$ と $-I_2$ は異なるので $V$ を小さくして $V\cap(-V)=\varnothing$ とできます。さらに像を小さく取り直し、$W=\Phi(V)$ の逆像について、任意の $g\in\Phi^{-1}(W)$ は一意な $v\in V$ と同じ像を持つため、[二元核](#prop-lrep10-kernel)により $g=v$ または $g=-v$。従って

$$
\Phi^{-1}(W)=V\sqcup(-V),
$$

かつ双方から $W$ への制限は微分同相です。任意の標的 $\Lambda$ には[全射性](#thm-lrep10-surjectivity)で持ち上げ $A$ があり、左右の群平行移動によって $W$ の局所二枚構造を $\Lambda$ 付近へ運べます。よって二重被覆です。最後の商群同型は、全射かつ核が $\{\pm I_2\}$ であることによる群の準同型定理から従います。$\square$
<!-- proof-end -->

**どこまで被覆するか。** $SO^+(1,3)$ は空間の向きを保ち、未来円錐も保つ成分です。空間反転 $\operatorname{diag}(1,-1,-1,-1)$ は行列式が $-1$ なのでその外にあり、上の $SL(2,\mathbb C)$ 作用では得られません。空間反転や時間反転を加えた全 $O(1,3)$ の被覆だと読み替えてはいけません。

## 6. 光円錐上では二成分ベクトルが現れる

未来向きの光的ベクトルの行列は正半定値かつ階数1でした。階数1のエルミート行列は、二成分の複素列ベクトルとその共役転置の積で表せます。この事実が次講以降の二成分スピノルと四元ベクトルを結ぶ入口です。

<a id="prop-lrep10-null-factorization"></a>

<!-- formal-statement-start -->
> **命題（未来光的ベクトルの階数1分解）**  
> $x\ne0$ が $x^0=|\boldsymbol x|>0$ を満たすことと、ある非零 $\xi\in\mathbb C^2$ により

$$
H(x)=\xi\xi^\dagger
$$

> と書けることは同値である。$\xi$ は絶対値1の複素数倍を除いて一意であり、$A\in SL(2,\mathbb C)$ の作用では $\xi$ を $A\xi$ へ移せばよい。
<!-- formal-statement-end -->

**証明の見取り図。** [未来円錐の固有値判定](#thm-lrep10-determinant-cone)で階数1・正半定値を得て、正の固有値と単位固有ベクトルに分解します。合同作用はその積をそのまま移します。

<!-- proof-start -->
### 証明

未来向きの非零光的 $x$ では、$H(x)$ の固有値は $2x^0>0$ と0です。正規化された固有ベクトルを $v$ とすると、スペクトル分解から

$$
H(x)=(2x^0)vv^\dagger,\qquad
\xi=\sqrt{2x^0}\,v
$$

で所望の表示になります。逆に $\xi\ne0$ なら $\xi\xi^\dagger$ は正半定値で階数1、跡 $\xi^\dagger\xi>0$、行列式0です。[行列式とMinkowski計量・未来円錐](#thm-lrep10-determinant-cone)より対応する $x$ は未来向き非零光的です。

$\xi\xi^\dagger=\zeta\zeta^\dagger$ なら、両辺の像は同じ一次元複素部分空間なので $\zeta=c\xi$。積の等式から $|c|^2=1$。最後に

$$
A(\xi\xi^\dagger)A^\dagger=(A\xi)(A\xi)^\dagger
$$

が成立します。$\square$
<!-- proof-end -->

例えば $\xi=(1,0)^{\mathsf T}$ なら $\xi\xi^\dagger=\operatorname{diag}(1,0)=H(\frac12,0,0,\frac12)$。$-I_2$ は $\xi$ の符号を変えますが、対応する四元ベクトルは変えません。二成分ベクトルの符号と時空変換の核の違いが、ここに直接現れます。

## 7. 演習

### Level A

<a id="ex-lrep10-a01"></a>
#### LREP10-A01 行列式で時間的ベクトルを判定する
- Level: A

$x=(3,1,2,0)$ を[エルミート行列模型](#def-lrep10-hermitian-model)へ移し、行列式を求めよ。$x$ が未来向き時間的かどうかを、二つの固有値の符号から判定せよ。

<!-- solution-start -->
**詳細解答。** 定義へ $x^0=3,x^1=1,x^2=2,x^3=0$ を代入します。

$$
H(x)=\begin{pmatrix}3&1-2i\\1+2i&3\end{pmatrix},
\qquad \det H(x)=9-(1-2i)(1+2i)=9-5=4.
$$

[Pauli積公式](../LREP5/index.md#lem-lrep5-pauli-product)によって $S=\sigma_1+2\sigma_2$ は $S^2=5I_2$、跡零なので固有値は $\pm\sqrt5$。よって $H(x)=3I_2+S$ の固有値は $3\pm\sqrt5>0$ です。[未来円錐判定](#thm-lrep10-determinant-cone)から未来向き時間的で、計量は $g(x,x)=-\det H(x)=-4$ です。
<!-- solution-end -->

<a id="ex-lrep10-a02"></a>
#### LREP10-A02 対角行列からboostを導く
- Level: A

$s\in\mathbb R$ とし $A=\operatorname{diag}(e^{s/2},e^{-s/2})$ とする。$H(x)$ の四つの係数を比較し、$\Phi(A)$ の $4\times4$ 行列を求めよ。

<!-- solution-start -->
**詳細解答。** $H(x)$ の対角成分は $x^0\pm x^3$、非対角成分は $x^1\mp ix^2$ です。左から $A$、右から $A^\dagger=A$ を掛けると、対角はそれぞれ $e^s(x^0+x^3)$、$e^{-s}(x^0-x^3)$、非対角は元のままです。従って

$$
\begin{aligned}
x'^0&=\tfrac12\{e^s(x^0+x^3)+e^{-s}(x^0-x^3)\}
=\cosh s\,x^0+\sinh s\,x^3,\\
x'^3&=\tfrac12\{e^s(x^0+x^3)-e^{-s}(x^0-x^3)\}
=\sinh s\,x^0+\cosh s\,x^3,\\
x'^1&=x^1,\qquad x'^2=x^2.
\end{aligned}
$$

よって

$$
\Phi(A)=\begin{pmatrix}
\cosh s&0&0&\sinh s\\
0&1&0&0\\0&0&1&0\\
\sinh s&0&0&\cosh s
\end{pmatrix}.
$$

$g(x',x')=g(x,x)$ は $\cosh^2s-\sinh^2s=1$ からも検算できます。
<!-- solution-end -->

<a id="ex-lrep10-a03"></a>
#### LREP10-A03 SU(2)因子はどの向きに回すか
- Level: A

$U_\theta=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})\in SU(2)$ とする。$\Phi(U_\theta)$ を四元ベクトル上で求め、$x^0,x^3$ が変わらないことも示せ。

<!-- solution-start -->
**詳細解答。** ユニタリ性から $UI_2U^\dagger=I_2$、$\sigma_3$ も対角なので $U\sigma_3U^\dagger=\sigma_3$。したがって $x'^0=x^0,x'^3=x^3$。非対角成分は

$$
x'^1-ix'^2=e^{-i\theta}(x^1-ix^2)
=(x^1\cos\theta-x^2\sin\theta)
-i(x^1\sin\theta+x^2\cos\theta).
$$

実部・虚部を比較して

$$
x'^1=x^1\cos\theta-x^2\sin\theta,\qquad
x'^2=x^1\sin\theta+x^2\cos\theta.
$$

従って $xy$ 平面の角度 $\theta$ の能動回転です。$\theta=2\pi$ で $U_{2\pi}=-I_2$ ですが $\Phi(U_{2\pi})=I_4$ となり、[核の命題](#prop-lrep10-kernel)と整合します。
<!-- solution-end -->

<a id="ex-lrep10-a04"></a>
#### LREP10-A04 光的な二成分表示
- Level: A

$\xi=(1,i)^{\mathsf T}$ とする。$\xi\xi^\dagger$ に対応する $x$ を求め、未来向き光的であることを二通りに確かめよ。

<!-- solution-start -->
**詳細解答。** 共役転置は $\xi^\dagger=(1,-i)$ なので

$$
\xi\xi^\dagger=\begin{pmatrix}1&-i\\i&1\end{pmatrix}
=I_2+\sigma_2=H(1,0,1,0).
$$

従って $x=(1,0,1,0)$。計量から $g(x,x)=-1+1=0$ で $x^0=1>0$ です。また行列の跡は2、行列式は $1-(-i)i=0$ なので固有値は2と0、すなわち正半定値の階数1です。[未来円錐の判定](#thm-lrep10-determinant-cone)と二通りに整合します。
<!-- solution-end -->

### Level B

<a id="ex-lrep10-b01"></a>
#### LREP10-B01 少ない試験行列だけで核を決める
- Level: B

$A\in SL(2,\mathbb C)$ が $X=I_2,\sigma_3,\sigma_1$ の三つについて $AXA^\dagger=X$ を満たすとする。この三条件だけで $A=\pm I_2$ と示せ。$\sigma_2$ の条件を使わないこと。

<!-- solution-start -->
**詳細解答。** $X=I_2$ から $AA^\dagger=I_2$ なので $A^\dagger=A^{-1}$。他の二条件へ代入し右から $A$ を掛けると $A\sigma_3=\sigma_3A$、$A\sigma_1=\sigma_1A$ です。一般に $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とすれば

$$
A\sigma_3-\sigma_3A
=\begin{pmatrix}0&-2b\\2c&0\end{pmatrix}=0
$$

より $b=c=0$。さらに

$$
A\sigma_1-\sigma_1A
=\begin{pmatrix}0&a-d\\d-a&0\end{pmatrix}=0
$$

から $a=d$。$\det A=a^2=1$ より $A=\pm I_2$ です。逆に二つの行列は三条件すべてを満たすため、試験行列を三つに絞っても[核の命題](#prop-lrep10-kernel)を復元できます。
<!-- solution-end -->

<a id="ex-lrep10-b02"></a>
#### LREP10-B02 任意の速さへ時間軸を持ち上げる
- Level: B

$r\in\mathbb R$、$u=(\sqrt{1+r^2},r,0,0)$ とする。$Q=H(u)$ の正の平方根 $B$ を $I_2,\sigma_1$ の線形結合として求め、$B\in SL(2,\mathbb C)$ と $\Phi(B)e_0=u$ を示せ。

<!-- solution-start -->
**詳細解答。** $u_0=\sqrt{1+r^2}>0$ とおくと $Q=u_0I_2+r\sigma_1$、$\det Q=u_0^2-r^2=1$ です。[全射性の証明](#thm-lrep10-surjectivity)で導出した正の平方根公式をこの $Q$ に代入すると

$$
B=\frac{(u_0+1)I_2+r\sigma_1}{\sqrt{2(1+u_0)}}
=\alpha I_2+\beta\sigma_1,
\quad
\alpha=\sqrt{\frac{1+u_0}{2}},\quad
\beta=\frac{r}{\sqrt{2(1+u_0)}}.
$$

$\sigma_1^2=I_2$ なので

$$
\alpha^2+\beta^2
=\frac{(1+u_0)^2+r^2}{2(1+u_0)}=u_0,
\quad
2\alpha\beta=r,
\quad
\alpha^2-\beta^2=\frac{(1+u_0)^2-r^2}{2(1+u_0)}=1.
$$

最後の式は $r^2=u_0^2-1$ を代入したものです。従って $B^2=u_0I_2+r\sigma_1=Q$、$\det B=\alpha^2-\beta^2=1$。$B$ の固有値は $\alpha\pm\beta>0$（積1、和正）なので正の平方根です。$H(\Phi(B)e_0)=BI_2B^\dagger=B^2=H(u)$ より $\Phi(B)e_0=u$ です。
<!-- solution-end -->

<a id="ex-lrep10-b03"></a>
#### LREP10-B03 三角行列は光円錐をどう動かすか
- Level: B

$z\in\mathbb C$、$A=\begin{pmatrix}1&z\\0&1\end{pmatrix}$ とする。未来光的 $x=(1,0,0,-1)$ の像を求め、変換後にも未来光的であることを直接検算せよ。

<!-- solution-start -->
**詳細解答。** $\det A=1$ なので $A\in SL(2,\mathbb C)$。$H(x)=\operatorname{diag}(0,2)$ であり

$$
AH(x)A^\dagger
=\begin{pmatrix}1&z\\0&1\end{pmatrix}
\begin{pmatrix}0&0\\0&2\end{pmatrix}
\begin{pmatrix}1&0\\\overline z&1\end{pmatrix}
=\begin{pmatrix}2|z|^2&2z\\2\overline z&2\end{pmatrix}.
$$

[模型の逆変換](#def-lrep10-hermitian-model)から

$$
x'=(1+|z|^2,\ 2\operatorname{Re}z,\ -2\operatorname{Im}z,\ |z|^2-1).
$$

時間成分は $1+|z|^2>0$。$q=|z|^2$ と書けば空間ノルムの二乗は

$$
(2\operatorname{Re}z)^2+(-2\operatorname{Im}z)^2+(q-1)^2
=4q+(q-1)^2=(1+q)^2=(x'^0)^2.
$$

ゆえに $g(x',x')=0$、未来向きです。[合同作用の定理](#thm-lrep10-lorentz-action)の円錐保存を、ユニタリでない具体行列について検算できました。
<!-- solution-end -->

<a id="ex-lrep10-b04"></a>
#### LREP10-B04 微分でboostと回転を見分ける
- Level: B

$B=\sigma_3/2$ および $C=-i\sigma_3/2$ はともに跡零である。$H(d\Phi_{I_2}(B)x)=BH(x)+H(x)B^\dagger$ を使い、それぞれの四元ベクトルへの無限小作用を求めよ。

<!-- solution-start -->
**詳細解答。** $B^\dagger=B$ なので $BH+HB=\frac12\{\sigma_3,H\}$ です。[Pauli積公式](../LREP5/index.md#lem-lrep5-pauli-product)の反交換子 $\{\sigma_3,\sigma_3\}=2I_2$、$\{\sigma_3,\sigma_1\}=\{\sigma_3,\sigma_2\}=0$ から

$$
BH(x)+H(x)B
=x^0\sigma_3+x^3I_2
=H(x^3,0,0,x^0).
$$

したがって $d\Phi(B)x=(x^3,0,0,x^0)$、これは [LREP9の $B_3$](../LREP9/index.md#def-lrep9-rotation-boost) の作用です。

一方 $C^\dagger=-C$ なので $CH+HC^\dagger=[C,H]$。Pauli交換子から

$$
[C,\sigma_1]=\sigma_2,\qquad [C,\sigma_2]=-\sigma_1,\qquad [C,\sigma_3]=0
$$

です。従って $CH+HC^\dagger=-x^2\sigma_1+x^1\sigma_2=H(0,-x^2,x^1,0)$。すなわち $d\Phi(C)x=(0,-x^2,x^1,0)$ であり、[LREP9の $R_3$](../LREP9/index.md#def-lrep9-rotation-boost) と一致します。時間・空間の座標作用の違いが $B^\dagger=\pm B$ で生じることも確認できます。
<!-- solution-end -->

### Level C

<a id="ex-lrep10-c01"></a>
#### LREP10-C01 boostと回転の合成を二枚の持ち上げで追う
- Level: C

$a,\theta\in\mathbb R$ とする。$\Lambda$ はまず $z$ 軸の角度 $\theta$ の能動回転、次に $x$ 方向のラピディティ $a$ の能動boostを作用させるLorentz変換である。次を示せ。

1. $\Phi(A)=\Lambda$ を満たす $A\in SL(2,\mathbb C)$ をPauli行列の指数の積で構成する。
2. $A$ 以外の持ち上げが一つだけあり、それが $-A$ であると証明する。
3. $\theta$ を $\theta+2\pi$ に変えたとき、四元ベクトル作用と二成分ベクトルへの作用がどう異なるかを説明する。

<!-- solution-start -->
**詳細解答。** [Pauli模型](../LREP5/index.md#def-lrep5-pauli-model)で $SU(2)$ の $z$ 軸回転は

$$
U_\theta=e^{-i\theta\sigma_3/2}
=\begin{pmatrix}e^{-i\theta/2}&0\\0&e^{i\theta/2}\end{pmatrix}.
$$

[演習A03](#ex-lrep10-a03)で $\Phi(U_\theta)$ が $z$ 軸回転であることを成分比較しました。次に $\sigma_1^2=I_2$ から

$$
D_a=e^{a\sigma_1/2}
=\cosh(a/2)I_2+\sinh(a/2)\sigma_1,
\qquad\det D_a=e^{(a/2)\operatorname{tr}\sigma_1}=1.
$$

$D_a$ はエルミートで、$H(e_0)=I_2$ への作用は

$$
D_aI_2D_a^\dagger=D_a^2
=\cosh a\,I_2+\sinh a\,\sigma_1
=H(\cosh a,\sinh a,0,0).
$$

さらに $\{\sigma_1,\sigma_2\}=\{\sigma_1,\sigma_3\}=0$ なので、$D_aH(x)D_a$ で $x^2,x^3$ は不変です。一方 $D_a\sigma_1D_a=\sinh a\,I_2+\cosh a\,\sigma_1$ となります。従って $\Phi(D_a)$ は $x$ 方向の能動boostです。

先に回転してからboostを作用させるので、[準同型性](#thm-lrep10-lorentz-action)から

$$
A=D_aU_\theta
=e^{a\sigma_1/2}e^{-i\theta\sigma_3/2},
\qquad
\Phi(A)=\Phi(D_a)\Phi(U_\theta)=\Lambda.
$$

これが第1問です。第2問では別の $A'$ も $\Phi(A')=\Lambda$ とすると、$\Phi(A^{-1}A')=I_4$。[核の命題](#prop-lrep10-kernel)から $A^{-1}A'=\pm I_2$、従って $A'=\pm A$。二つは $A$ が可逆なので異なります。

第3問では $\sigma_3$ の対角表示から $U_{\theta+2\pi}=-U_\theta$。ゆえに $A_{\theta+2\pi}=-A_\theta$ ですが、四元ベクトルでは

$$
\Phi(A_{\theta+2\pi})
=\Phi(-I_2)\Phi(A_\theta)=\Phi(A_\theta)
$$

で同じLorentz変換です。一方、二成分ベクトル $\xi\in\mathbb C^2$ への通常の行列作用では $A_{\theta+2\pi}\xi=-A_\theta\xi$ となり符号が変わります。しかし $\xi\xi^\dagger$ へ戻すと

$$
(-A_\theta\xi)(-A_\theta\xi)^\dagger
=(A_\theta\xi)(A_\theta\xi)^\dagger
$$

なので光的四元ベクトルは変わりません。[階数1分解](#prop-lrep10-null-factorization)とも整合します。この差が、被覆群で二成分の表現を扱う理由です。
<!-- solution-end -->

## 8. 何が得られたか

[LREP5の $SU(2)\to SO(3)$](../LREP5/index.md#thm-lrep5-double-cover)は回転だけを二成分複素ベクトルで表しました。本講は時間座標を $x^0I_2$ として加えることで

$$
\boxed{SL(2,\mathbb C)/\{\pm I_2\}\cong SO^+(1,3)}
$$

を**全射性・二元核・局所逆写像**の三点から証明しました。実6次元Lie群としての $SL(2,\mathbb C)$ を使っている点が大切です。次の LREP11 では、[LREP9の複素化二因子](../LREP9/index.md#thm-lrep9-two-sl2)を用いて有限次元Lorentz表現を分類します。さらに LREP12 で二成分ベクトルの左右の変換則を扱います。
