# GMT12 可算整流可能集合の定義と例

<!-- definition-example-audit: strict -->

[GMT11の面積公式](../GMT11/index.md#thm-gmt11-area-formula)は、パラメータ空間から Lipschitz 写像で作った像の面積を、微分の倍率と重複度で数える公式でした。ところが、観察対象の集合が最初から一枚の曲面として与えられるとは限りません。折れ曲がった曲線、互いに離れた可算個の曲面、あるいは測度が零の細かい付着物も扱いたいのです。

そこで「**ほとんどすべての点が、可算個の Lipschitz パラメータ表示に乗る**」という条件を導入します。この条件が *可算整流可能性* です。単なる Hausdorff 次元の値とは異なり、集合が積分できる曲面状の片へ分解できるかを表します。一方、どの Lipschitz 曲線とも長さの意味で重ならない集合もあります。本講義では両者を区別し、具体的な反例まで証明します。

以下は整数 $1\le m\le d$ を固定し、$\mathcal H^m$ を [MT8の直径による非正規化 Hausdorff 測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)とします。$m$ 次元 Lebesgue 測度を $\mathcal L^m$ と書きます。

[GMT10の比例定数](../GMT10/index.md#lem-gmt10-hausdorff-normalization)は次のとおりです。

$$
c_m=\mathcal H^m([0,1]^m).
$$

特に $c_1=1$ ですが、一般の次元で $c_m=1$ と置いてはいけません。

## 1. 「可算枚のパラメータ片で、零集合を除いて覆う」

例えば二本の線分の和集合には一つの滑らかなパラメータ表示がなくても、それぞれを別々の Lipschitz 写像の像として表せます。これを可算個に増やし、さらに $\mathcal H^m$-零集合を取り除く許容を加えます。

ここではパラメータ写像を $\mathbb R^m$ **全体**で定義します。局所グラフ上の写像は、後に示すように閉立方体へ制限したうえで全空間へ Lipschitz に延長できるので、この約束で通常の具体例を失いません。「零集合を除く」とは集合の等号ではなく、差集合の **$m$ 次元 Hausdorff 測度が零**という意味です。

<a id="def-gmt12-countably-rectifiable"></a>

<!-- formal-statement-start -->
> **定義（可算m-整流可能集合）**  
> $1\le m\le d$、$E\subset\mathbb R^d$ は $\mathcal H^m$-可測集合とする。Lipschitz 写像 $f_j:\mathbb R^m\to\mathbb R^d$（$j\in\mathbb N$）で

$$
\mathcal H^m\left(E\setminus\bigcup_{j=1}^{\infty}f_j(\mathbb R^m)\right)=0
$$

> を満たすものが存在するとき、$E$ を **可算 $m$-整流可能（countably $m$-rectifiable）**という。写像の各像をパラメータ片、残る零測度部分を例外部分と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt12-countably-rectifiable -->
### 直接例：折れ線と付着した零集合

**定義の確認**：各パラメータ写像を全実数上で作り、被覆から漏れる点の $\mathcal H^1$ 測度が零であることを直接調べます。

$E=([0,1]\times\{0\})\cup(\{1\}\times[0,1])\subset\mathbb R^2$ とします。$E$ は二つの閉線分の和集合なので Borel 集合、従って $\mathcal H^1$-可測です。$p(t)=\min(1,\max(0,t))$ と置けば、$p:\mathbb R\to[0,1]$ は $1$-Lipschitz です。したがって

$$
f_1(t)=(p(t),0),\qquad
f_2(t)=(1,p(t))
$$

は $\mathbb R$ 上の Lipschitz 写像で、$E=f_1(\mathbb R)\cup f_2(\mathbb R)$ です。$j\ge3$ には $f_j=f_1$ と置けば定義の可算族になり、差集合は空で $\mathcal H^1=0$、ゆえに $E$ は可算 $1$-整流可能です。

さらに任意の $Z\subset\mathbb R^2$ が $\mathcal H^1(Z)=0$ なら、$E\cup Z$ の二つの像から漏れる点は $Z$ に含まれます。よって、$Z$ が $\mathcal H^1$-可測なとき $E\cup Z$ も可算 $1$-整流可能です。**集合全体が厳密に曲線の和集合である必要はない**という定義の条件を直接確認できました。
<!-- definition-example-end -->

この定義で求められるのは「各点が一つの滑らかな曲線に乗る」ことではありません。微分不能な折り目を持つ Lipschitz 像も許しますし、面積に寄与しない例外集合も許します。ただし、正の $\mathcal H^m$ 測度を持つ部分を無条件に捨てることはできません。

## 2. 滑らかなグラフから可算整流可能性を作る

実際に使いやすい判定法は、グラフを座標から持ち上げることです。$U\subset\mathbb R^m$ を開集合、$g:U\to\mathbb R^{d-m}$ を $C^1$ 写像（各成分の1階偏導関数が連続な写像）とし、

$$
G(x)=(x,g(x)),\qquad x\in U
$$

と置きます。最初の $m$ 座標を射影すれば元の $x$ が回復するので、グラフは重なりません。問題は $Dg$ が $U$ 全体で有界とは限らず、$G$ が大域的 Lipschitz でないことです。そこで、各点の近くの閉立方体へ細分します。

<a id="prop-gmt12-c1-graphs"></a>

<!-- formal-statement-start -->
> **命題（C1グラフは可算整流可能）**  
> $1\le m\le d$ とし、$U\subset\mathbb R^m$ は開集合、$g:U\to\mathbb R^{d-m}$ は $C^1$ 写像とする。このとき

$$
\operatorname{Graph}(g)=\{(x,g(x)):x\in U\}
$$

> は可算 $m$-整流可能である。$U$ の互いに異なる可算個の $C^1$ グラフの和集合も可算 $m$-整流可能である。
<!-- formal-statement-end -->

### 証明の見取り図

$U$ を内部が $U$ に含まれる有理端点の閉立方体 $Q_j$ で覆います。$Q_j$ 上で $Dg$ の最大ノルム $M_j$ は有限です。線分に沿って微分を積分すればグラフ写像は Lipschitz で、座標ごとの「切り詰め写像」によって $\mathbb R^m$ 全体へ拡張できます。

<!-- proof-start -->
### 証明

任意の $x\in U$ に対し $\overline{B(x,2r)}\subset U$ となる $r>0$ を選び、$x$ を含み $U$ に収まる有理端点の閉立方体を選べます。こうした立方体は高々可算個で、$U=\bigcup_jQ_j$ です。各 $Q_j$ は凸でコンパクトなので

$$
M_j=\sup_{x\in Q_j}\|Dg(x)\|_{\mathrm{op}}<\infty.
$$

$x,y\in Q_j$ に対し線分 $\gamma(t)=x+t(y-x)$（$0\le t\le1$）は $Q_j$ 内です。ここで $Dg(z)$ は点 $z$ における全微分であり、[微分の Jacobian 行列表現](../../../基礎科目/RA/RA6/index.md#prop-ra6-derivative-jacobian)により $\mathbb R^m$ から $\mathbb R^{d-m}$ への線形写像として作用します。$t$ で動くのは $\gamma(t)$ であり、$x,y$ は固定です。[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)により

$$
\frac{d}{dt}g(\gamma(t))
=Dg(\gamma(t))\gamma'(t)
=Dg(x+t(y-x))(y-x).
$$

これを [微積分学の基本定理II](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)で $t=0$ から $1$ まで積分すると

$$
g(y)-g(x)=\int_0^1Dg(x+t(y-x))(y-x)\,dt,
$$

$$
|g(y)-g(x)|\le M_j|y-x|.
$$

よって $|G(y)-G(x)|^2=|y-x|^2+|g(y)-g(x)|^2\le(1+M_j^2)|y-x|^2$ です。閉立方体 $Q_j=\prod_{k=1}^m[a_k,b_k]$ に対し、各座標を $[a_k,b_k]$ に切り詰める写像 $P_j:\mathbb R^m\to Q_j$ は

$$
|P_j(u)-P_j(v)|^2
=\sum_k|p_k(u_k)-p_k(v_k)|^2
\le\sum_k|u_k-v_k|^2
$$

を満たし、$Q_j$ 上では恒等写像です。従って $F_j=G\circ P_j:\mathbb R^m\to\mathbb R^d$ は $\sqrt{1+M_j^2}$-Lipschitz で $F_j(Q_j)=G(Q_j)$。以上から

$$
\operatorname{Graph}(g)
=\bigcup_j F_j(Q_j)
\subset\bigcup_jF_j(\mathbb R^m)
$$

となり、定義の差集合は空です。$C^1$ グラフの可算個の和集合でも、その各立方体についての可算族を並べ直せばよいので同じ結論を得ます。$\square$
<!-- proof-end -->

この命題は、局所的な $C^1$ 座標グラフで覆える通常の埋め込み $C^1$ 曲面にも適用できます。$m$ 次元座標を取る位置が場所ごとに違っても、有限個の座標の入れ替えと直交写像の合成で Lipschitz 性は保たれます。**全体で一つのグラフになることは必要ありません**。

### 面積が正で有限なグラフの実例

$Q=[0,1]^m$ を含む開集合で定義された $C^1$ 写像 $g:\mathbb R^m\supset U\to\mathbb R^{d-m}$ について、$Q$ 上で $\|Dg(x)\|_{\mathrm{op}}\le M$ とします。$G(x)=(x,g(x))$ は最初の $m$ 座標から $x$ が復元できるので単射であり、$Q$ 上では $\sqrt{1+M^2}$-Lipschitz です。

面積を測る行列が現れる理由を確認します。[微分の行列表現](../../../基礎科目/RA/RA6/index.md#prop-ra6-derivative-jacobian)から、標準基底での $Dg(x)$ は $(d-m)\times m$ 行列です。$h\in\mathbb R^m$ に沿うグラフの微分は $DG(x)h=(h,Dg(x)h)$ なので、$I_m$ を $m$ 次単位行列、上付き $\mathsf T$ を転置として

$$
DG(x)=\begin{pmatrix}I_m\\Dg(x)\end{pmatrix},
\qquad
DG(x)^{\mathsf T}DG(x)=I_m+Dg(x)^{\mathsf T}Dg(x).
$$

実際、$|DG(x)h|^2=|h|^2+|Dg(x)h|^2$ だから、右辺は微分が各方向の長さをどう変えるかを表す Gram 行列です。[幾何的 Jacobian の定義](../GMT10/index.md#def-gmt10-geometric-jacobian)に従ってその行列式の平方根が $m$ 次元の面積倍率になります。$Q$ はコンパクトで $U$ は開集合なので、$Q$ を内包する少し大きな閉立方体 $Q_\varepsilon\subset U$ を取れます。$Dg$ は $Q_\varepsilon$ 上で有界であり、凸性と線分積分によりその内部で $G$ は Lipschitz です。$Q$ は Borel 集合で $G$ は単射ですから、[GMT11の面積公式](../GMT11/index.md#thm-gmt11-area-formula)の重複度は像上で $1$ となり

$$
\mathcal H^m(G(Q))
=c_m\int_Q\sqrt{\det(I_m+Dg(x)^{\mathsf T}Dg(x))}\,dx.
$$

任意の $h\in\mathbb R^m$ に対して $0\le|Dg(x)h|^2\le M^2|h|^2$ なので

$$
|h|^2\le h^{\mathsf T}(I_m+Dg(x)^{\mathsf T}Dg(x))h
\le(1+M^2)|h|^2.
$$

対称な Gram 行列の固有値はこの二次形式の上下界から $[1,1+M^2]$ に入ります。その $m$ 個の固有値の積が行列式なので、平方根を取って

$$
0<c_m\le\mathcal H^m(G(Q))
\le c_m(1+M^2)^{m/2}<\infty.
$$

例えば $m=1,d=2,g(t)=t^2$ とすると $G'(t)=(1,2t)$ であり、

$$
\mathcal H^1(G([0,1]))
=\int_0^1\sqrt{1+4t^2}\,dt,\qquad
1\le\mathcal H^1(G([0,1]))\le\sqrt5.
$$

曲線の長さが正で有限という二条件を、単なる「滑らかだから」ではなく積分の具体的な上下界で検証しました。

## 3. 面積を失わない操作と、失うと壊れる操作

零集合を捨ててもよい理由と、どの程度まで可算個の曲面片へ分けられるかを整理します。

<a id="prop-gmt12-stability"></a>

<!-- formal-statement-start -->
> **命題（可算整流可能性の安定性とsigma有限性）**  
> $1\le m\le d$ とする。
>
> 1. 可算 $m$-整流可能集合の可算和集合は可算 $m$-整流可能である。
> 2. $E$ が可算 $m$-整流可能、$Z$ が $\mathcal H^m(Z)=0$ の可測集合なら、$E\cup Z$ および $E\setminus Z$ は可算 $m$-整流可能である。
> 3. $E$ が可算 $m$-整流可能なら、$\mathcal H^m$ の $E$ への制限は $\sigma$-有限である。すなわち $E$ は $\mathcal H^m$-測度が有限な可算個の可測集合の和集合で覆える。
<!-- formal-statement-end -->

### 証明の見取り図

可算族を可算個集めても可算です。$m$ 次元の各パラメータ立方体の Lipschitz 像は、[MT8の Lipschitz 測度評価](../../MT/MT8/index.md#thm-mt8-lipschitz)により有限測度です。これらを増加する立方体で尽くせばよいのです。

<!-- proof-start -->
### 証明

(1) $E_i$ の定義に現れる写像を $f_{i,j}$ とし、$N_i=E_i\setminus\bigcup_jf_{i,j}(\mathbb R^m)$ とすると $\mathcal H^m(N_i)=0$ です。$\mathbb N^2$ を一列に並べ、$\bigcup_iE_i$ のうち写像の和集合から漏れる集合は $\bigcup_iN_i$ に含まれます。外測度の可算劣加法性からその測度は0です。

(2) 同じ写像族を用いれば、$E\cup Z$ の例外部分は $N\cup Z$ に、$E\setminus Z$ の例外部分は $N$ に含まれるので、それぞれ零測度です。

(3) $E$ を覆う写像を $f_j$ とし、$Q_n=[-n,n]^m$ と置きます。$f_j$ の Lipschitz 定数を $L_j$ と書けば、[Lipschitz 測度評価](../../MT/MT8/index.md#thm-mt8-lipschitz)と [非正規化の比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)から

$$
\mathcal H^m(f_j(Q_n))
\le L_j^m\mathcal H^m(Q_n)
=L_j^m c_m(2n)^m<\infty.
$$

$E$ の例外部分 $N$ は零測度で、$E\subset N\cup\bigcup_{j,n}f_j(Q_n)$ です。各 $f_j(Q_n)$ はコンパクト、$E$ は可測ですから $E\cap f_j(Q_n)$ は可測で有限測度。これらと $N$ の可測な部分を数えればよく、$\sigma$-有限性が従います。$\square$
<!-- proof-end -->

例えば $E=\bigcup_{n\ge1}([0,1]\times\{n\})$ は可算 $1$-整流可能ですが $\mathcal H^1(E)=\infty$ です。各線分は長さ1で、互いに離れているので可算加法性から総和は $\sum_{n\ge1}1=\infty$。つまり **可算整流可能性は全体の有限面積を要求しません**。それでも可算個の有限面積片に分けることはできます。

## 4. どの曲線にも正の長さで乗らない集合

反対側の条件も明確にします。単に「全体が滑らかでない」だけでは足りません。任意の Lipschitz パラメータ像と交わる部分が $m$ 次元測度零である、という強い条件を使います。

<a id="def-gmt12-purely-unrectifiable"></a>

<!-- formal-statement-start -->
> **定義（純m-非整流可能集合）**  
> $1\le m\le d$、$\mathcal H^m$-可測な $E\subset\mathbb R^d$ について、任意の Lipschitz 写像 $f:\mathbb R^m\to\mathbb R^d$ に対し

$$
\mathcal H^m(E\cap f(\mathbb R^m))=0
$$

> が成り立つとき、$E$ を **純 $m$-非整流可能（purely $m$-unrectifiable）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt12-purely-unrectifiable -->
### 直接例：零測度集合と線分を区別する

**定義の確認**：任意の Lipschitz 像との交わりが $\mathcal H^1$-零かを、一点集合と正の長さの線分で対比します。

$E=\{(0,0)\}\subset\mathbb R^2$ は $\mathcal H^1(E)=0$ です。どの Lipschitz 曲線 $f(\mathbb R)$ と交わっても、交わりは $E$ に含まれ、$\mathcal H^1(E\cap f(\mathbb R))=0$。定義の全称条件が確かめられたので、$E$ は純 $1$-非整流可能です。同時に、零測度の例外部分だけで覆えるので可算 $1$-整流可能でもあります。

一方、$S=[0,1]\times\{0\}$ に $f(t)=(p(t),0)$ を使うと、$S=f(\mathbb R)$ で

$$
\mathcal H^1(S\cap f(\mathbb R))
=\mathcal H^1(S)=1>0
$$

です。したがって $S$ は純 $1$-非整流可能ではありません。**単に非整流可能そうな形かどうか**ではなく、すべての Lipschitz 像との交わりを測る点が重要です。
<!-- definition-example-end -->

<a id="prop-gmt12-zero-intersection"></a>

<!-- formal-statement-start -->
> **命題（両方に属する集合は零測度）**  
> $1\le m\le d$、$\mathcal H^m$-可測な $E\subset\mathbb R^d$ が可算 $m$-整流可能かつ純 $m$-非整流可能であることと、$\mathcal H^m(E)=0$ であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

整流可能性の被覆像と、純非整流性が各像との交わりを零にする条件を同時に使います。正の測度を持つ集合が両方に属することはできません。

<!-- proof-start -->
### 証明

両方に属するとし、整流可能性から $E\setminus\bigcup_jf_j(\mathbb R^m)$ は零測度です。純非整流性から各 $E\cap f_j(\mathbb R^m)$ も零測度です。そこで

$$
E\subset
\left(E\setminus\bigcup_jf_j(\mathbb R^m)\right)
\cup\bigcup_j(E\cap f_j(\mathbb R^m))
$$

と分けて可算劣加法性を使えば $\mathcal H^m(E)=0$ です。逆に零測度の $E$ は任意の Lipschitz 像との交わりが零で、可算整流可能性の差集合も任意の写像族に対して零です。$\square$
<!-- proof-end -->

特に $m=d$ では恒等写像 $\operatorname{id}:\mathbb R^d\to\mathbb R^d$ が Lipschitz なので、任意の $\mathcal H^d$-可測集合は可算 $d$-整流可能です。また純 $d$-非整流可能であることは $\mathcal H^d(E)=0$ と同値です。正で有限な測度を持つ純非整流集合という現象は **$m<d$** に現れます。

## 5. 次元1・長さ正有限でも整流可能でない：四隅 Cantor dust

「Hausdorff 次元が整数1なら、測度零部分を除いて曲線へ乗るのでは」と思いたくなるかもしれません。しかし、次元は被覆の **必要な指数**を測るだけで、接線に沿う方向のまとまりまでは測りません。

正方形 $Q_0=[0,1]^2$ を出発点とします。各正方形 $Q=[a,a+s]\times[b,b+s]$ の中に、一辺 $s/4$ の四つの隅の正方形を残す操作を繰り返します。第 $n$ 段階で残る $4^n$ 個の閉正方形の和を $K_n$ とし、

$$
K=\bigcap_{n=0}^{\infty}K_n
$$

と定めます。これが **四隅 Cantor dust** です。第 $n$ 段階の各正方形の一辺は $s_n=4^{-n}$。

各分岐へ質量を $1/4$ ずつ割り振った確率測度 $\mu$ は、次のように具体的に構成できます。$[0,1]$ を第 $n$ 段階で $4^n$ 個の等長区間へ分け、四進の各桁を四隅の選択に対応させます。端点では半開区間によって一方を選び、$1$ は最後の区間に含めます。各 $u\in[0,1]$ に対応する正方形は入れ子で直径が $\sqrt2\,4^{-n}\to0$ なので、中心の極限 $T(u)\in K$ が一意に決まります。有限段階の中心写像は Borel 可測で、その点ごとの極限 $T$ も可測です。Borel 集合 $B\subset\mathbb R^2$ に対し $\mu(B)=\mathcal L^1(T^{-1}(B))$ と置くと $\mu(K)=1$ であり、各第 $n$ 段階正方形 $Q$ の逆像は長さ $4^{-n}$ の区間（端点の違いを除く）だから

$$
\mu(Q)=4^{-n}=s_n.
$$

各正方形は互いに離れており、$\mu$ は $K$ を台とする Borel 確率測度です。

<a id="lem-gmt12-corner-mass"></a>

<!-- formal-statement-start -->
> **補題（四隅集合の長さと横方向の質量）**  
> 上の $K$ と $\mu$ について、絶対定数 $a,b,C>0$ が存在し、任意の $x\in K$、$0<r\le1$ で

$$
ar\le\mu(B(x,r))\le br.
$$

> さらに $0<\mathcal H^1(K)<\infty$ であり、任意の第 $n$ 段階の正方形 $Q$ で

$$
\mathcal H^1(K\cap Q)\ge\frac{s_n}{C}
$$

> が成り立つ。最後に、任意の $x\in K$、その点を含む第 $n$ 段階の正方形 $Q_n$、任意の直線 $\ell\subset\mathbb R^2$ について、$Q_n$ の四つの子正方形のうち少なくとも一つ $Q'$ は

$$
\operatorname{dist}(Q',\ell)\ge\frac1{10}s_n
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

一辺 $s_n$ の正方形はちょうど質量 $s_n$ を持ちます。$s_n$ と同程度の球が交わる正方形は有限個しかないので、球の質量は半径に比例します。一方、四つの子正方形の中心は一つの小さな正方形の頂点です。どの直線も、その四頂点の全てに近づくことはできません。

<!-- proof-start -->
### 証明

**(1) 球の上下界。** $4^{-(n+1)}<r\le s_n=4^{-n}$ となる $n\ge0$ を取ります。異なる第 $n$ 段階正方形の距離は少なくとも $2s_n$ です。$x\in K$ が属する第 $n$ 段階正方形を $Q_n(x)$ とすると、半径 $r\le s_n$ の球 $B(x,r)$ は他の第 $n$ 段階正方形と交わりません。従って球の質量は $Q_n(x)$ の質量以下であり、$s_n<4r$ だから

$$
\mu(B(x,r))\le\mu(Q_n(x))=s_n<4r.
$$

下界は $x$ を含む第 $n+2$ 段階の子孫正方形 $Q_{n+2}$ を用います。その直径は $\sqrt2\,s_n/16<r$（$s_n<4r$）なので $Q_{n+2}\subset B(x,r)$。したがって

$$
\mu(B(x,r))\ge\mu(Q_{n+2})
=s_n/16\ge r/16.
$$

例えば $a=1/16$、$b=4$ と取れます。

**(2) Hausdorff 長さ。** $K$ を第 $n$ 段階の $4^n$ 個の正方形で覆うと、直径の合計は

$$
4^n\sqrt2\,4^{-n}=\sqrt2.
$$

従って $\mathcal H^1(K)\le\sqrt2$ です。一方、(1) の上界から、任意の小直径の被覆 $\{U_i\}$ の各集合について $x_i\in K\cap U_i$ を選べば、$\mu(K\cap U_i)\le b\,\operatorname{diam}(U_i)$ とでき（外側から球で近似する）、可算劣加法性より

$$
1=\mu(K)\le b\sum_i\operatorname{diam}(U_i).
$$

下限と被覆直径の極限を取ると $\mathcal H^1(K)\ge1/b>0$ です。同じ被覆論を $K\cap Q$ に適用すると $\mu(K\cap Q)=s_n$ なので $\mathcal H^1(K\cap Q)\ge s_n/b$ です。$C=b$ と取れます。

**(3) 直線から離れた子。** 親の一辺を $s=s_n$ とすると、子正方形の中心は一辺 $3s/4$ の正方形の四頂点にあります。単位法線ベクトル $(u,v)$ の任意の直線に対し、四中心の法線方向への射影の最大と最小の差は

$$
\frac{3s}{4}(|u|+|v|)\ge\frac{3s}{4}.
$$

よって少なくとも一中心はその直線から $3s/8$ 以上離れます。子正方形の中心から内部の点までの距離は最大 $\sqrt2\,s/8$ なので、その子正方形全体が直線から

$$
\left(\frac38-\frac{\sqrt2}{8}\right)s
>\frac1{10}s
$$

だけ離れています。$\square$
<!-- proof-end -->

この補題により、$0<\mathcal H^1(K)<\infty$ です。[Hausdorff 次元の臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)を用いれば、有限正の $\mathcal H^1$ を持つ集合の Hausdorff 次元はちょうど $1$ です。長さを持つのに、細部の向きは毎段階で四方へ散ります。

<a id="thm-gmt12-corner-pure"></a>

<!-- formal-statement-start -->
> **定理（四隅Cantor dustの純非整流性）**  
> 第5節で定義した $K\subset\mathbb R^2$ は純 $1$-非整流可能である。しかも

$$
\dim_H K=1,\qquad 0<\mathcal H^1(K)<\infty.
$$

> 従って Hausdorff 次元が整数 $1$ で長さが正かつ有限でも、可算 $1$-整流可能とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

もし $K$ が Lipschitz 曲線と正の長さで重なるなら、[GMT11の rank 別分割](../GMT11/index.md#thm-gmt11-area-formula)により、その交わりの正測度部分は一つの双 Lipschitz な片で捉えられます。さらに [GMT1の Radon 測度の微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)で、$K$ の長さのほぼすべてがその片にある点を選べます。その点では微分可能な曲線が一本の直線へ近づくのに対し、四隅構成はどの尺度でも直線から離れた子正方形に一定割合の長さを残します。両者は両立しません。

<!-- proof-start -->
### 証明

**(1) 曲線を単射片へ分ける。** 任意の Lipschitz 写像 $f:\mathbb R\to\mathbb R^2$ を固定し、$S=f(\mathbb R)$ と置きます。[Rademacherの微分可能性定理](../GMT9/index.md#thm-gmt9-rademacher)で微分不能点は Lebesgue 零集合です。その像は [Lipschitz の零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)で $\mathcal H^1$-零です。

また $f'(t)=0$ の点の像は [rank 欠損像の補題](../GMT11/index.md#lem-gmt11-critical-image)で $\mathcal H^1$-零です。残る微分が零でない点では、[面積公式の証明における一様な二点差分分割](../GMT11/index.md#thm-gmt11-area-formula)と [その双 Lipschitz 補題](../GMT11/index.md#lem-gmt11-patch-comparison)を使えます。

これによって微分が零でない点を可算個の Borel 集合 $A_j$ に分割でき、各 $f|_{A_j}$ は双 Lipschitz です。像の可測性を曖昧にしないため、各 $A_j\cap[-R,R]$（$R\in\mathbb N$）を Lebesgue 測度の内側正則性によって可算個のコンパクト集合 $A_{j,R,k}$ で零測度部分を除いて覆います。具体的には各 $k$ で測度差が $1/k$ 未満のコンパクト部分を取り、その和集合の補集合が零測度であることを使います。$f$ は Lipschitz なので、残余の像も [零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)によって $\mathcal H^1$-零です。各 $f(A_{j,R,k})$ はコンパクトで、写像の制限は依然として双 Lipschitz です。

従って $\mathcal H^1(K\cap S)>0$ と仮定すれば、あるコンパクトな双 Lipschitz 片 $A=A_{j,R,k}$ に対して

$$
\mathcal H^1(K\cap f(A))>0
$$

となります。以後その像を $\Gamma=f(A)$ とします。この $\Gamma$ はコンパクトであり、次に用いる指示関数 $1_\Gamma$ は Borel 可測です。

**(2) ほとんどの点が $\Gamma$ に属する点を取る。** $K$ はコンパクトで $\mathcal H^1(K)<\infty$ なので、$\nu=\mathcal H^1\!\llcorner K$ は有限 Radon 測度です。[Radon 測度の球微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)を $1_\Gamma$ に適用すると、$\nu$-ほとんどすべての $x\in K\cap\Gamma$ で

$$
\frac{\nu(B(x,r)\setminus\Gamma)}{\nu(B(x,r))}\longrightarrow0
\quad(r\downarrow0)
$$

です。$\nu(K\cap\Gamma)>0$ だから、そのような $x=f(t)$ を選べます。$t\in A$ は $f'(t)\ne0$ の微分可能点です。

**(3) $\Gamma$ はその点の接線から離れられない。** $f'(t)=df/dt(t)$ は曲線のパラメータ $t$ に関する $\mathbb R^2$ 値の微分です。$\ell=x+\mathbb R f'(t)$ とし、$f|_A$ の逆 Lipschitz 定数を $L_-$ と書きます。任意の $t'\in A$ に対して

$$
|t'-t|\le L_-|f(t')-f(t)|.
$$

$f$ の $t$ での微分可能性から、$t'\to t$ のとき

$$
f(t')-f(t)=f'(t)(t'-t)+o(|t'-t|).
$$

第一項は $\ell$ に平行なので、$y=f(t')$ に対し

$$
\operatorname{dist}(y,\ell)=o(|t'-t|)
=o(|y-x|).
$$

特に十分小さい $r$ に対し、$\Gamma\cap B(x,r)$ の全点は $\ell$ から $r/25$ 未満の距離に入ります。

**(4) 四隅の質量は直線近傍から逃げる。** $x$ を含む第 $n$ 段階正方形 $Q_n$ の一辺を $s_n=4^{-n}$ とし、$r_n=2s_n$ と置きます。$Q_n\subset B(x,r_n)$ です。[四隅の補題](#lem-gmt12-corner-mass)によって、$\ell$ から $s_n/10$ 以上離れた子正方形 $Q'_n\subset Q_n$ が一つあります。その子の $K$ 部分は

$$
\nu(K\cap Q'_n)\ge\frac{s_n}{4C}
$$

です。一方、(3) を半径 $r_n=2s_n$ に使うと、十分大きな $n$ で $\Gamma\cap B(x,r_n)$ は $\ell$ の幅 $2s_n/25$ の帯に入り、$2/25<1/10$ だから $Q'_n$ と交わりません。よって

$$
\nu(B(x,r_n)\setminus\Gamma)\ge\frac{s_n}{4C}.
$$

他方、球 $B(x,r_n)$ は第 $n$ 段階の有限個の正方形としか交わりません。各正方形の $K$ 部分は $4^n$ 段階の被覆を局所化すれば $\mathcal H^1$-長さが高々 $\sqrt2\,s_n$ です。従って絶対定数 $C_0$ で $\nu(B(x,r_n))\le C_0s_n$ とできます。以上を割ると

$$
\frac{\nu(B(x,r_n)\setminus\Gamma)}{\nu(B(x,r_n))}
\ge\frac1{4CC_0}>0.
$$

これは (2) の密度が $0$ に近づく結論に反します。従って任意の Lipschitz 曲線 $f$ に対し $\mathcal H^1(K\cap f(\mathbb R))=0$ で、$K$ は純 $1$-非整流可能です。[両立が零測度に限られる命題](#prop-gmt12-zero-intersection)と $\mathcal H^1(K)>0$ により、$K$ は可算 $1$-整流可能ではありません。$\square$
<!-- proof-end -->

この反例の本質は、複雑そうな図形だからという見た目ではありません。**どの近似直線に対しても、同じ縮尺で横へ逃げる正の長さが残る**という定量的な構造です。逆に、Lipschitz 曲線の双 Lipschitz 片では、微分できる点のごく近くで曲線が一次近似へまとまります。この衝突が非整流可能性の証拠になります。

## 6. 次の講義へ

GMT11 はパラメータ側の積分を面積へ変えました。今回の GMT12 は、どんな集合にそのパラメータ片が十分多く存在するかを定義しました。次の **GMT13** では、整流可能集合の局所グラフから接方向を作り、そこに沿う Jacobian を用いて、パラメータ表示に依存しない積分公式へ進みます。一般の密度・近似接平面判定や純非整流性の分解定理は後続講義の対象であり、ここでは結論を仮定していません。

## 演習

### Level A：定義を条件ごとに確認する

<a id="ex-gmt12-a1"></a>

**A1. 二本の線分**
- Level: A
- 問題: $E=([0,2]\times\{0\})\cup(\{0\}\times[0,3])$ を可算 $1$-整流可能と示し、$\mathcal H^1(E)$ を計算せよ。写像は $\mathbb R$ 全体で定義すること。

<!-- solution-start -->
**詳細解答**

切り詰め写像 $p_{a,b}(t)=\min(b,\max(a,t))$ は $1$-Lipschitz です。これを使って、次の二つのパラメータ表示を作ります。

$$
f_1(t)=(p_{0,2}(t),0),\qquad
f_2(t)=(0,p_{0,3}(t)).
$$

すると $E=f_1(\mathbb R)\cup f_2(\mathbb R)$ なので [可算m-整流可能集合](#def-gmt12-countably-rectifiable)の定義の差集合は空です。

二線分の交わりは一点だけで $\mathcal H^1$-零です。[GMT11の面積公式](../GMT11/index.md#thm-gmt11-area-formula)を各線分に用いると長さはそれぞれ2と3で、$\mathcal H^1(E)=2+3=5$ です。
<!-- solution-end -->

<a id="ex-gmt12-a2"></a>

**A2. 零測度の付着**
- Level: A
- 問題: $Z=\mathbb Q^2\cap[0,1]^2$ とし、$S=[0,1]\times\{0\}$ とする。$S\cup Z$ は可算 $1$-整流可能か。$Z$ が稠密であることは答えに影響するか。

<!-- solution-start -->
**詳細解答**

$Z$ は可算集合であり、各一点は任意に小さい直径の球一個で覆えるので $\mathcal H^1(\{z\})=0$ です。[Hausdorff 外測度の可算劣加法性](../../MT/MT8/index.md#thm-mt8-hausdorff-outer-measure)から $\mathcal H^1(Z)=0$。$S=f(\mathbb R)$ となる $f(t)=(p_{0,1}(t),0)$ を取れば $(S\cup Z)\setminus f(\mathbb R)\subset Z$ です。よって可算 $1$-整流可能です。位相的な稠密性は $Z$ の $\mathcal H^1$-零測度性を変えません。
<!-- solution-end -->

<a id="ex-gmt12-a3"></a>

**A3. 純非整流可能性の全称条件**
- Level: A
- 問題: $\mathcal H^m(N)=0$ の $\mathcal H^m$-可測集合 $N\subset\mathbb R^d$ は、任意の $1\le m\le d$ について純 $m$-非整流可能か。同時に可算 $m$-整流可能か。

<!-- solution-start -->
**詳細解答**

任意の Lipschitz 写像 $f:\mathbb R^m\to\mathbb R^d$ に対して $N\cap f(\mathbb R^m)\subset N$ なので $\mathcal H^m(N\cap f(\mathbb R^m))\le\mathcal H^m(N)=0$。これは [純非整流可能性の定義](#def-gmt12-purely-unrectifiable)の「任意の $f$」を直接確認しています。一方、例えば定数写像一個を選べば、像から漏れる $N$ の部分も $N$ に含まれて零測度。従って可算整流可能でもあります。[両立命題](#prop-gmt12-zero-intersection)に一致します。
<!-- solution-end -->

<a id="ex-gmt12-a4"></a>

**A4. $C^1$ グラフの面積の上下界**
- Level: A
- 問題: $G(t)=(t,3t)\;(0\le t\le2)$ について、可算 $1$-整流可能性、$\mathcal H^1(G([0,2]))$、第2節の一般上下界（$M=3$）を求めよ。

<!-- solution-start -->
**詳細解答**

$G$ は $\mathbb R$ 上で $\sqrt{1+3^2}=\sqrt{10}$-Lipschitz、よって像は整流可能です。微分ベクトルは $(1,3)$ で $J_1G=\sqrt{1+9}=\sqrt{10}$。単射なので [area formula](../GMT11/index.md#thm-gmt11-area-formula)により $\mathcal H^1(G([0,2]))=\int_0^2\sqrt{10}\,dt=2\sqrt{10}$。区間長が2なので、第2節の $\mathcal H^1$ 上下界は $2\le\mathcal H^1(G([0,2]))\le2\sqrt{10}$ で、上界はここでは等号です。
<!-- solution-end -->

<a id="ex-gmt12-a5"></a>

**A5. 可算個だが面積無限**
- Level: A
- 問題: $F=\bigcup_{n=1}^{\infty}([n,n+1]\times\{0\})$ が可算 $1$-整流可能で $\mathcal H^1(F)=\infty$ であることを示し、$\sigma$-有限性との違いを説明せよ。

<!-- solution-start -->
**詳細解答**

$f_n(t)=(n+p_{0,1}(t),0)$ は Lipschitz で像が第 $n$ 線分です。従って差集合が空で整流可能です。各線分は長さ1、隣り合う線分の交わりは端点一点（測度零）なので、有限和の長さは $N$。$F$ 全体の長さは単調性から任意の $N$ 以上で $\infty$ です。しかし $F$ は有限長の線分の可算和に分かれるので $\sigma$-有限です。$\sigma$-有限とは全体の測度が有限という意味ではありません。
<!-- solution-end -->

### Level B：反例と証明の要点

<a id="ex-gmt12-b1"></a>

**B1. 閉立方体への切り詰めを証明する**
- Level: B
- 問題: $Q=\prod_{k=1}^m[a_k,b_k]$ とし、$P(x)_k=\min(b_k,\max(a_k,x_k))$ と定める。$P$ が $1$-Lipschitz で $P|_Q=\operatorname{id}_Q$ を示し、$Q$ 上で $L$-Lipschitz な $F$ の $F\circ P$ が全 $\mathbb R^m$ 上の $L$-Lipschitz 延長になることを証明せよ。

<!-- solution-start -->
**詳細解答**

一変数の $p_k(t)=\min(b_k,\max(a_k,t))$ は区間内部では傾き1、外部では傾き0の連続区分線形写像なので、任意の $u,v$ について $|p_k(u)-p_k(v)|\le|u-v|$ です。座標ごとに二乗して足せば

$$
|P(x)-P(y)|^2=\sum_k|p_k(x_k)-p_k(y_k)|^2
\le\sum_k|x_k-y_k|^2=|x-y|^2.
$$

$x\in Q$ なら全座標が既に $[a_k,b_k]$ に入るので $P(x)=x$。したがって $F\circ P|_Q=F$ であり、

$$
|F(P(x))-F(P(y))|\le L|P(x)-P(y)|\le L|x-y|.
$$

この延長は Kirszbraun 型の一般延長定理を仮定せず、閉立方体の構造だけで作れます。
<!-- solution-end -->

<a id="ex-gmt12-b2"></a>

**B2. Lipschitz 像が $\sigma$-有限となる理由**
- Level: B
- 問題: $E\subset\mathbb R^d$ が可算 $m$-整流可能なら、$\mathcal H^m(E)=\infty$ でも有限測度の可算枚で覆えることを証明せよ。可測性が必要な位置も明示せよ。

<!-- solution-start -->
**詳細解答**

[可算m-整流可能集合](#def-gmt12-countably-rectifiable)の定義から Lipschitz 写像 $f_j$ と、次の例外集合 $N$ が存在します。

$$
N=E\setminus\bigcup_j f_j(\mathbb R^m),\qquad
\mathcal H^m(N)=0.
$$

$\mathbb R^m=\bigcup_{n\ge1}[-n,n]^m$ なので、$E$ は $N$ と各 $E\cap f_j([-n,n]^m)$ の可算族で覆われます。後者は可測集合とコンパクト集合の交わりなので可測です。

[Hausdorff 測度の Lipschitz 評価](../../MT/MT8/index.md#thm-mt8-lipschitz)から

$$
\mathcal H^m(E\cap f_j([-n,n]^m))
\le L_j^m\mathcal H^m([-n,n]^m)
=L_j^mc_m(2n)^m<\infty.
$$

$N$ も可測で零測度です。従って全体が無限測度でも、これら有限測度の可算和となります。
<!-- solution-end -->

<a id="ex-gmt12-b3"></a>

**B3. 四隅構成の次元と測度**
- Level: B
- 問題: 四隅 Cantor dust $K$ の第 $n$ 段階を用いて $\mathcal H^1(K)\le\sqrt2$ を示し、各第 $n$ 段階正方形に質量 $4^{-n}$ を置く測度 $\mu$ が $\mu(B(x,r))\le Cr$ を満たす理由を、$r$ に対応する $n$ の取り方から再構成せよ。これだけで $\dim_H K$ を求めよ。

<!-- solution-start -->
**詳細解答**

第 $n$ 段階には $4^n$ 個、一辺 $4^{-n}$ の正方形があり、各直径は $\sqrt2\,4^{-n}$ です。[Hausdorff 測度の定義](../../MT/MT8/index.md#def-mt8-hausdorff-measure)に代入すると被覆費用は常に $\sqrt2$、よって $\mathcal H^1(K)\le\sqrt2$ です。

半径 $r$ に対し $4^{-(n+1)}<r\le4^{-n}$ を選びます。球は離れた第 $n$ 段階正方形の高々絶対個数 $M$ 個としか交わりません。各正方形の質量は $4^{-n}<4r$ だから

$$
\mu(B(x,r))\le4Mr.
$$

直径 $\delta_i$ の任意の被覆について、各集合の $\mu$ 質量は $C\delta_i$ 以下です。したがって

$$
1=\mu(K)\le C\sum_i\delta_i,\qquad
\mathcal H^1(K)\ge1/C>0.
$$

[Hausdorff 測度の臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)より $\dim_HK=1$ です。しかし **純非整流可能性はまだ導けません**。別に直線から離れる質量の議論が必要です。
<!-- solution-end -->

<a id="ex-gmt12-b4"></a>

**B4. 正測度で両立は不可能**
- Level: B
- 問題: $E$ が $\mathcal H^m$-可測で $0<\mathcal H^m(E)<\infty$、可算 $m$-整流可能とする。ある Lipschitz 写像 $f:\mathbb R^m\to\mathbb R^d$ に対し $\mathcal H^m(E\cap f(\mathbb R^m))>0$ となることを示し、純 $m$-非整流可能でないと結論せよ。

<!-- solution-start -->
**詳細解答**

整流可能な被覆を $f_j$、例外集合を $N$ と書きます。もしすべての $j$ について $\mathcal H^m(E\cap f_j(\mathbb R^m))=0$ なら

$$
\mathcal H^m(E)
\le\mathcal H^m(N)+\sum_{j=1}^{\infty}
\mathcal H^m(E\cap f_j(\mathbb R^m))=0
$$

となり、正測度の仮定に反します。従って少なくとも一つの $j$ で正の交わりがあります。これは [純非整流可能性の定義](#def-gmt12-purely-unrectifiable)の全称条件に対する反例となる写像です。有限性はこの背理法には必須ではなく、正測度だけで十分です。
<!-- solution-end -->

### Level C：中心定理を別配置で再構成する

<a id="ex-gmt12-c1"></a>

**C1. 四隅の横方向質量と曲線の接線**
- Level: C
- 問題: 四隅集合 $K$ と第 $n$ 段階の一辺 $s=4^{-n}$ の正方形 $Q$ を考え、次を示せ。
  - (i) 任意の直線 $\ell$ に対し、$Q$ の子正方形の一つは $\ell$ から少なくとも $s/10$ 離れる。法線方向への射影で証明せよ。
  - (ii) $\nu=\mathcal H^1\!\llcorner K$ とし、子正方形の長さ下界と球の長さ上界を使う。$K$ が双 Lipschitz な微分可能曲線片と正の $\mathcal H^1$ 測度で交われない理由を示せ。
  - (iii) 任意の Lipschitz 曲線を双 Lipschitz な片と零測度像へ分け、純 $1$-非整流可能性を結論せよ。

<!-- solution-start -->
**詳細解答**

(i) 子正方形の四中心は一辺 $3s/4$ の正方形の頂点です。単位法線 $(u,v)$ への四中心の射影幅は $(3s/4)(|u|+|v|)\ge3s/4$。任意の直線の定数項を選んでも、四中心のうち一つと直線の距離は $3s/8$ 以上です。子正方形内で中心からの距離は最大 $\sqrt2s/8$ なので、子全体が少なくとも $(3-\sqrt2)s/8>s/10$ だけ離れます。

(ii) $\nu(K\cap\Gamma)>0$ と仮定します。[Radon測度の球に関するLebesgue微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)により、$\nu$-密度1で $\Gamma$ に属する点 $x$ を選べます。$\Gamma=f(A)$、$f$ が $t\in A$ で微分可能、$f'(t)\ne0$、$f|_A$ が双 Lipschitz とすれば $x=f(t)$ で、$y=f(t')$ に対して

$$
\operatorname{dist}(y,x+\mathbb Rf'(t))
=o(|t'-t|)=o(|y-x|).
$$

よって十分小さい半径 $2s$ では $\Gamma\cap B(x,2s)$ は接線から幅 $2s/25$ の帯に入ります。(i) の子正方形 $Q'$ は接線から $s/10$ 以上離れ、$2/25<1/10$ だから $\Gamma$ と交わりません。一方、$Q'$ に残る長さは $\nu(K\cap Q')\ge cs/4$ であり、球全体の長さは $Cs$ 以下なので

$$
\frac{\nu(B(x,2s)\setminus\Gamma)}{\nu(B(x,2s))}
\ge\frac{c}{4C}>0.
$$

$s=4^{-n}\to0$ でも消えず、$x$ の密度1に反します。

(iii) 任意の Lipschitz $f:\mathbb R\to\mathbb R^2$ を取ります。[Rademacherの微分可能性定理](../GMT9/index.md#thm-gmt9-rademacher)により微分不能点は Lebesgue 零で、その像は [GMT11の零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)で長さ零です。微分が零の点の像も [rank欠損像の補題](../GMT11/index.md#lem-gmt11-critical-image)で長さ零です。残る微分非零点は [GMT11の一様二点差分構成](../GMT11/index.md#thm-gmt11-area-formula)により可算個の双 Lipschitz な片へ分けられます。(ii) から各片と $K$ の交わりは長さ零なので、可算劣加法性から $\mathcal H^1(K\cap f(\mathbb R))=0$。任意の $f$ で成立するため [純m-非整流可能集合](#def-gmt12-purely-unrectifiable)の定義により結論を得ます。
<!-- solution-end -->
