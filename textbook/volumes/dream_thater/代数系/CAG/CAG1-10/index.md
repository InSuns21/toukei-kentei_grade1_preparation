# CAG1-10 Picard群と正則線束の代数化

前章では、射影多様体間の正則写像が代数的になることを、[正則線束と切断の代数化](../CAG1-09/index.md#lem-cag1-09-line-bundle-sections)から構成した。しかし一つの写像に付随する線束だけでなく、**すべての線束をテンソル積でまとめた群**も、代数的な側と解析的な側で一致するのだろうか。

[Cartier因子からの可逆層](../../AG/AG2-07/index.md#thm-ag2-07-cartier-picard)は零点・極を数える代数的な方法だった。一方、[正則線束の局所枠](../../../幾何系/CM/CM2-06/index.md#def-cm2-06-holomorphic-line-bundle)は、複素多様体の正則関数で貼り合わせる解析的な方法である。射影的な空間では両者が同じ線束の情報を捉えることを証明する。最後に、**正則に自明**、**位相的に自明**、**正の曲率を持つ**という三つの条件を区別する。

以下、$X$ は特記しない限り $\mathbb C$ 上の有限型射影スキーム、$h:X^{\mathrm{an}}\to X$ は[解析化](../CAG1-02/index.md#thm-cag1-02-analytification-functor)の射とする。滑らかさや既約性はPicard群の比較には不要である。ただし因子を局所方程式で表す節では $X$ を滑らかな既約射影多様体、指数完全列の節では $M$ を複素多様体と明記して区別する。

## 1. 線束の同型類を群として比べる

代数側の可逆層は局所的に構造層一つと同型な層であり、その同型類にテンソル積を入れたものが[代数的Picard群](../../AG/AG2-07/index.md#thm-ag2-07-cartier-picard)である。解析側でも同じことを正則関数の層で行う。線束自体の集合ではなく**同型類**を採用するのは、局所枠を取り替えても同じ対象として扱うためである。

<a id="def-cag1-10-analytic-picard"></a>

<!-- formal-statement-start -->
> **定義（解析的Picard群）**  
> 複素解析空間 $M$ 上の構造層を $\mathcal O_M$ とする。局所的に $\mathcal O_M$ と同型な階数1の $\mathcal O_M$ 加群を**解析的可逆層**という。その同型類をテンソル積で足し合わせる可換群を

$$
\operatorname{Pic}_{\mathrm{hol}}(M)
=\{[L]:L\text{ は解析的可逆層}\},\qquad
[L]+[N]=[L\otimes_{\mathcal O_M}N]
$$

> とする。単位元は $[\mathcal O_M]$、逆元は $[L^\vee]$ である。$M$ が複素多様体なら、これは正則線束の同型類の群と一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-10-analytic-picard -->
**定義の確認**：$M=\mathbb C$ 上の自明線束は各開集合で $\mathcal O_M$ 自身なので解析的可逆層である。$\mathcal O_M\otimes\mathcal O_M\simeq\mathcal O_M$、双対も $\mathcal O_M^\vee\simeq\mathcal O_M$ だから、この同型類は確かに群の零元になる。非自明線束についても[正則遷移関数の余輪条件](../../../幾何系/CM/CM2-06/index.md#def-cm2-06-transition-cocycle)により、テンソル積の遷移は積、双対の遷移は逆数となる。
<!-- definition-example-end -->

代数的可逆層 $L$ に解析化 $L^{\mathrm{an}}$ を施したとき、局所基底は正則な局所基底として残る。また、代数的な同型 $L\simeq N$ を解析化すれば正則な同型 $L^{\mathrm{an}}\simeq N^{\mathrm{an}}$ を得るので、同型類に対する対応が定まる。したがって二つのPicard群の間に自然な写像を考えられる。

<a id="def-cag1-10-picard-map"></a>

<!-- formal-statement-start -->
> **定義（Picard比較写像）**  
> $X$ を有限型 $\mathbb C$-スキームとし、代数的可逆層の同型類の群を $\operatorname{Pic}(X)$ とする。各可逆層 $L$ を[層の解析化](../CAG1-03/index.md#def-cag1-03-sheaf-analytification)で得る解析的可逆層 $L^{\mathrm{an}}$ に送る写像を

$$
\alpha_X:\operatorname{Pic}(X)\longrightarrow
\operatorname{Pic}_{\mathrm{hol}}(X^{\mathrm{an}}),\qquad
[L]\longmapsto[L^{\mathrm{an}}]
$$

> と書く。ここではまだ $\alpha_X$ が全単射とは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-10-picard-map -->
**定義の確認**：$X=\mathbb P^1_{\mathbb C}$ の [ $\mathcal O(1)$ の代数的遷移関数](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf)は、$U_S=\{S\ne0\}$、$U_T=\{T\ne0\}$ の重なりで $e_T=(T/S)e_S$ である。重なりは $T/S\ne0$ なので、その解析化 $z=T/S$ も零でない正則関数である。したがって $\mathcal O(1)^{\mathrm{an}}$ は解析的可逆層で、$\alpha_X([\mathcal O(1)])$ が実際に定義できる。
<!-- definition-example-end -->

<a id="prop-cag1-10-tensor"></a>

<!-- formal-statement-start -->
> **命題（解析化は線束の群演算を保つ）**  
> $X$ を有限型 $\mathbb C$-スキーム、$L,N$ を $X$ 上の代数的可逆層とする。自然な同型

$$
(L\otimes N)^{\mathrm{an}}\simeq
L^{\mathrm{an}}\otimes N^{\mathrm{an}},\qquad
(L^\vee)^{\mathrm{an}}\simeq(L^{\mathrm{an}})^\vee
$$

> があり、$\alpha_X$ は可換群の準同型である。
<!-- formal-statement-end -->

### 証明の見取り図

局所的な階数1の自由加群に基底を選べば、テンソル積は基底同士の積、双対は逆の基底変換を持つ。解析化してもその係数を同じ正則関数として読むだけである。

<!-- proof-start -->
### 証明

$X$ の開被覆上で $L,N$ の基底をそれぞれ $e_i,f_i$ とし、重なりで $e_j=g_{ij}e_i$、$f_j=h_{ij}f_i$ とする。$g_{ij},h_{ij}$ は代数的な単元であり、解析化後も正則な単元になる。テンソル積の基底は

$$
e_j\otimes f_j=(g_{ij}h_{ij})(e_i\otimes f_i),
$$

双対基底 $e_i^\vee$ は $e_j^\vee=g_{ij}^{-1}e_i^\vee$ と変換される。解析化してからテンソル積・双対を取った場合にも同じ遷移関数になるので、局所同型は重なりで貼り合う。したがって $\alpha_X([L]+[N])=\alpha_X([L])+\alpha_X([N])$、零元と逆元も保つ。$\square$
<!-- proof-end -->

## 2. GAGAからPicard群の同型を導く

ここで重要なのは「解析的連接層を何か一つ代数化した」ことと、「その代数化が**階数1で局所自由**である」ことを区別する点である。後者を確認しないと、解析的線束の元がPicard群の元へ戻ったとは言えない。[前章の線束代数化補題](../CAG1-09/index.md#lem-cag1-09-line-bundle-sections)は、解析化の忠実平坦性を使って、この隙間を埋めている。

必要になる局所加群の道具を、ここで使う形に絞って証明する。$A$ が局所環とは、非単元全体が一つの極大イデアル $\mathfrak m$ をなす環のことである。有限生成加群の元を $\mathfrak m$ で割った剰余体上で調べると、必要な生成元の数を判定できる。

<a id="lem-cag1-10-nakayama"></a>

<!-- formal-statement-start -->
> **補題（Nakayamaの生成元判定）**  
> $(A,\mathfrak m)$ を可換局所環、$M$ を有限生成 $A$-加群とする。$m_1,\ldots,m_r\in M$ の剰余類が $M/\mathfrak m M$ を $A/\mathfrak m$ 上で生成するなら、$m_1,\ldots,m_r$ は $M$ を $A$ 上で生成する。
<!-- formal-statement-end -->

### 証明の見取り図

選んだ元で割った商 $Q$ は $Q=\mathfrak m Q$ を満たす。有限個の生成元に対するこの等式を行列にし、行列式が単元になることから $Q=0$ を示す。

<!-- proof-start -->
### 証明

$N=Am_1+\cdots+Am_r$、$Q=M/N$ とする。剰余類の生成条件から $M=N+\mathfrak m M$、したがって $Q=\mathfrak m Q$。$Q$ は有限生成なので $q_1,\ldots,q_s$ を生成元に選ぶ。各 $q_i$ が $\mathfrak m Q$ に属することは、係数 $a_{ij}\in\mathfrak m$ を用いて $q_i=\sum_{j=1}^s a_{ij}q_j$ と書けることを意味する。この $s$ 本の関係式を並べ、列ベクトル $q=(q_1,\ldots,q_s)^{\mathsf T}$ と、$A$ の元を成分とする $s$ 行 $s$ 列の係数行列 $A_0=(a_{ij})$ にすると

$$
(I_s-A_0)q=0
$$

となる。ここで行列は生成元間の関係式の係数を表しており、$Q$ にあらかじめ基底があると仮定したわけではない。

行列式 $\det(I_s-A_0)$ を展開すると恒等置換の定数項 $1$ 以外の項はいずれも $\mathfrak m$ の元を含むので、$\det(I_s-A_0)\in1+\mathfrak m$。局所環ではこれは単元である。随伴行列を掛けると $\det(I_s-A_0)q=0$、ゆえに $q=0$。すべての生成元が零なので $Q=0$、したがって $M=N$。$\square$
<!-- proof-end -->

**直接の使用例。** $M/\mathfrak m M$ が一次元である場合、その非零剰余類を持つ $m\in M$ を一つ選べば補題から $M=Am$。従って $A\twoheadrightarrow M$ という全射が得られる。ただしこの段階ではまだ**単射とは言えない**。その核を零にするのが次の忠実平坦性の役割である。

<a id="thm-cag1-10-picard-gaga"></a>

<!-- formal-statement-start -->
> **定理（射影GAGAによるPicard群の比較）**  
> $X$ を $\mathbb C$ 上の有限型射影スキームとする。このときPicard比較写像は自然な可換群の同型である。

$$
\alpha_X:\operatorname{Pic}(X)
\xrightarrow{\ \simeq\ }
\operatorname{Pic}_{\mathrm{hol}}(X^{\mathrm{an}}).
$$

> $X$ に滑らかさ・既約性・被約性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

**全射**は[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)で解析的可逆層を連接層として代数化し、その層が可逆であることを確認する。**単射**は[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で解析側の線束同型と逆射を代数側へ持ち上げる。群演算は直前の命題で保証した。

<!-- proof-start -->
### 証明

まず全射性。解析的可逆層 $E$ は局所自由階数1なので解析的連接層である。[射影版GAGAの圏同値](../CAG1-08/index.md#thm-cag1-08-projective-equivalence)の本質的全射性により、ある代数的連接層 $F$ と同型 $F^{\mathrm{an}}\simeq E$ がある。ここで $F$ が局所可逆であることが必要になる。

その確認は[解析的正則線束の代数化補題](../CAG1-09/index.md#lem-cag1-09-line-bundle-sections)の局所議論による。$X$ の閉点 $p$ を固定し、代数的局所環と解析的局所環を

$$
A=\mathcal O_{X,p},\qquad B=\mathcal O_{X^{\mathrm{an}},p}
$$

と置く。[解析化の忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)により $A\to B$ は忠実平坦である。有限生成加群 $M=F_p$ は $M\otimes_A B\simeq B$ を満たす。閉点の局所環の剰余体はどちらも $\mathbb C$ なので、$B$ の極大イデアルを $\mathfrak m_B$ と書いて剰余を取ると

$$
(M/\mathfrak m_A M)\otimes_{A/\mathfrak m_A}\mathbb C
\simeq (M\otimes_A B)/\mathfrak m_B(M\otimes_A B)
\simeq B/\mathfrak m_B\simeq\mathbb C.
$$

左端は $M/\mathfrak m_A M$ 自身なので、これは一次元の $\mathbb C$-ベクトル空間である。

[Nakayamaの生成元判定](#lem-cag1-10-nakayama)で全射 $A\twoheadrightarrow M$ を得る。これを $B$ とテンソルすると $B\twoheadrightarrow B$ となり、局所環の自己全射だから単元倍の同型である。元の核を $I$ と置けば、平坦性と忠実性により

$$
I\otimes_A B=0\quad\Longrightarrow\quad I=0.
$$

よって $M\simeq A$ である。

局所自由階数1でない点の集合は有限表示加群の局所自由性の開性によって閉集合であり、非空なら有限型 $\mathbb C$-スキーム上に閉点を持つ。すべての閉点で自由と分かったのでその集合は空となる。したがって $F$ は代数的可逆層で、$\alpha_X([F])=[E]$。これは全射性である。

次に単射性。$L_1,L_2$ の解析化が同型なら、解析的な同型 $u:L_1^{\mathrm{an}}\to L_2^{\mathrm{an}}$ と逆射 $v$ がある。[GAGA IIのHom同型](../CAG1-06/index.md#thm-cag1-06-gaga-hom)によって代数的な射 $\widetilde u:L_1\to L_2$、$\widetilde v:L_2\to L_1$ に一意に戻る。合成の解析化は $vu=1$、$uv=1$ なので、同じHom同型の単射性から

$$
\widetilde v\widetilde u=1_{L_1},\qquad
\widetilde u\widetilde v=1_{L_2}.
$$

よって $L_1\simeq L_2$。特に核は零である。最後に[群演算の保存](#prop-cag1-10-tensor)より、全単射 $\alpha_X$ は群同型となる。$\square$
<!-- proof-end -->

**何が増えたか。** 射影的なら、任意の正則線束にただ一つの代数的線束の**同型類**が対応する。「ただ一つ」は基底や具体的な同型写像が一意という意味ではない。非零定数倍などの自己同型は残る。

## 3. $\mathbb P^1$ と因子を両方の言葉で計算する

[代数的な射影直線のPicard群](../../AG/AG2-07/index.md#thm-ag2-07-p1-picard)は $\mathbb Z$ であり、整数 $d$ に $\mathcal O(d)$ が対応した。ここではその結論を重複して証明せず、**どの局所データが解析化で保存されるか**を確認する。

$U_S=\{S\ne0\}$ に $z=T/S$、$U_T=\{T\ne0\}$ に $w=S/T$ を置く。重なりでは $zw=1$。$\mathcal O(d)$ の局所基底が $e_T=z^de_S$ を満たすので、解析化した線束でも同じ正則遷移が成り立つ。例えば $d=2$ なら $e_T=z^2e_S$ で、$e_S$ に係数 $z^2$ を掛けた基底へ替えている。$d=-1$ なら $e_T=z^{-1}e_S=we_S$ であり、重なりでは $z,w$ とも非零なので問題ない。

したがって[射影GAGAによるPicard群の比較](#thm-cag1-10-picard-gaga)から

$$
\operatorname{Pic}_{\mathrm{hol}}(\mathbb{CP}^1)
\simeq\operatorname{Pic}(\mathbb P^1_{\mathbb C})
\simeq\mathbb Z,
\quad [\mathcal O(d)^{\mathrm{an}}]\longmapsto d.
$$

一方、滑らかな既約多様体では因子の局所方程式 $f_i$ をそのまま正則な局所方程式として読むことができる。ここでも「零点集合」だけでなく、局所方程式を保持することが重要である。

<a id="prop-cag1-10-divisor"></a>

<!-- formal-statement-start -->
> **命題（Cartier因子からの線束と解析化）**  
> $X$ を滑らかな既約射影 $\mathbb C$-多様体、$D$ を代数的Cartier因子とする。$D$ の局所方程式 $f_i$ を解析化して作る解析的Cartier因子を $D^{\mathrm{an}}$ と書く。このとき

$$
\bigl(\mathcal O_X(D)\bigr)^{\mathrm{an}}
\simeq\mathcal O_{X^{\mathrm{an}}}(D^{\mathrm{an}}).
$$

> 特に代数的な主因子に対応する線束は、解析化後も正則に自明である。
<!-- formal-statement-end -->

### 証明の見取り図

因子の局所方程式から作る線束の局所基底は $1/f_i$ で、重なりでは $f_i/f_j$ 倍になる。正則化しても比は同じである。

<!-- proof-start -->
### 証明

[因子に付随する可逆層の定義](../../AG/AG2-07/index.md#def-ag2-07-associated-line-bundle)より、$U_i$ で $e_i=1/f_i$ とすると、$U_i\cap U_j$ では

$$
e_j=\frac{f_i}{f_j}e_i.
$$

$f_i/f_j$ とその逆数は重なりで正則であるため、解析化後も零でない正則な遷移関数を与える。解析的Cartier因子 $D^{\mathrm{an}}$ の線束を同じ局所方程式から作ると遷移が一致するので、$e_i$ を対応させる局所同型が貼り合う。主因子 $D=\operatorname{div}(f)$ の場合はすべての $f_i=f$ と選べ、遷移が $1$ なので自明である。$\square$
<!-- proof-end -->

**一点の例。** $P_\infty=[0:1]$ で、$[P_\infty]$ の局所方程式を $f_S=1$、$f_T=w$ とすれば、$1/f_T=(1/w)(1/f_S)=z(1/f_S)$。これは上の $d=1$ の遷移と一致する。$P_a=[1:a]$ について $\operatorname{div}(z-a)=[P_a]-[P_\infty]$ だから、両側で $[P_a]$ と $[P_\infty]$ に付随する線束は同型となる。しかし二つの点は同じ点集合になったわけではない。

## 4. なぜ第一Chern類だけでは線束を分類できないか

ここからは $M$ を複素多様体とする。正則線束の遷移は零でない正則関数なので、その**局所的な対数**を取れば乗法から加法へ移せる。ただし対数の値は $2\pi i$ の整数倍だけずれる。このずれを大域的に集めるのが指数完全列である。

$\mathcal O_M^\times$ を零でない正則関数の乗法群の層、$\underline{\mathbb Z}$ を局所定数の整数値関数の層とする。$\mathcal O_M$ は加法群の層である。例えば $g(z)=1+z$ は $|z|<1/2$ で零にならず、$\log(1+z)=\sum_{n\ge1}(-1)^{n+1}z^n/n$ が正則な局所対数になる。一方 $g$ を大域的に対数の指数と書けるとは限らない。

<a id="thm-cag1-10-exponential"></a>

<!-- formal-statement-start -->
> **定理（解析的指数完全列と第一Chern類）**  
> 複素多様体 $M$ 上で、$\exp_{2\pi i}(f)=e^{2\pi i f}$ と置くと、次は群の層の完全列である。

$$
0\longrightarrow\underline{\mathbb Z}
\longrightarrow\mathcal O_M
\xrightarrow{\ \exp_{2\pi i}\ }\mathcal O_M^\times
\longrightarrow 1.
$$

> そのコホモロジー長完全列には

$$
H^1(M,\mathcal O_M)\longrightarrow
\operatorname{Pic}_{\mathrm{hol}}(M)
\xrightarrow{\ c_1\ }H^2(M,\underline{\mathbb Z})
\longrightarrow H^2(M,\mathcal O_M)
$$

> という完全な部分列が現れる。$c_1$ は正則線束の整数係数第一Chern類であり、$\ker c_1$ は $H^1(M,\mathcal O_M)$ の像である。
<!-- formal-statement-end -->

### 証明の見取り図

指数の核は整数、非零な正則関数は**各点の近くで**正則対数を持つ。各二重重なりの遷移を対数に持ち上げると、三重重なりで整数値のずれが出る。それが第一Chern類になる。

<!-- proof-start -->
### 証明

まず点ごとに層の完全性を確認する。$e^{2\pi if}=1$ なら、各値 $f(x)$ は整数である。$f$ は連続なので連結な小近傍ではその整数は一定になり、核は $\underline{\mathbb Z}$ に一致する。

任意の点 $p$ の近くで $g\in\mathcal O_M^\times$ を考える。$g(p)\ne0$ なので近傍を狭めて $g/g(p)$ が $1$ の周りの小円盤に入るようにでき、そこでは上記の級数から $\log(g/g(p))$ を取れる。定数 $g(p)$ の対数を一つ選んで足せば $\log g$ となり、$g=e^{2\pi i(\log g/(2\pi i))}$。これは**茎での全射性**であって、全域で対数が選べるという意味ではない。

次に[正則線束の遷移余輪](../../../幾何系/CM/CM2-06/index.md#def-cm2-06-transition-cocycle) $g_{ij}$ を持つ被覆を十分細分し、すべての非空な有限重なりが可縮な良い被覆で計算する。これは[整数第一Chern類の局所構成](../../../幾何系/KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)と同じ設定である。

単に重なりが**連結**なだけでは正則対数を選べない。例えば $\mathbb C^\times$ 上の $g(z)=z$ に正則対数 $h$ があれば、複素変数 $z$ で微分して $h'(z)=dh/dz=1/z$ となる。しかし導関数の閉曲線積分は零なのに、単位円周上の $1/z$ の積分は $2\pi i\ne0$ なので矛盾する。

ここでは良い被覆の各二重重なりが可縮なので、局所対数を重なり全体へ整合的に延長できる。これは前述の[第一Chern類の局所構成](../../../幾何系/KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)で確かめた条件である。各 $g_{ij}$ に対して正則な $\ell_{ij}$ を選び、$g_{ij}=e^{2\pi i\ell_{ij}}$ と書く。三重重なりでは $g_{ij}g_{jk}=g_{ik}$ だから

$$
n_{ijk}=\ell_{ij}+\ell_{jk}-\ell_{ik}\in\mathbb Z.
$$

この整数値は局所定数である。四重重なりでのČech交代差を $\delta n$ と書くと

$$
(\delta n)_{ijkl}=n_{jkl}-n_{ikl}+n_{ijl}-n_{ijk}=0
$$

となる。実際、$n=\delta\ell$ を代入すれば各 $\ell_{ab}$ が正負一回ずつ現れて相殺する。対数の別の選択 $\ell'_{ij}=\ell_{ij}+k_{ij}$（$k_{ij}$ は局所定数の整数）では $n'=n+\delta k$ であり、同じコホモロジー類である。

さらに局所枠を $e'_i=u_i e_i$ と替えると、遷移は $g'_{ij}=(u_j/u_i)g_{ij}$ となる。各 $u_i=e^{2\pi i a_i}$ の局所対数を選べば

$$
\ell'_{ij}=\ell_{ij}+a_j-a_i+k_{ij}
$$

となり、三重重なりで $a_j-a_i$ の項は消える。したがって枠の変更も整数余境界しか加えず、この類は[整数第一Chern類](../../../幾何系/KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)と一致する。

遷移余輪の同値類は $H^1(M,\mathcal O_M^\times)$、すなわち $\operatorname{Pic}_{\mathrm{hol}}(M)$ なので、層の短完全列に[コホモロジー長完全列の構成](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)と同じホモロジー代数を適用した該当部分が上の式になる。完全性により $c_1$ の核は直前の写像の像である。$\square$
<!-- proof-end -->

したがって、$c_1(L)=0$ から言えるのは、$L$ が**局所正則関数の加法余輪から作れる**ということまでである。その余輪が大域的に消えるとは限らない。実係数Chern類が零なら整数係数の類も零という逆向きも一般には成り立たない（torsionが落ちる）。[整数類と曲率の区別](../../../幾何系/KAH/KAH1-12/index.md#thm-kah1-12-integrality)を参照しよう。

<a id="prop-cag1-10-flat-torus"></a>

<!-- formal-statement-start -->
> **命題（位相的には自明でも正則には非自明な線束）**  
> 複素トーラス $M=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で、$\mathbb Z+i\mathbb Z$ が $\mathbb C\times\mathbb C$ に

$$
(m+in)\cdot(z,v)=(z+m+in,(-1)^m v)
\qquad(m,n\in\mathbb Z)
$$

> と作用する商線束 $L$ を考える。$L$ は正則線束で、滑らかな複素線束としては自明だが、正則線束としては自明でない。
<!-- formal-statement-end -->

### 証明の見取り図

格子の乗法則により正則な貼り合わせができる。滑らかな非零切断は明示的に作れるが、正則な非零切断はLiouvilleの定理で存在しない。

<!-- proof-start -->
### 証明

文字 $\chi(m+in)=(-1)^m$ は $\chi(\lambda+\mu)=\chi(\lambda)\chi(\mu)$ を満たす。したがって作用は整合し、格子の小さな互いに交わらない平行移動チャートを使うと、一定値 $\pm1$ の正則遷移関数を持つ階数1の線束になる。

切断は $f(z+1)=-f(z)$、$f(z+i)=f(z)$ を満たす関数 $f$ と対応する。$f_{\mathrm{sm}}(z)=e^{\pi i\operatorname{Re}z}$ は滑らかで零にならず、二つの変換則を満たすため、滑らかな大域非零枠を与える。よって滑らかな線束として自明である。

もし $L$ が正則に自明なら大域非零正則枠に対応する整関数 $f$ がある。変換則から $|f(z+1)|=|f(z+i)|=|f(z)|$ なので、$|f|$ は閉正方形 $\{x+iy:0\le x,y\le1\}$ で有界であり、格子移動によって全平面で有界になる。[Liouvilleの定理](../../../解析系/CA/CA3/index.md#thm-ca3-liouville)により $f$ は定数だが、$f(z+1)=-f(z)$ からその定数は零。非零枠と矛盾する。$\square$
<!-- proof-end -->

この例では滑らかな大域非零枠があるため位相的第一Chern類は零だが、正則に自明ではない。**線束を連続関数で貼るのか、正則関数で貼るのか**が違いを生む。射影GAGAは代数的可逆層と**正則**可逆層の比較であり、連続線束への比較ではない。

また「正の線束」は、あるHermite計量のChern曲率が正という追加条件である。[正の正則線束の定義](../../../幾何系/KAH/KAH1-14/index.md#def-kah1-14-positive-line-bundle)によれば、$\mathbb{CP}^1$ の $\mathcal O(1)^{\mathrm{an}}$ は正だが、$\mathcal O(-1)^{\mathrm{an}}$ は正になれない。実際、後者の第一Chern数は

$$
\int_{\mathbb{CP}^1}c_1(\mathcal O(-1))=-1
$$

であり、曲率が正なら積分が正となる条件に反する。自明束 $\mathcal O$ も同じ積分が零となるため、コンパクトな $\mathbb{CP}^1$ 上では正になれない。**正則線束であることと正であることは別**である。

## 5. 射影性を外したときの注意

射影性の仮定が外れれば、上の[Picard群同型](#thm-cag1-10-picard-gaga)の**証明**ではGAGA IIIとGAGA IIを使えなくなる。ただし「すべての非射影空間でPicard比較が失敗する」という結論にもならない。例えば $\mathbb A^1_{\mathbb C}$ は非射影だが、その代数的線束はすべて自明であり、複素平面上の正則線束もすべて自明である。後者は $\mathbb C$ の[Stein性とCartan B](../CAG1-04/index.md#thm-cag1-04-cartan-b)から $H^1(\mathbb C,\mathcal O)=0$、可縮性から $H^2(\mathbb C,\underline{\mathbb Z})=0$ とし、[指数完全列](#thm-cag1-10-exponential)に代入すれば従う。ここではPicard群だけが偶然ともに零でも、大域関数の比較は $e^z$ により失敗する。

一般のコンパクト複素多様体にも代数的射影モデルが与えられるわけではない。さらに第一Chern類を計算するだけで射影性は分からない。[整数Kähler類と射影性の関係](../../../幾何系/KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)は、正値性・整数性・大域切断を区別して読む必要がある。

## 6. 演習と詳細解答

以下、$\mathcal O(d)$ は $\mathbb P^1_{\mathbb C}$ 上の代数的ねじり層、その解析化には上付き $\mathrm{an}$ を付ける。

### Level A

<a id="ex-cag1-10-a01"></a>
#### CAG1-10-A01 遷移関数の積と逆数
- Level: A

$U_S\cap U_T$ 上で $e_T=z^2e_S$ と $f_T=z^{-3}f_S$ を持つ二つの線束のテンソル積・第一の束の双対の遷移関数を求めよ。$z=T/S$ は重なりで非零である。

<!-- solution-start -->
**詳細解答。** テンソル積の基底を $e_i\otimes f_i$ とすると

$$
e_T\otimes f_T=(z^2e_S)\otimes(z^{-3}f_S)
=z^{-1}(e_S\otimes f_S).
$$

第一の束の双対基底は $e_T^\vee=z^{-2}e_S^\vee$。指数がそれぞれ $2+(-3)=-1$、$-2$ になり、どの係数も $z\ne0$ 上で正則な単元である。
<!-- solution-end -->

<a id="ex-cag1-10-a02"></a>
#### CAG1-10-A02 $\mathcal O(-2)$ の正則切断
- Level: A

$\mathbb{CP}^1$ 上の $\mathcal O(-2)^{\mathrm{an}}$ が零でない大域正則切断を持つか。代数的な切断との比較を使って判定せよ。

<!-- solution-start -->
**詳細解答。** [GAGA Iの次数0比較](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を射影 $X=\mathbb P^1$、連接層 $F=\mathcal O(-2)$、$q=0$ に適用すると

$$
H^0(\mathbb P^1,\mathcal O(-2))\simeq
H^0(\mathbb{CP}^1,\mathcal O(-2)^{\mathrm{an}}).
$$

[射影直線の切断の計算](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)では $d<0$ の左辺は零なので、右辺も零。非零切断は存在しない。
<!-- solution-end -->

<a id="ex-cag1-10-a03"></a>
#### CAG1-10-A03 点の因子と線束
- Level: A

$P_2=[1:2]$、$P_\infty=[0:1]$ を $\mathbb P^1$ 上の点とする。$D=[P_2]-[P_\infty]$ が主因子であることを示し、$\mathcal O(D)^{\mathrm{an}}$ の同型類を求めよ。

<!-- solution-start -->
**詳細解答。** $z=T/S$ は $U_S$ で $z=2$ に一次零点を持ち、$U_T$ では $z-2=(1-2w)/w$ だから $w=0$ で一次極を持つ。したがって $\operatorname{div}(z-2)=[P_2]-[P_\infty]=D$。[因子の解析化](#prop-cag1-10-divisor)より $\mathcal O(D)^{\mathrm{an}}$ は自明正則線束で、Picard群の零元に対応する。
<!-- solution-end -->

<a id="ex-cag1-10-a04"></a>
#### CAG1-10-A04 複素指数関数の核と局所全射
- Level: A

円盤 $U=\{|z|<1/2\}$ 上で $g(z)=1+z$ とする。$g$ の正則対数を級数で与え、$e^{2\pi if}=1$ を満たす正則関数 $f$ の形を述べよ。

<!-- solution-start -->
**詳細解答。** $|z|<1/2$ では絶対一様収束するべき級数

$$
\log(1+z)=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}z^n}{n}
$$

は $\log(1)=0$ の枝を与え、指数を取れば $e^{\log(1+z)}=1+z$。ゆえに $f=\log(1+z)/(2\pi i)$ は $e^{2\pi if}=g$ を満たす。一方 $e^{2\pi if}=1$ なら各値 $f(z)\in\mathbb Z$、連結な円盤上の連続整数値関数は定数だから $f(z)\equiv n$（$n\in\mathbb Z$）である。
<!-- solution-end -->

<a id="ex-cag1-10-a05"></a>
#### CAG1-10-A05 Picard類と正値性
- Level: A

$\mathbb{CP}^1$ 上の $\mathcal O(1)^{\mathrm{an}}$、$\mathcal O^{\mathrm{an}}$、$\mathcal O(-1)^{\mathrm{an}}$ の第一Chern数と正の線束になりうるかを判定せよ。

<!-- solution-start -->
**詳細解答。** [Fubini–Studyと第一Chern類の規格化](../../../幾何系/KAH/KAH1-12/index.md#thm-kah1-12-integrality)および $\mathcal O(1)$ の標準例から $\int_{\mathbb{CP}^1}c_1(\mathcal O(1))=1$。テンソル積・双対でChern類は加法・符号反転するので、上記3束の数は順に $1,0,-1$。$\mathcal O(1)$ は[正の線束の定義と具体構成](../../../幾何系/KAH/KAH1-14/index.md#def-kah1-14-positive-line-bundle)で正である。コンパクトな曲線で曲率が正ならその積分は正となるため、数が $0$ と $-1$ の二束は正にはなれない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-10-b01"></a>
#### CAG1-10-B01 局所的な可逆性を忠実平坦性で戻す
- Level: B

局所環 $(A,\mathfrak m)$ から局所環 $(B,\mathfrak n)$ への忠実平坦な局所準同型で、剰余体はともに $\mathbb C$ とする。有限生成 $A$-加群 $M$ が $M\otimes_A B\simeq B$ を満たすとき $M\simeq A$ を示せ。[Nakayamaの生成元判定](#lem-cag1-10-nakayama)を使ってよい。

<!-- solution-start -->
**詳細解答。** $M\otimes_A B\simeq B$ を $\mathfrak n$ で割れば $M\otimes_A\mathbb C\simeq\mathbb C$。局所準同型の剰余体が一致するので $M/\mathfrak m M$ は一次元。[Nakayamaの生成元判定](#lem-cag1-10-nakayama)により一元 $m\in M$ が $M$ を生成し、全射 $q:A\twoheadrightarrow M$ を得る。$q\otimes B:B\twoheadrightarrow B$ は局所環の自由階数1加群の全射であり、像の生成元が単元なので同型。$I=\ker q$ と置き、平坦性で

$$
0\longrightarrow I\otimes_A B
\longrightarrow B\xrightarrow{q\otimes B} B\longrightarrow0
$$

が完全となる。中央の射は同型なので $I\otimes_A B=0$。忠実平坦性から $I=0$、従って $q$ は同型で $M\simeq A$。
<!-- solution-end -->

<a id="ex-cag1-10-b02"></a>
#### CAG1-10-B02 代数化の一意性は何を意味するか
- Level: B

$X$ を射影 $\mathbb C$-スキーム、$E$ をその解析化上の正則線束とする。$L_1^{\mathrm{an}}\simeq E\simeq L_2^{\mathrm{an}}$ である代数的線束 $L_1,L_2$ があるとき、同型類が一致する理由を述べよ。またその同型写像まで一意と言えるか。

<!-- solution-start -->
**詳細解答。** 二つの同型を合成して $u:L_1^{\mathrm{an}}\to L_2^{\mathrm{an}}$ を得て逆射 $v$ も得る。[GAGA IIのHom同型](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で両射を $\widetilde u,\widetilde v$ に戻す。$uv=vu=1$ なのでHom比較の単射性で $\widetilde u\widetilde v=1_{L_2}$、$\widetilde v\widetilde u=1_{L_1}$。ゆえに $L_1\simeq L_2$。一方 $L_1=L_2=\mathcal O_X$ とすれば恒等射と非零定数倍の自己同型は異なるから、同型写像は一意ではない。
<!-- solution-end -->

<a id="ex-cag1-10-b03"></a>
#### CAG1-10-B03 トーラス上の滑らかな枠と正則な枠
- Level: B

$M=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で $(z+1,v)\sim(z,-v)$、$(z+i,v)\sim(z,v)$ と貼る線束を考える。$e^{\pi i\operatorname{Re}z}$ が滑らかな枠を与えることと、正則な枠が存在しないことをそれぞれ示せ。

<!-- solution-start -->
**詳細解答。** $f_{\mathrm{sm}}(z)=e^{\pi i\operatorname{Re}z}$ は零にならず、実部が $1$ 増えると $-1$ 倍、$i$ 増えると不変なので貼り合わせの条件を満たす。よって滑らかな線束として自明である。

正則枠が存在すれば、零にならない整関数 $f$ が

$$
f(z+1)=-f(z),\qquad f(z+i)=f(z)
$$

を満たすはずである。$|f|$ は格子周期的で、閉正方形 $\{x+iy:0\le x,y\le1\}$ 上の最大値が全平面の上界になる。[Liouvilleの定理](../../../解析系/CA/CA3/index.md#thm-ca3-liouville)で $f$ は定数となるが、反周期条件からその定数は零。非零枠の仮定に矛盾する。
<!-- solution-end -->

<a id="ex-cag1-10-b04"></a>
#### CAG1-10-B04 因子の次数と解析化を結ぶ
- Level: B

$\mathbb P^1_{\mathbb C}$ の $P_0=[1:0]$、$P_3=[1:3]$、$P_\infty=[0:1]$ に対し $D=2[P_3]-[P_0]+[P_\infty]$ とする。$D$ の次数と線形同値類を求め、解析化した線束のPicard類を答えよ。

<!-- solution-start -->
**詳細解答。** $\deg D=2-1+1=2$。[射影直線の主因子の計算](../../AG/AG2-07/index.md#thm-ag2-07-p1-picard)から $\operatorname{div}(z-3)=[P_3]-[P_\infty]$、$\operatorname{div}(z)=[P_0]-[P_\infty]$ なので

$$
\begin{aligned}
D&=2\operatorname{div}(z-3)-\operatorname{div}(z)
 +(2-1+1)[P_\infty]\\
 &=\operatorname{div}\bigl((z-3)^2/z\bigr)+2[P_\infty].
\end{aligned}
$$

従って $D\sim2[P_\infty]$。代数的に $\mathcal O(D)\simeq\mathcal O(2)$、[因子と解析化](#prop-cag1-10-divisor)により解析的には $\mathcal O(2)^{\mathrm{an}}$ で、Picard群 $\mathbb Z$ の元 $2$ となる。
<!-- solution-end -->

### Level C

<a id="ex-cag1-10-c01"></a>
#### CAG1-10-C01 GAGAの三本柱からPicard群へ
- Level: C

$X$ を射影 $\mathbb C$-スキームとする。以下を示せ。

1. 解析的可逆層を連接層として代数化しただけでは足りない理由を説明せよ。
2. その障害をどの局所事実で除くかを示せ。
3. 線束の同型類の一意性と群演算の保存を、GAGAのどの部分で示すか整理せよ。
4. $X=\mathbb A^1_{\mathbb C}$ へ同じ証明を持ち込めない理由を述べよ。ただし $\operatorname{Pic}(\mathbb A^1)=\operatorname{Pic}_{\mathrm{hol}}(\mathbb C)=0$ という事実自体は用いてよい。

<!-- solution-start -->
**詳細解答。**

1. [GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)が戻すのは一般の代数的連接層 $F$ であり、代数的Picard群の元にするには各点で $F_p\simeq\mathcal O_{X,p}$ が必要である。
2. 閉点で $A=\mathcal O_{X,p}$、$B=\mathcal O_{X^{\mathrm{an}},p}$ と置き、$F_p\otimes_A B\simeq B$ と[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)を用いる。剰余体で一次元を得て[Nakayamaの生成元判定](#lem-cag1-10-nakayama)により $A\twoheadrightarrow F_p$。平坦性で核のテンソルが零、忠実性で核が零となり $F_p\simeq A$。局所自由性の非成立集合は閉で、非空なら閉点を含むからすべての点で可逆となる。

3. 解析的同型の正射と逆射を[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で持ち上げ、合成が恒等射であることをHom写像の単射性で示す。テンソル積・双対は局所遷移関数の積・逆数となるので[群演算の命題](#prop-cag1-10-tensor)が適用できる。
4. アフィン直線は射影でないためGAGA II/IIIの仮定を満たさず、同じ証明はできない。提示された例ではPicard群自体は双方零だが、[大域関数の比較失敗](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)が示すように、Picard群の偶然の一致からGAGA全体の成立は導けない。
<!-- solution-end -->

<a id="ex-cag1-10-c02"></a>
#### CAG1-10-C02 指数完全列が忘れる情報
- Level: C

複素多様体 $M$ 上で、非空な有限重なりが可縮な良い被覆を選び、正則遷移 $g_{ij}$ を局所対数 $e^{2\pi i\ell_{ij}}=g_{ij}$ に持ち上げるとする。以下を示せ。

1. 三重重なりの整数値余輪を作れ。
2. $c_1(L)=0$ から正則自明性が一般には従わない理由を指数完全列で述べよ。
3. $M=\mathbb C/(\mathbb Z+i\mathbb Z)$ の $g$ を格子方向 $1$ で $-1$、$i$ で $1$ とした線束について、位相的自明性と正則非自明性を具体的に検証せよ。
4. $\mathbb{CP}^1$ 上の $\mathcal O(-1)^{\mathrm{an}}$ は正の線束か判定せよ。

<!-- solution-start -->
**詳細解答。**

1. [遷移関数の余輪条件](../../../幾何系/CM/CM2-06/index.md#def-cm2-06-transition-cocycle)から $g_{ij}g_{jk}=g_{ik}$ なので

$$
e^{2\pi i(\ell_{ij}+\ell_{jk}-\ell_{ik})}=1,
\qquad n_{ijk}=\ell_{ij}+\ell_{jk}-\ell_{ik}\in\mathbb Z.
$$

四重重なりで

$$
n_{jkl}-n_{ikl}+n_{ijl}-n_{ijk}=0
$$

となる。各 $n$ に $\ell$ の三項和を代入すると、すべての項が打ち消し合うためである。従ってこれは整数2-余輪であり、[第一Chern類の局所構成](../../../幾何系/KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)によって $c_1(L)$ を表す。

2. [指数完全列](#thm-cag1-10-exponential)の完全性は $\ker c_1=\operatorname{im}(H^1(M,\mathcal O_M)\to\operatorname{Pic}_{\mathrm{hol}}(M))$ と述べる。像に零以外のPicard類が残り得るので、$c_1(L)=0$ だけでは自明とは言えない。

3. $f_{\mathrm{sm}}(z)=e^{\pi i\operatorname{Re}z}$ は $f(z+1)=-f(z)$、$f(z+i)=f(z)$ の変換則を満たす滑らかな非零枠である。正則枠 $f$ を仮定すると、絶対値は両格子方向に周期的なので有界整関数になり、[Liouvilleの定理](../../../解析系/CA/CA3/index.md#thm-ca3-liouville)で定数。$f(z+1)=-f(z)$ より $f=0$ となり、非零枠に矛盾する。
4. $\int_{\mathbb{CP}^1}c_1(\mathcal O(-1))=-1$。正のChern曲率があれば曲線上の積分は正になるため、正の線束ではない。
<!-- solution-end -->

## まとめと次章への橋

射影的な $X$ では、GAGAの**対象の代数化・射の比較・局所可逆性の反映**を合わせて $\operatorname{Pic}(X)\simeq\operatorname{Pic}_{\mathrm{hol}}(X^{\mathrm{an}})$ を得た。$\mathbb P^1$ の $\mathcal O(d)$ とCartier因子は両側で同じ遷移関数を持つ。一方、指数完全列が与える第一Chern類は、正則線束の情報のすべてを記録するものではない。

次章 CAG1-11 では線束のうち特に**標準束**を取り上げ、余法完全列と随伴公式が代数的・解析的に同じ式になることを計算する。
