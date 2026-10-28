# CAG1-06 GAGA II――正則な層の射の代数性

前章では、射影的な複素スキーム $X$ の代数的連接層 $\mathcal F$ について、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)により $H^q(X,\mathcal F)$ と解析化後のコホモロジーが一致することを証明した。しかし二つの層 $\mathcal F,\mathcal G$ が与えられたとき、正則な層の射 $\mathcal F^{\mathrm{an}}\to\mathcal G^{\mathrm{an}}$ は**代数的な式から来た射**なのだろうか。

点ごとの線型写像を単に貼るだけでは、この問いには答えられない。射の空間自体を「内部Hom層」という連接層として作り、その**大域切断**を前章で比較するのが鍵である。局所的なHomの解析化を正当化する場面で、[有限表示](../../AG/AG3-06/index.md#def-ag3-06-finite-type-presentation)と[解析化の平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)がそれぞれ必要になる。

以下、基礎体は $\mathbb C$ とし、$X$ は有限型 $\mathbb C$-スキームとする。射影性は大域比較を述べる段階で仮定する。$\mathcal F,\mathcal G$ は[代数的連接層](../../AG/AG3-06/index.md#def-ag3-06-coherent)、$h:X^{\mathrm{an}}\to X$ は[解析化に伴う局所環付き空間の射](../CAG1-02/index.md#thm-cag1-02-analytification-functor)とする。層の解析化 $\mathcal F^{\mathrm{an}}$ は[既習の引戻しによる定義](../CAG1-03/index.md#def-cag1-03-sheaf-analytification)を用いる。$X$ の滑らかさ・既約性・被約性は仮定しない。

## 1. 層の射を大域切断として読む

[アフィン上の加群と層の対応](../../AG/AG3-06/index.md#thm-ag3-06-affine-equivalence)では、加群の準同型から層の射を作った。今度は開集合 $U\subset X$ を動かし、$U$ 上で定義された射をすべて集める。制限と貼り合わせができるので、これは一つの層になる。大域で定義された射だけを先に並べるのではなく、**局所の射の層**を作ることが比較の第一歩である。

<a id="def-cag1-06-internal-hom"></a>

<!-- formal-statement-start -->
> **定義（内部Hom層と射の解析化写像）**
> $X$ を環付き空間、$\mathcal F,\mathcal G$ を $\mathcal O_X$-加群の層とする。開集合 $U\subset X$ 上の層準同型の集合を値とする層

$$
\mathcal Hom_X(\mathcal F,\mathcal G)(U)
=\operatorname{Hom}_{\mathcal O_U}(\mathcal F|_U,\mathcal G|_U)
$$

> を**内部Hom層**と呼ぶ。このとき

$$
\Gamma(X,\mathcal Hom_X(\mathcal F,\mathcal G))
=\operatorname{Hom}_{\mathcal O_X}(\mathcal F,\mathcal G).
$$

> 有限型 $\mathbb C$-スキーム上の連接層については、射 $\varphi$ を各茎で解析的局所環へテンソルして得る $\varphi^{\mathrm{an}}$ により、自然な写像

$$
\beta_{X,\mathcal F,\mathcal G}:
\operatorname{Hom}_{\mathcal O_X}(\mathcal F,\mathcal G)
\longrightarrow
\operatorname{Hom}_{\mathcal O_{X^{\mathrm{an}}}}
(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})
$$

> を定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-06-internal-hom -->
**定義の確認**：$\mathbb A^1_{\mathbb C}$ の原点の代数的局所環で $A=\mathbb C[t]_{(t)}$、$M=A/(t^2)$ とする。$A$-線型写像 $u:M\to M$ は $u(1)=b$ で決まり、関係式 $t^2b=0$ は $M$ では自動的に成立する。従って

$$
\operatorname{End}_A(M)\simeq M,
\qquad b\longmapsto(m\longmapsto bm).
$$

実際 $b=a+ct$（$a,c\in\mathbb C$）なら、$A$-線型性と $t^2=0$ から

$$
u(1)=a+ct,\qquad u(t)=t(a+ct)=at
$$

である。解析的な茎では $B=\mathbb C\{t\}$、$M^{\mathrm{an}}_0=B/(t^2)$ であり、同じ計算から

$$
u^{\mathrm{an}}(1)=a+ct,\qquad u^{\mathrm{an}}(t)=at
$$

を得る。両側の自己準同型環はともに $\mathbb C$-ベクトル空間として $1,t$ を基底とする二次元空間で、局所的な解析化写像は係数 $a,c$ を変えない。これは「射を一つ送る」だけでなく、「射の係数がどの層に属するか」を調べる例である。
<!-- definition-example-end -->

この定義の $\mathcal Hom$ は抽象的な全体のHom集合とは違う。たとえば $\mathcal F=\mathcal O_X$ なら、$U$ 上の射は $1$ の像で一意に決まり、

$$
\mathcal Hom_X(\mathcal O_X,\mathcal G)\simeq\mathcal G,
\qquad
\varphi\longmapsto\varphi(1).
$$

この式から、**正則切断の代数性**もGAGA IIの特殊例になることが分かる。

## 2. 有限表示が内部Homを計算可能にする

内部Hom層が連接でなければ、前章のGAGA Iを適用できない。さらに、層の射を解析化したとき同じ内部Hom層になるかを、抽象的な「自然だから」では済ませられない。この二つを同じ有限表示から検証する。

<a id="lem-cag1-06-hom-coherent"></a>

<!-- formal-statement-start -->
> **補題（連接層間の内部Hom層の連接性）**
> $X$ を有限型 $\mathbb C$-スキーム、$\mathcal F,\mathcal G$ を代数的連接層とする。このとき

$$
\mathcal H:=\mathcal Hom_X(\mathcal F,\mathcal G)
$$

> は代数的連接層である。特に局所アフィン表示で $\mathcal F=\widetilde M$、$\mathcal G=\widetilde N$ とすると、$\mathcal H$ は $\operatorname{Hom}_A(M,N)$ に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

連接性とは局所的な有限生成・有限関係の条件である。$\mathcal F$ の有限表示へHomを作用させると、その結果は $\mathcal G$ の有限直和の間の写像の**核**になる。Noether環上ではこの核は有限生成だから、連接性を確認できる。

<!-- proof-start -->
### 証明

点のアフィン近傍 $U=\operatorname{Spec}A$ を取り、[有限表示](../../AG/AG3-06/index.md#def-ag3-06-finite-type-presentation)を

$$
A^s\xrightarrow{D}A^r\longrightarrow M\longrightarrow0
$$

と書く。$\mathcal G|_U=\widetilde N$ とし、$N$ は有限生成 $A$-加群とする。$\operatorname{Hom}_A(-,N)$ は左完全だから

$$
0\longrightarrow\operatorname{Hom}_A(M,N)
\longrightarrow N^r\xrightarrow{D^\vee}N^s
$$

が完全である。$D^\vee$ は行列 $D=(d_{ij})_{1\le i\le r,\,1\le j\le s}$ の転置を $N$ の成分に作用させたもの。具体的に

$$
D^\vee(n_1,\ldots,n_r)
=\left(\sum_{i=1}^r d_{ij}n_i\right)_{j=1}^s.
$$

つまり $M$ からの射とは、$A^r$ の基底の行先 $n_1,\ldots,n_r$ のうち、$D$ の各関係式を零に送る組である。

$A$ は有限型 $\mathbb C$-代数でNoether環であり、$N^r$ も有限生成なので $\ker D^\vee$ は有限生成となる。[Noether環上の連接性](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)から対応する層は連接である。

残るのは、今計算した加群が内部Hom層の制限と整合することである。任意の $f\in A$ について、$M$ の表示を局所化して同じ核の式を作れば

$$
\operatorname{Hom}_A(M,N)_f
\simeq\ker(N_f^r\to N_f^s)
\simeq\operatorname{Hom}_{A_f}(M_f,N_f).
$$

最初の同型は局所化の完全性、次の同型は局所化後の有限表示にHomを作用させた結果である。したがって主開集合上の射が正しく貼り合わさり、主張の内部Hom層になる。
<!-- proof-end -->

<a id="lem-cag1-06-hom-base-change"></a>

<!-- formal-statement-start -->
> **補題（平坦な解析化と内部Homの交換）**
> $X$ を有限型 $\mathbb C$-スキーム、$\mathcal F,\mathcal G$ を代数的連接層とする。自然な解析的連接層の射

$$
\Theta:
\bigl(\mathcal Hom_X(\mathcal F,\mathcal G)\bigr)^{\mathrm{an}}
\longrightarrow
\mathcal Hom_{X^{\mathrm{an}}}
(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})
$$

> は同型である。射影性は不要であり、有限表示と解析化の**局所的な平坦性**が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

点 $p$ で代数的局所環を $A$、解析的局所環を $B$ とおく。$\mathcal F$ の有限表示から、Homは $N^r\to N^s$ の核である。$B$ が $A$ 上平坦ならテンソルはこの核を保ち、さらに右側でも同じ表示を使ってHomを計算できる。

<!-- proof-start -->
### 証明

$p\in X(\mathbb C)$ で $A=\mathcal O_{X,p}$、$B=\mathcal O_{X^{\mathrm{an}},p}$、$M=\mathcal F_p$、$N=\mathcal G_p$ とおく。[連接層の有限表示](../../AG/AG3-06/index.md#def-ag3-06-finite-type-presentation)から $A^s\xrightarrow{D}A^r\to M\to0$ を選ぶ。[内部Hom層の連接性](#lem-cag1-06-hom-coherent)の証明で得た

$$
0\longrightarrow H:=\operatorname{Hom}_A(M,N)
\longrightarrow N^r\xrightarrow{D^\vee}N^s
$$

に対し、[解析化の局所環の平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)を用いて $B$ でテンソルすると

$$
0\longrightarrow H\otimes_A B
\longrightarrow (N\otimes_A B)^r
\xrightarrow{D_B^\vee}(N\otimes_A B)^s
$$

はなお完全である。一方、$M_B=M\otimes_A B$ は $B^s\xrightarrow{D_B}B^r\to M_B\to0$ という有限表示を持つ。[有限表示の解析化](../CAG1-03/index.md#prop-cag1-03-local-presentation)を各茎で使った結果である。よって

$$
\operatorname{Hom}_B(M_B,N\otimes_A B)
=\ker\bigl((N\otimes_A B)^r\xrightarrow{D_B^\vee}
(N\otimes_A B)^s\bigr)
=H\otimes_A B.
$$

この同型の具体的な作用は、$u:M\to N$ と $b\in B$ に対して

$$
(u\otimes b)(m\otimes c)=u(m)\otimes bc
$$

である。したがって基底の取り方に依存せず、開集合への制限と可換である。全ての $p$ で同型なので $\Theta$ は層の同型になる。右辺は解析化された連接層と同型なので、解析的にも連接である。
<!-- proof-end -->

**条件の効き方**：$B$ の平坦性がなければ $\ker D^\vee$ がテンソル後も核とは限らない。また $M$ が有限表示でなければ、有限個の関係式によるこの核の計算を使えない。GAGA Iの射影性は、ここまでは一度も使っていない。

## 3. 大域切断を比較してGAGA IIを得る

二つの局所補題によって $\mathcal H=\mathcal Hom_X(\mathcal F,\mathcal G)$ はGAGA Iの入力となる連接層だと分かった。大域の射は $\Gamma(X,\mathcal H)$ そのものなので、比較は次の三段階で閉じる。

<a id="thm-cag1-06-gaga-hom"></a>

<!-- formal-statement-start -->
> **定理（GAGA II――連接層の射の比較）**
> $X$ を有限型の射影 $\mathbb C$-スキーム、$\mathcal F,\mathcal G$ を $X$ 上の代数的連接層とする。このとき射の解析化写像

$$
\beta_{X,\mathcal F,\mathcal G}:
\operatorname{Hom}_{\mathcal O_X}(\mathcal F,\mathcal G)
\xrightarrow{\ \simeq\ }
\operatorname{Hom}_{\mathcal O_{X^{\mathrm{an}}}}
(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})
$$

> は自然な全単射であり、射の恒等射と合成を保つ。$X$ は特異または非被約であってもよい。**任意の解析的連接層が代数化される**とは、まだ主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

「局所でHomと解析化が交換できる」だけでは、大域の新たな正則射がすべて代数的とは言えない。$X$ の射影性をここで使い、GAGA Iの $q=0$ を $\mathcal H$ に適用する。

<!-- proof-start -->
### 証明

[内部Hom層の連接性](#lem-cag1-06-hom-coherent)より $\mathcal H=\mathcal Hom_X(\mathcal F,\mathcal G)$ は代数的連接層である。したがって $X$ が射影的という仮定から、[GAGA Iの全次数比較](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の $q=0$ を**この $\mathcal H$ に**適用できる：

$$
\Gamma(X,\mathcal H)
\xrightarrow[\simeq]{\alpha^0_{X,\mathcal H}}
\Gamma(X^{\mathrm{an}},\mathcal H^{\mathrm{an}}).
$$

さらに[内部Homと解析化の交換](#lem-cag1-06-hom-base-change)によって右辺は

$$
\Gamma\bigl(X^{\mathrm{an}},
\mathcal Hom_{X^{\mathrm{an}}}(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})\bigr)
=\operatorname{Hom}_{\mathcal O_{X^{\mathrm{an}}}}
(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})
$$

と同型である。左辺は[内部Homの定義](#def-cag1-06-internal-hom)から $\operatorname{Hom}_{\mathcal O_X}(\mathcal F,\mathcal G)$ である。従って全体として

$$
\operatorname{Hom}_X(\mathcal F,\mathcal G)
=H^0(X,\mathcal H)
\xrightarrow[\simeq]{\alpha^0}
H^0(X^{\mathrm{an}},\mathcal H^{\mathrm{an}})
\xrightarrow[\simeq]{\Theta}
\operatorname{Hom}_{X^{\mathrm{an}}}(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}})
$$

を得る。局所表示を追うと、この合成は各 $u$ を $u\otimes1$ へ送るので、[定義した $\beta$](#def-cag1-06-internal-hom)に一致する。最後に $(v\circ u)\otimes1=(v\otimes1)\circ(u\otimes1)$ と $\operatorname{id}\otimes1=\operatorname{id}$ を各茎で確認すれば、合成と恒等射を保つ。
<!-- proof-end -->

<a id="cor-cag1-06-isom-algebraic"></a>

<!-- formal-statement-start -->
> **系（解析化した連接層の同型の代数性）**
> $X$ を有限型の射影 $\mathbb C$-スキーム、$\mathcal F,\mathcal G$ を**ともに代数的な**連接層とする。このとき解析的層同型

$$
\varphi^{\mathrm{an}}:\mathcal F^{\mathrm{an}}
\xrightarrow{\ \simeq\ }\mathcal G^{\mathrm{an}}
$$

> は一意の代数的層同型 $\varphi:\mathcal F\xrightarrow{\simeq}\mathcal G$ から生じる。
<!-- formal-statement-end -->

### 証明の見取り図

GAGA IIで正方向と逆方向を**それぞれ**持ち上げる。解析側で合成が恒等射なので、GAGA IIの単射性を再び使って代数側でも逆射になる。

<!-- proof-start -->
### 証明

[GAGA II](#thm-cag1-06-gaga-hom)の全射性から $\varphi^{\mathrm{an}}$ の原像 $\varphi$、逆向きの $(\varphi^{\mathrm{an}})^{-1}$ の原像 $\psi$ が一意に存在する。合成を解析化すると

$$
(\psi\circ\varphi)^{\mathrm{an}}
=\psi^{\mathrm{an}}\circ\varphi^{\mathrm{an}}
=\operatorname{id}_{\mathcal F^{\mathrm{an}}},
$$

となる。恒等射 $\operatorname{id}_{\mathcal F}$ も同じ解析化を持つので、GAGA IIの単射性から $\psi\circ\varphi=\operatorname{id}_{\mathcal F}$。同様に $\varphi\circ\psi=\operatorname{id}_{\mathcal G}$ であり、$\varphi$ は代数的同型である。
<!-- proof-end -->

ここで「ともに代数的」が大切である。任意の正則線束 $\mathcal L_{\mathrm{an}}$ に対し、比較する代数的 $\mathcal L$ の**存在**はGAGA IIIの主題である。今示したのは、代数化済みの二つの層の間で、射や同型が新しく増えないという**充満忠実性**である。

## 4. 線束の射、正則写像、そして境界

まず射影直線で定理を目に見える形にする。[ねじれ層の局所基底と遷移規則](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf)を使い、$U_i$ 上の射 $u:\mathcal O(a)\to\mathcal O(b)$ を $u(e_i^{(a)})=c_i e_i^{(b)}$ と表示する。重なりで $e_j^{(d)}=(X_j/X_i)^d e_i^{(d)}$ だから、$g_{ij}=X_j/X_i$ とおくと

$$
c_j e_j^{(b)}=u(e_j^{(a)})=g_{ij}^a c_i e_i^{(b)},
\qquad c_j=g_{ij}^{a-b}c_i.
$$

この $c_j=g_{ij}^{-(b-a)}c_i$ は、[ねじれ層の貼り合わせで導いた局所係数の規則](../../AG/AG2-06/index.md#prop-ag2-06-od-cocycle)を次数 $b-a$ に適用した式そのものである。[テンソル積と双対](../../AG/AG2-06/index.md#prop-ag2-06-tensor-dual)とも一致し、[斉次多項式による大域切断](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)を適用すると

$$
\operatorname{Hom}_{\mathbb P^1}
(\mathcal O(a),\mathcal O(b))
\simeq H^0(\mathbb P^1,\mathcal O(b-a))
\simeq
\begin{cases}
\mathbb C[S,T]_{b-a}&(b\ge a),\\
0&(b<a).
\end{cases}
$$

解析側でも同じ式が成り立つのは[GAGA II](#thm-cag1-06-gaga-hom)の結論である。例えば $\mathcal O(-1)\to\mathcal O(1)$ の射を斉次二次式 $S^2$ で与えると、$S\ne0$ のチャートでは係数 $1$、$T\ne0$ のチャートでは $w^2=(S/T)^2$ となる。後者は $S=0$ で零になるため、この射は大域同型ではない。「零でない層の射」と「同型」は別物である。

次に、層の射から射影空間への正則写像を作る際の、**現在の定理だけで証明できる範囲**を明確にする。

<a id="prop-cag1-06-algebraic-linear-system"></a>

<!-- formal-statement-start -->
> **命題（代数的線型系から生じる正則射）**
> $X$ を有限型の射影 $\mathbb C$-スキーム、$\mathcal L$ を**代数的**な[可逆層](../../AG/AG2-06/index.md#def-ag2-06-invertible-sheaf)とする。$\mathcal L^{\mathrm{an}}$ の正則大域切断 $\sigma_0,\ldots,\sigma_m$ がすべての点で同時に零にならない（各点で少なくとも一つが局所基底を生成する）とする。このとき各 $\sigma_i$ は一意の代数的切断 $s_i$ に由来し、局所座標

$$
f^{\mathrm{an}}(x)=[\sigma_0(x):\cdots:\sigma_m(x)]
$$

> で定められた正則射 $f^{\mathrm{an}}:X^{\mathrm{an}}\to\mathbb P^m(\mathbb C)$ は、代数的射 $f:X\to\mathbb P^m_{\mathbb C}$ の解析化である。
<!-- formal-statement-end -->

### 証明の見取り図

各切断を $\mathcal O_X^{\mathrm{an}}\to\mathcal L^{\mathrm{an}}$ という層の射として考え、GAGA IIで代数化する。共通零点がないことは、局所的な比 $s_j/s_i$ を作るための条件である。

<!-- proof-start -->
### 証明

[内部Hom層と射の解析化写像の定義](#def-cag1-06-internal-hom)から、正則切断 $\sigma_i$ は層の射 $\mathcal O_X^{\mathrm{an}}\to\mathcal L^{\mathrm{an}}$ と同じ情報である。[GAGA II](#thm-cag1-06-gaga-hom)を $\mathcal F=\mathcal O_X,\mathcal G=\mathcal L$ に適用し、一意の代数的切断 $s_i$ を得る。

それらは代数的にも各点の近くで $\mathcal L$ を生成する。実際、生成しない点があれば、評価射 $\mathcal O_X^{m+1}\to\mathcal L$ の余核 $\mathcal Q$ は非零の連接層となる。その非零性が残るアフィン開 $U=\operatorname{Spec}A$ を選び、$\mathcal Q|_U=\widetilde N$ と書くと、$N$ は非零の有限生成 $A$-加群である。

零化イデアルを

$$
I:=\operatorname{Ann}_A(N)=\{a\in A\mid aN=0\}
$$

と定義する。これは真のイデアルだから、それを含む極大イデアル $\mathfrak m$ を選べる。もし $N_{\mathfrak m}=0$ なら、有限個の各生成元 $n_k$ に対して $s_k\notin\mathfrak m$ かつ $s_kn_k=0$ となる元が存在する。その有限積は

$$
a:=\prod_k s_k\notin\mathfrak m,\qquad
aN=0\ \Longrightarrow\ a\in I\subseteq\mathfrak m
$$

を満たし、矛盾する。よって $N_{\mathfrak m}\ne0$ である。

$A$ は有限生成 $\mathbb C$-代数で、$\mathbb C$ は代数閉体である。[弱Hilbertの零点定理](../../AG/AG1-07/index.md#thm-ag1-07-weak-nullstellensatz)を $A$ の多項式環表示に適用すると

$$
A/\mathfrak m\simeq\mathbb C,
\qquad \mathcal Q_p=N_{\mathfrak m}\ne0
$$

となり、$\mathfrak m$ は複素閉点 $p$ を与える。

[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)によって

$$
\mathcal Q_p\otimes_{\mathcal O_{X,p}}\mathcal O_{X^{\mathrm{an}},p}\ne0
$$

だが、解析側では切断 $\sigma_i$ が局所生成するので、このテンソル積で表される余核は零となる。矛盾するから、代数側にも共通零点はない。

従って $s_0,\ldots,s_m$ は代数的な全射 $\mathcal O_X^{m+1}\twoheadrightarrow\mathcal L$ を与える。$s_i$ が局所基底になる開集合 $U_i$ では

$$
f|_{U_i}=[s_0/s_i:\cdots:1:\cdots:s_m/s_i]
$$

とおく。比は $U_i$ 上の正則な**代数的**関数であり、重なりで一致して代数的射 $f$ に貼り合う。解析化した比は $\sigma_j/\sigma_i$ だから $f^{\mathrm{an}}$ と一致する。
<!-- proof-end -->

**例**：$X=\mathbb P^1$、$\mathcal L=\mathcal O(2)$ とし、$\sigma_0=S^2,\sigma_1=T^2$ とする。$[S:T]$ では同時に $S=T=0$ にならない。$S\ne0$ の座標 $z=T/S$ で $f^{\mathrm{an}}=[1:z^2]$、$T\ne0$ の座標 $w=S/T$ で $f^{\mathrm{an}}=[w^2:1]$ だから、これは代数的射 $[S:T]\mapsto[S^2:T^2]$ の解析化である。

この命題は**任意の**正則写像 $X^{\mathrm{an}}\to Y^{\mathrm{an}}$ が代数的であることをまだ示さない。任意の射をこの形で表すには、その射から引き戻した正則線束の代数化などが要る。GAGA IIIが解析的連接層の代数化を、Chowの定理が閉解析部分集合やグラフの代数化を扱う。逆に非射影の $\mathbb A^1$ では $e^z$ が正則大域関数を与えるが、多項式ではなく、$\mathcal O$ の自己準同型のHom比較は全射でない。

## 5. 演習と詳細解答

内部Homの有限表示、射の具体的な零点、同型の逆射、代数化の適用範囲を別々に確認する。各解答では「どの層へのHomを取ったか」と「射影性をどこで使ったか」を追うこと。

### Level A

<a id="ex-cag1-06-a01"></a>
#### CAG1-06-A01 ねじり次数からHomの次元を求める
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とする。$\operatorname{Hom}(\mathcal O_P(-2),\mathcal O_P(1))$ と $\operatorname{Hom}(\mathcal O_P(1),\mathcal O_P(-2))$ の次元を両側で求め、非零の射を前者について一つ与えよ。

<!-- solution-start -->
**詳細解答**。[ねじれ層のテンソル積と双対](../../AG/AG2-06/index.md#prop-ag2-06-tensor-dual)を使うと、前者の内部Homは $\mathcal O_P(1-(-2))=\mathcal O_P(3)$、後者は $\mathcal O_P(-2-1)=\mathcal O_P(-3)$ になる。[斉次多項式による大域切断](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)から

$$
\dim\operatorname{Hom}(\mathcal O_P(-2),\mathcal O_P(1))=4,
\quad
\operatorname{Hom}(\mathcal O_P(1),\mathcal O_P(-2))=0.
$$

前者の四つの基底は $S^3,S^2T,ST^2,T^3$ であり、例えば $S^3$ が非零射を与える。[GAGA II](#thm-cag1-06-gaga-hom)によって解析化後のHom空間はこれらと自然に同型で、解析側に五つ目の独立な正則射が増えることはない。
<!-- solution-end -->

<a id="ex-cag1-06-a02"></a>
#### CAG1-06-A02 局所係数と零点の次数
- Level: A

$\mathbb P^1$ 上の $\mathcal O(-1)\to\mathcal O(1)$ を斉次式 $S^2$ が定めるとする。$U_S=\{S\ne0\}$ と $U_T=\{T\ne0\}$ の局所係数を求め、射が同型でない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[ねじり層の遷移規則](../../AG/AG2-06/index.md#prop-ag2-06-od-cocycle)で $d=2$ の切断 $S^2$ を読む。$U_S$ での係数は $S^2/S^2=1$、$U_T$ では $S^2/T^2=w^2$（$w=S/T$）。重なり上で $w^2=(S/T)^2$ は $\mathcal O(2)$ の係数変換と一致する。

$S=0$ の点 $[0:1]$ の近くで係数 $w^2$ は二次の零点を持つ。局所環 $\mathbb C\{w\}$ で $w^2$ は単元でないので、解析的にも代数的にもこの点の茎で射は同型でない。射の大域係数が零でないことと、各点で可逆なことは別である。
<!-- solution-end -->

<a id="ex-cag1-06-a03"></a>
#### CAG1-06-A03 二重零点の自己準同型
- Level: A

$A=\mathbb C[t]_{(t)}$、$M=A/(t^2)$ とする。$\operatorname{Hom}_A(M,M)$ を求め、解析化後の茎との対応を $1,t$ の像で確かめよ。

<!-- solution-start -->
**詳細解答**。$M$ の表示 $A\xrightarrow{t^2}A\to M\to0$ に $\operatorname{Hom}_A(-,M)$ を作用させると

$$
\operatorname{Hom}_A(M,M)=\ker(M\xrightarrow{t^2}M)=M.
$$

右端の写像は零なので核は $M$ であり、これは $\mathbb C$-ベクトル空間として基底 $1,t$ を持つ（$t^2=0$）。

[平坦な解析化と内部Homの交換](#lem-cag1-06-hom-base-change)で $B=\mathbb C\{t\}$ へ移すと、

$$
M\otimes_A B=B/(t^2)
$$

となり、基底 $1,t$ と関係式 $t^2=0$ は変わらない。$1$ を $1$ へ送る恒等射と、$1$ を $t$ へ送る冪零自己準同型はそれぞれ同じ形で解析化される。
<!-- solution-end -->

<a id="ex-cag1-06-a04"></a>
#### CAG1-06-A04 関係式が射を消す
- Level: A

$A=\mathbb C[t]_{(t)}$、$M=A/(t)$、$N=A$ とする。$\operatorname{Hom}_A(M,N)$ と $\operatorname{Hom}_{\mathbb C\{t\}}(\mathbb C\{t\}/(t),\mathbb C\{t\})$ を、それぞれ関係式から直接求めよ。

<!-- solution-start -->
**詳細解答**。$M$ から $N$ への射は $b=u(1)$ で決まるが、$t\cdot1=0$ を保つには $tb=0$ が必要である。$A$ は整域で $t\ne0$ なので $b=0$。すなわち

$$
\operatorname{Hom}_A(A/(t),A)=\ker(A\xrightarrow{t}A)=0.
$$

解析的な $B=\mathbb C\{t\}$ も収束冪級数の整域で、$t\,b(t)=0$ なら最初の非零係数を比較して $b=0$。従って解析側のHomも零である。[内部Homの核表示](#lem-cag1-06-hom-coherent)と[基底変換](#lem-cag1-06-hom-base-change)の双方を、単元でない $t$ について検算したことになる。
<!-- solution-end -->

<a id="ex-cag1-06-a05"></a>
#### CAG1-06-A05 正則切断はHomの特殊例
- Level: A

$X$ を射影 $\mathbb C$-スキーム、$\mathcal G$ を代数的連接層とする。$\operatorname{Hom}_X(\mathcal O_X,\mathcal G)$ の各射が一つの大域切断から決まることを示し、解析的切断を代数化できる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。射 $u:\mathcal O_X\to\mathcal G$ に対し $s=u_X(1)$ とおく。局所的な $\mathcal O_X$-線型性から、任意の開集合 $U$ と $f\in\mathcal O_X(U)$ について

$$
u_U(f)=f\,s|_U.
$$

逆に切断 $s\in\Gamma(X,\mathcal G)$ からこの式で射が作れるから、$\operatorname{Hom}_X(\mathcal O_X,\mathcal G)\simeq\Gamma(X,\mathcal G)$ である。解析側でも同じことが成り立つ。両層が代数的な連接層の解析化であり $X$ が射影的なので、[GAGA II](#thm-cag1-06-gaga-hom)の全射性で任意の正則切断を一意の代数的切断へ戻せる。非射影の場合にはこの最後の適用ができない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-06-b01"></a>
#### CAG1-06-B01 点のイデアル層からの射
- Level: B

$P=\mathbb P^1$、$p=[1:0]$ とし、点のイデアル層 $\mathcal I_p\simeq\mathcal O_P(-1)$ を考える。$\operatorname{Hom}(\mathcal I_p,\mathcal O_P)$ の次元を求め、零でない射がどこで消えるかを斉次一次式で説明せよ。解析側も同様か。

<!-- solution-start -->
**詳細解答**。[超平面の完全列](../../AG/AG3-10/index.md#prop-ag3-10-hyperplane-sequence)により $\mathcal I_p\simeq\mathcal O(-1)$ である。[ねじれ層のテンソル積と双対](../../AG/AG2-06/index.md#prop-ag2-06-tensor-dual)を使うと内部Homは $\mathcal O(1)$。その大域切断は $aS+bT$ の二次元空間だからHomの次元は2である。

$(a,b)\ne(0,0)$ に対し $[S:T]=[-b:a]$ は正しい射影点で、$a(-b)+ba=0$ を満たす。よって係数はこの点で零であり、その茎で単元でない。零でない射は存在するが同型は存在しない。[GAGA II](#thm-cag1-06-gaga-hom)で解析側の射も全て同じ斉次一次式に由来するので、正則係数を追加して零点を避けることはできない。
<!-- solution-end -->

<a id="ex-cag1-06-b02"></a>
#### CAG1-06-B02 解析的に同型なねじり層
- Level: B

$a,b\in\mathbb Z$ とする。$\mathbb P^1(\mathbb C)$ 上の $\mathcal O(a)^{\mathrm{an}}$ と $\mathcal O(b)^{\mathrm{an}}$ が正則線束として同型なら $a=b$ であることを、二方向のHomと逆射を使って証明せよ。

<!-- solution-start -->
**詳細解答**。解析的な同型 $\varphi$ とその逆射 $\psi$ を仮定する。[GAGA II](#thm-cag1-06-gaga-hom)で $\varphi$ と $\psi$ はそれぞれ代数的なHomに対応する。

[ねじれ層の双対](../../AG/AG2-06/index.md#prop-ag2-06-tensor-dual)と[負次数の切断の消失](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)を各方向に使う。もし $b<a$ なら

$$
\operatorname{Hom}(\mathcal O(a),\mathcal O(b))
=H^0(\mathcal O(b-a))=0
$$

で、$\varphi$ は零射にしかなれない。もし $a<b$ なら逆向きに $\operatorname{Hom}(\mathcal O(b),\mathcal O(a))=H^0(\mathcal O(a-b))=0$ となり、$\psi$ が存在しない。したがって $a=b$。

逆に $a=b$ なら恒等射が解析的同型である。[解析的同型の代数性](#cor-cag1-06-isom-algebraic)も、両方向の合成を比較して代数的同型になることを保証する。単なる次元の一致だけで同型を宣言してはいない。
<!-- solution-end -->

<a id="ex-cag1-06-b03"></a>
#### CAG1-06-B03 非被約点上の可逆な自己射
- Level: B

$P=\mathbb P^1$ の $t=T/S$ 座標で、長さ2の点 $Z$ を $t^2=0$ で定める。$\mathcal F=\mathcal O_Z$ を $P$ 上の層と見なす。$\operatorname{End}_P(\mathcal F)$ の環を求め、$1+t$ が定める自己射の逆射を計算せよ。

<!-- solution-start -->
**詳細解答**。$\mathcal F$ は $t=0$ に支えを持ち、そこでの茎は $\mathbb C[t]_{(t)}/(t^2)$ である。内部Homの局所表示では $\operatorname{End}(\mathcal F)$ は $\mathcal F$ 自身で、[閉埋込みとコホモロジー](../CAG1-05/index.md#prop-cag1-05-closed-pushforward)を用いて大域の自己射環は

$$
\operatorname{End}_P(\mathcal F)
\simeq H^0(Z,\mathcal O_Z)
\simeq\mathbb C[t]/(t^2)
$$

となる。元 $1+t$ は $t^2=0$ より $(1+t)(1-t)=1-t^2=1$ を満たすから逆元は $1-t$。解析側では $\mathbb C\{t\}/(t^2)$ に同じ計算が成り立つ。[GAGA II](#thm-cag1-06-gaga-hom)は特異・非被約な場合にも適用でき、解析的な逆射が代数化することをこの具体例で確認できる。
<!-- solution-end -->

<a id="ex-cag1-06-b04"></a>
#### CAG1-06-B04 二つの正則切断から射を作る
- Level: B

$P=\mathbb P^1$、$\mathcal L=\mathcal O_P(2)$ とし、解析化後の切断 $\sigma_0=S^2+T^2,\ \sigma_1=ST$ を考える。共通零点がないことを確かめ、対応する射 $P^{\mathrm{an}}\to\mathbb P^1(\mathbb C)$ を両チャートで書き、代数的射であると結論せよ。

<!-- solution-start -->
**詳細解答**。$ST=0$ の点では $S=0$ または $T=0$ である。前者なら $S^2+T^2=T^2\ne0$、後者なら $S^2+T^2=S^2\ne0$。よって同時零点がない。各切断は $H^0(P,\mathcal O(2)^{\mathrm{an}})$ の元なので、[GAGA II](#thm-cag1-06-gaga-hom)を $\mathcal O\to\mathcal O(2)$ に適用すれば代数的な同名の二次式に由来する。

$S\ne0$ では $z=T/S$、$T\ne0$ では $w=S/T$ とおく。各局所基底で切断の係数を取り、射影座標へ移すと

$$
[\sigma_0:\sigma_1]_{U_S}=[1+z^2:z],
\qquad
[\sigma_0:\sigma_1]_{U_T}=[1+w^2:w].
$$

重なりでは $z\ne0$、$w=1/z$ であり、後者の両成分を $z^2$ 倍して

$$
[1+w^2:w]=[(z^2+1)/z^2:1/z]=[z^2+1:z]
$$

と変形できる。これは前者と同じ射影点である。[代数的線型系からの射](#prop-cag1-06-algebraic-linear-system)に従い

$$
f([S:T])=[S^2+T^2:ST]
$$

という代数的射が存在し、その解析化が与えられた正則射である。
<!-- solution-end -->

### Level C

<a id="ex-cag1-06-c01"></a>
#### CAG1-06-C01 非被約点へのHomと非被約点からのHom
- Level: C

$P=\mathbb P^1_{\mathbb C}$、$Z\subset P$ を局所座標 $t$ で $t^2=0$ と定めた長さ2の閉部分スキームとする。$\mathcal F=\mathcal O_Z$ を $P$ 上の連接層とする。

1. $\mathcal Hom_P(\mathcal F,\mathcal O_P)$ が零であることを、支持点の局所環で示せ。
2. $\mathcal Hom_P(\mathcal F,\mathcal F)$ を求め、全自己準同型と可逆な自己準同型を求めよ。
3. 解析化した茎で(1)(2)を再計算し、どの比較定理が大域Homの一致を保証するか説明せよ。

<!-- solution-start -->
**詳細解答**。

**（1）** 支持点の代数的局所環 $A=\mathbb C[t]_{(t)}$ で $\mathcal F_p=A/(t^2)$ である。有限表示 $A\xrightarrow{t^2}A\to A/(t^2)\to0$ に $\operatorname{Hom}_A(-,A)$ を作用させると

$$
\operatorname{Hom}_A(A/(t^2),A)
=\ker(A\xrightarrow{t^2}A)=0
$$

となる。$A$ は整域なので $t^2a=0$ は $a=0$ を意味する。支持点以外では $\mathcal F=0$、従って全ての茎で内部Homは零である。

**（2）** 同じ表示の最後の $A$ を $M=A/(t^2)$ に替えると、$t^2$ が $M$ 上で零だから

$$
\operatorname{Hom}_A(M,M)=\ker(M\xrightarrow{t^2}M)=M.
$$

自己射は $1$ の像 $b=a+ct$ による乗法に一致する。[閉埋込みの直像とコホモロジー](../CAG1-05/index.md#prop-cag1-05-closed-pushforward)から大域の自己準同型環は $\mathbb C[t]/(t^2)$ である。$t^2=0$ により積は

$$
(a+ct)(a'+c't)=aa'+(ac'+ca')t.
$$

$a\ne0$ のとき

$$
(a+ct)^{-1}=a^{-1}-ca^{-2}t
$$

と計算できる。$a=0$ なら $ct$ は冪零であり逆元を持たないので、可逆性の条件は $a\ne0$ である。

**（3）** 解析側の局所環は $B=\mathbb C\{t\}$ で、$B/(t^2)$ は $1,t$ による同じ二次元の商である。$B$ も整域なので

$$
\operatorname{Hom}_B(B/(t^2),B)=0,
\qquad
\operatorname{End}_B(B/(t^2))=B/(t^2).
$$

これらは[平坦基底変換](#lem-cag1-06-hom-base-change)の核表示と整合する。射影的な $P$ での**大域Hom**の全単射は[GAGA II](#thm-cag1-06-gaga-hom)により保証される。局所計算だけで大域の全射性を一般に言うことはできない。
<!-- solution-end -->

<a id="ex-cag1-06-c02"></a>
#### CAG1-06-C02 非射影で増える正則自己同型
- Level: C

$A=\mathbb A^1_{\mathbb C}$ とその解析化 $\mathbb C$ を考え、構造層 $\mathcal O$ の自己射を比較する。

1. 代数的自己準同型環と解析的自己準同型環を大域切断として記述せよ。
2. $\varphi(f)(z)=e^z f(z)$ は解析的層の自己同型であることを示し、代数的自己射の解析化ではないことを二通りの方法で示せ。
3. $A$ を $\mathbb P^1$ に取り替えた場合の結論と対比し、GAGA IIの証明のどの段階が $A$ では使えないか述べよ。

<!-- solution-start -->
**詳細解答**。

**（1）** [内部Homの定義](#def-cag1-06-internal-hom)で $\mathcal Hom(\mathcal O,\mathcal O)=\mathcal O$ である。代数側の大域正則関数は多項式環 $\mathbb C[z]$、解析側は全関数の環 $\mathcal H(\mathbb C)$ だから

$$
\operatorname{End}_A(\mathcal O_A)=\mathbb C[z],
\qquad
\operatorname{End}_{\mathbb C}(\mathcal O_{\mathbb C})=\mathcal H(\mathbb C).
$$

**（2）** $e^z$ は全平面で正則かつ零点がないので、乗法写像は $\mathcal O_{\mathbb C}$-線型な層自己同型で、逆射は $e^{-z}$ の乗法である。一方、代数的自己射は $p(z)\in\mathbb C[z]$ の乗法に限られる。$e^z$ が次数 $d$ の多項式 $p$ なら、**変数 $z$ による** $(d+1)$ 階微分について

$$
\frac{d^{d+1}}{dz^{d+1}}p(z)=0,
\qquad
\left.\frac{d^{d+1}}{dz^{d+1}}e^z\right|_{z=0}=1
$$

が同時に必要となり矛盾する。よって多項式ではない。

別法として、指数関数が多項式 $p(z)$ の解析化だと仮定する。指数関数は非定数なので $p$ も非定数であり、一方で零点がないため

$$
p(z)=e^z\ne0\qquad(z\in\mathbb C)
$$

となる。しかし[弱Hilbertの零点定理](../../AG/AG1-07/index.md#thm-ag1-07-weak-nullstellensatz)を真のイデアル $(p)\subset\mathbb C[z]$ に適用すると、非定数多項式は複素零点を持つ。これは表示式に矛盾する。

なお $\mathbb C[z]$ の単元が非零定数だけであることも、$p(z)q(z)=1$ のとき

$$
\deg p+\deg q=\deg1=0
$$

から直接従う。これにより**代数的自己同型だけでなく、すべての代数的自己準同型**の解析化を排除した。

**（3）** $\mathbb P^1$ では[射影空間の大域関数定理](../../AG/AG2-05/index.md#thm-ag2-05-projective-global-constants)と[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)から双方の $H^0(\mathcal O)$ は $\mathbb C$ である。GAGA IIがHomの全単射を保証する。

一方 $A$ でも[局所的な内部Homの基底変換](#lem-cag1-06-hom-base-change)は成立する。しかしGAGA Iを使って

$$
H^0(A,\mathcal O_A)\longrightarrow
H^0(A^{\mathrm{an}},\mathcal O_{A^{\mathrm{an}}})
$$

を全射とする**射影性の仮定**を失っている。失敗は局所平坦性の破綻ではなく大域切断の増加に由来する。
<!-- solution-end -->

## 6. 証明の依存と次章への橋

この章の論理は、[代数的連接層の有限表示](../../AG/AG3-06/index.md#def-ag3-06-finite-type-presentation)と[局所Noether性](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)から内部Homの連接性を得て、[解析化の忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)から内部Homの解析化交換を証明し、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の零次比較でHom全単射へ進むものである。

**ここまでの証明の範囲**：解析化の局所環の忠実平坦性、Okaの解析的連接性、GAGA Iのコホモロジー比較の深い解析的入力はそれぞれ前提章の明示した定理・外部入力に依存する。本章ではそれらを再証明していない。射影スキームの射の比較は証明したが、任意の解析的連接層の存在的な代数化はまだ証明していない。

次のCAG1-07では、**そもそも代数的な相手が指定されていない**解析的連接層を、ねじった大域生成と有限表示からどう作り直すかを扱う。その段階で初めて、今日の「代数化済みの層の間には新しい正則射が増えない」という結論が、解析的層を構成するための道具になる。

参考： [Serre, *Géométrie algébrique et géométrie analytique* (1956)](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/)；[Kedlaya, MIT 18.726, *GAGA*](https://kskedlaya.org/18.726/gaga.pdf)。いずれも定理の射程と証明の入力を照合するための参照先であり、本文・演習の転載ではない。
