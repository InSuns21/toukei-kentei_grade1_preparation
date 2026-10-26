# ML2-16 畳み込みネットワークと等変性

前講までの[多層網](../ML2-13/index.md#def-ml2-13-mlp)と[逆伝播](../ML2-14/index.md#thm-ml2-14-backprop)では、入力ベクトルの各成分に別々の重みを付けられた。しかし画像の隣り合う画素や時間信号の隣り合う標本では、同じ小さな模様をどの位置でも検出したい。位置ごとに独立した重みを学習させると、その要求をモデル構造だけでは表せない。

ここでは小さなフィルタの重みを位置間で**共有**する畳み込みネットワーク（CNN）を調べる。特徴を一つ右へ移したら検出結果も一つ右へ移る、という性質を**平行移動等変性**という。まず周期的な有限信号で厳密に証明し、実データの境界処理・strideで何が破れるかを切り分ける。最後に重みを共有したときの勾配の加算を導く。

## 1. 「ずらす」の数学：位置と値を混同しない

長さ $N\ge2$ の信号を $x=(x_0,\ldots,x_{N-1})\in\mathbb R^N$ とする。添字を $N$ で割った余りとして扱う場合、位置 $N-1$ の次は位置0に戻る。これを**周期境界**という。例えば $N=4$ で $(1,2,0,-1)$ を一つ右へ動かせば $(-1,1,2,0)$ になる。

単に「動かしても値が変わらない」と言うと、結果を同じ位置で比べてしまう。正しくは、入力を動かしたとき出力も同じだけ動くかを比較する。

<a id="def-ml2-16-equivariance"></a>

<!-- formal-statement-start -->
> **定義（周期平行移動作用と平行移動等変性）**
> 整数 $N\ge2$ と、添字集合 $\mathbb Z/N\mathbb Z$ 上の実数値信号 $x=(x_i)_{i=0}^{N-1}$ を固定する。整数 $s$ による周期平行移動 $T_s:\mathbb R^N\to\mathbb R^N$ を

$$
(T_sx)_i=x_{(i-s)\bmod N}
$$

> で定める。写像 $F:\mathbb R^N\to\mathbb R^N$ が**周期平行移動等変**であるとは、すべての $x\in\mathbb R^N$ と整数 $s$ について

$$
F(T_sx)=T_sF(x)
$$

> が成り立つことをいう。出力がスカラーの写像 $G:\mathbb R^N\to\mathbb R$ で $G(T_sx)=G(x)$ を満たす場合は、**平行移動不変**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-16-equivariance -->
**定義の確認**。 $N=4$、$x=(1,2,0,-1)$、$s=1$ なら $(T_1x)_0=x_3=-1$、$(T_1x)_1=x_0=1$、$(T_1x)_2=x_1=2$、$(T_1x)_3=x_2=0$ であり $T_1x=(-1,1,2,0)$ である。恒等写像 $F(x)=x$ は $F(T_sx)=T_sx=T_sF(x)$ をすべての $x,s$ で満たす。これに対し $G(x)=\sum_i x_i$ は添字の並べ替えで和が変わらず、$G(T_sx)=G(x)$ を満たす。等変性と不変性は入力と出力の変換の仕方が異なる。
<!-- definition-example-end -->

右へ一つの移動を2回行えば右へ二つの移動になる。実際、

$$
(T_sT_tx)_i=(T_tx)_{i-s}=x_{i-s-t}=(T_{s+t}x)_i.
$$

したがって $T_0$ は恒等写像、$T_{-s}$ は $T_s$ の逆写像である。これらは「各位置を一対一で並べ替える」という性質に由来する。

## 2. フィルタをどこでも同じ形で使う

位置 $i$ の値だけではなく、位置 $i$ とその一つ右の値を比較する検出器を考える。例えば $x_i-x_{i+1}$ は各位置で同じ係数 $(1,-1)$ を使う。局所的な係数列を**核**（フィルタ）という。

深層学習のライブラリで「畳み込み」と呼ぶ層の多くは、数学の畳み込み $h_r x_{i-r}$ ではなく、核を反転しない $k_r x_{i+r}$ 型の**相互相関**を計算する。ここではライブラリとの対応を優先して後者を用い、添字と符号を固定する。

<a id="def-ml2-16-periodic-correlation"></a>

<!-- formal-statement-start -->
> **定義（周期相互相関型畳み込み）**
> $N\ge2$、$K\ge1$、核 $k=(k_0,\ldots,k_{K-1})\in\mathbb R^K$ を固定する。周期信号 $x\in\mathbb R^N$ に対する線形作用素 $C_k:\mathbb R^N\to\mathbb R^N$ を

$$
(C_kx)_i=\sum_{r=0}^{K-1}k_r x_{(i+r)\bmod N},
\qquad i=0,\ldots,N-1
$$

> で定める。この式を**周期相互相関型畳み込み**という。核の同じ $K$ 個の係数をすべての出力位置で用いることを**重み共有**という。$K>N$ でも定義できるが、同じ入力位置が一つの和の中へ重複して現れうる。
<!-- formal-statement-end -->

ここではバイアスを含めない線形フィルタを定義した。数学的な周期畳み込み $(h*x)_i=\sum_r h_r x_{i-r}$ を使いたいなら、$h_{(-r)\bmod N}$ と $k_r$ の対応を取れば同じ演算を表せる。核を反転したかどうかを曖昧にしたまま微分式へ進まない。

<!-- definition-example-start: def-ml2-16-periodic-correlation -->
**定義の確認**。 $N=4$、$K=2$、$x=(1,2,0,-1)$、$k=(2,-1)$ とする。全位置で係数2と $-1$ を共有し、

$$
\begin{aligned}
(C_kx)_0&=2(1)-2=0,\\
(C_kx)_1&=2(2)-0=4,\\
(C_kx)_2&=2(0)-(-1)=1,\\
(C_kx)_3&=2(-1)-1=-3.
\end{aligned}
$$

よって $C_kx=(0,4,1,-3)$ である。最後の行は周期境界によって $x_4=x_0=1$ を用いたことに注意する。$K=2$ の全位置で参照する入力は隣接2点、出力は元と同じ4点で、各出力は入力の線形結合となる。
<!-- definition-example-end -->

核の大きさ $K$ を小さくすると一層で見る範囲（**局所受容野**）が狭くなる。ただし層を重ねれば、次の層が前の層の局所出力をさらに見るので参照範囲は広がる。例えばstride 1の幅2層を二つ重ねると、二層目の位置 $i$ は第一層の $i,i+1$ を見て、元の入力では $i,i+1,i+2$ に依存する。途中で非線形活性化を入れても参照できる位置の集合はこの範囲内である。

<a id="thm-ml2-16-equivariant-convolution"></a>

<!-- formal-statement-start -->
> **定理（周期畳み込みの平行移動等変性）**
> $N\ge2$、$K\ge1$、核 $k\in\mathbb R^K$ を固定し、$C_k$ を上の周期相互相関型畳み込み、$T_s$ を周期平行移動とする。すべての $x\in\mathbb R^N$、整数 $s$ について

$$
C_k(T_sx)=T_s(C_kx)
$$

> が成立する。核 $k$ の値に符号・総和・対称性の条件を課す必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

左辺は「先に各入力位置を $s$ ずらしてから、各出力位置で同じ核を使う」。右辺は「同じ核で計算した出力の位置を $s$ ずらす」。二つの成分を位置 $i$ で展開すると、どちらも $x_{i+r-s}$ を同じ係数で足した和になる。

<!-- proof-start -->
### 証明

任意の $i\in\{0,\ldots,N-1\}$ を固定する。[周期相互相関型畳み込み](#def-ml2-16-periodic-correlation)の $i$ 成分へ $T_sx$ を代入すると

$$
\begin{aligned}
\bigl[C_k(T_sx)\bigr]_i
&=\sum_{r=0}^{K-1}k_r(T_sx)_{(i+r)\bmod N}\\
&=\sum_{r=0}^{K-1}k_r x_{(i+r-s)\bmod N}\\
&=(C_kx)_{(i-s)\bmod N}\\
&=\bigl[T_s(C_kx)\bigr]_i.
\end{aligned}
$$

第三行は $C_kx$ の定義における出力添字を $i-s$ としたものである。すべての成分 $i$ で等しいのでベクトル全体も等しい。$s$ は任意だから主張が従う。$\square$
<!-- proof-end -->

先ほどの例では $T_1x=(-1,1,2,0)$ へ同じ核を作用させると

$$
C_k(T_1x)=(-3,0,4,1)=T_1(0,4,1,-3)=T_1(C_kx).
$$

これは個別の検算であり、定理の証明はすべての $x,s$ に対する添字恒等式である。

### どんな線形層でも等変なのか

位置依存の乗算 $Ax=(a_0x_0,\ldots,a_{N-1}x_{N-1})$ を考える。$N=3$、$a=(1,2,3)$、$x=(1,0,0)$ なら

$$
A(T_1x)=(0,2,0),\qquad T_1(Ax)=(0,1,0).
$$

両辺が異なるため、位置によって重みが違う演算は一般に等変ではない。周期畳み込みの証明の第三行が成立したのは、係数が出力位置 $i$ に依存しなかったからである。重み共有は単なるパラメータ削減だけではなく、許される関数の形を制限する。

## 3. 多チャネルの畳み込みと非線形性

実際の画像には色など複数の入力チャネルがあり、検出する特徴も複数ある。入力チャネル番号を $c$、出力チャネル番号を $o$、空間位置を $i$ とする。核係数を出力チャネル・入力チャネル・核内位置の3添字で持てば、各出力位置で同じ計算を行える。

<a id="def-ml2-16-multichannel"></a>

<!-- formal-statement-start -->
> **定義（多チャネル畳み込み層）**
> 整数 $N\ge2$、$K\ge1$、入力チャネル数 $C_{\rm in}\ge1$、出力チャネル数 $C_{\rm out}\ge1$ を固定する。入力 $x\in\mathbb R^{C_{\rm in}\times N}$、核 $W\in\mathbb R^{C_{\rm out}\times C_{\rm in}\times K}$、位置間で共有するバイアス $b\in\mathbb R^{C_{\rm out}}$ に対し、出力 $z\in\mathbb R^{C_{\rm out}\times N}$ を

$$
z_{o,i}=b_o+\sum_{c=1}^{C_{\rm in}}\sum_{r=0}^{K-1}
W_{o,c,r}x_{c,(i+r)\bmod N}
$$

> とする。各出力に実数関数 $\rho:\mathbb R\to\mathbb R$ を同じように作用させた $y_{o,i}=\rho(z_{o,i})$ を活性化後の出力という。学習パラメータ数は $C_{\rm out}C_{\rm in}K+C_{\rm out}$ であり、$N$ に依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-16-multichannel -->
**定義の確認**。 $C_{\rm in}=2$、$C_{\rm out}=1$、$N=3$、$K=2$ とする。第一チャネル $x_{1,\cdot}=(1,2,0)$、第二チャネル $x_{2,\cdot}=(0,1,1)$、$W_{1,1,\cdot}=(1,-1)$、$W_{1,2,\cdot}=(2,0)$、$b_1=1$ と置く。位置0では

$$
z_{1,0}=1+[1(1)-1(2)]+[2(0)+0(1)]=0.
$$

位置1では $z_{1,1}=1+[1(2)-1(0)]+[2(1)+0(1)]=5$、位置2では周期境界により $z_{1,2}=1+[1(0)-1(1)]+[2(1)+0(0)]=2$ である。出力形状は $1\times3$、核の係数4個と共有バイアス1個で計5個となる。例えば $\rho(t)=\max(0,t)$ とすれば出力は $(0,5,2)$ である。
<!-- definition-example-end -->

空間方向を平坦化し位置ごとに独立の重みを持つ全結合線形層なら、同じ $C_{\rm in}N$ 入力から $C_{\rm out}N$ 出力を作るのに $C_{\rm out}C_{\rm in}N^2+C_{\rm out}N$ 個のパラメータを持つ。畳み込みでは局所性と位置間共有の制約により桁違いに減ることがあるが、**自由度が少ないほど必ず性能が高い**とは言えない。

<a id="prop-ml2-16-layer-equivariance"></a>

<!-- formal-statement-start -->
> **命題（多チャネル畳み込みと点ごと活性化の等変性）**
> 上の多チャネル周期畳み込みで $W,b$ を位置によらず固定し、同一の関数 $\rho:\mathbb R\to\mathbb R$ を全位置で使う。平行移動 $T_s$ を各チャネルの空間添字へ同時に作用させると、層写像 $F(x)_{o,i}=\rho(z_{o,i})$ は任意の整数 $s$ について

$$
F(T_sx)=T_sF(x)
$$

> を満たす。$\rho$ の線形性や微分可能性は必要ない。したがってこの形の層を有限個合成しても等変性は保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

単一チャネルでの[等変性定理](#thm-ml2-16-equivariant-convolution)を各入力・出力チャネルに適用して足す。位置によらない $b_o$ はずらしても変わらず、同じ $\rho$ を同じ位置の値へ作用させる操作は位置の並べ替えと可換である。

<!-- proof-start -->
### 証明

任意の $o,i,s$ について、入力を $T_sx$ とした畳み込み前の値を $z'_{o,i}$ と書く。各入力チャネルに[等変性定理](#thm-ml2-16-equivariant-convolution)の添字計算を適用すると

$$
\begin{aligned}
z'_{o,i}
&=b_o+\sum_{c=1}^{C_{\rm in}}\sum_{r=0}^{K-1}
W_{o,c,r}x_{c,(i+r-s)\bmod N}\\
&=z_{o,(i-s)\bmod N}.
\end{aligned}
$$

したがって $F(T_sx)_{o,i}=\rho(z'_{o,i})=\rho(z_{o,i-s})=(T_sF(x))_{o,i}$。層の合成については、$F$ と $H$ がそれぞれ等変なら

$$
(H\circ F)(T_sx)=H(T_sF(x))=T_sH(F(x))
$$

である。$\square$
<!-- proof-end -->

ReLUも平行移動との可換性だけなら折点での微分可能性を必要としない。勾配計算の際には折点に注意が要るが、等変性はあくまで関数値の恒等式である。

## 4. 境界条件でどこが壊れるのか

周期境界は証明に都合がよいが、通常の画像の左右端が本当に接しているわけではない。有限信号を範囲外で0とみなす**zero padding**を考える。整数 $j$ に対し拡張信号を $\bar x_j=x_j$（$0\le j<N$）、範囲外では $\bar x_j=0$ とする。

zero paddingで出力長を $N$ に保つ相互相関型演算を

$$
(P_kx)_i=\sum_{r=0}^{K-1} k_r\bar x_{i+r},
\qquad i=0,\ldots,N-1
$$

と定める。これは「左側0個、右側 $K-1$ 個の0を加える」という**片側の例**であり、ライブラリの左右対称な same padding の一般形を表すわけではない。ここで核の向きに応じてどちらへ拡張するかも結果を左右する。

有限領域で「右へ一つずらす」演算 $S_1$ は $(S_1x)_0=0$、$(S_1x)_i=x_{i-1}$（$1\le i<N$）とする。これは周期移動ではなく、最後の値が領域外へ落ちる移動であり逆写像を持たない。

### 3点の反例

$N=3$、$K=2$、$k=(0,1)$、$x=(1,0,0)$ とする。$P_kx$ は右隣の値を取り出すから $P_kx=(0,0,0)$ である。一方、

$$
\begin{aligned}
S_1x&=(0,1,0),\\
P_k(S_1x)&=(1,0,0),\\
S_1(P_kx)&=(0,0,0).
\end{aligned}
$$

等変性が破れた。周期畳み込みでは $i+r-s$ を常に $N$ で還元したため、右辺と左辺が同じ入力位置を見られた。有限領域の切り出しでは、一度捨てられた信号が移動後のフィルタ計算に再び必要になる場合がある。**無限の整数格子上でzero extensionへ畳み込みを行い、その全結果を平行移動する**なら等変だが、有限長へ毎回切り詰める演算との合成では一般に可換でない。

stride 1であっても境界付近にはこの問題が残る。畳み込みを「valid」（範囲内に完全に入る核だけを計算）で実行すると、そもそも出力位置数が $N-K+1$ へ変わり、入力側の $N$ 点と出力側の $N-K+1$ 点には同じ平行移動作用を無条件に使えない（ここでは $1\le K\le N$ とする）。

## 5. strideでは「一つずらす」が残らない

計算量や特徴マップの解像度を下げるために、フィルタ結果の位置を一定間隔で採用することがある。この間隔を**stride**と呼ぶ。まず端数のない場合を定義する。

<a id="def-ml2-16-stride"></a>

<!-- formal-statement-start -->
> **定義（stride付き標本抽出）**
> 整数 $N\ge2$ と $d\ge1$ が $d\mid N$ を満たすとし、$M=N/d$ と置く。周期信号 $y\in\mathbb R^N$ の $d$ 点ごとの標本抽出演算 $D_d:\mathbb R^N\to\mathbb R^M$ を

$$
(D_dy)_j=y_{dj},
\qquad j=0,\ldots,M-1
$$

> で定める。核 $k$ に対する stride $d$ の畳み込み層を $C_{k,d}=D_dC_k$ とする。出力側の平行移動は、長さ $M$ に対する周期移動 $T_a^{(M)}$ で表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-16-stride -->
**定義の確認**。 $N=6$、$d=2$ なら $M=3$。$y=(2,3,5,7,11,13)$ に対し $(D_2y)_0=y_0=2$、$(D_2y)_1=y_2=5$、$(D_2y)_2=y_4=11$ だから $D_2y=(2,5,11)$。実際に長さが $6/2=3$ になり、値は添字が0,2,4の成分である。
<!-- definition-example-end -->

<a id="prop-ml2-16-stride-equivariance"></a>

<!-- formal-statement-start -->
> **命題（strideで残る平行移動等変性）**
> $N,d,M$ を上の定義のとおりとし、$k\in\mathbb R^K$ を任意の核とする。任意の整数 $a$、$x\in\mathbb R^N$ について、入力の $da$ 点移動と出力の $a$ 点移動は

$$
C_{k,d}\bigl(T_{da}^{(N)}x\bigr)
=T_a^{(M)}(C_{k,d}x)
$$

> を満たす。一方で $d>1$ の場合、入力の任意の1点移動に対応する出力の周期的な平行移動が、すべての入力・すべての核について存在するとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

フィルタはすべての平行移動に等変だが、$d$ 個おきに値を取ると位置の剰余類を一つだけ採択する。$da$ 点だけ移動する場合は同じ剰余類内で再び採択できる。

<!-- proof-start -->
### 証明

まず[周期畳み込みの等変性](#thm-ml2-16-equivariant-convolution)により $C_kT_{da}^{(N)}x=T_{da}^{(N)}C_kx$ である。$y=C_kx$ と書き、出力位置 $j=0,\ldots,M-1$ を固定すると

$$
\begin{aligned}
\bigl[D_d(T_{da}^{(N)}y)\bigr]_j
&=(T_{da}^{(N)}y)_{dj}\\
&=y_{(dj-da)\bmod N}\\
&=y_{d((j-a)\bmod M)}\\
&=(D_dy)_{(j-a)\bmod M}.
\end{aligned}
$$

第三行は $N=dM$ と $d\mid (dj-da)$ を用いた。右端は $[T_a^{(M)}D_dy]_j$ だから前半が成り立つ。

後半は反例で示す。$N=4$、$d=2$、$K=1$、$k=(1)$、$x=(1,0,0,0)$ とする。この核では $C_k$ が恒等写像なので

$$
D_2C_kx=(1,0),\qquad
D_2C_k(T_1^{(4)}x)=D_2(0,1,0,0)=(0,0).
$$

長さ2の周期平行移動をどれだけ施しても $(1,0)$ は $(1,0)$ か $(0,1)$ にしかならず、$(0,0)$ にはならない。よって一般の1点移動に対応する出力平行移動は存在しない。$\square$
<!-- proof-end -->

特定の核・入力ではたまたま差がゼロでも、全信号について等変という定義を満たしたことにはならない。平均プーリングや最大プーリングも間引きを伴うときは、入力の位相（どの剰余類で採択するか）に敏感になりうる。

## 6. 共有した重みをどう微分するか

位置 $i$ で使った核の重み $W_{o,c,r}$ は別の位置でも再利用される。損失をこの重みで微分すると、位置ごとの影響を**足し合わせる**必要がある。[逆モード連鎖律の分岐和](../ML2-14/index.md#thm-ml2-14-reverse-chain)を具体的な添字へ落とす。

損失 $L$ を多チャネル層の前活性 $z$ の微分可能な実数値関数とし、$\delta_{o,i}=\partial L/\partial z_{o,i}$ と書く。もし活性化 $\rho$ を通すなら、その点で微分可能な場合 $\delta_{o,i}=(\partial L/\partial y_{o,i})\rho'(z_{o,i})$ である。ReLUの折点では通常の微分は存在せず、実装で選んだ算法上の値を使うときは数学的導関数と区別する。

<a id="prop-ml2-16-backprop"></a>

<!-- formal-statement-start -->
> **命題（畳み込み層の逆伝播）**
> $N\ge2$、$K\ge1$、チャネル数 $C_{\rm in},C_{\rm out}\ge1$ とし、周期畳み込み前活性

$$
z_{o,i}=b_o+\sum_{c=1}^{C_{\rm in}}\sum_{r=0}^{K-1}
W_{o,c,r}x_{c,(i+r)\bmod N}
$$

> を定める。$L:\mathbb R^{C_{\rm out}\times N}\to\mathbb R$ が $z$ で微分可能で、$\delta_{o,i}=\partial L/\partial z_{o,i}$ とする。このとき

$$
\begin{aligned}
\frac{\partial L}{\partial W_{o,c,r}}
&=\sum_{i=0}^{N-1}\delta_{o,i}x_{c,(i+r)\bmod N},\\
\frac{\partial L}{\partial b_o}
&=\sum_{i=0}^{N-1}\delta_{o,i},\\
\frac{\partial L}{\partial x_{c,j}}
&=\sum_{o=1}^{C_{\rm out}}\sum_{r=0}^{K-1}
\delta_{o,(j-r)\bmod N}W_{o,c,r}
\end{aligned}
$$

> が成り立つ。$\delta$ に平均損失の $1/n$ 等が含まれている場合、それをさらに重ねて掛けない。
<!-- formal-statement-end -->

### 証明の見取り図

一つの出力 $z_{o,i}$ では、$W_{o,c,r}$ は $x_{c,i+r}$ と一緒に一回現れる。一つの入力 $x_{c,j}$ は、$j=i+r\bmod N$ を満たす複数の出力へ流れるので、そのすべての勾配を足す。

<!-- proof-start -->
### 証明

[多層網の逆伝播](../ML2-14/index.md#thm-ml2-14-backprop)で用いた有限次元の連鎖律により、任意のパラメータ $u$ について

$$
\frac{\partial L}{\partial u}
=\sum_{o'=1}^{C_{\rm out}}\sum_{i=0}^{N-1}
\frac{\partial L}{\partial z_{o',i}}
\frac{\partial z_{o',i}}{\partial u}.
$$

$u=W_{o,c,r}$ の場合、$z_{o',i}$ にこの係数が現れるのは $o'=o$ のときだけで、その係数は $x_{c,(i+r)\bmod N}$ である。従って

$$
\frac{\partial L}{\partial W_{o,c,r}}
=\sum_i\delta_{o,i}x_{c,(i+r)\bmod N}.
$$

$u=b_o$ では $z_{o',i}$ の微分は $o'=o$ のとき1、他は0なので $\partial L/\partial b_o=\sum_i\delta_{o,i}$。

最後に $u=x_{c,j}$ とする。固定した $o,i,r$ の和に $x_{c,j}$ が現れる条件は $j\equiv i+r\pmod N$、同値に $i\equiv j-r\pmod N$ である。よって

$$
\begin{aligned}
\frac{\partial z_{o,i}}{\partial x_{c,j}}
&=\sum_{\substack{0\le r<K\\i+r\equiv j\pmod N}}W_{o,c,r},\\
\frac{\partial L}{\partial x_{c,j}}
&=\sum_o\sum_i\delta_{o,i}
\sum_{\substack{0\le r<K\\i+r\equiv j\pmod N}}W_{o,c,r}\\
&=\sum_o\sum_{r=0}^{K-1}\delta_{o,(j-r)\bmod N}W_{o,c,r}.
\end{aligned}
$$

最後は和の順序を有限和なので交換した。$K>N$ でも、同じ入力位置へ対応する複数の $r$ をそれぞれ足すため公式は成立する。$\square$
<!-- proof-end -->

### 三点周期信号で勾配を検算

一チャネル、$N=3$、$K=2$、$x=(1,2,0)$、$k=(2,-1)$、バイアス0とする。前向き値は

$$
z=(2\cdot1-2,\;2\cdot2-0,\;2\cdot0-1)=(0,4,-1).
$$

ある微分可能損失に対する前活性の勾配が $\delta=(1,-1,2)$ だったとする（例えば線形損失 $L(z)=z_0-z_1+2z_2$）。[畳み込み層の逆伝播](#prop-ml2-16-backprop)を $c=o=1$ の場合に適用すると

$$
\begin{aligned}
\frac{\partial L}{\partial k_0}&=1(1)+(-1)(2)+2(0)=-1,\\
\frac{\partial L}{\partial k_1}&=1(2)+(-1)(0)+2(1)=4,\\
\frac{\partial L}{\partial b}&=1-1+2=2.
\end{aligned}
$$

入力勾配も、$j=0,1,2$ のそれぞれで出力から来る寄与を拾い、

$$
\begin{aligned}
\frac{\partial L}{\partial x_0}&=\delta_0k_0+\delta_2k_1=2-2=0,\\
\frac{\partial L}{\partial x_1}&=\delta_1k_0+\delta_0k_1=-2-1=-3,\\
\frac{\partial L}{\partial x_2}&=\delta_2k_0+\delta_1k_1=4+1=5.
\end{aligned}
$$

これは重みを3つの位置で別々に学習させた場合とは異なる。同じ核係数を使ったすべての場所からの寄与を一つの重み勾配へ足している。

## 7. 分類器の出力で等変性を不変性へ変える

位置を保ったまま模様を検出したい場面では等変性が便利だ。一方、画像全体に何が写っているかを答える分類では、位置を変えても同じクラス得点にしたいことがある。各チャネルにおける位置の平均を取る**大域平均プーリング**は一つの明確な方法である。

<a id="prop-ml2-16-global-average"></a>

<!-- formal-statement-start -->
> **命題（大域平均プーリングの平行移動不変性）**
> $N\ge2$、$C\ge1$ とする。$G:\mathbb R^{C\times N}\to\mathbb R^C$ を

$$
G(y)_c=\frac1N\sum_{i=0}^{N-1}y_{c,i}
$$

> で定める。各チャネルに同じ周期平行移動 $T_s$ を行うと、任意の $y,s$ に対して $G(T_sy)=G(y)$ が成り立つ。従って周期平行移動等変な特徴写像 $F$ に対して $G\circ F$ は周期平行移動不変である。
<!-- formal-statement-end -->

### 証明の見取り図

周期平行移動は全位置を一度ずつ並べ替えるので、和を取ると位置の情報が消える。

<!-- proof-start -->
### 証明

任意のチャネル $c$ を固定する。$i\mapsto j=(i-s)\bmod N$ は $\{0,\ldots,N-1\}$ の全単射だから

$$
G(T_sy)_c=\frac1N\sum_{i=0}^{N-1}y_{c,(i-s)\bmod N}
=\frac1N\sum_{j=0}^{N-1}y_{c,j}=G(y)_c.
$$

各チャネルで成り立つ。さらに等変な $F$ なら[等変性の定義](#def-ml2-16-equivariance)から

$$
(G\circ F)(T_sx)=G(T_sF(x))=G(F(x)).
$$

よって不変である。$\square$
<!-- proof-end -->

例えば特徴マップ $(0,4,1,-3)$ の平均は $1/2$ であり、一つずらした $(-3,0,4,1)$ でも平均は $1/2$ である。ただし zero padding・stride付き層が途中に入れば等変性の前提が壊れうる。平均化を最後に足しただけで、元の入力に対する厳密な不変性を無条件に回復できるわけではない。

### 二次元画像への拡張

高さ $H$、幅 $W$ の周期画像では位置を $(i,j)$、核内位置を $(r,t)$ とし、両座標をそれぞれ $H,W$ で還元して

$$
z_{o,i,j}=b_o+
\sum_{c=1}^{C_{\rm in}}\sum_{r=0}^{R-1}\sum_{t=0}^{S-1}
W_{o,c,r,t}\,
x_{c,(i+r)\bmod H,(j+t)\bmod W}
$$

と置く。入力を縦 $a$・横 $b$ だけずらすなら、式の $i,j$ を $i-a,j-b$ へ置き換えるだけで、1次元と同じ成分証明を行える。学習パラメータ数は $C_{\rm out}C_{\rm in}RS+C_{\rm out}$。実画像のゼロ埋め境界や縦横strideの問題も各軸に現れる。

## 8. 計算ラボ：同じ核で動かしたときの特徴マップ

周期境界とzero paddingの違い、strideにより失う移動の種類をNumPyで確認する。入力信号は固定した乱数初期値から作る整数値、核は二係数を基本とし、**畳み込みは反転なしの相互相関**として自分で実装する。既存ライブラリの畳み込み関数へ任せず、式と添字が一致するかを確かめよう。

変更できる量は乱数初期値、核係数、境界モード、stride、入力移動量である。出力は元の特徴マップ、移動入力の特徴マップ、比較先との差分最大絶対値を表示する。差分が小さいことは特定の入力での観測であり、全入力に対する定理の証明とは区別する。

演習用コードでは未記入の2か所を埋める。最初は周期境界・stride 1・1点移動で残差0を観測し、次にzero padding、stride 2へ切り替える。stride 2で1点だけ動かした場合には、出力の正しい1点移動は存在しないので、比較相手を**便宜的なゼロ点移動**として表示し、理論上の等変性検定として誤読しない。

```python-lab
import numpy as np
import matplotlib.pyplot as plt

def conv1d(x, kernel, boundary="periodic", stride=1):
    x = np.asarray(x, dtype=float)
    kernel = np.asarray(kernel, dtype=float)
    n = len(x)
    assert n >= 2 and len(kernel) >= 1 and n % stride == 0
    out = np.zeros(n, dtype=float)
    for i in range(n):
        for r, weight in enumerate(kernel):
            j = i + r
            if boundary == "periodic":
                out[i] += weight * x[___]  # ヒント: 周期添字
            elif boundary == "zero":
                if j < n:
                    out[i] += weight * x[j]
            else:
                raise ValueError("boundary must be periodic or zero")
    return out[::stride]

def move(x, s, boundary):
    x = np.asarray(x, dtype=float)
    if boundary == "periodic":
        return np.roll(x, s)
    # 右への平行移動を左端の0埋めで定義。0 <= s <= len(x)
    assert 0 <= s <= len(x)
    out = np.zeros_like(x)
    if s < len(x):
        out[s:] = x[:len(x)-s]
    return out

def experiment(seed=2716, kernel=(2., -1.), boundary="periodic",
               stride=1, shift=1):
    rng = np.random.default_rng(seed)
    x = rng.integers(-3, 4, size=12).astype(float)
    y = conv1d(x, kernel, boundary, stride)
    y_shifted = conv1d(move(x, shift, boundary), kernel, boundary, stride)
    if boundary == "periodic" and shift % stride == 0:
        expected = np.roll(y, ___)  # ヒント: 出力での移動量
    else:
        expected = move(y, shift // stride, boundary)
    residual = float(np.max(np.abs(y_shifted - expected)))
    return x, y, y_shifted, expected, residual

x, y, shifted, expected, error = experiment()
print("input:", x, "feature:", y, "max difference:", error)
fig, axes = plt.subplots(2, 1, figsize=(8, 5))
axes[0].step(range(len(x)), x, where="mid", label="input")
axes[0].set_ylabel("signal value"); axes[0].legend()
axes[1].step(range(len(shifted)), shifted, where="mid", label="filter(shift input)")
axes[1].plot(range(len(expected)), expected, "o--", label="shift(filter input)")
axes[1].set_xlabel("output position"); axes[1].set_ylabel("feature value")
axes[1].legend(); plt.tight_layout(); plt.show()
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

def conv1d(x, kernel, boundary="periodic", stride=1):
    x = np.asarray(x, dtype=float)
    kernel = np.asarray(kernel, dtype=float)
    n = len(x)
    assert n >= 2 and len(kernel) >= 1 and n % stride == 0
    out = np.zeros(n, dtype=float)
    for i in range(n):
        for r, weight in enumerate(kernel):
            j = i + r
            if boundary == "periodic":
                out[i] += weight * x[j % n]
            elif boundary == "zero":
                if j < n:
                    out[i] += weight * x[j]
            else:
                raise ValueError("boundary must be periodic or zero")
    return out[::stride]

def move(x, s, boundary):
    x = np.asarray(x, dtype=float)
    if boundary == "periodic":
        return np.roll(x, s)
    assert 0 <= s <= len(x)
    out = np.zeros_like(x)
    if s < len(x):
        out[s:] = x[:len(x)-s]
    return out

def experiment(seed=2716, kernel=(2., -1.), boundary="periodic",
               stride=1, shift=1):
    rng = np.random.default_rng(seed)
    x = rng.integers(-3, 4, size=12).astype(float)
    y = conv1d(x, kernel, boundary, stride)
    y_shifted = conv1d(move(x, shift, boundary), kernel, boundary, stride)
    if boundary == "periodic" and shift % stride == 0:
        expected = np.roll(y, shift // stride)
    else:
        expected = move(y, shift // stride, boundary)
    residual = float(np.max(np.abs(y_shifted - expected)))
    return x, y, y_shifted, expected, residual

x, y, shifted, expected, error = experiment()
print("input:", x, "feature:", y, "max difference:", error)
fig, axes = plt.subplots(2, 1, figsize=(8, 5))
axes[0].step(range(len(x)), x, where="mid", label="input")
axes[0].set_ylabel("signal value"); axes[0].legend()
axes[1].step(range(len(shifted)), shifted, where="mid", label="filter(shift input)")
axes[1].plot(range(len(expected)), expected, "o--", label="shift(filter input)")
axes[1].set_xlabel("output position"); axes[1].set_ylabel("feature value")
axes[1].legend(); plt.tight_layout(); plt.show()
```

```python-test
x, y, shifted, expected, e = experiment(seed=2716)
assert len(x) == len(y) == 12
assert np.array_equal(shifted, expected) and e == 0.
assert np.array_equal(conv1d([1, 2, 0, -1], [2, -1]), [0, 4, 1, -3])
assert np.array_equal(conv1d([1, 0, 0], [0, 1], "zero"), [0, 0, 0])
assert np.array_equal(conv1d([0, 1, 0], [0, 1], "zero"), [1, 0, 0])
assert np.array_equal(conv1d([1, 0, 0, 0], [1], "periodic", 2), [1, 0])
assert np.array_equal(conv1d([0, 1, 0, 0], [1], "periodic", 2), [0, 0])
for s in (0, 2, 4, 6):
    _, _, a, b, residual = experiment(2716, (2., -1.), "periodic", 2, s)
    assert np.allclose(a, b) and residual < 1e-12
x2, y2, _, _, _ = experiment(seed=2717)
assert not np.array_equal(x, x2) and not np.array_equal(y, y2)
_, ya, _, _, _ = experiment(kernel=(1., 1.))
assert not np.array_equal(y, ya)
assert np.isfinite(experiment(boundary="zero", stride=1)[-1])
assert np.isfinite(experiment(boundary="periodic", stride=2)[-1])
```

実行時は数値と図の両方を比べる。周期境界なら移動量がstrideの倍数のとき残差は丸め誤差の範囲で0になる。zero paddingでは端をまたぐ寄与の違いが、stride 2・1点移動では採択する剰余類の違いが現れやすい。核を零にした場合のように偶然差がゼロになる設定もあり、非等変性を**一つの入力の誤差0から否定することはできない**。第4・5節の反例が全称命題を否定する証拠である。

## 9. 演習

### ML2-16-A01 周期移動を直接計算する

- Level: A

長さ5の周期信号 $x=(2,-1,0,3,4)$ に対し $T_2x$ と $T_{-1}x$ を求め、$T_{-1}T_2x=T_1x$ を成分で確認せよ。

<!-- solution-start -->
### 詳細解答

[周期移動の定義](#def-ml2-16-equivariance)によれば $(T_sx)_i=x_{i-s\bmod5}$ である。$s=2$ の場合は順に入力添字 $3,4,0,1,2$ を見るから

$$
T_2x=(3,4,2,-1,0).
$$

$s=-1$ では入力添字 $1,2,3,4,0$ を見るので

$$
T_{-1}x=(-1,0,3,4,2).
$$

さらに $T_{-1}(T_2x)$ は $T_2x$ の添字を一つ進め、$(4,2,-1,0,3)$。一方 $T_1x$ は入力添字 $4,0,1,2,3$ を読むため $(4,2,-1,0,3)$ で一致する。移動量は $-1+2=1$ である。
<!-- solution-end -->

### ML2-16-A02 相互相関と数学の畳み込み

- Level: A

長さ3の周期信号 $x=(1,2,4)$、核 $k=(1,-2)$ とする。反転なしの相互相関 $C_kx$ を計算し、数学的な畳み込み $\sum_{r=0}^{1}k_rx_{i-r\bmod3}$ の値と比較せよ。

<!-- solution-start -->
### 詳細解答

[相互相関の定義](#def-ml2-16-periodic-correlation)から $i=0,1,2$ に対し

$$
\begin{aligned}
(C_kx)_0&=1(1)-2(2)=-3,\\
(C_kx)_1&=1(2)-2(4)=-6,\\
(C_kx)_2&=1(4)-2(1)=2.
\end{aligned}
$$

反転なしでは $(-3,-6,2)$。一方 $x_{i-r}$ 型なら、核の $r=1$ の相手は一つ左の入力となり、

$$
\begin{aligned}
i=0 &:1(1)-2(4)=-7,\\
i=1 &:1(2)-2(1)=0,\\
i=2 &:1(4)-2(2)=0.
\end{aligned}
$$

よって $(-7,0,0)$。核の向きが異なるため、通常は出力も違う。
<!-- solution-end -->

### ML2-16-A03 パラメータ数

- Level: A

入力4チャネル、出力8チャネル、位置数 $N=100$、核幅3、出力チャネルごとに共有バイアス一つの周期畳み込み層を考える。入出力形状、パラメータ数を求め、同じ入出力を結ぶ完全結合線形層と比較せよ。

<!-- solution-start -->
### 詳細解答

[多チャネル畳み込み層](#def-ml2-16-multichannel)の定義から入力は $4\times100$、出力は $8\times100$。核係数は出力8、入力4、幅3の組ごとに一つあるので $8\cdot4\cdot3=96$。バイアスは8個、計104個である。

全結合なら400入力・800出力なので重み $800\cdot400=320000$ とバイアス800で320800個。畳み込みの104個は、位置が違っても同じ96個の核係数と8個のバイアスを再利用して得られる。入力の位置によらない重み共有を仮定していることを忘れてはならない。
<!-- solution-end -->

### ML2-16-A04 zero paddingの端

- Level: A

長さ3の信号 $x=(1,0,0)$、核 $k=(0,1)$ を使い、右側0埋めの $P_k$ と周期畳み込み $C_k$ の結果を求めよ。どの位置で両者が違うか示せ。

<!-- solution-start -->
### 詳細解答

右側0埋めの定義は $(P_kx)_i=0\cdot x_i+1\cdot\bar x_{i+1}$ だから、位置0,1,2では順に $x_1=0,x_2=0,\bar x_3=0$ を読む。よって $P_kx=(0,0,0)$。

[周期相互相関](#def-ml2-16-periodic-correlation)では添字3を $3\bmod3=0$ に戻す。したがって位置2の値が $x_0=1$ になり $C_kx=(0,0,1)$。差は最後の位置だけで、周期的に結合させるか、領域外を0とするかが変わっている。
<!-- solution-end -->

### ML2-16-B01 二つの層の受容野と等変性

- Level: B

幅2の核 $a=(a_0,a_1)$、$b=(b_0,b_1)$ で、長さ $N\ge4$ の周期信号に $C_a$、続けて $C_b$ を作用させる。合成が参照する入力位置を展開し、実効核の3係数を求めよ。また入力を平行移動した場合の等変性を説明せよ。

<!-- solution-start -->
### 詳細解答

第二層の出力位置 $i$ は第一層の出力 $v_i,v_{i+1}$ を見る。$v_i=a_0x_i+a_1x_{i+1}$ と置くと

$$
\begin{aligned}
(C_bC_ax)_i
&=b_0v_i+b_1v_{i+1}\\
&=b_0(a_0x_i+a_1x_{i+1})
 +b_1(a_0x_{i+1}+a_1x_{i+2})\\
&=a_0b_0x_i+(a_1b_0+a_0b_1)x_{i+1}+a_1b_1x_{i+2}.
\end{aligned}
$$

従って実効核は $(a_0b_0,a_1b_0+a_0b_1,a_1b_1)$、元の位置 $i,i+1,i+2$ を参照する。[周期等変性定理](#thm-ml2-16-equivariant-convolution)が各層に成り立つから、任意の $s$ について

$$
C_bC_aT_sx=C_bT_sC_ax=T_sC_bC_ax.
$$

1層の受容野は2点でも、二層の合成は3点を見る。非線形活性化を途中に挟んだ場合は一般に一つの線形実効核へまとめられないが、[点ごと活性化の等変性](#prop-ml2-16-layer-equivariance)は保たれる。
<!-- solution-end -->

### ML2-16-B02 strideの位相

- Level: B

$N=6$、$d=3$、$k=(1)$、周期信号 $x=(1,0,0,0,0,0)$ とする。$D_3C_kx$、$D_3C_k(T_1x)$、$D_3C_k(T_3x)$ を求め、[strideで残る等変性](#prop-ml2-16-stride-equivariance)と比較せよ。

<!-- solution-start -->
### 詳細解答

核 $(1)$ は恒等演算なので $C_kx=x$。$D_3$ は位置0,3を採用し、元の出力は $(1,0)$ となる。

1点移動後は $T_1x=(0,1,0,0,0,0)$ だから採用位置の両方が0で、$D_3C_k(T_1x)=(0,0)$。これは $(1,0)$ の長さ2の平行移動では表せない。

一方 $T_3x=(0,0,0,1,0,0)$ は位置3だけ1なので $D_3C_k(T_3x)=(0,1)$。長さ2で一つ右へ動かした $T_1^{(2)}(1,0)$ と一致する。入力の移動量3はstride3の倍数なので、命題の $a=1$ に対応する。
<!-- solution-end -->

### ML2-16-B03 入力勾配と共有重み勾配

- Level: B

周期信号 $x=(1,2,0)$、幅2の核 $k=(2,-1)$、バイアス0、損失 $L(z)=z_0-z_1+2z_2$（$z=C_kx$）を考える。核の2勾配、入力の3勾配を導き、有限差分で確認する式も一つ書け。

<!-- solution-start -->
### 詳細解答

$z=(0,4,-1)$ で、損失は $L=0-4+2(-1)=-6$、各出力への微分は $\delta=(1,-1,2)$ である。[逆伝播の命題](#prop-ml2-16-backprop)では核係数は全位置の寄与を受けるから

$$
\begin{aligned}
\partial_{k_0}L&=\delta_0x_0+\delta_1x_1+\delta_2x_2=1-2+0=-1,\\
\partial_{k_1}L&=\delta_0x_1+\delta_1x_2+\delta_2x_0=2+0+2=4.
\end{aligned}
$$

入力へは後向きの核添字が現れ、

$$
\begin{aligned}
\partial_{x_0}L&=\delta_0k_0+\delta_2k_1=2-2=0,\\
\partial_{x_1}L&=\delta_1k_0+\delta_0k_1=-2-1=-3,\\
\partial_{x_2}L&=\delta_2k_0+\delta_1k_1=4+1=5.
\end{aligned}
$$

例えば $k_1$ について摂動 $\varepsilon\ne0$ を用いた中央差分を

$$
\frac{L(k_0,k_1+\varepsilon)-L(k_0,k_1-\varepsilon)}{2\varepsilon}
$$

と書く。ここでは損失が核に線形なので、両側の損失差は厳密に $8\varepsilon$、商は4となる。一般の非線形損失では差分と解析勾配の差を収束幅・丸め誤差を考慮して比較する。
<!-- solution-end -->

### ML2-16-B04 ラボの「誤差ゼロ」をどう解釈するか

- Level: B

第8節の数値ラボにおいて核 $k=(0,0)$ とすると、zero paddingでもstride 2でも特徴マップの移動比較差分は0になる。この観測から「zero paddingとstride 2は等変」と結論できない理由を、等変性の量化条件と反例を使って説明せよ。さらに実験で確認すべきケースを挙げよ。

<!-- solution-start -->
### 詳細解答

核が零なら、どの入力も出力は零ベクトルである。従って入力を移動しても、零ベクトルの任意の移動と等しくなる。しかし[等変性の定義](#def-ml2-16-equivariance)は核を固定した写像についてすべての入力・すべての移動量に対して等しいことを要求する。ある核が等変だからといって、別の非零核を含む層の設計全体が等変であるとは言えない。

実際zero paddingでは第4節の $x=(1,0,0)$、$k=(0,1)$、1点移動で出力が $(1,0,0)$ と $(0,0,0)$ に分かれる。stride 2では[命題の反例](#prop-ml2-16-stride-equivariance)の $N=4$、$x=(1,0,0,0)$、$k=(1)$ が、1点移動後に非零値の採択を失う。

ラボでは少なくとも非零核、境界へ近い非零入力、strideで割り切れない移動量を試し、さらに周期境界でstrideの倍数移動をした対照設定と比較する。誤差0の有限実験は一般定理の証明にならず、誤差非零の一例は全称的等変性への反例となる。
<!-- solution-end -->

### ML2-16-C01 共有重み・等変性・不変分類器の設計

- Level: C

長さ $N=4$ の周期信号 $x=(1,2,0,-1)$ と核 $k=(2,-1)$ を使い、次のネットワークを考える。まずバイアス $b=1$ を加えた特徴マップ $z_i=b+(C_kx)_i$、次に $\rho(t)=\max(0,t)$ による $y_i=\rho(z_i)$、最後にクラス得点 $g(x)=\frac14\sum_{i=0}^3y_i$ を得る。

1. $z,y,g(x)$ を手計算せよ。
2. 入力を一つ右へ周期移動させた場合の各中間出力と $g(T_1x)$ を求め、一般の入力でも $g(T_sx)=g(x)$ となる理由を示せ。
3. バイアスを位置依存の $b_i=(1,2,1,1)$ に変えた場合、同じ等変性の証明が破れる箇所を明示し、$x=0$ で反例を作れ。
4. 周期境界をzero paddingへ、またはstrideを2へ変えたとき、前半の不変性保証をそのまま適用できるか、使えない仮定を明示せよ。

<!-- solution-start -->
### 詳細解答

1. [周期相互相関の定義](#def-ml2-16-periodic-correlation)から $C_kx=(0,4,1,-3)$。バイアス1を各位置へ足すので

$$
z=(1,5,2,-2),\qquad
y=(1,5,2,0),\qquad
g(x)=\frac{1+5+2+0}{4}=2.
$$

2. $T_1x=(-1,1,2,0)$ である。[周期畳み込み等変性](#thm-ml2-16-equivariant-convolution)によって $C_k(T_1x)=(-3,0,4,1)$ である。共有バイアスを加えた後、同じReLUを適用すると

$$
z' =(-2,1,5,2)=T_1z,\qquad
y'=(0,1,5,2)=T_1y.
$$

したがって $g(T_1x)=(0+1+5+2)/4=2$。一般の入力でも、[多チャネル畳み込みと点ごと活性化の等変性](#prop-ml2-16-layer-equivariance)から $F(T_sx)=T_sF(x)$、[大域平均の不変性](#prop-ml2-16-global-average)から $G(T_sF(x))=G(F(x))$ であるため $g=G\circ F$ は不変となる。

3. 位置依存バイアス $b=(1,2,1,1)$ を使うと、平行移動後の前活性は $C_k(T_sx)+b$、一方で元の前活性を移動すれば $T_s(C_kx)+T_sb$。一般に $b\ne T_sb$ なので一致しない。反例として $x=(0,0,0,0)$ を使うと $C_kx=0$、よって活性化後 $F(x)=\rho(b)=(1,2,1,1)$。入力を移動しても零のままなので $F(T_1x)=(1,2,1,1)$ だが $T_1F(x)=(1,1,2,1)$ となり、等変性は破れる。ただしこれだけで最終スカラーの不変性まで破れるとまでは言えず、等変性に依存した保証が失われたことを示した。

4. zero paddingでは有限領域の切り出しが平行移動と可換でない（第4節）。stride 2では1点移動の入力が同じ剰余類へ写らず、[strideの命題](#prop-ml2-16-stride-equivariance)は2点移動等に限って成立する。どちらも第2問で援用した $F(T_sx)=T_sF(x)$ の前提を無条件に満たさない。従ってその証明を流用できない。特定の入力・核では得点が一致しても、新たな不変性の証明が必要である。
<!-- solution-end -->

## 10. まとめと次への接続

畳み込み層は各位置で同じ局所フィルタを使うことで、学習パラメータを減らすと同時に**周期平行移動等変**という構造を組み込む。多チャネル化と点ごとの非線形性はこの性質を保ち、最後の大域平均は位置依存の特徴マップを不変な得点へ変えられる。

しかしzero padding、有限領域への切り出し、strideでは一般の平行移動についての保証が変わる。画像タスクへ適用するときは、演算の名前だけで「平行移動に強い」と言わず、**境界の扱い、間引く位置、比較する変換**を具体的に指定しなければならない。共有重みの勾配には空間位置からの寄与がすべて足されるので、実装時にも添字の追跡が重要である。

次講 **ML2-17** では、空間方向の重み共有から時間方向の状態更新へ視点を移し、再帰ネットワークで同じ状態遷移のJacobianが繰り返し掛かることと勾配消失・爆発を調べる。
