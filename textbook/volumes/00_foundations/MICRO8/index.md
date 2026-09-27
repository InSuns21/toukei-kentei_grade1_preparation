# MICRO8 Arrow--Debreu 経済

<!-- definition-example-audit: strict -->

MICRO7 では、生産のない純粋交換経済で Walras 均衡の存在を証明しました。そこでは、消費者の所得は自分の初期保有を市場価格で評価した

$$
p\cdot\omega_i
$$

だけでした。

しかし現実の経済では、企業が原材料を投入して財を生産します。そして企業が上げた利潤は、どこかへ消えるのではなく、その企業を所有する家計へ帰属します。

本章では MICRO4 の生産者理論を一般均衡へ戻し、有限個の財・消費者・企業からなる生産経済を一度閉じます。中心となる会計は

$$
\boxed{
\text{家計所得}
=
\text{初期保有の価値}
+
\text{企業利潤の持分}
}
$$

であり、市場清算は

$$
\boxed{
\text{消費総量}
=
\text{初期保有}
+
\text{企業の純生産}
}
$$

へ変わります。

その上で、

$$
\text{企業供給の Berge 正則性}
\longrightarrow
\text{利潤所得を含む需要対応}
\longrightarrow
\text{Kakutani の不動点}
\longrightarrow
\text{市場清算}
$$

をつなぎ、コンパクト凸生産集合のもとで生産を含む均衡の存在を証明します。

---

## 1. 消費者だけでなく企業と企業所有までモデルへ入れる

財が $L$ 種類、消費者が $I$ 人、企業が $J$ 社あるとします。

消費者 $i$ は

- 消費ベクトル $x_i\in\mathbb R_+^L$
- 初期保有 $\omega_i\in\mathbb R_+^L$
- 効用関数 $u_i:\mathbb R_+^L\to\mathbb R$

を持ちます。

企業 $j$ は MICRO4 と同じく、生産可能な純産出ベクトルの集合

$$
Y_j\subset\mathbb R^L
$$

を持ちます。

純産出の成分が正なら市場へ財を供給し、負なら市場から投入財を取り込みます。

さらに、消費者 $i$ が企業 $j$ をどれだけ所有するかを

$$
\theta_{ij}
$$

で表します。

<a id="def-micro8-production-economy"></a>

<!-- formal-statement-start -->
> **定義（Arrow--Debreu 生産経済）**  
> 有限個の財 $L$、消費者 $I$、企業 $J$ に対し、
>
> - 各消費者の効用関数 $u_i:\mathbb R_+^L\to\mathbb R$
> - 各消費者の初期保有 $\omega_i\in\mathbb R_+^L$
> - 各企業の生産集合 $Y_j\subset\mathbb R^L$
> - 企業所有比率 $\theta_{ij}\ge0$
>
> が与えられ、各企業 $j$ について
>
$$
\sum_{i=1}^I\theta_{ij}=1
$$
>
> が成り立つモデルを、ここでは有限次元の **Arrow--Debreu 生産経済**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro8-production-economy -->
**定義の確認**：二財・二消費者・一企業

二財、二消費者、一企業を考えます。

$$
\omega_1=(3,0),
\qquad
\omega_2=(1,1),
$$

$$
Y_1
=
\{(-z,2z):0\le z\le1\}
$$

とします。

企業は第1財を $z$ 単位投入し、第2財を $2z$ 単位生産します。

所有比率を

$$
\theta_{11}=\frac14,
\qquad
\theta_{21}=\frac34
$$

とすれば、

$$
\theta_{11}+\theta_{21}=1
$$

です。

したがって企業利潤の25%は消費者1へ、75%は消費者2へ帰属します。初期保有、生産技術、企業所有の三つがそろっているので、このデータは定義の有限生産経済を構成します。
<!-- definition-example-end -->

企業所有比率は「誰が企業の意思決定をするか」を表す議決権ではありません。本章で必要なのは、**利潤がどの家計へ何割ずつ所得として帰属するか**という会計上の持分です。

---

## 2. 企業利潤は所有者の所得になる

価格を

$$
p\in\mathbb R_+^L\setminus\{0\}
$$

とします。

企業 $j$ の利潤関数は MICRO4 と同じく

$$
\pi_j(p)
=
\sup_{y\in Y_j}p\cdot y
$$

です。

最大化点が存在するとき、企業は

$$
y_j\in
S_j(p)
=
\operatorname*{arg\,max}_{y\in Y_j}p\cdot y
$$

を選びます。

この利潤のうち $\theta_{ij}$ の割合が消費者 $i$ に入ります。

<a id="def-micro8-profit-income"></a>

<!-- formal-statement-start -->
> **定義（企業所有比率・利潤所得）**  
> 各企業 $j$ について
>
$$
\theta_{ij}\ge0,
\qquad
\sum_i\theta_{ij}=1
$$
>
> とする。
>
> 価格 $p$ のもとで消費者 $i$ が受け取る **利潤所得**を
>
$$
r_i(p)
=
\sum_{j=1}^J\theta_{ij}\pi_j(p)
$$
>
> と定める。
>
> 初期保有の市場価値を加えた総所得を
>
$$
m_i(p)
=
p\cdot\omega_i+r_i(p)
=
p\cdot\omega_i
+
\sum_{j=1}^J\theta_{ij}\pi_j(p)
$$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro8-profit-income -->
**定義の確認**：利潤1を4分の1と4分の3へ分ける

前節の企業で価格を

$$
p=(1,1)
$$

とします。

生産計画 $(-z,2z)$ の利潤は

$$
p\cdot(-z,2z)
=
-z+2z
=
z.
$$

したがって $z=1$ が最適で、

$$
y_1^*=(-1,2),
\qquad
\pi_1(p)=1.
$$

消費者1の利潤所得は

$$
r_1(p)
=
\frac14\cdot1
=
\frac14,
$$

消費者2は

$$
r_2(p)
=
\frac34\cdot1
=
\frac34.
$$

初期保有の価値は

$$
p\cdot\omega_1=3,
\qquad
p\cdot\omega_2=2
$$

なので、

$$
m_1(p)=\frac{13}{4},
\qquad
m_2(p)=\frac{11}{4}.
$$
<!-- definition-example-end -->

所有比率を各企業について足すと1なので、企業利潤は家計部門へ過不足なく戻ります。

実際、

$$
\begin{aligned}
\sum_{i=1}^I m_i(p)
&=
p\cdot\sum_i\omega_i
+
\sum_i\sum_j\theta_{ij}\pi_j(p)\\
&=
p\cdot\Omega
+
\sum_j
\left(\sum_i\theta_{ij}\right)\pi_j(p)\\
&=
p\cdot\Omega+\sum_j\pi_j(p),
\end{aligned}
$$

ただし

$$
\Omega=\sum_i\omega_i
$$

です。

この恒等式が、後で導く超過需要の価値恒等式の会計部分になります。

---

## 3. 生産した分だけ、社会全体で使える財が増減する

企業の純生産を

$$
y_1,\dots,y_J
$$

とすると、社会全体で利用できる財は

$$
\Omega+\sum_{j=1}^J y_j
$$

です。

投入財の成分は $y_{j\ell}<0$ なので、その分だけ利用可能量を減らします。産出財の成分は正なので増やします。

<a id="def-micro8-production-feasibility"></a>

<!-- formal-statement-start -->
> **定義（生産を含む実行可能配分）**  
> 消費配分
>
$$
x=(x_1,\dots,x_I),
\qquad
x_i\in\mathbb R_+^L
$$
>
> と生産計画
>
$$
y=(y_1,\dots,y_J),
\qquad
y_j\in Y_j
$$
>
> が
>
$$
\sum_{i=1}^I x_i
\le
\Omega+\sum_{j=1}^J y_j
$$
>
> を成分ごとに満たすとき、$(x,y)$ を **生産を含む実行可能配分**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro8-production-feasibility -->
**定義の確認**：投入財が減り、産出財が増える

前の例では

$$
\Omega
=
(3,0)+(1,1)
=
(4,1),
$$

$$
y_1^*=(-1,2).
$$

したがって生産後に利用できる総量は

$$
\Omega+y_1^*
=
(3,3).
$$

例えば

$$
x_1=(1,2),
\qquad
x_2=(2,1)
$$

なら

$$
x_1+x_2=(3,3)=\Omega+y_1^*
$$

なので実行可能です。

一方、

$$
x_1'=(2,2),
\qquad
x_2'=(2,1)
$$

なら合計は $(4,3)$ となり、第1財を利用可能な3単位より1単位多く消費するため実行不可能です。
<!-- definition-example-end -->

---

## 4. Arrow--Debreu 均衡は三つの最適化・整合条件を同時に満たす

純粋交換経済の Walras 均衡では、

1. 各消費者が予算内で最適化する。
2. 全商品市場が清算する。

の二つが必要でした。

