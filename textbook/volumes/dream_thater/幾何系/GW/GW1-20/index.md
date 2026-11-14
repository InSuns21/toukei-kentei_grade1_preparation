# GW1-20 仮想基本類の設計図と限界

[前講の非凸標的の例](../GW1-19/index.md#thm-gw1-19-excess-dimension)では、負の切断の二重被覆に実際の複素2次元の族がありながら、指数由来の期待次元は1だった。滑らかな写像が「たくさんある」ことと、そのまま2次元の基本類で計数してよいことは違う。必要なのは、**零点方程式の過剰な自由度や重複度を記録し、期待次元で交叉する仕組み**である。

前講では局所障害写像を[一次変形から障害空間への縮約](../GW1-19/index.md#def-gw1-19-kuranishi-map)として導入した。しかし、各点に局所方程式があるだけでは、別々の座標表示の補正が一致する保証はない。今回は有限次元の零点模型から、局所障害を大域的に整合させるための道具と仮想基本類を結び付ける設計を調べる。

この講義で**証明する**のは、有限次元零点模型の接空間・障害と正規錐への埋め込み、およびいくつかの具体例の補正計算である。Behrend–Fantechi の一般定理が適切な条件の下で仮想基本類を構成する事実は**出力仕様として紹介する**が、一般の錐スタック・Gysin写像の構成や比較定理の完全証明はここには含めない。これを区別すると、使える定理の範囲がはっきりする。

## 1. 方程式の数と解空間の次元は一致しない

複素数体上の滑らかな代数多様体 $Y$（複素次元 $n$）と、階数 $r$ の代数的ベクトル束 $V\to Y$、その正則な切断 $s$ を考える。零点集合の**スキーム構造**も含めた零点スキームを $Z=Z(s)$ と書く。局所的に $V$ を自明化して $s=(f_1,\ldots,f_r)$ とすれば、$Z$ はイデアル $I=(f_1,\ldots,f_r)$ で定まる。

次元を単純に $n-r$ と引くのは、$r$ 本の方程式が独立という期待にすぎない。原点で $s(x)=x^2$ とした $Y=\mathbb A^1,V=\mathcal O_Y$ は、零点の台が1点なのに微分 $ds_0=0$ である。同じ座標の切断 $s(x)=x$ も台は同じ1点だが、前者は $\mathbb C[x]/(x^2)$、後者は $\mathbb C[x]/(x)$ という異なる零点スキームになる。前者の重複度2を、単なる集合は忘れてしまう。

<a id="def-gw1-20-section-virtual-dim"></a>

<!-- formal-statement-start -->
> **定義（切断の零点問題の期待次元）**  
> $Y$ を滑らかな複素代数多様体、$V\to Y$ を階数 $r$ の代数的ベクトル束、$s\in\Gamma(Y,V)$ を切断とする。$Y$ の純粋な複素次元を $n$ とするとき、零点スキーム $Z(s)$ に対して設計上の**期待複素次元**を

$$
v=n-r
$$

> と置く。これは $Z(s)$ の実際の各成分の次元を定める主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-20-section-virtual-dim -->
**定義の確認**。$Y=\mathbb A^1$、$V=Y\times\mathbb C$ では $n=r=1$ なので $v=0$。$s=x$ と $s=x^2$ はともに期待次元0だが、後者には長さ2の零点がある。$s\equiv0$ なら $Z=Y$ は実際に1次元であり、それでも $v=0$ と数える。この定義は「現実の次元を必ず返す公式」ではない。
<!-- definition-example-end -->

各零点 $z\in Z$ で接空間と障害の候補を求めるには、局所方程式の一次部分を見る。ここで **Zariski接空間** は、双対数環 $\mathbb C[\varepsilon]/(\varepsilon^2)$ 上の一次変形 $z+\varepsilon a$（$a\in T_zY$）のうち、零点方程式を満たす方向全体として捉える。局所座標 $x_1,\ldots,x_n$ と束の局所枠で $s=(f_1,\ldots,f_r)$ と表示すると、切断の微分 $ds_z:T_zY\to V_z$ は Jacobian 行列

$
J_s(z)=\left(\frac{\partial f_i}{\partial x_j}(z)\right)_{\substack{1\le i\le r\\1\le j\le n}}
$

が表す線形写像であり、$ds_z(a)$ の第 $i$ 成分は $\sum_j(\partial f_i/\partial x_j)(z)a_j$ となる。零点では $f_i(z)=0$ なので、束の枠を取り替えたときに現れる枠の微分項も消え、核・余核の意味は表示の選択によらない。ここで余核 $\operatorname{coker}ds_z=V_z/\operatorname{im}ds_z$ は、一次変形で打ち消せない値域方向を表す。

<a id="prop-gw1-20-zero-tangent-obstruction"></a>

<!-- formal-statement-start -->
> **命題（零点模型の接方向と一次障害）**  
> $Y$ を複素次元 $n$ の滑らかな複素代数多様体、$V$ を階数 $r$ のベクトル束、$s$ をその切断、$z\in Z(s)$ とする。切断の微分 $ds_z:T_zY\to V_z$ を用いると、零点スキームのZariski接空間は $\ker ds_z$ であり、一次障害の候補空間を $\operatorname{coker}ds_z$ と取れる。また

$$
\dim_{\mathbb C}\ker ds_z
-\dim_{\mathbb C}\operatorname{coker}ds_z=n-r.
$$

> $ds_z$ が全射なら $Z(s)$ は $z$ の近くで滑らかで、複素次元 $n-r$ となる。全射でなければ、上記の差から実際の局所次元・滑らかさを結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

接ベクトル $a$ を双対数 $\varepsilon^2=0$ による $z+\varepsilon a$ として代入する。$s(z)=0$ を使うと、一次項は $ds_z(a)$ になる。次元の差は線形代数の階数・退化次数の計算であり、全射時だけ[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を適用する。

<!-- proof-start -->
### 証明

$z$ の局所座標を $(x_1,\ldots,x_n)$、束の局所枠を $e_1,\ldots,e_r$ とし、$s=\sum_i f_i e_i$ と書く。点 $z$ は $f_i(z)=0$ を満たす。双対数の点を $z+\varepsilon a$ と書けば、$\varepsilon^2=0$ から

$$
f_i(z+\varepsilon a)
=f_i(z)+\varepsilon\sum_{j=1}^n
\frac{\partial f_i}{\partial x_j}(z)a_j
=\varepsilon(ds_z(a))_i.
$$

従って、すべての $f_i$ が零となる一次変形の条件は $ds_z(a)=0$ であり、接空間は核である。切断を $s_\varepsilon=s+\varepsilon b$（$b\in V_z$ は局所枠による一次の摂動）へ変えて零点条件 $s_\varepsilon(z+\varepsilon a)=0$ を課すと、$\varepsilon(ds_z(a)+b)=0$ から $ds_z(a)=-b$ が必要になる。解があるための必要十分条件は、$b$ の $\operatorname{coker}ds_z=V_z/\operatorname{im}ds_z$ での類が零となることなので、余核を一次障害の候補と読める。ただしこれだけで高次障害のすべてを分類したわけではない。

$ds_z$ の階数を $\rho$ とすると、像の次元を $\rho$ と置いて核と余核をそれぞれ数えると

$$
\dim\ker ds_z=n-\rho,\quad
\dim\operatorname{coker}ds_z=r-\rho,
$$

ゆえに差は $(n-\rho)-(r-\rho)=n-r$。$ds_z$ が全射なら $\rho=r$ であり、局所的な正則値定理（[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)の複素解析版）により零点は $n-r$ 次元の滑らかな部分多様体となる。
<!-- proof-end -->

**三つの零点模型**を比べる。

| 切断 | 零点スキーム | 原点の $\dim\ker ds$ | $\dim\operatorname{coker}ds$ | 期待次元 |
| --- | --- | ---: | ---: | ---: |
| $s(x)=x$（$\mathbb A^1\to\mathbb A^1$） | 1個の被約点 | 0 | 0 | 0 |
| $s(x)=x^2$（同上） | 長さ2の非被約点 | 1 | 1 | 0 |
| $s(x,y)=xy$（$\mathbb A^2\to\mathbb A^1$） | 二つの座標軸の合併 | 2 | 1 | 1 |

$xy=0$ は局所次元1だが原点で接空間は2次元である。「期待次元が合う」だけでは特異性も重複度も消えない。

## 2. イデアルの次数別情報を保存する正規錐

零点の接空間だけでは $x$ と $x^2$ の違いを読み切れない。スキームのイデアル $I$ のべき $I^0=\mathcal O_Y,I,I^2,\ldots$ の間の層を取れば、零点の周りの**消え方の次数**が残る。ここで用いる直和は次数ごとに積を持つ次数付き代数であり、その相対的なスペクトルが錐になる。具体的に、$Z$ のアフィン開集合 $\operatorname{Spec}B$ 上では、この代数の制限を $B$-代数として見て通常の $\operatorname{Spec}$ を作り、これらを貼り合わせたものを $\operatorname{Spec}_Z$ と書く。

<a id="def-gw1-20-normal-cone"></a>

<!-- formal-statement-start -->
> **定義（閉部分スキームの正規錐）**  
> $Y$ を複素代数スキーム、$Z\hookrightarrow Y$ を準連接イデアル層 $I$ で定まる閉部分スキームとする。$I^0=\mathcal O_Y$ として、$Z$ 上の次数付き代数

$$
\operatorname{gr}_I(\mathcal O_Y)
=\bigoplus_{q\ge0} I^q/I^{q+1}
$$

> の相対スペクトル

$$
C_{Z/Y}=
\operatorname{Spec}_Z\operatorname{gr}_I(\mathcal O_Y)
$$

> を **$Z$ の $Y$ 内の正規錐** とする。$I/I^2$ は次数1の成分で、$I^q/I^{q+1}$ は次数 $q$ の成分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-20-normal-cone -->
**定義の確認**。$Y=\mathbb A^1=\operatorname{Spec}\mathbb C[x]$、$Z=V(x^2)$ では $I=(x^2)$、$I^q=(x^{2q})$。各商 $I^q/I^{q+1}$ は $\mathbb C[x]/(x^2)$ 上、$x^{2q}$ の類で生成される自由階数1の加群である。その積は生成元どうしの積なので

$$
\operatorname{gr}_I(\mathbb C[x])
\simeq\bigl(\mathbb C[x]/(x^2)\bigr)[t],
\qquad
C_{Z/Y}\simeq Z\times\mathbb A^1.
$$

零点スキームが非被約であることは、錐の底面 $Z$ にそのまま残る。これに対し $s\equiv0$ なら $I=0$、次数が正の成分は零なので、正規錐は $Y$ そのもの（零錐）となる。
<!-- definition-example-end -->

では、この錐が切断の値域 $V$ とどう結び付くのか。束を局所的に自明化して $s=(f_1,\ldots,f_r)$ と置くと、$I=(f_1,\ldots,f_r)$ である。各方程式を単に値として見るのではなく、$f_i$ の $I/I^2$ での剰余として見るのが橋渡しである。以下でいう **正則列** とは、各局所環で $I\ne R$ かつ $f_i$ が $R/(f_1,\ldots,f_{i-1})$ の零因子でない列をいう（$i=1$ では $R$ 自身で判定する）。これは Jacobian が全射という条件より弱く、例えば $\mathbb C[x]$ の $x^2$ は正則列を成すが原点の微分は零である。正規束は $N_{Z/Y}=(I/I^2)^\vee$ と表し、[超曲面の正規束](../../../代数系/AG/AG2-10/index.md#thm-ag2-10-normal-tangent)がその既習の滑らかな余次元1の場合に当たる。

<a id="prop-gw1-20-cone-in-bundle"></a>

<!-- formal-statement-start -->
> **命題（切断の正規錐を値域の束へ埋め込む）**  
> $Y$ を滑らかな複素代数多様体、$V\to Y$ を階数 $r$ の代数的ベクトル束、$s$ を切断、$Z=Z(s)$ とする。$Z\hookrightarrow Y$ の正規錐 $C_{Z/Y}$ は、切断 $s$ から自然に定まる閉埋め込み

$$
C_{Z/Y}\hookrightarrow V|_Z
$$

> を持つ。$s$ が正則列で零点を定め、$Z$ の $Y$ 内の余次元が $r$ なら、局所的にこの埋め込みは正規束と $V|_Z$ の同型となる。$s\equiv0$ のときは零切断への埋め込みである。
<!-- formal-statement-end -->

### 証明の見取り図

切断の成分 $f_i$ が $I$ を生成するため、$V^\vee|_Z$ から $I/I^2$ への全射がある。対称代数を取って次数付き代数の全射へ延ばし、スペクトルの矢印を反転させる。

<!-- proof-start -->
### 証明

$Z$ 上で切断 $s$ は零なので、束の双対とイデアルの間の局所的な写像を

$$
V^\vee|_Z\longrightarrow I/I^2,\qquad
(a_1,\ldots,a_r)\longmapsto
\sum_i a_i f_i\bmod I^2
$$

と定められる。$f_i$ が $I$ を生成するので、これは全射である。従って次数付き代数の全射

$$
\operatorname{Sym}_{\mathcal O_Z}(V^\vee|_Z)
\twoheadrightarrow
\bigoplus_{q\ge0}I^q/I^{q+1}
$$

がある。実際、右辺の次数 $q$ の任意の元は $f_{i_1}\cdots f_{i_q}$ の $\mathcal O_Z$ 線形結合で表せる。相対スペクトルは全射を閉埋め込みへ反転するから、左辺から定まる束の全空間 $V|_Z$ に正規錐が閉埋め込まれる。

$s$ の成分 $f_1,\ldots,f_r$ が正則列なら、各 $f_i$ はそれ以前の $f_1,\ldots,f_{i-1}$ で割った環で零因子でない。これにより、局所環 $R=\mathcal O_{Y,z}$ では $I/I^2$ の $f_i$ の類が自由基底となり、各 $q\ge0$ で

$
\operatorname{Sym}^q_{R/I}(I/I^2)
\xrightarrow{\ \simeq\ }I^q/I^{q+1},\qquad
\overline{f}_{i_1}\cdots\overline{f}_{i_q}
\longmapsto f_{i_1}\cdots f_{i_q}\bmod I^{q+1}
$

が成り立つ。次数1は生成元の関係を正則性で調べ、次数 $q$ では一つの $f_i$ を取り出して同じ議論を繰り返す。例えば $r=1$ なら、$af^q\in(f^{q+1})$ から $f$ の非零因子性により $a\in(f)$ が従い、各次数の独立性を直接確認できる。一般の $r$ についても正則列の逐次的な非零因子性を用いた帰納法が対応する。従って $\operatorname{gr}_I(R)\simeq\operatorname{Sym}_{R/I}(I/I^2)$ であり、$I/I^2\simeq V^\vee|_Z$ だから正規錐は正規束 $V|_Z$ である。[超曲面の正規束と接完全列](../../../代数系/AG/AG2-10/index.md#thm-ag2-10-normal-tangent)は、$r=1$ かつ滑らかな超曲面での対応する既習例であり、一般の正則列の場合をその定理だけから推論しているわけではない。最後に $s=0$ なら $I=0$ で正の次数の部分が消え、$\operatorname{Spec}_Z\mathcal O_Z=Z$ が束の零切断として入る。
<!-- proof-end -->

この命題の意味は、零点が**横断的であれば束の全部を使う正規束**、方程式が恒等的に消える場合は**束の零切断**となることだ。錐がどこにあるかで「過剰に残った方向」を区別できる。

## 3. 正規錐を零切断と交わらせるとどうなるか

$Y$ を純次元 $n$、$V$ を階数 $r$、$Z=Z(s)$ とする。前節の閉埋め込みを利用して、錐のサイクルを $V|_Z$ の零切断と交叉させる。ここで $A_j(Z)$ は**複素次元 $j$ の代数サイクルを有理同値で割った Chow群**とする。通常の位相的ホモロジー群そのものではない。

零切断の精密Gysin写像を $0_V^!$ と記す。これは束の階数 $r$ だけサイクルの次元を下げる交叉操作である。一般の定義と構成には交叉理論が必要なので、ここではその二つの計算規則（正則な零点の基本類、零切断の自己交叉公式）を用いる。**これらの一般的な交叉理論の完全証明は本講の対象外**である。

<a id="def-gw1-20-section-virtual-cycle"></a>

<!-- formal-statement-start -->
> **定義（零点模型の局所化された期待次元サイクル）**  
> $Y$ を純複素次元 $n$ の滑らかな代数多様体、$V$ を階数 $r$ の代数的ベクトル束、$s$ を切断、$Z=Z(s)$ とする。正規錐を上記の閉埋め込みで $V|_Z$ 内のサイクルとみなし、精密Gysin写像により

$$
[Z]^{\mathrm{sec}}
:=0_V^![C_{Z/Y}]\in A_{n-r}(Z)
$$

> と定める。これは**束の切断として表された零点問題**に対する局所化された期待次元サイクルであり、任意のモジュライ空間に対する一般的な仮想基本類の構成と同一視しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-20-section-virtual-cycle -->
**定義の確認**（正則な零点）。$Y=\mathbb A^1,V=\mathcal O_Y,s=x^2$ とする。$x^2$ は零因子でないので、余次元1の正則埋め込み $Z=V(x^2)\hookrightarrow Y$ を定める。前命題より錐は $V|_Z$ 全体であり、正則埋め込みで錐が正規束全体となる場合の計算規則 $0_V^![V|_Z]=[Z]$ を用いると

$$
[Z]^{\mathrm{sec}}=[Z]=2[0]\in A_0(Z).
$$

右辺の係数2は、局所環 $\mathbb C[x]_{(x)}/(x^2)$ の長さ2である。方程式を $x^2-\lambda$ に変えると $\lambda\ne0$ では二つの単純零点が得られるので、この重複度も独立に検算できる。
<!-- definition-example-end -->

**過剰次元でも補正が残る例**。$Y=\mathbb P^1$、$V=\mathcal O_{\mathbb P^1}(1)$、$s\equiv0$ とする。$Z=Y$ は実際に複素1次元だが期待次元は $1-1=0$。錐は零切断だから、自己交叉公式は

$$
[Z]^{\mathrm{sec}}
=c_1\bigl(\mathcal O_{\mathbb P^1}(1)\bigr)\cap[\mathbb P^1]
=[\mathrm{pt}]\in A_0(\mathbb P^1).
$$

射影直線では $c_1(\mathcal O(1))$ が点類を表し、$\deg\mathcal O(1)=1$ を用いた。つまり補正は「1次元の零点を強引に1点へ潰す」操作ではない。**束のEuler類に対応する交叉の情報**が零次元の類を選ぶのである。$V=\mathcal O_{\mathbb P^1}$ なら $c_1(V)=0$ で、同じ $Z=\mathbb P^1$、同じ期待次元0でも補正類は零になる。零点集合の台と期待次元だけでは答えは決まらない。

## 4. 一般のモジュライでは「束の切断」が一つに決まらない

前講の[局所障害方程式](../GW1-19/index.md#prop-gw1-19-local-reduction)のように、安定写像の周囲では核・余核を用いて局所的な零点問題を作れる。しかし座標変更、節点の開閉、有限自己同型があるため、単一の滑らかな $Y$ と束 $V$ の切断としてモジュライ全体を示せるとは限らない。局所的な $n-r$ も任意の表示だけで大域的に一致すると仮定できない。

そのため、単に点ごとの $H^0$ と $H^1$ を集めるより、**接空間と障害空間の情報を一緒に運ぶ二項複体**を使う。

$Z\hookrightarrow Y$ が閉埋め込みのときには、微分形式の層 $\Omega_Y|_Z$ と零点のイデアル $I/I^2$ が現れる。代数スキームやスタックの微小変形を記述する正本を**余接複体** $L_M$ と呼ぶ。ここではその存在と変形論上の性質を採用する。

滑らかな $Y$ の上で定義された零点スキーム $Z$ では、次数 $-1,0$ の部分を $[I/I^2\to\Omega_Y|_Z]$ で捉えられる。[Deligne–Mumfordスタック](../GW1-10/index.md#def-gw1-10-stack)は有限の自己同型情報を保持する代数的モジュライの枠組みである。二項複体 $[A^{-1}\xrightarrow{d}A^0]$ の記号 $h^{-1}$、$h^0$ はそれぞれ $\ker d$、$\operatorname{coker}d$ という**コホモロジー層**を表す。複体の射 $\phi$ があれば核・余核の間に誘導する写像を $h^{-1}(\phi)$、$h^0(\phi)$ と書く。これは点のベクトル空間の次元 $h^0(C,E)=\dim H^0(C,E)$ とは別の記法である。

<a id="def-gw1-20-perfect-obstruction"></a>

<!-- formal-statement-start -->
> **定義（完全障害理論）**  
> $M$ を複素数体上の有限型Deligne–Mumfordスタックとし、その余接複体を $L_M$ とする。$M$ 上で局所的に有限階数のベクトル束二項複体

$$
E^\bullet=[E^{-1}\longrightarrow E^0]
$$

> （次数は $-1,0$）で表される完全複体から、余接複体への射 $\phi:E^\bullet\to L_M$ が与えられ、コホモロジー層への誘導写像が

$$
h^0(\phi):h^0(E^\bullet)\xrightarrow{\ \simeq\ }h^0(L_M),
\qquad
h^{-1}(\phi):h^{-1}(E^\bullet)\twoheadrightarrow h^{-1}(L_M)
$$

> を満たすとき、$\phi$ を**完全障害理論**（perfect obstruction theory）という。その仮想階数を

$$
\operatorname{vrk}(E^\bullet)
=\operatorname{rk}E^0-\operatorname{rk}E^{-1}
$$

> とする。局所的な二項表示の選択ではなく、複体と射の同値類がデータである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-20-perfect-obstruction -->
**定義の確認**（零点模型）。$Y=\mathbb A^1$、$V=\mathcal O_Y$、$s=x^2$ の $Z$ に対し

$$
E^\bullet=[V^\vee|_Z\xrightarrow{\,ds^\vee\,}\Omega_Y|_Z]
=[\mathcal O_Z\xrightarrow{\,2x\,}\mathcal O_Z\,dx]
$$

を取る。二項はいずれも階数1の自由 $\mathcal O_Z$ 加群なので、仮想階数は $1-1=0$。$I=(x^2)$ に対して $V^\vee|_Z\to I/I^2$ は生成元 $1$ を $x^2\bmod x^4$ へ送る同型であり、$E^\bullet$ は $[I/I^2\to\Omega_Y|_Z]$ と一致する。従って余接複体の該当次数と整合し、定義の $h^0$ 同型・$h^{-1}$ 全射が成立する。この具体例は複体の射を確認したもので、単に二つの階数を引いただけではない。
<!-- definition-example-end -->

<a id="prop-gw1-20-zero-perfect-theory"></a>

<!-- formal-statement-start -->
> **命題（ベクトル束の零点が持つ完全障害理論）**  
> $Y$ を滑らかな複素代数多様体、$V\to Y$ を階数 $r$ の代数的ベクトル束、$s$ を正則切断、$Z=Z(s)$ とする。零点上の二項複体

$$
E^\bullet=
[V^\vee|_Z\xrightarrow{\,ds^\vee\,}\Omega_Y|_Z]
$$

> は自然な射 $E^\bullet\to L_Z$ を持ち、完全障害理論を与える。仮想階数は $\dim_{\mathbb C}Y-r$ であり、双対複体の点での零次・一次のコホモロジーはそれぞれ $\ker ds_z$ と $\operatorname{coker}ds_z$ である。
<!-- formal-statement-end -->

### 証明の見取り図

切断がイデアルを生成することから $V^\vee|_Z\twoheadrightarrow I/I^2$ を得る。二項複体 $[I/I^2\to\Omega_Y|_Z]$ への射が、次数0で同型、次数 $-1$ で全射を与えることを核と余核で確かめる。点の接・障害は双対の線形写像 $ds_z$ で確認できる。

<!-- proof-start -->
### 証明

$Y$ 上で $V$ を自明化し、$s=(f_1,\ldots,f_r)$ と置く。$I=(f_1,\ldots,f_r)$ なので

$$
\theta:V^\vee|_Z\twoheadrightarrow I/I^2,\qquad
(a_i)\longmapsto\sum_i a_i f_i\bmod I^2
$$

がある。合成 $V^\vee|_Z\to I/I^2\to\Omega_Y|_Z$ は

$$
(a_i)\longmapsto\sum_i a_i\,df_i=ds^\vee(a_i)
$$

であり、複体の射を定める。$L_Z$ の次数 $-1,0$ に関する余接複体の標準表示から、これは $E^\bullet\to L_Z$ を誘導する。

次数0では両複体のコホモロジー層は $\Omega_Y|_Z$ を $df_1,\ldots,df_r$ の生成する部分層で割った $\Omega_Z$ であり、$h^0(\phi)$ は同型である。次数 $-1$ では、$\theta$ が全射で、$\Omega_Y|_Z$ への合成が一致しているから

$$
\ker(ds^\vee)\twoheadrightarrow
\ker(I/I^2\longrightarrow\Omega_Y|_Z)
$$

となる。実際、右側の元 $b$ の持ち上げ $a$ を $\theta(a)=b$ と取ると、$ds^\vee(a)$ は $b$ の微分像であり零なので $a$ は左の核に入る。これが $h^{-1}(\phi)$ の全射性である。

$E^0=\Omega_Y|_Z$ の階数は $n=\dim Y$、$E^{-1}=V^\vee|_Z$ の階数は $r$。従って仮想階数は $n-r$。双対複体は $[T_Y|_Z\xrightarrow{ds}V|_Z]$（次数 $0,1$）だから、点 $z$ での核と余核が零次・一次のコホモロジーとなる。これは[零点模型の一次変形の命題](#prop-gw1-20-zero-tangent-obstruction)の結果と一致する。
<!-- proof-end -->

ここで重要なのは、完全障害理論が**余接複体への射とその性質**を要求することだ。単に各点の障害空間の次元が分かっただけでは、この条件を満たす複体が大域的にあるとは言えない。

## 5. 内在的正規錐から仮想基本類へ――構成の入力と出力

局所的な正規錐 $C_{Z/Y}$ は、埋め込み先 $Y$ の選び方に依存する。一般のスタックで欲しいのは、局所埋め込みを変えても整合的な錐である。Behrend–Fantechi は余接複体から**内在的正規錐** $\mathfrak C_M$ を構成し、それを二項の完全障害理論によってベクトル束スタックへ埋め込む。ベクトル束スタックとは、通常の束の全空間を必要に応じて束の加法的な作用で商した対象である。

導入した記号の役割を整理する。$L_M^\vee$ は余接複体の双対であり、$h^1/h^0(L_M^\vee)$ は局所的な二項表示から得られる錐を置くスタックである。完全障害理論 $\phi:E^\bullet\to L_M$ は、錐を

$$
\mathfrak C_M
\hookrightarrow h^1/h^0((E^\bullet)^\vee)
$$

へ埋め込むための制御を与える。二項表示が $[E^{-1}\to E^0]$ なら右辺は概念的には $[(E^{-1})^\vee/(E^0)^\vee]$ という束スタックである。この商は単なる点集合の商ではなく、自己同型情報を持つ。

一般の仮想基本類の出力は、適切な有限型Deligne–Mumfordスタック $M$ に完全障害理論を与えたときの

$$
[M]^{\mathrm{vir}}\in A_v(M),
\qquad
v=\operatorname{vrk}(E^\bullet)
$$

という**期待複素次元 $v$ のChow類**である。$\mathfrak C_M$ を零切断で引き戻す構成が有限次元模型の $0_V^![C_{Z/Y}]$ を一般化する。$M$ が固有（proper）であり、挿入類によって零次元にできるとき初めてその次数を数値へ押し出せる。

ここで述べた一般の錐スタックの構成、完全障害理論からの埋め込み、零切断Gysin写像の適切な定義、および選択によらない整合性は**引用する一般結果**である。この講では全証明を行わない。一次資料は K. Behrend–B. Fantechi, [*The Intrinsic Normal Cone*](https://arxiv.org/abs/alg-geom/9601010) である。有限次元の零点模型に戻れば、すでに[正規錐の埋め込み](#prop-gw1-20-cone-in-bundle)と[零点の完全障害理論](#prop-gw1-20-zero-perfect-theory)の具体的な計算を与えた。

「同じ零点の台・同じ期待次元なら同じ数になる」という主張は誤りである。前述の $\mathbb P^1$ 上の恒等的零切断では、$\mathcal O(1)$ と自明線束の選択で $[\mathbb P^1]^{\mathrm{sec}}=[\mathrm{pt}]$ と $0$ に分かれた。**完全障害理論という追加データ**が補正の意味を決める。

## 6. 安定写像へ戻して期待次元を検算する

滑らかな複素射影多様体 $X$ の複素次元を $m$、曲線類を $\beta$、種数を $g$、標点数を $k$ とする。[種数0の安定写像の定義](../GW1-08/index.md#def-gw1-08-stable-map)では、節点・標点・成分ごとの正則写像と有限自己同型を確認した。ここでは、種数 $g$ の標点付き節点曲線へ同様の安定性条件を一般化して得るモジュライを $M=\overline{\mathcal M}_{g,k}(X,\beta)$ と書く。ただし、この高種数モジュライの構成・固有性は本講で証明しない。安定写像を動かす際は、写像だけでなく定義域の節点・標点も動く。

滑らかな定義域 $C$ と写像 $f:C\to X$ を固定した場合、写像方向の一次変形と障害は[固定定義域の変形・障害](../GW1-09/index.md#def-gw1-09-deformation-obstruction)の $H^0(C,f^*TX)$ と $H^1(C,f^*TX)$ である。

それらを族で運ぶため、普遍曲線 $\pi:\mathcal C\to M$ と普遍写像 $F:\mathcal C\to X$ を使う。曲線上の零次・一次コホモロジーをまとめる導来直像を

$$
R\pi_*F^*TX
$$

と書く。**定義域曲線の変形を基底として分けた相対的な問題**では、その双対が完全障害理論の候補になる。

絶対的な障害理論には節点・標点の変形との接続と貼り合わせが必要であり、単に各点の $H^1$ を並べるだけでは足りない。

数値としての期待次元がどう出るかは検算できる。[Riemann–Rochによる指数](../GW1-03/index.md#thm-gw1-03-rr-computation)の複素版から、滑らかな種数 $g$ の曲線について

$$
\chi(C,f^*TX)
=h^0(C,f^*TX)-h^1(C,f^*TX)
=m(1-g)+c_1(TX)\cdot\beta.
$$

定義域の種数 $g$・標点 $k$ の変形の仮想的な自由度 $3g-3+k$ を足す（球面で三次元の再パラメータ化を引く効果もこの中に含む）。従って総和は

$$
\begin{aligned}
v&=m(1-g)+c_1(TX)\cdot\beta+3g-3+k\\
&=(1-g)(m-3)+c_1(TX)\cdot\beta+k.
\end{aligned}
$$

これは[種数0モジュライの次元計算](../GW1-10/index.md#thm-gw1-10-smooth-dimension)を高種数側へ形式的に延ばした指数の照合であり、**この計算だけで一般の完全障害理論を構成したわけではない**。

具体的に[負の切断の被覆](../GW1-19/index.md#prop-gw1-19-cover-cohomology)へ戻る。$X_1$ は複素曲面なので $m=2$、$g=k=0$、$\beta=2[C]$ とする。前講の接束の次数計算から $c_1(TX_1)\cdot\beta=(2-1)2=2$、従って

$$
v=(2-3)+2=1.
$$

一方、二重被覆の実際の滑らかな局所族は $2d-2=2$ 次元、障害空間は $h^1=nd-1=1$ 次元であった。差は $2-1=1$ となり、有限次元模型の $\dim\ker-\dim\operatorname{coker}$ と整合する。ただし、これだけからその局所族の仮想類の数値や大域的なGW不変量は計算できない。

凸標的なら[滑らかなモジュライと通常の有理基本類](../GW1-10/index.md#thm-gw1-10-smooth-dimension)が成り立ち、[種数0のGW積分](../GW1-13/index.md#def-gw1-13-primary-invariant)を厳密に定義できた。非凸標的では、完全障害理論と錐の構成が新たな数学的仕事になる。

## 7. どこまで言えて、どこからが別の定理か

この設計図の使用には、少なくとも以下の区別が欠かせない。

- **局所の核・余核と大域的な障害理論**：各点で $H^0,H^1$ が計算できても、それを整合する二項複体・余接複体への射へ貼り合わせる仕事が残る。
- **期待次元と実際の次元**：正則でない零点や被覆族は過剰な次元を持ち得る。仮想類の成分は通常の基本類と同じ次数とは限らない。
- **完全障害理論とその依存性**：仮想類は追加の障害理論に依存する。恣意的な束の選択からGWの不変量が生まれるわけではなく、安定写像の自然な変形問題との整合性を構成・検証する必要がある。
- **類の存在と数値の不変性**：正しい次数のChow類を得ることと、挿入・分裂・標的の変形に対する不変性を証明することは別である。固有性と両立条件が必要になる。
- **代数幾何とシンプレクティック幾何**：代数的Deligne–Mumfordスタックへの構成を、そのまま任意の概複素構造の解析的モジュライへ移してよいわけではない。

特に、仮想次元が負でも実際に安定写像が存在し得る。$A_v(M)=0$（$v<0$）というChow群の次数の約束は、写像そのものの不存在を意味しない。逆に仮想次元0でも、その次数が単純な点の個数とは限らない。数え上げとの一致には[横断的な孤立交叉の条件](../GW1-13/index.md#thm-gw1-13-enumerative)が別に要る。

**この講の結論**。有限次元模型については、一次障害、正規錐、完全障害理論の二項表示を実際に作り、期待次元のChow類に到達した。一般の安定写像については、Behrend–Fantechi の「何を入力し、何を出力するか」と、その使用に必要な仮定を説明した段階である。次講では解析的方法と代数的方法を比較し、この科目で厳密に到達した範囲を整理する。

## 8. 演習と詳細解答

### Level A

<a id="ex-gw1-20-a01"></a>
#### GW1-20-A01 横断的な単純零点
- Level: A

$Y=\mathbb A^1_\mathbb C$、$V=\mathcal O_Y$、$s(x)=x-3$ とする。零点スキーム、零点での微分、接空間、障害候補空間、期待次元を求めよ。

<!-- solution-start -->
**詳細解答**。イデアルは $I=(x-3)$ だから $Z=\operatorname{Spec}\mathbb C[x]/(x-3)$ は被約点 $3$ 一つである。微分は $ds_3(a)=a$ で全射、核も余核も零次元。[接・障害の命題](#prop-gw1-20-zero-tangent-obstruction)によって接空間0、障害空間0。$n=r=1$ だから期待次元は $v=1-1=0$ であり、実際の零点の次元と一致する。
<!-- solution-end -->

<a id="ex-gw1-20-a02"></a>
#### GW1-20-A02 二重零点と接空間
- Level: A

$Y=\mathbb A^1$、$V=\mathcal O_Y$、$s=x^2$ に対して零点スキームの座標環とその長さ、$ds_0$ の核・余核、期待次元を求めよ。集合としての零点数だけでは何が欠落するか。

<!-- solution-start -->
**詳細解答**。$Z=\operatorname{Spec}\mathbb C[x]/(x^2)$ で、基底 $1,x$ の2次元 $\mathbb C$ ベクトル空間を持つので長さは2である。$ds_0(a)=2\cdot0\cdot a=0$ だから核 $\mathbb C$、余核 $\mathbb C$。期待次元は $1-1=0$。集合としては点 $0$ が1個であり、非被約構造の重複度2が失われる。[零点模型の期待次元サイクル](#def-gw1-20-section-virtual-cycle)では $2[0]$ が現れる。
<!-- solution-end -->

<a id="ex-gw1-20-a03"></a>
#### GW1-20-A03 二直線の交差
- Level: A

$Y=\mathbb A^2$、$V=\mathcal O_Y$、$s(x,y)=xy$ とする。零点集合とその原点での接・障害候補空間の次元、期待次元を求め、原点が滑らかか判定せよ。

<!-- solution-start -->
**詳細解答**。零点は $\{x=0\}\cup\{y=0\}$。微分は $ds_{(x,y)}(a,b)=ya+xb$ だから原点では零写像 $\mathbb C^2\to\mathbb C$、核の次元2、余核の次元1。$v=2-1=1$ である。原点以外の各軸では片方の偏微分が非零なので局所的に滑らかだが、原点では二つの一次元の枝が交叉し、接空間が2次元なので滑らかではない。期待次元1と一致することだけでは滑らかさは従わない。
<!-- solution-end -->

<a id="ex-gw1-20-a04"></a>
#### GW1-20-A04 恒等的零切断の補正
- Level: A

$Y=\mathbb P^1$、$V=\mathcal O_{\mathbb P^1}(1)$、$s\equiv0$ とする。$Z$、正規錐、期待次元、局所化された期待次元サイクルの次数を求めよ。

<!-- solution-start -->
**詳細解答**。$I=0$ なので $Z=Y$、[正規錐の定義](#def-gw1-20-normal-cone)の正の次数成分はすべて0となり、$C_{Z/Y}=Y$ は $V$ の零切断として埋まる。$n=r=1$ から $v=0$。[零点模型の局所化された期待次元サイクル](#def-gw1-20-section-virtual-cycle)の零切断の計算法により $[Z]^{\mathrm{sec}}=c_1(\mathcal O(1))\cap[\mathbb P^1]=[\mathrm{pt}]$。その次数は $\deg\mathcal O(1)=1$ である。
<!-- solution-end -->

<a id="ex-gw1-20-a05"></a>
#### GW1-20-A05 二項複体の階数
- Level: A

複素次元4の滑らかな多様体 $Y$ 上の階数6のベクトル束 $V$ の切断 $s$ が零点スキーム $Z$ を定めるとする。零点の二項複体の各次数の束と仮想階数、双対の点での接・障害の写像を書け。

<!-- solution-start -->
**詳細解答**。[零点の完全障害理論](#prop-gw1-20-zero-perfect-theory)により $E^{-1}=V^\vee|_Z$ は階数6、$E^0=\Omega_Y|_Z$ は階数4で、微分は $ds^\vee$。仮想階数は $4-6=-2$ である。双対は $[T_Y|_Z\xrightarrow{ds}V|_Z]$（次数 $0,1$）で、点 $z$ の一次接空間は $\ker(ds_z)$、一次障害候補は $\operatorname{coker}(ds_z)$。負の仮想階数でも零点が空とは断定できない。
<!-- solution-end -->

### Level B

<a id="ex-gw1-20-b01"></a>
#### GW1-20-B01 三重零点を変形して数える
- Level: B

$Y=\mathbb A^1$ 上の自明線束の切断 $s=x^3$ を考える。次を求め、台の点数1だけでは何が不足するか説明せよ。

1. 零点スキームの長さと仮想次元。
2. $s_\lambda=x^3-\lambda$（$\lambda\ne0$）の零点と重複度。
3. 原点の接空間と障害候補空間。

<!-- solution-start -->
**詳細解答**。(1) $Z=\operatorname{Spec}\mathbb C[x]/(x^3)$ は基底 $1,x,x^2$ を持つので長さ3、$v=1-1=0$。(2) $\lambda\ne0$ なら $x^3=\lambda$ は複素数体で相異なる三つの根を持ち、各根 $a$ で $s_\lambda'(a)=3a^2\ne0$。従って各点は単純零点、合計の交叉重複度は3。(3) $ds_0=0$ なので核も余核も複素次元1である。差 $1-1=0$ だけでは重複度3を判定できず、イデアルの高次情報または正規錐が必要となる。
<!-- solution-end -->

<a id="ex-gw1-20-b02"></a>
#### GW1-20-B02 過剰交叉の余った束
- Level: B

$Y=\mathbb P^1\times\mathbb P^1$、$V=p_1^*\mathcal O(1)\oplus p_2^*\mathcal O(1)$ とする。$p_i$ は射影、$\sigma$ は第1因子上でただ1点 $a$ に単純零点を持つ $\mathcal O(1)$ の非零切断とし、$s=(p_1^*\sigma,0)$ とする。零点 $Z$、実次元と期待次元、零点で余る線束、期待次元サイクルの次数を求めよ。

<!-- solution-start -->
**詳細解答**。点 $(y_1,y_2)\in Y$ について第一成分の零点条件は $p_1(y_1,y_2)=y_1=a$ だから $Z=\{a\}\times\mathbb P^1\simeq\mathbb P^1$、実際の複素次元は1。$n=r=2$ なので期待次元は0。第一成分は $Z$ の法方向で横断的に消え、第二成分は恒等的に零である。[正規錐の埋め込み](#prop-gw1-20-cone-in-bundle)で錐は第一成分の正規線束として $V|_Z$ に入り、商の余剰線束は $p_2^*\mathcal O(1)|_Z\simeq\mathcal O_{\mathbb P^1}(1)$。零切断との精密交叉を第一成分と残る第二成分に順に適用すると

$$
[Z]^{\mathrm{sec}}
=c_1(\mathcal O_{\mathbb P^1}(1))\cap[Z]
=[\mathrm{pt}],
$$

よって次数は1。これは「余った1本の方程式」の束のChern類による補正である。
<!-- solution-end -->

<a id="ex-gw1-20-b03"></a>
#### GW1-20-B03 負の切断の二重被覆を読み直す
- Level: B

$X_1=\mathbb P_{\mathbb P^1}(\mathcal O\oplus\mathcal O(-1))$ の負の切断 $C$ を次数2で覆う非定数正則写像 $u:\mathbb P^1\to X_1$ を考える。$u^*TX_1$、$h^0,h^1$、球面の再パラメータ化商の一次自由度、期待次元を計算せよ。どの値から仮想類の具体的な係数を求められないか述べよ。

<!-- solution-start -->
**詳細解答**。[被覆の接束分解](../GW1-19/index.md#prop-gw1-19-cover-cohomology)から $u^*TX_1=\mathcal O(4)\oplus\mathcal O(-2)$。[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)により

$$
h^0=5+0=5,\qquad h^1=0+1=1.
$$

非定数球面の $\operatorname{PGL}_2$ の次元3を引くので、一次自由度は $5-3=2$、期待次元は $2-1=1$。[実際の被覆族の次元](../GW1-19/index.md#thm-gw1-19-excess-dimension)も2である。$h^0,h^1$ と次元差だけでは局所障害方程式の高次の係数、正規錐、大域的な貼り合わせが定まらず、仮想類の係数は求められない。
<!-- solution-end -->

<a id="ex-gw1-20-b04"></a>
#### GW1-20-B04 同じ台でも違う障害理論
- Level: B

$Y=\mathbb P^1$ とし、同じ切断 $s\equiv0$ を、$V_1=\mathcal O_{\mathbb P^1}$ と $V_2=\mathcal O_{\mathbb P^1}(1)$ の切断としてそれぞれ考える。両者の零点スキーム・期待次元・局所化された期待次元サイクルを比較し、何が答えの違いを生むか説明せよ。

<!-- solution-start -->
**詳細解答**。どちらも $Z=Y$、$n=1,r=1$ なので期待次元 $v=0$、錐は零切断である。しかし $V_1$ は $c_1(V_1)=0$、$V_2$ は $\deg V_2=1$ である。[零点模型の局所化された期待次元サイクル](#def-gw1-20-section-virtual-cycle)について、恒等的零切断の場合の計算から

$$
[Z]^{\mathrm{sec}}_{V_1}=0,\qquad
[Z]^{\mathrm{sec}}_{V_2}=[\mathrm{pt}].
$$

零点の台も期待次元も同じであり、違いは零点問題を指定する束、ひいては[完全障害理論](#def-gw1-20-perfect-obstruction)の追加データにある。これを任意のGW不変量に適用できるという意味ではない。
<!-- solution-end -->

### Level C

<a id="ex-gw1-20-c01"></a>
#### GW1-20-C01 過剰次元・次数・摂動・負の仮想次元の総合検算
- Level: C

$Y=\mathbb P^1$ を複素射影直線とする。以下の三つの零点問題を比較せよ。

1. $V=\mathcal O_{\mathbb P^1}(2)$、$s\equiv0$。
2. 同じ $V$ 上の非零切断 $t$ で、二つの相異なる単純零点を持つもの。
3. $W=\mathcal O_{\mathbb P^1}(1)\oplus\mathcal O_{\mathbb P^1}(1)$、切断 $u\equiv0$。

それぞれについて、零点スキームの実次元と期待次元、正規錐の形、局所化された期待次元サイクル（またはその属するChow群）を求めよ。さらに (1) と (2) の零点の台は異なるのに数が一致する理由と、(3) から「零点がない」と言えない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。(1) $s=0$ なので $I=0$、$Z=Y$ は実次元1、正規錐は零錐 $Y\hookrightarrow V$。$n=1,r=1$ だから $v=0$。[零点模型の局所化された期待次元サイクル](#def-gw1-20-section-virtual-cycle)で示した零切断の交叉計算を適用すると

$$
[Z]^{\mathrm{sec}}
=c_1(\mathcal O_{\mathbb P^1}(2))\cap[\mathbb P^1]
=2[\mathrm{pt}],
$$

よって次数は2。(2) $t$ の二つの零点を $a,b$ と書く。単純零点だから各点で $dt$ は非零であり、$Z(t)$ は二つの被約点、実次元0、期待次元 $1-1=0$。正規錐は正規束 $V|_{Z(t)}$ 全体で、Gysin類は通常の基本類

$$
[Z(t)]^{\mathrm{sec}}=[a]+[b].
$$

次数は $1+1=2$。(1) と (2) の零点の形は異なるが、どちらも同じ束の第一Chern類の次数2を表す。なお $2[\mathrm{pt}]$ と $[a]+[b]$ の等しさは $\mathbb P^1$ 上のChow群での有理同値を通じて読む。

(3) $u=0$ なので $Z(u)=Y$ で実次元1、錐は零錐である。しかし $W$ は階数2なので $v=1-2=-1$。局所化されたサイクルは $A_{-1}(\mathbb P^1)=0$ に属し、従って零である。あるいはトップChern類 $c_2(W)$ は複素次元1の $Y$ で零となる。**仮想類が零でも実際の零点は $\mathbb P^1$ 全体**である。これにより、実次元、仮想次元、Chow類、集合としての存在を四つに分けられる。
<!-- solution-end -->
