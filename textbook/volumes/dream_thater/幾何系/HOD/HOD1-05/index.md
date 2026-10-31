# HOD1-05 Laplacian一致と調和形式の型保存

<!-- definition-example-audit: strict -->

## 1. 二つの微分から同じ「曲がり具合」が出るか

[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)により、基本形式とその随伴が型別微分の随伴に結び付いた。しかし、$d=\partial+\bar\partial$ だからといって、$d$のLaplacianが二つの型別Laplacianの和になるとは直ちに言えない。展開すれば、$\partial\bar\partial^*$ のような**混合項**が残るからである。

この章で問うことは三つある。

1. 混合項はなぜ消え、なぜ係数$2$が現れるのか。
2. 基本形式を楔積する$L$と、その随伴$\Lambda$はLaplacianと交換できるのか。
3. 全次数の調和形式から$(p,q)$型だけを取り出しても調和性は保たれるのか。

以下、特に断らなければ$X$は複素次元$n\ge1$の**滑らかなKähler多様体**で、$\omega$を基本形式とする。[Lefschetz作用と随伴](../HOD1-02/index.md#def-hod1-02-lambda)を$L=\omega\wedge(-)$、$\Lambda=L^*$と書く。

微分$\partial,\bar\partial$とその**形式的随伴**$\partial^*,\bar\partial^*$は[型別随伴の定義](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)に従い、内積は第一変数を共役線形とする。

交換子は$[A,B]=AB-BA$、反交換子は$\{A,B\}=AB+BA$と書く。これらは滑らかな複素形式上の微分作用素の等式として扱い、次数範囲外への作用は零とする。

まず[型別Laplacianの定義](../HOD1-01/index.md#def-hod1-01-type-laplacians)を再掲するため、記号の意味を固定する。

$$
\begin{aligned}
\Delta_d&=dd^*+d^*d,\\
\Delta_\partial&=\partial\partial^*+\partial^*\partial,\\
\Delta_{\bar\partial}&=\bar\partial\bar\partial^*+\bar\partial^*\bar\partial.
\end{aligned}
$$

どれも**非負**の符号を使う。ここでいう等式は最初は微分作用素としての等式であり、非コンパクト多様体上での任意のHilbert空間上の自己共役拡張の等式までは含まない。

## 2. 混合項を消す

最小の計算を先に見よう。$A^2=0$を満たす作用素$A$と任意の$B$について

$$
\begin{aligned}
\{A,[B,A]\}
&=A(BA-AB)+(BA-AB)A\\
&=ABA-A^2B+BA^2-ABA=0.
\end{aligned}
$$

同じ微分が二度続くと零になることが鍵である。型別微分に対して[Dolbeault二重複体の恒等式](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)は

$$
\partial^2=\bar\partial^2=0,\qquad
\partial\bar\partial+\bar\partial\partial=0
$$

を保証する。ここにKähler恒等式を代入する。

<a id="lem-hod1-05-mixed-adjoints"></a>

<!-- formal-statement-start -->
> **補題（混合随伴反交換子の消滅）**
> 滑らかなKähler多様体$X$上で、コンパクト台形式から定まる$\partial^*,\bar\partial^*$を用いると、全次数の滑らかな複素形式に対し

$$
\partial\bar\partial^*+\bar\partial^*\partial=0,\qquad
\bar\partial\partial^*+\partial^*\bar\partial=0
$$

> が微分作用素として成り立つ。ここでは$X$のコンパクト性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

[二つのKähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)で随伴を$\Lambda$との交換子に置き換え、$A^2=0$の四項展開を使う。一般Hermite計量ではこの置換ができない。

<!-- proof-start -->
### 証明

[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)の$[\Lambda,\partial]=i\bar\partial^*$を両辺$-i$倍すると

$$
\bar\partial^*=-i[\Lambda,\partial].
$$

したがって、最初の反交換子は

$$
\begin{aligned}
\partial\bar\partial^*+\bar\partial^*\partial
&=-i\{\partial,[\Lambda,\partial]\}\\
&=-i\bigl(\partial\Lambda\partial
-\partial^2\Lambda+\Lambda\partial^2
-\partial\Lambda\partial\bigr)=0.
\end{aligned}
$$

第二の恒等式$[\Lambda,\bar\partial]=-i\partial^*$からは$\partial^*=i[\Lambda,\bar\partial]$を得る。よって

$$
\begin{aligned}
\bar\partial\partial^*+\partial^*\bar\partial
&=i\{\bar\partial,[\Lambda,\bar\partial]\}\\
&=i\bigl(\bar\partial\Lambda\bar\partial
-\bar\partial^2\Lambda+\Lambda\bar\partial^2
-\bar\partial\Lambda\bar\partial\bigr)=0.
\end{aligned}
$$

双方とも[二重複体の二乗零](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)を使った。$\square$
<!-- proof-end -->

この補題は「$\partial\bar\partial=0$」を主張するものではない。消えるのは**随伴を含む反交換子の和**である。この違いが次の係数計算に必要になる。

## 3. 三つのLaplacianが一致する理由

まず$d^*=\partial^*+\bar\partial^*$が[随伴の型別射影](../HOD1-01/index.md#prop-hod1-01-adjoint-projections)で分かっている。$d$と$d^*$を積に入れれば、通常の型別項と四つの混合項が現れる。[直前の補題](#lem-hod1-05-mixed-adjoints)で二組の混合項を消すと、$\Delta_d=\Delta_\partial+\Delta_{\bar\partial}$を得る。しかし係数$2$には、さらに両者の等しさを示す必要がある。

<a id="thm-hod1-05-laplacian-equality"></a>

<!-- formal-statement-start -->
> **定理（Kähler上の三Laplacian一致）**
> 複素次元$n$の滑らかなKähler多様体$X$で、$\Delta_d=dd^*+d^*d$、$\Delta_\partial=\partial\partial^*+\partial^*\partial$、$\Delta_{\bar\partial}=\bar\partial\bar\partial^*+\bar\partial^*\bar\partial$を、滑らかな複素形式上の形式的随伴によって定める。このとき全次数の微分作用素として

$$
\boxed{\Delta_d=2\Delta_\partial=2\Delta_{\bar\partial}}
$$

> が成立する。コンパクト性は不要であり、数式は境界条件を持つ任意の作用素実現について自動的に成立するとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

一度目の展開で混合項を消し、二度目は$\partial\bar\partial+\bar\partial\partial=0$を使って$\Delta_\partial-\Delta_{\bar\partial}$自体を零にする。係数$2$は二つの等しい非負作用素を足した結果として現れる。

<!-- proof-start -->
### 証明

$A=\partial$、$B=\bar\partial$と略記する。[型別随伴の和](../HOD1-01/index.md#prop-hod1-01-adjoint-projections)を用い、$d=A+B$、$d^*=A^*+B^*$を完全に展開すると

$$
\begin{aligned}
\Delta_d
&=(A+B)(A^*+B^*)+(A^*+B^*)(A+B)\\
&=(AA^*+A^*A)+(BB^*+B^*B)\\
&\quad +(AB^*+B^*A)+(BA^*+A^*B).
\end{aligned}
$$

末尾の二つの括弧は[混合反交換子の補題](#lem-hod1-05-mixed-adjoints)で零だから

$$
\Delta_d=\Delta_\partial+\Delta_{\bar\partial}.
$$

残る$\Delta_\partial=\Delta_{\bar\partial}$を、符号を隠さず示す。[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)から

$$
A^*=i[\Lambda,B],\qquad B^*=-i[\Lambda,A].
$$

これをそれぞれの定義へ代入すると

$$
\begin{aligned}
\Delta_\partial&=\{A,A^*\}=i\{A,[\Lambda,B]\},\\
\Delta_{\bar\partial}&=\{B,B^*\}=-i\{B,[\Lambda,A]\}.
\end{aligned}
$$

二式を差し引き、括弧を四項ずつ展開する。

$$
\begin{aligned}
\Delta_\partial-\Delta_{\bar\partial}
&=i\bigl(\{A,[\Lambda,B]\}+\{B,[\Lambda,A]\}\bigr)\\
&=i\bigl(A\Lambda B-AB\Lambda+\Lambda BA-B\Lambda A\\
&\qquad+B\Lambda A-BA\Lambda+\Lambda AB-A\Lambda B\bigr)\\
&=i\bigl(\Lambda(BA+AB)-(AB+BA)\Lambda\bigr)\\
&=i[\Lambda,AB+BA]=0.
\end{aligned}
$$

最後の零は[二重複体の反交換関係](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)による。したがって$\Delta_\partial=\Delta_{\bar\partial}$であり、先ほどの和へ代入して$\Delta_d=2\Delta_\partial=2\Delta_{\bar\partial}$を得た。$\square$
<!-- proof-end -->

**平坦トーラスでの検算。** $T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$のEuclid計量と$f_{r,s}(x,y)=e^{i(rx+sy)}$（$r,s$は整数）では、[先行章での直接計算](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)から

$$
\Delta_d f_{r,s}=(r^2+s^2)f_{r,s},\quad
\Delta_\partial f_{r,s}
=\Delta_{\bar\partial}f_{r,s}
=\frac{r^2+s^2}{2}f_{r,s}.
$$

$r=1,s=2$なら固有値はそれぞれ$5,5/2,5/2$である。これは関数上での**独立した数値検算**であって、定理の全次数の証明を代替するものではない。

## 4. Lefschetz作用はLaplacianを壊さない

形式を$L=\omega\wedge(-)$で二次上げると、調和性まで保たれるだろうか。これには$L$と$\Delta_d$の可換性が必要になる。随伴との交換子は、前章の恒等式から随伴を一度取れば求まるが、その際に$i$の共役が符号を変える。

<a id="lem-hod1-05-lefschetz-adjoints"></a>

<!-- formal-statement-start -->
> **補題（Lefschetz作用素と随伴微分の交換子）**
> 複素次元$n$の滑らかなKähler多様体上で$L=\omega\wedge(-)$、$\Lambda=L^*$とすると、全次数の滑らかな形式について

$$
\begin{aligned}
[L,\partial]&=[L,\bar\partial]=0,\\
[L,\partial^*]&=i\bar\partial,\qquad
[L,\bar\partial^*]=-i\partial,\\
[\Lambda,\partial^*]&=[\Lambda,\bar\partial^*]=0
\end{aligned}
$$

> が成り立つ。$*$はコンパクト台上の形式的随伴を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

$d\omega=0$により、$\omega$との外積は微分と交換する。残りは[二つのKähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)の形式的随伴を取る。交換子の順番を逆にすることと$i$を共役することを別々に確認する。

<!-- proof-start -->
### 証明

Kähler条件$d\omega=0$の型成分から$\partial\omega=\bar\partial\omega=0$である。[外積へのLeibniz則](../../CM/CM2-02/index.md#prop-cm2-02-graded-leibniz)を次数$2$の$\omega$へ使うと

$$
\partial(\omega\wedge\alpha)
=\partial\omega\wedge\alpha+\omega\wedge\partial\alpha
=L\partial\alpha
$$

となり、$[L,\partial]=0$を得る。$\bar\partial$でも同じ展開で$[L,\bar\partial]=0$となる。

次に[前章の恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)の第一式を形式的に随伴すると

$$
[\Lambda,\partial]^*
=(\Lambda\partial-\partial\Lambda)^*
=\partial^*L-L\partial^*
=-[L,\partial^*]
$$

であり、一方$(i\bar\partial^*)^*=-i\bar\partial$だから$[L,\partial^*]=i\bar\partial$。第二式も

$$
[\Lambda,\bar\partial]^*=-[L,\bar\partial^*]
=(-i\partial^*)^*=i\partial
$$

より$[L,\bar\partial^*]=-i\partial$を得る。最後に$[L,\partial]=[L,\bar\partial]=0$の随伴を取れば、それぞれ$[\Lambda,\partial^*]=[\Lambda,\bar\partial^*]=0$である。$\square$
<!-- proof-end -->

<a id="thm-hod1-05-laplacian-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（Lefschetz作用とHodge Laplacianの可換性）**
> 滑らかなKähler多様体$X$の全次数の滑らかな複素形式に対し、$L=\omega\wedge(-)$、$\Lambda=L^*$および$\Delta_d=dd^*+d^*d$を用いると

$$
\boxed{[L,\Delta_d]=[\Lambda,\Delta_d]=0}
$$

> が微分作用素として成立する。よって$L$は次数を$2$、複素型を$(1,1)$上げて調和形式を調和形式へ写し、$\Lambda$は対応して下げる。コンパクト性は必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

[三Laplacian一致](#thm-hod1-05-laplacian-equality)から$\Delta_d=2\Delta_\partial$だけを計算すればよい。[随伴との交換子](#lem-hod1-05-lefschetz-adjoints)を各積へ分配すると、$[L,\Delta_\partial]$は$\partial\bar\partial+\bar\partial\partial$に変わる。

<!-- proof-start -->
### 証明

積の交換子は$[L,AB]=[L,A]B+A[L,B]$である。これを[型別Laplacian](../HOD1-01/index.md#def-hod1-01-type-laplacians)へ使うと

$$
\begin{aligned}
[L,\Delta_\partial]
&=[L,\partial\partial^*+\partial^*\partial]\\
&=[L,\partial]\partial^*+\partial[L,\partial^*]
 +[L,\partial^*]\partial+\partial^*[L,\partial]\\
&=i(\partial\bar\partial+\bar\partial\partial)=0.
\end{aligned}
$$

二行目では[前補題](#lem-hod1-05-lefschetz-adjoints)を代入し、最後は[二重複体の反交換関係](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)を用いた。[三Laplacian一致](#thm-hod1-05-laplacian-equality)より

$$
[L,\Delta_d]=2[L,\Delta_\partial]=0.
$$

$\Delta_d$は形式的に自己随伴である。実際$dd^*$と$d^*d$は各々その随伴に等しい。そこで$[L,\Delta_d]=0$の形式的随伴を取ると

$$
0=[L,\Delta_d]^*
=\Delta_d\Lambda-\Lambda\Delta_d
=-[\Lambda,\Delta_d].
$$

よって第二の交換子も零である。もし$\Delta_d\alpha=0$なら、$\Delta_d(L\alpha)=L(\Delta_d\alpha)=0$、$\Delta_d(\Lambda\alpha)=\Lambda(\Delta_d\alpha)=0$が直ちに従う。型変化は[$L$と$\Lambda$の型](../HOD1-02/index.md#prop-hod1-02-bidegree)から$(1,1)$と$(-1,-1)$である。$\square$
<!-- proof-end -->

**複素次元2の最小例。** 平坦な$\mathbb C^2$のunitary余標構$\theta^1,\theta^2$で$\omega=i(\theta^1\wedge\bar\theta^1+\theta^2\wedge\bar\theta^2)$とする。定数係数の$\theta^1$は$d\theta^1=d^*\theta^1=0$なので調和的であり、

$$
L\theta^1
=i\theta^2\wedge\bar\theta^2\wedge\theta^1
$$

も定数係数で調和的である。$L$は$(1,0)$型を$(2,1)$型へ移した。非コンパクトな$\mathbb C^2$ではこれは**微分方程式として**の例であり、$L^2$調和形式の例だとは言っていない。

## 5. 調和性を$(p,q)$型ごとに取り出す

[実Hodge理論の調和形式](../../GA/GA6/index.md#def-ga6-harmonic-form)は、次数$k$のLaplacianの核だった。一方、複素形式には[$(p,q)$型への直交分解](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)がある。一般Hermite計量で$\Delta_d$が型を混ぜることはあり得るので、型成分が調和であるかは別問題である。

Kähler上では[三Laplacian一致](#thm-hod1-05-laplacian-equality)がこの隙間を埋める。$\bar\partial$は$q$を1上げ、$\bar\partial^*$は$q$を1下げるから、積である$\Delta_{\bar\partial}$は$(p,q)$型を保つ。

そこで実Hodgeの調和形式のうち、特定の型を持つ部分を明示的に区別しよう。

<a id="def-hod1-05-harmonic-pq"></a>

<!-- formal-statement-start -->
> **定義（型別調和形式）**
> 複素次元$n$の滑らかなKähler多様体$X$上で、$0\le p,q\le n$とする。$(p,q)$型の滑らかな複素微分形式$\alpha$が非負Hodge Laplacian $\Delta_d$について$\Delta_d\alpha=0$を満たすとき、**調和$(p,q)$形式**と呼び、その空間を

$$
\mathcal H^{p,q}(X)
=\{\alpha\in\Omega^{p,q}(X):\Delta_d\alpha=0\}
$$

> と書く。全次数$k$の調和形式は$\mathcal H^k(X)=\ker(\Delta_d:\Omega^k\to\Omega^k)$とする。この段階ではコホモロジー群との同一視を定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-05-harmonic-pq -->
**定義の確認**（平坦トーラス）。$\mathbb C^2$を格子$(2\pi\mathbb Z+2\pi i\mathbb Z)^2$で割り、$z^j=x_j+iy_j$、$g_{\mathbb R}=\sum_{j=1}^2(dx_j^2+dy_j^2)$を入れた複素トーラスを$T^2_{\mathbb C}$とする。計量と$dz^j$は格子平行移動で不変なので商へ降りる。対応する基本形式$\omega=\sum_{j=1}^2dx_j\wedge dy_j$は閉じており、Euclid計量は正定値だから、このトーラスはKählerである。

$dz^1=dx_1+i\,dy_1$は大域的な$(1,0)$形式である。ここで$u=(x_1,y_1,x_2,y_2)$と置き、任意の周期的な1形式$\eta=\sum_{a=1}^4c_a\,du^a$に対して、[余微分の随伴関係](../../GA/GA6/index.md#prop-ga6-adjoint)を複素形式へ延長し、周期積分の部分積分を使う。任意の周期関数$h$について

$
(dh,\eta)_2
=\int_{T^2_{\mathbb C}}\sum_{a=1}^4\overline{\partial_{u^a}h}\,c_a\,dV
=-\int_{T^2_{\mathbb C}}\overline h\sum_{a=1}^4\partial_{u^a}c_a\,dV.
$

従って$d^*\eta=-\sum_a\partial_{u^a}c_a$である。$dz^1$の係数は$(1,i,0,0)$と一定なので$d^*(dz^1)=0$。また$d(dx_1+i\,dy_1)=0$だから$d(dz^1)=0$でもある。[Hodge Laplacianの定義](../../GA/GA6/index.md#def-ga6-hodge-laplacian)を代入すると

$$
\Delta_d(dz^1)=d(d^*dz^1)+d^*(d dz^1)=0.
$$

従って$dz^1\in\mathcal H^{1,0}(T^2_{\mathbb C})$となる。同様に$d\bar z^2\in\mathcal H^{0,1}(T^2_{\mathbb C})$であり、両者の和は次数1の調和形式だが、一つの純型ではない。型と調和性の**両条件**を直接確認した。
<!-- definition-example-end -->

<a id="thm-hod1-05-harmonic-types"></a>

<!-- formal-statement-start -->
> **定理（調和形式の型保存と閉・余閉判定）**
> $X$を複素次元$n$の滑らかなKähler多様体とする。各整数$k$について滑らかな複素$k$形式を一意に$\alpha=\sum_{p+q=k}\alpha^{p,q}$と分解すると、$\Delta_d$は各$\Omega^{p,q}$を保ち、次が成り立つ。

$$
\Delta_d\alpha=0
\quad\Longleftrightarrow\quad
\Delta_d\alpha^{p,q}=0\quad(\text{すべての }p+q=k).
$$

> 従って、滑らかな解空間の直和として

$$
\mathcal H^k(X)
=\bigoplus_{p+q=k}\mathcal H^{p,q}(X).
$$

> さらに$X$が**コンパクト・境界なし**なら、滑らかな複素形式$\alpha$について、$\Delta_d\alpha=0$は

$$
\partial\alpha=\bar\partial\alpha
=\partial^*\alpha=\bar\partial^*\alpha=0
$$

> と同値である。この主張だけからde Rhamコホモロジーの型別分解を既証明としてはならない。
<!-- formal-statement-end -->

### 証明の見取り図

型保存は[$\Delta_d=2\Delta_{\bar\partial}$](#thm-hod1-05-laplacian-equality)と型別随伴の入出力次数を確認する。直和性は型分解の一意性による。コンパクト性を使うのは最後だけで、[Hodgeのエネルギー恒等式](../../GA/GA6/index.md#thm-ga6-energy)と型別の内積を積分する。

<!-- proof-start -->
### 証明

[型別微分](../../CM/CM2-02/index.md#def-cm2-02-dolbeault-operators)と[その随伴](../HOD1-01/index.md#prop-hod1-01-adjoint-projections)は

$$
\bar\partial:\Omega^{p,q}\to\Omega^{p,q+1},\qquad
\bar\partial^*:\Omega^{p,q}\to\Omega^{p,q-1}
$$

を満たす。従って$\bar\partial\bar\partial^*$と$\bar\partial^*\bar\partial$のどちらも$\Omega^{p,q}$を同じ型へ写す。[三Laplacian一致](#thm-hod1-05-laplacian-equality)で$\Delta_d=2\Delta_{\bar\partial}$だから$\Delta_d$も型を保つ。

一般の$\alpha=\sum_{p+q=k}\alpha^{p,q}$に線形性を適用すると

$$
\Delta_d\alpha
=\sum_{p+q=k}\Delta_d\alpha^{p,q},
\qquad
\Delta_d\alpha^{p,q}\in\Omega^{p,q}.
$$

[型分解の一意性](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)から、右辺の和が零であることと各項が零であることは同値である。異なる型の共通部分は零なので、調和形式の直和も成立する。ここまではコンパクト性を使っていない。

最後に$X$がコンパクト境界なしだとする。[形式的随伴の積分関係](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)を$\partial\alpha$と$\partial^*\alpha$へ一度ずつ適用すると

$$
\begin{aligned}
(\Delta_\partial\alpha,\alpha)_2
&=(\partial\partial^*\alpha,\alpha)_2
 +(\partial^*\partial\alpha,\alpha)_2\\
&=\|\partial^*\alpha\|_2^2+\|\partial\alpha\|_2^2.
\end{aligned}
$$

同様に

$$
(\Delta_{\bar\partial}\alpha,\alpha)_2
=\|\bar\partial^*\alpha\|_2^2+\|\bar\partial\alpha\|_2^2.
$$

[三Laplacian一致](#thm-hod1-05-laplacian-equality)により、$\Delta_d\alpha=0$なら両方の左辺は零である。各右辺は非負ノルム二つの和なので、四つのノルムが零となり、滑らかさから四つの形式も零になる。逆に四つの微分・随伴がすべて零なら$\Delta_\partial\alpha=0$、ゆえに$\Delta_d\alpha=2\Delta_\partial\alpha=0$である。$\square$
<!-- proof-end -->

特に**調和形式の型別直和**と**de Rhamコホモロジーの直和**は別の段階である。コホモロジー類に調和代表が一意に存在すること、その代表が型へ分かれること、Dolbeault群との対応を証明して初めて後者へ進める。

## 6. Kähler条件を捨てるとどこで破れるか

複素構造とHermite計量があるだけでも$\partial^2=\bar\partial^2=0$は成立する。それでも[前章で見た非Kählerの補正項](../HOD1-04/index.md#prop-hod1-04-non-kahler)が残り、混合随伴反交換子を上の方法で消すことはできない。差が数値として見える模型を一つ計算する。

<a id="prop-hod1-05-non-kahler"></a>

<!-- formal-statement-start -->
> **命題（非Kähler共形計量のLaplacian不一致）**
> $\mathbb C^2$の実座標を$z^j=x_j+iy_j$とし、標準複素構造とHermite計量

$$
g_{\mathbb R}
=e^{2x_1}(dx_1^2+dy_1^2+dx_2^2+dy_2^2)
$$

> をとる。これはKähler計量ではない。正則関数$f=z^1$に対し、滑らかな関数上の形式的微分作用素として

$$
\Delta_{\bar\partial}f=0,\qquad
\Delta_df=-2e^{-2x_1}\ne0.
$$

> 従って$\Delta_d=2\Delta_{\bar\partial}$は一般のHermite計量では成立しない。ここでは非コンパクトな$\mathbb C^2$上の局所微分作用素を比較しており、$L^2$固有関数の主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$f$が正則なので$\bar\partial f=0$となる。一方、関数上の$\Delta_d$は計量の体積密度を含む発散型作用素であり、共形因子の一階微分が残る。Kähler条件が必要なことを、零次・一階の混同なしに直接検査する。

<!-- proof-start -->
### 証明

標準Euclid計量の基本形式を$\omega_0=dx_1\wedge dy_1+dx_2\wedge dy_2$とすると、与えた計量の基本形式は$\omega=e^{2x_1}\omega_0$である。ゆえに

$$
\begin{aligned}
d\omega
&=2e^{2x_1}dx_1\wedge\omega_0\\
&=2e^{2x_1}dx_1\wedge dx_2\wedge dy_2\ne0.
\end{aligned}
$$

このためKähler条件は失われている。

$f=z^1=x_1+iy_1$は正則だから$\bar\partial f=0$。[型別Laplacianの定義](../HOD1-01/index.md#def-hod1-01-type-laplacians)で関数に対する$\bar\partial^*f=0$も使うと

$$
\Delta_{\bar\partial}f
=\bar\partial\bar\partial^*f+\bar\partial^*\bar\partial f=0.
$$

次に実座標を$u^1=x_1,u^2=y_1,u^3=x_2,u^4=y_2$と置く。この座標基底では計量行列が$g_{ab}=e^{2x_1}\delta_{ab}$なので、逆行列は$g^{ab}=e^{-2x_1}\delta^{ab}$、行列式は$\det(g_{ab})=(e^{2x_1})^4=e^{8x_1}$、体積密度は$\sqrt{\det g}=e^{4x_1}$となる。この計量表示を[Hodge Laplacianの関数上の座標公式](../../GA/GA6/index.md#thm-ga6-energy)へ代入すれば

$$
\begin{aligned}
\Delta_d f
&=-\frac1{\sqrt{\det g}}\sum_{a,b=1}^4
\partial_{u^a}\left(\sqrt{\det g}\,g^{ab}\partial_{u^b}f\right)\\
&=-e^{-4x_1}\sum_{a=1}^4
\partial_{u^a}\left(e^{2x_1}\partial_{u^a}f\right).
\end{aligned}
$$

$\partial_{x_1}f=1$、$\partial_{y_1}f=i$、残りの二方向の微分は零である。従って和の非零項は

$$
\begin{aligned}
\sum_a\partial_{u^a}
\left(e^{2x_1}\partial_{u^a}f\right)
&=\partial_{x_1}(e^{2x_1})+\partial_{y_1}(ie^{2x_1})\\
&=2e^{2x_1}+0.
\end{aligned}
$$

最初の式へ代入して$\Delta_df=-2e^{-2x_1}$が従う。$\square$
<!-- proof-end -->

Kähler条件がないとき、「正則関数だから$\bar\partial$調和」は真でも、「だから$d$調和」は偽になり得る。上の例では**$\bar\partial$と$\Delta_d$の関係を保証する交換子が壊れる**のであり、二重複体の恒等式そのものが壊れたのではない。

## 7. 演習：混合項・係数2・調和型を自分で確かめる

### Level A：一つずつ符号と次数を確認する

<a id="ex-hod1-05-a01"></a>
#### HOD1-05-A01 二乗零から混合反交換子へ
- Level: A

滑らかなKähler多様体上で$A=\partial$とし、$A^2=0$、$[\Lambda,A]=i\bar\partial^*$を使って$\{A,\bar\partial^*\}=0$を四項へ展開して示せ。

<!-- solution-start -->
### 詳細解答

[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)を$\bar\partial^*=-i(\Lambda A-A\Lambda)$と直して代入する。

$$
\begin{aligned}
\{A,\bar\partial^*\}
&=-i\{A,\Lambda A-A\Lambda\}\\
&=-i(A\Lambda A-A^2\Lambda+\Lambda A^2-A\Lambda A)\\
&=-i(-A^2\Lambda+\Lambda A^2)=0.
\end{aligned}
$$

最初と最後の$A\Lambda A$が相殺し、残る二項は[二乗零](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)で消える。個々の$A\bar\partial^*$が零とは主張していない。
<!-- solution-end -->

<a id="ex-hod1-05-a02"></a>
#### HOD1-05-A02 随伴を取るときの符号
- Level: A

Kähler多様体で$[\Lambda,\bar\partial]=-i\partial^*$、$L^*=\Lambda$とする。形式的随伴を取り、$[L,\bar\partial^*]$を求めよ。

<!-- solution-start -->
### 詳細解答

[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)の両辺を随伴すると

$$
\begin{aligned}
[\Lambda,\bar\partial]^*
&=(\Lambda\bar\partial-\bar\partial\Lambda)^*\\
&=\bar\partial^*L-L\bar\partial^*=-[L,\bar\partial^*],\\
(-i\partial^*)^*&=i\partial.
\end{aligned}
$$

二式を等置すると$-[L,\bar\partial^*]=i\partial$。従って

$$
[L,\bar\partial^*]=-i\partial.
$$

交換子の反転と$i$の複素共役の二つを別々に処理した。
<!-- solution-end -->

<a id="ex-hod1-05-a03"></a>
#### HOD1-05-A03 展開に残る四種類の項
- Level: A

滑らかなKähler多様体で$d=\partial+\bar\partial$、$d^*=\partial^*+\bar\partial^*$とする。$\Delta_d$を展開し、どの二組が混合項であるかと、残る二組の名称を記せ。

<!-- solution-start -->
### 詳細解答

[型別随伴の和](../HOD1-01/index.md#prop-hod1-01-adjoint-projections)を使って積を分配する。

$$
\begin{aligned}
\Delta_d
&=(\partial+\bar\partial)(\partial^*+\bar\partial^*)
 +(\partial^*+\bar\partial^*)(\partial+\bar\partial)\\
&=(\partial\partial^*+\partial^*\partial)
 +(\bar\partial\bar\partial^*+\bar\partial^*\bar\partial)\\
&\quad+(\partial\bar\partial^*+\bar\partial^*\partial)
 +(\bar\partial\partial^*+\partial^*\bar\partial).
\end{aligned}
$$

最初の二組が$\Delta_\partial,\Delta_{\bar\partial}$で、残り二組が混合反交換子。[混合項の補題](#lem-hod1-05-mixed-adjoints)により各組の和は零だから、$\Delta_d=\Delta_\partial+\Delta_{\bar\partial}$である。
<!-- solution-end -->

<a id="ex-hod1-05-a04"></a>
#### HOD1-05-A04 平坦Fourierモードの数値検算
- Level: A

標準平坦トーラス$T=\mathbb C/(2\pi\mathbb Z+2\pi i\mathbb Z)$上の$f(x,y)=e^{i(2x-3y)}$について、$\Delta_\partial f$、$\Delta_{\bar\partial}f$、$\Delta_df$を求めよ。計量は$dx^2+dy^2$とする。

<!-- solution-start -->
### 詳細解答

[平坦トーラスの固有値公式](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)に$r=2,s=-3$を代入する。途中の平方和は

$$
r^2+s^2=2^2+(-3)^2=4+9=13.
$$

従って

$$
\Delta_\partial f=\frac{13}{2}f,\quad
\Delta_{\bar\partial}f=\frac{13}{2}f,\quad
\Delta_df=13f.
$$

型別の固有値は非負で、二つを足すと実Hodgeの固有値に一致する。
<!-- solution-end -->

### Level B：複数の作用をつなぐ

<a id="ex-hod1-05-b01"></a>
#### HOD1-05-B01 $\Delta_\partial-\Delta_{\bar\partial}$を直接消す
- Level: B

滑らかなKähler多様体で$A=\partial,B=\bar\partial$とし、$A^*=i[\Lambda,B]$、$B^*=-i[\Lambda,A]$および$AB+BA=0$を使う。$\Delta_\partial=\Delta_{\bar\partial}$を、$\Delta_d$を経由せずに証明せよ。

<!-- solution-start -->
### 詳細解答

[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)を随伴の代入式へ直し、型別Laplacianの定義に代入する。

$$
\begin{aligned}
\Delta_\partial-\Delta_{\bar\partial}
&=i\{A,[\Lambda,B]\}+i\{B,[\Lambda,A]\}\\
&=i\bigl(A\Lambda B-AB\Lambda+\Lambda BA-B\Lambda A\\
&\qquad+B\Lambda A-BA\Lambda+\Lambda AB-A\Lambda B\bigr).
\end{aligned}
$$

$A\Lambda B$と$B\Lambda A$がそれぞれ相殺し、残りは

$$
i\{\Lambda(BA+AB)-(AB+BA)\Lambda\}
=i[\Lambda,AB+BA]=0.
$$

最後は[型別微分の反交換性](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)。従って$\Delta_\partial=\Delta_{\bar\partial}$となる。
<!-- solution-end -->

<a id="ex-hod1-05-b02"></a>
#### HOD1-05-B02 Lefschetz可換性と非零の調和形式
- Level: B

複素次元2の平坦複素トーラス$T=\mathbb C^2/(2\pi\mathbb Z+2\pi i\mathbb Z)^2$上で、$\theta^j=dz^j/\sqrt2$、$\omega=i\sum_j\theta^j\wedge\bar\theta^j$とする。$\alpha=\bar\theta^1$について$L\alpha$を展開し、型と調和性を確認せよ。

<!-- solution-start -->
### 詳細解答

$\bar\theta^1\wedge\bar\theta^1=0$なので、$L\bar\theta^1$では$j=1$の項が消える。

$$
\begin{aligned}
L\alpha
&=i(\theta^1\wedge\bar\theta^1+\theta^2\wedge\bar\theta^2)
\wedge\bar\theta^1\\
&=i\theta^2\wedge\bar\theta^2\wedge\bar\theta^1.
\end{aligned}
$$

正則因子が一つ、反正則因子が二つで$(1,2)$型である。$\alpha$は定数係数で$d\alpha=d^*\alpha=0$だから$\Delta_d\alpha=0$。[Laplacianとの可換性](#thm-hod1-05-laplacian-lefschetz)を使うと

$$
\Delta_d(L\alpha)=L(\Delta_d\alpha)=0.
$$

$L\alpha$自身も定数係数なので、直接微分して$d(L\alpha)=d^*(L\alpha)=0$と再確認できる。
<!-- solution-end -->

<a id="ex-hod1-05-b03"></a>
#### HOD1-05-B03 調和性の型分解と四つの零条件
- Level: B

$X$を滑らかなコンパクト境界なしのKähler多様体とし、$\alpha\in\Omega^2(X)$を$\alpha^{2,0}+\alpha^{1,1}+\alpha^{0,2}$へ分ける。$\Delta_d\alpha=0$なら三成分がそれぞれ調和であり、さらに$\bar\partial^*\alpha^{1,1}=0$となることを根拠付きで示せ。

<!-- solution-start -->
### 詳細解答

[型保存定理](#thm-hod1-05-harmonic-types)の証明で使った$\Delta_d=2\Delta_{\bar\partial}$は各型を保つ。従って

$$
0=\Delta_d\alpha
=\Delta_d\alpha^{2,0}+\Delta_d\alpha^{1,1}+\Delta_d\alpha^{0,2}
$$

の三項は互いに異なる型に属する。[型分解の一意性](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)より各項が零となる。とくに$\Delta_d\alpha^{1,1}=0$である。

コンパクト・境界なしなので、$\bar\partial$の形式的随伴を積分の両側へ移して

$$
0=(\Delta_{\bar\partial}\alpha^{1,1},\alpha^{1,1})_2
=\|\bar\partial\alpha^{1,1}\|_2^2
 +\|\bar\partial^*\alpha^{1,1}\|_2^2.
$$

二つの非負項はそれぞれ零である。滑らかな$\bar\partial^*\alpha^{1,1}$の$L^2$ノルムが零だから、$\bar\partial^*\alpha^{1,1}=0$が点ごとに従う。コンパクト性はこの積分からの判定に用いた。
<!-- solution-end -->

<a id="ex-hod1-05-b04"></a>
#### HOD1-05-B04 共形計量で正則性と調和性を比較する
- Level: B

$\mathbb C^2$に$g=e^{2t x_1}g_{\mathrm{Euclid}}$（$t$は非零の実数）を入れ、$f=z^1$とする。$d\omega\ne0$を示し、体積密度・逆計量を計算して$\Delta_{\bar\partial}f=0$、$\Delta_df\ne0$を確認せよ。$t=0$にすると何が変わるか。

<!-- solution-start -->
### 詳細解答

$\omega=e^{2t x_1}(dx_1\wedge dy_1+dx_2\wedge dy_2)$だから

$$
d\omega=2t e^{2t x_1}dx_1\wedge dx_2\wedge dy_2\ne0.
$$

$f=z^1$は正則で$\bar\partial f=0$、関数上で$\bar\partial^*f=0$。従って$\Delta_{\bar\partial}f=0$である。

実4次元の計量行列は$e^{2t x_1}I_4$なので、$\sqrt{\det g}=e^{4t x_1}$、$g^{-1}=e^{-2t x_1}I_4$である。[関数上のHodge Laplacian](../../GA/GA6/index.md#thm-ga6-energy)へ代入すると

$$
\begin{aligned}
\Delta_df
&=-e^{-4t x_1}\sum_{a=1}^4
\partial_{u^a}(e^{2t x_1}\partial_{u^a}f)\\
&=-e^{-4t x_1}
\{\partial_{x_1}e^{2t x_1}
 +\partial_{y_1}(ie^{2t x_1})\}\\
&=-2t e^{-2t x_1}\ne0.
\end{aligned}
$$

したがって、失われた仮定は$d\omega=0$であり、破れた機構は[Kähler恒等式による混合項の相殺](#lem-hod1-05-mixed-adjoints)である。単に$\bar\partial^2=0$が失敗したわけではない。$t=0$ならEuclid計量に戻り、$d\omega=0$かつ両Laplacianは$f=z^1$を零へ写す。
<!-- solution-end -->

### Level C：型・固有値・Lefschetz作用を統合する

<a id="ex-hod1-05-c01"></a>
#### HOD1-05-C01 平坦複素2トーラスで二つの異なる作用を追う
- Level: C

平坦複素2トーラス$T=\mathbb C^2/(2\pi\mathbb Z+2\pi i\mathbb Z)^2$で$\theta^j=dz^j/\sqrt2$、$\omega=i\sum_{j=1}^2\theta^j\wedge\bar\theta^j$、$L=\omega\wedge(-)$、$\Lambda=L^*$とする。次の滑らかな形式を考える。

$$
f=e^{i(x_1+2y_2)},\qquad
\alpha=f\theta^1,\qquad
\beta=\theta^1+\bar\theta^2.
$$

1. $\alpha$の型と三つのLaplacianの固有値を求めよ。
2. $\beta$を型へ分解して、各成分が調和であることを直接確認せよ。
3. $L\beta$の二つの型成分を外積で求め、それぞれ調和であることを証明せよ。
4. $\Lambda L\beta=\beta$を、交換子$[\Lambda,L]$と次数から確かめよ。

<!-- solution-start -->
### 詳細解答

**1. Fourierモードと型。** $\theta^1$は$(1,0)$型で$f$は関数だから$\alpha\in\Omega^{1,0}$である。

平坦計量では$d,d^*$が定数係数の作用素である。実座標を$(u^1,u^2,u^3,u^4)=(x_1,y_1,x_2,y_2)$とし、$E_a=du^a\wedge(-)$、$I_a=\iota_{\partial_{u^a}}$と置く。実正規直交余標構でも[外積と収縮の随伴関係](../HOD1-02/index.md#def-hod1-02-creation-annihilation)と同じく$E_a^*=I_a$であり、周期積分の部分積分から$(\partial_{u^a})^*=-\partial_{u^a}$となる。従って、すべての次数の平坦形式に対し

$
d=\sum_a E_a\partial_{u^a},\qquad
d^*=-\sum_a I_a\partial_{u^a}.
$

外積と収縮の反交換式$E_aI_b+I_bE_a=\delta_{ab}$を使えば、平坦余標構の各係数には[関数上の平坦Laplacian](../HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)と同じ演算が作用する。

$$
dd^*+d^*d
=-\sum_{a,b}(E_aI_b+I_bE_a)\partial_{u^a}\partial_{u^b}
=-\sum_a\partial_{u^a}^2.
$$

ここで

$$
\partial_{x_1}^2f=-f,\qquad
\partial_{y_2}^2f=-4f,\qquad
\partial_{y_1}^2f=\partial_{x_2}^2f=0.
$$

よって$\Delta_d\alpha=5\alpha$。[三Laplacian一致](#thm-hod1-05-laplacian-equality)から

$$
\Delta_\partial\alpha
=\frac52\alpha,\qquad
\Delta_{\bar\partial}\alpha
=\frac52\alpha.
$$

**2. $\beta$の調和型。** 分解は

$$
\beta^{1,0}=\theta^1,\qquad
\beta^{0,1}=\bar\theta^2.
$$

定数係数で平坦な余標構なので、どちらも$d$と$d^*$で零へ写る。従って[Hodge Laplacianの定義](../../GA/GA6/index.md#def-ga6-hodge-laplacian)により

$$
\Delta_d\theta^1=0,\qquad
\Delta_d\bar\theta^2=0.
$$

各成分はそれぞれ$\mathcal H^{1,0}(T)$と$\mathcal H^{0,1}(T)$に属する。和$\beta$も調和だが純型ではない。

**3. $L\beta$の型。** $\theta^j\wedge\theta^j=0$、$\bar\theta^j\wedge\bar\theta^j=0$を使って一項ずつ残すと

$$
\begin{aligned}
L\theta^1&=i\theta^2\wedge\bar\theta^2\wedge\theta^1
  &&\in\Omega^{2,1},\\
L\bar\theta^2&=i\theta^1\wedge\bar\theta^1\wedge\bar\theta^2
  &&\in\Omega^{1,2}.
\end{aligned}
$$

[Laplacianと$L$の可換性](#thm-hod1-05-laplacian-lefschetz)を各調和成分へ適用すると

$$
\Delta_d(L\theta^1)=L(\Delta_d\theta^1)=0,\qquad
\Delta_d(L\bar\theta^2)=L(\Delta_d\bar\theta^2)=0.
$$

従って二つの成分はそれぞれ調和である。

**4. $\Lambda L$の検算。** [Lefschetz交換子の公式](../HOD1-02/index.md#thm-hod1-02-commutator)は全次数$k$の形式上で$[\Lambda,L]=(n-k)\,\mathrm{id}$を与える。今回$n=2,k=1$なので$[\Lambda,L]\beta=\beta$。また$\Lambda$は次数を2下げるため、次数1の$\beta$では$\Lambda\beta=0$。ゆえに

$$
\Lambda L\beta
=[\Lambda,L]\beta+L\Lambda\beta
=\beta+0=\beta.
$$

ここで使ったのは**点ごとの線形代数と調和性の保存**であり、まだコホモロジー上のHard Lefschetz同型を主張していない。
<!-- solution-end -->

## 8. 次へ：調和形式をコホモロジーへ結び付ける

Kähler条件から三つのLaplacianが一致し、$L$・$\Lambda$と交換し、調和形式が型別に分かれることが分かった。ただし、形式の核を型別に分けただけでは、de Rham類やDolbeault類を型へ分解したことにはならない。次は[実Hodge理論の調和代表](../../GA/GA6/index.md#thm-ga6-hodge-decomposition)を使い、調和形式の結果をコホモロジーへ移す。
