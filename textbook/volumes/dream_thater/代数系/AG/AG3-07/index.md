# AG3-07 層の射と完全列・Čechコホモロジー

[準連接層と加群の対応](../AG3-06/index.md#thm-ag3-06-affine-equivalence)から、アフィン開集合では層を加群として計算できます。しかし一枚のアフィン開集合で解ける方程式でも、複数のチャートで得た局所解が全体の解になるとは限りません。どの重なりで食い違ったのかを記録する道具が必要です。

たとえば射影直線は二つのアフィン直線で覆えます。各チャートの関数の差が重なりで零なら一つの大域関数になります。差が零でないときでも、局所関数を取り替えるだけで差を消せるかもしれません。その「消せない差」を、局所切断の組から計算して測れるようにします。

以下、環は可換・単位的、層は特に断らない限りスキーム $X$ 上の $\mathcal O_X$-加群の層とします。有限開被覆で重なりの情報を整理する方法を初等的に構成します。一般の層コホモロジーとの比較は後続章で扱い、ここでは二つを無条件に同一視しません。

## 1. 層の射はすべての開集合と制限を同時に扱う

加群準同型が元の加法とスカラー倍を保つように、層の射は各開集合の切断について線形であり、さらに小さな開集合への制限と交換しなければなりません。

<a id="def-ag3-07-sheaf-morphism"></a>

<!-- formal-statement-start -->
> **定義（加群の層の射）**  
> $\mathcal O_X$-加群の層 $\mathcal F,\mathcal G$ の射 $\phi:\mathcal F\to\mathcal G$ とは、各開集合 $U\subseteq X$ に $\mathcal O_X(U)$-線形写像 $\phi_U:\mathcal F(U)\to\mathcal G(U)$ を与え、すべての包含 $V\subseteq U$ について次の等式を満たす族である。
>
$$
\operatorname{res}^{\mathcal G}_{U,V}\circ\phi_U
=\phi_V\circ\operatorname{res}^{\mathcal F}_{U,V}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-07-sheaf-morphism -->
**定義の確認**：$A=k[t]$、$X=\operatorname{Spec}A$、$\mathcal F=\mathcal G=\mathcal O_X$ とし、各 $U$ で $\phi_U(s)=t|_U s$ と置きます。積は $\mathcal O_X(U)$-線形で、$V\subseteq U$ では $(ts)|_V=t|_V(s|_V)$ なので制限と交換します。一方、$t$ は $D(t)$ 上では単元、点 $(t)$ の茎では非単元です。層の射は一点の写像とは違い、この両方を含みます。
<!-- definition-example-end -->

点 $x$ の茎への写像 $\phi_x:\mathcal F_x\to\mathcal G_x$ は、$x$ を含む開集合での切断の芽 $[s]_x$ を $[\phi_U(s)]_x$ へ送ります。代表する開集合を小さくしても制限との可換性から同じ芽になります。

<a id="prop-ag3-07-stalk-detection"></a>

<!-- formal-statement-start -->
> **命題（層の射の茎による判定）**  
> $\mathcal O_X$-加群の層の射 $\phi:\mathcal F\to\mathcal G$ は、すべての点 $x\in X$ で $\phi_x$ が単射なら単射であり、すべての $\phi_x$ が同型なら層の同型である。
<!-- formal-statement-end -->

### 証明の見取り図

切断が各茎で零なら、各点の小さな近傍で零です。層の一意性で元の切断も零になります。同型の場合、茎での逆像を局所的に代表し、重なりでの一意性から貼ります。

<!-- proof-start -->
### 証明

すべての $\phi_x$ が単射とします。$s\in\mathcal F(U)$ が $\phi_U(s)=0$ を満たすなら、各 $x\in U$ において $\phi_x([s]_x)=0$ です。従って $[s]_x=0$。芽が零である定義から、$x$ を含む開近傍 $V_x\subseteq U$ があり $s|_{V_x}=0$ です。$(V_x)_{x\in U}$ が $U$ を覆うので層の一意性から $s=0$、すなわち $\phi_U$ は単射です。

次にすべての $\phi_x$ が同型とします。任意の $t\in\mathcal G(U)$ と $x\in U$ に対し、芽 $[t]_x$ は $\phi_x$ の像です。ある $x$ の開近傍 $W_x\subseteq U$ と $s_x\in\mathcal F(W_x)$ を用いて、$\phi_x([s_x]_x)=[t]_x$ と書けます。芽の等しさから $W_x$ を縮小して $\phi_{W_x}(s_x)=t|_{W_x}$ を満たせます。$W_x\cap W_y$ では $s_x,s_y$ の像が一致し、すでに示した単射性から $s_x|_{W_x\cap W_y}=s_y|_{W_x\cap W_y}$ です。層の貼り合わせで一意の $s\in\mathcal F(U)$ を得て $\phi_U(s)=t$ です。すべての $U$ で全単射となり、逆写像も制限と可換です。
<!-- proof-end -->

**注意**：$\phi_x$ がすべて全射でも、$\phi_X:\mathcal F(X)\to\mathcal G(X)$ が全射とは限りません。茎での全射は各点の近くでの持ち上げを保証するだけです。大域的な持ち上げの障害を後で測ります。

## 2. 完全列は茎で判定する

加群の列では「前の像と次の核が一致する」を完全性と呼びました。層の像は開集合ごとの像を並べるだけでは層の貼り合わせ条件を満たさない場合があります。そこで像は局所的に持ち上がる切断で作る必要があります。

<a id="def-ag3-07-exact-sequence"></a>

<!-- formal-statement-start -->
> **定義（層の核・像・完全列）**  
> 層の射 $\mathcal F\xrightarrow{\phi}\mathcal G$ の核は開集合 $U$ ごとの $\ker\phi_U$ を切断とする層である。像は、各点の近傍で $\phi$ による局所的な持ち上げを持つ $\mathcal G$ の切断の層である。列
>
$$
\mathcal F'\xrightarrow{\alpha}\mathcal F
\xrightarrow{\beta}\mathcal F''
$$
>
> が $\mathcal F$ で完全であるとは、$\operatorname{im}\alpha=\ker\beta$ が層として成立することをいう。$0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0$ が完全なら短完全列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-07-exact-sequence -->
**定義の確認**：$A=k[t]$ について自然な商写像 $A\to A/(t)$ を層化すると
$$
0\longrightarrow\widetilde{(t)}
\longrightarrow\mathcal O_{\operatorname{Spec}A}
\longrightarrow\widetilde{A/(t)}
\longrightarrow0
$$
が得られます。[加群列と層の完全性](../AG3-06/index.md#prop-ag3-06-exactness)から完全です。点 $(t)$ の茎では核は $tA_{(t)}$、点 $(t)$ 以外では商加群の茎が $0$ で核は構造層の茎全体になります。各点で像と核が一致します。
<!-- definition-example-end -->

<a id="thm-ag3-07-exact-stalks"></a>

<!-- formal-statement-start -->
> **定理（層の完全性の茎判定）**  
> $\mathcal O_X$-加群の層の列 $\mathcal F'\xrightarrow{\alpha}\mathcal F\xrightarrow{\beta}\mathcal F''$ が $\mathcal F$ で完全であることと、すべての点 $x\in X$ で加群列
>
$$
\mathcal F'_x\xrightarrow{\alpha_x}\mathcal F_x
\xrightarrow{\beta_x}\mathcal F''_x
$$
>
> が完全であることは同値である。特に層の射の全射性は、すべての茎の全射性と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

核は芽を取る操作と交換します。像を局所持ち上げで定義したのは、その茎を加群準同型の像と一致させるためです。

<!-- proof-start -->
### 証明

まず $(\ker\beta)_x=\ker\beta_x$ を示します。$[s]_x$ が右辺に属すなら、$[\beta_U(s)]_x=0$ です。従って $x$ のある開近傍 $V\subseteq U$ で $\beta_V(s|_V)=0$ となり、$[s]_x$ は左辺の芽です。逆の包含は核の定義から直ちに従います。

次に $(\operatorname{im}\alpha)_x=\operatorname{im}\alpha_x$ です。局所持ち上げを持つ切断の芽は $\alpha_x$ の像です。逆に $[t]_x=\alpha_x([s]_x)$ なら、芽を代表する近傍を小さくして $t=\alpha_V(s)$ とできます。その $V$ 上では像の層の切断になっています。この二つの同一視から、層の核と像が等しいことは各茎での核と像が等しいことと同値です。

逆向きに「茎で等しいなら層が等しい」ことを確かめます。二つの部分層の各茎が同じなら、片方の切断の任意の芽は他方の切断で局所的に代表されます。近傍ごとの代表は元の切断と重なりで一致するので他方の部分層で貼れます。従って部分層が等しくなります。

全射性は $\operatorname{im}\alpha=\mathcal F$ と表されるので、上の同値から各 $\alpha_x$ の全射性に等しくなります。
<!-- proof-end -->

**アフィンでの強み**：準連接層についてアフィン開 $U=\operatorname{Spec}A$ に制限すれば、[準連接層と加群の同値](../AG3-06/index.md#thm-ag3-06-affine-equivalence)と[完全性の保存](../AG3-06/index.md#prop-ag3-06-exactness)により、短完全列から切断加群の短完全列が得られます。ただし $X$ 全体がアフィンでない場合、その結論を $U=X$ に持ち込むことはできません。

## 3. 重なりでの差を並べる：Čech複体

開被覆 $\mathfrak U=(U_i)_{i=0}^{m}$ を固定します。各 $U_i$ 上で切断を選び、その差を $U_i\cap U_j$ 上で測ります。三つの開集合の交わりでは、差の差が必ず打ち消し合います。この交代和を一般の次数まで延ばします。

<a id="def-ag3-07-cech-complex"></a>

<!-- formal-statement-start -->
> **定義（Čech複体）**  
> 有限順序付き開被覆 $\mathfrak U=(U_0,\ldots,U_m)$ とアーベル群の層 $\mathcal F$ に対し、$U_{i_0\cdots i_p}=U_{i_0}\cap\cdots\cap U_{i_p}$ と置く。$p\ge0$ に対し
>
$$
C^p(\mathfrak U,\mathcal F)
=\prod_{0\le i_0<\cdots<i_p\le m}
\mathcal F(U_{i_0\cdots i_p})
$$
>
> とする。空の共通部分上の切断群は零群とする。微分 $\delta^p:C^p\to C^{p+1}$ は、各増加添字列について
>
$$
(\delta^pc)_{i_0\cdots i_{p+1}}
=\sum_{r=0}^{p+1}(-1)^r
c_{i_0\cdots\widehat{i_r}\cdots i_{p+1}}
\big|_{U_{i_0\cdots i_{p+1}}}
$$
>
> で定める。添字上の帽子はその添字を除く操作を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-07-cech-complex -->
**定義の確認**：三つの開集合 $U_0,U_1,U_2$ では、$c=(c_0,c_1,c_2)\in C^0$ に対して
$$
(\delta^0c)_{01}=c_1|_{01}-c_0|_{01},\quad
(\delta^0c)_{12}=c_2|_{12}-c_1|_{12},\quad
(\delta^0c)_{02}=c_2|_{02}-c_0|_{02}
$$
です。$b\in C^1$ については $(\delta^1b)_{012}=b_{12}-b_{02}+b_{01}$（各項を三重共通部分へ制限）です。よって
$$
(\delta^1\delta^0c)_{012}
=(c_2-c_1)-(c_2-c_0)+(c_1-c_0)=0.
$$
これが隣り合う差の打消しです。
<!-- definition-example-end -->

<a id="prop-ag3-07-cech-square-zero"></a>

<!-- formal-statement-start -->
> **命題（Čech微分の二乗は零）**  
> 任意の有限順序付き開被覆とアーベル群の層について $\delta^{p+1}\circ\delta^p=0$ がすべての $p\ge0$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二つの添字を取り除く操作は、どちらを先に除くかの二通りで現れます。二通りの符号は逆なので互いに相殺します。

<!-- proof-start -->
### 証明

固定した増加添字列 $I=(i_0,\ldots,i_{p+2})$ を考えます。$\delta^{p+1}(\delta^pc)$ を展開すると、異なる二位置 $a<b$ の添字を除いた同じ切断 $c_{I\setminus\{i_a,i_b\}}|_{U_I}$ が二回現れます。

先に $i_a$ を除き、短くなった列から $i_b$ を除く寄与の符号は $(-1)^a(-1)^{b-1}=(-1)^{a+b-1}$ です。逆に先に $i_b$ を除いてから $i_a$ を除く寄与の符号は $(-1)^b(-1)^a=(-1)^{a+b}$ です。制限写像は合成した制限と一致するため、両項の切断は同一です。係数の和は $(-1)^{a+b-1}+(-1)^{a+b}=0$ となります。すべての組 $(a,b)$ で相殺するので結論が得られます。
<!-- proof-end -->

これにより「差が零になる元」を「局所的な取り替えで生じる差」で割ることができます。

<a id="def-ag3-07-cech-cohomology"></a>

<!-- formal-statement-start -->
> **定義（Čechコホモロジー）**  
> 有限開被覆 $\mathfrak U$ とアーベル群の層 $\mathcal F$ に対し、
>
$$
\check H^0(\mathfrak U,\mathcal F)=\ker\delta^0,
\qquad
\check H^p(\mathfrak U,\mathcal F)
=\ker\delta^p/\operatorname{im}\delta^{p-1}\quad(p\ge1)
$$
>
> と定める。$\ker\delta^p$ の元を $p$ 次コサイクル、$\operatorname{im}\delta^{p-1}$ の元を $p$ 次コバウンダリーと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-07-cech-cohomology -->
**定義の確認**：二つの開集合 $U_0,U_1$ では $C^2=0$ です。従ってすべての $1$-コチェインがコサイクルになり、
$$
\check H^1(\mathfrak U,\mathcal F)
=\mathcal F(U_0\cap U_1)\big/
\{s_1|_{01}-s_0|_{01}:s_i\in\mathcal F(U_i)\}.
$$
分母は実際に $\delta^0$ の像であり、分子に追加の三重交叉条件はありません。二つのチャートの差を、片方ずつの切断の変更で消せるかを測ります。
<!-- definition-example-end -->

<a id="thm-ag3-07-cech-h0"></a>

<!-- formal-statement-start -->
> **定理（零次Čechコホモロジーと大域切断）**  
> 任意の有限順序付き開被覆 $\mathfrak U$ とアーベル群の層 $\mathcal F$ について、制限写像による自然な同型
>
$$
\mathcal F(X)\xrightarrow{\ \sim\ }\check H^0(\mathfrak U,\mathcal F)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta^0(s_i)=0$ とは、すべての重なりで $s_i$ が一致することです。層の貼り合わせ公理が、そのような族と大域切断を一対一に対応させます。

<!-- proof-start -->
### 証明

$s\in\mathcal F(X)$ を各 $U_i$ に制限した族へ送ります。共通部分ではどちらの制限順序でも $s|_{U_i\cap U_j}$ なので差が零となり、像は $\ker\delta^0$ に含まれます。同じ族へ送られる二つの大域切断はすべての $U_i$ で一致するので、層の一意性により同じです。逆に $\delta^0(s_i)=0$ なら各 $U_i\cap U_j$ で $s_i=s_j$ です。層の存在公理が唯一の $s\in\mathcal F(X)$ を与えます。二つの構成は互いに逆です。
<!-- proof-end -->

**射と完全性への接続**：大域切断を取る操作は短完全列の左端と中間の完全性を保ちますが、右端への全射性は一般に保ちません。貼り合わせに失敗する局所持ち上げから、その障害となる $1$-コサイクルを作れます。

## 4. 大域切断の持ち上げを妨げる一次コサイクル

<a id="prop-ag3-07-connecting-obstruction"></a>

<!-- formal-statement-start -->
> **命題（局所持ち上げから得られるČech障害）**  
> $\mathcal O_X$-加群の短完全列と有限開被覆 $\mathfrak U=(U_i)$ を取る。
>
$$
0\longrightarrow\mathcal F'\xrightarrow{\alpha}\mathcal F
\xrightarrow{\beta}\mathcal F''\longrightarrow0.
$$
>
> 大域切断 $s\in\mathcal F''(X)$ が、各 $U_i$ 上で局所持ち上げ $t_i$ を持つとする。
>
$$
\beta(t_i)=s|_{U_i}.
$$
>
> 重なりでは差が $\alpha$ の像に入り、単射性から一意の $c_{ij}\in\mathcal F'(U_i\cap U_j)$ が定まる。
>
$$
\alpha(c_{ij})=t_j|_{U_i\cap U_j}-t_i|_{U_i\cap U_j}.
$$
>
> その族は一次コサイクルであり、次のコホモロジー類は局所持ち上げの選択によらない。
>
$$
[c]\in\check H^1(\mathfrak U,\mathcal F').
$$
>
> この類が零であることと、$s$ が $X$ 全体で $\mathcal F$ の切断へ持ち上がることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$t_j-t_i$ を $\mathcal F'$ へ戻し、三重交叉で差の和が打ち消されることを確かめます。持ち上げを替えたときの変化は零次コチェインの差だけです。障害が零なら、局所持ち上げを修正して一致させます。

<!-- proof-start -->
### 証明

$W_{ij}=U_i\cap U_j$、$w_{ij}=t_j|_{W_{ij}}-t_i|_{W_{ij}}$ と置くと、
$$
\beta_{W_{ij}}(w_{ij})=s|_{W_{ij}}-s|_{W_{ij}}=0.
$$
短完全列の[茎判定](#thm-ag3-07-exact-stalks)により $\ker\beta=\operatorname{im}\alpha$ は層として一致します。従って各 $x\in W_{ij}$ のある近傍 $V_x\subseteq W_{ij}$ で、$a_x\in\mathcal F'(V_x)$ を選んで $\alpha_{V_x}(a_x)=w_{ij}|_{V_x}$ とできます。$V_x\cap V_y$ 上では
$$
\alpha_{V_x\cap V_y}(a_x|_{V_x\cap V_y}-a_y|_{V_x\cap V_y})=0
$$
です。$\alpha$ は単射な層の射なので括弧内は零となり、$a_x$ たちは重なりで一致します。層の貼り合わせにより一意の $c_{ij}\in\mathcal F'(W_{ij})$ が存在して $\alpha(c_{ij})=w_{ij}$ となります。

三重共通部分では
$$
\alpha(c_{12}-c_{02}+c_{01})
=(t_2-t_1)-(t_2-t_0)+(t_1-t_0)=0
$$
です。ここでは添字 $0,1,2$ を任意の増加三添字に読み替えます。$\alpha$ の単射性から $\delta^1c=0$ です。

別の持ち上げ $t'_i$ を取ると、各 $U_i$ で $t'_i-t_i$ は $\ker\beta$ に属すので一意の $a_i\in\mathcal F'(U_i)$ により $t'_i=t_i+\alpha(a_i)$ です。従って
$$
\alpha(c'_{ij}-c_{ij})
=(t'_j-t'_i)-(t_j-t_i)
=\alpha(a_j-a_i),
$$
ゆえに $c'=c+\delta^0a$ となり、類は不変です。

$s=\beta(t)$ という大域持ち上げがあれば各 $t_i=t|_{U_i}$ を選べるので $[c]=0$ です。逆に $c=\delta^0a$ なら $t_i-\alpha(a_i)$ の差は
$$
(t_j-\alpha(a_j))-(t_i-\alpha(a_i))
=\alpha(c_{ij}-a_j+a_i)=0.
$$
層の貼り合わせにより大域切断 $t$ ができ、各 $U_i$ で $\beta(t)=s$ です。
<!-- proof-end -->

この命題では各 $U_i$ 上の持ち上げを**仮定**しました。アフィン開被覆上の準連接層の短完全列なら、[アフィン上の加群と層の対応](../AG3-06/index.md#thm-ag3-06-affine-equivalence)から各開集合で切断の全射性が得られ、仮定を検証できます。一般の開集合では層の全射性だけから各 $U_i$ の切断全射性は従いません。

## 5. 射影直線の二チャートで全部計算する

$k$ を体、$X=\mathbb P^1_k$ とし、斉次座標を $[X_0:X_1]$ とします。標準開集合を
$$
U_0=\{X_0\ne0\}=\operatorname{Spec}k[t],\qquad
U_1=\{X_1\ne0\}=\operatorname{Spec}k[u]
$$
と置き、$t=X_1/X_0$、$u=X_0/X_1$ なので重なりで $u=t^{-1}$ です。

[ねじれ層 $\mathcal O(d)$ の構成](../AG2-06/index.md#def-ag2-06-twisting-sheaf)で、各開集合の局所基底を $e_0=X_0^d$、$e_1=X_1^d$ と書きます。負の $d$ でもこの表記は局所自明化を意味します。重なりでは $e_1=t^de_0$ です。この変換を入れることが、普通の関数の差との唯一の相違です。

<a id="thm-ag3-07-p1-cech"></a>

<!-- formal-statement-start -->
> **定理（射影直線のねじれ層の二チャートČech計算）**  
> 体 $k$、整数 $d$、$X=\mathbb P^1_k$、標準被覆 $\mathfrak U=(U_0,U_1)$ に対し、
>
$$
\dim_k\check H^0(\mathfrak U,\mathcal O(d))
=\begin{cases}d+1&d\ge0,\\0&d<0,\end{cases}
$$
>
> また
>
$$
\dim_k\check H^1(\mathfrak U,\mathcal O(d))
=\begin{cases}0&d\ge-1,\\-d-1&d\le-2.\end{cases}
$$
>
> $\check H^p(\mathfrak U,\mathcal O(d))=0$ は $p\ge2$ について成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$U_0\cap U_1$ 上で $e_0$ に統一して書けば、零次の切断は $k[t]\oplus k[u]$、一次の切断は Laurent 多項式 $k[t,t^{-1}]$ です。微分の像は $k[t]+t^dk[t^{-1}]$ になり、被覆する指数と取り残される指数を数えます。

<!-- proof-start -->
### 証明

[アフィン上の準連接層の切断](../AG3-06/index.md#thm-ag3-06-affine-equivalence)を適用すると、$\mathcal O(d)$ は各チャートで自由階数一なので
$$
C^0=k[t]e_0\oplus k[u]e_1,\qquad
C^1=k[t,t^{-1}]e_0.
$$
$e_1=t^de_0$、$u=t^{-1}$ より、$e_0$ 係数による微分は
$$
\delta^0(f(t),g(u))
=t^dg(t^{-1})-f(t).
$$
従って
$$
\operatorname{im}\delta^0
=k[t]+t^dk[t^{-1}].
$$

零次の核では $f(t)=t^dg(t^{-1})$ であるから、$f$ の指数は同時に非負かつ $d$ 以下でなければなりません。$d\ge0$ なら $1,t,\ldots,t^d$ が基底となり、$d<0$ なら該当する指数がないため核は零です。[零次同型](#thm-ag3-07-cech-h0)でこれは大域切断です。

一次では Laurent 単項式 $t^n$（$n\in\mathbb Z$）を考えます。分母側の $k[t]$ は $n\ge0$ の全単項式を含み、$t^dk[t^{-1}]$ は $n\le d$ の全単項式を含みます。$d\ge-1$ なら任意の整数は $n\ge0$ または $n\le d$ に入り、商は零です。$d\le-2$ なら取り残されるのは
$$
d+1\le n\le-1
$$
だけであり、その個数は $-d-1$ 個です。従って $[t^{d+1}],\ldots,[t^{-1}]$ が一次コホモロジーの基底です。二つの開集合しかないため $C^p=0$（$p\ge2$）で最後の主張も従います。
<!-- proof-end -->

**重要な具体例**：$\mathcal O(-2)$ については、取り残される指数が $-1$ だけなので
$$
\check H^1(\mathfrak U,\mathcal O(-2))
=k[t,t^{-1}]/(k[t]+t^{-2}k[t^{-1}])
\simeq k\,[t^{-1}].
$$
$t^{-1}$ は $k[t]$ にも $t^{-2}k[t^{-1}]$ にも属さないので消せません。この例は局所的なデータから大域的なものを作るときの障害を、たった一つの Laurent 単項式として可視化します。

## 6. 演習：茎・符号・貼り合わせ・射影直線

### A1. 乗法射の核と余核

$A=k[t]$、$X=\operatorname{Spec}A$ とする。$\mathcal O_X$ の $t$ 倍射の核と余核を求め、点 $(t)$ と $D(t)$ で確認せよ。

- Level: A
- ID: AG3-07-A1

<!-- solution-start -->
### 詳細解答

$A=k[t]$ は整域なので、$ta=0$ なら $a=0$ です。従って加群列
$$
0\longrightarrow A\xrightarrow{\,t\,}A
\longrightarrow A/(t)\longrightarrow0
$$
は完全です。[加群列と層の完全性](../AG3-06/index.md#prop-ag3-06-exactness)により、層の核は零、余核は $\widetilde{A/(t)}$ です。点 $(t)$ では $t$ は局所環 $A_{(t)}$ の非単元なので、
$$
\bigl(\widetilde{A/(t)}\bigr)_{(t)}
\simeq A_{(t)}/tA_{(t)}\simeq k
$$
となります。一方、$D(t)$ では $t$ が単元であるため、乗法射 $A_t\xrightarrow{\,t\,}A_t$ は同型であり、核も余核も零です。
<!-- solution-end -->

### A2. 射影直線の大域関数

$X=\mathbb P^1_k$ の標準被覆で、構造層の零次 Čech コホモロジーを計算せよ。

- Level: A
- ID: AG3-07-A2

<!-- solution-start -->
### 詳細解答

$C^0=k[t]\oplus k[u]$、$C^1=k[t,t^{-1}]$ で、微分は $(f,g)\mapsto g(t^{-1})-f(t)$ です。核に入るには $f(t)=g(t^{-1})$ が必要です。左辺は非負指数のみ、右辺は非正指数のみを含むので両辺は同じ定数 $a\in k$ です。従って $\ker\delta^0=\{(a,a):a\in k\}\simeq k$。大域切断が $k$ であることを[零次同型](#thm-ag3-07-cech-h0)から確認できます。
<!-- solution-end -->

### A3. 三重交叉の符号

三つの開集合上の任意の零次コチェイン $(s_0,s_1,s_2)$ に $\delta^1\delta^0$ を適用し、零になることを示せ。

- Level: A
- ID: AG3-07-A3

<!-- solution-start -->
### 詳細解答

[Čech微分の定義](#def-ag3-07-cech-complex)から $(\delta^0s)_{01}=s_1-s_0$、$(\delta^0s)_{02}=s_2-s_0$、$(\delta^0s)_{12}=s_2-s_1$ です。各項を三重交叉へ制限すると
$$
(\delta^1\delta^0s)_{012}
=(s_2-s_1)-(s_2-s_0)+(s_1-s_0)
=s_2-s_1-s_2+s_0+s_1-s_0=0.
$$
真ん中の項の符号を正にすると相殺しないことに注意します。
<!-- solution-end -->

### A4. 境界となる Laurent 多項式

$X=\mathbb P^1_k$ の構造層について、重なり上の切断 $t^{-3}+2t^2$ が零次コチェインの微分であることを具体的に示せ。

- Level: A
- ID: AG3-07-A4

<!-- solution-start -->
### 詳細解答

$g(u)=u^3$ を $U_1$ 上、$f(t)=-2t^2$ を $U_0$ 上に取ります。$u=t^{-1}$ を代入すると
$$
\delta^0(f,g)=g(t^{-1})-f(t)
=t^{-3}-(-2t^2)=t^{-3}+2t^2.
$$
よってこの一次コチェインの類は零です。係数体の標数が $2$ でも式は成り立ち、その場合は $2t^2=0$ と解釈します。
<!-- solution-end -->

### B1. 像を開集合ごとに取るだけでは足りない理由

$X=\mathbb P^1_k$ とし、後述の標準射 $\beta:\mathcal O(-1)^{\oplus2}\to\mathcal O$ を $\beta(a,b)=X_0a+X_1b$ とする。各標準チャート上では $1$ が持ち上がることを示せ。また大域切断上では全射にならないことを説明せよ。

- Level: B
- ID: AG3-07-B1

<!-- solution-start -->
### 詳細解答

$U_0$ では $X_0$ が局所自明化の単元として扱えるので $(X_0^{-1},0)$ を取ると $\beta(X_0^{-1},0)=1$ です。$U_1$ では $(0,X_1^{-1})$ の像が $1$ です。よって任意の点は持ち上げのある近傍を持ち、$\beta$ は層の全射です。

しかし[射影直線の計算](#thm-ag3-07-p1-cech)を $d=-1$ と $d=0$ に適用すると
$$
\Gamma(X,\mathcal O(-1)^{\oplus2})
=\Gamma(X,\mathcal O(-1))^{\oplus2}=0,
\qquad
\Gamma(X,\mathcal O)=k
$$
となります。従って大域切断上の $\beta$ は $0\to k$ という零写像であり、体 $k$ の元 $1$ を像に持たないため全射ではありません。局所的な持ち上げと大域的な持ち上げを区別する必要があります。
<!-- solution-end -->

### B2. 三つの開集合と一次コサイクル

$U_0,U_1,U_2$ のすべての共通部分で定数切断を考える。$c_{01}=a$、$c_{12}=b$、$c_{02}=a+b$（$a,b\in k$）は一次コサイクルであることを示し、零次コチェインの微分として書け。

- Level: B
- ID: AG3-07-B2

<!-- solution-start -->
### 詳細解答

[Čech微分の定義](#def-ag3-07-cech-complex)により、三重交叉では
$$
(\delta^1c)_{012}=c_{12}-c_{02}+c_{01}
=b-(a+b)+a=0.
$$
従ってコサイクルです。$s_0=0$、$s_1=a$、$s_2=a+b$ とすれば、$(\delta^0s)_{01}=a$、$(\delta^0s)_{12}=b$、$(\delta^0s)_{02}=a+b$ です。つまり $c=\delta^0s$ なので、その一次コホモロジー類は零です。定数切断を各開集合へ制限するだけなので、各重なりでも同じ等式が成立します。
<!-- solution-end -->

### B3. 負のねじれで残る指数

$X=\mathbb P^1_k$ の標準被覆について、$\check H^0(\mathcal O(-1))$ と $\check H^1(\mathcal O(-1))$、および $\check H^1(\mathcal O(-3))$ を求めよ。後者の基底を Laurent 単項式で示せ。

- Level: B
- ID: AG3-07-B3

<!-- solution-start -->
### 詳細解答

$d=-1$ の零次核では指数 $0\le n\le-1$ がなく、$\check H^0=0$ です。一次の分母は $k[t]+t^{-1}k[t^{-1}]$ で、前者は $n\ge0$、後者は $n\le-1$ を含みます。すべての整数指数を覆うので $\check H^1=0$ です。

$d=-3$ では分母は $k[t]+t^{-3}k[t^{-1}]$ です。除かれる指数は $n\ge0$ と $n\le-3$ であり、残るのは $n=-2,-1$ です。従って二つの剰余類の $k$-線形直和として
$$
\check H^1(\mathcal O(-3))
=k[t,t^{-1}]/(k[t]+t^{-3}k[t^{-1}])
\simeq k\,[t^{-2}]\oplus k\,[t^{-1}]
$$
です。どちらの単項式も分母に入らず、相異なる Laurent 指数を持つので一次独立です。
<!-- solution-end -->

### B4. 障害類の持ち上げの選択不変性

短完全列 $0\to\mathcal F'\xrightarrow{\alpha}\mathcal F\xrightarrow{\beta}\mathcal F''\to0$、二つの開集合の被覆 $\{U_0,U_1\}$、$s\in\mathcal F''(X)$ を考える。持ち上げ $t_i$ を $t'_i=t_i+\alpha(a_i)$ に替えたとき、一次コチェインの変化を計算し、そのコホモロジー類が変わらないことを証明せよ。

- Level: B
- ID: AG3-07-B4

<!-- solution-start -->
### 詳細解答

[Čech障害の構成](#prop-ag3-07-connecting-obstruction)に従い、$\alpha(c_{01})=t_1-t_0$、$\alpha(c'_{01})=t'_1-t'_0$ と定義します。差を取ると
$$
\alpha(c'_{01}-c_{01})
=(t_1+\alpha(a_1)-t_0-\alpha(a_0))-(t_1-t_0)
=\alpha(a_1-a_0).
$$
$\alpha$ は短完全列の左端で単射なので、$c'_{01}-c_{01}=a_1-a_0=(\delta^0a)_{01}$ です。従って $[c']=[c]$ です。持ち上げの違いが境界にしかならないことが、障害を任意の選択によらない量にしています。
<!-- solution-end -->

### C1. ねじれ層で次数ごとの次元を数える

$X=\mathbb P^1_k$ の標準二開被覆で、整数 $d$ に対し $\check H^0(\mathcal O(d))$ と $\check H^1(\mathcal O(d))$ を、指数集合を直接数えて求めよ。さらに次元の差がすべての $d$ について $d+1$ になることを示せ。

- Level: C
- ID: AG3-07-C1

<!-- solution-start -->
### 詳細解答

$e_1=t^de_0$ より $\delta^0(f,g)=t^dg(t^{-1})-f(t)$ です。核に入る $f$ は $k[t]$ と $t^dk[t^{-1}]$ の共通部分に属すので、その指数は $0\le n\le d$ です。$d\ge0$ では $1,t,\ldots,t^d$ が基底、$d<0$ では零です。従って零次の次元は $\max(d+1,0)$ です。

一次は $k[t,t^{-1}]/(k[t]+t^dk[t^{-1}])$ です。分母に含まれない指数は $d<n<0$ だけなので、$d\le-2$ の場合に $t^{d+1},\ldots,t^{-1}$ が基底となり、その数は $-d-1$ です。$d\ge-1$ なら一次は零です。

従って次元の差は、$d\ge0$、$d=-1$、$d\le-2$ のそれぞれについて
$$
\dim_k\check H^0-\dim_k\check H^1
=\begin{cases}
(d+1)-0&d\ge0,\\
0-0&d=-1,\\
0-(-d-1)&d\le-2
\end{cases}
=d+1
$$
となります。これは二開被覆の Čech 計算による等式であり、一般の層コホモロジーとの一致をまだ仮定していません。
<!-- solution-end -->

### C2. Koszul 型短完全列と消せない障害

$X=\mathbb P^1_k$ の標準斉次座標 $[X_0:X_1]$ について次の列を考える。
$$
0\longrightarrow\mathcal O(-2)
\xrightarrow{\alpha}\mathcal O(-1)^{\oplus2}
\xrightarrow{\beta}\mathcal O\longrightarrow0,
$$
ただし $\alpha(h)=(-X_1h,X_0h)$、$\beta(a,b)=X_0a+X_1b$ とする。

1. 各標準チャートで列が完全であることを確認せよ。
2. $1\in\Gamma(X,\mathcal O)$ の局所持ち上げを二つ選び、差が表す $\mathcal O(-2)$ の一次コチェインを $U_0$ の基底で計算せよ。
3. 大域持ち上げがないことを、Čech類と大域切断の両方から説明せよ。

- Level: C
- ID: AG3-07-C2

<!-- solution-start -->
### 詳細解答

(1) $U_0$ では $X_0$ による局所自明化を使い、
$$
\beta(X_0^{-1},0)=X_0X_0^{-1}=1
$$
なので $\beta$ は全射です。また $X_0a+X_1b=0$ なら、$h=X_0^{-1}b$ と置いて
$$
(a,b)=(-X_1X_0^{-1}b,b)
=(-X_1h,X_0h)=\alpha(h)
$$
と書けます。$X_0$ がこのチャートで消えないため、$h$ は一意です。

$U_1$ でも $\beta(0,X_1^{-1})=1$ です。$X_0a+X_1b=0$ なら、今度は $h=-X_1^{-1}a$ と置いて
$$
(a,b)=(a,-X_0X_1^{-1}a)
=(-X_1h,X_0h)=\alpha(h)
$$
と書けます。両チャートで $\alpha(h)=0$ なら $X_0h=0$ または $X_1h=0$ から $h=0$ です。以上より各チャートで核・像が一致し、$\alpha$ は単射、$\beta$ は全射です。[茎判定](#thm-ag3-07-exact-stalks)により全体で短完全です。

(2) $U_0$ 上で $v_0=(X_0^{-1},0)$、$U_1$ 上で $v_1=(0,X_1^{-1})$ を取ります。両者は $\beta(v_i)=1$ です。重なりで $t=X_1/X_0$ とし、$\mathcal O(-1)$ の $U_0$ の基底 $X_0^{-1}$ を使うと
$$
v_0=(1,0)X_0^{-1},\qquad
v_1=(0,t^{-1})X_0^{-1}.
$$
$\mathcal O(-2)$ の $U_0$ の基底 $e_0=X_0^{-2}$ について
$$
\alpha(e_0)=(-t,1)X_0^{-1}.
$$
従って差は
$$
v_1-v_0=(-1,t^{-1})X_0^{-1}
=t^{-1}(-t,1)X_0^{-1}
=\alpha(t^{-1}e_0).
$$
求める一次コチェインは $t^{-1}e_0$ です。

(3) [射影直線の計算](#thm-ag3-07-p1-cech)を $d=-2$ に適用すると、この類 $[t^{-1}]$ は一次元 $k$-ベクトル空間 $\check H^1(\mathfrak U,\mathcal O(-2))\simeq k\,[t^{-1}]$ の非零元です。[障害命題](#prop-ag3-07-connecting-obstruction)により $1$ は大域に持ち上がりません。

独立な確認として、同じ[射影直線の計算](#thm-ag3-07-p1-cech)により $\Gamma(X,\mathcal O(-1))=0$、$\Gamma(X,\mathcal O)=k$ です。よって大域切断上の $\beta$ は $0\to k$ という零写像で、$1$ を像に持てません。層の全射と大域切断の全射が異なることが、同じ例で二通りに確認できました。
<!-- solution-end -->

## 7. 次章への橋

Čech複体は、開被覆の重なりでの差を具体的な加群と写像として計算する手順を与えました。零次は必ず大域切断であり、一次は局所持ち上げが全体へ貼れない障害を表します。ただし一般の開被覆について Čech 群が被覆を替えても不変になるわけではありません。次章では被覆の選び方やアフィン開集合の性質を整理し、層コホモロジーとその基本計算へ進みます。
