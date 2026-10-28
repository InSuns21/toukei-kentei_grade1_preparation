# CAG1-08 射影版GAGAの圏同値と固有性の境界

[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology) ではコホモロジーを、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom) では層の射を、[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization) では解析的連接層そのものを、代数的な言葉へ戻せるようになった。これらは別々の奇跡ではない。層と射を一つの仕組みとして往復させる「圏の同値」がその共通の形である。

ただし、定理に「射影的」と書いてあったことは忘れられない。射影性より弱い**固有性**でも比較は成り立つが、前章で使った $\mathcal O(1)$ を一般の固有スキームへそのまま持ち込めるわけではない。反対に非固有なアフィン直線では、正則関数の時点ですでに比較が壊れる。この三つの領域を、成立する論証と必要な追加定理で切り分けよう。

以下、$X$ は特に断らない限り $\mathbb C$ 上の有限型射影スキーム、$h:X^{\mathrm{an}}\to X$ は[解析化](../CAG1-02/index.md#thm-cag1-02-analytification-functor)の射とする。$\operatorname{Coh}(X)$ は $X$ 上の代数的連接層とその層準同型の圏、$\operatorname{Coh}(X^{\mathrm{an}})$ は解析的連接層と正則な層準同型の圏である。対象だけでなく、恒等射と射の合成も考える。滑らかさ、既約性、被約性は仮定しない。

## 1. 「層を全部戻せる」を正確に言い直す

二つの連接層の集合が一対一に対応しても、その間の射や合成を保てるとは限らない。例えばある層の自己同型を忘れてしまえば、同じ層を取り戻せても元の幾何学的操作は復元できない。そこで、対象と射の双方を扱う関手について、何が必要かを分けて定める。

<a id="def-cag1-08-category-equivalence"></a>

<!-- formal-statement-start -->
> **定義（完全忠実な関手と圏の同値）**
> 圏 $\mathcal C,\mathcal D$ の間の関手 $T:\mathcal C\to\mathcal D$ を考える。これは対象 $A$ を $T(A)$ へ、射 $u:A\to B$ を $T(u):T(A)\to T(B)$ へ送り、恒等射と合成を保つ対応である。次の性質を定める。
>
> - **完全忠実**：任意の対象 $A,B$ について次の写像が全単射である。

$$
\operatorname{Hom}_{\mathcal C}(A,B)
\xrightarrow{\ u\mapsto T(u)\ }
\operatorname{Hom}_{\mathcal D}(T(A),T(B)).
$$

> - **本質的全射**：$\mathcal D$ の任意の対象 $E$ に対し、$T(A)\simeq E$ となる $\mathcal C$ の対象 $A$ が存在する。
> - **圏の同値**：$T$ が完全忠実かつ本質的全射であること。同値な言い方として、同型を除いて逆向きの関手があり、往復が恒等関手に自然同型となる。
<!-- formal-statement-end -->

「忠実」は異なる射を同じ射へ潰さず、「完全」は解析側の射を取り逃がさず、「本質的全射」は解析側の層を同型を除いて取り逃がさない、という三つの意味を持つ。対象の文字列が完全一致する必要はない。前章の[指定同型と両立する一意性](../CAG1-07/index.md#cor-cag1-07-uniqueness)が、この「同型を除いて」の意味を具体化している。

<!-- definition-example-start: def-cag1-08-category-equivalence -->
**定義の確認**：$X=\operatorname{Spec}\mathbb C$ という一点上では、代数的連接層も解析的連接層も有限次元 $\mathbb C$-ベクトル空間である。両側で、$\mathbb C^r$ から $\mathbb C^s$ への層の射は $s\times r$ 複素行列で決まり、解析化によって各成分は変わらない。従って任意の $r,s$ で Hom 写像は全単射である。

解析側の任意の有限次元空間 $E$ は、その次元を $r$ として基底を選べば $\mathbb C^r\simeq E$ となる。これで本質的全射性も確認できた。基底の選び方が一意でないことは、圏の同値の妨げにならない。
<!-- definition-example-end -->

この最小例では、層の射を行列として**実際に**照合できた。射影的な $X$ では、行列の成分が一般の正則関数になっても同じ復元が可能であることが、GAGA IIの大きな中身だった。

## 2. 射影版GAGAを一つの定理へ

[連接層の解析化](../CAG1-03/index.md#def-cag1-03-sheaf-analytification)は、射 $u$ に対して $u^{\mathrm{an}}$ を対応させ、恒等射と合成を保つ。したがって本当に関手になる。さらに[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)により、短完全列を保つ。

<a id="thm-cag1-08-projective-equivalence"></a>

<!-- formal-statement-start -->
> **定理（射影版GAGAの圏同値）**
> $X$ を $\mathbb C$ 上の有限型射影スキームとする。解析化は $\mathbb C$-線形な完全関手を与え、これは圏の同値である。

$$
(-)^{\mathrm{an}}:\operatorname{Coh}(X)
\xrightarrow{\ \simeq\ }
\operatorname{Coh}(X^{\mathrm{an}}).
$$

> さらに任意の代数的連接層 $\mathcal F$ とすべての整数 $q\ge0$ に対して、自然なコホモロジー比較写像は同型である。

$$
c^q_{\mathcal F}:H^q(X,\mathcal F)
\xrightarrow{\sim}
H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}}).
$$

> これらの結論に $X$ の滑らかさ・既約性・被約性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

