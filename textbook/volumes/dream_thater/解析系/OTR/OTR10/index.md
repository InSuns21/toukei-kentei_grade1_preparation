# OTR10 W1はLipschitz関数で測れるか

前章までに、二つの確率測度を結合し、運んだ距離の平均を最小化する [1-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein) を得ました。しかし、最小化すべき結合を直接探すのは、連続空間では容易ではありません。

別の方法を考えます。場所ごとに「観測値」を割り当て、その観測値が距離1当たり高々1だけ変わるよう制限します。その観測値の平均が二つの分布でどれだけ違うかを測れば、輸送しなければならない距離の下界になります。驚くべきことに、適切な仮定の下では**この下界だけで輸送費用を完全に復元できます**。

この章では、有限離散輸送の双対から始め、[有限原子近似](../OTR9/index.md#thm-otr9-separable)により一般のPolish空間へ進みます。

## 1. 距離以上に速く変化しない関数

点 $x$ と $y$ が近いなら観測値 $f(x)$ と $f(y)$ も近い、という制限を数量化します。距離空間の点であればよく、微分可能性は必要ありません。

<a id="def-otr10-lipschitz"></a>

<!-- formal-statement-start -->
> **定義（Lipschitz半ノルムと正規化）**
> $(X,d)$ を非空の距離空間とし、$f:X\to\mathbb R$ を実数値関数とする。$X$ に異なる二点があるとき、Lipschitz半ノルムを

$$
\|f\|_{\mathrm{Lip}}=\sup_{x\ne y}\frac{|f(x)-f(y)|}{d(x,y)}
$$

> と定める。$X$ が一点だけなら $\|f\|_{\mathrm{Lip}}=0$ とする。この値が有限の関数をLipschitz関数といい、$\|f\|_{\mathrm{Lip}}\le1$ を満たす関数を1-Lipschitz関数という。点 $o\in X$ を固定したときの基準点正規化は $f(o)=0$ という条件である。
<!-- formal-statement-end -->

分母が正であるのは異なる点だけを使うからです。Lipschitz定数が $1$ 以下という条件は、すべての $x,y$ について

$$
|f(x)-f(y)|\le d(x,y)
$$

が成立することと同じです。これから連続性も従います。任意の定数 $a$ に対し $\|f+a\|_{\mathrm{Lip}}=\|f\|_{\mathrm{Lip}}$ なので、定数を見分けられない「半」ノルムです。

<!-- definition-example-start: def-otr10-lipschitz -->
**定義の確認**（直接例）。$X=\mathbb R$、$d(x,y)=|x-y|$ とすると、$f(x)=x$ は

$$
\frac{|f(x)-f(y)|}{|x-y|}=1\qquad(x\ne y)
$$

だから $\|f\|_{\mathrm{Lip}}=1$、かつ $f(0)=0$ です。一方、$g(x)=2x$ は比が常に2なので1-Lipschitzではありません。さらに任意の距離空間で $f(x)=d(x,o)$ は、距離の逆三角不等式

$$
|d(x,o)-d(y,o)|\le d(x,y)
$$

によって1-Lipschitzであり、$f(o)=0$ です。定数関数の半ノルムは0です。
<!-- definition-example-end -->

## 2. 観測値の差は輸送距離を超えない

[有限1次モーメントの測度](../OTR8/index.md#def-otr8-p-moment) $\mu$ と $\nu$ を考えます。両者に対する同じ関数の積分差は、観測値が分布の変化をどれだけ検知したかを表します。

<a id="lem-otr10-weak"></a>

<!-- formal-statement-start -->
> **補題（Lipschitz検査関数の可積分性と弱双対）**
> $(X,d)$ を非空のPolish空間、$o\in X$、$\mu,\nu\in\mathcal P_1(X)$ とする。$f:X\to\mathbb R$ が1-Lipschitzなら $f$ は $\mu,\nu$ の双方について絶対可積分であり、

$$
\left|\int_X f\,d\mu-\int_X f\,d\nu\right|
\le W_1(\mu,\nu).
$$

> また $f-f(o)$ は基準点で0となる1-Lipschitz関数で、積分差は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

1-Lipschitz条件を片方の点 $o$ に適用すると関数の絶対値を1次モーメントで抑えられます。次にどの結合に対しても、積分差を $f(x)-f(y)$ の積分と書き、その絶対値を輸送費用で抑えます。

<!-- proof-start -->
### 証明

関数はLipschitzゆえ連続であり、Borel可測です。$y=o$ として定義の不等式を適用すると

$$
|f(x)|\le |f(o)|+|f(x)-f(o)|
\le |f(o)|+d(x,o).
$$

$\mu,\nu$ は確率測度であり、右辺はどちらについても積分可能です。したがって二つの積分は有限です。

[許容結合の周辺積分公式](../OTR2/index.md#prop-otr2-marginal-integration)を $\pi\in\Pi(\mu,\nu)$ に適用すると

$$
\int_X f\,d\mu-\int_X f\,d\nu
=\int_{X\times X}(f(x)-f(y))\,d\pi(x,y).
$$

右辺の積分が絶対収束するのは上の可積分性から分かります。したがって

$$
\left|\int f\,d\mu-\int f\,d\nu\right|
\le\int|f(x)-f(y)|\,d\pi
\le\int d(x,y)\,d\pi.
$$

最後の値をすべての結合について下限にすると、[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の $p=1$ の場合から目的の不等式が得られます。$f-f(o)$ のLipschitz定数は変わらず、積分差では両確率測度の総質量が1なので定数項 $f(o)$ が相殺されます。$\square$
<!-- proof-end -->

ここで重要なのは**有界な関数に制限していない**ことです。$f(x)=x$ は実直線上では非有界ですが、$\mathcal P_1$ の仮定で積分できるため、遠くへ移った少量の質量を検出できます。

<a id="def-otr10-discrepancy"></a>

<!-- formal-statement-start -->
> **定義（Lipschitz積分差による双対量）**
> $(X,d)$ を非空のPolish空間、$o\in X$、$\mu,\nu\in\mathcal P_1(X)$ とする。Lipschitz関数による双対量を

$$
D_{\mathrm{Lip}}(\mu,\nu)
=\sup_{\substack{\|f\|_{\mathrm{Lip}}\le1\\f(o)=0}}
\left(\int_X f\,d\mu-\int_X f\,d\nu\right)
$$

> と定める。定数を加えても積分差は不変なので、$f(o)=0$ を外した上限とも等しい。また $f$ と $-f$ がともに許容されるため、絶対値を積分差に付けた上限とも等しい。
<!-- formal-statement-end -->

[弱双対の補題](#lem-otr10-weak)により $0\le D_{\mathrm{Lip}}(\mu,\nu)\le W_1(\mu,\nu)<\infty$ です。ここから知りたいのは最後の不等号を等号にできるか、という一点です。

<!-- definition-example-start: def-otr10-discrepancy -->
**定義の確認**（直接例）。$X=\{0,1\}$ に $d(0,1)=1$ を入れ、$\mu=\tfrac7{10}\delta_0+\tfrac3{10}\delta_1$、$\nu=\tfrac2{10}\delta_0+\tfrac8{10}\delta_1$ とします。$o=0$ とすると $f(0)=0$、$|f(1)|\le1$ であり、

$$
\int f\,d\mu-\int f\,d\nu
=-\frac12 f(1)\le\frac12.
$$

$f(1)=-1$ を選ぶと等号です。また第一周辺の点0から第二周辺の点1へ質量 $1/2$ を送り、それ以外を同一点に置くと費用は $1/2$。逆に第二周辺は点1の質量を $1/2$ 余分に必要とするので、少なくとも $1/2$ を距離1だけ運ばなければなりません。従って $D_{\mathrm{Lip}}=W_1=1/2$ です。
<!-- definition-example-end -->

## 3. 有限輸送ではなぜ一つの関数で十分か

以前の[有限輸送の双対問題](../OTR5/index.md#def-otr5-finite-dual)では、出発点の値 $u_i$ と到着点の値 $v_j$ という**二組**の変数を使いました。費用が距離 $d(x_i,y_j)$ なら、この二組を一つの1-Lipschitz関数へまとめられます。

<a id="lem-otr10-finite"></a>

<!-- formal-statement-start -->
> **補題（有限原子測度のLipschitz双対）**
> $(X,d)$ を非空の距離空間とし、有限個の点に支持された確率測度

$$
\mu=\sum_{i=1}^m a_i\delta_{x_i},
\qquad
\nu=\sum_{j=1}^n b_j\delta_{y_j}
$$

> を考える。$a_i,b_j>0$、$\sum_i a_i=\sum_j b_j=1$ とする。このとき距離費用 $c_{ij}=d(x_i,y_j)$ に関して

$$
W_1(\mu,\nu)
=\max_{\|f\|_{\mathrm{Lip}}\le1}
\left(\sum_i a_i f(x_i)-\sum_j b_j f(y_j)\right).
$$

> 最大値を実現する関数は $X$ 全体で1-Lipschitzに取れる。
<!-- formal-statement-end -->

### 証明の見取り図

有限LP双対の最適解 $(u_i,v_j)$ を取ります。到着点 $y_j$ からの距離に $-v_j$ を足した関数たちの**点ごとの最小値**を作ると、一つの1-Lipschitz関数になります。その関数の積分差は元の双対値以上です。

<!-- proof-start -->
### 証明

費用行列の成分はすべて有限で、行和・列和が指定された有限輸送問題には $\mu\otimes\nu$ に対応する実行可能行列があります。[有限輸送の強双対性](../OTR5/index.md#thm-otr5-strong-duality)より、双対制約

$$
u_i+v_j\le d(x_i,y_j)
\qquad(1\le i\le m,\ 1\le j\le n)
$$

を満たし、双対値 $\sum_i a_i u_i+\sum_jb_j v_j=W_1(\mu,\nu)$ を達成する実数 $(u_i,v_j)$ が存在します。

$X$ 上に次の関数を定めます。

$$
f(z)=\min_{1\le j\le n}\{d(z,y_j)-v_j\}.
$$

各 $j$ に対し、距離の公理 $d(z,y_j)\le d(z,z')+d(z',y_j)$ から

$$
d(z,y_j)-v_j\le d(z,z')+d(z',y_j)-v_j.
$$

右辺の $j$ に関する最小値を取れば $f(z)\le d(z,z')+f(z')$ です。$z,z'$ を交換した不等式もあるので $|f(z)-f(z')|\le d(z,z')$。したがって $f$ は1-Lipschitzです。

各出発点 $x_i$ では、双対制約を $d(x_i,y_j)-v_j\ge u_i$ と書き直してすべての $j$ について最小値を取ると $f(x_i)\ge u_i$ です。一方、各到着点 $y_j$ では、最小値の候補として同じ番号 $j$ を選べるため

$$
f(y_j)\le d(y_j,y_j)-v_j=-v_j.
$$

従って非負の重みを掛けて和を取ると

$$
\sum_i a_i f(x_i)-\sum_j b_j f(y_j)
\ge\sum_i a_i u_i+\sum_j b_j v_j
=W_1(\mu,\nu).
$$

逆向きは[弱双対の補題](#lem-otr10-weak)と同じ結合の評価で成立します（有限支持なのでPolish性も必要ありません）。両辺が等しく、作った $f$ が最大値を実現します。必要なら $f-f(o)$ として基準点正規化できます。$\square$
<!-- proof-end -->

この構成は $d(z,y_j)\le d(z,z')+d(z',y_j)$ を使うため、任意の費用行列に対して成立するわけではありません。また最適な $f$ は存在しても一般に一意ではなく、定数を足す自由度もあります。

## 4. Kantorovich–Rubinstein双対定理

有限原子での等式を無限個の点に広げます。鍵は、[Wasserstein空間の可分性の証明](../OTR9/index.md#thm-otr9-separable)が、確率測度を有限原子測度で **$W_1$ の距離として**近似できると保証している点です。単なる狭義収束では不十分です。

<a id="thm-otr10-kr"></a>

<!-- formal-statement-start -->
> **定理（Kantorovich–Rubinstein双対定理）**
> $(X,d)$ を非空のPolish空間、$o\in X$ とし、$\mu,\nu\in\mathcal P_1(X)$ とする。このとき

$$
W_1(\mu,\nu)
=\sup_{\substack{f:X\to\mathbb R\\\|f\|_{\mathrm{Lip}}\le1,\ f(o)=0}}
\left(\int_X f\,d\mu-\int_X f\,d\nu\right).
$$

> 上限では絶対値を付けても、正規化 $f(o)=0$ を外しても値は変わらない。ここで上限を実現する関数の存在までは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

有限原子近似 $\mu_k,\nu_k$ に対しては前節の等式が成立します。任意の1-Lipschitz関数の積分差は近似の前後で高々 $W_1(\mu,\mu_k)+W_1(\nu,\nu_k)$ だけ変わります。輸送距離自身も三角不等式で同じ誤差以下しか変わらないため、等式を極限へ渡せます。

<!-- proof-start -->
### 証明

まず[有限原子測度の稠密性](../OTR9/index.md#thm-otr9-separable)を $p=1$、基礎空間 $(X,d)$ に適用します。$X$ はPolishで特に可分なので、有限原子確率測度 $\mu_k,\nu_k$ を

$$
\varepsilon_k:=W_1(\mu,\mu_k)+W_1(\nu,\nu_k)\longrightarrow0
$$

となるように選べます。有限支持の測度はすべて $\mathcal P_1(X)$ に属します。

任意の1-Lipschitz関数 $f$ について、[弱双対の補題](#lem-otr10-weak)を組 $(\mu,\mu_k)$ と $(\nu,\nu_k)$ にそれぞれ適用して

$$
\begin{aligned}
&\left|
\left(\int f\,d\mu-\int f\,d\nu\right)
-\left(\int f\,d\mu_k-\int f\,d\nu_k\right)
\right|\\
&\qquad\le W_1(\mu,\mu_k)+W_1(\nu,\nu_k)
=\varepsilon_k
\end{aligned}
$$

を得ます。上限を取るときも各 $f$ に同じ誤差評価が成り立つので、[双対量の定義](#def-otr10-discrepancy)から

$$
|D_{\mathrm{Lip}}(\mu,\nu)-D_{\mathrm{Lip}}(\mu_k,\nu_k)|
\le\varepsilon_k.
$$

具体的には、積分差に対する一方向の不等式の上限を取り、組 $(\mu,\nu)$ と $(\mu_k,\nu_k)$ を交換すれば両方向の評価になります。

一方、[Wasserstein距離の三角不等式](../OTR8/index.md#thm-otr8-metric)を二度使うと

$$
|W_1(\mu,\nu)-W_1(\mu_k,\nu_k)|\le\varepsilon_k.
$$

有限原子測度には[有限版Lipschitz双対](#lem-otr10-finite)を適用でき、正規化は積分差を変えないので

$$
D_{\mathrm{Lip}}(\mu_k,\nu_k)=W_1(\mu_k,\nu_k).
$$

従って三角不等式により

$$
|D_{\mathrm{Lip}}(\mu,\nu)-W_1(\mu,\nu)|
\le2\varepsilon_k\longrightarrow0.
$$

両辺は $k$ に依存しない有限の実数なので、等しくなります。絶対値と正規化については[双対量の定義](#def-otr10-discrepancy)で確認済みです。$\square$
<!-- proof-end -->

Polish性はここでは有限原子による $W_1$ 近似を保証するために使いました。1次モーメントの有限性は、非有界なLipschitz関数の積分が有限であるために使いました。有限段階では最大値が存在しますが、一般の空間へ移る極限からただちに「最大」を得られるわけではないため、定理は「上限」と書いています。

## 5. 下界証明書を手で作る

### 距離関数で一点への輸送を検出する

$o\in X$、$\mu\in\mathcal P_1(X)$ とします。第二周辺が $\delta_o$ の結合は唯一で、[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の $p=1$ の場合から

$$
W_1(\mu,\delta_o)=\int_X d(x,o)\,d\mu(x).
$$

関数 $f(x)=d(x,o)$ は[直接例](#def-otr10-lipschitz)で検証した1-Lipschitz関数です。したがって

$$
\int f\,d\mu-\int f\,d\delta_o
=\int d(x,o)\,d\mu(x)-0
=W_1(\mu,\delta_o).
$$

関数が費用の下界を与え、結合が同じ値の上界を与えました。一般には一方の証明書だけでは最適値は決まりません。両者を一致させるのが有効です。

### Lipschitz写像で運んでも距離はどうなるか

測度を点写像で押し出すときにも、双対表示からすぐ使える評価があります。例えば距離を半分に縮める写像は、分布間の $W_1$ も高々半分に縮めます。

<a id="cor-otr10-contraction"></a>

<!-- formal-statement-start -->
> **系（Lipschitz写像によるW1評価）**
> $(X,d_X)$、$(Y,d_Y)$ を非空のPolish空間とし、$T:X\to Y$ がLipschitz定数 $L\ge0$、すなわち

$$
d_Y(Tx,Tx')\le Ld_X(x,x')
$$

> を満たすとする。このとき任意の $\mu,\nu\in\mathcal P_1(X)$ について $T_\#\mu,T_\#\nu\in\mathcal P_1(Y)$ であり、

$$
W_1(T_\#\mu,T_\#\nu)\le L W_1(\mu,\nu).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$Y$ 上の1-Lipschitz関数 $g$ を $T$ と合成すると、$X$ 上でLipschitz定数が $L$ 以下の関数になります。その積分差を元の $W_1$ で抑えます。

<!-- proof-start -->
### 証明

$o\in X$ として $y_0=T(o)$ を選びます。$d_Y(Tx,y_0)\le Ld_X(x,o)$ なので

$$
\int_Y d_Y(y,y_0)\,d(T_\#\mu)(y)
=\int_X d_Y(Tx,y_0)\,d\mu(x)
\le L\int_X d_X(x,o)\,d\mu(x)<\infty
$$

です。$\nu$ についても同じなので、押し出し測度は $\mathcal P_1(Y)$ に属します。

$L>0$ とします。$Y$ 上の1-Lipschitz関数 $g$ に対して、$h=(g\circ T)/L$ は

$$
|h(x)-h(x')|
\le\frac{d_Y(Tx,Tx')}{L}
\le d_X(x,x')
$$

を満たします。[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)から

$$
\begin{aligned}
\int_Y g\,d(T_\#\mu)-\int_Y g\,d(T_\#\nu)
&=\int_X (g\circ T)\,d\mu-\int_X (g\circ T)\,d\nu\\
&=L\left(\int_X h\,d\mu-\int_X h\,d\nu\right)
\le L W_1(\mu,\nu)
\end{aligned}
$$

です。$h$ は定数を引いて正規化しても積分差が不変なので、最後に[Kantorovich–Rubinstein双対定理](#thm-otr10-kr)を使えます。$g$ 全体について上限を取れば主張が従います。

$L=0$ なら $d_Y(Tx,Tx')=0$ なので $T$ は定数写像です。両押し出しは同じ一点測度となり、左辺は0です。$\square$
<!-- proof-end -->

## 6. 何が検出できて、何が検出できないか

### 狭義収束では見逃す遠方の質量

実直線上で $n\ge1$ に対し

$$
\mu_n=\left(1-\frac1n\right)\delta_0+\frac1n\delta_n,
\qquad \mu=\delta_0
$$

とします。有界連続関数 $h$ に対して

$$
\left|\int h\,d\mu_n-\int h\,d\mu\right|
=\frac{|h(n)-h(0)|}{n}
\le\frac{2\|h\|_\infty}{n}\to0
$$

なので $\mu_n\Rightarrow\mu$ です。しかし $f(x)=x$ は1-Lipschitzで

$$
\int f\,d\mu_n-\int f\,d\mu
=\frac1n\,n=1.
$$

[弱双対の補題](#lem-otr10-weak)は $W_1(\mu_n,\mu)\ge1$ を与えます。第二周辺が $\delta_0$ の結合は唯一で費用は $(1/n)|n|=1$ だから、実際に $W_1=1$ です。これは[Wasserstein収束の特徴付け](../OTR9/index.md#thm-otr9-convergence)とも一致します。狭義収束では**非有界な検査関数を使えない**ことが違いです。

### 有界な検査関数に制限すると別の距離になる

同じ実直線で $\mu=\delta_0$、$\nu=\delta_R$、$R>2$ とします。$W_1(\mu,\nu)=R$ です。一方、$|g(x)|\le1$ かつ $\|g\|_{\mathrm{Lip}}\le1$ の関数に限定すると

$$
\left|\int g\,d\mu-\int g\,d\nu\right|
=|g(0)-g(R)|\le2.
$$

実際 $g(x)=\max(-1,\min(1,1-x))$ は1-Lipschitzかつ絶対値が1以下で、$g(0)=1$、$R>2$ では $g(R)=-1$ です。したがって、この追加の有界条件を課した上限は2で、$W_1=R$ とは異なります。**Lipschitz定数だけを制限する**ことが双対定理の重要な条件です。

## 7. 演習：輸送を探す側と関数を探す側

### OTR10-A01 Lipschitz半ノルムを確認する
- Level: A

$X=\mathbb R$ を通常の距離空間とする。$f(x)=3-2x$、$g(x)=|x-1|$ についてLipschitz半ノルムを求めよ。$g$ が基準点 $o=1$ で正規化されているかも答えよ。

<!-- solution-start -->
**詳細解答**

$x\ne y$ について

$$
\frac{|f(x)-f(y)|}{|x-y|}
=\frac{|-2x+2y|}{|x-y|}=2.
$$

従って $\|f\|_{\mathrm{Lip}}=2$ です。[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を実数の絶対値へ適用すると $|g(x)-g(y)|\le|x-y|$ なので $\|g\|_{\mathrm{Lip}}\le1$ です。$x=2$、$y=1$ を取れば比が1だから等号で、$\|g\|_{\mathrm{Lip}}=1$ です。$g(1)=|1-1|=0$ なので正規化済みです。
<!-- solution-end -->

### OTR10-A02 二点空間の双対量
- Level: A

$X=\{a,b\}$ に $d(a,b)=3$ を入れ、$\mu=\tfrac34\delta_a+\tfrac14\delta_b$、$\nu=\tfrac14\delta_a+\tfrac34\delta_b$ とする。$o=a$ に正規化した1-Lipschitz関数を用いて $D_{\mathrm{Lip}}(\mu,\nu)$ を求め、結合による $W_1$ と照合せよ。

<!-- solution-start -->
**詳細解答**

正規化から $f(a)=0$、Lipschitz条件から $|f(b)|\le3$ です。積分差は

$$
\int f\,d\mu-\int f\,d\nu
=\left(\frac14-\frac34\right)f(b)
=-\frac12f(b)\le\frac32.
$$

$f(b)=-3$ は許容され、上界を達成するので双対量は $3/2$ です。結合として、$(a,a)$、$(a,b)$、$(b,b)$ に順に $1/4$、$1/2$、$1/4$ を置きます。各周辺は指定された $\mu,\nu$ に一致し、その費用は

$$
3\cdot\frac12=\frac32
$$

です。[弱双対](#lem-otr10-weak)で費用は双対量以上だから、この結合が最適で $W_1=3/2$ です。
<!-- solution-end -->

### OTR10-A03 一点測度を距離関数で測る
- Level: A

$X=\mathbb R$、$\mu=\tfrac14\delta_{-2}+\tfrac34\delta_4$、$\nu=\delta_0$ とする。$f(x)=|x|$ が基準点0で正規化された1-Lipschitz関数であることを示し、積分差と $W_1(\mu,\nu)$ を求めよ。

<!-- solution-start -->
**詳細解答**

$||x|-|y||\le|x-y|$ なので $\|f\|_{\mathrm{Lip}}\le1$ です。例えば $x=1,y=0$ では比が1なので等号です。また $f(0)=0$。積分差は

$$
\int f\,d\mu-\int f\,d\nu
=\frac14\cdot2+\frac34\cdot4-0
=\frac72.
$$

第二周辺を $\delta_0$ とする結合は $\mu(dx)\delta_0(dy)$ に限られ、その費用は同じ $7/2$ です。従って $W_1=7/2$ であり、関数の値が最適な下界です。
<!-- solution-end -->

### OTR10-A04 三点距離の判定
- Level: A

$X=\{0,1,3\}$ に実直線から誘導される距離を入れる。$f(0)=0$、$f(1)=1$、$f(3)=-1$ で定まる関数のLipschitz半ノルムを求めよ。1-Lipschitzかどうかをすべての異なる点の組で確認せよ。

<!-- solution-start -->
**詳細解答**

順序を無視した三組だけ検査すればよく、それぞれの比は

$$
\frac{|f(1)-f(0)|}{1}=1,\qquad
\frac{|f(3)-f(1)|}{2}=1,\qquad
\frac{|f(3)-f(0)|}{3}=\frac13.
$$

よって最大値は1で、関数は1-Lipschitzです。基準点0でも正規化されています。
<!-- solution-end -->

### OTR10-A05 定数シフトを消してよい理由
- Level: A

確率測度 $\mu,\nu$ と積分可能なLipschitz関数 $f$ に対して、任意の定数 $c$ について $f+c$ の半ノルムと積分差が変わらないことを示せ。また $\mu(X)\ne\nu(X)$ なら積分差がどう変化するか答えよ。

<!-- solution-start -->
**詳細解答**

任意の二点で $(f(x)+c)-(f(y)+c)=f(x)-f(y)$ なので半ノルムは不変です。一方、

$$
\int(f+c)\,d\mu-\int(f+c)\,d\nu
=\int f\,d\mu-\int f\,d\nu
+c\bigl(\mu(X)-\nu(X)\bigr).
$$

確率測度なら両方の総質量が1で最後の項は0です。総質量が異なれば最後の項は一般に0でなく、$c$ を自由に動かすと積分差は無制限になりえます。確率測度間という仮定が重要です。
<!-- solution-end -->

### OTR10-B01 有限LPの二組の値から一つの関数を作る
- Level: B

$X=\{0,2\}$、$d(x,y)=|x-y|$、$\mu=\delta_0$、$\nu=\delta_2$ とする。出発点の双対値 $u_1=2$、到着点の双対値 $v_1=0$ が有限輸送の双対最適解であることを確認せよ。さらに

$$
f(z)=d(z,2)-v_1
$$

を $X$ 上で作り、1-Lipschitz条件、$f(0)\ge u_1$、$f(2)\le-v_1$、双対目的値を確認せよ。

<!-- solution-start -->
**詳細解答**

唯一の費用は $d(0,2)=2$ です。双対制約は $u_1+v_1\le2$ であり、提案された値では $2+0=2$ だから許容されます。双方の重みは1なので双対目的値は2です。唯一の結合 $\delta_{(0,2)}$ の費用も2だから、[弱双対](../OTR5/index.md#thm-otr5-weak-duality)より最適です。

$f(0)=|0-2|=2$、$f(2)=|2-2|=0$ であり、

$$
|f(0)-f(2)|=2=d(0,2).
$$

従って1-Lipschitzで、$f(0)=u_1$、$f(2)=-v_1$ です。積分差 $f(0)-f(2)=2$ は有限LP双対値と一致します。必要なら $f-f(0)$ で基準点0に正規化しても積分差は2です。
<!-- solution-end -->

### OTR10-B02 近似で積分差が変わる量
- Level: B

$(X,d)$ を非空のPolish空間、$\mu,\nu,\alpha,\beta\in\mathcal P_1(X)$ とする。$D_{\mathrm{Lip}}$ を[定義](#def-otr10-discrepancy)の双対量とする。[弱双対の補題](#lem-otr10-weak)から、次の評価を証明せよ。

$$
|D_{\mathrm{Lip}}(\mu,\nu)-D_{\mathrm{Lip}}(\alpha,\beta)|
\le W_1(\mu,\alpha)+W_1(\nu,\beta).
$$

<!-- solution-start -->
**詳細解答**

任意の正規化された1-Lipschitz関数 $f$ について、[弱双対](#lem-otr10-weak)を二組の測度へ使うと

$$
\left|\int f\,d\mu-\int f\,d\alpha\right|\le W_1(\mu,\alpha),
\qquad
\left|\int f\,d\nu-\int f\,d\beta\right|\le W_1(\nu,\beta).
$$

差を並べ替え、$|A+B|\le|A|+|B|$ を用いて

$$
\int f\,d\mu-\int f\,d\nu
\le\int f\,d\alpha-\int f\,d\beta
+W_1(\mu,\alpha)+W_1(\nu,\beta)
$$

です。左辺を $f$ で上限にすると、右辺の積分差はどの $f$ についても $D_{\mathrm{Lip}}(\alpha,\beta)$ 以下なので

$$
D_{\mathrm{Lip}}(\mu,\nu)
\le D_{\mathrm{Lip}}(\alpha,\beta)+W_1(\mu,\alpha)+W_1(\nu,\beta).
$$

二組を入れ替えて逆向きも得られ、主張が従います。上限を実現する関数がなくてもこの議論は有効です。
<!-- solution-end -->

### OTR10-B03 狭義収束と非有界検査関数
- Level: B

$n\ge1$ について実直線上の $\mu_n=(1-n^{-2})\delta_0+n^{-2}\delta_{n^2}$ と $\mu=\delta_0$ を考える。有界連続関数による狭義収束を示し、1-Lipschitz関数 $f(x)=x$ による積分差を計算せよ。$W_1(\mu_n,\mu)$ は収束するか。

<!-- solution-start -->
**詳細解答**

$n^{-2}\in(0,1]$ で有限支持なので $\mu_n\in\mathcal P_1(\mathbb R)$ です。任意の有界連続 $h$ について

$$
\left|\int h\,d\mu_n-h(0)\right|
=n^{-2}|h(n^2)-h(0)|
\le2\|h\|_\infty n^{-2}\to0.
$$

よって狭義収束します。しかし $f(x)=x$ は1-Lipschitzで、

$$
\int f\,d\mu_n-\int f\,d\mu
=n^{-2}\cdot n^2=1.
$$

[弱双対](#lem-otr10-weak)により $W_1\ge1$ です。第二周辺が一点0なので唯一の結合の費用は $n^{-2}n^2=1$ であり、$W_1=1$ です。遠方の質量は狭義収束の有界検査関数では見えなくても、非有界な1-Lipschitz関数では見えます。
<!-- solution-end -->

### OTR10-B04 有界Lipschitz制約の落とし穴
- Level: B

実直線上で $\mu=\delta_0$、$\nu=\delta_5$ とする。$\|g\|_{\mathrm{Lip}}\le1$ と $|g|\le1$ を同時に要求したときの積分差の絶対値の上限を求め、$W_1(\mu,\nu)$ と比較せよ。上限を実現する関数を一つ与えよ。

<!-- solution-start -->
**詳細解答**

任意の許容 $g$ について $|g(0)-g(5)|\le|g(0)|+|g(5)|\le2$ です。次の関数を取ります。

$$
g(x)=\max(-1,\min(1,1-x)).
$$

これは $x\mapsto1-x$ を区間 $[-1,1]$ に切り詰めた関数です。実数 $a,b$ について $\min(1,a)$ と $\max(-1,a)$ はそれぞれ入力差を増やさないため、合成後も $|g(x)-g(y)|\le|x-y|$ です。

$$
g(0)=1,\qquad g(5)=-1,\qquad |g(0)-g(5)|=2.
$$

全点で $|g|\le1$ だから、求める上限は2です。

一方、唯一の結合 $\delta_{(0,5)}$ の費用は5であり、$W_1(\delta_0,\delta_5)=5$ です。$f(x)=-x$ なら1-Lipschitzで積分差は5ですが、$|f|\le1$ を満たしません。有界性を追加するとKR双対とは異なる量になります。
<!-- solution-end -->

### OTR10-C01 有限LPからPolish空間の双対へ
- Level: C

$(X,d)$ を非空のPolish空間、$o\in X$ とし、$\mu,\nu\in\mathcal P_1(X)$ を任意に取る。次の順序で[Kantorovich–Rubinstein双対](#thm-otr10-kr)を再構成せよ。

1. 1-Lipschitz関数の可積分性と、すべての結合から従う不等式を示す。
2. 有限原子測度で有限LP双対の $(u_i,v_j)$ から $f(z)=\min_j(d(z,y_j)-v_j)$ を作り、両側の値を比較する。
3. $\mu_k,\nu_k$ を $W_1$ で近似する有限原子測度とし、輸送距離と双対上限の各々が近似でどう変わるか評価する。
4. $W_1$ の近似の代わりに狭義収束だけを仮定した場合、なぜ同じ証明にならないか、具体例で説明する。

<!-- solution-start -->
**詳細解答**

**1. 可積分性と弱双対。** 任意の1-Lipschitz関数 $f$ について $|f(x)|\le|f(o)|+d(x,o)$ です。$\mu,\nu\in\mathcal P_1$ なので両積分は有限です。結合 $\pi\in\Pi(\mu,\nu)$ を使うと

$$
\int f\,d\mu-\int f\,d\nu
=\int(f(x)-f(y))\,d\pi
\le\int d(x,y)\,d\pi.
$$

すべての $\pi$ で下限を取れば積分差は $W_1(\mu,\nu)$ 以下です。

**2. 有限版の等式。** $\alpha=\sum_i a_i\delta_{x_i}$、$\beta=\sum_jb_j\delta_{y_j}$ とし、[有限輸送の強双対性](../OTR5/index.md#thm-otr5-strong-duality)から

$$
u_i+v_j\le d(x_i,y_j),\qquad
\sum_i a_iu_i+\sum_jb_jv_j=W_1(\alpha,\beta)
$$

を満たす最適双対値を取ります。$f(z)=\min_j(d(z,y_j)-v_j)$ に対して、三角不等式を各候補へ適用して最小値を取ると $|f(z)-f(z')|\le d(z,z')$ です。双対制約により $f(x_i)\ge u_i$ であり、候補 $j$ の選択により $f(y_j)\le-v_j$ だから

$$
\sum_i a_i f(x_i)-\sum_jb_jf(y_j)
\ge\sum_i a_iu_i+\sum_jb_jv_j
=W_1(\alpha,\beta).
$$

1の弱双対と合わせて等式が成り立ちます。

**3. 極限への移行。** [有限原子測度の $W_1$ 稠密性](../OTR9/index.md#thm-otr9-separable)から

$$
\varepsilon_k=W_1(\mu,\mu_k)+W_1(\nu,\nu_k)\to0
$$

となる有限原子測度を取れます。距離の三角不等式と、1を測度の組 $(\mu,\mu_k)$、$(\nu,\nu_k)$ にそれぞれ適用すると

$$
\begin{aligned}
|W_1(\mu,\nu)-W_1(\mu_k,\nu_k)|&\le\varepsilon_k,\\
|D_{\mathrm{Lip}}(\mu,\nu)-D_{\mathrm{Lip}}(\mu_k,\nu_k)|&\le\varepsilon_k.
\end{aligned}
$$

2で $D_{\mathrm{Lip}}(\mu_k,\nu_k)=W_1(\mu_k,\nu_k)$ だから、差は $2\varepsilon_k$ 以下になり、$k\to\infty$ で双対等式を得ます。

**4. 狭義収束だけでは足りない。** $\mu_k=(1-1/k)\delta_0+(1/k)\delta_k$ は有界連続関数に対して $\delta_0$ に狭義収束します。しかし $f(x)=x$ の積分差は常に1です。したがって3の「どの1-Lipschitz関数でも積分差が一様に小さい」という評価は狭義収束だけでは得られません。有限1次モーメントの一様な尾部制御がないことが破綻の原因です。
<!-- solution-end -->

## 8. この章で得たもの

- [Lipschitz半ノルム](#def-otr10-lipschitz)は観測値の距離当たりの変化率を測り、定数を加えても変わりません。
- [Kantorovich–Rubinstein双対定理](#thm-otr10-kr)は、Polish空間上の $\mathcal P_1$ の二測度間で、輸送の最小平均距離が1-Lipschitz関数の最大積分差（正確には上限）と一致することを保証します。
- 有限LPから[一つのLipschitz関数を作る補題](#lem-otr10-finite)と、[有限原子近似](../OTR9/index.md#thm-otr9-separable)が等式をつなぎます。
- [Lipschitz写像による評価](#cor-otr10-contraction)や、非有界な関数で遠方の質量を検出できることが応用です。

次の OTR11 では、一次元分布の累積分布関数・分位点を使い、最適結合を積分公式で直接計算します。
