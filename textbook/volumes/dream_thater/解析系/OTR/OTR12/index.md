# OTR12 二次費用で凸解析が現れる理由は

[OTR11 の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)では、実数の順序に沿わせることで最適輸送を解けました。しかし $\mathbb R^2$ 以上では、点を一列に並べる方法がありません。[OTR7 の $c$-巡回単調性](../OTR7/index.md#def-otr7-c-cyclic-monotonicity)は次元によらず最適な経路を記述しますが、それだけでは経路の対応先を関数として書けません。

ここで輸送費用を Euclid 空間の二次費用 $c(x,y)=\lVert x-y\rVert^2/2$ に固定します。平方を展開すると、各点の長さの項は巡回交換の前後で消え、**内積の大小だけ**が残ります。この内積の不等式が、凸関数を下から支える一次式（[劣勾配](../../../応用系/OPT/OPT3/index.md#def-opt3-subgradient)）と一致するのです。

本章の目標は、(1) 二次費用の最適経路と凸劣微分の関係を往復して証明すること、(2) 巡回単調な経路集合から凸関数を実際に組み立てること、(3) その凸関数がほとんど至る所で微分可能となる理由を証明することです。**最適結合が凸勾配の写像になる**という結論そのものは、出発測度の絶対連続性を吟味する次講 OTR13 で扱います。

## 1. 二次費用では何が相殺されるのか

以下、$d\ge1$、$x,y\in\mathbb R^d$ とし、$\langle x,y\rangle=\sum_{j=1}^d x_jy_j$ を標準内積、$\lVert x\rVert^2=\langle x,x\rangle$ を Euclid ノルムの二乗とします。費用は

$$
c(x,y)=\frac12\lVert x-y\rVert^2
=\frac12\lVert x\rVert^2+\frac12\lVert y\rVert^2-\langle x,y\rangle
$$

です。一組 $(x_i,y_i)$ は出発点 $x_i$ と到着点 $y_i$ の対応を表します。到着点を一つずつ巡回すると、$\sum_i\lVert x_i\rVert^2$ と $\sum_i\lVert y_i\rVert^2$ は変わりません。

まず、このとき現れる内積の条件自体に名前を与えます。$\Gamma\subset\mathbb R^d\times\mathbb R^d$ は「一つの $x$ に複数の $y$ が対応してもよい関係」であり、必ずしも写像のグラフとは限りません。

<a id="def-otr12-cyclic-relation"></a>

<!-- formal-statement-start -->
> **定義（内積の巡回単調関係）**
> 集合 $\Gamma\subset\mathbb R^d\times\mathbb R^d$ が内積に関して**巡回単調**であるとは、任意の整数 $n\ge2$、任意の $(x_1,y_1),\ldots,(x_n,y_n)\in\Gamma$ に対し、$x_{n+1}=x_1$ と置いて

$$
\sum_{i=1}^{n}\langle y_i,x_{i+1}-x_i\rangle\le0
$$

> が成立することをいう。$n=1$ の式は $0\le0$ で自動的に成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr12-cyclic-relation -->
**定義の確認**：対角線 $\Gamma=\{(x,x):x\in\mathbb R^d\}$ とし、任意の $x_1,\ldots,x_n$ を取ります。各差の平方を展開すると

$$
\begin{aligned}
\sum_i\langle x_i,x_{i+1}-x_i\rangle
&=\frac12\sum_i\bigl(\lVert x_{i+1}\rVert^2-\lVert x_i\rVert^2-\lVert x_{i+1}-x_i\rVert^2\bigr)\\
&=-\frac12\sum_i\lVert x_{i+1}-x_i\rVert^2\le0.
\end{aligned}
$$

最初の二つの二乗和は巡回して同じなので消えました。**すべての $n$ と点の選択について**条件を確認でき、単なる二点チェックに留まりません。
<!-- definition-example-end -->

<a id="prop-otr12-quadratic-equivalence"></a>

<!-- formal-statement-start -->
> **命題（二次費用と内積の巡回単調性の同値）**
> $d\ge1$、$c(x,y)=\lVert x-y\rVert^2/2$ とする。集合 $\Gamma\subset\mathbb R^d\times\mathbb R^d$ が [OTR7 の意味で $c$-巡回単調](../OTR7/index.md#def-otr7-c-cyclic-monotonicity)であることと、上の内積の意味で巡回単調であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

二乗項は巡回すると消えます。OTR7 の定義では到着点をずらし、本章の定義では出発点をずらすため、**同じ有限列を逆順にも読める**ことを使います。

<!-- proof-start -->
### 証明

任意の $(x_i,y_i)\in\Gamma$（$i=1,\ldots,n$）を取り、$y_{n+1}=y_1$ とします。二乗展開により

$$
\begin{aligned}
&\sum_i\bigl(c(x_i,y_{i+1})-c(x_i,y_i)\bigr)\\
&=\frac12\sum_i(\lVert y_{i+1}\rVert^2-\lVert y_i\rVert^2)
 +\sum_i\langle x_i,y_i-y_{i+1}\rangle\\
&=\sum_i\langle y_i,x_i-x_{i-1}\rangle,
\qquad x_0=x_n.
\end{aligned}
$$

したがって $c$-巡回単調性は、すべての有限巡回について右端が非負という条件です。列を逆順 $(x_n,y_n),\ldots,(x_1,y_1)$ に並べ替えて同じ条件を書くと

$$
\sum_i\langle y_i,x_i-x_{i+1}\rangle\ge0,
\qquad x_{n+1}=x_1
$$

となり、これは内積の巡回単調性と同じです。逆順に並べる操作は可逆で、任意の列を尽くすため、逆向きの含意も成立します。$\square$
<!-- proof-end -->

特に $n=2$ では

$$
\langle x_1-x_2,y_1-y_2\rangle\ge0
$$

が必要です。これは[OTR7 の二点交換条件](../OTR7/index.md#prop-otr7-quadratic-two-cycle)ですが、高次元でこの条件だけを満たしても、任意の巡回の条件を満たすとは限りません。

### 二点では見えない回転の欠陥

$\mathbb R^2$ の反時計回り $90^\circ$ 回転を $J(a,b)=(-b,a)$ とすると、$Jv$ は $v$ に垂直です。したがって関係 $\Gamma_J=\{(x,Jx):x\in\mathbb R^2\}$ では任意の二点について

$$
\langle x-x',Jx-Jx'\rangle
=\langle x-x',J(x-x')\rangle=0.
$$

しかし $x_1=(1,0)$、$x_2=(0,1)$、$x_3=(-1,0)$ とし、$y_i=Jx_i$ とすると

$$
\begin{aligned}
&\langle(0,1),(-1,1)\rangle
 +\langle(-1,0),(-1,-1)\rangle
 +\langle(0,-1),(2,0)\rangle\\
&=1+1+0=2>0.
\end{aligned}
$$

三点の巡回条件に反します。二点単調性では「回転する部分」を検出できないのです。

## 2. なぜ凸関数の劣微分が現れるのか

凸関数の[劣勾配・劣微分](../../../応用系/OPT/OPT3/index.md#def-opt3-subgradient)は、ある点 $x$ で関数 $\varphi$ を下から支える傾き $y$ を集めたものです。すなわち、真凸関数 $\varphi:\mathbb R^d\to(-\infty,+\infty]$ と $x\in\operatorname{dom}\varphi$ に対して

$$
y\in\partial\varphi(x)
\quad\Longleftrightarrow\quad
\varphi(z)\ge\varphi(x)+\langle y,z-x\rangle
\quad(\forall z\in\mathbb R^d).
$$

微分できれば $y=\nabla\varphi(x)$ ですが、折れ曲がる点では複数の $y$ を持ち得ます。例えば $\varphi(t)=|t|$ なら $\partial\varphi(0)=[-1,1]$ です。ここで到着点を「傾き」と読むことが、輸送との接続になります。

<a id="prop-otr12-subdifferential-cyclic"></a>

<!-- formal-statement-start -->
> **命題（凸劣微分の巡回単調性）**
> $\varphi:\mathbb R^d\to(-\infty,+\infty]$ を真凸関数とし、その劣微分のグラフを次で定める。

$$
\operatorname{graph}(\partial\varphi)=\{(x,y):y\in\partial\varphi(x)\}.
$$

> このグラフの任意の部分集合 $\Gamma$ は内積について巡回単調であり、二次費用 $c(x,y)=\lVert x-y\rVert^2/2$ に関しても $c$-巡回単調である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $y_i$ の劣勾配不等式を、次の点 $x_{i+1}$ に適用します。右辺の関数値差は一周すると望遠和で $0$ になります。

<!-- proof-start -->
### 証明

任意の $(x_i,y_i)\in\Gamma$ を $n\ge2$ 個選び、$x_{n+1}=x_1$ とします。$y_i\in\partial\varphi(x_i)$ に $z=x_{i+1}$ を代入すると

$$
\langle y_i,x_{i+1}-x_i\rangle
\le\varphi(x_{i+1})-\varphi(x_i).
$$

両辺を $i=1,\ldots,n$ で足せば

$$
\sum_i\langle y_i,x_{i+1}-x_i\rangle
\le\sum_i\varphi(x_{i+1})-\sum_i\varphi(x_i)=0.
$$

内積の巡回単調性が成立し、[二次費用との同値](#prop-otr12-quadratic-equivalence)により $c$-巡回単調性も得られます。$\square$
<!-- proof-end -->

**具体例**。$\varphi(x)=\lVert x\rVert^2/2$ なら

$$
\varphi(z)-\varphi(x)-\langle x,z-x\rangle
=\frac12\lVert z-x\rVert^2\ge0.
$$

よって $x\in\partial\varphi(x)$ です。逆に $p\in\partial\varphi(x)$ なら $z=x\pm te_j$（$t>0$）を代入し $t\downarrow0$ として $p_j=x_j$ が各座標で必要なので $\partial\varphi(x)=\{x\}$ です。したがって対角線の関係は凸関数の劣微分グラフそのものです。

## 3. 巡回単調な関係から凸関数を作る

前節は「凸関数が先にあるなら巡回単調」という方向でした。逆に、経路の集合 $\Gamma$ しか与えられていない場合でも、凸関数を回復できるでしょうか。[OTR7 の費用差によるポテンシャル構成](../OTR7/index.md#lem-otr7-potential-construction)に似た有限鎖を使います。ただし今回は $\mathbb R^d$ が非コンパクトなので、関数が場所によって $+\infty$ となることを許します。

基準となる一組 $(x_0,y_0)\in\Gamma$ を固定し、そこから $\Gamma$ 内の有限個の点を経由して、任意の終点 $z$ に向かいます。各段で「その点での傾き $y_i$」に移動量を内積で掛け、総和を取ります。経路全体から得られる値の上限が、求める関数です。

<a id="thm-otr12-rockafellar"></a>

<!-- formal-statement-start -->
> **定理（Rockafellar型凸ポテンシャル構成）**
> $d\ge1$ とし、空でない内積の巡回単調集合 $\Gamma\subset\mathbb R^d\times\mathbb R^d$ と基準点 $(x_0,y_0)\in\Gamma$ を選ぶ。$n\ge0$、$(x_1,y_1),\ldots,(x_n,y_n)\in\Gamma$ のすべての有限列について、$x_0,y_0$ は固定して

$$
\varphi(z)=\sup_{n,\,(x_i,y_i)\in\Gamma}
\left\{\sum_{i=0}^{n-1}\langle y_i,x_{i+1}-x_i\rangle
+\langle y_n,z-x_n\rangle\right\},
\qquad z\in\mathbb R^d
$$

> と定める（$n=0$ では和を $0$ とする）。このとき $\varphi:\mathbb R^d\to(-\infty,+\infty]$ は下半連続な真凸関数で、$\varphi(x_0)=0$、かつ任意の $(x,y)\in\Gamma$ に対して

$$
\varphi(x)<+\infty,
\qquad y\in\partial\varphi(x)
$$

> が成立する。特に $\Gamma\subset\operatorname{graph}(\partial\varphi)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

1. 固定した有限鎖の値は、終点 $z$ に関してアフィン関数です。その上限は凸かつ下半連続です。
2. 巡回単調性により、基準点へ戻る閉路の総和は正になりません。また $\Gamma$ 上で終わる鎖の値は、対応する傾き $y$ で一様に上から抑えられます。
3. 終点 $x$ の直前に $(x,y)\in\Gamma$ を一組継ぎ足すと、$\varphi(z)\ge\varphi(x)+\langle y,z-x\rangle$ が得られます。

<!-- proof-start -->
### 証明

**(1) 上限の性質。** 各有限鎖を固定すると、表示式の中括弧は $z\mapsto A+\langle y_n,z-x_n\rangle$ という実数値アフィン関数です。$n=0$ の候補 $\langle y_0,z-x_0\rangle$ が常に存在するので、$\varphi(z)>-\infty$ です。各アフィン関数は連続であり、上限は凸かつ下半連続です。例えば実数 $a$ について

$$
\{z:\varphi(z)>a\}
=\bigcup_{\text{有限鎖 }P}\{z:L_P(z)>a\}
$$

は開集合なので下半連続性が分かります。

**(2) グラフ上の有限性。** $z=x_0$ とすると、各鎖は $(x_0,y_0),\ldots,(x_n,y_n)$ のあと $x_0$ へ戻る閉路です。巡回単調性から中括弧は $0$ 以下で、$n=0$ の候補は $0$ なので $\varphi(x_0)=0$ です。

任意の $(x,y)\in\Gamma$ を固定します。任意の鎖の末尾へ $(x,y)$ を追加し、さらに $x_0$ へ戻すと、巡回単調性から

$$
\sum_{i=0}^{n-1}\langle y_i,x_{i+1}-x_i\rangle
+\langle y_n,x-x_n\rangle
+\langle y,x_0-x\rangle\le0.
$$

したがって $x$ でのすべての候補は $\langle y,x-x_0\rangle$ 以下であり、

$$
\langle y_0,x-x_0\rangle
\le\varphi(x)\le\langle y,x-x_0\rangle<+\infty.
$$

特に $\varphi(x_0)=0$ で有限なので、$\varphi$ は $+\infty$ 恒等ではなく真関数です。

**(3) 劣勾配包含。** $\varphi(x)$ を定義する任意の鎖について、その鎖が終点 $x$ に至った直後に $(x,y)$ を一組追加し、今度は任意の $z$ を終点とします。これは $\varphi(z)$ の上限を取る対象に含まれるため、

$$
\varphi(z)\ge L_P(x)+\langle y,z-x\rangle.
$$

$P$ を動かして右辺の上限を取れば

$$
\varphi(z)\ge\varphi(x)+\langle y,z-x\rangle
\qquad(\forall z\in\mathbb R^d).
$$

$\varphi(x)$ が有限であることは (2) で証明しました。この不等式は[劣勾配の定義](../../../応用系/OPT/OPT3/index.md#def-opt3-subgradient)そのものです。$\square$
<!-- proof-end -->

### 直接計算：二点から折れ線を作る

$d=1$、$\Gamma=\{(0,0),(1,1)\}$、基準点 $(0,0)$ とします。二点について $(1-0)(1-0)=1\ge0$ なので、一次元では全巡回について単調性が成立します（同じ点への往復による損失だけが生じます）。

鎖で $0\to1$ と進むと傾きは $0$ なので寄与は $0$、$1\to0$ と戻ると傾き $1$ なので寄与は $-1$ です。余計な往復は値を増やせず、終点 $z$ へ最後に進むときの候補は $0$ または $z-1$ になります。実際にこの二候補は $n=0$ と $0\to1\to z$ で実現できるので

$$
\varphi(z)=\max\{0,z-1\}.
$$

$z<1$ では傾き $0$、$z>1$ では傾き $1$、$z=1$ では $\partial\varphi(1)=[0,1]$ です。元の関係の $(0,0),(1,1)$ が確かに劣微分に含まれます。**作られる凸関数は一般に一意ではありません**。例えば同じ二点は $z^2/2$ の劣微分にも含まれます。

これで「二次費用の巡回単調関係は、ある凸関数の劣微分グラフに含まれる」という往復が完成しました。一方、$\partial\varphi(x)$ は点 $x$ に複数の到着点を許すので、この結果だけで輸送写像が存在したとは言えません。

## 4. 輸送の双対等号を凸共役で読む

凸関数 $\varphi$ から到着点側の関数を作るには、[OPT4 の Fenchel 共役](../../../応用系/OPT/OPT4/index.md#def-opt4-conjugate)を使います。$\varphi^*(y)=\sup_x\{\langle x,y\rangle-\varphi(x)\}$ は、すべての $x$ に対する内積と関数値との差の上限です。[Fenchel–Young 不等式](../../../応用系/OPT/OPT4/index.md#thm-opt4-fenchel-young)は

$$
\varphi(x)+\varphi^*(y)\ge\langle x,y\rangle
$$

を与え、その[等号条件](../../../応用系/OPT/OPT4/index.md#thm-opt4-fenchel-equality-subgradient)は $y\in\partial\varphi(x)$ です。二次費用の平方展開と並べると、輸送の双対不等式とまったく同じ形になります。

<a id="prop-otr12-dual-subgradient"></a>

<!-- formal-statement-start -->
> **命題（二次費用の双対等号と劣微分）**
> $d\ge1$、$c(x,y)=\lVert x-y\rVert^2/2$、$\varphi:\mathbb R^d\to(-\infty,+\infty]$ を下半連続な真凸関数とし、$\varphi^*$ をその Fenchel 共役とする。拡張実数値の関数

$$
u(x)=\frac12\lVert x\rVert^2-\varphi(x),
\qquad
v(y)=\frac12\lVert y\rVert^2-\varphi^*(y)
$$

> は全ての $x,y\in\mathbb R^d$ で $u(x)+v(y)\le c(x,y)$ を満たす。また $\varphi(x),\varphi^*(y)$ がともに有限である組について、等号成立と $y\in\partial\varphi(x)$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

左右を引くと輸送の双対ギャップは Fenchel–Young ギャップに等しくなります。$+\infty$ の関数値が出る場合、$u$ または $v$ は $-\infty$ ですが、有限値の等号だけを考えればよいことにも注意します。

<!-- proof-start -->
### 証明

二次費用 $c(x,y)$ を平方展開し、[Fenchel–Young 不等式](../../../応用系/OPT/OPT4/index.md#thm-opt4-fenchel-young)を適用すると、両方の値が有限である組では

$$
\begin{aligned}
c(x,y)-u(x)-v(y)
&=\frac12\lVert x-y\rVert^2
-\frac12\lVert x\rVert^2+\varphi(x)
-\frac12\lVert y\rVert^2+\varphi^*(y)\\
&=\varphi(x)+\varphi^*(y)-\langle x,y\rangle\ge0.
\end{aligned}
$$

この差が $0$ となることは[OPT4 の等号条件](../../../応用系/OPT/OPT4/index.md#thm-opt4-fenchel-equality-subgradient)より $y\in\partial\varphi(x)$ と同値です。一方どちらかの凸関数値が $+\infty$ なら $u(x)+v(y)=-\infty$ として不等式は自動的に成立します。$\square$
<!-- proof-end -->

**具体例**。$\varphi(x)=\lVert x\rVert^2/2$ の共役は

$$
\begin{aligned}
\varphi^*(y)
&=\sup_x\left\{\langle x,y\rangle-\frac12\lVert x\rVert^2\right\}\\
&=\frac12\lVert y\rVert^2
-\inf_x\frac12\lVert x-y\rVert^2
=\frac12\lVert y\rVert^2
\end{aligned}
$$

です。$u=v=0$ となり、$c(x,y)\ge0$ との等号は $x=y$ のときだけです。対角線上の輸送が最適であることを双対関数から直接証明できます。

ここで一つ重要な制限があります。命題の $u,v$ は $-\infty$ を取り得ますし、$\mu,\nu$ で積分可能とは限りません。そのまま一般の非コンパクトな Kantorovich 双対問題の「達成した最適解」と呼んではいけません。**有限の積分と等号を実際に検算できた場合**には最適性証明書として使えます。一般の最適結合から凸勾配写像を得る議論は次講で扱います。

## 5. 凸関数の角はどれだけ多いのか

$\partial\varphi(x)$ が複数のベクトルを持つと、$x$ に対応する到着点は一意に決まりません。ところが凸関数は「角」を持っても、Lebesgue 測度で見るとそのような点はごく少ないのです。ここでは一般の Lipschitz 関数に対する大きな定理を黒箱として使わず、**凸性そのもの**から微分可能性を証明します。

最初に実数一変数の凸関数を考えます。開区間 $I$ 上で有限値の凸関数 $g:I\to\mathbb R$ は、左微分係数 $g'_-(t)$ と右微分係数 $g'_+(t)$ を持ち、$g'_-(t)\le g'_+(t)$ です。これは凸性から、割線の傾きが端点を右へ動かすほど増えるためです。

<a id="lem-otr12-one-dimensional-ae"></a>

<!-- formal-statement-start -->
> **補題（一次元凸関数の微分不能点は可算）**
> $I\subset\mathbb R$ を空でない開区間とし、$g:I\to\mathbb R$ を有限値凸関数とする。$g$ が微分不能な点の集合は高々可算であり、したがって一次元 Lebesgue 測度は $0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

角のある点 $t$ では、左と右の傾きの間に空でない区間があります。その区間を異なる角の点同士で重ならないように割り当て、区間内の有理数で数えます。

<!-- proof-start -->
### 証明

凸性により $s<t$ では割線の単調性から

$$
g'_+(s)\le\frac{g(t)-g(s)}{t-s}\le g'_-(t).
$$

特に開区間 $(g'_-(s),g'_+(s))$ と $(g'_-(t),g'_+(t))$ は交わりません。微分不能な点 $t$ では $g'_-(t)<g'_+(t)$ なので、後者の開区間に少なくとも一つ有理数 $q_t$ を選べます。異なる点の開区間は交わらないため $t\mapsto q_t$ は単射です。有理数は可算なので、微分不能点も高々可算です。可算集合の Lebesgue 測度は $0$ です。$\square$
<!-- proof-end -->

高次元へ進むには、各座標軸に平行な直線の上でこの補題を使います。各直線上で微分不能点は可算ですが、そのままでは高次元全体について言えません。ここで、切断ごとの零測度集合をまとめるために [Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)（積分順序の交換）が必要になります。

<a id="thm-otr12-convex-ae"></a>

<!-- formal-statement-start -->
> **定理（有限値凸関数のほとんど至る所微分可能性）**
> $d\ge1$、$U\subset\mathbb R^d$ を空でない開凸集合、$\varphi:U\to\mathbb R$ を有限値凸関数とする。このとき $\varphi$ は局所 Lipschitz 連続であり、$U$ の Lebesgue ほとんどすべての点で Fréchet 微分可能である。微分可能な点 $x$ では

$$
\partial\varphi(x)=\{\nabla\varphi(x)\}
$$

> が成り立つ。ここで劣微分は $U$ の全点に対する支持不等式で定める。
<!-- formal-statement-end -->

### 証明の見取り図

まず一変数の補題を各座標方向に使い、[Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)によりほとんどすべての点で**すべての偏微分**が存在することを示します。一般の関数と異なり、凸関数には支持平面があるため、すべての偏微分が存在すれば劣勾配が一つに決まり、それが全方向の一次近似を与えます。

<!-- proof-start -->
### 証明

**(1) 局所 Lipschitz 連続性。** $x\in U$ の周囲に閉立方体 $Q\subset U$ を選べます。$Q$ の頂点での有限個の関数値を上界にし、中心に関する反射点との中点不等式で下界を作ると、より小さい立方体上の関数値は有界です。さらにその立方体の中の二点を結ぶ線分を延長すれば、凸性により差商が抑えられます。これは [OPT3 の局所 Lipschitz 補題](../../../応用系/OPT/OPT3/index.md#lem-opt3-finite-convex-lipschitz) の証明そのものであり、使う頂点は $Q\subset U$ 内に収まるので、$U$ 上でも適用できます。

**(2) 座標方向の微分。** 閉包が $U$ に含まれる、辺が座標軸に平行な有理端点の開立方体 $Q$ を取ります。$j$ 番目の座標以外を固定すると $t\mapsto\varphi(x_1,\ldots,t,\ldots,x_d)$ は開区間上の一変数凸関数です。[一次元の補題](#lem-otr12-one-dimensional-ae)により、その直線上で $j$ 偏微分のない点は可算、従って一次元測度 $0$ です。片側微分は連続関数の差商の可算極限で記述できるため、この例外集合は可測です。$Q$ は有限測度なので、[Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)をその指示関数に使い、例外集合の $d$ 次元測度は $0$ と分かります。$d$ 個の座標と $U$ を覆う可算個の $Q$ について和集合を取れば、ほとんどすべての点ですべての偏微分が存在します。

**(3) 偏微分から全微分へ。** そのような点 $x$ を固定し、$a_j=\partial_j\varphi(x)$、$a=(a_1,\ldots,a_d)$ とします。まず $x$ の近傍での凸関数のエピグラフを閉包して得た閉凸関数に、[OPT3 の劣勾配存在定理](../../../応用系/OPT/OPT3/index.md#thm-opt3-subgradient-existence-ri)を適用できます。局所 Lipschitz 性により閉包操作は $U$ 内の関数値を変えず、$x$ は実効定義域の内部にあるので、$\partial\varphi(x)$ は非空です。

$p\in\partial\varphi(x)$ なら支持不等式へ $z=x+te_j$ と $z=x-te_j$ を代入し、$t\downarrow0$ として

$$
\partial_j\varphi(x)\ge p_j,
\qquad \partial_j\varphi(x)\le p_j
$$

を得ます。従って $p_j=a_j$ が全座標で成立し、$\partial\varphi(x)=\{a\}$ です。

最後に、十分小さい $h$ について $q_h\in\partial\varphi(x+h)$ を取ります。局所 Lipschitz 定数を $L$ とすると、支持不等式へ $x+h\pm te_j$ を代入して $|q_{h,j}|\le L$ となるため、$q_h$ は一様有界です。$h\to0$ に沿う任意の部分列から収束部分列を取ると、支持不等式で $h\to0$ とすることにより極限は $\partial\varphi(x)=\{a\}$ に属します。したがって $q_h\to a$ です。

点 $x$ における傾き $a$ の支持条件から下界を、点 $x+h$ における傾き $q_h$ の支持条件から上界を得て、

$$
0\le\varphi(x+h)-\varphi(x)-\langle a,h\rangle
\le\langle q_h-a,h\rangle
\le\lVert q_h-a\rVert\,\lVert h\rVert.
$$

右端を $\lVert h\rVert$ で割ると $0$ に収束します。これが Fréchet 微分可能性で、微分は $a$ です。$\square$
<!-- proof-end -->

### 直接例：角は直線上に残る

$\varphi(x_1,x_2)=|x_1|+x_2^2$ は $\mathbb R^2$ 全体で有限かつ凸です。$x_1\ne0$ では

$$
\nabla\varphi(x_1,x_2)
=\bigl(\operatorname{sgn}(x_1),2x_2\bigr)
$$

ですが $x_1=0$ では $\partial\varphi(0,x_2)=[-1,1]\times\{2x_2\}$ で、勾配は一意でありません。微分不能集合 $\{0\}\times\mathbb R$ は、各有界長方形の縦切断が一点であるため二次元 Lebesgue 測度 $0$ です。「微分不能点がない」とは言っていない点が重要です。

なお、Rockafellar 型に構成した $\varphi$ は $+\infty$ を取り得ます。上の定理を適用できるのは **$\operatorname{int}(\operatorname{dom}\varphi)$ 上**です。実効定義域が全次元の凸集合であれば、その境界は Lebesgue 零集合です。実際、実効定義域の閉包は閉凸集合なので、その境界点に[支持超平面定理](../../../応用系/OPT/OPT2/index.md#thm-opt2-supporting-hyperplane)を使えます。法線の非零成分の座標方向に切ると、その点は直線切断の端点です。座標方向ごとに各切断の端点は高々二つであり、有限個の座標方向と[Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)で境界の測度が $0$ と分かります。実効定義域が低次元なら、そもそも全体が Lebesgue 零集合です。

したがって出発測度が Lebesgue 測度に絶対連続なら、ほとんどすべての出発点で傾きが一意になる可能性が開けます。ただし、**最適結合が本当にその劣微分グラフに集中すること**と、**出発点からの関係を測度として写像へ昇格できること**はまだ示していません。これが OTR13 の課題です。以後 $\mathcal L^d$ は $\mathbb R^d$ 上の Lebesgue 測度を表します。

## 6. 演習

### OTR12-A01 二次費用の二点交換を検算する
- Level: A

$d=1$、$\Gamma=\{(0,0),(1,2)\}$、$c(x,y)=(x-y)^2/2$ とする。二点の割当てを交換した前後の費用和を計算し、内積の二点条件とも照合せよ。

<!-- solution-start -->
### 詳細解答

元の割当てでは $c(0,0)+c(1,2)=0+1/2=1/2$ です。到着点を交換すると

$$
c(0,2)+c(1,0)=\frac{4}{2}+\frac{1}{2}=\frac52.
$$

従って交換すると総費用が $2$ 増えます。[二次費用の巡回単調性の同値](#prop-otr12-quadratic-equivalence)で必要な二点条件を直接計算すると

$$
(1-0)(2-0)=2\ge0.
$$

これは交換前後の差 $5/2-1/2=2$ と一致します。二点からなる関係なので、任意の長さの巡回も二点間の行き来の繰返しに分解でき、ここでは全巡回条件が成立します。
<!-- solution-end -->

### OTR12-A02 二点関係から凸関数を作る
- Level: A

$\Gamma=\{(0,0),(1,1)\}\subset\mathbb R^2$（順序対は出発位置と傾きを表し、ともに実数）とする。基準点 $(0,0)$ からの[Rockafellar 型構成](#thm-otr12-rockafellar)を計算し、$0\in\partial\varphi(0)$ と $1\in\partial\varphi(1)$ を示せ。

<!-- solution-start -->
### 詳細解答

$0\to1$ の移動では傾き $0$ なので加算値は $0$、$1\to0$ の移動では傾き $1$ なので $-1$ です。閉路を追加しても値は増えず、終点 $z$ の手前の点が $0$ なら候補は $0$ 以下、$1$ なら $z-1$ 以下です。$n=0$ の鎖と $(0,0)\to(1,1)\to z$ の鎖がそれぞれこの上界を実現するので

$$
\varphi(z)=\max\{0,z-1\}.
$$

$z\le1$ では $\varphi(z)\ge0=\varphi(0)+0(z-0)$、$z>1$ でも $\varphi(z)=z-1\ge0$ なので $0\in\partial\varphi(0)$ です。また、全ての $z$ について $\varphi(z)\ge z-1=\varphi(1)+1(z-1)$ なので $1\in\partial\varphi(1)$ です。
<!-- solution-end -->

### OTR12-A03 折れ点の劣微分を求める
- Level: A

$\varphi(t)=\max\{0,t\}$ に対し $\partial\varphi(0)$ を[劣勾配の定義](../../../応用系/OPT/OPT3/index.md#def-opt3-subgradient)から直接求めよ。$\varphi$ は原点で微分可能か。

<!-- solution-start -->
### 詳細解答

$p\in\partial\varphi(0)$ である条件は、全実数 $z$ に対して $\max\{0,z\}\ge pz$ です。$z>0$ では $z\ge pz$ なので $p\le1$、$z<0$ では $0\ge pz$ なので $p\ge0$ です。逆に $0\le p\le1$ なら、$z\ge0$ で $pz\le z$、$z\le0$ で $pz\le0$ が成立します。従って

$$
\partial\varphi(0)=[0,1].
$$

右微分係数は $1$、左微分係数は $0$ なので、原点では微分不能です。
<!-- solution-end -->

### OTR12-A04 二次関数の劣勾配を定義から求める
- Level: A

$\varphi(x)=\lVert x\rVert^2/2$（$x\in\mathbb R^d$）について、任意の $x$ で $\partial\varphi(x)=\{x\}$ を証明せよ。

<!-- solution-start -->
### 詳細解答

任意の $z$ について

$$
\frac12\lVert z\rVert^2-\frac12\lVert x\rVert^2-\langle x,z-x\rangle
=\frac12\lVert z-x\rVert^2\ge0
$$

なので、支持不等式により $x\in\partial\varphi(x)$ です。逆に $p\in\partial\varphi(x)$ とします。各標準基底 $e_j$ と $t>0$ に対して $z=x+te_j$ を代入すると

$$
t x_j+\frac{t^2}{2}\ge t p_j
\quad\Longrightarrow\quad p_j\le x_j+t/2.
$$

$z=x-te_j$ なら $-tx_j+t^2/2\ge-tp_j$ なので $p_j\ge x_j-t/2$ です。$t\downarrow0$ で $p_j=x_j$。全 $j$ で成立するから $p=x$ に限られます。
<!-- solution-end -->

### OTR12-A05 自明な輸送の双対証明書
- Level: A

$\mathbb R^d$ 上で $\mu=\nu$ を有限二次モーメントの確率測度とする。$\varphi(x)=\lVert x\rVert^2/2$ から得る双対関数 $u,v$ を求め、対角結合 $\pi=(\operatorname{id},\operatorname{id})_{\#}\mu$ が二次費用について最適であることを確認せよ。

<!-- solution-start -->
### 詳細解答

平方完成より

$$
\varphi^*(y)=\sup_x\left(\langle x,y\rangle-\frac12\lVert x\rVert^2\right)
=\frac12\lVert y\rVert^2.
$$

よって[双対等号の命題](#prop-otr12-dual-subgradient)の $u=v=0$ で、全 $x,y$ について $u(x)+v(y)=0\le c(x,y)$ です。全ての結合 $\gamma\in\Pi(\mu,\mu)$ には

$$
\int c\,d\gamma\ge\int u\,d\mu+\int v\,d\mu=0
$$

が成立します。対角結合では $x=y$ なので $\int c\,d\pi=0$ となり、下界を達成します。費用は非負なので $\pi$ は最適です。
<!-- solution-end -->

### OTR12-B01 二点単調でも巡回単調でない関係
- Level: B

$\mathbb R^2$ 上で $J(a,b)=(-b,a)$ とし、$\Gamma_J=\{(x,Jx):x\in\mathbb R^2\}$ を考える。任意の二点に対する単調性は成り立つが、$x_1=(1,0)$、$x_2=(0,1)$、$x_3=(-1,0)$ の巡回では単調性が破れることを計算で示せ。この関係は凸関数の劣微分グラフに含まれ得るか。

<!-- solution-start -->
### 詳細解答

二点 $x,x'$ の差 $h=x-x'$ に対し $\langle x-x',Jx-Jx'\rangle=\langle h,Jh\rangle$ です。$h=(a,b)$ と書けば $\langle h,Jh\rangle=a(-b)+ba=0$。二点条件をすべて満たします。

指定された三点では $y_1=(0,1)$、$y_2=(-1,0)$、$y_3=(0,-1)$ です。従って

$$
\begin{aligned}
\sum_{i=1}^{3}\langle y_i,x_{i+1}-x_i\rangle
&=\langle(0,1),(-1,1)\rangle\\
&\quad+\langle(-1,0),(-1,-1)\rangle
+\langle(0,-1),(2,0)\rangle\\
&=1+1+0=2>0.
\end{aligned}
$$

巡回単調性に反するため、[凸劣微分の巡回単調性](#prop-otr12-subdifferential-cyclic)の対偶により、いかなる真凸関数の劣微分グラフにも $\Gamma_J$ 全体は含まれません。壊れたのは「二点の差」ではなく「三点の閉路の総和」です。
<!-- solution-end -->

### OTR12-B02 二次形式の勾配はなぜ巡回単調か
- Level: B

$x=(x_1,x_2)\in\mathbb R^2$ に対して $T(x)=(2x_1,0)$ とする。$\varphi(x)=x_1^2$ が $T$ を劣勾配として持つことを示し、任意の有限巡回に対する単調性を確認せよ。

<!-- solution-start -->
### 詳細解答

$z=(z_1,z_2)$ とすると

$$
\varphi(z)-\varphi(x)-\langle T(x),z-x\rangle
=z_1^2-x_1^2-2x_1(z_1-x_1)
=(z_1-x_1)^2\ge0.
$$

従って $T(x)\in\partial\varphi(x)$ です。$z=x\pm te_1$ と $z=x\pm te_2$ を代入して $t\downarrow0$ とすれば、任意の劣勾配の成分は $(2x_1,0)$ に一致し、$\partial\varphi(x)=\{T(x)\}$ です。

任意の巡回 $x_1,\ldots,x_n$（ここだけ添字は点の番号）について、支持不等式を $x_{i+1}$ に適用すると

$$
\langle T(x_i),x_{i+1}-x_i\rangle
\le\varphi(x_{i+1})-\varphi(x_i).
$$

総和の右辺は $0$ なので巡回単調性が成立します。行列 $\operatorname{diag}(2,0)$ をただ眺めるのではなく、関数の支持不等式を通じて確認しました。
<!-- solution-end -->

### OTR12-B03 Rockafellar型構成と勾配の一意性
- Level: B

$\Gamma=\{(0,0),(1,1)\}\subset\mathbb R\times\mathbb R$ に対する基準点 $(0,0)$ の構成で得られる $\varphi$ について、$\partial\varphi(1)$ を求めよ。$\Gamma\subset\operatorname{graph}(\partial\varphi)$ であることから $\Gamma$ が一つの微分可能な凸関数の勾配グラフに等しいと結論してよいか。

<!-- solution-start -->
### 詳細解答

[二点からの構成](#thm-otr12-rockafellar)を鎖ごとに調べると $\varphi(z)=\max(0,z-1)$ です。$z\le1$ の支持不等式 $\varphi(z)\ge p(z-1)$ は $z-1<0$ なので $p\ge0$ を要求します。$z>1$ では $z-1\ge p(z-1)$ より $p\le1$ です。逆も成り立つので

$$
\partial\varphi(1)=[0,1].
$$

$\Gamma$ の点 $(1,1)$ はこの区間に含まれますが、$\partial\varphi(1)$ は $0$ も含みます。しかも $\varphi$ は $1$ で微分不能です。従って $\Gamma$ が劣微分グラフに**含まれる**ことと、どこでも一価の勾配のグラフに**等しい**ことは別です。後者には出発測度の条件や微分可能点への集中を検証する必要があります。
<!-- solution-end -->

### OTR12-B04 凸関数の微分不能集合を測る
- Level: B

$\varphi(x_1,x_2)=|x_1|+x_2^2$ とする。微分可能な領域で勾配を求め、$x_1=0$ における劣微分を定義から求め、微分不能集合の二次元 Lebesgue 測度が $0$ となる理由を示せ。

<!-- solution-start -->
### 詳細解答

$x_1>0$ では $\varphi=x_1+x_2^2$、$x_1<0$ では $\varphi=-x_1+x_2^2$ なので、勾配はそれぞれ $(1,2x_2)$、$(-1,2x_2)$ です。

$x=(0,a)$ における劣勾配を $p=(p_1,p_2)$ とすると、任意の $z=(z_1,z_2)$ で必要な不等式は

$$
|z_1|+z_2^2\ge a^2+p_1z_1+p_2(z_2-a).
$$

$z_1=0$、$z_2=a\pm t$ を代入し $t\downarrow0$ とすると $p_2=2a$ です。$z_2=a$ として $z_1>0$、$z_1<0$ の両方を代入すると $-1\le p_1\le1$ が必要です。逆にその範囲なら $|z_1|\ge p_1z_1$ かつ $(z_2-a)^2\ge0$ なので

$$
\partial\varphi(0,a)=[-1,1]\times\{2a\}.
$$

左右の偏微分が一致しないのは $x_1=0$ の直線上だけです。有界長方形 $[-N,N]^2$ におけるこの直線の指示関数の積分は、$x_2$ を固定して $x_1$ について積分すると一点集合の長さ $0$、従って [Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)で $0$ です。$N\to\infty$ の可算和を取っても測度 $0$ です。
<!-- solution-end -->

### OTR12-C01 長方形の線形伸長に双対証明書を作る
- Level: C

$\mu$ は $[0,1]^2$ 上の一様確率測度（密度 $1$）、$T(x_1,x_2)=(2x_1,x_2)$、$\nu=T_{\#}\mu$ とする。費用は $c(x,y)=\lVert x-y\rVert^2/2$ とする。

1. $T=\nabla\varphi$ を満たす有限値凸関数 $\varphi$ を構成し、劣勾配不等式を直接検算せよ。
2. $\varphi^*$ と二つの双対関数 $u,v$ を求め、全ての $x,y$ で $u(x)+v(y)\le c(x,y)$ を示せ。
3. $\pi=(\operatorname{id},T)_{\#}\mu$ の輸送費用を計算し、双対積分が同じ値になることから最適性を証明せよ。$W_2^2(\mu,\nu)$ も求めよ。

<!-- solution-start -->
### 詳細解答

**(1) 傾きの構成と凸性。** $\varphi(x_1,x_2)=x_1^2+x_2^2/2$ と置くと、偏微分は $\partial_1\varphi=2x_1$、$\partial_2\varphi=x_2$ なので $\nabla\varphi=T$ です。任意の $z,x\in\mathbb R^2$ に対し

$$
\begin{aligned}
&\varphi(z)-\varphi(x)-\langle T(x),z-x\rangle\\
&=(z_1^2-x_1^2-2x_1(z_1-x_1))
 +\frac12(z_2^2-x_2^2)-x_2(z_2-x_2)\\
&=(z_1-x_1)^2+\frac12(z_2-x_2)^2\ge0.
\end{aligned}
$$

従って $T(x)\in\partial\varphi(x)$ です。$\varphi$ は正の係数を持つ二乗和なので有限値連続凸関数です。

**(2) 共役と双対制約。** 二つの座標を独立に平方完成すると

$$
\begin{aligned}
\varphi^*(y)
&=\sup_{x_1,x_2}\bigl(x_1y_1+x_2y_2-x_1^2-x_2^2/2\bigr)\\
&=\sup_{x_1}\bigl(-(x_1-y_1/2)^2+y_1^2/4\bigr)\\
&\quad+\sup_{x_2}\bigl(-(x_2-y_2)^2/2+y_2^2/2\bigr)\\
&=y_1^2/4+y_2^2/2.
\end{aligned}
$$

ここから

$$
u(x)=\frac12\lVert x\rVert^2-\varphi(x)=-\frac12x_1^2,
\qquad
v(y)=\frac12\lVert y\rVert^2-\varphi^*(y)=\frac14y_1^2.
$$

全 $x,y$ について平方を完成すると

$$
\begin{aligned}
c(x,y)-u(x)-v(y)
&=\varphi(x)+\varphi^*(y)-\langle x,y\rangle\\
&=(x_1-y_1/2)^2+\frac12(x_2-y_2)^2\ge0.
\end{aligned}
$$

等号条件は $y_1=2x_1$、$y_2=x_2$、すなわち $y=T(x)$ です。

**(3) 主問題と双対問題。** $\pi$ は押し出しによって第一周辺が $\mu$、第二周辺が $\nu$ の結合です。$y=T(x)$ では $x-y=(-x_1,0)$ なので

$$
\int c\,d\pi
=\int_{[0,1]^2}\frac12x_1^2\,dx_1dx_2
=\frac12\cdot\frac13\cdot1=\frac16.
$$

一方 $\mu$ に関する $u$ の積分は $-\frac12\int_0^1x_1^2dx_1=-1/6$ です。$\nu=T_{\#}\mu$ に[押し出し積分公式](../../../解析系/F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を使い、$v$ の積分は

$$
\int v(y)\,d\nu(y)
=\int_{[0,1]^2}v(T(x))\,dx
=\int_{[0,1]^2}\frac14(2x_1)^2\,dx
=\frac13.
$$

従って双対下界は $-1/6+1/3=1/6$ で、主問題の費用に一致します。有限の双対積分と全点での双対制約が成立しているので、任意の他の結合の費用は $1/6$ 以上、$\pi$ は最適です。[Wasserstein距離の定義](../OTR8/index.md#def-otr8-wasserstein)では二次費用の $1/2$ を付けないので、

$$
W_2^2(\mu,\nu)=2\int c\,d\pi=\boxed{\frac13}.
$$

この例では $\mu$ は二次元 Lebesgue 測度に絶対連続で、$\varphi$ は全点で微分可能です。一般の $\mu\in\mathcal P_2(\mathbb R^d)$ に対する存在・一意性までは、この計算一例から結論できません。
<!-- solution-end -->

## 7. まとめと次への接続

- 二次費用の $c$-巡回単調性は、二乗項の相殺によって内積の巡回単調性になります。二点の単調性だけでは高次元の回転を排除できません。
- 凸関数の劣微分グラフは巡回単調であり、逆に非空の巡回単調な関係は Rockafellar 型の下半連続な真凸関数の劣微分グラフへ含められます。
- Fenchel–Young の等号は輸送の双対等号に一致します。ただし、非コンパクト空間では積分可能性を別途確認する必要があります。
- 有限値凸関数は開凸集合の Lebesgue ほとんどすべての点で微分可能です。多値の劣微分が残る点があっても、その集合は零測度です。

次の **OTR13** では、出発測度 $\mu\ll\mathcal L^d$ の絶対連続性を使い、最適結合が実際に凸勾配 $T=\nabla\varphi$ のグラフに集中し、$\mu$-ほとんど至る所で最適写像が一意となることを示します。
