# LORG14 限界曲線補題

<!-- definition-example-audit: strict -->

## 1. 曲線を無限本集めても、因果曲線は残るのか

[LORG13の依存領域](../LORG13/index.md#def-lorg13-dependence)では、ある点から出る**すべての**非延長因果曲線を調べました。局所的な座標計算ができても、大域的に曲線が無限本あると、一つずつ計算することはできません。そこで因果曲線の列から収束部分列を選び、極限曲線を作る方法が必要です。

しかし点列に収束部分列があることと、曲線全体に収束部分列があることは別です。さらに、極限の接ベクトルが未来因果的か、できた曲線が途中で止まらないかも証明しなければなりません。ここでは**補助Riemann計量による弧長、局所の光円錐、Arzelà–Ascoliのコンパクト性**を組み合わせます。Lorentz長さが零となる光線にも適用できるよう、Lorentz固有時ではなく正定値な長さを使います。

以下 $(M,g)$ は境界のない滑らかな連結Hausdorff・第二可算、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ の時間向き付きLorentz多様体です。[LORG3の因果曲線](../LORG3/index.md#def-lorg3-causal-curve)を区分的 $C^1$ または局所Lipschitzの未来向き曲線として扱います。極限で得る曲線は一般に滑らかとは限りません。非延長は[LORG13の定義](../LORG13/index.md#def-lorg13-inextendible)に従います。

## 2. 正定値な補助計量と弧長パラメータ

[GEO10で導入した弧長パラメータ](../../GEO/GEO10/index.md#def-geo10-arc-length-parameter)を、正定値Riemann計量の曲線に拡張して使います。正定値なRiemann計量 $h$ を一つ固定し、その距離を $d_h$、曲線の $h$-長さを $\ell_h$ と記します。これは時空の $g$ とは**別のもの**です。$h$ は因果的未来を決めず、曲線の速さと収束を測る役だけを持ちます。必要なときは $h$ を完備に取ります。滑らかで第二可算な多様体には完備なRiemann計量が存在するため、この追加選択は可能です。

局所Lipschitz因果曲線については $s(u)=\int_{u_0}^u\sqrt{h(\gamma'(v),\gamma'(v))}\,dv$ と弧長関数を定めます。停留区間をつぶして同じ像を弧長変数 $s$ でたどり直すと、非定数部分でほとんど至る所 $h(\dot\gamma,\dot\gamma)=1$ となります。これは滑らかな正則曲線についての[GEO10の再表示定理](../../GEO/GEO10/index.md#thm-geo10-arc-length-reparam)に対応する、絶対連続曲線への拡張です。「ほとんど至る所」とは、弧長パラメータのLebesgue測度について零集合を除く意味です。$h$-長さが零の定数曲線は、以後の単位速さの仮定から外して別に扱います。

<a id="def-lorg14-h-arclength"></a>

<!-- formal-statement-start -->
> **定義（補助Riemann弧長パラメータ化）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ と正定値Riemann計量 $h$ に対し、局所Lipschitzの未来因果曲線 $\gamma:I\to M$ が **$h$-弧長パラメータ化**されるとは、ほとんど至る所で
>
> $$h(\dot\gamma(s),\dot\gamma(s))=1$$
>
> が成立することをいう。ここで $s$ は実数区間 $I$ 上のパラメータである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg14-h-arclength -->
**定義の確認**。二次元Minkowski時空で $g=-dt^2+dx^2$ とし、補助計量を $h=dt^2+dx^2$ とします。垂直線 $\gamma(s)=(s,0)$ は未来時間的で、速度 $(1,0)$ の $h$-二乗は $1$ です。一方、光線 $\lambda(s)=(s/\sqrt2,s/\sqrt2)$ は $g(\dot\lambda,\dot\lambda)=0$ でLorentz長さが零でも、$h(\dot\lambda,\dot\lambda)=1/2+1/2=1$ です。光線でも正定値弧長なら「速さ1」と測れます。

同じ光線を $u\mapsto(u,u)$ と書くと $h$-速度は $\sqrt2$ ですから弧長パラメータではありません。$s=\sqrt2u$ と変数を取り直して初めて上の形になります。
<!-- definition-example-end -->

距離の定義から、区間 $[s,t]$ における曲線の長さは端点間の距離以上なので、$h$-弧長曲線は

$$
d_h\bigl(\gamma(s),\gamma(t)\bigr)
\le \ell_h(\gamma|_{[s,t]})
=t-s\qquad(s<t)
$$

を満たします。これは**1-Lipschitz評価**です。因果曲線の極限で使う等連続性を、計量の正定値性から得たことに注目してください。

<a id="lem-lorg14-arclength-lipschitz"></a>

<!-- formal-statement-start -->
> **補題（弧長から1-Lipschitz評価へ）**  
> 正定値Riemann計量 $h$ に関して弧長パラメータ化された局所Lipschitz曲線 $\gamma:I\to M$ は、任意の $s,t\in I$ に対して
>
> $$d_h(\gamma(s),\gamma(t))\le |t-s|$$
>
> を満たす。特に基点 $\gamma(0)$ を固定すると、$|s|\le R$ における像は $d_h$-半径 $R$ の閉球に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

距離は二点を結ぶ経路の $h$-長さの下限です。$h$-弧長パラメータではパラメータ区間の長さがそのまま経路の $h$-長さになります。

<!-- proof-start -->
### 証明

$s<t$ として $h$-長さの定義にほとんど至る所の単位速さを代入すると、

$$
\ell_h(\gamma|_{[s,t]})
=\int_s^t\sqrt{h(\dot\gamma(u),\dot\gamma(u))}\,du
=\int_s^t1\,du=t-s.
$$

$d_h(\gamma(s),\gamma(t))$ は端点を結ぶ区分的滑らかな経路の長さの下限であり、局所Lipschitz曲線も滑らかな近似により同じ上界を与えます。従って不等式が成立します。$t=0$ を一方の端点とすれば閉球の包含が従います。$\square$
<!-- proof-end -->

## 3. なぜ極限が再び「未来因果的」なのか

1-Lipschitz評価だけからは、極限の接ベクトルが未来錐の中に入ることは分かりません。重要なのは、未来因果速度の集まりが**局所的に閉じた錐**になることです。各点の近くで時間座標 $\tau$ を選び、$\tau$ が未来因果ベクトル上で狭義に増加するようにします。

[LORG5の凸正規近傍](../LORG5/index.md#thm-lorg5-convex-normal-existence)を十分小さくし、閉包が一つの時間座標領域に収まる相対的な小領域 $U$ を取ります。$U$ 内の非零未来因果ベクトル $v$ の集合と $h(v,v)=1$ の共通部分は、各点の閉じた単位球面上の閉集合です。閉包上で一様に小さくした座標領域の単位速度錐をまとめるとコンパクトです。

その上で $d\tau(v)>0$ は連続ですから、正の下限 $c$ と有限の上限 $C$ が得られます。従って、像がこの小領域にある任意の $h$-単位速さ未来因果曲線について、ほとんど至る所

$$
0<c\le\frac{d}{ds}(\tau\circ\gamma)(s)\le C
$$

です。これを積分すると

$$
c(t-s)\le\tau(\gamma(t))-\tau(\gamma(s))
\le C(t-s)\qquad(s<t)
$$

となります。左の正の下限は、極限で有限のパラメータ区間が一点につぶれないことにも効きます。

因果的な速度条件を端点の極限へ移す理由も、局所座標で確かめます。任意の点 $p$ で、[LORG1の未来錐の定義](../LORG1/index.md#def-lorg1-future-cone)に合わせて $g_p=-d\tau^2+\sum_{i=1}^n(dx^i)^2$ となる座標を選び、$\mathbf x=(x^1,\ldots,x^n)$ と書きます。この表示は $p$ の接空間で時間向き付きLorentz正規直交基底を選んだもので、周囲の計量が一様にMinkowski計量になるという意味ではありません。

計量係数の連続性から、任意の $0<\delta<1$ について $p$ を囲む座標領域 $U_\delta$ を十分小さく取ると、その中のすべてのベクトル $v=(v^0,\mathbf v)$ に対し

$
g_x(v,v)\ge -(1+\delta)(v^0)^2+(1-\delta)|\mathbf v|^2
$

とできます。実際、係数行列と $\operatorname{diag}(-1,1,\ldots,1)$ の差の作用素ノルムを $\delta$ 以下にすれば、二次形式の差の絶対値は $\delta((v^0)^2+|\mathbf v|^2)$ 以下です。さらに $U_\delta$ を縮めれば、非零の未来因果ベクトルでは $v^0=d\tau(v)>0$ となります。したがって $g_x(v,v)\le0$ を上式と組み合わせると

$
|\mathbf v|\le K_\delta v^0,\qquad
K_\delta:=\sqrt{\frac{1+\delta}{1-\delta}}.
$

$U_\delta$ 内に像を持つ未来因果曲線 $\beta$ のほとんど至る所でこの不等式を適用し、速度を積分すれば

$
|\mathbf x(\beta(t))-\mathbf x(\beta(s))|
\le K_\delta\bigl(\tau(\beta(t))-\tau(\beta(s))\bigr)
\qquad(s<t)
$

となります。右辺は非負です。この**同じ座標・同じ定数**による端点不等式は、一様収束する曲線列の端点極限にも渡せます。最後に $\delta\downarrow0$ とすれば点 $p$ での元の未来錐が回復します。必要なのはこの局所評価であり、**時空全体の $J^+$ が閉じる**という仮定ではありません。

<a id="def-lorg14-local-uniform"></a>

<!-- formal-statement-start -->
> **定義（コンパクト部分区間上一様な収束）**  
> 実数の区間 $I$ 上の曲線列 $\gamma_k:I\to M$ が $\gamma:I\to M$ に **コンパクト部分区間上一様に収束**するとは、任意のコンパクト区間 $[a,b]\subset I$ に対し
>
> $$\sup_{s\in[a,b]}d_h(\gamma_k(s),\gamma(s))\longrightarrow0$$
>
> となることをいう。ここでは一つの補助計量 $h$ を固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg14-local-uniform -->
**定義の確認**。$M=\mathbb R^{1,1}$、$h=dt^2+dx^2$ で $\gamma_k(s)=(s,1/k)$、$\gamma(s)=(s,0)$ とすると、任意の $R>0$ に対して

$$
\sup_{|s|\le R}d_h(\gamma_k(s),\gamma(s))=\frac1k\to0.
$$

従って各コンパクト区間で一様収束します。各曲線は未来時間的、$h$-弧長パラメータ、両方向非延長です。無限のパラメータ全域で一様収束すると仮定する必要はありません。
<!-- definition-example-end -->

<a id="lem-lorg14-local-closedness"></a>

<!-- formal-statement-start -->
> **補題（因果曲線の局所一様極限）**  
> $(M,g)$ は滑らかな時間向き付きLorentz多様体、$h$ は正定値Riemann計量とする。実数の区間 $I$ 上の未来向き因果曲線列

$$
\gamma_k:I\longrightarrow M
$$

> は $h$-弧長でパラメータ化されているとする。また、$I$ の各コンパクト部分区間で、$\gamma_k$ が曲線 $\gamma:I\to M$ へ $d_h$-一様に収束すると仮定する。
>
> このとき極限 $\gamma$ は1-Lipschitzであり、任意の非自明な部分区間で非定数の未来向き局所Lipschitz因果曲線である。ただし極限の $h$-速さが1であるとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $\gamma_k$ の1-Lipschitz評価は極限に渡せます。短い区間を凸正規近傍へ閉じ込めれば、その区間内の端点の未来因果関係も極限へ渡せます。さらに局所時間座標の正の速度下界を使うことで、パラメータ区間が極限で停留してしまう可能性を排除します。

<!-- proof-start -->
### 証明

任意の $s,t\in I$ について三角不等式と[1-Lipschitz評価](#lem-lorg14-arclength-lipschitz)から

$$
d_h(\gamma(s),\gamma(t))
=\lim_{k\to\infty}d_h(\gamma_k(s),\gamma_k(t))
\le|t-s|.
$$

従って $\gamma$ は局所Lipschitzです。$s_0\in I$ を取り、$\gamma(s_0)$ の周りの小さな凸正規近傍 $U$ と、$s_0$ を含む十分短い閉区間 $[a,b]\subset I$ を選んで、$\gamma([a,b])$ が $U$ の内部のコンパクトな部分に入るようにします。一様収束から、大きな $k$ では $\gamma_k([a,b])$ も $U$ に収まります。

$\gamma$ の微分可能な内点 $s_0\in(a,b)$ を取って $p=\gamma(s_0)$ とし、前段の任意の $0<\delta<1$ に対する座標領域 $U_\delta$ を $p$ の周りに選びます。$s_0$ の近くに区間 $[s_0-\varepsilon,s_0+\varepsilon]$ を取れば、その像は $U_\delta$ 内にあり、一様収束により十分大きな $k$ で $\gamma_k$ の対応する像も $U_\delta$ 内に収まります。前段で導いた端点不等式を $\gamma_k$ に適用して $k\to\infty$ とすると

$
|\mathbf x(\gamma(t))-\mathbf x(\gamma(s))|
\le K_\delta\bigl(\tau(\gamma(t))-\tau(\gamma(s))\bigr)
$

です。$s=s_0$ として $t\downarrow s_0$、両辺を $t-s_0>0$ で割れば

$
|\dot{\mathbf x}(s_0)|\le K_\delta\dot\tau(s_0).
$

任意の $\delta>0$ で成り立つので $K_\delta\downarrow1$ として $|\dot{\mathbf x}(s_0)|\le\dot\tau(s_0)$ となります。$p$ では $g_p=-d\tau^2+|d\mathbf x|^2$ ですから

$
g_p(\dot\gamma,\dot\gamma)
=-(\dot\tau)^2+|\dot{\mathbf x}|^2\le0.
$

また $\dot\tau\ge0$ なので、この速度は零または未来因果ベクトルです。これはほとんど至る所の $s_0$ で成り立ちます。

さらに $[a,b]$ の近くで上の $c>0$ を固定すると、各 $k$ に対して

$$
\tau(\gamma_k(t))-\tau(\gamma_k(s))\ge c(t-s).
$$

$\tau$ の連続性と一様収束から、極限でも $\tau(\gamma(t))-\tau(\gamma(s))\ge c(t-s)>0$ です。よって $s<t$ なら $\gamma(s)\ne\gamma(t)$ であり、停留片は現れません。各点をこのような小区間で覆えば $\gamma$ は未来因果曲線です。$\square$
<!-- proof-end -->

注意：凸正規近傍の端点関係と局所的速度評価が証明の核です。**任意の時空で大域的な因果関係 $J^+$ が閉集合である**と仮定する必要はありません。

## 4. 完備な補助計量による部分列の抽出

距離空間で、関数列が同じLipschitz定数を持っていても、像が遠方へ逃げれば極限はありません。例えばMinkowski時空の縦線 $\gamma_k(s)=(s,k)$ は、$s=0$ での基点が無限遠へ逃げます。そこで基点列 $\gamma_k(0)$ が収束することを仮定します。

$\gamma_k$ が $h$-弧長パラメータで、区間 $[-R,R]$ をすべて含むなら、

$$
d_h(\gamma_k(s),p)
\le d_h(\gamma_k(s),\gamma_k(0))
+d_h(\gamma_k(0),p)
\le R+d_h(\gamma_k(0),p).
$$

基点が $p$ に収束すれば、右辺の最後の項は十分大きな $k$ で例えば $1$ 未満です。完備な有限次元Riemann多様体の[Hopf–Rinowの定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)から、閉じた有界な $h$-球はコンパクトです。よって $[-R,R]$ 上では、1-Lipschitzで同じコンパクト集合に値を持つ曲線にArzelà–Ascoliの定理を適用できます。



<a id="thm-lorg14-limit-curve"></a>

<!-- formal-statement-start -->
> **定理（限界曲線補題：一点集積・両側非延長の場合）**  
> $(M,g)$ を滑らかな時間向き付きLorentz多様体とし、$h$ を **完備** な補助Riemann計量とする。各 $k$ について
>
> $$\gamma_k:[-a_k,b_k]\to M,\qquad a_k,b_k>0$$
>
> は未来向きの $h$-弧長パラメータ化因果曲線であり、
>
> $$a_k\to\infty,\qquad b_k\to\infty,\qquad
> \gamma_k(0)\to p\in M$$
>
> と仮定する。このとき部分列と、未来向きの局所Lipschitz因果曲線 $\gamma:\mathbb R\to M$ が存在し、$\gamma(0)=p$ かつ任意の $R>0$ で $\gamma_k\to\gamma$ が $[-R,R]$ 上一様となる（十分大きな $k$ で $[-R,R]\subset[-a_k,b_k]$ とする）。さらに $\gamma$ は**過去・未来とも非延長**である。
>
> この結論に強因果性や大域双曲性は仮定しない。収束後の曲線が正確に $h$-単位速さとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

先に弧長の評価で各 $[-R,R]$ における像を共通のコンパクト閉球へ押し込みます。その後 $R=1,2,\ldots$ に対して部分列を順に選び直し、対角部分列を使います。因果性の保存には前節の局所補題を適用します。最後の非延長性では、極限が有限点へ収束したと仮定し、局所時間座標の正の速度下界と矛盾させます。

<!-- proof-start -->
### 証明

まず $R>0$ を固定します。大きな $k$ では区間 $[-R,R]$ が $\gamma_k$ の定義域に含まれ、基点が $p$ へ収束するので $d_h(\gamma_k(0),p)\le1$ です。[弧長の補題](#lem-lorg14-arclength-lipschitz)を $s$ と $0$ に適用すると

$$
d_h(\gamma_k(s),p)
\le |s|+1\le R+1,\qquad |s|\le R.
$$

$h$ の完備性と[Hopf–Rinowの定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)から閉球 $\overline B_h(p,R+1)$ はコンパクトです。曲線列はそこで一様に1-Lipschitzなので、Arzelà–Ascoliにより $[-R,R]$ 上一様収束する部分列があります。

$R=1$ で選んだ部分列から $R=2$ でさらに部分列を取り、一般に $R=m$ で前段階の部分列から抽出します。各段階の第 $m$ 項を取る対角部分列は、どの固定整数 $R=m_0$ に対しても $m\ge m_0$ 以降、第 $m_0$ 段階の部分列に属します。従ってすべての $[-R,R]$ で一様収束します。重なる区間の極限は一意なので、これらは一つの $\gamma:\mathbb R\to M$ を定め、$\gamma(0)=p$ です。

[局所一様極限の補題](#lem-lorg14-local-closedness)を各コンパクト区間へ適用すれば、$\gamma$ は未来因果的な局所Lipschitz曲線です。

最後に未来非延長性を示します。もし $s\to+\infty$ で $\gamma(s)$ が時空内の点 $q$ に収束するなら、$q$ の周りに局所時間座標 $\tau$ と、閉包の小さい領域 $U$ を取れます。十分大きな $S$ から先は $\gamma([S,\infty))$ が $U$ の内部のさらに小さい領域に入ります。任意の有限 $T>S$ に対し一様収束により大きな $k$ では $\gamma_k([S,T])\subset U$ です。従って第3節の**同じ定数** $c>0$ を使って

$$
\tau(\gamma_k(T))-\tau(\gamma_k(S))\ge c(T-S)
$$

となります。$k\to\infty$ とすれば極限にも同じ不等式が成り立ちます。しかし左辺は $T\to+\infty$ で $\tau(q)-\tau(\gamma(S))$ という有限数に収束し、右辺は無限大へ発散します。矛盾です。過去側も $s\to-\infty$ で同じ時間座標の評価を行えば、有限の過去端点を持てません。ゆえに両方向非延長です。$\square$
<!-- proof-end -->

上の非延長の結論は「定義域が $\mathbb R$ だから」ではありません。例えば $\eta(s)=(\tanh s,0)$ は全実数上の未来時間的曲線ですが、$s\to+\infty$ で $(1,0)$ に収束し延長できます。$\eta$ はEuclid計量で単位弧長パラメータ化されて**いない**ので、本定理とは矛盾しません。

## 5. 両端点を持つ曲線列にどう応用するか

後続の大域双曲性や最大曲線の議論では、始点と終点が変動する曲線列を扱います。そこで今回示した局所保存性から、長さが一様に抑えられる場合に限り、端点の極限も因果的に結べることを取り出します。

<a id="prop-lorg14-bounded-length"></a>

<!-- formal-statement-start -->
> **命題（補助弧長が一様有界な端点列）**  
> $(M,g)$ は滑らかな時間向き付きLorentz多様体、$h$ は完備な補助Riemann計量とする。未来因果曲線 $\sigma_k$ が $p_k$ から $q_k$ を結び、
>
> $$p_k\to p,\qquad q_k\to q,\qquad
> \ell_h(\sigma_k)\le L<\infty$$
>
> を満たすなら、$p$ から $q$ を結ぶ未来因果曲線（$p=q$ の場合は定数曲線を許す）が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

長さを $[0,1]$ 上の速度上界へ変換すれば等連続性が得られます。限界曲線の局所因果性に加え、両端点での収束を確認します。

<!-- proof-start -->
### 証明

$\sigma_k$ を $h$-弧長でパラメータ化した後、区間を $[0,1]$ に線形に移して $\alpha_k$ と置きます。全長を $L_k=\ell_h(\sigma_k)$ とすると、$s\in[0,1]$ での速さはほとんど至る所 $L_k$ です（$L_k=0$ の場合は定数曲線）。従って

$$
d_h(\alpha_k(s),\alpha_k(t))
\le L_k|s-t|\le L|s-t|.
$$

始点 $p_k$ が $p$ に収束するため、像は十分大きい $k$ で閉球 $\overline B_h(p,L+1)$ に収まります。[Hopf–Rinowの定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)とArzelà–Ascoliから一様収束部分列 $\alpha_k\to\alpha$ を得ます。$L_k$ の部分列も $L_k\to L_*\in[0,L]$ とできます。

$L_*>0$ なら、十分大きな $k$ で $L_k\ge L_*/2>0$ です。局所時間座標領域に入る短い区間では、$\alpha_k$ の $h$-速度が $L_k$ なので、単位弧長速度に対する第3節の評価を積分して

$
\tau(\alpha_k(t))-\tau(\alpha_k(s))
\ge cL_k(t-s)\ge \frac{cL_*}{2}(t-s)
$

を得ます。さらに第3節の座標錐による端点不等式は速度の正規化に依存しないので、$\alpha_k\to\alpha$ の極限にも渡せます。極限の微分可能点で区間幅を零へ縮めれば $\dot\alpha$ は未来因果的であり、上の正の下界で停留片もありません。従って $\alpha$ は未来因果曲線です。$L_*=0$ なら任意の $s,t$ で $d_h(\alpha_k(s),\alpha_k(t))\le L_k|s-t|\to0$ となるので $\alpha$ は定数であり、$p=q$ です。最後に $\alpha_k(0)=p_k\to p$、$\alpha_k(1)=q_k\to q$ より $\alpha(0)=p$、$\alpha(1)=q$ です。$\square$
<!-- proof-end -->

**仮定を外したとき**。点除去Minkowski時空 $M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$ の $p=(-1,-1)$ と $q=(1,1)$ を考えます。全Minkowski時空では唯一の因果経路が $t=x$ で原点を通るため、$M_*$ の中では $p\not\le q$ です。一方 $q_k=(1,1-1/k)$ は $p\ll q_k$ を満たし、原点を避ける時間的曲線で結べます。$q_k\to q$ なのに $p\not\le q$ です。

ここで「経路が原点へ近づくため、コンパクトな場所に収まらない」という部分が破綻点です。$M_*$ 上の**完備な**補助計量で $p$ から $q_k$ への因果経路の弧長が一様有界なら、上の命題により $p\le q$ となって矛盾するので、そのような一様有界性は実際にありません。Euclid計量を穴あき時空へ制限したものは不完備であり、それを命題の $h$ に代用できません。

## 6. 演習：正規化・収束・非延長を見分ける

<a id="ex-lorg14-a01"></a>
### LORG14-A01 時間的直線と光線の弧長
- Level: A

二次元Minkowski時空で $g=-dt^2+dx^2$、$h=dt^2+dx^2$ とする。$\gamma(u)=(2u,u)$ と $\lambda(u)=(u,u)$ を $h$-弧長パラメータ化せよ。どちらが時間的か光的かも判定せよ。

<!-- solution-start -->
**詳細解答**。速度はそれぞれ $(2,1)$、$(1,1)$ なので $h$-速さは $\sqrt5$、$\sqrt2$、$g$-二乗は $-4+1=-3$、$-1+1=0$ です。従って前者は時間的、後者は光的です。$s=\sqrt5u$ および $s=\sqrt2u$ とすると

$$
\gamma(s)=(2s/\sqrt5,s/\sqrt5),\qquad
\lambda(s)=(s/\sqrt2,s/\sqrt2).
$$

新しい速度の $h$-二乗は前者で $(4+1)/5=1$、後者で $(1+1)/2=1$ です。時間成分も正なので、両者とも未来因果的な単位弧長曲線です。
<!-- solution-end -->

<a id="ex-lorg14-a02"></a>
### LORG14-A02 1-Lipschitz評価を使う
- Level: A

$h$-弧長曲線が $\gamma(0)=p$ を満たすとき、$-3\le s\le3$ の像がどの閉球に含まれるか示せ。また $d_h(\gamma(-1),\gamma(2))$ の上界を答えよ。

<!-- solution-start -->
**詳細解答**。[弧長の補題](#lem-lorg14-arclength-lipschitz)で $t=0$ とすれば $d_h(\gamma(s),p)\le|s|\le3$ なので閉球 $\overline B_h(p,3)$ に含まれます。また $s=-1,t=2$ なら

$$
d_h(\gamma(-1),\gamma(2))\le|2-(-1)|=3.
$$

これはRiemann距離の評価であり、Lorentz時間分離の評価ではありません。
<!-- solution-end -->

<a id="ex-lorg14-a03"></a>
### LORG14-A03 コンパクト区間での一様収束の計算
- Level: A

$\gamma_k(s)=(s,1/k)$、$\gamma(s)=(s,0)$ を $s\in\mathbb R$ で定義する。Euclid補助計量で $[-R,R]$ 上の一様距離を計算し、極限が未来因果的か判定せよ。

<!-- solution-start -->
**詳細解答**。任意の $s$ で $d_h(\gamma_k(s),\gamma(s))=1/k$ なので、上限も $1/k$ です。従って任意の $R>0$ で一様に零へ収束します。極限の速度は $(1,0)$ で、

$$
g((1,0),(1,0))=-1<0,\qquad dt/ds=1>0.
$$

よって未来時間的です。定義域は全実数で時刻が両端で無限大へ向かうため、両方向非延長でもあります。
<!-- solution-end -->

<a id="ex-lorg14-a04"></a>
### LORG14-A04 定義域が全実数でも延長できる
- Level: A

$\eta(s)=(\tanh s,0)$ を二次元Minkowski時空の曲線とする。未来因果性、未来非延長性、Euclid補助計量での単位弧長条件を順に判定せよ。

<!-- solution-start -->
**詳細解答**。導関数は $\dot\eta(s)=(\operatorname{sech}^2s,0)$ です。$\operatorname{sech}^2s>0$ なので未来時間的であり、$g(\dot\eta,\dot\eta)=-\operatorname{sech}^4s<0$ です。しかし $s\to+\infty$ で $\eta(s)\to(1,0)$ と有限点に近づき、その点を付け足せるので未来非延長ではありません。また $h(\dot\eta,\dot\eta)=\operatorname{sech}^4s$ は $1$ に恒等的に等しくないので単位弧長条件は満たしません。
<!-- solution-end -->

<a id="ex-lorg14-a05"></a>
### LORG14-A05 逃げる基点
- Level: A

$\gamma_k(s)=(s,k)$ をMinkowski時空の $[-2,2]$ 上で考える。各曲線が1-Lipschitzであるにもかかわらずコンパクト区間上一様に収束する部分列がない理由を述べよ。

<!-- solution-start -->
**詳細解答**。各曲線の速度は $(1,0)$ なので $h$-単位速さで、$d_h(\gamma_k(s),\gamma_k(t))=|s-t|$ です。しかし $\gamma_k(0)=(0,k)$ はどの部分列でも有限点へ収束しません。もし曲線の一様収束部分列があれば、$s=0$ での値も収束するはずなので矛盾します。つまり等連続性に加えて基点の集積性（または像の相対コンパクト性）が必要です。
<!-- solution-end -->

<a id="ex-lorg14-b01"></a>
### LORG14-B01 対角部分列の構成
- Level: B

各 $[-m,m]$ 上で1-Lipschitzかつ同じコンパクト集合に値を持つ曲線の列から、全実数上のコンパクト区間上一様に収束する部分列を構成せよ。

<!-- solution-start -->
**詳細解答**。まず $[-1,1]$ 上でArzelà–Ascoliを使い、一様収束部分列 $S_1$ を選びます。次にこの部分列から、$[-2,2]$ 上で一様収束する部分列 $S_2$ を取ります。

帰納的に、$[-m,m]$ 上で一様収束する部分列 $S_m$ を、直前の $S_{m-1}$ から選びます。添字が元の列で狭義増加するように、各 $S_m$ の十分後ろの項を一つずつ選んで対角部分列を作ります。

任意の $R>0$ に対して整数 $m_0\ge R$ を固定します。対角部分列の十分後ろの項はすべて $S_{m_0}$ に属します。この列は $[-m_0,m_0]$ 上で一様収束するため、特に $[-R,R]$ 上で一様収束します。

各段階の一様極限は重なる区間上で一致します。したがって対角部分列は、全実数上の一つの曲線へ各コンパクト区間で一様に収束します。
<!-- solution-end -->

<a id="ex-lorg14-b02"></a>
### LORG14-B02 極限で速度下界を保つ
- Level: B

局所時間座標 $\tau$ と正数 $c$ について、単位 $h$-弧長因果曲線列が共通の座標領域にあり、$\tau(\gamma_k(t))-\tau(\gamma_k(s))\ge c(t-s)$ を満たすとする。$\gamma_k\to\gamma$ が一様なら、$s<t$ で $\gamma(s)\ne\gamma(t)$ を証明せよ。

<!-- solution-start -->
**詳細解答**。固定した $s<t$ で一様収束により $\gamma_k(s)\to\gamma(s)$、$\gamma_k(t)\to\gamma(t)$ です。$\tau$ は連続なので不等式の左右を極限に渡せます。

$$
\tau(\gamma(t))-\tau(\gamma(s))\ge c(t-s)>0.
$$

もし $\gamma(s)=\gamma(t)$ なら左辺は零となり矛盾します。因果錐が閉であることだけでなく、**正の下界**が区間のつぶれを防ぐことが分かります。
<!-- solution-end -->

<a id="ex-lorg14-b03"></a>
### LORG14-B03 端点列の有界弧長
- Level: B

未来因果曲線 $\sigma_k$ が $p_k\to p$、$q_k\to q$ を結び、完備補助計量で $\ell_h(\sigma_k)\le7$ とする。$p\le q$ が得られる理由を、曲線の再パラメータ化、共通コンパクト集合、端点収束の三段階で説明せよ。

<!-- solution-start -->
**詳細解答**。各曲線の弧長を $L_k\le7$ とし、$[0,1]$ へ線形に再パラメータ化します。すると $\alpha_k$ の距離変化は $d_h(\alpha_k(s),\alpha_k(t))\le7|s-t|$ です。$p_k\to p$ なので、大きな $k$ で像は閉球 $\overline B_h(p,8)$ に含まれ、完備性とHopf–Rinowによりこの球はコンパクトです。

Arzelà–Ascoliで一様収束する部分列を選び、さらに $L_k\to L_*$ とします。$L_*>0$ なら局所因果性保存によって極限は未来因果曲線です。$L_*=0$ なら全区間の像の直径が零へ行くので極限は定数曲線です。最後に $\alpha(0)=\lim p_k=p$、$\alpha(1)=\lim q_k=q$ なので、いずれも $p\le q$ が従います。[端点列の命題](#prop-lorg14-bounded-length)の仮定をすべて使用しました。
<!-- solution-end -->

<a id="ex-lorg14-b04"></a>
### LORG14-B04 一般の因果性条件と混同しない
- Level: B

限界曲線補題の仮定に強因果性を加えなくてもよい理由を述べ、代わりにどの**局所**性質が因果性保存に必要か説明せよ。また $J^+$ の大域的閉性を仮定する証明が不適切な理由も述べよ。

<!-- solution-start -->
**詳細解答**。各短いパラメータ区間に対し、曲線と十分後ろの近似曲線を同一の凸正規近傍に閉じ込めます。そこで指数写像の逆ベクトルが閉じた未来錐へ属するという条件を通じ、端点の因果関係を極限に渡せます。時間座標の正の速度下界も局所的に取れるので停留片を排除できます。強因果性は[LORG10の定義](../LORG10/index.md#def-lorg10-strong-causality)では**大域の曲線について**小さな因果的凸近傍を要求する条件ですが、上の局所証明はそれを要求しません。一般時空で大域的 $J^+$ は閉とは限らず、[LORG7の反例](../LORG7/index.md#prop-lorg7-punctured-nonclosed)と同じく到達関係の閉性を無条件に使うことはできません。
<!-- solution-end -->

<a id="ex-lorg14-c01"></a>
### LORG14-C01 点除去時空と限界曲線の境界
- Level: C

点を除去したMinkowski時空と次の点列を考える。

$$
M_*=\mathbb R^{1,1}\setminus\{(0,0)\},\quad
p=(-1,-1),\quad q=(1,1),\quad q_k=(1,1-1/k)
$$

ここで $k\ge2$ とする。

1. $p\ll q_k$ を示し、原点を避ける未来時間的曲線があることを説明せよ。
2. $M_*$ 内で $p\le q$ が成り立たない理由を証明せよ。
3. $M_*$ 上の任意の完備補助Riemann計量 $h$ について、$p$ から $q_k$ を結ぶ因果曲線の $h$-長さが一様有界にはできないことを示せ。

<!-- solution-start -->
**詳細解答**。(1) $p$ から $q_k$ への変位は $(2,2-1/k)$ です。$2>|2-1/k|$ だから[Minkowskiの時間的到達条件](../LORG6/index.md#thm-lorg6-minkowski-futures)で $p\ll q_k$ です。直線経路の速度は $(2,2-1/k)$、Lorentz二乗は $-4+(2-1/k)^2<0$ です。この直線は $t=0$ のとき $x=-1+(2-1/k)/2=-1/(2k)\ne0$ を通るため原点を避け、$M_*$ 内の時間的曲線となります。

(2) $p$ から $q$ への変位は $(2,2)$ です。未来因果曲線を時刻 $t$ で表すと $|dx/dt|\le1$ なので

$$
x(1)-x(-1)=2
=\int_{-1}^{1}x'(t)\,dt
\le\int_{-1}^{1}|x'(t)|\,dt
\le2.
$$

両端が等号なのでほとんど至る所 $x'(t)=1$ です。初期条件 $x(-1)=-1$ から $x(t)=t$、特に原点を通らざるを得ません。原点は除去されているので $M_*$ の因果曲線は存在しません。

(3) 一様上界 $L$ が存在すると仮定します。$p_k=p$、$q_k\to q$、完備な $h$、$\ell_h\le L$ はすべて[有界弧長の端点命題](#prop-lorg14-bounded-length)の仮定です。従って $p\le q$ を結論しますが、(2)に反します。ゆえに長さの一様上界は不可能です。破綻するのは因果錐の局所閉性ではなく、欠損点へ近づく曲線族のコンパクト性です。
<!-- solution-end -->

## 7. ここまでで何が可能になったか

曲線の列から部分列を選ぶには「単位弧長 → 1-Lipschitz → 完備な補助計量で閉球がコンパクト → 対角抽出」という段階が必要でした。極限が未来因果的で非延長なのは、単なる連続関数の収束ではなく、**局所的な閉じた未来錐と時間座標の正の速度下界**を追加したためです。

次のLORG15ではCauchy超曲面の交差条件を具体例で検証します。LORG16では今回の限界曲線の抽出を、因果ダイヤモンドのコンパクト性という大域条件と結び付けます。最大化因果曲線の存在に必要なLorentz長さの半連続性は、さらに後のLORG17–18で別途扱います。限界曲線補題**だけ**で長さの最大化まで済ませたわけではありません。

参考：E. Minguzzi, *Lorentzian causality theory*, Living Reviews in Relativity (2019), §2.6（限界曲線定理）。