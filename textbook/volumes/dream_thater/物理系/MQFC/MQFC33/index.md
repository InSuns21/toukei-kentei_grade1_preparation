# MQFC33 原点を除く分布をどう延長するか

[スケーリング次数](../MQFC32/index.md#def-mqfc32-scaling-degree)を使うと、核の短距離での増大を冪で測れる。例えば一次元の $1/|x|$ の次数は1だが、原点を含めた積分は対数的に発散する。では、原点を含む試験関数への作用を別の方法で定められるだろうか。

原点付近で試験関数の定数項を引けば、残りは $O(|x|)$ となる。従って $1/|x|$ を掛けても局所的に積分できる。より強い特異性には高次のTaylor係数まで引く。本講では、この操作を点値を持たない一般の分布にまで広げ、元の次数を増やさない延長を構成する。

以下、$d\ge1$ は整数、$U=\mathbb R^d\setminus\{0\}$ とする。$|x|$ は座標のEuclidノルムであり、時空計量の符号規約は $(-,+,+,+)$ とする。分布の作用は複素線形とする。

## 1. 原点で何を決め直すのか

[テスト関数とテスト関数空間](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-test-function)を $\mathcal D(V)=C_c^\infty(V)$、その連続線形汎関数である[超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution)の空間を $\mathcal D'(V)$ と書く。$\varphi\in\mathcal D(U)$ の台は原点から正の距離だけ離れているので、原点の近くで零として全空間へ滑らかに広げられる。その関数を $\widetilde\varphi$ と書く。

原点を除いた領域で既に定まっている作用は変更せず、それ以外の試験関数への作用を補うことを考える。

<a id="def-mqfc33-extension"></a>

<!-- formal-statement-start -->
> **定義（原点を越える分布の延長）**  
> $U=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(U)$ とする。$T\in\mathcal D'(\mathbb R^d)$ がすべての $\varphi\in\mathcal D(U)$ に対して

$$
\langle T,\widetilde\varphi\rangle=\langle t,\varphi\rangle
$$

> を満たすとき、$T$ は $t$ の原点を越える延長である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc33-extension -->
### 直接例：定数核

**定義の確認**。$t=1$ を $U$ 上の正則超関数とする。全空間で $T=1$ と置けば、任意のコンパクト台 $K$ 上で

$$
|\langle T,\psi\rangle|\le |K|\sup_K|\psi|
$$

が成り立つ（$|K|$ はLebesgue測度）。従って [超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)を満たす。さらに $\widetilde\varphi$ は原点近傍で零だから、積分領域を全空間から $U$ に戻しても作用値は変わらない。

一方、[Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac)を加えた $T+\delta$ も全空間上の分布で、$\widetilde\varphi(0)=0$ だから同じ延長条件を満たす。従って延長は一般には一意ではない。
<!-- definition-example-end -->

元の短距離挙動を保つため、$\operatorname{sd}_{\mathbb R^d}(T)=\operatorname{sd}_U(t)$ を要求する。延長なら必ず $\operatorname{sd}_{\mathbb R^d}(T)\ge\operatorname{sd}_U(t)$ である。実際、全空間で $\lambda^\omega T_\lambda\to0$ なら、原点を避ける試験関数に限定しても零に収束する。正のスケール変換は原点を避ける性質を保つので、[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)と延長の条件から $\lambda^\omega t_\lambda\to0$ が従う。

## 2. Taylor係数を引く

原点の近くで1、外側で0となる滑らかな関数 $\chi$ を固定する。具体的には [MQFC32 のデルタ導関数の証明](../MQFC32/index.md#prop-mqfc32-delta-degree)で構成した関数を座標の拡大縮小で調整し、$|x|\le1$ で1、$|x|\ge2$ で0とする。この関数にTaylor多項式を掛けると、原点での微分値を保ったままコンパクト台にできる。

[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_1,\ldots,\alpha_d)$ に対し、$|\alpha|=\sum_i\alpha_i$、$\alpha!=\prod_i\alpha_i!$、$x^\alpha=\prod_i x_i^{\alpha_i}$ とする。原点での $m$ 階以下の偏微分値の集まりをTaylor jetという。これを零にする操作を定める。

<a id="def-mqfc33-subtraction"></a>

<!-- formal-statement-start -->
> **定義（原点Taylor減算）**  
> $m\ge0$ は整数、$\chi\in\mathcal D(\mathbb R^d)$ は原点近傍で1とする。$\varphi\in\mathcal D(\mathbb R^d)$ に対する原点Taylor減算を

$$
W_m\varphi(x)=\varphi(x)-
\chi(x)\sum_{|\alpha|\le m}
\frac{x^\alpha}{\alpha!}\partial^\alpha\varphi(0)
$$

> で定める。減算しない場合を $m=-1$ として $W_{-1}\varphi=\varphi$ と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc33-subtraction -->
### 直接例：一次元の一次までの減算

**定義の確認**。$\varphi(x)=(2+3x+x^2)\chi(x)$ とする。$\chi=1$ の近傍で $\varphi(0)=2$、$\varphi'(0)=3$ なので、

$$
W_1\varphi=(2+3x+x^2)\chi-(2+3x)\chi=x^2\chi.
$$

これは滑らかで台が $\operatorname{supp}\chi$ に含まれ、値も一階微分も原点で零である。一般の $\varphi$ でも $W_m\varphi$ の台は $\operatorname{supp}\varphi\cup\operatorname{supp}\chi$ に含まれる。原点付近で $\chi=1$ なので、$|\beta|\le m$ の偏微分を取って原点に代入すると、Taylor多項式のうち $\alpha=\beta$ の項だけが $\partial^\beta\varphi(0)$ を残す。従って全ての $|\beta|\le m$ で $\partial^\beta W_m\varphi(0)=0$ となる。$W_m$ は線形で、すでにこれらの微分値が零の関数には恒等的に作用する。
<!-- definition-example-end -->

一般に $g=W_m\varphi$ なら、原点付近で $g(x)=O(|x|^{m+1})$ となる。さらに $|\beta|\le m$ について $\partial^\beta g$ の $m-|\beta|$ 階以下の微分も原点で零である。この事実は、後で分布が試験関数の偏微分を読む場合に必要になる。

具体的に、$g$ のこの消失条件を仮定して $h(u)=\partial^\beta g(ux)$ に一変数Taylor展開を使う。展開点は0、評価点は1、次数は $m-|\beta|$ である。$k=m+1-|\beta|\ge1$ とすれば $h^{(j)}(0)=0$ ($0\le j<k$) で、

$$
h(1)=\frac1{(k-1)!}\int_0^1(1-u)^{k-1}h^{(k)}(u)\,du.
$$

連鎖律を繰り返すと

$$
h^{(k)}(u)=\sum_{|\gamma|=k}\frac{k!}{\gamma!}
 x^\gamma\partial^{\beta+\gamma}g(ux).
$$

従って $|\partial^\beta g(x)|\le C|x|^k\max_{|\eta|=m+1}\sup_{|y|\le |x|}|\partial^\eta g(y)|$ となる。定数 $C$ は $d,m$ にのみ依存する。

## 3. 臨界核で試す

一次元の $t(x)=|x|^{-1}$ は次数1である（[斉次分布のスケーリング次数](../MQFC32/index.md#thm-mqfc32-homogeneous-degree)に $h=-1$ を代入する）。$\chi$ を前節のように選び、

$$
\langle T,\varphi\rangle
=\int_{\mathbb R}\frac{\varphi(x)-\chi(x)\varphi(0)}{|x|}\,dx
$$

と定める。$|x|\le1$ では分子が $\varphi(x)-\varphi(0)=x\int_0^1\varphi'(ux)\,du$ だから、積分される関数の絶対値は $\sup_{[-1,1]}|\varphi'|$ 以下である。外側は原点から離れ、台もコンパクトなので積分できる。固定コンパクト台について作用は零階と一階の微分の上限で抑えられ、[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)から分布を与える。原点を避ける試験関数では $\varphi(0)=0$ なので元の積分に戻る。

次数も確認しよう。[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)で $y=x/\lambda$ と置けば、

$$
\langle T_\lambda,\varphi\rangle
=\lambda^{-1}\int_{\mathbb R}
\frac{\varphi(y)-\chi(\lambda y)\varphi(0)}{|y|}\,dy.
$$

$0<\lambda<1$ とし、この式から $\lambda^{-1}\langle T,\varphi\rangle$ を引く。差は

$$
\lambda^{-1}\varphi(0)
\int_{\mathbb R}\frac{\chi(y)-\chi(\lambda y)}{|y|}\,dy.
$$

両関数が原点近傍で1なので、この差の積分は収束する。$0<\varepsilon<1$ で切ってから第2項だけ $z=\lambda y$ と置けば、

$$
\begin{aligned}
\int_{|y|>\varepsilon}
\frac{\chi(y)-\chi(\lambda y)}{|y|}\,dy
&=-\int_{\lambda\varepsilon<|z|\le\varepsilon}\frac{\chi(z)}{|z|}\,dz\\
&=-2\log(1/\lambda)=2\log\lambda.
\end{aligned}
$$

従って $T_\lambda=\lambda^{-1}(T+2\log\lambda\,\delta)$ である。$\omega>1$ なら $\lambda^{\omega-1}$ と $\lambda^{\omega-1}\log\lambda$ はともに零へ収束する。元の次数が1なので、延長の次数も正確に1となる。斉次性は失われたが、次数は保たれている。

この例では積分を直接扱えた。しかし一般の分布には積分できる密度がない。そこで、原点から離れた小さな環状領域ごとに作用を計算し、その和の収束を調べる。

## 4. 小さな環状領域の作用を一様に抑える

スケーリング次数 $s$ が有限なら、$q>s$ に対し $\lambda^q t_\lambda$ は各固定試験関数上で零に近づく。しかし、これだけでは $\lambda$ とともに変化する試験関数に適用できない。共通の台の上で有限個の微分による一様な評価を用意する。

<a id="lem-mqfc33-uniform-estimate"></a>

<!-- formal-statement-start -->
> **補題（縮尺分布の一様有限階評価）**  
> $V=\mathbb R^d$ または $V=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(V)$ とする。$q\in\mathbb R$ が $q>\operatorname{sd}_V(t)$ を満たすとする。任意のコンパクト集合 $K\subset V$ について、ある $C>0$ と整数 $N\ge0$ が存在し、台が $K$ に含まれる全試験関数 $\psi$ と全ての $0<r\le1$ について

$$
|\langle t_r,\psi\rangle|
\le Cr^{-q}\max_{|\beta|\le N}\sup_K|\partial^\beta\psi|
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

固定した試験関数ごとに有界な分布の族から、試験関数全体に共通する有限階評価を取り出す。以下では共通コンパクト台を持つ滑らかな関数の完備性を用いて、その取り出し方も示す。

<!-- proof-start -->
### 証明

$E$ を台が $K$ に含まれる滑らかな関数の空間とし、$p_n(\psi)=\max_{|\beta|\le n}\sup_K|\partial^\beta\psi|$ と置く。距離

$$
D(\psi,\eta)=\sum_{n=0}^{\infty}2^{-n-1}
\min(1,p_n(\psi-\eta))
$$

で $E$ は完備になる。実際、$D$ でのCauchy列は全ての $p_n$ についてCauchyで、各偏微分が全空間（$K$ の外では零）で一様収束する。関数と一階偏微分の極限について、座標方向の線分上の積分恒等式に極限を通せば、極限関数の一階偏微分がその微分の極限に等しい。これを各階の偏微分について繰り返すと極限関数は滑らかで、台は $K$ に含まれる。全ての $p_n$ で収束するので、級数の尾を $2^{-n}$ で抑えることで $D$ でも収束する。

$L_r(\psi)=r^q\langle t_r,\psi\rangle$ と置く。固定した $\psi$ について、[スケーリング次数](../MQFC32/index.md#def-mqfc32-scaling-degree)の性質により $r\downarrow0$ で零に収束する。また $r$ が正の閉区間にあるとき、スケール変換された試験関数は共通のコンパクト台を持ち、各偏微分が $r$ に関して一様に連続である。従って[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)から作用も連続となる。よって $\sup_{0<r\le1}|L_r(\psi)|<\infty$ である。

整数 $j\ge1$ に対し

$$
E_j=\{\psi\in E:\ |L_r(\psi)|\le j\text{ for all }0<r\le1\}
$$

と置く。各 $L_r$ は連続だから $E_j$ は閉であり、点ごとの有界性から $E=\bigcup_{j\ge1}E_j$ である。少なくとも一つの $E_j$ は内部を持つ。これを示すには、全てが内部を持たないと仮定し、順に $E_1,E_2,\ldots$ を避ける非空の閉球を、前の球の内部に含まれ半径が $2^{-j}$ 未満となるよう選ぶ。中心はCauchy列となり、完備性によってその極限は全ての球に属する。従ってどの $E_j$ にも属さず、被覆に矛盾する。

ある $\psi_0$ の近傍が $E_j$ に含まれる。距離の級数の尾を小さくし、有限個の先頭項を $p_N$ で抑えれば、ある $N$ と $\epsilon>0$ に対して $p_N(\eta)<\epsilon$ なら $\psi_0+\eta\in E_j$ となる。$\psi_0$ も $E_j$ に属するので、線形性から

$$
|L_r(\eta)|\le |L_r(\psi_0+\eta)|+|L_r(\psi_0)|\le2j.
$$

$\psi\ne0$ に対し $\eta=\epsilon\psi/(2p_N(\psi))$ と置くと $p_N(\eta)=\epsilon/2$ である。従って $|L_r(\psi)|\le(4j/\epsilon)p_N(\psi)$ となる。零関数にも成立するので、$r^q$ で割れば主張を得る。
<!-- proof-end -->

この補題のおかげで、スケールを変えながらTaylor減算した関数を入力しても、微分の有限階評価だけを追えばよい。

## 5. 次数を保つ延長を構成する

特異性の強さを $s$ とする。$s<d$ なら減算を必要としない。$s\ge d$ のときは $m=\lfloor s-d\rfloor$ とすれば $s<d+m+1$ となる。減算後の関数には $m+1$ 次の消失があるので、体積の $d$ 次と合わせて特異性を上回る。

<a id="thm-mqfc33-extension"></a>

<!-- formal-statement-start -->
> **定理（スケーリング次数を保つ延長）**  
> $U=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(U)$ とし、$s=\operatorname{sd}_U(t)<+\infty$ とする。このとき延長 $T\in\mathcal D'(\mathbb R^d)$ が存在して

$$
\operatorname{sd}_{\mathbb R^d}(T)=s
$$

> を満たす。$s<d$ の場合、その次数を保つ延長は一意である。$d\le s<+\infty$ の場合、$m=\lfloor s-d\rfloor$ として原点Taylor減算を用いて構成できる。$s=-\infty$ も $s<d$ の場合に含む。
<!-- formal-statement-end -->

### 証明の見取り図

半径 $r=2^{-j}$ ごとの環に分解する。環上の分布の作用は、体積規格化と前節の評価から $r^{d-q}$ 程度になる。Taylor減算でさらに $r^{m+1}$ を得るため、小さい環の寄与の和が収束する。延長のスケーリング次数を調べるときは、試験関数の縮尺 $\lambda$ より小さい環と大きい環に分けて評価する。

<!-- proof-start -->
### 証明：環状分解と収束

前節までの $\chi$ を固定し、$\rho(x)=\chi(x)-\chi(2x)$ と置く。$\rho$ の台は $A=\{x:1/2\le|x|\le2\}$ に含まれ、原点から離れている。$r_j=2^{-j}$ ($j=0,1,\ldots$) とすれば

$$
\sum_{j=0}^{J}\rho(x/r_j)=\chi(x)-\chi(2^{J+1}x).
$$

$x\ne0$ では最後の項が十分大きい $J$ で零になる。$m=-1$ ($s<d$) または $m=\lfloor s-d\rfloor$ ($s\ge d$) とし、$g=W_m\varphi$ に対して

$$
\langle T,\varphi\rangle
=\langle t,(1-\chi)g\rangle+
\sum_{j=0}^{\infty}\langle t,\rho(\,\cdot\,/r_j)g\rangle
$$

と置く。各項の試験関数は原点から離れるので、元の $t$ に入力できる。

[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)に $\psi(y)=\rho(y)g(ry)$ を入れると、

$$
\langle t,\rho(\,\cdot\,/r)g\rangle
=r^d\langle t_r,\rho(\,\cdot\,)g(r\,\cdot\,)\rangle.
$$

$q$ を $s<q<d+m+1$ に選ぶ。$m=-1$ ならこれは $q<d$ を意味し、$s=-\infty$ でも選べる。[縮尺分布の一様有限階評価](#lem-mqfc33-uniform-estimate)を $A$ 上で適用する。

固定コンパクト台の $\varphi$ について、ある有限な微分上限 $P(\varphi)$ と定数 $C$ を取れば、$0<r\le1$ で

$$
\max_{|\beta|\le N}\sup_A
|\partial_y^\beta(\rho(y)g(ry))|
\le CP(\varphi)r^{m+1}
$$

となる。ここで $m=-1$ の場合の右辺の冪は0である。詳しくは積の微分で現れる各項は、定数倍を除いて

$$
(\partial^{\beta-\gamma}\rho)(y)
r^{|\gamma|}(\partial^\gamma g)(ry),
\qquad \gamma\le\beta
$$

である。$|\gamma|\le m$ なら第2節のTaylor評価から $r^{|\gamma|}|ry|^{m+1-|\gamma|}\le C r^{m+1}$ を得る。$|\gamma|\ge m+1$ なら偏微分の上限に $r^{|\gamma|}\le r^{m+1}$ を掛ければよい。$m=-1$ では後者だけである。$P$ には $N$ と $m+1$ の最大階までの $\varphi$ の偏微分上限を取れる（$g$ の微分は固定 $\chi$ の微分と $\varphi$ の原点微分値で抑えられる）。

従って環一つの作用値は

$$
|\langle t,\rho(\,\cdot\,/r_j)g\rangle|
\le CP(\varphi)r_j^{d-q+m+1}.
$$

指数 $d-q+m+1$ は正なので、右辺の総和は $CP(\varphi)/(1-2^{-(d-q+m+1)})$ で有限である。外側の項は固定コンパクト台で原点から離れているため、[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)により有限階の微分上限で抑えられる。よって全和は連続線形作用であり、$T$ は分布である。

原点を避ける試験関数では $g=\varphi$ で、小さい環の項は全て零になる。有限和の望遠鏡型の恒等式を代入すると全作用は $\langle t,\varphi\rangle$ に戻る。従って延長である。

### 次数の上界

任意の実数 $\omega>s$ に対して $\lambda^\omega T_\lambda\to0$ を示す。$m=-1$ なら $s<q<\min(\omega,d)$ とし、$m\ge0$ なら

$$
s<q<\min(\omega,d+m+1)
$$

と取る。後者では $q>d+m$ も成り立つ。以下、固定した $\varphi$ の台を $|x|\le R$ ($R\ge1$) に含める。$\varphi_\lambda(x)=\lambda^{-d}\varphi(x/\lambda)$ とし、$g_\lambda=W_m\varphi_\lambda$ を構成式に入れる。

**小さい環 $r_j\le\lambda$**。十分小さい $\lambda$ では $|r_j y|\le 2\lambda\le1$ だから $\chi(r_j y)=1$ である。$m\ge0$ なら $P_m$ を $\varphi$ の原点での $m$ 次Taylor多項式として、

$$
g_\lambda(r_j y)=\lambda^{-d}
(\varphi((r_j/\lambda)y)-P_m((r_j/\lambda)y)).
$$

$m=-1$ なら $P_m=0$ とする。第2節と先の積の微分評価を縮尺 $r_j/\lambda\le1$ に適用すると、$\rho(y)g_\lambda(r_j y)$ の $N$ 階以下の微分上限は $C_\varphi\lambda^{-d}(r_j/\lambda)^{m+1}$ 以下になる。環の作用は従って

$$
C_\varphi\lambda^{-d-m-1}r_j^{d-q+m+1}
$$

以下である。$r_j\le\lambda$ についての幾何級数は $C\lambda^{d-q+m+1}$ 以下なので、総寄与は $C_\varphi\lambda^{-q}$ 以下となる。

**中間の環 $\lambda<r_j\le2R\lambda$**。環の数は $\lambda$ に依存しない有限個（高々 $2+\lceil\log_2(2R)\rceil$）である。$\rho(y)g_\lambda(r_j y)$ の微分では $r_j/\lambda\le2R$ であり、Taylor項も同じ比の有限次の冪で抑えられる。$\chi(r_j y)$ の微分は $r_j\le1$ で一様有界だから、微分上限は $C_\varphi\lambda^{-d}$ 以下である。$r_j^{d-q}$ は $\lambda^{d-q}$ の定数倍以下なので、総寄与は $C_\varphi\lambda^{-q}$ 以下となる。

**大きい環 $r_j>2R\lambda$**。$y\in A$ では $|r_j y|>R\lambda$ だから $\varphi_\lambda(r_j y)=0$ である。$m=-1$ なら寄与は零。$m\ge0$ なら残るのは

$$
-\chi(r_j y)\sum_{|\alpha|\le m}
\frac{r_j^{|\alpha|}y^\alpha}{\alpha!}
\lambda^{-d-|\alpha|}\partial^\alpha\varphi(0).
$$

積の微分を取っても $\chi(r_j y)$ と $\rho(y)$ の各階微分は一様有界で、$y$ は固定の環にある。従って $k=|\alpha|$ ごとの作用の上界は $C_\varphi\lambda^{-d-k}r_j^{d-q+k}$ である。$q>d+m\ge d+k$ のため指数 $d-q+k$ は負である。幾何級数を最小半径側から足せば

$$
\sum_{r_j>2R\lambda}r_j^{d-q+k}
\le C\lambda^{d-q+k}.
$$

従ってここも $C_\varphi\lambda^{-q}$ 以下となる。外側の項では十分小さい $\lambda$ で $(1-\chi)\varphi_\lambda=0$ となる。$m=-1$ なら零、$m\ge0$ なら固定した関数 $(1-\chi)\chi x^\alpha$ への作用の有限和で、上界は $C_\varphi\sum_{k=0}^m\lambda^{-d-k}$ となる。$q>d+m$ だからこれも $C_\varphi\lambda^{-q}$ 以下である。

以上より $|\langle T_\lambda,\varphi\rangle|\le C_\varphi\lambda^{-q}$ であり、$\omega-q>0$ を使って

$$
\lambda^\omega|\langle T_\lambda,\varphi\rangle|
\le C_\varphi\lambda^{\omega-q}\longrightarrow0.
$$

任意の $\omega>s$ に対して成立するので $\operatorname{sd}(T)\le s$ である。第1節で示した延長の次数の下界と合わせると等号になる。$s=-\infty$ の場合も全ての実数 $\omega$ で成立するから次数は $-\infty$ である。

### $s<d$ での一意性

次数 $s$ を持つ二つの延長 $T_1,T_2$ の差を $D=T_1-T_2$ とする。$s<q<d$ を選べば、定義から $\lambda^q D_\lambda\to0$ である。さらに $q$ より小さく $s$ より大きい実数でもこの収束が成立するので $\operatorname{sd}(D)<q$ となる。$D$ は原点を避ける試験関数上で零である。従って任意の $\varphi$ と $0<r\le1$ に対し、

$$
\langle D,\varphi\rangle
=\langle D,\chi(\,\cdot\,/r)\varphi\rangle
=r^d\langle D_r,\chi(\,\cdot\,)\varphi(r\,\cdot\,)\rangle.
$$

[縮尺分布の一様有限階評価](#lem-mqfc33-uniform-estimate)を今度は全空間上の $D$ に対し、固定コンパクト台 $\operatorname{supp}\chi$ で適用する。$\chi(y)\varphi(ry)$ の有限階微分は $r\le1$ で一様有界なので右辺の絶対値は $C_\varphi r^{d-q}$ 以下である。$q<d$ だから $r\downarrow0$ で零になる。左辺は $r$ に依存しないので零であり、$D=0$ が従う。
<!-- proof-end -->

## 6. 整数境界と自由度

$d=4$ なら $s=3.9$ のときは減算不要、$s=4$ では定数項まで、$s=4.9$ でも定数項まで、$s=5$ では一次項まで引く。重要なのは $d+m+1>s$ が厳密な不等号である点である。例えば $s=4$ に対して $m=-1$ とすると指数 $d-q=4-q$ は $q>4$ のため負になり、前節の幾何級数の論証が成立しない。実際、$|x|^{-4}$ の単位球上の積分は四次元で $\int_0^1 dr/r$ となり発散する。

$s\ge d$ のときは一意性を失う。定理で得た $T$ に $c\delta$ を加えても原点外の作用は変わらない。[デルタ導関数のスケーリング次数](../MQFC32/index.md#prop-mqfc32-delta-degree)は $\operatorname{sd}(\delta)=d$ を与える。任意の $\omega>s\ge d$ で両項の規格化した作用は零に収束するから、和の次数は $s$ 以下である。延長の次数の下界と合わせて正確に $s$ になる。$|\alpha|\le m$ であれば $\partial^\alpha\delta$ も次数 $d+|\alpha|\le s$ のため同じ議論ができる。

例えば $s=d$ で一階デルタ導関数を非零の係数で追加すると、[スケーリング次数の演算則](../MQFC32/index.md#prop-mqfc32-degree-rules)の異なる次数の場合の等号により次数は $d+1$ になってしまう。こうした自由度の完全な分類には、原点だけに支持を持つ分布の構造が必要になる。次講でその分類を証明する。

## 7. 演習

### 演習 MQFC33-A1：どこまで引くか
- Level: A

$d=3$ とし、$s=2.9,3,3.8,4,5.2$ のそれぞれについて、[スケーリング次数を保つ延長](#thm-mqfc33-extension)の構成で選ぶ $m$ を求めよ。指数 $d+m+1-s$ が正であることも確認せよ。

<!-- solution-start -->
**詳細解答**

$s=2.9$ では $s<d$ なので $m=-1$、指数は $3-2.9=0.1$。残りは $m=\lfloor s-3\rfloor$ を計算する。

| $s$ | $s-3$ | $m$ | $3+m+1-s$ |
| --- | --- | --- | --- |
| 3 | 0 | 0 | 1 |
| 3.8 | 0.8 | 0 | 0.2 |
| 4 | 1 | 1 | 1 |
| 5.2 | 2.2 | 2 | 0.8 |

全て正なので $s<q<d+m+1$ を取れる。整数境界でも $q=s$ を用いる必要はない。
<!-- solution-end -->

### 演習 MQFC33-A2：原点Taylor減算の計算
- Level: A

二次元で $\chi=1$ が原点近傍で成り立つ滑らかなコンパクト台関数とする。$\varphi(x,y)=(1+2x-3y+xy+4y^2)\chi(x,y)$ に対して $W_1\varphi$ と $W_2\varphi$ を求めよ。

<!-- solution-start -->
**詳細解答**

原点近傍で $\chi=1$ なので、$\varphi(0)=1$、$\partial_x\varphi(0)=2$、$\partial_y\varphi(0)=-3$ である。[原点Taylor減算](#def-mqfc33-subtraction)に代入すると

$$
W_1\varphi=(xy+4y^2)\chi.
$$

二階微分値は $\partial_x^2\varphi(0)=0$、$\partial_x\partial_y\varphi(0)=1$、$\partial_y^2\varphi(0)=8$ である。係数を $\alpha!$ で割るので二次項は $0x^2/2+xy+8y^2/2=xy+4y^2$。従って $W_2\varphi=0$ となる。$W_1\varphi$ の値と一階微分値は原点で零であり、$W_2\varphi$ の二階までの微分値も全て零である。
<!-- solution-end -->

### 演習 MQFC33-A3：環の望遠鏡型の和
- Level: A

$\rho(x)=\chi(x)-\chi(2x)$、$r_j=2^{-j}$、$\chi(x)=0$ ($|x|\ge2$) とする。$\sum_{j=0}^{3}\rho(x/r_j)$ を計算せよ。また $|x|=1/4$ でこの和が $\chi(x)$ に等しいことを示せ。

<!-- solution-start -->
**詳細解答**

$x/r_j=2^jx$ なので4項は順に $\chi(x)-\chi(2x)$、$\chi(2x)-\chi(4x)$、$\chi(4x)-\chi(8x)$、$\chi(8x)-\chi(16x)$ である。中間の3組が打ち消し合い、和は $\chi(x)-\chi(16x)$。$|x|=1/4$ のとき $|16x|=4\ge2$ だから第2項は零であり、和は $\chi(x)$ である。
<!-- solution-end -->

### 演習 MQFC33-A4：減算で積分が収束する理由
- Level: A

一次元で $t(x)=|x|^{-3/2}$ を $x\ne0$ で考える。減算なしの $\int_{0<|x|<1}t(x)\,dx$ は発散すること、$|x|\le1$ で $\chi=1$ とした $W_0\varphi$ を掛けた積分は絶対収束することを示せ。

<!-- solution-start -->
**詳細解答**

原点を $\varepsilon$ だけ除くと

$$
2\int_\varepsilon^1 r^{-3/2}\,dr
=4(\varepsilon^{-1/2}-1)\to+\infty.
$$

一方、$|x|\le1$ で $W_0\varphi(x)=\varphi(x)-\varphi(0)$ だから、線分上の積分で $|W_0\varphi(x)|\le M|x|$、$M=\sup_{[-1,1]}|\varphi'|$ となる。従って

$$
\int_{0<|x|<1}|x|^{-3/2}|W_0\varphi(x)|\,dx
\le2M\int_0^1 r^{-1/2}\,dr=4M.
$$

この有限階評価と原点外のコンパクト台での積分から、全空間への作用を定められる。
<!-- solution-end -->

### 演習 MQFC33-B1：幾何級数の指数
- Level: B

$d=4$、$s=5$、$q=11/2$ とする。定理の構成における $m$ を求め、$r_j\le\lambda$ の項の総上界を $C_\varphi\lambda^{-q}$ の形に導け。

<!-- solution-start -->
**詳細解答**

$m=\lfloor5-4\rfloor=1$ であり、$5<11/2<4+1+1=6$ を満たす。小さい環の評価は

$$
C_\varphi\lambda^{-6}r_j^{4-11/2+2}
=C_\varphi\lambda^{-6}2^{-j/2}.
$$

$r_J\le\lambda<2r_J$ となる $J\ge0$ を $0<\lambda\le1$ に対して取れば、

$$
\sum_{j\ge J}2^{-j/2}
=\frac{r_J^{1/2}}{1-2^{-1/2}}
\le\frac{\lambda^{1/2}}{1-2^{-1/2}}.
$$

従って総上界は $C_\varphi(1-2^{-1/2})^{-1}\lambda^{-11/2}$ である。例えば $\omega=23/4$ なら $\lambda^\omega$ を掛けて $\lambda^{1/4}\to0$ となる。
<!-- solution-end -->

### 演習 MQFC33-B2：一意な延長とデルタの追加
- Level: B

$d=2$ で $t(x)=|x|^{-1}$ ($x\ne0$) とする。正則超関数としての全空間への延長の次数を求め、同じ次数を保つ延長が一意か判定せよ。さらに非零 $c\in\mathbb C$ に対し $c\delta$ を追加した場合を調べよ。

<!-- solution-start -->
**詳細解答**

原点付近の絶対積分は極座標で $2\pi\int_0^1 r^{1-1}\,dr=2\pi$ なので有限であり、[局所可積分関数が定める超関数](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-l1loc-distribution)として全空間に $T$ を定める。変数変換 $x=\lambda y$ によって全試験関数で $T_\lambda=\lambda^{-1}T$ が成り立つ。$T$ は非零だから [斉次分布のスケーリング次数](../MQFC32/index.md#thm-mqfc32-homogeneous-degree)から次数は1。

原点外でも次数1で、$1<2$ なので [スケーリング次数を保つ延長](#thm-mqfc33-extension)の一意性が適用される。$c\delta$ は[デルタ導関数のスケーリング次数](../MQFC32/index.md#prop-mqfc32-delta-degree)により次数2であり、[スケーリング次数の演算則](../MQFC32/index.md#prop-mqfc32-degree-rules)の異なる次数の場合の等号から和の次数は2。延長条件自体は満たすが、次数1を保つという条件を失う。
<!-- solution-end -->

### 演習 MQFC33-B3：二つの減算関数
- Level: B

一次元の $1/|x|$ に対して第3節の延長を $T_\chi$ と書く。$\eta$ も原点近傍で1の滑らかなコンパクト台関数であるとする。$T_\eta-T_\chi$ がデルタ分布の定数倍になることを示せ。

<!-- solution-start -->
**詳細解答**

各定義の積分は収束するので差を取れる。任意の試験関数に対し、

$$
\begin{aligned}
\langle T_\eta-T_\chi,\varphi\rangle
&=\int_{\mathbb R}\frac{(\chi(x)-\eta(x))\varphi(0)}{|x|}\,dx\\
&=\varphi(0)\int_{\mathbb R}\frac{\chi(x)-\eta(x)}{|x|}\,dx.
\end{aligned}
$$

$\chi-\eta$ は原点のある近傍で零であり、コンパクト台を持つから最後の積分は有限な定数 $c$ である。[Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac)の作用は $\varphi(0)$ だから $T_\eta-T_\chi=c\delta$ である。符号は「新しい減算関数を引く」ため $\chi-\eta$ となる。例えば $\eta(x)=\chi(x/2)$ なら第3節の計算で $\lambda=1/2$ として $c=-2\log 2$ になる。
<!-- solution-end -->

### 演習 MQFC33-C1：四次元の臨界核
- Level: C

$t(x)=|x|^{-4}$ ($x\in\mathbb R^4\setminus\{0\}$) とし、$\chi$ は第2節の関数とする。次式が延長を与え、その次数が4であることを直接示せ。

$$
\langle T,\varphi\rangle=
\int_{\mathbb R^4}|x|^{-4}
(\varphi(x)-\chi(x)\varphi(0))\,d^4x.
$$

また、$T+c\delta$ および $T+b\partial_1\delta$ ($b,c\ne0$) の次数を求めよ。

<!-- solution-start -->
**詳細解答**

単位球面の面積を $\sigma_3$ と書く。$|x|\le1$ で分子は

$$
\varphi(x)-\varphi(0)=
\int_0^1\sum_{j=1}^4x_j\partial_j\varphi(ux)\,du.
$$

$M=\max_j\sup_{|y|\le1}|\partial_j\varphi(y)|$ とすれば $\sum_j|x_j|\le2|x|$ から絶対値は $2M|x|$ 以下である。動径積分で

$$
\int_{|x|<1}|x|^{-4}|W_0\varphi(x)|\,d^4x
\le2M\sigma_3\int_0^1 r^{3-4+1}\,dr
=2M\sigma_3.
$$

外側は固定コンパクト台で零階微分上限により抑えられる。従って[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)から $T$ は分布である。原点を避ける試験関数は $\varphi(0)=0$ なので元の作用に戻り、延長条件を満たす。

[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)で $x=\lambda y$ と変数変換すると、

$$
\langle T_\lambda,\varphi\rangle
=\lambda^{-4}\int |y|^{-4}
(\varphi(y)-\chi(\lambda y)\varphi(0))\,d^4y.
$$

$\lambda^{-4}\langle T,\varphi\rangle$ を引くと、差は $\lambda^{-4}\varphi(0)$ と $\int |y|^{-4}(\chi(y)-\chi(\lambda y))\,d^4y$ の積となる。$0<\lambda<1$、$0<\varepsilon<1$ で原点を除き、第2項だけ $z=\lambda y$ と変数変換すると差の積分は

$$
-\int_{\lambda\varepsilon<|z|\le\varepsilon}|z|^{-4}\,d^4z
=-\sigma_3\int_{\lambda\varepsilon}^\varepsilon\frac{dr}{r}
=\sigma_3\log\lambda.
$$

両減算関数が原点近傍で1だから切った積分は元の差の積分に等しい。従って

$$
T_\lambda=\lambda^{-4}(T+\sigma_3\log\lambda\,\delta).
$$

$\omega>4$ なら $\lambda^{\omega-4}$ と $\lambda^{\omega-4}\log\lambda$ は零へ収束する。原点を除く核は非零で斉次次数 $-4$ だから[斉次分布のスケーリング次数](../MQFC32/index.md#thm-mqfc32-homogeneous-degree)により元の次数は4。第1節の延長の次数の下界と合わせて $\operatorname{sd}(T)=4$ となる。

[デルタ導関数のスケーリング次数](../MQFC32/index.md#prop-mqfc32-delta-degree)から $\delta$ は次数4、$\partial_1\delta$ は次数5である。[スケーリング次数の演算則](../MQFC32/index.md#prop-mqfc32-degree-rules)で和の上界を使うと $\operatorname{sd}(T+c\delta)\le4$、原点外の作用は変わらないので下界も4。一方、異なる次数の和 $T+b\partial_1\delta$ の次数は5となる。両者とも延長だが、前者だけが次数を保つ。
<!-- solution-end -->

## 8. 次の講義

Taylor減算によって非対角で定まった分布を、短距離の特異性を増やさずに対角まで延長できた。次は、同じ次数を保つ二つの延長の差がどのような局所項に限られるかを分類する。

## 9. 直接前提講座

- [MQFC32](../MQFC32/index.md)
- [GPDE1](../../../解析系/GPDE/GPDE1/index.md)
- [GPDE2](../../../解析系/GPDE/GPDE2/index.md)
