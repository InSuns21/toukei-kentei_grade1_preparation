# DOPT1 整数計画・LP 緩和

<!-- definition-example-audit: strict -->

線形計画では、実行可能領域が多面体なら連続的に点を動かせました。しかし現実の最適化では、

- 工場を建てるか建てないか
- 車両を何台使うか
- 仕事を誰に割り当てるか

のように、変数そのものが整数でなければ意味を持たない問題が頻繁に現れます。

整数条件を付けると、同じ線形目的関数・線形制約でも問題の性質は大きく変わります。そこで本章では、まず整数条件を外した **LP 緩和**を解き、その値を整数問題の限界値として使う考え方を作ります。

本章の主線は

$$
\boxed{
\text{整数線形計画}
\Longrightarrow
\text{LP 緩和}
\Longrightarrow
\text{下界}
\Longrightarrow
\text{分枝限定}
\Longrightarrow
\text{妥当不等式・切除平面}
}
$$

です。

後続の DOPT2--DOPT4 では、ネットワーク・matching・全単模性を通じて「なぜ LP 緩和だけで整数解が出ることがあるのか」を調べます。本章ではまず、**整数性が一般には自動で得られない**ことを正面から扱います。

---

## 1. 整数線形計画では実行可能集合が離散化する

<a id="def-dopt1-ilp"></a>
<!-- formal-statement-start -->
> **定義（整数線形計画）**  
> $A\in\mathbb R^{m\times n}$、$b\in\mathbb R^m$、$c\in\mathbb R^n$ とする。
>
> $I\subset\{1,\dots,n\}$ を整数条件を課す成分の集合とし、
>
$$
\boxed{
\min c^{\mathsf T}x
\quad
\text{subject to}
\quad
Ax\le b,
\qquad
x_i\in\mathbb Z\ (i\in I)
}
$$
>
> の形の最適化問題を **整数線形計画**という。
>
> $I=\{1,\dots,n\}$ なら純整数線形計画、整数変数と連続変数が混在する場合は混合整数線形計画という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dopt1-ilp -->
**定義の確認**：二つの設備を選ぶ

$$
\min x_1+x_2
$$

subject to

$$
2x_1+2x_2\ge3,
\qquad
x_1,x_2\in\{0,1\}
$$

を考えます。

$x_1,x_2$ は「設備を採用するか」を表す 0--1 変数です。制約を満たす 0--1 点を直接調べると、

$$
(0,0),\ (1,0),\ (0,1)
$$

では左辺がそれぞれ $0,2,2$ で 3 に届きません。したがって実行可能な 0--1 点は

$$
\boxed{(1,1)}
$$

だけです。よって整数最適値は

$$
\boxed{z_{\mathrm{IP}}=2}
$$

です。

線形不等式だけを見ると連続領域が残っていますが、整数条件を課した瞬間、候補点は離散化します。
<!-- definition-example-end -->

この「連続な多面体の中から格子点だけを選ぶ」という違いが、線形計画と整数計画を分けます。

---

## 2. LP 緩和は整数条件だけを外す

<a id="def-dopt1-lp-relaxation"></a>
<!-- formal-statement-start -->
> **定義（LP 緩和）**  
> 整数線形計画
>
$$
\min c^{\mathsf T}x
\quad
\text{subject to}
\quad
x\in P,\qquad x_i\in\mathbb Z\ (i\in I)
$$
>
> を考える。ここで $P\subset\mathbb R^n$ は線形等式・不等式で定まる多面体とする。
>
> 整数条件
>
$$
x_i\in\mathbb Z\qquad(i\in I)
$$
>
> を取り除いて得られる線形計画
>
$$
\boxed{
\min c^{\mathsf T}x
\quad
\text{subject to}
\quad
x\in P
}
$$
>
> を元の整数線形計画の **LP 緩和**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dopt1-lp-relaxation -->
先ほどの 0--1 問題では、$x_i\in\{0,1\}$ を

$$
0\le x_i\le1
$$

へ緩めると

$$
\min x_1+x_2
$$

subject to

$$
2x_1+2x_2\ge3,
\qquad
0\le x_1,x_2\le1
$$

を得ます。

制約は

$$
x_1+x_2\ge\frac32
$$

と同値です。したがって LP 緩和の最適値は

$$
\boxed{
z_{\mathrm{LP}}=\frac32
}
$$

です。

例えば

$$
\left(1,\frac12\right)
$$

は LP 緩和では実行可能ですが、整数問題では許されません。
<!-- definition-example-end -->

LP 緩和の実行可能集合は、整数実行可能点をすべて含む「外側の連続領域」です。

<a id="thm-dopt1-relaxation-bound"></a>
<!-- formal-statement-start -->
> **定理（LP 緩和が与える下界）**  
> 最小化型整数線形計画の整数実行可能集合を $F_{\mathrm{IP}}$、LP 緩和の実行可能集合を $F_{\mathrm{LP}}$ とし、
>
$$
F_{\mathrm{IP}}\subset F_{\mathrm{LP}}
$$
>
> とする。両方の最適値が有限に存在するとき、
>
$$
\boxed{
z_{\mathrm{LP}}\le z_{\mathrm{IP}}
}
$$
>
> が成り立つ。
>
> さらに、LP 緩和の最適解 $x^{\mathrm{LP}}$ が整数条件を満たすなら、
>
$$
x^{\mathrm{LP}}
$$
>
> は整数線形計画の最適解でもあり、
>
$$
z_{\mathrm{LP}}=z_{\mathrm{IP}}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

最小化では、候補集合を広げれば最適値は下がるか同じです。LP 緩和は整数点を捨てずに候補を増やしているので、その最適値は整数最適値以下になります。

<!-- proof-start -->
### 証明

整数最適解を $x^{\mathrm{IP}}$ とします。

