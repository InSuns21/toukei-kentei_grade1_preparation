# HOD1-04 Kähler恒等式の局所導出

<!-- definition-example-audit: strict -->

## 1. 点ごとのLefschetz計算から微分作用素へ

これまでに、[Lefschetz作用素とその随伴](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)はunitary余標構で

$$
L=i\sum_{j=1}^n E_j\bar E_j,\qquad
\Lambda=-i\sum_{j=1}^n\bar I_jI_j
$$

と表せた。[原始形式のLefschetz列](../HOD1-03/index.md#lem-hod1-03-primitive-ladder)は、形式を一点で分解する有限次元の結果だった。しかし今度は$\partial$や$\bar\partial$で**形式を微分する**。計量が点ごとに変わると$\Lambda$の係数も変わるから、点ごとの交換子をそのまま微分作用素の交換子に使えるとは限らない。

Kähler条件の強さは、どの点でも**一階微分が消える正則座標**を取れることにある。そこで微分作用素の随伴を局所で求め、外積・収縮の符号と突き合わせる。

以下、$X$は複素次元$n\ge1$の滑らかな**Kähler多様体**で、基本形式は$\omega(U,V)=g_{\mathbb R}(JU,V)$とする。コンパクト性・境界の有無はこの章の局所恒等式には不要である。形式的随伴はコンパクト台の形式について[HOD1-01の定義](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)で定める。内積は第1変数を共役線形とし、$[A,B]=AB-BA$を採用する。次数範囲外の形式は零とする。

## 2. Kähler正規正則座標を作る

普通の正則座標$z^1,\ldots,z^n$では

$$
\omega=i\sum_{j,k}g_{j\bar k}(z)\,dz^j\wedge d\bar z^k
$$

となり、$\partial g_{j\bar k}$が現れる。点$x$だけでの計算なら、まず線形正則変換で$g_{j\bar k}(x)=\delta_{jk}/2$にできる。それだけでは$\partial_\ell g_{j\bar k}(x)$は消えない。**正則な二次座標変換で一階微分まで消す**座標を使いたい。以下でその条件と名前を定める。

<a id="def-hod1-04-normal-coordinates"></a>

<!-- formal-statement-start -->
> **定義（Kähler正規正則座標）**
> 複素次元$n$のKähler多様体$(X,J,g_{\mathbb R})$の点$x$の近傍で、$z(x)=0$を満たす正則座標$z^1,\ldots,z^n$が次を満たすとき、点$x$でのKähler正規正則座標と呼ぶ。

$$
g_{j\bar k}(0)=\frac12\delta_{jk},\qquad
\partial_\ell g_{j\bar k}(0)
=\partial_{\bar\ell}g_{j\bar k}(0)=0.
$$

> 係数$1/2$は$\mathbb C^n$の実Euclid計量$g_{\mathbb R}=\sum_j(dx_j^2+dy_j^2)$との整合による。この定義は点での条件であり、近傍全体で曲率零とは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-04-normal-coordinates -->
**定義の確認**（平坦模型）。$\mathbb C^2$で$z^j=x_j+iy_j$、$g_{\mathbb R}=dx_1^2+dy_1^2+dx_2^2+dy_2^2$とする。[座標計量の正規化](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)から$g_{j\bar k}=\delta_{jk}/2$が全点で成り立つ。ゆえに任意の点を原点へ平行移動すれば上の値と全一階微分零を確認できる。さらに$\omega=\frac i2\sum_jdz^j\wedge d\bar z^j$であり、$\partial\omega=\bar\partial\omega=0$を係数が定数であることから直接確かめられる。
<!-- definition-example-end -->

<a id="prop-hod1-04-normal-existence"></a>

<!-- formal-statement-start -->
> **命題（Kähler正規正則座標の存在）**
> 任意の滑らかなKähler多様体$X$の任意の点$x$には、上記の条件を満たす正則座標が存在する。この座標で次を置く。

$$
\theta^j=\frac{dz^j}{\sqrt2}.
$$

> 点$x$で$\{\theta^j,\bar\theta^j\}$は正規直交複素余標構であり、Levi–Civita接続$\nabla$について次が成り立つ。

$$
\nabla\theta^j(x)=\nabla\bar\theta^j(x)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

基本形式が閉じていることは、正則添字を交換できることを意味する。その対称性が、二次座標変換の係数を選べる条件になる。最初の一次座標変換で計量を標準形にしてから実行する。

<!-- proof-start -->
### 証明

まず正定値Hermite行列$(g_{j\bar k}(x))$を定数複素線形変換で$\frac12 I_n$にする。点$x$を$z=0$とし、

$$
g_{j\bar k}(z)=\frac12\delta_{jk}
+\sum_\ell A_{\ell j\bar k}z^\ell
+\sum_\ell\overline{A_{\ell k\bar j}}\,\bar z^\ell+O(|z|^2)
$$

とTaylor展開する。$d\omega=0$の$(2,1)$型成分を係数比較すると

$$
\partial_\ell g_{j\bar k}
-\partial_j g_{\ell\bar k}=0,
\qquad A_{\ell j\bar k}=A_{j\ell\bar k}.
$$

ここは[Kähler閉性の局所判定](../../KAH/KAH1-03/index.md#thm-kah1-03-closed-torsion)と同じ条件である。対称な係数で正則座標変換

$$
w^k=z^k+\sum_{\ell,j}A_{\ell j\bar k}z^\ell z^j
$$

を定める。Jacobianは原点で単位行列なので、逆関数定理によって局所正則座標となる。逆写像を一階微分すると

$$
\frac{\partial z^u}{\partial w^j}
=\delta^u_j-2\sum_\ell A_{\ell j\bar u}w^\ell+O(|w|^2).
$$

座標変換後の計量成分は

$$
g'_{j\bar k}(w)
=\sum_{u,v}\frac{\partial z^u}{\partial w^j}
\overline{\frac{\partial z^v}{\partial w^k}}\,
g_{u\bar v}(z(w)).
$$

$w=0$で$\partial/\partial w^\ell$をかけると、逆Jacobianの一次項$-2A_{\ell j\bar k}$に$g_{k\bar k}(0)=1/2$が掛かる寄与と、元の計量の$A_{\ell j\bar k}$が打ち消し合い、

$$
\partial_\ell g'_{j\bar k}(0)
=-2A_{\ell j\bar k}\cdot\frac12+A_{\ell j\bar k}=0.
$$

複素共役から反正則方向の一階微分も零である。これで正規座標が得られた。

点$x$で$g_{\mathbb R}$の実座標成分も標準形かつ一階微分零であり、[Levi–Civita接続の座標公式](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)のChristoffel記号はすべて零となる。$dz^j$は座標余標構なので、$\nabla dz^j(x)=0$。同じことが$\theta^j=dz^j/\sqrt2$と共役にも成立する。$\square$
<!-- proof-end -->

定数Euclid計量は全点でこの性質を持つが、一般のKähler計量では**選んだ点だけ**でよい。作用素恒等式が一点の計算で済む理由は、点$x$を任意に選んだからである。

## 3. 外積・収縮の交換子を手で求める

点$x$で正規余標構を固定し、$Z_j=\sqrt2\,\partial/\partial z^j$、$\bar Z_j=\sqrt2\,\partial/\partial\bar z^j$と書く。$E_j=\theta^j\wedge(-)$、$\bar E_j=\bar\theta^j\wedge(-)$の随伴$I_j,\bar I_j$は[収縮の定義](../HOD1-02/index.md#def-hod1-02-creation-annihilation)で既習である。添字$j$は「どの基底因子を消すか」を指定し、複素共役は$\bar I$で示す。

一つの基底因子を先頭に移して消すとき、外積の反対称性により次の関係を満たす。

$$
\begin{aligned}
I_jE_k+E_kI_j&=\delta_{jk},&
\bar I_j\bar E_k+\bar E_k\bar I_j&=\delta_{jk},\\
I_j\bar E_k+\bar E_kI_j&=0,&
\bar I_jE_k+E_k\bar I_j&=0.
\end{aligned}
$$

例えば$k=j$で$I_j(\theta^j\wedge\alpha)=\alpha-\theta^j\wedge I_j\alpha$となる。$\theta$と$\bar\theta$は互いに異なる基底因子なので、交差した場合に$\delta$項は出ない。

<a id="lem-hod1-04-algebra"></a>

<!-- formal-statement-start -->
> **補題（外積とLefschetz随伴の局所交換子）**
> 複素次元$n$のHermiteベクトル空間に正規直交複素余標構を選び、上記の$E_j,\bar E_j,I_j,\bar I_j$を定める。[Lefschetz随伴の表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)を使うと、全外積次数上で次が成り立つ。

$$
[\Lambda,E_k]=-i\bar I_k,\qquad
[\Lambda,\bar E_k]=iI_k.
$$

> 点ごとの恒等式であり、ここではKähler条件を使わない。
<!-- formal-statement-end -->

### 証明の見取り図

$\Lambda=-i\sum_j\bar I_jI_j$と置き、$E_k$を$I_j$と$\bar I_j$の順に一つずつ通過させる。$\bar E_k$の場合は$\bar I_j$と衝突する位置が逆なので、符号が逆転する。

<!-- proof-start -->
### 証明

上の反交換関係から

$$
\begin{aligned}
\bar I_jI_jE_k
&=\bar I_j(\delta_{jk}-E_kI_j)
=\delta_{jk}\bar I_j+E_k\bar I_jI_j,\\
\bar I_jI_j\bar E_k
&=-\bar I_j\bar E_kI_j
=-(\delta_{jk}-\bar E_k\bar I_j)I_j
=-\delta_{jk}I_j+\bar E_k\bar I_jI_j.
\end{aligned}
$$

第一式から$[\bar I_jI_j,E_k]=\delta_{jk}\bar I_j$、第二式から$[\bar I_jI_j,\bar E_k]=-\delta_{jk}I_j$。$\Lambda$の$-i$を掛けて$j$について足すと

$$
[\Lambda,E_k]=-i\sum_j\delta_{jk}\bar I_j=-i\bar I_k,
\qquad
[\Lambda,\bar E_k]=i\sum_j\delta_{jk}I_j=iI_k.
$$

特に$i$は随伴を取ったときに出た係数であり、反交換子の符号とは別々に管理する。$\square$
<!-- proof-end -->

**一組での別検算。** $\xi=\theta\wedge\bar\theta$に対して$\Lambda\xi=-i$である。$[\Lambda,E]\bar\theta=\Lambda\xi=-i$、一方$-i\bar I\bar\theta=-i$。また$[\Lambda,\bar E]\theta=\Lambda(-\xi)=i$、一方$iI\theta=i$。$1,\theta,\bar\theta,\xi$のうち、どちらの交換子でも非零になりうる状態で符号が一致した。

## 4. 微分作用素とその形式的随伴

点ごとの交換子を作用素の交換子へ移すには、$\Lambda$の**微分**も調べる必要がある。Kähler正規正則座標では、点$x$で$\nabla\theta^j=\nabla\bar\theta^j=0$であり、さらに接続が[計量と複素構造を保存する](../../KAH/KAH1-03/index.md#thm-kah1-03-main-equivalence)ので$\nabla\Lambda(x)=0$である。

外微分の[型分解](../../CM/CM2-02/index.md#def-cm2-02-dolbeault-operators)と、捩率零の接続による外微分の交代和を用いると、点$x$で任意の滑らかな複素形式$\alpha$について

$$
\partial\alpha(x)=\sum_j E_j\nabla_{Z_j}\alpha(x),\qquad
\bar\partial\alpha(x)=\sum_j\bar E_j\nabla_{\bar Z_j}\alpha(x).
$$

係数$\sqrt2$を落とさないため、$\theta^j=dz^j/\sqrt2$の双対が$Z_j=\sqrt2\,\partial_{z^j}$であることに注意する。

<a id="prop-hod1-04-local-adjoints"></a>

<!-- formal-statement-start -->
> **命題（Kähler正規枠での形式的随伴）**
> 滑らかな複素次元$n$のKähler多様体$X$の点$x$で正規正則座標をとり、$\theta^j=dz^j/\sqrt2$、$Z_j=\sqrt2\,\partial_{z^j}$、$\bar Z_j=\sqrt2\,\partial_{\bar z^j}$とする。コンパクト台の形式上で定義した形式的随伴は、その点で次の局所式を持つ。

$$
\partial^*=-\sum_j I_j\nabla_{\bar Z_j},
\qquad
\bar\partial^*=-\sum_j\bar I_j\nabla_{Z_j}.
$$

> これは**点$x$での表示**であり、任意の座標の全近傍で接続係数を消した式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

外積$E_j$の随伴は$I_j$、方向微分$\nabla_{Z_j}$の形式的随伴は、体積密度の一階微分が消える点で$-\nabla_{\bar Z_j}$となる。両者の作用順序を逆にし、正規枠の一階微分零を用いる。

<!-- proof-start -->
### 証明

[形式的随伴の定義](../HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)に従い、台が局所座標内に入る試験形式$u,v$をとる。正規座標の原点で各外積基底は正規直交であり、その内積と体積密度の一階微分は零である。ただしこれは**原点での主張**であり、非平坦な計量で積分の体積密度を近傍全体にわたって定数と見なしてはならない。

実座標のLebesgue体積を$dV_0$とし、実際の体積を$dV=\rho\,dV_0$と書く。コンパクト台を持つ係数関数$f,h$に対し、部分積分を正確に書くと

$$
\begin{aligned}
\int \overline{(Z_j f)}\,h\,\rho\,dV_0
&=-\int\bar f\,\bar Z_j(\rho h)\,dV_0\\
&=-\int\bar f\left(\bar Z_jh+\rho^{-1}(\bar Z_j\rho)h\right)dV.
\end{aligned}
$$

$Z_j=\sqrt2(\partial_{x_j}-i\partial_{y_j})/2$なので、左辺の共役を展開し、$\partial_{x_j}$、$\partial_{y_j}$をそれぞれ実変数の部分積分で移した。点$x$では$\bar Z_j\rho(x)=0$である。また、形式の基底内積行列の微分も$x$で零だから、ベクトル値係数に拡張しても同じ余分な零次項は残らない。したがって**その点で**方向微分の形式的随伴は$-\nabla_{\bar Z_j}$である。

$\partial=\sum_j E_j\nabla_{Z_j}$にこの規則と$E_j^*=I_j$を適用すると

$$
(E_j\nabla_{Z_j})^*
=-(\nabla_{\bar Z_j})I_j
=-I_j\nabla_{\bar Z_j}
$$

となる。最後の等式は$\nabla I_j(x)=0$による。$\bar\partial$についても$\bar E_j^*=\bar I_j$と$\overline{\bar Z_j}=Z_j$を用いれば

$$
(\bar E_j\nabla_{\bar Z_j})^*
=-\bar I_j\nabla_{Z_j}.
$$

それぞれ$j$について足して得る。$\square$
<!-- proof-end -->

**平坦な一次元での部分積分による確認。** $\mathbb C$の標準計量では$\nabla=\partial$が全域で成立する。$u=f$、$v=h\bar\theta$をコンパクト台とすると、$\bar\partial f=(\bar Zf)\bar\theta$で、

$$
(\bar\partial f,h\bar\theta)_2
=\int\overline{\bar Zf}\,h\,dV
=-\int\bar f\,Zh\,dV
=(f,-Zh)_2.
$$

従って$\bar\partial^*(h\bar\theta)=-Zh$である。これは上の$\bar I\bar\theta=1$を代入した式と一致する。もう一方も$u=f$、$v=h\theta$で$\partial^*(h\theta)=-\bar Zh$を得る。

## 5. 二つのKähler恒等式を導く

ここで初めて点ごとの収縮と微分を一つの交換子にまとめる。どちらの式もKähler条件が必要だが、**この章の証明にコンパクト性は不要**である。

<a id="thm-hod1-04-kahler-identities"></a>

<!-- formal-statement-start -->
> **定理（Kähler恒等式）**
> $X$を複素次元$n\ge1$の滑らかなKähler多様体とし、$L=\omega\wedge(-)$、$\Lambda=L^*$を点ごとのHermite随伴とする。$\partial,\bar\partial$の形式的随伴をコンパクト台の形式上に定め、交換子を$[A,B]=AB-BA$とする。このとき、すべての滑らかな複素微分形式に対する微分作用素として

$$
[\Lambda,\partial]=i\bar\partial^*,
\qquad
[\Lambda,\bar\partial]=-i\partial^*
$$

> が成立する。$\partial^*,\bar\partial^*$はそれぞれ型を一つ下げるので、左辺の型変化も$(p,q)\to(p,q-1)$および$(p,q)\to(p-1,q)$と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

任意の点で正規座標をとる。$\nabla\Lambda=0$のため微分が$\Lambda$に掛かった余分な項は消え、[外積と収縮の局所交換子](#lem-hod1-04-algebra)だけが残る。最後に[局所随伴式](#prop-hod1-04-local-adjoints)へ置き換える。

<!-- proof-start -->
### 証明

点$x$と滑らかな複素形式$\alpha$を任意に選ぶ。[正規座標の存在](#prop-hod1-04-normal-existence)により、点$x$で$\nabla\Lambda=0$かつ$\partial=\sum_jE_j\nabla_{Z_j}$である。従って

$$
\begin{aligned}
[\Lambda,\partial]\alpha(x)
&=\Lambda\sum_jE_j\nabla_{Z_j}\alpha(x)
 -\sum_jE_j\nabla_{Z_j}(\Lambda\alpha)(x)\\
&=\sum_j(\Lambda E_j-E_j\Lambda)\nabla_{Z_j}\alpha(x)
 -\sum_jE_j(\nabla_{Z_j}\Lambda)\alpha(x)\\
&=\sum_j[\Lambda,E_j]\nabla_{Z_j}\alpha(x).
\end{aligned}
$$

ここで[局所交換子](#lem-hod1-04-algebra)の$[\Lambda,E_j]=-i\bar I_j$を代入し、[形式的随伴の局所式](#prop-hod1-04-local-adjoints)を用いると

$$
[\Lambda,\partial]\alpha(x)
=-i\sum_j\bar I_j\nabla_{Z_j}\alpha(x)
=i\bar\partial^*\alpha(x).
$$

もう一方では$\bar\partial=\sum_j\bar E_j\nabla_{\bar Z_j}$であるため、同じ展開を**省略せず**に書くと

$$
\begin{aligned}
[\Lambda,\bar\partial]\alpha(x)
&=\Lambda\sum_j\bar E_j\nabla_{\bar Z_j}\alpha(x)
 -\sum_j\bar E_j\nabla_{\bar Z_j}(\Lambda\alpha)(x)\\
&=\sum_j[\Lambda,\bar E_j]\nabla_{\bar Z_j}\alpha(x)
 -\sum_j\bar E_j(\nabla_{\bar Z_j}\Lambda)\alpha(x)\\
&=i\sum_jI_j\nabla_{\bar Z_j}\alpha(x)
=-i\partial^*\alpha(x).
\end{aligned}
$$

二番目の計算では$[\Lambda,\bar E_j]=+iI_j$、$\partial^*=-\sum_jI_j\nabla_{\bar Z_j}$という**二つの符号**が合わさる。$x$と$\alpha$が任意だから、大域的な微分作用素等式になる。$\square$
<!-- proof-end -->

**型の確認。** $\Lambda$は$(1,1)$だけ型を下げるので、$[\Lambda,\partial]$の型変化は$(-1,-1)+(1,0)=(0,-1)$。同様に$[\Lambda,\bar\partial]$は$(-1,0)$である。[HOD1-01の随伴の型](../HOD1-01/index.md#prop-hod1-01-adjoint-projections)と一致する。これは符号を決めないが、添字の取り違えを防ぐ独立した検査となる。

## 6. 平坦模型で符号を二つの方法から検算する

$\mathbb C$に標準実Euclid計量を置き、

$$
\theta=\frac{dz}{\sqrt2},\quad
Z=\sqrt2\frac{\partial}{\partial z},\quad
\bar Z=\sqrt2\frac{\partial}{\partial\bar z},
\quad \omega=i\theta\wedge\bar\theta
$$

とする。滑らかな関数$f$について、$\Lambda\theta=\Lambda\bar\theta=0$、$\Lambda(\theta\wedge\bar\theta)=-i$は[前章の随伴表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)である。

**第1の交換子の直接計算。** $\alpha=f\bar\theta$なら

$$
\partial\alpha=(Zf)\theta\wedge\bar\theta,\quad
\Lambda\partial\alpha=-iZf,\quad
\partial\Lambda\alpha=0.
$$

一方、前節の**別経路の部分積分**から$\bar\partial^*(f\bar\theta)=-Zf$だから、

$$
[\Lambda,\partial](f\bar\theta)=-iZf
=i\bar\partial^*(f\bar\theta).
$$

**第2の交換子の直接計算。** $\alpha=f\theta$なら

$$
\bar\partial\alpha=(\bar Zf)\bar\theta\wedge\theta
=-(\bar Zf)\theta\wedge\bar\theta,\qquad
\Lambda\bar\partial\alpha=i\bar Zf.
$$

$\bar\partial\Lambda\alpha=0$であり、$\partial^*(f\theta)=-\bar Zf$だから

$$
[\Lambda,\bar\partial](f\theta)=i\bar Zf
=-i\partial^*(f\theta).
$$

この二つは、片方を複素共役しただけと宣言せず、**外積の入れ替えによる負号**をそれぞれ独立に計算した。正規座標での演算子証明と、平坦空間の具体的な微分・部分積分という異なる検算が一致している。

## 7. 一般Hermite計量では何が壊れるか

一般のHermite計量でも$\Lambda=-i\sum_j\bar I_jI_j$という**点ごとの**表示は成立する。しかし、正則座標で計量の一階微分をすべて消すことは一般にはできず、$\Lambda$を微分した項や形式的随伴の零次項が残る。これは[Kähler閉性とChern捩率の同値性](../../KAH/KAH1-03/index.md#thm-kah1-03-closed-torsion)とも整合する。

「捩率補正」を抽象名だけで済ませないため、実際に差を計算する。

<a id="prop-hod1-04-non-kahler"></a>

<!-- formal-statement-start -->
> **命題（非Kähler共形計量での恒等式の破れ）**
> $\mathbb C^2$の標準基本形式を$\omega_0=\frac i2\sum_{j=1}^2dz^j\wedge d\bar z^j$とする。実関数$\varphi=z^1+\bar z^1$をとり、Hermite計量を$g=e^\varphi g_0$、基本形式を$\omega=e^\varphi\omega_0$とする。この計量はKählerではない。$\beta=\omega_0$に対して、その計量の$L$の随伴$\Lambda_g$と微分の形式的随伴を用いると

$$
\begin{aligned}
[\Lambda_g,\partial]\beta&=2e^{-\varphi}\partial\varphi\ne0,
&i\bar\partial_g^*\beta&=0,\\
[\Lambda_g,\bar\partial]\beta&=2e^{-\varphi}\bar\partial\varphi\ne0,
&-i\partial_g^*\beta&=0.
\end{aligned}
$$

> したがって二つのKähler恒等式はいずれも一般Hermite計量へ無条件には拡張できない。
<!-- formal-statement-end -->

### 証明の見取り図

まず$\partial\omega\ne0$を直接計算する。次に$\Lambda_g\beta$は零形式で、計量の共形因子を一つ含む。一方、$(1,1)$形式の内積と実4次元体積の共形因子が相殺されるため、$\partial_g^*\beta$と$\bar\partial_g^*\beta$はどちらも零になる。

<!-- proof-start -->
### 証明

$\omega=e^\varphi\omega_0$、$\partial\omega_0=0$だから

$$
\partial\omega=e^\varphi\partial\varphi\wedge\omega_0
=e^\varphi dz^1\wedge
\left(\frac i2 dz^2\wedge d\bar z^2\right)\ne0.
$$

第1組の項は$dz^1\wedge dz^1=0$のため消えるが、第2組は非零である。したがってKähler条件は満たされない。

共形倍率$e^\varphi$の下では$k$形式の内積は$e^{-k\varphi}$倍、実4次元の体積は$e^{2\varphi}$倍になる。$\Lambda$は内積で定めた$L$の随伴であり、$L_g=e^\varphi L_0$、その随伴が$\Lambda_g=e^{-\varphi}\Lambda_0$となることは、$k$次と$k+2$次の内積を比較しても確かめられる。[次数交換子の式](../HOD1-02/index.md#thm-hod1-02-commutator)を$1$へ適用すれば$\Lambda_0\omega_0=2$なので、

$$
\Lambda_g\beta=2e^{-\varphi},\qquad
\partial\beta=\bar\partial\beta=0.
$$

よって交換子の定義に代入すると

$$
\begin{aligned}
[\Lambda_g,\partial]\beta
&=-\partial(2e^{-\varphi})=2e^{-\varphi}\partial\varphi,\\
[\Lambda_g,\bar\partial]\beta
&=-\bar\partial(2e^{-\varphi})=2e^{-\varphi}\bar\partial\varphi.
\end{aligned}
$$

次に、コンパクト台を持つ任意の$(1,0)$形式$u$に対して、$\bar\partial u$と$\beta$はともに$(1,1)$型である。したがって

$$
(\bar\partial u,\beta)_{g,2}
=\int_{\mathbb C^2}e^{-2\varphi}
\langle\bar\partial u,\beta\rangle_0
\,e^{2\varphi}dV_0
=(\bar\partial u,\beta)_{0,2}.
$$

右辺は平坦計量のもとで定数係数形式$\beta$の随伴が零であることから$0$（成分を部分積分しても$0$）。これが任意のコンパクト台$u$に対して成り立つため、$\bar\partial_g^*\beta=0$である。同じ議論を任意の$(0,1)$形式$v$の$\partial v$に適用して$\partial_g^*\beta=0$を得る。これを上の交換子に代入すれば、両方とも恒等式の右辺に一致しない。$\square$
<!-- proof-end -->

この例の差

$$
T_\partial=[\Lambda_g,\partial]-i\bar\partial_g^*,
\qquad
T_{\bar\partial}=[\Lambda_g,\bar\partial]+i\partial_g^*
$$

は、$\beta$上で$2e^{-\varphi}\partial\varphi$と$2e^{-\varphi}\bar\partial\varphi$を返す**零次の補正項**である。一般のHermite計量をChern接続で扱うと、Kählerで消えた捩率に由来する項が局所随伴式へ現れる。ここでは一般捩率公式を未証明のまま引用せず、**実際に消えない補正項**と、その原因である$d\omega\ne0$を確認した。

## 8. 演習：正規枠・部分積分・二つの符号を再現する

### Level A：局所計算を分解する

<a id="ex-hod1-04-a01"></a>
#### HOD1-04-A01 反交換関係を単項式で導く
- Level: A

複素次元1の正規余標構$\theta,\bar\theta$で$E=\theta\wedge(-)$、$\bar E=\bar\theta\wedge(-)$、$I=E^*$、$\bar I=\bar E^*$をとる。$1,\theta,\bar\theta,\xi=\theta\wedge\bar\theta$の4状態に対して$(IE+EI)$、$(\bar IE+E\bar I)$を計算し、それぞれ$\mathrm{id}$と零であることを示せ。

<!-- solution-start -->
### 詳細解答

[収縮の定義](../HOD1-02/index.md#def-hod1-02-creation-annihilation)から$E1=\theta$、$E\bar\theta=\xi$、$E\theta=E\xi=0$、$I\theta=1$、$I\xi=\bar\theta$である。よって$IE+EI$は

$$
\begin{array}{c|cccc}
u&1&\theta&\bar\theta&\xi\\ \hline
IEu&1&0&\bar\theta&0\\
EIu&0&\theta&0&\xi
\end{array}
$$

となり、和は各状態$u$を返す。一方$\bar I\theta=0$、$\bar I\xi=-\theta$、$\bar I\bar\theta=1$だから

$$
\begin{array}{c|cccc}
u&1&\theta&\bar\theta&\xi\\ \hline
\bar IEu&0&0&-\theta&0\\
E\bar Iu&0&0&\theta&0
\end{array}
$$

であり、和は零。符号$-\theta$は$\xi=-\bar\theta\wedge\theta$による。
<!-- solution-end -->

<a id="ex-hod1-04-a02"></a>
#### HOD1-04-A02 正規座標の係数を固定する
- Level: A

$\mathbb C$の$z=x+iy$に実計量$dx^2+dy^2$を入れ、$\omega$、$g_{z\bar z}$、unitary余標構$\theta$とその双対$Z$を求めよ。$\partial f=E(Zf)$の係数を$f=z$で確認せよ。

<!-- solution-start -->
### 詳細解答

$J\partial_x=\partial_y$から$\omega=dx\wedge dy=(i/2)dz\wedge d\bar z$。[計量係数の正規化](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)より$g_{z\bar z}=1/2$である。$|dz|^2=2$だから$\theta=dz/\sqrt2$の長さは1、双対は$Z=\sqrt2\,\partial_z$。

$f=z$なら$Zf=\sqrt2$で、$E(Zf)=\sqrt2\theta=dz=\partial z$。$Z=\partial_z/\sqrt2$とすると係数が$1/2$ずれるので注意する。
<!-- solution-end -->

<a id="ex-hod1-04-a03"></a>
#### HOD1-04-A03 第1の恒等式を一形式で検算
- Level: A

平坦$\mathbb C$上で$f=z^2\bar z$と置き、$\alpha=f\bar\theta$について$[\Lambda,\partial]\alpha$と$i\bar\partial^*\alpha$をそれぞれ求めよ。

<!-- solution-start -->
### 詳細解答

$Z=\sqrt2\,\partial_z$だから$Zf=2\sqrt2 z\bar z$。$\partial(f\bar\theta)=(Zf)\theta\wedge\bar\theta$で、[随伴表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)の$\Lambda(\theta\wedge\bar\theta)=-i$を使うと

$$
[\Lambda,\partial]\alpha=-iZf=-2\sqrt2 i z\bar z.
$$

[局所随伴式](#prop-hod1-04-local-adjoints)で$\bar\partial^*(f\bar\theta)=-Zf=-2\sqrt2 z\bar z$なので、$i$を掛けた値も同じである。関数$f$はコンパクト台でなくても微分作用素の局所表示を検算できる。
<!-- solution-end -->

<a id="ex-hod1-04-a04"></a>
#### HOD1-04-A04 第2の恒等式を外積順序から検算
- Level: A

平坦$\mathbb C$上で$f=z\bar z^2$、$\alpha=f\theta$とする。$\bar\theta\wedge\theta$を$\theta\wedge\bar\theta$へ直してから、$[\Lambda,\bar\partial]\alpha$と$-i\partial^*\alpha$を別々に計算せよ。

<!-- solution-start -->
### 詳細解答

$\bar Zf=\sqrt2\,\partial_{\bar z}(z\bar z^2)=2\sqrt2 z\bar z$である。外積順序から

$$
\bar\partial\alpha=(\bar Zf)\bar\theta\wedge\theta
=-(\bar Zf)\theta\wedge\bar\theta.
$$

$\Lambda\alpha=0$、$\Lambda(\theta\wedge\bar\theta)=-i$なので、$[\Lambda,\bar\partial]\alpha=i\bar Zf=2\sqrt2 iz\bar z$。他方[局所随伴式](#prop-hod1-04-local-adjoints)から$\partial^*\alpha=-\bar Zf$、ゆえに$-i\partial^*\alpha=2\sqrt2 iz\bar z$。外積の順序を変えなければ誤った負号になる。
<!-- solution-end -->

### Level B：仮定と複数の道具を接続する

<a id="ex-hod1-04-b01"></a>
#### HOD1-04-B01 正規座標を二次変換で作る
- Level: B

複素次元1で原点近くのHermite係数が$g_{z\bar z}(z)=\frac12+az+\bar a\bar z+O(|z|^2)$（$a\in\mathbb C$）であるとする。正則座標$w=z+cz^2$の$c$を選び、$g'_{w\bar w}(0)=1/2$と$\partial_wg'_{w\bar w}(0)=0$を検算せよ。

<!-- solution-start -->
### 詳細解答

逆写像は$z=w-cw^2+O(|w|^3)$で、$\partial z/\partial w=1-2cw+O(|w|^2)$。計量の座標変換式に代入し、一次項だけ残すと

$$
\begin{aligned}
g'_{w\bar w}
&=(1-2cw)(1-2\bar c\bar w)
\left(\frac12+aw+\bar a\bar w+O(|w|^2)\right)\\
&=\frac12+(a-c)w+(\bar a-\bar c)\bar w+O(|w|^2).
\end{aligned}
$$

従って$c=a$と選べば値$1/2$を維持し、正則・反正則双方の一階微分が消える。複素次元1ではどのHermite計量もKählerなので、異なる正則添字間の対称条件は自動である。
<!-- solution-end -->

<a id="ex-hod1-04-b02"></a>
#### HOD1-04-B02 随伴を部分積分で導く
- Level: B

平坦$\mathbb C$において、$f,h\in C_c^\infty(\mathbb C)$をとる。$(\partial f,h\theta)_2$を実座標$x,y$で部分積分し、$\partial^*(h\theta)=-\bar Zh$を示せ。内積の共役をかける位置を明記せよ。

<!-- solution-start -->
### 詳細解答

$\partial f=(Zf)\theta$、$Z=(\partial_x-i\partial_y)/\sqrt2$であり、[第1変数共役線形の内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)を使うと

$$
(\partial f,h\theta)_2
=\int_{\mathbb R^2}\overline{Zf}\,h\,dx\,dy
=\frac1{\sqrt2}\int(\partial_x\bar f+i\partial_y\bar f)h\,dx\,dy.
$$

$f,h$はコンパクト台なので境界項はなく、右辺をさらに部分積分して

$$
\begin{aligned}
(\partial f,h\theta)_2
&=-\frac1{\sqrt2}\int\bar f(\partial_xh+i\partial_yh)\,dx\,dy\\
&=-\int\bar f\,(\bar Zh)\,dx\,dy.
\end{aligned}
$$

右端は$(f,-\bar Zh)_2$である。形式的随伴の一意性から$\partial^*(h\theta)=-\bar Zh$を得る。微分の複素共役を取ることで$Z$が$\bar Z$に入れ替わる。
<!-- solution-end -->

<a id="ex-hod1-04-b03"></a>
#### HOD1-04-B03 非Kähler共形計量の破れを再導出
- Level: B

$\mathbb C^2$で$\varphi=z^1+\bar z^1$、$\omega=e^\varphi\omega_0$とし、$\beta=\omega_0$とする。$\partial\omega\ne0$を示し、$\Lambda_g\beta$、$[\Lambda_g,\partial]\beta$、$\bar\partial_g^*\beta$をそれぞれ求めよ。最後の随伴は$(1,1)$形式の内積と体積の倍率から求めよ。

<!-- solution-start -->
### 詳細解答

$\partial\omega=e^\varphi dz^1\wedge\omega_0$であり、$dz^1\wedge dz^2\wedge d\bar z^2$の係数は$i e^\varphi/2\ne0$であるから閉じない。共形計量では$\Lambda_g=e^{-\varphi}\Lambda_0$であり、[次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)から$\Lambda_0\omega_0=2$なので、

$$
\Lambda_g\beta=2e^{-\varphi},
\qquad
[\Lambda_g,\partial]\beta=-\partial(2e^{-\varphi})
=2e^{-\varphi}dz^1.
$$

$(1,1)$形式の内積は$e^{-2\varphi}$倍、体積は$e^{2\varphi}$倍のため、任意のコンパクト台$(1,0)$形式$u$に対し

$$
(\bar\partial u,\beta)_{g,2}
=(\bar\partial u,\beta)_{0,2}
=(u,\bar\partial_0^*\beta)_{0,2}=0.
$$

平坦計量で定数形式$\beta$の微分係数は零なので最後の等式が成り立つ。よって$\bar\partial_g^*\beta=0$。結果として$[\Lambda_g,\partial]\beta\ne i\bar\partial_g^*\beta$である。これは**計量がHermiteでもKählerでなければ不可**という具体的な反例である。
<!-- solution-end -->

<a id="ex-hod1-04-b04"></a>
#### HOD1-04-B04 随伴を取って双対な恒等式へ
- Level: B

コンパクト台上の形式的随伴について$[A,B]^*=[B^*,A^*]$を確かめ、[Kähler恒等式](#thm-hod1-04-kahler-identities)から

$$
[L,\partial^*]=i\bar\partial,\qquad
[L,\bar\partial^*]=-i\partial
$$

を導け。$i$の共役がどこで生じるか示せ。

<!-- solution-start -->
### 詳細解答

$(AB)^*=B^*A^*$だから$(AB-BA)^*=B^*A^*-A^*B^*=[B^*,A^*]$である。$\Lambda^*=L$と$[\Lambda,\partial]=i\bar\partial^*$を使うと

$$
[\partial^*,L]
=([\Lambda,\partial])^*
=(i\bar\partial^*)^*
=-i\bar\partial,
$$

従って順序を反転して$[L,\partial^*]=i\bar\partial$。同様に

$$
[\bar\partial^*,L]
=([\Lambda,\bar\partial])^*
=(-i\partial^*)^*
=i\partial,
$$

ゆえに$[L,\bar\partial^*]=-i\partial$。両式で係数$i$が共役するのは**形式的随伴**を取る段階である。
<!-- solution-end -->

### Level C：混合型を通して符号・型・捩率を統合する

<a id="ex-hod1-04-c01"></a>
#### HOD1-04-C01 複素次元2の$(1,1)$形式と非Kähler反例
- Level: C

$\mathbb C^2$の標準平坦計量で$\theta^j=dz^j/\sqrt2$、$Z_j=\sqrt2\partial_{z^j}$とする。$\alpha=f\,\theta^1\wedge\bar\theta^2$（$f$は滑らかな複素関数）について、以下をすべて直接計算せよ。

1. $\Lambda\alpha$、$\partial\alpha$、$\bar\partial\alpha$の型と値。
2. $[\Lambda,\partial]\alpha$と$i\bar\partial^*\alpha$、および$[\Lambda,\bar\partial]\alpha$と$-i\partial^*\alpha$。すべての外積の順序を示す。
3. 同じ$\mathbb C^2$に$g=e^{z^1+\bar z^1}g_0$を入れたとき、$\beta=\omega_0$のどの値が変わり、なぜ二つの恒等式が失われるか。平坦の場合との仮定の差を述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 型と微分。** $\alpha$は$(1,1)$型である。同じ添字の$\theta^j,\bar\theta^j$を同時に含む組がないため、[随伴の表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)から$\Lambda\alpha=0$。外微分を実際に展開すると

$$
\begin{aligned}
\partial\alpha
&=(Z_1f)\theta^1\wedge\theta^1\wedge\bar\theta^2
 +(Z_2f)\theta^2\wedge\theta^1\wedge\bar\theta^2\\
&=-(Z_2f)\theta^1\wedge\theta^2\wedge\bar\theta^2
\quad((2,1)\text{型}),\\
\bar\partial\alpha
&=(\bar Z_1f)\bar\theta^1\wedge\theta^1\wedge\bar\theta^2
 +(\bar Z_2f)\bar\theta^2\wedge\theta^1\wedge\bar\theta^2\\
&=-(\bar Z_1f)\theta^1\wedge\bar\theta^1\wedge\bar\theta^2
\quad((1,2)\text{型}).
\end{aligned}
$$

**(2) 二つの交換子。** $I_2$が$\theta^1\wedge\theta^2\wedge\bar\theta^2$の2番目の因子を消すと負号が出て、続く$\bar I_2$が$\bar\theta^2$を2番目から消してさらに負号が出る。ゆえに

$$
\bar I_2 I_2(\theta^1\wedge\theta^2\wedge\bar\theta^2)=\theta^1,
\qquad
\Lambda(\theta^1\wedge\theta^2\wedge\bar\theta^2)=-i\theta^1.
$$

これと$\Lambda\alpha=0$から

$$
[\Lambda,\partial]\alpha=i(Z_2f)\theta^1.
$$

一方$\bar I_2(\theta^1\wedge\bar\theta^2)=-\theta^1$なので、[局所随伴式](#prop-hod1-04-local-adjoints)により$\bar\partial^*\alpha=(Z_2f)\theta^1$。従って両辺は一致する。

第2の計算では$I_1(\theta^1\wedge\bar\theta^1\wedge\bar\theta^2)=\bar\theta^1\wedge\bar\theta^2$、$\bar I_1$が先頭因子を消すから

$$
\Lambda(\theta^1\wedge\bar\theta^1\wedge\bar\theta^2)=-i\bar\theta^2.
$$

ゆえに

$$
[\Lambda,\bar\partial]\alpha=i(\bar Z_1f)\bar\theta^2.
$$

また$I_1(\theta^1\wedge\bar\theta^2)=\bar\theta^2$なので$\partial^*\alpha=-(\bar Z_1f)\bar\theta^2$であり、$-i\partial^*\alpha$と一致する。

**(3) 仮定を変えた比較。** $\varphi=z^1+\bar z^1$に対して$\partial(e^\varphi\omega_0)=e^\varphi dz^1\wedge\omega_0\ne0$だから、この計量は非Kählerである。[非Kähler例の計算](#prop-hod1-04-non-kahler)を$\beta=\omega_0$へ適用すると

$$
\Lambda_g\beta=2e^{-\varphi},\quad
[\Lambda_g,\partial]\beta=2e^{-\varphi}dz^1,\quad
\bar\partial_g^*\beta=0.
$$

さらに$[\Lambda_g,\bar\partial]\beta=2e^{-\varphi}d\bar z^1$、$\partial_g^*\beta=0$である。平坦模型では計量の一階微分が消え、$\nabla\Lambda=0$が使えたが、ここでは$\partial\varphi$と$\bar\partial\varphi$の零次項が残る。そのため**点ごとの外積・収縮の関係は存続するのに、微分作用素の交換関係は壊れる**。これはKähler仮定の用途を区別する結論である。
<!-- solution-end -->

## 9. 次へ：Laplacianの係数2はどこから来るか

この章で、Kähler条件は正規座標によって計量の一階微分を消し、点ごとの$L,\Lambda$の代数を$\partial,\bar\partial$の形式的随伴へつなぐと分かった。次のHOD1-05では、ここで証明した二つの交換子を組み合わせて

$$
\Delta_d=2\Delta_\partial=2\Delta_{\bar\partial}
$$

を導く。ただし**本章ではLaplacianの一致や大域Hodge分解はまだ証明していない**。それらにはさらに$\partial\bar\partial+\bar\partial\partial=0$などの計算と、後続ではコンパクト性が必要になる。
