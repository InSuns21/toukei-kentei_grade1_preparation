# TSP14 行列積指数と漸近スペクトル：既知の上下界の意味

第7講では行列積をテンソルに変換し、7回の乗算を繰り返すことで通常の三乗より小さい指数を得ました。第12講では漸近階数がスペクトル点の最大値と一致することを示しました。この二つを結ぶと、行列の大きさを変える問題を、一つの小さなテンソルの評価に移せます。上界を改善することと、最良の指数を確定することは別の問題です。

## 1. 行列の大きさと指数

体 $K$ を固定します。[行列積テンソル](../TSP7/index.md#def-tsp7-matrix-multiplication) の正方形の場合を $M_n=M_{n,n,n}$ と略記し、$r(n)=R_K(M_n)$ とします。これは [テンソル階数と双線形複雑性の一致](../TSP7/index.md#thm-tsp7-rank-complexity) によって、二つの入力にそれぞれ線形な式の積を何個用意すれば出力全体を線形結合で再現できるかの最小値です。

[行列積テンソルの基本上下界](../TSP7/index.md#thm-tsp7-matrix-bounds) により $n^2\le r(n)\le n^3$ です。特定の $n$ での最小値を全部求める代わりに、すべての $n$ に共通の増大率を問います。

<a id="def-tsp14-omega"></a>

<!-- formal-statement-start -->
> **定義（行列積指数）**
>
> 体 $K$ 上の正方形行列積の双線形計算に対して、行列積指数を
>
$$
\omega_K=\inf\{s\in\mathbb R:\exists C>0,\ \forall n\ge1,\ r(n)\le C n^s\}
$$
>
> と定める。定数 $C$ は $n$ に依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp14-omega -->
**定義の確認**。通常の三重和による算法では $r(n)\le n^3$ なので $s=3,C=1$ は条件を満たします。

一方、$s<2$ で条件が成り立つなら $n^{2-s}\le C$ が全正整数について必要ですが、左辺は無限大に発散します。

よって集合は空でなく下に有界で、$2\le\omega_K\le3$ です。

下限の定義は $s=\omega_K$ 自身で定数倍の上界が成立するとは主張しません。
<!-- definition-example-end -->

サイズ $a\le b$ なら $a\times a$ 行列を $b\times b$ 行列の左上に零で埋め込み、出力の左上を取り出せます。

テンソルの係数では三因子の基底の添字のどちらかが $a$ を超える項を零へ送り、残りの基底を同名の小さい基底へ送ります。

すると三重和の添字 $i,j,k$ がすべて $a$ 以下の項だけが残り、$M_a$ になります。[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) と[制限による階数・劣階数の評価](../TSP4/index.md#thm-tsp4-restriction-bounds)から $r(a)\le r(b)$ です。

## 2. 一つのサイズを反復する

例えばサイズ2の算法を繰り返すとサイズ $2^q$ が得られます。しかし任意のサイズについて指数を定義した以上、二の冪だけで評価してよい理由が必要です。

<a id="thm-tsp14-omega-rank"></a>

<!-- formal-statement-start -->
> **定理（行列積指数と漸近階数の一致）**
>
> 任意の体 $K$ と整数 $b\ge2$ について
>
$$
\omega_K=\log_b\widetilde R_K(M_b)
=\inf_{n\ge2}\log_n r(n).
$$
<!-- formal-statement-end -->

ここで $\widetilde R_K$ は [漸近階数](../TSP9/index.md#def-tsp9-asymptotic-rank) です。テンソルを繰り返したときの階数の増大率を取ってからサイズの対数へ換算します。

<!-- proof-start -->
### 証明

[行列積テンソルの積と階数評価](../TSP7/index.md#thm-tsp7-product) を $q$ 回適用すると $M_b^{\boxtimes q}\simeq M_{b^q}$ となります。従って [テンソル冪の階数と劣階数の増大率](../TSP9/index.md#thm-tsp9-limit-existence) より

$$
L_b=\widetilde R_K(M_b)
=\lim_{q\to\infty}r(b^q)^{1/q}
=\inf_{q\ge1}r(b^q)^{1/q}.
$$

$b^{2q}\le r(b^q)\le b^{3q}$ なので $b^2\le L_b\le b^3$ です。定義を満たす任意の $s,C$ に対して

$$
r(b^q)^{1/q}\le C^{1/q}b^s.
$$

$q\to\infty$ とすれば $L_b\le b^s$、すべての $s$ について下限を取れば $\log_b L_b\le\omega_K$ です。

逆に任意の $\epsilon>0$ を固定します。下限公式からある $q_0\ge1$ について $r(b^{q_0})^{1/q_0}<b^{\log_b L_b+\epsilon}$ が成立します。$B=b^{q_0}$、$A=r(B)$、$u=\log_B A$ とおけば $u<\log_b L_b+\epsilon$ です。

$n\ge2$ に対して $k=\lceil\log_B n\rceil$ とすると $n\le B^k<Bn$ です。零埋めによる単調性と [直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations) から

$$
r(n)\le r(B^k)\le A^k
=(B^k)^u\le B^u n^u.
$$

$u\ge2$ なのでべきの不等式の向きは保たれます。$n=1$ では $r(1)=1\le B^u$ です。従って $u$ は定義の集合に属し、$\omega_K\le u<\log_b L_b+\epsilon$ です。$\epsilon$ は任意なので逆向きも成立します。

同じ零埋めの議論は任意の整数 $B\ge2$ と $A=r(B)$ に適用できるため $\omega_K\le\log_B r(B)$ です。他方、$B=b^q$ という部分列だけで下限を取ると

$$
\inf_{n\ge2}\log_n r(n)
\le\lim_{q\to\infty}\frac{\log_b r(b^q)}q
=\log_b L_b=\omega_K.
$$

両向きがそろいました。
<!-- proof-end -->

例えば $r(2)\le7$ から $\omega_K\le\log_2 7$ ですが、これは $r(2)=7$ であるかどうかに依存せず成立します。さらに $r(2^q)$ の最小値を使うと、最初に選んだ七項分解を単純に反復する以外の算法も含めて評価できます。

### 加減算の費用も含める

固定したサイズ $B$ の階数分解を一つ取り、$A=r(B)$ とします。入力の線形結合と出力の線形結合に必要な体の演算数を、ブロックの各成分について合計 $c_B$ 以下とします。$B$ を固定しているのでこれは有限の定数です。

ブロック積に同じ分解を再帰適用すると、サイズ $B^k$ の全演算数 $T_k$ は

$$
T_k\le A T_{k-1}+c_B B^{2(k-1)}.
$$

右辺を繰り返し代入すると

$$
T_k\le A^k T_0+c_B\sum_{j=0}^{k-1}A^j B^{2(k-1-j)}
\le A^k T_0+c_B k A^{k-1}.
$$

最後の不等式は $A\ge B^2$ によります。$A=B^2$ の場合でも因子 $k$ はサイズの対数程度であり、任意の正の指数の増分で吸収できます。

従って任意の $\epsilon>0$ について、適切な固定ブロックと零埋めで全体演算数 $O(n^{\omega_K+\epsilon})$ の算法が得られます。

逆方向も、除算を含まない形式的な算術回路（入力変数について多項式恒等式として正しい回路）なら示せます。各中間多項式から左入力、右入力それぞれの次数が $(0,0),(1,0),(0,1),(1,1)$ の成分だけを保持します。積 $fg$ の $(1,1)$ 成分は

$$
(fg)_{11}=f_{00}g_{11}+f_{11}g_{00}
+f_{10}g_{01}+f_{01}g_{10}.
$$

前二項は既に作った双線形成分の定数倍、後二項は左右の線形形式の積です。加減算は新しい積を生みません。

よって $m$ 個の乗算ゲートから生じる新しい双線形積は高々 $2m$ 個で、全出力の $(1,1)$ 成分はその線形結合です。

従って $r(n)\le2m$ となり、この回路モデルの指数は上の定義と一致します。

有限体上でも形式的恒等式を仮定しているため、関数として一致するだけの回路から係数比較を行うという飛躍はありません。

## 3. スペクトル点を使って何が分かるか

三因子テンソルの制限同値類の半環の [三因子テンソルのスペクトル極値公式](../TSP12/index.md#thm-tsp12-three-tensor) は任意の体上で成立しました。そのスペクトルを $\Delta_K$ と書きます。各元は [スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) であり、制限同値類に非負実数を対応させます。

<a id="thm-tsp14-spectrum"></a>

<!-- formal-statement-start -->
> **定理（行列積指数のスペクトル表示と基本上下界）**
>
> 任意の体 $K$ と整数 $b\ge2$ に対して
>
$$
\omega_K=\max_{\phi\in\Delta_K}\log_b\phi([M_b]),
\qquad
2\le\omega_K\le\log_2 7.
$$
>
> 特にすべてのスペクトル点に対して $\phi([M_b])\le b^s$ なら $\omega_K\le s$ であり、一つでも $\phi([M_b])\ge b^s$ の点があれば $\omega_K\ge s$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[三因子テンソルのスペクトル極値公式](../TSP12/index.md#thm-tsp12-three-tensor) により $L_b=\max_{\phi\in\Delta_K}\phi([M_b])$ です。非零テンソルは $D_1$ を制限で得られるため、スペクトル点の単調性と正規化から各値は1以上です。底 $b>1$ の対数は単調増加なので、[行列積指数と漸近階数の一致](#thm-tsp14-omega-rank) へ代入すると最大値を対数の内から外へ移せます。

[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) を第1因子に対して使います。

行 $(i,j)$ には列 $(b^{jk},E_{ik})$ が非零として現れ、異なる行は同じ非零列を持ちません。

$k=1$ の列を選べば各行の独立性を確認できるので、そのスペクトル点の値は $b^2$ です。

最大値は少なくともこれ以上であり、$\log_b b^2=2$ です。

一方 [Strassenの7回乗算による上界](../TSP7/index.md#thm-tsp7-strassen) によって $r(2)\le7$ です。第2節の公式で $b=2$ とし $\widetilde R_K(M_2)\le r(2)$ を用いれば上界を得ます。最後の二つの主張は最大値の定義にそれぞれ全称条件と存在条件を代入して従います。
<!-- proof-end -->

例えば $M_2$ について三つの一因子平坦化の値はすべて4です。三つの点を評価して最大値4を得ても、スペクトル全体の最大値が4であることは示していません。

また、[台エントロピーによる漸近劣階数の上界](../TSP13/index.md#thm-tsp13-subrank-bound) は、最大値で表される漸近階数ではなく漸近劣階数の評価です。上側support functionalの劣乗法性を、スペクトル点の乗法性と置き換えることもできません。最小値についての評価を最大値の上界として用いると、論証の向きが壊れます。

## 4. 研究上の上下界を読む

この講で証明した範囲では $2\le\omega_K\le\log_2 7$ です。これより強い評価では、複雑なテンソルの退化、直和の構造、スペクトル点の評価などを組み合わせます。有限サイズでの乗算回数の削減、漸近指数の上界、一般の算法すべてに対する下界は、それぞれ別の主張です。

- 2024年の [More Asymmetry Yields Faster Matrix Multiplication](https://arxiv.org/abs/2404.16349) は $\omega<2.371339$ を報告しました。2026年8月の [Improving the matrix multiplication exponent with modern optimization and AlphaEvolve](https://arxiv.org/abs/2608.16884) はさらに $\omega<2.371177$ を報告しました。
- 2026年10月2日の [An Upper Bound of 9/4 for the Matrix Multiplication Exponent](https://github.com/openai/math/tree/main/preprints/Matrix-Multiplication-Nine-Fourths-October-2-2026) は複素数体上で $\omega_{\mathbb C}\le9/4$ を主張します。11月6日公開の [Tensor value and the 9/4 bound for matrix multiplication](https://arxiv.org/abs/2611.09716) は任意の体での上界の解説を与えています。
- 2026年11月24日の [The matrix multiplication exponent is nine fourths](https://github.com/openai/math/tree/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026) は任意の体で $\omega_K=9/4$ と主張する新しいプレプリントです。上界に加えて一般の算法への下界が必要で、ここではその証明の妥当性や独立検証の完了を確定しません。

仮に最後の主張が成立すれば、上の定理から $\max_{\phi\in\Delta_K}\phi([M_2])=2^{9/4}$ となります。上界だけではこの等号は得られません。新しい下界の証明がどのように全算法を対象にしているかが核心です。

これらは発表時点の文献案内です。本講の証明は新しい主張の真偽に依存しません。指数は定数係数、有限精度の丸め、メモリ転送量などを評価するものでもありません。

## 5. 演習

### Level A

<a id="ex-tsp14-a01"></a>

#### TSP14-A01 既知の分解から指数
- Level: A
- ID: TSP14-A01

ある体で $r(4)\le49$ と分かっている。指数の上界を求めよ。

<!-- solution-start -->
##### 詳細解答

[行列積指数と漸近階数の一致](#thm-tsp14-omega-rank) の下限表示に $n=4$ を代入する。

$$
\omega_K\le\log_4 r(4)\le\log_4 49
=\frac{2\log 7}{2\log 2}=\log_2 7.
$$

サイズ2を二回反復した場合と同じ指数である。
<!-- solution-end -->

<a id="ex-tsp14-a02"></a>

#### TSP14-A02 指数から階数へ
- Level: A
- ID: TSP14-A02

仮に $\omega_K=5/2$ なら $M_4$ の漸近階数はいくらか。通常の階数も等しいといえるか。

<!-- solution-start -->
##### 詳細解答

[行列積指数と漸近階数の一致](#thm-tsp14-omega-rank) を底4で用いると $\log_4\widetilde R_K(M_4)=5/2$ なので

$$
\widetilde R_K(M_4)=4^{5/2}=(2^2)^{5/2}=32.
$$

漸近階数は通常の階数以下なので $r(4)\ge32$ は従う。しかし有限サイズでその下界を達成する分解は、この等式から得られない。
<!-- solution-end -->

<a id="ex-tsp14-a03"></a>

#### TSP14-A03 平坦化の値
- Level: A
- ID: TSP14-A03

$M_3$ の第2因子に対する平坦化の階数を、非零列を使って求め、指数の下界に変換せよ。

<!-- solution-start -->
##### 詳細解答

行は $(j,k)$ の9通り、列は第1・第3因子の基底の組である。

行 $(j,k)$ で $i=1$ に対応する列 $(a^{1j},E_{1k})$ は係数1を持つ。

この列が別の行に現れるには $j,k$ がともに一致しなければならないので、9本の行は独立である。階数は9。

[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) と [行列積指数のスペクトル表示と基本上下界](#thm-tsp14-spectrum) により $\omega_K\ge\log_3 9=2$。
<!-- solution-end -->

<a id="ex-tsp14-a04"></a>

#### TSP14-A04 上界の量化
- Level: A
- ID: TSP14-A04

あるスペクトル点が $\phi([M_2])=5$ を満たすと仮定する。指数のどちら側の評価が得られるか。

<!-- solution-start -->
##### 詳細解答

[行列積指数のスペクトル表示と基本上下界](#thm-tsp14-spectrum) は最大値を取るので

$$
\omega_K=\max_{\psi\in\Delta_K}\log_2\psi([M_2])
\ge\log_2 5.
$$

これは下界である。他の点が5より大きい値を取る可能性を除いていないため、上界にはならない。
<!-- solution-end -->

### Level B

<a id="ex-tsp14-b01"></a>

#### TSP14-B01 零埋めと定数
- Level: B
- ID: TSP14-B01

仮に $r(3)\le20$ とする。任意の $n\ge1$ に対し定数20を使った階数上界を導け。

<!-- solution-start -->
##### 詳細解答

$n\ge2$ で $k=\lceil\log_3 n\rceil$ と置けば $n\le3^k<3n$。零埋めで $r(n)\le r(3^k)$ であり、[行列積テンソルの積と階数評価](../TSP7/index.md#thm-tsp7-product) と階数の劣乗法性から $r(3^k)\le20^k$ である。$s=\log_3 20>0$ とすれば

$$
20^k=(3^k)^s<(3n)^s=20n^s.
$$

$n=1$ でも $r(1)=1\le20$ なので全サイズで成立する。仮定の下で $\omega_K\le s$ である。
<!-- solution-end -->

<a id="ex-tsp14-b02"></a>

#### TSP14-B02 二次の費用と対数
- Level: B
- ID: TSP14-B02

ある固定サイズ $B\ge2$ の再帰算法が $T_k\le B^2 T_{k-1}+c B^{2(k-1)}$ を満たすと仮定する。全演算数を評価せよ。

<!-- solution-start -->
##### 詳細解答

両辺を $B^{2k}$ で割り $U_k=T_k/B^{2k}$ とおくと

$$
U_k\le U_{k-1}+c/B^2.
$$

$k$ 回足して $U_k\le T_0+kc/B^2$。従って $n=B^k$ なら

$$
T_k\le n^2(T_0+(c/B^2)\log_B n).
$$

任意の $\epsilon>0$ について $kB^{-k\epsilon}$ は有界である。

実際、隣接項の比は $(1+1/k)B^{-\epsilon}$ であり、十分大きな $k$ では1より小さい定数以下になる。

よって $T_k=O(n^{2+\epsilon})$。零埋めで任意サイズへ拡張できる。指数2と厳密な $O(n^2)$ は区別する必要がある。
<!-- solution-end -->

<a id="ex-tsp14-b03"></a>

#### TSP14-B03 算術回路の双線形成分
- Level: B
- ID: TSP14-B03

$f=1+x_1+y_1+x_2y_2$、$g=2+x_2+y_2+x_1y_1$ とする。積の左入力・右入力それぞれについて次数1の成分を求め、新しい双線形積を識別せよ。

<!-- solution-start -->
##### 詳細解答

$f_{00}=1,g_{00}=2$、$f_{10}=x_1,g_{10}=x_2$、$f_{01}=y_1,g_{01}=y_2$、$f_{11}=x_2y_2,g_{11}=x_1y_1$ である。二つの次数が各1となる組だけを足すと

$$
(fg)_{11}=x_1y_1+2x_2y_2+x_1y_2+x_2y_1.
$$

最初の二項は既存の双線形成分の定数倍であり、後二項が新しい線形形式の積である。標数2でも係数2が零になるだけで式は成立する。
<!-- solution-end -->

### Level C

<a id="ex-tsp14-c01"></a>

#### TSP14-C01 スペクトルによる指数確定の条件
- Level: C
- ID: TSP14-C01

ある体で、すべての $\phi\in\Delta_K$ に対して $\phi([M_4])\le 16\sqrt2$ が証明され、一つの点 $\phi_*$ について $\phi_*([M_2])\ge2^{9/4}$ が証明されたと仮定する。両条件から指数を確定できるか検討せよ。

<!-- solution-start -->
##### 詳細解答

$16\sqrt2=2^{9/2}$ なので、[行列積指数のスペクトル表示と基本上下界](#thm-tsp14-spectrum) から

$$
\omega_K\le\log_4(2^{9/2})=9/4.
$$

他方、存在条件をサイズ2で適用すると $\omega_K\ge\log_2(2^{9/4})=9/4$ である。従って仮定が両方成立すれば $\omega_K=9/4$ となる。

サイズの整合も確認する。[行列積テンソルの積と階数評価](../TSP7/index.md#thm-tsp7-product) より $M_4\simeq M_2^{\boxtimes2}$。[スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) は乗法的なので

$$
\phi_*([M_4])=\phi_*([M_2])^2
\ge(2^{9/4})^2=2^{9/2}=16\sqrt2.
$$

全称上界と合わせて等号が成り立つ。下界の仮定を外せば最大値がこれより小さい可能性が残る。上界を有限個の点での確認に弱めれば未確認の点が大きい可能性が残る。これは二つの条件の役割を検査する仮想例であり、新しいスペクトル点を構成したわけではない。
<!-- solution-end -->

## 6. 次講への接続

今回は三因子の局所線形写像を固定して比較しました。次講では因子をまとめる操作がどの情報を保持し、どの制限の条件を変えるかを調べます。
