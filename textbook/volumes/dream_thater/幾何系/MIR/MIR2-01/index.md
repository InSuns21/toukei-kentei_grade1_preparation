# MIR2-01 複素化KählerパラメータとA側の幾何

<!-- definition-example-audit: strict -->

## 1. B側の級数をA側のどの変数と比べるか

前講の[周期で規格化したB側Yukawa結合](../MIR1-16/index.md#def-mir1-16-normalized-yukawa)は、鏡像座標 $q_B=z+770z^2+\cdots$ の関数として計算できた。しかしB側の局所級数だけでは、次数 $d$ の曲線をどう重み付けするかも、A側の曲線計数と等しいかどうかも分からない。

一方、[GW1のNovikov完備化](../../GW/GW1-16/index.md#def-gw1-16-novikov)は、曲線類を形式的な記号 $Q^\beta$ で記録した。この道具には、まだ具体的な複素数を代入していない。ここで両者をつなぐ準備として、quintic上の曲線の次数から「形式的な計数の変数」と「複素化された面積から作る指数重み」を整理する。**本講ではミラー定理を仮定せず、A側とB側の等式は主張しない。**

以下、$X\subset\mathbb P^4_{\mathbb C}$ は滑らかで連結な次数5の超曲面、$H=c_1(\mathcal O_X(1))\in H^2(X;\mathbb Z)$ とする。曲線の次数は常に $H$ とのペアリングで測り、$B$ 場はB**側**の正則3形式とは区別する。

## 2. 曲線類の次数と、Kähler形式で測った面積

前提の[弱Lefschetz定理](../../CYG/CYG1-08/index.md#thm-cyg1-08-weak-lefschetz)は $H^2(X;\mathbb Z)=\mathbb Z H$ を与える。さらに標的の超平面類の交点数は、[quinticのKähler錐の計算](../../CYG/CYG1-13/index.md#prop-cyg1-13-kahler-ray)で確かめたとおり

$$
\int_X H^3=5,\qquad \mathcal K_X=\{aH:a>0\}.
$$

前者は**三つの超平面との交叉**であって、一本の曲線の面積を5と決める式ではない。曲線 $C$ は実2次元なので、$C$ 上で積分するのは二次類 $H$ である。

<a id="def-mir2-01-curve-degree"></a>

<!-- formal-statement-start -->
> **定義（quintic上の曲線の超平面次数）**
>
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$ とする。種数0の連結な安定正則写像 $f:C\to X$ の像の重複を含む整数ホモロジー類を $\beta=f_*[C]\in H_2(X;\mathbb Z)$ とする。この写像の**超平面次数**を

$$
d=\langle H,\beta\rangle=\int_C f^*H
$$

> と定義する。ここで $[C]$ は節点曲線の各既約成分の基本類の和である。$d$ は像集合の次数と必ずしも一致せず、多重被覆の重複度を含む。
<!-- formal-statement-end -->

定義で使った積分は、各既約成分の正規化で計算できる。[GW1の安定写像](../../GW/GW1-08/index.md#def-gw1-08-stable-map)では、節点の有無によらず曲線類を成分ごとに足す。線束 $\mathcal O_X(1)$ の引戻しの次数が右辺の整数であり、これが抽象的なホモロジーのペアリングを**実際に数える方法**である。

<!-- definition-example-start: def-mir2-01-curve-degree -->

**定義の確認（Fermat五次の直線とその被覆）。** $X_0$ を $x_0^5+\cdots+x_4^5=0$ とする。$\zeta^5=\eta^5=-1$ を満たす複素数を選ぶと

$$
L=\{[\zeta s:s:\eta t:t:0]:[s:t]\in\mathbb P^1\}
$$

は $X_0$ に含まれる。実際、方程式へ代入すると $(\zeta^5+1)s^5+(\eta^5+1)t^5=0$。二つの独立な座標方向のため、この写像は射影直線への埋め込みである。超平面 $x_1=0$ は $L$ 上で $s=0$ を一回切るので $\int_LH=1$。

任意の整数 $d\ge1$ に対し

$$
f_d([u:v])=[\zeta u^d:u^d:\eta v^d:v^d:0]
$$

を取る。$u^d,v^d$ が同時には零にならず、$f_d$ は次数 $d$ の写像である。超平面の引戻しは $\mathcal O_{\mathbb P^1}(d)$、従って

$$
\langle H,(f_d)_*[\mathbb P^1]\rangle
=\int_{\mathbb P^1}c_1(\mathcal O(d))=d.
$$

$d=2$ でも**像は同じ直線 $L$** だが、写像の曲線類は $2[L]$ となる。曲線の像を二本数えたことにはならない。

<!-- definition-example-end -->

次に曲線類への面積の割当てを確かめる。$X$ のKähler形式 $\omega$ を、前提で使った規格化

$$
\frac{[\omega]}{2\pi}=vH,\qquad v>0
$$

で選ぶと、閉形式とホモロジーのペアリングから

$$
\int_Cf^*\omega=2\pi v\int_Cf^*H=2\pi vd.
$$

この等式は**位相的な曲線類にのみ依存する**。しかしその正値性は、非定数の正則写像とKähler形式の正値性を使う。局所複素座標 $\xi=x+iy$ によって $f$ が正則なら、正値なHermitian計量 $g$ と整合する $\omega$ に対し

$$
f^*\omega(\partial_x,\partial_y)
=\omega(df\,\partial_x,Jdf\,\partial_x)
=g(df\,\partial_x,df\,\partial_x)\ge0.
$$

写像が非定数ならどこかで $df\ne0$ であり、その近傍で積分は正になる。節点曲線では各成分へ適用する。従って非定数の安定写像は $d>0$、$d=0$ なら全成分が定数写像である。これは $v>0$ を落とすと得られない**面積による次数の判定**である。

<a id="prop-mir2-01-area-degree"></a>

<!-- formal-statement-start -->
> **命題（面積と超平面次数）**
>
> 上記の滑らかなquintic $X$、Kähler形式 $\omega$ と $[\omega]/(2\pi)=vH$（$v>0$）について、種数0安定正則写像 $f:C\to X$ の超平面次数 $d$ は非負整数であり、

$$
\int_Cf^*\omega=2\pi vd.
$$

> $d=0$ と $f$ が全成分で定数写像であることは同値である。非定数なら $d\ge1$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

次数の整数性は整数Chern類、面積の等式はコホモロジー類の評価による。最後の零判定だけは、正則写像の微分とKähler形式の正値性を使う。

<!-- proof-start -->
### 証明

節点曲線 $C$ を既約成分 $C_j$ に分ける。$H$ が整数係数の第一Chern類なので、$\int_{C_j}f^*H$ は引戻し線束の整数次数である。$[\omega]=2\pi vH$ より

$$
\int_Cf^*\omega
=\sum_j\int_{C_j}f^*\omega
=2\pi v\sum_j\int_{C_j}f^*H
=2\pi vd.
$$

正則写像の局所座標で、各 $f|_{C_j}$ に対する積分密度は上記の $g(df\,\partial_x,df\,\partial_x)\ge0$ だから、$d\ge0$。$d=0$ なら全成分で非負の面積積分の和が零であり、各成分で積分が零。もしある成分で写像が非定数なら微分が非零となる開集合があり、そこの積分が正になるので矛盾する。逆に全成分が定数なら各引戻し二形式が零で、$d=0$。$\square$
<!-- proof-end -->

## 3. 複素化された面積はどう次数に掛かるか

面積 $2\pi vd$ は正実数だが、曲線を数える際には位相も付けたい。[MIR1-01のA側入力](../MIR1-01/index.md#def-mir1-01-a-b-input)で導入した実閉二形式 $B$ を加え、[quinticの複素化Kähler類](../../CYG/CYG1-13/index.md#def-cyg1-13-complexified-kahler)の規格化に従って

$$
\frac{[B]}{2\pi}=bH,\quad
\frac{[\omega]}{2\pi}=vH,\quad
t=b+iv,\quad b\in\mathbb R,\quad v>0
$$

とする。ここで $B$ は物理的にB場と呼ぶ**実二形式**であり、ミラーの**B側**を意味しない。

<a id="def-mir2-01-curve-weight"></a>

<!-- formal-statement-start -->
> **定義（複素化Kähler類の曲線重み）**
>
> 滑らかな五次超曲面 $X$、$H=c_1(\mathcal O_X(1))$、$[B]=2\pi bH$、$[\omega]=2\pi vH$（$v>0$）を固定する。整数曲線類 $\beta\in H_2(X;\mathbb Z)$ で $d=\langle H,\beta\rangle\ge0$ のとき、**複素化Kähler重み**を

$$
W_t(\beta)=
\exp\!\left(i\langle[B]+i[\omega],\beta\rangle\right)
=\exp(2\pi i d t),
\qquad t=b+iv
$$

> と定義する。また**A側指数座標**を $q_A=\exp(2\pi it)$ と書き、$W_t(\beta)=q_A^d$ と表す。曲線のGW不変量そのものをこの重みで定義するわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-01-curve-weight -->

**定義の確認。** 前節の $f_2$ は $d=2$ である。$t=\frac14+i$ を代入すると、$q_A=ie^{-2\pi}$ だから

$$
W_t((f_2)_*[\mathbb P^1])
=(ie^{-2\pi})^2=-e^{-4\pi}.
$$

実際、二次類の評価を直接計算すると

$
\langle[B]+i[\omega],2[L]\rangle
=2\left(\frac{2\pi}{4}+2\pi i\right)=\pi+4\pi i.
$

従って指数は $e^{i(\pi+4\pi i)}=-e^{-4\pi}$ と一致する。非零の絶対値 $e^{-4\pi}<1$ は曲線の面積 $4\pi$ を反映する。位相の負号はB場の寄与であって、曲線の「負の本数」を意味しない。

<!-- definition-example-end -->

<a id="prop-mir2-01-weight-laws"></a>

<!-- formal-statement-start -->
> **命題（重みの乗法性・整数シフト・減衰）**
>
> 上の $X,t=b+iv$（$v>0$）と、非負の整数次数 $d_j=\langle H,\beta_j\rangle$ を持つ曲線類 $\beta_1,\beta_2$ に対し、次が成立する。

$$
W_t(\beta_1+\beta_2)=W_t(\beta_1)W_t(\beta_2),
\qquad W_t(0)=1,
$$

$$
W_{t+m}(\beta)=W_t(\beta)\quad(m\in\mathbb Z),
\qquad |W_t(\beta)|=e^{-2\pi vd}.
$$

> とくに $d>0$ なら $0<|W_t(\beta)|<1$ である。ただし、整数シフトの同一視はB場の周期を $2\pi$ とする本講の規約による。
<!-- formal-statement-end -->

### 証明の見取り図

ホモロジー類の和を二次類で評価すると値の和になること、指数法則、実部・虚部の分解を順に使う。

<!-- proof-start -->
### 証明

$\langle H,\beta_1+\beta_2\rangle=d_1+d_2$ を定義へ代入すると

$$
\begin{aligned}
W_t(\beta_1+\beta_2)
&=e^{2\pi i(d_1+d_2)t}\\
&=e^{2\pi id_1t}e^{2\pi id_2t}
=W_t(\beta_1)W_t(\beta_2).
\end{aligned}
$$

$d=0$ では指数が $e^0=1$。整数 $m$ による移動では

$$
W_{t+m}(\beta)
=e^{2\pi idt}e^{2\pi idm}
=W_t(\beta)
$$

で、$d,m\in\mathbb Z$ により最後の因子は1である。また $2\pi id(b+iv)=2\pi idb-2\pi vd$ だから、絶対値は $e^{-2\pi vd}$。$v,d>0$ なら指数の実部は負となる。$\square$
<!-- proof-end -->

[複素化Kähler座標の指数と整数シフト](../MIR1-01/index.md#prop-mir1-01-q-shift)から、$\operatorname{Im}t>0$ を整数平行移動で割った商は $0<|q_A|<1$ で記録できる。例えば $t$ と $t+1$ は同じ $q_A$ を与えるが、$v=0$ の場合は $|q_A|=1$ となり、正のKähler類を表さない。$q_A\to0$ は $v\to+\infty$ の極限であり、**有限の $t$ で $q_A=0$ となるわけではない**。

## 4. Novikov変数は数値の $q_A$ と同じものか

[GW1-16の有効曲線類に沿うNovikov完備化](../../GW/GW1-16/index.md#def-gw1-16-novikov)で、$Q^\beta$ は係数の次数を記録する**形式記号**だった。そこでのGW不変量の構成は凸標的を仮定しているが、**形式級数の代数的な掛け算それ自体**に凸性は不要である。非凸なquinticの仮想基本類の理論は後講で区別して扱う。

quinticの非負次数だけを記録する場合、$Q$ という一つの形式変数を使う。一般に $H_2(X;\mathbb Z)$ の整数曲線類をすべて形式化する必要はなく、この章では**同じ次数の類をまとめる一次元の次数記録**を採用する。特に曲線類の有効性と、全ての非負整数に実際に曲線が存在するかは同一命題ではない。

<a id="def-mir2-01-degree-series"></a>

<!-- formal-statement-start -->
> **定義（quinticの次数記録用形式級数）**
>
> $X$ を滑らかなquinticとし、形式変数 $Q$ に対して、**次数記録用の完備係数環**を

$$
\mathbb Q[[Q]]
=\left\{F(Q)=\sum_{d=0}^{\infty}a_dQ^d:a_d\in\mathbb Q\right\}
$$

> とする。加法は次数ごと、積は $Q^iQ^j=Q^{i+j}$ と係数の有限和

$$
[Q^n](FG)=\sum_{j=0}^n a_jb_{n-j}
$$

> で定める。ここで $Q^d$ は整数次数 $d$ の記録であり、複素数 $q_A^d$ へ代入した値ではない。
<!-- formal-statement-end -->

この定義は[形式級数のCauchy積](../../../計算系/COMB/COMB9/index.md#def-comb9-cauchy-product)を利用し、[GW1-16のNovikov変数](../../GW/GW1-16/index.md#def-gw1-16-novikov)を整数次数だけに縮約したものである。$a_d=0$ なら実際の次数 $d$ の寄与を計上しないことを表せる。物理的な $q_A$ と区別するため、以後、形式変数には大文字 $Q$ を使う。

<!-- definition-example-start: def-mir2-01-degree-series -->

**定義の確認。** $F(Q)=1+2Q+3Q^2+\cdots$、$G(Q)=1-Q+Q^2$ と置けば、$Q^2$ の係数へ寄与するのは $(0,2),(1,1),(2,0)$ の三組だけで、

$$
[Q^2](FG)=1\cdot1+2\cdot(-1)+3\cdot1=2.
$$

無限和を定義していても、この係数の計算には有限個しか必要ない。$Q$ の値や収束半径を指定していないことも、定義の全条件と整合する。

<!-- definition-example-end -->

ここでの係数 $a_d$ は、現段階では任意の有理数である。後講で非凸quinticのGW不変量を定義して初めて、それらを係数として選んだ**特別な**形式級数を考えられる。係数環を先に用意したことと、幾何学的な計数値の存在を示したことは別の仕事である。

### 数値代入が常に許されるわけではない

$q_A=e^{2\pi it}$ の絶対値が1より小さくても、一般の形式級数がその点で収束するとは限らない。この違いを曖昧にすると、まだ証明していないA側の解析関数を作ってしまう。

<a id="prop-mir2-01-convergence"></a>

<!-- formal-statement-start -->
> **命題（形式級数を数値評価できる十分条件）**
>
> $F(Q)=\sum_{d\ge0}a_dQ^d\in\mathbb C[[Q]]$、複素数 $q_0$ とする。もし

$$
\sum_{d=0}^{\infty}|a_d|\,|q_0|^d<\infty
$$

> なら $F(q_0)=\sum_{d\ge0}a_dq_0^d$ は複素数として定義できる。同じ $q_0$ で二つの級数 $F,G$ がともに絶対収束するなら、Cauchy積 $FG$ も絶対収束し $(FG)(q_0)=F(q_0)G(q_0)$ である。一方、$0<|q_0|<1$ だけでは任意の形式級数の評価は保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

有限部分和と絶対収束で積を制御し、反例として係数が階乗的に増大する形式級数を使う。

<!-- proof-start -->
### 証明

二つの絶対収束級数について、絶対値の二重和は

$$
\begin{aligned}
\sum_{i,j\ge0}|a_i b_j q_0^{i+j}|
&=\left(\sum_{i\ge0}|a_i||q_0|^i\right)
  \left(\sum_{j\ge0}|b_j||q_0|^j\right)<\infty.
\end{aligned}
$$

非負項の和の有限部分和を増加させて極限を取ると、全ての組の寄与を次数 $n=i+j$ ごとにまとめられる。各次数には有限個の組しかないので

$$
\sum_{n\ge0}\left(\sum_{j=0}^na_jb_{n-j}\right)q_0^n
=\sum_{i,j\ge0}a_ib_jq_0^{i+j}
=\left(\sum_{i\ge0}a_iq_0^i\right)
 \left(\sum_{j\ge0}b_jq_0^j\right).
$$

収束を保証できない反例として $F(Q)=\sum_{d\ge0}d!Q^d\in\mathbb Q[[Q]]$ を取る。$q_0\ne0$ なら連続する項の絶対値の比は

$$
\frac{(d+1)!|q_0|^{d+1}}{d!|q_0|^d}
=(d+1)|q_0|\longrightarrow\infty.
$$

従って一般項は零へ収束せず、級数は発散する。$\square$
<!-- proof-end -->

これに対して $F(Q)=\sum_{d\ge0}Q^d$ は $|q_0|<1$ なら評価でき、

$$
F(q_0)=\frac1{1-q_0}.
$$

両者は**いずれも合法な形式級数**であり、解析的な性質だけが違う。

なお $Q=0$ での定数項の抽出 $F\mapsto a_0$ は常に形式的にできる。これは $q_A\to0$ を大体積極限として考える操作と関連するが、任意のGW級数の解析接続を保証するものではない。

## 5. $q_A$ とB側鏡像座標の比較は、何をまだ仮定しているか

[MIR1-15のミラー座標の構成](../MIR1-15/index.md#prop-mir1-15-forward-series)では、B側の周期比から

$$
q_B(z)=z+770z^2+O(z^3)
$$

を得た。さらに[前講のB側正規化Yukawa級数](../MIR1-16/index.md#thm-mir1-16-normalized-series)は

$$
K_B(q_B)=5+2875q_B+4876875q_B^2+O(q_B^3)
$$

を与えた。他方、本講で作ったのはA側の $t=b+iv$、曲線類の $d$ と $W_t(\beta)=q_A^d$、および形式記号 $Q^d$ である。

| 記号 | 決め方 | 本講で保証したこと |
| --- | --- | --- |
| $d$ | $d=\langle H,\beta\rangle$ | 正則曲線の非負整数次数 |
| $t=b+iv$ | $[B+i\omega]=2\pi tH$、$v>0$ | 複素化Kähler方向 |
| $q_A$ | $e^{2\pi it}$ | $0<|q_A|<1$、曲線重み $q_A^d$ |
| $Q$ | 形式級数の不定元 | 係数ごとの代数演算、収束は未指定 |
| $z$ | Dwork族のB側パラメータ | 複素構造を動かす座標 |
| $q_B$ | B側の周期比から作る | 局所座標としてのB側の級数 |

**$Q=q_A$ と置く**ことには、個々の形式係数を解析的に評価できるかという問題が残る。**$q_A=q_B(z)$ と同定する**ことは、両側の構造を結ぶ追加の主張である。こうした比較を正当化する数学的な外部結果と、その適用の定義域・座標変換・規格化は後講MIR2-12で扱う。

境界 $q_A\to0$ は $v\to\infty$ の大体積極限、B側の $q_B(z)\to0$ は $z\to0$ の大複素構造極限に対応する。しかし**二つの極限が似ているだけでは両者の等式は証明できない**。

## 6. 演習：曲線類・面積・形式級数を切り分ける

### Level A：定義と基本計算

<a id="ex-mir2-01-a01"></a>
#### MIR2-01-A01 直線の被覆と次数
- Level: A

Fermat五次 $X_0$ の直線 $L=\{[\zeta s:s:\eta t:t:0]\}$（$\zeta^5=\eta^5=-1$）上で $f_3([u:v])=[\zeta u^3:u^3:\eta v^3:v^3:0]$ を考える。像の次数と写像の超平面次数をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答。** 方程式へ代入すると $(\zeta^5+1)u^{15}+(\eta^5+1)v^{15}=0$。像は $L$ であり、$[u:v]\mapsto[u^3:v^3]$ は射影直線への全射なので、像集合は次数1の直線である。一方、超平面 $x_1=0$ の引戻しは $u^3=0$ を定め、重複度を含む零点の次数は3。従って $\int_{\mathbb P^1}f_3^*H=3$ であり、$f_3$ の超平面次数は3。被覆次数と像集合の次数を区別する。
<!-- solution-end -->

<a id="ex-mir2-01-a02"></a>
#### MIR2-01-A02 面積の正規化
- Level: A

$[\omega]/(2\pi)=\frac32H$ とし、次数4の正則写像 $f:C\to X$ について $\int_Cf^*\omega$ を求めよ。

<!-- solution-start -->
**詳細解答。** $v=3/2$、$d=4$ を[面積公式](#prop-mir2-01-area-degree)へ代入すると

$$
\int_Cf^*\omega=2\pi\cdot\frac32\cdot4=12\pi.
$$

$[\omega]$ は実二次類、積分するのは実二次元の $C$ である。$\int_XH^3=5$ は別の交叉数なのでこの計算へ乗じない。
<!-- solution-end -->

<a id="ex-mir2-01-a03"></a>
#### MIR2-01-A03 B場の位相と面積減衰
- Level: A

$t=\frac12+\frac{i}{2}$、$d=3$ とする。$q_A$、$W_t(\beta)$、その絶対値を求め、$b$ を1増やすと変化するか判定せよ。

<!-- solution-start -->
**詳細解答。** $2\pi it=\pi i-\pi$ なので $q_A=-e^{-\pi}$。よって

$$
W_t(\beta)=q_A^3=-e^{-3\pi},
\qquad |W_t(\beta)|=e^{-3\pi}.
$$

$b\mapsto b+1$ では $t\mapsto t+1$、指数には因子 $e^{2\pi i\cdot3}=1$ を掛けるだけなので不変。負符号は位相であり、重みの絶対値は正である。
<!-- solution-end -->

<a id="ex-mir2-01-a04"></a>
#### MIR2-01-A04 形式的な二次係数
- Level: A

$F(Q)=1+2Q+4Q^2+O(Q^3)$、$G(Q)=1-3Q+2Q^2+O(Q^3)$ について $[Q^2](FG)$ を求めよ。数値代入の仮定は必要か。

<!-- solution-start -->
**詳細解答。** [Cauchy積](#def-mir2-01-degree-series)は次数2に寄与する組 $(0,2),(1,1),(2,0)$ を使うので

$$
[Q^2](FG)=1\cdot2+2\cdot(-3)+4\cdot1=2-6+4=0.
$$

$O(Q^3)$ は「次数3以上の形式項」であり、解析的な大小評価を意味しない。計算は係数が有限和になることだけから成立し、$Q$ の数値や収束は不要である。
<!-- solution-end -->

<a id="ex-mir2-01-a05"></a>
#### MIR2-01-A05 $q_A=0$ の意味
- Level: A

$v>0$ が有限のとき $q_A=e^{2\pi i(b+iv)}$ は零になるか。$v=0$ および $v\to+\infty$ では $|q_A|$ がどうなるか答えよ。

<!-- solution-start -->
**詳細解答。** $|q_A|=e^{-2\pi v}$ であり、有限の $v>0$ なら $0<|q_A|<1$ なので零ではない。$v=0$ なら $|q_A|=1$ で正のKähler錐の条件に入らない。$v\to+\infty$ では実指数 $e^{-2\pi v}\to0$、従って $q_A\to0$。これは有限のパラメータ点ではなく境界極限である。
<!-- solution-end -->

### Level B：仮定の役割を証明する

<a id="ex-mir2-01-b01"></a>
#### MIR2-01-B01 零面積から定数写像を導く
- Level: B

$C$ を種数0の節点付き曲線、$f:C\to X$ を正則写像とする。$\omega$ がKähler形式で $\int_Cf^*\omega=0$ のとき、全既約成分で $f$ が定数となることを示せ。非定数の成分が一つ存在すると仮定して矛盾を導け。

<!-- solution-start -->
**詳細解答。** $C=\bigcup C_j$ と分解し、それぞれの滑らかな部分で局所複素座標 $\xi=x+iy$ を取る。正則性から $df(\partial_y)=Jdf(\partial_x)$、ゆえに

$$
f^*\omega(\partial_x,\partial_y)
=\omega(df(\partial_x),Jdf(\partial_x))
=g(df(\partial_x),df(\partial_x))\ge0.
$$

もしある $C_j$ で非定数なら、正則写像の微分が恒等的に零ではなく、非零の点とその近傍がある。そこで $g(df(\partial_x),df(\partial_x))>0$ なので、その成分の積分は正となる。他の成分の積分は非負で、合計が零という仮定に反する。従って全ての成分で定数写像である。この議論で必要なのはKähler形式の正値性と正則性であり、単なる閉二形式の積分が零という条件だけでは結論できない。
<!-- solution-end -->

<a id="ex-mir2-01-b02"></a>
#### MIR2-01-B02 分裂と次数・重みの整合
- Level: B

次数 $d_1=2$、$d_2=3$ の二つの成分を節点でつないだ種数0安定写像があるとする。全体の次数、面積、重みを求め、節点で分裂したときに乗法が成立する理由を示せ。

<!-- solution-start -->
**詳細解答。** 全体の曲線類を $\beta=\beta_1+\beta_2$ とすると、超平面類の評価が加法的なので

$$
d=\langle H,\beta\rangle
=\langle H,\beta_1\rangle+\langle H,\beta_2\rangle
=2+3=5.
$$

$[\omega]=2\pi vH$ なら全体の面積は $2\pi v(2+3)=10\pi v$。複素化Kähler重みは

$$
W_t(\beta_1)W_t(\beta_2)
=q_A^2q_A^3=q_A^5=W_t(\beta).
$$

これは指数の乗法性であり、節点でのGW不変量の分裂公式そのものはこの式だけから得られない。計数に現れる評価写像や仮想類の分裂は追加の入力である。
<!-- solution-end -->

<a id="ex-mir2-01-b03"></a>
#### MIR2-01-B03 形式級数の収束反例
- Level: B

$F(Q)=\sum_{d\ge0}d!Q^d$ と $G(Q)=\sum_{d\ge0}Q^d$ はいずれも $\mathbb Q[[Q]]$ の元であることを確認せよ。$q_0=\frac12$ に代入した場合の違いを、一般項または部分和を使って証明せよ。

<!-- solution-start -->
**詳細解答。** [形式級数の定義](#def-mir2-01-degree-series)は各次数の係数が有理数であることだけを要求する。$d!$ も $1$ も整数なので両者は元である。$F$ の一般項は $d!/2^d$ で、連続項の比は

$$
\frac{(d+1)!/2^{d+1}}{d!/2^d}=\frac{d+1}{2}.
$$

$d\ge2$ で比は $3/2$ 以上となるので、一般項は零へ収束しない。従って $F(1/2)$ は定義できない。一方 $G$ の部分和は $S_N=\sum_{d=0}^N2^{-d}=2(1-2^{-(N+1)})$ であり、$N\to\infty$ とすると $G(1/2)=2$ となる。$0<|q_0|<1$ という条件は、係数の増加を制限しない限り十分ではない。
<!-- solution-end -->

<a id="ex-mir2-01-b04"></a>
#### MIR2-01-B04 次数0と非凸性の区別
- Level: B

種数0の曲線写像の次数 $d=0$ と、非凸標的における仮想基本類の必要性を混同しないように説明せよ。どこまでが本講の結果だけから従うかを明示せよ。

<!-- solution-start -->
**詳細解答。** [面積と超平面次数](#prop-mir2-01-area-degree)より、$d=0$ なら全成分が定数である。形式記録では次数0の重みは $Q^0=1$、指数記録でも $W_t(0)=1$ となる。ただし標点数が少ない定数写像は安定ではない。[安定写像の条件](../../GW/GW1-08/index.md#def-gw1-08-stable-map)によれば、写像が定数の種数0単一成分には少なくとも三つの特殊点が必要である。

一方、quinticは一般に凸標的ではない。非定数写像で障害空間が生じることと、次数が負になることは別問題である。[GW1-20の仮想基本類の設計](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-dim)を参考にすると、計数には障害を補正する理論が要る。本講は曲線の次数・重みを構成しただけであり、非凸quinticのGW不変量が通常の基本類で定義できるとは示していない。
<!-- solution-end -->

### Level C：A側とB側をつなぐ前に何を証明すべきか

<a id="ex-mir2-01-c01"></a>
#### MIR2-01-C01 異なる三つの $q$ を識別する総合問題
- Level: C

滑らかなquintic上で $[\omega]/(2\pi)=vH$、$[B]/(2\pi)=bH$（$v>0$）を取り、次数 $d$ の正則写像を考える。さらに、B側では $q_B(z)=z+770z^2+O(z^3)$、$K_B(q_B)=5+2875q_B+O(q_B^2)$ を既知とする。

1. A側の次数 $d$ の面積と複素化重みを求め、$b\mapsto b+1$ で不変となることを示せ。
2. $F(Q)=\sum_{d\ge0}a_dQ^d$ を形式級数として扱う場合、$Q=q_A$ の数値代入が自動的に定義されない理由を具体例で示せ。
3. $K_B$ の係数 $2875$ を、そのまま「次数1の曲線が2875本」と断言できない理由を、未証明の入力を挙げて説明せよ。

<!-- solution-start -->
**詳細解答。**

**（1）** [面積公式](#prop-mir2-01-area-degree)に $[\omega]=2\pi vH$ を代入すると $\int_Cf^*\omega=2\pi vd$。複素化された類は $[B+i\omega]=2\pi(b+iv)H$ だから

$$
W_t(\beta)
=\exp(i\,2\pi d(b+iv))
=e^{-2\pi vd}e^{2\pi idb}
=q_A^d.
$$

$b$ を $b+1$ に替えた場合、比は $e^{2\pi id}=1$ となる。整数次数の仮定が不可欠である。

**（2）** $\sum d!Q^d$ は係数が有理数の合法な形式級数である。しかし $q_A\ne0$ を固定すれば、項 $d!q_A^d$ の絶対値の比は $(d+1)|q_A|$ で無限大に発散し、一般項が零へ近づかない。従って数値代入は一般には定義できない。[絶対収束の十分条件](#prop-mir2-01-convergence)など、別の解析条件を必要とする。

**（3）** B側の $2875$ は既習の[正規化Yukawa級数](../MIR1-16/index.md#thm-mir1-16-normalized-series)から出た**周期計算の係数**である。A側に対応する計数を定義するには、非凸quintic上の安定写像モジュライと仮想基本類が必要となる。さらに、その生成級数をB側のものへ結ぶquinticミラー定理と $q_A,q_B$ の座標・規格化の対応が必要である。多重被覆を含むGW値と整数型曲線数を区別する作業も残る。指数重み $q_A^d$ の計算だけでは、いずれの等式も証明されていない。
<!-- solution-end -->

本講の到達点は、**曲線類 → 整数次数 → 正値な面積 → 位相つきの指数重み → 形式級数**という鎖を、個別の仮定から追えるようにしたことである。次講では、これらの次数が実際にGromov–Witten不変量の仮想次元とどう結び付くかを検証する。
