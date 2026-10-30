# CAG1-12 曲線の種数と代数・解析比較

[前章の標準束の比較](../CAG1-11/index.md#thm-cag1-11-canonical-comparison)では、同じ曲線上の代数的な微分形式と正則微分形式が対応することを見た。しかし**曲線の種数**は局所座標や標準束だけで決まる量ではない。[AG3-11の種数の定義](../../AG/AG3-11/index.md#def-ag3-11-genus)は、大域切断の貼り合わせの障害を表す $H^1(C,\mathcal O_C)$ の次元を使う。解析側でも同じ数を取り出せるだろうか。

この章では三つの橋を渡る。まず GAGA により**代数的層コホモロジーと解析的層コホモロジー**を結ぶ。次に正則関数層を滑らかな微分形式で解消し、解析的層コホモロジーを**Dolbeaultコホモロジー**として実際に計算できる形へ移す。最後に平面曲線の方程式から種数を再計算する。

以下、特記しない限り $C$ は $\mathbb C$ 上の滑らかな連結射影整曲線、$M=C^{\mathrm{an}}$ はその解析化とする。$M$ はコンパクト連結な複素一次元多様体（Riemann面）である。$\mathcal O_C$ は代数的構造層、$\mathcal O_M$ は正則関数の層とし、$H^q(C,-)$ と $H^q(M,-)$ は**異なる空間上の層コホモロジー**として区別する。

## 1. 種数の定義を解析側へ運ぶ

代数的な種数は $g(C)=\dim_{\mathbb C}H^1(C,\mathcal O_C)$ だった。解析的な Riemann 面では、多項式でなく各開集合上の正則関数を貼り合わせる。その正則関数層の一次コホモロジーの次元を、代数側と比較するために新たに定義する。この量は、後で導入する $(0,1)$ 形式の商による表示と、最初から同一ではない。

<a id="def-cag1-12-analytic-sheaf-genus"></a>

<!-- formal-statement-start -->
> **定義（解析的層種数）**  
> $M$ をコンパクト連結Riemann面とし、$H^1(M,\mathcal O_M)$ が有限次元であるとする。正則関数層 $\mathcal O_M$ による解析的層種数を

$$
g_{\mathrm{hol}}(M)
=\dim_{\mathbb C}H^1(M,\mathcal O_M)
$$

> と定義する。これは複素ベクトル空間の次元であり、曲線の方程式の次数そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-12-analytic-sheaf-genus -->
**定義の確認**。$M=(\mathbb P^1_{\mathbb C})^{\mathrm{an}}$ とする。[射影直線の代数的コホモロジー](../../AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)に $m=0$ を入れると $H^1(\mathbb P^1,\mathcal O)=0$。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)は $\mathbb P^1$ が射影的で $\mathcal O$ が連接層であるため適用でき、$H^1(M,\mathcal O_M)=0$。従って $g_{\mathrm{hol}}(M)=0$ で、有限次元性も実際に確認できた。
<!-- definition-example-end -->

この比較を一般の滑らかな射影曲線にも適用する。代数側の $\mathcal O_C$ は階数1の自由加群層なので連接であり、解析化すると構成上 $\mathcal O_M$ になる。

<a id="thm-cag1-12-gaga-genus"></a>

<!-- formal-statement-start -->
> **定理（GAGAによる曲線の種数比較）**  
> $C$ を $\mathbb C$ 上の滑らかな連結射影整曲線、$M=C^{\mathrm{an}}$ とする。[解析化の比較写像](../CAG1-05/index.md#def-cag1-05-comparison-map)は自然な複素線形同型

$$
H^1(C,\mathcal O_C)\ \xrightarrow{\ \simeq\ }\
H^1(M,\mathcal O_M)
$$

> を与える。特に解析的層種数は有限で、

$$
g(C)=g_{\mathrm{hol}}(M).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)へ $X=C,\mathcal F=\mathcal O_C,q=1$ を入力する。滑らかさは解析化がRiemann面となるために使い、**GAGA自体の仮定には入らない**。最後に同型な有限次元ベクトル空間の次元を比較する。

<!-- proof-start -->
### 証明

