# AG3-03 局所環付き空間とアフィンスキーム

[前章の構造層](../AG3-02/index.md#def-ag3-02-structure-sheaf)は、素スペクトル上で「局所的に同じ分数で表せる関数」を集めました。[素点での茎](../AG3-02/index.md#thm-ag3-02-stalk)は $A_{\mathfrak p}$ であり、点の近くで逆数を取れる関数を識別します。ところが位相空間としては $\operatorname{Spec}k$ と $\operatorname{Spec}(k[\varepsilon]/(\varepsilon^2))$ はともに一点で、この局所情報を区別できません。

そこで空間と、その上で許される関数を一体として扱う仕組みを作ります。さらに環準同型 $A\to B$ が、単なる連続写像だけでなく関数の引き戻しを伴う写像を与えること、そして一つの環から作った空間どうしではすべての写像が環準同型から復元できることを証明します。最後に主開集合と商環を計算し、点と関数を同時に動かす意味を確かめます。

以下、環は可換単位的とし、零環も許します。準同型は単位元を保ちます。[環の層](../AG2-05/index.md#def-ag2-05-sheaf-axioms)と[局所化](../AG1-04/index.md#def-ag1-04-localization)の基本事項を使います。

## 1. 一点ごとに局所環を持つ空間

$k[t]_{(t)}$ では $t$ は非単元、$1+t$ は単元です。通常の位相空間では、こうした「点の近くで何を割れるか」という情報を持てません。局所環とはただ一つの極大イデアルを持つ環です。

<a id="def-ag3-03-lrs"></a>

<!-- formal-statement-start -->
> **定義（局所環付き空間）**  
> 位相空間 $X$ とその上の可換単位的環の層 $\mathcal O_X$ の組を考える。  
> すべての $x\in X$ で茎 $\mathcal O_{X,x}$ が局所環なら、組 $(X,\mathcal O_X)$ を局所環付き空間という。  
> 茎の唯一の極大イデアルを $\mathfrak m_x$ と書き、剰余体を次で定める。

$
\kappa(x)=\mathcal O_{X,x}/\mathfrak m_x.
$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-03-lrs -->
### 例：一点の空間に残る異なる関数

**定義の確認** $X=\operatorname{Spec}k$ の素点は $(0)$ のみで、茎は $k$、極大イデアルは $(0)$、剰余体は $k$ です。一方 $D=k[\varepsilon]/(\varepsilon^2)$ の素点は $(\varepsilon)$ のみです。$a+b\varepsilon$ が $(\varepsilon)$ に入らなければ $a\ne0$ で、その逆数は $a^{-1}-ba^{-2}\varepsilon$ です。よって $D$ は極大イデアル $(\varepsilon)$ を持つ局所環、茎 $D_{(\varepsilon)}=D$ であり、$\operatorname{Spec}D$ も局所環付き空間です。両者の点は一つずつでも、$D$ の茎には非零の平方零元があります。
<!-- definition-example-end -->

<a id="thm-ag3-03-affine-lrs"></a>

<!-- formal-statement-start -->
> **定理（素スペクトルの局所環付き空間性）**  
> 任意の可換単位的環 $A$ に対し、構造層を備えた $\operatorname{Spec}A$ は局所環付き空間である。$\mathfrak p\in\operatorname{Spec}A$ の茎は $A_{\mathfrak p}$、極大イデアルは $\mathfrak p A_{\mathfrak p}$、剰余体は $\operatorname{Frac}(A/\mathfrak p)$ に同型である。
<!-- formal-statement-end -->

### 証明の見取り図

[構造層の茎の同型](../AG3-02/index.md#thm-ag3-02-stalk)から、残るのは局所化環の単元の判定です。分数 $a/s$ が単元になるのは $a\notin\mathfrak p$ の場合と分かれば、非単元の全体が唯一の極大イデアルになります。

<!-- proof-start -->
### 証明

[茎の定理](../AG3-02/index.md#thm-ag3-02-stalk)によって $\mathcal O_{\operatorname{Spec}A,\mathfrak p}\simeq A_{\mathfrak p}$ です。$s\notin\mathfrak p$ として $a/s\in A_{\mathfrak p}$ を取ります。$a\notin\mathfrak p$ なら $s/a$ が逆元です。逆に $a\in\mathfrak p$ で $a/s$ が可逆なら、ある $b/t$ と $u\notin\mathfrak p$ が存在して $u(ab-st)=0$ です。$ab\in\mathfrak p$ より $ust\in\mathfrak p$ ですが、$u,s,t\notin\mathfrak p$ と素性に矛盾します。

従って非単元はちょうど $\mathfrak p A_{\mathfrak p}$ の元です。どの真のイデアルも単元を含まないため、このイデアルに含まれます。よって唯一の極大イデアルです。分数 $a/s$ を $(a+\mathfrak p)/(s+\mathfrak p)$ へ送る写像は $\operatorname{Frac}(A/\mathfrak p)$ への全射で、核は $\mathfrak p A_{\mathfrak p}$ です。[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)から剰余体の表示を得ます。$A=0$ なら素スペクトルが空なので点に関する条件は空虚に成立します。
<!-- proof-end -->

## 2. 関数を引き戻す射と局所性

連続写像 $f:Y\to X$ だけでは、$X$ 上の関数を $Y$ 上でどう読むか決まりません。開集合上の関数を逆像開集合へ引き戻し、かつ点の近くで非単元を非単元に送ることを要求します。

<a id="def-ag3-03-morphism"></a>

<!-- formal-statement-start -->
> **定義（局所環付き空間の射）**  
> 局所環付き空間 $(Y,\mathcal O_Y)$ から $(X,\mathcal O_X)$ への射とは、連続写像 $f:Y\to X$ と、任意の開集合 $U\subseteq X$ での単位的環準同型

$$
f_U^\#:\mathcal O_X(U)\longrightarrow\mathcal O_Y(f^{-1}(U))
$$

> の族であって、開集合の包含による制限と両立し、各 $y\in Y$ での茎の準同型

$$
f_y^\#:\mathcal O_{X,f(y)}\longrightarrow\mathcal O_{Y,y}
$$

> が局所準同型となるものをいう。すなわち、茎の極大イデアルについて次が必要である。

$$
(f_y^\#)^{-1}(\mathfrak m_y)=\mathfrak m_{f(y)}.
$$

> 射の合成は点写像と切断の引き戻しを順に合成して定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-03-morphism -->
### 例：双対数から体への商

**定義の確認** $D=k[\varepsilon]/(\varepsilon^2)$ から $k$ への準同型 $\pi:D\to k$、$a+b\varepsilon\mapsto a$ を使います。二つの素スペクトルは一点なので、点写像は連続です。全体開集合の切断環の写像を $\pi$ とし、空集合への制限を唯一の写像とすれば層の制限と両立します。茎の極大イデアルについて $\pi^{-1}((0))=(\varepsilon)$ であり局所的です。従ってこれは $\operatorname{Spec}k\to\operatorname{Spec}D$ の射です。
<!-- definition-example-end -->

局所環 $R,S$ の準同型 $\phi:R\to S$ が局所的であることは $\phi(\mathfrak m_R)\subseteq\mathfrak m_S$ と同値です。像の包含があれば $\mathfrak m_R\subseteq\phi^{-1}(\mathfrak m_S)$ であり、$R\setminus\mathfrak m_R$ は単元なので逆像に入りません。逆像の等号からは像の包含が従います。

この条件は自動的ではありません。$k[t]_{(t)}\hookrightarrow k(t)$ は単位的環準同型ですが、左辺の非単元 $t$ が右辺では単元です。右辺の極大イデアル $(0)$ の逆像は $(0)$ で、左辺の極大イデアル $(t)$ ではありません。

<a id="prop-ag3-03-residue"></a>

<!-- formal-statement-start -->
> **命題（射に伴う剰余体の準同型）**  
> 局所環付き空間の射 $(f,f^\#):Y\to X$ と $y\in Y$ は、自然な体の準同型 $\kappa(f(y))\to\kappa(y)$ を誘導する。
<!-- formal-statement-end -->

### 証明の見取り図

茎の写像が極大イデアルを極大イデアルの中へ送ることが、商環での定義を可能にします。

<!-- proof-start -->
### 証明

$R=\mathcal O_{X,f(y)}$、$S=\mathcal O_{Y,y}$、$\phi=f_y^\#$ とします。局所性により $\phi(\mathfrak m_R)\subseteq\mathfrak m_S$ なので、$a+\mathfrak m_R\mapsto\phi(a)+\mathfrak m_S$ は剰余類の取り方に依りません。実際 $a-b\in\mathfrak m_R$ なら $\phi(a)-\phi(b)\in\mathfrak m_S$ です。加法・乗法と $1$ を保ち、体から体への単位的準同型です。
<!-- proof-end -->

## 3. 環準同型は局所環付き空間の射を与える

[素点の逆像写像](../AG3-01/index.md#prop-ag3-01-contraction)とその[連続性](../AG3-02/index.md#prop-ag3-02-continuity)は既習です。今回は分数切断をどのように引き戻すかを加えます。

<a id="thm-ag3-03-spec-map"></a>

<!-- formal-statement-start -->
> **定理（環準同型が定める射）**  
> 可換単位的環の準同型 $\alpha:A\to B$ は、局所環付き空間の射 $\operatorname{Spec}(\alpha):\operatorname{Spec}B\to\operatorname{Spec}A$ を定める。点写像は $\mathfrak q\mapsto\alpha^{-1}(\mathfrak q)$ であり、$D_A(a)$ 上の切断の写像は次で与えられる。

$$
A_a\longrightarrow B_{\alpha(a)},\qquad
\frac{b}{a^n}\longmapsto\frac{\alpha(b)}{\alpha(a)^n}.
$$

> $\mathfrak q\in\operatorname{Spec}B$ で $\mathfrak p=\alpha^{-1}(\mathfrak q)$ とすれば、茎の写像は $A_{\mathfrak p}\to B_{\mathfrak q}$、$b/s\mapsto\alpha(b)/\alpha(s)$ であり局所準同型となる。この構成は恒等射と合成に両立する。
<!-- formal-statement-end -->

### 証明の見取り図

各点での局所分数 $b/s$ の分子・分母に $\alpha$ を適用します。分母の非消失、分数表示に依らないこと、同じ式が近傍でも使えること、茎の局所性の順に確認します。

<!-- proof-start -->
### 証明

$f(\mathfrak q)=\alpha^{-1}(\mathfrak q)$ とします。[開集合の逆像公式](../AG3-02/index.md#prop-ag3-02-continuity)によって $f^{-1}(D_A(a))=D_B(\alpha(a))$ であり $f$ は連続です。

$U\subseteq\operatorname{Spec}A$ を開集合、$s\in\mathcal O_A(U)$ とします。各 $\mathfrak q\in f^{-1}(U)$ で $\mathfrak p=f(\mathfrak q)$ とおくと、$s(\mathfrak p)=b/t\in A_{\mathfrak p}$ と局所的に表示できます。$t\notin\mathfrak p$ から $\alpha(t)\notin\mathfrak q$ なので

$$
(f_U^\#s)(\mathfrak q)=\alpha(b)/\alpha(t)\in B_{\mathfrak q}
$$

と置けます。別表示 $b'/t'$ が $A_{\mathfrak p}$ で同じ値なら、[局所化の分数の同値関係](../AG1-04/index.md#def-ag1-04-localization)により $u\notin\mathfrak p$ で $u(bt'-b't)=0$ となる元があります。像を取ると

$$
\alpha(u)\{\alpha(b)\alpha(t')-\alpha(b')\alpha(t)\}=0,
\qquad \alpha(u)\notin\mathfrak q,
$$

なので $B_{\mathfrak q}$ でも一致します。$s$ が $\mathfrak p$ の近傍 $W$ で同じ分数 $b/t$ として書けるなら、その逆像 $f^{-1}(W)$ では $\alpha(b)/\alpha(t)$ と書けます。[構造層の定義](../AG3-02/index.md#def-ag3-02-structure-sheaf)の局所表示条件を満たすため、$f_U^\#s$ は切断です。加法・乗法・単位元の保存と制限との両立は、直前に定めた分数表示を各点で比較すると従います。

$\mathfrak q$ での茎の写像を考えます。分数 $b/t$ が $A_{\mathfrak p}$ の極大イデアルに入るのは $b\in\mathfrak p$ の場合、像が $B_{\mathfrak q}$ の極大イデアルに入るのは $\alpha(b)\in\mathfrak q$ の場合です。$\mathfrak p=\alpha^{-1}(\mathfrak q)$ より二条件は同値です。従って[茎の極大イデアル](#thm-ag3-03-affine-lrs)について逆像が一致し局所的です。

主開集合では[切断環の定理](../AG3-02/index.md#thm-ag3-02-principal-sections)によって切断を $b/a^n$ と書けるので表示式が従います。合成 $A\xrightarrow{\alpha}B\xrightarrow{\beta}C$ では分子・分母が $(\beta\circ\alpha)(b),(\beta\circ\alpha)(t)$ に移り、点写像は $(\beta\circ\alpha)^{-1}=\alpha^{-1}\circ\beta^{-1}$ です。恒等準同型は分数を変えないため恒等射になります。
<!-- proof-end -->

**具体例。** $k[t]\to k[s]$、$t\mapsto s^2$ では、点 $(s-a)$ は $(t-a^2)$ へ移り、$D(t)$ の逆像は $D(s^2)=D(s)$ です。切断 $1/t$ の引き戻しは $1/s^2$ になります。$s=0$ で分母を逆にできないことも、開集合の逆像と一致します。

## 4. アフィンスキームと射の復元

一つの環の素スペクトル全体として表せる局所環付き空間を、これから基本部品として使います。

<a id="def-ag3-03-affine-scheme"></a>

<!-- formal-statement-start -->
> **定義（アフィンスキーム）**  
> ある可換単位的環 $A$ について $(\operatorname{Spec}A,\mathcal O_{\operatorname{Spec}A})$ と局所環付き空間として同型な空間をアフィンスキームという。同型とは、互いに逆となる局所環付き空間の射の組である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-03-affine-scheme -->
### 例：直線と厚み付き一点

**定義の確認** $k[t]$、$k[\varepsilon]/(\varepsilon^2)$ はいずれも可換単位的環なので、その素スペクトルは定義どおりアフィンスキームです。前者の点は多項式の素イデアルで、後者の点は $(\varepsilon)$ のみですが、どちらも局所環と構造層を含む対象です。後者が $\operatorname{Spec}k$ と同型ではないことは、直後の定理から分かります。
<!-- definition-example-end -->

<a id="thm-ag3-03-affine-fully-faithful"></a>

<!-- formal-statement-start -->
> **定理（アフィンスキームの射と環準同型の対応）**  
> 任意の可換単位的環 $A,B$ について自然な全単射がある。

$$
\operatorname{Hom}_{\mathrm{LRS}}(\operatorname{Spec}B,\operatorname{Spec}A)
\simeq \operatorname{Hom}_{\mathrm{Ring}}(A,B).
$$

> 恒等射・合成と両立し、特に $\operatorname{Spec}A$ と $\operatorname{Spec}B$ が局所環付き空間として同型である必要十分条件は $A\simeq B$ である。
<!-- formal-statement-end -->

### 証明の見取り図

前節の構成が一方の向きです。逆方向は全体切断の引き戻し $A\to B$ を取り、**茎の局所性によって点写像を復元**し、主開集合上の分数の像が一意に決まることを示します。

<!-- proof-start -->
### 証明

$(f,f^\#):\operatorname{Spec}B\to\operatorname{Spec}A$ を任意の局所環付き空間の射とします。[全体開集合の切断環](../AG3-02/index.md#thm-ag3-02-principal-sections)はそれぞれ $A,B$ なので、全体の切断の引き戻しから準同型 $\alpha=f^\#_{\operatorname{Spec}A}:A\to B$ が定まります。

$\mathfrak q\in\operatorname{Spec}B$、$\mathfrak p=f(\mathfrak q)$ を固定します。$a\in A$ の芽 $a/1$ が $A_{\mathfrak p}$ の単元となる条件は $a\notin\mathfrak p$ です。[局所環付き空間の射の定義](#def-ag3-03-morphism)による茎の局所準同型では、単元の像は単元で、非単元の像は極大イデアルに入ります。全体切断との両立性によって $a/1$ の像は $\alpha(a)/1\in B_{\mathfrak q}$ です。従って

$$
a\notin\mathfrak p
\Longleftrightarrow a/1\in A_{\mathfrak p}^{\times}
\Longleftrightarrow \alpha(a)/1\in B_{\mathfrak q}^{\times}
\Longleftrightarrow\alpha(a)\notin\mathfrak q.
$$

よって $\mathfrak p=\alpha^{-1}(\mathfrak q)$ となり、点写像は一意です。

次に $U=D_A(a)$ とします。逆像は $D_B(\alpha(a))$ です。[主開切断の定理](../AG3-02/index.md#thm-ag3-02-principal-sections)を適用すると引き戻しは $A_a\to B_{\alpha(a)}$ の準同型です。制限との両立性から $b/1$ の像は $\alpha(b)/1$ であり、$a/1$ は単元なので逆元の像は $\alpha(a)^{-1}$ です。従って

$$
f^\#_U(b/a^n)=f^\#_U(b/1)\,f^\#_U(a/1)^{-n}
=\alpha(b)/\alpha(a)^n.
$$

これは[環準同型からの構成](#thm-ag3-03-spec-map)と一致します。任意の開集合は主開集合で覆われ、二つの切断がそれぞれへの制限で一致すれば[層の分離公理](../AG2-05/index.md#def-ag2-05-sheaf-axioms)により一致します。従ってすべての開集合上でも射は一致します。

逆に前節の構成は任意の $\alpha$ から射を与え、全体切断の引き戻しは $\alpha$ 自身です。よって全単射です。合成については[前節の証明](#thm-ag3-03-spec-map)で確認したので、環同型の逆準同型から逆射が作れ、射の同型からは全体切断上の逆準同型が得られます。
<!-- proof-end -->

この定理により、アフィンスキームは環の情報を失わずに幾何学として扱えることが分かります。特に一点空間であっても、全体切断に平方零元が残ればその厚みは消えません。

## 5. 主開集合と商環を手で扱う

$D_A(f)$ では $f$ が可逆なので、最初から $A_f$ のスペクトルとして扱えるはずです。これを位相と層の両方について検証します。

<a id="prop-ag3-03-principal-affine"></a>

<!-- formal-statement-start -->
> **命題（主開集合のアフィン表示）**  
> 可換単位的環 $A$ と $f\in A$ に対し、$D_A(f)$ に $\operatorname{Spec}A$ の構造層を制限した局所環付き空間は $\operatorname{Spec}A_f$ と自然に同型である。
<!-- formal-statement-end -->

### 証明の見取り図

局所化の素点は $f$ を含まない素点と対応します。$D_A(fg)$ と $D_{A_f}(g/1)$ の切断環を比較し、茎でも同じ分数になっていることを確認します。

<!-- proof-start -->
### 証明

$\lambda:A\to A_f$ の[スペクトル射](#thm-ag3-03-spec-map)を考えます。$A_f$ の素イデアル $\mathfrak q$ の逆像 $\mathfrak p$ は $f\notin\mathfrak p$ を満たします。逆に $\mathfrak p\in D_A(f)$ なら $A_f/\mathfrak pA_f\simeq(A/\mathfrak p)_f$ は整域の非零元での局所化なので整域であり、$\mathfrak pA_f$ は素イデアルです。両操作が逆であることは、$b/f^n\in\mathfrak q$ と $b\in\lambda^{-1}(\mathfrak q)$ が同値であることから分かります。

任意の $g\in A$ に対して $D_A(fg)$ の逆像は $D_{A_f}(g/1)$ です。$A_f$ の元はすべて $g/f^n$ の形で、その主開集合は $D_{A_f}(g/1)$ に等しいため、これは双方の開基を対応させる同相です。

[主開切断環](../AG3-02/index.md#thm-ag3-02-principal-sections)を両方に適用すると

$$
\mathcal O_{\operatorname{Spec}A}(D_A(fg))=A_{fg},
\qquad
\mathcal O_{\operatorname{Spec}A_f}(D_{A_f}(g/1))=(A_f)_{g/1}.
$$

右辺と左辺は[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)により同型です。具体的に $b/(fg)^n$ を $(b/f^n)/(g/1)^n$ へ写せば、$f,g$ の逆元を持つ環として逆写像も定まります。これらの同型は制限と両立し、各茎でも同じ分数式を与えるので局所同型です。$f$ が冪零であれば両空間とも空であり、結論は同様に成立します。
<!-- proof-end -->

例えば $D_{k[t]}(t)\simeq\operatorname{Spec}k[t,t^{-1}]$ です。元のアフィン直線全体では $1/t$ は大域正則ではありませんが、この主開集合の上では正則です。

<a id="prop-ag3-03-quotient-image"></a>

<!-- formal-statement-start -->
> **命題（商環が定める閉集合への射）**  
> $A$ を可換単位的環、$I\subseteq A$ をイデアルとする。商準同型 $A\to A/I$ が定める射の点写像は、$\operatorname{Spec}(A/I)$ を $V_A(I)$ に同相に写す。$I\subseteq\mathfrak p$ に対応する点での茎の準同型は全射であり、

$$
A_{\mathfrak p}\longrightarrow (A/I)_{\mathfrak p/I}
\simeq A_{\mathfrak p}/IA_{\mathfrak p}
$$

> と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

素点は商で割る前後で一対一に対応し、閉集合の対応から同相が分かります。茎の核は「局所化した後の $I$」です。

<!-- proof-start -->
### 証明

$A/I$ の素イデアル $\mathfrak q$ の逆像 $\mathfrak p$ は $I$ を含む素イデアルです。逆に $I\subseteq\mathfrak p$ が素なら $(A/I)/(\mathfrak p/I)\simeq A/\mathfrak p$ が整域なので $\mathfrak p/I$ は素です。これは逆対応となり点像は $V_A(I)$ です。$J\subseteq A$ の閉集合 $V_A(J)\cap V_A(I)$ は商側の $V_{A/I}((I+J)/I)$ に対応します。$V_A(I)$ の相対閉集合がすべてこの形なので同相です。

局所分数 $a/s$ の像は $(a+I)/(s+I)$ であり、$s\notin\mathfrak p$ なので分母の条件を満たします。任意の商側の分数が持ち上がるから全射です。核に入るのは、ある $u\notin\mathfrak p$ に対して $ua\in I$ となる $a/s$ です。そのとき $a/s=(ua)/(us)\in IA_{\mathfrak p}$ です。逆に $IA_{\mathfrak p}$ の元はすべて0へ写るので核が一致します。[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)から商の同型が従います。
<!-- proof-end -->

$A=k[t]$、$I=(t^2)$ では $V(t^2)=V(t)$ ですが、$(A/I)_{(t)/(t^2)}$ には $t$ の非零な平方零剰余類が残ります。$I=(t)$ とした場合の茎は体 $k$ なので、同じ閉集合にも異なる局所環が付きます。

## 6. 演習：定義・分数・射の復元

### A1. 一点の二種類の茎

体 $k$ と $D=k[\varepsilon]/(\varepsilon^2)$ について、各素スペクトルの素点・茎・極大イデアル・剰余体を求めよ。

- Level: A
- ID: AG3-03-A1

<!-- solution-start -->
**詳細解答。** 体 $k$ の唯一の素イデアルは $(0)$ で、茎は $k_{(0)}=k$、極大イデアルは $(0)$、剰余体は $k$ です。$D$ で素イデアル $\mathfrak p$ があれば $\varepsilon^2=0\in\mathfrak p$ から $\varepsilon\in\mathfrak p$ です。$D/(\varepsilon)\simeq k$ なので唯一の素イデアルは $(\varepsilon)$ です。$a+b\varepsilon$（$a\ne0$）の逆元は $a^{-1}-ba^{-2}\varepsilon$ なので $D$ は局所環で、茎は $D$、極大イデアルは $(\varepsilon)$、剰余体は $k$ です。両者の茎は平方零元の有無で異なります。
<!-- solution-end -->

### A2. 局所性の失敗

$R=k[t]_{(t)}$、$K=k(t)$ に対して包含 $R\hookrightarrow K$ が局所準同型でないことを示せ。

- Level: A
- ID: AG3-03-A2

<!-- solution-start -->
**詳細解答。** $R$ の分数 $a(t)/b(t)$（$b(0)\ne0$）が単元なのは $a(0)\ne0$ のときです。従って極大イデアルは $tR$ です。$K$ は体なので極大イデアルは $(0)$ だけで、その逆像は包含の単射性から $(0)$ です。$(0)\ne tR$ なので[局所準同型の条件](#def-ag3-03-morphism)を満たしません。これは左辺で非単元の $t$ が右辺では $t^{-1}$ を持つことと同じです。
<!-- solution-end -->

### A3. 二乗写像と分数

$\alpha:k[t]\to k[s]$、$t\mapsto s^2$ について、$D(t)$ の逆像と切断 $(1+t)/t$ の引き戻しを計算せよ。

- Level: A
- ID: AG3-03-A3

<!-- solution-start -->
**詳細解答。** [環準同型が定める連続写像](../AG3-02/index.md#prop-ag3-02-continuity)から $D(t)$ の逆像は $D(s^2)$ で、素性により $s^2\notin\mathfrak q$ と $s\notin\mathfrak q$ は同値だから $D(s^2)=D(s)$ です。[環準同型が定める射](#thm-ag3-03-spec-map)に分子 $1+t$ と分母 $t$ を代入して

$$
(1+t)/t\longmapsto (1+s^2)/s^2=1+s^{-2}
$$

を得ます。これは $D(s)$ 上の切断 $k[s,s^{-1}]$ の元です。
<!-- solution-end -->

### A4. 剰余体へ降りる写像

$\pi:k[\varepsilon]/(\varepsilon^2)\to k$、$\varepsilon\mapsto0$ が定める射について点・茎・剰余体の写像を記せ。

- Level: A
- ID: AG3-03-A4

<!-- solution-start -->
**詳細解答。** $\operatorname{Spec}k$ の唯一の点 $(0)$ の逆像は $(\varepsilon)$ なので、点写像は $(0)\mapsto(\varepsilon)$ です。茎はそれぞれ $k$ と $D=k[\varepsilon]/(\varepsilon^2)$ であり、写像は $D\to k$、$a+b\varepsilon\mapsto a$ です。$\pi^{-1}((0))=(\varepsilon)$ なので局所的です。[剰余体の写像](#prop-ag3-03-residue)は $D/(\varepsilon)\to k/(0)$ であり、両辺を $k$ と同一視すると恒等準同型です。剰余体が同じでも茎自体は異なります。
<!-- solution-end -->

### B1. 冪零な閉部分空間

$A=k[t]$、$B=A/(t^2)$ とし $\operatorname{Spec}B\to\operatorname{Spec}A$ の像と、茎の準同型の核を求めよ。

- Level: B
- ID: AG3-03-B1

<!-- solution-start -->
**詳細解答。** $B$ の素点は $\bar t^2=0$ の素性から $\bar t$ を含み、$B/(\bar t)\simeq k$ より $(\bar t)$ しかありません。対応する $A$ の素点は $(t)$、像は $V(t^2)=V(t)=\{(t)\}$ です。[商環の茎の公式](#prop-ag3-03-quotient-image)を $\mathfrak p=(t)$、$I=(t^2)$ に適用して

$$
k[t]_{(t)}\longrightarrow k[t]_{(t)}/t^2k[t]_{(t)}
$$

を得て、核は $t^2k[t]_{(t)}$ です。右辺は $B$ に等しく、$\bar t\ne0$、$\bar t^2=0$ なので厚みが残ります。
<!-- solution-end -->

### B2. 主開集合の切断を比較する

$A=k[x,y]$ とし $D_A(x)\simeq\operatorname{Spec}A_x$ の点対応を書け。さらに $D_A(xy)$ の切断環を両側で求めよ。

- Level: B
- ID: AG3-03-B2

<!-- solution-start -->
**詳細解答。** $A_x=k[x,x^{-1},y]$ です。[主開集合のアフィン表示](#prop-ag3-03-principal-affine)より、点の対応は $\mathfrak q\mapsto\mathfrak q\cap A$ と $\mathfrak p\mapsto\mathfrak pA_x$ であり、$x\notin\mathfrak p$ が条件です。$D_A(xy)\subseteq D_A(x)$ は $D_{A_x}(y)$ に対応します。[主開切断の定理](../AG3-02/index.md#thm-ag3-02-principal-sections)を用いると

$$
A_{xy}=k[x,x^{-1},y,y^{-1}],\qquad
(A_x)_y=(k[x,x^{-1},y])_y=k[x,x^{-1},y,y^{-1}].
$$

両方で $x,y$ の逆元を持つので分数 $h/(x^my^n)$ を同じ元として同一視できます。
<!-- solution-end -->

### B3. 全体切断が決める射

$X=\operatorname{Spec}k[t]$、$Y=\operatorname{Spec}k[s]$ とする。射 $Y\to X$ の全体切断の準同型が $t\mapsto s^3+1$ のとき、$(s-a)$ の像と切断 $t^{-2}$ の引き戻しを求めよ。

- Level: B
- ID: AG3-03-B3

<!-- solution-start -->
**詳細解答。** [射の復元定理](#thm-ag3-03-affine-fully-faithful)から射は $\alpha(t)=s^3+1$ により一意です。$h(t)\in\alpha^{-1}((s-a))$ となる条件は $h(a^3+1)=0$ です。因数定理から点像は $(t-a^3-1)$ です。$D(t)$ の逆像は $D(s^3+1)$ で、[分数の引き戻し](#thm-ag3-03-spec-map)によって $t^{-2}\mapsto(s^3+1)^{-2}$ です。右辺はまさにこの開集合上で分母が可逆な切断です。
<!-- solution-end -->

### B4. 閉点と一般点での剰余体

$\alpha:k[t]\to k[s]$、$t\mapsto s^2$ の射について、$\mathfrak q=(s)$ と $\mathfrak q=(0)$ における点像と剰余体写像を求めよ。

- Level: B
- ID: AG3-03-B4

<!-- solution-start -->
**詳細解答。** $\mathfrak q=(s)$ の場合、$h(s^2)\in(s)$ は $h(0)=0$ と同値だから点像は $(t)$ です。両剰余体は $k$ であり、誘導写像は $k\to k$ の恒等です。

$\mathfrak q=(0)$ の場合、$h(t)\ne0$ の最高次項 $c_nt^n$ は $c_ns^{2n}\ne0$ に移るので、点像は $(0)$ です。剰余体写像は

$$
k(t)\longrightarrow k(s),\quad h(t)/g(t)\longmapsto h(s^2)/g(s^2).
$$

$g(t)\ne0$ なら $g(s^2)\ne0$ なので定義されます。これは一般点の体の準同型として、$t$ の像が $s^2$ であることを表します。
<!-- solution-end -->

### C1. 同相でも同型でないこと

$\operatorname{Spec}k$ と $\operatorname{Spec}(k[\varepsilon]/(\varepsilon^2))$ が位相同型だが局所環付き空間として同型ではないことを示せ。

- Level: C
- ID: AG3-03-C1

<!-- solution-start -->
**詳細解答。** どちらも素イデアルを一つだけ持つため一点空間で、唯一の全単射は同相です。局所環付き空間の同型があるなら、[全体切断の同型](../AG3-02/index.md#thm-ag3-02-principal-sections)により環同型 $k\simeq D=k[\varepsilon]/(\varepsilon^2)$ が存在する必要があります。しかし $D$ には $\varepsilon\ne0$、$\varepsilon^2=0$ があり、体 $k$ に非零の平方零元はありません。環同型は非零性と積を保つので矛盾します。さらに[射と環準同型の対応](#thm-ag3-03-affine-fully-faithful)から、同型射なら対応する環準同型にも逆が必要ですが、$D\to k$ は $\varepsilon$ を0に送るため単射になれず、逆を持ちません。
<!-- solution-end -->

### C2. 局所性を取り除くと点を誤って選べる

$R=k[t]_{(t)}$、$K=k(t)$、$X=\operatorname{Spec}R$、$Y=\operatorname{Spec}K$ とする。$Y$ の唯一の点を $X$ の閉点 $tR$ に送る連続写像 $f$ に、包含 $R\hookrightarrow K$ を全体切断の引き戻しとして与えたとき、環の層の射は構成できるが局所環付き空間の射にはならないことを説明せよ。また包含 $R\hookrightarrow K$ が実際に定めるアフィンスキームの射の点像と比較せよ。

- Level: C
- ID: AG3-03-C2

<!-- solution-start -->
**詳細解答。** $R$ の素点は $(0)$ と $tR$ です。局所化で残る $k[t]$ の素イデアルは $(t)$ に含まれるものだけだからです。$tR$ を含む開集合 $U$ があれば、主開基により $tR\in D_R(a)\subseteq U$ となる $a$ が存在します。$a\notin tR$ は $a$ が単元という意味なので $D_R(a)=X$、従って $U=X$ です。

$Y$ は一点なので $f$ は連続です。$U=X$ の切断の引き戻しは $R\hookrightarrow K$ とします。$tR\notin U$ なら $f^{-1}(U)=\varnothing$ なので、切断を零環 $\mathcal O_Y(\varnothing)$ に送る唯一の準同型を使います。制限との両立性はこの二場合で直接確認できます。従って環の層の射にはなります。

しかし $Y$ の点での茎写像は $R\hookrightarrow K$ であり、極大イデアル $(0)\subset K$ の逆像は $(0)\subset R$ です。これは $R$ の極大イデアル $tR$ と異なり、[局所性](#def-ag3-03-morphism)が破れます。これに対して[環準同型によるスペクトル射](#thm-ag3-03-spec-map)では、$K$ の唯一の素点 $(0)$ の逆像は $R$ の一般点 $(0)$ です。したがって同じ全体切断準同型でも、局所性を課さなければ閉点への偽の射を除外できません。
<!-- solution-end -->

次章ではアフィンスキームを共通の開部分で貼り合わせ、単一の環では全体を表しにくい空間を構成します。
