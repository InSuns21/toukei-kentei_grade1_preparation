# MMX7 長方形乗算・dual exponentの定義、既知上界と平方の場合の関係、指数の正規化

[MMX6](../MMX6/index.md#thm-mmx6-field-upper-bound) では正方行列積の指数に $9/4$ という上界を得ました。しかし $n\times\sqrt n$ 行列と $\sqrt n\times n$ 行列の積には、正方形への零埋めより安い算法があるかもしれません。本講では三つの辺の増大率を別々に指定し、正方形の結果から移せる評価と長方形固有の結果を区別します。

直接前提：[MMX6](../MMX6/index.md)（その前提である [TSP7](../../TSP/TSP7/index.md)、[TSP14](../../TSP/TSP14/index.md) の結果も使います）。

## 1. 三辺の増大率

体 $F$ 上で $m\times k$ 行列 $A$ と $k\times p$ 行列 $B$ を掛けます。出力は $m\times p$ であり、

$$
C_{ij}=\sum_{h=1}^k A_{ih} B_{hj}.
$$

例えば $(m,k,p)=(4,2,4)$ なら入力はそれぞれ8成分、出力は16成分です。通常の計算は32積を使います。[行列積テンソルの基本上下界](../../TSP/TSP7/index.md#thm-tsp7-matrix-bounds) は16以上32以下を与えます。ここで $m,k,p$ を一緒に大きくするとき、辺の比だけでなく、それぞれが基準サイズの何乗かを指定します。

<a id="def-mmx7-rectangular-exponent"></a>

<!-- formal-statement-start -->
> **定義（長方形行列積指数）**
>
> 体 $F$ と非負実数 $a,b,c$ に対し、$N\ge1$ を実数とし、
>
$$
r_F(N;a,b,c)=R_F(M_{\lceil N^a\rceil,\lceil N^b\rceil,\lceil N^c\rceil})
$$
>
> とする。$R_F$ はテンソル階数、$M_{m,k,p}$ は $m\times k$ と $k\times p$ の行列積テンソルである。長方形行列積指数を
>
$$
w_F(a,b,c)=\inf\{s\in\mathbb R:r_F(N;a,b,c)=O(N^s)\}
$$
>
> とする。定数は体と固定した重み、指数に依存してよいが $N$ に依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx7-rectangular-exponent -->
**定義の確認**

$(a,b,c)=(1,0,1)$ なら内側の辺は常に $\lceil N^0\rceil=1$ です。[行列積テンソルの基本上下界](../../TSP/TSP7/index.md#thm-tsp7-matrix-bounds) の下界と上界がともに $\lceil N\rceil^2$ になるので $r_F(N;1,0,1)=\lceil N\rceil^2$。$N\le\lceil N\rceil\le2N$ より $N^2\le r_F\le4N^2$。$s=2$ は条件を満たし、$s<2$ では $N^{2-s}$ が発散して定数で抑えられません。従って $w_F(1,0,1)=2$ です。
<!-- definition-example-end -->

記号 $M_{m,k,p}$ の定義は [行列積テンソル](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication) を使っています。指数の集合は上に閉じているので、任意の $\epsilon>0$ について $r_F(N)=O(N^{w_F+\epsilon})$ です。下限そのものが集合に属するとは限りません。基準サイズを整数だけに制限しても、実数 $N$ と $\lceil N\rceil$ の比が2以下で、零埋めで階数が単調なので同じ指数になります。

## 2. 重みの正規化と三辺の入れ替え

行列の縦・横・縮約方向は計算手順では異なる役割を持ちます。しかしテンソルとしての積は三つの添字を巡回または逆転できます。基準サイズの取り方による指数の違いも取り除きましょう。

<a id="prop-mmx7-normalization"></a>

<!-- formal-statement-start -->
> **命題（長方形指数の正規化と対称性）**
>
> 任意の体 $F$ と非負重み $a,b,c$ に対し、$w_F$ は三引数の置換で不変であり、各引数について単調非減少である。任意の $t\ge0$ について
>
$$
w_F(ta,tb,tc)=t w_F(a,b,c).
$$
>
> また $w_F(1,1,1)=\omega_F$ である。
<!-- formal-statement-end -->

### 証明の見取り図

三重線形形式の添字を付け替えると同じ個数の単純テンソルで表せます。基準サイズを $N^t$ に変更すれば、演算数の指数も $t$ 倍になります。

<!-- proof-start -->
### 証明

$M_{m,k,p}$ の三重線形形式は

$$
\sum_{i=1}^m\sum_{h=1}^k\sum_{j=1}^p X_{ih}Y_{hj}Z_{ji}.
$$

三脚はそれぞれ添字の組 $(i,h),(h,j),(j,i)$ を持ちます。$i,h,j$ を任意に置換すると三つの組は順序の入れ替えと各組内の転置だけで元の組に対応します。座標の置換と脚の置換はいずれも単純テンソルを単純テンソルへ写し、逆写像も持つため、階数は両方向の不等式から一致します。従って指数も対称です。

ある辺を大きくしたテンソルから、余分な入力成分を零とし余分な出力成分を射影すれば小さい積を得ます。単純テンソルはこの操作で零または単純テンソルに移るので階数は増えません。$N\ge1$ なら重みを増やすと各辺の天井関数も単調であり、指数の単調性が従います。

$t>0$ のとき $Q=N^t$ は $[1,\infty)$ を全て動き、

$$
r_F(N;ta,tb,tc)=r_F(Q;a,b,c).
$$

$O(Q^s)$ と $O(N^{ts})$ は同値です。従って指数の集合が $t$ 倍され、下限も $t$ 倍されます。$t=0$ では三辺とも1、階数1で指数0です。

最後に三辺を同じ整数 $n$ としたときの階数は [正方行列積指数](../../TSP/TSP14/index.md#def-tsp14-omega) の定義そのものです。実数 $N$ と整数の違いは前節の零埋めで吸収できます。
<!-- proof-end -->

例えば $w_F(2,1,2)=2w_F(1,1/2,1)$ です。左辺が4なら右辺の正規化指数は2であって4ではありません。最大の辺を1にする正規化と、二つの等しい辺を1にする正規化は、どの辺を基準にしたかを明記しましょう。

## 3. 正方形の指数から導く上下界

三辺のうち最小の辺を $z$、残りを $x\ge y\ge z$ とします。小さな正方形積をブロックとして並べると長方形の上界が得られます。逆に、長方形積を三つの向きで組み合わせると正方形になるため、正方形の下界も一部引き継げます。

<a id="thm-mmx7-bounds"></a>

<!-- formal-statement-start -->
> **定理（長方形指数の基本上下界）**
>
> 任意の体 $F$、非負重み $a,b,c$ と、その降順の並べ替え $x\ge y\ge z$ に対して
>
$$
\max\{x+y,\omega_F(x+y+z)/3\}
\le w_F(a,b,c)
\le x+y+(\omega_F-2)z.
$$
<!-- formal-statement-end -->

### 証明の見取り図

入力・出力の最大の面の成分数が第一の下界です。第二の下界には三方向の積を使います。上界は二つの長い辺を最短辺で割った数だけ正方積を配置する算法です。

<!-- proof-start -->
### 証明

$m=\lceil N^a\rceil,k=\lceil N^b\rceil,p=\lceil N^c\rceil$ とします。[行列積テンソルの基本上下界](../../TSP/TSP7/index.md#thm-tsp7-matrix-bounds) は

$$
R_F(M_{m,k,p})\ge\max\{mk,kp,pm\}.
$$

各辺は対応する $N$ の冪以上なので右辺は $N^{x+y}$ 以上です。これを $O(N^s)$ で抑えるには $s\ge x+y$ が必要です。

次に [行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product) を二回使うと

$$
M_{m,k,p}\boxtimes M_{k,p,m}\boxtimes M_{p,m,k}
\simeq M_{mkp,mkp,mkp}.
$$

例えば第1添字は $(i_1,i_2,i_3)$ となり、その選択数は $m k p$ です。第2添字は $k p m$、第3添字は $p m k$ で同数です。[長方形指数の正規化と対称性](#prop-mmx7-normalization) の証明の添字置換により三つの階数は同じ $r_F(N;a,b,c)$ です。積の階数は積以下なので正方形の階数は $r_F(N)^3$ 以下です。

[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) の下限表示を整数 $d=mkp\ge2$ に使うと $R_F(M_{d,d,d})\ge d^{\omega_F}$。従って

$$
r_F(N)^3\ge (mkp)^{\omega_F}
\ge N^{\omega_F(a+b+c)}.
$$

全重み0なら階数1なので同じ結論です。三乗根を取って第二の下界を得ます。

上界は対称性により $(a,b,c)=(x,z,y)$ としてよいです。$m=\lceil N^x\rceil,p=\lceil N^y\rceil,k=\lceil N^z\rceil$。行を $k$ 行ずつ、列を $k$ 列ずつ分け、端の不足は零埋めします。出力ブロックごとに $k\times k$ の積を一つ計算します。内側の辺はすでに $k$ なのでブロック間で和を取る必要はありません。ブロック数は

$$
\lceil m/k\rceil\lceil p/k\rceil
\le 9N^{x+y-2z}.
$$

実際 $m/k\le 2N^{x-z}$、さらに天井による1の増分を足しても $3N^{x-z}$ 以下で、$p/k$ も同様に $3N^{y-z}$ 以下です。任意の $\delta>0$ に対し、[正方行列積指数](../../TSP/TSP14/index.md#def-tsp14-omega) から一ブロックは $O(k^{\omega_F+\delta})$ 個の積で計算できます。[テンソル階数と双線形複雑性の一致](../../TSP/TSP7/index.md#thm-tsp7-rank-complexity) により、入力の共有があっても各ブロックの分解を足し合わせて全出力を作ればよいので

$$
r_F(N;x,z,y)
=O(N^{x+y-2z+z(\omega_F+\delta)}).
$$

$\delta\downarrow0$ とすれば上界が従います。$z=0$ では最短辺は1で同じ評価がそのまま使えます。
<!-- proof-end -->

[任意の体上の行列積指数の上界](../MMX6/index.md#thm-mmx6-field-upper-bound) を代入すると

$$
x+y\le w_F(a,b,c)\le x+y+z/4.
$$

例えば $(1,1/2,1)$ では $2\le w_F\le17/8$。これは正方形算法だけから得る評価であり、長方形専用算法のほうが改善できる余地があります。$z=0$ なら上下界が一致して $w_F=x+y$、三辺が同じなら $w_F=x\omega_F$ です。

ここまで階数を使いましたが、同じ指数は全算術演算数でも得られます。任意の $\epsilon>0$ を固定し、十分大きい整数 $B$ で $d_i=\lceil B^{a_i}\rceil$（$a_1=a,a_2=b,a_3=c$）、$r=R_F(M_{d_1,d_2,d_3})\le B^{w_F+\epsilon/2}$ を選べます。固定した分解を $q$ 回再帰すれば三辺 $d_i^q$ の積を計算します。各レベルの線形結合の費用は定数倍の $D^{q-1}$ 以下（$D=\max\{d_1d_2,d_2d_3,d_3d_1\}$）です。基本下界で $D\le r$ なので漸化式 $T_q\le rT_{q-1}+C D^{q-1}$ を展開すると

$$
T_q\le r^q T_0+C\sum_{j=0}^{q-1}r^jD^{q-1-j}
\le r^qT_0+Cqr^{q-1}.
$$

$q=\lceil\log_B N\rceil$ と取れば $d_i^q\ge N^{a_i}$ であり、零埋めできます。$r^q\le B^{w_F+\epsilon/2}N^{w_F+\epsilon/2}$ かつ $q=O(\log N)$ なので全演算数は $O(N^{w_F+\epsilon})$ です。逆向きは [TSP14の回路と階数の比較](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) の二重次数 $(1,1)$ の抽出を各出力成分に適用します。乗算ゲート一つから高々二つの入力依存の積を作る議論には三辺が等しいという仮定がなく、全演算数 $L$ なら階数は高々 $2L$。従って除算なしの形式算術回路でも指数は一致します。

## 4. 二次時間を保てる内側の辺

$(1,\beta,1)$ は出力が $n\times n$ の形です。$\beta$ が小さければ出力成分数とほぼ同じ指数2で計算できる可能性があります。その限界を一つの数で表します。

<a id="def-mmx7-dual-exponent"></a>

<!-- formal-statement-start -->
> **定義（双対行列積指数）**
>
> 体 $F$ に対して、双対行列積指数を
>
$$
\alpha_F=\sup\{\beta\in[0,1]:w_F(1,\beta,1)=2\}
$$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx7-dual-exponent -->
**定義の確認**

$\beta=0$ では [長方形行列積指数](#def-mmx7-rectangular-exponent) の例で指数2を確認したので集合は空ではなく、上界1もあります。仮にある体で $w_F(1,1/3,1)=2$ と証明できれば、[長方形指数の正規化と対称性](#prop-mmx7-normalization) の単調性と [長方形指数の基本上下界](#thm-mmx7-bounds) から $0\le\beta\le1/3$ でも指数2となり、$\alpha_F\ge1/3$ です。この仮定だけで $\alpha_F=1/3$ とはいえません。
<!-- definition-example-end -->

内側の辺をさらに増やすとどうなるでしょう。$0\le u\le v\le1$ について $N^v$ の内側の辺を長さ $\lceil N^u\rceil$ 以下に分割し、出力を足します。分割数は高々 $3N^{v-u}$ で、階数の上界は個々の積の階数の和です。よって

$$
0\le w_F(1,v,1)-w_F(1,u,1)\le v-u.
$$

左側は単調性、右側は $O(N^{w_F(1,u,1)+\epsilon})$ を分割数だけ足し、$\epsilon\downarrow0$ とした結果です。従ってこの関数は連続であり、指数2の範囲は閉区間 $[0,\alpha_F]$ です。ここで指数2は任意の正の余裕を許した二次の指数であって、厳密な $O(N^2)$ の算法を意味しません。

[長方形指数の基本上下界](#thm-mmx7-bounds) に $x=y=1,z=\beta$ を代入すると

$$
\omega_F(2+\beta)/3\le w_F(1,\beta,1).
$$

従って $w_F(1,\beta,1)=2$ なら $\beta\le6/\omega_F-2$。正方形が厳密に $\omega_F=9/4$ であれば $\alpha_F\le2/3$ となります。前講の上界 $\omega_F\le9/4$ だけをこの推論に代入してはいけません。必要なのは正方形の下界です。

## 5. 文献の評価を読む

- [Amanov–van den Berg–Zuiddam, Multiplying matrices via polynomials: exposition and barriers](https://arxiv.org/abs/2610.30054v1) の長方形算法に基づき、2026年11月24日の [The matrix multiplication exponent is nine fourths](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/build/consequences.tex) は $\alpha_F\ge1/2$ を引用し、正方形下界を用いて $\alpha_F\le2/3$ を導いています。下界の移送は本講の三方向の積と同じ機構です。長方形専用算法の証明はここでは再構成していません。
- [2026年9月24日の長方形上界論文](https://github.com/openai/math/tree/main/preprints/Complex-Matrix-Multiplication-Below-2.258-and-Rectangular-Bounds-September-24-2026) は標数0で $\alpha>0.465$ および $w(1,0.709,1)<2.092$ を報告しています。これは正方形上界から単純分割した $2+0.709/4=2.17725$ より小さい値です。
- 11月24日版の正方形下界を仮定すると、$w_F(1,1/2,1)$ の基本下界は $\max\{2,15/8\}=2$ です。上記の専用算法で指数2が得られることと矛盾しません。正方形下界だけで双対指数を厳密に決めることはできません。より強い長方形の公式とその証明依存は後のMMX31で検討します。

## 6. 演習

### Level A

<a id="ex-mmx7-a01"></a>

#### MMX7-A01 三辺と出力
- Level: A
- ID: MMX7-A01

$N=16$、$(a,b,c)=(1,1/2,1)$ とする。入力と出力の形、通常の積数、階数の基本下界を求めよ。

<!-- solution-start -->
##### 詳細解答

$16^{1/2}=4$ なので入力は $16\times4$ と $4\times16$、出力は $16\times16$。256成分に各4積を使い1024積です。[行列積テンソルの基本上下界](../../TSP/TSP7/index.md#thm-tsp7-matrix-bounds) の三面は64、64、256で、最大の256が下界です。
<!-- solution-end -->

<a id="ex-mmx7-a02"></a>

#### MMX7-A02 正規化
- Level: A
- ID: MMX7-A02

$w_F(3,6,6)$ を二つの等しい辺が1となる形で表せ。

<!-- solution-start -->
##### 詳細解答

[長方形指数の正規化と対称性](#prop-mmx7-normalization) によりまず重みを $(6,3,6)$ に置換し、$6(1,1/2,1)$ と書く。従って $w_F(3,6,6)=6w_F(1,1/2,1)$ です。例えば正規化指数が2なら元の指数は12です。
<!-- solution-end -->

<a id="ex-mmx7-a03"></a>

#### MMX7-A03 軸境界
- Level: A
- ID: MMX7-A03

$w_F(0,2,3)$ を求めよ。

<!-- solution-start -->
##### 詳細解答

[長方形指数の基本上下界](#thm-mmx7-bounds) に $x=3,y=2,z=0$ を入れると下界は少なくとも5、上界は $3+2+(\omega_F-2)0=5$。よって5です。実際、辺が1なので通常の積数と最大面の成分数が一致します。
<!-- solution-end -->

<a id="ex-mmx7-a04"></a>

#### MMX7-A04 正方算法を利用した上界
- Level: A
- ID: MMX7-A04

$w_F(2,1,3)$ の、MMX6の上界だけを用いた区間を求めよ。

<!-- solution-start -->
##### 詳細解答

[長方形指数の基本上下界](#thm-mmx7-bounds) で $x=3,y=2,z=1$ とする。[任意の体上の行列積指数の上界](../MMX6/index.md#thm-mmx6-field-upper-bound) を使い $5\le w_F(2,1,3)\le5+(9/4-2)=21/4$。正方形の下界の新結果は仮定していません。
<!-- solution-end -->

### Level B

<a id="ex-mmx7-b01"></a>

#### MMX7-B01 三方向の積
- Level: B
- ID: MMX7-B01

$M_{2,3,5}$ とその二つの巡回置換の積の三辺を求め、正方形指数が $9/4$ なら階数の下界を求めよ。

<!-- solution-start -->
##### 詳細解答

[行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product) により二つの積は $M_{6,15,10}$、さらに $M_{5,2,3}$ を掛けると $M_{30,30,30}$。各テンソルの階数を $r$ とすると正方形の階数は $r^3$ 以下です。[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) と仮定から $r^3\ge30^{9/4}$、従って $r\ge30^{3/4}$。整数なのでこの下界の天井以上です。最大面の下界15もあり、この小さな例では $30^3=27000<15^4=50625$ より15のほうが強いと確認できます。
<!-- solution-end -->

<a id="ex-mmx7-b02"></a>

#### MMX7-B02 内側を分割する
- Level: B
- ID: MMX7-B02

仮に $w_F(1,1/2,1)=2$ とする。$w_F(1,3/4,1)$ の上界を内側の分割から導き、正方算法の上界と比較せよ。

<!-- solution-start -->
##### 詳細解答

内側の辺を $\lceil N^{1/2}\rceil$ ずつ区切ると分割数は高々 $3N^{1/4}$。それぞれの出力は同じ形なので和を取る。各部分の階数は任意の $\epsilon>0$ に対して $O(N^{2+\epsilon})$ であり、和の分解の項数は $O(N^{9/4+\epsilon})$。従って指数は $9/4$ 以下です。一方 [長方形指数の基本上下界](#thm-mmx7-bounds) と [任意の体上の行列積指数の上界](../MMX6/index.md#thm-mmx6-field-upper-bound) から $2+3/16=35/16$ 以下で、$35/16<36/16=9/4$。この場合には正方ブロックの上界のほうが強いです。
<!-- solution-end -->

<a id="ex-mmx7-b03"></a>

#### MMX7-B03 下限と上限の向き
- Level: B
- ID: MMX7-B03

$\omega_F=9/4$ を仮定して $w_F(1,4/5,1)>2$ を示せ。この推論で正方形の上界だけでは不足する理由を述べよ。

<!-- solution-start -->
##### 詳細解答

[長方形指数の基本上下界](#thm-mmx7-bounds) の三方向の積から

$$
w_F(1,4/5,1)\ge (9/4)(2+4/5)/3=21/10>2.
$$

下界式の右辺は $\omega_F$ について増加するので、$\omega_F\le9/4$ だけでは右辺を $21/10$ 以上とできません。例えば $\omega_F=2$ なら右辺は $28/15$ で2未満です。ここでは正方形の下界が必要です。
<!-- solution-end -->

### Level C

<a id="ex-mmx7-c01"></a>

#### MMX7-C01 双対指数と二つの上界
- Level: C
- ID: MMX7-C01

ある体で $\omega_F=9/4$ と $w_F(1,1/2,1)=2$ を仮定する。$\alpha_F$ の区間を求め、$\beta=3/5$ において内側分割と正方ブロックの上界、三方向の積と最大面の下界を比較せよ。指数2かどうか判定できるか。

<!-- solution-start -->
##### 詳細解答

[双対行列積指数](#def-mmx7-dual-exponent) の集合に $1/2$ が含まれるため $\alpha_F\ge1/2$。[長方形指数の基本上下界](#thm-mmx7-bounds) を指数2となる $\beta$ に適用すると

$$
2\ge(9/4)(2+\beta)/3
=3/2+3\beta/4.
$$

両辺から $3/2$ を引いて $4/3$ を掛ければ $\beta\le2/3$。上限を取って $\alpha_F\le2/3$ です。

$\beta=3/5$ では内側の分割数が $O(N^{3/5-1/2})=O(N^{1/10})$ で、仮定の指数2の算法を足すと上界 $2+1/10=21/10$。正方ブロックの上界は

$$
2+(9/4-2)(3/5)=43/20.
$$

$21/10=42/20<43/20$ なので今回は内側分割が有利です。三方向の積の下界は

$$
(9/4)(2+3/5)/3=39/20<2.
$$

最大面の下界は2なので、合わせて $2\le w_F(1,3/5,1)\le21/10$。この区間には2も2より大きな数も含まれます。仮定とここでの評価だけでは指数2かどうかは判定できません。
<!-- solution-end -->

## 7. 次講への接続

長方形の三辺は、テンソルの三脚がそれぞれどの程度の情報を運ぶかを指定する簡単な模型になりました。次講では辺に長さを付けたネットワークで、その情報を運ぶ費用を評価します。長方形の厳密な指数公式を読む際にも、本講の正規化・軸境界・正方極限が検算の基準になります。
