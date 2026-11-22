# GBG10 曲率とはどの失敗を測るか

[GBG9 の共変微分](../GBG9/index.md#def-gbg9-covariant-derivative)は、局所的には $D=d+\rho_*(A)$ で書ける。一本の方向に沿って場を微分するときにはこれで十分である。しかし、二つの方向に順に動かしたとき、微分の順序を交換できるとは限らない。また、[GBG6 の水平分布](../GBG6/index.md#def-gbg6-horizontal-distribution)の中で二つのベクトル場の Lie 括弧を取ると、垂直方向へはみ出すことがある。

この二つの「失敗」を一つの幾何学的量で測るのが**曲率**である。今回は主束上の大域的な曲率2形式を定義し、局所公式、ゲージ変換、結合束の共変微分との対応を証明する。次の GBG11 で扱う Bianchi 恒等式は、今回得る構造方程式をさらに微分したときに現れる。

**全節の規約**：$M$ は Hausdorff・第二可算で境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\mathfrak g=T_eG$、$\pi:P\to M$ は滑らかな右主 $G$ 束とする。[GBG7 の主束接続形式](../GBG7/index.md#def-gbg7-connection-form) $\omega\in\Omega^1(P;\mathfrak g)$ は

$$
\omega(\xi_P)=\xi,\qquad R_g^*\omega=\operatorname{Ad}_{g^{-1}}\omega
$$

を満たし、$H=\ker\omega$ とする。局所 section $s:U\to P$ で $A=s^*\omega$ とする。$G$ が行列群の場合には Lie 括弧を $[X,Y]=XY-YX$ と書く。曲率の定義には $M$ 上の計量も向きも必要ない。

<!-- definition-example-audit: strict -->

---

## 1. 水平方向を二つ合成すると何が起こるか

水平リフト $X^H$ と $Y^H$ は、基底 $M$ 上のベクトル場 $X,Y$ を $P$ 上に持ち上げ、$\omega(X^H)=\omega(Y^H)=0$ を満たすものだった（[GBG6 の水平リフト](../GBG6/index.md#prop-gbg6-horizontal-lift)）。ところが Lie 括弧 $[X^H,Y^H]$ が水平である保証はない。

そもそも任意の滑らかな1形式 $\alpha$ について、外微分の定義から

$$
d\alpha(U,V)=U(\alpha(V))-V(\alpha(U))-\alpha([U,V])
$$

である。$U=X^H,V=Y^H$ とすると最初の二項は零になるため

$$
d\omega(X^H,Y^H)=-\omega([X^H,Y^H]).
$$

つまり外微分 $d\omega$ は、水平な二方向を合成したときの**垂直成分**を検出する。ところが $d\omega$ をそのまま曲率と呼ぶと、垂直な方向に入れたときにも値が残る。主束の接続が基底方向に対して持つ性質を取り出すため、補正項が必要となる。

### 既習の括弧付き外積を使う

Lie 環値1形式の係数は一般には交換できない。[LIE4 の括弧付き外積の定義](../../../代数系/LIE/LIE4/index.md#def-lie4-bracket-wedge)は、$\mathfrak g$ 値1形式 $\alpha$ の二つの接方向の値を Lie 括弧で交代化するものである。$U,V$ を接ベクトルとすると

$$
[\alpha\wedge\alpha](U,V)
=[\alpha(U),\alpha(V)]-[\alpha(V),\alpha(U)]
=2[\alpha(U),\alpha(V)].
$$

この係数2を除くために構造方程式では $\frac12[\alpha\wedge\alpha]$ を使う。行列係数の通常の外積では、$A\wedge A(U,V)=A(U)A(V)-A(V)A(U)$ と計算する。

**手計算での確認**。$N=\mathbb R^2$、$\mathfrak g=\mathfrak{gl}_2(\mathbb R)$ とし、$B=E_{11}$、$C=E_{12}$、$\alpha=B\,dx+C\,dy$ とおく。$\alpha(\partial_x)=B$、$\alpha(\partial_y)=C$。行列積 $BC=C$、$CB=0$ より

$$
\frac12[\alpha\wedge\alpha](\partial_x,\partial_y)
=[B,C]=C,\qquad
\frac12[\alpha\wedge\alpha]=C\,dx\wedge dy.
$$

$dx\wedge dy$ はこの順の基底で $1$、逆順で $-1$ を取る。係数が非可換なら、同じ1形式でも括弧付き外積が非零になる。

## 2. 主束上の曲率2形式

$\omega$ の外微分にこの括弧付き外積の半分を足す。水平成分だけを測るようにしたいという動機から、その補正が正しいことを直後に証明する。

<a id="def-gbg10-curvature"></a>

<!-- formal-statement-start -->
> **定義（主束接続の曲率2形式）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ と主束接続形式 $\omega$ に対し、$P$ 上の $\mathfrak g$ 値2形式

$$
\boxed{\displaystyle
\Omega=d\omega+\frac12[\omega\wedge\omega]
}
$$

> を $\omega$ の**曲率2形式**という。この等式を接続の構造方程式という。ここで外微分は $P$ 上で行う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg10-curvature -->
**定義の確認（最も簡単な平坦例）**。積主束 $P=\mathbb R^2\times U(1)$ を取り、標準 section のポテンシャルを $A=0$ とする。[GBG7 の積主束公式](../GBG7/index.md#prop-gbg7-product-form)より、$U(1)$ 成分 $k$ の方向での接続形式は

$
\omega_{(x,k)}=k^{-1}dk
$

となる。$U(1)$ は可換なので Lie 括弧は零である。局所座標 $k=e^{i\theta}$ を用いて直接微分すると

$
\omega=i\,d\theta,\qquad
d\omega=i\,d(d\theta)=0,\qquad
\Omega=d\omega+\frac12[\omega\wedge\omega]=0.
$

この計算は任意の局所角度座標で成り立つので、大域的にも曲率は零。接続形式そのものは垂直方向に零ではないが、曲率は零になる。
<!-- definition-example-end -->

### なぜ曲率は水平で、右作用に対して同変なのか

<a id="thm-gbg10-basic-properties"></a>

<!-- formal-statement-start -->
> **定理（曲率の水平性と右作用の同変性）**  
> 前述の滑らかな右主 $G$ 束と主束接続形式 $\omega$ の曲率 $\Omega$ について、任意の $p\in P$、$g\in G$、$\xi\in\mathfrak g$、$Z\in T_pP$ に対して

$$
\Omega_p(\xi_P(p),Z)=0,\qquad
R_g^*\Omega=\operatorname{Ad}_{g^{-1}}\Omega
$$

> が成り立つ。従って $\Omega$ の値は二つの入力の水平成分だけで決まる。
<!-- formal-statement-end -->

### 証明の見取り図

右作用の微小変化は $\xi_P$ に沿う Lie 微分で表す。接続の同変性から $\mathcal L_{\xi_P}\omega=-[\xi,\omega]$ が出る一方、Cartan の公式を使うと $\iota_{\xi_P}d\omega=\mathcal L_{\xi_P}\omega$。二つを合わせ、構造方程式の補正項と相殺させる。右作用の同変性は外微分と Lie 括弧が固定された随伴作用と交換することから従う。

<!-- proof-start -->
### 証明

まず $\xi\in\mathfrak g$ を固定する。基本ベクトル場 $\xi_P$ の流れは $R_{\exp(t\xi)}$ である。接続の同変性により

$$
R_{\exp(t\xi)}^*\omega
=\operatorname{Ad}_{\exp(-t\xi)}\omega.
$$

$t=0$ で微分し、[無限小随伴作用と Lie 括弧の関係](../../../代数系/LIE/LIE2/index.md#thm-lie2-infinitesimal-adjoint-bracket)を用いると

$$
\mathcal L_{\xi_P}\omega=-[\xi,\omega].
$$

ここで $[\xi,\omega](Z)=[\xi,\omega(Z)]$ である。また、[GBG7 の再生条件](../GBG7/index.md#def-gbg7-connection-form)から $\iota_{\xi_P}\omega=\xi$ は $P$ 上の定数関数なので $d(\iota_{\xi_P}\omega)=0$。Cartan の公式 $\mathcal L_{\xi_P}\omega=d(\iota_{\xi_P}\omega)+\iota_{\xi_P}d\omega$ に代入して

$$
d\omega(\xi_P,Z)
=(\iota_{\xi_P}d\omega)(Z)
=-[\xi,\omega(Z)].
$$

一方、括弧付き外積の定義および $\omega(\xi_P)=\xi$ により

$$
\frac12[\omega\wedge\omega](\xi_P,Z)
=[\omega(\xi_P),\omega(Z)]
=[\xi,\omega(Z)].
$$

両者を足すと $\Omega(\xi_P,Z)=0$。垂直接空間は基本ベクトル場の値で尽くされる（[GBG6 の垂直同型定理](../GBG6/index.md#thm-gbg6-vertical-fundamental)）ので、第一の主張は任意の垂直接ベクトルに拡張される。

次に $g\in G$ を固定する。外微分と引き戻しが交換し、$\operatorname{Ad}_{g^{-1}}$ は固定された Lie 環自己同型であるため、

$$
\begin{aligned}
R_g^*\Omega
&=d(R_g^*\omega)+\frac12[R_g^*\omega\wedge R_g^*\omega]\\
&=d(\operatorname{Ad}_{g^{-1}}\omega)
 +\frac12[\operatorname{Ad}_{g^{-1}}\omega\wedge
 \operatorname{Ad}_{g^{-1}}\omega]\\
&=\operatorname{Ad}_{g^{-1}}
 \left(d\omega+\frac12[\omega\wedge\omega]\right)
 =\operatorname{Ad}_{g^{-1}}\Omega.
\end{aligned}
$$

最後に任意の $U,V\in T_pP$ を $H_p\oplus\ker d\pi_p$ に分解する。$\Omega$ に垂直成分が一つでも入る項は第一の主張によって零なので、$\Omega(U,V)=\Omega(U^H,V^H)$。
<!-- proof-end -->

### 曲率が測るものを括弧から読む

<a id="thm-gbg10-horizontal-bracket"></a>

<!-- formal-statement-start -->
> **定理（曲率と水平ベクトル場の括弧）**  
> $M$ 上の滑らかなベクトル場 $X,Y$ の水平リフトを $X^H,Y^H$ とする。任意の $p\in P$ で

$$
\boxed{\displaystyle
\Omega_p(X^H,Y^H)
=-\omega_p([X^H,Y^H])
}
$$

> が成立する。とくに $\Omega=0$ と、任意の局所水平ベクトル場の Lie 括弧が水平にとどまることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

水平な入力では $\omega(X^H)=\omega(Y^H)=0$。従って構造方程式で括弧付き外積は消え、外微分の定義に残るのが $-\omega([X^H,Y^H])$ である。

<!-- proof-start -->
### 証明

$X^H,Y^H$ は水平なので

$$
\frac12[\omega\wedge\omega](X^H,Y^H)
=[0,0]=0.
$$

また、外微分の定義により

$$
\begin{aligned}
d\omega(X^H,Y^H)
&=X^H\{\omega(Y^H)\}-Y^H\{\omega(X^H)\}
  -\omega([X^H,Y^H])\\
&=-\omega([X^H,Y^H]).
\end{aligned}
$$

よって等式が成立する。$\Omega=0$ なら右辺は零で、$\ker\omega=H$ より水平括弧も水平である。逆に任意の水平ベクトル場の括弧が水平なら、等式から二つの水平入力で $\Omega=0$。[曲率の水平性と右作用の同変性](#thm-gbg10-basic-properties)により、任意の入力でも零となる。基底の任意の接方向が局所水平リフトで得られることは[GBG6 の水平リフト](../GBG6/index.md#prop-gbg6-horizontal-lift)による。さらに局所水平ベクトル場 $U=\sum_i f_iX_i^H$、$V=\sum_j h_jY_j^H$ の括弧を展開すると、係数関数の微分に由来する項は $X_i^H,Y_j^H$ の線形結合で水平であり、非水平になり得るのは $f_ih_j[X_i^H,Y_j^H]$ の項だけである。従って任意の水平ベクトル場についても同値性が成立する。
<!-- proof-end -->

ここで測っているのは、二つの方向への**無限小の移動順序**が水平性を保たないという現象である。有限の閉路に沿う平行移動は GBG14〜15 で、曲率の零性から得られる大域的結論の追加条件は GBG16 で調べる。

## 3. 局所曲率 $F=dA+A\wedge A$ を導く

大域の曲率は $P$ 上の $\Omega$ である。実際の計算には、局所 section $s:U\to P$ に引き戻した $U$ 上の2形式を使う。

<a id="def-gbg10-local-curvature"></a>

<!-- formal-statement-start -->
> **定義（局所曲率形式）**  
> $U\subset M$ を開集合、$s:U\to P$ を滑らかな局所 section とする。[局所ゲージポテンシャル](../GBG8/index.md#def-gbg8-local-potential) $A=s^*\omega$ に対し

$$
F=s^*\Omega\in\Omega^2(U;\mathfrak g)
$$

> をその section における**局所曲率形式**と呼ぶ。これは $U$ 上の局所表示であり、$P$ 上の曲率 $\Omega$ と同じ定義域の形式ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg10-local-curvature -->
**定義の確認**。$P=\mathbb R^2\times U(1)$、$s(x,y)=(x,y,1)$ とする。[GBG7 の積主束公式](../GBG7/index.md#prop-gbg7-product-form)によって $A=i x\,dy$ を指定すれば、滑らかな主束接続が存在する。$s^*\Omega$ は $s$ の接方向二つを入力した2形式である。$U(1)$ の Lie 括弧が零であることから

$$
s^*\Omega=s^*(d\omega)=d(s^*\omega)=d(ix\,dy)=i\,dx\wedge dy.
$$

引き戻しと外微分が交換することを使用した。$F(\partial_x,\partial_y)=i$ であり、曲率は零ではない。
<!-- definition-example-end -->

<a id="thm-gbg10-local-formula"></a>

<!-- formal-statement-start -->
> **定理（曲率の局所構造方程式）**  
> 上記の $P,\omega,s,A$ に対し

$$
\boxed{\displaystyle
F=dA+\frac12[A\wedge A]}
$$

> が成り立つ。$G\subset GL(n,\mathbb F)$ が行列 Lie 群で、$A$ を行列値1形式とみなす場合には、行列積を係数の順序を保って用いて

$$
\boxed{\displaystyle F=dA+A\wedge A}
$$

> と書ける。局所座標 $x^1,\ldots,x^m$ で $A=\sum_iA_i\,dx^i$ とすると

$$
F=\sum_{i<j}
\bigl(\partial_iA_j-\partial_jA_i+[A_i,A_j]\bigr)
\,dx^i\wedge dx^j.
$$
<!-- formal-statement-end -->

### 証明の見取り図

引き戻し $s^*$ は外微分と括弧付き外積の双方に可換である。行列表現では、$A\wedge A$ の反対称化が Lie 括弧に等しい。座標係数は $dA$ の微分差と $A\wedge A$ の交換子の和になる。

<!-- proof-start -->
### 証明

曲率の定義に $s^*$ を施すと

$$
\begin{aligned}
F=s^*\Omega
&=s^*(d\omega)+\frac12s^*[\omega\wedge\omega]\\
&=d(s^*\omega)+\frac12[s^*\omega\wedge s^*\omega]\\
&=dA+\frac12[A\wedge A].
\end{aligned}
$$

行列係数の通常の外積は、$A\wedge A(U,V)=A(U)A(V)-A(V)A(U)=[A(U),A(V)]$ である。したがって $\frac12[A\wedge A]=A\wedge A$。

座標表示では

$$
dA=\sum_{i<j}(\partial_iA_j-\partial_jA_i)\,dx^i\wedge dx^j,
$$

一方

$$
A\wedge A
=\sum_{i<j}(A_iA_j-A_jA_i)\,dx^i\wedge dx^j.
$$

両式を加えると主張の係数公式を得る。特に、非可換な係数では $dA$ のみを曲率とすることはできない。
<!-- proof-end -->

### 二つの具体例：可換と非可換

**$U(1)$ の場合**。$A=i x\,dy$ は $F=i\,dx\wedge dy$ を与える。$g=e^{i\phi(x,y)}$ へ section を変えると $A'=A+i\,d\phi$（[GBG8 の変換則](../GBG8/index.md#thm-gbg8-local-transform)）。$d^2\phi=0$ だから $dA'=dA$、従って $F'=F$。この場合、非可換補正は恒等的に零である。

**$SU(2)$ の場合**。$\mathbb R^2$ 上の積主束と、その局所接続

$$
H=\begin{pmatrix}i&0\\0&-i\end{pmatrix},\quad
X=\begin{pmatrix}0&i\\i&0\end{pmatrix},\quad
A=H\,dx+X\,dy
$$

を考える。$H,X$ は反Hermite、跡零なので $\mathfrak{su}(2)$ に属する。二つとも定数行列なので $dA=0$。しかし

$$
HX=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
XH=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
$$

よって

$$
[H,X]=\begin{pmatrix}0&-2\\2&0\end{pmatrix}\ne0,\qquad
F=[H,X]\,dx\wedge dy.
$$

両方向の接続係数が位置によらなくても曲率が非零になり得る。**非可換接続では $dA=0$ は平坦性の判定条件ではない**。

## 4. section を替えると曲率はどう見えるか

[GBG8 の局所変換則](../GBG8/index.md#thm-gbg8-local-transform)は、同じ開集合上で $s'=sg$ と書けば

$$
A'=\operatorname{Ad}_{g^{-1}}A+g^{-1}dg
$$

である。右端は非斉次項だが、曲率ではその項が消える。

<a id="thm-gbg10-gauge-transform"></a>

<!-- formal-statement-start -->
> **定理（局所曲率のゲージ共変性）**  
> 滑らかな右主 $G$ 束、接続 $\omega$、局所 section $s'=sg$（$g:U\to G$ は滑らか）に対し、$F=s^*\Omega$、$F'=s'^*\Omega$ とする。このとき

$$
\boxed{\displaystyle
F'=\operatorname{Ad}_{g^{-1}}F.
}
$$

> 特に $G$ が可換なら $F'=F$。非可換な場合には曲率の成分は一般に共役変換される。
<!-- formal-statement-end -->

### 証明の見取り図

大域曲率の水平性により、位置依存の $g(x)$ によって生じる接方向の垂直成分は曲率に寄与しない。残る右平行移動は随伴変換だけを与える。行列群では $g^{-1}dg$ の微分を明示的に計算しても確認できる。

<!-- proof-start -->
### 証明

$x\in U$、$v\in T_xU$ を固定する。$s'(x)=s(x)g(x)$ を微分すると $(ds')_xv$ は $(dR_{g(x)})_{s(x)}(ds)_xv$ と、$g(x)$ の変化に由来する垂直ベクトルとの和である。後者が垂直であるのは、$x$ を固定したときの曲線 $s(x)g(x(t))$ が同一ファイバー内にあるためである。

前節の[曲率の水平性](#thm-gbg10-basic-properties)により、$v,w\in T_xU$ に対する二つの垂直補正項は寄与しない。その結果、

$$
\begin{aligned}
F'_x(v,w)
&=\Omega_{s(x)g(x)}
  \bigl((dR_{g(x)})ds_xv,(dR_{g(x)})ds_xw\bigr)\\
&=(R_{g(x)}^*\Omega)_{s(x)}(ds_xv,ds_xw)\\
&=\operatorname{Ad}_{g(x)^{-1}}F_x(v,w),
\end{aligned}
$$

となる。最後は[同変性定理](#thm-gbg10-basic-properties)を使った。$x,v,w$ が任意なので2形式として成立する。

行列群の場合は局所式でも確かめられる。$\beta=g^{-1}dg$、$C=g^{-1}Ag$ とおくと、積の外微分と $d(g^{-1})=-g^{-1}(dg)g^{-1}$ より

$$
dC=g^{-1}(dA)g-\beta\wedge C-C\wedge\beta.
$$

さらに $dg=g\beta$ から $d\beta=-\beta\wedge\beta$ が従う。これらを $A'=C+\beta$ に代入し、

$$
\begin{aligned}
dA'+A'\wedge A'
&=g^{-1}(dA)g-\beta C-C\beta-\beta^2\\
&\quad+C^2+C\beta+\beta C+\beta^2\\
&=g^{-1}(dA+A\wedge A)g.
\end{aligned}
$$

ここで積は全て行列係数の外積であり、順序は交換していない。両側の混合項がそれぞれ消えるので、$F'=g^{-1}Fg$ を得る。
<!-- proof-end -->

この定理の「共変」は「各成分が同一」を意味しない。$SU(2)$ の例のような非可換群では、同じ曲率が異なる局所行列で表される。

**非可換な変換の検算**。先の $A=Hdx+Xdy$ に $g(x,y)=e^{xH}$ を適用する。$X'=g^{-1}Xg$ と書けば $g^{-1}dg=Hdx$、$g^{-1}Hg=H$ なので

$$
A'=2H\,dx+X'\,dy,\qquad
\partial_xX'=-[H,X'].
$$

したがって

$$
dA'=-[H,X']\,dx\wedge dy,\quad
A'\wedge A'=2[H,X']\,dx\wedge dy,
$$

ゆえに

$$
F'=[H,X']\,dx\wedge dy
=g^{-1}[H,X]g\,dx\wedge dy.
$$

この例では $dA'$ も $A'\wedge A'$ も変換前とは異なるが、和は共役変換則を満たす。

## 5. 共変微分の交換子として曲率を測る

主束上の2形式 $\Omega$ と、結合束の場に働く微分は一見別物である。しかし[GBG9 の局所公式](../GBG9/index.md#thm-gbg9-local-formula)を二方向に重ねると、曲率がそのまま現れる。

ここで $X,Y$ は $U$ 上の滑らかなベクトル場、$u:U\to V$ は結合束切断の局所成分、$\rho:G\to GL_\mathbb F(V)$ は滑らかな有限次元表現とする。$D_Xu=X(u)+\rho_*(A(X))u$ と置く。$D_XD_Yu$ の意味は、成分を通常の関数として $X$ 方向に微分し接続補正を再び作用させることである。これは同じ局所表示を固定して行う計算であり、一般の $E$ 値1形式の全共変微分を新たに定義したものではない。

<a id="thm-gbg10-commutator"></a>

<!-- formal-statement-start -->
> **定理（共変微分の交換子と曲率）**  
> 滑らかな右主 $G$ 束の局所接続形式 $A$、滑らかな有限次元表現 $\rho$、滑らかな結合束切断の局所成分 $u$、局所ベクトル場 $X,Y$ に対して

$$
\boxed{\displaystyle
(D_XD_Y-D_YD_X-D_{[X,Y]})u
=\rho_*\bigl(F(X,Y)\bigr)u
}
$$

> が成り立つ。右辺は、曲率2形式を表現の無限小作用で $V$ 上の作用素に移したものである。
<!-- formal-statement-end -->

### 証明の見取り図

$B_X=\rho_*(A(X))$、$B_Y=\rho_*(A(Y))$ と書き、積の微分を順に展開する。$X(Yu)-Y(Xu)=[X,Y]u$ が打ち消され、残りは $X(B_Y)-Y(B_X)-B_{[X,Y]}+[B_X,B_Y]$ となる。$\rho_*$ が Lie 括弧を保つことから最後の行列交換子を曲率係数へまとめられる。

<!-- proof-start -->
### 証明

[GBG9 の表現の無限小作用](../GBG9/index.md#def-gbg9-infinitesimal-representation)は、滑らかな群準同型 $\rho:G\to GL_{\mathbb F}(V)$ を単位元で微分した写像である。[Lie群準同型の微分はLie環準同型](../../../代数系/LIE/LIE1/index.md#thm-lie1-homomorphism-differential)をこの $\rho$ に適用すると

$$
[\rho_*(\xi),\rho_*(\eta)]=\rho_*([\xi,\eta])
$$

が成り立つ。$B_X=\rho_*(A(X))$、$B_Y=\rho_*(A(Y))$ とすると、積の微分を省略せず展開して

$$
\begin{aligned}
D_X(D_Yu)
&=X(Yu+B_Yu)+B_X(Yu+B_Yu)\\
&=X(Yu)+X(B_Y)u+B_YX(u)+B_XY(u)+B_XB_Yu,\\
D_Y(D_Xu)
&=Y(Xu)+Y(B_X)u+B_XY(u)+B_YX(u)+B_YB_Xu.
\end{aligned}
$$

差を取ると、$u$ の一階微分を含む交差項は消え、

$$
(D_XD_Y-D_YD_X)u
=[X,Y]u+
\{X(B_Y)-Y(B_X)+[B_X,B_Y]\}u
$$

を得る。一方

$$
D_{[X,Y]}u=[X,Y]u+\rho_*(A([X,Y]))u.
$$

これを引き、$\rho_*$ の線形性と括弧保存性から

$$
\begin{aligned}
&(D_XD_Y-D_YD_X-D_{[X,Y]})u\\
&=\rho_*\bigl(X(A(Y))-Y(A(X))-A([X,Y])
 +[A(X),A(Y)]\bigr)u.
\end{aligned}
$$

外微分の定義より括弧内の最初の三項は $dA(X,Y)$、最後の項は $\frac12[A\wedge A](X,Y)$。従って括弧内は $F(X,Y)$ となる。
<!-- proof-end -->

**具体計算**。$G=U(1)$、$\rho_q(z)w=z^q w$（$q\in\mathbb Z$）、$A=ix\,dy$ とする。$D_x=\partial_x$、$D_y=\partial_y+iqx$ なので

$$
\begin{aligned}
D_xD_yu&=\partial_x\partial_yu+iqu+iqx\,\partial_xu,\\
D_yD_xu&=\partial_y\partial_xu+iqx\,\partial_xu.
\end{aligned}
$$

$\partial_x,\partial_y$ の括弧は零で、差は $iq\,u$ となる。先に得た $F(\partial_x,\partial_y)=i$ に $\rho_{q*}$ を適用しても $\rho_{q*}(i)u=iq\,u$。一致した。$q=0$ なら主束の曲率は非零でも、この自明表現の場からは曲率が見えない。**一つの表現に対する交換子が零でも主束の曲率そのものが零とは限らない**。

## 6. 演習と詳細解答

各問で特記しない限り、接続は右主束の規約とし、$F=dA+\frac12[A\wedge A]$、行列群では $F=dA+A\wedge A$ を用いる。

### Level A：構造方程式を手で扱う

<a id="ex-gbg10-a01"></a>
#### GBG10-A01 括弧付き外積の係数

- Level: A

$G=GL(2,\mathbb R)$、$B=E_{11}$、$C=E_{12}$、$A=Bdx+Cdy$ とする。$\frac12[A\wedge A](\partial_x,\partial_y)$ を定義から求めよ。$dA$ も求めよ。

<!-- solution-start -->
**詳細解答**。$A(\partial_x)=B$、$A(\partial_y)=C$、$BC=C$、$CB=0$。従って

$$
\frac12[A\wedge A](\partial_x,\partial_y)
=\frac12([B,C]-[C,B])=[B,C]=C.
$$

$B,C$ は定数なので、$dA=dB\wedge dx+dC\wedge dy=0$。従って $F=C\,dx\wedge dy$ であり、$dA$ だけからは曲率を得られない。
<!-- solution-end -->

<a id="ex-gbg10-a02"></a>
#### GBG10-A02 可換群の非零曲率

- Level: A

$U=\mathbb R^2$ 上の $U(1)$ 接続 $A=i(x^2dy+y\,dx)$ に対し $F$ を求め、$F(\partial_x,\partial_y)$ を書け。

<!-- solution-start -->
**詳細解答**。$U(1)$ の Lie 括弧は零なので $F=dA$。積の微分から

$$
d(i x^2dy)=2ix\,dx\wedge dy,\qquad
d(iy\,dx)=i\,dy\wedge dx=-i\,dx\wedge dy.
$$

ゆえに $F=i(2x-1)\,dx\wedge dy$ で、$F(\partial_x,\partial_y)=i(2x-1)$。点 $x=\frac12$ でのみ曲率が零になる。
<!-- solution-end -->

<a id="ex-gbg10-a03"></a>
#### GBG10-A03 水平括弧と符号

- Level: A

水平ベクトル場 $U,V$ があり $\omega(U)=\omega(V)=0$ とする。$d\omega(U,V)$ を外微分の定義から計算し、$\omega([U,V])$ と曲率の関係を導け。

<!-- solution-start -->
**詳細解答**。外微分の定義式に代入すると

$$
d\omega(U,V)=U(0)-V(0)-\omega([U,V])
=-\omega([U,V]).
$$

また $\frac12[\omega\wedge\omega](U,V)=[0,0]=0$。構造方程式により $\Omega(U,V)=-\omega([U,V])$。符号は外微分の第三項に由来するので、括弧の向きを勝手に逆にしない。
<!-- solution-end -->

<a id="ex-gbg10-a04"></a>
#### GBG10-A04 局所ゲージ変換の検算

- Level: A

$U=\mathbb R^2$、$G=U(1)$、$A=ix\,dy$、$g(x,y)=e^{i(x^2+y)}$ とする。$A'$ と $F'$ を別々に求め、$F'=F$ を確かめよ。

<!-- solution-start -->
**詳細解答**。[GBG8 の変換則](../GBG8/index.md#thm-gbg8-local-transform)から

$$
g^{-1}dg=i(2x\,dx+dy),\qquad
A'=2ix\,dx+i(x+1)\,dy.
$$

可換群なので $F'=dA'$ である。第一項は $d(2ix\,dx)=2i\,dx\wedge dx=0$、第二項は $d(i(x+1)dy)=i\,dx\wedge dy$。従って $F'=i\,dx\wedge dy=F$。位置依存の $g$ でも非斉次項は曲率から消える。
<!-- solution-end -->

<a id="ex-gbg10-a05"></a>
#### GBG10-A05 表現で見えなくなる曲率

- Level: A

$G=U(1)$、$A=ix\,dy$ とし、整数重み $q=0$ と $q=3$ の表現 $\rho_q(z)w=z^qw$ を考える。$\rho_{q*}(F(\partial_x,\partial_y))$ を求め、何が違うか説明せよ。

<!-- solution-start -->
**詳細解答**。$F(\partial_x,\partial_y)=i$。[GBG9 の無限小作用](../GBG9/index.md#def-gbg9-infinitesimal-representation)より

$$
\rho_{q*}(i)w=\left.\frac d{dt}\right|_0e^{iqt}w=iqw.
$$

$q=0$ では作用素は零、$q=3$ では $3i$ 倍となる。主束の同じ非零曲率も、自明表現の場の共変微分交換子には現れない。これは曲率が零になったことを意味しない。
<!-- solution-end -->

### Level B：二つの性質を同時に使う

<a id="ex-gbg10-b01"></a>
#### GBG10-B01 非可換補正が消せない例

- Level: B

$G=GL(2,\mathbb R)$、$U=\mathbb R^2$ 上で $A=E_{11}\,dx+E_{12}\,dy$ とする。$F$ を求めるとともに、$F=0$ を仮定した場合の水平括弧の性質がこの例で成立しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$A$ の係数は定数だから $dA=0$。しかし $E_{11}E_{12}=E_{12}$、$E_{12}E_{11}=0$ なので

$$
F=(E_{11}E_{12}-E_{12}E_{11})\,dx\wedge dy
=E_{12}\,dx\wedge dy\ne0.
$$

[曲率と水平ベクトル場の括弧](#thm-gbg10-horizontal-bracket)により、基底方向 $\partial_x,\partial_y$ の水平リフトに対して $\omega([\partial_x^H,\partial_y^H])=-F(\partial_x,\partial_y)=-E_{12}\ne0$（標準 section 上での値を同一視）。従って Lie 括弧には非零の垂直成分があり、水平に閉じない。破綻するのは、定数係数なら $dA=0$ だから平坦とみなす誤った推論である。
<!-- solution-end -->

<a id="ex-gbg10-b02"></a>
#### GBG10-B02 二方向の共変微分の差

- Level: B

$U=\mathbb R^2$、$G=U(1)$、$\rho_2(z)=z^2$、$A=iy\,dx$、$u(x,y)=x+y$ とする。$D_xD_yu-D_yD_xu$ を直接計算し、$\rho_{2*}(F(\partial_x,\partial_y))u$ と比較せよ。

<!-- solution-start -->
**詳細解答**。$D_x=\partial_x+2iy$、$D_y=\partial_y$。まず

$$
D_yu=1,\qquad D_x(D_yu)=D_x(1)=2iy.
$$

次に $D_xu=1+2iy(x+y)$ なので

$$
D_y(D_xu)=2i(x+y)+2iy.
$$

差は $-2i(x+y)$。一方 $F=d(iy\,dx)=i\,dy\wedge dx=-i\,dx\wedge dy$、従って

$$
\rho_{2*}(F(\partial_x,\partial_y))u
=\rho_{2*}(-i)(x+y)=-2i(x+y).
$$

双方が一致する。符号の決定には $dy\wedge dx=-dx\wedge dy$ を使う。
<!-- solution-end -->

<a id="ex-gbg10-b03"></a>
#### GBG10-B03 非可換ゲージ変換で二項を計算する

- Level: B

$U=\mathbb R^2$、$G=GL(2,\mathbb R)$、$B=E_{11}$、$C=E_{12}$、$A=B\,dx+C\,dy$、$g(x,y)=\operatorname{diag}(e^x,1)$ とする。$A'$、$dA'$、$A'\wedge A'$、$F'$ を計算して $F'=g^{-1}Fg$ を確かめよ。

<!-- solution-start -->
**詳細解答**。[GBG8 の変換則](../GBG8/index.md#thm-gbg8-local-transform)から $g^{-1}Bg=B$、$g^{-1}Cg=e^{-x}C$、$g^{-1}dg=B\,dx$。よって

$$
A'=2B\,dx+e^{-x}C\,dy.
$$

係数微分と交換子を分けると

$$
dA'=-e^{-x}C\,dx\wedge dy,
\qquad
A'\wedge A'=[2B,e^{-x}C]\,dx\wedge dy
=2e^{-x}C\,dx\wedge dy,
$$

従って $F'=e^{-x}C\,dx\wedge dy$。一方 $F=C\,dx\wedge dy$ なので $g^{-1}Fg=e^{-x}C\,dx\wedge dy$。各項は別々に変化するが和は共役変換した曲率と一致する。
<!-- solution-end -->

<a id="ex-gbg10-b04"></a>
#### GBG10-B04 曲率零と接続形式零を区別する

- Level: B

$U=\mathbb R^2$ の $U(1)$ 積主束で $A=i\,d(xy)=i(y\,dx+x\,dy)$ とする。(1) $F=0$ を計算せよ。(2) $g=e^{-ixy}$ として変換後 $A'$ を求めよ。(3) 最初から $A=0$ とした場合と同じ局所接続表示へ移せる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。(1) 可換群なので

$$
F=dA=i\{dy\wedge dx+dx\wedge dy\}=0.
$$

(2) $g^{-1}dg=-i\,d(xy)$ なので $A'=A+g^{-1}dg=0$。

(3) [GBG8 の局所変換則](../GBG8/index.md#thm-gbg8-local-transform)は同じ接続の section 変更を表す。今の $U$ では滑らかな $g$ が全域で定義され、変換後の表示が零になる。従って $A\ne0$ でもこの例の曲率は零であり、局所接続を純粋な section 変更で零にできる。ただし、一般の基底や非可換群で $F=0$ なら必ず大域的に $A=0$ とできる、という主張はこの計算からは出ない。
<!-- solution-end -->

### Level C：大域の定義から三つの意味をつなぐ

<a id="ex-gbg10-c01"></a>
#### GBG10-C01 曲率の水平性・変換則・場への作用

- Level: C

滑らかな右主 $G=GL(2,\mathbb R)$ 束 $P\to M$ の接続 $\omega$ を考える。二つの局所 section $s_1,s_2$ が重なり $U_{12}$ 上で $s_2=s_1g$ により関係するとし、標準表現 $\rho(g)v=gv$ の結合束 $E$ を考える。$A_i=s_i^*\omega$、$F_i=s_i^*\Omega$ とする。

1. $\Omega$ が垂直な入力を一つ持つと零になることを、基本ベクトル場と接続の再生・同変条件から導け。
2. $F_2=g^{-1}F_1g$ を示し、$s_2$ の微分に含まれる $dg$ が曲率へ追加の非斉次項を生まない理由を説明せよ。
3. 各局所成分 $u_2=g^{-1}u_1$ について、$[D_{i,X},D_{i,Y}]u_i-D_{i,[X,Y]}u_i=F_i(X,Y)u_i$ が二つのパッチで整合することを確かめよ。
4. $U_{12}=\mathbb R^2$、$A_1=B\,dx+C\,dy$、$B=E_{11}$、$C=E_{12}$、$g=\operatorname{diag}(e^x,1)$ としたとき、$u_1=(1,0)^{\mathsf T}$ に作用する曲率が零でも、$F_1$ 自身は非零であることを検算せよ。

<!-- solution-start -->
**詳細解答**。

**1. 水平性**。任意の $\xi\in\mathfrak{gl}_2$ に対し、接続の同変性を $g=e^{t\xi}$ で微分すると $\mathcal L_{\xi_P}\omega=-[\xi,\omega]$。再生条件は $\iota_{\xi_P}\omega=\xi$ なので $d(\iota_{\xi_P}\omega)=0$。Cartan の公式から

$$
d\omega(\xi_P,Z)=-[\xi,\omega(Z)].
$$

一方 $\frac12[\omega\wedge\omega](\xi_P,Z)=[\xi,\omega(Z)]$。和は零となる。垂直空間の任意の元は基本ベクトル場で表せるので、$\Omega$ は垂直入力を消す。

**2. パッチ変更**。$ds_2(v)$ と $(dR_g)ds_1(v)$ の差は同じファイバーの $g(x)$ の変化による垂直ベクトルだから、1の水平性によって $\Omega$ に代入しても寄与しない。右作用の同変性より

$$
F_2(v,w)
=\Omega_{s_1g}((dR_g)ds_1v,(dR_g)ds_1w)
=g^{-1}F_1(v,w)g.
$$

$\omega$ のときは $dg$ の補正が残るのに、$\Omega$ では垂直入力が消えることが違いである。

**3. 場への作用**。[GBG9 の場の成分変換](../GBG9/index.md#thm-gbg9-gauge-covariance)より $u_2=g^{-1}u_1$、$D_2u_2=g^{-1}D_1u_1$。交換子定理を各パッチで適用すると

$$
F_2(X,Y)u_2
=(g^{-1}F_1(X,Y)g)(g^{-1}u_1)
=g^{-1}F_1(X,Y)u_1.
$$

これは結合束の成分変換則と一致する。接続の非斉次変換を一方のパッチで無視したら、この整合は失われる。

**4. 作用素が場によって見えない場合**。$[B,C]=C$ なので $F_1=C\,dx\wedge dy\ne0$。しかし $u_1=(1,0)^{\mathsf T}$ に対し

$$
C u_1=
\begin{pmatrix}0&1\\0&0\end{pmatrix}
\begin{pmatrix}1\\0\end{pmatrix}
=\begin{pmatrix}0\\0\end{pmatrix}.
$$

従って $F_1(\partial_x,\partial_y)u_1=0$。第二パッチでも $F_2u_2=g^{-1}F_1u_1=0$。これは非零の行列が特定のベクトルを消すだけであり、行列 $F_1(\partial_x,\partial_y)=C$ 自身が零になったわけではない。全てのベクトルへ作用させて零であることと、一つの場で零になることを区別する。
<!-- solution-end -->

## 7. 次に何ができるようになったか

曲率には同じ幾何を表す三つの顔がある。

- **主束上**：$\Omega=d\omega+\frac12[\omega\wedge\omega]$ は水平・右作用に同変な大域2形式。
- **局所ゲージ**：$F=dA+\frac12[A\wedge A]$ は $F'=\operatorname{Ad}_{g^{-1}}F$ と変換する。
- **場への作用**：$D_XD_Y-D_YD_X-D_{[X,Y]}=\rho_*(F(X,Y))$ は二方向の微分が交換できない量である。

$U(1)$ では括弧の補正が消えるが、非可換群では定数係数の接続でも曲率が出る。次の **GBG11「Bianchi恒等式はどこから生じるか」** では、これらの式を微分したときの整合条件を調べる。
