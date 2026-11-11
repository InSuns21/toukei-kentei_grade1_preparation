# GMT30 周長最小化の直接法

<!-- definition-example-audit: strict -->

## 1. 最小に近い集合列から、本当の極小集合を作れるか

[GMT29のEuclid等周不等式](../GMT29/index.md#thm-gmt29-general-sharp)は、体積だけを固定した全空間の問題では球が最も周長を節約することを教えました。しかし、容器に入る、障害物を含む、外側の配置を固定する、といった条件を課すと、球をそのまま選べるとは限りません。そのとき極小集合が存在するかを、形を最初から言い当てずに証明したいのです。

[GMT24の有限周長集合](../GMT24/index.md#def-gmt24-finite-perimeter)の周長を使い、以下では $d\ge2$、$|E|=\mathcal L^d(E)$、$P(E)=|D\chi_E|(\mathbb R^d)$ とします。集合の包含と等号は、断らない限りLebesgue測度について**ほとんど至る所（almost everywhere; a.e.）**、すなわち零集合を除いた意味です。境界が滑らかなときの $P(E)$ は通常の境界面積ですが、非正規化Hausdorff測度そのものではなく、[GMT27の面積正規化](../GMT27/index.md#thm-gmt27-de-giorgi-structure)と整合する量です。

直接法（direct method）の鍵は次の三段階です。

1. 極小値へ近づく集合列を選ぶ。
2. その列から、制約を保つ極限集合を取り出す。
3. 周長の下半連続性を用い、極限の周長が極小値以下であると示す。

第2段階が一番危険です。単に「コンパクト性より」と書くと、体積が逃げたり、境界条件が消えたりする可能性を見落とします。

## 2. 閉じた容器・障害物・体積を一つの許容クラスにする

まず、有限体積の**容器**をコンパクト集合 $K\subset\mathbb R^d$ で表し、必ず含みたい可測集合 $A\subset K$ と、避けたい可測集合 $H\subset K$ を指定します。$A\cap H$ は零測度とします。容器を閉集合にしておけば、ほとんど至る所収束でその外側へ点が漏れることを防げます。

<a id="def-gmt30-admissible"></a>

<!-- formal-statement-start -->
> **定義（容器・障害物・体積付きの許容クラス）**  
> $d\ge2$、$K\subset\mathbb R^d$ はコンパクト、$A,H\subset K$ はLebesgue可測で $|A\cap H|=0$、$V$ は有限な非負実数とする。**許容クラス** $\mathcal A(K,A,H,V)$ を、Lebesgue可測な有限周長集合 $E\subset\mathbb R^d$ のうち、次の条件を満たすものの全体とする。

$$
|E\setminus K|=0,\qquad |A\setminus E|=0,\qquad
|E\cap H|=0,\qquad |E|=V,\qquad P(E)<\infty.
$$

> クラスが空でない場合、その**周長最小化値**を次で定める。

$$
m(K,A,H,V)=\inf_{E\in\mathcal A(K,A,H,V)}P(E).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt30-admissible -->
### 定義の直接確認：円盤を含む円盤

$d=2$、$K=\overline{B_2(0)}$、$A=B_{1/2}(0)$、$H=\varnothing$、$V=\pi$ とします。$E=B_1(0)$ は $K$ の内部に含まれ、$A\subset E$、禁止領域は空です。さらに[GMT24での球の直接計算](../GMT24/index.md#ref-gmt24-ball-formula)から

$$
|E|=\pi\cdot1^2=\pi=V,\qquad
P(E)=2\pi\cdot1=2\pi<\infty.
$$

**定義の確認**：容器内への包含、障害物の含有、禁止集合の回避、指定体積、有限周長という各条件を確認したので $E\in\mathcal A(K,A,H,\pi)$ です。クラスの非空性は一般には体積の大小関係 $|A|\le V\le|K\setminus H|$ **だけでは保証されません**。有限周長の適合する競合集合を一つ実際に作るか、その存在を別途仮定する必要があります。
<!-- definition-example-end -->

「$\inf$ に近づく」という言葉も、集合列に対して定めておきます。

<a id="def-gmt30-minimizing-sequence"></a>

<!-- formal-statement-start -->
> **定義（周長最小化列）**  
> 空でない許容クラス $\mathcal A=\mathcal A(K,A,H,V)$ に対し、$(E_j)_{j\ge1}\subset\mathcal A$ が**周長最小化列**であるとは、各 $E_j$ が許容条件を満たし、

$$
P(E_j)\longrightarrow m(K,A,H,V)
$$

> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt30-minimizing-sequence -->
### 直接例：中心は動いても周長は最小

直前の円盤モデルで $z_j=((-1)^j/4,0)$、$E_j=B_1(z_j)$ とします。$|z_j|=1/4$ なので $B_{1/2}(0)\subset B_1(z_j)\subset B_2(0)$、$|E_j|=\pi$、$P(E_j)=2\pi$ です。[Euclid等周不等式](../GMT29/index.md#thm-gmt29-general-sharp)からすべての許容集合 $F$ に $P(F)\ge2\pi$ なので $m=2\pi$。

**定義の確認**：各 $E_j$ の許容性と $P(E_j)=m$ を別々に示したので、確かに $P(E_j)\to m$ です。したがって $(E_j)$ は最小化列ですが、偶数項・奇数項で中心が違うため、列全体は収束する必要がありません。部分列を取る理由が見えます。
<!-- definition-example-end -->

許容集合が存在すれば $0\le m<\infty$ です。infimum の性質から各 $j$ に対し

$$
E_j\in\mathcal A,\qquad m\le P(E_j)<m+\frac1j
$$

を満たす集合を選べるので、最小化列自体の存在は難所ではありません。

## 3. 有界支持なら局所収束を全体収束へ昇格できる

[GMT24の局所コンパクト性](../GMT24/index.md#thm-gmt24-perimeter-compactness)は、有限周長集合の列から局所 $L^1$ 収束する部分列を取り出します。今回は $K$ がコンパクトなので、さらに半径 $R$ の開球 $B_R$ を $K\subset B_R$ となるよう選べます。すべての $E_j$ が $K$ の外では零なので、局所収束と全空間での収束を次の一行で結べます。

<a id="lem-gmt30-global-l1"></a>

<!-- formal-statement-start -->
> **補題（共通コンパクト支持による全空間収束）**  
> $K\subset\mathbb R^d$ をコンパクト、$(E_j)$ をLebesgue可測な有限周長集合の列とする。各 $j$ について $|E_j\setminus K|=0$、かつ

$$
\sup_jP(E_j)<\infty
$$

> と仮定する。このとき部分列 $(E_{j_k})$ と有限周長集合 $E$ が存在し、$|E\setminus K|=0$ かつ

$$
\|\chi_{E_{j_k}}-\chi_E\|_{L^1(\mathbb R^d)}
=|E_{j_k}\triangle E|\longrightarrow0,\qquad
P(E)\le\liminf_{k\to\infty}P(E_{j_k})
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

周長の一様上界を [GMT24の集合コンパクト性](../GMT24/index.md#thm-gmt24-perimeter-compactness)に入れます。得られる局所収束を、すべての集合を含む一つの球の中で評価し、球の外での差が零であることを使います。

<!-- proof-start -->
### 証明

$K\subset B_R(0)$ を満たす $R>0$ を選びます。[有限周長集合の局所コンパクト性と下半連続性](../GMT24/index.md#thm-gmt24-perimeter-compactness)を $\Omega=\mathbb R^d$ に適用すると、部分列と可測集合 $E$ があり、任意のコンパクトに含まれる開集合 $U$ で $L^1(U)$ 収束し、

$$
P(E)\le\liminf_{k\to\infty}P(E_{j_k})<\infty
$$

です。特に $B_R(0)$ 上で $L^1$ 収束します。一方 $\mathbb R^d\setminus K$ の任意の相対コンパクト開部分 $W$ では $\chi_{E_{j_k}}=0$ a.e. ですから、収束の一意性により $\chi_E=0$ a.e. on $W$ です。可算個の球で $\mathbb R^d\setminus K$ を覆えば $|E\setminus K|=0$ が従います。

したがって $B_R$ の外側では両方の指示関数が零であり、

$$
\int_{\mathbb R^d}|\chi_{E_{j_k}}-\chi_E|\,dx
=\int_{B_R}|\chi_{E_{j_k}}-\chi_E|\,dx
\longrightarrow0.
$$

最後に、指示関数二つの差の絶対値は対称差の指示関数なので積分は $|E_{j_k}\triangle E|$ と等しくなります。$\square$
<!-- proof-end -->

この補題は周長の収束を主張していません。例えば、細かくギザギザした境界を持つ集合が滑らかな集合へ収束するとき、極限の周長は真に小さくなり得ます。**最小化には等式でなく下半連続性で十分**です。

## 4. 極小集合を取り出す

障害物の包含・排除、体積の等号は $L^1$ 収束でどう保たれるでしょうか。$\chi_{E_j}\to\chi_E$ in $L^1$ なら、まず

$$
\big||E_j|-|E|\big|
=\left|\int(\chi_{E_j}-\chi_E)\,dx\right|
\le\|\chi_{E_j}-\chi_E\|_1
$$

です。同じ考えで、含む・避ける条件も零集合を除いて保たれます。これを定理の核心にします。

<a id="thm-gmt30-existence"></a>

<!-- formal-statement-start -->
> **定理（コンパクト容器・体積・障害物条件下の周長極小集合の存在）**  
> $d\ge2$、$K\subset\mathbb R^d$ はコンパクト、$A,H\subset K$ はLebesgue可測で $|A\cap H|=0$、$0\le V<\infty$ とする。[許容クラス](#def-gmt30-admissible) $\mathcal A(K,A,H,V)$ が空でないと仮定する。このとき有限周長集合 $E_*\in\mathcal A(K,A,H,V)$ が存在し、

$$
P(E_*)=m(K,A,H,V)
=\inf_{E\in\mathcal A(K,A,H,V)}P(E)
$$

> が成立する。一般には極小集合の一意性、境界の滑らかさ、連結性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

最小化列の周長は $m+1$ 以下に抑えられます。[共通コンパクト支持の補題](#lem-gmt30-global-l1)で全空間 $L^1$ 収束を取り出し、指示関数の差の積分で体積・障害物条件を順に保存します。最後に周長の下半連続性を使います。

<!-- proof-start -->
### 証明

**第1段階：最小化列。** 非空の許容クラスから $E_0$ を一つ選ぶと $0\le m\le P(E_0)<\infty$ です。[最小化列の定義](#def-gmt30-minimizing-sequence)に従い、各 $j$ について

$$
E_j\in\mathcal A,\qquad
m\le P(E_j)<m+\frac1j
$$

となる $E_j$ を選びます。従って $\sup_j P(E_j)\le m+1$（厳密な上界は必要ありません）です。

**第2段階：収束部分列。** 各 $E_j$ は $K$ の外で零です。[補題](#lem-gmt30-global-l1)を適用し、添字を付け直して

$$
\chi_{E_j}\longrightarrow\chi_{E_*}\quad\text{in }L^1(\mathbb R^d),\qquad
|E_*\setminus K|=0,\qquad
P(E_*)\le\liminf_jP(E_j)
$$

を得ます。最後の不等式から $E_*$ は有限周長です。

**第3段階：許容条件の閉性。** 体積は

$$
\big||E_*|-V\big|
\le\|\chi_{E_*}-\chi_{E_j}\|_1+
\big||E_j|-V\big|
=\|\chi_{E_*}-\chi_{E_j}\|_1\longrightarrow0
$$

なので $|E_*|=V$ です。障害物については、$A\setminus E_j$ の測度が零であることから

$$
|A\setminus E_*|
=\int_A(1-\chi_{E_*})\,dx
\le\int_A|\chi_{E_j}-\chi_{E_*}|\,dx
\le\|\chi_{E_j}-\chi_{E_*}\|_1\longrightarrow0.
$$

同様に、$E_j\cap H$ の測度が零なので

$$
|E_*\cap H|
=\int_H\chi_{E_*}\,dx
\le\|\chi_{E_j}-\chi_{E_*}\|_1\longrightarrow0.
$$

共通支持、有限周長もすでに確保したので $E_*\in\mathcal A$ です。

**第4段階：極小性。** 第2段階の下半連続性と $P(E_j)\to m$ より $P(E_*)\le m$。他方 $E_*$ 自身が許容集合なので、infimum の定義から $m\le P(E_*)$。従って

$$
m\le P(E_*)\le\liminf_jP(E_j)=m
$$

であり $P(E_*)=m$ が成立します。$\square$
<!-- proof-end -->

ここでは **境界の幾何学的形状を調べていません**。存在証明に使ったのは、支持の有界性、BVのコンパクト性、制約の $L^1$ 閉性、周長の下半連続性だけです。境界の正則性は別の問いです。

## 5. 外側の配置を固定するとき、何の周長を数えるか

容器の「外側での集合」を指定する境界条件も作れます。開集合 $\Omega$ の外で所定の $F$ と一致させる場合、容器境界で新たにできるジャンプを数えるには**全空間の周長**を最小化します。$P(E;\Omega)$ だけを使うと、$\partial\Omega$ 上のジャンプはそもそも数えません。

<a id="cor-gmt30-exterior-data"></a>

<!-- formal-statement-start -->
> **系（固定外部データと体積条件の周長極小集合）**  
> $d\ge2$、$\Omega\subset\mathbb R^d$ は有界開集合、$F\subset\mathbb R^d$ は有界な有限周長集合、$V\ge0$ とする。有限周長集合 $E$ で

$$
|(E\triangle F)\setminus\Omega|=0,\qquad
|E\cap\Omega|=V
$$

> を満たすものが少なくとも一つあると仮定する。そのような集合の中で全周長 $P(E)$ を最小にする集合が存在する。$\partial\Omega$ の滑らかさは仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

固定した $F$ は有界で、変えられる部分は有界な $\Omega$ に限られます。そこで共通コンパクト支持を作り、外側で $F$ を含む・避ける条件を[存在定理](#thm-gmt30-existence)の $A,H$ に読み替えます。

<!-- proof-start -->
### 証明

$F$ が有界なので、$F$ と $\Omega$ の両方を含む十分大きい閉球 $K$ を選べます。次を $K$ 内の可測集合として定めます。

$$
A=F\cap(K\setminus\Omega),\qquad
H=(K\setminus\Omega)\setminus F,\qquad
V'=V+|F\setminus\Omega|.
$$

$A\cap H=\varnothing$ です。条件を満たす $E$ は $K$ の外で空、$K\setminus\Omega$ の中では $F$ と一致するため、$A\subset E$、$E\cap H=\varnothing$ がa.e.成立します。また

$$
|E|=|E\cap\Omega|+|E\setminus\Omega|
=V+|F\setminus\Omega|=V'.
$$

逆に $\mathcal A(K,A,H,V')$ の任意の $E$ は $K\setminus\Omega$ で $F$ とa.e.一致し、$K$ の外では両者が空であり、$\Omega$ 内の体積は $V'-|F\setminus\Omega|=V$ となります。従って二つの許容クラスは零集合を無視して同じです。非空性は仮定されているので、[存在定理](#thm-gmt30-existence)を適用できます。$\square$
<!-- proof-end -->

### 全周長と相対周長は違う：正方形の例

$\Omega=(0,1)^2$、$E=\Omega$ とすると、$\chi_E$ は $\Omega$ 内では恒等的に1なので

$$
P(E;\Omega)=0,\qquad P(E)=4.
$$

後者の4は、[GMT24での長方形の直接計算](../GMT24/index.md#ref-gmt24-rectangle-formula)で4辺を数えた値です。外側を空に固定した問題で $P(E;\Omega)$ だけを目的関数にすれば、容器の壁に貼り付く境界の費用は0となります。全空間の周長を最小化する問題と、相対周長を最小化する問題は、異なる変分問題です。

## 6. 三つの失敗機構を手で確認する

### 6.1 質量の並進逃避：局所収束だけでは不十分

全空間で $E_j=B_1(je_1)$（$e_1=(1,0,\ldots,0)$）とします。[球の公式](../GMT24/index.md#ref-gmt24-ball-formula)より

$$
|E_j|=\omega_d,\qquad P(E_j)=d\omega_d
$$

は一定です。しかし任意の有界な $U$ は、十分大きい $j$ で $E_j$ と交わらないので $\chi_{E_j}\to0$ in $L^1_{\mathrm{loc}}(\mathbb R^d)$ です。極限の体積は0であり、$\omega_d$ ではありません。

失った仮定は**共通の有界支持**です。[局所コンパクト性](../GMT24/index.md#thm-gmt24-perimeter-compactness)そのものは正しくても、体積保存へ使う全空間 $L^1$ 収束はありません。無制約の全空間の等周問題には球という極小集合が存在しますが、この特定の最小化列を局所極限へ送るだけではそれを取り出せない、という区別が重要です。

### 6.2 可変の境界層：境界条件が $L^1$ 閉でない

$\Omega=(0,1)^2$ とし、$j\ge3$ に対して

$$
E_j=(1/j,\,1/2+1/j)\times(0,1).
$$

各 $E_j$ は左辺 $x_1=0$ から正の幅 $1/j$ だけ離れ、$|E_j|=1/2$ です。それでも

$$
\chi_{E_j}\longrightarrow\chi_E\ \text{in }L^1(\Omega),
\qquad E=(0,1/2)\times(0,1)
$$

であり、極限は左辺に接します。対称差は左右の幅 $1/j$ の縦帯2本なので

$$
|E_j\triangle E|=\frac2j\longrightarrow0.
$$

全ての $E_j$ が「左辺の近傍で空」という性質を持っていても、**近傍の幅を固定せず列ごとに選ぶ**なら極限は同じ性質を持ちません。さらに $P(E_j;\Omega)=2$ ですが $P(E;\Omega)=1$ です。下半連続性は壊れていません。壊れたのは許容クラスの閉性です。これは境界データを扱う際、単に「境界の近くで条件を課した」と言うだけでは足りない反例です。

### 6.3 連結性は自由には保存されない

$\mathbb R^2$ で中心 $(-2,0)$ と $(2,0)$ の半径1の開円盤を $D_-,D_+$ とし、

$$
E_\varepsilon=D_-\cup D_+\cup\bigl((-2,2)\times(-\varepsilon,\varepsilon)\bigr),
\quad 0<\varepsilon<1/4.
$$

各 $E_\varepsilon$ は細い通路により連結ですが、通路は面積 $8\varepsilon$ しか持たないので

$$
|E_\varepsilon\triangle(D_-\cup D_+)|\le8\varepsilon\longrightarrow0.
$$

周長も有界です。実際、円盤2個と長方形の和集合について[周長の劣加法性](../GMT28/index.md#thm-gmt28-perimeter-submodularity)を使うと

$$
P(E_\varepsilon)
\le P(D_-)+P(D_+)+P((-2,2)\times(-\varepsilon,\varepsilon))
=4\pi+8+4\varepsilon.
$$

極限 $D_-\cup D_+$ は非連結です。したがって「許容集合は連結」と追加するだけでは、上の直接法の第3段階は一般に成立しません。

## 7. 円盤モデルの極小集合をすべて決定する

第2節の $K=\overline{B_2(0)}$、$A=B_{1/2}(0)$、$H=\varnothing$、$V=\pi$ に戻ります。存在定理から極小集合の存在は既に分かりますが、今回は[GMT29の等号分類](../GMT29/index.md#cor-gmt29-equality)を使えば形まで決まります。

<a id="prop-gmt30-disc-minimizers"></a>

<!-- formal-statement-start -->
> **命題（円盤障害物付き固定面積問題の全極小集合）**  
> $\mathbb R^2$ で $K=\overline{B_2(0)}$、$A=B_{1/2}(0)$、$H=\varnothing$、$V=\pi$ とする。この許容クラスの最小値は $2\pi$ であり、極小集合は、零測度の差を除いて

$$
E=B_1(z),\qquad |z|\le\frac12
$$

> の形の円盤全体である。
<!-- formal-statement-end -->

### 証明の見取り図

面積 $\pi$ の集合は[Euclid等周不等式](../GMT29/index.md#thm-gmt29-general-sharp)から周長が $2\pi$ 以上です。中心0の単位円盤がその値を達成し、等号分類で極小集合が円盤に限られます。最後に「障害物を含む」条件を中心の幾何学的制約へ翻訳します。

<!-- proof-start -->
### 証明

任意の許容集合 $E$ は $|E|=\pi$ なので[GMT29の鋭い不等式](../GMT29/index.md#thm-gmt29-general-sharp)に $d=2$、$\omega_2=\pi$ を代入して

$$
P(E)\ge2\pi^{1/2}|E|^{1/2}
=2\sqrt\pi\sqrt\pi=2\pi
$$

を得ます。$B_1(0)$ は許容集合で周長 $2\pi$ だから $m=2\pi$ です。

極小集合なら等号が成立するので、[等号分類](../GMT29/index.md#cor-gmt29-equality)から $E=B_r(z)$ a.e. です。$|E|=\pi r^2=\pi$ より $r=1$。障害物条件 $|B_{1/2}(0)\setminus B_1(z)|=0$ は、開球の幾何学から

$$
|z|+\frac12\le1,\quad\text{すなわち}\quad |z|\le\frac12
$$

と同値です。実際 $\sup_{x\in B_{1/2}(0)}|x-z|=|z|+1/2$ で、右辺が1を超えれば $B_{1/2}(0)\setminus B_1(z)$ に開集合が含まれ、正の面積を持ちます。逆に $|z|\le1/2$ なら三角不等式で包含が従います。容器については $|z|+1\le3/2<2$ なので自動的に満たします。逆方向も同じ計算で全条件を満たし、周長 $2\pi$ のためすべて極小です。$\square$
<!-- proof-end -->

極小集合が存在することと一意であることは別です。ここでは中心を半径 $1/2$ の円盤内で自由に動かせるので、極小集合は無数にあります。幾何学的な一意性や滑らかさは、第4節の存在証明だけから出てくるのではありません。

## 8. 演習：閉性・境界・極小値を組み立てる

### Level A：一段ずつ条件を確認する

<a id="ex-gmt30-a01"></a>
### GMT30-A01 体積を保つ $L^1$ 収束

- Level: A

可測集合 $E_j,E\subset\mathbb R^d$ の指示関数が $L^1(\mathbb R^d)$ で収束し、$|E_j|=V<\infty$ であるとする。$|E|=V$ を示せ。

<!-- solution-start -->
#### 詳細解答

$L^1$ 収束は $\int|\chi_{E_j}-\chi_E|\to0$ を意味します。積分の三角不等式で

$$
\begin{aligned}
\big||E|-V\big|
&=\left|\int_{\mathbb R^d}(\chi_E-\chi_{E_j})\,dx\right|\\
&\le\int_{\mathbb R^d}|\chi_E-\chi_{E_j}|\,dx
=\|\chi_E-\chi_{E_j}\|_1\longrightarrow0.
\end{aligned}
$$

従って $|E|=V$ です。局所 $L^1$ 収束だけでは全空間の最後のノルムが0へ行かず、結論は一般には成立しません。
<!-- solution-end -->

<a id="ex-gmt30-a02"></a>
### GMT30-A02 固定面積の長方形

- Level: A

$a>0$、$Q_a=(0,a)\times(0,1/a)$ とする。$|Q_a|$、$P(Q_a)$ を求め、長方形の中での最小周長と、全可測集合の同じ面積での最小周長を比較せよ。

<!-- solution-start -->
#### 詳細解答

面積は $|Q_a|=a(1/a)=1$。[GMT24の長方形の直接計算](../GMT24/index.md#ref-gmt24-rectangle-formula)から

$$
P(Q_a)=2\left(a+\frac1a\right).
$$

$(a-1)^2\ge0$ を $a>0$ で割ると $a+1/a\ge2$、等号は $a=1$ です。従って長方形に限ると最小値は4。一方、[GMT29の等周不等式](../GMT29/index.md#thm-gmt29-general-sharp)で $d=2$、$|E|=1$ とすると $P(E)\ge2\sqrt\pi$ で、半径 $1/\sqrt\pi$ の円盤が等号を達成します。$\pi<4$ より $2\sqrt\pi<4$ です。
<!-- solution-end -->

<a id="ex-gmt30-a03"></a>
### GMT30-A03 禁止集合の条件を極限へ移す

- Level: A

可測集合 $H$ と $L^1(\mathbb R^d)$ で収束する集合列 $E_j\to E$ があり、$|E_j\cap H|=0$ である。$|E\cap H|=0$ を示せ。

<!-- solution-start -->
#### 詳細解答

$H$ 上で $\chi_{E_j}=0$ a.e. なので

$$
\begin{aligned}
|E\cap H|
&=\int_H\chi_E\,dx
=\int_H|\chi_E-\chi_{E_j}|\,dx\\
&\le\int_{\mathbb R^d}|\chi_E-\chi_{E_j}|\,dx
\longrightarrow0.
\end{aligned}
$$

非負の左辺は $j$ に依存しないため0です。$H$ に境界の滑らかさや有限周長は不要で、可測性だけを使っています。
<!-- solution-end -->

<a id="ex-gmt30-a04"></a>
### GMT30-A04 逃げる球と体積

- Level: A

$E_j=B_1(je_1)\subset\mathbb R^d$ とする。各 $j$ の体積と周長、および $L^1_{\mathrm{loc}}$ 極限の体積を求めよ。

<!-- solution-start -->
#### 詳細解答

[球の公式](../GMT24/index.md#ref-gmt24-ball-formula)で $|E_j|=\omega_d$、$P(E_j)=d\omega_d$。任意の有界集合 $U\subset B_R(0)$ を固定すると、$j>R+1$ では任意の $x\in E_j$ に $|x|\ge j-1>R$ が成り立ち、$E_j\cap U=\varnothing$ です。従って $\int_U|\chi_{E_j}-0|=0$ となり、局所極限は空集合。その体積は0です。周長有界性は局所コンパクト性を与えますが、全体体積を保つ全空間 $L^1$ 収束は与えません。
<!-- solution-end -->

<a id="ex-gmt30-a05"></a>
### GMT30-A05 容器の壁にある境界

- Level: A

$\Omega=(0,1)^2$、$E=\Omega$ とする。$P(E;\Omega)$ と $P(E)$ を求め、差の理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$\Omega$ 内では $\chi_E=1$ なので、任意の $\varphi\in C_c^1(\Omega;\mathbb R^2)$ に対して $\int_E\operatorname{div}\varphi=\int_\Omega\operatorname{div}\varphi=0$。このため[相対周長の定義](../GMT23/index.md#def-gmt23-relative-perimeter)で $P(E;\Omega)=0$ です。一方、全空間では4辺のジャンプを数え、[長方形の公式](../GMT24/index.md#ref-gmt24-rectangle-formula)より $P(E)=2(1+1)=4$。差は容器境界上の分布微分に由来します。
<!-- solution-end -->

### Level B：二つ以上の論証をつなぐ

<a id="ex-gmt30-b01"></a>
### GMT30-B01 必ず含む集合も閉性で保存する

- Level: B

$K$ はコンパクト、$A\subset K$ は可測、$V<\infty$ とする。$E_j$ は $K$ の外で零、$|A\setminus E_j|=0$、$|E_j|=V$、$\sup_jP(E_j)<\infty$ を満たす。部分列と有限周長集合 $E$ が存在し、$|A\setminus E|=0$、$|E|=V$、$|E\setminus K|=0$ を満たすことを証明せよ。

<!-- solution-start -->
#### 詳細解答

仮定は[共通コンパクト支持の補題](#lem-gmt30-global-l1)の入力そのものなので、部分列で

$$
\|\chi_{E_j}-\chi_E\|_1\to0,\quad
|E\setminus K|=0,\quad P(E)\le\liminf_jP(E_j)<\infty
$$

を得ます。体積について

$$
\big||E|-V\big|
\le\|\chi_E-\chi_{E_j}\|_1\to0.
$$

含む条件は、$A$ 上で $\chi_{E_j}=1$ a.e. なので

$$
|A\setminus E|
=\int_A(1-\chi_E)\,dx
=\int_A|\chi_{E_j}-\chi_E|\,dx
\le\|\chi_{E_j}-\chi_E\|_1\to0.
$$

従って $|E|=V$ かつ $|A\setminus E|=0$ です。支持と周長は補題で確保されます。$A$ の周長有界性は仮定にも使用にも不要です。
<!-- solution-end -->

<a id="ex-gmt30-b02"></a>
### GMT30-B02 固定体積でも境界近傍条件は失われる

- Level: B

$\Omega=(0,1)^2$、$E_j=(1/j,1/2+1/j)\times(0,1)$、$j\ge3$ とする。$|E_j|$、$P(E_j;\Omega)$、$|E_j\triangle E|$ を $E=(0,1/2)\times(0,1)$ に対して計算し、どの制約が極限で失われ、どの下半連続性は保たれるか説明せよ。

<!-- solution-start -->
#### 詳細解答

横幅は $(1/2+1/j)-1/j=1/2$、縦幅は1なので $|E_j|=1/2$。$\Omega$ 内にある垂直境界は $x_1=1/j$ と $x_1=1/2+1/j$ の2本で、それぞれ長さ1。よって $P(E_j;\Omega)=2$ です。

$E_j\setminus E=(1/2,1/2+1/j)\times(0,1)$、$E\setminus E_j=(0,1/j)\times(0,1)$ で互いに交わりません。従って

$$
|E_j\triangle E|=\frac1j+\frac1j=\frac2j\to0.
$$

極限 $E$ の $\Omega$ 内の境界は $x_1=1/2$ だけで $P(E;\Omega)=1$。各 $E_j$ が正の幅の左側帯から離れることは、幅が $1/j$ へ縮むため極限に保存されません。一方

$$
P(E;\Omega)=1\le\liminf_jP(E_j;\Omega)=2
$$

であり[周長の下半連続性](../GMT22/index.md#thm-gmt22-lsc)は破れていません。体積は $1/2$ のままです。
<!-- solution-end -->

<a id="ex-gmt30-b03"></a>
### GMT30-B03 固定外部データの閉性を直接証明する

- Level: B

$\Omega$ は有界開集合、$F$ は有界有限周長集合とする。$E_j$ は全空間で $L^1$ 収束して $E$ に近づき、各 $j$ で $|(E_j\triangle F)\setminus\Omega|=0$ と $|E_j\cap\Omega|=V$ を満たす。この二条件が $E$ に保たれることを、積分の評価で証明せよ。

<!-- solution-start -->
#### 詳細解答

$D=\mathbb R^d\setminus\Omega$ と置きます。$D$ 上で $\chi_{E_j}=\chi_F$ a.e. だから

$$
|(E\triangle F)\setminus\Omega|
=\int_D|\chi_E-\chi_F|\,dx
=\int_D|\chi_E-\chi_{E_j}|\,dx
\le\|\chi_E-\chi_{E_j}\|_1\to0.
$$

また $\Omega$ 内の体積については

$$
\begin{aligned}
\big||E\cap\Omega|-V\big|
&=\left|\int_\Omega(\chi_E-\chi_{E_j})\,dx\right|\\
&\le\int_\Omega|\chi_E-\chi_{E_j}|\,dx
\le\|\chi_E-\chi_{E_j}\|_1\to0.
\end{aligned}
$$

従って外部データと体積は両方とも保たれます。周長下半連続性は、この二条件の保存とは別の段階です。境界上の値を点ごとに比較する操作は行っていません。
<!-- solution-end -->

<a id="ex-gmt30-b04"></a>
### GMT30-B04 体積を罰するだけでは固定できない

- Level: B

$K=\overline{B_2(0)}\subset\mathbb R^2$、$V=\pi$、$0<\lambda<2$ とする。$E\subset K$ をa.e.満たす有限周長集合上で

$$
J_\lambda(E)=P(E)+\lambda\big||E|-\pi\big|
$$

を最小化する。空集合が極小集合であることを示せ。ここでは体積を等号で課していない。

<!-- solution-start -->
#### 詳細解答

$t=|E|\ge0$ と置きます。[Euclid等周不等式](../GMT29/index.md#thm-gmt29-general-sharp)から

$$
J_\lambda(E)\ge2\sqrt{\pi t}+\lambda|t-\pi|=:f(t).
$$

$0\le t\le\pi$ では $f(t)=2\sqrt{\pi t}+\lambda(\pi-t)$ です。平方根は凹関数なので $f$ は区間 $[0,\pi]$ で凹であり、任意の $t$ に対して端点値の小さい方以上です。具体的には $t=(1-\theta)0+\theta\pi$、$\theta=t/\pi$ と書いて

$$
f(t)\ge(1-\theta)f(0)+\theta f(\pi)
\ge\min\{f(0),f(\pi)\}.
$$

$f(0)=\lambda\pi$、$f(\pi)=2\pi$ で、$\lambda<2$ より最小は $\lambda\pi$。$t\ge\pi$ なら

$$
f(t)=2\sqrt{\pi t}+\lambda(t-\pi)\ge2\pi>\lambda\pi.
$$

空集合では $P(\varnothing)=0$、$|\varnothing|=0$ なので $J_\lambda(\varnothing)=\lambda\pi$。従って空集合が大域的極小集合です。**罰則係数を正にするだけでは指定体積 $\pi$ は保証されません**。
<!-- solution-end -->

### Level C：存在・形状・境界の失敗を総合する

<a id="ex-gmt30-c01"></a>
### GMT30-C01 障害物付き円盤問題を最初から解く

- Level: C

$K=\overline{B_2(0)}$、$A=B_{1/2}(0)$、$H=\varnothing$、$V=\pi$ とする。次を示せ。

1. 許容クラスは空でなく、周長最小化列には全空間 $L^1$ 収束する部分列がある。
2. その極限は許容条件を保ち、周長の最小値を達成する。
3. 極小集合をすべて決定し、なぜ一意ではないか説明する。

<!-- solution-start -->
#### 詳細解答

**1. 非空性とコンパクト性。** $B_1(0)$ は $K$ 内にあり $A$ を含み、面積は $\pi$、周長は $2\pi$ なので許容集合です。infimum $m$ は $0\le m\le2\pi$。各 $j$ で $m\le P(E_j)<m+1/j$ を満たす許容集合を取り、$P(E_j)\le2\pi+1$ と評価します。共通支持は $K$ なので[全空間コンパクト性補題](#lem-gmt30-global-l1)を適用して部分列 $E_j\to E_*$ in $L^1(\mathbb R^2)$ を得ます。

**2. 許容性と極小性。** 体積について

$$
\big||E_*|-\pi\big|\le\|\chi_{E_*}-\chi_{E_j}\|_1\to0,
$$

障害物については $A\subset E_j$ a.e. より

$$
|A\setminus E_*|\le\|\chi_{E_*}-\chi_{E_j}\|_1\to0.
$$

共通支持と有限周長は補題から得られるので $E_*$ は許容です。[周長の下半連続性](../GMT24/index.md#thm-gmt24-perimeter-compactness)と $P(E_j)\to m$ から

$$
m\le P(E_*)\le\liminf_jP(E_j)=m.
$$

従って $P(E_*)=m$ です。

**3. 形状の決定。** [Euclid等周不等式](../GMT29/index.md#thm-gmt29-general-sharp)に面積 $|E|=\pi$ を代入すると

$$
P(E)\ge2\sqrt\pi\sqrt{|E|}=2\pi.
$$

単位円盤が等号を達成するので最小値は $m=2\pi$ です。[等号分類](../GMT29/index.md#cor-gmt29-equality)により極小集合は $B_1(z)$ a.e. に限られます。

含有条件 $A\subset B_1(z)$ a.e. は、中心間距離について

$$
|z|+\frac12\le1\quad\Longleftrightarrow\quad|z|\le\frac12
$$

と同値です。この範囲では $|z|+1\le3/2<2$ より容器条件も満たします。従って極小集合の全体は

$$
\{B_1(z):|z|\le1/2\}
$$

であり、異なる中心の球は正の面積の対称差を持つため、極小解は一意ではありません。
<!-- solution-end -->

<a id="ex-gmt30-c02"></a>
### GMT30-C02 外部データ・体積・境界費用を分離する

- Level: C

$\Omega=(0,1)^2$、$F=\varnothing$、$V=1/2$ とする。全空間の有限周長集合のうち、$\Omega$ 外で空、$\Omega$ 内の面積が $1/2$ のものを考える。

1. 全周長 $P(E)$ の極小集合の存在を証明せよ。
2. 相対周長 $P(E;\Omega)$ と全周長が異なる許容集合を一つ示せ。
3. 「各 $E_j$ は左辺から正の幅だけ離れる」という追加条件を課したとき、その幅を列に依存させると $L^1(\Omega)$ 極限で条件が失われ得ることを、面積 $1/2$ の例で示せ。

<!-- solution-start -->
#### 詳細解答

**1. 存在。** $E_0=(0,1/2)\times(0,1)$ は全周長 $P(E_0)=2(1/2+1)=3<\infty$、面積 $1/2$、$\Omega$ 外で空なので許容クラスは非空です。$F=\varnothing$ は有界で有限周長、$\Omega$ は有界開集合です。[固定外部データの存在系](#cor-gmt30-exterior-data)を $V=1/2$ に適用すると極小集合が存在します。これ以上の境界正則性は使いません。

**2. 費用の違い。** 上の $E_0$ の $\Omega$ 内の境界は縦線 $x_1=1/2$ の長さ1だけで、$P(E_0;\Omega)=1$ です。一方全空間では四辺を数えるので $P(E_0)=3$ です。差2は $y=0,1$ の水平辺の合計1と、$x_1=0$ の左辺の長さ1です（各水平辺は長さ $1/2$）。

**3. 閉性の失敗。** $j\ge3$ で

$$
E_j=(1/j,1/2+1/j)\times(0,1)
$$

とします。$|E_j|=1/2$ で、$x_1<1/j$ の帯では空です。ところが

$$
|E_j\triangle E_0|=2/j\to0
$$

なので極限は $E_0$ です。$E_0$ は左辺の任意の正幅の近傍と正の面積で交わるため、追加条件を満たしません。失ったのは「幅を固定しない境界近傍条件」の $L^1$ 閉性であり、最初の**固定外部データ条件**と混同してはいけません。
<!-- solution-end -->

## 9. この講義の到達点と次への橋

周長最小化の直接法は、最小化列・コンパクト性・許容クラスの閉性・下半連続性をつなぐ存在証明でした。共通有界支持があれば全空間 $L^1$ 収束で体積と障害物条件を保てます。外部データを固定する場合は、容器境界の費用を数えるかを目的関数で宣言する必要があります。一方、質量逃避、可変境界層、連結性の非閉性は、同じ証明を無条件に広げられない理由です。

次の GMT31 からは Besicovitch 集合と Kakeya の問題へ進みます。境界の最小化とは別の問いですが、「有限段階の近似から極限集合を構成し、その極限で何が保たれるか」という眼差しはここでも活躍します。
