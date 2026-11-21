# ANF7 単数定理とレギュレータ

[ANF6 のイデアル類群](../ANF6/index.md#def-anf6-ideal-class-group)は、イデアルが主イデアルからどれだけ外れるかを測りました。しかし主イデアル $(\alpha)$ が与えられても、その生成元は一意ではありません。$(\alpha)=(\beta)$ なら $\beta/\alpha$ は整数環の単元です。この「同じ主イデアルの生成元を替える自由度」に、有限個の基本単数で記述できる構造があることを示します。

有限性を証明する前講とは対照的に、実埋め込みをもつ数体では単数が無限に存在することがあります。乗法を加法へ変える対数埋め込みと、[ANF5 の Minkowski 埋め込み](../ANF5/index.md#def-anf5-minkowski-embedding)が作る格子を組み合わせると、その無限集合の規則正しさが見えます。

学習後には、単数群の有限位数部分と自由部分を分離し、単数の全体構造を証明できます。また、対数格子の大きさを基底の取り方に依存しない量として計算できます。

## 1. 単数：同じ主イデアルを生成する元

以下、$K/\mathbb Q$ を次数 $n$ の数体、$A=\mathcal O_K$ をその整数環とします。$A$ の元 $u$ について、$u^{-1}$ も $A$ に含まれるなら $u$ は単元です。単元同士は積と逆元について閉じるので乗法群を作ります。

<a id="def-anf7-unit-group"></a>

<!-- formal-statement-start -->
> **定義（数体の単数群）**  
> 数体 $K$ の整数環 $A=\mathcal O_K$ の**単数群**を

$$
U_K=A^\times=\{u\in A:\ \exists v\in A,\ uv=1\}
$$

> とする。$K$ に含まれるすべての1の冪根からなる部分群を $\mu(K)$ とする。ここで1の冪根とは、ある整数 $m\geq1$ について $\zeta^m=1$ を満たす元 $\zeta\in K^\times$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf7-unit-group -->
**定義の確認**　$\mathbb Q(\sqrt2)$ の整数環は $A=\mathbb Z[\sqrt2]$ です。$u=1+\sqrt2$ は $(1+\sqrt2)(\sqrt2-1)=1$ を満たし、両因子は $A$ に属します。よって $u\in U_K$ です。一方、$2$ の逆元 $1/2$ は $A$ に属さず、$2$ は単元ではありません。また $-1$ は $(-1)^2=1$ なので $\mu(K)$ に入ります。
<!-- definition-example-end -->

[単元のノルム判定](../ANF2/index.md#prop-anf2-unit-norm)により、$0\ne u\in A$ が単元であることと $|N_{K/\mathbb Q}(u)|=1$ は同値です。前述の $1+\sqrt2$ は $(1+\sqrt2)(1-\sqrt2)=-1$ だから単元と判定できます。主イデアル $(a)=(b)$ の場合は $a=bc,\ b=ad$ となる $c,d\in A$ が存在し、$cd=1$ より $a/b=c\in U_K$ です。したがって単数は、生成元の取り替えをちょうど表します。

## 2. 複素埋め込みを2回数える対数

$K$ には $r_1$ 個の実埋め込み $\sigma_1,\ldots,\sigma_{r_1}$ と、複素共役の各組から一つを選んだ $r_2$ 個の非実埋め込み $\tau_1,\ldots,\tau_{r_2}$ があり、$n=r_1+2r_2$ です。$s=r_1+r_2$ と置きます。[体ノルムの埋め込み公式](../ANF2/index.md#thm-anf2-embedding-formulas)では、複素埋め込みとその共役の絶対値が等しいため、積に二乗が現れます。

$$
|N_{K/\mathbb Q}(a)|
=\prod_{i=1}^{r_1}|\sigma_i(a)|
 \prod_{j=1}^{r_2}|\tau_j(a)|^2
\qquad(a\in K^\times).
$$

各絶対値は正なので自然対数を取れます。これにより乗法を座標ごとの加法へ変えます。

<a id="def-anf7-log-embedding"></a>

<!-- formal-statement-start -->
> **定義（重み付き対数埋め込み）**  
> $K$ の実埋め込みを $\sigma_1,\ldots,\sigma_{r_1}$、非実埋め込みの共役組から選んだものを $\tau_1,\ldots,\tau_{r_2}$ とし、$s=r_1+r_2$ とする。写像 $L:K^\times\to\mathbb R^s$ を

$$
L(a)=\bigl(
\log|\sigma_1(a)|,\ldots,\log|\sigma_{r_1}(a)|,\,
2\log|\tau_1(a)|,\ldots,2\log|\tau_{r_2}(a)|
\bigr)
$$

> で定める。$H=\{(x_1,\ldots,x_s)\in\mathbb R^s:\sum_{i=1}^s x_i=0\}$ を**対数超平面**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf7-log-embedding -->
**定義の確認**　$K=\mathbb Q(\sqrt2)$ では $r_1=2,\ r_2=0$ です。$\varepsilon=1+\sqrt2$ と置き、$\sigma_1(\sqrt2)=\sqrt2,\ \sigma_2(\sqrt2)=-\sqrt2$ とすると、$|\sigma_2(\varepsilon)|=\sqrt2-1=\varepsilon^{-1}$ です。よって

$$
L(\varepsilon)=\bigl(\log\varepsilon,-\log\varepsilon\bigr)\in H.
$$

> また $K=\mathbb Q(i)$ では $r_1=0,\ r_2=1$ です。$u=i$ に対し $L(u)=(2\log|i|)=(0)$ です。複素座標には重み2を付けるものの、共役組は一つの座標として数えます。
<!-- definition-example-end -->

積について $L(ab)=L(a)+L(b)$ です。ノルム公式から

$$
\sum_{i=1}^s L_i(a)=\log|N_{K/\mathbb Q}(a)|.
$$

特に $u\in U_K$ ならノルムの絶対値が1なので $L(u)\in H$ です。**単数群の対数像は、$\mathbb R^s$ 全体ではなく次元 $s-1$ の空間に入る**ことが階数を決める出発点です。$s=1$ の場合は $H=\{0\}$ と解釈します。

## 3. 対数像の核と離散性

まず、すべての埋め込みで絶対値が1となる単数はどれだけあるでしょうか。答えは有限個だけです。その理由は、[整数環の Minkowski 格子](../ANF5/index.md#thm-anf5-ideal-covolume)が有界集合の中に有限個の格子点しかもたないことにあります。

<a id="lem-anf7-kernel-discrete"></a>

<!-- formal-statement-start -->
> **補題（対数写像の核と離散性）**  
> 数体 $K$ の単数群を $U_K$ とし、[重み付き対数埋め込み](#def-anf7-log-embedding)を $L$ とする。このとき

$$
\ker(L|_{U_K})=\mu(K)
$$

> であり、$\mu(K)$ は有限群である。さらに $L(U_K)\subseteq H$ は離散部分群であり、任意の有界集合に属する像の点は有限個である。
<!-- formal-statement-end -->

### 証明の見取り図

$L(u)$ が有界なら各埋め込みの $|u|$ は上から抑えられます。実・複素座標での像が有界であるため、整数環の格子から候補が有限個になります。核は有限群となり、有限位数の元が1の冪根であることを使います。

<!-- proof-start -->
### 証明

$B\subset\mathbb R^s$ を有界集合とします。$L(u)\in B$ である単数 $u$ について、ある $M>0$ により全座標で $L_i(u)\leq M$ です。実埋め込みでは $|\sigma_i(u)|\leq e^M$、非実埋め込みでは $|\tau_j(u)|\leq e^{M/2}$ です。従って [Minkowski 埋め込み](../ANF5/index.md#def-anf5-minkowski-embedding) $j(u)\in\mathbb R^{r_1}\times\mathbb C^{r_2}$ は有界集合に属します。

[整数環とイデアルの共体積](../ANF5/index.md#thm-anf5-ideal-covolume)により $j(A)$ は全階数格子です。整数基底の実座標行列が可逆なので、基底係数が整数の点のうち有界領域に入るものは有限個です。ゆえに $L(u)\in B$ となる単数 $u$ は有限個です。特に $L(U_K)\cap B$ は有限個であり、対数像は離散的です。

$L(u)=0$ なら、実・非実の全埋め込みで $|u|=1$ なので前段の有限集合に属します。$L$ は準同型だから、$u^m$ もすべて核に属します。核は有限集合なので、異なる二つの自然数 $p<q$ で $u^p=u^q$ となり、$u^{q-p}=1$ です。よって $u\in\mu(K)$ です。逆に $\zeta^m=1$ なら各埋め込みで $|\sigma(\zeta)|^m=1$ なので $L(\zeta)=0$ です。$\mu(K)$ が有限であることも核の有限性から従います。
<!-- proof-end -->

たとえば $\mathbb Q(i)$ では $\mu(K)=\{1,-1,i,-i\}$ です。有限位数部分は対数写像で消えますが、単数の無限位数部分はまだ残ります。

## 4. 動かせる凸体から、対数格子の穴をふさぐ

離散性だけでは、単数の階数が $s-1$ とまではいえません。たとえば平面内の $\mathbb Z(1,0)$ は離散ですが、縦方向へ無制限に離れられます。必要なのは、**超平面のどの点も、ある単数の対数から一定の距離以内にある**ことです（相対稠密性）。

ここで前講の二つの結果を使います。第一に [Minkowski の凸体定理と整数環の共体積](../ANF5/index.md#thm-anf5-ideal-covolume)によって、一定体積を超える対称凸体は非零整数を含みます。第二に [ノルム有界な整イデアルの有限性](../ANF6/index.md#lem-anf6-bounded-ideal-norm)によって、その整数が生成する主イデアルの種類は有限個です。

<a id="lem-anf7-coarse-cover"></a>

<!-- formal-statement-start -->
> **補題（対数像による有界距離被覆）**  
> 数体 $K$ の $s=r_1+r_2$ に対して、$H$ と $L$ を [対数埋め込みの定義](#def-anf7-log-embedding)のとおりとする。$K$ のみに依存する定数 $C>0$ が存在して、任意の $x\in H$ に対しある単数 $u\in U_K$ を選べば

$$
\max_{1\leq i\leq s}|L_i(u)-x_i|\leq C
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ に合わせて実座標の辺と複素座標の円盤半径を伸縮します。$x\in H$ なので体積は変わりません。凸体定理で拾った $a$ は、生成するイデアル $(a)$ のノルムが一様に有界です。その有限種類の生成元 $b_I$ で割ると $u=a/b_I$ は単数となり、$L(u)$ が $x$ を一様誤差で近似します。

<!-- proof-start -->
### 証明

$n=r_1+2r_2$ とし、各座標の重みを $w_i=1$（実座標）、$w_i=2$（複素座標）とします。$x=(x_1,\ldots,x_s)\in H$ を任意に固定します。実・複素座標の積空間 $\mathbb R^{r_1}\times\mathbb C^{r_2}$ で、次の閉集合を考えます。

$$
C_x=\left\{(z_i):
\begin{array}{ll}
|z_i|\leq R e^{x_i}&(1\leq i\leq r_1),\\
|z_{r_1+j}|\leq R e^{x_{r_1+j}/2}&(1\leq j\leq r_2)
\end{array}
\right\}.
$$

ここで $R>1$ は後で定める定数です。$C_x$ は原点対称で凸かつコンパクトです。実方向の区間の長さは $2Re^{x_i}$、複素方向の円盤面積は $\pi R^2e^{x_{r_1+j}}$ なので、実次元 $n$ での体積は

$$
\operatorname{vol}(C_x)
=2^{r_1}\pi^{r_2}R^{r_1+2r_2}
  \exp\left(\sum_{i=1}^s x_i\right)
=2^{r_1}\pi^{r_2}R^n.
$$

最後の等号では $\sum x_i=0$ を使いました。[整数環の共体積公式](../ANF5/index.md#thm-anf5-ideal-covolume)は $\operatorname{covol}(j(A))=2^{-r_2}\sqrt{|D_K|}$ です。そこで $R>1$ を

$$
2^{r_1}\pi^{r_2}R^n
>2^n\,2^{-r_2}\sqrt{|D_K|}
$$

となるように固定します。[Minkowski の凸体定理](../ANF5/index.md#thm-anf5-ideal-covolume)を格子 $j(A)$ と $C_x$ に適用でき、$0\ne a\in A$ で $j(a)\in C_x$ となるものが存在します。

[体ノルムの埋め込み公式](../ANF2/index.md#thm-anf2-embedding-formulas)へ各座標の上界を代入すると

$$
1\leq |N_{K/\mathbb Q}(a)|
\leq\prod_{i=1}^{r_1}(Re^{x_i})
 \prod_{j=1}^{r_2}(Re^{x_{r_1+j}/2})^2
=R^n.
$$

左辺は $a$ が非零代数的整数なのでノルムが非零整数であるためです。前講の [Minkowskiの類数上界と類群の有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound) の証明でも使った主イデアルのノルム等式により $N((a))=|N_{K/\mathbb Q}(a)|\leq R^n$ です。[ノルム有界な整イデアルの有限性](../ANF6/index.md#lem-anf6-bounded-ideal-norm)により、このような主整イデアルの集合 $\mathcal S$ は有限です。

各 $I\in\mathcal S$ に一つの生成元 $b_I\in A\setminus\{0\}$ を固定します。$(a)=I=(b_I)$ なら、[単数群の定義](#def-anf7-unit-group)で確かめた主イデアル生成元の同値性により $u=a/b_I\in U_K$ です。

$d_i=L_i(a)-x_i$ とおきます。$a\in C_x$ の絶対値上界を対数に直せば $d_i\leq w_i\log R$。一方、

$$
\sum_{i=1}^s d_i
=\log|N_{K/\mathbb Q}(a)|-\sum_{i=1}^s x_i
=\log|N_{K/\mathbb Q}(a)|\geq0.
$$

これに各 $j\ne i$ の上界を組み合わせると

$$
d_i=\sum_jd_j-\sum_{j\ne i}d_j
\geq-\sum_{j\ne i}w_j\log R
=-(n-w_i)\log R.
$$

したがって $|d_i|\leq n\log R$ です。最後に $L(u)=L(a)-L(b_I)$ なので

$$
|L_i(u)-x_i|
\leq |d_i|+|L_i(b_I)|
\leq n\log R+\max_{I\in\mathcal S}|L_i(b_I)|.
$$

右辺は $x$ に依らない有限定数です。全座標について最大を取れば、所望の $C$ が得られます。
<!-- proof-end -->

この議論で **ノルムを上から押さえるだけで単数が見つかるわけではない**点に注意してください。有限個の主イデアル生成元 $b_I$ で割って初めて単数になります。

## 5. 離散性と有界距離被覆を組み合わせる

ここまでで、$\Gamma=L(U_K)$ は $H$ の離散部分群であり、$H$ の任意の点が $\Gamma$ から一定距離以内にあります。次は純粋に実線形代数と格子の事実です。

<a id="lem-anf7-full-lattice"></a>

<!-- formal-statement-start -->
> **補題（離散かつ相対稠密な部分群）**  
> $V$ を次元 $d\geq0$ の有限次元実内積空間、$\Gamma\subseteq V$ を加法部分群とする。$\Gamma$ の任意の有界集合との交わりが有限であり、ある $C\geq0$ について任意の $x\in V$ に $\|x-\gamma\|\leq C$ を満たす $\gamma\in\Gamma$ が存在するなら、$V$ の実ベクトル空間としての基底 $v_1,\ldots,v_d\in\Gamma$ が存在し、

$$
\Gamma=\mathbb Z v_1\oplus\cdots\oplus\mathbb Z v_d
$$

> と書ける。$d=0$ では右辺は零群とする。
<!-- formal-statement-end -->

### 証明の見取り図

最短の非零格子ベクトルを一つ選び、その方向を商に落とします。最短方向での係数を有界区間へ直せるので、直交射影後の群も離散です。これを次元帰納法で繰り返します。

<!-- proof-start -->
### 証明

$d=0$ は $V=\{0\}$ なので成立します。$d\geq1$ では相対稠密性から $\Gamma\ne\{0\}$ です。そうでなければ原点から任意に遠い $x$ を取れてしまうからです。

$\Gamma$ は各有界集合と有限個しか交わらないので、非零元の長さには正の最小値があり、その長さを達成する $v\in\Gamma\setminus\{0\}$ を選べます。直交射影 $p:V\to v^\perp$ を考え、$\Gamma'=p(\Gamma)$ と置きます。

まず射影像 $\Gamma'$ の離散性を示します。任意の $\gamma\in\Gamma$ に対し整数 $m$ を適切に選ぶと、$\gamma-mv$ の $v$ 方向の成分を長さ $\|v\|/2$ 以下へ抑えられます。

もし射影像の異なる点が原点へ収束すれば、それらを上の方法で持ち上げた $\gamma-mv$ は有界集合の中に無限個存在します。しかし、これは $\Gamma$ の局所有限性に反します。

従って射影像の原点は孤立点であり、群の平行移動によってすべての点が孤立します。同じ係数調整を使えば、射影像の任意の有界集合との交わりも有限であることが分かります。

さらに $\Gamma$ が $V$ を距離 $C$ で被覆するので、$y\in v^\perp$ に対し $\|y-\gamma\|\leq C$ となる $\gamma\in\Gamma$ を選び、射影すると $\|y-p(\gamma)\|\leq C$ です。よって $\Gamma'$ は $v^\perp$ を相対稠密に被覆します。

次元 $d-1$ の帰納法から、$\Gamma'$ は基底 $p(v_2),\ldots,p(v_d)$ を持つ全格子であり、各 $v_i\in\Gamma$ を持ち上げられます。一方、$\Gamma\cap\mathbb Rv$ は $v$ を含む離散部分群で、$v$ が $\Gamma$ の最短非零元なので $\Gamma\cap\mathbb Rv=\mathbb Zv$ です。

任意の $\gamma\in\Gamma$ の射影を $p(\gamma)=\sum_{i=2}^d m_i p(v_i)$ と一意に書けば、$\gamma-\sum_{i=2}^d m_iv_i$ は $\Gamma\cap\mathbb Rv=\mathbb Zv$ に属します。従って $\gamma=m_1v+\sum_{i=2}^d m_iv_i$ です。射影の基底性と $v\ne0$ により、この表示は一意で、$v,v_2,\ldots,v_d$ は $V$ の実基底でもあります。
<!-- proof-end -->

## 6. Dirichletの単数定理

これで単数の無限位数部分の階数を決められます。

<a id="thm-anf7-dirichlet-unit"></a>

<!-- formal-statement-start -->
> **定理（Dirichletの単数定理）**  
> 次数 $n$ の数体 $K$ に実埋め込みが $r_1$ 個、非実埋め込みの共役組が $r_2$ 組あるとし、$s=r_1+r_2$ とする。整数環の単数群 $U_K=\mathcal O_K^\times$ について、次を満たす単数 $\varepsilon_1,\ldots,\varepsilon_{s-1}$ が存在する。

$$
U_K\ \simeq\ \mu(K)\times\mathbb Z^{\,s-1},
\qquad
u=\zeta\varepsilon_1^{m_1}\cdots\varepsilon_{s-1}^{m_{s-1}}.
$$

> ここで $\mu(K)$ は有限な1の冪根群、$\zeta\in\mu(K)$、$m_i\in\mathbb Z$ であり、表示は一意である。また重み付き対数像 $L(U_K)$ は次元 $s-1$ の超平面 $H$ の全格子である。
<!-- formal-statement-end -->

### 証明の見取り図

[核と離散性](#lem-anf7-kernel-discrete)、[有界距離被覆](#lem-anf7-coarse-cover)、[全格子補題](#lem-anf7-full-lattice)を順に接続します。対数格子の整数基底を単数へ持ち上げることで、有限位数部分と自由部分を分解します。

<!-- proof-start -->
### 証明

[核と離散性の補題](#lem-anf7-kernel-discrete)で $\Gamma=L(U_K)\subseteq H$ は任意の有界集合との交わりが有限であり、$\ker(L|_{U_K})=\mu(K)$ は有限です。[有界距離被覆の補題](#lem-anf7-coarse-cover)は最大値ノルムについて全 $H$ を有界距離で被覆することを示しました。有限次元では $\|y\|_2\leq\sqrt{s}\|y\|_\infty$ なので、ユークリッド距離についても有界距離被覆が成り立ちます。

従って [全格子補題](#lem-anf7-full-lattice)を $V=H$, $d=s-1$ に適用でき、

$$
\Gamma=\mathbb Z\lambda_1\oplus\cdots
\oplus\mathbb Z\lambda_{s-1}
$$

となります。$\lambda_i\in L(U_K)$ の定義により $L(\varepsilon_i)=\lambda_i$ となる単数 $\varepsilon_i$ を選びます。

任意の $u\in U_K$ に対し、$L(u)=\sum_i m_i\lambda_i$ と一意に書けます。積の対数公式から

$$
L\left(u\varepsilon_1^{-m_1}\cdots
\varepsilon_{s-1}^{-m_{s-1}}\right)
=L(u)-\sum_i m_i\lambda_i=0.
$$

[核の判定](#lem-anf7-kernel-discrete)により括弧内は $\zeta\in\mu(K)$ です。よって $u=\zeta\prod_i\varepsilon_i^{m_i}$ となります。もし二つの表示があれば対数を取って $\lambda_i$ の整数一次独立性から指数 $m_i$ は一致し、続いて $\zeta$ も一致します。$s=1$ では格子は零群であり、$U_K=\mu(K)$ となります。
<!-- proof-end -->

自由部分の階数 $r_1+r_2-1$ は、数体の次数 $n=r_1+2r_2$ ではなく、実埋め込みと複素共役組の**合計個数から1を引いた数**です。例えば虚二次体では $r_1=0,r_2=1$ なので階数0、実二次体では $r_1=2,r_2=0$ なので階数1です。

## 7. 対数格子の基本領域の大きさ

単数定理は自由な単数の「本数」を教えます。次に、対数超平面で単数がどれだけ粗く並ぶかを行列式で測ります。基本単数を $\varepsilon_1,\ldots,\varepsilon_{s-1}$ と選び、列ベクトル $L(\varepsilon_j)$ を並べると、行の合計は零です。従って任意の1行を消すと正方行列になります。

<a id="def-anf7-regulator"></a>

<!-- formal-statement-start -->
> **定義（レギュレータ）**  
> Dirichletの単数定理の自由部分の基底 $\varepsilon_1,\ldots,\varepsilon_{s-1}$ を選び、各列を重み付き対数ベクトル $L(\varepsilon_j)$ とする $s\times(s-1)$ 行列を $M$ とする。任意の1行を削除した $(s-1)\times(s-1)$ 行列を $M^{(i)}$ とし、数体 $K$ の**レギュレータ**を

$$
R_K=\left|\det M^{(i)}\right|
$$

> と定義する。$s=1$ では空行列の行列式を1と定め、$R_K=1$ とする。非実埋め込みの行は $2\log|\tau_j(\varepsilon_k)|$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf7-regulator -->
**定義の確認**　$\mathbb Q(\sqrt2)$ の $\varepsilon=1+\sqrt2$ が基本単数であることを第8節で証明します。この体では

$$
M=\begin{pmatrix}\log(1+\sqrt2)\\-\log(1+\sqrt2)\end{pmatrix}.
$$

> 第一行を消しても第二行を消しても絶対行列式は $\log(1+\sqrt2)$ です。従って $R_{\mathbb Q(\sqrt2)}=\log(1+\sqrt2)>0$ です。$\mathbb Q(i)$ は $s=1$ なので $R_{\mathbb Q(i)}=1$ です。
<!-- definition-example-end -->

<a id="prop-anf7-regulator-invariance"></a>

<!-- formal-statement-start -->
> **命題（レギュレータの不変性）**  
> 数体 $K$ のレギュレータ $R_K$ は、自由部分の整数基底の選択、削除する行、非実埋め込みの共役代表の選択によらず、正の実数として定まる。$s=r_1+r_2$ とし $H$ に $\mathbb R^s$ からのユークリッド内積を入れると、$L(U_K)$ の $H$ 内の共体積は $\sqrt{s}\,R_K$ である。
<!-- formal-statement-end -->

### 証明の見取り図

基底の取り替えは整数係数の可逆行列（行列式 $\pm1$）です。行の合計が零なので、消した行を別の行に換えると行列式の符号しか変わりません。最後の共体積係数 $\sqrt{s}$ は、$H$ を最初の $s-1$ 座標で表す写像の Gram 行列から出ます。

<!-- proof-start -->
### 証明

$s=1$ は両辺1なので、$s\geq2$ とします。二組の基本単数の対数列は $\Gamma=L(U_K)$ の二組の $\mathbb Z$ 基底です。よって $P\in\operatorname{GL}_{s-1}(\mathbb Z)$ を用いて $M'=MP$ となり、削除後の行列式の絶対値は $|\det P|=1$ より変化しません。

各列は $H$ に入るので、$M$ の行ベクトルの和は零です。ある行を残りの行の和の負として書いて行展開すれば、削除する行を $i$ から $j$ に変えたときの行列式は符号だけが異なります。非実埋め込みを共役へ変更しても $|\tau_j(\varepsilon_k)|$ は変わりません。行の順序変更も符号だけを変えます。

行を第 $s$ 行で削除した場合、$H$ は最初の $s-1$ 座標 $y$ に対し $(y_1,\ldots,y_{s-1},-\sum y_i)$ と表されます。その列基底の Gram 行列は $G=I_{s-1}+\mathbf1\mathbf1^{\mathsf T}$ です。$\mathbf1$ 方向の固有値は $s$、直交方向の固有値は1なので $\det G=s$ です。よって $H$ 内の共体積は

$$
\sqrt{\det((M^{(s)})^{\mathsf T}G M^{(s)})}
=\sqrt{\det G}\,|\det M^{(s)}|
=\sqrt{s}\,R_K.
$$

全格子の基底行列の階数は $s-1$ なので $\det M^{(i)}\ne0$、従って $R_K>0$ です。
<!-- proof-end -->

注意：レギュレータそのものは、今定めた**重み付き対数座標から1行を削除した行列式**です。超平面のユークリッド共体積とは $\sqrt{s}$ の係数だけ異なります。複素埋め込みの2を落とした値と混同しないでください。

## 8. 手計算できる数体

### 有限単数群だけになる場合

$\mathbb Q$ では $A=\mathbb Z,\ U_K=\{\pm1\}$ です。$\mathbb Q(i)$ では $A=\mathbb Z[i]$ で、$a+bi$ が単数なら [ノルム判定](../ANF2/index.md#prop-anf2-unit-norm)より $a^2+b^2=1$ となるので、$U_K=\{\pm1,\pm i\}$ です。いずれも $s=1$、自由階数0、レギュレータ1です。一般の虚二次体でも [Dirichletの単数定理](#thm-anf7-dirichlet-unit) により単数は有限群です。

### 実二次体 $\mathbb Q(\sqrt2)$ の基本単数

$A=\mathbb Z[\sqrt2]$ で $\varepsilon=1+\sqrt2>1$ とおきます。$\varepsilon$ はノルム $-1$ の単数です。ここでは任意の単数が $\pm\varepsilon^m$（$m\in\mathbb Z$）と書けることを、単数定理の存在主張に頼らず確認します。

任意の単数 $u=a+b\sqrt2$ の第一埋め込みの値は非零です。$-1$ を掛けて正とした後、整数 $m$ を選び

$$
1\leq t=\sigma_1(u\varepsilon^{-m})<\varepsilon
$$

とできます。$v=u\varepsilon^{-m}=a'+b'\sqrt2$ と書くと、$v$ は単数なので $\sigma_1(v)\sigma_2(v)=\pm1$、従って $|\sigma_2(v)|=1/t\leq1$ です。二つの埋め込みから係数を戻すと

$$
b'=\frac{t-\sigma_2(v)}{2\sqrt2},\qquad
a'=\frac{t+\sigma_2(v)}2.
$$

$t\geq1$ かつ $|\sigma_2(v)|\leq1$ なので $b'\geq0$。また $t<1+\sqrt2$ より

$$
0\leq b'<\frac{2+\sqrt2}{2\sqrt2}<2,
$$

従って整数 $b'$ は0または1です。$b'=0$ のとき $v=a'\in\mathbb Z$ は正の単数だから $a'=1$ です。$b'=1$ のとき $1\leq a'+\sqrt2<1+\sqrt2$ より $a'\in\mathbb Z$ は0しかあり得ず、$v=\sqrt2$ となります。しかしそのノルムは $-2$ で単数ではありません。従って $v=1$、$u=\pm\varepsilon^m$ です。

この体では基本単数は $\varepsilon$ で、対数格子は $\mathbb Z(\log\varepsilon,-\log\varepsilon)$、レギュレータは $\log(1+\sqrt2)$ です。単数が無限にあっても、主イデアル $(\varepsilon^m)=A$ はすべて同じです。

## 9. 演習：対数、格子、レギュレータを手で確かめる

まず単元のノルム判定と対数座標の計算を練習し、次に単数定理の証明の各橋渡しを独立に再現します。最後に別の実二次体で基本単数とレギュレータを決定します。

### A1. $\mathbb Q$ の単数群と階数

$K=\mathbb Q$ について $U_K,\mu(K),r_1,r_2,H,L(U_K),R_K$ をすべて求めよ。

- Level: A
- ID: ANF7-A1

<!-- solution-start -->
**詳細解答**　$\mathcal O_K=\mathbb Z$ で、整数 $a$ が整数の逆元をもつのは $a=\pm1$ のときだけです。従って $U_K=\{\pm1\}=\mu(K)$。唯一の埋め込みは恒等写像なので $r_1=1,r_2=0,s=1$、$H=\{x\in\mathbb R:x=0\}=\{0\}$ です。$L(\pm1)=(\log1)=(0)$ なので対数像は零群、自由階数 $s-1=0$。レギュレータの[空行列の規約](#def-anf7-regulator)から $R_K=1$ です。
<!-- solution-end -->

### A2. $\mathbb Q(i)$ の有限単数群

$K=\mathbb Q(i)$ の単数をノルム方程式から列挙し、対数写像の核と自由階数を示せ。

- Level: A
- ID: ANF7-A2

<!-- solution-start -->
**詳細解答**　[二次体の整数環公式](../ANF1/index.md#thm-anf1-quadratic-integers)より $\mathcal O_K=\mathbb Z[i]$ です。整数 $a,b$ に対し、ノルムは $N(a+bi)=a^2+b^2$ です。

[単元のノルム判定](../ANF2/index.md#prop-anf2-unit-norm)によれば単数の条件は $a^2+b^2=1$ です。整数解は $(a,b)=(\pm1,0),(0,\pm1)$ なので、

$$
U_K=\{1,-1,i,-i\}=\mu(K).
$$

> 実埋め込みは0個、非実の共役組は1組です。従って $H=\{0\}$ で、すべての単数の対数は $(2\log1)=(0)$ です。ゆえに $\ker L=U_K$、自由階数0です。
<!-- solution-end -->

### A3. $\mathbb Q(\sqrt2)$ の対数ベクトル

$\varepsilon=1+\sqrt2$ の逆元とノルムを求め、$L(\varepsilon^m)$ と $L(-\varepsilon^m)$ を任意の整数 $m$ について計算せよ。

- Level: A
- ID: ANF7-A3

<!-- solution-start -->
**詳細解答**　$(1+\sqrt2)(\sqrt2-1)=1$ から $\varepsilon^{-1}=\sqrt2-1$、ノルムは $(1+\sqrt2)(1-\sqrt2)=-1$ です。二つの実埋め込みにおける絶対値は $\varepsilon,\varepsilon^{-1}$ なので[対数写像](#def-anf7-log-embedding)から

$$
L(\varepsilon)=(\log\varepsilon,-\log\varepsilon).
$$

> $L$ は乗法準同型で、$L(-1)=(0,0)$ です。従って任意の $m\in\mathbb Z$ で

$$
L(\varepsilon^m)=L(-\varepsilon^m)
=(m\log\varepsilon,-m\log\varepsilon).
$$

> 和が0になることは $|N(\varepsilon^m)|=1$ と一致します。
<!-- solution-end -->

### A4. $\mathbb Q(\sqrt3)$ で単数を直接見つける

$\mathcal O_{\mathbb Q(\sqrt3)}=\mathbb Z[\sqrt3]$ とする。$2+\sqrt3$ と $1+\sqrt3$ のノルムを計算し、どちらが単数か判定せよ。単数の方について逆元も明示せよ。

- Level: A
- ID: ANF7-A4

<!-- solution-start -->
**詳細解答**　実二次体の共役を用いると $N(a+b\sqrt3)=a^2-3b^2$ です。従って $N(2+\sqrt3)=4-3=1$、$N(1+\sqrt3)=1-3=-2$。[単元のノルム判定](../ANF2/index.md#prop-anf2-unit-norm)により $2+\sqrt3$ は単数で、$1+\sqrt3$ は単数ではありません。また

$$
(2+\sqrt3)(2-\sqrt3)=1
$$

> なので逆元 $2-\sqrt3$ も $\mathbb Z[\sqrt3]$ に属します。単に実数として逆数が存在するだけでは、整数環の単数とは判定できません。
<!-- solution-end -->

### A5. 複素埋め込みの重み2

$\theta$ を $f(T)=T^3-T-1$ の唯一の実根とし、$K=\mathbb Q(\theta)$ とする。$f$ の既約性、実根が一つであること、$\theta$ が単数であることを確かめよ。二つの非実共役根の一方を $\tau(\theta)$ とし、$L(\theta)$ を $\theta$ を用いて表せ。ただし $\theta>1$ とする。

- Level: A
- ID: ANF7-A5

<!-- solution-start -->
**詳細解答**　有理根定理により、モニック三次式 $f$ が有理根を持つなら候補は $\pm1$ のみですが、$f(1)=-1,\ f(-1)=-1$ です。よって既約で $[K:\mathbb Q]=3$。$f'(T)=3T^2-1$ で、極大点 $T=-1/\sqrt3$ でも $f(T)=2/(3\sqrt3)-1<0$。従ってグラフは負の極大値から下がり、その後一度だけ零を横切ります。$f(1)=-1,\ f(2)=5$ より唯一の実根 $\theta$ は $1<\theta<2$ です。

$\theta$ はモニック整数係数多項式の根なので代数的整数です。根の積は $-(-1)=1$ で、[埋め込みによる跡・ノルムの公式](../ANF2/index.md#thm-anf2-embedding-formulas)から $N_{K/\mathbb Q}(\theta)=1$。従って [単元のノルム判定](../ANF2/index.md#prop-anf2-unit-norm)で $\theta$ は単数です。実埋め込み1個、複素共役組1組なので $r_1=r_2=1$。根の積から $\theta|\tau(\theta)|^2=1$、すなわち $|\tau(\theta)|^2=\theta^{-1}$ です。よって

$$
L(\theta)=(\log\theta,\ 2\log|\tau(\theta)|)
=(\log\theta,-\log\theta).
$$

> 複素成分に係数2を付けて初めて二つの座標の和が零になります。ここから $\theta$ が**基本単数**とまでは結論しません。
<!-- solution-end -->

### B1. 対数像の離散性を独力で証明する

任意の数体 $K$ で、$L(u)$ が一定の有界集合に属する単数 $u$ は有限個であると示せ。なぜ $L(U_K)$ が離散群となるかも説明せよ。

- Level: B
- ID: ANF7-B1

<!-- solution-start -->
**詳細解答**　有界集合 $B\subset\mathbb R^s$ に $L(u)$ が入るなら、ある $M$ により各座標 $L_i(u)\leq M$ です。実埋め込みでは $|\sigma_i(u)|\leq e^M$、複素では $|\tau_j(u)|\leq e^{M/2}$。よって $j(u)$ は $\mathbb R^{r_1}\times\mathbb C^{r_2}$ の有界集合に入ります。[整数環の全階数格子](../ANF5/index.md#thm-anf5-ideal-covolume)は有界集合と有限個しか交わらず、$j$ は単射なので候補となる $u$ は有限個です。

従って $L(U_K)$ は任意の有界集合と有限個しか交わりません。特に原点を含む閉球内の $\Gamma=L(U_K)$ は有限集合なので、原点以外の最小距離を取れば原点の近傍から非零の $\Gamma$ を排除できます（球内に原点以外がなければその球自体を採用します）。$\Gamma$ は加法群なので任意の点も平行移動で孤立し、離散群となります。
<!-- solution-end -->

### B2. Kronecker の有限位数判定

$0\ne a\in\mathcal O_K$ がすべての埋め込み $\sigma:K\hookrightarrow\mathbb C$ について $|\sigma(a)|\leq1$ を満たすなら、$a$ は1の冪根であることを証明せよ。ヒント：$a^m$ の乗法写像の特性多項式を調べる。

- Level: B
- ID: ANF7-B2

<!-- solution-start -->
**詳細解答**　$[K:\mathbb Q]=n$ とします。各 $m\geq1$ で $a^m\in A$ なので、[整数基底](../ANF1/index.md#thm-anf1-integral-basis)に関する「$a^m$ を掛ける写像」は整数係数 $n\times n$ 行列を持ちます。従って特性多項式 $P_m(T)$ は次数 $n$ のモニック整数係数多項式です。

[埋め込みによる跡・ノルムの公式](../ANF2/index.md#thm-anf2-embedding-formulas)により、$P_m$ の根は重複込みで $\sigma(a^m)=\sigma(a)^m$ です。仮定からこれらの絶対値はすべて1以下です。$T^{n-j}$ の係数は根 $n$ 個の $j$ 個積を符号付きで足した値なので、絶対値は高々 $\binom nj$。従って $P_m$ の各係数は有限個の整数値しか取れず、多項式 $P_m$ 自体も有限種類です。

各多項式の複素根は高々 $n$ 個なので、$a^m$ はそれら有限個の根の集合に属します。従って異なる $p<q$ で $a^p=a^q$。$a\ne0$ で体 $K$ の元だから割り算でき、$a^{q-p}=1$ です。ゆえに $a$ は1の冪根です。**代数的整数であるという仮定**は、特性多項式の係数が整数になる箇所で使いました。
<!-- solution-end -->

### B3. 動かせる凸体を実二次体で具体化する

$K=\mathbb Q(\sqrt5)$、$x=(t,-t)\in H$、$t\in\mathbb R$ とする。$R=2$ に対して

$$
C_x=\{(y_1,y_2)\in\mathbb R^2:
|y_1|\leq2e^t,\ |y_2|\leq2e^{-t}\}
$$

> と置く。$(i)$ 体積と Minkowski の適用条件を確認せよ。$(ii)$ 得られる非零代数的整数 $a$ のノルム上界を求めよ。$(iii)$ 主イデアルの種類が有限個であることを用いて、$L(U_K)$ が $H$ を一定距離以内で被覆する理由を説明せよ。

- Level: B
- ID: ANF7-B3

<!-- solution-start -->
**詳細解答**　[二次体の判別式公式](../ANF2/index.md#thm-anf2-quadratic-discriminant)より、この体の判別式は $D_K=5$ です。

$(i)$ 二つの辺の長さはそれぞれ $4e^t$、$4e^{-t}$ で、その積である体積は $16$ です。[整数環の共体積](../ANF5/index.md#thm-anf5-ideal-covolume)は $\sqrt5$ なので、二次元凸体定理が要求する体積は $4\sqrt5$ より大きいことです。

$16>4\sqrt5$ が成立し、$C_x$ は原点対称な凸体です。ゆえにその中に $j(A)$ の非零格子点 $j(a)$ が存在します。

$(ii)$ 二つの実埋め込みの積は体ノルムだから

$$
1\leq |N_{K/\mathbb Q}(a)|
=|\sigma_1(a)\sigma_2(a)|
\leq(2e^t)(2e^{-t})=4.
$$

> $(iii)$ [ノルム有界な整イデアルの有限性](../ANF6/index.md#lem-anf6-bounded-ideal-norm)から $N((a))\leq4$ を満たす主整イデアルは有限個です。それらの生成元 $b_1,\ldots,b_h$ を固定すると、$(a)=(b_j)$ となる $j$ があり、$u=a/b_j$ は単数です。$d=L(a)-x$ の第一・第二成分はどちらも上から $\log2$、和は $\log|N(a)|\geq0$ なので、どちらも下から $-\log2$ です。従って

$$
\|L(u)-x\|_\infty
=\|d-L(b_j)\|_\infty
\leq\log2+\max_{1\leq j\leq h}\|L(b_j)\|_\infty.
$$

> 右辺は $t$ と無関係で、有界距離被覆を示しました。ここでは主イデアルの生成元をすべて列挙する必要はありません。
<!-- solution-end -->

### B4. 行の削除と対数格子の面積

$r_1+r_2=3$ で自由階数2の場合、単数の対数列が

$$
M=\begin{pmatrix}
a&b\\ c&d\\-a-c&-b-d
\end{pmatrix}
$$

> であるとする。任意の一行を消した行列式の絶対値を求め、$H=\{x_1+x_2+x_3=0\}$ 内の格子基本領域のユークリッド面積を計算せよ。さらに基本単数の整数基底変更で値が不変であることを示せ。

- Level: B
- ID: ANF7-B4

<!-- solution-start -->
**詳細解答**　第三行を削除すると行列式は $ad-bc$。第二行削除なら $a(-b-d)-b(-a-c)=bc-ad$、第一行削除なら $c(-b-d)-d(-a-c)=ad-bc$ です。したがって [レギュレータの定義](#def-anf7-regulator)による値は $R_K=|ad-bc|$ です。

$H$ の座標表示 $(y_1,y_2)\mapsto(y_1,y_2,-y_1-y_2)$ における基底列は $(1,0,-1)$ と $(0,1,-1)$ です。内積の Gram 行列は

$$
G=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad\det G=3.
$$

> 従って対数格子の基本領域の平行四辺形の面積は $\sqrt{\det(M_0^{\mathsf T}GM_0)}=\sqrt3\,|\det M_0|=\sqrt3\,|ad-bc|$（$M_0$ は上二行）です。基本単数の変更は指数の整数係数行列 $P\in\mathrm{GL}_2(\mathbb Z)$ を右から掛ける操作で、$|\det P|=1$。従って $\det(M_0P)$ の絶対値も変わりません。ユークリッド面積をレギュレータと取り違えると $\sqrt3$ 倍の誤差が生じます。
<!-- solution-end -->

### C1. $\mathbb Q(\sqrt3)$ の全単数とレギュレータ

$K=\mathbb Q(\sqrt3)$、$\mathcal O_K=\mathbb Z[\sqrt3]$ とする。以下を証明せよ。

1. $\varepsilon=2+\sqrt3$ は単数であり、第一実埋め込みで $1<u<2+\sqrt3$ を満たす単数 $u$ は存在しない。
2. $U_K=\{\pm(2+\sqrt3)^m:m\in\mathbb Z\}$ を示せ。
3. 対数格子の基底と $R_K$ を求めよ。$2$ と $1+\sqrt3$ が基本単数でない理由も述べよ。

- Level: C
- ID: ANF7-C1

<!-- solution-start -->
**詳細解答**　まず[二次体の整数環公式](../ANF1/index.md#thm-anf1-quadratic-integers)から $A=\mathbb Z[\sqrt3]$ です。ノルム公式は $N(a+b\sqrt3)=a^2-3b^2$。$N(2+\sqrt3)=4-3=1$ なので [単元のノルム判定](../ANF2/index.md#prop-anf2-unit-norm)から $\varepsilon$ は単数で、$\varepsilon^{-1}=2-\sqrt3\in A$ です。

第一実埋め込みで $1\leq t=\sigma_1(v)<\varepsilon$ を満たす単数 $v=a+b\sqrt3$ を考えます。第二実埋め込みの値を $t'=\sigma_2(v)$ とすると $tt'=\pm1$ なので $|t'|=1/t\leq1$。二つの埋め込み値から

$$
a=\frac{t+t'}2,\qquad b=\frac{t-t'}{2\sqrt3}.
$$

> $1\leq t<2+\sqrt3$ と $|t'|\leq1$ より

$$
0\leq b<\frac{3+\sqrt3}{2\sqrt3}<2.
$$

> 整数 $b$ は0か1です。$b=0$ の場合は整数 $a$ が正の単数だから $a=1$。$b=1$ の場合、$1\leq a+\sqrt3<2+\sqrt3$ により整数 $a$ は0か1です。しかし $N(\sqrt3)=-3$、$N(1+\sqrt3)=-2$ なのでどちらも単数ではありません。従って $v=1$ だけであり、$1<u<\varepsilon$ の単数は存在しません。

任意の $u\in U_K$ について、第一実埋め込みの符号を $-1$ の乗法で正に変えられます。$\varepsilon>1$ なのである $m\in\mathbb Z$ を選んで $1\leq\sigma_1(\pm u\varepsilon^{-m})<\varepsilon$ とできます。括弧内は単数ですから前段により1となり、$u=\pm\varepsilon^m$ です。$\varepsilon^m$ はいずれも単数なので逆向きの包含も成立します。これで第1・2問が示されました。

最後に $r_1=2,r_2=0$、$N(\varepsilon)=1$ から第二埋め込み値は $\varepsilon^{-1}$ です。[対数写像](#def-anf7-log-embedding)より

$$
L(\varepsilon)=(\log(2+\sqrt3),-\log(2+\sqrt3)).
$$

> したがって $L(U_K)=\mathbb Z L(\varepsilon)$ であり、[レギュレータの定義](#def-anf7-regulator)から

$$
R_K=\log(2+\sqrt3).
$$

> $2$ はノルム $4$、$1+\sqrt3$ はノルム $-2$ なので単数ですらありません。大きさが1を超える代数的整数なら何でも基本単数になる、という推論は成り立ちません。
<!-- solution-end -->

## 10. 次講へ：単数格子がゼータ関数に現れる

[イデアル類群の有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound)はイデアル類の個数 $h_K$ を有限とし、本講の [Dirichletの単数定理](#thm-anf7-dirichlet-unit)は単数の自由階数を決定しました。さらに [レギュレータ](#def-anf7-regulator)はその格子の大きさを表します。次の ANF8 では、これらが Dedekind ゼータ関数の $s=1$ における主要項の係数に組み合わさる仕組みを扱います。

参考となる講義ノート：J. S. Milne, *Algebraic Number Theory*, Chapter 5；MIT 18.785, *Number Theory I*, Lecture 15（Dirichlet's Unit Theorem）。本講の証明と演習は、既習の凸体・イデアル有限性から紙上で再構成できるように記したものです。
