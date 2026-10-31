# QFT21 連結Green関数・Legendre変換と1PI有効作用

[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)では、ソース $J$ で微分するだけで多点関数を取り出せました。しかし、多点関数には、互いに独立な部分が積になった寄与も混ざります。たとえば平均が零の自由一変数では $\langle x^4\rangle=3\langle x^2\rangle^2$ であり、四点の新しい相互作用が見つかったわけではありません。

**中心問いは、相関関数から本当に「つながった部分」を取り出し、さらに内部の一本の線で分解できない基本的な相互作用をどう記録するか**です。最初に有限次元の正の積分で $W=\log Z$ とLegendre変換を定義し、すべての微分を検算します。最後に摂動論での1粒子既約（1PI）図との関係を整理します。

ここではEuclid型の可換実変数 $x\in\mathbb R^n$ を用い、$\hbar=1$ とします。連続場の経路積分は一般には有限次元積分そのものではありません。[QFT20のEuclidデータの条件](../QFT20/index.md#def-qft20-os-data)も踏まえ、無限モードや正則化除去についての結論は有限次元の証明から無条件には主張しません。

## 1. 対数を取ると「つながった相関」になる

実関数 $S(x)$ に対し $e^{-S(x)}$ を重みとし、実ソース $J$ を $J^Tx$ として加えます。最初は、$Z(J)=\int_{\mathbb R^n}e^{-S(x)+J^Tx}d^nx$ が $J=0$ の近傍で有限かつ正で、任意次数のソース微分を積分内へ入れられると仮定します。$S(x)=x^TAx/2+\lambda(x^Tx)^2$（$A$ が実対称正定値、$\lambda\ge0$）などが具体例です。

$Z(J)/Z(0)$ は全てのモーメントを記録しますが、積で説明できる成分を除くには対数が有効です。積が対数の下では和に変わるからです。

<a id="def-qft21-connected-generator"></a>

<!-- formal-statement-start -->
> **定義（連結生成関数と連結r点関数）**  
> 整数 $n\ge1$ と実数ソース $J\in\mathbb R^n$ に対して、上記の $Z(J)>0$ が零の近傍で滑らかであるとする。規格化生成関数 $\mathcal Z(J)$、連結生成関数 $W(J)$ と連結 $r$ 点関数（累積量）を次で定義する。

$$
\mathcal Z(J)=\frac{Z(J)}{Z(0)},\qquad
W(J)=\log\mathcal Z(J),\qquad
G^{(r)}_{c;i_1\ldots i_r}=
\left.\frac{\partial^rW}{\partial J_{i_1}\cdots\partial J_{i_r}}\right|_{J=0}.
$$

> $W(0)=0$ である。非零ソースで評価した微分はソース付きの連結相関を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft21-connected-generator -->
### 例：二つの独立な変数を混ぜても交差連結相関はない

**定義の確認**：$S(x_1,x_2)=a x_1^2/2+b x_2^2/2$、$a,b>0$ とする。[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)より

$$
\mathcal Z(J_1,J_2)=e^{J_1^2/(2a)}e^{J_2^2/(2b)},\qquad
W(J_1,J_2)=\frac{J_1^2}{2a}+\frac{J_2^2}{2b}.
$$

$\partial_{J_1}\partial_{J_2}W=0$ ですが、$\partial_{J_1}^2W=1/a$、$\partial_{J_2}^2W=1/b$ です。独立な二組の積を対数が和へ分け、交差する連結寄与だけが消えたことを、実際の微分で確認できました。
<!-- definition-example-end -->

ここから、通常の $r$ 点関数を $G^{(r)}_{i_1\ldots i_r}=\langle x_{i_1}\cdots x_{i_r}\rangle_0$ と書きます。$\mathcal Z=e^W$ の微分を繰り返せば、添字集合を幾つかの非空な組に分ける全ての方法が現れます。この「組」ひとつが連結相関ひとつを表します。

<a id="thm-qft21-moment-cumulant"></a>

<!-- formal-statement-start -->
> **定理（モーメントと連結相関の分割公式）**  
> $\mathcal Z(J)=e^{W(J)}$ が零の近傍で $r$ 回連続微分可能とする。$\Pi_r$ を $\{1,\ldots,r\}$ の全ての集合分割の集合とする。各ブロック $B\subset\{1,\ldots,r\}$ には、位置 $b\in B$ に対応する添字 $i_b$ を割り当てる。このとき

$$
G^{(r)}_{i_1\ldots i_r}
=\sum_{\pi\in\Pi_r}\ \prod_{B\in\pi}
G^{(|B|)}_{c;(i_b)_{b\in B}}.
$$

> とくに平均 $m_i=\langle x_i\rangle_0$ のとき、連結二点は $G^{(2)}_{c;ij}=\langle x_ix_j\rangle_0-m_im_j$ となる。平均が零なら、連結四点は通常の四点関数から三通りの二点積を差し引いたものである。
<!-- formal-statement-end -->

### 証明の見取り図

$r$ 回微分した $e^W$ にもう一度微分を加えると、新しい添字は既存のブロックのいずれかに入るか、単独のブロックになります。これで全ての集合分割が過不足なく一回ずつ数えられます。

<!-- proof-start -->
### 証明

零ソースより前の関数の等式をまず証明します。$r=1$ は $\partial_i e^W=e^W\partial_iW$ です。$r$ 回微分の式が

$$
\partial_{i_1}\cdots\partial_{i_r}e^W
=e^W\sum_{\pi\in\Pi_r}\prod_{B\in\pi}\partial_BW
$$

だと仮定し、$\partial_{i_{r+1}}$ を施します。$e^W$ に微分が当たれば、$\partial_{i_{r+1}}W$ の単独ブロックが追加されます。ある $\partial_BW$ に当たれば、そのブロックが $\partial_{B\cup\{r+1\}}W$ に変わります。$r+1$ の属するブロックが単独か否かで場合分けでき、後者の場合には元のブロックが一意に復元されるため重複はありません。帰納法が成立します。$J=0$ で $e^{W(0)}=1$ を代入すると主張の式です。

$r=2$ では $\partial_i\partial_j\mathcal Z=\mathcal Z(W_{ij}+W_iW_j)$ だから $G^{(2)}_{c;ij}=G^{(2)}_{ij}-m_im_j$。$r=4$ で $m=0$ とすると、一ブロックの寄与と二個ずつの分割三通りだけが残り、

$$
G^{(4)}_{c;ijkl}=G^{(4)}_{ijkl}
-G^{(2)}_{c;ij}G^{(2)}_{c;kl}
-G^{(2)}_{c;ik}G^{(2)}_{c;jl}
-G^{(2)}_{c;il}G^{(2)}_{c;jk}
$$

が得られます。平均が非零なら三点と一点などの分割も残るので、この最後の簡約式を無条件には使えません。
<!-- proof-end -->

たとえば一変数の中心Gaussian（分散 $g$）では、[ボースGaussianのWick対合公式](../QFT19/index.md#thm-qft19-boson-wick)から $\langle x^4\rangle=3g^2$、したがって連結四点は $3g^2-3g^2=0$ です。これが「四点を観測した」ことと「四点の独立した相互作用を観測した」ことが違う最初の例です。

## 2. ソースから平均場へ座標を取り替える

ソース $J$ を動かして得る平均 $\phi=\langle x\rangle_J$ を新しい変数にしたいと考えます。$\phi$ と書いてもここでは有限個の実数であり、まだ量子場の演算子ではありません。平均をソースの関数と見れば、微分行列は揺らぎの共分散になります。

<a id="def-qft21-mean-field"></a>

<!-- formal-statement-start -->
> **定義（平均場とソース付き連結二点行列）**  
> $Z(J)$ が正で二回微分可能な範囲で、ソース付き平均を次で考える。

$$
\langle F\rangle_J=\frac1{Z(J)}\int_{\mathbb R^n}F(x)e^{-S(x)+J^Tx}\,d^nx.
$$

> 平均場 $\phi_i(J)$ と連結二点行列 $C_{ij}(J)$ を

$$
\phi_i(J)=\frac{\partial W}{\partial J_i}=\langle x_i\rangle_J,
\qquad
C_{ij}(J)=\frac{\partial\phi_i}{\partial J_j}
=\frac{\partial^2 W}{\partial J_i\partial J_j}
$$

> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft21-mean-field -->
### 例：一変数の平均と揺らぎ

**定義の確認**：$S(x)=a x^2/2$、$a>0$ とします。[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)を使い、対数を取って二回微分すると

$$
W(J)=\frac{J^2}{2a},\qquad
\phi(J)=\frac Ja,\qquad C(J)=\frac1a.
$$

ソースを $\Delta J$ 動かすと平均は $\Delta J/a$ だけ動きます。また、[QFT19で定義した連結二点](../QFT19/index.md#def-qft19-connected-two-point)をこのGaussianで直接計算すると

$$
\langle x^2\rangle_J-\langle x\rangle_J^2
=\left(\frac1a+\frac{J^2}{a^2}\right)-\frac{J^2}{a^2}
=\frac1a=C(J).
$$

平均の積を除いた量だけがソースへの応答を表します。
<!-- definition-example-end -->

<a id="thm-qft21-covariance-positive"></a>

<!-- formal-statement-start -->
> **定理（平均場の応答と共分散の正値性）**  
> $e^{-S(x)+J^Tx}$ が $\mathbb R^n$ 上でほとんど至る所正、かつ二階微分と積分交換が正当化され、二次モーメントが有限であるとする。このとき

$$
C_{ij}(J)=\langle x_ix_j\rangle_J-\langle x_i\rangle_J\langle x_j\rangle_J
$$

> は実対称正定値であり、$J\mapsto\phi(J)$ は各点の近傍で局所可逆である。
<!-- formal-statement-end -->

### 証明の見取り図

$Z$ の二階微分と商の微分から平均積を引く式を得ます。$u^TCu$ を $u^Tx$ の分散とみると、全空間に正の密度を持つため、$u\ne0$ なら定数に固定されず分散が正です。

<!-- proof-start -->
### 証明

$Z_i=\int x_i e^{-S+J^Tx}dx$、$Z_{ij}=\int x_ix_j e^{-S+J^Tx}dx$ とします。$W_i=Z_i/Z$ をもう一度微分すると

$$
W_{ij}=\frac{Z_{ij}}Z-\frac{Z_iZ_j}{Z^2}
=\langle x_ix_j\rangle_J-\langle x_i\rangle_J\langle x_j\rangle_J.
$$

任意の $u\in\mathbb R^n$ について $u^TCu=\langle(u^T(x-\phi))^2\rangle_J\ge0$ です。もし $u\ne0$ で等号なら、被積分関数の平方はほとんど至る所零で、$u^Tx=u^T\phi$ が全空間のほとんど至る所成立することになります。しかしこれは超平面であり、正のLebesgue密度を持つ分布で確率1となることはありません。よって $u^TCu>0$。$C$ は可逆であるため、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $J\mapsto\phi$ は局所可逆です。
<!-- proof-end -->

正定値性はここで明示した**正の有限次元重み**に依存します。振動型のMinkowski積分、Grassmann積分、ゲージ固定前の零モードがある形式的な場に、そのまま適用してはいけません。

## 3. Legendre変換で有効作用を構成する

平均 $\phi$ を指定して、その平均を生むソース $J$ を逆に求めることができれば、変数の役割を入れ替えられます。この入れ替えがLegendre変換です。$W$ の凸性と $C>0$ によって、少なくとも局所的には一意に実行できます。

<a id="def-qft21-effective-action"></a>

<!-- formal-statement-start -->
> **定義（Euclid型1PI有効作用）**  
> $W(J)$ が滑らかで、$C(J)=\nabla_J^2W(J)$ が正定値となる開領域を取り、その像の平均場 $\phi=\nabla_JW(J)$ からソースを $J=J(\phi)$ と逆に解く。このとき有効作用を

$$
\Gamma(\phi)=J(\phi)^T\phi-W(J(\phi))
$$

> と定義する。これは本章では **Euclid符号**の規約であり、Minkowski時空の作用の符号と混同しない。$W(0)=0$ という規格化では $\Gamma(\phi(0))=0$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft21-effective-action -->
### 例：自由Gaussianの有効作用は二次式に戻る

**定義の確認**：$S(x)=a x^2/2$、$a>0$ なら $W(J)=J^2/(2a)$、$\phi=J/a$ です。逆関係 $J=a\phi$ を定義式へ代入すると

$$
\Gamma(\phi)=(a\phi)\phi-\frac{(a\phi)^2}{2a}
=\frac a2\phi^2.
$$

確かに $\Gamma(0)=0$、$\Gamma'(\phi)=a\phi=J$、$\Gamma''=a>0$ で、$W''=1/a$ の逆数です。単にLegendre変換という名前を付けるだけでなく、どの変数を消去したかを示しました。
<!-- definition-example-end -->

<a id="thm-qft21-legendre-hessian"></a>

<!-- formal-statement-start -->
> **定理（Legendre双対と二点関数の逆行列）**  
> [平均場の応答行列](#thm-qft21-covariance-positive)が正定値となる領域で、上の $\Gamma$ を定義する。このとき各 $\phi$ について

$$
\frac{\partial\Gamma}{\partial\phi_i}=J_i(\phi),
\qquad
\sum_k\frac{\partial^2\Gamma}{\partial\phi_i\partial\phi_k}
C_{kj}(J(\phi))=\delta_{ij}.
$$

> 特に $\Gamma^{(2)}(\phi)=C(J(\phi))^{-1}$ であり、零ソースの平均 $\phi_0=\phi(0)$ は $\Gamma$ の停留点である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Gamma=J\cdot\phi-W(J)$ を $\phi$ で微分すると、$J$ が動くための二項が $\nabla_J W=\phi$ によって相殺します。もう一度微分し、$\phi$ と $J$ のJacobianを合成すると単位行列になります。

<!-- proof-start -->
### 証明

連鎖律を添字で展開します。

$$
\begin{aligned}
\frac{\partial\Gamma}{\partial\phi_i}
&=\sum_k\left(
\frac{\partial J_k}{\partial\phi_i}\phi_k
+J_k\frac{\partial\phi_k}{\partial\phi_i}
-\frac{\partial W}{\partial J_k}\frac{\partial J_k}{\partial\phi_i}\right)\\
&=\sum_k\left(\frac{\partial J_k}{\partial\phi_i}\phi_k
+J_k\delta_{ki}-\phi_k\frac{\partial J_k}{\partial\phi_i}\right)=J_i.
\end{aligned}
$$

これを $\phi_j$ で微分すると $\Gamma^{(2)}_{ij}=\partial J_i/\partial\phi_j$ です。一方、[平均場の定義](#def-qft21-mean-field)より $\partial\phi_k/\partial J_j=C_{kj}$ です。$J\mapsto\phi\mapsto J$ を微分して

$$
\sum_k\frac{\partial J_i}{\partial\phi_k}
\frac{\partial\phi_k}{\partial J_j}=\delta_{ij}
$$

が得られます。よって $\Gamma^{(2)}C=I_n$ です。$J=0$ では $\Gamma'(\phi_0)=0$。また $\Gamma''=C^{-1}>0$ なのでこの局所領域での停留点は局所極小です。
<!-- proof-end -->

ここが計算上の重要な違いです。**連結二点 $C$ は伝播の大きさ、$\Gamma^{(2)}$ はその逆作用素**です。連続場では行列の積を時空積分へ置き換え、場・ソース・逆核を適切な正則化と関数空間上で定めた上で形式的に

$$
\int d^dy\,\frac{\delta^2\Gamma}{\delta\phi(x)\delta\phi(y)}
\frac{\delta^2W}{\delta J(y)\delta J(z)}=\delta^{(d)}(x-z)
$$

と書きます。この式を、無限次元での逆作用素の存在を無条件に保証する定理とはみなしません。

## 4. 連結頂点から、一本の線で分解できない頂点へ

摂動論の図で、連結な図の内部線を一本切ると二つに分かれる場合、その図はさらに小さな部分を伝播関数でつないでいます。**内部線をどの一本で切っても連結性が保たれる図**を1粒子既約（one-particle irreducible; 1PI）図と呼びます。外線はこの判定の対象ではありません。図の分類は、どの伝播関数・頂点で摂動展開したかという文脈に依存します。

有効作用の高階微分は、連結関数から外側の完全二点関数を取り除いた「固有頂点」を表します。ここでは先に有限次元で正確な微分恒等式を作り、その後で摂動図としての意味を述べます。

<a id="def-qft21-proper-vertex"></a>

<!-- formal-statement-start -->
> **定義（有効作用のr点固有頂点）**  
> $\Gamma$ が平均場 $\phi$ の近傍で $r\ge2$ 回微分可能なとき、$r$ 点固有頂点を

$$
\Gamma^{(r)}_{i_1\ldots i_r}(\phi)
=\frac{\partial^r\Gamma}{\partial\phi_{i_1}\cdots\partial\phi_{i_r}}(\phi)
$$

> と定義する。本章ではEuclid型の $\Gamma$ を使い、相関関数との関係に現れる負符号もこの規約から決める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft21-proper-vertex -->
### 例：二次式には三点以上の固有頂点がない

**定義の確認**：[自由Gaussianの有効作用](#def-qft21-effective-action) $\Gamma(\phi)=a\phi^2/2$ を繰り返し微分すると、$\Gamma^{(2)}=a$、$\Gamma^{(3)}=\Gamma^{(4)}=0$ です。実際、Gaussianでは三点・四点の連結関数も零です。後述の三点・四点の式に代入して整合性を確かめられます。
<!-- definition-example-end -->

<a id="thm-qft21-connected-1pi"></a>

<!-- formal-statement-start -->
> **定理（連結三点・四点と固有頂点）**  
> $W$ とそのLegendre変換 $\Gamma$ が四回微分可能で、$C=W^{(2)}$ が正定値であるとする。添字の反復は全て $1,\ldots,n$ について和を取る。$C$ と $\Gamma^{(r)}$ を対応する $J,\phi(J)$ で評価すると

$$
W^{(3)}_{ijk}=-C_{ia}C_{jb}C_{kc}\Gamma^{(3)}_{abc},
$$

$$
\begin{aligned}
W^{(4)}_{ijkl}=C_{ia}C_{jb}C_{kc}C_{ld}\bigl[
&-\Gamma^{(4)}_{abcd}
+\Gamma^{(3)}_{abe}C_{ef}\Gamma^{(3)}_{fcd}\\
&+\Gamma^{(3)}_{ace}C_{ef}\Gamma^{(3)}_{fbd}
+\Gamma^{(3)}_{ade}C_{ef}\Gamma^{(3)}_{fbc}\bigr].
\end{aligned}
$$

> 最後の三項は、四つの外部添字に対応する $C$ の積とは別に、二つの三点固有頂点を一本の完全二点関数で結ぶ三通りの分割を表す。
<!-- formal-statement-end -->

### 証明の見取り図

$\Gamma^{(2)}C=I$ を微分すると、逆行列の微分に由来する負号が一つ出ます。これを三点の式に使い、さらに四点で微分したとき、三つの外側の $C$ を微分した項と、$\Gamma^{(3)}$ を微分した項を分けます。

<!-- proof-start -->
### 証明

[Legendre双対の逆行列公式](#thm-qft21-legendre-hessian)を $\phi_d$ で微分すると

$$
0=\frac{\partial}{\partial\phi_d}
(C_{ia}\Gamma^{(2)}_{aj})
=\frac{\partial C_{ia}}{\partial\phi_d}\Gamma^{(2)}_{aj}
+C_{ia}\Gamma^{(3)}_{ajd}.
$$

右から $C_{jb}$ を掛け、$\Gamma^{(2)}_{aj}C_{jb}=\delta_{ab}$ を用いれば

$$
\frac{\partial C_{ib}}{\partial\phi_d}
=-C_{ia}\Gamma^{(3)}_{ajd}C_{jb}.
$$

さらに $\partial\phi_d/\partial J_k=C_{dk}$ なので

$$
W^{(3)}_{ibk}=\frac{\partial C_{ib}}{\partial J_k}
=-C_{ia}C_{bj}C_{kd}\Gamma^{(3)}_{ajd}.
$$

これで三点の式を得ました。四点では、三点の積 $-C_{ia}C_{jb}C_{kc}\Gamma^{(3)}_{abc}$ を $J_l$ で微分します。前式を用いて $\partial_{J_l}C_{ia}=-C_{ip}\Gamma^{(3)}_{pqe}C_{qa}C_{el}$ と置けば、最初の $C_{ia}$ に微分が当たる項は

$$
C_{ip}C_{jb}C_{kc}C_{ld}\,
\Gamma^{(3)}_{pde}C_{ef}\Gamma^{(3)}_{fbc}
$$

です。外側を $C_{ia}C_{jb}C_{kc}C_{ld}$ にそろえるよう内部添字を付け替えると、$\Gamma^{(3)}_{ade}C_{ef}\Gamma^{(3)}_{fbc}$ に一致します。同じ操作を $C_{jb}$ と $C_{kc}$ に行えば、残りの二通り $\Gamma^{(3)}_{bde}C_{ef}\Gamma^{(3)}_{fac}$、$\Gamma^{(3)}_{cde}C_{ef}\Gamma^{(3)}_{fab}$ が出ます。最後に $\Gamma^{(3)}_{abc}$ に微分が当たる場合は、$\partial_{J_l}\Gamma^{(3)}_{abc}=\Gamma^{(4)}_{abcd}C_{dl}$ から $-C_{ia}C_{jb}C_{kc}C_{ld}\Gamma^{(4)}_{abcd}$ が出ます。固有頂点の添字の対称性を使って三通りを並べ替えると定理の四点公式になります。
<!-- proof-end -->

一変数なら添字の和がすべて通常の積になり、特に分かりやすくなります。$C=W''=1/\Gamma''$ と置いて

$$
W'''=-C^3\Gamma''',\qquad
W''''=-C^4\Gamma''''+3C^5(\Gamma''')^2.
$$

**なぜ1PIと呼ぶか。** 摂動展開を固定して連結図を分類すると、一本の内部線で分離する連結図は、より小さい頂点を二点関数でつなぐ木状の組合せとして現れます。上の三点・四点恒等式は、これを外線二点関数も含めて代数的に表現しています。$\Gamma$ の摂動係数は、そのような一本切断可能な寄与を除いた1PI図の和に対応します。ただしこの図的対応は**形式的摂動級数の各次数**での主張であり、有限次元積分の微分恒等式だけで連続場の摂動級数の収束を証明したものではありません。

## 5. 一変数の四次模型で相互作用を検算する

自由Gaussianでは四点の連結相関も固有頂点も零でした。それでは本当に四次の相互作用を加えるとどうなるでしょうか。有限次元で収束する模型を選べば、ループ図を仮定せずソース微分と積分から答えを検算できます。

<a id="prop-qft21-quartic-model"></a>

<!-- formal-statement-start -->
> **命題（零次元四次模型の連結四点と固有頂点）**  
> $a>0$、$\lambda\ge0$ として $S(x)=a x^2/2+\lambda x^4/4!$ を $x\in\mathbb R$ 上で考える。$J=0$ では $\phi_0=0$、$\Gamma^{(3)}(0)=0$ であり、$\lambda\downarrow0$ における展開は

$$
\begin{aligned}
C(0)&=\frac1a-\frac{\lambda}{2a^3}+O(\lambda^2),\\
W^{(4)}(0)&=-\frac{\lambda}{a^4}+O(\lambda^2),\\
\Gamma^{(2)}(0)&=a+\frac{\lambda}{2a}+O(\lambda^2),\\
\Gamma^{(4)}(0)&=\lambda+O(\lambda^2).
\end{aligned}
$$

> ここで $O(\lambda^2)$ は $a$ を固定して右側から $\lambda\to0$ とした余剰項である。
<!-- formal-statement-end -->

### 証明の見取り図

相互作用 $e^{-\lambda x^4/24}$ を一次まで展開し、分子と規格化分母の両方を展開します。Gaussianの偶数次モーメントを使って $\langle x^2\rangle_\lambda$ と $\langle x^4\rangle_\lambda$ を求め、連結四点を作ってから先ほどの逆行列・四点公式に代入します。

<!-- proof-start -->
### 証明

$\langle\cdot\rangle_g$ を分散 $1/a$ の中心Gaussian平均とします。[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)を $J$ で偶数回微分すると

$$
\langle x^2\rangle_g=a^{-1},\quad
\langle x^4\rangle_g=3a^{-2},\quad
\langle x^6\rangle_g=15a^{-3},\quad
\langle x^8\rangle_g=105a^{-4}.
$$

正規化された相互作用平均は

$$
\langle F\rangle_\lambda
=\frac{\langle F e^{-\lambda x^4/24}\rangle_g}
{\langle e^{-\lambda x^4/24}\rangle_g}.
$$

$\lambda\ge0$ では $e^{-\lambda x^4/24}\le1$ なので右微分を二回行う際もGaussianの多項式モーメントで支配でき、Taylorの剰余を $O(\lambda^2)$ と評価できます。分母を展開すると

$$
\langle F\rangle_\lambda
=\langle F\rangle_g
-\frac{\lambda}{24}
\left(\langle Fx^4\rangle_g
-\langle F\rangle_g\langle x^4\rangle_g\right)
+O(\lambda^2).
$$

$F=x^2$、$F=x^4$ を代入して

$$
\begin{aligned}
\langle x^2\rangle_\lambda
&=\frac1a-\frac\lambda{24}\left(\frac{15}{a^3}-\frac3{a^3}\right)+O(\lambda^2)
=\frac1a-\frac\lambda{2a^3}+O(\lambda^2),\\
\langle x^4\rangle_\lambda
&=\frac3{a^2}-\frac\lambda{24}\left(\frac{105}{a^4}-\frac9{a^4}\right)+O(\lambda^2)
=\frac3{a^2}-\frac{4\lambda}{a^4}+O(\lambda^2).
\end{aligned}
$$

作用が偶関数なので奇数モーメントは零です。[連結分割公式](#thm-qft21-moment-cumulant)から

$$
\begin{aligned}
W^{(4)}(0)&=\langle x^4\rangle_\lambda-3\langle x^2\rangle_\lambda^2\\
&=\left(\frac3{a^2}-\frac{4\lambda}{a^4}\right)
-3\left(\frac1{a^2}-\frac\lambda{a^4}\right)+O(\lambda^2)
=-\frac\lambda{a^4}+O(\lambda^2).
\end{aligned}
$$

逆数を一次まで展開すると $\Gamma^{(2)}(0)=C(0)^{-1}=a+\lambda/(2a)+O(\lambda^2)$ です。また $W'''(0)=0$ だから[連結四点と固有頂点の恒等式](#thm-qft21-connected-1pi)で三点頂点の項は消え、$W^{(4)}=-C^4\Gamma^{(4)}$ です。$C^4=a^{-4}+O(\lambda)$ より $\Gamma^{(4)}(0)=\lambda+O(\lambda^2)$ が従います。
<!-- proof-end -->

相互作用が四点固有頂点の先頭係数になり、二点固有頂点にも $\lambda/(2a)$ の補正が現れました。$W^{(4)}$ の負号は「不安定な相互作用」を意味しません。正のEuclid重みとLegendre変換を採用したため、外線を取り除く関係に負号が入ったものです。

## 6. 場の理論での読み替えとループへの入口

有限の格子点・運動量cutoffのもとなら、添字 $i$ を「格子点と場の成分」に読み替えられます。[QFT19の有限格子生成汎関数](../QFT19/index.md#def-qft19-lattice-functional)のソースを $J_i$ とし、$W=\log Z/Z(0)$ と $\Gamma$ を定義すれば、行列の証明は変わりません。連続記法の $\delta W/\delta J(x)$ と $\delta\Gamma/\delta\phi(x)$ はその極限を表す**形式的記号**です。特に分布の積や作用素の逆にはUV・IR条件が要ります。

1PI有効作用をループ計算へつなぐため、ここだけ $\hbar$ を復活させます。正の定数 $\hbar$ に対し

$$
Z_\hbar(J)=\int e^{-[S(x)-J^Tx]/\hbar}\,d^nx,\qquad
W_\hbar(J)=\hbar\log\frac{Z_\hbar(J)}{Z_\hbar(0)}
$$

とします。$\phi=\partial_JW_\hbar$、$\Gamma_\hbar=J\cdot\phi-W_\hbar$ の定義は同じです。ただし $W_\hbar''=\operatorname{Cov}_J(x)/\hbar$ となり、$\hbar$ を落とさずに二階微分することが必要です。

<a id="prop-qft21-one-loop-saddle"></a>

<!-- formal-statement-start -->
> **命題（有限次元での一ループ行列式の入口）**  
> $S\in C^\infty(\mathbb R^n)$ が十分速く増大し、考えるソースの近傍で $S(x)-J^Tx$ に一意の非退化大域最小点 $x_*(J)$ があり、鞍点近傍の漸近展開と残部評価が一様に成り立つとする。$x_0=x_*(0)$ とし、平均場 $\phi$ がこの近傍にあるとき、$\hbar\downarrow0$ で

$$
\Gamma_\hbar(\phi)=S(\phi)-S(x_0)
+\frac\hbar2\log\frac{\det S''(\phi)}{\det S''(x_0)}
+O(\hbar^2)
$$

> が成り立つ。$S''$ はHessianで、両評価点で正定値とする。$\phi$ に依存しない項は $W_\hbar(0)=0$ の規格化で固定した。
<!-- formal-statement-end -->

### 証明の見取り図

極小点の周りへ $x=x_*+\sqrt\hbar\,y$ と置き、二次のGaussian積分の行列式を取り出します。$J$ に関するLegendre変換では、$x_*$ と $\phi$ の差が $O(\hbar)$ であることから、停留条件で一次のずれが相殺されます。

<!-- proof-start -->
### 証明

$H_J=S''(x_*(J))$、$F_J(x)=S(x)-J^Tx$ とします。$\nabla F_J(x_*)=0$ より $x=x_*+\sqrt\hbar\,y$ では

$$
\frac{F_J(x)}\hbar=\frac{F_J(x_*)}\hbar
+\frac12y^TH_Jy+O(\sqrt\hbar\,\|y\|^3).
$$

先頭のGaussian積分は $ (2\pi\hbar)^{n/2}/\sqrt{\det H_J}$ です。奇の次数の寄与はGaussianの対称性で積分すると零となり、仮定した一様な鞍点の漸近展開により

$$
\log Z_\hbar(J)=-\frac{F_J(x_*)}\hbar
+\frac n2\log(2\pi\hbar)-\frac12\log\det H_J+O(\hbar).
$$

$J=0$ の式を引き、$\hbar$ を掛けると

$$
W_\hbar(J)=J^Tx_*-S(x_*)+S(x_0)
-\frac\hbar2\log\frac{\det H_J}{\det H_0}+O(\hbar^2).
$$

ここで $\nabla S(x_*)=J$。微分により $\phi=\nabla_JW_\hbar=x_*+O(\hbar)$ です。Legendre変換へ代入すると、$J\cdot(\phi-x_*)+S(x_*)$ は停留条件 $\nabla S(x_*)=J$ によって $S(\phi)+O(\hbar^2)$ に等しいです。また $\hbar\log\det H_J=\hbar\log\det S''(\phi)+O(\hbar^2)$。以上を合わせて結論を得ます。
<!-- proof-end -->

この $\log\det S''$ が場の1ループ補正の原型です。ただし、連続場で $\operatorname{Tr}\log$ と書いた瞬間に有限な値が定まるわけではありません。次の講義では、$\phi^4$ 模型の実際のループ積分と正則化を出発点から扱います。

## 7. 演習：分割・逆行列・四点・一ループ

以下では断りのない限りEuclid型の実数積分、$\hbar=1$、$Z(0)$ による規格化を採用します。各問のソースと平均場が異なる変数であることに注意してください。

### 演習 QFT21-A1：独立Gaussianの対数

- Level: A
- 問題：$S(x_1,x_2)=x_1^2+x_2^2/4$ の $\mathcal Z(J_1,J_2)$ と $W$ を求め、$G^{(2)}_{c;12}$、$G^{(2)}_{c;11}$、$G^{(2)}_{c;22}$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$S=(2x_1^2+(1/2)x_2^2)/2$ だから $A=\operatorname{diag}(2,1/2)$ は正定値で、$A^{-1}=\operatorname{diag}(1/2,2)$ です。[Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)で

$$
\mathcal Z=e^{J_1^2/4+J_2^2},\qquad W=J_1^2/4+J_2^2.
$$

$\partial_{J_1}\partial_{J_2}W=0$、$\partial_{J_1}^2W=1/2$、$\partial_{J_2}^2W=2$ です。$\mathcal Z$ だけを一階微分して評価すると交差が零な理由を見落としやすいので、対数による和への分解を確認します。
<!-- solution-end -->

### 演習 QFT21-A2：平均が非零の連結二点

- Level: A
- 問題：$S(x)=a(x-b)^2/2$、$a>0$ とする。$W(J)$、$\phi(J)$、$C(J)$ を求め、$\langle x^2\rangle_{J,c}$ と照合せよ。

<!-- solution-start -->
**詳細解答**

$y=x-b$ と置くとソース項は $J(y+b)$、Gaussian積分の平方完成から

$$
\mathcal Z(J)=e^{bJ+J^2/(2a)},\qquad
W=bJ+\frac{J^2}{2a}.
$$

よって $\phi=b+J/a$、$C=1/a$ です。$y$ のソース付き平均は $J/a$、分散は $1/a$ なので $\langle x^2\rangle_J=(b+J/a)^2+1/a$。これから $\langle x\rangle_J^2$ を引くと $1/a=C$ が残ります。$\langle x^2\rangle_J$ 自体を連結二点と取り違えないことが要点です。
<!-- solution-end -->

### 演習 QFT21-A3：四点の三通りの分割

- Level: A
- 問題：平均零の一変数Gaussianで $\langle x^2\rangle=g>0$ とする。$\langle x^4\rangle$、$G_c^{(4)}$ を求め、四個の位置の二点への分割を全て書け。

<!-- solution-start -->
**詳細解答**

四個のラベルを $1,2,3,4$ とすると二点への分割は $\{12\}|\{34\}$、$\{13\}|\{24\}$、$\{14\}|\{23\}$ の三通りです。[Wick対合公式](../QFT19/index.md#thm-qft19-boson-wick)で各分割の寄与は $g^2$、ゆえに $\langle x^4\rangle=3g^2$。[分割公式](#thm-qft21-moment-cumulant)で $G_c^{(4)}=3g^2-3g^2=0$ です。
<!-- solution-end -->

### 演習 QFT21-A4：一変数のLegendre変換

- Level: A
- 問題：$W(J)=bJ+J^2/(2a)$、$a>0$ に対し $J(\phi)$、$\Gamma(\phi)$ を求め、$\Gamma'(\phi_0)=0$ を確認せよ。

<!-- solution-start -->
**詳細解答**

$\phi=\partial_JW=b+J/a$ より $J=a(\phi-b)$ です。これを $J\phi-W$ に代入して

$$
\begin{aligned}
\Gamma(\phi)&=J(\phi-b)-\frac{J^2}{2a}\\
&=a(\phi-b)^2-\frac a2(\phi-b)^2
=\frac a2(\phi-b)^2.
\end{aligned}
$$

$J=0$ の平均は $\phi_0=b$ で、$\Gamma'(\phi)=a(\phi-b)$ は $\phi_0$ で零です。$\Gamma''=a=(W'')^{-1}$ も成り立ちます。
<!-- solution-end -->

### 演習 QFT21-A5：二次元の逆Hessian

- Level: A
- 問題：$W(J_1,J_2)=(J_1^2+2\rho J_1J_2+J_2^2)/2$、$|\rho|<1$ とする。$C$ と $\Gamma^{(2)}$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$\phi=(J_1+\rho J_2,\rho J_1+J_2)^T$ なので

$$
C=\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix},\qquad
\det C=1-\rho^2>0.
$$

対称行列 $C$ の固有値は $1+\rho,1-\rho$ で、$|\rho|<1$ なら両方正です。逆行列は

$$
\Gamma^{(2)}=C^{-1}
=\frac1{1-\rho^2}\begin{pmatrix}1&-\rho\\-\rho&1\end{pmatrix}.
$$

実際 $CC^{-1}=I_2$ を対角・非対角成分で掛け算して確認できます。$|\rho|=1$ だと逆変換が定義できません。
<!-- solution-end -->

### 演習 QFT21-B1：平均が非零の三点連結相関

- Level: B
- 問題：一変数の $Z(J)$ が三回微分可能で、$m=\langle x\rangle_0$ とする。$W'''(0)=\langle x^3\rangle-3m\langle x^2\rangle+2m^3$ を $W=\log Z-\log Z(0)$ から導け。

<!-- solution-start -->
**詳細解答**

$W'=Z'/Z$、$W''=Z''/Z-(Z'/Z)^2$ です。さらに商の微分を使うと

$$
W'''=\frac{Z'''}Z-\frac{Z''Z'}{Z^2}
-2\frac{Z'}Z\left(\frac{Z''}Z-\frac{(Z')^2}{Z^2}\right)
=\frac{Z'''}Z-3\frac{Z''Z'}{Z^2}+2\frac{(Z')^3}{Z^3}.
$$

$J=0$ では $Z^{(r)}(0)/Z(0)=\langle x^r\rangle_0$ なので主張の式です。平均 $m$ が零でない場合、$W'''=\langle x^3\rangle$ と単純化することはできません。
<!-- solution-end -->

### 演習 QFT21-B2：三点・四点のLegendre微分

- Level: B
- 問題：一変数で $C(J)=W''(J)>0$、$\phi=W'(J)$、$\Gamma'=J$ とする。$W'''=-C^3\Gamma'''$、$W''''=-C^4\Gamma''''+3C^5(\Gamma''')^2$ を、$\partial_J=C\partial_\phi$ から導け。

<!-- solution-start -->
**詳細解答**

$\Gamma''=1/C$ を $\phi$ で微分すると $\Gamma'''=-C^{-2}\,\partial_\phi C$、すなわち $\partial_\phi C=-C^2\Gamma'''$ です。従って

$$
W'''=\partial_J C=C\partial_\phi C=-C^3\Gamma'''.
$$

もう一度 $\partial_J=C\partial_\phi$ を使うと

$$
\begin{aligned}
W''''&=-C\partial_\phi(C^3\Gamma''')\\
&=-C\bigl(3C^2(\partial_\phi C)\Gamma'''+C^3\Gamma''''\bigr)\\
&=-C^4\Gamma''''+3C^5(\Gamma''')^2.
\end{aligned}
$$

途中で $C$ が $\phi$ に依存することを落とすと、三点頂点二個からの項を失います。
<!-- solution-end -->

### 演習 QFT21-B3：Gaussian混合の非零連結四点

- Level: B
- 問題：$b>0$、$g>0$ とする。確率 $1/2$ ずつで平均 $+b$ と $-b$ を持ち、いずれも分散 $g$ の二つのGaussian分布を混合する。$\mathcal Z(J)$、$W(J)$、$W''(0)$、$W''''(0)$ を求め、通常の分布が正でも四点連結相関は負になり得ることを示せ。

<!-- solution-start -->
**詳細解答**

それぞれのGaussianの規格化生成関数は $e^{\pm bJ+gJ^2/2}$ なので、平均を取ると

$$
\mathcal Z(J)=\frac{e^{bJ+gJ^2/2}+e^{-bJ+gJ^2/2}}2
=e^{gJ^2/2}\cosh(bJ).
$$

従って $W=gJ^2/2+\log\cosh(bJ)$ です。$\log\cosh t=t^2/2-t^4/12+O(t^6)$ は $\cosh t=1+t^2/2+t^4/24+O(t^6)$ と $\log(1+u)=u-u^2/2+O(u^3)$ から従います。よって

$$
W(J)=\frac{g+b^2}{2}J^2-\frac{b^4}{12}J^4+O(J^6).
$$

$W''(0)=g+b^2>0$、$W''''(0)=4!(-b^4/12)=-2b^4<0$ です。通常の重みの正値性は共分散の正値性を保証しますが、四点累積量の符号は制限しません。
<!-- solution-end -->

### 演習 QFT21-B4：$\hbar$ 付き自由積分の検算

- Level: B
- 問題：$S(x)=a x^2/2$、$a>0$、$\hbar>0$ の $Z_\hbar(J)$ を計算し、$W_\hbar$、$\operatorname{Cov}_J(x)$、$\Gamma_\hbar$ を求めよ。$W_\hbar''=\operatorname{Cov}_J(x)/\hbar$ を確認せよ。

<!-- solution-start -->
**詳細解答**

平方完成により

$$
-\frac{ax^2/2-Jx}{\hbar}
=-\frac a{2\hbar}(x-J/a)^2+\frac{J^2}{2a\hbar}.
$$

従って $Z_\hbar(J)=\sqrt{2\pi\hbar/a}\,e^{J^2/(2a\hbar)}$、$W_\hbar=\hbar\log[Z_\hbar(J)/Z_\hbar(0)]=J^2/(2a)$。平均は $J/a$、分散は $\hbar/a$ です。$W_\hbar''=1/a=(\hbar/a)/\hbar$ を確認できます。逆に $J=a\phi$ を使えば $\Gamma_\hbar=J\phi-W_\hbar=a\phi^2/2$。自由模型の有効作用には $\phi$ に依存する1ループ補正がなく、[一ループ行列式](#prop-qft21-one-loop-saddle)の $\det S''(\phi)=a$ が定数であることとも一致します。
<!-- solution-end -->

### 演習 QFT21-C1：四次摂動を連結関数から1PIへ通す

- Level: C
- 問題：$S(x)=a x^2/2+\lambda x^4/24$、$a>0$、$\lambda\ge0$ とする。$\lambda$ の一次までで次を導け。

  1. 分散 $1/a$ のGaussianの $x^2,x^4,x^6,x^8$ モーメントを求める。
  2. 規格化分母を含めて $\langle x^2\rangle_\lambda$、$\langle x^4\rangle_\lambda$ を求める。
  3. 偶対称性と分割公式から $W'''(0)=0$、$W''''(0)$ を求める。
  4. $\Gamma''(0)$ と $\Gamma''''(0)$ を求める。
  5. $\lambda<0$ へ同じ積分の結果を無条件で延長できない理由を述べる。

<!-- solution-start -->
**詳細解答**

**(1) 自由モーメント。** 自由生成関数 $e^{J^2/(2a)}=\sum_{k\ge0}J^{2k}/(2^kk!a^k)$ の $J^{2k}$ の係数に $(2k)!$ を掛けると

$$
\langle x^{2k}\rangle_g=\frac{(2k)!}{2^kk!a^k}.
$$

$k=1,2,3,4$ で順に $a^{-1},3a^{-2},15a^{-3},105a^{-4}$ です。

**(2) 分母を含む展開。** $\langle e^{-\lambda x^4/24}\rangle_g=1-\lambda\langle x^4\rangle_g/24+O(\lambda^2)$ です。これを逆数にすると $1+\lambda\langle x^4\rangle_g/24+O(\lambda^2)$ なので

$$
\langle x^r\rangle_\lambda=\langle x^r\rangle_g
-\frac\lambda{24}\left(\langle x^{r+4}\rangle_g
-\langle x^r\rangle_g\langle x^4\rangle_g\right)+O(\lambda^2).
$$

従って $r=2$ では $(15-3)/24=1/2$、$r=4$ では $(105-9)/24=4$ となり、

$$
\langle x^2\rangle_\lambda=a^{-1}-\lambda/(2a^3)+O(\lambda^2),\qquad
\langle x^4\rangle_\lambda=3a^{-2}-4\lambda/a^4+O(\lambda^2).
$$

**(3) 連結四点。** $S$ が偶関数なので $J=0$ の平均と奇数次モーメントが零です。$\mathcal Z(J)$ と $W(J)$ も $J$ の偶関数だから $W'''(0)=0$ です。[分割公式](#thm-qft21-moment-cumulant)より

$$
\begin{aligned}
W''''(0)&=\langle x^4\rangle_\lambda-3\langle x^2\rangle_\lambda^2\\
&=3a^{-2}-4\lambda a^{-4}
-3(a^{-2}-\lambda a^{-4})+O(\lambda^2)
=-\lambda a^{-4}+O(\lambda^2).
\end{aligned}
$$

**(4) 1PIへの変換。** $C=W''(0)=a^{-1}[1-\lambda/(2a^2)+O(\lambda^2)]$ だから

$$
\Gamma''(0)=C^{-1}
=a[1+\lambda/(2a^2)+O(\lambda^2)]
=a+\lambda/(2a)+O(\lambda^2).
$$

[三点・四点の恒等式](#thm-qft21-connected-1pi)では $W'''(0)=0$ より $\Gamma'''(0)=0$ です。従って $\Gamma''''(0)=-W''''(0)/C^4$。$C^4=a^{-4}+O(\lambda)$ を代入すると $\Gamma''''(0)=\lambda+O(\lambda^2)$ です。

**(5) 積分の存在条件。** $\lambda<0$ では実軸上の重み $e^{-ax^2/2+|\lambda|x^4/24}$ は $|x|\to\infty$ で増大し、$Z(0)=\infty$ です。形式的に同じ摂動係数を並べられても、元の正の実数積分としての $W$・$\Gamma$ は定義されません。収束する積分と形式的摂動級数の違いがここで実際に現れます。
<!-- solution-end -->

## 8. まとめと次の問い

$\log\mathcal Z$ の微分は連結相関を作り、Legendre変換 $\Gamma=J\phi-W$ はソースを平均場へ取り替えます。$\Gamma''=C^{-1}$ という逆関係から、連結三点・四点は固有頂点と完全二点関数へ分解できます。四次模型の一次摂動では $W''''(0)=-\lambda/a^4$ ですが、外線を取り除くと $\Gamma''''(0)=\lambda$ です。

ここまでの代数・積分は有限次元で証明しました。次は実際の $\phi^4$ 場で1ループ二点・四点積分を構成し、UV発散・正則化・反項の必要性を調べます。
