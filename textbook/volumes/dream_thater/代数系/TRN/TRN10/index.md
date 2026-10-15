# TRN10 Hermite–Lindemann：算術下界と複素積分上界

[TRN9の非零整数の定理](../TRN9/index.md#thm-trn9-arithmetic-nonzero)によって、素数 $p$ が有限個の例外を避ければ、微分和から作った $A_p$ は零でない通常の整数となり、$|A_p|\ge1$ です。しかしこの下界だけでは、仮定した指数関係 $\sum_{t\in T}c_te^t=0$ と衝突しません。必要なのは、**同じ $A_p$ が階乗分母を持つ複素積分に等しく、$p$ を大きくすると絶対値が0に近付く**という、反対向きの評価です。

今回は [TRN4の複素端点積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)を [TRN9の補助多項式](../TRN9/index.md#def-trn9-auxiliary-polynomial)にそのまま代入します。端点 $t$ は一般に複素数です。したがって $[0,t]$ を実区間として積分するのではなく、$z=st$（$0\le s\le1$）という**向き付き複素線分**を使います。

## 1. 整数と積分を結ぶ等式

ここで使う条件を固定します。$K/\mathbb Q$ は $\mathbb C$ 内の有限Galois拡大で、$T\subset K$ は相異なる代数的数からなる有限集合、$0\in T$、$T^\ast=T\setminus\{0\}\ne\varnothing$ です。整数係数 $c_t\ne0$ はGalois共役で不変、$c_0>0$ とし、さらに

$$
\sum_{t\in T}c_te^t=0
$$

を仮定します。この条件を満たす組は [TRN8の対称関係](../TRN8/index.md#thm-trn8-balanced-relation)から得られます。ここではこの組を**素数 $p$ を選ぶ前に固定**します。

[TRN9の整数化した消滅多項式](../TRN9/index.md#lem-trn9-integerized-roots)により、正整数 $D$ と

$$
Q(Z)=\prod_{v\in T^\ast}(Z-Dv)\in\mathbb Z[Z],
\qquad Q(0)\in\mathbb Z\setminus\{0\}
$$

を固定できます。$m=|T^\ast|\ge1$ とし、任意の素数 $p\ge2$ に対して

$$
H_p(Z)=Z^{p-1}Q(Z)^p,\qquad
f_p(z)=\frac{H_p(Dz)}{(p-1)!},\qquad
F_p(z)=\sum_{k=0}^{(p-1)+mp}f_p^{(k)}(z)
$$

とします。補助多項式の係数は有理数ですが、**すべての点での値が整数とは主張していません**。必要な代数的整数性と非零性はTRN9の結果です。

まず微分和と積分を連結します。微分和の上限が $f_p$ の次数に等しいので、[TRN4の恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)の $f=f_p,\ a=0,\ b=t$ という代入ができます。

<a id="prop-trn10-integral-identity"></a>

<!-- formal-statement-start -->
> **命題（微分和の重み付き線分積分表示）**  
> 上の $K,T,(c_t),D,Q,f_p,F_p$ が指数関係 $\sum_{t\in T}c_te^t=0$ を満たすとする。$A_p=\sum_{t\in T}c_tF_p(t)$ と置けば、任意の素数 $p\ge2$ に対して

$$
A_p=-\sum_{t\in T}c_t I_{p,t},
\qquad
I_{p,t}:=\int_0^t e^{t-z}f_p(z)\,dz
$$

> が成立する。各積分は $0$ から $t$ への**向き付き複素線分**上で取る。特に $I_{p,0}=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

端点ごとに指数関数を伴う $e^tF_p(0)$ が現れます。$t$ について整数重みを付けて足すと、**元の指数関係がこの項だけを消し**、$A_p$ が残ります。この段階では不等式を一切使いません。

<!-- proof-start -->
### 証明

$f_p$ は複素係数多項式であり、[複素端点積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)の適用条件を満たします。同定理の $a=0,b=t$ によって

$$
e^tF_p(0)-F_p(t)
=\int_0^t e^{t-z}f_p(z)\,dz=I_{p,t}
$$

です。両辺に $c_t$ を掛け、有限集合 $T$ 全体で和を取ると、

$$
\begin{aligned}
\sum_{t\in T}c_tI_{p,t}
&=\sum_{t\in T}c_te^tF_p(0)
  -\sum_{t\in T}c_tF_p(t)\\
&=F_p(0)\left(\sum_{t\in T}c_te^t\right)-A_p\\
&=F_p(0)\cdot0-A_p=-A_p.
\end{aligned}
$$

$F_p(0)$ がすべての $t$ に共通であることと、仮定の指数関係が**複素数として**成立することを使いました。$t=0$ では線分の長さも速度も0だから $I_{p,0}=0$ です。したがって表示式が従います。
<!-- proof-end -->

ここで $A_p$ は算術的に構成した数、$I_{p,t}$ は複素積分です。両者の一致は、$A_p$ の各項が整数だからではなく、元の指数関係を正しく代入した結果です。

### 符号を二点で確かめる

$T=\{0,1\}$、$c_0=1,c_1=-1$ を**形式的な重みの例**として取ります。この組は $1-e=0$ を満たさないため、まだ命題の仮定には入りません。[TRN4の式](../TRN4/index.md#thm-trn4-complex-endpoint)の $t=1$ の場合は

$$
I_{p,1}=eF_p(0)-F_p(1).
$$

すると $A_p=F_p(0)-F_p(1)$ と、$-c_1 I_{p,1}=I_{p,1}$ との差は

$$
A_p-I_{p,1}=(1-e)F_p(0)
$$

です。指数関係がなければこの余分な項は消えません。この計算は、$A_p=-\sum c_tI_{p,t}$ を条件なしで使う誤りを防ぎます。

## 2. すべての複素端点に共通する定数

固定された有限集合 $T$ の各端点について、$f_p$ の大きさを一つの定数の $p$ 乗で押さえます。複素線分の点を $z=st$ と表せば、$0\le s\le1$ は**実パラメータ**、$t,z$ は一般に複素数です。

$T^\ast\ne\varnothing$ なので、次の最大値は正です。

$$
R=\max_{t\in T}|t|>0.
$$

任意の $v\in T^\ast$ と $t\in T$ と $s\in[0,1]$ について

$$
|Dst|\le D|t|\le DR,
$$

$$
|Dst-Dv|=D|st-v|
\le D(s|t|+|v|)\le2DR.
$$

最初の不等式は三角不等式、最後は $|t|,|v|\le R$ と $s\le1$ から得られます。したがって次の**共通評価定数**を使えます。

<a id="def-trn10-uniform-constants"></a>

<!-- formal-statement-start -->
> **定義（複素線分の共通評価定数）**  
> $T,D$ を上記のように固定し、$m=|T^\ast|$、$R=\max_{t\in T}|t|$ とする。実定数

$$
M=\max\{1,DR\},\qquad
N=\max\{1,2DR\},\qquad
B=MN^m
$$

> を定める。$B\ge1$ は $T,D$ だけで決まり、素数 $p$ には依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn10-uniform-constants -->
**定義の確認**

$T=\{0,1,-1\}$、$D=1$ を使うと、$T^\ast=\{\pm1\}$、$m=2$、$R=1$ です。従って

$$
M=\max\{1,1\}=1,\qquad
N=\max\{1,2\}=2,\qquad
B=1\cdot2^2=4.
$$

実際 $t=\pm1$、$0\le s\le1$、$v=\pm1$ に対して $|st|\le1$、$|st-v|\le2$ で、$Q(z)=(z-1)(z+1)$ の各因子を同時に押さえています。$p$ を3から5へ変えても $M,N,B$ は変わりません。
<!-- definition-example-end -->

<a id="prop-trn10-uniform-polynomial-bound"></a>

<!-- formal-statement-start -->
> **命題（補助多項式の全線分一様上界）**  
> [共通評価定数](#def-trn10-uniform-constants)を使うと、任意の素数 $p\ge2$、$t\in T$、$s\in[0,1]$ に対して

$$
|f_p(st)|\le\frac{B^p}{(p-1)!}
$$

> となる。ここで $B$ は $p,t,s$ のどれにも依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$f_p$ の分子は $(Dst)^{p-1}$ と、$m$ 個の因子 $(Dst-Dv)^p$ の積です。それぞれの上界を**指数 $p$ を取る前に**固定し、最後に分母の階乗を戻します。

<!-- proof-start -->
### 証明

[TRN9の消滅多項式](../TRN9/index.md#lem-trn9-integerized-roots)を $Z=Dst$ に代入すると

$$
Q(Dst)=\prod_{v\in T^\ast}(Dst-Dv)
$$

です。従って

$$
\begin{aligned}
|f_p(st)|
&=\frac{|Dst|^{p-1}}{(p-1)!}
 \prod_{v\in T^\ast}|Dst-Dv|^p\\
&\le\frac{M^{p-1}}{(p-1)!}
 \prod_{v\in T^\ast}N^p\\
&=\frac{M^{p-1}N^{mp}}{(p-1)!}\\
&\le\frac{M^pN^{mp}}{(p-1)!}
=\frac{B^p}{(p-1)!}.
\end{aligned}
$$

最後から二行目は $M\ge1$ により $M^{p-1}\le M^p$ となることを使いました。$T,D$ を先に固定したので、$B=MN^m$ は $p$ を変えても固定されたままです。
<!-- proof-end -->

「有限個の端点だから、端点ごとに別の定数を選んでもよい」という見方もできます。ただし証明で $p$ ごとに最大値を取り直して $B_p$ と置くと、$B_p^p/(p-1)!$ の収束をそのまま主張できません。ここでは敢えて $B$ を具体的に一度だけ選びました。

## 3. 複素線分積分の上界

次に指数因子を押さえます。$z=st$ と置くと

$$
t-z=(1-s)t,\qquad
|e^{t-z}|=e^{(1-s)\operatorname{Re}t}
\le e^{\max(0,\operatorname{Re}t)}.
$$

実部 $\operatorname{Re}t$ は負でも構いません。右辺を単純に $e^{\operatorname{Re}t}$ とするのは、$s=1$ で左辺が1になるため、$\operatorname{Re}t<0$ では誤りです。

<a id="prop-trn10-complex-integral-bound"></a>

<!-- formal-statement-start -->
> **命題（各複素端点の積分上界）**  
> 前節までの条件のもとで、$0$ から $t\in T$ への線分積分 $I_{p,t}$ に対し

$$
|I_{p,t}|
\le |t|e^{\max(0,\operatorname{Re}t)}
\frac{B^p}{(p-1)!}
$$

> が成立する。$t=0$ では左右とも0である。
<!-- formal-statement-end -->

### 証明の見取り図

[TRN4の線分上界](../TRN4/index.md#prop-trn4-segment-bound)を使ってもよいですが、ここでは向きと長さを直接見せます。線分のパラメータ $s$ で積分すると $dz=t\,ds$ となり、曲線の長さに対応する $|t|$ が絶対値の外へ出ます。

<!-- proof-start -->
### 証明

$t\in\mathbb C$ を固定し、$\gamma_t(s)=st$（$0\le s\le1$）と置きます。$\gamma_t(0)=0$、$\gamma_t(1)=t$、$\gamma_t'(s)=t$ です。[CA2の複素線積分の定義](../../../解析系/CA/CA2/index.md#def-ca2-line-integral)に沿って

$$
I_{p,t}=t\int_0^1 e^{(1-s)t}f_p(st)\,ds
$$

です。$f_p$ と指数関数は全平面で連続なので、この実区間積分は存在します。[TRN4のML評価](../TRN4/index.md#prop-trn4-segment-bound)で使った絶対値評価と[多項式の一様上界](#prop-trn10-uniform-polynomial-bound)を順に使い、

$$
\begin{aligned}
|I_{p,t}|
&\le|t|\int_0^1|e^{(1-s)t}|\,|f_p(st)|\,ds\\
&\le|t|\int_0^1e^{\max(0,\operatorname{Re}t)}
 \frac{B^p}{(p-1)!}\,ds\\
&=|t|e^{\max(0,\operatorname{Re}t)}
 \frac{B^p}{(p-1)!}
\end{aligned}
$$

と得ます。$t=0$ のときは $\gamma_0'(s)=0$ なので $I_{p,0}=0$ であり、右辺も $|t|=0$ により0です。
<!-- proof-end -->

### 虚数端点・負の実部で式を確かめる

$t=i$ なら $z=is$、$dz=i\,ds$、$|e^{(1-s)i}|=1$ です。よって

$$
I_{p,i}=i\int_0^1e^{(1-s)i}f_p(is)\,ds,
\qquad
|I_{p,i}|\le\frac{B^p}{(p-1)!}.
$$

$t=-2+i$ なら $\operatorname{Re}t=-2$、$|t|=\sqrt5$ で、

$$
|e^{(1-s)(-2+i)}|=e^{-2(1-s)}\le1,
\qquad
|I_{p,-2+i}|\le\sqrt5\,\frac{B^p}{(p-1)!}.
$$

ここでは虚部に由来する回転は絶対値1になり、実部の増減だけが指数因子の絶対値へ寄与します。積分路はどちらも複素平面の線分であり、実数の $0$ から $|t|$ までの積分へ勝手に取り替えたわけではありません。

## 4. 非零整数が0へ近付くことはできない

指数関係の重み $c_t$ は最初に固定した通常の整数です。そこで次の実定数を一度だけ選びます。

$$
C=\sum_{t\in T}|c_t|\,|t|\,
e^{\max(0,\operatorname{Re}t)}.
$$

各項は非負で、$T^\ast\ne\varnothing$ かつ $c_t\ne0$ なので $C>0$ です。$C$ も素数 $p$ には依存しません。

<a id="thm-trn10-arithmetic-analytic-clash"></a>

<!-- formal-statement-start -->
> **定理（算術下界と複素積分上界の矛盾）**  
> $K/\mathbb Q$ を $\mathbb C$ 内の有限Galois拡大とし、有限集合 $T\subset K$ と整数 $(c_t)_{t\in T}$ は [TRN9の補助微分和から作る非零整数](../TRN9/index.md#thm-trn9-arithmetic-nonzero)の仮定を満たし、さらに

$$
\sum_{t\in T}c_te^t=0
$$

> とする。$D,Q,f_p,F_p,A_p$ を上記のとおり構成すると、$p\nmid c_0DQ(0)$ を満たす素数 $p$ について

$$
1\le|A_p|\le C\frac{B^p}{(p-1)!}
$$

> が成り立つ。ただし $B\ge1,C>0$ は $p$ と無関係な固定実定数であり、右辺は $p\to\infty$ で0へ収束する。従って**このような指数関係を満たす $K,T,(c_t)$ は存在しない**。
<!-- formal-statement-end -->

### 証明の見取り図

下界は素数合同から来る**整数の非零性**、上界は複素積分の**絶対値評価**です。固定された整数 $c_0DQ(0)\ne0$ を割る素数は有限個しかないため、それ以外の素数を無限に大きくできます。最後に階乗が定数の指数冪より速く大きくなることを、比の計算で示します。

<!-- proof-start -->
### 証明

[TRN9の補助微分和から作る非零整数](../TRN9/index.md#thm-trn9-arithmetic-nonzero)により、すべての素数 $p$ について $A_p\in\mathbb Z$ です。$c_0DQ(0)\in\mathbb Z\setminus\{0\}$ は $p$ を選ぶ前に固定した整数です。従ってこれを割らない素数では

$$
A_p\equiv c_0D^{p-1}Q(0)^p\not\equiv0\pmod p,
\qquad A_p\in\mathbb Z\setminus\{0\}.
$$

この非零性から $|A_p|\ge1$ です。一方、[積分表示](#prop-trn10-integral-identity)と三角不等式、[各端点の上界](#prop-trn10-complex-integral-bound)を使うと

$$
\begin{aligned}
|A_p|
&=\left|-\sum_{t\in T}c_tI_{p,t}\right|\\
&\le\sum_{t\in T}|c_t|\,|I_{p,t}|\\
&\le\sum_{t\in T}|c_t|\,|t|\,
 e^{\max(0,\operatorname{Re}t)}
 \frac{B^p}{(p-1)!}\\
&=C\frac{B^p}{(p-1)!}.
\end{aligned}
$$

**階乗の収束を確認します。** $u_n=B^n/(n-1)!$（整数 $n\ge2$）と置くと

$$
\frac{u_{n+1}}{u_n}
=\frac{B^{n+1}/n!}{B^n/(n-1)!}
=\frac Bn.
$$

$B$ を固定して $n\ge\max\{2,\lceil2B\rceil\}$ とすれば $u_{n+1}\le u_n/2$ です。よって任意のそのような $n_0$ と整数 $k\ge0$ に対し

$$
0\le u_{n_0+k}\le2^{-k}u_{n_0}\longrightarrow0.
$$

従って $CB^p/(p-1)!\to0$ が成り立ちます。素数は無限に存在するため、固定整数 $c_0DQ(0)$ を割らず、かつ右辺が1未満となる素数 $p$ を選べます。そのとき

$$
1\le|A_p|
\le C\frac{B^p}{(p-1)!}<1
$$

となり矛盾します。この証明では素数 $p$ を選んでから $D$ や係数 $c_t$ を変えていません。
<!-- proof-end -->

### どの性質が消えると証明が壊れるか

- **指数関係がない場合**：[積分表示](#prop-trn10-integral-identity)で $F_p(0)\sum c_te^t$ が消えず、同じ $A_p$ の上界は得られません。
- **Galois不変性がない場合**：[TRN9の定理](../TRN9/index.md#thm-trn9-arithmetic-nonzero)における通常の整数性を保証できず、非零でも絶対値が1以上とは言えません。
- **$c_0=0$ の場合**：mod $p$ で残す特別微分値の係数が消えます。指数関係そのものの矛盾を証明したわけではありません。
- **$D,Q,c_t$ が $p$ に依存する場合**：$B,C$ が固定とは限らず、階乗の収束だけで上界が0になるとは限りません。
- **実積分への置換**：複素数 $t$ に対し線分 $[0,t]$ を実数区間だと扱えば積分路が変わります。パラメータ $s\in[0,1]$ に戻す必要があります。

以上は「有限Galois不変な整数係数の指数関係は、零点に正の特別係数を持つと成立しない」という矛盾の仕組みです。次章では[TRN8で構成した対称関係](../TRN8/index.md#thm-trn8-balanced-relation)をこの定理に代入する順を整理し、Hermite–Lindemann定理および $\pi$ の超越性を一つの完全な証明として閉じます。

## 5. 演習

### Level A：複素積分と固定定数

**TRN10-A1（複素線分のパラメータ）**  
$t=1+2i$、多項式 $f(z)=z$ に対し、$I_t=\int_0^t e^{t-z}f(z)\,dz$ を $[0,1]$ 上の積分で表し、指数因子の絶対値の最大値と線分の長さを求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$z=st$、$dz=t\,ds$、$t-z=(1-s)t$ を使うと

$$
I_t=t\int_0^1e^{(1-s)t}(st)\,ds
=t^2\int_0^1s\,e^{(1-s)(1+2i)}\,ds.
$$

指数因子の大きさは

$$
|e^{(1-s)(1+2i)}|=e^{1-s}\le e
$$

です。線分の長さは $|t|=\sqrt{1^2+2^2}=\sqrt5$ です。虚部 $2i$ は指数の絶対値に寄与しません。
<!-- solution-end -->

**TRN10-A2（負の実部の落とし穴）**  
$t=-1+i$ に対し、$0\le s\le1$ で $|e^{(1-s)t}|$ の最大値を求め、$e^{\operatorname{Re}t}$ を一様上界にできない理由を述べてください。

- Level: A

<!-- solution-start -->
**詳細解答**

実部を取ると $\operatorname{Re}((1-s)t)=-(1-s)$ なので

$$
|e^{(1-s)t}|=e^{-(1-s)}=e^{s-1}.
$$

これは $s=1$ で最大値1を取ります。しかし $e^{\operatorname{Re}t}=e^{-1}<1$ です。したがって $s=1$ では $1\le e^{-1}$ となり不成立です。正しい上界は $e^{\max(0,\operatorname{Re}t)}=1$ です。
<!-- solution-end -->

**TRN10-A3（二点集合の定数）**  
$T=\{0,1/2\}$、$D=2$ に対して、$m,R,M,N,B$ を[共通評価定数](#def-trn10-uniform-constants)から計算してください。

- Level: A

<!-- solution-start -->
**詳細解答**

非零点は $1/2$ の一つなので $m=1$、$R=1/2$ です。従って

$$
DR=2\cdot\frac12=1,\qquad
M=1,\quad N=2,\quad B=1\cdot2^1=2.
$$

このとき $f_p(z)=(2z)^{p-1}(2z-1)^p/(p-1)!$ です。線分 $z=s/2$ では $|2z|=s\le1$、$|2z-1|=|s-1|\le1\le N$ なので、提示した $B$ は確かに上界として使えます。最良定数である必要はありません。
<!-- solution-end -->

**TRN10-A4（階乗による収束）**  
$B=3$ とし $u_n=3^n/(n-1)!$（$n\ge2$）と置きます。$u_{n+1}/u_n$ を求め、何番目から半分以下への減少を保証できるか示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

階乗の関係 $n!=n(n-1)!$ より

$$
\frac{u_{n+1}}{u_n}
=\frac{3^{n+1}}{n!}\frac{(n-1)!}{3^n}
=\frac3n.
$$

$n\ge6$ なら $3/n\le1/2$ です。したがって任意の $k\ge0$ で $u_{6+k}\le2^{-k}u_6$ となり、右辺は0に収束します。素数列に制限しても上界は変わりません。
<!-- solution-end -->

### Level B：仮定と評価をつなぐ

**TRN10-B1（指数関係を外したとき）**  
任意の有限集合 $T$、係数 $c_t$、多項式 $f$ とその微分和 $F$ に対し、$A=\sum_{t\in T}c_tF(t)$ と $I_t=\int_0^t e^{t-z}f(z)\,dz$ を考えます。指数関係を仮定せず、$A+\sum c_tI_t$ を正確に求めてください。

- Level: B

<!-- solution-start -->
**詳細解答**

[TRN4の複素端点恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)に $a=0,b=t$ を入れると $I_t=e^tF(0)-F(t)$ です。従って

$$
\begin{aligned}
A+\sum_{t\in T}c_tI_t
&=\sum_{t\in T}c_tF(t)
+\sum_{t\in T}c_t(e^tF(0)-F(t))\\
&=F(0)\sum_{t\in T}c_te^t.
\end{aligned}
$$

この右辺が0といえるのは指数関係が成立するとき（または偶然 $F(0)=0$ のとき）に限られます。一般には積分和のみで $A$ を表せません。
<!-- solution-end -->

**TRN10-B2（複素三点の上界）**  
$T=\{0,i,-i\}$、$D=1$、重み $c_0=2$、$c_i=c_{-i}=-1$ とします。$m,R,B,C$ を計算し、任意の素数 $p$ での $\sum_{t\in T}|c_t||I_{p,t}|$ の上界を示してください。指数関係は仮定しません。

- Level: B

<!-- solution-start -->
**詳細解答**

$T^\ast=\{\pm i\}$ なので $m=2$、$R=1$、$M=1$、$N=2$、$B=4$ です。全 $t$ の実部は0で、0以外の重みの絶対値は1です。従って

$$
C=2\cdot0+1\cdot1\cdot e^0+1\cdot1\cdot e^0=2.
$$

[積分上界](#prop-trn10-complex-integral-bound)を端点 $i,-i$ にそれぞれ適用して

$$
\sum_{t\in T}|c_t||I_{p,t}|
\le\left(1+1\right)\frac{4^p}{(p-1)!}
=2\frac{4^p}{(p-1)!}
$$

です。ただし重みは一般に $\sum c_te^t=0$ を満たしません。**積分和の上界**と**$A_p$ の上界**を混同しないことが重要です。
<!-- solution-end -->

**TRN10-B3（例外素数と下界）**  
[TRN9の定理](../TRN9/index.md#thm-trn9-arithmetic-nonzero)の条件を満たし、$c_0=6$、$D=2$、$Q(0)=-5$ であるとします。算術的非零性から除外する素数を全て挙げ、他の素数での合同と絶対値下界を述べてください。指数関係の成立は要求しません。

- Level: B

<!-- solution-start -->
**詳細解答**

積は $c_0DQ(0)=6\cdot2\cdot(-5)=-60$ で、素因数は $2,3,5$ です。この三つを除く素数 $p$ では

$$
A_p\equiv6\cdot2^{p-1}(-5)^p\not\equiv0\pmod p.
$$

ここで $p$ は $6,2,5$ のいずれも割らないので、積も $p$ で割り切れません。[TRN9の補助微分和から作る非零整数](../TRN9/index.md#thm-trn9-arithmetic-nonzero)から $A_p\in\mathbb Z\setminus\{0\}$、従って $|A_p|\ge1$ です。指数関係はこの算術下界の証明には使いません。
<!-- solution-end -->

**TRN10-B4（依存する定数を選んだ失敗例）**  
各整数 $n\ge2$ に対し $B_n=n$ と置き $v_n=B_n^n/(n-1)!$ とします。$v_n$ が0へ収束しないことを示し、[主定理](#thm-trn10-arithmetic-analytic-clash)で $B$ の固定が必要な理由を述べてください。

- Level: B

<!-- solution-start -->
**詳細解答**

階乗は $1\cdot2\cdots(n-1)$ です。各因子は $n$ 以下だから

$$
(n-1)!\le n^{n-1}.
$$

従って

$$
v_n=\frac{n^n}{(n-1)!}
\ge\frac{n^n}{n^{n-1}}=n.
$$

よって $v_n\to+\infty$ であり、0には収束しません。$B_n$ が $n$ とともに増えるとき、固定 $B$ の比 $B/n$ による収束証明を流用できません。$T,D$ を素数選択前に固定する必要があります。
<!-- solution-end -->

### Level C：整数性・積分・極限を一つの証明にする

**TRN10-C1（積分矛盾の完全再構成）**  
有限Galois拡大 $K/\mathbb Q$、有限な相異なる指数集合 $T\subset K$、整数係数 $c_t$ が、$0\in T$、$T^\ast\ne\varnothing$、$c_0>0$、Galois不変性、および $\sum c_te^t=0$ を満たすと仮定します。[TRN9の補助多項式](../TRN9/index.md#def-trn9-auxiliary-polynomial)を使い、次のすべてを証明してください。

1. $A_p$ がどの素数で非零整数となるかを明示する。
2. $A_p$ を向き付き線分積分の和へ変換し、符号を確定する。
3. 素数に依存しない具体的な $B,C$ を構成し、積分和を評価する。
4. 階乗の収束と素数の無限性により矛盾を得る。

- Level: C

<!-- solution-start -->
**詳細解答**

[TRN9の整数化補題](../TRN9/index.md#lem-trn9-integerized-roots)に従い、全指数を代数的整数へ移す $D>0$ と $Q(Z)=\prod_{v\in T^\ast}(Z-Dv)\in\mathbb Z[Z]$ を固定します。$m=|T^\ast|$、$f_p(z)=(Dz)^{p-1}Q(Dz)^p/(p-1)!$、$F_p=\sum_{k=0}^{(p-1)+mp}f_p^{(k)}$ とします。$A_p=\sum c_tF_p(t)$ です。

[TRN9の補助微分和から作る非零整数](../TRN9/index.md#thm-trn9-arithmetic-nonzero)から $A_p\in\mathbb Z$、さらに

$$
A_p\equiv c_0D^{p-1}Q(0)^p\pmod p
$$

です。$c_0DQ(0)\ne0$ なので、その素因数の外にある素数 $p$ では右辺は非零、従って $1\le|A_p|$ です。

次に [TRN4の端点恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)を $a=0,b=t,f=f_p$ に適用すると

$$
e^tF_p(0)-F_p(t)=\int_0^te^{t-z}f_p(z)\,dz=:I_{p,t}.
$$

$T$ 上で $c_t$ 倍して加え、指数関係によって最初の項を消すと $\sum c_tI_{p,t}=-A_p$ です。これが負符号の由来です。

$R=\max_{t\in T}|t|>0$、$M=\max(1,DR)$、$N=\max(1,2DR)$、$B=MN^m$ とします。線分 $z=st$ では $|Dz|\le M$、各 $v\in T^\ast$ について $|Dz-Dv|\le N$ です。ゆえに

$$
|f_p(st)|\le\frac{M^{p-1}N^{mp}}{(p-1)!}
\le\frac{B^p}{(p-1)!}.
$$

また $|e^{(1-s)t}|\le e^{\max(0,\operatorname{Re}t)}$、$dz=t\,ds$ なので

$$
|I_{p,t}|\le|t|e^{\max(0,\operatorname{Re}t)}
\frac{B^p}{(p-1)!}.
$$

$C=\sum_{t\in T}|c_t||t|e^{\max(0,\operatorname{Re}t)}>0$ を固定し、和の三角不等式から

$$
1\le|A_p|\le\sum_{t\in T}|c_t|\,|I_{p,t}|
\le C\frac{B^p}{(p-1)!}.
$$

最後に $u_n=B^n/(n-1)!$ と置けば $u_{n+1}/u_n=B/n$ です。十分大きい整数 $n$ 以後は比が $1/2$ 以下になり $u_n\to0$ です。したがって右辺が1未満となる整数 $n$ の閾値があります。素数は無限にあり、有限個の $c_0DQ(0)$ の素因数を避け、その閾値より大きい素数を選べます。その素数で $1\le|A_p|<1$ となり矛盾します。
<!-- solution-end -->

## 6. 次章への接続

今回の仮定は「ある代数的な $\alpha\ne0$ に対して $e^\alpha$ が代数的」という形ではなく、Galois不変性と正の0係数を持つ**有限指数関係**という形でした。しかし [TRN8の対称化定理](../TRN8/index.md#thm-trn8-balanced-relation)は、まさに前者の仮定から後者のすべての条件を構成しています。[本章の矛盾定理](#thm-trn10-arithmetic-analytic-clash)と連結すると、仮定そのものが不可能になります。

TRN11ではこの連結を最初から一つの定理として読み直し、$e^{i\pi}=-1$ を使う際の $i\pi\ne0$ と代数性の仮定を確認して、$\pi$ の超越性まで進みます。