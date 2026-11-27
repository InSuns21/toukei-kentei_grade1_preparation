# ATOP29 普遍係数定理・ExtとTor

## 1. 係数を変えると何が変わるか

前講の[ホモロジー類への評価](../ATOP28/index.md#prop-atop28-evaluation)はコホモロジーから整数ホモロジー上の評価への写像を与えました。しかし、境界が2倍写像の複体では整数への評価を延長できず、評価の核に $\mathbb Z/2\mathbb Z$ が現れました。一方、鎖の係数を2を零とする群に変えると、2倍境界そのものが零になります。二つの現象を、評価の延長を測る群と係数変更後に現れる核を測る群で記述します。

群はすべてアーベル群、準同型は加法的とします。[整数加群とアーベル群の対応](../../../代数系/MOD/MOD1/index.md#prop-mod1-z-mod-abelian) により、群の構成の基礎環は $\mathbb Z$ です。「自由」は [自由加群と基底](../../../代数系/MOD/MOD1/index.md#def-mod1-free-module-basis) の意味で、基底の有限整数線形結合が一意に定まることを指します。非可換の自由群とは区別します。

以後、鎖複体 $C$ は非負次数の自由アーベル群からなるものとし、負次数を零とします。境界を $d_n:C_n\to C_{n-1}$ とし、$d_nd_{n+1}=0$ を仮定します。前講までの特異境界 $\partial_n$ に対応する一般の鎖複体の記号です。[特異ホモロジー群](../ATOP16/index.md#def-atop16-singular-homology) と同じ構成で、サイクル、境界、ホモロジーを

$$
Z_n=\ker d_n,\qquad B_n=\operatorname{im}d_{n+1},
\qquad H_n(C)=Z_n/B_n
$$

と書きます。$C$ が固定されているときは $H_n$ と略し、負次数のこれらの群は零です。特異鎖群は特異単体を基底とするので、この自由性の仮定を満たします。有限生成性は仮定しません。

## 2. 自由群の二つの短完全列

鎖の中にはサイクルと、境界を持つ鎖が混在します。この二者を分けるには、自由群の部分群が再び自由であることが重要です。[PID 上自由加群の部分加群は自由](../../../代数系/MOD/MOD2/index.md#thm-mod2-submodule-free)は有限階数で学びました。特異鎖群は無限階数になり得るため、次の拡張を用意します。

<a id="lem-atop29-subgroup-free"></a>

<!-- formal-statement-start -->
> **補題（任意階数の自由アーベル群の部分群）**
>
> 自由アーベル群 $F$ の任意の部分群 $N$ は自由アーベル群である。
<!-- formal-statement-end -->

有限階数の証明と同じく、一つの座標の像を整数の部分群として取り出します。無限階数でも各元の非零座標は有限個なので、最後の非零座標から処理できます。

<!-- proof-start -->
### 証明

選択公理により $F$ の基底を整列し、順序集合 $I$ で添字付けします。整列とは空でない任意の部分集合に最小元があることです。元 $x=\sum_{i\in I}x_ie_i$ の台は $x_i\ne0$ である添字の集合であり、自由加群の基底表示では有限です。

各 $i\in I$ に対して $F_{\le i}$ を $i$ 以下の基底元の張る部分群とし、$N_i=N\cap F_{\le i}$ とします。

$i$ 番目の係数を取る写像 $N_i\to\mathbb Z$ の像は部分群 $m_i\mathbb Z$（$m_i\ge0$）です。

$m_i>0$ の各 $i$ について、係数 $m_i$ を持つ $v_i\in N_i$ を選びます。

任意の非零元 $x\in N$ の有限台の最大添字を $j$ とすると、$j$ 番目の係数は $k m_j$ です。

そこで $x-kv_j$ を作ると $j$ 番目の係数が消え、それより大きい係数も零のままです。

この操作を繰り返すと最大添字は毎回真に小さくなります。整列集合には無限の真の降下列がない（降下列の値の集合の最小元より次の値が小さくなる）ため、有限回で零になります。従って $v_i$ たちは $N$ を生成します。

有限の非自明な一次結合が零だと仮定し、その非零係数の最大添字を $j$ とします。$j$ 番目の座標は $a_jm_j$ ですが、$a_j\ne0$ かつ $m_j>0$ なので零にはなりません。矛盾です。従って選んだ元は基底です。
<!-- proof-end -->

[任意階数の自由アーベル群の部分群](#lem-atop29-subgroup-free) により $Z_n,B_n$ は自由です。鎖から境界への全射と、サイクルからホモロジー類への全射を別々に並べると、次の二行の図式が得られます。どちらも [短完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-short-exact) です。$i$ は包含です。

$p=p_n$ は境界をその像に値を取る写像として見たもの、$q$ は商写像です。包含を区別するときは $B_n\hookrightarrow Z_n$ を $i_n$ と書きます。

$$
0\to Z_n\xrightarrow{i} C_n\xrightarrow{p}B_{n-1}\to0,
$$

$$
0\to B_n\xrightarrow{i}Z_n\xrightarrow{q}H_n\to0.
$$

第一行は右端が自由なので、基底の逆像を選ぶことで $p s_n=1$ となる準同型 $s_n:B_{n-1}\to C_n$ が存在します。実際、基底元 $b$ に対して $p(c_b)=b$ となる $c_b$ を選び、有限和に線形延長します。任意の $c$ は

$$
c=(c-s_np(c))+s_np(c)
$$

と一意に分解されます。第一項は $Z_n$ に入り、$s_n(B_{n-1})$ と $Z_n$ の共通部分は零です。従って $C_n\cong Z_n\oplus B_{n-1}$ です。

第二行は $H_n$ が自由でないこともあるので、一般には分裂しません。例えば $2\mathbb Z\subset\mathbb Z$ の商 $\mathbb Z/2\mathbb Z$ から $\mathbb Z$ への準同型はすべて零です。この第二行こそ、係数変更の情報を持つ自由分解です。ここで自由分解とは、自由アーベル群からなる完全列で最後に対象の群へ全射するものです。

自由加群は [射影対象](../../../基礎論系/CATB/CATB7-05/index.md#def-catb7-05-projective) なので、既習の [射影分解](../../../基礎論系/CATB/CATB7-05/index.md#def-catb7-05-projective-resolution) の特別な場合です。

## 3. 係数群を鎖に掛ける

整数鎖の各基底単体に $G$ の元を係数として割り当てたいとき、整数係数と群の元との積を形式的に扱う必要があります。対 $(a,g)$ に新しい記号 $a\otimes g$ を割り当て、例えば $2a\otimes g$ と $a\otimes 2g$ が一致するような関係を課します。

$a\otimes g$ は普通の数の積ではありません。

<a id="def-atop29-abelian-tensor"></a>

<!-- formal-statement-start -->
> **定義（アーベル群のテンソル積）**
>
> アーベル群 $A,G$ に対し、対 $(a,g)\in A\times G$ を基底元とする自由アーベル群を取る。次の関係式の左辺と右辺の差が生成する部分群で割った商を $A\otimes G$ とする。対の類を $a\otimes g$ と書く。
>
$$
(a+a')\otimes g=a\otimes g+a'\otimes g,
$$

$$
a\otimes(g+g')=a\otimes g+a\otimes g'.
$$

> ここで各関係式は左辺と右辺の差を零にすることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop29-abelian-tensor -->
**定義の確認**。$A=\mathbb Z$ のとき、対 $(k,g)$ に $kg$ を対応させます。整数倍は群の加法の反復とその逆元を意味します。二種類の関係式はそれぞれ

$$
(k+k')g-kg-k'g=0,\qquad k(g+g')-kg-kg'=0
$$

となります。[自由加群の普遍性](../../../代数系/MOD/MOD1/index.md#thm-mod1-free-universal-property) により基底上の対応は自由群上の準同型へ延長し、関係を生成する部分群を零にするので商上の準同型 $T(k\otimes g)=kg$ が定まります。

逆写像の候補 $S(g)=1\otimes g$ も第二の関係式から加法的です。第一の関係式を繰り返し、負整数の場合は加法逆元を使えば

$$
k\otimes g=k(1\otimes g)=1\otimes kg
$$

です。従って $TS(g)=g$、$ST(k\otimes g)=k\otimes g$ となり、生成元上の一致から両合成が恒等写像になります。
<!-- definition-example-end -->

一般に両変数で加法的な写像 $A\times G\to D$ は、生成元への値を指定して唯一の準同型 $A\otimes G\to D$ を誘導します。これが商による構成の利点です。

準同型 $f:A\to A'$ と $h:G\to G'$ に対しても、$a\otimes g\mapsto f(a)\otimes h(g)$ が関係を保つため、準同型 $f\otimes h$ が定まります。恒等写像と合成を保つことは生成元上で確認できます。

特に第二変数を固定する場合は $1_G=\operatorname{id}_G$ とし、$f\otimes1_G$（または $f\otimes1$）と略します。

自由群 $F=\bigoplus_{j\in J}\mathbb Z e_j$ については

$$
F\otimes G\cong\bigoplus_{j\in J}G
$$

です。具体的には $(\sum_j k_je_j)\otimes g\mapsto(k_jg)_j$ とし、逆は有限台の族 $(g_j)_j\mapsto\sum_j e_j\otimes g_j$ です。両変数の加法性と基底表示の一意性から良定義で、両合成が恒等です。同じ構成を二つの任意の群の直和にも適用でき、$(A\oplus D)\otimes G\cong(A\otimes G)\oplus(D\otimes G)$ となります。

<a id="prop-atop29-tensor-right-exact"></a>

<!-- formal-statement-start -->
> **命題（アーベル群のテンソル積の右完全性）**
>
> アーベル群の [完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-exact) $A\xrightarrow{u}D\xrightarrow{v}M\to0$ とアーベル群 $G$ に対して、次の列は完全である。
>
$$
A\otimes G\xrightarrow{u\otimes1}D\otimes G
\xrightarrow{v\otimes1}M\otimes G\to0.
$$
<!-- formal-statement-end -->

全射は保たれますが、単射は保たれるとは限りません。

<!-- proof-start -->
### 証明

$v$ は全射なので $m\otimes g$ の各生成元は $d\otimes g$ の像です。従って $v\otimes1$ は全射です。$vu=0$ から $(v\otimes1)(u\otimes1)=0$ となります。

$Q=(D\otimes G)/\operatorname{im}(u\otimes1)$ と置きます。$m\in M$ の逆像 $d\in D$ を選んで $(m,g)\mapsto[d\otimes g]\in Q$ と定めます。別の逆像との差は $\ker v=\operatorname{im}u$ の元なので、そのテンソルは $Q$ で零になります。和の逆像として逆像の和を選べるため、この写像は両変数で加法的です。

[アーベル群のテンソル積](#def-atop29-abelian-tensor)の構成から $M\otimes G\to Q$ が誘導されます。これは $Q\to M\otimes G$ と各生成元上で逆写像になります。従って $Q\cong M\otimes G$ であり、中央でも完全です。
<!-- proof-end -->

例えば $m$ 倍の単射 $\mathbb Z\to\mathbb Z$（整数 $m\ge2$）に $G=\mathbb Z/m\mathbb Z$ を掛けると、先ほどの同一視の下で零写像になります。単射を失う量を次の群で記録します。

<a id="def-atop29-tor"></a>

<!-- formal-statement-start -->
> **定義（Tor）**
>
> アーベル群 $M,G$ に対し、自由アーベル群 $F_1,F_0$ による完全列を選ぶ。
>
$$
0\to F_1\xrightarrow{u}F_0\to M\to0.
$$

> この分解を用いて、第一 Tor 群を
>
$$
\operatorname{Tor}_1^{\mathbb Z}(M,G)
=\ker(u\otimes1_G)
$$

> とする。次数0は $M\otimes G$、次数2以上は零である。
<!-- formal-statement-end -->

自由分解は常に存在します。$M$ の各元に基底元を対応させて作る自由群 $F_0$ から $M$ への全射の核は、[任意階数の自由アーベル群の部分群](#lem-atop29-subgroup-free)により自由だからです。ここで $F_1,F_0$ の添字は鎖の次数であり、既習の射影分解の余鎖記法ではそれぞれ $P^{-1},P^0$ に対応します。分解の選択に依存しないことは次の定理で証明します。

<!-- definition-example-start: def-atop29-tor -->
**定義の確認**。$M=\mathbb Z/6\mathbb Z$、$G=\mathbb Z/4\mathbb Z$ とします。$F_1=F_0=\mathbb Z$、$u=6$ とすると、6倍は整数上で単射であり、像 $6\mathbb Z$ は剰余射の核です。剰余射は全射なので、自由分解の全条件が成立します。

テンソル後は両端を [アーベル群のテンソル積](#def-atop29-abelian-tensor) の定義例により $G$ と同一視します。すると

$$
(u\otimes1)(1\otimes g)=6\otimes g=1\otimes6g
$$

なので、計算すべき写像は $G$ 上の6倍、すなわち2倍です。$0,1,2,3$ の像はそれぞれ $0,2,0,2$ です。核は $\{0,2\}\cong\mathbb Z/2\mathbb Z$ であり、像も $\{0,2\}$ なので余核も $\mathbb Z/2\mathbb Z$ です。
<!-- definition-example-end -->

<a id="thm-atop29-tor-independent"></a>

<!-- formal-statement-start -->
> **定理（Tor の分解独立性）**
>
> 任意のアーベル群 $M,G$ について、任意の自由分解で定義した Tor は分解の選択によらず標準的に同型となり、両変数で共変である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの自由分解を $F_1\xrightarrow{u}F_0\xrightarrow{q}M$ と $F'_1\xrightarrow{u'}F'_0\xrightarrow{q'}M'$ とし、$f:M\to M'$ を取ります。$F_0$ の基底の各像 $fq(e)$ を $q'$ に沿って持ち上げれば $a_0:F_0\to F'_0$ が得られ、$q'a_0=fq$ です。

$q'a_0u=fqu=0$ なので $a_0u$ は $\operatorname{im}u'=\ker q'$ に値を取ります。$u'$ の単射性から唯一の $a_1$ が存在し、$u'a_1=a_0u$ です。テンソル後にもこの等式が成り立つため、$a_1\otimes1$ は核から核への写像になります。

別の持上げ $b_0$ について $q'(a_0-b_0)=0$ なので、$a_0-b_0=u't$ となる $t:F_0\to F'_1$ が存在します。よって

$$
u'(a_1-b_1)=(a_0-b_0)u=u'tu.
$$

$u'$ は単射なので $a_1-b_1=tu$ です。従って $x\in\ker(u\otimes1)$ 上では

$$
((a_1-b_1)\otimes1)x=(t\otimes1)(u\otimes1)x=0.
$$

誘導写像は持上げによらず、合成の持上げとして持上げの合成を選べるので関手性も従います。特に $f=1_M$ の比較を両向きに行うと、合成は恒等写像を誘導するため同型です。第二変数の写像は $1\otimes h$ で誘導され、第一変数の写像と生成元上で可換します。
<!-- proof-end -->

一般の導来関手の言葉では、これは [左右導来関手](../../../基礎論系/CATB/CATB7-05/index.md#def-catb7-05-derived-functor) のうちテンソル積の左導来関手の第一次数です。整数上では自由分解が長さ1で済むため、高次は消えます。巡回群の場合、$m$ 倍写像の核を取れば

$$
\operatorname{Tor}_1^{\mathbb Z}(\mathbb Z/m\mathbb Z,G)=G[m],
\qquad G[m]=\{g\in G:mg=0\}.
$$

[アーベル群のテンソル積の右完全性](#prop-atop29-tensor-right-exact)により $(\mathbb Z/m\mathbb Z)\otimes G\cong G/mG$ も同時に得られます。

## 4. ホモロジーの普遍係数定理

鎖群を $C_n(G)=C_n\otimes G$、境界を $d_n\otimes1$ と置きます。合成が零なので鎖複体になり、そのホモロジーを $H_n(C;G)$ とします。境界の基底表示を $d_n(e_j)=\sum_k a_{kj}e'_k$ とすると、テンソル後は

$$
(d_n\otimes1)(e_j\otimes g)
=\sum_k e'_k\otimes(a_{kj}g)
$$

です。従って基底表示の同一視の下で、整数の境界行列をそのまま係数群に作用させています。無限階数でも各基底元の像は有限和です。

整数のサイクルを係数付きのサイクルに送れば $H_n\otimes G\to H_n(C;G)$ が作れます。しかし、テンソル後に新たに零になる境界もあり、これだけで全体を尽くすとは限りません。

<a id="thm-atop29-homology-uct"></a>

<!-- formal-statement-start -->
> **定理（ホモロジーの普遍係数定理）**
>
> 非負次数の自由アーベル群の鎖複体 $C$ とアーベル群 $G$ に対し、各 $n\ge0$ で次の短完全列が存在する。
>
$$
0\to H_n(C)\otimes G\to H_n(C;G)
\to\operatorname{Tor}_1^{\mathbb Z}(H_{n-1}(C),G)\to0.
$$

> この列は鎖写像と係数群の準同型に関して自然であり、群として分裂する。ただし分裂の選択は一般に自然ではない。
<!-- formal-statement-end -->

鍵は $C_n$ の二成分への分解です。第一成分では境界を割り、第二成分では係数を変えた後の包含の核を取ります。

<!-- proof-start -->
### 証明

第2節で構成した切断 $s_n$ を選び、$C_n=Z_n\oplus s_n(B_{n-1})$ を $Z_n\oplus B_{n-1}$ と同一視します。$d_n(z+s_n(b))=i_{n-1}(b)$ は $C_{n-1}$ の第一成分に入るので、テンソル後の境界は

$$
(d_n\otimes1)(x,y)=((i_{n-1}\otimes1)y,0)
$$

です。ここで $i_{n-1}:B_{n-1}\hookrightarrow Z_{n-1}$ です。従ってサイクルは

$$
(Z_n\otimes G)\oplus\ker(i_{n-1}\otimes1)
$$

であり、境界は $\operatorname{im}(i_n\otimes1)\oplus0$ です。商を取れば

$$
H_n(C;G)\cong
\frac{Z_n\otimes G}{\operatorname{im}(i_n\otimes1)}
\oplus\ker(i_{n-1}\otimes1).
$$

第一成分は [アーベル群のテンソル積の右完全性](#prop-atop29-tensor-right-exact) により $H_n(C)\otimes G$、第二成分は [Tor](#def-atop29-tor) の自由分解 $0\to B_{n-1}\to Z_{n-1}\to H_{n-1}\to0$ を使った計算そのものです。これで完全性と分裂を得ます。

自然な左の射は、$[z]\otimes g\mapsto[z\otimes g]$ です。$z$ を境界だけ変えると係数付きの境界だけ変わります。右の射はサイクル $w\in C_n\otimes G$ を $(p_n\otimes1)w$ に送ります。

境界は $p_n$ で零になり、サイクル条件によりこの値は $\ker(i_{n-1}\otimes1)$ に属します。

実際 $d_n$ は $p_n$、$i_{n-1}$、$Z_{n-1}\hookrightarrow C_{n-1}$ の合成であり、最後の包含は分裂単射だからテンソル後も単射です。

どちらの射も切断を用いず定義されます。鎖写像はサイクル、境界、商への写像を誘導し $p_n$ と可換するため、両射の自然性が従います。右端の分解間の写像は [Tor の分解独立性](#thm-atop29-tor-independent) の比較写像に一致します。係数の準同型に関してもテンソルの生成元上で可換します。$n=0$ では $B_{-1}=Z_{-1}=0$ なので右端は零です。
<!-- proof-end -->

## 5. コホモロジーの普遍係数定理

今度は [特異コチェイン](../ATOP28/index.md#def-atop28-cochain) と同じように、準同型全体の群 $C^n(G)=\operatorname{Hom}(C_n,G)$ を取ります。$\operatorname{Hom}$ の加法は写像の値ごとの和です。

[余境界](../ATOP28/index.md#def-atop28-coboundary) と同じく、$\delta^n:C^n(G)\to C^{n+1}(G)$ を $\delta^n\phi=\phi\circ d_{n+1}$ と定めます。合成記号を省略して $\phi d_{n+1}$ とも書きます。$\delta^{n+1}\delta^n=0$ なので、そのコホモロジーを $H^n(C;G)$ と書きます。

前講で整数への延長が失敗したときの「延長できなかった写像」は $B_{n-1}\to G$ でした。[Ext](../../../基礎論系/CATB/CATB7-05/index.md#def-catb7-05-ext) を自由分解 $0\to B_{n-1}\to Z_{n-1}\to H_{n-1}\to0$ で計算すると、射影分解の非正次数の記法では $P^{-1}=B_{n-1}$、$P^0=Z_{n-1}$、微分は包含 $i_{n-1}$ です。

Hom を取ると次数の向きが反転し、次数0から1への微分は $a\mapsto a\circ i_{n-1}$ になります。その次の群は零なので、次数1のコホモロジーとして

$$
\operatorname{Ext}_{\mathbb Z}^1(H_{n-1},G)
=
\frac{\operatorname{Hom}(B_{n-1},G)}
{\{a|_{B_{n-1}}:a\in\operatorname{Hom}(Z_{n-1},G)\}}
$$

が得られます。この商は「延長できなかった部分」を正確に記録しています。

<a id="thm-atop29-cohomology-uct"></a>

<!-- formal-statement-start -->
> **定理（コホモロジーの普遍係数定理）**
>
> 非負次数の自由アーベル群の鎖複体 $C$、アーベル群 $G$、$n\ge0$ に対し、次の短完全列が存在する。
>
$$
0\to\operatorname{Ext}_{\mathbb Z}^1(H_{n-1}(C),G)
\to H^n(C;G)
\to\operatorname{Hom}(H_n(C),G)\to0.
$$

> この列は鎖写像に反変、係数群の準同型に共変で自然である。群として分裂するが、分裂は一般に自然ではない。
<!-- formal-statement-end -->

こちらでは第一成分でサイクルへの評価を読み、第二成分で延長可能な評価を除きます。

<!-- proof-start -->
### 証明

再び $C_n\cong Z_n\oplus B_{n-1}$ を選びます。コチェイン $\phi$ は二つの準同型 $(\alpha,\beta)$ に対応し、$\alpha:Z_n\to G$、$\beta:B_{n-1}\to G$ です。

$C_{n+1}\cong Z_{n+1}\oplus B_n$ の元 $(z,b)$ に対し、境界は $C_n\cong Z_n\oplus B_{n-1}$ の $(i_nb,0)$ です。従って $\delta^n\phi(z,b)=\alpha(i_nb)$ となり、

$$
\delta^n(\alpha,\beta)=(0,\alpha i_n).
$$

従ってコサイクルの条件は $\alpha i_n=0$ のみで、$\beta$ は任意です。$\alpha$ は商 $H_n=Z_n/B_n$ を経由するため、第一成分は $\operatorname{Hom}(H_n,G)$ です。前次数からのコバウンダリは $(0,\gamma i_{n-1})$（$\gamma:Z_{n-1}\to G$）です。$n=0$ では前次数の群が零なので、この像も零です。

商を取ると

$$
H^n(C;G)\cong\operatorname{Hom}(H_n,G)
\oplus
\frac{\operatorname{Hom}(B_{n-1},G)}
{\{\gamma i_{n-1}\}}.
$$

第二成分は上で計算した Ext であり、完全性と分裂が得られます。

切断に依存しない右の射は [ホモロジー類への評価](../ATOP28/index.md#prop-atop28-evaluation) と同じ $[\phi]\mapsto([z]\mapsto\phi(z))$ です。左の射は $b:B_{n-1}\to G$ の Ext 類を $[b p_n]$ に送ります。$p_n d_{n+1}=0$ なのでコサイクルです。

$b$ が $\gamma i_{n-1}$ だけ変わったとき、$\gamma$ は $Z_{n-1}$ の直和補成分で零と定めて $C_{n-1}$ 上の $\eta$ へ延長できます。

差は

$$
\gamma i_{n-1}p_n=\eta d_n=\delta^{n-1}\eta
$$

なので良定義です。

逆に $b p_n=\eta d_n$ なら、$p_n$ の全射性から $b=\eta|_{B_{n-1}}$ です。$\eta|_{Z_{n-1}}$ がその延長なので Ext 類は零です。従って左の射は単射です。上の直和計算では二つの射は各成分の包含と射影なので完全です。

鎖写像 $f:C\to D$ は $p_n^D f_n=f_{B_{n-1}}p_n^C$ を満たし、サイクルへの制限とも可換します。従って前合成によるコチェイン写像は左の射と右の評価を可換にします。Ext の反変性は [Ext](../../../基礎論系/CATB/CATB7-05/index.md#def-catb7-05-ext) の分解比較と一致します。係数の写像との可換性は後合成から従います。$n=0$ では Ext 項は零です。
<!-- proof-end -->

### 分裂は自然でない

「自然」とは、鎖写像を先に作用させても分裂の写像を先に作用させても結果が一致することです。次の例では、どんな分裂を選んでもこの条件を満たせません。

$C_1=\mathbb Za\oplus\mathbb Zb$、$C_0=\mathbb Ze$、$d_1(a)=2e$、$d_1(b)=0$ とし、他の次数は零とします。$H_1=\mathbb Z[b]$、$H_0=\mathbb Z/2\mathbb Z$ です。鎖自己同型 $f_1(a)=a+b,\ f_1(b)=b,\ f_0(e)=e$ は $d_1f_1=f_0d_1$ を満たし、整数ホモロジー上は恒等です。

$G=\mathbb Z/2\mathbb Z$ では境界が零なので $H_1(C;G)=G^2$、左端は $b$ の張る群、右端は $a$ の係数を取る写像です。

実際 $p_1(a)=2e$ は $B_0$ の基底で、$p_1(b)=0$ です。係数変更後の $B_0\otimes G$ を $2e\otimes g\mapsto g$ と同一視すると、右の射はこの座標を取ります。

右端の1の逆像は $a$ または $a+b$ ですが、$f$ はこの二つを交換します。よって $f$ で固定される逆像がなく、自然な切断は存在しません。

コホモロジーでも $H^1(C;G)=G^2$ です。$\phi(a)=x,\ \phi(b)=y$ とすると、右端の評価は $y$ です。引戻しは

$$
f^*(x,y)=(x+y,y)
$$

なので、$y=1$ の二つの逆像を交換します。従ってこちらも自然に分裂しません。完全列そのものの自然性とは矛盾しません。

## 6. 実射影平面の係数を比較する

[実射影空間の胞体境界](../ATOP22/index.md#prop-atop22-projective-boundary) により、実射影平面 $\mathbb{RP}^2$ の整数胞体鎖複体は各次数 $0,1,2$ に $\mathbb Z$ を一つ持ち、境界は次の通りです。

$$
\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{0}\mathbb Z.
$$

[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) により整数特異ホモロジーは $H_2=0$、$H_1=\mathbb Z/2\mathbb Z$、$H_0=\mathbb Z$ です。係数を $G=\mathbb Z/2\mathbb Z$ に変えると、同じ胞体鎖の行列は $2=0$ のため二つとも零になります。

| 次数 | 整数鎖の境界 | 整数ホモロジー | mod 2 の境界 | mod 2 のホモロジー |
| --- | --- | --- | --- | --- |
| 2 | 2倍 | $0$ | 0 | $G$ |
| 1 | 0 | $\mathbb Z/2\mathbb Z$ | 0 | $G$ |
| 0 | 0 | $\mathbb Z$ | 0 | $G$ |

特異ホモロジーについても [ホモロジーの普遍係数定理](#thm-atop29-homology-uct) を整数特異鎖に適用できます。2次では $H_2\otimes G=0$ ですが、$\operatorname{Tor}_1(H_1,G)=G[2]=G$ なので $H_2(X;G)\cong G$ です。

1次では $H_1\otimes G=G/2G=G$、$\operatorname{Tor}_1(H_0,G)=0$ なので同じく $G$ です。0次は $\mathbb Z\otimes G=G$ です。従って胞体の計算と群として一致します。

整数コホモロジーについては [コホモロジーの普遍係数定理](#thm-atop29-cohomology-uct) と [巡回整数加群のExt](../../../基礎論系/CATB/CATB7-05/index.md#thm-catb7-05-cyclic-ext) により、

$$
H^0(X;\mathbb Z)=\mathbb Z,\quad H^1(X;\mathbb Z)=0,
\quad H^2(X;\mathbb Z)\cong\mathbb Z/2\mathbb Z.
$$

2次の群は $\operatorname{Ext}^1(H_1,\mathbb Z)=\mathbb Z/2\mathbb Z$ だけから来ます。$G$ 係数なら $H^0=G$、$H^1\cong\operatorname{Hom}(H_1,G)=G$、$H^2\cong\operatorname{Ext}^1(H_1,G)=G/2G=G$ です。いずれも反対側の項が零であることを使いました。3次以上は整数ホモロジーの当該次数と一つ前の次数がともに零なので、両普遍係数定理の両端が零になります。

## 7. 演習

<a id="ex-atop29-a1"></a>

### ATOP29-A1：テンソル積

- Level: A

$(\mathbb Z/6\mathbb Z)\otimes(\mathbb Z/9\mathbb Z)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[アーベル群のテンソル積の右完全性](#prop-atop29-tensor-right-exact) を $0\to\mathbb Z\xrightarrow{6}\mathbb Z\to\mathbb Z/6\mathbb Z\to0$ に適用する。$G=\mathbb Z/9\mathbb Z$ とすると $\mathbb Z\otimes G\cong G$ なので、求める群は $G/6G$。6倍の像は $\{0,6,3\}$ である。

3を法とする剰余射の核がこの群なので、商は $\mathbb Z/3\mathbb Z$ である。
<!-- solution-end -->

<a id="ex-atop29-a2"></a>

### ATOP29-A2：Tor の計算

- Level: A

$\operatorname{Tor}_1^{\mathbb Z}(\mathbb Z/6\mathbb Z,\mathbb Z/9\mathbb Z)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[Tor](#def-atop29-tor) の定義に [A1](#ex-atop29-a1) の6倍による自由分解を使うと、6倍写像の核を求めればよい。整数代表 $k$ に対し $9\mid6k$ は $3\mid2k$ と同値であり、さらに $3\mid k$ と同値である。核は $\{0,3,6\}$ で、3が生成元、位数は3である。

従って $\mathbb Z/3\mathbb Z$。
<!-- solution-end -->

<a id="ex-atop29-a3"></a>

### ATOP29-A3：Ext と Hom

- Level: A

$M=\mathbb Z/4\mathbb Z$、$G=\mathbb Z/6\mathbb Z$ に対して $\operatorname{Hom}(M,G)$ と $\operatorname{Ext}^1_{\mathbb Z}(M,G)$ を求めよ。

<!-- solution-start -->
**詳細解答**。準同型は剰余類 $[1]$ の像 $g$ で決まる。関係 $4[1]=0$ があるので $4g=0$ が必要であり、逆にこの条件なら $[k]\mapsto kg$ は代表元の差が4の倍数のとき同じ値を与える。従ってこの条件は十分でもある。

$6\mid4k$ は $3\mid k$ と同値なので $G[4]=\{0,3\}$ で、Hom は $\mathbb Z/2\mathbb Z$。

一方 [巡回整数加群のExt](../../../基礎論系/CATB/CATB7-05/index.md#thm-catb7-05-cyclic-ext) により Ext は $G/4G$。4倍の像は $\{0,4,2\}$ であり、偶数の類全体である。偶奇への剰余写像の核なので商は $\mathbb Z/2\mathbb Z$ になる。前者は核、後者は余核であり、同じ位数でも構成は異なる。
<!-- solution-end -->

<a id="ex-atop29-a4"></a>

### ATOP29-A4：自由分解の分裂

- Level: A

$C_1=\mathbb Z^2$、$C_0=\mathbb Z$、$d_1(x,y)=2x+3y$ とする。$Z_1,B_0$ と $p_1$ の切断を求めよ。

<!-- solution-start -->
**詳細解答**。$2x=-3y$ より $3\mid x$、$x=3t$ とすると $y=-2t$。従って $Z_1=\mathbb Z(3,-2)$。$d_1(-1,1)=1$ なので $d_1$ の像は整数全体、すなわち $B_0=\mathbb Z$。ここでは $p_1$ と $d_1$ は同じ終域を持つ。$s_1(k)=(-k,k)$ とすると $p_1s_1(k)=2(-k)+3k=k$。例えば一般の $(x,y)$ から $s_1(2x+3y)$ を引くと

$$
(x,y)-(-2x-3y,2x+3y)=(3x+3y,-2x-2y).
$$

これは $(x+y)(3,-2)$ であり、サイクルと切断像への分解が具体的に得られた。
<!-- solution-end -->

<a id="ex-atop29-b1"></a>

### ATOP29-B1：鎖行列と係数変更

- Level: B

$C_2=C_1=\mathbb Z$、$d_2=12$、その他の成分は零とする。$G=\mathbb Z/8\mathbb Z$ として $H_1(C;G),H_2(C;G),H^1(C;G),H^2(C;G)$ を直接計算し、二つの普遍係数定理と照合せよ。

<!-- solution-start -->
**詳細解答**。整数では $d_2$ が単射なので $H_2=0$、$H_1=\mathbb Z/12\mathbb Z$、$H_0=0$。$G$ 上で12倍は4倍、像は $\{0,4\}$、核は $\{0,2,4,6\}$。従って直接計算で

$$
H_1(C;G)=G/4G\cong\mathbb Z/4\mathbb Z,
\quad H_2(C;G)=G[4]\cong\mathbb Z/4\mathbb Z.
$$

$\operatorname{Hom}(\mathbb Z,G)$ を1の像で $G$ と同一視すると、$\delta^1\phi(1)=\phi(12)=12\phi(1)$。従って余境界 $\delta^1$ も12倍なので $H^1=G[4]$、$H^2=G/4G$ となる。

[ホモロジーの普遍係数定理](#thm-atop29-homology-uct) の1次は $H_1\otimes G=G/12G$ のみ、2次は $\operatorname{Tor}_1(H_1,G)=G[12]$ のみである。

[コホモロジーの普遍係数定理](#thm-atop29-cohomology-uct) の1次は $\operatorname{Hom}(H_1,G)=G[12]$ のみ、2次は [巡回整数加群のExt](../../../基礎論系/CATB/CATB7-05/index.md#thm-catb7-05-cyclic-ext) により $G/12G$ のみ。$12g=4g$ なので全て一致する。
<!-- solution-end -->

<a id="ex-atop29-b2"></a>

### ATOP29-B2：有限生成群の係数

- Level: B

整数ホモロジーが $H_2=\mathbb Z\oplus\mathbb Z/4\mathbb Z$、$H_1=\mathbb Z/6\mathbb Z$ である自由鎖複体について、$G=\mathbb Z/8\mathbb Z$ としたときの2次ホモロジーと2次コホモロジーを求めよ。

<!-- solution-start -->
**詳細解答**。[アーベル群のテンソル積](#def-atop29-abelian-tensor) の構成に従い、$(a,b)\otimes g$ を $(a\otimes g,b\otimes g)$ に送る。逆は各成分の包含に沿ってテンソルを足す写像である。従って

$$
H_2\otimes G\cong G\oplus G/4G.
$$

$4G=\{0,4\}$ なので後者は $\mathbb Z/4\mathbb Z$。$G[6]=\{0,4\}$（$8\mid6k$ は $4\mid k$ と同値）なので $\operatorname{Tor}_1(H_1,G)\cong\mathbb Z/2\mathbb Z$。[ホモロジーの普遍係数定理](#thm-atop29-homology-uct) の分裂により

$$
H_2(C;G)\cong\mathbb Z/8\mathbb Z\oplus
\mathbb Z/4\mathbb Z\oplus\mathbb Z/2\mathbb Z.
$$

Hom についても直和への評価を二つの制限に分けると $\operatorname{Hom}(H_2,G)=G\oplus G[4]$。$G[4]=\{0,2,4,6\}$ は位数4の巡回群。[巡回整数加群のExt](../../../基礎論系/CATB/CATB7-05/index.md#thm-catb7-05-cyclic-ext) より $\operatorname{Ext}^1(H_1,G)=G/6G$。$6G=\{0,2,4,6\}$ なので商は位数2。

[コホモロジーの普遍係数定理](#thm-atop29-cohomology-uct) の分裂から $H^2(C;G)$ も上と同じ抽象群を得る。ここで同じ抽象群になることは、自然な同型を選べることを意味しない。
<!-- solution-end -->

<a id="ex-atop29-b3"></a>

### ATOP29-B3：自由性の仮定

- Level: B

$C_1=\mathbb Z/2\mathbb Z$、$C_0=\mathbb Z/4\mathbb Z$、$d_1([1])=[2]$、その他は零とする。$G=\mathbb Z/2\mathbb Z$ でこの複体を検算し、さらに自由性を欠く場合にホモロジーの普遍係数定理の形が失敗する反例を構成せよ。

<!-- solution-start -->
**詳細解答**。$d_1$ は単射で、像は $\{0,2\}$ なので $H_1=0$、$H_0=\mathbb Z/2\mathbb Z$。テンソル後は両成分が $G$ である（[アーベル群のテンソル積の右完全性](#prop-atop29-tensor-right-exact) による巡回群の計算）。

境界は $[1]\otimes g\mapsto[2]\otimes g=[1]\otimes2g=0$ なので $H_1(C;G)=G$。1次では定理の形と一致し、2次も鎖群が零なので $H_2(C;G)=0$ となる。この例だけでは反例にならない。

具体的な失敗を得るため、別の複体

$$
C_2=\mathbb Z/2\mathbb Z,\qquad
C_1=\mathbb Z/4\mathbb Z,\qquad C_0=\mathbb Z/2\mathbb Z
$$

を考える。$d_2([1]_2)=[2]_4$、$d_1([1]_4)=[1]_2$ とし、残りの鎖群は零とする。添字の2,4は剰余の法である。

$d_1d_2=0$ であり、像と核は

$$
\operatorname{im}d_2=\{[0]_4,[2]_4\}=\ker d_1
$$

と一致する。$d_2$ は単射、$d_1$ は全射なので整数ホモロジーは全て零である。

テンソル後は全成分が $G$ となる。左の境界は先ほどの計算と同じく零写像である。一方、右の境界は生成元について

$$
(d_1\otimes1)([1]_4\otimes g)=[1]_2\otimes g
$$

となるので、両成分を $G$ と同一視すると恒等写像になる。係数変更後の複体は

$$
G\xrightarrow{0}G\xrightarrow{\operatorname{id}_G}G
$$

である。最高次の境界の核は $G$、一つ上の鎖群は零なので $H_2(C;G)=G$ となる。しかし整数ホモロジーは全次数で零だから、普遍係数定理の両端は零である。自由性を欠くため第2節の切断や自由分解が保証されない。最初の複体は自由性を落としても偶然一致する例であり、後者が反例である。
<!-- solution-end -->

<a id="ex-atop29-b4"></a>

### ATOP29-B4：異なる自由分解での比較

- Level: B

$M=\mathbb Z/6\mathbb Z$ とし、第一の分解を $u:\mathbb Z\to\mathbb Z,\ u(x)=6x$ とする。第二の分解を $u':\mathbb Z^2\to\mathbb Z^2,\ u'(x,y)=(6x,y)$、増大射を $q'(a,b)=[a]$ とする。両方が自由分解であることを確認し、$G=\mathbb Z/4\mathbb Z$ について比較写像が Tor の同型を誘導することを直接示せ。

<!-- solution-start -->
**詳細解答**。第一の増大射は整数の剰余射である。$6x=0$ なら $x=0$、像は $6\mathbb Z$ なので完全である。第二でも $u'(x,y)=0$ なら $6x=0,\ y=0$ より $x=y=0$。$q'$ は $[a]$ を $(a,0)$ から得るので全射で、その核は $6\mathbb Z\oplus\mathbb Z$、ちょうど $u'$ の像である。

第一の分解から第二へ各次数で $x\mapsto(x,0)$ を取ると $u'(x,0)=(6x,0)$ なので境界と可換する。逆向きに第一成分への射影を取ると、$u'$ の第一成分は $6x$ だからこちらも可換する。増大射との可換性も第一成分の剰余を取ることで従う。

[アーベル群のテンソル積](#def-atop29-abelian-tensor) の自由群での計算より、係数変更後の第一の境界は $x\mapsto2x$、第二は $(x,y)\mapsto(2x,y)$。第一の核は $\{0,2\}$、第二の核は $\{(0,0),(2,0)\}$。包含と射影はこれらの核の上で互いに逆写像である。[Tor の分解独立性](#thm-atop29-tor-independent) をこの例で具体的に確認できた。
<!-- solution-end -->

<a id="ex-atop29-c1"></a>

### ATOP29-C1：係数の自然性と分裂

- Level: C

$m\ge2$ とし、$C_1=\mathbb Za\oplus\mathbb Zb$、$C_0=\mathbb Ze$、$d_1(a)=me$、$d_1(b)=0$、他の次数は零とする。係数を $G=\mathbb Z/m\mathbb Z$ とする。整数ホモロジー上で恒等な鎖自己同型によって、二つの普遍係数定理の分裂が自然に選べないことを示せ。

<!-- solution-start -->
**詳細解答**。$C_1=\mathbb Za\oplus\mathbb Zb$、$d_1(a)=me,\ d_1(b)=0$ より整数の核は $\mathbb Zb$、像は $m\mathbb Ze$。従って $H_1=\mathbb Z[b]$、$H_0=\mathbb Z/m\mathbb Z$。$f_1(a)=a+b,\ f_1(b)=b$、$f_0(e)=e$ とすると $d_1 f_1(a)=me=f_0d_1(a)$、$b$ についても両辺零である。逆は $a\mapsto a-b$。整数ホモロジー上の作用は両次数で恒等。

$G$ 上で $m=0$ なので $H_1(C;G)=G^2$。

係数付きの基底を $a\otimes1,b\otimes1$ として、そのホモロジー類の座標を $(x,y)$ とすると、[ホモロジーの普遍係数定理](#thm-atop29-homology-uct) の右の射は $x$ を取る（$p_1(a)=me$ が $B_0$ の基底）。

$f_*(x,y)=(x,y+x)$ である。右端の1を持ち上げた元は $(1,y)$ で、固定されるなら $y+1=y$。$m\ge2$ なので矛盾。自然な切断があれば、右端で $f$ が恒等である以上、この元は固定されるはずだった。

一方、コチェインの座標を $(u,v)=(\phi(a),\phi(b))$ とすると、余境界は零、$H^1(C;G)=G^2$。[コホモロジーの普遍係数定理](#thm-atop29-cohomology-uct) の右の射は $v$ を取る評価である。

$f^*\phi(a)=u+v$、$f^*\phi(b)=v$ から $f^*(u,v)=(u+v,v)$。右端の1の逆像 $(u,1)$ が固定されるには $u+1=u$ が必要で、再び矛盾する。従って両方の短完全列は自然だが、分裂は自然に選べない。
<!-- solution-end -->

## 8. まとめ

整数ホモロジーを知れば、自由鎖複体の任意のアーベル係数群でのホモロジーとコホモロジーを二つの短完全列から計算できます。テンソル積と Hom は同じ次数、Tor と Ext は一つ前の次数から寄与します。Tor は係数変更後の核、Ext は評価の延長の障害を表します。次講では積空間の鎖複体を扱い、二つの空間のホモロジーを組み合わせる際に現れる Tor を追います。