「射の比較」が完全忠実、「層の代数化」が本質的全射に対応する。関手性と完全性はさらに前の[解析化の構成](../CAG1-03/index.md#thm-cag1-03-coherent-exact)にあり、コホモロジー比較は独立の[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)で保証される。三本柱の仮定はすべて**同じ射影スキーム $X$**について満たされている。

<!-- proof-start -->
### 証明

まず代数的連接層 $\mathcal F,\mathcal G$ と射 $u:\mathcal F\to\mathcal G$ を取る。解析化の定義は局所的なテンソル積であり、恒等射は恒等射に、二射 $u,v$ の合成は

$$
(v\circ u)^{\mathrm{an}}
=v^{\mathrm{an}}\circ u^{\mathrm{an}}
$$

に移る。したがって $(-)^{\mathrm{an}}$ は関手であり、$\mathbb C$-線形性もテンソル積の線形性から従う。

次に [GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom) を $\mathcal F,\mathcal G$ に適用する。これらは代数的連接で、$X$ は射影的だから、

$$
\operatorname{Hom}_X(\mathcal F,\mathcal G)
\xrightarrow{\sim}
\operatorname{Hom}_{X^{\mathrm{an}}}
(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})
$$

が全単射となる。[定義](#def-cag1-08-category-equivalence)によりこれは完全忠実性である。さらに解析的連接層 $\mathcal E$ を任意に取ると、[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization) により代数的連接層 $\mathcal F$ と $\mathcal F^{\mathrm{an}}\simeq\mathcal E$ が存在する。これは本質的全射性であり、関手は圏の同値である。

任意の短完全列 $0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0$ に [連接層の解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)を適用すると解析側でも短完全になるので、関手は完全である。最後に各 $q\ge0$ に対する $c^q_{\mathcal F}$ の同型性は [GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology) そのものである。各補題・定理は非被約や特異な $X$ も許していたため、本定理も同じ範囲で成立する。
<!-- proof-end -->

この圏同値は「解析的連接層には代数的な模型がある」という存在だけでは終わらない。正則な射とその合成、零射、核、余核も代数的な側で扱える。次に、計算でその違いを見よう。

## 3. 自然性――比較同型は射を忘れない

二つの層のコホモロジーが同型だとしても、その層の間の射が誘導する線形写像まで対応しているかは別の問いである。例えば $\mathbb P^1$ 上の $\mathcal O\to\mathcal O(1)$ を切断 $S$ による乗法で定めると、大域切断の写像は $1\mapsto S$ である。解析側でも同じ射を使う以上、この写像が変わっては困る。

<a id="prop-cag1-08-cohomology-naturality"></a>

<!-- formal-statement-start -->
> **命題（コホモロジー比較の自然性）**
> $X$ を有限型射影 $\mathbb C$-スキーム、$u:\mathcal F\to\mathcal G$ を代数的連接層間の射、$q\ge0$ を整数とする。[射影版GAGA](#thm-cag1-08-projective-equivalence)の比較同型は次を満たす。

$$
c^q_{\mathcal G}\circ H^q(u)
=H^q(u^{\mathrm{an}})\circ c^q_{\mathcal F}.
$$

> また代数的連接層の短完全列に付随するコホモロジー長完全列では、各次数の比較写像が接続準同型とも可換である。
<!-- formal-statement-end -->

### 証明の見取り図

零次では「切断を解析的な切断として読む」操作が射と交換することを直接確かめる。高次では、[GAGA Iの比較写像](../CAG1-05/index.md#def-cag1-05-comparison-map)が層の射から誘導される複体の写像として作られているため、コホモロジーを取っても合成順序が変わらない。接続準同型については、短完全列の可換図式から作る境界写像の自然性を使う。

<!-- proof-start -->
### 証明

$q=0$ のとき $s\in H^0(X,\mathcal F)$ に対し、比較写像は代数的切断 $s$ を $s^{\mathrm{an}}$ へ移す。一方、$u$ の解析化はテンソル積から定まり、局所表示で

$$
(u(s))^{\mathrm{an}}=u^{\mathrm{an}}(s^{\mathrm{an}})
$$

が成り立つ。したがって二つの経路は同じ大域切断を与える。

$q>0$ では [GAGA Iにおける比較写像の構成](../CAG1-05/index.md#def-cag1-05-comparison-map)を使う。層の射 $u$ はその比較に用いる Čech 複体（あるいは層コホモロジーを計算する解消）上で次数ごとの写像を誘導し、微分と交換する。解析化後に同じ局所射を作用させるのと、先に $u$ を作用させてから解析化するのは一致する。従って、各次数のコチェインで可換な図式を得る。核を核へ、像を像へ送るので、商である $q$ 次コホモロジー上にも同じ可換性が降りる。

短完全列 $0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0$ は [解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)により解析側でも短完全である。接続準同型をコチェインで作るとき、$\mathcal F''$ の閉コチェインを $\mathcal F$ に持ち上げ、微分を取って $\mathcal F'$ のコチェインに戻す。持ち上げと微分の双方が比較写像と交換するため、例えば

$$
c^{q+1}_{\mathcal F'}\circ\delta^q
=\delta^q_{\mathrm{an}}\circ c^q_{\mathcal F''}
$$

が成り立つ。持ち上げの選択による差は境界となるから、コホモロジー上の式は選択によらない。
<!-- proof-end -->

**手で見る場合**：$P=\mathbb P^1_{\mathbb C}$ とし、$u:\mathcal O_P\to\mathcal O_P(1)$ を斉次座標 $S$ による乗法とする。[射影直線の切断計算](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)から、代数側の大域切断の射は

$$
H^0(u):\mathbb C\longrightarrow \mathbb CS\oplus\mathbb CT,
\qquad a\longmapsto aS
$$

となる。[解析側のねじり層比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)では $S,T$ がそのまま解析的切断を表す。解析側の大域切断の射も $a\mapsto aS$ だから、どちらの経路も同じ切断に着地する。

## 4. 解析的な完全列を代数的に復元する

解析側で層 $\mathcal E$ が別の層の核や余核として現れたとき、各項を代数化しても、それらをつなぐ**射**が戻らなければ完全列は復元できない。ここで圏同値の二つの性質を同時に使う。

<a id="prop-cag1-08-exact-lifting"></a>

<!-- formal-statement-start -->
> **命題（解析的短完全列の代数化）**
> $X$ を有限型射影 $\mathbb C$-スキームとし、解析的連接層の短完全列

$$
0\longrightarrow\mathcal E'
\xrightarrow{a}\mathcal E
\xrightarrow{b}\mathcal E''\longrightarrow0
$$

> を与える。各項の代数化同型を一つずつ指定すれば、$a,b$ は唯一の代数的射へ持ち上がり、得られる代数的連接層の列も短完全である。
<!-- formal-statement-end -->

### 証明の見取り図

まず [GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)で各対象を代数化する。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で射を一意に戻し、最後に解析化が完全であるだけでなく、複素点の各茎上で**忠実平坦**なことを使って、代数側の核・像・余核に余計な部分が残っていないと判定する。

<!-- proof-start -->
### 証明

三つの解析的連接層にそれぞれ代数化 $\mathcal F',\mathcal F,\mathcal F''$ と指定同型 $\iota',\iota,\iota''$ を取る。$\iota^{-1}a\iota'$ と $(\iota'')^{-1}b\iota$ は代数的連接層の解析化同士の射であるから、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で一意に $u:\mathcal F'\to\mathcal F$、$v:\mathcal F\to\mathcal F''$ へ持ち上がる。

解析側で $b\circ a=0$ なので $(v\circ u)^{\mathrm{an}}=0$。GAGA IIの単射性から $v\circ u=0$ である。代数的連接層の圏で

$$
\mathcal K=\ker u,\qquad
\mathcal Q=\operatorname{coker}v,\qquad
\mathcal H=\ker v/\operatorname{im}u
$$

と置く。これらは[Noetherスキーム上の連接性](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)により連接層となる。[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)によって $\mathcal K^{\mathrm{an}},\mathcal Q^{\mathrm{an}},\mathcal H^{\mathrm{an}}$ は、解析側の元の列の核・余核・中間ホモロジーと一致し、いずれも零層である。

任意の複素点 $x$ について[局所環の忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)を使う。例えば次の含意が得られる。

$$
\mathcal H_x\otimes_{\mathcal O_{X,x}}
\mathcal O_{X^{\mathrm{an}},x}=0
\quad\Longrightarrow\quad
\mathcal H_x=0.
$$

$\mathcal K,\mathcal Q$ にも同じ議論を適用する。有限型 $\mathbb C$-スキーム上の非零連接層の支持には複素閉点があるため、全ての複素点の茎が零なら層自体が零である。よって $u$ は単射、$v$ は全射で、$\ker v=\operatorname{im}u$ となる。
<!-- proof-end -->

これは代数化の「表示を変えても意味が変わらない」ことを保証する。一方、単に射影的な $X$ を固有な $X$ に置き換えた場合には、証明中のGAGA II・IIIを新たに確立しておく必要がある。

## 5. 特異点と冪零元は消えない

射影版GAGAの仮定は「射影スキーム」であって「滑らかな射影多様体」ではない。その違いは、非被約な点のように、台集合だけでは情報が失われる場合に特にはっきり現れる。

$P=\mathbb P^1_{\mathbb C}$ に斉次座標 $[S:T]$ を取り、$X=V(T^2)\subset P$ とする。これは点 $[1:0]$ を台に持つが、方程式 $T=0$ の普通の一点とは異なる。$S\ne0$ のチャートで $t=T/S$ と置くと、構造環は

$$
R=\mathbb C[t]/(t^2),\qquad t\ne0,\quad t^2=0
$$

である。ここで $t$ は零元ではなく冪零元である。解析化しても局所環は $\mathbb C\{t\}/(t^2)$ であり、任意の収束級数は定数項と一次項だけを残すから、$\mathbb C\{t\}/(t^2)\simeq R$ である。

<a id="prop-cag1-08-double-point"></a>

<!-- formal-statement-start -->
> **命題（非被約二重点でのGAGAの確認）**
> $X=V(T^2)\subset\mathbb P^1_{\mathbb C}$、$R=\mathbb C[t]/(t^2)$ とする。$X$ 上の連接層 $\mathcal O_X$、$\mathcal O_X/(t)$ と、$\mathcal O_X$ 上の $t$ による乗法射は解析化によってそれぞれ同じ有限 $R$-加群、同じ乗法射に対応する。特に次の列とその解析化はともに完全である。

$$
0\longrightarrow R/(t)
\xrightarrow{\ \bar a\mapsto at\ }R
\xrightarrow{\ \cdot t\ }R
\longrightarrow R/(t)\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$R$ の元を $a+bt$ と書けば、$t(a+bt)=at$ なので核と像はいずれも $(t)$ になる。解析的局所環で高次項が $t^2=0$ により消えるため、同じ計算がそのまま通る。

<!-- proof-start -->
### 証明

$R$ の元は $a+bt$（$a,b\in\mathbb C$）と一意に書ける。$t(a+bt)=at$ であるから、乗法 $\cdot t:R\to R$ の核は $a=0$ を満たす元の全体、すなわち $(t)$ であり、像も $(t)$ である。$R/(t)$ から $R$ への $\bar a\mapsto at$ は well-defined である。代表を $a+ct$ に変えても積は $at+ct^2=at$ のままで、$at=0$ なら $a=0$ だから単射、その像は $(t)$ となる。右端の商は乗法射の余核 $R/(t)$ である。

解析側では $f(t)=a+bt+t^2g(t)$ と局所的に書けるので、$\mathbb C\{t\}/(t^2)$ における積も $t f(t)=at$ である。よって同じ核・像・余核の計算を再現する。$X$ は零次元の射影スキームだから[射影版GAGA](#thm-cag1-08-projective-equivalence)を適用できることとも一致する。
<!-- proof-end -->

特異であっても、例えば $Y=V(UV)\subset\mathbb P^2$ は二本の射影直線の和として射影的である。交点 $[0:0:1]$ では $UV$ の両偏微分が零になり滑らかでないが、GAGAはその点を除外しない。必要なのは射影性と連接性であって、Jacobianの階数条件ではない。

## 6. 固有版へ広げるとき、何が増えるか

射影的な $X$ では、ある $\mathbb P^N$ への閉埋込みから $\mathcal O_X(1)$ を使えた。一般の**固有** $\mathbb C$-スキームには、そのような閉埋込みがあるとは限らない。固有性は「代数幾何学におけるコンパクト性」に対応する分離・有限型・普遍的閉性の条件であり、射影性より弱い条件である。固有スキームの解析化はコンパクトな解析空間となるが、逆に任意のコンパクト複素解析空間に代数的な出発点が存在するとは言えない。

<a id="thm-cag1-08-proper-gaga"></a>

<!-- formal-statement-start -->
> **定理（固有版GAGA――外部定理）**
> $X$ を $\mathbb C$ 上の固有スキームとする。このとき解析化関手は連接層の圏の正確な同値であり、任意の代数的連接層 $\mathcal F$ とすべての $q\ge0$ に対して自然な比較写像

$$
H^q(X,\mathcal F)\xrightarrow{\sim}
H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}})
$$

> は同型である。射影性・滑らかさ・被約性は仮定しない。
<!-- formal-statement-end -->

**固有版の一般証明はここでは外部定理として用いる。** 射影版の証明をそのまま一般の固有スキームに適用することはできない。代表的な入口が**Chowの補題**で、固有な有限型 $X/\mathbb C$ に対し、射影的な $\mathbb C$-スキーム $Y$ と固有全射 $p:Y\to X$ を作れる（適切な形では双有理な修正を選ぶ）。しかし、$Y$ で連接層を代数化できても、$X$ の解析的連接層が $Y$ 上の代数的層から**自動的に降下する**わけではない。ここには固有直像、短完全列による段階的還元、比較写像の整合など、射影版にない論証が必要である。

外部定理の成立範囲とChowの補題による還元については、[Kedlaya, MIT 18.726, *GAGA*（Lecture 22）](https://ocw.mit.edu/courses/18-726-algebraic-geometry-spring-2009/resources/mit18_726s09_lec22_gaga/) と [Serre, *Géométrie algébrique et géométrie analytique*（1956）](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/) を参照できる。ここで示した射影版の証明と、この追加の固有版の一般証明を混同しない。

なぜ降下が自動でないかを、具体的な射で見る。射影直線 $\mathbb P^1$ の点を $[S:T]$ とし、射影平面の尖点三次曲線

$$
C=V(Y^2Z-X^3)\subset\mathbb P^2
$$

へ次の射を考える。

$$
p:\mathbb P^1\longrightarrow C,\qquad
[S:T]\longmapsto[ST^2:T^3:S^3].
$$

右側の三つの座標は同次三次式で共通零点を持たず、曲線の方程式も満たす。実際、

$$
Y^2Z=(T^3)^2S^3=S^3T^6=(ST^2)^3=X^3.
$$

$S\ne0$ で $t=T/S$ と置けば $(x,y)=(t^2,t^3)$ となる。尖点付近の代数的関数環は $\mathbb C[t^2,t^3]$ だが、上側には関数 $t$ 自身がある。この $t$ は $\mathbb C[t^2,t^3]$ に属さない。なぜなら $t^{2a+3b}$（$a,b\ge0$）の指数は $0$ または $2$ 以上で、一次項を作れないからである。

したがって $p_*\mathcal O_{\mathbb P^1}$ は $\mathcal O_C$ と同じではない。$p$ は有限な双有理射（局所的に $t$ が $t^2=x$ という整方程式を満たす）であっても、**上で計算できた関数を単に押し下げれば元に戻る**とは言えない。

固有版GAGAは正しい。一方、上の $p$ からの降下を詳細に実行する追加補題をここでは証明していない。射影版の圏同値を証明したことだけで固有版も完全証明済みと主張しないのが、二つの定理を正しく使うための区別である。

## 7. 非固有なアフィン直線では何が破れるか

$A=\mathbb A^1_{\mathbb C}=\operatorname{Spec}\mathbb C[z]$ とする。その解析化は複素平面 $\mathbb C$ である。代数的な大域関数は多項式だが、解析側では $e^z$ や $\sin(\pi z)$ などの整関数を扱える。この差は単なる言葉遣いの違いでなく、Homの全射性と層の代数化を壊す。

<a id="prop-cag1-08-affine-failure"></a>

<!-- formal-statement-start -->
> **命題（非固有アフィン直線でのGAGAの不成立）**
> $A=\mathbb A^1_{\mathbb C}$ について、次の三つが成り立つ。
>
> - 構造層の零次コホモロジーの自然写像は全射でない。
> - 構造層の自己準同型に関する解析化のHom写像は全射でなく、解析的自己同型にも代数的に戻らないものがある。
> - $A^{\mathrm{an}}=\mathbb C$ 上の解析的連接層のうち、代数的連接層の解析化ではないものが存在する。
<!-- formal-statement-end -->

### 証明の見取り図

零次コホモロジーも構造層のHomも「大域関数」と同じ環を見ている。$e^z$ は全域で零にならないので解析的な可逆射を与えるが、多項式ではない。さらに $\sin(\pi z)$ の零点は全整数であり、有限型の代数的連接層の支持としては現れない。

<!-- proof-start -->
### 証明

代数側と解析側の構造層の大域切断を比較すると

$$
H^0(A,\mathcal O_A)=\mathbb C[z],\qquad
H^0(A^{\mathrm{an}},\mathcal O_{A^{\mathrm{an}}})
=\mathcal O(\mathbb C)
$$

であり、自然写像は多項式を整関数と見る包含である。$e^z$ は $z=0$ でのTaylor展開が全ての次数で非零係数を持つので多項式ではなく、包含は全射でない。

構造層から自身への層準同型は $1$ の像、すなわち大域関数による乗法と一対一に対応する。従って代数的なHomは $\mathbb C[z]$、解析的なHomは $\mathcal O(\mathbb C)$ であり、Hom写像も全射でない。乗法 $\cdot e^z$ には逆射 $\cdot e^{-z}$ があるため解析的自己同型であるが、代数的自己同型の係数は $\mathbb C[z]$ の単元、すなわち非零定数に限られる。

最後に解析的連接層

$$
\mathcal E=\mathcal O_{\mathbb C}/
(\sin(\pi z))\mathcal O_{\mathbb C}
$$

を取る。これは一つの正則関数による有限表示の余核であり、[解析的連接性](../CAG1-03/index.md#thm-cag1-03-oka-coherence)を満たす。その支持は $\sin(\pi z)=0$、すなわち全整数 $\mathbb Z$ である。各整数 $n$ で導関数 $\pi\cos(\pi n)=\pi(-1)^n$ は非零だから、整数の近傍では長さ一の非零な茎を持ち、その他では零である。

仮に代数的連接層 $\mathcal F$ の解析化が $\mathcal E$ と同型なら、解析化の局所的な忠実平坦性によって $\operatorname{Supp}(\mathcal F^{\mathrm{an}})$ は $\operatorname{Supp}(\mathcal F)$ の複素点集合に一致する。しかし $\mathbb A^1$ 上の代数的連接層の支持はZariski閉集合であり、$\mathbb C[z]$ のイデアルの零点集合だから、有限集合または全体 $\mathbb C$ に限られる。$\mathbb Z$ はどちらでもない。矛盾するので $\mathcal E$ は代数化できない。
<!-- proof-end -->

射影版のどこが失敗したかも明確である。アフィン直線には閉埋込み $A\hookrightarrow\mathbb P^N$ がなく、[解析的大域生成と有限次元性](../CAG1-07/index.md#thm-cag1-07-analytic-serre)を**射影的な空間上の任意の解析的連接層**へ使う段階が壊れる。実際、$H^0(\mathbb C,\mathcal O_{\mathbb C})$ 自身が無限次元である。コンパクトな複素トーラスなどが必ず代数的になると結論することもできない。固有版の定理は、あくまで最初から**固有な代数的スキーム $X$ が与えられている**場合の比較である。

## 8. 演習――どの性質を使って復元したか

単に「GAGAで同型」と書かず、対象・射・コホモロジーのどれを比較しているかを先に決める。各演習では、使う仮定を確認したうえで、自然な射や局所環の計算を一段ずつ追おう。

### Level A

<a id="ex-cag1-08-a01"></a>
#### CAG1-08-A01 一点の圏同値を行列で検査する
- Level: A

$X=\operatorname{Spec}\mathbb C$ とする。二つの代数的連接層に対応する空間を $V=\mathbb C^2$、$W=\mathbb C^3$ としたとき、$\operatorname{Hom}_X(V,W)$ を明示し、解析化が完全忠実である理由を述べよ。また任意の解析的連接層が本質的像に入る理由を述べよ。

<!-- solution-start -->
**詳細解答**。一点上の構造層は $\mathbb C$ で、層準同型は $\mathbb C$-線形写像に一致する。標準基底を取れば各射 $f$ は $3\times2$ 行列

$$
M=(m_{ij})_{1\le i\le3,\ 1\le j\le2},\qquad
f(v)_i=\sum_{j=1}^{2}m_{ij}v_j
$$

で一意に表される。解析化した一点上も同じ $\mathbb C$-線形空間と同じ行列の集合を持つので、$M\mapsto M$ は全単射である。任意の組 $r,s$ にも同じ議論が通り、[完全忠実性の定義](#def-cag1-08-category-equivalence)を満たす。解析的連接層 $E$ は有限次元ベクトル空間だから、基底を選び $E\simeq\mathbb C^r$ とすれば $\mathbb C^r$ の解析化の像と同型になる。従って本質的全射でもある。
<!-- solution-end -->

<a id="ex-cag1-08-a02"></a>
#### CAG1-08-A02 冪零元の乗法を検算する
- Level: A

$R=\mathbb C[t]/(t^2)$ とする。$m_t:R\to R$、$r\mapsto tr$ の核・像・余核を求め、$\mathbb C\{t\}/(t^2)$ 上の同じ写像でも結果が変わらない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$r=a+bt$ と一意に書けて $m_t(r)=at$ だから、$m_t(r)=0$ の条件は $a=0$。よって

$$
\ker m_t=(t),\qquad
\operatorname{im}m_t=(t),\qquad
\operatorname{coker}m_t=R/(t)\simeq\mathbb C.
$$

解析側の任意の収束級数も $t^2$ で割ると $a+bt$ となり、$t(a+bt)=at$ を満たす。従って核・像・余核は同じである。[二重点の命題](#prop-cag1-08-double-point)で使った計算を再確認できた。台が一点だからといって $t=0$ としてしまうと、核と像の長さを取り違える。
<!-- solution-end -->

<a id="ex-cag1-08-a03"></a>
#### CAG1-08-A03 大域切断で自然性を確かめる
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とし、$u:\mathcal O_P\to\mathcal O_P(1)$ を斉次座標 $S$ による乗法で定める。$H^0(u)$ の行列を基底 $1$ と $S,T$ に関して書き、[コホモロジー比較の自然性](#prop-cag1-08-cohomology-naturality)を $q=0$ で検算せよ。

<!-- solution-start -->
**詳細解答**。[射影直線の切断計算](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)により $H^0(P,\mathcal O_P)=\mathbb C\cdot1$、$H^0(P,\mathcal O_P(1))=\mathbb CS\oplus\mathbb CT$。$u(1)=S$ だから、基底を固定した行列は

$$
[H^0(u)]_{(1),(S,T)}=\binom{1}{0}.
$$

[解析的ねじり層の比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)では基底 $1,S,T$ がそのまま解析側の基底となるので、比較写像の行列は各々恒等行列である。解析側の $H^0(u^{\mathrm{an}})$ も $\binom10$ となる。従って比較写像を挟んでも $1\mapsto S$ で、二経路は一致する。
<!-- solution-end -->

<a id="ex-cag1-08-a04"></a>
#### CAG1-08-A04 指数関数と代数的単元を区別する
- Level: A

$A=\operatorname{Spec}\mathbb C[z]$ とする。$e^z$ による乗法が $A^{\mathrm{an}}$ 上の構造層の自己同型であること、代数的構造層の自己同型ではないことをそれぞれ示せ。

<!-- solution-start -->
**詳細解答**。$e^z e^{-z}=1$ が全複素平面で成立し、両者とも整関数だから、$\cdot e^z$ と $\cdot e^{-z}$ は互いに逆の解析的層の射である。一方、代数的な構造層の自己射は $p(z)\in\mathbb C[z]$ による乗法であり、可逆ならある $q(z)\in\mathbb C[z]$ と $p(z)q(z)=1$ を満たす。次数の加法性から $\deg p=\deg q=0$ なので、単元は非零定数だけである。$e^z$ は定数でなく、さらに多項式でもないから代数的同型には戻らない。
<!-- solution-end -->

<a id="ex-cag1-08-a05"></a>
#### CAG1-08-A05 一次コホモロジーの比較を読む
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とし、$\mathcal F=\mathcal O_P(-2)$ とする。代数側の $H^0(P,\mathcal F)$、$H^1(P,\mathcal F)$ の次元を求め、解析化後の対応する群の次元と比較写像について述べよ。

<!-- solution-start -->
**詳細解答**。[射影直線のねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)の $n=1,d=-2$ の場合、$H^0(P,\mathcal O(-2))=0$ であり、$H^1(P,\mathcal O(-2))$ は一次元である。標準チャートの重なりのLaurent展開で、一次群は $t^{-1}$ の係数に対応する一類で生成される。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)はこの代数的類を同じ解析的Čech類へ移す同型なので

$$
\dim H^0(P^{\mathrm{an}},\mathcal F^{\mathrm{an}})=0,
\qquad
\dim H^1(P^{\mathrm{an}},\mathcal F^{\mathrm{an}})=1.
$$

単なる次元一致でなく、自然な比較写像が全単射である点までがGAGA Iの結論である。
<!-- solution-end -->

### Level B

<a id="ex-cag1-08-b01"></a>
#### CAG1-08-B01 解析的な表示列から代数的な列を復元する
- Level: B

$P=\mathbb P^1_{\mathbb C}$ 上で $S,T$ を斉次座標とする。解析的連接層の列

$$
0\to\mathcal O_{P^{\mathrm{an}}}(-1)
\xrightarrow{\binom{-T}{S}}
\mathcal O_{P^{\mathrm{an}}}^{\oplus2}
\xrightarrow{(S\ \ T)}
\mathcal O_{P^{\mathrm{an}}}(1)\to0
$$

の代数化を求め、二つの標準チャートで完全性を検査せよ。

<!-- solution-start -->
**詳細解答**。三つの項は各々 $\mathcal O_P(-1)$、$\mathcal O_P^2$、$\mathcal O_P(1)$ の解析化である。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)によって解析的な $(-T,S)$、$(S,T)$ は、同じ斉次式で定まる一意の代数的射の解析化である。合成は $S(-T)+T S=0$。

$U_S$ で $u=T/S$ と置き、$\mathcal O(1)$ の枠を $S$ とすれば、右の射は $(a,b)\mapsto a+ub$ である。これは $(1,0)$ を $1$ に送るので全射で、核は $(-u,1)b$。左射も局所枠を選べばこの生成元を与える。$U_T$ では $v=S/T$ として右射は $(a,b)\mapsto va+b$、核は $(1,-v)a$。左射は単元倍を除いてこの生成元を与える。よって双方のチャートで像と核が一致し、代数的にも短完全。これは[完全列の代数化](#prop-cag1-08-exact-lifting)の具体例である。
<!-- solution-end -->

<a id="ex-cag1-08-b02"></a>
#### CAG1-08-B02 非被約点上のHomを数える
- Level: B

$R=\mathbb C[t]/(t^2)$、$M=R/(t)$ とする。$R$-線形写像 $f:M\to R$ の全体を計算し、解析的な二重点上でもHom比較が成立することを確認せよ。

<!-- solution-start -->
**詳細解答**。$M$ は $\bar1$ で生成され、関係式は $t\bar1=0$ である。従って $f$ は $a=f(\bar1)\in R$ で決まり、well-defined な $R$-線形写像である条件は $ta=0$。$a=b+ct$ と書くと $ta=bt$ なので $b=0$、従って $a=ct$ だけが許される。

$$
\operatorname{Hom}_R(R/(t),R)
\simeq (t)=\mathbb C t.
$$

解析的局所環も $\mathbb C\{t\}/(t^2)\simeq R$ で、同じ関係式 $t\bar1=0$ を持つ。よって解析側のHomも $\mathbb Ct$ で、比較写像は $ct\mapsto ct$ という全単射である。非被約性はHomの次元を壊すのでなく、**そのHomの計算に残る**。
<!-- solution-end -->

<a id="ex-cag1-08-b03"></a>
#### CAG1-08-B03 Chowの補題の後も降下を要する
- Level: B

$C=V(Y^2Z-X^3)\subset\mathbb P^2$ に対する $p:\mathbb P^1\to C$ を $[S:T]\mapsto[ST^2:T^3:S^3]$ で与える。$S\ne0$ のアフィンチャートで、$p$ が引き戻す関数環を求め、$p_*\mathcal O_{\mathbb P^1}$ が $\mathcal O_C$ と一致しない理由を示せ。これが固有版GAGAの証明について何を警告するか述べよ。

<!-- solution-start -->
**詳細解答**。$t=T/S$ とすると $x=X/Z=t^2$、$y=Y/Z=t^3$ である。尖点の局所的な座標環は

$$
\mathbb C[x,y]/(y^2-x^3)
\simeq\mathbb C[t^2,t^3]\subsetneq\mathbb C[t].
$$

右辺の差は $t$ 自身で検出できる。左辺の任意の元は $t^{2a+3b}$ の有限和で、指数が $1$ になる非負整数 $a,b$ は存在しない。ところが上側 $\mathbb P^1$ の $t$ は尖点の逆像の近傍で正則である。従って $p_*\mathcal O_{\mathbb P^1}$ の尖点での茎には $t$ があり、$\mathcal O_C$ の茎にはない。

射影的な上側の層を扱えるだけでは、下側の層が自動的に一致するわけではない。Chowの補題を使った固有版への還元では、[固有版GAGA](#thm-cag1-08-proper-gaga)を別の補題なしに証明したと考えてはいけない。
<!-- solution-end -->

<a id="ex-cag1-08-b04"></a>
#### CAG1-08-B04 余核の長さとコホモロジーをつなぐ
- Level: B

$P=\mathbb P^1_{\mathbb C}$、$p=[0:1]$ とし、$S^2:\mathcal O_P(-2)\to\mathcal O_P$ の余核を $\mathcal Q$ とする。$\mathcal Q_p$ の長さ、$H^0(P,\mathcal Q)$ の次元、$H^1(P,\mathcal Q)$ を求め、解析側との対応を説明せよ。

<!-- solution-start -->
**詳細解答**。$U_T$ の座標 $w=S/T$ で射は $w^2$ 倍なので、余核の $p$ での茎は $\mathbb C[w]_{(w)}/(w^2)$ で、基底 $1,w$ を持ち長さ2である。他の点では $S^2$ が単元として働き、余核は零。よって $\mathcal Q$ は一点に台を持つ長さ2の層である。

代数的な短完全列 $0\to\mathcal O(-2)\xrightarrow{S^2}\mathcal O\to\mathcal Q\to0$ の長完全列と[射影直線のねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から

$$
0\to0\to\mathbb C\to H^0(P,\mathcal Q)
\to\mathbb C\to0\to H^1(P,\mathcal Q)\to0
$$

を得る。従って $\dim_{\mathbb C}H^0(P,\mathcal Q)=2$、$H^1(P,\mathcal Q)=0$。解析化した完全列でも $w^2$ の余核は $\mathbb C\{w\}/(w^2)$ で長さ2であり、[比較写像の自然性](#prop-cag1-08-cohomology-naturality)により長完全列の対応する矢印も可換である。従って解析側の零次は2次元、一次は零となる。
<!-- solution-end -->

### Level C

<a id="ex-cag1-08-c01"></a>
#### CAG1-08-C01 特異射影曲線と非固有直線を比較する
- Level: C

$Y=V(UV)\subset\mathbb P^2_{\mathbb C}$ と $A=\mathbb A^1_{\mathbb C}$ を考える。

1. $Y$ が特異だが射影的であることを確かめ、$\operatorname{Coh}(Y)$ と $\operatorname{Coh}(Y^{\mathrm{an}})$ の間で成り立つ比較を三つ述べよ。
2. $A$ について $H^0(\mathcal O)$ の比較と構造層のHom比較が失敗することを一つの関数で示せ。
3. $\mathcal E=\mathcal O_{\mathbb C}/(\sin\pi z)$ が代数化できないことを支持から説明し、二つの例で使えない定理の仮定を明記せよ。

<!-- solution-start -->
**詳細解答**。

1. $UV$ は二次斉次式なので $Y$ は射影平面の閉部分スキームとして射影的である。点 $[0:0:1]$ で $\partial(UV)/\partial U=V=0$、$\partial(UV)/\partial V=U=0$、$\partial(UV)/\partial W=0$ だからJacobianの階数が不足し、特異である。しかし[射影版GAGA](#thm-cag1-08-projective-equivalence)は滑らかさを仮定しない。従って連接層の本質的全射、Homの全単射、および全 $q\ge0$ での自然なコホモロジー比較同型が成り立つ。
2. $A$ では大域代数関数は $\mathbb C[z]$、解析側では整関数全体である。$e^z$ は整関数だが多項式でないので $H^0$ 比較の像にない。さらに $\operatorname{Hom}(\mathcal O,\mathcal O)$ は大域関数と同じで、乗法 $\cdot e^z$ は解析的Homの元だが代数側から来ない。
3. $\sin(\pi z)=0$ は $z\in\mathbb Z$ と同値で、各整数での零点は一位だから $\mathcal E$ は整数点にだけ非零な茎を持つ。代数的連接層の支持は $\mathbb A^1$ のZariski閉集合で有限集合または全体に限られ、無限離散な $\mathbb Z$ とは一致しない。従って代数化不能である。$Y$ は**特異でも射影的**という仮定を満たす。一方 $A$ は**非固有かつ非射影的**なので、GAGA I〜IIIや[解析的大域生成定理](../CAG1-07/index.md#thm-cag1-07-analytic-serre)の射影性仮定を失っている。
<!-- solution-end -->

<a id="ex-cag1-08-c02"></a>
#### CAG1-08-C02 解析的な射影子を代数化して直和に分ける
- Level: C

$X$ を有限型射影 $\mathbb C$-スキームとし、解析的連接層 $\mathcal E$ に正則な層の自己射 $e:\mathcal E\to\mathcal E$ があり、$e^2=e$ とする。$\mathcal E\simeq\mathcal F^{\mathrm{an}}$ となる代数化同型を一つ選ぶ。

1. $e$ が一意の代数的自己射 $u:\mathcal F\to\mathcal F$ に持ち上がり、$u^2=u$ となることを証明せよ。
2. $\mathcal F\simeq\operatorname{im}u\oplus\ker u$ を具体的な写像で示し、解析化で $\mathcal E$ の $e$ による分解へ戻ることを確認せよ。
3. 任意の $q\ge0$ で、この直和分解に沿ってコホモロジー比較同型も直和に分解することを述べ、理由を示せ。

<!-- solution-start -->
**詳細解答**。

1. 選んだ同型 $\iota:\mathcal F^{\mathrm{an}}\xrightarrow{\sim}\mathcal E$ により $\iota^{-1}e\iota$ は解析化された $\mathcal F$ の自己射である。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)の全単射性から一意な代数的射 $u$ があり、$u^{\mathrm{an}}=\iota^{-1}e\iota$ を満たす。$e^2=e$ だから $(u^2-u)^{\mathrm{an}}=0$。GAGA IIの単射性をもう一度使うと $u^2=u$ となる。
2. $\mathcal I=\operatorname{im}u$、$\mathcal K=\ker u$ とする。各局所切断 $s$ は次のように分けられる。

   $$
   s=u(s)+(s-u(s)),\qquad
   u(s-u(s))=u(s)-u^2(s)=0.
   $$

   第一項は $\mathcal I$、第二項は $\mathcal K$ に属する。逆に $t\in\mathcal I\cap\mathcal K$ なら $t=u(r)$ と書け、かつ $u(t)=0$ である。しかし $u(t)=u^2(r)=u(r)=t$ だから $t=0$。従って和は直和である。

   加法写像 $\mathcal I\oplus\mathcal K\to\mathcal F$ は同型で、逆は $s\mapsto(u(s),s-u(s))$ である。Noether性により両部分層は連接であり、[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)が核と像を保つ。従って $\iota$ を通して $\mathcal E\simeq\operatorname{im}e\oplus\ker e$ を得る。
3. 有限直和のコホモロジーは直和へ分解するため

$$
H^q(X,\mathcal F)
\simeq H^q(X,\mathcal I)\oplus H^q(X,\mathcal K).
$$

[比較写像の自然性](#prop-cag1-08-cohomology-naturality)を直和への包含と射影に適用すると、比較写像はこの分解の各成分を解析側の対応成分へ送る。各成分の比較も[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)により同型だから、直和の同型が得られる。これで対象・射・コホモロジーの三つを一つの分解の中で照合できた。
<!-- solution-end -->

## まとめと次章への橋

射影スキーム上では、完全忠実性が「射を戻す」、本質的全射性が「対象を戻す」、自然なコホモロジー同型が「計算を戻す」という役割を持つ。解析化はその三つを両立する**正確な圏同値**であり、特異点や冪零元も失わない。

固有スキームでも定理自体は成立するが、射影的な $\mathcal O(1)$ に依存する前章までの証明を延長するには、Chowの補題に加えて層とコホモロジーの降下を制御する論証が要る。逆に非固有な $\mathbb A^1$ では $e^z$ と $\sin(\pi z)$ により比較の失敗が具体化する。

次の CAG1-09 では、射影空間の閉解析部分集合を代数的方程式から復元する **Chowの定理** と、射影多様体間の正則写像の代数性を、ここでの圏同値から考える。
