# CAG1-07 GAGA III――正則連接層の代数化

[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology) は**既に代数的な**連接層のコホモロジーを比較し、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom) は**既に代数化された二つの層の間**の正則な射を代数的な射として復元した。しかし、解析的な方程式だけで与えられた連接層には、比較を始めるための代数的な相手がまだない。

例えば $\mathbb P^1$ 上で $S,T$ を斉次座標とし、正則な層の射 $\mathcal O^{\mathrm{an}}(-1)\to(\mathcal O^{\mathrm{an}})^2$ を二つの成分 $(-T,S)$ で与える。この射の余核は解析的連接層だが、表示の射を代数的に戻せれば、余核そのものも代数的に作れる。この「**有限個の生成元と関係式を取り戻す**」方針を任意の解析的連接層へ広げるのが今回の目的である。

以下、$X$ は $\mathbb C$ 上の有限型**射影スキーム**、$h:X^{\mathrm{an}}\to X$ は解析化の射とする。閉埋込み $i:X\hookrightarrow\mathbb P^N_{\mathbb C}$ を一つ固定し、$\mathcal O_X(1)=i^*\mathcal O_{\mathbb P^N}(1)$ と書く。解析的なねじり層は [ねじり層の解析化](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)による $\mathcal O_{X^{\mathrm{an}}}(m)=(\mathcal O_X(m))^{\mathrm{an}}$ である。滑らかさ・既約性・被約性は仮定しない。

## 1. 何をもって「代数化できた」とするか

