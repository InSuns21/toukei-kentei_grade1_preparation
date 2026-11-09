# SQC12 境界の小さい分割片と円積問題の到達点

[前講のBorel円積](../SQC11/index.md#cor-sqc11-borel-circle)では、円盤を有限個のBorel集合に分け、平行移動だけで正方形に組み替えられると分かりました。しかし、Borel集合の境界は非常に複雑にもなれます。例えば有理点全体はBorelですが、その点が密集する領域の境界は面積を持ちます。

では、**各片を面積のある、境界の小さい図形として選べるか**。Máthé–Noel–Pikhurkoの研究は、有限平行移動等分解のままでこの条件も達成しました。本講では「境界が小さい」の定義を使える形に戻し、2022年のプレプリント・2026年の論文の主張を仮定つきで引用し、円盤と正方形への適用・反例・各種円積問題の違いは自分の手で証明します。

前提として、[有限平行移動等分解](../SQC9/index.md#def-sqc9-translation-equidecomposition)、[上box（上Minkowski）次元](../SQC9/index.md#def-sqc9-upper-box-dimension)、[境界の次元の計算](../SQC9/index.md#lem-sqc9-boundary-dimension)、[Borel集合と可測性](../SQC11/index.md#prop-sqc11-borel-regularity)を用います。面積は二次元Lebesgue測度 $\lambda_2$ で測り、$\partial E$ は集合 $E$ の位相的境界を表します。

<!-- definition-example-audit: strict -->

---

## 1. 境界が小さいとは何か：Jordan可測性と被覆数

「面積が定まる」だけでは、はさみで切り分けるような輪郭を想像できません。境界を細かい格子で覆ったとき、境界に触れるマスがどれくらい増えるかを調べます。[RA7のJordan可測集合の定義](../../../基礎科目/RA/RA7/index.md#def-ra7-jordan-measurable)ではRiemann積分によって領域を扱いました。ここでは同章で証明された境界被覆との同値性を使い、**境界の面積が0**という形に読み替えて確認します。

<a id="def-sqc12-jordan"></a>

<!-- formal-statement-start -->
> **定義（Jordan可測集合の境界判定）**
> 有界集合 $E\subset\mathbb R^2$ が**Jordan可測**であるとは、その位相的境界 $\partial E$ のLebesgue面積が0、すなわち

$$
\lambda_2(\partial E)=0
$$

> であることをいう。これは既習のRiemann積分によるJordan可測性と同値な判定である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc12-jordan -->
**定義の確認**　$E=[0,1)\times[0,1)$ なら、閉包は $[0,1]^2$、内部は $(0,1)^2$ です。従って境界は正方形の四辺の和集合であり、各辺は幅 $\varepsilon$ の長方形で覆うと覆いの面積を任意に小さくできます。四辺の面積は0で、$E$ はJordan可測です。

一方、$F=(\mathbb Q^2)\cap[0,1]^2$ は可算集合なのでLebesgue面積0であり、Borelでもありますが、内部が空、閉包が $[0,1]^2$ です。従って $\partial F=[0,1]^2$ の面積は1で、$F$ は**Jordan可測ではありません**。元の集合の面積が0であることと、境界の面積が0であることは別です。
<!-- definition-example-end -->

Jordan可測な集合では、格子で内側と外側を判定しきれないマスの総面積を細かい分割で0へ近づけられます。境界が零集合である条件が、この「境界のマスを無視できる」直感を保証します。ただしJordan可測だからといって、境界が滑らかな曲線である必要はありません。

ここで[上box次元の定義](../SQC9/index.md#def-sqc9-upper-box-dimension)を使います。$N_\delta(F)$ を一辺 $\delta>0$ の格子正方形のうち有界集合 $F$ と交わるものの個数とすると、上box次元は

$$
\overline{\dim}_{\mathrm{box}}F
=\limsup_{\delta\downarrow0}
\frac{\log N_\delta(F)}{\log(1/\delta)}
$$

です。次の補題が、この章で完全に証明する最初の橋渡しです。

<a id="lem-sqc12-box-jordan"></a>

<!-- formal-statement-start -->
> **補題（小さい境界次元からJordan可測性へ）**
> 有界集合 $E\subset\mathbb R^2$ が

$$
\overline{\dim}_{\mathrm{box}}(\partial E)<2
$$

> を満たすなら、$\lambda_2(\partial E)=0$ であり、$E$ はJordan可測である。
<!-- formal-statement-end -->

### 証明の見取り図

「次元が2未満」を単に「細い」と言い換えるだけでは面積0の証明になりません。次元より大きく2より小さい数 $s$ を取り、格子の個数が高々定数倍の $\delta^{-s}$ に抑えられることを示します。各マスの面積 $\delta^2$ を掛けると、境界の外側からの覆いの面積は $\delta^{2-s}\to0$ です。

<!-- proof-start -->
### 証明

$\partial E=\varnothing$ なら境界の面積は0なので結論は直ちに成立します。以下、$\partial E\ne\varnothing$ とします。

$b=\overline{\dim}_{\mathrm{box}}(\partial E)<2$ とおき、$b<s<2$ を選びます。上極限の定義より、ある $\delta_0>0$ が存在し、$0<\delta<\delta_0$ では

$$
\frac{\log N_\delta(\partial E)}{\log(1/\delta)}<s
$$

です。$\log(1/\delta)>0$ となるよう $\delta_0<1$ としてよいので、

$$
N_\delta(\partial E)\le\delta^{-s}
$$

を得ます。境界は閉集合なのでBorel可測です。また $E$ が有界なので境界も有界です。境界と交わる格子正方形の閉包で境界全体を覆え、その個数は $N_\delta(\partial E)$ 以下の定数倍で抑えられます。従ってLebesgue測度の単調性・有限劣加法性より

$$
0\le\lambda_2(\partial E)
\le N_\delta(\partial E)\,\delta^2
\le\delta^{2-s}\longrightarrow0.
$$

よって $\lambda_2(\partial E)=0$ です。[Jordan可測集合の定義](#def-sqc12-jordan)により結論を得ます。
<!-- proof-end -->

**具体例**　[円周と正方形境界の計算](../SQC9/index.md#lem-sqc9-boundary-dimension)では上box次元がともに1でした。$1<s<2$ とすれば境界に触れる格子の総面積は高々 $\delta^{2-s}$ のオーダーで0へ向かいます。円盤・正方形がJordan可測であることを、単なる面積公式とは独立に確認できました。

逆に「Jordan可測なら境界次元が必ず2未満」とはこの補題から言えません。上box次元の条件は**Jordan可測性より強い十分条件**として使います。

---

## 2. Borel性と小さい境界は別の制約

前講の[Marks–Ungerの定理](../SQC11/index.md#thm-sqc11-marks-unger)はBorel片を保証しますが、Borel性だけで境界の面積は決まりません。分割片の記述の複雑さについて、もう一つの分類を導入します。

<a id="def-sqc12-fsigma"></a>

<!-- formal-statement-start -->
> **定義（Fσ集合）**
> 整数 $d\ge1$ に対して、$\mathbb R^d$ の集合 $E$ が $F_\sigma$ 集合であるとは、$\mathbb R^d$ の閉集合 $F_1,F_2,\ldots$ によって

$$
E=\bigcup_{n=1}^{\infty}F_n
$$

> と表せることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc12-fsigma -->
**定義の確認**　閉集合 $[0,1]$ は自身を毎回取る可算和だから $F_\sigma$ です。また、開区間は

$$
(0,1)=\bigcup_{n=3}^{\infty}[1/n,\,1-1/n]
$$

と表せます。右辺の各区間は閉集合であり、任意の $0<x<1$ に対して十分大きい $n$ で $1/n\le x\le1-1/n$ となるので、和はちょうど $(0,1)$ です。
<!-- definition-example-end -->

$F_\sigma$ 集合は閉集合の可算和であり、必ずBorelです。ただし $F_\sigma$ 集合を一つ取るだけで、一般の差集合・補集合を表せるとは限りません。そこで有限回の集合演算を許します。

<a id="def-sqc12-boolean-fsigma"></a>

<!-- formal-statement-start -->
> **定義（Fσ集合の有限Boolean結合）**
> 同じ $\mathbb R^d$（整数 $d\ge1$）内の有限個の $F_\sigma$ 集合から、有限回の和集合・共通部分・補集合を用いて得られる集合を、$F_\sigma$ 集合の**有限Boolean結合**という。これらの集合の族を $\mathcal B(F_\sigma)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc12-boolean-fsigma -->
**定義の確認**　$C=[0,1]^2$、$R=(\{1\}\times[0,1])\cup([0,1]\times\{1\})$ はどちらも閉集合、従って $F_\sigma$ です。差を取れば

$$
C\setminus R=[0,1)\times[0,1)
$$

となり、半開正方形は有限Boolean結合です。閉集合二つから差集合という許容演算を一回使ったことを確認しました。
<!-- definition-example-end -->

有限Boolean結合はBorelである一方、それだけで境界次元を2未満にはできません。実際、先ほどの $F=\mathbb Q^2\cap[0,1]^2$ は可算な閉一点集合の和なので $F_\sigma$ ですが、境界は面積1の正方形です。**Borel階層の低さ**と**幾何学的な境界の小ささ**は独立に検査する必要があります。

<a id="prop-sqc12-finite-boundary"></a>

<!-- formal-statement-start -->
> **命題（有限Boolean演算における境界の制御）**
> $E_1,\ldots,E_m\subset\mathbb R^2$ とし、これらから有限回の和集合・共通部分・補集合で作った集合を $C$ とする。このとき

$$
\partial C\subseteq\bigcup_{i=1}^m\partial E_i.
$$

> 特に各 $E_i$ の境界の上box次元が2未満で、$C$ が有界なら、$C$ はJordan可測である。
<!-- formal-statement-end -->

### 証明の見取り図

すべての $\partial E_i$ の外にある点では、各 $E_i$ への所属は近傍で変化しません。真偽値を有限回組み合わせても所属は変わらないので、新たな境界点は生じません。有限和の被覆数は個別の被覆数の和で抑えます。

<!-- proof-start -->
### 証明

$x\notin\bigcup_i\partial E_i$ とします。各 $i$ について、$x$ は $\operatorname{int}(E_i)$ または $\operatorname{int}(E_i^c)$ のどちらかにあります。従って $x$ のある開近傍 $U_i$ 上で $E_i$ への所属は一定です。$m$ が有限なので $U=\bigcap_{i=1}^m U_i$ は $x$ の開近傍です。$C$ への所属はこれらの真偽値のBoolean式で決まるため、$U$ 上でも一定です。よって $x\notin\partial C$ となり、境界の包含が成立します。

各境界次元が2未満なら、その最大値 $b<2$ を取り、$b<s<2$ を選べます。[上box次元の定義](../SQC9/index.md#def-sqc9-upper-box-dimension)から十分小さい $\delta$ で各 $N_\delta(\partial E_i)\le\delta^{-s}$ です。境界の包含と有限和から

$$
N_\delta(\partial C)
\le\sum_{i=1}^m N_\delta(\partial E_i)
\le m\delta^{-s}.
$$

従って $\overline{\dim}_{\mathrm{box}}(\partial C)\le s<2$ です（または $s\downarrow b$ として上界 $b$ を得ます）。$C$ が有界なら[小境界の補題](#lem-sqc12-box-jordan)からJordan可測です。
<!-- proof-end -->

**有限と可算の落とし穴**　各一点集合 $\{q\}$ の境界次元は0です。しかし有理点を可算個すべて合わせた $F=\mathbb Q^2\cap[0,1]^2$ は境界が $[0,1]^2$、上box次元は2です。この命題の「有限」は捨てられません。

---

## 3. Máthé–Noel–Pikhurko定理の保証と引用範囲

研究論文 *Circle squaring with pieces of small boundary and low Borel complexity* は、2022年2月にプレプリントとして公開され、改稿後 *Advances in Mathematics* **484**（2026）, 110685 として刊行されました。「2026年に初めて円積が可能になった」わけではありません。[Laczkovichの解決](../SQC9/index.md#thm-sqc9-laczkovich-general)と[2017年のBorel版](../SQC11/index.md#thm-sqc11-marks-unger)に、片の輪郭の正則性を追加した結果です。

次は原論文のTheorem 1.3から、本講で使う結論を取り出したものです。$\lambda_k$ は $\mathbb R^k$ のLebesgue測度です。「非零の交差」と「正測度の交差」は同じではないので、最後の条件は独立に表示します。

<a id="thm-sqc12-mnp"></a>

<!-- formal-statement-start -->
> **定理（Máthé–Noel–Pikhurkoの小境界等分解定理、引用）**
> $k\ge1$ を整数、$A,B\subset\mathbb R^k$ を有界集合とし、次を仮定する。

$$
\lambda_k(A)=\lambda_k(B)>0,\qquad
\overline{\dim}_{\mathrm{box}}(\partial A)<k,\qquad
\overline{\dim}_{\mathrm{box}}(\partial B)<k.
$$

> このとき $A$ と $B$ は有限個の集合片の**平行移動だけ**で厳密に等分解でき、さらにある $\zeta>0$ に対して、**各片の境界**の上box次元を $k-\zeta$ 以下にできる。元の $A,B$ がBorelなら片もBorelにでき、元の $A,B$ が閉集合なら片を $F_\sigma$ 集合の有限Boolean結合にできる。
>
> 加えて、Lebesgue測度が0である非空交差を与える平行移動ベクトルの集合

$$
Z(A,B)=\{t\in\mathbb R^k:
(A+t)\cap B\ne\varnothing,\qquad
\lambda_k((A+t)\cap B)=0\}
$$

> が $\lambda_k(Z(A,B))=0$ を満たす場合、**各片の測度が正**となるように選べる。
<!-- formal-statement-end -->

**引用したものと証明するもの**　定理全体の存在証明は研究級であり、本講では引用します。原論文は局所的に定まる実数値の流を作り、離散的な領域の分離構造（toast sequence）を利用して整数値流へ丸め、有限種類の平行移動片に変換します。局所性を保つ仕組みが片の境界の被覆数を制御します。有限グラフの[マッチングの考え方](../SQC10/index.md#prop-sqc10-translation-matching)は動機ですが、それだけで無限グラフの構成と正則性は証明できません。

原論文のTheorem 1.3(b)は、一般の $A,B$ に対し両者の平行移動族と開集合を使う集合代数の表示まで与えます。上記の「元の集合がBorel」「元の集合が閉」の場合はその帰結です。閉集合はBorelであり、同時に $G_\delta$ かつ $F_\sigma$ なので、閉集合を出発点とした代数表示が $\mathcal B(F_\sigma)$ に収まります。この部分も原論文の結果を使用しており、[有限Boolean演算に関する前節の命題](#prop-sqc12-finite-boundary)だけから研究定理の存在を作ったわけではありません。

**重要な量化**　一般の有界・等測度・小境界という三条件**だけ**から各片が正面積とは結論できません。最後の $Z(A,B)$ に関する追加条件を確認する必要があります。また、各片がJordan可測ということは、境界が単純閉曲線、有限個の直線、あるいは連結な輪郭であることを意味しません。

### 円盤と正方形で追加条件を証明する

半径 $r>0$ の閉円盤 $D_r=\{x\in\mathbb R^2:|x|\le r\}$ と、一辺 $s>0$ の閉正方形 $Q_s=[0,s]^2$ を取ります。$D_r+t$ と $Q_s$ が一点以上で交わるが面積0となる平行移動ベクトルは、どこにあるでしょうか。

<a id="lem-sqc12-overlap"></a>

<!-- formal-statement-start -->
> **補題（円盤と正方形の零面積交差）**
> 任意の $r,s>0$ に対し、上の閉円盤 $D_r$ と閉正方形 $Q_s$ について

$$
\lambda_2(Z(D_r,Q_s))=0
$$

> が成立する。ここで $Z$ は[小境界等分解定理](#thm-sqc12-mnp)で定義した平行移動ベクトル集合である。
<!-- formal-statement-end -->

### 証明の見取り図

円盤を動かして正方形に初めて触れる位置だけが、交差の面積が0になり得る位置です。中心の位置の集合は、正方形の周囲を半径 $r$ だけ膨らませた図形となり、その外縁は四本の線分と四本の四分円から成ります。

<!-- proof-start -->
### 証明

$t\in\mathbb R^2$ が $(D_r+t)\cap Q_s\ne\varnothing$ を満たすことは、ある $q\in Q_s$ と $u\in D_r$ に対して $t=q-u$ となることと同値です。$D_r=-D_r$ なので、該当する中心の位置は

$$
T=Q_s-D_r=Q_s+D_r
=\{t:\operatorname{dist}(t,Q_s)\le r\}
$$

です。$\operatorname{dist}(t,Q_s)$ は点 $t$ と $Q_s$ の距離の最小値です。

もし $\operatorname{dist}(t,Q_s)<r$ なら、$Q_s$ のある点 $q$ について $|t-q|<r$ です。$\operatorname{int}Q_s=(0,s)^2$ は $Q_s$ に稠密なので、少し $q$ を動かして $q'\in(0,s)^2$ かつ $|t-q'|<r$ とできます。すると十分小さい $\varepsilon>0$ で

$$
B(q',\varepsilon)
\subset (0,s)^2\cap B(t,r)
\subset Q_s\cap(D_r+t)
$$

となり、交差の面積は $\pi\varepsilon^2>0$ です。

従って、非空で零面積の交差を与える $t$ は

$$
Z(D_r,Q_s)
\subseteq\{t:\operatorname{dist}(t,Q_s)=r\}
=\partial(Q_s+D_r)
$$

を満たします。この外縁は、正方形の四辺から外へ距離 $r$ の位置にある四本の線分と、四頂点を中心とする半径 $r$ の四分円四本から成ります。有限個の線分・円弧はLebesgue面積0です（[境界次元の計算](../SQC9/index.md#lem-sqc9-boundary-dimension)でも各次元が1です）。従って右辺、ひいては $Z(D_r,Q_s)$ の面積は0です。
<!-- proof-end -->

---

## 4. 円積の最終的な強化と、外せない条件

<a id="cor-sqc12-regular-circle"></a>

<!-- formal-statement-start -->
> **系（正面積かつJordan可測な片による円積）**
> 任意の $r>0$ に対して、閉円盤 $D_r$ と閉正方形 $Q_{r\sqrt{\pi}}$ は有限個の集合片に厳密に分け、**平行移動だけ**で相互に組み替えられる。すべての片は正のLebesgue面積を持つBorel集合で、$F_\sigma$ 集合の有限Boolean結合であり、境界の上box次元は2未満（従ってJordan可測）にできる。
<!-- formal-statement-end -->

### 証明の見取り図

一般定理に対する入力は $(k,A,B)=(2,D_r,Q_{r\sqrt\pi})$ です。面積・境界次元・Borel性に加えて、各片の正面積を得るための追加条件を直前の補題で確認します。

<!-- proof-start -->
### 証明

$r>0$ とし $s=r\sqrt\pi>0$ を置きます。両集合は閉有界で、Lebesgue可測かつBorelです。面積は

$$
\lambda_2(D_r)=\pi r^2
=\bigl(r\sqrt\pi\bigr)^2=s^2
=\lambda_2(Q_s)>0.
$$

[線分・円周・正方形境界の上box次元](../SQC9/index.md#lem-sqc9-boundary-dimension)より、$\overline{\dim}_{\mathrm{box}}(\partial D_r)=\overline{\dim}_{\mathrm{box}}(\partial Q_s)=1<2$ です。従って[引用したMáthé–Noel–Pikhurko定理](#thm-sqc12-mnp)が適用でき、各片の境界次元を2未満にし、Borelかつ $\mathcal B(F_\sigma)$ に選べます。

さらに[円盤と正方形の零面積交差の補題](#lem-sqc12-overlap)で $\lambda_2(Z(D_r,Q_s))=0$ を証明済みです。よって引用定理の追加結論から**全片が正面積**です。各片は $D_r$ の部分集合として有界なので、[小境界ならJordan可測](#lem-sqc12-box-jordan)によりJordan可測です。

原論文の円積特化定理（Theorem 1.2）は、境界次元の具体的な上界 $1.987<2$ も与えています。
<!-- proof-end -->

この結論は境界に沿って「有限回の直線・円弧切断」を提供するものではありません。正の面積とJordan可測性は、目で描ける有限個の単純な多角形片と同じ意味ではないのです。

### 「元が小境界なら全片が正面積」は偽

<a id="prop-sqc12-isolated-point"></a>

<!-- formal-statement-start -->
> **命題（孤立点による正面積片への障害）**
> $Q=[0,1]^2$、$p=(10,0)$、$A=Q\cup\{p\}$、$B=Q$ とする。$A,B$ は有界で

$$
\lambda_2(A)=\lambda_2(B)=1,\qquad
\overline{\dim}_{\mathrm{box}}(\partial A)
=\overline{\dim}_{\mathrm{box}}(\partial B)=1<2
$$

> を満たす。しかし $A$ から $B$ への**どんな有限平行移動等分解**にも、面積0の片が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

孤立点 $p$ と正方形内の点との距離は、行先の正方形の直径より大きくなります。同じ平行移動をする片に両者を入れると、行先では距離を縮められないため矛盾します。

<!-- proof-start -->
### 証明

一点集合の測度は0なので $\lambda_2(A)=\lambda_2(Q)=1$ です。$p$ は $Q$ から離れた孤立点で、$\partial A=\partial Q\cup\{p\}$ となります。正方形境界は[既習の上box次元計算](../SQC9/index.md#lem-sqc9-boundary-dimension)で1、孤立点は0なので、有限和の被覆数を足せば $\partial A$ も次元1です。

任意の有限平行移動等分解で、$p$ が属する片を $A_j$、その移動ベクトルを $v_j$ とします。もし $q\in A_j\cap Q$ があれば、行先 $p+v_j,q+v_j$ は共に $B=Q$ に入るため

$$
|p-q|=|(p+v_j)-(q+v_j)|
\le\operatorname{diam}(Q)=\sqrt2.
$$

しかし $q=(q_1,q_2)\in[0,1]^2$ なら $|p-q|\ge10-q_1\ge9>\sqrt2$ で矛盾します。従って $A_j=\{p\}$ であり、その面積は0です。
<!-- proof-end -->

この反例は一般定理が間違っているのではなく、「各片が正面積」という**追加結論の仮定**が必要なことを示しています。円盤と正方形では、その仮定を[直前の補題](#lem-sqc12-overlap)で確認しました。

---

## 5. 六種類の「円積」は問いの条件が違う

円と正方形の面積を揃えるだけなら $\pi r^2=s^2$ という式で終わります。問題は**何を操作してよいか**、**どんな片を許すか**、**等号を近似でなく厳密に要求するか**です。

| 問い | 許す操作・表現 | 円盤から等積正方形へ | 重要な境界 |
|---|---|---|---|
| 古典作図 | 定規とコンパスの有限回の正確な作図 | **不可能** | $r\sqrt\pi$ は作図可能でない。[超越性からの結論](../SQC7/index.md#thm-sqc7-circle-squaring-impossible) |
| 近似作図 | 任意の指定誤差へ近づける有限作図 | **可能** | 有理数近似で辺長を近づけても、有限回の誤差0は主張しない |
| 有限多角形分割 | 有限個の多角形片と回転・平行移動 | **円盤では不可能** | 多角形同士なら[等積分割](../SQC8/index.md#thm-sqc8-bolyai-gerwien)が可能。円盤は有限多角形の和ではない |
| 任意集合片の等分解 | 有限個の任意集合片を平行移動 | **可能** | [Laczkovich](../SQC9/index.md#thm-sqc9-laczkovich-general)、片の可測性は保証しない |
| 可測・Borelな等分解 | 有限個のLebesgue可測片、さらにBorel片を平行移動 | **可能** | [2017年の二つの定理](../SQC11/index.md#cor-sqc11-borel-circle)、片の境界次元は未保証 |
| 小境界・正面積の等分解 | 有限個の正面積のBorel・Jordan可測片を平行移動 | **可能** | [Máthé–Noel–Pikhurkoの系](#cor-sqc12-regular-circle)、各片の境界次元も2未満 |

多角形分割の行は「有限個の**多角形**が厳密に円盤を覆うか」という意味です。曲線を持つ片を許す他の切断問題と混同しません。また、[古典作図の不可能性](../SQC7/index.md#thm-sqc7-circle-squaring-impossible)と[有限等分解の可能性](../SQC9/index.md#cor-sqc9-circle-squaring)は矛盾しません。作図の有限操作で作る一辺と、任意の点集合を切り分ける存在定理は、量化している対象が全く異なります。

---

## 6. 演習：境界・片・操作の条件を自力で判定する

### Level A：一つの条件を直接確かめる

**SQC12-A1（面積0とJordan可測は別）**　$E=[0,1)\times[0,1)$ と $F=(\mathbb Q^2)\cap[0,1]^2$ の境界を求め、両者のLebesgue面積とJordan可測性を判定せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$\overline E=[0,1]^2$、$\operatorname{int}E=(0,1)^2$ より、$\partial E=[0,1]^2\setminus(0,1)^2$ は四辺です。四辺は有限個の長方形の薄い覆いで面積0と分かるので、[Jordan可測の定義](#def-sqc12-jordan)を満たします。$\lambda_2(E)=1$ です。

$F$ は可算集合なので $\lambda_2(F)=0$。どの開球にも有理座標の点があり、かつ無理座標の点もあるため、$\overline F=[0,1]^2$、$\operatorname{int}F=\varnothing$ です。ゆえに $\partial F=[0,1]^2$、$\lambda_2(\partial F)=1$ です。$F$ はLebesgue可測（可算Borel）ですがJordan可測でありません。
<!-- solution-end -->

**SQC12-A2（被覆数から面積0へ）**　有界集合 $E\subset\mathbb R^2$ の境界について、十分小さい $\delta$ で $N_\delta(\partial E)\le100\delta^{-3/2}$ と分かっている。境界の面積を評価し、$E$ がJordan可測であると結論せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

境界と交わる一辺 $\delta$ の格子正方形の和が $\partial E$ を覆います。各マスの面積は $\delta^2$ なので

$$
0\le\lambda_2(\partial E)
\le N_\delta(\partial E)\delta^2
\le100\delta^{1/2}.
$$

$\delta\downarrow0$ で右辺は0へ収束し、$\lambda_2(\partial E)=0$ です。$E$ は有界という仮定もあるので[定義](#def-sqc12-jordan)よりJordan可測です。面積0を結論したのは境界であって、$E$ 自体ではありません。
<!-- solution-end -->

**SQC12-A3（$F_\sigma$ の構成）**　$(0,1)$ が $F_\sigma$ である閉集合列を一つ与え、$[0,1)\times[0,1)$ が $F_\sigma$ 集合の有限Boolean結合であることを示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

各 $n\ge3$ で $F_n=[1/n,1-1/n]$ は閉集合です。$x\in(0,1)$ なら $n>1/\min\{x,1-x\}$ を取れば $x\in F_n$。逆にどの $F_n$ も $(0,1)$ に含まれるので $\bigcup_{n\ge3}F_n=(0,1)$ です。[定義](#def-sqc12-fsigma)から $F_\sigma$ です。

$C=[0,1]^2$ と $R=(\{1\}\times[0,1])\cup([0,1]\times\{1\})$ は閉集合、従って $F_\sigma$ です。差 $C\setminus R=[0,1)\times[0,1)$ が求める[有限Boolean結合](#def-sqc12-boolean-fsigma)です。
<!-- solution-end -->

**SQC12-A4（平行移動は境界を保つ）**　$E=[0,1)\times[0,2)$ と $v=(3,-1)$ に対し、$E+v$ とその境界を求め、境界の上box次元が変わらないことを説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$E+v=[3,4)\times[-1,1)$ です。平行移動は開集合と閉集合をそれぞれ開集合・閉集合へ移すため、

$$
\partial(E+v)=(\partial E)+v
=([3,4]\times[-1,1])\setminus((3,4)\times(-1,1)).
$$

境界は長方形の四辺であり、[線分の上box次元](../SQC9/index.md#lem-sqc9-boundary-dimension)は1です。距離を保つ平行移動によって必要な細格子被覆の個数の増加率は変わらないので、元の境界の次元も像の境界の次元も1です。
<!-- solution-end -->

**SQC12-A5（面積・次元・Borel性を別々に）**　半径2の閉円盤と等面積の閉正方形の辺長を求め、[小境界等分解定理](#thm-sqc12-mnp)の基本三条件を照合せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

円盤の面積は $\pi(2)^2=4\pi$ です。正方形の正の辺長 $s$ は $s^2=4\pi$ から $s=2\sqrt\pi$。両者は閉有界でBorel、面積は等しい正の値です。[境界次元の計算](../SQC9/index.md#lem-sqc9-boundary-dimension)によって双方の境界次元は1で、$1<2$ です。従って基本三条件（有界・等しい正測度・境界次元2未満）が満たされます。

各片の**正面積**まで結論するには、これと別に[零面積交差の補題](#lem-sqc12-overlap)を使って追加条件を確認します。
<!-- solution-end -->

### Level B：仮定・反例・数値的な意味を確かめる

**SQC12-B1（接触だけの位置の集合）**　$D_1$ と $Q_2=[0,2]^2$ に対し、$T=Q_2+D_1$ の境界が面積0であることを具体的な形で示し、$Z(D_1,Q_2)\subseteq\partial T$ を説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$T=\{t:\operatorname{dist}(t,Q_2)\le1\}$ です。$t$ が正方形の左辺の外側にあるとき、辺までの距離が1となる点は $x=-1$、$0\le y\le2$ です。右・上・下にもこれと合同な線分が1本ずつあります。各頂点の外側では、その頂点から距離1の四分円が境界になります。従って $\partial T$ は四線分と四つの四分円の有限和で、[既習の境界次元1の評価](../SQC9/index.md#lem-sqc9-boundary-dimension)から面積0です。

$t\in T$ で $\operatorname{dist}(t,Q_2)<1$ なら、内点 $q'\in(0,2)^2$ を $|q'-t|<1$ となるよう選べます。十分小さい開球 $B(q',\varepsilon)$ が $(D_1+t)\cap Q_2$ に入るので交差の面積は正です。従って交差が非空かつ面積0となる $t$ は $\operatorname{dist}(t,Q_2)=1$、すなわち $\partial T$ に属します。
<!-- solution-end -->

**SQC12-B2（孤立点が強制する零面積片）**　$A=[0,1]^2\cup\{(10,0)\}$、$B=[0,1]^2$ が小境界・等面積の仮定を満たすにもかかわらず、すべての片を正面積にはできない理由を証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

一点集合の面積は0なので $\lambda_2(A)=\lambda_2(B)=1$。境界は正方形の四辺と孤立点の和なので上box次元は1です。任意の等分解で $p=(10,0)$ と同じ片に正方形内の点 $q$ が入れば、同じ移動ベクトル $v$ による像は共に $B$ にあり、

$$
9\le|p-q|=|(p+v)-(q+v)|\le\sqrt2
$$

となって矛盾します。その片には $p$ しか入れられず、面積は0です。一般の引用定理に「片の正面積」を加えるには[追加条件](#thm-sqc12-mnp)が必要であることを示す反例です。
<!-- solution-end -->

**SQC12-B3（有限Boolean演算の限界）**　「境界次元0の集合を何個でも合わせれば境界次元は0」という文を検討し、有限個ならどこまで正しいか、可算個なら何が起こるかを述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

有限個の集合 $E_1,\ldots,E_m$ の和集合について[境界の制御命題](#prop-sqc12-finite-boundary)から $\partial(\bigcup_iE_i)\subseteq\bigcup_i\partial E_i$ です。各境界の上box次元が0なら、任意の $s>0$ に対して $N_\delta(\partial E_i)\le C_i\delta^{-s}$ を十分小さい $\delta$ で使えます。有限和なので和の被覆数も $O(\delta^{-s})$ で、上box次元は高々0です。

可算和では同じ推論はできません。$F=\bigcup_{q\in\mathbb Q^2\cap[0,1]^2}\{q\}$ は各片 $\{q\}$ の境界次元が0なのに、$\partial F=[0,1]^2$ なので次元2です。「有限個の定数の和」と「可算個の定数の和」を一様な被覆数の評価として交換してはいけません。
<!-- solution-end -->

**SQC12-B4（格子画像の曖昧なマス）**　有界集合 $E\subset\mathbb R^2$ について、$s<2$ と定数 $C>0$ が存在し、十分大きい整数 $n$ で $N_{1/n}(\partial E)\le Cn^s$ とする。辺長1の単位正方形内で格子を $n\times n$ にしたとき、境界に触れるマスの面積合計とマスの割合を評価せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

一辺 $1/n$ の格子マスの面積は $1/n^2$ です。境界に触れるマスの個数が高々 $Cn^s$ なので、面積合計は

$$
N_{1/n}(\partial E)\frac1{n^2}
\le Cn^{s-2}\longrightarrow0
$$

です。全 $n^2$ マスに対する割合も高々 $Cn^s/n^2=Cn^{s-2}$ です。$s<2$ がこの減少を保証します。分割片が有限個なら、その境界に触れるマスの個数も有限和で抑えられます。ただし「曖昧なマスが0個になる」という意味ではなく、**面積比が0に近づく**だけです。
<!-- solution-end -->

### Level C：六つの「可能性」を一つの図形で切り分ける

**SQC12-C1（非Borel円盤の小境界円積）**　$r>0$、$D_r=\{x:|x|\le r\}$ とする。円周 $\partial D_r$ の非Borel部分集合 $N$ を一つ選び、$A=D_r\setminus N$、$B=[0,r\sqrt\pi]^2$ とおく。

1. $N$ を選べる理由を説明し、$A$ のBorel性・面積・境界を判定せよ。
2. $A$ と $B$ が小境界等分解の基本三条件を満たすことを確認せよ。
3. $Z(A,B)$ の面積が0であることを、[円盤と正方形の零面積交差](#lem-sqc12-overlap)から説明せよ。
4. Jordan可測で正面積の片による有限平行移動等分解が存在するか判定し、Borel片だけの等分解が不可能であることを証明せよ。
5. この結果が古典作図の不可能性や多角形片での円積と矛盾しない理由を、許す操作と片の性質から述べよ。

- Level: C

<!-- solution-start -->
**詳細解答**

(1) 円周は連続体濃度で、その部分集合全体は $2^{\mathfrak c}$ 個あります。一方、Borel集合は高々 $\mathfrak c$ 個です（[前講の非Borel集合の存在証明](../SQC11/index.md#prop-sqc11-nonborel)と同じ濃度の議論）。従って非Borelな $N\subset\partial D_r$ を選べます。$A$ がBorelなら $N=D_r\setminus A$ は閉集合とBorel集合の差としてBorelとなり矛盾するので、$A$ は非Borelです。

円周のLebesgue面積は0で、Lebesgue測度の完備性により $N$ は可測かつ零集合です。従って

$$
\lambda_2(A)=\lambda_2(D_r)-\lambda_2(N)=\pi r^2.
$$

$\operatorname{int}A=\{x:|x|<r\}$、$\overline A=D_r$ なので $\partial A=\partial D_r$ です。境界の上box次元は1、面積は0であり、$A$ は[Jordan可測](#def-sqc12-jordan)です。**Jordan可測であってもBorelとは限らない**という具体的な存在例です。

(2) $A$ と $B$ は有界、両者の面積は $\pi r^2=(r\sqrt\pi)^2>0$。$\partial A=\partial D_r$ と $\partial B$ はそれぞれ円周・正方形の四辺なので、[境界次元の計算](../SQC9/index.md#lem-sqc9-boundary-dimension)より上box次元は両方1で、$1<2$ です。[小境界定理](#thm-sqc12-mnp)の基本三条件を満たします。

(3) $(A+t)\cap B\subseteq(D_r+t)\cap B$ です。$\operatorname{dist}(t,B)<r$ なら[円盤と正方形の零面積交差](#lem-sqc12-overlap)の証明と同じく、$(\operatorname{int}D_r+t)\cap\operatorname{int}B$ に小開球が入ります。$N$ は円周上だけにあるので、この小開球は $(A+t)\cap B$ にも含まれ、左側の交差の面積は正です。従って非空で零面積の交差があるなら

$$
Z(A,B)\subseteq\{t:\operatorname{dist}(t,B)=r\}
$$

であり、右辺は四線分と四分円の和なので面積0です。

(4) (2) と (3) によって[引用定理](#thm-sqc12-mnp)のすべての該当仮定が満たされ、有限平行移動等分解で、各片は正面積かつ境界の上box次元が2未満にできます。$A$ が有界なので各片も有界であり、[小境界の補題](#lem-sqc12-box-jordan)からJordan可測です。一方、もし $A$ が有限個のBorel片の和なら $A$ はBorel集合になります。これは(1)に矛盾するため、**全片Borel**は不可能です。引用定理は非Borelの入力にまでBorel片を保証していません。

(5) 比較として[古典作図の円積不可能性](../SQC7/index.md#thm-sqc7-circle-squaring-impossible)を見ると、定規とコンパスで長さ $r\sqrt\pi$ を有限回に厳密作図する問いです。今得た結論は、任意の集合片を有限個使い、各点をまとめて平行移動する**存在定理**です。正面積・Jordan可測であっても各片が有限個の多角形片だとは主張していません。従って両者の可否は両立します。
<!-- solution-end -->

---

## 7. ここまでに分かったことと証明の境界

- **厳密な有限等分解**と**有限回の作図**は別の問題です。円積の可否を語る前に許された操作を指定します。
- 小さい境界次元からJordan可測性へ進む論理は、被覆数にマスの面積を掛けることで本講内で証明しました。有限Boolean演算では境界を制御できますが、可算和には拡張できません。
- Máthé–Noel–Pikhurkoの存在定理そのもの（有界整数流・toast sequence・境界次元の制御）は**引用**です。一般定理の正面積片は追加の交差条件が必要で、円盤・正方形ではその条件を完全に検証しました。
- 2026年の刊行論文は2022年プレプリントに始まる研究成果であり、1990年の存在解、2017年の可測・Borel解を否定するものではありません。

### 参考文献（研究級定理の原典）

- A. Máthé, J. A. Noel, O. Pikhurko, “Circle squaring with pieces of small boundary and low Borel complexity,” *Advances in Mathematics* **484** (2026), 110685. [原論文の本文](https://pikhurko.github.io/E/MatheNoelPikhurko26am.pdf)、Theorem 1.2・Theorem 1.3。[プレプリント arXiv:2202.01412](https://arxiv.org/abs/2202.01412) は2022年公開。
- Ł. Grabowski, A. Máthé, O. Pikhurko, “Measurable circle squaring,” *Annals of Mathematics* **185** (2017), 671–710。[原論文](https://annals.math.princeton.edu/2017/185-2/p06)。
- A. S. Marks, S. T. Unger, “Borel circle squaring,” *Annals of Mathematics* **186** (2017), 581–605。[原論文](https://annals.math.princeton.edu/2017/186-2/p04)。
