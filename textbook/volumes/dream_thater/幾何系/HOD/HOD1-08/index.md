# HOD1-08 大域$\partial\bar\partial$補題

<!-- definition-example-audit: strict -->

## 1. 閉じているだけでなく、二つの微分で書けるのはなぜか

[コンパクトKähler多様体のHodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)では、閉形式のコホモロジー類を一意な調和形式で表した。その証明に使ったGreen作用素には、調和成分を取り除いた形式を微分の像として復元する働きがある。今回はそれを一歩進め、**二つの型別微分を続けて作用させた形**まで復元できることを証明する。

たとえば$(p,q)$形式$\alpha$が$\partial$で作られ、しかも$\bar\partial\alpha=0$なら、一般の複素多様体では$\alpha=\partial\bar\partial u$と書けるとは限らない。$\partial\beta$と書けることは分かっても、その$\beta$が$\bar\partial$の像である理由がないからである。Kähler条件と**コンパクト・境界なし**という条件を組み合わせると、この隔たりが埋まる。

以下、$X$は複素次元$n\ge1$の滑らか・コンパクト・境界なしのKähler多様体とする。連結性は仮定しない。形式は滑らかな複素数値形式とし、範囲外の型の空間は$\Omega^{p,q}(X)=0$と約束する。$\partial:\Omega^{p,q}\to\Omega^{p+1,q}$、$\bar\partial:\Omega^{p,q}\to\Omega^{p,q+1}$である。[二重複体の関係式](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)は

$$
\partial^2=\bar\partial^2=0,\qquad
\partial\bar\partial=-\bar\partial\partial,\qquad
d=\partial+\bar\partial
$$

を与える。したがって$\partial\bar\partial u$は常に$\partial$閉かつ$\bar\partial$閉であり、$\partial$の像にも$\bar\partial$の像にも入る。この容易な方向を逆転できるかが本章の中心問題である。

## 2. 三つの像と核の交差を区別する

純型の微分形式について、$\partial$完全・$\bar\partial$完全はそれぞれ別の型の原始形式を持つことを意味する。これまで使ってきた「完全」「閉」の条件を、二つの微分に分けて正確に述べよう。

<a id="def-hod1-08-double-exact"></a>

<!-- formal-statement-start -->
> **定義（∂∂̄完全形式）**
> 複素多様体$X$上の滑らかな$(p,q)$形式$\alpha$が**$\partial\bar\partial$完全**であるとは、滑らかな$(p-1,q-1)$形式$u$が存在して

$$
\alpha=\partial\bar\partial u
$$

> と書けることをいう。$p=0$または$q=0$なら、原始形式の型の空間を零とするため、$\partial\bar\partial$完全な$(p,q)$形式は零形式だけである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-08-double-exact -->
**定義の確認**（複素平面の最小例）。$z=x+iy$の複素平面で$u(z)=z\bar z$と置く。$\bar\partial u=z\,d\bar z$であり、$\partial(d\bar z)=0$だから

$$
\partial\bar\partial u
=\partial(z\,d\bar z)
=dz\wedge d\bar z.
$$

この形式は$(1,1)$型で、$\partial(dz\wedge d\bar z)=\bar\partial(dz\wedge d\bar z)=0$を満たす。さらに$\alpha=\partial(z\,d\bar z)$であり、反交換関係から$\alpha=-\bar\partial(\bar z\,dz)$でもある。従って、二つの像と二つの核に入ることを**別々に**確認した。
<!-- definition-example-end -->

ここでの複素平面は定義の計算例であり、これからの大域定理を非コンパクトな複素平面へ適用しているわけではない。固定した$(p,q)$型について、三つの空間の意味を明示しておく。

$$
\begin{aligned}
E_{\partial}^{p,q}
&:=\operatorname{im}\bigl(\partial:\Omega^{p-1,q}\to\Omega^{p,q}\bigr)
  \cap\ker\bigl(\bar\partial:\Omega^{p,q}\to\Omega^{p,q+1}\bigr),\\
E_{\bar\partial}^{p,q}
&:=\ker\bigl(\partial:\Omega^{p,q}\to\Omega^{p+1,q}\bigr)
  \cap\operatorname{im}\bigl(\bar\partial:\Omega^{p,q-1}\to\Omega^{p,q}\bigr),\\
E_{\partial\bar\partial}^{p,q}
&:=\operatorname{im}\bigl(\partial\bar\partial:
       \Omega^{p-1,q-1}\to\Omega^{p,q}\bigr).
\end{aligned}
$$

<a id="lem-hod1-08-easy-inclusions"></a>

<!-- formal-statement-start -->
> **補題（常に成り立つ包含）**
> 任意の複素多様体$X$と任意の整数$p,q$に対し

$$
E_{\partial\bar\partial}^{p,q}
\subseteq E_\partial^{p,q}\cap E_{\bar\partial}^{p,q}
$$

> が成り立つ。コンパクト性もKähler条件も不要である。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha=\partial\bar\partial u$を$\partial$の像として読むだけでなく、$\alpha=-\bar\partial\partial u$とも書く。二つの閉性はそれぞれの二乗零から従う。

<!-- proof-start -->
### 証明

$u\in\Omega^{p-1,q-1}(X)$とし、$\alpha=\partial\bar\partial u$と置く。まず$\bar\partial u\in\Omega^{p-1,q}$なので$\alpha$は$\partial$完全である。次に[反交換関係](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)から

