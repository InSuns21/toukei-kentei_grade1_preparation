# AG3-09 射影スキームとProj

[アフィンスキーム](../AG3-03/index.md#thm-ag3-03-affine-fully-faithful)は環から作れます。一方、[射影空間](../AG2-01/index.md#def-ag2-01-projective-space)は同次座標の比例類を使って作りました。では、環の側の操作だけで射影空間や射影曲線を作ることはできるでしょうか。

例えば円錐の斉次方程式 $X_0X_2-X_1^2=0$ を考えます。原点を含むアフィン零点集合には、原点以外の各点を定数倍した「同じ方向」が無数に含まれます。射影化とはその方向を一点へまとめることです。しかし単純に原点を取り除き商集合を作るだけでは、冪零元のような局所環の情報を扱いにくくなります。

この章では、**次数付き環の斉次素イデアルを点とする** $\operatorname{Proj}$ を導入し、その標準開集合を普通の $\operatorname{Spec}$ と同一視します。これで局所環・構造層を保った射影幾何が得られます。最後に斉次イデアルの商が閉部分スキームを与え、見かけ上同じ点集合でも厚みが違う例を計算します。

環は可換・単位的とし、特に断らない限り $S=\bigoplus_{n\ge0}S_n$ は非負整数次数付き環で $S_mS_n\subseteq S_{m+n}$ とします。零環が現れたときは、その素スペクトルを空集合とします。$S_0=A$、$S_+=\bigoplus_{n>0}S_n$ と書きます。初めの構成には $S$ の有限生成性も $S_1$ による生成も仮定しません。射影空間への閉埋込みを扱う箇所だけ、それらを明示的に追加します。

## 1. なぜ全ての素イデアルを採らないのか

まず $S=k[x_0,x_1]$ に $\deg x_i=1$ を与えます。[素スペクトル](../AG3-01/index.md#def-ag3-01-spec)の素点には $(x_0,x_1)$ もありますが、これは円錐の頂点に相当し、非零ベクトルの方向を表しません。さらに非斉次な $(x_0-1,x_1)$ は定数倍しても保存される方程式ではないので、射影点を記述するには不適切です。

射影点に残したいのは、次数付きの方程式で記述でき、少なくとも一つの正次数斉次元が消えない素点です。前者が「斉次」、後者が「無関係イデアルを含まない」という条件になります。

<a id="def-ag3-09-proj-points"></a>

<!-- formal-statement-start -->
> **定義（斉次素イデアルとProj）**  
> 非負次数付き環 $S=\bigoplus_{n\ge0}S_n$ のイデアル $\mathfrak p$ が斉次とは、$\mathfrak p=\bigoplus_{n\ge0}(\mathfrak p\cap S_n)$ を満たすことである。$S_+=\bigoplus_{n>0}S_n$ を**無関係イデアル**という。集合
>
$$
\operatorname{Proj}S=
\{\mathfrak p\subset S\mid
\mathfrak p\text{ は斉次素イデアル},\ S_+\not\subseteq\mathfrak p\}
$$
>
> を定める。斉次元 $f\in S$ の正次数に対して
>
$$
D_+(f)=\{\mathfrak p\in\operatorname{Proj}S\mid f\notin\mathfrak p\}
$$
>
> を**標準開集合**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-09-proj-points -->
**定義の確認**：$k[x_0,x_1]$ の $(x_0)$ は斉次素イデアルで、$x_1\notin(x_0)$ なので $\operatorname{Proj}$ の点です。一方 $(x_0,x_1)=S_+$ は斉次素イデアルでも除外されます。$(x_0-1)$ は斉次イデアルではありません。$\operatorname{Proj}k[x_0,x_1]$ の点は閉点だけでなく、$(0)$ のような一般点も含みます。体が代数閉でなくても定義できます。
<!-- definition-example-end -->

ここで $D_+(f)\cap D_+(g)=D_+(fg)$ です。斉次素イデアルについて $fg\notin\mathfrak p$ と $f,g\notin\mathfrak p$ は同値だからです。また各 $\mathfrak p$ は $S_+$ を含まないので、ある正次数の斉次元 $f$ が $\mathfrak p$ に入らず、これらの開集合が全体を覆います。

<a id="def-ag3-09-proj-topology"></a>

<!-- formal-statement-start -->
> **定義（ProjのZariski位相）**  
> $\operatorname{Proj}S$ の閉集合を、斉次イデアル $I\subseteq S$ に対する
>
$$
V_+(I)=\{\mathfrak p\in\operatorname{Proj}S\mid I\subseteq\mathfrak p\}
$$
>
> の形の集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-09-proj-topology -->
**定義の確認**：$S=k[x_0,x_1]$ で $I=(x_0)$ なら $V_+(I)$ は $[0:1]$ に対応する閉点です。$I=(x_0,x_1)=S_+$ なら、定義上全ての $\operatorname{Proj}$ の点が $S_+$ を含まないため $V_+(S_+)=\varnothing$ です。一方 $V_+((0))=\operatorname{Proj}S$ です。
<!-- definition-example-end -->

この閉集合たちは位相をなします。実際 $V_+(I)\cap V_+(J)=V_+(I+J)$、$V_+(I)\cup V_+(J)=V_+(IJ)$ で、任意族について $\bigcap_\lambda V_+(I_\lambda)=V_+(\sum_\lambda I_\lambda)$ です。最後に空集合と全体集合を上の例と同様に得ます。標準開集合はこの位相の基底です。なぜなら閉集合の補集合は、イデアル内の斉次元 $f$ を動かした $D_+(f)$ の和になるからです。

## 2. 標準開集合の環は次数ゼロの局所化

[主開集合 $D(f)$ の切断環](../AG3-02/index.md#thm-ag3-02-principal-sections)は $A_f$ でした。射影の場合も局所化するのですが、斉次座標は同時に定数倍されるので、「分子と分母の次数が同じ」分数だけが射影上の関数です。

正次数 $d$ の斉次元 $f$ で局所化した $S_f$ は $\mathbb Z$-次数付き環となります。斉次分数 $s/f^r$（$s\in S_m$）の次数は $m-rd$ です。次数零部分を $(S_f)_0$ と記します。

<a id="def-ag3-09-degree-zero-localization"></a>

<!-- formal-statement-start -->
> **定義（次数零の局所化）**  
> $f\in S_d$、$d>0$ を斉次元とする。局所化 $S_f$ の次数零部分
>
$$
(S_f)_0=
\left\{\frac{s}{f^r}\ \middle|\ r\ge0,\ s\in S_{rd}\right\}
$$
>
> を $D_+(f)$ の座標環の候補とする。右辺では通常の局所化の同値関係を用い、有限和も含める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-09-degree-zero-localization -->
**定義の確認**：$S=k[x_0,x_1]$、$\deg x_0=\deg x_1=1$、$f=x_0$ とします。次数零の斉次分数は
>
$$
\frac{x_0^{r-i}x_1^i}{x_0^r}
=\left(\frac{x_1}{x_0}\right)^i
\qquad(0\le i\le r).
$$
>
> 従って $(S_{x_0})_0=k[t]$、$t=x_1/x_0$ です。これは[射影直線の標準チャート](../AG2-01/index.md#prop-ag2-01-chart-bijection)と同じ座標環です。$f=x_0x_1$ とすると $(S_f)_0=k[t,t^{-1}]$ となり、二チャートの重なりを表します。
<!-- definition-example-end -->

<a id="thm-ag3-09-standard-open-affine"></a>

<!-- formal-statement-start -->
> **定理（Projの標準開集合はアフィン）**  
> 非負次数付き環 $S$、正次数斉次元 $f\in S_d$ に対して、自然な同相
>
$$
D_+(f)\simeq\operatorname{Spec}(S_f)_0
$$
>
> がある。$g\in S_e$ も正次数斉次元なら、この同相のもとで $D_+(f)\cap D_+(g)$ は $\operatorname{Spec}(S_f)_0$ の主開集合
>
$$
D\left(\frac{g^d}{f^e}\right)
$$
>
> に一致し、その座標環は $(S_{fg})_0$ に自然同型である。
<!-- formal-statement-end -->

### 証明の見取り図

局所化後の素イデアルの対応では、斉次元 $s\in S_m$ の「$f$ と同次数にそろえた比」$s^d/f^m$ が鍵です。素性を判定できる次数零の元に帰着してから、主開集合の対応を確認します。$d=1$ のときは単に $s/f^m$ です。

<!-- proof-start -->
### 証明

$B=(S_f)_0$ とします。$\mathfrak p\in D_+(f)$ に対し、局所化した斉次素イデアル $\mathfrak pS_f$ の次数零部分を
$$
\mathfrak q=(\mathfrak pS_f)_0\subseteq B
$$
とします。$B\to S_f/\mathfrak pS_f$ の核が $\mathfrak q$ で、右辺は整域なので $\mathfrak q$ は素イデアルです。

逆に $\mathfrak q\in\operatorname{Spec}B$ に対し、斉次元 $s\in S_m$（$m\ge0$）について
$$
s\in\mathfrak p_{\mathfrak q}
\quad\Longleftrightarrow\quad
\frac{s^d}{f^m}\in\mathfrak q
$$
と置き、これを満たす斉次元で生成される斉次イデアルを考えます。実際、同じ次数 $m$ の $s,t$ が条件を満たすなら、$B/\mathfrak q$ 上で $s^d/f^m$ と $t^d/f^m$ が零です。$S_f/\mathfrak qS_f$ の中で $s,t$ はともに $d$ 乗が零なので、二項展開から $(s+t)^{2d-1}=0$ です。従って
$$
\left(\frac{(s+t)^d}{f^m}\right)^{2d-1}=0
\quad\text{in }B/\mathfrak q,
$$
ゆえに $\mathfrak q$ の素性から $(s+t)^d/f^m\in\mathfrak q$ です。斉次元を掛けたとき条件が保たれることは
$$
\frac{(us)^d}{f^{m+\deg u}}
=\frac{u^d}{f^{\deg u}}\frac{s^d}{f^m}
$$
で分かります。さらに $st$ が条件を満たせば右辺が $\mathfrak q$ に入り、$\mathfrak q$ が素なので $s$ または $t$ が条件を満たします。従って生成された斉次イデアルは斉次元について素であり、**斉次イデアルが斉次元の積について素なら通常の素イデアル**という次数最高成分からの帰納法により、$\mathfrak p_{\mathfrak q}$ は素イデアルです。

$f^d/f^d=1\notin\mathfrak q$ なので $f\notin\mathfrak p_{\mathfrak q}$ です。二つの構成が互いに逆であることは、次数零分数 $s/f^r$（$\deg s=rd$）について
$$
\frac{s}{f^r}\in\mathfrak q
\Longleftrightarrow
\left(\frac{s}{f^r}\right)^d\in\mathfrak q
\Longleftrightarrow s\in\mathfrak p_{\mathfrak q}
$$
を用いて確認できます。最初の同値は素イデアルの根基性、最後の同値は定義です。

$g\in S_e$ について $g\notin\mathfrak p_{\mathfrak q}$ は $g^d/f^e\notin\mathfrak q$ と同値です。この対応によって開基が一致し、同相性が従います。さらに $B$ で $g^d/f^e$ を逆にすることは、次数零の分数の分母に $g$ を許すことと同じです。具体的には $s/(f^ag^b)$ の次数零条件は $\deg s=ad+be$ です。この分数は
$$
\frac{s}{f^ag^b}
=
\underbrace{\frac{s g^{(d-1)b}}{f^{a+eb}}}_{\in B}
\left(\frac{f^e}{g^d}\right)^b
$$
と表せます。第一因子の分子の次数は $ad+be+(d-1)be=(a+eb)d$ なので、確かに $B$ の元です。第二因子は $g^d/f^e$ の逆元のべきです。これにより
$$
B_{g^d/f^e}\simeq(S_{fg})_0
$$
が得られます。
<!-- proof-end -->

ここで「零環になる例」も重要です。$f$ が冪零なら $S_f=0$ であり $D_+(f)=\varnothing$ です。例えば $S=k[x_0,x_1]/(x_0^2)$ では $D_+(x_0)$ は空で、$D_+(x_1)$ の環には $t^2=0$ という冪零元が残ります。

## 3. 構造層を貼り、射影スキームを得る

いま各 $D_+(f)$ が環 $B_f=(S_f)_0$ のスペクトルと同一視できました。二つの標準開集合の重なりは双方から見て主開集合であり、切断環は共通の $(S_{fg})_0$ になります。[スキームを貼る定理](../AG3-04/index.md#thm-ag3-04-gluing)を使うと、単なる点集合ではなく局所環付き空間を構成できます。

<a id="def-ag3-09-projective-scheme"></a>

<!-- formal-statement-start -->
> **定義（Projの構造層と射影スキーム）**  
> 非負次数付き環 $S$ に対し、各標準開集合 $D_+(f)$ を
>
$$
\operatorname{Spec}(S_f)_0
$$
>
> と同一視し、重なりでは次数零の局所化が定める同型を用いて構造層を貼る。この局所環付き空間を $(\operatorname{Proj}S,\mathcal O_{\operatorname{Proj}S})$ と書く。特に $S_0=A$ のとき各 $A\to(S_f)_0$ が貼り合わさって得る射
>
$$
\operatorname{Proj}S\longrightarrow\operatorname{Spec}A
$$
>
> を **Projの構造射**と呼ぶ。本章では $S$ が有限個の次数1元で $A$-代数として生成される場合を、$A$ 上の射影スキームの基本形として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-09-projective-scheme -->
**定義の確認**：$S=k[x_0,x_1]$ では $U_0=D_+(x_0)=\operatorname{Spec}k[t]$、$U_1=D_+(x_1)=\operatorname{Spec}k[s]$ です。重なりで $s=t^{-1}$ と同一視します。この局所環付き空間は[射影直線を二チャートで貼る構成](../AG3-04/index.md#def-ag3-04-projective-line)に一致します。点集合だけでなく $\mathcal O$ の制限・茎まで一致します。
<!-- definition-example-end -->

<a id="thm-ag3-09-proj-gluing"></a>

<!-- formal-statement-start -->
> **定理（Projの存在と構造射）**  
> 非負次数付き環 $S$ に対し、前の構成はスキーム $\operatorname{Proj}S$ を一意に定める。$S_0=A$ なら自然な構造射
>
$
\operatorname{Proj}S\longrightarrow\operatorname{Spec}A
$
>
> が存在する。特に $S=A[x_0,\ldots,x_n]$ が次数1の変数で生成される多項式環なら
>
$
\operatorname{Proj}A[x_0,\ldots,x_n]\simeq\mathbb P_A^n
$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

標準開の上では普通のアフィンスキームを持ち、二重交叉での同型は同じ次数零分数を表しています。三重交叉でも式の解釈が変わらないことを確認して貼ります。多項式環では $x_j/x_i$ が全ての座標を与えます。

<!-- proof-start -->
### 証明

[標準開のアフィン性](#thm-ag3-09-standard-open-affine)から各 $D_+(f)$ を $\operatorname{Spec}(S_f)_0$ とします。二重交叉は $\operatorname{Spec}(S_{fg})_0$ に対応します。三つの斉次元 $f,g,h$ に対し、各二重交叉の制限から三重交叉へ写した元は、いずれも $(S_{fgh})_0$ の同じ分数です。従って重なりの同型は三重交叉で合成整合性を満たします。[スキームの貼り合わせ](../AG3-04/index.md#thm-ag3-04-gluing)によりスキームと構造層が一意に得られます。

$A=S_0$ の各元は次数零なので $A\to(S_f)_0$ を定め、重なり上では同じ分数として一致します。[アフィン上の射と環準同型の対応](../AG3-03/index.md#thm-ag3-03-affine-fully-faithful)から局所的な射が作れ、貼り合わせによって全体の構造射になります。

多項式環 $A[x_0,\ldots,x_n]$ では各斉次単項式を $x_i^r$ で割れば、次数零の単項式は $x_j/x_i$ たちの積になります。従って
$$
(S_{x_i})_0=
A\left[\frac{x_0}{x_i},\ldots,
\widehat{\frac{x_i}{x_i}},\ldots,\frac{x_n}{x_i}\right]
\simeq A[t_0,\ldots,\widehat{t_i},\ldots,t_n].
$$
各チャートの座標変換は $t_j\mapsto t_j/t_\ell$ という[射影空間のチャート変換](../AG2-01/index.md#prop-ag2-01-chart-bijection)と同じであるため、貼り合わせ後のスキームは $\mathbb P_A^n$ に同型です。
<!-- proof-end -->

### 次数1生成を外すと何が変わるか

$S=k[u,v]$ で $\deg u=1$、$\deg v=2$ とします。この場合も $\operatorname{Proj}S$ は定義できますが、$D_+(u)$ と $D_+(v)$ の環は
$$
(S_u)_0=k[v/u^2],\qquad
(S_v)_0=k[u^2/v]
$$
です。重なりでは二つの座標が互いに逆になります。従って、この特別な例の $\operatorname{Proj}S$ はスキームとして $\mathbb P^1_k$ と同型です。しかし次数1の元 $u$ だけでは $v$ を生成できません。「任意の次数付き環が自動的に標準的な射影空間の斉次座標環になる」と解釈してはいけません。

## 4. 斉次イデアルから閉部分スキームへ

既習の[斉次イデアルが定める射影零点集合](../AG2-02/index.md#def-ag2-02-projective-vanishing-ideal)は点集合を記録しました。スキームでは、同じ台を持つ二つの方程式でも、局所環に残る冪零元を区別します。

<a id="thm-ag3-09-homogeneous-quotient"></a>

<!-- formal-statement-start -->
> **定理（斉次商環と閉部分スキーム）**  
> 非負次数付き環 $S$ と斉次イデアル $I\subseteq S$ に対し、自然な射
>
$$
\operatorname{Proj}(S/I)\longrightarrow\operatorname{Proj}S
$$
>
> は閉埋込みで、その台は $V_+(I)$ である。各正次数斉次元 $f$ 上では、閉埋込みは環の全射
>
$$
(S_f)_0\twoheadrightarrow((S/I)_{\bar f})_0
\simeq (S_f)_0/(IS_f)_0
$$
>
> に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

商環の斉次素イデアルは、$I$ を含む元の斉次素イデアルと対応します。標準開の環について、局所化・次数零成分・商をこの順に取っても、斉次イデアルの局所化の次数零成分で割る操作と一致します。

<!-- proof-start -->
### 証明

商写像 $S\to S/I$ による素イデアルの逆像は、$I$ を含む素イデアルとの包含対応です。商写像は次数を保つので、斉次素イデアルの条件も保たれます。$(S/I)_+=(S_++I)/I$ だから、無関係イデアルを含まない条件も互いに対応します。台は $V_+(I)$ です。

$f$ を固定すると、[局所化の商との可換性](../AG1-04/index.md#thm-ag1-04-universal)により
$$
(S/I)_{\bar f}\simeq S_f/IS_f.
$$
$I$ は斉次なので $IS_f$ は次数付きイデアルです。次数零成分を取る操作は次数付き加群の直和分解に対して完全です。従って
$$
((S/I)_{\bar f})_0\simeq
(S_f)_0/(IS_f)_0
$$
となり、右の商写像は全射です。[アフィンの閉埋込みの商環による記述](../AG3-03/index.md#prop-ag3-03-quotient-image)を各標準開に適用すると、局所的に閉埋込みとなります。重なりでの制限は商写像と可換なので、これらは全体で閉埋込みを定めます。
<!-- proof-end -->

**例：同じ点、違う構造層**。$S=k[x_0,x_1]$ とし $I=(x_0^2)$、$J=(x_0)$ を比べます。両者の台は閉点 $[0:1]$ ですが、$D_+(x_1)$ で $t=x_0/x_1$ と置くと
$$
\mathcal O_{\operatorname{Proj}(S/I)}(D_+(x_1))
\simeq k[t]/(t^2),\qquad
\mathcal O_{\operatorname{Proj}(S/J)}(D_+(x_1))
\simeq k[t]/(t)\simeq k.
$$
前者には非零の $\bar t$ が残り、その二乗が零です。点集合だけでは見えない一次の「厚み」が局所環で区別されました。[冪零元を検出するSpecの視点](../AG3-01/index.md#def-ag3-01-b-points)を射影側へ持ち込んだ例です。

<a id="thm-ag3-09-standard-graded-embedding"></a>

<!-- formal-statement-start -->
> **定理（次数1生成環の射影空間への閉埋込み）**  
> $A$ を環、$S$ を $S_0=A$ で次数1の有限個の元 $s_0,\ldots,s_n$ によって生成される非負次数付き $A$-代数とする。次数付き全射
>
$$
A[X_0,\ldots,X_n]\twoheadrightarrow S,\qquad X_i\longmapsto s_i
$$
>
> の核を $I$ とすれば、$I$ は斉次イデアルであり、
>
$$
\operatorname{Proj}S\hookrightarrow
\operatorname{Proj}A[X_0,\ldots,X_n]
=\mathbb P_A^n
$$
>
> は $I$ が定める閉部分スキームである。
<!-- formal-statement-end -->

### 証明の見取り図

生成元を変数の像とした全射を作り、前の商環の定理をそのまま適用します。有限生成かつ次数1という条件は、この一つの有限次元射影空間へ閉埋込みを与える箇所で使われます。

<!-- proof-start -->
### 証明

$A[X_0,\ldots,X_n]$ の次数1元 $X_i$ の像が $s_i$ なので、$S$ の全ての次数の元は $s_i$ の多項式で表せ、提示された写像は全射です。写像が次数を保つため、核は斉次イデアルです。[斉次商環の閉埋込み](#thm-ag3-09-homogeneous-quotient)をこの核に適用し、さらに[多項式環のProjと射影空間の同型](#thm-ag3-09-proj-gluing)を合成すれば結論です。
<!-- proof-end -->

### 実例：二次曲線をスキームとして貼る

$k$ を任意の体とし、
$$
S=k[X_0,X_1,X_2]/(X_0X_2-X_1^2)
$$
を標準次数付き環とします。$X_0\ne0$ の開集合では
$$
t=X_1/X_0,\quad X_2/X_0=t^2,
\qquad (S_{X_0})_0\simeq k[t].
$$
$X_2\ne0$ の開集合では
$$
s=X_1/X_2,\quad X_0/X_2=s^2,
\qquad (S_{X_2})_0\simeq k[s].
$$
$X_0=X_2=0$ なら方程式から $X_1^2=0$、任意の素イデアルは $X_1$ も含みます。従って $D_+(X_0)$ と $D_+(X_2)$ は $\operatorname{Proj}S$ を覆います。重なりでは $ts=1$ です。よって貼り合わせは $\mathbb P^1_k$ と一致し、その同型の逆向きには
$$
[u:v]\longmapsto[u^2:uv:v^2]
$$
という二次の[Veronese写像](../AG2-03/index.md#prop-ag2-03-veronese-embedding)が現れます。方程式の局所計算だけで、曲線のスキーム構造を確認できました。

## 5. 次数付き加群とねじれ層への接続

[準連接層](../AG3-06/index.md#def-ag3-06-quasicoherent)は、アフィン開集合で加群から作った層でした。Projでも、次数付き $S$-加群 $M$ に対し、$D_+(f)$ 上で $(M_f)_0$ を切断加群として貼れます。ただし「任意の次数付き環で得られる全てのねじりが可逆層」という主張はしません。

<a id="def-ag3-09-graded-module-sheaf"></a>

<!-- formal-statement-start -->
> **定義（次数付き加群に付随する層）**  
> 非負次数付き環 $S$ と整数次数付き $S$-加群 $M$ を取る。各標準開集合 $D_+(f)$ 上で $(M_f)_0$ に付随する層を作り、次数零の局所化で貼り合わせた $\mathcal O_{\operatorname{Proj}S}$-加群を $\widetilde M$ と書く。整数 $r$ による次数のずらしを
>
$
M(r)_n=M_{n+r}\qquad(n\in\mathbb Z)
$
>
> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-09-graded-module-sheaf -->
**定義の確認**：$M=S$ の場合、$(M_f)_0=(S_f)_0$ なので $\widetilde S=\mathcal O_{\operatorname{Proj}S}$ です。$S=k[x_0,x_1]$、$M=S(1)$、$f=x_0$ の場合は
$$
(M_{x_0})_0=x_0\,k[x_1/x_0]
$$
となるので自由階数1です。$x_1$ 側では $x_1$ が局所基底となり、重なりで $x_1=(x_1/x_0)x_0$ という遷移を持ちます。これは[射影直線の $\mathcal O(1)$](../AG2-06/index.md#def-ag2-06-twisting-sheaf)と同じです。
<!-- definition-example-end -->

<a id="prop-ag3-09-twists-polynomial"></a>

<!-- formal-statement-start -->
> **命題（多項式環のねじりとO(r)）**  
> $S=A[x_0,\ldots,x_n]$ を標準次数付きとし、$r\in\mathbb Z$ とする。$\operatorname{Proj}S=\mathbb P_A^n$ 上の $\widetilde{S(r)}$ は可逆層であり、既習の $\mathcal O_{\mathbb P_A^n}(r)$ に自然同型である。
<!-- formal-statement-end -->

### 証明の見取り図

各チャートでは次数零の分数を $x_i^r$ でくくると、普通の座標環が残ります。局所基底の変換が従来の $\mathcal O(r)$ の遷移関数と一致することを確かめます。

<!-- proof-start -->
### 証明

$U_i=D_+(x_i)$ 上で、$S(r)_{x_i}$ の次数零成分は元の $S_{x_i}$ の次数 $r$ 成分です。$x_i$ は可逆で次数1なので、任意の次数 $r$ の斉次分数 $m$ は
$$
m=x_i^r\cdot(m/x_i^r),\qquad
m/x_i^r\in(S_{x_i})_0
$$
と一意に表せます。負の $r$ でも $x_i$ が可逆なので同じです。従って $(S(r)_{x_i})_0$ は局所基底 $e_i=x_i^r$ を持つ自由階数1の加群です。重なりで
$$
e_j=x_j^r=(x_j/x_i)^r e_i
$$
となります。これは[ねじれ層の遷移関数](../AG2-06/index.md#prop-ag2-06-od-cocycle)と一致するため、同一の可逆層が貼り合わされます。
<!-- proof-end -->

ここまでで必要なのは局所化と貼り合わせです。高次層コホモロジーはまだ計算していません。次章では $n+1$ 個の標準アフィン開集合とその交叉を使い、[アフィン交叉のČech比較](../AG3-08/index.md#thm-ag3-08-cech-comparison)を $\mathbb P_A^n$ の $\mathcal O(r)$ に適用します。

## 6. 演習：点・標準開・閉部分スキームを手計算する

### A1. 除外される素イデアル

$S=k[x,y]$ を標準次数付き環とする。$(x)$、$(x,y)$、$(x-1)$、$(0)$ が $\operatorname{Proj}S$ の点か判定し、その理由を述べよ。

- Level: A
- ID: AG3-09-A1

<!-- solution-start -->
### 詳細解答

$S_+=(x,y)$ です。$(x)$ は斉次で、$S/(x)=k[y]$ が整域なので素、しかも $y\notin(x)$ です。従って点です。$(x,y)$ は斉次素イデアルですが $S_+$ を含むので除外します。$(x-1)$ は $S/(x-1)=k[y]$ だから素ですが、$x-1$ の斉次成分 $x$ と $-1$ の両方はイデアルに入っていません。よって斉次ではありません。$(0)$ は $S$ が整域なので斉次素イデアルであり、$S_+$ を含まないため点です。これは閉点とは限らない一般点を与えます。
<!-- solution-end -->

### A2. 標準開の座標環

$S=k[x_0,x_1,x_2]$（標準次数）とし $U=D_+(x_2)$ とする。$(S_{x_2})_0$ の生成元と、それに対応するスキームを求めよ。

- Level: A
- ID: AG3-09-A2

<!-- solution-start -->
### 詳細解答

次数 $r$ の斉次単項式を $x_2^r$ で割ると
$$
\frac{x_0^ax_1^bx_2^{r-a-b}}{x_2^r}
=\left(\frac{x_0}{x_2}\right)^a
\left(\frac{x_1}{x_2}\right)^b,\qquad a+b\le r.
$$
任意の次数零分数はこの形の線形結合です。$u=x_0/x_2$、$v=x_1/x_2$ と置くと $u,v$ に多項式関係はなく $(S_{x_2})_0=k[u,v]$ です。[標準開の定理](#thm-ag3-09-standard-open-affine)から $U\simeq\operatorname{Spec}k[u,v]=\mathbb A_k^2$ です。
<!-- solution-end -->

### A3. 重なりの環

$S=k[x_0,x_1]$、$U_i=D_+(x_i)$ とする。$U_0\cap U_1$ の座標環を $t=x_1/x_0$ で書け。

- Level: A
- ID: AG3-09-A3

<!-- solution-start -->
### 詳細解答

$U_0$ の座標環は $k[t]$ です。$U_1$ に入る条件は $x_1$ が素イデアルに含まれないことなので、[標準開の定理](#thm-ag3-09-standard-open-affine)で $g=x_1,f=x_0,d=e=1$ として $D(t)$ に対応します。従って
$$
\Gamma(U_0\cap U_1,\mathcal O)=k[t]_t=k[t,t^{-1}].
$$
$U_1$ 側の $s=x_0/x_1$ は $s=t^{-1}$ です。二つの表示が一致することも確かめられます。
<!-- solution-end -->

### A4. 斉次商の冪零元

$S=k[x_0,x_1]$、$I=(x_0^3)$ に対する $\operatorname{Proj}(S/I)$ の台と、$D_+(x_1)$ 上の環を求めよ。

- Level: A
- ID: AG3-09-A4

<!-- solution-start -->
### 詳細解答

$I$ を含む斉次素イデアルは $x_0^3\in\mathfrak p$ なら $x_0\in\mathfrak p$ を満たすので、台は $V_+((x_0))$、すなわち $[0:1]$ です。$x_1$ 上で $t=x_0/x_1$ と置くと、斉次方程式を $x_1^3$ で割って $t^3=0$ が得られます。従って
$$
((S/I)_{x_1})_0\simeq k[t]/(t^3).
$$
この環では $\bar t\ne0$、$\bar t^2\ne0$、$\bar t^3=0$ です。台が一点でも、被約な一点の環 $k[t]/(t)$ とは異なります。
<!-- solution-end -->

### B1. 重み付き次数の例

$S=k[u,v]$、$\deg u=1,\deg v=2$ とする。$D_+(u)$、$D_+(v)$ の座標環を求め、重なりの遷移を示せ。$S$ が次数1生成ではないことも確認せよ。

- Level: B
- ID: AG3-09-B1

<!-- solution-start -->
### 詳細解答

$u$ を反転すると、次数零の単項式 $u^av^b$（$a$ は負整数も許す）は $a+2b=0$ を満たすので $(v/u^2)^b$ です。従って $(S_u)_0=k[v/u^2]$ です。$v$ を反転すると、$u^av^b$（$b$ は負整数、$a\ge0$）の次数零条件は $a+2b=0$ です。よって $a$ は偶数で $(S_v)_0=k[u^2/v]$ です。$t=v/u^2$、$s=u^2/v$ とすれば、重なりで $ts=1$ です。$S_1=ku$ の元から生成される $k$-部分代数は $k[u]$ にすぎず、$v$ は含まれません。従って次数1生成という追加仮定は成り立ちません。
<!-- solution-end -->

### B2. 斉次方程式の局所化

$S=k[X,Y,Z]/(XZ-Y^2)$ を標準次数付きとする。$D_+(X)$ 上で $Y/X$ と $Z/X$ の関係を求め、座標環が一変数多項式環であることを示せ。

- Level: B
- ID: AG3-09-B2

<!-- solution-start -->
### 詳細解答

$X$ が可逆なので $t=Y/X$、$w=Z/X$ と置けます。方程式を $X^2$ で割って
$$
w-t^2=\frac{XZ-Y^2}{X^2}=0
$$
となります。よって
$$
(S_X)_0\simeq k[t,w]/(w-t^2)\simeq k[t].
$$
後半の同型は $w\mapsto t^2$ を代入する写像が全射であり、その核が $(w-t^2)$ であることによります。$D_+(X)$ はアフィン直線に同型です。
<!-- solution-end -->

### B3. 同じ台を持つ二つの商

$S=k[x_0,x_1]$ に対して $I=(x_0^2)$、$J=(x_0)$ を比較せよ。台が同じこと、$D_+(x_1)$ 上の構造層が異なることを示せ。

- Level: B
- ID: AG3-09-B3

<!-- solution-start -->
### 詳細解答

任意の素イデアル $\mathfrak p$ について $x_0^2\in\mathfrak p$ と $x_0\in\mathfrak p$ は同値です。よって $V_+(I)=V_+(J)$ です。一方、$t=x_0/x_1$ とすれば
$$
((S/I)_{x_1})_0\simeq k[t]/(t^2),\quad
((S/J)_{x_1})_0\simeq k[t]/(t)\simeq k.
$$
前者は非零冪零元 $\bar t$ を含み、後者は体で冪零元が零しかありません。環同型は冪零元を保存するので、この二つは同型ではありません。従って台が一致しても閉部分スキームとしては一致しません。
<!-- solution-end -->

### B4. O(-2) の局所基底

$S=k[x_0,x_1]$ とする。$\widetilde{S(-2)}$ の $U_i=D_+(x_i)$ 上の基底を求め、重なりでの変換式を示せ。

- Level: B
- ID: AG3-09-B4

<!-- solution-start -->
### 詳細解答

$S(-2)_n=S_{n-2}$ です。局所化後に次数零を取ると元の次数 $-2$ の部分なので、$x_i^{-2}$ を局所基底にできます。各切断は $a_i x_i^{-2}$、$a_i\in(S_{x_i})_0$ と書けます。$t=x_1/x_0$ とすると
$$
e_1=x_1^{-2}=t^{-2}x_0^{-2}=t^{-2}e_0.
$$
従って[多項式環のねじりとO(r)](#prop-ag3-09-twists-polynomial)により得られる層は $\mathcal O(-2)$ です。指数が負でも局所化したチャートでは $x_i^{-1}$ が存在することを使っています。
<!-- solution-end -->

### C1. 射影二次曲線を二枚のアフィンで貼る

$S=k[X_0,X_1,X_2]/(X_0X_2-X_1^2)$ とする。(i) $D_+(X_0)$ と $D_+(X_2)$ が全体を覆うことを示せ。(ii) 各座標環と重なりの変換を求めよ。(iii) $\operatorname{Proj}S$ と $\mathbb P^1_k$ のスキーム同型を構成せよ。

- Level: C
- ID: AG3-09-C1

<!-- solution-start -->
### 詳細解答

(i) 両方の開集合に属さない斉次素イデアル $\mathfrak p$ があると仮定すると、$X_0,X_2\in\mathfrak p$ です。$X_1^2=X_0X_2\in\mathfrak p$ なので素性より $X_1\in\mathfrak p$ となり、$S_+\subseteq\mathfrak p$ に矛盾します。

(ii) $D_+(X_0)$ では $t=X_1/X_0$ を置き、$X_2/X_0=t^2$ より環は $k[t]$ です。$D_+(X_2)$ では $s=X_1/X_2$ を置き、$X_0/X_2=s^2$ より環は $k[s]$ です。重なりでは $X_0,X_2$ が可逆で、$X_1^2=X_0X_2$ から $X_1$ も可逆です。したがって
$$
ts=\frac{X_1^2}{X_0X_2}=1,\qquad
k[t,t^{-1}]\simeq k[s,s^{-1}],\quad s\leftrightarrow t^{-1}.
$$

(iii) $\mathbb P^1_k$ の二チャート $u\ne0$ と $v\ne0$ では座標 $v/u$ と $u/v$ が互いに逆です。従って前項の二つのアフィン同型が重なりで一致し、[スキームの貼り合わせ](../AG3-04/index.md#thm-ag3-04-gluing)により大域同型が得られます。斉次座標では $[u:v]\mapsto[u^2:uv:v^2]$ です。二チャートの環同型を明示したので、点の全単射だけでなく構造層を保つ同型であることが確認できました。
<!-- solution-end -->

### C2. 商環・Proj・ねじりをつなぐ

$S=k[x_0,x_1,x_2]$ に標準次数を与え、$I=(x_2)$ とする。(i) $\operatorname{Proj}(S/I)\subset\mathbb P_k^2$ の二枚の標準開チャートを書け。(ii) この閉部分スキームが $\mathbb P_k^1$ と同型であることを示せ。(iii) $\widetilde{S(1)}$ の制限が $\mathcal O_{\mathbb P^1}(1)$ と一致することを局所基底で確かめよ。

- Level: C
- ID: AG3-09-C2

<!-- solution-start -->
### 詳細解答

(i) $S/I=k[x_0,x_1]$ です。$D_+(x_0)$ では $t=x_1/x_0$、$x_2/x_0=0$ なので $k[t]$、$D_+(x_1)$ では $s=x_0/x_1$、$x_2/x_1=0$ なので $k[s]$ です。$x_0,x_1$ の双方が素イデアルに含まれれば、商環の無関係イデアル全体を含むため、この二開集合が全体を覆います。

(ii) 重なりで $st=1$ なので、二つの環 $k[t]$ と $k[s]$ を逆数で貼ったスキームです。[Projの存在と構造射](#thm-ag3-09-proj-gluing)により $\mathbb P^1_k$ に同型です。閉埋込み自体は $\mathbb P_k^2$ の直線 $x_2=0$ を指定します。

(iii) $\widetilde{S(1)}$ の $\mathbb P^2$ の $D_+(x_0)$ 上の基底は $e_0=x_0$、$D_+(x_1)$ 上は $e_1=x_1$ です。この自由階数1の加群を商 $x_2=0$ の二開集合へ制限しても基底はそれぞれ $e_0,e_1$ の像です。重なりで
$$
e_1=x_1=(x_1/x_0)x_0=t e_0
$$
なので、[射影空間の $\mathcal O(1)$ の遷移](../AG2-06/index.md#prop-ag2-06-od-cocycle)と同じです。よって制限した可逆層は $\mathcal O_{\mathbb P^1_k}(1)$ になります。
<!-- solution-end -->

## 7. 次章へ

射影スキームを作る道具は、斉次素イデアル、次数零の局所化、アフィンスキームの貼り合わせの三つでした。特に $S=A[x_0,\ldots,x_n]$ では $\mathbb P_A^n$ を $n+1$ 個の標準アフィン開集合で覆えることが分かりました。これらの有限交叉も標準開なのでアフィンです。

次章では、この被覆に[Čech比較定理](../AG3-08/index.md#thm-ag3-08-cech-comparison)を適用し、$\mathcal O(r)$ のコホモロジーを次数付きの分数の計算で求めます。