生産経済では、これに

3. 各企業が価格を所与として利潤最大化する。

が加わります。

<a id="def-micro8-equilibrium"></a>

<!-- formal-statement-start -->
> **定義（Arrow--Debreu 均衡）**  
> Arrow--Debreu 生産経済において、
>
$$
p^*\in\mathbb R_+^L\setminus\{0\},
\qquad
x_i^*\in\mathbb R_+^L,
\qquad
y_j^*\in Y_j
$$
>
> が次の三条件を満たすとする。
>
> **消費者最適化**：各 $i$ について
>
$$
x_i^*
\in
\operatorname*{arg\,max}_{x_i\ge0}
\left\{
u_i(x_i):
p^*\cdot x_i\le m_i(p^*)
\right\},
$$
>
> ただし
>
$$
m_i(p^*)
=
p^*\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p^*).
$$
>
> **企業利潤最大化**：各 $j$ について
>
$$
y_j^*
\in
\operatorname*{arg\,max}_{y\in Y_j}
p^*\cdot y.
$$
>
> **商品市場清算**：
>
$$
\sum_i x_i^*
=
\Omega+\sum_j y_j^*.
$$
>
> この $(p^*,x^*,y^*)$ を **Arrow--Debreu 均衡**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro8-equilibrium -->
**定義の確認**：企業利潤が正でも全市場が清算する

これまでの二財二消費者一企業の例で、

$$
u_i(x_1,x_2)
=
\sqrt{x_1}+\sqrt{x_2}
\qquad(i=1,2)
$$

とします。

価格は

$$
p^*=(1,1).
$$

企業は

$$
y_1^*=(-1,2),
\qquad
\pi_1(p^*)=1
$$

を選びます。

所得は既に

$$
m_1=\frac{13}{4},
\qquad
m_2=\frac{11}{4}
$$

と求めました。

価格が等しいので、予算を使い切る条件は

$$
x_{i1}+x_{i2}=m_i.
$$

平方根効用の一階条件は

$$
\frac{1}{2\sqrt{x_{i1}}}
=
\frac{1}{2\sqrt{x_{i2}}},
$$

従って

$$
x_{i1}=x_{i2}.
$$

よって需要は

$$
x_1^*
=
\left(\frac{13}{8},\frac{13}{8}\right),
$$

$$
x_2^*
=
\left(\frac{11}{8},\frac{11}{8}\right).
$$

足すと

$$
x_1^*+x_2^*
=
(3,3).
$$

一方、

$$
\Omega+y_1^*
=
(4,1)+(-1,2)
=
(3,3).
$$

したがって

$$
x_1^*+x_2^*
=
\Omega+y_1^*.
$$

消費者最適化、企業利潤最大化、市場清算の三条件が全て成立するので、これは Arrow--Debreu 均衡です。

企業所有比率は総資源を増やしません。生産計画 $y_1^*$ が実物資源を変え、所有比率は利潤1を誰の購買力へ配るかを変えています。
<!-- definition-example-end -->

---

## 5. 企業供給対応は Berge 最大値定理で安定する

後で均衡存在を示すには、価格が少し動いたとき企業の最適生産が突然制御不能にならないことが必要です。

本章の存在定理では、各生産集合 $Y_j$ を非空コンパクト凸集合と仮定します。

<a id="prop-micro8-firm-regularity"></a>

<!-- formal-statement-start -->
> **命題（企業供給対応と利潤関数の正則性）**  
> $Y_j\subset\mathbb R^L$ が非空コンパクト凸集合とする。
>
> 規格化価格単体
>
$$
\Delta
=
\left\{
p\in\mathbb R_+^L:
\sum_\ell p_\ell=1
\right\}
$$
>
> 上で
>
$$
\pi_j(p)=\max_{y\in Y_j}p\cdot y,
$$
>
$$
S_j(p)
=
\operatorname*{arg\,max}_{y\in Y_j}p\cdot y
$$
>
> と定める。
>
> このとき $\pi_j$ は $\Delta$ 上で連続であり、$S_j$ は非空コンパクト凸値を持つ上半連続対応である。
<!-- formal-statement-end -->

### 証明の見取り図

可行集合 $Y_j$ は価格に依存しない非空コンパクト集合で、目的関数 $(p,y)\mapsto p\cdot y$ は連続です。したがって MICRO7 の需要対応と同じく、FIX3 の [Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)を適用できます。凸値性だけは、生産集合の凸性と目的関数の線形性から別に確認します。

<!-- proof-start -->
### 証明

可行対応を定数対応

$$
\Gamma(p)=Y_j
$$

と見れば、$\Gamma$ は非空コンパクト値で上半連続かつ下半連続です。

目的関数

$$
f(p,y)=p\cdot y
$$

は $\Delta\times Y_j$ 上で連続です。

したがって [Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)より、価値関数

$$
\pi_j(p)=\max_{y\in Y_j}f(p,y)
$$

は連続で、最大化点対応 $S_j$ は非空コンパクト値かつ上半連続です。

残る凸値性を示します。

$$
y^0,y^1\in S_j(p),
\qquad
0\le t\le1
$$

とします。

$Y_j$ は凸なので

$$
y^t=ty^0+(1-t)y^1\in Y_j.
$$

また線形性から

$$
\begin{aligned}
p\cdot y^t
&=
t\,p\cdot y^0+(1-t)\,p\cdot y^1\\
&=
t\pi_j(p)+(1-t)\pi_j(p)\\
&=
\pi_j(p).
\end{aligned}
$$

従って

$$
y^t\in S_j(p).
$$

よって $S_j(p)$ は凸です。$\square$
<!-- proof-end -->

MICRO4 では自由処分性を持つ非有界な生産集合も扱いました。本節のコンパクト性は「生産技術は本質的にコンパクト」という主張ではありません。後の存在証明を有限次元で透明に閉じるための十分条件です。

---

## 6. 生産経済版 Walras の法則は、所有比率の総和1から出る

生産経済の超過需要を

$$
z
=
\sum_i x_i
-
\Omega
-
\sum_j y_j
$$

とします。

純粋交換経済との違いは

$$
-\sum_j y_j
$$

が加わることです。

<a id="prop-micro8-walras-law"></a>

<!-- formal-statement-start -->
> **命題（生産経済版 Walras の法則）**  
> 各企業 $j$ について
>
$$
\sum_i\theta_{ij}=1
$$
>
> とする。
>
> 価格 $p\ne0$ のもとで各企業が利潤最大化し、
>
$$
p\cdot y_j=\pi_j(p),
$$
>
> 各消費者が所得
>
$$
m_i(p)
=
p\cdot\omega_i+\sum_j\theta_{ij}\pi_j(p)
$$
>
> を全て支出して
>
$$
p\cdot x_i=m_i(p)
$$
>
> いるなら、生産経済の超過需要
>
$$
z=\sum_i x_i-\Omega-\sum_jy_j
$$
>
> は
>
$$
p\cdot z=0
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず消費支出を全員分足します。

$$
\begin{aligned}
p\cdot\sum_i x_i
&=
\sum_i p\cdot x_i\\
&=
\sum_i m_i(p)\\
&=
\sum_i
\left(
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p)
\right).
\end{aligned}
$$

初期保有について

$$
\sum_i p\cdot\omega_i
=
p\cdot\Omega.
$$

利潤所得について和の順序を交換すると

$$
\begin{aligned}
\sum_i\sum_j\theta_{ij}\pi_j(p)
&=
\sum_j
\left(\sum_i\theta_{ij}\right)\pi_j(p)\\
&=
\sum_j\pi_j(p).
\end{aligned}
$$

企業が利潤最大化しているので

$$
\pi_j(p)=p\cdot y_j.
$$

従って

$$
p\cdot\sum_i x_i
=
p\cdot\Omega+\sum_jp\cdot y_j.
$$

右辺を左へ移せば

$$
p\cdot
\left(
\sum_i x_i-\Omega-\sum_jy_j
\right)
=
0.
$$

すなわち

$$
p\cdot z=0.
$$

$\square$
<!-- proof-end -->

ここで所有比率の条件

$$
\sum_i\theta_{ij}=1
$$

は単なる記号上の約束ではありません。

この条件がなければ、企業利潤と家計へ渡る利潤所得が一致せず、Walras の法則を支える会計恒等式が壊れます。

---

## 7. 第一厚生定理は企業を入れても「予算を全員分足す」証明になる

純粋交換経済の第一厚生定理では、パレート改善があると全消費者の必要支出を足した値が総資源価値を超えてしまうことを使いました。

生産経済では、代替的な生産計画が資源を増やせるので、さらに

$$
p\cdot y_j'
\le
\pi_j(p)
=
p\cdot y_j^*
$$

という企業の利潤最大化を使います。

<a id="thm-micro8-first-welfare"></a>

