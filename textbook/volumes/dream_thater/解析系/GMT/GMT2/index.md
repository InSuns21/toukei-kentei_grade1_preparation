# GMT2 Frostman補題と測度の構成

<!-- definition-example-audit: strict -->

[MT8のHausdorff次元](../../MT/MT8/index.md#def-mt8-hausdorff-dimension)は、小さな集合で覆うときの費用から得られました。[GMT1の上・下密度](../GMT1/index.md#def-gmt1-upper-lower-density)は、すでに与えられた測度が小球へどれだけの質量を置くかを調べました。ここには一つ逆向きの問題が残っています。**次元が大きい集合の上へ、局所的に集中しすぎない測度を実際に作れるか**、という問題です。

例えば中三分Cantor集合のLebesgue測度は0ですが、各段階の2本の区間へ質量を半分ずつ分ければ、半径 $r$ の球の質量が $r^{\log2/\log3}$ 程度で減る確率測度が得られます。この発想を不規則なコンパクト集合でも実現することが本章の目標です。証明では有限個の小立方体へ質量を配り、段階を細かくして極限を取ります。

本章は $d\ge1$、$0<s\le d$、空でないコンパクト集合 $K\subset\mathbb R^d$ を主な対象とします。$B(x,r)$ は開球です。球の中心 $x$ は **$K$ の外側も含めて** $\mathbb R^d$ の全点を動きます。$s=0$ は最後に別扱いします。

## 1. 内容量が正であるとはどういうことか

MT8で定義した [$\delta$-Hausdorff内容量](../../MT/MT8/index.md#def-mt8-hausdorff-content)では、被覆に使う集合の直径へ上限 $\delta$ を課しました。測度を作るときは、最初から大きな集合でも覆える「尺度制限なし」の費用を用います。

<a id="def-gmt2-unrestricted-content"></a>

<!-- formal-statement-start -->
> **定義（非制限Hausdorff内容量）**  
> $s>0$、$E\subset\mathbb R^d$ に対して、可算個の集合 $U_i\subset\mathbb R^d$ による被覆全体について

$$
\mathcal H_\infty^s(E)=
\inf\left\{\sum_{i=1}^\infty (\operatorname{diam}U_i)^s:
E\subset\bigcup_{i=1}^\infty U_i\right\}
$$

> と定める。空集合の費用は0とし、$\operatorname{diam}U_i=0$ の項も0とする。これは [$\mathcal H_\delta^s$](../../MT/MT8/index.md#def-mt8-hausdorff-content) の直径制約を外したものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt2-unrestricted-content -->
**定義の確認**

区間と有限集合で確かめます。$E=[0,L]$、$s=1$ とします。$E$ 自身による被覆の費用は $L$ です。一方、任意の被覆のうち直径が有限の非空集合 $U_i$ は、座標の下限・上限を端点とする閉区間に含まれ、その区間の長さは $\operatorname{diam}U_i$ です。直径が無限大の被覆集合があれば費用の下界は自明です。従って区間のLebesgue外測度の劣加法性から

$$
L\le\sum_i\operatorname{diam}U_i.
$$

従って $\mathcal H_\infty^1([0,L])=L$。有限集合は各点を直径0の一集合で覆えるので、任意の $s>0$ で内容量は0です。
<!-- definition-example-end -->

$\mathcal H_\infty^s(E)\le\mathcal H_\delta^s(E)$ は被覆の制約から直ちに従います。逆に、コンパクト集合でHausdorff測度が正なら、尺度制限を外しても費用は正に残ります。

<a id="lem-gmt2-positive-content"></a>

<!-- formal-statement-start -->
> **補題（コンパクト集合の内容量の正値性）**  
> $s>0$、空でないコンパクト集合 $K\subset\mathbb R^d$ とする。このとき

$$
\mathcal H_\infty^s(K)>0
\quad\Longleftrightarrow\quad
\mathcal H^s(K)>0.
$$

> 特に $0<s<\dim_HK$ なら、$\mathcal H_\infty^s(K)>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

内容量0なら、任意に安い被覆を取れます。費用が $\delta^s$ より小さいなら、各集合の直径も $\delta$ より小さいため、その被覆は細かいHausdorff被覆でもあります。

<!-- proof-start -->
### 証明

$\mathcal H^s(K)\ge\mathcal H_\infty^s(K)$ なので、内容量が正ならHausdorff測度も正です。逆向きは対偶で示します。$\mathcal H_\infty^s(K)=0$ とし、$\delta,\varepsilon>0$ を任意に固定します。被覆費用の下限が0であるから、ある可算被覆 $(U_i)$ が存在して

$$
\sum_i(\operatorname{diam}U_i)^s
<\min\{\varepsilon,\delta^s\}
$$

となります。$s>0$ なので各 $\operatorname{diam}U_i<\delta$、従ってこの被覆は $\mathcal H_\delta^s(K)$ の候補です。よって

$$
0\le\mathcal H_\delta^s(K)<\varepsilon.
$$

$\varepsilon\downarrow0$ で $\mathcal H_\delta^s(K)=0$、さらに $\delta\downarrow0$ で $\mathcal H^s(K)=0$ です。最後の主張は [MT8の臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)から、$s<\dim_HK$ なら $\mathcal H^s(K)=\infty$ であることによります。$\square$
<!-- proof-end -->

ここで「内容量が正」の意味は、**どんな可算被覆でも直径の $s$ 乗の合計が一律に正の値を下回れない**ことです。その下限を、測度を配る際の質量の原資にします。

## 2. どの測度を作りたいのか

球の半径が小さくなるにつれて、球の質量も半径の $s$ 乗以下に抑えられる測度を目指します。局所密度が大きすぎないよう制御する条件です。ここでの指数は整数とは限りません。

<a id="def-gmt2-frostman-measure"></a>

<!-- formal-statement-start -->
> **定義（Frostman測度）**  
> $s>0$、$K\subset\mathbb R^d$ を空でないコンパクト集合とする。$K$ に支えられたBorel確率測度 $\mu$ が指数 $s$ のFrostman測度であるとは、ある有限定数 $C>0$ が存在して、全ての $x\in\mathbb R^d$、$r>0$ について

$$
\mu(B(x,r))\le Cr^s
$$

> を満たすことをいう。$K$ に支えられるとは $\mu(\mathbb R^d\setminus K)=0$ という意味である。コンパクト台の有限Borel測度は、[MT5で定義したRadon測度](../../MT/MT5/index.md#def-mt5-radon) である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt2-frostman-measure -->
**定義の確認**

区間の場合を計算します。$K=[0,1]\subset\mathbb R$ 上のLebesgue測度を $\mu$ とします。全ての $x\in\mathbb R$ について $B(x,r)\cap[0,1]$ の長さは高々 $\min\{2r,1\}$ です。$0<s\le1$ なら $r\le1$ で $2r\le2r^s$、$r\ge1$ で $1\le r^s$ なので

$$
\mu(B(x,r))\le2r^s.
$$

従って $\mu$ は任意の $0<s\le1$ のFrostman測度です。一方 $s>1$ なら、内点 $x=1/2$ と $0<r<1/2$ で $\mu(B(x,r))=2r$ だから $2r^{1-s}\to\infty$ となり、この $\mu$ は指数 $s$ の条件を満たしません。
<!-- definition-example-end -->

この例のように、**一つの測度は複数の小さい指数の条件を満たし得ます**。逆に、点質量 $\delta_a$ では中心 $a$ の球質量が常に1なので、$s>0$ の条件は満たせません。GMT1で扱った [Cantor測度](../GMT1/index.md#def-gmt1-cantor-measure) も分数指数の例です。

## 3. 有限個の立方体へ質量を配る

集合 $K$ を内部に含む半開立方体 $Q_0=u+[0,L)^d$ を一つ選びます。辺を毎回二等分して得る立方体を**二進立方体**と呼び、深さ $n$ の立方体の一辺は $L2^{-n}$ です。半開とするのは、境界点も各深さでちょうど一つの立方体へ属するようにするためです。

$Q_0$ のうち $K$ に交わる立方体を「活動中」とします。各活動立方体 $Q$ の容量を $c(Q)=\ell(Q)^s$ とします（$\ell(Q)$ は辺の長さ）。極小スケールにすべての質量を押し込むと原子ができて球条件に失敗するので、**各祖先の容量も超えない**ように、根から末端まで質量を配ります。

<a id="lem-gmt2-tree-flow"></a>

<!-- formal-statement-start -->
> **補題（有限二進木の容量配分）**  
> $K\subset\operatorname{int}Q_0$ を非空コンパクト集合、$s>0$、$n\ge0$ とする。深さ $n$ までの活動二進立方体の各頂点 $Q$ へ非負数 $a_n(Q)$ を割り当て、親の質量はその子の質量の和、かつ

$$
0\le a_n(Q)\le\ell(Q)^s
$$

> を全頂点で満たすようにできる。さらに根の質量は

$$
a_n(Q_0)\ge
\frac{\mathcal H_\infty^s(K)}{d^{s/2}}>0
$$

> とでき、下界は深さ $n$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

末端では $K$ に交わる立方体へ容量 $\ell^s$ を置きます。親へ上がるとき「親自身の容量」と「子から受け取れる総量」の小さい方だけ残します。この量は、立方体をどの深さで覆うかを選ぶ最小費用と一致するので、内容量が下界になります。最後に根から子へ許容量の範囲で分配します。

<!-- proof-start -->
### 証明

深さ $n$ の活動立方体 $Q$ では $m_n(Q)=\ell(Q)^s$、活動しない立方体では $m_n(Q)=0$ と置きます。それより上の活動頂点で、子の集合を $\mathrm{ch}(Q)$ と書き

$$
m_n(Q)=\min\left\{\ell(Q)^s,
\sum_{Q'\in\mathrm{ch}(Q)}m_n(Q')\right\}
$$

と再帰的に定めます。この $m_n(Q)$ が「深さ $n$ までの二進立方体で $K\cap Q$ を覆う最小費用」であることを帰納法で確かめます。末端では $K\cap Q$ が空でないとき $Q$ を使うしかありません。親では、親 $Q$ 自身で覆う費用 $\ell(Q)^s$ と、親を使わず子の内部を別々に覆う費用 $\sum m_n(Q')$ の小さい方が最適です。半開立方体が各深さで互いに素なので、子の中に残る $K$ の点が取り落とされません。

その最小費用を実現する有限被覆 $(Q_j)$ は $K$ 全体を覆います。各立方体の直径は $\sqrt d\,\ell(Q_j)$ なので、[非制限Hausdorff内容量](#def-gmt2-unrestricted-content)から

$$
\mathcal H_\infty^s(K)
\le\sum_j(\sqrt d\,\ell(Q_j))^s
=d^{s/2}m_n(Q_0).
$$

次に根へ $a_n(Q_0)=m_n(Q_0)$ を割り当てます。親で $a_n(Q)\le m_n(Q)\le\sum_{Q'}m_n(Q')$ なら、各子へ $0\le a_n(Q')\le m_n(Q')$ を割り当てて和を $a_n(Q)$ にできます。例えば子を順に並べ、残量とその子の $m_n(Q')$ の小さい方を渡せば、最後に残量は0となります。これを末端まで繰り返すと

$$
\sum_{Q'\in\mathrm{ch}(Q)}a_n(Q')=a_n(Q),
\qquad a_n(Q)\le m_n(Q)\le\ell(Q)^s.
$$

従って求める配分が得られます。$\square$
<!-- proof-end -->

**小さな実計算（一次元、深さ1）。** $Q_0=[0,1)$、$s=1/2$、左右の子がともに活動中なら、それぞれ $m_1=2^{-1/2}$ です。根では

$$
m_1(Q_0)=\min\{1,2\cdot2^{-1/2}\}=1.
$$

子へ $1/2$ ずつ渡せば $a_1(Q_{\rm left})=a_1(Q_{\rm right})=1/2\le2^{-1/2}$。さらに枝が増えても、祖先の総質量が容量を破ることはありません。

## 4. 離散測度の弱極限を取る

深さ $n$ の各活動末端 $Q$ から点 $x_Q\in K\cap Q$ を選び、上で作った配分を正規化して

$$
M_n=a_n(Q_0),\qquad
\mu_n=\frac1{M_n}\sum_{\substack{Q:\,\mathrm{depth}(Q)=n}}
a_n(Q)\,\delta_{x_Q}
$$

とします。[容量配分補題](#lem-gmt2-tree-flow)により $M_n\ge a>0$、ただし

$$
a=d^{-s/2}\mathcal H_\infty^s(K).
$$

各 $\mu_n$ は $K$ 上の確率測度です。深さ $k\le n$ の二進立方体 $Q$ 内にある末端点の質量はその祖先へ割り当てた質量と一致するため

$$
\mu_n(Q)=\frac{a_n(Q)}{M_n}
\le\frac{\ell(Q)^s}{a}.
$$

**これはまだ全半径の球評価ではありません。** 末端の点質量があるため、$r$ が末端の辺長より小さければ $\mu_n(B(x_Q,r))$ は $r^s$ に比例して減りません。重要なのは、固定した $r>0$ に対し、$n$ が十分大きくなった後は常に評価できることです。

固定した $0<r<L$ について $r\le\ell<2r$ を満たす二進辺長 $\ell=L2^{-k}$ を選び、$n\ge k$ とします。開球 $B(x,r)$ の各座標への射影は長さ $2r\le2\ell$ の区間です。その区間と交わる長さ $\ell$ の半開区間は高々4本なので、球に交わる深さ $k$ の二進立方体は高々 $4^d$ 個です。よって

$$
\mu_n(B(x,r))\le 4^d\frac{\ell^s}{a}
\le\frac{4^d2^s}{a}r^s.
$$

$r\ge L$ では $\mu_n(B(x,r))\le1$ かつ $a\le L^s\le r^s$ だから、同じ右辺で抑えられます。従って

$$
\boxed{\quad\mu_n(B(x,r))\le C_{d,s,K}r^s
\quad\text{for all sufficiently large }n\ (r\text{ fixed}),\quad}
$$

ここで $C_{d,s,K}=4^d2^s/a$ は $x,r,n$ に依存しません。次に弱極限の存在と、その極限への不等式の移行を示します。

ここで $C(K)$ は $K$ 上の実数値連続関数全体を表し、$\|f\|_\infty=\sup_{x\in K}|f(x)|$ は一様ノルムです。各有限段階の測度は原子的でも、コンパクト集合上ではこの連続関数による積分を通して極限を構成できます。

<a id="lem-gmt2-weak-subsequence"></a>

<!-- formal-statement-start -->
> **補題（コンパクト台の確率測度の弱部分列）**  
> コンパクト集合 $K\subset\mathbb R^d$ 上の任意のBorel確率測度列 $(\mu_n)$ には、ある部分列 $(\mu_{n_j})$ とBorel確率測度 $\mu$ が存在して、全ての $f\in C(K)$ について

$$
\int_K f\,d\mu_{n_j}\longrightarrow\int_K f\,d\mu
$$

> が成り立つ。この収束を弱収束と呼ぶ。さらに、$K$ の開集合 $G$ について

$$
\mu(G)\le\liminf_{j\to\infty}\mu_{n_j}(G)
$$

> が成立する（開集合側のPortmanteau不等式）。
<!-- formal-statement-end -->

以下、この積分の収束を $\mu_{n_j}\Rightarrow\mu$ と略記します。この記号はここで定めた **$K$ 上の測度の弱収束**を表し、連続関数に対する積分の収束によって意味を定めています。

### 証明の見取り図

$C(K)$ の可算稠密な関数列に対して積分を対角化し、正で定数1を保つ線形汎関数を得ます。測度への復元には [MT5のRiesz–Markov定理](../../MT/MT5/index.md#thm-mt5-riesz-markov-positive)を使います。開集合の指示関数は連続関数ではありませんが、その下から増加する連続関数で近似できます。

<!-- proof-start -->
### 証明

$K\subset\mathbb R^d$ がコンパクトなので $C(K)$ には一様ノルムに関する可算稠密列が存在します。実際、任意の $\varepsilon>0$ に対して、有理座標中心と有理半径の小球を有限個選んで $K$ を覆えます。各球内で正で境界へ線形に減少する山型関数を作り、その総和で割れば、和が1の連続な重みが得られます。係数を有理数から選ぶと候補は可算個です。任意の連続関数は一様連続性により、十分小さい球の重み付き和で一様近似できます。

その可算稠密列を $f_1,f_2,\ldots$ とします。確率測度の全質量が1なので、任意の $n,m$ で

$$
\left|\int_K f_m\,d\mu_n\right|\le\|f_m\|_\infty.
$$

$m=1$ で収束部分列を選び、$m=2$ でその部分列からさらに選ぶ操作を繰り返し、対角部分列 $(n_j)$ を取ります。すると各 $m$ で積分が収束します。

任意の $f\in C(K)$ に対して $\|f-f_m\|_\infty<\varepsilon$ となる $m$ を選べば

$$
\left|\int f\,d\mu_{n_j}-\int f\,d\mu_{n_k}\right|
\le2\varepsilon+
\left|\int f_m\,d\mu_{n_j}-\int f_m\,d\mu_{n_k}\right|.
$$

従って全ての $f$ で積分はCauchy列となります。極限 $T(f)$ は正の線形汎関数、$T(1)=1$ で $|T(f)|\le\|f\|_\infty$。[Riesz–Markov定理](../../MT/MT5/index.md#thm-mt5-riesz-markov-positive)によって $T(f)=\int f\,d\mu$ となる一意な正Radon測度 $\mu$ が存在します。$T(1)=1$ より確率測度です。

$G\subset K$ が開なら、閉集合 $K\setminus G$ までの距離を用いて、$f_m(x)=\min\{1,m\,\operatorname{dist}(x,K\setminus G)\}$ と置きます（$G=K$ の場合は $f_m\equiv1$）。これは連続で $0\le f_m\le\mathbf1_G$、$f_m\uparrow\mathbf1_G$ です。従って

$$
\int f_m\,d\mu
=\lim_j\int f_m\,d\mu_{n_j}
\le\liminf_j\mu_{n_j}(G).
$$

$m\to\infty$ として単調収束を使うと結論を得ます。$\square$
<!-- proof-end -->

球 $B(x,r)$ は $\mathbb R^d$ で開ですから、$G=B(x,r)\cap K$ をこの補題へ入力できます。固定した球について十分大きい $n_j$ で上の評価が成り立つため、

$$
\mu(B(x,r))\le\liminf_j\mu_{n_j}(B(x,r))
\le C_{d,s,K}r^s.
$$

**向きに注意。** 開集合については $\mu(G)\le\liminf\mu_n(G)$ です。閉集合では逆向きの上極限不等式になるので、閉球の極限を無条件に入れ替える証明ではありません。

## 5. 容量配分を測度の存在へつなぐ

<a id="thm-gmt2-frostman"></a>

<!-- formal-statement-start -->
> **定理（Frostman補題・コンパクト集合版）**  
> $d\ge1$、$0<s\le d$ とし、$K\subset\mathbb R^d$ を非空コンパクト集合とする。$\mathcal H_\infty^s(K)>0$ なら、$K$ に支えられたBorel確率測度 $\mu$ と有限定数 $C>0$ が存在して、任意の $x\in\mathbb R^d$、$r>0$ に対し

$$
\mu(B(x,r))\le Cr^s
$$

> が成り立つ。特に $0<s<\dim_HK$ なら、このような指数 $s$ の測度が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

正の内容量は、有限二進木の根へ一様に正の質量を置けることを意味します。深さ $n$ の末端へ質量を配って確率測度を作り、固定半径以上の球を評価します。弱極限へ進むと、すべての正の半径で評価が残ります。

<!-- proof-start -->
### 証明

$a=d^{-s/2}\mathcal H_\infty^s(K)>0$ と置きます。$K\subset\operatorname{int}Q_0$ となる二進立方体の根 $Q_0$ を選びます。[有限二進木の容量配分](#lem-gmt2-tree-flow)により各深さ $n$ に全階層容量制限つきの質量 $a_n(Q)$ が得られ、根の量は $M_n\ge a$ です。

各末端 $Q$ に $x_Q\in K\cap Q$ を取り、前節の $\mu_n$ を構成します。全質量は子への質量保存から

$$
\mu_n(K)=\frac{\sum_{\mathrm{depth}(Q)=n}a_n(Q)}{M_n}
=\frac{M_n}{M_n}=1.
$$

固定した $x\in\mathbb R^d$、$r>0$ について、前節の立方体の個数評価を使うと、十分大きい全ての $n$ で

$$
\mu_n(B(x,r))\le\frac{4^d2^s}{a}r^s.
$$

[コンパクト台の確率測度の弱部分列](#lem-gmt2-weak-subsequence)により $\mu_{n_j}\Rightarrow\mu$ となる確率測度 $\mu$ が存在します。$K$ は閉で全 $\mu_{n_j}$ が $K$ に支えられるので、測度 $\mu$ も $K$ 上のものです。開集合 $B(x,r)\cap K$ へ同じ補題の開集合評価を代入すると

$$
\mu(B(x,r))
\le\liminf_{j\to\infty}\mu_{n_j}(B(x,r))
\le\frac{4^d2^s}{a}r^s.
$$

この部分列の選択は $x,r$ ごとではなく**一度だけ**行っています。任意に固定した $x,r$ で不等式を示したので、同じ $\mu$ が全ての $x,r$ に対して条件を満たします。最後の主張は [内容量の正値性](#lem-gmt2-positive-content)から従います。$\square$
<!-- proof-end -->

構成では $\mathcal H_\infty^s(K)$ が小さいほど定数 $C$ は大きくなり得ます。しかし次の射影・energyの議論では定数の鋭さより、**正の質量が残り、全ての球で同じ冪指数が使える**ことが本質です。

## 6. 球成長条件から被覆の費用を取り戻す

存在方向だけではなく、逆に球へ集中しすぎない確率測度があれば、どの被覆にも十分な費用が必要になることを示します。これは [MT8の質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle) を、尺度制限なしで書き直したものです。

<a id="thm-gmt2-content-equivalence"></a>

<!-- formal-statement-start -->
> **定理（球成長と非制限内容量の同値）**  
> $s>0$、$K\subset\mathbb R^d$ を非空コンパクト集合とする。このとき次は同値である。
>
> 1. $\mathcal H_\infty^s(K)>0$。
> 2. $K$ に支えられた指数 $s$ のFrostman確率測度が存在する。
>
> さらに2を満たす測度の球成長定数が $C$ なら

$$
\mathcal H_\infty^s(K)\ge\frac1{2^sC}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

1から2は [Frostman補題](#thm-gmt2-frostman)です。逆向きでは、任意の被覆集合を中心を選んだ球に入れ、球の質量をその直径の $s$ 乗で抑えます。直径0の集合を処理する際だけ、球成長条件から点質量が0であることを先に確認します。

<!-- proof-start -->
### 証明

1を仮定します。[内容量の正値性](#lem-gmt2-positive-content)から $\mathcal H^s(K)>0$ です。[MT8の臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)によって

$$
0<s\le\dim_HK\le d
$$

となり、[Frostman補題](#thm-gmt2-frostman) の指数条件が確認できたので2が成立します。

逆に2を仮定し、$K\subset\bigcup_i U_i$ を任意の可算被覆とします。$\rho_i=\operatorname{diam}U_i$ と置き、$K$ と交わらない集合は除きます。各 $i$ で $x_i\in K\cap U_i$ を取ります。

$\rho_i>0$ なら、任意の $y\in U_i\cap K$ に対して $|y-x_i|\le\rho_i<2\rho_i$ なので

$$
U_i\cap K\subset B(x_i,2\rho_i),\qquad
\mu(B(x_i,2\rho_i))\le C(2\rho_i)^s.
$$

$\rho_i=0$ のとき $U_i\cap K$ は高々一点です。また任意の $r>0$ で $\mu(\{x_i\})\le\mu(B(x_i,r))\le Cr^s$ なので、$r\downarrow0$ により $\mu(\{x_i\})=0$。これらの集合を避けて質量を数えると

$$
1=\mu(K)\le\sum_{i:\rho_i>0}\mu(B(x_i,2\rho_i))
\le C2^s\sum_i\rho_i^s.
$$

任意の被覆で成り立つため、右辺の和の下限を取れば主張を得ます。$\square$
<!-- proof-end -->

<a id="cor-gmt2-dimension-characterization"></a>

<!-- formal-statement-start -->
> **系（Frostman指数によるHausdorff次元の特徴付け）**  
> 非空コンパクト集合 $K\subset\mathbb R^d$ について

$$
\dim_HK
=\sup\bigl(\{0\}\cup\{s>0:\text{$K$ に指数 $s$ のFrostman確率測度が存在}\}\bigr).
$$

> 特に、全ての $0<s<\dim_HK$ で存在するが、$s=\dim_HK$ における存在は一般には保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

次元より小さい指数は [正の内容量](#lem-gmt2-positive-content)と [Frostman補題](#thm-gmt2-frostman) で実現します。実現できる指数は [質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)で次元以下に抑えられます。

<!-- proof-start -->
### 証明

$t=\dim_HK$ とします。$0<s<t$ なら [臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)で $\mathcal H^s(K)=\infty$ です。まず [コンパクト集合の内容量の正値性](#lem-gmt2-positive-content)により $\mathcal H_\infty^s(K)>0$。これを [Frostman補題](#thm-gmt2-frostman)へ入力して指数 $s$ の確率測度を得ます。

逆に指数 $s>0$ の測度 $\mu$ が存在すれば、[球成長と内容量の同値](#thm-gmt2-content-equivalence)から $\mathcal H_\infty^s(K)>0$、従って $\mathcal H^s(K)>0$ です。[臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)により $s\le t$。$t=0$ の場合は正指数の測度は一つも存在せず、右辺へ $\{0\}$ を加えた意味で等号が成立します。$\square$
<!-- proof-end -->

### なぜ臨界指数で測度がないことがあるのか

コンパクト集合でも、$\dim_H K=1$ でありながら $\mathcal H^1(K)=0$ は起こります。各整数 $n\ge2$ について、縮小率

$$
\rho_n=2^{-n/(n-1)}<\frac12
$$

を持つ左右対称の二分Cantor集合 $C_n\subset[0,1]$ を作ります（毎段階、長さ $\rho_n$ 倍の左右2区間を残す）。[MT8のCantor次元の証明](../../MT/MT8/index.md#thm-mt8-cantor-dimension)と同じ被覆・均等質量の計算で

$$
\dim_H C_n=\frac{\log2}{\log(1/\rho_n)}
=1-\frac1n,
\qquad\mathcal H^1(C_n)=0
$$

となります。これらを原点へ縮小して集め

$$
K=\{0\}\cup\bigcup_{n=2}^\infty
\bigl(2^{-n}+2^{-3n}C_n\bigr)
$$

とします。各成分はコンパクトで、$n\to\infty$ では成分全体が0へ集まるため $K$ はコンパクトです。可算合併に対するHausdorff次元の性質から $\dim_HK=\sup_n(1-1/n)=1$、一方 $\mathcal H^1(K)=0$ です。もし指数1のFrostman確率測度があれば [内容量への下界](#thm-gmt2-content-equivalence)より $\mathcal H^1(K)>0$ となり矛盾します。

「次元は1だから指数1の測度がある」という飛躍は、この例で失敗します。**任意の小さい差を残した $s<\dim_HK$ が安全な存在範囲**です。

$s=0$ は別です。どの非空コンパクト集合でも一点 $x_0\in K$ を選べば、$\delta_{x_0}(B(x,r))\le1=C r^0$（$C=1$）です。正の指数を要求しない限り、構成は不要です。

## 7. 演習：被覆から測度へ、測度から次元へ

### Level A：定義と計算

<a id="ex-gmt2-a1"></a>

**A1. 0になる内容量**

- Level: A
- 問題: $s>0$、$F\subset\mathbb R^d$ が有限集合のとき、$\mathcal H_\infty^s(F)=0$ と $\mathcal H^s(F)=0$ をそれぞれ定義から示せ。さらに点質量が指数 $s$ のFrostman測度にならないことを確認せよ。

<!-- solution-start -->
**詳細解答**

$F=\{x_1,\ldots,x_m\}$ とすると、一点集合 $\{x_j\}$ は直径0であり、任意の $\delta>0$ に対して $F\subset\bigcup_{j=1}^m\{x_j\}$ は許される被覆です。従って

$$
0\le\mathcal H_\infty^s(F)
\le\sum_{j=1}^m0^s=0,
\qquad 0\le\mathcal H_\delta^s(F)\le0.
$$

よって $\mathcal H^s(F)=\lim_{\delta\downarrow0}\mathcal H_\delta^s(F)=0$ です。$\mu=\delta_{x_1}$ なら $\mu(B(x_1,r))=1$ なので、もし $1\le Cr^s$ が全 $r>0$ で成立すれば $r\downarrow0$ で $1\le0$ となり矛盾します。
<!-- solution-end -->

<a id="ex-gmt2-a2"></a>

**A2. 区間と指数の境界**

- Level: A
- 問題: $[0,L]\subset\mathbb R$（$L>0$）に正規化Lebesgue測度 $d\mu=L^{-1}\mathbf1_{[0,L]}dx$ を置く。$0<s\le1$ について、全ての中心と半径で $\mu(B(x,r))\le Cr^s$ となる $C$ を求めよ。$s>1$ ではこの $\mu$ が条件を満たさないことも示せ。

<!-- solution-start -->
**詳細解答**

球と区間の交差の長さは $\min\{2r,L\}$ 以下だから

$$
\mu(B(x,r))\le\min\{2r/L,1\}.
$$

$r\le L$ なら $r/L\le(r/L)^s$（$0<s\le1$）なので $2r/L\le2L^{-s}r^s$。$r\ge L$ なら $1\le L^{-s}r^s$。従って $C=2L^{-s}$ で十分です。$s>1$ なら内点 $x=L/2$、$r<L/2$ で $\mu(B(x,r))=2r/L$。球成長評価は $2/L\le Cr^{s-1}$ を要求しますが、$r\downarrow0$ で右辺は0となるため不可能です。
<!-- solution-end -->

<a id="ex-gmt2-a3"></a>

**A3. 二進木の根と子**

- Level: A
- 問題: $Q_0=[0,1)$、$s=1/2$ とし、深さ1の左右両方の立方体が活動中であるとする。$m_1(Q_0)$ を計算し、根から子へ配る合法な質量を一組書け。次に深さ4まで進んだとき左右の深さ1の立方体でそれぞれ末端1個だけが活動中だとすると、なぜ配り直しが必要か説明せよ。

<!-- solution-start -->
**詳細解答**

深さ1の各子の容量は $(1/2)^{1/2}=1/\sqrt2$ で、根の容量は1です。従って [再帰式](#lem-gmt2-tree-flow)により

$$
m_1(Q_0)=\min\{1,2/\sqrt2\}=1.
$$

左右へ $a_1=1/2,1/2$ と配れば $a_1\le1/\sqrt2$、和は1です。深さ4では末端の一辺は $1/16$ で、各枝に末端1個しかない場合、深さ1の左右の枝が受け入れられる容量はそれぞれ $(1/16)^{1/2}=1/4$ です。以前の $1/2$ ずつの配分は、枝ごとの容量 $1/4$ を超えるため保持できません。下から計算し直すと $m_4(Q_0)=1/2$ となり、根から $1/4$ ずつ配分すれば全ての祖先と末端で容量制約を守れます。
<!-- solution-end -->

<a id="ex-gmt2-a4"></a>

**A4. 球から被覆への戻し方**

- Level: A
- 問題: $\mu(K)=1$、$\mu(B(x,r))\le Cr^s$（$s>0$）とする。任意の被覆 $K\subset\bigcup_iU_i$ から $1\le C2^s\sum_i(\operatorname{diam}U_i)^s$ を導け。ただし $U_i$ は可測であるとは限らず、直径0の集合も許す。

<!-- solution-start -->
**詳細解答**

$\rho_i=\operatorname{diam}U_i$ と置き、$K$ と交わる各 $U_i$ から $x_i\in K\cap U_i$ を選びます。$\rho_i>0$ なら $U_i\cap K\subset B(x_i,2\rho_i)$ であり、外測度が必要な $U_i$ 自体を積分せずBorel球で覆えます。$\rho_i=0$ は高々一点なので、$\mu(\{x_i\})\le Cr^s$ を $r\downarrow0$ として得る零質量集合です。可算個の零質量点を除いた $K$ は、$\rho_i>0$ の球で覆われます。従って球の可算劣加法性から

$$
1\le\sum_{\rho_i>0}\mu(B(x_i,2\rho_i))
\le C2^s\sum_i\rho_i^s.
$$

この処理が必要なのは、任意集合 $U_i$ に $\mu(U_i)$ をそのまま書くと可測性を仮定してしまうためです。
<!-- solution-end -->

<a id="ex-gmt2-a5"></a>

**A5. 無限小の被覆を取り出す**

- Level: A
- 問題: $s>0$ とする。$\mathcal H_\infty^s(E)=0$ なら、任意の $\delta>0$ で $\mathcal H_\delta^s(E)=0$ であることを証明せよ。また、この議論を $s=0$ へ機械的に適用してはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**

任意の $\varepsilon>0$ に対して費用が $\min\{\varepsilon,\delta^s\}$ 未満の被覆 $(U_i)$ を選び、$\rho_i=\operatorname{diam}U_i$ と置きます。

各非空集合では $\rho_i^s$ が費用の総和以下なので、$\rho_i^s<\delta^s$ です。ここで $s>0$ だから $\rho_i<\delta$ が従い、この被覆は尺度制限も満たします。従って $\mathcal H_\delta^s(E)\le\varepsilon$ です。

$\varepsilon\downarrow0$ より結論が出ます。$s=0$ では非空集合の直径の0乗は1と定義するため、$\rho_i^0<\delta^0$ から $\rho_i<\delta$ とは推論できません。
<!-- solution-end -->

### Level B：構成の中間論証

<a id="ex-gmt2-b1"></a>

**B1. Cantor測度は球成長を持つ**

- Level: B
- 問題: 中三分Cantor集合 $C\subset[0,1]$ 上の均等確率測度 $\kappa$ で、深さ $n$ の各基本区間の質量は $2^{-n}$ である。$t=\log2/\log3$ とおき、$\kappa(B(x,r))\le4r^t$ を全ての $x\in\mathbb R$、$r>0$ で証明せよ。

<!-- solution-start -->
**詳細解答**

$r\ge1$ では $\kappa(B(x,r))\le1\le r^t$。$0<r<1$ なら、$3^{-(n+1)}\le r<3^{-n}$ となる整数 $n\ge0$ を選びます。深さ $n$ の基本区間は長さ $\ell=3^{-n}$、異なる区間の間には長さ少なくとも $\ell$ の隙間があります。長さ $2r<2\ell$ の開区間は、そのような基本区間3本に同時には交われません（3本を横切るには少なくとも二つの隙間と中央の一区間を通るので長さ $3\ell$ が必要です）。よって

$$
\kappa(B(x,r))\le2\cdot2^{-n}=2\ell^t.
$$

$r\ge\ell/3$ なので $\ell^t\le3^t r^t=2r^t$。従って $\kappa(B(x,r))\le4r^t$ です。各深さの質量の和が1であること、球の中心を集合外へ動かしても区間の交差本数評価が変わらないことを用いました。
<!-- solution-end -->

<a id="ex-gmt2-b2"></a>

**B2. 原子近似と開球の不等式**

- Level: B
- 問題: $\mu_n$ がコンパクト集合 $K$ 上の原子的確率測度で、各固定した $x,r>0$ に対して十分大きい $n$ で $\mu_n(B(x,r))\le Cr^s$ が成り立つとする。$\mu_{n_j}\Rightarrow\mu$ なら、$\mu$ に同じ評価が成り立つことを示せ。また、有限段階の $\mu_n$ が全半径でこの評価を満たすとはいえない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

固定した球 $G=B(x,r)\cap K$ は $K$ の開集合です。[弱部分列補題](#lem-gmt2-weak-subsequence)により

$$
\mu(B(x,r))=\mu(G)
\le\liminf_j\mu_{n_j}(G)
\le Cr^s.
$$

定数 $C$ は球に依存せず、部分列も同じなので、全ての $x,r$ について結論が成立します。他方、$\mu_n$ に正の質量 $a_n>0$ を持つ原子 $x_n$ があれば、全ての $r>0$ に対し $\mu_n(B(x_n,r))\ge a_n$。$r\downarrow0$ で $Cr^s\downarrow0$ だから有限段階では全半径の評価はあり得ません。**固定半径での「十分大きい $n$」と、全半径での「一つの $n$」を取り違えない**ことが要点です。
<!-- solution-end -->

<a id="ex-gmt2-b3"></a>

**B3. 臨界指数の反例を組み立てる**

- Level: B
- 問題: $n\ge2$ で縮小率 $\rho_n=2^{-n/(n-1)}$ の二分Cantor集合 $C_n\subset[0,1]$ を取り、$K=\{0\}\cup\bigcup_{n\ge2}(2^{-n}+2^{-3n}C_n)$ とする。$K$ のコンパクト性、$\dim_HK=1$、$\mathcal H^1(K)=0$ を確かめ、指数1のFrostman確率測度が存在しないことを証明せよ。

<!-- solution-start -->
**詳細解答**

各 $C_n$ は閉区間の減少列の共通部分なのでコンパクトです。また $2^{-n}+2^{-3n}C_n\subset[2^{-n},2^{-n}+2^{-3n}]$ は $n\to\infty$ で一様に0へ近づきます。$K$ 内の点列が同じ成分へ無限回入るならその閉性で極限は $K$ に属し、成分番号が無限大へ向かう部分列なら極限は0です。従って $K$ は有界閉集合、ゆえにコンパクトです。

深さ $k$ の $C_n$ は長さ $\rho_n^k$ の区間 $2^k$ 個で覆えます。$2\rho_n<1$ なので、その全長は

$$
2^k\rho_n^k=(2\rho_n)^k\longrightarrow0
$$

です。従って $\mathcal H^1(C_n)=0$ です。

次元の下界では、中三分の [MT8のCantor測度の構成](../../MT/MT8/index.md#thm-mt8-cantor-dimension) と同様に、深さ $k$ の各基本区間へ質量 $2^{-k}$ を割り当てた確率測度 $\nu_n$ を使います。ただし縮小率が $1/3$ とは限らないため、区間間隔を改めて評価します。

$\beta_n=\log2/\log(1/\rho_n)$、$\ell=\rho_n^k$ と置きます。異なる深さ $k$ の基本区間の隙間は少なくとも

$$
g_k=(1-2\rho_n)\rho_n^{k-1}
=\frac{1-2\rho_n}{\rho_n}\ell
=:c_n\ell>0
$$

です。$\rho_n^{k+1}\le r<\rho_n^k=\ell$ と選ぶと、長さ $2r<2\ell$ の球区間が交わる基本区間の個数 $N$ は、隙間の合計 $(N-1)c_n\ell<2\ell$ から

$$
N\le 1+\left\lceil\frac{2}{c_n}\right\rceil=:N_n.
$$

よって $0<r<1$ では、$\rho_n^{\beta_n}=1/2$ を用いて

$$
\nu_n(B(x,r))
\le N_n2^{-k}
=N_n\ell^{\beta_n}
\le N_n\rho_n^{-\beta_n}r^{\beta_n}
=2N_nr^{\beta_n}.
$$

$r\ge1$ でも質量は1以下なので同じ評価が成立します。[MT8の質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)から $\dim_HC_n\ge\beta_n$。逆に $q>\beta_n$ なら深さ $k$ の被覆費用は $(2\rho_n^q)^k\to0$ なので $\dim_HC_n\le\beta_n$。従って

$$
\dim_HC_n=\beta_n=\frac{\log2}{\log(1/\rho_n)}
=\frac{n-1}{n}.
$$

平行移動と正倍率の写像は逆写像もLipschitzなので、[MT8のLipschitz写像による次元評価](../../MT/MT8/index.md#thm-mt8-lipschitz)を両方向に使うと次元は変わりません。可算合併に対して $\mathcal H^q$ の劣加法性を使えば、Hausdorff次元は成分次元の上限になるので $\dim_HK=\sup_n(n-1)/n=1$ です。一方、各成分の $\mathcal H^1$ は0で、点 $\{0\}$ も0ですから $\mathcal H^1(K)=0$。指数1のFrostman確率測度があるなら [内容量への下界](#thm-gmt2-content-equivalence)で $\mathcal H^1(K)\ge\mathcal H_\infty^1(K)>0$ となり矛盾します。
<!-- solution-end -->

### Level C：Frostman測度を別の幾何へ運ぶ

<a id="ex-gmt2-c1"></a>

**C1. コンパクト集合と線分の直積の次元**

- Level: C
- 問題: 空でないコンパクト集合 $K\subset\mathbb R^d$ について $\dim_H(K\times[0,1])=\dim_HK+1$ を示せ。下界では $0<s<\dim_HK$ のFrostman確率測度と区間のLebesgue確率測度の直積を用い、上界では $\dim_HK<t$ を満たす被覆から $K\times[0,1]$ の細かい被覆を作れ。$\dim_HK=0$ の場合も扱え。

<!-- solution-start -->
**詳細解答**

$\alpha=\dim_HK$ とします。まず $\alpha>0$、$0<s<\alpha$ とします。[Frostman補題](#thm-gmt2-frostman)により、$K$ 上に球成長評価 $\mu(B_d(x,r))\le Cr^s$ を満たす確率測度が存在します。

$[0,1]$ 上のLebesgue確率測度を $\lambda$ とすると、区間の長さから $\lambda((t-r,t+r))\le2r$ です。直積確率測度 $\nu=\mu\otimes\lambda$ は $K\times[0,1]$ に支えられます。

この直積測度の存在は、連続関数 $f$ に対する

$$
T(f)=\int_K\left(\int_0^1 f(x,t)\,dt\right)d\mu(x)
$$

が正線形で $T(1)=1$ を満たすことから [Riesz–Markov定理](../../MT/MT5/index.md#thm-mt5-riesz-markov-positive)で確認できます。内側の積分は $f$ の一様連続性から $x$ の連続関数です。

必要な長方形の積の計算も確認します。$A\subset K$、$J\subset[0,1]$ を開集合とし、前節の開集合近似と同じ方法で連続関数 $0\le f_m\uparrow\mathbf1_A$、$0\le h_m\uparrow\mathbf1_J$ を選びます。すると $f_m(x)h_m(t)\uparrow\mathbf1_{A\times J}(x,t)$ です。非負増加列には積分の単調収束を適用できるので、両辺の積分の極限を $T$ で計算します。

$$
\nu(A\times J)
=\lim_m T(f_mh_m)
=\lim_m\left(\int_K f_m\,d\mu\right)
\left(\int_0^1h_m\,dt\right)
=\mu(A)\lambda(J).
$$

従って開球を含む長方形の質量は実際に二つの周辺測度の積で計算できます。Euclid球の包含

$$
B_{d+1}((x,t),r)
\subset B_d(x,r)\times(t-r,t+r)
$$

から、右辺の長方形の測度を二つの周辺測度の積で計算すると

$$
\nu(B_{d+1}((x,t),r))
\le\mu(B_d(x,r))\lambda((t-r,t+r))
\le2Cr^{s+1}.
$$

[質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)で $\dim_H(K\times[0,1])\ge s+1$。$s\uparrow\alpha$ で $\ge\alpha+1$ です。$\alpha=0$ なら任意の $x_0\in K$ に対して $\{x_0\}\times[0,1]$ が含まれ、この線分は [MT8の区間次元の定理](../../MT/MT8/index.md#thm-mt8-interval-dimension) により次元1なので同じ下界が得られます。

上界では、球の縦座標に使った $t$ と区別して、被覆費用の指数を $q>\alpha$ と置きます。[MT8の臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)から $\mathcal H^q(K)=0$ です。

任意の $0<\delta<1$、$\varepsilon>0$ に対し、$K$ を覆う集合 $U_i$ を、$\rho_i=\operatorname{diam}U_i<\delta$ かつ $\sum_i\rho_i^q<\varepsilon$ となるよう選べます。

直径0の $U_i$ は周囲の任意に小さい球へ拡大できます。元の被覆を費用 $\varepsilon/2$ 未満に取り、追加費用の総和を $\varepsilon/2$ 未満にすれば、なお上記の費用上界を維持できます。従って以下では $0<\rho_i<\delta$ としてよいです。

各 $U_i\times[0,1]$ を $U_i\times J_{i,k}$ で覆い、$J_{i,k}$ を長さ高々 $\rho_i$ の区間として高々 $\lceil1/\rho_i\rceil\le2/\rho_i$ 個使います。各直積の直径は高々 $\sqrt2\rho_i$ であり、従って

$$
\sum_{i,k}\bigl(\operatorname{diam}(U_i\times J_{i,k})\bigr)^{q+1}
\le2(\sqrt2)^{q+1}\sum_i\rho_i^q
<2(\sqrt2)^{q+1}\varepsilon.
$$

また全ての直積の直径は $\sqrt2\delta$ 以下です。$\varepsilon\downarrow0$、次いで $\delta\downarrow0$ により $\mathcal H^{q+1}(K\times[0,1])=0$。よって $\dim_H(K\times[0,1])\le q+1$。$q\downarrow\alpha$ で上界 $\alpha+1$ を得ます。
<!-- solution-end -->

## 8. まとめと次の講義

- 正の非制限内容量は、どの有限段階でも正の質量を容量の範囲で配れることを保証する。
- 有限段階の原子には全半径の球成長評価がないが、固定球の評価を弱極限へ通すとFrostman測度が得られる。
- Frostman測度の存在は正の内容量と同値であり、$s<\dim_HK$ の任意の指数を実現する。ただし臨界指数 $s=\dim_HK$ は別の検証が要る。

次のGMT3では、構成した測度の $\mu(B(x,r))\le Cr^s$ から、より弱い指数 $0<t<s$ のRiesz energyが有限になることを導きます。球成長と積分核を結ぶ第一歩です。
