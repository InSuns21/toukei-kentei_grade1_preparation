# SQC9 Tarskiの円積問題とLaczkovichの解

[前講の多角形等分解](../SQC8/index.md#thm-sqc8-bolyai-gerwien)では、等しい面積の多角形を有限個の**多角形片**に切って、回転と平行移動で組み替えられることを証明しました。しかし円盤の曲がった境界を、多角形片だけで正確に作ることはできません。

では「切り口は直線でなくてもよい」「片の形に制限を設けない」と条件を変えたら、円盤と正方形を有限個の片で組み替えられるでしょうか。驚くことに、**回転さえ不要で、平行移動だけで可能**です。Tarskiが問うたこの問題にLaczkovichが1990年に肯定解を与えました。

この章では有限分割の意味を曖昧にせず、定理を適用するための「境界の小ささ」を自分で計算します。高度な存在定理そのものは引用しますが、円盤に適用する論証と、初等的な補題・演習の計算はすべてここで行います。集合と測度の基本事項は[集合論（SET1）](../../../基礎論系/SET/SET1/index.md)および[Lebesgue測度の正則性（MT0）](../../../解析系/MT/MT0/index.md#thm-mt0-outer-regularity-finite)を前提とします。

<!-- definition-example-audit: strict -->

---

## 1. 「切る」を集合の厳密な分割にする

前講の[多角形の有限等分解](../SQC8/index.md#def-sqc8-scissors-congruence)では、境界の重複は許して内部の重なりを禁止しました。今回は片が一般の集合なので、内部だけを見ると十分ではありません。例えば2片が同じ境界点を含んだまま別々に移動すると、その点を二度数えたことになりかねません。**どの点もただ一つの片に属する**厳密な分割を使います。

平面の集合 $A$ とベクトル $v=(v_1,v_2)$ に対し、平行移動した集合を $A+v=\{x+v:x\in A\}$ と書きます。片ごとの移動ベクトルは異なってよく、片数は有限です。片は多角形・連結集合・可測集合に限定しません。

<a id="def-sqc9-translation-equidecomposition"></a>

<!-- formal-statement-start -->
> **定義（有限平行移動等分解）**
> 平面の集合 $A,B\subset\mathbb R^2$ が**有限平行移動等分解可能**であるとは、正整数 $m$、互いに素な集合 $A_1,\ldots,A_m\subset A$、およびベクトル $v_1,\ldots,v_m\in\mathbb R^2$ が存在し、

$$
A=\bigsqcup_{i=1}^{m}A_i,\qquad
B=\bigsqcup_{i=1}^{m}(A_i+v_i)
$$

> が成立することをいう。記号 $\bigsqcup$ は片同士が**集合として交わらない**和を表す。片の可測性、連結性、境界の形はこの定義に含まれない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc9-translation-equidecomposition -->
**定義の確認** （二片で向きを変える）　半開長方形

$$
A=[0,2)\times[0,1),\qquad
B=[0,1)\times[0,2)
$$

を考えます。$A_1=[0,1)\times[0,1)$、$A_2=[1,2)\times[0,1)$ とし、$v_1=(0,0)$、$v_2=(-1,1)$ とします。

$$
A_1+v_1=[0,1)\times[0,1),\qquad
A_2+v_2=[0,1)\times[1,2).
$$

元の二片は第1座標の区間 $[0,1)$ と $[1,2)$ が交わらず、行先の二片は第2座標の同じ二区間が交わりません。それぞれの和集合はちょうど $A$ と $B$。移動回数ではなく**異なる移動ベクトルの片数**が $m=2$ で有限、回転は一度も使っていません。半開区間にしたのは境界点の所属も一意にするためです。
<!-- definition-example-end -->

この定義は単なる面積の等しさではありません。「各点をどの点へ動かすか」を矛盾なく定めています。

<a id="prop-sqc9-piecewise-bijection"></a>

<!-- formal-statement-start -->
> **命題（片ごとの平行移動から得られる全単射）**
> $A,B\subset\mathbb R^2$ が[有限平行移動等分解](#def-sqc9-translation-equidecomposition)によって結ばれ、片 $A_i$ の移動ベクトルを $v_i$ とする。$x\in A_i$ に対して

$$
f(x)=x+v_i
$$

> と定める写像 $f:A\to B$ は全単射である。逆写像は、$y\in A_i+v_i$ に対して $f^{-1}(y)=y-v_i$ で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

元の分割が互いに素だから $f$ は一意に定まり、行先の分割が互いに素だから異なる点は同じ点へ行きません。行先の和集合が $B$ 全体なので取り残しもありません。

<!-- proof-start -->
### 証明

任意の $x\in A$ はただ一つの $A_i$ に属します。よって $f(x)=x+v_i$ は曖昧さなく定まり、定義から $f(x)\in A_i+v_i\subset B$ です。

$f(x)=f(x')=y$ とします。$x\in A_i$、$x'\in A_j$ なら、$y\in(A_i+v_i)\cap(A_j+v_j)$。行先の片は互いに素なので $i=j$ です。したがって $x+v_i=x'+v_i$ から $x=x'$ となり、単射です。

任意の $y\in B$ は、行先の和集合の条件からある $i$ について $y\in A_i+v_i$ です。このとき $x=y-v_i\in A_i$ を取れば $f(x)=y$ で全射です。行先の互いに素性によってその $i$ も一意なので、書いた逆写像が成立します。
<!-- proof-end -->

「円と正方形を一対一に対応させること」だけなら、どちらも連続体の点集合なので問題の核心ではありません。核心は、**全単射が有限種類の平行移動だけで記述できる**ことです。

### 面積をいつ足してよいか

ここで $\lambda_2(E)$ を平面の集合 $E$ のLebesgue面積とします。面積が定義できる片については、測度の有限加法性と平行移動不変性を使えます。

<a id="prop-sqc9-measurable-area"></a>

<!-- formal-statement-start -->
> **命題（可測な片の等分解は面積を保存する）**
> Lebesgue可測な平面集合 $A,B$ が、すべての片 $A_1,\ldots,A_m$ もLebesgue可測である[有限平行移動等分解](#def-sqc9-translation-equidecomposition)で結ばれているなら、$\lambda_2(A)=\lambda_2(B)$ が成立する（値が無限大の場合も含む）。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

平行移動は可測性と面積を保つので、各 $A_i+v_i$ は可測で $\lambda_2(A_i+v_i)=\lambda_2(A_i)$ です。二つの厳密な有限分割の各片は互いに素なので、測度の有限加法性を両側に適用できます。

$$
\lambda_2(B)
=\sum_{i=1}^m\lambda_2(A_i+v_i)
=\sum_{i=1}^m\lambda_2(A_i)
=\lambda_2(A).
$$
<!-- proof-end -->

ここで**片の可測性を抜いて同じ証明を書いてはいけません**。任意の集合片には $\lambda_2(A_i)$ 自体が定義されない場合があります。後に引用する1990年の存在証明は、片がLebesgue可測であることを保証しません。それでも定理の仮定に「元の二集合が等面積」を明示し、そこから正しい存在結論を得られます。可測な片を選べるという、さらに強い問題は後続で扱います。

---

## 2. 境界が「平面より薄い」を測る

円盤の周囲は円周、正方形の周囲は四本の線分です。直感的にはどちらも二次元の面積を持たない一次元の曲線です。しかし一般の集合の境界は非常に複雑になり得るため、境界を細かな正方形で覆う**個数の増え方**を数値化します。

有界集合 $E\subset\mathbb R^2$ と $\delta>0$ に対し、$N_\delta(E)$ を、一辺 $\delta$ の座標軸に平行な閉正方形で $E$ を覆うのに必要な**最小個数**とします。正方形は自由に平行移動してよいものとします。空でない有界集合なら、各 $\delta>0$ で $1\le N_\delta(E)<\infty$ です。

<a id="def-sqc9-upper-box-dimension"></a>

<!-- formal-statement-start -->
> **定義（上box次元・上Minkowski次元）**
> 空でない有界集合 $E\subset\mathbb R^2$ の上box次元を、正方形被覆数 $N_\delta(E)$ によって

$$
\overline{\dim}_{\mathrm{box}}(E)
=\limsup_{\delta\downarrow0}
\frac{\log N_\delta(E)}{\log(1/\delta)}
$$

> と定義する。$\limsup$ は極限が存在しなくても、十分小さい $\delta$ での比の上側の極限を表す。次元が $2$ 未満であることは、十分細かい被覆で必要な正方形数が面積全体を埋める場合の $\delta^{-2}$ より遅く増えることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc9-upper-box-dimension -->
**定義の確認** （水平線分）　$E=[0,L]\times\{0\}$（$L>0$）を考えます。一辺 $\delta$ の正方形の第1座標への射影は長さ $\delta$ 以下なので、$[0,L]$ を覆うには少なくとも $L/\delta$ 個が必要です。一方、長さ $L$ の線分を $\lceil L/\delta\rceil+1$ 個の正方形で覆えます。したがって

$$
\frac{L}{\delta}\le N_\delta(E)
\le\left\lceil\frac{L}{\delta}\right\rceil+1.
$$

両端の対数を $\log(1/\delta)$ で割り $\delta\downarrow0$ とすると、両側とも $1$ に収束するので $\overline{\dim}_{\mathrm{box}}(E)=1$ です。面積 $0$ と「被覆数の指数が $1$」を別々に確認しました。
<!-- definition-example-end -->

同じ方法は線分、円周、正方形の境界に適用できます。

<a id="lem-sqc9-boundary-dimension"></a>

<!-- formal-statement-start -->
> **補題（線分・円周・正方形境界の上box次元）**
> 平面内の長さが正の任意の線分、半径 $r>0$ の円周 $C_r$、および一辺 $s>0$ の正方形 $[0,s]^2$ の境界を考える。円周は

$$
C_r=\{(x,y)\in\mathbb R^2:x^2+y^2=r^2\}
$$

> である。これら三種類の集合は、いずれも[上box次元](#def-sqc9-upper-box-dimension)がちょうど $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

下界には座標への射影を、上界には曲線を長さ $O(\delta)$ ずつ区切る被覆を使います。$c/\delta\le N_\delta\le C/\delta$ が示せれば、定数は対数を取った極限で消えます。

<!-- proof-start -->
### 証明

まず長さ $L>0$ の任意の線分の端点差を $(a,b)$ とします。$a^2+b^2=L^2$ なので少なくとも一方は絶対値が $L/\sqrt2$ 以上です。この座標への射影には長さ $L/\sqrt2$ の区間が含まれ、一辺 $\delta$ の正方形一個で射影を高々長さ $\delta$ しか覆えません。よって $N_\delta\ge L/(\sqrt2\delta)$ です。線分を長さ $\delta/2$ 以下の $O(L/\delta)$ 個に区切ると、各小線分はその始点を中心とした一辺 $\delta$ の正方形に収まります。したがって $N_\delta\le\lceil2L/\delta\rceil$ が成立します。

次に円周を $p(t)=(r\cos t,r\sin t)$（$0\le t\le2\pi$）で表します。三角関数の差の評価から、各座標について

$$
|p_j(t)-p_j(u)|\le r|t-u|\qquad(j=1,2)
$$

です。$[0,2\pi]$ を長さ $\delta/(2r)$ 以下の小区間に分ければ、各区間の像は始点を中心とした一辺 $\delta$ の正方形に収まるため

$$
N_\delta(C_r)\le\left\lceil\frac{4\pi r}{\delta}\right\rceil.
$$

円周の第1座標への射影は $[-r,r]$ 全体なので、反対向きの評価は $N_\delta(C_r)\ge2r/\delta$ です。従って上下界とも $\delta^{-1}$ と同じ次数になり、次元は $1$ です。

正方形の境界は長さ $s$ の四線分の和です。各線分について上で得た被覆を使えば $N_\delta\le4\lceil2s/\delta\rceil$。辺の一つを射影すれば $N_\delta\ge s/\delta$ です。これも $\delta^{-1}$ の上下界を与え、次元は $1$ です。
<!-- proof-end -->

被覆の一辺を半分にすると、曲線なら必要数は概ね2倍、面全体なら概ね4倍になります。この違いが次の存在定理で使う「境界の次元が周囲の空間の次元より小さい」という仮定です。

なお、**面積が0であることだけでは**上box次元が2未満とはいえません。例えば $E=[0,1]^2\cap\mathbb Q^2$ は可算で面積0ですが、正方形全体に稠密です。$E$ を覆う有限個の閉正方形の和は閉集合なので、$E$ の閉包 $[0,1]^2$ まで覆います。被覆の個数を $N$ とすると面積の劣加法性から $N\delta^2\ge1$、従って $N_\delta(E)\ge\delta^{-2}$ です。逆に格子状に正方形を並べれば高々 $(\lceil1/\delta\rceil+1)^2$ 個で覆えるため、$\overline{\dim}_{\mathrm{box}}(E)=2$ となります。

---

## 3. Laczkovichの結果を正確に読む

1990年、LaczkovichはTarskiの円積問題を肯定的に解きました。続く1992年には、円盤・正方形に限らない一般的な十分条件が示されました。ここではその一般形を引用します。

空間が $\mathbb R^d$ の場合も、[有限平行移動等分解](#def-sqc9-translation-equidecomposition)はまったく同様に定義します（片と移動ベクトルを $d$ 次元に取り替えます）。また、[上box次元](#def-sqc9-upper-box-dimension)の定義でも一辺 $\delta$ の $d$ 次元立方体の最小被覆数を使います。集合の境界を $\partial A$、$d$ 次元Lebesgue測度を $\lambda_d$ と書きます。

<a id="thm-sqc9-laczkovich-general"></a>

<!-- formal-statement-start -->
> **定理（Laczkovichの有限平行移動等分解定理、1992年；引用）**
> 整数 $d\ge1$ と、有界なLebesgue可測集合 $A,B\subset\mathbb R^d$ を取る。両者の測度が等しく正であり、両者の位相的境界の上box次元が $d$ より小さい、すなわち

$$
0<\lambda_d(A)=\lambda_d(B)<\infty,
\qquad
\overline{\dim}_{\mathrm{box}}(\partial A)<d,
\qquad
\overline{\dim}_{\mathrm{box}}(\partial B)<d
$$

> とする。このとき、有限個の（必ずしも可測とは限らない）集合片により、$A$ と $B$ は平行移動だけで厳密に等分解可能である。
<!-- formal-statement-end -->

この一般定理の全証明には、被覆数の評価を有限個の平行移動による点の分布の評価へ変換し、無限グラフ上の対応づけを構成する深い議論が必要です。ここで有限格子を数個描いても、その部分から全平面での対応が自動的に生まれるわけではありません。**一般定理の証明は本章では行わず、原論文と後続論文に委ねます**。後続の組合せ論の章では、この難所を有限グラフの例から学びます。

定理の仮定と結論を分けて読みましょう。

1. $A,B$ は**有界**で、面積（または体積）が**等しく正**です。等面積というだけで結論を得る定理ではなく、次の境界条件も必要です。
2. 条件は**元の二集合の境界**について述べています。各分割片の境界次元が小さいと保証しているわけではありません。
3. 結論は**有限個の集合片による厳密な等分解**です。単に面積を近似することや、無限個の片を許すことではありません。
4. **平行移動だけ**で足ります。しかし分割片が多角形、連結、Borel、Lebesgue可測であることは、この定理だけからは結論できません。

上box次元という指定も重要です。「境界が薄い」を別の次元の定義や、単なる面積0という条件へ勝手に置き換えてはいけません。

### 元の集合から結論へ：半径を入れて計算する

半径 $r>0$ の**閉円盤**と、一辺 $s>0$ の**閉正方形**を

$$
D_r=\{(x,y):x^2+y^2\le r^2\},\qquad
Q_s=[0,s]\times[0,s]
$$

とします。両者は閉かつ有界なのでLebesgue可測で、内部には開円盤・開正方形が入ります。面積は

$$
\lambda_2(D_r)=\pi r^2,\qquad
\lambda_2(Q_s)=s^2.
$$

等面積となる正の辺長は $s^2=\pi r^2$ を解いた $s=r\sqrt\pi$ に**一意**に決まります。辺長は一般に定規とコンパスで作図可能とは限りませんが、この定理は作図可能性を要求しません。

<a id="cor-sqc9-circle-squaring"></a>

<!-- formal-statement-start -->
> **系（Tarskiの円積問題の肯定解；Laczkovich 1990年）**
> 任意の $r>0$ に対し、閉円盤 $D_r=\{(x,y)\in\mathbb R^2:x^2+y^2\le r^2\}$ と閉正方形 $Q_{r\sqrt\pi}=[0,r\sqrt\pi]^2$ は、有限個の集合片に厳密に分割し、各片を**平行移動だけ**で組み替えることができる。片の可測性は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

円盤と正方形の面積を揃え、[線分・円周・正方形境界の上box次元](#lem-sqc9-boundary-dimension)から二つの境界次元が $1<2$ と計算し、[Laczkovichの有限平行移動等分解定理](#thm-sqc9-laczkovich-general)に $d=2$ を代入します。1990年の円積解決を、1992年の一般化から導き直す論証です。

<!-- proof-start -->
### 証明

$A=D_r$、$B=Q_{r\sqrt\pi}$、$d=2$ と選びます。$r>0$ なので $A,B$ はどちらも有界なLebesgue可測集合で内部が空ではありません。面積は

$$
\lambda_2(A)=\pi r^2
=\bigl(r\sqrt\pi\bigr)^2
=\lambda_2(B)>0.
$$

$\partial A$ は半径 $r$ の円周、$\partial B$ は一辺 $r\sqrt\pi$ の正方形の四辺の和です。[線分・円周・正方形境界の上box次元](#lem-sqc9-boundary-dimension)により

$$
\overline{\dim}_{\mathrm{box}}(\partial A)=1<2,
\qquad
\overline{\dim}_{\mathrm{box}}(\partial B)=1<2.
$$

従って[Laczkovichの有限平行移動等分解定理](#thm-sqc9-laczkovich-general)のすべての仮定が成り立ちます。有限な $m$、互いに素な集合片 $A_1,\ldots,A_m$ と平行移動ベクトル $v_1,\ldots,v_m\in\mathbb R^2$ が存在し、

$$
D_r=\bigsqcup_{i=1}^m A_i,
\qquad
Q_{r\sqrt\pi}=\bigsqcup_{i=1}^m(A_i+v_i)
$$

を満たします。[片ごとの全単射](#prop-sqc9-piecewise-bijection)を合わせれば、点の取り落としも二重使用もない厳密な組替えであることが分かります。
<!-- proof-end -->

これが**存在証明**であり、この章は片の座標や明示的な切断線を与えていません。「有限個だから簡単に切れる」「境界が次元1だから分割片の境界も滑らか」という推論は成り立ちません。

### 円環のような穴のある図形にも効く

半径 $0<a<R$ の閉円環 $H_{a,R}=\{(x,y):a^2\le x^2+y^2\le R^2\}$ を考えます。その境界は半径 $a$ と $R$ の二つの円周の和であり、面積は $\pi(R^2-a^2)$ です。境界の被覆数は各円周の被覆数の和以下なので、[線分・円周・正方形境界の上box次元](#lem-sqc9-boundary-dimension)によって上box次元は高々 $1$、外周の射影による下界でちょうど $1$ です。従って一辺 $\sqrt{\pi(R^2-a^2)}$ の正方形とも有限平行移動等分解可能です。**穴があることは、この定理の障害になりません**。

---

## 4. 三つの「円積」は同じ問いではない

| 操作・片への条件 | 正方形への円積 | 決定的な理由 |
|---|---|---|
| 定規とコンパスによる厳密な辺長の作図 | 一般に不可能 | 長さ $r\sqrt\pi$ の作図可能性の問題。古典的な[円積不能性](../SQC7/index.md)とはこの意味 |
| 有限個の**多角形片**を剛体移動する | 不可能 | 有限本の直線辺から正確な円周を作れない（[SQC8](../SQC8/index.md#thm-sqc8-bolyai-gerwien)の射程外） |
| 任意の集合片を有限個、**平行移動だけ**する | 可能 | [Tarskiの円積問題の肯定解](#cor-sqc9-circle-squaring) |
| 片もLebesgue可測、あるいはBorelであることを要求する | この章の引用定理だけでは未決定 | 分割片に加える性質は別の主張。次の章群で扱う |

「1990年に円積が可能になった」というのは、古典作図の不可能性が覆されたという意味ではありません。**操作と片の許容範囲を変えた別の問い**に肯定解が得られた、ということです。

### 参考文献

- M. Laczkovich, “Equidecomposability and discrepancy; a solution of Tarski's circle-squaring problem,” *Journal für die reine und angewandte Mathematik* **404** (1990), 77–117. [DOI](https://doi.org/10.1515/crll.1990.404.77)。円積問題の最初の肯定解。
- M. Laczkovich, “Decomposition of sets with small boundary,” *Journal of the London Mathematical Society* **46** (1992), 58–64. [後続論文の紹介と一般定理](https://math.berkeley.edu/~marks/papers/laczkovich_v17.pdf)。境界次元条件による一般化。
- A. S. Marks and S. T. Unger, “A new proof of Laczkovich's circle squaring theorem,” [著者公開論文](https://www.math.toronto.edu/sunger/laczkovich_v18.pdf)、Theorem C。一般定理の正確な仮定と1990年・1992年の年次を照合できる。
- A. Grabowski, A. Máthé and O. Pikhurko, “Measurable circle squaring,” *Annals of Mathematics* **185** (2017), 671–710. [論文](https://annals.math.princeton.edu/2017/185-2/p06)。1990年の解法の片の可測性が自動的には保証されないことと、その後の改善を説明する。

---

## 5. 演習：定義、境界次元、定理の仮定を自分で検証する

### Level A：一つずつ条件を確かめる

**SQC9-A1（厳密な二片の分割）**
$A=[0,3)\times[0,1)$ と $B=[0,1)\times[0,3)$ に対し、有限平行移動等分解を与えよ。各片と移動ベクトルを列挙し、元と行先の片が厳密に互いに素であることを確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$A_i=[i-1,i)\times[0,1)$（$i=1,2,3$）、$v_i=(1-i,i-1)$ とします。各 $A_i$ の第1座標区間は重ならず、その和は $[0,3)$ だから、$A=\bigsqcup_{i=1}^3A_i$ です。移動後は

$$
A_i+v_i=[0,1)\times[i-1,i).
$$

第2座標区間が互いに素で、和は $[0,3)$ なので、$B=\bigsqcup_{i=1}^3(A_i+v_i)$ です。$m=3<\infty$、移動はすべて平行移動であり、[定義](#def-sqc9-translation-equidecomposition)の全条件を満たします。
<!-- solution-end -->

**SQC9-A2（片ごとの写像の逆）**
第1節の二片の例で、$f:A\to B$ の具体式と逆写像を書き、$x=(3/2,1/4)$ の像と、その像の逆像を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

第1片では $f(x,y)=(x,y)$、第2片では $f(x,y)=(x-1,y+1)$ です。$x=(3/2,1/4)$ は $A_2$ に属するので $f(x)=(1/2,5/4)\in[0,1)\times[1,2)$。逆は行先の第1帯で恒等、第二帯で $(u,v)\mapsto(u+1,v-1)$ です。したがって $f^{-1}(1/2,5/4)=(3/2,1/4)$。行先の二区間が厳密に互いに素なので逆写像の分岐も一意です。[全単射命題](#prop-sqc9-piecewise-bijection)の具体例になっています。
<!-- solution-end -->

**SQC9-A3（可測な片の面積）**
$A=[0,2)\times[0,1)$ と $B=[0,1)\times[0,2)$ を第1節の二片で等分解する。各片と全体のLebesgue面積を計算し、どの条件によって加法性を使えたか説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$A_1,A_2$ は半開長方形でLebesgue可測、各面積は $1\cdot1=1$ です。移動像も半開長方形で面積 $1$。しかも元と行先の片が互いに素なので

$$
\lambda_2(A)=1+1=2=\lambda_2(B).
$$

ここで使った条件は片が可測であること、平行移動で面積が保たれること、互いに素な有限分割であることです。[可測片の面積保存](#prop-sqc9-measurable-area)の仮定を一つも省いていません。
<!-- solution-end -->

**SQC9-A4（正方形の辺の被覆数）**
$E=[0,3]\times\{0\}$ とする。一辺 $\delta$ の正方形による $N_\delta(E)$ について $3/\delta\le N_\delta(E)\le\lceil3/\delta\rceil+1$ を示し、上box次元を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

被覆する各正方形を $x$ 軸へ射影すると長さ $\delta$ の区間なので、長さ $3$ の射影を覆うには $N_\delta\delta\ge3$、つまり $N_\delta\ge3/\delta$ が必要です。一方、$x=0,\delta,2\delta,\ldots$ に沿って正方形を隣接配置すると高々 $\lceil3/\delta\rceil+1$ 個で覆えます。したがって $N_\delta(E)$ は上下とも $1/\delta$ の定数倍で抑えられ、

$$
\limsup_{\delta\downarrow0}\frac{\log N_\delta(E)}{\log(1/\delta)}=1.
$$

よって[上box次元](#def-sqc9-upper-box-dimension)は $1$ です。
<!-- solution-end -->

**SQC9-A5（円盤の正方形の辺長）**
半径 $3$ の閉円盤と等面積の正方形の辺長を求めよ。また、この数値だけで有限平行移動等分解の存在が証明できたといえるか。

- Level: A

<!-- solution-start -->
**詳細解答**

円盤の面積は $\pi\cdot3^2=9\pi$、正方形の辺長を $s>0$ とすれば $s^2=9\pi$ です。従って $s=3\sqrt\pi$。しかし面積の等しさだけでは[定義](#def-sqc9-translation-equidecomposition)を満たす片と移動を与えていません。存在にはさらに境界次元の仮定を検証し、[Laczkovichの有限平行移動等分解定理](#thm-sqc9-laczkovich-general)を適用する必要があります。
<!-- solution-end -->

### Level B：仮定と限界を接続する

**SQC9-B1（非可測片を勝手に足さない）**
一般の集合片による有限平行移動等分解 $A=\bigsqcup_i A_i$、$B=\bigsqcup_i(A_i+v_i)$ から、$\lambda_2(B)=\sum_i\lambda_2(A_i)$ と直ちに書けない理由を述べよ。また各片がLebesgue可測なら、どのように証明が完成するか。

- Level: B

<!-- solution-start -->
**詳細解答**

[定義](#def-sqc9-translation-equidecomposition)は $A_i$ に可測性を要求していません。非可測な片では $\lambda_2(A_i)$ が通常のLebesgue測度として定義されないので、右辺が式として成立しません。$A,B$ が可測であっても、分割片が可測とは限りません。

もしすべての $A_i$ が可測なら、移動像も可測で $\lambda_2(A_i+v_i)=\lambda_2(A_i)$ です。二つの厳密な有限分割に[有限加法性の議論](#prop-sqc9-measurable-area)を適用して、$\lambda_2(B)=\sum_i\lambda_2(A_i+v_i)=\sum_i\lambda_2(A_i)=\lambda_2(A)$ を得ます。どの仮定が欠けていたかを特定できれば、誤った面積証明を避けられます。
<!-- solution-end -->

**SQC9-B2（有限個の境界の合併）**
有界集合 $E_1,\ldots,E_k\subset\mathbb R^2$ があり、各 $N_\delta(E_j)\le C_j\delta^{-1}$ が十分小さい $\delta$ で成立する。$E=E_1\cup\cdots\cup E_k$ の上box次元が高々 $1$ であることを示し、二つの円周の和に適用せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

各 $E_j$ を覆う有限正方形群をすべて合わせれば $E$ を覆えるので、被覆数の最小性から

$$
N_\delta(E)\le\sum_{j=1}^kN_\delta(E_j)
\le\left(\sum_{j=1}^kC_j\right)\delta^{-1}.
$$

対数を取って $\log(1/\delta)>0$ で割れば、定数項 $\log(\sum C_j)/\log(1/\delta)\to0$ です。従って上box次元は高々 $1$。各円周について[被覆数の補題](#lem-sqc9-boundary-dimension)の上界 $O(\delta^{-1})$ があるので、二円周の合併にも同じ結論が成り立ちます。非空の外円周の射影による下界があるため、実際の次元はちょうど $1$ です。
<!-- solution-end -->

**SQC9-B3（等面積条件を欠く場合）**
半径 $1$ の閉円盤と一辺 $2$ の正方形について、[Laczkovichの一般定理](#thm-sqc9-laczkovich-general)のどの仮定が満たされ、どの仮定が失われるか判定せよ。「定理を適用できない」と「等分解が絶対に不可能である」は論理的に同じか。

- Level: B

<!-- solution-start -->
**詳細解答**

両集合は有界でLebesgue可測、内部を持ち、境界の次元は[補題](#lem-sqc9-boundary-dimension)より $1<2$ です。しかし面積は円盤が $\pi$、正方形が $4$ で $\pi\ne4$。従って「等しく正」という仮定が失われ、一般定理の結論は使えません。定理の仮定を満たさないことだけから、その定理の逆方向の否定は導けません。少なくとも[可測な片の等分解](#prop-sqc9-measurable-area)なら面積保存に矛盾して不可能ですが、任意の非可測片にも同じ結論を示すには別の議論（平行移動不変な有限加法的測度など）が必要です。
<!-- solution-end -->

**SQC9-B4（量化を読み間違えない）**
次の三文の真偽を、[一般定理](#thm-sqc9-laczkovich-general)の仮定・結論に照らして判定せよ。(i) 定理は円盤と正方形について有限個の平行移動片の存在を与える。(ii) 定理はその片すべてがLebesgue可測であることも保証する。(iii) 正方形の代わりに同じ面積の有界な閉長方形を取っても、定理を適用できる。

- Level: B

<!-- solution-start -->
**詳細解答**

(i) は真。円盤・正方形は等面積に選べば、双方の境界次元は $1<2$ で、正の面積を持ちます。(ii) は偽。「可測とは限らない集合片」が存在するという結論には、片を可測に**選べる**という追加主張は含まれません。可測片版の存在自体は後の研究で証明されていますが、この引用定理からの論理的帰結としては得られません。(iii) は真。長方形の境界は四線分の合併で、[境界次元の補題](#lem-sqc9-boundary-dimension)と同じ被覆法で次元は $1$。有界・可測・等面積・正の面積も満たすからです。
<!-- solution-end -->

### Level C：新しい図形へ一般定理を移す

**SQC9-C1（円環を正方形へ等分解する）**
$0<a<R$ とし、閉円環 $H_{a,R}=\{(x,y)\in\mathbb R^2:a^2\le x^2+y^2\le R^2\}$ を考える。(i) 等面積な正方形 $Q=[0,s]^2$ の辺長 $s$ を定めよ。(ii) $H_{a,R}$ の位相的境界を明記し、その上box次元が $1$ であることを被覆数の上界・下界から示せ。(iii) [Laczkovichの一般定理](#thm-sqc9-laczkovich-general)の全仮定を個別に確認し、厳密な有限平行移動等分解の結論を量化を落とさず書け。(iv) 円環の穴の存在と分割片の可測性について、定理から何が言えて何が言えないか整理せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

(i) 円環は半径 $R$ の閉円盤から半径 $a$ の**開**円盤を除いた集合です。円周は面積0なので、面積は $\pi R^2-\pi a^2=\pi(R^2-a^2)$。$s>0$ を $s^2=\pi(R^2-a^2)$ と定めると

$$
s=\sqrt{\pi(R^2-a^2)}
$$

です。$R>a>0$ により $s>0$ です。

(ii) 境界は半径 $a$ の内円周 $C_a$ と半径 $R$ の外円周 $C_R$ の互いに素な和です。各円周について[円周の被覆数評価](#lem-sqc9-boundary-dimension)があるから、十分小さい $\delta>0$ で

$$
N_\delta(\partial H_{a,R})
\le\left\lceil\frac{4\pi a}{\delta}\right\rceil
+\left\lceil\frac{4\pi R}{\delta}\right\rceil.
$$

逆に外円周 $C_R\subset\partial H_{a,R}$ なので、射影から $N_\delta(\partial H_{a,R})\ge N_\delta(C_R)\ge2R/\delta$。両側が $\delta^{-1}$ の定数倍で挟まれるため、$\overline{\dim}_{\mathrm{box}}(\partial H_{a,R})=1$ です。

(iii) $H_{a,R}$ は閉有界、$Q$ も閉有界なので両者はLebesgue可測です。(i) から $0<\lambda_2(H_{a,R})=\lambda_2(Q)<\infty$。(ii) と正方形の[線分・円周・正方形境界の上box次元](#lem-sqc9-boundary-dimension)から両者の境界次元は $1<2$ です。よって $d=2$, $A=H_{a,R}$, $B=Q$ と置いて[Laczkovichの有限平行移動等分解定理](#thm-sqc9-laczkovich-general)を適用すると、ある**有限な正整数** $m$、互いに素な集合 $E_1,\ldots,E_m$、およびベクトル $v_1,\ldots,v_m\in\mathbb R^2$ が存在し、

$$
H_{a,R}=\bigsqcup_{i=1}^mE_i,
\qquad Q=\bigsqcup_{i=1}^m(E_i+v_i)
$$

が成立します。

(iv) 円環は穴を持ち凸ではありませんが、**凸性も単連結性も定理の仮定にはない**ので支障になりません。一方、上の $E_i$ が可測、連結、滑らかな境界を持つなどとは一切結論していません。円環の面積計算に元集合の可測性は使いましたが、存在した片に可測性を勝手に付け足すことはできません。
<!-- solution-end -->