<!-- formal-statement-start -->
> **定理（生産を含む第一厚生定理）**  
> $(p^*,x^*,y^*)$ を Arrow--Debreu 均衡とし、各消費者の選好が局所非飽和であるとする。
>
> このとき、別の生産を含む実行可能配分 $(x',y')$ で
>
$$
x_i'\succeq_i x_i^*
\qquad(i=1,\dots,I)
$$
>
> かつ少なくとも一人 $k$ について
>
$$
x_k'\succ_k x_k^*
$$
>
> となるものは存在しない。
>
> 従って均衡消費配分 $x^*$ は、利用可能な生産技術まで含めた意味で パレート効率である。
<!-- formal-statement-end -->

### 証明の見取り図

各消費者について「均衡以上に好ましい束は均衡所得より安く買えない」と示します。少なくとも一人の厳密改善は均衡所得より厳密に高くなります。全員分を足すと必要支出が均衡時の総所得を超えます。

一方、代替生産は企業の利潤最大化を超えられないので、実行可能な代替配分の価値は均衡時の総所得以下です。二つが矛盾します。

<!-- proof-start -->
### 証明

反対に、生産を含む実行可能な $(x',y')$ が均衡配分 $x^*$ を パレート改善すると仮定します。

消費者 $i$ の均衡所得を

$$
m_i^*
=
p^*\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p^*)
$$

とします。

まず

$$
x_i'\succeq_i x_i^*
$$

なら

$$
p^*\cdot x_i'\ge m_i^*
$$

を示します。

もし

$$
p^*\cdot x_i'<m_i^*
$$

なら予算に厳密な余裕があります。

内積は連続なので、$x_i'$ の十分小さい近傍はなお

$$
p^*\cdot x<m_i^*
$$

を満たします。

局所非飽和性により、その近傍の中に

$$
\tilde x_i\succ_i x_i'
\succeq_i x_i^*
$$

となる $\tilde x_i$ を取れます。

しかし $\tilde x_i$ は均衡予算内なので、$x_i^*$ の最適性に矛盾します。

従って

$$
p^*\cdot x_i'\ge m_i^*.
$$

さらに少なくとも一人 $k$ について

$$
x_k'\succ_k x_k^*
$$

です。

もし

$$
p^*\cdot x_k'\le m_k^*
$$

なら $x_k'$ 自身が均衡予算内の厳密改善になり、やはり最適性に矛盾します。

従って

$$
p^*\cdot x_k'>m_k^*.
$$

全消費者について足すと

$$
p^*\cdot\sum_i x_i'
>
\sum_i m_i^*.
$$

所有比率の総和が1なので

$$
\sum_i m_i^*
=
p^*\cdot\Omega+\sum_j\pi_j(p^*).
$$

一方、$(x',y')$ は実行可能なので

$$
\sum_i x_i'
\le
\Omega+\sum_jy_j'.
$$

$p^*\ge0$ より

$$
p^*\cdot\sum_i x_i'
\le
p^*\cdot\Omega+\sum_jp^*\cdot y_j'.
$$

各均衡企業は利潤最大化しているため

$$
p^*\cdot y_j'
\le
\pi_j(p^*).
$$

従って

$$
p^*\cdot\sum_i x_i'
\le
p^*\cdot\Omega+\sum_j\pi_j(p^*)
=
\sum_i m_i^*.
$$

これは先ほどの厳密不等式に矛盾します。

よって パレート改善は存在しません。$\square$
<!-- proof-end -->

この証明でも凸性は使っていません。

第一厚生定理で必要なのは、

- 消費者が共通価格のもとで最適化していること
- 企業が同じ価格のもとで利潤最大化していること
- 利潤が所有者へ過不足なく帰属すること
- 局所非飽和性

です。

---

## 8. 第二厚生定理では、資源価格が同時に企業の支持価格になる

逆向きでは、効率的な配分・生産計画から価格を取り出します。

MICRO5 では、凸な実行可能集合と凹効用のもとで社会計画問題を考え、資源制約の KKT 乗数を共通価格として読みました。

生産を入れると社会計画問題は

$$
\max_{x_i,y_j}
\sum_i\lambda_i u_i(x_i)
$$

subject to

$$
\sum_i x_i
\le
\Omega+\sum_jy_j,
\qquad
x_i\ge0,
\qquad
y_j\in Y_j
$$

となります。

資源制約の乗数を $p$ とすると、$y_j$ に関する最適性条件は

$$
p\cdot y
\le
p\cdot y_j^*
\qquad
(y\in Y_j)
$$

となります。

つまり同じ $p$ が、消費者には財の価格として、企業には生産集合を支える利潤最大化価格として働きます。

<a id="thm-micro8-second-welfare"></a>

<!-- formal-statement-start -->
> **定理（生産経済の第二厚生定理：滑らかな凸版）**  
> 各 $Y_j$ は非空凸集合、各 $u_i$ は凹関数で $\mathbb R_{++}^L$ 上微分可能とする。
>
> 生産を含む パレート効率な $(x^*,y^*)$ が、ある正の厚生重み
>
$$
\lambda_i>0
$$
>
> に対する加重社会計画問題の解であり、
>
$$
x_i^*\in\mathbb R_{++}^L
$$
>
> とする。
>
> また、その社会計画問題に KKT 条件を適用でき、資源制約に対する乗数
>
$$
p\in\mathbb R_{++}^L
$$
>
> が存在するとする。
>
> このとき各企業 $j$ について
>
$$
y_j^*
\in
\operatorname*{arg\,max}_{y\in Y_j}p\cdot y.
$$
>
> さらに任意の企業所有比率 $\theta_{ij}\ge0$、
>
$$
\sum_i\theta_{ij}=1
$$
>
> に対し、一括的所得移転を
>
$$
T_i
=
p\cdot x_i^*
-
\left(
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p)
\right)
$$
>
> と置けば、
>
$$
\sum_iT_i=0
$$
>
> であり、移転後所得
>
$$
m_i'
=
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p)
+
T_i
=
p\cdot x_i^*
$$
>
> のもとで各 $x_i^*$ は消費者 $i$ の最適消費になる。
>
> 従って $(x^*,y^*)$ は、総額ゼロの一括的所得移転の後に価格 $p$ で分権化できる。
<!-- formal-statement-end -->

### 証明の見取り図

社会計画問題の KKT 条件を消費変数と生産変数へ分けて読みます。

消費側では

$$
\lambda_i\nabla u_i(x_i^*)=p
$$

となり、凹性から $x_i^*$ を価格 $p$ で支持できます。

生産側では

$$
p\in N_{Y_j}(y_j^*)
$$

となり、これは企業 $j$ の利潤最大化そのものです。

最後に、均衡の市場清算式と $\pi_j(p)=p\cdot y_j^*$ を代入すると、必要な一括移転の総額が0になります。

<!-- proof-start -->
### 証明

社会計画問題を最小化形式へ直すと、目的関数は

$$
-\sum_i\lambda_i u_i(x_i)
$$

です。

資源制約を

$$
\sum_i x_i-\Omega-\sum_jy_j\le0
$$

と書き、その乗数を $p\ge0$ とします。

仮定により KKT 条件が必要です。

まず $x_i^*\gg0$ なので、消費の非負制約は活性ではありません。

$x_i$ に関する停留条件は

$$
-\lambda_i\nabla u_i(x_i^*)+p=0,
$$

すなわち

$$
p=\lambda_i\nabla u_i(x_i^*).
$$

任意の $x_i\ge0$ に対して、$u_i$ の凹性から

$$
u_i(x_i)
\le
u_i(x_i^*)
+
\nabla u_i(x_i^*)\cdot(x_i-x_i^*).
$$

もし

$$
p\cdot x_i\le p\cdot x_i^*
$$

なら、

$$
\begin{aligned}
\nabla u_i(x_i^*)\cdot(x_i-x_i^*)
&=
\frac{1}{\lambda_i}
p\cdot(x_i-x_i^*)\\
&\le0.
\end{aligned}
$$

従って

$$
u_i(x_i)\le u_i(x_i^*).
$$

よって所得 $p\cdot x_i^*$ の予算集合上で $x_i^*$ は最適です。

次に $y_j$ について考えます。

$y_j\in Y_j$ という凸集合制約を法錐で表すと、KKT 条件は

$$
0\in -p+N_{Y_j}(y_j^*).
$$

従って

$$
p\in N_{Y_j}(y_j^*).
$$

法錐の定義から、任意の $y\in Y_j$ について

$$
p\cdot(y-y_j^*)\le0.
$$

従って

$$
p\cdot y\le p\cdot y_j^*.
$$

すなわち

$$
y_j^*
\in
\operatorname*{arg\,max}_{y\in Y_j}p\cdot y,
$$

かつ

$$
\pi_j(p)=p\cdot y_j^*.
$$

最後に移転総額を計算します。