$C$ は $\mathbb C$ 上の有限型射影スキームだから、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の射影性を満たす。$\mathcal O_C$ は連接層であり、[解析化の構造層の構成](../CAG1-02/index.md#thm-cag1-02-analytification-functor)から $(\mathcal O_C)^{\mathrm{an}}\simeq\mathcal O_M$ である。同定を挿入すると比較同型は

$$
H^1(C,\mathcal O_C)
\xrightarrow{\ \simeq\ }H^1(M,(\mathcal O_C)^{\mathrm{an}})
\xrightarrow{\ \simeq\ }H^1(M,\mathcal O_M).
$$

左辺は[代数的種数の定義](../../AG/AG3-11/index.md#def-ag3-11-genus)と射影曲線のコホモロジーの有限次元性により次元 $g(C)<\infty$ を持つ。従って右辺も有限次元であり、その次元 $g_{\mathrm{hol}}(M)$ は $g(C)$ に等しい。$\square$
<!-- proof-end -->

ここまでは**層と層の比較**であって、まだ $(0,1)$ 形式の同値類は登場しない。両者の接続には「正則関数とは何か」を滑らかな関数から検出する微分方程式が必要になる。

## 2. 正則関数層を滑らかな形式で解消する

Riemann面 $M$ の開集合 $U$ に対して、$\mathcal A_M^{0,0}(U)$ を滑らかな複素数値関数、$\mathcal A_M^{0,1}(U)$ を滑らかな $(0,1)$ 形式の空間とし、開集合への制限で層を作る。局所正則座標 $z=x+iy$ では、関数 $u$ と形式 $\alpha=a(z,\bar z)d\bar z$ の間を

$$
\bar\partial u
=\frac{\partial u}{\partial\bar z}\,d\bar z,
\qquad
\frac{\partial}{\partial\bar z}
=\frac12\left(\frac{\partial}{\partial x}
+i\frac{\partial}{\partial y}\right)
$$

が結ぶ。これは[型別外微分の局所公式](../../../幾何系/CM/CM2-02/index.md#thm-cm2-02-local-formula)と同じ記号である。

例えば円板 $D\subset\mathbb C$ で $u=z\bar z$ とすると $\bar\partial u=z\,d\bar z$ であり、$u$ 自身は正則ではない。一方 $\bar\partial z^2=0$。この違いを**核が正則関数層になる**という形で表す。

<a id="prop-cag1-12-dolbeault-resolution"></a>

<!-- formal-statement-start -->
> **命題（曲線上のDolbeault解消）**  
> $M$ を複素一次元多様体とする。正則関数層 $\mathcal O_M$ と滑らかな形式の層 $\mathcal A_M^{0,q}$ に対し、次の層の列は完全である。

$$
0\longrightarrow\mathcal O_M
\longrightarrow\mathcal A_M^{0,0}
\xrightarrow{\ \bar\partial\ }\mathcal A_M^{0,1}
\longrightarrow0.
$$

> ここで最初の矢印は正則関数を滑らかな関数とみなす包含であり、完全性は各点の**茎**で判定する。一般の複素次元 $n$ では $\mathcal A^{0,n}$ まで続く。
<!-- formal-statement-end -->

### 証明の見取り図

左では $\bar\partial u=0$ と正則性を結び、右では「局所での $\bar\partial$ 方程式が解ける」ことを使う。右端の層の全射と、固定した開集合上での大域的な $\bar\partial$ 方程式の可解性は別物である。

<!-- proof-start -->
### 証明

正則関数は滑らかなので最初の包含は単射である。局所座標で $\bar\partial u=0$ とは $\partial u/\partial\bar z=0$ を意味し、[正則関数の判定](../../../幾何系/CM/CM2-02/index.md#prop-cm2-02-holomorphic-function)により、滑らかな $u$ がこの条件を満たすことと正則であることは同値である。従って $\ker\bar\partial=\mathcal O_M$ が茎で成立する。

次に任意の点 $x$ と、その近くの滑らかな $(0,1)$ 形式 $\alpha$ の芽を取る。複素次元1では $\mathcal A_M^{0,2}=0$ だから $\bar\partial\alpha=0$ は自動的に成立する。

[局所bar∂-Poincaré補題](../../../幾何系/CM/CM2-03/index.md#thm-cm2-03-local-dbar-poincare)へ $p=0,q=1$ を代入すると、$x$ の小近傍 $V$ 上に滑らかな関数 $u$ があり、

$$
\bar\partial u=\alpha|_V
$$

を満たす。任意の形式の芽が像に入るので、$\bar\partial:\mathcal A_M^{0,0}\to\mathcal A_M^{0,1}$ は茎で全射である。左端・中央の完全性も既に確かめたので列全体が完全である。$\square$
<!-- proof-end -->

**大域での落とし穴。** 局所解 $u_i$ の存在から一つの大域解 $u$ の存在を結論してはならない。$u_j-u_i$ は重なりで正則だが、補正を選んで消せるとは限らない。[CM2-04の貼り合わせ判定](../../../幾何系/CM/CM2-04/index.md#thm-cm2-04-gluing-obstruction)が測っていたのはこの差だった。

## 3. 分割の1は、なぜ層コホモロジーを計算させるのか

局所で完全な列を得ても、そこから大域切断を取った列が完全とは限らない。そこで、滑らかな関数を使って局所切断を貼り合わせられるという、微分形式の層の特別な性質を利用する。

滑らかな多様体はパラコンパクトであり、任意の局所有限開被覆 $\{U_i\}$ に対して**分割の1**、すなわち滑らかな実数値関数 $\rho_i\ge0$ で

$$
\operatorname{supp}\rho_i\subset U_i,
\qquad \sum_i\rho_i=1
$$

を満たす族を取れる（各点の近くでは有限項だけ非零）。ここで $\operatorname{supp}$ は関数が非零な点集合の閉包である。

<a id="def-cag1-12-fine-sheaf"></a>

<!-- formal-statement-start -->
> **定義（細層）**  
> パラコンパクトHausdorff空間 $M$ 上のアーベル群の層 $\mathcal F$ が**細層**（fine sheaf）であるとは、任意の局所有限開被覆 $\{U_i\}$ に対して、層の自己準同型 $h_i:\mathcal F\to\mathcal F$ が存在し、各 $h_i$ の台が $U_i$ に含まれ、局所有限和として

$$
\sum_i h_i=\operatorname{id}_{\mathcal F}
$$

> が成り立つことをいう。台の条件は、$U_i$ の外では $h_i$ が零写像となることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-12-fine-sheaf -->
**定義の確認**。$M=\mathbb{CP}^1$ を $U_0=\{Z_0\ne0\}$ と $U_1=\{Z_1\ne0\}$ で覆う。$t=|Z_0|^2/(|Z_0|^2+|Z_1|^2)$ は斉次座標の取り替えで不変な滑らかな実数値関数である。$\chi(s)=0$（$s\le1/4$）、$\chi(s)>0$（$s>1/4$）を満たす滑らかな関数を選び、

$$
\rho_0=\frac{\chi(t)}{\chi(t)+\chi(1-t)},
\qquad
\rho_1=\frac{\chi(1-t)}{\chi(t)+\chi(1-t)}
$$

と置く。$t\in[0,1]$ では $t$ と $1-t$ の少なくとも一方が $1/4$ より大きく、分母は正。$\rho_0+\rho_1=1$、$\operatorname{supp}\rho_0\subset\{t\ge1/4\}\subset U_0$、$\operatorname{supp}\rho_1\subset\{t\le3/4\}\subset U_1$ である。$\mathcal A_M^{0,q}$ の切断 $\alpha$ に $h_i(\alpha)=\rho_i\alpha$ を作用させると、台と和の両条件を直接満たす。一般の開被覆でも滑らかな分割の1が存在するので、$\mathcal A_M^{0,q}$ は細層となる。
<!-- definition-example-end -->

「細層なら高次コホモロジーが消える」という結果の中で、分割の1が何をしているかも確かめよう。

<a id="lem-cag1-12-fine-acyclic"></a>

<!-- formal-statement-start -->
> **補題（細層の非巡回性）**  
> $M$ をパラコンパクトHausdorffな滑らかな多様体、$\mathcal F$ をその上の細層とする。このとき

$$
H^q(M,\mathcal F)=0\qquad(q\ge1).
$$

> 特に $M$ 上の滑らかな形式の層 $\mathcal A_M^{0,0}$ と $\mathcal A_M^{0,1}$ は高次層コホモロジーを持たない。
<!-- formal-statement-end -->

### 証明の見取り図

分割の1による自己準同型でČechコサイクルを一段下のコチェインへ戻す。ここで用いる**パラコンパクト空間上のČechコホモロジーと導来関手による層コホモロジーの比較定理**は、一般の層に関する入力として使う。Čechの縮約自体は下で計算する。

<!-- proof-start -->
### 証明（Čech縮約と使用する一般定理）

局所有限開被覆 $\{U_i\}$ を取り、次数 $p\ge1$ のČechコサイクル $c=(c_{i_0\ldots i_p})$ とする。細層性による $h_j$ を使い

$$
b_{i_0\ldots i_{p-1}}
=\sum_j h_j\!\left(c_{j\,i_0\ldots i_{p-1}}\right)
$$

を定める。$h_j$ の台が $U_j$ 内にあるため、$c$ の定義域 $U_j\cap U_{i_0}\cap\cdots$ 上で作用させた切断を $U_{i_0}\cap\cdots$ へ零延長できる。和は局所有限なので切断として定義される。[Čech交代微分](../../AG/AG3-07/index.md#def-ag3-07-cech-complex)を使って計算すると、$\delta c=0$ と $\sum_jh_j=\operatorname{id}$ から

$$
(\delta b)_{i_0\ldots i_p}
=\sum_jh_j(c_{i_0\ldots i_p})
=c_{i_0\ldots i_p}.
$$

従って正次数のČechコサイクルは境界である。同じ縮約は被覆の細分後にも働く。**ここから導来関手の層コホモロジーの消滅へ進む部分**には、パラコンパクトHausdorff空間における適切なČech比較定理を用いる。この一般比較定理自体の証明は本章では扱わず、ここでの唯一の層論的な外部入力とする。従って $H^q(M,\mathcal F)=0$（$q\ge1$）。

滑らかな形式の層については、上の定義例と同じく任意の局所有限被覆に分割の1を掛けて細層の条件を満たすので、同じ消滅が適用される。$\square$
<!-- proof-end -->

ここで**正則関数層 $\mathcal O_M$ 自身は一般に細層でない**。$\rho_i$ は通常正則でないので、正則関数に掛けると正則性が壊れる。このため $H^1(M,\mathcal O_M)$ は非零になり得る。

## 4. Dolbeaultコホモロジーとの同型

[CM2-04で定義したDolbeaultコホモロジー](../../../幾何系/CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)は、曲線の場合、滑らかな $(0,1)$ 形式を $\bar\partial$ で得られるもの同士で同一視した商である。複素次元1では次の写像の終域にさらに次の微分がないため、

$$
H_{\bar\partial}^{0,1}(M)
=\mathcal A_M^{0,1}(M)/
\bar\partial\mathcal A_M^{0,0}(M)
$$

と書ける。これが層コホモロジーの一次群と一致する理由は、局所完全列の**各項の高次コホモロジーが零**という点にある。

<a id="thm-cag1-12-dolbeault-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（曲線上のDolbeault同型）**  
> $M$ をパラコンパクトな複素一次元多様体とする。正則関数層の層コホモロジーと滑らかな形式によるDolbeaultコホモロジーの間には自然な同型

$$
H^1(M,\mathcal O_M)
\ \simeq\ H_{\bar\partial}^{0,1}(M)
$$

> がある。特に $M=C^{\mathrm{an}}$ が滑らかな連結射影曲線の解析化であれば、これらの複素次元はともに $g(C)$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

[Dolbeault解消](#prop-cag1-12-dolbeault-resolution)を大域切断へ移し、[細層の非巡回性](#lem-cag1-12-fine-acyclic)を使う。層の短完全列をそのまま大域切断して右端まで完全と考えるのではなく、一次の障害を商として残す。

<!-- proof-start -->
### 証明

[Dolbeault解消](#prop-cag1-12-dolbeault-resolution)は層の短完全列である。[層コホモロジーの長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)を適用すると

$$
\begin{aligned}
0&\to H^0(M,\mathcal O_M)
\to\mathcal A_M^{0,0}(M)
\xrightarrow{\bar\partial}\mathcal A_M^{0,1}(M)\\
&\xrightarrow{\ \delta\ }H^1(M,\mathcal O_M)
\to H^1(M,\mathcal A_M^{0,0})\to\cdots
\end{aligned}
$$

が得られる。ここで右辺の $\mathcal A_M^{0,q}(M)$ は滑らかな形式の**大域切断**である。[細層の非巡回性](#lem-cag1-12-fine-acyclic)により $H^1(M,\mathcal A_M^{0,0})=0$。従って $\delta$ は全射で、その核は直前の $\bar\partial$ の像だから

$$
H^1(M,\mathcal O_M)
\simeq\operatorname{coker}
\bigl(\bar\partial:\mathcal A_M^{0,0}(M)\to\mathcal A_M^{0,1}(M)\bigr)
=H_{\bar\partial}^{0,1}(M).
$$

最後の等号は[Dolbeaultコホモロジーの定義](../../../幾何系/CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)を複素次元1に適用したもの。曲線が射影的ならさらに[GAGAによる種数比較](#thm-cag1-12-gaga-genus)を合成して

$$
\dim_{\mathbb C}H_{\bar\partial}^{0,1}(M)
=\dim_{\mathbb C}H^1(C,\mathcal O_C)=g(C)
$$

を得る。$\square$
<!-- proof-end -->

なお、複素次元 $n$ の一般の場合も局所完全性と[細層の非巡回性](#lem-cag1-12-fine-acyclic)から $H^q(M,\mathcal O_M)\simeq H_{\bar\partial}^{0,q}(M)$ が従う。ただし本章は**曲線の場合の一次群**を主題とし、一般のHodge分解やSerre双対性を使ってはいない。

### Čech類から一つの形式を作って確かめる

抽象的な同型を一度だけ具体式へ下ろす。開被覆 $\{U_i\}$ において $c_{ij}=-c_{ji}$ が正則関数の一次Čechコサイクルで、$c_{ij}+c_{jk}=c_{ik}$ を満たすとする。分割の1 $\{\rho_j\}$ を取り、各 $U_i$ で

$$
u_i=\sum_j\rho_j c_{ji}
$$

と置く。重なり上で $u_k-u_i=\sum_j\rho_j(c_{jk}-c_{ji})=c_{ik}$ だから、$\bar\partial u_k-\bar\partial u_i=\bar\partial c_{ik}=0$。局所形式 $\bar\partial u_i$ は一つの大域 $(0,1)$ 形式 $\alpha$ に貼り合う。

<a id="prop-cag1-12-cech-dolbeault"></a>

<!-- formal-statement-start -->
> **命題（Čech類からDolbeault類への対応）**  
> $M$ をコンパクトなRiemann面、$\{U_i\}$ を開被覆、$c_{ij}$ を $\mathcal O_M$ の一次Čechコサイクルとする。分割の1を使って上式で定めた局所滑らかな関数 $u_i$ について

$$
\alpha|_{U_i}=\bar\partial u_i
$$

> は大域的なDolbeault類 $[\alpha]$ を与える。この類は $c$ のČechコホモロジー類だけに依存し、分割の1の選択には依存しない。零類となるのは次を満たす正則関数 $h_i$ が存在するとき、かつそのときに限る。

$$
c_{ij}=h_j-h_i\qquad\text{on }U_i\cap U_j.
$$
<!-- formal-statement-end -->

### 証明の見取り図

差 $u_k-u_i=c_{ik}$ が正則なので $\bar\partial u_i$ は貼り合う。もし大域的な原始関数があれば、局所 $u_i$ からそれを引くと正則な補正が残る。この二方向で零類判定を証明する。

<!-- proof-start -->
### 証明

既に $u_k-u_i=c_{ik}$ を計算したから $\alpha$ は大域形式になる。$c_{ij}=h_j-h_i$ であれば

$$
u_i=\sum_j\rho_j(h_i-h_j)
=h_i-\sum_j\rho_jh_j.
$$

各 $\rho_jh_j$ は $\operatorname{supp}\rho_j\subset U_j$ により零延長でき、$H=\sum_j\rho_jh_j$ は大域的な滑らかな関数である。$h_i$ は正則なので $\alpha|_{U_i}=-\bar\partial H|_{U_i}$、従って $[\alpha]=0$。

逆に $[\alpha]=0$ なら滑らかな大域関数 $v$ が $\bar\partial v=\alpha$ を満たす。[正則関数の判定](../../../幾何系/CM/CM2-02/index.md#prop-cm2-02-holomorphic-function)より $h_i=u_i-v|_{U_i}$ は正則で、

$$
h_k-h_i=(u_k-v)-(u_i-v)=c_{ik}.
$$

従って $c$ はČech境界である。分割の1を取り替えても、対応する $u_i'$ と $u_i$ は同じ差 $c_{ik}$ を持つので $u_i'-u_i$ は一つの滑らかな大域関数 $w$ に貼り合う。二つの大域形式の差は $\bar\partial w$ となり、同じDolbeault類を与える。一般の $c$ の境界変更についても第一段の計算を適用すれば同じ類となる。$\square$
<!-- proof-end -->

この計算は、[CM2-04の局所原始関数の貼り合わせ判定](../../../幾何系/CM/CM2-04/index.md#thm-cm2-04-gluing-obstruction)と同じ障害を、**正則な差 $c_{ij}$ と滑らかな $(0,1)$ 形式 $\alpha$** の二通りに表示したものである。

## 5. 平面曲線の次数から種数を計算する

ここから $C=V_+(F)\subset P=\mathbb P^2_{\mathbb C}$ を、次数 $d\ge1$ の斉次多項式 $F$ の零点で定まる**滑らかな整曲線**とする。[AG3-11の制限完全列](../../AG/AG3-11/index.md#prop-ag3-11-restriction)で $m=0$ と置けば

$$
0\longrightarrow\mathcal O_P(-d)
\xrightarrow{\cdot F}\mathcal O_P
\longrightarrow i_*\mathcal O_C\longrightarrow0
$$

である。$i:C\hookrightarrow P$ は閉埋込み。$\mathcal O_P(-d)$ は方程式 $F$ の倍数を表す部分層である。[射影平面のねじり層のコホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)では $H^1(P,\mathcal O_P(t))=0$（全整数 $t$）、$H^2(P,\mathcal O_P)=0$、さらに

$$
H^2(P,\mathcal O_P(-d))^*\simeq S_{d-3},
\qquad S_r=\mathbb C[X,Y,Z]_r,\quad S_r=0\ (r<0)
$$

となる。この「二次群への移動」を通すと、滑らかな曲線の種数が多項式の個数へ戻る。

<a id="prop-cag1-12-plane-genus"></a>

<!-- formal-statement-start -->
> **命題（平面曲線の種数と正則微分形式の比較）**  
> $C=V_+(F)\subset\mathbb P^2_{\mathbb C}$ を次数 $d\ge1$ の滑らかな射影整平面曲線、$M=C^{\mathrm{an}}$ とする。このとき

$$
\begin{aligned}
g(C)&=\dim_{\mathbb C}H^1(M,\mathcal O_M)
=\dim_{\mathbb C}H_{\bar\partial}^{0,1}(M)\\
&=\dim_{\mathbb C}S_{d-3}
=\frac{(d-1)(d-2)}2.
\end{aligned}
$$

> また $(K_C)^{\mathrm{an}}\simeq K_M$ と $K_C\simeq\mathcal O_C(d-3)$ であり、**この平面曲線の場合に限った既習の計算**から

$$
\dim_{\mathbb C}H^0(M,K_M)=g(C)
$$

> も従う。
<!-- formal-statement-end -->

### 証明の見取り図

制限完全列の長完全列から $H^1(C,\mathcal O_C)$ を $P$ の二次群へ移す。後は次数 $d-3$ の斉次単項式の個数を数える。解析側へは[GAGA](#thm-cag1-12-gaga-genus)と[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)で移り、正則微分形式は[随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)で別に数える。

<!-- proof-start -->
### 証明

[層コホモロジーの長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)を制限完全列へ適用する。[射影平面のねじり層の計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から $H^1(P,\mathcal O_P(-d))=H^1(P,\mathcal O_P)=H^2(P,\mathcal O_P)=0$ なので

$$
0\longrightarrow H^1(C,\mathcal O_C)
\longrightarrow H^2(P,\mathcal O_P(-d))
\longrightarrow0
$$

は完全で、中央の矢印は同型である。有限次元の[最高次コホモロジーの完全係数対](../../AG/AG3-10/index.md#prop-ag3-10-top-pairing)を $t=-d$ に適用すると、その双対は $S_{d-3}$ に同型。$d=1,2$ では $d-3<0$ だから次元零、$d\ge3$ では

$$
\dim S_{d-3}
=\#\{(a,b,c)\in\mathbb Z_{\ge0}^3:a+b+c=d-3\}
=\binom{d-1}{2}.
$$

従って全 $d\ge1$ で $\dim S_{d-3}=(d-1)(d-2)/2$ となる。これは[AG3-11の種数公式](../../AG/AG3-11/index.md#cor-ag3-11-plane-genus)の $m=0$ の計算と一致する。

さらに[GAGAによる種数比較](#thm-cag1-12-gaga-genus)と[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)を順に適用して、三つの一次コホモロジーの次元が一致する。

正則微分形式については、滑らかさから[解析的随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)が適用できて

$$
K_M\simeq(\mathcal O_C(d-3))^{\mathrm{an}}.
$$

[GAGA Iの零次比較](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)と[平面曲線上のねじり層の零次計算](../../AG/AG3-11/index.md#thm-ag3-11-curve-cohomology)に $m=d-3$ を代入すると

$$
h^0(M,K_M)
=h^0(C,\mathcal O_C(d-3))
=\dim S_{d-3}-\dim S_{-3}
=\dim S_{d-3}.
$$

これで同じ数を**二つの異なる次数のコホモロジー**から得た。一般のSerre双対性の証明は用いていない。$\square$
<!-- proof-end -->

**次数ごとの実例。**

| $d$ | 具体的な滑らかな曲線 | $S_{d-3}$ の次元 | $g(C)$ | $K_C$ |
|---:|---|---:|---:|---|
| 1 | 直線 | $0$ | $0$ | $\mathcal O_C(-2)$ |
| 2 | 滑らかな二次曲線 | $0$ | $0$ | $\mathcal O_C(-1)$ |
| 3 | $X^3+Y^3+Z^3=0$ | $1$ | $1$ | $\mathcal O_C$ |
| 4 | $X^4+Y^4+Z^4=0$ | $3$ | $3$ | $\mathcal O_C(1)$ |
| 5 | $X^5+Y^5+Z^5=0$ | $6$ | $6$ | $\mathcal O_C(2)$ |

Fermat型 $F=X^d+Y^d+Z^d$ では、$d\ge1$ に対し斉次偏微分が $dX^{d-1},dY^{d-1},dZ^{d-1}$ である。$d=1$ ならそれぞれ定数 $1$、$d\ge2$ なら同時零は $X=Y=Z=0$ だけで射影点ではない。従って表の例はすべて滑らか。特に五次曲線では $S_2$ の基底

$$
X^2,\ Y^2,\ Z^2,\ XY,\ XZ,\ YZ
$$

の六つが正則微分形式の六つの切断に対応する。[制限完全列](../../AG/AG3-11/index.md#prop-ag3-11-restriction)で $m=2$ とすれば $S_{2-5}=S_{-3}=0$ であり、次数2の斉次式は $F$ の倍数で消されない。

**滑らかさを失う場合。** 尖点三次曲線 $Y^2Z=X^3$ では $[0:0:1]$ において偏微分がすべて零になる。射影性は残るので[特異スキームにも適用できるGAGA](../CAG1-08/index.md#thm-cag1-08-projective-equivalence)は成り立つが、解析化はその点でRiemann面ではない。[滑らかな曲線のDolbeault解消](#prop-cag1-12-dolbeault-resolution)の仮定が失われる。制限完全列から $h^1(\mathcal O_C)=1$ は計算できても、それを**滑らかなRiemann面の種数**やその上の $(0,1)$ 形式の次元と無条件に同一視することはできない。

## 6. 演習と詳細解答

各問題で $H^1(C,\mathcal O_C)$ は代数側、$H^1(M,\mathcal O_M)$ は解析側、$H_{\bar\partial}^{0,1}(M)$ は滑らかな形式の商を指す。混同せず、使用する同型を明記する。

### Level A

<a id="ex-cag1-12-a01"></a>
#### CAG1-12-A01 直線と二次曲線の種数
- Level: A

$C_d\subset\mathbb P^2_{\mathbb C}$ を滑らかな次数 $d=1,2$ の整平面曲線、$M_d=C_d^{\mathrm{an}}$ とする。$g(C_d)$ と $\dim H_{\bar\partial}^{0,1}(M_d)$ をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答。** [平面曲線の種数公式](#prop-cag1-12-plane-genus)で $d=1$ を代入すると $(1-1)(1-2)/2=0$、$d=2$ では $(2-1)(2-2)/2=0$。$C_d$ は滑らかで射影的なので、同命題の[GAGA比較](#thm-cag1-12-gaga-genus)と[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)が両方使える。従っていずれも

$$
g(C_d)=\dim H_{\bar\partial}^{0,1}(M_d)=0.
$$

特に $M_d$ 上の任意の滑らかな $(0,1)$ 形式 $\alpha$ は $\bar\partial u=\alpha$ を満たす大域滑らかな $u$ を持つ。これは $\mathcal A^{0,1}(M_d)/\bar\partial\mathcal A^{0,0}(M_d)=0$ の意味である。
<!-- solution-end -->

<a id="ex-cag1-12-a02"></a>
#### CAG1-12-A02 Fermat三次曲線の滑らかさ
- Level: A

$C=V_+(X^3+Y^3+Z^3)\subset\mathbb P^2_{\mathbb C}$ が滑らかであることを偏微分で確かめ、$g(C)$ と $K_C$ を求めよ。

<!-- solution-start -->
**詳細解答。** $F_X=3X^2,F_Y=3Y^2,F_Z=3Z^2$ であり、これらが同時に零なら $X=Y=Z=0$。零ベクトルは射影点を定めないので、[射影Jacobian判定](../../AG/AG1-11/index.md#prop-ag1-11-singular-criterion)から滑らかである。[種数公式](#prop-cag1-12-plane-genus)に $d=3$ を代入すると

$$
g(C)=(3-1)(3-2)/2=1.
$$

[随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)の代数側 $K_C\simeq\mathcal O_C(d-3)$ に $d=3$ を代入すると $K_C\simeq\mathcal O_C$。標準束の自明性だけから**種数1を定義として宣言した**のではなく、$H^1$ を別に計算したことが要点である。
<!-- solution-end -->

<a id="ex-cag1-12-a03"></a>
#### CAG1-12-A03 五次曲線の六つの単項式
- Level: A

$C\subset\mathbb P^2_{\mathbb C}$ を滑らかな次数5の整平面曲線とする。$H^1(C,\mathcal O_C)$ の次元を斉次式の次数から求め、次数2の単項式の基底を列挙せよ。

<!-- solution-start -->
**詳細解答。** [制限完全列による計算](#prop-cag1-12-plane-genus)では $H^1(C,\mathcal O_C)\simeq H^2(\mathbb P^2,\mathcal O(-5))$。後者の双対は $S_{5-3}=S_2$ だから

$$
\dim H^1(C,\mathcal O_C)=\dim S_2
=\binom{2+2}{2}=6.
$$

$a+b+c=2$ を満たす非負整数解は $(2,0,0),(0,2,0),(0,0,2),(1,1,0),(1,0,1),(0,1,1)$。従って $S_2$ の基底は $X^2,Y^2,Z^2,XY,XZ,YZ$。この基底は $H^1$ **そのものの基底ではなく双対側**の基底である。どちらの空間も次元6であることを区別する。
<!-- solution-end -->

<a id="ex-cag1-12-a04"></a>
#### CAG1-12-A04 局所完全性を手で確かめる
- Level: A

複素平面の円板 $D$ で $\alpha=z\,d\bar z$ とする。$\alpha$ の滑らかな局所原始関数を一つ求め、また滑らかな関数 $f$ が $\bar\partial f=0$ なら正則である理由を述べよ。

<!-- solution-start -->
**詳細解答。** $u=z\bar z$ と置く。[Wirtinger微分](../../../幾何系/CM/CM2-02/index.md#thm-cm2-02-local-formula)では $z$ と $\bar z$ を独立変数のように扱うため、

$$
\frac{\partial}{\partial\bar z}(z\bar z)=z,
\qquad \bar\partial u=z\,d\bar z=\alpha
$$

となり、これが局所原始関数である。一方 $\bar\partial f=0$ は $\partial_{\bar z}f=0$ と同値である。$f\in C^\infty(D)$ だから[正則関数の判定](../../../幾何系/CM/CM2-02/index.md#prop-cm2-02-holomorphic-function)を適用して正則と結論できる。両者が[Dolbeault解消](#prop-cag1-12-dolbeault-resolution)の右端・中央の完全性に対応する。
<!-- solution-end -->

<a id="ex-cag1-12-a05"></a>
#### CAG1-12-A05 分割の1と細層
- Level: A

滑らかな多様体 $M$ の二開被覆 $U_0,U_1$ に、$\operatorname{supp}\rho_i\subset U_i$ と $\rho_0+\rho_1=1$ を満たす滑らかな分割の1があるとする。$\mathcal A_M^{0,1}$ の切断 $\alpha$ に $h_i(\alpha)=\rho_i\alpha$ を作用させ、細層の二条件を検算せよ。

<!-- solution-start -->
**詳細解答。** $\rho_i\alpha$ は滑らかな $(0,1)$ 形式で、任意の開集合への制限と乗法が交換するから $h_i$ は層の自己準同型である。$M\setminus U_i$ では $\rho_i=0$、従って $h_i$ は零写像で、その台は $U_i$ に含まれる。また任意の $\alpha$ について

$$
h_0(\alpha)+h_1(\alpha)
=(\rho_0+\rho_1)\alpha=1\cdot\alpha=\alpha.
$$

ゆえに $h_0+h_1=\operatorname{id}$。これは[細層の定義](#def-cag1-12-fine-sheaf)を二開被覆で直接確認したもので、任意の局所有限被覆に対して分割の1が取れる場合も同じ式を用いる。
<!-- solution-end -->

### Level B

<a id="ex-cag1-12-b01"></a>
#### CAG1-12-B01 四次曲線の一次群の由来
- Level: B

$C\subset\mathbb P^2_{\mathbb C}$ を滑らかな四次整曲線とし、$M=C^{\mathrm{an}}$ とする。制限完全列の長完全列から $H^1(C,\mathcal O_C)$ の次元を出し、解析側の二種類の一次群まで対応させよ。

<!-- solution-start -->
**詳細解答。** [制限完全列](../../AG/AG3-11/index.md#prop-ag3-11-restriction)へ $d=4,m=0$ を入れて

$$
0\to\mathcal O_{\mathbb P^2}(-4)
\to\mathcal O_{\mathbb P^2}
\to i_*\mathcal O_C\to0
$$

を得る。[射影平面のねじり層のコホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で両端の一次群と $\mathcal O_{\mathbb P^2}$ の二次群が零だから、[長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)の中央が

$$
H^1(C,\mathcal O_C)
\simeq H^2(\mathbb P^2,\mathcal O(-4))
$$

という同型を与える。[完全係数対](../../AG/AG3-10/index.md#prop-ag3-10-top-pairing)で右辺の双対は $S_1=\operatorname{span}_{\mathbb C}\{X,Y,Z\}$、次元は3。従って

$$
\dim H^1(C,\mathcal O_C)
=\dim H^1(M,\mathcal O_M)
=\dim H_{\bar\partial}^{0,1}(M)=3.
$$

最初の同号は[GAGA](#thm-cag1-12-gaga-genus)、次は[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)により成立する。曲線が滑らか・射影的である仮定を両段で確認した。
<!-- solution-end -->

<a id="ex-cag1-12-b02"></a>
#### CAG1-12-B02 Čech境界と大域原始関数
- Level: B

コンパクトRiemann面 $M$ の開被覆 $\{U_i\}$ 上の正則一次Čechコサイクル $c_{ij}$ が $c_{ij}=h_j-h_i$ と正則関数 $h_i\in\mathcal O_M(U_i)$ で表されるとする。分割の1から $u_i=\sum_j\rho_jc_{ji}$ を作り、$\bar\partial u_i$ が大域的に完全であることを符号を含めて確かめよ。

<!-- solution-start -->
**詳細解答。** $c_{ji}=h_i-h_j$ を代入し、$\sum_j\rho_j=1$ より

$$
\begin{aligned}
u_i&=\sum_j\rho_j(h_i-h_j)
=h_i-\sum_j\rho_jh_j,\\
H&=\sum_j\rho_jh_j,\qquad
\bar\partial u_i=\bar\partial h_i-\bar\partial H=-\bar\partial H.
\end{aligned}
$$

各 $\rho_j$ の台が $U_j$ 内なので、$\rho_jh_j$ は零延長でき $H$ は大域滑らかな関数となる。$\bar\partial h_i=0$ は正則性から従う。従って大域形式は $\alpha=-\bar\partial H$ であり、[Dolbeault商の零類判定](../../../幾何系/CM/CM2-04/index.md#prop-cm2-04-quotient)により $[\alpha]=0$。符号がマイナスになるのは $c_{ji}=h_i-h_j$ の順番による。
<!-- solution-end -->

<a id="ex-cag1-12-b03"></a>
#### CAG1-12-B03 正則微分形式を二つの経路で数える
- Level: B

$C\subset\mathbb P^2_{\mathbb C}$ を滑らかな五次整曲線、$M=C^{\mathrm{an}}$ とする。$h^0(M,K_M)$ と $\dim H_{\bar\partial}^{0,1}(M)$ を**異なる根拠**から求め、一致することを確かめよ。

<!-- solution-start -->
**詳細解答。** まず[解析的随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)に $n=2,d=5$ を入れて $K_M\simeq(\mathcal O_C(5-2-1))^{\mathrm{an}}=(\mathcal O_C(2))^{\mathrm{an}}$。[GAGA Iの零次比較](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)をこの連接層に適用して、$h^0(M,K_M)=h^0(C,\mathcal O_C(2))$ を得る。続いて[AG3-11のねじり層計算](../../AG/AG3-11/index.md#thm-ag3-11-curve-cohomology)に $m=2$ を代入すると

$$
h^0(M,K_M)=\dim S_2-\dim S_{-3}=6-0=6.
$$

一方、[制限完全列による種数計算](#prop-cag1-12-plane-genus)で $H^1(C,\mathcal O_C)^*\simeq S_2$ だから $g(C)=6$。[GAGA](#thm-cag1-12-gaga-genus)と[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)を使い

$$
\dim H_{\bar\partial}^{0,1}(M)=g(C)=6.
$$

同じ6でも前者は標準束の**零次**、後者は構造層の**一次**から得た。一般のSerre双対性を使わず、平面曲線の具体計算で一致を証明した。
<!-- solution-end -->

<a id="ex-cag1-12-b04"></a>
#### CAG1-12-B04 尖点曲線で成立する比較と失う仮定
- Level: B

$C=V_+(Y^2Z-X^3)\subset\mathbb P^2_{\mathbb C}$ とする。$[0:0:1]$ における滑らかさを判定し、次のどちらを使えるか理由を示せ。

1. $H^1(C,\mathcal O_C)\simeq H^1(C^{\mathrm{an}},\mathcal O_{C^{\mathrm{an}}})$。
2. [本章の曲線上のDolbeault同型](#thm-cag1-12-dolbeault-isomorphism)を、その特異点も含む $C^{\mathrm{an}}$ にRiemann面として適用すること。

<!-- solution-start -->
**詳細解答。** $F=Y^2Z-X^3$ の偏微分は

$$
F_X=-3X^2,\qquad F_Y=2YZ,\qquad F_Z=Y^2.
$$

$[0:0:1]$ では $F=F_X=F_Y=F_Z=0$ なので[射影Jacobian判定](../../AG/AG1-11/index.md#prop-ag1-11-singular-criterion)から特異点である。

1. 使える。$C$ は平面内の閉部分スキームで射影的、$\mathcal O_C$ は連接層である。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)は**滑らかさを仮定しない**。
2. この形では使えない。[Dolbeault解消](#prop-cag1-12-dolbeault-resolution)は複素一次元**多様体**の局所正則座標と滑らかな形式の層で作られる。尖点ではその座標が存在しない。したがって層コホモロジーの解析化比較は残っても、滑らかなRiemann面上の $\bar\partial$ 商へ直接置き換える段階が失われる。

なお制限完全列と $\mathbb P^2$ 上の計算自体はこの $F$ にも適用でき、$h^1(C,\mathcal O_C)=\dim S_0=1$。これを特異曲線の正規化の種数と即断してはならない。
<!-- solution-end -->

### Level C

<a id="ex-cag1-12-c01"></a>
#### CAG1-12-C01 三次曲線の二つの一次コホモロジーを結ぶ
- Level: C

$C=V_+(X^3+Y^3+Z^3)\subset\mathbb P^2_{\mathbb C}$、$M=C^{\mathrm{an}}$ とする。以下を一続きの論証として示せ。

1. $C$ の滑らかさと $H^1(C,\mathcal O_C)\simeq\mathbb C$。
2. $H^1(M,\mathcal O_M)\simeq H_{\bar\partial}^{0,1}(M)$ の証明で、局所可解性と細層性がそれぞれどの矢印に必要か。
3. $H_{\bar\partial}^{0,1}(M)$ が一次元であり、すべての滑らかな $(0,1)$ 形式が大域的に $\bar\partial$ 完全である、という主張が偽である理由。

<!-- solution-start -->
**詳細解答。** まず $F_X=3X^2,F_Y=3Y^2,F_Z=3Z^2$ で、同時零点は射影空間にない。従って $C$ は滑らか。[制限完全列](../../AG/AG3-11/index.md#prop-ag3-11-restriction)で $d=3,m=0$ とすると

$$
H^1(C,\mathcal O_C)
\simeq H^2(\mathbb P^2,\mathcal O(-3))
\simeq S_0^*
\simeq\mathbb C.
$$

第二の同型は[射影平面の最高次コホモロジーの対](../../AG/AG3-10/index.md#prop-ag3-10-top-pairing)から従い、$S_0=\mathbb C$ である。

次に[局所bar∂-Poincaré補題](../../../幾何系/CM/CM2-03/index.md#thm-cm2-03-local-dbar-poincare)により、$\mathcal A^{0,0}\to\mathcal A^{0,1}$ が**茎で全射**になる。正則性の判定を合わせると[Dolbeault解消](#prop-cag1-12-dolbeault-resolution)が得られる。対して分割の1は $\mathcal A^{0,0}$ を細層にし、[非巡回性](#lem-cag1-12-fine-acyclic)から $H^1(M,\mathcal A^{0,0})=0$ を与える。これで[長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)の

$$
\mathcal A^{0,0}(M)\xrightarrow{\bar\partial}
\mathcal A^{0,1}(M)\to H^1(M,\mathcal O_M)\to0
$$

が正確となる。$C$ は射影的なので[GAGA](#thm-cag1-12-gaga-genus)から右端は一次元、従って[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)で $H_{\bar\partial}^{0,1}(M)\simeq\mathbb C$。

もしすべての $(0,1)$ 形式が大域的に完全なら、その商 $\mathcal A^{0,1}(M)/\bar\partial\mathcal A^{0,0}(M)$ は零次元になる。しかし今それは一次元と示されたので矛盾する。**局所全射と大域全射の取り違え**が誤りである。
<!-- solution-end -->

<a id="ex-cag1-12-c02"></a>
#### CAG1-12-C02 定理の適用範囲を三つの曲線で判定する
- Level: C

次の三対象を考える。

1. $X=\mathbb A^1_{\mathbb C}$ とその解析化 $\mathbb C$。
2. $C=V_+(X^5+Y^5+Z^5)\subset\mathbb P^2_{\mathbb C}$ と $M=C^{\mathrm{an}}$。
3. $D=V_+(Y^2Z-X^3)\subset\mathbb P^2_{\mathbb C}$ とその解析化。

それぞれについて、射影GAGAの**零次／一次の同型**、滑らかなRiemann面の**Dolbeault解消**、平面曲線の**$h^1$ 計算**のどれが適用できるかを判定せよ。さらに使える場合は一次群の次元を求め、使えない場合は失う仮定と壊れる仕組みを述べよ。

<!-- solution-start -->
**詳細解答。**

1. **アフィン直線。** $X$ は射影的ではない。[アフィン直線の比較の失敗](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)にある通り、代数的大域関数は $\mathbb C[z]$ だが、解析側の正則関数には $e^z$ がある。従って射影GAGAを零次・一次の**定理として**適用することはできない。

   一方、$\mathbb C$ は滑らかな複素一次元多様体なので[Dolbeault解消](#prop-cag1-12-dolbeault-resolution)は使える。代数側は[アフィン消滅](../../AG/AG3-08/index.md#thm-ag3-08-affine-vanishing)、解析側はStein性と[Cartanの定理B](../CAG1-04/index.md#thm-cag1-04-cartan-b)を使う。さらに[Dolbeault同型](#thm-cag1-12-dolbeault-isomorphism)を合成すれば

   $$
   H^1(X,\mathcal O_X)=0,\qquad
   H^1(\mathbb C,\mathcal O_{\mathbb C})=0,\qquad
   H_{\bar\partial}^{0,1}(\mathbb C)=0.
   $$

   一次群の値が偶然一致しても、零次比較は失敗したままである。また $\mathbb C$ は非コンパクトだから平面**射影**曲線の種数公式はそのまま使えない。
2. $C$ は射影的で、偏微分 $5X^4,5Y^4,5Z^4$ が射影点で同時零にならないため滑らか。従って射影GAGAとDolbeault解消の両方が使える。[平面曲線の計算](#prop-cag1-12-plane-genus)は $d=5$ なので $h^1(C,\mathcal O_C)=\dim S_2=6$。よって解析側の層一次群とDolbeault一次群もともに次元6である。
3. $D$ は射影的なので特異であっても[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を零次・一次に適用できる。[制限完全列](../../AG/AG3-11/index.md#prop-ag3-11-restriction)は $F=Y^2Z-X^3$ が非零因子だから成立し、$h^1(D,\mathcal O_D)=\dim S_0=1$。しかし $[0:0:1]$ はJacobianが零であり、解析化はその点で滑らかなRiemann面にならない。ゆえに[本章のDolbeault解消](#prop-cag1-12-dolbeault-resolution)を $D^{\mathrm{an}}$ に直接適用できない。**GAGAの失敗ではなく、滑らかな形式の局所自由な解消を作る仮定の欠落**である。
<!-- solution-end -->

## 7. この先で必要になるもの

この章では、滑らかな射影曲線について

$$
g(C)
=\dim H^1(C,\mathcal O_C)
=\dim H^1(C^{\mathrm{an}},\mathcal O_{C^{\mathrm{an}}})
=\dim H_{\bar\partial}^{0,1}(C^{\mathrm{an}})
$$

を証明し、平面曲線ではその値を $(d-1)(d-2)/2$ と計算した。曲線上の $H^0(K)$ と $H^1(\mathcal O)$ の次元一致は**平面曲線の随伴公式とコホモロジー計算**で確認したもので、一般のSerre双対性を証明したわけではない。また、Dolbeault同型はHodge分解を意味せず、さらに高次元でのHodge数やその対称性を導くには別の理論が必要になる。

次は滑らかな五次三次元超曲面へ進む。局所的な[標準束の解析化比較](../CAG1-11/index.md#thm-cag1-11-canonical-comparison)と本章のコホモロジー比較は引き継げるが、三次元のHodge数には新たな入力が必要となる。
