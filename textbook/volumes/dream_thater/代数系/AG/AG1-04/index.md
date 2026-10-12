# AG1-04 局所化・局所環・点の近傍での関数

前章では[座標環](../AG1-03/index.md#def-ag1-03-coordinate-ring)により、アフィン代数的集合 $X$ 上の多項式関数を一つの環として扱えました。しかし $X=\mathbb C$ で $1/t$ は $t=0$ で定義できず、多項式関数ではありません。それでも $t\ne0$ の領域では何の問題もなく計算できます。さらに $t=1$ のすぐ近くの性質を調べるだけなら、$t=0$ で関数が定義されている必要すらありません。

この問題の解決は「分母として使ってよい式を指定する」ことです。領域 $D(f)$ では $f$ の逆数を使い、点 $p$ の近くでは $p$ で零にならない式の逆数をすべて使います。こうした分数の作り方をこの章で厳密に定義します。点で消える関数が作るイデアルにも注目し、最後に「近くで同じ関数なら同一視する」という幾何学的な意味を証明します。

特に断らない限り $k=\mathbb C$、$X\subseteq k^n$ は空でないアフィン代数的集合、$A=A_k(X)=k[x_1,\ldots,x_n]/I_k(X)$ とします。$A$ は[座標環と多項式関数の同型](../AG1-03/index.md#prop-ag1-03-evaluation)を通じて $X$ 上の関数の環とみなします。以下で行う分数環の構成と点に関する証明は任意の体でも成立します。零点定理・Noether環・スキーム論は仮定しません。

## 1. 分母を選ぶ：局所化の代数的構成

$\mathbb Z$ から $\mathbb Q$ を作るときは、零でない整数を分母に許しました。しかし座標環には零因子があることがあります。例えば二軸 $X=V(xy)$ の座標環では $\overline x\,\overline y=0$ でも $\overline x,\overline y\ne0$ です。「零でなければ何でも割れる」としてしまうと危険です。

そこで、まず分母に使う集合 $S$ を選びます。$1\in S$、二つを掛けても $S$ の中にとどまり、$0$ を含まないことを要求します。分母の元が零因子でも構いませんが、そのときも分数同士の等号には注意が必要です。

<a id="def-ag1-04-multiplicative-set"></a>

<!-- formal-statement-start -->
> **定義（乗法的集合）**  
> 単位元 $1\ne0$ を持つ可換環 $R$ の部分集合 $S$ が乗法的集合であるとは、$1\in S$、$0\notin S$ かつ $s,t\in S$ なら $st\in S$ を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-04-multiplicative-set -->
**定義の確認**：$R=\mathbb C[t]$ で $S=\{1,t,t^2,\ldots\}$ は $t^mt^n=t^{m+n}$ により積で閉じ、$1=t^0$ を含み、零多項式を含みません。一方 $R=\mathbb C[x,y]/(xy)$ で $S=\{1,\overline x,\overline x^2,\ldots\}$ も乗法的です。$\overline x^m\ne0$ は $(1,0)\in V(xy)$ における値が $1$ となることで分かります。零因子を分母として許しても、後で定める分数環を作ることができます。
<!-- definition-example-end -->

分母をもつ形式的な組 $(a,s)$ に対し、単純な交差積の一致 $at=bs$ ではなく、さらに分母 $u\in S$ を掛けて一致する場合を同一視します。この修正が零因子を持つ環で重要です。

<a id="def-ag1-04-localization"></a>

<!-- formal-statement-start -->
> **定義（局所化）**  
> $R$ を単位元 $1\ne0$ を持つ可換環、$S\subset R$ を乗法的集合とする。$R\times S$ 上に

$$
(a,s)\sim(b,t)
\quad\Longleftrightarrow\quad
\exists u\in S:\ u(at-bs)=0
$$

> を定め、同値類を $a/s$ と書く。その集合を $S^{-1}R$ と記し、演算を

$$
\frac as+\frac bt=\frac{at+bs}{st},
\qquad
\frac as\frac bt=\frac{ab}{st}
$$

> で定める。これを $R$ の $S$ による局所化といい、$\iota:R\to S^{-1}R$、$a\mapsto a/1$ を標準写像とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-04-localization -->
**定義の確認**：$R=\mathbb C[t]$、$S=\{t^n:n\ge0\}$ なら

$$
\frac{t^3+2t^2}{t^2}=\frac{t+2}{1}
$$

です。交差積は $(t^3+2t^2)-t^2(t+2)=0$ なので、定義の $u=1$ が使えます。一方二軸の座標環 $A=\mathbb C[x,y]/(xy)$ で分母を $\overline x$ の冪に限ると

$$
\frac{\overline y}{1}=\frac0{1}
$$

です。$\overline x(\overline y-0)=0$ なので $u=\overline x\in S$ が使えます。もとの $A$ で $\overline y\ne0$ でも、局所化では零になり得ます。
<!-- definition-example-end -->

<a id="prop-ag1-04-fractions-ring"></a>

<!-- formal-statement-start -->
> **命題（局所化の演算と零判定）**  
> 上の仮定のもと、$\sim$ は同値関係であり、指定した演算は代表元によらず定まる可換な単位的環を作る。$s/1$（$s\in S$）は逆元 $1/s$ を持つ。特に

$$
\frac a1=0\text{ in }S^{-1}R
\quad\Longleftrightarrow\quad
\exists s\in S:\ sa=0\text{ in }R.
$$
<!-- formal-statement-end -->

### 証明の見取り図

推移律で分母を一つ余分に掛けるのが核心です。演算についても、両辺に使われた分母を掛ければ代表元の違いは消えます。零判定は同値関係に $(0,1)$ を代入して得られます。

<!-- proof-start -->
### 証明

反射律は $u=1$ と $as-sa=0$、対称律は符号反転から従います。推移律では $(a,s)\sim(b,t)$、$(b,t)\sim(c,r)$ とします。ある $u,v\in S$ について

$$
u(at-bs)=0,\qquad v(br-tc)=0
$$

です。第一式に $vr$、第二式に $us$ を掛けて足すと、中項が相殺し、

$$
uv\{r(at-bs)+s(br-tc)\}
=uvt(ar-sc)=0
$$

となります。$uvt\in S$ なので $(a,s)\sim(c,r)$ です。

演算の代表元に依存しないことも確かめます。$(a,s)\sim(a',s')$、$(b,t)\sim(b',t')$ とし、$u(as'-a's)=0$、$v(bt'-b't)=0$ を満たす $u,v\in S$ を取ります。加法の二つの分子の交差積の差は

$$
(at+bs)s't'-(a't'+b's')st
=tt'(as'-a's)+ss'(bt'-b't)
$$

です。これへ $uv$ を掛ければ零です。積でも

$$
(ab)s't'-(a'b')st
=bt'(as'-a's)+a's(bt'-b't)
$$

に $uv$ を掛けると零です。従って両演算は同値類に降ります。結合律も分母をそろえて確かめます。たとえば加法について

$$
\left(\frac as+\frac bt\right)+\frac cr
=\frac{atr+bsr+cst}{str}
=\frac as+\left(\frac bt+\frac cr\right)
$$

です。また分配法則の両辺を直接計算すると

$$
\frac as\left(\frac bt+\frac cr\right)
=\frac{a(br+ct)}{str}
=\frac{abr+act}{str}
=\frac as\frac bt+\frac as\frac cr
$$

となります。乗法の結合律も三つの分数を実際に掛けると、両辺とも $abc/(str)$ です。乗法と加法の可換性は $ab=ba$、$at+bs=bs+at$ および $st=ts$ から従います。零元は $0/1$、単位元は $1/1$、加法逆元は $(-a)/s$ です。実際 $(a/s)+((-a)/s)=0/s^2=0/1$ です。

$s\in S$ について $(s/1)(1/s)=s/s=1/1$ は $s-s=0$ により成立します。最後に $(a,1)\sim(0,1)$ の定義を書けば、ある $u\in S$ に対して $u(a-0)=0$ という零判定を得ます。
<!-- proof-end -->

通常の整域で $S$ の元がすべて非零なら、$u(at-bs)=0$ から $at-bs=0$ と消去できるため、よく知る分数の計算になります。**零因子のある場合にこの消去をしてはいけません**。

## 2. 局所化の特徴付けと開集合

局所化は、分母を許すという説明だけでなく、「$S$ の元が可逆になる最小の環」という普遍的な性質を持ちます。これを確かめると、分数で定義した写像が一意に決まることが分かります。

<a id="thm-ag1-04-universal"></a>

<!-- formal-statement-start -->
> **定理（局所化の普遍性）**  
> $R$ を単位的可換環、$S$ を $0$ を含まない乗法的集合、$B$ を単位的可換環とし、単位元を保つ環準同型 $\varphi:R\to B$ がすべての $s\in S$ を $B$ の単元に送るとする。このとき $\overline\varphi\circ\iota=\varphi$ を満たす準同型 $\overline\varphi:S^{-1}R\to B$ が一意に存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$R$ の元の像と、分母の像の逆数が分かれば、分数の行き先は強制されます。等号を確認するときは同値関係の $u$ が単元に送られることを使います。

<!-- proof-start -->
### 証明

候補を

$$
\overline\varphi(a/s)=\varphi(a)\varphi(s)^{-1}
$$

と定めます。$(a,s)\sim(b,t)$ なら $u(at-bs)=0$ を満たす $u\in S$ が存在します。$\varphi$ を適用すると

$$
\varphi(u)\bigl(\varphi(a)\varphi(t)-\varphi(b)\varphi(s)\bigr)=0.
$$

$\varphi(u)$ は単元なので逆元を掛けて括弧内が零です。続いて $\varphi(s)^{-1}\varphi(t)^{-1}$ を掛ければ二つの分数の像が等しく、well-defined です。

加法では

$$
\begin{aligned}
\overline\varphi\left(\frac{at+bs}{st}\right)
&=(\varphi(a)\varphi(t)+\varphi(b)\varphi(s))
  (\varphi(s)\varphi(t))^{-1}\\
&=\varphi(a)\varphi(s)^{-1}
  +\varphi(b)\varphi(t)^{-1}
\end{aligned}
$$

となり、積についても、分母の像が単元であり $B$ が可換であることから

$$
\begin{aligned}
\overline\varphi\left(\frac{ab}{st}\right)
&=\varphi(a)\varphi(b)\bigl(\varphi(s)\varphi(t)\bigr)^{-1}\\
&=\bigl(\varphi(a)\varphi(s)^{-1}\bigr)
  \bigl(\varphi(b)\varphi(t)^{-1}\bigr)
\end{aligned}
$$

となります。また $\overline\varphi(a/1)=\varphi(a)$ であり、$\overline\varphi(1/1)=1_B$ なので単位元も保ちます。一意性は $a/s=(a/1)(s/1)^{-1}$ に準同型を適用すれば、像が必ず候補の式になることから従います。
<!-- proof-end -->

今度は $A=A_k(X)$ へ戻ります。多項式関数 $f\in A$ が零にならない部分では $1/f$ を使えるはずです。

<a id="def-ag1-04-principal-open"></a>

<!-- formal-statement-start -->
> **定義（主開集合と一元局所化）**  
> $X\subseteq k^n$ をアフィン代数的集合、$A=A_k(X)$、$f\in A$ とする。次の集合を主開集合という。

$$
D_X(f)=\{p\in X:f(p)\ne0\}
$$

> $D_X(f)\ne\varnothing$ なら $f$ の冪の集合 $S_f$ は乗法的であり、対応する局所化を次のように書く。

$$
S_f=\{1,f,f^2,\ldots\},\qquad A_f=S_f^{-1}A
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-04-principal-open -->
**定義の確認**：$X=\mathbb C$、$A=\mathbb C[t]$ と $f=t$ なら $D_X(t)=\mathbb C\setminus\{0\}$ です。$t^m$ は任意の $1\in D_X(t)$ で値 $1$ なので $A$ の零元ではなく、$S_f$ は乗法的集合です。$A_t$ には $t^{-1}=1/t$ が入り、$t^2\cdot t^{-2}=1$ が成り立ちます。一方 $f=0$ では $D_X(f)=\varnothing$ であり、$S_f$ は零元を含むため上の定義では局所化を作りません。
<!-- definition-example-end -->

<a id="prop-ag1-04-basic-opens"></a>

<!-- formal-statement-start -->
> **命題（主開集合は開集合の基底）**  
> 任意の体 $k$、アフィン代数的集合 $X$ と $f,g\in A_k(X)$ に対し、$D_X(f)$ は相対Zariski開集合であり、

$$
D_X(f)\cap D_X(g)=D_X(fg)
$$

> が成り立つ。さらに $X$ の任意の開集合 $U$ と $p\in U$ に対し、$p\in D_X(h)\subseteq U$ を満たす $h\in A_k(X)$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

点で $f(p)g(p)\ne0$ という条件は、体に零因子がないので二つの非零条件と同値です。最後は「閉集合は多項式族の共通零点」という[Zariski位相の定義](../AG1-01/index.md#def-ag1-01-zariski-topology)を開集合側へ言い換えます。

<!-- proof-start -->
### 証明

$f$ の多項式代表元を $F$ とすると、$X\setminus D_X(f)=X\cap V_k(F)$ は閉集合だから $D_X(f)$ は開です。$p\in X$ に対し $f(p)g(p)\ne0$ と $f(p)\ne0,\ g(p)\ne0$ は体の積の性質から同値なので交わりの式を得ます。

相対閉集合 $X\setminus U$ は $X\cap V_k(T)$（$T$ は多項式の集合）と書けます。$p\in U$ は「$p$ は $T$ のすべての共通零点ではない」という意味なので、ある $H\in T$ について $H(p)\ne0$ です。$h=\overline H\in A$ とすれば $p\in D_X(h)$ です。また $q\in D_X(h)$ なら $H(q)\ne0$ なので $q\notin V_k(T)$、従って $q\in U$ です。
<!-- proof-end -->

<a id="prop-ag1-04-fractions-functions"></a>

<!-- formal-statement-start -->
> **命題（主開集合上の分数関数）**  
> 任意の体 $k$、アフィン代数的集合 $X$、$A=A_k(X)$ と $D_X(f)\ne\varnothing$ を満たす $f\in A$ に対し、

$$
\frac a{f^m}\longmapsto
\left(p\longmapsto\frac{a(p)}{f(p)^m}\right)
\quad(p\in D_X(f))
$$

> は $A_f$ から $D_X(f)$ 上の $k$ 値関数の環への単射な単位的環準同型を定める。
<!-- formal-statement-end -->

### 証明の見取り図

局所化の等号なら点ごとの等号になることを確かめた後、逆も示します。逆向きでは、$D(f)$ 上で零になる差に $f$ を一回掛けると、**$f=0$ の点でも**零になるのが核心です。

<!-- proof-start -->
### 証明

二つの分数が等しければ、ある $r\ge0$ に対して

$$
f^r(af^n-bf^m)=0\quad\text{in }A
$$

が成り立ちます。$p\in D_X(f)$ では $f(p)\ne0$ だから、値を代入して $a(p)f(p)^n=b(p)f(p)^m$ です。分母は非零なので関数値が一致します。加法・積・単位元を保つことは体 $k$ の分数演算で確認できます。

逆に $D_X(f)$ のすべての点で $a(p)/f(p)^m=b(p)/f(p)^n$ とします。$h=af^n-bf^m\in A$ とすれば、$p\in D_X(f)$ では $h(p)=0$ です。一方 $p\notin D_X(f)$ では $f(p)=0$ なので、どちらの場合も $(fh)(p)=0$ です。[座標環と多項式関数の同型](../AG1-03/index.md#prop-ag1-03-evaluation)により $fh=0$ in $A$ となります。よって局所化の定義で $u=f$ と取れば二つの分数が等しくなり、単射です。
<!-- proof-end -->

この命題は $A_f$ の元を具体的な関数として**埋め込む**主張です。任意に指定された $D(f)$ 上の関数がすべてこの形だとは言っていません。例えば集合としての関数を無制限に許せば、$D(t)$ 上の $z\mapsto\overline z$ も関数ですが、$\mathbb C[t]_t$ の元とは限りません。

## 3. 一点を中心に分母を選ぶ

$D(f)$ の分母は $f$ の冪でした。今度は特定の点 $p$ で消えない関数を**すべて**分母に許します。これにより、どの関数が $p$ で零になるかだけが、可逆性を決めます。

一般に可換環の元のうち可逆でない元を調べると、その環が一つの点の性質を表しているかを判定できます。まず「極大イデアルが一つだけ」という性質に名前を付けます。

<a id="def-ag1-04-local-ring"></a>

<!-- formal-statement-start -->
> **定義（局所環）**  
> 単位元 $1\ne0$ を持つ可換環 $R$ が局所環であるとは、$R$ が極大イデアルをちょうど一つ持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-04-local-ring -->
**定義の確認**：体 $k$ のイデアル $J$ が非零元 $a$ を含むと、$a^{-1}a=1\in J$ なので $J=k$ です。従って $k$ の真のイデアルは $(0)$ だけです。商 $k/(0)\simeq k$ は体なので、[極大イデアルと商体の定理](../../RNG/RNG2/index.md#thm-rng2-maximal-quotient-field)から $(0)$ は極大です。唯一の極大イデアルが $(0)$ であるため、体は局所環の直接例です。
<!-- definition-example-end -->

点 $p$ のところでは、$p$ で零になる関数を集めて極大イデアルを作り、その補集合を分母として選びます。

<a id="def-ag1-04-point-local-ring"></a>

<!-- formal-statement-start -->
> **定義（点の極大イデアルと点の局所環）**  
> 体 $k$、空でないアフィン代数的集合 $X$、$A=A_k(X)$ と点 $p\in X$ に対し、

$$
\mathfrak m_p=\{a\in A:a(p)=0\},
\qquad S_p=A\setminus\mathfrak m_p
$$

> と置く。$S_p^{-1}A$ を $p$ における点の局所環といい、$A_{\mathfrak m_p}$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-04-point-local-ring -->
**定義の確認**：$X=\mathbb C$、$p=0$ なら $A=\mathbb C[t]$、$\mathfrak m_0=(t)$ です。実際、$a(0)=0$ と $a=tq$ は[一次式による多項式除法](../../RNG/RNG4/index.md#thm-rng4-division-algorithm)から同値です。従って $S_0$ は定数項が零でない多項式全体であり、$(1+t)^{-1}\in A_{\mathfrak m_0}$ ですが $t^{-1}$ はこの表示の分母として認められません。
<!-- definition-example-end -->

今作った $A_{\mathfrak m_p}$ が局所環であることは、元の可逆性を判定して示します。

<a id="thm-ag1-04-local-ring"></a>

<!-- formal-statement-start -->
> **定理（点の局所環の単元と唯一の極大イデアル）**  
> 体 $k$、アフィン代数的集合 $X\subseteq k^n$、点 $p\in X$、$A=A_k(X)$ に対し、$A_{\mathfrak m_p}$ は局所環である。具体的には $a/s\in A_{\mathfrak m_p}$（$s(p)\ne0$）が単元であることと $a(p)\ne0$ は同値であり、唯一の極大イデアルは

$$
\mathfrak m_p A_{\mathfrak m_p}
=\left\{\frac as:s(p)\ne0,\ a(p)=0\right\}
$$

> である。評価は同型 $A_{\mathfrak m_p}/\mathfrak m_p A_{\mathfrak m_p}\simeq k$ を誘導する。
<!-- formal-statement-end -->

### 証明の見取り図

評価 $a/s\mapsto a(p)/s(p)$ は分母が点で非零なので定義できます。これで零になる元と、逆数を作れる元とを完全に分けます。最後に「極大イデアルは単元を含められない」ことを使います。

<!-- proof-start -->
### 証明

$p$ での評価 $\operatorname{ev}_p:A\to k$ は定数関数を含むので全射で、核は $\mathfrak m_p$ です。従って[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)で $A/\mathfrak m_p\simeq k$ となり、[極大イデアルと商体の定理](../../RNG/RNG2/index.md#thm-rng2-maximal-quotient-field)により $\mathfrak m_p$ は極大です。$S_p=\{s:s(p)\ne0\}$ は積で閉じ、零元を含まないので局所化できます。

$k$ への評価は、$S_p$ の元の値が $k$ で可逆であるため、[局所化の普遍性](#thm-ag1-04-universal)から

$$
\varepsilon_p:A_{\mathfrak m_p}\longrightarrow k,
\qquad \frac as\longmapsto\frac{a(p)}{s(p)}
$$

へ一意に拡張されます。定数 $c/1$ を $c$ に送るので全射です。核はちょうど $a(p)=0$ の分数全体で、記した $\mathfrak m_p A_{\mathfrak m_p}$ です。[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)より、その商は $k$ です。

$a(p)\ne0$ なら $a\in S_p$ ですから

$$
\frac as\cdot\frac sa=\frac{as}{sa}=\frac11
$$

となり $a/s$ は単元です。逆に $a(p)=0$ なら $\varepsilon_p(a/s)=0$ であり、もし逆元があればその像と掛けて $1=0$ になり矛盾します。従って非単元はちょうど $\ker\varepsilon_p$ です。

この核は商が体となるので極大です。さらに任意の真のイデアル $J$ は単元を含めません（もし単元 $u\in J$ なら $1=u^{-1}u\in J$ となるため）。よって $J$ は非単元全体 $\ker\varepsilon_p$ に含まれます。極大イデアルはそれより真に小さいイデアルにはなれないので、唯一の極大イデアルが $\ker\varepsilon_p$ です。
<!-- proof-end -->

この局所環は「点において値が定まるすべての有理式の情報」を保持します。$\mathbb C[t]_{\mathfrak m_0}$ には $1/(1+t)$ が入りますが $1/t$ は入りません。$1/t$ は $t\ne0$ の開集合上で正しくても、原点の近傍で値を持つものとしては扱えないのです。

## 4. 局所環の元を点の近傍上で解釈する

同じ点の近くで一致する二つの式は、その点に関する情報としては区別する必要がありません。ただし一致する範囲は全空間でなくてよく、**その点を含む何らかの開集合**で十分です。

分数 $a/s$（$s(p)\ne0$）は $D_X(s)$ という $p$ の開近傍で関数 $q\mapsto a(q)/s(q)$ を定めます。こうした分数表示の関数を二つ用意し、両方が定義される $p$ の開近傍上で一致すれば、点 $p$ で**同じ芽**を持つと考えます。この説明を次のように厳密化します。

<a id="def-ag1-04-germ"></a>

<!-- formal-statement-start -->
> **定義（点における分数関数の芽）**  
> 体 $k$、アフィン代数的集合 $X$、点 $p\in X$ に対し、$s(p)\ne0$ なる表示 $a/s$ が $D_X(s)$ 上に定める関数を考える。二つの分数表示 $a/s$ と $b/t$ が同じ芽を定めるのは、$p$ を含む相対Zariski開集合 $U$ が存在して、次の条件を満たす場合である。

$$
p\in U\subseteq D_X(s)\cap D_X(t),
\qquad\frac{a(q)}{s(q)}=\frac{b(q)}{t(q)}\quad(\forall q\in U)
$$

> この同値関係による芽の集合を $\mathcal G_p$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-04-germ -->
**定義の確認**：$X=\mathbb C$、$p=0$ において二つの分数表示 $t/(1+t)$ と $t(1-t)/(1-t^2)$ を考えます。分母 $1+t$ と $1-t^2$ はともに $0$ で非零です。$U=D_{\mathbb C}(1-t^2)$ では両分母が零にならず、

$$
\frac{t(1-t)}{1-t^2}
=\frac{t(1-t)}{(1-t)(1+t)}
=\frac{t}{1+t}
$$

なので二つは $p=0$ で同じ芽です。異なる式で書かれても近傍で一致すれば区別しません。
<!-- definition-example-end -->

<a id="thm-ag1-04-germ-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（点の局所環と分数関数の芽の一致）**  
> 任意の体 $k$、アフィン代数的集合 $X$ と点 $p\in X$ に対し、$A_{\mathfrak m_p}$ の元 $a/s$ にその $p$ での分数関数の芽を対応させる写像は、単位的環同型

$$
A_{\mathfrak m_p}\simeq\mathcal G_p
$$

> を与える。ただし $\mathcal G_p$ の演算は、二つの表示がともに定義される近傍へ制限して行う。
<!-- formal-statement-end -->

### 証明の見取り図

局所化で同じなら、ある $u(p)\ne0$ を掛けた交差積が零なので、$D(ust)$ 上で値が一致します。逆に近傍で等しいなら、主開集合の基底性によって一つの $D(h)$ へ縮められ、$h(at-bs)$ は $X$ のすべての点で零になります。両向きを示すことが肝心です。

<!-- proof-start -->
### 証明

まず $a/s=b/t$ が $A_{\mathfrak m_p}$ で成立したとします。定義により、$u(p)\ne0$ なる $u\in A$ で $u(at-bs)=0$ となるものがあります。$U=D_X(ust)$ は[主開集合の基底に関する命題](#prop-ag1-04-basic-opens)から開で、$u(p)s(p)t(p)\ne0$ より $p\in U$ です。任意の $q\in U$ では $u(q)\ne0$ なので $a(q)t(q)-b(q)s(q)=0$ となり、二つの分数関数が一致します。

逆に $p$ を含む開集合 $U\subseteq D_X(s)\cap D_X(t)$ 上で二つの関数が一致したとします。[主開集合の基底の命題](#prop-ag1-04-basic-opens)で $p\in D_X(h)\subseteq U$ となる $h\in A$ を選べます。$q\in D_X(h)$ なら $s(q)t(q)\ne0$ であり、分数の等号から

$$
a(q)t(q)-b(q)s(q)=0
$$

です。一方 $q\notin D_X(h)$ なら $h(q)=0$ です。従って**どの $q\in X$ に対しても**

$$
\bigl(h(at-bs)\bigr)(q)=0
$$

が成り立ちます。[座標環と多項式関数の同型](../AG1-03/index.md#prop-ag1-03-evaluation)より $h(at-bs)=0$ in $A$ です。$h(p)\ne0$ だから $h\in S_p$ であり、局所化の同値関係から $a/s=b/t$ です。

近傍での一致は同値関係でもあります。反射律・対称律は値の等号から従い、$a/s$ と $b/t$ が $U$ で、$b/t$ と $c/r$ が $V$ で一致するなら、$p\in U\cap V$ かつ $U\cap V$ は開なので、そこで $a/s$ と $c/r$ が一致し推移律が成立します。以上で「局所化で等しい」と「同じ芽を表す」が同値と分かりました。そのため芽の同値類の加法と積は局所化の演算から矛盾なく定まり、局所化から芽への対応は単射です。定義上、すべての芽には $s(p)\ne0$ の分数表示があるので全射でもあります。実際、$a/s$ と $b/t$ の和と積は $D_X(s)\cap D_X(t)$ 上でそれぞれ $(at+bs)/(st)$、$ab/(st)$ として計算でき、[局所化の演算](#prop-ag1-04-fractions-ring)と一致します。$1/1$ を定数 $1$ の芽へ送るから単位元も保ち、同型が得られます。
<!-- proof-end -->

**重要な境界**：ここで扱う芽は分数表示を持つ局所的関数の芽です。任意の集合論的な関数や任意の連続関数の芽を意味しません。後で層を導入するときには、任意の開集合上で局所的に分数表示できる関数を貼り合わせます。本章ではその構成を先取りしません。

## 5. 零因子が残る点、消える開集合

局所化によって消える元がある一方、点によっては零因子が残ります。この違いは幾何学の枝の交わりを測る手掛かりです。

$X=V_{\mathbb C}(xy)$、$A=\mathbb C[x,y]/I(X)$ とします。[二軸の座標環の例](../AG1-03/index.md#prop-ag1-03-domain)より $\overline x\overline y=0$、両者は非零です。$D_X(\overline x)$ では $\overline x$ が可逆なので、$A_{\overline x}$ で

$$
\frac{\overline y}{1}
=\frac{\overline x\overline y}{\overline x}
=0
$$

です。幾何学的にも $D_X(\overline x)=\{(a,0):a\in\mathbb C,\ a\ne0\}$ では $y$ は常に零です。

一方、交点 $o=(0,0)$ における $A_{\mathfrak m_o}$ では $\overline x/1$ と $\overline y/1$ はともに非零なのに積が零です。

まず $\overline x/1=0$ と仮定すると、[局所化の零判定](#prop-ag1-04-fractions-ring)から、ある $u(o)\ne0$ なる $u\in A$ について $u\overline x=0$ となります。任意の $a\ne0$ で $(a,0)\in X$ だから

$$
u(a,0)a=0
\quad\Longrightarrow\quad
u(a,0)=0
$$

です。$u(t,0)$ は無限個の $t\in\mathbb C$ で零となる一変数多項式なので、[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)から恒等的に零となり、特に $u(0,0)=0$、矛盾です。

同じく $\overline y/1=0$ と仮定すれば、ある $v(o)\ne0$ について $v\overline y=0$ です。$y$ 軸上の点 $(0,b)$（$b\ne0$）に代入すると

$$
b\,v(0,b)=0
\quad\Longrightarrow\quad
v(0,b)=0
$$

です。$v(0,t)$ は無限個の点で零なので、[一変数多項式の根の有限性](../AG1-01/index.md#prop-ag1-01-affine-line-closed)により零多項式となり $v(o)=0$、矛盾です。

これは点 $o$ の近傍では二本の枝が同時に存在し、片方を分母で消すことができないためです。「局所環」は必ずしも整域ではありません。もとの図形が既約か、どの点を中心に見るかによって局所的な代数は変わります。

## 6. 演習：分母と近傍を往復する

特に断らない限り $k=\mathbb C$ です。局所化の分数の等号では、必要なら分母として許された元を具体的に挙げてください。

**Level A：定義と計算**

### A1. 分数の等号を直接確かめる

$R=\mathbb C[t]$、$S=\{t^n:n\ge0\}$ で、$(t^3+2t^2)/t^2=(t+2)/1$ を同値関係から示せ。

- Level: A
- ID: AG1-04-A1

<!-- solution-start -->
**詳細解答**　交差積の差を計算すると

$$
(t^3+2t^2)\cdot1-(t+2)\cdot t^2
=t^3+2t^2-t^3-2t^2=0.
$$

定義で $u=1\in S$ を選べるため二つは同値です。$t^2\ne0$ が $R$ の元として成り立ち、$S$ は乗法的集合なので両分数は正しく定義されています。
<!-- solution-end -->

### A2. 主開集合の交わり

$X=\mathbb C^2$ とし、$f=x$、$g=y$ について $D_X(f)\cap D_X(g)=D_X(fg)$ を座標で示せ。

- Level: A
- ID: AG1-04-A2

<!-- solution-start -->
**詳細解答**　点 $(a,b)$ に対して左辺の条件は $a\ne0$ と $b\ne0$ の両方です。複素数体に零因子はないのでこれは $ab\ne0$ と同値です。一方右辺の条件は $(xy)(a,b)=ab\ne0$ です。従って両集合は

$$
\{(a,b)\in\mathbb C^2:a\ne0,\ b\ne0\}
$$

に等しくなります。[主開集合の交わりの命題](#prop-ag1-04-basic-opens)を座標で確認したことになります。
<!-- solution-end -->

### A3. 点で消えるイデアルと局所的な単元

$X=\mathbb C$、$p=2$ とする。$\mathfrak m_p=(t-2)$ を示し、$t-1$ と $t-2$ のうち $A_{\mathfrak m_p}$ の単元になるものを判定せよ。

- Level: A
- ID: AG1-04-A3

<!-- solution-start -->
**詳細解答**　[多項式の除法](../../RNG/RNG4/index.md#thm-rng4-division-algorithm)で、除数 $t-2$ が一次・モニックであることから、任意の $a(t)\in\mathbb C[t]$ は

$$
a(t)=(t-2)q(t)+a(2)
$$

と書けます。従って $a(2)=0$ は $a\in(t-2)$ と同値なので $\mathfrak m_p=(t-2)$ です。$(t-1)(2)=1\ne0$ だから $t-1\in S_p$ であり、$(t-1)/1$ の逆元は $1/(t-1)$ です。一方 $(t-2)(2)=0$ だから[局所環の単元判定](#thm-ag1-04-local-ring)により $(t-2)/1$ は非単元です。
<!-- solution-end -->

### A4. 点での分数の値

$X=\mathbb C$、$p=0$ とする。$u=(t^2+1)/(1+t)$ が $A_{\mathfrak m_0}$ に属すことを確かめ、剰余体への評価 $\varepsilon_0(u)$ を求めよ。

- Level: A
- ID: AG1-04-A4

<!-- solution-start -->
**詳細解答**　分母 $1+t$ の $t=0$ での値は $1\ne0$ なので $1+t\in S_0$ です。従って $u$ は局所環の元です。評価は

$$
\varepsilon_0(u)=\frac{0^2+1}{1+0}=1.
$$

$u-1$ を共通分母にすると

$$
u-1=\frac{t^2+1-(1+t)}{1+t}
=\frac{t(t-1)}{1+t}
$$

であり、分子は原点で零なので $u-1\in\mathfrak m_0A_{\mathfrak m_0}$ です。従って商では $u$ と $1$ が一致します。
<!-- solution-end -->

**Level B：定理の適用と反例**

### B1. 零因子を分母にする

$X=V_{\mathbb C}(xy)$、$A=A(X)$ とし、$D_X(x)\ne\varnothing$ と $y/1=0$ in $A_x$ を示せ。$y\ne0$ in $A$ と矛盾しない理由を説明せよ。

- Level: B
- ID: AG1-04-B1

<!-- solution-start -->
**詳細解答**　$(1,0)\in X$ で $x(1,0)=1$ なので $D_X(x)$ は空でなく、$x$ の冪は $(1,0)$ で零にならないため乗法的集合を作ります。$xy=0$ は $X$ 上の関数として零なので、$A$ では $xy=0$ です。[局所化の零判定](#prop-ag1-04-fractions-ring)で $u=x$ を選べば

$$
x\cdot y=0 \quad\Longrightarrow\quad y/1=0\text{ in }A_x.
$$

一方 $(0,1)\in X$ で $y(0,1)=1$ だから $y\ne0$ in $A$ です。標準写像 $A\to A_x$ は零因子 $x$ を可逆にするため単射でなく、$y$ が核へ入ります。これは、もとの環の非零元が局所化で零になり得る具体例です。
<!-- solution-end -->

### B2. 普遍性から準同型を延長する

$R=\mathbb C[t]$、$S=\{t^n:n\ge0\}$、$B=\mathbb C[u,u^{-1}]$ とする。$\varphi:R\to B$、$\varphi(t)=u^2$ を定義し、局所化からの一意な延長を具体的に求めよ。

- Level: B
- ID: AG1-04-B2

<!-- solution-start -->
**詳細解答**　多項式 $a(t)=\sum_{j=0}^d c_jt^j$ に対し $\varphi(a)=\sum_{j=0}^d c_ju^{2j}$ と置けば加法と積、定数、単位元を保ちます。$\varphi(t^n)=u^{2n}$ は $B$ の単元で逆元は $u^{-2n}$ です。従って[局所化の普遍性](#thm-ag1-04-universal)を適用でき、

$$
\overline\varphi\left(\frac{a(t)}{t^n}\right)
=a(u^2)u^{-2n}
$$

となります。特に $\overline\varphi(1/t)=u^{-2}$ です。一意性は $a/t^n=(a/1)(t/1)^{-n}$ の像がこの式に強制されることから従います。
<!-- solution-end -->

### B3. 原点では延長できない関数

$X=\mathbb C$ で $1/t$ は $D_X(t)$ 上の分数関数である。原点 $0$ の開近傍 $U$ 上に、ある $a/s\in A_{\mathfrak m_0}$ によって表され、$U\cap D_X(t)$ で $1/t$ と一致する関数が存在しないことを証明せよ。

- Level: B
- ID: AG1-04-B3

<!-- solution-start -->
**詳細解答**　存在すると仮定すると、$s(0)\ne0$ である $a,s\in\mathbb C[t]$ があり、$0\in U\subseteq D_X(s)$ として $t\ne0$ の点では

$$
\frac{a(t)}{s(t)}=\frac1t
\quad\Longrightarrow\quad
t\,a(t)-s(t)=0
$$

です。$U$ は $\mathbb C$ の非空Zariski開集合なので、[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)によって補集合は有限で、$U\setminus\{0\}$ は無限です。従って多項式 $t\,a(t)-s(t)$ は無限個の零点を持ち、零多項式です。$t=0$ を代入すると $-s(0)=0$ ですが、これは $s(0)\ne0$ に矛盾します。壊れている条件は**分母が原点で非零**であることであり、$D_X(t)$ 上での関数の正しさではありません。
<!-- solution-end -->

**Level C：局所環が枝を見分ける**

### C1. 二軸の交点と滑らかな点を比較する

$X=V_{\mathbb C}(xy)\subset\mathbb C^2$、$A=A(X)$、$o=(0,0)$、$q=(1,0)$ とする。

1. $A_x$ で $x/1$ は単元、$y/1=0$ であることを示せ。
2. $A_{\mathfrak m_o}$ で $x/1$ と $y/1$ はともに非零だが積は零であることを示せ。
3. $A_{\mathfrak m_q}$ で $x/1$ は単元、$y/1=0$ であることを示せ。
4. $1/x$ は $q$ の近傍で分数関数として定義できるが、$o$ の近傍へは延長できないことを示せ。

- Level: C
- ID: AG1-04-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$x(1,0)=1$ なので $D_X(x)$ は空ではありません。局所化の定義で $(x/1)(1/x)=1$ です。また $xy=0$ in $A$ だから $y/1=(xy)/x=0$ です。

**(2)**　$xy=0$ は $A_{\mathfrak m_o}$ でも保たれるので積は零です。仮に $x/1=0$ なら[零判定](#prop-ag1-04-fractions-ring)により、$u(o)\ne0$ で $ux=0$ in $A$ となる $u$ が存在します。$(a,0)\in X$、$a\ne0$ に代入すると $a\,u(a,0)=0$ ですから $u(a,0)=0$ です。[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)より $u(t,0)$ は無限個の根を持つので恒等的に零であり、$u(o)=0$、矛盾です。

$y/1=0$ だとすれば $v(o)\ne0$ かつ $vy=0$ となる $v\in A$ が存在します。$(0,b)$（$b\ne0$）に代入すると $b\,v(0,b)=0$ なので $v(0,b)=0$。よって[一変数多項式の根の有限性](../AG1-01/index.md#prop-ag1-01-affine-line-closed)から $v(0,t)$ は零多項式となり $v(o)=0$、矛盾です。従って $y/1$ も非零です。この局所環には非零零因子が残ります。

**(3)**　$q=(1,0)$ では $x(q)=1\ne0$ なので[単元判定](#thm-ag1-04-local-ring)により $x/1$ は単元です。$xy=0$ にその逆元を掛けると $y/1=0$ です。これは $q$ の近傍 $D_X(x)$ では $y$ 軸の枝が見えなくなることに対応します。

**(4)**　$1/x$ は $D_X(x)$ 上で定義され、$q\in D_X(x)$ なので $q$ の分数関数の芽です。原点 $o$ の近傍へ延長できると仮定しましょう。すると $a,u\in A$、$u(o)\ne0$ と、$o$ を含む相対Zariski開集合 $W\subseteq D_X(u)$ が存在し、**$W\cap D_X(x)$ 上で** $a/u=1/x$ が成立します。ここで、近傍 $W$ の外にまで等号を拡張できるとは仮定していません。

[主開集合の基底性](#prop-ag1-04-basic-opens)を $o\in W$ に適用し、$o\in D_X(h)\subseteq W$ となる $h\in A$ を選びます。特に $h(o)\ne0$ です。$x$ 軸に制限すると $h(t,0)$ は定数項が $h(o)\ne0$ の一変数多項式です。[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)によってその根は有限個しかないので、$h(t,0)\ne0$ かつ $t\ne0$ を満たす複素数 $t$ は無限個あります。

そのような $t$ について $(t,0)\in D_X(h)\cap D_X(x)\subseteq W\cap D_X(x)$ です。$W\subseteq D_X(u)$ だから $u(t,0)\ne0$ でもあり、仮定した等号に分母 $t\,u(t,0)$ を掛けて

$$
\frac{a(t,0)}{u(t,0)}=\frac1t
\quad\Longrightarrow\quad
t\,a(t,0)-u(t,0)=0
$$

を得ます。左辺は $t$ の一変数多項式であり、無限個の点で零なので零多項式です。$t=0$ を代入すると $-u(0,0)=0$、すなわち $u(o)=0$ となりますが、これは $u(o)\ne0$ に矛盾します。従って $1/x$ は枝の交点 $o$ では芽を定めません。
<!-- solution-end -->

## 7. 次章へ：局所化した環のイデアルをどう管理するか

点での局所環を作ると、関数が可逆になるかは点での値から判定でき、関数の芽との一致も証明できました。しかし一般の多項式環・座標環には多くのイデアルが存在します。イデアルを小さい集合の元で生成できるのか、無限に複雑なイデアルが現れるのかを管理する必要があります。次章 AG1-05 では Noether 環と Hilbert の基底定理を扱い、後の零点定理や次元論へ進む土台を整えます。
