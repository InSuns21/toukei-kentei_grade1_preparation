# HPDE3 時空上の分布・試験切断・密度

[HPDE2の球面平均](../HPDE2/index.md#def-hpde2-spherical-mean)は、滑らかな初期データから解を作りました。しかし点源を入れると、右辺は普通の関数ではなくなります。[GPDE1のSchwartz超関数](../../GPDE/GPDE1/index.md#def-gpde1-distribution)はEuclid領域では点評価を扱えます。曲がった時空で同じことをしたいとき、二つの新しい問題があります。**座標を変えると積分の係数が変わること**と、**未知量が一点ごとに異なるベクトル空間の元であること**です。

本章では次の順で解決します。まず向きを選ばなくても積分できる密度を構成します。次に各点のベクトルを試験対象へ掛けるための双対束を作り、テスト切断への連続線形作用として、各点のベクトル値を扱える超関数を定義します。最後に滑らかな切断・点源・台を直接検算します。ここでの双対は**代数的な線形双対**です。微分作用素の接続・形式的随伴、Hermite共役はHPDE4で扱います。

以下、$M$ は境界のない滑らかなHausdorff・第二可算な $d$ 次元多様体（$d\ge1$）、$E\to M$ は実または複素の有限ランク $r$ の滑らかなベクトル束とします。Lorentz時空の場合はさらに滑らかな非退化なLorentz計量 $g$ を持ちます。[LORG2のLorentz計量の定義](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)を使いますが、**密度と分布切断の構成そのものには時間向きも大域双曲性も必要ありません**。

## 1. 積分はなぜ座標に依存しないのか

座標 $x=(x^1,\ldots,x^d)$ で非負の積分要素を書くと、$|dx|=|dx^1\cdots dx^d|$ と表記します。座標 $y=y(x)$ が重なる領域で滑らかな可逆変換なら、変数変換で

$$
|dx|=\left|\det\frac{\partial x}{\partial y}\right||dy|
$$

となります。符号なしの絶対値があるため、向きの反転でも負の測度になりません。係数を単なる関数のように扱って $|dx|=|dy|$ とすると積分値が変わります。そこで、積分要素ごと変換する対象を定義します。

<a id="def-hpde3-density"></a>
<!-- formal-statement-start -->
> **定義（密度束と滑らかな密度）**  
> $d$ 次元滑らかな多様体 $M$ の各点 $p$ で、$T_pM$ の順序付き基底 $(v_1,\ldots,v_d)$ に実数を与え、基底の取り替え $v'_i=\sum_jv_jA^j{}_i$ に対し

$$
\rho_p(v'_1,\ldots,v'_d)=|\det A|\rho_p(v_1,\ldots,v_d)
$$

> を満たす量を密度と呼ぶ。この一次元実ベクトル空間を各点で束ねたものを **密度束** $|\Lambda^dT^*M|$ と記す（一般の密度は符号付き係数も許し、正の密度は非零基底上で正）。局所座標 $x$ で滑らかな密度は $\mu=a_x(x)|dx|$ と書け、別の座標 $y$ では

$$
a_y(y)=a_x(x(y))\left|\det\frac{\partial x}{\partial y}\right|
$$

> と変換する。$\mu$ が各点で正の密度であるとは、各座標の係数 $a_x$ が正であることをいう。
<!-- formal-statement-end -->

最初の基底の取り替えに関する規則と座標係数の規則が逆向きに見える理由を確認します。座標ベクトルは

$$
\frac{\partial}{\partial y^i}
=\sum_j\frac{\partial x^j}{\partial y^i}\frac{\partial}{\partial x^j}
$$

と変わるので、密度をその基底へ評価すると値が $|\det(\partial x/\partial y)|$ 倍されます。この値が $y$ での係数 $a_y$ です。

<!-- definition-example-start: def-hpde3-density -->
### 直接例：二倍に引き伸ばした座標

**定義の確認**。$M=\mathbb R$、$\mu=|dx|$、$y=2x$ とします。$dx/dy=1/2$ だから $\mu=\frac12|dy|$ です。区間 $0\le x\le1$ で

$$
\int_0^1|dx|=1,\qquad
\int_0^2\frac12|dy|=1
$$

が一致します。変換後にも係数を $1$ としてしまうと右側が $2$ になり、密度の変換条件を破ります。$\frac12>0$ なので正の密度という条件も保たれます。
<!-- definition-example-end -->

有限個の座標近傍に台が入る滑らかなコンパクト台密度は、滑らかな1の分割で各座標近傍に分け、座標積分を足して積分します。座標が重なる場所では変数変換公式が同じ数を与えます。1の分割の選択を変えても、二組の分割の積 $\chi_i\theta_j$ を挿入して有限和を比べれば値は一致します。このため $\int_M\mu$ が**向きの選択なしに**定義できます。

## 2. Lorentz計量が与える自然な密度

計量 $g$ は各接空間上の非退化対称双線形形式です。正定値でなくても、局所行列 $(g_{ij})$ の行列式は零でないので、その絶対値の平方根は滑らかで正です。ここが測度の絶対値と時間方向の負号が出会うところです。

<a id="prop-hpde3-metric-density"></a>
<!-- formal-statement-start -->
> **命題（Lorentz体積密度の座標不変性）**  
> $g$ を $M$ 上の滑らかな非退化Lorentz計量とする。各座標で

$$
d\mathrm{vol}_g=\sqrt{|\det(g_{ij})|}\,|dx|
$$

> と置くと、これらは座標変換で一致して $M$ 上の正の滑らかな密度を定める。時間向きや多様体の向きは仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

座標ベクトルの変換を計量の二つの入力へ一回ずつ入れれば、計量行列は $G_y=J^{\mathsf T}G_xJ$ に変わります。行列式の絶対値は $|\det J|^2$ 倍です。平方根と $|dy|$ を組にすると密度の変換則になります。

<!-- proof-start -->
### 証明

$J^i{}_a=\partial x^i/\partial y^a$ と置きます。双線形性から

$$
g\left(\frac{\partial}{\partial y^a},\frac{\partial}{\partial y^b}\right)
=\sum_{i,j}J^i{}_a\,g_{ij}(x(y))\,J^j{}_b
$$

であり、成分行列では $G_y=J^{\mathsf T}G_xJ$ です。従って

$$
\det G_y=\det(J^{\mathsf T})\det G_x\det J
=(\det J)^2\det G_x.
$$

絶対値と正の平方根を取れば

$$
\sqrt{|\det G_y|}=|\det J|\sqrt{|\det G_x|}.
$$

これは[密度の定義](#def-hpde3-density)の係数変換規則です。非退化性により $\det G_x\ne0$ なので係数は正であり、滑らかさも保たれます。
<!-- proof-end -->

### 直接計算：Minkowski計量の座標変換

$\mathbb R^2$ の $g=-dt^2+dz^2$ で $y^0=2t$、$y^1=z/3$ とします。逆変換は $t=y^0/2$、$z=3y^1$ なので

$$
J=\begin{pmatrix}1/2&0\\0&3\end{pmatrix},
\qquad
G_y=\begin{pmatrix}-1/4&0\\0&9\end{pmatrix}.
$$

従って $\sqrt{|\det G_y|}=\sqrt{9/4}=3/2$ です。もとの座標では $\sqrt{|\det G_x|}=1$ であり、

$$
d\mathrm{vol}_g=|dt\,dz|=\frac32|dy^0dy^1|.
$$

計量は不定符号でも積分要素は正です。$g$ の行列式そのものを平方根にすると、この例で $\sqrt{-1}$ を得てしまうため不適切です。

## 3. 切断を試す相手は何か

[GPDE1のテスト関数](../../GPDE/GPDE1/index.md#def-gpde1-test-function)は各点で数を返します。ところが波動作用素の未知量が $E_p$ のベクトル $s(p)$ である場合、数へ直して積分するには、同じ点でそのベクトルを**線形に評価する相手**が必要です。

ベクトル束 $E\to M$ とは、各点に $r$ 次元ベクトル空間 $E_p$ があり、各小領域 $U$ で滑らかな局所枠 $e_1,\ldots,e_r$ を用いて $s=\sum_as^ae_a$ と表示できるものです。枠を変えると成分も変わります。各 $E_p$ 上の線形汎関数から成る **双対束** $E^*\to M$ の局所双対枠 $e^a$ は $e^a(e_b)=\delta^a_b$ を満たします。複素束でもここでの双対は**複素線形**であり共役線形ではありません。

<a id="def-hpde3-test-dual-density"></a>
<!-- formal-statement-start -->
> **定義（密度値双対試験切断）**  
> 有限ランク滑らかなベクトル束 $E\to M$ に対し、束 $E^*\otimes|\Lambda^dT^*M|$ の滑らかな切断で、非零点集合の閉包である台がコンパクトなものを **密度値双対試験切断** と呼ぶ。その空間を

$$
\Gamma_c(M,E^*\otimes|\Lambda^dT^*M|)
$$

> と書く。局所枠 $e_a$ と座標 $x$ を選べば $\psi=\sum_a\psi_a e^a\otimes|dx|$ と表され、$\psi_p(s(p))$ は密度である。
<!-- formal-statement-end -->

なぜ双対と密度を**両方**掛けるのでしょうか。$\psi_p$ を切断 $s(p)$ に作用させると $E^*$ と $E$ の部分が縮約され、密度だけが残るからです。その密度には前節の座標不変な積分が使えます。

枠 $e'_a=\sum_be_bA^b{}_a$ を取ると、$s'^a=(A^{-1})^a{}_bs^b$ です。一方、$\psi$ の双対成分は $\psi'_a=\sum_bA^b{}_a\psi_b$ となります（座標はまだ固定）。従って

$$
\sum_a\psi'_as'^a
=\sum_{a,b,c}A^b{}_a\psi_b(A^{-1})^a{}_cs^c
=\sum_b\psi_bs^b.
$$

これが局所成分の積が枠に依存しない理由です。座標も $x\to y$ と変えれば密度係数にさらに $|\det(\partial x/\partial y)|$ が掛かり、積分の変数変換で相殺されます。

<!-- definition-example-start: def-hpde3-test-dual-density -->
### 直接例：枠の変更で縮約は変わらない

**定義の確認**。$M=\mathbb R$、$E=M\times\mathbb R^2$ とし、$e'_1=e_1+e_2$、$e'_2=e_2$ と取ります。$s=e_1+2e_2$ の新成分は $(1,1)$ です。$\psi=(3e^1+5e^2)\otimes h(x)|dx|$（$h$ は非零の滑らかなコンパクト台関数）の新成分は $(8,5)$ です。従って

$$
\psi(s)=(3\cdot1+5\cdot2)h(x)|dx|
=(8\cdot1+5\cdot1)h(x)|dx|
=13h(x)|dx|.
$$

両方の表示は同じ密度です。$\psi$ の台は $\operatorname{supp}h$ というコンパクト集合なので試験切断の全条件を満たします。
<!-- definition-example-end -->

## 4. 束値超関数を定義する

[GPDE1のテスト関数の収束](../../GPDE/GPDE1/index.md#def-gpde1-test-function-convergence)では、共通コンパクト台の上で全階微分が一様収束しました。ここでも同様に、試験切断列の台が一つのコンパクト集合 $K$ に入り、$K$ を覆う有限個の座標・枠の表示の各係数と全階偏微分が一様収束するとき収束とします。枠の移行行列と座標変換の導関数はコンパクト集合上で有界なので、この条件は座標・枠の選択に依存しません。

<a id="def-hpde3-distribution-section"></a>
<!-- formal-statement-start -->
> **定義（束値超関数）**  
> $E\to M$ を有限ランクの実または複素滑らかなベクトル束とする。$\Gamma_c(M,E^*\otimes|\Lambda^dT^*M|)$ 上の線形汎関数 $T$ が、共通コンパクト台上で全階の局所係数が一様収束する試験切断列に対して連続なら、$T$ を **$E$ 値の超関数切断** と呼ぶ。その空間を

$$
\mathcal D'(M,E)
=\bigl(\Gamma_c(M,E^*\otimes|\Lambda^dT^*M|)\bigr)'
$$

> と記し、作用を $\langle T,\psi\rangle$ と表す。複素の場合もこの作用は $\psi$ について複素線形である。
<!-- formal-statement-end -->

この定義は切断そのものに点ごとの値を要求しません。台を固定した局所表示で各微分が一様に零へ行くとき作用値が零へ行くという形で、既習の超関数と同じ連続性を検査できます。局所有限階評価を使いたいときは、各コンパクト $K$ に対して有限個の座標・枠表示のある階数 $m$ までの係数微分の上限の和で $|\langle T,\psi\rangle|$ を抑える形を使います。[GPDE1の局所有限階評価](../../GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)と同じ背理法が、有限個の成分に対して適用できます。

<!-- definition-example-start: def-hpde3-distribution-section -->
### 直接例：滑らかな切断から超関数を作る

**定義の確認**。$s\in\Gamma(M,E)$ に対して $\langle T_s,\psi\rangle=\int_M\psi(s)$ と置きます。局所的には $\psi(s)=(\sum_as^a\psi_a)|dx|$ です。コンパクト $K$ を有限個の枠近傍で覆い、分割関数で $\psi$ を分ければ、各小領域で

$$
\left|\int s^a\psi_a\,|dx|\right|
\le
\sup_K|s^a|\,\mathrm{vol}_{x}(K\cap U)\sup_K|\psi_a|
$$

と評価できます（各座標部分の台を収めるコンパクト集合で体積を評価）。有限個を足せばゼロ階の係数上限で抑えられます。線形性は積分から、連続性はこの評価から従うため $T_s\in\mathcal D'(M,E)$ です。非コンパクトな $s$ でも、試験切断の台がコンパクトなので積分は有限です。
<!-- definition-example-end -->

<a id="prop-hpde3-regular-injection"></a>
<!-- formal-statement-start -->
> **命題（滑らかな切断の埋め込みと局所判定）**  
> 任意の $s\in\Gamma(M,E)$ に対して

$$
\langle T_s,\psi\rangle=\int_M\psi(s)
$$

> は座標・枠によらない $E$ 値超関数を定める。写像 $s\mapsto T_s$ は線形かつ単射である。さらに開集合 $U\subset M$ 上で $T_s$ の試験切断への作用がすべて零なら $s|_U=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

定義可能性と連続性は先ほどの有限座標評価で確認しました。単射性には「非零ベクトルを見逃さない双対ベクトル」を一点で選び、それを近傍へ滑らかに延長して、積分の符号を揃えるテスト切断を作ります。

<!-- proof-start -->
### 証明

密度変換と枠変換の計算から $\psi(s)$ は大域的な密度であるため積分は不変です。分割関数を使った有限個の局所積分の評価から連続性が従います。

$T_s$ が $U$ で零とし、$s(p)\ne0$ となる $p\in U$ があると仮定します。$p$ を含む枠近傍である成分 $s^a(p)\ne0$ を取ります。必要なら複素定数を掛けて実部が正の値にし、連続性から小さな近傍 $V\Subset U$ でその実部が正になります。$V$ に支持を持ち非負かつ零でない滑らかな関数 $h$ を取り、試験切断を $\psi=h e^a\otimes|dx|$（必要な定数倍を含める）として零で延長すると、

$$
\operatorname{Re}\langle T_s,\psi\rangle
=\int_V h(x)\operatorname{Re}(c\,s^a(x))\,dx>0
$$

です。これは零という仮定に反します。ゆえに $s|_U=0$ であり、とくに $T_s=0$ なら $s=0$ です。
<!-- proof-end -->

## 5. 一点に集中した源と、その台

Euclid領域では[GPDE1のDiracデルタ](../../GPDE/GPDE1/index.md#def-gpde1-dirac)がテスト関数の値を一点で読みました。ここではテスト対象 $\psi_p$ が**密度値**なので、そのままでは数ではありません。そこで正の滑らかな基準密度 $\mu$ を一つ固定し、密度部分を $\mu$ で割ります。Lorentz時空なら[計量の密度](#prop-hpde3-metric-density)を使えます。

<a id="def-hpde3-point-source"></a>
<!-- formal-statement-start -->
> **定義（基準密度に関する点源）**  
> $p\in M$、$v\in E_p$、$\mu$ を $M$ 上の正の滑らかな密度とする。任意の密度値双対試験切断を点 $p$ で $\psi_p=\ell_p\otimes\mu_p$（$\ell_p\in E_p^*$）と一意に書き、

$$
\langle\delta_{p,v}^{\mu},\psi\rangle=\ell_p(v)
$$

> により点源を定める。$\delta_{p,v}^{\mu}$ の上付き $\mu$ は基準密度への依存を表し、一般には省略しない。
<!-- formal-statement-end -->

局所座標で $\mu=a(x)|dx|$、$\psi=\sum_b\psi_b e^b\otimes|dx|$、$v=\sum_bv^be_b(p)$ と書くと

$$
\langle\delta_{p,v}^{\mu},\psi\rangle
=\frac{\sum_bv^b\psi_b(p)}{a(p)}.
$$

重要なのは分母 $a(p)$ です。$\mu$ を $\widehat\mu=c\mu$（$c>0$）に変えれば $\delta_{p,v}^{\widehat\mu}=c(p)^{-1}\delta_{p,v}^{\mu}$ となります。**密度に作用する点評価には、基準密度を選ぶ情報が必要**です。

<!-- definition-example-start: def-hpde3-point-source -->
### 直接例：座標を変えても点源の値は一致する

**定義の確認**。$M=\mathbb R$、$E=M\times\mathbb R$、$\mu=|dx|$、$p=0$、$v=2$ とし、$\psi=h(x)|dx|$ とします。定義から $\langle\delta_{0,2}^{\mu},\psi\rangle=2h(0)$ です。$y=2x$ なら $\mu=\frac12|dy|$、$\psi=\frac12h(y/2)|dy|$ なので、新座標では

$$
\frac{2\cdot[h(0)/2]}{1/2}=2h(0).
$$

線形性は点評価の線形性から従います。台を固定した試験切断列が零へ収束すると点 $p$ での係数も零へ行くため、この点源は連続であり、超関数の条件も満たします。
<!-- definition-example-end -->

超関数には一般に $T(p)$ という値がないので、台も値の非零集合から定義することはできません。「どの開集合でテストしても応答しないか」を使います。

<a id="def-hpde3-distribution-support"></a>
<!-- formal-statement-start -->
> **定義（超関数切断の台）**  
> $T\in\mathcal D'(M,E)$ とする。開集合 $U\subset M$ で、$\operatorname{supp}\psi\subset U$ のすべての密度値双対試験切断に対して $\langle T,\psi\rangle=0$ が成り立つとき、$T$ は $U$ 上で零という。$T$ が零である開集合すべての和集合の補集合を **台** $\operatorname{supp}T$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde3-distribution-support -->
### 直接例：零分布の台

**定義の確認**。$M=\mathbb R$、$E$ を自明な実直線束とし、$T_0$ を零切断が定める超関数とします。任意の開集合 $U\subset\mathbb R$ と任意の $\psi=h(x)|dx|$（$h\in C_c^\infty(U)$）について

$
\langle T_0,\psi\rangle=\int_{\mathbb R}0\cdot h(x)\,dx=0.
$

よって零である開集合の和集合は $\mathbb R$ 全体、補集合は空集合であり、$\operatorname{supp}T_0=\varnothing$ です。「零分布には台がない」という結論は、点ごとの値を仮定せず定義だけから得られます。
<!-- definition-example-end -->

定義では $\operatorname{supp}\psi$ 自体がコンパクトであることも要求されています。開集合の和で零という性質が保たれるのは、コンパクトな試験切断の台を有限個の開集合で覆い、滑らかな1の分割で切断を有限和へ分けられるからです。この議論により $\operatorname{supp}T$ は閉集合になります。

<a id="prop-hpde3-support"></a>
<!-- formal-statement-start -->
> **命題（滑らかな切断と点源の台）**  
> $s\in\Gamma(M,E)$ に対して

$$
\operatorname{supp}T_s=\overline{\{p:s(p)\ne0\}}.
$$

> また $v\in E_p$ が非零で $\mu$ が正の滑らかな密度なら

$$
\operatorname{supp}\delta_{p,v}^{\mu}=\{p\}.
$$

> $v=0$ なら点源は零超関数であり、その台は空集合である。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな切断の台は先ほどの局所判定がそのまま使えます。点源は $p$ を避けた試験切断に応答しませんが、$p$ の任意の近傍に非零応答の試験切断を作れます。

<!-- proof-start -->
### 証明

$s=0$ の開集合上では $\psi(s)=0$ なので $T_s$ も零です。逆に $T_s$ が開集合 $U$ で零なら[滑らかな切断の局所判定](#prop-hpde3-regular-injection)により $s|_U=0$ です。したがって両者の最大の零開集合が一致し、その補集合である台も一致します。

$\delta_{p,v}^{\mu}$ に対し $p\notin U$ なら $U$ に支持を持つ $\psi$ は $\psi_p=0$ で、作用は零です。一方 $v\ne0$ なら $E_p^*$ の線形汎関数 $\ell_p$ で $\ell_p(v)=1$ となるものがあります。$p$ の任意の近傍で局所双対枠を使い $\ell_p$ を滑らかに延長し、$p$ で1になるコンパクト台関数 $h$ を掛け、$\psi=h\ell\otimes\mu$ を作ると

$$
\langle\delta_{p,v}^{\mu},\psi\rangle=h(p)\ell_p(v)=1.
$$

よって $p$ のどの近傍でも零ではなく、台はちょうど $\{p\}$ です。$v=0$ の場合はすべての $\psi$ への作用が零なので台は空です。
<!-- proof-end -->

### 境界を持たない開集合上の局所性

$\operatorname{supp}T$ がコンパクトであることは、この定義の必要条件ではありません。定数切断から得られる $T_s$ は、$M$ が非コンパクトなら一般に台が全 $M$ です。また、時空上の点源の支持 $\{p\}$ は「将来光円錐」ではありません。**源の台**と**源から発生した波の台**は、後で波動作用素を導入して初めて比較できます。

## 6. 演習：座標不変性を手で作る

### A1. 一次元密度の変換

- Level: A
- 問題：$x\in(0,1)$、$y=x^3$ とし、$\mu=3x^2|dx|$ とする。$y$ 座標の係数を求め、$\int_{(0,1)}\mu$ を両座標で計算せよ。

<!-- solution-start -->
**詳細解答**

$x=y^{1/3}$、$dx/dy=1/(3x^2)$ です。$x>0$ なので

$$
3x^2|dx|=3x^2\frac1{3x^2}|dy|=|dy|.
$$

従って $x$ 座標では $\int_0^13x^2dx=[x^3]_0^1=1$、$y$ 座標では $\int_0^1dy=1$ です。$x=0$ は開領域に含まれず、座標変換の微分が消える点を領域内に持ち込んでいません。
<!-- solution-end -->

### A2. Lorentz計量の密度

- Level: A
- 問題：$M=\mathbb R^2$、$g=-4dt^2+9dz^2$ とする。$u=2t$、$w=3z$ へ変換したとき、両座標で $d\mathrm{vol}_g$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$(t,z)$ 座標では $G=\operatorname{diag}(-4,9)$、$\det G=-36$ より $d\mathrm{vol}_g=6|dt\,dz|$ です。$dt=du/2$、$dz=dw/3$ なので $6|dt\,dz|=|du\,dw|$ となります。一方、変換した計量は $g=-du^2+dw^2$ です。新行列の行列式は $-1$ なので $d\mathrm{vol}_g=|du\,dw|$ となり、一致します。
<!-- solution-end -->

### A3. 双対枠の計算

- Level: A
- 問題：$e'_1=2e_1$、$e'_2=e_1+e_2$、$s=3e_1+4e_2$、$\ell=5e^1+7e^2$ とする。新枠での成分を計算し $\ell(s)$ を検算せよ。

<!-- solution-start -->
**詳細解答**

$A=\begin{pmatrix}2&1\\0&1\end{pmatrix}$、$A^{-1}=\begin{pmatrix}1/2&-1/2\\0&1\end{pmatrix}$ です。$s'=A^{-1}(3,4)^{\mathsf T}=(-1/2,4)^{\mathsf T}$。双対成分は $A^{\mathsf T}(5,7)^{\mathsf T}=(10,12)^{\mathsf T}$ です。よって

$$
\ell(s)=5\cdot3+7\cdot4=43
$$

で、新枠でも $10(-1/2)+12\cdot4=-5+48=43$ です。双対成分まで $A^{-1}$ で変換してしまうと縮約は保たれません。
<!-- solution-end -->

### A4. 点源と基準密度

- Level: A
- 問題：$M=\mathbb R$、$E$ は自明な実直線束、$p=1$、$v=3$、$\mu=e^x|dx|$、$\psi=(1+x^2)h(x)|dx|$（$h\in C_c^\infty(\mathbb R)$）とする。$\langle\delta_{p,v}^{\mu},\psi\rangle$ を求めよ。

<!-- solution-start -->
**詳細解答**

点源の局所公式では $\mu=a(x)|dx|$、$a(1)=e$ です。試験切断の係数は $(1+x^2)h(x)$ なので、点 $1$ では $2h(1)$ です。従って

$$
\langle\delta_{1,3}^{\mu},\psi\rangle
=\frac{3\cdot2h(1)}e=\frac{6h(1)}e.
$$

分母を落とした $6h(1)$ は、$\mu=|dx|$ を選んだ場合の値です。
<!-- solution-end -->

### B1. 密度束と枠の同時変換

- Level: B
- 問題：$M=\mathbb R$、$E=M\times\mathbb R^2$、$y=2x$、$e'_1=e_1+e_2$、$e'_2=e_2$。$s=e_1+2e_2$、$\psi=(3e^1+5e^2)\otimes h(x)|dx|$ とする。$y$ 座標と新枠での $\psi$ の成分を求め、$\psi(s)$ が同じ密度であることを確認せよ。

<!-- solution-start -->
**詳細解答**

枠変換の行列は $A=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ なので、$s'=A^{-1}(1,2)^{\mathsf T}=(1,1)^{\mathsf T}$、双対成分は $A^{\mathsf T}(3,5)^{\mathsf T}=(8,5)^{\mathsf T}$ です。また $|dx|=\frac12|dy|$、$x=y/2$ なので

$$
\psi=\left(4e'^1+\frac52e'^2\right)\otimes h(y/2)|dy|.
$$

新枠で縮約すると $\psi(s)=(4\cdot1+\frac52\cdot1)h(y/2)|dy|=\frac{13}2h(y/2)|dy|$。旧枠では $13h(x)|dx|$ なので密度変換公式と一致します。
<!-- solution-end -->

### B2. 点源の台を定義から導く

- Level: B
- 問題：$M=\mathbb R$、$E$ は自明実直線束、$\mu=|dx|$、$p=0$、$v=1$。$\operatorname{supp}\delta_{0,1}^{\mu}=\{0\}$ を定義だけで示し、$v=0$ なら何が変わるか述べよ。

<!-- solution-start -->
**詳細解答**

$\psi=h(x)|dx|$ には $\langle\delta_{0,1}^{\mu},\psi\rangle=h(0)$ です。$0$ を含まない開集合 $U$ に支持された $h$ は $h(0)=0$ なので点源は $U$ 上で零です。一方、$0$ の任意の開近傍 $V$ には $h\in C_c^\infty(V)$ で $h(0)=1$ となるものが存在します。この $h$ への応答が $1$ なので $V$ 上で零でありません。最大の零開集合は $\mathbb R\setminus\{0\}$、したがって台は $\{0\}$。$v=0$ なら応答が常に零で、台は空集合です。
<!-- solution-end -->

### B3. 正則超関数の台と複素数

- Level: B
- 問題：$M=\mathbb R$、$E$ は自明複素直線束、$s(x)=e^{ix}h(x)$、$h\in C_c^\infty(\mathbb R)$ は実値で零でないとする。$T_s$ が分布切断であることを確認し、台を求めよ。$s$ の符号や位相が変わっても非零応答の試験切断を作れる理由を述べよ。

<!-- solution-start -->
**詳細解答**

任意の $\psi=\varphi(x)|dx|$ に対し $\langle T_s,\psi\rangle=\int e^{ix}h(x)\varphi(x)\,dx$ と置きます。$\varphi$ の台が $K$ に入るなら

$$
|\langle T_s,\psi\rangle|
\le \left(\int_K|h(x)|\,dx\right)\sup_K|\varphi|,
$$

であり、線形性と連続性が従います。$e^{ix}\ne0$ なので $\{s\ne0\}=\{h\ne0\}$ です。[台の命題](#prop-hpde3-support)より $\operatorname{supp}T_s=\operatorname{supp}h$ です。さらに $h(x_0)\ne0$ の近傍で非負の $\chi\in C_c^\infty$ を選び、$\varphi=\chi e^{-ix}\overline{h(x)}$ とすれば

$$
\langle T_s,\varphi|dx|\rangle=\int\chi(x)|h(x)|^2\,dx>0
$$

です。複素位相が打ち消されるので、非零値を積分で検出できます。試験切断への作用自体は依然として複素線形です。
<!-- solution-end -->

### C1. 二つの変更を同時にした点源と積分

- Level: C
- 問題：$M=\mathbb R$、$E=M\times\mathbb R^2$、$\mu=e^x|dx|$、$p=0$、$v=e_1+2e_2$、$\psi=(f(x)e^1+g(x)e^2)\otimes|dx|$ とする。$f,g\in C_c^\infty(\mathbb R)$ とする。新座標 $y=3x$、新枠 $e'_1=e_1+e_2$、$e'_2=e_2$ を使い、次の三点を求めよ。最後の二つの値が一般に異なる理由を、台の観点も含めて説明せよ。

  1. $v$ と $\psi$ と $\mu$ の新表示。
  2. 点源の作用値。
  3. 同じ $v$ を滑らかな定数切断 $s$ として延長した $T_s$ の作用値。

<!-- solution-start -->
**詳細解答**

枠変換 $A=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ より $v'=A^{-1}(1,2)^{\mathsf T}=(1,1)^{\mathsf T}$。双対係数は $A^{\mathsf T}(f,g)^{\mathsf T}=(f+g,g)^{\mathsf T}$ です。また $x=y/3$、$|dx|=\frac13|dy|$ なので

$$
\psi=\left(\frac{f(y/3)+g(y/3)}3e'^1
+\frac{g(y/3)}3e'^2\right)\otimes|dy|,
\qquad
\mu=\frac{e^{y/3}}3|dy|.
$$

点 $y=0$ では縮約の分子が $(f(0)+g(0))/3+g(0)/3=(f(0)+2g(0))/3$、密度の係数は $1/3$。従って

$$
\langle\delta_{0,v}^{\mu},\psi\rangle=f(0)+2g(0).
$$

一方、定数切断 $s=e_1+2e_2$ による正則超関数では

$$
\langle T_s,\psi\rangle
=\int_{\mathbb R}(f(x)+2g(x))\,dx
=\int_{\mathbb R}\frac{f(y/3)+2g(y/3)}3\,dy.
$$

点源は一点の値、正則超関数は全区間の積分を読むので一般には一致しません。$v\ne0$ より点源の台は $\{0\}$ ですが、定数切断は全点で非零なので $T_s$ の台は $\mathbb R$ です。密度 $\mu$ は点源を数に直すための基準であり、滑らかな切断から定めた作用 $\int\psi(s)$ に余分に掛けるものではありません。
<!-- solution-end -->

---

## 7. 次に何ができるか

点源をベクトル束値の超関数として扱い、試験切断と台を座標不変に記述できました。しかし $P$ が微分作用素なら、$\langle PT,\psi\rangle$ を定義するには微分を試験側へ移す操作が必要です。そこには接続・双対作用素・積分の境界項が登場します。次のHPDE4では、**密度値双対試験切断へ作用する形式的双対**を先に構成し、束計量と体積密度を追加した場合にのみ形式的随伴を定義します。
