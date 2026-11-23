# LREP7 角運動量とスピン量子数

<!-- definition-example-audit: strict -->

[前講の有限次元既約表現の分類](../LREP6/index.md#thm-lrep6-classification)で、$SU(2)$ の複素既約表現は $V_n$（$n=0,1,2,\dots$）に尽き、次元は $n+1$ と分かりました。さらに[正規直交基底の昇降係数](../LREP6/index.md#prop-lrep6-unitary-ladder)を具体的に計算しました。しかし、物理で使う角運動量は三つの自己共役演算子 $J_1,J_2,J_3$ であり、量子数 $j,m$ で状態を整理します。二つの記法はどう結び付くのでしょうか。

本講では、$SU(2)$ 表現を微分して角運動量演算子を作り、その交換関係から Casimir 演算子と昇降公式を導きます。最後に、なぜ $j$ が整数または半整数に限られるか、そして $2\pi$ 回転の符号が何を区別するかを確かめます。以下では有限次元**複素ユニタリ**表現を扱い、角運動量を無次元化して $\hbar=1$ とします。物理単位は最後に戻します。

## 1. 群の回転を三つの演算子へ

[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model) $\sigma_1,\sigma_2,\sigma_3$ を用い、[前講の Lie 環基底](../LREP6/index.md#def-lrep6-sl2-triple)に現れた $A_a=-i\sigma_a/2$（$a=1,2,3$）を使います。$A_a^\dagger=-A_a$ なので $\exp(tA_a)\in SU(2)$ は実数 $t$ に沿った回転の曲線です。群表現をこの曲線に沿って微分すると、反エルミート演算子が現れます。$i$ を掛ければ自己共役になります。

<a id="def-lrep7-angular-momentum"></a>

<!-- formal-statement-start -->
> **定義（角運動量演算子と昇降演算子）**  
> $D:SU(2)\to U(V)$ を有限次元複素内積空間 $V$ 上の滑らかなユニタリ表現とし、$A_a=-i\sigma_a/2\in\mathfrak{su}(2)$ とする。[表現の微分](../LREP3/index.md#thm-lrep3-differentiation)を $dD$ と書く。**無次元角運動量演算子**および**昇降演算子**を

$$
J_a=i\,dD(A_a)\quad(a=1,2,3),\qquad
J_+=J_1+iJ_2,\qquad J_-=J_1-iJ_2
$$

> と定める。ここで $U(V)$ は $V$ の内積を保つ線形同型全体、$i^2=-1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep7-angular-momentum -->
**定義を直接確認する例。** 標準表現 $D(U)=U$ を $V=\mathbb C^2$ 上で考えると、$dD(A_a)=A_a$ なので $J_a=\sigma_a/2$ です。各 $\sigma_a^\dagger=\sigma_a$ を行列成分から確認できるため $J_a^\dagger=J_a$ です。さらに

$$
J_+=\frac12(\sigma_1+i\sigma_2)
=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
J_-=\begin{pmatrix}0&0\\1&0\end{pmatrix}.
$$

これで三つの生成子と二つの昇降演算子が、実際のユニタリ群表現から得られることを確認しました。
<!-- definition-example-end -->

一般の $D$ でも自己共役性は定義の仮定から従います。$D(\exp(tA_a))^\dagger D(\exp(tA_a))=I$ の両辺を $t=0$ で微分すると

$$
dD(A_a)^\dagger+dD(A_a)=0,
\qquad J_a^\dagger=J_a,\qquad J_+^\dagger=J_-.
$$

ここでは $t$ は実数で、内積を保つ条件を微分しており、$H,E,F$ のような複素化された Lie 環元を群の実一パラメータ部分群と取り違えていません。

<a id="lem-lrep7-commutators"></a>

<!-- formal-statement-start -->
> **補題（角運動量の交換関係）**  
> 上の有限次元ユニタリ $SU(2)$ 表現の $J_a,J_\pm$ は

$$
[J_a,J_b]=i\sum_{c=1}^3\varepsilon_{abc}J_c,\qquad
[J_3,J_\pm]=\pm J_\pm,\qquad
[J_+,J_-]=2J_3
$$

> を満たす。$\varepsilon_{abc}$ は $\varepsilon_{123}=1$ の完全反対称記号であり、$[S,T]=ST-TS$ とする。
<!-- formal-statement-end -->

**証明の見取り図。** [Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)をまず実 Lie 環基底 $A_a$ に適用します。その後、[微分表現が交換子を保つ定理](../LREP3/index.md#thm-lrep3-differentiation)を使います。

<!-- proof-start -->
### 証明

[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)から $[\sigma_a,\sigma_b]=2i\sum_c\varepsilon_{abc}\sigma_c$ です。$A_a=-i\sigma_a/2$ を代入すると

$$
[A_a,A_b]=-\frac14[\sigma_a,\sigma_b]
=-\frac{i}{2}\sum_c\varepsilon_{abc}\sigma_c
=\sum_c\varepsilon_{abc}A_c.
$$

$dD$ は交換子を保つので、$J_a=i\,dD(A_a)$ に対して

$$
[J_a,J_b]
=i^2[dD(A_a),dD(A_b)]
=-\sum_c\varepsilon_{abc}dD(A_c)
=i\sum_c\varepsilon_{abc}J_c.
$$

ここから $[J_3,J_1]=iJ_2$、$[J_3,J_2]=-iJ_1$ を使うと

$$
[J_3,J_+]=iJ_2+i(-iJ_1)=J_+,\quad
[J_3,J_-]=iJ_2-i(-iJ_1)=-J_-.
$$

また $[J_1+iJ_2,J_1-iJ_2]=-2i[J_1,J_2]=2J_3$ です。$\square$
<!-- proof-end -->

## 2. 三成分のうち何を同時に指定できるか

$J_1,J_2,J_3$ は互いに可換ではないので、三成分すべての固有値を同時に指定することは一般にはできません。代わりに、三成分の二乗和を考えます。これは回転しても変わらない量となります。

<a id="def-lrep7-casimir"></a>

<!-- formal-statement-start -->
> **定義（角運動量の Casimir 演算子）**  
> 角運動量演算子 $J_1,J_2,J_3$ に対し、**二次 Casimir 演算子**を

$$
\boldsymbol J^2=J_1^2+J_2^2+J_3^2
=J_3^2+\frac12(J_+J_-+J_-J_+)
$$

> と定める。これは $V$ 上の自己共役演算子である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep7-casimir -->
**定義を直接確認する例。** 二次元標準表現では $J_a=\sigma_a/2$ で、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)に $a=b$ を代入すれば $\sigma_a^2=I_2$ です。従って $\boldsymbol J^2=\frac14(3I_2)=\frac34I_2$ です。また $J_+J_-=\operatorname{diag}(1,0)$、$J_-J_+=\operatorname{diag}(0,1)$、$J_3^2=I_2/4$ なので右辺も $3I_2/4$ になります。二つの表示の一致を直接検算できました。
<!-- definition-example-end -->

二つ目の等式は $J_1=(J_++J_-)/2$ と $J_2=(J_+-J_-)/(2i)$ を代入したものです。非可換なので交差項を勝手に消さず、

$$
J_1^2+J_2^2
=\frac14\bigl((J_++J_-)^2-(J_+-J_-)^2\bigr)
=\frac12(J_+J_-+J_-J_+)
$$

と対称化しています。[交換関係](#lem-lrep7-commutators)を使えば、計算に便利な二式も得られます。

$$
\boldsymbol J^2=J_3(J_3+I)+J_-J_+
=J_3(J_3-I)+J_+J_-.
$$

<a id="thm-lrep7-casimir-central"></a>

<!-- formal-statement-start -->
> **定理（Casimir演算子は角運動量と可換）**  
> 上の有限次元ユニタリ $SU(2)$ 表現では

$$
[\boldsymbol J^2,J_a]=0\quad(a=1,2,3),\qquad
[\boldsymbol J^2,J_\pm]=0
$$

> が成り立つ。従って、$\boldsymbol J^2$ の固有空間は各角運動量演算子で不変である。
<!-- formal-statement-end -->

**証明の見取り図。** [交換関係](#lem-lrep7-commutators)から $J_\pm$ との交換子を計算し、残りは $J_3$ と $J_\pm$ が $J_1,J_2$ を張ることで示します。

<!-- proof-start -->
### 証明

$[AB,C]=A[B,C]+[A,C]B$ を用います。まず $[J_3,J_\pm]=\pm J_\pm$ なので

$$
[J_3^2,J_+]=J_3J_++J_+J_3.
$$

一方、$[J_-,J_+]=-2J_3$ より

$$
\begin{aligned}
[J_+J_-,J_+]&=-2J_+J_3,\\
[J_-J_+,J_+]&=-2J_3J_+.
\end{aligned}
$$

三式を Casimir の定義へ代入すると $[\boldsymbol J^2,J_+]=0$ です。両辺の随伴を取ると、$\boldsymbol J^2$ は自己共役で $J_+^\dagger=J_-$ だから $[\boldsymbol J^2,J_-]=0$ です。また $[J_3,J_+J_-]=[J_3,J_+]J_-+J_+[J_3,J_-]=0$、同じく $[J_3,J_-J_+]=0$ であり $[\boldsymbol J^2,J_3]=0$ です。最後に $J_1=(J_++J_-)/2$、$J_2=(J_+-J_-)/(2i)$ へ戻せば結論を得ます。

$\boldsymbol J^2v=\lambda v$ なら $\boldsymbol J^2(J_av)=J_a\boldsymbol J^2v=\lambda J_av$ なので、固有空間の不変性も従います。$\square$
<!-- proof-end -->

## 3. 最高ウェイト $n$ がスピン $j$ に変わる

[前講の標準三生成子](../LREP6/index.md#def-lrep6-sl2-triple)は $H=2iA_3$、$E=iA_1-A_2$、$F=iA_1+A_2$ でした。これらを表現で微分すると、上の定義から

$$
H=2J_3,\qquad E=J_+,\qquad F=J_-.
$$

左辺は微分した作用素の略記です。従って $H$ のウェイト $n-2k$ を半分にした $m=(n-2k)/2$ が $J_3$ の固有値です。ここで $j=n/2$ と書くと、$m=j-k$ になります。

<a id="def-lrep7-spin-basis"></a>

<!-- formal-statement-start -->
> **定義（スピン量子数と磁気量子数）**  
> $V_n$（$n\ge0$）を[既約 $SU(2)$ 表現](../LREP6/index.md#thm-lrep6-polynomial-model)とする。**スピン量子数**を $j=n/2$ とし、[正規直交基底](../LREP6/index.md#prop-lrep6-unitary-ladder) $u_k$（$k=0,\dots,n$）を

$$
|j,m\rangle=u_{j-m}\qquad
(m=j,j-1,\dots,-j)
$$

> と表す。$m$ を **磁気量子数**とする。この基底は $J_3$ の固有ベクトルの基底で、$\langle j,m\mid j,m'\rangle=\delta_{m,m'}$ と規格化する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep7-spin-basis -->
**定義を直接確認する例。** $n=2$ なら $j=1$、$u_0=x^2$、$u_1=\sqrt2xy$、$u_2=y^2$ です。$m=1-k$ なので $|1,1\rangle=u_0$、$|1,0\rangle=u_1$、$|1,-1\rangle=u_2$ となります。[前講の作用式](../LREP6/index.md#prop-lrep6-unitary-ladder)から $J_3u_k=(1-k)u_k$ を直接確認でき、$u_k$ は前講の不変内積について正規直交です。非零性、量子数の範囲、固有値、規格化がそれぞれ確認できました。
<!-- definition-example-end -->

<a id="thm-lrep7-spin-spectrum"></a>

<!-- formal-statement-start -->
> **定理（有限次元スピンの量子化と昇降公式）**  
> $D:SU(2)\to U(V)$ が非零の有限次元複素既約表現なら、ただ一つの

$$
j\in\left\{0,\frac12,1,\frac32,2,\dots\right\}
$$

> が存在し、$\dim_{\mathbb C}V=2j+1$ である。正規直交基底 $|j,m\rangle$（$m=-j,-j+1,\dots,j$）を選べば

$$
\begin{aligned}
J_3|j,m\rangle&=m|j,m\rangle,\\
\boldsymbol J^2|j,m\rangle&=j(j+1)|j,m\rangle,\\
J_+|j,m\rangle&=\sqrt{(j-m)(j+m+1)}\,|j,m+1\rangle,\\
J_-|j,m\rangle&=\sqrt{(j+m)(j-m+1)}\,|j,m-1\rangle.
\end{aligned}
$$

> 範囲外の状態は零とし、とくに $J_+|j,j\rangle=J_-|j,-j\rangle=0$ である。各 $j$ は既約表現を同値を除いて一意に定める。
<!-- formal-statement-end -->

**証明の見取り図。** [分類定理](../LREP6/index.md#thm-lrep6-classification)によって $n$ は非負整数です。$n=2j$、$k=j-m$ を[正規直交昇降係数](../LREP6/index.md#prop-lrep6-unitary-ladder)に代入して公式を得ます。Casimir は最高状態に作用させると簡単に固有値を求められ、[可換性定理](#thm-lrep7-casimir-central)で全状態へ伝わります。

<!-- proof-start -->
### 証明

[既約表現の分類と群への対応](../LREP6/index.md#prop-lrep6-group-lie-equivalence)から、$V$ はただ一つの $V_n$ と表現として同値で、$n\ge0$ は整数です。ただし、通常の同値写像が正規直交性も保つとは限らないので、その点を確認します。

$T:V_n\to V$ を可逆な絡作用素とし、$V_n$ には [前講で作った不変内積](../LREP6/index.md#prop-lrep6-unitary-ladder)、$V$ には仮定の内積を入れます。任意の $g\in SU(2)$ について $TD_n(g)=D(g)T$ です。両表現がユニタリだから

$
D_n(g)^\dagger T^\dagger T D_n(g)
=(TD_n(g))^\dagger(TD_n(g))
=T^\dagger D(g)^\dagger D(g)T=T^\dagger T.
$

よって $T^\dagger T$ は $D_n(g)$ と可換です。[Schurの補題](../LREP2/index.md#thm-lrep2-schur)を複素有限次元既約表現 $V_n$ に適用すると $T^\dagger T=cI$ となり、$T$ が可逆なので $c>0$ です。従って $Q=c^{-1/2}T$ は内積を保つ可逆な絡作用素です。$V_n$ の[正規直交基底](../LREP6/index.md#prop-lrep6-unitary-ladder)を $Q$ で $V$ に移しても正規直交であり、以下その像を再び $u_k$ と書きます。

$j=n/2$ とすれば $k=0,\dots,n$ に対応する $m=j-k$ は $j,j-1,\dots,-j$ です。従って $\dim V=n+1=2j+1$ です。

$H=2J_3$ に[正規直交基底の公式](../LREP6/index.md#prop-lrep6-unitary-ladder)を代入すると

$$
J_3u_k=\frac{n-2k}{2}u_k=(j-k)u_k=m|j,m\rangle.
$$

$E=J_+$ に対して $k=j-m$、$n=2j$ を代入すると

$$
\sqrt{k(n-k+1)}
=\sqrt{(j-m)(2j-j+m+1)}
=\sqrt{(j-m)(j+m+1)}.
$$

同様に $F=J_-$ に対しては

$$
\sqrt{(k+1)(n-k)}
=\sqrt{(j-m+1)(j+m)}.
$$

ここで $k=0$ および $k=n$ における端の作用が零であることも、係数を直接代入すれば分かります。

最後に最高状態 $|j,j\rangle$ は $J_+|j,j\rangle=0$ です。[Casimir のもう一つの表示](#def-lrep7-casimir)を使い

$$
\boldsymbol J^2|j,j\rangle
=\bigl(J_3(J_3+I)+J_-J_+\bigr)|j,j\rangle
=j(j+1)|j,j\rangle.
$$

[Casimir の可換性](#thm-lrep7-casimir-central)から各 $k$ について

$$
\boldsymbol J^2J_-^k|j,j\rangle
=J_-^k\boldsymbol J^2|j,j\rangle
=j(j+1)J_-^k|j,j\rangle.
$$

下降鎖が全基底を張るので、$\boldsymbol J^2=j(j+1)I_V$ です。最後に同値性と一意性も [LREP6の分類](../LREP6/index.md#thm-lrep6-classification)から従います。$\square$
<!-- proof-end -->

**どこが量子化の根拠か。** $j$ を最初から整数・半整数と仮定したのではありません。[有限次元既約表現の分類](../LREP6/index.md#thm-lrep6-classification)で最高ウェイト $n$ が非負整数に限られることを証明済みであり、$j=n/2$ へ書き直した結果です。$m$ の飛び幅が1となるのも $H=2J_3$ から従います。

### 最小例から三次元まで

- **$j=0$：** $V_0$ は一次元の自明表現です。すべての $J_a$ が零で、$\boldsymbol J^2=0$ です。
- **$j=\tfrac12$：** 基底 $|\tfrac12,\tfrac12\rangle,|\tfrac12,-\tfrac12\rangle$ に対して $J_a=\sigma_a/2$。$J_3=\operatorname{diag}(1/2,-1/2)$、$J_+=\begin{pmatrix}0&1\\0&0\end{pmatrix}$、$\boldsymbol J^2=3I_2/4$ です。
- **$j=1$：** 順序付き基底 $|1,1\rangle,|1,0\rangle,|1,-1\rangle$ では

$$
J_3=\begin{pmatrix}1&0&0\\0&0&0\\0&0&-1\end{pmatrix},\qquad
J_+=\begin{pmatrix}0&\sqrt2&0\\0&0&\sqrt2\\0&0&0\end{pmatrix},\qquad J_-=J_+^\dagger.
$$

$J_+J_-=\operatorname{diag}(2,2,0)$、$J_-J_+=\operatorname{diag}(0,2,2)$ だから、$\boldsymbol J^2=J_3^2+(J_+J_-+J_-J_+)/2=2I_3$ です。$j(j+1)=2$ と一致します。

$\boldsymbol J^2$ と $J_3$ は可換なので、$|j,m\rangle$ はこの二つの共同固有ベクトルです。一方、$J_1,J_2$ は互いに非可換で、同じ意味で三つの成分をすべて固定することは一般にはできません。

## 4. 一周すると、なぜ符号が変わるのか

[SU(2) と SO(3) の二重被覆](../LREP5/index.md#thm-lrep5-double-cover)により、一つの回転 $R\in SO(3)$ には $U,-U\in SU(2)$ の二つの持ち上げがあります。$2\pi$ 回転は $SO(3)$ では恒等元ですが、$SU(2)$ の標準行列模型では $-I_2$ へ到達します。$SU(2)$ の既約表現でその中心元がどう作用するかが、整数スピンと半整数スピンの違いです。

<a id="thm-lrep7-rotation-parity"></a>

<!-- formal-statement-start -->
> **定理（整数スピンの降下と半整数スピンの射影表現）**  
> $j\in\{0,\tfrac12,1,\dots\}$ とし、$D_j$ を $SU(2)$ のスピン $j$ 既約ユニタリ表現とする。被覆写像 $p:SU(2)\to SO(3)$ に関して

$$
D_j(-I_2)=(-1)^{2j}I_{2j+1}.
$$

> 従って $D_j$ が $SO(3)$ 上の通常の線形表現 $D_j=\widetilde D_j\circ p$ に降りる必要十分条件は $j$ が整数であること。$j$ が半整数で整数でない場合、通常の線形表現には降りないが、$SO(3)$ 上の射影表現を定める。
<!-- formal-statement-end -->

ここで射影表現とは、可逆行列を非零複素スカラー倍で同一視した群 $PGL(V)=GL(V)/\mathbb C^\times I$ への群準同型のことです。ユニタリ表現の場合、位相 $e^{i\alpha}$ 倍を同一視することに対応します。作用する対象は単なるベクトルではなく、その非零スカラー倍を同一視した直線（量子状態の射線）です。

**証明の見取り図。** [LREP6の降下定理](../LREP6/index.md#thm-lrep6-descent)で $n=2j$ を代入します。射影表現では $U$ と $-U$ の行列がスカラー倍なら同じ作用になることを確かめます。

<!-- proof-start -->
### 証明

[中心元の作用](../LREP6/index.md#thm-lrep6-descent)は $D_n(-I_2)=(-1)^nI$ です。$n=2j$ なので第一式を得ます。被覆の核は [LREP5の核・像の定理](../LREP5/index.md#thm-lrep5-kernel-surjectivity)により $\{\pm I_2\}$ です。[被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)を適用すると、通常の表現への降下には $D_j(-I_2)=I$ が必要十分で、これは $2j$ が偶数、すなわち $j$ が整数の場合です。

射影表現について、$R=p(U)$ と書いて $\overline D_j(R)=[D_j(U)]\in PGL(V)$ と定めます。別の持ち上げは $-U$ だけですが、

$$
D_j(-U)=D_j(-I_2)D_j(U)=(-1)^{2j}D_j(U)
$$

であり、射影類は変わりません。従って $\overline D_j$ は持ち上げによらず定義できます。さらに $p(U_1U_2)=p(U_1)p(U_2)$ と $D_j(U_1U_2)=D_j(U_1)D_j(U_2)$ から $\overline D_j(R_1R_2)=\overline D_j(R_1)\overline D_j(R_2)$ です。$\square$
<!-- proof-end -->

**回転角で見る。** [軸角表示](../LREP5/index.md#prop-lrep5-rodrigues)の回転軸を第3軸にすると、$SU(2)$ の元は $\exp(\theta A_3)$ であり、対応する表現は[指数と表現の関係](../LREP3/index.md#thm-lrep3-differentiation)から

$$
D_j(\exp(\theta A_3))=\exp(-i\theta J_3),\qquad
\exp(-i\theta J_3)|j,m\rangle=e^{-i\theta m}|j,m\rangle.
$$

$\theta=2\pi$ では $m=j-k$（$k$ は整数）なので $e^{-2\pi i m}=(-1)^{2j}$ がすべての基底ベクトルで共通です。$\theta=4\pi$ ならどの $j$ でも $+1$ です。

**注意：単純な直和では破れることがある。** 整数スピンと半整数スピンを同じ表現空間で直和すると、$D(-I_2)$ は一つのスカラー倍になりません。そのとき全空間の $PGL$ への作用も $SO(3)$ へは降りません。各既約な直和因子が射影表現を持つことと、その直和が一つの射影表現になることは別です。Level C でこの境界を確かめます。

## 5. 物理量との対応

ここまでの $J_a$ は $\hbar=1$ の無次元演算子でした。物理単位を戻した角運動量を $L_a=\hbar J_a$ と書けば、固有値と交換関係は

$$
\begin{aligned}
[L_a,L_b]&=i\hbar\sum_c\varepsilon_{abc}L_c,\\
(L_1^2+L_2^2+L_3^2)|j,m\rangle
&=\hbar^2j(j+1)|j,m\rangle,\\
L_3|j,m\rangle&=\hbar m|j,m\rangle.
\end{aligned}
$$

古典力学では質点の位置ベクトルと $m\boldsymbol v$（質量 $m$、速度 $\boldsymbol v$）のベクトル積を角運動量として扱います。これは量子角運動量の証明で使う前提ではなく、二つの模型を比較するための例です。

軌道角運動量は空間上の波動関数を**通常の空間回転**で動かす表現から生まれ、整数 $j$ の部分だけが現れます。一方、内部自由度のスピンでは被覆群 $SU(2)$ の表現を使えるため、半整数 $j$ も現れます。この区別を「三次元空間で半回転できないから」と説明するのではなく、**どの群のどの表現空間を用いるか**で説明するのが正確です。軌道部分と内部スピンの合成は次講で扱います。

## 6. 演習

### Level A

<a id="ex-lrep7-a01"></a>
#### LREP7-A01 Pauli 行列から角運動量の交換子
- Level: A

標準表現で $J_a=\sigma_a/2$ とする。[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)を直接掛けて $[J_1,J_2]=iJ_3$ と $J_+^\dagger=J_-$ を確かめよ。

<!-- solution-start -->
**詳細解答。** 行列積は

$$
\sigma_1\sigma_2=
\begin{pmatrix}i&0\\0&-i\end{pmatrix}=i\sigma_3,\qquad
\sigma_2\sigma_1=
\begin{pmatrix}-i&0\\0&i\end{pmatrix}=-i\sigma_3.
$$

従って $[J_1,J_2]=\frac14(\sigma_1\sigma_2-\sigma_2\sigma_1)=\frac i2\sigma_3=iJ_3$ です。$J_+=\frac12(\sigma_1+i\sigma_2)=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ なので、その共役転置は $\begin{pmatrix}0&0\\1&0\end{pmatrix}=J_-$ です。これは [交換関係](#lem-lrep7-commutators)と定義直後の自己共役性を具体的に確認しています。
<!-- solution-end -->

<a id="ex-lrep7-a02"></a>
#### LREP7-A02 スピン1の昇降
- Level: A

$j=1$ とし、$J_+|1,-1\rangle$、$J_+|1,0\rangle$、$J_-|1,1\rangle$、$J_-|1,-1\rangle$ を求めよ。

<!-- solution-start -->
**詳細解答。** [昇降公式](#thm-lrep7-spin-spectrum)へそれぞれ $j=1$ と $m=-1,0,1,-1$ を代入します。

$$
\begin{aligned}
J_+|1,-1\rangle
&=\sqrt{(1+1)(1-1+1)}|1,0\rangle=\sqrt2|1,0\rangle,\\
J_+|1,0\rangle
&=\sqrt{(1-0)(1+0+1)}|1,1\rangle=\sqrt2|1,1\rangle,\\
J_-|1,1\rangle
&=\sqrt{(1+1)(1-1+1)}|1,0\rangle=\sqrt2|1,0\rangle,\\
J_-|1,-1\rangle
&=\sqrt{(1-1)(1+1+1)}|1,-2\rangle=0.
\end{aligned}
$$

最後は端の係数が零であり、そもそも $|1,-2\rangle$ は表現空間の基底ベクトルには含まれません。
<!-- solution-end -->

<a id="ex-lrep7-a03"></a>
#### LREP7-A03 Casimir の最高状態
- Level: A

$j=3/2$ の最高状態 $|3/2,3/2\rangle$ に $\boldsymbol J^2$ を作用させ、固有値を求めよ。$J_-J_+$ の項が零になる理由も述べよ。

<!-- solution-start -->
**詳細解答。** [Casimir の表示](#def-lrep7-casimir)を使います。$J_+|3/2,3/2\rangle=0$ は最高状態の昇降係数 $j-m=0$ から従うため $J_-J_+$ の項は零です。よって

$$
\begin{aligned}
\boldsymbol J^2|3/2,3/2\rangle
&=(J_3^2+J_3+J_-J_+)|3/2,3/2\rangle\\
&=\left(\frac94+\frac32+0\right)|3/2,3/2\rangle\\
&=\frac{15}{4}|3/2,3/2\rangle.
\end{aligned}
$$

$\frac32(\frac32+1)=\frac{15}{4}$ と一致します。
<!-- solution-end -->

<a id="ex-lrep7-a04"></a>
#### LREP7-A04 量子数と一周の符号
- Level: A

$j=5/2$ の $m$ の全値、表現の次元、$2\pi$ 回転と $4\pi$ 回転の行列を求めよ。$SO(3)$ の通常表現へ降りるか判定せよ。

<!-- solution-start -->
**詳細解答。** [量子化定理](#thm-lrep7-spin-spectrum)より $m=5/2,3/2,1/2,-1/2,-3/2,-5/2$ の六つで、次元は $2j+1=6$ です。[回転の降下定理](#thm-lrep7-rotation-parity)で $2j=5$ を代入すると $2\pi$ 回転は $(-1)^5I_6=-I_6$ です。$4\pi$ 回転はその二乗なので $I_6$ です。被覆の核元が恒等作用しないため、$SO(3)$ の通常の線形表現には降りません。
<!-- solution-end -->

### Level B

<a id="ex-lrep7-b01"></a>
#### LREP7-B01 スピン1の三つの自己共役行列
- Level: B

基底 $(|1,1\rangle,|1,0\rangle,|1,-1\rangle)$ で $J_+,J_-$ から $J_1,J_2$ を構成し、$[J_1,J_2]=iJ_3$ と $\boldsymbol J^2=2I_3$ を検算せよ。

<!-- solution-start -->
**詳細解答。** [昇降公式](#thm-lrep7-spin-spectrum)から

$$
J_+=\begin{pmatrix}0&\sqrt2&0\\0&0&\sqrt2\\0&0&0\end{pmatrix},
\quad
J_-=\begin{pmatrix}0&0&0\\\sqrt2&0&0\\0&\sqrt2&0\end{pmatrix}.
$$

$J_1=(J_++J_-)/2$、$J_2=(J_+-J_-)/(2i)$ なので

$$
J_1=\frac1{\sqrt2}\begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix},
\quad
J_2=\frac1{\sqrt2}\begin{pmatrix}0&-i&0\\i&0&-i\\0&i&0\end{pmatrix}.
$$

どちらも共役転置が自分自身です。積を直接計算すると

$$
J_1J_2=\frac12\begin{pmatrix}i&0&-i\\0&0&0\\i&0&-i\end{pmatrix},\quad
J_2J_1=\frac12\begin{pmatrix}-i&0&-i\\0&0&0\\i&0&i\end{pmatrix}.
$$

差は $\operatorname{diag}(i,0,-i)=iJ_3$ です。さらに $J_+J_-=\operatorname{diag}(2,2,0)$、$J_-J_+=\operatorname{diag}(0,2,2)$ なので

$$
\boldsymbol J^2
=J_3^2+\frac12(J_+J_-+J_-J_+)
=\operatorname{diag}(1,0,1)+\operatorname{diag}(1,2,1)
=2I_3.
$$

[Casimir の定義](#def-lrep7-casimir)と全て一致します。
<!-- solution-end -->

<a id="ex-lrep7-b02"></a>
#### LREP7-B02 ノルムから昇降の境界を復元する
- Level: B

$J_a$ を有限次元複素内積空間上の自己共役演算子とし、[角運動量交換関係](#lem-lrep7-commutators)を満たすとする。$\boldsymbol J^2v=c v$、$J_3v=mv$、$\|v\|=1$ と仮定し、$\|J_+v\|^2=c-m(m+1)$、$\|J_-v\|^2=c-m(m-1)$ を導け。$c=j(j+1)$ の既約表現では端で何が起こるか説明せよ。

<!-- solution-start -->
**詳細解答。** $J_+^\dagger=J_-$ と [Casimir の表示](#def-lrep7-casimir)を使います。

$$
\begin{aligned}
\|J_+v\|^2
&=\langle J_+v,J_+v\rangle
=\langle v,J_-J_+v\rangle\\
&=\langle v,(\boldsymbol J^2-J_3^2-J_3)v\rangle
=c-m^2-m.
\end{aligned}
$$

同様に

$$
\|J_-v\|^2
=\langle v,J_+J_-v\rangle
=\langle v,(\boldsymbol J^2-J_3^2+J_3)v\rangle
=c-m^2+m.
$$

ノルム二乗は非負なので両式の右辺は非負です。[スピンの量子化](#thm-lrep7-spin-spectrum)で $c=j(j+1)$ のとき、$m=j$ では上昇ノルムが $j(j+1)-j(j+1)=0$、$m=-j$ では下降ノルムが $j(j+1)-(-j)(-j-1)=0$ です。正定値内積なのでノルム零はベクトル零を意味し、上端・下端で昇降が停止します。この議論は正定値性を失った空間にはそのまま適用できません。
<!-- solution-end -->

<a id="ex-lrep7-b03"></a>
#### LREP7-B03 射影表現の持ち上げを比較する
- Level: B

$j=1/2$ とする。$R=p(U)=p(-U)$ に対して $[D_{1/2}(U)]$ が持ち上げによらないことを示し、$R_1R_2$ に対する群法則を射影類で確かめよ。なぜ同じ構成で $SO(3)$ の通常の二次元表現は得られないか。

<!-- solution-start -->
**詳細解答。** [被覆の核](../LREP5/index.md#thm-lrep5-kernel-surjectivity)は $\{\pm I_2\}$ です。$j=1/2$ では [中心元の作用](#thm-lrep7-rotation-parity)が $D_{1/2}(-I_2)=-I_2$ なので

$$
D_{1/2}(-U)=D_{1/2}(-I_2)D_{1/2}(U)=-D_{1/2}(U).
$$

二つは非零スカラー倍であり $PGL(2,\mathbb C)$ では同じ元です。$R_a=p(U_a)$ とすれば

$$
[D(U_1)][D(U_2)]=[D(U_1)D(U_2)]
=[D(U_1U_2)]=\overline D(R_1R_2).
$$

射影類の積で群法則が成立します。しかし通常の線形表現なら同一の $R$ へ同一行列を割り当てねばなりません。$p(I_2)=p(-I_2)$ に対して $D_{1/2}(I_2)=I_2$ と $D_{1/2}(-I_2)=-I_2$ は異なるため、通常表現には降りません。
<!-- solution-end -->

<a id="ex-lrep7-b04"></a>
#### LREP7-B04 横方向の二乗平均
- Level: B

任意のスピン $j$ の規格化された $|j,m\rangle$ について、$\langle J_1\rangle=\langle J_2\rangle=0$ および $\langle J_1^2+J_2^2\rangle=j(j+1)-m^2$ を示せ。$j=1,m=0$ の場合を検算せよ。

<!-- solution-start -->
**詳細解答。** $J_\pm|j,m\rangle$ は $|j,m\pm1\rangle$ に比例し、元の状態と直交します（端では零）。従って $\langle j,m|J_\pm|j,m\rangle=0$ です。$J_1=(J_++J_-)/2$、$J_2=(J_+-J_-)/(2i)$ へ代入すれば、それぞれの対角行列要素が零となります。[Casimir の定義](#def-lrep7-casimir)は $J_1^2+J_2^2=\boldsymbol J^2-J_3^2$ です。[固有値公式](#thm-lrep7-spin-spectrum)から

$$
\begin{aligned}
\langle j,m|J_1^2+J_2^2|j,m\rangle
&=\langle j,m|(\boldsymbol J^2-J_3^2)|j,m\rangle\\
&=j(j+1)-m^2.
\end{aligned}
$$

$j=1,m=0$ なら結果は $2-0=2$ です。上に示したスピン1行列を用いても $J_1|1,0\rangle=(|1,1\rangle+|1,-1\rangle)/\sqrt2$、$J_2|1,0\rangle=(-i|1,1\rangle+i|1,-1\rangle)/\sqrt2$ であり、両者のノルム二乗がそれぞれ1なので和は2になります。
<!-- solution-end -->

### Level C

<a id="ex-lrep7-c01"></a>
#### LREP7-C01 整数スピンと半整数スピンを混ぜると
- Level: C

$W=V_2\oplus V_1$ に $D=D_2\oplus D_1$ を作用させる。ここで $V_n$ は[前講の既約表現](../LREP6/index.md#thm-lrep6-polynomial-model)、スピンは $j=n/2$ とする。

1. $W$ の次元と $J_3$ の固有値を、重複を含めて求めよ。
2. $\boldsymbol J^2$ の固有値と重複度を求めよ。
3. $D(-I_2)$ を求め、$D$ が $SO(3)$ の通常の表現へ降りるか判定せよ。
4. 全空間 $W$ 上の射影類 $[D(U)]$ が $SO(3)$ の射影表現を定めるか判定せよ。各既約な直和因子ではどうか。

<!-- solution-start -->
**詳細解答。**

**設問1。** [スピン量子化](#thm-lrep7-spin-spectrum)で $V_2$ は $j=1$、次元3、$m=1,0,-1$ です。$V_1$ は $j=1/2$、次元2、$m=1/2,-1/2$ です。従って $W$ の次元は $3+2=5$、$J_3$ の固有値は $1,0,-1,\frac12,-\frac12$ です。

**設問2。** [有限次元スピンの量子化と昇降公式](#thm-lrep7-spin-spectrum)より、$V_2$ 上では $1(1+1)=2$（重複度3）、$V_1$ 上では $\frac12(\frac12+1)=\frac34$（重複度2）です。従って適切な直和基底で

$$
\boldsymbol J^2=\operatorname{diag}(2,2,2,\tfrac34,\tfrac34).
$$

**設問3。** [整数スピンの降下と半整数スピンの射影表現](#thm-lrep7-rotation-parity)から

$$
D(-I_2)=D_2(-I_2)\oplus D_1(-I_2)
=I_3\oplus(-I_2)
=\operatorname{diag}(1,1,1,-1,-1).
$$

これは $I_5$ と異なるので、[被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)により $SO(3)$ の通常表現には降りません。

**設問4。** 同じ $SO(3)$ 回転への持ち上げ $U,-U$ が射影類で一致するには、$D(-U)$ が $D(U)$ の**全空間で共通な**非零スカラー倍でなければなりません。特に $U=I_2$ を取ると、$D(-I_2)=\operatorname{diag}(1,1,1,-1,-1)$ は $I_5$ のスカラー倍ではありません。したがって $[D(U)]$ は持ち上げによらない写像にならず、$W$ 全体では射影表現にも降りません。一方 $V_2$ 上では中心元が $+I_3$ なので通常表現へ降り、$V_1$ 上では $-I_2$ なので射影表現へ降ります。証明機構が破れる箇所は、二つの既約な直和因子で中心元のスカラーが一致しないことです。
<!-- solution-end -->

## 7. まとめと次講

$SU(2)$ の有限次元既約表現 $V_n$ を角運動量演算子で読み替えると、$j=n/2$、$m=-j,-j+1,\dots,j$、$\boldsymbol J^2=j(j+1)$ が得られます。昇降演算子の係数は正規直交基底の規格化と自己共役性から決まり、$2\pi$ 回転の符号は $(-1)^{2j}$ です。

次の **LREP8「二つのスピンの合成」** では、二つの表現空間をテンソル積にし、全角運動量から $\tfrac12\otimes\tfrac12$ に含まれる一重項と三重項を具体的に構成します。
