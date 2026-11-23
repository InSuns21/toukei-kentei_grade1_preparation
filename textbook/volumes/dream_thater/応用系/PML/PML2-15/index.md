# PML2-15 Neural Operatorの層をどう構成するか

## 1. 解作用素を「共通の重みで計算する」には

[前講の解作用素](../PML2-14/index.md#def-pml2-14-operator)は、連続な右辺関数 $f$ を連続な解関数 $\mathcal G(f)$ へ移した。[Poisson解の積分核](../PML2-14/index.md#thm-pml2-14-green)を知っていれば、任意の $f$ について積分で厳密に解を計算できる。しかし一般の問題では、核を閉じた式として求められるとは限らない。

一つの入力 $f$ ごとに別々の近似解を学習するのではなく、**入力関数が変わっても同じパラメータを使う計算規則**を作りたい。Neural Operatorでは、位置 $x$ の値を直接変換する計算と、別の位置 $t$ の情報を積分して集める計算を組み合わせる。学習するのは関数上の写像のパラメータであり、空間格子上の値だけではない。

この講では区間 $D=[0,1]$、実数値連続入力 $f\in C(D)$ を使い、**連続関数上の定義**と**有限個の節点で計算する近似**を分ける。Fourier係数を用いた高速な層は次講で扱う。

## 2. 一点の値を複数の特徴量へ持ち上げる

入力の値は $f(x)$ という実数一個でも、中間計算で複数の情報を保持したい。例えば $f(x)$ に加えて定数1を保持すれば、後で入力に依存しない項も表せる。位置 $x$ ごとに $m$ 個の実数を並べたベクトル $h(x)\in\mathbb R^m$ を**特徴量**と考える。成分数 $m$ をチャネル数という。

点ごとに同じ写像 $P:\mathbb R\to\mathbb R^m$ を使えば、元の関数をベクトル値関数へ変換できる。たとえば $P(z)=(z,1)$ なら $f(x)=x$ の持ち上げは $h_0(x)=(x,1)$ となり、両成分とも連続である。

<a id="def-pml2-15-lift"></a>

<!-- formal-statement-start -->
> **定義（チャネル表現と持ち上げ）**  
> 整数 $m\ge1$ を固定し、$C(D;\mathbb R^m)$ を、各成分が $D=[0,1]$ 上で連続な関数 $h:D\to\mathbb R^m$ の集合とする。ノルムを

$$
\|h\|_{\infty,m}=\max_{x\in D}\max_{1\le i\le m}|h_i(x)|
$$

> と定める。連続写像 $P:\mathbb R\to\mathbb R^m$ に対し、入力 $f\in C(D)$ の**持ち上げ**を

$$
h_0(x)=P(f(x))\qquad(x\in D)
$$

> と定義する。$h_0\in C(D;\mathbb R^m)$ であり、$h_{0,i}(x)$ を第 $i$ チャネルと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-15-lift -->
**定義の確認**。 $m=2$、$P(z)=(z,1)$、$f(x)=x$ とする。$P$ と $f$ はそれぞれの定義域で連続であり、合成は

$$
h_0(x)=P(f(x))=(x,1)\qquad(0\le x\le1)
$$

となる。二つの成分 $x$ と $1$ はともに $D$ 上で連続だから、$h_0\in C(D;\mathbb R^2)$ である。一様ノルムも定義どおり成分ごとの最大値から計算でき、

$$
\|h_0\|_{\infty,2}
=\max\left\{\max_{0\le x\le1}|x|,\max_{0\le x\le1}|1|\right\}=1.
$$

チャネル数2は「入力を二点で観測する」という意味ではない。**各位置に二つの値がある**という意味である。
<!-- definition-example-end -->

## 3. 一点の変換と、全区間から集める積分

各位置で $h(x)$ に行列 $W\in\mathbb R^{m\times m}$ を掛ければ、その位置のチャネルを混ぜられる。ここでは $h(x)$ を $m$ 成分の**列ベクトル**として行列を左から掛ける。しかし、この操作だけでは他の位置 $t$ にある値を利用できない。

そこで $K(x,t)\in\mathbb R^{m\times m}$ という**積分核**を置く。行列成分 $K_{ij}(x,t)$ は、入力位置 $t$ の第 $j$ チャネルが、出力位置 $x$ の第 $i$ チャネルへどれだけ寄与するかを表す。具体的には

$$
\left(\int_0^1K(x,t)h(t)\,dt\right)_i
=\sum_{j=1}^m\int_0^1K_{ij}(x,t)h_j(t)\,dt.
$$

積分を成分ごとに取るので、行列とベクトルの次元は $m\times m$ と $m$ で一致する。さらに各成分に同じ実数値関数 $\sigma$ を適用する。例えば $\sigma(s)=\max\{0,s\}$ は ReLU と呼ばれ、負の値を0へ変え、非負の値を保つ。

<a id="def-pml2-15-kernel-layer"></a>

<!-- formal-statement-start -->
> **定義（積分核型 Neural Operator 層）**  
> $D=[0,1]$、整数 $m\ge1$ を固定する。連続な行列値核 $K:D\times D\to\mathbb R^{m\times m}$、行列 $W\in\mathbb R^{m\times m}$、連続なバイアス関数 $b:D\to\mathbb R^m$、連続関数 $\sigma:\mathbb R\to\mathbb R$ を取る。$\sigma$ はベクトルの各成分へ作用させる。$h\in C(D;\mathbb R^m)$ に対して

$$
(\mathcal Lh)(x)
=\sigma\left(Wh(x)+b(x)+\int_0^1K(x,t)h(t)\,dt\right)
$$

> で定める写像 $\mathcal L:C(D;\mathbb R^m)\to C(D;\mathbb R^m)$ を**積分核型 Neural Operator 層**と呼ぶ。核・行列・バイアスを層のパラメータとし、各入力関数の間で共通に使用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-15-kernel-layer -->
**定義の確認**。 $m=2$、$h(x)=(x,1)$、$b=0$ とし、

$$
W=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
K(x,t)=\begin{pmatrix}xt&0\\0&0\end{pmatrix},
\qquad \sigma(s)=\max\{s,0\}
$$

とする。$W$ と $K(x,t)$ の次元はともに $2\times2$ である。核の成分 $xt$ は $D\times D$ 上連続、$b$ は零関数で連続、ReLUも連続である。列ベクトルとして掛け算を展開すると、

$$
Wh(x)=\begin{pmatrix}x\\0\end{pmatrix},
\qquad
K(x,t)h(t)=\begin{pmatrix}xt^2\\0\end{pmatrix}.
$$

評価位置 $x$ を固定して $t$ で成分ごとに積分するので、

$$
\int_0^1K(x,t)h(t)\,dt
=\begin{pmatrix}x\int_0^1t^2\,dt\\0\end{pmatrix}
=\begin{pmatrix}x/3\\0\end{pmatrix},
\qquad
Wh(x)+\int_0^1K(x,t)h(t)\,dt
=\begin{pmatrix}4x/3\\0\end{pmatrix}.
$$

$0\le x\le1$ より ReLU はこのベクトルを変えない。従って $(\mathcal Lh)(x)=(4x/3,0)$ となり、出力の二成分は連続である。行列の各成分が定義式のチャネル間の寄与を表すことと、定義の連続性・次元条件を直接確認できた。
<!-- definition-example-end -->

入力を持ち上げた $h_0$ に $\mathcal L_0,\ldots,\mathcal L_{L-1}$ を順に適用し、連続な点ごとの写像 $Q:\mathbb R^m\to\mathbb R$ で一つの値へ戻せば、

$$
h_{\ell+1}=\mathcal L_\ell h_\ell\quad(0\le\ell<L),
\qquad \widehat{\mathcal G}(f)(x)=Q(h_L(x))
$$

という関数から関数への近似モデルを得る。$P,Q,K_\ell,W_\ell,b_\ell$ のパラメータは入力 $f$ によって取り替えない。層の入力 $h_\ell$ 自体は、もちろん $f$ とともに変わる。

## 4. 層が連続関数を返す理由と入力安定性

層が本当に関数上の写像であるには、連続入力から連続出力ができることを確かめる必要がある。また、ある入力を少し変えただけで出力が際限なく変わらないかも知りたい。

行列 $A=(a_{ij})$ の最大行絶対和を $\|A\|_{\mathrm{row}}=\max_i\sum_j|a_{ij}|$ と書く。これは $| (Av)_i |\le\sum_j|a_{ij}|\max_k|v_k|$ をまとめるための記法である。核について

$$
M_K=\max_{x\in D}\max_{1\le i\le m}
\sum_{j=1}^m\int_0^1|K_{ij}(x,t)|\,dt
$$

と置く。$K$ が連続で、$D\times D$ が閉じた有界な領域なので $M_K<\infty$ である。

<a id="thm-pml2-15-stability"></a>

<!-- formal-statement-start -->
> **定理（積分核型層の連続性と安定性）**  
> [積分核型 Neural Operator 層](#def-pml2-15-kernel-layer)の条件を満たし、$\sigma$ はある $L_\sigma\ge0$ に対し

$$
|\sigma(a)-\sigma(c)|\le L_\sigma|a-c|
\qquad(a,c\in\mathbb R)
$$

> を満たすとする。すると任意の $h,g\in C(D;\mathbb R^m)$ について $\mathcal Lh$ は連続であり、

$$
\|\mathcal Lh-\mathcal Lg\|_{\infty,m}
\le L_\sigma(\|W\|_{\mathrm{row}}+M_K)
\|h-g\|_{\infty,m}
$$

> が成り立つ。特に同じ型の層を有限個合成すると、安定性定数の積を係数として得る。
<!-- formal-statement-end -->

**証明の見取り図。** 積分項の連続性は $K(x,t)$ が $x$ について一様に連続であることから導く。二入力の差ではバイアスが消え、局所項に最大行絶対和、積分項に $M_K$ を使う。

<!-- proof-start -->
### 証明

まず $h$ を固定する。$K$ はコンパクトな $D\times D$ 上で連続だから一様連続である。出力を評価する二つの位置を $x,y\in D$ とし、積分変数 $t$ とは区別する。$y\to x$ のとき、各チャネル $i,j$ について

$$
\begin{aligned}
&\left|\int_0^1K_{ij}(y,t)h_j(t)\,dt
-\int_0^1K_{ij}(x,t)h_j(t)\,dt\right|\\
&\qquad\le \|h\|_{\infty,m}
\max_{t\in D}|K_{ij}(y,t)-K_{ij}(x,t)|
\longrightarrow0.
\end{aligned}
$$

有限個の成分を足した積分項は連続である。$Wh(x)$ と $b(x)$ も連続で、$\sigma$ の連続性と合成して $\mathcal Lh\in C(D;\mathbb R^m)$ となる。

次に $d=h-g$、$E=\|d\|_{\infty,m}$ とおく。任意の $x,i$ で、バイアスを差し引くと局所項は

$$
|(Wd(x))_i|
\le\sum_j|W_{ij}|\,|d_j(x)|
\le\|W\|_{\mathrm{row}}E.
$$

積分項は三角不等式と $|d_j(t)|\le E$ により

$$
\begin{aligned}
\left|\sum_j\int_0^1K_{ij}(x,t)d_j(t)\,dt\right|
&\le\sum_j\int_0^1|K_{ij}(x,t)|\,|d_j(t)|\,dt\\
&\le E\sum_j\int_0^1|K_{ij}(x,t)|\,dt
\le M_KE.
\end{aligned}
$$

$\sigma$ のLipschitz条件を各成分へ適用して

$$
|(\mathcal Lh)_i(x)-(\mathcal Lg)_i(x)|
\le L_\sigma(\|W\|_{\mathrm{row}}+M_K)E.
$$

$x,i$ の最大を取って結論を得る。さらに二層 $\mathcal L_1\circ\mathcal L_0$ の差へ同じ評価を二度適用すると係数は $L_1L_0$ になり、有限層では帰納的に積となる。
<!-- proof-end -->

**何が保証されたか。** ReLUは、二つの数がともに正なら差を保ち、ともに負なら差を0にし、符号が異なる場合も正の部分の差は元の距離以下である。従って $L_\sigma=1$。ただし定理は**入力変化に対する層の感度の上界**であり、未知の真の解作用素に近いという結論ではない。

## 5. 線形な層でも、非線形な解作用素を作れるか

$\sigma(s)=s$、$b=0$、$P,Q$ も線形なら、各項は入力に線形なので層を合成しても線形である。非線形活性化を入れると、線形核しか使わなくても非線形写像を作れる。最も単純な反例は $m=1$、$K=0$、$W=1$、$P=Q$ は恒等写像、$\sigma$ は ReLU とした場合である。

<a id="prop-pml2-15-nonlinearity"></a>

<!-- formal-statement-start -->
> **命題（活性化による線形性の破れ）**  
> $D=[0,1]$ とし、入力 $f\in C(D)$ に対して

$$
(\mathcal Rf)(x)=\max\{f(x),0\}
$$

> と置く。この写像は積分核型層1個で表せるが、$C(D)$ 上の線形作用素ではない。一方、同じ層の構成で $\sigma(s)=s$、$b=0$ とし、持ち上げと読み出しを線形にすれば、有限層の合成は線形である。
<!-- formal-statement-end -->

**証明の見取り図。** 線形性は $T(f+g)=Tf+Tg$ の等号を要求する。定数関数 $1$ と $-1$ に対してこの条件を直接試す。

<!-- proof-start -->
### 証明

$m=1$、$K(x,t)=0$、$W=(1)$、$b=0$、$P(z)=Q(z)=z$ とすれば定義式は $\mathcal R$ に一致する。定数関数 $f_+(x)=1$ と $f_-(x)=-1$ を取ると

$$
\mathcal R(f_++f_-)=\mathcal R(0)=0,
\qquad \mathcal Rf_++\mathcal Rf_-=1+0=1.
$$

従って和を保存する条件を満たさず線形でない。後半では $\sigma$ が恒等写像かつ $b=0$ のとき、$h\mapsto Wh$ と $h\mapsto\int Kh$ はともに線形で、その和も線形。さらに $P,Q$ も線形なら、その合成について

$$
\widehat{\mathcal G}(\alpha f+\beta g)
=\alpha\widehat{\mathcal G}(f)+\beta\widehat{\mathcal G}(g)
$$

が成り立つ。
<!-- proof-end -->

## 6. 既知のPoisson解の積分核を層へ入れる

[Poisson解作用素の積分表示](../PML2-14/index.md#thm-pml2-14-green)を既習の具体例として使おう。そこでの $K_{\mathrm P}(x,t)$ は非負で連続、しかも $\int_0^1K_{\mathrm P}(x,t)\,dt=x(1-x)/2$ だった。

$m=1$、$P=Q$ を恒等写像、$W=0$、$b=0$、$\sigma(s)=s$、学習核 $K=K_{\mathrm P}$ と選ぶと、単一層が任意の連続入力 $f$ に対して $\mathcal Gf$ を厳密に返す。これは**積分核型層が作用素を表現できる直接例**である。核を未知のパラメータから学習する一般の場合に、厳密一致するとは限らない。

ここで $\sigma$ をReLUに変えてしまうと、$f\equiv-1$ の真解は $-x(1-x)/2$ で負だが、ReLU後は0になる。元の線形解作用素をそのまま表すには、活性化と符号の扱いも設計しなければならない。

## 7. 関数の積分を有限節点の和で近似する

実装では全区間の値を無限に扱えない。$N\ge1$ を選び、長さ $1/N$ の各区間の中点

$$
t_j=\frac{j-\tfrac12}{N}\qquad(1\le j\le N)
$$

で入力を評価する。積分を単純な中点求積で近似するなら、重みは $w_j=1/N$ であり、和は1になる。一般の非一様な節点や重みも設計できるが、以下では誤差を具体的に証明できる中点に固定する。

<a id="def-pml2-15-discrete"></a>

<!-- formal-statement-start -->
> **定義（中点求積による離散化層）**  
> [積分核型層](#def-pml2-15-kernel-layer)と整数 $N\ge1$ に対し、上の節点 $t_1,\ldots,t_N$ を固定する。連続入力 $h\in C(D;\mathbb R^m)$ に作用する**離散化層**を

$$
(\mathcal L_Nh)(x)
=\sigma\left(Wh(x)+b(x)
+\frac1N\sum_{j=1}^N K(x,t_j)h(t_j)\right)
$$

> と定める。節点上だけ計算するときの値 $h(t_i)$ は、対応する有限次元配列で表せる。$\mathcal L_N$ は、元の積分 $\mathcal L$ を近似する層であり、一般には同じ作用素ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-15-discrete -->
**定義の確認**。 $m=1$、$W=b=0$、$\sigma(s)=s$、$K(x,t)=xt$、$h(t)=t$、$N=2$ とする。節点は $t_1=1/4$、$t_2=3/4$、重みは各 $1/2$ である。入力値は $h(t_1)=1/4$、$h(t_2)=3/4$ だから、

$$
(\mathcal L_2h)(x)
=\frac12\left[x(1/4)^2+x(3/4)^2\right]
=\frac{5x}{16}.
$$

連続層では $(\mathcal Lh)(x)=x\int_0^1t^2dt=x/3$。従って差は $x/48$ であり、一様誤差は $1/48$ になる。核も入力も滑らかでも、節点が有限なら求積誤差が生じる。
<!-- definition-example-end -->

**配列としての計算。** 入力節点を $j=1,\ldots,N$、チャネルを $k=1,\ldots,m$ で区別し、

$$
H_{jk}=h_k(t_j),\qquad H=(H_{jk})\in\mathbb R^{N\times m}
$$

とする。$H$ の第 $j$ 行 $H_{j,:}$ は行ベクトルなので、核行列を左から掛ける際には、対応する**列ベクトル**

$$
v_j=(H_{j1},\ldots,H_{jm})^{\mathsf T}=h(t_j)\in\mathbb R^m
$$

を使う。出力節点の添字を $p=1,\ldots,N$ とすると、積分項と第 $i$ チャネルは

$$
\begin{aligned}
I_p&=\frac1N\sum_{j=1}^NK(t_p,t_j)v_j\in\mathbb R^m,\\
(I_p)_i&=\frac1N\sum_{j=1}^N\sum_{k=1}^m K_{ik}(t_p,t_j)H_{jk}
\qquad(1\le i\le m).
\end{aligned}
$$

したがって出力は $(\mathcal L_Nh)(t_p)=\sigma(Wv_p+b(t_p)+I_p)$ となる。核は $m\times m$、各 $v_j$ と $I_p$ は $m$ 成分で、$N$ は節点数だけを表す。直接計算には各層で概ね $N^2m^2$ 回のスカラー積和が必要である（核の計算・保存・パラメータの費用は別）。後続のFourier型構成はこの費用の構造を変える。

## 8. 求積誤差を条件から導く

節点数を増やして精度が改善することは、核と入力の変化率に条件を付けたとき初めて証明できる。固定した $x,i$ に対し、積分の被積分関数

$$
g_{x,i}(t)=\sum_{j=1}^mK_{ij}(x,t)h_j(t)
$$

が $t$ に関してLipschitz連続なら、各小区間で中点からのずれを積分して誤差を評価できる。

<a id="thm-pml2-15-quadrature"></a>

<!-- formal-statement-start -->
> **定理（中点求積の誤差と層への伝播）**  
> [連続層](#def-pml2-15-kernel-layer)とその[中点離散化層](#def-pml2-15-discrete)において、任意の $x\in D$ と $i=1,\ldots,m$ について、$g_{x,i}$ が共通定数 $H\ge0$ を用いて

$$
|g_{x,i}(t)-g_{x,i}(s)|\le H|t-s|
\qquad(s,t\in D)
$$

> を満たすとする。また活性化関数 $\sigma$ はLipschitz定数 $L_\sigma$ を持つとする。すると

$$
\|\mathcal Lh-\mathcal L_Nh\|_{\infty,m}
\le \frac{L_\sigma H}{4N}.
$$

> さらに、二つの層 $\mathcal L_0,\mathcal L_1$ が[安定性定理](#thm-pml2-15-stability)の仮定を満たし、それぞれの安定性定数が $A_0,A_1$、第一層の入力 $h$ に対する上記の中点誤差上界が $\varepsilon_0$、第二層の入力 $\mathcal L_{0,N}h$ に対する上界が $\varepsilon_1$ なら、

$$
\|\mathcal L_1\mathcal L_0h
-\mathcal L_{1,N}\mathcal L_{0,N}h\|_{\infty,m}
\le A_1\varepsilon_0+\varepsilon_1.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 各小区間の中点からの距離を積分すると $1/(4N^2)$ となる。その和が $N$ 個あるので $H/(4N)$ が現れる。二層の場合は「一層目のずれが二層目で増幅する部分」と「二層目自身の求積のずれ」に分ける。

<!-- proof-start -->
### 証明

$\Delta=1/N$、$I_j=[(j-1)\Delta,j\Delta]$ と置く。$t_j$ は $I_j$ の中点だから、区間内でのLipschitz条件から

$$
\begin{aligned}
\left|\int_{I_j}g_{x,i}(t)\,dt-\Delta g_{x,i}(t_j)\right|
&=\left|\int_{I_j}\{g_{x,i}(t)-g_{x,i}(t_j)\}\,dt\right|\\
&\le H\int_{I_j}|t-t_j|\,dt\\
&=2H\int_0^{\Delta/2}r\,dr
=\frac{H\Delta^2}{4}.
\end{aligned}
$$

$N$ 個足すと

$$
\left|\int_0^1g_{x,i}(t)\,dt
-\frac1N\sum_{j=1}^Ng_{x,i}(t_j)\right|
\le\frac{H}{4N}.
$$

局所項 $Wh(x)$ と $b(x)$ は連続層・離散層で同じなので差で相殺する。$\sigma$ のLipschitz条件を各成分に用いて $L_\sigma H/(4N)$、さらに $x,i$ の最大を取って第一の結論を得る。

二層の差に中間の $\mathcal L_1\mathcal L_{0,N}h$ を足し引きすると

$$
\begin{aligned}
&\|\mathcal L_1\mathcal L_0h
-\mathcal L_{1,N}\mathcal L_{0,N}h\|_{\infty,m}\\
&\quad\le
\|\mathcal L_1\mathcal L_0h-\mathcal L_1\mathcal L_{0,N}h\|_{\infty,m}\\
&\qquad+
\|\mathcal L_1\mathcal L_{0,N}h
-\mathcal L_{1,N}\mathcal L_{0,N}h\|_{\infty,m}\\
&\quad\le A_1\varepsilon_0+\varepsilon_1.
\end{aligned}
$$

第一項は安定性、第二項は第二層の求積誤差に対応する。$\varepsilon_1$ の条件は**離散化後に第二層へ実際に入る関数**について検査する必要がある。
<!-- proof-end -->

**条件の点検。** 例えば $K(x,t)=xt$、$h(t)=t$ なら $g_x(t)=xt^2$ であり、

$$
|g_x(t)-g_x(s)|=x|t-s||t+s|\le2|t-s|.
$$

$H=2$ とおけるので、上界は $1/(2N)$。実際には多項式の対称性で誤差はもっと速く減るが、定理はLipschitz性だけで保証できる範囲を示している。逆に $N$ が変わるごとに核や入力の振動が激しくなり共通の $H$ を確保できなければ、この一様評価を使えない。

## 9. 同じパラメータと、同じ精度は別

[既知のPoisson解の積分核](../PML2-14/index.md#thm-pml2-14-green)を $K$ に使う。$f\equiv1$ に対する連続出力は $u(x)=x(1-x)/2$ である。$N=2$、節点 $1/4,3/4$ で $x=1/4$ の値を求めると、

$$
K(1/4,1/4)=3/16,\qquad K(1/4,3/4)=1/16,
$$

$$
u_2(1/4)=\tfrac12(3/16+1/16)=1/8,
\qquad u(1/4)=3/32.
$$

差は $1/32$ である。核の式も学習パラメータも変えていない。変えたのは積分の節点だけであり、この例は**パラメータを共有できることが解像度ごとの誤差一致を意味しない**ことを示す。

さらに、モデルが有限個の入力センサ $f(t_j)$ だけから全出力を計算するなら、[有限センサの区別不能性](../PML2-14/index.md#thm-pml2-14-sensor-limit)を免れない。これに対し、離散化層の定義式にある $Wh(x)$ を**格子外の $x$ でも直接評価する**なら、その時点で $h(x)$ を追加取得している。有限センサモデルと同一視してはならない。格子外へ出力を延長するには、入力の補間法や評価時に利用できる観測の範囲を明示する必要がある。

入力関数の未見データへの一般化、核の学習誤差、連続積分から有限和への誤差、格子外への補間誤差は異なる問題である。Neural Operator層はそれらを区別して議論するための構成要素となる。

## 10. 演習と詳細解答

### Level A：各構成要素を手で計算する

<a id="ex-pml2-15-a01"></a>

### PML2-15-A01：持ち上げの確認
- Level: A

$f(x)=2x-1$、$P(z)=(z,1-z)$、$D=[0,1]$ とする。$h_0=P\circ f$ の二成分を求め、$C(D;\mathbb R^2)$ に属することと $\|h_0\|_{\infty,2}$ を確かめよ。

<!-- solution-start -->
**詳細解答。** $h_0(x)=(2x-1,2-2x)$ である。両成分は一次多項式なので連続である。$x\in[0,1]$ で $|2x-1|\le1$、$0\le2-2x\le2$。後者は $x=0$ で2となるから、[チャネル表現と持ち上げ](#def-pml2-15-lift)より $\|h_0\|_{\infty,2}=2$。$P$ も連続であり持ち上げの仮定を満たす。
<!-- solution-end -->

<a id="ex-pml2-15-a02"></a>

### PML2-15-A02：積分核の一成分計算
- Level: A

$m=1$、$W=b=0$、$\sigma(s)=s$、$K(x,t)=xt$、$h(t)=t$ とする。連続層の出力を求め、連続性を確かめよ。

<!-- solution-start -->
**詳細解答。** $K$ は二変数の多項式で連続、$h$ は一次多項式で連続である。[層の定義](#def-pml2-15-kernel-layer)をそのまま使うと

$$
(\mathcal Lh)(x)=\int_0^1(xt)t\,dt
=x\left[\frac{t^3}3\right]_0^1=\frac x3.
$$

$x/3$ は $[0,1]$ 上連続なので出力も $C(D)$ に属する。
<!-- solution-end -->

<a id="ex-pml2-15-a03"></a>

### PML2-15-A03：二チャネルの行列積
- Level: A

$h(x)=(x,1)$、$W=\begin{pmatrix}1&0\\0&0\end{pmatrix}$、$K(x,t)=\begin{pmatrix}xt&0\\0&0\end{pmatrix}$、$b=0$、$\sigma$ を成分ごとのReLUとする。$\mathcal Lh$ を求めよ。

<!-- solution-start -->
**詳細解答。** $Wh(x)=(x,0)$。核を掛けると $K(x,t)h(t)=(xt^2,0)$。成分ごとに積分して $(x/3,0)$。従って活性化前は $(x+x/3,0)=(4x/3,0)$。$x\ge0$ なのでReLU後も変化せず、$\mathcal Lh(x)=(4x/3,0)$。行列はともに $2\times2$、積の結果は2成分ベクトルである。
<!-- solution-end -->

<a id="ex-pml2-15-a04"></a>

### PML2-15-A04：二点中点求積
- Level: A

$K(x,t)=xt$、$h(t)=t$ とし、$N=2$ の中点離散化値、真の積分値、一様誤差を求めよ。

<!-- solution-start -->
**詳細解答。** 節点は $1/4,3/4$。二点の被積分関数は $x/16,9x/16$ なので求積値は $(x/16+9x/16)/2=5x/16$。[連続積分の計算](#def-pml2-15-discrete)より真値は $x/3$。よって差は

$$
\frac x3-\frac{5x}{16}
=\frac{16x-15x}{48}=\frac x{48}.
$$

$0\le x\le1$ の最大は $x=1$ で $1/48$。
<!-- solution-end -->

<a id="ex-pml2-15-a05"></a>

### PML2-15-A05：ReLUが線形でないこと
- Level: A

$R(f)(x)=\max\{f(x),0\}$ とする。定数関数 $f=1$、$g=-1$ に対し $R(f+g)$ と $R(f)+R(g)$ を計算し、線形性を判定せよ。

<!-- solution-start -->
**詳細解答。** $f+g=0$ なので $R(f+g)=0$。一方 $R(f)=1$、$R(g)=0$ なので $R(f)+R(g)=1$。和を保存する条件を満たさず線形作用素でない。[非線形性の命題](#prop-pml2-15-nonlinearity)の反例を自分で再現したことになる。
<!-- solution-end -->

### Level B：安定性・誤差・観測の仮定を検査する

<a id="ex-pml2-15-b01"></a>

### PML2-15-B01：安定性定数と鋭さ
- Level: B

$m=1$、$W=1/4$、$K(x,t)=xt$、$b=0$、$\sigma(s)=s$ とする。$\mathcal L$ の一様ノルムLipschitz定数として $3/4$ が使えることを証明し、この値を小さくできない入力差を示せ。

<!-- solution-start -->
**詳細解答。** $|W|=1/4$ である。$K\ge0$ なので

$$
M_K=\max_{0\le x\le1}\int_0^1xt\,dt
=\max_{x\in[0,1]}\frac x2=\frac12.
$$

活性化は恒等写像で $L_\sigma=1$。[安定性定理](#thm-pml2-15-stability)より定数は $1/4+1/2=3/4$ となる。これが鋭いことは入力 $h\equiv1$、$g\equiv0$ で分かる。このとき

$$
(\mathcal Lh-\mathcal Lg)(x)=\frac14+\frac x2.
$$

入力差の一様ノルムは1、出力差の最大は $x=1$ で $3/4$。よって $3/4$ 未満の共通係数ではこの組に対する評価が破れる。
<!-- solution-end -->

<a id="ex-pml2-15-b02"></a>

### PML2-15-B02：一般の中点誤差を再導出する
- Level: B

$g:[0,1]\to\mathbb R$ が $|g(t)-g(s)|\le H|t-s|$ を満たすとする。等間隔 $N$ 中点の求積誤差が $H/(4N)$ 以下であることを積分で示せ。さらに $g_x(t)=xt^2$、$x\in[0,1]$ に適用せよ。

<!-- solution-start -->
**詳細解答。** $\Delta=1/N$、各区間の中点 $t_j$ に対し、

$$
\begin{aligned}
\left|\int_{(j-1)\Delta}^{j\Delta}
\{g(t)-g(t_j)\}\,dt\right|
&\le H\int_{(j-1)\Delta}^{j\Delta}|t-t_j|\,dt\\
&=2H\int_0^{\Delta/2}r\,dr
=\frac{H}{4N^2}.
\end{aligned}
$$

これを $N$ 区間で足すと $H/(4N)$ を得る。$g_x(t)=xt^2$ なら $|xt^2-xs^2|=x|t-s||t+s|\le2|t-s|$。したがってすべての $x$ に共通して $H=2$ を採れ、上界は $1/(2N)$。この上界は必ずしも等号を与えない。
<!-- solution-end -->

<a id="ex-pml2-15-b03"></a>

### PML2-15-B03：Poisson解の積分核で解像度誤差を測る
- Level: B

Poisson解の積分核を

$$
K_{\mathrm P}(x,t)=
\begin{cases}t(1-x)&t\le x,\\x(1-t)&x\le t\end{cases}
$$

とし、$f(t)=1$、$N=2$ とする。$x=1/4$ における真値と中点求積値を計算せよ。また各 $x$ で $t\mapsto K_{\mathrm P}(x,t)$ がLipschitz定数1を持つことを確認し、理論上界と比較せよ。

<!-- solution-start -->
**詳細解答。** 真値は[Poisson解作用素の積分表示・線形性・一様安定性](../PML2-14/index.md#thm-pml2-14-green)を適用すると $x(1-x)/2$ であるから $x=1/4$ で $3/32$。節点 $t_1=1/4,t_2=3/4$ で核は $3/16,1/16$、求積値は $(3/16+1/16)/2=1/8$。差は $1/8-3/32=1/32$。

核は $t\le x$ で傾き $1-x$、$t\ge x$ で傾き $-x$ を持ち、接合点 $t=x$ で両式が $x(1-x)$ に一致する。各区間の傾きの絶対値は1以下で、$s\le x\le t$ の場合は

$$
|K(x,t)-K(x,s)|\le|K(x,t)-K(x,x)|+|K(x,x)-K(x,s)|
\le(t-x)+(x-s)=t-s.
$$

従って全域でLipschitz定数1。$N=2$ の[求積誤差定理](#thm-pml2-15-quadrature)による一様上界は $1/8$ であり、実際の点誤差 $1/32$ はこれ以下である。
<!-- solution-end -->

<a id="ex-pml2-15-b04"></a>

### PML2-15-B04：同じ節点値を持つ異なる入力
- Level: B

節点 $t_j=(j-1/2)/N$ を固定し、$S_N(f)=(f(t_1),\ldots,f(t_N))$ とする。$h(x)=\prod_{j=1}^N(x-t_j)^2$ を用いて、センサ値だけを使い出力関数を決めるモデルが入力 $0,h$ を区別できないことを証明せよ。また、局所項 $Wf(x)$ を全 $x$ で評価するモデルと何が異なるか述べよ。

<!-- solution-start -->
**詳細解答。** $h$ は多項式なので連続である。各節点で因子の一つが零となり、$h(t_j)=0$ が成り立つ。したがって、観測ベクトルは一致する。

$$
S_N(h)=S_N(0)=(0,\ldots,0).
$$

出力がセンサ値の関数 $A(S_N(f))$ なら、等しい観測には等しい出力を返すため、

$$
A(S_N(h))=A(S_N(0)).
$$

一方、$h$ は節点以外で正なので零関数ではない。[有限センサの誤差下界](../PML2-14/index.md#thm-pml2-14-sensor-limit)はPoisson解作用素について、この区別不能性が正の一様誤差下界を生むことまで示している。

局所項 $Wf(x)$ を格子外で直接計算する式では、例えば $W=1$ のとき、節点以外の位置で入力値 $h(x)>0$ を追加で観測することになる。従って、センサ値のみから決まるモデルではない。
<!-- solution-end -->

### Level C：連続層・離散層・合成を統合する

<a id="ex-pml2-15-c01"></a>

### PML2-15-C01：二層の精度と観測条件
- Level: C

$D=[0,1]$、$f(t)=t$、$m=1$ とする。第一層は

$$
(\mathcal L_0h)(x)=\max\left\{0,h(x)+x\int_0^1t h(t)\,dt\right\}
$$

であり、第二層は $(\mathcal L_1v)(x)=\max\{0,v(x)/2\}$ とする。各層の積分を等間隔の $N=2$ 中点で近似する（第二層の核は零である）。

1. $h_1=\mathcal L_0f$、$h_2=\mathcal L_1h_1$ を求めよ。
2. $h_{1,2}=\mathcal L_{0,2}f$、$h_{2,2}=\mathcal L_{1,2}h_{1,2}$ を求め、二層目の一様誤差を計算せよ。
3. 第一層誤差 $\varepsilon_0$、第二層の安定性定数 $A_1$、第二層の求積誤差 $\varepsilon_1$ を計算し、[二層誤差評価](#thm-pml2-15-quadrature)と照合せよ。
4. 上記の連続変数 $x$ での計算に利用した入力情報と、有限個の節点値だけを保持する実装で格子外の値を求める場合の追加手続を区別せよ。

<!-- solution-start -->
**詳細解答。**

**(1) 連続層。** $\int_0^1t f(t)dt=\int_0^1t^2dt=1/3$。$f(x)=x\ge0$ なのでReLUの中身も $x+x/3=4x/3\ge0$。従って

$$
h_1(x)=\frac{4x}{3},\qquad
h_2(x)=\frac12h_1(x)=\frac{2x}{3}.
$$

両方とも連続であり、層の定義域に属する。

**(2) 二点離散化。** 中点は $1/4,3/4$、重みは $1/2$。積分項の近似は

$$
\frac12\left(\frac1{16}+\frac9{16}\right)=\frac5{16}.
$$

従って第一層の活性化前は $x+5x/16=21x/16\ge0$ で、

$$
h_{1,2}(x)=\frac{21x}{16},
\qquad h_{2,2}(x)=\frac{21x}{32}.
$$

二層目の差を通分すると

$$
h_2(x)-h_{2,2}(x)
=\left(\frac23-\frac{21}{32}\right)x
=\frac{64-63}{96}x=\frac x{96}.
$$

よって一様誤差は $1/96$。

**(3) 誤差の伝播。** 第一層では $h_1(x)-h_{1,2}(x)=(4/3-21/16)x=x/48$ なので $\varepsilon_0=1/48$ を正確な上界として使える。第二層は点ごとに $v/2$ にReLUを適用するので、ReLUの1-Lipschitz性から $A_1=1/2$。核が零で求積が存在しないため $\varepsilon_1=0$。[二層評価](#thm-pml2-15-quadrature)の右辺は

$$
A_1\varepsilon_0+\varepsilon_1
=\frac12\cdot\frac1{48}+0=\frac1{96}.
$$

実際の誤差 $1/96$ と一致する。ここで理論上の粗いLipschitz求積上界 $1/(2N)$ ではなく、実際に計算できた厳密な $\varepsilon_0$ を用いた。

**(4) 観測の区別。** (2) の式には、任意の $x$ で $h(x)=f(x)=x$ を直接評価する局所項がある。元の解析関数 $f$ を与えられた今回の設定では計算できる。実装で $f(1/4),f(3/4)$ しか保持しないなら、例えば節点以外の $x$ で $f(x)$ を知るには、補間規則を決めて近似するか新しい観測を得なければならない。二点離散化の求積誤差と、その追加の補間誤差を同じものとして報告してはならない。
<!-- solution-end -->
