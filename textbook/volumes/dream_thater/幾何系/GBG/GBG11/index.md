# GBG11 Bianchi恒等式はどこから生じるか

[GBG10の曲率の構造方程式](../GBG10/index.md#def-gbg10-curvature)は、接続1形式の外微分から曲率2形式を作った。

$$
\Omega=d\omega+\frac12[\omega\wedge\omega],
\qquad
F=dA+\frac12[A\wedge A].
$$

曲率をもう一度外微分すると何が起こるだろうか。通常の2形式なら $d^2=0$ がある。しかし非可換な係数では $dF$ が零とは限らない。接続 $A$ の分だけ補正した微分を用いると、**曲率自身には必ず成り立つ整合条件**が現れる。これが Bianchi 恒等式である。

**全節の設定と規約**：$M$ は Hausdorff・第二可算・境界のない有限次元滑らかな多様体、$G$ は有限次元 Lie 群、$\mathfrak g$ はその Lie 環とする。$\pi:P\to M$ は滑らかな右主 $G$ 束、$\omega\in\Omega^1(P;\mathfrak g)$ は[GBG7の接続1形式](../GBG7/index.md#def-gbg7-connection-form)、$\Omega$ はその曲率である。局所 section $s:U\to P$ に関して $A=s^*\omega$、$F=s^*\Omega$ と書く。係数 Lie 括弧の規約は行列群で $[X,Y]=XY-YX$ とし、右主作用の局所変換は $s'=sg$ である。以下の式に計量・向き・基底の次元制限は不要である。

<!-- definition-example-audit: strict -->

---

## 1. なぜ普通の外微分では足りないのか

[GBG10の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)を行列群で書くと $F=dA+A\wedge A$ である。外微分の積の公式を使えば

$$
dF=d(A\wedge A)=dA\wedge A-A\wedge dA.
$$

右辺は一般に零ではない。$d^2A=0$ なのに $dF\ne0$ が起こるのは、$A\wedge A$ の中に行列の積が残るからである。

一方、接続 $A$ を使って場を微分するときは [GBG9の局所公式](../GBG9/index.md#thm-gbg9-local-formula) の $D=d+\rho_*(A)$ を使った。曲率についても、係数の共役変換に対応する補正が必要になる。

### 形式の次数と括弧の符号を決める

Lie 環値 $p$ 形式 $\alpha$ と $q$ 形式 $\beta$ の**括弧付き外積**を、成分に Lie 括弧を施して交代化した $(p+q)$ 形式とする。これは[既習の括弧付き外積](../../../代数系/LIE/LIE4/index.md#def-lie4-bracket-wedge)を任意の次数へ拡張したものである。$p=1,q=2$ で必要な具体式は

$$
[\alpha\wedge\beta](X,Y,Z)
=[\alpha(X),\beta(Y,Z)]
+[\alpha(Y),\beta(Z,X)]
+[\alpha(Z),\beta(X,Y)].
$$

一般に、交代化の符号を入れ替えると

$$
[\alpha\wedge\beta]=-(-1)^{pq}[\beta\wedge\alpha],
$$

また外微分の積の公式は

$$
d[\alpha\wedge\beta]
=[d\alpha\wedge\beta]+(-1)^p[\alpha\wedge d\beta].
$$

次数 $p=1,q=2$ の場合は $[\alpha\wedge\beta]=-[\beta\wedge\alpha]$ となる。行列値形式では係数の順序を保つ通常の外積を使い、

$$
[\alpha\wedge\beta]
=\alpha\wedge\beta-(-1)^{pq}\beta\wedge\alpha
$$

と書ける。**括弧付き外積と行列積の外積は同じ演算ではない**。特に $p=1,q=1$ では $[\alpha\wedge\alpha]=2\alpha\wedge\alpha$ である。

上の次数符号は、たとえば $A=B\,dx$、$F=C\,dy\wedge dz$ の場合に直接確かめられる。

$$
[A\wedge F](\partial_x,\partial_y,\partial_z)=[B,C],
\qquad
[F\wedge A](\partial_x,\partial_y,\partial_z)=[C,B]=-[B,C].
$$

この二つの順序を取り違えると、次の恒等式は成立しなくなる。

## 2. 共変外微分を定義する

まず主束上で、どの形式に微分を作用させるかを明示する。$\mathfrak g$ 値 $k$ 形式 $\eta$ が**水平**であるとは、入力に垂直接ベクトルが一つでも入れば零になること、**随伴同変**であるとは $R_g^*\eta=\operatorname{Ad}_{g^{-1}}\eta$ を満たすことをいう。[GBG10の曲率の基本性質](../GBG10/index.md#thm-gbg10-basic-properties)から、$\Omega$ はこの両方を満たす。

水平・同変な形式を普通に外微分すると、一般には水平性が保たれない。そこで $\omega$ による補正を加える。

<a id="def-gbg11-covariant-exterior-derivative"></a>

<!-- formal-statement-start -->
> **定義（主束上の共変外微分）**  
> 滑らかな右主 $G$ 束 $P\to M$ と接続 $\omega$ を固定する。水平かつ随伴同変な $\mathfrak g$ 値 $k$ 形式 $\eta\in\Omega^k(P;\mathfrak g)$ に対し、$(k+1)$ 形式を

$$
\boxed{\displaystyle d_\omega\eta=d\eta+[\omega\wedge\eta]}
$$

> と定める。この演算を**共変外微分**という。$k=0$ の場合の水平性は自動的に成立し、$[\omega\wedge\eta](X)=[\omega(X),\eta]$ と読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg11-covariant-exterior-derivative -->
**定義の直接例**。積主束 $P=\mathbb R^3\times U(1)$、標準 section $s$、$A=i x\,dy$ とする。$U(1)$ は可換なので任意の Lie 環値形式について括弧付き外積が零となる。水平・同変な形式 $\eta$ の場合

$$
d_\omega\eta=d\eta.
$$

例えば $\eta=\pi^*(ix\,dy\wedge dz)$ とすれば、$\eta$ は垂直入力を消し、随伴作用が自明なので同変である。$\pi^*$ と $d$ の交換性から

$$
d_\omega\eta=d\eta=i\,dx\wedge dy\wedge dz
$$

（右辺は $\pi^*$ を省略）となる。共変外微分は任意の入力形式を零にする演算ではない。
<!-- definition-example-end -->

### 補正項が水平性を回復する

<a id="thm-gbg11-covariant-preserves"></a>

<!-- formal-statement-start -->
> **定理（共変外微分の水平性と同変性）**  
> $P\to M$ を上記の滑らかな右主 $G$ 束、$\omega$ を主束接続1形式とする。$\eta\in\Omega^k(P;\mathfrak g)$ が水平かつ随伴同変なら、$d_\omega\eta$ も水平かつ随伴同変である。
<!-- formal-statement-end -->

**証明の見取り図**。垂直な基本ベクトル場 $\xi_P$ を一つ代入する。通常の $d\eta$ には同変性から $-[\xi,\eta]$ が出るが、補正項には $+[\xi,\eta]$ が出て相殺する。右作用に対する同変性は、外微分と Lie 括弧が固定された随伴作用と交換することから従う。

<!-- proof-start -->
### 証明

$\xi\in\mathfrak g$ を固定する。$P$ 上の基本ベクトル場 $\xi_P$ の流れは右作用 $R_{\exp(t\xi)}$ である。$\eta$ の随伴同変性を $t=0$ で微分すると

$$
\mathcal L_{\xi_P}\eta=-[\xi,\eta].
$$

$\eta$ の水平性から $\iota_{\xi_P}\eta=0$。そこで[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)を各 Lie 環成分に適用して

$$
\iota_{\xi_P}d\eta
=\mathcal L_{\xi_P}\eta-d(\iota_{\xi_P}\eta)
=-[\xi,\eta].
$$

他方、括弧付き外積へ $\xi_P$ を代入する。$\omega(\xi_P)=\xi$ は[GBG7の再生条件](../GBG7/index.md#def-gbg7-connection-form)であり、残りの項には $\eta$ への垂直入力が現れるので零になる。従って

$$
\iota_{\xi_P}[\omega\wedge\eta]=[\xi,\eta],
\qquad
\iota_{\xi_P}d_\omega\eta=0.
$$

垂直接空間は基本ベクトル場の値で尽くされる（[GBG6の垂直同型](../GBG6/index.md#thm-gbg6-vertical-fundamental)）。よって任意の垂直入力で零となる。

また $g\in G$ を固定すると、引き戻しと外微分は交換する。随伴作用は Lie 括弧を保存し、[GBG7の接続の同変性](../GBG7/index.md#def-gbg7-connection-form)によって

$$
\begin{aligned}
R_g^*(d_\omega\eta)
&=d(R_g^*\eta)+[R_g^*\omega\wedge R_g^*\eta]\\
&=d(\operatorname{Ad}_{g^{-1}}\eta)
 +[\operatorname{Ad}_{g^{-1}}\omega\wedge\operatorname{Ad}_{g^{-1}}\eta]\\
&=\operatorname{Ad}_{g^{-1}}(d\eta+[\omega\wedge\eta]).
\end{aligned}
$$

したがって $d_\omega\eta$ も随伴同変である。
<!-- proof-end -->

## 3. Bianchi 恒等式：曲率の共変外微分は零

曲率は水平・同変だから、今定義した $d_\omega$ を $\Omega$ に作用させられる。すると接続に何の特別な曲率条件も課さず、次の恒等式が成り立つ。

<a id="thm-gbg11-bianchi-global"></a>

<!-- formal-statement-start -->
> **定理（第二 Bianchi 恒等式・大域形式）**  
> 滑らかな右主 $G$ 束 $P\to M$ 上の任意の主束接続 $\omega$ と、その曲率 $\Omega=d\omega+\frac12[\omega\wedge\omega]$ に対し、

$$
\boxed{\displaystyle d_\omega\Omega
=d\Omega+[\omega\wedge\Omega]=0}
$$

> が $P$ 上の $\mathfrak g$ 値3形式として恒等的に成立する。平坦性 $\Omega=0$ は仮定しない。
<!-- formal-statement-end -->

**証明の見取り図**。構造方程式を外微分する。$d^2\omega=0$ を使い、次数 $1$ と $2$ に対する括弧付き外積の符号を整理する。残る三重 Lie 括弧は Jacobi 恒等式で消える。

<!-- proof-start -->
### 証明

[GBG10の構造方程式](../GBG10/index.md#def-gbg10-curvature)を微分すると、$d^2\omega=0$ と外微分の積の公式により

$$
\begin{aligned}
d\Omega
&=d(d\omega)+\frac12d[\omega\wedge\omega]\\
&=\frac12\bigl([d\omega\wedge\omega]-[\omega\wedge d\omega]\bigr).
\end{aligned}
$$

$d\omega$ の次数は $2$、$\omega$ の次数は $1$。次数付き反対称性から

$$
[d\omega\wedge\omega]
=-(-1)^{2\cdot1}[\omega\wedge d\omega]
=-[\omega\wedge d\omega],
$$

したがって

$$
d\Omega=-[\omega\wedge d\omega].
$$

次に共変外微分の補正項へ構造方程式を代入する。

$$
\begin{aligned}
[\omega\wedge\Omega]
&=[\omega\wedge d\omega]
+\frac12[\omega\wedge[\omega\wedge\omega]],\\
d_\omega\Omega
&=\frac12[\omega\wedge[\omega\wedge\omega]].
\end{aligned}
$$

最後の3形式が零である理由を成分で確かめる。$U,V,W\in T_pP$ に対して、括弧付き外積の定義から

$$
\begin{aligned}
&[\omega\wedge[\omega\wedge\omega]](U,V,W)\\
&=2\bigl(
[\omega(U),[\omega(V),\omega(W)]]
+[\omega(V),[\omega(W),\omega(U)]]
+[\omega(W),[\omega(U),\omega(V)]]
\bigr)=0.
\end{aligned}
$$

最後の等号は Lie 環の Jacobi 恒等式そのものである。従って $d_\omega\Omega=0$。
<!-- proof-end -->

注意すべき点は、$d_\omega$ は一般の微分形式に対して $d_\omega^2=0$ となる演算ではないことだ。Bianchi 恒等式は特に**接続から作った曲率**に対する恒等式であり、任意の2形式 $\eta$ に対して $d_\omega\eta=0$ と主張するものではない。

## 4. 局所形 $dF+[A\wedge F]=0$ と行列計算

局所 section に引き戻すことで $P$ 上の式を $U\subset M$ 上で計算できる。まず局所での演算を明示する。

<a id="def-gbg11-local-covariant-exterior"></a>

<!-- formal-statement-start -->
> **定義（局所共変外微分）**  
> $U\subset M$ 上の $\mathfrak g$ 値1形式 $A$ と $\mathfrak g$ 値 $k$ 形式 $K$ に対して

$$
\boxed{\displaystyle d_AK=dK+[A\wedge K]}
$$

> と定める。$K$ が随伴束値形式の局所成分であるとき、この式がその共変外微分の局所表示になる。行列群では $d_AK=dK+A\wedge K-(-1)^kK\wedge A$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg11-local-covariant-exterior -->
**定義の直接例**。$U=\mathbb R^3$、$\mathfrak g=\mathfrak{gl}_2(\mathbb R)$、$B=E_{11}$、$C=E_{12}$ とし、$A=B\,dx$、$K=C\,dy\wedge dz$ とする。$dK=0$ だが $[B,C]=C$ なので

$$
d_AK=[B,C]\,dx\wedge dy\wedge dz
=C\,dx\wedge dy\wedge dz\ne0.
$$

局所共変外微分は外微分に非可換な補正を加える演算である。ここでは $K$ は任意の2形式であって、この接続の曲率ではない。
<!-- definition-example-end -->

<a id="thm-gbg11-bianchi-local"></a>

<!-- formal-statement-start -->
> **定理（第二 Bianchi 恒等式・局所形式）**  
> $P\to M$、$\omega$、$s:U\to P$ を前節と同様に取る。$A=s^*\omega$ と $F=s^*\Omega$ に対し

$$
\boxed{\displaystyle d_AF=dF+[A\wedge F]=0}
$$

> が成立する。特に $G$ が行列群なら

$$
\boxed{\displaystyle dF+A\wedge F-F\wedge A=0},
\qquad F=dA+A\wedge A.
$$
<!-- formal-statement-end -->

**証明の見取り図**。大域 Bianchi 恒等式を引き戻す方法と、行列外積で各項を相殺する方法の二通りで検算する。

<!-- proof-start -->
### 証明

まず[大域 Bianchi 恒等式](#thm-gbg11-bianchi-global)の両辺に $s^*$ を施す。引き戻しは外微分、括弧付き外積と交換し、$s^*\omega=A$、$s^*\Omega=F$ だから

$$
\begin{aligned}
0=s^*(d_\omega\Omega)
&=s^*(d\Omega)+s^*[\omega\wedge\Omega]\\
&=d(s^*\Omega)+[s^*\omega\wedge s^*\Omega]\\
&=dF+[A\wedge F]=d_AF.
\end{aligned}
$$

次に行列群で直接確かめる。[局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula) $F=dA+A\wedge A$ から、$d^2A=0$ と外微分の積の公式により

$$
dF=dA\wedge A-A\wedge dA.
$$

$F$ の次数は $2$ なので、括弧付き外積は $[A\wedge F]=A\wedge F-F\wedge A$。よって

$$
\begin{aligned}
[A\wedge F]
&=A\wedge(dA+A\wedge A)
 -(dA+A\wedge A)\wedge A\\
&=A\wedge dA-dA\wedge A
 +(A\wedge A)\wedge A-A\wedge(A\wedge A)\\
&=A\wedge dA-dA\wedge A.
\end{aligned}
$$

最後の二項は**行列積の結合則**により等しい。$dF$ と加えるとすべて相殺して零になる。ここでは $A$ と $dA$ の順序を交換していない。
<!-- proof-end -->

### 非可換で $dF\ne0$ になる具体例

$U=\mathbb R^3$、$G=GL(2,\mathbb R)$、$H=E_{11}$、$X=E_{12}$ とおき、積主束上の局所接続を

$$
A=zH\,dx+X\,dy
$$

とする。$HX=X$、$XH=0$ だから $[H,X]=X$ である。まず

$$
dA=H\,dz\wedge dx,\qquad
A\wedge A=z[H,X]\,dx\wedge dy=zX\,dx\wedge dy,
$$

従って

$$
F=H\,dz\wedge dx+zX\,dx\wedge dy.
$$

ここから

$$
dF=X\,dz\wedge dx\wedge dy
=X\,dx\wedge dy\wedge dz\ne0.
$$

一方、$[A\wedge F](\partial_x,\partial_y,\partial_z)$ を成分ごとに計算すると

$$
\begin{aligned}
[A\wedge F](\partial_x,\partial_y,\partial_z)
&=[A_x,F_{yz}]+[A_y,F_{zx}]+[A_z,F_{xy}]\\
&=[zH,0]+[X,H]+[0,zX]\\
&=-X.
\end{aligned}
$$

したがって

$$
dF+[A\wedge F]
=X\,dx\wedge dy\wedge dz-X\,dx\wedge dy\wedge dz=0.
$$

非可換な場合に正しいのは $dF=0$ ではなく **$d_AF=0$** である。

## 5. 座標成分とゲージ選択に依らないこと

局所座標 $(x^1,\ldots,x^n)$ を使い、$A=A_i\,dx^i$、$F=\frac12F_{ij}\,dx^i\wedge dx^j$ と書く。ここで $F_{ji}=-F_{ij}$ であり、添字 $i,j$ を重複して書くときは総和する。

<a id="thm-gbg11-component-bianchi"></a>

<!-- formal-statement-start -->
> **定理（Bianchi 恒等式の成分表示）**  
> 上記の滑らかな行列群の局所接続について

$$
F_{ij}=\partial_iA_j-\partial_jA_i+[A_i,A_j]
$$

> とおく。$D_iK=\partial_iK+[A_i,K]$ を Lie 環値係数 $K$ への随伴共変微分とすると、任意の $i,j,k$ に対して

$$
\boxed{\displaystyle D_iF_{jk}+D_jF_{ki}+D_kF_{ij}=0}
$$

> が成立する。これが $d_AF=0$ の座標成分表示である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

外微分の定義から、$dF$ の $(i,j,k)$ 成分は

$$
(dF)_{ijk}
=\partial_iF_{jk}+\partial_jF_{ki}+\partial_kF_{ij}.
$$

また1形式と2形式の括弧付き外積の式を適用すると

$$
[A\wedge F]_{ijk}
=[A_i,F_{jk}]+[A_j,F_{ki}]+[A_k,F_{ij}].
$$

両辺を足し、[局所 Bianchi 恒等式](#thm-gbg11-bianchi-local)を使えば成分公式を得る。微分が交換できる滑らかな局所座標であり、$F_{ij}$ は交代的であることが使われている。

直接展開しても検算できる。$F_{jk}=\partial_jA_k-\partial_kA_j+[A_j,A_k]$ を代入すると、二階微分は $\partial_i\partial_jA_k-\partial_j\partial_iA_k$ の形で打ち消される。一階微分と括弧の項は

$$
\partial_i[A_j,A_k]
-[A_j,\partial_iA_k]+[A_k,\partial_iA_j]=0
$$

という組を巡回的に作って相殺する。最後に残る三重括弧

$$
[A_i,[A_j,A_k]]+[A_j,[A_k,A_i]]+[A_k,[A_i,A_j]]=0
$$

は Jacobi 恒等式で消える。
<!-- proof-end -->

この式は一般の曲線座標や共変基底の Levi–Civita 微分を導入する必要のない、座標接ベクトル $\partial_i$ に関する表示である。

### ゲージを替えても同じ恒等式

[GBG8の局所接続の変換則](../GBG8/index.md#thm-gbg8-local-transform)および[GBG10の曲率の変換則](../GBG10/index.md#thm-gbg10-gauge-transform)は、行列群では

$$
A'=g^{-1}Ag+g^{-1}dg,\qquad F'=g^{-1}Fg
$$

である。$dF'=0$ は $dF=0$ と同じ意味を持つとは限らない。一方、補正を入れた演算は次のように変換する。

<a id="thm-gbg11-gauge-covariance"></a>

<!-- formal-statement-start -->
> **定理（局所共変外微分のゲージ共変性）**  
> $G\subset GL(N,\mathbb F)$ を行列 Lie 群、$A$ をその Lie 環値局所接続、$g:U\to G$ を滑らかなゲージ関数とする。$K\in\Omega^k(U;\mathfrak g)$ の変換を $K'=g^{-1}Kg$ とすれば

$$
\boxed{\displaystyle d_{A'}K'=g^{-1}(d_AK)g}
$$

> である。特に $K=F$ の場合、Bianchi 恒等式はどの局所 section でも同じ幾何学的主張になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\beta=g^{-1}dg$、$C=g^{-1}Ag$ とおき、$A'=C+\beta$ と書く。$d(g^{-1})=-g^{-1}(dg)g^{-1}$ と次数 $k$ の Leibniz 則より

$$
dK'
=g^{-1}(dK)g-\beta\wedge K'
+(-1)^kK'\wedge\beta.
$$

また $[A'\wedge K']=C\wedge K'-(-1)^kK'\wedge C+\beta\wedge K'-(-1)^kK'\wedge\beta$ なので、$\beta$ を含む四項が対になって消える。残りは

$$
\begin{aligned}
d_{A'}K'
&=g^{-1}(dK)g+C\wedge K'-(-1)^kK'\wedge C\\
&=g^{-1}\{dK+A\wedge K-(-1)^kK\wedge A\}g\\
&=g^{-1}(d_AK)g.
\end{aligned}
$$

行列の積の順序と形式の次数符号の双方が必要である。
<!-- proof-end -->

## 6. 演習：構造方程式から三次の整合性へ

### Level A：定義と符号を自力で確かめる

<a id="ex-gbg11-a01"></a>
#### GBG11-A01 次数付き括弧の符号

- Level: A

$\mathfrak g=\mathfrak{gl}_2(\mathbb R)$、$B=E_{11}$、$C=E_{12}$、$\alpha=B\,dx$、$\beta=C\,dy\wedge dz$ とする。$[\alpha\wedge\beta]$、$[\beta\wedge\alpha]$ を求め、反対称性の次数符号を確認せよ。

<!-- solution-start -->
**詳細解答**。$BC=C$、$CB=0$ より $[B,C]=C$。したがって

$$
[\alpha\wedge\beta]=C\,dx\wedge dy\wedge dz.
$$

反対向きは、$(dy\wedge dz)\wedge dx=dx\wedge dy\wedge dz$ だが、係数の Lie 括弧が逆順になるので

$$
[\beta\wedge\alpha]=[C,B]\,dy\wedge dz\wedge dx=-C\,dx\wedge dy\wedge dz.
$$

次数は $1$ と $2$ だから $-(-1)^{1\cdot2}=-1$。計算は $[\alpha\wedge\beta]=-[\beta\wedge\alpha]$ と一致する。
<!-- solution-end -->

<a id="ex-gbg11-a02"></a>
#### GBG11-A02 0形式の共変外微分

- Level: A

$A=B\,dx$、$\phi(x,y)=yC$ とする。$d_A\phi$ を求めよ。ただし $B=E_{11}$、$C=E_{12}$ である。

<!-- solution-start -->
**詳細解答**。$\phi$ は0形式なので $d_A\phi=d\phi+[A,\phi]$。まず $d\phi=C\,dy$。次に $[B,yC]=y[B,C]=yC$ だから

$$
d_A\phi=yC\,dx+C\,dy.
$$

これは1形式であり、$\phi$ の通常の外微分 $C\,dy$ とは一般に異なる。
<!-- solution-end -->

<a id="ex-gbg11-a03"></a>
#### GBG11-A03 可換な接続での Bianchi 恒等式

- Level: A

$\mathbb R^3$ 上の $U(1)$ 接続 $A=i(x\,dy+y\,dz)$ を考える。$F$、$d_AF$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$U(1)$ は可換だから $F=dA$ であり、

$$
F=i(dx\wedge dy+dy\wedge dz).
$$

係数は一定なので $dF=0$。さらに $[A\wedge F]=0$ だから

$$
d_AF=dF+[A\wedge F]=0.
$$

ここでは $dF=0$ という強い式も成り立つが、それは Lie 環が可換だからである。
<!-- solution-end -->

<a id="ex-gbg11-a04"></a>
#### GBG11-A04 2次元に3形式はあるか

- Level: A

滑らかな2次元多様体上の任意の接続 $A$ と曲率 $F$ について、$d_AF=0$ が形式次数だけから成立する理由を述べよ。これだけで非可換な3次元の場合も証明できるだろうか。

<!-- solution-start -->
**詳細解答**。$F$ は2形式なので $d_AF$ は3形式である。2次元の接空間には線形独立な3本のベクトルがなく、交代的な3形式の値は必ず零になる。よって $d_AF=0$。

しかし3次元では $dx\wedge dy\wedge dz\ne0$ なので次数だけでは零といえない。実際に第4節の例では $dF\ne0$ となり、$[A\wedge F]$ との相殺を計算しなければならない。
<!-- solution-end -->

### Level B：非可換な相殺と一般の係数

<a id="ex-gbg11-b01"></a>
#### GBG11-B01 三次元で二項が別々に非零

- Level: B

$B=E_{11}$、$C=E_{12}$、$A=zB\,dx+C\,dy$ とする。$dF$ と $[A\wedge F]$ の双方を、$F=dA+A\wedge A$ から独立に計算して Bianchi 恒等式を確かめよ。

<!-- solution-start -->
**詳細解答**。$[B,C]=C$ を使い、まず

$$
dA=B\,dz\wedge dx,\qquad
A\wedge A=zC\,dx\wedge dy,
$$

なので

$$
F=B\,dz\wedge dx+zC\,dx\wedge dy.
$$

外微分は

$$
dF=C\,dz\wedge dx\wedge dy=C\,dx\wedge dy\wedge dz.
$$

括弧付き外積は成分表示を用いて

$$
\begin{aligned}
[A\wedge F]_{xyz}
&=[A_x,F_{yz}]+[A_y,F_{zx}]+[A_z,F_{xy}]\\
&=[zB,0]+[C,B]+[0,zC]=-C.
\end{aligned}
$$

よって $d_AF=(C-C)\,dx\wedge dy\wedge dz=0$。両項が零だから成立するのではなく、逆符号で打ち消される。
<!-- solution-end -->

<a id="ex-gbg11-b02"></a>
#### GBG11-B02 成分公式を直接展開する

- Level: B

$U\subset\mathbb R^3$ で $A_i$ が滑らかな行列値関数とする。$F_{ij}=\partial_iA_j-\partial_jA_i+[A_i,A_j]$ を用い、$D_1F_{23}+D_2F_{31}+D_3F_{12}=0$ を Jacobi 恒等式まで展開して証明せよ。

<!-- solution-start -->
**詳細解答**。$D_iF_{jk}=\partial_iF_{jk}+[A_i,F_{jk}]$ を代入する。二階微分の和は

$$
\partial_1\partial_2A_3-\partial_1\partial_3A_2
+\partial_2\partial_3A_1-\partial_2\partial_1A_3
+\partial_3\partial_1A_2-\partial_3\partial_2A_1=0
$$

である。一階微分に関する項は、例えば $A_2,A_3$ を微分する部分だけを集めると

$$
\partial_1[A_2,A_3]-[A_2,\partial_1A_3]+[A_3,\partial_1A_2]=0
$$

となる。積の微分の公式

$$
\partial_1[A_2,A_3]=[\partial_1A_2,A_3]+[A_2,\partial_1A_3]
$$

と Lie 括弧の反対称性を使った。他の添字 $2,3$ の微分についても同じ形で消える。残る項は

$$
[A_1,[A_2,A_3]]+[A_2,[A_3,A_1]]+[A_3,[A_1,A_2]]=0
$$

であり、Jacobi 恒等式から零である。
<!-- solution-end -->

<a id="ex-gbg11-b03"></a>
#### GBG11-B03 ゲージ変換後の共変微分

- Level: B

$G=GL(2,\mathbb R)$、$A=B\,dx$、$\phi=C$、$g=\operatorname{diag}(e^x,1)$、$B=E_{11}$、$C=E_{12}$ とする。$A'$、$\phi'$、$d_{A'}\phi'$ を求め、$g^{-1}(d_A\phi)g$ と一致することを示せ。

<!-- solution-start -->
**詳細解答**。[GBG8の変換則](../GBG8/index.md#thm-gbg8-local-transform)を使う。$g^{-1}Bg=B$、$g^{-1}dg=B\,dx$ なので

$$
A'=2B\,dx,\qquad \phi'=g^{-1}Cg=e^{-x}C.
$$

$\phi'$ の外微分と括弧を別々に計算すると

$$
d\phi'=-e^{-x}C\,dx,\qquad
[A',\phi']=2e^{-x}[B,C]\,dx=2e^{-x}C\,dx.
$$

ゆえに $d_{A'}\phi'=e^{-x}C\,dx$。元の $d_A\phi=[B,C]\,dx=C\,dx$ を共役変換しても $g^{-1}(d_A\phi)g=e^{-x}C\,dx$ となる。
<!-- solution-end -->

<a id="ex-gbg11-b04"></a>
#### GBG11-B04 任意の2形式に Bianchi を適用してよいか

- Level: B

$\mathbb R^3$ 上で $A=B\,dx$、$K=C\,dy\wedge dz$ とする。$B=E_{11}$、$C=E_{12}$ である。$d_AK$ を求め、$K$ がこの $A$ の曲率ではないことを確かめよ。

<!-- solution-start -->
**詳細解答**。$K$ の係数は一定なので $dK=0$。しかし $[B,C]=C$ だから

$$
d_AK=[A\wedge K]=C\,dx\wedge dy\wedge dz\ne0.
$$

一方 $dA=0$、$A\wedge A=B^2dx\wedge dx=0$ なので、この $A$ の曲率は $F=0$。従って $K\ne F$ であり、[Bianchi 恒等式](#thm-gbg11-bianchi-local)は $d_AK=0$ を要求しない。必要な仮定は「$K$ が同じ接続の曲率であること」である。
<!-- solution-end -->

### Level C：大域から局所、成分、ゲージまで

<a id="ex-gbg11-c01"></a>
#### GBG11-C01 Bianchi 恒等式を三つの表示でつなぐ

- Level: C

滑らかな右主 $G=GL(2,\mathbb R)$ 束 $P\to M$ と主束接続 $\omega$ を考える。$s_1,s_2:U\to P$ は $s_2=s_1g$ を満たし、$A_a=s_a^*\omega$、$F_a=s_a^*\Omega$（$a=1,2$）とする。

1. $\Omega$ が水平・随伴同変である事実を使い、$d_\omega\Omega$ が定義できる理由を述べ、$d_\omega\Omega=0$ を次数付き括弧と Jacobi 恒等式から証明せよ。
2. 各パッチで $dF_a+[A_a\wedge F_a]=0$ を導き、$D_iF_{jk}$ の巡回和に直せ。
3. $A_2=g^{-1}A_1g+g^{-1}dg$ と $F_2=g^{-1}F_1g$ から、$d_{A_2}F_2=g^{-1}(d_{A_1}F_1)g$ を示せ。
4. $\mathbb R^3$ の $A_1=zE_{11}\,dx+E_{12}\,dy$ で、$dF_1$ と $[A_1\wedge F_1]$ が両方非零だが和は零になることを検算せよ。

<!-- solution-start -->
**詳細解答**。

**1. 大域の式**。[GBG10の水平性・同変性](../GBG10/index.md#thm-gbg10-basic-properties)より、$\Omega$ は[本章の共変外微分](#def-gbg11-covariant-exterior-derivative)の定義域にある。構造方程式を微分すると

$$
d\Omega=\frac12\{[d\omega\wedge\omega]-[\omega\wedge d\omega]\}
=-[\omega\wedge d\omega].
$$

そこで

$$
d_\omega\Omega
=-[\omega\wedge d\omega]
+[\omega\wedge d\omega]
+\frac12[\omega\wedge[\omega\wedge\omega]].
$$

三重括弧を三方向 $U,V,W$ に評価すると $2$ 倍の三項巡回 Jacobi 和になり、零となる。曲率が零であるとの仮定は使っていない。

**2. 局所と座標**。$s_a^*d=d\,s_a^*$ および括弧付き外積と引き戻しの交換性を用い、

$$
s_a^*(d_\omega\Omega)
=dF_a+[A_a\wedge F_a]=0.
$$

座標で $A_a=A_{a,i}\,dx^i$、$F_a=\tfrac12F_{a,ij}\,dx^i\wedge dx^j$ と書くと、$(i,j,k)$ 成分は

$$
\partial_iF_{a,jk}+\partial_jF_{a,ki}+\partial_kF_{a,ij}
+[A_{a,i},F_{a,jk}]+[A_{a,j},F_{a,ki}]+[A_{a,k},F_{a,ij}]=0.
$$

これを $D_{a,i}K=\partial_iK+[A_{a,i},K]$ でまとめると巡回和の式になる。

**3. パッチ変換**。$\beta=g^{-1}dg$、$C=g^{-1}A_1g$ とする。$F_2=g^{-1}F_1g$ の外微分は、次数が2なので

$$
dF_2=g^{-1}(dF_1)g-\beta\wedge F_2+F_2\wedge\beta.
$$

$[A_2\wedge F_2]=(C+\beta)\wedge F_2-F_2\wedge(C+\beta)$ を足せば $\beta$ 項は消え、$g^{-1}(dF_1+A_1\wedge F_1-F_1\wedge A_1)g$ が残る。したがって第2パッチでも零である。

**4. 非可換の検算**。$B=E_{11},C=E_{12}$ とおくと $[B,C]=C$。[局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)から

$$
F_1=B\,dz\wedge dx+zC\,dx\wedge dy.
$$

ゆえに $dF_1=C\,dx\wedge dy\wedge dz$。括弧の $(x,y,z)$ 成分は $[C,B]=-C$ なので

$$
[A_1\wedge F_1]=-C\,dx\wedge dy\wedge dz.
$$

二項はともに非零だが $d_{A_1}F_1=0$。この例は、非可換な Bianchi 恒等式を単なる $dF=0$ へ置き換えられないことも示す。
<!-- solution-end -->

## 7. 次に何ができるようになったか

曲率の構造方程式から、補正を伴う微分 $d_\omega$ を構成し、曲率の3形式の整合条件を導いた。

$$
d_\omega\Omega=0,\qquad
d_AF=0,\qquad
D_iF_{jk}+D_jF_{ki}+D_kF_{ij}=0.
$$

この三つは大域・局所・座標という同じ等式の異なる姿である。$U(1)$ では $dF=0$ に戻るが、非可換群では共変外微分の補正が本質的になる。次の **GBG12「接続は存在するか、二つの接続の差は何か」** では、接続を一つ選ぶことから、接続全体の空間を調べる問いへ進む。