[解析的連接層](../CAG1-03/index.md#def-cag1-03-analytic-coherent) $\mathcal E$ は、各点の近傍では正則関数の有限行列から得られる。しかし、局所行列の係数が正則であるだけでは、それらが**全体で一つの代数的行列**から来たとは言えない。作るべきものは局所的な式の寄せ集めでなく、代数的な連接層とその解析化を $\mathcal E$ へ照合する同型である。

<a id="def-cag1-07-algebraization"></a>

<!-- formal-statement-start -->
> **定義（解析的連接層の代数化）**
> $X$ を有限型 $\mathbb C$-スキーム、$\mathcal E$ を $X^{\mathrm{an}}$ 上の解析的連接層とする。代数的連接層 $\mathcal F$ と解析的連接層の同型 $\iota$ の組

$$
(\mathcal F,\iota),\qquad
\iota:\mathcal F^{\mathrm{an}}\xrightarrow{\sim}\mathcal E
$$

> を $\mathcal E$ の**代数化**という。二つの代数化 $(\mathcal F,\iota)$、$(\mathcal G,\kappa)$ が同じものを表すとは、代数的同型 $u:\mathcal F\to\mathcal G$ が存在して $\kappa\circ u^{\mathrm{an}}=\iota$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-07-algebraization -->
**定義の確認**：$P=\mathbb P^1_{\mathbb C}$、$\mathcal E=\mathcal O_{P^{\mathrm{an}}}(1)$ とする。[ねじり層の解析化と遷移関数](../CAG1-03/index.md#prop-cag1-03-analytic-twisting)により $\mathcal F=\mathcal O_P(1)$ は代数的連接で、その解析化の局所枠と遷移関数が $\mathcal E$ のものに一致する。したがって局所枠を対応させる $\iota:\mathcal F^{\mathrm{an}}\xrightarrow{\sim}\mathcal E$ を作れる。$\iota$ は各チャートで可逆な係数 $1$ を持ち、重なりでも遷移式と可換なので層の同型である。このように**層と同型の双方**を指定することが定義の条件である。
<!-- definition-example-end -->

同じ $\mathcal E$ に別の表示や別の同型 $\iota$ が付くことはある。「一意性」とは $\mathcal F$ の文字列が一通りという意味ではない。上の定義の**指定同型と両立する唯一の代数的同型**があることを、あとで示す。

## 2. 解析的な生成元を全体で有限個選ぶ

代数側では[代数的Serreの生成補題](../CAG1-05/index.md#thm-cag1-05-serre-generation)によって、十分ねじれば大域切断で生成できた。しかしこの補題を、いま代数化したい $\mathcal E$ に適用するのは循環である。$\mathcal E$ はまだ代数的な層と分かっていないからだ。

そこで解析側には、別に証明を要する次の二つの性質を使う。$\mathcal E(m)$ は $\mathcal E\otimes\mathcal O_{X^{\mathrm{an}}}(m)$ を表し、**大域生成**とはすべての点 $x$ で評価写像 $H^0(X^{\mathrm{an}},\mathcal E(m))\otimes_{\mathbb C}\mathcal O_{X^{\mathrm{an}},x}\to\mathcal E(m)_x$ が全射となることである。

<a id="thm-cag1-07-analytic-serre"></a>

<!-- formal-statement-start -->
> **定理（Cartan–Serre型の解析的大域生成と有限次元性）**
> $X\hookrightarrow\mathbb P^N_{\mathbb C}$ を有限型射影 $\mathbb C$-スキームの閉埋込みとし、$\mathcal E$ を $X^{\mathrm{an}}$ 上の任意の解析的連接層とする。このとき次が成り立つ。
>
> 1. すべての整数 $q\ge0$ について $H^q(X^{\mathrm{an}},\mathcal E)$ は有限次元 $\mathbb C$-ベクトル空間である。
> 2. ある整数 $m_0$ が存在し、すべての $m\ge m_0$ について $\mathcal E(m)$ は大域切断で生成される。
<!-- formal-statement-end -->

**この定理は本講で証明しない解析的入力である。** 有限次元性はコンパクト複素解析空間の連接層コホモロジーに関する深い定理であり、大域生成は射影空間上の解析的連接層に対するCartan–Serre型の結果である。たとえば閉埋込み $i^{\mathrm{an}}$ に沿った $i^{\mathrm{an}}_*\mathcal E$ の解析的連接性を用いて射影空間に移し、超平面への制限と解析的コホモロジーを組み合わせて証明する。ここではその帰納の解析的補題を既証明と偽らない。原典は [Serre, GAGA（1956）](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/)、証明の構成は [Kedlaya, MIT 18.726, *GAGA*, §4](https://ocw.mit.edu/courses/18-726-algebraic-geometry-spring-2009/resources/mit18_726s09_lec22_gaga/) を参照できる。

**二つの役割は異なる。** 大域生成は各茎への評価写像を全射にする。一方、有限次元性はその評価写像に使う大域切断を有限個に選べることを保証する。次のような形の**有限全射**が得られる。

$$
\mathcal O_{X^{\mathrm{an}}}^{\oplus r}
\twoheadrightarrow\mathcal E(m),\qquad
(f_1,\ldots,f_r)\longmapsto\sum_{j=1}^r f_js_j.
$$

ここで $s_1,\ldots,s_r$ は有限次元空間 $H^0(X^{\mathrm{an}},\mathcal E(m))$ の基底、$r$ はその次元である。$\mathcal E(m)$ が零層なら $r=0$ としてよい。

**見える例**：$P=\mathbb P^1$ の $\mathcal O_{P^{\mathrm{an}}}(1)$ では、[射影直線の大域切断の計算](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)と[解析的比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)から切断 $S,T$ が基底をなす。任意の $[S:T]$ では少なくとも一方が零でなく、局所枠に対する係数が単元となるので、$m=0$ で大域生成される。ただしこれは**すでに代数的な**線束の例であり、任意の $\mathcal E$ に対する上の解析的定理を証明したことにはならない。

## 3. 生成元だけでなく関係式も有限個にする

一度全射を得ても、その核は任意の解析的連接層である。核を代数化してよいと先に仮定すると、まさにこれから示すGAGA IIIを使った循環になる。代わりに、**核にも解析的大域生成をもう一度適用する**。

<a id="lem-cag1-07-two-term"></a>

<!-- formal-statement-start -->
> **補題（解析的連接層のねじり層による二項表示）**
> $X\hookrightarrow\mathbb P^N_{\mathbb C}$ を有限型射影スキームの閉埋込みとし、$\mathcal E$ を $X^{\mathrm{an}}$ 上の解析的連接層とする。整数 $m,m'$ と有限整数 $r,s$、および正確な列

$$
\mathcal O_{X^{\mathrm{an}}}(-m')^{\oplus s}
\xrightarrow{\psi^{\mathrm{an}}}
\mathcal O_{X^{\mathrm{an}}}(-m)^{\oplus r}
\xrightarrow{\varepsilon}\mathcal E\longrightarrow0
$$

> が存在する。左端の射は**単射である必要はない**。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\mathcal E(m)$ を大域生成して $r$ 個の生成元を取る。ねじりを戻した全射の核 $\mathcal K$ は解析的連接であるから、$\mathcal K(m')$ も十分ねじれば $s$ 個の切断で生成できる。その像がちょうど $\ker\varepsilon$ となり、二項表示ができる。

<!-- proof-start -->
### 証明（解析的入力を仮定した構成）

まず[解析的大域生成と有限次元性](#thm-cag1-07-analytic-serre)を $\mathcal E$ に適用する。射影的な $X$ と解析的連接 $\mathcal E$ は定理の仮定を満たす。ある $m$ を選ぶと $H^0(\mathcal E(m))$ は有限次元 $r$ で、基底 $s_1,\ldots,s_r$ の評価写像は全点で全射である。$\mathcal O_{X^{\mathrm{an}}}(-m)$ をテンソルして、局所自由階数1なので全射性を保ったまま

$$
\varepsilon:\mathcal O_{X^{\mathrm{an}}}(-m)^{\oplus r}
\twoheadrightarrow\mathcal E
$$

を得る。$\mathcal K=\ker\varepsilon$ と置く。このとき

$$
0\longrightarrow\mathcal K\longrightarrow
\mathcal O_{X^{\mathrm{an}}}(-m)^{\oplus r}
\xrightarrow{\varepsilon}\mathcal E\longrightarrow0
$$

は短完全である。$\varepsilon$ は局所では有限自由層から[解析的連接層](../CAG1-03/index.md#def-cag1-03-analytic-coherent)への射なので、定義の核条件から $\mathcal K$ は局所有限型である。さらに、局所的な任意の射 $\varphi:\mathcal O^t\to\mathcal K$ を包含 $\mathcal K\hookrightarrow\mathcal O^r$ と合成すると、包含の単射性から二つの射の核は一致する。後者は有限自由層間の射であるから、[Okaの連接性定理](../CAG1-03/index.md#thm-cag1-03-oka-coherence)で核が局所有限型となる。これで $\mathcal K$ は連接性の二条件を満たす。ここでは代数化を使っていない。

次に同じ[解析的大域生成定理](#thm-cag1-07-analytic-serre)を $\mathcal K$ に適用する。ある $m'$ に対して $\mathcal K(m')$ は有限個の大域切断から生成され、ねじりを戻すと全射

$$
\delta:\mathcal O_{X^{\mathrm{an}}}(-m')^{\oplus s}
\twoheadrightarrow\mathcal K
$$

がある。包含写像 $j:\mathcal K\hookrightarrow\mathcal O_{X^{\mathrm{an}}}(-m)^{\oplus r}$ と合成して $\psi^{\mathrm{an}}=j\circ\delta$ と定めれば、各点の茎で

$$
\operatorname{im}(\psi^{\mathrm{an}})_x
=j_x(\mathcal K_x)
=\ker\varepsilon_x
$$

となる。したがって表示した二項列は正確である。$\delta$ の核が零とは限らず、左端に単射条件は課していない。
<!-- proof-end -->

**具体的な関係式**：$P=\mathbb P^1$、$\mathcal E=\mathcal O_{P^{\mathrm{an}}}(1)$ として $s_1=S,s_2=T$ を選ぶと、次の表示になる。

$$
\mathcal O_{P^{\mathrm{an}}}(-1)
\xrightarrow{\binom{-T}{S}}
\mathcal O_{P^{\mathrm{an}}}^{\oplus2}
\xrightarrow{\ (S\ \ T)\ }
\mathcal O_{P^{\mathrm{an}}}(1)\longrightarrow0.
$$

実際、合成は $S(-T)+T S=0$。$S\ne0$ のチャートで $S$ を局所枠と見れば右側の射は $(a,b)\mapsto a+(T/S)b$ なので、核は $(-(T/S)b,b)$ で生成される。左側の $(-T,S)$ もこの枠では $(-(T/S),1)$ に相当する。$T\ne0$ のチャートでも対称的に確認できる。これが「生成元 $S,T$ の間に関係式が一つある」という意味である。

## 4. 関係式の射を代数化し、余核を作る

二項表示の二つの自由層は[代数的ねじり層](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf)の解析化である。この点で初めて、[GAGA IIのHom比較](../CAG1-06/index.md#thm-cag1-06-gaga-hom)を左の射へ適用できる。

<a id="thm-cag1-07-gaga-algebraization"></a>

<!-- formal-statement-start -->
> **定理（GAGA III――解析的連接層の代数化）**
> $X$ を有限型射影 $\mathbb C$-スキームとする。このとき、$X^{\mathrm{an}}$ 上の任意の解析的連接層 $\mathcal E$ には代数的連接層 $\mathcal F$ と同型

$$
\mathcal F^{\mathrm{an}}\xrightarrow{\sim}\mathcal E
$$

> が存在する。$X$ に滑らかさ、既約性、被約性は必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

流れは「解析的な有限表示を得る → 表示中の正則射をGAGA IIで戻す → 代数的余核を取る → 余核の解析化を比較する」である。GAGA IIを $\mathcal E$ そのものに使うのではなく、**既に代数的と分かっている二つのねじり層の間の射**に使うことが循環を避ける決め手となる。

<!-- proof-start -->
### 証明（解析的大域生成を入力とする相対的証明）

$X$ は射影的なので閉埋込みを固定できる。[二項表示補題](#lem-cag1-07-two-term)から、解析的連接層 $\mathcal E$ に対して

$$
A^{\mathrm{an}}\xrightarrow{v}B^{\mathrm{an}}
\xrightarrow{\varepsilon}\mathcal E\longrightarrow0,
\quad A=\mathcal O_X(-m')^{\oplus s},\quad
B=\mathcal O_X(-m)^{\oplus r}
$$

という正確な列を得る。$A,B$ は代数的局所自由層、したがって代数的連接層である。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)を**この $A,B$** に適用すると、$X$ の射影性により

$$
\operatorname{Hom}_X(A,B)
\xrightarrow{\sim}
\operatorname{Hom}_{X^{\mathrm{an}}}(A^{\mathrm{an}},B^{\mathrm{an}})
$$

となる。したがって $v$ を与える代数的射 $u:A\to B$ が一意に存在し、$u^{\mathrm{an}}=v$ を満たす。

ここで**代数側で**

$$
\mathcal F:=\operatorname{coker}(u),\qquad
A\xrightarrow{u}B\longrightarrow\mathcal F\longrightarrow0
$$

と定める。$X$ はNoetherであり、[代数的連接層の核・余核の連接性](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)から $\mathcal F$ は代数的連接層となる。

[連接層の解析化と完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)を使う。代数側の像 $\operatorname{im}u$ と余核は連接であり、$0\to\operatorname{im}u\to B\to\mathcal F\to0$ を解析化しても完全である。また右完全性から $A^{\mathrm{an}}\to(\operatorname{im}u)^{\mathrm{an}}$ は全射となる。従って

$$
\mathcal F^{\mathrm{an}}
\simeq\operatorname{coker}(u^{\mathrm{an}})
=\operatorname{coker}(v)
\xrightarrow{\sim}\mathcal E.
$$

最後の同型は二項表示の正確性から得られる。これを $\iota$ とすれば $(\mathcal F,\iota)$ が求める代数化である。左端が単射かどうかを使った箇所はなく、長い自由分解を作る必要もない。
<!-- proof-end -->

この定理が新しく保証するのは、**代数化済みの層の間の射**だけでなく、そもそも代数的な相手が与えられていない**解析的連接層の存在論的な復元**である。解析的な大域生成を未証明の入力とした、GAGA III の代数化構成の証明であることに注意する。

## 5. 代数化の一意性はどこから来るか

構成では $m,m'$ や切断の基底を選んだ。別の選び方で別の代数的余核ができても、$\mathcal E$ の代数化として矛盾しないかを確認したい。ここはGAGA IIIをもう一度証明するのでなく、**GAGA IIの全単射性**で処理できる。

<a id="cor-cag1-07-uniqueness"></a>

<!-- formal-statement-start -->
> **系（指定同型と両立する代数化の一意性）**
> $X$ を有限型射影 $\mathbb C$-スキーム、$\mathcal E$ を $X^{\mathrm{an}}$ 上の解析的連接層とする。二つの代数化 $(\mathcal F,\iota)$ と $(\mathcal G,\kappa)$ に対し、$\kappa\circ u^{\mathrm{an}}=\iota$ を満たす代数的同型 $u:\mathcal F\to\mathcal G$ が**ただ一つ**存在する。したがって代数化の代数的層は同型を除いて一意である。
<!-- formal-statement-end -->

### 証明の見取り図

解析側の同型 $\kappa^{-1}\circ\iota$ をGAGA IIで代数側へ戻す。逆同型もGAGA IIで戻せば、二つの合成が恒等射であることを**忠実性**によって確認できる。

<!-- proof-start -->
### 証明

定義から $\iota:\mathcal F^{\mathrm{an}}\to\mathcal E$、$\kappa:\mathcal G^{\mathrm{an}}\to\mathcal E$ は同型である。よって

$$
w=\kappa^{-1}\circ\iota:
\mathcal F^{\mathrm{an}}\xrightarrow{\sim}\mathcal G^{\mathrm{an}}
$$

は解析的な射である。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)の全射性により一意な代数的射 $u:\mathcal F\to\mathcal G$ があって $u^{\mathrm{an}}=w$。同じ定理を $w^{-1}$ に適用すると代数的射 $v:\mathcal G\to\mathcal F$ があり、

$$
(v\circ u)^{\mathrm{an}}=w^{-1}\circ w
=\operatorname{id}_{\mathcal F^{\mathrm{an}}},\qquad
(u\circ v)^{\mathrm{an}}=\operatorname{id}_{\mathcal G^{\mathrm{an}}}.
$$

GAGA IIの単射性から $v\circ u=\operatorname{id}_{\mathcal F}$ と $u\circ v=\operatorname{id}_{\mathcal G}$ である。したがって $u$ は代数的同型で、$\kappa\circ u^{\mathrm{an}}=\iota$ も成り立つ。両立する別の $u'$ は同じ解析的射 $w$ に写るので、単射性から $u'=u$。
<!-- proof-end -->

ただし $\iota,\kappa$ を**指定しない**二つの代数的層の間に「唯一の同型」が存在するとは言っていない。例えば $\mathcal O_P$ の非零定数倍は互いに異なる自己同型である。一意なのは、指定された解析的同型に対応する**持ち上げ**である。

## 6. 非被約の例と射影性の境界

GAGA IIIの証明には滑らかさを使わなかった。式が二重の零点を持つ例で、非被約な構造まで保存されることを確認する。

<a id="prop-cag1-07-double-point"></a>

<!-- formal-statement-start -->
> **命題（射影直線上の長さ二の解析的層の代数化）**
> $P=\mathbb P^1_{\mathbb C}$ に斉次座標 $[S:T]$ を取り、$p=[0:1]$ とする。正則な層の射

$$
\mathcal O_{P^{\mathrm{an}}}(-2)
\xrightarrow{S^2}\mathcal O_{P^{\mathrm{an}}}
$$

> の余核を $\mathcal E$ とする。このとき $\mathcal E$ は $p$ のみに支えられ、$w=S/T$ を局所座標とすると茎は次である。

$$
\mathcal E_p\simeq\mathbb C\{w\}/(w^2).
$$

> さらに $\mathcal E$ は代数的な射 $\mathcal O_P(-2)\xrightarrow{S^2}\mathcal O_P$ の余核を解析化したものである。
<!-- formal-statement-end -->

### 証明の見取り図

$T\ne0$ では $S^2$ の局所係数が $w^2$ となり、$w=0$ で長さ二の商を作る。$S\ne0$ では係数が単元 $1$ だから余核は消える。代数的余核を取ってから解析化しても同じ局所表示になる。

<!-- proof-start -->
### 証明

$U_T=\{T\ne0\}$ 上で $w=S/T$ とする。[ねじり層の遷移関数](../../AG/AG2-06/index.md#prop-ag2-06-od-cocycle)に従う $\mathcal O(-2)$ の局所枠で $S^2$ を割ると、射の係数は $w^2$ となる。したがって $p$ での余核の茎は

$$
\mathcal E_p=\mathbb C\{w\}/(w^2)
=\mathbb C\cdot1\oplus\mathbb C\cdot w.
$$

$U_T$ 内で $w\ne0$ なら $w^2$ は単元で商は零。一方 $U_S=\{S\ne0\}$ 上では $S^2/S^2=1$ なので余核は零である。以上により支持は $p$ だけで、茎の複素ベクトル空間としての長さは二である。

代数側でも $U_T$ の局所商は $\mathbb C[w]_{(w)}/(w^2)$、$U_S$ 側では零となる。[解析化の局所表示](../CAG1-03/index.md#prop-cag1-03-local-presentation)で $\mathbb C[w]_{(w)}$ を $\mathbb C\{w\}$ へ拡張すると上の茎となり、[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)から余核の層も一致する。
<!-- proof-end -->

正則関数 $e^w$ は $p$ の近くで単元なので、局所関係式を $w^2$ から $e^ww^2$ に替えても同じ商になる。**表示行列に正則関数が見えること**と、**余核が代数化できないこと**は別問題である。

他方、射影性を外すと実際に失敗する。$\mathbb A^1_{\mathbb C}$ の解析化 $\mathbb C$ 上で、正則関数 $\sin(\pi z)$ の商

$$
\mathcal Q=\mathcal O_{\mathbb C}/(\sin(\pi z))
$$

は局所的な正則行列の余核なので[Okaの連接性定理](../CAG1-03/index.md#thm-cag1-03-oka-coherence)により解析的連接で、支持は整数点の無限離散集合 $\mathbb Z$ である。もし有限生成 $\mathbb C[z]$-加群から来れば、その台は代数的閉集合で、$\mathbb A^1$ では有限集合か全体に限られる。$\mathbb Z$ はどちらでもないので代数化できない。さらに $\mathcal O_{\mathbb C}$ の自己射「$e^z$ 倍」は代数的多項式の自己射から来ず、[GAGA IIの非射影での失敗](../CAG1-06/index.md#thm-cag1-06-gaga-hom)とも対応する。射影性は解析的大域生成とHom比較の**両方**で働いていた。

## 7. 演習――生成・関係・余核を自分でつなぐ

まず基底と核を一つずつ求め、次に有限表示と代数化を組み立てる。最後に射影性がない場合の失敗を、証明のどの矢印が使えなくなるかまで検討する。

### Level A

<a id="ex-cag1-07-a01"></a>
#### CAG1-07-A01 構造層は最も短い表示を持つ
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とし、$\mathcal E=\mathcal O_{P^{\mathrm{an}}}$ とする。$m=0$ での大域切断の基底、評価写像、その核を求め、二項表示から代数化を与えよ。

<!-- solution-start -->
**詳細解答**。[射影直線の大域関数](../../AG/AG2-05/index.md#thm-ag2-05-projective-global-constants)と[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)から

$$
H^0(P^{\mathrm{an}},\mathcal E)=\mathbb C\cdot1.
$$

評価写像 $\mathcal O_{P^{\mathrm{an}}}\to\mathcal E$ は $f\mapsto f\cdot1=f$ であり各茎で恒等写像だから、全射で核は零。二項表示は

$$
0\longrightarrow\mathcal O_{P^{\mathrm{an}}}
\xrightarrow{\operatorname{id}}\mathcal E\longrightarrow0
$$

である。代数側でも同じ恒等射を使えば余核は $\mathcal O_P$ になり、$\mathcal O_P^{\mathrm{an}}=\mathcal E$ なので $(\mathcal O_P,\operatorname{id})$ が[代数化の定義](#def-cag1-07-algebraization)を満たす。二項表示補題の左側の自由層は $s=0$ としてよい。
<!-- solution-end -->

<a id="ex-cag1-07-a02"></a>
#### CAG1-07-A02 二つの生成元の関係式を導く
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とする。$\mathcal O_{P^{\mathrm{an}}}(1)$ の切断 $S,T$ による評価写像 $\mathcal O^2\to\mathcal O(1)$ の核を求め、各標準チャートでその生成元を検査せよ。

<!-- solution-start -->
**詳細解答**。評価写像は $(a,b)\mapsto aS+bT$。[ねじり層の局所表示](../../AG/AG2-06/index.md#prop-ag2-06-od-cocycle)に従い $U_S$ では $u=T/S$ を使うと、局所枠 $S$ に関する係数写像は

$$
(a,b)\longmapsto a+ub.
$$

その核の任意の元は $a=-ub$ を満たすので $(-u,1)b$ と書ける。$U_T$ では $v=S/T$ として $(a,b)\mapsto va+b$、核は $(1,-v)a$ である。大域射 $(-T,S):\mathcal O(-1)\to\mathcal O^2$ は $U_S$ で $(-u,1)$、$U_T$ で $(-1,v)$ とそれぞれ単元倍を除いて同じ生成元を与える。よって

$$
\operatorname{im}\binom{-T}{S}
=\ker(S\ \ T),
$$

が両チャートで成り立ち、[二項表示補題](#lem-cag1-07-two-term)の具体例となる。
<!-- solution-end -->

<a id="ex-cag1-07-a03"></a>
#### CAG1-07-A03 二重零点の局所長さ
- Level: A

$P=\mathbb P^1_{\mathbb C}$、$p=[0:1]$ とする。$S^2:\mathcal O_{P^{\mathrm{an}}}(-2)\to\mathcal O_{P^{\mathrm{an}}}$ の余核 $\mathcal E$ の支持と $p$ での茎の $\mathbb C$-次元を求めよ。

<!-- solution-start -->
**詳細解答**。$U_T$ の座標 $w=S/T$ と局所枠で係数は $w^2$。したがって

$$
\mathcal E_p=\mathbb C\{w\}/(w^2)
=\{a+bw:a,b\in\mathbb C\},
\qquad\dim_{\mathbb C}\mathcal E_p=2.
$$

$w\ne0$ なら $w^2$ は局所環の単元、$U_S$ では $S^2/S^2=1$ なので、どちらでも余核は零。[長さ二の層の命題](#prop-cag1-07-double-point)の主張通り、支持は $p$ に限られる。単に支持が一点という情報だけでは $w$ の冪零元を落とすので、長さ二の茎まで確かめる必要がある。
<!-- solution-end -->

<a id="ex-cag1-07-a04"></a>
#### CAG1-07-A04 どのHom比較を使うか
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とする。$\mathcal O_{P^{\mathrm{an}}}(-1)\to\mathcal O_{P^{\mathrm{an}}}$ の正則な層の射をすべて記述し、それが代数的な射に一意に持ち上がる理由を述べよ。

<!-- solution-start -->
**詳細解答**。[ねじり層の双対とHom](../../AG/AG2-06/index.md#prop-ag2-06-tensor-dual)で内部Homは $\mathcal O(1)$ となる。[射影直線上のO(d)の大域切断](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)に $d=1$ を代入すると、代数側のHomは

$$
H^0(P,\mathcal O_P(1))
=\mathbb C S\oplus\mathbb C T.
$$

両層は代数的な $\mathcal O_P(-1),\mathcal O_P$ の解析化であるから、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)が適用できる。したがって任意の正則な射は $aS+bT$（$a,b\in\mathbb C$）の解析化で、係数 $a,b$ は一意。**未代数化の $\mathcal E$ への射**には、この段階のHom比較は直接適用できない。
<!-- solution-end -->

<a id="ex-cag1-07-a05"></a>
#### CAG1-07-A05 同型を指定した一意性
- Level: A

$P=\mathbb P^1_{\mathbb C}$、$\mathcal E=\mathcal O_{P^{\mathrm{an}}}$ とする。二つの代数化を $(\mathcal O_P,\operatorname{id})$ と $(\mathcal O_P,2\operatorname{id})$ としたとき、指定同型と両立する代数的同型 $u$ を求めよ。

<!-- solution-start -->
**詳細解答**。[代数化の定義](#def-cag1-07-algebraization)の両立条件は

$$
(2\operatorname{id})\circ u^{\mathrm{an}}
=\operatorname{id},
\quad\text{すなわち}\quad
u^{\mathrm{an}}=\tfrac12\operatorname{id}.
$$

$u=\tfrac12\operatorname{id}_{\mathcal O_P}$ は代数的同型でこの条件を満たす。他にあれば[Hom比較の単射性](../CAG1-06/index.md#thm-cag1-06-gaga-hom)から同じ射になる。これは「代数的層 $\mathcal O_P$ の自己同型が一つだけ」という意味ではない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-07-b01"></a>
#### CAG1-07-B01 対角表示から二つの二重零点を読む
- Level: B

$P=\mathbb P^1_{\mathbb C}$ 上の解析的な射

$$
\mathcal O_{P^{\mathrm{an}}}(-2)^{\oplus2}
\xrightarrow{\left(\begin{smallmatrix}S^2&0\\0&T^2\end{smallmatrix}\right)}
\mathcal O_{P^{\mathrm{an}}}^{\oplus2}
$$

の余核 $\mathcal E$ について、支持、非零の茎の長さ、および代数化を求めよ。

<!-- solution-start -->
**詳細解答**。対角行列なので余核は二つの商の直和である。第一成分は[長さ二の層の計算](#prop-cag1-07-double-point)から $p=[0:1]$ だけに支えを持ち、$\mathbb C\{w\}/(w^2)$（$w=S/T$）を茎に持つ。第二成分は $q=[1:0]$ の近くの $z=T/S$ で $T^2/S^2=z^2$ だから、$\mathbb C\{z\}/(z^2)$ を茎に持つ。他の点では少なくとも各対角成分がその支持外で単元となり、対応する商は零。

代数側で同じ対角行列

$$
u:\mathcal O_P(-2)^{\oplus2}\to\mathcal O_P^{\oplus2}
$$

を取り、$\mathcal F=\operatorname{coker}u$ とする。二つのねじり層は代数的連接であり、[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)により $\mathcal F^{\mathrm{an}}\simeq\mathcal E$。茎の長さは $p,q$ でそれぞれ $2$、合計 $4$ となる。
<!-- solution-end -->

<a id="ex-cag1-07-b02"></a>
#### CAG1-07-B02 直和の生成元と唯一の関係
- Level: B

$P=\mathbb P^1_{\mathbb C}$、$\mathcal E=\mathcal O_{P^{\mathrm{an}}}\oplus\mathcal O_{P^{\mathrm{an}}}(1)$ とする。$m=0$ での評価写像を $\mathcal O^3$ から書き、その核の大域的な表示と代数化を与えよ。

<!-- solution-start -->
**詳細解答**。$\mathcal O$ の切断 $1$ と $\mathcal O(1)$ の切断 $S,T$ で生成するので、評価写像は

$$
(a,b,c)\longmapsto(a,bS+cT).
$$

核では第一成分 $a=0$、第二成分 $bS+cT=0$。[A02の局所核計算](#ex-cag1-07-a02)を適用すると $(b,c)$ は $(-T,S)$ の局所倍である。従って

$$
\mathcal O_{P^{\mathrm{an}}}(-1)
\xrightarrow{\left(\begin{smallmatrix}0\\-T\\S\end{smallmatrix}\right)}
\mathcal O_{P^{\mathrm{an}}}^{\oplus3}
\twoheadrightarrow\mathcal E\longrightarrow0
$$

が正確である。代数側の同じ行列の余核は、第一成分の自由な $\mathcal O_P$ と、[A02の核の表示](#ex-cag1-07-a02)の余核 $\mathcal O_P(1)$ の直和になる。[GAGA IIIの余核構成](#thm-cag1-07-gaga-algebraization)と一致して $\mathcal F=\mathcal O_P\oplus\mathcal O_P(1)$ が代数化である。
<!-- solution-end -->

<a id="ex-cag1-07-b03"></a>
#### CAG1-07-B03 異なる余核表示の両立
- Level: B

$P=\mathbb P^1_{\mathbb C}$、$p=[0:1]$ とする。代数的な二つの余核

$$
\mathcal F=\operatorname{coker}(\mathcal O_P(-1)\xrightarrow{S}\mathcal O_P),
\qquad
\mathcal G=\operatorname{coker}(\mathcal O_P(-2)\xrightarrow{S}\mathcal O_P(-1))
$$

が同型であることを、具体的な可換図式に相当する射を指定して示せ。

<!-- solution-start -->
**詳細解答**。$T$ の乗法は $\mathcal O_P(-2)\to\mathcal O_P(-1)$ と $\mathcal O_P(-1)\to\mathcal O_P$ の両方に定まり、$ST=TS$ から二つの列の間に可換な正方形を作る。従って余核へ誘導される射 $\overline T:\mathcal G\to\mathcal F$ がある。

$U_T$ の座標 $w=S/T$ では、両余核は局所枠を使って $\mathbb C[w]/(w)$ と同一視でき、$T$ の局所係数は $1$ である。したがって $\overline T$ は $p$ の茎で恒等写像になる。$U_S$ では $S$ は単元なので両余核の茎は零。ゆえに $\overline T$ は層の同型である。解析化しても同じ同型となり、[指定同型に両立する一意性](#cor-cag1-07-uniqueness)の具体例になる。
<!-- solution-end -->

<a id="ex-cag1-07-b04"></a>
#### CAG1-07-B04 代数化可能でもHom比較が壊れる
- Level: B

$X=\mathbb A^1_{\mathbb C}$、$X^{\mathrm{an}}=\mathbb C$ とする。$\mathcal O_{\mathbb C}$ 自体が代数化可能であることを示し、しかし $e^z$ 倍の正則な自己射が $\mathcal O_X$ の代数的自己射にならない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。[連接層の解析化の定義](../CAG1-03/index.md#def-cag1-03-sheaf-analytification)から $(\mathcal O_X)^{\mathrm{an}}=\mathcal O_{\mathbb C}$ なので、構造層は代数化できる。一方、$\mathcal O_X$ の代数的自己射は $1$ の像で決まり、係数は

$$
\operatorname{End}_{\mathcal O_X}(\mathcal O_X)
=\Gamma(X,\mathcal O_X)=\mathbb C[z]
$$

である。解析側の $e^z$ 倍は正則な自己射であるが、$e^z$ は多項式でない。実際、もし次数 $d$ の多項式なら $(d+1)$ 階微分は零のはずだが、$e^z$ は何回微分しても $e^z\ne0$。よって代数的射の解析化ではない。射影性を外すと「層の代数化の存在」と「その間の全正則射の代数性」は別々に失敗しうる。
<!-- solution-end -->

### Level C

<a id="ex-cag1-07-c01"></a>
#### CAG1-07-C01 正則な二点支持層を代数的余核へ戻す
- Level: C

$P=\mathbb P^1_{\mathbb C}$ の解析化上で、正則な層の射 $S^2+T^2:\mathcal O(-2)\to\mathcal O$ の余核を $\mathcal E$ とする。

1. 支持を求め、各点の茎の長さを計算せよ。
2. 同じ代数的射の余核 $\mathcal F$ が $\mathcal E$ を代数化することを証明せよ。
3. 別の有限表示から代数化 $(\mathcal G,\kappa)$ ができた場合、同型 $\mathcal F\to\mathcal G$ の存在と、何を指定したときに一意になるかを述べよ。

<!-- solution-start -->
**詳細解答**。

**（1）支持と長さ。** $U_T$ の座標を $w=S/T$ とすると、射の局所係数は次のように因数分解できる。

$$
w^2+1=(w-i)(w+i).
$$

$w=i$ の局所環では $w+i$ の値は $2i\ne0$ なので単元である。従って余核の茎は $\mathbb C\{w-i\}/(w-i)\simeq\mathbb C$ となり、長さ1。$w=-i$ では $w-i$ が単元となって同じく長さ1である。$U_S$ の座標 $v=T/S$ でも係数 $1+v^2$ の零点は同じ二点に対応し、新たな支持点はない。よって支持は $[i:1]$ と $[-i:1]$、総長さは2である。

**（2）代数化。** 代数的な射 $u:\mathcal O_P(-2)\xrightarrow{S^2+T^2}\mathcal O_P$ を取り、$\mathcal F=\operatorname{coker}u$ とする。$P$ はNoetherなので余核は連接。$u^{\mathrm{an}}$ は問題の正則射そのものであり、[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)から

$$
\mathcal F^{\mathrm{an}}
\simeq\operatorname{coker}(u^{\mathrm{an}})
=\mathcal E.
$$

これで[代数化の定義](#def-cag1-07-algebraization)の二つのデータを与えた。

**（3）一意性。** 二つの解析化から $\mathcal E$ への同型をそれぞれ $\iota,\kappa$ と指定したなら、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で $\kappa^{-1}\iota$ を一意に持ち上げられる。逆射も持ち上げると[一意性の系](#cor-cag1-07-uniqueness)と同じ合成検証により代数的同型となる。$\iota,\kappa$ を指定しなければ、同型の存在までは言えるが、**唯一の同型**とは言えない。
<!-- solution-end -->

<a id="ex-cag1-07-c02"></a>
#### CAG1-07-C02 非射影で「有限表示」が代数化を保証しない
- Level: C

$X=\mathbb A^1_{\mathbb C}$、$X^{\mathrm{an}}=\mathbb C$ とし、$\mathcal Q=\mathcal O_{\mathbb C}/(\sin(\pi z))$ とする。

1. $\mathcal Q$ が解析的連接で、その支持が $\mathbb Z$ であることを確認せよ。
2. $\mathbb C[z]$ 上の有限生成加群 $M$ について、台 $\operatorname{Supp}M$ が有限集合または $\mathbb A^1$ 全体であることを示し、$\mathcal Q$ が代数化できないと結論せよ。
3. $\mathcal Q$ は正則な大域切断 $1$ の像で生成される。それでも本章のGAGA IIIの構成ができないのは、どの入力が欠けるからか説明せよ。

<!-- solution-start -->
**詳細解答**。

**（1）解析的連接性と支持。** $z\mapsto\sin(\pi z)$ は整関数だから、$\mathcal O_{\mathbb C}$ 上のその乗法は正則な射であり、[Okaの連接性定理](../CAG1-03/index.md#thm-cag1-03-oka-coherence)により余核 $\mathcal Q$ は解析的連接である。整数 $n$ では

$$
\left.\frac{d}{dz}\sin(\pi z)\right|_{z=n}
=\pi(-1)^n\ne0
$$

なので一次零点となり、茎は $\mathbb C\{z-n\}/(z-n)\simeq\mathbb C$ である。整数以外では係数が単元で商は零。よって支持は無限離散集合 $\mathbb Z$ である。

**（2）非代数化。** $\mathbb C[z]$ は主イデアル整域で、有限生成加群 $M$ の台はZariski閉集合

$$
\operatorname{Supp}M=V(\operatorname{Ann}M)
$$

である。$\operatorname{Ann}M=(0)$ なら台は全体、零でない多項式 $f$ を含むなら台は $V(f)$ という有限集合に含まれる。代数的層を解析化しても支持は同じ複素点集合なので、$\mathbb Z$ を支持とする $\mathcal Q$ はそのような $M$ の解析化ではあり得ない。

**（3）証明機構の失敗。** $1$ の剰余類から $\mathcal O_{\mathbb C}\twoheadrightarrow\mathcal Q$ は全射だが、核の $\sin(\pi z)\mathcal O_{\mathbb C}$ を代数的関係式として戻せるとは限らない。射影スキームでは[解析的大域生成と有限次元性](#thm-cag1-07-analytic-serre)を核にも使い、**代数的ねじり層同士**の射を[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で戻せた。アフィン直線ではこのHom比較が成立せず、$\sin(\pi z)$ を多項式の射へ戻せない。大域生成一回と解析的有限表示だけでは、代数化の証明にならない。
<!-- solution-end -->

## まとめと次章への橋

解析的連接層 $\mathcal E$ に対し、解析的な大域生成を**層本体と核の二度**使って有限二項表示を作り、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で関係式の射を代数化し、[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)で代数的余核を元の $\mathcal E$ と同定した。指定した解析的同型と両立する代数化の同型の一意性も、Hom比較の全単射から導いた。

したがって射影的な複素スキーム上では、コホモロジー・射・対象の三つの比較が揃った。ただし解析的大域生成と有限次元性は深い解析的入力であった。次の CAG1-08 では、この三本柱を連接層の圏の同値として統合し、射影的という仮定を固有スキームへ広げるときの追加の論証を切り分ける。