$$
\alpha=\partial\bar\partial u=-\bar\partial(\partial u)
$$

であり、$\partial u\in\Omega^{p,q-1}$だから$\bar\partial$完全でもある。閉性については

$$
\partial\alpha=\partial^2\bar\partial u=0,
\qquad
\bar\partial\alpha=-\bar\partial^2\partial u=0.
$$

従って$\alpha$は両方の交差空間に入る。$\square$
<!-- proof-end -->

## 3. Green作用素が型別微分と交換する

逆包含を作るには原始形式を明示的に構成したい。[Hodge Green作用素](../../GA/GA6/index.md#def-ga6-green-operator)を$G$、調和形式への直交射影を$P$と書く。$G$は次数ごとの作用素$G_k$をまとめた表記である。[Greenの逆作用式](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)は

$$
\Delta_dG=G\Delta_d=I-P,\qquad PG=GP=0
$$

である。$G$と$P$の[型保存](../HOD1-06/index.md#lem-hod1-06-green-types)は既に証明した。しかし型を保つことだけでは、微分と交換できるとは言えない。微分作用素が次数を変える場合も含めて、交換関係を確認する。

<a id="lem-hod1-08-green-commutes"></a>

<!-- formal-statement-start -->
> **補題（Green作用素と型別微分・随伴の可換性）**
> $X$を滑らか・コンパクト・境界なしのKähler多様体とする。滑らかな複素形式上で、$T$が$\partial,\bar\partial,\partial^*,\bar\partial^*$のいずれかなら

$$
GT=TG,\qquad PT=TP=0.
$$

> ここで$G$の左右は$T$が移す前後の次数のGreen作用素を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

[Kähler上の三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)によって、四つの作用素$T$はすべて$\Delta_d$と交換する。調和形式には四つとも零として作用し、各$T$の随伴も調和形式に零として作用する。したがって$TG\alpha$と$GT\alpha$は、**同じLaplacian方程式と調和空間への直交条件**を満たす。

<!-- proof-start -->
### 証明

$D$を$\partial$または$\bar\partial$とする。$D^2=0$から

$$
\begin{aligned}
\Delta_DD
&=(DD^*+D^*D)D=DD^*D,\\
D\Delta_D
&=D(DD^*+D^*D)=DD^*D.
\end{aligned}
$$

よって$[\Delta_D,D]=0$。随伴を取れば$[\Delta_D,D^*]=0$も従う。[三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)から$\Delta_d=2\Delta_D$なので、いずれの$T$についても$\Delta_dT=T\Delta_d$である。

[調和形式の閉・余閉判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)より調和形式$h$には

$$
\partial h=\bar\partial h=\partial^*h=\bar\partial^*h=0
$$

が成り立つ。従って$Th=0$かつ$T^*h=0$である。任意の滑らかな$\alpha$に対して、$P\alpha$は調和なので$TP\alpha=0$。また、任意の調和$h$について

$$
\langle h,T\alpha\rangle_{L^2}
=\langle T^*h,\alpha\rangle_{L^2}=0
$$

だから$PT\alpha=0$である。内積は第一変数が共役線形であるが、ここでは零という結論に影響しない。

$v=TG\alpha-GT\alpha$と置く。$G$の定義式、$\Delta_dT=T\Delta_d$、$TP=PT=0$を順に使うと

$$
\begin{aligned}
\Delta_dv
&=T\Delta_dG\alpha-\Delta_dGT\alpha\\
&=T(\alpha-P\alpha)-(T\alpha-PT\alpha)=0.
\end{aligned}
$$

他方$G\alpha$と$GT\alpha$は調和空間へ直交し、$T^*h=0$から$TG\alpha$も調和空間へ直交する。従って$v$は調和かつ調和空間に直交し、$v=0$。Green作用素の楕円正則性により途中の形式は滑らかであり、積分による随伴計算が使える。$\square$
<!-- proof-end -->

上の補題は**コンパクト性を使う場所**を特定している。調和射影・Green作用素が滑らかな全形式に作用することと、調和空間に直交する解の一意性は、境界条件を決めない非コンパクト空間へそのまま移せない。

## 4. Green作用素で二つの完全性を結ぶ

ここまでの道具で、最初の二つの交差空間から具体的な$u$を作る。記号の混同を防ぐため、以下では$G$を$\Delta_d$のGreen作用素とし、$\Delta_{\bar\partial}$のGreen作用素は[型別Green作用素](../HOD1-06/index.md#def-hod1-06-dolbeault-green)により$2G$であることに注意する。

<a id="thm-hod1-08-ddbar-lemma"></a>

<!-- formal-statement-start -->
> **定理（大域∂∂̄補題）**
> $X$を複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体とする。すべての整数$0\le p,q\le n$について、滑らかな$(p,q)$形式の部分空間として

$$
\boxed{
\operatorname{im}\partial\cap\ker\bar\partial
=\operatorname{im}\partial\bar\partial
=\ker\partial\cap\operatorname{im}\bar\partial
}
$$

> が成立する。各像と核は$\Omega^{p,q}(X)$の内部で取り、原始形式の型はそれぞれ$(p-1,q)$、$(p-1,q-1)$、$(p,q-1)$である。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha=\partial\beta$かつ$\bar\partial\alpha=0$とする。$\partial$完全なので調和成分$P\alpha$は零である。[Green作用素の可換性](#lem-hod1-08-green-commutes)から$\bar\partial G\alpha=0$なので、[三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)を使って

$$
\alpha=2\bar\partial\bar\partial^*G\alpha.
$$

さらに$G\alpha=\partial G\beta$と置き直し、[混合反交換子の消滅](../HOD1-05/index.md#lem-hod1-05-mixed-adjoints)で$\partial$を左へ動かすと$\partial\bar\partial$完全性が出る。逆向きは$\partial$と$\bar\partial$を交換して同じ計算を行う。

<!-- proof-start -->
### 証明

**第一の逆包含。** $\alpha\in E_\partial^{p,q}$を取る。定義から$\beta\in\Omega^{p-1,q}$があり、$\alpha=\partial\beta$かつ$\bar\partial\alpha=0$である。任意の調和$(p,q)$形式$h$について[調和形式の余閉性](../HOD1-05/index.md#thm-hod1-05-harmonic-types)は$\partial^*h=0$を与えるから

$$
\langle h,\alpha\rangle
=\langle h,\partial\beta\rangle
=\langle\partial^*h,\beta\rangle=0.
$$

よって$P\alpha=0$。また[Greenと$\bar\partial$の可換性](#lem-hod1-08-green-commutes)と$\bar\partial\alpha=0$から$\bar\partial G\alpha=G\bar\partial\alpha=0$である。従って

$$
\begin{aligned}
\alpha&=(I-P)\alpha=\Delta_dG\alpha\\
&=2(\bar\partial\bar\partial^*+
      \bar\partial^*\bar\partial)G\alpha\\
&=2\bar\partial\bar\partial^*G\alpha.
\end{aligned}
$$

第一等号は$P\alpha=0$、第二はGreenの逆作用式、第三はKähler上のLaplacian一致、最後は$\bar\partial G\alpha=0$による。さらに$G\partial\beta=\partial G\beta$を代入すると

$$
\begin{aligned}
\alpha
&=2\bar\partial\bar\partial^*\partial G\beta\\
&=-2\bar\partial\partial\bar\partial^*G\beta\\
&=2\partial\bar\partial\bar\partial^*G\beta.
\end{aligned}
$$

二行目は$\bar\partial^*\partial=-\partial\bar\partial^*$、三行目は$\bar\partial\partial=-\partial\bar\partial$に基づく。従って

$$
u:=2\bar\partial^*G\beta\in\Omega^{p-1,q-1}(X),
\qquad \alpha=\partial\bar\partial u.
$$

型は、$\beta$が$(p-1,q)$、$G\beta$も同じ型、$\bar\partial^*$が$q$を1減らすことから従う。$G$の正則性により$u$は滑らかである。

**第二の逆包含。** $\alpha\in E_{\bar\partial}^{p,q}$なら、$\gamma\in\Omega^{p,q-1}$について$\alpha=\bar\partial\gamma$かつ$\partial\alpha=0$である。調和形式$h$に対して$\bar\partial^*h=0$だから$P\alpha=0$。同様に$\partial G\alpha=0$なので

$$
\alpha=\Delta_dG\alpha
=2\partial\partial^*G\alpha.
$$

$G\alpha=G\bar\partial\gamma=\bar\partial G\gamma$とし、$\partial^*\bar\partial=-\bar\partial\partial^*$を使うと

$$
\begin{aligned}
\alpha
&=2\partial\partial^*\bar\partial G\gamma\\
&=-2\partial\bar\partial\partial^*G\gamma
=\partial\bar\partial v,
\end{aligned}
$$

ここで$v:=-2\partial^*G\gamma\in\Omega^{p-1,q-1}$である。従って$E_{\bar\partial}^{p,q}\subseteq E_{\partial\bar\partial}^{p,q}$。最後に[常に成り立つ包含](#lem-hod1-08-easy-inclusions)を合わせれば、三空間はすべて等しい。$\square$
<!-- proof-end -->

定理は**$\partial$完全かつ$\bar\partial$閉**を一方の条件としている。「$\partial$閉かつ$\bar\partial$閉」というだけでは不十分である。たとえばKähler形式$\omega$は両方で閉じているが、一般には$\partial\bar\partial$完全ではない。次節でその理由を確認する。

## 5. 純型で$d$完全な形式も二重に完全となる

特に重要なのは、$\alpha$の原始形式が$\partial$完全とも$\bar\partial$完全とも**最初には分からない**場合である。$d$完全な純型形式は、型が混じった原始形式しか与えられないかもしれない。しかしGreen作用素で両方の型別完全性を取り出せる。

<a id="cor-hod1-08-d-exact"></a>

<!-- formal-statement-start -->
> **系（純型のd完全形式）**
> $X$を滑らか・コンパクト・境界なしのKähler多様体とし、$\alpha\in\Omega^{p,q}(X)$を滑らかな純型形式とする。滑らかな複素形式$\eta$で$\alpha=d\eta$と書けるなら、滑らかな$u\in\Omega^{p-1,q-1}(X)$が存在して

$$
\alpha=\partial\bar\partial u.
$$

> 特に$d$完全性は$d\alpha=0$を含むので、別途$d$閉性を仮定する必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

$d^2=0$より$\partial\alpha=\bar\partial\alpha=0$。$d$完全性は調和射影を零にする。そこへ[Kähler上の三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)を入れると$\alpha$は$\partial$完全でもあり、前節の定理を使える。

<!-- proof-start -->
### 証明

$\alpha=d\eta$なので$d\alpha=d^2\eta=0$。[二重複体の型分解](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)から$d\alpha=\partial\alpha+\bar\partial\alpha$は異なる型$(p+1,q)$、$(p,q+1)$の和であり、それぞれ零である。

また任意の$d$調和形式$h$に対し$d^*h=0$だから

$$
\langle h,\alpha\rangle
=\langle h,d\eta\rangle
=\langle d^*h,\eta\rangle=0,
$$

従って$P\alpha=0$。補題の可換性から$\partial G\alpha=G\partial\alpha=0$であり、Laplacian一致によって

$$
\begin{aligned}
\alpha
&=\Delta_dG\alpha\\
&=2(\partial\partial^*+\partial^*\partial)G\alpha\\
&=\partial\bigl(2\partial^*G\alpha\bigr).
\end{aligned}
$$

ここで$\beta:=2\partial^*G\alpha$は$(p-1,q)$型で滑らかである。すでに$\bar\partial\alpha=0$も示したので、[大域$\partial\bar\partial$補題](#thm-hod1-08-ddbar-lemma)の第一の交差条件に入る。よって$\alpha=\partial\bar\partial u$である。前節の構成を明示すれば、$u=2\bar\partial^*G\beta$を選べる。$\square$
<!-- proof-end -->

**純型という仮定が働く場所。** $d\alpha=0$から$\partial\alpha=\bar\partial\alpha=0$と分けるところである。型を混ぜた一般の$d$完全形式そのものが、単一の$\partial\bar\partial u$で書けるとは主張していない。

<a id="prop-hod1-08-pure-closed-decomposition"></a>

<!-- formal-statement-start -->
> **命題（純型閉形式の調和代表と二重完全成分）**
> コンパクトKähler多様体$X$上の滑らかな$d$閉$(p,q)$形式$\alpha$に対し、その調和射影$h=P\alpha\in\mathcal H^{p,q}(X)$と、滑らかな$u\in\Omega^{p-1,q-1}(X)$があり、

$$
\alpha=h+\partial\bar\partial u.
$$

> $h$は$\alpha$のde Rham類の一意な調和代表である。
<!-- formal-statement-end -->

### 証明の見取り図

Hodge分解の調和代表を引くと、純型のまま$d$完全になる。直前の系をその差へ適用する。

<!-- proof-start -->
### 証明

[Greenの型保存](../HOD1-06/index.md#lem-hod1-06-green-types)により$h=P\alpha$は$(p,q)$型である。[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)から、$d$閉$\alpha$と$h$は同じde Rham類を表す。従って$\alpha-h=d\eta$となる滑らかな$\eta$がある。$\alpha-h$は純型であるから、[純型の$d$完全形式の系](#cor-hod1-08-d-exact)により$\alpha-h=\partial\bar\partial u$と書ける。調和代表の一意性も同じHodge–de Rham同型に従う。$\square$
<!-- proof-end -->

これは「任意の純型閉形式が二重完全」という主張ではない。**消せない部分は調和代表$h$**として残る。

## 6. 局所ポテンシャルとの違いとコンパクト性の意味

[Kähler形式の局所ポテンシャル](../../KAH/KAH1-04/index.md#thm-kah1-04-local-existence)では、Kähler形式$\omega$を座標近傍で$i\partial\bar\partial\varphi$と表した。ここでの定理は、**大域的に定義された純型形式が適切な完全性を満たすとき**、大域的な原始形式$u$を作るという別の結果である。

平坦な$\mathbb C^n$で$\omega=\frac i2\sum_jdz^j\wedge d\bar z^j$なら、局所的にはもちろん大域的にも$\varphi=\frac12\sum_j|z^j|^2$で$\omega=i\partial\bar\partial\varphi$と書ける。一方、コンパクトKähler多様体全体に同じことを期待してはいけない。

<a id="prop-hod1-08-no-global-potential"></a>

<!-- formal-statement-start -->
> **命題（コンパクトKähler形式に大域ポテンシャルはない）**
> $X$を複素次元$n\ge1$の滑らか・コンパクト・境界なしのKähler多様体、$\omega$をその基本形式とする。大域的な滑らかな実関数$\varphi$で

$$
\omega=i\partial\bar\partial\varphi
$$

> を満たすものは存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

大域ポテンシャルがあれば$\omega$は$d$完全になる。他方、Kähler形式の最高楔積の積分は正であり、Stokesの定理による零と矛盾する。

<!-- proof-start -->
### 証明

仮に$\omega=i\partial\bar\partial\varphi$なら、$\bar\partial^2=0$より

$$
\omega=d(i\bar\partial\varphi).
$$

Kähler条件$d\omega=0$を使い、Leibniz則で

$$
\omega^n
=d(i\bar\partial\varphi)\wedge\omega^{n-1}
=d\bigl(i\bar\partial\varphi\wedge\omega^{n-1}\bigr)
$$

となる。$X$はコンパクト・境界なしなので[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)より$\int_X\omega^n=0$。しかしKähler形式の正値性と複素構造の向きから$\omega^n/n!$は至るところ正の体積形式であり、少なくとも一つの連結成分があるので$\int_X\omega^n>0$。矛盾する。$\square$
<!-- proof-end -->

もう一つの境界は**非コンパクト**である。複素平面$\mathbb C$にEuclid計量を入れるとKählerだが、

$$
\alpha=dz=\partial z,\qquad \bar\partial(dz)=0
$$

である。ところが$(1,0)$型の$\partial\bar\partial$完全形式は、原始形式が$\Omega^{0,-1}=0$なので零だけである。従って$\alpha\ne0$は反例となる。失われたのはKähler条件ではなく**コンパクト性**であり、Green作用素による大域逆作用と調和射影の議論をそのまま使えない。

## 7. Bott–Chern群とAeppli群は何を測るか

二つの微分に対して「両方で閉じている形式を二重完全形式で割る」方法と、「二重微分で閉じている形式を一方だけの完全形式で割る」方法がある。前者が二重完全性の障害を直接測る。分母が分子に含まれることは[二重複体の関係式](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)で確かめられる。

<a id="def-hod1-08-bott-chern"></a>

<!-- formal-statement-start -->
> **定義（Bott–Chernコホモロジー）**
> 複素多様体$X$の$(p,q)$型の**Bott–Chernコホモロジー群**を複素ベクトル空間

$$
H_{\mathrm{BC}}^{p,q}(X)
:=\frac{\ker\partial\cap\ker\bar\partial}
         {\operatorname{im}\partial\bar\partial}
$$

> と定義する。核と像は$\Omega^{p,q}(X)$の内部で取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-08-bott-chern -->
**定義の確認**（$\mathbb C$と定数関数）。複素平面で$(0,0)$形式を考える。$\partial f=\bar\partial f=0$は、$df=0$、すなわち連結な$\mathbb C$で$f$が定数であることと同値である。一方、分母は$\partial\bar\partial\Omega^{-1,-1}=0$である。従って$H_{\mathrm{BC}}^{0,0}(\mathbb C)\cong\mathbb C$であり、たとえば定数関数$1$が非零類を与える。二つの核と分母の型をすべて確認した。
<!-- definition-example-end -->

<a id="def-hod1-08-aeppli"></a>

<!-- formal-statement-start -->
> **定義（Aeppliコホモロジー）**
> 複素多様体$X$の$(p,q)$型の**Aeppliコホモロジー群**を

$$
H_{\mathrm A}^{p,q}(X)
:=\frac{\ker\bigl(\partial\bar\partial:\Omega^{p,q}\to\Omega^{p+1,q+1}\bigr)}
         {\operatorname{im}\partial+\operatorname{im}\bar\partial}
$$

> と定義する。分母の二つの像はそれぞれ$\Omega^{p-1,q}$、$\Omega^{p,q-1}$から来る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-08-aeppli -->
**定義の確認**（$\mathbb C$の$(0,0)$型）。この型では分母は零である。分子は$\partial\bar\partial f=0$を満たす滑らかな関数で、定数関数だけでなく$f=z$も入る。実際、$\bar\partial z=0$だから$\partial\bar\partial z=0$だが$\partial z=dz\ne0$である。従って$[z]_{\mathrm A}$は非零であり、Bott–Chern群の$(0,0)$型とは違う。分母の型が負になる場合を零とする約束もここで働いている。
<!-- definition-example-end -->

コンパクトKähler多様体では、Bott–Chern群から[Dolbeaultコホモロジー群](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)への自然な写像が同型になる。Aeppli群の詳細な双対理論は、ここでは導入しない。

<a id="prop-hod1-08-bc-dolbeault"></a>

<!-- formal-statement-start -->
> **命題（コンパクトKähler上のBott–Chern類とDolbeault類）**
> 複素次元$n$の滑らか・コンパクト・境界なしのKähler多様体$X$では、任意の$0\le p,q\le n$について、代表形式をそのまま送る写像

$$
H_{\mathrm{BC}}^{p,q}(X)\longrightarrow
H_{\bar\partial}^{p,q}(X),\qquad
[\alpha]_{\mathrm{BC}}\longmapsto[\alpha]_{\bar\partial}
$$

> は複素線形同型である。
<!-- formal-statement-end -->

### 証明の見取り図

全射にはDolbeault類の調和代表を使う。単射には大域$\partial\bar\partial$補題を使う。二つは全く異なる役割を持つ。

<!-- proof-start -->
### 証明

まずwell-defined性を確認する。$\partial\alpha=\bar\partial\alpha=0$なら$\bar\partial$閉であり、$\alpha$を$\partial\bar\partial u$だけ変えても

$$
\partial\bar\partial u=\bar\partial(-\partial u)
$$

なのでDolbeault類は変わらない。

**全射。** 任意のDolbeault類は[調和代表定理](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)から滑らかな$\Delta_{\bar\partial}$調和$(p,q)$形式$h$を持つ。[三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)より$\Delta_dh=0$でもある。よって[閉・余閉判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)から$\partial h=\bar\partial h=0$。従って$[h]_{\mathrm{BC}}$が元のDolbeault類へ写る。

**単射。** $[\alpha]_{\mathrm{BC}}$がDolbeault側で零なら、$\alpha=\bar\partial\gamma$である。Bott–Chern類の代表なので$\partial\alpha=0$でもある。[大域$\partial\bar\partial$補題](#thm-hod1-08-ddbar-lemma)の第二の交差条件から$\alpha=\partial\bar\partial u$となる。従って元のBott–Chern類は零である。$\square$
<!-- proof-end -->

## 8. 演習：原始形式を自分で作り、仮定の境界を検証する

### Level A：型・符号・基本例

<a id="ex-hod1-08-a01"></a>
#### HOD1-08-A01 複素平面の二重完全形式
- Level: A

$\mathbb C$で$u=z\bar z/2$とし、$\alpha=\partial\bar\partial u$を計算せよ。さらに$\alpha$が$\partial$完全・$\bar\partial$完全・両方で閉であることを、原始形式と二乗零を用いて確認せよ。

<!-- solution-start -->
### 詳細解答

$\bar\partial u=(z/2)d\bar z$なので

$$
\alpha=\partial\bigl((z/2)d\bar z\bigr)
=\frac12dz\wedge d\bar z.
$$

$\partial$完全性は$\beta=(z/2)d\bar z$から分かる。反交換関係から$\alpha=-\bar\partial(\partial u)$であり、$\partial u=(\bar z/2)dz$なので$\gamma=-(\bar z/2)dz$を選べる。実際

$$
\bar\partial\gamma
=-\frac12d\bar z\wedge dz
=\frac12dz\wedge d\bar z.
$$

最後に$\partial\alpha=\partial^2\bar\partial u=0$、$\bar\partial\alpha=-\bar\partial^2\partial u=0$。二つの像に入ることと二つの核に入ることを別々に検査できた。
<!-- solution-end -->

<a id="ex-hod1-08-a02"></a>
#### HOD1-08-A02 境界次数で何が零になるか
- Level: A

コンパクトKähler多様体$X$で$\alpha\in\Omega^{1,0}(X)$が$\alpha=\partial f$かつ$\bar\partial\alpha=0$を満たすとする。大域補題から$\alpha=0$を証明せよ。さらに$\mathbb C$で$f=z$とした場合の違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$X$上では$\alpha\in E_\partial^{1,0}$だから[大域補題](#thm-hod1-08-ddbar-lemma)により$\alpha=\partial\bar\partial u$となる。ただし$u$の型は$(0,-1)$であり、$\Omega^{0,-1}=0$だから$u=0$、従って$\alpha=0$である。一方$\mathbb C$では$f=z$により$\alpha=dz\ne0$、しかも$\bar\partial dz=0$である。複素平面はKählerだが非コンパクトなので、補題の仮定を満たさない。
<!-- solution-end -->

<a id="ex-hod1-08-a03"></a>
#### HOD1-08-A03 $d^c$と符号の確認
- Level: A

$d^c=i(\bar\partial-\partial)$と定めるとき、$dd^cf=2i\partial\bar\partial f$を滑らかな関数$f$について導け。また$\bar\partial\partial f$を$\partial\bar\partial f$で表せ。

<!-- solution-start -->
### 詳細解答

関数$f$に対して$d=\partial+\bar\partial$を用いると

$$
\begin{aligned}
dd^cf
&=i(\partial+\bar\partial)(\bar\partial-\partial)f\\
&=i(\partial\bar\partial f-\partial^2f
  +\bar\partial^2f-\bar\partial\partial f)\\
&=i(\partial\bar\partial f-\bar\partial\partial f)
=2i\partial\bar\partial f.
\end{aligned}
$$

最後は[反交換関係](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)による。従って$\bar\partial\partial f=-\partial\bar\partial f$である。この章の正規化では$dd^c$に係数$2$が現れ、$i\partial\bar\partial$そのものとは等しくない。
<!-- solution-end -->

<a id="ex-hod1-08-a04"></a>
#### HOD1-08-A04 Green作用素の次数と型
- Level: A

$\beta\in\Omega^{p-1,q}(X)$、$G$をコンパクトKähler多様体のde Rham Green作用素とする。$2\bar\partial^*G\beta$の型を答え、$\partial\bar\partial$を作用させたときの型を求めよ。$q=0$では何が起きるか。

<!-- solution-start -->
### 詳細解答

[Greenの型保存](../HOD1-06/index.md#lem-hod1-06-green-types)により$G\beta\in\Omega^{p-1,q}$。[型別随伴の定義](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)から$\bar\partial^*:\Omega^{p-1,q}\to\Omega^{p-1,q-1}$だから$u=2\bar\partial^*G\beta$は$(p-1,q-1)$型。次に$\bar\partial u$が$(p-1,q)$、$\partial\bar\partial u$が$(p,q)$型である。$q=0$では$\bar\partial^*$の値域$\Omega^{p-1,-1}$は零だから$u=0$。この場合、大域補題の対象$\alpha$も零となる。
<!-- solution-end -->

### Level B：Green計算とコホモロジー

<a id="ex-hod1-08-b01"></a>
#### HOD1-08-B01 第二の交差空間からの構成
- Level: B

コンパクトKähler多様体$X$で$\alpha=\bar\partial\gamma\in\Omega^{p,q}$かつ$\partial\alpha=0$とする。調和射影$P$が$P\alpha=0$であることを示し、$v=-2\partial^*G\gamma$が$\alpha=\partial\bar\partial v$を満たすことを途中式付きで証明せよ。

<!-- solution-start -->
### 詳細解答

任意の調和形式$h$に対して$\bar\partial^*h=0$なので

$$
\langle h,\alpha\rangle
=\langle h,\bar\partial\gamma\rangle
=\langle\bar\partial^*h,\gamma\rangle=0.
$$

従って$P\alpha=0$。$G\partial=\partial G$より$\partial G\alpha=G\partial\alpha=0$である。[三Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)を適用すると

$$
\alpha=\Delta_dG\alpha
=2(\partial\partial^*+\partial^*\partial)G\alpha
=2\partial\partial^*G\alpha.
$$

さらに$G\alpha=\bar\partial G\gamma$、[混合反交換子](../HOD1-05/index.md#lem-hod1-05-mixed-adjoints)から$\partial^*\bar\partial=-\bar\partial\partial^*$なので

$$
\alpha=2\partial\partial^*\bar\partial G\gamma
=-2\partial\bar\partial\partial^*G\gamma
=\partial\bar\partial(-2\partial^*G\gamma).
$$

よって$v=-2\partial^*G\gamma$でよい。$\gamma$は$(p,q-1)$型なので$v$は$(p-1,q-1)$型であり、Greenの正則性から滑らかである。
<!-- solution-end -->

<a id="ex-hod1-08-b02"></a>
#### HOD1-08-B02 Bott–ChernからDolbeaultへの写像
- Level: B

コンパクトKähler多様体$X$について、$[\alpha]_{\mathrm{BC}}\mapsto[\alpha]_{\bar\partial}$がwell-definedである理由を確認した上で、全射性と単射性でそれぞれ必要な定理を一つずつ挙げ、証明せよ。

<!-- solution-start -->
### 詳細解答

Bott–Chern代表は$\partial$閉・$\bar\partial$閉なのでDolbeault類を定める。代表を$\partial\bar\partial u$だけ変えると、差は$\bar\partial(-\partial u)$でありDolbeault類は不変である。

全射には[Dolbeault調和代表定理](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)を使う。任意のDolbeault類の調和代表$h$は$\Delta_{\bar\partial}h=0$であり、Kähler上の$\Delta_d=2\Delta_{\bar\partial}$から$d$調和でもある。従って$\partial h=\bar\partial h=0$で、$h$がBott–Chern代表となる。

単射には[大域$\partial\bar\partial$補題](#thm-hod1-08-ddbar-lemma)を使う。像が零なら$\alpha=\bar\partial\gamma$で、もともと$\partial\alpha=0$だから$\alpha\in\ker\partial\cap\operatorname{im}\bar\partial$。従って$\alpha=\partial\bar\partial u$となりBott–Chern類でも零である。
<!-- solution-end -->

<a id="ex-hod1-08-b03"></a>
#### HOD1-08-B03 大域Kählerポテンシャルが存在しない理由
- Level: B

複素次元$n\ge1$のコンパクトKähler多様体$X$で$\omega=i\partial\bar\partial\varphi$を満たす大域実関数$\varphi$が存在すると仮定する。$d\omega=0$とStokesの定理を使って矛盾を導け。局所ポテンシャルの存在と何が違うか説明せよ。

<!-- solution-start -->
### 詳細解答

$d(i\bar\partial\varphi)=i\partial\bar\partial\varphi+i\bar\partial^2\varphi=\omega$。$d\omega=0$なのでLeibniz則は

$$
d(i\bar\partial\varphi\wedge\omega^{n-1})
=d(i\bar\partial\varphi)\wedge\omega^{n-1}
-i\bar\partial\varphi\wedge d(\omega^{n-1})
=\omega^n
$$

を与える。境界なしのコンパクト多様体上で[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すれば$\int_X\omega^n=0$。しかし$\omega^n/n!$は正の体積形式で$\int_X\omega^n>0$。矛盾である。局所ポテンシャルは各座標近傍でしか定義されず、近傍境界からの寄与があるため、大域Stokesで積分を零にする議論は適用できない。
<!-- solution-end -->

<a id="ex-hod1-08-b04"></a>
#### HOD1-08-B04 純型$d$完全から$\partial$完全へ
- Level: B

滑らか・コンパクト・境界なしのKähler多様体で$\alpha\in\Omega^{p,q}$が$d$完全とする。$\alpha$が$\partial$閉かつ$\bar\partial$閉であること、$P\alpha=0$であることを示し、$\beta=2\partial^*G\alpha$で$\alpha=\partial\beta$を証明せよ。

<!-- solution-start -->
### 詳細解答

$\alpha=d\eta$から$d\alpha=0$。$d\alpha=\partial\alpha+\bar\partial\alpha$は相異なる型の和なので両項は零である。調和形式$h$は$d^*h=0$なので$\langle h,\alpha\rangle=\langle d^*h,\eta\rangle=0$、従って$P\alpha=0$。[Greenの可換性](#lem-hod1-08-green-commutes)から$\partial G\alpha=G\partial\alpha=0$。よって

$$
\begin{aligned}
\alpha
&=(I-P)\alpha=\Delta_dG\alpha\\
&=2(\partial\partial^*+\partial^*\partial)G\alpha\\
&=2\partial\partial^*G\alpha
=\partial(2\partial^*G\alpha).
\end{aligned}
$$

$\beta$は$(p-1,q)$型で滑らかであり、$\bar\partial\alpha=0$と合わせて大域補題の第一の交差条件も満たす。
<!-- solution-end -->

### Level C：仮定と同型を一続きに再構成する

<a id="ex-hod1-08-c01"></a>
#### HOD1-08-C01 純型閉形式の分類と自然な同型
- Level: C

$X$を滑らか・コンパクト・境界なしのKähler多様体とする。$d$閉な純型$(p,q)$形式全体を$Z_d^{p,q}$と書く。(1) 各$\alpha\in Z_d^{p,q}$が$\alpha=h+\partial\bar\partial u$（$h$は調和$(p,q)$形式）と書けること、(2) この$h$が一意であること、(3) そこから$H_{\mathrm{BC}}^{p,q}(X)\cong\mathcal H^{p,q}(X)$を直接構成することを証明せよ。

<!-- solution-start -->
### 詳細解答

(1) [Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)より、$h=P\alpha$は$\alpha$のde Rham類の調和代表で、$\alpha-h=d\eta$である。[Greenの型保存](../HOD1-06/index.md#lem-hod1-06-green-types)から$h$は$(p,q)$型であり、差$\alpha-h$も純型。従って[純型$d$完全形式の系](#cor-hod1-08-d-exact)から$\alpha-h=\partial\bar\partial u$である。

(2) $h_1,h_2$が同じ$\alpha$を二重完全項とともに表すと仮定する。差は

$$
h_1-h_2=\partial\bar\partial(u_2-u_1)
=d\bigl(\bar\partial(u_2-u_1)\bigr)
$$

で$d$完全、かつ調和である。$h=h_1-h_2$と置くと$d^*h=0$なので

$$
\|h\|_{L^2}^2
=\langle h,d\bar\partial(u_2-u_1)\rangle
=\langle d^*h,\bar\partial(u_2-u_1)\rangle=0.
$$

ゆえに$h=0$で一意。

(3) Bott–Chern分子は$\partial$閉かつ$\bar\partial$閉なので、純型では$d$閉な$Z_d^{p,q}$そのものである。$[\alpha]_{\mathrm{BC}}\mapsto P\alpha$を定義する。$\partial\bar\partial u=d(\bar\partial u)$は$d$完全なので調和射影が零であり、写像は代表に依らない。(1)により核はちょうど$\partial\bar\partial$完全な形式、全射性は任意の調和$(p,q)$形式$h$が両方で閉じており$Ph=h$であることによる。従って線形同型となる。
<!-- solution-end -->

<a id="ex-hod1-08-c02"></a>
#### HOD1-08-C02 二つの逆包含と非コンパクト反例の境界
- Level: C

コンパクトKähler多様体$X$の$\alpha\in\Omega^{p,q}(X)$について、(1) $\alpha=\partial\beta$、$\bar\partial\alpha=0$から原始形式$u$をGreen作用素で構成し、(2) $\alpha=\bar\partial\gamma$、$\partial\alpha=0$の場合の原始形式$v$と符号の差を導け。(3) $\mathbb C$上の$dz$が(1)の結論を満たさないことを確認し、証明のどの段階が使えなくなるか述べよ。

<!-- solution-start -->
### 詳細解答

(1) $\alpha=\partial\beta$だから調和$h$に対して$\langle h,\alpha\rangle=\langle\partial^*h,\beta\rangle=0$で$P\alpha=0$。また$\bar\partial\alpha=0$、[可換性](#lem-hod1-08-green-commutes)から$\bar\partial G\alpha=0$。従って

$$
\alpha=\Delta_dG\alpha
=2\bar\partial\bar\partial^*G\alpha
=2\bar\partial\bar\partial^*\partial G\beta.
$$

[混合反交換子](../HOD1-05/index.md#lem-hod1-05-mixed-adjoints)で$\bar\partial^*\partial=-\partial\bar\partial^*$、さらに$\bar\partial\partial=-\partial\bar\partial$と入れ替えるから二つの負号が消え、

$$
\alpha=\partial\bar\partial(2\bar\partial^*G\beta),
\qquad u=2\bar\partial^*G\beta.
$$

(2) $\alpha=\bar\partial\gamma$では$P\alpha=0$、$\partial G\alpha=0$から$\alpha=2\partial\partial^*G\alpha$。$G\bar\partial=\bar\partial G$と$\partial^*\bar\partial=-\bar\partial\partial^*$により

$$
\alpha=2\partial\partial^*\bar\partial G\gamma
=-\partial\bar\partial(2\partial^*G\gamma).
$$

従って$v=-2\partial^*G\gamma$となり、こちらは交換が一回だけなので負号が残る。

(3) $\mathbb C$は平坦Kählerだが非コンパクトで、$dz=\partial z\ne0$、$\bar\partial dz=0$である。一方$\partial\bar\partial\Omega^{0,-1}=0$なので二重完全にはなれない。破れる箇所はコンパクトHodge理論による$G$と$P$の大域的な正則性・逆作用式を適用する段階であり、局所的な反交換関係が破れたわけではない。
<!-- solution-end -->

## 9. 次の講義へ

Green作用素とKähler恒等式によって、$\partial$完全・$\bar\partial$閉、あるいは$\bar\partial$完全・$\partial$閉という片側の情報から、$\partial\bar\partial$完全という両側の結論が得られた。さらに純型の$d$閉形式は「調和代表＋二重完全項」へ分けられる。

次は複素トーラスや射影空間で型別調和形式の次元を計算する。そこでは「どの形式が調和代表として残るか」を実例で見ながら、大域補題が消せる部分と消せない部分を区別する。