$$
\begin{aligned}
\sum_iT_i
&=
p\cdot\sum_i x_i^*
-
p\cdot\Omega
-
\sum_i\sum_j\theta_{ij}\pi_j(p)\\
&=
p\cdot\sum_i x_i^*
-
p\cdot\Omega
-
\sum_j\pi_j(p).
\end{aligned}
$$

資源制約の各成分に対する相補性と

$$
p\gg0
$$

から、各資源制約は等号で成立します。従って

$$
\sum_i x_i^*
=
\Omega+\sum_jy_j^*.
$$

従って

$$
\begin{aligned}
\sum_iT_i
&=
\sum_jp\cdot y_j^*
-
\sum_j\pi_j(p)\\
&=0.
\end{aligned}
$$

移転後所得は定義から

$$
m_i'=p\cdot x_i^*.
$$

既に $x_i^*$ がこの所得の予算集合上で最適であることを示したので、消費者最適化・企業利潤最大化・市場清算がそろいます。$\square$
<!-- proof-end -->

この定理で凸性が担うのは、効率点を線形価格で支え、KKT・法錐による価格表示を可能にすることです。

非凸生産技術では、効率的な生産点が存在しても、それを線形価格で企業の利潤最大化点として実装できないことがあります。これは MICRO4 で見た非凸生産集合の支持価格失敗と同じ機構です。

---

## 9. 生産を入れた存在証明では、企業供給も不動点の状態へ加える

ここから本章の主定理です。

MICRO7 の純粋交換経済では状態空間が

$$
\Delta\times K^I
$$

でした。

生産経済では企業の生産計画も同時に固定しなければならないので、

$$
\Delta
\times
K^I
\times
\prod_{j=1}^JY_j
$$

へ広げます。

### 9.1 生産集合から、消費を閉じ込める共通の箱を作る

各 $Y_j$ はコンパクトなので、各財 $\ell$ について

$$
\max_{y\in Y_j}y_\ell
$$

が存在します。

企業 $j$ が第 $\ell$ 財を最大でどれだけ純供給できるかを

$$
r_{j\ell}
=
\max
\left\{
0,\,
\max_{y\in Y_j}y_\ell
\right\}
$$

と置きます。

そして

$$
R_\ell
=
\Omega_\ell+\sum_jr_{j\ell}.
$$

任意の生産計画 $y_j\in Y_j$ について

$$
\Omega_\ell+\sum_jy_{j\ell}
\le
R_\ell.
$$

したがって、どんな生産計画を選んでも社会全体で利用できる第 $\ell$ 財は $R_\ell$ を超えません。

存在証明では消費を

$$
K
=
[0,2R_1]\times\cdots\times[0,2R_L]
$$

へ一時的に切断します。

### 9.2 利潤所得を含む切断予算対応

価格 $p\in\Delta$ に対し

$$
m_i(p)
=
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p)
$$

とします。

切断予算対応を

$$
B_i^K(p)
=
\{x\in K:p\cdot x\le m_i(p)\}
$$

とします。

各 $Y_j$ はコンパクトなので前命題から $\pi_j$ は連続です。従って $m_i$ も連続です。

さらに後の存在定理では

$$
\omega_i\gg0,
\qquad
0\in Y_j
$$

を仮定します。

$0\in Y_j$ なので

$$
\pi_j(p)\ge0.
$$

$p\in\Delta$ と $\omega_i\gg0$ から

$$
p\cdot\omega_i>0.
$$

従って

$$
m_i(p)>0.
$$

また $\omega_i\in K$ であり、

$$
p\cdot\omega_i\le m_i(p)
$$

なので $B_i^K(p)$ は常に非空です。

MICRO7 と同じ点列構成により、この予算対応は非空コンパクト凸値で上半連続・下半連続になります。

境界点

$$
p\cdot x=m_i(p)
$$

に対し $p_n\to p$ とすると、

$$
d_n
=
[p_n\cdot x-m_i(p_n)]_+
\to0,
$$

$$
\varepsilon_n
=
\frac{d_n}{p_n\cdot x}
\to0,
$$

$$
x_n=(1-\varepsilon_n)x
$$

と置けば、十分大きい $n$ で

$$
x_n\in B_i^K(p_n),
\qquad
x_n\to x.
$$

分母が0にならないのは

$$
p\cdot x=m_i(p)>0
$$

だからです。

従って [Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)を適用でき、

$$
D_i^K(p)
=
\operatorname*{arg\,max}_{x\in B_i^K(p)}u_i(x)
$$

は、連続準凹効用のもとで非空コンパクト凸値かつ上半連続になります。

---

## 10. 消費者・企業・競売人を一つの自己対応へまとめる

配分候補 $x=(x_i)_i$ と生産候補 $y=(y_j)_j$ に対し、超過需要を

$$
z(x,y)
=
\sum_i x_i-\Omega-\sum_jy_j
$$

とします。

競売人価格対応を

$$
A(x,y)
=
\operatorname*{arg\,max}_{q\in\Delta}
q\cdot z(x,y)
$$

とします。

MICRO7 と全く同じ理由で、$A$ は非空コンパクト凸値を持つ上半連続対応です。

状態空間を

$$
\mathcal S
=
\Delta
\times
K^I
\times
\prod_{j=1}^JY_j
$$

とします。

自己対応 $\Phi:\mathcal S\rightrightarrows\mathcal S$ を

$$
\begin{aligned}
\Phi(p,x,y)
=
&A(x,y)\\
&\times
\prod_{i=1}^I D_i^K(p)\\
&\times
\prod_{j=1}^J S_j(p)
\end{aligned}
$$

で定めます。

価格から消費者需要と企業供給を選び、その消費・生産から超過需要を計算して競売人が次の価格を選ぶ、という一周です。

---

## 11. コンパクト凸生産集合なら Arrow--Debreu 均衡が存在する

<a id="thm-micro8-existence"></a>

<!-- formal-statement-start -->
> **定理（コンパクト凸生産集合の Arrow--Debreu 均衡の存在）**  
> 財 $L$、消費者 $I$、企業 $J$ は全て有限個とする。
>
> 各消費者について
>
$$
\omega_i\in\mathbb R_{++}^L
$$
>
> であり、効用関数
>
$$
u_i:\mathbb R_+^L\to\mathbb R
$$
>
> は連続、狭義単調、狭義準凹とする。
>
> 各企業について $Y_j\subset\mathbb R^L$ は非空コンパクト凸集合で
>
$$
0\in Y_j
$$
>
> とする。
>
> 企業所有比率は
>
$$
\theta_{ij}\ge0,
\qquad
\sum_i\theta_{ij}=1
$$
>
> を満たすとする。
>
> このとき、規格化価格
>
$$
p^*\in\Delta
$$
>
> を持つ Arrow--Debreu 均衡
>
$$
(p^*,x^*,y^*)
$$
>
> が存在する。
>
> さらに均衡価格は
>
$$
p^*\in\mathbb R_{++}^L
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

証明は MICRO7 の骨格に企業供給を一層加えたものです。

1. コンパクト生産集合から企業供給対応と連続な利潤関数を得る。
2. 利潤所得を含む切断予算対応を作る。
3. Berge 最大値定理で需要対応を安定化する。
4. 価格・消費・生産の直積空間上で Kakutani を使う。
5. 固定点で予算使い切りと企業利潤最大化を足し、生産経済版 Walras の法則を得る。
6. 競売人最適化から全財の超過需要が非正であることを得る。
7. ゼロ価格財なら全消費者が切断上限まで需要するので矛盾し、価格が正になる。
8. 正価格と Walras の法則から全市場清算を得る。
9. 最後に人工的な切断を外す。

<!-- proof-start -->
### 証明

#### 1. 価格・生産・消費のコンパクトな状態空間

価格は

$$
\Delta
=
\left\{
p\in\mathbb R_+^L:
\sum_\ell p_\ell=1
\right\}
$$

へ規格化します。

各 $Y_j$ は非空コンパクト凸です。

前節で定めた $R$ と

$$
K=[0,2R]
$$

も非空コンパクト凸です。

従って

$$
\mathcal S
=
\Delta\times K^I\times\prod_jY_j
$$

は有限次元の非空コンパクト凸集合です。

#### 2. 企業側の対応

前命題より

$$
S_j(p)
=
\operatorname*{arg\,max}_{y\in Y_j}p\cdot y
$$

は非空コンパクト凸値で上半連続です。

また

$$
\pi_j(p)=\max_{y\in Y_j}p\cdot y
$$

は連続です。

$0\in Y_j$ なので

$$
\pi_j(p)\ge0.
$$

#### 3. 消費者の所得と切断予算対応

所得を

$$
m_i(p)
=
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p)
$$

とします。

$\pi_j$ が連続なので $m_i$ も連続です。

また $p\in\Delta$ と $\omega_i\gg0$ より

$$
p\cdot\omega_i>0.
$$

従って

$$
m_i(p)>0.
$$

