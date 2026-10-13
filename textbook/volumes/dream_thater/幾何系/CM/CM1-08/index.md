# CM1-08 積分可能性の計算例・非可積分例

<!-- definition-example-audit: strict -->

## 1. 障害を「計算できる形」にする

[Newlander–Nirenberg定理](../CM1-07/index.md#thm-cm1-07-newlander-nirenberg)は、滑らかな概複素構造 $J$ について $N_J=0$ と局所適合複素座標の存在が同値だと述べる。ただし、零という判定を使いこなすには、座標に依存した係数から $N_J$ を実際に求め、零になる範囲を調べなければならない。

[型別交換子閉性](../CM1-06/index.md#thm-cm1-06-bracket-characterization)を使えば、実 $4\times4$ 行列で $J$ の導関数をすべて計算しなくてもよい。今回は複素二次元の具体的な局所枠を選び、**枠の構成 → 交換子 → 障害の評価 → 必要なら適合座標の構成** の順で計算する。

特に次の二点を区別する。

- $N_J(p)=0$ は一点の情報である。点 $p$ の周りに適合座標があるためには、少なくともある**開近傍全体**で $N_J=0$ が必要である。
- $N_J=0$ が成立したとき、一般定理は座標の**存在**を保証する。ただし座標の具体式は別途求める必要がある。

## 2. 三角型の局所枠が本当に概複素構造を定めるか

$\mathbb C^2$ の補助座標を $(u,v)$ とし、複素偏微分は $u=x+iy$ に対して $\partial_{\bar u}=(\partial_x+i\partial_y)/2$ とする。ここでの $u,v$ は、求めたい $J$ に適合する座標とはまだ仮定しない。

滑らかな複素数値関数 $a=a(u,\bar u,v,\bar v)$ を任意に一つ選び、局所ベクトル場を

$$
Z_1=\partial_{\bar u},\qquad
Z_2=\partial_{\bar v}+a\,\partial_u
$$

と置く。この枠の係数 $a$ を変えるだけで、障害が消える例と消えない例の両方を作れる。

<a id="def-cm1-08-triangular-frame"></a>
<!-- formal-statement-start -->
> **定義（三角型の型別局所枠）**  
> $U\subset\mathbb C^2$ を開集合、$a:U\to\mathbb C$ を滑らかな関数とする。上記の $Z_1,Z_2$ が張る複素階数2の部分束を $D_a\subset T_{\mathbb C}U$ とする。この組を $a$ に対応する **三角型枠** と呼ぶ。対応する実概複素構造は、$D_a$ で固有値 $-i$、その複素共役 $\overline{D_a}$ で固有値 $i$ を持つものとして定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-08-triangular-frame -->
**定義の確認**。$a=0$ なら $Z_1=\partial_{\bar u}$、$Z_2=\partial_{\bar v}$、共役は $\partial_u,\partial_v$ である。四本は複素化接空間の標準基底だから $D_0\oplus\overline{D_0}=T_{\mathbb C}U$ となる。従って $a=0$ は標準複素構造を与える。一般の $a$ でもこの直和は崩れないことを次で確かめる。
<!-- definition-example-end -->

<a id="prop-cm1-08-frame-defines-j"></a>
<!-- formal-statement-start -->
> **命題（三角型枠による概複素構造の構成）**  
> $U\subset\mathbb C^2$ 上の任意の滑らかな $a$ に対し、$D_a$ とその共役は各点で直和分解

$$
T_{\mathbb C}U=D_a\oplus\overline{D_a}
$$

> を与える。したがって、$J|_{D_a}=-iI$、$J|_{\overline{D_a}}=iI$ で定めた写像は、実接束上の滑らかな $J^2=-I$ を満たす概複素構造である。
<!-- formal-statement-end -->

### 証明の見取り図

共役枠を二本書き出すと、四本の場は異なる座標偏微分成分によって線形独立と分かる。$J$ が実接束を保つことは、共役を取っても固有値の指定が矛盾しないことから確認する。

<!-- proof-start -->
### 証明

$a$ の共役を $\bar a$ と記せば

$$
\overline{Z_1}=\partial_u,\qquad
\overline{Z_2}=\partial_v+\bar a\,\partial_{\bar u}.
$$

点 $q\in U$ で複素数 $c_1,c_2,d_1,d_2$ に対し

$$
c_1Z_1+c_2Z_2+d_1\overline{Z_1}
+d_2\overline{Z_2}=0
$$

とする。$\partial_{\bar v}$ 成分を比較すると $c_2=0$、$\partial_v$ 成分から $d_2=0$。残る $\partial_{\bar u}$ 成分から $c_1=0$、$\partial_u$ 成分から $d_1=0$。よって四本は各点で線形独立で、複素次元4の $T_{\mathbb C,q}U$ の基底となる。

直和分解に沿って $JZ_j=-iZ_j$、$J\overline{Z_j}=i\overline{Z_j}$ と線形に定めると、各基底で $J^2=-I$ が成り立つ。また

$$
\overline{JZ_j}=\overline{-iZ_j}
=i\overline{Z_j}=J\overline{Z_j}
$$

であり、共役枠側でも同じ関係が成立する。従って $J$ は複素共役と可換で、共役で固定される実接ベクトルを実接ベクトルへ写す。基底とその逆行列は $a,\bar a$ に滑らかに依存するので $J$ も滑らかである。$\square$
<!-- proof-end -->

この構成では $a$ に大きさの制限も原点での消滅条件も不要である。**局所枠を定められることと、その枠が正則座標から来ることは別問題**である。

## 3. 交換子一つで積分可能性を判定する

[Lie括弧の積の微分則](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)と、座標偏微分の可換性を使う。$Z_1$ の係数は定数なので

$$
\begin{aligned}
[Z_1,Z_2]
&=[\partial_{\bar u},\partial_{\bar v}]
  +[\partial_{\bar u},a\partial_u]\\
&=0+(\partial_{\bar u}a)\partial_u
  +a[\partial_{\bar u},\partial_u]\\
&=(\partial_{\bar u}a)\partial_u.
\end{aligned}
$$

ここで $\partial_u=\overline{Z_1}$ は $J$ の $(1,0)$ 型である。したがって、交換子のうち「戻ってはいけない型」の成分をそのまま読める。

<a id="thm-cm1-08-triangular-criterion"></a>
<!-- formal-statement-start -->
> **定理（三角型枠の積分可能性判定）**  
> 開集合 $U\subset\mathbb C^2$ と滑らかな関数 $a:U\to\mathbb C$ から上記の $J$ を定める。このとき、対応する [Nijenhuisテンソル](../CM1-06/index.md#def-cm1-06-nijenhuis) は

$$
N_J(Z_1,Z_2)=-4(\partial_{\bar u}a)\partial_u
$$

> を満たす。$J$ が $U$ の各点で局所的に積分可能であるための必要十分条件は

$$
\partial_{\bar u}a=0\quad\text{on }U
$$

> である。とくに $p\in U$ の近傍に適合座標が存在するための必要十分条件は、$p$ のある開近傍 $V\subset U$ で $\partial_{\bar u}a\equiv0$ となることである。
<!-- formal-statement-end -->

### 証明の見取り図

[型別交換子とNijenhuisの関係](../CM1-06/index.md#thm-cm1-06-bracket-characterization)の係数 $-4$ に注意する。零条件から局所座標の存在へ進む方向だけは[Newlander–Nirenberg定理](../CM1-07/index.md#thm-cm1-07-newlander-nirenberg)の十分性を使う。

<!-- proof-start -->
### 証明

既に求めた $[Z_1,Z_2]=(\partial_{\bar u}a)\partial_u$ に対し、$\partial_u=\overline{Z_1}$ は $(1,0)$ 型だから、[型射影](../CM1-04/index.md#thm-cm1-04-splitting)で

$$
P^{1,0}[Z_1,Z_2]
=(\partial_{\bar u}a)P^{1,0}(\partial_u)
=(\partial_{\bar u}a)\partial_u.
$$

従って[Nijenhuisの型別公式](../CM1-06/index.md#thm-cm1-06-bracket-characterization)へ $Z=Z_1,W=Z_2$ を代入すると、第一の表示式が従う。

逆に $\partial_{\bar u}a=0$ なら $[Z_1,Z_2]=0$。反対称性から $[Z_1,Z_1]=[Z_2,Z_2]=0$ も成立する。そこで $D_a$ の二つの局所場を次のように置く。

$$
Z=f_1Z_1+f_2Z_2,\qquad W=g_1Z_1+g_2Z_2.
$$

[括弧の積の微分則](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)を各項に適用すると、交換子は

$$
[Z,W]=
\sum_{j,k=1}^{2}f_jg_k[Z_j,Z_k]
+\sum_{k=1}^{2}\bigl(Z(g_k)-W(f_k)\bigr)Z_k.
$$

第一項は枠同士の可換性から零である。第二項は $Z_1,Z_2$ の関数係数線形結合なので、$D_a$ は交換子で閉じる。[閉性との同値](../CM1-06/index.md#thm-cm1-06-bracket-characterization)から $N_J=0$ が従う。

ここで[Newlander–Nirenberg定理](../CM1-07/index.md#thm-cm1-07-newlander-nirenberg)の十分性を適用すると、$U$ の各点近傍に適合座標が存在する。

逆方向は、各点近傍に適合座標があれば[必要条件](../CM1-06/index.md#thm-cm1-06-necessity)でその近傍の $N_J=0$ が従う。特に $N_J(Z_1,Z_2)=0$ なので、各点で $\partial_{\bar u}a=0$。これは $U$ 上の恒等的消滅を意味する。点 $p$ についても同じ議論を近傍 $V$ に制限して適用すればよい。$\square$
<!-- proof-end -->

**ここまでが計算の短縮の核心**である。この特殊な枠では、$a$ の $\bar u$ 方向の偏微分だけが積分可能性を決める。$a$ 自身が零である必要も、$u,v$ の全変数について正則である必要もない。一方、一般の概複素構造にこの一変数の判定式をそのまま当てはめてはいけない。

## 4. 係数が変化しても積分可能な二つの例

判定式で零と分かっても、[適合座標の判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)に必要な、独立な二つの $J$ 正則関数を自分で構成してみたい。三角型の枠では $Z_1z^k=Z_2z^k=0$ を解けばよい。

### 4.1 共役変数の多項式を吸収する

$\lambda\in\mathbb C$ を任意の定数として

$$
a=2\lambda\bar v,\qquad
Z_2=\partial_{\bar v}+2\lambda\bar v\,\partial_u
$$

を選ぶ。$\partial_{\bar u}a=0$ だから $N_J=0$。適合座標の候補を

$$
z^1=u-\lambda(\bar v)^2,\qquad z^2=v
$$

とすると、$Z_1z^1=Z_1z^2=0$ であり

$$
\begin{aligned}
Z_2z^1
&=\partial_{\bar v}\bigl(u-\lambda(\bar v)^2\bigr)
  +2\lambda\bar v\,\partial_u\bigl(u-\lambda(\bar v)^2\bigr)\\
&=-2\lambda\bar v+2\lambda\bar v=0,\\
Z_2z^2&=\partial_{\bar v}v+2\lambda\bar v\,\partial_uv=0.
\end{aligned}
$$

しかも $v=z^2$、$u=z^1+\lambda(\overline{z^2})^2$ という**滑らかな逆写像**がある。従って二関数は退化しない実座標を与え、[適合座標の判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)により $J$ に適合する。

$\lambda\ne0$ なら $z^1$ は補助座標 $(u,v)$ に関して通常の正則関数ではない。しかし補助座標が $J$ に適合するとは仮定していないため矛盾しない。「$J$ 正則」とは **どの複素構造に関する正則性か** を指定した言葉である。

### 4.2 係数に $u$ が現れる例

今度は $\mu\in\mathbb C$ に対して $a=\mu u\bar v$ とする。$a$ は $u$ に依存するが $\partial_{\bar u}a=0$ である。次の候補を選ぶ。

$$
z^1=u\exp\left(-\frac{\mu}{2}(\bar v)^2\right),
\qquad z^2=v.
$$

$\partial_{\bar v}(\bar v)^2=2\bar v$ なので、積の微分則と指数関数の連鎖律から

$$
\begin{aligned}
\partial_{\bar v}z^1
&=-\mu\bar v\,u\exp\left(-\frac{\mu}{2}(\bar v)^2\right),\\
\partial_uz^1
&=\exp\left(-\frac{\mu}{2}(\bar v)^2\right).
\end{aligned}
$$

従って $Z_2z^1=\partial_{\bar v}z^1+\mu u\bar v\,\partial_uz^1=0$。また $Z_1z^1=0$、$Z_1z^2=Z_2z^2=0$。指数関数は零にならず、逆変換が

$$
v=z^2,\qquad
u=z^1\exp\left(\frac{\mu}{2}(\overline{z^2})^2\right)
$$

と書けるため、やはり滑らかな非退化な実座標である。この例では、係数の $u$ 依存性それ自体は積分可能性の障害にならない。

<a id="prop-cm1-08-explicit-families"></a>
<!-- formal-statement-start -->
> **命題（明示的な適合座標の二系列）**  
> $U=\mathbb C^2$ で三角型枠を考え、$\lambda,\mu\in\mathbb C$ を定数とする。$a=2\lambda\bar v$ のとき $z=(u-\lambda(\bar v)^2,v)$、$a=\mu u\bar v$ のとき

$$
z=\left(u e^{-\mu(\bar v)^2/2},\,v\right)
$$

> はいずれも $J$ 適合複素座標を全空間上で与える。
<!-- formal-statement-end -->

### 証明の見取り図

二例とも $Z_1z^k=Z_2z^k=0$ は直前で各項を計算した。逆変換も全点で定義できるため、局所非退化性に加えてこの二例では大域的にも座標になる。

<!-- proof-start -->
### 証明

第一の場合は $z^1=u-\lambda(\bar v)^2$、第二の場合は $z^1=u e^{-\mu(\bar v)^2/2}$ と置く。上記の直接微分でいずれも二つの局所場に消され、$z^2=v$ も両場に消される。第一の逆写像は $(z^1,z^2)\mapsto(z^1+\lambda(\overline{z^2})^2,z^2)$、第二の逆写像は $(z^1,z^2)\mapsto(z^1e^{\mu(\overline{z^2})^2/2},z^2)$ である。いずれも全空間上滑らかで、元の写像との双方向の合成は恒等写像となる。従って実Jacobi行列は全点で可逆であり、[適合座標の関数判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)を適用できる。$\square$
<!-- proof-end -->

## 5. 一点で障害が零でも非可積分な例

積分可能性を調べる際、まず $N_J$ を**どの集合の上で**計算したか確認したい。定数 $\kappa\in\mathbb C$ を取り

$$
a=\kappa(\bar u)^2
$$

と置く。$\partial_{\bar u}a=2\kappa\bar u$ だから

$$
[Z_1,Z_2]=2\kappa\bar u\,\partial_u,\qquad
N_J(Z_1,Z_2)=-8\kappa\bar u\,\partial_u.
$$

$\kappa\ne0$ なら、$u=0$ を満たす各点では $N_J$ が零になる。しかしその任意の開近傍には $u\ne0$ の点があり、そこでは $N_J\ne0$。従って $u=0$ 上の点にも適合座標は存在しない。近傍で正則座標が存在すると仮定すれば、その近傍全体で [正則座標の必要条件](../CM1-06/index.md#thm-cm1-06-necessity)により $N_J=0$ でなければならず、矛盾する。

対照的に $a=2\lambda\bar v$ では $a$ が非定数でも全点で $N_J=0$ であり、前節の適合座標を持つ。**係数が変動するか否かではなく、交換子の逆型成分があるか否か**が判断基準である。

<a id="prop-cm1-08-pointwise-failure"></a>
<!-- formal-statement-start -->
> **命題（一点でのNijenhuis消滅は十分でない）**  
> $\kappa\in\mathbb C\setminus\{0\}$ とし、$\mathbb C^2$ の三角型枠で $a=\kappa(\bar u)^2$ と置く。この $J$ について、$u=0$ の全点で $N_J=0$ であるが、どの点の近傍にも $J$ 適合複素座標は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

$u=0$ での零と近傍での恒等的消滅を混同しない。[局所積分可能性の必要条件](../CM1-06/index.md#thm-cm1-06-necessity)を適用するのは近傍全体である。

<!-- proof-start -->
### 証明

上記の計算で $N_J(Z_1,Z_2)=-8\kappa\bar u\,\partial_u$。$u=0$ 上ではこの成分は零である。共役型の成分も複素共役により零であり、異なる型の組の値は[型別交換子閉性の定理](../CM1-06/index.md#thm-cm1-06-bracket-characterization)で零と分かるので、テンソル全体が零である。

一方 $u\ne0$ なら $\kappa\ne0$ かつ $\partial_u\ne0$ だから $N_J(Z_1,Z_2)\ne0$。任意の点 $p$ の開近傍 $V$ は、$p$ の $u$ 座標が零でも非零でも、$u\ne0$ の点を含む。$V$ に適合座標があれば[必要条件](../CM1-06/index.md#thm-cm1-06-necessity)により $V$ 上で $N_J\equiv0$ となるはずなので矛盾する。$\square$
<!-- proof-end -->

$a=\lambda\bar u$（$\lambda\ne0$）なら $N_J(Z_1,Z_2)=-4\lambda\partial_u$ が全点で非零となり、より単純な非積分可能例になる。一方 $a=\kappa(\bar u)^2$ は、**一点での零判定に頼る誤り**まで可視化できる。

## 6. 実二次元との違いと判定手順

[実二次元の積分可能性](../CM1-07/index.md#cor-cm1-07-complex-dimension-one)では $(0,1)$ 型の独立な局所場が一本だけであり、任意の二切断の括弧が同じ型にとどまる。複素次元二では $Z_1,Z_2$ の相互の交換子に逆型成分が現れ得る。本章の $[Z_1,Z_2]=(\partial_{\bar u}a)\partial_u$ がその最小の例である。

実際に計算するときは、(i) 型別枠とその共役が直和であること、(ii) 交換子を計算し逆型成分を抜き出すこと、(iii) 障害が**近傍全体**で消えるか調べること、(iv) 零なら存在定理を使うか、適合座標を具体的に構成して逆関数を検算すること、という順序で行えばよい。積分可能性を一般定理だけに丸投げせず、計算可能な例では独立な座標関数まで求める。

## 7. 演習

すべての問題で $Z_1=\partial_{\bar u}$、$Z_2=\partial_{\bar v}+a\partial_u$ を使う。$a$ の関数形を指定したら、最初に $\partial_{\bar u}a$ と $[Z_1,Z_2]$ を計算すること。適合座標を主張する問題では、関数が $Z_1,Z_2$ に消されることと実逆変換の存在を**別々に**確かめる。

### Level A

<a id="ex-cm1-08-a01"></a>
#### CM1-08-A01 共役枠の線形独立性
- Level: A

$a:U\to\mathbb C$ を任意の滑らかな関数とし、$Z_1,Z_2,\overline{Z_1},\overline{Z_2}$ が各点で複素線形独立になることを座標成分から示せ。

<!-- solution-start -->
**詳細解答**。共役を取ると $\overline{Z_1}=\partial_u$、$\overline{Z_2}=\partial_v+\bar a\,\partial_{\bar u}$。線形結合 $c_1Z_1+c_2Z_2+d_1\overline{Z_1}+d_2\overline{Z_2}=0$ の $\partial_{\bar v},\partial_v$ 成分を順に比較して $c_2=d_2=0$。その後 $\partial_{\bar u},\partial_u$ 成分から $c_1=d_1=0$。四本が複素化接空間の基底となり、$D_a\oplus\overline{D_a}=T_{\mathbb C}U$。
<!-- solution-end -->

<a id="ex-cm1-08-a02"></a>
#### CM1-08-A02 Wirtinger微分による障害
- Level: A

$a=u+\bar u+(\bar v)^2$ に対し、$\partial_{\bar u}a$、$[Z_1,Z_2]$、$N_J(Z_1,Z_2)$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$u$ と $\bar u$ は Wirtinger 微分で独立な変数として扱う。$\partial_{\bar u}u=0$、$\partial_{\bar u}\bar u=1$、$\partial_{\bar u}(\bar v)^2=0$ なので $\partial_{\bar u}a=1$。従って[交換子の公式](#thm-cm1-08-triangular-criterion)から

$$
[Z_1,Z_2]=\partial_u,\qquad
N_J(Z_1,Z_2)=-4\partial_u.
$$

全点で障害が非零である。
<!-- solution-end -->

<a id="ex-cm1-08-a03"></a>
#### CM1-08-A03 三次式から適合座標を作る
- Level: A

$a=3\lambda(\bar v)^2$、$\lambda\in\mathbb C$ とする。$z^1=u-\lambda(\bar v)^3$、$z^2=v$ が適合座標になることを確かめよ。

<!-- solution-start -->
**詳細解答**。$a$ は $\bar u$ に依存しないから $\partial_{\bar u}a=0$。$\partial_{\bar v}(\bar v)^3=3(\bar v)^2$ を使うと

$$
Z_2z^1=-3\lambda(\bar v)^2+
3\lambda(\bar v)^2\cdot1=0.
$$

$Z_1z^1=Z_1z^2=Z_2z^2=0$ も直接成り立つ。逆変換 $v=z^2,\ u=z^1+\lambda(\overline{z^2})^3$ は滑らかである。従って実Jacobi行列は全点で可逆となり、[関数判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)で適合座標である。
<!-- solution-end -->

<a id="ex-cm1-08-a04"></a>
#### CM1-08-A04 線形な非可積分係数
- Level: A

$a=\lambda\bar u$、$\lambda\in\mathbb C$ とする。$\lambda=0$ と $\lambda\ne0$ の積分可能性を判定せよ。

<!-- solution-start -->
**詳細解答**。$\partial_{\bar u}a=\lambda$ なので $[Z_1,Z_2]=\lambda\partial_u$、$N_J(Z_1,Z_2)=-4\lambda\partial_u$。$\lambda\ne0$ なら各点で非零となり、[必要条件](../CM1-06/index.md#thm-cm1-06-necessity)に反する。$\lambda=0$ なら $a=0$ で標準枠となり、$(z^1,z^2)=(u,v)$ が適合座標になる。
<!-- solution-end -->

<a id="ex-cm1-08-a05"></a>
#### CM1-08-A05 係数の変化と障害の違い
- Level: A

$a=\mu u\bar v$ で $\mu\ne0$ とする。$a$ が非定数でも $N_J=0$ となることを示し、候補 $z^1=u e^{-\mu(\bar v)^2/2}$ の $\partial_{\bar v}$ 微分を求めよ。

<!-- solution-start -->
**詳細解答**。$\partial_{\bar u}u=0$、$\partial_{\bar u}\bar v=0$ なので $\partial_{\bar u}a=0$。よって[判定定理](#thm-cm1-08-triangular-criterion)から $N_J=0$。連鎖律を指数へ適用すれば

$$
\partial_{\bar v}z^1
=u e^{-\mu(\bar v)^2/2}
\left(-\frac{\mu}{2}\cdot2\bar v\right)
=-\mu u\bar v e^{-\mu(\bar v)^2/2}.
$$

一方 $a\partial_uz^1=\mu u\bar v e^{-\mu(\bar v)^2/2}$ で打ち消し合う。
<!-- solution-end -->

### Level B

<a id="ex-cm1-08-b01"></a>
#### CM1-08-B01 障害が超曲面上で消える例
- Level: B

$a=|u|^2=u\bar u$ とする。$N_J$ の零点集合を求め、原点近傍の積分可能性について結論せよ。

<!-- solution-start -->
**詳細解答**。積の微分則から $\partial_{\bar u}(u\bar u)=u\,\partial_{\bar u}\bar u+\bar u\,\partial_{\bar u}u=u$。従って

$$
[Z_1,Z_2]=u\partial_u,\qquad
N_J(Z_1,Z_2)=-4u\partial_u.
$$

零点集合は $\{(u,v):u=0\}$ である。原点では零だが、原点のどの開近傍にも $u\ne0$ の点が含まれ、その点で障害は非零。[適合座標の必要条件](../CM1-06/index.md#thm-cm1-06-necessity)から原点近傍の適合座標は存在しない。
<!-- solution-end -->

<a id="ex-cm1-08-b02"></a>
#### CM1-08-B02 指数関数で座標を構成
- Level: B

$\mu\in\mathbb C$ に対し $a=\mu u\bar v$ とする。$z^1=u e^{-\mu(\bar v)^2/2}$、$z^2=v$ が $J$ 適合座標であることを微分と逆写像の両方から証明せよ。

<!-- solution-start -->
**詳細解答**。$Z_1=\partial_{\bar u}$ なので $Z_1z^1=0$、$Z_1z^2=0$。さらに連鎖律で

$$
\begin{aligned}
Z_2z^1
&=\partial_{\bar v}\bigl(u e^{-\mu(\bar v)^2/2}\bigr)
 +\mu u\bar v\,\partial_u\bigl(u e^{-\mu(\bar v)^2/2}\bigr)\\
&=-\mu u\bar v\,e^{-\mu(\bar v)^2/2}
 +\mu u\bar v\,e^{-\mu(\bar v)^2/2}=0.
\end{aligned}
$$

$Z_2z^2=0$ でもある。指数は非零で、逆写像 $v=z^2,\ u=z^1e^{\mu(\overline{z^2})^2/2}$ は全点で滑らか。したがって実Jacobi行列は可逆であり、[座標判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)が使える。
<!-- solution-end -->

<a id="ex-cm1-08-b03"></a>
#### CM1-08-B03 消滅集合と近傍全体
- Level: B

$a=\bar u\bar v$ とする。$N_J$ が零になる点集合を決め、$v=0$ の点で局所積分可能かどうか調べよ。

<!-- solution-start -->
**詳細解答**。$\partial_{\bar u}a=\bar v$ だから $N_J(Z_1,Z_2)=-4\bar v\,\partial_u$。零点集合は $v=0$ であり、$v=0$ に属する任意の点 $p$ において確かに $N_J(p)=0$ である。しかし任意の開近傍には $v\ne0$ の点がある。そこでは $N_J\ne0$ なので、$p$ の近傍全体に適合座標が存在するという仮定は[必要条件](../CM1-06/index.md#thm-cm1-06-necessity)に矛盾する。従って $v=0$ 上の点でも局所積分可能ではない。
<!-- solution-end -->

<a id="ex-cm1-08-b04"></a>
#### CM1-08-B04 異なる適合座標の間の正則遷移
- Level: B

$a=2\lambda\bar v$ に対し $z^1=u-\lambda(\bar v)^2$、$z^2=v$ とする。さらに $\zeta^1=z^1+(z^2)^2$、$\zeta^2=z^2$ を定める。$\zeta$ も $J$ 適合座標となることを示し、$z$ から $\zeta$ への遷移写像と逆写像が通常の複素正則写像であることを説明せよ。

<!-- solution-start -->
**詳細解答**。先に確認した $Z_jz^k=0$ と積の微分則により

$$
Z_j\zeta^1=Z_jz^1+2z^2Z_jz^2=0,\qquad
Z_j\zeta^2=Z_jz^2=0\quad(j=1,2).
$$

$z$ は滑らかな実座標である。$z$ から $\zeta$ への遷移とその逆は、それぞれ

$
\begin{aligned}
(z^1,z^2)&\longmapsto(z^1+(z^2)^2,\,z^2),\\
(\zeta^1,\zeta^2)&\longmapsto(\zeta^1-(\zeta^2)^2,\,\zeta^2)
\end{aligned}
$

であり、両方とも複素変数の多項式である。従って実逆関数が存在し、[適合座標の判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)から $\zeta$ も適合する。[正則座標変換の座標不変性](../CM1-02/index.md#thm-cm1-02-coordinate-independence)とも一致する。
<!-- solution-end -->

### Level C

<a id="ex-cm1-08-c01"></a>
#### CM1-08-C01 変形族を完全に分類する
- Level: C

$\alpha,\beta\in\mathbb C$ を固定し、$\mathbb C^2$ 上で

$$
a=\alpha u\bar v+\beta(\bar u)^2,\qquad
Z_1=\partial_{\bar u},\quad Z_2=\partial_{\bar v}+a\partial_u
$$

から $J$ を定める。

1. 任意の $\alpha,\beta$ について、これが滑らかな概複素構造になることを示せ。
2. $N_J(Z_1,Z_2)$ を計算し、積分可能となるパラメータ条件を決めよ。
3. $\beta\ne0$ では $u=0$ 上で $N_J=0$ でも、その点の近傍に適合座標が存在しないことを示せ。
4. $\beta=0$ では適合座標を具体的に構成し、実逆変換まで確認せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $a$ は多項式なので滑らかである。共役枠は $\overline{Z_1}=\partial_u$ と $\overline{Z_2}=\partial_v+\bar a\partial_{\bar u}$。四本の線形結合が零なら、$\partial_{\bar v},\partial_v$ 成分の比較で $Z_2,\overline{Z_2}$ の係数が零となり、残る $\partial_{\bar u},\partial_u$ 成分で $Z_1,\overline{Z_1}$ の係数も零となる。よって

$
T_{\mathbb C}\mathbb C^2=D_a\oplus\overline{D_a}
$

となる。この二部分束にそれぞれ $-i,+i$ を掛ける $J$ は共役と可換で実接束を保ち、$J^2=-I$ を満たす。

**(2)** Wirtinger 微分では $\partial_{\bar u}u=0$、$\partial_{\bar u}\bar v=0$、$\partial_{\bar u}(\bar u)^2=2\bar u$。従って

$$
\begin{aligned}
\partial_{\bar u}a&=0+2\beta\bar u,\\
[Z_1,Z_2]&=2\beta\bar u\,\partial_u,\\
N_J(Z_1,Z_2)&=-8\beta\bar u\,\partial_u.
\end{aligned}
$$

$\beta=0$ なら全点で障害が零となり、[判定定理](#thm-cm1-08-triangular-criterion)で積分可能。$\beta\ne0$ なら $u\ne0$ の点で非零なので、全空間上で積分可能とはいえない。

**(3)** $u=0$ では表示成分が零であり、共役型の組も零であり、異なる型の組の値は[型別交換子閉性の定理](../CM1-06/index.md#thm-cm1-06-bracket-characterization)で零となる。しかしその点の任意の開近傍には $u\ne0$ の点があり、そこで $N_J(Z_1,Z_2)\ne0$。もし近傍上で適合座標が存在すれば[必要条件](../CM1-06/index.md#thm-cm1-06-necessity)から近傍全体で $N_J=0$ となって矛盾する。従って一点の消滅は局所積分可能性を保証しない。

**(4)** $\beta=0$ では $a=\alpha u\bar v$。次を選ぶ。

$$
z^1=u\exp\left(-\frac{\alpha}{2}(\bar v)^2\right),
\qquad z^2=v.
$$

$Z_1z^1=Z_1z^2=0$。指数の連鎖律から

$$
\partial_{\bar v}z^1=-\alpha\bar v\,u e^{-\alpha(\bar v)^2/2},
\qquad
a\partial_uz^1=\alpha u\bar v\,e^{-\alpha(\bar v)^2/2}.
$$

両辺の和は零なので $Z_2z^1=0$、さらに $Z_2z^2=0$。逆写像は

$$
v=z^2,\qquad u=z^1\exp\left(\frac{\alpha}{2}(\overline{z^2})^2\right).
$$

指数が零でないため全空間で滑らかな逆写像である。よって実Jacobi行列は可逆で、[適合座標判定](../CM1-07/index.md#prop-cm1-07-coordinate-criterion)により $z$ は $J$ 適合複素座標となる。$\square$
<!-- solution-end -->

## 8. 次に扱う例

ここでは $\mathbb C^2$ 上の $J$ が積分可能かを、局所係数と適合座標で完全に判定した。しかし「局所で適合座標がある」ことと「複素多様体全体が一つの複素座標空間である」ことは異なる。次は、格子で割った商空間に複素構造を入れ、局所の正則性と大域的な幾何の違いを複素トーラスで調べる。
