# HOD1-06 Kähler多様体のHodge分解

<!-- definition-example-audit: strict -->

## 1. 調和形式の直和を、コホモロジーの直和へ移すには

前章では、[Kähler多様体の調和形式が$(p,q)$型ごとに分解すること](../HOD1-05/index.md#thm-hod1-05-harmonic-types)を示した。しかし、単に微分形式が各型へ分かれるだけでは、閉形式を完全形式で割った **de Rhamコホモロジー** も型ごとに分かれるとは限らない。一般に、閉じた形式の各型成分はそれぞれ閉じているとは限らないからである。

ここで使えるのが[閉多様体のHodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)である。各de Rham類から**一意な調和代表**を取り出せば、その代表は型ごとに分解できる。一方、[Dolbeaultコホモロジー](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)では、$\bar\partial$閉形式を$\bar\partial$完全形式で割る。二つの商空間を結ぶには、Dolbeault類も調和代表を一意に持つことを証明する必要がある。

本章では次の三段階を順に確かめる。

1. 実Hodge理論の調和射影とGreen作用素が、Kähler条件の下で型を保つ。
2. $\bar\partial$閉形式の類が一意な調和$(p,q)$形式で代表される。
3. その調和代表を経由して、de RhamコホモロジーをDolbeault群の直和と同定する。

以下、$X$は複素次元$n\ge1$の**滑らか・コンパクト・境界なしのKähler多様体**とする。連結性は仮定しない。複素構造は向きを与える。微分形式は滑らかな複素数値形式、$L^2$内積は第一変数を共役線形とし、$k$は$0\le k\le2n$の整数とする。

[複素型の直交分解](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)に従い、$k$形式の$(p,q)$成分を取り出す直交射影を$\pi_{p,q}$と記す（$p+q=k$）。[型別調和形式](../HOD1-05/index.md#def-hod1-05-harmonic-pq)の空間は$\mathcal H^{p,q}(X)$、全次数の調和空間は$\mathcal H^k(X)$である。微分作用素は

$$
\Delta_d=dd^*+d^*d,\qquad
\Delta_{\bar\partial}=\bar\partial\bar\partial^*+\bar\partial^*\bar\partial
$$

とし、[Kähler上の等式](../HOD1-05/index.md#thm-hod1-05-laplacian-equality) $\Delta_d=2\Delta_{\bar\partial}$を使用する。コンパクト性はここから先で、積分・スペクトル分解・Green作用素の存在に必要となる。

## 2. Green作用素も型を混ぜない

[GA6のHodge Green作用素](../../GA/GA6/index.md#def-ga6-green-operator)は、Laplacianの零固有空間では零とし、正固有空間では固有値で割る作用素だった。これを複素数値形式へ**複素線形**に延長したものを次数$k$で$G_k$と記す。$P_k$を$\mathcal H^k(X)$への$L^2$直交射影とすると、[GA6のHodge分解](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)から滑らかな形式$\alpha$について

$$
\Delta_dG_k\alpha=\alpha-P_k\alpha,
\qquad P_kG_k\alpha=0
$$

が成り立ち、$G_k\alpha$は滑らかである。ただし$G_k$の定義はこの二式だけでなく、正固有空間上の逆作用素であることを含む。次の補題では、まず$P_k$、次に$G_k$の型保存を一意性から示す。

<a id="lem-hod1-06-green-types"></a>

<!-- formal-statement-start -->
> **補題（調和射影とGreen作用素の型保存）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とする。各$k$と$p+q=k$について、$\pi_{p,q}$を型射影、$P_k$を$\ker\Delta_d$への直交射影、$G_k$をHodge Green作用素とする。このとき滑らかな複素$k$形式上で

$$
P_k\pi_{p,q}=\pi_{p,q}P_k,
\qquad G_k\pi_{p,q}=\pi_{p,q}G_k.
$$

> 特に$P_k$と$G_k$は$(p,q)$形式を同じ型へ写す。
<!-- formal-statement-end -->

### 証明の見取り図

[調和形式の型別直和](../HOD1-05/index.md#thm-hod1-05-harmonic-types)と型の直交性から、調和空間への射影は型を保つ。次に、純型の入力に対する$G_k$の**別の型**を取り出すと、その型はLaplacianの核に入り、同時に核へ直交する。この二条件は零しか許さない。

<!-- proof-start -->
### 証明

任意の滑らかな$k$形式を$\alpha=\sum_{r+s=k}\alpha^{r,s}$と書く。[調和形式の型分解](../HOD1-05/index.md#thm-hod1-05-harmonic-types)は、$\mathcal H^k(X)=\bigoplus_{r+s=k}\mathcal H^{r,s}(X)$であり、異なる型は直交する。従って$\mathcal H^{r,s}$への直交射影を$P_{r,s}$とすれば

$$
P_k\alpha=\sum_{r+s=k}P_{r,s}\alpha^{r,s},
\qquad P_{r,s}\alpha^{r,s}\in\Omega^{r,s}(X).
$$

すなわち$\pi_{p,q}P_k\alpha=P_{p,q}\alpha^{p,q}=P_k\pi_{p,q}\alpha$で、最初の等式が従う。

次に純型$\alpha\in\Omega^{p,q}(X)$を固定し、$u=G_k\alpha$とする。[Greenの逆作用式](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)と今示した射影の型保存より

$$
\Delta_du=\alpha-P_k\alpha\in\Omega^{p,q}(X),
\qquad u\perp\mathcal H^k(X).
$$

[Laplacianの型保存](../HOD1-05/index.md#thm-hod1-05-harmonic-types)を用いて$u=\sum_{r+s=k}u^{r,s}$を型別に射影すると、$(r,s)\ne(p,q)$の成分は

$$
\Delta_du^{r,s}=\pi_{r,s}(\alpha-P_k\alpha)=0.
$$

他方、$u\perp\mathcal H^k$と型の直交性より、各$u^{r,s}$は同じ型の調和空間に直交する。従って$u^{r,s}$は調和で、かつ自分自身に直交し、$\|u^{r,s}\|_2^2=0$。よって$u^{r,s}=0$である。つまり$G_k\alpha=u^{p,q}$は純型。一般の$\alpha$へ線形に拡張すれば二番目の交換関係を得る。$\square$
<!-- proof-end -->

これでGreen作用素を型ごとに制限できる。ところが、Dolbeault側のLaplacianは$\Delta_d/2$なので、その逆作用素は$G_k$そのものではなく**2倍**である。

<a id="def-hod1-06-dolbeault-green"></a>

<!-- formal-statement-start -->
> **定義（型別Green作用素）**
> 複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体$X$と$0\le p,q\le n$について、$k=p+q$と置く。$G_k$を複素線形Hodge Green作用素とし、$(p,q)$形式に作用する**型別Green作用素**を

$$
G_{\bar\partial}^{p,q}\alpha=2G_k\alpha,
\qquad \alpha\in\Omega^{p,q}(X)
$$

> と定める。$P_{p,q}$を$\mathcal H^{p,q}(X)$への直交射影とすると、滑らかな$(p,q)$形式で

$$
\Delta_{\bar\partial}G_{\bar\partial}^{p,q}\alpha
=\alpha-P_{p,q}\alpha,
\qquad P_{p,q}G_{\bar\partial}^{p,q}\alpha=0.
$$
<!-- formal-statement-end -->

ここで後半二式が定義に整合するのは、[三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)を使って

$$
\Delta_{\bar\partial}(2G_k\alpha)
=\tfrac12\Delta_d(2G_k\alpha)
=\alpha-P_k\alpha
=\alpha-P_{p,q}\alpha
$$

と計算できるためである。射影への直交性は直前の補題から従う。

<!-- definition-example-start: def-hod1-06-dolbeault-green -->
**定義の確認**（非零周波数と零周波数）。平坦トーラス$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$で$f(x,y)=e^{i(x+2y)}$とする。[平坦Fourierモードの固有値](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)は$\Delta_df=5f$、$\Delta_{\bar\partial}f=\tfrac52f$である。$f$は零平均なので$P_{0,0}f=0$、従って

$$
G_0f=\frac15f,\qquad
G_{\bar\partial}^{0,0}f=\frac25f,
\qquad \Delta_{\bar\partial}\left(\frac25f\right)=f.
$$

一方、定数関数$1$は調和で$P_{0,0}1=1$、$G_{\bar\partial}^{0,0}1=0$。上式の右辺は$1-P_{0,0}1=0$となる。正固有・零固有の双方で条件を確認した。
<!-- definition-example-end -->

## 3. Dolbeault類にも一意な調和代表がある

[Dolbeault群の定義](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)では$\bar\partial\alpha=0$を要求し、$\alpha$と$\alpha+\bar\partial v$を同じ類とする。上で構成した型別Green作用素を使えば、各閉形式から調和成分を引き出せる。

<a id="thm-hod1-06-dolbeault-harmonic"></a>

<!-- formal-statement-start -->
> **定理（Dolbeaultコホモロジーの調和代表）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とする。各$0\le p,q\le n$で、調和$(p,q)$形式のDolbeault類を取る写像

$$
\mathcal H^{p,q}(X)\longrightarrow
H_{\bar\partial}^{p,q}(X),\qquad
h\longmapsto[h]_{\bar\partial}
$$

> は複素線形同型である。特に任意のDolbeault類は**ちょうど一つ**の調和代表を持ち、群$H_{\bar\partial}^{p,q}(X)$は有限次元となる。
<!-- formal-statement-end -->

### 証明の見取り図

$\bar\partial$閉形式に$\Delta_{\bar\partial}G_{\bar\partial}=I-P$を当てると、調和・$\bar\partial$完全・$\bar\partial^*$完全の三成分が得られる。最後の成分が零になるのは、閉性と随伴関係で**自分自身のノルム**を零と評価できるからである。一意性も調和形式と完全形式の直交性から従う。

<!-- proof-start -->
### 証明

まず写像の定義を確認する。[調和形式の閉・余閉判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)から、$h\in\mathcal H^{p,q}(X)$なら$\bar\partial h=\bar\partial^*h=0$。よって$[h]_{\bar\partial}$は定義できる。

**全射。** $[\alpha]_{\bar\partial}\in H_{\bar\partial}^{p,q}(X)$の滑らかな代表$\alpha$を一つ選ぶ。$\bar\partial\alpha=0$である。$h=P_{p,q}\alpha$、$u=G_{\bar\partial}^{p,q}\alpha$とし、[型別Green作用素の定義](#def-hod1-06-dolbeault-green)と$\Delta_{\bar\partial}=\bar\partial\bar\partial^*+\bar\partial^*\bar\partial$を代入すると

$$
\begin{aligned}
\alpha&=h+\Delta_{\bar\partial}u\\
&=h+\bar\partial(\bar\partial^*u)
  +\bar\partial^*(\bar\partial u).
\end{aligned}
$$

最後の項を$r=\bar\partial^*(\bar\partial u)$と書く。これは$(p,q)$形式である。$\bar\partial^2=0$、$\bar\partial h=0$、$\bar\partial\alpha=0$から、上の等式に$\bar\partial$を作用させれば

$$
0=\bar\partial\alpha=\bar\partial r.
$$

$u$は[Green作用素の正則性](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)により滑らかなので、コンパクト境界なしの$X$で[型別形式的随伴](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)を積分に使える。$v=\bar\partial u$とおけば$r=\bar\partial^*v$だから

$$
\|r\|_2^2=(r,\bar\partial^*v)_2
=(\bar\partial r,v)_2=0.
$$

従って$r=0$。$\eta=\bar\partial^*u\in\Omega^{p,q-1}(X)$（$q=0$なら零）と置けば

$$
\alpha=h+\bar\partial\eta,
\qquad [\alpha]_{\bar\partial}=[h]_{\bar\partial}.
$$

これでどの類にも調和代表が存在する。

**単射と一意性。** $h\in\mathcal H^{p,q}$がDolbeaultで零類なら、ある$\eta\in\Omega^{p,q-1}$で$h=\bar\partial\eta$と書ける。随伴関係と$\bar\partial^*h=0$から

$$
\|h\|_2^2=(h,\bar\partial\eta)_2
=(\bar\partial^*h,\eta)_2=0.
$$

よって$h=0$。二つの調和代表の差が完全形式なら同じ計算で差は零となるので一意。有限次元性は[Hodge Laplacianの有限次元核](../../GA/GA6/index.md#thm-ga6-finite-harmonic)から$\mathcal H^{p,q}\subset\mathcal H^{p+q}$として従う。$\square$
<!-- proof-end -->

**小さな応用。** $\bar\partial\alpha=0$のとき、調和代表は計算可能な形で$h=P_{p,q}\alpha$と得られる。しかも$\alpha-h=\bar\partial\bar\partial^*G_{\bar\partial}^{p,q}\alpha$であり、原始形式の候補まで明示できた。後続で大域$\partial\bar\partial$-補題を考える際にも、このように調和成分と完全成分を別々に見る。

## 4. de Rhamの型部分空間を作る

次は$\bar\partial$でなく$d$を使ったコホモロジーである。[実Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)は実係数で証明されているが、複素形式$\alpha=u+iv$を実部$u$と虚部$v$へ分けて各々に適用すれば、複素係数でも同型

$$
\mathcal H^k(X)\xrightarrow{\sim}
H_{\mathrm{dR}}^k(X;\mathbb C),\qquad h\longmapsto[h]_d
$$

が得られる。Laplacianの係数は実数であるため$u,v$の調和性は複素化と両立し、存在・一意性も実部と虚部でそれぞれ成り立つ。

そこで、任意のde Rham類を型で分けるには、その一意な調和代表の型を使うのが自然である。$\mathcal H^{p,q}$の元はコンパクトKähler上で$d$閉なので、de Rham類を作れる。

<a id="def-hod1-06-hodge-summand"></a>

<!-- formal-statement-start -->
> **定義（de RhamコホモロジーのHodge型部分空間）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とし、$0\le p,q\le n$、$k=p+q$とする。複素de Rhamコホモロジー$H_{\mathrm{dR}}^k(X;\mathbb C)$の**Hodge型$(p,q)$部分空間**を

$$
H_{\mathrm{Hdg}}^{p,q}(X)
=\{[h]_d:\ h\in\mathcal H^{p,q}(X)\}
\subset H_{\mathrm{dR}}^k(X;\mathbb C)
$$

> と定める。この部分空間と、商として定義した$H_{\bar\partial}^{p,q}(X)$は、最初から同じ集合とはしない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-06-hodge-summand -->
**定義の確認**（楕円曲線の二つの型）。$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$の標準平坦計量で、$dz=dx+i\,dy$と$d\bar z=dx-i\,dy$はそれぞれ$(1,0)$型、$(0,1)$型で、係数一定だから$d$と$d^*$の双方で零となる。従って$\Delta_d dz=\Delta_d d\bar z=0$である。

$x$方向の基本閉路$\gamma_x$と$y$方向の基本閉路$\gamma_y$について

$$
\begin{pmatrix}
\int_{\gamma_x}dz&\int_{\gamma_x}d\bar z\\
\int_{\gamma_y}dz&\int_{\gamma_y}d\bar z
\end{pmatrix}
=\begin{pmatrix}2\pi&2\pi\\2\pi i&-2\pi i\end{pmatrix},
\qquad \det=-8\pi^2i\ne0.
$$

両形式は閉で非完全かつde Rham類が一次独立なので、$[dz]_d$と$[d\bar z]_d$は、それぞれ異なるHodge型部分空間の非零元となる。型、調和性、de Rham類の非零性の三条件をそれぞれ検証した。
<!-- definition-example-end -->

## 5. Kähler多様体のHodge分解

ここまでの道具をつなぐ。重要なのは、各形式の型を切り出すだけでなく、**コホモロジー類の唯一の調和代表を先に選ぶ**ことである。

<a id="thm-hod1-06-hodge-decomposition"></a>

<!-- formal-statement-start -->
> **定理（コンパクトKähler多様体のHodge分解）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とする。任意の$0\le k\le2n$に対し、複素de RhamコホモロジーはHodge型部分空間の内部直和

$$
\boxed{H_{\mathrm{dR}}^k(X;\mathbb C)
=\bigoplus_{p+q=k}H_{\mathrm{Hdg}}^{p,q}(X)}
$$

> に一意に分解し、各成分はDolbeault群と複素線形同型を持つ。従って

$$
\boxed{H_{\mathrm{dR}}^k(X;\mathbb C)
\cong\bigoplus_{p+q=k}H_{\bar\partial}^{p,q}(X)}.
$$

> ここでDolbeault類からde Rham類への対応は、**一意な調和代表を経由する対応**である。非Kähler・非コンパクト・境界ありの場合への主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[GA6の同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)を複素化し、[前章の調和形式の型別直和](../HOD1-05/index.md#thm-hod1-05-harmonic-types)を挟み、最後に[本章のDolbeault調和代表定理](#thm-hod1-06-dolbeault-harmonic)を型ごとに使う。どの矢印も同型であり、途中の型別和は一意なので、de Rham側でも直和となる。

<!-- proof-start -->
### 証明

複素係数への拡張を確認した[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)で、任意の閉$k$形式$\alpha$の類には唯一の調和代表$h$がある。$[\alpha]_d=[h]_d$と書く。[調和形式の型分解](../HOD1-05/index.md#thm-hod1-05-harmonic-types)より

$$
h=\sum_{p+q=k}h^{p,q},\qquad
h^{p,q}\in\mathcal H^{p,q}(X).
$$

各$h^{p,q}$は[閉・余閉判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)によって$d$閉である。ゆえに

$$
[\alpha]_d=[h]_d
=\sum_{p+q=k}[h^{p,q}]_d,
\qquad [h^{p,q}]_d\in H_{\mathrm{Hdg}}^{p,q}(X).
$$

これが全体を生成することを示す。直和性について、各$h^{p,q}$が調和で、$\sum_{p+q=k}[h^{p,q}]_d=0$とする。その和$h=\sum h^{p,q}$も調和でde Rham零類を表す。[GA6同型の単射性](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)で$h=0$。型分解の一意性から各$h^{p,q}=0$、従って全ての類が零である。よって内部直和が成立する。

最後に各$(p,q)$について、$h\mapsto[h]_d$は$\mathcal H^{p,q}\to H_{\mathrm{Hdg}}^{p,q}$の同型（定義上の全射と、GA6同型からの単射）であり、[Dolbeault調和代表定理](#thm-hod1-06-dolbeault-harmonic)も$h\mapsto[h]_{\bar\partial}$として同型である。従って

$$
H_{\mathrm{Hdg}}^{p,q}(X)
\xleftarrow{\ \sim\ }\mathcal H^{p,q}(X)
\xrightarrow{\ \sim\ }H_{\bar\partial}^{p,q}(X)
$$

を型ごとに合成して第二の直和同型が得られる。固定した計量に対して調和代表は一意なので、代表元の任意の選択には依存しない。$\square$
<!-- proof-end -->

実際、$[\alpha]_d$の型$(p,q)$成分は、閉形式の表示を選んでその型をそのまま取るのではなく

$$
[\alpha]_d\longmapsto[\pi_{p,q}P_k\alpha]_d
$$

で得られる。$P_k\alpha$はde Rham類の一意な調和代表だから、$\alpha$を完全形式だけ変えても値は変わらない。

**注意：Dolbeault代表元をそのまま写してはいけない。** 平坦楕円曲線で$u(x,y)=\cos x$とすると、$\alpha=\bar\partial u=-\tfrac12\sin x\,d\bar z$はDolbeaultの零類だが

$$
d\alpha=\partial\bar\partial u
=-\frac14\cos x\,dz\wedge d\bar z\ne0.
$$

従って$[\alpha]_d$はそもそも定義できない。この類の調和代表は$0$であり、正しい対応は$0\mapsto[0]_d$である。次章では、この直和からHodge数の対称性とBetti数の制約を導く。

## 6. 演習：調和代表を経由して類を分解する

### Level A：射影・係数・閉性を確認する

<a id="ex-hod1-06-a01"></a>
#### HOD1-06-A01 調和射影の型成分
- Level: A

コンパクト境界なしのKähler多様体$X$上の滑らかな複素2形式$\alpha=\alpha^{2,0}+\alpha^{1,1}+\alpha^{0,2}$を考える。$P_2$をHodge Laplacianの核への直交射影とする。$P_2\alpha$の$(1,1)$成分を式で表し、その根拠を説明せよ。

<!-- solution-start -->
### 詳細解答

[調和空間の型別直和](../HOD1-05/index.md#thm-hod1-05-harmonic-types)は、$\mathcal H^2=\mathcal H^{2,0}\oplus\mathcal H^{1,1}\oplus\mathcal H^{0,2}$である。[複素型の直交性](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)により、$\alpha^{2,0}$と$\alpha^{0,2}$は$(1,1)$調和形式に直交する。ゆえに$(1,1)$成分に寄与するのは$\alpha^{1,1}$だけである。

$$
\pi_{1,1}P_2\alpha=P_2\pi_{1,1}\alpha
=P_2\alpha^{1,1}=P_{1,1}\alpha^{1,1}.
$$

最初の等号は[型保存補題](#lem-hod1-06-green-types)、最後の$P_{1,1}$は$\mathcal H^{1,1}$への直交射影を表す。異なる型の成分が射影で混ざらないことまで示した。
<!-- solution-end -->

<a id="ex-hod1-06-a02"></a>
#### HOD1-06-A02 型別Green作用素の係数2
- Level: A

標準平坦トーラス$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$に$dx^2+dy^2$の計量を入れる。$f(x,y)=e^{i(2x+y)}$について、$G_0f$と$G_{\bar\partial}^{0,0}f$を求め、$\Delta_{\bar\partial}G_{\bar\partial}^{0,0}f=f-P_{0,0}f$を確認せよ。

<!-- solution-start -->
### 詳細解答

[平坦トーラスの固有値](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)では、$r=2,s=1$として$\Delta_df=(r^2+s^2)f=5f$、$\Delta_{\bar\partial}f=(5/2)f$である。$f$は非零Fourierモードなので定数調和成分はなく$P_{0,0}f=0$。[Green作用素の定義](../../GA/GA6/index.md#def-ga6-green-operator)で正固有値$5$を逆にして

$$
G_0f=\frac15f,
\qquad G_{\bar\partial}^{0,0}f=2G_0f=\frac25f.
$$

最後に固有値$5/2$を掛ければ

$$
\Delta_{\bar\partial}G_{\bar\partial}^{0,0}f
=\frac25\cdot\frac52f=f=f-P_{0,0}f.
$$

$G_0$だけを使うと$f/2$になって失敗する。係数2は[Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)の逆を取ることで生じる。
<!-- solution-end -->

<a id="ex-hod1-06-a03"></a>
#### HOD1-06-A03 調和かつbar∂完全なら零
- Level: A

$X$を滑らか・コンパクト・境界なしのKähler多様体とする。$h\in\mathcal H^{p,q}(X)$が$h=\bar\partial\eta$（$\eta\in\Omega^{p,q-1}(X)$）と書けるなら$h=0$を証明せよ。

<!-- solution-start -->
### 詳細解答

[調和性の閉・余閉判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)により$\bar\partial^*h=0$である。$X$はコンパクト境界なしなので、[型別随伴の積分関係](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)を境界項なしで使える。

$$
\begin{aligned}
\|h\|_2^2
&=(h,h)_2=(h,\bar\partial\eta)_2\\
&=(\bar\partial^*h,\eta)_2=(0,\eta)_2=0.
\end{aligned}
$$

内積の正定値性と滑らかさから$h=0$。これは[調和代表同型](#thm-hod1-06-dolbeault-harmonic)の単射性の核心である。
<!-- solution-end -->

<a id="ex-hod1-06-a04"></a>
#### HOD1-06-A04 純型でd閉でも調和とは限らない
- Level: A

コンパクトKähler多様体上の純$(p,q)$形式$\beta$について、$d\beta=0$なら$\partial\beta=\bar\partial\beta=0$となる理由を述べよ。さらに平坦楕円曲線$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$上で$u=\cos x$、$\beta=\partial\bar\partial u$と置き、$d\beta=0$でも$\beta$は調和でないことを示せ。

<!-- solution-start -->
### 詳細解答

[$d=\partial+\bar\partial$の型別分解](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)から、$d\beta=\partial\beta+\bar\partial\beta$で、二項はそれぞれ$(p+1,q)$型、$(p,q+1)$型となる。異なる型の直和は一意なので、和が零なら両方零である。

例では$\partial_z=\tfrac12(\partial_x-i\partial_y)$、$\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$を使う。[型別微分の局所式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)を$u$に適用すると

$$
\bar\partial u=-\frac12\sin x\,d\bar z,
\qquad \beta=\partial\bar\partial u
=-\frac14\cos x\,dz\wedge d\bar z.
$$

$\beta$は$(1,1)$型で非零。$T$は複素次元1なのでその上には次数3の形式がなく$d\beta=0$である。他方

$$
\beta=d(\bar\partial u)
$$

は$d$完全でもある。もし$\beta$が調和なら[Hodge–de Rham同型の単射性](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)によって$\beta=0$となり、上の非零式と矛盾する。従って**閉性だけでは調和性は保証されない**。
<!-- solution-end -->

### Level B：代表元・完全性・型をつなぐ

<a id="ex-hod1-06-b01"></a>
#### HOD1-06-B01 Dolbeault零類ではない代表元もd閉とは限らない
- Level: B

平坦楕円曲線$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$上で$u=\cos x$、$\alpha=d\bar z+\bar\partial u$とする。$\alpha$が$\bar\partial$閉であること、$[\alpha]_{\bar\partial}=[d\bar z]_{\bar\partial}\ne0$であること、$d\alpha\ne0$であることをそれぞれ証明せよ。$\alpha$の調和代表も求めよ。

<!-- solution-start -->
### 詳細解答

[二重複体の二乗零](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)により、$\bar\partial(d\bar z)=0$かつ$\bar\partial^2u=0$なので$\bar\partial\alpha=0$。二つの形式の差は$\bar\partial u$だから[Dolbeault商の判定](../../CM/CM2-04/index.md#prop-cm2-04-quotient)によって

$$
[\alpha]_{\bar\partial}=[d\bar z]_{\bar\partial}.
$$

$d\bar z$は定数係数の$(0,1)$調和形式なので、[調和代表の単射性](#thm-hod1-06-dolbeault-harmonic)により非零のDolbeault類を定める。よって$\alpha$の調和代表も$d\bar z$である。一方、$d(d\bar z)=0$、$d\bar\partial u=\partial\bar\partial u$より

$$
d\alpha=-\frac14\cos x\,dz\wedge d\bar z\ne0.
$$

従って$[\alpha]_d$という式は定義できない。正しいHodge型$(0,1)$のde Rham類は、調和代表を通した$[d\bar z]_d$である。
<!-- solution-end -->

<a id="ex-hod1-06-b02"></a>
#### HOD1-06-B02 d閉形式の型成分はd閉とは限らない
- Level: B

同じ平坦楕円曲線$T$上で$f=\cos x$、$\beta=df$とする。$\beta$の$(1,0)$成分と$(0,1)$成分を計算し、それぞれが$d$閉かどうか調べよ。$[\beta]_d$とHodge分解の関係も述べよ。

<!-- solution-start -->
### 詳細解答

$df=-\sin x\,dx$、$dx=\tfrac12(dz+d\bar z)$だから

$$
\beta^{1,0}=-\frac12\sin x\,dz=\partial f,
\qquad \beta^{0,1}=-\frac12\sin x\,d\bar z=\bar\partial f.
$$

まず$\partial^2f=\bar\partial^2f=0$だが、交差する微分は消えない。[局所式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)で係数を微分すると

$$
\begin{aligned}
d\beta^{1,0}
&=\bar\partial\partial f
=-\tfrac14\cos x\,d\bar z\wedge dz
=\tfrac14\cos x\,dz\wedge d\bar z,\\
d\beta^{0,1}
&=\partial\bar\partial f
=-\tfrac14\cos x\,dz\wedge d\bar z.
\end{aligned}
$$

どちらも非零だが、和は零なので$d\beta=d^2f=0$。$\beta=df$は完全形式で$[\beta]_d=0$。その一意な調和代表は$0$であり、[Hodge分解定理](#thm-hod1-06-hodge-decomposition)は**調和代表の型成分**を使うので、閉でない$\beta^{1,0},\beta^{0,1}$に類を付ける必要はない。
<!-- solution-end -->

<a id="ex-hod1-06-b03"></a>
#### HOD1-06-B03 実一次類の二つのHodge成分
- Level: B

平坦楕円曲線$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$で、$a,b\in\mathbb R$とし$\alpha=a\,dx+b\,dy$とする。$\alpha$が調和であることを確かめ、$[\alpha]_d$の$(1,0)$成分と$(0,1)$成分を求めよ。二成分が複素共役であることも確認せよ。

<!-- solution-start -->
### 詳細解答

$\alpha$は大域的な定数係数1形式なので$d\alpha=0$。平坦計量の余微分も定数係数形式に零として作用するから$d^*\alpha=0$、従って$\Delta_d\alpha=0$。[型分解の基底](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)を使い

$$
dx=\frac{dz+d\bar z}{2},\qquad
dy=\frac{dz-d\bar z}{2i}
$$

を代入すると

$$
\alpha=\underbrace{\frac{a-ib}{2}dz}_{(1,0)\text{型}}
+\underbrace{\frac{a+ib}{2}d\bar z}_{(0,1)\text{型}}.
$$

両方の成分も係数一定で調和だから、[Hodge分解](#thm-hod1-06-hodge-decomposition)のde Rham成分は

$$
[\alpha]_d
=\left[\frac{a-ib}{2}dz\right]_d
+\left[\frac{a+ib}{2}d\bar z\right]_d.
$$

$a,b$は実数なので、第一の形式を複素共役すると第二の形式になる。二つは互いに独立なHodge型の部分空間に入り、$a=b=0$のときに限り両方零になる。
<!-- solution-end -->

<a id="ex-hod1-06-b04"></a>
#### HOD1-06-B04 bar∂閉形式をGreenで解く
- Level: B

標準平坦楕円曲線$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$で$\alpha=e^{ix}\,d\bar z$とする。$\alpha$が$\bar\partial$閉であることを確かめ、$P_{0,1}\alpha$、$G_{\bar\partial}^{0,1}\alpha$および$\eta=\bar\partial^*G_{\bar\partial}^{0,1}\alpha$を求め、$\alpha=\bar\partial\eta$を検算せよ。

<!-- solution-start -->
### 詳細解答

$\alpha$は複素次元1の$(0,1)$形式なので、$\bar\partial\alpha$は型$(0,2)$となり零である。一方、$e^{ix}$は非零Fourierモードなので$P_{0,1}\alpha=0$。[平坦Laplacianの固有値](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)は次数によらずこの定数余標構の係数に作用し、$\Delta_d\alpha=1\cdot\alpha$を与える。従って

$$
G_{\bar\partial}^{0,1}\alpha=2G_1\alpha=2\alpha.
$$

Euclid計量では$\bar\partial f=\frac12(\partial_x+i\partial_y)f\,d\bar z$であり、$\|d\bar z\|^2=2$なので、部分積分して得る随伴の係数式は

$$
\bar\partial^*(g\,d\bar z)
=-(\partial_x-i\partial_y)g.
$$

これに$g=2e^{ix}$を代入すると

$$
\eta=\bar\partial^*(2e^{ix}\,d\bar z)
=-2i e^{ix}.
$$

最後に

$$
\bar\partial\eta
=-2i\cdot\frac{i}{2}e^{ix}\,d\bar z
=e^{ix}\,d\bar z=\alpha.
$$

この例では調和成分は零なので、実際にDolbeault零類であり、[調和代表定理の構成](#thm-hod1-06-dolbeault-harmonic)が原始形式を計算して与えている。
<!-- solution-end -->

### Level C：全次数の直和を例で統合する

<a id="ex-hod1-06-c01"></a>
#### HOD1-06-C01 複素二次元トーラスの二次Hodge分解
- Level: C

$T=\mathbb C^2/(2\pi\mathbb Z+2\pi i\mathbb Z)^2$に標準平坦Kähler計量を入れる。$z^j=x_j+i y_j$（$j=1,2$）とし、滑らかな複素2形式

$$
\alpha=dz^1\wedge dz^2
+dz^1\wedge d\bar z^2
+d\bar z^1\wedge d\bar z^2
+d(\cos x_1\,dy_2)
$$

を考える。$d\alpha=0$を確認し、調和代表とその$(2,0)$、$(1,1)$、$(0,2)$成分を求めよ。さらに$\mathcal H^{2,0}(T)$、$\mathcal H^{1,1}(T)$、$\mathcal H^{0,2}(T)$の複素次元を計算し、$\dim_{\mathbb C}H_{\mathrm{dR}}^2(T;\mathbb C)$と照合せよ。

<!-- solution-start -->
### 詳細解答

まず$dz^j,d\bar z^j$は大域的な閉1形式なので、先頭の楔積三項の外微分はすべて零。末尾は外微分の二乗零から$d^2(\cos x_1\,dy_2)=0$であり、$d\alpha=0$である。

平坦トーラス上の定数係数形式は$d$と$d^*$の両方で零なので調和である。また[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)の単射性により、調和形式への直交射影は完全形式を零へ写す。従って$P_2\bigl(d(\cos x_1\,dy_2)\bigr)=0$。直接確かめるなら

$$
d(\cos x_1\,dy_2)=-\sin x_1\,dx_1\wedge dy_2
$$

は定数係数余標構に対する非零周波数だけを持ち、零周波数の調和成分を持たない。よって調和代表は

$$
h=dz^1\wedge dz^2
+dz^1\wedge d\bar z^2
+d\bar z^1\wedge d\bar z^2.
$$

各項の型を判定すると

$$
\begin{aligned}
h^{2,0}&=dz^1\wedge dz^2,\\
h^{1,1}&=dz^1\wedge d\bar z^2,\\
h^{0,2}&=d\bar z^1\wedge d\bar z^2.
\end{aligned}
$$

これらはそれぞれ調和かつ$d$閉で、[Hodge分解](#thm-hod1-06-hodge-decomposition)により$[\alpha]_d$の三つの成分を与える。

残る次元は全調和2形式の分類で確かめる。平坦トーラスの任意の形式を周期Fourier展開すると、[関数の固有値計算](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)が各定数余標構の係数に適用され、周波数$(r_1,s_1,r_2,s_2)$の$\Delta_d$固有値は

$$
r_1^2+s_1^2+r_2^2+s_2^2.
$$

これは零周波数でのみ零になる。従って調和2形式は四つの定数1形式$dz^1,dz^2,d\bar z^1,d\bar z^2$から異なる二つを選んだ楔積に尽きる。型ごとの選び方は

$$
\dim\mathcal H^{2,0}=\binom22=1,
\qquad \dim\mathcal H^{1,1}=2\cdot2=4,
\qquad \dim\mathcal H^{0,2}=\binom22=1.
$$

従って合計は$1+4+1=6=\binom42$であり、[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)より$\dim_{\mathbb C}H_{\mathrm{dR}}^2(T;\mathbb C)=6$。調和形式の型別和と、コホモロジーでの類の型別和の双方を確かめた。
<!-- solution-end -->

## 7. 次へ：Hodge数が満たす対称性

本章では調和代表の一意性を使って、Dolbeault群とde Rham群の型別直和を同定した。次章ではこの対応に複素共役とHodge星を作用させ、各型の次元がどのように対称になるか、奇数次Betti数にどのような制約が出るかを調べる。

