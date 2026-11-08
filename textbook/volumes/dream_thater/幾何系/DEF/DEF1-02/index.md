# DEF1-02 Beltrami微分と接束値形式

<!-- definition-example-audit: strict -->

## 1. 複素構造の変化を、固定した滑らかな多様体上で見る

前章の[変形族とKodaira–Spencer写像](../DEF1-01/index.md#def-def1-01-kodaira-spencer)では、実際の正則な族から接束値Dolbeault類を得た。ところが、局所的な座標を替えると、その類の代表を表す係数も変わる。「係数の配列」ではなく**何が幾何学的な対象なのか**を確かめたい。

複素多様体 $X$ の複素次元を $n$ とする。[複素接束の型分解](../../CM/CM1-05/index.md#def-cm1-05-holomorphic-tangent-section)により、複素化した接束には正則方向 $T^{1,0}X$ と反正則方向 $T^{0,1}X$ がある。正則座標 $z=(z^1,\ldots,z^n)$ では、それぞれ $\partial_{z^i}$ と $\partial_{\bar z^j}$ が局所枠となる。反正則方向の余接枠は $d\bar z^j$ である。

滑らかな $(0,1)$ 形式の「値」を複素接ベクトルにしたものが、今回使う接束値形式である。これは反正則接ベクトルを正則接ベクトルへ移す、複素線形な束写像としても読める。

<a id="def-def1-02-tangent-valued-form"></a>

<!-- formal-statement-start -->
> **定義（接束値$(0,1)$形式）**
>
> $X$ を複素次元 $n$ の複素多様体とする。$T^{1,0}X$ に値を取る滑らかな $(0,1)$ 形式とは、滑らかな切断

$$
\phi\in\mathcal A^{0,1}(X,T^{1,0}X)
=\Gamma\!\left(X,(T^{0,1}X)^*\otimes T^{1,0}X\right)
$$

> である。したがって各点 $x$ で $\phi_x:T_x^{0,1}X\to T_x^{1,0}X$ は複素線形である。正則座標では、滑らかな係数関数 $\phi^i_{\bar j}$ を用いて

$$
\phi=\sum_{i,j=1}^n\phi^i_{\bar j}\,d\bar z^j\otimes\partial_{z^i},
\qquad
\phi(\partial_{\bar z^j})=\sum_i\phi^i_{\bar j}\partial_{z^i}
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-02-tangent-valued-form -->
**定義の確認**。$X=\mathbb C^2$ の標準座標で

$$
\phi=2\,d\bar z^1\otimes\partial_{z^2}
-i\,d\bar z^2\otimes\partial_{z^1}
$$

と置く。係数 $2,-i$ は滑らかで、任意の $a,b\in\mathbb C$ に対して

$$
\phi(a\partial_{\bar z^1}+b\partial_{\bar z^2})
=-ib\partial_{z^1}+2a\partial_{z^2}
$$

である。入力は反正則接方向、出力は正則接方向で、$a,b$ に複素線形であることを確認できた。係数が大きくても**形式としては**正しく定義される。ただし、それが新しい複素構造を与えるかは別の条件である。
<!-- definition-example-end -->

## 2. 座標を替えたとき、成分はどのように変わるか

正則座標を $w^a=f^a(z)$ に替え、正則Jacobian行列 $J^a{}_i=\partial f^a/\partial z^i$ が可逆であるとする。[正則接枠の変換則](../../CM/CM1-05/index.md#thm-cm1-05-frame-change)を適用すると

$$
\partial_{z^i}=\sum_a J^a{}_i\partial_{w^a},
\qquad
d\bar z^j=\sum_b\overline{(J^{-1})^j{}_b}\,d\bar w^b.
$$

ここで後者は $d\bar w^b=\sum_j\overline{J^b{}_j}\,d\bar z^j$ を逆に解いたものである。両式を[接束値形式の定義](#def-def1-02-tangent-valued-form)へ代入する。

<a id="prop-def1-02-coordinate-change"></a>

<!-- formal-statement-start -->
> **命題（接束値$(0,1)$形式の座標変換）**
>
> 複素多様体 $X$ 上の $\phi\in\mathcal A^{0,1}(X,T^{1,0}X)$ を、重なる正則座標 $z,w=f(z)$ でそれぞれ係数 $\phi^i_{\bar j}$、$\phi'{}^a_{\bar b}$ により表す。$J^a{}_i=\partial f^a/\partial z^i$ とすると、両表示が同一の束写像を表すことと

$$
\phi'{}^a_{\bar b}
=\sum_{i,j}J^a{}_i\,\phi^i_{\bar j}
\,\overline{(J^{-1})^j{}_b}
$$

> は同値である。行列表示では $\Phi'=J\Phi\,\overline{J}^{\,-1}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

出力の正則ベクトル成分には $J$、入力の反正則余接成分には $\overline J^{-1}$ が掛かる。どちらか一方だけを掛けると同じ束写像にはならない。

<!-- proof-start -->
### 証明

上記二つの枠変換を代入し、和の順序を取り替えると

$$
\begin{aligned}
\phi
&=\sum_{i,j}\phi^i_{\bar j}
\left(\sum_b\overline{(J^{-1})^j{}_b}\,d\bar w^b\right)
\otimes\left(\sum_aJ^a{}_i\partial_{w^a}\right)\\
&=\sum_{a,b}\left(\sum_{i,j}J^a{}_i\phi^i_{\bar j}
\overline{(J^{-1})^j{}_b}\right)d\bar w^b\otimes\partial_{w^a}.
\end{aligned}
$$

$d\bar w^b\otimes\partial_{w^a}$ は各点でテンソル積の基底だから係数は一意であり、必要性を得る。逆にこの式で係数を取り替えれば展開した束写像が等しいので十分性も成り立つ。$J$ が正則かつ可逆であることは、両枠の変換に必要である。$\square$
<!-- proof-end -->

**二つの座標による実検算。** $\mathbb C$ 上で $w=2z$ とし、$\phi=c\,d\bar z\otimes\partial_z$ とする。$J=2$ より $\phi'=2c\overline{(1/2)}=c$。実際、$d\bar z=\frac12d\bar w$ と $\partial_z=2\partial_w$ が相殺する。複素数 $a\ne0$ に対する $w=az$ なら $\phi'=a c/\bar a$ となる。数値としての係数が不変とは限らず、**テンソル全体**が不変である。

## 3. Beltrami微分が反正則方向を傾ける

もとの複素構造は、各点の $T^{0,1}X$ を指定すれば取り戻せる。そこへ $\phi(\bar v)$ を足し、反正則方向を正則方向へ少し傾ける。こうしてできるグラフが複素構造の候補になる。

<a id="def-def1-02-beltrami-graph"></a>

<!-- formal-statement-start -->
> **定義（Beltrami微分と変形した反正則分布）**
>
> 複素多様体 $X$ の $\phi\in\mathcal A^{0,1}(X,T^{1,0}X)$ をBeltrami微分と呼ぶ。各点 $x\in X$ で、そのグラフ

$$
T^{0,1}_{\phi,x}
=\{\bar v+\phi_x(\bar v):\bar v\in T^{0,1}_xX\}
$$

> を変形した反正則方向の候補とする。正則座標ではこのグラフは $n$ 本のベクトル場

$$
D_{\bar j}=\partial_{\bar z^j}
+\sum_i\phi^i_{\bar j}\partial_{z^i}
\quad (1\le j\le n)
$$

> で張られる。グラフがその複素共役と直和になり、かつLie括弧で閉じるとき、積分可能な複素構造の反正則分布を与える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-02-beltrami-graph -->
**定義の確認**。$X=\mathbb C$、$\phi=c\,d\bar z\otimes\partial_z$（$c\in\mathbb C$）なら $T^{0,1}_\phi$ は $D=\partial_{\bar z}+c\partial_z$ の複素線形包である。実際、$\phi(a\partial_{\bar z})=ac\partial_z$ より、グラフの元は $aD$ と尽くされる。共役の分布は $\bar D=\partial_z+\bar c\partial_{\bar z}$ で、両者の係数行列の行列式は $1-|c|^2$。$|c|<1$ なら直和である。定数係数なので $[D,D]=0$ で、Lie括弧の閉性も満たす。
<!-- definition-example-end -->

<a id="prop-def1-02-small-graph"></a>

<!-- formal-statement-start -->
> **命題（小さいBeltrami微分の横断性）**
>
> $X$ を複素多様体とし、$X$ のHermitian計量で各点の束写像 $\phi_x:T_x^{0,1}X\to T_x^{1,0}X$ の作用素ノルムが $1$ 未満とする。このとき各点で

$$
T^{0,1}_{\phi,x}\cap\overline{T^{0,1}_{\phi,x}}=\{0\},
\qquad
T_{\mathbb C,x}X
=T^{0,1}_{\phi,x}\oplus\overline{T^{0,1}_{\phi,x}}.
$$

> 従ってグラフは滑らかなほとんど複素構造を定める。ただしLie括弧についての可積分性は別条件である。
<!-- formal-statement-end -->

### 証明の見取り図

両グラフの交わりに属するベクトルを二通りに書くと、反正則成分 $\bar v$ は $\bar v=\bar\phi\phi(\bar v)$ を満たす。$\|\bar\phi\phi\|<1$ では零しか解がない。

<!-- proof-start -->
### 証明

各点の複素化接空間は、元の分解 $T^{1,0}\oplus T^{0,1}$ を持つ。$u$ が二つのグラフに属すると仮定して

$$
u=\bar v+\phi(\bar v)=v'+\bar\phi(v')
$$

と書く。ここで $\bar v\in T^{0,1}$、$v'\in T^{1,0}$、$\bar\phi:T^{1,0}\to T^{0,1}$ は $\phi$ の共役写像である。元の型分解の一意性から $v'=\phi(\bar v)$ と $\bar v=\bar\phi(v')$。従って

$$
\|\bar v\|\le\|\bar\phi\|\,\|\phi\|\,\|\bar v\|
=\|\phi\|^2\|\bar v\|<\|\bar v\|
$$

は $\bar v\ne0$ なら矛盾する。交わりが零である。両グラフは複素次元 $n$ で、合わせて $2n$ 次元だから直和が全接空間となる。共役で入れ替わる直和分解は実接空間上の $J^2=-\mathrm{id}$ を持つ滑らかなほとんど複素構造を定める。Lie括弧の閉性はこの次元計算からは導けない。$\square$
<!-- proof-end -->

**座標独立性の確認。** [座標変換命題](#prop-def1-02-coordinate-change)を使うと、$D_{\bar j}$ を $w$ 座標に直したとき

$$
D_{\bar j}
=\sum_b\overline{J^b{}_j}
\left(\partial_{\bar w^b}
+\sum_a\phi'{}^a_{\bar b}\partial_{w^a}\right).
$$

右辺の $\overline J$ は可逆なので、張る分布は同じである。小さいという数値条件は選んだ計量についての十分条件だが、グラフの直和性そのものは座標を替えても同じ性質である。

## 4. 正則座標の方程式を直接解く

新しい複素構造での局所正則関数 $w$ は、変形した反正則方向から微分すると零になる。これは[正則関数のCauchy–Riemann条件](../../CM/CM1-02/index.md#def-cm1-02-holomorphic-map)を新しい分布で書き直したものだ。

<a id="prop-def1-02-beltrami-equation"></a>

<!-- formal-statement-start -->
> **命題（Beltrami方程式による局所正則座標の判定）**
>
> $X$ を複素次元 $n$ の複素多様体、$\phi\in\mathcal A^{0,1}(X,T^{1,0}X)$ とし、$T^{0,1}_\phi$ とその共役が直和であるとする。滑らかな複素値関数 $w^1,\ldots,w^n$ が局所座標を与え、新しい構造の正則座標となるための条件は、実Jacobianが可逆で、全ての $a,j$ について

$$
D_{\bar j}w^a
=\partial_{\bar z^j}w^a
+\sum_i\phi^i_{\bar j}\partial_{z^i}w^a=0
$$

> が成り立つことである。ここではこの方程式をBeltrami方程式と呼ぶ。
<!-- formal-statement-end -->

### 証明の見取り図

実Jacobianが可逆なら $w$ は局所的な実座標である。$D_{\bar j}w^a=0$ は各 $D_{\bar j}$ が $w$ 座標の $\partial_{\bar w^a}$ 方向に入ることを意味する。双方の複素次元が $n$ なので分布が一致する。

<!-- proof-start -->
### 証明

実逆関数定理により、可逆な実Jacobianを持つ $w=(w^1,\ldots,w^n)$ は局所実微分同相となる。複素化接空間の $w$ 座標では、任意のベクトル $V$ の $\partial_{w^a}$ 成分は $V(w^a)$ である。ゆえに $D_{\bar j}w^a=0$ は全 $a$ で $D_{\bar j}$ の正則成分が零という意味になる。

このとき $D_{\bar j}$ は $w$ 座標の $\partial_{\bar w^a}$ による $n$ 次元の空間に含まれる。$D_{\bar j}$ は元の $\partial_{\bar z^j}$ 成分が単位行列なので一次独立であり、包含は等号となる。逆に $w$ がその複素構造の正則座標なら $\partial_{\bar w^a}w^b=0$ なので条件を満たす。$\square$
<!-- proof-end -->

**一次元の厳密な例。** $c\in\mathbb C$、$|c|<1$ を定数とし、$w=z-c\bar z$ と置く。$\partial_z w=1$、$\partial_{\bar z}w=-c$ なので

$$
(\partial_{\bar z}+c\partial_z)w=-c+c=0.
$$

さらに $z=x+iy$ の実線形写像 $w=z-c\bar z$ の実Jacobianは $1-|c|^2>0$ である。よって $w$ は実座標として可逆で、新しい正則座標を与える。$|c|=1$ ではJacobianが零となり、この構成では座標にならない。単に微分方程式を満たすだけでは十分でないことが分かる。

## 5. 実際の族から係数を抽出し、一次閉条件を調べる

前章の楕円曲線族を、[Kodaira–Spencer類のDolbeault表示](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)と照合する。$z=x+iy$ を固定した滑らかなトーラス座標とし、変化後の正則座標を $w=z+t y$ と置いた。$y=(z-\bar z)/(2i)$ により

$$
\partial_z w=1+\frac{t}{2i},\qquad
\partial_{\bar z}w=-\frac{t}{2i}.
$$

[Beltrami方程式](#prop-def1-02-beltrami-equation)の $D_{\bar z}w=0$ を解くと

$$
\mu(t)=\frac{t}{2i+t},\qquad
\mu(0)=0,\qquad
\left.\frac{d\mu}{dt}\right|_0=\frac1{2i}.
$$

$t$ が十分小さければ $|\mu(t)|<1$ だから[グラフ横断性](#prop-def1-02-small-graph)が使える。ここで $t$ は**族の複素パラメータ**、$\mu(t)$ は各ファイバーの反正則方向を指定する係数である。$\mu(t)$ 自体と、一次係数 $\alpha=(1/(2i))d\bar z\otimes\partial_z$ は混同しない。

複素次元 $n>1$ では、任意の小さな $\phi$ が複素構造を作るわけではない。少なくとも実際の可積分な族から出る一次係数には閉条件がある。固定した中心の複素構造に沿う[接束値Dolbeault微分](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)を $\bar\partial_T$ と書く。正則接枠における係数微分は

$$
\bar\partial_T\alpha
=\sum_{i,j<k}\left(
\partial_{\bar z^j}\alpha^i_{\bar k}
-\partial_{\bar z^k}\alpha^i_{\bar j}
\right)d\bar z^j\wedge d\bar z^k\otimes\partial_{z^i}.
$$

<a id="prop-def1-02-linear-integrability"></a>

<!-- formal-statement-start -->
> **命題（実際の複素構造族の一次閉条件）**
>
> $X$ を複素次元 $n$ の複素多様体とし、$t$ を零近傍の実または複素パラメータとする。$\phi(t)\in\mathcal A^{0,1}(X,T^{1,0}X)$ が $t$ に関して滑らかで $\phi(0)=0$、$\phi(t)=t\alpha+O(t^2)$ と展開できるとする。各 $t$ のグラフ $T^{0,1}_{\phi(t)}$ が可積分であるなら

$$
\bar\partial_T\alpha=0.
$$

> 逆にこの閉条件だけで、与えられた $\alpha$ が実際の変形族へ延長するとは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

グラフを張る二本の反正則ベクトル場のLie括弧は正則方向にしか成分を持たない。可積分なら、その括弧はグラフにも入るので零である。一次の係数を比較すると $\bar\partial_T\alpha=0$ となる。

<!-- proof-start -->
### 証明

正則座標で $D_{\bar j}(t)=\partial_{\bar z^j}+\sum_i\phi^i_{\bar j}(t)\partial_{z^i}$ と置く。座標ベクトル場同士は可換だから、Lie括弧を係数の微分で展開すると

$$
\begin{aligned}
[D_{\bar j}(t),D_{\bar k}(t)]
=\sum_i\bigg(&\partial_{\bar z^j}\phi^i_{\bar k}
-\partial_{\bar z^k}\phi^i_{\bar j}\\
&+\sum_\ell\bigl(\phi^\ell_{\bar j}\partial_{z^\ell}\phi^i_{\bar k}
-\phi^\ell_{\bar k}\partial_{z^\ell}\phi^i_{\bar j}\bigr)\bigg)\partial_{z^i}.
\end{aligned}
$$

括弧には元の $\partial_{\bar z^i}$ 成分がない。一方、グラフ内のベクトルで反正則成分が零なら、グラフ写像の定義からベクトル全体が零である。従って可積分性（Lie括弧での閉性）から上の係数は全て零となる。$\phi^i_{\bar j}=t\alpha^i_{\bar j}+O(t^2)$ を代入すると、最後の積の項は $O(t^2)$。$t$ の一次係数を比較して

$$
\partial_{\bar z^j}\alpha^i_{\bar k}
-\partial_{\bar z^k}\alpha^i_{\bar j}=0
\quad(i,j,k=1,\ldots,n)
$$

を得る。これは上の $\bar\partial_T\alpha$ の各成分が零であることと同値である。ここでは必要条件だけを導いた。$\square$
<!-- proof-end -->

**条件が破れる直接例。** $\mathbb C^2$ で $\alpha=\bar z^1d\bar z^2\otimes\partial_{z^1}$ とする。すると

$$
\bar\partial_T\alpha
=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}\ne0.
$$

従ってこの $\alpha$ は中心の複素構造から始まる可積分な族の一次係数にはなれない。複素次元1では $(0,2)$ 形式が零なので一次閉条件は自動的だが、それは大域的な族の存在を自動保証するという意味ではない。一次変形を閉形式の類として分類する結果は[既習の定理](../../CYG/CYG1-12/index.md#thm-cyg1-12-first-order-classification)へ接続する。二次以上の非線形条件は次章で導く。

## 6. 演習――局所係数、グラフ、一次条件をつなぐ

<a id="ex-def1-02-a01"></a>
#### DEF1-02-A01 線形写像として係数を読む
- Level: A

$\mathbb C^2$ で $\phi=3d\bar z^1\otimes\partial_{z^2}-d\bar z^2\otimes\partial_{z^1}$ とする。$\phi(2\partial_{\bar z^1}+i\partial_{\bar z^2})$ を求めよ。

<!-- solution-start -->
**詳細解答。** $d\bar z^j(\partial_{\bar z^k})=\delta^j_k$ から、$\phi(\partial_{\bar z^1})=3\partial_{z^2}$、$\phi(\partial_{\bar z^2})=-\partial_{z^1}$。複素線形性を使って

$$
\phi(2\partial_{\bar z^1}+i\partial_{\bar z^2})
=2(3\partial_{z^2})+i(-\partial_{z^1})
=-i\partial_{z^1}+6\partial_{z^2}.
$$

反正則入力と正則出力の添字を逆にしない。
<!-- solution-end -->

<a id="ex-def1-02-a02"></a>
#### DEF1-02-A02 複素座標の回転で係数を変換する
- Level: A

$\mathbb C$ 上の $\phi=c\,d\bar z\otimes\partial_z$ を、$w=iz$ で書き直せ。

<!-- solution-start -->
**詳細解答。** $J=i$、$J^{-1}=1/i=-i$ である。[座標変換命題](#prop-def1-02-coordinate-change)から

$$
\phi'=i\,c\,\overline{-i}=ic\cdot i=-c.
$$

直接にも $d\bar w=-i\,d\bar z$ から $d\bar z=i\,d\bar w$、$\partial_z=i\partial_w$ なので、$\phi=-c\,d\bar w\otimes\partial_w$。係数の符号が変わっても束写像は同じである。
<!-- solution-end -->

<a id="ex-def1-02-a03"></a>
#### DEF1-02-A03 定数Beltrami方程式
- Level: A

$|c|<1$ の定数 $c\in\mathbb C$ に対し $D=\partial_{\bar z}+c\partial_z$ とする。$w=z-c\bar z$ が $Dw=0$ を満たすことと、実座標変換が可逆であることを示せ。

<!-- solution-start -->
**詳細解答。** $\partial_{\bar z}z=0$、$\partial_{\bar z}\bar z=1$、$\partial_z z=1$、$\partial_z\bar z=0$ なので

$$
Dw=-c+c\cdot1=0.
$$

$w=z-c\bar z$ と $\bar w=\bar z-\bar c z$ の係数行列は $\begin{pmatrix}1&-c\\-\bar c&1\end{pmatrix}$ で、行列式 $1-|c|^2>0$。従って実線形写像として可逆であり、[局所正則座標の判定](#prop-def1-02-beltrami-equation)を満たす。
<!-- solution-end -->

<a id="ex-def1-02-a04"></a>
#### DEF1-02-A04 一次元と二次元の閉条件の違い
- Level: A

$\mathbb C^2$ で $\alpha=\bar z^2d\bar z^1\otimes\partial_{z^2}$ とし、$\bar\partial_T\alpha$ を求めよ。複素次元1の接束値$(0,1)$形式には何が起きるか。

<!-- solution-start -->
**詳細解答。** $\bar\partial(\bar z^2)=d\bar z^2$ なので、外積の順序を保持して

$$
\bar\partial_T\alpha=d\bar z^2\wedge d\bar z^1\otimes\partial_{z^2}
=-d\bar z^1\wedge d\bar z^2\otimes\partial_{z^2}\ne0.
$$

複素次元1では交代的な $(0,2)$ 形式が零であり、どの接束値$(0,1)$形式も $\bar\partial_T$-閉となる。二次元では係数の反正則偏微分が閉性を制約する。
<!-- solution-end -->

<a id="ex-def1-02-b01"></a>
#### DEF1-02-B01 非対角座標変換とグラフの整合
- Level: B

$\mathbb C^2$ 上で $w^1=z^1+z^2$、$w^2=z^2$ とし、$\phi=d\bar z^2\otimes\partial_{z^1}$ とする。$w$ 座標の係数行列 $\Phi'$ を計算し、$D_{\bar z^2}$ を $w$ 座標で書いてグラフの一致を確認せよ。

<!-- solution-start -->
**詳細解答。** 行列は $J=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$J^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$、$\Phi=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ である。係数は実数なので共役を外せて

$$
J\Phi=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
\Phi'=J\Phi J^{-1}=\begin{pmatrix}0&1\\0&0\end{pmatrix}.
$$

一方 $\partial_{\bar z^2}=\partial_{\bar w^1}+\partial_{\bar w^2}$、$\partial_{z^1}=\partial_{w^1}$ だから

$$
D_{\bar z^2}=\partial_{\bar z^2}+\partial_{z^1}
=(\partial_{\bar w^1})+(\partial_{\bar w^2}+\partial_{w^1})
=D'_{\bar w^1}+D'_{\bar w^2}.
$$

$D_{\bar z^1}=D'_{\bar w^1}$ も成り立つので、二つの枠が張るグラフは同一である。係数行列がたまたま等しいことではなく、枠変換まで確認した。
<!-- solution-end -->

<a id="ex-def1-02-b02"></a>
#### DEF1-02-B02 滑らかな座標の移動からBeltrami係数を作る
- Level: B

$U\subset\mathbb C$ を開集合、$h:U\to\mathbb C$ を滑らかな関数、$t\in\mathbb R$ を小さいパラメータとする。$w_t=z+t h(z,\bar z)$ が実局所座標であるとして、$D_t=\partial_{\bar z}+\mu(t)\partial_z$ が $D_tw_t=0$ を満たす係数を求め、$t=0$ の一次係数を計算せよ。

<!-- solution-start -->
**詳細解答。** $t$ を固定して微分すると

$$
\partial_{\bar z}w_t=t\partial_{\bar z}h,\qquad
\partial_z w_t=1+t\partial_z h.
$$

後者は $t=0$ で1なので、$t$ が十分小さいと零にならない。Beltrami方程式から

$$
0=t\partial_{\bar z}h+\mu(t)(1+t\partial_z h),
\qquad
\mu(t)=-\frac{t\partial_{\bar z}h}{1+t\partial_z h}.
$$

従って $\mu(0)=0$ で、分母が1へ収束することから $\mu'(0)=-\partial_{\bar z}h$。特に $h=(z-\bar z)/(2i)$ なら $\partial_{\bar z}h=-1/(2i)$ なので、楕円曲線の例の $1/(2i)$ と符号が一致する。
<!-- solution-end -->

<a id="ex-def1-02-b03"></a>
#### DEF1-02-B03 一次閉条件を括弧から検算する
- Level: B

$\mathbb C^2$ で $\alpha^1_{\bar1}=\bar z^2$、その他の係数を零とし、$D_{\bar1}(t)=\partial_{\bar z^1}+t\bar z^2\partial_{z^1}$、$D_{\bar2}(t)=\partial_{\bar z^2}$ と置く。$[D_{\bar1}(t),D_{\bar2}(t)]$ と $\bar\partial_T\alpha$ を求め、可積分性を判定せよ。

<!-- solution-start -->
**詳細解答。** $[f\partial_{z^1},\partial_{\bar z^2}]=-(\partial_{\bar z^2}f)\partial_{z^1}$ に $f=t\bar z^2$ を代入する。よって

$$
[D_{\bar1}(t),D_{\bar2}(t)]=-t\partial_{z^1}.
$$

一方、$\alpha=\bar z^2d\bar z^1\otimes\partial_{z^1}$ だから

$$
\bar\partial_T\alpha
=d\bar z^2\wedge d\bar z^1\otimes\partial_{z^1}
=-d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}.
$$

係数は括弧の一次項 $-t\partial_{z^1}$ と一致する。$t\ne0$ では括弧が非零の純正則方向を向き、グラフ内に入らない。従って可積分でない。
<!-- solution-end -->

<a id="ex-def1-02-c01"></a>
#### DEF1-02-C01 楕円曲線族から新しい正則方向まで追う
- Level: C

$X=\mathbb C/(\mathbb Z+i\mathbb Z)$ の滑らかな座標 $z=x+iy$ に対し、$t\in\mathbb C$ を十分小さく取り、$w_t=x+(i+t)y$ とする。格子の変化によって得られる複素トーラスの正則座標であるとする。

1. $w_t$ を $z,\bar z$ で表し、$D_t=\partial_{\bar z}+\mu(t)\partial_z$ の係数を求めよ。
2. $|\mu(t)|<1$ となる $t$ の条件を一つ与え、直和性と局所座標の実Jacobianを検査せよ。
3. 一次係数 $\alpha$ が $\bar\partial_T$-閉で、しかも $X$ 上で完全でないことを示せ。
4. $w=iz$ へ中心座標を取り替えた場合の一次係数を求め、変形の同じ方向を表す理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

(1) $y=(z-\bar z)/(2i)$ から

$$
w_t=z+\frac{t}{2i}(z-\bar z),\qquad
\partial_z w_t=1+\frac{t}{2i},\quad
\partial_{\bar z}w_t=-\frac{t}{2i}.
$$

$D_tw_t=0$ へ代入すると $-t/(2i)+\mu(t)(1+t/(2i))=0$、すなわち $\mu(t)=t/(2i+t)$ となる。

(2) 例えば $|t|<1/2$ とすれば、逆三角不等式から $|2i+t|\ge2-|t|>3/2$ なので $|\mu(t)|\le |t|/(2-|t|)<1/3$。よって[小さいグラフの命題](#prop-def1-02-small-graph)で直和である。$w_t=Az+B\bar z$ として $A=1+t/(2i)$、$B=-t/(2i)$ と置けば、実Jacobianは

$$
|A|^2-|B|^2
=\frac{|2i+t|^2-|t|^2}{4}
=1+\operatorname{Im}t>\frac12.
$$

従って実局所座標になる。

(3) $\mu'(0)=1/(2i)$ だから $\alpha=(1/(2i))d\bar z\otimes\partial_z$。複素次元1では $\bar\partial_T\alpha$ は型 $(0,2)$ で零である。もし $\alpha=\bar\partial_T(v\partial_z)$ なら、格子周期的な滑らかな $v(x,y)$ が $\partial_{\bar z}v=1/(2i)$ を満たす。ところが $\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$ を $[0,1]^2$ で積分すると、周期境界の差は全て零だから

$$
\int_0^1\!\int_0^1\partial_{\bar z}v\,dx\,dy=0
\ne\frac1{2i}\int_0^1\!\int_0^1dx\,dy=\frac1{2i}.
$$

矛盾する。これは[楕円曲線のKodaira–Spencer類](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)の非零代表でもある。

(4) $w=iz$ では $J=i$、$\bar J=-i$ だから[座標変換則](#prop-def1-02-coordinate-change)を用いて

$$
\alpha' = \frac{i}{-i}\cdot\frac1{2i}
\,d\bar w\otimes\partial_w
=-\frac1{2i}\,d\bar w\otimes\partial_w.
$$

係数の符号は替わるが、余接枠と接枠も共に替わるので大域的には同一の $\alpha$ である。従ってコホモロジー類も変わらない。
<!-- solution-end -->

## 7. 次章への橋

接束値$(0,1)$形式は座標で係数が変わっても同一の束写像であり、そのグラフは反正則方向の候補になる。小ささは**横断性**を保証するが、複素構造に必要な**可積分性**まで保証しない。実際の族が作る一次係数には $\bar\partial_T\alpha=0$ が必要である。次章では、今回Lie括弧の計算で現れた二次項を捨てずに扱い、Maurer–Cartan方程式を導く。
