# SQC11 可測・Borelな円積

[Laczkovichの有限平行移動等分解定理](../SQC9/index.md#thm-sqc9-laczkovich-general)により、円盤を有限個の集合片に分け、平行移動だけで正方形に組み替えられます。しかしその主張は**片がLebesgue可測であることを保証しません**。[SQC10のマッチングとの対応](../SQC10/index.md#prop-sqc10-translation-matching)からも、点ごとの行先が衝突しないことだけでは片の性質は分かりません。

そこで問いを強めます。「厳密な有限分割を維持したまま、各片を面積が定義できる集合、さらにはBorel集合として選べるか」。この講義では、集合の正則性の三段階を手で確認してから、2017年の二つの存在定理を**正確な仮定つきで引用**し、円盤への適用だけを完全に証明します。研究級の存在定理そのものの証明と初等的な有限例を混同しません。

前提は[集合と写像（SET1）](../../../基礎論系/SET/SET1/index.md)、[Cantorの定理（SET-U3）](../../../基礎科目/SET/SET-U3/index.md#thm-setu3-cantor)、[Lebesgue測度の正則性（MT0）](../../../解析系/MT/MT0/index.md#thm-mt0-outer-regularity-finite)、[平面の積測度（F0-00D2C）](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-01)、[至る所疎・第一類集合（TOP6）](../../../基礎科目/TOP/TOP6/index.md#def-top6-meagre)、[有限平行移動等分解（SQC9）](../SQC9/index.md#def-sqc9-translation-equidecomposition)、[有限移動とマッチング（SQC10）](../SQC10/index.md#prop-sqc10-translation-matching)です。Baire性について必要な部分はここで再確認します。

<!-- definition-example-audit: strict -->

---

## 1. 集合の「測れる」と「Borelである」は違う

長方形・円盤の面積は計算できますが、任意の部分集合を面積の演算対象にしてよいわけではありません。前講で使ったLebesgue可測集合は、Lebesgue測度 $\lambda_d$ が定義される集合の族です。一方、**Borel集合**は開集合から可算回の集合演算で構成される集合の族で、面積とは別の出発点を持ちます。

[F0-00D2で定義した$\sigma$-代数](../../../解析系/F0/F0-00D2/index.md#def-f0-00d2-01)は、全体集合を含み、補集合と可算和で閉じる集合族です。可算共通部分も補集合と可算和で表せるため閉じています。$\mathbb R^d$ の**開集合**とは、各点の周囲に十分小さい開球が丸ごと含まれる集合です。閉集合は開集合の補集合です。以下は[既習のBorel $\sigma$-代数](../../../解析系/F0/F0-00D2/index.md#def-f0-00d2-03)を $\mathbb R^d$ に拡張した再掲です。

<a id="def-sqc11-borel"></a>

<!-- formal-statement-start -->
> **定義（Borel集合）**
> 整数 $d\ge1$ に対し、$\mathbb R^d$ のすべての開集合を含む最小の $\sigma$-代数を $\mathcal B(\mathbb R^d)$ と書き、これに属する集合を**Borel集合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc11-borel -->
**定義の確認**　開区間 $(a,b)$ は開集合だからBorelです。閉区間 $[a,b]$ は開集合 $(-\infty,a)\cup(b,\infty)$ の補集合なのでBorelです。半開区間 $[a,b)=[a,b]\cap(-\infty,b)$ もBorelです。有限個の直積からなる半開長方形も、座標射影の連続性を用いればBorel集合です。例えば $[0,1)\times[0,1)$ は二つのBorelな帯の交わりとして書けます。

さらに可算集合 $\{x_1,x_2,\ldots\}$ は、各一点集合 $\{x_n\}$ が閉集合なので $\bigcup_{n\ge1}\{x_n\}$ としてBorelです。これらの確認はどれも「出発点が開集合で、許された演算を有限回または可算回使った」ことの検証です。
<!-- definition-example-end -->

### Baire性は「小さい例外を除いて開集合に似る」

可測性のほかに、位相的な「例外の小ささ」を扱います。集合 $F$ の閉包 $\overline F$ は、$F$ の点で任意に近くまで近づける点を合わせた集合です。既習の[TOP6の疎集合](../../../基礎科目/TOP/TOP6/index.md#def-top6-nowhere-dense)（至る所疎、nowhere dense）では、$\overline F$ が空でない開球を含みません。[TOP6の第一類集合](../../../基礎科目/TOP/TOP6/index.md#def-top6-meagre)（meager集合）は、そのような疎集合の可算和に含まれる集合です。

例えば中三分Cantor集合 $C\subset[0,1]$ は閉集合であり、任意の開区間内に $C$ に含まれない小区間が見つかるので至る所疎です。$C$ の部分集合もすべてmeagerです。meagerは「測度0」と同じ定義ではなく、位相的な小ささです。

二集合 $E,F$ の**対称差**を $E\triangle F=(E\setminus F)\cup(F\setminus E)$ と書きます。

<a id="def-sqc11-baire"></a>

<!-- formal-statement-start -->
> **定義（Baire性）**
> 集合 $E\subset\mathbb R^d$ が**Baire性を持つ**とは、ある開集合 $U\subset\mathbb R^d$ とmeager集合 $M\subset\mathbb R^d$ が存在し、

$$
E\triangle U=M
$$

> と書けることである。これは、$E$ と開集合 $U$ の食い違いがmeagerであることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sqc11-baire -->
**定義の確認**　上のCantor集合 $C$ と任意の部分集合 $N\subset C$ について、$U=\varnothing$ とすれば $N\triangle U=N$ はmeagerです。従って $N$ はBaire性を持ちます。逆に開区間 $E=(0,1)$ なら $U=E$、$M=\varnothing$ です。いずれも、開集合と例外集合を**具体的に選んで**定義の条件を確認しました。
<!-- definition-example-end -->

### 三つの族の包含関係

<a id="prop-sqc11-borel-regularity"></a>

<!-- formal-statement-start -->
> **命題（Borel集合のLebesgue可測性とBaire性）**
> 任意の整数 $d\ge1$ とBorel集合 $E\in\mathcal B(\mathbb R^d)$ に対し、$E$ はLebesgue可測であり、かつBaire性を持つ。すなわち

$$
\mathcal B(\mathbb R^d)
\subseteq\mathcal L(\mathbb R^d)
\cap\mathcal P_{\mathrm{Baire}}(\mathbb R^d),
$$

> ただし $\mathcal L$ はLebesgue可測集合族、$\mathcal P_{\mathrm{Baire}}$ はBaire性を持つ集合族を表す。
<!-- formal-statement-end -->

### 証明の見取り図

Lebesgue可測集合族とBaire性を持つ集合族が、どちらも開集合を含む $\sigma$-代数であることを確かめます。すると「開集合を含む最小の $\sigma$-代数」というBorelの定義を使えます。

<!-- proof-start -->
### 証明

Lebesgue可測集合族 $\mathcal L$ は測度の構成によって $\sigma$-代数であり、開集合を含みます。従って最小性から $\mathcal B\subseteq\mathcal L$ です。

次にBaire性を持つ集合族を $\mathcal P$ と書きます。開集合 $U$ は $U\triangle U=\varnothing$ だから $\mathcal P$ に含まれます。

$E_n\triangle U_n=M_n$（$U_n$ は開、$M_n$ はmeager）なら

$$
\left(\bigcup_{n=1}^{\infty}E_n\right)
\triangle
\left(\bigcup_{n=1}^{\infty}U_n\right)
\subseteq\bigcup_{n=1}^{\infty}M_n.
$$

右辺はmeagerであり、その部分集合もmeagerです。左の開集合の可算和は開集合なので、$\bigcup_n E_n\in\mathcal P$ です。

補集合については、$E\triangle U=M$ なら $E^c\triangle U^c=M$ です。$U^c$ は閉集合で、その内部 $V=\operatorname{int}(U^c)$ は開集合です。差 $U^c\setminus V$ は閉集合の境界であり、閉かつ内部が空なので至る所疎です。従って

$$
E^c\triangle V\subseteq M\cup(U^c\setminus V)
$$

はmeagerとなり、$E^c\in\mathcal P$ です。全体集合も開ですから、$\mathcal P$ は開集合を含む $\sigma$-代数です。再びBorelの最小性より $\mathcal B\subseteq\mathcal P$ です。
<!-- proof-end -->

**逆向きは一般に成り立ちません。** 「Lebesgue可測かつBaire性を持つ」ことからBorel性が出ない反例を、次で構成原理まで説明します。

<a id="prop-sqc11-nonborel"></a>

<!-- formal-statement-start -->
> **命題（Lebesgue可測かつBaire性を持つ非Borel集合の存在）**
> 実数直線には、Lebesgue可測かつBaire性を持つがBorelではない集合 $N\subset[0,1]$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

測度0かつ至る所疎なCantor集合には、Borel集合の総数よりはるかに多くの部分集合があります。その中から非Borelなものを選んでも、測度0・meagerという性質は残ります。

<!-- proof-start -->
### 証明

中三分Cantor集合 $C$ は第 $n$ 段階で $2^n$ 本、各長さ $3^{-n}$ の閉区間に含まれるので、その全長は $(2/3)^n$ です。$n\to\infty$ でこれが $0$ に収束するため $\lambda_1(C)=0$ です。また $C$ は閉で内部が空なので至る所疎です。

各点は左右どちらの区間を残すかという二進無限列で指定でき、$C$ の濃度は連続体濃度 $\mathfrak c=|\mathbb R|$ です。その部分集合族 $\mathcal P(C)$ の濃度は $2^{\mathfrak c}$ です。一方、実数直線のBorel集合は可算の基底から可算回の集合演算を記述できるので、その総数は高々 $\mathfrak c$ です。[Cantorの定理](../../../基礎科目/SET/SET-U3/index.md#thm-setu3-cantor) $2^{\mathfrak c}>\mathfrak c$ により、$N\subset C$ でBorelでないものを選べます。

Lebesgue測度は**完備**であり、測度0の可測集合のすべての部分集合も可測です。従って $N\subset C$ はLebesgue可測で $\lambda_1(N)=0$。さらに $N$ は至る所疎な $C$ の部分集合だからmeagerで、$N\triangle\varnothing=N$ と書けてBaire性を持ちます。しかし選び方によりBorelではありません。
<!-- proof-end -->

この反例は**存在の議論**であり、非Borelな $N$ の点を一つずつ計算して列挙したものではありません。また、すべてのLebesgue可測集合がBaire性を持つ、あるいはその逆、とは本命題から推論できません。

---

## 2. 「各点の行先がBorelに選べる」を片の条件に戻す

[有限移動集合と完全マッチングの対応](../SQC10/index.md#prop-sqc10-translation-matching)では、集合を点ごとにどのベクトルで動かすかを決めました。しかしその選択が無秩序なら、同じベクトルを選んだ点全体がBorelとは限りません。ここでは有限個のベクトルを選ぶ写像が**Borelとなる条件**を明示します。

集合 $A\subset\mathbb R^d$ 上の写像 $f:A\to\mathbb R^d$ が**Borel写像**であるとは、任意の開集合 $O\subset\mathbb R^d$ に対し逆像 $f^{-1}(O)$ が $A$ の相対Borel集合、すなわち $A\cap E$（$E$ は $\mathbb R^d$ のBorel集合）となることです。$A$ 自体がBorelなら、この逆像は $\mathbb R^d$ のBorel集合でもあります。有限集合 $V$ は離散空間として扱い、その各一点集合が開であることに注意してください。

<a id="prop-sqc11-borel-label"></a>

<!-- formal-statement-start -->
> **命題（Borel分割と移動選択写像の対応）**
> 整数 $d\ge1$、Borel集合 $A,B\subset\mathbb R^d$、空でない有限集合 $V\subset\mathbb R^d$ を固定する。次は同値である。
>
> 1. $A=\bigsqcup_{v\in V}A_v$、$B=\bigsqcup_{v\in V}(A_v+v)$ となるBorel集合片 $A_v$ がある（空片を許す）。
> 2. Borel全単射 $f:A\to B$ があり、すべての $x\in A$ で $f(x)-x\in V$ となる。
>
> ここでBorel全単射とは、$f$ がBorel写像であり全単射であることをいう。有限片の平行移動の場合は逆写像もBorelである。
<!-- formal-statement-end -->

### 証明の見取り図

片から写像を作る方向は平行移動を有限個つなぎ、写像から片を作る方向は差 $f(x)-x$ がとる**有限値の逆像**で片を指定します。

<!-- proof-start -->
### 証明

(1) なら $x\in A_v$ 上で $f(x)=x+v$ と定めます。二つの厳密分割から、[SQC9の片ごとの全単射](../SQC9/index.md#prop-sqc9-piecewise-bijection)により $f:A\to B$ は全単射です。開集合 $O$ の逆像は

$$
f^{-1}(O)=\bigcup_{v\in V}\bigl(A_v\cap(O-v)\bigr).
$$

各 $O-v$ は開、$A_v$ はBorel、和は有限なので逆像もBorelです。$f$ はBorel写像です。逆写像も移動後のBorel片 $A_v+v$ で $y\mapsto y-v$ と書けるためBorelです。

(2) なら $g(x)=f(x)-x$ と置きます。$f$ と恒等写像はBorel写像で、差という連続演算で合成した $g:A\to\mathbb R^d$ もBorelです。各 $v\in V$ で

$$
A_v=g^{-1}(\{v\})=\{x\in A:f(x)=x+v\}
$$

はBorel集合です（$\{v\}$ は閉集合）。各 $x$ には $g(x)\in V$ の値が一つだけあるので、$A_v$ は互いに素で和が $A$。さらに $f$ は全単射なので、移動像 $f(A_v)=A_v+v$ も互いに素で和が $B$。従って(1)が成立します。
<!-- proof-end -->

<!-- definition-example-start: prop-sqc11-borel-label -->
**定義の確認**（直接例）　$A=[0,2)\times[0,1)$、$B=[0,1)\times[0,2)$ とし、$x=(s,t)$ の第1座標に応じて、$0\le s<1$ では $f(s,t)=(s,t)$、$1\le s<2$ では $f(s,t)=(s-1,t+1)$ とします。移動候補は $V=\{(0,0),(-1,1)\}$ です。逆像として

$$
A_{(0,0)}=[0,1)\times[0,1),\qquad
A_{(-1,1)}=[1,2)\times[0,1)
$$

を得ます。第1節で確認した半開長方形のBorel性と、像の上下二帯が互いに素で和が $B$ であることから、命題の全条件を具体的に満たします。
<!-- definition-example-end -->

要点は「有限の移動候補」というだけではBorel性が出ないことです。**その候補を選ぶ規則がBorelであること**が必要です。この質的な差が次の研究級の定理の中心です。

---

## 3. 2017年の二つの存在定理を正確に読む

ここからは引用結果です。まず平面に限らず $\mathbb R^d$ を考えます。位相的境界 $\partial A$ と[上box次元](../SQC9/index.md#def-sqc9-upper-box-dimension)は前講の定義に従い、$\overline{\dim}_{\mathrm{box}}(\partial A)$ と書きます。$d$ 次元Lebesgue測度は $\lambda_d$ です。空間全体を動かす操作は平行移動だけとし、回転も拡大縮小も使いません。

### Grabowski–Máthé–Pikhurko（2017）：二種類の可測性を同時に満たす

<a id="thm-sqc11-gmp"></a>

<!-- formal-statement-start -->
> **定理（Grabowski–Máthé–Pikhurkoの可測等分解定理、2017年；引用）**
> 整数 $d\ge1$、有界集合 $A,B\subset\mathbb R^d$ を取る。$A,B$ は空でない内部を持ち、次の三条件を満たすとする。

$$
\lambda_d(A)=\lambda_d(B)>0,\qquad
\overline{\dim}_{\mathrm{box}}(\partial A)<d,\qquad
\overline{\dim}_{\mathrm{box}}(\partial B)<d.
$$

> このときある有限整数 $m\ge1$、平行移動ベクトル $v_1,\ldots,v_m\in\mathbb R^d$、**それぞれLebesgue可測かつBaire性を持つ**集合片 $A_1,\ldots,A_m$ が存在して、

$$
A=\bigsqcup_{i=1}^m A_i,\qquad
B=\bigsqcup_{i=1}^m(A_i+v_i)
$$

> が厳密に成り立つ。各片がBorelであるとは主張しない。
<!-- formal-statement-end -->

これは[前講で引用したLaczkovichの一般定理](../SQC9/index.md#thm-sqc9-laczkovich-general)の結論を、片の正則性の点で強めます。境界条件は**元の $A,B$** に課すもので、片 $A_i$ の境界次元を制限するものではありません。片は同時にLebesgue可測・Baire性ありですが、[第1節の反例](#prop-sqc11-nonborel)のため、ここからBorel性は導けません。

**証明の射程**　原論文の全証明は本講では再現しません。主な設計は、有界な集合をトーラス $\mathbb T^d=\mathbb R^d/\mathbb Z^d$ の問題へ移し、有限個の生成移動ベクトルが作る $\mathbb Z^q$ の軌道上で、点の分布の偏差（discrepancy）を評価するものです。その評価を使って**一様に有界な距離で点を対応させる**ことができるかが難所です。原論文はLebesgue可測性を確保する議論とBaire性を確保する議論を別の節で扱い、最終的に両方を満たす片へまとめます。この手法を有限格子のHall条件だけに還元した証明として扱ってはいけません。

### Marks–Unger（2017）：Borelな片まで強める

Borel版では、出発集合 $A,B$ 自体がBorelであることを仮定します。これは単なる証明の便宜ではありません。もしBorel片の有限和で $A$ を表せるなら、$A$ はBorelでなければならないためです。

<a id="thm-sqc11-marks-unger"></a>

<!-- formal-statement-start -->
> **定理（Marks–UngerのBorel等分解定理、2017年；引用）**
> 整数 $d\ge1$ と、有界な**Borel集合** $A,B\subset\mathbb R^d$ を取る。両者について

$$
0<\lambda_d(A)=\lambda_d(B)<\infty,\qquad
\overline{\dim}_{\mathrm{box}}(\partial A)<d,\qquad
\overline{\dim}_{\mathrm{box}}(\partial B)<d
$$

> を仮定する。このとき有限個の**Borel集合片** $A_i$ と平行移動ベクトル $v_i\in\mathbb R^d$ が存在し、

$$
A=\bigsqcup_{i=1}^m A_i,\qquad
B=\bigsqcup_{i=1}^m(A_i+v_i)
$$

> が成り立つ。
<!-- formal-statement-end -->

[Borel集合のLebesgue可測性とBaire性](#prop-sqc11-borel-regularity)により、Borel片はLebesgue可測かつBaire性を持ちます。従って**Borelな出発集合について**は、この定理は片の正則性をさらに強めた結論です。ただし「任意のLebesgue可測な $A,B$ にBorel片を取れる」とは言っていません。

**証明のアーキテクチャ（引用論文の第4〜6節）**

1. Laczkovichの偏差評価を入力し、$\mathbb Z^q$ の作用から得られる無限グラフ上に**実数値の有界なBorel流**を構成する。これは各頂点の収支を合わせる段階です。
2. Gao–Jackson–Krohne–SewardのBorel作用の超有限性に関する構成を使い、有限部分構造の整数流の技法を組み合わせ、**整数値のBorel流**へ変換する。「流量が整数になる」と「選択がBorelである」を同時に処理するのが重要です。
3. その整数流から、有限の移動候補のうち各点に与えるベクトルをBorelに選び、[第2節の片と選択写像の対応](#prop-sqc11-borel-label)の方向へ戻してBorel片を得る。

ここに挙げた偏差評価、無限グラフ上のBorel流、超有限性の各深い定理は**証明を引用**します。前講の有限Hallの帰納法や小さなネットワーク流の計算は仕組みを理解する模型であり、この三段階の完全証明ではありません。

### 主張の比較

| 結果 | 元の集合に要求すること | 保証する分割片 | 本講で証明する範囲 |
| --- | --- | --- | --- |
| [Laczkovich（1992）](../SQC9/index.md#thm-sqc9-laczkovich-general) | 有界・等しい正測度・境界の上box次元が $d$ 未満 | 任意の集合片 | 前講で具体集合への適用 |
| Grabowski–Máthé–Pikhurko（2017） | 上と同型の条件、内部非空 | Lebesgue可測**かつ**Baire性あり | 定理本体は引用、具体集合への適用 |
| Marks–Unger（2017） | 上に加えて元の集合がBorel | **Borel**片 | 定理本体は引用、具体集合への適用 |

この表は存在定理の**保証の比較**であり、分割片の連結性、多角形性、面積の正値性、境界の正則性まで導いた表ではありません。それらは別の問いです。

---

## 4. 円盤と正方形に適用し、「厳密さ」を検算する

半径 $r>0$ の閉円盤 $D_r$ と、一辺 $s=r\sqrt\pi$ の閉正方形 $Q_s$ を取ります。

$$
D_r=\{(x,y):x^2+y^2\le r^2\},
\qquad Q_s=[0,s]^2.
$$

どちらも閉集合なのでBorelです。両者は有界で内部が空でなく、[前講の面積計算](../SQC9/index.md#cor-sqc9-circle-squaring)から

$$
\lambda_2(D_r)=\pi r^2=s^2=\lambda_2(Q_s)>0
$$

です。[線分・円周・正方形境界の上box次元](../SQC9/index.md#lem-sqc9-boundary-dimension)により、$\overline{\dim}_{\mathrm{box}}(\partial D_r)=\overline{\dim}_{\mathrm{box}}(\partial Q_s)=1<2$ も成立します。従って二つの2017年の定理とも適用できます。

<a id="cor-sqc11-borel-circle"></a>

<!-- formal-statement-start -->
> **系（Borelな分割片による円積）**
> 任意の $r>0$ について、閉円盤 $D_r\subset\mathbb R^2$ と閉正方形 $Q_{r\sqrt\pi}$ は有限個の**Borel集合片**に厳密に分割され、各片の**平行移動だけ**で相互に組み替えられる。この分割片は同時にLebesgue可測でBaire性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

定理の入力を $(d,A,B)=(2,D_r,Q_{r\sqrt\pi})$ と固定し、Borel性、等面積、境界次元の三種類の仮定を一つずつ照合します。片のBorel性は引用定理から、他の二性質は[Borel集合のLebesgue可測性とBaire性](#prop-sqc11-borel-regularity)から結論します。

<!-- proof-start -->
### 証明

$r>0$ であり $s=r\sqrt\pi>0$ です。$D_r,Q_s$ は閉有界なBorel集合で、開円盤と開正方形をそれぞれ含みます。面積については

$$
\lambda_2(D_r)=\pi r^2
=r^2(\sqrt\pi)^2=s^2=\lambda_2(Q_s).
$$

正の有限値であり、[境界次元の補題](../SQC9/index.md#lem-sqc9-boundary-dimension)から双方の境界上box次元が $1<2$ です。よって[Marks–UngerのBorel等分解定理](#thm-sqc11-marks-unger)の仮定がすべて満たされ、有限個のBorel片 $A_i$ とベクトル $v_i$ によって

$$
D_r=\bigsqcup_{i=1}^m A_i,\qquad
Q_s=\bigsqcup_{i=1}^m(A_i+v_i)
$$

が成立します。[Borel集合の二つの正則性](#prop-sqc11-borel-regularity)から各片はLebesgue可測かつBaire性を持ちます。なお平行移動は同相写像なので像片 $A_i+v_i$ もBorelです。
<!-- proof-end -->

この証明は、**各点が一つの元の片と一つの行先の片にだけ属する**厳密な分割の存在を示します。他方、$m$ の最小値、各片の具体的な境界線、各片の面積が正かどうかは与えていません。原論文の「構成的」という語を、コンパスやはさみで有限手順の切断図が描けるという意味に読み替えてはいけません。

### 非Borelな円盤の変形では、二つの定理の射程が分かれる

円周 $\partial D_r$ の**非Borel部分集合** $N$ を一つ取ります。このような $N$ は存在します。円周は連続体濃度でBorel集合の総数は連続体濃度にすぎないためです。$A=D_r\setminus N$ と置くと、開円盤は丸ごと残り、$\overline A=D_r$ です。外側の点は $A$ に属さず、円周上の点はどれも内側と外側の両方に任意に近いので

$$
\operatorname{int}(A)=\operatorname{int}(D_r),
\qquad \partial A=\partial D_r.
$$

円周は面積0なので $\lambda_2(A)=\pi r^2$ です。しかも $A$ がBorelなら $N=D_r\setminus A$ もBorelとなり、$N$ の選択に矛盾します。従って $A$ は**非Borel**です。

この $A$ と $Q_{r\sqrt\pi}$ には[Grabowski–Máthé–Pikhurkoの定理](#thm-sqc11-gmp)を適用できます（有界、内部非空、等面積、境界次元 $1$）。しかし[Marks–Ungerの定理](#thm-sqc11-marks-unger)の「元の二集合がBorel」という仮定は満たしません。実際、$A$ を有限個のBorel片の和に分けること自体が不可能です。

**円積できるか**と**どの正則性の片で円積できるか**は、同じ問いではありません。

### 参考文献

- Ł. Grabowski, A. Máthé, O. Pikhurko, “Measurable circle squaring,” *Annals of Mathematics* **185** (2017), 671–710. [原論文](https://annals.math.princeton.edu/2017/185-2/p06)、Theorem 1.2。Lebesgue可測性とBaire性を同時に満たす片。
- A. S. Marks, S. T. Unger, “Borel circle squaring,” *Annals of Mathematics* **186** (2017), 581–605. [原論文](https://annals.math.princeton.edu/2017/186-2/p04)、Theorem 1.2。Borel片と流量に基づく構成。
- M. Laczkovich, “Decomposition of sets with small boundary,” *Journal of the London Mathematical Society* **46** (1992), 58–64。[前講の定理](../SQC9/index.md#thm-sqc9-laczkovich-general)の原論文。

---

## 5. 演習：定義・仮定・存在定理の射程を自力で調べる

### Level A：定義を一つずつ確かめる

**SQC11-A1（Borelの閉性）**　$(0,1)$、$[0,1]$、$[0,1)$、$\mathbb Q\cap[0,1]$ がすべてBorelであることを、それぞれの表現に使った集合演算を明記して説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$(0,1)$ は開集合、$[0,1]=\mathbb R\setminus((-\infty,0)\cup(1,\infty))$ は開集合の和の補集合です。$[0,1)=[0,1]\cap(-\infty,1)$ は二つのBorel集合の共通部分です。最後に $\mathbb Q\cap[0,1]$ は可算集合なので点の列 $\{q_n\}$ と書け、$\bigcup_n\{q_n\}$ です。各 $\{q_n\}$ は閉集合で、$\sigma$-代数は可算和で閉じています。いずれも[定義](#def-sqc11-borel)の許す構成です。
<!-- solution-end -->

**SQC11-A2（Baire性の直接確認）**　至る所疎な集合 $F\subset\mathbb R$ の任意の部分集合 $E\subset F$ がBaire性を持つことを、定義中の開集合とmeager集合を指定して示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

$F$ が至る所疎なら $E\subset F$ も至る所疎なので、meagerです。開集合 $U=\varnothing$ と例外 $M=E$ を取れば $E\triangle U=E=M$ です。従って[Baire性の定義](#def-sqc11-baire)を満たします。$E$ が測度0かどうかは、この証明では使っていません。
<!-- solution-end -->

**SQC11-A3（平行移動とBorel性）**　Borel集合 $E\subset\mathbb R^2$ と $v\in\mathbb R^2$ に対し $E+v$ がBorelであることを、開集合からの生成という定義で証明せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$T_v(x)=x+v$ は連続で逆写像 $T_{-v}$ も連続です。$\mathcal F=\{E\subset\mathbb R^2:T_v(E)\text{ がBorel}\}$ と置けば、$T_v$ は全単射なので、全体集合、補集合、可算和を保ち、$\mathcal F$ は $\sigma$-代数です。開集合 $O$ の像 $O+v$ も開であるため $\mathcal F$ はすべての開集合を含みます。[Borelの最小性](#def-sqc11-borel)により $\mathcal B(\mathbb R^2)\subseteq\mathcal F$、従って $E+v$ はBorelです。
<!-- solution-end -->

**SQC11-A4（移動ラベルの逆像）**　$A=[0,2)\times[0,1)$ で、$0\le s<1$ なら移動ベクトル $(0,0)$、$1\le s<2$ なら $(-1,1)$ を割り当てる。各ラベルの逆像と像の二片を求め、両側で厳密な分割となることを示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

ラベルの逆像は $A_{(0,0)}=[0,1)\times[0,1)$、$A_{(-1,1)}=[1,2)\times[0,1)$ です。互いに素で和が $A$。移動像はそれぞれ $[0,1)\times[0,1)$ と $[0,1)\times[1,2)$ で、互いに素かつ和は $B=[0,1)\times[0,2)$ です。全片が半開長方形なのでBorelであり、[片とBorel写像の対応](#prop-sqc11-borel-label)を直接確認できました。
<!-- solution-end -->

**SQC11-A5（円積の面積条件）**　半径 $2$ の閉円盤と等面積の閉正方形の辺長を求め、両集合がBorelであり、境界の上box次元が $2$ 未満であることを確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

円盤の面積は $\pi\cdot2^2=4\pi$ です。正方形の辺長 $s>0$ は $s^2=4\pi$ より $s=2\sqrt\pi$ です。両者は閉集合でBorelです。[線分・円周・正方形境界の上box次元](../SQC9/index.md#lem-sqc9-boundary-dimension)からどちらの境界も上box次元 $1<2$。従って[Marks–Ungerの定理](#thm-sqc11-marks-unger)に $d=2$、$A=D_2$、$B=Q_{2\sqrt\pi}$ を代入する条件がすべて揃います。
<!-- solution-end -->

### Level B：定理の強さと失敗する推論を見抜く

**SQC11-B1（包含が真に厳しい）**　Cantor集合 $C$ の部分集合の個数とBorel集合の個数を比較し、「Lebesgue可測かつBaire性を持つがBorelでない」集合が存在することを説明せよ。用いた測度論の条件を明記せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$C$ の濃度は $\mathfrak c$、部分集合の個数は $2^{\mathfrak c}>\mathfrak c$。Borel集合の総数は高々 $\mathfrak c$ なので、$C$ の部分集合で非Borelな $N$ が存在します。中三分の第 $n$ 段階の被覆全長は $(2/3)^n\to0$ なので $C$ のLebesgue測度は0。**Lebesgue測度の完備性**から $N\subset C$ も可測で測度0です。$C$ は至る所疎で $N$ はmeagerだから、$N\triangle\varnothing=N$ となりBaire性を持ちます。従って[Borel集合のLebesgue可測性とBaire性](#prop-sqc11-borel-regularity)の逆は一般に成立しません。
<!-- solution-end -->

**SQC11-B2（Borel片から元の集合へ）**　任意の集合 $A$ が有限個のBorel集合片の互いに素な和として書けるなら $A$ 自体がBorelであることを証明せよ。これを用い、$A$ が非Borelなら「Borel片の有限平行移動等分解」は不可能である理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$A=\bigsqcup_{i=1}^m A_i$ で各 $A_i$ がBorelなら、$A=\bigcup_{i=1}^m A_i$ は有限和（したがって可算和）なのでBorelです。従って非Borelな $A$ にBorel片を要求することは定義から矛盾します。この場合[Marks–UngerのBorel定理](#thm-sqc11-marks-unger)は前提を満たさず、たとえ[可測版](#thm-sqc11-gmp)の他の仮定を満たしていてもBorel片の存在を結論できません。
<!-- solution-end -->

**SQC11-B3（面積保存の仮定）**　有限平行移動等分解 $A=\bigsqcup_i A_i$、$B=\bigsqcup_i(A_i+v_i)$ において、片がすべてLebesgue可測なら $\lambda_d(A)=\lambda_d(B)$ を証明せよ。片が任意集合である場合、同じ式を機械的に書けない理由も述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

各 $A_i$ が可測なら平行移動像も可測で $\lambda_d(A_i+v_i)=\lambda_d(A_i)$。両側が厳密な有限分割なので、測度の有限加法性をそれぞれに用いて

$$
\lambda_d(B)=\sum_{i=1}^m\lambda_d(A_i+v_i)
=\sum_{i=1}^m\lambda_d(A_i)=\lambda_d(A)
$$

です。これは[SQC9の面積保存命題](../SQC9/index.md#prop-sqc9-measurable-area)と同じ計算です。任意集合片では非可測な $A_i$ に $\lambda_d(A_i)$ が定義されないため、第一の等号をそのまま用いる資格がありません。[Laczkovichの定理](../SQC9/index.md#thm-sqc9-laczkovich-general)だけを使って片の測度を計算してはいけません。
<!-- solution-end -->

**SQC11-B4（研究級の証明の飛躍）**　「有限個の移動候補があり、各点に候補がある。ゆえにBorelな有限等分解がある」という議論の欠落を、(i)マッチング、(ii)両側の被覆、(iii)Borel性、の三点で説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

(i) 候補が存在するだけでは複数の元点が同じ行先を選ぶことがあり、マッチングとは限りません。(ii) 左側を覆う単射が得られても、右側の点がすべて使われる全射性は別に必要です。[SQC10の有限移動と完全マッチングの対応](../SQC10/index.md#prop-sqc10-translation-matching)では**完全**マッチングが必要でした。(iii) 仮に点集合間の全単射が得られても、$A_v=\{x:f(x)-x=v\}$ がBorelとなるには $f$ のBorel性が必要です。[Borelラベル対応命題](#prop-sqc11-borel-label)の逆像の計算はその条件を明示しています。無限グラフ上でこの条件を達成するのが引用研究の非自明な部分です。
<!-- solution-end -->

**SQC11-B5（二つの2017年定理の量化）**　次の三文の正誤と根拠を述べよ。(i) Grabowski–Máthé–Pikhurkoの定理は各片のLebesgue可測性とBaire性を同時に保証する。(ii) Marks–Ungerの定理は、元の集合がLebesgue可測ならBorel片を保証する。(iii) 2017年の両定理は分割片の境界上box次元が $d$ 未満であることを保証する。

- Level: B

<!-- solution-start -->
**詳細解答**

(i) 正。前提の有界性・内部非空・等面積・元の境界次元条件の下で、各片が**両方**の性質を満たすのが[可測等分解定理](#thm-sqc11-gmp)です。(ii) 誤。[Borel定理](#thm-sqc11-marks-unger)は元の集合 $A,B$ 自体がBorelであることを仮定します。Lebesgue可測だけでは足りず、第1節の非Borel反例が示すように一般には強められません。(iii) 誤。境界次元条件は**元の二集合**に課しています。各片の境界の次元への制限は、この二定理の表示した結論にはありません。
<!-- solution-end -->

### Level C：正則性を変えた円積の総合判定

**SQC11-C1（円環・非Borel円盤・Borel円積）**　$0<a<R$ とし、閉円環 $H=\{(x,y):a^2\le x^2+y^2\le R^2\}$ を考える。

1. $H$ と等面積の閉正方形 $Q_s$ の辺長 $s$ を計算し、Marks–Ungerの定理の全仮定を確認せよ。
2. 両者がBorel片の有限平行移動等分解で結ばれることと、各片がLebesgue可測かつBaire性を持つことを論じよ。
3. $H$ の外周の非Borel部分集合 $N$ を除いた $H'=H\setminus N$ を考える。$H'$ の面積、境界、Borel性を調べ、2017年の二定理のどちらを適用できるか判定せよ。
4. 上記の判定から「有限平行移動等分解の存在」「Borel片の存在」「境界の滑らかな片の存在」が異なる命題であることを説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

(1) 円環の面積は外円盤から内円盤を引いて $\lambda_2(H)=\pi(R^2-a^2)>0$ です。正の辺長は

$$
s^2=\pi(R^2-a^2),\qquad s=\sqrt{\pi(R^2-a^2)}.
$$

$H,Q_s$ は閉有界なのでBorelで、内側に小開球を含むため内部非空です。$\partial H$ は半径 $a,R$ の二円周の和です。[線分・円周・正方形境界の上box次元](../SQC9/index.md#lem-sqc9-boundary-dimension)から各円周は上box次元1で、有限和の被覆数は各被覆数の和以下なので上界は1です。外周の座標射影から下界も1です。$\partial Q_s$ の次元も1なので両者とも $1<2$、面積は等しく正で有限です。

(2) 従って[Marks–Ungerの定理](#thm-sqc11-marks-unger)が適用でき、有限個のBorel片 $A_i$ とベクトル $v_i$ で厳密分割

$$
H=\bigsqcup_i A_i,\qquad Q_s=\bigsqcup_i(A_i+v_i)
$$

が存在します。[Borel集合のLebesgue可測性とBaire性](#prop-sqc11-borel-regularity)により各 $A_i$ はLebesgue可測かつBaire性を持ちます。

(3) 外周の非Borel部分集合 $N$ は面積0で、$H'=H\setminus N$ の面積は $\pi(R^2-a^2)$ のままです。外周の点の近くには内外の点が必ずあり、円環内部と内周付近は変更していないので、$\partial H'=\partial H$ です。一方 $H'$ がBorelなら $N=H\setminus H'$ もBorelとなり矛盾するので、$H'$ は非Borelです。$H'$ は有界で内部非空、等面積、境界次元1の条件を満たすため[Grabowski–Máthé–Pikhurkoの定理](#thm-sqc11-gmp)が適用でき、Lebesgue可測かつBaire性を持つ片の有限等分解があります。対して[Marks–Ungerの定理](#thm-sqc11-marks-unger)の元のBorel性条件は破れ、そもそも非Borelな $H'$ を有限個のBorel片で分割することはできません。

(4) 有限平行移動等分解は片の正則性を要求しない存在主張です。Borel片を要求すると元の集合もBorelでなければならず、(3)のように成立範囲が狭まります。さらに両定理の境界次元仮定は元の図形に対するもので、分割片の境界が滑らか・次元1・あるいは次元2未満とは結論できません。この追加の境界正則性は次講の独立した問いです。
<!-- solution-end -->
