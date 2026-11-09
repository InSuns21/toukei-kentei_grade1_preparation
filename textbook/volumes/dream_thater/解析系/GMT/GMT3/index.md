# GMT3 Riesz energyとcapacity

<!-- definition-example-audit: strict -->

[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)では、Hausdorff次元の大きいコンパクト集合に、どの小球にも質量を集中させすぎない確率測度を作りました。しかし、GMT4でFourier変換を利用し、GMT5以降で射影の方向を平均するには、各球の質量を逐一評価するよりも、**二点が近づくことへの費用を一つの積分で測る**方が便利です。

例えば区間上の一様な測度では、二点の距離が0に近い組は存在しても、その組の割合は小さくなります。一方、点質量では二点が必ず一致します。その違いを「近い二点ほど大きな費用を課す」積分で捉えます。

本章では $d\ge1$、$0<s<d$ とし、$\mathbb R^d$ のEuclid距離を $|x-y|$ と書きます。測度は非負の有限Borel測度、特にコンパクト集合上の確率測度を扱います。積分が発散する場合も排除せず、値は $[0,\infty]$ に取ります。

## 1. 近い二点をどれほど重く数えるか

距離 $r>0$ の二点へ $r^{-s}$ という重みを与えます。$r$ が小さいほど重みが大きく、二点が一致した場合は無限大と約束します。二点の組全体にわたる重みを積分した量が、これから定義するRieszエネルギーです。

<a id="def-gmt3-riesz-energy"></a>

<!-- formal-statement-start -->
> **定義（Riesz energy）**  
> $d\ge1$、$0<s<d$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とする。核 $k_s(x,y)$ を $x\ne y$ で $|x-y|^{-s}$、$x=y$ で $+\infty$ と定め、

$$
I_s(\mu)=\int_{\mathbb R^d}\int_{\mathbb R^d}
k_s(x,y)\,d\mu(y)\,d\mu(x)\in[0,\infty]
$$

> を $\mu$ の $s$ 次Riesz energyと呼ぶ。積分は非負可測関数の拡張実数値積分であり、対角 $\{(x,x)\}$ も含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt3-riesz-energy -->
**定義の確認**

点質量と区間で比較します。

まず点 $a$ へ質量1を置く $\delta_a$ について、二重積分は $(a,a)$ の核を評価するだけなので

$$
I_s(\delta_a)=k_s(a,a)=+\infty.
$$

次に $d=1$、$0<s<1$ とし、$[0,1]$ 上のLebesgue確率測度 $\lambda$ を考えます。対角の二次元Lebesgue測度は0ですが、そこで核が無限大だからといって**積分全体が発散するとは限りません**。対称性と $u=y-x$ の置換によって

$$
\begin{aligned}
I_s(\lambda)
&=2\int_0^1\left(\int_0^y(y-x)^{-s}\,dx\right)dy\\
&=2\int_0^1\left(\int_0^y u^{-s}\,du\right)dy\\
&=\frac{2}{1-s}\int_0^1y^{1-s}\,dy
=\frac{2}{(1-s)(2-s)}<\infty.
\end{aligned}
$$

内側の積分が収束するのは $s<1$ のためです。核が非負なので、対角を除いた領域への[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)と単調極限でこの計算を正当化できます。
<!-- definition-example-end -->

原子のある測度 $\mu$ なら、$\mu(\{a\})=m>0$ となる点 $a$ があり、対角の組 $(a,a)$ が積測度で少なくとも $m^2$ の質量を持ちます。従って任意の $s>0$ で $I_s(\mu)=\infty$ です。ただし「原子がない」ことだけでは有限energyを保証しません。後でCantor測度の臨界指数がその例になります。

## 2. energyを球の質量で書き直す

二重積分の核をそのまま評価するのは難しいため、まず一つの距離を積分に分解します。$a>0$ に対して

$$
a^{-s}=s\int_a^\infty r^{-s-1}\,dr
=s\int_0^\infty r^{-s-1}\boldsymbol{1}_{\{a<r\}}\,dr.
$$

$a=0$ でも右辺・左辺をともに無限大と読むことができます。これは層ケーキ表示の一例です。距離より大きい全ての半径を積分して、核を復元する考え方です。

以下で $B(x,r)$ は開球です。半径 $r$ の球が平均してどれほどの測度を含むかを

$$
F_\mu(r)=\int_{\mathbb R^d}\mu(B(x,r))\,d\mu(x)
$$

と置きます。これは二点を独立に $\mu$ から選んだときに距離が $r$ 未満となる組の質量で、確率測度なら $0\le F_\mu(r)\le1$ です。

<a id="lem-gmt3-layer-cake"></a>

