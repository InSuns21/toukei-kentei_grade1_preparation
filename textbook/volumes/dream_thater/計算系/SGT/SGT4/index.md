# SGT4 スペクトル分割とクラスタリング

[SGT3のCheeger不等式](../SGT3/index.md#thm-sgt3-cheeger)は、固有値が小さいと境界の細い集合が見つかることを保証しました。ただし、conductance は「小さい側の体積」による評価であり、**二つの集団を同時に評価する最適化問題**とは少し違います。グラフを実際にクラスタ分割するなら、切る辺を少なくするだけでなく、両側の規模を考える必要があります。

例えば四頂点の道で端の一頂点を切ると、境界は一辺です。中央で二頂点ずつに切っても境界は一辺です。単に切る辺の数だけでは、この二つを区別できません。本章では、規模の測り方を「頂点数」と「次数の総和」に分け、離散的な分割の最適値を連続ベクトルの変分問題を通して評価します。**緩和問題を解くこと**と**最良の離散分割を復元すること**の違いも、例と定理で明確にします。

以下、$V=\{1,\ldots,n\}$、$n\geq2$ の有限無向グラフを考えます。辺重みは $w_{ij}=w_{ji}\geq0$、$w_{ii}=0$ とし、$d_i=\sum_jw_{ij}>0$ を仮定します。[重み付き次数と体積](../SGT1/index.md#def-sgt1-degree-volume)の記号 $D=\operatorname{diag}(d_1,\ldots,d_n)$、$M=\sum_i d_i$、[組合せLaplacian](../SGT1/index.md#def-sgt1-laplacian) $L=D-W$、[正規化Laplacian](../SGT2/index.md#def-sgt2-normalized) $\mathcal L=D^{-1/2}LD^{-1/2}$ を用います。第1〜5節では必要に応じてグラフが連結であることを仮定し、第6節では非連結の場合も扱います。

## 1. 同じcutでも「均衡」の意味が違う

[Cutの重み](../SGT1/index.md#def-sgt1-cut) $c(S)=w(S,S^c)$ を小さくするだけでは、極小集団を切り離す解が現れ得ます。頂点数 $|S|$ と体積 $\operatorname{vol}(S)=\sum_{i\in S}d_i$ は異なります。次数が一様でないとき、この違いが求めたい最良の分割そのものを変えます。

<a id="def-sgt4-balanced-cuts"></a>

<!-- formal-statement-start -->
> **定義（Ratio Cut と Normalized Cut）**  
> 上記の有限無向非負重み付きグラフで、非空な真部分集合 $S\subsetneq V$ とその補集合 $T=S^c$ を取る。二分割 $\{S,T\}$ の Ratio Cut と Normalized Cut をそれぞれ次で定義する。

$$
\begin{aligned}
\operatorname{Rcut}(S,T)
&=c(S)\left(\frac1{|S|}+\frac1{|T|}\right),\\
\operatorname{Ncut}(S,T)
&=c(S)\left(\frac1{\operatorname{vol}(S)}
+\frac1{\operatorname{vol}(T)}\right).
\end{aligned}
$$

> いずれも二つの集合の交換に関して対称であり、本章では小さい方ほど望ましい分割とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt4-balanced-cuts -->
### 例：四頂点の道で二通りの切り方を比較する

**定義の確認**：全辺重み1の道 $1-2-3-4$ では、次数は $(1,2,2,1)$、総体積は $M=6$ です。端の頂点だけを取る $S=\{1\}$ は $c(S)=1$、頂点数が $1$ と $3$、体積が $1$ と $5$ なので

$$
\operatorname{Rcut}(\{1\},\{2,3,4\})=\frac43,
\qquad
\operatorname{Ncut}(\{1\},\{2,3,4\})=\frac65.
$$

中央で分ける $S=\{1,2\}$ は同じく $c(S)=1$ ですが、頂点数が $2$ と $2$、体積が $3$ と $3$ なので

$$
\operatorname{Rcut}(\{1,2\},\{3,4\})=1,
\qquad
\operatorname{Ncut}(\{1,2\},\{3,4\})=\frac23.
$$

両基準ともこの例では中央分割を選好します。しかし $\operatorname{Rcut}$ は頂点数、$\operatorname{Ncut}$ は次数和を割り当てており、一般には目的関数も最良分割も一致する必要がありません。
<!-- definition-example-end -->

連結グラフでは $c(S)>0$ です。非連結なら成分間のcutは零となり、目的関数も零になり得ます。自己ループを除いたのは、以降のエネルギー表示と次数の定義をこの形で固定するためです。

## 2. 離散分割をベクトルへ置き換える

頂点を二群に割り当てるのは離散的な選択ですが、群ごとに**一定値**を取るベクトルで表せます。集合の変数をベクトルへ置き換えたうえで、二値という制約だけを外すのがスペクトル緩和です。ここでは式を「二値だから成立する部分」と「任意の実ベクトルでも成立する部分」に分けます。

<a id="thm-sgt4-cut-rayleigh"></a>

<!-- formal-statement-start -->
> **定理（二分割のRayleigh商表示）**  
> 第1節のグラフの非空真部分集合 $S$ について、$a=|S|$、$b=|S^c|$、$A=\operatorname{vol}(S)$、$B=\operatorname{vol}(S^c)$ とする。集合の指示ベクトル $\boldsymbol1_S$ と全成分1のベクトル $\boldsymbol1$ を用い、

$$
f=\boldsymbol1_S-\frac an\boldsymbol1,
\qquad
g=\boldsymbol1_S-\frac AM\boldsymbol1
$$

> と置く。$f,g$ は零でなく、以下が成り立つ。

$$
\boldsymbol1^\mathsf Tf=0,\qquad
\boldsymbol1^\mathsf TDg=0,
$$

$$
\operatorname{Rcut}(S,S^c)=\frac{f^\mathsf TLf}{f^\mathsf Tf},
\qquad
\operatorname{Ncut}(S,S^c)=\frac{g^\mathsf TLg}{g^\mathsf TDg}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各ベクトルから平均を引くと、直交制約を満たします。辺をまたぐときだけ値の差が1になるため、分子は[Dirichletエネルギー](../SGT1/index.md#thm-sgt1-dirichlet)によりcut重みです。分母は二側の大きさの積を総量で割った形まで展開します。

<!-- proof-start -->
### 証明

$a+b=n$ なので、$f$ の $S$ 上の値は $1-a/n=b/n$、$S^c$ 上の値は $-a/n$ です。この二値は異なり、$a,b>0$ から $f\ne0$ です。座標和を計算すると

$$
\boldsymbol1^\mathsf Tf
=a\frac bn+b\left(-\frac an\right)
=\frac{ab-ab}{n}=0.
$$

内部の辺では $f_i-f_j=0$、境界の辺では $f_i-f_j=\pm1$ です。[Dirichletエネルギーの辺表示](../SGT1/index.md#thm-sgt1-dirichlet)を $f$ に適用して

$$
f^\mathsf TLf=\sum_{i<j}w_{ij}(f_i-f_j)^2=c(S).
$$

一方、二側に分けて平方和を取れば

$$
\begin{aligned}
f^\mathsf Tf
&=a\left(\frac bn\right)^2+b\left(\frac an\right)^2\\
&=\frac{ab(a+b)}{n^2}
=\frac{ab}{n}.
\end{aligned}
$$

従って比は $c(S)n/(ab)=c(S)(1/a+1/b)$ です。

$g$ でも同じ計算を**次数を重みとする内積**で行います。$g$ の両側での値はそれぞれ $B/M$ と $-A/M$ ですから

$$
\boldsymbol1^\mathsf TDg
=A\frac BM+B\left(-\frac AM\right)=0.
$$

各次数は正で両側とも非空なので $A,B>0$、従って $g\ne0$ です。$g$ の境界での差も $\pm1$ であるため $g^\mathsf TLg=c(S)$ です。分母は

$$
\begin{aligned}
g^\mathsf TDg
&=A\left(\frac BM\right)^2+B\left(\frac AM\right)^2\\
&=\frac{AB(A+B)}{M^2}=\frac{AB}{M}.
\end{aligned}
$$

比を取ると $c(S)M/(AB)=c(S)(1/A+1/B)$ となり、二つの等式が従います。
<!-- proof-end -->

この定理は各cutについての**恒等式**です。固有値について述べているわけではありません。次の緩和では、$f$ や $g$ が「二値である」という条件を捨てるので、選べるベクトルが増え、最小値は小さくなるか等しくなります。

## 3. 固有値による二分割の緩和

ここではグラフが連結であるとします。[Laplacianの核と連結成分](../SGT1/index.md#thm-sgt1-kernel-components)により、組合せLaplacianの零固有値は単純です。また[正規化Laplacianの核](../SGT2/index.md#thm-sgt2-spectrum-kernel)でも零固有値は単純です。

<a id="thm-sgt4-spectral-relaxation"></a>

<!-- formal-statement-start -->
> **定理（二分割目的関数のスペクトル緩和）**  
> $n\geq2$ の連結・有限・無向・非負重み付きグラフで、自己ループがなく各次数が正とする。$L$ の固有値を $0=\lambda_1<\lambda_2\leq\cdots$、$\mathcal L$ の固有値を $0=\mu_1<\mu_2\leq\cdots$ とする。このとき、

$$
\begin{aligned}
\lambda_2
&=\min_{\substack{x\ne0\\\boldsymbol1^\mathsf Tx=0}}
\frac{x^\mathsf TLx}{x^\mathsf Tx}
\leq\min_{\varnothing\ne S\subsetneq V}\operatorname{Rcut}(S,S^c),\\
\mu_2
&=\min_{\substack{x\ne0\\\boldsymbol1^\mathsf TDx=0}}
\frac{x^\mathsf TLx}{x^\mathsf TDx}
\leq\min_{\varnothing\ne S\subsetneq V}\operatorname{Ncut}(S,S^c).
\end{aligned}
$$

> 左側の連続最小値を実現するベクトルには、それぞれ $Lx=\lambda_2x$、$Lx=\mu_2Dx$ を満たすものが存在する。どちらも固有値の重複を許す。
<!-- formal-statement-end -->

### 証明の見取り図

[非正規化Laplacianの変分表示](../SGT1/index.md#prop-sgt1-gap-variational)および[正規化第二固有値の変分表示](../SGT2/index.md#thm-sgt2-rayleigh)が、左側の等号を与えます。その変分問題で許されるベクトルの集合に、前節の各分割指示ベクトルが含まれることを確認します。

<!-- proof-start -->
### 証明

[SGT1の変分表示](../SGT1/index.md#prop-sgt1-gap-variational)を連結グラフの $L$ に適用すると、$\lambda_2$ は $\boldsymbol1^\mathsf Tx=0$ 上のRayleigh商の最小値です。同様に[SGT2の変分表示](../SGT2/index.md#thm-sgt2-rayleigh)で $\mu_2$ は $\boldsymbol1^\mathsf TDx=0$ 上の次数付きRayleigh商の最小値です。グラフが連結で、各次数が正という仮定は、引用した両方の変分表示の条件と一致します。

任意の非空真部分集合 $S$ に対し、[前節のRayleigh商表示](#thm-sgt4-cut-rayleigh)の $f$ は零でなく $\boldsymbol1^\mathsf Tf=0$ を満たします。ゆえに変分式へ $x=f$ を代入すれば

$$
\lambda_2\leq\frac{f^\mathsf TLf}{f^\mathsf Tf}
=\operatorname{Rcut}(S,S^c).
$$

同じ定理の $g$ を正規化側の変分式へ $x=g$ として代入すると

$$
\mu_2\leq\frac{g^\mathsf TLg}{g^\mathsf TDg}
=\operatorname{Ncut}(S,S^c).
$$

有限個の非空真部分集合について最小値を取ることで不等式を得ます。等号の最小ベクトルは、対称行列 $L$ および $\mathcal L$ の固有ベクトルから得られます。正規化側では $y=D^{1/2}x$ と置くと、

$$
\frac{x^\mathsf TLx}{x^\mathsf TDx}
=\frac{y^\mathsf T\mathcal Ly}{y^\mathsf Ty},
\qquad
\boldsymbol1^\mathsf TDx=(D^{1/2}\boldsymbol1)^\mathsf Ty.
$$

$\mathcal Ly=\mu_2y$ を $D^{-1/2}$ で戻せば $Lx=\mu_2Dx$ となります。
<!-- proof-end -->

固有ベクトルの座標は一般に連続的な実数であって、二値ではありません。したがって **$\lambda_2$ と $\mu_2$ は離散最適値の下界であり、必ず離散最適値と等しくなるとは限りません**。この不等号の向きを逆にすると「緩和」の意味を取り違えます。

### 手計算：四頂点の道

無重みの道 $1-2-3-4$ で、関数 $x=(1,1/2,-1/2,-1)^\mathsf T$ を用います。次数 $d=(1,2,2,1)$ に対し

$$
Dx=(1,1,-1,-1)^\mathsf T,\qquad
Lx=(1/2,1/2,-1/2,-1/2)^\mathsf T.
$$

従って $Lx=(1/2)Dx$ です。この例の残る固有値も $Lf=\mu Df$ を解いて検算できます。実際の四つの固有値は $(0,1/2,3/2,2)$ であり、第8節の総合演習で固有ベクトルを一つずつ代入して確認します。中央分割の $\operatorname{Ncut}$ は $2/3$ なので

$$
\mu_2=\frac12<\frac23
=\operatorname{Ncut}(\{1,2\},\{3,4\}).
$$

これは連続緩和の最良値と、実際の分割費用が異なる最小例です。

## 4. 固有ベクトルから頂点の集合を取り出す

固有ベクトル $x$ を得ても、最終出力には整数集合が必要です。そこで値を降順に並べ、境界を一つずつ動かして分割を試します。等しい座標値は同じ側へ入れるようにすると、閾値で定まる分割として一意に扱えます。

<a id="def-sgt4-threshold-partition"></a>

<!-- formal-statement-start -->
> **定義（閾値によるスペクトル二分割）**  
> 上記のグラフの非定数ベクトル $x\in\mathbb R^n$ と実数 $t$ から、次の集合を作る。

$$
S_t=\{i\in V:x_i>t\}.
$$

> この集合が非空の真部分集合となる条件

$$
\varnothing\ne S_t\subsetneq V
$$

> を満たす全ての異なる候補のうち、指定した $\operatorname{Rcut}$ または $\operatorname{Ncut}$ が最小となるものを選ぶ操作を閾値分割とする。同値の候補があれば、事前に固定した頂点順などの規則で一つを選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt4-threshold-partition -->
### 例：四頂点道の第二固有ベクトルを切る

**定義の確認**：先ほどの $x=(1,1/2,-1/2,-1)$ では値はすべて異なります。$1/2\leq t<1$ では $\{1\}$、$-1/2\leq t<1/2$ では $\{1,2\}$、$-1\leq t<-1/2$ では $\{1,2,3\}$ です。Normalized Cut は順に $6/5,2/3,6/5$ なので中央の集合が選ばれます。

$\mu_2=1/2$ は $2/3$ より小さくても、閾値操作そのものの出力はあくまで費用 $2/3$ の分割です。
<!-- definition-example-end -->

<a id="prop-sgt4-threshold-finite"></a>

<!-- formal-statement-start -->
> **命題（有限の閾値候補の完全列挙）**  
> 有限グラフの非定数ベクトル $x$ が取る相異なる値を $r_1>r_2>\cdots>r_q$（$q\geq2$）とする。空集合・全体以外の閾値集合はちょうど

$$
S_j=\{i:x_i\geq r_j\},\qquad 1\leq j<q
$$

> の $q-1$ 個で尽くされる。この候補を全て評価すれば、閾値集合に限定した $\operatorname{Rcut}$ または $\operatorname{Ncut}$ の最小値が求まる。
<!-- formal-statement-end -->

### 証明の見取り図

閾値が相異なる座標値の間を動いても、選ばれる頂点集合は変わりません。ちょうど座標値と一致する位置では厳密不等号に注意します。

<!-- proof-start -->
### 証明

$t$ に対して集合 $S_t=\{i:x_i>t\}$ を考えます。$t\geq r_1$ なら空集合、$t<r_q$ なら全体です。それ以外ならある $j\in\{1,\ldots,q-1\}$ が存在して $r_{j+1}\leq t<r_j$ です。この範囲では $x_i>t$ と $x_i\geq r_j$ が同値なので $S_t=S_j$ です。逆に $t$ を例えば $r_{j+1}$ と選べば $S_t=S_j$ を実現できます。従って $q-1$ 個以外に非自明な候補はなく、有限個の目的関数値を比較すれば最良の閾値候補が存在します。
<!-- proof-end -->

**算法**：$Lx=\lambda_2x$ または $Lx=\mu_2Dx$ の非定数解を取り、座標で整列して各候補のcut重みと両側の頂点数・体積を計算します。第二固有値が重複する場合、選んだ固有ベクトルによって閾値候補が変わる点に注意します。また、全ての部分集合を調べるわけではないので、**全分割中の最適解を得たという保証はありません**。

## 5. Cheeger不等式が保証することと、保証しないこと

Normalized Cut と [conductance](../SGT3/index.md#def-sgt3-conductance)は近いですが同一ではありません。両側の体積の比を追えば関係が分かります。

<a id="prop-sgt4-ncut-conductance"></a>

<!-- formal-statement-start -->
> **命題（Normalized Cut と conductance の比較）**  
> 上記の有限無向非負重み付きグラフの非空真部分集合 $S$ について、$\phi(S)$ を小さい側の体積で正規化したconductanceとする。このとき、

$$
\phi(S)\leq\operatorname{Ncut}(S,S^c)\leq2\phi(S).
$$

> 特に正次数頂点上のグラフが連結なら、第二正規化固有値 $\mu_2$ に対する[SGT3のsweep cut保証](../SGT3/index.md#thm-sgt3-cheeger)で得られる集合 $S$ は

$$
\operatorname{Ncut}(S,S^c)\leq2\sqrt{2\mu_2}
$$

> を満たす。ただし、これは最小Normalized Cutそのものの復元を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

体積が小さい側を $A$、大きい側を $B$ とすれば、両基準の比は $1+A/B$ になります。その後、SGT3のsweepで得た $\phi$ の上界を代入します。

<!-- proof-start -->
### 証明

$A=\min\{\operatorname{vol}(S),\operatorname{vol}(S^c)\}>0$、$B=\max\{\operatorname{vol}(S),\operatorname{vol}(S^c)\}\geq A$、$c=c(S)\geq0$ と置くと、

$$
\begin{aligned}
\operatorname{Ncut}(S,S^c)
&=c\left(\frac1A+\frac1B\right)\\
&=\frac cA\left(1+\frac AB\right)
=\phi(S)\left(1+\frac AB\right).
\end{aligned}
$$

$0<A/B\leq1$ から $1\leq1+A/B\leq2$ であり、第一の評価が従います。さらにグラフが連結であり各次数が正と仮定すると、[Cheeger不等式とsweep cut構成](../SGT3/index.md#thm-sgt3-cheeger)で $\phi(S)\leq\sqrt{2\mu_2}$ となる非空真部分集合を構成できます。第一の評価をこの $S$ に適用して第二の主張が得られます。
<!-- proof-end -->

同じ固有ベクトルを閾値分割して最小Normalized Cutを選べば、前段のsweepで用いた候補も含まれる場合は保証を引き継ぎます。ただしCheegerの保証の構成は重み付き中央値と正負部分を用いるため、**単に元の固有ベクトルの片側だけを試す実装**と混同してはいけません。

## 6. 二分割から $k$ 群へ：行列の列を作る

二群の場合は一本のベクトルのRayleigh商で扱えました。複数群の場合は、群ごとの指示ベクトルを列に並べた行列を用います。重要なのは、異なる群の列が互いに直交するように正規化することです。

<a id="def-sgt4-kway-partition"></a>

<!-- formal-statement-start -->
> **定義（k分割と多群のcut目的関数）**  
> $2\leq k\leq n$ とし、$V=C_1\sqcup\cdots\sqcup C_k$ を空でない互いに素な集合の分割とする。各 $C_r$ の境界重みを $c(C_r)=w(C_r,V\setminus C_r)$ と書く。多群の目的関数は

$$
\operatorname{Rcut}_k=\sum_{r=1}^k\frac{c(C_r)}{|C_r|},
\qquad
\operatorname{Ncut}_k=\sum_{r=1}^k\frac{c(C_r)}{\operatorname{vol}(C_r)}
$$

> とする。各境界辺は、異なる群に属する二つの項で一回ずつ現れる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt4-kway-partition -->
### 例：四頂点道を三群へ分ける

**定義の確認**：$C_1=\{1\}$、$C_2=\{2,3\}$、$C_3=\{4\}$ とすれば境界重みは $1,2,1$、頂点数は $1,2,1$、体積は $1,4,1$ です。従って

$$
\operatorname{Rcut}_3=1+\frac22+1=3,
\qquad
\operatorname{Ncut}_3=1+\frac24+1=\frac52.
$$

全ての群が非空であり、その和集合は確かに全頂点です。
<!-- definition-example-end -->

<a id="thm-sgt4-kway-trace"></a>

<!-- formal-statement-start -->
> **定理（多群cutの行列表示とスペクトル緩和）**  
> 上記の有限無向非負重み付きグラフで各次数を正とし、$2\leq k\leq n$ とする。分割 $C_1,\ldots,C_k$ に対し

$$
H_{\mathrm R}
=\left[\frac{\boldsymbol1_{C_1}}{\sqrt{|C_1|}},
\ldots,\frac{\boldsymbol1_{C_k}}{\sqrt{|C_k|}}\right],
\qquad
H_{\mathrm N}
=\left[\frac{D^{1/2}\boldsymbol1_{C_1}}{\sqrt{\operatorname{vol}(C_1)}},
\ldots,\frac{D^{1/2}\boldsymbol1_{C_k}}{\sqrt{\operatorname{vol}(C_k)}}\right].
$$

> 両行列は $H^\mathsf TH=I_k$ を満たし、

$$
\operatorname{Rcut}_k=\operatorname{tr}(H_{\mathrm R}^\mathsf TLH_{\mathrm R}),
\qquad
\operatorname{Ncut}_k=\operatorname{tr}(H_{\mathrm N}^\mathsf T\mathcal LH_{\mathrm N}).
$$

> 一般に実対称行列 $A$ の固有値を $\alpha_1\leq\cdots\leq\alpha_n$ とすると、

$$
\min_{H\in\mathbb R^{n\times k},\,H^\mathsf TH=I_k}
\operatorname{tr}(H^\mathsf TAH)=\sum_{\ell=1}^k\alpha_\ell.
$$

> 従って多群Ratio Cutの離散最小値は $L$ の最小 $k$ 固有値の和以上、多群Normalized Cutの離散最小値は $\mathcal L$ の最小 $k$ 固有値の和以上である。
<!-- formal-statement-end -->

### 証明の見取り図

列ごとの二次形式が「一群の境界重み÷一群の大きさ」を表すことを示します。連続緩和の最小値には実対称行列の直交固有基底を使い、直交列の重みを小さい固有値へ割り当てると最小になることを証明します。

<!-- proof-start -->
### 証明

まず集合が互いに素なので、$r\ne s$ のとき $\boldsymbol1_{C_r}^\mathsf T\boldsymbol1_{C_s}=0$ です。同じ群では $\boldsymbol1_{C_r}^\mathsf T\boldsymbol1_{C_r}=|C_r|$ です。よって $H_{\mathrm R}^\mathsf TH_{\mathrm R}=I_k$。次数付きの場合も、$r\ne s$ の内積は零、同じ群で $\boldsymbol1_{C_r}^\mathsf TD\boldsymbol1_{C_r}=\operatorname{vol}(C_r)$ だから $H_{\mathrm N}^\mathsf TH_{\mathrm N}=I_k$ です。

[Cutと指示ベクトルのエネルギー](../SGT1/index.md#prop-sgt1-cut-energy)により $\boldsymbol1_{C_r}^\mathsf TL\boldsymbol1_{C_r}=c(C_r)$ です。従って $H_{\mathrm R}$ の $r$ 列を $h_r$ とすると

$$
h_r^\mathsf TLh_r=\frac{c(C_r)}{|C_r|}.
$$

一方、$H_{\mathrm N}$ の $r$ 列を $\widetilde h_r=D^{1/2}\boldsymbol1_{C_r}/\sqrt{\operatorname{vol}(C_r)}$ と置けば、$D^{-1/2}\widetilde h_r=\boldsymbol1_{C_r}/\sqrt{\operatorname{vol}(C_r)}$ なので

$$
\widetilde h_r^\mathsf T\mathcal L\widetilde h_r
=\frac{\boldsymbol1_{C_r}^\mathsf TL\boldsymbol1_{C_r}}
{\operatorname{vol}(C_r)}
=\frac{c(C_r)}{\operatorname{vol}(C_r)}.
$$

$\operatorname{tr}(H^\mathsf TAH)$ は対角成分の和 $\sum_r h_r^\mathsf TAh_r$ なので二つの分割目的関数の行列表示が得られます。

最後に対称行列 $A$ の正規直交固有ベクトルを $u_1,\ldots,u_n$ とします。$H$ の列を $h_1,\ldots,h_k$ と書き、$h_r=\sum_\ell c_{\ell r}u_\ell$ と展開すると

$$
\operatorname{tr}(H^\mathsf TAH)
=\sum_{r=1}^k\sum_{\ell=1}^n\alpha_\ell c_{\ell r}^2
=\sum_{\ell=1}^n\alpha_\ell t_\ell,
\qquad t_\ell=\sum_{r=1}^k c_{\ell r}^2.
$$

直交列の長さの合計から $\sum_\ell t_\ell=k$ です。また $t_\ell=\|H^\mathsf Tu_\ell\|^2\leq\|u_\ell\|^2=1$。後者は、直交列への射影のノルムが元のベクトルのノルムを超えないことから従います。$0\leq t_\ell\leq1$、$\sum_\ell t_\ell=k$ より

$$
\begin{aligned}
\sum_{\ell=1}^n\alpha_\ell t_\ell-\sum_{\ell=1}^k\alpha_\ell
&=\sum_{\ell\leq k}(\alpha_\ell-\alpha_k)(t_\ell-1)
+\sum_{\ell>k}(\alpha_\ell-\alpha_k)t_\ell\\
&\geq0.
\end{aligned}
$$

第一の各積は非正数同士、第二の各積は非負数同士の積です。$H=[u_1,\ldots,u_k]$ とすれば $t_\ell=1$（$\ell\leq k$）、残りは零となり等号を達成します。ゆえに最小値は $\sum_{\ell=1}^k\alpha_\ell$。分割由来の $H$ は全て直交列の候補の一部だから、連続最小値が離散最小値の下界となります。
<!-- proof-end -->

**クラスタリングへの変換**：最小 $k$ 個の固有値に属する直交固有ベクトルを列に並べ、各頂点に対応する行を $\mathbb R^k$ 内の点として見る方法があります。Normalized Cut では $D^{-1/2}$ による戻し方や行の正規化を選択する必要があります。例えば正次数かつちょうど $k$ 個のグラフ上の成分があるときは、適切に選んだ零固有空間の基底で成分ごとに同じ方向の行が得られ、分割費用は零です。しかし連結グラフでは固有空間の回転・近接した固有値・点の丸め方により分割が変わります。行に対する $k$-means などは**追加の離散化算法**であり、[上の多群の固有値和の定理](#thm-sgt4-kway-trace)だけから全分割での最適性は出ません。

## 7. 成功例と失敗機構を切り分ける

**非連結なら厳密な成分分割**：二つの辺 $\{1,2\}$、$\{3,4\}$ だけがある無重みグラフでは、二成分の間に辺がなく、分割 $\{\{1,2\},\{3,4\}\}$ の Ratio Cut と Normalized Cut はともに零です。[核と連結成分の定理](../SGT1/index.md#thm-sgt1-kernel-components)により、$L$ の核は成分指示ベクトルの張る二次元空間です。この例では二群の連続最小値も零であり、成分分割で達成できます。

**連結でも必ず「正しい真の分類」になるわけではない**：三つの葉を持つ星型グラフの中心を頂点1、葉を2,3,4とします。全辺重み1、次数は $(3,1,1,1)$ です。葉一つを切ると $\operatorname{Ncut}=1(1+1/5)=6/5$、葉二つを切ると $2(1/2+1/4)=3/2$、中心のみを切ると $3(1/3+1/3)=2$ です。最適Normalized Cutは葉一つ対残りですが、どの葉を選んでも同じ値です。第二固有値が重複するため、固有空間の一つの向きを特別な「真の群」とする根拠はありません。

**次数零は除外する**：[正次数頂点集合の規約](../SGT2/index.md#def-sgt2-positive-degree)なしに $D^{-1/2}$ を計算すると零除算になります。孤立頂点を追加しても組合せLaplacianのRayleigh商自体は計算できますが、Normalized Cut の体積分母は孤立頂点だけの群で零になります。対象グラフと可行な分割を先に固定しなければ比較できません。

## 8. 演習：定義から緩和・離散化まで

### Level A：目的関数と行列の手計算

#### A1. 道の二つのcut

四頂点単純道 $1-2-3-4$ について、$S=\{1\}$ と $S=\{1,2\}$ それぞれの $\operatorname{Rcut}$ と $\operatorname{Ncut}$ を求めよ。

- Level: A
- ID: SGT4-A1

<!-- solution-start -->
**詳細解答**　次数は $(1,2,2,1)$、総体積 $M=6$ です。どちらも境界は一辺で $c(S)=1$。$S=\{1\}$ の頂点数は1と3、体積は1と5なので

$$
\operatorname{Rcut}=\frac11+\frac13=\frac43,\qquad
\operatorname{Ncut}=\frac11+\frac15=\frac65.
$$

$S=\{1,2\}$ は頂点数2と2、体積3と3だから

$$
\operatorname{Rcut}=\frac12+\frac12=1,\qquad
\operatorname{Ncut}=\frac13+\frac13=\frac23.
$$

単純な境界重みは同じでも目的関数の値は異なります。
<!-- solution-end -->

#### A2. 二値ベクトルの分母

四頂点単純道の $S=\{1,2\}$ について、[Rayleigh商表示](#thm-sgt4-cut-rayleigh)の $f,g$ を書き、二つの分母と分子から Ratio Cut と Normalized Cut を再計算せよ。

- Level: A
- ID: SGT4-A2

<!-- solution-start -->
**詳細解答**　$n=4,a=2$ なので $f=(1/2,1/2,-1/2,-1/2)$ で $\boldsymbol1^\mathsf Tf=0$、$f^\mathsf Tf=4(1/2)^2=1$ です。境界辺 $(2,3)$ でだけ差が1だから $f^\mathsf TLf=1$、従って $\operatorname{Rcut}=1$ です。体積は $A=B=3$、$M=6$ なので $g=f$ ですが、分母は次数付きで

$$
g^\mathsf TDg=1(1/2)^2+2(1/2)^2+2(1/2)^2+1(1/2)^2=\frac32.
$$

分子はやはり1なので $\operatorname{Ncut}=1/(3/2)=2/3$ です。同じ値のベクトルでも、内積の重みが異なります。
<!-- solution-end -->

#### A3. 星型グラフの分割

中心1と葉2,3,4を持つ無重み星型グラフで、$S=\{2\}$ と $S=\{2,3\}$ の Normalized Cut を求めよ。

- Level: A
- ID: SGT4-A3

<!-- solution-start -->
**詳細解答**　次数は $(3,1,1,1)$、総体積は6です。$S=\{2\}$ は体積1、補集合体積5、境界重み1なので $\operatorname{Ncut}=1(1+1/5)=6/5$。$S=\{2,3\}$ は体積2、補集合体積4、二本の葉の辺が境界なので $c(S)=2$ です。従って $\operatorname{Ncut}=2(1/2+1/4)=3/2$ です。葉二つを取る方が頂点数の均衡は増えても、正規化cutは悪化します。
<!-- solution-end -->

#### A4. 閾値を全部列挙する

四頂点単純道で $x=(1,1/2,-1/2,-1)$ を使う。[閾値分割](#def-sgt4-threshold-partition)の非自明な候補を全て挙げ、Normalized Cut を比較せよ。

- Level: A
- ID: SGT4-A4

<!-- solution-start -->
**詳細解答**　相異なる値は $1,1/2,-1/2,-1$ です。[閾値候補の完全列挙](#prop-sgt4-threshold-finite)により、候補は $\{1\}$、$\{1,2\}$、$\{1,2,3\}$ の三つです。最初と最後は、対称性により体積1と5、cut重み1なので $6/5$。中央は体積3と3、cut重み1なので $2/3$。よって最良の閾値候補は $\{1,2\}$ で費用 $2/3$ です。閾値がちょうど $1/2$ のときには $x_i>t$ の規則で頂点2を含まない点に注意します。
<!-- solution-end -->

#### A5. 三群の目的関数

四頂点単純道を $C_1=\{1\}, C_2=\{2,3\}, C_3=\{4\}$ と分割する。$\operatorname{Rcut}_3$ と $\operatorname{Ncut}_3$ を求め、境界辺の二重計上の理由を述べよ。

- Level: A
- ID: SGT4-A5

<!-- solution-start -->
**詳細解答**　$C_1,C_2,C_3$ の境界重みはそれぞれ $(1,2,1)$、頂点数は $(1,2,1)$、体積は $(1,4,1)$ です。[多群cutの定義](#def-sgt4-kway-partition)に代入すると

$$
\operatorname{Rcut}_3=\frac11+\frac22+\frac11=3,\qquad
\operatorname{Ncut}_3=\frac11+\frac24+\frac11=\frac52.
$$

辺 $\{1,2\}$ は群1の外へ出る辺でも群2の外へ出る辺でもあり、境界重みの合計では二回現れます。辺 $\{2,3\}$ は群2内部なので現れません。
<!-- solution-end -->

### Level B：導出と証明を再構成する

#### B1. Ratio Cut のRayleigh商

任意の非空真部分集合 $S$ について、$f=\boldsymbol1_S-|S|\boldsymbol1/n$ の座標和、分子 $f^\mathsf TLf$、分母 $f^\mathsf Tf$ を独立に計算し、$\operatorname{Rcut}$ の表示を証明せよ。

- Level: B
- ID: SGT4-B1

<!-- solution-start -->
**詳細解答**　$a=|S|$、$b=n-a$ とすれば $f$ は $S$ 上で $b/n$、補集合上で $-a/n$ です。よって座標和は $a(b/n)-b(a/n)=0$。差は同じ側で零、異なる側で1なので、[Dirichletエネルギー](../SGT1/index.md#thm-sgt1-dirichlet)から $f^\mathsf TLf=c(S)$。分母は

$$
f^\mathsf Tf=a\frac{b^2}{n^2}+b\frac{a^2}{n^2}
=\frac{ab(a+b)}{n^2}=\frac{ab}{n}.
$$

従って商は $c(S)n/(ab)=c(S)(1/a+1/b)$。$a,b>0$ だから分母は零でなく、[Ratio Cut の定義](#def-sgt4-balanced-cuts)と一致します。
<!-- solution-end -->

#### B2. Normalized Cut と固有値の下界

任意の連結正次数グラフの非空真部分集合 $S$ について、$g=\boldsymbol1_S-\operatorname{vol}(S)\boldsymbol1/M$ が正規化第二固有値の変分制約を満たすことを示し、$\mu_2\leq\operatorname{Ncut}(S,S^c)$ を証明せよ。

- Level: B
- ID: SGT4-B2

<!-- solution-start -->
**詳細解答**　$A=\operatorname{vol}(S)$、$B=M-A$ なので、$g$ は両側で $B/M,-A/M$ です。正次数と非空条件から $A,B>0$ です。次数付き平均は

$$
\sum_i d_ig_i=A\frac BM-B\frac AM=0,
$$

かつ $g\ne0$ です。辺での差は境界でのみ1であり、$g^\mathsf TLg=c(S)$。次数付き二乗和は

$$
g^\mathsf TDg=A\frac{B^2}{M^2}+B\frac{A^2}{M^2}
=\frac{AB}{M}>0.
$$

[正規化第二固有値の変分表示](../SGT2/index.md#thm-sgt2-rayleigh)へこの $g$ を代入すると

$$
\mu_2\leq\frac{c(S)}{AB/M}
=c(S)\left(\frac1A+\frac1B\right)
=\operatorname{Ncut}(S,S^c).
$$

これが全ての $S$ で成立するので、最小Normalized Cutも $\mu_2$ 以上です。
<!-- solution-end -->

#### B3. conductanceとの比較

任意の非空真部分集合について、$\phi(S)\leq\operatorname{Ncut}(S,S^c)\leq2\phi(S)$ を証明し、体積がちょうど半分の場合に上界が等号となることを確かめよ。

- Level: B
- ID: SGT4-B3

<!-- solution-start -->
**詳細解答**　両側の体積の小さい方を $A$、大きい方を $B$ とすると、$0<A\leq B$、$c=c(S)\geq0$ です。[ConductanceとグラフのCheeger定数](../SGT3/index.md#def-sgt3-conductance)から $\phi=c/A$ であり、

$$
\operatorname{Ncut}=c\left(\frac1A+\frac1B\right)
=\phi\left(1+\frac AB\right).
$$

$0<A/B\leq1$ なので係数は1以上2以下です。$A=B$ のとき $\operatorname{Ncut}=2\phi$ となります。特に四頂点単純道の中央分割では $\phi=1/3$、$\operatorname{Ncut}=2/3$ で確かめられます。$c=0$ の場合にも不等式は成立します。
<!-- solution-end -->

#### B4. 多群の直交列と行列の対角和

非空の分割 $V=C_1\sqcup\cdots\sqcup C_k$ の各指示ベクトルから $H_{\mathrm N}$ を作り、$H_{\mathrm N}^\mathsf TH_{\mathrm N}=I_k$ と $\operatorname{tr}(H_{\mathrm N}^\mathsf T\mathcal LH_{\mathrm N})=\operatorname{Ncut}_k$ を証明せよ。

- Level: B
- ID: SGT4-B4

<!-- solution-start -->
**詳細解答**　第 $r$ 列は $h_r=D^{1/2}\boldsymbol1_{C_r}/\sqrt{\operatorname{vol}(C_r)}$ です。$r\ne s$ なら集合が素なので

$$
h_r^\mathsf Th_s
=\frac{\boldsymbol1_{C_r}^\mathsf TD\boldsymbol1_{C_s}}
{\sqrt{\operatorname{vol}(C_r)\operatorname{vol}(C_s)}}=0.
$$

$r=s$ なら分子が $\operatorname{vol}(C_r)$ で内積は1です。従って直交列です。[正規化Laplacianの定義](../SGT2/index.md#def-sgt2-normalized)と[Cutと指示ベクトルのエネルギー](../SGT1/index.md#prop-sgt1-cut-energy)を順に使い、

$$
\begin{aligned}
h_r^\mathsf T\mathcal Lh_r
&=\frac{\boldsymbol1_{C_r}^\mathsf T
D^{1/2}D^{-1/2}LD^{-1/2}D^{1/2}
\boldsymbol1_{C_r}}{\operatorname{vol}(C_r)}\\
&=\frac{\boldsymbol1_{C_r}^\mathsf TL\boldsymbol1_{C_r}}
{\operatorname{vol}(C_r)}
=\frac{c(C_r)}{\operatorname{vol}(C_r)}.
\end{aligned}
$$

$\operatorname{tr}$ はこの対角成分の合計なので、[多群の定義](#def-sgt4-kway-partition)そのものになります。
<!-- solution-end -->

### Level C：分割を列挙し緩和とのギャップを見る

#### C1. 四頂点道の完全比較

四頂点単純道について、(i) 交換を同一視した全ての非空二分割のNormalized Cutを列挙して離散最適値を求めよ。(ii) $\mathcal L$ の固有値が $0,1/2,3/2,2$ であることを確認し、連続緩和値と比較せよ。(iii) $x=(1,1/2,-1/2,-1)$ の閾値分割を実行し、最良の閾値候補が離散最適かを確認せよ。

- Level: C
- ID: SGT4-C1

<!-- solution-start -->
**詳細解答**　交換を同一視するので $1\in S$ を選んで列挙します。次数 $(1,2,2,1)$、$M=6$ と辺重み1から、$S$ と $(\operatorname{vol}(S),c(S),\operatorname{Ncut})$ は次の7通りです。

| $S$ | $\operatorname{vol}(S)$ | $c(S)$ | $\operatorname{Ncut}$ |
|---|---:|---:|---:|
| $\{1\}$ | 1 | 1 | $6/5$ |
| $\{1,2\}$ | 3 | 1 | $2/3$ |
| $\{1,3\}$ | 3 | 3 | $2$ |
| $\{1,4\}$ | 2 | 2 | $3/2$ |
| $\{1,2,3\}$ | 5 | 1 | $6/5$ |
| $\{1,2,4\}$ | 4 | 2 | $3/2$ |
| $\{1,3,4\}$ | 4 | 2 | $3/2$ |

例えば $\{1,3\}$ の境界辺は $\{1,2\},\{2,3\},\{3,4\}$ の三本、体積3と3なので $3(1/3+1/3)=2$ です。従って離散最適値は $2/3$、集合は $\{1,2\}$ とその補集合です。

正規化行列の固有値を検算するには、$Lf=\mu Df$ を解きます。次の四つの独立なベクトルを代入すると

$$
\begin{array}{c|c}
\mu & f\\ \hline
0 &(1,1,1,1)\\
1/2 &(1,1/2,-1/2,-1)\\
3/2 &(1,-1/2,-1/2,1)\\
2 &(1,-1,1,-1)
\end{array}
$$

を得ます。例えば $\mu=3/2$ の場合は $Lf=(3/2,-3/2,-3/2,3/2)$、$Df=(1,-1,-1,1)$ だから $Lf=(3/2)Df$ です。$\mu=1/2$ の場合は $Lf=(1/2,1/2,-1/2,-1/2)$ と $Df=(1,1,-1,-1)$ が対応します。$\mu=2$ は隣接頂点が反対符号なので各頂点で $Lf=2Df$、$\mu=0$ は定数です。固有値が相異なる四本なので全スペクトルを尽くします。

[連続緩和定理](#thm-sgt4-spectral-relaxation)による最小値は $\mu_2=1/2$ であり、離散最適値 $2/3$ より厳密に小さいです。最後に第二固有ベクトルの閾値候補は $\{1\},\{1,2\},\{1,2,3\}$ で、費用は $6/5,2/3,6/5$。従ってこの例では閾値分割は離散最適値 $2/3$ を達成します。ただし、この例で成功したことから一般のグラフでの最適回復は導けません。
<!-- solution-end -->

## 9. どの結果を次に使うか

本章は、二分割の離散目的関数をRayleigh商として**厳密に**表示し、二値制約を外すことで第二固有値を得ました。さらに多群の目的関数を行列の対角和で表し、最小 $k$ 個の固有空間を使う緩和まで導きました。いずれも固有値から自然な候補を構成する方法であって、緩和解から任意の真の群が一意に回復するという主張ではありません。

次のSGT5では、グラフ重みが少し動くと固有空間や、その空間を用いた分割がどこまで安定するかを、固有値の隔たりを条件に調べます。現段階で必要な結論は、**グラフの入力と、固有空間の出力と、離散化後の分割を別々の対象として扱う**ことです。