切断予算対応

$$
B_i^K(p)
=
\{x\in K:p\cdot x\le m_i(p)\}
$$

は、$\omega_i$ 自身を含むので非空です。

$K$ と閉半空間の共通部分なのでコンパクト、かつ凸です。

上半連続性は閉グラフで示せます。

$$
p_n\to p,
\qquad
x_n\to x,
\qquad
p_n\cdot x_n\le m_i(p_n)
$$

なら、内積と $m_i$ の連続性から

$$
p\cdot x\le m_i(p).
$$

下半連続性は前節の縮小構成で示せます。

予算境界上でも

$$
p\cdot x=m_i(p)>0
$$

なので、必要なら

$$
x_n=(1-\varepsilon_n)x
$$

とわずかに原点方向へ縮めて $p_n$ の予算内へ戻せます。

従って $B_i^K$ は両半連続です。

#### 4. 消費者需要対応

$$
D_i^K(p)
=
\operatorname*{arg\,max}_{x\in B_i^K(p)}u_i(x)
$$

とします。

$B_i^K$ は非空コンパクト値で両半連続、$u_i$ は連続なので、[Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)から $D_i^K$ は非空コンパクト値で上半連続です。

$B_i^K(p)$ は凸で $u_i$ は準凹なので、最大化点集合 $D_i^K(p)$ も凸です。

#### 5. 競売人対応

$$
z(x,y)
=
\sum_i x_i-\Omega-\sum_jy_j
$$

とし、

$$
A(x,y)
=
\operatorname*{arg\,max}_{q\in\Delta}
q\cdot z(x,y)
$$

とします。

$\Delta$ は非空コンパクト凸で、目的関数は $(x,y,q)$ に連続かつ $q$ に線形です。

従って [Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)と線形性から、$A$ は非空コンパクト凸値で上半連続です。

#### 6. Kakutani の不動点

自己対応

$$
\Phi(p,x,y)
=
A(x,y)
\times
\prod_iD_i^K(p)
\times
\prod_jS_j(p)
$$

を考えます。

各成分対応が非空コンパクト凸値で上半連続なので、その有限直積である $\Phi$ も同じ性質を持ちます。

したがって [Kakutani 不動点定理](../FIX3/index.md#thm-fix3-kakutani)により、

$$
(p^*,x^*,y^*)\in\mathcal S
$$

で

$$
(p^*,x^*,y^*)
\in
\Phi(p^*,x^*,y^*)
$$

となる点が存在します。

従って

$$
x_i^*\in D_i^K(p^*),
$$

$$
y_j^*\in S_j(p^*),
$$

$$
p^*\in A(x^*,y^*)
$$

です。

#### 7. 固定点で各消費者は予算を使い切る

まず、各 $i$ について

$$
p^*\cdot x_i^*=m_i(p^*)
$$

を示します。

そのため、切断箱の最上端 $2R$ はどの消費者にも丸ごと買えないことを確認します。

各 $j,\ell$ について $y_\ell\le r_{j\ell}$ なので、$p\ge0$ なら

$$
p\cdot y
\le
p\cdot r_j
$$

です。

従って

$$
\pi_j(p)\le p\cdot r_j.
$$

また $0\le\theta_{ij}\le1$ なので

$$
\begin{aligned}
m_i(p)
&=
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p)\\
&\le
p\cdot\Omega+\sum_j\pi_j(p)\\
&\le
p\cdot R.
\end{aligned}
$$

一方、

$$
p\cdot(2R)=2p\cdot R\ge2m_i(p)>m_i(p).
$$

よって

$$
x_i^*\ne2R.
$$

もし

$$
p^*\cdot x_i^*<m_i(p^*)
$$

なら予算に余裕があります。

$x_i^*\ne2R$ なので、少なくとも一つの成分を切断上限を越えない範囲で少し増やせます。

増加量を十分小さく取れば予算内に留まり、狭義単調性によって効用は厳密に上がります。

これは $x_i^*$ の切断予算上の最適性に矛盾します。

従って

$$
p^*\cdot x_i^*=m_i(p^*).
$$

#### 8. 生産経済版 Walras の法則

固定点では各企業が利潤最大化しているので

$$
p^*\cdot y_j^*=\pi_j(p^*).
$$

前命題を適用して、固定点超過需要

$$
z^*
=
\sum_i x_i^*
-
\Omega
-
\sum_jy_j^*
$$

は

$$
p^*\cdot z^*=0
$$

を満たします。

#### 9. 競売人最適化から $z^*\le0$

固定点では

$$
p^*\in A(x^*,y^*).
$$

従って

$$
p^*\cdot z^*
=
\max_{q\in\Delta}q\cdot z^*.
$$

左辺は0です。

単体上の線形最大化では

$$
\max_{q\in\Delta}q\cdot z^*
=
\max_\ell z_\ell^*.
$$

従って

$$
\max_\ell z_\ell^*=0,
$$

すなわち

$$
z_\ell^*\le0
\qquad(\ell=1,\dots,L).
$$

#### 10. ゼロ価格財を排除する

ある財 $\ell$ について

$$
p_\ell^*=0
$$

と仮定します。

この財を増やしても支出は変わりません。

効用は狭義単調なので、切断需要の最適点では各消費者が第 $\ell$ 財を上限まで欲し、

$$
x_{i\ell}^*=2R_\ell
$$

となります。

従って総消費は

$$
\sum_i x_{i\ell}^*
=
2IR_\ell.
$$

一方、$R_\ell$ の定義から

$$
\Omega_\ell+\sum_jy_{j\ell}^*
\le
R_\ell.
$$

したがって

$$
\begin{aligned}
z_\ell^*
&=
\sum_i x_{i\ell}^*
-
\Omega_\ell
-
\sum_jy_{j\ell}^*\\
&\ge
2IR_\ell-R_\ell\\
&=
(2I-1)R_\ell\\
&>0.
\end{aligned}
$$

$\Omega_\ell>0$ なので $R_\ell>0$ です。

これは既に示した

$$
z_\ell^*\le0
$$

に矛盾します。

よって全ての財について

$$
p_\ell^*>0.
$$

すなわち

$$
p^*\gg0.
$$

#### 11. 正価格から全市場清算を得る

今、

$$
p^*\gg0,
\qquad
z^*\le0,
\qquad
p^*\cdot z^*=0.
$$

です。

もしある成分で

$$
z_\ell^*<0
$$

なら、その項

$$
p_\ell^*z_\ell^*
$$

は厳密に負で、他の項も非正です。

従って内積全体が負になり、

$$
p^*\cdot z^*<0
$$

となって矛盾します。

よって

$$
z^*=0.
$$

従って

$$
\sum_i x_i^*
=
\Omega+\sum_jy_j^*.
$$

全商品市場が清算します。

#### 12. 人工的な消費切断を外す

市場清算と $x_i^*\ge0$ から、各成分について

$$
x_{i\ell}^*
\le
\Omega_\ell+\sum_jy_{j\ell}^*
\le
R_\ell
<
2R_\ell.
$$

従って均衡消費は切断境界より十分内側にあります。

もし本来の予算集合に

$$
\tilde x_i\ge0,
\qquad
p^*\cdot\tilde x_i\le m_i(p^*),
$$

かつ

$$
u_i(\tilde x_i)>u_i(x_i^*)
$$

となる束が存在するとします。

$$
x_i(t)
=
(1-t)x_i^*+t\tilde x_i
$$

と置きます。

十分小さい $t>0$ なら、$x_i^*$ が $K$ の上側境界から離れているので

$$
x_i(t)\in K.
$$

予算集合は凸なので

$$
p^*\cdot x_i(t)\le m_i(p^*).
$$

狭義準凹性より

$$
u_i(x_i(t))
>
u_i(x_i^*)
$$

となり、切断問題での最適性に矛盾します。

よって、$x_i^*$ は本来の非切断予算集合でも最適です。

以上より

$$
(p^*,x^*,y^*)
$$

は Arrow--Debreu 均衡です。$\square$
<!-- proof-end -->

---

## 12. 仮定を外すと、どこが壊れるか

### 12.1 所有比率を足して1にならないと、利潤の会計が閉じない

一企業の利潤が

$$
\pi(p)=1
$$

なのに、二消費者の持分が

$$
\theta_1=0.3,
\qquad
\theta_2=0.5
$$

だとします。

家計へ戻る利潤所得は

$$
0.3+0.5=0.8.
$$

企業利潤1のうち0.2がモデル内の誰にも帰属していません。

そのため

$$
\sum_i m_i(p)
=
p\cdot\Omega+0.8
$$

であり、

$$
p\cdot\Omega+\pi(p)
=
p\cdot\Omega+1
$$

とは一致しません。

壊れるのは「所有の意味」だけでなく、生産経済版 Walras の法則へ入る会計恒等式そのものです。

### 12.2 非凸生産集合では企業供給対応の凸値性が壊れる

