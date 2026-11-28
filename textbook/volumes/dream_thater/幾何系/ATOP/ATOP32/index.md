# ATOP32 環の計算：トーラス・射影空間

前講の[コホモロジー環](../ATOP31/index.md#def-atop31-cohomology-ring)には、加法群だけでは見えない積の情報があります。今回は円周を掛け合わせた空間と、球面の対蹠点を同一視した空間で、その情報を計算します。特に実射影空間では、標数2の係数で同じ1次の類を繰り返し掛けても零にならない現象を、具体的な特異鎖で確認します。

CM1-10 からは射影空間の同次座標と位相だけを使います。以下では $H_k(X)$ を整数係数の特異ホモロジー群とし、コホモロジーの係数は $H^k(X;R)$ のように明記します（空間と係数が直前に指定されている場合は省略します）。$H^*(X;R)$ は非負次数の群の直和です。積は [cup積](../ATOP31/index.md#def-atop31-cup) を表し、$\smile$ を省いて並べて書くこともあります。コサイクル $a$ の類は $[a]$ と書き、積が類の積を定めることは [コホモロジーへの降下](../ATOP31/index.md#thm-atop31-descend) によります。

## 1. トーラスの二方向から多方向へ

円周 $S^1$ を一つの0胞体と一つの1胞体で作ると、両端が同じ点なので境界は零です。[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison)により整数ホモロジーは0次と1次で整数群、それ以外は零です。[コホモロジーの普遍係数定理](../ATOP29/index.md#thm-atop29-cohomology-uct)では自由群に対する Ext 項が零なので、コホモロジーも同じ次数で整数群となります。1次の生成元 $u$ は、円周を一周する整数ホモロジーの生成元への評価が1となる類を選びます。

$T^m=(S^1)^m$ とし、第 $i$ 因子への射影を $p_i:T^m\to S^1$ とします。[コホモロジーの引戻し](../ATOP28/index.md#thm-atop28-pullback) による各方向の類を $x_i=p_i^*u$ とします。$T^2$ では、[Künneth公式](../ATOP30/index.md#thm-atop30-kunneth-cohomology) のテンソル積成分の階数は0、1、2次の順に $1,2,1$ で、円周の群が自由なので Tor 項は零です。二方向の積が2次の基底になるかが問題です。

次数1の文字を順序付きで掛け、同じ文字の平方を零、異なる文字の交換を符号反転とする代数を外積代数と呼び、$\Lambda_{\mathbb Z}$ で表します。この章では、空積を含む昇順の語を整数基底とし、積は連結して重複があれば零、なければ昇順に並べる交換回数だけ符号を反転する表示を用います。

<a id="thm-atop32-torus-ring"></a>

<!-- formal-statement-start -->
> **定理（トーラスの整数係数コホモロジー環）**
>
> 整数 $m\ge1$ に対し、$T^m=(S^1)^m$ とする。$u\in H^1(S^1;\mathbb Z)$ を一周する鎖への評価が1となる生成元とし、第 $i$ 因子への射影 $p_i$ による引戻しを $x_i=p_i^*u$ とする。このとき

$$
H^*(T^m;\mathbb Z)\cong
\Lambda_{\mathbb Z}(x_1,\ldots,x_m).
$$

> 右辺は次数1の生成元の平方を零とし、異なる生成元の交換で符号を反転する外積代数である。次数 $k$ の整数基底は $i_1<\cdots<i_k$ に対する積

$$
x_{i_1}\cdots x_{i_k}
$$

> であり、空積は単位元である。
<!-- formal-statement-end -->

証明の鍵は、各因子で基底を選んでから積空間へ移すことです。積空間の基底を与える外積と、同一空間内の cup 積がここでは一致します。

<!-- proof-start -->
### 証明

円周については $H^0=\mathbb Z1$、$H^1=\mathbb Zu$、$H^2=0$ なので $u^2=0$ です。[cup積の自然性](../ATOP31/index.md#thm-atop31-naturality)から

$$
x_i^2=p_i^*(u^2)=0.
$$

また [cup積の次数付き可換性](../ATOP31/index.md#thm-atop31-graded-commutativity)から $x_jx_i=-x_ix_j$ です。これらの関係により任意の語を添字の昇順へ並べ替えられ、同一添字が二度現れれば零になります。

残るのは、この昇順の積に余計な線形関係がないことです。$m=1$ では既に確認しました。$T^{m-1}$ で結論が成り立つと仮定し、$X=T^{m-1}$、$Y=S^1$ と置きます。両空間の整数ホモロジーは有限生成であり、円周のホモロジーは自由です。帰納的に [ホモロジーのKünneth公式](../ATOP30/index.md#thm-atop30-kunneth-homology)でも各次数の有限生成性が保たれます。

円周のコホモロジーは自由なので [有限型コホモロジーのKünneth公式](../ATOP30/index.md#thm-atop30-kunneth-cohomology)の Tor 項は零です。従って次数 $k$ で外積が

$$
(H^k(X)\otimes\mathbb Z1)
\oplus(H^{k-1}(X)\otimes\mathbb Zu)
\longrightarrow H^k(X\times Y)
$$

という同型を与えます。

ここで $a,b$ をそれぞれ $X,Y$ のコサイクル、次数を $p,q$ とします。$p_X,p_Y$ は二つの因子への射影です。積空間の特異 $(p+q)$ 単体 $\sigma$ を評価すると、[Alexander–Whitney写像](../ATOP30/index.md#def-atop30-aw) による外積の値は次の式です。$\sigma[i,\ldots,j]$ は指定した頂点の順序で取った面への制限を表します。

$$
a((p_X\circ\sigma)[0,\ldots,p])\,
b((p_Y\circ\sigma)[p,\ldots,p+q]).
$$

これは [cup積](../ATOP31/index.md#def-atop31-cup) による $(p_X^*a)\smile(p_Y^*b)$ の値そのものです。したがって第一の直和成分の基底は末尾に $x_m$ を含まない昇順積へ、第二の成分の基底は末尾に $x_m$ を含む昇順積へ写ります。同型の像なので両者を合わせたものは基底です。

外積代数からの写像は上の平方と交換の関係により定まります。実際、二つの昇順の語の積は、重複添字があれば零、なければ交換回数だけ符号を反転した昇順の語です。これはコホモロジー環の積でも同じです。各次数で整数基底が整数基底へ移るので単射かつ全射です。
<!-- proof-end -->

$T^2$ では $x=x_1,y=x_2$ とすると、$1,x,y,xy$ が全体の整数基底です。例えば

$$
(2x+3y)(4x-y)=-2xy+12yx=-14xy.
$$

一般に係数 $a,b,c,d\in\mathbb Z$ を取ると、[上の環の計算](#thm-atop32-torus-ring) から

$$
(ax+by)(cx+dy)=acx^2+adxy+bcyx+bdy^2
$$

$$
=(ad-bc)xy
$$

となります。したがって係数は、二つの1次類の基底 $(x,y)$ に関する係数を行に並べた2行2列の行列式 $ad-bc$ です。行列式が零なら積も零、逆に積が零なら $xy$ が整数基底なので行列式も零です。

## 2. 実射影空間：加法群から積へ

整数 $n\ge0$ に対し、$\mathbb{RP}^n$ は $\mathbb R^{n+1}$ の原点を通る直線の空間で、単位球面 $S^n$ 上の $v$ と $-v$ を同一視した商として表します。係数はここから $F=\mathbb F_2=\mathbb Z/2\mathbb Z$ とします。$F$ では $-1=1$ なので整数係数で交代する符号は同じ値になります。ただし球面上のベクトルを反転する実数の符号 $-1$ は、係数体の $-1$ とは区別します。

[実射影空間の胞体境界](../ATOP22/index.md#prop-atop22-projective-boundary) によれば、0次から $n$ 次まで各次数に一つの胞体があり、整数胞体鎖群は各次数で $\mathbb Z$ です。$d_k$ は $k$ が正の偶数なら2倍、奇数なら零です。[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) の商 $\ker d_k/\operatorname{im}d_{k+1}$ を計算します。

$0<k<n$ が奇数なら核は $\mathbb Z$、次の境界の像は $2\mathbb Z$ なので $H_k=\mathbb Z/2\mathbb Z$ です。偶数なら2倍写像の核は零で、次の境界も零なので $H_k=0$ です。最高次数 $n>0$ では次の胞体がないので像が零となり、奇数なら $\mathbb Z$、偶数なら零です。0次では $d_0=0$、$d_1=0$（または始域が零）なので $H_0=\mathbb Z$ です。

特異鎖群は整数上自由なので、[コホモロジーの普遍係数定理](../ATOP29/index.md#thm-atop29-cohomology-uct) に $G=F$ を代入できます。$\operatorname{Hom}$ はアーベル群の準同型群、$\operatorname{Ext}^1_{\mathbb Z}$ は [Ext](../../../基礎論系/CATB/CATB7-05/index.md#def-catb7-05-ext) の次数1です。次数 $k$ で使う列は

$$
0\to\operatorname{Ext}^1_{\mathbb Z}(H_{k-1},F)
\to H^k(\mathbb{RP}^n;F)
\to\operatorname{Hom}(H_k,F)\to0.
$$

です。$H_{-1}=0$ とします。Hom 項では

$$
\operatorname{Hom}(\mathbb Z,F)=F,\qquad
\operatorname{Hom}(\mathbb Z/2,F)=F.
$$

後者は生成元の像 $a$ が $2a=0$ を満たせばよいからです。自由分解

$$
0\to\mathbb Z\xrightarrow{2}\mathbb Z\to\mathbb Z/2\to0
$$

に $\operatorname{Hom}(-,F)$ を適用すると、次数0から1への写像は $g\mapsto g\circ 2$、すなわち生成元の値を2倍する写像です。$F$ ではこれは零になります。したがって $\operatorname{Ext}^1_{\mathbb Z}(\mathbb Z/2,F)$ はその余核 $F/0=F$ です。自由群と零群に対する Ext は零です。

よって $1\le k\le n$ の奇数次数は Hom 項だけ、正の偶数次数は Ext 項だけが $F$ となります。$k=0$ では Hom 項だけが $F$、$k=n+1$ では $H_n$ が自由または零なので Ext 項も零です。

$$
H^k(\mathbb{RP}^n;F)\cong
\begin{cases}
F&0\le k\le n,\\
0&k>n.
\end{cases}
$$

$n=0$ は一点なのでこの式に含まれます。ただし、各次数が1次元だというだけでは、1次の生成元の平方が2次の生成元かどうかは決まりません。

## 3. 対蹠点の持上げで1次の評価を作る

$n\ge1$ とします。商写像 $q:S^n\to\mathbb{RP}^n$ の各点の逆像は二点です。小さな球面開近傍 $U$ を $U\cap(-U)=\varnothing$ となるように取ると、

$$
q^{-1}(q(U))=U\sqcup(-U)
$$

となります。特に $q(U)$ は商位相の条件から開です。

任意の開集合 $W\subset U$ についても、

$$
q^{-1}(q(W))=W\cup(-W)
$$

は球面で開です。従って $q(W)$ は開になります。$-U$ についても同じ計算が成り立ちます。

各制限は連続全単射で、上の開集合の確認によりその逆も連続です。従ってこれは [被覆写像](../ATOP5/index.md#def-atop5-covering-map) です。

各射影点 $z$ について、その逆像（ファイバー）$q^{-1}(\{z\})$ の二つの代表の片方 $s(z)$ を選びます。例えば最初の非零座標が正の単位ベクトルを選びます。この選択は連続でなくて構いません。

[特異1単体](../ATOP16/index.md#def-atop16-singular-simplex) $\gamma$ を区間 $[0,1]$ 上の道と見なし、$s(\gamma(0))$ から [道の持上げ](../ATOP5/index.md#thm-atop5-path-lifting) で持ち上げます。終点が $s(\gamma(1))$ なら値0、$-s(\gamma(1))$ なら値1を割り当てます。これは [特異コチェイン](../ATOP28/index.md#def-atop28-cochain) の基底上の値を指定したものです。整数鎖に線形に延長した $F$ 値の1コチェインを $a$ とします。値は整数係数を2で割った余りにしか依存しないので、$F$ 係数の鎖にも $F$ 線形に評価できます。以後 $a(\gamma)$ を実数の符号 $(-1)^{a(\gamma)}$ の指数に使うときは、その元の代表である整数0または1を取ります。

<a id="prop-atop32-antipodal-cocycle"></a>

<!-- formal-statement-start -->
> **命題（対蹠被覆の1コサイクル）**
>
> $n\ge1$、$F=\mathbb Z/2\mathbb Z$ とし、対蹠被覆 $q:S^n\to\mathbb{RP}^n$ の各ファイバーから代表 $s(z)$ を一つずつ選ぶ。道 $\gamma:[0,1]\to\mathbb{RP}^n$ を $s(\gamma(0))$ から持ち上げ、その終点が $s(\gamma(1))$ なら0、$-s(\gamma(1))$ なら1を与える $F$ 値の1コチェイン $a$ はコサイクルである。そのコホモロジー類は代表の選択によらない。
<!-- formal-statement-end -->

三角形の二辺を続けて通る場合と、残りの一辺を通る場合を比べます。符号差は足し算されるため、三辺の値の和が零になります。

<!-- proof-start -->
### 証明

特異2単体 $\sigma:\Delta^2\to\mathbb{RP}^n$ の頂点を $0,1,2$ と番号付けし、$\sigma(i)$ は第 $i$ 頂点の像、$a_{ij}=a(\sigma[i,j])$ は第 $i$ 頂点から第 $j$ 頂点へ向かう辺の値とします。0から1への持上げの終点は

$$
(-1)^{a_{01}}s(\sigma(1))
$$

です。1から2への持上げをこの点から始めれば、$q(v)=q(-v)$ と [持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) により、代表から始めた持上げに $(-1)^{a_{01}}$ を掛けた道になります。従って合成道の終点は

$$
(-1)^{a_{01}}(-1)^{a_{12}}s(\sigma(2))
=(-1)^{a_{01}+a_{12}}s(\sigma(2))
$$

です。指数の和は2を法として計算しても符号は変わりません。

三角形の中では二辺の道と直接の辺は端点固定でホモトピックです。実際、二つの道を同じ区間で媒介変数表示し、標準三角形内の線分補間を $\sigma$ と合成すればよいからです。[持上げの端点不変性](../ATOP5/index.md#cor-atop5-endpoint-invariance)により $a_{02}=a_{01}+a_{12}$ です。従って [特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary)で

$$
(\delta a)(\sigma)=a_{12}+a_{02}+a_{01}=0.
$$

全ての基底2単体で零なので $\delta a=0$ です。

別の代表を $s'(z)=(-1)^{f(z)}s(z)$ と書くと、$f$ は $F$ 値の0コチェインです。新しい始点からの持上げは元の持上げに $(-1)^{f(\gamma(0))}$ を掛けた道になります。終点を新しい代表と比較すると

$$
a'(\gamma)=a(\gamma)+f(\gamma(0))+f(\gamma(1)).
$$

右辺の最後の二項は [特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary) の定義による $(\delta f)(\gamma)=f(\gamma(1))-f(\gamma(0))$ と等しいです（$F$ では減算と加算が一致します）。従って $a'-a=\delta f$ となり、[特異コホモロジー群](../ATOP28/index.md#def-atop28-cohomology) の同じ類を表します。
<!-- proof-end -->

例えば $0\le t\le1$ で

$$
\gamma(t)=q(\cos(\pi t),\sin(\pi t),0,\ldots,0)
$$

とすると両端の像が同じなのでループです。球面上の道は始点 $e_0=(1,0,\ldots,0)$ から $-e_0$ へ至ります。代表が $-e_0$ なら道全体を反転して持ち上げるため、いずれの場合も終点は選んだ代表の反対側であり $a(\gamma)=1$ です。[特異境界](../ATOP16/index.md#def-atop16-singular-boundary) では $\partial\gamma=\gamma(1)-\gamma(0)=0$ なので、もし $a=\delta f$ なら評価は $f(\partial\gamma)=0$ となります。従って $[a]\ne0$ です。

## 4. cup冪を具体的なサイクルで評価する

$1\le k\le n$ とします。最初の $k+1$ 座標だけを使った $\mathbb{RP}^k$ を $\mathbb{RP}^n$ に含めます。$e_0,\ldots,e_k$ を座標単位ベクトルとし、代表の選択を $s(q(e_i))=e_i$ とします。

球面上の各座標の符号を固定すると、一つの球面単体が得られます。[特異単体](../ATOP16/index.md#def-atop16-singular-simplex) の定義域である標準 $k$ 単体の座標を $t_i\ge0$、$\sum_{i=0}^k t_i=1$ とします。符号列 $\epsilon=(\epsilon_0,\ldots,\epsilon_k)$ の各成分は実数の $\pm1$ とし、特異単体を

$$
\sigma_\epsilon(t)=q\left(
\frac{\sum_{i=0}^k t_i\epsilon_i e_i}
{\|\sum_{i=0}^k t_i\epsilon_i e_i\|}
\right)
$$

と置きます。分母の二乗は $\sum t_i^2>0$ なので連続です。符号列全体を反転すると同じ特異単体になります。そこで $\epsilon_0=1$ のものだけを足します。

$$
z_k=\sum_{\epsilon_0=1,\ \epsilon_i=\pm1}\sigma_\epsilon
\in C_k(\mathbb{RP}^n;F).
$$

例えば $k=2$ では符号列は $(+++),(++-),(+-+),(+--)$ の4個です。辺 $[i,i+1]$ に制限すると、球面上では $\epsilon_i e_i$ から $\epsilon_{i+1}e_{i+1}$ に向かう道になります。代表 $e_i$ から始めるには全体に $\epsilon_i$ を掛け、終点は $\epsilon_i\epsilon_{i+1}e_{i+1}$ です。[対蹠被覆の1コサイクル](#prop-atop32-antipodal-cocycle) の定義により、両端の符号が異なる場合の辺の値は1、同じなら0です。この4個のうち連続する二辺がともに1なのは $(+-+)$ だけです。

$a^k$ はコチェイン $a$ の $k$ 個の cup 積、$x^k$ は類 $x=[a]$ の $k$ 個の cup 積を表します。[結合律と単位元](../ATOP31/index.md#thm-atop31-assoc-unit) により括弧は不要で、0乗は単位元です。

<a id="thm-atop32-projective-ring"></a>

<!-- formal-statement-start -->
> **定理（実射影空間の mod 2 コホモロジー環）**
>
> 任意の整数 $n\ge1$ に対し、$F=\mathbb Z/2\mathbb Z$、$x=[a]\in H^1(\mathbb{RP}^n;F)$ を対蹠被覆の1コサイクル $a$ の類とする。このとき

$$
H^*(\mathbb{RP}^n;F)\cong F[x]/(x^{n+1}),
\qquad \deg x=1.
$$

> 右辺は多項式環を $x^{n+1}$ が生成するイデアルで割った商であり、$x^k$ は $0\le k\le n$ の各次数の非零生成元である。$n=0$ の環は $F$ である。
<!-- formal-statement-end -->

各次元で対角写像の前面と後面を繰り返し取った成分に、1次のコサイクルを掛けます。先ほどの符号列の観察が任意の $k$ で成立することが、冪を決める核心です。

<!-- proof-start -->
### 証明

まず $z_k$ がサイクルであることを確かめます。[特異境界](../ATOP16/index.md#def-atop16-singular-boundary) に従い、頂点 $j$ を除く面への制限を $\sigma_\epsilon[\widehat j]$ と書くと、係数 $F$ では交代符号がすべて1になるため

$$
\partial z_k=\sum_{j=0}^k\sum_{\epsilon_0=1}\sigma_\epsilon[\widehat j].
$$

頂点 $j>0$ を除く面では $t_j=0$ なので、$\epsilon_j$ だけを反転した二つの符号列は分子も分母も等しく、同じ面を与えます。この反転は $\epsilon_0=1$ を保ち固定点がないので、面は二つずつ打ち消されます。

頂点0を除く面では、$\epsilon_1,\ldots,\epsilon_k$ を全て反転した列を対応させます。残るベクトルが全体で負になるので、商写像 $q$ の後では同じ面です。$k\ge1$ だからこの対応にも固定点がありません。全ての境界項が二つずつ現れ、$F$ では $1+1=0$ なので $\partial z_k=0$ です。

次に $\sigma_\epsilon[i,i+1]$ の球面上での表示は、$\epsilon_i e_i$ から $\epsilon_{i+1} e_{i+1}$ へ向かう正規化線分です。始点を選んだ代表 $e_i$ に合わせるには道全体に $\epsilon_i$ を掛ければよく、終点は $\epsilon_i\epsilon_{i+1}e_{i+1}$ になります。従って

$$
a(\sigma_\epsilon[i,i+1])=
\begin{cases}
1&\epsilon_i\ne\epsilon_{i+1},\\
0&\epsilon_i=\epsilon_{i+1}.
\end{cases}
$$

[cup積](../ATOP31/index.md#def-atop31-cup)を $k$ 回の因子に展開します。$k=1$ では辺の評価そのものです。$k-1$ 因子の式を前面 $[0,\ldots,k-1]$ に適用し、最後の辺の評価を掛けると

$$
a^k(\sigma_\epsilon)
=\prod_{i=0}^{k-1}a(\sigma_\epsilon[i,i+1]).
$$

積が1になるには全ての隣接符号が異なる必要があります。$\epsilon_0=1$ なので条件を満たす列は $\epsilon_i=(-1)^i$ のただ一つです。従って

$$
a^k(z_k)=1.
$$

[cup積のLeibniz則](../ATOP31/index.md#thm-atop31-leibniz) と [対蹠被覆の1コサイクル](#prop-atop32-antipodal-cocycle) の $\delta a=0$ を使います。帰納的に $\delta(a^{k-1})=0$ とすれば

$$
\delta(a^{k-1}\smile a)
=\delta(a^{k-1})\smile a+(-1)^{k-1}a^{k-1}\smile\delta a=0.
$$

従って各 $a^k$ はコサイクルです。仮に $a^k=\delta b$ なら [余境界作用素](../ATOP28/index.md#def-atop28-coboundary) により

$$
1=a^k(z_k)=(\delta b)(z_k)=b(\partial z_k)=0
$$

となり矛盾します。[コホモロジーへの降下](../ATOP31/index.md#thm-atop31-descend) から $x^k=[a^k]\ne0$ です。

第2節の加法群計算で各次数は1次元と分かっているので、$1,x,\ldots,x^n$ はそれぞれの次数の基底です。$H^{n+1}=0$ から $x^{n+1}=0$ です。多項式を $x$ に代入する環準同型はこの関係で商を経由し、商の基底 $1,x,\ldots,x^n$ を各次数の基底へ送るため同型です。
<!-- proof-end -->

この計算は対角写像を [Alexander–Whitney写像](../ATOP30/index.md#def-atop30-aw) で鎖に移し、座標符号で分割した射影部分空間の特異サイクル $z_k$ 上で評価したものです。例えば $0<p<k$ なら、対角成分は各単体の前面 $[0,\ldots,p]$ と後面 $[p,\ldots,k]$ のテンソルです。$a^p\otimes a^{k-p}$ で評価すると全ての隣接辺を一度ずつ掛けるため、総和は1です。これは積の情報であり、胞体境界が零になるという加法的な情報とは別です。

包含 $j:\mathbb{RP}^k\hookrightarrow\mathbb{RP}^n$（$1\le k\le n$）で同じ代表選択を使うと、道の持上げは座標部分球面で行えます。[持上げの一意性](../ATOP5/index.md#lem-atop5-lift-uniqueness) により符号差は一致するので $j^*x_n=x_k$ です。従って [cup積の自然性](../ATOP31/index.md#thm-atop31-naturality) から $j^*(x_n^r)=x_k^r$ です（整数 $r\ge0$、$r>k$ なら零）。次講ではこの非零性が写像の存在を制限します。

## 5. 複素射影空間の加法群

[複素射影空間と同次座標](../../CM/CM1-10/index.md#def-cm1-10-projective-space)では、実数の直線の代わりに $\mathbb C^{n+1}$ の複素1次元部分空間を考えます。非零ベクトル $z$ の張る直線を $[z_0:\cdots:z_n]$ と表し、非零複素数倍を同一視します。$n=0$ も同じ商の構成で一点になります。

$n\ge1$ では最後の座標が零の部分は $\mathbb{CP}^{n-1}$ です。零でない部分では最後の座標で割ると $[w_0:\cdots:w_{n-1}:1]$ と一意に書けます。[射影空間の標準正則アトラス](../../CM/CM1-10/index.md#thm-cm1-10-projective-atlas) の最後のチャートがこの部分を $\mathbb C^n$ へ同相に送ります。ここでは正則性は使いません。この開部分が実 $2n$ 次元の胞体になることを、閉円板からの付着写像で示します。

<a id="prop-atop32-complex-projective-groups"></a>

<!-- formal-statement-start -->
> **命題（複素射影空間の整数係数コホモロジー群）**
>
> 整数 $n\ge0$ に対し、$\mathbb{CP}^n$ は次数 $0,2,\ldots,2n$ に一つずつ胞体を持つ。整数係数コホモロジー群は

$$
H^k(\mathbb{CP}^n;\mathbb Z)\cong
\begin{cases}
\mathbb Z& k=2j,\ 0\le j\le n,\\
0&\text{それ以外の非負次数}
\end{cases}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n=0$ は一点です。以下 $n\ge1$ とし、$\mathbb{CP}^{n-1}$ が指定された胞体構造を持つと仮定します。実 $2n$ 次元の閉単位円板 $D^{2n}=\{z\in\mathbb C^n:\|z\|\le1\}$ から

$$
\Phi(z)=[z:\sqrt{1-\|z\|^2}]
$$

を作ります。境界では $\|z\|=1$ なので最後の座標が零でも $z\ne0$ であり、内部では最後の座標が正です。したがって全域で同次座標は定義され、商写像との合成なので連続です。境界は $\mathbb{CP}^{n-1}$ に写ります。内部では最後の座標で割って

$$
w=\frac{z}{\sqrt{1-\|z\|^2}}
$$

となります。任意の $w\in\mathbb C^n$ に対して $z=w/\sqrt{1+\|w\|^2}$ と置くと

$$
\|z\|^2=\frac{\|w\|^2}{1+\|w\|^2}<1,
\qquad
1-\|z\|^2=\frac{1}{1+\|w\|^2}.
$$

従って元の $w$ を返します。逆向きにも $\|w\|^2=\|z\|^2/(1-\|z\|^2)$ を代入すれば $w/\sqrt{1+\|w\|^2}=z$ となります。両写像は分母が正の範囲で連続なので、円板の内部は開部分へ同相です。

古い空間と円板をこの境界写像で貼った商から $\mathbb{CP}^n$ への写像は連続です。古い空間には恒等写像、円板の内部には今示した同相を用い、境界上の点はちょうど付着先と同一視するので全単射です。古い空間は帰納的にコンパクト（$n=1$ の場合は一点）、閉円板もコンパクトなので、それらの有限直和の商もコンパクトです。像の $\mathbb{CP}^n$ は [複素射影空間の位相的性質](../../CM/CM1-10/index.md#thm-cm1-10-projective-topology) により Hausdorff です。コンパクトな定義域の閉集合はコンパクトで、その像は Hausdorff 空間のコンパクト部分集合なので閉です。従って連続全単射の逆も連続となり、同相です。

帰納的に [有限 CW 複体](../ATOP22/index.md#def-atop22-cw) の構成条件を満たします。胞体鎖群は偶数次数 $0,2,\ldots,2n$ で $\mathbb Z$、他は零です。境界の始域か終域の少なくとも一方が零なので境界は全て零です。[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) でホモロジー群は同じ形になります。全て自由群なので [コホモロジーの普遍係数定理](../ATOP29/index.md#thm-atop29-cohomology-uct) の Ext 項は零で、Hom 項が上の群を与えます。
<!-- proof-end -->

例えば $\mathbb{CP}^2$ の非零群は0,2,4次の三つです。2次の生成元を $u$ としても、群の計算だけでは $u^2$ が4次の生成元の何倍かは決まりません。複素超平面の交叉を用いる環の計算は後の双対性の学習で扱います。

## 6. 演習

<a id="ex-atop32-a1"></a>
### A1. トーラスの積
- Level: A

$T^2$ の標準生成元を $x,y$ とする。$(3x-2y)(x+4y)$ と $(x+y)^2$ を求めよ。

<!-- solution-start -->
**詳細解答**

[トーラスの整数係数コホモロジー環](#thm-atop32-torus-ring) より $x^2=y^2=0$、$yx=-xy$ です。双線形性で展開すると

$$
(3x-2y)(x+4y)=3x^2+12xy-2yx-8y^2=14xy.
$$

また二乗は

$$
(x+y)^2=x^2+xy+yx+y^2=0
$$

です。
<!-- solution-end -->

<a id="ex-atop32-a2"></a>
### A2. 実射影空間の加法群と積
- Level: A

$\mathbb{RP}^3$ の mod 2 コホモロジーで $x^2x$、$x^2x^2$、$(1+x)(1+x+x^2+x^3)$ を計算せよ。

<!-- solution-start -->
**詳細解答**

[実射影空間の mod 2 コホモロジー環](#thm-atop32-projective-ring) より $x^3\ne0$、$x^4=0$ です。[結合律](../ATOP31/index.md#thm-atop31-assoc-unit) から第一と第二は

$$
x^2x=x^3,\qquad x^2x^2=x^4=0
$$

です。第三は分配律で展開すると

$$
1+(x+x)+(x^2+x^2)+(x^3+x^3)+x^4=1
$$

です。係数が $F$ なので重複した項が消えます。
<!-- solution-end -->

<a id="ex-atop32-a3"></a>
### A3. 符号列の評価
- Level: A

$n\ge3$ とし、$k=3$ の $z_3$ のうち、符号列 $(+--+)$ と $(+-+-)$ に対応する特異単体を $a^3$ で評価せよ。符号列の総数も求めよ。

<!-- solution-start -->
**詳細解答**

[実射影空間の mod 2 コホモロジー環の証明](#thm-atop32-projective-ring) の辺評価では、隣接符号の違いが1になります。$(+--+)$ は辺の値が順に $1,0,1$ なので積は0です。$(+-+-)$ は $1,1,1$ なので積は1です。最初の符号を固定し残り三つは二択だから、総数は $2^3=8$ です。
<!-- solution-end -->

<a id="ex-atop32-a4"></a>
### A4. 複素射影空間の胞体
- Level: A

$\mathbb{CP}^3$ の整数係数コホモロジー群を0次から7次まで求め、3次の群が零となる理由を胞体から説明せよ。

<!-- solution-start -->
**詳細解答**

[複素射影空間の整数係数コホモロジー群](#prop-atop32-complex-projective-groups) の胞体は0,2,4,6次に一つずつです。奇数次数には胞体がなく、各境界の始域または終域が零です。[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) により0,2,4,6次のホモロジーは $\mathbb Z$、他は零です。自由群なので [コホモロジーの普遍係数定理](../ATOP29/index.md#thm-atop29-cohomology-uct) の Ext 項が消え、コホモロジーは

$$
(\mathbb Z,0,\mathbb Z,0,\mathbb Z,0,\mathbb Z,0)
$$

となります。特に3次では $H_3=0$、$H_2=\mathbb Z$ が自由なので Hom 項と Ext 項の両方が零です。
<!-- solution-end -->

<a id="ex-atop32-b1"></a>
### B1. 三方向の符号
- Level: B

$T^3$ の標準生成元を $x,y,z$ とする。$(x+2y)(y+3z)(2x-z)$ を $xyz$ の倍数で表せ。

<!-- solution-start -->
**詳細解答**

[トーラスの整数係数コホモロジー環](#thm-atop32-torus-ring) により平方を零、交換を符号反転とします。初めの二因子を掛けると

$$
(x+2y)(y+3z)=xy+3xz+6yz.
$$

これに $2x-z$ を掛けます。重複添字を含む項を除くと

$$
-xyz+12yzx
$$

が残ります。$yzx=-yxz=xyz$ と二回交換するため、答えは $11xyz$ です。
<!-- solution-end -->

<a id="ex-atop32-b2"></a>
### B2. 境界の対消滅
- Level: B

$n\ge2$ とし、$k=2$ の $z_2$ の四つの符号列を書き出し、頂点0を除く面と頂点1を除く面がそれぞれ二つずつ一致することを示せ。

<!-- solution-start -->
**詳細解答**

[実射影空間の環の証明](#thm-atop32-projective-ring) のサイクルの構成から符号列は $(+++),(++-),(+-+),(+--)$ です。頂点0を除くと残る符号列は順に $(++),(+-),(-+),(--)$ です。対蹠同一視により最初と最後、第二と第三が一致します。

頂点1を除くと残りは $(++),(+-),(++),(+-)$ で、第一と第三、第二と第四が一致します。頂点2を除く場合も $(++),(++),(+-),(+-)$ となります。固定した除去頂点ごとに同じ面写像が2回ずつ現れます。$F$ 係数の [特異境界](../ATOP16/index.md#def-atop16-singular-boundary) ではこれらが相殺されるため $\partial z_2=0$ です。
<!-- solution-end -->

<a id="ex-atop32-b3"></a>
### B3. 係数と平方
- Level: B

$\mathbb{RP}^2$ の整数係数コホモロジーの0,1,2次を求めよ。mod 2 の1次生成元を整数係数の1次類から係数変更で得られるか説明せよ。

<!-- solution-start -->
**詳細解答**

[実射影空間の胞体境界](../ATOP22/index.md#prop-atop22-projective-boundary) は $d_2=2,d_1=0$ です。[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) で核と像を求めると

$$
H_0=\mathbb Z,\qquad H_1=\mathbb Z/2\mathbb Z,\qquad H_2=0
$$

となります。

[コホモロジーの普遍係数定理](../ATOP29/index.md#thm-atop29-cohomology-uct) に整数係数を代入します。0次の Hom 項は $\mathbb Z$、Ext 項は零です。1次の Ext の入力 $H_0$ は自由なので Ext は零です。Hom の入力 $H_1$ の生成元の像 $a\in\mathbb Z$ は $2a=0$ を満たす必要があり、従って $a=0$ です。2次では Hom 項が零で、Ext 項は自由分解に Hom を適用した2倍写像の余核 $\mathbb Z/2\mathbb Z$ です。従って

$$
H^0=\mathbb Z,\qquad H^1=0,\qquad H^2=\mathbb Z/2\mathbb Z.
$$

係数変更による1次の写像の始域は零なので像も零です。一方 [実射影空間の mod 2 コホモロジー環](#thm-atop32-projective-ring) の $x$ は非零で平方も非零です。従ってこの $x$ は整数係数の1次類の係数変更では得られません。
<!-- solution-end -->

<a id="ex-atop32-b4"></a>
### B4. 加法群が同じでも環は異なる
- Level: B

$X=S^1\vee S^2$ を円周と2次元球面のそれぞれの一点を同一視して得る空間とする。$X$ と $\mathbb{RP}^2$ の mod 2 コホモロジー群を比較し、次数付き環としては同型でないことを示せ。

<!-- solution-start -->
**詳細解答**

円周と2次元球面をそれぞれ一つの0胞体と一つの正次数の胞体で表し、0胞体を共有させます。$X$ は0,1,2次に胞体を一つずつ持ちます。1胞体の両端は同じ点へ、2胞体の境界全体も同じ点へ付着するので $d_1=d_2=0$ です。

[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) と [コホモロジーの普遍係数定理](../ATOP29/index.md#thm-atop29-cohomology-uct) より、整数ホモロジーは0,1,2次で自由な階数1、mod 2 コホモロジーは0,1,2次で $F$、それ以外で零です。これは $\mathbb{RP}^2$ の mod 2 の加法群と同じです。

球面を共有点へ潰し円周を固定する連続写像 $r:X\to S^1$ を取ります。円周の包含 $i:S^1\hookrightarrow X$ について $ri=\operatorname{id}$ です。

[コホモロジーの引戻し](../ATOP28/index.md#thm-atop28-pullback) は合成の順を反転するので $i^*r^*=(ri)^*=\operatorname{id}$ です。円周の1次の非零類 $u$ に対し

$$
i^*(r^*u)=u\ne0
$$

なので $v=r^*u\ne0$ です。$H^1(X;F)$ は1次元なので $v$ が唯一の非零元です。

円周の2次群が零なので $u^2=0$ です。[cup積の自然性](../ATOP31/index.md#thm-atop31-naturality)から

$$
v^2=r^*(u^2)=0
$$

となります。他方、[実射影空間の mod 2 コホモロジー環](#thm-atop32-projective-ring) の唯一の非零1次類 $x$ は $x^2\ne0$ です。

次数付き環同型なら $v$ を $x$ に送らなければならず、零である平方を非零の平方に送ることはできません。よって加法群は次数ごとに同型でも環は同型ではありません。
<!-- solution-end -->

<a id="ex-atop32-c1"></a>
### C1. 写像を積で制限する
- Level: C

$n>m\ge1$ とする。連続写像 $f:\mathbb{RP}^n\to\mathbb{RP}^m$ が mod 2 の1次コホモロジーで非零の引き戻しを誘導することは不可能であると証明せよ。

<!-- solution-start -->
**詳細解答**

[実射影空間の mod 2 コホモロジー環](#thm-atop32-projective-ring) により、始域側の生成元を $x$、終域側を $y$ とすると

$$
H^*(\mathbb{RP}^n;F)=F[x]/(x^{n+1}),
$$

$$
H^*(\mathbb{RP}^m;F)=F[y]/(y^{m+1}).
$$

引き戻し $f^*$ は終域のコホモロジーから始域のコホモロジーへ向かいます。1次群はどちらも $F$ の1次元空間なので、非零の $f^*$ は $f^*y=x$ を満たします。

終域では $y^{m+1}=0$ です。[cup積の自然性](../ATOP31/index.md#thm-atop31-naturality) と [結合律](../ATOP31/index.md#thm-atop31-assoc-unit) を繰り返し適用すれば

$$
0=f^*(y^{m+1})=(f^*y)^{m+1}=x^{m+1}.
$$

ところが $n>m$ なので $m+1\le n$ であり、始域の環では $x^{m+1}\ne0$ です。矛盾が生じます。従ってそのような写像は存在しません。ここでは群の次元だけでなく、1次の類の冪が消える次数の違いを利用しました。
<!-- solution-end -->

## 7. まとめ

トーラスでは異なる方向の1次生成元を掛けると高次の基底が現れ、実射影空間では一つの1次生成元の冪が最高次数まで残ります。複素射影空間では偶数次の加法群を求めましたが、積の係数を知るにはさらに道具が必要です。次講では実射影空間の環の関係と写像の自然性を使って、球面の対蹠点に関する定理を証明します。
