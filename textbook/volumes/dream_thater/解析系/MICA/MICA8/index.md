# MICA8 擬微分作用素と主シンボル

[MICA7の引き戻し](../MICA7/index.md#thm-mica7-pullback)では、分布の特異な**位置と方向**を調べました。今度は方程式 $Pu=f$ を考えます。$f$ がある方向で滑らかなら、$u$ もその方向で滑らかでしょうか。

微分するだけなら [MICA3の微分作用素に関する包含](../MICA3/index.md#cor-mica3-differential-operator) により $WF(Pu)\subset WF(u)$ です。しかし逆包含は常には成立しません。例えば $u(x,y)=H(x)$ と $P=\partial_y$ なら $Pu=0$ なのに、$u$ は直線 $x=0$ で特異です。$P$ がその方向の変化を全く見ていないからです。

必要なのは、演算子を周波数方向ごとに調べ、**逆に解ける方向だけ**で正則性を回収することです。そのため微分作用素より広い「擬微分作用素」を作り、主シンボルと楕円性を定義します。特異性が**どこからどこへ動くか**は次の MICA9・10 の課題であり、この章では「どの方向で消せないか」を確定します。

舞台は開集合 $X\subset\mathbb R^n$ です。[MICA1のFourier変換](../MICA1/index.md#def-mica1-local-fourier)の規約を用い、$D_j=(1/i)\partial_{x_j}=-i\partial_{x_j}$、$\langle\xi\rangle=(1+|\xi|^2)^{1/2}$ と置きます。記号 $\alpha,\beta\in\mathbb N_0^n$ は多重指数で、$|\alpha|=\sum_j\alpha_j$、$\alpha!=\prod_j\alpha_j!$、$\partial_\xi^\alpha=\prod_j\partial_{\xi_j}^{\alpha_j}$ です。以下は複素数値のスカラー作用素を扱い、座標変換や束への拡張は必要な局所表示に限ります。

## 1. 微分作用素を周波数ごとに見る

滑らかな係数 $c_\alpha(x)$ を持つ有限階微分作用素

$$
P=\sum_{|\alpha|\le m}c_\alpha(x)D^\alpha
$$

を指数関数 $e^{ix\cdot\xi}$ に作用させると、$D^\alpha e^{ix\cdot\xi}=\xi^\alpha e^{ix\cdot\xi}$ なので

$$
Pe^{ix\cdot\xi}=p(x,\xi)e^{ix\cdot\xi},\qquad
p(x,\xi)=\sum_{|\alpha|\le m}c_\alpha(x)\xi^\alpha.
$$

指数関数に作用させたときに残る周波数の多項式は、作用素を周波数側で読むための基本データです。

<a id="def-mica8-differential-symbol"></a>

<!-- formal-statement-start -->
> **定義（微分作用素の全記号）**  
> 開集合 $X\subset\mathbb R^n$ 上の滑らかな係数を持つ有限階微分作用素 $P=\sum_{|\alpha|\le m}c_\alpha(x)D^\alpha$ に対し、関数

$$
p(x,\xi)=\sum_{|\alpha|\le m}c_\alpha(x)\xi^\alpha
$$

> を $P$ の全記号と定める。ここで $D_j=(1/i)\partial_{x_j}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica8-differential-symbol -->
**定義の確認**。$P=1-\partial_x^2=1+D_x^2$ では $D_x^2e^{ix\xi}=\xi^2e^{ix\xi}$ なので、$Pe^{ix\xi}=(1+\xi^2)e^{ix\xi}$。よって全記号は $1+\xi^2$ です。
<!-- definition-example-end -->

高周波 $|\xi|\to\infty$ を支配する次数 $m$ の部分は

$$
p_m(x,\xi)=\sum_{|\alpha|=m}c_\alpha(x)\xi^\alpha.
$$

これは微分作用素の**主シンボル**です。二階波動型作用素については [HPDE5の主シンボル](../../HPDE/HPDE5/index.md#def-hpde5-principal-symbol)とも比較できます。ただし HPDE5 では $\partial_j$ で記号を表す符号の流儀があるので、ここでは $D_j=-i\partial_j$ に統一します。

例えば $P=1-\partial_x^2=1+D_x^2$ の全記号は $1+\xi^2$、主シンボルは $\xi^2$ です。対して $P=D_y$ の主シンボルは $\xi_y$ で、$x$ 方向の周波数 $(\xi_x,0)$ を検出できません。どこで逆転できるかは、この「零になる方向」の有無にかかっています。

## 2. 多項式でない記号も許す

例えば $1+D_x^2$ の逆として、Fourier側で $\widehat u(\xi)$ に $(1+\xi^2)^{-1}$ を掛けたいはずです。この関数は多項式ではありません。それでも周波数を微分するたびに減衰が増えます。この性質を抽象化します。

<a id="def-mica8-symbol-class"></a>

<!-- formal-statement-start -->
> **定義（記号クラス）**  
> $m\in\mathbb R$、$X\subset\mathbb R^n$ を開集合とする。$a\in C^\infty(X\times\mathbb R^n)$ が $S^m_{1,0}(X)$ に属するとは、任意のコンパクト集合 $K\Subset X$ と任意の多重指数 $\alpha,\beta$ に対して定数 $C_{K\alpha\beta}$ があり、すべての $x\in K$、$\xi\in\mathbb R^n$ で

$$
|\partial_x^\alpha\partial_\xi^\beta a(x,\xi)|
\le C_{K\alpha\beta}\langle\xi\rangle^{m-|\beta|}
$$

> が成立することをいう。また $S^{-\infty}=\bigcap_{N\in\mathbb N}S^{-N}_{1,0}$ を**無限次の減衰記号**のクラスとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica8-symbol-class -->
### 直接例：逆数は二階分だけ減衰する

**定義の確認**。$x$ 微分は零であることを押さえた上で、すべての $\xi$ 微分を次数 $-2$ の評価へ落とします。

$a(\xi)=(1+\xi^2)^{-1}$（一次元）について、$a'= -2\xi(1+\xi^2)^{-2}$、$a''=-2(1+\xi^2)^{-2}+8\xi^2(1+\xi^2)^{-3}$ です。一般の $k$ 階微分は、帰納法で

$$
\partial_\xi^k a(\xi)=\frac{Q_k(\xi)}{(1+\xi^2)^{k+1}},\qquad
\deg Q_k\le k
$$

となります。実際 $Q_{k+1}=(1+\xi^2)Q_k'-2(k+1)\xi Q_k$ なので次数は高々 $k+1$ です。$|\xi|\ge1$ では分母は $|\xi|^{2k+2}$ 以上、分子は $C_k|\xi|^k$ 以下であり、$|\partial_\xi^ka|\le C_k|\xi|^{-2-k}$。$|\xi|\le1$ では滑らかさとコンパクト性で同じ $\langle\xi\rangle$ 評価が得られます。$x$ に依存しないので $\partial_x^\alpha a=0$（$|\alpha|>0$）です。従って $a\in S^{-2}_{1,0}$ です。

一方 $e^{-|\xi|^2}$ は、各微分が「多項式 $\times$ Gaussian」なので $S^{-\infty}$ に入ります。$\xi_j$ は $S^1$ に入りますが $S^0$ には入りません。**次数は最高の多項式増大を表し、微分ごとの $\xi$ 方向の減衰まで要求する**ことが重要です。
<!-- definition-example-end -->

ここで主シンボルを取り出すには、一般の $S^m$ の記号に対し、さらに高周波で同次式を順番に並べられる条件が便利です。同次とは、$|\xi|\ge1$ で $t\ge1$ として $a_{m-j}(x,t\xi)=t^{m-j}a_{m-j}(x,\xi)$（零周波数付近は滑らかに切り取る）という意味です。

<a id="def-mica8-classical-symbol"></a>

<!-- formal-statement-start -->
> **定義（古典記号と主シンボル）**  
> $a\in S^m_{1,0}(X)$ が**古典記号**であるとは、$\xi\ne0$ で次数 $m-j$ の滑らかな同次関数 $a_{m-j}$（$j=0,1,\ldots$）があり、$|\xi|\ge1$ でそれぞれを用い、任意の $N\ge1$ について

$$
a-\sum_{j=0}^{N-1}a_{m-j}\in S^{m-N}_{1,0}
\quad (|\xi|\ge1)
$$

> となることをいう。その最初の項 $a_m(x,\xi)$ を**主シンボル**と呼ぶ。$a_m$ は零でもよい。$a$ の低次項の変更は $a_m$ を変えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica8-classical-symbol -->
### 直接例：定数項は主部にならない

**定義の確認**。各次数の同次項を指定し、有限和を引いた後の余りが指定次数以下であることを各 $N$ について調べます。

$a(\xi)=1+\xi^2$ は次数2の古典記号で、$a_2=\xi^2$、$a_1=0$、$a_0=1$、残りは零です。$N=1$ の余りは $1\in S^0\subset S^1$、$N=2$ の余りも $1\in S^0$、$N\ge3$ では該当する項を引いた余りは零です。従って定義の全 $N$ で条件を満たします。

$b(\xi)=(1+\xi^2)^{-1}$ なら $|\xi|\ge1$ で

$$
b(\xi)=\xi^{-2}-\xi^{-4}+\xi^{-6}-\cdots
$$

という漸近展開を持ちます。有限和後の余りは、幾何級数の公式から $(-1)^N\xi^{-2N}/(\xi^2+1)$（最初の $N$ 項を $\xi^{-2},-\xi^{-4},\ldots$ と数える）となり、導関数込みで $S^{-2-2N}$ です。主シンボルは $b_{-2}=\xi^{-2}$ です。零点 $\xi=0$ での式は使用しません。
<!-- definition-example-end -->

## 3. 記号を作用素に変換する

[MICA1のFourier微分公式](../MICA1/index.md#prop-mica1-fourier-derivative)で $D_j$ が周波数変数 $\xi_j$ に対応することを使い、$a(x,\xi)$ を周波数ごとに掛ける演算を作ります。$a$ が $x$ に依存するときは、Fourier変換のあとに $x$ で係数を掛ける順序を固定します。

<a id="def-mica8-psi"></a>

<!-- formal-statement-start -->
> **定義（Kohn–Nirenberg量子化・擬微分作用素）**  
> $a\in S^m_{1,0}(X)$ に対し、$u\in C_c^\infty(X)$ について振動積分

$$
\operatorname{Op}(a)u(x)
=(2\pi)^{-n}\iint e^{i(x-y)\cdot\xi}
a(x,\xi)u(y)\,dy\,d\xi
$$

> で定める。積分は高周波を切り取った後の分布的極限として解釈する。滑らかな核の $x,y$ 切り取りを使って**適切に支持された**作用素（核の台から各変数への射影がコンパクト集合の逆像上でコンパクト）にしたものと、滑らかな核を持つ作用素の和を、局所的な擬微分作用素クラス $\Psi^m(X)$ と呼ぶ。古典記号を用いるものは $\Psi^m_{\mathrm{cl}}(X)$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica8-psi -->
### 直接例：Fourier乗数と微分の再現

**定義の確認**。量子化の指数積分に Fourier反転を当てはめ、微分作用素が再現されることを確認します。

$a(x,\xi)=\xi_j$ なら、Fourier反転で $\operatorname{Op}(a)u=D_ju$ です。$a(x,\xi)=c(x)\xi_j$ なら $\operatorname{Op}(a)u=c(x)D_ju$ となります。$a(\xi)=(1+\xi^2)^{-1}$（一次元）は、周波数 $\xi$ ごとに $(1+\xi^2)^{-1}$ を掛ける次数 $-2$ の作用素を作ります。

局所化に注意します。Fourier乗数の核は一般に遠方まで広がるので、そのままの畳み込み作用素は適切な支持を持たない場合があります。対角線 $x=y$ の近くで $1$ となる滑らかな $\kappa(x,y)$ を核に掛けて局所化すると、対角線外の部分は下記の理由で滑らかな核になり、**波面集合の局所判定**は変わりません。
<!-- definition-example-end -->

### 核が対角線の外で滑らかな理由

$x\ne y$ のとき $e^{i(x-y)\cdot\xi}$ は $\xi$ に関して停留しません。$r=x-y$ と置くと

$$
L=\frac{r\cdot\partial_\xi}{i|r|^2},\qquad
Le^{ir\cdot\xi}=e^{ir\cdot\xi}.
$$

$L$ の形式的随伴を $N$ 回記号に作用させると $\partial_\xi$ が $N$ 回現れ、[記号クラス](#def-mica8-symbol-class)から次数が $m-N$ へ下がります。

$x,y$ に関して合わせて $k$ 回微分した核では、指数因子から最高 $k$ 次の周波数の冪が現れます。そこで

$$
N>m+n+k
$$

を選べば、$|r|\ge\varepsilon>0$ 上で部分積分後の積分が絶対収束します。任意の $k$ に対して選べるので核は対角線外で $C^\infty$ です。よって離れた特異性を局所的に伝えることはありません。

## 4. 合成すると主シンボルは掛け算になる

二つの作用素 $A=\operatorname{Op}(a)$、$B=\operatorname{Op}(b)$ を合成すると、$a(x,\xi)b(x,\xi)$ だけでは終わりません。$b$ の $x$ 依存性を微分した補正が出ます。以降の計算はまず台を局所化した記号について行い、適切な支持と滑らかな核の項を戻すものとします。

<a id="lem-mica8-composition"></a>

<!-- formal-statement-start -->
> **補題（擬微分作用素の合成公式）**  
> $a\in S^m_{1,0}(X)$、$b\in S^\ell_{1,0}(X)$ の適切に支持された量子化を $A,B$ とする。$AB\in\Psi^{m+\ell}(X)$ で、その記号 $c$ は、任意の整数 $N\ge1$ に対し

$$
c-\sum_{|\alpha|<N}\frac{1}{\alpha!}
\partial_\xi^\alpha a\,D_x^\alpha b
\in S^{m+\ell-N}_{1,0}
$$

> という漸近展開を持つ（局所化で生じる $S^{-\infty}$ の差は無視できる）。特に古典記号の場合、主シンボルは $\sigma_{m+\ell}(AB)=a_m b_\ell$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二重のFourier積分を一つにまとめると、$b(x+y,\xi)$ の $y$ に関する Taylor 展開が現れます。$y^\alpha$ を指数関数側から $\xi$ 微分に移すたびに $1/i$ が出ます。この一段が、主部にはない低次補正の正体です。

<!-- proof-start -->
### 証明

まず $a,b$ を $x$ に関して局所化し、振動積分を有限周波数切り取りで計算します。$ABu$ の積分で中間変数の差を $y$、二つの周波数の差を $\eta$ と置くと、$AB$ の左量子化記号は

$$
c(x,\xi)=(2\pi)^{-n}\iint
e^{-iy\cdot\eta}a(x,\xi+\eta)b(x+y,\xi)\,dy\,d\eta.
$$

Taylor の積分剰余公式を $y=0$ の周りで適用すると

$$
b(x+y,\xi)=\sum_{|\alpha|<N}\frac{y^\alpha}{\alpha!}
\partial_x^\alpha b(x,\xi)+R_N(x,y,\xi),
$$

ここで $R_N$ は $|\alpha|=N$ の項 $y^\alpha$ と、線分 $x+ty$ における $\partial_x^\alpha b$ の積分から成ります。有限和の項に対し

$$
y^\alpha e^{-iy\cdot\eta}
=i^{|\alpha|}\partial_\eta^\alpha e^{-iy\cdot\eta}
$$

として $\eta$ で部分積分すれば、係数は $(-i)^{|\alpha|}\partial_\xi^\alpha a\,\partial_x^\alpha b=D_x^\alpha b\,\partial_\xi^\alpha a$ です。$\eta$ の積分はFourier反転により $y=0$ を選び、記載した有限和になります。

剰余の次数を確認します。$R_N$ に含まれる $y^\alpha$（$|\alpha|=N$）を移すと、$a$ には $N$ 階の $\eta$ 微分が付き、$S^{m-N}$ の評価になります。$b$ の $x$ 微分は $\xi$ の次数を増やしません。

積分領域を二分します。$|\eta|\le\langle\xi\rangle/2$ では $\langle\xi+\eta\rangle$ と $\langle\xi\rangle$ が同程度です。補集合では $(1-\Delta_y)^M$ を指数関数へ作用させ、$\langle\eta\rangle^{-2M}$ を得ます。局所化された $y$ 側の台と微分評価を使えば、$M$ を大きくして積分を収束させられます。

任意の $x,\xi$ 微分について同じ分割を使うと、$\xi$ 微分 $\beta$ の分だけ減衰が増えて

$$
|\partial_x^\gamma\partial_\xi^\beta(c-c_{<N})|
\le C_{\gamma\beta}\langle\xi\rangle^{m+\ell-N-|\beta|}
$$

を得ます。ここで $c_{<N}$ は定理の有限和です。従って剰余は $S^{m+\ell-N}$ です。局所化した核の対角線外の部分は前節により滑らかです。

古典記号なら、$|\alpha|\ge1$ の項は少なくとも一次低く、$\alpha=0$ の $ab$ の最高次数は $a_m b_\ell$ です。これで主シンボルの乗法則も従います。
<!-- proof-end -->

### 具体計算：順序は交換できない

一次元で $A=D_x$、$B$ を $x$ の乗算とします。$a=\xi$、$b=x$ なので [合成公式](#lem-mica8-composition) は二項で打ち切れ、

$$
\sigma(AB)=x\xi+\frac1i,\qquad
\sigma(BA)=x\xi.
$$

従って $(D_xx-xD_x)u=(1/i)u=-iu$ です。直接 Leibniz 則で $D_x(xu)=xD_xu+(1/i)u$ と計算しても一致します。**主シンボルは掛け算として交換可能でも、作用素全体には一階低い非可換補正がある**わけです。

## 5. 楕円性――高周波で割れる方向

主シンボル $a_m$ は $\xi\ne0$ で同次です。ある点と方向で $a_m\ne0$ なら、連続性と同次性から近くの錐で $|a_m(x,\xi)|\ge c|\xi|^m$ と評価できます。低次項 $O(|\xi|^{m-1})$ は高周波で主部より一段小さいため、十分大きな $|\xi|$ では $a$ 自体も同じ方向で割れます。

<a id="def-mica8-elliptic"></a>

<!-- formal-statement-start -->
> **定義（楕円集合と非楕円方向）**  
> $A\in\Psi^m_{\mathrm{cl}}(X)$ をスカラー古典擬微分作用素とし、主シンボルを $a_m$ とする。非零余ベクトル $(x_0,\xi_0)\in T^*X\setminus0$ において $a_m(x_0,\xi_0)\ne0$ なら、$A$ はそこで**楕円的**であるという。楕円的な点の集合を $\operatorname{Ell}(A)$、その補集合を $\operatorname{Char}(A)$ と呼ぶ。ここでの $\operatorname{Char}(A)$ は、後続章で扱うスカラー古典作用素の特性方向である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica8-elliptic -->
### 直接例：$D_y$ と $1-\Delta$

**定義の確認**。記号を非零余ベクトルに代入し、主シンボルが零になる方向を除いた集合とその補集合をそれぞれ求めます。

$D_y$（$\mathbb R^2$）では $a_1(\xi_x,\xi_y)=\xi_y$ です。$(\xi_x,\xi_y)\ne(0,0)$ のうち $\xi_y\ne0$ が楕円集合で、$\xi_y=0$ が非楕円方向です。$\xi_y\ne0$ を固定すれば近くの閉錐で $|\xi_y|\ge c|\xi|$ となり、逆数は $|\xi|^{-1}$ 程度です。

一方 $1-\Delta$ の全記号は $1+|\xi|^2$、主シンボルは $|\xi|^2$ です。$\xi\ne0$ の全方向で $|\xi|^2>0$ なので**全方向で楕円的**です。定数項 $1$ はこの判定を変えません。
<!-- definition-example-end -->

## 6. 局所逆作用素を組み立てる

全方向で割れる必要はありません。$a_m\ne0$ となる小さな錐に限定して、$A$ の逆の役割をする $B$ を作れば十分です。目指すのは **microlocal parametrix（超局所的近似逆）** です。「近似」の誤差は、その方向で任意次数だけ滑らかにするように設計します。以下の定理で条件を確定します。

まず、開錐 $\Gamma\subset\mathbb R^n\setminus0$ で記号 $r$ が**無限次に減衰**するとは、$\Gamma$ の内側の小さい閉錐と小さい $x$ 近傍で、すべての $N$ に対し $r\in S^{-N}$ の評価が成り立つこととします。その方向で $\operatorname{Op}(r)$ は局所波面を持ち込まないことを次節で確認します。

<a id="lem-mica8-asymptotic-sum"></a>

<!-- formal-statement-start -->
> **補題（記号の漸近和）**  
> $q_j\in S^{\mu-j}_{1,0}(X)$（$j=0,1,\ldots$）が与えられたとする。各コンパクトな $x$ 範囲で、記号 $q\in S^\mu_{1,0}(X)$ を選んで、任意の $N\ge1$ について

$$
q-\sum_{j=0}^{N-1}q_j\in S^{\mu-N}_{1,0}
$$

> とできる。二つの選び方の差は $S^{-\infty}$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

下位の項ほど高周波に移してから足します。各コンパクト集合・有限個の微分半ノルムに対して、小さくなるように切り取り位置を選ぶことが鍵です。

<!-- proof-start -->
### 証明

$\chi\in C^\infty(\mathbb R^n)$ を $|\xi|\le1$ で $0$、$|\xi|\ge2$ で $1$ とし、$\varepsilon_j\downarrow0$ を十分速く選びます。

$$
q(x,\xi)=\sum_{j=0}^\infty\chi(\varepsilon_j\xi)q_j(x,\xi)
$$

と置くと、固定された $\xi$ では $\varepsilon_j|\xi|\le1$ が大きい $j$ で成立し、和は局所有限です。$X$ のコンパクト集合の可算な増大列、微分次数の可算な組について、$j$ 番目までの半ノルムをそれぞれ $2^{-j}$ 以下にできるよう $\varepsilon_j$ を小さく選びます。これは $q_j$ が次数 $\mu-j$ であり、$\chi(\varepsilon_j\xi)$ の台が $|\xi|\gtrsim\varepsilon_j^{-1}$ にあるため、$j>N$ なら $S^{\mu-N}$ の半ノルムが高周波で小さくなることによります。従って任意の固定 $N$ で $j\ge N$ の尾和は $S^{\mu-N}$ に収束します。

初めの有限個の項では $(1-\chi(\varepsilon_j\xi))q_j$ は $\xi$ に関してコンパクト支持され $S^{-\infty}$ です。ゆえに所要の漸近展開が成り立ちます。二つの和の差は任意の $S^{\mu-N}$ に属し、$N$ が任意なので $S^{-\infty}$ です。
<!-- proof-end -->

<a id="thm-mica8-parametrix"></a>

<!-- formal-statement-start -->
> **定理（楕円方向のmicrolocal parametrix）**  
> $A\in\Psi^m_{\mathrm{cl}}(X)$ を適切に支持されたスカラー作用素とし、$(x_0,\xi_0)\in\operatorname{Ell}(A)$ とする。その点の小さな座標近傍と錐近傍で、$B\in\Psi^{-m}_{\mathrm{cl}}$ と次数0の局所化作用素 $Q\in\Psi^0$ を選び、$Q$ の記号がさらに小さな錐で高周波において $1$ となり、

$$
BA=Q+R,
$$

> とできる。ここで $R$ は $(x_0,\xi_0)$ の近くで無限次に減衰する記号を持つ（従ってその方向では平滑化する）。このような $B$ をその方向での **microlocal parametrix（超局所的近似逆）** と呼ぶ。作用素と等式は必要なら台を切った局所的な意味で解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

まず主シンボルを逆数にし、合成公式で残る次数 $-1$ の誤差を次の次数 $-m-1$ の記号で打ち消します。これを繰り返してから[漸近和補題](#lem-mica8-asymptotic-sum)で一つの記号へまとめます。「一回逆数を取っただけで正確な逆ができる」という主張ではありません。

<!-- proof-start -->
### 証明

楕円性と連続性により $x_0$ の近傍 $U$ と $\xi_0$ を含む錐 $\Gamma$ を縮めれば、$|\xi|\ge1$ で $|a_m(x,\xi)|\ge c|\xi|^m$ です。$U$ 内の $x$ 切り取り $\phi$ と $\Gamma$ 内の角度切り取り $\rho$ を取り、より小さい $U'\times\Gamma'$ で両方 $1$ とします。$|\xi|\ge2$ では

$$
b_{-m}(x,\xi)=\frac{\phi(x)\rho(\xi/|\xi|)}{a_m(x,\xi)}
$$

とし、$|\xi|\le2$ は滑らかに補います。分母は切り取りの台で零にならず、同次性と積・商の微分から $b_{-m}\in S^{-m}$ です。[合成公式](#lem-mica8-composition)より $\operatorname{Op}(b_{-m})A$ の次数0の主部は $\phi\rho$ で、誤差の最上位は次数 $-1$ です。

ここで $b^{(N)}=b_{-m}+b_{-m-1}+\cdots+b_{-m-N+1}$ を作り、$b^{(N)}\# a-\phi\rho$ が $U'\times\Gamma'$ で $S^{-N}$ となるよう帰納的に選びます。残差の次数 $-N$ の同次項を $r_{-N}$ とすると、次の補正を小錐内で

$$
b_{-m-N}=-\frac{r_{-N}}{a_m}
$$

と置き、外側へ滑らかに切り取ります。その補正と $a_m$ の積が $r_{-N}$ を相殺し、補正記号を微分した合成項はさらに一次低いので、新しい残差は $S^{-N-1}$ です。帰納基底 $N=1$ は上の $b_{-m}$ です。

[漸近和補題](#lem-mica8-asymptotic-sum)により $b\sim\sum_{j\ge0}b_{-m-j}\in S^{-m}$ を取ると、任意の $N$ で $b\#a-\phi\rho\in S^{-N}$ が小錐内に成立します。$B=\operatorname{Op}(b)$、$Q=\operatorname{Op}(\phi\rho)$ として、局所化に伴う滑らかな核を $R$ に吸収すれば主張を得ます。全域での逆や境界条件に関する逆を作ったわけではありません。
<!-- proof-end -->

### 最小例：定数係数なら正確な逆が見える

$A=1+D_x^2$ について $b(\xi)=(1+\xi^2)^{-1}$ と取れば、Fourier乗数として $BA=I$ が成り立ちます。ここでは $x$ 微分の補正項がすべて零なので、局所近似逆は全域で正確な逆になります（適切な支持への局所化では対角線外に滑らかな核の差が残ります）。

## 7. 波面集合に対する二方向の包含

前節の逆作用素を正則性判定に使うため、まず「滑らかな核は新たな特異性を作らない」「記号の局所化は指定錐の周波数だけを取り出す」を確認します。

<a id="lem-mica8-microlocal-cutoff"></a>

<!-- formal-statement-start -->
> **補題（周波数局所化と波面）**  
> $u\in\mathcal D'(X)$、$Q\in\Psi^0(X)$ を適切に支持された作用素とする。ある $(x_0,\xi_0)$ の近くで $Q$ の記号が高周波において $1$ であるなら、$u-Qu$ はその点と方向で滑らかである。またその方向で $S^{-\infty}$ の記号を持つ $R$ に対して $(x_0,\xi_0)\notin WF(Ru)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

小さい $x$ 切り取りを置き、[MICA3の波面定義](../MICA3/index.md#def-mica3-wavefront)の局所Fourier変換を計算します。記号が $0$ または $1$ になる狭い錐の外からの周波数の漏れは、切り取り関数のFourier変換の急減少で抑えます。

<!-- proof-start -->
### 証明

$\chi\in C_c^\infty(X)$ を $x_0$ の周りで $1$ とし、$u$ を $\chi u$ に置き換えた際の遠方の部分は、核が対角線外で滑らかであることから $x_0$ 近くでは滑らかです。$\varphi\in C_c^\infty(X)$ を $x_0$ の小近傍に支持させると、周波数表示は

$$
\widehat{\varphi\operatorname{Op}(r)(\chi u)}(\eta)
=(2\pi)^{-n}\int
\widehat{\varphi r(\cdot,\xi)}(\eta-\xi)
\widehat{\chi u}(\xi)\,d\xi.
$$

コンパクト支持分布のFourier変換は [MICA1の多項式増大](../MICA1/index.md#prop-mica1-polynomial-growth) を満たします。一方 $\varphi r$ の $x$ 微分は記号評価で制御されるので、$x$ に関する部分積分を $L$ 回施すと

$$
|\widehat{\varphi r(\cdot,\xi)}(\eta-\xi)|
\le C_{L,M}\langle\eta-\xi\rangle^{-L}
\langle\xi\rangle^{-M}
$$

が $r$ の $S^{-\infty}$ 性の成立する錐で任意の $L,M$ に対して成り立ちます。$\eta$ をその内側の錐に限定し、積分を $\xi$ がやや広い錐内の場合とその外に分けます。前者では上式の任意次数 $\xi$ 減衰を使い、後者では錐の角度分離から $|\eta-\xi|\ge c(|\eta|+|\xi|)$ を使います。どちらも $\eta$ の任意次数の急減少を与えます。

$Q$ の記号が小錐で $1$ の場合は $I-Q$ の記号がそこで $0$、従って $S^{-\infty}$ です。今示した評価を $r=1-q$ に適用すれば $u-Qu$ はその方向で滑らかになります。
<!-- proof-end -->

<a id="thm-mica8-pseudolocal"></a>

<!-- formal-statement-start -->
> **定理（擬微分作用素の擬局所性）**  
> $A\in\Psi^m(X)$ が適切に支持され、$u\in\mathcal D'(X)$ とする。このとき $Au$ は分布として定義でき、

$$
WF(Au)\subset WF(u).
$$

> 特に $u$ がある点・方向で滑らかなら $Au$ もそこで滑らかである。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ の悪い周波数がない錐では、局所Fourier変換が急減少します。積分の周波数が別の方向へ漏れる部分は、$x$ の滑らかな係数をFourier変換すると急減少することで抑えます。

<!-- proof-start -->
### 証明

適切な支持からコンパクト集合上で作用させるために必要な入力部分はコンパクトに切り出せます。$x_0$ 近くで $\chi=1$ とした $\chi u$ を用い、核の対角線外の滑らかさから残りの入力は出力近傍で滑らかです。$(x_0,\eta_0)\notin WF(u)$ とし、[波面定義](../MICA3/index.md#def-mica3-wavefront)から $\widehat{\chi u}(\xi)$ が急減少する開錐 $\Gamma$ を選びます。$\varphi$ の台と出力錐 $\Gamma'\Subset\Gamma$ をさらに縮めます。

[局所化補題の積分表示](#lem-mica8-microlocal-cutoff)で $r=a$ とし、$x$ に関する部分積分を用いると

$$
|\widehat{\varphi a(\cdot,\xi)}(\eta-\xi)|
\le C_L\langle\xi\rangle^m
\langle\eta-\xi\rangle^{-L}.
$$

$\xi\in\Gamma$ では $\widehat{\chi u}(\xi)$ が任意次数に減衰するので、$L$ と減衰次数を十分大きくすると積分は $\eta$ について急減少します。$\xi\notin\Gamma$、$\eta\in\Gamma'$ では錐の角度分離 $|\eta-\xi|\ge c(|\eta|+|\xi|)$ と $\widehat{\chi u}$ の多項式上界を使い、$L$ を大きくすれば同じ結論になります。従って $(x_0,\eta_0)\notin WF(Au)$ です。滑らかな核からの項も $WF$ は空です。
<!-- proof-end -->

<a id="thm-mica8-elliptic-regularity"></a>

<!-- formal-statement-start -->
> **定理（スカラー擬微分作用素の楕円正則性）**  
> $A\in\Psi^m_{\mathrm{cl}}(X)$ が適切に支持されたスカラー古典擬微分作用素で、$u\in\mathcal D'(X)$ とする。このとき

$$
WF(Au)\subset WF(u),\qquad
WF(u)\cap\operatorname{Ell}(A)\subset WF(Au).
$$

> 同値に $WF(u)\subset WF(Au)\cup\operatorname{Char}(A)$ である。特に全非零余接方向で楕円的で $Au\in C^\infty(X)$ なら $u\in C^\infty(X)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一つ目は[擬局所性](#thm-mica8-pseudolocal)です。逆向きは、楕円的な方向で[局所近似逆](#thm-mica8-parametrix)を $Au$ に掛けて、$u$ のその方向の周波数を回収します。「高周波で割れる」ことが逆向き包含に必要な仮定です。

<!-- proof-start -->
### 証明

$WF(Au)\subset WF(u)$ は[擬局所性定理](#thm-mica8-pseudolocal)です。逆向きについて、楕円的な $(x_0,\xi_0)$ で $Au$ の波面がないと仮定します。

[楕円方向のmicrolocal parametrix](#thm-mica8-parametrix)を適用して、近傍の錐で

$$
BA=Q+R
$$

と書きます。$Au$ は仮定によりその方向で滑らかです。[擬局所性](#thm-mica8-pseudolocal)を $B$ に適用して $BAu$ も同方向で滑らかです。

一方、$Ru$ は[周波数局所化の補題](#lem-mica8-microlocal-cutoff)で同方向に滑らかです。両者を引くと

$$
Qu=BAu-Ru
$$

も同方向で滑らかです。

$Q$ の記号はより小さい錐で $1$ です。[局所化補題](#lem-mica8-microlocal-cutoff)により $u-Qu$ もそこで滑らかで、結局 $(x_0,\xi_0)\notin WF(u)$ です。これで $WF(u)\cap\operatorname{Ell}(A)\subset WF(Au)$ が示されました。

全方向で楕円的かつ $Au$ が滑らかなら $WF(Au)=\varnothing$ であり、上の二番目の包含から $WF(u)=\varnothing$ です。[波面が空であることと滑らかさの同値](../MICA3/index.md#thm-mica3-projection)により $u\in C^\infty$ が従います。
<!-- proof-end -->

### 楕円性が欠けると逆向きは破れる

$A=D_y$、$u(x,y)=H(x)$ とします。分布として $D_yu=0$ なので $WF(Au)=\varnothing$ ですが、[Heaviside分布の波面](../MICA4/index.md#thm-mica4-heaviside)と滑らかな $y$ 方向との積から

$$
WF(u)=\{(0,y;\xi_x,0):y\in\mathbb R,\ \xi_x\ne0\}.
$$

この方向で $a_1=\xi_y=0$ です。従って[楕円正則性](#thm-mica8-elliptic-regularity)と矛盾しません。ここで壊れたのは $a_m$ で割る第一段階であり、$Au=0$ だけから $u$ の滑らかさを結論することはできません。

逆に $A=1-\partial_x^2$ は一次元ですべての非零方向で楕円的です。$G(x)=\tfrac12e^{-|x|}$ は $x\ne0$ で $G''=G$、かつ $G'(0+)=-\tfrac12$、$G'(0-)=\tfrac12$ です。従って二階の分布微分は $G''=G-\delta_0$ であり、$(1-\partial_x^2)G=\delta_0$。$G$ は $C^1$ でさえないので、$G$ に波面が残ります。楕円逆作用素は有限階の正則性を改善しても、**滑らかでない右辺から無限階の滑らかさを作るわけではありません**。

## 8. 演習――記号から波面の判定まで

### 演習 MICA8-A1：微分作用素の主シンボル

- Level: A
- 目安時間: 16分

$P=3D_x^2+2xD_x+5$（$x\in\mathbb R$）の全記号、次数、主シンボルを計算せよ。$x=0$ でも楕円的か調べよ。

<!-- solution-start -->
#### 詳細解答

$D_xe^{ix\xi}=\xi e^{ix\xi}$、$D_x^2e^{ix\xi}=\xi^2e^{ix\xi}$ を係数ごとに使うと

$$
Pe^{ix\xi}=(3\xi^2+2x\xi+5)e^{ix\xi}.
$$

従って全記号 $p=3\xi^2+2x\xi+5$、次数2、主シンボル $p_2=3\xi^2$ です。$x=0$ では一次項は消えますが、$\xi\ne0$ に対して $p_2(0,\xi)=3\xi^2>0$。よって[楕円性の定義](#def-mica8-elliptic)から楕円的です。
<!-- solution-end -->

### 演習 MICA8-A2：逆数記号の微分評価

- Level: A
- 目安時間: 19分

$a(\xi)=(1+\xi^2)^{-1}$ について $a'$ と $a''$ を計算し、$|a^{(k)}(\xi)|\le C_k\langle\xi\rangle^{-2-k}$ が一般の $k$ に成り立つ理由を示せ。

<!-- solution-start -->
#### 詳細解答

微分すると

$$
a'=-2\xi(1+\xi^2)^{-2},\qquad
a''=-2(1+\xi^2)^{-2}+8\xi^2(1+\xi^2)^{-3}.
$$

$a^{(k)}=Q_k(\xi)(1+\xi^2)^{-k-1}$、$\deg Q_k\le k$ を帰納仮定とすると、商の微分で

$$
Q_{k+1}=(1+\xi^2)Q_k'-2(k+1)\xi Q_k,
$$

従って $\deg Q_{k+1}\le k+1$ です。$|\xi|\ge1$ では $|Q_k|\le C_k|\xi|^k$ かつ $(1+\xi^2)^{k+1}\ge|\xi|^{2k+2}$ なので $|a^{(k)}|\le C_k|\xi|^{-k-2}$。$|\xi|\le1$ は連続性による有限上界と $\langle\xi\rangle\asymp1$ を使います。これが[記号クラス](#def-mica8-symbol-class)の全微分次数の条件です。
<!-- solution-end -->

### 演習 MICA8-A3：楕円錐を求める

- Level: A
- 目安時間: 17分

$A=D_x+2D_y$（$\mathbb R^2$）の $\operatorname{Ell}(A)$ と $\operatorname{Char}(A)$ を求め、$(1,0)$ と $(-2,1)$ の周波数方向を判定せよ。

<!-- solution-start -->
#### 詳細解答

$a_1(\xi_x,\xi_y)=\xi_x+2\xi_y$ です。基点 $(x,y)$ に依存せず、非零の周波数で $\xi_x+2\xi_y\ne0$ なら楕円的です。従って

$$
\operatorname{Char}(A)=\{(x,y;\xi_x,\xi_y):
(\xi_x,\xi_y)\ne0,\ \xi_x+2\xi_y=0\}.
$$

その補集合が $\operatorname{Ell}(A)$ です。$(1,0)$ では $a_1=1\ne0$、$(-2,1)$ では $a_1=0$。後者では主シンボルの逆を局所的に作れず、前者には[近似逆](#thm-mica8-parametrix)を構成できます。
<!-- solution-end -->

### 演習 MICA8-A4：無限次減衰と滑らかな核

- Level: A
- 目安時間: 18分

一次元の $r(\xi)=e^{-\xi^2}$ が $S^{-\infty}$ に入ることを示し、そのFourier乗数がコンパクト支持分布を滑らかな関数へ送る理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$r^{(k)}(\xi)=P_k(\xi)e^{-\xi^2}$ と書け、$P_0=1$、$P_{k+1}=P_k'-2\xi P_k$ により $P_k$ は次数高々 $k$ の多項式です。任意の整数 $M$ に対し $\langle\xi\rangle^M|P_k(\xi)|e^{-\xi^2}$ は有界です。従って全 $k,M$ で $|r^{(k)}|\le C_{k,M}\langle\xi\rangle^{-M}$、すなわち $S^{-\infty}$ です。

$u$ がコンパクト支持分布なら [多項式増大評価](../MICA1/index.md#prop-mica1-polynomial-growth)により $|\widehat u(\xi)|\le C\langle\xi\rangle^N$。任意の $j$ について $\xi^j r(\xi)\widehat u(\xi)$ は可積分なので、Fourier反転積分を $x$ で $j$ 回微分できます。任意の $j$ で連続な導関数が存在するため出力は $C^\infty$ です。
<!-- solution-end -->

### 演習 MICA8-B1：非可換補正を計算する

- Level: B
- 目安時間: 25分

$A=D_x^2$、$B$ を $x^2$ の乗算とする。[擬微分作用素の合成公式](#lem-mica8-composition)を使って合成 $AB$ の全記号を求め、Leibniz則による直接計算と照合せよ。

<!-- solution-start -->
#### 詳細解答

$a=\xi^2$、$b=x^2$ として、$\partial_\xi a=2\xi$、$\partial_\xi^2a=2$、$D_xb=2x/i$、$D_x^2b=2/i^2=-2$ です。三階以上は消え、[合成公式](#lem-mica8-composition)から

$$
c(x,\xi)=\xi^2x^2+(2\xi)(2x/i)
+\frac12(2)(-2)=x^2\xi^2-4ix\xi-2.
$$

一方 $D_x^2=-\partial_x^2$ なので

$$
D_x^2(x^2u)=-\partial_x(2xu+x^2u')
=-2u-4xu'-x^2u''.
$$

記号による演算 $-4ixD_xu=-4xu'$、$x^2D_x^2u=-x^2u''$ と合わせると一致します。一次低い補正は $x$ 微分と $\xi$ 微分を組み合わせたものです。
<!-- solution-end -->

### 演習 MICA8-B2：対角線外の平滑性を再導出する

- Level: B
- 目安時間: 26分

$a\in S^m_{1,0}(\mathbb R)$、$K(x,y)=(2\pi)^{-1}\int e^{i(x-y)\xi}a(x,\xi)\,d\xi$（振動積分）とする。$|x-y|\ge\varepsilon>0$ で $K$ が任意階微分可能となる積分による評価を示せ。

<!-- solution-start -->
#### 詳細解答

$r=x-y$ とすると $e^{ir\xi}=(ir)^{-1}\partial_\xi e^{ir\xi}$ です。$N$ 回の部分積分で

$$
K(x,y)=(2\pi)^{-1}(-1)^N(ir)^{-N}
\int e^{ir\xi}\partial_\xi^N a(x,\xi)\,d\xi.
$$

記号評価では $|\partial_\xi^Na|\le C\langle\xi\rangle^{m-N}$。$N>m+1$ なら一次元の積分が絶対収束します。$\partial_x^j\partial_y^k$ は指数因子から高々 $j+k$ 次の $\xi$ を出すほか、$r^{-N}$ の微分を出します。$|r|\ge\varepsilon$ で後者は有界なので、$N>m+j+k+1$ と取り直せば導関数を積分内に移せます。従ってすべての $j,k$ に対して連続な導関数が存在し、$K$ は対角線外で滑らかです。
<!-- solution-end -->

### 演習 MICA8-B3：円錐上の逆と非楕円方向

- Level: B
- 目安時間: 30分

$A=D_x+2D_y$ とし、非零周波数 $\xi^0=(1,0)$、$\zeta^0=(-2,1)$ を考える。$\xi^0$ の近くで次数 $-1$ の局所的な逆記号を作り、$\zeta^0$ では同じ構成が不可能な理由を示せ。$u(x,y)=H(y-2x)$ では $Au$ がどうなるか調べよ。

<!-- solution-start -->
#### 詳細解答

$a_1=\xi_x+2\xi_y$ です。$\xi^0$ を含み $|\xi_x+2\xi_y|\ge c|\xi|$ となる錐 $\Gamma$ を十分小さく取り、その内側で $1$ となる角度切り取り $\rho$ を選びます。

$$
b_{-1}(\xi)=\frac{\rho(\xi/|\xi|)}{\xi_x+2\xi_y}
\quad(|\xi|\ge2)
$$

を低周波で滑らかに補えば、分母の一次同次性と微分から $S^{-1}$ です。$A$ は定数係数なので [合成公式](#lem-mica8-composition) の $x$ 微分補正は零で、内側の錐で $\operatorname{Op}(b_{-1})A=I$ が高周波で成立します。

$\zeta^0$ では $a_1=-2+2=0$ なので逆数が発散し、この構成はできません。さらに $u=H(s)$、$s=y-2x$ と置くと、分布の連鎖律で $D_xu=(-2/i)\delta(s)$、$2D_yu=(2/i)\delta(s)$、ゆえに $Au=0$ です。$u$ の特異方向は $ds=(-2,1)$ の非零倍であり、非楕円方向です。特異性を見落とす機構が式で確認できました。
<!-- solution-end -->

### 演習 MICA8-C1：楕円逆と非楕円逆の境界

- Level: C
- 目安時間: 40分

一次元で $A=1-\partial_x^2$、$G(x)=\tfrac12e^{-|x|}$ とする。

1. $A$ の全記号・主シンボル・楕円集合を求め、Fourier側の逆記号が $S^{-2}$ に属することを確認せよ。
2. 分布として $AG=\delta_0$ を、導関数の跳びから証明せよ。$G$ が滑らかでないことと[楕円正則性](#thm-mica8-elliptic-regularity)の整合を説明せよ。
3. 二次元の $B=D_y$、$v(x,y)=H(x)$ について $Bv=0$ なのに $v$ が滑らかでないことを示し、(2) と違う仮定を特定せよ。

<!-- solution-start -->
#### 詳細解答

**（1）逆記号。** $D_x=-i\partial_x$ なので $A=1+D_x^2$ であり、全記号は $1+\xi^2$、主シンボルは $\xi^2$ です。$\xi\ne0$ なら $\xi^2>0$ なので全非零方向が楕円集合です。$b=(1+\xi^2)^{-1}$ について演習A2の帰納計算により $|b^{(k)}|\le C_k\langle\xi\rangle^{-2-k}$。従って $b\in S^{-2}$ で、Fourier側で $(1+\xi^2)b=1$ となります。

**（2）跳びからのデルタ。** $x>0$ で $G'= -\tfrac12e^{-x}$、$x<0$ で $G'=\tfrac12e^x$ です。$G$ 自身は $0$ で連続ですが、$G'$ の跳びは $G'(0+)-G'(0-)=-1$ です。区分的 $C^1$ 関数の分布微分では、各区間の通常の導関数に「跳び $\times\delta_0$」を加えます。試験関数 $\varphi$ に対する左右の部分積分でも境界項 $-\varphi(0)$ が出るため、

$$
G''=G-\delta_0,\qquad
AG=G-G''=\delta_0.
$$

$G$ は $0$ で微分不可能なので $WF(G)\ne\varnothing$ です。しかし右辺 $\delta_0$ も [MICA4のデルタの波面](../MICA4/index.md#prop-mica4-point-delta) により $(0,\xi)$、$\xi\ne0$ に特異です。[楕円正則性](#thm-mica8-elliptic-regularity)は $WF(G)\subset WF(AG)$ を保証するだけで、$AG$ が滑らかとは仮定していません。矛盾はありません。

**（3）条件の比較。** $Bv=D_yH(x)=0$ は $y$ に依存しないことから分布として成立します。$v$ は $x=0$ をまたいで跳ぶため滑らかでなく、その非零余法線は $(\xi_x,0)$ です。しかし $B$ の主シンボルは $\xi_y$ で、その方向では零になります。従って $B$ は $v$ の特異方向で楕円的でなく、(2) と違って逆向き包含を適用する仮定を満たしません。
<!-- solution-end -->

## 9. 何が分かったか

- 記号クラス $S^m_{1,0}$ は高周波の増大と周波数微分の減衰を管理し、その量子化は微分作用素とFourier乗数を含みます。
- 古典記号の主シンボルは最高次数の同次部分で、合成すると掛け算になります。低次の非可換補正は合成公式で追えます。
- 主シンボルが非零の方向だけ、漸近展開で microlocal parametrix を作れます。楕円正則性は $WF(Au)\subset WF(u)\subset WF(Au)\cup\operatorname{Char}(A)$ です。
- 次の MICA9 では、主シンボルが**零となる方向**を特性集合として詳しく調べ、そこでの Hamilton 流と特異性の伝播へ進みます。
