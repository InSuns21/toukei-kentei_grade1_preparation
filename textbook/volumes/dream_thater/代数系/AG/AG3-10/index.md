# AG3-10 射影空間のO(d)のコホモロジー

[射影スキームの構成](../AG3-09/index.md#thm-ag3-09-proj-gluing)により、射影空間をアフィン開集合から作れるようになりました。[射影直線のコホモロジー](../AG3-08/index.md#thm-ag3-08-p1-cohomology)は二チャートで計算しましたが、$\mathbb P^2$ では三重交叉が生じます。一次群しか見なければ、たとえば $\mathcal O_{\mathbb P^2}(-3)$ の二次群に残る障害を見落とします。

この章では、局所切断を Laurent 単項式で表し、**負の指数がどこに現れるか**だけから全次数のコホモロジーを決定します。次に最高次群の係数対と超平面の長完全列を手計算し、曲線の種数へつなぎます。

以下、$k$ は任意の体、$n\ge1$、$S=k[X_0,\ldots,X_n]$ は標準次数付き環、$X=\mathbb P_k^n=\operatorname{Proj}S$ です。$d\in\mathbb Z$ に対し $\mathcal O_X(d)=\widetilde{S(d)}$、$S(d)_r=S_{r+d}$ とします（[ねじりの局所表示](../AG3-09/index.md#prop-ag3-09-twists-polynomial)）。$H^q$ は[層コホモロジー](../AG3-08/index.md#def-ag3-08-sheaf-cohomology)です。

## 1. アフィン開被覆からČech複体を作る

$U_i=D_+(X_i)$ と置くと $X=\bigcup_{i=0}^nU_i$ です。空でない集合 $I\subseteq\{0,\ldots,n\}$ に対し $U_I=\bigcap_{i\in I}U_i=D_+(\prod_{i\in I}X_i)$ と書きます。[標準開のアフィン性](../AG3-09/index.md#thm-ag3-09-standard-open-affine)により、これらはすべてアフィンです。$U_0\cap U_1$ なら $X_0,X_1$ を反転できますが、$X_2$ を反転できるとは限りません。この区別が後の指数条件です。

<a id="def-ag3-10-graded-cech"></a>

<!-- formal-statement-start -->
> **定義（標準被覆の次数付きČech複体）**  
> $k$ を体、$n\ge1$、$d\in\mathbb Z$ とし、$X=\mathbb P_k^n$ とする。$0\le p\le n$ で、$I=\{i_0<\cdots<i_p\}$ に沿う切断をまとめて

$$
C_d^p=\bigoplus_{0\le i_0<\cdots<i_p\le n}
(S_{X_{i_0}\cdots X_{i_p}})_d
$$

> と置く。右辺は局所化された次数付き環の次数 $d$ 成分である。$J=\{j_0<\cdots<j_{p+1}\}$ における微分を

$$
(\delta^pc)_J=\sum_{\nu=0}^{p+1}(-1)^\nu
c_{J\setminus\{j_\nu\}}\big|_{U_J}
$$

> とする。これは $\mathcal O_X(d)$ の標準被覆Čech複体である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-10-graded-cech -->
**定義の確認**：$n=2,d=-3$ で $U_{012}$ の切断 $1/(X_0X_1X_2)$ は分母三変数を反転しており、次数は $-1-1-1=-3$ だから $(S_{X_0X_1X_2})_{-3}$ に入ります。$U_{01}$ では $X_2$ を反転できず、同じ分数は $(S_{X_0X_1})_{-3}$ に入りません。さらに零次コチェイン $c=(c_0,c_1,c_2)$ について $(\delta^0c)_{01}=c_1-c_0$、$(\delta^0c)_{02}=c_2-c_0$、$(\delta^0c)_{12}=c_2-c_1$ だから $(\delta^1\delta^0c)_{012}=(c_2-c_1)-(c_2-c_0)+(c_1-c_0)=0$ です。
<!-- definition-example-end -->

$(S_{X_I})_d$ の元は、次数 $d$ の斉次分数で、分母に使える変数が $I$ に限られるものです。$S(d)$ の次数零局所化がこれに等しいことは、元の次数を $d$ だけずらす定義を代入すれば分かります。

<a id="prop-ag3-10-cech-comparison"></a>

<!-- formal-statement-start -->
> **命題（標準被覆による層コホモロジーの計算）**  
> 任意の体 $k$、$n\ge1$、$d\in\mathbb Z$、$q\ge0$ に対し、自然な同型がある。

$$
H^q(\mathbb P_k^n,\mathcal O(d))\simeq H^q(C_d^\bullet).
$$

> とくに $q>n$ では左辺は零である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $U_i$ がアフィンであるだけでなく、全ての有限交叉 $U_I$ がアフィンです。この仮定を確認してからČech比較を適用します。

<!-- proof-start -->
### 証明

$U_I=D_+(\prod_{i\in I}X_i)$ は[標準開の定理](../AG3-09/index.md#thm-ag3-09-standard-open-affine)によるアフィンスキームです。$\mathcal O(d)$ は可逆層なので準連接であり、[アフィン消滅](../AG3-08/index.md#thm-ag3-08-affine-vanishing)から次を得ます。

$$
H^r(U_I,\mathcal O(d))=0\qquad(r>0).
$$

よって[アフィン交叉を持つ被覆のČech比較](../AG3-08/index.md#thm-ag3-08-cech-comparison)の全仮定が成立します。各交叉での切断は $(S_{X_I})_d$ だから、比較先は $C_d^\bullet$ です。

また $p>n$ には $p+1$ 個の異なる添字を選べません。そのため $C_d^p=0$、従って高次群も零です。
<!-- proof-end -->

## 2. 単項式の負指数集合が微分を分離する

全変数を反転した環 $L=k[X_0^{\pm1},\ldots,X_n^{\pm1}]$ に各局所化を埋め込みます。指数ベクトル $a=(a_0,\ldots,a_n)\in\mathbb Z^{n+1}$ の Laurent 単項式を $X^a=\prod_iX_i^{a_i}$ とします。その次数は $\sum_i a_i$ です。

<a id="def-ag3-10-negative-support"></a>

<!-- formal-statement-start -->
> **定義（負指数集合）**  
> 整数ベクトル $a=(a_0,\ldots,a_n)$ の負指数集合を

$$
N(a)=\{i\in\{0,\ldots,n\}:a_i<0\}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-10-negative-support -->
**定義の確認**：$n=2$、$a=(-1,2,-2)$ なら $a_0,a_2<0$ で $a_1\ge0$ ですから $N(a)=\{0,2\}$、総次数は $-1$ です。したがって $X^a=X_1^2/(X_0X_2^2)$ は $U_{02}$ で切断となり、$U_{01}$ には現れません。一方 $a=(0,1,2)$ なら $N(a)=\varnothing$、$a=(-1,-1,-1)$ なら $N(a)=\{0,1,2\}$ となり、三分類の両極端も直接確認できます。
<!-- definition-example-end -->

たとえば $X_0^{-1}X_1^2X_2^{-2}$ の負指数集合は $\{0,2\}$ です。この単項式は $U_0\cap U_2$ には存在しますが、$U_0\cap U_1$ では $X_2$ を反転できないため存在しません。

<a id="lem-ag3-10-monomial-splitting"></a>

<!-- formal-statement-start -->
> **補題（単項式ごとの複体への分解）**  
> $k$ を体、$n\ge1$、$d\in\mathbb Z$ とする。$C_d^\bullet$ は $\sum_i a_i=d$ を満たす指数ベクトル $a$ ごとの複体の直和に分解する。$C_d^p$ の $I$ 成分に $X^a$ が現れる必要十分条件は

$$
|I|=p+1,\qquad N(a)\subseteq I
$$

> である。微分は指数 $a$ を変えず、その成分の係数に交代符号を付ける。
<!-- formal-statement-end -->

### 証明の見取り図

分母に置けるのは反転した変数だけです。したがって $I$ に属さない変数の指数は非負です。制限写像は Laurent 単項式自体を変えません。

<!-- proof-start -->
### 証明

$(S_{X_I})_d$ の各項は、$j\notin I$ で $a_j\ge0$ を満たす次数 $d$ の Laurent 単項式の有限線形結合です。逆にこの条件の $X^a$ は、$i\in I$ の負指数を分母へ移すことで多項式分子と許された分母を持つ斉次分数になります。

よって条件は $N(a)\subseteq I$ と同値です。Laurent 単項式は $k$ 上線形独立だから、局所化は単項式の直和です。

各 $C^p$ では $I$ が有限個なので、有限直和と単項式ごとの直和を交換できます。制限写像は同じ $X^a$ を同じ単項式へ写し、微分は指数を混ぜません。
<!-- proof-end -->

<a id="lem-ag3-10-support-acyclicity"></a>

<!-- formal-statement-start -->
> **補題（負指数集合による三分類）**  
> $n\ge1$ とする。前補題の指数 $a$ に対応する部分複体 $C^\bullet(a)$ について、次が成り立つ。
>
> (i) $N(a)=\varnothing$ なら $H^0(C^\bullet(a))\simeq k$、$H^q=0$（$q>0$）。
>
> (ii) $0<|N(a)|<n+1$ なら全ての $H^q$ は零である。
>
> (iii) $N(a)=\{0,\ldots,n\}$ なら $H^n(C^\bullet(a))\simeq k$、他の群は零である。
<!-- formal-statement-end -->

### 証明の見取り図

負の指数がないと全チャートで同じ係数が貼り合わさります。負の指数が一部にだけあれば、その外の添字を加えたり削ったりしてコサイクルを打ち消せます。全指数が負なら、単項式は最後の $(n+1)$ 重交叉だけに残ります。

<!-- proof-start -->
### 証明

$N=N(a)$ と固定します。$C^p(a)$ は $N\subseteq I$、$|I|=p+1$ を満たす各 $I$ に対応する $k$ の直和で、微分は[交代和](#def-ag3-10-graded-cech)です。

(i) $N=\varnothing$ なら $C^0(a)=k^{n+1}$ で、零次コサイクル $(c_i)$ の条件は全ての $i<j$ について $c_j-c_i=0$ です。従って核は対角線の $k$ です。正次数では頂点 $0$ を固定し、$0\notin I$ で $c_{\{0\}\cup I}$ を取って $0\in I$ で零とする縮約 $h:C^p\to C^{p-1}$ を使います。交代和を展開すると $0$ を消す項だけが $c_I$ として残り、ほかは二通りの削除順が逆符号で相殺されるので $\delta h+h\delta=\mathrm{id}$（$p\ge1$）です。

(ii) $N$ は非空で真部分集合だから $j\notin N$ を選べます。$p\ge1$、$|I|=p$ の $N\subseteq I$ に対し、$j\notin I$ なら

$$
(hc)_I=(-1)^{|\{i\in I:i<j\}|}\,c_{I\cup\{j\}}
$$

とし、$j\in I$ なら零とします。$j$ の追加・削除は $N\subseteq I$ を壊しません。各 $(p+1)$ 元集合の交代和で、$j$ を消す一項だけが $c_I$ を生み、ほかは対になって相殺するので $\delta h+h\delta=\mathrm{id}$ です。零次についても $N\ne\varnothing$ だから、存在する単元集合は $N=\{i\}$ のときの $\{i\}$ だけであり $i\ne j$ です。$h\delta(c)_{\{i\}}$ は $(\delta c)_{\{i,j\}}$ の符号付き成分なので $c_{\{i\}}$ に一致し、零次にも非零なコホモロジーは残りません。

(iii) $N$ が全添字集合なら $N\subseteq I$ を満たす $I$ は全体集合だけで、その大きさは $n+1$ です。従って $C^n(a)=k$、他の項は零です。
<!-- proof-end -->

ここで (ii) で $N\ne\varnothing$ を使った点に注意します。$N=\varnothing$ に同じ零次の議論を当てはめると、大域定数切断まで誤って消すことになります。

## 3. 全次数の計算

<a id="thm-ag3-10-projective-twist-cohomology"></a>

<!-- formal-statement-start -->
> **定理（射影空間のねじり層のコホモロジー）**  
> $k$ を任意の体、$n\ge1$、$d\in\mathbb Z$ とする。$S=k[X_0,\ldots,X_n]$ とおくと

$$
H^q(\mathbb P_k^n,\mathcal O(d))\simeq
\begin{cases}
S_d,&q=0,\ d\ge0,\\
\displaystyle\bigoplus_{\substack{a_i\le-1\ (\forall i)\\\sum_i a_i=d}}k[X^a],
&q=n,\ d\le-n-1,\\
0,&\text{その他}
\end{cases}
$$

> である。特に $0<q<n$ は全て零である。次元は

$$
h^0(\mathbb P_k^n,\mathcal O(d))=
\begin{cases}\binom{n+d}{n},&d\ge0,\\0,&d<0,\end{cases}
\quad
h^n(\mathbb P_k^n,\mathcal O(d))=
\begin{cases}\binom{-d-1}{n},&d\le-n-1,\\0,&d>-n-1.\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

単項式の負指数が空なら零次に、多項式の全ての変数で負なら最高次に残ります。途中の負指数集合は縮約できます。残った単項式の個数だけ数えます。

<!-- proof-start -->
### 証明

[Čech比較](#prop-ag3-10-cech-comparison)と[単項式分解](#lem-ag3-10-monomial-splitting)により、コホモロジーは各 $a$ の複体のコホモロジーの直和です。[三分類補題](#lem-ag3-10-support-acyclicity)から、$N(a)=\varnothing$ の零次と $N(a)$ が全体の $n$ 次だけが残ります。

前者は $a_i\ge0$、$\sum_i a_i=d$ の単項式で、$d\ge0$ のとき $S_d$ の基底です。非負整数解の個数は星取り法で $\binom{n+d}{n}$ と求まります。

後者では $a_i\le-1$ なので $b_i=-a_i-1\ge0$ と置きます。すると

$$
\sum_{i=0}^n b_i=-d-(n+1).
$$

右辺が負なら解はなく、非負ならその個数は

$$
\binom{(-d-n-1)+n}{n}=\binom{-d-1}{n}.
$$

したがって表示の二群以外は零であり、両群は有限次元です。
<!-- proof-end -->

**手計算の例。** $\mathbb P^2$ の $\mathcal O(-3)$ では三つの指数を全て $\le-1$ にして和を $-3$ にするには $(-1,-1,-1)$ しかなく、

$$
H^2(\mathbb P^2,\mathcal O(-3))=
k\left[\frac1{X_0X_1X_2}\right].
$$

$\mathcal O(-2)$ では三つの負整数の和が $-2$ にはならず、全群が零です。$n=1$ と置くと、既習の[射影直線の計算](../AG3-08/index.md#thm-ag3-08-p1-cohomology)の $h^0=\max(d+1,0)$、$h^1=\max(-d-1,0)$ も再現できます。

## 4. 最高次の係数対を構成する

最高次の Laurent 単項式と斉次多項式を掛け、$X_0^{-1}\cdots X_n^{-1}$ の係数を取り出します。この有限次元線形代数だけで、後の双対性の原型を見ることができます。

<a id="prop-ag3-10-top-pairing"></a>

<!-- formal-statement-start -->
> **命題（最高次コホモロジーの完全係数対）**  
> $k$ を体、$n\ge1$、$d\le-n-1$、$e=-d-n-1$ とする。$F$ を次数 $e$ の斉次多項式、$[G]$ を $H^n(\mathbb P_k^n,\mathcal O(d))$ の単項式表示として、$FG$ の $X_0^{-1}\cdots X_n^{-1}$ の係数を取ると、完全双線形対

$$
H^0(\mathbb P_k^n,\mathcal O(e))\times
H^n(\mathbb P_k^n,\mathcal O(d))\longrightarrow k
$$

> が得られる。従って最高次群は零次群の線形双対に同型である。
<!-- formal-statement-end -->

### 証明の見取り図

指数ベクトルで書くと、積の全指数が $-1$ になるのは対応する基底同士だけです。

<!-- proof-start -->
### 証明

[主定理](#thm-ag3-10-projective-twist-cohomology)で前者の基底は $X^c$（$\sum c_i=e$, $c_i\ge0$）、後者の基底は $X^{-b-\boldsymbol1}$（$\sum b_i=e$, $b_i\ge0$）です。積は

$$
X^cX^{-b-\boldsymbol1}
=\prod_{i=0}^nX_i^{c_i-b_i-1}
$$

であり、全指数が $-1$ となるのは各 $c_i=b_i$ のときに限られます。よって係数対の基底行列は単位行列です。有限次元性も主定理で示したので完全です。
<!-- proof-end -->

これは一般の Serre 双対性の証明を仮定したものではありません。$\mathbb P^2$、$d=-4$ の場合は演習B4で行列を実際に求めます。

## 5. 超平面への制限と長完全列

$X_n=0$ という超平面 $H\simeq\mathbb P_k^{n-1}$ に制限すると、$\mathcal O(d)$ の断面から $X_n$ の倍数を取り除くことになります。

<a id="prop-ag3-10-hyperplane-sequence"></a>

<!-- formal-statement-start -->
> **命題（超平面制限の短完全列）**  
> $k$ を体、$n\ge2$、$d\in\mathbb Z$ とする。$X=\mathbb P_k^n$、$H=V_+(X_n)$、$i:H\hookrightarrow X$ とおくと、準連接層の短完全列

$$
0\longrightarrow\mathcal O_X(d-1)
\xrightarrow{\cdot X_n}\mathcal O_X(d)
\longrightarrow i_*\mathcal O_H(d)\longrightarrow0
$$

> が成立し、層コホモロジーの長完全列を誘導する。
<!-- formal-statement-end -->

### 証明の見取り図

環の次数付き完全列を局所化し、次数零部分を取ります。単射性には $S$ が整域であることを使います。

<!-- proof-start -->
### 証明

多項式環 $S$ は整域なので $X_n$ は零因子ではありません。従って次数付き加群の列

$$
0\to S(d-1)\xrightarrow{\cdot X_n}S(d)
\to(S/(X_n))(d)\to0
$$

は完全です。局所化は完全性を保ち、次数付き加群の次数零成分を取る操作は直和の一成分を取り出す操作なので完全性を保ちます。[次数付き加群の層化](../AG3-09/index.md#def-ag3-09-graded-module-sheaf)により前二項は $\mathcal O_X(d-1)$ と $\mathcal O_X(d)$ です。[斉次商の閉部分スキーム](../AG3-09/index.md#thm-ag3-09-homogeneous-quotient)を $S/(X_n)$ に適用すると、最後の項は $i_*\mathcal O_H(d)$ に一致します。各標準開の切断列が完全なので[茎の完全性判定](../AG3-07/index.md#thm-ag3-07-exact-stalks)により層でも完全です。

[層コホモロジーの長完全列](../AG3-08/index.md#thm-ag3-08-long-exact)を適用します。最後の層のコホモロジーを $H$ 上のものと同一視できることは、$X$ の標準被覆を $H$ に制限すると $H\cap U_n=\varnothing$、残る有限交叉は $H$ の標準アフィン交叉となり、$i_*\mathcal O_H(d)$ のČech複体が $H$ 自身のものと一致することから分かります。両者で[Čech比較](../AG3-08/index.md#thm-ag3-08-cech-comparison)を適用できます。
<!-- proof-end -->

具体例として $X=\mathbb P_k^2$、$H=\{X_2=0\}$ なら、$\mathcal O_X(-3)\xrightarrow{X_2}\mathcal O_X(-2)$ の余核は $\mathcal O_H(-2)$ です。$H^1(H,\mathcal O_H(-2))\simeq k$ から $H^2(X,\mathcal O_X(-3))\simeq k$ への連結写像は同型となります。

<a id="cor-ag3-10-euler-characteristic"></a>

<!-- formal-statement-start -->
> **系（射影空間のO(d)のEuler標数）**  
> $k$ を体、$n\ge1$、$d\in\mathbb Z$ に対し

$$
\chi(\mathbb P_k^n,\mathcal O(d))
:=\sum_{q=0}^n(-1)^q h^q(\mathbb P_k^n,\mathcal O(d))
=\frac{(d+1)(d+2)\cdots(d+n)}{n!}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

非負次数、途中の負次数、十分小さい負次数の三領域に分けると、同じ多項式が得られます。

<!-- proof-start -->
### 証明

[主定理](#thm-ag3-10-projective-twist-cohomology)より $d\ge0$ の場合は $\chi=\binom{n+d}{n}=\prod_{j=1}^n(d+j)/n!$ です。$-n\le d\le-1$ では全ての群が零であり、右辺にも $d+j=0$ の因子があります。$d\le-n-1$ では

$$
\chi=(-1)^n\binom{-d-1}{n}
=\frac{(-1)^n(-d-1)\cdots(-d-n)}{n!}
=\frac{(d+1)\cdots(d+n)}{n!}.
$$

従って任意の整数 $d$ で成り立ちます。
<!-- proof-end -->

## 6. 演習と詳細解答

### A1. 単項式が現れる交叉

$\mathbb P_k^2$ で $a=(-2,1,0)$ とし、$X^a$ が $C_d^0,C_d^1,C_d^2$ のどの成分に現れるか列挙せよ。

- Level: A
- ID: AG3-10-A1

<!-- solution-start -->
### 詳細解答

総次数は $d=-1$、$N(a)=\{0\}$ です。[分解補題](#lem-ag3-10-monomial-splitting)から、$C^0$ の添字集合は $\{0\}$、$C^1$ は $\{0,1\},\{0,2\}$、$C^2$ は $\{0,1,2\}$ です。$U_1$ だけでは $X_0$ の逆数を取れず、この単項式を切断として書けません。
<!-- solution-end -->

### A2. 正次数の切断

$\mathbb P_k^2$ の $\mathcal O(2)$ の大域切断の次元と単項式基底を求めよ。

- Level: A
- ID: AG3-10-A2

<!-- solution-start -->
### 詳細解答

[主定理](#thm-ag3-10-projective-twist-cohomology)で $n=2,d=2,q=0$ とします。$a_0+a_1+a_2=2$ の非負整数解は $(2,0,0)$ の置換三つと $(1,1,0)$ の置換三つです。従って基底は $X_0^2,X_1^2,X_2^2,X_0X_1,X_0X_2,X_1X_2$、次元は $\binom42=6$ です。
<!-- solution-end -->

### A3. 最小の非零最高次群

$\mathbb P_k^2$ の $\mathcal O(-3)$ の $H^0,H^1,H^2$ を求め、最後の群の代表元を書け。

- Level: A
- ID: AG3-10-A3

<!-- solution-start -->
### 詳細解答

$d=-3<0$ より $H^0=0$、$0<1<2$ より $H^1=0$ です。最高次では $a_0,a_1,a_2\le-1$ かつ和 $-3$ の解は $(-1,-1,-1)$ だけです。[主定理](#thm-ag3-10-projective-twist-cohomology)により $H^2=k[1/(X_0X_1X_2)]\simeq k$ となります。
<!-- solution-end -->

### A4. 消える負次数

$\mathbb P_k^3$ の $\mathcal O(-3)$ の全ての $H^q$ を求めよ。

- Level: A
- ID: AG3-10-A4

<!-- solution-start -->
### 詳細解答

$n=3,d=-3$ です。[主定理](#thm-ag3-10-projective-twist-cohomology)により $H^0=0$、$H^1=H^2=0$ です。$H^3$ に残る単項式には四つの指数が全て $\le-1$ という条件があるので和は $\le-4$ となり、$-3$ にできません。従って $H^3=0$ であり、$q>3$ もČech複体の項がないため零です。
<!-- solution-end -->

### B1. 真部分集合の微分を計算

$\mathbb P_k^2$ の $a=(-1,1,-1)$ の単項式部分複体の各項と微分を書き、全群の消滅を示せ。

- Level: B
- ID: AG3-10-B1

<!-- solution-start -->
### 詳細解答

$N(a)=\{0,2\}$、$d=-1$ です。$C^0(a)=0$、$C^1(a)=k$（添字 $02$）、$C^2(a)=k$（添字 $012$）です。[交代和](#def-ag3-10-graded-cech)で

$$
(\delta^1c)_{012}=c_{12}-c_{02}+c_{01}=-c_{02}.
$$

よって $k\xrightarrow{-1}k$ は体の標数によらず同型です。$H^0,H^1,H^2$ は全て零になります。
<!-- solution-end -->

### B2. 最高次の基底

$\mathbb P_k^2$ の $\mathcal O(-4)$ の $H^2$ の基底を全て求めよ。

- Level: B
- ID: AG3-10-B2

<!-- solution-start -->
### 詳細解答

$a_i=-1-b_i$ と置けば $b_i\ge0$ で $b_0+b_1+b_2=1$ です。解は $(1,0,0),(0,1,0),(0,0,1)$ なので

$$
H^2(\mathbb P_k^2,\mathcal O(-4))
=k\left[\frac1{X_0^2X_1X_2}\right]
\oplus k\left[\frac1{X_0X_1^2X_2}\right]
\oplus k\left[\frac1{X_0X_1X_2^2}\right].
$$

[三分類補題](#lem-ag3-10-support-acyclicity)により全て非零類で線形独立です。次元式 $\binom{3}{2}=3$ とも一致します。
<!-- solution-end -->

### B3. 超平面の長完全列

$X=\mathbb P_k^2$、$H=\{X_2=0\}\simeq\mathbb P_k^1$ とする。$0\to\mathcal O_X(-3)\xrightarrow{X_2}\mathcal O_X(-2)\to i_*\mathcal O_H(-2)\to0$ から得る $H^1(H,\mathcal O_H(-2))\to H^2(X,\mathcal O_X(-3))$ が同型であることを示せ。

- Level: B
- ID: AG3-10-B3

<!-- solution-start -->
### 詳細解答

[超平面制限](#prop-ag3-10-hyperplane-sequence)の $n=2,d=-2$ の場合です。[長完全列](../AG3-08/index.md#thm-ag3-08-long-exact)の該当部分の両端は、[主定理](#thm-ag3-10-projective-twist-cohomology)によって $H^1(X,\mathcal O_X(-2))=0$、$H^2(X,\mathcal O_X(-2))=0$ です。従って

$$
0\longrightarrow H^1(H,\mathcal O_H(-2))
\xrightarrow{\partial}H^2(X,\mathcal O_X(-3))
\longrightarrow0
$$

が完全で、$\partial$ は同型です。左は $n=1,d=-2$、右は $n=2,d=-3$ の主定理によってともに一次元です。
<!-- solution-end -->

### B4. 完全係数対の行列

$\mathbb P_k^2$ で $d=-4$ とする。$H^0(\mathcal O(1))$ の基底 $X_0,X_1,X_2$ とB2の基底との係数対の行列を求めよ。

- Level: B
- ID: AG3-10-B4

<!-- solution-start -->
### 詳細解答

[完全係数対](#prop-ag3-10-top-pairing)で $e=-(-4)-2-1=1$ です。$X_0$ と $1/(X_0^2X_1X_2)$ の積は $1/(X_0X_1X_2)$ だから係数 $1$ です。$X_0$ を他の二基底に掛けると $X_0$ の指数が $0$ なので係数 $0$ です。$X_1$、$X_2$ でも指数を比較すると対角成分だけが $1$ になり、行列は

$$
\begin{pmatrix}1&0&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

よって互いに双対な基底です。
<!-- solution-end -->

### C1. 四チャートで最高次を全計算

$\mathbb P_k^3$ の $\mathcal O(-5)$ について、Čech単項式の分類から全ての $H^q$ と最高次の基底を求めよ。中間次数が消える理由も示せ。

- Level: C
- ID: AG3-10-C1

<!-- solution-start -->
### 詳細解答

標準被覆の全交叉は[アフィン](../AG3-09/index.md#thm-ag3-09-standard-open-affine)なので[Čech比較](#prop-ag3-10-cech-comparison)が適用できます。次数 $-5$ の単項式 $X^a$ は $N(a)\subseteq I$ の成分に現れ、[三分類補題](#lem-ag3-10-support-acyclicity)により非空の真部分集合 $N(a)$ の成分は縮約されて消滅します。$N(a)=\varnothing$ は指数の和が負なので不可能です。従って $H^0=H^1=H^2=0$ です。

残りは四指数全てが負のときです。$a_i=-1-b_i$、$b_i\ge0$ とすると $\sum_{i=0}^3b_i=1$ で、$(1,0,0,0)$ の四置換だけです。従って $H^3\simeq k^4$ で基底は

$$
\left[\frac1{X_0^2X_1X_2X_3}\right],\quad
\left[\frac1{X_0X_1^2X_2X_3}\right],\quad
\left[\frac1{X_0X_1X_2^2X_3}\right],\quad
\left[\frac1{X_0X_1X_2X_3^2}\right].
$$

次元は $\binom{-(-5)-1}{3}=\binom43=4$ と一致し、$q>3$ は複体の項がないので零です。
<!-- solution-end -->

### C2. 連結準同型を手で構成

$X=\mathbb P_k^2$、$H=\{X_2=0\}$ とする。B3の連結準同型が $[1/(X_0X_1)]$ を $[1/(X_0X_1X_2)]$ へ送ることをČech複体で確かめよ。

- Level: C
- ID: AG3-10-C2

<!-- solution-start -->
### 詳細解答

$H$ の二チャート被覆の交叉 $H\cap U_0\cap U_1$ では、$c_{01}=1/(X_0X_1)$ は次数 $-2$ の切断です。[射影直線の計算](../AG3-08/index.md#thm-ag3-08-p1-cohomology)より一次コホモロジーの生成元を表します。

[超平面完全列](#prop-ag3-10-hyperplane-sequence)で $c$ を $X$ 上の $\mathcal O_X(-2)$ のČech 1-コチェインへ持ち上げます。まず $\widetilde c_{01}=1/(X_0X_1)$ とし、残りの成分は次のように置きます。

$$
\widetilde c_{02}=\widetilde c_{12}=0.
$$

$H\cap U_2=\varnothing$ なので、後二成分も $H$ へ制限すると零となり、元のコサイクルと一致します。

交代微分は

$$
(\delta\widetilde c)_{012}
=\widetilde c_{12}-\widetilde c_{02}+\widetilde c_{01}
=\frac1{X_0X_1}
=X_2\,\frac1{X_0X_1X_2}.
$$

つまり[長完全列の連結写像](../AG3-08/index.md#thm-ag3-08-long-exact)の「局所持ち上げを微分し、左側へ戻す」操作によって

$$
\partial\left[\frac1{X_0X_1}\right]
=\left[\frac1{X_0X_1X_2}\right].
$$

右辺は[主定理](#thm-ag3-10-projective-twist-cohomology)で非零と確認済みなので、この具体計算でも連結写像の同型性を検証できました。
<!-- solution-end -->

## 7. 次章へ

$H^0(\mathcal O(d))$ は斉次多項式から、$H^n(\mathcal O(d))$ は全ての変数に負指数を持つ Laurent 単項式からでき、中間次数は縮約で消えました。超平面の完全列と最高次の係数対は、曲線へ移ったときにも次数と正則微分形式を結ぶ手掛かりになります。次章では種数と Riemann–Roch への入口へ進みます。