<!-- formal-statement-start -->
> **補題（Riesz energyの球積分表示）**  
> $d\ge1$、$0<s<d$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とし、
> $F_\mu(r)=\int\mu(B(x,r))\,d\mu(x)$ と定める。このとき、両辺が無限大の場合も含めて

$$
I_s(\mu)=s\int_0^\infty r^{-s-1}F_\mu(r)\,dr.
$$
<!-- formal-statement-end -->

### 証明の見取り図

距離の負のべき乗を層ケーキ表示に置き換えると、指示関数 $|x-y|<r$ が現れます。非負性があるため、energyが有限か分からない段階でも[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で積分順序を交換できます。

<!-- proof-start -->
### 証明

$x\ne y$ なら上記の一変数積分から

$$
|x-y|^{-s}
=s\int_0^\infty r^{-s-1}\boldsymbol{1}_{\{|x-y|<r\}}\,dr.
$$

$x=y$ なら指示関数は全ての $r>0$ で1なので、右辺は $s\int_0^\infty r^{-s-1}dr=\infty$ です。ゆえにこの等式は拡張実数値で全ての $(x,y)$ に成り立ちます。被積分関数は非負で可測ですから

$$
\begin{aligned}
I_s(\mu)
&=s\iint\left(\int_0^\infty
r^{-s-1}\boldsymbol{1}_{\{|x-y|<r\}}\,dr\right)d\mu(y)d\mu(x)\\
&=s\int_0^\infty r^{-s-1}
\left(\int\int\boldsymbol{1}_{B(x,r)}(y)\,d\mu(y)d\mu(x)\right)dr\\
&=s\int_0^\infty r^{-s-1}F_\mu(r)\,dr.
\end{aligned}
$$

二段目は[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)です。対角を勝手に取り除いていないため、原子がある場合も等式は成立します。$\square$
<!-- proof-end -->

この補題により、幾何的な球成長条件を積分の収束へ変換できます。逆にenergyが有限なら、平均された球質量 $F_\mu(r)$ は小さくならねばなりません。ただしこれは各中心での一様評価とはまだ異なります。

## 3. Frostman測度は少し低い指数で有限energyを持つ

[GMT2で構成したFrostman測度](../GMT2/index.md#def-gmt2-frostman-measure) は、任意の中心 $x$ と半径 $r$ について $\mu(B(x,r))\le Cr^s$ を満たします。これを $F_\mu(r)$ の積分へ入れれば、原点近くの収束に必要な指数差が見えます。

<a id="thm-gmt3-frostman-energy"></a>

<!-- formal-statement-start -->
> **定理（球成長評価から有限energyへ）**  
> $d\ge1$、$0<t<s\le d$ とし、$\mu$ を $\mathbb R^d$ 上のBorel確率測度とする。ある $C>0$ が存在して、全ての $x\in\mathbb R^d$、$r>0$ について $\mu(B(x,r))\le Cr^s$ と仮定する。このとき、任意の $R>0$ について

$$
I_t(\mu)\le\frac{tC}{s-t}R^{s-t}+R^{-t}<\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

層ケーキの積分を $r=R$ で分けます。小半径ではFrostmanの指数 $s$ が積分を収束させ、大半径では確率測度の全質量1だけを使います。$t<s$ が必要なのは小半径側です。

<!-- proof-start -->
### 証明

確率測度なので $\mu(\mathbb R^d)=1$ です。[球積分表示](#lem-gmt3-layer-cake)の $s$ を $t$ へ置き換え、$F_\mu(r)$ について

$$
F_\mu(r)=\int\mu(B(x,r))\,d\mu(x)
\le\min\{Cr^s,1\}
$$

を使います。従って

$$
\begin{aligned}
I_t(\mu)
&=t\int_0^R r^{-t-1}F_\mu(r)\,dr
+t\int_R^\infty r^{-t-1}F_\mu(r)\,dr\\
&\le tC\int_0^Rr^{s-t-1}\,dr
+t\int_R^\infty r^{-t-1}\,dr\\
&=\frac{tC}{s-t}R^{s-t}+R^{-t}.
\end{aligned}
$$

$s-t>0$ が最初の積分の収束条件、$t>0$ が二番目の収束条件です。$\square$
<!-- proof-end -->

特に $R=1$ なら $I_t(\mu)\le1+tC/(s-t)$ です。**Frostman指数 $s$ と同じ指数での有限性は一般には得られません**。$t=s$ では小半径の評価が $\int_0^1dr/r$ となって発散し得ます。

## 4. 集合が有限energyの測度を支えられるか

測度の選び方を自由にしたとき、ある集合にどれほど小さなenergyの確率測度を置けるでしょうか。これを表すのがRiesz容量です。**大きな容量とは、近接した二点へ質量を過度に集めずに散らして置けること**を意味します。

<a id="def-gmt3-riesz-capacity"></a>

<!-- formal-statement-start -->
> **定義（Riesz capacity）**  
> $d\ge1$、$0<s<d$、$K\subset\mathbb R^d$ を空でないコンパクト集合とする。$\mathcal P(K)$ を $\mu(K)=1$ を満たし $K$ に支えられたBorel確率測度の集合とし、

$$
\operatorname{Cap}_s(K)
=\left(\inf_{\mu\in\mathcal P(K)}I_s(\mu)\right)^{-1}
$$

> を $K$ の $s$ 次Riesz capacityと定める。ここでは $1/\infty=0$ と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt3-riesz-capacity -->
**定義の確認**

一点集合と区間で比較します。

$K=\{a\}$ では $\mathcal P(K)=\{\delta_a\}$ であり、[点質量のenergy](#def-gmt3-riesz-energy)が無限大なので $\operatorname{Cap}_s(\{a\})=0$ です。

$K=[0,1]\subset\mathbb R$、$0<s<1$ ではLebesgue確率測度 $\lambda\in\mathcal P(K)$ を候補に選べます。既に計算した値から

$$
\inf_{\mu\in\mathcal P(K)}I_s(\mu)
\le I_s(\lambda)=\frac{2}{(1-s)(2-s)}
$$

となり

$$
\operatorname{Cap}_s([0,1])\ge
\frac{(1-s)(2-s)}2>0.
$$

この値は容量の**下界**であり、$\lambda$ が最小energyを与えると証明したわけではありません。確率測度を一つ見つけるだけで容量が正と分かる一方、容量0を示すには全ての確率測度を排除する必要があります。
<!-- definition-example-end -->

<a id="prop-gmt3-capacity-rules"></a>

<!-- formal-statement-start -->
> **命題（Riesz capacityの単調性と相似変換）**  
> $d\ge1$、$0<s<d$、空でないコンパクト集合 $K\subset L\subset\mathbb R^d$ とする。さらに $a>0$、$b\in\mathbb R^d$ とする。このとき

$$
\operatorname{Cap}_s(K)\le\operatorname{Cap}_s(L),
\qquad
\operatorname{Cap}_s(aK+b)=a^s\operatorname{Cap}_s(K).
$$

> また、$\operatorname{diam}K=D>0$ なら $0\le\operatorname{Cap}_s(K)\le D^s$ である。一点集合の容量は0である。
<!-- formal-statement-end -->

### 証明の見取り図

単調性は選べる確率測度の集合が増えること、相似変換は核の距離のべき乗が $a^{-s}$ 倍になることから従います。上界には、集合上の二点の距離が直径を超えないことを使います。

<!-- proof-start -->
### 証明

$K\subset L$ なら $\mathcal P(K)\subset\mathcal P(L)$ なので

$$
\inf_{\mathcal P(L)}I_s\le\inf_{\mathcal P(K)}I_s.
$$

両辺の逆数を取り、$1/\infty=0$ の約束を使うと単調性を得ます。

$T(x)=ax+b$ とし、Borel集合 $A$ に $\nu(A)=\mu(T^{-1}(A))$ を与える押し出し測度を $\nu=T_\#\mu$ と書きます。$T$ は $K$ から $aK+b$ への全単射なので、$\mu\mapsto\nu$ は確率測度の集合間の全単射です。積分の置換は、指示関数について定義から成立し、有限単関数へ線形性で、非負可測関数へ単調収束で拡張できます。これを $x,y$ へ順に適用すると、各二点で $|T(x)-T(y)|=a|x-y|$ であることから（対角では両核を無限大と読む）

$$
I_s(T_\#\mu)
=\iint a^{-s}|x-y|^{-s}\,d\mu(x)d\mu(y)
=a^{-s}I_s(\mu).
$$

全ての確率測度にわたる下限を取り、逆数を取れば相似変換則を得ます。$D>0$ なら $x,y\in K$ で $|x-y|\le D$ なので、対角も含めて $k_s(x,y)\ge D^{-s}$。従って任意の $\mu\in\mathcal P(K)$ について $I_s(\mu)\ge D^{-s}$、ゆえに容量は高々 $D^s$ です。$D=0$ のときは一点集合です。$\square$
<!-- proof-end -->

## 5. 有限energyからHausdorff次元へ

有限energyは平均的な近接性の制御であり、全中心に対するFrostman条件そのものではありません。それでも、ポテンシャルが大きすぎない点だけへ測度を制限すれば、次元を測るのに十分な球成長評価が得られます。

<a id="def-gmt3-riesz-potential"></a>

<!-- formal-statement-start -->
> **定義（測度のRieszポテンシャル）**  
> $d\ge1$、$0<s<d$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とする。各 $x\in\mathbb R^d$ に対し

$$
U_s^\mu(x)=\int_{\mathbb R^d}k_s(x,y)\,d\mu(y)\in[0,\infty]
$$

> を $\mu$ の $s$ 次Rieszポテンシャルと呼ぶ。$k_s(x,x)=\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt3-riesz-potential -->
**定義の確認**

点質量 $\delta_a$ については $x\ne a$ で $U_s^{\delta_a}(x)=|x-a|^{-s}$、$x=a$ で無限大です。区間のLebesgue測度 $\lambda$ と $d=1$、$0<s<1$ については内点 $0<x<1$ で

$$
\begin{aligned}
U_s^\lambda(x)
&=\int_0^x(x-y)^{-s}\,dy+\int_x^1(y-x)^{-s}\,dy\\
&=\frac{x^{1-s}+(1-x)^{1-s}}{1-s}<\infty.
\end{aligned}
$$

両例とも定義域の全点について積分値を定めていますが、有限性は測度と点の組合せで異なります。
<!-- definition-example-end -->

<a id="thm-gmt3-energy-dimension"></a>

<!-- formal-statement-start -->
> **定理（有限energyによる次元下界）**  
> $d\ge1$、$0<s<d$、$K\subset\mathbb R^d$ を空でないコンパクト集合とする。$K$ に支えられたBorel確率測度 $\mu$ が $I_s(\mu)<\infty$ を満たすなら

$$
\dim_HK\ge s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$I_s(\mu)=\int U_s^\mu\,d\mu$ が有限であるため、ポテンシャルが有界な点の集合のどれかは正の質量を持ちます。そこへ $\mu$ を制限すると、球がその集合に当たる場合、当たった点を中心に取り直せます。中心の変更による半径の2倍が定量的な鍵です。

<!-- proof-start -->
### 証明

まず[energyの定義](#def-gmt3-riesz-energy)と[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)から

$$
\int U_s^\mu(x)\,d\mu(x)=I_s(\mu)<\infty.
$$

従って $U_s^\mu(x)<\infty$ は $\mu$-ほとんど至る所で成立します。各整数 $n\ge1$ に対して

$$
E_n=\{x\in K:U_s^\mu(x)\le n\}
$$

と置けば、$\mu(\bigcup_n E_n)=1$ なので、ある $n$ について $m=\mu(E_n)>0$ です。核 $k_s$ は下半連続であり、点列 $x_j\to x$ に対する[Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)から $U_s^\mu(x)\le\liminf_jU_s^\mu(x_j)$ です。ゆえに $E_n$ は閉集合で、$K$ のコンパクト性からコンパクトになります。

この $n$ を固定し、$\nu(A)=m^{-1}\mu(A\cap E_n)$ と置きます。$\nu$ は $E_n\subset K$ に支えられたBorel確率測度です。任意の $z\in\mathbb R^d$、$r>0$ について、$E_n\cap B(z,r)$ が空なら $\nu(B(z,r))=0$。空でなければ点 $x\in E_n\cap B(z,r)$ を選びます。三角不等式から

$$
E_n\cap B(z,r)\subset B(x,2r).
$$

$y\in B(x,2r)$ では $k_s(x,y)\ge(2r)^{-s}$ なので

$$
n\ge U_s^\mu(x)
\ge\int_{B(x,2r)}k_s(x,y)\,d\mu(y)
\ge(2r)^{-s}\mu(B(x,2r)).
$$

従って

$$
\nu(B(z,r))
\le m^{-1}\mu(B(x,2r))
\le \frac{2^s n}{m}r^s.
$$

これは全ての中心に対する球成長評価です。[MT8の質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)を適用するには、任意の小集合 $A$ が $E_n$ と交われば $x\in A\cap E_n$ を選び、任意の $\varepsilon>0$ で
$A\subset B(x,\operatorname{diam}A+\varepsilon)$ として外測度の評価へ移ります。$\varepsilon\downarrow0$ により $\nu^*(A)\le(2^sn/m)(\operatorname{diam}A)^s$、従って

$$
\dim_HE_n\ge s,\qquad \dim_HK\ge s.
$$

正質量部分集合へ制限した理由は、元の $\mu$ のポテンシャルが全点で有界とは限らないからです。$\square$
<!-- proof-end -->

この結果と前節を組み合わせると、energyを有限にできる指数の上限がHausdorff次元に一致します。臨界指数での可否は別問題です。

<a id="cor-gmt3-capacity-dimension"></a>

<!-- formal-statement-start -->
> **系（Riesz capacityによるHausdorff次元の特徴付け）**  
> $d\ge1$、$K\subset\mathbb R^d$ を空でないコンパクト集合とする。このとき

$$
\dim_HK
=\sup\{t\in(0,d):\operatorname{Cap}_t(K)>0\},
$$

> ただし右辺の集合が空なら上限を0とする。各 $0<t<d$ について、$\operatorname{Cap}_t(K)>0$ なら $\dim_HK\ge t$ だが、$\dim_HK=t$ だけでは $\operatorname{Cap}_t(K)>0$ は保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

容量が正なら、有限energyの確率測度が少なくとも一つ存在します。次元が $t$ より大きければ、その間に別の指数を選んでFrostman測度を作り、energyを有限にします。

<!-- proof-start -->
### 証明

$\operatorname{Cap}_t(K)>0$ とすると、定義の下限は有限です。もし全ての $\mu\in\mathcal P(K)$ で $I_t(\mu)=\infty$ なら下限も無限大なので、ある $\mu$ は $I_t(\mu)<\infty$ を満たします。[有限energyによる次元下界](#thm-gmt3-energy-dimension)より $\dim_HK\ge t$ です。

逆に $0<t<\dim_HK$、$t<d$ とします。$t<s<\min\{d,\dim_HK\}$ を選べる場合はその $s$ を取ります。$\dim_HK=d$ の場合も $t<s<d$ を選べます。[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)を $K$ と指数 $s$ に適用すると確率測度 $\mu$ と $C>0$ が存在して $\mu(B(x,r))\le Cr^s$ です。[球成長から有限energyへの定理](#thm-gmt3-frostman-energy)で $I_t(\mu)<\infty$ だから $\operatorname{Cap}_t(K)\ge I_t(\mu)^{-1}>0$ です。これで $t<\dim_HK$ の全てが右辺の集合に入り、両側の不等式が従います。$\dim_HK=0$ なら最初の含意で正の容量指数は存在しません。$\square$
<!-- proof-end -->

容量の正値性と次元の関係は、一般に **$t<\dim_HK$ は正容量を保証し、$t>\dim_HK$ は零容量を強制するが、$t=\dim_HK$ は判定不能**、という三分岐です。

## 6. 中三分Cantor測度のenergyはどこで発散するか

[GMT1で定義した中三分Cantor測度](../GMT1/index.md#def-gmt1-cantor-measure)を $\kappa$、その集合を $C$、次元を $\alpha=\log2/\log3$ と置きます。二点 $X,Y$ を積測度 $\kappa\otimes\kappa$ に従って選んだ組として考えれば、$I_t(\kappa)$ は $|X-Y|^{-t}$ を二点の組にわたり積分する計算です。

第 $n$ 段階のCantor区間は $2^n$ 個、各質量 $2^{-n}$ です。二点が初めて異なる枝へ進む段階を $N$ とすると、分岐する段階で距離の大きさが決まります。この分岐段階の確率を合計すれば閾値を計算できます。

<a id="prop-gmt3-cantor-energy"></a>

<!-- formal-statement-start -->
> **命題（中三分Cantor測度のenergy閾値）**  
> $C\subset[0,1]$ を中三分Cantor集合、$\kappa$ を各第 $n$ 段階区間に質量 $2^{-n}$ を与えるCantor確率測度、$\alpha=\log2/\log3$ とする。$0<t<1$ について

$$
I_t(\kappa)<\infty\quad\Longleftrightarrow\quad t<\alpha.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最初の分岐段階 $N$ の確率は等比数列になります。分岐した二点の距離は、親区間の長さとその中の除去区間の長さの間にあるので、energyを二つの幾何級数で挟めます。

<!-- proof-start -->
### 証明

第 $n-1$ 桁まで一致し、第 $n$ 桁が異なる確率は

$$
\mathbb P(N=n)=(1/2)^{n-1}(1/2)=2^{-n}.
$$

$N=n$ なら二点は同じ第 $n-1$ 段階区間の別々の子区間に属します。その間の除去区間の長さは $3^{-n}$、親区間の長さは $3^{-(n-1)}$ なので

$$
3^{-n}\le|X-Y|\le3^{-(n-1)}.
$$

全ての桁で一致する確率は $\lim_{n\to\infty}2^{-n}=0$ で、対角には積測度の質量がありません。従って

$$
3^{-t}\sum_{n=1}^\infty\left(\frac{3^t}{2}\right)^n
\le I_t(\kappa)\le
\sum_{n=1}^\infty\left(\frac{3^t}{2}\right)^n.
$$

右の級数は $3^t/2<1$、つまり $t<\alpha$ のとき収束し、左の級数は $t\ge\alpha$ のとき発散します。$\square$
<!-- proof-end -->

この計算は単なる次元の暗記ではなく、**どのスケールの近接対がエネルギーを発散させるか**を特定しています。さらにLevel Cでは、臨界指数でこの特別な $\kappa$ だけでなく $C$ 上の全確率測度が無限energyを持つことを示します。

## 7. 演習：核・球質量・容量の三つの見方を往復する

### Level A：定義と一段階の計算

<a id="ex-gmt3-a1"></a>

**A1. 対角の無限大と原子**

- Level: A
- 問題: $d\ge1$、$0<s<d$、$\mu$ を非負有限Borel測度とする。$\mu(\{a\})=m>0$ なら $I_s(\mu)=\infty$ を示せ。さらに $\mu=0$ では $I_s(\mu)=0$ となることを確認せよ。

<!-- solution-start -->
**詳細解答**

積測度において $(\mu\otimes\mu)(\{(a,a)\})=\mu(\{a\})^2=m^2>0$ です。[energyの定義](#def-gmt3-riesz-energy)で $k_s(a,a)=\infty$ なので、任意の $M>0$ について $I_s(\mu)\ge M m^2$。$M\to\infty$ で無限大です。零測度なら積測度も零測度で、非負関数の積分は0です。「核が対角で無限大」だけではなく、対角が正の積測度を持つかが分岐点です。
<!-- solution-end -->

<a id="ex-gmt3-a2"></a>

**A2. 区間のenergy**

- Level: A
- 問題: $0<s<1$ とし、$\mathbb R$ の $[0,L]$（$L>0$）上の一様確率測度 $d\mu=L^{-1}\boldsymbol{1}_{[0,L]}dx$ について $I_s(\mu)$ を求めよ。

<!-- solution-start -->
**詳細解答**

対称性から

$$
I_s(\mu)=\frac{2}{L^2}\int_0^L\int_0^y(y-x)^{-s}\,dx\,dy.
$$

内側で $u=y-x$ とすると $x=0$ が $u=y$、$x=y$ が $u=0$ に対応します。従って

$$
\begin{aligned}
I_s(\mu)
&=\frac{2}{L^2}\int_0^L\int_0^y u^{-s}\,du\,dy\\
&=\frac{2}{L^2(1-s)}\int_0^Ly^{1-s}\,dy\\
&=\frac{2L^{-s}}{(1-s)(2-s)}.
\end{aligned}
$$

これは[容量の相似変換則](#prop-gmt3-capacity-rules)の証明で使ったenergyの尺度 $L^{-s}$ と一致します。
<!-- solution-end -->

<a id="ex-gmt3-a3"></a>

**A3. 層ケーキの二つの端**

- Level: A
- 問題: $0<t<s$、$C,R>0$ について $\int_0^Rr^{s-t-1}dr$ と $\int_R^\infty r^{-t-1}dr$ を計算し、$t=s$ で前者が発散する理由を述べよ。

<!-- solution-start -->
**詳細解答**

$s-t>0$ なので $r^{s-t}/(s-t)$ は $r\downarrow0$ で0になり、

$$
\int_0^Rr^{s-t-1}\,dr=\frac{R^{s-t}}{s-t}.
$$

$t>0$ なので $r^{-t}\to0$（$r\to\infty$）より

$$
\int_R^\infty r^{-t-1}\,dr
=\left[-\frac{r^{-t}}t\right]_R^\infty
=\frac{R^{-t}}t.
$$

$t=s$ なら前者の被積分関数は $1/r$ となり $\int_\varepsilon^R dr/r=\log R-\log\varepsilon\to\infty$ です。
<!-- solution-end -->

<a id="ex-gmt3-a4"></a>

**A4. 容量の符号と大小**

- Level: A
- 問題: $d=1$、$0<s<1$、$K=[0,1]$、$L=[0,2]$ とする。$\operatorname{Cap}_s(K)>0$ を示し、$\operatorname{Cap}_s(L)=2^s\operatorname{Cap}_s(K)$ と $\operatorname{Cap}_s(K)\le1$ を証明せよ。最小energy測度の存在は仮定しない。

<!-- solution-start -->
**詳細解答**

一様確率測度の[energy計算](#def-gmt3-riesz-energy)から

$$
\operatorname{Cap}_s(K)\ge\frac{(1-s)(2-s)}2>0.
$$

$L=2K$ なので[相似変換則](#prop-gmt3-capacity-rules)で $\operatorname{Cap}_s(L)=2^s\operatorname{Cap}_s(K)$。$K$ の直径は1ですから、任意の $\mu\in\mathcal P(K)$ について $|x-y|^{-s}\ge1$（対角も拡張実数で成り立つ）です。従って $I_s(\mu)\ge1$、下限の逆数は高々1になります。
<!-- solution-end -->

<a id="ex-gmt3-a5"></a>

**A5. ポテンシャルから球質量を抑える**

- Level: A
- 問題: $d\ge1$、$0<s<d$、$\mu$ を非負有限Borel測度、$x\in\mathbb R^d$ とする。$U_s^\mu(x)\le M<\infty$ なら、全ての $r>0$ で $\mu(B(x,r))\le Mr^s$ を示せ。

<!-- solution-start -->
**詳細解答**

$y\in B(x,r)$ では $|x-y|<r$ なので、対角も含め $k_s(x,y)\ge r^{-s}$ です。よって

$$
M\ge U_s^\mu(x)
\ge\int_{B(x,r)}k_s(x,y)\,d\mu(y)
\ge r^{-s}\mu(B(x,r)).
$$

両辺に $r^s$ を掛ければ結論です。ただしこれは中心 $x$ の評価であり、他の中心へ直接適用することはできません。
<!-- solution-end -->

### Level B：定理を別の設定に移す

<a id="ex-gmt3-b1"></a>

**B1. 局所的球成長だけからenergyを評価する**

- Level: B
- 問題: $d\ge1$、$0<t<s<d$、$\mu$ を $\mathbb R^d$ 上のBorel確率測度とし、$0<r\le r_0$ で全ての中心について $\mu(B(x,r))\le Cr^s$ が成立するとする（$r_0,C>0$）。$r>r_0$ には球成長を仮定しない。このとき $I_t(\mu)\le tCr_0^{s-t}/(s-t)+r_0^{-t}$ を示せ。

<!-- solution-start -->
**詳細解答**

[球積分表示](#lem-gmt3-layer-cake)の指数を $t$ とすると

$$
I_t(\mu)=t\int_0^{r_0}r^{-t-1}F_\mu(r)\,dr+
t\int_{r_0}^\infty r^{-t-1}F_\mu(r)\,dr.
$$

最初は $\mu(B(x,r))\le Cr^s$ を $\mu(x)$ で積分し $F_\mu(r)\le Cr^s$ とします。後半は $\mu$ の全質量1から $F_\mu(r)\le1$ が成り立ちます。従って

$$
I_t(\mu)\le tC\int_0^{r_0}r^{s-t-1}dr+
t\int_{r_0}^\infty r^{-t-1}dr
=\frac{tC}{s-t}r_0^{s-t}+r_0^{-t}.
$$

大きな半径については確率測度の有限性だけで十分であり、小さな半径での $s>t$ が本質です。
<!-- solution-end -->

<a id="ex-gmt3-b2"></a>

**B2. 有限energyは元の測度の一様球成長を意味しない**

- Level: B
- 問題: $0<s<1$ とする。$\mathbb R$ 上の確率測度 $d\mu(x)=c_\beta x^{-\beta}\boldsymbol{1}_{(0,1)}(x)\,dx$、$c_\beta=1-\beta$ を考える。$1-s<\beta<1-s/2$ から一つ選び、$I_s(\mu)<\infty$ だが、指数 $s$ のFrostman球成長評価は $\mu$ 自身には成立しないことを示せ。

<!-- solution-start -->
**詳細解答**

まず $\int_0^1(1-\beta)x^{-\beta}dx=1$ で確率測度です。対角を除いて対称性を使い、$0<x<y<1$ で $x=yu$ と置くと

$$
\begin{aligned}
I_s(\mu)
&=2(1-\beta)^2\int_0^1y^{-\beta}
\left(\int_0^y x^{-\beta}(y-x)^{-s}dx\right)dy\\
&=2(1-\beta)^2\left(\int_0^1u^{-\beta}(1-u)^{-s}du\right)
\left(\int_0^1y^{1-2\beta-s}dy\right).
\end{aligned}
$$

$\beta<1$ と $s<1$ により $u=0,1$ の積分は収束します。また $1-2\beta-s>-1$ は $\beta<(2-s)/2$ と同値で、外側の積分も有限です。一方、原点中心の球では $0<r<1$ に対して

$$
\mu(B(0,r))=(1-\beta)\int_0^r x^{-\beta}dx=r^{1-\beta}.
$$

仮定した $1-s<\beta<1-s/2$ は $\beta<1$ と上のenergy収束条件をともに満たします。その一方、$\beta>1-s$ なので $r^{1-\beta}/r^s=r^{1-\beta-s}\to\infty$ です。全中心一様な指数 $s$ のFrostman条件は失敗します。有限energyでも、ポテンシャルの大きい点を切り落とす操作が必要なのです。
<!-- solution-end -->

<a id="ex-gmt3-b3"></a>

**B3. 次元から容量の正値性まで**

- Level: B
- 問題: 空でないコンパクト集合 $K\subset\mathbb R^d$ が $\dim_HK=h>0$ を満たすとする。$0<t<h$、$t<d$ を固定し、$t<s<\min\{h,d\}$ を一つ選べるとき、正の数としての $\operatorname{Cap}_t(K)$ の下界をFrostman定数 $C$ で書け。$h=d$ の場合も説明せよ。

<!-- solution-start -->
**詳細解答**

[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)を指数 $s$ と $K$ に適用できるのは $s<h$ だからです。得られた確率測度 $\mu$ は全中心で $\mu(B(x,r))\le Cr^s$ を満たします。[energy上界](#thm-gmt3-frostman-energy)で $R=1$ とすれば

$$
I_t(\mu)\le1+\frac{tC}{s-t}.
$$

容量の定義で下限は $I_t(\mu)$ 以下ですから

$$
\operatorname{Cap}_t(K)
\ge\left(1+\frac{tC}{s-t}\right)^{-1}>0.
$$

$h=d$ のときも $t<s<d=h$ を選べます。端点 $s=h$ のFrostman測度があるとは仮定していません。
<!-- solution-end -->

### Level C：臨界指数で全ての測度を調べる

<a id="ex-gmt3-c1"></a>

**C1. Cantor集合の臨界容量は0**

- Level: C
- 問題: $C$ を中三分Cantor集合、$\alpha=\log2/\log3$ とする。任意のBorel確率測度 $\mu\in\mathcal P(C)$ について $I_\alpha(\mu)=\infty$ を示せ。ヒント：第 $n$ 段階の区間 $C_{n,j}$（$j=1,\ldots,2^n$）へ置く質量の二乗和は[Cauchy--Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により $2^{-n}$ 以上である。さらに、$0<t<1$ での $\operatorname{Cap}_t(C)$ の正値・零値を分類せよ。

<!-- solution-start -->
**詳細解答**

第 $n$ 段階の $2^n$ 個の区間は互いに素で $C$ を覆います。$p_{n,j}=\mu(C_{n,j})$ と置くと $\sum_jp_{n,j}=1$ です。[Cauchy--Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
1=\left(\sum_{j=1}^{2^n}p_{n,j}\right)^2
\le2^n\sum_{j=1}^{2^n}p_{n,j}^2,
\qquad
\sum_{j=1}^{2^n}p_{n,j}^2\ge2^{-n}.
$$

二点が同一の第 $n$ 段階区間へ入れば距離は高々 $3^{-n}$ です。従って球積分で用いる

$$
F_\mu(r)=(\mu\otimes\mu)\{(x,y):|x-y|<r\}
$$

について、$r>3^{-n}$ のとき

$$
F_\mu(r)\ge\sum_{j=1}^{2^n}p_{n,j}^2\ge2^{-n}.
$$

[球積分表示](#lem-gmt3-layer-cake)を互いに重ならない半径帯 $(3^{-n},3^{-(n-1)})$ で下から評価すると、$t>0$ に対して

$$
\begin{aligned}
I_t(\mu)
&\ge t\sum_{n=1}^\infty 2^{-n}
\int_{3^{-n}}^{3^{-(n-1)}}r^{-t-1}\,dr\\
&=(1-3^{-t})\sum_{n=1}^\infty
\left(\frac{3^t}{2}\right)^n.
\end{aligned}
$$

$t=\alpha$ なら $3^\alpha=2$ なので各項は1、和は発散します。$t>\alpha$ でも発散します。これは任意の $\mu\in\mathcal P(C)$ について成り立つため、容量の定義で $\operatorname{Cap}_t(C)=0$（$\alpha\le t<1$）です。

逆に $0<t<\alpha$ なら[Cantor測度のenergy閾値](#prop-gmt3-cantor-energy)から $I_t(\kappa)<\infty$。従って $\operatorname{Cap}_t(C)\ge I_t(\kappa)^{-1}>0$ です。結論は

$$
\operatorname{Cap}_t(C)>0\ \Longleftrightarrow\ 0<t<\alpha,
\qquad
\operatorname{Cap}_\alpha(C)=0.
$$

次元 $\dim_HC=\alpha$（[MT8のCantor次元定理](../../MT/MT8/index.md#thm-mt8-cantor-dimension)）と、臨界容量が正かどうかは別問題であることが具体的に分かります。
<!-- solution-end -->

## 8. まとめと次の講義

- Riesz energyは二点間距離の負べき乗の平均で、対角を含む拡張実数値積分です。
- 層ケーキ表示により球質量からenergyを評価でき、指数 $s$ のFrostman測度は全ての $t<s$ で有限energyを持ちます。
- 正のcapacityとは有限energyの確率測度が存在することです。逆に有限energyからは、ポテンシャルの有界な部分へ測度を制限してHausdorff次元の下界を得ます。
- 中三分Cantor測度は $t<\alpha$ で有限、$t\ge\alpha$ で無限energyです。集合自体の臨界容量も0であることを演習で確かめました。

次のGMT4では、energyをFourier変換の二乗積分として表します。そこでは核のFourier変換と正則化・極限交換を、今回のenergy定義と正確につなぐ必要があります。