$$
x^{\mathrm{IP}}\in F_{\mathrm{IP}}
\subset F_{\mathrm{LP}}
$$

なので、$x^{\mathrm{IP}}$ は LP 緩和でも実行可能です。

LP 緩和の最適性から

$$
z_{\mathrm{LP}}
\le
c^{\mathsf T}x^{\mathrm{IP}}
=
z_{\mathrm{IP}}.
$$

よって

$$
z_{\mathrm{LP}}\le z_{\mathrm{IP}}
$$

です。

さらに LP 最適解 $x^{\mathrm{LP}}$ が整数条件を満たすなら

$$
x^{\mathrm{LP}}\in F_{\mathrm{IP}}.
$$

したがって整数問題の最適性から

$$
z_{\mathrm{IP}}
\le
c^{\mathsf T}x^{\mathrm{LP}}
=
z_{\mathrm{LP}}.
$$

先ほどの不等式と合わせて

$$
z_{\mathrm{IP}}=z_{\mathrm{LP}}.
$$

従って $x^{\mathrm{LP}}$ は整数問題でも最適です。

$\square$
<!-- proof-end -->

最大化問題では不等号の向きが逆になり、LP 緩和は **上界**を与えます。この向きを取り違えないことが重要です。

---

## 3. 整数包は「理想的な LP 緩和」である

整数問題で本当に欲しいのは格子点そのものですが、線形目的関数だけを見るなら、それらの凸包まで広げても最適値は変わりません。

<a id="def-dopt1-integer-hull"></a>
<!-- formal-statement-start -->
> **定義（整数包）**  
> 多面体 $P\subset\mathbb R^n$ と整数条件を課す成分集合 $I$ に対し、
>
$$
S
=
\{x\in P:x_i\in\mathbb Z\ (i\in I)\}
$$
>
> と置く。
>
> このとき
>
$$
\boxed{
P_I
=
\operatorname{conv}(S)
}
$$
>
> を $P$ の整数条件 $I$ に関する **整数包**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dopt1-integer-hull -->
先ほどの 0--1 問題では整数実行可能点が $(1,1)$ だけなので、

$$
P_I
=
\operatorname{conv}\{(1,1)\}
=
\{(1,1)\}.
$$

一方、元の LP 緩和は

$$
P=
\left\{
(x_1,x_2)\in[0,1]^2:
x_1+x_2\ge\frac32
\right\}
$$

であり、

$$
\left(1,\frac12\right)\in P
$$

ですが

$$
\left(1,\frac12\right)\notin P_I.
$$

したがって、この例では LP 緩和と整数包の間に明確な隙間があります。
<!-- definition-example-end -->

