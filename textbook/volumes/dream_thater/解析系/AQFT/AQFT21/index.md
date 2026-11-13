# AQFT21 モジュラーHilbert環の準備補題

[AQFT20の有限次元標準表現](../AQFT20/index.md#thm-aqft20-modular-formulas)では、行列単位を使って左右乗算、$S$、$J$、$\Delta$ をすべて計算できました。しかし無限次元のvon Neumann環では、有限次元なら自動的だった**右からの乗算の有界性**や、作用素を何度でも掛けられるという性質が失われます。有限次元の可換子計算を一般定理の証明と取り違えることはできません。

本講では、巡回・分離ベクトルからできる代数的な積と反転を**左Hilbert環**として整理し、さらに非有界なモジュラー作用素に対して使える**スペクトル切断 core**と**Gaussian平滑化による解析ベクトル**を構成します。一般の可換子等号とモジュラー自己同型性は、それぞれ次講以降で証明する別の問題です。

内積は第2変数線形です。以下で使う閉包・反線形随伴は[AQFT18](../AQFT18/index.md#def-aqft18-closable)、極分解とモジュラー関係は[AQFT19](../AQFT19/index.md#thm-aqft19-modular-relations)、非有界作用素の関数計算は[QM6](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)で学んだものとします。

## 1. ベクトルに積を与える理由

複素Hilbert空間 $\mathcal H$ 上の単位的von Neumann環 $\mathcal M\subset B(\mathcal H)$ と、$\mathcal M$ に対して巡回的かつ分離的な単位ベクトル $\Omega$ を固定します。この組を[標準対](../AQFT18/index.md#def-aqft18-standard-pair)と呼びます。

$\mathcal M\Omega=\{A\Omega:A\in\mathcal M\}$ は稠密です。分離性により $A\Omega=B\Omega$ なら $A=B$ なので、$A\Omega$ というベクトルを見ただけで、その元になった作用素 $A$ は一意に決まります。この性質がなければ、次の積は定義できません。

<a id="def-aqft21-left-hilbert"></a>

<!-- formal-statement-start -->
> **定義（標準対から得る左Hilbert環）**  
> $\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega\in\mathcal H$ を巡回・分離的な単位ベクトルとする。稠密な線形部分空間 $\mathfrak A_0=\mathcal M\Omega$ 上の積と反転を
$$
(A\Omega)(B\Omega)=(AB)\Omega,\qquad
(A\Omega)^\#=A^*\Omega
\quad(A,B\in\mathcal M)
$$
> で定める。これを標準対に付随する**左Hilbert環**と呼ぶ。「左」とは、各元による左乗算がHilbert空間上の有界作用素へ延長されることを指す。ここでは完備化前の $\mathfrak A_0$ 自体を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft21-left-hilbert -->
### 直接例：二準位の積と反転を確かめる

[AQFT20のHilbert–Schmidt空間](../AQFT20/index.md#def-aqft20-hilbert-schmidt)で $\rho=\operatorname{diag}(3/4,1/4)$、$\Omega=\rho^{1/2}$、$\mathcal M=L(M_2(\mathbb C))$ とします。$\mathfrak A_0=\mathcal H=M_2(\mathbb C)$ ですが、積はHilbert–Schmidt行列の通常の積ではなく、$\Omega$ を挟むことに注意します。

$A=E_{12}$、$B=E_{21}$ とすれば、$A\Omega=(1/2)E_{12}$、$B\Omega=(\sqrt3/2)E_{21}$ であり、
$$
(A\Omega)(B\Omega)=AB\Omega=E_{11}\Omega
=\frac{\sqrt3}{2}E_{11},\qquad
(A\Omega)^\#=A^*\Omega=\frac{\sqrt3}{2}E_{21}.
$$
一方、行列として単純に掛けると $(A\Omega)(B\Omega)=\sqrt3 E_{11}/4$ になり、ここで定義した積とは異なります。$AB=E_{11}$ と $A^*=E_{21}$ を先に計算してから $\Omega$ を掛ける必要があります。分離性は $\rho^{1/2}$ の可逆性から確かめられ、積と反転が一価であるという定義条件を満たします。

**定義の確認**：$A\Omega=0$ から $A=0$ が従うので代表元が一意であり、積と反転が well-defined です。また $\rho^{1/2}$ が可逆なので $\mathfrak A_0=\mathcal H$ は稠密で、$AB\Omega$ と $A^*\Omega$ はいずれも再び $\mathfrak A_0$ の元です。
<!-- definition-example-end -->

## 2. 左乗算はなぜ有界なのか

Hilbert環という名の中身は、積だけでなく内積と作用素ノルムの整合性です。[可閉な反線形作用素](../AQFT18/index.md#def-aqft18-closable)という概念が、ここでは反転 $x\mapsto x^\#$ に現れます。

<a id="prop-aqft21-left-regular"></a>

<!-- formal-statement-start -->
> **命題（左Hilbert環の基本恒等式と作用）**  
> 標準対 $(\mathcal M,\Omega)$ から定義した $\mathfrak A_0=\mathcal M\Omega$ について、任意の $A,B,C\in\mathcal M$ に対して次が成り立つ。
>
> 積は結合的、反転は反線形で $(xy)^\#=y^\#x^\#$、$(x^\#)^\#=x$。
> また、$x=A\Omega$、$y=B\Omega$、$z=C\Omega$ に対して、内積恒等式
$$
\langle xy,z\rangle=\langle y,x^\#z\rangle.
$$
> が成り立つ。$x=A\Omega$ による左乗算 $\lambda(x)y=xy$ は $\mathcal H$ 上の有界作用素 $A$ へ一意に延長され、$\|\lambda(x)\|=\|A\|$。
> さらに、反転 $x\mapsto x^\#$ は可閉で、その閉包は[AQFT18のTomita作用素](../AQFT18/index.md#thm-aqft18-tomita-closable) $S$ である。従って $\mathfrak A_0$ は $S$ のグラフ core である。
<!-- formal-statement-end -->

証明の要点は、**積の有界性は左側の作用素 $A$ の有界性から来る**こと、反転の可閉性は別途必要であることです。「左が有界だから右も有界」とは推論できません。

<!-- proof-start -->
### 証明

まず $\Omega$ の分離性で $A\mapsto A\Omega$ は単射なので、積と反転は代表元によらず一意です。$\alpha,\beta\in\mathbb C$ と $x=A\Omega$、$y=B\Omega$ に対して
$$
(\alpha x+\beta y)^\#
=(\alpha A+\beta B)^*\Omega
=\overline\alpha A^*\Omega+\overline\beta B^*\Omega
$$
となり反線形です。さらに
$$
\begin{aligned}
((A\Omega)(B\Omega))(C\Omega)&=((AB)C)\Omega\\
&=(A(BC))\Omega=(A\Omega)((B\Omega)(C\Omega)),\\
((A\Omega)(B\Omega))^\#&=(AB)^*\Omega
=B^*A^*\Omega=(B\Omega)^\#(A\Omega)^\#.
\end{aligned}
$$
ここで最後の積記号は本節で定義した積です。$A^{**}=A$ から二重反転も戻ります。

内積の恒等式は $\langle Ax,z\rangle=\langle x,A^*z\rangle$ を $x=B\Omega$、$z=C\Omega$ に適用して
$$
\langle AB\Omega,C\Omega\rangle
=\langle B\Omega,A^*C\Omega\rangle
=\langle B\Omega,(A\Omega)^\#(C\Omega)\rangle.
$$
左乗算の作用は $\lambda(A\Omega)(B\Omega)=AB\Omega=A(B\Omega)$ です。$A\in B(\mathcal H)$ なので
$$
\|\lambda(A\Omega)(B\Omega)\|
=\|AB\Omega\|\leq\|A\|\|B\Omega\|.
$$
$\mathfrak A_0$ が稠密であるため、作用素の一致は $\mathcal H$ 全体へ延長され、ノルムも $\|A\|$ に一致します。

最後に反転の初期作用素は $S_0(A\Omega)=A^*\Omega$ そのものです。[AQFT18の可閉性定理](../AQFT18/index.md#thm-aqft18-tomita-closable)の仮定である巡回・分離性を今まさに置いているため $S_0$ は可閉です。$S=\overline{S_0}$ の定義から、任意の $x\in\operatorname{Dom}S$ に対し $x_n\in\mathfrak A_0$ で
$$
x_n\longrightarrow x,\qquad x_n^\#=S_0x_n\longrightarrow Sx
$$
となる列が存在します。これはグラフノルム $\|x\|_S=(\|x\|^2+\|Sx\|^2)^{1/2}$ での稠密性です。
<!-- proof-end -->

$\mathfrak A_0$ は単位元 $\Omega=I\Omega$ を持ち、積でできる元は $\Omega x=x$ により $\mathfrak A_0$ 全体を含みます。従って積の張る部分空間も稠密です。一方、上の結論は右乗算のノルムを何も評価していません。

## 3. 二種類の「右から掛ける」を区別する

有限次元では[AQFT20の可換子定理](../AQFT20/index.md#thm-aqft20-commutant)で、行列空間上の右乗算が左乗算の可換子を尽くしました。しかし無限次元で $x=A\Omega$ に $B\Omega$ を右から掛ける操作 $x\mapsto(AB)\Omega$ と、元からある有界な可換子作用素 $C'\in\mathcal M'$ による $x\mapsto C'x$ は**異なる構成**です。混同しないよう、まず成立する包含だけを証明します。

<a id="lem-aqft21-commuting-actions"></a>

<!-- formal-statement-start -->
> **補題（可換子の作用は有界に交換する）**  
> 標準対 $(\mathcal M,\Omega)$ について、$A\in\mathcal M$、$C'\in\mathcal M'$、$x\in\mathcal H$ なら
$$
A(C'x)=C'(Ax).
$$
> 特に $\mathfrak A_0$ 上の左乗算の有界延長全体は $\mathcal M$ と一致し、その可換子は $\mathcal M'$ である。ここでは $\mathcal M'$ の各元が $\mathfrak A_0$ 内での右乗算として実現できるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[可換子の定義](../../VN/VN2/index.md#def-vn2-commutant)では $C'\in\mathcal M'$ はすべての $A\in\mathcal M$ と交換する有界作用素です。従って等式は $\mathcal H$ 全体で成立します。[左乗算の有界延長](#prop-aqft21-left-regular)がすべての $A\in\mathcal M$ を尽くすので、それらと交換する有界作用素全体も $\mathcal M'$ です。この事実だけでは $J\mathcal M J=\mathcal M'$ はまだ出ません。

<!-- proof-start -->
### 証明

$C'\in\mathcal M'$ の定義から $AC'=C'A$ が $B(\mathcal H)$ 内で成り立ちます。従って各 $x\in\mathcal H$ に対し $AC'x=C'Ax$。また $\{\lambda(A\Omega):A\in\mathcal M\}=\mathcal M$ は前命題で示した作用素としての等号です。両辺の可換子を取れば結論が従います。ただし、$\mathfrak A_0$ 内の積について $C'(A\Omega)=(AB)\Omega$ となる $B\in\mathcal M$ が存在するとは、ここでは導いていません。
<!-- proof-end -->

右乗算の落とし穴は、単に無限次元だから怖い、という注意ではありません。実際にノルムが発散する例を計算します。

<a id="prop-aqft21-right-unbounded"></a>

<!-- formal-statement-start -->
> **命題（代数的右乗算が非有界になる標準対）**  
> $\mathcal K=\ell^2(\mathbb N)$、$\mathcal H$ を $\mathcal K$ 上のHilbert–Schmidt作用素全体、$\mathcal M=\{L_A:A\in B(\mathcal K)\}$ とする。$p_j=c\,2^{-j^2}$（$j\ge1$、$c>0$ は $\sum_jp_j=1$ とする正規化定数）と置き
$$
\rho=\operatorname{diag}(p_1,p_2,\ldots),\qquad
\Omega=\rho^{1/2}.
$$
> $(\mathcal M,\Omega)$ は標準対だが、片側シフト $Ve_j=e_{j+1}$ による代数的右乗算
$$
T_V(A\Omega)=AV\Omega\qquad(A\in B(\mathcal K))
$$
> は $\mathfrak A_0=\mathcal M\Omega$ 上で定義されるものの、$\mathcal H$ 上の有界作用素へは延長できない。
<!-- formal-statement-end -->

### 証明の見取り図

$\rho$ の固有値はすべて正ですが零に近づくため、$\rho^{-1/2}$ は有界ではありません。$E_{ij}\Omega$ と $E_{ij}V\Omega$ のノルム比を取り、添字 $j$ を大きくします。有限次元で見えなかった非一様性が右乗算の失敗を引き起こします。

<!-- proof-start -->
### 証明

$p_j>0$ かつ $\sum_jp_j=1$ なので $\Omega$ はHilbert–Schmidt作用素で $\|\Omega\|_2^2=1$。$A\Omega=0$ なら、$\Omega e_j=\sqrt{p_j}e_j$ より $Ae_j=0$ が全 $j$ で成立します。従って $A=0$、すなわち分離的です。また
$$
E_{ij}=\frac1{\sqrt{p_j}}E_{ij}\Omega
$$
が全 $i,j$ で成立し、行列単位の有限線形結合はHilbert–Schmidt空間で稠密ですから巡回的です。

$T_V$ の定義は $\Omega$ の分離性により一価で、$AV$ は有界作用素です。$j\ge2$ について $E_{1j}V=E_{1,j-1}$ なので
$$
\|E_{1j}\Omega\|_2=\sqrt{p_j},\qquad
\|T_V(E_{1j}\Omega)\|_2=\|E_{1,j-1}\Omega\|_2=\sqrt{p_{j-1}}.
$$
ゆえに、入力を $x_j=E_{1j}\Omega/\sqrt{p_j}$ と正規化すると
$$
\|x_j\|_2=1,\qquad
\|T_Vx_j\|_2
=\sqrt{\frac{p_{j-1}}{p_j}}
=2^{(2j-1)/2}\longrightarrow\infty.
$$
有界な延長があれば $\|T_Vx_j\|_2\leq\|T_V\|\|x_j\|_2$ のはずなので矛盾します。
<!-- proof-end -->

この $T_V$ と、Hilbert–Schmidt作用素を普通に右から掛ける $R_V(X)=XV$ は違います。後者は $\|XV\|_2\leq\|X\|_2\|V\|$ により有界で、左乗算と交換します。しかし $R_V(A\Omega)=A\Omega V$ は一般に $AV\Omega$ と一致しません。ここが一般の可換子定理へ進む際の最初の難所です。

## 4. 非有界作用素に使える解析的な core

[AQFT19の極分解](../AQFT19/index.md#thm-aqft19-polar)で得た $\Delta$ は非負自己共役で核が零です。従って[QM6のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)で
$$
H=\log\Delta,\qquad
U_t=e^{itH}=\Delta^{it}\quad(t\in\mathbb R)
$$
を定義できます。$H$ は自己共役で、$(U_t)_{t\in\mathbb R}$ は強連続な1パラメータ作用素族となり、各 $U_t$ はユニタリです。一般に $H$ は上下とも非有界になり得ます。

複素時間 $z=t+is$ に形式的に $e^{izH}$ と書いても、$s\ne0$ なら $e^{-sH}$ が非有界かもしれず、全ベクトルに作用するわけではありません。そこで複素時間でも計算できるベクトルを別に用意します。

<a id="def-aqft21-entire-vector"></a>

<!-- formal-statement-start -->
> **定義（全解析ベクトルとグラフcore）**  
> $H$ を複素Hilbert空間 $\mathcal H$ 上の自己共役作用素、$U_t=e^{itH}$ とする。$x\in\mathcal H$ が **全解析ベクトル** であるとは、実変数 $t\mapsto U_tx$ が複素平面全体上のノルム解析的な $\mathcal H$ 値関数 $F_x(z)$ に延長できることをいう。閉作用素 $T$ の定義域内の線形部分空間 $\mathcal D$ が **グラフ core** であるとは、任意の $x\in\operatorname{Dom}T$ を $x_n\in\mathcal D$ により
$$
x_n\to x,\qquad Tx_n\to Tx
$$
> と近似できることをいう。ここでノルム解析的とは、複素微分の差商がHilbert空間ノルムで収束することを指す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft21-entire-vector -->
### 直接例：有限個の固有値での解析性

$\mathcal H=\mathbb C^2$、$H=\operatorname{diag}(0,\log3)$、$x=(a,b)$ とすると
$$
F_x(z)=(a,e^{iz\log3}b)
$$
は複素変数 $z$ の全域で各成分が整関数、従ってノルム解析的で、実軸上では $U_tx$ に一致します。また有限次元では任意の作用素は有界で $\operatorname{Dom}H=\mathcal H$ なので、$\mathcal H$ 自身がグラフ core です。無限次元では固有値の絶対値を一様に抑えられる部分空間を使います。

**定義の確認**：$F_x(z)$ は全平面でノルム微分でき、実軸上で $e^{itH}x$ に一致するので、全解析ベクトルの条件を満たします。$H$ は有界で定義域が全空間であるため、任意の $x$ に近似列 $x_n=x$ を取ると $x_n\to x$ と $Hx_n\to Hx$ が同時に成り立ち、グラフ core の条件も確認できます。
<!-- definition-example-end -->

<a id="lem-aqft21-spectral-core"></a>

<!-- formal-statement-start -->
> **補題（スペクトル切断による共通解析的core）**  
> $\Delta$ を核が零の正自己共役作用素、$H=\log\Delta$ とし、$P_n=\boldsymbol{1}_{[-n,n]}(H)$（$n=1,2,\ldots$）をそのスペクトル射影とする。
>
> 1. $\mathcal D_{\mathrm{sp}}=\bigcup_{n\ge1}P_n\mathcal H$ は稠密な線形部分空間で、各元は $H$ の全解析ベクトルである。
> 2. 任意の実数 $r$ について $\mathcal D_{\mathrm{sp}}$ は $\Delta^r=e^{rH}$ のグラフ core であり、$\mathcal D_{\mathrm{sp}}\subset\bigcap_{r\in\mathbb R}\operatorname{Dom}\Delta^r$。
> 3. 標準対から得られた $S=J\Delta^{1/2}$ に対しても $\mathcal D_{\mathrm{sp}}$ はグラフ core である。
<!-- formal-statement-end -->

### 証明の見取り図

$P_n$ はスペクトル変数 $\lambda$ を区間 $[-n,n]$ に制限します。従って複素指数関数 $e^{iz\lambda}$ が各区間上で有界です。$n\to\infty$ の近似は、同じスペクトル測度に対して $1$ と $e^{2r\lambda}$ の両方を重みにした積分で確かめます。$S$ のグラフノルムは $J$ が等長であるため $\Delta^{1/2}$ のグラフノルムと同じです。

<!-- proof-start -->
### 証明

$H$ のスペクトル測度を $E_H$ とし、$x$ に対する有限正測度を $\mu_x(B)=\langle x,E_H(B)x\rangle$ と書きます。[スペクトル定理](../../QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)から
$$
\|(I-P_n)x\|^2
=\int_{|\lambda|>n}d\mu_x(\lambda)\longrightarrow0.
$$
$P_nP_m=P_{\min(n,m)}$ なので $\mathcal D_{\mathrm{sp}}$ は線形で稠密です。

$x=P_nx$ とすると、任意の $z\in\mathbb C$ で
$$
F_x(z)=\int_{[-n,n]}e^{iz\lambda}\,dE_H(\lambda)x
$$
が定義でき、$|e^{iz\lambda}|\leq e^{n|\operatorname{Im}z|}$ です。各コンパクトな $z$ の範囲で、差商の積分を $\lambda e^{iz\lambda}$ の積分に移せるのは $|\lambda|\leq n$ による一様有界性のためです。繰り返して全ての複素導関数が存在し、実 $t$ では $F_x(t)=U_tx$ です。

$r\in\mathbb R$ と $x\in\operatorname{Dom}e^{rH}$ に対し、関数計算で $e^{rH}P_nx=P_ne^{rH}x$。従って
$$
\begin{aligned}
\|x-P_nx\|^2
&=\int_{|\lambda|>n}1\,d\mu_x(\lambda)\to0,\\
\|e^{rH}(x-P_nx)\|^2
&=\int_{|\lambda|>n}e^{2r\lambda}\,d\mu_x(\lambda)\to0.
\end{aligned}
$$
第二の積分が収束するのは、$x\in\operatorname{Dom}e^{rH}$ が $\int e^{2r\lambda}d\mu_x<\infty$ を意味するからです。一方、$P_nx$ はどの $e^{rH}$ に対しても定義域に属します。

最後に[AQFT19の極分解](../AQFT19/index.md#thm-aqft19-polar)を使い、$x\in\operatorname{Dom}S=\operatorname{Dom}\Delta^{1/2}$ とします。$J$ は反ユニタリなので
$$
\|S(x-P_nx)\|
=\|J\Delta^{1/2}(x-P_nx)\|
=\|\Delta^{1/2}(x-P_nx)\|\to0.
$$
$r=1/2$ の前段の収束と合わせ、$\mathcal D_{\mathrm{sp}}$ は $S$ のグラフ core です。
<!-- proof-end -->

この core が $\mathcal M\Omega$ に含まれるとは**証明していません**。実際、$\mathcal M\Omega$ が $S$ のグラフ core であることと、$P_n\mathcal H$ が $S$ のグラフ core であることは、それぞれ別に証明した事実です。共通部分まで自動的に core として使うことはできません。

## 5. Gaussian平滑化は何を改善するか

スペクトル切断 $P_n$ は便利ですが、パラメータに滑らかに依存する近似も欲しくなります。そこで $U_t$ の軌道をGaussianの重みで平均します。以下は**ベクトルの解析性**に関する結果であり、$\Delta^{it}\mathcal M\Delta^{-it}=\mathcal M$ を先取りしません。

<a id="lem-aqft21-gaussian"></a>

<!-- formal-statement-start -->
> **補題（Gaussian平滑化と複素時間）**  
> $\mathcal H$ 上の自己共役作用素 $H$、$U_t=e^{itH}$、$\varepsilon>0$ に対し、Bochner積分で
$$
G_\varepsilon x
=\frac1{\sqrt{4\pi\varepsilon}}
\int_{\mathbb R}e^{-t^2/(4\varepsilon)}U_tx\,dt
\quad(x\in\mathcal H)
$$
> と置く。このとき
$$
G_\varepsilon=e^{-\varepsilon H^2},\qquad
\|G_\varepsilon\|\leq1.
$$
> 各 $G_\varepsilon x$ は $H$ の全解析ベクトルで、$G_\varepsilon x\to x$ が成り立つ。さらに任意の実数 $r$ と $x\in\operatorname{Dom}e^{rH}$ について
$$
e^{rH}G_\varepsilon x\longrightarrow e^{rH}x.
$$
> 全解析延長 $F(z)=e^{izH}G_\varepsilon x$ は
$$
\|F(t+is)\|\leq
e^{s^2/(4\varepsilon)}\|x\|
\quad(t,s\in\mathbb R)
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

実時間のユニタリ作用素族を用いた積分は、スペクトル変数 $\lambda$ ごとにGaussianのFourier変換を取ることに等しく、重み $e^{-\varepsilon\lambda^2}$ を作ります。これは複素時間に伴う増大 $e^{-s\lambda}$ を抑えます。近似で必要な極限操作は、関数計算の重みつき二乗積分を使って正当化します。

<!-- proof-start -->
### 証明

$U_t$ は強連続かつ $\|U_tx\|=\|x\|$ なので、Gaussianの重みは積分可能で、$\mathcal H$ 値Bochner積分が存在します。固定した $\lambda\in\mathbb R$ について
$$
g_\varepsilon(\lambda)
=\frac1{\sqrt{4\pi\varepsilon}}
\int_{\mathbb R}e^{-t^2/(4\varepsilon)}e^{it\lambda}\,dt
$$
を考えます。$g_\varepsilon(0)=1$ で、微分と積分の交換は $|t|e^{-t^2/(4\varepsilon)}$ の可積分性により許されます。部分積分すると
$$
\begin{aligned}
g_\varepsilon'(\lambda)
&=\frac{i}{\sqrt{4\pi\varepsilon}}\int t e^{-t^2/(4\varepsilon)}e^{it\lambda}\,dt\\
&=-2i\varepsilon\frac1{\sqrt{4\pi\varepsilon}}
\int\frac d{dt}\bigl(e^{-t^2/(4\varepsilon)}\bigr)e^{it\lambda}\,dt\\
&=-2\varepsilon\lambda\,g_\varepsilon(\lambda),
\end{aligned}
$$
境界項はGaussianの減衰で零です。従って $g_\varepsilon(\lambda)=e^{-\varepsilon\lambda^2}$。スペクトル定理の有界関数計算により $G_\varepsilon=g_\varepsilon(H)=e^{-\varepsilon H^2}$ となり $\|G_\varepsilon\|\le1$。

複素数 $z=t+is$ についてスペクトル変数上の乗数は $e^{iz\lambda-\varepsilon\lambda^2}$ であり
$$
|e^{iz\lambda-\varepsilon\lambda^2}|
=e^{-s\lambda-\varepsilon\lambda^2}
=e^{s^2/(4\varepsilon)}
e^{-\varepsilon(\lambda+s/(2\varepsilon))^2}
\leq e^{s^2/(4\varepsilon)}.
$$
局所有界な $z$ の集合では、これに $\lambda^k$ を掛けても一様有界で、スペクトル積分の差商と微分を何度でも交換できます。従って $z\mapsto e^{izH}G_\varepsilon x$ はノルム解析的です。

最後に各 $\lambda$ で $e^{-\varepsilon\lambda^2}\to1$、かつ $|1-e^{-\varepsilon\lambda^2}|\le1$ なので、有限スペクトル測度に対する優収束から
$$
\|(G_\varepsilon-I)x\|^2
=\int |e^{-\varepsilon\lambda^2}-1|^2\,d\mu_x(\lambda)\to0.
$$
$x\in\operatorname{Dom}e^{rH}$ なら同じ議論を可積分な重み $e^{2r\lambda}d\mu_x$ に適用して
$$
\|e^{rH}(G_\varepsilon-I)x\|^2
=\int e^{2r\lambda}|e^{-\varepsilon\lambda^2}-1|^2\,d\mu_x(\lambda)\to0
$$
を得ます。
<!-- proof-end -->

特に $r=1/2$ では $G_\varepsilon x$ が $\Delta^{1/2}$ のグラフノルムで $x$ に近づくため、[極分解](../AQFT19/index.md#thm-aqft19-polar)の $S=J\Delta^{1/2}$ のグラフノルムでも近づきます。「解析的」という語には対象があります。本節で得たのは $H$ の全解析**ベクトル**であり、$\mathcal M$ 内のモジュラー自己同型群についての解析的**元**を既に得たわけではありません。

## 6. 対合性と対称な切断

$J\Delta J=\Delta^{-1}$ は[AQFT19で証明したモジュラー関係](../AQFT19/index.md#thm-aqft19-modular-relations)です。この対称性は切断の両側を同時に扱うときに有効です。

<a id="lem-aqft21-symmetric-cutoff"></a>

<!-- formal-statement-start -->
> **補題（対称切断とTomita作用素の交換）**  
> 標準対に付随する $S=J\Delta^{1/2}$、$H=\log\Delta$、$P_n=\boldsymbol{1}_{[-n,n]}(H)$ について
$$
JP_n=P_nJ,\qquad
P_n\operatorname{Dom}S\subset\operatorname{Dom}S,\qquad
SP_nx=P_nSx\quad(x\in\operatorname{Dom}S)
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\log(\Delta^{-1})=-\log\Delta$ を使うと、$J$ はスペクトルの正負を反転します。区間 $[-n,n]$ は符号反転で変わらないので切断が $J$ と交換します。$S$ に対しては $\Delta^{1/2}$ の定義域の保存も必要です。

<!-- proof-start -->
### 証明

[AQFT19の関係式](../AQFT19/index.md#thm-aqft19-modular-relations) $J\Delta J=\Delta^{-1}$ と、実値Borel関数に対する[関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)から
$$
JHJ=\log(J\Delta J)=\log(\Delta^{-1})=-H.
$$
$J$ は反線形ですが、指示関数は実数値であり、スペクトル射影について
$$
JP_nJ=\boldsymbol{1}_{[-n,n]}(-H)
=\boldsymbol{1}_{[-n,n]}(H)=P_n
$$
です。$J^2=I$ より $JP_n=P_nJ$。$P_n$ は $\Delta^{1/2}=e^{H/2}$ の関数計算と交換し、その定義域を保ちます。従って $x\in\operatorname{Dom}S$ なら
$$
SP_nx=J\Delta^{1/2}P_nx
=JP_n\Delta^{1/2}x
=P_nJ\Delta^{1/2}x=P_nSx.
$$
<!-- proof-end -->

この補題はグラフ core の近似を $S$ と整合させますが、$P_n$ が $\mathcal M\Omega$ を保つとは示しません。一般のTomita可換子定理では、**代数の演算が許される領域**と、**スペクトル解析が許される領域**を結び付ける追加論証が必要になります。

## 7. 演習と詳細解答

各問題は上の定義と補題を自力で使う練習です。無限次元の問題では定義域と有界性の区別を必ず記してください。

### Level A：演算と解析性を一つずつ確認する

<a id="ex-aqft21-a01"></a>
#### AQFT21-A01 積と反転の順序

標準対 $(\mathcal M,\Omega)$ と $A,B\in\mathcal M$ について $x=A\Omega$、$y=B\Omega$ とする。$(xy)^\#$ と $y^\#x^\#$ を計算して一致を示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** [積と反転の定義](#def-aqft21-left-hilbert)から $xy=AB\Omega$ なので
$$
(xy)^\#=(AB)^*\Omega=B^*A^*\Omega.
$$
一方 $y^\#=B^*\Omega$、$x^\#=A^*\Omega$ なので
$$
y^\#x^\#=(B^*A^*)\Omega.
$$
行列・作用素の随伴の積の順序が反転することが、Hilbert環の反転でも反映されています。
<!-- solution-end -->

<a id="ex-aqft21-a02"></a>
#### AQFT21-A02 内積恒等式の二次元検算

$\mathcal H=M_2(\mathbb C)$、$\Omega=\operatorname{diag}(\sqrt3/2,1/2)$、$A=E_{12}$、$B=E_{21}$、$C=E_{11}$ とする。$\langle AB\Omega,C\Omega\rangle_2$ と $\langle B\Omega,A^*C\Omega\rangle_2$ を別々に求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [Hilbert–Schmidt内積](../AQFT20/index.md#def-aqft20-hilbert-schmidt)は $\langle X,Y\rangle_2=\operatorname{Tr}(X^*Y)$ です。$AB=E_{11}$ より $AB\Omega=(\sqrt3/2)E_{11}$、$C\Omega=(\sqrt3/2)E_{11}$ なので左辺は $3/4$。右辺では $B\Omega=(\sqrt3/2)E_{21}$、$A^*C=E_{21}E_{11}=E_{21}$ なので $A^*C\Omega=(\sqrt3/2)E_{21}$。従って右辺も $3/4$。正規直交行列単位の同じ成分の係数を掛けた結果です。
<!-- solution-end -->

<a id="ex-aqft21-a03"></a>
#### AQFT21-A03 スペクトル切断のノルム

$H=\operatorname{diag}(-2,0,3)$ を $\mathbb C^3$ 上の自己共役行列とし、$P_1=\boldsymbol{1}_{[-1,1]}(H)$、$x=(1,2,3)$ とする。$P_1x$、$\|x-P_1x\|^2$、$e^{H/2}P_1x$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 対角行列の固有値のうち区間 $[-1,1]$ に含まれるのは0だけです。従って $P_1=\operatorname{diag}(0,1,0)$、
$$
P_1x=(0,2,0),\qquad x-P_1x=(1,0,3).
$$
よって $\|x-P_1x\|^2=1+9=10$。$e^{H/2}=\operatorname{diag}(e^{-1},1,e^{3/2})$ なので $e^{H/2}P_1x=(0,2,0)$。切断と関数計算は同じ固有基底で対角となるため交換します。
<!-- solution-end -->

<a id="ex-aqft21-a04"></a>
#### AQFT21-A04 複素時間の有限次元表示

$H=\operatorname{diag}(0,\log2)$、$x=(1,i)$ とする。$F_x(z)=e^{izH}x$ を書き、$z=is$（$s\in\mathbb R$）でノルムを計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 行列指数関数は対角成分ごとに計算できるので
$$
F_x(z)=(1,i e^{iz\log2}),\qquad
F_x(is)=(1,i\,2^{-s}).
$$
従って
$$
\|F_x(is)\|^2=|1|^2+|i\,2^{-s}|^2=1+2^{-2s}.
$$
指数関数は全複素平面で正則なので、この $x$ は[全解析ベクトル](#def-aqft21-entire-vector)です。$s\to-\infty$ でノルムが増えても、各固定した $s$ で値が定義されることとは矛盾しません。
<!-- solution-end -->

### Level B：作用素・定義域・極限を接続する

<a id="ex-aqft21-b01"></a>
#### AQFT21-B01 非有界な対角作用素のグラフ core

$\mathcal H=\ell^2(\mathbb N)$、$He_j=j e_j$、$\Delta=e^H$、$P_n=\boldsymbol{1}_{[-n,n]}(H)$ とする。$x=\sum_{j\ge1}x_je_j\in\operatorname{Dom}\Delta^{1/2}$ に対し、$P_nx\to x$ および $\Delta^{1/2}P_nx\to\Delta^{1/2}x$ を級数で示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\operatorname{Dom}\Delta^{1/2}$ の条件は $\sum_{j\ge1}e^j|x_j|^2<\infty$ です。$P_nx=\sum_{j\le n}x_je_j$ なので
$$
\|x-P_nx\|^2=\sum_{j>n}|x_j|^2\to0.
$$
また $\Delta^{1/2}e_j=e^{j/2}e_j$ より
$$
\|\Delta^{1/2}(x-P_nx)\|^2
=\sum_{j>n}e^j|x_j|^2\to0.
$$
いずれも収束級数の尾部が零に近づくことから従います。従って有限支えのベクトルは $\Delta^{1/2}$ のグラフ core です。この例は[一般の切断補題](#lem-aqft21-spectral-core)の具体化です。
<!-- solution-end -->

<a id="ex-aqft21-b02"></a>
#### AQFT21-B02 右乗算が非有界になる比

$\mathcal K=\ell^2(\mathbb N)$、$\rho=\operatorname{diag}(p_j)$、$p_j=c2^{-j^2}$、$\Omega=\rho^{1/2}$、$Ve_j=e_{j+1}$ とする。$T_V(A\Omega)=AV\Omega$ のノルムが有界でないことを $E_{2j}$（$j\ge2$）だけを使って示せ。$R_V(X)=XV$ との違いも述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $E_{2j}\Omega=\sqrt{p_j}E_{2j}$ でノルムは $\sqrt{p_j}$ です。$E_{2j}V=E_{2,j-1}$ なので
$$
T_V(E_{2j}\Omega)=E_{2,j-1}\Omega
=\sqrt{p_{j-1}}E_{2,j-1}.
$$
従って単位入力 $x_j=E_{2j}\Omega/\sqrt{p_j}$ に対して
$$
\|T_Vx_j\|_2^2=\frac{p_{j-1}}{p_j}
=2^{j^2-(j-1)^2}=2^{2j-1}\to\infty.
$$
$R_V(X)=XV$ の作用素ノルムを評価します。$\|XV\|_2\leq\|X\|_2\|V\|$ と $\|V\|=1$ を用いると、$\|R_VX\|_2\leq\|X\|_2$ なので有界です。$T_V(A\Omega)=AV\Omega$ と $R_V(A\Omega)=A\Omega V$ は一般に異なり、違いを消すには $V\Omega=\Omega V$ のような追加条件が必要です。
<!-- solution-end -->

<a id="ex-aqft21-b03"></a>
#### AQFT21-B03 Gaussian近似とグラフノルム

$\mathcal H=\ell^2(\mathbb N)$、$He_j=j e_j$、$x=\sum_jx_je_j$、$G_\varepsilon=e^{-\varepsilon H^2}$ とする。$x\in\operatorname{Dom}e^{H/2}$ のとき、$G_\varepsilon x\to x$ が $e^{H/2}$ のグラフノルムで成立することを示せ。また $z=is$ での $e^{izH}G_\varepsilon x$ が常に定義される理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 対角作用から
$$
G_\varepsilon x=\sum_{j\ge1}e^{-\varepsilon j^2}x_je_j,\quad
\|e^{H/2}(G_\varepsilon-I)x\|^2
=\sum_{j\ge1}e^j|e^{-\varepsilon j^2}-1|^2|x_j|^2.
$$
各項は $\varepsilon\downarrow0$ で零へ向かい、$|e^{-\varepsilon j^2}-1|\le1$ です。仮定 $\sum_je^j|x_j|^2<\infty$ により優収束し、上式は零へ向かいます。$\|G_\varepsilon x-x\|^2$ も、これより弱い重み1で同じ議論が成立します。$z=is$ では各係数が $e^{-sj-\varepsilon j^2}$ 倍されますが、平方完成
$$
-sj-\varepsilon j^2
=-\varepsilon\left(j+\frac{s}{2\varepsilon}\right)^2
+\frac{s^2}{4\varepsilon}
\le\frac{s^2}{4\varepsilon}
$$
により一様有界です。従って任意の $x\in\ell^2$ に対して二乗和は有限です。
<!-- solution-end -->

<a id="ex-aqft21-b04"></a>
#### AQFT21-B04 $J$ が対称切断を保存する理由

標準対の $J\Delta J=\Delta^{-1}$、$H=\log\Delta$、$P_n=\boldsymbol{1}_{[-n,n]}(H)$ を前提とする。$JP_n=P_nJ$ を示し、$S=J\Delta^{1/2}$ に対する $SP_nx=P_nSx$ の定義域条件を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 実値関数に対する[関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)から $JHJ=\log(\Delta^{-1})=-H$ です。したがって
$$
JP_nJ=\boldsymbol{1}_{[-n,n]}(-H)
=\boldsymbol{1}_{[-n,n]}(H)=P_n.
$$
$J^2=I$ を使って $JP_n=P_nJ$。$P_n$ は $\Delta^{1/2}$ と交換し、$P_n\operatorname{Dom}\Delta^{1/2}\subset\operatorname{Dom}\Delta^{1/2}$ です。ゆえに $x\in\operatorname{Dom}S=\operatorname{Dom}\Delta^{1/2}$ の場合に限り
$$
SP_nx=J\Delta^{1/2}P_nx=JP_n\Delta^{1/2}x
=P_nJ\Delta^{1/2}x=P_nSx.
$$
$x$ を全Hilbert空間から任意に選んで $Sx$ と書くのは定義域違反です。
<!-- solution-end -->

### Level C：代数と解析の境界を見極める

<a id="ex-aqft21-c01"></a>
#### AQFT21-C01 二つの core を混同しない証明

標準対 $(\mathcal M,\Omega)$ とその $S=J\Delta^{1/2}$ を考える。$\mathfrak A_0=\mathcal M\Omega$ と $\mathcal D_{\mathrm{sp}}=\bigcup_{n\ge1}\boldsymbol{1}_{[-n,n]}(\log\Delta)\mathcal H$ について、次を示せ。

1. それぞれが $S$ のグラフ core である理由を別々に説明せよ。
2. $x\in\operatorname{Dom}S$ に対する両者の近似列について、何を同じ極限と見なせるかを式にせよ。
3. 以上から $\mathcal D_{\mathrm{sp}}\subset\mathfrak A_0$ が従うか判定せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** 第1問の $\mathfrak A_0$ については[Tomita初期作用素の可閉性](../AQFT18/index.md#thm-aqft18-tomita-closable)の結論 $S=\overline{S_0}$ と $\operatorname{Dom}S_0=\mathcal M\Omega$ を使います。閉包の定義から $x_k=A_k\Omega$ が存在し、
$$
x_k\to x,\qquad S_0x_k=A_k^*\Omega\to Sx
$$
となります。$\mathcal D_{\mathrm{sp}}$ については[スペクトル切断補題](#lem-aqft21-spectral-core)を $r=1/2$ に適用し、$y_n=P_nx$ と置きます。すると
$$
y_n\to x,\qquad
Sy_n=J\Delta^{1/2}P_nx\to J\Delta^{1/2}x=Sx.
$$
第2問で同じといえるのは、二種類の列が**同じグラフの点** $(x,Sx)$ に収束するということです。すなわち
$$
\|x_k-y_n\|+\|Sx_k-Sy_n\|\to0
$$
は $k,n\to\infty$ の二重極限で成立します。第3問は**従いません**。二つの稠密な部分空間が同じグラフノルムで稠密でも、一方が他方に含まれる理由にはなりません。後続の代数的議論では、必要な不変性を別に示す必要があります。
<!-- solution-end -->

<a id="ex-aqft21-c02"></a>
#### AQFT21-C02 一般のモジュラー流を先取りできるか

標準対に対し $H=\log\Delta$、$U_t=e^{itH}$、$A\in\mathcal M$ とし、$\alpha_t(A)=U_tAU_t^*$ を $B(\mathcal H)$ の元として定める。

1. 任意の $x\in\mathcal H$ について $\alpha_t(A)x\to Ax$（$t\to0$）を示せ。
2. この結果だけから $\alpha_t(A)\in\mathcal M$ を導けるか。導けない場合、論理上足りないことを述べよ。
3. Gaussian平滑化したベクトルが全解析的であることと、$\alpha_t(A)$ の $\mathcal M$ 内での解析的元の存在を区別せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** $(U_t)_{t\in\mathbb R}$ は強連続で、各 $U_t$ はユニタリなので、$U_t^*x\to x$ と $U_ty\to y$ が任意の固定ベクトル $x,y$ に対して成り立ちます。従って
$$
\begin{aligned}
\|\alpha_t(A)x-Ax\|
&=\|U_tAU_t^*x-Ax\|\\
&\le\|A(U_t^*x-x)\|+\|(U_t-I)Ax\|\\
&\le\|A\|\|U_t^*x-x\|+\|(U_t-I)Ax\|\to0.
\end{aligned}
$$
第2問は導けません。強連続性は $B(\mathcal H)$ 内の作用の連続性であり、各 $\alpha_t(A)$ が特定の部分環 $\mathcal M$ に属するという**集合の不変性**を意味しません。この不変性は後続の一般定理で別途証明する内容です。第3問では、[Gaussian平滑化補題](#lem-aqft21-gaussian)が保証するのは $x\mapsto G_\varepsilon x$ の像に対する複素時間の作用です。$A$ を平滑化したとしても、それが $\mathcal M$ に残るとはまだ言えません。「解析ベクトル」と「$\mathcal M$ 内の解析的元」は対象も仮定も異なります。
<!-- solution-end -->

## 8. 次の定理へ持ち越す問い

本講で一般に証明できたことは、標準対の代数的積に対する**左側の有界作用・反転の可閉性**、非有界な $\Delta$ に対する**グラフ core と複素時間の解析ベクトルの構成**、そして右乗算を安易に有界と置けないという事実です。

これらだけで $J\mathcal MJ=\mathcal M'$ または $\Delta^{it}\mathcal M\Delta^{-it}=\mathcal M$ を結論してはいけません。次のAQFT22では可換子側のTomita作用素と左右作用の対応をさらに詰め、AQFT23では解析的な代数元へ橋を架けます。