一企業の生産集合を

$$
Y
=
\{(0,0),(-1,2)\}
$$

とします。

価格を

$$
p=(2,1)
$$

とすると、

$$
p\cdot(0,0)=0,
$$

$$
p\cdot(-1,2)=-2+2=0.
$$

従って両方が利潤最大化点です。

しかし中点

$$
\left(-\frac12,1\right)
$$

は $Y$ に含まれません。

したがって

$$
S(p)
=
\{(0,0),(-1,2)\}
$$

は凸ではありません。

このとき本章の Kakutani 自己対応について、企業供給成分の凸値性を保証できません。

### 12.3 上方へ無限に利潤を増やせる技術では企業最適化自体が存在しない

$$
Y
=
\{(-z,2z):z\ge0\}
$$

とし、

$$
p=(1,1)
$$

とします。

利潤は

$$
p\cdot(-z,2z)
=
z.
$$

従って

$$
\sup_{y\in Y}p\cdot y
=
+\infty.
$$

有限な利潤最大化点はありません。

この場合、

- 企業供給対応 $S(p)$ は空
- 利潤所得 $m_i(p)$ は有限値として定まらない
- Berge 最大値定理のコンパクト可行集合という入口も失う

ので、本章の存在証明は企業側から始められません。

---

# 演習

## Level A

<a id="ex-micro8-a01"></a>

### MICRO8-A01 企業所有から家計所得を計算する

- Level: A
- 目安時間: 15分

二財、二消費者、二企業を考える。

$$
p=(2,1),
$$

$$
\omega_1=(2,1),
\qquad
\omega_2=(1,3),
$$

企業利潤が

$$
\pi_1(p)=4,
\qquad
\pi_2(p)=2
$$

で、所有比率が

$$
(\theta_{11},\theta_{21})
=
\left(\frac14,\frac34\right),
$$

$$
(\theta_{12},\theta_{22})
=
\left(\frac12,\frac12\right)
$$

であるとする。

1. 各消費者の利潤所得を求めよ。
2. 各消費者の総所得を求めよ。
3. 家計総所得が $p\cdot\Omega+\pi_1+\pi_2$ と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

消費者1の利潤所得は

$$
\begin{aligned}
r_1
&=
\frac14\cdot4+\frac12\cdot2\\
&=
1+1\\
&=2.
\end{aligned}
$$

消費者2は

$$
\begin{aligned}
r_2
&=
\frac34\cdot4+\frac12\cdot2\\
&=
3+1\\
&=4.
\end{aligned}
$$

初期保有の市場価値は

$$
p\cdot\omega_1
=
2\cdot2+1\cdot1
=
5,
$$

$$
p\cdot\omega_2
=
2\cdot1+1\cdot3
=
5.
$$

従って

$$
\boxed{m_1=7},
\qquad
\boxed{m_2=9}.
$$

家計総所得は

$$
m_1+m_2=16.
$$

一方、

$$
\Omega
=
(3,4),
$$

なので

$$
p\cdot\Omega
=
2\cdot3+1\cdot4
=
10.
$$

企業利潤を足すと

$$
p\cdot\Omega+\pi_1+\pi_2
=
10+4+2
=
16.
$$

従って

$$
\boxed{
m_1+m_2
=
p\cdot\Omega+\pi_1+\pi_2
}
$$

が確認できました。
<!-- solution-end -->

<a id="ex-micro8-a02"></a>

### MICRO8-A02 生産を含む実行可能性を判定する

- Level: A
- 目安時間: 15分

$$
\Omega=(5,2),
$$

二企業の生産計画が

$$
y_1=(-2,3),
\qquad
y_2=(1,-1)
$$

であるとする。

1. 生産後の利用可能資源を求めよ。
2. 
   $$
   x_1=(2,2),\qquad x_2=(2,2)
   $$
   は実行可能か。
3. 
   $$
   \tilde x_1=(3,2),\qquad \tilde x_2=(2,2)
   $$
   は実行可能か。

<!-- solution-start -->
#### 詳細解答

利用可能資源は

$$
\begin{aligned}
\Omega+y_1+y_2
&=
(5,2)+(-2,3)+(1,-1)\\
&=
(4,4).
\end{aligned}
$$

したがって

$$
\boxed{(4,4)}
$$

です。

最初の配分は

$$
x_1+x_2=(4,4)
$$

なので、利用可能資源とちょうど一致します。

従って実行可能です。

二つ目は

$$
\tilde x_1+\tilde x_2
=
(5,4).
$$

第1財を5単位必要としますが、利用可能量は4単位です。

従って実行不可能です。
<!-- solution-end -->

<a id="ex-micro8-a03"></a>

### MICRO8-A03 生産経済版 Walras の法則を計算で確認する

- Level: A
- 目安時間: 20分

一企業、二消費者で

$$
p=(1,2),
\qquad
\Omega=(4,3),
$$

企業の均衡生産が

$$
y=(-2,2)
$$

であるとする。

企業利潤を求め、家計が予算を全て使い切っているとき、

$$
p\cdot
\left(
\sum_i x_i-\Omega-y
\right)
=0
$$

となることを、総支出だけを使って確認せよ。

<!-- solution-start -->
#### 詳細解答

企業利潤は

$$
\begin{aligned}
\pi(p)
&=
p\cdot y\\
&=
1\cdot(-2)+2\cdot2\\
&=
2.
\end{aligned}
$$

初期保有の総価値は

$$
p\cdot\Omega
=
1\cdot4+2\cdot3
=
10.
$$

企業の全利潤2が所有者へ分配されるので、家計総所得は

$$
10+2=12.
$$

家計が予算を全て使い切るなら

$$
p\cdot\sum_i x_i=12.
$$

一方、

$$
p\cdot(\Omega+y)
=
p\cdot\Omega+p\cdot y
=
10+2
=
12.
$$

従って

$$
\begin{aligned}
p\cdot
\left(
\sum_i x_i-\Omega-y
\right)
&=
p\cdot\sum_i x_i
-
p\cdot(\Omega+y)\\
&=
12-12\\
&=0.
\end{aligned}
$$

よって生産経済版 Walras の法則が確認できました。
<!-- solution-end -->

<a id="ex-micro8-a04"></a>

### MICRO8-A04 有限な線形技術の企業供給を求める

- Level: A
- 目安時間: 20分

$$
Y
=
\{(-z,2z):0\le z\le1\}
$$

とし、価格を

$$
p=(p_1,p_2)\in\mathbb R_+^2
$$

とする。

1. 利潤を $z$ の関数として書け。
2. $2p_2-p_1>0$、$=0$、$<0$ の三場合に、利潤最大化供給集合を求めよ。
3. 等号の場合に供給集合が凸であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

生産計画は

$$
y(z)=(-z,2z).
$$

利潤は

$$
\begin{aligned}
p\cdot y(z)
&=
-p_1z+2p_2z\\
&=
(2p_2-p_1)z.
\end{aligned}
$$

まず

$$
2p_2-p_1>0
$$

なら利潤は $z$ とともに増えるので、

$$
z^*=1,
$$

$$
S(p)=\{(-1,2)\}.
$$

次に

$$
2p_2-p_1<0
$$

なら利潤は $z$ とともに減るので、

$$
z^*=0,
$$

$$
S(p)=\{(0,0)\}.
$$

最後に

$$
2p_2-p_1=0
$$

なら全ての $0\le z\le1$ で利潤は0です。

従って

$$
S(p)
=
\{(-z,2z):0\le z\le1\}
=
Y.
$$

この集合は線分です。

二点 $y(z_0),y(z_1)$ と $0\le t\le1$ を取ると

$$
ty(z_0)+(1-t)y(z_1)
=
y(tz_0+(1-t)z_1).
$$

しかも

$$
0\le tz_0+(1-t)z_1\le1.
$$

従って凸結合も $S(p)$ に入り、供給集合は凸です。
<!-- solution-end -->

---

## Level B

<a id="ex-micro8-b01"></a>

### MICRO8-B01 二財二消費者一企業の均衡を検算する

- Level: B
- 目安時間: 30分

$$
u_i(x_1,x_2)=\sqrt{x_1}+\sqrt{x_2}
\qquad(i=1,2),
$$

$$
\omega_1=(3,0),
\qquad
\omega_2=(1,1),
$$

$$
Y=\{(-z,2z):0\le z\le1\},
$$

$$
\theta_{11}=\frac14,
\qquad
\theta_{21}=\frac34
$$

とする。

価格候補

$$
p=(1,1)
$$

について、

1. 企業の利潤最大化生産と利潤を求めよ。
2. 各消費者の所得を求めよ。
3. 各消費者の需要を求めよ。
4. 市場清算を確認し、Arrow--Debreu 均衡であることを示せ。

<!-- solution-start -->
#### 詳細解答

企業の利潤は