<a id="thm-dopt1-integer-hull-equivalence"></a>
<!-- formal-statement-start -->
> **定理（線形目的関数は整数包上で同じ最適値を持つ）**  
> 空でない集合 $S\subset\mathbb R^n$ と $c\in\mathbb R^n$ を考える。
> $c^{\mathsf T}x$ の $S$ 上の最小値が存在するとする。
>
> このとき
>
$$
\boxed{
\min_{x\in S}c^{\mathsf T}x
=
\min_{x\in\operatorname{conv}(S)}c^{\mathsf T}x
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

凸包の点は元の点の凸結合です。線形目的関数は凸結合をそのまま目的値の凸結合へ移すため、元の最小値より小さい値は作れません。

<!-- proof-start -->
### 証明

$$
m=\min_{x\in S}c^{\mathsf T}x
$$

と置きます。

$S\subset\operatorname{conv}(S)$ なので

$$
\min_{x\in\operatorname{conv}(S)}c^{\mathsf T}x
\le m.
$$

逆向きを示します。

任意の

$$
y\in\operatorname{conv}(S)
$$

を取ります。凸包の定義から、ある $x^{(1)},\dots,x^{(r)}\in S$ と

$$
\lambda_k\ge0,
\qquad
\sum_{k=1}^r\lambda_k=1
$$

が存在して

$$
y=\sum_{k=1}^r\lambda_kx^{(k)}
$$

と書けます。

線形性より

$$
c^{\mathsf T}y
=
\sum_{k=1}^r
\lambda_k c^{\mathsf T}x^{(k)}.
$$

各 $x^{(k)}\in S$ なので

$$
c^{\mathsf T}x^{(k)}\ge m.
$$

従って

$$
c^{\mathsf T}y
\ge
\sum_{k=1}^r\lambda_km
=
m.
$$

よって凸包上でも $m$ より小さい値は得られません。

以上から

$$
\min_{x\in\operatorname{conv}(S)}c^{\mathsf T}x
=
m.
$$

$\square$
<!-- proof-end -->

つまり整数計画の難しさは、「線形目的関数」よりも **整数包を明示的に記述すること**にあります。

後続の DOPT4 では、ネットワーク行列や全単模行列のように、最初から LP 多面体の極点が整数になり、LP 緩和が整数包そのものになる構造を調べます。

---

## 4. 整数性ギャップは緩和の弱さを数値化する

<a id="def-dopt1-integrality-gap"></a>
<!-- formal-statement-start -->
> **定義（整数性ギャップ）**  
> 最小化型整数線形計画について、有限な最適値
>
$$
z_{\mathrm{LP}}\le z_{\mathrm{IP}}
$$
>
> が存在するとする。
>
> **加法的整数性ギャップ**を
>
$$
\boxed{
g_{\mathrm{add}}
=
z_{\mathrm{IP}}-z_{\mathrm{LP}}
}
$$
>
> と定める。
>
> さらに
>
$$
0<z_{\mathrm{LP}}\le z_{\mathrm{IP}}
$$
>
> のとき、**比率型整数性ギャップ**を
>
$$
\boxed{
g_{\mathrm{ratio}}
=
\frac{z_{\mathrm{IP}}}{z_{\mathrm{LP}}}
}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dopt1-integrality-gap -->
最初の 0--1 問題では

$$
z_{\mathrm{IP}}=2,
\qquad
z_{\mathrm{LP}}=\frac32.
$$

従って

$$
g_{\mathrm{add}}
=
2-\frac32
=
\boxed{\frac12},
$$

$$
g_{\mathrm{ratio}}
=
\frac{2}{3/2}
=
\boxed{\frac43}.
$$

比率型は最適値の符号や 0 の扱いに注意が必要です。そのため、文脈によっては加法的ギャップだけを使います。
<!-- definition-example-end -->

### 4.1 gap はいくらでも大きくなり得る

正整数 $M$ に対して

$$
\min x
$$

subject to

$$
Mx\ge1,
\qquad
x\in\mathbb Z_{\ge0}
$$

を考えます。

整数問題では

$$
x\ge1
$$

なので

$$
z_{\mathrm{IP}}=1.
$$

LP 緩和では

$$
x\ge\frac1M
$$

なので

$$
z_{\mathrm{LP}}=\frac1M.
$$

従って比率型 gap は

$$
\boxed{
\frac{z_{\mathrm{IP}}}{z_{\mathrm{LP}}}
=
M
}
$$

です。

$M$ を大きくすれば gap はいくらでも大きくできます。

これは「LP 緩和を解けば整数問題もほぼ解ける」と一般には言えないことを示します。重要なのは **どんな線形不等式で緩和を記述するか**です。

---

## 5. 同じ整数問題でも LP 緩和の強さは変わる

同じ整数実行可能集合を表す二つの定式化があっても、整数条件を外した後の領域は同じとは限りません。

<a id="prop-dopt1-relaxation-dominance"></a>
<!-- formal-statement-start -->
> **命題（強い緩和ほど最小化下界は高い）**  
> 同じ整数実行可能集合 $S$ を含む二つの LP 緩和
>
$$
S\subset P_1\subset P_2
$$
>
> を考える。
>
> 線形目的関数 $c^{\mathsf T}x$ の各緩和上の有限最適値を
>
$$
z_1=\min_{x\in P_1}c^{\mathsf T}x,
\qquad
z_2=\min_{x\in P_2}c^{\mathsf T}x
$$
>
> とすると
>
$$
\boxed{
z_2\le z_1\le z_{\mathrm{IP}}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
P_1\subset P_2
$$

なので、候補点の多い $P_2$ 上の最小値は

$$
z_2\le z_1
$$

です。

また

$$
S\subset P_1
$$

なので、LP 緩和の下界定理から

$$
z_1\le z_{\mathrm{IP}}.
$$

従って

$$
z_2\le z_1\le z_{\mathrm{IP}}.
$$

$\square$
<!-- proof-end -->

最小化問題では、整数最適値へ近い **高い下界**を出す緩和ほど強い、と読みます。

---

## 6. 分枝は整数解集合を失わずに二つへ分ける

LP 緩和の最適解に分数成分が現れたら、その成分を整数になるように場合分けします。

<a id="def-dopt1-branching-disjunction"></a>
<!-- formal-statement-start -->
> **定義（整数変数に対する分枝）**  
> 整数条件
>
$$
x_j\in\mathbb Z
$$
>
> を持つ変数について、LP 緩和解が
>
$$
x_j^*=\alpha\notin\mathbb Z
$$
>
> であったとする。
>
> このとき
>
$$
\boxed{
x_j\le\lfloor\alpha\rfloor
\qquad\text{または}\qquad
x_j\ge\lceil\alpha\rceil
}
$$
>
> の二つに問題を分ける操作を **分枝**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dopt1-branching-disjunction -->
LP 解で

$$
x_2^*=\frac12
$$

なら、整数解は必ず

$$
x_2\le0
$$

または

$$
x_2\ge1
$$

のどちらかに属します。

整数値 $x_2$ が $0$ と $1$ の間に存在しないためです。
<!-- definition-example-end -->

<a id="lem-dopt1-branch-partition"></a>
<!-- formal-statement-start -->
> **補題（分枝は整数実行可能解を保存する）**  
> $x_j\in\mathbb Z$ とし、$\alpha\notin\mathbb Z$ とする。
>
> 任意の整数実行可能解 $x$ は
>
$$
x_j\le\lfloor\alpha\rfloor
$$
>
> または
>
$$
x_j\ge\lceil\alpha\rceil
$$
>
> の少なくとも一方を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

整数 $x_j$ が

$$
x_j>\lfloor\alpha\rfloor
$$

を満たすなら、$x_j$ は整数なので

$$
x_j\ge\lfloor\alpha\rfloor+1.
$$

$\alpha\notin\mathbb Z$ だから

$$
\lceil\alpha\rceil
=
\lfloor\alpha\rfloor+1.
$$

従って

$$
x_j\ge\lceil\alpha\rceil.
$$

よってどちらか一方には必ず属します。

$\square$
<!-- proof-end -->

分枝は LP の分数点を排除しつつ、整数解を取りこぼしません。

---

## 7. 分枝限定法：LP 下界で探索木を刈る

<a id="def-dopt1-branch-and-bound"></a>
<!-- formal-statement-start -->
> **定義（分枝限定法）**  
> 最小化型整数線形計画に対し、各節点で LP 緩和を解き、その最適値をその節点以下の整数解に対する下界として用いる。
>
> 分数整数変数があれば分枝し、次のいずれかを満たす節点を探索から除く方法を **分枝限定法**という。
>
> 1. LP 緩和が実行不能である。
> 2. LP 緩和の下界が、既知の整数実行可能解の目的値以上である。
> 3. LP 緩和解が整数条件を満たし、その節点の最良整数解が確定した。
>
> また、探索中に得られている整数実行可能解のうち目的値が最小のものを **暫定最良解**といい、その目的値を **上界**という。
<!-- formal-statement-end -->

最小化問題では

$$
\boxed{
\text{LP 下界}
\le
\text{未知の整数最適値}
\le
\text{暫定最良解の値}
}
$$

という挟み撃ちを作ります。

### 7.1 具体例：二変数 0--1 問題を最後まで枝分かれする

再び

$$
\min x_1+x_2
$$

subject to

$$
2x_1+2x_2\ge3,
\qquad
x_1,x_2\in\{0,1\}
$$

を解きます。

根節点の LP 緩和は

$$
x_1+x_2\ge\frac32,
\qquad
0\le x_1,x_2\le1
$$

です。

例えば LP 最適解として

$$
x^{(0)}
=
\left(1,\frac12\right)
$$

を取り、

$$
L_0=\frac32
$$

を得ます。

$x_2=1/2$ で分枝します。

### 左枝：$x_2\le0$

0--1 上界と合わせて

$$
x_2=0.
$$

すると制約は

$$
2x_1\ge3
$$

ですが

$$
x_1\le1
$$

なので不可能です。左枝は LP 実行不能として刈れます。

### 右枝：$x_2\ge1$

0--1 上界と合わせて

$$
x_2=1.
$$

残りは

$$
2x_1+2\ge3
$$

なので

$$
x_1\ge\frac12.
$$

この節点の LP 最適解は

$$
\left(\frac12,1\right)
$$

で、下界は再び

$$
\frac32.
$$

$x_1=1/2$ で分枝します。

- $x_1\le0$ は $2x_1+2x_2\ge3$ を満たせず実行不能。
- $x_1\ge1$ では $(1,1)$ を得て目的値 2。

したがって暫定最良解

$$
U=2
$$

を得ます。他に未処理節点はないので

$$
\boxed{
x^*=(1,1),
\qquad
z_{\mathrm{IP}}=2
}
$$

です。

単に全列挙したのではなく、各節点の LP が「この先にもっと良い整数解がある可能性」を数値で判定しています。

<a id="thm-dopt1-branch-and-bound-correctness"></a>
<!-- formal-statement-start -->
> **定理（有限整数領域に対する分枝限定法の正当性）**  
> 最小化型整数線形計画を考え、整数変数が取り得る値の集合が有限であるとする。
>
> 各節点で LP 緩和を正確に解き、
>
> - LP 実行不能なら節点を除く。
> - LP 下界が現在の暫定最良値 $U$ 以上なら節点を除く。
> - LP 解が整数実行可能なら暫定最良解を必要に応じて更新し、その節点を終端する。
> - それ以外では分数整数変数について
>
$$
x_j\le\lfloor x_j^*\rfloor
\qquad\text{または}\qquad
x_j\ge\lceil x_j^*\rceil
$$
>
> に分枝する。
>
> この手続きを未処理節点がなくなるまで行えば、最後の暫定最良解は元の整数線形計画の最適解である。
<!-- formal-statement-end -->

### 証明の見取り図

分枝は整数解を取りこぼしません。刈り込みで捨てる節点も、実行不能か、現在の暫定解より良くなれない節点だけです。有限性により探索は最終的に尽きます。

<!-- proof-start -->
### 証明

まず、分枝補題により、親節点に属する任意の整数実行可能解は二つの子節点の少なくとも一方へ必ず入ります。従って分枝そのものでは整数実行可能解を失いません。

次に刈り込みを確認します。

LP 実行不能な節点には、その LP 実行可能集合の部分集合である整数実行可能集合も存在しません。

LP 下界を $L$ とし

$$
L\ge U
$$

なら、その節点内の任意の整数実行可能解 $x$ について、LP 緩和の下界定理から

$$
c^{\mathsf T}x\ge L\ge U.
$$

したがって現在の暫定最良解より良い整数解はその節点にありません。

LP 最適解が整数実行可能なら、その節点では LP 最適値と整数最適値が一致するので、その節点をさらに分枝する必要はありません。

整数変数が取り得る値は有限であり、分枝のたびに少なくとも一つの整数変数の許容範囲を真に狭めるので、同じ整数候補を無限に分け続けることはできません。従って探索木は有限です。

未処理節点がなくなった時点で、元の整数実行可能解は

- 暫定最良解として保持されているか、
- 実行不能な節点には属し得ないか、
- 目的値が $U$ 以上と証明された節点に属するか、

のいずれかです。

したがって $U$ より小さい目的値を持つ整数実行可能解は存在せず、最後の暫定最良解は大域最適です。

$\square$
<!-- proof-end -->

この定理で本質的なのは、LP 緩和が「近似解」を返すことではなく、**探索を安全に捨てるための証明可能な下界を返すこと**です。

---

## 8. 妥当不等式は整数解を残したまま LP を狭める

分枝は問題を複数に分けます。もう一つの方法は、整数解に対して必ず成り立つ追加不等式を作り、分数点だけを切り落とすことです。

<a id="def-dopt1-valid-inequality"></a>
<!-- formal-statement-start -->
> **定義（妥当不等式・切除平面）**  
> 整数実行可能集合を $S$ とする。
>
> 線形不等式
>
$$
a^{\mathsf T}x\le\beta
$$
>
> がすべての $x\in S$ で成り立つとき、この不等式を $S$ に対する **妥当不等式**という。
>
> さらに、現在の LP 緩和解 $\bar x$ が
>
$$
a^{\mathsf T}\bar x>\beta
$$
>
> を満たすなら、この妥当不等式を $\bar x$ に対する **切除平面**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dopt1-valid-inequality -->
最初の 0--1 問題では、整数実行可能点は $(1,1)$ だけです。

したがって

$$
x_1+x_2\ge2
$$

は整数実行可能集合に対する妥当不等式です。

一方、LP 緩和解

$$
\left(1,\frac12\right)
$$

では

$$
1+\frac12
=
\frac32
<2
$$

なので、この不等式は現在の分数解を切り落とします。

しかも整数点 $(1,1)$ は残ります。
<!-- definition-example-end -->

<a id="prop-dopt1-valid-cut-bound"></a>
<!-- formal-statement-start -->
> **命題（妥当不等式の追加は整数解を変えず下界を弱めない）**  
> 最小化型整数線形計画の整数実行可能集合を $S$、現在の LP 緩和を $P$ とし、
>
$$
S\subset P
$$
>
> とする。
>
> $a^{\mathsf T}x\le\beta$ が $S$ に対する妥当不等式で、
>
$$
P'
=
P\cap\{x:a^{\mathsf T}x\le\beta\}
$$
>
> と置く。
>
> このとき
>
> 1. $S\subset P'$ であり、整数実行可能解は一つも失われない。
> 2. LP 最適値を $z_{\mathrm{LP}}$、追加後を $z'_{\mathrm{LP}}$ とすれば
>
$$
\boxed{
z_{\mathrm{LP}}
\le
z'_{\mathrm{LP}}
\le
z_{\mathrm{IP}}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

妥当不等式はすべての $x\in S$ で成り立つので

$$
S
\subset
\{x:a^{\mathsf T}x\le\beta\}.
$$

もともと $S\subset P$ だから

$$
S\subset P'.
$$

よって整数実行可能解は失われません。

また

$$
P'\subset P
$$

なので、最小化の候補集合を狭めることにより

$$
z_{\mathrm{LP}}
\le
z'_{\mathrm{LP}}.
$$

一方 $S\subset P'$ なので、LP 緩和の下界定理から

$$
z'_{\mathrm{LP}}
\le
z_{\mathrm{IP}}.
$$

従って

$$
z_{\mathrm{LP}}
\le
z'_{\mathrm{LP}}
\le
z_{\mathrm{IP}}.
$$

$\square$
<!-- proof-end -->

---

## 9. 整数性から作れる最初の切除：丸め

整数変数に整数係数を掛けて足した値は整数です。この極めて単純な事実だけでも切除平面を作れます。

<a id="prop-dopt1-integer-rounding-cut"></a>
<!-- formal-statement-start -->
> **命題（整数丸め不等式）**  
> $a\in\mathbb Z^n$、$x\in\mathbb Z^n$ とし、
>
$$
a^{\mathsf T}x\ge\beta
$$
>
> が成り立つとする。
>
> このとき
>
$$
\boxed{
a^{\mathsf T}x\ge\lceil\beta\rceil
}
$$
>
> も成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a$ と $x$ の各成分は整数なので

$$
a^{\mathsf T}x
=
\sum_{i=1}^n a_ix_i
$$

は整数です。

整数 $a^{\mathsf T}x$ が実数 $\beta$ 以上なら、$\beta$ 以上の最小整数である

$$
\lceil\beta\rceil
$$

以上でなければなりません。

従って

$$
a^{\mathsf T}x\ge\lceil\beta\rceil.
$$

$\square$
<!-- proof-end -->

先ほどの制約

$$
2x_1+2x_2\ge3
$$

を 2 で割ると

$$
x_1+x_2\ge\frac32.
$$

$x_1,x_2$ が整数なら左辺は整数なので

$$
\boxed{
x_1+x_2\ge2
}
$$

へ丸められます。

これは LP 上では元の不等式より強く、整数点上では何も失いません。

一般の Gomory cut や Chvátal--Gomory cut は、この「整数性を使って分数領域を削る」という発想を体系化したものです。本章では考え方までを押さえ、具体的な体系は後続の離散最適化で必要に応じて使います。

---

## 10. branch-and-cut という見方

分枝限定法と切除平面法は競合する考え方ではありません。

- **分枝**：整数解集合を失わず、複数の子問題へ分割する。
- **切除**：整数解集合を失わず、各子問題の LP 緩和を強くする。
- **限定**：強くなった LP 下界を使い、改善不能な節点を捨てる。

実務的な整数計画ソルバでは、これらを組み合わせる **branch-and-cut** が基本的な枠組みになります。

この章で重要なのはソルバの実装詳細ではなく、

$$
\boxed{
\text{整数解を絶対に捨てない}
\quad+\quad
\text{連続緩和から証明可能な限界値を得る}
}
$$

という論理構造です。

---

# 11. 演習 Level A

<a id="ex-dopt1-a01"></a>
## DOPT1-A01 LP 緩和と整数最適値

- Level: A
- 目安時間: 10分

$$
\min x_1+x_2
$$

subject to

$$
3x_1+3x_2\ge5,
\qquad
x_1,x_2\in\mathbb Z_{\ge0}
$$

を考える。

1. 整数最適値を求めよ。
2. LP 緩和の最適値を求めよ。
3. 加法的整数性ギャップを求めよ。

<!-- solution-start -->
### 詳細解答

整数条件の下では

$$
3x_1+3x_2\ge5
$$

は

$$
x_1+x_2\ge\frac53
$$

を意味します。

$x_1+x_2$ は整数なので

$$
x_1+x_2\ge2.
$$

例えば $(2,0)$ は実行可能なので

$$
\boxed{
z_{\mathrm{IP}}=2
}
$$

です。

LP 緩和では $x_1,x_2\ge0$ を実数としてよいので、境界

$$
x_1+x_2=\frac53
$$

上で目的値が最小になります。

従って

$$
\boxed{
z_{\mathrm{LP}}=\frac53
}
$$

です。

加法的 gap は

$$
z_{\mathrm{IP}}-z_{\mathrm{LP}}
=
2-\frac53
=
\boxed{\frac13}.
$$
<!-- solution-end -->

<a id="ex-dopt1-a02"></a>
## DOPT1-A02 LP 解が整数なら何が分かるか

- Level: A
- 目安時間: 10分

ある最小化型整数線形計画の LP 緩和を解いたところ、最適解

$$
x^{\mathrm{LP}}=(2,0,3)
$$

と最適値 11 を得た。3変数すべてに整数条件が課されている。

元の整数線形計画の最適値について何が言えるか。理由も述べよ。

<!-- solution-start -->
### 詳細解答

LP 最適解

$$
(2,0,3)
$$

はすべて整数成分なので、元の整数線形計画でも実行可能です。

LP 緩和は整数問題より広い候補集合で最小化しているので

$$
z_{\mathrm{LP}}\le z_{\mathrm{IP}}.
$$

一方、$x^{\mathrm{LP}}$ 自身が整数実行可能なので

$$
z_{\mathrm{IP}}
\le
c^{\mathsf T}x^{\mathrm{LP}}
=
z_{\mathrm{LP}}.
$$

したがって

$$
\boxed{
z_{\mathrm{IP}}=z_{\mathrm{LP}}=11
}
$$

であり、$(2,0,3)$ は元の整数線形計画の最適解です。
<!-- solution-end -->

<a id="ex-dopt1-a03"></a>
## DOPT1-A03 分枝の二つの子問題

- Level: A
- 目安時間: 10分

整数変数 $x_3$ について LP 緩和解が

$$
x_3^*=4.7
$$

であった。

1. 標準的な二分枝を書け。
2. 任意の整数 $x_3$ が少なくとも一方の枝に含まれることを説明せよ。
3. $x_3=4$ と $x_3=5$ がそれぞれどちらに入るか答えよ。

<!-- solution-start -->
### 詳細解答

$$
\lfloor4.7\rfloor=4,
\qquad
\lceil4.7\rceil=5
$$

なので、二つの枝は

$$
\boxed{x_3\le4}
$$

と

$$
\boxed{x_3\ge5}
$$

です。

整数は 4 と 5 の間に存在しません。従って整数 $x_3$ が 4 以下でなければ、必ず 5 以上です。

したがって任意の整数解は少なくとも一方の枝に残ります。

具体的に

$$
x_3=4
$$

は左枝、

$$
x_3=5
$$

は右枝に入ります。
<!-- solution-end -->

<a id="ex-dopt1-a04"></a>
## DOPT1-A04 妥当不等式の確認

- Level: A
- 目安時間: 15分

$$
x_1,x_2\in\mathbb Z_{\ge0}
$$

かつ

$$
x_1+x_2\ge\frac72
$$

とする。

1. 整数実行可能点に対して
   $$
   x_1+x_2\ge4
   $$
   が妥当であることを示せ。
2. 点
   $$
   \left(\frac72,0\right)
   $$
   は元の LP 制約を満たすが、この妥当不等式で切られることを確認せよ。

<!-- solution-start -->
### 詳細解答

$x_1,x_2$ は整数なので

$$
x_1+x_2\in\mathbb Z.
$$

整数 $x_1+x_2$ が

$$
x_1+x_2\ge\frac72=3.5
$$

を満たすなら、

$$
x_1+x_2\ge4
$$

でなければなりません。

従って

$$
\boxed{x_1+x_2\ge4}
$$

は整数実行可能集合に対する妥当不等式です。

一方

$$
\left(\frac72,0\right)
$$

では

$$
\frac72+0
=
\frac72
$$

なので元の LP 制約は満たします。

しかし

$$
\frac72<4
$$

なので追加不等式には違反します。従ってこの分数点は切り落とされます。
<!-- solution-end -->

---

# 12. 演習 Level B

<a id="ex-dopt1-b01"></a>
## DOPT1-B01 分枝限定法を木として追う

- Level: B
- 目安時間: 25分

0--1 整数計画

$$
\min x_1+x_2
$$

subject to

$$
4x_1+3x_2\ge5,
\qquad
x_1,x_2\in\{0,1\}
$$

を分枝限定法で解く。

根節点では LP 緩和の最適解として

$$
x^{(0)}=
\left(1,\frac13\right)
$$

を用いてよい。

1. 根節点の LP 下界を求めよ。
2. $x_2$ で分枝し、左枝 $x_2\le0$ と右枝 $x_2\ge1$ の LP を調べよ。
3. 必要ならさらに分枝し、整数最適解を求めよ。
4. 各節点をどの理由で終端できるかを説明せよ。

<!-- solution-start -->
### 詳細解答

根節点で

$$
x^{(0)}
=
\left(1,\frac13\right)
$$

なので目的値は

$$
1+\frac13
=
\boxed{\frac43}.
$$

従って根の LP 下界は

$$
L_0=\frac43.
$$

$x_2=1/3$ で分枝します。

### 左枝：$x_2\le0$

0--1 制約と合わせると

$$
x_2=0.
$$

制約は

$$
4x_1\ge5
$$

になりますが

$$
x_1\le1
$$

なので左枝は LP 実行不能です。

したがってこの枝には整数解も存在せず、実行不能で終端します。

### 右枝：$x_2\ge1$

0--1 制約より

$$
x_2=1.
$$

制約は

$$
4x_1+3\ge5,
$$

すなわち

$$
x_1\ge\frac12.
$$

LP 緩和では

$$
x_1=\frac12
$$

が最適で、節点下界は

$$
L_1
=
1+\frac12
=
\frac32.
$$

まだ $x_1$ が分数なので

$$
x_1\le0
$$

と

$$
x_1\ge1
$$

へ分枝します。

$x_1\le0$ では

$$
x_1=0
$$

となり

$$
3<5
$$

なので実行不能です。

$x_1\ge1$ では 0--1 制約より

$$
x_1=1.
$$

従って

$$
(x_1,x_2)=(1,1)
$$

を得て、目的値は

$$
2.
$$

これは整数実行可能なので暫定最良値

$$
U=2
$$

を得ます。

他の節点はすべて実行不能で終端済みです。したがって

$$
\boxed{
x^*=(1,1),
\qquad
z_{\mathrm{IP}}=2
}
$$

です。

終端理由は

- 根：分数解なので分枝。
- 左枝：LP 実行不能。
- 右枝：分数解なので再分枝。
- 右枝の左子：LP 実行不能。
- 右枝の右子：LP 解が整数なので終端。

となります。
<!-- solution-end -->

<a id="ex-dopt1-b02"></a>
## DOPT1-B02 丸め切除で gap を閉じる

- Level: B
- 目安時間: 20分

$$
\min 2x_1+x_2
$$

subject to

$$
2x_1+2x_2\ge5,
\qquad
x_1,x_2\in\mathbb Z_{\ge0}
$$

を考える。

1. LP 緩和の最適値を求めよ。
2. 整数丸め不等式を一つ導け。
3. その不等式を加えた LP の最適値を求めよ。
4. 元の整数最適値と一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

制約を 2 で割ると

$$
x_1+x_2\ge\frac52.
$$

目的係数は $x_2$ の方が小さいので、LP 緩和では $x_1=0$ として $x_2$ だけで満たすのが有利です。

従って

$$
x_1=0,
\qquad
x_2=\frac52
$$

で

$$
\boxed{
z_{\mathrm{LP}}=\frac52
}
$$

です。

整数点では

$$
x_1+x_2
$$

は整数です。したがって

$$
x_1+x_2\ge\frac52
$$

から

$$
\boxed{
x_1+x_2\ge3
}
$$

を得ます。

この不等式を LP に加えると、やはり $x_2$ が安いので

$$
x_1=0,
\qquad
x_2=3
$$

が最適です。

目的値は

$$
\boxed{
z'_{\mathrm{LP}}=3
}.
$$

整数問題でも、$x_1+x_2\ge3$ を満たす必要があります。

$x_2$ の単価は 1、$x_1$ の単価は 2 なので

$$
(0,3)
$$

が整数最適で、目的値は 3 です。

したがって

$$
\boxed{
z'_{\mathrm{LP}}
=
z_{\mathrm{IP}}
=
3
}
$$

となり、この例では一つの丸め切除だけで gap が閉じました。
<!-- solution-end -->

<a id="ex-dopt1-b03"></a>
## DOPT1-B03 強い緩和と弱い緩和を比較する

- Level: B
- 目安時間: 25分

整数実行可能集合

$$
S
=
\{(x_1,x_2)\in\{0,1\}^2:
x_1+x_2\ge2\}
$$

を考える。

二つの LP 緩和

$$
P_1
=
\{x\in[0,1]^2:x_1+x_2\ge2\},
$$

$$
P_2
=
\{x\in[0,1]^2:2x_1+2x_2\ge3\}
$$

を比較する。

目的関数を

$$
x_1+x_2
$$

とする。

1. $S\subset P_1\subset P_2$ を確認せよ。
2. $P_1$ と $P_2$ 上の最小値を求めよ。
3. どちらが強い LP 緩和か述べよ。
4. 「同じ整数実行可能集合を表す」ことと「同じ LP 緩和を持つ」ことが別である理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$S$ の条件

$$
x_1,x_2\in\{0,1\},
\qquad
x_1+x_2\ge2
$$

を満たす点は

$$
(1,1)
$$

だけです。

これは明らかに $P_1$ に属します。

また $P_1$ では

$$
x_1+x_2\ge2.
$$

両辺を 2 倍すると

$$
2x_1+2x_2\ge4\ge3
$$

なので

$$
P_1\subset P_2.
$$

従って

$$
S\subset P_1\subset P_2.
$$

$P_1$ 上では

$$
x_1+x_2\ge2
$$

なので最小値は

$$
\boxed{2}.
$$

実際 $(1,1)$ で達成します。

$P_2$ 上では

$$
x_1+x_2\ge\frac32
$$

なので最小値は

$$
\boxed{\frac32}.
$$

従って

$$
2>\frac32
$$

であり、最小化問題の下界として整数最適値 2 に近い $P_1$ の方が強い緩和です。

整数変数に限定すると両方とも実行可能点は $(1,1)$ だけなので、元の整数問題としては同じです。

しかし整数条件を外すと、

$$
\left(1,\frac12\right)
$$

のような分数点は $P_2$ に入る一方 $P_1$ には入りません。

したがって整数点上で同値な不等式でも、連続空間へ緩和したときの強さは異なり得ます。
<!-- solution-end -->

---

# 13. 演習 Level C

<a id="ex-dopt1-c01"></a>
## DOPT1-C01 LP 緩和・gap・分枝・切除を一周する

- Level: C
- 目安時間: 45分

0--1 整数計画

$$
\min x_1+x_2+x_3
$$

subject to

$$
2x_1+2x_2+2x_3\ge5,
\qquad
x_1,x_2,x_3\in\{0,1\}
$$

を考える。

1. 整数最適値を直接求めよ。
2. LP 緩和の最適値を求め、加法的・比率型整数性ギャップを求めよ。
3. LP 最適解の一つとして
   $$
   \left(1,1,\frac12\right)
   $$
   を取り、$x_3$ で分枝せよ。各子問題の状態を調べ、分枝限定法で整数最適値を確定せよ。
4. 元の制約から整数丸め不等式を導け。
5. その不等式を根節点へ追加すると、LP 緩和が一度で整数最適値へ到達することを示せ。
6. この例で、分枝と切除が「整数解を保存する」という同じ安全性を持ちながら、探索の仕方が異なることを説明せよ。

<!-- solution-start -->
### 詳細解答

### 1. 整数最適値

制約を 2 で割ると

$$
x_1+x_2+x_3\ge\frac52.
$$

左辺は 0--1 変数の和なので整数です。従って整数実行可能解では

$$
x_1+x_2+x_3\ge3.
$$

3変数しかなく各変数は高々 1 なので

$$
x_1=x_2=x_3=1
$$

しかありません。

したがって

$$
\boxed{
z_{\mathrm{IP}}=3
}
$$

です。

### 2. LP 緩和と gap

LP 緩和では

$$
0\le x_i\le1
$$

として

$$
x_1+x_2+x_3\ge\frac52.
$$

目的関数も同じ和なので、境界上で

$$
x_1+x_2+x_3=\frac52
$$

とすれば最適です。

従って

$$
\boxed{
z_{\mathrm{LP}}=\frac52
}
$$

です。

加法的 gap は

$$
3-\frac52
=
\boxed{\frac12}.
$$

比率型 gap は

$$
\frac{3}{5/2}
=
\boxed{\frac65}.
$$

### 3. $x_3$ で分枝する

与えられた LP 最適解

$$
\left(1,1,\frac12\right)
$$

に対して

$$
x_3\le0
$$

と

$$
x_3\ge1
$$

へ分枝します。

#### 左枝：$x_3=0$

0--1 上界から

$$
x_1+x_2\le2.
$$

しかし元の制約は

$$
2x_1+2x_2\ge5,
$$

すなわち

$$
x_1+x_2\ge\frac52.
$$

これは不可能です。

従って左枝は LP 実行不能です。

#### 右枝：$x_3=1$

制約は

$$
2x_1+2x_2+2\ge5,
$$

すなわち

$$
x_1+x_2\ge\frac32.
$$

この節点の LP 最適値は

$$
1+\frac32
=
\frac52.
$$

例えば

$$
(x_1,x_2,x_3)
=
\left(1,\frac12,1\right)
$$

が LP 最適です。

$x_2=1/2$ でさらに分枝します。

$x_2=0$ の枝では

$$
2x_1+2\ge5
$$

となり $x_1\le1$ と両立しないので実行不能です。

$x_2=1$ の枝では

$$
2x_1+4\ge5,
$$

すなわち

$$
x_1\ge\frac12.
$$

さらに $x_1$ で分枝すると $x_1=0$ は実行不能、$x_1=1$ で

$$
(1,1,1)
$$

を得ます。

目的値は 3 です。

他の枝はすべて実行不能なので

$$
\boxed{
z_{\mathrm{IP}}=3
}
$$

が確定します。

### 4. 整数丸め不等式

元の制約を 2 で割ると

$$
x_1+x_2+x_3\ge\frac52.
$$

左辺は整数なので

$$
\boxed{
x_1+x_2+x_3\ge3
}
$$

が妥当です。

### 5. 根節点へ cut を追加する

根の LP 緩和へ

$$
x_1+x_2+x_3\ge3
$$

を追加します。

各変数は

$$
0\le x_i\le1
$$

なので、和が 3 以上になるには

$$
x_1=x_2=x_3=1
$$

しかありません。

従って追加後の LP 最適解は

$$
(1,1,1)
$$

で、最適値は

$$
\boxed{3}.
$$

これは整数最適値に一致します。

### 6. 分枝と切除の比較

分枝では、

$$
x_3\le0
\qquad\text{または}\qquad
x_3\ge1
$$

のように整数解を二つの領域へ分けます。整数値は必ずどちらかへ入るので、整数解を失いません。

一方、切除では

$$
x_1+x_2+x_3\ge3
$$

のように、すべての整数実行可能解に対して成り立つ不等式を追加します。こちらも整数解を失いません。

違いは、分枝が **探索木を増やして場合分けする**のに対し、切除は **一つの節点の LP 緩和そのものを狭くする**ことです。

この例では切除一つで整数包まで到達したため、分枝を一切せずに整数解が得られました。

従って両者は

$$
\boxed{
\text{整数解を保存する}
}
$$

という安全性を共有しつつ、

$$
\boxed{
\text{分枝＝問題を分ける},
\qquad
\text{切除＝緩和を強くする}
}
$$

という異なる役割を持ちます。
<!-- solution-end -->

---

## 14. この章の要点

- 整数線形計画では、線形制約に加えて一部または全部の変数へ整数条件を課す。
- LP 緩和は整数条件を外した線形計画であり、最小化問題では
  $$
  z_{\mathrm{LP}}\le z_{\mathrm{IP}}
  $$
  という下界を与える。
- LP 緩和解が整数なら、その解は整数問題でも最適である。
- 整数実行可能集合 $S$ に対して
  $$
  \operatorname{conv}(S)
  $$
  を整数包といい、線形目的関数は $S$ と整数包上で同じ最適値を持つ。
- integrality gap は LP 緩和と整数最適値の隔たりを測る。一般の定式化では gap は大きくなり得る。
- 同じ整数実行可能集合を表していても、整数条件を外した後の LP 緩和の強さは異なり得る。
- 分数整数変数 $x_j^*=\alpha$ に対する
  $$
  x_j\le\lfloor\alpha\rfloor
  \quad\text{または}\quad
  x_j\ge\lceil\alpha\rceil
  $$
  という分枝は、整数実行可能解を失わない。
- 分枝限定法は各節点の LP 下界を使い、実行不能または改善不能な節点を安全に刈る。
- 妥当不等式は整数実行可能解を保持したまま LP 緩和を狭める。
- 整数係数の線形式は整数値を取るので
  $$
  a^{\mathsf T}x\ge\beta
  \Longrightarrow
  a^{\mathsf T}x\ge\lceil\beta\rceil
  $$
  という丸め切除を作れる。
- 分枝と切除を組み合わせると branch-and-cut の基本構造になる。

次の DOPT2 では、離散構造がグラフとして現れるネットワーク最適化へ進みます。最大流・最小カット、最小費用流を通じて、一般整数計画よりはるかに強い構造を使える場合を調べます。