$$
p\cdot(-z,2z)
=
z.
$$

$0\le z\le1$ なので最大は $z=1$ で、

$$
\boxed{y^*=(-1,2)},
$$

$$
\boxed{\pi(p)=1}.
$$

次に所得を計算します。

消費者1は

$$
\begin{aligned}
m_1
&=
p\cdot\omega_1+\frac14\pi(p)\\
&=
3+\frac14\\
&=
\frac{13}{4}.
\end{aligned}
$$

消費者2は

$$
\begin{aligned}
m_2
&=
p\cdot\omega_2+\frac34\pi(p)\\
&=
2+\frac34\\
&=
\frac{11}{4}.
\end{aligned}
$$

価格が $(1,1)$ なので、消費者 $i$ の予算制約は

$$
x_1+x_2\le m_i.
$$

効用は狭義単調なので等号まで使い切ります。

一階条件は

$$
\frac{1}{2\sqrt{x_1}}
=
\frac{1}{2\sqrt{x_2}},
$$

従って

$$
x_1=x_2.
$$

よって

$$
\boxed{
x_1^*
=
\left(\frac{13}{8},\frac{13}{8}\right)
},
$$

$$
\boxed{
x_2^*
=
\left(\frac{11}{8},\frac{11}{8}\right)
}.
$$

集計需要は

$$
\begin{aligned}
x_1^*+x_2^*
&=
\left(
\frac{24}{8},
\frac{24}{8}
\right)\\
&=
(3,3).
\end{aligned}
$$

一方、総初期保有は

$$
\Omega=(4,1),
$$

生産を加えると

$$
\Omega+y^*
=
(4,1)+(-1,2)
=
(3,3).
$$

従って

$$
x_1^*+x_2^*
=
\Omega+y^*.
$$

消費者最適化、企業利潤最大化、商品市場清算の三条件が全て成立するので、

$$
\boxed{
(p,x_1^*,x_2^*,y^*)
}
$$

は Arrow--Debreu 均衡です。
<!-- solution-end -->

<a id="ex-micro8-b02"></a>

### MICRO8-B02 生産を含む第一厚生定理を再現する

- Level: B
- 目安時間: 35分

Arrow--Debreu 均衡 $(p^*,x^*,y^*)$ を考え、各消費者の選好は局所非飽和とする。

生産を含む実行可能な $(x',y')$ が $x^*$ を パレート改善すると仮定し、次を順に示して矛盾を導け。

1. $x_i'\succeq_i x_i^*$ なら $p^*\cdot x_i'\ge m_i^*$。
2. 厳密改善される消費者 $k$ では $p^*\cdot x_k'>m_k^*$。
3. 従って $p^*\cdot\sum_i x_i'>\sum_i m_i^*$。
4. 実行可能性と企業利潤最大化から逆向きの不等式を導け。

<!-- solution-start -->
#### 詳細解答

均衡所得を

$$
m_i^*
=
p^*\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p^*)
$$

とします。

まず

$$
x_i'\succeq_i x_i^*
$$

なのに

$$
p^*\cdot x_i'<m_i^*
$$

と仮定します。

予算に厳密な余裕があるので、$x_i'$ の十分小さい近傍も予算内に入ります。

局所非飽和性から、その近傍に

$$
\tilde x_i\succ_i x_i'
\succeq_i x_i^*
$$

となる点を取れます。

これは均衡予算内で $x_i^*$ より厳密に好まれるため、消費者最適化に矛盾します。

従って

$$
p^*\cdot x_i'\ge m_i^*.
$$

厳密改善される消費者 $k$ では

$$
x_k'\succ_k x_k^*.
$$

もし

$$
p^*\cdot x_k'\le m_k^*
$$

なら $x_k'$ 自身が均衡予算内の厳密改善なので、やはり最適性に矛盾します。

従って

$$
p^*\cdot x_k'>m_k^*.
$$

全員分を足せば少なくとも一項が厳密なので

$$
p^*\cdot\sum_i x_i'
>
\sum_i m_i^*.
$$

一方、実行可能性から

$$
\sum_i x_i'
\le
\Omega+\sum_jy_j'.
$$

$p^*\ge0$ なので

$$
p^*\cdot\sum_i x_i'
\le
p^*\cdot\Omega+\sum_jp^*\cdot y_j'.
$$

均衡企業は利潤最大化しているため

$$
p^*\cdot y_j'
\le
\pi_j(p^*).
$$

従って

$$
p^*\cdot\sum_i x_i'
\le
p^*\cdot\Omega+\sum_j\pi_j(p^*).
$$

所有比率を各企業について足すと1なので

$$
p^*\cdot\Omega+\sum_j\pi_j(p^*)
=
\sum_i m_i^*.
$$

よって

$$
p^*\cdot\sum_i x_i'
\le
\sum_i m_i^*,
$$

となり、先ほどの厳密不等式に矛盾します。

従って均衡配分を パレート改善する実行可能な $(x',y')$ は存在しません。
<!-- solution-end -->

<a id="ex-micro8-b03"></a>

### MICRO8-B03 三つの仮定喪失を診断する

- Level: B
- 目安時間: 30分

次の各ケースで、本章のどの式・定理適用が壊れるか説明せよ。

1. 一企業の利潤が1なのに、所有比率が $0.3$ と $0.5$ しかない。
2. 
   $$
   Y=\{(0,0),(-1,2)\},
   \qquad
   p=(2,1).
   $$
3. 
   $$
   Y=\{(-z,2z):z\ge0\},
   \qquad
   p=(1,1).
   $$

<!-- solution-start -->
#### 詳細解答

### 1. 所有比率の総和が1でない

家計へ帰属する利潤は

$$
0.3\cdot1+0.5\cdot1=0.8.
$$

企業利潤は1なので、0.2が家計所得へ入っていません。

従って

$$
\sum_i m_i
=
p\cdot\Omega+0.8
$$

となり、

$$
p\cdot\Omega+\pi
=
p\cdot\Omega+1
$$

と一致しません。

生産経済版 Walras の法則の会計恒等式が壊れます。

### 2. 非凸生産集合

二つの生産計画の利潤は

$$
p\cdot(0,0)=0,
$$

$$
p\cdot(-1,2)=-2+2=0.
$$

従って両点が利潤最大化点です。

しかし中点

$$
\left(-\frac12,1\right)
$$

は $Y$ にありません。

従って供給集合

$$
S(p)=\{(0,0),(-1,2)\}
$$

は凸ではありません。

本章の Kakutani 自己対応で必要な「各値が凸」という仮定を企業供給成分で保証できません。

### 3. 利潤が無限に増える生産集合

利潤は

$$
p\cdot(-z,2z)=z.
$$

$z$ をいくらでも大きくできるので

$$
\sup_{y\in Y}p\cdot y=+\infty.
$$

利潤最大化点は存在しません。

従って企業供給対応は空になり、有限な利潤所得も定まりません。

さらに $Y$ はコンパクトでないので、本章で企業供給の正則性を得るために使った [Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)のコンパクト可行集合という仮定も失われています。
<!-- solution-end -->

---

## Level C

<a id="ex-micro8-c01"></a>

### MICRO8-C01 生産経済の均衡存在証明を再構成する

- Level: C
- 目安時間: 60分

有限財・有限消費者・有限企業の Arrow--Debreu 生産経済を考える。

各消費者について

$$
\omega_i\gg0
$$

で、効用は連続・狭義単調・狭義準凹とする。

各企業について $Y_j$ は非空コンパクト凸で

$$
0\in Y_j.
$$

所有比率は

$$
\theta_{ij}\ge0,
\qquad
\sum_i\theta_{ij}=1
$$

を満たす。

次を順に示し、Arrow--Debreu 均衡の存在証明を再構成せよ。

1. 企業供給対応 $S_j$ の正則性と利潤関数 $\pi_j$ の連続性を得る。
2. 利用可能資源の一様上界 $R$ と切断集合 $K=[0,2R]$ を作る。
3. 利潤所得を含む $m_i(p)$ が連続かつ正であることを示す。
4. 切断予算対応 $B_i^K$ が非空コンパクト凸値で両半連続であることを説明する。
5. 切断需要対応 $D_i^K$ の必要な性質を得る。
6. 競売人価格対応 $A$ を定義する。
7. 価格・消費・生産をまとめた自己対応 $\Phi$ を作り、Kakutani の仮定を確認する。
8. 固定点で各消費者が予算を使い切ることを示す。
9. 生産経済版 Walras の法則と競売人最適化から $z^*\le0$ を示す。
10. ゼロ価格財を排除して $p^*\gg0$ を示す。
11. 全市場清算を示す。
12. 切断を外して本来の消費者最適化へ戻す。

<!-- solution-start -->
#### 詳細解答

### 1. 企業供給対応

$$
S_j(p)
=
\operatorname*{arg\,max}_{y\in Y_j}p\cdot y,
$$

$$
\pi_j(p)
=
\max_{y\in Y_j}p\cdot y.
$$

$Y_j$ は価格に依存しない非空コンパクト集合で、目的関数 $(p,y)\mapsto p\cdot y$ は連続です。

従って [Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)より、

- $\pi_j$ は連続
- $S_j$ は非空コンパクト値
- $S_j$ は上半連続

です。

さらに $Y_j$ は凸で目的関数は線形なので、二つの最大化点の凸結合も最大化点です。

従って $S_j$ は凸値です。

### 2. 一様な資源上界

各財 $\ell$ について

$$
r_{j\ell}
=
\max
\left\{
0,\max_{y\in Y_j}y_\ell
\right\}
$$

とし、

$$
R_\ell
=
\Omega_\ell+\sum_jr_{j\ell}.
$$

任意の $y_j\in Y_j$ で

$$
y_{j\ell}\le r_{j\ell}
$$

なので

$$
\Omega_\ell+\sum_jy_{j\ell}
\le
R_\ell.
$$

消費切断集合を

$$
K=[0,2R]
$$

とします。

### 3. 利潤所得を含む所得

$$
m_i(p)
=
p\cdot\omega_i
+
\sum_j\theta_{ij}\pi_j(p).
$$

$\pi_j$ は連続なので $m_i$ も連続です。

また $0\in Y_j$ なので

$$
\pi_j(p)\ge0.
$$

$p\in\Delta$ と $\omega_i\gg0$ から

$$
p\cdot\omega_i>0.
$$

従って

$$
m_i(p)>0.
$$

### 4. 切断予算対応

$$
B_i^K(p)
=
\{x\in K:p\cdot x\le m_i(p)\}.
$$

$\omega_i$ は $K$ に入り、

$$
p\cdot\omega_i\le m_i(p)
$$

なので非空です。

コンパクト集合 $K$ と閉半空間の共通部分なのでコンパクトです。

両方が凸なので凸です。

上半連続性は閉グラフで確認します。

$$
p_n\to p,
\qquad
x_n\to x,
\qquad
p_n\cdot x_n\le m_i(p_n)
$$

なら、連続性から

$$
p\cdot x\le m_i(p).
$$

下半連続性では、予算内部の点ならそのまま近い価格でも可行です。

予算境界

$$
p\cdot x=m_i(p)>0
$$

では、

$$
d_n=[p_n\cdot x-m_i(p_n)]_+,
$$

$$
\varepsilon_n=\frac{d_n}{p_n\cdot x},
$$

$$
x_n=(1-\varepsilon_n)x
$$

と置けば

$$
x_n\to x
$$

かつ

$$
p_n\cdot x_n\le m_i(p_n).
$$

従って下半連続です。

### 5. 切断需要対応

$$
D_i^K(p)
=
\operatorname*{arg\,max}_{x\in B_i^K(p)}u_i(x).
$$

可行対応は非空コンパクト値で両半連続、効用は連続なので、[Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)より $D_i^K$ は非空コンパクト値で上半連続です。

狭義準凹性から最大化点は一意であり、特に値集合は凸です。

### 6. 競売人価格対応

$$
z(x,y)
=
\sum_i x_i-\Omega-\sum_jy_j
$$

とし、

$$
A(x,y)
=
\operatorname*{arg\,max}_{q\in\Delta}q\cdot z(x,y).
$$

$\Delta$ は非空コンパクト凸で、目的関数は連続かつ $q$ に線形です。

従って $A$ は非空コンパクト凸値で上半連続です。

### 7. 自己対応と Kakutani

状態空間を

$$
\mathcal S
=
\Delta\times K^I\times\prod_jY_j
$$

とします。

全ての因子が非空コンパクト凸なので $\mathcal S$ も非空コンパクト凸です。

$$
\Phi(p,x,y)
=
A(x,y)
\times
\prod_iD_i^K(p)
\times
\prod_jS_j(p)
$$

と定めます。

各成分対応が非空コンパクト凸値かつ上半連続なので $\Phi$ も同じ性質を持ちます。

[Kakutani 不動点定理](../FIX3/index.md#thm-fix3-kakutani)から

$$
(p^*,x^*,y^*)
\in
\Phi(p^*,x^*,y^*)
$$

となる固定点が存在します。

### 8. 予算使い切り

まず企業利潤を上から評価します。

$r_j=(r_{j1},\dots,r_{jL})$ とすれば、任意の $y\in Y_j$ で

$$
y\le r_j
$$

なので

$$
\pi_j(p)\le p\cdot r_j.
$$

従って

$$
m_i(p)\le p\cdot R.
$$

一方

$$
p\cdot(2R)=2p\cdot R\ge2m_i(p)>m_i(p).
$$

したがって切断箱の最上端 $2R$ は予算外で、最適消費 $x_i^*$ には増やせる成分が少なくとも一つあります。

もし

$$
p^*\cdot x_i^*<m_i(p^*)
$$

なら、その成分を十分小さく増やしても予算内・切断箱内に留まります。

狭義単調性により効用が上がって矛盾します。

従って

$$
p^*\cdot x_i^*=m_i(p^*).
$$

### 9. Walras の法則と $z^*\le0$

企業は固定点で利潤最大化しているので

$$
p^*\cdot y_j^*=\pi_j(p^*).
$$

所有比率の総和が1なので、生産経済版 Walras の法則から

$$
p^*\cdot z^*=0.
$$

また固定点で

$$
p^*\in A(x^*,y^*).
$$

従って

$$
0
=
p^*\cdot z^*
=
\max_{q\in\Delta}q\cdot z^*
=
\max_\ell z_\ell^*.
$$

よって

$$
z^*\le0.
$$

### 10. ゼロ価格の排除

もし

$$
p_\ell^*=0
$$

なら、第 $\ell$ 財を増やしても支出は増えません。

狭義単調性により全消費者が切断上限まで需要し、

$$
x_{i\ell}^*=2R_\ell.
$$

従って

$$
\sum_i x_{i\ell}^*=2IR_\ell.
$$

一方、利用可能資源は

$$
\Omega_\ell+\sum_jy_{j\ell}^*
\le R_\ell.
$$

よって

$$
z_\ell^*
\ge
(2I-1)R_\ell
>0.
$$

これは $z^*\le0$ に矛盾します。

従って

$$
p^*\gg0.
$$

### 11. 市場清算

今、

$$
p^*\gg0,
\qquad
z^*\le0,
\qquad
p^*\cdot z^*=0.
$$

です。

負の超過需要成分が一つでもあれば内積は厳密に負になります。

従って

$$
z^*=0.
$$

すなわち

$$
\sum_i x_i^*
=
\Omega+\sum_jy_j^*.
$$

### 12. 切断を外す

市場清算と非負消費から

$$
x_{i\ell}^*
\le R_\ell<2R_\ell.
$$

従って $x_i^*$ は切断箱の上側境界から離れています。

もし本来の予算集合に

$$
\tilde x_i
$$

があり、

$$
u_i(\tilde x_i)>u_i(x_i^*)
$$

なら、小さい $t>0$ に対し

$$
x_i(t)
=
(1-t)x_i^*+t\tilde x_i
$$

は $K$ に入ります。

予算集合の凸性から予算内でもあります。

狭義準凹性から

$$
u_i(x_i(t))>u_i(x_i^*).
$$

これは切断需要としての $x_i^*$ の最適性に矛盾します。

従って本来の予算集合にもより良い束はなく、$x_i^*$ は非切断問題でも最適です。

以上により

$$
\boxed{
(p^*,x^*,y^*)
}
$$

は Arrow--Debreu 均衡です。
<!-- solution-end -->

---

## 13. この系列で何が一つにつながったか

MICRO1 では選好から始め、MICRO2・MICRO3 で消費者最適化と双対性を学びました。

MICRO4 では企業の生産技術と利潤最大化を独立に学び、MICRO5 では効率性と価格支持を結びました。

MICRO6・MICRO7 では、生産のない交換経済で

$$
\text{個別需要}
+
\text{価格}
+
\text{市場清算}
+
\text{不動点}
$$

をつなぎました。

本章ではさらに、

$$
\boxed{
\text{初期保有}
+
\text{企業生産}
+
\text{企業所有}
+
\text{利潤所得}
+
\text{消費者最適化}
+
\text{企業最適化}
+
\text{市場清算}
}
$$

を同じ有限次元モデルへ入れました。

ここで重要なのは、一般均衡が「全員の最適化を一つの巨大な最適化問題へ置き換えたもの」ではないことです。

各消費者も各企業も自分の問題を解き、価格を通じて別々の最適化が整合し、市場清算で社会全体の物量が一致します。

凸解析は支持価格と KKT を与え、不動点理論は相互依存する最適反応の同時整合を与えます。これで有限財・有限主体のミクロ経済学外伝は、ゲーム理論へ接続できるところまで到達しました。
